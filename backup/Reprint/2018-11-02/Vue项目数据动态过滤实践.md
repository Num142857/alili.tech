---
title: Vue项目数据动态过滤实践
hidden: true
categories: [reprint]
slug: c22fd7d7
date: 2018-11-02 02:30:12
---

{{< raw >}}
<p>&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x662F;&#x5728;&#x4E0B;&#x5728;&#x505A;&#x4E00;&#x4E2A;Vue&#x9879;&#x76EE;&#x4E2D;&#x9047;&#x5230;&#x7684;&#x5B9E;&#x9645;&#x573A;&#x666F;&#xFF0C;&#x8FD9;&#x91CC;&#x8BB0;&#x5F55;&#x4E00;&#x4E0B;&#x6211;&#x9047;&#x5230;&#x95EE;&#x9898;&#x4E4B;&#x540E;&#x7684;&#x601D;&#x8003;&#x548C;&#x6700;&#x540E;&#x600E;&#x4E48;&#x89E3;&#x51B3;&#x7684;(&#x8001;&#x5E74;&#x7A0B;&#x5E8F;&#x5458;&#x8BB0;&#x6027;&#x4E0D;&#x597D; -&#x3002;-)&#xFF0C;&#x8FC7;&#x7A0B;&#x4E2D;&#x4F1A;&#x6D89;&#x53CA;&#x5230;&#x4E00;&#x4E9B;Vue&#x6E90;&#x7801;&#x7684;&#x6982;&#x5FF5;&#x6BD4;&#x5982;<code>$mount</code>&#x3001;<code>render watcher</code>&#x7B49;&#xFF0C;&#x5982;&#x679C;&#x4E0D;&#x592A;&#x4E86;&#x89E3;&#x7684;&#x8BDD;&#x53EF;&#x4EE5;&#x7785;&#x7785; <a href="https://juejin.im/post/5b38830de51d455888216675" rel="nofollow noreferrer" target="_blank">Vue&#x6E90;&#x7801;&#x9605;&#x8BFB;&#x7CFB;&#x5217;&#x6587;&#x7AE0;</a> ~</p><p>&#x95EE;&#x9898;&#x662F;&#x8FD9;&#x6837;&#x7684;&#xFF1A;&#x9875;&#x9762;&#x4ECE;&#x540E;&#x53F0;&#x62FF;&#x5230;&#x7684;&#x6570;&#x636E;&#x662F;&#x7531;<code>0</code>&#x3001;<code>1</code>&#x4E4B;&#x7C7B;&#x7684;key&#xFF0C;&#x800C;&#x8FD9;&#x4E2A;key&#x4EE3;&#x8868;&#x7684;value&#x6BD4;&#x5982;<code>0-&#x5973;</code>&#x3001;<code>1-&#x7537;</code>&#x7684;&#x5BF9;&#x5E94;&#x5173;&#x7CFB;&#x662F;&#x8981;&#x4ECE;&#x53E6;&#x5916;&#x4E00;&#x4E2A;&#x6570;&#x636E;&#x5B57;&#x5178;&#x63A5;&#x53E3;&#x62FF;&#x5230;&#x7684;&#xFF1B;&#x7C7B;&#x4F3C;&#x4E8E;<a href="https://easy-mock.com/mock/59e6f5dd34be4b482ca23abe/ele-template/manage/config/sys-param/list-all" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x6837;&#x7684;Api</a>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;SEX_TYPE&quot;: [
    { &quot;paramValue&quot;: 0, &quot;paramDesc&quot;: &quot;&#x5973;&quot; },
    { &quot;paramValue&quot;: 1, &quot;paramDesc&quot;: &quot;&#x7537;&quot; }
  ]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">&quot;SEX_TYPE&quot;</span>: [
    { <span class="hljs-attr">&quot;paramValue&quot;</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">&quot;paramDesc&quot;</span>: <span class="hljs-string">&quot;&#x5973;&quot;</span> },
    { <span class="hljs-attr">&quot;paramValue&quot;</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">&quot;paramDesc&quot;</span>: <span class="hljs-string">&quot;&#x7537;&quot;</span> }
  ]
}</code></pre><p>&#x90A3;&#x4E48;&#x5982;&#x679C;view&#x62FF;&#x5230;&#x7684;&#x662F;<code>0</code>&#xFF0C;&#x5C31;&#x8981;&#x4ECE;&#x5B57;&#x5178;&#x4E2D;&#x627E;&#x5230;&#x5B83;&#x7684;&#x63CF;&#x8FF0;<code>&#x5973;</code>&#x5E76;&#x4E14;&#x663E;&#x793A;&#x51FA;&#x6765;&#xFF1B;&#x4E0B;&#x9762;&#x6545;&#x4E8B;&#x5F00;&#x59CB;&#x4E86;</p><h2 id="articleHeader0">1. &#x601D;&#x8003;</h2><p>&#x6709;&#x4EBA;&#x8BF4;&#xFF0C;&#x8FD9;&#x4E0D;&#x662F;&#x8FC7;&#x6EE4;&#x5668; <code>filter</code> &#x8981;&#x505A;&#x7684;&#x4E8B;&#x4E48;&#xFF0C;&#x76F4;&#x63A5;<a href="https://cn.vuejs.org/v2/api/#Vue-filter" rel="nofollow noreferrer" target="_blank">Vue.filter</a>&#x4E0D;&#x5C31;&#x884C;&#x4E86;&#xFF0C;&#x7136;&#x800C;&#x95EE;&#x9898;&#x662F;&#x8FD9;&#x4E2A;filter&#x662F;&#x8981;&#x7B49;&#x5F85;&#x5F02;&#x6B65;&#x7684;&#x6570;&#x636E;&#x5B57;&#x5178;&#x63A5;&#x53E3;&#x8FD4;&#x56DE;&#x4E4B;&#x540E;&#x624D;&#x80FD;&#x62FF;&#x5230;&#xFF0C;&#x5982;&#x679C;&#x5728;<code>$mount</code>&#x7684;&#x65F6;&#x5019;&#x8FD9;&#x4E2A;filter&#x6CA1;&#x6709;&#x627E;&#x5230;&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x4F1A;&#x5BFC;&#x81F4;&#x9519;&#x8BEF;&#x5F71;&#x54CD;&#x4E4B;&#x540E;&#x7684;&#x6E32;&#x67D3;(&#x767D;&#x5C4F;&#x5E76;&#x62A5;undefined&#x9519;)&#xFF1B;</p><p>&#x6211;&#x60F3;&#x5230;&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x6CD5;&#x6709;&#x4E24;&#x4E2A;&#xFF1A;</p><ol><li>&#x628A;&#x63A5;&#x53E3;&#x53D8;&#x4E3A;<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest/Synchronous_and_Asynchronous_Requests" rel="nofollow noreferrer" target="_blank">&#x540C;&#x6B65;</a>&#xFF0C;&#x5728;<code>beforeCreate</code>&#x6216;<code>created</code>&#x94A9;&#x5B50;&#x4E2D;&#x540C;&#x6B65;&#x5730;&#x83B7;&#x53D6;&#x6570;&#x636E;&#x5B57;&#x5178;&#x63A5;&#x53E3;&#xFF0C;&#x4FDD;&#x8BC1;&#x5728; <code>$mount</code>&#x7684;&#x65F6;&#x5019;&#x53EF;&#x4EE5;&#x62FF;&#x5230;&#x6CE8;&#x518C;&#x597D;&#x7684;filter&#xFF0C;&#x4FDD;&#x8BC1;&#x65F6;&#x5E8F;&#xFF0C;&#x4F46;&#x662F;&#x8FD9;&#x6837;&#x4F1A;&#x963B;&#x585E;&#x6302;&#x8F7D;&#xFF0C;&#x5EF6;&#x957F;&#x767D;&#x5C4F;&#x65F6;&#x95F4;&#xFF0C;&#x56E0;&#x6B64;&#x4E0D;&#x63A8;&#x4ECB;&#xFF1B;</li><li>&#x628A;filter&#x7684;&#x6CE8;&#x518C;&#x53D8;&#x4E3A;&#x5F02;&#x6B65;&#xFF0C;&#x5728;&#x83B7;&#x53D6;filter&#x4E4B;&#x540E;&#x901A;&#x77E5; <code>render watcher</code> &#x66F4;&#x65B0;&#x81EA;&#x5DF1;&#xFF0C;&#x8FD9;&#x6837;&#x53EF;&#x4EE5;&#x5229;&#x7528;vue&#x81EA;&#x5DF1;&#x7684;&#x54CD;&#x5E94;&#x5F0F;&#x5316;&#x66F4;&#x65B0;&#x89C6;&#x56FE;&#xFF0C;&#x4E0D;&#x4F1A;&#x963B;&#x585E;&#x6E32;&#x67D3;&#xFF0C;&#x56E0;&#x6B64;&#x5728;&#x4E0B;&#x521D;&#x6B65;&#x91C7;&#x7528;&#x4E86;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x3002;</li></ol><h2 id="articleHeader1">2. &#x5B9E;&#x73B0;</h2><p>&#x56E0;&#x4E3A;filter&#x5C5E;&#x4E8E; <a href="https://github.com/vuejs/vue/blob/3b43c81216c2e29bd519c447e930d6512b5782e8/src/shared/constants.js#L3" rel="nofollow noreferrer" target="_blank">asset_types</a> &#xFF0C;&#x5173;&#x4E8E;&#x5728;Vue&#x5B9E;&#x4F8B;&#x4E2D;asset_types&#x7684;&#x8BBF;&#x95EE;&#x94FE;&#x6709;&#x4EE5;&#x4E0B;&#x51E0;&#x4E2A;&#x7ED3;&#x8BBA;&#xFF1B;&#x5177;&#x4F53;&#x4EE3;&#x7801;&#x5B9E;&#x8DF5;&#x53EF;&#x4EE5;&#x53C2;&#x8003;&#xFF1A; <a href="https://codepen.io/SHERlocked93/pen/GXmXrM" rel="nofollow noreferrer" target="_blank">Codepen - filter test</a><button class="btn btn-xs btn-default ml10 preview" data-url="SHERlocked93/pen/GXmXrM" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></p><ol><li><code>asset_types</code>&#x5305;&#x62EC;<code>filters</code>&#x3001;<code>components</code>&#x3001;<code>directives</code>&#xFF0C;&#x4EE5;&#x4E0B;&#x6240;&#x6709;&#x7684;<code>asset_types</code>&#x90FD;&#x81EA;&#x884C;&#x66FF;&#x6362;&#x6210;&#x524D;&#x9762;&#x51E0;&#x9879;</li><li>&#x5B50;&#x7EC4;&#x4EF6;&#x4E2D;&#x7684;<code>asset_types</code>&#x8BBF;&#x95EE;&#x4E0D;&#x5230;&#x7236;&#x7EC4;&#x4EF6;&#x4E2D;&#x7684;<code>asset_types</code>&#xFF0C;&#x4F46;&#x662F;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x5230;&#x5168;&#x5C40;&#x6CE8;&#x518C;&#x7684;&#x6302;&#x8F7D;&#x5728;<code>$root.$options.asset_types.__proto__</code>&#x4E0A;&#x7684;<code>asset_types</code>&#xFF0C;&#x8FD9;&#x91CC;&#x5BF9;&#x5E94;&#x6E90;&#x7801; <a href="https://github.com/vuejs/vue/blob/3b43c81216c2e29bd519c447e930d6512b5782e8/src/core/util/options.js#L412" rel="nofollow noreferrer" target="_blank">src/core/util/options.js</a></li><li>&#x5168;&#x5C40;&#x6CE8;&#x518C;&#x65B9;&#x6CD5;Vue.asset_types&#xFF0C;&#x6BD4;&#x5982;Vue.filters&#x6CE8;&#x518C;&#x7684;asset_types&#x4F1A;&#x6302;&#x8F7D;&#x5230;&#x6839;&#x5B9E;&#x4F8B;(&#x5176;&#x4ED6;&#x5B9E;&#x4F8B;&#x7684;<code>$root</code>)&#x7684;<code>$options.asset_types.__proto__</code>&#x4E0A;&#xFF0C;&#x5E76;&#x88AB;&#x4EE5;&#x540E;&#x6240;&#x6709;&#x521B;&#x5EFA;&#x7684;Vue&#x5B9E;&#x4F8B;&#x7EE7;&#x627F;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x8BF4;&#xFF0C;&#x4EE5;&#x540E;&#x6240;&#x6709;&#x521B;&#x5EFA;&#x7684;Vue&#x5B9E;&#x4F8B;&#x90FD;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x5230;</li><li>&#x7EC4;&#x4EF6;&#x7684;slot&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x4EC5;&#x9650;&#x4E8E;&#x5B83;&#x88AB;&#x5B9A;&#x4E49;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x4E5F;&#x5C31;&#x662F;&#x5B83;&#x88AB;&#x5B9A;&#x4E49;&#x7684;&#x7EC4;&#x4EF6;&#x4E2D;&#xFF0C;&#x8BBF;&#x95EE;&#x4E0D;&#x5230;&#x7236;&#x7EC4;&#x4EF6;&#x7684;<code>asset_types</code>&#xFF0C;&#x4F46;&#x662F;&#x53EF;&#x4EE5;&#x8BBF;&#x95EE;&#x5230;&#x5168;&#x5C40;&#x5B9A;&#x4E49;&#x7684;<code>asset_types</code></li><li>&#x540C;&#x7406;&#xFF0C;&#x56E0;&#x4E3A;main.js&#x4E2D;&#x7684;<code>new Vue()</code>&#x5B9E;&#x4F8B;&#x662F;&#x6839;&#x5B9E;&#x4F8B;&#xFF0C;&#x5B83;&#x4E2D;&#x6CE8;&#x518C;&#x7684;<code>asset_types</code>&#x4F1A;&#x88AB;&#x6302;&#x8F7D;&#x5728;<code>$root.$options.asset_types</code>&#x4E0A;&#x800C;&#x4E0D;&#x662F;<code>$root.$options.asset_types.__proto__</code>&#x4E0A;</li></ol><p>&#x6839;&#x636E;&#x4EE5;&#x4E0A;&#x51E0;&#x4E2A;&#x7ED3;&#x8BBA;&#xFF0C;&#x53EF;&#x4EE5;&#x7740;&#x624B;coding&#x4E86;~</p><h3 id="articleHeader2">2.1 &#x4F7F;&#x7528;&#x6839;&#x7EC4;&#x4EF6;&#x7684;filters</h3><p>&#x56E0;&#x6B64;&#x9996;&#x5148;&#x6211;&#x8003;&#x8651;&#x7684;&#x662F;&#x628A;&#x8981;&#x6CE8;&#x518C;&#x7684;filter&#x6302;&#x8F7D;&#x5230;&#x6839;&#x7EC4;&#x4EF6;&#x4E0A;&#xFF0C;&#x8FD9;&#x6837;&#x5176;&#x4ED6;&#x7EC4;&#x4EF6;&#x901A;&#x8FC7;&#x8BBF;&#x95EE;<code>$root</code>&#x53EF;&#x4EE5;&#x62FF;&#x5230;&#x6CE8;&#x518C;&#x7684;filter&#xFF0C;&#x8FD9;&#x91CC;&#x7684;&#x5B9E;&#x73B0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;div&gt;
    {{ rootFilters( sexVal )}}
  &lt;/div&gt;
&lt;/template&gt;
 
&lt;script type=&apos;text/javascript&apos;&gt;
  import Vue from &apos;vue&apos;
  import { registerFilters } from &apos;utils/filters&apos;
 
  export default {
    data() {
      return {
        sexVal: 1  // &#x6027;&#x522B;
      }
    },
    methods: {
      /* &#x6839;&#x7EC4;&#x4EF6;&#x4E0A;&#x7684;&#x8FC7;&#x6EE4;&#x5668; */
      rootFilters(val, id = &apos;SEX_TYPE&apos;) {
        const mth = this.$root.$options.filters[id]
        return mth &amp;&amp; mth(val) || val
      }
    },
    created() {
      // &#x628A;&#x6839;&#x7EC4;&#x4EF6;&#x4E2D;&#x7684;filters&#x54CD;&#x5E94;&#x5F0F;&#x5316;
      Vue.util.defineReactive(this.$root.$options, &apos;filters&apos;, this.$root.$options.filters)
    },
    mounted() {
      registerFilters.call(this)
        .then(data =&gt;
          // &#x8FD9;&#x91CC;&#x83B7;&#x53D6;&#x5230;&#x6570;&#x636E;&#x5B57;&#x5178;&#x7684;data
        )
    }
  }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code class="vue"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    </span><span class="hljs-template-variable">"{{" rootFilters( sexVal )"}}"</span><span class="xml">
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
 
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&apos;text/javascript&apos;</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>
  <span class="hljs-keyword">import</span> { registerFilters } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;utils/filters&apos;</span>
 
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data() {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">sexVal</span>: <span class="hljs-number">1</span>  <span class="hljs-comment">// &#x6027;&#x522B;</span>
      }
    },
    <span class="hljs-attr">methods</span>: {
      <span class="hljs-comment">/* &#x6839;&#x7EC4;&#x4EF6;&#x4E0A;&#x7684;&#x8FC7;&#x6EE4;&#x5668; */</span>
      rootFilters(val, id = <span class="hljs-string">&apos;SEX_TYPE&apos;</span>) {
        <span class="hljs-keyword">const</span> mth = <span class="hljs-keyword">this</span>.$root.$options.filters[id]
        <span class="hljs-keyword">return</span> mth &amp;&amp; mth(val) || val
      }
    },
    created() {
      <span class="hljs-comment">// &#x628A;&#x6839;&#x7EC4;&#x4EF6;&#x4E2D;&#x7684;filters&#x54CD;&#x5E94;&#x5F0F;&#x5316;</span>
      Vue.util.defineReactive(<span class="hljs-keyword">this</span>.$root.$options, <span class="hljs-string">&apos;filters&apos;</span>, <span class="hljs-keyword">this</span>.$root.$options.filters)
    },
    mounted() {
      registerFilters.call(<span class="hljs-keyword">this</span>)
        .then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span>
          <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x83B7;&#x53D6;&#x5230;&#x6570;&#x636E;&#x5B57;&#x5178;&#x7684;data</span>
        )
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p>&#x6CE8;&#x518C;filter&#x7684;js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// utils/filters
 
