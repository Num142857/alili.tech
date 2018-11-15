---
title: 顶级测试框架Jest指南：跑通一个完美的程序，就是教出一群像样的学生
reprint: true
categories: reprint
abbrlink: c37e3434
date: 2018-11-10 02:30:09
---

{{% raw %}}
<blockquote>facebook&#x4E09;&#x5927;&#x9879;&#x76EE;&#xFF1A;yarn jest metro&#xFF0C;&#x6709;&#x6A2A;&#x626B;&#x5B87;&#x5B99;&#x4E4B;&#x52BF;&#x3002; &#x800C;jest&#x9879;&#x76EE;&#x7684;&#x5B97;&#x65E8;&#x4E3A;&#xFF1A;&#x51CF;&#x5C11;&#x6D4B;&#x8BD5;&#x4E00;&#x4E2A;&#x9879;&#x76EE;&#x6240;&#x82B1;&#x8D39;&#x7684;&#x65F6;&#x95F4;&#x6210;&#x672C;&#x548C;&#x8BA4;&#x77E5;&#x6210;&#x672C;&#x3002; &#x2014;&#x2014;&#x5176;&#x5B9E;&#xFF0C;&#x5B83;&#x5728;&#x8BA9;&#x4F60;&#x5F53;&#x4E00;&#x4E2A;&#x597D;&#x8001;&#x5E08;&#x3002;<p>jest&#x6587;&#x6863;&#x975E;&#x5E38;&#x7B80;&#x7565;&#x3001;&#x96BE;&#x4EE5;&#x9605;&#x8BFB;&#xFF0C; &#x56E0;&#x6B64;&#x624D;&#x6709;&#x4E86;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x3002; jest&#x662F;vue&#x3001;react&#x548C;vue-cli&#x6280;&#x672F;&#x6808;&#x7684;&#x91CD;&#x8981;&#x4E00;&#x73AF;&#xFF0C;&#x4E5F;&#x662F;&#x5F53;&#x524D;&#x6700;&#x503C;&#x5F97;&#x638C;&#x63E1;&#x7684;&#x6D4B;&#x8BD5;&#x6846;&#x67B6;&#xFF0C;&#x5BF9;&#x6B64;&#x4F60;&#x9700;&#x8981;&#x8FBE;&#x5230;&#x5F88;&#x719F;&#x6089;&#x7684;&#x7A0B;&#x5EA6;&#x3002;<br>&#x672C;&#x6587;github&#x5730;&#x5740;&#xFF1A; <a href="https://github.com/wanthering/teach-jest" rel="nofollow noreferrer" target="_blank">https://github.com/wanthering...</a></p></blockquote><p>&#x6559;&#x80B2;&#x548C;&#x6D4B;&#x8BD5;&#xFF0C;&#x662F;&#x76F8;&#x901A;&#x7684;&#x3002;</p><p>&#x4F60;&#x53EF;&#x4EE5;&#x91CE;&#x8DEF;&#x5B50;&#x81EA;&#x5B66;&#xFF0C;&#x4F46;&#x638C;&#x63E1;&#x7CFB;&#x7EDF;&#x5316;&#x3001;&#x4F53;&#x7CFB;&#x5316;&#x7684;&#x77E5;&#x8BC6;&#xFF0C;&#x7EC8;&#x5F52;&#x79BB;&#x4E0D;&#x5F00;&#x4E00;&#x4E2A;&#x597D;&#x8001;&#x5E08;&#x3002;</p><p>&#x6D4B;&#x8BD5;&#x53EF;&#x4EE5;&#x4E0D;&#x5199;&#xFF0C;&#x4F46;&#x5F53;&#x4F60;&#x9762;&#x5BF9;&#x5927;&#x578B;&#x590D;&#x6742;&#x7684;&#x9879;&#x76EE;&#x4E4B;&#x65F6;&#xFF0C;&#x6CA1;&#x6709;&#x6D4B;&#x8BD5;&#x6846;&#x67B6;&#x5BF8;&#x6B65;&#x96BE;&#x884C;&#x3002;</p><p>&#x73B0;&#x5728;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x8DDF;&#x6211;&#x4E00;&#x6B65;&#x4E00;&#x6B65;&#x5B66;&#x4F1A;jest&#xFF0C;&#x4F60;&#x5C06;&#x61C2;&#x5F97;&#xFF1A;&#x4E3A;&#x4EC0;&#x4E48;jest&#x662F;&#x4F18;&#x96C5;&#x3001;&#x7B80;&#x6D01;&#x800C;&#x7B26;&#x5408;&#x4EBA;&#x6027;&#x7684;&#xFF0C;&#x5E76;&#x4E14;&#x7EC8;&#x5C06;&#x6210;&#x4E3A;&#x6D4B;&#x8BD5;&#x754C;&#x7684;&#x552F;&#x4E00;&#x7684;&#x3001;&#x6700;&#x4F73;&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x6848;&#x3002;</p><h2 id="articleHeader0">&#x7B2C;&#x4E00;&#x8BFE;&#xFF1A;jest&#x7684;&#x521D;&#x6B65;&#x4F7F;&#x7528;</h2><p>&#x60F3;&#x8C61;&#x4E00;&#x4E0B;&#xFF0C;&#x5F53;&#x4F60;&#x8D70;&#x4E0A;&#x8BB2;&#x53F0;&#xFF0C;&#x4E94;&#x5341;&#x591A;&#x4E2A;&#x5B69;&#x5B50;&#x9759;&#x9759;&#x5730;&#x770B;&#x7740;&#x4F60;&#x3002;&#x7EA2;&#x6251;&#x6251;&#x7684;&#x8138;&#x86CB;&#xFF0C;&#x5927;&#x5927;&#x7684;&#x773C;&#x775B;&#x3002;</p><p><span class="img-wrap"><img data-src="http://img.hb.aicdn.com/1714cca480f9e56df70df1f1c4b0ba2d3c3b31081c611f-r96W4a_fw658" src="https://static.alili.techhttp://img.hb.aicdn.com/1714cca480f9e56df70df1f1c4b0ba2d3c3b31081c611f-r96W4a_fw658" alt="image" title="image" style="cursor:pointer;display:inline"></span></p><p>&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x4F60;&#x5C06;&#x8BFE;&#x672C;&#x4E0A;&#x77E5;&#x8BC6;&#x6559;&#x7ED9;&#x4ED6;&#x4EEC;&#x4E86;&#x4E00;&#x904D;&#xFF0C;</p><p>&#x51FD;&#x6570;&#x8FD0;&#x884C;&#x8FC7;&#x7A0B;&#xFF0C;&#x5C31;&#x76F8;&#x5F53;&#x4E8E;&#x4F60;&#x7684;&#x6559;&#x5B66;&#x8FC7;&#x7A0B;&#x3002;</p><p>&#x8BF7;&#x540C;&#x5B66;&#x4EEC;&#x8DDF;&#x6211;&#x4E00;&#x8D77;&#x6572;&#x4E0B;&#x4EE3;&#x7801;&#xFF1A;</p><p>(&#x8BF7;&#x5728;&#x9879;&#x76EE;&#x4E0B;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#xFF1A;<code>lesson1.js</code>)</p><p><strong>lesson1.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * &#x52A0;&#x6CD5;&#xFF0C;&#x5373;&#x662F;&#x5C06;&#x591A;&#x4E2A;&#x6570;&#x503C;&#x9010;&#x4E2A;&#x7D2F;&#x52A0;
 */
exports.sum = (...args) =&gt; {
  let res = 0
  for (let i of args) {
    res += i
  }
  return res
}

/**
 * &#x4E58;&#x6CD5;&#xFF0C;&#x5373;&#x662F;&#x5C06;b&#x4E2A;&#x91CD;&#x590D;&#x7684;&#x6570;&#x503C;a&#xFF0C;&#x8FDB;&#x884C;&#x7D2F;&#x52A0;
 */
exports.times = (a, b) =&gt; {
  let resArr = (new Array(b)).fill(a)
  return exports.sum(...resArr)
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">/**
 * &#x52A0;&#x6CD5;&#xFF0C;&#x5373;&#x662F;&#x5C06;&#x591A;&#x4E2A;&#x6570;&#x503C;&#x9010;&#x4E2A;&#x7D2F;&#x52A0;
 */</span>
exports.sum = <span class="hljs-function">(<span class="hljs-params">...args</span>) =&gt;</span> {
  <span class="hljs-keyword">let</span> res = <span class="hljs-number">0</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i <span class="hljs-keyword">of</span> args) {
    res += i
  }
  <span class="hljs-keyword">return</span> res
}

<span class="hljs-comment">/**
 * &#x4E58;&#x6CD5;&#xFF0C;&#x5373;&#x662F;&#x5C06;b&#x4E2A;&#x91CD;&#x590D;&#x7684;&#x6570;&#x503C;a&#xFF0C;&#x8FDB;&#x884C;&#x7D2F;&#x52A0;
 */</span>
