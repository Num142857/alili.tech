---
title: '[译] VUE 和 VUEX 中的数据流'
reprint: true
categories: reprint
abbrlink: 1c42a3c6
date: 2018-11-01 02:30:08
---

{{% raw %}}
<blockquote><ul><li><p>&#x539F;&#x6587;&#x5730;&#x5740;&#xFF1A;<a href="https://benjaminlistwon.com/blog/data-flow-in-vue-and-vuex/" rel="nofollow noreferrer" target="_blank">DATA FLOW IN VUE AND VUEX</a></p></li><li><p>&#x539F;&#x6587;&#x4F5C;&#x8005;&#xFF1A;<a href="https://benjaminlistwon.com/about/" rel="nofollow noreferrer" target="_blank">Benjamin Listwon</a></p></li><li><p>&#x8BD1;&#x6587;&#x51FA;&#x81EA;&#xFF1A;<a href="https://github.com/xitu/gold-miner" rel="nofollow noreferrer" target="_blank">&#x6398;&#x91D1;&#x7FFB;&#x8BD1;&#x8BA1;&#x5212;</a></p></li><li><p>&#x8BD1;&#x8005;&#xFF1A;<a href="https://github.com/llp0574" rel="nofollow noreferrer" target="_blank">linpu.li</a></p></li><li><p>&#x6821;&#x5BF9;&#x8005;&#xFF1A;<a href="https://github.com/malcolmyu" rel="nofollow noreferrer" target="_blank">malcolmyu</a>&#xFF0C;<a href="https://github.com/XatMassacrE" rel="nofollow noreferrer" target="_blank">XatMassacrE</a></p></li></ul></blockquote><p>&#x770B;&#x8D77;&#x6765;&#x5728; <a href="https://vuejs.org" rel="nofollow noreferrer" target="_blank">Vue</a> &#x91CC;&#x9762;&#x56F0;&#x6270;&#x5F00;&#x53D1;&#x8005;&#x7684;&#x4E8B;&#x60C5;&#x4E4B;&#x4E00;&#x662F;&#x5982;&#x4F55;&#x5728;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x5171;&#x4EAB;&#x72B6;&#x6001;&#x3002;&#x5BF9;&#x4E8E;&#x521A;&#x521A;&#x63A5;&#x89E6;&#x54CD;&#x5E94;&#x5F0F;&#x7F16;&#x7A0B;&#x7684;&#x5F00;&#x53D1;&#x8005;&#x6765;&#x8BF4;&#xFF0C;&#x50CF;<a href="https://github.com/vuejs/vuex/" rel="nofollow noreferrer" target="_blank">Vuex</a> &#x8FD9;&#x79CD;&#x5E93;&#xFF0C;&#x6709;&#x7740;&#x7E41;&#x591A;&#x7684;&#x65B0;&#x540D;&#x8BCD;&#x53CA;&#x5176;&#x5173;&#x6CE8;&#x70B9;&#x5206;&#x79BB;&#x7684;&#x65B9;&#x5F0F;&#xFF0C;&#x5F80;&#x5F80;&#x4EE4;&#x4EBA;&#x671B;&#x800C;&#x751F;&#x754F;&#x3002;&#x7279;&#x522B;&#x662F;&#x5F53;&#x4F60;&#x53EA;&#x5E0C;&#x671B;&#x5206;&#x4EAB;&#x4E00;&#x4E24;&#x4E2A;&#x6570;&#x636E;&#x7247;&#x6BB5;&#x65F6;&#xFF0C;&#xFF08;&#x8FD9;&#x4E00;&#x5957;&#x903B;&#x8F91;&#x7684;&#x590D;&#x6742;&#x6027;&#xFF09;&#x5C31;&#x663E;&#x5F97;&#x6709;&#x70B9;&#x8FC7;&#x5206;&#x4E86;&#x3002;</p><p>&#x8003;&#x8651;&#x5230;&#x8FD9;&#x4E00;&#x70B9;&#x7684;&#x8BDD;&#xFF0C;&#x6211;&#x60F3;&#x6211;&#x5E94;&#x8BE5;&#x628A;&#x4E24;&#x4E2A;&#x7B80;&#x77ED;&#x7684;&#x6F14;&#x793A;&#x653E;&#x5230;&#x4E00;&#x8D77;&#x5C55;&#x793A;&#x51FA;&#x6765;&#x3002;&#x7B2C;&#x4E00;&#x4E2A;&#x901A;&#x8FC7;&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684; JavaScript &#x5BF9;&#x8C61;&#xFF0C;&#x5728;&#x6BCF;&#x4E2A;&#x65B0;&#x7EC4;&#x4EF6;&#x5F53;&#x4E2D;&#x5F15;&#x7528;&#x6765;&#x5B9E;&#x73B0;&#x5171;&#x4EAB;&#x72B6;&#x6001;&#x3002;&#x7B2C;&#x4E8C;&#x4E2A;&#x505A;&#x4E86;&#x548C; Vuex &#x4E00;&#x6837;&#x7684;&#x4E8B;&#x60C5;&#xFF0C;&#x5F53;&#x5B83;&#x8FD0;&#x884C;&#x6210;&#x529F;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x4E5F;&#x662F;&#x4E00;&#x4E2A;&#x4F60;&#x7EDD;&#x5BF9;&#x4E0D;&#x5E94;&#x8BE5;&#x505A;&#x7684;&#x4E8B;&#x60C5;&#x7684;&#x793A;&#x4F8B;&#xFF08;&#x6211;&#x4EEC;&#x5C06;&#x5728;&#x6700;&#x540E;&#x770B;&#x770B;&#x4E3A;&#x4EC0;&#x4E48;&#xFF09;&#x3002;</p><p>&#x4F60;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x67E5;&#x770B;&#x4E0B;&#x9762;&#x8FD9;&#x4E9B;&#x6F14;&#x793A;&#x6765;&#x5F00;&#x59CB;&#xFF1A;</p><ul><li><p><a href="https://benjaminlistwon.com/demo/dataflow/shared/index.html" rel="nofollow noreferrer" target="_blank">Using shared object</a></p></li><li><p><a href="https://benjaminlistwon.com/demo/dataflow/vuex/index.html" rel="nofollow noreferrer" target="_blank">Using vuex</a></p></li><li><p><a href="https://benjaminlistwon.com/demo/dataflow/evil/index.html" rel="nofollow noreferrer" target="_blank">Using evil bindings</a></p></li></ul><p>&#x6216;&#x8005;&#x83B7;&#x53D6;<a href="https://github.com/BenjaminListwon/vue-data-flow" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x4E2A;&#x4ED3;&#x5E93;</a>&#x5E76;&#x5728;&#x672C;&#x5730;&#x8FD0;&#x884C;&#x8BD5;&#x8BD5;&#x770B;&#xFF01;&#x4EE3;&#x7801;&#x91CC;&#x5F88;&#x591A;&#x5730;&#x65B9;&#x662F;2.0&#x7248;&#x672C;&#x7684;&#x7279;&#x6027;&#xFF0C;&#x4F46;&#x6211;&#x63A5;&#x4E0B;&#x6765;&#x60F3;&#x8BB2;&#x7684;&#x6570;&#x636E;&#x6D41;&#x6982;&#x5FF5;&#x5728;&#x4EFB;&#x4F55;&#x7248;&#x672C;&#x91CC;&#x90FD;&#x662F;&#x76F8;&#x5173;&#x7684;&#xFF0C;&#x5E76;&#x4E14;&#x5B83;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x4E00;&#x4E9B;&#x6539;&#x53D8;&#x5F88;&#x8F7B;&#x6613;&#x5730;&#x5411;&#x4E0B;&#x517C;&#x5BB9;&#x5230;1.0&#x3002;</p><p>&#x8FD9;&#x4E9B;&#x6F14;&#x793A;&#x90FD;&#x662F;&#x4E00;&#x6837;&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x53EA;&#x662F;&#x5B9E;&#x73B0;&#x7684;&#x65B9;&#x6CD5;&#x4E0D;&#x540C;&#x3002;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x7531;&#x4E24;&#x4E2A;&#x72EC;&#x7ACB;&#x7684;&#x804A;&#x5929;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#x7EC4;&#x6210;&#x3002;&#x5F53;&#x7528;&#x6237;&#x5728;&#x4E00;&#x4E2A;&#x5B9E;&#x4F8B;&#x91CC;&#x63D0;&#x4EA4;&#x4E00;&#x4E2A;&#x6D88;&#x606F;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5B83;&#x5E94;&#x8BE5;&#x5728;&#x4E24;&#x4E2A;&#x804A;&#x5929;&#x7A97;&#x53E3;&#x90FD;&#x51FA;&#x73B0;&#xFF0C;&#x56E0;&#x4E3A;&#x6D88;&#x606F;&#x72B6;&#x6001;&#x662F;&#x5171;&#x4EAB;&#x7684;&#xFF0C;&#x4E0B;&#x9762;&#x662F;&#x4E00;&#x4E2A;&#x622A;&#x56FE;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000007168702?w=1000&amp;h=579" src="https://static.alili.tech/img/remote/1460000007168702?w=1000&amp;h=579" alt="" title="" style="cursor:pointer"></span></p><h2 id="articleHeader0">&#x7528;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#x5171;&#x4EAB;&#x72B6;&#x6001;</h2><p>&#x5F00;&#x59CB;&#x524D;&#xFF0C;&#x8BA9;&#x6211;&#x4EEC;&#x5148;&#x6765;&#x770B;&#x770B;&#x6570;&#x636E;&#x662F;&#x5982;&#x4F55;&#x5728;&#x793A;&#x4F8B;&#x7684;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x5F53;&#x4E2D;&#x6D41;&#x8F6C;&#x7684;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000007168703" src="https://static.alili.tech/img/remote/1460000007168703" alt="" title="" style="cursor:pointer"></span></p><p>&#x5728;&#x8FD9;&#x4E2A;&#x6F14;&#x793A;&#x91CC;&#xFF0C;&#x6211;&#x4EEC;&#x5C06;&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684; JavaScript &#x5BF9;&#x8C61;&#xFF1A;<code>var store = {...}</code>&#xFF0C;&#x5728;<code>Client.vue</code>&#x7EC4;&#x4EF6;&#x7684;&#x5B9E;&#x4F8B;&#x4E4B;&#x95F4;&#x5171;&#x4EAB;&#x72B6;&#x6001;&#x3002;&#x4E0B;&#x9762;&#x662F;&#x5173;&#x952E;&#x6587;&#x4EF6;&#x7684;&#x91CD;&#x8981;&#x4EE3;&#x7801;&#x90E8;&#x5206;&#xFF1A;</p><h5>index.html</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div id=&quot;app&quot;&gt;&lt;/div&gt;
&lt;script&gt;
  var store = {
    state: {
      messages: []
    },
    newMessage (msg) {
      this.state.messages.push(msg)
    }
  }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code><span class="hljs-variable">&lt;div id=&quot;app&quot;&gt;</span>&lt;/div&gt;
