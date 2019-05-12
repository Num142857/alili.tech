---
title: 'Vue动态异步组件实现思路及其问题' 
date: 2018-11-29 9:33:05
hidden: true
slug: y5spks0fcg
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>&#x524D;&#x8A00;&#xFF1A;&#x5728;vue<a href="https://cn.vuejs.org/v2/guide/components-dynamic-async.html#ad" rel="nofollow noreferrer" target="_blank">&#x5B98;&#x65B9;&#x8D44;&#x6599;</a>&#x4E2D;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x53EF;&#x4EE5;&#x5F88;&#x5B66;&#x4F1A;&#x5982;&#x4F55;&#x901A;&#x8FC7;vue&#x6784;&#x5EFA;&#x201C;&#x52A8;&#x6001;&#x7EC4;&#x4EF6;&#x201D;&#x4EE5;&#x53CA;&#x201C;&#x5F02;&#x6B65;&#x7EC4;&#x4EF6;&#x201D;&#xFF0C;&#x7136;&#x800C;&#xFF0C;&#x5728;&#x5B98;&#x65B9;&#x8D44;&#x6599;&#x4E2D;&#xFF0C;&#x5E76;&#x6CA1;&#x6709;&#x6D89;&#x53CA;&#x5230;&#x771F;&#x6B63;&#x7684;&#x201C;&#x52A8;&#x6001;&#x5F02;&#x6B65;&#x201D;&#x7EC4;&#x4EF6;&#xFF0C;&#x7ECF;&#x8FC7;&#x5927;&#x91CF;&#x7684;&#x65F6;&#x95F4;&#x7814;&#x7A76;&#x548C;&#x6280;&#x672F;&#x5206;&#x6790;&#xFF0C;&#x6211;&#x4EEC;&#x7ED9;&#x51FA;&#x76EE;&#x524D;&#x6BD4;&#x8F83;&#x5408;&#x7406;&#x7684;&#x6280;&#x672F;&#x5B9E;&#x73B0;&#x65B9;&#x5F0F;&#xFF0C;&#x5E76;&#x5206;&#x6790;&#x4E00;&#x4E0B;vue&#x52A8;&#x6001;&#x5F02;&#x6B65;&#x7EC4;&#x4EF6;&#x7684;&#x5B9E;&#x73B0;&#x601D;&#x8DEF;&#x3002;</blockquote>
<h2 id="articleHeader0">&#x52A8;&#x6001;/&#x5F02;&#x6B65;&#x7EC4;&#x4EF6;&#x7684;&#x95EE;&#x9898;</h2>
<p>&#x5B98;&#x7F51;&#x4E2D;&#x4ECB;&#x7ECD;&#xFF0C;&#x52A8;&#x6001;&#x7EC4;&#x4EF6;&#x662F;&#x901A;&#x8FC7;tag<code>component</code>&#x6765;&#x6784;&#x5EFA;&#xFF0C;&#x5728;&#x5F53;&#x4E2D;&#x7ED1;&#x5B9A;&#x7EC4;&#x4EF6;&#x7684;&#x5F15;&#x7528;&#x5373;&#x53EF;&#xFF0C;&#x5927;&#x81F4;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
    &lt;component :is=&quot;currentComp&quot;&gt;&lt;/component&gt;
