---
title: '实战Vue简易项目（5）模拟数据' 
date: 2018-11-18 2:30:10
hidden: true
slug: cdchfux12mb
categories: [reprint]
---

{{< raw >}}
<p>&#x5173;&#x4E8E;&#x6A21;&#x62DF;&#x6570;&#x636E;&#xFF0C;&#x8FD9;&#x91CC;&#x4F7F;&#x7528;<code>Mock.js</code>&#x8FD9;&#x4E2A;&#x5E93;&#xFF0C;&#x5173;&#x4E8E;&#x7528;&#x6CD5;&#xFF0C;&#x5B98;&#x7F51;&#x8BF4;&#x7684;&#x4E5F;&#x6BD4;&#x8F83;&#x8BE6;&#x7EC6;&#xFF0C;&#x8FD9;&#x91CC;&#x6211;&#x5C31;&#x7B80;&#x5355;&#x7684;&#x5E26;&#x4E00;&#x4E0B;&#x3002;</p><h2 id="articleHeader0">&#x5217;&#x8868;&#x6570;&#x636E;</h2><p>&#x6211;&#x4EEC;&#x5148;&#x5C06;&#x9879;&#x76EE;&#x4E2D;<code>src/components/HelloWorld.vue</code>&#x5220;&#x9664;&#xFF0C;&#x5C06;<code>src/router/index.js</code>&#x4F5C;&#x5982;&#x4E0B;&#x4FEE;&#x6539;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &apos;vue&apos;
import Router from &apos;vue-router&apos;
import Index from &apos;@/views/vacation/&apos;

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: &apos;/&apos;,
      name: &apos;Index&apos;,
      component: Index
    }
  ]
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue-router&apos;</span>
<span class="hljs-keyword">import</span> Index <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;@/views/vacation/&apos;</span>

Vue.use(Router)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({
  routes: [
    {
      path: <span class="hljs-string">&apos;/&apos;</span>,
      name: <span class="hljs-string">&apos;Index&apos;</span>,
      component: Index
    }
  ]
})</code></pre><p>&#x7136;&#x540E;&#xFF0C;&#x5728;<code>src/views/vacation/</code>&#x5EFA;&#x7ACB;<code>index.vue</code>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;template&gt;
  &lt;div&gt;list view&lt;/div&gt;
&lt;/template&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>list view<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span></code></pre><h3 id="articleHeader1">&#x663E;&#x793A;&#x6548;&#x679C;</h3><p>&#x5728;&#x624B;&#x673A;&#x6A21;&#x5F0F;&#x4E0B;&#xFF0C;&#x663E;&#x793A;&#x6548;&#x679C;&#x5982;&#x4E0B;&#xFF1A;</p><p><span class="img-wrap"><img data-src="/img/bVbeQFx?w=323&amp;h=574" src="https://static.alili.tech/img/bVbeQFx?w=323&amp;h=574" alt="&#x5217;&#x8868;&#x521D;&#x59CB;&#x9875;&#x9762;" title="&#x5217;&#x8868;&#x521D;&#x59CB;&#x9875;&#x9762;" style="cursor:pointer;display:inline"></span></p><h3 id="articleHeader2">&#x6A21;&#x62DF;&#x6570;&#x636E;</h3><p>&#x5728;&#x9879;&#x76EE;&#x6839;&#x76EE;&#x5F55;&#x4E0B;&#xFF0C;&#x4F7F;&#x7528;&#x547D;&#x4EE4;&#x884C;<code>npm i -D mockjs</code>&#xFF1B;</p><p><strong>&#x65B0;&#x5EFA;<code>src/mock/list.js</code></strong>:</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { mock, Random } from &quot;mockjs&quot;;

