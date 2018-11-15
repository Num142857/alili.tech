---
title: Vue-Router基础学习笔记
reprint: true
categories: reprint
abbrlink: 972e35d8
date: 2018-11-04 02:30:10
---

{{% raw %}}
<p><strong>1&#x3001;&#x5B89;&#x88C5;vue-router</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install vue-router
yarn add vue-router" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs dockerfile"><code>npm install vue-router
yarn <span class="hljs-keyword">add</span><span class="bash"> vue-router</span></code></pre><p><strong>2&#x3001;&#x5F15;&#x5165;&#x6CE8;&#x518C;vue-router</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &apos;vue&apos;
import VueRouter from &apos;vue-router&apos;

Vue.use(VueRouter)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>
<span class="hljs-keyword">import</span> VueRouter <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue-router&apos;</span>

Vue.use(VueRouter)</code></pre><p><strong>3&#x3001;&#x94FE;&#x63A5;&#x8DF3;&#x8F6C;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;router-link to=&apos;/home&apos;&gt;&lt;/router-link&gt;    //&#x4F60;&#x53EF;&#x4EE5;&#x5728;template&#x4E2D;&#x4F7F;&#x7528;&#x5B83;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x53EF;&#x70B9;&#x51FB;&#x8DF3;&#x8F6C;&#x5230;home.vue&#x7684; a &#x6807;&#x7B7E;
this.$router.push(&apos;/about&apos;);    //&#x5728;methods&#x65B9;&#x6CD5;&#x4E2D;&#x8DF3;&#x8F6C;&#x5230;about&#x9875;&#x9762;
this.$router.go(&apos;-1&apos;);    //&#x5728;js&#x4E2D;&#x8FD4;&#x56DE;&#x4E0A;&#x4E00;&#x4E2A;&#x9875;&#x9762;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code>&lt;router-link to=<span class="hljs-string">&apos;/home&apos;</span>&gt;&lt;/router-link&gt;    <span class="hljs-comment">//&#x4F60;&#x53EF;&#x4EE5;&#x5728;template&#x4E2D;&#x4F7F;&#x7528;&#x5B83;&#x5B9E;&#x73B0;&#x4E00;&#x4E2A;&#x53EF;&#x70B9;&#x51FB;&#x8DF3;&#x8F6C;&#x5230;home.vue&#x7684; a &#x6807;&#x7B7E;</span>
<span class="hljs-keyword">this</span>.$router.push(<span class="hljs-string">&apos;/about&apos;</span>);    <span class="hljs-comment">//&#x5728;methods&#x65B9;&#x6CD5;&#x4E2D;&#x8DF3;&#x8F6C;&#x5230;about&#x9875;&#x9762;</span>
<span class="hljs-keyword">this</span>.$router.go(<span class="hljs-string">&apos;-1&apos;</span>);    <span class="hljs-comment">//&#x5728;js&#x4E2D;&#x8FD4;&#x56DE;&#x4E0A;&#x4E00;&#x4E2A;&#x9875;&#x9762;</span></code></pre><p><strong>4&#x3001;&#x7ECF;&#x5E38;&#x7528;&#x5230;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$route.params.name    //&#x5728;js&#x4E2D;&#x83B7;&#x53D6;&#x8DEF;&#x7531;&#x7684;&#x53C2;&#x6570;
.router-link-active    //&#x5F53;&#x524D;&#x9009;&#x4E2D;&#x8DEF;&#x7531;&#x7684;&#x5339;&#x914D;&#x6837;&#x5F0F;
$route.query    //&#x83B7;&#x53D6;&#x67E5;&#x8BE2;&#x53C2;&#x6570;
$route.hash    //&#x54C8;&#x5E0C;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs stylus"><code>this.<span class="hljs-variable">$route</span><span class="hljs-selector-class">.params</span><span class="hljs-selector-class">.name</span>    <span class="hljs-comment">//&#x5728;js&#x4E2D;&#x83B7;&#x53D6;&#x8DEF;&#x7531;&#x7684;&#x53C2;&#x6570;</span>
<span class="hljs-selector-class">.router-link-active</span>    <span class="hljs-comment">//&#x5F53;&#x524D;&#x9009;&#x4E2D;&#x8DEF;&#x7531;&#x7684;&#x5339;&#x914D;&#x6837;&#x5F0F;</span>
<span class="hljs-variable">$route</span><span class="hljs-selector-class">.query</span>    <span class="hljs-comment">//&#x83B7;&#x53D6;&#x67E5;&#x8BE2;&#x53C2;&#x6570;</span>
<span class="hljs-variable">$route</span><span class="hljs-selector-class">.hash</span>    <span class="hljs-comment">//&#x54C8;&#x5E0C;</span></code></pre><p><strong>5&#x3001;&#x8DEF;&#x7531;&#x914D;&#x7F6E;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default new Router({
    routes:[
        {                //&#x7B2C;&#x4E00;&#x5C42;&#x662F;&#x9876;&#x5C42;&#x8DEF;&#x7531;&#xFF0C;&#x9876;&#x5C42;&#x8DEF;&#x7531;&#x4E2D;&#x7684;router-view&#x4E2D;&#x663E;&#x793A;&#x88AB;router-link&#x9009;&#x4E2D;&#x7684;&#x5B50;&#x8DEF;&#x7531;
            path:&apos;/&apos;,
            name:&apos;Home&apos;,
            component:&apos;Home&apos;
        },{
            path:&apos;/user/:id&apos;,    //www.xxx.com/user/cai
            name:&apos;user&apos;,    //:id&#x662F;&#x52A8;&#x6001;&#x8DEF;&#x5F84;&#x53C2;&#x6570;
            component:&apos;user&apos;,
            children:[
                {
                    path:&apos;userInfo&apos;,    //www.xxx.com/user/cai/userInfo
                    component:&apos;userInfo&apos;    //&#x5B50;&#x8DEF;&#x7531;&#x5C06;&#x6E32;&#x67D3;&#x5230;&#x7236;&#x7EC4;&#x4EF6;&#x7684;router-view&#x4E2D;
                },{
                    path:&apos;posts&apos;,
                    component:&apos;posts&apos;
                }
            ]
        }
    ]
})
Vue.use(Router);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code><span class="hljs-selector-tag">export</span> <span class="hljs-selector-tag">default</span> <span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Router</span>({
    <span class="hljs-attribute">routes</span>:[
        {                <span class="hljs-comment">//&#x7B2C;&#x4E00;&#x5C42;&#x662F;&#x9876;&#x5C42;&#x8DEF;&#x7531;&#xFF0C;&#x9876;&#x5C42;&#x8DEF;&#x7531;&#x4E2D;&#x7684;router-view&#x4E2D;&#x663E;&#x793A;&#x88AB;router-link&#x9009;&#x4E2D;&#x7684;&#x5B50;&#x8DEF;&#x7531;</span>
            <span class="hljs-attribute">path</span>:<span class="hljs-string">&apos;/&apos;</span>,
            <span class="hljs-attribute">name</span>:<span class="hljs-string">&apos;Home&apos;</span>,
            <span class="hljs-attribute">component</span>:<span class="hljs-string">&apos;Home&apos;</span>
        },{
            <span class="hljs-attribute">path</span>:<span class="hljs-string">&apos;/user/:id&apos;</span>,    <span class="hljs-comment">//www.xxx.com/user/cai</span>
            <span class="hljs-attribute">name</span>:<span class="hljs-string">&apos;user&apos;</span>,    <span class="hljs-comment">//:id&#x662F;&#x52A8;&#x6001;&#x8DEF;&#x5F84;&#x53C2;&#x6570;</span>
            <span class="hljs-attribute">component</span>:<span class="hljs-string">&apos;user&apos;</span>,
            <span class="hljs-attribute">children</span>:[
                {
                    <span class="hljs-attribute">path</span>:<span class="hljs-string">&apos;userInfo&apos;</span>,    <span class="hljs-comment">//www.xxx.com/user/cai/userInfo</span>
                    <span class="hljs-attribute">component</span>:<span class="hljs-string">&apos;userInfo&apos;</span>    <span class="hljs-comment">//&#x5B50;&#x8DEF;&#x7531;&#x5C06;&#x6E32;&#x67D3;&#x5230;&#x7236;&#x7EC4;&#x4EF6;&#x7684;router-view&#x4E2D;</span>
                },{
                    <span class="hljs-attribute">path</span>:<span class="hljs-string">&apos;posts&apos;</span>,
                    <span class="hljs-attribute">component</span>:<span class="hljs-string">&apos;posts&apos;</span>
                }
            ]
        }
    ]
})
<span class="hljs-selector-tag">Vue</span><span class="hljs-selector-class">.use</span>(Router);</code></pre><p><strong>6&#x3001;&#x8DEF;&#x7531;&#x53C2;&#x6570;&#x65B9;&#x5F0F;&#x53D8;&#x5316;&#x65F6;&#xFF0C;&#x91CD;&#x65B0;&#x53D1;&#x51FA;&#x8BF7;&#x6C42;&#x5E76;&#x66F4;&#x65B0;&#x6570;&#x636E;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x6BD4;&#x5982;&#xFF1A;&#x7528;&#x6237;&#x4E00;&#x5207;&#x6362;&#x5230;&#x7528;&#x6237;&#x4E8C;, &#x8DEF;&#x7531;&#x53C2;&#x6570;&#x6539;&#x53D8;&#x4E86;&#xFF0C;&#x4F46;&#x7EC4;&#x4EF6;&#x662F;&#x540C;&#x4E00;&#x4E2A;&#xFF0C;&#x4F1A;&#x88AB;&#x590D;&#x7528;
// &#x4ECE; /user/cai &#x5207;&#x5230; /user/wan

