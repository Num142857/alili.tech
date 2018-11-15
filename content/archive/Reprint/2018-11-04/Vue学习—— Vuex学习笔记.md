---
title: Vue学习—— Vuex学习笔记
reprint: true
categories: reprint
abbrlink: d70f710e
date: 2018-11-04 02:30:10
---

{{% raw %}}
<p>&#x7EC4;&#x4EF6;&#x662F;Vue&#x6700;&#x5F3A;&#x5927;&#x7684;&#x529F;&#x80FD;&#x4E4B;&#x4E00;&#xFF0C;&#x800C;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#x7684;&#x4F5C;&#x7528;&#x57DF;&#x662F;&#x76F8;&#x4E92;&#x72EC;&#x7ACB;&#x7684;&#xFF0C;&#x610F;&#x5473;&#x7740;&#x4E0D;&#x540C;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x7684;&#x6570;&#x636E;&#x662F;&#x65E0;&#x6CD5;&#x76F8;&#x4E92;&#x4F7F;&#x7528;&#x3002;&#x7EC4;&#x4EF6;&#x95F4;&#x5982;&#x4F55;&#x4F20;&#x9012;&#x6570;&#x636E;&#x5C31;&#x663E;&#x5F97;&#x81F3;&#x5173;&#x91CD;&#x8981;&#xFF0C;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#x4E3B;&#x8981;&#x662F;&#x4ECB;&#x7ECD;Vuex&#x3002;&#x5C3D;&#x91CF;&#x4EE5;&#x901A;&#x4FD7;&#x6613;&#x61C2;&#x7684;&#x5B9E;&#x4F8B;&#x8BB2;&#x8FF0;&#x8FD9;&#x5176;&#x4E2D;&#x7684;&#x5DEE;&#x522B;&#xFF0C;&#x5E0C;&#x671B;&#x5BF9;&#x5C0F;&#x4F19;&#x4F34;&#x6709;&#x4E9B;&#x8BB8;&#x5E2E;&#x52A9;&#x3002;</p><h2 id="articleHeader0">&#x4E00;&#x3001;Vuex &#x662F;&#x4EC0;&#x4E48;&#xFF1F;</h2><p>Vuex &#x662F;&#x4E00;&#x4E2A;&#x4E13;&#x4E3A; Vue.js &#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x5F00;&#x53D1;&#x7684;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x6A21;&#x5F0F;&#x3002;&#x5B83;&#x91C7;&#x7528;&#x96C6;&#x4E2D;&#x5F0F;&#x5B58;&#x50A8;&#x7BA1;&#x7406;&#x5E94;&#x7528;&#x7684;&#x6240;&#x6709;&#x7EC4;&#x4EF6;&#x7684;&#x72B6;&#x6001;&#xFF0C;&#x5E76;&#x4EE5;&#x76F8;&#x5E94;&#x7684;&#x89C4;&#x5219;&#x4FDD;&#x8BC1;&#x72B6;&#x6001;&#x4EE5;&#x4E00;&#x79CD;&#x53EF;&#x9884;&#x6D4B;&#x7684;&#x65B9;&#x5F0F;&#x53D1;&#x751F;&#x53D8;&#x5316;&#x3002;</p><h2 id="articleHeader1">&#x4E8C;&#x3001;&#x4EC0;&#x4E48;&#x662F;&#x201C;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x6A21;&#x5F0F;&#x201D;&#xFF1F;</h2><p>&#x4E00;&#x4E2A;&#x7B80;&#x5355;&#x7684; Vue &#x8BA1;&#x6570;&#x5E94;&#x7528;&#x5F00;&#x59CB;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
  // state
  data () {
    return {
      count: 0
    }
  },
  // view
  template: `
    &lt;div&gt;{{ count }}&lt;/div&gt;
  `,
  // actions
  methods: {
    increment () {
      this.count++
    }
  }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs axapta"><code><span class="hljs-keyword">new</span> Vue({
  <span class="hljs-comment">// state</span>
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-keyword">count</span>: <span class="hljs-number">0</span>
    }
  },
  <span class="hljs-comment">// view</span>
  template: `
    &lt;<span class="hljs-keyword">div</span>&gt;{{ <span class="hljs-keyword">count</span> }}&lt;/<span class="hljs-keyword">div</span>&gt;
  `,
  <span class="hljs-comment">// actions</span>
  methods: {
    increment () {
      <span class="hljs-keyword">this</span>.<span class="hljs-keyword">count</span>++
    }
  }
})</code></pre><p>&#x8FD9;&#x4E2A;&#x72B6;&#x6001;&#x81EA;&#x7BA1;&#x7406;&#x5E94;&#x7528;&#x5305;&#x542B;&#x4EE5;&#x4E0B;&#x51E0;&#x4E2A;&#x90E8;&#x5206;&#xFF1A;</p><p><strong>state</strong>&#xFF0C;&#x9A71;&#x52A8;&#x5E94;&#x7528;&#x7684;&#x6570;&#x636E;&#x6E90;&#xFF1B;<br><strong>view</strong>&#xFF0C;&#x4EE5;&#x58F0;&#x660E;&#x65B9;&#x5F0F;&#x5C06; state &#x6620;&#x5C04;&#x5230;&#x89C6;&#x56FE;&#xFF1B;<br><strong>actions</strong>&#xFF0C;&#x54CD;&#x5E94;&#x5728; view &#x4E0A;&#x7684;&#x7528;&#x6237;&#x8F93;&#x5165;&#x5BFC;&#x81F4;&#x7684;&#x72B6;&#x6001;&#x53D8;&#x5316;&#x3002;<br><span class="img-wrap"><img data-src="/img/bVbh7hP?w=800&amp;h=541" src="https://static.alili.tech/img/bVbh7hP?w=800&amp;h=541" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><p><strong>state</strong>&#x7684;&#x6570;&#x636E;&#x4F1A;&#x5728; <strong>view</strong>&#x4E0A;&#x663E;&#x793A;&#x51FA;&#x6765;&#xFF0C;&#x7528;&#x6237;&#x4F1A;&#x6839;&#x636E; <strong>view</strong> &#x4E0A;&#x7684;&#x5185;&#x5BB9;&#x8FDB;&#x884C;&#x64CD;&#x4F5C;&#xFF0C;&#x4ECE;&#x800C;&#x89E6;&#x53D1; <strong>actions</strong>&#xFF0C;&#x63A5;&#x7740;&#x518D;&#x53BB;&#x5F71;&#x54CD; <strong>state</strong>&#xFF08;vue &#x662F;&#x5355;&#x5411;&#x6570;&#x636E;&#x6D41;&#x7684;&#x65B9;&#x5F0F;&#x9A71;&#x52A8;&#x7684;&#xFF09;&#x3002;</p><p>&#x5F53;&#x6211;&#x4EEC;&#x7684;&#x5E94;&#x7528;&#x9047;&#x5230;&#x591A;&#x4E2A;&#x7EC4;&#x4EF6;&#x5171;&#x4EAB;&#x72B6;&#x6001;&#x65F6;&#xFF0C;&#x5355;&#x5411;&#x6570;&#x636E;&#x6D41;&#x7684;&#x7B80;&#x6D01;&#x6027;&#x5F88;&#x5BB9;&#x6613;&#x88AB;&#x7834;&#x574F;&#x3002;&#x4E0B;&#x9762;&#x7684;&#x56FE;&#xFF0C;&#x662F;&#x628A;&#x7EC4;&#x4EF6;&#x7684;&#x5171;&#x4EAB;&#x72B6;&#x6001;&#x62BD;&#x53D6;&#x51FA;&#x6765;&#xFF0C;&#x4EE5;&#x4E00;&#x4E2A;&#x5168;&#x5C40;&#x5355;&#x4F8B;&#x6A21;&#x5F0F;&#x7BA1;&#x7406;&#x3002;<br><span class="img-wrap"><img data-src="/img/bVbfUnd?w=701&amp;h=551" src="https://static.alili.tech/img/bVbfUnd?w=701&amp;h=551" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader2">&#x4E09;&#x3001;&#x6838;&#x5FC3;&#x6982;&#x5FF5;</h2><p><strong>1. state</strong><br>state&#xFF1A;&#x9875;&#x9762;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x5BB9;&#x5668;&#x5BF9;&#x8C61;&#x3002;&#x96C6;&#x4E2D;&#x5B58;&#x50A8;Vue components&#x4E2D;data&#x5BF9;&#x8C61;&#x7684;&#x96F6;&#x6563;&#x6570;&#x636E;&#xFF0C;&#x4EE5;&#x8FDB;&#x884C;&#x7EDF;&#x4E00;&#x7684;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x3002;&#x9875;&#x9762;&#x663E;&#x793A;&#x6240;&#x9700;&#x7684;&#x6570;&#x636E;&#x4ECE;&#x8BE5;&#x5BF9;&#x8C61;&#x4E2D;&#x8FDB;&#x884C;&#x8BFB;&#x53D6;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &lt;div&gt;
    {{ $store.state.count }}
  &lt;/div&gt;
   console.log(this.$store.state.count)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code>  <span class="hljs-variable">&lt;div&gt;</span>
    {{ <span class="hljs-variable">$store</span>.<span class="hljs-keyword">state</span>.count }}
  &lt;/div&gt;
   console.<span class="hljs-keyword">log</span>(this.<span class="hljs-variable">$store</span>.<span class="hljs-keyword">state</span>.count)</code></pre><p><strong>2. getters</strong><br>getters&#xFF1A;Vuex &#x5141;&#x8BB8;&#x6211;&#x4EEC;&#x5728; store &#x4E2D;&#x5B9A;&#x4E49;&#x201C;getter&#x201D;&#xFF08;&#x53EF;&#x4EE5;&#x8BA4;&#x4E3A;&#x662F; store &#x7684;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#xFF09;&#x3002;&#x5C31;&#x50CF;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x4E00;&#x6837;&#xFF0C;getter &#x7684;&#x8FD4;&#x56DE;&#x503C;&#x4F1A;&#x6839;&#x636E;&#x5B83;&#x7684;&#x4F9D;&#x8D56;&#x88AB;&#x7F13;&#x5B58;&#x8D77;&#x6765;&#xFF0C;&#x4E14;&#x53EA;&#x6709;&#x5F53;&#x5B83;&#x7684;&#x4F9D;&#x8D56;&#x503C;&#x53D1;&#x751F;&#x4E86;&#x6539;&#x53D8;&#x624D;&#x4F1A;&#x88AB;&#x91CD;&#x65B0;&#x8BA1;&#x7B97;&#x3002;&#xFF08;getters&#x4ECE;&#x8868;&#x9762;&#x662F;&#x83B7;&#x5F97;&#x7684;&#x610F;&#x601D;&#xFF0C;&#x53EF;&#x4EE5;&#x628A;&#x4ED6;&#x770B;&#x4F5C;&#x5728;&#x83B7;&#x53D6;&#x6570;&#x636E;&#x4E4B;&#x524D;&#x8FDB;&#x884C;&#x7684;&#x4E00;&#x79CD;&#x518D;&#x7F16;&#x8F91;,&#x76F8;&#x5F53;&#x4E8E;&#x5BF9;&#x6570;&#x636E;&#x7684;&#x4E00;&#x4E2A;&#x8FC7;&#x6EE4;&#x548C;&#x52A0;&#x5DE5;&#x3002;getters&#x5C31;&#x50CF;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x4E00;&#x6837;&#xFF0C;getter &#x7684;&#x8FD4;&#x56DE;&#x503C;&#x4F1A;&#x6839;&#x636E;&#x5B83;&#x7684;&#x4F9D;&#x8D56;&#x88AB;&#x7F13;&#x5B58;&#x8D77;&#x6765;&#xFF0C;&#x4E14;&#x53EA;&#x6709;&#x5F53;&#x5B83;&#x7684;&#x4F9D;&#x8D56;&#x503C;&#x53D1;&#x751F;&#x4E86;&#x6539;&#x53D8;&#x624D;&#x4F1A;&#x88AB;&#x91CD;&#x65B0;&#x8BA1;&#x7B97;&#x3002;&#xFF09;</p><p>&#x5B9A;&#x4E49;getter&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  getters: {
    done(state) {    
      return state.count + 1;
    },
  }
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code>  getters: {
    done(<span class="hljs-keyword">state</span>) {    
      return <span class="hljs-keyword">state</span>.count + <span class="hljs-number">1</span>;
    },
  }
