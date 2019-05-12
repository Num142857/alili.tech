---
title: 'JavaScript — Null vs. Undefined' 
date: 2018-12-17 2:30:07
hidden: true
slug: 7vnq7d9c3sa
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><a href="https://codeburst.io/javascript-null-vs-undefined-20f955215a2" rel="nofollow noreferrer" target="_blank">JavaScript — Null vs. Undefined</a></blockquote>
<p>初学者往往搞不清楚<code>null</code>和<code>undefined</code>的区别，本文深入剖析<code>null</code>和<code>undefined</code>的异同。</p>
<h2 id="articleHeader0">
<code>null</code>是啥？</h2>
<p>关于<code>null</code>有两点需要掌握：</p>
<ol>
<li>
<code>null</code>是一个<code>空</code>值</li>
<li>
<code>null</code>是被赋值来的</li>
</ol>
<p>下面是个 Demo, 我们给 a 变量赋值为 null:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = null;
console.log(a);
// null" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> a = <span class="hljs-literal">null</span>;
<span class="hljs-built_in">console</span>.log(a);
<span class="hljs-comment">// null</span></code></pre>
<h2 id="articleHeader1">
<code>undefined</code>是啥？</h2>
<p><code>undefined</code>通常表示一个变量单单被声明过，但是没有初始化。Demo:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let b;
console.log(b);
// undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> b;
<span class="hljs-built_in">console</span>.log(b);
<span class="hljs-comment">// undefined</span></code></pre>
<p>你也可以特意的给一个变量赋值为<code>undefined</code>，不过正常场景下不会这么使用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let c = undefined;
console.log(c);
// undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> c = <span class="hljs-literal">undefined</span>;
<span class="hljs-built_in">console</span>.log(c);
<span class="hljs-comment">// undefined</span></code></pre>
<p>还有一点，当访问对象不存在的属性时，我们会得到<code>undefined</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var d = {};
console.log(d.fake);
// undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> d = {};
<span class="hljs-built_in">console</span>.log(d.fake);
<span class="hljs-comment">// undefined</span></code></pre>
<h2 id="articleHeader2">
<code>null</code> &amp; <code>undefined</code>的相同点</h2>
<p>在 JS 语言中，有6个<code>falsy</code>的值，其中<code>null</code>和<code>undefined</code>是六个<code>falsy</code>值中的两个。</p>
<p>falsy 值：</p>
<ol>
<li>false</li>
<li>0 (zero)</li>
<li>“” (empty string)</li>
<li>null</li>
<li>undefined</li>
<li>NaN (Not A Number)</li>
</ol>
<p>其余所有的值则皆为<code>truthy</code>。</p>
<p>另外， JS 语言中有六个原始数据类型，<code>null</code>和<code>undefined</code>是其中两个原始类型的值。原始数据类型：</p>
<ol>
<li>Boolean</li>
<li>Null</li>
<li>Undefined</li>
<li>Number</li>
<li>String</li>
<li>Symbol</li>
</ol>
<p>不在上述六种之内的就都是引用类型。但是有趣的是，当你使用<code>typeof</code>来校验 <code>null</code>时，返回的却是<code>object</code>，可以简单理解为这是js 在最初引入的一个 bug。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let a = null;
let b;
console.log(typeof a);
// object
console.log(typeof b);
// undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> a = <span class="hljs-literal">null</span>;
<span class="hljs-keyword">let</span> b;
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> a);
<span class="hljs-comment">// object</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> b);
<span class="hljs-comment">// undefined</span></code></pre>
<h2 id="articleHeader3">null !== undefined</h2>
<p>通过上面的介绍，你可能已经隐隐约约的感觉到了<code>null</code>和<code>undefined</code>是不同的，但非常相似。所以，<code>null !== undefined</code>,<code>null == undefined</code>。</p>
<h2 id="articleHeader4">?<code>null</code>和<code>undefined</code>存在差异的实际应用场景?</h2>
<p>废话那么多，真正能用的地方，<code>译者</code>就越到一个，es6的默认参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let logHi = (str = 'hi') => {
  console.log(str);
}
/*默认值生效*/
logHi();
// hi

/*正常调用*/
logHi('bye');
// bye

/*默认值生效*/
logHi(undefined);
// hi

/*null 被当成有效的值*/
logHi(null);
// null" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> logHi = <span class="hljs-function">(<span class="hljs-params">str = <span class="hljs-string">'hi'</span></span>) =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(str);
}
<span class="hljs-comment">/*默认值生效*/</span>
logHi();
<span class="hljs-comment">// hi</span>

<span class="hljs-comment">/*正常调用*/</span>
logHi(<span class="hljs-string">'bye'</span>);
<span class="hljs-comment">// bye</span>

<span class="hljs-comment">/*默认值生效*/</span>
logHi(<span class="hljs-literal">undefined</span>);
<span class="hljs-comment">// hi</span>

<span class="hljs-comment">/*null 被当成有效的值*/</span>
logHi(<span class="hljs-literal">null</span>);
<span class="hljs-comment">// null</span></code></pre>
<p>就上述代码，大家在和我一同回忆下 es5的默认参数的写法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let logHi = (str) => {
  str = str || 'hi';
  console.log(str);
}

logHi('bye');
// bye

logHi()
// hi
logHi(undefined);
// hi
logHi(null);
// hi" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> logHi = <span class="hljs-function">(<span class="hljs-params">str</span>) =&gt;</span> {
  str = str || <span class="hljs-string">'hi'</span>;
  <span class="hljs-built_in">console</span>.log(str);
}

logHi(<span class="hljs-string">'bye'</span>);
<span class="hljs-comment">// bye</span>

logHi()
<span class="hljs-comment">// hi</span>
logHi(<span class="hljs-literal">undefined</span>);
<span class="hljs-comment">// hi</span>
logHi(<span class="hljs-literal">null</span>);
<span class="hljs-comment">// hi</span></code></pre>
<h2 id="articleHeader5">Summary</h2>
<ul>
<li>
<code>null</code>是被赋值出来的，它用来表示空</li>
<li>
<code>undefined</code>通常表示一个变量被声明了，但是没有被初始化</li>
<li>
<code>null</code>和<code>undefined</code>都是<code>falsy</code>值</li>
<li>
<code>null</code>和<code>undefined</code>都是原始数据类型，但JS 语言的bug导致<code>typeof null = object</code>
</li>
<li>
<code>null !== undefined</code> <code>null == undefined</code>
</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript — Null vs. Undefined

## 原文链接
[https://segmentfault.com/a/1190000012888784](https://segmentfault.com/a/1190000012888784)