&#x5728;User&#x7EC4;&#x4EF6;&#x4E2D;&#xFF1A;
//&#x65B9;&#x6CD5;1&#xFF1A;
    watch:{
        &apos;$route&apos;(to,from){
            //&#x505A;&#x70B9;&#x4EC0;&#x4E48;&#xFF0C;&#x6BD4;&#x5982;&#xFF1A;&#x66F4;&#x65B0;&#x6570;&#x636E;
        }
    }
//&#x65B9;&#x6CD5;&#x4E8C;&#xFF1A;
    beforeRouteUpdate(to,from,next){
        //&#x540C;&#x4E0A;
    }" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs sqf"><code><span class="hljs-comment">//&#x6BD4;&#x5982;&#xFF1A;&#x7528;&#x6237;&#x4E00;&#x5207;&#x6362;&#x5230;&#x7528;&#x6237;&#x4E8C;, &#x8DEF;&#x7531;&#x53C2;&#x6570;&#x6539;&#x53D8;&#x4E86;&#xFF0C;&#x4F46;&#x7EC4;&#x4EF6;&#x662F;&#x540C;&#x4E00;&#x4E2A;&#xFF0C;&#x4F1A;&#x88AB;&#x590D;&#x7528;</span>
<span class="hljs-comment">// &#x4ECE; /user/cai &#x5207;&#x5230; /user/wan</span>

