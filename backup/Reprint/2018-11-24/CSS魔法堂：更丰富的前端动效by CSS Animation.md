---
title: 'CSS魔法堂：更丰富的前端动效by CSS Animation' 
date: 2018-11-24 2:30:09
hidden: true
slug: 4oinkm1v448
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>&#x2003;&#x5728;<a href="https://www.cnblogs.com/fsjohnhuang/p/9143035.html" rel="nofollow noreferrer" target="_blank">&#x300A;CSS&#x9B54;&#x6CD5;&#x5802;&#xFF1A;Transition&#x5C31;&#x8FD9;&#x4E48;&#x597D;&#x73A9;&#x300B;</a>&#x4E2D;&#x6211;&#x4EEC;&#x4E86;&#x89E3;&#x5230;&#x5BF9;&#x4E8E;&#x7B80;&#x5355;&#x7684;&#x8865;&#x95F4;&#x52A8;&#x753B;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;<code>transition</code>&#x5B9E;&#x73B0;&#x3002;&#x90A3;&#x5230;&#x5E95;&#x591A;&#x7B80;&#x5355;&#x7684;&#x52A8;&#x753B;&#x9002;&#x5408;&#x7528;<code>transtion</code>&#x6765;&#x5B9E;&#x73B0;&#x5462;&#xFF1F;&#x7B54;&#x6848;&#x5C31;&#x662F;&#x2014;&#x2014;&#x6211;&#x4EEC;&#x53EA;&#x9700;&#x5B9A;&#x4E49;&#x52A8;&#x753B;&#x8D77;&#x59CB;&#x548C;&#x7ED3;&#x675F;&#x5E27;&#x7684;&#x72B6;&#x6001;&#x7684;&#x52A8;&#x753B;&#x3002;&#x4E00;&#x65E6;&#x5173;&#x952E;&#x5E27;&#x6570;&#x5927;&#x4E8E;2&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x5FC5;&#x987B;&#x8F6C;&#x5411;CSS Animation&#x4E86;&#x3002;&#x672C;&#x6587;&#x4E3A;&#x8FD9;&#x6BB5;&#x65F6;&#x95F4;&#x5B66;&#x4E60;&#x7684;&#x8BB0;&#x5F55;&#xFF0C;&#x6B22;&#x8FCE;&#x62CD;&#x7816;&#x3002;</p><h2 id="articleHeader1">&#x7B80;&#x5355;&#x7C97;&#x66B4;&#x4ECB;&#x7ECD;CSS Animation &#x89C4;&#x5219;&#x548C;&#x5C5E;&#x6027;</h2><h3 id="articleHeader2">&#x5B9A;&#x4E49;&#x5173;&#x952E;&#x5E27;&#x52A8;&#x753B;</h3><p>&#x8BED;&#x6CD5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes &lt;Animation Name&gt; {
  [&lt;Animation Time Offset&gt; {
    /* CSS Properties */
  }]*
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dts"><code>@keyframes <span class="hljs-params">&lt;Animation Name&gt;</span> {
  [<span class="hljs-params">&lt;Animation Time Offset&gt;</span> {
    <span class="hljs-comment">/* CSS Properties */</span>
  }]*
}</code></pre><p>&#x793A;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code>@<span class="hljs-keyword">keyframes</span> rotate {
  <span class="hljs-selector-tag">from</span> { <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg); }
  <span class="hljs-selector-tag">to</span> { <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(360deg); }
}</code></pre><p><strong>&#x6CE8;&#x610F;&#x9879;&#xFF1A;</strong><br>1.<code>&lt;Animation Name&gt;</code>&#x7684;&#x547D;&#x540D;&#x89C4;&#x8303;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x547D;&#x540D;&#x9700;&#x8981;&#x9075;&#x5FAA;&#x4EE5;&#x4E0B;&#x89C4;&#x5219;
const rIsInvalid = /^--|^[0-9]+-|^(?:unset|initial|inherit|none)$/
    , rIsValid = /^[0-9a-z-_\\]+$/i
