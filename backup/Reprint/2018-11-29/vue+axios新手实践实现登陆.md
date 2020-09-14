---
title: 'vue+axios新手实践实现登陆' 
date: 2018-11-29 9:27:38
hidden: true
slug: jnkbn9mpr3s
categories: [reprint]
---

{{< raw >}}

                    
<p>&#x5176;&#x5B9E;&#x50CF;&#x8FD9;&#x7C7B;&#x7684;&#x6587;&#x7AE0;&#x7F51;&#x4E0A;&#x5DF2;&#x7ECF;&#x6709;&#x5F88;&#x591A;&#x5F88;&#x597D;&#x7684;,&#x5199;&#x8FD9;&#x7BC7;&#x6587;&#x7AE0;&#xFF0C;&#x76F8;&#x5F53;&#x4E8E;&#x662F;&#x505A;&#x4E2A;&#x7B14;&#x8BB0;&#xFF0C;&#x4EE5;&#x9632;&#x4EE5;&#x540E;&#x5FD8;&#x8BB0;<br>&#x7528;&#x5230;&#x7684;&#xFF1A;1&#x3001; vuex 2&#x3001;axios 3&#x3001;vue-route</p>
<p>&#x767B;&#x9646;&#x6D41;&#x7A0B;&#x4E3A;&#xFF1A;1&#x3001;&#x63D0;&#x4EA4;&#x767B;&#x9646;&#x8868;&#x5355;&#xFF0C;&#x62FF;&#x5230;&#x540E;&#x53F0;&#x8FD4;&#x56DE;&#x7684;&#x6570;&#x636E;<br>2&#x3001;&#x5C06;&#x6570;&#x636E;&#x5B58;&#x5165;vuex</p>
<h2 id="articleHeader0">vuex&#x914D;&#x7F6E;</h2>
<p>&#x8FD9;&#x91CC;&#x76F4;&#x63A5;&#x8DF3;&#x8FC7;&#x5B89;&#x88C5;&#x4E4B;&#x7C7B;&#x7684;&#xFF0C;&#x767E;&#x5EA6;&#x4E00;&#x5927;&#x5806;&#xFF0C;&#x6211;&#x76F4;&#x63A5;&#x4E0A;&#x4EE3;&#x7801;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// store index.js
import Vue from &apos;vue&apos;
import Vuex from &apos;vuex&apos;

Vue.use(Vuex)
// &#x521D;&#x59CB;&#x5316;&#x65F6;&#x7528;sessionStore.getItem(&apos;token&apos;),&#x8FD9;&#x6837;&#x5B50;&#x5237;&#x65B0;&#x9875;&#x9762;&#x5C31;&#x65E0;&#x9700;&#x91CD;&#x65B0;&#x767B;&#x5F55;
const state = {
  user: window.sessionStorage.getItem(&apos;user&apos;),
  token: window.sessionStorage.getItem(&apos;token&apos;)
}
const mutations = {
  //&#x5C06;token&#x4FDD;&#x5B58;&#x5230;sessionStorage&#x91CC;&#xFF0C;token&#x8868;&#x793A;&#x767B;&#x9646;&#x72B6;&#x6001;
  SET_TOKEN: (state, data) =&gt; {
    state.token = data
    window.sessionStorage.setItem(&apos;token&apos;, data) 
  },
  //&#x83B7;&#x53D6;&#x7528;&#x6237;&#x540D;
  GET_USER: (state, data) =&gt; {
    // &#x628A;&#x7528;&#x6237;&#x540D;&#x5B58;&#x8D77;&#x6765;
    state.user = data
    window.sessionStorage.setItem(&apos;user&apos;, data)
  },
  //&#x767B;&#x51FA;
  LOGOUT: (state) =&gt; {
    // &#x767B;&#x51FA;&#x7684;&#x65F6;&#x5019;&#x8981;&#x6E05;&#x9664;token
    state.token = null
    state.user = null
    window.sessionStorage.removeItem(&apos;token&apos;)
    window.sessionStorage.removeItem(&apos;user&apos;)
  }
}

const actions = {
}
export default new Vuex.Store({
  state,
  mutations,
  actions
})
" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs pf"><code>// store index.js
import Vue <span class="hljs-keyword">from</span> &apos;vue&apos;
import Vuex <span class="hljs-keyword">from</span> &apos;vuex&apos;

