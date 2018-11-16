---
title: webpack系列——实现一个行内样式px转vw的loader
hidden: true
categories: [reprint]
slug: cb4473d9
date: 2018-11-10 02:30:10
---

{{< raw >}}
<h3 id="articleHeader0">&#x9700;&#x6C42;</h3><p>&#x81EA;&#x4ECE;&#x6709;&#x4E86;postcss&#x6765;&#x5904;&#x7406;css&#x6587;&#x4EF6;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5FEB;&#x901F;&#x8FDB;&#x884C;&#x7F51;&#x7AD9;&#x9002;&#x914D;&#x7684;&#x5F00;&#x53D1;&#xFF0C;&#x53EA;&#x9700;&#x8981;&#x6539;&#x6539;&#x53C2;&#x6570;&#xFF0C;&#x6837;&#x5F0F;&#x6309;&#x7167;&#x8BBE;&#x8BA1;&#x7A3F;&#x7684;px&#x5199;&#xFF0C;webpack&#x7F16;&#x8BD1;&#x81EA;&#x52A8;&#x8F6C;&#x6362;&#x6210;rem&#x6216;&#x8005;vw&#x7B49;&#x3002;</p><p>&#x4F46;&#x662F;&#xFF0C;&#x6807;&#x7B7E;&#x5185;&#x7684;px&#x600E;&#x4E48;&#x529E;&#x5462;&#xFF1F;postcss&#x5E76;&#x4E0D;&#x63D0;&#x4F9B;&#x8F6C;&#x6362;&#x8FD9;&#x4E2A;&#x7684;&#x529F;&#x80FD;&#x3002;</p><h3 id="articleHeader1">&#x63A2;&#x7D22;</h3><h4>&#x542F;&#x52A8;&#x601D;&#x8DEF;</h4><p>&#x6211;&#x6B63;&#x5728;&#x505A;&#x4E00;&#x4E2A;vue&#x9879;&#x76EE;&#xFF0C;&#x521A;&#x597D;&#x60F3;&#x8981;&#x5B9E;&#x73B0;&#x4E0A;&#x9762;&#x63D0;&#x5230;&#x7684;&#x9700;&#x6C42;&#xFF0C;&#x4F8B;&#x5982;&#x4E0B;&#x9762;&#x7684;&#x4F8B;&#x5B50;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;h3 style=&quot;font-size: 28px;margin-top: 10px&quot; width=&quot;500px&quot;&gt;Test&lt;/h3&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html" style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;font-size: 28px;margin-top: 10px&quot;</span> <span class="hljs-attr">width</span>=<span class="hljs-string">&quot;500px&quot;</span>&gt;</span>Test<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span></code></pre><p>&#x6211;&#x5E0C;&#x671B;&#x4ED6;&#x80FD;&#x6839;&#x636E;&#x6211;&#x8BBE;&#x7F6E;&#x7684;&#x57FA;&#x51C6;&#x503C;&#x81EA;&#x52A8;&#x8F6C;&#x6362;&#x6210;vw&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;h3 width=&quot;00vw&quot; style=&quot;font-size: 00vw; margin-top: 00vw;&quot;&gt;Test&lt;/h3&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html" style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">width</span>=<span class="hljs-string">&quot;00vw&quot;</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;font-size: 00vw; margin-top: 00vw;&quot;</span>&gt;</span>Test<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span></code></pre><p>&#x8981;&#x60F3;&#x5B9E;&#x73B0;&#x8FD9;&#x6837;&#x4E00;&#x4E2A;&#x4E1C;&#x897F;&#xFF0C;&#x79BB;&#x4E0D;&#x5F00;&#x7F16;&#x8BD1;&#x5DE5;&#x5177;webpack&#xFF0C;webpack&#x6709;loader&#x3001;plugin&#xFF0C;&#x7528;&#x4EC0;&#x4E48;&#x597D;&#x5462;&#xFF1F;&#x901A;&#x8FC7;&#x627E;&#x8D44;&#x6599;&#xFF0C;&#x6211;&#x4ECE;&#x4E00;&#x7BC7;px&#x8F6C;rem&#x7684;&#x6587;&#x7AE0;&#x4E2D;&#x5F97;&#x5230;&#x4E86;&#x63D0;&#x793A; <a href="https://juejin.im/post/5adf41f85188256715474d5e" rel="nofollow noreferrer" target="_blank">react&#x5185;&#x8054;&#x6837;&#x5F0F;&#x4F7F;&#x7528;webpack&#x5C06;px&#x8F6C;rem</a></p><h4>&#x6CA1;&#x9519;&#xFF0C;&#x5C31;&#x662F;webpack-loader</h4><p>&#x5199;&#x4E00;&#x4E2A;webpack loader&#xFF0C;&#x5728;webpack&#x7F16;&#x8BD1;&#x9636;&#x6BB5;&#xFF0C;&#x8BFB;&#x53D6;vue&#x6587;&#x4EF6;&#x91CC;&#x9762;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x901A;&#x8FC7;&#x6B63;&#x5219;&#x8BC6;&#x522B;&#x51FA;&#x9700;&#x8981;&#x8F6C;&#x6362;&#x7684;&#x50CF;&#x7D20;px&#xFF0C;&#x518D;&#x901A;&#x8FC7;&#x516C;&#x5F0F;&#x8F6C;&#x6362;&#x6210;vw&#x3002;</p><h4>&#x5F00;&#x59CB;&#x884C;&#x52A8;</h4><p><strong>1&#x3001;&#x4E86;&#x89E3;loader&#x7684;&#x5B9E;&#x73B0;&#x539F;&#x7406;</strong><br>&#x5199;&#x4E00;&#x4E2A;loader&#x5F88;&#x7B80;&#x5355;&#xFF0C;&#x4F20;&#x5165;source&#xFF0C;&#x5E72;&#x4E9B;&#x574F;&#x4E8B;&#xFF0C;&#x5E72;&#x5B8C;&#x4E4B;&#x540E;&#xFF0C;&#x8FD4;&#x56DE;&#x5904;&#x7406;&#x8FC7;&#x7684;source&#x3002;source&#x5BF9;&#x5E94;&#x7684;&#x662F;&#x6BCF;&#x4E00;&#x4E2A;&#x901A;&#x8FC7;loader&#x5339;&#x914D;&#x5230;&#x7684;&#x6587;&#x4EF6;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = function (source) {
  // &#x5E72;&#x4E9B;&#x574F;&#x4E8B;
  return source
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">source</span>) </span>{
  <span class="hljs-comment">// &#x5E72;&#x4E9B;&#x574F;&#x4E8B;</span>
  <span class="hljs-keyword">return</span> source
}</code></pre><p><strong>2&#x3001;&#x5982;&#x4F55;&#x8BA9;loader&#x5E72;&#x574F;&#x4E8B;</strong><br>&#x5148;&#x770B;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684;vue&#x6587;&#x4EF6;&#xFF0C;&#x901A;&#x5E38;&#x5206;&#x4E3A;3&#x90E8;&#x5206;&#xFF0C;&lt;template&gt;&#x3001;&lt;script&gt;&#x3001;&lt;style&gt;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;div&gt;
    &lt;h3 style=&quot;font-size: 28px;margin-top: 10px&quot; width=&quot;500px&quot;&gt;Test&lt;/h3&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
  export default {
    name: &apos;&apos;,
    components: {},
    created () {},
    mounted () {},
    methods: {}
  }