</code></pre><p><strong>3. mutations</strong><br>mutations&#xFF1A;&#x66F4;&#x6539; Vuex &#x7684; store &#x4E2D;&#x7684;&#x72B6;&#x6001;&#x7684;&#x552F;&#x4E00;&#x65B9;&#x6CD5;&#x662F;&#x63D0;&#x4EA4; mutation&#x3002;Vuex &#x4E2D;&#x7684; mutation &#x975E;&#x5E38;&#x7C7B;&#x4F3C;&#x4E8E;&#x4E8B;&#x4EF6;&#xFF1A;&#x6BCF;&#x4E2A; mutation &#x90FD;&#x6709;&#x4E00;&#x4E2A;&#x5B57;&#x7B26;&#x4E32;&#x7684; &#x4E8B;&#x4EF6;&#x7C7B;&#x578B; (type) &#x548C; &#x4E00;&#x4E2A; &#x56DE;&#x8C03;&#x51FD;&#x6570; (handler)&#x3002;&#x8FD9;&#x4E2A;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x5B9E;&#x9645;&#x8FDB;&#x884C;&#x72B6;&#x6001;&#x66F4;&#x6539;&#x7684;&#x5730;&#x65B9;&#xFF0C;&#x5E76;&#x4E14;&#x5B83;&#x4F1A;&#x63A5;&#x53D7; state &#x4F5C;&#x4E3A;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // &#x53D8;&#x66F4;&#x72B6;&#x6001;
      state.count++
    }
  }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code>const store = new Vuex.Store({
  <span class="hljs-keyword">state</span>: {
    count: <span class="hljs-number">1</span>
  },
  mutations: {
    increment (<span class="hljs-keyword">state</span>) {
      // &#x53D8;&#x66F4;&#x72B6;&#x6001;
      <span class="hljs-keyword">state</span>.count++
    }
  }
})</code></pre><p>&#x7EC4;&#x4EF6;&#x901A;&#x8FC7;<strong>commit</strong>&#x63D0;&#x4EA4;mutations&#x7684;&#x65B9;&#x5F0F;&#x6765;&#x8BF7;&#x6C42;&#x6539;&#x53D8;state</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$store.commit(&apos;increment&apos;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code style="word-break:break-word;white-space:initial"><span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">&apos;increment&apos;</span>)</code></pre><p><strong>&#x63D0;&#x4EA4;&#x8F7D;&#x8377;&#xFF08;Payload&#xFF09;</strong><br>mutations&#x65B9;&#x6CD5;&#x4E2D;&#x662F;&#x53EF;&#x4EE5;&#x4F20;&#x53C2;&#x7684;&#xFF0C;&#x5177;&#x4F53;&#x7528;&#x6CD5;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  mutations: {
    // &#x63D0;&#x4EA4;&#x8F7D;&#x8377; Payload
    add(state, n) {
      state.count += n
    }
  },