Vue.use(Vuex)
// &#x521D;&#x59CB;&#x5316;&#x65F6;&#x7528;sessionStore.getItem(&apos;token&apos;),&#x8FD9;&#x6837;&#x5B50;&#x5237;&#x65B0;&#x9875;&#x9762;&#x5C31;&#x65E0;&#x9700;&#x91CD;&#x65B0;&#x767B;&#x5F55;
const <span class="hljs-keyword">state</span> = {
  <span class="hljs-keyword">user</span>: window.sessionStorage.getItem(&apos;<span class="hljs-keyword">user</span>&apos;),
  token: window.sessionStorage.getItem(&apos;token&apos;)
}
const mutations = {
  //&#x5C06;token&#x4FDD;&#x5B58;&#x5230;sessionStorage&#x91CC;&#xFF0C;token&#x8868;&#x793A;&#x767B;&#x9646;&#x72B6;&#x6001;
  SET_TOKEN: (<span class="hljs-keyword">state</span>, data) =&gt; {
    <span class="hljs-keyword">state</span>.token = data
    window.sessionStorage.<span class="hljs-built_in">set</span>Item(&apos;token&apos;, data) 
  },
  //&#x83B7;&#x53D6;&#x7528;&#x6237;&#x540D;
  GET_USER: (<span class="hljs-keyword">state</span>, data) =&gt; {
    // &#x628A;&#x7528;&#x6237;&#x540D;&#x5B58;&#x8D77;&#x6765;
    <span class="hljs-keyword">state</span>.<span class="hljs-keyword">user</span> = data
    window.sessionStorage.<span class="hljs-built_in">set</span>Item(&apos;<span class="hljs-keyword">user</span>&apos;, data)
  },
  //&#x767B;&#x51FA;
  LOGOUT: (<span class="hljs-keyword">state</span>) =&gt; {
    // &#x767B;&#x51FA;&#x7684;&#x65F6;&#x5019;&#x8981;&#x6E05;&#x9664;token
    <span class="hljs-keyword">state</span>.token = null
    <span class="hljs-keyword">state</span>.<span class="hljs-keyword">user</span> = null
    window.sessionStorage.removeItem(&apos;token&apos;)
    window.sessionStorage.removeItem(&apos;<span class="hljs-keyword">user</span>&apos;)
  }
}

const actions = {
}
export <span class="hljs-keyword">default</span> new Vuex.Store({
  <span class="hljs-keyword">state</span>,
  mutations,
  actions
})
</code></pre>
<p>1&#x3001;&#x6211;&#x5728;&#x8FD9;&#x91CC;&#x662F;&#x5C06;&#x767B;&#x5F55;&#x72B6;&#x6001;token,&#x548C;&#x7528;&#x6237;&#x540D;user&#x5B58;&#x5728;sessionStorage&#x91CC;&#xFF0C;&#x4EE5;&#x4FBF;&#x7EC4;&#x4EF6;&#x4F7F;&#x7528;,&#x5982;&#x679C;token&#x4E3A;true&#x5219;&#x8868;&#x793A;&#x7528;&#x6237;&#x5DF2;&#x7ECF;&#x767B;&#x9646;sessionStorage&#x548C;token&#x8FD9;&#x4E24;&#x4E2A;&#x4E1C;&#x897F;&#x5F88;&#x7B80;&#x5355;&#x7528;&#x6CD5;&#x81EA;&#x884C;&#x767E;&#x5EA6;<br>2&#x3001;&#x4E0D;&#x8981;&#x5FD8;&#x4E86;&#x5728;main.js&#x5F15;&#x5165;store&#xFF0C;vue&#x5B9E;&#x4F8B;&#x4E2D;&#x4E5F;&#x8981;&#x52A0;&#x5165;store<br>main.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
import store from &apos;./store/index&apos;

new Vue({
  el: &apos;#app&apos;,
  router,
  store,
  components: { App },
  template: &apos;&lt;App/&gt;&apos;
})" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs arduino"><code>
<span class="hljs-keyword">import</span> store from <span class="hljs-string">&apos;./store/index&apos;</span>