&#x5728;User&#x7EC4;&#x4EF6;&#x4E2D;&#xFF1A;
<span class="hljs-comment">//&#x65B9;&#x6CD5;1&#xFF1A;</span>
    watch:{
        <span class="hljs-string">&apos;$route&apos;</span>(<span class="hljs-keyword">to</span>,<span class="hljs-keyword">from</span>){
            <span class="hljs-comment">//&#x505A;&#x70B9;&#x4EC0;&#x4E48;&#xFF0C;&#x6BD4;&#x5982;&#xFF1A;&#x66F4;&#x65B0;&#x6570;&#x636E;</span>
        }
    }
<span class="hljs-comment">//&#x65B9;&#x6CD5;&#x4E8C;&#xFF1A;</span>
    beforeRouteUpdate(<span class="hljs-keyword">to</span>,<span class="hljs-keyword">from</span>,next){
        <span class="hljs-comment">//&#x540C;&#x4E0A;</span>
    }</code></pre><p><strong>7&#x3001;&#x7F16;&#x7A0B;&#x5F0F;&#x5BFC;&#x822A;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.push({name:&apos;user&apos;,params:{userId:&apos;123&apos;}})    //&#x547D;&#x540D;&#x8DEF;&#x7531;&#x5BFC;&#x822A;&#x5230;user&#x7EC4;&#x4EF6;
&lt;router-link :to=&apos;{name:&apos;user&apos;,params:{userId:&apos;123&apos;}}&apos;&gt;&#x7528;&#x6237;&lt;/router-link&gt;

