---
title: '自制vue组件通信插件:教你如何用mixin写插件' 
date: 2018-11-24 2:30:10
hidden: true
slug: 74f2jtzzu34
categories: [reprint]
---

{{< raw >}}
<p>&quot;vue-unicom&quot;&#x7684;&#x4F5C;&#x8005;&#xFF1A;<a href="https://github.com/szpoppy" rel="nofollow noreferrer" target="_blank">szpoppy</a>&#xFF0C;&#x5982;&#x679C;&#x89C9;&#x5F97;&#x5BF9;&#x4F60;&#x6709;&#x7528;&#xFF0C;&#x8BF7;&#x4E00;&#x5B9A;&#x70B9;&#x4E2A;star<br>&#x8FD9;&#x4E2A;&#x9879;&#x76EE;&#x867D;&#x7136;&#x662F;szpoppy&#x7684;&#x4E2A;&#x4EBA;&#x9879;&#x76EE;&#xFF0C;&#x4F46;&#x662F;&#x5728;szpoppy&#x516C;&#x53F8;&#x5185;&#x662F;&#x5728;&#x5927;&#x9762;&#x79EF;&#x4F7F;&#x7528;&#x7684;&#xFF0C;&#x4E00;&#x76F4;&#x7531;szpoppy&#x7EF4;&#x62A4;&#xFF1B;&#x6211;&#x4E2A;&#x4EBA;&#x548C;szpoppy&#x5728;&#x4E00;&#x8D77;&#x5DE5;&#x4F5C;&#x63A5;&#x8FD1;&#x4E00;&#x5E74;&#xFF0C;&#x7ECF;&#x5E38;&#x770B;&#x4ED6;&#x7684;&#x6E90;&#x4EE3;&#x7801;&#xFF0C;&#x4ECE;&#x4ED6;&#x8EAB;&#x4E0A;&#x5B66;&#x5230;&#x975E;&#x5E38;&#x591A;&#x3002;</p><p><strong>&#x672C;&#x6587;&#x7ED3;&#x6784;&#xFF1A;</strong></p><ul><li>1.&#x5BF9;&#x6BD4;VUEX</li><li>2.&#x63D2;&#x4EF6;&#x5DF2;&#x6709;&#x529F;&#x80FD;</li><li>3.&#x63D2;&#x4EF6;&#x5982;&#x4F55;&#x4F7F;&#x7528;</li><li>4.demo&#x6F14;&#x793A;</li><li>5.&#x5177;&#x4F53;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;</li><li>6.&#x6E90;&#x7801;&#x89E3;&#x6790;&#xFF0C;&#x6559;&#x4F60;&#x5982;&#x4F55;&#x7528;mixin&#x5199;vue&#x63D2;&#x4EF6;&#xFF08;&#x4E00;&#x770B;&#x5C31;&#x4F1A;&#xFF0C;&#x901A;&#x4FD7;&#x6613;&#x61C2;&#xFF09;</li></ul><h2 id="articleHeader0">1.&#x5BF9;&#x6BD4;VUEX</h2><ul><li>&#x2018;vue-unicom&#x2019;&#x8BED;&#x6CD5;&#x76F4;&#x89C2;&#xFF0C;&#x4F7F;&#x7528;&#x8D77;&#x6765;&#x57FA;&#x672C;&#x6CA1;&#x6709;&#x5B66;&#x4E60;&#x6210;&#x672C;&#xFF1B;&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#x53EF;&#x4EE5;&#x5927;&#x5927;&#x7B80;&#x5316;&#x4F60;&#x7684;&#x9879;&#x76EE;</li><li>&#x5982;&#x679C;&#x8BF4;vuex&#x662F;&#x5728;&#x89C6;&#x56FE;&#x5C42;&#x7EC4;&#x4EF6;&#x6811;&#x4E4B;&#x5916;&#xFF0C;&#x521B;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;&#x6570;&#x636E;&#x4ED3;&#x5E93;&#xFF0C;&#x901A;&#x8FC7;Mutaion&#x4FEE;&#x6539;&#x7684;&#x8BDD;&#xFF1B;&#x90A3;&#x4E48;unicom&#x5C31;&#x662F;&#x5728;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x642D;&#x5EFA;&#x4E86;&#x4E00;&#x4E2A;&#x7BA1;&#x9053;&#xFF0C;&#x53EF;&#x4EE5;&#x8BA9;&#x7EC4;&#x4EF6;&#x4E4B;&#x95F4;&#x901A;&#x8FC7;&#x51FD;&#x6570;&#x4F20;&#x9012;&#x3001;&#x5206;&#x53D1;&#x6570;&#x636E;&#xFF0C;&#x5E76;&#x4E14;&#x4E0D;&#x50CF;VUEX&#x90A3;&#x6837;&#x6709;&#x5F88;&#x591A;&#x8BED;&#x6CD5;</li><li>VUEX&#x4E3B;&#x8981;&#x505A;&#x7684;&#x662F;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#xFF0C;&#x800C;&#x2018;vue-unicom&#x2019;&#x7EAF;&#x7CB9;&#x5C31;&#x662F;&#x505A;&#x4E00;&#x5BF9;&#x4E00;&#x3001;&#x4E00;&#x5BF9;&#x591A;&#x7684;&#x7EC4;&#x4EF6;&#x901A;&#x4FE1;</li><li>&#x2018;vue-unicom&#x2019;&#x6E90;&#x4EE3;&#x7801;&#x4EC5;200&#x591A;&#x884C;&#xFF0C;&#x6CE8;&#x91CA;&#x6E05;&#x6670;&#xFF0C;&#x4F7F;&#x7528;&#x8005;&#x53EF;&#x4EE5;&#x66F4;&#x52A0;&#x6DF1;&#x5165;&#x7684;&#x4E86;&#x89E3;vue&#x7EC4;&#x4EF6;&#x5982;&#x4F55;&#x7F16;&#x5199;&#xFF0C;&#x65B9;&#x4FBF;&#x540E;&#x7EED;&#x521B;&#x9020;&#x81EA;&#x5DF1;&#x7684;&#x63D2;&#x4EF6;</li><li>&#x5982;&#x679C;&#x4F60;&#x4E0D;&#x786E;&#x5B9A;&#x81EA;&#x5DF1;&#x8981;&#x4E0D;&#x8981;&#x7528;vuex&#xFF0C;&#x5C31;&#x4E0D;&#x8981;&#x7528;&#xFF0C;&#x4E0D;&#x9700;&#x8981;&#x4E3A;&#x4E86;&#x7528;vuex&#x800C;&#x7528;vuex&#xFF0C;&#x4F1A;&#x7528;&#x5C31;&#x884C;&#xFF0C;&#x4E0D;&#x8981;&#x641E;&#x4E2A;&#x4E2D;&#x5C0F;&#x578B;&#x9879;&#x76EE;&#x5C31;&#x76F4;&#x63A5;&#x4E0A;vuex&#xFF0C;&#x5168;&#x5BB6;&#x6876;&#x8FD8;&#x662F;&#x589E;&#x52A0;&#x4E86;&#x6BD4;&#x8F83;&#x591A;&#x7279;&#x5B9A;&#x8BED;&#x6CD5;&#x7684;&#xFF1B;&#x800C;unicom&#x5728;&#x6027;&#x80FD;&#x548C;&#x5B9E;&#x8DF5;&#x4E0A;&#x5B8C;&#x5168;&#x53EF;&#x4EE5;&#x627F;&#x62C5;&#x8D77;&#x5982;<strong>&#x706B;&#x8F66;&#x7968;&#x8D2D;&#x7968;&#x7CFB;&#x7EDF;</strong>&#x89C4;&#x6A21;&#x7684;&#x5E94;&#x7528;&#x3002;</li></ul><p><span class="img-wrap"><img data-src="/img/bVbdqEo?w=2284&amp;h=858" src="https://static.alili.tech/img/bVbdqEo?w=2284&amp;h=858" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader1">2.&#x5DF2;&#x6709;&#x529F;&#x80FD;</h2><ul><li>&#x63D0;&#x4F9B;&#x4EFB;&#x610F;&#x4E24;&#x4E2A;Vue&#x7EC4;&#x5EFA;&#x4E4B;&#x95F4;&#x7684;&#x901A;&#x8BAF;&#x95EE;&#x9898;&#xFF1B;</li><li>&#x4EFB;&#x610F;&#x4E00;&#x4E2A;Vue&#x7EC4;&#x4EF6;&#x5411;&#x5176;&#x4ED6;&#x6240;&#x6709;&#x7EC4;&#x4EF6;&#x53D1;&#x9001;&#x6307;&#x4EE4;&#xFF1B;</li><li>&#x4EFB;&#x610F;&#x4E00;&#x4E2A;Vue&#x7EC4;&#x4EF6;&#x5411;&#x67D0;&#x7EC4;Vue&#x7EC4;&#x4EF6;&#x53D1;&#x9001;&#x6307;&#x4EE4;&#xFF1B;</li><li>&#x4EFB;&#x610F;&#x4E00;&#x4E2A;Vue&#x7EC4;&#x4EF6;&#x5411;&#x7279;&#x5B9A;id&#x7EC4;&#x4EF6;&#x53D1;&#x9001;&#x6D88;&#x606F;&#xFF1B;</li><li>&#x5728;&#x4EFB;&#x610F;&#x4E00;&#x4E2A;Vue&#x7EC4;&#x4EF6;&#x5185;&#x83B7;&#x53D6;&#x67D0;&#x7EC4;&#x7EC4;&#x4EF6;&#x5217;&#x8868;&#xFF1B;</li><li>&#x5728;&#x4EFB;&#x610F;&#x4E00;&#x4E2A;Vue&#x7EC4;&#x4EF6;&#x5185;&#x83B7;&#x53D6;&#x7279;&#x5B9A;id&#x7EC4;&#x4EF6;&#xFF1B;</li><li>&#x53D1;&#x9001;&#x6307;&#x4EE4;&#x5230;&#x8FD8;&#x6CA1;&#x521D;&#x59CB;&#x5316;&#x7684;&#x7EC4;&#x4EF6;&#xFF1B;</li><li>&#x53D1;&#x9001;&#x6307;&#x4EE4;&#x5230;&#x8FD8;&#x6CA1;&#x521D;&#x59CB;&#x5316;&#x7684;&#x5206;&#x7EC4;&#x7EC4;&#x4EF6;&#xFF1B;</li><li>&#x53D1;&#x9001;&#x6307;&#x4EE4;&#x5230;&#x8FD8;&#x6CA1;&#x521D;&#x59CB;&#x5316;&#x7684;id&#x7EC4;&#x4EF6;&#xFF1B;</li></ul><h2 id="articleHeader2">3.&#x5982;&#x4F55;&#x4F7F;&#x7528;</h2><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vue-unicom" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash" style="word-break:break-word;white-space:initial">npm install vue-unicom</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import VueUnicom from &apos;vue-unicom&apos;
// &#x975E; cli &#x4E5F;&#x5FC5;&#x987B; install&#x4E00;&#x4E0B;
Vue.use(VueUnicom, {
    // &#x5236;&#x5B9A;&#x540D;&#x79F0;&#xFF0C; &#x9ED8;&#x8BA4;&#x4E3A; unicom
    unicom: &apos;unicom&apos;&#xFF0C;
    // &#x5B9A;&#x5236;&#x5206;&#x7EC4;&#x4F7F;&#x7528;&#x540D;&#x79F0; &#x9ED8;&#x8BA4;&#x4E3A; unicom + &apos;Name&apos;
    unicomName: &apos;unicomName&apos;,
    // &#x5B9A;&#x5236;id&#x4F7F;&#x7528;&#x540D;&#x79F0; &#x9ED8;&#x8BA4;&#x4E3A; unicom + &apos;Id&apos;
    unicomId: &apos;unicomId&apos;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash">import VueUnicom from <span class="hljs-string">&apos;vue-unicom&apos;</span>
// &#x975E; cli &#x4E5F;&#x5FC5;&#x987B; install&#x4E00;&#x4E0B;
Vue.use(VueUnicom, {
    // &#x5236;&#x5B9A;&#x540D;&#x79F0;&#xFF0C; &#x9ED8;&#x8BA4;&#x4E3A; unicom
    unicom: <span class="hljs-string">&apos;unicom&apos;</span>&#xFF0C;
    // &#x5B9A;&#x5236;&#x5206;&#x7EC4;&#x4F7F;&#x7528;&#x540D;&#x79F0; &#x9ED8;&#x8BA4;&#x4E3A; unicom + <span class="hljs-string">&apos;Name&apos;</span>
    unicomName: <span class="hljs-string">&apos;unicomName&apos;</span>,
    // &#x5B9A;&#x5236;id&#x4F7F;&#x7528;&#x540D;&#x79F0; &#x9ED8;&#x8BA4;&#x4E3A; unicom + <span class="hljs-string">&apos;Id&apos;</span>
    unicomId: <span class="hljs-string">&apos;unicomId&apos;</span>
})</code></pre><h2 id="articleHeader3">4.demo&#x6F14;&#x793A;</h2><p><a href="https://github.com/szpoppy/vue-unicom" rel="nofollow noreferrer" target="_blank">&#x8BE6;&#x60C5;&#x8BBF;&#x95EE;&#x8FD9;&#x4E2A;github&#x7684;readme&#x5730;&#x5740;</a></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 1. &#x4E0B;&#x8F7D;
git clone https://github.com/szpoppy/vue-unicom.git

// 2. 
cd vue-unicom

//3.&#x8FD0;&#x884C;demo&#xFF0C;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x6253;&#x5F00;src&#x76EE;&#x5F55;&#x4E0B;&#x7684;index.html(&#x63A8;&#x8350;&#x8FD9;&#x79CD;&#x66F4;&#x65B9;&#x4FBF;&#x7684;&#x65B9;&#x6CD5;)&#x4E5F;&#x53EF;&#x4EE5;&#x7528;gulp&#x8FD0;&#x884C;

// 4.&#x2018;vue-unicom&#x2019;&#x6E90;&#x4EE3;&#x7801;&#x5728;&#x2018;/src/lib/unicom.js&#x2019;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash">// 1. &#x4E0B;&#x8F7D;
git <span class="hljs-built_in">clone</span> https://github.com/szpoppy/vue-unicom.git

// 2. 
<span class="hljs-built_in">cd</span> vue-unicom

//3.&#x8FD0;&#x884C;demo&#xFF0C;&#x53EF;&#x4EE5;&#x76F4;&#x63A5;&#x6253;&#x5F00;src&#x76EE;&#x5F55;&#x4E0B;&#x7684;index.html(&#x63A8;&#x8350;&#x8FD9;&#x79CD;&#x66F4;&#x65B9;&#x4FBF;&#x7684;&#x65B9;&#x6CD5;)&#x4E5F;&#x53EF;&#x4EE5;&#x7528;gulp&#x8FD0;&#x884C;

// 4.&#x2018;vue-unicom&#x2019;&#x6E90;&#x4EE3;&#x7801;&#x5728;&#x2018;/src/lib/unicom.js&#x2019;</code></pre><h2 id="articleHeader4">5.&#x5177;&#x4F53;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;</h2><p><strong>&#x7EC4;&#x4EF6;&#x7F16;&#x5199;&#x793A;&#x4F8B;&#x5982;&#x4E0B;&#xFF0C;&#x4E0B;&#x9762;&#x8FDB;&#x4E00;&#x6B65;&#x8BE6;&#x7EC6;&#x4ECB;&#x7ECD;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    Vue.component(&apos;ca&apos;, {
    template: &apos;&lt;div&gt;&lt;p class=&quot;title&quot;&gt;text:"{{"text"}}"#"{{"unicomId"}}"&lt;/p&gt;&lt;p&gt;msg: "{{"msg"}}"&lt;/p&gt;&lt;/div&gt;&apos;,
    unicomName: &apos;a&apos;,
    unicom: {
        message: function(sender, text){
            this.msg = text
        }
    },
    data: function(){
        return {
            text: &apos;component - ca&apos;,
            msg: &apos;a&apos;
        }
    },
    mounted(){
        console.log(&apos; a component  &apos;,this)
    }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash">    Vue.component(<span class="hljs-string">&apos;ca&apos;</span>, {
    template: <span class="hljs-string">&apos;&lt;div&gt;&lt;p class=&quot;title&quot;&gt;text:"{{"text"}}"#"{{"unicomId"}}"&lt;/p&gt;&lt;p&gt;msg: "{{"msg"}}"&lt;/p&gt;&lt;/div&gt;&apos;</span>,
    unicomName: <span class="hljs-string">&apos;a&apos;</span>,
    unicom: {
        message: <span class="hljs-keyword">function</span>(sender, text){
            this.msg = text
        }
    },
    data: <span class="hljs-function"><span class="hljs-title">function</span></span>(){
        <span class="hljs-built_in">return</span> {
            text: <span class="hljs-string">&apos;component - ca&apos;</span>,
            msg: <span class="hljs-string">&apos;a&apos;</span>
        }
    },
    <span class="hljs-function"><span class="hljs-title">mounted</span></span>(){
        console.log(<span class="hljs-string">&apos; a component  &apos;</span>,this)
    }
})</code></pre><p><strong>&#x7EC4;&#x4EF6;&#x8C03;&#x7528;&#x793A;&#x4F8B;&#x5982;&#x4E0B;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    &lt;div id=&quot;app&quot; class=&quot;app&quot;&gt;
        &lt;ca unicom-id=&quot;a-id1&quot;&gt;&lt;/ca&gt;
        &lt;ca unicom-id=&quot;a-id2&quot;&gt;&lt;/ca&gt;
        &lt;cb1&gt;&lt;/cb1&gt;
        &lt;cb2&gt;&lt;/cb2&gt;
        &lt;cc&gt;&lt;/cc&gt;
        &lt;hr&gt;
        &lt;cbtn&gt;&lt;/cbtn&gt;
    &lt;/div&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html">    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span> <span class="hljs-attr">class</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ca</span> <span class="hljs-attr">unicom-id</span>=<span class="hljs-string">&quot;a-id1&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ca</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ca</span> <span class="hljs-attr">unicom-id</span>=<span class="hljs-string">&quot;a-id2&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ca</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">cb1</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">cb1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">cb2</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">cb2</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">cc</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">cc</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">hr</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">cbtn</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">cbtn</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre><h4>5.1 &#x6CE8;&#x518C;&#x63A5;&#x6536;&#x6307;&#x4EE4;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    // Vue&#x4E2D;&#x589E;&#x52A0; &#x589E;&#x52A0;unicom&#x53C2;&#x6570;
    // &#x8FD9;&#x91CC;&#x7684;unicom&#xFF0C;&#x6307; &#x4E0A;&#x9762;&#x4F20;&#x5165;&#x7684;&#x53C2;&#x6570;
    unicom: {
        // instruct1&#xFF1A;&#x901A;&#x8BAF;&#x6307;&#x4EE4;
        // sender&#xFF1A;&#x53D1;&#x9001;&#x6307;&#x4EE4;&#x8005;&#xFF08;$vm&#xFF09;
        // args&#xFF1A;&#x6307;&#x4EE4;&#x53D1;&#x51FA;&#x8005;&#x9644;&#x5E26;&#x53C2;&#x6570;
        // &#x53C2;&#x6570;&#x5982;&#x679C;&#x4E3A;&#x5BF9;&#x8C61;&#xFF0C;&#x662F;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#xFF0C;&#x5982;&#x679C;&#x9700;&#x8981;&#x8BBE;&#x7F6E;&#xFF0C;&#x8BF7;&#x6DF1;&#x5EA6;&#x514B;&#x9686;&#x4E00;&#x904D;
        instruct1 (sender, ...args) {
            // .... this &#x4E3A;&#x5F53;&#x524D;&#x7EC4;&#x4EF6;
        },
        instruct2 (sender, ...args) {

        }
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-comment">// Vue&#x4E2D;&#x589E;&#x52A0; &#x589E;&#x52A0;unicom&#x53C2;&#x6570;</span>
    <span class="hljs-comment">// &#x8FD9;&#x91CC;&#x7684;unicom&#xFF0C;&#x6307; &#x4E0A;&#x9762;&#x4F20;&#x5165;&#x7684;&#x53C2;&#x6570;</span>
    unicom: {
        <span class="hljs-comment">// instruct1&#xFF1A;&#x901A;&#x8BAF;&#x6307;&#x4EE4;</span>
        <span class="hljs-comment">// sender&#xFF1A;&#x53D1;&#x9001;&#x6307;&#x4EE4;&#x8005;&#xFF08;$vm&#xFF09;</span>
        <span class="hljs-comment">// args&#xFF1A;&#x6307;&#x4EE4;&#x53D1;&#x51FA;&#x8005;&#x9644;&#x5E26;&#x53C2;&#x6570;</span>
        <span class="hljs-comment">// &#x53C2;&#x6570;&#x5982;&#x679C;&#x4E3A;&#x5BF9;&#x8C61;&#xFF0C;&#x662F;&#x5F15;&#x7528;&#x7C7B;&#x578B;&#xFF0C;&#x5982;&#x679C;&#x9700;&#x8981;&#x8BBE;&#x7F6E;&#xFF0C;&#x8BF7;&#x6DF1;&#x5EA6;&#x514B;&#x9686;&#x4E00;&#x904D;</span>
        instruct1 (sender, ...args) {
            <span class="hljs-comment">// .... this &#x4E3A;&#x5F53;&#x524D;&#x7EC4;&#x4EF6;</span>
        },
        instruct2 (sender, ...args) {

        }
    }
}</code></pre><h4>5.2 &#x7EC4;&#x4EF6;&#x5185;&#x6CE8;&#x518C;&#x5206;&#x7EC4;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    // Vue&#x4E2D;&#x589E;&#x52A0; &#x589E;&#x52A0;unicomName&#x53C2;&#x6570;
    // &#x6307;&#x5B9A;&#x5206;&#x7EC4; &#x5C5E;&#x4E8E; group&#xFF0C; &#x6240;&#x6709;&#x5B9E;&#x4F8B;&#xFF0C;&#x90FD;&#x5C5E;&#x4E8E;&#x8FD9;&#x4E2A;&#x5206;&#x7EC4;
    unicomName: &apos;group&apos;
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-comment">// Vue&#x4E2D;&#x589E;&#x52A0; &#x589E;&#x52A0;unicomName&#x53C2;&#x6570;</span>
    <span class="hljs-comment">// &#x6307;&#x5B9A;&#x5206;&#x7EC4; &#x5C5E;&#x4E8E; group&#xFF0C; &#x6240;&#x6709;&#x5B9E;&#x4F8B;&#xFF0C;&#x90FD;&#x5C5E;&#x4E8E;&#x8FD9;&#x4E2A;&#x5206;&#x7EC4;</span>
    unicomName: <span class="hljs-string">&apos;group&apos;</span>
}</code></pre><h4>5.3 &#x7EC4;&#x4EF6;&#x52A0;&#x5165;&#x591A;&#x4E2A;&#x5206;&#x7EC4;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    // &#x7EC4;&#x4EF6;&#x53EF;&#x4EE5;&#x52A0;&#x5165;&#x591A;&#x4E2A;&#x5206;&#x7EC4;
    unicomName: [&apos;group1&apos;&#xFF0C; &apos;group2&apos;]
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-comment">// &#x7EC4;&#x4EF6;&#x53EF;&#x4EE5;&#x52A0;&#x5165;&#x591A;&#x4E2A;&#x5206;&#x7EC4;</span>
    unicomName: [<span class="hljs-string">&apos;group1&apos;</span>&#xFF0C; <span class="hljs-string">&apos;group2&apos;</span>]
}</code></pre><h4>5.4 &#x5B9E;&#x4F8B;&#x4E2D;&#x52A0;&#x5165;&#x7EC4;&#x4EF6;&#x5206;&#x7EC4;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!-- &#x52A0;&#x5165;group&#x5206;&#x7EC4; --&gt;
&lt;component unicom-name=&quot;group&quot;&gt;&lt;/component&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- &#x52A0;&#x5165;group&#x5206;&#x7EC4; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">unicom-name</span>=<span class="hljs-string">&quot;group&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span></code></pre><h4>5.5 &#x5B9E;&#x4F8B;&#x4E2D;&#x6307;&#x5B9A; unicomId</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!-- &#x6307;&#x5B9A;$vm&#x7684; id &#x4E3A; id1 --&gt;
&lt;component unicom-id=&quot;id1&quot;&gt;&lt;/component&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- &#x6307;&#x5B9A;$vm&#x7684; id &#x4E3A; id1 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">component</span> <span class="hljs-attr">unicom-id</span>=<span class="hljs-string">&quot;id1&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">component</span>&gt;</span></code></pre><h4>5.6 &#x7EC4;&#x4EF6;&#x5185;&#x53D1;&#x9001;&#x6307;&#x4EE4;</h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    methods:{
        method1 () {
            // &#x53D1;&#x9001; instruct1 &#x6307;&#x4EE4;&#xFF0C;&#x53C2;&#x6570;&#x4E3A; 1&#xFF0C; 2
            this.$unicom(&apos;instruct1&apos;, 1, 2)
        }
    }
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-attr">methods</span>:{
        method1 () {
            <span class="hljs-comment">// &#x53D1;&#x9001; instruct1 &#x6307;&#x4EE4;&#xFF0C;&#x53C2;&#x6570;&#x4E3A; 1&#xFF0C; 2</span>
            <span class="hljs-keyword">this</span>.$unicom(<span class="hljs-string">&apos;instruct1&apos;</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>)
        }
    }
}</code></pre><h4>5.7 &#x6307;&#x4EE4;&#x9AD8;&#x7EA7;&#x7528;&#x6CD5;</h4><blockquote>instruct1@group (&#x53D1;&#x9001;&#x5230;&#x6307;&#x5B9A;&#x5206;&#x7EC4;)<p>instruct1#id1 (&#x53D1;&#x9001;&#x5230;&#x6307;&#x5B9A;&#x7EC4;&#x4EF6;)</p><p>@group &#xFF08;&#x83B7;&#x53D6;&#x6307;&#x5B9A;&#x5206;&#x7EC4;&#x7EC4;&#x4EF6;&#xFF09;</p><p>#id1 &#xFF08;&#x83B7;&#x53D6;&#x6307;&#x5B9A;&#x7EC4;&#x4EF6;&#xFF09;</p></blockquote><h4>5.8 &#x5EF6;&#x8FDF;&#x53D1;&#x9001;&#x6307;&#x4EE4;&#xFF08;&#x4E00;&#x6B21;&#x6027;&#x6307;&#x4EE4;&#xFF09;</h4><p>&#x6307;&#x4EE4;&#x4F7F;&#x7528; ~ &#x6253;&#x5934;</p><blockquote>~instruct1 &#xFF08;&#x6307;&#x4EE4;&#x5EF6;&#x8FDF;&#x53D1;&#x9001;&#xFF0C;&#x76F4;&#x5230;&#x5305;&#x542B;&#x6709;instruct1&#x6307;&#x4EE4;&#x7684;&#x7EC4;&#x4EF6;&#x51FA;&#x73B0;&#xFF09;<p>~instruct1@group &#xFF08;&#x6307;&#x4EE4;&#x5EF6;&#x8FDF;&#x53D1;&#x9001;&#xFF0C;&#x76F4;&#x5230;&#x51FA;&#x73B0;&#x5206;&#x7EC4;&#x547D;&#x540D;group&#x7684;&#x7EC4;&#x4EF6;&#xFF09;</p><p>~instruct1#id1 &#xFF08;&#x6307;&#x4EE4;&#x5EF6;&#x8FDF;&#x53D1;&#x9001;&#xFF0C;&#x76F4;&#x5230;&#x51FA;&#x73B0;&#x547D;&#x540D;id1&#x7684;&#x7EC4;&#x4EF6;&#xFF09;</p></blockquote><h4>5.9 &#x7EC4;&#x4EF6;&#x76D1;&#x542C;</h4><p>&#x7EC4;&#x4EF6;&#x76D1;&#x542C;&#x4F7F;&#x7528;, &#x6307;&#x4EE4;&#x4F7F;&#x7528; ~ &#x6253;&#x5934;&#xFF0C; &#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x4E3A; callback</p><blockquote>&#xFF5E;@group &#xFF08;&#x76D1;&#x542C;&#x5206;&#x7EC4;&#x547D;&#x540D;group&#x7684;&#x7EC4;&#x4EF6;&#x51FA;&#x73B0;&#xFF09;<p>&#xFF5E;#id1 &#xFF08;&#x76D1;&#x542C;&#x547D;&#x540D;id1&#x7684;&#x7EC4;&#x4EF6;&#x51FA;&#x73B0;&#xFF09;</p><p>&#xFF5E; &#xFF08;&#x76D1;&#x542C;&#x4EFB;&#x610F;&#x65B0;&#x51FA;&#x73B0;&#x7684;&#x7EC4;&#x4EF6;&#xFF09;</p></blockquote><h2 id="articleHeader5">6.&#x7B80;&#x5355;&#x6E90;&#x7801;&#x89E3;&#x6790;</h2><p>&#x53EA;&#x505A;&#x57FA;&#x672C;&#x7684;&#x6E90;&#x7801;&#x89E3;&#x6790;&#xFF0C;&#x66F4;&#x52A0;&#x8BE6;&#x7EC6;&#x53EF;&#x4EE5;&#x54A8;&#x8BE2;<a href="https://github.com/szpoppy" rel="nofollow noreferrer" target="_blank">szpoppy</a></p><h4>6.1 &#x7528;ximin&#x505A;&#x63D2;&#x4EF6;&#xFF0C;prototype&#x5B9A;&#x4E49;&#x5168;&#x5C40;&#x51FD;&#x6570;(&#x63D2;&#x4EF6;&#x673A;&#x5236;&#x7684;&#x91CD;&#x70B9;)</h4><p>&#x5EFA;&#x8BAE;&#x5148;&#x9605;&#x8BFB;vue&#x63D2;&#x4EF6;&#x673A;&#x5236;<a href="https://cn.vuejs.org/v2/guide/plugins.html" rel="nofollow noreferrer" target="_blank">https://cn.vuejs.org/v2/guide/plugins.html</a><br><strong>&#x62FF;&#x5230;&#x6E90;&#x7801;&#x2018;unicom.js&#x2019;&#x7B2C;&#x4E00;&#x6B65;&#xFF0C;&#x5148;&#x7528;&#x7F16;&#x8BD1;&#x5668;&#x628A;&#x6240;&#x6709;&#x7684;&#x65B9;&#x6CD5;&#x90FD;&#x6536;&#x8D77;&#x6765;&#xFF0C;&#x9664;&#x4E86;install&#x51FD;&#x6570;</strong><br><strong>&#x63A5;&#x4E0B;&#x91CC;&#x6211;&#x4EEC;&#x91CD;&#x70B9;&#x4ECE;&#x5165;&#x53E3;install&#x770B;&#x8D77;&#xFF0C;&#x53E6;&#x5916;&#x5BFC;&#x5165;&#x63D2;&#x4EF6;&#x5E76;app.use&#x7684;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x7B2C;&#x4E00;&#x6B65;&#x5176;&#x5B9E;&#x5C31;&#x662F;&#x8C03;&#x7528;&#x7684;install&#x51FD;&#x6570;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function install(vue, {
        name = &apos;unicom&apos;,
        idName,
        groupName
    } = {}) {
        //&#x7B80;&#x5355;&#x51E0;&#x884C;&#x4EE3;&#x7801;&#x5224;&#x65AD;&#x662F;&#x5426;&#x5B89;&#x88C5;&#x8FC7;

        // &#x6DFB;&#x52A0;&#x539F;&#x578B;&#x65B9;&#x6CD5;&#xFF0C;&#x5168;&#x5C40;&#x7EC4;&#x4EF6;&#x8C03;&#x7528;
        vue.prototype[&apos;$&apos; + name] = unicomQuery

        // unicomIdName = &apos;unicomId&apos;        id&#x4F5C;&#x4E3A;&#x552F;&#x4E00;&#x6807;&#x8BC6;
        unicomIdName = idName || (name + &apos;Id&apos;)
        // unicomGroupName = &apos;unicomName&apos;       &#x5206;&#x7EC4;
        unicomGroupName = groupName || (name + &apos;Name&apos;)

        // &#x5168;&#x5C40;&#x6DF7;&#x5165;
        vue.mixin({
            props:
            watch:
            beforeCreate(){}
            created(){},
            destroyed(){}
        })

        // &#x81EA;&#x5B9A;&#x4E49;&#x5C5E;&#x6027;&#x5408;&#x5E76;&#x7B56;&#x7565;
        let merge = vue.config.optionMergeStrategies
        // &#x6539;&#x53D8;&#x4E86;&#x81EA;&#x5B9A;&#x4E49;&#x5C5E;&#x6027;unicomName&#x548C;unicom&#x7684;&#x5408;&#x5E76;&#x7B56;&#x7565;
        merge[name] = merge[unicomGroupName] = function (parentVal, childVal){ 
        //...
        }
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">install</span>(<span class="hljs-params">vue, {
        name = <span class="hljs-string">&apos;unicom&apos;</span>,
        idName,
        groupName
    } = {}</span>) </span>{
        <span class="hljs-comment">//&#x7B80;&#x5355;&#x51E0;&#x884C;&#x4EE3;&#x7801;&#x5224;&#x65AD;&#x662F;&#x5426;&#x5B89;&#x88C5;&#x8FC7;</span>

        <span class="hljs-comment">// &#x6DFB;&#x52A0;&#x539F;&#x578B;&#x65B9;&#x6CD5;&#xFF0C;&#x5168;&#x5C40;&#x7EC4;&#x4EF6;&#x8C03;&#x7528;</span>
        vue.prototype[<span class="hljs-string">&apos;$&apos;</span> + name] = unicomQuery

        <span class="hljs-comment">// unicomIdName = &apos;unicomId&apos;        id&#x4F5C;&#x4E3A;&#x552F;&#x4E00;&#x6807;&#x8BC6;</span>
        unicomIdName = idName || (name + <span class="hljs-string">&apos;Id&apos;</span>)
        <span class="hljs-comment">// unicomGroupName = &apos;unicomName&apos;       &#x5206;&#x7EC4;</span>
        unicomGroupName = groupName || (name + <span class="hljs-string">&apos;Name&apos;</span>)

        <span class="hljs-comment">// &#x5168;&#x5C40;&#x6DF7;&#x5165;</span>
        vue.mixin({
            <span class="hljs-attr">props</span>:
            watch:
            beforeCreate(){}
            created(){},
            destroyed(){}
        })

        <span class="hljs-comment">// &#x81EA;&#x5B9A;&#x4E49;&#x5C5E;&#x6027;&#x5408;&#x5E76;&#x7B56;&#x7565;</span>
        <span class="hljs-keyword">let</span> merge = vue.config.optionMergeStrategies
        <span class="hljs-comment">// &#x6539;&#x53D8;&#x4E86;&#x81EA;&#x5B9A;&#x4E49;&#x5C5E;&#x6027;unicomName&#x548C;unicom&#x7684;&#x5408;&#x5E76;&#x7B56;&#x7565;</span>
        merge[name] = merge[unicomGroupName] = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">parentVal, childVal</span>)</span>{ 
        <span class="hljs-comment">//...</span>
        }
    }</code></pre><p><strong>&#x5176;&#x5B9E;&#xFF0C;&#x6309;&#x7167;&#x8FD9;&#x6837;&#x4E00;&#x5212;&#x5206;&#xFF0C;&#x5927;&#x5BB6;&#x5F88;&#x7B80;&#x5355;&#x7684;&#x5C31;&#x80FD;&#x770B;&#x5230;&#x8FD9;&#x4E2A;&#x63D2;&#x4EF6;&#x7684;&#x5236;&#x4F5C;&#x90E8;&#x5206;&#x5927;&#x6982;&#x5C31;&#x5206;&#x8FD9;&#x51E0;&#x5757;&#xFF1A;</strong></p><h5>6.1.1 prototype</h5><p>&#x5229;&#x7528;vue&#x539F;&#x578B;&#x94FE;&#x6302;&#x8F7D;&#x4E00;&#x4E2A;&#x5168;&#x5C40;&#x7684;&#x2018;$unicom&#x2019;&#x65B9;&#x6CD5;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x5168;&#x5C40;&#x5185;&#x8C03;&#x7528;&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x4F5C;&#x4E3A;&#x7EC4;&#x4EF6;&#x5185;&#x8282;&#x70B9;click&#x65F6;&#x7684;&#x65B9;&#x6CD5;&#xFF0C;click&#x76F4;&#x63A5;&#x53D1;&#x9001;&#x6570;&#x636E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x7EC4;&#x4EF6;&#x884C;&#x7EA7;&#x8868;&#x8FBE;&#x5F0F;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;