&lt;/script&gt;

&lt;style lang=&quot;less&quot;&gt;
  h3 {
    font-size: 20px;
  }
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code class="text"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;font-size: 28px;margin-top: 10px&quot;</span> <span class="hljs-attr">width</span>=<span class="hljs-string">&quot;500px&quot;</span>&gt;</span>Test<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;&apos;</span>,
    <span class="hljs-attr">components</span>: {},
    created () {},
    mounted () {},
    <span class="hljs-attr">methods</span>: {}
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;less&quot;</span>&gt;</span><span class="css">
  <span class="hljs-selector-tag">h3</span> {
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">20px</span>;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre><p>&#x6211;&#x4EEC;&#x77E5;&#x9053;&lt;style&gt;&#x90E8;&#x5206;&#x5DF2;&#x7ECF;&#x6709;postcss&#x4F1A;&#x8FDB;&#x884C;&#x8F6C;&#x6362;&#x5904;&#x7406;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x628A;&#x91CD;&#x70B9;&#x653E;&#x5230;&#x4E86;&lt;template&gt;&#x5185;&#x90E8;&#x7684; &#x201C;00px&#x201D;&#x3002;</p><p>&#x5176;&#x5B9E;source&#x5BF9;&#x5E94;&#x7684;&#x5C31;&#x662F;&#x8FD9;&#x6837;&#x4E00;&#x4E2A;vue&#x6587;&#x4EF6;&#xFF0C;&#x8BE5;&#x4F8B;&#x5B50;&#x4E2D;&#x6709;28px&#x3001;10px&#x3001;500px&#x662F;&#x9700;&#x8981;&#x8F6C;&#x6362;&#x7684;&#x76EE;&#x6807;&#xFF0C;&#x9996;&#x5148;&#x7528;&#x6B63;&#x5219;&#x628A;&#x4ED6;&#x4EEC;&#x90FD;&#x627E;&#x51FA;&#x6765;&#x3002;</p><ul><li>&#x5148;&#x628A;template&#x90E8;&#x5206;&#x63D0;&#x51FA;&#x6765;&#xFF0C;&#x9632;&#x6B62;&#x628A;style&#x90E8;&#x5206;&#x4E5F;&#x8F6C;&#x6362;&#x4E86;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const template = /&lt;template&gt;([\s\S]+)&lt;\/template&gt;/gi


// &#x5339;&#x914D;&#x51FA;&#x6765;&#x7684;&#x90E8;&#x5206;
&lt;template&gt;
  &lt;div&gt;
    &lt;h3 style=&quot;font-size: 28px;margin-top: 10px&quot; width=&quot;500px&quot;&gt;Test&lt;/h3&gt;
  &lt;/div&gt;
&lt;/template&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> template = <span class="hljs-regexp">/&lt;template&gt;([\s\S]+)&lt;\/template&gt;/gi</span>


<span class="hljs-comment">// &#x5339;&#x914D;&#x51FA;&#x6765;&#x7684;&#x90E8;&#x5206;</span>
&lt;template&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">style</span>=<span class="hljs-string">&quot;font-size: 28px;margin-top: 10px&quot;</span> <span class="hljs-attr">width</span>=<span class="hljs-string">&quot;500px&quot;</span>&gt;</span>Test<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/template&gt;</span></code></pre><ul><li>&#x5339;&#x914D;px&#x7684;&#x6B63;&#x5219;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ZPXRegExp = /(\d+)px/" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">const</span> ZPXRegExp = <span class="hljs-regexp">/(\d+)px/</span></code></pre><ul><li>&#x5BF9;template&#x91CC;&#x9762;&#x7684;px&#x8FDB;&#x884C;&#x8F6C;&#x6362;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = function (source) {
  let _source = &apos;&apos;
  // &#x5982;&#x679C;&#x5F53;&#x524D;&#x7684;source&#x91CC;&#x9762;&#x5B58;&#x5728;template
  if (template.test(source)) {
    // &#x5339;&#x914D;template&#x90E8;&#x5206;
    _source = source.match(template)[0]
  }
  // &#x5339;&#x914D;&#x51FA;template&#x91CC;&#x9762;&#x7684;px
  let pxGlobalRegExp = new RegExp(ZPXRegExp.source, &apos;ig&apos;)
  if (pxGlobalRegExp.test(_source)) {
    // px&#x8F6C;&#x6362;vw&#xFF0C;&#x6838;&#x5FC3;&#x90E8;&#x5206;
    let $_source = _source.replace(pxGlobalRegExp, createPxReplace(defaults.viewportWidth, defaults.minPixelValue, defaults.unitPrecision, defaults.viewportUnit))
    // &#x8F6C;&#x6362;&#x4E4B;&#x540E;&#x66FF;&#x6362;&#x56DE;source&#x4E2D;&#xFF0C;&#x8FD4;&#x56DE;&#x51FD;&#x6570;&#x503C;
    return source.replace(template, $_source)
  } else {
    //&#x6CA1;&#x6709;&#x5C31;&#x4E0D;&#x8F6C;&#xFF0C;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;
    return source
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">source</span>) </span>{
  <span class="hljs-keyword">let</span> _source = <span class="hljs-string">&apos;&apos;</span>
  <span class="hljs-comment">// &#x5982;&#x679C;&#x5F53;&#x524D;&#x7684;source&#x91CC;&#x9762;&#x5B58;&#x5728;template</span>
  <span class="hljs-keyword">if</span> (template.test(source)) {
    <span class="hljs-comment">// &#x5339;&#x914D;template&#x90E8;&#x5206;</span>
    _source = source.match(template)[<span class="hljs-number">0</span>]
  }
  <span class="hljs-comment">// &#x5339;&#x914D;&#x51FA;template&#x91CC;&#x9762;&#x7684;px</span>
  <span class="hljs-keyword">let</span> pxGlobalRegExp = <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(ZPXRegExp.source, <span class="hljs-string">&apos;ig&apos;</span>)
  <span class="hljs-keyword">if</span> (pxGlobalRegExp.test(_source)) {
    <span class="hljs-comment">// px&#x8F6C;&#x6362;vw&#xFF0C;&#x6838;&#x5FC3;&#x90E8;&#x5206;</span>
    <span class="hljs-keyword">let</span> $_source = _source.replace(pxGlobalRegExp, createPxReplace(defaults.viewportWidth, defaults.minPixelValue, defaults.unitPrecision, defaults.viewportUnit))
    <span class="hljs-comment">// &#x8F6C;&#x6362;&#x4E4B;&#x540E;&#x66FF;&#x6362;&#x56DE;source&#x4E2D;&#xFF0C;&#x8FD4;&#x56DE;&#x51FD;&#x6570;&#x503C;</span>
    <span class="hljs-keyword">return</span> source.replace(template, $_source)
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">//&#x6CA1;&#x6709;&#x5C31;&#x4E0D;&#x8F6C;&#xFF0C;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;</span>
    <span class="hljs-keyword">return</span> source
  }
}</code></pre><ul><li>px&#x8F6C;vw&#x7684;&#x516C;&#x5F0F;</li></ul><p>&#x6211;&#x4F7F;&#x7528;&#x7684;&#x662F; postcss-px-to-viewport &#x5185;&#x90E8;&#x5B9E;&#x73B0;&#x7684;&#x8F6C;&#x6362;&#x516C;&#x5F0F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createPxReplace (viewportSize, minPixelValue, unitPrecision, viewportUnit) {
  // &#x4E0D;&#x7528;&#x597D;&#x5947;$0, $1&#x662F;&#x600E;&#x4E48;&#x6765;&#x7684;&#xFF0C;&#x4ED6;&#x4EEC;&#x662F;replace&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x63D0;&#x4F9B;&#x7684;
  return function ($0, $1) {
    if (!$1) return
    var pixels = parseFloat($1)
    if (pixels &lt;= minPixelValue) return
    return toFixed((pixels / viewportSize * 100), unitPrecision) + viewportUnit
  }
}
function toFixed (number, precision) {
  var multiplier = Math.pow(10, precision + 1),
    wholeNumber = Math.floor(number * multiplier)
  return Math.round(wholeNumber / 10) * 10 / multiplier
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createPxReplace</span> (<span class="hljs-params">viewportSize, minPixelValue, unitPrecision, viewportUnit</span>) </span>{
  <span class="hljs-comment">// &#x4E0D;&#x7528;&#x597D;&#x5947;$0, $1&#x662F;&#x600E;&#x4E48;&#x6765;&#x7684;&#xFF0C;&#x4ED6;&#x4EEC;&#x662F;replace&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x63D0;&#x4F9B;&#x7684;</span>
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">$<span class="hljs-number">0</span>, $<span class="hljs-number">1</span></span>) </span>{
    <span class="hljs-keyword">if</span> (!$<span class="hljs-number">1</span>) <span class="hljs-keyword">return</span>
    <span class="hljs-keyword">var</span> pixels = <span class="hljs-built_in">parseFloat</span>($<span class="hljs-number">1</span>)
    <span class="hljs-keyword">if</span> (pixels &lt;= minPixelValue) <span class="hljs-keyword">return</span>
    <span class="hljs-keyword">return</span> toFixed((pixels / viewportSize * <span class="hljs-number">100</span>), unitPrecision) + viewportUnit
  }
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">toFixed</span> (<span class="hljs-params">number, precision</span>) </span>{
  <span class="hljs-keyword">var</span> multiplier = <span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">10</span>, precision + <span class="hljs-number">1</span>),
    wholeNumber = <span class="hljs-built_in">Math</span>.floor(number * multiplier)
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.round(wholeNumber / <span class="hljs-number">10</span>) * <span class="hljs-number">10</span> / multiplier
}</code></pre><ul><li>&#x4F7F;&#x7528;&#x548C;postcss-px-to-viewport&#x7C7B;&#x4F3C;&#x7684;&#x914D;&#x7F6E;</li></ul><p>&#x4E00;&#x4E2A;&#x57FA;&#x672C;&#x7684;&#x914D;&#x7F6E;&#x5927;&#x6982;&#x5305;&#x542B;&#x8FD9;&#x4E9B;&#x4FE1;&#x606F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let defaultsProp = {
  unitToConvert: &apos;px&apos;,
  viewportWidth: 750,
  unitPrecision: 5,
  viewportUnit: &apos;vw&apos;,
  fontViewportUnit: &apos;vw&apos;,
  minPixelValue: 1
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> defaultsProp = {
  <span class="hljs-attr">unitToConvert</span>: <span class="hljs-string">&apos;px&apos;</span>,
  <span class="hljs-attr">viewportWidth</span>: <span class="hljs-number">750</span>,
  <span class="hljs-attr">unitPrecision</span>: <span class="hljs-number">5</span>,
  <span class="hljs-attr">viewportUnit</span>: <span class="hljs-string">&apos;vw&apos;</span>,
  <span class="hljs-attr">fontViewportUnit</span>: <span class="hljs-string">&apos;vw&apos;</span>,
  <span class="hljs-attr">minPixelValue</span>: <span class="hljs-number">1</span>
}</code></pre><ul><li>&#x7ED9;webpack-loader&#x52A0;&#x4E0A;option</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const loaderUtils = require(&apos;loader-utils&apos;)

