---
title: 【Vue】详解组件的基础与高级用法
hidden: true
categories: [reprint]
slug: 64f1660a
date: 2018-11-09 02:30:06
---

{{< raw >}}
<blockquote>Vue.js &#x6700;&#x6838;&#x5FC3;&#x7684;&#x529F;&#x80FD;&#x5C31;&#x662F;&#x7EC4;&#x4EF6;&#xFF08;Component&#xFF09;&#xFF0C;&#x4ECE;&#x7EC4;&#x4EF6;&#x7684;&#x6784;&#x5EFA;&#x3001;&#x6CE8;&#x518C;&#x5230;&#x7EC4;&#x4EF6;&#x95F4;&#x901A;&#x4FE1;&#xFF0C;Vue 2.x &#x63D0;&#x4F9B;&#x4E86;&#x66F4;&#x591A;&#x65B9;&#x5F0F;&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x66F4;&#x7075;&#x6D3B;&#x5730;&#x4F7F;&#x7528;&#x7EC4;&#x4EF6;&#x6765;&#x5B9E;&#x73B0;&#x4E0D;&#x540C;&#x9700;&#x6C42;&#x3002;</blockquote><h1 id="articleHeader0">&#x6784;&#x5EFA;&#x7EC4;&#x4EF6;</h1><h3 id="articleHeader1">&#x7EC4;&#x4EF6;&#x57FA;&#x7840;</h3><p>&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x7531; template&#x3001;data&#x3001;computed&#x3001;methods&#x7B49;&#x9009;&#x9879;&#x7EC4;&#x6210;&#x3002;&#x9700;&#x8981;&#x6CE8;&#x610F;&#xFF1A;</p><ul><li>template &#x7684; DOM &#x7ED3;&#x6784;&#x5FC5;&#x987B;&#x6709;&#x6839;&#x5143;&#x7D20;</li><li>data &#x5FC5;&#x987B;&#x662F;&#x51FD;&#x6570;&#xFF0C;&#x6570;&#x636E;&#x901A;&#x8FC7; return &#x8FD4;&#x56DE;&#x51FA;&#x53BB;</li></ul><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x793A;&#x4F8B;&#xFF1A;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6; MyComponent
var MyComponent = {{
  data: function () {
    return {
      // &#x6570;&#x636E;
    }
  },
  template: &apos;&lt;div&gt;&#x7EC4;&#x4EF6;&#x5185;&#x5BB9;&lt;/div&gt;&apos;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs actionscript"><code><span class="hljs-comment">// &#x793A;&#x4F8B;&#xFF1A;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6; MyComponent</span>
<span class="hljs-keyword">var</span> MyComponent = {{
  data: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">return</span> {
      <span class="hljs-comment">// &#x6570;&#x636E;</span>
    }
  },
  template: <span class="hljs-string">&apos;&lt;div&gt;&#x7EC4;&#x4EF6;&#x5185;&#x5BB9;&lt;/div&gt;&apos;</span>
}</code></pre><p>&#x7531;&#x4E8E; HTML &#x7279;&#x6027;&#x4E0D;&#x533A;&#x5206;&#x5927;&#x5C0F;&#x5199;&#xFF0C; &#x5728;&#x4F7F;&#x7528;<code>kebab-case</code>(&#x5C0F;&#x5199;&#x77ED;&#x6A2A;&#x7EBF;&#x5206;&#x9694;&#x547D;&#x540D;) &#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x65F6;&#xFF0C;&#x5F15;&#x7528;&#x4E5F;&#x9700;&#x8981;&#x4F7F;&#x7528;&#x8FD9;&#x4E2A;&#x683C;&#x5F0F;&#x5982; <code>&lt;my-component&gt;</code>&#x6765;&#x4F7F;&#x7528;&#xFF1B;&#x5728;&#x4F7F;&#x7528;<code>PascalCase</code>(&#x9A7C;&#x5CF0;&#x5F0F;&#x547D;&#x540D;) &#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x65F6;<code>&lt;my-component&gt;</code>&#x548C;<code>&lt;MyComponent&gt;</code>&#x8FD9;&#x4E24;&#x79CD;&#x683C;&#x5F0F;&#x90FD;&#x53EF;&#x4EE5;&#x5F15;&#x7528;&#x3002;</p><h3 id="articleHeader2">.vue &#x5355;&#x6587;&#x4EF6;&#x7EC4;&#x4EF6;</h3><p>&#x5982;&#x679C;&#x9879;&#x76EE;&#x4E2D;&#x4F7F;&#x7528;&#x6253;&#x5305;&#x7F16;&#x8BD1;&#x5DE5;&#x5177; webpack&#xFF0C;&#x90A3;&#x5F15;&#x5165; vue-loader &#x5C31;&#x53EF;&#x4EE5;&#x4F7F;&#x7528; <code>.vue</code>&#x540E;&#x7F00;&#x6587;&#x4EF6;&#x6784;&#x5EFA;&#x7EC4;&#x4EF6;&#x3002;<br>&#x4E00;&#x4E2A;<code>.vue</code>&#x5355;&#x6587;&#x4EF6;&#x7EC4;&#x4EF6; (SFC) &#x793A;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// MyComponent.vue &#x6587;&#x4EF6;
&lt;template&gt;
    &lt;div&gt;&#x7EC4;&#x4EF6;&#x5185;&#x5BB9;&lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
  export default {
      data () {
        return {
          // &#x6570;&#x636E;
        }
      }
  }
&lt;/script&gt;

&lt;style scoped&gt;
    div{
        color: red
    }
&lt;/style&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code>// MyComponent.vue &#x6587;&#x4EF6;
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>&#x7EC4;&#x4EF6;&#x5185;&#x5BB9;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
      data () {
        <span class="hljs-keyword">return</span> {
          <span class="hljs-comment">// &#x6570;&#x636E;</span>
        }
      }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">div</span>{
        <span class="hljs-attribute">color</span>: red
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre><p><code>.vue</code>&#x6587;&#x4EF6;&#x4F7F;&#x7EC4;&#x4EF6;&#x7ED3;&#x6784;&#x53D8;&#x5F97;&#x6E05;&#x6670;&#xFF0C;&#x4F7F;&#x7528;<code>.vue</code>&#x8FD8;&#x9700;&#x8981;&#x5B89;&#x88C5; vue-style-loader &#x7B49;&#x52A0;&#x8F7D;&#x5668;&#x5E76;&#x914D;&#x7F6E; webpack.config.js &#x6765;&#x652F;&#x6301;&#x5BF9; .vue &#x6587;&#x4EF6;&#x53CA; ES6 &#x8BED;&#x6CD5;&#x7684;&#x89E3;&#x6790;&#x3002;</p><blockquote>&#x8FDB;&#x4E00;&#x6B65;&#x5B66;&#x4E60;&#x53EF;&#x53C2;&#x8003;&#x6587;&#x7AE0;&#xFF1A;<a href="https://segmentfault.com/a/1190000015708749">&#x8BE6;&#x89E3; SFC &#x4E0E; vue-loader</a></blockquote><h1 id="articleHeader3">&#x6CE8;&#x518C;&#x7EC4;&#x4EF6;</h1><h3 id="articleHeader4">&#x624B;&#x52A8;&#x6CE8;&#x518C;</h3><p>&#x7EC4;&#x4EF6;&#x5B9A;&#x4E49;&#x5B8C;&#x540E;&#xFF0C;&#x8FD8;&#x9700;&#x8981;&#x6CE8;&#x518C;&#x624D;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#xFF0C;&#x6CE8;&#x518C;&#x5206;&#x4E3A;&#x5168;&#x5C40;&#x548C;&#x5C40;&#x90E8;&#x6CE8;&#x518C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5168;&#x5C40;&#x6CE8;&#x518C;&#xFF0C;&#x4EFB;&#x4F55; Vue &#x5B9E;&#x4F8B;&#x90FD;&#x53EF;&#x5F15;&#x7528;
Vue.component(&apos;my-component&apos;, MyComponent)

// &#x5C40;&#x90E8;&#x6CE8;&#x518C;&#xFF0C;&#x5728;&#x6CE8;&#x518C;&#x5B9E;&#x4F8B;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x4E0B;&#x6709;&#x6548;
var MyComponent = { /* ... */ }
new Vue({
    components: {
        &apos;my-component&apos;: MyComponent
    }
})

// &#x5C40;&#x90E8;&#x6CE8;&#x518C;&#xFF0C;&#x4F7F;&#x7528;&#x6A21;&#x5757;&#x7CFB;&#x7EDF;&#xFF0C;&#x7EC4;&#x4EF6;&#x5B9A;&#x4E49;&#x5728;&#x7EDF;&#x4E00;&#x6587;&#x4EF6;&#x5939;&#x4E2D;
import MyComponent from &apos;./MyComponent.vue&apos;

export default {
  components: {
    MyComponent // ES6 &#x8BED;&#x6CD5;&#xFF0C;&#x76F8;&#x5F53;&#x4E8E; MyComponent: MyComponent
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// &#x5168;&#x5C40;&#x6CE8;&#x518C;&#xFF0C;&#x4EFB;&#x4F55; Vue &#x5B9E;&#x4F8B;&#x90FD;&#x53EF;&#x5F15;&#x7528;</span>
Vue.component(<span class="hljs-string">&apos;my-component&apos;</span>, MyComponent)

<span class="hljs-comment">// &#x5C40;&#x90E8;&#x6CE8;&#x518C;&#xFF0C;&#x5728;&#x6CE8;&#x518C;&#x5B9E;&#x4F8B;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x4E0B;&#x6709;&#x6548;</span>
<span class="hljs-keyword">var</span> MyComponent = { <span class="hljs-comment">/* ... */</span> }
<span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">components</span>: {
        <span class="hljs-string">&apos;my-component&apos;</span>: MyComponent
    }
})