export default mock({
  &apos;list|0-50&apos;: [
    {
      &apos;approveId&apos;: &apos;@id&apos;,
      &apos;applier&apos;: {
        &apos;userId&apos;: &apos;@guid&apos;,
        &apos;userName&apos;: &apos;@cname&apos;,
        &apos;sectionId&apos;: &apos;@id&apos;,
        &apos;sectionName&apos;: &apos;@ctitle&apos;,
      }
      ...
    }
  ]
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xquery"><code><span class="hljs-keyword">import</span> { mock, Random } from <span class="hljs-string">&quot;mockjs&quot;</span>;

export <span class="hljs-keyword">default</span> mock({
  <span class="hljs-string">&apos;list|0-50&apos;</span>: [
    {
      <span class="hljs-string">&apos;approveId&apos;</span>: <span class="hljs-string">&apos;@id&apos;</span>,
      <span class="hljs-string">&apos;applier&apos;</span>: {
        <span class="hljs-string">&apos;userId&apos;</span>: <span class="hljs-string">&apos;@guid&apos;</span>,
        <span class="hljs-string">&apos;userName&apos;</span>: <span class="hljs-string">&apos;@cname&apos;</span>,
        <span class="hljs-string">&apos;sectionId&apos;</span>: <span class="hljs-string">&apos;@id&apos;</span>,
        <span class="hljs-string">&apos;sectionName&apos;</span>: <span class="hljs-string">&apos;@ctitle&apos;</span>,
      }
      ...
    }
  ]
})</code></pre><ul><li>&#x8FD9;&#x91CC;&#x7684;<code>&apos;@id&apos;</code>&#xFF08;&#x79F0;&#x4E3A;&#x201C;&#x5360;&#x4F4D;&#x7B26;&#x201D;&#xFF09;&#x662F;<code>Random.id()</code>&#x7684;&#x7B80;&#x5199;&#x5F62;&#x5F0F;&#xFF1B;</li><li>&#x8FD9;&#x91CC;&#x7684;<code>&apos;@id&apos;</code>&#xFF08;&#x79F0;&#x4E3A;&#x201C;&#x5360;&#x4F4D;&#x7B26;&#x201D;&#xFF09;&#x5FC5;&#x987B;&#x4F7F;&#x7528;&#x5F15;&#x53F7;&#x5305;&#x88F9;&#xFF1B;</li><li>&#x8FD9;&#x91CC;&#x7684;<code>&apos;@id&apos; + 111</code>&#x4F1A;&#x662F;&#x5C06;<code>&apos;@id&apos;</code>&#x5F53;&#x4F5C;&#x5B57;&#x7B26;&#x4E32;&#xFF08;&#x8FD4;&#x56DE;<code>&apos;@id111&apos;</code>&#xFF09;&#xFF0C;&#x4E0D;&#x7B49;&#x4E8E;<code>Random.id() + 111</code>&#xFF1B;</li></ul><p><strong>&#x65B0;&#x5EFA;<code>src/mock/index.js</code></strong>&#xFF1A;</p><p><code>Mock.js</code>&#x62E6;&#x622A;&#x8BF7;&#x6C42;&#x5730;&#x5740;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { mock, Random } from &quot;mockjs&quot;;
import List from &quot;./list&quot;;

mock(&apos;\/&apos;,&apos;get&apos;,()=&gt; List);" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> { mock, Random } <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;mockjs&quot;</span>;
<span class="hljs-keyword">import</span> List <span class="hljs-keyword">from</span> <span class="hljs-string">&quot;./list&quot;</span>;

mock(<span class="hljs-string">&apos;\/&apos;</span>,<span class="hljs-string">&apos;get&apos;</span>,<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span> List);</code></pre><ul><li>&#x5728;&#x8FD9;&#x91CC;&#xFF0C;&#x4F7F;&#x7528;<code>Mock.mock( rurl?, rtype?, function( options ) )</code>&#x62E6;&#x622A;&#x8DEF;&#x7531;&#x8BF7;&#x6C42;&#x7684;<code>/</code>&#x8DEF;&#x5F84;&#xFF0C;&#x8FD4;&#x56DE;&#x6A21;&#x62DF;&#x7684;<code>List</code>&#x5217;&#x8868;&#x3002;</li><li><p><code>rurl</code>&#xFF1A;&#x62E6;&#x622A;&#x8DEF;&#x5F84;&#x89C4;&#x5219;&#xFF0C;&#x53EF;&#x4EE5;&#x662F;&#x5B57;&#x7B26;&#x4E32;<code>&apos;/&apos;</code>&#xFF0C;&#x4E5F;&#x53EF;&#x4EE5;&#x662F;&#x4E00;&#x4E2A;&#x6B63;&#x5219;&#x8868;&#x8FBE;&#x5F0F;<code>/\//</code>&#x3002;</p><ul><li>&#x82E5;&#x8BF7;&#x6C42;<code>/?id=&quot;1&quot;</code>&#xFF0C;<code>mock</code>&#x7684;&#x62E6;&#x622A;&#x8DEF;&#x5F84;&#x53EF;&#x4EE5;&#x5199;&#x6210;<code>Mock.mock(/\/?id=\&quot;\d\&quot;/,&apos;get&apos;,()=&gt;List)</code>&#xFF1B;</li><li>&#x82E5;&#x9700;&#x8981;&#x6839;&#x636E;&#x8BF7;&#x6C42;&#x53C2;&#x6570;&#x4E0D;&#x540C;&#xFF0C;&#x8FD4;&#x56DE;&#x5BF9;&#x5E94;<code>id</code>&#x7684;&#x6570;&#x636E;&#xFF0C;&#x5219;&#x9700;&#x8981;&#x81EA;&#x5DF1;&#x622A;&#x53D6;<code>url</code>&#x5B57;&#x7B26;&#x4E32;&#x4F5C;&#x5224;&#x65AD;&#x4E86;&#xFF1B;</li></ul></li><li><code>rtype</code>&#xFF1A;&#x62E6;&#x622A;&#x8BF7;&#x6C42;&#x7C7B;&#x578B;&#xFF0C;<code>get</code>&#x6216;<code>post</code>&#xFF1B;</li><li><p><code>function(options)</code>&#xFF1A;&#x56DE;&#x8C03;&#x51FD;&#x6570;&#xFF0C;&#x62E6;&#x622A;&#x6210;&#x529F;&#x540E;&#x7684;&#x5904;&#x7406;&#x903B;&#x8F91;&#xFF1B;</p><ul><li><code>optioins = {url, type, body}</code>&#xFF1B;</li><li><code>url</code>&#x4E3A;&#x8BF7;&#x6C42;&#x5730;&#x5740;&#xFF1B;</li><li><code>type</code>&#x4E3A;&#x8BF7;&#x6C42;&#x7C7B;&#x578B;&#xFF1B;</li><li><code>body</code>&#x4E3A;&#x8BF7;&#x6C42;&#x65F6;&#x4F20;&#x5165;&#x7684;&#x6570;&#x636E;&#xFF08;&#x53EA;&#x5728;<code>post</code>&#x8BF7;&#x6C42;&#x65F6;&#x6709;&#x7528;&#xFF09;&#xFF1B;</li></ul></li></ul><h3 id="articleHeader3">&#x72B6;&#x6001;&#x7BA1;&#x7406;</h3><p>&#x8FD9;&#x91CC;&#xFF0C;&#x6211;&#x4EEC;&#x4F7F;&#x7528;<code>vuex</code>&#x4F5C;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#xFF0C;<code>axios</code>&#x8BF7;&#x6C42;&#x6570;&#x636E;&#xFF1A;<code>npm i -S vuex axios</code>&#xFF1B;</p><p><strong>&#x65B0;&#x5EFA;<code>src/store/index.js</code></strong>&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &apos;vue&apos;;
import Vuex from &apos;vuex&apos;;
import axios from &apos;axios&apos;;

Vue.use(Vuex);

const $setApplications = &apos;SETAPPLICATIONS&apos;;

export default new Vuex.Store({
  state: {
    applications: null,
  },
  mutations: {
    [$setApplications]: (state, list) =&gt; state.applications = list,
  },
  actions: {
    requestApplications({ commit, state }) {
      axios.get(&apos;/&apos;)
        .then(({data:{list"}}") =&gt; {
          commit($setApplications, list);
        })
        .catch(() =&gt; {
          console.log(arguments);
        })
    }
  }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code>import Vue <span class="hljs-keyword">from</span> &apos;vue&apos;;
import Vuex <span class="hljs-keyword">from</span> &apos;vuex&apos;;
import axios <span class="hljs-keyword">from</span> &apos;axios&apos;;

Vue.use(Vuex);

const <span class="hljs-variable">$setApplications</span> = &apos;SETAPPLICATIONS&apos;;

export <span class="hljs-keyword">default</span> new Vuex.Store({
  <span class="hljs-keyword">state</span>: {
    applications: null,
  },
  mutations: {
    [<span class="hljs-variable">$setApplications</span>]: (<span class="hljs-keyword">state</span>, list) =&gt; <span class="hljs-keyword">state</span>.applications = list,
  },
  actions: {
    requestApplications({ commit, <span class="hljs-keyword">state</span> }) {
      axios.get(&apos;/&apos;)
        .then(({data:{list"}}") =&gt; {
          commit(<span class="hljs-variable">$setApplications</span>, list);
        })
        .catch(() =&gt; {
          console.<span class="hljs-keyword">log</span>(arguments);
        })
    }
  }
})</code></pre><ul><li>&#x5728;&#x8FD9;&#x91CC;&#xFF0C;<code>state</code>&#x4FDD;&#x5B58;&#x6574;&#x4E2A;&#x9879;&#x76EE;&#x516C;&#x7528;&#x7684;&#x72B6;&#x6001;&#xFF0C;<code>mutations</code>&#x8FDB;&#x884C;&#x540C;&#x6B65;&#x6570;&#x636E;&#x5904;&#x7406;&#xFF0C;<code>actions</code>&#x5904;&#x7406;&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#x3002;</li><li><code>mutations</code>&#x662F;&#x552F;&#x4E00;&#x4FEE;&#x6539;<code>state</code>&#x7684;&#x5165;&#x53E3;&#xFF0C;<code>actions</code>&#x8981;&#x60F3;&#x4FEE;&#x6539;<code>state</code>&#xFF0C;&#x9700;&#x8981;&#x5185;&#x90E8;&#x8C03;&#x7528;&#x4E00;&#x4E0B;<code>mutations</code>&#xFF1B;</li><li><p>&#x5728;&#x9879;&#x76EE;&#x7A0B;&#x5E8F;&#x4E2D;&#xFF0C;&#x901A;&#x8FC7;<code>this.$store.commit(&apos;SETAPPLICATIONS&apos;,null)</code>&#x4FEE;&#x6539;<code>state</code>&#x7684;&#x503C;&#x3002;</p><ul><li>&#x82E5;&#x8981;&#x4F20;&#x591A;&#x4E2A;&#x503C;&#xFF0C;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#x4E3A;&#x4E00;&#x4E2A;&#x5BF9;&#x8C61;&#xFF08;&#x4E0D;&#x63A5;&#x53D7;&#x591A;&#x4E2A;&#x53C2;&#x6570;&#x7684;&#x4F20;&#x5165;&#xFF0C;&#x6700;&#x591A;&#x53EA;&#x63A5;&#x6536;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#xFF09;&#xFF1B;</li></ul></li><li><p>&#x5728;&#x9879;&#x76EE;&#x4E2D;&#xFF0C;&#x901A;&#x8FC7;<code>this.$store.dispatch(&apos;requestApplications&apos;)</code>&#x8C03;&#x7528;&#x4E00;&#x4E2A;&#x5F02;&#x6B65;&#x8BF7;&#x6C42;&#x3002;</p><ul><li>&#x82E5;&#x9700;&#x8981;&#x4F20;&#x53C2;&#xFF0C;&#x4F20;&#x7B2C;&#x4E8C;&#x4E2A;&#x53C2;&#x6570;&#xFF08;&#x4E0D;&#x63A5;&#x53D7;&#x591A;&#x4E2A;&#x53C2;&#x6570;&#x7684;&#x4F20;&#x5165;&#xFF0C;&#x6700;&#x591A;&#x53EA;&#x63A5;&#x6536;&#x4E24;&#x4E2A;&#x53C2;&#x6570;&#xFF09;&#xFF1B;</li></ul></li></ul><h3 id="articleHeader4">&#x8BF7;&#x6C42;&#x6570;&#x636E;</h3><p>&#x76EE;&#x524D;&#xFF0C;&#x901A;&#x8FC7;&#x4EE5;&#x4E0A;&#x6B65;&#x9AA4;&#xFF0C;&#x6211;&#x4EEC;&#x72EC;&#x7ACB;&#x7684;&#x6784;&#x5EFA;&#x4E86;&#x6A21;&#x62DF;&#x6570;&#x636E;&#x548C;&#x72B6;&#x6001;&#x7BA1;&#x7406;&#xFF0C;&#x4F46;&#x8FD8;&#x6CA1;&#x6709;&#x5C06;&#x5B83;&#x4EEC;&#x7ED3;&#x5408;&#x8D77;&#x6765;&#x3002;</p><p><code>src/main.js</code>&#x4E2D;&#x6DFB;&#x52A0;<code>import &apos;./mock&apos;</code>&#x3001;<code>import store from &apos;./store&apos;</code>&#xFF0C;&#x4E14;&#x4FEE;&#x6539;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Vue({
  el: &apos;#app&apos;,
  router,
  store,
  components: { App },
  template: &apos;&lt;App/&gt;&apos;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Vue</span>({
  <span class="hljs-attribute">el</span>: <span class="hljs-string">&apos;#app&apos;</span>,
  router,
  store,
  <span class="hljs-attribute">components</span>: { App },
  <span class="hljs-attribute">template</span>: <span class="hljs-string">&apos;&lt;App/&gt;&apos;</span>
})</code></pre><p>&#x7ED3;&#x675F;&#x4E86;&#xFF1F;</p><p>&#x8FD8;&#x6CA1;&#x6709;&#xFF0C;&#x6211;&#x4EEC;&#x8FD8;&#x8981;&#x83B7;&#x53D6;&#x6570;&#x636E;&#xFF1A;<br>&#x5728;<code>src/views/vacation/index.vue</code>&#x4E2D;&#x6DFB;&#x52A0;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&lt;script&gt;
export default {
  beforeCreate(){
    this.$store.dispatch(&apos;requestApplications&apos;);
  }
}
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  beforeCreate(){
    <span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">&apos;requestApplications&apos;</span>);
  }
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre><p>&#x89E6;&#x53D1;&#x8BF7;&#x6C42;&#x3002;</p><h3 id="articleHeader5">&#x8BF7;&#x6C42;&#x7ED3;&#x679C;</h3><p><span class="img-wrap"><img data-src="/img/bVbeQHP?w=485&amp;h=314" src="https://static.alili.tech/img/bVbeQHP?w=485&amp;h=314" alt="&#x8BF7;&#x6C42;&#x7ED3;&#x679C;.png" title="&#x8BF7;&#x6C42;&#x7ED3;&#x679C;.png" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader6">Mock.js&#x7528;&#x6CD5;</h2><p>&#x5982;&#x679C;&#x60F3;&#x4E86;&#x89E3;<code>Mock.js</code>&#x7684;&#x7528;&#x6CD5;&#xFF0C;&#x63A8;&#x8350;&#x770B;&#x5B98;&#x7F51;&#x7684;<a href="https://github.com/nuysoft/Mock/wiki" rel="nofollow noreferrer" target="_blank">&quot;&#x6587;&#x6863;&quot;&#x9875;</a>&#xFF0C;&#x800C;&#x4E0D;&#x662F;&quot;&#x793A;&#x4F8B;&quot;&#x9875;&#x3002;</p><p><code>Mock.js</code>&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;&#x683C;&#x5F0F;&#x90FD;&#x662F;&#x5BF9;&#x8C61;&#xFF0C;&#x5982;&#x679C;&#x60F3;&#x83B7;&#x53D6;&#x5176;&#x5B83;&#x683C;&#x5F0F;&#xFF08;&#x5982;&#x6570;&#x7EC4;...&#xFF09;&#x9700;&#x8981;&#x81EA;&#x5DF1;&#x53E6;&#x8F9F;&#x8E4A;&#x5F84;&#x4E86;&#x3002;</p><h3 id="articleHeader7">&#x89C4;&#x5219;</h3><p><strong>&#x683C;&#x5F0F;&#xFF1A;</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Mock.mock({
  // &#x521D;&#x59CB;&#x5316;&#x5BF9;&#x8C61;&#xFF0C;&#x4E5F;&#x662F;&#x8F93;&#x51FA;&#x7684;&#x5BF9;&#x8C61;&#xFF1B;
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code><span class="hljs-selector-tag">Mock</span><span class="hljs-selector-class">.mock</span>({
  <span class="hljs-comment">// &#x521D;&#x59CB;&#x5316;&#x5BF9;&#x8C61;&#xFF0C;&#x4E5F;&#x662F;&#x8F93;&#x51FA;&#x7684;&#x5BF9;&#x8C61;&#xFF1B;</span>
})</code></pre><p><strong>&#x8BED;&#x6CD5;&#x89C4;&#x8303;&#xFF1A;</strong></p><blockquote>&#x6570;&#x636E;&#x6A21;&#x677F;&#x4E2D;&#x7684;&#x6BCF;&#x4E2A;&#x5C5E;&#x6027;&#x7531; 3 &#x90E8;&#x5206;&#x6784;&#x6210;&#xFF1A;&#x5C5E;&#x6027;&#x540D;&#x3001;&#x751F;&#x6210;&#x89C4;&#x5219;&#x3001;&#x5C5E;&#x6027;&#x503C;&#xFF1A;<p>// &#x5C5E;&#x6027;&#x540D; name<br>// &#x751F;&#x6210;&#x89C4;&#x5219; rule<br>// &#x5C5E;&#x6027;&#x503C; value<br>&apos;name|rule&apos;: value</p></blockquote><hr><blockquote>&#x5C5E;&#x6027;&#x540D; &#x548C; &#x751F;&#x6210;&#x89C4;&#x5219; &#x4E4B;&#x95F4;&#x7528;&#x7AD6;&#x7EBF; | &#x5206;&#x9694;&#xFF08;&#x5343;&#x4E07;&#x4E0D;&#x8981;&#x5E26;&#x7A7A;&#x683C;&#x5416;&#xFF0C;&#x5426;&#x5219;&#xFF0C;&#x4F60;&#x7684;&#x5C5E;&#x6027;&#x540D;&#x53EF;&#x80FD;&#x4F1A;&#x5305;&#x542B;&#x7A7A;&#x683C;&#xFF09;&#x3002;<br>&#x751F;&#x6210;&#x89C4;&#x5219; &#x662F;&#x53EF;&#x9009;&#x7684;&#x3002;<br>&#x751F;&#x6210;&#x89C4;&#x5219; &#x6709; 7 &#x79CD;&#x683C;&#x5F0F;&#xFF1A;<br>&apos;name|min-max&apos;: value<br>&apos;name|count&apos;: value<br>&apos;name|min-max.dmin-dmax&apos;: value<br>&apos;name|min-max.dcount&apos;: value<br>&apos;name|count.dmin-dmax&apos;: value<br>&apos;name|count.dcount&apos;: value<br>&apos;name|+step&apos;: value<br>&#x751F;&#x6210;&#x89C4;&#x5219; &#x7684; &#x542B;&#x4E49; &#x9700;&#x8981;&#x4F9D;&#x8D56; &#x5C5E;&#x6027;&#x503C;&#x7684;&#x7C7B;&#x578B; &#x624D;&#x80FD;&#x786E;&#x5B9A;&#x3002;<br>&#x5C5E;&#x6027;&#x503C; &#x4E2D;&#x53EF;&#x4EE5;&#x542B;&#x6709; @&#x5360;&#x4F4D;&#x7B26;&#x3002;<br>&#x5C5E;&#x6027;&#x503C; &#x8FD8;&#x6307;&#x5B9A;&#x4E86;&#x6700;&#x7EC8;&#x503C;&#x7684;&#x521D;&#x59CB;&#x503C;&#x548C;&#x7C7B;&#x578B;&#x3002;</blockquote><h3 id="articleHeader8">&#x9A8C;&#x8BC1;</h3><p>&#x5982;&#x679C;&#x4F60;&#x60F3;&#x9A8C;&#x8BC1;&#x5199;&#x51FA;&#x6765;&#x7684;&#x6A21;&#x62DF;&#x6570;&#x636E;&#x662F;&#x5426;&#x6B63;&#x786E;&#xFF0C;&#x53EF;&#x4EE5;&#x5728;<a href="http://mockjs.com/examples.html" rel="nofollow noreferrer" target="_blank">&#x201C;&#x793A;&#x4F8B;&#x201D;&#x9875;</a>&#x6253;&#x5F00;&#x63A7;&#x5236;&#x53F0;&#xFF0C;&#x76F4;&#x63A5;&#x8FD0;&#x884C;&#x3002;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Mock.mock({
  &apos;list|1-10&apos;:[
    Random.id(),
  ]
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs applescript"><code>Mock.mock({
  &apos;<span class="hljs-built_in">list</span>|<span class="hljs-number">1</span><span class="hljs-number">-10</span>&apos;:[
    Random.<span class="hljs-built_in">id</span>(),
  ]
})</code></pre><h3 id="articleHeader9">&#x6D4B;&#x8BD5;&#x7ED3;&#x679C;</h3><p><span class="img-wrap"><img data-src="/img/bVbeQDW?w=1096&amp;h=495" src="https://static.alili.tech/img/bVbeQDW?w=1096&amp;h=495" alt="mock&#x9A8C;&#x8BC1;" title="mock&#x9A8C;&#x8BC1;" style="cursor:pointer"></span></p><h2 id="articleHeader10"><a href="https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd" rel="nofollow noreferrer" target="_blank">vue-devtools</a></h2><p><a href="https://github.com/vuejs/vue-devtools#installation" rel="nofollow noreferrer" target="_blank">&#x5B89;&#x88C5;&#x5730;&#x5740;</a></p><h3 id="articleHeader11">&#x4F7F;&#x7528;&#x63D0;&#x9192;</h3><ul><li><code>$vm0</code>&#x6307;&#x5411;&#x67D0;&#x4E00;&#x7EC4;&#x4EF6;&#x5B9E;&#x4F8B;&#xFF0C;&#x8BE5;&#x5B9E;&#x4F8B;&#x5FC5;&#x987B;&#x6253;&#x5F00;&#x63A7;&#x5236;&#x53F0;&#x7684;<code>Vue</code>Tab&#x9875;&#xFF0C;&#x70B9;&#x51FB;&#x67D0;&#x4E00;&#x7EC4;&#x4EF6;&#x65F6;&#x624D;&#x80FD;&#x83B7;&#x53D6;&#x5230;&#xFF0C;&#x5426;&#x5219;&#xFF0C;&#x6C47;&#x62A5;<code>$vm0&#x672A;&#x5B9A;&#x4E49;</code>&#x3002;</li><li>&#x70B9;&#x51FB;&#x54EA;&#x4E2A;&#x7EC4;&#x4EF6;&#xFF0C;<code>$vm0</code>&#x6307;&#x5411;&#x54EA;&#x4E2A;&#x7EC4;&#x4EF6;&#xFF0C;&#x624D;&#x80FD;&#x83B7;&#x53D6;&#x5230;&#x8BE5;&#x7EC4;&#x4EF6;&#x4E0A;&#x7684;&#x5C5E;&#x6027;&#x3002;</li></ul><p><span class="img-wrap"><img data-src="/img/bVbeQMG?w=660&amp;h=601" src="https://static.alili.tech/img/bVbeQMG?w=660&amp;h=601" alt="&#x4F7F;&#x7528;&#x63D0;&#x9192;" title="&#x4F7F;&#x7528;&#x63D0;&#x9192;" style="cursor:pointer;display:inline"></span></p><h2 id="articleHeader12">&#x7AE0;&#x8282;&#x56DE;&#x987E;</h2><ul><li>&#x77E5;&#x9053;&#x5982;&#x4F55;&#x6A21;&#x62DF;&#x6570;&#x636E;&#x4E86;&#x5427;&#xFF0C;&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x8981;&#x5077;&#x5077;&#x7684;&#x6A21;&#x62DF;&#x5217;&#x8868;&#x7684;&#x6570;&#x636E;&#x4E86;&#x5462;&#xFF0C;&#x4F60;&#x4E5F;&#x4E0D;&#x8981;&#x5FD8;&#x4E86;&#x3002;</li><li>&#x5982;&#x4F55;&#x4F7F;&#x7528;<code>Mock.js</code>&#x62E6;&#x622A;&#x8BF7;&#x6C42;&#x5462;&#xFF0C;&#x5982;&#x4F55;&#x83B7;&#x5F97;&#x8BF7;&#x6C42;&#x65F6;&#x7684;&#x6570;&#x636E;&#x5462;&#xFF1F;</li><li>&#x5982;&#x4F55;&#x901A;&#x8FC7;<code>axios</code>&#x8BF7;&#x6C42;&#x6570;&#x636E;&#x5462;&#xFF0C;&#x5B83;&#x548C;<code>mutations</code>&#x6709;&#x4F55;&#x533A;&#x522B;&#xFF1F;</li></ul><h2 id="articleHeader13">&#x601D;&#x8003;</h2><ul><li>&#x61D2;&#x8D27;&#x4E00;&#x679A;&#xFF0C;&#x9009;&#x62E9;&#x7B2C;&#x4E09;&#x65B9;&#x5217;&#x8868;&#x5E93;&#xFF0C;&#x5982;&#x4F55;&#x5728;<code>Vue</code>&#x9879;&#x76EE;&#x4E2D;&#x4F7F;&#x7528;&#x5462;&#xFF1F;</li></ul><h2 id="articleHeader14">&#x76F8;&#x5173;&#x7684;&#x5B98;&#x65B9;&#x6587;&#x6863;</h2><p><a href="https://github.com/nuysoft/Mock/wiki" rel="nofollow noreferrer" target="_blank">MockJS&#x4F7F;&#x7528;&#x6587;&#x6863;</a></p><p><a href="http://mockjs.com/examples.html" rel="nofollow noreferrer" target="_blank">MockJS&#x793A;&#x4F8B;&#xFF08;&#x53EF;&#x901A;&#x8FC7;&#x63A7;&#x5236;&#x53F0;&#x6D4B;&#x8BD5;&#xFF09;</a></p><p><a href="https://vuex.vuejs.org/zh/guide/" rel="nofollow noreferrer" target="_blank">Vuex&#x5B98;&#x7F51;</a></p><h2 id="articleHeader15">&#x756A;&#x5916;</h2><p><a href="https://segmentfault.com/a/1190000004974090">Vue-router&#x7528;&#x6CD5;</a></p>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
实战Vue简易项目（5）模拟数据

## 原文链接
[https://segmentfault.com/a/1190000015893514](https://segmentfault.com/a/1190000015893514)

