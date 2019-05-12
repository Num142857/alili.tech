---
title: '已配置好的vue全家桶项目router,vuex,api,axios,vue-ls,async/await,less下载即使用' 
date: 2018-11-29 9:33:05
hidden: true
slug: s8pw8lfc4y
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">github &#x5730;&#x5740;&#xFF1A; <a href="https://github.com/liangfengbo/vue-cli-project" rel="nofollow noreferrer" target="_blank">https://github.com/liangfengbo/vue-cli-project &#x70B9;&#x51FB;&#x8FDB;&#x5165;</a>
</h2>
<h2 id="articleHeader1">vue-cli-project</h2>
<ul>
<li>&#x5DF2;&#x6784;&#x5EFA;&#x914D;&#x7F6E;&#x597D;&#x7684;vuejs&#x5168;&#x5BB6;&#x6876;&#x9879;&#x76EE;&#xFF0C;&#x7EDF;&#x4E00;&#x7BA1;&#x7406;&#x540E;&#x7AEF;&#x63A5;&#x53E3; | &#x83B7;&#x53D6;&#x6570;&#x636E; | &#x8BF7;&#x6C42;&#x6570;&#x636E;&#xFF0C;&#x5DF2;&#x5305;&#x542B;vue-router&#xFF0C;vuex&#xFF0C;api&#xFF0C;axios. webpack, &#x50A8;&#x5B58;&#x7528;vue-ls, &#x5F02;&#x6B65;async/await, css less. &#x4E0B;&#x8F7D;&#x5373;&#x4F7F;&#x7528;&#x9879;&#x76EE;&#x5F00;&#x53D1;&#x3002;</li>
<li>&#x559C;&#x6B22;&#x6216;&#x5BF9;&#x4F60;&#x6709;&#x5E2E;&#x52A9;&#x7684;&#x8BDD;&#x8BF7;&#x70B9;star&#x2728;&#x2728;&#xFF0C;Thanks.</li>
</ul>
<blockquote>A Vue.js project</blockquote>
<h3 id="articleHeader2">&#x4F7F;&#x7528;</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# &#x5B89;&#x88C5;&#x670D;&#x52A1;
npm install

# &#x542F;&#x52A8;&#x670D;&#x52A1;
npm run dev
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># &#x5B89;&#x88C5;&#x670D;&#x52A1;</span>
npm install

<span class="hljs-comment"># &#x542F;&#x52A8;&#x670D;&#x52A1;</span>
npm run dev
</code></pre>
<h3 id="articleHeader3">&#x8BF4;&#x660E;</h3>
<h4>src&#x67B6;&#x6784;</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x251C;&#x2500;&#x2500; App.vue
&#x251C;&#x2500;&#x2500; api
&#x2502;   &#x251C;&#x2500;&#x2500; doctor.js
&#x2502;   &#x2514;&#x2500;&#x2500; fetch.js
&#x251C;&#x2500;&#x2500; assets
&#x2502;   &#x2514;&#x2500;&#x2500; logo.png
&#x251C;&#x2500;&#x2500; components
&#x2502;   &#x2514;&#x2500;&#x2500; HelloWorld.vue
&#x251C;&#x2500;&#x2500; libs
&#x2502;   &#x2514;&#x2500;&#x2500; util.js
&#x251C;&#x2500;&#x2500; main.js
&#x251C;&#x2500;&#x2500; router
&#x2502;   &#x2514;&#x2500;&#x2500; index.js
&#x251C;&#x2500;&#x2500; store
&#x2502;   &#x251C;&#x2500;&#x2500; index.js
&#x2502;   &#x251C;&#x2500;&#x2500; modules
&#x2502;   &#x2514;&#x2500;&#x2500; mutation-types.js
&#x2514;&#x2500;&#x2500; views
    &#x2514;&#x2500;&#x2500; doctor" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs stylus"><code>&#x251C;&#x2500;&#x2500; App<span class="hljs-selector-class">.vue</span>