exports.times = <span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> {
  <span class="hljs-keyword">let</span> resArr = (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(b)).fill(a)
  <span class="hljs-keyword">return</span> exports.sum(...resArr)
}
</code></pre><blockquote>&#x4EE5;&#x4E0A;&#x6587;&#x4EF6;&#x6D89;&#x53CA;es6&#x548C;nodejs&#x6A21;&#x5757;&#x5316;&#x7684;&#x57FA;&#x7840;&#x77E5;&#x8BC6;&#xFF0C;&#x521D;&#x770B;&#x53EF;&#x80FD;&#x5E76;&#x4E0D;&#x597D;&#x7406;&#x89E3;&#xFF0C;&#x4F46;&#x76F8;&#x4FE1;&#x6211;&#xFF0C;&#x4F60;&#x6572;&#x5B8C;&#x4EE5;&#x4E0B;&#x7684;&#x6D4B;&#x8BD5;&#x4EE3;&#x7801;&#xFF0C;&#x5C31;&#x4F1A;&#x7406;&#x89E3;&#x5B83;&#x7684;&#x542B;&#x4E49;&#x2014;&#x2014;&#x5C31;&#x50CF;&#x6559;&#x4F1A;&#x4E00;&#x4E2A;&#x5B66;&#x751F;&#x4E00;&#x6837;&#x3002;</blockquote><p>&#x5C31;&#x50CF;&#x4F60;js&#x5DE5;&#x7A0B;&#x5E08;&#x9762;&#x4E34;&#x7684;&#x6C38;&#x6052;&#x96BE;&#x9898;&#x4E00;&#x6837;&#x2014;&#x2014;&#x771F;&#x7684;&#x80FD;&#x8DD1;&#x901A;&#x5417;&#xFF1F;</p><p>&#x5F53;&#x8001;&#x5E08;&#x7684;&#x4F60;&#xFF0C;&#x5185;&#x5FC3;&#x4E5F;&#x65E0;&#x6BD4;&#x60F6;&#x6050;&#xFF0C;&#x7B2C;&#x4E00;&#x6B21;&#x6559;&#x8FD9;&#x4E9B;&#xFF0C;&#x4ED6;&#x4EEC;&#x771F;&#x7684;&#x80FD;&#x61C2;&#x5417;&#xFF1F;</p><p>&#x8FD9;&#x65F6;&#x9700;&#x8981;&#x7528;&#x4E0A;jest&#x8FDB;&#x884C;&#x6D4B;&#x8BD5;&#xFF0C;&#x4F7F;&#x7528;npm&#x5B89;&#x88C5;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i jest -S" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-selector-tag">i</span> jest -S</code></pre><p><strong>&#x4E00;&#x4E2A;&#x5408;&#x683C;&#x7684;&#x8001;&#x5E08;&#xFF0C;&#x4F1A;&#x505A;&#x8FD9;&#x51E0;&#x4E2A;&#x6B65;&#x9AA4;&#xFF1A;</strong></p><ol><li>&#x63D0;&#x95EE;&#xFF1A; &#x6E05;&#x6670;&#x5730;&#x6CE8;&#x660E;&#x95EE;&#x9898;.</li><li>&#x53EB;&#x4EBA;&#x56DE;&#x7B54;&#xFF1A; &#x7ED9;&#x4E88;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x4F53;&#xFF0C;&#x8FD0;&#x884C;&#x6D4B;&#x8BD5;&#x3002;</li><li>&#x671F;&#x5F85;&#x7B54;&#x6848;&#xFF1A; expect()</li><li>&#x6821;&#x9A8C;&#x7B54;&#x6848;&#xFF1A; toBe()&#x3001;toEqual()</li></ol><p>&#x521B;&#x5EFA;&#x4E00;&#x4E2A;<code>lesson1.test.js</code></p><p><strong>lesson1.test.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const {sum, times} = require(&apos;./lesson1&apos;)

test(&apos;&#x540C;&#x5B66;&#xFF0C;&#x8BF7;&#x95EE;&#x8FD9;&#x4E2A;&#x7D2F;&#x52A0;&#x7684;&#x7ED3;&#x679C;&#x662F;&#x4EC0;&#x4E48;&#xFF1F;&apos;,()=&gt;{
  expect(sum(2+2+2+2+2+2)).toBe(12)
})

test(&apos;&#x540C;&#x5B66;&#xFF0C;&#x8BF7;&#x95EE;&#x8FD9;&#x4E2A;&#x4E58;&#x6CD5;&#x7684;&#x7ED3;&#x679C;&#x662F;&#x4EC0;&#x4E48;&#xFF1F;&apos;,()=&gt;{
  expect(times(2,6)).toBe(12)
})

test(&apos;&#x90A3;&#x4E48;&#xFF0C;&#x4E24;&#x4E2A;&#x6570;&#x503C;&#x7684;&#x7ED3;&#x679C;&#x662F;&#x5426;&#x76F8;&#x7B49;&#x5462;&#xFF1F;&apos;,()=&gt;{
  expect(times(2,6)).toEqual(sum(2+2+2+2+2+2))
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lsl"><code>const {sum, times} = require(&apos;./lesson1&apos;)

test(&apos;&#x540C;&#x5B66;&#xFF0C;&#x8BF7;&#x95EE;&#x8FD9;&#x4E2A;&#x7D2F;&#x52A0;&#x7684;&#x7ED3;&#x679C;&#x662F;&#x4EC0;&#x4E48;&#xFF1F;&apos;,()=&gt;{
  expect(sum(<span class="hljs-number">2</span>+<span class="hljs-number">2</span>+<span class="hljs-number">2</span>+<span class="hljs-number">2</span>+<span class="hljs-number">2</span>+<span class="hljs-number">2</span>)).toBe(<span class="hljs-number">12</span>)
})

test(&apos;&#x540C;&#x5B66;&#xFF0C;&#x8BF7;&#x95EE;&#x8FD9;&#x4E2A;&#x4E58;&#x6CD5;&#x7684;&#x7ED3;&#x679C;&#x662F;&#x4EC0;&#x4E48;&#xFF1F;&apos;,()=&gt;{
  expect(times(<span class="hljs-number">2</span>,<span class="hljs-number">6</span>)).toBe(<span class="hljs-number">12</span>)
})