<span class="hljs-comment">// &#x5C40;&#x90E8;&#x6CE8;&#x518C;&#xFF0C;&#x4F7F;&#x7528;&#x6A21;&#x5757;&#x7CFB;&#x7EDF;&#xFF0C;&#x7EC4;&#x4EF6;&#x5B9A;&#x4E49;&#x5728;&#x7EDF;&#x4E00;&#x6587;&#x4EF6;&#x5939;&#x4E2D;</span>
<span class="hljs-keyword">import</span> MyComponent <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./MyComponent.vue&apos;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">components</span>: {
    MyComponent <span class="hljs-comment">// ES6 &#x8BED;&#x6CD5;&#xFF0C;&#x76F8;&#x5F53;&#x4E8E; MyComponent: MyComponent</span>
  }
}</code></pre><p>&#x6CE8;&#x610F;&#x5168;&#x5C40;&#x6CE8;&#x518C;&#x7684;&#x884C;&#x4E3A;&#x5FC5;&#x987B;&#x5728;&#x6839; Vue &#x5B9E;&#x4F8B; (&#x901A;&#x8FC7; new Vue) &#x521B;&#x5EFA;&#x4E4B;&#x524D;&#x53D1;&#x751F;&#x3002;</p><h3 id="articleHeader5">&#x81EA;&#x52A8;&#x6CE8;&#x518C;</h3><p>&#x5BF9;&#x4E8E;&#x901A;&#x7528;&#x6A21;&#x5757;&#x4F7F;&#x7528;&#x679A;&#x4E3E;&#x7684;&#x6CE8;&#x518C;&#x65B9;&#x5F0F;&#x4EE3;&#x7801;&#x4F1A;&#x975E;&#x5E38;&#x4E0D;&#x65B9;&#x4FBF;&#xFF0C;&#x63A8;&#x8350;&#x4F7F;&#x7528;&#x81EA;&#x52A8;&#x5316;&#x7684;&#x5168;&#x5C40;&#x6CE8;&#x518C;&#x3002;&#x5982;&#x679C;&#x9879;&#x76EE;&#x4F7F;&#x7528; webpack&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x5176;&#x4E2D;&#x7684;<code>require.context</code>&#x4E00;&#x6B21;&#x6027;&#x5F15;&#x5165;&#x7EC4;&#x4EF6;&#x6587;&#x4EF6;&#x5939;&#x4E0B;&#x6240;&#x6709;&#x7684;&#x7EC4;&#x4EF6;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &apos;vue&apos;
import upperFirst from &apos;lodash/upperFirst&apos; // &#x4F7F;&#x7528; lodash &#x8FDB;&#x884C;&#x5B57;&#x7B26;&#x4E32;&#x5904;&#x7406;
import camelCase from &apos;lodash/camelCase&apos;