this.$store.commit(&apos;add&apos;, 10)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code>  mutations: {
    // &#x63D0;&#x4EA4;&#x8F7D;&#x8377; Payload
    add(<span class="hljs-keyword">state</span>, n) {
      <span class="hljs-keyword">state</span>.count += n
    }
  },
this.<span class="hljs-variable">$store</span>.commit(&apos;add&apos;, <span class="hljs-number">10</span>)</code></pre><p><strong>4.Action</strong><br>Action&#xFF1A;&#x7C7B;&#x4F3C;&#x4E8E; mutation&#xFF0C;&#x4E0D;&#x540C;&#x5728;&#x4E8E;Action &#x63D0;&#x4EA4;&#x7684;&#x662F; mutation&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x76F4;&#x63A5;&#x53D8;&#x66F4;&#x72B6;&#x6001;&#xFF1B;Action &#x53EF;&#x4EE5;&#x5305;&#x542B;&#x4EFB;&#x610F;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      context.commit(&apos;increment&apos;)
    }
  }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code>const store = new Vuex.Store({
  <span class="hljs-keyword">state</span>: {
    count: <span class="hljs-number">0</span>
  },
  mutations: {
    increment (<span class="hljs-keyword">state</span>) {
      <span class="hljs-keyword">state</span>.count++
    }
  },
  actions: {
    increment (context) {
      context.commit(&apos;increment&apos;)
    }
  }
})</code></pre><p>&#x4E0D;&#x540C;&#x4E8E;mutations&#x4F7F;&#x7528;commit&#x65B9;&#x6CD5;&#xFF0C;actions&#x4F7F;&#x7528;<strong>dispatch</strong>&#x65B9;&#x6CD5;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$store.dispatch(&apos;incrementAsync&apos;)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code style="word-break:break-word;white-space:initial"><span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">&apos;incrementAsync&apos;</span>)</code></pre><p><strong>context</strong><br>context&#x662F;&#x4E0E; store &#x5B9E;&#x4F8B;&#x5177;&#x6709;&#x76F8;&#x540C;&#x65B9;&#x6CD5;&#x548C;&#x5C5E;&#x6027;&#x7684;&#x5BF9;&#x8C61;&#x3002;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;context.state&#x548C;context.getters&#x6765;&#x83B7;&#x53D6; state &#x548C; getters&#x3002;<br><strong>&#x4EE5;&#x8F7D;&#x8377;&#x5F62;&#x5F0F;&#x5206;&#x53D1;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="incrementAsyncWithValue (context, value) {
  setTimeout(() =&gt; {
    context.commit(&apos;add&apos;, value)
  }, 1000)
}
this.$store.dispatch(&apos;incrementAsyncWithValue&apos;, 5)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code>incrementAsyncWithValue (context, value) {
  setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    context.commit(<span class="hljs-string">&apos;add&apos;</span>, value)
  }, <span class="hljs-number">1000</span>)
}
<span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">&apos;incrementAsyncWithValue&apos;</span>, <span class="hljs-number">5</span>)</code></pre><p><strong>5.Module</strong><br>&#x7531;&#x4E8E;&#x4F7F;&#x7528;&#x5355;&#x4E00;&#x72B6;&#x6001;&#x6811;&#xFF0C;&#x5E94;&#x7528;&#x7684;&#x6240;&#x6709;&#x72B6;&#x6001;&#x4F1A;&#x96C6;&#x4E2D;&#x5230;&#x4E00;&#x4E2A;&#x6BD4;&#x8F83;&#x5927;&#x7684;&#x5BF9;&#x8C61;&#x3002;&#x5F53;&#x5E94;&#x7528;&#x53D8;&#x5F97;&#x975E;&#x5E38;&#x590D;&#x6742;&#x65F6;&#xFF0C;store &#x5BF9;&#x8C61;&#x5C31;&#x6709;&#x53EF;&#x80FD;&#x53D8;&#x5F97;&#x76F8;&#x5F53;&#x81C3;&#x80BF;&#x3002;</p><p>&#x4E3A;&#x4E86;&#x89E3;&#x51B3;&#x4EE5;&#x4E0A;&#x95EE;&#x9898;&#xFF0C;Vuex &#x5141;&#x8BB8;&#x6211;&#x4EEC;&#x5C06; store &#x5206;&#x5272;&#x6210;&#x6A21;&#x5757;&#xFF08;module&#xFF09;&#x3002;&#x6BCF;&#x4E2A;&#x6A21;&#x5757;&#x62E5;&#x6709;&#x81EA;&#x5DF1;&#x7684; state&#x3001;mutation&#x3001;action&#x3001;getter&#x3001;&#x751A;&#x81F3;&#x662F;&#x5D4C;&#x5957;&#x5B50;&#x6A21;&#x5757;&#x2014;&#x2014;&#x4ECE;&#x4E0A;&#x81F3;&#x4E0B;&#x8FDB;&#x884C;&#x540C;&#x6837;&#x65B9;&#x5F0F;&#x7684;&#x5206;&#x5272;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -&gt; moduleA &#x7684;&#x72B6;&#x6001;
store.state.b // -&gt; moduleB &#x7684;&#x72B6;&#x6001;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code>const moduleA = {
  <span class="hljs-keyword">state</span>: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  <span class="hljs-keyword">state</span>: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.<span class="hljs-keyword">state</span>.a // -&gt; moduleA &#x7684;&#x72B6;&#x6001;
