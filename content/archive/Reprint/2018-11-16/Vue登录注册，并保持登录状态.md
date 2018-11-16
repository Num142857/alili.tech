---
title: 'Vue登录注册，并保持登录状态' 
date: 2018-11-16 2:30:06
hidden: true
slug: hbim9byaq6
categories: [reprint]
---

{{< raw >}}
<p>&#x5173;&#x4E8E;vue&#x767B;&#x5F55;&#x6CE8;&#x518C;&#xFF0C;&#x5E76;&#x4FDD;&#x6301;&#x767B;&#x5F55;&#x72B6;&#x6001;&#xFF0C;&#x662F;vue&#x73A9;&#x5BB6;&#x5FC5;&#x7ECF;&#x4E4B;&#x8DEF;&#xFF0C;&#x7F51;&#x4E0A;&#x4E5F;&#x6709;&#x5F88;&#x591A;&#x7684;&#x89E3;&#x51B3;&#x65B9;&#x6CD5;&#xFF0C;&#x4F46;&#x662F;&#x6709;&#x4E00;&#x4E9B;&#x592A;&#x8FC7;&#x4E8E;&#x590D;&#x6742;&#xFF0C;&#x65B0;&#x624B;&#x53EF;&#x80FD;&#x4F1A;&#x770B;&#x7684;&#x4E00;&#x8138;&#x61F5;&#x903C;&#xFF0C;&#x73B0;&#x5728;&#x7ED9;&#x5927;&#x5BB6;&#x4ECB;&#x7ECD;&#x4E00;&#x79CD;&#x6211;&#x81EA;&#x5DF1;&#x5199;&#x9879;&#x76EE;&#x5728;&#x7528;&#x800C;&#x4E14;&#x5E76;&#x4E0D;&#x96BE;&#x7406;&#x89E3;&#x7684;&#x4E00;&#x79CD;&#x65B9;&#x6CD5;&#x3002;</p><p>&#x9879;&#x76EE;&#x4E2D;&#x6709;&#x4E00;&#x4E9B;&#x8DEF;&#x7531;&#x662F;<strong>&#x9700;&#x8981;&#x767B;&#x5F55;</strong>&#x624D;&#x53EF;&#x4EE5;&#x8FDB;&#x5165;&#x7684;&#xFF0C;&#x6BD4;&#x5982;&#x9996;&#x9875;&#xFF0C;&#x4E2A;&#x4EBA;&#x4E2D;&#x5FC3;&#x7B49;&#x7B49;<br>&#x6709;&#x4E00;&#x4E9B;&#x8DEF;&#x7531;&#x662F;<strong>&#x4E0D;&#x9700;&#x8981;&#x767B;&#x5F55;</strong>&#x5C31;&#x53EF;&#x4EE5;&#x8FDB;&#x5165;&#xFF0C;&#x6BD4;&#x5982;&#x767B;&#x5F55;&#x9875;&#xFF0C;&#x6CE8;&#x518C;&#x9875;&#xFF0C;&#x5FD8;&#x8BB0;&#x5BC6;&#x7801;&#x7B49;&#x7B49;<br>&#x90A3;&#x5982;&#x4F55;&#x5224;&#x65AD;&#x8DEF;&#x7531;&#x662F;&#x5426;&#x9700;&#x8981;&#x767B;&#x5F55;&#x5462;&#xFF1F;&#x5C31;&#x8981;&#x5728;&#x8DEF;&#x7531;JS&#x91CC;&#x9762;&#x505A;&#x6587;&#x7AE0;</p><h4><strong>&#x5728;router.js&#x4E2D;&#x6DFB;&#x52A0;meta&#x533A;&#x5206;</strong></h4><p>&#x6BD4;&#x5982;&#x767B;&#x5F55;&#x6CE8;&#x518C;&#x9875;&#x9762;&#xFF0C;&#x4E0D;&#x9700;&#x8981;&#x767B;&#x5F55;&#x5373;&#x53EF;&#x8FDB;&#x5165;&#xFF0C;&#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x628A;meta&#x4E2D;&#x7684;isLogin&#x6807;&#x5FD7;&#x8BBE;&#x7F6E;&#x4E3A;<strong>false</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  //&#x767B;&#x5F55;
  path: &apos;/login&apos;,
  component: login,
  meta: {
    isLogin: false
  }
},
{
  //&#x6CE8;&#x518C;
  path: &apos;/register&apos;,
  component: register,
  meta: {
    isLogin: false
  }
}," title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code>{
  <span class="hljs-comment">//&#x767B;&#x5F55;</span>
  <span class="hljs-attribute">path</span>: <span class="hljs-string">&apos;/login&apos;</span>,
  <span class="hljs-attribute">component</span>: login,
  <span class="hljs-attribute">meta</span>: {
    <span class="hljs-attribute">isLogin</span>: false
  }
},
{
  <span class="hljs-comment">//&#x6CE8;&#x518C;</span>
  <span class="hljs-attribute">path</span>: <span class="hljs-string">&apos;/register&apos;</span>,
  <span class="hljs-attribute">component</span>: register,
  <span class="hljs-attribute">meta</span>: {
    <span class="hljs-attribute">isLogin</span>: false
  }
},</code></pre><p>&#x800C;&#x5728;&#x9996;&#x9875;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x767B;&#x5F55;&#x624D;&#x80FD;&#x8FDB;&#x5165;&#xFF0C;&#x90A3;&#x4E48;&#x6211;&#x4EEC;&#x628A;meta&#x4E2D;&#x7684;isLogin&#x6807;&#x5FD7;&#x8BBE;&#x7F6E;&#x4E3A;<strong>true</strong></p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  //&#x9996;&#x9875;
  path: &apos;/home&apos;,
  component: home,
  meta: {
    isLogin: true
  },
}" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs less"><code>{
  <span class="hljs-comment">//&#x9996;&#x9875;</span>
  <span class="hljs-attribute">path</span>: <span class="hljs-string">&apos;/home&apos;</span>,
  <span class="hljs-attribute">component</span>: home,
  <span class="hljs-attribute">meta</span>: {
    <span class="hljs-attribute">isLogin</span>: true
  },
}</code></pre><p>&#x8FD9;&#x6837;&#x6211;&#x4EEC;&#x5C31;&#x4E3A;&#x8FDB;&#x5165;&#x5404;&#x4E2A;&#x8DEF;&#x7531;&#x662F;&#x5426;&#x9700;&#x8981;&#x767B;&#x5F55;&#x505A;&#x4E86;&#x533A;&#x5206;&#x3002;</p><h4><strong>&#x63A5;&#x4E0B;&#x6765;&#x6211;&#x4EEC;&#x5728;login.vue&#x4E2D;&#x4FEE;&#x6539;&#x767B;&#x5F55;&#x540E;&#x72B6;&#x6001;</strong></h4><p>&#x6211;&#x4EEC;&#x4F7F;&#x7528;axios&#x5411;&#x540E;&#x53F0;&#x53D1;&#x8D77;&#x767B;&#x5F55;&#x8BF7;&#x6C42;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$axios.post(&quot;/xxx/login&quot;, {user:name,password:pwd})
    .then(data =&gt; {
        //&#x767B;&#x5F55;&#x5931;&#x8D25;,&#x5148;&#x4E0D;&#x8BA8;&#x8BBA;
        if (data.data.status != 200) {
          //iViewUi&#x7684;&#x53CB;&#x597D;&#x63D0;&#x793A;
          this.$Message.error(data.data.message);
        //&#x767B;&#x5F55;&#x6210;&#x529F;
        } else {
          //&#x8BBE;&#x7F6E;Vuex&#x767B;&#x5F55;&#x6807;&#x5FD7;&#x4E3A;true&#xFF0C;&#x9ED8;&#x8BA4;userLogin&#x4E3A;false
          this.$store.dispatch(&quot;userLogin&quot;, true);
          //Vuex&#x5728;&#x7528;&#x6237;&#x5237;&#x65B0;&#x7684;&#x65F6;&#x5019;userLogin&#x4F1A;&#x56DE;&#x5230;&#x9ED8;&#x8BA4;&#x503C;false&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x7528;&#x5230;HTML5&#x50A8;&#x5B58;
          //&#x6211;&#x4EEC;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;&#x540D;&#x4E3A;Flag&#xFF0C;&#x503C;&#x4E3A;isLogin&#x7684;&#x5B57;&#x6BB5;&#xFF0C;&#x4F5C;&#x7528;&#x662F;&#x5982;&#x679C;Flag&#x6709;&#x503C;&#x4E14;&#x4E3A;isLogin&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x8BC1;&#x660E;&#x7528;&#x6237;&#x5DF2;&#x7ECF;&#x767B;&#x5F55;&#x4E86;&#x3002;
          localStorage.setItem(&quot;Flag&quot;, &quot;isLogin&quot;);
          //iViewUi&#x7684;&#x53CB;&#x597D;&#x63D0;&#x793A;
          this.$Message.success(data.data.message);
          //&#x767B;&#x5F55;&#x6210;&#x529F;&#x540E;&#x8DF3;&#x8F6C;&#x5230;&#x6307;&#x5B9A;&#x9875;&#x9762;
          this.$router.push(&quot;/home&quot;);
        }
 });" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs kotlin"><code><span class="hljs-keyword">this</span>.$axios.post(<span class="hljs-string">&quot;/xxx/login&quot;</span>, {user:name,password:pwd})
    .then(<span class="hljs-keyword">data</span> =&gt; {
        <span class="hljs-comment">//&#x767B;&#x5F55;&#x5931;&#x8D25;,&#x5148;&#x4E0D;&#x8BA8;&#x8BBA;</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">data</span>.<span class="hljs-keyword">data</span>.status != <span class="hljs-number">200</span>) {
          <span class="hljs-comment">//iViewUi&#x7684;&#x53CB;&#x597D;&#x63D0;&#x793A;</span>
          <span class="hljs-keyword">this</span>.$Message.error(<span class="hljs-keyword">data</span>.<span class="hljs-keyword">data</span>.message);
        <span class="hljs-comment">//&#x767B;&#x5F55;&#x6210;&#x529F;</span>
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-comment">//&#x8BBE;&#x7F6E;Vuex&#x767B;&#x5F55;&#x6807;&#x5FD7;&#x4E3A;true&#xFF0C;&#x9ED8;&#x8BA4;userLogin&#x4E3A;false</span>
          <span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">&quot;userLogin&quot;</span>, <span class="hljs-literal">true</span>);
          <span class="hljs-comment">//Vuex&#x5728;&#x7528;&#x6237;&#x5237;&#x65B0;&#x7684;&#x65F6;&#x5019;userLogin&#x4F1A;&#x56DE;&#x5230;&#x9ED8;&#x8BA4;&#x503C;false&#xFF0C;&#x6240;&#x4EE5;&#x6211;&#x4EEC;&#x9700;&#x8981;&#x7528;&#x5230;HTML5&#x50A8;&#x5B58;</span>
          <span class="hljs-comment">//&#x6211;&#x4EEC;&#x8BBE;&#x7F6E;&#x4E00;&#x4E2A;&#x540D;&#x4E3A;Flag&#xFF0C;&#x503C;&#x4E3A;isLogin&#x7684;&#x5B57;&#x6BB5;&#xFF0C;&#x4F5C;&#x7528;&#x662F;&#x5982;&#x679C;Flag&#x6709;&#x503C;&#x4E14;&#x4E3A;isLogin&#x7684;&#x65F6;&#x5019;&#xFF0C;&#x8BC1;&#x660E;&#x7528;&#x6237;&#x5DF2;&#x7ECF;&#x767B;&#x5F55;&#x4E86;&#x3002;</span>
          localStorage.setItem(<span class="hljs-string">&quot;Flag&quot;</span>, <span class="hljs-string">&quot;isLogin&quot;</span>);
          <span class="hljs-comment">//iViewUi&#x7684;&#x53CB;&#x597D;&#x63D0;&#x793A;</span>
          <span class="hljs-keyword">this</span>.$Message.success(<span class="hljs-keyword">data</span>.<span class="hljs-keyword">data</span>.message);
          <span class="hljs-comment">//&#x767B;&#x5F55;&#x6210;&#x529F;&#x540E;&#x8DF3;&#x8F6C;&#x5230;&#x6307;&#x5B9A;&#x9875;&#x9762;</span>
          <span class="hljs-keyword">this</span>.$router.push(<span class="hljs-string">&quot;/home&quot;</span>);
        }
 });</code></pre><p>Vuex&#x91CC;&#x9762;&#x6211;&#x662F;&#x8FD9;&#x6837;&#x5199;&#x7684;&#xFF08;&#x5982;&#x679C;&#x9879;&#x76EE;&#x4E0D;&#x9700;&#x8981;Vuex&#xFF0C;&#x90A3;&#x4E48;&#x76F4;&#x63A5;&#x4F7F;&#x7528;HTML5&#x50A8;&#x5B58;&#x5C31;&#x53EF;&#x4EE5;&#x4E86;&#xFF09;&#xFF1A;</p><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const store = new Vuex.Store({
  // &#x8BBE;&#x7F6E;&#x5C5E;&#x6027;
  state: {
    isLogin: false,
  },

  // &#x83B7;&#x53D6;&#x5C5E;&#x6027;&#x7684;&#x72B6;&#x6001;
  getters: {
    //&#x83B7;&#x53D6;&#x767B;&#x5F55;&#x72B6;&#x6001;
    isLogin: state =&gt; state.isLogin,
  },

  // &#x8BBE;&#x7F6E;&#x5C5E;&#x6027;&#x72B6;&#x6001;
  mutations: {
    //&#x4FDD;&#x5B58;&#x767B;&#x5F55;&#x72B6;&#x6001;
    userStatus(state, flag) {
      state.isLogin = flag
    },
  },

  // &#x5E94;&#x7528;mutations
  actions: {
    //&#x83B7;&#x53D6;&#x767B;&#x5F55;&#x72B6;&#x6001;
    setUser({commit}, flag) {
      commit(&quot;userStatus&quot;, flag)
    },
  }
})" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs pf"><code>export const store = new Vuex.Store({
  // &#x8BBE;&#x7F6E;&#x5C5E;&#x6027;
  <span class="hljs-keyword">state</span>: {
    isLogin: false,
  },

  // &#x83B7;&#x53D6;&#x5C5E;&#x6027;&#x7684;&#x72B6;&#x6001;
  getters: {
    //&#x83B7;&#x53D6;&#x767B;&#x5F55;&#x72B6;&#x6001;
    isLogin: <span class="hljs-keyword">state</span> =&gt; <span class="hljs-keyword">state</span>.isLogin,
  },

  // &#x8BBE;&#x7F6E;&#x5C5E;&#x6027;&#x72B6;&#x6001;
  mutations: {
    //&#x4FDD;&#x5B58;&#x767B;&#x5F55;&#x72B6;&#x6001;
    <span class="hljs-keyword">user</span>Status(<span class="hljs-keyword">state</span>, flag) {
      <span class="hljs-keyword">state</span>.isLogin = flag
    },
  },

  // &#x5E94;&#x7528;mutations
  actions: {
    //&#x83B7;&#x53D6;&#x767B;&#x5F55;&#x72B6;&#x6001;
    <span class="hljs-built_in">set</span>User({commit}, flag) {
      commit(<span class="hljs-string">&quot;userStatus&quot;</span>, flag)
    },
  }
})</code></pre><h4><strong>&#x91CD;&#x70B9;&#x6765;&#x4E86;~&#xFF0C;&#x5728;mian.js&#x91CC;</strong></h4><div class="widget-codetool" style="display:none"><div class="widget-codetool--inner"><span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x5168;&#x9009;"></span> <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.beforeEach((to, from, next) =&gt; {

  //&#x83B7;&#x53D6;&#x7528;&#x6237;&#x767B;&#x5F55;&#x6210;&#x529F;&#x540E;&#x50A8;&#x5B58;&#x7684;&#x767B;&#x5F55;&#x6807;&#x5FD7;
  let getFlag = localStorage.getItem(&quot;Flag&quot;);

  //&#x5982;&#x679C;&#x767B;&#x5F55;&#x6807;&#x5FD7;&#x5B58;&#x5728;&#x4E14;&#x4E3A;isLogin&#xFF0C;&#x5373;&#x7528;&#x6237;&#x5DF2;&#x767B;&#x5F55;
  if(getFlag === &quot;isLogin&quot;){

    //&#x8BBE;&#x7F6E;vuex&#x767B;&#x5F55;&#x72B6;&#x6001;&#x4E3A;&#x5DF2;&#x767B;&#x5F55;
    store.state.isLogin = true
    next()

    //&#x5982;&#x679C;&#x5DF2;&#x767B;&#x5F55;&#xFF0C;&#x8FD8;&#x60F3;&#x60F3;&#x8FDB;&#x5165;&#x767B;&#x5F55;&#x6CE8;&#x518C;&#x754C;&#x9762;&#xFF0C;&#x5219;&#x5B9A;&#x5411;&#x56DE;&#x9996;&#x9875;
    if (!to.meta.isLogin) {
       //iViewUi&#x53CB;&#x597D;&#x63D0;&#x793A;
      iView.Message.error(&apos;&#x8BF7;&#x5148;&#x9000;&#x51FA;&#x767B;&#x5F55;&apos;)
      next({
        path: &apos;/home&apos;
      })
    }
  
  //&#x5982;&#x679C;&#x767B;&#x5F55;&#x6807;&#x5FD7;&#x4E0D;&#x5B58;&#x5728;&#xFF0C;&#x5373;&#x672A;&#x767B;&#x5F55;
  }else{

    //&#x7528;&#x6237;&#x60F3;&#x8FDB;&#x5165;&#x9700;&#x8981;&#x767B;&#x5F55;&#x7684;&#x9875;&#x9762;&#xFF0C;&#x5219;&#x5B9A;&#x5411;&#x56DE;&#x767B;&#x5F55;&#x754C;&#x9762;
    if(to.meta.isLogin){
      next({
        path: &apos;/login&apos;,
      })
      //iViewUi&#x53CB;&#x597D;&#x63D0;&#x793A;
      iView.Message.info(&apos;&#x8BF7;&#x5148;&#x767B;&#x5F55;&apos;)
    //&#x7528;&#x6237;&#x8FDB;&#x5165;&#x65E0;&#x9700;&#x767B;&#x5F55;&#x7684;&#x754C;&#x9762;&#xFF0C;&#x5219;&#x8DF3;&#x8F6C;&#x7EE7;&#x7EED;
    }else{
      next()
    }

  }

});

