---
title: 'Vue模板语法' 
date: 2019-02-14 2:30:37
hidden: true
slug: m8jxf6uxtnf
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">模板语法</h3>
<p>Vue使用基于HTML的模板语法，允许开发者声明式的将DOM绑定至底层Vue实例的数据。</p>
<p>在底层的实现上，Vue将模板编译成虚拟DOM渲染函数。结合响应系统，Vue能够智能的计算出最少需要重新渲染多少组件，并把DOM操作次数减少到最少。</p>
<h3 id="articleHeader1">插值</h3>
<p>(1)文本插值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span>Message: "{{" message "}}"</span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code style="word-break: break-word; white-space: initial;"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Message: </span><span class="hljs-template-variable">"{{" message "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span></code></pre>
<p>使用<strong>v-once</strong>指令，可以执行一次性插值。当数据改变时，插值处的内容不会更新。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<span v-once>这个将不会改变："{{" message "}}"</span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code style="word-break: break-word; white-space: initial;"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-once</span>&gt;</span>这个将不会改变：</span><span class="hljs-template-variable">"{{" message "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span></code></pre>
<p>(2)原始HTML<br>双大括号会将数据解释为普通文本，而非HTML代码，为输出正确的HTML，需要使用<strong>v-html</strong>指令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<p v-html=&quot;rawHtml&quot;></p>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-html</span>=<span class="hljs-string">"rawHtml"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></code></pre>
<p>这个p元素的内容会被替换成rawHtml属性值。直接作为HTML会忽略解析属性中的数据绑定。</p>
<p>(3)特性<br>Mustache语法不能作用在HTML特性上，遇到这种情况应该使用<strong>v-bind</strong>指令。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div v-bind:id=&quot;dynamicId&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-keyword">div</span> v-bind:<span class="hljs-built_in">id</span>=<span class="hljs-string">"dynamicId"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p>在布尔特性的情况下，它们的存在即暗示为true，v-bind工作起来略有不同，在这个例子中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<button v-bind:disabled=&quot;isBtn&quot;></button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">v-bind:disabled</span>=<span class="hljs-string">"isBtn"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></code></pre>
<p>如果isBtn的值为null，undefined或者false，则disabled属性甚至不会包含在渲染出来的&lt;button&gt;元素。</p>
<p>(4)使用JavaScript表达式<br>实际上，对于所有的数据绑定，Vue.js 都提供了完全的 JavaScript 表达式支持。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=""{{" number + 1 "}}"
"{{" ok ? 'yes' : 'no' "}}"
"{{" message.splite('').reverse().join('') "}}"
<div v-bind:id=&quot;'list-' + id&quot;></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>"{{" number + <span class="hljs-number">1</span> "}}"
"{{" ok ? <span class="hljs-string">'yes'</span> : <span class="hljs-string">'no'</span> "}}"
"{{" message.splite(<span class="hljs-string">''</span>).reverse().join(<span class="hljs-string">''</span>) "}}"
&lt;div v-bind:id=<span class="hljs-string">"'list-' + id"</span>&gt;&lt;/div&gt;</code></pre>
<h3 id="articleHeader2">指令</h3>
<p>指令特性的值预期是单个 JavaScript 表达式。指令的职责是当表达式的值发生改变时，将其产生的连带影响，响应式的作用于DOM.<br>(1)参数<br>一些指令能够接受一个"参数"，在指令名称之后以冒号表示。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a v-bind:href=&quot;url&quot;>...</url>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">v-bind:href</span>=<span class="hljs-string">"url"</span>&gt;</span>...<span class="hljs-tag">&lt;/<span class="hljs-name">url</span>&gt;</span></code></pre>
<h3 id="articleHeader3">修饰符</h3>
<p>修饰符是以半角句号<strong>.</strong>指明的特殊后缀，用于指出一个指令应该以特殊的形式绑定。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<form v-on:submit.prevent=&quot;onSubmit&quot;></form>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-keyword">form</span> v-<span class="hljs-keyword">on</span>:submit.prevent=<span class="hljs-string">"onSubmit"</span>&gt;&lt;/<span class="hljs-keyword">form</span>&gt;</code></pre>
<p>上述修饰符告诉v-on指令对于触发事件调用event.preventDefault()</p>
<h3 id="articleHeader4">缩写</h3>
<p>v-bind ---&gt; :<br>v-on ---&gt; @</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue模板语法

## 原文链接
[https://segmentfault.com/a/1190000016839229](https://segmentfault.com/a/1190000016839229)

