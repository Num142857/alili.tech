---
title: '我期待 Vue 改进的一些地方' 
date: 2019-01-15 2:30:12
hidden: true
slug: 9n4zjdvug7
categories: [reprint]
---

{{< raw >}}

                    
<p>贴点我的 ClojureScript 代码, 免得被人当成菜鸟... <a href="https://github.com/Respo/respo" rel="nofollow noreferrer" target="_blank">https://github.com/Respo/respo</a></p>
<p>期待 Vue 改进的一些开发当中的细节:</p>
<h4>查看 this.data.x 数据</h4>
<p>开发过程当中经常需要查看当前的组件状态当中数据的结构,<br>我平时的习惯就是两个, 一个 log, 另一个直接在界面显示,</p>
<p>console.log 打印 Vue 里的数据, 出现奇怪的对象,<br>我听说了 Vue 通过 Proxy 劫持了, 这个就很反直觉了:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object {__ob__: Observer}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">Object</span> {<span class="hljs-attribute">__ob__</span>: Observer}</code></pre>
<p>点一下, 想展开看看吧, 出现了好多奇怪的东西:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object {__ob__: Observer}
  a: ...
  __ob__ : Observer
  get a : function reactiveGetter()
  set a : function reactiveSetter(newVal)
  __proto__ : Object" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>Object {__ob__: Observer}
  a: ...
  __ob__ : <span class="hljs-type">Observer</span>
  get a : <span class="hljs-keyword"><span class="hljs-keyword">function</span></span> <span class="hljs-type">reactiveGetter</span>()
  set a : <span class="hljs-keyword"><span class="hljs-keyword">function</span></span> <span class="hljs-type">reactiveSetter</span>(newVal)
  __proto__ : <span class="hljs-type">Object</span></code></pre>
<p>嗯.... 然后我只好写 <code>JSON.stringify(this.nested)</code> 去了..</p>
<p>另一个调试的方法是直接用 <code>"{{"nested"}}"</code> 把数据显示出来.<br>这个好像没啥问题.</p>
<h4>报错定位</h4>
<p>开发习惯嘛, 经常会把 Pause on Break 开起来..<br>但是界面没反应, 不知道是不是出错了, 因为没有出现断点吗,<br>结果打开终端一看, 红的... 就想定位到源码,<br>结果打开一看:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;use strict&quot;;
eval(&quot;Object.defineProperty(__webpack_exports__, \&quot;__esModule\&quot;, { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Hello__ = __webpack_require__(25);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Hello___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_Hello__);\n\n\n\n\n/* harmony default export */ __webpack_exports__[\&quot;default\&quot;] = ({\n  name: 'app',\n  data: function data() {\n    return {\n      nested: {\n        a: {\n          b: 2\n        }\n      }\n    };\n  },\n  created: function created() {\n    console.log(this.nested);\n    this.x();\n  },\n\n  components: {\n    Hell...." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-meta">"use strict"</span>;
<span class="hljs-built_in">eval</span>(<span class="hljs-string">"Object.defineProperty(__webpack_exports__, \"__esModule\", { value: true });\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Hello__ = __webpack_require__(25);\n/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Hello___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_Hello__);\n\n\n\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n  name: 'app',\n  data: function data() {\n    return {\n      nested: {\n        a: {\n          b: 2\n        }\n      }\n    };\n  },\n  created: function created() {\n    console.log(this.nested);\n    this.x();\n  },\n\n  components: {\n    Hell....</span></code></pre>
<p>好吧 Vue 我不熟悉, 不知道为什么用的 eval, 难道我要一直开 pause on uncaught break?<br>...评论提到我是 Webpack 配置不对, 但是看上去像是 vue-loader 我不会配导致的 - -</p>
<h4>功能抽象</h4>
<p>模板引擎对简单的场景还算舒服, <code>v-if</code> <code>v-for</code> 还可以,<br>然而稍微复杂一点的地方, 我第一反应还是编程语言习惯的用法,<br>当然这个是其他语言里带来的用法:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="switch router
  when 'a' then renderA()
  when 'b' then renderB()
  else renderC()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code class="coffee"><span class="hljs-keyword">switch</span> router
  <span class="hljs-keyword">when</span> <span class="hljs-string">'a'</span> <span class="hljs-keyword">then</span> renderA()
  <span class="hljs-keyword">when</span> <span class="hljs-string">'b'</span> <span class="hljs-keyword">then</span> renderB()
  <span class="hljs-keyword">else</span> renderC()</code></pre>
<p>等一下是不是文档里定义了什么语法我没看到.... 我找一下...</p>
<p>或者随时增加临时变量吧:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render: ->
  t1 = a.b.c
  if t1?
    div {}, t1
  else
    span {}, 'placeholder'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code class="cljs"><span class="hljs-symbol">render:</span> -&gt;
  <span class="hljs-built_in">t1</span> = a.<span class="hljs-keyword">b.c
</span>  if <span class="hljs-built_in">t1</span>?
    <span class="hljs-keyword">div </span>{}, <span class="hljs-built_in">t1</span>
  else
    span {}, <span class="hljs-string">'placeholder'</span></code></pre>
<p>但是模板引擎里要写在 <code>data</code> <code>computed</code> <code>methods</code> 里才能处理..<br>这个主要是不习惯, 不是功能缺失.</p>
<h4>组件化习惯</h4>
<p>有个地方从 React 转过来很不适应, 不知道是不是 Vue 主流的习惯,<br>看上去用法是很简单的,</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <el-dialog v-model=&quot;visible&quot; title=&quot;Hello world&quot;>
      <p>欢迎使用 Element</p>
    </el-dialog>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">    <span class="hljs-tag">&lt;<span class="hljs-name">el-dialog</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"visible"</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"Hello world"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>欢迎使用 Element<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">el-dialog</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="      data: function() {
        return { visible: false }
      }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">      data: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> { <span class="hljs-attr">visible</span>: <span class="hljs-literal">false</span> }
      }</code></pre>
<p>麻烦的地方在于随着 dialog 内容增多, 整个页面的组件化就不够清晰了,<br>React 里会习惯用组件把独立的部分尽快分离出去, 然后单独管理,<br>我在别人的代码当中遇到写了很多个复杂的 dialog, 一个文件里, 看晕了.</p>
<hr>
<p>追加, Prettier 刚开心用了几天发现 Vue 用不了...</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
我期待 Vue 改进的一些地方

## 原文链接
[https://segmentfault.com/a/1190000009304756](https://segmentfault.com/a/1190000009304756)

