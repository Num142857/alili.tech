---
title: 'vue 实践技巧合集' 
date: 2018-11-16 2:30:06
hidden: true
slug: qzmffmbrk2a
categories: [reprint]
---

{{< raw >}}
<h3 id="articleHeader0">&#x524D;&#x8A00;</h3><p>&#x672C;&#x6587;&#x7EAF;&#x5C5E;&#x4E2A;&#x4EBA;&#x5E73;&#x65F6;&#x5B9E;&#x8DF5;&#x8FC7;&#x7A0B;&#x4E2D;&#x7684;&#x4E00;&#x4E9B;&#x7ECF;&#x9A8C;&#x603B;&#x7ED3;&#xFF0C;&#x7B97;&#x662F;&#x4E00;&#x70B9;&#x70B9;&#x5C0F;&#x6280;&#x5DE7;&#x5427;&#xFF0C;&#x4E0D;&#x662F;&#x591A;&#x4E48;&#x9AD8;&#x660E;&#x7684;&#x6280;&#x672F;&#xFF0C;&#x5982;&#x679C;&#x5BF9;&#x4F60;&#x6709;&#x5E2E;&#x52A9;&#xFF0C;&#x90A3;&#x4E48;&#x4E0D;&#x80DC;&#x8363;&#x5E78;&#x3002;</p><p>&#x672C;&#x6587;&#x4E0D;&#x6D89;&#x53CA;<code>&#x7F55;&#x89C1;API</code>&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#x7B49;&#xFF0C;&#x5927;&#x90E8;&#x5206;&#x5185;&#x5BB9;&#x90FD;&#x662F;&#x57FA;&#x4E8E;&#x5BF9;vue&#x7684;&#x4E00;&#x4E9B;&#x5B9E;&#x8DF5;&#x800C;&#x5DF2;&#x3002;&#x7531;&#x4E8E;&#x6D89;&#x5ACC;&#x6295;&#x673A;&#x53D6;&#x5DE7;&#xFF0C;&#x53EF;&#x80FD;&#x4F1A;&#x5E26;&#x6765;&#x4E00;&#x4E9B;&#x4E0D;&#x7B26;&#x5408;&#x89C4;&#x8303;&#x7684;&#x526F;&#x4F5C;&#x7528;&#xFF0C;&#x8BF7;&#x6839;&#x636E;&#x9879;&#x76EE;&#x8981;&#x6C42;&#x914C;&#x60C5;&#x4F7F;&#x7528;&#x3002;</p><ol><li><p><strong>&#x591A;&#x4E2A;&#x9875;&#x9762;&#x90FD;&#x4F7F;&#x7528;&#x7684;&#x5230;&#x65B9;&#x6CD5;&#xFF0C;&#x653E;&#x5728; <code>vue.prototype</code> &#x4E0A;&#x4F1A;&#x5F88;&#x65B9;&#x4FBF;</strong></p><p>&#x521A;&#x63A5;&#x89E6; <code>vue</code> &#x7684;&#x65F6;&#x5019;&#x505A;&#x8FC7;&#x4E00;&#x4EF6;&#x50BB;&#x4E8B;&#xFF0C;&#x56E0;&#x4E3A;&#x5C01;&#x88C5;&#x4E86;&#x4E00;&#x4E2A;&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#x63A5;&#x53E3;<code>post</code>,&#x653E;&#x5728; <code>post.js</code> &#x6587;&#x4EF6;&#x91CC;&#x9762;&#xFF0C;&#x7136;&#x540E;&#x5728;&#x6BCF;&#x4E2A;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#x7684;&#x9875;&#x9762;&#x5F15;&#x5165;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import port from &apos;./xxxx/xxxx/post&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript" style="word-break:break-word;white-space:initial"><span class="hljs-keyword">import</span> port <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./xxxx/xxxx/post&apos;</span></code></pre><p>&#x5982;&#x679C;&#x53EA;&#x662F;&#x8FD9;&#x6837;&#xFF0C;&#x8FD8;&#x6CA1;&#x4EC0;&#x4E48;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5199;&#x597D;&#x4E00;&#x4E2A;&#x9875;&#x9762;&#x4EE5;&#x540E;&#x518D;&#x590D;&#x5236;&#xFF0C;&#x53EF;&#x4EE5;&#x4FDD;&#x8BC1;&#x6BCF;&#x4E2A;&#x9875;&#x9762;&#x90FD;&#x6709;&#x4E0A;&#x9762;&#x7684;&#x8BED;&#x53E5;&#x3002;&#x4F46;&#x662F;&#x5982;&#x679C;&#x6BCF;&#x4E2A;&#x6587;&#x4EF6;&#x6240;&#x5728;&#x7684;&#x76EE;&#x5F55;&#x5C42;&#x7EA7;&#x4E0D;&#x4E00;&#x6837;&#x5462;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5047;&#x8BBE;&#x6B63;&#x5E38;&#x662F;&#x8FD9;&#x6837;
import port from &apos;../xxxx/xxxx/post&apos;
// &#x76EE;&#x5F55;&#x52A0;&#x6DF1;&#x4E00;&#x7EA7;&#xFF0C;&#x5C31;&#x53D8;&#x6210;&#x8FD9;&#x6837;
import port from &apos;../../xxxx/xxxx/post&apos;
// &#x518D;&#x52A0;&#x6DF1;&#x4E00;&#x7EA7;&#x7684;&#x6837;&#x5B50;
import port from &apos;../../../xxxx/xxxx/post&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x5047;&#x8BBE;&#x6B63;&#x5E38;&#x662F;&#x8FD9;&#x6837;</span>
<span class="hljs-keyword">import</span> port <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../xxxx/xxxx/post&apos;</span>
<span class="hljs-comment">// &#x76EE;&#x5F55;&#x52A0;&#x6DF1;&#x4E00;&#x7EA7;&#xFF0C;&#x5C31;&#x53D8;&#x6210;&#x8FD9;&#x6837;</span>
<span class="hljs-keyword">import</span> port <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../../xxxx/xxxx/post&apos;</span>
<span class="hljs-comment">// &#x518D;&#x52A0;&#x6DF1;&#x4E00;&#x7EA7;&#x7684;&#x6837;&#x5B50;</span>
<span class="hljs-keyword">import</span> port <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../../../xxxx/xxxx/post&apos;</span></code></pre><p>&#x5F53;&#x7136;&#xFF0C;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x7528; &#x522B;&#x540D; <code>@/xxxx/post</code>,&#x4F46;&#x662F;&#x8FD8;&#x662F;&#x5C11;&#x4E0D;&#x4E86;&#x8981;&#x6BCF;&#x4E2A;&#x9875;&#x9762;&#x5F15;&#x7528;&#x3002;<br>&#x90A3;&#x6211;&#x4EEC;&#x6765;&#x770B;&#x770B;&#xFF0C;&#x7528;<code>vue.prototype</code> &#x6709;&#x591A;&#x65B9;&#x4FBF;&#xFF1F;<br>&#x9996;&#x5148;&#xFF0C;&#x4F60;&#x5F97;&#x5728; <code>vue</code> &#x7684;&#x5165;&#x53E3;&#x6587;&#x4EF6;( <code>vue-cli</code> &#x751F;&#x6210;&#x7684;&#x9879;&#x76EE;&#x7684;&#x8BDD;&#xFF0C;&#x9ED8;&#x8BA4;&#x662F; <code>/src/main.js</code>)&#x91CC;&#x9762;&#x505A;&#x5982;&#x4E0B;&#x8BBE;&#x7F6E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" import port from &apos;./xxxx/xxxx/post&apos;

 vue.prototype.$post = post   " title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"> <span class="hljs-keyword">import</span> port <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./xxxx/xxxx/post&apos;</span>

 vue.prototype.$post = post   </code></pre><p>&#x8FD9;&#x6837;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x5728;&#x6240;&#x6709;&#x7684; <code>vue</code> &#x7EC4;&#x4EF6;&#xFF08;&#x9875;&#x9762;&#xFF09;&#x91CC;&#x9762;&#x4F7F;&#x7528; <code>this.post()</code> &#x65B9;&#x6CD5;&#x4E86;&#xFF0C;&#x5C31;&#x50CF; <code>vue</code> &#x7684;&#x4EB2;&#x513F;&#x5B50;&#x4E00;&#x6837;</p><blockquote>tip: &#x628A;&#x65B9;&#x6CD5;&#x6302;&#x5728;&#x5230; <code>prototype</code> &#x4E0A;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6700;&#x597D;&#x52A0;&#x4E00;&#x4E2A; <code>$</code> &#x524D;&#x7F00;&#xFF0C;&#x907F;&#x514D;&#x8DDF;&#x5176;&#x4ED6;&#x53D8;&#x91CF;&#x51B2;&#x7A81;<p>til again: &#x4E0D;&#x8981;&#x6302;&#x8F7D;&#x592A;&#x591A;&#x65B9;&#x6CD5;&#x5230; <code>prototype</code> &#x4E0A;&#xFF0C;&#x53EA;&#x6302;&#x8F7D;&#x4E00;&#x4E9B;&#x4F7F;&#x7528;&#x9891;&#x7387;&#x975E;&#x5E38;&#x9AD8;&#x7684;</p></blockquote></li><li><p><strong>&#x9700;&#x8981;&#x54CD;&#x5E94;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x5728;&#x83B7;&#x53D6;&#x5230;&#x63A5;&#x53E3;&#x6570;&#x636E;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5148;&#x8BBE;&#x7F6E;</strong></p><p>&#x5927;&#x5BB6;&#x6709;&#x6CA1;&#x6709;&#x5F88;&#x7ECF;&#x5E38;&#x78B0;&#x5230;&#x8FD9;&#x6837;&#x90FD;&#x4E00;&#x79CD;&#x60C5;&#x51B5;&#xFF0C;&#x5728;&#x5FAA;&#x73AF;&#x5217;&#x8868;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x7ED9;&#x5217;&#x8868;&#x9879;&#x4E00;&#x4E2A;&#x63A7;&#x5236;&#x663E;&#x793A;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x5982; &#x662F;&#x5426;&#x53EF;&#x5220;&#x9664;&#xFF0C;&#x662F;&#x5426;&#x5DF2;&#x9009;&#x4E2D;&#x7B49;&#x7B49;&#xFF0C;&#x800C;&#x540E;&#x7AEF;&#x63A5;&#x53E3;&#x4E00;&#x822C;&#x4E0D;&#x4F1A;&#x8FD4;&#x56DE;&#x8FD9;&#x79CD;&#x5B57;&#x6BB5;&#xFF0C;&#x56E0;&#x4E3A;&#x8FD9;&#x5C5E;&#x4E8E;&#x7EAF;&#x524D;&#x7AEF;&#x5C55;&#x793A;&#x7684;&#xFF0C;&#x8DDF;&#x540E;&#x7AEF;&#x6CA1;&#x5565;&#x5173;&#x7CFB;&#xFF0C;&#x6BD4;&#x5982;&#x540E;&#x7AEF;&#x7ED9;&#x7684;&#x6570;&#x636E;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
  {name: &apos;abc&apos;, age: 18},
  {name: &apos;def&apos;, age: 20},
  {name: &apos;ghi&apos;, age: 22},
]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">[
  {<span class="hljs-attr">name</span>: <span class="hljs-string">&apos;abc&apos;</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">18</span>},
  {<span class="hljs-attr">name</span>: <span class="hljs-string">&apos;def&apos;</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">20</span>},
  {<span class="hljs-attr">name</span>: <span class="hljs-string">&apos;ghi&apos;</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">22</span>},
]</code></pre><p>&#x6211;&#x4EEC;&#x4E0D;&#x59A8;&#x5047;&#x8BBE;&#x4EE5;&#x4E0A;&#x6570;&#x636E;&#x4E3A;&#x5B66;&#x751F;&#x5217;&#x8868;</p><p>&#x7136;&#x540E;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x6E32;&#x67D3;&#x8FD9;&#x4E2A;&#x5217;&#x8868;&#xFF0C;&#x5728;&#x6BCF;&#x4E00;&#x9879;&#x540E;&#x9762;&#x663E;&#x793A;&#x4E00;&#x4E2A;&#x52FE;&#x9009;&#x6309;&#x94AE;&#xFF0C;&#x5982;&#x679C;&#x7528;&#x6237;&#x6253;&#x52FE;&#xFF0C;&#x5219;&#x8FD9;&#x4E2A;&#x6309;&#x94AE;&#x662F;&#x7EFF;&#x8272;&#xFF0C;&#x9ED8;&#x8BA4;&#x8FD9;&#x4E2A;&#x6309;&#x94AE;&#x662F;&#x7070;&#x8272;&#xFF0C;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#xFF0C;&#x4E0A;&#x8868;&#x662F;&#x6CA1;&#x6709;&#x6EE1;&#x8DB3;&#x8FD9;&#x4E2A;&#x6E32;&#x67D3;&#x6761;&#x4EF6;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x800C;&#x5982;&#x679C;&#x6211;&#x4EEC;&#x5728;&#x7528;&#x6237;&#x6253;&#x52FE;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x518D;&#x53BB;&#x6DFB;&#x52A0;&#x8FD9;&#x4E2A;&#x6570;&#x636E;&#x7684;&#x8BDD;&#xFF0C;&#x6B63;&#x5E38;&#x7684;&#x505A;&#x6CD5;&#x662F;&#x65E0;&#x6CD5;&#x53CA;&#x65F6;&#x54CD;&#x5E94;&#x7684;&#x3002;</p><p>&#x5982;&#x679C;&#x6211;&#x4EEC;&#x5728;&#x83B7;&#x53D6;&#x5230;&#x6570;&#x636E;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5148;&#x7ED9;&#x6570;&#x7EC4;&#x7684;&#x6BCF;&#x4E00;&#x9879;&#x90FD;&#x52A0;&#x4E00;&#x4E2A;&#x662F;&#x5426;&#x6253;&#x52FE;&#x7684;&#x6807;&#x793A;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#xFF0C;&#x6211;&#x4EEC;&#x5047;&#x8BBE;&#x6211;&#x4EEC;&#x83B7;&#x53D6;&#x5230;&#x7684;&#x6570;&#x636E;&#x662F; <code>res.list</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="res.list.map(item =&gt; { 
  item.isTicked &#xFF1D; false
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">res.list.map(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> { 
  item.isTicked &#xFF1D; <span class="hljs-literal">false</span>
})</code></pre><p>&#x8FD9;&#x4E48;&#x505A;&#x7684;&#x539F;&#x7406;&#x662F; <code>vue</code> &#x65E0;&#x6CD5;&#x5BF9;&#x4E0D;&#x5B58;&#x5728;&#x7684;&#x5C5E;&#x6027;&#x4F5C;&#x54CD;&#x5E94;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x5728;&#x83B7;&#x53D6;&#x5230;&#x6570;&#x636E;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5148;&#x628A;&#x9700;&#x8981;&#x7684;&#x5C5E;&#x6027;&#x52A0;&#x4E0A;&#x53BB;&#xFF0C;&#x7136;&#x540E;&#x5728;&#x8D4B;&#x503C;&#x7ED9; <code>data</code> , &#x8FD9;&#x6837; <code>data</code> &#x63A5;&#x6536;&#x5230;&#x6570;&#x636E;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5DF2;&#x7ECF;&#x662F;&#x5B58;&#x5728;&#x8FD9;&#x4E2A;&#x5C5E;&#x6027;&#x4E86;&#xFF0C;&#x6240;&#x4EE5;&#x4F1A;&#x54CD;&#x5E94;&#x3002;&#x5F53;&#x7136;&#x8FD8;&#x6709;&#x5176;&#x4ED6;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x3002;&#x4E0D;&#x8FC7;&#x5BF9;&#x4E8E;&#x4E00;&#x4E2A;&#x5F3A;&#x8FEB;&#x75C7;&#x6765;&#x8BF4;&#xFF0C;&#x6211;&#x8FD8;&#x662F;&#x6BD4;&#x8F83;&#x503E;&#x5411;&#x4E8E;&#x8FD9;&#x79CD;&#x505A;&#x6CD5;</p></li><li><p><strong>&#x5C01;&#x88C5;&#x5168;&#x5C40;&#x57FA;&#x4E8E; <code>promise</code> &#x7684;&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#x65B9;&#x6CD5;</strong></p><p>&#x770B;&#x8FC7;&#x5F88;&#x591A;&#x9879;&#x76EE;&#x7684;&#x6E90;&#x7801;&#xFF0C;&#x53D1;&#x73B0;&#x5927;&#x90E8;&#x5206;&#x7684;&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#x90FD;&#x662F;&#x76F4;&#x63A5;&#x4F7F;&#x7528; <code>axios</code> &#x4E4B;&#x7C7B;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios({
  method: &apos;post&apos;,
  url: &apos;/user/12345&apos;,
  data: {
    firstName: &apos;Fred&apos;,
    lastName: &apos;Flintstone&apos;
  }
})
 .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">axios({
  <span class="hljs-attr">method</span>: <span class="hljs-string">&apos;post&apos;</span>,
  <span class="hljs-attr">url</span>: <span class="hljs-string">&apos;/user/12345&apos;</span>,
  <span class="hljs-attr">data</span>: {
    <span class="hljs-attr">firstName</span>: <span class="hljs-string">&apos;Fred&apos;</span>,
    <span class="hljs-attr">lastName</span>: <span class="hljs-string">&apos;Flintstone&apos;</span>
  }
})
 .then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">response</span>) </span>{
    <span class="hljs-built_in">console</span>.log(response);
  })
  .catch(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
    <span class="hljs-built_in">console</span>.log(error);
  });</code></pre><p>&#x5982;&#x679C;&#x6709;&#x8DE8;&#x57DF;&#xFF0C;&#x6216;&#x8005;&#x9700;&#x8981;&#x8BBE;&#x7F6E; <code>http</code> &#x5934;&#x7B49;&#xFF0C;&#x8FD8;&#x9700;&#x8981;&#x52A0;&#x5165;&#x66F4;&#x591A;&#x7684;&#x914D;&#x7F6E;&#xFF0C;&#x800C;&#x8FD9;&#x4E9B;&#x914D;&#x7F6E;&#xFF0C;&#x5BF9;&#x4E8E;&#x540C;&#x4E00;&#x4E2A;&#x9879;&#x76EE;&#x6765;&#x8BF4;&#xFF0C;&#x57FA;&#x672C;&#x90FD;&#x662F;&#x4E00;&#x6837;&#x7684;&#xFF0C;&#x4E0D;&#x4E00;&#x6837;&#x7684;&#x53EA;&#x6709; <code>url</code> &#x8DDF;&#x53C2;&#x6570;&#xFF0C;&#x65E2;&#x7136;&#x8FD9;&#x6837;&#xFF0C;&#x90A3;&#x6211;&#x5417;&#x4E3A;&#x4EC0;&#x4E48;&#x4E0D;&#x628A;&#x5B83;&#x5C01;&#x88C5;&#x6210;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#x5462;&#xFF1F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function post (url,param) {
    return axios({
      method: &apos;post&apos;,
      url: url,
      data: param
      ... axios &#x7684;&#x5176;&#x4ED6;&#x914D;&#x7F6E;
    })
}
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">post</span> (<span class="hljs-params">url,param</span>) </span>{
    <span class="hljs-keyword">return</span> axios({
      <span class="hljs-attr">method</span>: <span class="hljs-string">&apos;post&apos;</span>,
      <span class="hljs-attr">url</span>: url,
      <span class="hljs-attr">data</span>: param
      ... axios &#x7684;&#x5176;&#x4ED6;&#x914D;&#x7F6E;
    })
}
</code></pre><blockquote>tip: &#x8FD9;&#x91CC;&#x539F;&#x6765;&#x6211;&#x591A;&#x7528;&#x4E86;&#x4E00;&#x5C42;promise&#x5305;&#x8D77;&#x6765;,&#x5BF9;&#x7B80;&#x5355;&#x7684;&#x9700;&#x6C42;&#x6765;&#x8BF4;&#x662F;&#x592A;&#x591A;&#x4F59;&#x4E86;,&#x611F;&#x89C9;&#x6398;&#x91D1;&#x7528;&#x6237; <code>@&#x65E5;&#x6708;&#x4E3A;&#x6613;&#x3002;</code> &#x6307;&#x51FA;</blockquote><p>&#x518D;&#x7ED3;&#x5408;&#x7B2C;&#x4E00;&#x70B9;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x53EF;&#x4EE5;&#x518D;&#x4EFB;&#x610F; <code>vue</code> &#x5B9E;&#x4F8B;&#x4E2D;&#x8FD9;&#x6837;&#x4F7F;&#x7528;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let param = {
  firstName: &apos;Fred&apos;,
  lastName: &apos;Flintstone&apos;
}
this.post(&apos;/user/12345&apos;,param)
.then(...)
.catch(...)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> param = {
  <span class="hljs-attr">firstName</span>: <span class="hljs-string">&apos;Fred&apos;</span>,
  <span class="hljs-attr">lastName</span>: <span class="hljs-string">&apos;Flintstone&apos;</span>
}
<span class="hljs-keyword">this</span>.post(<span class="hljs-string">&apos;/user/12345&apos;</span>,param)
.then(...)
.catch(...)</code></pre><p>&#x6709;&#x6CA1;&#x6709;&#x6BD4;&#x539F;&#x59CB;&#x7684;&#x7B80;&#x5355;&#x5F88;&#x591A;&#x5462;&#xFF1F;&#x5982;&#x679C;&#x4F60;&#x7684;&#x9879;&#x76EE;&#x652F;&#x6301; <code>async</code> <code>await</code>&#xFF0C;&#x8FD8;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;&#x7528;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let param = {
  firstName: &apos;Fred&apos;,
  lastName: &apos;Flintstone&apos;
}
let res  = await this.post(&apos;/user/12345&apos;,param)
console.log(res) // res &#x5C31;&#x662F;&#x5F02;&#x6B65;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> param = {
  <span class="hljs-attr">firstName</span>: <span class="hljs-string">&apos;Fred&apos;</span>,
  <span class="hljs-attr">lastName</span>: <span class="hljs-string">&apos;Flintstone&apos;</span>
}
<span class="hljs-keyword">let</span> res  = <span class="hljs-keyword">await</span> <span class="hljs-keyword">this</span>.post(<span class="hljs-string">&apos;/user/12345&apos;</span>,param)
<span class="hljs-built_in">console</span>.log(res) <span class="hljs-comment">// res &#x5C31;&#x662F;&#x5F02;&#x6B65;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;</span>
</code></pre><blockquote>tip: <code>await</code> &#x5173;&#x952E;&#x5B57;&#x5FC5;&#x987B;&#x5728; <code>&#x88AB; async &#x4FEE;&#x9970;&#x7684;&#x51FD;&#x6570;&#x91CC;&#x9762;&#x4F7F;&#x7528;</code></blockquote></li><li><p><strong>&#x5982;&#x679C;&#x4F60;&#x89C9;&#x5F97;&#x6709;&#x65F6;&#x5019;&#xFF0C;&#x4F60;&#x771F;&#x7684;&#x9700;&#x8981;&#x7236;&#x5B50;&#x7EC4;&#x4EF6;&#x5171;&#x4EAB;&#x4E00;&#x4E2A;&#x503C;&#xFF0C;&#x4E0D;&#x5982;&#x8BD5;&#x8BD5;&#x4F20;&#x4E2A;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x8FC7;&#x53BB;</strong></p><p><code>vue</code> &#x7684;&#x7236;&#x5B50;&#x7EC4;&#x4EF6;&#x4F20;&#x503C;&#xFF0C;&#x6709;&#x597D;&#x591A;&#x79CD;&#x65B9;&#x6CD5;&#xFF0C;&#x8FD9;&#x91CC;&#x5C31;&#x4E0D;&#x4E00;&#x4E00;&#x5217;&#x4E3E;&#x4E86;&#xFF0C;&#x4F46;&#x662F;&#x4ECA;&#x5929;&#x6211;&#x4EEC;&#x8981;&#x4E86;&#x89E3;&#x7684;&#xFF0C;&#x662F;&#x5229;&#x7528; <code>javascript</code> &#x7684;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#x7279;&#x6027;&#xFF0C;&#x8FD8;&#x8FBE;&#x5230;&#x53E6;&#x4E00;&#x79CD;&#x4F20;&#x503C;&#x7684;&#x76EE;&#x7684;</p><p>&#x5047;&#x8BBE;&#x6709;&#x8FD9;&#x4E48;&#x4E00;&#x4E2A;&#x9700;&#x6C42;&#xFF0C;&#x7236;&#x7EC4;&#x4EF6;&#x9700;&#x8981;&#x4F20; 3 &#x4E2A;&#x503C;&#x5230;&#x5B50;&#x7EC4;&#x4EF6;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x5B50;&#x7EC4;&#x4EF6;&#x91CC;&#x9762;&#x6539;&#x52A8;&#x540E;&#xFF0C;&#x9700;&#x8981;&#x7ACB;&#x9A6C;&#x518D;&#x7236;&#x7EC4;&#x4EF6;&#x4E0A;&#x4F5C;&#x51FA;&#x54CD;&#x5E94;&#xFF0C;&#x6211;&#x4EEC;&#x901A;&#x5E38;&#x7684;&#x505A;&#x6CD5;&#x4E0A;&#x6539;&#x5B8C;&#x4EE5;&#x540E;&#xFF0C;&#x901A;&#x8FC7; <code>this.$emit</code> &#x53D1;&#x5C04;&#x4E8B;&#x4EF6;&#xFF0C;&#x7136;&#x540E;&#x518D;&#x7236;&#x7EC4;&#x4EF6;&#x76D1;&#x542C;&#x5BF9;&#x5E94;&#x7684;&#x4E8B;&#x4EF6;&#xFF0C;&#x7136;&#x800C;&#x8FD9;&#x4E48;&#x505A;&#x5E94;&#x5BF9;&#x4E00;&#x4E24;&#x4E2A;&#x6570;&#x636E;&#x8FD8;&#x597D;&#xFF0C;&#x5982;&#x679C;&#x4F20;&#x7684;&#x6570;&#x636E;&#x591A;&#x4E86;&#xFF0C;&#x4F1A;&#x7D2F;&#x6B7B;&#x4EBA;&#x3002;<br>&#x6211;&#x4EEC;&#x4E0D;&#x59A8;&#x628A;&#x8FD9;&#x4E9B;&#x8981;&#x4F20;&#x9012;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x5305;&#x518D;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0F;&#x6570;&#x7EC4; &#x91CC;&#x9762;&#xFF0C;&#x7136;&#x540E;&#x5728;&#x4F20;&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;subComponent :subData=&quot;subData&quot;&gt;&lt;/subComponent&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html" style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">subComponent</span> <span class="hljs-attr">:subData</span>=<span class="hljs-string">&quot;subData&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">subComponent</span>&gt;</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data () {
  return {
    subData: {
      filed1: &apos;field1&apos;,
      filed2: &apos;field2&apos;,
      filed3: &apos;field3&apos;,
      filed4: &apos;field4&apos;,
      filed5: &apos;field5&apos;,
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">data () {
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">subData</span>: {
      <span class="hljs-attr">filed1</span>: <span class="hljs-string">&apos;field1&apos;</span>,
      <span class="hljs-attr">filed2</span>: <span class="hljs-string">&apos;field2&apos;</span>,
      <span class="hljs-attr">filed3</span>: <span class="hljs-string">&apos;field3&apos;</span>,
      <span class="hljs-attr">filed4</span>: <span class="hljs-string">&apos;field4&apos;</span>,
      <span class="hljs-attr">filed5</span>: <span class="hljs-string">&apos;field5&apos;</span>,
    }
  }
}</code></pre><p>&#x8FD9;&#x6837;&#xFF0C;&#x6211;&#x4EEC;&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x91CC;&#x9762;&#x6539;&#x52A8; <code>subData</code> &#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x7236;&#x7EC4;&#x4EF6;&#x4E0A;&#x5C31;&#x80FD;&#x76F4;&#x63A5;&#x4F5C;&#x51FA;&#x54CD;&#x5E94;&#xFF0C;&#x65E0;&#x9700; <code>this.$emit</code> &#x6216; <code>vuex</code> &#x800C;&#x4E14;&#x5982;&#x679C;&#x6709;&#x5176;&#x4ED6;&#x5144;&#x5F1F;&#x7EC4;&#x4EF6;&#x7684;&#x8BDD;&#xFF0C;&#x53EA;&#x8981;&#x5144;&#x5F1F;&#x7EC4;&#x4EF6;&#x4E5F;&#x6709;&#x7ED1;&#x5B9A;&#x8FD9;&#x4E2A; <code>subData</code> &#xFF0C;&#x90A3;&#x4E48;&#x5144;&#x5F1F;&#x7EC4;&#x4EF6;&#x91CC;&#x9762;&#x7684; <code>subData</code> &#x4E5F;&#x80FD;&#x53CA;&#x65F6;&#x54CD;&#x5E94;</p><blockquote>tip: &#x9996;&#x5148;&#xFF0C;&#x8FD9;&#x4E48;&#x505A;&#x6211;&#x4E2A;&#x4EBA;&#x4E0A;&#x611F;&#x89C9;&#x6709;&#x70B9;&#x4E0D;&#x7B26;&#x5408;&#x89C4;&#x8303;&#x7684;&#xFF0C;&#x5982;&#x679C;&#x6CA1;&#x6709;&#x7279;&#x522B;&#x591A;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x8FD8;&#x662F;&#x4E56;&#x4E56;&#x7528; <code>this.$emit</code> &#x5427;&#xFF0C;&#x5176;&#x6B21;&#xFF0C;&#x8FD9;&#x4E2A;&#x6570;&#x636E;&#x9700;&#x8981;&#x6709;&#x7279;&#x5B9A;&#x7684;&#x6761;&#x4EF6;&#x624D;&#x80FD;&#x6784;&#x9020;&#x7684;&#x51FA;&#x6765;&#xFF0C;&#x5E76;&#x4E0D;&#x662F;&#x6240;&#x6709;&#x60C5;&#x51B5;&#x90FD;&#x9002;&#x7528;&#x3002;</blockquote></li><li><p><strong>&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#x7684;&#x53C2;&#x6570;&#x5728; <code>data</code> &#x91CC;&#x9762;&#x6784;&#x9020;&#x597D;&#xFF0C;&#x7528;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x5305;&#x8D77;&#x6765;&#xFF0C;&#x4F1A;&#x65B9;&#x4FBF;&#x5F88;&#x591A;</strong></p><p>&#x6709;&#x505A;&#x8FC7;&#x7C7B;&#x4F3C; <code>ERP</code> &#x7C7B;&#x578B;&#x7684;&#x7CFB;&#x7EDF;&#x7684;&#x540C;&#x5B66;&#xFF0C;&#x4E00;&#x5B9A;&#x78B0;&#x5230;&#x8FC7;&#x8FD9;&#x6837;&#x7684;&#x4E00;&#x4E2A;&#x573A;&#x666F;&#xFF0C;&#x4E00;&#x4E2A;&#x5217;&#x8868;&#xFF0C;&#x6709; N &#x4E2A;&#x8FC7;&#x6EE4;&#x6761;&#x4EF6;&#xFF0C;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#x901A;&#x5E38;&#x6211;&#x4EEC;&#x8FD9;&#x4E48;&#x7ED1;&#x5B9A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" &lt;input type=&quot;text&quot; v-model=&quot;field1&quot;&gt;
 &lt;input type=&quot;text&quot; v-model=&quot;field2&quot;&gt;
 &lt;input type=&quot;text&quot; v-model=&quot;field3&quot;&gt;
 ....
 &lt;input type=&quot;text&quot; v-model=&quot;fieldn&quot;&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"> <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;field1&quot;</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;field2&quot;</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;field3&quot;</span>&gt;</span>
 ....
 <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;fieldn&quot;</span>&gt;</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data () {
 return {
   field1: &apos;value1&apos;,
   field2: &apos;value2&apos;,
   field3: &apos;value3&apos;,
   ...
   fieldn:&apos;valuen&apos;
 }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">data () {
 <span class="hljs-keyword">return</span> {
   <span class="hljs-attr">field1</span>: <span class="hljs-string">&apos;value1&apos;</span>,
   <span class="hljs-attr">field2</span>: <span class="hljs-string">&apos;value2&apos;</span>,
   <span class="hljs-attr">field3</span>: <span class="hljs-string">&apos;value3&apos;</span>,
   ...
   fieldn:<span class="hljs-string">&apos;valuen&apos;</span>
 }
}</code></pre><p>&#x7136;&#x540E;&#x63D0;&#x4EA4;&#x6570;&#x636E;&#x7684;&#x65F6;&#x5019;&#x8FD9;&#x6837;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var param = {
   backend_field1: this.field1,
   backend_field2: this.field2,
   backend_field3: this.field3,
   ...
   backend_fieldn: this.fieldn
 }
 this.post(url,param)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"> <span class="hljs-keyword">var</span> param = {
   <span class="hljs-attr">backend_field1</span>: <span class="hljs-keyword">this</span>.field1,
   <span class="hljs-attr">backend_field2</span>: <span class="hljs-keyword">this</span>.field2,
   <span class="hljs-attr">backend_field3</span>: <span class="hljs-keyword">this</span>.field3,
   ...
   backend_fieldn: <span class="hljs-keyword">this</span>.fieldn
 }
 <span class="hljs-keyword">this</span>.post(url,param)</code></pre><p>&#x5982;&#x4F60;&#x770B;&#x5230;&#x7684;&#xFF0C;&#x6BCF;&#x6B21;&#x63D0;&#x4EA4;&#x63A5;&#x53E3;&#xFF0C;&#x90FD;&#x8981;&#x53BB;&#x6784;&#x9020;&#x53C2;&#x6570;&#xFF0C;&#x8FD8;&#x5F88;&#x5BB9;&#x6613;&#x9057;&#x6F0F;&#xFF0C;&#x6211;&#x4EEC;&#x4E0D;&#x59A8;&#x8FD9;&#x6837;&#xFF1A;&#x5148;&#x53BB;&#x63A5;&#x53E3;&#x6587;&#x6863;&#x91CC;&#x9762;&#x770B;&#x4E00;&#x4E0B;&#x540E;&#x7AEF;&#x9700;&#x8981;&#x7684;&#x5B57;&#x6BB5;&#x540D;&#x79F0;&#xFF0C;&#x7136;&#x540E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;input type=&quot;text&quot; v-model=&quot;queryParam.backend_field1&quot;&gt;
    &lt;input type=&quot;text&quot; v-model=&quot;queryParam.backend_field2&quot;&gt;
    &lt;input type=&quot;text&quot; v-model=&quot;queryParam.backend_field3&quot;&gt;
    ....
    &lt;input type=&quot;text&quot; v-model=&quot;queryParam.backend_fieldn&quot;&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html">    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;queryParam.backend_field1&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;queryParam.backend_field2&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;queryParam.backend_field3&quot;</span>&gt;</span>
    ....
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;queryParam.backend_fieldn&quot;</span>&gt;</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 
  ```javascript
  data () {
   return {
     queryParam:{
       backend_field1: &apos;value1&apos;
       backend_field2: &apos;value2&apos;
       backend_field3: &apos;value3&apos;
       ...
       backend_fieldn: &apos;valuen&apos;
     }
   }
  }
  ```
  &#x7136;&#x540E;&#x63D0;&#x4EA4;&#x6570;&#x636E;&#x7684;&#x65F6;&#x5019;&#x8FD9;&#x6837;&#xFF1A;
  ```javascript
   this.post(url,this.queryParam)
  ```" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code> 
  ```javascript
  data () {
   return {
     queryParam:{
       backend_field1: <span class="hljs-string">&apos;value1&apos;</span>
       backend_field2: <span class="hljs-string">&apos;value2&apos;</span>
       backend_field3: <span class="hljs-string">&apos;value3&apos;</span>
       ...
       backend_fieldn: <span class="hljs-string">&apos;valuen&apos;</span>
     }
   }
  }
  ```
  &#x7136;&#x540E;&#x63D0;&#x4EA4;&#x6570;&#x636E;&#x7684;&#x65F6;&#x5019;&#x8FD9;&#x6837;&#xFF1A;
  ```javascript
   this.post(url,this.queryParam)
  ```</code></pre><p>&#x662F;&#x7684;&#xFF0C;&#x8FD9;&#x6837;&#x505A;&#x4E5F;&#x662F;&#x6709;&#x5C40;&#x9650;&#x6027;&#x7684;&#xFF0C;&#x6BD4;&#x5982;&#x4F60;&#x4E00;&#x4E2A;&#x6570;&#x636E;&#x5728; 2 &#x4E2A;&#x5730;&#x65B9;&#x5171;&#x7528;&#xFF0C;&#x6BD4;&#x5982;&#x524D;&#x7AEF;&#x7EC4;&#x4EF6;&#x7ED1;&#x5B9A;&#x7684;&#x662F;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x4F60;&#x9700;&#x8981;&#x63D0;&#x4EA4;&#x7ED9;&#x540E;&#x7AEF;&#x7684;&#x662F; 2 &#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#xFF08;&#x4F8B;&#xFF1A;<code>element ui</code> &#x7684;&#x65F6;&#x95F4;&#x63A7;&#x4EF6;&#xFF09;,&#x4E0D;&#x8FC7;&#x90E8;&#x5206;&#x7279;&#x6B8A;&#x95EE;&#x9898;&#x7A0D;&#x5FAE;&#x5904;&#x7406;&#x4E00;&#x4E0B;&#xFF0C;&#x4E5F;&#x6BD4;&#x91CD;&#x65B0;&#x6784;&#x5EFA;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x7B80;&#x5355;&#x4E0D;&#x662F;&#x5417;&#xFF1F;</p></li><li><p><strong><code>data</code> &#x91CC;&#x9762;&#x7684;&#x6570;&#x636E;&#x591A;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x7ED9;&#x6BCF;&#x4E2A;&#x6570;&#x636E;&#x52A0;&#x4E00;&#x4E2A;&#x5907;&#x6CE8;&#xFF0C;&#x4F1A;&#x8BA9;&#x4F60;&#x540E;&#x671F;&#x5F80;&#x56DE;&#x770B;&#x7684;&#x65F6;&#x5019;&#x5F88;&#x6E05;&#x6670;</strong></p><p>&#x7EED;&#x4E0A;&#x4E00;&#x70B9;&#xFF0C;<code>data</code> &#x91CC;&#x9762;&#x6709;&#x5F88;&#x591A;&#x6570;&#x636E;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x53EF;&#x80FD;&#x4F60;&#x5199;&#x7684;&#x65F6;&#x5019;&#x662F;&#x633A;&#x6E05;&#x6670;&#x7684;&#xFF0C;&#x6BD5;&#x7ADF;&#x90FD;&#x662F;&#x4F60;&#x81EA;&#x5DF1;&#x5199;&#x7684;&#x4E1C;&#x897F;&#xFF0C;&#x53EF;&#x662F;&#x8FC7;&#x4E86;&#x5341;&#x5929;&#x534A;&#x4E2A;&#x6708;&#xFF0C;&#x6216;&#x8005;&#x522B;&#x4EBA;&#x770B;&#x4F60;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x76F8;&#x4FE1;&#x6211;&#xFF0C;&#x4E0D;&#x7BA1;&#x662F;&#x4F60;&#x81EA;&#x5DF1;&#xFF0C;&#x8FD8;&#x662F;&#x522B;&#x4EBA;&#xFF0C;&#x90FD;&#x662F;&#x4E00;&#x5934;&#x96FE;&#x6C34;&#xFF08;&#x8BB0;&#x5FC6;&#x529B;&#x8D85;&#x51FA;&#x5E38;&#x4EBA;&#x7684;&#x9664;&#x5916;&#xFF09;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x4E0D;&#x59A8;&#x7ED9;&#x6BCF;&#x4E2A;&#x6570;&#x636E;&#x540E;&#x9762;&#x52A0;&#x4E00;&#x4E2A;&#x5907;&#x6CE8;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data () {
 return {
   field1: &apos;value1&apos;,  // &#x63A7;&#x5236;xxx&#x663E;&#x793A;
   field2: &apos;value2&apos;,  // &#x9875;&#x9762;&#x52A0;&#x8F7D;&#x72B6;&#x6001;
   field3: [],        // &#x7528;&#x6237;&#x5217;&#x8868;
   ...
   fieldn: &apos;valuen&apos;   // XXXXXXXX
 }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">data () {
 <span class="hljs-keyword">return</span> {
   <span class="hljs-attr">field1</span>: <span class="hljs-string">&apos;value1&apos;</span>,  <span class="hljs-comment">// &#x63A7;&#x5236;xxx&#x663E;&#x793A;</span>
   field2: <span class="hljs-string">&apos;value2&apos;</span>,  <span class="hljs-comment">// &#x9875;&#x9762;&#x52A0;&#x8F7D;&#x72B6;&#x6001;</span>
   field3: [],        <span class="hljs-comment">// &#x7528;&#x6237;&#x5217;&#x8868;</span>
   ...
   fieldn: <span class="hljs-string">&apos;valuen&apos;</span>   <span class="hljs-comment">// XXXXXXXX</span>
 }
}</code></pre></li><li><p><strong>&#x903B;&#x8F91;&#x590D;&#x6742;&#x7684;&#x5185;&#x5BB9;&#xFF0C;&#x5C3D;&#x91CF;&#x62C6;&#x6210;&#x7EC4;&#x4EF6;</strong></p><p>&#x5047;&#x8BBE;&#x6211;&#x4EEC;&#x6709;&#x4E00;&#x4E2A;&#x8FD9;&#x6837;&#x7684;&#x573A;&#x666F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div&gt;
   &lt;div&gt;&#x59D3;&#x540D;&#xFF1A;"{{"user1.name"}}"&lt;/div&gt;
   &lt;div&gt;&#x6027;&#x522B;&#xFF1A;"{{"user1.sex"}}"&lt;/div&gt;
   &lt;div&gt;&#x5E74;&#x9F84;&#xFF1A;"{{"user1.age"}}"&lt;/div&gt;
   ...&#x6B64;&#x5904;&#x7701;&#x7565;999&#x4E2A;&#x5B57;&#x6BB5;...
   &lt;div&gt;&#x4ED6;&#x9694;&#x58C1;&#x90BB;&#x5C45;&#x7684;&#x963F;&#x59E8;&#x5BB6;&#x5C0F;&#x72D7;&#x7684;&#x540D;&#x5B57;&#xFF1A;"{{"user1.petName"}}"&lt;/div&gt;
