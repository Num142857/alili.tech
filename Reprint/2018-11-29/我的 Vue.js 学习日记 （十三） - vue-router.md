---
title: '我的 Vue.js 学习日记 （十三） - vue-router' 
date: 2018-11-29 9:33:05
hidden: true
slug: bkmeyuq3l2q
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">&#x4E0A;&#x8282;&#x56DE;&#x987E;</h1>
<p>&#x4E00;&#x4E2A;&#x6708;&#x7684;&#x671F;&#x9650;&#x9A6C;&#x4E0A;&#x8981;&#x5230;&#x4E86;&#xFF0C;&#x771F;&#x662F;&#x5F39;&#x6307;&#x4E00;&#x77AC;&#x95F4;&#x7684;&#x5306;&#x5306;...<br>&#x4E0A;&#x8282;&#x4E3B;&#x8981;&#x8BB0;&#x5F55;&#x4E86;&#x6211;&#x4ECE;<code>&#x5B50;&#x7EC4;&#x4EF6;&#x4FEE;&#x6539;&#x7236;&#x7EC4;&#x4EF6;</code>&#x4F20;&#x9012;&#x8FC7;&#x6765;&#x7684;prop&#x503C;&#x5F97;&#x4E00;&#x4E2A;<code>&#x601D;&#x8DEF;&#x8FC7;&#x7A0B;</code><br>&#x7531;&#x4E8E;&#x8FD1;&#x671F;&#x5BF9;&#x4E8E;&#x6743;&#x9650;&#x63A7;&#x5236;&#x65B9;&#x9762;&#x6709;&#x4E00;&#x5B9A;&#x7684;&#x9700;&#x6C42;&#xFF0C;&#x6240;&#x4EE5;&#x53BB;&#x4E86;&#x89E3;&#x4E86;&#x4E00;&#x4E0B;<code>vuex</code>&#x4E0E;<code>vue-router</code>&#xFF0C;&#x90A3;&#x4E48;&#x4ECA;&#x5929;&#x5C31;&#x6765;&#x603B;&#x7ED3;&#x4E00;&#x4E0B;&#x5173;&#x4E8E;<code>vue-router</code>&#x7684;&#x4E00;&#x4E9B;&#x5DF2;&#x6709;&#x7684;&#x8BA4;&#x8BC6;&#xFF0C;&#x5E76;&#x4E14;&#x6709;&#x65F6;&#x95F4;&#x7684;&#x8BDD;&#x8FDB;&#x884C;&#x4E00;&#x4E0B;&#x7CFB;&#x7EDF;&#x7684;&#x5B66;&#x4E60;</p>
<h1 id="articleHeader1">&#x672C;&#x8282;&#x76EE;&#x6807;</h1>
<p>&#x603B;&#x7ED3;<code>vue-router</code>&#x57FA;&#x4E8E;<code>vue-cli</code>&#x9879;&#x76EE;&#x7684;&#x5B89;&#x88C5;&#x53CA;&#x7B80;&#x5355;&#x4F7F;&#x7528;</p>
<h1 id="articleHeader2">1.&#x5B89;&#x88C5;</h1>
<p><code>npm install vue-router</code></p>
<h1 id="articleHeader3">2.&#x76EE;&#x5F55;</h1>
<p>&#x901A;&#x5E38;&#x6765;&#x8BF4;&#x8DEF;&#x7531;&#x90FD;&#x5B58;&#x653E;&#x5728;&#x4E00;&#x4E2A;<code>&#x5355;&#x72EC;&#x7684;.js</code>&#x6587;&#x4EF6;&#xFF0C;&#x8DEF;&#x5F84;&#x5982;&#x4E0B;&#xFF1A;</p>
<p><code>src - router - index.js</code></p>
<p>&#x6211;&#x7684;<code>index.js</code>&#x73B0;&#x6709;&#x4EE3;&#x7801;&#x5982;&#x4E0B;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &apos;vue&apos;
import Router from &apos;vue-router&apos;
import Frame from &apos;@/components/frame&apos;
import StudentList from &apos;@/components/student/student-list&apos;
import StudentAdd from &apos;@/components/student/student-add&apos;
import DemoSlot from &apos;@/components/demo/demo-slot&apos;
import DemoPage from &apos;@/components/demo/demo-page&apos;

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: &apos;/&apos;,
      component: Frame,
      children: [
        {
          path: &apos;/student/list&apos;,
          component: StudentList
        },
        {
          path: &apos;/student/add&apos;,
          component: StudentAdd
        },
        {
          path: &apos;/demo/slot&apos;,
          component: DemoSlot
        },
        {
          path: &apos;/demo/page&apos;,
          component: DemoPage
        }
      ]
    }
  ]
})
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue-router&apos;</span>
<span class="hljs-keyword">import</span> Frame <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/components/frame&apos;</span>
<span class="hljs-keyword">import</span> StudentList <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/components/student/student-list&apos;</span>
<span class="hljs-keyword">import</span> StudentAdd <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/components/student/student-add&apos;</span>
<span class="hljs-keyword">import</span> DemoSlot <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/components/demo/demo-slot&apos;</span>
<span class="hljs-keyword">import</span> DemoPage <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/components/demo/demo-page&apos;</span>

