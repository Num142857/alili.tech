---
title: '基于vue的无缝滚动组件' 
date: 2018-12-21 2:30:11
hidden: true
slug: nezdjcn9oj
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0"><a href="https://github.com/chenxuan0000/vue-seamless-scroll" rel="nofollow noreferrer" target="_blank">vue-seamless-scroll</a></h1>
<p><em>A simple, Seamless scrolling for Vue.js</em></p>
<blockquote>在awesome上一直没有发现vue的无缝滚动组件，在工作之余写了个组件，分享出来希望大家一起学习进步。</blockquote>
<p><span class="img-wrap"><img data-src="/img/bV0rl1?w=550&amp;h=343" src="https://static.alili.tech/img/bV0rl1?w=550&amp;h=343" alt="7916749801802782271.jpg" title="7916749801802782271.jpg" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">Demo</h2>
<p><a href="https://chenxuan0000.github.io/vue-seamless-scroll/" rel="nofollow noreferrer" target="_blank">https://github.com/chenxuan0000/vue-seamless-scroll/index.html</a></p>
<h2 id="articleHeader2">Installation</h2>
<h3 id="articleHeader3">NPM</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vue-seamless-scroll --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install vue-seamless-scroll --save</code></pre>
<h2 id="articleHeader4">Usage</h2>
<h3 id="articleHeader5">ES6</h3>
<p><em>以下es6用法需要webpack环境编译.</em></p>
<blockquote>具体参考<a href="https://github.com/chenxuan0000/vue-seamless-scroll/blob/master/examples-src/App.vue" rel="nofollow noreferrer" target="_blank">example-src/App.vue</a>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import vueSeamlessScroll from 'vue-seamless-scroll'

new Vue({
  components: {
    vueSeamlessScroll
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> vueSeamlessScroll <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-seamless-scroll'</span>

<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">components</span>: {
    vueSeamlessScroll
  }
})</code></pre>
<h3 id="articleHeader6">普通模式 (script tag)</h3>
<p>Example:</p>
<blockquote>具体参考<a href="https://github.com/chenxuan0000/vue-seamless-scroll/blob/master/test/test.html" rel="nofollow noreferrer" target="_blank">test/test.html</a>
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
<h2 id="articleHeader7">Configure</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      defaultOption () {
        return {
          step: 1, //步长 越大滚动速度越快
          limitMoveNum: 5, //启动无缝滚动最小数据量 this.dataList.length
          hoverStop: true, //是否启用鼠标hover控制
          direction: 1, //1 往上 0 往下
          openWatch: true, //开启data实时监听
          singleHeight: 0, //单条数据高度有值hoverStop关闭
          waitTime: 1000 //单步停止等待时间
        }
      }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">      defaultOption () {
        <span class="hljs-keyword">return</span> {
          <span class="hljs-attr">step</span>: <span class="hljs-number">1</span>, <span class="hljs-comment">//步长 越大滚动速度越快</span>
          limitMoveNum: <span class="hljs-number">5</span>, <span class="hljs-comment">//启动无缝滚动最小数据量 this.dataList.length</span>
          hoverStop: <span class="hljs-literal">true</span>, <span class="hljs-comment">//是否启用鼠标hover控制</span>
          direction: <span class="hljs-number">1</span>, <span class="hljs-comment">//1 往上 0 往下</span>
          openWatch: <span class="hljs-literal">true</span>, <span class="hljs-comment">//开启data实时监听</span>
          singleHeight: <span class="hljs-number">0</span>, <span class="hljs-comment">//单条数据高度有值hoverStop关闭</span>
          waitTime: <span class="hljs-number">1000</span> <span class="hljs-comment">//单步停止等待时间</span>
        }
      }</code></pre>
<h2 id="articleHeader8">TKS</h2>
<p><a href="https://github.com/chenxuan0000/vue-seamless-scroll" rel="nofollow noreferrer" target="_blank">vue-seamless-scroll</a>发现bug或者有什么不足望指点,感觉不错点个star吧。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于vue的无缝滚动组件

## 原文链接
[https://segmentfault.com/a/1190000012459158](https://segmentfault.com/a/1190000012459158)

