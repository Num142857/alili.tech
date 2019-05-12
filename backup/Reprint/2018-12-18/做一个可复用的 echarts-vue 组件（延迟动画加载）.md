---
title: '做一个可复用的 echarts-vue 组件（延迟动画加载）' 
date: 2018-12-18 2:30:11
hidden: true
slug: z6h4liz7mmo
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>在 vue 项目使用 echarts 的场景中，以下三点不容忽视：1. 可视化的数据往往是异步加载的；2. 若一个页面存在大量的图表（ 尤其当存在关系图和地图时 ），往往会导致该页面的渲染速度很慢并可能在几秒内卡死，产生极差的用户体验。3. 引入 echarts 组件导致编译后的文件过大从而使得首次访问的加载极慢。关于第三点，大家可以参考之前的撰文&nbsp;<a href="https://segmentfault.com/a/1190000010955172#articleHeader2">优化 Vue 项目编译文件大小</a>。以下针对上述前两点，给出数据异步、延迟渲染的 echarts vue 组件的设计和实现方式，并对实现之中可能存在的问题进行介绍。</blockquote>
<h1 id="articleHeader0">1. 抽离 echarts 公共部分形成基础组件</h1>
<hr>
<h3 id="articleHeader1">1.1 调研公共部分</h3>
<p>首先，我们需要把 echarts 使用中公共的部分抽离出来，形成基础组件。</p>
<p>让我们在&nbsp;<a href="http://echarts.baidu.com/tutorial.html#5%20%E5%88%86%E9%92%9F%E4%B8%8A%E6%89%8B%20ECharts" rel="nofollow noreferrer" target="_blank">官网 - 5 分钟上手 ECharts</a>&nbsp;教程中找到使用 echarts 的步骤：</p>
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
myEcharts.setOption(option)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code><span class="hljs-comment"># 1. 获取一个用于挂在 echarts 的 DOM 元素</span>
<span class="hljs-keyword">let</span> $echartsDOM = document.getElementById('echarts-dom')

<span class="hljs-comment"># 2. 初始化</span>
<span class="hljs-keyword">let</span> myEcharts = echarts.init($echartsDOM)

<span class="hljs-comment"># 3. 设置配置项</span>
<span class="hljs-keyword">let</span> option = <span class="hljs-meta">{...}</span>

