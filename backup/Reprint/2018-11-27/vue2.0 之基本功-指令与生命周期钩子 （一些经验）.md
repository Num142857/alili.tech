---
title: 'vue2.0 之基本功-指令与生命周期钩子 （一些经验）' 
date: 2018-11-27 2:30:12
hidden: true
slug: ag4yjs5pddl
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x524D;&#x8A00;</h2><p>&#x63A5;&#x89E6;vue&#x4E5F;&#x6709;&#x4E00;&#x5E74;&#x591A;&#x7684;&#x65F6;&#x95F4;&#x4E86;&#xFF0C;&#x4E00;&#x76F4;&#x6CA1;&#x6709;&#x505A;&#x8BB0;&#x5F55;&#x3002;&#x4F5C;&#x4E3A;&#x4E00;&#x4E2A;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x8005;&#xFF0C;&#x5BF9;&#x6211;&#x800C;&#x8A00;&#xFF0C;vue&#x662F;&#x4E00;&#x4E2A;&#x6B63;&#x786E;&#x7684;&#x9009;&#x62E9;&#x3002;vue&#x7684;&#x6613;&#x7528;&#x6027;&#xFF0C;&#x6E32;&#x67D3;&#x80FD;&#x529B;&#xFF0C;&#x5F00;&#x53D1;&#x6587;&#x6863;&#x7B49;&#x7B49;&#xFF0C;&#x90FD;&#x6BD4;&#x8F83;&#x53CB;&#x597D;&#x3002;&#x6700;&#x8FD1;&#x7684;&#x4E00;&#x6BB5;&#x65F6;&#x95F4;&#x4E5F;&#x5728;&#x505A;react&#x3002;</p><p>&#x4E2A;&#x4EBA;&#x770B;&#x6CD5;&#xFF1A;&#x5BF9;&#x4E8E;&#x6846;&#x67B6;&#xFF0C;&#x81EA;&#x5DF1;&#x89C9;&#x5F97;&#x987A;&#x624B;&#x5C31;&#x884C;&#xFF0C;&#x4F7F;&#x7528;&#x6846;&#x67B6;&#x5C31;&#x8981;&#x5C3D;&#x53EF;&#x80FD;&#x53D1;&#x6325;&#x51FA;&#x6846;&#x67B6;&#x7684;&#x5168;&#x90E8;&#x80FD;&#x91CF;&#xFF0C;html&#x3001;JavaScript&#x3001;css&#x57FA;&#x672C;&#x529F;&#x8981;&#x505A;&#x597D;&#xFF0C;&#x8FD9;&#x6837;&#x4EFB;&#x4F55;js&#x6846;&#x67B6;&#x5BF9;&#x4F60;&#x6765;&#x8BF4;&#x4E0A;&#x624B;&#x90FD;&#x5F88;&#x5FEB;&#x3002;</p><p>&#x5199;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x4E3B;&#x8981;&#x662F;&#x5DE9;&#x56FA;&#x4E00;&#x4E9B;&#x77E5;&#x8BC6;&#x548C;&#x8BB0;&#x5F55;&#x5F00;&#x53D1;&#x4E2D;&#x7684;&#x4E00;&#x4E9B;&#x7ECF;&#x9A8C;&#xFF0C;&#x5BF9;&#x4E8E;&#x521D;&#x5B66;&#x8005;&#x4E5F;&#x6709;&#x4E00;&#x4E9B;&#x5E2E;&#x52A9;&#x3002;</p><p>&#x672C;&#x7BC7;&#x4E3A;&#x57FA;&#x7840;&#x7BC7;&#xFF0C;&#x5982;&#x679C;&#x8FD9;&#x4E9B;&#x5185;&#x5BB9;&#x638C;&#x63E1;&#x4E86;&#xFF0C;&#x90A3;&#x57FA;&#x672C;&#x7684;&#x5F00;&#x53D1;&#x5C31;&#x6CA1;&#x6709;&#x95EE;&#x9898;&#x4E86;&#x3002;&#x4F46;&#x8FD9;&#x8FD8;&#x4E0D;&#x591F;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x5BF9;&#x7EC4;&#x4EF6;&#x3001;&#x8DEF;&#x7531;&#x3001;&#x8FD8;&#x6709;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x6709;&#x6DF1;&#x5165;&#x7684;&#x7406;&#x89E3;&#xFF0C;&#x90A3;&#x4F60;&#x4F1A;&#x662F;&#x4E00;&#x4E2A;&#x4F18;&#x79C0;&#x7684;&#x524D;&#x7AEF;&#x5F00;&#x53D1;&#x8005;&#x3002;&#x7A0D;&#x540E;&#x6211;&#x4E5F;&#x4F1A;&#x628A;&#x6211;&#x7684;&#x7406;&#x89E3;&#x8BB0;&#x5F55;&#x4E0B;&#x6765;&#xFF0C;&#x7ED9;&#x5927;&#x5BB6;&#x5206;&#x4EAB;&#x3002;</p><p>&#x672C;&#x7BC7;&#x5185;&#x5BB9;&#x6709;&#x4E24;&#x90E8;&#x5206;</p><ol><li>&#x6307;&#x4EE4;&#x7684;&#x57FA;&#x672C;&#x7528;&#x6CD5;&#x548C;&#x6CE8;&#x610F;&#x4E8B;&#x9879;</li><li>&#x5468;&#x671F;&#x94A9;&#x5B50;&#x7684;&#x89E3;&#x91CA;&#x548C;&#x6CE8;&#x610F;&#x4E8B;&#x9879;</li></ol><h2 id="articleHeader1">&#x4E00;.&#x5F15;&#x5165;</h2><p>&#x7B2C;&#x4E00;&#x90E8;&#x5F53;&#x7136;&#x662F;&#x5F15;&#x5165;&#x4E86;&#xFF0C;&#x4E24;&#x79CD;&#x65B9;&#x5F0F;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x6807;&#x7B7E;&#x5F15;&#x5165;&#x65B9;&#x5F0F;
&lt;!-- &#x751F;&#x4EA7;&#x73AF;&#x5883;&#x7248;&#x672C;&#xFF0C;&#x4F18;&#x5316;&#x4E86;&#x5C3A;&#x5BF8;&#x548C;&#x901F;&#x5EA6; --&gt;
&lt;script src=&quot;https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js&quot;&gt;&lt;/script&gt;

&#x914D;&#x5408;npm &#x6A21;&#x5757;&#x5316;&#x5F15;&#x5165;
import Vue from &apos;vue&apos;

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>&#x6807;&#x7B7E;&#x5F15;&#x5165;&#x65B9;&#x5F0F;
<span class="hljs-comment">&lt;!-- &#x751F;&#x4EA7;&#x73AF;&#x5883;&#x7248;&#x672C;&#xFF0C;&#x4F18;&#x5316;&#x4E86;&#x5C3A;&#x5BF8;&#x548C;&#x901F;&#x5EA6; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

&#x914D;&#x5408;npm &#x6A21;&#x5757;&#x5316;&#x5F15;&#x5165;
import Vue from &apos;vue&apos;