test(&apos;&#x90A3;&#x4E48;&#xFF0C;&#x4E24;&#x4E2A;&#x6570;&#x503C;&#x7684;&#x7ED3;&#x679C;&#x662F;&#x5426;&#x76F8;&#x7B49;&#x5462;&#xFF1F;&apos;,()=&gt;{
  expect(times(<span class="hljs-number">2</span>,<span class="hljs-number">6</span>)).toEqual(sum(<span class="hljs-number">2</span>+<span class="hljs-number">2</span>+<span class="hljs-number">2</span>+<span class="hljs-number">2</span>+<span class="hljs-number">2</span>+<span class="hljs-number">2</span>))
})</code></pre><h4>&#x8FD0;&#x884C;&#x6D4B;&#x8BD5;&#x65B9;&#x6CD5;1&#xFF1A;</h4><p>&#x8FD9;&#x65F6;&#x9700;&#x8981;&#x8FD0;&#x884C;jest&#x547D;&#x4EE4;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x5168;&#x5C40;&#x5B89;&#x88C5;jest:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i jest -g" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-selector-tag">i</span> jest -g</code></pre><p>&#x7136;&#x540E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="jest lesson1.test.js " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code style="word-break:break-word;white-space:initial">jest lesson1<span class="hljs-selector-class">.test</span><span class="hljs-selector-class">.js</span> </code></pre><h4>&#x8FD0;&#x884C;&#x6D4B;&#x8BD5;&#x65B9;&#x6CD5;2&#xFF1A;</h4><p>&#x4E5F;&#x53EF;&#x4EE5;&#x5728;<code>package json&#x7684;test&#x5B57;&#x6BB5;&#x4E0B;&#x5199;&#x5165;</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  ...
  &quot;scripts&quot;: {
    &quot;test&quot;: &quot;jest&quot;
  },
  ..." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code>  ...
  <span class="hljs-string">&quot;scripts&quot;</span>: {
    <span class="hljs-string">&quot;test&quot;</span>: <span class="hljs-string">&quot;jest&quot;</span>
  },
  ...</code></pre><p>&#x7136;&#x540E;&#x547D;&#x4EE4;&#x884C;&#x8F93;&#x5165;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm test" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs bash"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-built_in">test</span></code></pre><h4>&#x8FD0;&#x884C;&#x6D4B;&#x8BD5;&#x65B9;&#x6CD5;3&#xFF1A;</h4><p>&#x5982;&#x679C;&#x4F60;&#x4F7F;&#x7528;&#x7684;webstorm&#x7B49;IDE&#x7684;&#x8BDD;&#xFF0C;&#x6587;&#x6863;&#x4E2D;&#x76F4;&#x63A5;&#x663E;&#x793A;&#x7EFF;&#x8272;&#x5C0F;&#x952E;&#x5934;&#xFF0C;&#x70B9;&#x51FB;&#x5C31;&#x662F;&#x4E86;&#x3002;</p><h4>&#x6D4B;&#x8BD5;&#x7ED3;&#x679C;&#xFF1A;</h4><p>&#x63A5;&#x4E0B;&#x6765;&#xFF0C;&#x4F1A;&#x770B;&#x5230;&#x4E00;&#x8DEF;pass&#xFF0C;&#x8BC1;&#x660E;lesson1.js&#x6587;&#x4EF6;&#x65E0;&#x8BEF;&#x3002;</p><p>&#x6211;&#x4EEC;&#x8BFB;&#x4E66;&#x8FD9;&#x4E48;&#x591A;&#x5E74;&#xFF0C;&#x6DF1;&#x77E5;&#x597D;&#x8001;&#x5E08;&#x548C;&#x574F;&#x8001;&#x5E08;&#x7684;&#x533A;&#x522B;&#xFF1A;</p><p>&#x4E0A;&#x8BFE;&#x7167;&#x672C;&#x5BA3;&#x79D1;&#xFF0C;&#x5C31;&#x50CF;&#x76F4;&#x63A5;&#x5199;&#x4E0B;&#x6EE1;&#x7EB8;js&#x4EE3;&#x7801;&#x4E00;&#x6837;&#xFF0C;&#x8FD9;&#x662F;&#x8D56;&#x76AE;&#x72D7;&#x8001;&#x5E08;&#x7684;&#x4E13;&#x957F;&#x3002;</p><p>&#x4F46;&#x4E00;&#x4E2A;&#x4F18;&#x79C0;&#x7684;&#x8001;&#x5E08;&#xFF0C;&#x4ED6;&#x4F1A;&#xFF1A;</p><ul><li>&#x6B65;&#x6B65;&#x4E3A;&#x8425;&#xFF1A; &#x5206;&#x89E3;&#x6210;&#x5F88;&#x591A;&#x4E2A;&#x5B50;&#x6D4B;&#x8BD5;&#xFF0C;&#x628A;&#x77E5;&#x8BCD;&#x70B9;&#x9010;&#x4E2A;&#x51FB;&#x7834;&#x3002;</li><li>&#x7248;&#x4E66;&#x6E05;&#x6670;&#xFF1A; &#x6807;&#x660E;&#x9700;&#x8981;&#x6D4B;&#x8BD5;&#x4EC0;&#x4E48;&#xFF0C;&#x8BA9;&#x77E5;&#x8BC6;&#x6613;&#x5B66;&#x6613;&#x8BB0;&#x3002;</li><li>&#x8BFE;&#x5802;&#x4E92;&#x52A8;&#xFF1A; &#x56DE;&#x8C03;&#x51FD;&#x6570;&#x4E2D;&#x8FD0;&#x884C;&#x6D4B;&#x8BD5;&#xFF0C;&#x8C03;&#x52A8;&#x5B69;&#x5B50;&#x4EEC;&#x7684;&#x8BFE;&#x5802;&#x79EF;&#x6781;&#x6027;&#x3002;</li><li>&#x9898;&#x578B;&#x4E30;&#x5BCC;&#xFF1A; &#x901A;&#x8FC7;&#x5339;&#x914D;&#x5668;&#xFF0C;&#x5373;toBe&#x3001;toEqual&#x7B49;&#x6821;&#x9A8C;&#x4E0D;&#x540C;&#x683C;&#x5F0F;&#x6570;&#x636E;&#x3002;</li></ul><p>&#x5982;&#x679C;&#x4F60;&#x4E0D;&#x662F;&#x5F88;&#x719F;&#x6089;jest&#x6846;&#x67B6;&#x63D0;&#x4F9B;&#x7684;&#x5404;&#x7C7B;&#x5339;&#x914D;&#x5668;&#xFF0C;&#x8FD9;&#x91CC;&#x6709;&#x4E00;&#x4EFD;&#x5C0F;&#x6284;&#x9001;&#x7ED9;&#x4F60;&#xFF1A;<a href="https://github.com/sapegin/jest-cheat-sheet" rel="nofollow noreferrer" target="_blank">jest-cheat-sheet</a></p><p>&#x4F60;&#x770B;&#xFF0C;jest&#x6240;&#x505A;&#x7684;&#xFF0C;&#x6CA1;&#x6709;&#x4E00;&#x4E1D;&#x591A;&#x4F59;&#x6B65;&#x9AA4;&#xFF0C;&#x4E5F;&#x6CA1;&#x5C11;&#x4E00;&#x4E2A;&#x5FC5;&#x8981;&#x6B65;&#x9AA4;&#xFF0C;&#x8FD9;&#x6B63;&#x662F;&#x6211;&#x4EEC;&#x8FD9;&#x4E9B;&#x5E74;&#x9047;&#x5230;&#x7684;&#x597D;&#x8001;&#x5E08;&#x7684;&#x5171;&#x6709;&#x7279;&#x5F81;&#xFF0C;&#x4E5F;&#x6B63;&#x662F;jest&#x6D4B;&#x8BD5;&#x7684;&#x6781;&#x81F4;&#x4E4B;&#x5904;&#x3002;</p><h2 id="articleHeader1">&#x7B2C;&#x4E8C;&#x8BFE;&#xFF1A;&#x5F02;&#x6B65;&#x6D4B;&#x8BD5;&#x83B7;&#x53D6;&#x6570;&#x636E;</h2><p>jest&#x5728;&#x5F02;&#x6B65;&#x8FC7;&#x7A0B;&#x4E2D;&#x4E5F;&#x975E;&#x5E38;&#x65B9;&#x4FBF;&#xFF01;</p><p>&#x6211;&#x4EEC;&#x5148;&#x4F7F;&#x7528;<code>json-server</code>&#x5EFA;&#x7ACB;&#x670D;&#x52A1;&#x5668;&#xFF0C;&#x518D;&#x4F7F;&#x7528;<code>axios</code>&#x83B7;&#x53D6;&#x6570;&#x636E;&#x3002;</p><p>&#x8FD9;&#x4E24;&#x4E2A;npm&#x5305;&#x4F7F;&#x7528;&#x975E;&#x5E38;&#x5E7F;&#x6CDB;&#xFF0C;&#x719F;&#x6089;&#x7684;axios&#x5C01;&#x88C5;&#x7684;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x62F7;&#x8D1D;<code>server.js</code>&#x548C;<code>request.js</code>&#x4EE3;&#x7801;&#x3002;</p><p>&#x4E0B;&#x8F7D;:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i json-server axios -S" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-selector-tag">i</span> json-server axios -S</code></pre><p>&#x521B;&#x5EFA;server.js&#x6587;&#x4EF6;</p><p><strong>server.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const jsonServer = require(&apos;json-server&apos;)

const defaultData = () =&gt; ({
  &apos;lesson&apos;: [
    { &apos;id&apos;: 1, &apos;title&apos;: &apos;how to add&apos;, &apos;teacher&apos;: &apos;Miss Wang&apos; },
    { &apos;id&apos;: 2, &apos;title&apos;: &apos;how to multiply&apos;, &apos;teacher&apos;: &apos;Mr Liu&apos; },
    { &apos;id&apos;: 3, &apos;title&apos;: &apos;how to subtract&apos;, &apos;teacher&apos;: &apos;Ms Han&apos; }
  ],
  &apos;homework&apos;: [
    { &apos;id&apos;: 1, &apos;works&apos;: [&apos;add&apos;,&apos;multiply&apos;], &apos;student&apos;: &apos;Jim Green&apos; },
    { &apos;id&apos;: 2, &apos;title&apos;: [&apos;add&apos;,&apos;subtract&apos;], &apos;student&apos;: &apos;lily&apos; },
    { &apos;id&apos;: 3, &apos;title&apos;: [&apos;add&apos;,&apos;subtract&apos;], &apos;student&apos;: &apos;lucy&apos; },
    { &apos;id&apos;: 4, &apos;title&apos;: [&apos;add&apos;,&apos;subtract&apos;,&apos;multiply&apos;], &apos;student&apos;: &apos;Han Mei Mei&apos; },
    { &apos;id&apos;: 5, &apos;title&apos;: [&apos;subtract&apos;,&apos;multiply&apos;], &apos;student&apos;: &apos;Li Lei&apos; }
  ],
  &apos;exam&apos;: { &apos;name&apos;: &apos;primary school final exam&apos; }
})

const createJSONServer = (data = defaultData()) =&gt;{
  const server = jsonServer.create()
  const router = jsonServer.router(data)
  const middlewares = jsonServer.defaults()

  server.use(middlewares)
  server.use(router)
  return server
}

createJSONServer().listen(3000)
console.log(&apos;3000&#x7AEF;&#x53E3;&#x5DF2;&#x8054;&#x901A;&apos;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> jsonServer = <span class="hljs-built_in">require</span>(<span class="hljs-string">&apos;json-server&apos;</span>)

<span class="hljs-keyword">const</span> defaultData = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ({
  <span class="hljs-string">&apos;lesson&apos;</span>: [
    { <span class="hljs-string">&apos;id&apos;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&apos;title&apos;</span>: <span class="hljs-string">&apos;how to add&apos;</span>, <span class="hljs-string">&apos;teacher&apos;</span>: <span class="hljs-string">&apos;Miss Wang&apos;</span> },
    { <span class="hljs-string">&apos;id&apos;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&apos;title&apos;</span>: <span class="hljs-string">&apos;how to multiply&apos;</span>, <span class="hljs-string">&apos;teacher&apos;</span>: <span class="hljs-string">&apos;Mr Liu&apos;</span> },
    { <span class="hljs-string">&apos;id&apos;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&apos;title&apos;</span>: <span class="hljs-string">&apos;how to subtract&apos;</span>, <span class="hljs-string">&apos;teacher&apos;</span>: <span class="hljs-string">&apos;Ms Han&apos;</span> }
  ],
  <span class="hljs-string">&apos;homework&apos;</span>: [
    { <span class="hljs-string">&apos;id&apos;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&apos;works&apos;</span>: [<span class="hljs-string">&apos;add&apos;</span>,<span class="hljs-string">&apos;multiply&apos;</span>], <span class="hljs-string">&apos;student&apos;</span>: <span class="hljs-string">&apos;Jim Green&apos;</span> },
    { <span class="hljs-string">&apos;id&apos;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&apos;title&apos;</span>: [<span class="hljs-string">&apos;add&apos;</span>,<span class="hljs-string">&apos;subtract&apos;</span>], <span class="hljs-string">&apos;student&apos;</span>: <span class="hljs-string">&apos;lily&apos;</span> },
    { <span class="hljs-string">&apos;id&apos;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&apos;title&apos;</span>: [<span class="hljs-string">&apos;add&apos;</span>,<span class="hljs-string">&apos;subtract&apos;</span>], <span class="hljs-string">&apos;student&apos;</span>: <span class="hljs-string">&apos;lucy&apos;</span> },
    { <span class="hljs-string">&apos;id&apos;</span>: <span class="hljs-number">4</span>, <span class="hljs-string">&apos;title&apos;</span>: [<span class="hljs-string">&apos;add&apos;</span>,<span class="hljs-string">&apos;subtract&apos;</span>,<span class="hljs-string">&apos;multiply&apos;</span>], <span class="hljs-string">&apos;student&apos;</span>: <span class="hljs-string">&apos;Han Mei Mei&apos;</span> },
    { <span class="hljs-string">&apos;id&apos;</span>: <span class="hljs-number">5</span>, <span class="hljs-string">&apos;title&apos;</span>: [<span class="hljs-string">&apos;subtract&apos;</span>,<span class="hljs-string">&apos;multiply&apos;</span>], <span class="hljs-string">&apos;student&apos;</span>: <span class="hljs-string">&apos;Li Lei&apos;</span> }
  ],
  <span class="hljs-string">&apos;exam&apos;</span>: { <span class="hljs-string">&apos;name&apos;</span>: <span class="hljs-string">&apos;primary school final exam&apos;</span> }
})

<span class="hljs-keyword">const</span> createJSONServer = <span class="hljs-function">(<span class="hljs-params">data = defaultData(<span class="hljs-params"></span>)</span>) =&gt;</span>{
  <span class="hljs-keyword">const</span> server = jsonServer.create()
  <span class="hljs-keyword">const</span> router = jsonServer.router(data)
  <span class="hljs-keyword">const</span> middlewares = jsonServer.defaults()

  server.use(middlewares)
  server.use(router)
  <span class="hljs-keyword">return</span> server
}

createJSONServer().listen(<span class="hljs-number">3000</span>)
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;3000&#x7AEF;&#x53E3;&#x5DF2;&#x8054;&#x901A;&apos;</span>)</code></pre><p>&#x521B;&#x5EFA;request.js&#x6587;&#x4EF6;</p><p><strong>request.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const axios = require( &apos;axios&apos; )

class HttpRequest {
  constructor(baseUrl = &apos;http://localhost:3000&apos;) {
    this.baseUrl = baseUrl
  }

  /**
   * &#x8FD4;&#x56DE;&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;
   */
  getInsideConfig() {
    return {
      baseURL: this.baseUrl,
      headers: {}
    }
  }

  /**
   * &#x54CD;&#x5E94;&#x680F;&#x622A;&#xFF0C;&#x8FD4;&#x56DE;&#x6307;&#x5B9A;&#x683C;&#x5F0F;&#x4FE1;&#x606F;
   */
  interceptors(instance) {
    instance.interceptors.response.use(res =&gt; {
      const {data} = res
      return data
    }, error =&gt; {
      return Promise.reject(error)
    })
  }

  /**
   * &#x5904;&#x7406;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;
   */
  request(options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance)
    return instance(options)
  }
}