function isValidAnimationName(animationName: string): boolean{
  return !rIsInvalid.test(animationName) &amp;&amp; rIsValid(animationName)
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="TypeScript"><span class="hljs-comment">// &#x547D;&#x540D;&#x9700;&#x8981;&#x9075;&#x5FAA;&#x4EE5;&#x4E0B;&#x89C4;&#x5219;</span>
<span class="hljs-keyword">const</span> rIsInvalid = <span class="hljs-regexp">/^--|^[0-9]+-|^(?:unset|initial|inherit|none)$/</span>
    , rIsValid = <span class="hljs-regexp">/^[0-9a-z-_\\]+$/i</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isValidAnimationName</span>(<span class="hljs-params">animationName: <span class="hljs-built_in">string</span></span>): <span class="hljs-title">boolean</span></span>{
  <span class="hljs-keyword">return</span> !rIsInvalid.test(animationName) &amp;&amp; rIsValid(animationName)
}</code></pre><p>2.<code>&lt;Animation Time Offset&gt;</code>&#x53D6;&#x503C;<br><code>0-100%</code>&#x3001;<code>from</code>&#xFF0C;&#x7B49;&#x4EF7;&#x4E0E;<code>0%</code>&#x3001; <code>to</code>&#xFF0C;&#x7B49;&#x4EF7;&#x4E0E;<code>100%</code>&#x3002;<br>3.<code>&lt;Animation Name&gt;</code>&#x91CD;&#x590D;&#x600E;&#x4E48;&#x529E;<br>@keyframes CSS&#x89C4;&#x5219;&#x4E0D;&#x652F;&#x6301;&#x5C42;&#x53E0;&#x6837;&#x5F0F;&#xFF0C;&#x56E0;&#x6B64;&#x5F53;&#x51FA;&#x73B0;&#x591A;&#x4E2A;&#x540C;&#x540D;keyframes&#xFF0C;&#x90A3;&#x4E48;&#x4EC5;&#x6700;&#x540E;&#x51FA;&#x73B0;&#x7684;&#x90A3;&#x4E2A;&#x6709;&#x6548;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* &#x65E0;&#x6548; */
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
/* &#x751F;&#x6548; */
@keyframes rotate {
  from { transform: rotate(90deg); }
  to { transform: rotate(-360deg); }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-comment">/* &#x65E0;&#x6548; */</span>
@<span class="hljs-keyword">keyframes</span> rotate {
  <span class="hljs-selector-tag">from</span> { <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg); }
  <span class="hljs-selector-tag">to</span> { <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(360deg); }
}
<span class="hljs-comment">/* &#x751F;&#x6548; */</span>
@<span class="hljs-keyword">keyframes</span> rotate {
  <span class="hljs-selector-tag">from</span> { <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(90deg); }
  <span class="hljs-selector-tag">to</span> { <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-360deg); }
}</code></pre><p>4.<code>&lt;Animation Time Offset&gt;</code>&#x91CD;&#x590D;&#x600E;&#x4E48;&#x529E;<br>&#x4E0E;@keyframes CSS&#x89C4;&#x5219;&#x4E00;&#x6837;&#xFF0C;&#x6807;&#x51C6;&#x89C4;&#x5B9A;&#x76F8;&#x540C;&#x7684;&#x5173;&#x952E;&#x5E27;&#x4E0D;&#x4EA7;&#x751F;&#x5C42;&#x53E0;&#xFF0C;&#x4EC5;&#x6700;&#x540E;&#x51FA;&#x73B0;&#x7684;&#x8BA4;&#x5B9A;&#x4E3A;&#x6709;&#x6548;&#x3002;<br>&#x4F46;&#x5B9E;&#x9645;&#x4E0A;FireFox14+&#x548C;Chrome&#x5747;&#x5C06;&#x5173;&#x952E;&#x5E27;&#x8BBE;&#x8BA1;&#x4E3A;&#x53EF;&#x5C42;&#x53E0;&#x7684;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes rotate {
  from { transform: rotate(0deg); }
  from { background: red; }
  /* &#x4E0A;&#x8FF0;&#x4E24;&#x6761;time offset&#x5B9E;&#x9645;&#x4E0A;&#x7B49;&#x4EF7;&#x4E8E;
   * from { transform: rotate(0deg); background: red; }
   */
  to {
    transform: rotate(360deg);
    background: yellow;
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code>@<span class="hljs-keyword">keyframes</span> rotate {
  <span class="hljs-selector-tag">from</span> { <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(0deg); }
  <span class="hljs-selector-tag">from</span> { <span class="hljs-attribute">background</span>: red; }
  <span class="hljs-comment">/* &#x4E0A;&#x8FF0;&#x4E24;&#x6761;time offset&#x5B9E;&#x9645;&#x4E0A;&#x7B49;&#x4EF7;&#x4E8E;
   * from { transform: rotate(0deg); background: red; }
   */</span>
  <span class="hljs-selector-tag">to</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(360deg);
    <span class="hljs-attribute">background</span>: yellow;
  }
}</code></pre><p>5.<code>!important</code>&#x5BFC;&#x81F4;&#x5C5E;&#x6027;&#x5931;&#x6548;<br>&#x4E00;&#x822C;&#x60C5;&#x51B5;&#x4E0B;&#x4F7F;&#x7528;<code>!important</code>&#x4F1A;&#x8BA9;CSS&#x5C5E;&#x6027;&#x83B7;&#x5F97;&#x6700;&#x9AD8;&#x6743;&#x91CD;&#xFF0C;&#x4F46;&#x5728;@keyframes&#x4E0B;&#x5374;&#x4F1A;&#x5BFC;&#x81F4;&#x8BE5;CSS&#x5C5E;&#x6027;&#x5931;&#x6548;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@keyframes rotate {
  from {
    transform: rotate(90deg);
    background: red!important; /* background&#x5C5E;&#x6027;&#x65E0;&#x6548; */
  }
  to { transform: rotate(-360deg); }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code>@<span class="hljs-keyword">keyframes</span> rotate {
  <span class="hljs-selector-tag">from</span> {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(90deg);
    <span class="hljs-attribute">background</span>: red<span class="hljs-meta">!important</span>; <span class="hljs-comment">/* background&#x5C5E;&#x6027;&#x65E0;&#x6548; */</span>
  }
  <span class="hljs-selector-tag">to</span> { <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotate</span>(-360deg); }
}</code></pre><p>6.&#x5FC5;&#x987B;&#x63D0;&#x4F9B;&#x81F3;&#x5C11;&#x4E24;&#x4E2A;&#x5173;&#x952E;&#x5E27;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* &#x4E0D;&#x4F1A;&#x6839;&#x636E;&#x7F13;&#x52A8;&#x51FD;&#x6570;&#x4EA7;&#x751F;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF0C;&#x800C;&#x662F;&#x5728;&#x52A8;&#x753B;&#x6301;&#x7EED;&#x65F6;&#x95F4;&#x7684;&#x6700;&#x540E;&#x77AC;&#x95F4;&#x79FB;&#x52A8;&#x8FC7;&#x53BB; */
@keyframes move-left{
   to {
       left: 100px;
   }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-comment">/* &#x4E0D;&#x4F1A;&#x6839;&#x636E;&#x7F13;&#x52A8;&#x51FD;&#x6570;&#x4EA7;&#x751F;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF0C;&#x800C;&#x662F;&#x5728;&#x52A8;&#x753B;&#x6301;&#x7EED;&#x65F6;&#x95F4;&#x7684;&#x6700;&#x540E;&#x77AC;&#x95F4;&#x79FB;&#x52A8;&#x8FC7;&#x53BB; */</span>
@<span class="hljs-keyword">keyframes</span> move-left{
   <span class="hljs-selector-tag">to</span> {
       <span class="hljs-attribute">left</span>: <span class="hljs-number">100px</span>;
   }
}</code></pre><h3 id="articleHeader3">&#x4F7F;&#x7528;&#x52A8;&#x753B;</h3><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;css-selector&gt; {
  animation: &lt;animation-name&gt;
             &lt;animation-duration&gt;
             &lt;animation-timing-function&gt;
             &lt;animation-delay&gt;
             &lt;animation-iteration-count&gt;
             &lt;animation-direction&gt;
             &lt;animation-fill-mode&gt;
             &lt;animation-play-state&gt;;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dts"><code><span class="hljs-params">&lt;css-selector&gt;</span> {
<span class="hljs-symbol">  animation:</span> <span class="hljs-params">&lt;animation-name&gt;</span>
             <span class="hljs-params">&lt;animation-duration&gt;</span>
             <span class="hljs-params">&lt;animation-timing-function&gt;</span>
             <span class="hljs-params">&lt;animation-delay&gt;</span>
             <span class="hljs-params">&lt;animation-iteration-count&gt;</span>
             <span class="hljs-params">&lt;animation-direction&gt;</span>
             <span class="hljs-params">&lt;animation-fill-mode&gt;</span>
             <span class="hljs-params">&lt;animation-play-state&gt;</span>;
}</code></pre><p>&#x793A;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box.rotate {
  animation: rotate 10s infinite alternate;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code><span class="hljs-selector-class">.box</span><span class="hljs-selector-class">.rotate</span> {
  <span class="hljs-attribute">animation</span>: rotate <span class="hljs-number">10s</span> infinite alternate;
}</code></pre><h4>&#x5B50;&#x5C5E;&#x6027;&#x4ECB;&#x7ECD;</h4><p><code>&lt;animation-name&gt;</code>&#xFF0C;&#x6307;&#x5B9A;&#x901A;&#x8FC7;@keyframes&#x5B9A;&#x4E49;&#x7684;&#x8865;&#x95F4;&#x52A8;&#x753B;&#x540D;&#x79F0;&#x3002;<br><code>&lt;animation-duration&gt;</code>&#xFF0C;&#x52A8;&#x753B;&#x6301;&#x7EED;&#x65F6;&#x957F;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;0s&#x3002;&#x5355;&#x4F4D;&#x4E3A;s&#x548C;ms&#x3002;<br><code>&lt;animation-delay&gt;</code>&#xFF0C;&#x52A8;&#x753B;&#x64AD;&#x653E;&#x5EF6;&#x8FDF;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;0s&#x3002;&#x5355;&#x4F4D;&#x4E3A;s&#x548C;ms&#x3002;<br><code>&lt;animation-iteration-count&gt;</code>&#xFF0C;&#x52A8;&#x753B;&#x91CD;&#x590D;&#x64AD;&#x653E;&#x6B21;&#x6570;&#xFF0C;&#x9ED8;&#x8BA4;&#x4E3A;1&#xFF0C;infinite&#x8868;&#x793A;&#x65E0;&#x9650;&#x5FAA;&#x73AF;&#x3002;&#x52A8;&#x753B;&#x64AD;&#x653E;&#x603B;&#x65F6;&#x957F;&#x4E3A;<code>&lt;animation-duration&gt;*&lt;animation-iteration-count&gt;</code>&#x3002;<br><code>&lt;animation-direction&gt;</code>&#xFF0C;&#x53EF;&#x9009;&#x503C;&#x4E3A;<code>normal | reverse | alternate | alternate-reverse</code>&#xFF0C;&#x5206;&#x522B;&#x8868;&#x793A;&#x52A8;&#x753B;&#x64AD;&#x653E;&#x987A;&#x5E8F;&#x662F;<code>&#x4ECE;from&#x5230;to</code>&#xFF0C;<code>&#x4ECE;to&#x5230;from</code>&#xFF0C;<code>&#x4ECE;from&#x5230;to&#x518D;&#x4ECE;to&#x5230;from</code>&#x548C;<code>&#x4ECE;to&#x5230;from&#x518D;&#x4ECE;from&#x5230;to</code>&#x3002;<strong>&#x6CE8;&#x610F;&#xFF1A;&#x8BBE;&#x7F6E;alternate|alternate-reverse&#x65F6;&#xFF0C;animation-iteration-count&#x5FC5;&#x987B;&#x5927;&#x4E8E;1&#x624D;&#x80FD;&#x770B;&#x5230;&#x6548;&#x679C;</strong><br><code>&lt;animation-fill-mode&gt;</code>&#xFF0C;&#x53EF;&#x9009;&#x503C;&#x4E3A;<code>none | forwards | backwards | both</code>&#xFF0C;&#x7528;&#x4E8E;&#x8BBE;&#x7F6E;&#x52A8;&#x753B;&#x5F00;&#x59CB;&#x524D;&#x548C;&#x7ED3;&#x675F;&#x540E;&#x662F;&#x5426;&#x5E94;&#x7528;<code>0%</code>&#x548C;<code>100%</code>&#x7684;&#x6837;&#x5F0F;&#x5BF9;&#x5143;&#x7D20;&#x4E0A;&#x3002;&#x5206;&#x522B;&#x8868;&#x793A;<code>&#x4E0D;&#x5E94;&#x7528;</code>&#xFF0C;<code>&#x5E94;&#x7528;100%&#x7684;&#x6837;&#x5F0F;</code>&#xFF0C;<code>&#x5EF6;&#x8FDF;&#x64AD;&#x653E;&#x671F;&#x95F4;&#x5E94;&#x7528;0%&#x7684;&#x6837;&#x5F0F;</code>&#x548C;<code>0%&#x548C;100%&#x7684;&#x6837;&#x5F0F;&#x5747;&#x5E94;&#x7528;</code>&#x3002;<br><strong>&#x6CE8;&#x610F;&#xFF1A;</strong></p><ol><li>&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;(none)&#xFF0C;&#x52A8;&#x753B;&#x7ED3;&#x675F;&#x540E;&#x4F1A;&#x6062;&#x590D;&#x52A8;&#x753B;&#x524D;&#x7684;&#x6837;&#x5F0F;&#xFF1B;</li><li>&#x8BBE;&#x7F6E;backwards&#x65F6;&#xFF0C;&lt;animation-delay&gt;&#x503C;&#x5927;&#x4E8E;0&#x624D;&#x80FD;&#x770B;&#x5230;&#x6548;&#x679C;&#x3002;</li></ol><p><code>&lt;animation-play-state&gt;</code>&#xFF0C;&#x53EF;&#x9009;&#x503C;<code>running | paused</code>&#xFF0C;&#x83B7;&#x53D6;&#x548C;&#x8BBE;&#x7F6E;&#x64AD;&#x653E;&#x72B6;&#x6001;&#x3002;<strong>&#x6CE8;&#x610F;&#xFF1A;&#x901A;&#x8FC7;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x6211;&#x4EEC;&#x4EC5;&#x80FD;&#x5B9E;&#x73B0;&#x6682;&#x505C;&#x548C;&#x7EE7;&#x7EED;&#x64AD;&#x653E;&#x7684;&#x6548;&#x679C;&#xFF0C;&#x65E0;&#x6CD5;&#x5B9E;&#x73B0;&#x91CD;&#x64AD;&#xFF0C;&#x66F4;&#x522B;&#x8BF4;&#x56DE;&#x653E;&#x4E86;</strong><br><code>&lt;animation-timing-function&gt;</code>&#xFF0C;&#x7528;&#x4E8E;&#x8BBE;&#x7F6E;&#x7F13;&#x52A8;&#x51FD;&#x6570;&#x7C7B;&#x578B;&#xFF0C;&#x503C;&#x4E3A;<code>ease | ease-in | ease-out | ease-in-out | linear | step-start | step-end | steps(&lt;integer&gt;, &lt;flag&gt;) | frames(&lt;integer&gt;) | cubic-bezier(&lt;number&gt;,&lt;number&gt;,&lt;number&gt;,&lt;number&gt;)</code>&#x3002;<br>&#x5176;&#x4E2D;<code>ease | ease-in | ease-out | ease-in-out | linear | cubic-bezier(&lt;number&gt;,&lt;number&gt;,&lt;number&gt;,&lt;number&gt;)</code>&#x7684;&#x6548;&#x679C;&#x5747;&#x4E3A;&#x8FDE;&#x7EED;&#x6E10;&#x53D8;&#x7684;&#xFF0C;&#x800C;<code>step-start | step-end | steps(&lt;integer&gt;, &lt;flag&gt;) | frames(&lt;integer&gt;)</code>&#x5219;&#x4E3A;&#x7A81;&#x53D8;&#x6548;&#x679C;&#x3002;&#x4E0B;&#x9762;&#x6211;&#x4EEC;&#x6DF1;&#x5165;&#x7406;&#x89E3;&#x540E;&#x8005;&#x5427;&#x3002;</p><h2 id="articleHeader4">&#x7F13;&#x52A8;&#x51FD;&#x6570;-<code>step</code>&#x89E3;&#x7591;&#x4E13;&#x9898;</h2><p>&#x2003;<code>step-start</code>&#x5B9E;&#x9645;&#x4E0A;&#x7B49;&#x4EF7;&#x4E8E;<code>steps(10, start)</code>&#xFF0C;&#x800C;<code>step-end</code>&#x5219;&#x7B49;&#x4EF7;&#x4E8E;<code>steps(10)</code>&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x53EA;&#x8981;&#x7406;&#x89E3;&#x597D;<code>steps(&lt;integer&gt;, &lt;flag&gt;)</code>&#x5373;&#x53EF;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* &#x901A;&#x8FC7;&#x8BBE;&#x7F6E;&#x5728;&#x4E00;&#x4E2A;&#x52A8;&#x753B;&#x5468;&#x671F;&#x5185;(&lt;animation-duration&gt;)&#x7684;&#x5E73;&#x5747;&#x5237;&#x65B0;&#x5E27;&#x6570;&#xFF0C;&#x5B9E;&#x73B0;&#x7A81;&#x53D8;&#x52A8;&#x6548;&#x3002;&#x5177;&#x4F53;&#x5E94;&#x7528;&#x6709;&#xFF1A;&#x6E38;&#x620F;&#x7CBE;&#x7075;&#x884C;&#x8D70;&#x3001;&#x6253;&#x5B57;&#x6548;&#x679C;&#x7B49;
 * &lt;number_of_steps&gt; - &#x4E24;&#x4E2A;&#x5173;&#x952E;&#x5E27;&#x95F4;&#x7684;&#x5237;&#x65B0;&#x6B21;&#x6570;
 * &lt;direction&gt; - &#x65B9;&#x5411;&#xFF0C;&#x53EF;&#x9009;&#x503C;&#x4E3A; end | start&#x3002;
 *               end&#x4E3A;&#x9ED8;&#x8BA4;&#x503C;&#xFF0C;&#x8868;&#x793A;&#x52A8;&#x753B;&#x4E00;&#x7ED3;&#x675F;&#xFF0C;&#x52A8;&#x753B;&#x6548;&#x679C;&#x5C31;&#x7ED3;&#x675F;;
 *               start&#x8868;&#x793A;&#x52A8;&#x753B;&#x4E00;&#x5F00;&#x59CB;&#x5C31;&#x9A6C;&#x4E0A;&#x6267;&#x884C;&#x5B8C;&#x7B2C;&#x4E00;&#x4E2A;&#x5173;&#x952E;&#x5E27;&#x7684;&#x6548;&#x679C;&#x3002;
 */