<span class="hljs-variable">&lt;script&gt;</span>
  var store = {
    <span class="hljs-keyword">state</span>: {
      messages: []
    },
    newMessage (msg) {
      this.<span class="hljs-keyword">state</span>.messages.push(msg)
    }
  }
&lt;/script&gt;</code></pre><p>&#x8FD9;&#x91CC;&#x6709;&#x4E24;&#x4E2A;&#x5173;&#x952E;&#x7684;&#x5730;&#x65B9;&#xFF1A;</p><ol><li><p>&#x6211;&#x4EEC;&#x901A;&#x8FC7;&#x628A;&#x8FD9;&#x4E2A;&#x5BF9;&#x8C61;&#x76F4;&#x63A5;&#x6DFB;&#x52A0;&#x5230;<code>index.html</code>&#x91CC;&#x6765;&#x8BA9;&#x5176;&#x5BF9;&#x6574;&#x4E2A;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x53EF;&#x7528;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x5C06;&#x5B83;&#x6CE8;&#x5165;&#x5230;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x91CC;&#x66F4;&#x4E0B;&#x4E00;&#x5C42;&#x7684;&#x4F5C;&#x7528;&#x94FE;&#xFF0C;&#x4F46;&#x76EE;&#x524D;&#x76F4;&#x63A5;&#x6DFB;&#x52A0;&#x663E;&#x7136;&#x66F4;&#x5FEB;&#x6377;&#x7B80;&#x5355;&#x3002;</p></li><li><p>&#x6211;&#x4EEC;&#x5728;&#x8FD9;&#x91CC;&#x4FDD;&#x5B58;&#x72B6;&#x6001;&#xFF0C;&#x4F46;&#x540C;&#x65F6;&#x4E5F;&#x63D0;&#x4F9B;&#x4E86;&#x4E00;&#x4E2A;&#x51FD;&#x6570;&#x6765;&#x8C03;&#x7528;&#x5B83;&#x3002;&#x76F8;&#x6BD4;&#x8D77;&#x5206;&#x6563;&#x5728;&#x7EC4;&#x4EF6;&#x5404;&#x5904;&#x7684;&#x51FD;&#x6570;&#xFF0C;&#x6211;&#x4EEC;&#x66F4;&#x503E;&#x5411;&#x4E8E;&#x8BA9;&#x5B83;&#x4EEC;&#x4FDD;&#x6301;&#x5728;&#x4E00;&#x4E2A;&#x5730;&#x65B9;&#xFF08;&#x4FBF;&#x4E8E;&#x7EF4;&#x62A4;&#xFF09;&#xFF0C;&#x5E76;&#x5728;&#x4EFB;&#x4F55;&#x9700;&#x8981;&#x5B83;&#x4EEC;&#x7684;&#x5730;&#x65B9;&#x7B80;&#x5355;&#x4F7F;&#x7528;&#x3002;</p></li></ol><h5>App.vue</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;div id=&quot;app&quot;&gt;
    &lt;div class=&quot;row&quot;&gt;
      &lt;div class=&quot;col&quot;&gt;
        &lt;client clientid=&quot;Client A&quot;&gt;&lt;/client&gt;
      &lt;/div&gt;
      &lt;div class=&quot;col&quot;&gt;
        &lt;client clientid=&quot;Client B&quot;&gt;&lt;/client&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