&#x251C;&#x2500;&#x2500; api
&#x2502;   &#x251C;&#x2500;&#x2500; doctor<span class="hljs-selector-class">.js</span>
&#x2502;   &#x2514;&#x2500;&#x2500; fetch<span class="hljs-selector-class">.js</span>
&#x251C;&#x2500;&#x2500; assets
&#x2502;   &#x2514;&#x2500;&#x2500; logo<span class="hljs-selector-class">.png</span>
&#x251C;&#x2500;&#x2500; components
&#x2502;   &#x2514;&#x2500;&#x2500; HelloWorld<span class="hljs-selector-class">.vue</span>
&#x251C;&#x2500;&#x2500; libs
&#x2502;   &#x2514;&#x2500;&#x2500; util<span class="hljs-selector-class">.js</span>
&#x251C;&#x2500;&#x2500; main<span class="hljs-selector-class">.js</span>
&#x251C;&#x2500;&#x2500; router
&#x2502;   &#x2514;&#x2500;&#x2500; index<span class="hljs-selector-class">.js</span>
&#x251C;&#x2500;&#x2500; store
&#x2502;   &#x251C;&#x2500;&#x2500; index<span class="hljs-selector-class">.js</span>
&#x2502;   &#x251C;&#x2500;&#x2500; modules
&#x2502;   &#x2514;&#x2500;&#x2500; mutation-types<span class="hljs-selector-class">.js</span>
&#x2514;&#x2500;&#x2500; views
    &#x2514;&#x2500;&#x2500; doctor</code></pre>
<p>&#x5904;&#x7406;&#x6570;&#x636E;&#x9875;&#x9762;&#x8FD9;2&#x5927;&#x5757;&#xFF0C;&#x628A;&#x6570;&#x636E;&#x548C;&#x9875;&#x9762;&#x5206;&#x79BB;&#xFF0C;&#x5728;vuex&#x91CC;&#x9762;&#x505A;&#x8BF7;&#x6C42;&#x6570;&#x636E;&#xFF0C;&#x9875;&#x9762;&#x53EA;&#x9700;&#x8981;&#x505A;&#x8C03;&#x7528;&#x6570;&#x636E;&#x3002;</p>
<p>&#x8BF7;&#x6C42;&#x63A5;&#x53E3;&#x8FD9;&#x5757;&#x518D;&#x7EC6;&#x5206;&#xFF0C;&#x63A5;&#x53E3;&#x548C;&#x8BF7;&#x6C42;&#x63A5;&#x53E3;&#x5206;&#x5F00;&#xFF0C;&#x6211;&#x4F7F;&#x7528;&#x4E86;&#x6700;&#x65B0;&#x7684;async/await&#x51FD;&#x6570;&#x505A;&#x6570;&#x636E;&#x8BF7;&#x6C42;</p>
<h4>api&#x6587;&#x4EF6;&#x5939; &#x4E3B;&#x8981;&#x653E;&#x540E;&#x7AEF;&#x63D0;&#x4F9B;&#x7684;&#x63A5;&#x53E3;&#xFF0C;&#x5982;</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import fetch from &apos;./fetch&apos;;

export default {
  // &#x83B7;&#x53D6;&#x533B;&#x751F;&#x5217;&#x8868;
  list(params) {
    return fetch.get(&apos;/doctor/list&apos;, params)
  },

  // &#x83B7;&#x53D6;&#x533B;&#x751F;&#x8BE6;&#x60C5;&#x4FE1;&#x606F;
  detail(id) {
    return fetch.post(&apos;/doctor/detail/&apos; + id);
  },
}" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> fetch <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;./fetch&apos;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-comment">// &#x83B7;&#x53D6;&#x533B;&#x751F;&#x5217;&#x8868;</span>
  list(params) {
    <span class="hljs-keyword">return</span> fetch.get(<span class="hljs-string">&apos;/doctor/list&apos;</span>, params)
  },

  <span class="hljs-comment">// &#x83B7;&#x53D6;&#x533B;&#x751F;&#x8BE6;&#x60C5;&#x4FE1;&#x606F;</span>
  detail(id) {
    <span class="hljs-keyword">return</span> fetch.post(<span class="hljs-string">&apos;/doctor/detail/&apos;</span> + id);
  },
}</code></pre>
<h4>fetch.js &#x6587;&#x4EF6;&#x662F;&#x5C01;&#x88C5;axios&#x8BF7;&#x6C42;&#xFF0C;&#x4EE5;&#x53CA;&#x8BF7;&#x6C42;&#x5904;&#x7406;&#xFF0C;&#x548C;http&#x72B6;&#x6001;&#x7801;&#x7684;&#x7B49;&#x5904;&#x7406;</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Util from &apos;../libs/util&apos;
import qs from &apos;qs&apos;
import Vue from &apos;vue&apos;