/**
 * &#x5BFC;&#x51FA;request&#x6A21;&#x5757;
 */
exports.requestPromise =  (port,method=&apos;get&apos;)=&gt;{
  const Http = new HttpRequest(&apos;http://localhost:3000&apos;)
  return Http.request({
    url: port,
    method
  })
}

exports.requestCallback = (cb,port,method=&apos;get&apos;)=&gt;{
  const Http = new HttpRequest(&apos;http://localhost:3000&apos;)
  Http.request({
    url: port,
    method
  }).then(data=&gt;{
    
    // &#x25BD;&#x8BF7;&#x6CE8;&#x91CA;&#x6389;&#x4E0B;&#x9762;&#x4E00;&#x884C;&#xFF0C;&#x518D;&#x8BD5;&#x4E00;&#x8BD5;&#x56DE;&#x8C03;&#x80FD;&#x5426;&#x8DD1;&#x901A;&#xFF1F;
    cb(data)
  })
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> axios = <span class="hljs-built_in">require</span>( <span class="hljs-string">&apos;axios&apos;</span> )

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HttpRequest</span> </span>{
  <span class="hljs-keyword">constructor</span>(baseUrl = &apos;http://localhost:3000&apos;) {
    <span class="hljs-keyword">this</span>.baseUrl = baseUrl
  }

  <span class="hljs-comment">/**
   * &#x8FD4;&#x56DE;&#x9ED8;&#x8BA4;&#x914D;&#x7F6E;
   */</span>
  getInsideConfig() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">baseURL</span>: <span class="hljs-keyword">this</span>.baseUrl,
      <span class="hljs-attr">headers</span>: {}
    }
  }

  <span class="hljs-comment">/**
   * &#x54CD;&#x5E94;&#x680F;&#x622A;&#xFF0C;&#x8FD4;&#x56DE;&#x6307;&#x5B9A;&#x683C;&#x5F0F;&#x4FE1;&#x606F;
   */</span>
  interceptors(instance) {
    instance.interceptors.response.use(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
      <span class="hljs-keyword">const</span> {data} = res
      <span class="hljs-keyword">return</span> data
    }, error =&gt; {
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error)
    })
  }

  <span class="hljs-comment">/**
   * &#x5904;&#x7406;&#x7F51;&#x7EDC;&#x8BF7;&#x6C42;
   */</span>
  request(options) {
    <span class="hljs-keyword">const</span> instance = axios.create()
    options = <span class="hljs-built_in">Object</span>.assign(<span class="hljs-keyword">this</span>.getInsideConfig(), options)
    <span class="hljs-keyword">this</span>.interceptors(instance)
    <span class="hljs-keyword">return</span> instance(options)
  }
}


<span class="hljs-comment">/**
 * &#x5BFC;&#x51FA;request&#x6A21;&#x5757;
 */</span>
