---
title: 'Vue 与 React 父子组件之间的家长里短' 
date: 2018-11-29 2:30:09
hidden: true
slug: azfs9ebwouf
categories: [reprint]
---

{{< raw >}}
<blockquote>&#x539F;&#x6587;&#x535A;&#x5BA2;&#x5730;&#x5740;&#xFF1A;<a href="https://finget.github.io/2018/06/08/vue-react-props/" rel="nofollow noreferrer" target="_blank">https://finget.github.io/2018/06/08/vue-react-props/</a></blockquote><h2 id="articleHeader0">Vue</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// father.js
&lt;template&gt;
  &lt;div id=&quot;father&quot;&gt;
      &#x8FD9;&#x662F;&#x7236;&#x7EC4;&#x4EF6;&#xFF1A;
      &lt;p&gt;&#x7236;&#x7EC4;&#x4EF6;&lt;/p&gt;
      &lt;Child ref=&quot;child&quot; :msg=&quot;msg&quot; @click=&quot;faClick&quot;&gt;&lt;/Child&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
import Child from &apos;./child&apos;;
export default {
  data() {
    return {
      msg: &apos;&#x7236;&#x7EC4;&#x4EF6;&#x4F20;&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6;&apos; // &#x4F20;&#x9012;&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x503C;
    };
  },
  components: {
    Child
  },
  methods: {
    faClick(msg) { // msg &#x5B50;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x7ED9;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x503C;
      alert(msg);
    },
    childSayHello() { // &#x7236;&#x7EC4;&#x4EF6;&#x8C03;&#x7528;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x65B9;&#x6CD5;
      this.$refs,child.sayHello();
    }
  }
}
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// father.js</span>
&lt;template&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;father&quot;</span>&gt;</span>
      &#x8FD9;&#x662F;&#x7236;&#x7EC4;&#x4EF6;&#xFF1A;
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x7236;&#x7EC4;&#x4EF6;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Child</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">&quot;child&quot;</span> <span class="hljs-attr">:msg</span>=<span class="hljs-string">&quot;msg&quot;</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;faClick&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">Child</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/template&gt;

&lt;script&gt;
import Child from &apos;./</span>child<span class="hljs-string">&apos;;
export default {
  data() {
    return {
      msg: &apos;</span>&#x7236;&#x7EC4;&#x4EF6;&#x4F20;&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6;<span class="hljs-string">&apos; // &#x4F20;&#x9012;&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x503C;
    };
  },
  components: {
    Child
  },
  methods: {
    faClick(msg) { // msg &#x5B50;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x7ED9;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x503C;
      alert(msg);
    },
    childSayHello() { // &#x7236;&#x7EC4;&#x4EF6;&#x8C03;&#x7528;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x65B9;&#x6CD5;
      this.$refs,child.sayHello();
    }
  }
}
&lt;/script&gt;</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// child.js
&lt;template&gt;
  &lt;div id=&quot;child&quot;&gt;
      &#x8FD9;&#x662F;&#x5B50;&#x7EC4;&#x4EF6;&#xFF1A;&lt;p&gt;&#x7236;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x7684;&#x503C;&#xFF1A;"{{"msg"}}"&lt;/p&gt;
      &lt;button @click=&quot;click&quot;&gt;&#x63A5;&#x6536;&#x7236;&#x7EC4;&#x4EF6;&#x65B9;&#x6CD5;&lt;/button&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  props: [&apos;msg&apos;],
  data() {
    return {
      childMsg : &apos;&#x54C8;&#x54C8;&#x54C8;&apos;
    };
  },
  methods: {
    click() {
      this.$emit(&apos;click&apos;,this.childMsg); // &#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x4E3A;&#x6D3E;&#x53D1;&#x7684;&#x4E8B;&#x4EF6;&#x540D;&#xFF0C; &#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x4E3A;&#x4F20;&#x9012;&#x7684;&#x503C;
    },
    sayHello() {
      alert(&apos;I am child!&apos;);
    }
  }
}
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// child.js</span>
&lt;template&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;child&quot;</span>&gt;</span>
      &#x8FD9;&#x662F;&#x5B50;&#x7EC4;&#x4EF6;&#xFF1A;<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x7236;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x7684;&#x503C;&#xFF1A;"{{"msg"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;click&quot;</span>&gt;</span>&#x63A5;&#x6536;&#x7236;&#x7EC4;&#x4EF6;&#x65B9;&#x6CD5;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/template&gt;

