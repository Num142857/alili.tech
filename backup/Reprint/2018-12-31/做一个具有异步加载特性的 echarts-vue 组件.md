---
title: '做一个具有异步加载特性的 echarts-vue 组件' 
date: 2018-12-31 2:30:29
hidden: true
slug: bv7yrq6k44
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>在 vue 项目使用 echarts 的场景中，以下三点不容忽视：1. 可视化的数据往往是异步加载的；2. 若一个页面存在大量的图表（ 尤其当存在关系图和地图时 ），往往会导致该页面的渲染速度很慢并可能在几秒内卡死，产生极差的用户体验。3. 引入 echarts 组件导致编译后的文件过大从而使得首次访问的加载极慢。关于第三点，大家可以参考之前的撰文 <a href="https://segmentfault.com/a/1190000010955172#articleHeader2">优化 Vue 项目编译文件大小</a>。以下针对上述前两点，给出数据异步、延迟渲染的 echarts vue 组件的设计和实现方式，并对实现之中可能存在的问题进行介绍。</blockquote>
<blockquote>组件代码可以访问 <a href="https://github.com/dailybird/echarts-vue" rel="nofollow noreferrer" target="_blank">Github</a> 查看。</blockquote>
<h2 id="articleHeader0">1. 抽离 echarts 公共部分形成基础组件</h2>
<h3 id="articleHeader1">1.1 调研公共部分</h3>
<p>首先，我们需要把 echarts 使用中公共的部分抽离出来，形成基础组件。</p>
<p>让我们在 <a href="http://echarts.baidu.com/tutorial.html#5%20%E5%88%86%E9%92%9F%E4%B8%8A%E6%89%8B%20ECharts" rel="nofollow noreferrer" target="_blank">官网 - 5 分钟上手 ECharts</a> 教程中找到使用 echarts 的步骤：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 1. 获取一个用于挂在 echarts 的 DOM 元素
let $echartsDOM = document.getElementById('echarts-dom')

# 2. 初始化
let myEcharts = echarts.init($echartsDOM)

# 3. 设置配置项
let option = {...}

# 4. 为 echarts 指定配置
myEcharts.setOption(option)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code><span class="hljs-comment"># 1. 获取一个用于挂在 echarts 的 DOM 元素</span>
<span class="hljs-keyword">let</span> $echartsDOM = document.getElementById('echarts-dom')

<span class="hljs-comment"># 2. 初始化</span>
<span class="hljs-keyword">let</span> myEcharts = echarts.init($echartsDOM)

<span class="hljs-comment"># 3. 设置配置项</span>
<span class="hljs-keyword">let</span> option = <span class="hljs-meta">{...}</span>

<span class="hljs-comment"># 4. 为 echarts 指定配置</span>
myEcharts.setOption(option)</code></pre>
<p><strong>注：在 Vue 中，首先我们需要使用 <code>import echarts from 'echarts'</code> 以引入 echarts。</strong></p>
<p>由上可知，在 echarts 使用中，除第三步设置配置项以外，其他的步骤都是重复的，即可以抽离出来放入组件中统一实现。</p>
<p><strong>注：其实 option 配置中也存在可以抽离的部分，比如我们可以将 echarts 的颜色、散点大小、折线粗细等提取出来统一赋值，以保证 echarts 风格的统一。但由于不同类型的 ehcarts 图的颜色配置方式不同，因而实现起来相对繁琐，这里不进行说明，有兴趣的同学可以自行尝试。</strong></p>
<h3 id="articleHeader2">1.2 实现 echarts 功能</h3>
<p>首先我们书写一个简单 <code>i-ehcart.vue</code>，其中，配置项直接复制于官网的教程示例。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style scoped>
    .echarts {
        width: 100%;
        height: 100%;
    }
</style>

<template>
    <div>
        <div class=&quot;echarts&quot; id=&quot;echarts-dom&quot;></div>
    </div>
</template>

