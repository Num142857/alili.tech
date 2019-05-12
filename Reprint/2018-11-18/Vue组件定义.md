---
title: 'Vue组件定义' 
date: 2018-11-18 3:32:07
hidden: true
slug: phhoymb0859
categories: [reprint]
---

{{< raw >}}
<h2 id="articleHeader0">&#x7B80;&#x4ECB;</h2><p>&#x7EC4;&#x4EF6;&#x662F;&#x53EF;&#x590D;&#x7528;&#x7684; Vue &#x5B9E;&#x4F8B;&#x3002;</p><p>&#x672C;&#x8D28;&#x4E0A;&#x662F;&#x4E00;&#x4E2A;<strong>&#x5BF9;&#x8C61;</strong>&#xFF0C;&#x8BE5;&#x5BF9;&#x8C61;&#x5305;&#x542B;<code>data</code>&#x3001;<code>computed</code>&#x3001;<code>watch</code>&#x3001;<code>methods</code>&#x3001;<code>filters</code>&#x4EE5;&#x53CA;&#x751F;&#x547D;&#x5468;&#x671F;&#x94A9;&#x5B50;&#x7B49;&#x6210;&#x5458;&#x5C5E;&#x6027;&#x3002;</p><p>&#x7EC4;&#x4EF6;&#x7ED3;&#x6784;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  data(){
    return {
      //
    }
  },
  computed:{
    displayName(){
      return &apos;&apos;;
    }
  },
  methods:{
    onClickHandler(params){
      // do something
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clojure"><code>{
  data(){
    return {
      //
    }
  },
  computed:{
    displayName(){
      return &apos;&apos;;
    }
  },
  methods:{
    onClickHandler(<span class="hljs-name">params</span>){
      // do something
    }
  }
}</code></pre><h2 id="articleHeader1">&#x57FA;&#x7840;&#x77E5;&#x8BC6;</h2><h3 id="articleHeader2">data&#x5C5E;&#x6027;</h3><ul><li><p>data&#x5C5E;&#x6027;&#x7EF4;&#x62A4;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x72B6;&#x6001;&#xFF0C;&#x5176;&#x4F59;&#x7EC4;&#x4EF6;&#x6B63;&#x5E38;&#x60C5;&#x51B5;&#x4E0B;&#x4E0D;&#x53EF;&#x89C1;&#x3002;</p><ul><li>&#x53EF;&#x4EE5;&#x901A;&#x8FC7;<code>props</code>&#x4F20;&#x9012;&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6;&#xFF1B;</li><li>&#x53EF;&#x4EE5;&#x901A;&#x8FC7;<code>$emit</code>&#x7684;&#x65B9;&#x5F0F;&#x4F20;&#x9012;&#x7ED9;&#x7236;&#x7EC4;&#x4EF6;&#xFF1B;</li><li><p>&#x53EF;&#x4EE5;&#x901A;&#x8FC7;<code>this.$refs.ref.$data</code>&#x5728;<code>mounted</code>&#x751F;&#x547D;&#x5468;&#x671F;&#x5185;&#x83B7;&#x53D6;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x5185;&#x90E8;&#x72B6;&#x6001;&#xFF1B;</p><ul><li>&#x76EE;&#x524D;&#x4E0D;&#x77E5;&#x9053;&#x5982;&#x4F55;&#x76D1;&#x542C;&#x5176;&#x53D8;&#x5316;&#xFF1B;</li><li>&#x56E0;&#x4E3A;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;<code>computed</code>&#x548C;&#x4FA6;&#x542C;&#x5C5E;&#x6027;<code>watch</code>&#x53EA;&#x80FD;&#x76D1;&#x542C; <strong>&#x54CD;&#x5E94;&#x5F0F;&#x4F9D;&#x8D56;</strong> &#x7684;&#x53D8;&#x5316;&#xFF0C;&#x800C;<code>$refs</code><a href="https://cn.vuejs.org/v2/api/#ref" rel="nofollow noreferrer" target="_blank">&#x975E;&#x54CD;&#x5E94;&#x5F0F;</a>&#x3002;</li></ul></li></ul></li><li><p>&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x7684; data &#x9009;&#x9879;&#x5FC5;&#x987B;&#x662F;&#x4E00;&#x4E2A;<strong>&#x51FD;&#x6570;</strong>&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  data&#x9009;&#x9879;&#x6709;&#x4E24;&#x79CD;&#x5B9A;&#x4E49;&#x65B9;&#x5F0F;&#xFF1A;
  
  &#x4E00;&#x3001;&#x5BF9;&#x8C61;&#x5F62;&#x5F0F;&#xFF1A;
  
  ```
  data:{
    //&#x5F15;&#x7528;&#x8BE5;&#x7EC4;&#x4EF6;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x5171;&#x7528;&#x4E00;&#x4E2A;&#x72B6;&#x6001;&#x7684;&#x5F15;&#x7528;&#xFF0C;&#x4EE5;&#x81F3;&#x4E8E;&#xFF0C;&#x53EA;&#x8981;&#x6709;&#x4E00;&#x5904;&#x4FEE;&#x6539;&#x4E86;$data&#x4E2D;&#x7684;&#x67D0;&#x4E00;&#x5C5E;&#x6027;&#x503C;&#xFF0C;&#x5176;&#x5B83;&#x5F15;&#x7528;&#x8BE5;&#x7EC4;&#x4EF6;&#x7684;&#x5730;&#x65B9;&#x4E5F;&#x8DDF;&#x968F;&#x7740;&#x6539;&#x53D8;&#x8BE5;&#x5C5E;&#x6027;&#x503C;&#xFF08;&#x5176;&#x5B9E;&#xFF0C;&#x4E0D;&#x662F;&#x8DDF;&#x968F;&#xFF0C;&#x672C;&#x6765;&#x5C31;&#x662F;&#x540C;&#x4E00;&#x4E2A;&#x6307;&#x5411;&#xFF09;&#x3002;
  }
  ```
  
  &#x4E8C;&#x3001;&#x51FD;&#x6570;&#x5F62;&#x5F0F;&#xFF1A;
  
  ```
  data(){
    return {
      //&#x5F15;&#x7528;&#x8BE5;&#x7EC4;&#x4EF6;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x6BCF;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x90FD;&#x4F1A;&#x83B7;&#x5F97;&#x72EC;&#x7ACB;&#x7684;&#x5F15;&#x7528;&#xFF0C;&#x4E92;&#x4E0D;&#x5E72;&#x6270;&#x3002;
    }
  }
  ```
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code>  data&#x9009;&#x9879;&#x6709;&#x4E24;&#x79CD;&#x5B9A;&#x4E49;&#x65B9;&#x5F0F;&#xFF1A;
  
  &#x4E00;&#x3001;&#x5BF9;&#x8C61;&#x5F62;&#x5F0F;&#xFF1A;
  
  ```
  data:{
    <span class="hljs-comment">//&#x5F15;&#x7528;&#x8BE5;&#x7EC4;&#x4EF6;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x5171;&#x7528;&#x4E00;&#x4E2A;&#x72B6;&#x6001;&#x7684;&#x5F15;&#x7528;&#xFF0C;&#x4EE5;&#x81F3;&#x4E8E;&#xFF0C;&#x53EA;&#x8981;&#x6709;&#x4E00;&#x5904;&#x4FEE;&#x6539;&#x4E86;$data&#x4E2D;&#x7684;&#x67D0;&#x4E00;&#x5C5E;&#x6027;&#x503C;&#xFF0C;&#x5176;&#x5B83;&#x5F15;&#x7528;&#x8BE5;&#x7EC4;&#x4EF6;&#x7684;&#x5730;&#x65B9;&#x4E5F;&#x8DDF;&#x968F;&#x7740;&#x6539;&#x53D8;&#x8BE5;&#x5C5E;&#x6027;&#x503C;&#xFF08;&#x5176;&#x5B9E;&#xFF0C;&#x4E0D;&#x662F;&#x8DDF;&#x968F;&#xFF0C;&#x672C;&#x6765;&#x5C31;&#x662F;&#x540C;&#x4E00;&#x4E2A;&#x6307;&#x5411;&#xFF09;&#x3002;</span>
  }
  ```
  
  &#x4E8C;&#x3001;&#x51FD;&#x6570;&#x5F62;&#x5F0F;&#xFF1A;
  
  ```
  data(){
    return {
      <span class="hljs-comment">//&#x5F15;&#x7528;&#x8BE5;&#x7EC4;&#x4EF6;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x6BCF;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x90FD;&#x4F1A;&#x83B7;&#x5F97;&#x72EC;&#x7ACB;&#x7684;&#x5F15;&#x7528;&#xFF0C;&#x4E92;&#x4E0D;&#x5E72;&#x6270;&#x3002;</span>
    }
  }
  ```
</code></pre></li></ul><h3 id="articleHeader3">computed&#x5C5E;&#x6027; VS methods&#x5C5E;&#x6027; VS filter</h3><table><thead><tr><th align="left">&#x533A;&#x522B;</th><th align="left">method</th><th align="left">computed</th><th align="left">filter</th></tr></thead><tbody><tr><td align="left">&#x7C7B;&#x578B;</td><td align="left">&#x51FD;&#x6570;</td><td align="left">&#x6570;&#x636E;&#x53D8;&#x91CF;</td><td align="left">&#x51FD;&#x6570;</td></tr><tr><td align="left">&#x7528;&#x9014;</td><td align="left">&#x4F5C;&#x4E8B;&#x4EF6;&#x5904;&#x7406;&#x51FD;&#x6570;</td><td align="left">&#x4F5C;&#x6570;&#x636E;</td><td align="left">&#x4F5C;&#x7BA1;&#x9053;&#x7B26;</td></tr><tr><td align="left">&#x4F5C;&#x7528;&#x8303;&#x56F4;</td><td align="left">&#x7EC4;&#x5EFA;&#x5185;</td><td align="left">&#x7EC4;&#x5EFA;&#x5185;</td><td align="left">&#x7EC4;&#x5EFA;&#x5185;&#xFF08;&#x5C40;&#x90E8;&#x6CE8;&#x518C;&#xFF09;&#x3001;&#x5168;&#x5C40;&#xFF08;&#x5168;&#x5C40;&#x6CE8;&#x518C;&#xFF09;</td></tr><tr><td align="left">&#x53C2;&#x6570;</td><td align="left">&#x53EF;&#x4EE5;&#x5E26;&#x53C2;</td><td align="left">&#x4E0D;&#x5E26;&#x53C2;&#xFF08;&#x975E;&#x51FD;&#xFF09;</td><td align="left">&#x5E26;&#x53C2;</td></tr><tr><td align="left">&#x8FD4;&#x56DE;&#x503C;</td><td align="left">&#x4E0D;&#x8981;&#x6C42;</td><td align="left">&#x5FC5;&#x987B;&#x6709;</td><td align="left">&#x5FC5;&#x987B;&#x6709;</td></tr><tr><td align="left">&#x89E6;&#x53D1;</td><td align="left">&#x4EA4;&#x4E92;&#x65F6;&#x89E6;&#x53D1;</td><td align="left">&#x5728;&#x5B83;&#x7684;&#x76F8;&#x5173;&#x4F9D;&#x8D56;&#x53D1;&#x751F;&#x6539;&#x53D8;&#x65F6;&#x624D;&#x4F1A;&#x91CD;&#x65B0;&#x6C42;&#x503C;</td><td align="left">&#x4F20;&#x5165;&#x7684;&#x6570;&#x636E;&#x53D8;&#x5316;&#x65F6;&#x6267;&#x884C;</td></tr></tbody></table><p><strong>&#x6CE8;&#x610F;&#xFF1A;</strong></p><ul><li><code>Vue</code>&#x4E2D;&#x5E76;&#x4E0D;&#x662F;&#x6240;&#x6709;&#x7684;&#x5C5E;&#x6027;&#x90FD;&#x662F;&#x54CD;&#x5E94;&#x5F0F;&#x7684;&#xFF0C;&#x5982;<code>$refs</code><a href="https://cn.vuejs.org/v2/api/#ref" rel="nofollow noreferrer" target="_blank">&#x65E0;&#x6CD5;&#x76D1;&#x542C;&#x5B83;&#x7684;&#x53D8;&#x52A8;</a>&#xFF1B;</li></ul><hr><p>&#x7EC4;&#x4EF6;&#x6784;&#x5EFA;&#x7684;&#x4E3B;&#x8981;&#x533A;&#x522B;&#x5728;&#x4E8E;<strong>&#x6A21;&#x677F;&#x7684;&#x751F;&#x6210;&#x65B9;&#x5F0F;</strong>&#x3002;</p><h2 id="articleHeader4">&#x6A21;&#x677F;&#x5B9A;&#x4E49;&#x65B9;&#x5F0F;</h2><h3 id="articleHeader5">template&#x9009;&#x9879;</h3><h4>&#x5B57;&#x7B26;&#x4E32;&#x6A21;&#x677F;</h4><ul><li>&#x4EE5;HTML&#x6807;&#x7B7E;&#x7ED3;&#x6784;&#x7EC4;&#x6210;&#x7684;&#x5B57;&#x7B26;&#x4E32;&#xFF1B;</li><li>&#x793A;&#x4F8B;&#xFF1A;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  template: &apos;&lt;h1 v-if=&quot;level === 1&quot;&gt;&#x7B80;&#x5355;&#x793A;&#x4F8B;&lt;/h1&gt;&apos;,
  props: {
    level: {
      type: Number,
      required: true
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs yaml"><code><span class="hljs-string">{</span>
<span class="hljs-attr">  template:</span> <span class="hljs-string">&apos;&lt;h1 v-if=&quot;level === 1&quot;&gt;&#x7B80;&#x5355;&#x793A;&#x4F8B;&lt;/h1&gt;&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">  props:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    level:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">      type:</span> <span class="hljs-string">Number,</span>
<span class="hljs-attr">      required:</span> <span class="hljs-literal">true</span>
    <span class="hljs-string">}</span>
  <span class="hljs-string">}</span>
<span class="hljs-string">}</span></code></pre><h4>id&#x9009;&#x62E9;&#x5668;&#x6307;&#x5B9A;&#x7684;&#x6A21;&#x677F;</h4><ul><li>&#x4EE5;<code>id</code>&#x6807;&#x8BC6;&#x7684;&#x4E00;&#x6BB5;<code>script</code>&#x6807;&#x7B7E;&#x5305;&#x88F9;&#x7684;HTML&#x7247;&#x6BB5;&#xFF1B;</li><li>&#x793A;&#x4F8B;&#xFF1A;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script type=&quot;text/x-template&quot; id=&quot;anchored-heading-template&quot;&gt;
  &lt;h1 v-if=&quot;level === 1&quot;&gt;
    &#x7B80;&#x5355;&#x793A;&#x4F8B;
  &lt;/h1&gt;
