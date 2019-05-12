---
title: 'vue异步组件(高级异步组件)使用场景及实践' 
date: 2018-12-24 2:30:07
hidden: true
slug: ydz6ximz1ss
categories: [reprint]
---

{{< raw >}}

                    
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="背景介绍：
随着项目越来越大，性能问题已经成为了困扰业务发展的重要因素。
功能不停地累加后，核心页面已经不堪重负，访问速度愈来愈慢。
业务发展、用户体验都非常迫切的需要释放页面的负载，提高页面加载速度。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>背景介绍：
随着项目越来越大，性能问题已经成为了困扰业务发展的重要因素。
功能不停地累加后，核心页面已经不堪重负，访问速度愈来愈慢。
业务发展、用户体验都非常迫切的需要释放页面的负载，提高页面加载速度。
</code></pre>
<p>一直在寻找一个优雅的实现前端模块化、并能按权重的优先级顺序异步加载的实现方案。突然了解到<strong>vue的异步组件</strong>，于是便专门研究实践了一下。</p>
<hr>
<p>首先看一下官网对异步组件的介绍：<br><span class="img-wrap"><img data-src="/img/remote/1460000012138056?w=1290&amp;h=1188" src="https://static.alili.tech/img/remote/1460000012138056?w=1290&amp;h=1188" alt="异步组件.png" title="异步组件.png" style="cursor: pointer; display: inline;"></span><br>嗯，比较简单的介绍，不过这个特性确实是我眼前一亮，接下来就上代码，看看效果如何：<br>webpack简单设置以及工程结构<br><span class="img-wrap"><img data-src="/img/remote/1460000012138057?w=1862&amp;h=1570" src="https://static.alili.tech/img/remote/1460000012138057?w=1862&amp;h=1570" alt="异步组件-工程.png" title="异步组件-工程.png" style="cursor: pointer; display: inline;"></span><br><strong>简单的webpack+vue配置</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var webpack = require('webpack');
module.exports = {
watch: true,    //监听变化自动编译
entry: {
    'index': './src/index.js',
},
output: {
    path: './dist/',
    filename: '[name].min.js',
    publicPath:'./dist/'
},
module: {
    loaders: [
        {
            test: /\.vue$/, //解析vue模板
            loader: &quot;vue-loader&quot;
        },
        {
            test: /\.js$/, //js转换
            exclude: /(node_modules)/,
            loader: &quot;babel-loader&quot;,
            query: {
                presets: ['es2015']
            }
        },
        {
            test: /\.css$/, //css转换
            loader: 'vue-style!css'
        }
    ]
},
vue: {
    loaders: {
        css: 'vue-style!css',
    }
}
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>var webpack = require(<span class="hljs-string">'webpack'</span>);
module.exports = {
<span class="hljs-string">watch:</span> <span class="hljs-literal">true</span>,    <span class="hljs-comment">//监听变化自动编译</span>
<span class="hljs-string">entry:</span> {
    <span class="hljs-string">'index'</span>: <span class="hljs-string">'./src/index.js'</span>,
},
<span class="hljs-string">output:</span> {
<span class="hljs-symbol">    path:</span> <span class="hljs-string">'./dist/'</span>,
<span class="hljs-symbol">    filename:</span> <span class="hljs-string">'[name].min.js'</span>,
<span class="hljs-symbol">    publicPath:</span><span class="hljs-string">'./dist/'</span>
},
<span class="hljs-string">module:</span> {
<span class="hljs-symbol">    loaders:</span> [
        {
<span class="hljs-symbol">            test:</span> <span class="hljs-regexp">/\.vue$/</span>, <span class="hljs-comment">//解析vue模板</span>
<span class="hljs-symbol">            loader:</span> <span class="hljs-string">"vue-loader"</span>
        },
        {
<span class="hljs-symbol">            test:</span> <span class="hljs-regexp">/\.js$/</span>, <span class="hljs-comment">//js转换</span>
<span class="hljs-symbol">            exclude:</span> <span class="hljs-regexp">/(node_modules)/</span>,
<span class="hljs-symbol">            loader:</span> <span class="hljs-string">"babel-loader"</span>,
<span class="hljs-symbol">            query:</span> {
<span class="hljs-symbol">                presets:</span> [<span class="hljs-string">'es2015'</span>]
            }
        },
        {
<span class="hljs-symbol">            test:</span> <span class="hljs-regexp">/\.css$/</span>, <span class="hljs-comment">//css转换</span>
<span class="hljs-symbol">            loader:</span> <span class="hljs-string">'vue-style!css'</span>
        }
    ]
},
<span class="hljs-string">vue:</span> {
<span class="hljs-symbol">    loaders:</span> {
<span class="hljs-symbol">        css:</span> <span class="hljs-string">'vue-style!css'</span>,
    }
}
};</code></pre>
<p><strong>入口js文件：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue';
import Frame from './index.vue';
let app = new Vue({
    el: '#app',
    render: h => h(Frame),
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">import</span> Frame <span class="hljs-keyword">from</span> <span class="hljs-string">'./index.vue'</span>;
<span class="hljs-keyword">let</span> app = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
    <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(Frame),
});</code></pre>
<p><strong>框架文件：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
<div>
    异步组件测试
    点击按钮后
    第一个延迟300毫秒，从服务器加载
    第二个不延迟从服务器加载
    <template v-if=&quot;show&quot;>
        <later></later>
        <later2></later2>
    </template>
    <button @click=&quot;toggle&quot;>加载</button>
</div>
</template>
<script>
import Vue from 'vue';
const later = Vue.component('later', function (resolve) {
    setTimeout(function () {
        require(['./later.vue'], resolve)
    }, 3000);
});
const later2 = Vue.component('later2', function (resolve) {
    require(['./later2.vue'], resolve)
});
export default{
    data: function () {
        return {
            show: false
        };
    },
    components: {
        later,
        later2,
    },
    created: function () {

    },
    mounted: function () {
    },
    computed: {},
    methods: {
        toggle:function () {
            this.show = !this.show;
        }
    },
}
</script>
<style>
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    异步组件测试
    点击按钮后
    第一个延迟300毫秒，从服务器加载
    第二个不延迟从服务器加载
    <span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"show"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">later</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">later</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">later2</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">later2</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"toggle"</span>&gt;</span>加载<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>;
<span class="hljs-keyword">const</span> later = Vue.component(<span class="hljs-string">'later'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve</span>) </span>{
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">require</span>([<span class="hljs-string">'./later.vue'</span>], resolve)
    }, <span class="hljs-number">3000</span>);
});
<span class="hljs-keyword">const</span> later2 = Vue.component(<span class="hljs-string">'later2'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve</span>) </span>{
    <span class="hljs-built_in">require</span>([<span class="hljs-string">'./later2.vue'</span>], resolve)
});
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
    <span class="hljs-attr">data</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">show</span>: <span class="hljs-literal">false</span>
        };
    },
    <span class="hljs-attr">components</span>: {
        later,
        later2,
    },
    <span class="hljs-attr">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{

    },
    <span class="hljs-attr">mounted</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    },
    <span class="hljs-attr">computed</span>: {},
    <span class="hljs-attr">methods</span>: {
        <span class="hljs-attr">toggle</span>:<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">this</span>.show = !<span class="hljs-keyword">this</span>.show;
        }
    },
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined">
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p><strong>服务器异步组件1：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
<div>
    load me later 11111