&lt;script&gt;
export default {
  props: [&apos;msg&apos;],
  data() {
    return {
      childMsg : &apos;&#x54C8;&#x54C8;&#x54C8;&apos;
    };
  },
  methods: {
    click() {
      this.$emit(&apos;click&apos;,this.childMsg); /</span><span class="hljs-regexp">/ &#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x4E3A;&#x6D3E;&#x53D1;&#x7684;&#x4E8B;&#x4EF6;&#x540D;&#xFF0C; &#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x4E3A;&#x4F20;&#x9012;&#x7684;&#x503C;
    },
    sayHello() {
      alert(&apos;I am child!&apos;);
    }
  }
}
&lt;/</span>script&gt;</code></pre><h3 id="articleHeader1">&#x7236;&#x7EC4;&#x4EF6;&#x5411;&#x5B50;&#x7EC4;&#x4EF6;&#x4F20;&#x503C;&#xFF1A;</h3><ol><li>&#x5728;&#x7236;&#x7EC4;&#x4EF6;&#x4E2D;&#x5F15;&#x5165;&#x5E76;&#x6CE8;&#x518C;&#x5B50;&#x7EC4;&#x4EF6;</li><li>&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x4E2D;&#x5B9A;&#x4E49; <code>props:[&apos;msg&apos;]</code> (&#x4E0D;&#x80FD;&#x7701;&#x7565;&#x5F15;&#x53F7;)</li><li>&#x901A;&#x8FC7; <code>:msg=&quot;msg&quot;</code> &#x7684;&#x65B9;&#x6CD5;&#x4F20;&#x9012;&#x53D8;&#x91CF;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; <code>msg=&quot;msg&quot;</code> &#x4F20;&#x9012;&#x5B57;&#x7B26;&#x4E32;</li></ol><h3 id="articleHeader2">&#x7236;&#x7EC4;&#x4EF6;&#x8C03;&#x7528;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x65B9;&#x6CD5;&#xFF1A;</h3><ol><li>&#x5728;&#x7236;&#x7EC4;&#x4EF6;&#x4E2D;&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6;&#x7ED1;&#x5B9A;&#x4E00;&#x4E2A; <code>ref=&quot;xxx&quot;</code> &#x5C5E;&#x6027;</li><li>&#x901A;&#x8FC7; <code>this.$refs.xxx.&#x65B9;&#x6CD5;</code> &#x8C03;&#x7528;</li></ol><h3 id="articleHeader3">&#x5B50;&#x7EC4;&#x4EF6;&#x5411;&#x7236;&#x7EC4;&#x4EF6;&#x4F20;&#x503C;&#xFF1A;</h3><ol><li>&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x4E2D;&#x5B9A;&#x4E49;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;</li><li>&#x901A;&#x8FC7; <code>this.$emit(&apos;&#x4E8B;&#x4EF6;&#x540D;&apos;,&apos;&#x53C2;&#x6570;&apos;)</code> &#x6D3E;&#x53D1;&#x4E00;&#x4E2A;&#x4E8B;&#x4EF6;&#xFF0C;&#x5E76;&#x4F20;&#x9012;&#x53C2;&#x6570;</li><li>&#x7236;&#x7EC4;&#x4EF6;&#x4E2D;&#x901A;&#x8FC7; <code>@&#x4E8B;&#x4EF6;&#x540D;</code> &#x7684;&#x65B9;&#x5F0F;&#x76D1;&#x542C;&#x4E8B;&#x4EF6;</li><li>&#x7236;&#x7EC4;&#x4EF6;&#x4E2D;&#x5B9A;&#x4E00;&#x4E2A;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x8BE5;&#x65B9;&#x6CD5;&#x7684;&#x53C2;&#x6570;&#x5BF9;&#x5E94;&#x5B50;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x8FC7;&#x6765;&#x7684;&#x53C2;&#x6570;</li></ol><h3 id="articleHeader4">&#x5B50;&#x7EC4;&#x4EF6;&#x8C03;&#x7528;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x65B9;&#x6CD5;&#xFF1A;</h3><p>&#x5B50;&#x7EC4;&#x4EF6;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;<code>this.$parent.xxx</code> &#x76F4;&#x63A5;&#x8C03;&#x7528;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x65B9;&#x6CD5;&#x3002;</p><blockquote>&#x901A;&#x8FC7;&#x5B50;&#x7EC4;&#x4EF6;&#x6D3E;&#x53D1;&#x7684;&#x4E8B;&#x4EF6;&#xFF0C;&#x4E0D;&#x4EC5;&#x53EF;&#x4EE5;&#x5411;&#x7236;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x53C2;&#x6570;&#xFF0C;&#x7236;&#x7EC4;&#x4EF6;&#x4E5F;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x4F20;&#x9012;&#x7684;&#x53C2;&#x6570;&#xFF0C;&#x6539;&#x53D8;&#x5411;&#x5B50;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x7684;&#x503C;&#xFF0C;&#x4ECE;&#x800C;&#x6539;&#x53D8;&#x5B50;&#x7EC4;&#x4EF6;&#x3002;</blockquote><p>props &#x8FD8;&#x53EF;&#x4EE5;&#x8FDB;&#x884C;&#x4E00;&#x7CFB;&#x5217;&#x7684;&#x683C;&#x5F0F;&#x6821;&#x9A8C;&#xFF0C;&#x66F4;&#x591A;&#x5185;&#x5BB9;<a href="https://cn.vuejs.org/v2/guide/components-props.html#ad" rel="nofollow noreferrer" target="_blank">&#x67E5;&#x770B;&#x5B98;&#x7F51;</a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="props: {
    // &#x57FA;&#x7840;&#x7684;&#x7C7B;&#x578B;&#x68C0;&#x67E5; (`null` &#x5339;&#x914D;&#x4EFB;&#x4F55;&#x7C7B;&#x578B;)
    propA: Number,
    // &#x591A;&#x4E2A;&#x53EF;&#x80FD;&#x7684;&#x7C7B;&#x578B;
    propB: [String, Number],
    // &#x5FC5;&#x586B;&#x7684;&#x5B57;&#x7B26;&#x4E32;
    propC: {
      type: String,
      required: true
    },
    // &#x5E26;&#x6709;&#x9ED8;&#x8BA4;&#x503C;&#x7684;&#x6570;&#x5B57;
    propD: {
      type: Number,
      default: 100
    },
    // &#x5E26;&#x6709;&#x9ED8;&#x8BA4;&#x503C;&#x7684;&#x5BF9;&#x8C61;
    propE: {
      type: Object,
      // &#x5BF9;&#x8C61;&#x6216;&#x6570;&#x7EC4;&#x4E14;&#x4E00;&#x5B9A;&#x4F1A;&#x4ECE;&#x4E00;&#x4E2A;&#x5DE5;&#x5382;&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x9ED8;&#x8BA4;&#x503C;
      default: function () {
        return { message: &apos;hello&apos; }
      }
    },
    // &#x81EA;&#x5B9A;&#x4E49;&#x9A8C;&#x8BC1;&#x51FD;&#x6570;
    propF: {
      validator: function (value) {
        // &#x8FD9;&#x4E2A;&#x503C;&#x5FC5;&#x987B;&#x5339;&#x914D;&#x4E0B;&#x5217;&#x5B57;&#x7B26;&#x4E32;&#x4E2D;&#x7684;&#x4E00;&#x4E2A;
        return [&apos;success&apos;, &apos;warning&apos;, &apos;danger&apos;].indexOf(value) !== -1
      }
    }
  }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">props: {
    <span class="hljs-comment">// &#x57FA;&#x7840;&#x7684;&#x7C7B;&#x578B;&#x68C0;&#x67E5; (`null` &#x5339;&#x914D;&#x4EFB;&#x4F55;&#x7C7B;&#x578B;)</span>
    propA: <span class="hljs-built_in">Number</span>,
    <span class="hljs-comment">// &#x591A;&#x4E2A;&#x53EF;&#x80FD;&#x7684;&#x7C7B;&#x578B;</span>
    propB: [<span class="hljs-built_in">String</span>, <span class="hljs-built_in">Number</span>],
    <span class="hljs-comment">// &#x5FC5;&#x586B;&#x7684;&#x5B57;&#x7B26;&#x4E32;</span>
    propC: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">String</span>,
      <span class="hljs-attr">required</span>: <span class="hljs-literal">true</span>
    },
    <span class="hljs-comment">// &#x5E26;&#x6709;&#x9ED8;&#x8BA4;&#x503C;&#x7684;&#x6570;&#x5B57;</span>
    propD: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Number</span>,
      <span class="hljs-attr">default</span>: <span class="hljs-number">100</span>
    },
    <span class="hljs-comment">// &#x5E26;&#x6709;&#x9ED8;&#x8BA4;&#x503C;&#x7684;&#x5BF9;&#x8C61;</span>
    propE: {
      <span class="hljs-attr">type</span>: <span class="hljs-built_in">Object</span>,
      <span class="hljs-comment">// &#x5BF9;&#x8C61;&#x6216;&#x6570;&#x7EC4;&#x4E14;&#x4E00;&#x5B9A;&#x4F1A;&#x4ECE;&#x4E00;&#x4E2A;&#x5DE5;&#x5382;&#x51FD;&#x6570;&#x8FD4;&#x56DE;&#x9ED8;&#x8BA4;&#x503C;</span>
      <span class="hljs-keyword">default</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> { <span class="hljs-attr">message</span>: <span class="hljs-string">&apos;hello&apos;</span> }
      }
    },
    <span class="hljs-comment">// &#x81EA;&#x5B9A;&#x4E49;&#x9A8C;&#x8BC1;&#x51FD;&#x6570;</span>
    propF: {
      <span class="hljs-attr">validator</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">value</span>) </span>{
        <span class="hljs-comment">// &#x8FD9;&#x4E2A;&#x503C;&#x5FC5;&#x987B;&#x5339;&#x914D;&#x4E0B;&#x5217;&#x5B57;&#x7B26;&#x4E32;&#x4E2D;&#x7684;&#x4E00;&#x4E2A;</span>
        <span class="hljs-keyword">return</span> [<span class="hljs-string">&apos;success&apos;</span>, <span class="hljs-string">&apos;warning&apos;</span>, <span class="hljs-string">&apos;danger&apos;</span>].indexOf(value) !== <span class="hljs-number">-1</span>
      }
    }
  }</code></pre><h2 id="articleHeader5">React</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// father.js
