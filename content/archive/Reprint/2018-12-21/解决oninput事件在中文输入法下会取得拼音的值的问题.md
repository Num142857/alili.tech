---
title: '解决oninput事件在中文输入法下会取得拼音的值的问题' 
date: 2018-12-21 2:30:11
hidden: true
slug: kw9q6fax098
categories: [reprint]
---

{{< raw >}}

                    
<p>在做搜索等功能时，很多时候我们需要实时获取用户输入的值，而常常会得到类似 <code>w'm</code> 这样的拼音。为了解决这个问题，我在网上搜索了下相关问题，发现了两个陌生的事件：<code>compositionstart</code> 和 <code>compositionend</code>。</p>
<h2 id="articleHeader0">compositionstart &amp; compositionend</h2>
<p>在 <code>MDN</code> 上找到了关于他们的描述，<a href="https://developer.mozilla.org/en-US/docs/Web/Events/compositionstart" rel="nofollow noreferrer" target="_blank">compositionstart</a> 和 <a href="https://developer.mozilla.org/en-US/docs/Web/Events/compositionend" rel="nofollow noreferrer" target="_blank">compositionend</a>。简单点描述如下：</p>
<ul>
<li>compositionstart：在输入中文或者语音等需要等待一连串的输入的操作之前，<code>compositionstart</code> 事件会触发。</li>
<li>compositionend：在输入中文或者语音等完毕或取消时，<code>compositionend</code> 事件会触发。</li>
</ul>
<h2 id="articleHeader1">input 和 compositionend 的触发顺序导致的问题</h2>
<p><em>注：以下为 <code>chrome</code> 浏览器下的测试结果，关于其他浏览器请看兼容说明！</em></p>
<p>和大多数人的想法一样，我考虑使用一个布尔值来判断是否在等待输入法的输入，然后在 <code>input</code> 事件中根据其布尔值决定是否获取输入的值，初始代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var isInputZh = false;
  
elem.addEventListener('compositionstart', function (e) {
  isInputZh = true;
}, false);
elem.addEventListener('compositionend', function (e) {
  isInputZh = false;
}, false);
elem.addEventListener('input', function (e) {
  if (isInputZh) return;
  var value = this.value;
  console.log(value);
  doSomething(value);
}, false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> isInputZh = <span class="hljs-literal">false</span>;
  
elem.addEventListener(<span class="hljs-string">'compositionstart'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
  isInputZh = <span class="hljs-literal">true</span>;
}, <span class="hljs-literal">false</span>);
elem.addEventListener(<span class="hljs-string">'compositionend'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
  isInputZh = <span class="hljs-literal">false</span>;
}, <span class="hljs-literal">false</span>);
elem.addEventListener(<span class="hljs-string">'input'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
  <span class="hljs-keyword">if</span> (isInputZh) <span class="hljs-keyword">return</span>;
  <span class="hljs-keyword">var</span> value = <span class="hljs-keyword">this</span>.value;
  <span class="hljs-built_in">console</span>.log(value);
  doSomething(value);
}, <span class="hljs-literal">false</span>);</code></pre>
<p>嗯。。看起来好像没啥问题，运行后，却有些让人摸不着头脑。在一段中文输入完毕后却并没有在控制台输出任何数据。嗯。。测试后发现 <code>compositionend</code> 事件是在 <code>input</code> 事件之后触发的。</p>
<h2 id="articleHeader2">解决方法</h2>
<p>最后只能用常规方法去解决：在 <code>compositionend</code> 和 <code>input</code> 事件中都得加入对输入值的处理。代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var isInputZh = false;
var search = document.querySelector('input');

search.addEventListener('compositionstart', function (e) {
  isInputZh = true;
}, false);
search.addEventListener('compositionend', function (e) {
  isInputZh = false;

  doSomething(search.value);
}, false);
search.addEventListener('input', function (e) {
  if (isInputZh) return;
  var value = this.value;

  doSomething(value);
}, false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> isInputZh = <span class="hljs-literal">false</span>;
<span class="hljs-keyword">var</span> search = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'input'</span>);

search.addEventListener(<span class="hljs-string">'compositionstart'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
  isInputZh = <span class="hljs-literal">true</span>;
}, <span class="hljs-literal">false</span>);
search.addEventListener(<span class="hljs-string">'compositionend'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
  isInputZh = <span class="hljs-literal">false</span>;

  doSomething(search.value);
}, <span class="hljs-literal">false</span>);
search.addEventListener(<span class="hljs-string">'input'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
  <span class="hljs-keyword">if</span> (isInputZh) <span class="hljs-keyword">return</span>;
  <span class="hljs-keyword">var</span> value = <span class="hljs-keyword">this</span>.value;

  doSomething(value);
}, <span class="hljs-literal">false</span>);</code></pre>
<h2 id="articleHeader3">关于兼容说明</h2>
<p>以上测试是在 <code>chrome</code> 浏览器下进行的，在 <code>Firefox</code> 和 <code>Edge</code> 浏览器下发现 <code>input</code> 事件在 <code>compositionend</code> 事件之后触发，且在输入数字时发现 <code>Firefox</code> 和 <code>Edge</code> 也会触发 <code>compositionend</code> 事件，以上内容仅在 <code>chrome</code> 浏览器中适用。</p>
<h2 id="articleHeader4">写在最后</h2>
<p>原文发在 <a href="https://github.com/hanrenguang/notes/issues/10" rel="nofollow noreferrer" target="_blank">github</a>。如果大家有什么好的解决方案欢迎在评论中提出。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
解决oninput事件在中文输入法下会取得拼音的值的问题

## 原文链接
[https://segmentfault.com/a/1190000012490380](https://segmentfault.com/a/1190000012490380)