<script>
    import echarts from 'echarts'

    export default {
        name: 'echarts',
        data() {
            return {}
        },
        mounted() {
            let $echartsDOM = document.getElementById('echarts-dom')
            let myEcharts = echarts.init($echartsDOM)
            let option = {
                title: {
                    text: 'ECharts 入门示例'
                },
                tooltip: {},
                legend: {
                    data: ['销量']
                },
                xAxis: {
                    data: [&quot;衬衫&quot;, &quot;羊毛衫&quot;, &quot;雪纺衫&quot;, &quot;裤子&quot;, &quot;高跟鞋&quot;, &quot;袜子&quot;]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            }
            myEcharts.setOption(option)
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.echarts</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"echarts"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"echarts-dom"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">import</span> echarts <span class="hljs-keyword">from</span> <span class="hljs-string">'echarts'</span>

    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">'echarts'</span>,
        data() {
            <span class="hljs-keyword">return</span> {}
        },
        mounted() {
            <span class="hljs-keyword">let</span> $echartsDOM = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'echarts-dom'</span>)
            <span class="hljs-keyword">let</span> myEcharts = echarts.init($echartsDOM)
            <span class="hljs-keyword">let</span> option = {
                <span class="hljs-attr">title</span>: {
                    <span class="hljs-attr">text</span>: <span class="hljs-string">'ECharts 入门示例'</span>
                },
                <span class="hljs-attr">tooltip</span>: {},
                <span class="hljs-attr">legend</span>: {
                    <span class="hljs-attr">data</span>: [<span class="hljs-string">'销量'</span>]
                },
                <span class="hljs-attr">xAxis</span>: {
                    <span class="hljs-attr">data</span>: [<span class="hljs-string">"衬衫"</span>, <span class="hljs-string">"羊毛衫"</span>, <span class="hljs-string">"雪纺衫"</span>, <span class="hljs-string">"裤子"</span>, <span class="hljs-string">"高跟鞋"</span>, <span class="hljs-string">"袜子"</span>]
                },
                <span class="hljs-attr">yAxis</span>: {},
                <span class="hljs-attr">series</span>: [{
                    <span class="hljs-attr">name</span>: <span class="hljs-string">'销量'</span>,
                    <span class="hljs-attr">type</span>: <span class="hljs-string">'bar'</span>,
                    <span class="hljs-attr">data</span>: [<span class="hljs-number">5</span>, <span class="hljs-number">20</span>, <span class="hljs-number">36</span>, <span class="hljs-number">10</span>, <span class="hljs-number">10</span>, <span class="hljs-number">20</span>]
                }]
            }
            myEcharts.setOption(option)
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>然后在 <code>App.vue</code> 中引入这一组件，并设置 echarts 的宽高：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
    .echarts-container{
        width: 100%;
        height: 20rem;
    }
</style>

<template>
    <div id=&quot;app&quot;>
        <i-echart class=&quot;echarts-container&quot;></i-echart>
    </div>
</template>

<script>
    import iEchart from './components/i-echart'

    export default {
        name: 'app',
        components: {
            iEchart
        }
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.echarts-container</span>{
        <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">20rem</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">i-echart</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"echarts-container"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i-echart</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">import</span> iEchart <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/i-echart'</span>

    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">'app'</span>,
        <span class="hljs-attr">components</span>: {
            iEchart
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>刷新页面后，即可看到柱状图。</p>
<h3 id="articleHeader3">1.3 组件化</h3>
<p>由于我们需要抽离 option 部分，最好的方式是将其作为组件的属性，即 <code>props</code> 交由调用方配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# i-echart.vue

import echarts from 'echarts'

export default {
    name: 'echarts',
    props: {
        option: {
            type: Object,
            default(){
                return {}
            }
        }
    },
    data() {
        return {}
    },
    mounted() {
        let $echartsDOM = document.getElementById('echarts-dom')
        let myEcharts = echarts.init($echartsDOM)
        let option = this.option
        myEcharts.setOption(option)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code><span class="hljs-meta"># i-echart.vue</span>

<span class="hljs-keyword">import</span> echarts from 'echarts'

<span class="hljs-title">export</span> <span class="hljs-keyword">default</span> {
    name: 'echarts',
    props: {
        option: {
            <span class="hljs-class"><span class="hljs-keyword">type</span>: <span class="hljs-type">Object</span>,</span>
            <span class="hljs-keyword">default</span>(){
                return {}
            }
        }
    },
    <span class="hljs-class"><span class="hljs-keyword">data</span>() {
        <span class="hljs-title">return</span> {}</span>
    },
    mounted() {
        <span class="hljs-keyword">let</span> $echartsDOM = document.getElementById('echarts-dom')
        <span class="hljs-keyword">let</span> myEcharts = echarts.init($echartsDOM)
        <span class="hljs-keyword">let</span> option = this.option
        myEcharts.setOption(option)
    }
}</code></pre>
<h3 id="articleHeader4">1.4 调用组件</h3>
<p>然后我们可以将 option 配置抽离到组件调用方，并通过「传参」的方式进行调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<i-echart :option=&quot;option&quot; class=&quot;echarts-container&quot;></i-echart>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;">&lt;i-echart :option=<span class="hljs-string">"option"</span> <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"echarts-container"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">i-echart</span>&gt;</span></span></code></pre>
<h3 id="articleHeader5">1.5 提高组件强壮型</h3>
<p>之前我们注意到，在 option 参数中，我们给出了默认值 <code>{}</code>，即空对象。这样做其实是有问题的，即在 echarts 中，如果传入的 option 配置对象不含有 <code>series</code> 键，就会抛出错误：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Error: Option should contains series." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs subunit"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">Error: </span>Option should contains series.</code></pre>
<p>默认值处理是需要存在的，即当调用方传入的对象为空或不存在 <code>series</code> 配置时，应在页面上显示一些提示（ 对用户友好的提示，而不是对编程人员 ），即避免因报错而造成空白的情况。</p>
<p>此外，当我们像之前那样给 option 这一参数进行类型限制后，倘若调用方传入非对象类型，Vue 会直接抛出错误——这一结果也不是我们想要的。我们应该取消类型限制，并在 option 发生变化时进行依次以下判断：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. 是否为对象；
2. 是否为空对象；
3. 是否包含 series 键；
4. series 是否为数组；
5. series 数组是否为空。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code><span class="hljs-bullet">1. </span>是否为对象；
<span class="hljs-bullet">2. </span>是否为空对象；
<span class="hljs-bullet">3. </span>是否包含 series 键；
<span class="hljs-bullet">4. </span>series 是否为数组；
<span class="hljs-bullet">5. </span>series 数组是否为空。</code></pre>
<p>代码实现如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isValidOption(option){
    return isObject(option) &amp;&amp; !isEmptyObject(option)
            &amp;&amp; hasSeriesKey(option)
            &amp;&amp; isSeriesArray(option) &amp;&amp; !isSeriesEmpty(option)
}

function isObject(option) {
    return Object.prototype.isPrototypeOf(option)
}

function isEmptyObject(option){
    return Object.keys(option).length === 0
}

function hasSeriesKey(option){
    return !!option['series']
}

function isSeriesArray(option) {
    return Array.isArray(option['series'])
}

function isSeriesEmpty(option){
    return option['series'].length === 0 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code><span class="hljs-keyword">function</span> <span class="hljs-title">isValidOption</span>(option){
    <span class="hljs-keyword">return</span> <span class="hljs-type">isObject(option)</span> &amp;&amp; !isEmptyObject(option)
            &amp;&amp; hasSeriesKey(option)
            &amp;&amp; isSeriesArray(option) &amp;&amp; !isSeriesEmpty(option)
}

<span class="hljs-keyword">function</span> <span class="hljs-title">isObject</span>(option) {
    <span class="hljs-keyword">return</span> <span class="hljs-type">Object.prototype.isPrototypeOf(option)</span>
}

<span class="hljs-keyword">function</span> <span class="hljs-title">isEmptyObject</span>(option){
    <span class="hljs-keyword">return</span> <span class="hljs-type">Object.keys(option).length</span> === <span class="hljs-number">0</span>
}

<span class="hljs-keyword">function</span> <span class="hljs-title">hasSeriesKey</span>(option){
    <span class="hljs-keyword">return</span> <span class="hljs-type">!!option['series']</span>
}

<span class="hljs-keyword">function</span> <span class="hljs-title">isSeriesArray</span>(option) {
    <span class="hljs-keyword">return</span> <span class="hljs-type">Array.isArray(option['series'])</span>
}

<span class="hljs-keyword">function</span> <span class="hljs-title">isSeriesEmpty</span>(option){
    <span class="hljs-keyword">return</span> <span class="hljs-type">option['series'].length</span> === <span class="hljs-number">0</span> 
}</code></pre>
<p><strong>注：实际上，当判断出 option 为对象后，可以直接进行第三步的判断。</strong></p>
<p>然后，当判断 option 符合上述三种情况时，在页面上显示如「数据为空」之类的提示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import echarts from 'echarts'

export default {
    name: 'echarts',
    props: {
        option: {
            default(){
                return {}
            }
        }
    },
    data() {
        return {
            myEcharts: null,
            isOptionAbnormal: false
        }
    },
    mounted() {
        let $echartsDOM = document.getElementById('echarts-dom')
        if(!$echartsDOM) return
        let myEcharts = echarts.init($echartsDOM)
        this.myEcharts = myEcharts
        this.checkAndSetOption()
    },
    watch: {
        option(option){
            this.checkAndSetOption()
        }
    },
    methods: {
        checkAndSetOption(){
            let option = this.option
            if(isValidOption(option)){
                this.myEcharts.setOption(option)
                this.isOptionAbnormal = false
            }else{
                this.isOptionAbnormal = true
            }
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">import</span> echarts from <span class="hljs-string">'echarts'</span>

export <span class="hljs-keyword">default</span> {
    name: <span class="hljs-string">'echarts'</span>,
    props: {
        option: {
            <span class="hljs-keyword">default</span>(){
                <span class="hljs-keyword">return</span> {}
            }
        }
    },
    <span class="hljs-keyword">data</span>() {
        <span class="hljs-keyword">return</span> {
            myEcharts: <span class="hljs-literal">null</span>,
            isOptionAbnormal: <span class="hljs-literal">false</span>
        }
    },
    mounted() {
        let $echartsDOM = document.getElementById(<span class="hljs-string">'echarts-dom'</span>)
        <span class="hljs-keyword">if</span>(!$echartsDOM) <span class="hljs-keyword">return</span>
        let myEcharts = echarts.init($echartsDOM)
        <span class="hljs-keyword">this</span>.myEcharts = myEcharts
        <span class="hljs-keyword">this</span>.checkAndSetOption()
    },
    watch: {
        option(option){
            <span class="hljs-keyword">this</span>.checkAndSetOption()
        }
    },
    methods: {
        checkAndSetOption(){
            let option = <span class="hljs-keyword">this</span>.option
            <span class="hljs-keyword">if</span>(isValidOption(option)){
                <span class="hljs-keyword">this</span>.myEcharts.setOption(option)
                <span class="hljs-keyword">this</span>.isOptionAbnormal = <span class="hljs-literal">false</span>
            }<span class="hljs-keyword">else</span>{
                <span class="hljs-keyword">this</span>.isOptionAbnormal = <span class="hljs-literal">true</span>
            }
        }
    }
}</code></pre>
<p>这里在书写代码时，有以下几点需要注意：</p>
<ol>
<li>我们对 DOM 元素获取结果做了校验，即当 option 不符合要求时，ID 为 echarts-dom 的 DOM 元素是不存在的，此时 <code>document.getElementById()</code> 的返回结果为空，不能直接使用 <code>echarts.init()</code>，否则会抛出错误：<code>Error: Initialize failed: invalid dom</code>；</li>
<li>在 Vue 中，初始化的值不会被 watch 钩子捕捉，从而导致组件被调用方调用并赋予 option 参数时不会进入校验。虽然可以使用 <code>immediate: true</code> 使得 <code>watch</code> 钩子能够在属性初始化赋值时被触发，但这样做是不合适的。因为这样设置之后，在 option 初始化从而触发 watch 时，用于挂载 echarts 的 DOM 元素还未存在于页面中，从而导致出现 <code>TypeError: Cannot read property 'setOption' of null</code> 的错误。<strong>我们要重点注意 echarts 作用的生命周期，这一点后续还会涉及。</strong>
</li>
</ol>
<h3 id="articleHeader6">1.6 增强组件功能 - 数据不合法提示</h3>
<p>从上面的代码中可以注意到，我们使用 <code>isOptionAbnormal</code> 标识了传入的 <code>option</code> 值是否符合规定。基于这一标识，我们可以对 echarts 组件进行优化，当 option 不合法或数据为空时给出提示信息而不是显示空白甚至报错。</p>
<p>首先，我们修改原组件 <code>i-echart.vue</code> 代码，增加 <code>shadow</code> 层：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    <div class=&quot;shadow&quot; v-if=&quot;isOptionAbnormal&quot;>
        数据为空
    </div>
    <div class=&quot;echarts&quot; v-if=&quot;!isOptionAbnormal&quot; id=&quot;echarts-dom&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"shadow"</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"isOptionAbnormal"</span>&gt;
        数据为空
    &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"echarts"</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"!isOptionAbnormal"</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"echarts-dom"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>并为其增加样式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".shadow {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    color: #8590a6;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.shadow</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1rem</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#8590a6</span>;
}</code></pre>
<p>可当我们把 option 修改为 null 后，展示的样式没有按照预期。「数据为空」的字样被挤到一旁。</p>
<p>通过审查元素，我们猜测是由于 echarts 实例生成的 svg 并没有因为 v-if 而消失（ 或是 Vue 本身的处理机制 ），而是上移到了兄弟节点。</p>
<p>可见我们需要在 echarts 的挂载元素之上再加一层容器 DOM：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    <div class=&quot;shadow&quot; v-if=&quot;isOptionAbnormal&quot;>
        数据为空
    </div>
    <div class=&quot;wrap-container&quot;>
        <div class=&quot;echarts&quot; v-if=&quot;!isOptionAbnormal&quot; id=&quot;echarts-dom&quot;></div>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"shadow"</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"isOptionAbnormal"</span>&gt;
        数据为空
    &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"wrap-container"</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"echarts"</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"!isOptionAbnormal"</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"echarts-dom"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>同时对样式进行修改：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wrap-container,
.echarts {
    width: 100%;
    height: 100%;
}

.shadow {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    color: #8590a6;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.wrap-container</span>,
<span class="hljs-selector-class">.echarts</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
}

<span class="hljs-selector-class">.shadow</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1rem</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#8590a6</span>;
}</code></pre>
<p>这样一来，当 option 不合法时，提示文本确实会出现在合适的位置，但新的问题也出现了：当 option 值由不合法值变为合法值时，echarts 并没有被渲染。</p>
<p>这是由于我们在 option 检测的过程中，只是进行了 <code>setOption</code>，而由于我们使用的 <code>v-if</code> 会在 option 不合法时直接删除 DOM 元素，使得 <code>myEcharts</code> 即 DOM 挂载对象消失，自然 <code>setOption</code> 也没有效果了。</p>
<p>这里有两个方案可以解决：</p>
<ol>
<li>重构 <code>checkAndSetOption()</code> 函数，使其能够在 option 改变检测时，对页面中是否存在挂载元素也进行检测，当不存在时，重新进行 <code>echarts.init()</code> 并赋值 <code>myEcharts</code>。即考虑到 option 由「合法到合法」的改变，与「非法到合法」的改变是不同的这一情况；</li>
<li>将 <code>v-if</code> 改变为 <code>v-show</code>，并将 echarts 挂载元素与提示信息框的布局改为 absolute。</li>
</ol>
<p>就二者而言，后者显然更易操作，也是我们所采取的方法。</p>
<p>首先，我们把 v-if 修改为 v-show，并为根元素添加类以用于调节样式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;main-container&quot;>
    <div class=&quot;shadow&quot; v-show=&quot;isOptionAbnormal&quot;>
        数据为空
    </div>
    <div class=&quot;wrap-container&quot; v-show=&quot;!isOptionAbnormal&quot;>
        <div class=&quot;echarts&quot; id=&quot;echarts-dom&quot;></div>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"main-container"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"shadow"</span> v-show=<span class="hljs-string">"isOptionAbnormal"</span>&gt;
        数据为空
    &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"wrap-container"</span> v-show=<span class="hljs-string">"!isOptionAbnormal"</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"echarts"</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"echarts-dom"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>然后进行样式调整：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".main-container{
    position: relative;
}

.wrap-container,
.shadow{
    position: absolute;
}

.wrap-container,
.echarts {
    width: 100%;
    height: 100%;
}

.shadow {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    color: #8590a6;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.main-container</span>{
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.wrap-container</span>,
<span class="hljs-selector-class">.shadow</span>{
    <span class="hljs-attribute">position</span>: absolute;
}

<span class="hljs-selector-class">.wrap-container</span>,
<span class="hljs-selector-class">.echarts</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
}

<span class="hljs-selector-class">.shadow</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1rem</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#8590a6</span>;
}</code></pre>
<p>然后，我们再将 option 由不合法到合法进行修改时，便不会出现无法渲染的情况了。</p>
<h3 id="articleHeader7">1.7 增强组件功能 - 数据加载提示</h3>
<p>在实际场景中，用于渲染的数据常常是异步获取的，在异步加载数据之中，我们可能需要在页面中显示如「正在加载...」的字样来表示加载过程正在进行以提高用户体验。而加载过程就组件而言是无法直接获取的，即需要组件调用方通过某种方式进行控制。</p>
<p>所以，我们需要使用某一参数用于进行加载信息的显示。与之前不合法提示信息的操作方式相同，我们使用绝对定位的元素和 <code>isLoading</code> 属性进行处理：</p>
<p>首先，我们添加 isLoading 属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="props: {
    option: {
        default() {
            return {}
        }
    },
    isLoading: {
        type: Boolean,
        default: false
    }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">props</span>: {
    <span class="hljs-attribute">option</span>: {
        <span class="hljs-built_in">default</span>() {
            return {}
        }
    },
    <span class="hljs-selector-tag">isLoading</span>: {
        <span class="hljs-attribute">type</span>: Boolean,
        default: false
    }
},</code></pre>
<p>然后修改 HTML 代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;main-container&quot;>
    <div class=&quot;loading&quot; v-show=&quot;isLoading&quot;>
        数据加载中...
    </div>
    <div class=&quot;shadow&quot; v-show=&quot;!isLoading &amp;&amp; isOptionAbnormal&quot;>
        数据为空
    </div>
    <div class=&quot;wrap-container&quot; v-show=&quot;!isLoading &amp;&amp; !isOptionAbnormal&quot;>
        <div class=&quot;echarts&quot; id=&quot;echarts-dom&quot;></div>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"main-container"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"loading"</span> v-show=<span class="hljs-string">"isLoading"</span>&gt;
        数据加载中...
    &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"shadow"</span> v-show=<span class="hljs-string">"!isLoading &amp;&amp; isOptionAbnormal"</span>&gt;
        数据为空
    &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"wrap-container"</span> v-show=<span class="hljs-string">"!isLoading &amp;&amp; !isOptionAbnormal"</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"echarts"</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"echarts-dom"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>并修改样式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".main-container{
    position: relative;
}

.wrap-container,
.loading,
.shadow{
    position: absolute;
}

.wrap-container,
.echarts {
    width: 100%;
    height: 100%;
}

.shadow,
.loading{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
    color: #8590a6;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.main-container</span>{
    <span class="hljs-attribute">position</span>: relative;
}

<span class="hljs-selector-class">.wrap-container</span>,
<span class="hljs-selector-class">.loading</span>,
<span class="hljs-selector-class">.shadow</span>{
    <span class="hljs-attribute">position</span>: absolute;
}

<span class="hljs-selector-class">.wrap-container</span>,
<span class="hljs-selector-class">.echarts</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
}

<span class="hljs-selector-class">.shadow</span>,
<span class="hljs-selector-class">.loading</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">align-items</span>: center;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">1rem</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#8590a6</span>;
}</code></pre>
<p>然后，我们便可以在组件调用方中，使用 <code>is-loading</code> 来控制了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<i-echart :option=&quot;option&quot; :is-loading=&quot;true&quot; class=&quot;echarts-container&quot;></i-echart>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;">&lt;i-echart <span class="hljs-symbol">:option=<span class="hljs-string">"option"</span></span> <span class="hljs-symbol">:is-loading=<span class="hljs-string">"true"</span></span> class=<span class="hljs-string">"echarts-container"</span>&gt;&lt;<span class="hljs-regexp">/i-echart&gt;</span></code></pre>
<h3 id="articleHeader8">1.8 组件复用问题</h3>
<p>组件的最大用处是复用，但当我们将之前写的组件进行复用时，会发现出现了问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<i-echart :option=&quot;option&quot; class=&quot;echarts-container&quot;></i-echart>
<i-echart :option=&quot;option&quot; class=&quot;echarts-container&quot;></i-echart>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">i-echart</span> <span class="hljs-attr">:option</span>=<span class="hljs-string">"option"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"echarts-container"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i-echart</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">i-echart</span> <span class="hljs-attr">:option</span>=<span class="hljs-string">"option"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"echarts-container"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i-echart</span>&gt;</span></code></pre>
<p>此时，我们发现页面中并没有出现两个 echarts 图，而是只有第一个。通过浏览器审查元素，我们可以发现，只有第一个组件被正确地挂载了。这是为什么呢？</p>
<p>这是因为 echarts 进行 init 挂载时使用的是 DOM 元素的 ID。而在组件中，我们设置的 ID 是固定的（ 注意与 scoped css 进行区分 ）。即多个组件的 ID 是相同的，故而只有一个组件会被 echarts 挂载。</p>
<p>那么该如何解决这个问题呢？方法也很简单，只要保持每个元素获得唯一的 ID 就可以了。而对于唯一 ID，我们可以通过时间戳和随机数来实现。</p>
<p>修改组件代码，为组件挂载的 DOM 设置随机的 ID：</p>
<p>首先，我们设置一个随机 ID：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data() {
    return {
        randomId: 'echarts-dom' + Date.now() + Math.random()
    }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code><span class="hljs-class"><span class="hljs-keyword">data</span>() {
    <span class="hljs-title">return</span> {
        <span class="hljs-title">randomId</span>: '<span class="hljs-title">echarts</span>-<span class="hljs-title">dom'</span> + <span class="hljs-type">Date</span>.<span class="hljs-title">now</span>() + <span class="hljs-type">Math</span>.<span class="hljs-title">random</span>()
    }</span>
},</code></pre>
<p>并将其 echarts 元素的 ID 修改为该值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;echarts&quot; :id=&quot;randomId&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;">&lt;div class=<span class="hljs-string">"echarts"</span> <span class="hljs-symbol">:id=<span class="hljs-string">"randomId"</span>&gt;&lt;/div&gt;</span></code></pre>
<p>然后将 mounted 生命周期中的 DOM 组件 ID 修改为我们随机生成的值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mounted() {
    let $echartsDOM = document.getElementById(this.randomId)
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">mounted</span><span class="hljs-params">()</span></span> {
    let <span class="hljs-variable">$echartsDOM</span> = document.getElementById(this.randomId)
    ...
}</code></pre>
<p>此时，我们才真正完成了基础组件的构建。</p>
<h2 id="articleHeader9">2. 延迟加载</h2>
<p>这里指的延迟加载，是 echarts 的渲染只在页面滚动到特定高度的时候才会进行。</p>
<p>由于 echarts 组件渲染需要性能（ 尤其是地图、关系图 ），对于存在大量 echarts 的页面，如果在页面加载时全部进行渲染，可能会导致页面卡顿而降低用户体验。因而，我们需要对 echarts 进行按需加载。</p>
<p>完成这一功能需要以下步骤：</p>
<ol>
<li>监听页面滚动事件；</li>
<li>滚动事件中获取 echarts 的位置；</li>
<li>在页面当前位置达到 echarts 位置的时候进行 echarts 的初始化。</li>
</ol>
<p>下面我们就逐步完成这些功能。在此之前，我们需要添加一个高度足够的占位 DOM，以检测效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div style=&quot;height: 50rem;&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-keyword">div</span> style=<span class="hljs-string">"height: 50rem;"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<h3 id="articleHeader10">2.1 监听页面滚动</h3>
<p>我们可以使用 <code>window.onscroll = function(){}</code> 来监听页面的滚动，但这种方式只能同时作用于一个组件。想要在所有组件中生效，我们需要使用 <code>window.addEventListener('scroll', function(){})</code>。注意，绑定的生命周期为 <code>mounted</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mounted: {
    window.addEventListener('scroll', () => {
        console.log(this.randomId)
    })
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>mounted: {
    <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'scroll'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.randomId)
    })
    ...
}</code></pre>
<p>注意，这里使用了箭头函数以维持 <code>this</code> 的指向。</p>
<p>接下来，我们要使用以下方法获取浏览器下边界的绝对位置，用以与之后 DOM 元素的上边界进行对比以判断当前是否应该进行渲染：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" window.addEventListener('scroll', () => {
    let windowHeight = document.documentElement.clientHeight||window.innerHeight
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    let windowBottom = +scrollTop + +windowHeight
    console.log(windowBottom)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code> <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'scroll'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">let</span> windowHeight = <span class="hljs-built_in">document</span>.documentElement.clientHeight||<span class="hljs-built_in">window</span>.innerHeight
    <span class="hljs-keyword">let</span> scrollTop = <span class="hljs-built_in">document</span>.documentElement.scrollTop || <span class="hljs-built_in">document</span>.body.scrollTop
    <span class="hljs-keyword">let</span> windowBottom = +scrollTop + +windowHeight
    <span class="hljs-built_in">console</span>.log(windowBottom)
})</code></pre>
<h3 id="articleHeader11">2.2 获取组件当前位置</h3>
<p>接下来要获取组件的位置。在这之前，我们要首先解决获取组件 DOM 元素的问题，这里有两种方式：</p>
<ol>
<li>借助 ID，通过 <code>document.getElementById()</code> 获取；</li>
<li>采用 Vue 中的 <code>$ref</code> 获取。</li>
</ol>
<p>这里我们使用第二种方式。</p>
<p>首先，我们在组件上加入 ref 属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;main-container&quot; ref=&quot;selfEcharts&quot;>
    ...
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"main-container"</span> <span class="hljs-keyword">ref</span>=<span class="hljs-string">"selfEcharts"</span>&gt;
    ...
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>然后，通过以下方式，获取组件本身：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$refs.selfEcharts" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.$refs.selfEcharts</code></pre>
<p>可以看到，与 ID 不同，ref 是组件内唯一的（ 而不是全局唯一 ）。</p>
<p>之后，我们通过以下方式获取组件的上边缘位置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$refs.selfEcharts.offsetTop" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">this.<span class="hljs-variable">$refs</span><span class="hljs-selector-class">.selfEcharts</span><span class="hljs-selector-class">.offsetTop</span></code></pre>
<p>注：这里也可以使用 <code>lodash</code> 的 <code>_.get()</code> 来获取 <code>offset</code> 值，以避免 <code>Cannot read property of undefined</code> 的错误：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_.get(this.$refs, 'selfEcharts.offsetTop', 0)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code style="word-break: break-word; white-space: initial;"><span class="hljs-literal">_</span>.<span class="hljs-keyword">get</span>(<span class="hljs-built_in">this</span>.$refs, <span class="hljs-string">'selfEcharts.offsetTop'</span>, <span class="hljs-number">0</span>)</code></pre>
<h3 id="articleHeader12">2.3 控制 setOption 时机</h3>
<p>基于以上代码，我们可以通过对比浏览器下边缘及组件的位置，从而控制 setOption 的时机，以达到延迟加载的效果。</p>
<p>我们把之前的 <code>this.checkAndSetOption()</code> 放入高度判断中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.addEventListener('scroll', () => {
    ...
    
    if(windowBottom >= selfTop){
        this.checkAndSetOption()
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'scroll'</span>, <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    ...
    
    <span class="hljs-keyword">if</span>(windowBottom &gt;= selfTop){
        <span class="hljs-keyword">this</span>.checkAndSetOption()
    }
})</code></pre>
<p>注：为了更明显地检测效果，我们可以在 <code>checkAndSetOption()</code> 上加上 <code>setTimeout</code>。</p>
<h3 id="articleHeader13">2.4 功能优化</h3>
<p>大家可以注意到，以上代码存在两个可以优化的部分：</p>
<ol>
<li>窗口滚动的检测频率过高，当存在多个 echarts 时，可能造成性能消耗；</li>
<li>当窗口滚动到合适位置触发渲染后，滚动检测对于该组件而言就没有意义了，这时应该将该事件解除绑定。</li>
</ol>
<h4>2.4.1 使用 throttle 控制触发频率</h4>
<p>这里我们引入 lodash，并使用 throttle 来控制滚动监测的触发频率：</p>
<p>首先引入 lodash：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import _ from 'lodash'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> _ <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash'</span></code></pre>
<p>然后限制触发间隔为 500 ms：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.addEventListener('scroll', _.throttle(() => {
    let windowHeight = document.documentElement.clientHeight||window.innerHeight
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    let windowBottom = +scrollTop + +windowHeight
    let selfTop = _.get(this.$refs, 'selfEcharts.offsetTop', 0)
    if(windowBottom >= selfTop){
        this.checkAndSetOption()
    }
}, 500))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'scroll'</span>, _.throttle(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">let</span> windowHeight = <span class="hljs-built_in">document</span>.documentElement.clientHeight||<span class="hljs-built_in">window</span>.innerHeight
    <span class="hljs-keyword">let</span> scrollTop = <span class="hljs-built_in">document</span>.documentElement.scrollTop || <span class="hljs-built_in">document</span>.body.scrollTop
    <span class="hljs-keyword">let</span> windowBottom = +scrollTop + +windowHeight
    <span class="hljs-keyword">let</span> selfTop = _.get(<span class="hljs-keyword">this</span>.$refs, <span class="hljs-string">'selfEcharts.offsetTop'</span>, <span class="hljs-number">0</span>)
    <span class="hljs-keyword">if</span>(windowBottom &gt;= selfTop){
        <span class="hljs-keyword">this</span>.checkAndSetOption()
    }
}, <span class="hljs-number">500</span>))</code></pre>
<h4>2.4.2 解绑事件</h4>
<p>若想用 <code>document.removeEventListener()</code> 解绑事件，首先我们要抽离事件本身，将匿名函数转为实名函数。</p>
<p>首先，我们要将检测事件提取到 <code>methods</code> 之中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods: {
    checkAndSetOption() {
        let option = this.option
        if (isValidOption(option)) {
            this.myEcharts.setOption(option)
            this.isOptionAbnormal = false
        } else {
            this.isOptionAbnormal = true
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>methods: {
    checkAndSetOption() {
        let option = <span class="hljs-keyword">this</span>.option
        <span class="hljs-keyword">if</span> (isValidOption(option)) {
            <span class="hljs-keyword">this</span>.myEcharts.setOption(option)
            <span class="hljs-keyword">this</span>.isOptionAbnormal = <span class="hljs-literal">false</span>
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">this</span>.isOptionAbnormal = <span class="hljs-literal">true</span>
        }
    }
}</code></pre>
<p>为了保证 addEventListener 和 removeEventListener 时操作的是同一个函数，这里我们使用 <code>data</code> 添加实名函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data() {
    return {
        scrollEvent:  _.throttle(this.checkPosition, 500)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">data</span>() {
    <span class="hljs-keyword">return</span> {
        scrollEvent:  _.throttle(<span class="hljs-keyword">this</span>.checkPosition, <span class="hljs-number">500</span>)
    }
}</code></pre>
<p>然后在事件绑定中使用这一实名函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.addEventListener('scroll', this.scrollEvent)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'scroll'</span>, <span class="hljs-keyword">this</span>.scrollEvent)</code></pre>
<p>之后在检测到窗口滚动到合适高度的时候进行事件解绑：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="checkPosition() {
    ...
    
    if (windowBottom >= selfTop) {
        this.checkAndSetOption()
        window.removeEventListener('scroll', this.scrollEvent)
    }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>checkPosition() {
    ...
    
    <span class="hljs-keyword">if</span> (windowBottom &gt;= selfTop) {
        <span class="hljs-keyword">this</span>.checkAndSetOption()
        window.removeEventListener(<span class="hljs-string">'scroll'</span>, <span class="hljs-keyword">this</span>.scrollEvent)
    }
},</code></pre>
<h3 id="articleHeader14">2.4 数据异步与页面滚动先后顺序的问题</h3>
<p>当我们回顾自己的代码，可以发现，在实际应用中，其实是存在问题的。</p>
<p>由于用于渲染 echarts 的数据常常是异步获取的，也就是说，option 可能会在异步调用结束之后更新，从而触发 option 的 watch，进而导致 <code>this.checkOption()</code> 执行，最终使得 setOption 在页面没有滚动到合适位置时就触发了。</p>
<p>为了解决这个问题，我们应该让 <code>setOption</code> 的过程受制于一个标识位，而该标识位会在页面滚动到合适位置时置为 true，从而杜绝由于 option 更新、触发 watch 而导致的漏洞。</p>
<p>首先，我们要添加一个新的 data，取名为为 <code>isPositionReady</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data: {
    ...
    
    isPositionReady: false
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-attr">data:</span> <span class="hljs-string">{</span>
    <span class="hljs-string">...</span>
    
<span class="hljs-attr">    isPositionReady:</span> <span class="hljs-literal">false</span>
<span class="hljs-string">}</span></code></pre>
<p>然后，在 <code>checkAndSetOption()</code> 中加入对该标识位的判断：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="checkAndSetOption() {
    ...
    
    if(this.isPositionReady !== true) return
    
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>checkAndSetOption() {
    ...
    
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.isPositionReady !== <span class="hljs-literal">true</span>) <span class="hljs-keyword">return</span>
    
    ...
}</code></pre>
<p>最后，在位置检测方法 <code>checkPosition()</code> 中，当达到合适位置时，将该标识位置为 true：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="checkPosition() {
    ...
    
    if (windowBottom >= selfTop) {
        this.isPositionReady = true
        
        ...
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">checkPosition</span><span class="hljs-params">()</span></span> {
    ...
    
    <span class="hljs-keyword">if</span> (windowBottom &gt;= selfTop) {
        this<span class="hljs-selector-class">.isPositionReady</span> = true
        
        ...
    }
}</code></pre>
<p>此时，以上漏洞就被修补了。</p>
<h3 id="articleHeader15">2.5 初始化检测</h3>
<p>事实上，以上组件中还有一个漏洞，让我们改变组件调用方的代码来发现它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;app&quot;>
    <i-echart :option=&quot;option&quot; class=&quot;echarts-container&quot;></i-echart>
    <div style=&quot;height: 50rem;&quot;></div>
    <i-echart :option=&quot;option&quot; class=&quot;echarts-container&quot;></i-echart>
    <i-echart :option=&quot;option&quot; class=&quot;echarts-container&quot;></i-echart>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">i-echart</span> <span class="hljs-attr">:option</span>=<span class="hljs-string">"option"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"echarts-container"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i-echart</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"height: 50rem;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">i-echart</span> <span class="hljs-attr">:option</span>=<span class="hljs-string">"option"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"echarts-container"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i-echart</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">i-echart</span> <span class="hljs-attr">:option</span>=<span class="hljs-string">"option"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"echarts-container"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i-echart</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>刷新页面，我们发现原本应该渲染的第一个 echarts 组件并没有展示出来。也就是说，通过我们之前的代码，所有 echarts 组件的渲染都必须由页面滚动事件触发。</p>
<p>而对于那些原本就处于页面靠上位置的组件而言，理应在页面加载后就立刻渲染而无需等待滚动。修补这个问题也很简单，只要在 <code>mounted</code> 生命周期中进行一次 <code>checkPosition</code> 检测即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" mounted() {
    ...
    
    this.checkPosition()
    
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code> mounted() {
    ...
    
    this.checkPosition()
    
    ...
}</code></pre>
<p>自此，一个具有延迟加载功能的 echarts 组件就完成了。接下来，我们需要对该组件进行进一步优化，以适应更多的场景需求。</p>
<h2 id="articleHeader16">3. echarts 重绘</h2>
<p>这里的重绘指的是 ehcarts 中的 <code>resize()</code> 方法。用于在某些时刻进行 echarts 的调整，包括：</p>
<ol>
<li>组件宽度设置为百分比，浏览器宽度发生变化时；</li>
<li>页面收缩元素状态改变，如侧边栏收缩导致内容区宽度变化；</li>
</ol>
<h3 id="articleHeader17">3.1 页面宽度改变事件</h3>
<p>echarts 并不会主动地随着浏览器宽度的改变而调整，需要我们在页面改变时间中主动触发。实现的方式也很简单，只要按照之前的思路监听 <code>window resize</code> 事件即可。（ 注意，这里同样要考虑控制监听频率的问题 ）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.addEventListener('resize', _.throttle(() => {
    this.myEcharts.resize()
    console.log('---')
}, 500))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'resize'</span>, _.throttle(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">this</span>.myEcharts.resize()
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'---'</span>)
}, <span class="hljs-number">500</span>))</code></pre>
<h3 id="articleHeader18">3.2 主动重绘</h3>
<p>对于一些场景，如含有侧边栏的页面而言，侧边栏收缩时，也需要对 echarts 进行 <code>resize</code> 调整。而此时，浏览器宽高通常是不会变化的。</p>
<p>因而我们需要有一个机制，能够让组件调用方主动触发以使组件进行 <code>resize</code>。由于当前版本的 Vue 是不能直接调用组件的方法的，想要做到这一点，我们可以使用以下两种方法：</p>
<ol>
<li>使用时间戳；</li>
<li>使用随机数</li>
</ol>
<p>采用时间戳或随机数赋值组件的属性，在组件调用方检测到侧边栏一类组件状态改变等需要 echarts 组件主动触发 <code>resize</code> 时，重新生成随机数或重新获取时间戳。而在组件中，对属性的变化进行检测，即当属性变化时，执行 <code>resize</code>：</p>
<p>添加用于触发主动重绘的属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="props: {
    resizeSignature: {
        default: ''
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">props</span>: {
    <span class="hljs-attribute">resizeSignature</span>: {
        default: <span class="hljs-string">''</span>
    }
}</code></pre>
<p>添加对该属性的监听，并在变化时执行 <code>resize</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="resizeSignature(){
    this.myEcharts.resize()
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">resizeSignature</span><span class="hljs-params">()</span></span>{
    this<span class="hljs-selector-class">.myEcharts</span><span class="hljs-selector-class">.resize</span>()
}</code></pre>
<p>此时，只要在调用方改变 <code>resize-signature</code> 即可使 echarts 主动调用 <code>resize</code>。</p>
<h2 id="articleHeader19">4. echarts 点击事件回调</h2>
<p>在一些场景中，我们可能需要对 echarts 的点击事件进行捕捉以进行下一步的处理（ 如：数据下钻 ）。</p>
<p>为了支持这一类场景，我们需要为 echarts 添加点击监听事件，并将该事件及其参数上抛至组件调用方。</p>
<p>绑定 echarts 点击事件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mounted () {
    ...
    
    let myEcharts = echarts.init($echartsDOM)
    myEcharts.on('click', params => {
        this.echartsClicked(params)
    })
    
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code>mounted () {
    <span class="hljs-params">...</span>
    
    <span class="hljs-keyword">let</span> myEcharts = echarts.init($echartsDOM)
    myEcharts.<span class="hljs-keyword">on</span>(<span class="hljs-string">'click'</span>, <span class="hljs-keyword">params</span> =&gt; {
        this.echartsClicked(<span class="hljs-keyword">params</span>)
    })
    
    <span class="hljs-params">...</span>
}</code></pre>
<p>向上抛出事件及其参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods: {
    echartsClicked(params) {
        this.$emit('echarts-clicked', params)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>methods: {
    echartsClicked(<span class="hljs-keyword">params</span>) {
        <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">'echarts-clicked'</span>, <span class="hljs-keyword">params</span>)
    }
}</code></pre>
<p>在组件调用方捕捉该事件和参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<i-echart :option=&quot;option&quot; @echarts-clicked=&quot;echartsClicked&quot; class=&quot;echarts-container&quot;></i-echart>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;">&lt;i-echart :option=<span class="hljs-string">"option"</span> @echarts-clicked=<span class="hljs-string">"echartsClicked"</span> <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"echarts-container"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">i-echart</span>&gt;</span></span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods:{
    echartsClicked(params){
        console.log(params)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code>methods:{
    echartsClicked(<span class="hljs-keyword">params</span>){
        console.<span class="hljs-keyword">log</span>(<span class="hljs-keyword">params</span>)
    }
}</code></pre>
<h2 id="articleHeader20">X. 后续</h2>
<h3 id="articleHeader21">X.1 堆叠图问题</h3>
<p>对于 echarts 中使用 <code>stack</code> 配置的堆叠图，在堆叠图来回转换中，可能出现样式错误的问题，这是由于使用 <code>setOption(option)</code> 时只会更新相较之前 option 不同的部分。解决方法是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="echarts.setOption(option)

// 修改为：

echarts.setOption(option, true)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs protobuf"><code>echarts.setOption(<span class="hljs-keyword">option</span>)

<span class="hljs-comment">// 修改为：</span>

echarts.setOption(<span class="hljs-keyword">option</span>, <span class="hljs-literal">true</span>)</code></pre>
<p>详情可参考：<a href="https://github.com/ecomfe/echarts/issues/6715" rel="nofollow noreferrer" target="_blank">Github Issue：请问一个柱状图叠加数据刷新问题</a>。</p>
<h3 id="articleHeader22">X.2 地图问题</h3>
<p>在 echarts 中，对地图的使用还是比较频繁的。使用地图时，使用地图的 Json 数据进行注册时比较合适的方式。为此，组件中提供了 <code>maps</code> 属性，用于地图数据的注册，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<i-echart :option=&quot;option&quot; :maps=&quot;maps&quot;></i-echart>

<script>
...
// 'echarts/map/json/china.json'

let maps = [
    {
        name: 'china',
        data: chinaJson
    },
    ...
]
...
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>&lt;i-echart <span class="hljs-symbol">:option=<span class="hljs-string">"option"</span></span> <span class="hljs-symbol">:maps=<span class="hljs-string">"maps"</span>&gt;&lt;/i-echart&gt;</span>

&lt;script&gt;
...
/<span class="hljs-regexp">/ 'echarts/map</span><span class="hljs-regexp">/json/china</span>.json<span class="hljs-string">'

let maps = [
    {
        name: '</span>china<span class="hljs-string">',
        data: chinaJson
    },
    ...
]
...
&lt;/script&gt;</span></code></pre>
<h3 id="articleHeader23">X.3 v-show 问题</h3>
<p>在 Vue 中，<code>v-show</code> 使用 <code>display</code> 控制组件的显隐。而当 echart init 的时候，如果其挂载 DOM 的 v-show 处于 false 状态，则其 init 的对象宽高都是 0。即使之后 v-show 状态改变，由于 <code>mounted</code> 生命周期不会再次触发，从而使得 echarts 显示不正常。</p>
<p>为此，我们需要将 v-show 修改为对 <code>visibility</code> 这一 CSS 的改变：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=":style=&quot;{visibility: isChartVisible ? 'visible' : 'hidden'}&quot;

...

computed: {
    isChartVisible(){
        return !this.isLoading &amp;&amp; !this.isOptionAbnormal
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs asciidoc"><code><span class="hljs-meta">:style="{visibility:</span> isChartVisible ? <span class="hljs-emphasis">'visible'</span> : <span class="hljs-emphasis">'hidden'</span>}"

<span class="hljs-bullet">...

</span>computed: {
<span class="hljs-code">    isChartVisible(){</span>
<span class="hljs-code">        return !this.isLoading &amp;&amp; !this.isOptionAbnormal</span>
<span class="hljs-code">    }</span>
}</code></pre>
<h3 id="articleHeader24">X.4 滚动事件在 overflow:xxx 中无法被监听的问题</h3>
<p>当我们通过对某一组件设置 overflow 使得页面整体高度小于等于屏幕高度时，对 window 绑定的滚动事件就失效了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;#app&quot; style=&quot;width:100%; height:100%; overflow:auto&quot;>
    <div id=&quot;scroll&quot; style=&quot;width:100%; height:100rem;&quot;></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"#app"</span> style=<span class="hljs-string">"width:100%; height:100%; overflow:auto"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"scroll"</span> style=<span class="hljs-string">"width:100%; height:100rem;"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>如上，此时 window 及其至 div#app 的子元素都是不会发生 scroll 事件的。如果我们想要监听滚动事件，只能将其绑定在 div#scroll 元素上：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.querySelector('#scroll').addEventListener('scroll', function(){})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#scroll'</span>).addEventListener(<span class="hljs-string">'scroll'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{})</code></pre>
<p>这也就意味着，对于这种场景，如果在 #scroll 中放置了许多我们之前完成的 vue-echarts 组件，由于无法正常监听滚动事件，那些不在首屏显现的图表之后也不能正常显示。</p>
<p>为了解决这一问题，我们需要为组件增加一个参数，使得我们可以传入能够被监听滚动事件的元素 ID，以便延迟加载效果正常起效：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 用于绑定滚动监听的 DOM 元素的 ID 值，不传递时会使用 window
 */
scrollDomId: {
    default: null
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/**
 * 用于绑定滚动监听的 DOM 元素的 ID 值，不传递时会使用 window
 */</span>
<span class="hljs-selector-tag">scrollDomId</span>: {
    <span class="hljs-attribute">default</span>: null
}</code></pre>
<p>然后我们需要改动三个地方：</p>
<p>首先，我们需要获取应该被监听滚动事件的元素：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="computed: {
    /**
     * 获取可滚动的 DOM 元素
     * @returns {Window}
     */
    onScrollDOM () {
        let scrollDom = window
        if (this.scrollDomId !== null) {
            let tempDom = document.querySelector('#' + this.scrollDomId)
            if (tempDom !== null) {
                scrollDom = tempDom
            }
        }
        return scrollDom
    },
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>computed: {
    <span class="hljs-comment">/**
     * 获取可滚动的 DOM 元素
     * @returns {Window}
     */</span>
    onScrollDOM () {
        <span class="hljs-keyword">let</span> scrollDom = <span class="hljs-built_in">window</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.scrollDomId !== <span class="hljs-literal">null</span>) {
            <span class="hljs-keyword">let</span> tempDom = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#'</span> + <span class="hljs-keyword">this</span>.scrollDomId)
            <span class="hljs-keyword">if</span> (tempDom !== <span class="hljs-literal">null</span>) {
                scrollDom = tempDom
            }
        }
        <span class="hljs-keyword">return</span> scrollDom
    },
    ...
}</code></pre>
<p>修改滚动监听的绑定：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 对滚动事件进行监控
 */
this.onScrollDOM.addEventListener('scroll', this.scrollEvent)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">/**
 * 对滚动事件进行监控
 */</span>
<span class="hljs-keyword">this</span>.onScrollDOM.addEventListener(<span class="hljs-string">'scroll'</span>, <span class="hljs-keyword">this</span>.scrollEvent)</code></pre>
<p>修改位置检测中 <code>scrollTop</code> 值的获取逻辑：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="checkPosition () {
    ...
    
    let scrollTop = this.onScrollDOM.scrollTop || document.documentElement.scrollTop || document.body.scrollTop
    
    ...
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code>checkPosition () {
    ...
    
    <span class="hljs-keyword">let</span> scrollTop = <span class="hljs-keyword">this</span>.onScrollDOM.scrollTop || <span class="hljs-built_in">document</span>.documentElement.scrollTop || <span class="hljs-built_in">document</span>.body.scrollTop
    
    ...
},</code></pre>
<hr>
<h2 id="articleHeader25">参考</h2>
<ol>
<li><a href="https://segmentfault.com/q/1010000002428258">js如何判断一个变量等于空 - segmentfault</a></li>
<li><a href="https://segmentfault.com/q/1010000007749955?_ea=1448421" target="_blank">vue中如何首次赋值不触发watch？ - segmentfault</a></li>
<li><a href="http://www.cnblogs.com/jessical626/p/7109799.html" rel="nofollow noreferrer" target="_blank">echart 注意事项-初始化和销毁 - segmentfault</a></li>
<li><a href="http://echarts.baidu.com/tutorial.html#5%20%E5%88%86%E9%92%9F%E4%B8%8A%E6%89%8B%20ECharts" rel="nofollow noreferrer" target="_blank">echarts 官方教程</a></li>
<li><a href="http://blog.csdn.net/xiaogezl/article/details/70809155" rel="nofollow noreferrer" target="_blank">在 vue 中获取 dom 元素 - CSDN</a></li>
<li><a href="http://www.ruanyifeng.com/blog/2009/09/find_element_s_position_using_javascript.html" rel="nofollow noreferrer" target="_blank">用Javascript获取页面元素的位置 - 阮一峰的网络日志</a></li>
<li><a href="http://blog.csdn.net/bingkingboy/article/details/50160221" rel="nofollow noreferrer" target="_blank">JS添加事件和解绑事件：addEventListener()与removeEventListener() - CSDN</a></li>
<li><a href="https://my.oschina.net/u/1454562/blog/205010" rel="nofollow noreferrer" target="_blank">addEventListener的第三个参数</a></li>
<li><a href="http://www.jb51.net/article/65509.htm" rel="nofollow noreferrer" target="_blank">js网页滚动条滚动事件实例分析</a></li>
<li><a href="https://stackoverflow.com/questions/44979148/vue2-window-addeventlistener-scroll-doesnt-fire" rel="nofollow noreferrer" target="_blank">Vue2 window addEventListener scroll doesnt fire? - stackoverflow</a></li>
<li><a href="https://stackoverflow.com/questions/19236549/overflowscroll-not-working" rel="nofollow noreferrer" target="_blank">Overflow:scroll not working - stackoverflow</a></li>
<li><a href="https://www.cnblogs.com/xiaojingyuan/p/6008424.html" rel="nofollow noreferrer" target="_blank">onscroll事件没有响应的原因以及vue.js中添加onscroll事件监听的方法 - 博客园</a></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
做一个具有异步加载特性的 echarts-vue 组件

## 原文链接
[https://segmentfault.com/a/1190000011230007](https://segmentfault.com/a/1190000011230007)