import * as Api from &apos;api&apos;
 
/**
* &#x83B7;&#x53D6;&#x5E76;&#x6CE8;&#x518C;&#x8FC7;&#x6EE4;&#x5668;
* &#x6CE8;&#x518C;&#x5728;$root.$options.filters&#x4E0A;&#x4E0D;&#x662F;$root.$options.filters.__proto__&#x4E0A;
* &#x6CE8;&#x610F;&#x8FD9;&#x91CC;&#x7684;this&#x662F;vue&#x5B9E;&#x4F8B;&#xFF0C;&#x9700;&#x8981;&#x7528;call&#x6216;apply&#x8C03;&#x7528;
* @returns {Promise}
*/
export function registerFilters() {
  return Api.sysParams()            // &#x83B7;&#x53D6;&#x6570;&#x636E;&#x5B57;&#x5178;&#x7684;Api&#xFF0C;&#x8FD4;&#x56DE;&#x7684;&#x662F;promise
    .then(({ data }) =&gt; {
      Object.keys(data).forEach(T =&gt;
        this.$set(this.$root.$options.filters, T, val =&gt; {
          const tar = data[T].find(item =&gt; item[&apos;paramValue&apos;] === val)
          return tar[&apos;paramDesc&apos;] || &apos;&apos;
        })
      )
      return data
    })
    .catch(err =&gt; console.error(err, &apos; in utils/filters.js&apos;))
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// utils/filters</span>
 
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> Api <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;api&apos;</span>
 
<span class="hljs-comment">/**
* &#x83B7;&#x53D6;&#x5E76;&#x6CE8;&#x518C;&#x8FC7;&#x6EE4;&#x5668;
* &#x6CE8;&#x518C;&#x5728;$root.$options.filters&#x4E0A;&#x4E0D;&#x662F;$root.$options.filters.__proto__&#x4E0A;
* &#x6CE8;&#x610F;&#x8FD9;&#x91CC;&#x7684;this&#x662F;vue&#x5B9E;&#x4F8B;&#xFF0C;&#x9700;&#x8981;&#x7528;call&#x6216;apply&#x8C03;&#x7528;
* @returns {Promise}
*/</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">registerFilters</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> Api.sysParams()            <span class="hljs-comment">// &#x83B7;&#x53D6;&#x6570;&#x636E;&#x5B57;&#x5178;&#x7684;Api&#xFF0C;&#x8FD4;&#x56DE;&#x7684;&#x662F;promise</span>
    .then(<span class="hljs-function">(<span class="hljs-params">{ data }</span>) =&gt;</span> {
      <span class="hljs-built_in">Object</span>.keys(data).forEach(<span class="hljs-function"><span class="hljs-params">T</span> =&gt;</span>
        <span class="hljs-keyword">this</span>.$set(<span class="hljs-keyword">this</span>.$root.$options.filters, T, val =&gt; {
          <span class="hljs-keyword">const</span> tar = data[T].find(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> item[<span class="hljs-string">&apos;paramValue&apos;</span>] === val)
          <span class="hljs-keyword">return</span> tar[<span class="hljs-string">&apos;paramDesc&apos;</span>] || <span class="hljs-string">&apos;&apos;</span>
        })
      )
      <span class="hljs-keyword">return</span> data
    })
    .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> <span class="hljs-built_in">console</span>.error(err, <span class="hljs-string">&apos; in utils/filters.js&apos;</span>))
}</code></pre><p>&#x8FD9;&#x6837;&#x628A;&#x6839;&#x7EC4;&#x4EF6;&#x4E0A;&#x7684;filters&#x53D8;&#x4E3A;&#x54CD;&#x5E94;&#x5F0F;&#x5316;&#x7684;&#xFF0C;&#x5E76;&#x4E14;&#x5728;&#x6E32;&#x67D3;&#x7684;&#x65F6;&#x5019;&#x56E0;&#x4E3A;&#x5728;<code>rootFilters</code>&#x65B9;&#x6CD5;&#x4E2D;&#x8BBF;&#x95EE;&#x4E86;&#x5DF2;&#x7ECF;&#x5728;created&#x4E2D;&#x88AB;&#x54CD;&#x5E94;&#x5F0F;&#x5316;&#x7684;<code>$root.$options.filters</code>&#xFF0C;&#x6240;&#x4EE5;&#x5F53;&#x5F02;&#x6B65;&#x83B7;&#x53D6;&#x7684;&#x6570;&#x636E;&#x88AB;&#x8D4B;&#x7ED9;<code>$root.$options.filters</code>&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4F1A;&#x89E6;&#x53D1;&#x8FD9;&#x4E2A;&#x7EC4;&#x4EF6;render watcher&#x7684;&#x91CD;&#x65B0;&#x6E32;&#x67D3;&#xFF0C;&#x8FD9;&#x65F6;&#x5019;&#x518D;&#x83B7;&#x53D6;<code>rootFilters</code>&#x65B9;&#x6CD5;&#x7684;&#x65F6;&#x5019;&#x5C31;&#x80FD;&#x53D6;&#x5230;filter&#x4E86;&#xFF1B;</p><p>&#x90A3;&#x8FD9;&#x91CC;&#x4E3A;&#x4EC0;&#x4E48;&#x4E0D;&#x7528;Vue.filter&#x65B9;&#x6CD5;&#x76F4;&#x63A5;&#x6CE8;&#x518C;&#x5462;&#xFF0C;&#x56E0;&#x4E3A;<code>Object.defineProperty</code>&#x4E0D;&#x80FD;&#x76D1;&#x542C;<code>__proto__</code>&#x4E0A;&#x6570;&#x636E;&#x7684;&#x53D8;&#x52A8;&#xFF0C;&#x800C;&#x5168;&#x5C40;Vue.filter&#x662F;&#x5C06;&#x8FC7;&#x6EE4;&#x5668;&#x6CE8;&#x518C;&#x5728;&#x4E86;&#x6839;&#x7EC4;&#x4EF6;<code>$root.$options.asset_types.__proto__</code>&#x4E0A;&#xFF0C;&#x56E0;&#x6B64;&#x5176;&#x53D8;&#x52A8;&#x4E0D;&#x80FD;&#x88AB;&#x54CD;&#x5E94;&#x3002;</p><p>&#x8FD9;&#x91CC;&#x7684;&#x4EE3;&#x7801;&#x53EF;&#x4EE5;&#x8FDB;&#x4E00;&#x6B65;&#x5B8C;&#x5584;&#xFF0C;&#x4F46;&#x662F;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#x5B58;&#x5728;&#x4E00;&#x5B9A;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x9996;&#x5148;&#x8FD9;&#x91CC;&#x4F7F;&#x7528;&#x4E86;<code>Vue.util</code>&#x4E0A;&#x4E0D;&#x7A33;&#x5B9A;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x53E6;&#x5916;&#x5728;&#x4F7F;&#x7528;&#x4E2D;&#x5230;&#x5904;&#x53EF;&#x89C1;<code>this.$root.$options</code>&#x8FD9;&#x6837;&#x8BBF;&#x95EE;vue&#x5B9E;&#x4F8B;&#x5185;&#x90E8;&#x5C5E;&#x6027;&#x7684;&#x60C5;&#x51B5;&#xFF0C;&#x4E0D;&#x592A;&#x6587;&#x660E;&#xFF0C;&#x8BFB;&#x8D77;&#x6765;&#x4E5F;&#x8BA9;&#x4EBA;&#x56F0;&#x60D1;&#x3002;</p><p>&#x56E0;&#x6B64;&#x5728;&#x8FD9;&#x4E2A;&#x9879;&#x76EE;&#x505A;&#x5B8C;&#x7B49;&#x5F85;&#x6D4B;&#x8BD5;&#x7684;&#x65F6;&#x5019;&#x6211;&#x601D;&#x8003;&#x4E86;&#x4E00;&#x4E0B;&#xFF0C;&#x8C01;&#x8BF4;&#x8FC7;&#x6EE4;&#x5668;&#x5C31;&#x4E00;&#x5B9A;&#x653E;&#x5728;filters&#x91CC;&#x9762; -&#x3002;-&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;mixin&#x6765;&#x5B9E;&#x73B0;&#x561B;</p><h3 id="articleHeader3">2.2 &#x4F7F;&#x7528;mixin</h3><p>&#x4F7F;&#x7528;mixin&#x8981;&#x6CE8;&#x610F;&#x4E00;&#x70B9;&#xFF0C;&#x56E0;&#x4E3A;vue&#x4E2D;&#x628A;data&#x91CC;&#x6240;&#x6709;&#x4EE5;<code>_</code>&#x3001;<code>$</code>&#x5F00;&#x5934;&#x7684;&#x53D8;&#x91CF;&#x90FD;&#x4F5C;&#x4E3A;&#x5185;&#x90E8;&#x4FDD;&#x7559;&#x7684;&#x53D8;&#x91CF;&#xFF0C;<a href="https://github.com/vuejs/vue/blob/3b43c81216c2e29bd519c447e930d6512b5782e8/src/core/instance/state.js#L146" rel="nofollow noreferrer" target="_blank">&#x5E76;&#x4E0D;&#x4EE3;&#x7406;&#x5230;&#x5F53;&#x524D;&#x5B9E;&#x4F8B;&#x4E0A;</a>&#xFF0C;&#x56E0;&#x6B64;&#x76F4;&#x63A5;<code>this._xx</code>&#x662F;&#x65E0;&#x6CD5;&#x8BBF;&#x95EE;&#x7684;&#xFF0C;&#x9700;&#x8981;&#x901A;&#x8FC7;<code>this.$data._xx</code>&#x6765;&#x8BBF;&#x95EE;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// mixins/sysParamsMixin.js