router.afterEach(route =&gt; {
  window.scroll(0, 0);
});" title="" data-original-title="&#x590D;&#x5236;"></span> <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="&#x653E;&#x8FDB;&#x7B14;&#x8BB0;"></span></div></div><pre class="hljs javascript"><code>router.beforeEach(<span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {

  <span class="hljs-comment">//&#x83B7;&#x53D6;&#x7528;&#x6237;&#x767B;&#x5F55;&#x6210;&#x529F;&#x540E;&#x50A8;&#x5B58;&#x7684;&#x767B;&#x5F55;&#x6807;&#x5FD7;</span>
  <span class="hljs-keyword">let</span> getFlag = localStorage.getItem(<span class="hljs-string">&quot;Flag&quot;</span>);

  <span class="hljs-comment">//&#x5982;&#x679C;&#x767B;&#x5F55;&#x6807;&#x5FD7;&#x5B58;&#x5728;&#x4E14;&#x4E3A;isLogin&#xFF0C;&#x5373;&#x7528;&#x6237;&#x5DF2;&#x767B;&#x5F55;</span>
  <span class="hljs-keyword">if</span>(getFlag === <span class="hljs-string">&quot;isLogin&quot;</span>){

    <span class="hljs-comment">//&#x8BBE;&#x7F6E;vuex&#x767B;&#x5F55;&#x72B6;&#x6001;&#x4E3A;&#x5DF2;&#x767B;&#x5F55;</span>
    store.state.isLogin = <span class="hljs-literal">true</span>
    next()

    <span class="hljs-comment">//&#x5982;&#x679C;&#x5DF2;&#x767B;&#x5F55;&#xFF0C;&#x8FD8;&#x60F3;&#x60F3;&#x8FDB;&#x5165;&#x767B;&#x5F55;&#x6CE8;&#x518C;&#x754C;&#x9762;&#xFF0C;&#x5219;&#x5B9A;&#x5411;&#x56DE;&#x9996;&#x9875;</span>
    <span class="hljs-keyword">if</span> (!to.meta.isLogin) {
       <span class="hljs-comment">//iViewUi&#x53CB;&#x597D;&#x63D0;&#x793A;</span>
      iView.Message.error(<span class="hljs-string">&apos;&#x8BF7;&#x5148;&#x9000;&#x51FA;&#x767B;&#x5F55;&apos;</span>)
      next({
        <span class="hljs-attr">path</span>: <span class="hljs-string">&apos;/home&apos;</span>
      })
    }
  
  <span class="hljs-comment">//&#x5982;&#x679C;&#x767B;&#x5F55;&#x6807;&#x5FD7;&#x4E0D;&#x5B58;&#x5728;&#xFF0C;&#x5373;&#x672A;&#x767B;&#x5F55;</span>
  }<span class="hljs-keyword">else</span>{

    <span class="hljs-comment">//&#x7528;&#x6237;&#x60F3;&#x8FDB;&#x5165;&#x9700;&#x8981;&#x767B;&#x5F55;&#x7684;&#x9875;&#x9762;&#xFF0C;&#x5219;&#x5B9A;&#x5411;&#x56DE;&#x767B;&#x5F55;&#x754C;&#x9762;</span>
    <span class="hljs-keyword">if</span>(to.meta.isLogin){
      next({
        <span class="hljs-attr">path</span>: <span class="hljs-string">&apos;/login&apos;</span>,
      })
      <span class="hljs-comment">//iViewUi&#x53CB;&#x597D;&#x63D0;&#x793A;</span>
      iView.Message.info(<span class="hljs-string">&apos;&#x8BF7;&#x5148;&#x767B;&#x5F55;&apos;</span>)
    <span class="hljs-comment">//&#x7528;&#x6237;&#x8FDB;&#x5165;&#x65E0;&#x9700;&#x767B;&#x5F55;&#x7684;&#x754C;&#x9762;&#xFF0C;&#x5219;&#x8DF3;&#x8F6C;&#x7EE7;&#x7EED;</span>
    }<span class="hljs-keyword">else</span>{
      next()
    }

  }

});