steps(&lt;number_of_steps&gt;, &lt;direction&gt;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>/* &#x901A;&#x8FC7;&#x8BBE;&#x7F6E;&#x5728;&#x4E00;&#x4E2A;&#x52A8;&#x753B;&#x5468;&#x671F;&#x5185;(<span class="hljs-tag">&lt;<span class="hljs-name">animation-duration</span>&gt;</span>)&#x7684;&#x5E73;&#x5747;&#x5237;&#x65B0;&#x5E27;&#x6570;&#xFF0C;&#x5B9E;&#x73B0;&#x7A81;&#x53D8;&#x52A8;&#x6548;&#x3002;&#x5177;&#x4F53;&#x5E94;&#x7528;&#x6709;&#xFF1A;&#x6E38;&#x620F;&#x7CBE;&#x7075;&#x884C;&#x8D70;&#x3001;&#x6253;&#x5B57;&#x6548;&#x679C;&#x7B49;
 * <span class="hljs-tag">&lt;<span class="hljs-name">number_of_steps</span>&gt;</span> - &#x4E24;&#x4E2A;&#x5173;&#x952E;&#x5E27;&#x95F4;&#x7684;&#x5237;&#x65B0;&#x6B21;&#x6570;
 * <span class="hljs-tag">&lt;<span class="hljs-name">direction</span>&gt;</span> - &#x65B9;&#x5411;&#xFF0C;&#x53EF;&#x9009;&#x503C;&#x4E3A; end | start&#x3002;
 *               end&#x4E3A;&#x9ED8;&#x8BA4;&#x503C;&#xFF0C;&#x8868;&#x793A;&#x52A8;&#x753B;&#x4E00;&#x7ED3;&#x675F;&#xFF0C;&#x52A8;&#x753B;&#x6548;&#x679C;&#x5C31;&#x7ED3;&#x675F;;
 *               start&#x8868;&#x793A;&#x52A8;&#x753B;&#x4E00;&#x5F00;&#x59CB;&#x5C31;&#x9A6C;&#x4E0A;&#x6267;&#x884C;&#x5B8C;&#x7B2C;&#x4E00;&#x4E2A;&#x5173;&#x952E;&#x5E27;&#x7684;&#x6548;&#x679C;&#x3002;
 */
steps(<span class="hljs-tag">&lt;<span class="hljs-name">number_of_steps</span>&gt;</span>, <span class="hljs-tag">&lt;<span class="hljs-name">direction</span>&gt;</span>)</code></pre><p>&#x4ECE;&#x5F20;&#x65ED;&#x946B;&#x90A3;&#x5077;&#x6765;&#x7684;&#x89E3;&#x91CA;&#xFF1A;<br>start&#xFF1A;&#x8868;&#x793A;&#x76F4;&#x63A5;&#x5F00;&#x59CB;&#x3002;&#x4E5F;&#x5C31;&#x662F;&#x65F6;&#x95F4;&#x624D;&#x5F00;&#x59CB;&#xFF0C;&#x5C31;&#x5DF2;&#x7ECF;&#x6267;&#x884C;&#x4E86;&#x4E00;&#x4E2A;&#x8DDD;&#x79BB;&#x6BB5;&#x3002;&#x4E8E;&#x662F;&#xFF0C;&#x52A8;&#x753B;&#x6267;&#x884C;&#x7684;5&#x4E2A;&#x5206;&#x6BB5;&#x70B9;&#x662F;&#x4E0B;&#x9762;&#x8FD9;5&#x4E2A;&#xFF0C;&#x8D77;&#x59CB;&#x70B9;&#x88AB;&#x5FFD;&#x7565;&#xFF0C;&#x56E0;&#x4E3A;&#x65F6;&#x95F4;&#x4E00;&#x5F00;&#x59CB;&#x76F4;&#x63A5;&#x5C31;&#x5230;&#x4E86;&#x7B2C;&#x4E8C;&#x4E2A;&#x70B9;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/remote/1460000015588196?w=365&amp;h=136" src="https://static.alili.tech/img/remote/1460000015588196?w=365&amp;h=136" alt="" title="" style="cursor:pointer"></span><br>end&#xFF1A;&#x8868;&#x793A;&#x621B;&#x7136;&#x800C;&#x6B62;&#x3002;&#x4E5F;&#x5C31;&#x662F;&#x65F6;&#x95F4;&#x4E00;&#x7ED3;&#x675F;&#xFF0C;&#x5F53;&#x524D;&#x8DDD;&#x79BB;&#x4F4D;&#x79FB;&#x5C31;&#x505C;&#x6B62;&#x3002;&#x4E8E;&#x662F;&#xFF0C;&#x52A8;&#x753B;&#x6267;&#x884C;&#x7684;5&#x4E2A;&#x5206;&#x6BB5;&#x70B9;&#x662F;&#x4E0B;&#x9762;&#x8FD9;5&#x4E2A;&#xFF0C;&#x7ED3;&#x675F;&#x70B9;&#x88AB;&#x5FFD;&#x7565;&#xFF0C;&#x56E0;&#x4E3A;&#x7B49;&#x8981;&#x6267;&#x884C;&#x7ED3;&#x675F;&#x70B9;&#x7684;&#x65F6;&#x5019;&#x5DF2;&#x7ECF;&#x6CA1;&#x65F6;&#x95F4;&#x4E86;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/remote/1460000015588197" src="https://static.alili.tech/img/remote/1460000015588197" alt="" title="" style="cursor:pointer"></span></p><p>&#x53E6;&#x5916;&#x901A;&#x8FC7;&#x5C06;<code>&lt;animation-fill-mode&gt;</code>&#x8BBE;&#x7F6E;&#x4E3A;<code>forwards</code>&#xFF0C;&#x90A3;&#x4E48;&#x5F53;<code>&lt;direciton&gt;</code>&#x8BBE;&#x7F6E;&#x4E3A;end&#x65F6;&#xFF0C;&#x4E5F;&#x4F1A;&#x663E;&#x793A;(&#x4FDD;&#x6301;)&#x52A8;&#x753B;&#x6700;&#x540E;&#x4E00;&#x4E2A;&#x5173;&#x952E;&#x5E27;&#x7684;&#x6837;&#x5F0F;&#x3002;</p><h2 id="articleHeader5">&#x4E8B;&#x4EF6;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const target = document.getElementById(&quot;target&quot;)
target.addEventListener(&quot;animationstart&quot;, e =&gt; {
  // &#x52A8;&#x753B;&#x5F00;&#x59CB;&#x65F6;&#x89E6;&#x53D1;
})
target.addEventListener(&quot;animationiteration&quot;, e =&gt; {
  // &#x6BCF;&#x6B21;&#x91CD;&#x590D;&#x6267;&#x884C;&#x52A8;&#x753B;&#x65F6;&#x89E6;&#x53D1;
  // &#x5F53;&lt;animation-iteration-count&gt;&#x4E3A;1&#x65F6;&#xFF0C;&#x4E0D;&#x4F1A;&#x89E6;&#x53D1;&#x3002;
})
target.addEventListener(&quot;animationend&quot;, e =&gt; {
  // &#x5F53;&#x52A8;&#x753B;&#x7ED3;&#x675F;&#x65F6;&#x89E6;&#x53D1;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="typescript hljs"><code class="TypeScript"><span class="hljs-keyword">const</span> target = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">&quot;target&quot;</span>)
target.addEventListener(<span class="hljs-string">&quot;animationstart&quot;</span>, <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
  <span class="hljs-comment">// &#x52A8;&#x753B;&#x5F00;&#x59CB;&#x65F6;&#x89E6;&#x53D1;</span>
})
target.addEventListener(<span class="hljs-string">&quot;animationiteration&quot;</span>, <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
  <span class="hljs-comment">// &#x6BCF;&#x6B21;&#x91CD;&#x590D;&#x6267;&#x884C;&#x52A8;&#x753B;&#x65F6;&#x89E6;&#x53D1;</span>
  <span class="hljs-comment">// &#x5F53;&lt;animation-iteration-count&gt;&#x4E3A;1&#x65F6;&#xFF0C;&#x4E0D;&#x4F1A;&#x89E6;&#x53D1;&#x3002;</span>
})
target.addEventListener(<span class="hljs-string">&quot;animationend&quot;</span>, <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> {
  <span class="hljs-comment">// &#x5F53;&#x52A8;&#x753B;&#x7ED3;&#x675F;&#x65F6;&#x89E6;&#x53D1;</span>
})</code></pre><h2 id="articleHeader6">&#x641E;&#x5C3D;&#x8111;&#x6C41;&#x5B9E;&#x73B0;&#x91CD;&#x64AD;&#x6548;&#x679C;</h2><p>&#x5230;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x5DF2;&#x7ECF;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;<code>@keyframes</code>&#x5B9A;&#x4E49;&#x548C;&#x5E94;&#x7528;CSS Animation&#x4E86;&#xFF0C;&#x4F46;&#x6211;&#x4EEC;&#x80FD;&#x5426;&#x83B7;&#x53D6;&#x5BF9;&#x52A8;&#x753B;&#x6548;&#x679C;&#x66F4;&#x591A;&#x7684;&#x63A7;&#x5236;&#x6743;&#x5462;&#xFF1F;&#x5982;&#x5F00;&#x59CB;&#x3001;&#x6682;&#x505C;&#x3001;&#x7EE7;&#x7EED;&#x3001;&#x91CD;&#x64AD;&#x3002;&#x901A;&#x8FC7;<code>&lt;animation-play-state&gt;</code>&#x6211;&#x4EEC;&#x80FD;&#x8F7B;&#x6613;&#x5B9E;&#x73B0;&#x5F00;&#x59CB;&#x3001;&#x6682;&#x505C;&#x548C;&#x7EE7;&#x7EED;&#x7684;&#x6548;&#x679C;&#xFF0C;&#x4F46;&#x91CD;&#x64AD;&#x5374;&#x6CA1;&#x90A3;&#x4E48;&#x5BB9;&#x6613;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function pause (target: HTMLElement):boolean {
  const isRunning = target.style.animationPlayState == &quot;running&quot;
  if (isRunning) {
    target.style.animationPlayState = &quot;paused&quot;
  }
  
  return isRunning
}