&lt;/script&gt;
{
  template: &apos;#anchored-heading-template&apos;,
  props: {
    level: {
      type: Number,
      required: true
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text/x-template&quot;</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;anchored-heading-template&quot;</span>&gt;</span><span class="handlebars"><span class="xml">
  <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;level === 1&quot;</span>&gt;</span>
    &#x7B80;&#x5355;&#x793A;&#x4F8B;
  <span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span><span class="hljs-template-variable">{
  template: &apos;#anchored-heading-template&apos;,
  props: {
    level: {
      type: Number,
      required: true
    }</span><span class="xml">
  }
}</span></code></pre><h3 id="articleHeader6">render</h3><ul><li>&#x53D1;&#x6325;JavaScript&#x6700;&#x5927;&#x7684;&#x7F16;&#x7A0B;&#x80FD;&#x529B;&#xFF0C;&#x8BE5;&#x51FD;&#x6570;&#x63A5;&#x6536;&#x4E00;&#x4E2A;<code>createElement</code>&#x65B9;&#x6CD5;&#x4F5C;&#x4E3A;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x7528;&#x6765;&#x521B;&#x5EFA;<code>VNode</code>&#xFF1B;</li><li><code>createElement</code>&#x63A5;&#x6536;&#x4E09;&#x4E2A;&#x53C2;&#x6570;&#xFF1A;&#x7EC4;&#x4EF6;&#x6839;&#x8282;&#x70B9;&#x7C7B;&#x578B;&#x3001;&#x7EC4;&#x4EF6;&#x914D;&#x7F6E;&#x5BF9;&#x8C61;&#x3001;&#x5B50;&#x8282;&#x70B9;&#xFF08;<a href="https://cn.vuejs.org/v2/guide/render-function.html#createElement-%E5%8F%82%E6%95%B0" rel="nofollow noreferrer" target="_blank">&#x5B98;&#x65B9;&#x5173;&#x4E8E;&#x7EC4;&#x4EF6;&#x914D;&#x7F6E;&#x5BF9;&#x8C61;&#x7684;&#x8BF4;&#x660E;</a>&#xFF09;&#xFF1B;</li><li>&#x793A;&#x4F8B;&#xFF1A;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  render: function (createElement) {
    return createElement(
      &apos;h&apos; + this.level,   // tag name &#x6807;&#x7B7E;&#x540D;&#x79F0;
      this.$slots.default // &#x5B50;&#x7EC4;&#x4EF6;&#x4E2D;&#x7684;&#x9635;&#x5217;
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code>{
  <span class="hljs-attribute">render</span>: function (createElement) {
    return <span class="hljs-built_in">createElement</span>(
      <span class="hljs-string">&apos;h&apos;</span> + this.level,   // tag name &#x6807;&#x7B7E;&#x540D;&#x79F0;
      this.$slots.default // &#x5B50;&#x7EC4;&#x4EF6;&#x4E2D;&#x7684;&#x9635;&#x5217;
    )
  },
  <span class="hljs-selector-tag">props</span>: {
    <span class="hljs-attribute">level</span>: {
      type: Number,
      required: true
    }
  }
}</code></pre><h3 id="articleHeader7">&#x5355;&#x6587;&#x4EF6;&#x7EC4;&#x4EF6;</h3><p>&#x5355;&#x6587;&#x4EF6;&#x7EC4;&#x4EF6;&#x5C06;&#x6A21;&#x677F;&#x3001;&#x903B;&#x8F91;&#x3001;&#x6837;&#x5F0F;&#x5728;&#x7ED3;&#x6784;&#x4E0A;&#x5206;&#x79BB;&#xFF0C;&#x4FDD;&#x5B58;&#x5728;&#x540C;&#x4E00;&#x4E2A;&#x6587;&#x4EF6;&#x4E2D;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;div&gt;
    ...
  &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
...
export default{
  ...
}
...
&lt;/script&gt;
&lt;style&gt;
...
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    ...
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
...
export <span class="hljs-keyword">default</span></span></span><span class="hljs-template-variable">{
  ...
}</span><span class="xml"><span class="undefined">
...
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="undefined">
...
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre><h3 id="articleHeader8">&#x65B9;&#x6848;&#x9009;&#x62E9;</h3><table><thead><tr><th>template</th><th>&#x5355;&#x6587;&#x4EF6;</th><th>render</th></tr></thead><tbody><tr><td>&#x4E00;&#x884C;&#x7684;&#x7B80;&#x5355;&#x7ED3;&#x6784;</td><td>&#x5E38;&#x89C4;&#x7684;&#x9009;&#x62E9;</td><td>&#x524D;&#x8FB9;&#x4E24;&#x79CD;&#x65B9;&#x6848;&#x89E3;&#x51B3;&#x4E0D;&#x4E86;&#x65F6;&#x5019;&#x7684;&#x9009;&#x62E9;&#xFF08;&#x7075;&#x6D3B;&#x6027;&#x9AD8;&#xFF09;</td></tr></tbody></table><p><strong>&#x6CE8;&#x610F;&#xFF1A;</strong></p><ul><li>&#x4E0D;&#x8BBA;&#x9009;&#x62E9;&#x54EA;&#x4E00;&#x79CD;&#x65B9;&#x6848;&#xFF0C;&#x5B9A;&#x4E49;&#x6A21;&#x677F;&#x65F6;&#xFF0C;&#x4E00;&#x5B9A;&#x8981;&#x6709;&#x4E00;&#x4E2A;&#x975E;<code>template</code>&#x6807;&#x7B7E;&#x5143;&#x7D20;&#x4F5C;&#x6839;DOM&#xFF0C;&#x6709;&#x4E14;&#x4EC5;&#x6709;&#x4E00;&#x4E2A;&#x3002;</li></ul><h2 id="articleHeader9">&#x7EC4;&#x4EF6;&#x6CE8;&#x518C;&#x65B9;&#x5F0F;</h2><h3 id="articleHeader10">&#x5C40;&#x90E8;&#x6CE8;&#x518C;</h3><p>&#x4EE5;&#x4E0A;&#x51E0;&#x79CD;&#x65B9;&#x6848;&#x5B9A;&#x4E49;&#x7684;&#x7EC4;&#x4EF6;&#x672C;&#x8D28;&#x4E0A;&#x90FD;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x83B7;&#x53D6;&#x8BE5;&#x5BF9;&#x8C61;&#xFF08;&#x5047;&#x8BBE;&#x53D8;&#x91CF;&#x540D;&#x4E3A;TabBar&#xFF09;&#xFF0C;&#x8981;&#x6C42;&#x53EA;&#x5728;&#x53E6;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;(&#x5047;&#x8BBE;&#x53D8;&#x91CF;&#x540D;&#x4E3A;App)&#x5185;&#x4F7F;&#x7528;&#xFF1A;</p><p><code>App</code>&#x7EC4;&#x4EF6;&#x7684;&#x914D;&#x7F6E;&#x5BF9;&#x8C61;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  components:{
    &apos;tab-bar&apos;: TabBar,
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs css"><code>{
  <span class="hljs-attribute">components</span>:{
    <span class="hljs-string">&apos;tab-bar&apos;</span>: TabBar,
  }
}</code></pre><p>&#x8FD9;&#x6837;&#x5C31;&#x662F;&#x5C40;&#x90E8;&#x6CE8;&#x518C;&#xFF0C;&#x8BE5;&#x7EC4;&#x4EF6;<code>TabBar</code>&#x53EA;&#x80FD;&#x5728;<code>App</code>&#x6A21;&#x677F;&#x4E2D;&#x4F7F;&#x7528;<code>&lt;tab-bar&gt;&lt;/tab-bar&gt;</code>&#xFF0C;&#x5176;&#x5B83;&#x7EC4;&#x4EF6;&#x5BF9;<code>TabBar</code>&#x4E0D;&#x53EF;&#x89C1;&#x3002;</p><h3 id="articleHeader11">&#x5168;&#x5C40;&#x6CE8;&#x518C;</h3><p>&#x4EE5;&#x4E0A;&#x51E0;&#x79CD;&#x65B9;&#x6848;&#x5B9A;&#x4E49;&#x7684;&#x7EC4;&#x4EF6;&#x672C;&#x8D28;&#x4E0A;&#x90FD;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x83B7;&#x53D6;&#x8BE5;&#x5BF9;&#x8C61;&#xFF08;&#x5047;&#x8BBE;&#x53D8;&#x91CF;&#x540D;&#x4E3A;TabBar&#xFF09;&#xFF0C;&#x8981;&#x6C42;&#x9879;&#x76EE;&#x5185;&#x4EFB;&#x4F55;&#x7EC4;&#x4EF6;&#x53EF;&#x4F7F;&#x7528;&#xFF1A;</p><p>&#x4E00;&#x822C;&#x5728;&#x9879;&#x76EE;&#x7684;&#x5165;&#x53E3;&#x6587;&#x4EF6;&#xFF08;&#x5982;&#xFF1A;&#x811A;&#x624B;&#x67B6;&#x642D;&#x5EFA;&#x9879;&#x76EE;&#x7684;<code>main.js</code>&#xFF09;&#x4E2D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.component(&apos;tab-bar&apos;,TabBar);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs gauss"><code style="word-break:break-word;white-space:initial">Vue.component(&apos;<span class="hljs-built_in">tab</span>-<span class="hljs-built_in">bar</span>&apos;,TabBar);</code></pre><p>&#x8FD9;&#x6837;&#x5C31;&#x662F;&#x5168;&#x5C40;&#x6CE8;&#x518C;&#xFF0C;&#x8BE5;&#x7EC4;&#x4EF6;<code>TabBar</code>&#x80FD;&#x5728;&#x6574;&#x4E2A;&#x9879;&#x76EE;&#x5185;&#x4F7F;&#x7528;<code>&lt;tab-bar&gt;&lt;/tab-bar&gt;</code>&#xFF0C;&#x6240;&#x6709;&#x7EC4;&#x4EF6;&#x5BF9;<code>TabBar</code>&#x53EF;&#x89C1;&#x3002;</p><h2 id="articleHeader12">&#x751F;&#x547D;&#x5468;&#x671F;&#x94A9;&#x5B50;</h2><p>&#x4EE5;&#x4E0B;&#x7528;&#x81EA;&#x5DF1;&#x7684;&#x8BED;&#x8A00;&#x5C06;&#x751F;&#x547D;&#x5468;&#x671F;&#x94A9;&#x5B50;&#x8868;&#x8FF0;&#x4E00;&#x4E0B;&#xFF0C;&#x5982;&#x679C;&#x6709;&#x4E0D;&#x5BF9;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x8BF7;&#x6821;&#x6B63;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bV4xju?w=1200&amp;h=3039" src="https://static.alili.tech/img/bV4xju?w=1200&amp;h=3039" alt="&#x751F;&#x547D;&#x5468;&#x671F;&#x94A9;&#x5B50;" title="&#x751F;&#x547D;&#x5468;&#x671F;&#x94A9;&#x5B50;" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader13">beforeCreate</h3><p>&#x5728;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#xFF0C;&#x751F;&#x547D;&#x5468;&#x671F;&#x51FD;&#x6570;&#x5DF2;&#x7ECF;&#x51C6;&#x5907;&#x597D;&#x3002;</p><ul><li>&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#x5DF2;&#x7ECF;&#x6784;&#x5EFA;&#xFF0C;&#x4F46;&#x672C;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#x7684;&#x6570;&#x636E;&#x3001;&#x65B9;&#x6CD5;&#x8FD8;&#x6CA1;&#x6709;&#x6CE8;&#x5165;&#xFF1B;</li><li>&#x53EF;&#x4EE5;&#x5728;&#x5404;&#x4E2A;&#x751F;&#x547D;&#x5468;&#x671F;&#x5185;&#x901A;&#x8FC7;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;<code>this</code>&#x8C03;&#x7528;&#x6839;&#x5B9E;&#x4F8B;&#x4E0A;&#x6CE8;&#x5165;&#x7684;<code>$router</code>&#x3001;<code>$store</code>&#x7B49;&#x5BF9;&#x8C61;&#x3002;</li><li>&#x53EF;&#x4EE5;&#x5728;&#x672C;&#x751F;&#x547D;&#x5468;&#x671F;&#x5185;&#x8FDB;&#x884C;&#x6570;&#x636E;&#x521D;&#x59CB;&#x5316;&#xFF1B;</li></ul><h3 id="articleHeader14">created</h3><p>&#x5728;&#x8FD9;&#x4E2A;&#x65F6;&#x5019;&#xFF0C;&#x5F53;&#x524D;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;<code>this</code>&#x4E0A;&#x7684;&#x5C5E;&#x6027;&#xFF08;<code>$data</code>&#x3001;<code>props</code>&#x3001;<code>$methods</code>...&#xFF09;&#x5DF2;&#x7ECF;&#x6CE8;&#x5165;&#x7ED1;&#x5B9A;&#xFF0C;&#x53EF;&#x4EE5;&#x8C03;&#x7528;&#x672C;&#x5B9E;&#x4F8B;&#x4E0A;&#x7684;&#x6210;&#x5458;&#x5C5E;&#x6027;&#xFF1B;</p><h3 id="articleHeader15">beforeMount</h3><p>&#x5728;&#x8FDB;&#x5165;&#x672C;&#x751F;&#x547D;&#x5468;&#x671F;&#x4E4B;&#x524D;&#xFF0C;&#x4F1A;&#x8FDB;&#x884C;&#x4EE5;&#x4E0B;&#x5224;&#x65AD;&#xFF1A;</p><ul><li><p>&#x662F;&#x5426;&#x6709;<code>el</code>&#x9009;&#x9879;&#xFF08;&#x6307;&#x5B9A;&#x6302;&#x8F7D;&#x76EE;&#x6807;&#xFF09;&#xFF1A;</p><ul><li>&#x6709;<code>el</code>&#x9009;&#x9879;&#x7684;&#x662F;&#x6839;&#x5B9E;&#x4F8B;&#xFF1B;</li><li>&#x6CA1;&#x6709;<code>el</code>&#x9009;&#x9879;&#x7684;&#x662F;&#x975E;&#x6839;&#x5B9E;&#x4F8B;&#xFF08;&#x9ED8;&#x8BA4;&#x6302;&#x8F7D;&#x5143;&#x7D20;&#x4E3A;&#x7EC4;&#x4EF6;&#x8C03;&#x7528;&#x7684;&#x4F4D;&#x7F6E;&#xFF09;&#xFF1B;</li></ul></li><li><p>&#x662F;&#x5426;&#x6709;<code>template</code>&#x9009;&#x9879;&#xFF1A;</p><ul><li>&#x6709;<code>template</code>&#x9009;&#x9879;&#x7684;&#x662F;&#x5185;&#x8054;&#x6A21;&#x677F;&#xFF1B;</li><li>&#x6CA1;&#x6709;<code>template</code>&#x9009;&#x9879;&#x7684;&#x662F;&#x5355;&#x6587;&#x4EF6;&#x7EC4;&#x4EF6;&#xFF1B;</li><li>&#x4E2A;&#x4EBA;&#x89C9;&#x5F97;&#xFF0C;&#x8FD8;&#x6709;<code>render</code>&#x9009;&#x9879;&#x7684;&#x5224;&#x65AD;&#xFF1B;</li></ul></li></ul><p><strong>&#x6700;&#x7EC8;&#x8FD9;&#x4E9B;&#x6A21;&#x677F;&#x90FD;&#x4F1A;&#x8F6C;&#x6362;&#x4E3A;<code>render</code>&#x51FD;&#x6570;&#x8FDB;&#x884C;&#x6E32;&#x67D3;</strong>&#xFF01;&#xFF01;&#xFF01;</p><ul><li><del>&#x8FD9;&#x4E2A;&#x751F;&#x547D;&#x5468;&#x671F;&#x5728;&#x89E3;&#x6790;&#x6A21;&#x677F;&#xFF0C;&#x4E0D;&#x77E5;&#x9053;&#x6709;&#x4EC0;&#x4E48;&#x5B9E;&#x9645;&#x7528;&#x9014;&#x3002;</del></li></ul><h3 id="articleHeader16">mounted</h3><p>&#x5728;&#x672C;&#x751F;&#x547D;&#x5468;&#x671F;&#x4E4B;&#x524D;&#xFF0C;&#x5DF2;&#x7ECF;&#x5C06;&#x6A21;&#x677F;&#x6E32;&#x67D3;&#x4E3A;<strong>&#x771F;&#x5B9E;DOM</strong>&#xFF0C;&#x5176;&#x4E2D;<code>vm.$el</code>&#x4E3A;<strong>&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#x7684;&#x6839;DOM&#x5143;&#x7D20;</strong>&#xFF1B;</p><ul><li>&#x672C;&#x751F;&#x547D;&#x5468;&#x671F;&#x662F;&#x521D;&#x59CB;&#x5316;&#x7B2C;&#x4E09;&#x65B9;&#x63D2;&#x4EF6;&#x7684;&#x573A;&#x6240;&#xFF1B;</li><li>&#x5FC5;&#x8981;&#x65F6;&#x5019;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x672C;&#x751F;&#x547D;&#x5468;&#x671F;&#x5185;&#x5BF9;DOM&#x8FDB;&#x884C;&#x64CD;&#x4F5C;&#xFF1B;</li><li>&#x672C;&#x751F;&#x547D;&#x5468;&#x671F;&#x662F;&#x83B7;&#x53D6;<code>this.$refs.ref</code>&#x7684;&#x573A;&#x6240;&#xFF1B;</li></ul>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue组件定义

## 原文链接
[https://segmentfault.com/a/1190000015882730](https://segmentfault.com/a/1190000015882730)

