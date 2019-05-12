---
title: 'vue无缝滚动' 
date: 2018-12-16 2:30:10
hidden: true
slug: qqy5gvd0ygn
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0"><a href="https://github.com/chenxuan0000/vue-seamless-scroll" rel="nofollow noreferrer" target="_blank">vue-seamless-scroll</a></h1>
<blockquote>一个简单的基于vue.js的无缝滚动</blockquote>
<p><a href="https://www.npmjs.com/package/vue-seamless-scroll" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000012821196" src="https://static.alili.tech/img/remote/1460000012821196" alt="Build Status" title="Build Status" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/remote/1460000012821197" src="https://static.alili.tech/img/remote/1460000012821197" alt="LICENSE MIT" title="LICENSE MIT" style="cursor: pointer; display: inline;"></span></a> <span class="img-wrap"><img data-src="/img/remote/1460000012943494" src="https://static.alili.tech/img/remote/1460000012943494" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV2tmH?w=438&amp;h=100" src="https://static.alili.tech/img/bV2tmH?w=438&amp;h=100" alt="687474703a2f2f70322e7171796f752e636f6d2f6269616f71696e672f55706c6f61645069632f323031332d322f312f323031333032303132303536353534343730322e676966" title="687474703a2f2f70322e7171796f752e636f6d2f6269616f71696e672f55706c6f61645069632f323031332d322f312f323031333032303132303536353534343730322e676966" style="cursor: pointer; display: inline;"></span></p>
<p>?<a href="https://chenxuan0000.github.io/component-document/index_prod.html#/component/seamless-default" rel="nofollow noreferrer" target="_blank">在线文档demo</a> <br>   ? <a href="https://chenxuan0000.github.io/vue-seamless-scroll/" rel="nofollow noreferrer" target="_blank">小demo</a> <br>   ? <a href="https://github.com/chenxuan0000/vue-seamless-scroll/blob/master/README.md" rel="nofollow noreferrer" target="_blank">English Document</a></p>
<h2 id="articleHeader1">安装</h2>
<h3 id="articleHeader2">NPM</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vue-seamless-scroll --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install vue-seamless-scroll --save</code></pre>
<h2 id="articleHeader3">使用</h2>
<h3 id="articleHeader4">ES6</h3>
<blockquote>详情的demo页面 <a href="https://github.com/chenxuan0000/vue-seamless-scroll/blob/master/examples-src/App.vue" rel="nofollow noreferrer" target="_blank">example-src/App.vue</a>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// **main.js**
import Vue from 'vue'
import scroll from 'vue-seamless-scroll'
Vue.use(scroll)

<template>
  <vue-seamless-scroll></vue-seamless-scroll>
</template>

// 或者你可以自己设置全局注册的组件名 默认注册的组件名是 vue-seamless-scroll
Vue.use(scroll,{componentName: 'scroll-seamless'})

<template>
  <scroll-seamless></scroll-seamless>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// **main.js**</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> scroll <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-seamless-scroll'</span>
Vue.use(scroll)

&lt;template&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">vue-seamless-scroll</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">vue-seamless-scroll</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span>

<span class="hljs-comment">// 或者你可以自己设置全局注册的组件名 默认注册的组件名是 vue-seamless-scroll</span>
Vue.use(scroll,{<span class="hljs-attr">componentName</span>: <span class="hljs-string">'scroll-seamless'</span>})

&lt;template&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">scroll-seamless</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">scroll-seamless</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span></code></pre>
<h3 id="articleHeader5">普通的使用方法 (script标签引入)</h3>
<p>Example:</p>
<blockquote>详情的demo页面 <a href="https://github.com/chenxuan0000/vue-seamless-scroll/blob/master/test/test.html" rel="nofollow noreferrer" target="_blank">test/test.html</a>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
<head>
  ...
</head>
<body>
  <div id=&quot;app&quot;>
    <vue-seamless-scroll></vue-seamless-scroll>
  </div>
  <script src=&quot;vue.js&quot;></script>
  <script src=&quot;vue-seamless-scroll&quot;></script>
  <script>
    new Vue({
      el: '#app'
    })
  </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  ...
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">vue-seamless-scroll</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">vue-seamless-scroll</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"vue.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"vue-seamless-scroll"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">new</span> Vue({
      el: <span class="hljs-string">'#app'</span>
    })
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h2 id="articleHeader6">配置项默认值</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      defaultOption () {
        return {
          step: 1, //数值越大速度滚动越快
          limitMoveNum: 5, //开始无缝滚动的数据量  //this.dataList.length
          hoverStop: true, //是否开启鼠标悬停stop
          direction: 1, // 0向下 1向上 2向左 3向右
          openWatch: true, //开启数据实时监控刷新dom
          singleHeight: 0, //单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
          singleWidth: 0, //单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
          waitTime: 1000 //单步运动停止的时间(默认值1000ms)
        }
      }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">      defaultOption () {
        <span class="hljs-keyword">return</span> {
          <span class="hljs-attr">step</span>: <span class="hljs-number">1</span>, <span class="hljs-comment">//数值越大速度滚动越快</span>
          limitMoveNum: <span class="hljs-number">5</span>, <span class="hljs-comment">//开始无缝滚动的数据量  //this.dataList.length</span>
          hoverStop: <span class="hljs-literal">true</span>, <span class="hljs-comment">//是否开启鼠标悬停stop</span>
          direction: <span class="hljs-number">1</span>, <span class="hljs-comment">// 0向下 1向上 2向左 3向右</span>
          openWatch: <span class="hljs-literal">true</span>, <span class="hljs-comment">//开启数据实时监控刷新dom</span>
          singleHeight: <span class="hljs-number">0</span>, <span class="hljs-comment">//单步运动停止的高度(默认值0是无缝不停止的滚动) direction =&gt; 0/1</span>
          singleWidth: <span class="hljs-number">0</span>, <span class="hljs-comment">//单步运动停止的宽度(默认值0是无缝不停止的滚动) direction =&gt; 2/3</span>
          waitTime: <span class="hljs-number">1000</span> <span class="hljs-comment">//单步运动停止的时间(默认值1000ms)</span>
        }
      }</code></pre>
<h2 id="articleHeader7">历史版本</h2>
<p>See the GitHub <a href="https://github.com/chenxuan0000/vue-seamless-scroll/releases" rel="nofollow noreferrer" target="_blank">历史版本</a>.</p>
<h2 id="articleHeader8">注意</h2>
<p>如果你想要js无缝滚动(无依赖)你可以切换到这里<a href="https://github.com/chenxuan0000/seamless-scroll" rel="nofollow noreferrer" target="_blank">seamscroll</a>。</p>
<h2 id="articleHeader9">License</h2>
<p>vue-simple-spinner is open source and released under the <a>MIT License</a>.</p>
<h2 id="articleHeader10">TKS</h2>
<p><a href="https://github.com/chenxuan0000/vue-seamless-scroll" rel="nofollow noreferrer" target="_blank">vue-seamless-scroll</a>发现bug或者有什么不足望指点,感觉不错点个star吧。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue无缝滚动

## 原文链接
[https://segmentfault.com/a/1190000012943489](https://segmentfault.com/a/1190000012943489)

