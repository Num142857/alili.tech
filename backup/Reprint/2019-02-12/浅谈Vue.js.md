---
title: '浅谈Vue.js' 
date: 2019-02-12 2:30:12
hidden: true
slug: z3s1wum6qjj
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>作为一名Vue.js的忠实用户，我想有必要写点文章来歌颂这一门美好的语言了，我给它的总体评价是“简单却不失优雅，小巧而不乏大匠”，下面将围绕这句话给大家介绍Vue.js，希望能够激发你对Vue.js的兴趣。</p></blockquote>
<h2 id="articleHeader0">Vue.js简介</h2>
<p>Vue.js的作者为Evan You（尤雨溪），任职于Google Creative Lab，虽然Vue是一个个人项目，但在发展前景上个人认为绝不输于Google的AngularJs，下面我会将Vue与Angular（Angular 1.0+版本）做一些简单的比较。</p>
<p>Vue的主要特点就和它官网（<a href="http://cn.vuejs.org/" rel="nofollow noreferrer" target="_blank">http://cn.vuejs.org/</a>）所介绍的那样：</p>
<p>（1） 简洁 （2） 轻量 （3）快速 （4） 数据驱动 （5） 模块友好 （6） 组件化</p>
<h2 id="articleHeader1">简单</h2>
<p>下面看一段Angular的实现双向绑定的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// html
<body ng-app=&quot;myApp&quot;>
    <div ng-controller=&quot;myCtrl&quot;>
        <p>"{{" note "}}"</p>
        <input type=&quot;text&quot; ng-model=&quot;note&quot;>
    </div>
</body>

// js
var myModule = angular.module('myApp', []);