router.push({path:&apos;register&apos;,query:{plan:&apos;cai&apos;}})    //query&#x67E5;&#x8BE2;&#x53C2;&#x6570;
router.push({path:`/user/${userId}`})    //query

router.push(location,onComplete,onAbort)
router.replace()    //&#x66FF;&#x6362;
router.go(-1)" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs lasso"><code>router.push({name:<span class="hljs-string">&apos;user&apos;</span>,<span class="hljs-keyword">params</span>:{userId:<span class="hljs-string">&apos;123&apos;</span>}})    <span class="hljs-comment">//&#x547D;&#x540D;&#x8DEF;&#x7531;&#x5BFC;&#x822A;&#x5230;user&#x7EC4;&#x4EF6;</span>
&lt;router<span class="hljs-params">-link</span> :<span class="hljs-keyword">to</span>=<span class="hljs-string">&apos;{name:&apos;</span>user<span class="hljs-string">&apos;,params:{userId:&apos;</span><span class="hljs-number">123</span><span class="hljs-string">&apos;}}&apos;</span>&gt;&#x7528;&#x6237;&lt;/router<span class="hljs-params">-link</span>&gt;

router.push({path:<span class="hljs-string">&apos;register&apos;</span>,query:{plan:<span class="hljs-string">&apos;cai&apos;</span>}})    <span class="hljs-comment">//query&#x67E5;&#x8BE2;&#x53C2;&#x6570;</span>
router.push({path:<span class="hljs-string">`/user/${userId}`</span>})    <span class="hljs-comment">//query</span>

router.push(location,onComplete,onAbort)
router.replace()    <span class="hljs-comment">//&#x66FF;&#x6362;</span>
router.go(<span class="hljs-number">-1</span>)</code></pre><p><strong>8&#x3001;&#x547D;&#x540D;&#x89C6;&#x56FE;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//&#x5F53;&#x524D;&#x7EC4;&#x4EF6;&#x4E2D;&#x53EA;&#x6709;&#x4E00;&#x4E2A; router-view &#x65F6;&#xFF0C;&#x5B50;&#x7EC4;&#x4EF6;&#x9ED8;&#x8BA4;&#x6E32;&#x67D3;&#x5230;&#x8FD9;&#x91CC;

&lt;router-view class=&apos;default&apos;&gt;&lt;/router-view&gt;
&lt;router-view class=&apos;a&apos; name=&apos;left&apos;&gt;&lt;/router-view&gt;
&lt;router-view class=&apos;b&apos; name=&apos;main&apos;&gt;&lt;/router-view&gt;

routes:[
    {
        path:&apos;/&apos;,
        components:{
            default:header,
            left:nav,
            main:content    //content&#x7EC4;&#x4EF6;&#x4F1A;&#x6E32;&#x67D3;&#x5728;name&#x4E3A;main&#x7684;router-view&#x4E2D;
        }
    }
]
//&#x5D4C;&#x5957;&#x547D;&#x540D;&#x89C6;&#x56FE;&#x5C31;&#x662F;&#xFF1A;&#x5B50;&#x8DEF;&#x7531;+&#x547D;&#x540D;&#x89C6;&#x56FE;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs vim"><code>//&#x5F53;&#x524D;&#x7EC4;&#x4EF6;&#x4E2D;&#x53EA;&#x6709;&#x4E00;&#x4E2A; router-<span class="hljs-keyword">view</span> &#x65F6;&#xFF0C;&#x5B50;&#x7EC4;&#x4EF6;&#x9ED8;&#x8BA4;&#x6E32;&#x67D3;&#x5230;&#x8FD9;&#x91CC;

&lt;router-<span class="hljs-keyword">view</span> class=<span class="hljs-string">&apos;default&apos;</span>&gt;&lt;/router-<span class="hljs-keyword">view</span>&gt;
&lt;router-<span class="hljs-keyword">view</span> class=<span class="hljs-string">&apos;a&apos;</span> name=<span class="hljs-string">&apos;left&apos;</span>&gt;&lt;/router-<span class="hljs-keyword">view</span>&gt;
&lt;router-<span class="hljs-keyword">view</span> class=<span class="hljs-string">&apos;b&apos;</span> name=<span class="hljs-string">&apos;main&apos;</span>&gt;&lt;/router-<span class="hljs-keyword">view</span>&gt;