import React, { Component } from &apos;react&apos;

import Child from &apos;./child.js&apos;;

class Father extends Component {
  constructor(props) {
    super(props);
    this.state = {
      con: &apos;&#x7236;&#x7EC4;&#x4EF6;&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6;&apos;
    }
  }
  // &#x4F20;&#x9012;&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x5E76;&#x63A5;&#x6536;&#x5B50;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#xFF0C;&#x7ED1;&#x5B9A;&#x5728;this.child&#x4E0A;
  onRef = (ref) =&gt; {
    this.child = ref
  }
  // &#x901A;&#x8FC7;this.child &#x5C31;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x8C03;&#x7528;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x5185;&#x90E8;&#x65B9;&#x6CD5;
  click = () =&gt; {
    this.child.sayHello();
  }
  // &#x4F20;&#x9012;&#x4E2A;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x65B9;&#x6CD5;
  faClick = (msg) =&gt; {
    alert(msg);
  }
  render() {
    return (
      &lt;div&gt;
        &lt;p&gt;&#x8FD9;&#x662F;&#x7236;&#x7EC4;&#x4EF6;&lt;/p&gt;
        &lt;button onClick={this.click}&gt;&#x8C03;&#x7528;&#x5B50;&#x7EC4;&#x4EF6;&#x65B9;&#x6CD5;&lt;/button&gt;
        &lt;div&gt;
          &#x8FD9;&#x662F;&#x5B50;&#x7EC4;&#x4EF6;
          &lt;Child onRef={this.onRef} connect={this.state.con} click={(msg) =&gt; this.faClick(msg)}/&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    )
  }
}

