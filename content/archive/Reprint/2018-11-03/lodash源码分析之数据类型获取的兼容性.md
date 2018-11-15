---
title: lodash源码分析之数据类型获取的兼容性
reprint: true
categories: reprint
abbrlink: d52dfdab
date: 2018-11-03 02:30:13
---

{{% raw %}}
<blockquote>&#x7126;&#x8651;&#x548C;&#x6050;&#x60E7;&#x7684;&#x533A;&#x522B;&#x662F;&#xFF0C;&#x6050;&#x60E7;&#x662F;&#x5BF9;&#x4E16;&#x754C;&#x4E0A;&#x7684;&#x5B58;&#x5728;&#x7684;&#x6050;&#x60E7;&#xFF0C;&#x800C;&#x7126;&#x8651;&#x662F;&#x5728;&quot;&#x6211;&quot;&#x9762;&#x524D;&#x7684;&#x7126;&#x8651;&#x3002;<p>&#x2014;&#x2014;&#x8428;&#x7279;&#x300A;&#x5B58;&#x5728;&#x4E0E;&#x865A;&#x65E0;&#x300B;</p></blockquote><p>&#x672C;&#x6587;&#x4E3A;&#x8BFB; lodash &#x6E90;&#x7801;&#x7684;&#x7B2C;&#x5341;&#x4E5D;&#x7BC7;&#xFF0C;&#x540E;&#x7EED;&#x6587;&#x7AE0;&#x4F1A;&#x66F4;&#x65B0;&#x5230;&#x8FD9;&#x4E2A;&#x4ED3;&#x5E93;&#x4E2D;&#xFF0C;&#x6B22;&#x8FCE; star&#xFF1A;<a href="https://github.com/yeyuqiudeng/pocket-lodash" rel="nofollow noreferrer" target="_blank">pocket-lodash</a></p><p>gitbook&#x4E5F;&#x4F1A;&#x540C;&#x6B65;&#x4ED3;&#x5E93;&#x7684;&#x66F4;&#x65B0;&#xFF0C;gitbook&#x5730;&#x5740;&#xFF1A;<a href="https://www.gitbook.com/book/yeyuqiudeng/pocket-lodash/details" rel="nofollow noreferrer" target="_blank">pocket-lodash</a></p><h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>&#x5728;&#x524D;&#x6587;&#x300A;<a href="https://github.com/yeyuqiudeng/pocket-lodash/issues/19" rel="nofollow noreferrer" target="_blank">lodash&#x6E90;&#x7801;&#x5206;&#x6790;&#x4E4B;&#x83B7;&#x53D6;&#x6570;&#x636E;&#x7C7B;&#x578B;</a>&#x300B;&#x5DF2;&#x7ECF;&#x89E3;&#x91CA;&#x4E86;&#x83B7;&#x53D6;&#x6570;&#x636E;&#x7C7B;&#x578B;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x4F46;&#x662F;&#x5728;&#x6709;&#x4E9B;&#x73AF;&#x5883;&#x4E0B;&#xFF0C;&#x4E00;&#x4E9B; <code>es6</code> &#x65B0;&#x589E;&#x7684;&#x5BF9;&#x8C61;&#x83B7;&#x53D6;&#x5230;&#x7684;&#x7C7B;&#x578B;&#x90FD;&#x4E3A; <code>[object Object]</code> &#xFF0C;&#x8FD9;&#x6837;&#x5C31;&#x6CA1;&#x529E;&#x6CD5;&#x505A;&#x7EC6;&#x81F4;&#x7684;&#x533A;&#x5206;&#x3002;&#x4F8B;&#x5982;&#x5728; IE11 &#x4E2D;&#xFF0C;&#x901A;&#x8FC7; <code>Object.prototype.toString</code> &#x83B7;&#x53D6;&#x5230;&#x7684; <code>DataView</code> &#x5BF9;&#x8C61;&#x7C7B;&#x578B;&#x4E3A; <code>[object Object]</code>&#x3002; &#x56E0;&#x6B64;&#x5728; <code>getTag</code> &#x4E2D;&#xFF0C;lodash &#x9488;&#x5BF9;&#x8FD9;&#x4E9B;&#x5BF9;&#x8C61;&#x505A;&#x4E86;&#x4E00;&#x4E9B;&#x517C;&#x5BB9;&#x6027;&#x7684;&#x4E8B;&#x60C5;&#x3002;</p><h2 id="articleHeader1">&#x4F9D;&#x8D56;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import baseGetTag from &apos;./baseGetTag.js&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">import</span> baseGetTag <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./baseGetTag.js&apos;</span></code></pre><p>&#x300A;<a href="https://github.com/yeyuqiudeng/pocket-lodash/issues/19" rel="nofollow noreferrer" target="_blank">lodash&#x6E90;&#x7801;&#x5206;&#x6790;&#x4E4B;&#x83B7;&#x53D6;&#x6570;&#x636E;&#x7C7B;&#x578B;</a>&#x300B;</p><h2 id="articleHeader2">&#x6E90;&#x7801;&#x5206;&#x6790;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const dataViewTag = &apos;[object DataView]&apos;
const mapTag = &apos;[object Map]&apos;
const objectTag = &apos;[object Object]&apos;
const promiseTag = &apos;[object Promise]&apos;
const setTag = &apos;[object Set]&apos;
const weakMapTag = &apos;[object WeakMap]&apos;

