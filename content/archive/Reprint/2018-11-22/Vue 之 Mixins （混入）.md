---
title: 'Vue 之 Mixins （混入）' 
date: 2018-11-22 11:48:10
hidden: true
slug: ftzy97w90zp
categories: [reprint]
---

{{< raw >}}
<h3 id="articleHeader0">Mixins</h3><blockquote>Mixins&#x662F;&#x4E00;&#x79CD;&#x5206;&#x53D1;Vue&#x7EC4;&#x4EF6;&#x4E2D;&#x53EF;&#x590D;&#x7528;&#x529F;&#x80FD;&#x7684;&#x975E;&#x5E38;&#x7075;&#x6D3B;&#x7684;&#x4E00;&#x79CD;&#x65B9;&#x5F0F;&#x3002;</blockquote><p><span class="img-wrap"><img data-src="https://p0.ssl.qhimg.com/dr/450__/t0195da96ce6d7eb510.jpg" src="https://static.alili.techhttps://p0.ssl.qhimg.com/dr/450__/t0195da96ce6d7eb510.jpg" alt="" title="" style="cursor:pointer;display:inline"></span></p><blockquote>&#x4EC0;&#x4E48;&#x65F6;&#x5019;&#x4F7F;&#x7528;<code>Mixins</code></blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. &#x9875;&#x9762;&#x7684;&#x98CE;&#x683C;&#x4E0D;&#x7528;&#xFF0C;&#x4F46;&#x662F;&#x6267;&#x884C;&#x7684;&#x65B9;&#x6CD5;&#x548C;&#x9700;&#x8981;&#x7684;&#x6570;&#x636E;&#x7C7B;&#x4F3C;&#xFF0C;&#x6211;&#x4EEC;&#x662F;&#x9009;&#x62E9;&#x6BCF;&#x4E2A;&#x90FD;&#x5199;&#x5462;&#x8FD8;&#x662F;&#x63D0;&#x53D6;&#x51FA;&#x516C;&#x5171;&#x90E8;&#x5206;&#x5462;&#xFF1F;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs markdown"><code><span class="hljs-bullet">1. </span>&#x9875;&#x9762;&#x7684;&#x98CE;&#x683C;&#x4E0D;&#x7528;&#xFF0C;&#x4F46;&#x662F;&#x6267;&#x884C;&#x7684;&#x65B9;&#x6CD5;&#x548C;&#x9700;&#x8981;&#x7684;&#x6570;&#x636E;&#x7C7B;&#x4F3C;&#xFF0C;&#x6211;&#x4EEC;&#x662F;&#x9009;&#x62E9;&#x6BCF;&#x4E2A;&#x90FD;&#x5199;&#x5462;&#x8FD8;&#x662F;&#x63D0;&#x53D6;&#x51FA;&#x516C;&#x5171;&#x90E8;&#x5206;&#x5462;&#xFF1F;
</code></pre><hr><p><strong>&#x57FA;&#x7840;&#x5B9E;&#x4F8B;</strong></p><blockquote>&#x6211;&#x4EEC;&#x6709;&#x4E00;&#x5BF9;&#x4E0D;&#x540C;&#x7684;&#x7EC4;&#x4EF6;&#xFF0C;&#x5B83;&#x4EEC;&#x7684;&#x4F5C;&#x7528;&#x662F;&#x5207;&#x6362;&#x4E00;&#x4E2A;&#x72B6;&#x6001;&#x5E03;&#x5C14;&#x503C;&#xFF0C;&#x4E00;&#x4E2A;&#x6A21;&#x6001;&#x6846;&#x548C;&#x4E00;&#x4E2A;&#x63D0;&#x793A;&#x6846;&#x3002;&#x8FD9;&#x4E9B;&#x63D0;&#x793A;&#x6846;&#x548C;&#x6A21;&#x6001;&#x6846;&#x9664;&#x4E86;&#x5728;&#x529F;&#x80FD;&#x4E0A;&#xFF0C;&#x6CA1;&#x6709;&#x5176;&#x4ED6;&#x5171;&#x540C;&#x70B9;&#xFF1A;&#x5B83;&#x4EEC;&#x770B;&#x8D77;&#x6765;&#x4E0D;&#x4E00;&#x6837;&#xFF0C;&#x7528;&#x6CD5;&#x4E0D;&#x4E00;&#x6837;&#xFF0C;&#x4F46;&#x662F;&#x903B;&#x8F91;&#x4E00;&#x6837;&#x3002;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x6A21;&#x6001;&#x6846;
const Modal = {
  template: &apos;#modal&apos;,
  data() {
    return {
      isShowing: false
    }
  },
  methods: {
    toggleShow() {
      this.isShowing = !this.isShowing;
    }
  },
  components: {
    appChild: Child
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code><span class="hljs-comment">// &#x6A21;&#x6001;&#x6846;</span>
const Modal = {
  template: <span class="hljs-string">&apos;#modal&apos;</span>,
  <span class="hljs-keyword">data</span>() {
    <span class="hljs-keyword">return</span> {
      isShowing: <span class="hljs-literal">false</span>
    }
  },
  methods: {
    toggleShow() {
      <span class="hljs-keyword">this</span>.isShowing = !<span class="hljs-keyword">this</span>.isShowing;
    }
  },
  components: {
    appChild: Child
  }
}</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x63D0;&#x793A;&#x6846;
const Tooltip = {
  template: &apos;#tooltip&apos;,
  data() {
    return {
      isShowing: false
    }
  },
  methods: {
    toggleShow() {
      this.isShowing = !this.isShowing;
    }
  },
  components: {
    appChild: Child
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code><span class="hljs-comment">// &#x63D0;&#x793A;&#x6846;</span>
const Tooltip = {
  template: <span class="hljs-string">&apos;#tooltip&apos;</span>,
  <span class="hljs-keyword">data</span>() {
    <span class="hljs-keyword">return</span> {
      isShowing: <span class="hljs-literal">false</span>
    }
  },
  methods: {
    toggleShow() {
      <span class="hljs-keyword">this</span>.isShowing = !<span class="hljs-keyword">this</span>.isShowing;
    }
  },
  components: {
    appChild: Child
  }
}</code></pre><blockquote>&#x89E3;&#x51B3;&#x529E;&#x6CD5;&#x5982;&#x4E0B;&#xFF1A;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const toggle = {
    data () {
        isshowing: false
    },
    methods: {
        toggleShow() {
            this.isshowing = !this.isshowing
        }
    }
}

// &#x4E0B;&#x9762;&#x5373;&#x53EF;&#x4F7F;&#x7528;&#x4E86;
// mixins: [&#x53D8;&#x91CF;&#x540D;]

const Modal = {
  template: &apos;#modal&apos;,
  mixins: [toggle],
  components: {
    appChild: Child
  }
};

const Tooltip = {
  template: &apos;#tooltip&apos;,
  mixins: [toggle],
  components: {
    appChild: Child
  }
};
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs yaml"><code><span class="hljs-string">const</span> <span class="hljs-string">toggle</span> <span class="hljs-string">=</span> <span class="hljs-string">{</span>
    <span class="hljs-string">data</span> <span class="hljs-string">()</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        isshowing:</span> <span class="hljs-literal">false</span>
    <span class="hljs-string">},</span>
<span class="hljs-attr">    methods:</span> <span class="hljs-string">{</span>
        <span class="hljs-string">toggleShow()</span> <span class="hljs-string">{</span>
            <span class="hljs-string">this.isshowing</span> <span class="hljs-string">=</span> <span class="hljs-string">!this.isshowing</span>
        <span class="hljs-string">}</span>
    <span class="hljs-string">}</span>
<span class="hljs-string">}</span>

<span class="hljs-string">//</span> <span class="hljs-string">&#x4E0B;&#x9762;&#x5373;&#x53EF;&#x4F7F;&#x7528;&#x4E86;</span>
<span class="hljs-string">//</span> <span class="hljs-attr">mixins:</span> <span class="hljs-string">[&#x53D8;&#x91CF;&#x540D;]</span>

<span class="hljs-string">const</span> <span class="hljs-string">Modal</span> <span class="hljs-string">=</span> <span class="hljs-string">{</span>
<span class="hljs-attr">  template:</span> <span class="hljs-string">&apos;#modal&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">  mixins:</span> <span class="hljs-string">[toggle],</span>
<span class="hljs-attr">  components:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    appChild:</span> <span class="hljs-string">Child</span>
  <span class="hljs-string">}</span>
<span class="hljs-string">};</span>

