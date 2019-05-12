---
title: 'try-catch-finally，被你忽略掉的执行顺序' 
date: 2018-11-29 9:27:38
hidden: true
slug: nyrhp29rgng
categories: [reprint]
---

{{< raw >}}

                    
<p>try-catch&#x662F;&#x6355;&#x6349;&#x5F02;&#x5E38;&#x7684;&#x795E;&#x5668;&#xFF0C;&#x4E0D;&#x7BA1;&#x662F;&#x8C03;&#x8BD5;&#x8FD8;&#x662F;&#x9632;&#x6B62;&#x8F6F;&#x4EF6;&#x5D29;&#x6E83;&#xFF0C;&#x90FD;&#x79BB;&#x4E0D;&#x5F00;&#x5B83;&#x3002;&#x4ECA;&#x5929;&#x7B14;&#x8005;&#x4ECB;&#x7ECD;&#x4E00;&#x4E0B;&#x52A0;&#x4E0A;finally&#x540E;&#x7684;&#x6267;&#x884C;&#x987A;&#x5E8F;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function test() {
  try {
    console.log(1);
  } finally {
    console.log(2);
  }
}

console.log(test()); // 1 2" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">try</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);
  } <span class="hljs-keyword">finally</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>);
  }
}

<span class="hljs-built_in">console</span>.log(test()); <span class="hljs-comment">// 1 2</span></code></pre>
<p>&#x55EF;&#xFF01;&#x6309;&#x987A;&#x5E8F;&#x6267;&#x884C;&#x4E86;&#x3002;</p>
<hr>
<p>&#x6211;&#x4EEC;&#x5728;try&#x4E2D;&#x52A0;&#x5165;return&#x8BED;&#x53E5;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function test() {
  try {
    console.log(1);
    return &apos;from_try&apos;;
  } catch (e) {
    // TODO
  } finally {
    console.log(2);
  }
}

console.log(test()); // 1 2 from_try" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">try</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;from_try&apos;</span>;
  } <span class="hljs-keyword">catch</span> (e) {
    <span class="hljs-comment">// TODO</span>
  } <span class="hljs-keyword">finally</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>);
  }
}

<span class="hljs-built_in">console</span>.log(test()); <span class="hljs-comment">// 1 2 from_try</span></code></pre>
<p>&#x7B49;&#x7B49;&#xFF0C;&#x96BE;&#x9053;&#x4E0D;&#x5E94;&#x8BE5;&#x662F; <code>1 &gt; from_try &gt; 2</code>&#x7684;&#x987A;&#x5E8F;&#x5417;&#xFF1F;<br>&#x62B1;&#x6B49;&#x554A;&#xFF0C;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF0C;&#x5728;try&#x548C;catch&#x7684;&#x4EE3;&#x7801;&#x5757;&#x4E2D;&#xFF0C;&#x5982;&#x679C;&#x78B0;&#x5230;<strong>return</strong>&#x8BED;&#x53E5;&#xFF0C;&#x90A3;&#x4E48;&#x5728;return&#x4E4B;&#x524D;&#xFF0C;&#x4F1A;&#x5148;&#x6267;&#x884C;<code>finally</code>&#x4E2D;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x6240;&#x4EE5;2&#x4F1A;&#x6BD4;from_try&#x4F18;&#x5148;&#x8F93;&#x51FA;&#x3002;</p>
<hr>
<p>&#x6211;&#x4EEC;&#x5728;finally&#x4E2D;&#x4E5F;&#x52A0;&#x5165;return&#x8BED;&#x53E5;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function test() {
  try {
    console.log(1);
    return &apos;from_try&apos;;
  } catch (e) {
    // TODO
  } finally {
    console.log(2);
    return &apos;from_finally&apos;;
  }
}

console.log(test()); // 1 2 from_finally" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">try</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;from_try&apos;</span>;
  } <span class="hljs-keyword">catch</span> (e) {
    <span class="hljs-comment">// TODO</span>
  } <span class="hljs-keyword">finally</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;from_finally&apos;</span>;
  }
}

<span class="hljs-built_in">console</span>.log(test()); <span class="hljs-comment">// 1 2 from_finally</span></code></pre>
<p>&#x4E70;&#x5676;&#x7684;&#xFF0C;&#x6211;&#x7684;<strong>from_try</strong>&#x600E;&#x4E48;&#x4E0D;&#x89C1;&#x4E86;&#xFF1F;<br>&#x62B1;&#x6B49;&#xFF0C;&#x6309;&#x7167;&#x4E0A;&#x4E00;&#x6761;&#x7684;&#x89C4;&#x5219;&#xFF0C;finally&#x662F;&#x4F1A;&#x4F18;&#x5148;&#x6267;&#x884C;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x5982;&#x679C;finally&#x91CC;&#x6709;return&#x8BED;&#x53E5;&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x771F;&#x7684;return&#x4E86;&#x3002;</p>
<hr>
<p>&#x73B0;&#x5728;&#x7B14;&#x8005;&#x5728;try&#x8BED;&#x53E5;&#x5757;&#x4E2D;&#x6545;&#x610F;&#x62A5;&#x9519;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function test() {
  try {
    console.log(1);
    throw new Error(&apos;throw&apos;);
  } catch (e) {
    console.log(e.message);
    return &apos;from_catch&apos;;
  } finally {
    console.log(2);
  }
}

console.log(test()); // 1 throw 2 from_catch" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">test</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">try</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">1</span>);
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">&apos;throw&apos;</span>);
  } <span class="hljs-keyword">catch</span> (e) {
    <span class="hljs-built_in">console</span>.log(e.message);
    <span class="hljs-keyword">return</span> <span class="hljs-string">&apos;from_catch&apos;</span>;
  } <span class="hljs-keyword">finally</span> {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>);
  }
}

<span class="hljs-built_in">console</span>.log(test()); <span class="hljs-comment">// 1 throw 2 from_catch</span></code></pre>
<p>&#x770B;&#x6765;&#xFF0C;try&#x548C;catch&#x7684;return&#x90FD;&#x9700;&#x8981;&#x5148;&#x7ECF;&#x8FC7;finally&#x3002;</p>
<h2 id="articleHeader0">&#x7ED3;&#x8BED;</h2>
<p>&#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x5F88;&#x5C0F;&#x7684;&#x7EC6;&#x8282;&#x3002;&#x4F46;&#x4E5F;&#x5E0C;&#x671B;&#x5404;&#x4F4D;&#x770B;&#x5B98;&#x597D;&#x597D;&#x5229;&#x7528;&#x8FD9;&#x79CD;&#x7279;&#x6027;&#x3002;</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
try-catch-finally，被你忽略掉的执行顺序

## 原文链接
[https://segmentfault.com/a/1190000015196493](https://segmentfault.com/a/1190000015196493)