</code></pre><h2 id="articleHeader2">&#x4E8C;.&#x5B9E;&#x4F8B;&#x5316;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var app = new Vue({
      el: &apos;#app&apos;,//.app||document.getElementById(&apos;app&apos;)
      data: {
        message: &apos;Hello Vue!&apos;
      }
    })
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lasso"><code> <span class="hljs-built_in">var</span> app = <span class="hljs-literal">new</span> Vue({
      el: <span class="hljs-string">&apos;#app&apos;</span>,<span class="hljs-comment">//.app||document.getElementById(&apos;app&apos;)</span>
      <span class="hljs-built_in">data</span>: {
        message: <span class="hljs-string">&apos;Hello Vue!&apos;</span>
      }
    })
</code></pre><p>&#x8868;&#x793A;&#x63D0;&#x4F9B;&#x4E00;&#x4E2A;&#x5728;&#x9875;&#x9762;&#x4E0A;&#x5DF2;&#x5B58;&#x5728;&#x7684; DOM &#x5143;&#x7D20;&#x4F5C;&#x4E3A; Vue &#x5B9E;&#x4F8B;&#x7684;&#x6302;&#x8F7D;&#x76EE;&#x6807;&#x3002;</p><p>el&#xFF1A;&#x53C2;&#x6570;&#x53EF;&#x4EE5;&#x662F;css&#x9009;&#x62E9;&#x5668;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x662F;HTMLElement,&#x4F46;&#x6700;&#x597D;&#x662F;id&#x9009;&#x62E9;&#x5668;&#xFF0C;&#x7528;class&#x9009;&#x62E9;&#x5668;vue&#x4F1A;&#x81EA;&#x52A8;&#x628A;class&#x8F6C;&#x5316;&#x4E3A;id</p><p>&#x4F60;&#x53EF;&#x80FD;&#x4E5F;&#x89C1;&#x8FC7;&#x8FD9;&#x79CD;&#x5199;&#x6CD5;,&#x6548;&#x679C;&#x4E00;&#x6837;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
  data: {
    message: &apos;Hello Vue!&apos;
  }
}).$mount(&apos;#app&apos;)

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haskell"><code><span class="hljs-title">new</span> <span class="hljs-type">Vue</span>({
  <span class="hljs-class"><span class="hljs-keyword">data</span>: {
    <span class="hljs-title">message</span>: &apos;<span class="hljs-type">Hello</span> <span class="hljs-type">Vue</span>!&apos;
  }</span>
}).$mount(&apos;#app&apos;)

</code></pre><h2 id="articleHeader3">&#x4E09;.&#x6307;&#x4EE4;</h2><h2 id="articleHeader4">v-text&#x4E0E;v-html</h2><p>v-text&#x88AB;&#x7F16;&#x8BD1;&#x6210;&#x4E0D;&#x540C;&#x6587;&#x672C;&#xFF0C;v-html&#x4E0D;&#x88AB;&#x7F16;&#x8BD1;&#xFF0C;&#x76F4;&#x63A5;&#x8F93;&#x51FA;&#x6807;&#x7B7E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;span v-text=&quot;msg&quot;&gt;&lt;/span&gt;
&lt;!-- &#x548C;&#x4E0B;&#x9762;&#x7684;&#x4E00;&#x6837; --&gt;
&lt;span&gt;"{{"msg"}}"&lt;/span&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-text</span>=<span class="hljs-string">&quot;msg&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-comment">&lt;!-- &#x548C;&#x4E0B;&#x9762;&#x7684;&#x4E00;&#x6837; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span></span><span class="hljs-template-variable">"{{"msg"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
</span></code></pre><hr><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="testHtml:&lt;i&gt;testHtml&lt;/i&gt;
&lt;span v-html=&quot;testHtml&quot;&gt;&lt;/span&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>testHtml:<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">i</span>&gt;</span>testHtml<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span></span>
&lt;span v-html=<span class="hljs-string">&quot;testHtml&quot;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span></code></pre><p>&#x8F93;&#x51FA;:testHtml</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;span v-text=&quot;testHtml&quot;&gt;&lt;/span&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code style="word-break:break-word;white-space:initial"><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-text</span>=<span class="hljs-string">&quot;testHtml&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></code></pre><p>&#x8F93;&#x51FA; &lt;i&gt;testHtml&lt;/i&gt;</p><h2 id="articleHeader5">v-show&#x4E0E;v-if</h2><p>&#x90FD;&#x53EF;&#x4EE5;&#x8BF4;&#x662F;&#x6761;&#x4EF6;&#x5224;&#x65AD;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;span v-if=&quot;true&quot;&gt;&lt;/span&gt;
&lt;span v-show=&quot;false&quot;&gt;&lt;/span&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>&lt;span v-<span class="hljs-keyword">if</span>=<span class="hljs-string">&quot;true&quot;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>
&lt;span v-show=<span class="hljs-string">&quot;false&quot;</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>
</code></pre><p>v-show dom&#x5143;&#x7D20;&#x5B58;&#x5728;&#xFF0C;&#x6839;&#x636E;&#x8868;&#x8FBE;&#x5F0F;&#x4E4B;&#x771F;&#x5047;&#x503C;&#xFF0C;&#x5207;&#x6362;&#x5143;&#x7D20;&#x7684; display CSS &#x5C5E;&#x6027;&#x3002;</p><p>v-if true&#x5143;&#x7D20;&#x5B58;&#x5728;&#xFF0C;false&#x5143;&#x7D20;&#x4E0D;&#x5B58;&#x5728;&#xFF0C;&#x6839;&#x636E;&#x8868;&#x8FBE;&#x5F0F;&#x7684;&#x503C;&#x7684;&#x771F;&#x5047;&#x6761;&#x4EF6;&#x6E32;&#x67D3;&#x5143;&#x7D20;&#x3002;</p><h2 id="articleHeader6">v-else&#x4E0E;v-else-if</h2><p>&#x6761;&#x4EF6;&#x6E32;&#x67D3;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div v-if=&quot;type === &apos;A&apos;&quot;&gt;
  A
&lt;/div&gt;
&lt;div v-else-if=&quot;type === &apos;B&apos;&quot;&gt;
  B
&lt;/div&gt;
&lt;div v-else-if=&quot;type === &apos;C&apos;&quot;&gt;
  C
&lt;/div&gt;
&lt;div v-else&gt;
  Not A/B/C
&lt;/div&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs cal"><code>&lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">if</span>=<span class="hljs-string">&quot;type === &apos;A&apos;&quot;</span>&gt;
  A
&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">else</span>-<span class="hljs-keyword">if</span>=<span class="hljs-string">&quot;type === &apos;B&apos;&quot;</span>&gt;
  B
&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">else</span>-<span class="hljs-keyword">if</span>=<span class="hljs-string">&quot;type === &apos;C&apos;&quot;</span>&gt;
  C
&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">div</span> v-<span class="hljs-keyword">else</span>&gt;
  <span class="hljs-keyword">Not</span> A/B/C
&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre><h2 id="articleHeader7">v-for</h2><p>&#x5217;&#x8868;&#x6E32;&#x67D3;</p><p>&#x4E3A;&#x4E86;&#x7ED9; Vue &#x4E00;&#x4E2A;&#x63D0;&#x793A;&#xFF0C;&#x4EE5;&#x4FBF;&#x5B83;&#x80FD;&#x8DDF;&#x8E2A;&#x6BCF;&#x4E2A;&#x8282;&#x70B9;&#x7684;&#x8EAB;&#x4EFD;&#xFF0C;&#x4ECE;&#x800C;&#x91CD;&#x7528;&#x548C;&#x91CD;&#x65B0;&#x6392;&#x5E8F;&#x73B0;&#x6709;&#x5143;&#x7D20;&#xFF0C;&#x4F60;&#x9700;&#x8981;&#x4E3A;&#x6BCF;&#x9879;&#x63D0;&#x4F9B;&#x4E00;&#x4E2A;&#x552F;&#x4E00; key &#x5C5E;&#x6027;&#x3002;&#x7406;&#x60F3;&#x7684; key &#x503C;&#x662F;&#x6BCF;&#x9879;&#x90FD;&#x6709;&#x7684;&#x4E14;&#x552F;&#x4E00;&#x7684; id&#x3002;</p><p>&#x5EFA;&#x8BAE;&#x5C3D;&#x53EF;&#x80FD;&#x5728;&#x4F7F;&#x7528; v-for &#x65F6;&#x63D0;&#x4F9B; key&#xFF0C;&#x9664;&#x975E;&#x904D;&#x5386;&#x8F93;&#x51FA;&#x7684; DOM &#x5185;&#x5BB9;&#x975E;&#x5E38;&#x7B80;&#x5355;&#xFF0C;&#x6216;&#x8005;&#x662F;&#x523B;&#x610F;&#x4F9D;&#x8D56;&#x9ED8;&#x8BA4;&#x884C;&#x4E3A;&#x4EE5;&#x83B7;&#x53D6;&#x6027;&#x80FD;&#x4E0A;&#x7684;&#x63D0;&#x5347;&#x3002;</p><p>&#x5F00;&#x53D1;&#x4E2D;&#x4F60;&#x4F1A;&#x9047;&#x5230;&#x7684;&#x4E8B;&#x60C5;&#xFF1A;&#x7ED1;&#x5B9A;&#x4E8B;&#x4EF6;&#xFF0C;&#x83B7;&#x53D6;&#x7D22;&#x5F15;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div v-for=&quot;(item,index) in items&quot; :key=&quot;item.id&quot; @click=&quot;toggle(index)&quot;&gt;
  "{{" item.text "}}"
&lt;/div&gt;
new Vue({
  el: &apos;#app&apos;,
  data: function() {
    return {
      items: [{
        id:1,
        content: &apos;1 item&apos;,
      }, {
        id:2,
        content: &apos;2 item&apos;,
      }, {
        id:3,
        content: &apos;3 item&apos;,
      }]
    }
  },
  methods: {
    toggle: function(index) {
        alert(this.items[index].content)
    }
  }
})
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs vim"><code>&lt;div v-<span class="hljs-keyword">for</span>=<span class="hljs-string">&quot;(item,index) in items&quot;</span> :key=<span class="hljs-string">&quot;item.id&quot;</span> @click=<span class="hljs-string">&quot;toggle(index)&quot;</span>&gt;
  "{{" item.text "}}"
&lt;/div&gt;
<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-keyword">e</span><span class="hljs-variable">l:</span> <span class="hljs-string">&apos;#app&apos;</span>,
  dat<span class="hljs-variable">a:</span> <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> {</span>
    <span class="hljs-keyword">return</span> {
      item<span class="hljs-variable">s:</span> [{
        id:<span class="hljs-number">1</span>,
        conten<span class="hljs-variable">t:</span> <span class="hljs-string">&apos;1 item&apos;</span>,
      }, {
        id:<span class="hljs-number">2</span>,
        conten<span class="hljs-variable">t:</span> <span class="hljs-string">&apos;2 item&apos;</span>,
      }, {
        id:<span class="hljs-number">3</span>,
        conten<span class="hljs-variable">t:</span> <span class="hljs-string">&apos;3 item&apos;</span>,
      }]
    }
  },
  method<span class="hljs-variable">s:</span> {
    toggle: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(index)</span> {</span>
        alert(this.<span class="hljs-built_in">items</span>[<span class="hljs-built_in">index</span>].content)
    }
  }
})
</code></pre><h2 id="articleHeader8">&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x7684; v-for</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
  el: &apos;#v-for-object&apos;,
  data: {
    object: {
      firstName: &apos;John&apos;,
      lastName: &apos;Doe&apos;,
      age: 30
    }
  }
})