store.<span class="hljs-keyword">state</span>.b // -&gt; moduleB &#x7684;&#x72B6;&#x6001;</code></pre><p><strong>&#x6A21;&#x5757;&#x7684;&#x5C40;&#x90E8;&#x72B6;&#x6001;</strong><br>&#x5BF9;&#x4E8E;&#x6A21;&#x5757;&#x5185;&#x90E8;&#x7684; mutation &#x548C; getter&#xFF0C;&#x63A5;&#x6536;&#x7684;&#x7B2C;&#x4E00;&#x4E2A;&#x53C2;&#x6570;&#x662F;&#x6A21;&#x5757;&#x7684;&#x5C40;&#x90E8;&#x72B6;&#x6001;&#x5BF9;&#x8C61;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const moduleA = {
  state: { count: 0 },
  mutations: {
    increment (state) {
      // &#x8FD9;&#x91CC;&#x7684; `state` &#x5BF9;&#x8C61;&#x662F;&#x6A21;&#x5757;&#x7684;&#x5C40;&#x90E8;&#x72B6;&#x6001;
      state.count++
    }
  },    
  getters: {
    doubleCount (state) {
      return state.count * 2
    }
  }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code>const moduleA = {
  <span class="hljs-keyword">state</span>: { count: <span class="hljs-number">0</span> },
  mutations: {
    increment (<span class="hljs-keyword">state</span>) {
      // &#x8FD9;&#x91CC;&#x7684; `<span class="hljs-keyword">state</span>` &#x5BF9;&#x8C61;&#x662F;&#x6A21;&#x5757;&#x7684;&#x5C40;&#x90E8;&#x72B6;&#x6001;
      <span class="hljs-keyword">state</span>.count++
    }
  },    
  getters: {
    doubleCount (<span class="hljs-keyword">state</span>) {
      return <span class="hljs-keyword">state</span>.count * <span class="hljs-number">2</span>
    }
  }
}</code></pre><h2 id="articleHeader3">Vuex&#x8BA1;&#x6570;&#x5668;&#x7684;&#x4F8B;&#x5B50;&#xFF1A;</h2><p>&#x5728;src&#x76EE;&#x5F55;&#x4E0B;&#x521B;&#x5EFA;&#x4E00;&#x4E2A;store&#x6587;&#x4EF6;&#x5939;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="store/store.js