exports.requestPromise =  <span class="hljs-function">(<span class="hljs-params">port,method=<span class="hljs-string">&apos;get&apos;</span></span>)=&gt;</span>{
  <span class="hljs-keyword">const</span> Http = <span class="hljs-keyword">new</span> HttpRequest(<span class="hljs-string">&apos;http://localhost:3000&apos;</span>)
  <span class="hljs-keyword">return</span> Http.request({
    <span class="hljs-attr">url</span>: port,
    method
  })
}

exports.requestCallback = <span class="hljs-function">(<span class="hljs-params">cb,port,method=<span class="hljs-string">&apos;get&apos;</span></span>)=&gt;</span>{
  <span class="hljs-keyword">const</span> Http = <span class="hljs-keyword">new</span> HttpRequest(<span class="hljs-string">&apos;http://localhost:3000&apos;</span>)
  Http.request({
    <span class="hljs-attr">url</span>: port,
    method
  }).then(<span class="hljs-function"><span class="hljs-params">data</span>=&gt;</span>{
    
    <span class="hljs-comment">// &#x25BD;&#x8BF7;&#x6CE8;&#x91CA;&#x6389;&#x4E0B;&#x9762;&#x4E00;&#x884C;&#xFF0C;&#x518D;&#x8BD5;&#x4E00;&#x8BD5;&#x56DE;&#x8C03;&#x80FD;&#x5426;&#x8DD1;&#x901A;&#xFF1F;</span>
    cb(data)
  })
}</code></pre><p>&#x4F7F;&#x7528;<code>node server</code>&#x8DD1;&#x8D77;&#x670D;&#x52A1;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x5F00;&#x59CB;&#x6D4B;&#x8BD5;&#x5F02;&#x6B65;&#x56DE;&#x8C03;&#x4E86;&#x3002;</p><h3 id="articleHeader2">&#x8001;&#x5E08;&#x7684;&#x56F0;&#x6270;&#xFF1A; &#x574F;&#x5B66;&#x751F;&#x201C;&#x5F02;&#x6B65;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x201D;</h3><p>&#x73ED;&#x4E0A;&#x6765;&#x4E86;&#x4E00;&#x4E2A;&#x574F;&#x5B66;&#x751F;&#xFF0C;&#x4E0A;&#x8BFE;&#x4ECE;&#x4E0D;&#x597D;&#x597D;&#x542C;&#x8BFE;&#xFF0C;&#x504F;&#x504F;&#x4EBA;&#x7F18;&#x53C8;&#x7279;&#x522B;&#x597D;&#x3002;</p><p>&#x8FD9;&#x65F6;&#xFF0C;&#x4F60;&#x63D0;&#x95EE;&#x8BA9;&#x574F;&#x5B66;&#x751F;&#x56DE;&#x7B54;&#xFF0C;&#x4ED6;&#x53EA;&#x662F;&#x5B89;&#x9759;&#x5730;&#x7AD9;&#x8D77;&#x6765;&#xFF0C;&#x4EC0;&#x4E48;&#x90FD;&#x4E0D;&#x505A;&#xFF0C;&#x7136;&#x540E;&#x8FC7;&#x4E86;&#x4E00;&#x4F1A;&#x5BF9;&#x4F60;&#x8BF4;&#xFF1A;&#x201C;&#x8001;&#x5E08;&#xFF0C;&#x8FD9;&#x9053;&#x9898;&#x6211;&#x56DE;&#x7B54;&#x8FC7;&#x4E86;&#x554A;&#xFF01;&#x201D;</p><p>&#x540C;&#x65F6;&#xFF0C;&#x5168;&#x73ED;&#x540C;&#x5B66;&#x90FD;&#x70B9;&#x5934;&#x201C;&#x55EF;&#x55EF;&#x4ED6;&#x56DE;&#x7B54;&#x8FC7;&#x4E86;&#x201D;&#x3002;</p><p>&#x8FD9;&#x65F6;&#x5019;&#xFF0C;&#x4F60;&#xFF0C;&#x8BE5;&#x600E;&#x4E48;&#x529E;&#xFF1F; &#x6709;&#x6CA1;&#x6709;&#x611F;&#x53D7;&#x5230;&#x6DF1;&#x6DF1;&#x7684;&#x7EDD;&#x671B;&#xFF1F;</p><p>&#x770B;&#x4E00;&#x770B;&#x4EE5;&#x4E0B;&#x7684;&#x4F8B;&#x5B50;&#x3002;&#x521B;&#x5EFA;lesson2.test.js&#xFF0C;&#x5E76;&#x5199;&#x5165;</p><p><strong>lesson2.test.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const {requestPromise, requestCallback} = require(&apos;./request&apos;)

test(&apos;&#x5F02;&#x6B65;callback&#x65B9;&#x5F0F;&#x68C0;&#x6D4B;&apos;, () =&gt; {
  // &#x4E0B;&#x9762;&#x8FDB;&#x884C;&#x4E86;&#x629B;&#x51FA;&#x4E86;&#x4E24;&#x6B21;&#x65AD;&#x8A00;&#xFF0C;&#x5728;&#x65AD;&#x8A00;&#x4E4B;&#x524D;&#x53EF;&#x4EE5;
  function callback (data){
    expect(data).toStrictEqual({&apos;id&apos;: 1, &apos;title&apos;: &apos;how to add&apos;, &apos;teacher&apos;: &apos;Miss Wang&apos;})
  }

  requestCallback(callback,&apos;lesson/1&apos;)
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs php"><code><span class="hljs-keyword">const</span> {requestPromise, requestCallback} = <span class="hljs-keyword">require</span>(<span class="hljs-string">&apos;./request&apos;</span>)

test(<span class="hljs-string">&apos;&#x5F02;&#x6B65;callback&#x65B9;&#x5F0F;&#x68C0;&#x6D4B;&apos;</span>, () =&gt; {
  <span class="hljs-comment">// &#x4E0B;&#x9762;&#x8FDB;&#x884C;&#x4E86;&#x629B;&#x51FA;&#x4E86;&#x4E24;&#x6B21;&#x65AD;&#x8A00;&#xFF0C;&#x5728;&#x65AD;&#x8A00;&#x4E4B;&#x524D;&#x53EF;&#x4EE5;</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">callback</span> <span class="hljs-params">(data)</span></span>{
    expect(data).toStrictEqual({<span class="hljs-string">&apos;id&apos;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&apos;title&apos;</span>: <span class="hljs-string">&apos;how to add&apos;</span>, <span class="hljs-string">&apos;teacher&apos;</span>: <span class="hljs-string">&apos;Miss Wang&apos;</span>})
  }

  requestCallback(callback,<span class="hljs-string">&apos;lesson/1&apos;</span>)
})</code></pre><p>&#x8DD1;&#x901A;&#x4E86;&#xFF0C;&#x4F3C;&#x4E4E;&#x4E00;&#x5207;&#x6B63;&#x5E38;&#x3002;&#x3002;&#x3002;</p><p>&#x4F46;&#x5F53;&#x6211;&#x4EEC;&#x56DE;&#x5230;<code>request.js</code>&#x6CE8;&#x91CA;&#x6389;<code>cb(data)</code>&#x65F6;&#xFF0C;&#x6211;&#x4EEC;&#x77E5;&#x9053;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x5E76;&#x4E0D;&#x8FD4;&#x56DE;&#x6570;&#x636E;&#xFF0C;&#x6D4B;&#x8BD5;&#x7406;&#x5E94;&#x4E0D;&#x901A;&#x8FC7;&#x3002;&#x7136;&#x800C;&#x3002;&#x3002;</p><p>&#x8FD8;&#x662F;&#x8DD1;&#x901A;&#x4E86;&#xFF01;</p><p>&#x8FD9;&#x662F;&#x56E0;&#x4E3A;requestCallback&#x6839;&#x672C;&#x5C31;&#x6CA1;&#x6709;&#x8FDB;&#x5165;&#x51FD;&#x6570;&#x4F53;&#xFF0C;&#x800C;&#x6D4B;&#x8BD5;&#x51FD;&#x6570;&#xFF0C;&#x53EA;&#x8981;&#x4E0D;&#x62A5;&#x9519;&#xFF0C;&#x90FD;&#x7B97;&#x901A;&#x8FC7;&#x3002;</p><p>&#x5F02;&#x6B65;&#x56DE;&#x8C03;&#xFF0C;&#x5C31;&#x662F;&#x8FD9;&#x6837;&#x4E00;&#x4E2A;&#x574F;&#x900F;&#x4E86;&#x7684;&#x5B66;&#x751F;&#xFF0C;&#x7ECF;&#x5E38;&#x88C5;&#x4F5C;&#x56DE;&#x7B54;&#x8FC7;&#x4E86;&#x8499;&#x6DF7;&#x8FC7;&#x5173;&#x3002;</p><h3 id="articleHeader3">&#x5F02;&#x6B65;&#x56DE;&#x8C03;&#x7684;&#x6B63;&#x786E;&#x6D4B;&#x8BD5;&#x65B9;&#x6CD5;&#xFF1A;</h3><p>&#x4F5C;&#x4E3A;&#x8001;&#x5E08;&#xFF0C;&#x5F04;&#x6B7B;&#x574F;&#x5B66;&#x751F;&#x7684;&#x65B9;&#x6CD5;&#x53EF;&#x80FD;&#x4F60;&#x81EA;&#x5DF1;&#x60F3;&#x5230;&#x4E86;&#xFF1A;</p><p>&#x201C;&#x4E0A;&#x9ED1;&#x677F;&#x5199;&#xFF0C;&#x5199;&#x5B8C;&#x544A;&#x8BC9;&#x6211;&#xFF01;&#x201D;</p><p>&#x4F60;&#x53EF;&#x4EE5;&#x63D0;&#x4F9B;&#x4E00;&#x4E2A;&#x5728;&#x6D4B;&#x8BD5;&#x51FD;&#x6570;&#x5185;&#x63D0;&#x4F9B;&#x4E00;&#x4E2A;done&#xFF0C;done&#x5FC5;&#x987B;&#x8981;&#x8C03;&#x7528;&#x540E;&#xFF0C;&#x624D;&#x80FD;&#x7B97;&#x505A;&#x6D4B;&#x8BD5;&#x901A;&#x8FC7;&#x3002;</p><p><strong>lesson2.test.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="test(&apos;&#x5F02;&#x6B65;callback&#x65B9;&#x5F0F;&#x68C0;&#x6D4B;&apos;, done =&gt; {
  // &#x4E0B;&#x9762;&#x8FDB;&#x884C;&#x4E86;&#x629B;&#x51FA;&#x4E86;&#x4E24;&#x6B21;&#x65AD;&#x8A00;&#xFF0C;&#x5728;&#x65AD;&#x8A00;&#x4E4B;&#x524D;&#x53EF;&#x4EE5;
  function callback (data){
    expect(data).toStrictEqual({&apos;id&apos;: 1, &apos;title&apos;: &apos;how to add&apos;, &apos;teacher&apos;: &apos;Miss Wang&apos;})
    done()
  }

  requestCallback(callback,&apos;lesson/1&apos;)
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lisp"><code>test(&apos;&#x5F02;&#x6B65;callback&#x65B9;&#x5F0F;&#x68C0;&#x6D4B;&apos;, done =&gt; {
  // &#x4E0B;&#x9762;&#x8FDB;&#x884C;&#x4E86;&#x629B;&#x51FA;&#x4E86;&#x4E24;&#x6B21;&#x65AD;&#x8A00;&#xFF0C;&#x5728;&#x65AD;&#x8A00;&#x4E4B;&#x524D;&#x53EF;&#x4EE5;
  function callback (<span class="hljs-name">data</span>){
    expect(<span class="hljs-name">data</span>).toStrictEqual({&apos;id&apos;: <span class="hljs-number">1</span>, &apos;title&apos;: &apos;how to add&apos;, &apos;teacher&apos;: &apos;Miss Wang&apos;})
    done()
  }

  requestCallback(<span class="hljs-name">callback</span>,&apos;lesson/1&apos;)
})</code></pre><p>&#x8FD9;&#x6837;&#xFF0C;&#x5C31;&#x5FC5;&#x987B;&#x8981;&#x8FD0;&#x884C;&#x4E86;callback&#x624D;&#x80FD;&#x901A;&#x8FC7;&#x6D4B;&#x8BD5;&#x4E86;&#xFF0C;&#x5426;&#x5219;&#x5C31;&#x4F1A;&#x8D85;&#x65F6;&#x62A5;&#x9519;&#x3002;</p><p>&#x9664;&#x4E86;&#x4EE5;&#x4E0A;&#x65B9;&#x5F0F;&#x4EE5;&#x5916;&#xFF0C;&#x4F60;&#x8FD8;&#x53EF;&#x4EE5;&#x68C0;&#x9A8C;&#x51FD;&#x6570;&#x4F53;&#x5185;&#x7684;&#x65AD;&#x8A00;&#x8DD1;&#x4E86;&#x51E0;&#x6B21;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="test(&apos;&#x5F02;&#x6B65;callback&#x65B9;&#x5F0F;&#x68C0;&#x6D4B;,&#x65E0;done&apos;, () =&gt; {
  // &#x4E0B;&#x9762;&#x8FDB;&#x884C;&#x4E86;&#x629B;&#x51FA;&#x4E86;&#x4E24;&#x6B21;&#x65AD;&#x8A00;&#xFF0C;&#x5728;&#x65AD;&#x8A00;&#x4E4B;&#x524D;&#x53EF;&#x4EE5;
  expect.assertions(1);
  function callback (data){
    expect(data).toStrictEqual({&apos;id&apos;: 1, &apos;title&apos;: &apos;how to add&apos;, &apos;teacher&apos;: &apos;Miss Wang&apos;})
  }

  requestCallback(callback,&apos;lesson/1&apos;)
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lisp"><code>test(&apos;&#x5F02;&#x6B65;callback&#x65B9;&#x5F0F;&#x68C0;&#x6D4B;,&#x65E0;done&apos;, () =&gt; {
  // &#x4E0B;&#x9762;&#x8FDB;&#x884C;&#x4E86;&#x629B;&#x51FA;&#x4E86;&#x4E24;&#x6B21;&#x65AD;&#x8A00;&#xFF0C;&#x5728;&#x65AD;&#x8A00;&#x4E4B;&#x524D;&#x53EF;&#x4EE5;
  expect.assertions(<span class="hljs-number">1</span>)<span class="hljs-comment">;</span>
  function callback (<span class="hljs-name">data</span>){
    expect(<span class="hljs-name">data</span>).toStrictEqual({&apos;id&apos;: <span class="hljs-number">1</span>, &apos;title&apos;: &apos;how to add&apos;, &apos;teacher&apos;: &apos;Miss Wang&apos;})
  }

  requestCallback(<span class="hljs-name">callback</span>,&apos;lesson/1&apos;)
})</code></pre><p><code>expect.assertions(1)</code>&#x8868;&#x793A;&#xFF0C; &#x65AD;&#x8A00;&#x8BED;&#x53E5;<code>expect(xxx).toXXX(xxx)</code>&#x5FC5;&#x987B;&#x8DD1;&#x901A;&#x4E00;&#x6B21;&#xFF0C;&#x5C06;&#x8981;&#x68C0;&#x9A8C;&#x591A;&#x4E2A;&#x201C;&#x574F;&#x5B66;&#x751F;&#x201D;&#x5F02;&#x6B65;&#x56DE;&#x8C03;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x8FD9;&#x62DB;&#x72B9;&#x5176;&#x6709;&#x6548;&#x3002;</p><h3 id="articleHeader4">&#x666E;&#x901A;&#x5B66;&#x751F;&#xFF1A;&#x5F02;&#x6B65;Promise</h3><p>&#x6709;&#x574F;&#x5B66;&#x751F;&#xFF0C;&#x81EA;&#x7136;&#x6709;&#x597D;&#x5B66;&#x548C;&#x666E;&#x901A;&#x5B66;&#x751F;&#xFF0C;promise&#x5C31;&#x662F;&#x4E00;&#x540D;&#x201C;&#x666E;&#x901A;&#x7684;&#x5B66;&#x751F;&#x201D;</p><p><strong>lesson2.test.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="test(&apos;&#x5F02;&#x6B65;Promise&#x65B9;&#x5F0F;&#x68C0;&#x6D4B;&apos;, () =&gt; {
  expect.assertions(1);
  return requestPromise(&apos;exam&apos;).then(data =&gt; {
    expect(data).toStrictEqual({&apos;name&apos;: &apos;primary school final exam&apos;})
  })
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lisp"><code>test(&apos;&#x5F02;&#x6B65;Promise&#x65B9;&#x5F0F;&#x68C0;&#x6D4B;&apos;, () =&gt; {
  expect.assertions(<span class="hljs-number">1</span>)<span class="hljs-comment">;</span>
  return requestPromise(&apos;exam&apos;).then(<span class="hljs-name">data</span> =&gt; {
    expect(<span class="hljs-name">data</span>).toStrictEqual({&apos;name&apos;: &apos;primary school final exam&apos;})
  })
})</code></pre><p>&#x68C0;&#x9A8C;&#x5F02;&#x6B65;Promise&#x65F6;&#xFF0C;&#x5FC5;&#x987B;&#x8981;&#x7528;<code>return</code>&#x8FD4;&#x56DE;&#xFF0C;&#x5426;&#x5219;&#x5B83;&#x5C31;&#x50CF;&#x201C;&#x574F;&#x5B66;&#x751F;&#x201D;&#x4E00;&#x6837;&#xFF0C;&#x76F4;&#x63A5;&#x8499;&#x6DF7;&#x8FC7;&#x5173;&#x6E9C;&#x8D70;&#x4E86;&#x3002;</p><p>&#x4F60;&#x8FD8;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x4F7F;&#x7528;.resolve/.reject&#x5F62;&#x5F0F;</p><p><strong>lesson2.test.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="test(&apos;&#x5F02;&#x6B65;Promise&#x65B9;&#x5F0F;&#x88AB;&#x6210;&#x529F;resolve&apos;, () =&gt; {
  expect.assertions(1);
  return expect(requestPromise(&apos;exam&apos;)).resolves.toStrictEqual({&apos;name&apos;: &apos;primary school final exam&apos;})
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lisp"><code>test(&apos;&#x5F02;&#x6B65;Promise&#x65B9;&#x5F0F;&#x88AB;&#x6210;&#x529F;resolve&apos;, () =&gt; {
  expect.assertions(<span class="hljs-number">1</span>)<span class="hljs-comment">;</span>
  return expect(<span class="hljs-name">requestPromise</span>(&apos;exam&apos;)).resolves.toStrictEqual({&apos;name&apos;: &apos;primary school final exam&apos;})
})<span class="hljs-comment">;</span></code></pre><p>&#x5982;&#x679C;&#x9700;&#x8981;&#x68C0;&#x9A8C;Promise&#x88AB;reject:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="test(&apos;&#x5F02;&#x6B65;Promise&#x65B9;&#x5F0F;&#x88AB;reject&apos;, () =&gt; {
  expect.assertions(1);
  return expect(requestPromise(&apos;exam&apos;)).rejects.toMatch(&apos;error&apos;)
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lisp"><code>test(&apos;&#x5F02;&#x6B65;Promise&#x65B9;&#x5F0F;&#x88AB;reject&apos;, () =&gt; {
  expect.assertions(<span class="hljs-number">1</span>)<span class="hljs-comment">;</span>
  return expect(<span class="hljs-name">requestPromise</span>(&apos;exam&apos;)).rejects.toMatch(&apos;error&apos;)
})<span class="hljs-comment">;</span></code></pre><h3 id="articleHeader5">&#x4E09;&#x597D;&#x5B66;&#x751F;&#xFF1A;async/await&#x5F02;&#x6B65;</h3><p>&#x4E0A;&#x8BFE;&#x4ECE;&#x4E0D;&#x8FDF;&#x5230;&#x3001;&#x6821;&#x670D;&#x6C38;&#x8FDC;&#x4E00;&#x5C18;&#x4E0D;&#x67D3;&#x3001;&#x4F5C;&#x4E1A;&#x6309;&#x65F6;&#x6C38;&#x8FDC;&#x4E0A;&#x4EA4;&#x3001;&#x4E0A;&#x8BFE;&#x8BA4;&#x771F;&#x505A;&#x7B14;&#x8BB0;&#x3001;&#x56DE;&#x7B54;&#x95EE;&#x9898;&#x5929;&#x8863;&#x65E0;&#x7F1D;&#x3001;&#x522B;&#x4EBA;&#x4E0D;&#x542C;&#x8BFE;&#x5979;&#x8FD8;&#x4F1A;&#x6253;&#xFF01;&#x5C0F;&#xFF01;&#x62A5;&#xFF01;&#x544A;&#xFF01;</p><p>&#x8FD9;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x7684;async/await&#xFF0C;&#x6211;&#x4EEC;&#x5E94;&#x8BE5;&#x591A;&#x4E00;&#x4E9B;&#x8FD9;&#x6837;&#x7684;&#x4E09;&#x597D;&#x5B66;&#x751F;&#x3002;</p><p><strong>lesson2.test.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="test(&apos;&#x5F02;&#x6B65;async/await&#x65B9;&#x5F0F;&#x68C0;&#x6D4B;&apos;, async () =&gt; {
// &#x4E0B;&#x9762;&#x8FDB;&#x884C;&#x4E86;&#x629B;&#x51FA;&#x4E86;&#x4E24;&#x6B21;&#x65AD;&#x8A00;&#xFF0C;&#x5728;&#x65AD;&#x8A00;&#x4E4B;&#x524D;&#x53EF;&#x4EE5;
expect.assertions(2)