Vue.use(Router)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({
  routes: [
    {
      path: <span class="hljs-string">&apos;/&apos;</span>,
      component: Frame,
      children: [
        {
          path: <span class="hljs-string">&apos;/student/list&apos;</span>,
          component: StudentList
        },
        {
          path: <span class="hljs-string">&apos;/student/add&apos;</span>,
          component: StudentAdd
        },
        {
          path: <span class="hljs-string">&apos;/demo/slot&apos;</span>,
          component: DemoSlot
        },
        {
          path: <span class="hljs-string">&apos;/demo/page&apos;</span>,
          component: DemoPage
        }
      ]
    }
  ]
})
</code></pre>
<h1 id="articleHeader4">3.&#x5F15;&#x5165;</h1>
<p>&#x8DEF;&#x7531;&#x521B;&#x5EFA;&#x597D;&#x4E86;&#xFF0C;&#x90A3;&#x4E48;&#x63A5;&#x7740;&#x5C31;&#x5E94;&#x8BE5;&#x5C06;&#x6574;&#x7406;&#x597D;&#x7684;&#x8DEF;&#x7531;&#x4E0E;&#x9879;&#x76EE;&#x5173;&#x8054;&#x8D77;&#x6765;&#x5566;</p>
<p>&#x53EA;&#x6709;&#x4E24;&#x4E2A;&#x64CD;&#x4F5C;&#x70B9;&#xFF1A;</p>
<ol>
<li>import&#x8FDB;&#x6765;</li>
<li>&#x6302;&#x5728;vue&#x5B9E;&#x4F8B;&#x4E0A;</li>
</ol>
<p>&#x6211;&#x4EEC;&#x6253;&#x5F00;<code>src - main.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &apos;vue&apos;
import ElementUI from &apos;element-ui&apos;
import &apos;element-ui/lib/theme-chalk/index.css&apos;
import App from &apos;./App&apos;
import router from &apos;./router&apos;

Vue.use(ElementUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: &apos;#app&apos;,
  router,
  components: { App },
  template: &apos;&lt;App/&gt;&apos;
})
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>
<span class="hljs-keyword">import</span> ElementUI <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;element-ui&apos;</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">&apos;element-ui/lib/theme-chalk/index.css&apos;</span>
<span class="hljs-keyword">import</span> App <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./App&apos;</span>
<span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./router&apos;</span>

Vue.use(ElementUI)
Vue.config.productionTip = <span class="hljs-keyword">false</span>

