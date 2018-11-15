---
title: 'vue常用操作及学习笔记（路由跳转及路由传参篇）' 
date: 2018-11-15 2:30:08
reprint: true
categories: reprint
---

{{% raw %}}
<h1><strong>&#x8DEF;&#x7531;&#x8DF3;&#x8F6C; - &#x8D85;&#x94FE;&#x63A5;&#x65B9;&#x5F0F;&#x8DF3;&#x8F6C;</strong></h1><p>html&#xFF1A;</p><pre><code>&lt;div id=&quot;app&quot;&gt;
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
</code></pre><p>router.js&#xFF1A;</p><pre><code>import Vue from &apos;vue&apos;;
import vueRouter from &apos;vue-router&apos;;
Vue.use(vueRouter);
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
 

export default router
</code></pre><h1><strong>&#x8DEF;&#x7531;&#x8DF3;&#x8F6C; - &#x51FD;&#x6570;&#x65B9;&#x6CD5;&#x8DF3;&#x8F6C;</strong></h1><p>this.$router.push();</p><h2>query&#x65B9;&#x5F0F;&#x4F20;&#x53C2;&#x548C;&#x63A5;&#x6536;&#x53C2;&#x6570;</h2><pre><code>//query&#x65B9;&#x6CD5;&#x4F20;&#x503C;
this.$router.push( path : &apos;/xxx&apos;, query : { data })
//query&#x65B9;&#x6CD5;&#x53D6;&#x503C;
this.$route.query.data
</code></pre><p>&#x6CE8;&#x610F;:&#x4F20;&#x53C2;&#x662F;this.$router,&#x63A5;&#x6536;&#x53C2;&#x6570;&#x662F;this.$rout</p><h2>params&#x65B9;&#x5F0F;&#x4F20;&#x53C2;&#x548C;&#x63A5;&#x6536;&#x53C2;&#x6570;</h2><pre><code>//params&#x65B9;&#x6CD5;&#x4F20;&#x503C;
this.$router.push( name : &apos;xxx&apos;, params : { data })
//params&#x53D6;&#x503C;
this.$route.params.data
</code></pre><p>&#x6CE8;&#x610F;:params&#x4F20;&#x53C2;&#xFF0C;push&#x91CC;&#x9762;&#x53EA;&#x80FD;&#x662F; name:&apos;xxxx&apos;,&#x4E0D;&#x80FD;&#x662F;path:&apos;/xxx&apos;</p><h3>&#x533A;&#x522B;&#xFF1A;&#x76F4;&#x767D;&#x7684;&#x6765;&#x8BF4;query&#x76F8;&#x5F53;&#x4E8E;get&#x8BF7;&#x6C42;&#xFF0C;&#x9875;&#x9762;&#x8DF3;&#x8F6C;&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;&#x5730;&#x5740;&#x680F;&#x770B;&#x5230;&#x8BF7;&#x6C42;&#x53C2;&#x6570;&#xFF0C;&#x800C;params&#x76F8;&#x5F53;&#x4E8E;post&#x8BF7;&#x6C42;&#xFF0C;&#x53C2;&#x6570;&#x4E0D;&#x4F1A;&#x518D;&#x5730;&#x5740;&#x680F;&#x4E2D;&#x663E;&#x793A;</h3><h3>&#x62D3;&#x5C55;&#xFF1A;this.$router &#x548C;this.$route&#x6709;&#x4F55;&#x533A;&#x522B;&#xFF1F;</h3><p>1.$router&#x4E3A;VueRouter&#x5B9E;&#x4F8B;&#xFF0C;&#x60F3;&#x8981;&#x5BFC;&#x822A;&#x5230;&#x4E0D;&#x540C;URL&#xFF0C;&#x5219;&#x4F7F;&#x7528;$router.push&#x65B9;&#x6CD5;<br>2.$route&#x4E3A;&#x5F53;&#x524D;router&#x8DF3;&#x8F6C;&#x5BF9;&#x8C61;&#xFF0C;&#x91CC;&#x9762;&#x53EF;&#x4EE5;&#x83B7;&#x53D6;name&#x3001;path&#x3001;query&#x3001;params&#x7B49;</p>
{{% /raw %}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue常用操作及学习笔记（路由跳转及路由传参篇）

## 原文链接
[https://segmentfault.com/a/1190000016135983](https://segmentfault.com/a/1190000016135983)