const lesson1 = await requestPromise(&apos;lesson/1&apos;)
const homework3 = await requestPromise(&apos;homework/3&apos;)

expect(lesson1).toStrictEqual({&apos;id&apos;: 1, &apos;title&apos;: &apos;how to add&apos;, &apos;teacher&apos;: &apos;Miss Wang&apos;})
expect(homework3).toMatchObject({&apos;student&apos;: &apos;lucy&apos;})
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lisp"><code>test(&apos;&#x5F02;&#x6B65;async/await&#x65B9;&#x5F0F;&#x68C0;&#x6D4B;&apos;, async () =&gt; {
// &#x4E0B;&#x9762;&#x8FDB;&#x884C;&#x4E86;&#x629B;&#x51FA;&#x4E86;&#x4E24;&#x6B21;&#x65AD;&#x8A00;&#xFF0C;&#x5728;&#x65AD;&#x8A00;&#x4E4B;&#x524D;&#x53EF;&#x4EE5;
expect.assertions(<span class="hljs-number">2</span>)

const lesson1 = await requestPromise(&apos;lesson/1&apos;)
const homework3 = await requestPromise(&apos;homework/3&apos;)

expect(<span class="hljs-name">lesson1</span>).toStrictEqual({&apos;id&apos;: <span class="hljs-number">1</span>, &apos;title&apos;: &apos;how to add&apos;, &apos;teacher&apos;: &apos;Miss Wang&apos;})
expect(<span class="hljs-name">homework3</span>).toMatchObject({&apos;student&apos;: &apos;lucy&apos;})
})</code></pre><p><strong>&#x4F18;&#x96C5;&#xFF0C;&#x8212;&#x9002;&#x3001;&#x7B80;&#x6D01;&#x3001;&#x5927;&#x65B9;&#xFF0C;&#x65E0;&#x9700;&#x591A;&#x8A00;&#xFF0C;async/await&#x503C;&#x5F97;&#x4F60;&#x62E5;&#x6709;&#x3002;</strong></p><p>&#x867D;&#x7136;&#x6211;&#x4EEC;&#x5F88;&#x591A;&#x65F6;&#x5019;&#x8FD8;&#x662F;&#x5728;&#x548C;&#x5F02;&#x6B65;&#x56DE;&#x8C03;&#x3001;&#x5F02;&#x6B65;Promise&#x6253;&#x4EA4;&#x9053;...</p><h2 id="articleHeader6">&#x7B2C;&#x4E09;&#x8BFE;&#xFF1A;Mock&#x51FD;&#x6570;&#xFF0C;&#x8896;&#x53E3;&#x4E94;&#x9053;&#x6760;&#x7684;&#x98CE;&#x7EAA;&#x59D4;&#x5458;</h2><p><strong>&#x5047;&#x5982;&#x4E0D;&#x662F;&#x7B80;&#x5355;&#x7684;&#x6D4B;&#x8BD5;&#x540C;&#x6B65;&#x8FD4;&#x56DE;&#x3001;&#x6D4B;&#x8BD5;&#x5F02;&#x6B65;&#x8FD4;&#x56DE;&#xFF0C;&#x800C;&#x662F;&#x9700;&#x8981;&#x8BB0;&#x5F55;&#x6267;&#x884C;&#x8FC7;&#x7A0B;&#x4E2D;&#x7684;&#x72B6;&#x6001;&#x5462;&#xFF1F;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const forEach = (arr, fn) =&gt; {
  if (!arr.length || !fn) return
  let i = -1
  let len = arr.length
  while (++i &lt; len) {
    let item = arr[i]
    fn(item, i, arr)
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> forEach = <span class="hljs-function">(<span class="hljs-params">arr, fn</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (!arr.length || !fn) <span class="hljs-keyword">return</span>
  <span class="hljs-keyword">let</span> i = <span class="hljs-number">-1</span>
  <span class="hljs-keyword">let</span> len = arr.length
  <span class="hljs-keyword">while</span> (++i &lt; len) {
    <span class="hljs-keyword">let</span> item = arr[i]
    fn(item, i, arr)
  }
}</code></pre><p>&#x5047;&#x5982;&#x9047;&#x5230;&#x8FD9;&#x6837;&#x4E00;&#x4E2A;&#x5FAA;&#x73AF;&#x51FD;&#x6570;&#xFF0C;&#x5185;&#x90E8;&#x7684;&#x8FD0;&#x884C;&#x72B6;&#x6001;&#x5C31;&#x4E0D;&#x592A;&#x53EF;&#x80FD;&#x901A;&#x8FC7;&#x8FD4;&#x56DE;&#x503C;&#x6765;&#x77E5;&#x6653;&#x4E86;&#x3002;&#x8FD9;&#x65F6;&#xFF0C;&#x4F60;&#x9700;&#x8981;Mock&#x51FD;&#x6570;&#x3002;</p><h3 id="articleHeader7">Mock&#x51FD;&#x6570;&#xFF0C;&#x968F;&#x65F6;&#x8BB0;&#x5F55;&#x51FD;&#x6570;&#x8FD0;&#x884C;&#x72B6;&#x6001;</h3><p>&#x6D4B;&#x8BD5;&#x540C;&#x6B65;&#x8FD4;&#x56DE;&#x503C;&#x3001;&#x5F02;&#x6B65;&#x8FD4;&#x56DE;&#x503C;&#xFF0C;&#x5C31;&#x50CF;&#x662F;&#x4E0A;&#x8BFE;&#xFF0C;&#x8FD9;&#x53EA;&#x662F;&#x8001;&#x5E08;&#x7684;&#x672C;&#x4EFD;&#x3002;</p><p>&#x800C;&#x5B66;&#x751F;&#x5927;&#x90E8;&#x5206;&#x65F6;&#x95F4;&#xFF0C;&#x90FD;&#x662F;&#x81EA;&#x4E60;&#x3001;&#x5403;&#x996D;&#x3001;&#x5BBF;&#x820D;&#xFF0C;&#x8001;&#x5E08;&#x60F3;&#x7BA1;&#x5230;&#x8FD9;&#x4E00;&#x90E8;&#x5206;&#xFF0C;&#x5C31;&#x9700;&#x8981;&#x6D3E;&#x51FA;&#x8BA9;&#x4EBA;&#x95FB;&#x98CE;&#x4E27;&#x8138;&#x7684;&#x5B58;&#x5728;&#x2014;&#x2014;&#x4E94;&#x9053;&#x6760;&#xB7;&#x65E0;&#x95F4;&#x9053;&#xB7;&#x5C0F;&#x62A5;&#x544A;&#x4E4B;&#x738B;&#xB7;&#x98CE;&#x7EAA;&#x59D4;&#x5458;&#x3002;</p><p>&#x5979;&#x5E73;&#x65F6;&#x6DF7;&#x8FF9;&#x5728;&#x666E;&#x901A;&#x5B66;&#x751F;&#x4E4B;&#x4E2D;&#xFF0C;&#x6216;&#x8005;&#x8BF4;&#xFF0C;&#x5979;&#x5C31;&#x662F;&#x4E00;&#x540D;&#x518D;&#x666E;&#x901A;&#x4E0D;&#x8FC7;&#x7684;&#x5B66;&#x751F;&#x3002;&#x4F46;&#xFF0C;&#x5F53;&#x5979;&#x9047;&#x5230;&#x8001;&#x5E08;&#x2014;&#x2014;&#x5373;&#x5728;test()&#x6D4B;&#x8BD5;&#x4F53;&#x5185;&#x2014;&#x2014;&#x4E00;&#x70B9;&#x513F;&#x9648;&#x829D;&#x9EBB;&#x70C2;&#x8C37;&#x7684;&#x7834;&#x4E8B;&#xFF0C;&#x90FD;&#x4F1A;&#x88AB;&#x6296;&#x9732;&#x51FA;&#x6765;&#x3002;</p><p><strong>lesson3.test.js</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x901A;&#x8FC7;jest.fn()&#x521B;&#x5EFA;Mock Function
const mockCallback = jest.fn(x =&gt; 42 + x);
//&#x5C06;mockCallback&#x4EE3;&#x5165;forEach&#x8FD0;&#x884C;&#x4E00;&#x6B21;&#xFF0C;&#x5373;&#x53EF;&#x8BB0;&#x5F55;&#x4E0B;&#x6240;&#x6709;&#x7684;&#x503C;
forEach([0, 1], mockCallback);

test(&apos;&#x8BB0;&#x5F55;mockCallback&#x51FD;&#x6570;&#x8FD0;&#x884C;&#x8FC7;&#x7A0B;&apos;,()=&gt;{
  // mockCallback&#x4E0A;&#x62A5;&#x51FD;&#x6570;&#x8FD0;&#x884C;&#x4E86;&#x4E24;&#x6B21;
  expect(mockCallback.mock.calls.length).toBe(2);

  // mockCallback&#x4E0A;&#x62A5;&#x51FD;&#x6570;&#x7B2C;&#x4E00;&#x6B21;&#x8FD0;&#x884C;&#x7684;&#x8F93;&#x5165;&#x4E3A;0
  expect(mockCallback.mock.calls[0][0]).toBe(0);

  // mockCallback&#x4E0A;&#x62A5;&#x51FD;&#x6570;&#x7B2C;&#x4E8C;&#x6B21;&#x8FD0;&#x884C;&#x7684;&#x8F93;&#x5165;&#x4E3A;1
  expect(mockCallback.mock.calls[1][0]).toBe(1);

// The return value of the first call to the function was 42
  // mockCallback&#x4E0A;&#x62A5;&#x51FD;&#x6570;&#x7B2C;&#x4E00;&#x6B21;&#x8FD0;&#x884C;&#x7684;&#x7ED3;&#x679C;&#x4E3A;42
  expect(mockCallback.mock.results[0].value).toBe(42);
})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs markdown"><code>//&#x901A;&#x8FC7;jest.fn()&#x521B;&#x5EFA;Mock Function
const mockCallback = jest.fn(x =&gt; 42 + x);
//&#x5C06;mockCallback&#x4EE3;&#x5165;forEach&#x8FD0;&#x884C;&#x4E00;&#x6B21;&#xFF0C;&#x5373;&#x53EF;&#x8BB0;&#x5F55;&#x4E0B;&#x6240;&#x6709;&#x7684;&#x503C;
forEach([0, 1], mockCallback);