import Client from &apos;./components/Client.vue&apos;

export default {
  components: {
    Client
  }
}
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;row&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;col&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">client</span> <span class="hljs-attr">clientid</span>=<span class="hljs-string">&quot;Client A&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">client</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;col&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">client</span> <span class="hljs-attr">clientid</span>=<span class="hljs-string">&quot;Client B&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">client</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> Client <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./components/Client.vue&apos;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> </span></span><span class="hljs-template-variable">{
  components: {
    Client
  }</span><span class="xml"><span class="undefined">
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p>&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x5F15;&#x5165;&#x4E86; Client &#x7EC4;&#x4EF6;&#xFF0C;&#x5E76;&#x521B;&#x5EFA;&#x4E86;&#x4E24;&#x4E2A;&#x5B83;&#x7684;&#x5B9E;&#x4F8B;&#xFF0C;&#x4F7F;&#x7528;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#xFF1A;<code>clientid</code>&#xFF0C;&#x6765;&#x5BF9;&#x6BCF;&#x4E2A;&#x5B9E;&#x4F8B;&#x8FDB;&#x884C;&#x533A;&#x5206;&#x3002;&#x4E8B;&#x5B9E;&#x4E0A;&#xFF0C;&#x4F60;&#x5E94;&#x8BE5;&#x66F4;&#x52A8;&#x6001;&#x5730;&#x53BB;&#x5B9E;&#x73B0;&#x8FD9;&#x4E9B;&#xFF0C;&#x4F46;&#x522B;&#x5FD8;&#x4E86;&#xFF0C;&#x76EE;&#x524D;&#x5FEB;&#x6377;&#x7B80;&#x5355;&#x66F4;&#x91CD;&#x8981;&#x3002;</p><p>&#x6CE8;&#x610F;&#x4E00;&#x70B9;&#xFF0C;&#x5230;&#x8FD9;&#x91CC;&#x6211;&#x4EEC;&#x8FD8;&#x5B8C;&#x5168;&#x6CA1;&#x6709;&#x540C;&#x6B65;&#x4EFB;&#x4F55;&#x72B6;&#x6001;&#x3002;</p><h5>Client.vue</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;div&gt;
    &lt;h1&gt;{{ clientid }}&lt;/h1&gt;
    &lt;div class=&quot;client&quot;&gt;
      &lt;ul&gt;
        &lt;li v-for=&quot;message in messages&quot;&gt;
          &lt;label&gt;{{ message.sender }}:&lt;/label&gt; {{ message.text }}
        &lt;/li&gt;
      &lt;/ul&gt;
      &lt;div class=&quot;msgbox&quot;&gt;
        &lt;input v-model=&quot;msg&quot; placeholder=&quot;Enter a message, then hit [enter]&quot; @keyup.enter=&quot;trySendMessage&quot;&gt;
      &lt;/div&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
export default {
  data() {
    return {
      msg: &apos;&apos;,
      messages: store.state.messages
    }
  },
  props: [&apos;clientid&apos;],
  methods: {
    trySendMessage() {
      store.newMessage({
        text: this.msg,
        sender: this.clientid
      })
      this.resetMessage()
    },
    resetMessage() {
      this.msg = &apos;&apos;
    }
  }
}
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span></span><span class="hljs-template-variable">{{ clientid }}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;client&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;message in messages&quot;</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span></span><span class="hljs-template-variable">{{ message.sender }}</span><span class="xml">:<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span> </span><span class="hljs-template-variable">{{ message.text }}</span><span class="xml">
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;msgbox&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;msg&quot;</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;Enter a message, then hit [enter]&quot;</span> @<span class="hljs-attr">keyup.enter</span>=<span class="hljs-string">&quot;trySendMessage&quot;</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">msg</span>: <span class="hljs-string">&apos;&apos;</span>,
      <span class="hljs-attr">messages</span>: store.state.messages
    }
  },
  <span class="hljs-attr">props</span>: [<span class="hljs-string">&apos;clientid&apos;</span>],
  <span class="hljs-attr">methods</span>: {
    trySendMessage() {
      store.newMessage({
        <span class="hljs-attr">text</span>: <span class="hljs-keyword">this</span>.msg,
        <span class="hljs-attr">sender</span>: <span class="hljs-keyword">this</span>.clientid
      })
      <span class="hljs-keyword">this</span>.resetMessage()
    },
    resetMessage() {
      <span class="hljs-keyword">this</span>.msg = <span class="hljs-string">&apos;&apos;</span>
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre><p>&#x4E0B;&#x9762;&#x662F;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x7684;&#x4E3B;&#x8981;&#x5185;&#x5BB9;&#xFF1A;</p><ol><li><p>&#x5728;&#x8BE5;&#x6A21;&#x677F;&#x91CC;&#xFF0C;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;<code>v-for</code>&#x5FAA;&#x73AF;&#x53BB;&#x904D;&#x5386;<code>messages</code>&#x96C6;&#x5408;&#x3002;</p></li><li><p>&#x7ED1;&#x5B9A;&#x5728;&#x6587;&#x672C;&#x8F93;&#x5165;&#x6846;&#x4E0A;&#x7684;<code>v-model</code>&#x7B80;&#x5355;&#x5730;&#x5B58;&#x50A8;&#x4E86;&#x7EC4;&#x4EF6;&#x7684;&#x672C;&#x5730;&#x6570;&#x636E;&#x5BF9;&#x8C61;<code>msg</code>&#x3002;</p></li><li><p>&#x540C;&#x6837;&#x5728;&#x6570;&#x636E;&#x5BF9;&#x8C61;&#x91CC;&#xFF0C;&#x6211;&#x4EEC;&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;<code>store.state.messages</code>&#x7684;&#x5F15;&#x7528;&#xFF0C;&#x5B83;&#x5C06;&#x89E6;&#x53D1;&#x7EC4;&#x4EF6;&#x7684;&#x66F4;&#x65B0;&#x3002;</p></li><li><p>&#x6700;&#x540E;&#xFF0C;&#x5C06; enter &#x952E;&#x7ED1;&#x5B9A;&#x5230;<code>trySendMessage</code>&#x51FD;&#x6570;&#xFF0C;&#x8FD9;&#x4E2A;&#x51FD;&#x6570;&#x5305;&#x542B;&#x4E86;&#x4EE5;&#x4E0B;&#x51E0;&#x4E2A;&#x529F;&#x80FD;&#xFF1A;</p><ol><li><p>&#x51C6;&#x5907;&#x597D;&#x9700;&#x8981;&#x5B58;&#x50A8;&#x7684;&#x6570;&#x636E;&#xFF08;&#x53D1;&#x9001;&#x8005;&#x548C;&#x6D88;&#x606F;&#x7684;&#x4E00;&#x4E2A;&#x5B57;&#x5178;&#x5BF9;&#x8C61;&#xFF09;&#x3002;</p></li><li><p>&#x8C03;&#x7528;&#x5B9A;&#x4E49;&#x5728;&#x5171;&#x4EAB;&#x5B58;&#x50A8;&#x91CC;&#x7684;<code>newMessage</code>&#x51FD;&#x6570;&#x3002;</p></li><li><p>&#x8C03;&#x7528;&#x4E00;&#x4E2A;&#x6E05;&#x7406;&#x51FD;&#x6570;&#xFF1A;<code>resetMessage</code>&#xFF0C;&#x91CD;&#x7F6E;&#x8F93;&#x5165;&#x6846;&#x3002;&#x901A;&#x5E38;&#x4F60;&#x66F4;&#x5E94;&#x8BE5;&#x5728;&#x4E00;&#x4E2A;<code>promise</code>&#x5B8C;&#x6210;&#x4E4B;&#x540E;&#x518D;&#x8C03;&#x7528;&#x5B83;&#x3002;</p></li></ol></li></ol><p>&#x8FD9;&#x5C31;&#x662F;&#x4F7F;&#x7528;&#x5BF9;&#x8C61;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x6765;<a href="https://benjaminlistwon.com/demo/dataflow/shared/index.html" rel="nofollow noreferrer" target="_blank">&#x8BD5;&#x4E00;&#x8BD5;</a>&#x3002;</p><h2 id="articleHeader1">&#x7528; Vuex &#x5171;&#x4EAB;&#x72B6;&#x6001;</h2><p>&#x597D;&#x4E86;&#xFF0C;&#x73B0;&#x5728;&#x6765;&#x8BD5;&#x8BD5;&#x770B;&#x7528; Vuex &#x5B9E;&#x73B0;&#x3002;&#x540C;&#x6837;&#x7684;&#xFF0C;&#x5148;&#x4E0A;&#x56FE;&#xFF0C;&#x4E5F;&#x4FBF;&#x4E8E;&#x6211;&#x4EEC;&#x5C06; Vuex &#x7684;&#x672F;&#x8BED;&#xFF08;actions&#xFF0C;mutations&#x7B49;&#x7B49;&#xFF09;&#x5BF9;&#x5E94;&#x5230;&#x6211;&#x4EEC;&#x521A;&#x521A;&#x5B8C;&#x6210;&#x7684;&#x793A;&#x4F8B;&#x4E2D;&#x3002;</p><p><span class="img-wrap"><img data-src="/img/remote/1460000007168704" src="https://static.alili.tech/img/remote/1460000007168704" alt="" title="" style="cursor:pointer"></span></p><p>&#x6B63;&#x5982;&#x4F60;&#x6240;&#x770B;&#x5230;&#x7684;&#xFF0C;Vuex &#x7B80;&#x5355;&#x5730;&#x5F62;&#x5F0F;&#x5316;&#x4E86;&#x6211;&#x4EEC;&#x521A;&#x521A;&#x5B8C;&#x6210;&#x7684;&#x8FC7;&#x7A0B;&#x3002;&#x4F7F;&#x7528;&#x5B83;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x6240;&#x505A;&#x7684;&#x4E8B;&#x60C5;&#x5176;&#x5B9E;&#x548C;&#x6211;&#x4EEC;&#x4E0A;&#x9762;&#x505A;&#x8FC7;&#x7684;&#x975E;&#x5E38;&#x50CF;&#xFF1A;</p><ol><li><p>&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x7528;&#x6765;&#x5171;&#x4EAB;&#x7684;&#x5B58;&#x50A8;&#xFF0C;&#x5728;&#x8FD9;&#x4E2A;&#x4F8B;&#x5B50;&#x4E2D;&#x5B83;&#x5C06;&#x901A;&#x8FC7; vue/vuex &#x6CE8;&#x5165;&#x5230;&#x7EC4;&#x4EF6;&#x5F53;&#x4E2D;&#x3002;</p></li><li><p>&#x5B9A;&#x4E49;&#x7EC4;&#x4EF6;&#x53EF;&#x4EE5;&#x8C03;&#x7528;&#x7684; actions&#xFF0C;&#x5B83;&#x4EEC;&#x4ECD;&#x7136;&#x662F;&#x96C6;&#x4E2D;&#x5B9A;&#x4E49;&#x7684;&#x3002;</p></li><li><p>&#x5B9A;&#x4E49;&#x5B9E;&#x9645;&#x63A5;&#x89E6;&#x5B58;&#x50A8;&#x72B6;&#x6001;&#x7684; mutations&#x3002;&#x6211;&#x4EEC;&#x8FD9;&#x4E48;&#x505A;&#xFF0C;actions &#x5C31;&#x53EF;&#x4EE5;&#x5F62;&#x6210;&#x4E0D;&#x6B62;&#x4E00;&#x4E2A; mutation&#xFF0C;&#x6216;&#x8005;&#x6267;&#x884C;&#x903B;&#x8F91;&#x53BB;&#x51B3;&#x5B9A;&#x8C03;&#x7528;&#x54EA;&#x4E00;&#x4E2A; mutation&#x3002;&#x8FD9;&#x610F;&#x5473;&#x7740;&#x4F60;&#x518D;&#x4E5F;&#x4E0D;&#x7528;&#x62C5;&#x5FC3;&#x7EC4;&#x4EF6;&#x5F53;&#x4E2D;&#x7684;&#x4E1A;&#x52A1;&#x903B;&#x8F91;&#x4E86;&#xFF0C;&#x6210;&#x529F;&#xFF01;</p></li><li><p>&#x5F53;&#x72B6;&#x6001;&#x66F4;&#x65B0;&#x65F6;&#xFF0C;&#x4EFB;&#x4F55;&#x62E5;&#x6709; getter&#xFF0C;&#x52A8;&#x6001;&#x5C5E;&#x6027;&#x548C;&#x6620;&#x5C04;&#x5230; store &#x7684;&#x7EC4;&#x4EF6;&#x90FD;&#x4F1A;&#x88AB;&#x7ACB;&#x5373;&#x66F4;&#x65B0;&#x3002;</p></li></ol><p>&#x540C;&#x6837;&#x518D;&#x6765;&#x770B;&#x770B;&#x4EE3;&#x7801;&#xFF1A;</p><h5>main.js</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import store from &apos;./vuex/store&apos;

new Vue({ // eslint-disable-line no-new
  el: &apos;#app&apos;,
  render: (h) =&gt; h(App),
  store: store
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./vuex/store&apos;</span>

<span class="hljs-keyword">new</span> Vue({ <span class="hljs-regexp">//</span> eslint-disable-line <span class="hljs-literal">no</span>-<span class="hljs-keyword">new</span>
  el: <span class="hljs-string">&apos;#app&apos;</span>,
  render: <span class="hljs-function"><span class="hljs-params">(h)</span> =&gt;</span> h(App),
  store: store
})</code></pre><p>&#x8FD9;&#x6B21;&#xFF0C;&#x6211;&#x4EEC;&#x7528; Vuex &#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;&#x5B58;&#x50A8;&#x5E76;&#x5C06;&#x5176;&#x76F4;&#x63A5;&#x4F20;&#x5165;&#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x5F53;&#x4E2D;&#xFF0C;&#x66FF;&#x4EE3;&#x6389;&#x4E86;&#x4E4B;&#x524D;<code>index.html</code>&#x4E2D;&#x7684; <code>store</code> &#x5BF9;&#x8C61;&#x3002;&#x5728;&#x7EE7;&#x7EED;&#x4E4B;&#x524D;&#xFF0C;&#x5148;&#x6765;&#x770B;&#x4E00;&#x4E0B;&#x8FD9;&#x4E2A;&#x5B58;&#x50A8;&#xFF1A;</p><h5>store.js</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default new Vuex.Store({

  state: {
    messages: []
  },

  actions: {
    newMessage ({commit}, msg) {
      commit(&apos;NEW_MESSAGE&apos;, msg)
    }
  },

  mutations: {
    NEW_MESSAGE (state, msg) {
      state.messages.push(msg)
    }
  },

  strict: debug

})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code>export <span class="hljs-keyword">default</span> new Vuex.Store({

  <span class="hljs-keyword">state</span>: {
    messages: []
  },

  actions: {
    newMessage ({commit}, msg) {
      commit(&apos;NEW_MESSAGE&apos;, msg)
    }
  },

  mutations: {
    NEW_MESSAGE (<span class="hljs-keyword">state</span>, msg) {
      <span class="hljs-keyword">state</span>.messages.push(msg)
    }
  },

  strict: <span class="hljs-keyword">debug</span>

})</code></pre><p>&#x548C;&#x6211;&#x4EEC;&#x81EA;&#x5DF1;&#x521B;&#x5EFA;&#x7684;&#x5BF9;&#x8C61;&#x975E;&#x5E38;&#x76F8;&#x4F3C;&#xFF0C;&#x4F46;&#x662F;&#x591A;&#x4E86;&#x4E00;&#x4E2A;<code>mutations</code>&#x5BF9;&#x8C61;&#x3002;</p><h5>Client.vue</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;row&quot;&gt;
  &lt;div class=&quot;col&quot;&gt;
    &lt;client clientid=&quot;Client A&quot;&gt;&lt;/client&gt;
  &lt;/div&gt;
  &lt;div class=&quot;col&quot;&gt;
    &lt;client clientid=&quot;Client B&quot;&gt;&lt;/client&gt;
  &lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;row&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;col&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">client</span> <span class="hljs-attr">clientid</span>=<span class="hljs-string">&quot;Client A&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">client</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;col&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">client</span> <span class="hljs-attr">clientid</span>=<span class="hljs-string">&quot;Client B&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">client</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x548C;&#x4E0A;&#x6B21;&#x4E00;&#x6837;&#x7684;&#x914D;&#x65B9;&#x3002;&#xFF08;&#x60CA;&#x4EBA;&#x7684;&#x76F8;&#x4F3C;&#xFF0C;&#x5BF9;&#x5427;&#xFF1F;&#xFF09;</p><h5>Client.vue</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script&gt;
import { mapState, mapActions } from &apos;vuex&apos;

export default {
  data() {
    return {
      msg: &apos;&apos;
    }
  },
  props: [&apos;clientid&apos;],
  computed: {
    ...mapState({
      messages: state =&gt; state.messages
    })
  },
  methods: {
    trySendMessage() {
      this.newMessage({
        text: this.msg,
        sender: this.clientid
      })
      this.resetMessage()
    },
    resetMessage() {
      this.msg = &apos;&apos;
    },
    ...mapActions([&apos;newMessage&apos;])
  }
}
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> { mapState, mapActions } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vuex&apos;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data() {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">msg</span>: <span class="hljs-string">&apos;&apos;</span>
    }
  },
  <span class="hljs-attr">props</span>: [<span class="hljs-string">&apos;clientid&apos;</span>],
  <span class="hljs-attr">computed</span>: {
    ...mapState({
      <span class="hljs-attr">messages</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.messages
    })
  },
  <span class="hljs-attr">methods</span>: {
    trySendMessage() {
      <span class="hljs-keyword">this</span>.newMessage({
        <span class="hljs-attr">text</span>: <span class="hljs-keyword">this</span>.msg,
        <span class="hljs-attr">sender</span>: <span class="hljs-keyword">this</span>.clientid
      })
      <span class="hljs-keyword">this</span>.resetMessage()
    },
    resetMessage() {
      <span class="hljs-keyword">this</span>.msg = <span class="hljs-string">&apos;&apos;</span>
    },
    ...mapActions([<span class="hljs-string">&apos;newMessage&apos;</span>])
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x6A21;&#x677F;&#x4ECD;&#x7136;&#x521A;&#x597D;&#x4E00;&#x6837;&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x751A;&#x81F3;&#x4E0D;&#x9700;&#x8981;&#x8D39;&#x5FC3;&#x600E;&#x4E48;&#x53BB;&#x5F15;&#x5165;&#x5B83;&#x3002;&#x6700;&#x5927;&#x7684;&#x4E0D;&#x540C;&#x5728;&#x4E8E;&#xFF1A;</p><ol><li><p>&#x4F7F;&#x7528;<code>mapState</code>&#x6765;&#x751F;&#x6210;&#x5BF9;&#x5171;&#x4EAB;&#x6D88;&#x606F;&#x96C6;&#x5408;&#x7684;&#x5F15;&#x7528;&#x3002;</p></li><li><p>&#x4F7F;&#x7528;<code>mapActions</code>&#x6765;&#x751F;&#x6210;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x65B0;&#x6D88;&#x606F;&#x7684;&#x52A8;&#x4F5C;&#xFF08;action&#xFF09;&#x3002;</p></li></ol><p>(<strong>&#x6CE8;&#x610F;</strong>&#xFF1A;&#x8FD9;&#x4E9B;&#x90FD;&#x662F; Vuex 2.0&#x7279;&#x6027;&#x3002;)</p><p>&#x597D;&#x7684;&#xFF0C;&#x505A;&#x5B8C;&#x5566;&#xFF01;&#x4E5F;&#x6765;&#x770B;&#x4E00;&#x4E0B;<a href="https://benjaminlistwon.com/demo/dataflow/vuex/index.html" rel="nofollow noreferrer" target="_blank">&#x8FD9;&#x4E2A;&#x6F14;&#x793A;</a>&#x5427;&#x3002;</p><h2 id="articleHeader2">&#x7ED3;&#x8BBA;</h2><p>&#x6240;&#x4EE5;&#xFF0C;&#x6B63;&#x5982;&#x4F60;&#x6240;&#x5E0C;&#x671B;&#x770B;&#x5230;&#x7684;&#xFF0C;&#x81EA;&#x5DF1;&#x8FDB;&#x884C;&#x7B80;&#x5355;&#x7684;&#x72B6;&#x6001;&#x5171;&#x4EAB;&#x548C;&#x4F7F;&#x7528; Vuex &#x8FDB;&#x884C;&#x5171;&#x4EAB;&#x5E76;&#x6CA1;&#x6709;&#x591A;&#x5927;&#x533A;&#x522B;&#x3002;&#x800C; Vuex <strong>&#x6700;&#x5927;&#x7684;</strong>&#x4F18;&#x70B9;&#x5728;&#x4E8E;&#x5B83;&#x4E3A;&#x4F60;&#x5F62;&#x5F0F;&#x5316;&#x4E86;&#x96C6;&#x4E2D;&#x5904;&#x7406;&#x6570;&#x636E;&#x5B58;&#x50A8;&#x7684;&#x8FC7;&#x7A0B;&#xFF0C;&#x5E76;&#x63D0;&#x4F9B;&#x4E86;&#x6240;&#x6709;&#x529F;&#x80FD;&#x65B9;&#x6CD5;&#x53BB;&#x5904;&#x7406;&#x90A3;&#x4E9B;&#x6570;&#x636E;&#x3002;</p><p>&#x6700;&#x521D;&#xFF0C;&#x5F53;&#x4F60;&#x9605;&#x8BFB; Vuex &#x7684;&#x6587;&#x6863;&#x548C;&#x793A;&#x4F8B;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x5B83;&#x90A3;&#x4E9B;&#x9488;&#x5BF9; mutations&#xFF0C;actions &#x548C; modules &#x7684;&#x5355;&#x72EC;&#x6587;&#x6863;&#x5F88;&#x5BB9;&#x6613;&#x8BA9;&#x4EBA;&#x611F;&#x89C9;&#x56F0;&#x6270;&#x3002;&#x4F46;&#x662F;&#x5982;&#x679C;&#x4F60;&#x6562;&#x4E8E;&#x8DE8;&#x51FA;&#x90A3;&#x4E00;&#x6B65;&#xFF0C;&#x7B80;&#x5355;&#x5730;&#x5728;<code>store.js</code>&#x6587;&#x4EF6;&#x91CC;&#x5199;&#x4E00;&#x4E9B;&#x5173;&#x4E8E;&#x5B83;&#x4EEC;&#x7684;&#x4EE3;&#x7801;&#x6765;&#x5F00;&#x59CB;&#x5B66;&#x4E60;&#x3002;&#x968F;&#x7740;&#x8FD9;&#x4E2A;&#x6587;&#x4EF6;&#x7684;&#x5927;&#x5C0F;&#x589E;&#x52A0;&#xFF0C;&#x4F60;&#x5C31;&#x5C06;&#x627E;&#x5230;&#x6B63;&#x786E;&#x7684;&#x65F6;&#x95F4;&#x79FB;&#x6B65;&#x5230;<code>actions.js</code>&#x91CC;&#xFF0C;&#x6216;&#x8005;&#x662F;&#x628A;&#x5B83;&#x4EEC;&#x66F4;&#x8FDB;&#x4E00;&#x6B65;&#x5730;&#x5206;&#x79BB;&#x5F00;&#x6765;&#x3002;</p><p>&#x4E0D;&#x8981;&#x7740;&#x6025;&#xFF0C;&#x6162;&#x6162;&#x6765;&#xFF0C;&#x4E00;&#x6B65;&#x4E00;&#x4E2A;&#x53F0;&#x9636;&#x3002;&#x5F53;&#x7136;&#x4E5F;&#x53EF;&#x4EE5;&#x4F7F;&#x7528;<a href="https://github.com/vuejs/vue-cli" rel="nofollow noreferrer" target="_blank">vue-cli</a>&#x4ECE;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;&#x6A21;&#x677F;&#x5F00;&#x59CB;&#xFF0C;&#x6211;&#x4F7F;&#x7528;<a href="https://github.com/vuejs-templates/browserify" rel="nofollow noreferrer" target="_blank">browserify</a>&#x6A21;&#x677F;&#xFF0C;&#x5E76;&#x628A;&#x4E0B;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x6DFB;&#x52A0;&#x8FDB;&#x6211;&#x7684;<code>package.json</code>&#x6587;&#x4EF6;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;dependencies&quot;: {
    &quot;vue&quot;: &quot;^2.0.0-rc.6&quot;,
    &quot;vuex&quot;: &quot;^2.0.0-rc.5&quot;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code><span class="hljs-string">&quot;dependencies&quot;</span>: {
    <span class="hljs-string">&quot;vue&quot;</span>: <span class="hljs-string">&quot;^2.0.0-rc.6&quot;</span>,
    <span class="hljs-string">&quot;vuex&quot;</span>: <span class="hljs-string">&quot;^2.0.0-rc.5&quot;</span>
}</code></pre><h2 id="articleHeader3">&#x8FD8;&#x5728;&#x770B;&#x5417;&#xFF1F;</h2><p>&#x6211;&#x77E5;&#x9053;&#x6211;&#x8FD8;&#x8BF4;&#x8FC7;&#x8981;&#x518D;&#x8BB2;&#x4E00;&#x4E2A;&#x201C;&#x4E0D;&#x597D;&#x7684;&#x201D;&#x65B9;&#x5F0F;&#x3002;&#x518D;&#x6B21;&#xFF0C;&#x8FD9;&#x4E2A;&#x6F14;&#x793A;&#x6070;&#x597D;&#x4E5F;&#x662F;<a href="https://benjaminlistwon.com/demo/dataflow/evil/index.html" rel="nofollow noreferrer" target="_blank">&#x4E00;&#x6837;</a>&#x7684;&#x3002;&#x4E0D;&#x597D;&#x7684;&#x5730;&#x65B9;&#x5728;&#x4E8E;&#x6211;&#x5229;&#x7528;&#x4E86; Vue 2.0 &#x91CC;&#x5355;&#x5411;&#x7ED1;&#x5B9A;&#x7684;&#x7279;&#x6027;&#x6765;&#x6CE8;&#x5165;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x4ECE;&#x800C;&#x5141;&#x8BB8;&#x4E86;&#x7236;&#x5B50;&#x6A21;&#x677F;&#x4E4B;&#x95F4;&#x987A;&#x5E8F;&#x7684;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;&#x3002;&#x9996;&#x5148;&#xFF0C;&#x6765;&#x770B;&#x4E00;&#x4E0B;<a href="http://rc.vuejs.org/guide/components.html#One-Way-Data-Flow" rel="nofollow noreferrer" target="_blank">2.0&#x6587;&#x6863;&#x4E2D;&#x7684;&#x8FD9;&#x4E2A;&#x90E8;&#x5206;</a>&#xFF0C;&#x7136;&#x540E;&#x518D;&#x6765;&#x770B;&#x770B;&#x6211;&#x8FD9;&#x4E2A;&#x4E0D;&#x597D;&#x7684;&#x65B9;&#x6CD5;&#x3002;</p><h5>App.vue</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;row&quot;&gt;
  &lt;div class=&quot;col&quot;&gt;
    &lt;client clientid=&quot;Client A&quot; :messages=&quot;messages&quot; :callback=&quot;newMessage&quot;&gt;&lt;/client&gt;
  &lt;/div&gt;
  &lt;div class=&quot;col&quot;&gt;
    &lt;client clientid=&quot;Client B&quot; :messages=&quot;messages&quot; :callback=&quot;newMessage&quot;&gt;&lt;/client&gt;
  &lt;/div&gt;
&lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;row&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;col&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">client</span> <span class="hljs-attr">clientid</span>=<span class="hljs-string">&quot;Client A&quot;</span> <span class="hljs-attr">:messages</span>=<span class="hljs-string">&quot;messages&quot;</span> <span class="hljs-attr">:callback</span>=<span class="hljs-string">&quot;newMessage&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">client</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;col&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">client</span> <span class="hljs-attr">clientid</span>=<span class="hljs-string">&quot;Client B&quot;</span> <span class="hljs-attr">:messages</span>=<span class="hljs-string">&quot;messages&quot;</span> <span class="hljs-attr">:callback</span>=<span class="hljs-string">&quot;newMessage&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">client</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><p>&#x8FD9;&#x91CC;&#xFF0C;&#x6211;&#x5728;&#x7EC4;&#x4EF6;&#x4E0A;&#x4F7F;&#x7528;&#x4E86;&#x4E00;&#x4E2A;&#x5C5E;&#x6027;&#x5C06;&#x4E00;&#x4E2A;&#x52A8;&#x6001;&#x7ED1;&#x5B9A;&#x4F20;&#x9012;&#x5230;<code>messages</code>&#x96C6;&#x5408;&#x91CC;&#x3002;<strong>&#x4F46;&#x662F;</strong>&#xFF0C;&#x6211;&#x540C;&#x65F6;&#x8FD8;&#x4F20;&#x9012;&#x4E86;&#x4E00;&#x4E2A;&#x52A8;&#x4F5C;&#x51FD;&#x6570;&#xFF0C;&#x6240;&#x4EE5;&#x53EF;&#x4EE5;&#x5728;&#x5B50;&#x7EC4;&#x4EF6;&#x91CC;&#x8C03;&#x7528;&#x5B83;&#x3002;</p><h5>Client.vue</h5><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script&gt;
export default {
  data() {
    return {
      msg: &apos;&apos;
    }
  },
  props: [&apos;clientid&apos;, &apos;messages&apos;, &apos;callback&apos;],
  methods: {
    trySendMessage() {
      this.callback({
        text: this.msg,
        sender: this.clientid
      })
      this.resetMessage()
    },
    resetMessage() {
      this.msg = &apos;&apos;
    }
  }
}
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>&lt;script&gt;
export <span class="hljs-keyword">default</span> {
  <span class="hljs-keyword">data</span>() {
    <span class="hljs-keyword">return</span> {
      msg: <span class="hljs-string">&apos;&apos;</span>
    }
  },
  props: [<span class="hljs-string">&apos;clientid&apos;</span>, <span class="hljs-string">&apos;messages&apos;</span>, <span class="hljs-string">&apos;callback&apos;</span>],
  methods: {
    trySendMessage() {
      <span class="hljs-keyword">this</span>.callback({
        text: <span class="hljs-keyword">this</span>.msg,
        sender: <span class="hljs-keyword">this</span>.clientid
      })
      <span class="hljs-keyword">this</span>.resetMessage()
    },
    resetMessage() {
      <span class="hljs-keyword">this</span>.msg = <span class="hljs-string">&apos;&apos;</span>
    }
  }
}
&lt;/script&gt;</code></pre><p>&#x8FD9;&#x91CC;&#x5C31;&#x662F;&#x4E0D;&#x597D;&#x7684;&#x505A;&#x6CD5;&#x3002;</p><p>&#x8981;&#x95EE;&#x4E3A;&#x4EC0;&#x4E48;&#x6709;&#x8FD9;&#x4E48;&#x4E0D;&#x597D;&#x5417;&#xFF1F;</p><ol><li><p>&#x6211;&#x4EEC;&#x6B63;&#x5728;&#x7834;&#x574F;&#x4E4B;&#x524D;&#x56FE;&#x4E2D;&#x6240;&#x5C55;&#x793A;&#x7684;&#x5355;&#x5411;&#x5FAA;&#x73AF;&#x3002;</p></li><li><p>&#x6211;&#x4EEC;&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;&#x5728;&#x7EC4;&#x4EF6;&#x53CA;&#x5176;&#x7236;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x7684;&#x7D27;&#x5BC6;&#x8026;&#x5408;&#x3002;</p></li><li><p>&#x8FD9;&#x5C06;&#x53D8;&#x5F97;<strong>&#x4E0D;&#x53EF;</strong>&#x7EF4;&#x62A4;&#x3002;&#x5982;&#x679C;&#x4F60;&#x5728;&#x7EC4;&#x4EF6;&#x91CC;&#x9700;&#x8981;20&#x4E2A;&#x51FD;&#x6570;&#xFF0C;&#x4F60;&#x5C31;&#x5C06;&#x6DFB;&#x52A0;20&#x4E2A;&#x5C5E;&#x6027;&#xFF0C;&#x7BA1;&#x7406;&#x5B83;&#x4EEC;&#x7684;&#x547D;&#x540D;&#x7B49;&#x7B49;&#xFF0C;&#x7136;&#x540E;&#xFF0C;&#x5982;&#x679C;&#x4EFB;&#x4F55;&#x4E1C;&#x897F;&#x53D1;&#x751F;&#x6539;&#x53D8;&#xFF0C;&#x5443;&#xFF01;</p></li></ol><p>&#x6240;&#x4EE5;&#x4E3A;&#x4EC0;&#x4E48;&#x8FD8;&#x8981;&#x518D;&#x5C55;&#x793A;&#x8FD9;&#x6BB5;&#xFF1F;&#x56E0;&#x4E3A;&#x6211;&#x548C;&#x5176;&#x4ED6;&#x4EBA;&#x4E00;&#x6837;&#x5F88;&#x61D2;&#x3002;&#x6709;&#x65F6;&#x6211;&#x5C31;&#x4F1A;&#x505A;&#x8FD9;&#x6837;&#x7684;&#x4E8B;&#x60C5;&#xFF0C;&#x4EC5;&#x4EC5;&#x60F3;&#x77E5;&#x9053;&#x518D;&#x7EE7;&#x7EED;&#x505A;&#x4E0B;&#x53BB;&#x4F1A;&#x6709;&#x591A;&#x4E48;&#x7CDF;&#x7CD5;&#xFF0C;&#x7136;&#x540E;&#x6211;&#x5C31;&#x4F1A;&#x5492;&#x9A82;&#x81EA;&#x5DF1;&#x7684;&#x61D2;&#x60F0;&#xFF0C;&#x56E0;&#x4E3A;&#x6211;&#x53EF;&#x80FD;&#x8981;&#x82B1;&#x4E0A;&#x4E00;&#x5C0F;&#x65F6;&#x6216;&#x8005;&#x4E00;&#x5929;&#x7684;&#x65F6;&#x95F4;&#x53BB;&#x6E05;&#x7406;&#x5B83;&#x4EEC;&#x3002;&#x9274;&#x4E8E;&#x8FD9;&#x79CD;&#x60C5;&#x51B5;&#xFF0C;&#x6211;&#x5E0C;&#x671B;&#x6211;&#x53EF;&#x4EE5;&#x5E2E;&#x52A9;&#x4F60;&#x5C3D;&#x65E9;&#x907F;&#x514D;&#x65E0;&#x8C13;&#x7684;&#x51B3;&#x5B9A;&#x548C;&#x9519;&#x8BEF;&#xFF0C;<strong>&#x5343;&#x4E07;&#x4E0D;&#x8981;</strong>&#x4F20;&#x9012;&#x4EFB;&#x4F55;&#x4F60;&#x4E0D;&#x9700;&#x8981;&#x7684;&#x4E1C;&#x897F;&#x3002;99%&#x7684;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x4E00;&#x4E2A;&#x5355;&#x72EC;&#x7684;&#x5171;&#x4EAB;&#x72B6;&#x6001;&#x5DF2;&#x7ECF;&#x8DB3;&#x591F;&#x5B8C;&#x7F8E;&#x3002;&#xFF08;&#x4E0D;&#x4E45;&#x518D;&#x8BE6;&#x7EC6;&#x8BB2;&#x8BB2;&#x90A3;1%&#x7684;&#x60C5;&#x51B5;&#xFF09;</p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译] VUE 和 VUEX 中的数据流

## 原文链接
[https://segmentfault.com/a/1190000007168699](https://segmentfault.com/a/1190000007168699)