export default Father;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// father.js</span>
<span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>

<span class="hljs-keyword">import</span> Child <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./child.js&apos;</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Father</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {
      <span class="hljs-attr">con</span>: <span class="hljs-string">&apos;&#x7236;&#x7EC4;&#x4EF6;&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6;&apos;</span>
    }
  }
  <span class="hljs-comment">// &#x4F20;&#x9012;&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x5E76;&#x63A5;&#x6536;&#x5B50;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#xFF0C;&#x7ED1;&#x5B9A;&#x5728;this.child&#x4E0A;</span>
  onRef = <span class="hljs-function">(<span class="hljs-params">ref</span>) =&gt;</span> {
    <span class="hljs-keyword">this</span>.child = ref
  }
  <span class="hljs-comment">// &#x901A;&#x8FC7;this.child &#x5C31;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x8C03;&#x7528;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x5185;&#x90E8;&#x65B9;&#x6CD5;</span>
  click = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">this</span>.child.sayHello();
  }
  <span class="hljs-comment">// &#x4F20;&#x9012;&#x4E2A;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x65B9;&#x6CD5;</span>
  faClick = <span class="hljs-function">(<span class="hljs-params">msg</span>) =&gt;</span> {
    alert(msg);
  }
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>&#x8FD9;&#x662F;&#x7236;&#x7EC4;&#x4EF6;<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.click}</span>&gt;</span>&#x8C03;&#x7528;&#x5B50;&#x7EC4;&#x4EF6;&#x65B9;&#x6CD5;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
          &#x8FD9;&#x662F;&#x5B50;&#x7EC4;&#x4EF6;
          <span class="hljs-tag">&lt;<span class="hljs-name">Child</span> <span class="hljs-attr">onRef</span>=<span class="hljs-string">{this.onRef}</span> <span class="hljs-attr">connect</span>=<span class="hljs-string">{this.state.con}</span> <span class="hljs-attr">click</span>=<span class="hljs-string">{(msg)</span> =&gt;</span> this.faClick(msg)}/&gt;
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    )
  }
}