<span class="hljs-comment">/* eslint-disable no-new */</span>
<span class="hljs-keyword">new</span> Vue({
  el: <span class="hljs-string">&apos;#app&apos;</span>,
  router,
  components: { App },
  template: <span class="hljs-string">&apos;&lt;App/&gt;&apos;</span>
})
</code></pre>
<h1 id="articleHeader5">4.&#x4F7F;&#x7528;</h1>
<p>&#x73B0;&#x5728;&#xFF0C;&#x51E1;&#x662F;&#x5728;&#x8DEF;&#x7531;&#x7EC4;&#x4EF6;&#x4E2D;&#x914D;&#x7F6E;&#x8FC7;&#x7684;&#x8DEF;&#x7531;&#x8BB0;&#x5F55;&#xFF0C;&#x73B0;&#x5728;&#x90FD;&#x53EF;&#x4EE5;&#x88AB;&#x5BFC;&#x822A;&#x5566;</p>
<p><code>&#x6CE8;&#xFF1A;&#x6CA1;&#x6709;&#x914D;&#x7F6E;&#x8FC7;&#x7684;&#x8DEF;&#x7531;&#x8BB0;&#x5F55;&#x662F;&#x4E0D;&#x53EF;&#x4EE5;&#x88AB;&#x5BFC;&#x822A;&#x7684;</code></p>
<h2 id="articleHeader6">4-1.&#x8DEF;&#x7531;&#x57FA;&#x7840;&#x7528;&#x6CD5;&#xFF1A;</h2>
<p>1.&lt;router-link to=&quot;/student/list&quot; tag=&quot;div&quot;&gt;&#x5B66;&#x5458;&#x5217;&#x8868;&lt;/router-link&gt;</p>
<p>&#x610F;&#x601D;&#x662F;&#x901A;&#x8FC7;&#x8DEF;&#x7531;&#x5BFC;&#x822A;&#x5230;<code>/student/list</code>&#x8BB0;&#x5F55;&#x70B9;&#xFF0C;<code>to</code>&#x8BBE;&#x7F6E;&#x76EE;&#x6807;&#x8DEF;&#x7531;&#x8BB0;&#x5F55;&#x70B9;&#xFF0C;<code>tag=&quot;div&quot;</code>&#x8868;&#x793A;<code>router-link</code>&#x6700;&#x7EC8;&#x4F1A;&#x5448;&#x73B0;&#x4E3A;&#x4E00;&#x4E2A;<code>div</code>&#x5143;&#x7D20;</p>
<p>&#x901A;&#x8FC7;&#x5411;&#x6839;&#x5B9E;&#x4F8B;&#x4F20;&#x5165;router&#x5B9E;&#x4F8B;&#xFF0C;router&#x4F1A;&#x6CE8;&#x5165;&#x5230;&#x6BCF;&#x4E2A;&#x7EC4;&#x4EF6;&#x4E2D;&#xFF0C;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#xFF1A;<code>this.$router</code>&#x5728;&#x5404;&#x4E2A;&#x7EC4;&#x4EF6;&#x5F53;&#x4E2D;&#x83B7;&#x53D6;router&#x7684;&#x5B9E;&#x4F8B;</p>
<p>2.</p>
<p>&#x4F8B;&#x5982;&#xFF1A;</p>
<p><code>this.$router.push()</code>&#x8FDB;&#x884C;&#x7F16;&#x7A0B;&#x5F0F;&#x5BFC;&#x822A;</p>
<p><code>this.$router.go()</code>&#x524D;&#x8FDB;&#x540E;&#x9000;&#x7B49;</p>
<h1 id="articleHeader7">5.hash&#x4E0E;history</h1>
<p>&#x7B80;&#x5355;&#x6765;&#x7406;&#x89E3;&#x7684;&#x8BDD;&#xFF1A;</p>
<p><code>hash</code>&#xFF1A;url&#x4E2D;&#x5E26;<code>&#x6709;#</code>&#xFF0C;&#x5E76;&#x4E14;&#x53EA;&#x4FEE;&#x6539;<code>#&#x4E4B;&#x540E;&#x7684;url</code>&#xFF0C;&#x9ED8;&#x8BA4;&#x60C5;&#x51B5;&#x4E0B;vue-router&#x662F;hash&#x6A21;&#x5F0F;</p>
<p><code>history</code>&#xFF1A;url&#x4E2D;&#x4E0D;&#x5E26;#&#xFF0C;&#x4F7F;&#x7528;<code>history.pushState</code>&#x5B8C;&#x6210;&#x8DF3;&#x8F6C;&#x5E76;&#x4E14;&#x9700;&#x8981;<code>&#x540E;&#x53F0;&#x914D;&#x5408;</code>&#x4F7F;&#x7528;&#xFF0C;&#x4F7F;&#x7528;history&#x6A21;&#x5F0F;&#x9700;&#x8981;&#x663E;&#x5F0F;&#x6307;&#x5B9A;</p>
<p>&#x4E0D;&#x8FC7;&#x4E24;&#x8005;&#x7684;&#x8DF3;&#x8F6C;&#x90FD;&#x4E0D;&#x4F1A;&#x4F7F;&#x9875;&#x9762;&#x91CD;&#x65B0;&#x52A0;&#x8F7D;</p>
<h1 id="articleHeader8">6.&#x5B88;&#x536B;</h1>
<h2 id="articleHeader9">6.1.&#x79CD;&#x7C7B;</h2>
<p>&#x5B88;&#x536B;&#x603B;&#x5171;&#x5206;&#x4E3A;&#xFF1A;<code>&#x5168;&#x5C40;&#x5B88;&#x536B;</code>&#x3001;<code>&#x8DEF;&#x7531;&#x5B88;&#x536B;</code>&#x3001;<code>&#x7EC4;&#x4EF6;&#x5B88;&#x536B;</code>&#x4E09;&#x79CD;</p>
<p>&#x610F;&#x601D;&#x5C31;&#x662F;&#x5206;&#x4E09;&#x4E2A;&#x533A;&#x57DF;&#xFF0C;<code>&#x5168;&#x5C40;&#x533A;&#x57DF;</code>&#xFF0C;<code>&#x8DEF;&#x7531;&#x533A;&#x57DF;</code>&#xFF0C;<code>&#x7EC4;&#x4EF6;&#x533A;&#x57DF;</code>&#xFF0C;&#x5F88;&#x660E;&#x663E;&#x662F;&#x4F5C;&#x7528;&#x57DF;&#x4E0D;&#x540C;</p>
<p>&#x5168;&#x5C40;&#x5B88;&#x536B;&#x5206;3&#x4E2A;&#xFF1A;<code>&#x524D;&#x7F6E;beforeEach</code>&#x3001;<code>&#x540E;&#x7F6E;afterEach</code>&#x3001;<code>&#x89E3;&#x6790;beforeResolve</code></p>
<p>&#x8DEF;&#x7531;&#x72EC;&#x4EAB;&#x5B88;&#x536B;&#xFF1A;<code>&#x8FDB;&#x5165;&#x524D;beforeEnter</code></p>
<p>&#x7EC4;&#x4EF6;&#x5B88;&#x536B;&#xFF1A;<code>&#x8FDB;&#x5165;&#xFF08;&#x7EC4;&#x4EF6;&#x5BF9;&#x5E94;&#xFF09;&#x8DEF;&#x7531;&#x524D;beforeRouteEnter</code>&#x3001;<code>&#x8DEF;&#x7531;&#x6539;&#x53D8;&#x524D;&#xFF08;&#x7EC4;&#x4EF6;&#x590D;&#x7528;&#x65F6;&#xFF09;beforeRouteUpdate </code>&#x3001;<code>&#x79BB;&#x5F00;&#xFF08;&#x7EC4;&#x4EF6;&#x5BF9;&#x5E94;&#xFF09;&#x8DEF;&#x7531;&#x524D;beforeRouteLeave</code></p>
<p>&#x5B88;&#x536B;&#x6267;&#x884C;&#x987A;&#x5E8F;&#xFF1A;<a href="https://router.vuejs.org/zh/guide/advanced/navigation-guards.html#%E5%AE%8C%E6%95%B4%E7%9A%84%E5%AF%BC%E8%88%AA%E8%A7%A3%E6%9E%90%E6%B5%81%E7%A8%8B" rel="nofollow noreferrer" target="_blank">&#x5BFC;&#x822A;&#x89E3;&#x6790;&#x6D41;&#x7A0B;</a></p>
<p>&#x9644;&#x4E00;&#x5F20;&#x6211;&#x81EA;&#x5DF1;&#x7684;&#x7406;&#x89E3;&#xFF1A;<br><span class="img-wrap"><img data-src="/img/bVba8Hi?w=1445&amp;h=693" src="https://static.alili.tech/img/bVba8Hi?w=1445&amp;h=693" alt="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" title="&#x56FE;&#x7247;&#x63CF;&#x8FF0;" style="cursor: pointer; display: inline;"></span></p>
<p><code>&#x6CE8;&#xFF1A;&#x5E26;&#x6709;next&#x7684;&#x5B88;&#x536B;&#x4E00;&#x5B9A;&#x8981;&#x8C03;&#x7528;next()</code></p>
<h2 id="articleHeader10">6.2.&#x5E94;&#x7528;&#x573A;&#x666F;</h2>
<p>&#x524D;&#x4E9B;&#x5929;&#x5728;&#x505A;&#x6743;&#x9650;&#x65F6;&#x901A;&#x8FC7;&#x67E5;&#x627E;&#x8D44;&#x6599;&#xFF0C;&#x6700;&#x7EC8;&#x53D1;&#x73B0;&#x901A;&#x8FC7;<code>&#x5168;&#x5C40;&#x524D;&#x7F6E;&#x5B88;&#x536B;</code>&#xFF0C;&#x53EF;&#x4EE5;&#x5B9E;&#x73B0;&#x4E00;&#x4E9B;<code>&#x6743;&#x9650;&#x63A7;&#x5236;</code>&#x7684;&#x529F;&#x80FD;&#xFF0C;&#x5F53;&#x7136;&#x4ED6;&#x5E76;&#x4E0D;&#x80FD;&#x72EC;&#x7ACB;&#x5B8C;&#x6210;&#x9700;&#x8981;<code>&#x914D;&#x5408;vuex</code>&#x6765;&#x4F7F;&#x7528;</p>
<h1 id="articleHeader11">7.meta &#x8DEF;&#x7531;&#x5143;&#x6570;&#x636E;</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router = new VueRouter({
  routes: [
    {
      path: &apos;/foo&apos;,
      component: Foo,
      children: [
        {
          path: &apos;bar&apos;,
          component: Bar,
          // a meta field
          meta: { requiresAuth: true }
        }
      ]
    }
  ]
})" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">const</span> <span class="hljs-string">router</span> <span class="hljs-string">=</span> <span class="hljs-string">new</span> <span class="hljs-string">VueRouter({</span>
<span class="hljs-attr">  routes:</span> <span class="hljs-string">[</span>
    <span class="hljs-string">{</span>
<span class="hljs-attr">      path:</span> <span class="hljs-string">&apos;/foo&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">      component:</span> <span class="hljs-string">Foo,</span>
<span class="hljs-attr">      children:</span> <span class="hljs-string">[</span>
        <span class="hljs-string">{</span>
<span class="hljs-attr">          path:</span> <span class="hljs-string">&apos;bar&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">          component:</span> <span class="hljs-string">Bar,</span>
          <span class="hljs-string">//</span> <span class="hljs-string">a</span> <span class="hljs-string">meta</span> <span class="hljs-string">field</span>
<span class="hljs-attr">          meta:</span> <span class="hljs-string">{</span> <span class="hljs-attr">requiresAuth:</span> <span class="hljs-literal">true</span> <span class="hljs-string">}</span>
        <span class="hljs-string">}</span>
      <span class="hljs-string">]</span>
    <span class="hljs-string">}</span>
  <span class="hljs-string">]</span>
<span class="hljs-string">})</span></code></pre>
<p><code>&#x6CE8;&#xFF1A;meta&#x5F88;&#x6709;&#x7528;&#x7684;&#xFF0C;&#x4F8B;&#x5982;&#x6211;&#x4EEC;&#x53EF;&#x4EE5;&#x901A;&#x8FC7;&#x4E3A;&#x8DEF;&#x7531;&#x8BB0;&#x5F55;&#x6DFB;&#x52A0;meta&#x4FE1;&#x606F;&#x6765;&#x4EE3;&#x8868;&#x8BE5;&#x8DEF;&#x7531;&#x6240;&#x4EE3;&#x8868;&#x7684;&#x529F;&#x80FD;&#x6A21;&#x5757;&#x4EE3;&#x7801;&#xFF0C;&#x5728;addRoutes&#x65F6;&#x5224;&#x65AD;&#x662F;&#x5426;&#x6709;&#x6743;&#x9650;&#x52A0;&#x8F7D;&#x6B64;&#x8DEF;&#x7531;&#x8BB0;&#x5F55;</code></p>
<h1 id="articleHeader12">8.&#x8DEF;&#x7531;&#x61D2;&#x52A0;&#x8F7D;</h1>
<p>&#x7531;&#x4E8E;&#x6211;&#x4EEC;&#x4F7F;&#x7528;&#x7684;&#x662F;SPA&#x7684;&#x65B9;&#x5F0F;&#x5F00;&#x53D1;&#x7F51;&#x9875;&#xFF0C;&#x90A3;&#x4E48;&#x6709;&#x4E00;&#x4E2A;&#x5E9E;&#x5927;&#x7684;js&#x6587;&#x4EF6;&#x662F;&#x53EF;&#x60F3;&#x800C;&#x77E5;&#x7684;</p>
<p>&#x8DEF;&#x7531;&#x61D2;&#x52A0;&#x8F7D;&#x5373;&#x662F;&#x4E3A;&#x4E86;&#x964D;&#x4F4E;&#x4E0D;&#x5FC5;&#x8981;&#x7684;&#x5F00;&#x9500;&#xFF0C;&#x5728;&#x8DEF;&#x7531;&#x88AB;&#x8BBF;&#x95EE;&#x65F6;&#x624D;&#x771F;&#x6B63;&#x7684;&#x53BB;&#x52A0;&#x8F7D;&#x5B83;</p>
<p>&#x7528;&#x6CD5;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Foo = () =&gt; import(&apos;./Foo.vue&apos;)" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;">const Foo = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">&apos;./Foo.vue&apos;</span>)</code></pre>
<p>&#x53EA;&#x4FEE;&#x6539;&#x4E86;&#x5F15;&#x5165;&#x65B9;&#x5F0F;&#xFF0C;&#x4F7F;&#x7528;&#x65B9;&#x5F0F;&#x5E76;&#x6CA1;&#x6709;&#x6539;&#x53D8;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router = new VueRouter({
  routes: [
    { path: &apos;/foo&apos;, component: Foo }
  ]
})" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs groovy"><code>const router = <span class="hljs-keyword">new</span> VueRouter({
<span class="hljs-symbol">  routes:</span> [
    { <span class="hljs-string">path:</span> <span class="hljs-string">&apos;/foo&apos;</span>, <span class="hljs-string">component:</span> Foo }
  ]
})</code></pre>
<h1 id="articleHeader13">9.addRoutes &#x52A8;&#x6001;&#x6DFB;&#x52A0;&#x8DEF;&#x7531;</h1>
<p>&#x7528;&#x6CD5;&#xFF1A;</p>
<p>&#x5047;&#x8BBE;&#x6211;&#x4EEC;&#x6709;&#x5982;&#x4E0B;&#x8DEF;&#x7531;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var router = new Router({
  routes: [
    {
      path: &apos;/&apos;,
      component: Frame,
      ]
    }
  ]
})
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs dts"><code>var router = new Router({
<span class="hljs-symbol">  routes:</span> [
    {
<span class="hljs-symbol">      path:</span> <span class="hljs-string">&apos;/&apos;</span>,
<span class="hljs-symbol">      component:</span> Frame,
      ]
    }
  ]
})
</code></pre>
<p>&#x5E76;&#x4E14;&#x6709;&#x5982;&#x4E0B;&#x6570;&#x7EC4;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var routes = [{
      path: &apos;/index&apos;,
      name: &apos;&#x9996;&#x9875;&apos;,
      component: &#x7EC4;&#x4EF6;,
      children: [{
        path: &apos;page1&apos;,
        component: &#x7EC4;&#x4EF6;1
      }, {
        path: &apos;page2&apos;,
        component: &#x7EC4;&#x4EF6;2
      }]" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">var</span> <span class="hljs-string">routes</span> <span class="hljs-string">=</span> <span class="hljs-string">[{</span>
<span class="hljs-attr">      path:</span> <span class="hljs-string">&apos;/index&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">      name:</span> <span class="hljs-string">&apos;&#x9996;&#x9875;&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">      component:</span> <span class="hljs-string">&#x7EC4;&#x4EF6;,</span>
<span class="hljs-attr">      children:</span> <span class="hljs-string">[{</span>
<span class="hljs-attr">        path:</span> <span class="hljs-string">&apos;page1&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">        component:</span> <span class="hljs-string">&#x7EC4;&#x4EF6;1</span>
      <span class="hljs-string">},</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        path:</span> <span class="hljs-string">&apos;page2&apos;</span><span class="hljs-string">,</span>
<span class="hljs-attr">        component:</span> <span class="hljs-string">&#x7EC4;&#x4EF6;2</span>
      <span class="hljs-string">}]</span></code></pre>
<p>&#x90A3;&#x4E48;&#x53EF;&#x4EE5;&#xFF1A;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.addRoutes(routes)" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">router</span><span class="hljs-selector-class">.addRoutes</span>(<span class="hljs-selector-tag">routes</span>)</code></pre>
<p>&#x4E4B;&#x540E;&#x5C31;&#x53EF;&#x4EE5;&#x6210;&#x529F;&#x7684;&#x5BFC;&#x822A;&#x5230;&#x65B0;&#x589E;&#x7684;&#x4E09;&#x4E2A;&#x8DEF;&#x7531;&#x8BB0;&#x5F55;&#x5566;</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
我的 Vue.js 学习日记 （十三） - vue-router

## 原文链接
[https://segmentfault.com/a/1190000015069945](https://segmentfault.com/a/1190000015069945)