const opts = loaderUtils.getOptions(this)
const defaults = Object.assign({}, defaultsProp, opts)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> loaderUtils = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;loader-utils&apos;</span>)

<span class="hljs-keyword">const</span> opts = loaderUtils.getOptions(<span class="hljs-keyword">this</span>)
<span class="hljs-keyword">const</span> defaults = <span class="hljs-built_in">Object</span>.assign({}, defaultsProp, opts)</code></pre><p>&#x597D;&#x4E86;&#xFF0C;&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x5B9E;&#x73B0;&#x4E86;&#x4E00;&#x4E2A;&#x53EF;&#x4EE5;&#x5E72;&#x574F;&#x4E8B;&#x7684;loader&#xFF0C;&#x1F62F;&#x4E0D;&#xFF0C;&#x662F;&#x505A;&#x597D;&#x4E8B;&#xFF01;</p><p>&#x6211;&#x4EEC;&#x6765;&#x770B;&#x770B;&#x8F6C;&#x6362;&#x6210;&#x679C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;h3 width=&quot;66.66667vw&quot; style=&quot;font-size: 3.73333vw; margin-top: 1.33333vw;&quot;&gt;Test&lt;/h3&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code style="word-break:break-word;white-space:initial">&lt;<span class="hljs-selector-tag">h3</span> <span class="hljs-attribute">width</span>=<span class="hljs-string">&quot;66.66667vw&quot;</span> style=<span class="hljs-string">&quot;font-size: 3.73333vw; margin-top: 1.33333vw;&quot;</span>&gt;Test&lt;/h3&gt;</code></pre><h3 id="articleHeader2">&#x53CD;&#x601D;</h3><p>&#x867D;&#x7136;&#x5B9E;&#x73B0;&#x4E86;&#x6211;&#x4E00;&#x5F00;&#x59CB;&#x7684;&#x9700;&#x6C42;&#xFF0C;&#x4F46;&#x662F;&#x5FC3;&#x91CC;&#x603B;&#x662F;&#x4E0D;&#x6DE1;&#x5B9A;&#xFF0C;&#x56E0;&#x4E3A;&#x8FD8;&#x4E9B;&#x5751;&#x6CA1;&#x6709;&#x60F3;&#x660E;&#x767D;&#xFF0C;&#x540E;&#x7EED;&#x5982;&#x679C;&#x60F3;&#x660E;&#x767D;&#x4E86;&#xFF0C;&#x518D;&#x8FDB;&#x884C;&#x5B8C;&#x5584;&#x3002;</p><h3 id="articleHeader3">&#x6E90;&#x7801;</h3><p><a href="https://github.com/hyy1115/style-vw-loader" rel="nofollow noreferrer" target="_blank">style-vw-loader</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack系列——实现一个行内样式px转vw的loader

## 原文链接
[https://segmentfault.com/a/1190000016374998](https://segmentfault.com/a/1190000016374998)