&lt;button @click=&quot;$unicom(&apos;message&apos;, &apos;&#x901A;&#x7528;Send&apos;)&quot;&gt;&#x53D1;&#x9001;&#x6307;&#x4EE4; message&lt;/button&gt;     
&lt;button @click=&quot;$unicom(&apos;message@a&apos;, &apos;Send@a&apos;)&quot;&gt;&#x53D1;&#x9001;&#x6307;&#x4EE4; message@a&lt;/button&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash">// &#x7EC4;&#x4EF6;&#x884C;&#x7EA7;&#x8868;&#x8FBE;&#x5F0F;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;
&lt;button @click=<span class="hljs-string">&quot;<span class="hljs-variable">$unicom</span>(&apos;message&apos;, &apos;&#x901A;&#x7528;Send&apos;)&quot;</span>&gt;&#x53D1;&#x9001;&#x6307;&#x4EE4; message&lt;/button&gt;     
&lt;button @click=<span class="hljs-string">&quot;<span class="hljs-variable">$unicom</span>(&apos;message@a&apos;, &apos;Send@a&apos;)&quot;</span>&gt;&#x53D1;&#x9001;&#x6307;&#x4EE4; message@a&lt;/button&gt;</code></pre><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// &#x51FD;&#x6570;&#x5185;&#x76F4;&#x63A5;&#x8C03;&#x7528;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;
methods:{
      sendData(){
          this.$unicom(&apos;message@c&apos;, &apos;&#x6D4B;&#x8BD5;&#x6570;&#x636E;&apos;)
      }
}," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="bash hljs"><code class="bash">// &#x51FD;&#x6570;&#x5185;&#x76F4;&#x63A5;&#x8C03;&#x7528;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;
methods:{
      <span class="hljs-function"><span class="hljs-title">sendData</span></span>(){
          this.<span class="hljs-variable">$unicom</span>(<span class="hljs-string">&apos;message@c&apos;</span>, <span class="hljs-string">&apos;&#x6D4B;&#x8BD5;&#x6570;&#x636E;&apos;</span>)
      }
},</code></pre><h5>6.1.2 &#x5168;&#x5C40;&#x6DF7;&#x5165;mixin</h5><p>&#x5982;&#x4E0D;&#x4E86;&#x89E3;&#xFF0C;&#x5EFA;&#x8BAE;&#x9605;&#x8BFB;<a href="https://cn.vuejs.org/v2/guide/mixins.html" rel="nofollow noreferrer" target="_blank">https://cn.vuejs.org/v2/guide/mixins.html</a><br>&#x63D2;&#x4EF6;&#x903B;&#x8F91;&#x5904;&#x7406;&#x7684;&#x91CD;&#x70B9;&#x90E8;&#x5206;&#xFF1A;&#x5168;&#x5C40;&#x6DF7;&#x5165;mixin<br><strong>props</strong>&#xFF1A;&#x8FD9;&#x4E2A;&#x90E8;&#x5206;&#x975E;&#x5E38;&#x7B80;&#x5355;&#xFF0C;&#x5C31;&#x662F;&#x4E3A;&#x4E86;&#x8BA9;&#x6BCF;&#x4E2A;&#x7EC4;&#x4EF6;&#x90FD;&#x80FD;&#x5728;&#x7EC4;&#x4EF6;&#x8C03;&#x7528;&#x65F6;&#x4F20;&#x9012;&#x53D8;&#x91CF;&#x2018;unicom-id&#x2019;&#x6216;&#x8005;&#x2018;unicom-name&#x2019;&#xFF08;&#x4E00;&#x822C;&#x662F;&#x9759;&#x6001;&#x53D8;&#x91CF;&#xFF09;<br><strong>watch</strong>&#xFF1A;&#x8FD9;&#x4E2A;&#x90E8;&#x5206;&#x4E3B;&#x8981;&#x5C31;&#x662F;&#x5F53;&#x7EC4;&#x4EF6;&#x8C03;&#x7528;&#x65F6;&#x2018;unicom-id&#x2019;&#x6216;&#x8005;&#x2018;unicom-name&#x2019;&#x4F20;&#x9012;&#x8FC7;&#x6765;&#x7684;&#x662F;&#x52A8;&#x6001;&#x53D8;&#x91CF;&#x5BF9;&#x5176;&#x8FDB;&#x884C;&#x5B9E;&#x65F6;&#x76D1;&#x542C;<br><strong>beforeCreate</strong>&#xFF1A;&#x5728;&#x7EC4;&#x4EF6;&#x5DF2;&#x89E3;&#x6790;&#x4F46;&#x672A;&#x52A0;&#x8F7D;&#x65F6;&#xFF0C;&#x5229;&#x7528;&#x2018;this.$options&#x2019;&#x53BB;&#x83B7;&#x53D6;&#x81EA;&#x5B9A;&#x4E49;&#x2018;unicom&#x2019;&#x5C5E;&#x6027;&#xFF0C;&#x7136;&#x540E;&#x5728;&#x6BCF;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x5185;&#x52A0;&#x5165;&#x4E8B;&#x4EF6;&#x673A;&#x5236;&#xFF1B;&#x6700;&#x540E;&#x5229;&#x7528;Map&#x96C6;&#x5408;&#x4EE5;&#x7EC4;&#x4EF6;vm&#x4F5C;&#x4E3A;key&#xFF0C;&#x5C06;&#x8BE5;&#x7EC4;&#x4EF6;&#x7684;&#x5206;&#x7EC4;&#x548C;&#x901A;&#x4FE1;&#x51FD;&#x6570;&#x5408;&#x5E76;&#x7684;&#x5BF9;&#x8C61;&#x4F5C;&#x4E3A;value&#x5B58;&#x8D77;&#x6765;<br><strong>created</strong>&#xFF1A;&#x5728;&#x7EC4;&#x4EF6;&#x5DF2;&#x7ECF;&#x89E3;&#x6790;&#x548C;&#x8F7D;&#x5165;&#x5230;dom&#x7ED3;&#x6784;&#x4E4B;&#x540E;&#xFF0C;&#x4ECE;Map&#x96C6;&#x5408;&#x4E2D;&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x7EC4;&#x4EF6;&#x7684;&#x5206;&#x7EC4;&#x548C;&#x901A;&#x4FE1;&#x51FD;&#x6570;&#x4FE1;&#x606F;&#xFF0C;&#x5224;&#x65AD;&#x662F;&#x5426;&#x6709;&#x5176;&#x5B83;&#x7EC4;&#x4EF6;&#x5728;&#x5F53;&#x524D;&#x7EC4;&#x4EF6;&#x672A;&#x521B;&#x5EFA;&#x4E4B;&#x524D;&#x7ED9;&#x5B83;&#x53D1;&#x9001;&#x4E86;&#x6570;&#x636E;&#xFF0C;&#x5982;&#x679C;&#x6709;&#xFF0C;&#x54CD;&#x5E94;&#x8BE5;&#x5EF6;&#x8FDF;&#x53D1;&#x9001;&#x7684;&#x6570;&#x636E;<br><strong>destroyed</strong>&#xFF1A;&#x7EC4;&#x4EF6;&#x9500;&#x6BC1;&#x903B;&#x8F91;</p><h5>6.1.3 &#x81EA;&#x5B9A;&#x4E49;&#x5C5E;&#x6027;&#x7684;&#x6DF7;&#x5408;&#x7B56;&#x7565;optionMergeStrategies</h5><p>&#x5982;&#x4E0D;&#x4E86;&#x89E3;&#xFF0C;&#x5EFA;&#x8BAE;&#x9605;&#x8BFB;<a href="https://cn.vuejs.org/v2/guide/mixins.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E9%80%89%E9%A1%B9%E5%90%88%E5%B9%B6%E7%AD%96%E7%95%A5" rel="nofollow noreferrer" target="_blank">vue&#x4E2D;&#x7684;optionMergeStrategies</a><br>&#x8FD9;&#x4E2A;&#x90E8;&#x5206;&#x770B;&#x8D77;&#x6765;&#x7B80;&#x5355;&#x7684;&#x51E0;&#x884C;&#xFF0C;&#x5176;&#x5B9E;&#x5374;&#x662F;&#x4E2A;&#x63D2;&#x4EF6;&#x5F00;&#x53D1;&#x8FC7;&#x7A0B;&#x4E2D;&#x6BD4;&#x8F83;&#x91CD;&#x70B9;&#x7684;&#x90E8;&#x5206;<br>&#x5982;&#x4F55;&#x7406;&#x89E3;&#x8FD9;&#x4E2A;&#x2018;optionMergeStrategies&#x2019;&#x5462;&#xFF1F;&#x8BE5;&#x7EC4;&#x4EF6;&#x4E3B;&#x8981;&#x9488;&#x5BF9;&#x81EA;&#x5B9A;&#x4E49;option&#x5C5E;&#x6027;&#x7684;&#x6DF7;&#x5408;&#xFF1B;&#x5B98;&#x65B9;&#x89E3;&#x91CA;&#x662F;&#xFF1A;&#x2019;&#x5F53;&#x7EC4;&#x4EF6;&#x548C;&#x6DF7;&#x5165;&#x5BF9;&#x8C61;&#x542B;&#x6709;&#x540C;&#x540D;&#x9009;&#x9879;&#x65F6;&#xFF0C;&#x8FD9;&#x4E9B;&#x9009;&#x9879;&#x5C06;&#x4EE5;&#x6070;&#x5F53;&#x7684;&#x65B9;&#x5F0F;&#x6DF7;&#x5408;&#x2018;&#x3002;<br>&#x80AF;&#x5B9A;&#x5F88;&#x591A;&#x4EBA;&#x8FD8;&#x662F;&#x4E0D;&#x660E;&#x767D;&#xFF0C;&#x5176;&#x5B9E;&#x8BF4;&#x5B9E;&#x8BDD;&#x6211;&#x4E5F;&#x4E0D;&#x7B97;&#x660E;&#x767D;&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x7B80;&#x5355;&#x89E3;&#x91CA;&#x4E00;&#x4E0B;&#xFF1A;</p><ol><li>&#x8FD9;&#x4E2A;&#x4E1C;&#x897F;&#x5177;&#x4F53;&#x7684;&#x4F7F;&#x7528;&#x4F60;&#x5176;&#x5B9E;&#x53EF;&#x4EE5;&#x4ED4;&#x7EC6;&#x7684;&#x770B;&#x770B;vuex&#x5BF9;&#x8FD9;&#x4E2A;&#x7684;&#x4F7F;&#x7528;&#x548C;&#x2018;vue-unicom&#x2019;&#x4E2D;optionMergeStrategies&#x7684;&#x4F7F;&#x7528;</li><li>&#x5B98;&#x7F51;&#x7684;&#x8FD9;&#x53E5;&#x2018;&#x5F53;&#x7EC4;&#x4EF6;&#x548C;&#x6DF7;&#x5165;&#x5BF9;&#x8C61;&#x542B;&#x6709;&#x540C;&#x540D;&#x9009;&#x9879;&#x65F6;&#xFF0C;&#x8FD9;&#x4E9B;&#x9009;&#x9879;&#x5C06;&#x4EE5;&#x6070;&#x5F53;&#x7684;&#x65B9;&#x5F0F;&#x6DF7;&#x5408;&#x2019;&#x662F;&#x5F88;&#x900F;&#x5F7B;&#x7684;&#x5728;&#x8BB2;&#x8FD9;&#x4E2A;&#x4E1C;&#x897F;&#x7684;&#x6982;&#x5FF5;</li><li>&#x5728;&#x2018;vue-unicom&#x2019;&#x63D2;&#x4EF6;&#x4E2D;optionMergeStrategies&#x6709;&#x4E24;&#x4E2A;&#x7528;&#x5904;&#xFF0C;&#x4E00;&#x822C;&#x60C5;&#x51B5;&#x4E0B;&#x4E3B;&#x8981;&#x662F;&#x5C06;&#x2018;unicom-id&#x2019;&#x548C;&#x2018;vue-unicom&#x2019;&#x4ECE;&#x539F;&#x672C;&#x6570;&#x636E;&#x683C;&#x5F0F;&#x53D8;&#x6210;&#x6570;&#x7EC4;&#xFF1B;&#x4F46;&#x662F;&#xFF0C;&#x5982;&#x679C;&#x5F53;&#x524D;&#x7EC4;&#x4EF6;&#x6216;&#x8005;vue&#x5168;&#x5C40;&#x88AB;&#x6DF7;&#x5165;&#x4E86;&#x548C;&#x6211;&#x4EEC;&#x63D2;&#x4EF6;&#x81EA;&#x5B9A;&#x4E49;option&#x5C5E;&#x6027;&#x540C;&#x540D;&#x7684;&#x53D8;&#x91CF;&#xFF0C;&#x9ED8;&#x8BA4;&#x7684;&#x5408;&#x5E76;&#x7B56;&#x7565;&#x662F;&#x540E;&#x9762;&#x5B9A;&#x4E49;&#x7684;option&#x5C5E;&#x6027;&#x8986;&#x76D6;&#x524D;&#x9762;&#x7684;&#xFF0C;&#x4F46;&#x662F;&#x6211;&#x4EEC;&#x8FD9;&#x91CC;&#x5BF9;&#x5408;&#x5E76;&#x7B56;&#x7565;&#x8FDB;&#x884C;&#x4E86;&#x91CD;&#x5199;&#xFF0C;&#x5C31;&#x53EF;&#x4EE5;&#x4FDD;&#x8BC1;&#x5F53;&#x524D;&#x7EC4;&#x4EF6;&#x4E0A;&#x6240;&#x6709;&#x7684;&#x2018;unicom-id&#x2019;&#x6216;&#x8005;&#x2018;vue-unicom&#x2019;&#x5C5E;&#x6027;&#x90FD;&#x88AB;push&#x5230;&#x4E00;&#x4E2A;&#x6570;&#x7EC4;&#x4E2D;&#x5E76;&#x6302;&#x8F7D;&#x5728;&#x5F53;&#x524D;&#x7EC4;&#x4EF6;&#x4E0A;</li></ol><p>&#x7B80;&#x5355;&#x7406;&#x89E3;&#x5B83;&#x5728;&#x5F53;&#x524D;&#x63D2;&#x4EF6;&#x7684;&#x4F5C;&#x7528;&#xFF1A;&#x5B50;&#x7EC4;&#x4EF6;&#x548C;&#x4E0A;&#x5C42;&#x7EC4;&#x4EF6;&#x6709;&#x76F8;&#x540C;option&#x5C5E;&#x6027;&#x65F6;&#xFF0C;&#x8BA9;&#x5B50;&#x7EC4;&#x4EF6;&#x6B63;&#x786E;&#x5408;&#x5E76;&#x4E0A;&#x5C42;&#x7EC4;&#x4EF6;&#x7684;&#x81EA;&#x5B9A;&#x4E49;&#x5C5E;&#x6027;</p><h4>6.2 &#x4E3A;&#x4EC0;&#x4E48;&#x53EF;&#x4EE5;&#x5728;&#x7EC4;&#x4EF6;&#x4E0A;&#x76F4;&#x63A5;&#x5199;&#x2018;unicomName&#x2019;&#x3001;&#x2018;unicom&#x2019;</h4><p>&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x5F88;&#x80AF;&#x5B9A;&#x4E00;&#x70B9;&#xFF1A;<strong>vue&#x672C;&#x8EAB;&#x5E76;&#x6CA1;&#x6709;&#x8FD9;&#x4E24;&#x4E2A;option&#x5C5E;&#x6027;&#xFF0C;&#x751A;&#x81F3;&#x5F88;&#x53EF;&#x80FD;&#x5F88;&#x591A;&#x4EBA;&#x4E5F;&#x4ECE;&#x6765;&#x6CA1;&#x6709;&#x81EA;&#x5DF1;&#x5728;&#x7EC4;&#x4EF6;&#x58F0;&#x660E;&#x65F6;&#x81EA;&#x5B9A;&#x4E49;options&#x5C5E;&#x6027;</strong><br>&#x5982;&#x679C;&#x4F60;&#x6CA1;&#x6709;&#x8BD5;&#x8FC7;&#xFF0C;&#x4E5F;&#x6CA1;&#x6709;&#x5173;&#x7CFB;&#xFF0C;&#x770B;&#x4E86;&#x672C;&#x7BC7;&#x6587;&#x7AE0;&#x4E4B;&#x540E;&#x4F60;&#x5C31;&#x77E5;&#x9053;&#x4E86;<br>&#x4E3A;&#x4EC0;&#x4E48;&#x6211;&#x4EEC;&#x8981;&#x81EA;&#x5B9A;&#x4E49;option&#x5C5E;&#x6027;&#x5462;&#xFF1F;&#x8FD9;&#x4E24;&#x4E2A;&#x5C5E;&#x6027;&#x7684;&#x4F5C;&#x7528;&#x5F88;&#x660E;&#x786E;&#xFF0C;&#x2018;unicomName&#x2019;&#x662F;&#x505A;&#x5206;&#x7EC4;&#x58F0;&#x660E;&#x7684;&#xFF0C;&#x2018;unicom&#x2019;&#x662F;&#x505A;&#x901A;&#x4FE1;&#x51FD;&#x6570;&#x7684;&#xFF1B;&#x7136;&#x540E;&#x5728;mixin&#x7684;&#x5404;&#x4E2A;&#x751F;&#x547D;&#x5468;&#x671F;&#x518D;&#x5229;&#x7528;&#x2018;this.$options&#x2019;&#x83B7;&#x53D6;&#x81EA;&#x5B9A;&#x4E49;option&#x5C5E;&#x6027;&#x8FDB;&#x884C;&#x8FDB;&#x4E00;&#x6B65;&#x7684;&#x903B;&#x8F91;&#x5904;&#x7406;&#xFF0C;&#x5E76;&#x58F0;&#x660E;optionMergeStrategies&#x5408;&#x5E76;&#x7B56;&#x7565;</p><h4>6.3 &#x5F53;&#x524D;&#x7EC4;&#x4EF6;&#x7684;&#x4E00;&#x4E2A;&#x4EAE;&#x70B9;</h4><p><strong>&#x5229;&#x7528;map&#x96C6;&#x5408;&#x4EE5;&#x7EC4;&#x4EF6;vm&#x4E3A;&#x5355;&#x4F4D;&#x5B58;&#x50A8;&#x8BE5;&#x7EC4;&#x4EF6;&#x7684;&#x5206;&#x7EC4;&#x548C;&#x901A;&#x4FE1;&#x51FD;&#x6570;</strong><br>&#x6BCF;&#x6B21;&#x5B58;&#x901A;&#x4FE1;&#x51FD;&#x6570;&#x3001;&#x5206;&#x7EC4;&#x7684;&#x65F6;&#x5019;&#x90FD;&#x4F1A;&#x628A;&#x5BF9;&#x5E94;&#x7684;vm&#x5B9E;&#x4F8B;&#x5B58;&#x50A8;&#x4E0B;&#x6765;&#xFF0C;&#x6240;&#x4EE5;&#x8981;&#x627E;&#x901A;&#x4FE1;&#x51FD;&#x6570;&#x6216;&#x8005;&#x5BF9;&#x5E94;&#x5206;&#x7EC4;&#x5C31;&#x975E;&#x5E38;&#x7B80;&#x5355;</p><p>&#x8FD9;&#x4E2A;&#x7EC4;&#x4EF6;&#x8F83;&#x6211;&#x4E00;&#x5F00;&#x59CB;&#x4F7F;&#x7528;&#x5DF2;&#x7ECF;&#x7ECF;&#x8FC7;&#x4E86;&#x4E00;&#x6B21;&#x5BF9;&#x4EE3;&#x7801;&#x66F4;&#x52A0;&#x76F4;&#x89C2;&#x7684;&#x6539;&#x8FDB;&#xFF0C;&#x4E2A;&#x4EBA;&#x89C9;&#x5F97;&#x975E;&#x5E38;&#x503C;&#x5F97;&#x5927;&#x5BB6;&#x9605;&#x8BFB;&#x548C;&#x4F7F;&#x7528;&#xFF0C;&#x5F00;&#x6E90;&#x4E0D;&#x6613;&#xFF0C;&#x52A1;&#x5FC5;&#x70B9;&#x4E2A;star</p><p>&quot;vue-unicom&quot;&#x7684;&#x4F5C;&#x8005;&#xFF1A;<a href="https://github.com/szpoppy" rel="nofollow noreferrer" target="_blank">szpoppy</a>&#xFF0C;&#x5982;&#x679C;&#x89C9;&#x5F97;&#x5BF9;&#x4F60;&#x6709;&#x7528;&#xFF0C;&#x8BF7;&#x4E00;&#x5B9A;&#x70B9;&#x4E2A;star&#xFF0C;welcom</p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
自制vue组件通信插件:教你如何用mixin写插件

## 原文链接
[https://segmentfault.com/a/1190000015554464](https://segmentfault.com/a/1190000015554464)