Util.ajax.defaults.headers.common = {
  &apos;X-Requested-With&apos;: &apos;XMLHttpRequest&apos;
};

Util.ajax.interceptors.request.use(config =&gt; {
  /**
   * &#x5728;&#x8FD9;&#x91CC;&#x505A;loading ...
   * @type {string}
   */

  // &#x83B7;&#x53D6;token
  config.headers.common[&apos;Authorization&apos;] = &apos;Bearer &apos; + Vue.ls.get(&quot;web-token&quot;);
  return config

}, error =&gt; {
  return Promise.reject(error)

});

Util.ajax.interceptors.response.use(response =&gt; {

  /**
   * &#x5728;&#x8FD9;&#x91CC;&#x505A;loading &#x5173;&#x95ED;
   */

    // &#x5982;&#x679C;&#x540E;&#x7AEF;&#x6709;&#x65B0;&#x7684;token&#x5219;&#x91CD;&#x65B0;&#x7F13;&#x5B58;
  let newToken = response.headers[&apos;new-token&apos;];

  if (newToken) {
    Vue.ls.set(&quot;web-token&quot;, newToken);
  }

  return response;

}, error =&gt; {
  let response = error.response;
  if (response.status == 401) {
    // &#x5904;&#x7406;401&#x9519;&#x8BEF;

  } else if (response.status == 403) {
    // &#x5904;&#x7406;403&#x9519;&#x8BEF;

  } else if (response.status == 412) {
    // &#x5904;&#x7406;412&#x9519;&#x8BEF;

  } else if (response.status == 413) {
    // &#x5904;&#x7406;413&#x6743;&#x9650;&#x4E0D;&#x8DB3;

  }

  return Promise.reject(response)

});

export default {
  post(url, data) {

    return Util.ajax({
      method: &apos;post&apos;,
      url: url,
      data: qs.stringify(data),
      timeout: 30000,
      headers: {
        &apos;Content-Type&apos;: &apos;application/x-www-form-urlencoded; charset=UTF-8&apos;
      }
    })
  },

  get(url, params) {
    return Util.ajax({
      method: &apos;get&apos;,
      url: url,
      params,
    })
  },

  delete(url, params) {
    return Util.ajax({
      method: &apos;delete&apos;,
      url: url,
      params
    })
  },

  put(url, data) {

    return Util.ajax({
      method: &apos;put&apos;,
      url: url,
      data: qs.stringify(data),
      timeout: 30000,
      headers: {
        &apos;Content-Type&apos;: &apos;application/x-www-form-urlencoded; charset=UTF-8&apos;
      }
    })
  }
}
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Util <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../libs/util&apos;</span>
<span class="hljs-keyword">import</span> qs <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;qs&apos;</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>

Util.ajax.defaults.headers.common = {
  <span class="hljs-string">&apos;X-Requested-With&apos;</span>: <span class="hljs-string">&apos;XMLHttpRequest&apos;</span>
};

Util.ajax.interceptors.request.use(<span class="hljs-function"><span class="hljs-params">config</span> =&gt;</span> {
  <span class="hljs-comment">/**
   * &#x5728;&#x8FD9;&#x91CC;&#x505A;loading ...
   * @type {string}
   */</span>

  <span class="hljs-comment">// &#x83B7;&#x53D6;token</span>
  config.headers.common[<span class="hljs-string">&apos;Authorization&apos;</span>] = <span class="hljs-string">&apos;Bearer &apos;</span> + Vue.ls.get(<span class="hljs-string">&quot;web-token&quot;</span>);
  <span class="hljs-keyword">return</span> config

}, error =&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error)

});