function play (target: HTMLElement):boolean {
  const isStop = target.style.animationPlayState == &quot;paused&quot;
  if (isStop) {
    target.style.animationPlayState = &quot;running&quot;
  }
  
  return isStop
}

function replay (target: HTMLElement, animationClassName: string):void {
  // &#x5148;&#x79FB;&#x9664;&#x52A8;&#x753B;&#x6548;&#x679C;
  target.classList.remove(animationName)
  // requestAnimationFrame&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4F1A;&#x5728;&#x4E0B;&#x4E00;&#x6B21;&#x754C;&#x9762;&#x6E32;&#x67D3;&#x524D;&#x6267;&#x884C;
  requestAnimationFrame(_ =&gt; {
    // &#x8FD9;&#x65F6;&#x52A8;&#x753B;&#x7684;&#x5F71;&#x54CD;&#x8FD8;&#x5728;&#xFF0C;&#x6240;&#x4EE5;&#x8981;&#x7B49;&#x754C;&#x9762;&#x6E32;&#x67D3;&#x5B8C;&#x540E;&#x518D;&#x91CD;&#x65B0;&#x542F;&#x7528;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF0C;&#x624D;&#x80FD;&#x5B9E;&#x73B0;&#x91CD;&#x64AD;
    requestAnimationFrame(_ =&gt; {
      target.classList.add(animationName)
    })
  })
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>function pause (target: HTMLElement):boolean {
  const isRunning = target<span class="hljs-selector-class">.style</span><span class="hljs-selector-class">.animationPlayState</span> == <span class="hljs-string">&quot;running&quot;</span>
  <span class="hljs-keyword">if</span> (isRunning) {
    target<span class="hljs-selector-class">.style</span><span class="hljs-selector-class">.animationPlayState</span> = <span class="hljs-string">&quot;paused&quot;</span>
  }
  
  return isRunning
}

function play (target: HTMLElement):boolean {
  const isStop = target<span class="hljs-selector-class">.style</span><span class="hljs-selector-class">.animationPlayState</span> == <span class="hljs-string">&quot;paused&quot;</span>
  <span class="hljs-keyword">if</span> (isStop) {
    target<span class="hljs-selector-class">.style</span><span class="hljs-selector-class">.animationPlayState</span> = <span class="hljs-string">&quot;running&quot;</span>
  }
  
  return isStop
}

function replay (target: HTMLElement, animationClassName: string):void {
  <span class="hljs-comment">// &#x5148;&#x79FB;&#x9664;&#x52A8;&#x753B;&#x6548;&#x679C;</span>
  target<span class="hljs-selector-class">.classList</span><span class="hljs-selector-class">.remove</span>(animationName)
  <span class="hljs-comment">// requestAnimationFrame&#x7684;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4F1A;&#x5728;&#x4E0B;&#x4E00;&#x6B21;&#x754C;&#x9762;&#x6E32;&#x67D3;&#x524D;&#x6267;&#x884C;</span>
  requestAnimationFrame(_ =&gt; {
    <span class="hljs-comment">// &#x8FD9;&#x65F6;&#x52A8;&#x753B;&#x7684;&#x5F71;&#x54CD;&#x8FD8;&#x5728;&#xFF0C;&#x6240;&#x4EE5;&#x8981;&#x7B49;&#x754C;&#x9762;&#x6E32;&#x67D3;&#x5B8C;&#x540E;&#x518D;&#x91CD;&#x65B0;&#x542F;&#x7528;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF0C;&#x624D;&#x80FD;&#x5B9E;&#x73B0;&#x91CD;&#x64AD;</span>
    requestAnimationFrame(_ =&gt; {
      target<span class="hljs-selector-class">.classList</span><span class="hljs-selector-class">.add</span>(animationName)
    })
  })
}</code></pre><h2 id="articleHeader7">&#x603B;&#x7ED3;</h2><p>CSS3&#x4E3A;&#x6211;&#x4EEC;&#x63D0;&#x4F9B;&#x4E86;&#x52A8;&#x753B;&#x6548;&#x679C;&#xFF0C;&#x9664;&#x4E86;&#x63D0;&#x4F9B;&#x6BD4;Transition&#x66F4;&#x4E30;&#x5BCC;&#x7684;&#x53EF;&#x63A7;&#x6027;&#xFF0C;&#x6BD4;JavaScript&#x66F4;&#x7B80;&#x6613;&#x7684;API&#xFF0C;&#x8FD8;&#x8BA9;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;GPU&#x6765;&#x52A0;&#x901F;&#x5462;^_^<br>&#x5C0A;&#x91CD;&#x539F;&#x521B;&#xFF0C;&#x8F6C;&#x8F7D;&#x8BF7;&#x6CE8;&#x660E;&#x6765;&#x81EA;&#xFF1A;<a href="https://www.cnblogs.com/fsjohnhuang/p/9289618.html" rel="nofollow noreferrer" target="_blank">https://www.cnblogs.com/fsjoh...</a> ^_^&#x80A5;&#x4ED4;John</p><h2 id="articleHeader8">&#x53C2;&#x8003;</h2><p><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/@keyframes" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a><br><a href="https://designmodo.com/steps-css-animations/" rel="nofollow noreferrer" target="_blank">https://designmodo.com/steps-...</a><br><a href="http://lea.verou.me/2011/09/pure-css3-typing-animation-with-steps/" rel="nofollow noreferrer" target="_blank">http://lea.verou.me/2011/09/p...</a><br><a href="http://jsfiddle.net/simurai/CGmCe/" rel="nofollow noreferrer" target="_blank">http://jsfiddle.net/simurai/C...</a><button class="btn btn-xs btn-default ml10 preview" data-url="simurai/CGmCe/" data-typeid="0">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button><br><a href="https://www.zhangxinxu.com/wordpress/2018/06/css3-animation-steps-step-start-end/" rel="nofollow noreferrer" target="_blank">https://www.zhangxinxu.com/wo...</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS魔法堂：更丰富的前端动效by CSS Animation

## 原文链接
[https://segmentfault.com/a/1190000015588193](https://segmentfault.com/a/1190000015588193)