import * as Api from &apos;api&apos;

export default {
  data() {
    return {
      _filterFunc: null,       // &#x8FC7;&#x6EE4;&#x5668;&#x51FD;&#x6570;
      _sysParams: null,        // &#x83B7;&#x53D6;&#x6570;&#x636E;&#x5B57;&#x5178;
      _sysParamsPromise: null  // &#x83B7;&#x53D6;sysParams&#x4E4B;&#x540E;&#x8FD4;&#x56DE;&#x7684;Promise
    }
  },
  methods: {
    /* &#x6CE8;&#x518C;&#x8FC7;&#x6EE4;&#x5668;&#x5230;_filterFunc&#x4E2D; */
    _getSysParamsFunc() {
      const { $data } = this
      return $data._sysParamsPromise || ($data._sysParamsPromise = Api.sysParams()
        .then(({ data }) =&gt; {
          this.$data._sysParams = data
          this.$data._filterFunc = {}
          Object.keys(data).forEach(paramKey =&gt;
            this.$data._filterFunc[paramKey] = val =&gt; {
              const tar = data[paramKey].find(item =&gt; item[&apos;paramValue&apos;] === val)
              return tar &amp;&amp; tar[&apos;paramDesc&apos;] || &apos;&apos;
            })
          return data
        })
        .catch(err =&gt; console.error(err, &apos; in src/mixins/sysParamsMixin.js&apos;)))
    },

    /* &#x6309;&#x7167;&#x952E;&#x503C;&#x83B7;&#x53D6;&#x5355;&#x4E2A;&#x8FC7;&#x6EE4;&#x5668; */
    _rootFilters(val, id = &apos;SEX_TYPE&apos;) {
      const func = this.$data._filterFunc
      const mth = func &amp;&amp; func[id]
      return mth &amp;&amp; mth(val) || val
    },

    /* &#x83B7;&#x53D6;&#x6570;&#x636E;&#x5B57;&#x5178; */
    _getSysParams() {
      return this.$data._sysParams
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// mixins/sysParamsMixin.js</span>

<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> Api <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;api&apos;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">_filterFunc</span>: <span class="hljs-literal">null</span>,       <span class="hljs-comment">// &#x8FC7;&#x6EE4;&#x5668;&#x51FD;&#x6570;</span>
      _sysParams: <span class="hljs-literal">null</span>,        <span class="hljs-comment">// &#x83B7;&#x53D6;&#x6570;&#x636E;&#x5B57;&#x5178;</span>
      _sysParamsPromise: <span class="hljs-literal">null</span>  <span class="hljs-comment">// &#x83B7;&#x53D6;sysParams&#x4E4B;&#x540E;&#x8FD4;&#x56DE;&#x7684;Promise</span>
    }
  },
  <span class="hljs-attr">methods</span>: {
    <span class="hljs-comment">/* &#x6CE8;&#x518C;&#x8FC7;&#x6EE4;&#x5668;&#x5230;_filterFunc&#x4E2D; */</span>
    _getSysParamsFunc() {
      <span class="hljs-keyword">const</span> { $data } = <span class="hljs-keyword">this</span>
      <span class="hljs-keyword">return</span> $data._sysParamsPromise || ($data._sysParamsPromise = Api.sysParams()
        .then(<span class="hljs-function">(<span class="hljs-params">{ data }</span>) =&gt;</span> {
          <span class="hljs-keyword">this</span>.$data._sysParams = data
          <span class="hljs-keyword">this</span>.$data._filterFunc = {}
          <span class="hljs-built_in">Object</span>.keys(data).forEach(<span class="hljs-function"><span class="hljs-params">paramKey</span> =&gt;</span>
            <span class="hljs-keyword">this</span>.$data._filterFunc[paramKey] = <span class="hljs-function"><span class="hljs-params">val</span> =&gt;</span> {
              <span class="hljs-keyword">const</span> tar = data[paramKey].find(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> item[<span class="hljs-string">&apos;paramValue&apos;</span>] === val)
              <span class="hljs-keyword">return</span> tar &amp;&amp; tar[<span class="hljs-string">&apos;paramDesc&apos;</span>] || <span class="hljs-string">&apos;&apos;</span>
            })
          <span class="hljs-keyword">return</span> data
        })
        .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> <span class="hljs-built_in">console</span>.error(err, <span class="hljs-string">&apos; in src/mixins/sysParamsMixin.js&apos;</span>)))
    },

    <span class="hljs-comment">/* &#x6309;&#x7167;&#x952E;&#x503C;&#x83B7;&#x53D6;&#x5355;&#x4E2A;&#x8FC7;&#x6EE4;&#x5668; */</span>
    _rootFilters(val, id = <span class="hljs-string">&apos;SEX_TYPE&apos;</span>) {
      <span class="hljs-keyword">const</span> func = <span class="hljs-keyword">this</span>.$data._filterFunc
      <span class="hljs-keyword">const</span> mth = func &amp;&amp; func[id]
      <span class="hljs-keyword">return</span> mth &amp;&amp; mth(val) || val
    },

    <span class="hljs-comment">/* &#x83B7;&#x53D6;&#x6570;&#x636E;&#x5B57;&#x5178; */</span>
    _getSysParams() {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$data._sysParams
    }
  }
}</code></pre><p>&#x8FD9;&#x91CC;&#x628A;<code>Api</code>&#x7684;promise&#x4FDD;&#x5B58;&#x4E0B;&#x6765;&#xFF0C;&#x5982;&#x679C;&#x5176;&#x4ED6;&#x5730;&#x65B9;&#x8FD8;&#x7528;&#x5230;&#x7684;&#x8BDD;&#x76F4;&#x63A5;&#x8FD4;&#x56DE;&#x5DF2;&#x7ECF;&#x662F;<code>resolved</code>&#x72B6;&#x6001;&#x7684;promise&#xFF0C;&#x5C31;&#x4E0D;&#x7528;&#x518D;&#x6B21;&#x53BB;&#x8BF7;&#x6C42;&#x6570;&#x636E;&#x4E86;&#x3002;&#x53E6;&#x5916;&#x4E3A;&#x4E86;&#x5728;&#x5176;&#x4ED6;&#x5B9E;&#x4F8B;&#x4E2D;&#x4E5F;&#x53EF;&#x4EE5;&#x65B9;&#x4FBF;&#x7684;&#x8BBF;&#x95EE;&#xFF0C;&#x8FD9;&#x91CC;&#x6302;&#x8F7D;&#x5728;&#x6839;&#x7EC4;&#x4EF6;&#x4E0A;&#x3002;</p><p>&#x90A3;&#x5728;&#x6211;&#x4EEC;&#x7684;<strong>&#x6839;&#x7EC4;&#x4EF6;</strong>&#x4E2D;&#x600E;&#x4E48;&#x4F7F;&#x7528;&#x5462;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/main.js