&lt;/div&gt;
&lt;-- &#x5F53;&#x7136;&#xFF0C;&#x663E;&#x793A;&#x4E2D;&#x6211;&#x4EEC;&#x4E0D;&#x4F1A;&#x50BB;&#x5230;&#x4E0D;&#x7528; v-for,&#x6211;&#x4EEC;&#x5047;&#x8BBE;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x65E0;&#x6CD5;&#x7528;v-for --&gt;
&lt;div&gt;
    &lt;div&gt;&#x59D3;&#x540D;&#xFF1A;"{{"user2.name"}}"&lt;/div&gt;
    &lt;div&gt;&#x6027;&#x522B;&#xFF1A;"{{"user2.sex"}}"&lt;/div&gt;
    &lt;div&gt;&#x5E74;&#x9F84;&#xFF1A;"{{"user2.age"}}"&lt;/div&gt;
    ...&#x6B64;&#x5904;&#x7701;&#x7565;999&#x4E2A;&#x5B57;&#x6BB5;...
    &lt;div&gt;&#x4ED6;&#x9694;&#x58C1;&#x90BB;&#x5C45;&#x7684;&#x963F;&#x59E8;&#x5BB6;&#x5C0F;&#x72D7;&#x7684;&#x540D;&#x5B57;&#xFF1A;"{{"user2.petName"}}"&lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>&#x59D3;&#x540D;&#xFF1A;"{{"user1.name"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>&#x6027;&#x522B;&#xFF1A;"{{"user1.sex"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>&#x5E74;&#x9F84;&#xFF1A;"{{"user1.age"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
   ...&#x6B64;&#x5904;&#x7701;&#x7565;999&#x4E2A;&#x5B57;&#x6BB5;...
   <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>&#x4ED6;&#x9694;&#x58C1;&#x90BB;&#x5C45;&#x7684;&#x963F;&#x59E8;&#x5BB6;&#x5C0F;&#x72D7;&#x7684;&#x540D;&#x5B57;&#xFF1A;"{{"user1.petName"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">--</span> &#x5F53;&#x7136;&#xFF0C;&#x663E;&#x793A;&#x4E2D;&#x6211;&#x4EEC;&#x4E0D;&#x4F1A;&#x50BB;&#x5230;&#x4E0D;&#x7528; <span class="hljs-attr">v-for</span>,&#x6211;&#x4EEC;&#x5047;&#x8BBE;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x65E0;&#x6CD5;&#x7528;<span class="hljs-attr">v-for</span> <span class="hljs-attr">--</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>&#x59D3;&#x540D;&#xFF1A;"{{"user2.name"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>&#x6027;&#x522B;&#xFF1A;"{{"user2.sex"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>&#x5E74;&#x9F84;&#xFF1A;"{{"user2.age"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    ...&#x6B64;&#x5904;&#x7701;&#x7565;999&#x4E2A;&#x5B57;&#x6BB5;...
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>&#x4ED6;&#x9694;&#x58C1;&#x90BB;&#x5C45;&#x7684;&#x963F;&#x59E8;&#x5BB6;&#x5C0F;&#x72D7;&#x7684;&#x540D;&#x5B57;&#xFF1A;"{{"user2.petName"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#xFF0C;&#x6211;&#x4EEC;&#x4E0D;&#x59A8;&#x628A;[&#x7528;&#x6237;]&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x63D0;&#x53D6;&#x5230;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x91CC;&#x9762;&#xFF1A;<br>&#x5047;&#x8BBE;&#x5982;&#x4E0B;&#x4EE3;&#x7801;&#xFF0C;&#x5728; <code>comUserInfo.vue</code></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
 &lt;div&gt;
   &lt;div&gt;&#x59D3;&#x540D;&#xFF1A;"{{"user.name"}}"&lt;/div&gt;
   &lt;div&gt;&#x6027;&#x522B;&#xFF1A;"{{"user.sex"}}"&lt;/div&gt;
   &lt;div&gt;&#x5E74;&#x9F84;&#xFF1A;"{{"user.age"}}"&lt;/div&gt;
   ...&#x6B64;&#x5904;&#x7701;&#x7565;999&#x4E2A;&#x5B57;&#x6BB5;...
   &lt;div&gt;&#x4ED6;&#x9694;&#x58C1;&#x90BB;&#x5C45;&#x7684;&#x963F;&#x59E8;&#x5BB6;&#x5C0F;&#x72D7;&#x7684;&#x540D;&#x5B57;&#xFF1A;"{{"user.petName"}}"&lt;/div&gt;
 &lt;/div&gt;