myModule.controller('myCtrl', ['$scopp', function($scope) {
    $scope.note = '';
]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// html</span>
&lt;body ng-app=<span class="hljs-string">"myApp"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ng-controller</span>=<span class="hljs-string">"myCtrl"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>"{{" note "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">ng-model</span>=<span class="hljs-string">"note"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></span>

<span class="hljs-comment">// js</span>
<span class="hljs-keyword">var</span> myModule = angular.module(<span class="hljs-string">'myApp'</span>, []);

myModule.controller(<span class="hljs-string">'myCtrl'</span>, [<span class="hljs-string">'$scopp'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">$scope</span>) </span>{
    $scope.note = <span class="hljs-string">''</span>;
]);</code></pre>
<p>然后再看一下Vue的代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// html
<body>
    <div id=&quot;app&quot;>
        <p>"{{" note "}}"</p>
        <input type=&quot;text&quot; v-model=&quot;note&quot;>
    </div>
</body>

// js
var vm = new Vue({
    el: '#app',
    data: {
        note: ''
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// html</span>
&lt;body&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>"{{" note "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"note"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></span>

<span class="hljs-comment">// js</span>
<span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">'#app'</span>,
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">note</span>: <span class="hljs-string">''</span>
    }
})</code></pre>
<p>相比较而言我个人认为Vue的代码编写风格更加简洁，并且通俗易懂。</p>
<h2 id="articleHeader2">不失优雅</h2>
<p>Vue虽然是一个比较轻量级的框架，简单轻量的同时还非常的人性化，其提供的API也是非常的容易理解，同时也提供了一些很便捷的指令和属性。</p>
<p>例如：</p>
<p>（1）绑定click事件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a v-on:click=&quot;doSomething&quot;></a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-keyword">a</span> v-<span class="hljs-keyword">on</span>:<span class="hljs-title">click</span>=<span class="hljs-string">"doSomething"</span>&gt;&lt;/<span class="hljs-title">a</span>&gt;</code></pre>
<p>可以简写为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a @click=&quot;doSomething&quot;></a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"doSomething"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<p>(2) 绑定动态属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a v-bind:href=&quot;url&quot;></a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-bind:href</span>=<span class="hljs-string">"url"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<p>可以简写为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a :href=&quot;url&quot;></a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;">&lt;a <span class="hljs-symbol">:href=<span class="hljs-string">"url"</span>&gt;&lt;/a&gt;</span></code></pre>
<p>(3) 便捷的修饰符</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 阻止单击事件冒泡 -->
<a @click.stop=&quot;doSomething&quot;></a>

<!-- 只在按下回车键的时候触发事件 -->
<input @keyup.enter=&quot;submit&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- 阻止单击事件冒泡 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> @<span class="hljs-attr">click.stop</span>=<span class="hljs-string">"doSomething"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 只在按下回车键的时候触发事件 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> @<span class="hljs-attr">keyup.enter</span>=<span class="hljs-string">"submit"</span>&gt;</span></code></pre>
<p>(4) 实用的参数特性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- debounce 设置一个最小的延时 -->
<input v-model=&quot;note&quot; debounce=&quot;500&quot;>

<!-- 在 &quot;change&quot; 而不是 &quot;input&quot; 事件中更新数据 -->
<input v-model=&quot;msg&quot; lazy>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- debounce 设置一个最小的延时 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"note"</span> <span class="hljs-attr">debounce</span>=<span class="hljs-string">"500"</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 在 "change" 而不是 "input" 事件中更新数据 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"msg"</span> <span class="hljs-attr">lazy</span>&gt;</span></code></pre>
<p>怎么样，是不是感觉优雅极了。</p>
<h2 id="articleHeader3">小巧</h2>
<p>说起小巧，那应该首先要关注下Vue的源码大小，Vue的生产版本（即min版）源码仅为72.9kb，官网称gzip压缩后只有25.11kb，相比Angular的144kb缩小了一半。</p>
<p>小巧的一种好处就是可以让用户更自由的选择相应的解决方案，在配合其他库方面它给了用户更大的空间。</p>
<p>如Vue的核心默认是不包含路由和 Ajax 功能，但是如果项目中需要路由和AJAX，可以直接使用Vue提供的官方库Vue-router及第三方插件vue-resource，同时你也可以使用其他你想要使用的库或插件，如jQuery的AJAX等。</p>
<p>是不是感觉非常的灵活。</p>
<h2 id="articleHeader4">不乏大匠</h2>
<p>Vue虽然小巧，但是“麻雀虽小五脏俱全”，在构建大型应用的时候也是得心应手。</p>
<p>(1) 模块化</p>
<p>结合一些第三方模块构建工具，如CommonJS、RequireJS或者SeaJs，可以轻松实现代码的模块化。</p>
<p>但是在这里小编不推荐使用上述构建工具，直接使用ES6的模块化功能，再结合Webpack进行相应打包是目前最热门的方案。</p>
<p>不了解ES6模块功能的可以详见：<a href="http://es6.ruanyifeng.com/#docs/module" rel="nofollow noreferrer" target="_blank">http://es6.ruanyifeng.com/#docs/module</a><br>在今后的文章中，我也会对其进行介绍，包括Webpack的配置。</p>
<p>(2) 组件化</p>
<p>Vue的组件化功能可谓是它的一大亮点，通过将页面上某一组件的html、CSS、js代码放入一个.vue的文件中进行管理可以大大提高代码的维护性。</p>
<p>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// App.vue
<template>
    <div class=&quot;box&quot; v-text=&quot;note&quot;></div>
</template>

<script>
export default {
    data () {
        return {
            note: '这是一个组件的html模板！'
        }
    }
}
</script>

<style scoped>
.box {
    color: #000;
}
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>// App.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span> <span class="hljs-attr">v-text</span>=<span class="hljs-string">"note"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data () {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">note</span>: <span class="hljs-string">'这是一个组件的html模板！'</span>
        }
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.box</span> {
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#000</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>我们还可以在组件里写一些预处理语言：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// App.vue
<template lang='jade'>
    div(class=&quot;box&quot; v-text=&quot;text&quot;)
</template>

<script>
export default {
    data () {
        return {
            note: '这是一个组件的html模板！'
        }
    }
}
</script>

<style lang=&quot;stylus&quot;>
.box 
    color: #000
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>// App.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">'jade'</span>&gt;</span>
    div(class="box" v-text="text")
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data () {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">note</span>: <span class="hljs-string">'这是一个组件的html模板！'</span>
        }
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"stylus"</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.box</span> 
    <span class="hljs-selector-tag">color</span>: <span class="hljs-selector-id">#000</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<p>当然这样写我们是需要通过webpack来进行打包的，推荐使用Webpack + vue-loader的方式，同时使用ES6语法，需要安装babel来进行转换。因为文章为浅谈Vue.js，所以这里不做深入介绍。</p>
<p>(3) 路由</p>
<p>和Angular一样，Vue也具有它的路由功能。通过路由功能，我们可以实现各个组件的按需加载，轻松构建单页应用。下面是一个简单的路由配置文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// router.js

'use strict'

export default function(router) {
    router.map({
        '/': {
            component: function (resolve) {
              require(['./components/Foo.vue'], resolve)
            }
        },
        '/foo': {
            component: function (resolve) {
              require(['./components/Foo.vue'], resolve)
            }
        },
        '/bar': {
            component: function (resolve) {
              require(['./components/Bar.vue'], resolve)
            }
        }
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// router.js</span>
<span class="hljs-meta">
'use strict'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">router</span>) </span>{
    router.map({
        <span class="hljs-string">'/'</span>: {
            <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve</span>) </span>{
              <span class="hljs-built_in">require</span>([<span class="hljs-string">'./components/Foo.vue'</span>], resolve)
            }
        },
        <span class="hljs-string">'/foo'</span>: {
            <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve</span>) </span>{
              <span class="hljs-built_in">require</span>([<span class="hljs-string">'./components/Foo.vue'</span>], resolve)
            }
        },
        <span class="hljs-string">'/bar'</span>: {
            <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve</span>) </span>{
              <span class="hljs-built_in">require</span>([<span class="hljs-string">'./components/Bar.vue'</span>], resolve)
            }
        }
    })
}</code></pre>
<p>如需查看具体的路由配置及使用，移步官方提供的文档：<a href="http://vuejs.github.io/vue-router/zh-cn/index.html" rel="nofollow noreferrer" target="_blank">http://vuejs.github.io/vue-router/zh-cn/index.html</a></p>
<h2 id="articleHeader5">总结</h2>
<blockquote><p>个人认为前端的一些技术都是融会贯通的，学习一门语言或者框架本身并不是为了学习它的技术，最重要的是学习它的思维，只有思维层面得到了延伸，学习其他技术的时候会发现得心应手。Vue带给我们的是前端一种解决问题的新的思维。</p></blockquote>
<p>本文地址：<a href="https://segmentfault.com/a/1190000004704498#shareToWeibo">https://segmentfault.com/a/1190000004704498#shareToWeibo</a><br>博客园：<a href="http://www.cnblogs.com/luozhihao/p/5329440.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/luozhihao/p/5329440.html</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
浅谈Vue.js

## 原文链接
[https://segmentfault.com/a/1190000004704498](https://segmentfault.com/a/1190000004704498)