Util.ajax.interceptors.response.use(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {

  <span class="hljs-comment">/**
   * &#x5728;&#x8FD9;&#x91CC;&#x505A;loading &#x5173;&#x95ED;
   */</span>

    <span class="hljs-comment">// &#x5982;&#x679C;&#x540E;&#x7AEF;&#x6709;&#x65B0;&#x7684;token&#x5219;&#x91CD;&#x65B0;&#x7F13;&#x5B58;</span>
  <span class="hljs-keyword">let</span> newToken = response.headers[<span class="hljs-string">&apos;new-token&apos;</span>];

  <span class="hljs-keyword">if</span> (newToken) {
    Vue.ls.set(<span class="hljs-string">&quot;web-token&quot;</span>, newToken);
  }

  <span class="hljs-keyword">return</span> response;

}, error =&gt; {
  <span class="hljs-keyword">let</span> response = error.response;
  <span class="hljs-keyword">if</span> (response.status == <span class="hljs-number">401</span>) {
    <span class="hljs-comment">// &#x5904;&#x7406;401&#x9519;&#x8BEF;</span>

  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (response.status == <span class="hljs-number">403</span>) {
    <span class="hljs-comment">// &#x5904;&#x7406;403&#x9519;&#x8BEF;</span>

  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (response.status == <span class="hljs-number">412</span>) {
    <span class="hljs-comment">// &#x5904;&#x7406;412&#x9519;&#x8BEF;</span>

  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (response.status == <span class="hljs-number">413</span>) {
    <span class="hljs-comment">// &#x5904;&#x7406;413&#x6743;&#x9650;&#x4E0D;&#x8DB3;</span>

  }

  <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(response)

});

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  post(url, data) {

    <span class="hljs-keyword">return</span> Util.ajax({
      <span class="hljs-attr">method</span>: <span class="hljs-string">&apos;post&apos;</span>,
      <span class="hljs-attr">url</span>: url,
      <span class="hljs-attr">data</span>: qs.stringify(data),
      <span class="hljs-attr">timeout</span>: <span class="hljs-number">30000</span>,
      <span class="hljs-attr">headers</span>: {
        <span class="hljs-string">&apos;Content-Type&apos;</span>: <span class="hljs-string">&apos;application/x-www-form-urlencoded; charset=UTF-8&apos;</span>
      }
    })
  },

  get(url, params) {
    <span class="hljs-keyword">return</span> Util.ajax({
      <span class="hljs-attr">method</span>: <span class="hljs-string">&apos;get&apos;</span>,
      <span class="hljs-attr">url</span>: url,
      params,
    })
  },

  <span class="hljs-keyword">delete</span>(url, params) {
    <span class="hljs-keyword">return</span> Util.ajax({
      <span class="hljs-attr">method</span>: <span class="hljs-string">&apos;delete&apos;</span>,
      <span class="hljs-attr">url</span>: url,
      params
    })
  },

  put(url, data) {

    <span class="hljs-keyword">return</span> Util.ajax({
      <span class="hljs-attr">method</span>: <span class="hljs-string">&apos;put&apos;</span>,
      <span class="hljs-attr">url</span>: url,
      <span class="hljs-attr">data</span>: qs.stringify(data),
      <span class="hljs-attr">timeout</span>: <span class="hljs-number">30000</span>,
      <span class="hljs-attr">headers</span>: {
        <span class="hljs-string">&apos;Content-Type&apos;</span>: <span class="hljs-string">&apos;application/x-www-form-urlencoded; charset=UTF-8&apos;</span>
      }
    })
  }
}
</code></pre>
<h4>&#x5728;vuex&#x91CC;&#x9762;&#x505A;&#x8BF7;&#x6C42;&#xFF0C;&#x6BD4;&#x5982;&#x8BF7;&#x6C42;&#x533B;&#x751F;&#x5217;&#x8868;&#xFF0C;&#x7528;async/await&#xFF0C;&#x62FF;&#x5230;&#x6570;&#x636E;&#x5B58;&#x8FDB;store&#x6570;&#x636E;&#x91CC;&#x9762;</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x251C;&#x2500;&#x2500; index.js
&#x251C;&#x2500;&#x2500; modules
&#x2502;   &#x2514;&#x2500;&#x2500; doctor.js
&#x2514;&#x2500;&#x2500; mutation-types.js

import doctor from &apos;../../api/doctor&apos;
import * as types from &apos;../mutation-types&apos;

const state = {
  // &#x533B;&#x751F;&#x5217;&#x8868;
  doctorList: [],
  // &#x533B;&#x751F;&#x8BE6;&#x60C5;&#x4FE1;&#x606F;
  doctorDetail: null,
};

const mutations = {
  // &#x8BBE;&#x7F6E;&#x533B;&#x751F;&#x5217;&#x8868;
  [types.SET_DOCTOR_LIST](state, data) {
    state.doctorList = data
  },
  // &#x8BBE;&#x7F6E;&#x533B;&#x751F;&#x8BE6;&#x60C5;&#x4FE1;&#x606F;
  [types.SET_DOCTOR_DETAIL](state, data) {
    state.doctorDetail = data
  },
};

const actions = {

  /**
   * &#x83B7;&#x53D6;&#x533B;&#x751F;&#x987E;&#x95EE;&#x5217;&#x8868;
   * @param state
   * @param commit
   * @param params
   * @returns {Promise&lt;void&gt;}
   */
  async getDoctorList({state, commit}, params) {
    let ret = await doctor.list(params);
    commit(types.SET_DOCTOR_LIST, ret.data.data);
  },

  /**
   * &#x83B7;&#x53D6;&#x533B;&#x751F;&#x8BE6;&#x60C5;&#x4FE1;&#x606F;
   * @param state
   * @param commit
   * @param id &#x533B;&#x751F;ID
   * @returns {Promise&lt;void&gt;}
   */
  async getDoctorDetail({state, commit}, id) {
    let ret = await doctor.detail(id);
    commit(types.SET_DOCTOR_DETAIL, ret.data.data);
  }
};

export default {
  state,
  actions,
  mutations
}
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&#x251C;&#x2500;&#x2500; index.js
&#x251C;&#x2500;&#x2500; modules
&#x2502;   &#x2514;&#x2500;&#x2500; doctor.js
&#x2514;&#x2500;&#x2500; mutation-types.js

<span class="hljs-keyword">import</span> doctor <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../../api/doctor&apos;</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> types <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../mutation-types&apos;</span>

<span class="hljs-keyword">const</span> state = {
  <span class="hljs-comment">// &#x533B;&#x751F;&#x5217;&#x8868;</span>
  doctorList: [],
  <span class="hljs-comment">// &#x533B;&#x751F;&#x8BE6;&#x60C5;&#x4FE1;&#x606F;</span>
  doctorDetail: <span class="hljs-literal">null</span>,
};

<span class="hljs-keyword">const</span> mutations = {
  <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x533B;&#x751F;&#x5217;&#x8868;</span>
  [types.SET_DOCTOR_LIST](state, data) {
    state.doctorList = data
  },
  <span class="hljs-comment">// &#x8BBE;&#x7F6E;&#x533B;&#x751F;&#x8BE6;&#x60C5;&#x4FE1;&#x606F;</span>
  [types.SET_DOCTOR_DETAIL](state, data) {
    state.doctorDetail = data
  },
};

<span class="hljs-keyword">const</span> actions = {

  <span class="hljs-comment">/**
   * &#x83B7;&#x53D6;&#x533B;&#x751F;&#x987E;&#x95EE;&#x5217;&#x8868;
   * @param state
   * @param commit
   * @param params
   * @returns {Promise&lt;void&gt;}
   */</span>
  <span class="hljs-keyword">async</span> getDoctorList({state, commit}, params) {
    <span class="hljs-keyword">let</span> ret = <span class="hljs-keyword">await</span> doctor.list(params);
    commit(types.SET_DOCTOR_LIST, ret.data.data);
  },

  <span class="hljs-comment">/**
   * &#x83B7;&#x53D6;&#x533B;&#x751F;&#x8BE6;&#x60C5;&#x4FE1;&#x606F;
   * @param state
   * @param commit
   * @param id &#x533B;&#x751F;ID
   * @returns {Promise&lt;void&gt;}
   */</span>
  <span class="hljs-keyword">async</span> getDoctorDetail({state, commit}, id) {
    <span class="hljs-keyword">let</span> ret = <span class="hljs-keyword">await</span> doctor.detail(id);
    commit(types.SET_DOCTOR_DETAIL, ret.data.data);
  }
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  state,
  actions,
  mutations
}
</code></pre>
<h4>&#x5728;&#x9875;&#x9762;&#x91CC;&#x9700;&#x8981;&#x6267;&#x884C;&#x5F15;&#x5165;&#xFF1A;</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {mapActions, mapState} from &apos;vuex&apos;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> {mapActions, mapState} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vuex&apos;</span></code></pre>
<h4>&#x4EE3;&#x7801;&#x53EF;&#x4EE5;&#x5177;&#x4F53;&#x770B;&#x6587;&#x4EF6;&#x7684;&#x4EE3;&#x7801;</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&#x2514;&#x2500;&#x2500; doctor
    &#x251C;&#x2500;&#x2500; detail.vue
    &#x2514;&#x2500;&#x2500; list.vue

&lt;script&gt;
  import {mapActions, mapState} from &apos;vuex&apos;

  export default {
    components: {},
    data() {
      return {}
    },
    computed: {
      ...mapState({
        doctorList: state =&gt; state.doctor.doctorList,
      })
    },
    async created() {
      // &#x533B;&#x751F;&#x7C7B;&#x578B;
      let params = {type: &apos;EXP&apos;};
      // &#x83B7;&#x53D6;&#x533B;&#x751F;&#x5217;&#x8868;
      await this.getDoctorList(params);
    },
    methods: {
      ...mapActions([
        // &#x83B7;&#x53D6;&#x533B;&#x751F;&#x5217;&#x8868;
        &apos;getDoctorList&apos;
      ]),

      // &#x8DEF;&#x7531;&#x8DF3;&#x8F6C;&#x65B9;&#x6CD5;
      routeLink(link) {
        this.$router.push({path: link});
      },
    }
  }
&lt;/script&gt;" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&#x2514;&#x2500;&#x2500; doctor
    &#x251C;&#x2500;&#x2500; detail.vue
    &#x2514;&#x2500;&#x2500; list.vue

&lt;script&gt;
  <span class="hljs-keyword">import</span> {mapActions, mapState} <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vuex&apos;</span>

  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">components</span>: {},
    data() {
      <span class="hljs-keyword">return</span> {}
    },
    <span class="hljs-attr">computed</span>: {
      ...mapState({
        <span class="hljs-attr">doctorList</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> state.doctor.doctorList,
      })
    },
    <span class="hljs-keyword">async</span> created() {
      <span class="hljs-comment">// &#x533B;&#x751F;&#x7C7B;&#x578B;</span>
      <span class="hljs-keyword">let</span> params = {<span class="hljs-attr">type</span>: <span class="hljs-string">&apos;EXP&apos;</span>};
      <span class="hljs-comment">// &#x83B7;&#x53D6;&#x533B;&#x751F;&#x5217;&#x8868;</span>
      <span class="hljs-keyword">await</span> <span class="hljs-keyword">this</span>.getDoctorList(params);
    },
    <span class="hljs-attr">methods</span>: {
      ...mapActions([
        <span class="hljs-comment">// &#x83B7;&#x53D6;&#x533B;&#x751F;&#x5217;&#x8868;</span>
        <span class="hljs-string">&apos;getDoctorList&apos;</span>
      ]),

      <span class="hljs-comment">// &#x8DEF;&#x7531;&#x8DF3;&#x8F6C;&#x65B9;&#x6CD5;</span>
      routeLink(link) {
        <span class="hljs-keyword">this</span>.$router.push({<span class="hljs-attr">path</span>: link});
      },
    }
  }
&lt;<span class="hljs-regexp">/script&gt;</span></code></pre>
<h4>&#x6838;&#x5FC3;&#x5C31;&#x662F;&#x628A;&#x6570;&#x636E;&#x548C;&#x9875;&#x9762;&#x5206;&#x79BB;&#xFF0C;&#x7EC6;&#x5206;&#x628A;&#x63A5;&#x53E3;&#xFF0C;&#x8BF7;&#x6C42;&#x6570;&#x636E;&#x7528;vuex&#x505A;&#x5904;&#x7406;&#xFF0C;&#x5728;&#x9875;&#x9762;&#x83B7;&#x53D6;&#x6570;&#x636E;&#x90FD;&#x505A;&#x7EDF;&#x4E00;&#x7BA1;&#x7406;&#x9879;&#x76EE;&#x3002;&#x53EF;&#x4EE5;&#x5177;&#x4F53;&#x770B;&#x9879;&#x76EE;&#x91CC;&#x9762;&#x7684;&#x4EE3;&#x7801;&#x3002;</h4>
<h2 id="articleHeader4">github &#x5730;&#x5740;&#xFF1A; <a href="https://github.com/liangfengbo/vue-cli-project" rel="nofollow noreferrer" target="_blank">https://github.com/liangfengbo/vue-cli-project &#x70B9;&#x51FB;&#x8FDB;&#x5165;</a>
</h2>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
已配置好的vue全家桶项目router,vuex,api,axios,vue-ls,async/await,less下载即使用

## 原文链接
[https://segmentfault.com/a/1190000015027279](https://segmentfault.com/a/1190000015027279)