import sysParamsMixin from &apos;mixins/sysParamsMixin&apos;

new Vue({
  el: &apos;#app&apos;,
  mixins: [sysParamsMixin],
  render: h =&gt; h(App),
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/main.js</span>

<span class="hljs-keyword">import</span> sysParamsMixin <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;mixins/sysParamsMixin&apos;</span>

<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
  <span class="hljs-attr">mixins</span>: [sysParamsMixin],
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-params">h</span> =&gt;</span> h(App),
})</code></pre><p>&#x5728;&#x9700;&#x8981;&#x7528;&#x8FC7;&#x6EE4;&#x5668;&#x7684;&#x7EC4;&#x4EF6;&#x4E2D;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;div&gt;
    {{ $root._rootFilters( sexVal )}}
  &lt;/div&gt;
&lt;/template&gt;
 
&lt;script type=&apos;text/javascript&apos;&gt;
  export default {
    data() {
      return { sexVal: 1 }
    },
    mounted() {
      this.$root._getSysParamsFunc()
        .then(data =&gt;
          // &#x8FD9;&#x91CC;&#x83B7;&#x53D6;&#x5230;&#x6570;&#x636E;&#x5B57;&#x5178;&#x7684;data
        )
    }
  }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code class="vue"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    </span><span class="hljs-template-variable">"{{" $root._rootFilters( sexVal )"}}"</span><span class="xml">
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
 
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&apos;text/javascript&apos;</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data() {
      <span class="hljs-keyword">return</span> { <span class="hljs-attr">sexVal</span>: <span class="hljs-number">1</span> }
    },
    mounted() {
      <span class="hljs-keyword">this</span>.$root._getSysParamsFunc()
        .then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span>
          <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x83B7;&#x53D6;&#x5230;&#x6570;&#x636E;&#x5B57;&#x5178;&#x7684;data</span>
        )
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p>&#x8FD9;&#x91CC;&#x4E0D;&#x4EC5;&#x6CE8;&#x518C;&#x4E86;&#x8FC7;&#x6EE4;&#x5668;&#xFF0C;&#x800C;&#x4E14;&#x4E5F;&#x66B4;&#x9732;&#x4E86;&#x6570;&#x636E;&#x5B57;&#x5178;&#xFF0C;&#x4EE5;&#x65B9;&#x4FBF;&#x67D0;&#x4E9B;&#x5730;&#x65B9;&#x7684;&#x5217;&#x8868;&#x663E;&#x793A;&#xFF0C;&#x6BD5;&#x7ADF;&#x8FD9;&#x662F;&#x5B9E;&#x9645;&#x9879;&#x76EE;&#x4E2D;&#x5E38;&#x89C1;&#x7684;&#x573A;&#x666F;&#x3002;</p><p>&#x5F53;&#x7136;&#x5982;&#x679C;&#x4F7F;&#x7528;vuex&#x66F4;&#x597D;&#xFF0C;&#x4E0D;&#x8FC7;&#x8FD9;&#x91CC;&#x7684;&#x573A;&#x666F;&#x4E2A;&#x4EBA;&#x89C9;&#x5F97;&#x6CA1;&#x5FC5;&#x8981;&#x7528;vuex&#xFF0C;&#x5982;&#x679C;&#x8FD8;&#x6709;&#x66F4;&#x597D;&#x7684;&#x65B9;&#x6CD5;&#x53EF;&#x4EE5;&#x8BA8;&#x8BBA;&#x4E00;&#x4E0B;&#x4E0B;&#x554A;~</p><hr><p>&#x7F51;&#x4E0A;&#x7684;&#x5E16;&#x5B50;&#x5927;&#x591A;&#x6DF1;&#x6D45;&#x4E0D;&#x4E00;&#xFF0C;&#x751A;&#x81F3;&#x6709;&#x4E9B;&#x524D;&#x540E;&#x77DB;&#x76FE;&#xFF0C;&#x5728;&#x4E0B;&#x7684;&#x6587;&#x7AE0;&#x90FD;&#x662F;&#x5B66;&#x4E60;&#x8FC7;&#x7A0B;&#x4E2D;&#x7684;&#x603B;&#x7ED3;&#xFF0C;&#x5982;&#x679C;&#x53D1;&#x73B0;&#x9519;&#x8BEF;&#xFF0C;&#x6B22;&#x8FCE;&#x7559;&#x8A00;&#x6307;&#x51FA;~</p><blockquote><p>&#x53C2;&#x8003;&#xFF1A;</p><ol><li><a href="https://github.com/vuejs/vue" rel="nofollow noreferrer" target="_blank">Vue.js 2.5.17 &#x6E90;&#x7801;</a></li><li><a href="https://juejin.im/post/5b38830de51d455888216675" rel="nofollow noreferrer" target="_blank">Vue&#x6E90;&#x7801;&#x9605;&#x8BFB;&#x7CFB;&#x5217;</a></li><li><a href="https://codepen.io/SHERlocked93/pen/GXmXrM" rel="nofollow noreferrer" target="_blank">Vue 2.5.17 filter test</a><button class="btn btn-xs btn-default ml10 preview" data-url="SHERlocked93/pen/GXmXrM" data-typeid="3">&#x70B9;&#x51FB;&#x9884;&#x89C8;</button></li></ol></blockquote>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue项目数据动态过滤实践

## 原文链接
[https://segmentfault.com/a/1190000016320939](https://segmentfault.com/a/1190000016320939)