<span class="hljs-keyword">new</span> Vue({
  el: <span class="hljs-string">&apos;#app&apos;</span>,
  router,
  store,
  components: { App },
  <span class="hljs-keyword">template</span>: <span class="hljs-string">&apos;&lt;App/&gt;&apos;</span>
})</code></pre>
<h2 id="articleHeader1">vue-route&#x914D;&#x7F6E;</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from &apos;vue&apos;
import Router from &apos;vue-router&apos;
import Login from &apos;../components/Login&apos;
import Activity from &apos;../components/Activity&apos;
import Index from &apos;../components/Index&apos;
import store from &apos;../store/index&apos;

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: &apos;/&apos;,
      name: &apos;/&apos;,
      component: Index
    },
    {
      path: &apos;/login&apos;,
      name: &apos;login&apos;,
      component: Login
    },
    {
      path: &apos;/activity&apos;,
      name: &apos;activity&apos;,
      component: Activity,
      meta: {
        requireAuth: true // &#x6DFB;&#x52A0;&#x8BE5;&#x5B57;&#x6BB5;&#xFF0C;&#x8868;&#x793A;&#x8FDB;&#x5165;&#x8FD9;&#x4E2A;&#x8DEF;&#x7531;&#x662F;&#x9700;&#x8981;&#x767B;&#x5F55;&#x7684;
      }
    }
  ]
})

// &#x6CE8;&#x518C;&#x5168;&#x5C40;&#x94A9;&#x5B50;&#x7528;&#x6765;&#x62E6;&#x622A;&#x5BFC;&#x822A;
router.beforeEach((to, from, next) =&gt; {
  const token = store.state.token
  if (to.meta.requireAuth) { // &#x5224;&#x65AD;&#x8BE5;&#x8DEF;&#x7531;&#x662F;&#x5426;&#x9700;&#x8981;&#x767B;&#x5F55;&#x6743;&#x9650;
    if (token) { // &#x901A;&#x8FC7;vuex state&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x7684;token&#x662F;&#x5426;&#x5B58;&#x5728;
      next()
    } else {
      console.log(&apos;&#x8BE5;&#x9875;&#x9762;&#x9700;&#x8981;&#x767B;&#x9646;&apos;)
      next({
        path: &apos;/login&apos;
        // query: {redirect: to.fullPath} // &#x5C06;&#x8DF3;&#x8F6C;&#x7684;&#x8DEF;&#x7531;path&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#xFF0C;&#x767B;&#x5F55;&#x6210;&#x529F;&#x540E;&#x8DF3;&#x8F6C;&#x5230;&#x8BE5;&#x8DEF;&#x7531;
      })
    }
  } else {
    next()
  }
})

export default router" title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue&apos;</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;vue-router&apos;</span>
<span class="hljs-keyword">import</span> Login <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../components/Login&apos;</span>
<span class="hljs-keyword">import</span> Activity <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../components/Activity&apos;</span>
<span class="hljs-keyword">import</span> Index <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../components/Index&apos;</span>
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">&apos;../store/index&apos;</span>

Vue.use(Router)

<span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> Router({
  <span class="hljs-attr">routes</span>: [
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">&apos;/&apos;</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;/&apos;</span>,
      <span class="hljs-attr">component</span>: Index
    },
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">&apos;/login&apos;</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;login&apos;</span>,
      <span class="hljs-attr">component</span>: Login
    },
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">&apos;/activity&apos;</span>,
      <span class="hljs-attr">name</span>: <span class="hljs-string">&apos;activity&apos;</span>,
      <span class="hljs-attr">component</span>: Activity,
      <span class="hljs-attr">meta</span>: {
        <span class="hljs-attr">requireAuth</span>: <span class="hljs-literal">true</span> <span class="hljs-comment">// &#x6DFB;&#x52A0;&#x8BE5;&#x5B57;&#x6BB5;&#xFF0C;&#x8868;&#x793A;&#x8FDB;&#x5165;&#x8FD9;&#x4E2A;&#x8DEF;&#x7531;&#x662F;&#x9700;&#x8981;&#x767B;&#x5F55;&#x7684;</span>
      }
    }
  ]
})