<span class="hljs-string">const</span> <span class="hljs-string">Tooltip</span> <span class="hljs-string">=</span> <span class="hljs-string">{</span>
<span class="hljs-attr">  template:</span> <span class="hljs-string">&apos;#tooltip&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">  mixins:</span> <span class="hljs-string">[toggle],</span>
<span class="hljs-attr">  components:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    appChild:</span> <span class="hljs-string">Child</span>
  <span class="hljs-string">}</span>
<span class="hljs-string">};</span>
</code></pre><blockquote>&#x5982;&#x679C;&#x4F60;&#x662F;&#x4EE5;vue-cli&#x521B;&#x5EFA;&#x7684;&#x9879;&#x76EE;&#x6765;&#x5199;&#xFF0C;&#x53EF;&#x4EE5;&#x8FD9;&#x6837;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// mixin.js

export const toggle = {
    data () {
        isshowing: false
    },
    methods: {
        toggleShow() {
            this.isshowing = !this.isshowing
        }
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code><span class="hljs-comment">// mixin.js</span>

export const toggle = {
    <span class="hljs-keyword">data</span> () {
        isshowing: <span class="hljs-literal">false</span>
    },
    methods: {
        toggleShow() {
            <span class="hljs-keyword">this</span>.isshowing = !<span class="hljs-keyword">this</span>.isshowing
        }
    }
}</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// modal.vue
// &#x5C06;mixin&#x5F15;&#x5165;&#x8BE5;&#x7EC4;&#x4EF6;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4F7F;&#x7528; toggleShow() &#x4E86;
import {mixin} from &apos;../mixin.js&apos;

export default {
    mixins: [mixin],
    mounted () {
        
    }
}
// tooltip&#x7EC4;&#x4EF6;&#x540C;&#x4E0A;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// modal.vue</span>
<span class="hljs-comment">// &#x5C06;mixin&#x5F15;&#x5165;&#x8BE5;&#x7EC4;&#x4EF6;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4F7F;&#x7528; toggleShow() &#x4E86;</span>
<span class="hljs-keyword">import</span> {mixin} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../mixin.js&apos;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">mixins</span>: [mixin],
    mounted () {
        
    }
}
<span class="hljs-comment">// tooltip&#x7EC4;&#x4EF6;&#x540C;&#x4E0A;</span></code></pre><hr><p><strong>&#x5408;&#x5E76;</strong></p><p>&#x5F53;&#x7EC4;&#x4EF6;&#x548C;&#x6DF7;&#x5165;&#x5BF9;&#x8C61;&#x542B;&#x6709;&#x540C;&#x540D;&#x9009;&#x9879;&#x65F6;&#xFF0C;&#x8FD9;&#x4E9B;&#x9009;&#x9879;&#x5C06;&#x4EE5;&#x6070;&#x5F53;&#x7684;&#x65B9;&#x5F0F;&#x6DF7;&#x5408;&#x3002;</p><blockquote>&#x4E00;&#x3001;&#x6570;&#x636E;&#x5BF9;&#x8C61;&#x5185;</blockquote><p>mixin&#x7684;&#x6570;&#x636E;&#x5BF9;&#x8C61;&#x548C;&#x7EC4;&#x4EF6;&#x7684;&#x6570;&#x636E;&#x53D1;&#x751F;&#x51B2;&#x7A81;&#x65F6;&#x4EE5;&#x7EC4;&#x4EF6;&#x6570;&#x636E;&#x4F18;&#x5148;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var mixin = {
  data: function () {
    return {
      message: &apos;hello&apos;,
      foo: &apos;abc&apos;
    }
  }
}