&lt;/template&gt;
&lt;script&gt;
  import compA from &apos;./CompA&apos;;
  import compB from &apos;./CompB&apos;;
  import compC from &apos;./CompC&apos;;
  export default {
    data () {
      return {
        currentComp: compA
      }
    },
    methods: {
      changeComp (name) {
        switch (name) {
          case &apos;compA&apos; : {
            this.currentComp = compA; 
            break;
          case &apos;compB&apos; : 
            this.currentComp = compB; 
            break;
          case &apos;compC&apos; : 
            this.currentComp = compC; 
            break;
          default :
            this.currentComp = compA;
            break;
        }
      }
    }
  }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code class="vue"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">:is</span>=<span class="hljs-string">&quot;currentComp&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">import</span> compA <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./CompA&apos;</span>;
  <span class="hljs-keyword">import</span> compB <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./CompB&apos;</span>;
  <span class="hljs-keyword">import</span> compC <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./CompC&apos;</span>;
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data () {
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">currentComp</span>: compA
      }
    },
    <span class="hljs-attr">methods</span>: {
      changeComp (name) {
        <span class="hljs-keyword">switch</span> (name) {
          <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;compA&apos;</span> : {
            <span class="hljs-keyword">this</span>.currentComp = compA; 
            <span class="hljs-keyword">break</span>;
          <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;compB&apos;</span> : 
            <span class="hljs-keyword">this</span>.currentComp = compB; 
            <span class="hljs-keyword">break</span>;
          <span class="hljs-keyword">case</span> <span class="hljs-string">&apos;compC&apos;</span> : 
            <span class="hljs-keyword">this</span>.currentComp = compC; 
            <span class="hljs-keyword">break</span>;
          <span class="hljs-keyword">default</span> :
            <span class="hljs-keyword">this</span>.currentComp = compA;
            <span class="hljs-keyword">break</span>;
        }
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>&#x7B80;&#x5355;&#x8BF4;&#x660E;&#x4E00;&#x4E0B;&#xFF0C;&#x901A;&#x8FC7;&#x5BF9;&#x5B57;&#x7B26;&#x4E32;&#x7684;&#x5224;&#x65AD;&#xFF0C;&#x6765;&#x5207;&#x6362;&#x7EC4;&#x4EF6;&#x7684;&#x5B9E;&#x4F8B;&#xFF0C;&#x5B9E;&#x4F8B;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x540E;&#xFF0C;<code>component</code>&#x7EC4;&#x4EF6;&#x4F1A;&#x81EA;&#x52A8;&#x5207;&#x6362;&#x3002;&#x8FD9;&#x5C31;&#x662F;vue&#x4E2D;&#x6700;&#x57FA;&#x672C;&#x7684;&#x52A8;&#x6001;&#x7EC4;&#x4EF6;&#x3002;&#x4F46;&#x662F;&#xFF0C;&#x8FD9;&#x6837;&#x7684;&#x4EE3;&#x7801;&#x6709;&#x4E2A;&#x5F88;&#x663E;&#x8457;&#x7684;&#x95EE;&#x9898;&#xFF1A;</p>
<ol>
<li>&#x6240;&#x6709;&#x7684;&#x7EC4;&#x4EF6;&#x90FD;&#x662F;&#x5199;&#x6B7B;&#x7684;&#xFF0C;&#x6BD4;&#x5982;&#x5728;&#x4EE3;&#x7801;&#x5C42;&#x9762;&#x4E0A;&#x63D0;&#x524D;&#x5B9A;&#x4E49;&#xFF0C;&#x5373;&#x4EE3;&#x7801;5-7&#x884C;&#xFF1B;</li>
<li>&#x7EC4;&#x4EF6;&#x7684;&#x5F15;&#x5165;&#x662F;&#x540C;&#x6B65;&#x7684;&#xFF0C;&#x5373;&#x4FBF;compB&#x548C;compC&#x5728;&#x4E00;&#x5F00;&#x59CB;&#x6CA1;&#x6E32;&#x67D3;&#xFF0C;&#x4F46;&#x7EC4;&#x4EF6;&#x7684;&#x5185;&#x5B58;&#x5DF2;&#x7ECF;&#x88AB;&#x52A0;&#x8F7D;&#xFF1B;</li>
</ol>
<p>&#x5BF9;&#x4E8E;&#x7B2C;&#x4E8C;&#x70B9;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5F88;&#x5BB9;&#x6613;&#x7684;&#x4F7F;&#x7528;require&#x6216;&#x8005;import&#x8BED;&#x6CD5;&#x6765;&#x8FDB;&#x884C;&#x5F02;&#x6B65;&#x52A0;&#x8F7D;&#x3002;&#x7136;&#x800C;&#x8FD9;&#x5E76;&#x6CA1;&#x6709;&#x89E3;&#x51B3;&#x95EE;&#x9898;1&#x6240;&#x5E26;&#x6765;&#x7684;&#x9690;&#x60A3;&#x3002;&#x6309;&#x7167;&#x5B9E;&#x9645;&#x7684;&#x8981;&#x6C42;&#xFF0C;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x4E00;&#x4E2A;&#x53EF;&#x4EE5;&#x5728;&#x5BA2;&#x6237;&#x7AEF;&#x968F;&#x610F;&#x914D;&#x7F6E;&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&#x5373;&#x901A;&#x8FC7;&#x7EC4;&#x4EF6;&#x7684;&#x5730;&#x5740;&#x6216;&#x914D;&#x7F6E;&#x5728;&#x8FDB;&#x884C;&#x52A8;&#x6001;&#x52A0;&#x8F7D;&#x7684;&#x65B9;&#x5F0F;&#x3002;&#x8FD9;&#x5C31;&#x662F;&#x4E3A;&#x4EC0;&#x4E48;&#x8981;&#x8FDB;&#x884C;&#x52A8;&#x6001;&#x5F02;&#x6B65;&#x7EC4;&#x4EF6;&#x7684;&#x6784;&#x5EFA;&#x3002;</p>
<p>&#x8FD9;&#x79CD;&#x6784;&#x5EFA;&#x65B9;&#x5F0F;&#x662F;&#x521A;&#x9700;&#x7684;&#xFF0C;&#x4E00;&#x65B9;&#x9762;&#x4ED6;&#x53EF;&#x4EE5;&#x6784;&#x7B51;&#x7C7B;&#x4F3C;<code>portal</code>&#x4E2D;&#x7684;<code>porlet</code>&#x7EC4;&#x4EF6;&#xFF0C;&#x53E6;&#x4E00;&#x65B9;&#x9762;&#xFF0C;&#x4ED6;&#x7684;&#x5B9E;&#x73B0;&#x65B9;&#x5F0F;&#x5C06;&#x7ED9;&#x7EC4;&#x4EF6;&#x52A0;&#x8F7D;&#x5E26;&#x6765;&#x5DE8;&#x5927;&#x7684;&#x63D0;&#x5347;&#x3002;</p>
<h2 id="articleHeader1">&#x6784;&#x5EFA;AsyncComponent</h2>
<p>&#x9996;&#x5148;&#xFF0C;&#x6211;&#x4EEC;&#x770B;&#x4E00;&#x4E0B;&#x9884;&#x671F;&#x7684;&#x7ED3;&#x679C;&#xFF0C;&#x6211;&#x4EEC;&#x5E0C;&#x671B;&#x6784;&#x5EFA;&#x5982;&#x4E0B;&#x7684;&#x4EE3;&#x7801;&#x6A21;&#x5F0F;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
    &lt;async-component path=&quot;/views/moduleA/compA&quot;&gt;&lt;/async-component&gt;
&lt;/template&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code class="vue"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">async-component</span> <span class="hljs-attr">path</span>=<span class="hljs-string">&quot;/views/moduleA/compA&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">async-component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre>
<p>&#x56E0;&#x6B64;&#xFF0C;&#x6211;&#x4EEC;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;<code>AsyncComponent.vue</code>&#x6587;&#x4EF6;&#xFF0C;&#x5E76;&#x4E66;&#x5199;&#x4EE3;&#x7801;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
    &lt;component v-bind:is=&quot;componentFile&quot;&gt;&lt;/component&gt;
&lt;/template&gt;

&lt;script&gt;
  export default {
    props: {
      path: {
        type: String,
        required: true,
        default: () =&gt; null
      }
    },
    data () {
      const componentFile = this.render;
      return {
        componentFile: componentFile
      }
    },
    methods: {
      render () {
        this.componentFile =  (resolve) =&gt; ({
          component: import(`@/${this.path}`),
          loading: { template: &apos;&lt;div style=&quot;height: 100%; width: 100%; display: table;&quot;&gt;&lt;div style=&quot;display: table-cell; vertical-align: middle; text-align: center;&quot;&gt;&lt;div&gt;&#x52A0;&#x8F7D;&#x4E2D;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&apos; },
          error:  { template: &apos;&lt;div style=&quot;height: 100%; width: 100%; display: table;&quot;&gt;&lt;div style=&quot;display: table-cell; vertical-align: middle; text-align: center;&quot;&gt;&lt;div&gt;&#x52A0;&#x8F7D;&#x9519;&#x8BEF;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&apos; },
          delay: 200,
          timeout: 10000
        });
      }
    },
    watch: {
      file () {
        this.render();
      }
    }
  }
&lt;/script&gt;

" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs xml"><code class="vue"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">v-bind:is</span>=<span class="hljs-string">&quot;componentFile&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">props</span>: {
      <span class="hljs-attr">path</span>: {
        <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>,
        <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">default</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-literal">null</span>
      }
    },
    data () {
      <span class="hljs-keyword">const</span> componentFile = <span class="hljs-keyword">this</span>.render;
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">componentFile</span>: componentFile
      }
    },
    <span class="hljs-attr">methods</span>: {
      render () {
        <span class="hljs-keyword">this</span>.componentFile =  <span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> ({
          <span class="hljs-attr">component</span>: <span class="hljs-keyword">import</span>(<span class="hljs-string">`@/<span class="hljs-subst">${<span class="hljs-keyword">this</span>.path}</span>`</span>),
          <span class="hljs-attr">loading</span>: { <span class="hljs-attr">template</span>: <span class="hljs-string">&apos;&lt;div style=&quot;height: 100%; width: 100%; display: table;&quot;&gt;&lt;div style=&quot;display: table-cell; vertical-align: middle; text-align: center;&quot;&gt;&lt;div&gt;&#x52A0;&#x8F7D;&#x4E2D;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&apos;</span> },
          <span class="hljs-attr">error</span>:  { <span class="hljs-attr">template</span>: <span class="hljs-string">&apos;&lt;div style=&quot;height: 100%; width: 100%; display: table;&quot;&gt;&lt;div style=&quot;display: table-cell; vertical-align: middle; text-align: center;&quot;&gt;&lt;div&gt;&#x52A0;&#x8F7D;&#x9519;&#x8BEF;&lt;/div&gt;&lt;/div&gt;&lt;/div&gt;&apos;</span> },
          <span class="hljs-attr">delay</span>: <span class="hljs-number">200</span>,
          <span class="hljs-attr">timeout</span>: <span class="hljs-number">10000</span>
        });
      }
    },
    <span class="hljs-attr">watch</span>: {
      file () {
        <span class="hljs-keyword">this</span>.render();
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

</code></pre>
<p>&#x8FD9;&#x4E2A;&#x4EE3;&#x7801;&#x5F88;&#x597D;&#x89E3;&#x91CA;&#xFF1A;</p>
<ol>
<li>&#x7EC4;&#x4EF6;&#x4E2D;&#x4F20;&#x5165;<code>path</code>&#x5C5E;&#x6027;&#xFF0C;&#x6784;&#x5EFA;&#x65F6;&#x5019;&#x901A;&#x8FC7;<code>render</code>&#x51FD;&#x6570;&#x521B;&#x5EFA;&#x5F02;&#x6B65;&#x7EC4;&#x4EF6;&#xFF1B;</li>
<li>
<code>render</code>&#x51FD;&#x6570;&#x4E3A;&#x5B98;&#x7F51;&#x7684;&#x5F02;&#x6B65;&#x7EC4;&#x4EF6;&#x6784;&#x5EFA;&#x65B9;&#x5F0F;&#xFF1B;</li>
<li>&#x76D1;&#x63A7;<code>path</code>&#x5C5E;&#x6027;&#xFF0C;&#x5F53;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x65F6;&#xFF0C;&#x91CD;&#x65B0;&#x901A;&#x8FC7;render&#x51FD;&#x6570;&#x6784;&#x5EFA;&#xFF1B;</li>
</ol>
<p>&#x4E3A;&#x4E86;&#x80FD;&#x591F;&#x8BA9;&#x7EC4;&#x4EF6;&#x53EF;&#x88AB;&#x91CD;&#x65B0;&#x6FC0;&#x6D3B;&#xFF0C;&#x5E76;&#x4E14;&#x91CD;&#x7528;&#x6027;&#x66F4;&#x9AD8;&#xFF0C;&#x6211;&#x4EEC;&#x5BF9;&#x7EC4;&#x4EF6;&#x8FDB;&#x884C;&#x66F4;&#x591A;&#x7684;&#x53C2;&#x6570;&#x5316;&#xFF0C;&#x6700;&#x7EC8;&#x7ED3;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;keep-alive v-if=&quot;keepAlive&quot;&gt;
    &lt;component
      :is=&quot;AsyncComponent&quot;
      v-bind=&quot;$attrs&quot;
      v-on=&quot;$listeners&quot;/&gt;
  &lt;/keep-alive&gt;
  &lt;component
    v-else
    :is=&quot;AsyncComponent&quot;
    v-bind=&quot;$attrs&quot;
    v-on=&quot;$listeners&quot;/&gt;
&lt;/template&gt;

&lt;script&gt;
import factory from &apos;./factory.js&apos;;

/**
 * &#x52A8;&#x6001;&#x6587;&#x4EF6;&#x52A0;&#x8F7D;&#x5668;
 */
export default {
  inheritAttrs: false,
  // &#x5916;&#x90E8;&#x4F20;&#x5165;&#x5C5E;&#x6027;
  props: {
    // &#x6587;&#x4EF6;&#x7684;&#x8DEF;&#x5F84;
    path: {
      type: String,
      default: null
    },
    // &#x662F;&#x5426;&#x4FDD;&#x6301;&#x7F13;&#x5B58;
    keepAlive: {
      type: Boolean,
      required: false,
      default: true
    },
    // &#x5EF6;&#x8FDF;&#x52A0;&#x8F7D;&#x65F6;&#x95F4;
    delay: {
      type: Number,
      default: 20
    },
    // &#x8D85;&#x65F6;&#x8B66;&#x544A;&#x65F6;&#x95F4;
    timeout: {
      type: Number,
      default: 2000
    }
  },
  data () {
    return {
      // &#x6784;&#x5EFA;&#x5F02;&#x6B65;&#x7EC4;&#x4EF6; - &#x61D2;&#x52A0;&#x8F7D;&#x5B9E;&#x73B0;
      AsyncComponent: factory(this.path, this.delay, this.timeout)
    }
  },
  watch: {
    path () {
      this.AsyncComponent = factory(this.path, this.delay, this.timeout);
    }
  },
  methods: {
    load (path = this.path) {
      this.AsyncComponent = factory(path, this.delay, this.timeout);
    }
  }
}
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs kotlin"><code class="vue">&lt;template&gt;
  &lt;keep-alive v-<span class="hljs-keyword">if</span>=<span class="hljs-string">&quot;keepAlive&quot;</span>&gt;
    &lt;component
      :<span class="hljs-keyword">is</span>=<span class="hljs-string">&quot;AsyncComponent&quot;</span>
      v-bind=<span class="hljs-string">&quot;<span class="hljs-subst">$attrs</span>&quot;</span>
      v-on=<span class="hljs-string">&quot;<span class="hljs-subst">$listeners</span>&quot;</span>/&gt;
  &lt;/keep-alive&gt;
  &lt;component
    v-<span class="hljs-keyword">else</span>
    :<span class="hljs-keyword">is</span>=<span class="hljs-string">&quot;AsyncComponent&quot;</span>
    v-bind=<span class="hljs-string">&quot;<span class="hljs-subst">$attrs</span>&quot;</span>
    v-on=<span class="hljs-string">&quot;<span class="hljs-subst">$listeners</span>&quot;</span>/&gt;
&lt;/template&gt;

&lt;script&gt;
<span class="hljs-keyword">import</span> factory from <span class="hljs-string">&apos;./factory.js&apos;</span>;

<span class="hljs-comment">/**
 * &#x52A8;&#x6001;&#x6587;&#x4EF6;&#x52A0;&#x8F7D;&#x5668;
 */</span>
export <span class="hljs-keyword">default</span> {
  inheritAttrs: <span class="hljs-literal">false</span>,
  <span class="hljs-comment">// &#x5916;&#x90E8;&#x4F20;&#x5165;&#x5C5E;&#x6027;</span>
  props: {
    <span class="hljs-comment">// &#x6587;&#x4EF6;&#x7684;&#x8DEF;&#x5F84;</span>
    path: {
      type: String,
      <span class="hljs-keyword">default</span>: <span class="hljs-literal">null</span>
    },
    <span class="hljs-comment">// &#x662F;&#x5426;&#x4FDD;&#x6301;&#x7F13;&#x5B58;</span>
    keepAlive: {
      type: <span class="hljs-built_in">Boolean</span>,
      required: <span class="hljs-literal">false</span>,
      <span class="hljs-keyword">default</span>: <span class="hljs-literal">true</span>
    },
    <span class="hljs-comment">// &#x5EF6;&#x8FDF;&#x52A0;&#x8F7D;&#x65F6;&#x95F4;</span>
    delay: {
      type: Number,
      <span class="hljs-keyword">default</span>: <span class="hljs-number">20</span>
    },
    <span class="hljs-comment">// &#x8D85;&#x65F6;&#x8B66;&#x544A;&#x65F6;&#x95F4;</span>
    timeout: {
      type: Number,
      <span class="hljs-keyword">default</span>: <span class="hljs-number">2000</span>
    }
  },
  <span class="hljs-keyword">data</span> () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-comment">// &#x6784;&#x5EFA;&#x5F02;&#x6B65;&#x7EC4;&#x4EF6; - &#x61D2;&#x52A0;&#x8F7D;&#x5B9E;&#x73B0;</span>
      AsyncComponent: factory(<span class="hljs-keyword">this</span>.path, <span class="hljs-keyword">this</span>.delay, <span class="hljs-keyword">this</span>.timeout)
    }
  },
  watch: {
    path () {
      <span class="hljs-keyword">this</span>.AsyncComponent = factory(<span class="hljs-keyword">this</span>.path, <span class="hljs-keyword">this</span>.delay, <span class="hljs-keyword">this</span>.timeout);
    }
  },
  methods: {
    load (path = <span class="hljs-keyword">this</span>.path) {
      <span class="hljs-keyword">this</span>.AsyncComponent = factory(path, <span class="hljs-keyword">this</span>.delay, <span class="hljs-keyword">this</span>.timeout);
    }
  }
}
&lt;/script&gt;</code></pre>
<p>&#x5177;&#x4F53;&#x6539;&#x52A8;&#x5982;&#x4E0B;&#xFF1A;</p>
<ol>
<li>&#x4EE3;&#x7801;&#x7B2C;2&#x884C;&#x589E;&#x52A0;<code>keep-alive</code>&#x914D;&#x7F6E;&#xFF0C;&#x53EF;&#x8BA9;&#x7EC4;&#x4EF6;&#x6301;&#x4E45;&#x5316;&#xFF1B;</li>
<li>&#x4EE3;&#x7801;&#x7B2C;5&#x884C;&#x589E;&#x52A0;&#x5C5E;&#x6027;&#x7ED1;&#x5B9A;&#xFF0C;&#x53EF;&#x8BA9;&#x5F02;&#x6B65;&#x6E32;&#x67D3;&#x7684;&#x7EC4;&#x4EF6;&#x901A;&#x8FC7;&#x5916;&#x90E8;(<code>async-component</code>tag)&#x4F20;&#x53C2;&#xFF1B;</li>
<li>&#x4EE3;&#x7801;&#x7B2C;6&#x884C;&#x589E;&#x52A0;&#x4E8B;&#x4EF6;&#x7ED1;&#x5B9A;&#xFF0C;&#x53EF;&#x8BA9;&#x5F02;&#x6B65;&#x6E32;&#x67D3;&#x7684;&#x7EC4;&#x4EF6;&#x901A;&#x8FC7;&#x5916;&#x90E8;(<code>async-component</code>tag)&#x8FDB;&#x884C;&#x4E8B;&#x4EF6;&#x76D1;&#x542C;&#xFF1B;</li>
<li>&#x4EE3;&#x7801;16&#x884C;&#x4E3A;&#x5C01;&#x88C5;<strong>&#x5F02;&#x6B65;&#x7EC4;&#x4EF6;&#x6784;&#x9020;&#x5668;factory</strong>&#xFF08;&#x5DE5;&#x5382;&#x6A21;&#x5F0F;&#xFF09;&#xFF0C;&#x53EF;&#x66B4;&#x9732;&#x51FA;&#x53BB;&#x65B9;&#x4FBF;&#x5176;&#x4ED6;&#x5F00;&#x53D1;&#x8005;&#x4F7F;&#x7528;&#xFF1B;</li>
<li>
<code>factory</code>&#x51FD;&#x6570;&#x589E;&#x52A0;<strong>&#x52A0;&#x8F7D;&#x7EC4;&#x4EF6;</strong>&#x3001;<strong>&#x9519;&#x8BEF;&#x7EC4;&#x4EF6;</strong>&#x3001;<strong>&#x672A;&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;</strong>&#x7684;&#x5C01;&#x88C5;&#xFF1B;</li>
<li>&#x589E;&#x52A0;&#x4E86;<code>delay</code>&#x3001;<code>timeout</code>&#x914D;&#x7F6E;&#xFF1B;</li>
<li>&#x66B4;&#x9732;&#x4E86;<code>load</code>&#x51FD;&#x6570;&#xFF0C;&#x65B9;&#x4FBF;&#x5916;&#x90E8;<code>JavaScript</code>&#x8C03;&#x7528;&#xFF1B;</li>
</ol>
<p>&#x81F3;&#x6B64;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;<code>&lt;async-component path=&quot;/views/moduleA/compA.vue&quot;&gt;&lt;/async-component&gt;</code>&#x6765;&#x6784;&#x5EFA;&#x7EC4;&#x4EF6;&#xFF0C;&#x5982;&#x679C;<code>path</code>&#x662F;&#x4E00;&#x4E2A;&#x4F20;&#x5165;&#x5C5E;&#x6027;&#xFF0C;&#x901A;&#x8FC7;&#x6539;&#x53D8;&#x8BE5;&#x5C5E;&#x6027;&#x89E6;&#x53D1;<code>watch</code>&#x6765;&#x91CD;&#x65B0;&#x52A0;&#x8F7D;&#x65B0;&#x7EC4;&#x4EF6;&#x3002;&#x6216;&#x8005;&#x7ED9;&#x8BE5;&#x7EC4;&#x4EF6;&#x6DFB;&#x52A0;<code>ref</code>&#x5C5E;&#x6027;&#x6765;&#x83B7;&#x53D6;&#x5F02;&#x6B65;&#x7EC4;&#x4EF6;&#x5BB9;&#x5668;&#xFF0C;&#x901A;&#x8FC7;&#x8C03;&#x7528;<code>load</code>&#x65B9;&#x6CD5;&#x6765;&#x91CD;&#x65B0;&#x88C5;&#x8F7D;&#x3002;</p>
<h2 id="articleHeader2">&#x540E;&#x7EED;&#x7684;&#x95EE;&#x9898;</h2>
<p>&#x770B;&#x4E0A;&#x53BB;&#xFF0C;&#x73B0;&#x5728;&#x7684;&#x5C01;&#x88C5;&#x5DF2;&#x7ECF;&#x975E;&#x5E38;&#x597D;&#xFF0C;&#x4F46;&#x662F;&#x8DDD;&#x79BB;&#x5B8C;&#x7F8E;&#x8FD8;&#x5DEE;&#x5F88;&#x5927;&#x4E00;&#x622A;&#x3002;&#x867D;&#x7136;&#x5DF2;&#x7ECF;&#x89E3;&#x51B3;&#x4E86;&#x5F00;&#x53D1;&#x4EBA;&#x5458;&#x91CD;&#x590D;&#x9020;&#x8F6E;&#x5B50;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x5E76;&#x4F18;&#x5316;&#x4E86;&#x6700;&#x4F73;&#x7684;&#x4EE3;&#x7801;&#x6A21;&#x5F0F;&#xFF0C;&#x7136;&#x800C;&#x6211;&#x4EEC;&#x4ECD;&#x7136;&#x80FD;&#x53D1;&#x73B0;&#x4E00;&#x4E2A;&#x95EE;&#x9898;&#xFF1A;<code>ref</code>&#x4E4B;&#x540E;&#xFF0C;&#x62FF;&#x5230;&#x7684;&#x662F;<code>AsyncComponent</code>&#x7EC4;&#x4EF6;&#xFF0C;&#x5E76;&#x975E;&#x80FD;&#x50CF;<code>&lt;component&gt;</code>tag&#x4E00;&#x6837;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x5BF9;&#x5185;&#x90E8;&#x7EC4;&#x4EF6;&#x8FDB;&#x884C;&#x83B7;&#x53D6;&#x3002;&#x5982;&#x679C;&#x6309;&#x7167;&#x8FD9;&#x6837;&#x7684;&#x7406;&#x60F3;&#x53BB;&#x601D;&#x8003;&#xFF0C;&#x6709;&#x5229;&#x4E5F;&#x662F;&#x6709;&#x5F0A;&#x7684;&#x3002;<strong>&#x5229;</strong>&#x662F;&#x6211;&#x4EEC;&#x6784;&#x5EFA;&#x51FA;&#x4E86;<code>&lt;component&gt;</code>tag&#x7684;&#x52A8;&#x6001;&#x5F02;&#x6B65;&#x7248;&#xFF0C;<strong>&#x5F0A;</strong>&#x662F;<code>AsyncComponent</code>&#x4F5C;&#x4E3A;&#x5BB9;&#x5668;&#x7684;&#x5C5E;&#x6027;&#x5F88;&#x5BB9;&#x6613;&#x88AB;&#x5185;&#x90E8;&#x7684;&#x88C5;&#x8F7D;&#x7269;&#x6240;&#x66FF;&#x6362;&#xFF0C;&#x6BD4;&#x5982;<code>load</code>&#x65B9;&#x6CD5;&#x3002;</p>
<p>&#x4E14;&#x4E0D;&#x8003;&#x8651;&#x8FD9;&#x6837;&#x5B9E;&#x73B0;&#x4E4B;&#x540E;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5728;&#x5F00;&#x53D1;&#x8FC7;&#x7A0B;&#x4E2D;&#x901A;&#x8FC7;&#x7EA6;&#x675F;&#x6765;&#x907F;&#x514D;&#xFF0C;&#x4EE3;&#x7801;&#x4E2D;&#x4E5F;&#x53EF;&#x4EE5;&#x589E;&#x52A0;&#x5C5E;&#x6027;&#x68C0;&#x6D4B;&#x673A;&#x5236;&#x3002;&#x4F46;&#x8FD9;&#x6837;&#x7684;&#x5B9E;&#x73B0;&#x65B9;&#x5F0F;&#x975E;&#x5E38;&#x56F0;&#x96BE;&#xFF0C;&#x6211;&#x5C1D;&#x8BD5;&#x8FC7;&#x5982;&#x4E0B;&#x65B9;&#x5F0F;&#xFF0C;&#x5747;&#x4E0D;&#x80FD;&#x5B9E;&#x73B0;&#xFF1A;</p>
<blockquote>&#x51FD;&#x6570;&#x5F0F;&#x7EC4;&#x4EF6;&#xFF1A; &#x901A;&#x8FC7;&#x6DFB;&#x52A0;<code>functional: true</code>&#x53EF;&#x4EE5;&#x628A;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x51FD;&#x6570;&#x5316;&#xFF0C;&#x8FD9;&#x6837;&#x4F7F;&#x5F97;&#x8BE5;&#x7EC4;&#x4EF6;&#x65E0;&#x6CD5;&#x83B7;&#x53D6;&#x5230;<code>this</code>&#x5373;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#xFF0C;&#x56E0;&#x6B64;&#x4ED6;&#x6240;&#x6302;&#x8F7D;&#x7684;&#x5C31;&#x662F;&#x5185;&#x90E8;&#x7684;&#x88C5;&#x8F7D;&#x7EC4;&#x4EF6;&#x3002;&#x7136;&#x800C;&#x5728;&#x6784;&#x5EFA;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x51FA;&#x73B0;&#x4E86;&#x65E0;&#x9650;&#x9012;&#x5F52;<code>render</code>&#x51FD;&#x6570;&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x65E0;&#x6CD5;&#x89E3;&#x51B3;&#xFF0C;&#x800C;&#x4E14;<code>createElement</code>&#x51FD;&#x6570;&#x65E0;&#x6CD5;&#x521B;&#x5EFA;&#x7A7A;&#x8282;&#x70B9;&#xFF0C;&#x5BFC;&#x81F4;&#x7EC4;&#x4EF6;&#x603B;&#x4F1A;&#x51FA;&#x73B0;&#x4E00;&#x4E2A;&#x4E0D;&#x5FC5;&#x8981;&#x7684;&#x6807;&#x7B7E;&#x3002;<p>&#x62BD;&#x8C61;&#x5316;&#x7EC4;&#x4EF6;&#xFF1A; &#x901A;&#x8FC7;&#x6DFB;&#x52A0;<code>abstract: true</code>&#x53EF;&#x4EE5;&#x628A;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x62BD;&#x8C61;&#x5316;&#xFF0C;&#x8FD9;&#x6837;&#x7EC4;&#x4EF6;&#x662F;&#x65E0;&#x6CD5;&#x6E32;&#x67D3;&#x5176;&#x81EA;&#x8EAB;&#xFF0C;&#x800C;&#x53EA;&#x4F1A;&#x6302;&#x5728;&#x5185;&#x90E8;&#x7684;&#x88C5;&#x8F7D;&#x7EC4;&#x4EF6;&#x3002;&#x4F46;&#x8FD9;&#x6837;&#x505A;&#x4E4B;&#x540E;&#xFF0C;&#x4F1A;&#x5BFC;&#x81F4;&#x5916;&#x90E8;&#x5BB9;&#x5668;&#x65E0;&#x6CD5;&#x901A;&#x8FC7;<code>ref</code>&#x5C5E;&#x6027;&#x67E5;&#x627E;&#x5230;&#x5B83;&#xFF0C;&#x66F4;&#x65E0;&#x6CD5;&#x83B7;&#x53D6;&#x5230;&#x88C5;&#x8F7D;&#x7EC4;&#x4EF6;&#xFF0C;&#x56E0;&#x6B64;&#x4E5F;&#x4EE5;&#x5931;&#x8D25;&#x544A;&#x7EC8;&#x3002;</p>
<p>&#x7EE7;&#x627F;&#x5F0F;&#x7EC4;&#x4EF6;&#xFF1A; &#x901A;&#x8FC7;&#x6DFB;&#x52A0;<code>extends</code>&#x53EF;&#x4EE5;&#x5728;&#x6784;&#x5EFA;<code>AsyncComponent</code>&#x7684;&#x65F6;&#x5019;&#x5B9E;&#x73B0;&#x7EE7;&#x627F;&#xFF0C;&#x8FD9;&#x6837;&#x88C5;&#x8F7D;&#x7EC4;&#x4EF6;&#x7684;&#x5C5E;&#x6027;&#x90FD;&#x4F1A;&#x4F20;&#x5165;&#x5230;<code>AsyncComponent</code>&#x4E2D;&#xFF0C;&#x7136;&#x800C;&#xFF0C;&#x8FD9;&#x6837;&#x7684;&#x65B9;&#x5F0F;&#x4E0D;&#x652F;&#x6301;&#x52A8;&#x6001;&#x7EE7;&#x627F;&#xFF0C;&#x6240;&#x4EE5;&#x8FD8;&#x662F;&#x5BA3;&#x544A;&#x5931;&#x8D25;&#x3002;</p>
</blockquote>
<p>&#x867D;&#x7136;&#x90FD;&#x662F;&#x5931;&#x8D25;&#x7684;&#x7ED3;&#x679C;&#xFF0C;&#x4F46;&#x8FD9;&#x5E76;&#x4E0D;&#x80FD;&#x505C;&#x6B62;&#x6211;&#x4EEC;&#x7684;&#x60F3;&#x8C61;&#xFF0C;&#x76F8;&#x4FE1;&#x672A;&#x6765;&#x4F1A;&#x6709;&#x65B9;&#x6CD5;&#x6765;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;&#x3002;&#x76EE;&#x524D;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x53EA;&#x80FD;&#x8001;&#x8001;&#x5B9E;&#x5B9E;&#x7684;&#x628A;<code>AsyncComponent</code>&#x5F53;&#x505A;&#x5BB9;&#x5668;&#x6765;&#x4F7F;&#x7528;&#x3002;</p>
<h2 id="articleHeader3">&#x52A8;&#x6001;&#x5F02;&#x6B65;&#x7684;&#x672A;&#x6765;</h2>
<p>&#x4F60;&#x8981;&#x95EE;&#x6211;&#x52A8;&#x6001;&#x5F02;&#x6B65;&#x7EC4;&#x4EF6;&#x7684;&#x672A;&#x6765;&#x662F;&#x4EC0;&#x4E48;&#xFF0C;&#x6211;&#x4F1A;&#x544A;&#x8BC9;&#x4F60;&#x6211;&#x4EEC;&#x7684;&#x68A6;&#x60F3;&#x6709;&#x591A;&#x5927;&#x3002;&#x6211;&#x4EEC;&#x5E0C;&#x671B;&#x5B9E;&#x73B0;&#x5206;&#x5E03;&#x5F0F;&#x524D;&#x7AEF;UIServer&#xFF0C;&#x8BA9;<code>AsyncComponent</code>&#x53EF;&#x4EE5;&#x52A0;&#x8F7D;&#x8FDC;&#x7A0B;&#x7EC4;&#x4EF6;&#x3002;&#x8FDC;&#x7A0B;&#x7EC4;&#x4EF6;&#x5C31;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x914D;&#x7F6E;&#x5316;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x8131;&#x79BB;&#x4EE3;&#x7801;&#x672C;&#x8EAB;&#x800C;&#x8FDB;&#x884C;&#x524D;&#x7AEF;&#x7684;&#x7EC4;&#x4EF6;&#x6784;&#x5EFA;&#x3002;</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue动态异步组件实现思路及其问题

## 原文链接
[https://segmentfault.com/a/1190000015080442](https://segmentfault.com/a/1190000015080442)

