---
title: vue-router页面跳转 以及页面配置
reprint: true
categories: reprint
abbrlink: c5b6aaa6
date: 2018-11-06 02:30:12
---

{{% raw %}}
<p>&#x6628;&#x5929;&#x81EA;&#x5DF1;&#x5728;&#x5BB6;&#x505A;&#x4E86;&#x4E00;&#x4E2A;&#x524D;&#x7AEF;&#x4E0A;&#x7EBF;&#x7CFB;&#x7EDF;&#xFF0C;&#x4F7F;&#x7528;&#x5230;&#x7684;&#x6280;&#x672F;&#x6709;VUE&#x6846;&#x67B6;&#xFF0C;element-ui, vue-router<br>&#x4F20;&#x9001;&#x95E8;&#xFF1A;<a href="https://github.com/liyang1234567890/online-project" rel="nofollow noreferrer" target="_blank">https://github.com/liyang1234...</a><br>&#x9875;&#x9762;&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhLN4?w=1297&amp;h=662" src="https://static.alili.tech/img/bVbhLN4?w=1297&amp;h=662" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/bVbhLN8?w=1297&amp;h=662" src="https://static.alili.tech/img/bVbhLN8?w=1297&amp;h=662" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p><span class="img-wrap"><img data-src="/img/bVbhLN9?w=1364&amp;h=662" src="https://static.alili.tech/img/bVbhLN9?w=1364&amp;h=662" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x5176;&#x4E2D;&#x7684;router&#x7684;&#x4F7F;&#x7528;&#x65B9;&#x6CD5;&#x548C;&#x4E00;&#x4E9B;&#x914D;&#x7F6E;&#x6587;&#x4EF6; webpack&#x5165;&#x53E3;&#x6587;&#x4EF6;main.js,router&#x7684;index.js&#x5185;&#x5BB9;&#x5982;&#x4E0B;&#xFF1A;</p><h2 id="articleHeader0">&#x4F7F;&#x7528;router</h2><p><strong>&#x5B98;&#x65B9;&#x4F8B;&#x5B50;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script src=&quot;https://unpkg.com/vue/dist/vue.js&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;https://unpkg.com/vue-router/dist/vue-router.js&quot;&gt;&lt;/script&gt;

&lt;div id=&quot;app&quot;&gt;
    &lt;h1&gt;Hello App!&lt;/h1&gt;
    &lt;p&gt;
        &lt;!-- &#x4F7F;&#x7528; router-link &#x7EC4;&#x4EF6;&#x6765;&#x5BFC;&#x822A;. --&gt;
        &lt;!-- &#x901A;&#x8FC7;&#x4F20;&#x5165; `to` &#x5C5E;&#x6027;&#x6307;&#x5B9A;&#x94FE;&#x63A5;. --&gt;
        &lt;!-- &lt;router-link&gt; &#x9ED8;&#x8BA4;&#x4F1A;&#x88AB;&#x6E32;&#x67D3;&#x6210;&#x4E00;&#x4E2A; `&lt;a&gt;` &#x6807;&#x7B7E; --&gt;
        &lt;router-link to=&quot;/foo&quot;&gt;Go to Foo&lt;/router-link&gt;
        &lt;router-link to=&quot;/bar&quot;&gt;Go to Bar&lt;/router-link&gt;
    &lt;/p&gt;
    &lt;!-- &#x8DEF;&#x7531;&#x51FA;&#x53E3; --&gt;
    &lt;!-- &#x8DEF;&#x7531;&#x5339;&#x914D;&#x5230;&#x7684;&#x7EC4;&#x4EF6;&#x5C06;&#x6E32;&#x67D3;&#x5728;&#x8FD9;&#x91CC; --&gt;
    &lt;router-view&gt;&lt;/router-view&gt;