new Vue({
  mixins: [mixin],
  data: function () {
    return {
      message: &apos;goodbye&apos;,
      bar: &apos;def&apos;
    }
  },
  created: function () {
    console.log(this.$data)
    // =&gt; { message: &quot;goodbye&quot;, foo: &quot;abc&quot;, bar: &quot;def&quot; }
  }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> mixin = {
  <span class="hljs-attr">data</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">message</span>: <span class="hljs-string">&apos;hello&apos;</span>,
      <span class="hljs-attr">foo</span>: <span class="hljs-string">&apos;abc&apos;</span>
    }
  }
}

<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">mixins</span>: [mixin],
  <span class="hljs-attr">data</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">message</span>: <span class="hljs-string">&apos;goodbye&apos;</span>,
      <span class="hljs-attr">bar</span>: <span class="hljs-string">&apos;def&apos;</span>
    }
  },
  <span class="hljs-attr">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.$data)
    <span class="hljs-comment">// =&gt; { message: &quot;goodbye&quot;, foo: &quot;abc&quot;, bar: &quot;def&quot; }</span>
  }
})</code></pre><blockquote>&#x4E8C;&#x3001;&#x94A9;&#x5B50;&#x51FD;&#x6570;</blockquote><p>&#x540C;&#x540D;&#x94A9;&#x5B50;&#x51FD;&#x6570;&#x5C06;&#x4F1A;&#x6DF7;&#x5408;&#x4E3A;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#xFF0C;&#x90FD;&#x5C06;&#x88AB;&#x8C03;&#x7528;&#x5230;&#xFF0C;&#x4F46;&#x662F;&#x6DF7;&#x5165;&#x5BF9;&#x8C61;&#x7684;&#x94A9;&#x5B50;&#x5C06;&#x5728;&#x7EC4;&#x4EF6;&#x81EA;&#x8EAB;&#x94A9;&#x5B50;&#x4E4B;&#x524D;&#x8C03;&#x7528;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var mixin = {
  created: function () {
    console.log(&apos;&#x6DF7;&#x5165;&#x5BF9;&#x8C61;&#x7684;&#x94A9;&#x5B50;&#x88AB;&#x8C03;&#x7528;&apos;)
  }
}