</div>
</template>
<script>
export default{
    data: function () {
        return {};
    },
    components: {},
    created: function () {
    },
    mounted: function () {
    },
    computed: {},
    methods: {},
}
</script>
<style>
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    load me later 11111
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
    <span class="hljs-attr">data</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> {};
    },
    <span class="hljs-attr">components</span>: {},
    <span class="hljs-attr">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    },
    <span class="hljs-attr">mounted</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    },
    <span class="hljs-attr">computed</span>: {},
    <span class="hljs-attr">methods</span>: {},
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined">
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p><strong>服务器异步组件2：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
<div>
    load me later 22222
</div>
</template>
<script>
export default{
    data: function () {
        return {};
    },
    components: {},
    created: function () {
    },
    mounted: function () {
    },
    computed: {},
    methods: {},
}
</script>
<style>
</style>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    load me later 22222
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
    <span class="hljs-attr">data</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> {};
    },
    <span class="hljs-attr">components</span>: {},
    <span class="hljs-attr">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    },
    <span class="hljs-attr">mounted</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    },
    <span class="hljs-attr">computed</span>: {},
    <span class="hljs-attr">methods</span>: {},
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined">
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

</code></pre>
<hr>
<p>好，我们跑起来看看效果！！！</p>
<p><strong>1、刷新页面，加载框架</strong><br><span class="img-wrap"><img data-src="/img/remote/1460000012138058" src="https://static.alili.tech/img/remote/1460000012138058" alt="第一步.png" title="第一步.png" style="cursor: pointer; display: inline;"></span><br><strong>2、点击加载，此时异步组件2，立刻从服务器加载下来，渲染出来</strong><br><span class="img-wrap"><img data-src="/img/remote/1460000012138059?w=2338&amp;h=724" src="https://static.alili.tech/img/remote/1460000012138059?w=2338&amp;h=724" alt="第二部.png" title="第二部.png" style="cursor: pointer;"></span><br><strong>3、点击加载后，3000毫秒，此时异步组件1被触发从服务器加载，渲染</strong><br><span class="img-wrap"><img data-src="/img/remote/1460000012138060?w=2288&amp;h=822" src="https://static.alili.tech/img/remote/1460000012138060?w=2288&amp;h=822" alt="第三部.png" title="第三部.png" style="cursor: pointer;"></span></p>
<p>利用此特性，我们便能做很多针对前端的优化。<br>比如：将页面核心功能（音、视频播放、文章、商品等等）打包成一个核心模块，通过框架优先加载。<br>其他的一些周边功能打包后，通过服务器异步加载，从而解决业务需求越来越多导致的系统难维护、访问慢问题。</p>
<hr>
<p>此时，聪明的小伙伴们肯定在想了，既然是异步加载，就会存在加载过程（正在加载中）、以及加载失败等异常情况。<br>这时候怎么办呢，一个个状态去维护吗？No！</p>
<p>我们看看官网另一个特性：<br><span class="img-wrap"><img data-src="/img/remote/1460000012138061?w=1298&amp;h=858" src="https://static.alili.tech/img/remote/1460000012138061?w=1298&amp;h=858" alt="高级一部.png" title="高级一部.png" style="cursor: pointer;"></span></p>
<p>相信经过上面的使用教程以后，高级异步组件大家一眼就能看懂并会使用，是不是很完美!!!</p>
<p>再稍作研究，就准备将它用到实际生产啦。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue异步组件(高级异步组件)使用场景及实践

## 原文链接
[https://segmentfault.com/a/1190000012138052](https://segmentfault.com/a/1190000012138052)