import Vue from &apos;vue&apos;
import Vuex from &apos;vuex&apos;

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0,
    show: &apos;&apos;
  },
  getters: {
    counts: (state) =&gt; {
      return state.count
    }
  },
  mutations: {
    increment: (state) =&gt; {
      state.count++
    },
    decrement: (state) =&gt; {
      state.count--
    },
    changVal: (state, v) =&gt; {
      state.show = v
    }
  }
})
export default store" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code>store/store.js

import Vue <span class="hljs-keyword">from</span> &apos;vue&apos;
import Vuex <span class="hljs-keyword">from</span> &apos;vuex&apos;

Vue.use(Vuex)

const store = new Vuex.Store({
  <span class="hljs-keyword">state</span>: {
    count: <span class="hljs-number">0</span>,
    show: &apos;&apos;
  },
  getters: {
    counts: (<span class="hljs-keyword">state</span>) =&gt; {
      return <span class="hljs-keyword">state</span>.count
    }
  },
  mutations: {
    increment: (<span class="hljs-keyword">state</span>) =&gt; {
      <span class="hljs-keyword">state</span>.count++
    },
    decrement: (<span class="hljs-keyword">state</span>) =&gt; {
      <span class="hljs-keyword">state</span>.count--
    },
    changVal: (<span class="hljs-keyword">state</span>, v) =&gt; {
      <span class="hljs-keyword">state</span>.show = v
    }
  }
})
export <span class="hljs-keyword">default</span> store</code></pre><p>state&#x5C31;&#x662F;&#x6211;&#x4EEC;&#x7684;&#x9700;&#x8981;&#x7684;&#x72B6;&#x6001;&#xFF0C;&#x72B6;&#x6001;&#x7684;&#x6539;&#x53D8;&#x53EA;&#x80FD;&#x901A;&#x8FC7;&#x63D0;&#x4EA4;mutations,&#x4F8B;&#x5982;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="increase() {
      this.$store.commit(&apos;increment&apos;)
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">increase</span><span class="hljs-params">()</span></span> {
      this.<span class="hljs-variable">$store</span>.commit(<span class="hljs-string">&apos;increment&apos;</span>)
    }</code></pre><p>&#x5E26;&#x6709;&#x8F7D;&#x8377;&#x7684;&#x63D0;&#x4EA4;&#x65B9;&#x5F0F;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="changObj () {
      this.$store.commit(&apos;changVal&apos;, this.obj)
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>changObj () {
      <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">&apos;changVal&apos;</span>, <span class="hljs-keyword">this</span>.obj)
    }</code></pre><p>&#x8F7D;&#x8377;&#x4E5F;&#x53EF;&#x4EE5;&#x662F;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF0C;&#x8FD9;&#x6837;&#x53EF;&#x4EE5;&#x63D0;&#x4EA4;&#x591A;&#x4E2A;&#x53C2;&#x6570;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="changObj () {
      this.$store.commit(&apos;changVal&apos;, {
          key:&apos;&apos;
      })
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code>changObj () {
      this.$store.commit(<span class="hljs-string">&apos;changVal&apos;</span>, {
          key:<span class="hljs-string">&apos;&apos;</span>
      })
    }</code></pre><p>&#x5728;main.js&#x4E2D;&#x5F15;&#x5165;store.js</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import store from &apos;./store/store&apos;