<span class="hljs-comment"># 4. 为 echarts 指定配置</span>
myEcharts.setOption(option)
</code></pre>
<h6>注：在 Vue 中，首先我们需要使用 import echarts from 'echarts' 以引入 echarts。</h6>
<p>由上可知，在 echarts 使用中，除第三步设置配置项以外，其他的步骤都是重复的，即可以抽离出来放入组件中统一实现。</p>
<h6>注：其实 option 配置中也存在可以抽离的部分，比如我们可以将 echarts 的颜色、散点大小、折线粗细等提取出来统一赋值，以保证 echarts 风格的统一。但由于不同类型的 ehcarts 图的颜色配置方式不同，因而实现起来相对繁琐，这里不进行说明，有兴趣的同学可以自行尝试。</h6>
<h3 id="articleHeader2">1.2 实现 echarts 功能</h3>
<p>首先我们书写一个简单 <code>ehcart.vue</code>，其中，配置项直接复制于官网的教程示例。</p>
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
<p>然后在<code>App.vue</code>中引入这一组件，并设置 echarts 的宽高：</p>
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
    import iEchart from './components/echart'

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
    <span class="hljs-keyword">import</span> iEchart <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/echart'</span>

    <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">'app'</span>,
        <span class="hljs-attr">components</span>: {
            iEchart
        }
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>刷新页面后，即可看到柱状图。</p>
<h3 id="articleHeader3">1.3 组件化</h3>
<p>由于我们需要抽离 option 部分，最好的方式是将其作为组件的属性，即 props 交由调用方配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# echart.vue

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
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code><span class="hljs-meta"># echart.vue</span>

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
}
</code></pre>
<h3 id="articleHeader4">1.4 调用组件</h3>
<p>然后我们可以将 option 配置抽离到组件调用方，并通过「传参」的方式进行调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<i-echart :option=&quot;option&quot; class=&quot;echarts-container&quot;></i-echart>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;i-echart :option=<span class="hljs-string">"option"</span> <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"echarts-container"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">i-echart</span>&gt;</span>
</span></code></pre>
<h3 id="articleHeader5">1.5 提高组件强壮型</h3>
<p>之前我们注意到，在 option 参数中，我们给出了默认值 {}，即空对象。这样做其实是有问题的，即在 echarts 中，如果传入的 option 配置对象不含有 series 键，就会抛出错误：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Error: Option should contains series." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs subunit"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">Error: </span>Option should contains series.</code></pre>
<p>默认值处理是需要存在的，即当调用方传入的对象为空或不存在 series 配置时，应在页面上显示一些提示（ 对用户友好的提示，而不是对编程人员 ），即避免因报错而造成空白的情况。</p>
<p>此外，当我们像之前那样给 option 这一参数进行类型限制后，倘若调用方传入非对象类型，Vue 会直接抛出错误——这一结果也不是我们想要的。我们应该取消类型限制，并在 option 发生变化时进行依次以下判断：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. 是否为对象；
2. 是否为空对象；
3. 是否包含 series 键；
4. series 是否为数组；
5. series 数组是否为空。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code><span class="hljs-bullet">1. </span>是否为对象；
<span class="hljs-bullet">2. </span>是否为空对象；
<span class="hljs-bullet">3. </span>是否包含 series 键；
<span class="hljs-bullet">4. </span>series 是否为数组；
<span class="hljs-bullet">5. </span>series 数组是否为空。
</code></pre>
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
}
" title="" data-original-title="复制"></span>
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
}
</code></pre>
<h6>注：实际上，当判断出 option 为对象后，可以直接进行第三步的判断。</h6>
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
        return { }
    },
    mounted() {
        //# 1. 获取一个用于挂在 echarts 的 DOM 元素
        let $echartsDOM = document.getElementById('echarts-dom')
        //# 2. 初始化
        let myEcharts = echarts.init($echartsDOM)
        //# 3. 设置配置项    let option = {...}
       //# 4. 为 echarts 指定配置   myEcharts.setOption(option)
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
            let option = this.option    //配置等于父组件传过来的数据
            if(isValidOption(option)){
                this.myEcharts.setOption(option);       //渲染出来
                this.myEcharts.hideLoading();           //隐藏加载动画
            }else{
                this.myEcharts.showLoading();           //加载动画
            }
        }
    }
}
" title="" data-original-title="复制"></span>
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
        <span class="hljs-keyword">return</span> { }
    },
    mounted() {
        <span class="hljs-comment">//# 1. 获取一个用于挂在 echarts 的 DOM 元素</span>
        let $echartsDOM = document.getElementById(<span class="hljs-string">'echarts-dom'</span>)
        <span class="hljs-comment">//# 2. 初始化</span>
        let myEcharts = echarts.init($echartsDOM)
        <span class="hljs-comment">//# 3. 设置配置项    let option = {...}</span>
       <span class="hljs-comment">//# 4. 为 echarts 指定配置   myEcharts.setOption(option)</span>
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
            let option = <span class="hljs-keyword">this</span>.option    <span class="hljs-comment">//配置等于父组件传过来的数据</span>
            <span class="hljs-keyword">if</span>(isValidOption(option)){
                <span class="hljs-keyword">this</span>.myEcharts.setOption(option);       <span class="hljs-comment">//渲染出来</span>
                <span class="hljs-keyword">this</span>.myEcharts.hideLoading();           <span class="hljs-comment">//隐藏加载动画</span>
            }<span class="hljs-keyword">else</span>{
                <span class="hljs-keyword">this</span>.myEcharts.showLoading();           <span class="hljs-comment">//加载动画</span>
            }
        }
    }
}
</code></pre>
<p>这里在书写代码时，有以下几点需要注意：</p>
<ul>
<li>
<strong>1、</strong>我们对 DOM 元素获取结果做了校验，即当 option 不符合要求时，ID       为 echarts-dom 的 DOM 元素是不存在的，此时 <code>document.getElementById()</code> 的返回结果为空，不能直接使用 <code>echarts.init()</code>，否则会抛出错误：<code>Error: Initialize failed: invalid dom</code>；</li>
<li>
<strong>2、</strong>在 Vue 中，初始化的值不会被 watch 钩子捕捉，从而导致组件被调用方调用并赋予 option 参数时不会进入校验。虽然可以使用 <code>immediate: true</code> 使得 <code>watch</code> 钩子能够在属性初始化赋值时被触发，但这样做是不合适的。因为这样设置之后，在 option 初始化从而触发 watch 时，用于挂载 echarts 的 DOM 元素还未存在于页面中，从而导致出现 <code>TypeError: Cannot read property 'setOption' of null</code> 的错误。我们要重点注意 echarts 作用的生命周期，这一点后续还会涉及。</li>
</ul>
<h3 id="articleHeader6">1.6 增强组件功能 - 数据加载提示</h3>
<p>在实际场景中，用于渲染的数据常常是异步获取的，在异步加载数据之中，我们可能需要在页面中显示如「正在加载...」的字样来表示加载过程正在进行以提高用户体验。而加载过程就组件而言是无法直接获取的，所以，我们需要使用某一参数用于进行加载信息的显示</p>
<p>ECharts 默认有提供了一个简单的加载动画。只需要调用&nbsp;<a href="http://echarts.baidu.com/api.html#echartsInstance.showLoading" rel="nofollow noreferrer" target="_blank">showLoading</a>&nbsp;方法显示。数据加载完成后再调用&nbsp;<a href="http://echarts.baidu.com/api.html#echartsInstance.hideLoading" rel="nofollow noreferrer" target="_blank">hideLoading</a>&nbsp;方法隐藏加载动画。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//在App.vue中模拟3秒后获取数据
data() {
  return {
    option:  {}
  }
},
created(){
    setTimeout(()=>{
        this.option={
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
        console.log(this.option);
    },3000)
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>//在App.vue中模拟<span class="hljs-number">3</span>秒后获取数据
data() {
  return {
    option:  {}
  }
},
created(){
    setTimeout(()=&gt;{
        this.option={
                      title: {
        text: <span class="hljs-string">'ECharts 入门示例'</span>
      },
      tooltip: {},
      legend: {
        data: [<span class="hljs-string">'销量'</span>]
      },
      xAxis: {
        data: [<span class="hljs-string">"衬衫"</span>, <span class="hljs-string">"羊毛衫"</span>, <span class="hljs-string">"雪纺衫"</span>, <span class="hljs-string">"裤子"</span>, <span class="hljs-string">"高跟鞋"</span>, <span class="hljs-string">"袜子"</span>]
      },
      yAxis: {},
      series: [{
        name: <span class="hljs-string">'销量'</span>,
        type: <span class="hljs-string">'bar'</span>,
        data: [<span class="hljs-number">5</span>, <span class="hljs-number">20</span>, <span class="hljs-number">36</span>, <span class="hljs-number">10</span>, <span class="hljs-number">10</span>, <span class="hljs-number">20</span>]
      }]
        }
        console.log(this.option);
    },<span class="hljs-number">3000</span>)
}
</code></pre>
<p>然后就可以在echarts组件里调用了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="methods: {
    checkAndSetOption(){
        let option = this.option    //配置等于父组件传过来的数据
        if(isValidOption(option)){
            this.myEcharts.setOption(option);       //渲染出来
            this.myEcharts.hideLoading();           //隐藏加载动画
        }else{
            this.myEcharts.showLoading();           //加载动画
        }
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>methods: {
    checkAndSetOption(){
        let option = <span class="hljs-keyword">this</span>.option    <span class="hljs-comment">//配置等于父组件传过来的数据</span>
        <span class="hljs-keyword">if</span>(isValidOption(option)){
            <span class="hljs-keyword">this</span>.myEcharts.setOption(option);       <span class="hljs-comment">//渲染出来</span>
            <span class="hljs-keyword">this</span>.myEcharts.hideLoading();           <span class="hljs-comment">//隐藏加载动画</span>
        }<span class="hljs-keyword">else</span>{
            <span class="hljs-keyword">this</span>.myEcharts.showLoading();           <span class="hljs-comment">//加载动画</span>
        }
    }
}
</code></pre>
<h3 id="articleHeader7">1.7 增强组件功能 - 数据不合法提示</h3>
<p>当传入的 option 值不符合规定时。基于这一标识，我们可以对 echarts 组件进行优化，当 option 不合法或数据为空时给出提示信息而不是显示空白甚至报错。</p>
<h2 id="articleHeader8">PS:暂时更新到这了，如果有后续，我回接着更新了</h2>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
做一个可复用的 echarts-vue 组件（延迟动画加载）

## 原文链接
[https://segmentfault.com/a/1190000012803831](https://segmentfault.com/a/1190000012803831)