&lt;div v-for=&quot;(value, key, index) in object&quot;&gt;
  "{{" index "}}". "{{" key "}}": "{{" value "}}"
&lt;/div&gt;

0. firstName: John
1. lastName: Doe
2. age: 30
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code>new Vue({
  el: <span class="hljs-string">&apos;#v-for-object&apos;</span>,
  data: {
    object: {
      firstName: <span class="hljs-string">&apos;John&apos;</span>,
      lastName: <span class="hljs-string">&apos;Doe&apos;</span>,
      age: <span class="hljs-number">30</span>
    }
  }
})

&lt;div v-for=<span class="hljs-string">&quot;(value, key, index) in object&quot;</span>&gt;
  "{{" index "}}". "{{" key "}}": "{{" value "}}"
&lt;/div&gt;

<span class="hljs-number">0</span>. firstName: John
<span class="hljs-number">1</span>. lastName: Doe
<span class="hljs-number">2</span>. age: <span class="hljs-number">30</span>
</code></pre><h2 id="articleHeader9">v-on</h2><p>&#x4E8B;&#x4EF6;&#x6307;&#x4EE4;<br>&#x7F29;&#x5199; @<br>&#x90E8;&#x5206;&#x4FEE;&#x9970;&#x7B26;&#xFF0C;&#x5F00;&#x53D1;&#x4E2D;&#x8FD9;&#x4E24;&#x4E2A;&#x57FA;&#x672C;&#x5C31;&#x591F;&#x4E86;</p><p>.stop - &#x8C03;&#x7528; event.stopPropagation()&#x3002;<br>.prevent - &#x8C03;&#x7528; event.preventDefault()&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!-- &#x65B9;&#x6CD5;&#x5904;&#x7406;&#x5668; --&gt;
&lt;button v-on:click=&quot;doThis&quot;&gt;&lt;/button&gt;

&lt;!-- &#x5185;&#x8054;&#x8BED;&#x53E5; --&gt;
&lt;button v-on:click=&quot;doThat(&apos;hello&apos;, $event)&quot;&gt;&lt;/button&gt;

&lt;!-- &#x7F29;&#x5199; --&gt;
&lt;button @click=&quot;doThis&quot;&gt;&lt;/button&gt;

&lt;!-- &#x505C;&#x6B62;&#x5192;&#x6CE1; --&gt;
&lt;button @click.stop=&quot;doThis&quot;&gt;&lt;/button&gt;