new Vue({
  mixins: [mixin],
  created: function () {
    console.log(&apos;&#x7EC4;&#x4EF6;&#x94A9;&#x5B50;&#x88AB;&#x8C03;&#x7528;&apos;)
  }
})

// =&gt; &quot;&#x6DF7;&#x5165;&#x5BF9;&#x8C61;&#x7684;&#x94A9;&#x5B50;&#x88AB;&#x8C03;&#x7528;&quot;
// =&gt; &quot;&#x7EC4;&#x4EF6;&#x94A9;&#x5B50;&#x88AB;&#x8C03;&#x7528;&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> mixin = {
  <span class="hljs-attr">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x6DF7;&#x5165;&#x5BF9;&#x8C61;&#x7684;&#x94A9;&#x5B50;&#x88AB;&#x8C03;&#x7528;&apos;</span>)
  }
}

<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">mixins</span>: [mixin],
  <span class="hljs-attr">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x7EC4;&#x4EF6;&#x94A9;&#x5B50;&#x88AB;&#x8C03;&#x7528;&apos;</span>)
  }
})

<span class="hljs-comment">// =&gt; &quot;&#x6DF7;&#x5165;&#x5BF9;&#x8C61;&#x7684;&#x94A9;&#x5B50;&#x88AB;&#x8C03;&#x7528;&quot;</span>
<span class="hljs-comment">// =&gt; &quot;&#x7EC4;&#x4EF6;&#x94A9;&#x5B50;&#x88AB;&#x8C03;&#x7528;&quot;</span></code></pre><blockquote>&#x4E09;&#x3001;&#x503C;&#x4E3A;&#x5BF9;&#x8C61;&#x7684;&#x9009;&#x9879;</blockquote><p>&#x503C;&#x4E3A;&#x5BF9;&#x8C61;&#x7684;&#x9009;&#x9879;&#xFF0C;&#x4F8B;&#x5982; <code>methods</code>, <code>components</code> &#x548C; <code>directives</code>&#xFF0C;&#x5C06;&#x88AB;&#x6DF7;&#x5408;&#x4E3A;&#x540C;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x3002;&#x4E24;&#x4E2A;&#x5BF9;&#x8C61;&#x952E;&#x540D;&#x51B2;&#x7A81;&#x65F6;&#xFF0C;&#x53D6;&#x7EC4;&#x4EF6;&#x5BF9;&#x8C61;&#x7684;&#x952E;&#x503C;&#x5BF9;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var mixin = {
  methods: {
    foo: function () {
      console.log(&apos;foo&apos;)
    },
    conflicting: function () {
      console.log(&apos;from mixin&apos;)
    }
  }
}