<span class="hljs-comment">// &#x6CE8;&#x518C;&#x5168;&#x5C40;&#x94A9;&#x5B50;&#x7528;&#x6765;&#x62E6;&#x622A;&#x5BFC;&#x822A;</span>
router.beforeEach(<span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> token = store.state.token
  <span class="hljs-keyword">if</span> (to.meta.requireAuth) { <span class="hljs-comment">// &#x5224;&#x65AD;&#x8BE5;&#x8DEF;&#x7531;&#x662F;&#x5426;&#x9700;&#x8981;&#x767B;&#x5F55;&#x6743;&#x9650;</span>
    <span class="hljs-keyword">if</span> (token) { <span class="hljs-comment">// &#x901A;&#x8FC7;vuex state&#x83B7;&#x53D6;&#x5F53;&#x524D;&#x7684;token&#x662F;&#x5426;&#x5B58;&#x5728;</span>
      next()
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">&apos;&#x8BE5;&#x9875;&#x9762;&#x9700;&#x8981;&#x767B;&#x9646;&apos;</span>)
      next({
        <span class="hljs-attr">path</span>: <span class="hljs-string">&apos;/login&apos;</span>
        <span class="hljs-comment">// query: {redirect: to.fullPath} // &#x5C06;&#x8DF3;&#x8F6C;&#x7684;&#x8DEF;&#x7531;path&#x4F5C;&#x4E3A;&#x53C2;&#x6570;&#xFF0C;&#x767B;&#x5F55;&#x6210;&#x529F;&#x540E;&#x8DF3;&#x8F6C;&#x5230;&#x8BE5;&#x8DEF;&#x7531;</span>
      })
    }
  } <span class="hljs-keyword">else</span> {
    next()
  }
})

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> router</code></pre>
<p>&#x8FD9;&#x91CC;&#x6211;&#x7528;&#x5230;router.beforeEach&#x6765;&#x5B9E;&#x73B0;&#x62E6;&#x622A;&#x767B;&#x9646;&#xFF0C;<br>1&#x3001;&#x5728;&#x9700;&#x8981;&#x9A8C;&#x8BC1;&#x7684;&#x8DEF;&#x7531;&#x7684;meta&#x91CC;&#x52A0;&#x5165;&#x6211;&#x4EEC;&#x81EA;&#x5DF1;&#x7684;requireAuth<br>2&#x3001;router.beforeEach&#x91CC;&#x901A;&#x8FC7;requireAuth&#x9A8C;&#x8BC1;&#x8BE5;&#x7EC4;&#x4EF6;&#x662F;&#x5426;&#x9700;&#x8981;&#x767B;&#x9646;<br>3&#x3001;&#x9A8C;&#x8BC1;token&#x5982;&#x679C;&#x4E3A;flase&#x5C31;&#x8868;&#x793A;&#x672A;&#x767B;&#x9646;&#x8DF3;&#x8F6C;&#x5230;&#x767B;&#x5F55;&#x9875;</p>
<h2 id="articleHeader2">axios&#x53D1;&#x9001;&#x8BF7;&#x6C42;</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="submitLogin () {
  this.$refs.loginForm.validate(valid =&gt; {
    if (valid) {
      axios.post(&apos;/login&apos;, {
        user: this.loginForm.user,
        pass: this.loginForm.pass
      })
        .then((response) =&gt; {
          if (response.status === 200) {
            this.$store.commit(&apos;SET_TOKEN&apos;, response.data.token)
            this.$store.commit(&apos;GET_USER&apos;, response.data.user)
            this.$message({
              message: &apos;&#x767B;&#x9646;&#x6210;&#x529F;&apos;,
              type: &apos;success&apos;
            })
            this.$router.push({name: &apos;activity&apos;})
          }
        })
        .catch(function (error) {
          console.log(error)
        })
    } else {
      console.log(&apos;error submit!!&apos;)
      return false
    }
  })
}," title="" data-original-title="&#x590D;&#x5236;"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span>
      </div>
      </div><pre class="hljs kotlin"><code>submitLogin () {
  <span class="hljs-keyword">this</span>.$refs.loginForm.validate(valid =&gt; {
    <span class="hljs-keyword">if</span> (valid) {
      axios.post(<span class="hljs-string">&apos;/login&apos;</span>, {
        user: <span class="hljs-keyword">this</span>.loginForm.user,
        pass: <span class="hljs-keyword">this</span>.loginForm.pass
      })
        .then((response) =&gt; {
          <span class="hljs-keyword">if</span> (response.status === <span class="hljs-number">200</span>) {
            <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">&apos;SET_TOKEN&apos;</span>, response.<span class="hljs-keyword">data</span>.token)
            <span class="hljs-keyword">this</span>.$store.commit(<span class="hljs-string">&apos;GET_USER&apos;</span>, response.<span class="hljs-keyword">data</span>.user)
            <span class="hljs-keyword">this</span>.$message({
              message: <span class="hljs-string">&apos;&#x767B;&#x9646;&#x6210;&#x529F;&apos;</span>,
              type: <span class="hljs-string">&apos;success&apos;</span>
            })
            <span class="hljs-keyword">this</span>.$router.push({name: <span class="hljs-string">&apos;activity&apos;</span>})
          }
        })
        .<span class="hljs-keyword">catch</span>(function (error) {
          console.log(error)
        })
    } <span class="hljs-keyword">else</span> {
      console.log(<span class="hljs-string">&apos;error submit!!&apos;</span>)
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
    }
  })
},</code></pre>
<p>&#x540E;&#x53F0;&#x6211;&#x6CA1;&#x5199;&#xFF0C;&#x662F;&#x7528;mock.js&#x62E6;&#x622A;ajax&#x8BF7;&#x6C42;<br>&#x56E0;&#x4E3A;&#x6211;&#x7528;&#x7684;&#x662F;element-ui&#x6240;&#x4EE5;&#x4E0A;&#x9762;&#x4EE3;&#x7801;&#x6709;&#x4E00;&#x4E9B;&#x76F4;&#x63A5;&#x65E0;&#x89C6;&#xFF0C;&#x770B;&#x6838;&#x5FC3;&#x7684;&#x5C31;&#x884C;<br>1&#x3001;&#x5728;&#x6570;&#x636E;&#x8FD4;&#x56DE;&#x6210;&#x529F;&#x540E;&#x7528;this.$store.commit&#x6765;&#x66F4;&#x65B0;vuex&#x91CC;&#x7684;&#x6570;&#x636E;<br>2&#x3001;&#x767B;&#x9646;&#x6210;&#x529F;&#x540E;&#x8DF3;&#x8F6C;this.$router.push()&#x8DF3;&#x8F6C;&#x9875;&#x9762;&#xFF0C;<br>&#x8FD9;&#x91CC;&#x6CE8;&#x610F;&#xFF0C;&#x5982;&#x679C;&#x4F60;&#x5728;&#x524D;&#x9762;&#x5BFC;&#x822A;&#x62E6;&#x622A;&#x7684;&#x94A9;&#x5B50;&#x7528;&#x4E86;query: {redirect: to.fullPath}&#x7684;&#x8BDD;&#xFF0C;<br>&#x8FD9;&#x91CC;&#x5C31; &#x7528; this.$router.push(this.$route.query.redirect);&#x8FD9;&#x6837;&#x9875;&#x9762;&#x5C31;&#x80FD;&#x8DF3;&#x5230;<br>&#x4F60;&#x8DF3;&#x5230;&#x767B;&#x9646;&#x9875;&#x9762;&#x524D;&#x8981;&#x53BB;&#x7684;&#x90A3;&#x4E2A;&#x8DEF;&#x7531;&#x4E86;</p>
<p>&#x90A3;&#x4E2A;TOKEN&#x6211;&#x8FD9;&#x91CC;&#x4E5F;&#x6CA1;&#x6709;&#x4F7F;&#x7528;&#xFF0C;&#x5C31;&#x662F;&#x5728;&#x9875;&#x9762;&#x8BF7;&#x6C42;&#x7684;&#x65F6;&#x5019;&#x5E26;&#x4E0A;&#x8FD9;&#x4E2A;TOKEN&#xFF0C;&#x4E0E;&#x540E;&#x7AEF;&#x6838;&#x5BF9;&#x3002;</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue+axios新手实践实现登陆

## 原文链接
[https://segmentfault.com/a/1190000015201803](https://segmentfault.com/a/1190000015201803)