route<span class="hljs-variable">s:</span>[
    {
        path:<span class="hljs-string">&apos;/&apos;</span>,
        component<span class="hljs-variable">s:</span>{
            defaul<span class="hljs-variable">t:header</span>,
            lef<span class="hljs-variable">t:nav</span>,
            main:content    //content&#x7EC4;&#x4EF6;&#x4F1A;&#x6E32;&#x67D3;&#x5728;name&#x4E3A;main&#x7684;router-<span class="hljs-keyword">view</span>&#x4E2D;
        }
    }
]
//&#x5D4C;&#x5957;&#x547D;&#x540D;&#x89C6;&#x56FE;&#x5C31;&#x662F;&#xFF1A;&#x5B50;&#x8DEF;&#x7531;+&#x547D;&#x540D;&#x89C6;&#x56FE;</code></pre><p><strong>9&#x3001;&#x91CD;&#x5B9A;&#x5411;&#x4E0E;&#x522B;&#x540D;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router = new VueRouter({
    routes: [
        { path: &apos;/a&apos;, redirect: &apos;/b&apos; },
        { path: &apos;/b&apos;, redirect: { name: &apos;foo&apos; }},    //&#x547D;&#x540D;&#x8DEF;&#x7531;&#x65B9;&#x5F0F;
        { path: &apos;/c&apos;, redirect: to =&gt; {    //&#x52A8;&#x6001;&#x8FD4;&#x56DE;&#x91CD;&#x5B9A;&#x5411;&#x76EE;&#x6807;
          // &#x65B9;&#x6CD5;&#x63A5;&#x6536; &#x76EE;&#x6807;&#x8DEF;&#x7531; &#x4F5C;&#x4E3A;&#x53C2;&#x6570;
          // return &#x91CD;&#x5B9A;&#x5411;&#x7684; &#x5B57;&#x7B26;&#x4E32;&#x8DEF;&#x5F84;/&#x8DEF;&#x5F84;&#x5BF9;&#x8C61;
        }}
    ]
})

const router = new VueRouter({
    routes: [
        { path: &apos;/a&apos;, component: A, alias: &apos;/b&apos; }    //&#x522B;&#x540D;&#xFF1A;&#x5F53;&#x8BBF;&#x95EE; /b &#x65F6;&#x4E5F;&#x4F1A;&#x4F7F;&#x7528;A&#x7EC4;&#x4EF6;
    ]
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs groovy"><code>const router = <span class="hljs-keyword">new</span> VueRouter({
<span class="hljs-symbol">    routes:</span> [
        { <span class="hljs-string">path:</span> <span class="hljs-string">&apos;/a&apos;</span>, <span class="hljs-string">redirect:</span> <span class="hljs-string">&apos;/b&apos;</span> },
        { <span class="hljs-string">path:</span> <span class="hljs-string">&apos;/b&apos;</span>, <span class="hljs-string">redirect:</span> { <span class="hljs-string">name:</span> <span class="hljs-string">&apos;foo&apos;</span> }},    <span class="hljs-comment">//&#x547D;&#x540D;&#x8DEF;&#x7531;&#x65B9;&#x5F0F;</span>
        { <span class="hljs-string">path:</span> <span class="hljs-string">&apos;/c&apos;</span>, <span class="hljs-string">redirect:</span> to =&gt; {    <span class="hljs-comment">//&#x52A8;&#x6001;&#x8FD4;&#x56DE;&#x91CD;&#x5B9A;&#x5411;&#x76EE;&#x6807;</span>
          <span class="hljs-comment">// &#x65B9;&#x6CD5;&#x63A5;&#x6536; &#x76EE;&#x6807;&#x8DEF;&#x7531; &#x4F5C;&#x4E3A;&#x53C2;&#x6570;</span>
          <span class="hljs-comment">// return &#x91CD;&#x5B9A;&#x5411;&#x7684; &#x5B57;&#x7B26;&#x4E32;&#x8DEF;&#x5F84;/&#x8DEF;&#x5F84;&#x5BF9;&#x8C61;</span>
        }}
    ]
})

