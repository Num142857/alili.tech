---
title: Vue组件通信深入Vuex
hidden: true
categories: reprint
slug: 9b908a87
date: 2018-10-31 02:30:10
---

{{< raw >}}
<p><strong>&#x5EFA;&#x8BAE;&#xFF1A;&#x535A;&#x5BA2;&#x4E2D;&#x7684;&#x4F8B;&#x5B50;&#x90FD;&#x653E;&#x5728;<a href="https://github.com/lxyc/vue_blog_project" rel="nofollow noreferrer" target="_blank">vue_blog_project</a>&#x5DE5;&#x7A0B;&#x4E2D;&#xFF0C;&#x63A8;&#x8350;&#x7ED3;&#x5408;&#x5DE5;&#x7A0B;&#x5B9E;&#x4F8B;&#x4E0E;&#x535A;&#x5BA2;&#x4E00;&#x540C;&#x5B66;&#x4E60;</strong></p><p>&#x4E0A;&#x4E00;&#x7BC7;&#x535A;&#x5BA2;&#xFF08;<a href="https://segmentfault.com/a/1190000014775073">Vue&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;&#x6DF1;&#x5165;</a>&#xFF09;&#x4E2D;&#xFF0C;&#x4ECB;&#x7ECD;&#x4E86;&#x591A;&#x79CD;&#x65B9;&#x6CD5;&#x6765;&#x5B9E;&#x73B0;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x7684;&#x901A;&#x4FE1;&#xFF0C;&#x4F46;&#x662F;&#x6D89;&#x53CA;&#x5230;&#x6DF1;&#x5C42;&#x5D4C;&#x5957;&#x548C;&#x975E;&#x76F4;&#x63A5;&#x5173;&#x8054;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x7684;&#x901A;&#x4FE1;&#x65F6;&#xFF0C;&#x90FD;&#x4F1A;&#x9047;&#x5230;<strong>&#x65E0;&#x6CD5;&#x8FFD;&#x8E2A;&#x6570;&#x636E;&#x548C;&#x8C03;&#x8BD5;&#x7684;&#x95EE;&#x9898;</strong>&#xFF0C;&#x800C;vuex&#x5C31;&#x662F;&#x4E3A;&#x89E3;&#x51B3;&#x6B64;&#x7C7B;&#x95EE;&#x9898;&#x800C;&#x751F;&#x7684;&#x3002;</p><p>&#x8FD9;&#x7BC7;&#x535A;&#x5BA2;&#x5C06;&#x7B80;&#x8981;&#x7684;&#x4ECB;&#x7ECD;vuex&#x7684;&#x57FA;&#x672C;&#x7528;&#x6CD5;&#x548C;&#x6700;&#x4F73;&#x5B9E;&#x8DF5;&#xFF0C;&#x7136;&#x540E;&#x5B8C;&#x6210;&#x4E0B;&#x9762;&#x7684;demo</p><p><span class="img-wrap"><img data-src="/img/bVbafK0?w=787&amp;h=484" src="https://static.alili.tech/img/bVbafK0?w=787&amp;h=484" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader0">1. Vuex &#x7B80;&#x4ECB;</h2><p>&#x58F0;&#x660E;&#xFF1A;&#x5728;&#x6B64;&#x4EC5;&#x4ECB;&#x7ECD;Vuex&#x7CBE;&#x534E;&#x77E5;&#x8BC6;&#xFF0C;&#x66F4;&#x8BE6;&#x5C3D;&#x7684;&#x77E5;&#x8BC6;&#x8BF7;&#x53C2;&#x8003;<a href="https://vuex.vuejs.org/zh-cn/intro.html" rel="nofollow noreferrer" target="_blank">Vuex&#x4E2D;&#x6587;&#x5B98;&#x7F51;</a></p><h3 id="articleHeader1">1.1 &#x521D;&#x8BC6;Vuex</h3><blockquote>Vuex &#x662F;&#x4E00;&#x4E2A;&#x4E13;&#x4E3A; Vue.js &#x5E94;&#x7528;&#x7A0B;&#x5E8F;&#x5F00;&#x53D1;&#x7684;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#x6A21;&#x5F0F;&#x3002;&#x5B83;&#x91C7;&#x7528;&#x96C6;&#x4E2D;&#x5F0F;&#x5B58;&#x50A8;&#x7BA1;&#x7406;&#x5E94;&#x7528;&#x7684;&#x6240;&#x6709;&#x7EC4;&#x4EF6;&#x7684;&#x72B6;&#x6001;&#xFF0C;&#x5E76;&#x4EE5;&#x76F8;&#x5E94;&#x7684;&#x89C4;&#x5219;&#x4FDD;&#x8BC1;&#x72B6;&#x6001;&#x4EE5;&#x4E00;&#x79CD;&#x53EF;&#x9884;&#x6D4B;&#x7684;&#x65B9;&#x5F0F;&#x53D1;&#x751F;&#x53D8;&#x5316;</blockquote><p>Vuex &#x89E3;&#x51B3;&#x4E86;<code>&#x591A;&#x4E2A;&#x89C6;&#x56FE;&#x4F9D;&#x8D56;&#x4E8E;&#x540C;&#x4E00;&#x72B6;&#x6001;</code>&#x548C;<code>&#x6765;&#x81EA;&#x4E0D;&#x540C;&#x89C6;&#x56FE;&#x7684;&#x884C;&#x4E3A;&#x9700;&#x8981;&#x53D8;&#x66F4;&#x540C;&#x4E00;&#x72B6;&#x6001;</code>&#x7684;&#x95EE;&#x9898;&#xFF0C;&#x5C06;&#x5F00;&#x53D1;&#x8005;&#x7684;&#x7CBE;&#x529B;&#x805A;&#x7126;&#x4E8E;&#x6570;&#x636E;&#x7684;&#x66F4;&#x65B0;&#x800C;&#x4E0D;&#x662F;&#x6570;&#x636E;&#x5728;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x7684;&#x4F20;&#x9012;&#x4E0A;</p><h3 id="articleHeader2">1.2 Vuex&#x5404;&#x4E2A;&#x6A21;&#x5757;</h3><p>&#xFF08;1&#xFF09;<code>state</code>&#xFF1A;&#x7528;&#x4E8E;&#x6570;&#x636E;&#x7684;&#x5B58;&#x50A8;&#xFF0C;&#x662F;store&#x4E2D;&#x7684;<strong>&#x552F;&#x4E00;&#x6570;&#x636E;&#x6E90;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5B9A;&#x4E49;
new Vuex.Store({
    state: {
        allProducts: []
    }
    //...
})
// &#x7EC4;&#x4EF6;&#x4E2D;&#x83B7;&#x53D6;
this.$store.state.allProducts" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x5B9A;&#x4E49;</span>
<span class="hljs-keyword">new</span> Vuex.Store({
    <span class="hljs-attr">state</span>: {
        <span class="hljs-attr">allProducts</span>: []
    }
    <span class="hljs-comment">//...</span>
})
<span class="hljs-comment">// &#x7EC4;&#x4EF6;&#x4E2D;&#x83B7;&#x53D6;</span>
<span class="hljs-keyword">this</span>.$store.state.allProducts</code></pre><p>&#xFF08;2&#xFF09;<code>getters</code>&#xFF1A;&#x5982;vue&#x4E2D;&#x7684;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x4E00;&#x6837;&#xFF0C;<strong>&#x57FA;&#x4E8E;state&#x6570;&#x636E;&#x7684;&#x4E8C;&#x6B21;&#x5305;&#x88C5;</strong>&#xFF0C;&#x5E38;&#x7528;&#x4E8E;&#x6570;&#x636E;&#x7684;&#x7B5B;&#x9009;&#x548C;&#x591A;&#x4E2A;&#x6570;&#x636E;&#x7684;&#x76F8;&#x5173;&#x6027;&#x8BA1;&#x7B97;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5B9A;&#x4E49;
getters: {
    cartProducts(state, getters, rootState) 
        =&gt; (getters.allProducts.filter(p =&gt; p.quantity))
}
// &#x7EC4;&#x4EF6;&#x4E2D;&#x83B7;&#x53D6;
this.$store.getters.cartProducts" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x5B9A;&#x4E49;</span>
getters: {
    cartProducts(state, getters, rootState) 
        =&gt; (getters.allProducts.filter(<span class="hljs-function"><span class="hljs-params">p</span> =&gt;</span> p.quantity))
}
<span class="hljs-comment">// &#x7EC4;&#x4EF6;&#x4E2D;&#x83B7;&#x53D6;</span>
<span class="hljs-keyword">this</span>.$store.getters.cartProducts</code></pre><p>&#xFF08;3&#xFF09;<code>mutations</code>&#xFF1A;&#x7C7B;&#x4F3C;&#x51FD;&#x6570;&#xFF0C;<strong>&#x6539;&#x53D8;state&#x6570;&#x636E;&#x7684;&#x552F;&#x4E00;&#x9014;&#x5F84;&#xFF0C;&#x4E14;&#x4E0D;&#x80FD;&#x7528;&#x4E8E;&#x5904;&#x7406;&#x5F02;&#x6B65;&#x4E8B;&#x4EF6;&#xFF08;&#x91CD;&#x70B9;&#xFF01;&#xFF01;&#xFF01;&#xFF09;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5B9A;&#x4E49;
mutations: {
    setProducts (state, products) {
        state.allProducts = products
    }
}