export default Father;</span></code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// child.js
import React, { Component } from &apos;react&apos;

class Child extends Component {
  constructor(props) {
    super(props);
  }
  // &#x8C03;&#x7528;&#x7236;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x5E76;&#x4F20;&#x9012;&#x5B50;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;
  componentDidMount(){
    this.props.onRef(this);
  }
  // &#x8C03;&#x7528;&#x7236;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x7684;&#x65B9;&#x6CD5;
  click= ()=&gt; {
    this.props.click(&apos;&#x54C8;&#x554A;&#x54C8;&apos;);
  }
  // &#x5B50;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x65B9;&#x6CD5;
  sayHello = () =&gt; {
    alert(&apos;I am child&apos;);
  }
  render() {
    return (
      &lt;div&gt;
         &lt;p&gt;{this.props.connect}&lt;/p&gt;
         &lt;button onClick={this.click}&gt;&#x63A5;&#x6536;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x65B9;&#x6CD5;&lt;/button&gt;
      &lt;/div&gt;
    )
  }
}

export default Child;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// child.js</span>
<span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;react&apos;</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Child</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
  }
  <span class="hljs-comment">// &#x8C03;&#x7528;&#x7236;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x5E76;&#x4F20;&#x9012;&#x5B50;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;</span>
  componentDidMount(){
    <span class="hljs-keyword">this</span>.props.onRef(<span class="hljs-keyword">this</span>);
  }
  <span class="hljs-comment">// &#x8C03;&#x7528;&#x7236;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x7684;&#x65B9;&#x6CD5;</span>
  click= <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span> {
    <span class="hljs-keyword">this</span>.props.click(<span class="hljs-string">&apos;&#x54C8;&#x554A;&#x54C8;&apos;</span>);
  }
  <span class="hljs-comment">// &#x5B50;&#x7EC4;&#x4EF6;&#x5185;&#x90E8;&#x65B9;&#x6CD5;</span>
  sayHello = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    alert(<span class="hljs-string">&apos;I am child&apos;</span>);
  }
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{this.props.connect}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
         <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.click}</span>&gt;</span>&#x63A5;&#x6536;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x65B9;&#x6CD5;<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    )
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Child;</code></pre><h3 id="articleHeader6">&#x7236;&#x7EC4;&#x4EF6;&#x5411;&#x5B50;&#x7EC4;&#x4EF6;&#x4F20;&#x503C;&#xFF1A;</h3><ol><li>&#x5728;&#x7236;&#x7EC4;&#x4EF6;&#x4E2D;&#x5F15;&#x5165;&#x5B50;&#x7EC4;&#x4EF6;</li><li>&#x901A;&#x8FC7; <code>connect={this.state.con}</code> &#x65B9;&#x5F0F;&#x53EF;&#x4EE5;&#x4F20;&#x9012;&#x503C;</li><li>&#x5B50;&#x7EC4;&#x4EF6;&#x901A;&#x8FC7; <code>this.props.connect</code> &#x63A5;&#x6536;</li></ol><h3 id="articleHeader7">&#x7236;&#x7EC4;&#x4EF6;&#x8C03;&#x7528;&#x5B50;&#x7EC4;&#x4EF6;&#x7684;&#x65B9;&#x6CD5;&#xFF1A;</h3><ol><li>&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5; <code>onRef={this.onRef}</code></li><li>&#x5B50;&#x7EC4;&#x4EF6;&#x5728; <code>componentDidMount</code> &#x751F;&#x547D;&#x5468;&#x671F;&#x91CC; &#x8C03;&#x7528;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;&#x5E76;&#x56DE;&#x4F20;&#x81EA;&#x8EAB;&#x5B9E;&#x4F8B;</li><li>&#x7236;&#x7EC4;&#x5728;&#x8BE5;&#x65B9;&#x6CD5;&#x4E2D;&#x63A5;&#x6536;&#x5B50;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#xFF0C;&#x5E76;&#x6302;&#x8F7D;&#x5728;&#x7236;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#x5C5E;&#x6027;&#x4E0A;&#xFF0C;&#x4F8B;&#xFF1A;<code>this.child = ref</code></li><li>&#x6700;&#x540E;&#x5C31;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; <code>this.child.xxx</code> &#x76F4;&#x63A5;&#x8C03;&#x7528;&#x5B50;&#x7EC4;&#x4EF6;&#x65B9;&#x6CD5;</li></ol><h3 id="articleHeader8">&#x5B50;&#x7EC4;&#x4EF6;&#x5411;&#x7236;&#x7EC4;&#x4EF6;&#x4F20;&#x53C2;&#xFF1A;</h3><ol><li>&#x5728;&#x7236;&#x7EC4;&#x4EF6;&#x4E2D;&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;<code>click={(msg) =&gt; this.faClick(msg)}</code></li><li>&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x4E2D;&#x901A;&#x8FC7;&#x4E00;&#x4E2A;&#x4E8B;&#x4EF6;&#x63A5;&#x6536;&#x8FD9;&#x4E2A;&#x65B9;&#x6CD5;&#xFF0C;<code>onClick={this.click}</code></li><li>&#x901A;&#x8FC7;<code>click= ()=&gt; {this.props.click(&apos;&#x54C8;&#x554A;&#x54C8;&apos;);}</code> &#x4ECE;&#x800C;&#x4F20;&#x9012;&#x53C2;&#x6570;</li></ol><h3 id="articleHeader9">&#x5B50;&#x7EC4;&#x4EF6;&#x8C03;&#x7528;&#x7236;&#x7EC4;&#x4EF6;&#x65B9;&#x6CD5;</h3><ol><li>&#x7236;&#x7EC4;&#x4EF6;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4F20;&#x9012;&#x4E00;&#x4E2A;&#x65B9;&#x6CD5;&#x7ED9;&#x5B50;&#x7EC4;&#x4EF6;</li><li>&#x5B50;&#x7EC4;&#x4EF6;&#x53EF;&#x4EE5;&#x901A;&#x8FC7; <code>this.props.xxx</code> &#x8C03;&#x7528;</li></ol><blockquote>&#x4E0D;&#x80FD;&#x76F4;&#x63A5;&#x901A;&#x8FC7; <code>&lt;button onClick={this.props.click(&apos;&#x54C8;&#x554A;&#x54C8;&apos;)}&gt;&#x63A5;&#x6536;&#x7236;&#x7EC4;&#x4EF6;&#x7684;&#x65B9;&#x6CD5;&lt;/button&gt;</code> &#x8FDB;&#x884C;&#x4F20;&#x53C2;&#xFF0C;&#x8FD9;&#x6837;&#x5728;&#x7EC4;&#x4EF6;&#x521D;&#x59CB;&#x5316;&#x65F6;&#xFF0C;&#x4E8B;&#x4EF6;&#x5C31;&#x6267;&#x884C;&#x4E86;&#x3002;</blockquote><h2 id="articleHeader10">Vue &#x4E0E; React &#x7684;&#x4E0D;&#x540C;&#xFF1A;</h2><ol><li>React &#x7684;&#x5B50;&#x7EC4;&#x4EF6;&#x4E2D;&#x4E0D;&#x7528;&#x5B9A;&#x4E49;&#x7236;&#x7EC4;&#x4EF6;&#x4F20;&#x503C;&#x5BF9;&#x5E94;&#x7684;&#x53D8;&#x91CF;</li><li>React &#x7684;&#x5B50;&#x7EC4;&#x4EF6;&#x4E0D;&#x7528;&#x6D3E;&#x53D1;&#x4E8B;&#x4EF6;&#xFF0C;&#x7236;&#x7EC4;&#x4EF6;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x4F20;&#x9012;&#x65B9;&#x6CD5;</li><li>&#x5B50;&#x7EC4;&#x4EF6;&#x901A;&#x8FC7;<code>this.props.click</code> &#x53EF;&#x4EE5;&#x8C03;&#x7528;&#x7236;&#x7EC4;&#x4EF6;&#x4F20;&#x9012;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x5E76;&#x4F20;&#x53C2;</li></ol>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue 与 React 父子组件之间的家长里短

## 原文链接
[https://segmentfault.com/a/1190000015229937](https://segmentfault.com/a/1190000015229937)