var vm = new Vue({
  mixins: [mixin],
  methods: {
    bar: function () {
      console.log(&apos;bar&apos;)
    },
    conflicting: function () {
      console.log(&apos;from self&apos;)
    }
  }
})

vm.foo() // =&gt; &quot;foo&quot;
vm.bar() // =&gt; &quot;bar&quot;
vm.conflicting() // =&gt; &quot;from self&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs vim"><code>var mixin = {
  method<span class="hljs-variable">s:</span> {
    foo: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> {</span>
      console.<span class="hljs-built_in">log</span>(<span class="hljs-string">&apos;foo&apos;</span>)
    },
    conflictin<span class="hljs-variable">g:</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> {</span>
      console.<span class="hljs-built_in">log</span>(<span class="hljs-string">&apos;from mixin&apos;</span>)
    }
  }
}

var <span class="hljs-keyword">vm</span> = <span class="hljs-keyword">new</span> Vue({
  mixin<span class="hljs-variable">s:</span> [mixin],
  method<span class="hljs-variable">s:</span> {
    bar: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> {</span>
      console.<span class="hljs-built_in">log</span>(<span class="hljs-string">&apos;bar&apos;</span>)
    },
    conflictin<span class="hljs-variable">g:</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> {</span>
      console.<span class="hljs-built_in">log</span>(<span class="hljs-string">&apos;from self&apos;</span>)
    }
  }
})

<span class="hljs-keyword">vm</span>.foo() // =&gt; <span class="hljs-string">&quot;foo&quot;</span>
<span class="hljs-keyword">vm</span>.bar() // =&gt; <span class="hljs-string">&quot;bar&quot;</span>
<span class="hljs-keyword">vm</span>.conflicting() // =&gt; <span class="hljs-string">&quot;from self&quot;</span></code></pre><hr><p><strong>&#x5168;&#x5C40;&#x6DF7;&#x5165;</strong></p><p>&#x5168;&#x5C40;&#x6DF7;&#x5408;&#x88AB;&#x6CE8;&#x518C;&#x5230;&#x4E86;&#x6BCF;&#x4E2A;&#x5355;&#x4E00;&#x7EC4;&#x4EF6;&#x4E0A;&#x3002;&#x56E0;&#x6B64;&#xFF0C;&#x5B83;&#x4EEC;&#x7684;&#x4F7F;&#x7528;&#x573A;&#x666F;&#x6781;&#x5176;&#x6709;&#x9650;&#x5E76;&#x4E14;&#x8981;&#x975E;&#x5E38;&#x7684;&#x5C0F;&#x5FC3;&#x3002;&#x4E00;&#x4E2A;&#x6211;&#x80FD;&#x60F3;&#x5230;&#x7684;&#x7528;&#x9014;&#x5C31;&#x662F;&#x5B83;&#x50CF;&#x4E00;&#x4E2A;&#x63D2;&#x4EF6;&#xFF0C;&#x4F60;&#x9700;&#x8981;&#x8D4B;&#x4E88;&#x5B83;&#x8BBF;&#x95EE;&#x6240;&#x6709;&#x4E1C;&#x897F;&#x7684;&#x6743;&#x9650;&#x3002;&#x4F46;&#x5373;&#x4F7F;&#x5728;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x6211;&#x4E5F;&#x5BF9;&#x4F60;&#x6B63;&#x5728;&#x505A;&#x7684;&#x4FDD;&#x6301;&#x8B66;&#x60D5;&#xFF0C;&#x5C24;&#x5176;&#x662F;&#x4F60;&#x5728;&#x5E94;&#x7528;&#x4E2D;&#x6269;&#x5C55;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x53EF;&#x80FD;&#x5BF9;&#x4F60;&#x6765;&#x8BF4;&#x662F;&#x4E0D;&#x53EF;&#x77E5;&#x7684;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Vue.mixin({
    mounted() {
        console.log(&quot;&#x6211;&#x662F;mixin&quot;);
    }
})