const requireComponent = require.context(
  &apos;./components&apos;,   // &#x5176;&#x7EC4;&#x4EF6;&#x76EE;&#x5F55;&#x7684;&#x76F8;&#x5BF9;&#x8DEF;&#x5F84;
  false,   // &#x662F;&#x5426;&#x67E5;&#x8BE2;&#x5176;&#x5B50;&#x76EE;&#x5F55;
  /Base[A-Z]\w+\.(vue|js)$/   // &#x5339;&#x914D;&#x57FA;&#x7840;&#x7EC4;&#x4EF6;&#x6587;&#x4EF6;&#x540D;&#x7684;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;
)

requireComponent.keys().forEach(fileName =&gt; {
  // &#x83B7;&#x53D6;&#x7EC4;&#x4EF6;&#x914D;&#x7F6E;
  const componentConfig = requireComponent(fileName)

  // &#x83B7;&#x53D6;&#x7EC4;&#x4EF6;&#x7684; PascalCase &#x547D;&#x540D;
  const componentName = upperFirst(
    camelCase(
      // &#x5265;&#x53BB;&#x6587;&#x4EF6;&#x540D;&#x5F00;&#x5934;&#x7684; `./` &#x548C;&#x7ED3;&#x5C3E;&#x7684;&#x6269;&#x5C55;&#x540D;
      fileName.replace(/^\.\/(.*)\.\w+$/, &apos;$1&apos;)
    )
  )

  // &#x5168;&#x5C40;&#x6CE8;&#x518C;&#x7EC4;&#x4EF6;
  Vue.component(
    componentName,
    componentConfig.default || componentConfig
  )
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>
<span class="hljs-keyword">import</span> upperFirst <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;lodash/upperFirst&apos;</span> <span class="hljs-comment">// &#x4F7F;&#x7528; lodash &#x8FDB;&#x884C;&#x5B57;&#x7B26;&#x4E32;&#x5904;&#x7406;</span>
<span class="hljs-keyword">import</span> camelCase <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;lodash/camelCase&apos;</span>

<span class="hljs-keyword">const</span> requireComponent = <span class="hljs-built_in">require</span>.context(
  <span class="hljs-string">&apos;./components&apos;</span>,   <span class="hljs-comment">// &#x5176;&#x7EC4;&#x4EF6;&#x76EE;&#x5F55;&#x7684;&#x76F8;&#x5BF9;&#x8DEF;&#x5F84;</span>
  <span class="hljs-literal">false</span>,   <span class="hljs-comment">// &#x662F;&#x5426;&#x67E5;&#x8BE2;&#x5176;&#x5B50;&#x76EE;&#x5F55;</span>
  /Base[A-Z]\w+\.(vue|js)$/   <span class="hljs-comment">// &#x5339;&#x914D;&#x57FA;&#x7840;&#x7EC4;&#x4EF6;&#x6587;&#x4EF6;&#x540D;&#x7684;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;</span>
)

requireComponent.keys().forEach(<span class="hljs-function"><span class="hljs-params">fileName</span> =&gt;</span> {
  <span class="hljs-comment">// &#x83B7;&#x53D6;&#x7EC4;&#x4EF6;&#x914D;&#x7F6E;</span>
  <span class="hljs-keyword">const</span> componentConfig = requireComponent(fileName)

  <span class="hljs-comment">// &#x83B7;&#x53D6;&#x7EC4;&#x4EF6;&#x7684; PascalCase &#x547D;&#x540D;</span>
  <span class="hljs-keyword">const</span> componentName = upperFirst(
    camelCase(
      <span class="hljs-comment">// &#x5265;&#x53BB;&#x6587;&#x4EF6;&#x540D;&#x5F00;&#x5934;&#x7684; `./` &#x548C;&#x7ED3;&#x5C3E;&#x7684;&#x6269;&#x5C55;&#x540D;</span>
      fileName.replace(<span class="hljs-regexp">/^\.\/(.*)\.\w+$/</span>, <span class="hljs-string">&apos;$1&apos;</span>)
    )
  )

  <span class="hljs-comment">// &#x5168;&#x5C40;&#x6CE8;&#x518C;&#x7EC4;&#x4EF6;</span>
  Vue.component(
    componentName,
    componentConfig.default || componentConfig
  )
})</code></pre><h1 id="articleHeader6">&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;</h1><h2 id="articleHeader7">&#x7236;&#x5355;&#x5411;&#x5B50;&#x7684; props</h2><p>Vue 2.x &#x4EE5;&#x540E;&#x7236;&#x7EC4;&#x4EF6;&#x7528;<code>props</code>&#x5411;&#x5B50;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x6570;&#x636E;&#xFF0C;&#x8FD9;&#x79CD;&#x4F20;&#x9012;&#x662F;&#x5355;&#x5411;/&#x6B63;&#x5411;&#x7684;&#xFF0C;&#x53CD;&#x4E4B;&#x4E0D;&#x80FD;&#x3002;&#x8FD9;&#x79CD;&#x8BBE;&#x8BA1;&#x662F;&#x4E3A;&#x4E86;&#x907F;&#x514D;&#x5B50;&#x7EC4;&#x4EF6;&#x65E0;&#x610F;&#x95F4;&#x4FEE;&#x6539;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x72B6;&#x6001;&#x3002;</p><p>&#x5B50;&#x7EC4;&#x4EF6;&#x9700;&#x8981;&#x9009;&#x9879;<code>props</code>&#x58F0;&#x660E;&#x4ECE;&#x7236;&#x7EC4;&#x4EF6;&#x63A5;&#x6536;&#x7684;&#x6570;&#x636E;&#xFF0C;<code>props</code>&#x53EF;&#x4EE5;&#x662F;<strong>&#x5B57;&#x7B26;&#x4E32;&#x6570;&#x7EC4;</strong>&#x548C;<strong>&#x5BF9;&#x8C61;</strong>&#xFF0C;&#x4E00;&#x4E2A; .vue &#x5355;&#x6587;&#x4EF6;&#x7EC4;&#x4EF6;&#x793A;&#x4F8B;&#x5982;&#x4E0B;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ChildComponent.vue
&lt;template&gt;
    &lt;div&gt;
      &lt;b&gt;&#x5B50;&#x7EC4;&#x4EF6;&#xFF1A;&lt;/b&gt;{{message}}
    &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
  export default {
    name: &quot;ChildComponent&quot;,
    props: [&apos;message&apos;]
  }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code class="vue"><span class="xml">// ChildComponent.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">b</span>&gt;</span>&#x5B50;&#x7EC4;&#x4EF6;&#xFF1A;<span class="hljs-tag">&lt;/<span class="hljs-name">b</span>&gt;</span></span><span class="hljs-template-variable">"{{"message"}}"</span><span class="xml">
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;ChildComponent&quot;</span>,
    <span class="hljs-attr">props</span>: [<span class="hljs-string">&apos;message&apos;</span>]
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p>&#x7236;&#x7EC4;&#x4EF6;&#x53EF;&#x76F4;&#x63A5;&#x4F20;&#x5355;&#x4E2A;&#x6570;&#x636E;&#x503C;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;&#x6307;&#x4EE4;<code>v-bind</code>&#x52A8;&#x6001;&#x7ED1;&#x5B9A;&#x6570;&#x636E;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// parentComponent.vue
&lt;template&gt;
    &lt;div&gt;
      &lt;h1&gt;&#x7236;&#x7EC4;&#x4EF6;&lt;/h1&gt;
      &lt;ChildComponent message=&quot;&#x7236;&#x7EC4;&#x4EF6;&#x5411;&#x5B50;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x7684;&#x975E;&#x52A8;&#x6001;&#x503C;&quot;&gt;&lt;/ChildComponent&gt;
      &lt;input type=&quot;text&quot; v-model=&quot;parentMassage&quot;/&gt;
      &lt;ChildComponent :message=&quot;parentMassage&quot;&gt;&lt;/ChildComponent&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
  import ChildComponent from &apos;@/components/ChildComponent&apos;
  export default {
    components: {
      ChildComponent
    },
    data () {
      return {
        parentMassage: &apos;&apos;
      }
    }
  }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code class="vue">// parentComponent.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>&#x7236;&#x7EC4;&#x4EF6;<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ChildComponent</span> <span class="hljs-attr">message</span>=<span class="hljs-string">&quot;&#x7236;&#x7EC4;&#x4EF6;&#x5411;&#x5B50;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x7684;&#x975E;&#x52A8;&#x6001;&#x503C;&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ChildComponent</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;parentMassage&quot;</span>/&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ChildComponent</span> <span class="hljs-attr">:message</span>=<span class="hljs-string">&quot;parentMassage&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ChildComponent</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> ChildComponent <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/components/ChildComponent&apos;</span>
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">components</span>: {
      ChildComponent
    },
    data () {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">parentMassage</span>: <span class="hljs-string">&apos;&apos;</span>
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x914D;&#x7F6E;&#x8DEF;&#x7531;&#x540E;&#x8FD0;&#x884C;&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbgZqB?w=1728&amp;h=410" src="https://static.alili.tech/img/bVbgZqB?w=1728&amp;h=410" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h2 id="articleHeader8">&#x5B50;&#x5411;&#x7236;&#x7684; $emit</h2><p>&#x5F53;&#x5B50;&#x7EC4;&#x4EF6;&#x5411;&#x7236;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x6570;&#x636E;&#x65F6;&#xFF0C;&#x5C31;&#x8981;&#x7528;&#x5230;<strong>&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;</strong>&#x3002;&#x5B50;&#x7EC4;&#x4EF6;&#x4E2D;&#x4F7F;&#x7528; <code>$emit()</code>&#x89E6;&#x53D1;&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6;&#xFF0C;&#x7236;&#x7EC4;&#x4EF6;&#x4F7F;&#x7528;<code>$on()</code>&#x76D1;&#x542C;&#xFF0C;&#x7C7B;&#x4F3C;&#x89C2;&#x5BDF;&#x8005;&#x6A21;&#x5F0F;&#x3002;</p><p>&#x5B50;&#x7EC4;&#x4EF6;<code>$emit()</code>&#x4F7F;&#x7528;&#x793A;&#x4F8B;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ChildComponent.vue
&lt;template&gt;
  &lt;div&gt;
    &lt;b&gt;&#x5B50;&#x7EC4;&#x4EF6;&#xFF1A;&lt;/b&gt;&lt;button @click=&quot;handleIncrease&quot;&gt;&#x4F20;&#x9012;&#x6570;&#x503C;&#x7ED9;&#x7236;&#x7EC4;&#x4EF6;&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
  export default {
    name: &quot;ChildComponent&quot;,
    methods: {
      handleIncrease () {
        this.$emit(&apos;increase&apos;,5)
      }
    }
  }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code class="vue">// ChildComponent.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">b</span>&gt;</span>&#x5B50;&#x7EC4;&#x4EF6;&#xFF1A;<span class="hljs-tag">&lt;/<span class="hljs-name">b</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;handleIncrease&quot;</span>&gt;</span>&#x4F20;&#x9012;&#x6570;&#x503C;&#x7ED9;&#x7236;&#x7EC4;&#x4EF6;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;ChildComponent&quot;</span>,
    <span class="hljs-attr">methods</span>: {
      handleIncrease () {
        <span class="hljs-keyword">this</span>.$emit(<span class="hljs-string">&apos;increase&apos;</span>,<span class="hljs-number">5</span>)
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x7236;&#x7EC4;&#x4EF6;&#x76D1;&#x542C;&#x81EA;&#x5B9A;&#x4E49;&#x4E8B;&#x4EF6; increase&#xFF0C;&#x5E76;&#x505A;&#x51FA;&#x54CD;&#x5E94;&#x7684;&#x793A;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// parentComponent.vue
&lt;template&gt;
    &lt;div&gt;
      &lt;h1&gt;&#x7236;&#x7EC4;&#x4EF6;&lt;/h1&gt;
      &lt;p&gt;&#x6570;&#x503C;&#xFF1A;{{total}}&lt;/p&gt;
      &lt;ChildComponent @increase=&quot;getTotal&quot;&gt;&lt;/ChildComponent&gt;
    &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
  import ChildComponent from &apos;@/components/ChildComponent&apos;
  export default {
    components: {
      ChildComponent
    },
    data () {
      return {
        total: 0
      }
    },
    methods: {
      getTotal (count) {
        this.total = count
      }
    }
  }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dust"><code class="vue"><span class="xml">// parentComponent.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>&#x7236;&#x7EC4;&#x4EF6;<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x6570;&#x503C;&#xFF1A;</span><span class="hljs-template-variable">"{{"total}</span><span class="xml">}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ChildComponent</span> @<span class="hljs-attr">increase</span>=<span class="hljs-string">&quot;getTotal&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ChildComponent</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> ChildComponent <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/components/ChildComponent&apos;</span>
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> </span></span><span class="hljs-template-variable">{
    components: {
      ChildComponent
    }</span><span class="xml"><span class="undefined">,
    data () </span></span><span class="hljs-template-variable">{
      return {
        total: 0
      }</span><span class="xml"><span class="undefined">
    },
    methods: </span></span><span class="hljs-template-variable">{
      getTotal (count) {
        this.total = count
      }</span><span class="xml"><span class="undefined">
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p>&#x8BBF;&#x95EE; parentComponent.vue &#x9875;&#x9762;&#xFF0C;&#x70B9;&#x51FB;&#x6309;&#x94AE;&#x540E;&#x5B50;&#x7EC4;&#x4EF6;&#x5C06;&#x6570;&#x503C;&#x4F20;&#x9012;&#x7ED9;&#x7236;&#x7EC4;&#x4EF6;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbgZDF?w=1884&amp;h=556" src="https://static.alili.tech/img/bVbgZDF?w=1884&amp;h=556" alt="clipboard.png" title="clipboard.png" style="cursor:pointer"></span></p><h2 id="articleHeader9">&#x5B50;&#x5B59;&#x7684;&#x94FE;&#x4E0E;&#x7D22;&#x5F15;</h2><p>&#x7EC4;&#x4EF6;&#x7684;&#x5173;&#x7CFB;&#x6709;&#x5F88;&#x591A;&#x65F6;&#x8DE8;&#x7EA7;&#x7684;&#xFF0C;&#x8FD9;&#x4E9B;&#x7EC4;&#x4EF6;&#x7684;&#x8C03;&#x7528;&#x5F62;&#x6210;&#x591A;&#x4E2A;&#x7236;&#x94FE;&#x4E0E;&#x5B50;&#x94FE;&#x3002;&#x7236;&#x7EC4;&#x4EF6;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;<code>this.$children</code>&#x8BBF;&#x95EE;&#x5B83;&#x6240;&#x6709;&#x7684;&#x5B50;&#x7EC4;&#x4EF6;&#xFF0C;&#x53EF;&#x65E0;&#x9650;&#x9012;&#x5F52;&#x5411;&#x4E0B;&#x8BBF;&#x95EE;&#x81F3;&#x6700;&#x5185;&#x5C42;&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&#x540C;&#x7406;&#x5B50;&#x7EC4;&#x4EF6;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;<code>this.$parent</code>&#x8BBF;&#x95EE;&#x7236;&#x7EC4;&#x4EF6;&#xFF0C;&#x53EF;&#x65E0;&#x9650;&#x9012;&#x5F52;&#x5411;&#x4E0A;&#x8BBF;&#x95EE;&#x76F4;&#x5230;&#x6839;&#x5B9E;&#x4F8B;&#x3002;</p><p>&#x4EE5;&#x4E0B;&#x662F;&#x5B50;&#x7EC4;&#x4EF6;&#x901A;&#x8FC7;&#x7236;&#x94FE;&#x4F20;&#x503C;&#x7684;&#x90E8;&#x5206;&#x793A;&#x4F8B;&#x4EE3;&#x7801;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// parentComponent.vue
&lt;template&gt;
    &lt;div&gt;
      &lt;p&gt;{{message}}&lt;/p&gt;
      &lt;ChildComponent&gt;&lt;/ChildComponent&gt;
    &lt;/div&gt;
&lt;/template&gt;


// ChildComponent.vue
&lt;template&gt;
  &lt;div&gt;
    &lt;b&gt;&#x5B50;&#x7EC4;&#x4EF6;&#xFF1A;&lt;/b&gt;&lt;button @click=&quot;handleChange&quot;&gt;&#x901A;&#x8FC7;&#x7236;&#x94FE;&#x76F4;&#x63A5;&#x4FEE;&#x6539;&#x6570;&#x636E;&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
  export default {
    name: &quot;ChildComponent&quot;,
    methods: {
      handleChange () {
        this.$parent.message = &apos;&#x6765;&#x81EA; ChildComponent &#x7684;&#x5185;&#x5BB9;&apos;
      }
    }
  }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code class="vue"><span class="xml">// parentComponent.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{"message"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ChildComponent</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ChildComponent</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>


// ChildComponent.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">b</span>&gt;</span>&#x5B50;&#x7EC4;&#x4EF6;&#xFF1A;<span class="hljs-tag">&lt;/<span class="hljs-name">b</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;handleChange&quot;</span>&gt;</span>&#x901A;&#x8FC7;&#x7236;&#x94FE;&#x76F4;&#x63A5;&#x4FEE;&#x6539;&#x6570;&#x636E;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;ChildComponent&quot;</span>,
    <span class="hljs-attr">methods</span>: {
      handleChange () {
        <span class="hljs-keyword">this</span>.$parent.message = <span class="hljs-string">&apos;&#x6765;&#x81EA; ChildComponent &#x7684;&#x5185;&#x5BB9;&apos;</span>
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p>&#x663E;&#x7136;&#x70B9;&#x51FB;&#x7236;&#x7EC4;&#x4EF6;&#x9875;&#x9762;&#x7684;&#x6309;&#x94AE;&#x540E;&#x4F1A;&#x6536;&#x5230;&#x5B50;&#x7EC4;&#x4EF6;&#x4F20;&#x8FC7;&#x6765;&#x7684; message&#x3002;</p><blockquote>&#x5728;&#x4E1A;&#x52A1;&#x4E2D;&#x5E94;&#x5C3D;&#x91CF;&#x907F;&#x514D;&#x4F7F;&#x7528;&#x7236;&#x94FE;&#x6216;&#x5B50;&#x94FE;&#xFF0C;&#x56E0;&#x4E3A;&#x8FD9;&#x79CD;&#x6570;&#x636E;&#x4F9D;&#x8D56;&#x4F1A;&#x4F7F;&#x7236;&#x5B50;&#x7EC4;&#x4EF6;&#x7D27;&#x8026;&#x5408;&#xFF0C;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x53EF;&#x80FD;&#x88AB;&#x5176;&#x4ED6;&#x7EC4;&#x4EF6;&#x4EFB;&#x610F;&#x4FEE;&#x6539;&#x663E;&#x7136;&#x662F;&#x4E0D;&#x597D;&#x7684;&#xFF0C;&#x6240;&#x4EE5;&#x7EC4;&#x4EF6;&#x7236;&#x5B50;&#x901A;&#x4FE1;&#x5E38;&#x7528;<code>props</code>&#x548C;<code>$emit</code>&#x3002;</blockquote><h2 id="articleHeader10">&#x4E2D;&#x592E;&#x4E8B;&#x4EF6;&#x603B;&#x7EBF; Bus</h2><p>&#x5B50;&#x5B59;&#x7684;&#x94FE;&#x5F0F;&#x901A;&#x4FE1;&#x663E;&#x7136;&#x4F1A;&#x4F7F;&#x5F97;&#x7EC4;&#x4EF6;&#x7D27;&#x8026;&#x5408;&#xFF0C;&#x540C;&#x65F6;&#x5144;&#x5F1F;&#x7EC4;&#x4EF6;&#x95F4;&#x7684;&#x901A;&#x4FE1;&#x8BE5;&#x5982;&#x4F55;&#x5B9E;&#x73B0;&#x5462;&#xFF1F;&#x8FD9;&#x91CC;&#x4ECB;&#x7ECD;&#x4E2D;&#x592E;&#x4E8B;&#x4EF6;&#x603B;&#x7EBF;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x5B9E;&#x9645;&#x4E0A;&#x5C31;&#x662F;<strong>&#x7528;&#x4E00;&#x4E2A;vue&#x5B9E;&#x4F8B;&#xFF08;Bus&#xFF09;&#x4F5C;&#x4E3A;&#x5A92;&#x4ECB;</strong>&#xFF0C;&#x9700;&#x8981;&#x901A;&#x4FE1;&#x7684;&#x7EC4;&#x4EF6;&#x90FD;&#x5F15;&#x5165; Bus&#xFF0C;&#x4E4B;&#x540E;&#x901A;&#x8FC7;&#x5206;&#x522B;&#x89E6;&#x53D1;&#x548C;&#x76D1;&#x542C; Bus &#x4E8B;&#x4EF6;&#xFF0C;&#x8FDB;&#x800C;&#x5B9E;&#x73B0;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x7684;&#x901A;&#x4FE1;&#x548C;&#x53C2;&#x6570;&#x4F20;&#x9012;&#x3002;</p><p>&#x9996;&#x5148;&#x5EFA; Vue &#x5B9E;&#x4F8B;&#x4F5C;&#x4E3A;&#x603B;&#x7EBF;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Bus.js
import Vue from &apos;vue&apos;
export default new Vue;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// Bus.js</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vue;</code></pre><p>&#x9700;&#x8981;&#x901A;&#x4FE1;&#x7684;&#x7EC4;&#x4EF6;&#x90FD;&#x5F15;&#x5165; Bus.js&#xFF0C;&#x4F7F;&#x7528; <code>$emit</code>&#x53D1;&#x9001;&#x4FE1;&#x606F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ComponentA.vue
&lt;template&gt;
  &lt;div&gt;
    &lt;b&gt;&#x7EC4;&#x4EF6;A&#xFF1A;&lt;/b&gt;&lt;button @click=&quot;handleBus&quot;&gt;&#x4F20;&#x9012;&#x6570;&#x503C;&#x7ED9;&#x9700;&#x8981;&#x7684;&#x7EC4;&#x4EF6;&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
  import Bus from &apos;./bus.js&apos; 
  export default {
    methods: {
      handleBus () {
        Bus.$emit(&apos;someBusMessage&apos;,&apos;&#x6765;&#x81EA;ComponentA&#x7684;&#x6570;&#x636E;&apos;)
      }
    }
  }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code class="vue">// ComponentA.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">b</span>&gt;</span>&#x7EC4;&#x4EF6;A&#xFF1A;<span class="hljs-tag">&lt;/<span class="hljs-name">b</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;handleBus&quot;</span>&gt;</span>&#x4F20;&#x9012;&#x6570;&#x503C;&#x7ED9;&#x9700;&#x8981;&#x7684;&#x7EC4;&#x4EF6;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> Bus <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./bus.js&apos;</span> 
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">methods</span>: {
      handleBus () {
        Bus.$emit(<span class="hljs-string">&apos;someBusMessage&apos;</span>,<span class="hljs-string">&apos;&#x6765;&#x81EA;ComponentA&#x7684;&#x6570;&#x636E;&apos;</span>)
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x9700;&#x8981;&#x7EC4;&#x4EF6;A&#x4FE1;&#x606F;&#x7684;&#x5C31;&#x4F7F;&#x7528;<code>$on</code>&#x76D1;&#x542C;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ComponentB.vue
&lt;template&gt;
  &lt;div&gt;
    &lt;b&gt;&#x7EC4;&#x4EF6;B&#xFF1A;&lt;/b&gt;&lt;button @click=&quot;handleBus&quot;&gt;&#x63A5;&#x6536;&#x7EC4;&#x4EF6;A&#x7684;&#x4FE1;&#x606F;&lt;/button&gt;
    &lt;p&gt;{{message}}&lt;/p&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
  import Bus from &apos;./bus.js&apos; 
  export default {
    data() {
      return {
        message: &apos;&apos;
      }
    },
    created () {
      let that = this // &#x4FDD;&#x5B58;&#x5F53;&#x524D;&#x5BF9;&#x8C61;&#x7684;&#x4F5C;&#x7528;&#x57DF;this
      Bus.$on(&apos;someBusMessage&apos;,function (data) {
        that.message = data
      })
    },
    beforeDestroy () {
      // &#x624B;&#x52A8;&#x9500;&#x6BC1; $on &#x4E8B;&#x4EF6;&#xFF0C;&#x9632;&#x6B62;&#x591A;&#x6B21;&#x89E6;&#x53D1;
      Bus.$off(&apos;someBusMessage&apos;, this.someBusMessage)
    }
  }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code><span class="xml">// ComponentB.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">b</span>&gt;</span>&#x7EC4;&#x4EF6;B&#xFF1A;<span class="hljs-tag">&lt;/<span class="hljs-name">b</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;handleBus&quot;</span>&gt;</span>&#x63A5;&#x6536;&#x7EC4;&#x4EF6;A&#x7684;&#x4FE1;&#x606F;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{"message"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> Bus <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./bus.js&apos;</span> 
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data() {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">message</span>: <span class="hljs-string">&apos;&apos;</span>
      }
    },
    created () {
      <span class="hljs-keyword">let</span> that = <span class="hljs-keyword">this</span> <span class="hljs-comment">// &#x4FDD;&#x5B58;&#x5F53;&#x524D;&#x5BF9;&#x8C61;&#x7684;&#x4F5C;&#x7528;&#x57DF;this</span>
      Bus.$on(<span class="hljs-string">&apos;someBusMessage&apos;</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
        that.message = data
      })
    },
    beforeDestroy () {
      <span class="hljs-comment">// &#x624B;&#x52A8;&#x9500;&#x6BC1; $on &#x4E8B;&#x4EF6;&#xFF0C;&#x9632;&#x6B62;&#x591A;&#x6B21;&#x89E6;&#x53D1;</span>
      Bus.$off(<span class="hljs-string">&apos;someBusMessage&apos;</span>, <span class="hljs-keyword">this</span>.someBusMessage)
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><h1 id="articleHeader11">&#x9012;&#x5F52;&#x7EC4;&#x4EF6;</h1><p>&#x7EC4;&#x4EF6;&#x53EF;&#x4EE5;&#x5728;&#x81EA;&#x5DF1;&#x7684; template &#x6A21;&#x677F;&#x4E2D;&#x8C03;&#x7528;&#x81EA;&#x5DF1;&#xFF0C;&#x9700;&#x8981;&#x8BBE;&#x7F6E; name &#x9009;&#x62E9;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x9012;&#x5F52;&#x7EC4;&#x4EF6; ComponentRecursion.vue
&lt;template&gt;
  &lt;div&gt;
    &lt;p&gt;&#x9012;&#x5F52;&#x7EC4;&#x4EF6;&lt;/p&gt;
    &lt;ComponentRecursion :count=&quot;count + 1&quot; v-if=&quot;count &lt; 3&quot;&gt;&lt;/ComponentRecursion&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
  export default {
    name: &quot;ComponentRecursion&quot;,
    props: {
      count: {
        type: Number,
        default: 1
      }
    }
  }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code class="vue">// &#x9012;&#x5F52;&#x7EC4;&#x4EF6; ComponentRecursion.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x9012;&#x5F52;&#x7EC4;&#x4EF6;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ComponentRecursion</span> <span class="hljs-attr">:count</span>=<span class="hljs-string">&quot;count + 1&quot;</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">&quot;count &lt; 3&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ComponentRecursion</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&quot;ComponentRecursion&quot;</span>,
    <span class="hljs-attr">props</span>: {
      <span class="hljs-attr">count</span>: {
        <span class="hljs-attr">type</span>: <span class="hljs-built_in">Number</span>,
        <span class="hljs-attr">default</span>: <span class="hljs-number">1</span>
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x5982;&#x679C;&#x9012;&#x5F52;&#x7EC4;&#x4EF6;&#x6CA1;&#x6709; count &#x7B49;&#x9650;&#x5236;&#x6570;&#x91CF;&#xFF0C;&#x5C31;&#x4F1A;&#x629B;&#x51FA;&#x9519;&#x8BEF;&#xFF08;Uncaught RangeError: Maximum call stack size exceeded&#xFF09;&#x3002;</p><p>&#x7236;&#x9875;&#x9762;&#x4F7F;&#x7528;&#x8BE5;&#x9012;&#x5F52;&#x7EC4;&#x4EF6;&#xFF0C;&#x5728; Chrome &#x4E2D;&#x7684; <strong>Vue Devtools</strong> &#x53EF;&#x4EE5;&#x770B;&#x5230;&#x7EC4;&#x4EF6;&#x9012;&#x5F52;&#x4E86;&#x4E09;&#x6B21;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbg0TJ?w=2122&amp;h=608" src="https://static.alili.tech/img/bVbg0TJ?w=2122&amp;h=608" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><blockquote>&#x9012;&#x5F52;&#x7EC4;&#x4EF6;&#x53EF;&#x4EE5;&#x5F00;&#x53D1;&#x672A;&#x77E5;&#x5C42;&#x7EA7;&#x5173;&#x7CFB;&#x7684;&#x72EC;&#x7ACB;&#x7EC4;&#x4EF6;&#xFF0C;&#x5982;&#x7EA7;&#x8054;&#x9009;&#x62E9;&#x5668;&#x548C;&#x6811;&#x5F62;&#x63A7;&#x4EF6;&#x7B49;&#x3002;</blockquote><h1 id="articleHeader12">&#x52A8;&#x6001;&#x7EC4;&#x4EF6;</h1><p>&#x5982;&#x679C;&#x5C06;&#x4E00;&#x4E2A; Vue &#x7EC4;&#x4EF6;&#x547D;&#x540D;&#x4E3A; Component &#x4F1A;&#x62A5;&#x9519;&#xFF08;Do not use built-in or reserved HTML elements as component id: Component&#xFF09;&#xFF0C;&#x56E0;&#x4E3A; Vue &#x63D0;&#x4F9B;&#x4E86;&#x7279;&#x6B8A;&#x7684;&#x5143;&#x7D20; <code>&lt;component&gt;</code>&#x6765;&#x52A8;&#x6001;&#x6302;&#x8F7D;&#x4E0D;&#x540C;&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&#x5E76;&#x4F7F;&#x7528; <code>is</code> &#x7279;&#x6027;&#x6765;&#x9009;&#x62E9;&#x8981;&#x6302;&#x8F7D;&#x7684;&#x7EC4;&#x4EF6;&#x3002;</p><p>&#x4EE5;&#x4E0B;&#x662F;&#x4F7F;&#x7528;<code>&lt;component&gt;</code>&#x52A8;&#x6001;&#x6302;&#x8F7D;&#x4E0D;&#x540C;&#x7EC4;&#x4EF6;&#x7684;&#x793A;&#x4F8B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// parentComponent.vue
&lt;template&gt;
 &lt;div&gt;
    &lt;h1&gt;&#x7236;&#x7EC4;&#x4EF6;&lt;/h1&gt;
    &lt;component :is=&quot;currentView&quot;&gt;&lt;/component&gt;
    &lt;button @click = &quot;changeToViewB&quot;&gt;&#x5207;&#x6362;&#x5230;B&#x89C6;&#x56FE;&lt;/button&gt;
 &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
  import ComponentA from &apos;@/components/ComponentA&apos;
  import ComponentB from &apos;@/components/ComponentB&apos;
  export default {
   components: {
      ComponentA,
      ComponentB
    },
   data() {
      return {
        currentView: ComponentA // &#x9ED8;&#x8BA4;&#x663E;&#x793A;&#x7EC4;&#x4EF6; A
      }
    },
    methods: {
      changeToViewB () {
        this.currentView = ComponentB // &#x5207;&#x6362;&#x5230;&#x7EC4;&#x4EF6; B
      }
    }
  }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code class="vue">// parentComponent.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>&#x7236;&#x7EC4;&#x4EF6;<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">:is</span>=<span class="hljs-string">&quot;currentView&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span> = <span class="hljs-string">&quot;changeToViewB&quot;</span>&gt;</span>&#x5207;&#x6362;&#x5230;B&#x89C6;&#x56FE;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
 <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> ComponentA <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/components/ComponentA&apos;</span>
  <span class="hljs-keyword">import</span> ComponentB <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/components/ComponentB&apos;</span>
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
   <span class="hljs-attr">components</span>: {
      ComponentA,
      ComponentB
    },
   data() {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">currentView</span>: ComponentA <span class="hljs-comment">// &#x9ED8;&#x8BA4;&#x663E;&#x793A;&#x7EC4;&#x4EF6; A</span>
      }
    },
    <span class="hljs-attr">methods</span>: {
      changeToViewB () {
        <span class="hljs-keyword">this</span>.currentView = ComponentB <span class="hljs-comment">// &#x5207;&#x6362;&#x5230;&#x7EC4;&#x4EF6; B</span>
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x6539;&#x53D8; <code>this.currentView</code>&#x7684;&#x503C;&#x5C31;&#x53EF;&#x4EE5;&#x81EA;&#x7531;&#x5207;&#x6362; AB &#x7EC4;&#x4EF6;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbg0WS?w=1344&amp;h=336" src="https://static.alili.tech/img/bVbg0WS?w=1344&amp;h=336" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><blockquote>&#x4E0E;&#x4E4B;&#x7C7B;&#x4F3C;&#x7684;&#x662F;<code>vue-router</code>&#x7684;&#x5B9E;&#x73B0;&#x539F;&#x7406;&#xFF0C;&#x524D;&#x7AEF;&#x8DEF;&#x7531;&#x5230;&#x4E0D;&#x540C;&#x7684;&#x97F5;&#x5B9E;&#x9645;&#x4E0A;&#x5C31;&#x662F;&#x52A0;&#x8F7D;&#x4E0D;&#x540C;&#x7684;&#x7EC4;&#x4EF6;&#x3002;</blockquote><hr><h4>&#x8981;&#x7EE7;&#x7EED;&#x52A0;&#x6CB9;&#x5462;&#xFF0C;&#x5C11;&#x5E74;&#xFF01;</h4>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【Vue】详解组件的基础与高级用法

## 原文链接
[https://segmentfault.com/a/1190000016409329](https://segmentfault.com/a/1190000016409329)