/** Used to detect maps, sets, and weakmaps. */
const dataViewCtorString = `${DataView}`
const mapCtorString = `${Map}`
const promiseCtorString = `${Promise}`
const setCtorString = `${Set}`
const weakMapCtorString = `${WeakMap}`

let getTag = baseGetTag

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js &lt; 6.
if ((DataView &amp;&amp; getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (getTag(new Map) != mapTag) ||
    (getTag(Promise.resolve()) != promiseTag) ||
    (getTag(new Set) != setTag) ||
    (getTag(new WeakMap) != weakMapTag)) {
  getTag = (value) =&gt; {
    const result = baseGetTag(value)
    const Ctor = result == objectTag ? value.constructor : undefined
    const ctorString = Ctor ? `${Ctor}` : &apos;&apos;

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag
        case mapCtorString: return mapTag
        case promiseCtorString: return promiseTag
        case setCtorString: return setTag
        case weakMapCtorString: return weakMapTag
      }
    }
    return result
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> dataViewTag = <span class="hljs-string">&apos;[object DataView]&apos;</span>
<span class="hljs-keyword">const</span> mapTag = <span class="hljs-string">&apos;[object Map]&apos;</span>
<span class="hljs-keyword">const</span> objectTag = <span class="hljs-string">&apos;[object Object]&apos;</span>
<span class="hljs-keyword">const</span> promiseTag = <span class="hljs-string">&apos;[object Promise]&apos;</span>
<span class="hljs-keyword">const</span> setTag = <span class="hljs-string">&apos;[object Set]&apos;</span>
<span class="hljs-keyword">const</span> weakMapTag = <span class="hljs-string">&apos;[object WeakMap]&apos;</span>

<span class="hljs-comment">/** Used to detect maps, sets, and weakmaps. */</span>
<span class="hljs-keyword">const</span> dataViewCtorString = <span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-built_in">DataView</span>}</span>`</span>
<span class="hljs-keyword">const</span> mapCtorString = <span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-built_in">Map</span>}</span>`</span>
<span class="hljs-keyword">const</span> promiseCtorString = <span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-built_in">Promise</span>}</span>`</span>
<span class="hljs-keyword">const</span> setCtorString = <span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-built_in">Set</span>}</span>`</span>
<span class="hljs-keyword">const</span> weakMapCtorString = <span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-built_in">WeakMap</span>}</span>`</span>

<span class="hljs-keyword">let</span> getTag = baseGetTag

<span class="hljs-comment">// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js &lt; 6.</span>
<span class="hljs-keyword">if</span> ((<span class="hljs-built_in">DataView</span> &amp;&amp; getTag(<span class="hljs-keyword">new</span> <span class="hljs-built_in">DataView</span>(<span class="hljs-keyword">new</span> <span class="hljs-built_in">ArrayBuffer</span>(<span class="hljs-number">1</span>))) != dataViewTag) ||
    (getTag(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>) != mapTag) ||
    (getTag(<span class="hljs-built_in">Promise</span>.resolve()) != promiseTag) ||
    (getTag(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>) != setTag) ||
    (getTag(<span class="hljs-keyword">new</span> <span class="hljs-built_in">WeakMap</span>) != weakMapTag)) {
  getTag = <span class="hljs-function">(<span class="hljs-params">value</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> result = baseGetTag(value)
    <span class="hljs-keyword">const</span> Ctor = result == objectTag ? value.constructor : <span class="hljs-literal">undefined</span>
    <span class="hljs-keyword">const</span> ctorString = Ctor ? <span class="hljs-string">`<span class="hljs-subst">${Ctor}</span>`</span> : <span class="hljs-string">&apos;&apos;</span>

    <span class="hljs-keyword">if</span> (ctorString) {
      <span class="hljs-keyword">switch</span> (ctorString) {
        <span class="hljs-keyword">case</span> dataViewCtorString: <span class="hljs-keyword">return</span> dataViewTag
        <span class="hljs-keyword">case</span> mapCtorString: <span class="hljs-keyword">return</span> mapTag
        <span class="hljs-keyword">case</span> promiseCtorString: <span class="hljs-keyword">return</span> promiseTag
        <span class="hljs-keyword">case</span> setCtorString: <span class="hljs-keyword">return</span> setTag
        <span class="hljs-keyword">case</span> weakMapCtorString: <span class="hljs-keyword">return</span> weakMapTag
      }
    }
    <span class="hljs-keyword">return</span> result
  }
}</code></pre><p><code>getTag</code> &#x7684;&#x6E90;&#x7801;&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x5904;&#x7406;&#x7684;&#x662F; <code>DataView</code>&#x3001;<code>Map</code>&#x3001;<code>Set</code>&#x3001;<code>Promise</code>&#x3001;<code>WeakMap</code> &#x7B49;&#x5BF9;&#x8C61;&#xFF0C;&#x4E0B;&#x9762;&#x5C31;&#x5173;&#x952E;&#x7684;&#x51E0;&#x70B9;&#x8BF4;&#x660E;&#x4E00;&#x4E0B;&#x3002;</p><h3 id="articleHeader3">&#x51FD;&#x6570;&#x7684;toString&#x65B9;&#x6CD5;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const dataViewCtorString = `${DataView}`
const mapCtorString = `${Map}`
const promiseCtorString = `${Promise}`
const setCtorString = `${Set}`
const weakMapCtorString = `${WeakMap}`" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> dataViewCtorString = <span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-built_in">DataView</span>}</span>`</span>
<span class="hljs-keyword">const</span> mapCtorString = <span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-built_in">Map</span>}</span>`</span>
<span class="hljs-keyword">const</span> promiseCtorString = <span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-built_in">Promise</span>}</span>`</span>
<span class="hljs-keyword">const</span> setCtorString = <span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-built_in">Set</span>}</span>`</span>
<span class="hljs-keyword">const</span> weakMapCtorString = <span class="hljs-string">`<span class="hljs-subst">${<span class="hljs-built_in">WeakMap</span>}</span>`</span></code></pre><p>&#x6211;&#x4EEC;&#x90FD;&#x77E5;&#x9053;&#xFF0C;<code>DataView</code> &#x8FD9;&#x4E9B;&#x5176;&#x5B9E;&#x90FD;&#x662F;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x51FD;&#x6570;&#x6709; <code>toString</code> &#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x8C03;&#x7528;&#x540E;&#x8FD4;&#x56DE;&#x7684;&#x662F; <code>function DataView() { [native code] }</code> &#x8FD9;&#x6837;&#x7684;&#x683C;&#x5F0F;&#xFF0C;&#x56E0;&#x4E3A;&#x5176;&#x5B9E;&#x4F8B;&#x8C03;&#x7528; <code>Object.prototype.toString</code> &#x5728;&#x67D0;&#x4E9B;&#x73AF;&#x5883;&#x4E0B;&#x8FD4;&#x56DE;&#x7684;&#x662F; <code>[object Object]</code>&#xFF0C;&#x800C;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684; <code>toString</code> &#x8FD4;&#x56DE;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x4E2D;&#xFF0C;&#x5305;&#x542B;&#x4E86;&#x6784;&#x9020;&#x51FD;&#x6570;&#x540D;&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x8FD9;&#x70B9;&#x6765;&#x533A;&#x5206;&#x3002;</p><h3 id="articleHeader4">&#x5B9E;&#x4F8B;&#x4E2D;&#x6784;&#x9020;&#x51FD;&#x6570;&#x7684;&#x83B7;&#x53D6;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" const Ctor = result == objectTag ? value.constructor : undefined
 const ctorString = Ctor ? `${Ctor}` : &apos;&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"> <span class="hljs-keyword">const</span> Ctor = result == objectTag ? value.constructor : <span class="hljs-literal">undefined</span>
 <span class="hljs-keyword">const</span> ctorString = Ctor ? <span class="hljs-string">`<span class="hljs-subst">${Ctor}</span>`</span> : <span class="hljs-string">&apos;&apos;</span></code></pre><p>&#x6BCF;&#x4E2A;&#x5B9E;&#x4F8B;&#x4E2D;&#x90FD;&#x5305;&#x542B;&#x4E00;&#x4E2A; <code>constructor</code> &#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x6307;&#x5411;&#x7684;&#x662F;&#x5B9E;&#x4F8B;&#x7684;&#x6784;&#x9020;&#x51FD;&#x6570;&#xFF0C;&#x5728;&#x83B7;&#x53D6;&#x5230;&#x8FD9;&#x4E2A;&#x6784;&#x9020;&#x51FD;&#x6570;&#x540E;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x8C03;&#x7528;&#x5B83;&#x7684; <code>toString</code> &#x65B9;&#x6CD5;&#xFF0C;&#x7136;&#x540E;&#x5C31;&#x53EF;&#x4EE5;&#x6BD4;&#x8F83;&#x4E86;&#x3002;</p><h3 id="articleHeader5">Promise.resolve</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getTag(Promise.resolve()) != promiseTag" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial">getTag(<span class="hljs-built_in">Promise</span>.resolve()) != promiseTag</code></pre><p>&#x5728;&#x6761;&#x4EF6;&#x5224;&#x65AD;&#x65F6;&#xFF0C;&#x4F7F;&#x7528;&#x4E86; <code>Promise.resolve()</code> &#xFF0C;&#x8FD9;&#x6837;&#x4F7F;&#x7528;&#x7684;&#x76EE;&#x7684;&#x662F;&#x83B7;&#x53D6;&#x5230; <code>promise</code> &#x5BF9;&#x8C61;&#xFF0C;&#x56E0;&#x4E3A; <code>Promise</code> &#x662F;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x51FD;&#x6570;&#xFF0C;&#x5982;&#x679C;&#x76F4;&#x63A5;&#x8C03;&#x7528; <code>Object.prototype.toString</code>&#xFF0C;&#x8FD4;&#x56DE;&#x7684;&#x662F; <code>[object Function]</code>&#x3002;</p><h2 id="articleHeader6">License</h2><p><a href="http://creativecommons.org/licenses/by-nc-nd/4.0/" rel="nofollow noreferrer" target="_blank">&#x7F72;&#x540D;-&#x975E;&#x5546;&#x4E1A;&#x6027;&#x4F7F;&#x7528;-&#x7981;&#x6B62;&#x6F14;&#x7ECE; 4.0 &#x56FD;&#x9645; (CC BY-NC-ND 4.0)</a></p><p>&#x6700;&#x540E;&#xFF0C;&#x6240;&#x6709;&#x6587;&#x7AE0;&#x90FD;&#x4F1A;&#x540C;&#x6B65;&#x53D1;&#x9001;&#x5230;&#x5FAE;&#x4FE1;&#x516C;&#x4F17;&#x53F7;&#x4E0A;&#xFF0C;&#x6B22;&#x8FCE;&#x5173;&#x6CE8;,&#x6B22;&#x8FCE;&#x63D0;&#x610F;&#x89C1;&#xFF1A; <span class="img-wrap"><img data-src="/img/remote/1460000011338189" src="https://static.alili.tech/img/remote/1460000011338189" alt="" title="" style="cursor:pointer"></span></p><p>&#x4F5C;&#x8005;&#xFF1A;&#x5BF9;&#x89D2;&#x53E6;&#x4E00;&#x9762;</p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
lodash源码分析之数据类型获取的兼容性

## 原文链接
[https://segmentfault.com/a/1190000016501195](https://segmentfault.com/a/1190000016501195)