&lt;/div&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://unpkg.com/vue/dist/vue.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;https://unpkg.com/vue-router/dist/vue-router.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello App!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- &#x4F7F;&#x7528; router-link &#x7EC4;&#x4EF6;&#x6765;&#x5BFC;&#x822A;. --&gt;</span>
        <span class="hljs-comment">&lt;!-- &#x901A;&#x8FC7;&#x4F20;&#x5165; `to` &#x5C5E;&#x6027;&#x6307;&#x5B9A;&#x94FE;&#x63A5;. --&gt;</span>
        <span class="hljs-comment">&lt;!-- &lt;router-link&gt; &#x9ED8;&#x8BA4;&#x4F1A;&#x88AB;&#x6E32;&#x67D3;&#x6210;&#x4E00;&#x4E2A; `&lt;a&gt;` &#x6807;&#x7B7E; --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;/foo&quot;</span>&gt;</span>Go to Foo<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;/bar&quot;</span>&gt;</span>Go to Bar<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- &#x8DEF;&#x7531;&#x51FA;&#x53E3; --&gt;</span>
    <span class="hljs-comment">&lt;!-- &#x8DEF;&#x7531;&#x5339;&#x914D;&#x5230;&#x7684;&#x7EC4;&#x4EF6;&#x5C06;&#x6E32;&#x67D3;&#x5728;&#x8FD9;&#x91CC; --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre><ul><li>router-link&#x6807;&#x7B7E;&#xFF1A;&#x8DF3;&#x8F6C;&#x7684;&#x94FE;&#x63A5;&#xFF0C;to=&quot;&quot;&#x662F;&#x5FC5;&#x987B;&#x7684;&#x5C5E;&#x6027;&#xFF0C;&#x53CC;&#x5F15;&#x53F7;&#x4E2D;&#x7684;&#x5185;&#x5BB9;&#x662F;&#x6211;&#x4EEC;&#x63A5;&#x4E0B;&#x6765;&#x5728;JS&#x6587;&#x4EF6;&#x4E2D;&#x5B9A;&#x4E49;&#x7684;&#x8DEF;&#x7531;path&#x3002;</li><li>router-view&#x6807;&#x7B7E;&#xFF1A;&#x5C55;&#x793A;&#x6211;&#x4EEC;&#x5339;&#x914D;&#x5230;&#x7684;&#x7EC4;&#x4EF6;&#x7684;&#x533A;&#x57DF;</li></ul><p><strong>router-link&#x7684;&#x4E00;&#x4E9B;&#x5C5E;&#x6027;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//to&#x5C5E;&#x6027; string|object
&lt;!-- &#x5B57;&#x7B26;&#x4E32; --&gt;
&lt;router-link to=&quot;home&quot;&gt;Home&lt;/router-link&gt;
&lt;!-- &#x6E32;&#x67D3;&#x7ED3;&#x679C; --&gt;
&lt;a href=&quot;home&quot;&gt;Home&lt;/a&gt;
 
&lt;!-- &#x4F7F;&#x7528; v-bind &#x7684; JS &#x8868;&#x8FBE;&#x5F0F; --&gt;
&lt;router-link v-bind:to=&quot;&apos;home&apos;&quot;&gt;Home&lt;/router-link&gt;
&lt;!-- &#x540C;&#x4E0A; --&gt;
&lt;router-link :to=&quot;{ path: &apos;home&apos; }&quot;&gt;Home&lt;/router-link&gt;
 
&lt;!-- &#x547D;&#x540D;&#x7684;&#x8DEF;&#x7531; --&gt;
&lt;router-link :to=&quot;{ name: &apos;user&apos;, params: { userId: 123 }}&quot;&gt;User&lt;/router-link&gt;
 
&lt;!-- &#x5E26;&#x67E5;&#x8BE2;&#x53C2;&#x6570;&#xFF0C;&#x4E0B;&#x9762;&#x7684;&#x7ED3;&#x679C;&#x4E3A; /register?plan=private --&gt;
&lt;router-link :to=&quot;{ path: &apos;register&apos;, query: { plan: &apos;private&apos; }}&quot;&gt;Register&lt;/router-link&gt;
 
//replace&#x5C5E;&#x6027; true|false &#x4E0D;&#x7559;&#x4E0B; history &#x8BB0;&#x5F55;&#x3002;
&lt;router-link to=&quot;home&quot; replace&gt;Home&lt;/router-link&gt;
 
//append&#x5C5E;&#x6027; true|false &#x8FFD;&#x52A0;&#x8DEF;&#x5F84;
&lt;router-link to=&quot;home&quot; append &gt;Home&lt;/router-link&gt;
 
