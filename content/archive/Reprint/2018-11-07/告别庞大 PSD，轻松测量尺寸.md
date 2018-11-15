---
title: 告别庞大 PSD，轻松测量尺寸
hidden: true
categories: reprint
slug: 214932b3
date: 2018-11-07 02:30:15
---

{{< raw >}}
<h2 id="articleHeader0">&#x8D77;&#x56E0;</h2><p>&#x4F5C;&#x4E3A;&#x524D;&#x7AEF;&#x5DE5;&#x7A0B;&#x5E08;&#xFF0C;&#x65E5;&#x5E38;&#x5F00;&#x53D1;&#x79BB;&#x4E0D;&#x5F00; psd &#x6587;&#x4EF6;&#x3002;</p><p>&#x4F46;&#x662F;&#x65E5;&#x5E38;&#x5F00;&#x53D1;&#x7684;&#x4E00;&#x4E2A;&#x5C0F;&#x5F39;&#x7A97;&#x9875;&#x9762;&#xFF0C;&#x5B83;&#x7684; psd &#x5C45;&#x7136;&#x9700;&#x8981; <strong>30+Mb</strong>&#xFF0C;&#x6240;&#x4EE5;&#x7ECF;&#x5E38;&#x5F97;&#x5B9A;&#x671F;&#x6E05;&#x7406; psd...</p><p>&#x5BF9;&#x4E8E;&#x6211;&#x4E00;&#x4E2A; PS &#x5C0F;&#x83DC;&#x9E21;&#x6765;&#x8BF4;&#xFF0C;&#x7528; PSD &#x65E0;&#x975E;&#x53EA;&#x662F;&#x9700;&#x8981;&#x7528;&#x6765;&#x5EA6;&#x91CF;&#x5143;&#x7D20;&#x5927;&#x5C0F;&#xFF08;&#x5143;&#x7D20;&#x95F4;&#x8DDD;&#xFF09;&#xFF0C;&#x67E5;&#x770B;&#x5C5E;&#x6027;&#x7B49;&#x7B80;&#x5355;&#x7684;&#x529F;&#x80FD;&#x3002;</p><h2 id="articleHeader1">&#x601D;&#x8003;&#xFF0C;&#x5BF9;&#x6BD4;</h2><p>&#x76F8;&#x5BF9;&#x6BD4;&#x4E8E; sketch&#xFF0C;sketch &#x5177;&#x6709; <a href="https://github.com/utom/sketch-measure" rel="nofollow noreferrer" target="_blank">sketch-measure</a>&#xFF0C;&#x8BBE;&#x8BA1;&#x5E08;&#x5BFC;&#x51FA;&#x6210;&#x9759;&#x6001;&#x8D44;&#x6E90;&#x7ED9;&#x524D;&#x7AEF;&#x5373;&#x53EF;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016502212?w=716&amp;h=372" src="https://static.alili.tech/img/remote/1460000016502212?w=716&amp;h=372" alt="" title="" style="cursor:pointer;display:inline"></span></p><p>&#x5BF9;&#x4E8E; PSD &#x6765;&#x8BF4;&#xFF0C;&#x5E02;&#x9762;&#x4E0A;&#x5DF2;&#x7ECF;&#x6709;&#x5982; pxcook / lanhuapp&#xFF0C;&#x4F53;&#x9A8C;&#x4E5F;&#x5F88;&#x4E0D;&#x9519;&#xFF0C;&#x4F46;&#x662F;&#x9700;&#x8981;&#x4E0B;&#x8F7D; U &#x540C;&#x5B66;&#x63D0;&#x4F9B;&#x7684; (&#x5E9E;&#x5927;&#x7684;) psd &#x624D;&#x80FD;&#x8FDB;&#x884C;&#x6807;&#x6CE8;&#x4F53;&#x9A8C;&#x3002;</p><p>&#x800C;&#x4E14;&#x6709;&#x65F6;&#x5019;&#x8FD8;&#x662F;&#x9700;&#x8981; U &#x540C;&#x5B66;&#x7ED9;(&#x5E9E;&#x5927;&#x7684;) PSD &#x6587;&#x4EF6;&#xFF0C;&#x6211;&#x4EEC;&#x624D;&#x80FD;&#x5728; pxcook / lanhuapp &#x4E2D;&#x81EA;&#x52A8;&#x6807;&#x6CE8;&#x3002;</p><p>&#x4E8E;&#x662F;&#x9274;&#x4E8E;&#x4EE5;&#x4E0A;&#xFF0C;&#x8003;&#x8651;&#x505A;&#x4E00;&#x4E2A;&#x5F00;&#x6E90;&#x9879;&#x76EE;&#xFF0C;&#x7C7B;&#x4F3C;&#x4E8E; sketch-measure&#xFF0C; &#x5B9A;&#x4F4D;&#x4E3A; psd-measure&#x3002;</p><h2 id="articleHeader2">&#x6548;&#x679C;&#x5C55;&#x793A;</h2><p><a href="https://imcuttle.github.io/measure/" rel="nofollow noreferrer" target="_blank">DEMO</a><br><a href="https://github.com/imcuttle/measure" rel="nofollow noreferrer" target="_blank">&#x6E90;&#x7801;&#xFF0C;&#x6B22;&#x8FCE; star</a></p><p><span class="img-wrap"><img data-src="/img/remote/1460000016502213" src="https://static.alili.tech/img/remote/1460000016502213" alt="" title="" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader3">&#x547D;&#x4EE4;&#x884C;</h3><p>&#x6211;&#x4EEC;&#x4E5F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x547D;&#x4EE4;&#x884C;&#x6765;&#x5BFC;&#x51FA;&#x9875;&#x9762;&#x6807;&#x6CE8;</p><p>bash</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i measure-export-cli -g
# &#x5F00;&#x542F;&#x670D;&#x52A1;&#xFF0C;&#x5728;&#x7EBF;&#x9884;&#x89C8; `path/to/psdDir` &#x4E0B;&#x7684; psd
measure-export start path/to/psdDir
# &#x6784;&#x5EFA; `path/to/psdDir` &#x4E0B;&#x7684; psd &#x81F3; `dist` &#x6587;&#x4EF6;&#x76EE;&#x5F55;
measure-export build path/to/psdDir" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code>npm i measure-<span class="hljs-keyword">export</span>-cli -g
# &#x5F00;&#x542F;&#x670D;&#x52A1;&#xFF0C;&#x5728;&#x7EBF;&#x9884;&#x89C8; `path/to/psdDir` &#x4E0B;&#x7684; psd
measure-<span class="hljs-keyword">export</span> start path/to/psdDir
# &#x6784;&#x5EFA; `path/to/psdDir` &#x4E0B;&#x7684; psd &#x81F3; `dist` &#x6587;&#x4EF6;&#x76EE;&#x5F55;
measure-<span class="hljs-keyword">export</span> build path/to/psdDir</code></pre><h3 id="articleHeader4">Chrome &#x63D2;&#x4EF6;</h3><p>&#x63D0;&#x4F9B; Chrome &#x63D2;&#x4EF6;&#xFF0C;&#x5F53;&#x6211;&#x4EEC;&#x70B9;&#x51FB; psd &#x94FE;&#x63A5;&#x65F6;&#x5019;&#x8DF3;&#x51FA; Measure UI&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x4E0B;&#x8F7D; PSD&#xFF0C;&#x5F53;&#x7136;&#x6211;&#x4EEC;&#x4E5F;&#x53EF;&#x4EE5;&#x70B9;&#x51FB;&#x53F3;&#x4E0A;&#x65B9;&#x7684;&#x4E0B;&#x8F7D;&#x8FDB;&#x884C;&#x4E0B;&#x8F7D;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016502214?w=2830&amp;h=1360" src="https://static.alili.tech/img/remote/1460000016502214?w=2830&amp;h=1360" alt="" title="" style="cursor:pointer"></span></p><h4>&#x5B89;&#x88C5;</h4><ol><li>&#x4E0B;&#x8F7D;&#x6269;&#x5C55;&#xFF0C;<a href="https://github.com/imcuttle/measure/raw/master/packages/chrome-extension-measure-viewer/measure-viewer.zip" rel="nofollow noreferrer" target="_blank">&#x70B9;&#x51FB;&#x4E0B;&#x8F7D;</a></li><li>&#x6253;&#x5F00; Chrome &#x6269;&#x5C55;&#x9875;&#x9762;&#xFF1A; chrome://extensions/</li><li>&#x62D6;&#x62FD;&#x4E0B;&#x8F7D;&#x7684;&#x5305;&#x81F3;&#x9875;&#x9762;&#x4E2D;&#x8FDB;&#x884C;&#x5B89;&#x88C5;<br><span class="img-wrap"><img data-src="/img/remote/1460000016502215?w=868&amp;h=820" src="https://static.alili.tech/img/remote/1460000016502215?w=868&amp;h=820" alt="" title="" style="cursor:pointer;display:inline"></span></li><li>&#x51FA;&#x73B0;&#x8BE5;&#x56FE;&#x6807;&#x8868;&#x793A;&#x5B89;&#x88C5;&#x5B8C;&#x6210;<br><span class="img-wrap"><img data-src="/img/remote/1460000016502216?w=736&amp;h=710" src="https://static.alili.tech/img/remote/1460000016502216?w=736&amp;h=710" alt="" title="" style="cursor:pointer;display:inline"></span></li></ol><h2 id="articleHeader5">&#x8BBE;&#x8BA1;&#x4E0E;&#x5B9E;&#x73B0;</h2><p>&#x6D41;&#x7A0B;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016502217" src="https://static.alili.tech/img/remote/1460000016502217" alt="" title="" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader6">PSD &#x6587;&#x4EF6;&#x683C;&#x5F0F;&#x4ECB;&#x7ECD;</h3><p><span class="img-wrap"><img data-src="/img/remote/1460000016502218?w=348&amp;h=325" src="https://static.alili.tech/img/remote/1460000016502218?w=348&amp;h=325" alt="" title="" style="cursor:pointer;display:inline"></span></p><ul><li>File Header&#xFF08;&#x5B9A;&#x957F;&#xFF09; &#x4E3B;&#x8981;&#x5305;&#x62EC;&#x8FD9;&#x4E2A; psd &#x6587;&#x4EF6;&#x6574;&#x4F53;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x5982;&#x7248;&#x672C;&#xFF0C;&#x5C3A;&#x5BF8;&#x5927;&#x5C0F;&#xFF0C;&#x56FE;&#x7247;&#x901A;&#x9053;&#x6570;&#xFF0C;&#x4F7F;&#x7528;&#x7684;&#x989C;&#x8272;&#x7C7B;&#x522B;&#xFF08;rgb&#x3001;cmyk...&#xFF09;</li><li>Color Mode Data Section&#xFF08;&#x53D8;&#x957F;&#xFF09; &#x4E3B;&#x8981;&#x662F;&#x90E8;&#x5206;&#x989C;&#x8272;&#x7C7B;&#x578B;&#x56FE;&#x7247;&#x9700;&#x8981;&#x7528;&#x5230;</li><li>Image Resources&#xFF08;&#x53D8;&#x957F;&#xFF09; &#x653E;&#x7F6E;&#x4E00;&#x4E9B;&#x5916;&#x90E8;&#x7684;&#x56FE;&#x7247;&#x8D44;&#x6E90;</li><li>Layer and Mask&#xFF08;&#x53D8;&#x957F;&#xFF09; &#x653E;&#x7F6E;&#x56FE;&#x5C42;&#x548C;&#x8499;&#x5C42;&#x7684;&#x5404;&#x79CD;&#x4FE1;&#x606F;&#xFF0C;&#x5927;&#x5C0F;&#x4F4D;&#x7F6E;&#xFF0C;&#x5B57;&#x4F53;&#xFF0C;&#x63CF;&#x8FB9;&#x7B49;&#x7B49;</li><li>Image Data&#xFF08;&#x53D8;&#x957F;&#xFF09; &#x653E;&#x7F6E;&#x56FE;&#x50CF;&#x50CF;&#x7D20;&#x6570;&#x636E;</li></ul><h3 id="articleHeader7">PSD.js</h3><p>&#x4F7F;&#x7528; psd.js &#x4FBF;&#x662F;&#x89E3;&#x6790;&#x4E0A;&#x8FF0;&#x6587;&#x4EF6;&#x7ED3;&#x6784;&#xFF0C;&#x5F97;&#x5230;&#x53EF;&#x8BFB;&#x7684;&#x6570;&#x636E;&#x7ED3;&#x6784;&#x3002;<br>&#x5176;&#x4E2D; psd.js &#x4F7F;&#x7528; getter &#x5F97;&#x5230;&#x61D2;&#x89E3;&#x6790;&#x6570;&#x636E;&#xFF0C;&#x5373;&#x5982;&#x4E0B;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj = Object.defineProperty({}, &apos;someParsedVal&apos;, {
  get: function () {
    if (!this._someParsedVal) {
      const afterMs = Date.now() + 3000
      while (true) {
        if (Date.now() &gt;= afterMs) {
          this._someParsedVal = &apos;ok&apos;
          break
        }
      }
    }
    return this._someParsedVal
  }
})