const router = <span class="hljs-keyword">new</span> VueRouter({
<span class="hljs-symbol">    routes:</span> [
        { <span class="hljs-string">path:</span> <span class="hljs-string">&apos;/a&apos;</span>, <span class="hljs-string">component:</span> A, <span class="hljs-string">alias:</span> <span class="hljs-string">&apos;/b&apos;</span> }    <span class="hljs-comment">//&#x522B;&#x540D;&#xFF1A;&#x5F53;&#x8BBF;&#x95EE; /b &#x65F6;&#x4E5F;&#x4F1A;&#x4F7F;&#x7528;A&#x7EC4;&#x4EF6;</span>
    ]
})</code></pre><p>10&#x3001;&#x8DEF;&#x7531;&#x7EC4;&#x4EF6;&#x4F20;&#x53C2;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const User={
    props:[&apos;id&apos;],
    template:`&lt;div&gt;{{id}}&lt;/div&gt;`
}
const router = new VueRouter({
    routes: [
        { path: &apos;/user/:id&apos;, component: User, props: true },
    
        // &#x5BF9;&#x4E8E;&#x5305;&#x542B;&#x547D;&#x540D;&#x89C6;&#x56FE;&#x7684;&#x8DEF;&#x7531;&#xFF0C;&#x4F60;&#x5FC5;&#x987B;&#x5206;&#x522B;&#x4E3A;&#x6BCF;&#x4E2A;&#x547D;&#x540D;&#x89C6;&#x56FE;&#x6DFB;&#x52A0; `props` &#x9009;&#x9879;&#xFF1A;
        {
            path: &apos;/user/:id&apos;,
            components: { default: User, sidebar: Sidebar },
            props: { default: true, sidebar: false }
        }
    ]
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs yaml"><code><span class="hljs-string">const</span> <span class="hljs-string">User={</span>
<span class="hljs-attr">    props:</span><span class="hljs-string">[&apos;id&apos;],</span>
<span class="hljs-attr">    template:</span><span class="hljs-string">`&lt;div&gt;{{id}}&lt;/div&gt;`</span>
<span class="hljs-string">}</span>
<span class="hljs-string">const</span> <span class="hljs-string">router</span> <span class="hljs-string">=</span> <span class="hljs-string">new</span> <span class="hljs-string">VueRouter({</span>
<span class="hljs-attr">    routes:</span> <span class="hljs-string">[</span>
        <span class="hljs-string">{</span> <span class="hljs-attr">path:</span> <span class="hljs-string">&apos;/user/:id&apos;</span><span class="hljs-string">,</span> <span class="hljs-attr">component:</span> <span class="hljs-string">User,</span> <span class="hljs-attr">props:</span> <span class="hljs-literal">true</span> <span class="hljs-string">},</span>
    
        <span class="hljs-string">//</span> <span class="hljs-string">&#x5BF9;&#x4E8E;&#x5305;&#x542B;&#x547D;&#x540D;&#x89C6;&#x56FE;&#x7684;&#x8DEF;&#x7531;&#xFF0C;&#x4F60;&#x5FC5;&#x987B;&#x5206;&#x522B;&#x4E3A;&#x6BCF;&#x4E2A;&#x547D;&#x540D;&#x89C6;&#x56FE;&#x6DFB;&#x52A0;</span> <span class="hljs-string">`props`</span> <span class="hljs-string">&#x9009;&#x9879;&#xFF1A;</span>
        <span class="hljs-string">{</span>
<span class="hljs-attr">            path:</span> <span class="hljs-string">&apos;/user/:id&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">            components:</span> <span class="hljs-string">{</span> <span class="hljs-attr">default:</span> <span class="hljs-string">User,</span> <span class="hljs-attr">sidebar:</span> <span class="hljs-string">Sidebar</span> <span class="hljs-string">},</span>
<span class="hljs-attr">            props:</span> <span class="hljs-string">{</span> <span class="hljs-attr">default:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span> <span class="hljs-attr">sidebar:</span> <span class="hljs-literal">false</span> <span class="hljs-string">}</span>
        <span class="hljs-string">}</span>
    <span class="hljs-string">]</span>
<span class="hljs-string">})</span></code></pre><p>11&#x3001;HTML5&#x7684;History&#x6A21;&#x5F0F;&#x4E0B;&#x670D;&#x52A1;&#x7AEF;&#x914D;&#x7F6E;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router = new VueRouter({
    mode: &apos;history&apos;,
    routes: [
        { path: &apos;*&apos;, component: 404}
    ]
})