&lt;/template&gt;

&lt;script &gt;
export  default {
 props:{
   user:{
     type:Object,
     default: () =&gt; {}
   }
 }
}
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code class="vue"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>&#x59D3;&#x540D;&#xFF1A;</span><span class="hljs-template-variable">"{{"user.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>&#x6027;&#x522B;&#xFF1A;</span><span class="hljs-template-variable">"{{"user.sex"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>&#x5E74;&#x9F84;&#xFF1A;</span><span class="hljs-template-variable">"{{"user.age"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
   ...&#x6B64;&#x5904;&#x7701;&#x7565;999&#x4E2A;&#x5B57;&#x6BB5;...
   <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>&#x4ED6;&#x9694;&#x58C1;&#x90BB;&#x5C45;&#x7684;&#x963F;&#x59E8;&#x5BB6;&#x5C0F;&#x72D7;&#x7684;&#x540D;&#x5B57;&#xFF1A;</span><span class="hljs-template-variable">"{{"user.petName"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
 <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> &gt;</span><span class="javascript">
<span class="hljs-keyword">export</span>  <span class="hljs-keyword">default</span> {
 <span class="hljs-attr">props</span>:{
   <span class="hljs-attr">user</span>:{
     <span class="hljs-attr">type</span>:<span class="hljs-built_in">Object</span>,
     <span class="hljs-attr">default</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {}
   }
 }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p>&#x7136;&#x540E;&#x539F;&#x6765;&#x7684;&#x9875;&#x9762;&#x53EF;&#x4EE5;&#x6539;&#x6210;&#x8FD9;&#x6837;(&#x7701;&#x7565;&#x6389;&#x5BFC;&#x5165;&#x548C;&#x6CE8;&#x518C;&#x7EC4;&#x4EF6;&#xFF0C;&#x5047;&#x8BBE;&#x6CE8;&#x518C;&#x7684;&#x540D;&#x5B57;&#x662F; <code>comUserInfo</code> )&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;comUserInfo :user=&quot;user1&quot;/&gt;
&lt;comUserInfo :user=&quot;user2&quot;/&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">comUserInfo</span> <span class="hljs-attr">:user</span>=<span class="hljs-string">&quot;user1&quot;</span>/&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">comUserInfo</span> <span class="hljs-attr">:user</span>=<span class="hljs-string">&quot;user2&quot;</span>/&gt;</span></code></pre><p>&#x8FD9;&#x6837;&#x662F;&#x4E0D;&#x662F;&#x6E05;&#x6670;&#x5F88;&#x591A;&#xFF1F;&#x4E0D;&#x7528;&#x770B;&#x6CE8;&#x91CA;&#xFF0C;&#x90FD;&#x80FD;&#x731C;&#x7684;&#x51FA;&#x6765;&#xFF0C;&#x8FD9;&#x662F;2&#x4E2A;&#x7528;&#x6237;&#x4FE1;&#x606F;&#x6A21;&#x5757;&#xFF0C; &#x8FD9;&#x6837;&#x505A;&#xFF0C;&#x8FD8;&#x6709;&#x4E00;&#x4E2A;&#x597D;&#x5904;&#x5C31;&#x662F;&#x51FA;&#x73B0;&#x9519;&#x8BEF;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F60;&#x53EF;&#x4EE5;&#x66F4;&#x5BB9;&#x6613;&#x7684;&#x5B9A;&#x4F4D;&#x5230;&#x9519;&#x8BEF;&#x7684;&#x4F4D;&#x7F6E;&#x3002;</p></li><li><p><strong>&#x5982;&#x679C;&#x4F60;&#x53EA;&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x91CC;&#x9762;&#x6539;&#x53D8;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x4E00;&#x4E2A;&#x503C;&#xFF0C;&#x4E0D;&#x59A8;&#x8BD5;&#x8BD5; <code>$emit(&apos;input&apos;)</code> ,&#x4F1A;&#x76F4;&#x63A5;&#x6539;&#x53D8; <code>v-model</code></strong></p><p>&#x6211;&#x4EEC;&#x6B63;&#x5E38;&#x7684;&#x7236;&#x5B50;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;&#x662F; &#x7236;&#x7EC4;&#x4EF6;&#x901A;&#x8FC7; <code>props</code> &#x4F20;&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6;&#xFF0C;&#x5B50;&#x7EC4;&#x4EF6;&#x901A;&#x8FC7; <code>this.$emit(&apos;eventName&apos;,value)</code> &#x901A;&#x77E5;&#x7236;&#x7EC4;&#x4EF6;&#x7ED1;&#x5B9A;&#x5728; <code>@eventName</code> &#x4E0A;&#x7684;&#x65B9;&#x6CD5;&#x6765;&#x505A;&#x76F8;&#x5E94;&#x7684;&#x5904;&#x7406;&#x3002;<br>&#x4F46;&#x662F;&#x8FD9;&#x8FB9;&#x6709;&#x4E2A;&#x7279;&#x4F8B;&#xFF0C;<code>vue</code> &#x9ED8;&#x8BA4;&#x4F1A;&#x76D1;&#x542C;&#x7EC4;&#x4EF6;&#x7684; <code>input</code> &#x4E8B;&#x4EF6;&#xFF0C;&#x800C;&#x4E14;&#x4F1A;&#x628A;&#x5B50;&#x7EC4;&#x4EF6;&#x91CC;&#x9762;&#x4F20;&#x51FA;&#x6765;&#x7684;&#x503C;&#xFF0C;&#x8D4B;&#x7ED9;&#x5F53;&#x524D;&#x7ED1;&#x5B9A;&#x5230; <code>v-model</code> &#x4E0A;&#x7684;&#x503C;</p><p>&#x6B63;&#x5E38;&#x7528;&#x6CD5; - &#x7236;&#x7EC4;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;subComponent :data=&quot;param&quot; @dataChange=&quot;dataChangeHandler&quot;&gt;&lt;/subComponent&gt;
&lt;/template&gt;

&lt;script &gt;
  export default {
    data () {
      return {
        param:&apos;xxxxxx&apos;
      }
    },
    methods:{
      dataChangeHandler (newParam) {
        this.param = newParam
      }
    }
  }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code class="vue"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">subComponent</span> <span class="hljs-attr">:data</span>=<span class="hljs-string">&quot;param&quot;</span> @<span class="hljs-attr">dataChange</span>=<span class="hljs-string">&quot;dataChangeHandler&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">subComponent</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> &gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data () {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">param</span>:<span class="hljs-string">&apos;xxxxxx&apos;</span>
      }
    },
    <span class="hljs-attr">methods</span>:{
      dataChangeHandler (newParam) {
        <span class="hljs-keyword">this</span>.param = newParam
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x6B63;&#x5E38;&#x7528;&#x6CD5; - &#x5B50;&#x7EC4;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script &gt;
  export default {
    methods:{
      updateData (newParam) {
        this.$emit(&apos;dataChange&apos;,newParam)
      }
    }
  }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code class="vue"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> &gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">methods</span>:{
      updateData (newParam) {
        <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">&apos;dataChange&apos;</span>,newParam)
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p><strong>&#x5229;&#x7528;&#x9ED8;&#x8BA4; <code>input</code> &#x4E8B;&#x4EF6; - &#x7236;&#x7EC4;&#x4EF6;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;subComponent  v-model=&quot;param&quot;&gt;&lt;/subComponent&gt;
&lt;/template&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code class="vue"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">subComponent</span>  <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;param&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">subComponent</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre><p><strong>&#x5229;&#x7528;&#x9ED8;&#x8BA4; <code>input</code> &#x4E8B;&#x4EF6; - &#x5B50;&#x7EC4;&#x4EF6;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script &gt;
  export default {
    methods:{
      updateData (newParam) {
        this.$emit(&apos;input&apos;,newParam)
      }
    }
  }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code class="vue"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> &gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">methods</span>:{
      updateData (newParam) {
        <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">&apos;input&apos;</span>,newParam)
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x8FD9;&#x6837;&#xFF0C;&#x6211;&#x4EEC;&#x5C31;&#x80FD;&#x7701;&#x6389;&#x7236;&#x7EC4;&#x4EF6;&#x4E0A;&#x7684;&#x4E00;&#x5217;&#x5E2D;&#x5904;&#x7406;&#x4EE3;&#x7801;&#xFF0C;<code>vue</code> &#x4F1A;&#x81EA;&#x52A8;&#x5E2E;&#x4F60;&#x5904;&#x7406;&#x597D;</p><blockquote>tip: &#x8FD9;&#x79CD;&#x65B9;&#x6CD5;&#x53EA;&#x9002;&#x7528;&#x4E8E;&#x6539;&#x53D8;&#x5355;&#x4E2A;&#x503C;&#x7684;&#x60C5;&#x51B5;&#xFF0C;&#x4E14;&#x5B50;&#x7EC4;&#x4EF6;&#x5BF9;&#x7236;&#x7EC4;&#x4EF6;&#x53EA;&#x9700;&#x7B80;&#x5355;&#x7684;&#x4F20;&#x503C;&#xFF0C;&#x4E0D;&#x9700;&#x8981;&#x5176;&#x4ED6;&#x9644;&#x52A0;&#x64CD;&#x4F5C;(&#x5982;&#x66F4;&#x65B0;&#x5217;&#x8868;)&#x7684;&#x60C5;&#x51B5;&#x3002;</blockquote><p><strong>&#x8865;&#x5145;&#x4E00;&#x4E2A; <code>this.$emit(&apos;update:fidldName&apos;,value)</code> &#x65B9;&#x6CD5; (&#x611F;&#x8C22;&#x6398;&#x91D1;&#x7528;&#x6237; <code>@&#x65E5;&#x6708;&#x4E3A;&#x6613;&#x3002;</code> &#x6307;&#x51FA;)</strong><br>&#x5177;&#x4F53;&#x7528;&#x6CD5;&#x5982;&#x4E0B;:</p><p>&#x7236;&#x7EC4;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;subComponent field1.sync=&quot;param1&quot; field2.sync=&quot;param2&quot;&gt;&lt;/subComponent&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code class="vue" style="word-break:break-word;white-space:initial">    <span class="hljs-tag">&lt;<span class="hljs-name">subComponent</span> <span class="hljs-attr">field1.sync</span>=<span class="hljs-string">&quot;param1&quot;</span> <span class="hljs-attr">field2.sync</span>=<span class="hljs-string">&quot;param2&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">subComponent</span>&gt;</span></code></pre><p>&#x5B50;&#x7EC4;&#x4EF6;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script &gt;
  export default {
    methods:{
      updateData1 (newValue) {
        this.$emit(&apos;update:field1&apos;,newValue)
      },
      updateData2 (newValue) {
        this.$emit(&apos;update:field2&apos;,newValue)
      }
    }
  }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">&lt;script &gt;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">methods</span>:{
      updateData1 (newValue) {
        <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">&apos;update:field1&apos;</span>,newValue)
      },
      updateData2 (newValue) {
        <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">&apos;update:field2&apos;</span>,newValue)
      }
    }
  }
&lt;<span class="hljs-regexp">/script&gt;</span></code></pre><p>&#x8BE5;&#x65B9;&#x6CD5;,&#x4E2A;&#x4EBA;&#x8BA4;&#x4E3A;&#x6BD4;&#x8F83;&#x9002;&#x7528;&#x4E8E; &#x8981;&#x66F4;&#x65B0;&#x7684;&#x6570;&#x636E;&#x4E0D;&#x80FD;&#x7ED1;&#x5B9A;&#x5728; <code>v-model</code> &#x7684;&#x60C5;&#x51B5;&#x4E0B;,&#x6216;&#x8005;&#x8981;&#x53CC;&#x5411;&#x901A;&#x4FE1;&#x7684;&#x6570;&#x636E;&#x5927;&#x4E8E; 1 &#x4E2A;(1&#x4E2A;&#x4E5F;&#x53EF;&#x4EE5;&#x7528;,&#x4F46;&#x6211;&#x4E2A;&#x4EBA;&#x66F4;&#x63A8;&#x8350; <code>input</code> &#x7684;&#x65B9;&#x5F0F;, &#x770B;&#x4E2A;&#x4EBA;&#x559C;&#x597D;&#x5427;),&#x4F46;&#x53C8;&#x4E0D;&#x4F1A;&#x5F88;&#x591A;&#x7684;&#x60C5;&#x51B5;&#x4E0B;.</p></li><li><p><strong><code>conponents</code>&#x653E;&#x5728; <code>Vue options</code> &#x7684;&#x6700;&#x4E0A;&#x9762;</strong></p><p>&#x4E0D;&#x77E5;&#x9053;&#x5927;&#x5BB6;&#x6709;&#x6CA1;&#x6709;&#x8FD9;&#x6837;&#x7684;&#x7ECF;&#x5386;: &#x5BFC;&#x5165;&#x7EC4;&#x4EF6;&#xFF0C;&#x7136;&#x540E;&#x5728;&#x4E5F;&#x9875;&#x9762;&#x4E2D;&#x4F7F;&#x7528;&#xFF0C;&#x597D;&#x7684;&#xFF0C;&#x62A5;&#x9519;&#x4E86;&#xFF0C;&#x4E3A;&#x5565;&#xFF1F;&#x5FD8;&#x8BB0;&#x6CE8;&#x518C;&#x7EC4;&#x4EF6;&#x4E86;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x4F1A;&#x7ECF;&#x5E38;&#x5FD8;&#x8BB0;&#x6CE8;&#x518C;&#x7EC4;&#x4EF6;&#x5462;&#xFF1F;&#x56E0;&#x4E3A;&#x6B63;&#x5E38;&#x7684;&#x4E00;&#x4E2A; <code>vue</code> &#x5B9E;&#x4F8B;&#x7684;&#x7ED3;&#x6784;&#x5927;&#x6982;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import xxx form &apos;xxx/xxx&apos;
export default {
  name: &apos;component-name&apos;,
  data () {
    return {
      // ...&#x6839;&#x636E;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x7684;&#x590D;&#x6742;&#x7A0B;&#x5EA6;&#xFF0C;&#x8FD9;&#x91CC;&#x7701;&#x7565;&#x82E5;&#x5E72;&#x884C;
    }
  },
  computed: {
    // ...&#x6839;&#x636E;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x7684;&#x590D;&#x6742;&#x7A0B;&#x5EA6;&#xFF0C;&#x8FD9;&#x91CC;&#x7701;&#x7565;&#x82E5;&#x5E72;&#x884C;
  },
  created () {
    // ...&#x6839;&#x636E;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x7684;&#x590D;&#x6742;&#x7A0B;&#x5EA6;&#xFF0C;&#x8FD9;&#x91CC;&#x7701;&#x7565;&#x82E5;&#x5E72;&#x884C;
  },
  mounted () {
    // ...&#x6839;&#x636E;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x7684;&#x590D;&#x6742;&#x7A0B;&#x5EA6;&#xFF0C;&#x8FD9;&#x91CC;&#x7701;&#x7565;&#x82E5;&#x5E72;&#x884C;
  },
  methods () {
    // ...&#x6839;&#x636E;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x7684;&#x590D;&#x6742;&#x7A0B;&#x5EA6;&#xFF0C;&#x8FD9;&#x91CC;&#x7701;&#x7565;&#x82E5;&#x5E72;&#x884C;
  },
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> xxx form <span class="hljs-string">&apos;xxx/xxx&apos;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;component-name&apos;</span>,
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-comment">// ...&#x6839;&#x636E;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x7684;&#x590D;&#x6742;&#x7A0B;&#x5EA6;&#xFF0C;&#x8FD9;&#x91CC;&#x7701;&#x7565;&#x82E5;&#x5E72;&#x884C;</span>
    }
  },
  <span class="hljs-attr">computed</span>: {
    <span class="hljs-comment">// ...&#x6839;&#x636E;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x7684;&#x590D;&#x6742;&#x7A0B;&#x5EA6;&#xFF0C;&#x8FD9;&#x91CC;&#x7701;&#x7565;&#x82E5;&#x5E72;&#x884C;</span>
  },
  created () {
    <span class="hljs-comment">// ...&#x6839;&#x636E;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x7684;&#x590D;&#x6742;&#x7A0B;&#x5EA6;&#xFF0C;&#x8FD9;&#x91CC;&#x7701;&#x7565;&#x82E5;&#x5E72;&#x884C;</span>
  },
  mounted () {
    <span class="hljs-comment">// ...&#x6839;&#x636E;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x7684;&#x590D;&#x6742;&#x7A0B;&#x5EA6;&#xFF0C;&#x8FD9;&#x91CC;&#x7701;&#x7565;&#x82E5;&#x5E72;&#x884C;</span>
  },
  methods () {
    <span class="hljs-comment">// ...&#x6839;&#x636E;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x7684;&#x590D;&#x6742;&#x7A0B;&#x5EA6;&#xFF0C;&#x8FD9;&#x91CC;&#x7701;&#x7565;&#x82E5;&#x5E72;&#x884C;</span>
  },
}</code></pre><p>&#x6211;&#x4E0D;&#x77E5;&#x9053;&#x5927;&#x5BB6;&#x6B63;&#x5E38;&#x662F;&#x628A; <code>components</code> &#x5C5E;&#x6027;&#x653E;&#x5728;&#x54EA;&#x4E2A;&#x4F4D;&#x7F6E;&#xFF0C;&#x53CD;&#x6B63;&#x6211;&#x4E4B;&#x524D;&#x662F;&#x653E;&#x5728;&#x6700;&#x5E95;&#x4E0B;&#xFF0C;&#x7ED3;&#x679C;&#x5C31;&#x662F;&#x5BFC;&#x81F4;&#x7ECF;&#x5E38;&#x72AF;&#x4E0A;&#x8FF0;&#x9519;&#x8BEF;&#x3002;</p><p>&#x540E;&#x9762;&#x6211;&#x628A; <code>components</code> &#x8C03;&#x5230;&#x7B2C;&#x4E00;&#x4E2A;&#x53BB;&#x4E86;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import xxx form &apos;xxx/xxx&apos;
export default {
  components: {
    xxx
  },
  // &#x7701;&#x7565;&#x5176;&#x4ED6;&#x4EE3;&#x7801;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> xxx form <span class="hljs-string">&apos;xxx/xxx&apos;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">components</span>: {
    xxx
  },
  <span class="hljs-comment">// &#x7701;&#x7565;&#x5176;&#x4ED6;&#x4EE3;&#x7801;</span>
}</code></pre><p>&#x4ECE;&#x6B64;&#x4EE5;&#x540E;&#xFF0C;&#x5988;&#x5988;&#x518D;&#x4E5F;&#x4E0D;&#x7528;&#x62C5;&#x5FC3;&#x6211;&#x5FD8;&#x8BB0;&#x6CE8;&#x518C;&#x7EC4;&#x4EF6;&#x4E86;&#xFF0C;&#x5BFC;&#x5165;&#x548C;&#x6CE8;&#x518C;&#x90FD;&#x5728;&#x540C;&#x4E00;&#x4E2A;&#x4F4D;&#x7F6E;&#xFF0C;&#x60F3;&#x5FD8;&#x8BB0;&#x90FD;&#x96BE;&#x3002;</p></li><li><p><strong>&#x5927;&#x90E8;&#x5206;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x751F;&#x547D;&#x5468;&#x671F;&#x91CC;&#x9762;&#xFF0C;&#x4E0D;&#x8981;&#x6709;&#x592A;&#x591A;&#x884C;&#x4EE3;&#x7801;&#xFF0C;&#x53EF;&#x4EE5;&#x5C01;&#x88C5;&#x6210;&#x65B9;&#x6CD5;&#xFF0C;&#x518D;&#x8C03;&#x7528;</strong></p><p>&#x770B;&#x8FC7;&#x5F88;&#x591A;&#x4EE3;&#x7801;&#xFF0C;&#x5305;&#x62EC;&#x6211;&#x81EA;&#x5DF1;&#x4E4B;&#x524D;&#x7684;&#xFF0C;&#x5728;&#x751F;&#x547D;&#x5468;&#x671F;&#x91CC;&#x9762;&#x6D0B;&#x6D0B;&#x6D12;&#x6D12;&#x7684;&#x5199;&#x4E86;&#x4E00;&#x4E24;&#x767E;&#x884C;&#x7684;&#x4EE3;&#x7801;&#xFF0C;&#x5982;&#xFF1A;&#x628A;&#x9875;&#x9762;&#x52A0;&#x8F7D;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x8BE5;&#x505A;&#x7684;&#x4E8B;&#xFF0C;&#x5168;&#x90E8;&#x5199;&#x5728; <code>created</code> &#x91CC;&#x9762;&#xFF0C;&#x5BFC;&#x81F4;&#x6574;&#x4E2A;&#x4EE3;&#x7801;&#x96BE;&#x4EE5;&#x9605;&#x8BFB;&#xFF0C;&#x5B8C;&#x5168;&#x4E0D;&#x77E5;&#x9053;&#x4F60;&#x5728;&#x9875;&#x9762;&#x52A0;&#x8F7D;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x505A;&#x4E86;&#x4E9B;&#x4EC0;&#x4E48;&#xFF0C;<br>&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#xFF0C;&#x6211;&#x4EEC;&#x4E0D;&#x59A8;&#x628A;&#x90A3;&#x4E9B;&#x903B;&#x8F91;&#x5C01;&#x88C5;&#x6210;&#x65B9;&#x6CD5;&#xFF0C;&#x7136;&#x540E;&#x5728;&#x751F;&#x547D;&#x5468;&#x671F;&#x91CC;&#x9762;&#x76F4;&#x63A5;&#x8C03;&#x7528;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="created () {
  // &#x83B7;&#x53D6;&#x7528;&#x6237;&#x4FE1;&#x606F;
  this.getUserInfo()
  // &#x83B7;&#x53D6;&#x7CFB;&#x7EDF;&#x4FE1;&#x606F;
  this.getSystemInfo()
  // &#x83B7;&#x53D6;&#x914D;&#x7F6E;
  this.getConfigInfo()
},
methods:{
  // &#x83B7;&#x53D6;&#x7528;&#x6237;&#x4FE1;&#x606F;
  getUserInfo () {...},
  // &#x83B7;&#x53D6;&#x7CFB;&#x7EDF;&#x4FE1;&#x606F;
  getSystemInfo () {...},
  // &#x83B7;&#x53D6;&#x914D;&#x7F6E;
  getConfigInfo () {...},
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">created () {
  <span class="hljs-comment">// &#x83B7;&#x53D6;&#x7528;&#x6237;&#x4FE1;&#x606F;</span>
  <span class="hljs-keyword">this</span>.getUserInfo()
  <span class="hljs-comment">// &#x83B7;&#x53D6;&#x7CFB;&#x7EDF;&#x4FE1;&#x606F;</span>
  <span class="hljs-keyword">this</span>.getSystemInfo()
  <span class="hljs-comment">// &#x83B7;&#x53D6;&#x914D;&#x7F6E;</span>
  <span class="hljs-keyword">this</span>.getConfigInfo()
},
<span class="hljs-attr">methods</span>:{
  <span class="hljs-comment">// &#x83B7;&#x53D6;&#x7528;&#x6237;&#x4FE1;&#x606F;</span>
  getUserInfo () {...},
  <span class="hljs-comment">// &#x83B7;&#x53D6;&#x7CFB;&#x7EDF;&#x4FE1;&#x606F;</span>
  getSystemInfo () {...},
  <span class="hljs-comment">// &#x83B7;&#x53D6;&#x914D;&#x7F6E;</span>
  getConfigInfo () {...},
}</code></pre><p>&#x8FD9;&#x6837;&#x662F;&#x4E0D;&#x662F;&#x4E00;&#x773C;&#x5C31;&#x80FD;&#x770B;&#x7684;&#x51FA;&#xFF0C;&#x4F60;&#x5728;&#x9875;&#x9762;&#x52A0;&#x8F7D;&#x7684;&#x65F6;&#x5019;&#x505A;&#x4E86;&#x4E9B;&#x4EC0;&#x4E48;&#xFF1F;</p><blockquote>tip: &#x8FD9;&#x4E2A;&#x5E94;&#x8BE5;&#x7B97;&#x662F;&#x4E00;&#x4E2A;&#x7EA6;&#x5B9A;&#x4FD7;&#x6210;&#x7684;&#x89C4;&#x8303;&#x5427;&#xFF0C;&#x53EA;&#x662F;&#x89C9;&#x5F97;&#x770B;&#x7684;&#x6BD4;&#x8F83;&#x591A;&#x8FD9;&#x6837;&#x5199;&#x7684;&#xFF0C;&#x52A0;&#x4E0A;&#x6211;&#x81EA;&#x5DF1;&#x521D;&#x5B66;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4E5F;&#x8FD9;&#x4E48;&#x505A;&#x4E86;&#xFF0C;&#x6240;&#x4EE5;&#x5199;&#x51FA;&#x6765;&#xFF0C;&#x5E0C;&#x671B;&#x65B0;&#x5165;&#x5751;&#x7684;&#x540C;&#x5B66;&#x80FD;&#x907F;&#x514D;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;</blockquote></li><li><strong>&#x5C11;&#x7528; <code>watch</code>&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x89C9;&#x5F97;&#x4F60;&#x597D;&#x591A;&#x5730;&#x65B9;&#x90FD;&#x9700;&#x8981;&#x7528;&#x5230; <code>watch</code>&#xFF0C;&#x90A3;&#x5341;&#x6709;&#x516B;&#x4E5D;&#x662F;&#x4F60;&#x5BF9; <code>vue</code> &#x7684; <code>API</code> &#x8FD8;&#x4E0D;&#x591F;&#x4E86;&#x89E3;</strong><p><code>vue</code> &#x672C;&#x8EAB;&#x5C31;&#x662F;&#x4E00;&#x4E2A;&#x6570;&#x636E;&#x9A71;&#x52A8;&#x7684;&#x6846;&#x67B6;&#xFF0C;&#x6570;&#x636E;&#x7684;&#x53D8;&#x52A8;&#xFF0C;&#x80FD;&#x5B9E;&#x65F6;&#x53CD;&#x9988;&#x5230;&#x89C6;&#x56FE;&#x4E0A;&#x53BB;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x60F3;&#x8981;&#x6839;&#x636E;&#x6570;&#x636E;&#x6765;&#x63A7;&#x5236;&#x8BD5;&#x56FE;&#xFF0C;&#x6B63;&#x5E38;&#x60C5;&#x51B5;&#x4E00;&#x4E0B;&#x914D;&#x5408; <code>computed</code> &#x670D;&#x7528;&#x5C31;&#x80FD;&#x89E3;&#x51B3;&#x5927;&#x90E8;&#x5206;&#x95EE;&#x9898;&#x4E86;&#xFF0C;&#x800C;&#x89C6;&#x56FE;&#x4E0A;&#x7684;&#x53D8;&#x52A8;&#xFF0C;&#x6211;&#x4EEC;&#x4E00;&#x822C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x76D1;&#x542C; <code>input</code> <code>change</code> &#x7B49;&#x4E8B;&#x4EF6;&#xFF0C;&#x8FBE;&#x5230;&#x5B9E;&#x65F6;&#x76D1;&#x542C;&#x7684;&#x76EE;&#x7684;&#xFF0C;<br>&#x6240;&#x4EE5;&#x5F88;&#x5C11;&#x6709;&#x9700;&#x6C42;&#x4F7F;&#x7528;&#x5230; <code>watch</code> &#x7684;&#x65F6;&#x5019;,&#x81F3;&#x5C11;&#x6211;&#x6700;&#x8FD1;&#x5230;&#x7684;&#x5341;&#x6765;&#x4E2A;&#x9879;&#x76EE;&#x91CC;&#x9762;&#xFF0C;&#x662F;&#x6CA1;&#x6709;&#x7528;&#x8FC7; <code>watch</code> &#x5F53;&#x7136;&#xFF0C;&#x5E76;&#x4E0D;&#x662F;&#x8BF4; <code>watch</code> &#x662F;&#x80AF;&#x5B9A;&#x6CA1;&#x7528;&#x5904;, <code>vue</code> &#x63D0;&#x4F9B;&#x8FD9;&#x4E2A;api,&#x80AF;&#x5B9A;&#x662F;&#x6709;&#x4ED6;&#x7684;&#x9053;&#x7406;&#xFF0C;&#x4E5F;&#x6709;&#x90E8;&#x5206;&#x9700;&#x6C42;&#x662F;&#x771F;&#x7684;&#x9700;&#x8981;&#x7528;&#x5230;&#x7684;&#xFF0C;&#x53EA;&#x662F;&#x6211;&#x89C9;&#x5F97;&#x5E94;&#x8BE5;&#x5F88;&#x5C11;&#x7528;&#x5230;&#x624D;&#x5BF9;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x89C9;&#x5F97;&#x5230;&#x5904;&#x90FD;&#x5F97;&#x7528;&#x5230;&#x7684;&#x8BDD;&#xFF0C;<br>&#x90A3;&#x4E48;&#x6211;&#x89C9;&#x5F97; <strong>&#x5341;&#x6709;&#x516B;&#x4E5D;</strong>&#x4F60;&#x5E94;&#x8BE5;&#x591A;&#x53BB;&#x719F;&#x6089;&#x4E00;&#x4E0B; <code>computed</code> &#x548C; <code>vue</code> &#x7684;&#x5176;&#x4ED6; <code>api</code> &#x4E86;</p></li></ol><h3 id="articleHeader1">&#x6700;&#x540E;</h3><p><a href="https://github.com/noahlam/articles" rel="nofollow noreferrer" target="_blank">&#x672C;&#x6587;&#x7684;github&#x5730;&#x5740;</a> &#x6B22;&#x8FCE;&#x968F;&#x610F;<a href="https://github.com/noahlam/articles" rel="nofollow noreferrer" target="_blank">star</a>,<a href="https://github.com/noahlam" rel="nofollow noreferrer" target="_blank">follow</a>, &#x548C; &#x4E0D;&#x968F;&#x610F;&#x7684; <a href="https://github.com/noahlam/articles/issues" rel="nofollow noreferrer" target="_blank">issue</a></p><p>&#x53E6;&#x5916;&#xFF0C;<a href="https://github.com/noahlam/articles" rel="nofollow noreferrer" target="_blank">github</a>&#x4E0A;&#x8FD8;&#x6709;&#x5176;&#x4ED6;&#x4E00;&#x4E9B;&#x5173;&#x4E8E;&#x524D;&#x7AEF;&#x7684;&#x6559;&#x7A0B;&#x548C;&#x7EC4;&#x4EF6;&#xFF0C;<br>&#x6709;&#x5174;&#x8DA3;&#x7684;&#x7AE5;&#x978B;&#x53EF;&#x4EE5;&#x770B;&#x770B;&#xFF0C;&#x4F60;&#x4EEC;&#x7684;&#x652F;&#x6301;&#x5C31;&#x662F;&#x6211;&#x6700;&#x5927;&#x7684;&#x52A8;&#x529B;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue 实践技巧合集

## 原文链接
[https://segmentfault.com/a/1190000016035831](https://segmentfault.com/a/1190000016035831)