// &#x7EC4;&#x4EF6;&#x4E2D;&#x4F7F;&#x7528;
this.$store.commit(&apos;setProducts&apos;, {//..options})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x5B9A;&#x4E49;</span>
mutations: {
    setProducts (state, products) {
        state.allProducts = products
    }
}

<span class="hljs-comment">// &#x7EC4;&#x4EF6;&#x4E2D;&#x4F7F;&#x7528;</span>
<span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">&apos;setProducts&apos;</span>, {<span class="hljs-comment">//..options})</span></code></pre><p>&#xFF08;4&#xFF09;<code>actions</code>&#xFF1A;&#x7C7B;&#x4F3C;&#x4E8E;mutation&#xFF0C;<strong>&#x7528;&#x4E8E;&#x63D0;&#x4EA4;mutation&#x6765;&#x6539;&#x53D8;&#x72B6;&#x6001;&#xFF0C;&#x800C;&#x4E0D;&#x76F4;&#x63A5;&#x53D8;&#x66F4;&#x72B6;&#x6001;&#xFF0C;&#x53EF;&#x4EE5;&#x5305;&#x542B;&#x4EFB;&#x610F;&#x5F02;&#x6B65;&#x64CD;&#x4F5C;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5B9A;&#x4E49;&#xFF08;shop&#x4E3A;api&#xFF09;
actions: {
    getAllProducts ({ commit }, payload) {
        shop.getProducts((res) =&gt; {
            commit(&apos;setProducts&apos;, res)
        })
    }
}

// &#x7EC4;&#x4EF6;&#x4E2D;&#x4F7F;&#x7528;
this.$store.dispatch(&apos;getAllProducts&apos;, {//..payload})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x5B9A;&#x4E49;&#xFF08;shop&#x4E3A;api&#xFF09;</span>
actions: {
    getAllProducts ({ commit }, payload) {
        shop.getProducts(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
            commit(<span class="hljs-string">&apos;setProducts&apos;</span>, res)
        })
    }
}

<span class="hljs-comment">// &#x7EC4;&#x4EF6;&#x4E2D;&#x4F7F;&#x7528;</span>
<span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">&apos;getAllProducts&apos;</span>, {<span class="hljs-comment">//..payload})</span></code></pre><p>&#xFF08;5&#xFF09;<code>modules</code>&#xFF1A;&#x7C7B;&#x4F3C;&#x4E8E;&#x547D;&#x540D;&#x7A7A;&#x95F4;&#xFF0C;&#x7528;&#x4E8E;&#x9879;&#x76EE;&#x4E2D;&#x5C06;&#x5404;&#x4E2A;&#x6A21;&#x5757;&#x7684;&#x72B6;&#x6001;&#x5206;&#x5F00;&#x5B9A;&#x4E49;&#x548C;&#x64CD;&#x4F5C;&#xFF0C;&#x4FBF;&#x4E8E;&#x7EF4;&#x62A4;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5B9A;&#x4E49;
const moduleA = {
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

// &#x7EC4;&#x4EF6;&#x4E2D;&#x4F7F;&#x7528;
store.state.a // -&gt; moduleA &#x7684;&#x72B6;&#x6001;
store.state.b // -&gt; moduleB &#x7684;&#x72B6;&#x6001;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x5B9A;&#x4E49;</span>
<span class="hljs-keyword">const</span> moduleA = {
    <span class="hljs-attr">state</span>: { ... },
    <span class="hljs-attr">mutations</span>: { ... },
    <span class="hljs-attr">actions</span>: { ... },
    <span class="hljs-attr">getters</span>: { ... }
}

<span class="hljs-keyword">const</span> moduleB = {
    <span class="hljs-attr">state</span>: { ... },
    <span class="hljs-attr">mutations</span>: { ... },
    <span class="hljs-attr">actions</span>: { ... }
}

<span class="hljs-keyword">const</span> store = <span class="hljs-keyword">new</span> Vuex.Store({
    <span class="hljs-attr">modules</span>: {
        <span class="hljs-attr">a</span>: moduleA,
        <span class="hljs-attr">b</span>: moduleB
    }
})

<span class="hljs-comment">// &#x7EC4;&#x4EF6;&#x4E2D;&#x4F7F;&#x7528;</span>
store.state.a <span class="hljs-comment">// -&gt; moduleA &#x7684;&#x72B6;&#x6001;</span>
store.state.b <span class="hljs-comment">// -&gt; moduleB &#x7684;&#x72B6;&#x6001;</span></code></pre><p>&#x6CE8;&#x610F;&#xFF1A;<strong>&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;&#xFF0C;&#x6A21;&#x5757;&#x5185;&#x90E8;&#x7684; action&#x3001;mutation &#x548C; getter &#x662F;&#x6CE8;&#x518C;&#x5728;&#x5168;&#x5C40;&#x547D;&#x540D;&#x7A7A;&#x95F4;&#x7684;&#x2014;&#x2014;&#x8FD9;&#x6837;&#x4F7F;&#x5F97;&#x591A;&#x4E2A;&#x6A21;&#x5757;&#x80FD;&#x591F;&#x5BF9;&#x540C;&#x4E00; mutation &#x6216; action &#x4F5C;&#x51FA;&#x54CD;&#x5E94;&#xFF0C;&#x4EC5;&#x6709;state&#x662F;&#x5C40;&#x90E8;&#x4F5C;&#x7528;&#x3002;</strong>&#x56E0;&#x6B64;&#xFF0C;&#x5E38;&#x7528;getters&#x5C06;state&#x5305;&#x88C5;&#x540E;&#x8F93;&#x51FA;&#xFF0C;&#x8FD9;&#x6837;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x901A;&#x8FC7;<code>this.$store.getters.</code>&#x7684;&#x65B9;&#x5F0F;&#x62FF;&#x5230;&#x6570;&#x636E;&#xFF0C;&#x800C;&#x4E0D;&#x7528;&#x53BB;&#x8BBF;&#x95EE;&#x67D0;&#x4E2A;&#x6A21;&#x5757;&#x4E0B;&#x7684;state</p><h3 id="articleHeader3">1.3 &#x8F85;&#x52A9;&#x51FD;&#x6570;</h3><p>&#x5728;&#x7EC4;&#x4EF6;&#x4E2D;&#x4F7F;&#x7528;store&#x4E2D;&#x7684;&#x6570;&#x636E;&#x6216;&#x65B9;&#x6CD5;&#x65F6;&#xFF0C;&#x6309;&#x7167;&#x4E0A;&#x9762;&#x7684;&#x8BF4;&#x6CD5;&#xFF0C;&#x6BCF;&#x6B21;&#x90FD;&#x8981;<code>this.$store.</code>&#x7684;&#x65B9;&#x5F0F;&#x53BB;&#x83B7;&#x53D6;&#xFF0C;&#x6709;&#x6CA1;&#x6709;&#x7B80;&#x5355;&#x4E00;&#x70B9;&#x7684;&#x65B9;&#x5F0F;&#x5462;&#xFF1F;&#x8F85;&#x52A9;&#x51FD;&#x6570;&#x5C31;&#x662F;&#x4E3A;&#x4E86;&#x89E3;&#x51B3;&#x8FD9;&#x4E2A;&#x95EE;&#x9898;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x7EC4;&#x4EF6;&#x4E2D;&#x6CE8;&#x518C;
import { mapState, mapGetters, mapMutations, mapActions } from &apos;vuex&apos;

export default {
    computed: {
        // &#x6570;&#x7EC4;&#x5F62;&#x5F0F;&#xFF0C;&#x5F53;&#x6620;&#x5C04;&#x7684;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x7684;&#x540D;&#x79F0;&#x4E0E; state &#x7684;&#x5B50;&#x8282;&#x70B9;&#x540D;&#x79F0;&#x76F8;&#x540C;&#x65F6;&#x4F7F;&#x7528;
        ...mapState([&apos;allProducts&apos;])
        // &#x5BF9;&#x8C61;&#x5F62;&#x5F0F;&#xFF0C;&#x53EF;&#x91CD;&#x547D;&#x540D; state &#x5B50;&#x8282;&#x70B9;&#x540D;&#x79F0;
        ...mapState({
            products: state =&gt; state.allProducts
        })
        // &#x4E0B;&#x9762;&#x4E3A;&#x4E86;&#x7B80;&#x4FBF;&#xFF0C;&#x5747;&#x4EE5;&#x6570;&#x7EC4;&#x5F62;&#x5F0F;&#x4F7F;&#x7528;
        ...mapGetters([&apos;cartProducts&apos;])
    },
    methods: {
        ...mapMutations([&apos;setProducts&apos;]),
        ...mapActions([&apos;getAllProducts&apos;])
    }
}

// &#x7EC4;&#x4EF6;&#x4E2D;&#x4F7F;&#x7528;
// &#x53D8;&#x91CF;
this.allProducts
this.products
// &#x65B9;&#x6CD5;
this.setProducts()
this.getAllProducts()" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x7EC4;&#x4EF6;&#x4E2D;&#x6CE8;&#x518C;</span>
<span class="hljs-keyword">import</span> { mapState, mapGetters, mapMutations, mapActions } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vuex&apos;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">computed</span>: {
        <span class="hljs-comment">// &#x6570;&#x7EC4;&#x5F62;&#x5F0F;&#xFF0C;&#x5F53;&#x6620;&#x5C04;&#x7684;&#x8BA1;&#x7B97;&#x5C5E;&#x6027;&#x7684;&#x540D;&#x79F0;&#x4E0E; state &#x7684;&#x5B50;&#x8282;&#x70B9;&#x540D;&#x79F0;&#x76F8;&#x540C;&#x65F6;&#x4F7F;&#x7528;</span>
        ...mapState([<span class="hljs-string">&apos;allProducts&apos;</span>])
        <span class="hljs-comment">// &#x5BF9;&#x8C61;&#x5F62;&#x5F0F;&#xFF0C;&#x53EF;&#x91CD;&#x547D;&#x540D; state &#x5B50;&#x8282;&#x70B9;&#x540D;&#x79F0;</span>
        ...mapState({
            <span class="hljs-attr">products</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.allProducts
        })
        <span class="hljs-comment">// &#x4E0B;&#x9762;&#x4E3A;&#x4E86;&#x7B80;&#x4FBF;&#xFF0C;&#x5747;&#x4EE5;&#x6570;&#x7EC4;&#x5F62;&#x5F0F;&#x4F7F;&#x7528;</span>
        ...mapGetters([<span class="hljs-string">&apos;cartProducts&apos;</span>])
    },
    <span class="hljs-attr">methods</span>: {
        ...mapMutations([<span class="hljs-string">&apos;setProducts&apos;</span>]),
        ...mapActions([<span class="hljs-string">&apos;getAllProducts&apos;</span>])
    }
}

<span class="hljs-comment">// &#x7EC4;&#x4EF6;&#x4E2D;&#x4F7F;&#x7528;</span>
<span class="hljs-comment">// &#x53D8;&#x91CF;</span>
<span class="hljs-keyword">this</span>.allProducts
<span class="hljs-keyword">this</span>.products
<span class="hljs-comment">// &#x65B9;&#x6CD5;</span>
<span class="hljs-keyword">this</span>.setProducts()
<span class="hljs-keyword">this</span>.getAllProducts()</code></pre><p>&#x7531;&#x4E8E;&#x4E0A;&#x9762;&#x63D0;&#x5230;&#xFF0C;&#x5E38;&#x7528;&#x7684;&#x505A;&#x6CD5;&#x662F;&#x5C06;state&#x4E2D;&#x6570;&#x636E;&#x4F7F;&#x7528;getter&#x5305;&#x88C5;&#x540E;&#x8F93;&#x51FA;&#xFF0C;&#x56E0;&#x6B64;&#xFF0C;mapState&#x5728;&#x9879;&#x76EE;&#x4E2D;&#x8F83;&#x5C11;&#x9047;&#x5230;&#xFF0C;&#x5176;&#x4ED6;&#x4E09;&#x4E2A;&#x5012;&#x662F;&#x7ECF;&#x5E38;&#x4F7F;&#x7528;&#xFF0C;&#x53E6;&#x5916;&#xFF0C;&#x6709;&#x4E24;&#x4E2A;&#x6CE8;&#x610F;&#x9879;&#x548C;&#x4E24;&#x4E2A;&#x6700;&#x4F73;&#x5B9E;&#x8DF5;&#xFF1A;</p><p><strong>&#x6CE8;&#x610F;</strong>&#xFF1A;</p><ol><li><strong>Mutation &#x9700;&#x9075;&#x5B88; Vue &#x7684;&#x54CD;&#x5E94;&#x89C4;&#x5219;</strong>&#xFF0C;<a href="https://vuex.vuejs.org/zh-cn/mutations.html" rel="nofollow noreferrer" target="_blank">&#x89C1;Vuex&#x5B98;&#x7F51;Mutation&#x90E8;&#x5206;</a></li><li><strong>&#x8868;&#x5355;&#x5904;&#x7406;&#x65F6;&#x5F15;&#x53D1;&#x7684;&#x76F4;&#x63A5;&#x4FEE;&#x6539;state&#x4E2D;&#x6570;&#x636E;</strong>&#x95EE;&#x9898;&#xFF0C;<a href="https://vuex.vuejs.org/zh-cn/forms.html" rel="nofollow noreferrer" target="_blank">&#x89C1;Vuex&#x5B98;&#x7F51;&#x8868;&#x5355;&#x5904;&#x7406;&#x90E8;&#x5206;</a></li></ol><p><strong>&#x6700;&#x4F73;&#x5B9E;&#x8DF5;</strong>&#xFF08;&#x540E;&#x9762;&#x7684;demo&#x4E2D;&#x4F1A;&#x5F15;&#x5BFC;&#x4F7F;&#x7528;&#xFF09;&#xFF1A;</p><ol><li><strong>&#x4F7F;&#x7528;&#x5E38;&#x91CF;&#x66FF;&#x4EE3; Mutation &#x4E8B;&#x4EF6;&#x7C7B;&#x578B;</strong>&#xFF0C;&#x8FD9;&#x6837;&#x53EF;&#x4EE5;&#x4F7F; linter &#x4E4B;&#x7C7B;&#x7684;&#x5DE5;&#x5177;&#x53D1;&#x6325;&#x4F5C;&#x7528;&#xFF0C;&#x540C;&#x65F6;&#x628A;&#x8FD9;&#x4E9B;&#x5E38;&#x91CF;&#x653E;&#x5728;&#x5355;&#x72EC;&#x7684;&#x6587;&#x4EF6;&#x4E2D;&#x53EF;&#x4EE5;&#x8BA9;&#x4F60;&#x7684;&#x4EE3;&#x7801;&#x5408;&#x4F5C;&#x8005;&#x5BF9;&#x6574;&#x4E2A; app &#x5305;&#x542B;&#x7684; mutation &#x4E00;&#x76EE;&#x4E86;&#x7136;</li><li>store &#x7ED3;&#x6784;&#x4F7F;&#x7528;&#x5982;&#x4E0B;&#x65B9;&#x5F0F;</li></ol><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="store
    &#x251C;&#x2500;&#x2500; index.js             # &#x5BFC;&#x51FA; store &#x7684;&#x5730;&#x65B9;
    &#x251C;&#x2500;&#x2500; state.js             # &#x6839;&#x7EA7;&#x522B;&#x7684; state
    &#x251C;&#x2500;&#x2500; getters.js           # &#x4E8C;&#x6B21;&#x5305;&#x88C5;state&#x6570;&#x636E;
    &#x251C;&#x2500;&#x2500; actions.js           # &#x6839;&#x7EA7;&#x522B;&#x7684; action
    &#x251C;&#x2500;&#x2500; mutations.js         # &#x6839;&#x7EA7;&#x522B;&#x7684; mutation
    &#x251C;&#x2500;&#x2500; mutation-types.js    # &#x6240;&#x6709; mutation &#x7684;&#x5E38;&#x91CF;&#x6620;&#x5C04;&#x8868;
    &#x2514;&#x2500;&#x2500; modules              # &#x5982;&#x679C;&#x6709;.
        &#x251C;&#x2500;&#x2500; ..." title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs mipsasm"><code class="shell">store
    &#x251C;&#x2500;&#x2500; index.<span class="hljs-keyword">js </span>            <span class="hljs-comment"># &#x5BFC;&#x51FA; store &#x7684;&#x5730;&#x65B9;</span>
    &#x251C;&#x2500;&#x2500; state.<span class="hljs-keyword">js </span>            <span class="hljs-comment"># &#x6839;&#x7EA7;&#x522B;&#x7684; state</span>
    &#x251C;&#x2500;&#x2500; getters.<span class="hljs-keyword">js </span>          <span class="hljs-comment"># &#x4E8C;&#x6B21;&#x5305;&#x88C5;state&#x6570;&#x636E;</span>
    &#x251C;&#x2500;&#x2500; actions.<span class="hljs-keyword">js </span>          <span class="hljs-comment"># &#x6839;&#x7EA7;&#x522B;&#x7684; action</span>
    &#x251C;&#x2500;&#x2500; mutations.<span class="hljs-keyword">js </span>        <span class="hljs-comment"># &#x6839;&#x7EA7;&#x522B;&#x7684; mutation</span>
    &#x251C;&#x2500;&#x2500; mutation-types.<span class="hljs-keyword">js </span>   <span class="hljs-comment"># &#x6240;&#x6709; mutation &#x7684;&#x5E38;&#x91CF;&#x6620;&#x5C04;&#x8868;</span>
    &#x2514;&#x2500;&#x2500; modules              <span class="hljs-comment"># &#x5982;&#x679C;&#x6709;.</span>
        &#x251C;&#x2500;&#x2500; ...</code></pre><h2 id="articleHeader4">2. Vuex &#x5B89;&#x88C5;</h2><p>&#xFF08;1&#xFF09;&#x5728;&#x9879;&#x76EE;&#x4E2D;&#x5B89;&#x88C5;<code>Vuex</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vuex --save" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sql"><code style="word-break:break-word;white-space:initial">npm <span class="hljs-keyword">install</span> vuex <span class="hljs-comment">--save</span></code></pre><p>&#xFF08;2&#xFF09;&#x5728;src&#x76EE;&#x5F55;&#x4E0B;&#x65B0;&#x5EFA;<code>store/index.js</code>&#xFF0C;&#x5176;&#x4E2D;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &apos;vue&apos;
import Vuex from &apos;vuex&apos;
// &#x4FEE;&#x6539;state&#x65F6;&#x5728;console&#x6253;&#x5370;&#xFF0C;&#x4FBF;&#x4E8E;&#x8C03;&#x8BD5;
import createLogger from &apos;vuex/dist/logger&apos;

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== &apos;production&apos;

const state = {}
const getters = {}
const mutataions = {}
const actions = {}

export default new Vuex.Store({
    state,
    getters,
    mutataions,
    actions,
    // &#x4E25;&#x683C;&#x6A21;&#x5F0F;&#xFF0C;&#x975E;&#x6CD5;&#x4FEE;&#x6539;state&#x65F6;&#x62A5;&#x9519;
    strict: debug,
    plugins: debug ? [createLogger()] : []
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>
<span class="hljs-keyword">import</span> Vuex <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vuex&apos;</span>
<span class="hljs-comment">// &#x4FEE;&#x6539;state&#x65F6;&#x5728;console&#x6253;&#x5370;&#xFF0C;&#x4FBF;&#x4E8E;&#x8C03;&#x8BD5;</span>
<span class="hljs-keyword">import</span> createLogger <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vuex/dist/logger&apos;</span>

Vue.use(Vuex)

<span class="hljs-keyword">const</span> debug = process.env.NODE_ENV !== <span class="hljs-string">&apos;production&apos;</span>

<span class="hljs-keyword">const</span> state = {}
<span class="hljs-keyword">const</span> getters = {}
<span class="hljs-keyword">const</span> mutataions = {}
<span class="hljs-keyword">const</span> actions = {}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vuex.Store({
    state,
    getters,
    mutataions,
    actions,
    <span class="hljs-comment">// &#x4E25;&#x683C;&#x6A21;&#x5F0F;&#xFF0C;&#x975E;&#x6CD5;&#x4FEE;&#x6539;state&#x65F6;&#x62A5;&#x9519;</span>
    strict: debug,
    <span class="hljs-attr">plugins</span>: debug ? [createLogger()] : []
})</code></pre><p>&#xFF08;3&#xFF09;&#x5728;&#x5165;&#x53E3;&#x6587;&#x4EF6;<code>main.js</code>&#x4E2D;&#x6DFB;&#x52A0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ...
import router from &apos;./router&apos;
import store from &apos;./store&apos;

new Vue({
    el: &apos;#app&apos;,
    router,
    store,
    // ...
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// ...</span>
<span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./router&apos;</span>
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./store&apos;</span>

<span class="hljs-keyword">new</span> Vue({
    <span class="hljs-attr">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
    router,
    store,
    <span class="hljs-comment">// ...</span>
})</code></pre><p>&#x53EF;&#x4EE5;&#x5BF9;&#x6BD4;vue-router&#x548C;vuex&#x7684;&#x5B89;&#x88C5;&#x65B9;&#x5F0F;&#xFF1A;&#x5B83;&#x4EEC;<strong>&#x5747;&#x4E3A;vue&#x63D2;&#x4EF6;&#xFF0C;&#x5E76;&#x5728;&#x5B9E;&#x4F8B;&#x5316;&#x7EC4;&#x4EF6;&#x65F6;&#x5F15;&#x5165;&#xFF0C;&#x5728;&#x8BE5;&#x5B9E;&#x4F8B;&#x4E0B;&#x7684;&#x6240;&#x6709;&#x7EC4;&#x4EF6;&#x5747;&#x53EF;&#x7531;<code>this.$router</code>&#x548C;<code>this.$store</code>&#x7684;&#x65B9;&#x5F0F;&#x67E5;&#x8BE2;&#x5230;&#x5BF9;&#x5E94;&#x7684;&#x63D2;&#x4EF6;&#x5B9E;&#x4F8B;</strong></p><h2 id="articleHeader5">3. Vuex &#x9879;&#x76EE;&#x5B9E;&#x8DF5;</h2><p><strong>&#x9700;&#x6C42;</strong>&#xFF1A;&#x5B8C;&#x6210;&#x5728;&#x6587;&#x7AE0;&#x5F00;&#x5934;&#x770B;&#x5230;&#x7684;&#x52A8;&#x56FE;&#x529F;&#x80FD;&#x3010;&#x6CE8;&#xFF1A;<a href="https://github.com/lxyc/vue_blog_project" rel="nofollow noreferrer" target="_blank">demo&#x6E90;&#x7801;</a>&#x3011;&#xFF0C;api&#x6570;&#x636E;&#x548C;&#x529F;&#x80FD;&#x5982;&#x4E0B;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x5546;&#x54C1;&#x5217;&#x8868;
[
    { &apos;id&apos;: 1, &apos;title&apos;: &apos;iPad 4 Mini&apos;, &apos;price&apos;: 500, &apos;inventory&apos;: 2 },
    { &apos;id&apos;: 2, &apos;title&apos;: &apos;H&amp;M T-Shirt White&apos;, &apos;price&apos;: 10, &apos;inventory&apos;: 10 },
    { &apos;id&apos;: 3, &apos;title&apos;: &apos;Charli XCX - Sucker CD&apos;, &apos;price&apos;: 20, &apos;inventory&apos;: 5 }
]" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// &#x5546;&#x54C1;&#x5217;&#x8868;</span>
[
    { <span class="hljs-string">&apos;id&apos;</span>: <span class="hljs-number">1</span>, <span class="hljs-string">&apos;title&apos;</span>: <span class="hljs-string">&apos;iPad 4 Mini&apos;</span>, <span class="hljs-string">&apos;price&apos;</span>: <span class="hljs-number">500</span>, <span class="hljs-string">&apos;inventory&apos;</span>: <span class="hljs-number">2</span> },
    { <span class="hljs-string">&apos;id&apos;</span>: <span class="hljs-number">2</span>, <span class="hljs-string">&apos;title&apos;</span>: <span class="hljs-string">&apos;H&amp;M T-Shirt White&apos;</span>, <span class="hljs-string">&apos;price&apos;</span>: <span class="hljs-number">10</span>, <span class="hljs-string">&apos;inventory&apos;</span>: <span class="hljs-number">10</span> },
    { <span class="hljs-string">&apos;id&apos;</span>: <span class="hljs-number">3</span>, <span class="hljs-string">&apos;title&apos;</span>: <span class="hljs-string">&apos;Charli XCX - Sucker CD&apos;</span>, <span class="hljs-string">&apos;price&apos;</span>: <span class="hljs-number">20</span>, <span class="hljs-string">&apos;inventory&apos;</span>: <span class="hljs-number">5</span> }
]</code></pre><p><strong>&#x529F;&#x80FD;1</strong>&#xFF1A; &#x5546;&#x54C1;&#x589E;&#x51CF;&#x65F6;&#xFF0C;&#x5E93;&#x5B58;&#x53D8;&#x5316;&#xFF0C;&#x8D2D;&#x7269;&#x8F66;&#x5217;&#x8868;&#x548C;&#x91D1;&#x989D;&#x53D8;&#x5316;<br><strong>&#x529F;&#x80FD;2</strong>&#xFF1A; &#x6E05;&#x7A7A;&#x8D2D;&#x7269;&#x8F66;&#x65F6;&#xFF0C;&#x6240;&#x6709;&#x6570;&#x636E;&#x8FD8;&#x539F;</p><p>&#x5206;&#x6790;&#xFF1A;<br><strong>&#x7EC4;&#x4EF6;&#x7ED3;&#x6784;</strong>&#xFF1A;&#x4E00;&#x4E2A;&#x7236;&#x7EC4;&#x4EF6;&#x5305;&#x88F9;&#x4E24;&#x4E2A;&#x5B50;&#x7EC4;&#x4EF6;&#x5546;&#x54C1;&#x5217;&#x8868;&#x548C;&#x8D2D;&#x7269;&#x8F66;&#xFF1B;<strong>&#x6570;&#x636E;&#x65B9;&#x9762;</strong>&#xFF1A;&#x5546;&#x54C1;&#x5217;&#x8868;&#x6570;&#x636E;&#x6765;&#x81EA;&#x4E8E;api&#x63A5;&#x53E3;+&#x52A0;&#x5165;&#x8D2D;&#x7269;&#x8F66;&#x6570;&#x76EE;&#x6807;&#x5FD7;&#xFF0C;&#x52A0;&#x5165;&#x8D2D;&#x7269;&#x8F66;&#x5546;&#x54C1;&#x5217;&#x8868;&#x6765;&#x81EA;&#x5546;&#x54C1;&#x5217;&#x8868;&#x7684;&#x7B5B;&#x9009;&#xFF1B;</p><p>&#x57FA;&#x4E8E;&#x4E0A;&#x9762;&#x7684;&#x5206;&#x6790;&#xFF0C;&#x53EF;&#x5982;&#x4E0B;&#x7EC4;&#x7EC7;&#x4EE3;&#x7801;</p><p>&#xFF08;1&#xFF09;store&#x4E2D;&#x4EE3;&#x7801;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const state = {
    all: []
}

const getters = {
    // &#x603B;&#x5546;&#x54C1;&#x5217;&#x8868;
    allProducts: state =&gt; state.all,
    // &#x8D2D;&#x7269;&#x8F66;&#x5546;&#x54C1;&#x5217;&#x8868;
    cartProducts: (state, getters) =&gt; (getters.allProducts.filter(p =&gt; p.quantity)),
    // &#x8D2D;&#x7269;&#x8F66;&#x5546;&#x54C1;&#x603B;&#x4EF7;
    cartTotalPrice: (state, getters) =&gt; {
        return getters.cartProducts.reduce((total, product) =&gt; {
            return total + product.price * product.quantity
        }, 0)
    }
}

const mutations = {
    setProducts (state, products) {
        state.all = products
    },
    clearCartProducts (state) {
        state.all.forEach(p =&gt; {
            p.quantity = 0
        })
    }
}

const actions = {
    // &#x83B7;&#x53D6;&#x6570;&#x636E;&#x540E;&#xFF0C;&#x52A0;&#x5165;&#x9009;&#x53D6;&#x6570;&#x91CF;quantity&#x7684;&#x6807;&#x8BC6;&#xFF0C;&#x4EE5;&#x533A;&#x5206;&#x662F;&#x5426;&#x88AB;&#x52A0;&#x5165;&#x8D2D;&#x7269;&#x8F66;
    getAllProducts ({ commit }) {
        shop.getProducts((res) =&gt; {
            const newRes = res.map(p =&gt; Object.assign({}, p, {quantity: 0}))
            commit(&apos;setProducts&apos;, newRes)
        })
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> state = {
    <span class="hljs-attr">all</span>: []
}

<span class="hljs-keyword">const</span> getters = {
    <span class="hljs-comment">// &#x603B;&#x5546;&#x54C1;&#x5217;&#x8868;</span>
    allProducts: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.all,
    <span class="hljs-comment">// &#x8D2D;&#x7269;&#x8F66;&#x5546;&#x54C1;&#x5217;&#x8868;</span>
    cartProducts: <span class="hljs-function">(<span class="hljs-params">state, getters</span>) =&gt;</span> (getters.allProducts.filter(<span class="hljs-function"><span class="hljs-params">p</span> =&gt;</span> p.quantity)),
    <span class="hljs-comment">// &#x8D2D;&#x7269;&#x8F66;&#x5546;&#x54C1;&#x603B;&#x4EF7;</span>
    cartTotalPrice: <span class="hljs-function">(<span class="hljs-params">state, getters</span>) =&gt;</span> {
        <span class="hljs-keyword">return</span> getters.cartProducts.reduce(<span class="hljs-function">(<span class="hljs-params">total, product</span>) =&gt;</span> {
            <span class="hljs-keyword">return</span> total + product.price * product.quantity
        }, <span class="hljs-number">0</span>)
    }
}

<span class="hljs-keyword">const</span> mutations = {
    setProducts (state, products) {
        state.all = products
    },
    clearCartProducts (state) {
        state.all.forEach(<span class="hljs-function"><span class="hljs-params">p</span> =&gt;</span> {
            p.quantity = <span class="hljs-number">0</span>
        })
    }
}

<span class="hljs-keyword">const</span> actions = {
    <span class="hljs-comment">// &#x83B7;&#x53D6;&#x6570;&#x636E;&#x540E;&#xFF0C;&#x52A0;&#x5165;&#x9009;&#x53D6;&#x6570;&#x91CF;quantity&#x7684;&#x6807;&#x8BC6;&#xFF0C;&#x4EE5;&#x533A;&#x5206;&#x662F;&#x5426;&#x88AB;&#x52A0;&#x5165;&#x8D2D;&#x7269;&#x8F66;</span>
    getAllProducts ({ commit }) {
        shop.getProducts(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
            <span class="hljs-keyword">const</span> newRes = res.map(<span class="hljs-function"><span class="hljs-params">p</span> =&gt;</span> <span class="hljs-built_in">Object</span>.assign({}, p, {<span class="hljs-attr">quantity</span>: <span class="hljs-number">0</span>}))
            commit(<span class="hljs-string">&apos;setProducts&apos;</span>, newRes)
        })
    }
}</code></pre><p>&#xFF08;2&#xFF09;&#x5546;&#x54C1;&#x5217;&#x8868;&#x7EC4;&#x4EF6;ProductList.vue</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
    &lt;ul class=&quot;product-wrapper&quot;&gt;
        &lt;li class=&quot;row header&quot;&gt;
            &lt;div v-for=&quot;(th,i) in tHeader&quot; :key=&quot;i&quot;&gt;{{ th }}&lt;/div&gt;
        &lt;/li&gt;
        &lt;li class=&quot;row&quot; v-for=&quot;product in currentProducts&quot; :key=&quot;product.id&quot;&gt;
            &lt;div&gt;{{ product.title }}&lt;/div&gt;
            &lt;div&gt;{{ product.price }}&lt;/div&gt;
            &lt;div&gt;{{ product.inventory - product.quantity }}&lt;/div&gt;
            &lt;div&gt;
                &lt;el-input-number
                    :min=&quot;0&quot; :max=&quot;product.inventory&quot;
                    v-model=&quot;product.quantity&quot;
                    @change=&quot;handleChange&quot;&gt;
                &lt;/el-input-number&gt;
            &lt;/div&gt;
        &lt;/li&gt;
    &lt;/ul&gt;
&lt;/template&gt;

&lt;script&gt;
import { mapGetters, mapMutations, mapActions } from &apos;vuex&apos;

export default {
    data () {
        return {
            tHeader: [&apos;&#x540D;&#x79F0;&apos;, &apos;&#x4EF7;&#x683C;&apos;, &apos;&#x5269;&#x4F59;&#x5E93;&#x5B58;&apos;, &apos;&#x64CD;&#x4F5C;&apos;],
            currentProducts: []
        }
    },
    computed: {
        ...mapGetters([&apos;allProducts&apos;])
    },
    // &#x4E3A;&#x4E86;&#x907F;&#x514D;&#x8868;&#x5355;&#x76F4;&#x63A5;&#x4FEE;&#x6539;store&#x4E2D;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x9700;&#x8981;&#x4F7F;&#x7528;watch&#x6A21;&#x62DF;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;
    watch: {
        allProducts: {
            handler (val) {
                this.currentProducts = JSON.parse(JSON.stringify(this.allProducts))
            },
            deep: true
        }
    },
    created () {
        this.getAllProducts()
    },
    methods: {
        handleChange () {
            this.setProducts(this.currentProducts)
        },
        ...mapMutations([&apos;setProducts&apos;]),
        ...mapActions([&apos;getAllProducts&apos;])
    }
}
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;product-wrapper&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;row header&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;(th,i) in tHeader&quot;</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">&quot;i&quot;</span>&gt;</span>"{{" th "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;row&quot;</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;product in currentProducts&quot;</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">&quot;product.id&quot;</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>"{{" product.title "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>"{{" product.price "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>"{{" product.inventory - product.quantity "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">el-input-number</span>
                    <span class="hljs-attr">:min</span>=<span class="hljs-string">&quot;0&quot;</span> <span class="hljs-attr">:max</span>=<span class="hljs-string">&quot;product.inventory&quot;</span>
                    <span class="hljs-attr">v-model</span>=<span class="hljs-string">&quot;product.quantity&quot;</span>
                    @<span class="hljs-attr">change</span>=<span class="hljs-string">&quot;handleChange&quot;</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">el-input-number</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> { mapGetters, mapMutations, mapActions } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vuex&apos;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data () {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">tHeader</span>: [<span class="hljs-string">&apos;&#x540D;&#x79F0;&apos;</span>, <span class="hljs-string">&apos;&#x4EF7;&#x683C;&apos;</span>, <span class="hljs-string">&apos;&#x5269;&#x4F59;&#x5E93;&#x5B58;&apos;</span>, <span class="hljs-string">&apos;&#x64CD;&#x4F5C;&apos;</span>],
            <span class="hljs-attr">currentProducts</span>: []
        }
    },
    <span class="hljs-attr">computed</span>: {
        ...mapGetters([<span class="hljs-string">&apos;allProducts&apos;</span>])
    },
    <span class="hljs-comment">// &#x4E3A;&#x4E86;&#x907F;&#x514D;&#x8868;&#x5355;&#x76F4;&#x63A5;&#x4FEE;&#x6539;store&#x4E2D;&#x7684;&#x6570;&#x636E;&#xFF0C;&#x9700;&#x8981;&#x4F7F;&#x7528;watch&#x6A21;&#x62DF;&#x53CC;&#x5411;&#x7ED1;&#x5B9A;</span>
    watch: {
        <span class="hljs-attr">allProducts</span>: {
            handler (val) {
                <span class="hljs-keyword">this</span>.currentProducts = <span class="hljs-built_in">JSON</span>.parse(<span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-keyword">this</span>.allProducts))
            },
            <span class="hljs-attr">deep</span>: <span class="hljs-literal">true</span>
        }
    },
    created () {
        <span class="hljs-keyword">this</span>.getAllProducts()
    },
    <span class="hljs-attr">methods</span>: {
        handleChange () {
            <span class="hljs-keyword">this</span>.setProducts(<span class="hljs-keyword">this</span>.currentProducts)
        },
        ...mapMutations([<span class="hljs-string">&apos;setProducts&apos;</span>]),
        ...mapActions([<span class="hljs-string">&apos;getAllProducts&apos;</span>])
    }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#xFF08;3&#xFF09;&#x8D2D;&#x7269;&#x8F66;&#x5217;&#x8868;&#x7EC4;&#x4EF6;ShoppingCart.vue</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
    &lt;div class=&quot;cart&quot;&gt;
        &lt;p v-show=&quot;!products.length&quot;&gt;&lt;i&gt;Please add some products to cart.&lt;/i&gt;&lt;/p&gt;
    &lt;ul&gt;
        &lt;li v-for=&quot;product in products&quot; :key=&quot;product.id&quot;&gt;
            {{ product.title }} - {{ product.price }} x {{ product.quantity }}
        &lt;/li&gt;
    &lt;/ul&gt;
    &lt;p&gt;Total: {{ total }}&lt;/p&gt;
    &lt;el-button @click=&quot;clearCartProducts&quot;&gt;CLEAR&lt;/el-button&gt;
&lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
import { mapGetters, mapMutations } from &apos;vuex&apos;

export default {
    computed: {
        ...mapGetters({
            products: &apos;cartProducts&apos;,
            total: &apos;cartTotalPrice&apos;
        })
    },
    methods: {
        ...mapMutations([&apos;clearCartProducts&apos;])
    }
}
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">&lt;template&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;cart&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">v-show</span>=<span class="hljs-string">&quot;!products.length&quot;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">i</span>&gt;</span>Please add some products to cart.<span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">v-for</span>=<span class="hljs-string">&quot;product in products&quot;</span> <span class="hljs-attr">:key</span>=<span class="hljs-string">&quot;product.id&quot;</span>&gt;</span>
            {{ product.title }} - {{ product.price }} x {{ product.quantity }}
        <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Total: {{ total "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">el-button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">&quot;clearCartProducts&quot;</span>&gt;</span>CLEAR<span class="hljs-tag">&lt;/<span class="hljs-name">el-button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></span>

&lt;script&gt;
<span class="hljs-keyword">import</span> { mapGetters, mapMutations } <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vuex&apos;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">computed</span>: {
        ...mapGetters({
            <span class="hljs-attr">products</span>: <span class="hljs-string">&apos;cartProducts&apos;</span>,
            <span class="hljs-attr">total</span>: <span class="hljs-string">&apos;cartTotalPrice&apos;</span>
        })
    },
    <span class="hljs-attr">methods</span>: {
        ...mapMutations([<span class="hljs-string">&apos;clearCartProducts&apos;</span>])
    }
}
&lt;<span class="hljs-regexp">/script&gt;</span></code></pre><p>&#xFF08;4&#xFF09;&#x7ED3;&#x5408;&#x4E0A;&#x9762;&#x6240;&#x8BF4;&#x7684;&#x6700;&#x4F73;&#x5B9E;&#x8DF5;&#x4F18;&#x5316;&#xFF1A;</p><p>&#x9996;&#x5148;&#xFF0C;&#x6309;&#x7167;&#x4E0A;&#x9762;&#x7684;tree&#x7ED3;&#x6784;&#x5C06;store&#x6587;&#x4EF6;&#x5939;&#x62C6;&#x5206;&#xFF1B;&#x63A5;&#x4E0B;&#x6765;&#xFF1A;</p><p>&#x5728;store&#x4E2D;&#x65B0;&#x5EFA;<code>mutation-types.js</code>&#x6587;&#x4EF6;&#xFF0C;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const SET_PRODUCTS = &apos;SET_PRODUCTS&apos;
export const CLEAR_CART_PRODUCTS = &apos;CLEAR_CART_PRODUCTS&apos;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> SET_PRODUCTS = <span class="hljs-string">&apos;SET_PRODUCTS&apos;</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> CLEAR_CART_PRODUCTS = <span class="hljs-string">&apos;CLEAR_CART_PRODUCTS&apos;</span></code></pre><p><code>mutations.js</code>&#x4F5C;&#x5982;&#x4E0B;&#x66F4;&#x6539;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as types from &apos;./mutation-types&apos;

export default {
    [types.SET_PRODUCTS] (state, products) {
        state.all = products
    },
    [types.CLEAR_CART_PRODUCTS] (state) {
        state.all.forEach(p =&gt; {
            p.quantity = 0
        })
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> types <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./mutation-types&apos;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    [types.SET_PRODUCTS] (state, products) {
        state.all = products
    },
    [types.CLEAR_CART_PRODUCTS] (state) {
        state.all.forEach(<span class="hljs-function"><span class="hljs-params">p</span> =&gt;</span> {
            p.quantity = <span class="hljs-number">0</span>
        })
    }
}</code></pre><p><code>actions.js</code>&#x4F5C;&#x5982;&#x4E0B;&#x66F4;&#x6539;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import shop from &apos;@/api/shop&apos;
import * as types from &apos;./mutation-types&apos;

export default {
    // &#x83B7;&#x53D6;&#x6570;&#x636E;&#x540E;&#xFF0C;&#x52A0;&#x5165;&#x9009;&#x53D6;&#x6570;&#x91CF;quantity&#x7684;&#x6807;&#x8BC6;&#xFF0C;&#x4EE5;&#x533A;&#x5206;&#x662F;&#x5426;&#x88AB;&#x52A0;&#x5165;&#x8D2D;&#x7269;&#x8F66;
    getAllProducts ({ commit }) {
        shop.getProducts((res) =&gt; {
        const newRes = res.map(p =&gt; Object.assign({}, p, {quantity: 0}))
            commit(types.SET_PRODUCTS, newRes)
        })
    },
    // &#x8FD9;&#x91CC;&#x5C06;mutation&#x4E2D;&#x7684;&#x65B9;&#x6CD5;&#x4EE5;action&#x7684;&#x5F62;&#x5F0F;&#x8F93;&#x51FA;&#xFF0C;&#x4E3B;&#x8981;&#x662F;&#x7EC4;&#x4EF6;&#x4E2D;&#x6709;&#x4F7F;&#x7528;mutation&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x5230;&#x65F6;&#x4EC5;&#x9700;&#x5F15;&#x7528;mapActions&#x5373;&#x53EF;&#xFF0C;&#x53EF;&#x6309;&#x5B9E;&#x9645;&#x60C5;&#x51B5;&#x4F7F;&#x7528;
    setProducts ({ commit }, products) {
        commit(types.SET_PRODUCTS, products)
    },
    clearCartProducts ({ commit }) {
        commit(types.CLEAR_CART_PRODUCTS)
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> shop <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/api/shop&apos;</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> types <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./mutation-types&apos;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-comment">// &#x83B7;&#x53D6;&#x6570;&#x636E;&#x540E;&#xFF0C;&#x52A0;&#x5165;&#x9009;&#x53D6;&#x6570;&#x91CF;quantity&#x7684;&#x6807;&#x8BC6;&#xFF0C;&#x4EE5;&#x533A;&#x5206;&#x662F;&#x5426;&#x88AB;&#x52A0;&#x5165;&#x8D2D;&#x7269;&#x8F66;</span>
    getAllProducts ({ commit }) {
        shop.getProducts(<span class="hljs-function">(<span class="hljs-params">res</span>) =&gt;</span> {
        <span class="hljs-keyword">const</span> newRes = res.map(<span class="hljs-function"><span class="hljs-params">p</span> =&gt;</span> <span class="hljs-built_in">Object</span>.assign({}, p, {<span class="hljs-attr">quantity</span>: <span class="hljs-number">0</span>}))
            commit(types.SET_PRODUCTS, newRes)
        })
    },
    <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x5C06;mutation&#x4E2D;&#x7684;&#x65B9;&#x6CD5;&#x4EE5;action&#x7684;&#x5F62;&#x5F0F;&#x8F93;&#x51FA;&#xFF0C;&#x4E3B;&#x8981;&#x662F;&#x7EC4;&#x4EF6;&#x4E2D;&#x6709;&#x4F7F;&#x7528;mutation&#x7684;&#x65B9;&#x6CD5;&#xFF0C;&#x5230;&#x65F6;&#x4EC5;&#x9700;&#x5F15;&#x7528;mapActions&#x5373;&#x53EF;&#xFF0C;&#x53EF;&#x6309;&#x5B9E;&#x9645;&#x60C5;&#x51B5;&#x4F7F;&#x7528;</span>
    setProducts ({ commit }, products) {
        commit(types.SET_PRODUCTS, products)
    },
    clearCartProducts ({ commit }) {
        commit(types.CLEAR_CART_PRODUCTS)
    }
}</code></pre><p>&#x53E6;&#x5916;&#xFF0C;<strong>&#x5728;&#x7EC4;&#x4EF6;&#x5F15;&#x7528;mutation&#x90E8;&#x5206;&#x4E5F;&#x9700;&#x8981;&#x4F5C;&#x76F8;&#x5E94;&#x4FEE;&#x6539;</strong></p><p>&#x5728;&#x6B64;&#x4EC5;&#x5C06;demo&#x4E2D;&#x7684;&#x6838;&#x5FC3;&#x90E8;&#x5206;&#x5217;&#x51FA;&#xFF0C;&#x5B8C;&#x6574;&#x7684;&#x4EE3;&#x7801;&#x8BF7;&#x67E5;&#x770B;<a href="https://github.com/lxyc/vue_blog_project" rel="nofollow noreferrer" target="_blank">demo&#x6E90;&#x7801;</a></p><p><a href="https://segmentfault.com/a/1190000014775073">&#x4E0A;&#x4E00;&#x7BC7;&#xFF1A;Vue&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;&#x6DF1;&#x5165;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue组件通信深入Vuex

## 原文链接
[https://segmentfault.com/a/1190000014798001](https://segmentfault.com/a/1190000014798001)