&#x540E;&#x7AEF;&#x914D;&#x7F6E;&#xFF1A;

//Nginx
    location / {
      try_files $uri $uri/ /index.html;
    }
    
//Apache
    &lt;IfModule mod_rewrite.c&gt;
      RewriteEngine On
      RewriteBase /
      RewriteRule ^index\.html$ - [L]
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      RewriteRule . /index.html [L]
    &lt;/IfModule&gt;
//Node.js
    const http = require(&apos;http&apos;)
    const fs = require(&apos;fs&apos;)
    const httpPort = 80
    http.createServer((req, res) =&gt; {
      fs.readFile(&apos;index.htm&apos;, &apos;utf-8&apos;, (err, content) =&gt; {
        if (err) {
          console.log(&apos;&#x65E0;&#x6CD5;&#x6253;&#x5F00;index.htm&#x9875;&#x9762;.&apos;)
        }
        res.writeHead(200, {
          &apos;Content-Type&apos;: &apos;text/html; charset=utf-8&apos;
        })
        res.end(content)
      })
    }).listen(httpPort, () =&gt; {
      console.log(&apos;&#x6253;&#x5F00;: http://localhost:%s&apos;, httpPort)
    })
    
//&#x4F7F;&#x7528;&#x4E86;Node.js&#x7684;Express
    [&#x4F7F;&#x7528;&#x4E2D;&#x95F4;&#x4EF6;][1]

" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs php"><code><span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> VueRouter({
    mode: <span class="hljs-string">&apos;history&apos;</span>,
    routes: [
        { path: <span class="hljs-string">&apos;*&apos;</span>, component: <span class="hljs-number">404</span>}
    ]
})

&#x540E;&#x7AEF;&#x914D;&#x7F6E;&#xFF1A;

<span class="hljs-comment">//Nginx</span>
    location / {
      try_files $uri $uri/ /index.html;
    }
    
<span class="hljs-comment">//Apache</span>
    &lt;IfModule mod_rewrite.c&gt;
      RewriteEngine On
      RewriteBase /
      RewriteRule ^index\.html$ - [L]
      RewriteCond %{REQUEST_FILENAME} !-f
      RewriteCond %{REQUEST_FILENAME} !-d
      RewriteRule . /index.html [L]
    &lt;/IfModule&gt;
<span class="hljs-comment">//Node.js</span>
    <span class="hljs-keyword">const</span> http = <span class="hljs-keyword">require</span>(<span class="hljs-string">&apos;http&apos;</span>)
    <span class="hljs-keyword">const</span> fs = <span class="hljs-keyword">require</span>(<span class="hljs-string">&apos;fs&apos;</span>)
    <span class="hljs-keyword">const</span> httpPort = <span class="hljs-number">80</span>
    http.createServer((req, res) =&gt; {
      fs.readFile(<span class="hljs-string">&apos;index.htm&apos;</span>, <span class="hljs-string">&apos;utf-8&apos;</span>, (err, content) =&gt; {
        <span class="hljs-keyword">if</span> (err) {
          console.log(<span class="hljs-string">&apos;&#x65E0;&#x6CD5;&#x6253;&#x5F00;index.htm&#x9875;&#x9762;.&apos;</span>)
        }
        res.writeHead(<span class="hljs-number">200</span>, {
          <span class="hljs-string">&apos;Content-Type&apos;</span>: <span class="hljs-string">&apos;text/html; charset=utf-8&apos;</span>
        })
        res.end(content)
      })
    }).listen(httpPort, () =&gt; {
      console.log(<span class="hljs-string">&apos;&#x6253;&#x5F00;: http://localhost:%s&apos;</span>, httpPort)
    })
    
<span class="hljs-comment">//&#x4F7F;&#x7528;&#x4E86;Node.js&#x7684;Express</span>
    [&#x4F7F;&#x7528;&#x4E2D;&#x95F4;&#x4EF6;][<span class="hljs-number">1</span>]

</code></pre>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue-Router基础学习笔记

## 原文链接
[https://segmentfault.com/a/1190000016679121](https://segmentfault.com/a/1190000016679121)