obj.someParsedVal // 3s &#x540E;&#x51FA;&#x6765;
obj.someParsedVal // &#x5F88;&#x5FEB;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code class="javascipt"><span class="hljs-keyword">const</span> obj = <span class="hljs-built_in">Object</span>.defineProperty({}, <span class="hljs-string">&apos;someParsedVal&apos;</span>, {
  <span class="hljs-attr">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>._someParsedVal) {
      <span class="hljs-keyword">const</span> afterMs = <span class="hljs-built_in">Date</span>.now() + <span class="hljs-number">3000</span>
      <span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Date</span>.now() &gt;= afterMs) {
          <span class="hljs-keyword">this</span>._someParsedVal = <span class="hljs-string">&apos;ok&apos;</span>
          <span class="hljs-keyword">break</span>
        }
      }
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._someParsedVal
  }
})

obj.someParsedVal <span class="hljs-comment">// 3s &#x540E;&#x51FA;&#x6765;</span>
obj.someParsedVal <span class="hljs-comment">// &#x5F88;&#x5FEB;</span></code></pre><p>&#x5728; mobx3 &#x4E2D;&#x4E5F;&#x6709;&#x7C7B;&#x4F3C;&#x7684;&#x8BBE;&#x8BA1;&#xFF08;LazyInitializer&#xFF09;</p><h3 id="articleHeader8">psd-html</h3><p>&#x5C06; PSD &#x89E3;&#x6790;&#x4E3A; <a href="#">HAST</a>&#xFF0C;&#x8FDB;&#x800C;&#x8F6C;&#x6362;&#x4E3A; HTML</p><h4>HAST (HTML &#x62BD;&#x8C61;&#x8BED;&#x6CD5;&#x6811;)</h4><p>&#x5982;&#x4E0B; html&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;a href=&quot;http://alpha.com&quot; class=&quot;bravo&quot; download&gt;&lt;/a&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html" style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;http://alpha.com&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;bravo&quot;</span> <span class="hljs-attr">download</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre><p>&#x5BF9;&#x5E94; HAST &#x4E3A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;type&quot;: &quot;element&quot;,
  &quot;tagName&quot;: &quot;a&quot;,
  &quot;properties&quot;: {
    &quot;href&quot;: &quot;http://alpha.com&quot;,
    &quot;id&quot;: &quot;bravo&quot;,
    &quot;className&quot;: [&quot;bravo&quot;],
    &quot;download&quot;: true
  },
  &quot;children&quot;: []
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">&quot;type&quot;</span>: <span class="hljs-string">&quot;element&quot;</span>,
  <span class="hljs-attr">&quot;tagName&quot;</span>: <span class="hljs-string">&quot;a&quot;</span>,
  <span class="hljs-attr">&quot;properties&quot;</span>: {
    <span class="hljs-attr">&quot;href&quot;</span>: <span class="hljs-string">&quot;http://alpha.com&quot;</span>,
    <span class="hljs-attr">&quot;id&quot;</span>: <span class="hljs-string">&quot;bravo&quot;</span>,
    <span class="hljs-attr">&quot;className&quot;</span>: [<span class="hljs-string">&quot;bravo&quot;</span>],
    <span class="hljs-attr">&quot;download&quot;</span>: <span class="hljs-literal">true</span>
  },
  <span class="hljs-attr">&quot;children&quot;</span>: []
}</code></pre><h4>&#x524D;&#x540E;&#x7AEF;&#x540C;&#x6784;</h4><p>&#x524D;&#x540E;&#x7AEF;&#x540C;&#x6784;&#x7684;&#x610F;&#x601D;&#xFF1A;&#x540C;&#x65F6;&#x8FD0;&#x884C;&#x5728;&#x5BA2;&#x6237;&#x7AEF;&#x548C;&#x670D;&#x52A1;&#x7AEF;&#xFF0C;&#x5177;&#x4F53;&#x4FBF;&#x662F;&#x540C;&#x65F6;&#x6267;&#x884C;&#x5728;&#x6D4F;&#x89C8;&#x5668;&#x73AF;&#x5883;&#x548C; nodejs &#x73AF;&#x5883;</p><p>&#x5B9E;&#x73B0;&#x524D;&#x540E;&#x7AEF;&#x540C;&#x6784;&#x7684;&#x4E00;&#x4E9B;&#x5E38;&#x7528;&#x65B9;&#x5F0F;&#xFF0C;&#x501F;&#x52A9;&#x6784;&#x5EFA;&#x5DE5;&#x5177; browserify / rollup / webpack &#x6765;&#x5206;&#x522B;&#x6253;&#x5305;&#x4E0D;&#x540C;&#x73AF;&#x5883;&#x7684; js</p><h5>&#x6A21;&#x62DF;&#x73AF;&#x5883;</h5><ul><li>&#x5728; nodejs &#x73AF;&#x5883;&#xFF0C;&#x5BF9;&#x4E8E; <a href="https://www.w3schools.com/nodejs/ref_modules.asp" rel="nofollow noreferrer" target="_blank">nodejs built-in modules</a> &#x4E0D;&#x8FDB;&#x884C;&#x6253;&#x5305;</li><li>&#x5728; browser &#x73AF;&#x5883;&#xFF0C;&#x5219;&#x5C06;&#x9884;&#x8BBE;&#x7684; built-in modules &#x6253;&#x5305;&#x8FDB;&#x53BB;&#xFF0C;&#x4EE5;&#x53CA;&#x4E00;&#x4E9B; global &#x53D8;&#x91CF;&#xFF08;&#x5982; <code>process.env / __dirname</code>&#xFF09;&#x4E5F;&#x4F1A;&#x8FDB;&#x884C; mock</li></ul><h5>&#x5229;&#x7528; &#x53D8;&#x91CF;&#x66FF;&#x6362; + treeshake &#x533A;&#x5206;&#x4E0D;&#x540C;&#x73AF;&#x5883;&#x7684;&#x4EE3;&#x7801;</h5><ul><li><p>&#x5982; webpack &#x914D;&#x7F6E; <code>DefinePlugin</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  plugins: [
    new webpack.DefinePlugin({
      &apos;process.env.RUN_ENV&apos;: JSON.stringify(&apos;browser&apos;)
    })
  ]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code>{
  <span class="hljs-attribute">plugins</span>: [
    new webpack.<span class="hljs-built_in">DefinePlugin</span>({
      <span class="hljs-string">&apos;process.env.RUN_ENV&apos;</span>: JSON.stringify(<span class="hljs-string">&apos;browser&apos;</span>)
    })
  ]
}</code></pre></li><li><p>&#x5728;&#x4EE3;&#x7801;&#x4E2D;&#x5BF9;&#x4E0D;&#x540C;&#x73AF;&#x5883;&#x6253;&#x5305;&#x8FDB;&#x884C;&#x533A;&#x5206;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports =
  process.env.RUN_ENV === &apos;browser&apos;
    ? {
        psdToHtml,
        psdToHtmlFromBuffer,
        psdToHtmlFromURL,
        psdToHAST,
        psdToHASTFromBuffer
      }
    : {
        psdToHtml,
        psdToHtmlFromPath,
        psdToHtmlFromBuffer,
        psdToHAST,
        psdToHASTFromBuffer,
        psdToHASTFromPath
      }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports =
  process.env.RUN_ENV === <span class="hljs-string">&apos;browser&apos;</span>
    ? {
        psdToHtml,
        psdToHtmlFromBuffer,
        psdToHtmlFromURL,
        psdToHAST,
        psdToHASTFromBuffer
      }
    : {
        psdToHtml,
        psdToHtmlFromPath,
        psdToHtmlFromBuffer,
        psdToHAST,
        psdToHASTFromBuffer,
        psdToHASTFromPath
      }</code></pre></li><li>&#x6700;&#x7EC8;&#x6253;&#x5305;&#x51FA;&#x6765;&#x7684; js &#x5219;&#x4F1A;&#x5254;&#x9664;&#x6389; <code>psdToHASTFromPath</code> &#x76F8;&#x5173;&#x4EE3;&#x7801;</li></ul><h5><code>package.json</code> &#x914D;&#x7F6E;</h5><p>&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;main&quot;: &quot;dist/psd-html.cjs.js&quot;,
  &quot;browser&quot;: &quot;dist/psd-html.browser.cjs.js&quot;,
  &quot;cdn&quot;: &quot;dist/psd-html.browser.umd.min.js&quot;,
  &quot;unpkg&quot;: &quot;dist/psd-html.browser.umd.min.js&quot;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">&quot;main&quot;</span>: <span class="hljs-string">&quot;dist/psd-html.cjs.js&quot;</span>,
  <span class="hljs-attr">&quot;browser&quot;</span>: <span class="hljs-string">&quot;dist/psd-html.browser.cjs.js&quot;</span>,
  <span class="hljs-attr">&quot;cdn&quot;</span>: <span class="hljs-string">&quot;dist/psd-html.browser.umd.min.js&quot;</span>,
  <span class="hljs-attr">&quot;unpkg&quot;</span>: <span class="hljs-string">&quot;dist/psd-html.browser.umd.min.js&quot;</span>
}</code></pre><ul><li><code>main</code>: nodejs &#x73AF;&#x5883;&#x52A0;&#x8F7D;&#x7684; js</li><li><code>browser</code>: browser &#x73AF;&#x5883;&#x52A0;&#x8F7D;&#x7684; js</li><li><code>cdn</code>: &#x90E8;&#x5206; cdn &#x670D;&#x52A1;&#x52A0;&#x8F7D;&#x7684; js</li><li><code>unpkg</code>: unpkg cdn &#x670D;&#x52A1;&#x52A0;&#x8F7D;&#x7684; js &#xFF08;&#x4E3B;&#x8981;&#x4F7F;&#x7528; UMD &#x89C4;&#x8303;&#x6253;&#x5305;&#xFF09;</li></ul><p>&#x76F4;&#x63A5;&#x8BBF;&#x95EE; <a href="https://unpkg.com/@moyuyc/psd-html" rel="nofollow noreferrer" target="_blank">https://unpkg.com/@moyuyc/psd...</a> &#x5219;&#x4F1A;&#x91CD;&#x5B9A;&#x5411;&#x81F3; <a href="https://unpkg.com/@moyuyc/psd-html@" rel="nofollow noreferrer" target="_blank">https://unpkg.com/@moyuyc/psd...</a>{latest-version}/dist/psd-html.browser.umd.min.js</p><h3 id="articleHeader9">html-measure &#x4EA4;&#x4E92;</h3><h4>&#x5E03;&#x5C40;&#x5B9A;&#x4F4D;</h4><p><span class="img-wrap"><img data-src="/img/remote/1460000016502219?w=844&amp;h=516" src="https://static.alili.tech/img/remote/1460000016502219?w=844&amp;h=516" alt="" title="" style="cursor:pointer"></span></p><p>&#x5C06; psd &#x5BFC;&#x51FA;&#x6210;&#x6574;&#x4E2A;&#x56FE;&#x7247;&#xFF0C;&#x5229;&#x7528;&#x6BCF;&#x4E00;&#x4E2A;&#x56FE;&#x5C42;&#x7684;&#x5B9A;&#x4F4D;&#x548C;&#x5927;&#x5C0F;&#x6765;&#x81EA;&#x52A8;&#x6807;&#x6CE8;&#x3002;</p><h4>&#x5176;&#x4ED6;</h4><p>2 &#x4E2A; div&#xFF0C;&#x76F8;&#x5BF9;&#x4E0E;&#x540C;&#x4E00;&#x4E2A;&#x7236;&#x7EA7;&#x7684;&#x7EDD;&#x5BF9;&#x5B9A;&#x4F4D;&#xFF0C;&#x5982;&#x4F55;&#x5224;&#x65AD;&#x4ED6;&#x4EEC;&#x662F;&#x5426;&#x76F8;&#x4EA4;&#xFF1F;</p><p>.<br>.<br>.<br>.<br>.<br>.<br>.<br>.<br>.<br>.</p><p>&#x6B63;&#x9762;&#x76F4;&#x63A5;&#x5224;&#x65AD;&#x662F;&#x5F88;&#x8D39;&#x529B;&#x7684;&#xFF0C;&#x8981;&#x8003;&#x8651;&#x5404;&#x79CD;&#x60C5;&#x51B5;&#xFF0C;&#x8FD9;&#x65F6;&#x5019;&#x9700;&#x8981;&#x9006;&#x5411;&#x601D;&#x7EF4;&#xFF0C;&#x8003;&#x8651;&#x4E0D;&#x76F8;&#x4EA4;&#x7684;&#x60C5;&#x51B5;&#x3002;<br>&#x8FD9;&#x65F6;&#x5019;&#x5C31;&#x7B80;&#x5355;&#x4E86;</p><p>&#x4E0D;&#x76F8;&#x4EA4;&#x53EA;&#x8981;&#x6EE1;&#x8DB3;&#x4E0B;&#x9762;&#x56DB;&#x79CD;&#x60C5;&#x51B5;&#x4E4B;&#x4E00;&#x5C31;&#x53EF;&#x4EE5;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016502220?w=720&amp;h=491" src="https://static.alili.tech/img/remote/1460000016502220?w=720&amp;h=491" alt="" title="" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/remote/1460000016502221?w=720&amp;h=495" src="https://static.alili.tech/img/remote/1460000016502221?w=720&amp;h=495" alt="" title="" style="cursor:pointer;display:inline"></span></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isIntersect(node1, node2) {
  const rect1 = node1.getBoundingClientRect()
  const rect2 = node2.getBoundingClientRect()
  return !(
    rect1.right &lt; rect2.left ||
    rect1.left &gt; rect2.right ||
    rect1.bottom &lt; rect2.top ||
    rect1.top &gt; rect2.bottom
  )
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coq"><code>function isIntersect(node1, node2) {
  const rect1 = node1.getBoundingClientRect()
  const rect2 = node2.getBoundingClientRect()
  <span class="hljs-keyword">return</span> !(
    rect1.<span class="hljs-built_in">right</span> &lt; rect2.<span class="hljs-built_in">left</span> |<span class="hljs-type">|
    rect1</span>.<span class="hljs-built_in">left</span> &gt; rect2.<span class="hljs-built_in">right</span> |<span class="hljs-type">|
    rect1</span>.<span class="hljs-built_in">bottom</span> &lt; rect2.<span class="hljs-built_in">top</span> |<span class="hljs-type">|
    rect1</span>.<span class="hljs-built_in">top</span> &gt; rect2.<span class="hljs-built_in">bottom</span>
  )
}</code></pre><h3 id="articleHeader10">measure-export(-cli)</h3><p>&#x8F93;&#x5165; psd / html &#x5BFC;&#x51FA; <code>meas-ui</code> &#x9759;&#x6001;&#x8D44;&#x6E90;&#xFF0C;&#x6D41;&#x7A0B;&#x5982;&#x56FE;&#xFF08;&#x533A;&#x5206; prod &#x548C; dev &#x73AF;&#x5883;&#xFF09;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000016502222" src="https://static.alili.tech/img/remote/1460000016502222" alt="" title="" style="cursor:pointer"></span>.svg)</p><h2 id="articleHeader11">Todo</h2><ul><li>[ ] &#x63D0;&#x4F9B; chrome &#x63D2;&#x4EF6;&#xFF1A;&#x5F53;&#x6D4F;&#x89C8;&#x5668;&#x6253;&#x5F00; psd &#x65F6;&#x5019;&#xFF0C;&#x6E32;&#x67D3;&#x6D4B;&#x91CF;&#x5C3A;&#x5BF8; UI</li></ul><h2 id="articleHeader12">&#x76F8;&#x5173;&#x9879;&#x76EE;</h2><ul><li><a href="https://github.com/imcuttle/psd.js" rel="nofollow noreferrer" target="_blank">@moyuyc/psd.js</a> - &#x89E3;&#x6790; psd &#x6587;&#x4EF6;&#xFF0C;&#x683C;&#x5F0F;&#x5316; (Forked from <a href="https://github.com/meltingice/psd.js" rel="nofollow noreferrer" target="_blank">psd.js</a>)</li><li><a href="https://github.com/imcuttle/measure/tree/master/packages/psd-html" rel="nofollow noreferrer" target="_blank">@moyuyc/psd-html</a> - psd -&gt; hast -&gt; html</li><li><a href="https://github.com/imcuttle/measure/tree/master/packages/html-measure" rel="nofollow noreferrer" target="_blank">html-measure</a> - &#x6807;&#x6CE8;&#x4EA4;&#x4E92;</li><li><a href="https://github.com/imcuttle/measure/tree/master/packages/meas-ui" rel="nofollow noreferrer" target="_blank">meas-ui</a> - &#x524D;&#x7AEF; UI &#x5C55;&#x793A;&#xFF0C;&#x5305;&#x542B;&#x6807;&#x6CE8;&#x4EA4;&#x4E92;</li><li><a href="https://github.com/imcuttle/measure/tree/master/packages/measure-export-cli" rel="nofollow noreferrer" target="_blank">measure-export(-cli)</a> - &#x8F93;&#x5165; psd / html &#x5BFC;&#x51FA; <code>meas-ui</code> &#x9759;&#x6001;&#x8D44;&#x6E90;</li></ul><h2 id="articleHeader13">&#x53C2;&#x8003;&#x8D44;&#x6599;</h2><ul><li><a href="https://www.adobe.com/devnet-apps/photoshop/fileformatashtml" rel="nofollow noreferrer" target="_blank">Adobe Photoshop File Formats Specification</a> PS &#x6587;&#x4EF6;&#x683C;&#x5F0F;&#x5B98;&#x65B9;&#x6807;&#x51C6;</li><li><a href="https://www.tonton-pixel.com/Photoshop%20Additional%20File%20Formats/styles-file-format.html#toc-parsing-styles-files" rel="nofollow noreferrer" target="_blank">Photoshop Styles File Format</a></li><li><a href="https://zhuanlan.zhihu.com/p/29704064" rel="nofollow noreferrer" target="_blank">JS. &#x5982;&#x4F55;&#x5224;&#x65AD;&#x4E24;&#x4E2A;&#x77E9;&#x5F62;&#x662F;&#x5426;&#x76F8;&#x4EA4;</a></li><li><a href="https://github.com/syntax-tree/hast" rel="nofollow noreferrer" target="_blank">HAST</a></li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
告别庞大 PSD，轻松测量尺寸

## 原文链接
[https://segmentfault.com/a/1190000016502209](https://segmentfault.com/a/1190000016502209)