&lt;!-- &#x963B;&#x6B62;&#x9ED8;&#x8BA4;&#x884C;&#x4E3A; --&gt;
&lt;button @click.prevent=&quot;doThis&quot;&gt;&lt;/button&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- &#x65B9;&#x6CD5;&#x5904;&#x7406;&#x5668; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">&quot;doThis&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-comment">&lt;!-- &#x5185;&#x8054;&#x8BED;&#x53E5; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">&quot;doThat(&apos;hello&apos;, $event)&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-comment">&lt;!-- &#x7F29;&#x5199; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;doThis&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-comment">&lt;!-- &#x505C;&#x6B62;&#x5192;&#x6CE1; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click.stop</span>=<span class="hljs-string">&quot;doThis&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-comment">&lt;!-- &#x963B;&#x6B62;&#x9ED8;&#x8BA4;&#x884C;&#x4E3A; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click.prevent</span>=<span class="hljs-string">&quot;doThis&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
</code></pre><h2 id="articleHeader10">v-bind</h2><p>&#x5C5E;&#x6027;&#x7ED1;&#x5B9A;<br>&#x7F29;&#x5199; &#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!-- &#x7ED1;&#x5B9A;&#x4E00;&#x4E2A;&#x5C5E;&#x6027; --&gt;
&lt;img v-bind:src=&quot;imageSrc&quot;&gt;

&lt;!-- &#x7F29;&#x5199; --&gt;
&lt;img :src=&quot;imageSrc&quot;&gt;

&lt;!-- class &#x7ED1;&#x5B9A; --&gt;
&lt;div :class=&quot;{ red: isRed }&quot;&gt;&lt;/div&gt;
&lt;div :class=&quot;[classA, classB]&quot;&gt;&lt;/div&gt;
&lt;div :class=&quot;[classA, { classB: isB, classC: isC }]&quot;&gt;

&lt;!-- style &#x7ED1;&#x5B9A; --&gt;
&lt;div :style=&quot;{ fontSize: size + &apos;px&apos; }&quot;&gt;&lt;/div&gt;
&lt;div :style=&quot;[styleObjectA, styleObjectB]&quot;&gt;&lt;/div&gt;

&lt;!-- &#x7ED1;&#x5B9A;&#x4E00;&#x4E2A;&#x6709;&#x5C5E;&#x6027;&#x7684;&#x5BF9;&#x8C61; --&gt;
&lt;div v-bind=&quot;{ id: someProp, &apos;other-attr&apos;: otherProp }&quot;&gt;&lt;/div&gt;

&lt;!-- &#x901A;&#x8FC7; prop &#x4FEE;&#x9970;&#x7B26;&#x7ED1;&#x5B9A; DOM &#x5C5E;&#x6027; --&gt;
&lt;div v-bind:text-content.prop=&quot;text&quot;&gt;&lt;/div&gt;

&lt;!-- prop &#x7ED1;&#x5B9A;&#x3002;&#x201C;prop&#x201D;&#x5FC5;&#x987B;&#x5728; my-component &#x4E2D;&#x58F0;&#x660E;&#x3002;--&gt;
&lt;my-component :prop=&quot;someThing&quot;&gt;&lt;/my-component&gt;

&lt;!-- &#x901A;&#x8FC7; $props &#x5C06;&#x7236;&#x7EC4;&#x4EF6;&#x7684; props &#x4E00;&#x8D77;&#x4F20;&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6; --&gt;
&lt;child-component v-bind=&quot;$props&quot;&gt;&lt;/child-component&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dust"><code><span class="xml"><span class="hljs-comment">&lt;!-- &#x7ED1;&#x5B9A;&#x4E00;&#x4E2A;&#x5C5E;&#x6027; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">v-bind:src</span>=<span class="hljs-string">&quot;imageSrc&quot;</span>&gt;</span>

<span class="hljs-comment">&lt;!-- &#x7F29;&#x5199; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">:src</span>=<span class="hljs-string">&quot;imageSrc&quot;</span>&gt;</span>

<span class="hljs-comment">&lt;!-- class &#x7ED1;&#x5B9A; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">&quot;</span></span></span><span class="hljs-template-variable">{ red: isRed }</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">&quot;[classA, classB]&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">:class</span>=<span class="hljs-string">&quot;[classA, </span></span></span><span class="hljs-template-variable">{ classB: isB, classC: isC }</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">]&quot;</span>&gt;</span>

<span class="hljs-comment">&lt;!-- style &#x7ED1;&#x5B9A; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">&quot;</span></span></span><span class="hljs-template-variable">{ fontSize: size + &apos;px&apos; }</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">:style</span>=<span class="hljs-string">&quot;[styleObjectA, styleObjectB]&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- &#x7ED1;&#x5B9A;&#x4E00;&#x4E2A;&#x6709;&#x5C5E;&#x6027;&#x7684;&#x5BF9;&#x8C61; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-bind</span>=<span class="hljs-string">&quot;</span></span></span><span class="hljs-template-variable">{ id: someProp, &apos;other-attr&apos;: otherProp }</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- &#x901A;&#x8FC7; prop &#x4FEE;&#x9970;&#x7B26;&#x7ED1;&#x5B9A; DOM &#x5C5E;&#x6027; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-bind:text-content.prop</span>=<span class="hljs-string">&quot;text&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- prop &#x7ED1;&#x5B9A;&#x3002;&#x201C;prop&#x201D;&#x5FC5;&#x987B;&#x5728; my-component &#x4E2D;&#x58F0;&#x660E;&#x3002;--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">my-component</span> <span class="hljs-attr">:prop</span>=<span class="hljs-string">&quot;someThing&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">my-component</span>&gt;</span>