test(&apos;&#x8BB0;&#x5F55;mockCallback&#x51FD;&#x6570;&#x8FD0;&#x884C;&#x8FC7;&#x7A0B;&apos;,()=&gt;{
  // mockCallback&#x4E0A;&#x62A5;&#x51FD;&#x6570;&#x8FD0;&#x884C;&#x4E86;&#x4E24;&#x6B21;
  expect(mockCallback.mock.calls.length).toBe(2);

  // mockCallback&#x4E0A;&#x62A5;&#x51FD;&#x6570;&#x7B2C;&#x4E00;&#x6B21;&#x8FD0;&#x884C;&#x7684;&#x8F93;&#x5165;&#x4E3A;0
  expect(mockCallback.mock.calls[<span class="hljs-string">0</span>][<span class="hljs-symbol">0</span>]).toBe(0);

  // mockCallback&#x4E0A;&#x62A5;&#x51FD;&#x6570;&#x7B2C;&#x4E8C;&#x6B21;&#x8FD0;&#x884C;&#x7684;&#x8F93;&#x5165;&#x4E3A;1
  expect(mockCallback.mock.calls[<span class="hljs-string">1</span>][<span class="hljs-symbol">0</span>]).toBe(1);

// The return value of the first call to the function was 42
  // mockCallback&#x4E0A;&#x62A5;&#x51FD;&#x6570;&#x7B2C;&#x4E00;&#x6B21;&#x8FD0;&#x884C;&#x7684;&#x7ED3;&#x679C;&#x4E3A;42
  expect(mockCallback.mock.results[0].value).toBe(42);
})
</code></pre><h2 id="articleHeader8">&#x7ED3;&#x8BED;</h2><p>&#x63D0;&#x8D77;&#x6559;&#x5E08;&#xFF0C;&#x968F;&#x5904;&#x53EF;&#x89C1;&#x7684;&#x670B;&#x53CB;&#x5708;&#x3001;&#x516C;&#x4F17;&#x53F7;&#x3001;&#x8D3A;&#x5361;<br>&#x77ED;&#x4FE1;&#x91CC;&#x9762;&#xFF0C;&#x5C3D;&#x662F;&#x9E21;&#x6C64;&#x822C;&#x7684;&#x53E3;&#x53F7;&#xFF1A;&#x201C;&#x4EBA;&#x7C7B;&#x7075;&#x9B42;&#x5DE5;&#x7A0B;&#x5E08;&#x201D;&#x3001;&#x201C;&#x71C3;&#x70E7;&#x81EA;&#x5DF1;&#xFF0C;&#x7167;&#x4EAE;&#x4ED6;&#x4EBA;&#x201D;&#x201C;&#x65E0;&#x79C1;&#x201D;&#x201C;&#x5949;&#x732E;&#x201D;&#x201C;&#x7231;&#x5FC3;&#x201D;&#x3002;</p><p>&#x4F46;&#xFF0C;&#x6559;&#x5E08;&#x7684;&#x672C;&#x804C;&#x2014;&#x2014;&#x6700;&#x9AD8;&#x6548;&#x7387;&#x5730;&#x8F85;&#x52A9;&#x5B66;&#x751F;&#x6784;&#x5EFA;&#x7684;&#x5B8C;&#x6574;&#x77E5;&#x8BC6;&#x4F53;&#x7CFB;&#x3002; &#x4E13;&#x4E1A;&#x6027;&#x7684;&#x89C2;&#x70B9;&#x5374;&#x88AB;&#x9009;&#x62E9;&#x6027;&#x5FFD;&#x89C6;&#x3002;</p><p>&#x8F6F;&#x4EF6;&#x5F00;&#x53D1;&#x4E5F;&#x662F;&#xFF0C;&#x4EBA;&#x4EBA;&#x5728;&#x8C08;&#x6D4B;&#x8BD5;&#x9A71;&#x52A8;&#xFF0C;&#x4EBA;&#x4EBA;&#x90FD;&#x5728;&#x5F3A;&#x8C03;&#x6D4B;&#x8BD5;&#x7684;&#x91CD;&#x8981;&#x6027;&#xFF0C;&#x6D4B;&#x8BD5;&#x4F3C;&#x4E4E;&#x6210;&#x4E86;&#x4E00;&#x4E2A;&#x5F62;&#x800C;&#x4E0A;&#x5B66;&#x7684;&#x611F;&#x6027;&#x6982;&#x5FF5;&#x3002;</p><p>&#x4F46;&#x65F6;&#x95F4;&#x548C;&#x4EBA;&#x529B;&#x6210;&#x672C;&#x4E0A;&#x3001;&#x6846;&#x67B6;&#x7684;&#x4E13;&#x4E1A;&#x6027;&#x3001;&#x6846;&#x67B6;&#x7684;&#x638C;&#x63E1;&#x6210;&#x672C;&#x7684;&#x8BF8;&#x591A;&#x9650;&#x5236;&#xFF0C;&#x4F7F;&#x5927;&#x591A;&#x6570;&#x9879;&#x76EE;&#x6D4B;&#x8BD5;&#x76F8;&#x5F53;&#x4E8E;&#x65E0;&#x3002;&#x53E6;&#x4E00;&#x65B9;&#x9762;&#xFF0C;&#x5C11;&#x6570;&#x9AD8;&#x5EA6;&#x6D4B;&#x8BD5;&#x8986;&#x76D6;&#x7684;&#x9879;&#x76EE;&#x53C8;&#x663E;&#x5F97;&#x5341;&#x5206;&#x7B28;&#x62D9;&#xFF0C;&#x6D4B;&#x8BD5;&#x8017;&#x8D39;&#x7684;&#x7CBE;&#x529B;&#x5C45;&#x7136;&#x6BD4;coding&#x8FD8;&#x957F;...</p><p>&#x5E78;&#x4E4B;&#xFF0C;&#x5F97;&#x76CA;&#x4E8E;jest&#x6D4B;&#x8BD5;&#x6846;&#x67B6;&#x7684;&#x4EA7;&#x751F;&#xFF0C;&#x4E00;&#x4E2A;&#x6781;&#x81F4;&#x7B80;&#x6D01;<br>&#x529F;&#x80FD;&#x5F3A;&#x5927;&#x3001;&#x8BED;&#x4E49;&#x6E05;&#x6670;&#x7684;&#x6D4B;&#x8BD5;&#x7EC8;&#x4E8E;&#x5448;&#x73B0;&#x5728;&#x6211;&#x4EEC;&#x9762;&#x524D;&#x3002;&#x8BA9;&#x5F00;&#x53D1;&#x4E0E;&#x6D4B;&#x8BD5;&#x76F8;&#x8F85;&#x76F8;&#x6210;&#xFF0C;&#x800C;&#x975E;&#x65F6;&#x95F4;&#x52A0;&#x500D;&#x3002;</p><p>&#x800C;&#x6700;&#x65B0;&#x7684;vue&#x6280;&#x672F;&#x6808;&#x6B63;&#x5728;&#x5168;&#x9762;&#x91C7;&#x7528;jest&#x6D4B;&#x8BD5;&#x6846;&#x67B6;&#x3002;</p><p>&#x4ECE;&#x6B64;&#xFF0C;testing&#x4E4B;&#x5BF9;&#x4E8E;coding&#xFF0C;&#x5982;&#x540C;&#x5B64;&#x72EC;&#x7684;&#x94A2;&#x7434;&#x66F2;&#x4E2D;&#xFF0C;&#x7F13;&#x7F13;&#x4F20;&#x6765;&#x5C0F;&#x63D0;&#x7434;&#x7684;&#x548C;&#x5F26;&#xFF0C;&#x987F;&#x65F6;&#x9526;&#x745F;&#x548C;&#x9E23;&#xFF0C;&#x5FC3;&#x7075;&#x9707;&#x98A4;&#x65E0;&#x4EE5;&#x590D;&#x52A0;&#x3002;</p><p><span class="img-wrap"><img data-src="http://img.hb.aicdn.com/ff15e9d9eecf0be7c24bbcfbffb3cfc54afe4b0e55f50-vqcDwy_fw658" src="https://static.alili.techhttp://img.hb.aicdn.com/ff15e9d9eecf0be7c24bbcfbffb3cfc54afe4b0e55f50-vqcDwy_fw658" alt="image" title="image" style="cursor:pointer"></span></p><blockquote>&#x524D;&#x9762;&#x6211;&#x5DF2;&#x7ECF;&#x4ECB;&#x7ECD;&#x4E86;<a href="https://segmentfault.com/a/1190000016231512">AST&#x62BD;&#x8C61;&#x8BED;&#x6CD5;&#x6811;&#xFF0C;&#x70B9;&#x51FB;&#x94FE;&#x63A5;&#x5730;&#x5740;</a>&#xFF0C;&#x4E0B;&#x4E00;&#x671F;&#xFF0C;&#x5C06;&#x7ED3;&#x5408;AST&#x5E26;&#x6765;&#x6D4B;&#x8BD5;&#x9A71;&#x52A8;&#x5F00;&#x53D1;&#x5B9E;&#x6218;&#xFF0C;&#x8FD9;&#xFF0C;&#x5C06;&#x662F;&#x8BFB;&#x61C2;vue-cli3&#x3001;&#x5E76;&#x638C;&#x63E1;vue&#x5168;&#x65B9;&#x4F4D;&#x6280;&#x672F;&#x6808;&#x7684;&#x7B2C;&#x4E00;&#x6B65;&#x3002;</blockquote><h3 id="articleHeader9">vue-cli3&#x6280;&#x672F;&#x6808;&#x8865;&#x5168;&#x9884;&#x544A;&#xFF1A;</h3><ul><li>[x] <a href="https://segmentfault.com/a/1190000016231512" target="_blank">AST&#x62BD;&#x8C61;&#x8BED;&#x6CD5;&#x6811;&#xFF1A; &#x7AE5;&#x5E74;&#x7684;&#x73A9;&#x5177;</a></li><li>[x] jest&#x6D4B;&#x8BD5;&#x6846;&#x67B6;&#xFF1A; &#x884C;&#x4E3A;&#x4EBA;&#x5E08;&#xFF0C;&#x5B66;&#x4E3A;&#x4E16;&#x8303;</li><li>jest&#x6D4B;&#x8BD5;&#x9A71;&#x52A8;&#x5F00;&#x53D1;&#x5B9E;&#x6218;&#xFF1A; js&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#x7684;&#x66F4;&#x65B0;</li><li>yaml&#x914D;&#x7F6E;&#x6587;&#x4EF6;&#xFF1A; &#x81F3;&#x7231;&#x4E4B;&#x4FE1;</li><li>config&#x6587;&#x4EF6;&#x5BFC;&#x5165;&#x5168;&#x914D;&#x7F6E;&#xFF1A; &#x4E07;&#x80FD;&#x94A5;&#x5319;</li><li>vue-share-utils&#xFF1A;&#x5B9E;&#x7528;&#x5C0F;&#x5DE5;&#x5177;</li><li>Generator: vue-cli3&#x6838;&#x5FC3;&#x5F15;&#x64CE;&#xFF0C;&#x673A;&#x68B0;&#x4E4B;&#x5FC3;</li><li>jest+Generator&#xFF1A; &#x6D4B;&#x8BD5;&#x9A71;&#x52A8;vue-cli3&#x5F15;&#x64CE;</li></ul>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
顶级测试框架Jest指南：跑通一个完美的程序，就是教出一群像样的学生

## 原文链接
[https://segmentfault.com/a/1190000016399447](https://segmentfault.com/a/1190000016399447)