router.afterEach(<span class="hljs-function"><span class="hljs-params">route</span> =&gt;</span> {
  <span class="hljs-built_in">window</span>.scroll(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
});</code></pre><p>&#x8FD9;&#x6837;&#x5C31;&#x5DF2;&#x7ECF;&#x5B8C;&#x6210;&#x4E86;Vue&#x7684;&#x767B;&#x5F55;&#x6CE8;&#x518C;&#xFF0C;&#x5F53;&#x7528;&#x6237;&#x5173;&#x95ED;&#x6D4F;&#x89C8;&#x5668;&#x6216;&#x8005;&#x7B2C;&#x4E8C;&#x5929;&#x518D;&#x6B21;&#x8FDB;&#x5165;&#x7F51;&#x7AD9;&#xFF0C;&#x7528;&#x6237;&#x4F9D;&#x65E7;&#x53EF;&#x4EE5;&#x4FDD;&#x6301;&#x7740;&#x767B;&#x5F55;&#x7684;&#x72B6;&#x6001;&#x76F4;&#x5230;&#x7528;&#x6237;&#x624B;&#x52A8;&#x9000;&#x51FA;&#x767B;&#x5F55;&#x3002;</p><p><strong>Tips&#xFF1A;</strong>&#x7528;&#x6237;&#x9000;&#x51FA;&#x53EA;&#x9700;&#x8981;localStorage.removeItem(&quot;Flag&quot;)&#x5373;&#x53EF;</p><h4><strong>&#x5982;&#x679C;&#x6709;&#x4EC0;&#x4E48;&#x7591;&#x95EE;&#x6B22;&#x8FCE;&#x7559;&#x8A00;&#xFF0C;&#x6709;&#x9519;&#x8BEF;&#x6216;&#x8005;&#x6709;&#x66F4;&#x7B80;&#x5355;&#x7684;&#x65B9;&#x6CD5;&#x6B22;&#x8FCE;&#x5927;&#x529B;&#x6307;&#x51FA;~~</strong></h4>
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue登录注册，并保持登录状态

## 原文链接
[https://segmentfault.com/a/1190000016040068](https://segmentfault.com/a/1190000016040068)