//tag&#x5C5E;&#x6027; string &#x8BBE;&#x7F6E;&#x6E32;&#x67D3;&#x6807;&#x7B7E;
&lt;router-link to=&quot;/foo&quot; tag=&quot;li&quot;&gt;foo&lt;/router-link&gt;
&lt;!-- &#x6E32;&#x67D3;&#x7ED3;&#x679C; --&gt;
&lt;li&gt;foo&lt;/li&gt;
 
//active-class &#x5C5E;&#x6027; string &#x6FC0;&#x6D3B;&#x65F6;&#x4F7F;&#x7528;&#x7684; CSS &#x7C7B;&#x540D;

    // 0. &#x5982;&#x679C;&#x4F7F;&#x7528;&#x6A21;&#x5757;&#x5316;&#x673A;&#x5236;&#x7F16;&#x7A0B;&#xFF0C;&#x5BFC;&#x5165;Vue&#x548C;VueRouter&#xFF0C;&#x8981;&#x8C03;&#x7528; Vue.use(VueRouter)
     
    // 1. &#x5B9A;&#x4E49;&#xFF08;&#x8DEF;&#x7531;&#xFF09;&#x7EC4;&#x4EF6;&#x3002;
    // &#x4E5F;&#x53EF;&#x4EE5;&#x4ECE;&#x5176;&#x4ED6;&#x6587;&#x4EF6; import &#x8FDB;&#x6765;
    const Foo = { template: &apos;&lt;div&gt;foo&lt;/div&gt;&apos; }
    const Bar = { template: &apos;&lt;div&gt;bar&lt;/div&gt;&apos; }
     
    // 2. &#x5B9A;&#x4E49;&#x8DEF;&#x7531;
    // &#x6BCF;&#x4E2A;&#x8DEF;&#x7531;&#x5E94;&#x8BE5;&#x6620;&#x5C04;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x3002; &#x5176;&#x4E2D;&quot;component&quot; &#x53EF;&#x4EE5;&#x662F;
    // &#x901A;&#x8FC7; Vue.extend() &#x521B;&#x5EFA;&#x7684;&#x7EC4;&#x4EF6;&#x6784;&#x9020;&#x5668;&#xFF0C;
    // &#x6216;&#x8005;&#xFF0C;&#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x914D;&#x7F6E;&#x5BF9;&#x8C61;&#x3002;
    const routes = [
        { path: &apos;/foo&apos;, component: Foo },
        { path: &apos;/bar&apos;, component: Bar }
    ]
     
    // 3. &#x521B;&#x5EFA; router &#x5B9E;&#x4F8B;&#xFF0C;&#x7136;&#x540E;&#x4F20; `routes` &#x914D;&#x7F6E;
    // &#x4F60;&#x8FD8;&#x53EF;&#x4EE5;&#x4F20;&#x522B;&#x7684;&#x914D;&#x7F6E;&#x53C2;&#x6570;, &#x4E0D;&#x8FC7;&#x5148;&#x8FD9;&#x4E48;&#x7B80;&#x5355;&#x7740;&#x5427;&#x3002;
    const router = new VueRouter({
        routes // &#xFF08;&#x7F29;&#x5199;&#xFF09;&#x76F8;&#x5F53;&#x4E8E; routes: routes
    })
     
    // 4. &#x521B;&#x5EFA;&#x548C;&#x6302;&#x8F7D;&#x6839;&#x5B9E;&#x4F8B;&#x3002;
    // &#x8BB0;&#x5F97;&#x8981;&#x901A;&#x8FC7; router &#x914D;&#x7F6E;&#x53C2;&#x6570;&#x6CE8;&#x5165;&#x8DEF;&#x7531;&#xFF0C;
    // &#x4ECE;&#x800C;&#x8BA9;&#x6574;&#x4E2A;&#x5E94;&#x7528;&#x90FD;&#x6709;&#x8DEF;&#x7531;&#x529F;&#x80FD;
    const app = new Vue({
        router
    }).$mount(&apos;#app&apos;)
     
    // &#x73B0;&#x5728;&#xFF0C;&#x5E94;&#x7528;&#x5DF2;&#x7ECF;&#x542F;&#x52A8;&#x4E86;&#xFF01;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dust"><code><span class="xml">//to&#x5C5E;&#x6027; string|object
<span class="hljs-comment">&lt;!-- &#x5B57;&#x7B26;&#x4E32; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;home&quot;</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
<span class="hljs-comment">&lt;!-- &#x6E32;&#x67D3;&#x7ED3;&#x679C; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;home&quot;</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
 
<span class="hljs-comment">&lt;!-- &#x4F7F;&#x7528; v-bind &#x7684; JS &#x8868;&#x8FBE;&#x5F0F; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">v-bind:to</span>=<span class="hljs-string">&quot;&apos;home&apos;&quot;</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
<span class="hljs-comment">&lt;!-- &#x540C;&#x4E0A; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">:to</span>=<span class="hljs-string">&quot;</span></span></span><span class="hljs-template-variable">{ path: &apos;home&apos; }</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">&quot;</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
 
<span class="hljs-comment">&lt;!-- &#x547D;&#x540D;&#x7684;&#x8DEF;&#x7531; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">:to</span>=<span class="hljs-string">&quot;</span></span></span><span class="hljs-template-variable">{ name: &apos;user&apos;, params: { userId: 123 }</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">}&quot;</span>&gt;</span>User<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
 
<span class="hljs-comment">&lt;!-- &#x5E26;&#x67E5;&#x8BE2;&#x53C2;&#x6570;&#xFF0C;&#x4E0B;&#x9762;&#x7684;&#x7ED3;&#x679C;&#x4E3A; /register?plan=private --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">:to</span>=<span class="hljs-string">&quot;</span></span></span><span class="hljs-template-variable">{ path: &apos;register&apos;, query: { plan: &apos;private&apos; }</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">}&quot;</span>&gt;</span>Register<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
 
//replace&#x5C5E;&#x6027; true|false &#x4E0D;&#x7559;&#x4E0B; history &#x8BB0;&#x5F55;&#x3002;
<span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;home&quot;</span> <span class="hljs-attr">replace</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
 
//append&#x5C5E;&#x6027; true|false &#x8FFD;&#x52A0;&#x8DEF;&#x5F84;
<span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;home&quot;</span> <span class="hljs-attr">append</span> &gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
 
//tag&#x5C5E;&#x6027; string &#x8BBE;&#x7F6E;&#x6E32;&#x67D3;&#x6807;&#x7B7E;
<span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">&quot;/foo&quot;</span> <span class="hljs-attr">tag</span>=<span class="hljs-string">&quot;li&quot;</span>&gt;</span>foo<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
<span class="hljs-comment">&lt;!-- &#x6E32;&#x67D3;&#x7ED3;&#x679C; --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>foo<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
 
//active-class &#x5C5E;&#x6027; string &#x6FC0;&#x6D3B;&#x65F6;&#x4F7F;&#x7528;&#x7684; CSS &#x7C7B;&#x540D;

    // 0. &#x5982;&#x679C;&#x4F7F;&#x7528;&#x6A21;&#x5757;&#x5316;&#x673A;&#x5236;&#x7F16;&#x7A0B;&#xFF0C;&#x5BFC;&#x5165;Vue&#x548C;VueRouter&#xFF0C;&#x8981;&#x8C03;&#x7528; Vue.use(VueRouter)
     
    // 1. &#x5B9A;&#x4E49;&#xFF08;&#x8DEF;&#x7531;&#xFF09;&#x7EC4;&#x4EF6;&#x3002;
    // &#x4E5F;&#x53EF;&#x4EE5;&#x4ECE;&#x5176;&#x4ED6;&#x6587;&#x4EF6; import &#x8FDB;&#x6765;
    const Foo = </span><span class="hljs-template-variable">{ template: &apos;&lt;div&gt;foo&lt;/div&gt;&apos; }</span><span class="xml">
    const Bar = </span><span class="hljs-template-variable">{ template: &apos;&lt;div&gt;bar&lt;/div&gt;&apos; }</span><span class="xml">
     
    // 2. &#x5B9A;&#x4E49;&#x8DEF;&#x7531;
    // &#x6BCF;&#x4E2A;&#x8DEF;&#x7531;&#x5E94;&#x8BE5;&#x6620;&#x5C04;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x3002; &#x5176;&#x4E2D;&quot;component&quot; &#x53EF;&#x4EE5;&#x662F;
    // &#x901A;&#x8FC7; Vue.extend() &#x521B;&#x5EFA;&#x7684;&#x7EC4;&#x4EF6;&#x6784;&#x9020;&#x5668;&#xFF0C;
    // &#x6216;&#x8005;&#xFF0C;&#x53EA;&#x662F;&#x4E00;&#x4E2A;&#x7EC4;&#x4EF6;&#x914D;&#x7F6E;&#x5BF9;&#x8C61;&#x3002;
    const routes = [
        </span><span class="hljs-template-variable">{ path: &apos;/foo&apos;, component: Foo }</span><span class="xml">,
        </span><span class="hljs-template-variable">{ path: &apos;/bar&apos;, component: Bar }</span><span class="xml">
    ]
     
    // 3. &#x521B;&#x5EFA; router &#x5B9E;&#x4F8B;&#xFF0C;&#x7136;&#x540E;&#x4F20; `routes` &#x914D;&#x7F6E;
    // &#x4F60;&#x8FD8;&#x53EF;&#x4EE5;&#x4F20;&#x522B;&#x7684;&#x914D;&#x7F6E;&#x53C2;&#x6570;, &#x4E0D;&#x8FC7;&#x5148;&#x8FD9;&#x4E48;&#x7B80;&#x5355;&#x7740;&#x5427;&#x3002;
    const router = new VueRouter(</span><span class="hljs-template-variable">{
        routes // &#xFF08;&#x7F29;&#x5199;&#xFF09;&#x76F8;&#x5F53;&#x4E8E; routes: routes
    }</span><span class="xml">)
     
    // 4. &#x521B;&#x5EFA;&#x548C;&#x6302;&#x8F7D;&#x6839;&#x5B9E;&#x4F8B;&#x3002;
    // &#x8BB0;&#x5F97;&#x8981;&#x901A;&#x8FC7; router &#x914D;&#x7F6E;&#x53C2;&#x6570;&#x6CE8;&#x5165;&#x8DEF;&#x7531;&#xFF0C;
    // &#x4ECE;&#x800C;&#x8BA9;&#x6574;&#x4E2A;&#x5E94;&#x7528;&#x90FD;&#x6709;&#x8DEF;&#x7531;&#x529F;&#x80FD;
    const app = new Vue(</span><span class="hljs-template-variable">{
        router
    }</span><span class="xml">).$mount(&apos;#app&apos;)
     
    // &#x73B0;&#x5728;&#xFF0C;&#x5E94;&#x7528;&#x5DF2;&#x7ECF;&#x542F;&#x52A8;&#x4E86;&#xFF01;</span></code></pre><p>JavaScript&#x6587;&#x4EF6;&#x4E3B;&#x8981;&#x505A;&#x7684;&#x4E8B;&#x60C5;&#x662F;&#xFF1A;<br>&#x5B9A;&#x4E49;&#x8DEF;&#x7531;&#x5217;&#x8868;&#xFF0C;&#x5373;routes&#x3002;&#x521B;&#x5EFA;router&#x5B9E;&#x4F8B;&#x53CA;router&#x914D;&#x7F6E;&#xFF0C;&#x5373;router&#x3002;&#x521B;&#x5EFA;&#x548C;&#x6302;&#x8F7D;&#x6839;&#x5B9E;&#x4F8B;&#x3002;<br>&#x4EE5;&#x4E0A;&#x53EA;&#x662F;&#x6559;&#x6211;&#x4EEC;&#x7528;&#x6700;&#x7B80;&#x5355;&#x7684;&#x65B9;&#x6CD5;&#x4F7F;&#x7528;vue-router&#x3002;&#x4F46;&#x5B9E;&#x9645;&#x5F00;&#x53D1;&#x8FC7;&#x7A0B;&#x4E2D;&#xFF0C;&#x9996;&#x5148;&#x6211;&#x4EEC;&#x7684;vue&#x7EC4;&#x4EF6;&#x663E;&#x7136;&#x4E0D;&#x4F1A;&#x53EA;&#x6709;&#x4E00;&#x4E2A;template&#x6A21;&#x677F;&#x8FD9;&#x4E48;&#x7B80;&#x5355;&#xFF0C;&#x4F1A;&#x7528;&#x5230;vue&#x7684;&#x5355;&#x6587;&#x4EF6;&#x7EC4;&#x4EF6;&#xFF1B;<br>&#x5176;&#x6B21;&#x6211;&#x4EEC;&#x901A;&#x5E38;&#x4F1A;&#x5E0C;&#x671B;&lt;router-view&gt;&#x7684;&#x8303;&#x56F4;&#x662F;&#x6574;&#x4E2A;&#x9875;&#x9762;&#xFF0C;&#x800C;&#x4E0D;&#x662F;&#x50CF;&#x73B0;&#x5728;&#x8FD9;&#x6837;&#x4E00;&#x76F4;&#x6709;&#x51E0;&#x4E2A;&#x788D;&#x773C;&#x7684;&#x5BFC;&#x822A;&#x5B58;&#x5728;&#x4E8E;&#x9875;&#x9762;&#x4E0A;&#xFF0C;&#x8FD9;&#x5C31;&#x9700;&#x8981;&#x5148;&#x5B9A;&#x4E49;&#x597D;&#x9ED8;&#x8BA4;&#x72B6;&#x6001;&#x4E0B;&lt;router-view&gt;&#x663E;&#x793A;&#x7684;&#x5185;&#x5BB9;&#x3002;</p><p>&#x65E2;&#x7136;&#x662F;&#x5355;&#x9875;&#x5E94;&#x7528;&#xFF08;SPA&#xFF09;&#xFF0C;&#x90A3;&#x4E48;&#x6574;&#x4E2A;&#x9879;&#x76EE;&#x6709;&#x4EE5;&#x4E0B;&#x4E09;&#x4E2A;&#x6587;&#x4EF6;&#x662F;&#x5FC5;&#x8981;&#x7684;:<br>&#x4E00;&#x4E2A;html&#x6587;&#x4EF6;&#xFF1A;index.html<br>&#x4E00;&#x4E2A;webpack&#x6253;&#x5305;&#x65F6;&#x7684;&#x5165;&#x53E3;js&#x6587;&#x4EF6;&#xFF1A;main.js<br>&#x4E00;&#x4E2A;&#x6839;vue&#x7EC4;&#x4EF6;&#xFF0C;&#x4F5C;&#x4E3A;&#x5176;&#x4ED6;&#x7EC4;&#x4EF6;&#x7684;&#x6302;&#x8F7D;&#x70B9;&#xFF1A;app.vue</p><p>&#x7528;vue-cli&#x751F;&#x6210;webpack&#x6253;&#x5305;&#x7684;vue&#x9879;&#x76EE;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install webpack -g
npm install vue-cli -g
//&#x6253;&#x5F00;&#x8981;&#x521B;&#x5EFA;&#x7684;&#x9879;&#x76EE;&#x8DEF;&#x5F84;&#x76EE;&#x5F55;&#xFF0C;&#x521B;&#x5EFA;&#x9879;&#x76EE;
vue init webpack-simple &lt;&#x9879;&#x76EE;&#x540D;&gt;
cd &lt;&#x9879;&#x76EE;&#x540D;&gt;
npm install vue-router --save
npm run dev
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stata"><code>npm install webpack -<span class="hljs-keyword">g</span>
npm install vue-<span class="hljs-keyword">cli</span> -<span class="hljs-keyword">g</span>
<span class="hljs-comment">//&#x6253;&#x5F00;&#x8981;&#x521B;&#x5EFA;&#x7684;&#x9879;&#x76EE;&#x8DEF;&#x5F84;&#x76EE;&#x5F55;&#xFF0C;&#x521B;&#x5EFA;&#x9879;&#x76EE;</span>
vue init webpack-simple &lt;&#x9879;&#x76EE;&#x540D;&gt;
<span class="hljs-keyword">cd</span> &lt;&#x9879;&#x76EE;&#x540D;&gt;
npm install vue-router --<span class="hljs-keyword">save</span>
npm <span class="hljs-keyword">run</span> dev
</code></pre><p>&#x751F;&#x6210;&#x7684;&#x9879;&#x76EE;&#x7C7B;&#x4F3C;&#x8FD9;&#x6837;&#x7684;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbhLOz?w=253&amp;h=586" src="https://static.alili.tech/img/bVbhLOz?w=253&amp;h=586" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p><p>&#x5728;components&#x4E0B;&#x9762;&#x65B0;&#x5EFA;&#x4E24;&#x4E2A;vue&#x6587;&#x4EF6; index.vue&#x548C;hello.vue</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//index.vue
&lt;template&gt;
 &lt;div&gt;
     &lt;h2&gt;Index&lt;/h2&gt;
     &lt;hr&gt;
     &lt;p&gt;{{sContent}}&lt;/p&gt;
 &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
 export default{
     data(){
         return {
             sContent:&quot;This is index components&quot;
         }
     }
 }
&lt;/script&gt;

//hello.vue
&lt;template&gt;
 &lt;div&gt;
     &lt;h2&gt;Hello Vue.js&lt;/h2&gt;
     &lt;hr/&gt;
     &lt;p&gt;{{sContent}}&lt;/p&gt;
 &lt;/div&gt;
&lt;/template&gt;
&lt;script&gt;
 export default{
     data(){
         return {
             sContent:&quot;This is hello components&quot;
         }
     }
 }
&lt;/script&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code><span class="xml">//index.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Index<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">hr</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">{{sContent}}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
 <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
 <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
     data(){
         <span class="hljs-keyword">return</span> {
             <span class="hljs-attr">sContent</span>:<span class="hljs-string">&quot;This is index components&quot;</span>
         }
     }
 }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

//hello.vue
<span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Hello Vue.js<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">hr</span>/&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">{{sContent}}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
 <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
 <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>{
     data(){
         <span class="hljs-keyword">return</span> {
             <span class="hljs-attr">sContent</span>:<span class="hljs-string">&quot;This is hello components&quot;</span>
         }
     }
 }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre><p><strong>&#x4FEE;&#x6539;main.js&#x6587;&#x4EF6;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x5F15;&#x5165;&#x5E76;&#x5B89;&#x88C5;vue-router&#x63D2;&#x4EF6;
import Vue from &apos;vue&apos;;
import VueRouter from &apos;vue-router&apos;;
Vue.use(VueRouter);
//&#x5F15;&#x5165;index.vue&#x548C;hello.vue&#x7EC4;&#x4EF6;
import App from &apos;./App.vue&apos;;
import index from &apos;./components/index.vue&apos;;
import hello from &apos;./components/hello.vue&apos;;
//&#x5B9A;&#x4E49;&#x8DEF;&#x7531;
const routes = [
 {path:&apos;/&apos;,component:App},
 { path: &apos;/index&apos;, component: index },
 { path: &apos;/hello&apos;, component: hello }
]
//&#x521B;&#x5EFA; router &#x5B9E;&#x4F8B;&#xFF0C;&#x7136;&#x540E;&#x4F20; routes &#x914D;&#x7F6E;
const router=new VueRouter({
routes
});
//&#x521B;&#x5EFA;&#x548C;&#x6302;&#x8F7D;&#x6839;&#x5B9E;&#x4F8B;&#x3002;&#x901A;&#x8FC7; router &#x914D;&#x7F6E;&#x53C2;&#x6570;&#x6CE8;&#x5165;&#x8DEF;&#x7531;&#xFF0C;&#x4ECE;&#x800C;&#x8BA9;&#x6574;&#x4E2A;&#x5E94;&#x7528;&#x90FD;&#x6709;&#x8DEF;&#x7531;&#x529F;&#x80FD;
new Vue({
el:&quot;#app&quot;,
router
});
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs groovy"><code><span class="hljs-comment">//&#x5F15;&#x5165;&#x5E76;&#x5B89;&#x88C5;vue-router&#x63D2;&#x4EF6;</span>
<span class="hljs-keyword">import</span> Vue from <span class="hljs-string">&apos;vue&apos;</span>;
<span class="hljs-keyword">import</span> VueRouter from <span class="hljs-string">&apos;vue-router&apos;</span>;
Vue.use(VueRouter);
<span class="hljs-comment">//&#x5F15;&#x5165;index.vue&#x548C;hello.vue&#x7EC4;&#x4EF6;</span>
<span class="hljs-keyword">import</span> App from <span class="hljs-string">&apos;./App.vue&apos;</span>;
<span class="hljs-keyword">import</span> index from <span class="hljs-string">&apos;./components/index.vue&apos;</span>;
<span class="hljs-keyword">import</span> hello from <span class="hljs-string">&apos;./components/hello.vue&apos;</span>;
<span class="hljs-comment">//&#x5B9A;&#x4E49;&#x8DEF;&#x7531;</span>
const routes = [
 {<span class="hljs-string">path:</span><span class="hljs-string">&apos;/&apos;</span>,<span class="hljs-string">component:</span>App},
 { <span class="hljs-string">path:</span> <span class="hljs-string">&apos;/index&apos;</span>, <span class="hljs-string">component:</span> index },
 { <span class="hljs-string">path:</span> <span class="hljs-string">&apos;/hello&apos;</span>, <span class="hljs-string">component:</span> hello }
]
<span class="hljs-comment">//&#x521B;&#x5EFA; router &#x5B9E;&#x4F8B;&#xFF0C;&#x7136;&#x540E;&#x4F20; routes &#x914D;&#x7F6E;</span>
const router=<span class="hljs-keyword">new</span> VueRouter({
routes
});
<span class="hljs-comment">//&#x521B;&#x5EFA;&#x548C;&#x6302;&#x8F7D;&#x6839;&#x5B9E;&#x4F8B;&#x3002;&#x901A;&#x8FC7; router &#x914D;&#x7F6E;&#x53C2;&#x6570;&#x6CE8;&#x5165;&#x8DEF;&#x7531;&#xFF0C;&#x4ECE;&#x800C;&#x8BA9;&#x6574;&#x4E2A;&#x5E94;&#x7528;&#x90FD;&#x6709;&#x8DEF;&#x7531;&#x529F;&#x80FD;</span>
<span class="hljs-keyword">new</span> Vue({
<span class="hljs-string">el:</span><span class="hljs-string">&quot;#app&quot;</span>,
router
});
</code></pre><p>&#x4FEE;&#x6539;App.vue</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
&lt;div&gt;
 ![](./assets/logo.png)
 &lt;h1&gt;{{msg}}&lt;/h1&gt;
 &lt;ul&gt;
   &lt;router-link to=&apos;/index&apos; tag=&apos;li&apos;&gt;&lt;a href=&quot;/index&quot;&gt;Index&lt;/a&gt;&lt;/router-link&gt;
   &lt;router-link to=&apos;/hello&apos; tag=&apos;li&apos;&gt;&lt;a href=&quot;/hello&quot;&gt;Hello&lt;/a&gt;&lt;/router-link&gt;
 &lt;/ul&gt;
&lt;/div&gt;
&lt;/template&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
 ![](./assets/logo.png)
 <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span></span><span class="hljs-template-variable">{{msg}}</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">&apos;/index&apos;</span> <span class="hljs-attr">tag</span>=<span class="hljs-string">&apos;li&apos;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;/index&quot;</span>&gt;</span>Index<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">&apos;/hello&apos;</span> <span class="hljs-attr">tag</span>=<span class="hljs-string">&apos;li&apos;</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;/hello&quot;</span>&gt;</span>Hello<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span>
 <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
</span></code></pre><p><strong>&#x4FEE;&#x6539;index.html</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;!DOCTYPE html&gt;
&lt;html lang=&quot;en&quot;&gt;
&lt;head&gt;
 &lt;meta charset=&quot;utf-8&quot;&gt;
 &lt;title&gt;vue-webpack-simple&lt;/title&gt;
&lt;/head&gt;
&lt;body&gt;
 &lt;div id=&quot;app&quot;&gt;
     &lt;router-view&gt;&lt;/router-view&gt;
 &lt;/div&gt;
 &lt;script src=&quot;/dist/build.js&quot;&gt;&lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">&quot;en&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;utf-8&quot;</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>vue-webpack-simple<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&quot;app&quot;</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">router-view</span>&gt;</span>
 <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;/dist/build.js&quot;</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre><p>&#x8FD0;&#x884C;&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVbhLPY?w=817&amp;h=498" src="https://static.alili.tech/img/bVbhLPY?w=817&amp;h=498" alt="clipboard.png" title="clipboard.png" style="cursor:pointer;display:inline"></span></p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue-router页面跳转 以及页面配置

## 原文链接
[https://segmentfault.com/a/1190000016589454](https://segmentfault.com/a/1190000016589454)