export default new Vue({
  el: &apos;#app&apos;,
  router,
  store,
  components: {
    App
  },
  template: &apos;&lt;App/&gt;&apos;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs arduino"><code><span class="hljs-keyword">import</span> store from <span class="hljs-string">&apos;./store/store&apos;</span>
<span class="hljs-keyword">export</span> <span class="hljs-built_in">default</span> <span class="hljs-keyword">new</span> Vue({
  el: <span class="hljs-string">&apos;#app&apos;</span>,
  router,
  store,
  components: {
    App
  },
  <span class="hljs-keyword">template</span>: <span class="hljs-string">&apos;&lt;App/&gt;&apos;</span>
})</code></pre><p>&#x5728;&#x7EC4;&#x4EF6;&#x4E2D;&#x4F7F;&#x7528;<br>&#x5728;&#x7EC4;&#x5EFA;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;$store.state.count&#x83B7;&#x5F97;&#x72B6;&#x6001;<br>&#x66F4;&#x6539;&#x72B6;&#x6001;&#x53EA;&#x80FD;&#x4EE5;&#x63D0;&#x4EA4;mutation&#x7684;&#x65B9;&#x5F0F;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;div class=&quot;store&quot;&gt;
  &lt;p&gt;
    {{$store.state.count}}
  &lt;/p&gt;
  &lt;button @click=&quot;increase&quot;&gt;&lt;strong&gt;+&lt;/strong&gt;&lt;/button&gt;
  &lt;button @click=&quot;decrease&quot;&gt;&lt;strong&gt;-&lt;/strong&gt;&lt;/button&gt;
  &lt;hr&gt;
  &lt;h3&gt;{{$store.state.show}}&lt;/h3&gt;
  &lt;input
    placeholder=&quot;&#x8BF7;&#x8F93;&#x5165;&#x5185;&#x5BB9;&quot;
    v-model=&quot;obj&quot;
    @change=&quot;changObj&quot;
    clearable&gt;
  &lt;/input&gt;
&lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
export default {
  data () {
    return {
      obj: &apos;&apos;
    }
  },
  methods: {
    increase() {
      this.$store.commit(&apos;increment&apos;)
    },
    decrease() {
      this.$store.commit(&apos;decrement&apos;)
    },
    changObj () {
      this.$store.commit(&apos;changVal&apos;, this.obj)
    }
  }
}
&lt;/script&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;store&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
    </span><span class="hljs-template-variable">{{$store.state.count}}</span><span class="xml">
  <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;increase&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>+<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;decrease&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">strong</span>&gt;</span>-<span class="hljs-tag">&lt;/<span class="hljs-name">strong</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">hr</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span></span><span class="hljs-template-variable">{{$store.state.show}}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span>
    <span class="hljs-attr">placeholder</span>=<span class="hljs-string">&quot;&#x8BF7;&#x8F93;&#x5165;&#x5185;&#x5BB9;&quot;</span>
    <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;obj&quot;</span>
    @<span class="hljs-attr">change</span>=<span class="hljs-string">&quot;changObj&quot;</span>
    <span class="hljs-attr">clearable</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">input</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  data () {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">obj</span>: <span class="hljs-string">&apos;&apos;</span>
    }
  },
  <span class="hljs-attr">methods</span>: {
    increase() {
      <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">&apos;increment&apos;</span>)
    },
    decrease() {
      <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">&apos;decrement&apos;</span>)
    },
    changObj () {
      <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">&apos;changVal&apos;</span>, <span class="hljs-keyword">this</span>.obj)
    }
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre><p><a href="https://vuex.vuejs.org/zh/installation.html" rel="nofollow noreferrer" target="_blank">Vuex&#x5B98;&#x65B9;&#x6587;&#x6863;</a></p><p><a href="https://segmentfault.com/a/1190000016344599">Vue&#x9762;&#x8BD5;&#x4E2D;&#xFF0C;&#x7ECF;&#x5E38;&#x4F1A;&#x88AB;&#x95EE;&#x5230;&#x7684;&#x9762;&#x8BD5;&#x9898;</a></p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue学习—— Vuex学习笔记

## 原文链接
[https://segmentfault.com/a/1190000016679466](https://segmentfault.com/a/1190000016679466)