<span class="hljs-comment">&lt;!-- &#x901A;&#x8FC7; $props &#x5C06;&#x7236;&#x7EC4;&#x4EF6;&#x7684; props &#x4E00;&#x8D77;&#x4F20;&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">child-component</span> <span class="hljs-attr">v-bind</span>=<span class="hljs-string">&quot;$props&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">child-component</span>&gt;</span>
</span></code></pre><h2 id="articleHeader11">v-model</h2><p>&#x8868;&#x5355;&#x63A7;&#x4EF6;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;<br>&#x9650;&#x5236;</p><ul><li>&lt;input&gt;</li><li>&lt;select&gt;</li><li>&lt;textarea&gt;</li></ul><p>&#x4FEE;&#x9970;&#x7B26;</p><ul><li>.lazy - &#x53D6;&#x4EE3; input &#x76D1;&#x542C; change &#x4E8B;&#x4EF6;</li><li>.number - &#x8F93;&#x5165;&#x5B57;&#x7B26;&#x4E32;&#x8F6C;&#x4E3A;&#x6570;&#x5B57;</li><li>.trim - &#x8F93;&#x5165;&#x9996;&#x5C3E;&#x7A7A;&#x683C;&#x8FC7;&#x6EE4;</li></ul><h2 id="articleHeader12">&#x56DB;.&#x5468;&#x671F;&#x94A9;&#x5B50;</h2><p>&#x6CE8;&#x610F;&#xFF1A;&#x975E;&#x5E38;&#x91CD;&#x8981;&#xFF01;&#x975E;&#x5E38;&#x91CD;&#x8981;&#xFF01;&#x975E;&#x5E38;&#x91CD;&#x8981;&#xFF01;</p><p>&#x7406;&#x89E3;&#x4E86;&#x751F;&#x547D;&#x5468;&#x671F;&#x51FD;&#x6570;&#xFF0C;&#x80FD;&#x5E2E;&#x52A9;&#x4F60;&#x5728;&#x5408;&#x9002;&#x7684;&#x65F6;&#x673A;&#x505A;&#x5408;&#x9002;&#x7684;&#x4E8B;&#x60C5;&#x3002;</p><p>vue&#x5B98;&#x65B9;api&#x6700;&#x65B0;&#x7248;&#x672C;&#x7ED9;&#x51FA;&#x4E86;11&#x4E2A;&#x5468;&#x671F;&#x51FD;&#x6570;</p><p>&#x751F;&#x547D;&#x5468;&#x671F;&#x56FE;&#x793A;&#x6211;&#x5C31;&#x4E0D;&#x8D34;&#x4E86;&#xFF0C;&#x5B98;&#x7F51;&#x90FD;&#x6709;</p><p>&#x4E0A;&#x4EE3;&#x7801;,&#x8981;&#x4ED4;&#x7EC6;&#x770B;&#x54E6;~</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;div id=&quot;app1&quot;&gt;
    &lt;h1&gt;"{{"a"}}"&lt;/h1&gt;
    &lt;h1&gt;"{{"aDouble"}}"&lt;/h1&gt;
    &lt;button @click=&quot;plus&quot;&gt;plus&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  name: &apos;test&apos;,
  data () {
    return {
      a: 1
    }
  },
  computed: {
    aDouble () {
      return this.a * 2
    }
  },
  methods: {
    plus: function () {
      this.a++
    }
  },
  watch: {
    a: (val, oldVal) =&gt; {
      console.log(val, oldVal)
    },
    deep: true
  },
  beforeCreate () {
    console.log(this.$el) // undefined
    console.log(this.$data) // undefined
    console.log(&apos;beforeCreate &#x94A9;&#x5B50;&#x6267;&#x884C;...&apos;)
  },
  created () {
    console.log(this.$el) // undefined
    console.log(this.$data) // {__ob__: Observer} &#x7ED1;&#x5B9A;&#x4E86;data
    this.a++ // a:2
    this.plus() // a:3
    // &#x8FDE;&#x7EED;&#x4E24;&#x6B21;&#x6539;&#x53D8;a&#x7684;&#x503C;&#xFF0C;&#x8FD9;&#x91CC;watch&#x53EA;&#x6267;&#x884C;&#x4E86;&#x4E00;&#x6B21;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x5462;&#xFF1F;&#x8FD9;&#x91CC;&#x662F;&#x4E2A;&#x5F02;&#x6B65;&#xFF0C;&#x5982;&#x679C;&#x540C;&#x4E00;&#x4E2A; watcher &#x88AB;&#x591A;&#x6B21;&#x89E6;&#x53D1;&#xFF0C;&#x53EA;&#x4F1A;&#x88AB;&#x63A8;&#x5165;&#x5230;&#x961F;&#x5217;&#x4E2D;&#x4E00;&#x6B21;&#x3002;
    console.log(&apos;created &#x94A9;&#x5B50;&#x6267;&#x884C;...&apos;)
  },
  beforeMount () {
    console.log(this.$el) // undefined
    console.log(&apos;beforeMount &#x94A9;&#x5B50;&#x6267;&#x884C;...&apos;)
  },
  mounted () {
    console.log(this.$el) // &lt;div id=&quot;app1&quot;&gt;...&lt;/div&gt;
    console.log(&apos;mounted &#x94A9;&#x5B50;&#x6267;&#x884C;...&apos;)
  },
  beforeUpdate: function () {
    // this.plus() &#x4F1A;&#x89E6;&#x53D1;beforeUpdate
    console.log(&apos;beforeUpdate &#x94A9;&#x5B50;&#x6267;&#x884C;...&apos;)
  },
  updated: function () {
    // this.plus() &#x4F1A;&#x89E6;&#x53D1;beforeUpdate
    console.log(&apos;updated &#x94A9;&#x5B50;&#x6267;&#x884C;...&apos;)
  },
  beforeDestroy: function () {
    // this.$destroy()&#x6216;&#x8005;&#x662F;&#x8BE5;&#x7EC4;&#x4EF6;&#x88AB;&#x5207;&#x6362;&#x3001;&#x8DEF;&#x7531;&#x8DF3;&#x8F6C;&#x7B49;&#x4F1A;&#x5F15;&#x53D1;&#x5B9E;&#x4F8B;&#x88AB;&#x9500;&#x6BC1; &#x4F1A;&#x89E6;&#x53D1;beforeDestroy
    console.log(&apos;beforeDestroy &#x94A9;&#x5B50;&#x6267;&#x884C;...&apos;)
  },
  destroyed: function () {
    // this.$destroy()&#x6216;&#x8005;&#x662F;&#x8BE5;&#x7EC4;&#x4EF6;&#x88AB;&#x5207;&#x6362;&#x3001;&#x8DEF;&#x7531;&#x8DF3;&#x8F6C;&#x7B49;&#x4F1A;&#x5F15;&#x53D1;&#x5B9E;&#x4F8B;&#x88AB;&#x9500;&#x6BC1; &#x4F1A;&#x89E6;&#x53D1;beforeDestroy
    console.log(&apos;destroyed &#x94A9;&#x5B50;&#x6267;&#x884C;...&apos;)
  }
}
&lt;/script&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app1&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span></span><span class="hljs-template-variable">"{{"a"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span></span><span class="hljs-template-variable">"{{"aDouble"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;plus&quot;</span>&gt;</span>plus<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;test&apos;</span>,
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>
    }
  },
  <span class="hljs-attr">computed</span>: {
    aDouble () {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.a * <span class="hljs-number">2</span>
    }
  },
  <span class="hljs-attr">methods</span>: {
    <span class="hljs-attr">plus</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">this</span>.a++
    }
  },
  <span class="hljs-attr">watch</span>: {
    <span class="hljs-attr">a</span>: <span class="hljs-function">(<span class="hljs-params">val, oldVal</span>) =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(val, oldVal)
    },
    <span class="hljs-attr">deep</span>: <span class="hljs-literal">true</span>
  },
  beforeCreate () {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el) <span class="hljs-comment">// undefined</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$data) <span class="hljs-comment">// undefined</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;beforeCreate &#x94A9;&#x5B50;&#x6267;&#x884C;...&apos;</span>)
  },
  created () {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el) <span class="hljs-comment">// undefined</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$data) <span class="hljs-comment">// {__ob__: Observer} &#x7ED1;&#x5B9A;&#x4E86;data</span>
    <span class="hljs-keyword">this</span>.a++ <span class="hljs-comment">// a:2</span>
    <span class="hljs-keyword">this</span>.plus() <span class="hljs-comment">// a:3</span>
    <span class="hljs-comment">// &#x8FDE;&#x7EED;&#x4E24;&#x6B21;&#x6539;&#x53D8;a&#x7684;&#x503C;&#xFF0C;&#x8FD9;&#x91CC;watch&#x53EA;&#x6267;&#x884C;&#x4E86;&#x4E00;&#x6B21;&#xFF0C;&#x4E3A;&#x4EC0;&#x4E48;&#x5462;&#xFF1F;&#x8FD9;&#x91CC;&#x662F;&#x4E2A;&#x5F02;&#x6B65;&#xFF0C;&#x5982;&#x679C;&#x540C;&#x4E00;&#x4E2A; watcher &#x88AB;&#x591A;&#x6B21;&#x89E6;&#x53D1;&#xFF0C;&#x53EA;&#x4F1A;&#x88AB;&#x63A8;&#x5165;&#x5230;&#x961F;&#x5217;&#x4E2D;&#x4E00;&#x6B21;&#x3002;</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;created &#x94A9;&#x5B50;&#x6267;&#x884C;...&apos;</span>)
  },
  beforeMount () {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el) <span class="hljs-comment">// undefined</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;beforeMount &#x94A9;&#x5B50;&#x6267;&#x884C;...&apos;</span>)
  },
  mounted () {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$el) <span class="hljs-comment">// &lt;div id=&quot;app1&quot;&gt;...&lt;/div&gt;</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;mounted &#x94A9;&#x5B50;&#x6267;&#x884C;...&apos;</span>)
  },
  <span class="hljs-attr">beforeUpdate</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// this.plus() &#x4F1A;&#x89E6;&#x53D1;beforeUpdate</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;beforeUpdate &#x94A9;&#x5B50;&#x6267;&#x884C;...&apos;</span>)
  },
  <span class="hljs-attr">updated</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// this.plus() &#x4F1A;&#x89E6;&#x53D1;beforeUpdate</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;updated &#x94A9;&#x5B50;&#x6267;&#x884C;...&apos;</span>)
  },
  <span class="hljs-attr">beforeDestroy</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// this.$destroy()&#x6216;&#x8005;&#x662F;&#x8BE5;&#x7EC4;&#x4EF6;&#x88AB;&#x5207;&#x6362;&#x3001;&#x8DEF;&#x7531;&#x8DF3;&#x8F6C;&#x7B49;&#x4F1A;&#x5F15;&#x53D1;&#x5B9E;&#x4F8B;&#x88AB;&#x9500;&#x6BC1; &#x4F1A;&#x89E6;&#x53D1;beforeDestroy</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;beforeDestroy &#x94A9;&#x5B50;&#x6267;&#x884C;...&apos;</span>)
  },
  <span class="hljs-attr">destroyed</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// this.$destroy()&#x6216;&#x8005;&#x662F;&#x8BE5;&#x7EC4;&#x4EF6;&#x88AB;&#x5207;&#x6362;&#x3001;&#x8DEF;&#x7531;&#x8DF3;&#x8F6C;&#x7B49;&#x4F1A;&#x5F15;&#x53D1;&#x5B9E;&#x4F8B;&#x88AB;&#x9500;&#x6BC1; &#x4F1A;&#x89E6;&#x53D1;beforeDestroy</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;destroyed &#x94A9;&#x5B50;&#x6267;&#x884C;...&apos;</span>)
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre><h2 id="articleHeader13">beforeCreate</h2><p>&#x5B98;&#x65B9;&#x8BF4;&#x660E;&#xFF1A;&#x5728;&#x5B9E;&#x4F8B;&#x521D;&#x59CB;&#x5316;&#x4E4B;&#x540E;&#xFF0C;&#x6570;&#x636E;&#x89C2;&#x6D4B; (data observer) &#x548C; event/watcher &#x4E8B;&#x4EF6;&#x914D;&#x7F6E;&#x4E4B;&#x524D;&#x88AB;&#x8C03;&#x7528;&#x3002;</p><p>&#x610F;&#x601D;&#x5C31;&#x662F;&#xFF0C;&#x5B9E;&#x4F8B;&#x8981;&#x521D;&#x59CB;&#x5316;&#x4E86;&#xFF0C;&#x6211;&#x51C6;&#x5907;&#x5E72;&#x5927;&#x4E8B;&#x4E86;&#xFF0C;&#x7ED9;&#x4F60;&#x4EEC;&#x63D0;&#x4E2A;&#x9192;&#xFF01;&#xFF08;&#x4F60;&#x53EF;&#x4EE5;&#x7406;&#x89E3;&#x4E3A;&#xFF1A;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;vue&#x8FD8;&#x5565;&#x90FD;&#x6CA1;&#x5E72;&#xFF09;</p><h2 id="articleHeader14">created</h2><p>&#x5B98;&#x65B9;&#x8BF4;&#x660E;&#xFF1A;&#x5728;&#x5B9E;&#x4F8B;&#x521B;&#x5EFA;&#x5B8C;&#x6210;&#x540E;&#x88AB;&#x7ACB;&#x5373;&#x8C03;&#x7528;&#x3002;&#x5728;&#x8FD9;&#x4E00;&#x6B65;&#xFF0C;&#x5B9E;&#x4F8B;&#x5DF2;&#x5B8C;&#x6210;&#x4EE5;&#x4E0B;&#x7684;&#x914D;&#x7F6E;&#xFF1A;&#x6570;&#x636E;&#x89C2;&#x6D4B; (data observer)&#xFF0C;&#x5C5E;&#x6027;&#x548C;&#x65B9;&#x6CD5;&#x7684;&#x8FD0;&#x7B97;&#xFF0C;watch/event &#x4E8B;&#x4EF6;&#x56DE;&#x8C03;&#x3002;&#x7136;&#x800C;&#xFF0C;&#x6302;&#x8F7D;&#x9636;&#x6BB5;&#x8FD8;&#x6CA1;&#x5F00;&#x59CB;&#xFF0C;$el &#x5C5E;&#x6027;&#x76EE;&#x524D;&#x4E0D;&#x53EF;&#x89C1;&#x3002;</p><p>&#x610F;&#x601D;&#x5C31;&#x662F;&#xFF1A;&#x5B9E;&#x529B;&#x5DF2;&#x7ECF;&#x521B;&#x5EFA;&#x5B8C;&#x6210;&#x4E86;&#xFF0C;&#x4F60;&#x5199;&#x7684;data&#x8001;&#x5B50;&#x5DF2;&#x7ECF;&#x62FF;&#x5230;&#x4E86;&#xFF0C;&#x4F60;&#x5199;&#x7684;methods&#x8001;&#x5B50;&#x4E5F;&#x62FF;&#x5230;&#x4E86;&#xFF0C;&#x4F60;&#x5199;&#x7684;watch&#x8001;&#x5B50;&#x4E5F;&#x770B;&#x5230;&#x4E86;&#xFF08;&#x4F60;&#x6562;&#x52A8;&#x8BD5;&#x8BD5;&#xFF0C;&#x6211;&#x770B;&#x7740;&#x5462;&#xFF09;&#xFF0C;&#x603B;&#x4E4B;&#x5462;&#xFF0C;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#x9664;&#x4E86;&#x6CA1;&#x6709;&#x751F;&#x6210;dom&#xFF0C;&#x5176;&#x4ED6;&#x4E8B;&#x60C5;&#x90FD;&#x5E72;&#x5B8C;&#x4E86;&#x3002;&#x4F60;&#x53EF;&#x4EE5;&#x9009;&#x62E9;&#x5728;&#x8FD9;&#x91CC;&#x9762;&#x8BF7;&#x6C42;&#x4E00;&#x4E9B;&#x6570;&#x636E;&#x3002;</p><h2 id="articleHeader15">beforeMount</h2><p>&#x5B98;&#x65B9;&#x8BF4;&#x660E;&#xFF1A;&#x5728;&#x6302;&#x8F7D;&#x5F00;&#x59CB;&#x4E4B;&#x524D;&#x88AB;&#x8C03;&#x7528;&#xFF1A;&#x76F8;&#x5173;&#x7684; render &#x51FD;&#x6570;&#x9996;&#x6B21;&#x88AB;&#x8C03;&#x7528;&#x3002;<br>&#x610F;&#x601D;&#x5C31;&#x662F;&#xFF1A;&#x8001;&#x5B50;&#x8981;&#x751F;&#x6210;dom&#xFF0C;&#x5F80;html&#x91CC;&#x9762;&#x6302;&#x4E86;&#xFF0C;&#x524D;&#x65B9;&#x9AD8;&#x80FD;&#xFF0C;&#x8001;&#x5B50;&#x8981;&#x6302;&#x4E86;&#xFF01;&#xFF01;&#x5C31;&#x662F;&#x544A;&#x8BC9;&#x4F60;&#x8981;&#x6302;&#x8F7D;&#x5230;dom&#x4E86;&#xFF0C;&#x6709;&#x4EC0;&#x4E48;&#x4E8B;&#x60C5;&#x5728;&#x6302;&#x8F7D;&#x4E4B;&#x524D;&#x505A;&#x7684;&#x5C31;&#x8D76;&#x5FEB;&#x505A;&#x3002;</p><h2 id="articleHeader16">mounted</h2><p>&#x5B98;&#x65B9;&#x8BF4;&#x660E;&#xFF1A;el &#x88AB;&#x65B0;&#x521B;&#x5EFA;&#x7684; vm.$el &#x66FF;&#x6362;&#xFF0C;&#x5E76;&#x6302;&#x8F7D;&#x5230;&#x5B9E;&#x4F8B;&#x4E0A;&#x53BB;&#x4E4B;&#x540E;&#x8C03;&#x7528;&#x8BE5;&#x94A9;&#x5B50;&#x3002;&#x5982;&#x679C; root &#x5B9E;&#x4F8B;&#x6302;&#x8F7D;&#x4E86;&#x4E00;&#x4E2A;&#x6587;&#x6863;&#x5185;&#x5143;&#x7D20;&#xFF0C;&#x5F53; mounted &#x88AB;&#x8C03;&#x7528;&#x65F6; vm.$el &#x4E5F;&#x5728;&#x6587;&#x6863;&#x5185;&#x3002;<br>&#x610F;&#x601D;&#x5C31;&#x662F;&#xFF1A;&#x8BE5;&#x505A;&#x7684;&#x4E8B;&#x60C5;&#x90FD;&#x505A;&#x5B8C;&#x4E86;&#xFF0C;dom&#x4E5F;&#x6709;&#x4E86;&#xFF0C;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#x4F60;&#x53EF;&#x4EE5;&#x64CD;&#x4F5C;dom&#x4E86;&#x3002;</p><h2 id="articleHeader17">beforeUpdate</h2><p>&#x5B98;&#x65B9;&#x8BF4;&#x660E;&#xFF1A;&#x6570;&#x636E;&#x66F4;&#x65B0;&#x65F6;&#x8C03;&#x7528;&#xFF0C;&#x53D1;&#x751F;&#x5728;&#x865A;&#x62DF; DOM &#x6253;&#x8865;&#x4E01;&#x4E4B;&#x524D;&#x3002;&#x8FD9;&#x91CC;&#x9002;&#x5408;&#x5728;&#x66F4;&#x65B0;&#x4E4B;&#x524D;&#x8BBF;&#x95EE;&#x73B0;&#x6709;&#x7684; DOM&#xFF0C;&#x6BD4;&#x5982;&#x624B;&#x52A8;&#x79FB;&#x9664;&#x5DF2;&#x6DFB;&#x52A0;&#x7684;&#x4E8B;&#x4EF6;&#x76D1;&#x542C;&#x5668;&#x3002;<br>&#x610F;&#x601D;&#x5C31;&#x662F;&#xFF1A;&#x5F53;&#x4F60;&#x7684;&#x6570;&#x636E;&#x6539;&#x53D8;&#x4E86;&#xFF0C;&#x5B9E;&#x4F8B;&#x76D1;&#x6D4B;&#x5230;&#x4E86;&#x53D8;&#x5316;&#xFF0C;&#x5C31;&#x4F1A;&#x5F15;&#x53D1;beforeUpdate&#x7136;&#x540E;updated&#x4E24;&#x4E2A;&#x94A9;&#x5B50;&#xFF0C;&#x5F88;&#x597D;&#x7406;&#x89E3;</p><h2 id="articleHeader18">updated</h2><p>&#x5B98;&#x65B9;&#x8BF4;&#x660E;&#xFF1A;&#x7531;&#x4E8E;&#x6570;&#x636E;&#x66F4;&#x6539;&#x5BFC;&#x81F4;&#x7684;&#x865A;&#x62DF; DOM &#x91CD;&#x65B0;&#x6E32;&#x67D3;&#x548C;&#x6253;&#x8865;&#x4E01;&#xFF0C;&#x5728;&#x8FD9;&#x4E4B;&#x540E;&#x4F1A;&#x8C03;&#x7528;&#x8BE5;&#x94A9;&#x5B50;&#x3002;<br>&#x610F;&#x601D;&#x5C31;&#x662F;&#xFF1A;&#x5F53;&#x4F60;&#x7684;&#x6570;&#x636E;&#x6539;&#x53D8;&#x4E86;&#xFF0C;&#x5B9E;&#x4F8B;&#x76D1;&#x6D4B;&#x5230;&#x4E86;&#x53D8;&#x5316;&#xFF0C;&#x5C31;&#x4F1A;&#x5F15;&#x53D1;beforeUpdate&#x7136;&#x540E;updated&#x4E24;&#x4E2A;&#x94A9;&#x5B50;&#xFF0C;&#x5F88;&#x597D;&#x7406;&#x89E3;</p><h2 id="articleHeader19">activated</h2><p>keep-alive &#x7EC4;&#x4EF6;&#x6FC0;&#x6D3B;&#x65F6;&#x8C03;&#x7528;&#x3002;<br>&#x7275;&#x626F;&#x5230;&#x8DEF;&#x7531;&#x7F13;&#x5B58;&#xFF08;keep-alive&#xFF09;&#xFF0C;&#x8BB2;&#x8DEF;&#x7531;&#x7684;&#x65F6;&#x5019;&#x518D;&#x8BE6;&#x7EC6;&#x8BF4;&#x660E;</p><h2 id="articleHeader20">deactivated</h2><p>keep-alive &#x7EC4;&#x4EF6;&#x505C;&#x7528;&#x65F6;&#x8C03;&#x7528;&#x3002;<br>&#x7275;&#x626F;&#x5230;&#x8DEF;&#x7531;&#x7F13;&#x5B58;&#xFF08;keep-alive&#xFF09;&#xFF0C;&#x8BB2;&#x8DEF;&#x7531;&#x7684;&#x65F6;&#x5019;&#x518D;&#x8BE6;&#x7EC6;&#x8BF4;&#x660E;</p><h2 id="articleHeader21">beforeDestroy</h2><p>&#x5B98;&#x65B9;&#x8BF4;&#x660E;&#xFF1A;&#x5B9E;&#x4F8B;&#x9500;&#x6BC1;&#x4E4B;&#x524D;&#x8C03;&#x7528;&#x3002;&#x5728;&#x8FD9;&#x4E00;&#x6B65;&#xFF0C;&#x5B9E;&#x4F8B;&#x4ECD;&#x7136;&#x5B8C;&#x5168;&#x53EF;&#x7528;&#x3002;<br>&#x610F;&#x601D;&#x5C31;&#x662F;&#xFF1A;&#x5F53;&#x5B9E;&#x4F8B;&#x88AB;&#x9500;&#x6BC1;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x88AB;&#x89E6;&#x53D1;&#xFF0C;&#x4EC0;&#x4E48;&#x65F6;&#x5019;&#x4F1A;&#x88AB;&#x9500;&#x6BC1;&#x5462;&#xFF1F;&#x5C31;&#x662F;&#x5F53;&#x7EC4;&#x4EF6;&#xFF08;&#x4ECE;&#x9875;&#x9762;&#x4E0A;&#x6D88;&#x5931;&#x7684;&#x65F6;&#x5019;&#xFF09;&#xFF0C;&#x901A;&#x5E38;&#x662F;&#x7EC4;&#x4EF6;&#x7684;&#x5207;&#x6362;&#xFF0C;&#x8DEF;&#x7531;&#x7684;&#x5207;&#x6362;&#x7B49;&#xFF0C;&#x6216;&#x8005;&#x4E3B;&#x52A8;&#x8C03;&#x7528;this.$destroy()&#xFF0C;&#x5148;beforeDestroy&#x7136;&#x540E;destroyed&#xFF0C;&#x5728;&#x5F00;&#x53D1;&#x7684;&#x65F6;&#x5019;&#x4E5F;&#x5F88;&#x5C11;&#x7528;&#x5230;</p><h2 id="articleHeader22">destroyed</h2><p>&#x5B98;&#x65B9;&#x8BF4;&#x660E;&#xFF1A;Vue &#x5B9E;&#x4F8B;&#x9500;&#x6BC1;&#x540E;&#x8C03;&#x7528;&#x3002;&#x8C03;&#x7528;&#x540E;&#xFF0C;Vue &#x5B9E;&#x4F8B;&#x6307;&#x793A;&#x7684;&#x6240;&#x6709;&#x4E1C;&#x897F;&#x90FD;&#x4F1A;&#x89E3;&#x7ED1;&#x5B9A;&#xFF0C;&#x6240;&#x6709;&#x7684;&#x4E8B;&#x4EF6;&#x76D1;&#x542C;&#x5668;&#x4F1A;&#x88AB;&#x79FB;&#x9664;&#xFF0C;&#x6240;&#x6709;&#x7684;&#x5B50;&#x5B9E;&#x4F8B;&#x4E5F;&#x4F1A;&#x88AB;&#x9500;&#x6BC1;&#x3002;<br>&#x610F;&#x601D;&#x5C31;&#x662F;&#xFF1A;&#x5F53;&#x5B9E;&#x4F8B;&#x88AB;&#x9500;&#x6BC1;&#x7684;&#x65F6;&#x5019;&#x4F1A;&#x88AB;&#x89E6;&#x53D1;&#xFF0C;&#x4EC0;&#x4E48;&#x65F6;&#x5019;&#x4F1A;&#x88AB;&#x9500;&#x6BC1;&#x5462;&#xFF1F;&#x5C31;&#x662F;&#x5F53;&#x7EC4;&#x4EF6;&#xFF08;&#x4ECE;&#x9875;&#x9762;&#x4E0A;&#x6D88;&#x5931;&#x7684;&#x65F6;&#x5019;&#xFF09;&#xFF0C;&#x901A;&#x5E38;&#x662F;&#x7EC4;&#x4EF6;&#x7684;&#x5207;&#x6362;&#xFF0C;&#x8DEF;&#x7531;&#x7684;&#x5207;&#x6362;&#x7B49;&#xFF0C;&#x6216;&#x8005;&#x4E3B;&#x52A8;&#x8C03;&#x7528;this.$destroy()&#xFF0C;&#x5148;beforeDestroy&#x7136;&#x540E;destroyed&#xFF0C;&#x5728;&#x5F00;&#x53D1;&#x7684;&#x65F6;&#x5019;&#x4E5F;&#x5F88;&#x5C11;&#x7528;&#x5230;</p><h2 id="articleHeader23">errorCaptured</h2><p>2.5.0+ &#x65B0;&#x589E;<br>&#x5F53;&#x6355;&#x83B7;&#x4E00;&#x4E2A;&#x6765;&#x81EA;&#x5B50;&#x5B59;&#x7EC4;&#x4EF6;&#x7684;&#x9519;&#x8BEF;&#x65F6;&#x88AB;&#x8C03;&#x7528;&#x3002;&#x6B64;&#x94A9;&#x5B50;&#x4F1A;&#x6536;&#x5230;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#xFF1A;&#x9519;&#x8BEF;&#x5BF9;&#x8C61;&#x3001;&#x53D1;&#x751F;&#x9519;&#x8BEF;&#x7684;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#x4EE5;&#x53CA;&#x4E00;&#x4E2A;&#x5305;&#x542B;&#x9519;&#x8BEF;&#x6765;&#x6E90;&#x4FE1;&#x606F;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#x3002;&#x6B64;&#x94A9;&#x5B50;&#x53EF;&#x4EE5;&#x8FD4;&#x56DE; false &#x4EE5;&#x963B;&#x6B62;&#x8BE5;&#x9519;&#x8BEF;&#x7EE7;&#x7EED;&#x5411;&#x4E0A;&#x4F20;&#x64AD;&#x3002;<br>&#x8FD9;&#x4E2A;&#x672C;&#x4EBA;&#x6CA1;&#x7528;&#x5230;&#x8FC7;,&#x4E00;&#x822C;&#x4E0D;&#x4F1A;&#x8BA9;&#x5B50;&#x7EC4;&#x4EF6;&#x51FA;&#x9519;&#x3002;</p><p>&#x5C0F;&#x7ED3;&#xFF1A;&#x5468;&#x671F;&#x94A9;&#x5B50;&#x80FD;&#x5E2E;&#x52A9;&#x6211;&#x4EEC;&#x7406;&#x89E3;&#x5B9E;&#x4F8B;&#x88AB;&#x521B;&#x5EFA;&#x7684;&#x8FC7;&#x7A0B;&#x548C;&#x8FD0;&#x884C;&#x8FC7;&#x7A0B;&#x53D1;&#x751F;&#x7684;&#x4E8B;&#x60C5;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5728;&#x5408;&#x9002;&#x7684;&#x65F6;&#x673A;&#x505A;&#x5408;&#x9002;&#x7684;&#x4E8B;&#x60C5;&#xFF0C;&#x5C31;&#x50CF;&#x7EA6;&#x4F1A;&#x7684;&#x65F6;&#x5019;&#x6839;&#x636E;&#x4E0D;&#x540C;&#x7684;&#x76F8;&#x5904;&#x65F6;&#x95F4;&#x6216;&#x8005;&#x611F;&#x89C9;&#x505A;&#x51FA;&#x90A3;&#x4E2A;&#x65F6;&#x5019;&#x8BE5;&#x505A;&#x7684;&#x4E8B;&#x60C5;&#x4E00;&#x6837;&#xFF0C;&#x5173;&#x4E8E;&#x57FA;&#x7840;&#x7BC7;&#x5C31;&#x5148;&#x8BF4;&#x8FD9;&#x4E48;&#x591A;&#x3002;</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue2.0 之基本功-指令与生命周期钩子 （一些经验）

## 原文链接
[https://segmentfault.com/a/1190000015349695](https://segmentfault.com/a/1190000015349695)