new Vue({
    ...
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code><span class="hljs-selector-tag">Vue</span><span class="hljs-selector-class">.mixin</span>({
    <span class="hljs-selector-tag">mounted</span>() {
        <span class="hljs-selector-tag">console</span><span class="hljs-selector-class">.log</span>(<span class="hljs-string">&quot;&#x6211;&#x662F;mixin&quot;</span>);
    }
})

<span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Vue</span>({
    ...
})</code></pre><p>&#x518D;&#x6B21;&#x63D0;&#x9192;&#xFF0C;&#x5C0F;&#x5FC3;&#x4F7F;&#x7528;&#x5B83;&#xFF01;&#x90A3;&#x4E2A; console.log&#x5C06;&#x4F1A;&#x51FA;&#x73B0;&#x5728;&#x6BCF;&#x4E2A;&#x7EC4;&#x4EF6;&#x4E0A;&#x3002;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#x8FD8;&#x4E0D;&#x7B97;&#x574F;&#xFF08;&#x9664;&#x4E86;&#x63A7;&#x5236;&#x53F0;&#x4E0A;&#x6709;&#x591A;&#x4F59;&#x7684;&#x8F93;&#x51FA;&#xFF09;&#xFF0C;&#x4F46;&#x5982;&#x679C;&#x5B83;&#x88AB;&#x9519;&#x8BEF;&#x7684;&#x4F7F;&#x7528;&#xFF0C;&#x4F60;&#x5C06;&#x80FD;&#x770B;&#x5230;&#x5B83;&#x4F1A;&#x591A;&#x4E48;&#x7684;&#x6709;&#x5BB3;&#x3002;</p><blockquote>&#x4E00;&#x4E2A;&#x4F7F;&#x7528;&#x5408;&#x7406;&#x7684;&#x4F8B;&#x5B50;</blockquote><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x4E3A;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x9009;&#x9879; &apos;myOption&apos; &#x6CE8;&#x5165;&#x4E00;&#x4E2A;&#x5904;&#x7406;&#x5668;&#x3002;
Vue.mixin({
  created: function () {
    var myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})

new Vue({
  myOption: &apos;hello!&apos;
})
// =&gt; &quot;hello!&quot;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code><span class="hljs-comment">// &#x4E3A;&#x81EA;&#x5B9A;&#x4E49;&#x7684;&#x9009;&#x9879; &apos;myOption&apos; &#x6CE8;&#x5165;&#x4E00;&#x4E2A;&#x5904;&#x7406;&#x5668;&#x3002;</span>
Vue.mixin({
  <span class="hljs-attr">created</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> myOption = <span class="hljs-keyword">this</span>.$options.myOption
    <span class="hljs-keyword">if</span> (myOption) {
      <span class="hljs-built_in">console</span>.log(myOption)
    }
  }
})

<span class="hljs-keyword">new</span> Vue({
  <span class="hljs-attr">myOption</span>: <span class="hljs-string">&apos;hello!&apos;</span>
})
<span class="hljs-comment">// =&gt; &quot;hello!&quot;</span></code></pre><hr><p><strong>&#x603B;&#x7ED3;</strong></p><p>&#x6DF7;&#x5408;&#x5BF9;&#x4E8E;&#x5C01;&#x88C5;&#x4E00;&#x5C0F;&#x6BB5;&#x60F3;&#x8981;&#x590D;&#x7528;&#x7684;&#x4EE3;&#x7801;&#x6765;&#x8BB2;&#x662F;&#x6709;&#x7528;&#x7684;&#x3002;&#x5BF9;&#x4F60;&#x6765;&#x8BF4;&#x5B83;&#x4EEC;&#x5F53;&#x7136;&#x4E0D;&#x662F;&#x552F;&#x4E00;&#x53EF;&#x884C;&#x7684;&#x3002;&#x6DF7;&#x5408;&#x5F88;&#x597D;&#xFF0C;&#x5B83;&#x4E0D;&#x9700;&#x8981;&#x4F20;&#x9012;&#x72B6;&#x6001;&#xFF0C;&#x4F46;&#x662F;&#x8FD9;&#x79CD;&#x6A21;&#x5F0F;&#x5F53;&#x7136;&#x4E5F;&#x53EF;&#x80FD;&#x4F1A;&#x88AB;&#x6EE5;&#x7528;&#x3002;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x8FD8;&#x662F;&#x9700;&#x8981;&#x4ED4;&#x7EC6;&#x659F;&#x914C;&#x4F7F;&#x7528;&#x55BD;&#xFF01;&#xFF01;</p><p><strong>&#x4F8B;&#x5B50;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {mapGetters} from &apos;vuex&apos;

// &#x76EE;&#x7684;&#x662F;&#x60F3;&#x8981;&#x5904;&#x7406; scroll &#x7684;bottom&#x503C;&#xFF0C;&#x5728;&#x542B;&#x6709;playlist&#x5217;&#x8868;&#x7684;&#x60C5;&#x51B5;&#x4E0B;
export const playlistMixin = {
  computed: {
    ...mapGetters([
      &apos;playList&apos;
    ])
  },
  mounted() {
    this.handlePlaylist(this.playList)
  },
  activated() {
    this.handlePlaylist(this.playList)
  },
  watch: {
    playlist(newVal) {
      this.handlePlaylist(newVal)
    }
  },
  methods: {
    // &#x5982;&#x679C;&#x7EC4;&#x4EF6;&#x4E2D;&#x6CA1;&#x6709;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x62A5;&#x9519;
    handlePlaylist() {
      throw new Error(&apos;component must implement handlePlaylist method&apos;)
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs haxe"><code><span class="hljs-keyword">import</span> {mapGetters} from <span class="hljs-string">&apos;vuex&apos;</span>

<span class="hljs-comment">// &#x76EE;&#x7684;&#x662F;&#x60F3;&#x8981;&#x5904;&#x7406; scroll &#x7684;bottom&#x503C;&#xFF0C;&#x5728;&#x542B;&#x6709;playlist&#x5217;&#x8868;&#x7684;&#x60C5;&#x51B5;&#x4E0B;</span>
export const playlistMixin = {
  computed: <span class="hljs-type"></span>{
    ...mapGetters([
      <span class="hljs-string">&apos;playList&apos;</span>
    ])
  },
  mounted() {
    <span class="hljs-built_in">this</span>.handlePlaylist(<span class="hljs-built_in">this</span>.playList)
  },
  activated() {
    <span class="hljs-built_in">this</span>.handlePlaylist(<span class="hljs-built_in">this</span>.playList)
  },
  watch: <span class="hljs-type"></span>{
    playlist(<span class="hljs-keyword">new</span><span class="hljs-type">Val</span>) {
      <span class="hljs-built_in">this</span>.handlePlaylist(<span class="hljs-keyword">new</span><span class="hljs-type">Val</span>)
    }
  },
  methods: <span class="hljs-type"></span>{
    <span class="hljs-comment">// &#x5982;&#x679C;&#x7EC4;&#x4EF6;&#x4E2D;&#x6CA1;&#x6709;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x90A3;&#x4E48;&#x5C31;&#x62A5;&#x9519;</span>
    handlePlaylist() {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-type">Error</span>(<span class="hljs-string">&apos;component must implement handlePlaylist method&apos;</span>)
    }
  }
}</code></pre>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 之 Mixins （混入）

## 原文链接
[https://segmentfault.com/a/1190000015698391](https://segmentfault.com/a/1190000015698391)

