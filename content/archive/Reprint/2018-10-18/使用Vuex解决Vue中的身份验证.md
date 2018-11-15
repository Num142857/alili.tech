---
title: 使用Vuex解决Vue中的身份验证
hidden: true
categories: reprint
slug: bd062f28
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <p>传统方式中，许多人使用本地存储，来管理通过客户端验证生成的tokens。一个大问题是如何有更好的方式，来管理验证tokens，从而允许我们来存储更大的用户信息。</p>
<p>这就是<a href="https://vuex.vuejs.org">Vuex</a>的作用。 Vuex为<a href="https://vuejs.org">Vue.js</a>应用管理状态.。对于应用中所有的组件来说，它被当做中央存储，并用规则确保状态只能以可预见的方式改变。</p>
<p>对于经常检查本地存储来说，听起来是个更好的选择？让我们一起来探索下吧。</p>
<h2>建立应用模块</h2>
<p>对于这个项目，我们想创建一个使用vuex和<a href="https://router.vuejs.org/">vue-router</a>的vue应用。我们会使用vue cli 3.0 来创建一个vue项目，并从选项中选择路由和vuex。</p>
<p>执行下面的命令开始创建:</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> vue create vue-auth</span>

</code></pre><p>按照对话框的提示，添加必要的信息，并选择我们需要的选项，完成安装。</p>
<p>下一步, 安装<a href="https://github.com/axios/axios">axios</a>:</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> npm install axios --save</span>

</code></pre><h3>配置Axios</h3>
<p>我们在许多组件中都需要用到axios。让我们在全局整体来配置它，这样当我们需要它的时候，不用每次都去引入。</p>
<p>打开 <code>./src/main.js</code> 文件，并且添加下面:</p>
<pre><code class="hljs clean">[...]
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'./store'</span>
<span class="hljs-keyword">import</span> Axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>

Vue.prototype.$http = Axios;
const token = localStorage.getItem(<span class="hljs-string">'token'</span>)
<span class="hljs-keyword">if</span> (token) {
  Vue.prototype.$http.defaults.headers.common[<span class="hljs-string">'Authorization'</span>] = token
}
[...]

</code></pre><p>现在，当我们想在组件内使用axios时, 我们可以用<code>this.$http</code> ，这样相当于直接是axios。我们也可以在axios头部给自己的token, 设置<code>身份验证</code>，这样如果token是必需的，我们的请求将处于控制中。在这种方式下，当我们想要发送请求时，任何时候都不用设置token。</p>
<p>相关课程: <a href="https://bit.ly/2gCILn1">Vue创建一个网上商店</a></p>
<p>完成之后，让我们使用服务器来处理身份验证。</p>
<h2>创建身份验证服务</h2>
<p>我已经写过关于这个，在我解释如何用vue-router来解决身份验证时。仔细看看<a href="https://scotch.io/tutorials/vue-authentication-and-route-handling-using-vue-router#toc-setup-nodejs-server">Setup Node.js Server</a> 这个章节。</p>
<h2>创建组件</h2>
<h3>登录组件</h3>
<p>创建<code>Login.vue</code> 在 <code>./src/components</code> 目录下。 之后, 给登录页面添加模板:</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"login"</span> @<span class="hljs-attr">submit.prevent</span>=<span class="hljs-string">"login"</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Sign in<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>Email<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">required</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"email"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"email"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"Name"</span>/&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>Password<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">required</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"password"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"password"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"Password"</span>/&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">hr</span>/&gt;</span>
     <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"submit"</span>&gt;</span>Login<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
   <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
 <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

</code></pre><p>当你做完之后, 添加data属性，将其绑定到HTML表单中：</p>
<pre><code class="hljs xml">[...]
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data(){
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">email</span> : <span class="hljs-string">""</span>,
        <span class="hljs-attr">password</span> : <span class="hljs-string">""</span>
      }
    },
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

</code></pre><p>现在, 让我们给登录添加方法：</p>
<pre><code class="hljs xml">[...]
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    [...]
    methods: {
      <span class="hljs-attr">login</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">let</span> email = <span class="hljs-keyword">this</span>.email 
        <span class="hljs-keyword">let</span> password = <span class="hljs-keyword">this</span>.password
        <span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'login'</span>, { email, password })
       .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">this</span>.$router.push(<span class="hljs-string">'/'</span>))
       .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(err))
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

</code></pre><p>我们正在使用vuex的action — <code>login</code> 来解决身份验证。我们可以在将actions细化到回调里面，这样就可以在自己的组件里面做一些很酷的事情了。</p>
<h3>注册组件</h3>
<p>跟login组件类似，那我们给注册用户弄一个了。在组件目录里面创建<code>Register.vue</code> ，并将下面的添加进去：</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>Register<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">form</span> @<span class="hljs-attr">submit.prevent</span>=<span class="hljs-string">"register"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"name"</span>&gt;</span>Name<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"name"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"name"</span> <span class="hljs-attr">required</span> <span class="hljs-attr">autofocus</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"email"</span> &gt;</span>E-Mail Address<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"email"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"email"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"email"</span> <span class="hljs-attr">required</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"password"</span>&gt;</span>Password<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"password"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"password"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"password"</span> <span class="hljs-attr">required</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"password-confirm"</span>&gt;</span>Confirm Password<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"password-confirm"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"password"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"password_confirmation"</span> <span class="hljs-attr">required</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"submit"</span>&gt;</span>Register<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

</code></pre><p>让我们定义一下这些将绑定到表单里面的data属性:</p>
<pre><code class="hljs xml">[...]
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    data(){
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">name</span> : <span class="hljs-string">""</span>,
        <span class="hljs-attr">email</span> : <span class="hljs-string">""</span>,
        <span class="hljs-attr">password</span> : <span class="hljs-string">""</span>,
        <span class="hljs-attr">password_confirmation</span> : <span class="hljs-string">""</span>,
        <span class="hljs-attr">is_admin</span> : <span class="hljs-literal">null</span>
      }
    },
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

</code></pre><p>现在，让我们添加方法进去：</p>
<pre><code class="hljs xml">[...]
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    [...]
    methods: {
      <span class="hljs-attr">register</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">let</span> data = {
          <span class="hljs-attr">name</span>: <span class="hljs-keyword">this</span>.name,
          <span class="hljs-attr">email</span>: <span class="hljs-keyword">this</span>.email,
          <span class="hljs-attr">password</span>: <span class="hljs-keyword">this</span>.password,
          <span class="hljs-attr">is_admin</span>: <span class="hljs-keyword">this</span>.is_admin
        }
        <span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'register'</span>, data)
       .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">this</span>.$router.push(<span class="hljs-string">'/'</span>))
       .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(err))
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

</code></pre><h3>安全组件</h3>
<p>让我们创建一个普通的组件，它在用户通过验证后会显示。文件命名为<code>Secure.vue</code>，并添加下面的进去：</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>This page is protected by auth<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

</code></pre><h3>更新App组件</h3>
<p>打开<code>./src/App.vue</code> 文件，并添加下面的进去:</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"app"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"nav"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/"</span>&gt;</span>Home<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span> |
      <span class="hljs-tag">&lt;<span class="hljs-name">router-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/about"</span>&gt;</span>About<span class="hljs-tag">&lt;/<span class="hljs-name">router-link</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">v-if</span>=<span class="hljs-string">"isLoggedIn"</span>&gt;</span> | <span class="hljs-tag">&lt;<span class="hljs-name">a</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"logout"</span>&gt;</span>Logout<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">router-view</span>/&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

</code></pre><p>如果用户登录进去后，你能看到关联的<code>Logout</code>了 吗？很好。</p>
<p>现在，让我们给logout添加逻辑。</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-attr">computed</span> : {
      <span class="hljs-attr">isLoggedIn</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$store.getters.isLoggedIn}
    },
    <span class="hljs-attr">methods</span>: {
      <span class="hljs-attr">logout</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">this</span>.$store.dispatch(<span class="hljs-string">'logout'</span>)
        .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
          <span class="hljs-keyword">this</span>.$router.push(<span class="hljs-string">'/login'</span>)
        })
      }
    },
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

</code></pre><p>当用户点击退出按钮时，我们其实在做两件事 — 计算用户验证的状态和分发vuex store里面的退出事件。在退出之后，我们利用 <code>this.$router.push('/login')</code>，切换用户到 <code>login</code>页面。当然你可以改变任何你想让用户跳转的地方。</p>
<p>就是这样了。让我们用vuex构建权限模块。</p>
<h2>Vuex权限模块</h2>
<p>如果你读过以前的<a href="https://scotch.io/tutorials/vue-authentication-and-route-handling-using-vue-router#toc-setup-nodejs-server"><strong>Setup Node.js Server</strong></a> **部分, 你应该注意到我们需要在本地存储用户权限token，同时，当用户被授予权限后，我们随时需要重新得到token以及用户信息。</p>
<p>首先, 让我们给vuex创建 <code>store.js</code>文件:</p>
<pre><code class="hljs xquery"><span class="hljs-keyword">import</span> Vue from <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Vuex from <span class="hljs-string">'vuex'</span>
<span class="hljs-keyword">import</span> axios from <span class="hljs-string">'axios'</span>

Vue.use(Vuex)

export <span class="hljs-keyword">default</span> new Vuex.Store({
  state: {
    status: <span class="hljs-string">''</span>,
    token: localStorage.getItem(<span class="hljs-string">'token'</span>) || <span class="hljs-string">''</span>,
    user : {}
  },
  mutations: {

  },
  actions: {

  },
  getters : {

  }
})

</code></pre><p>如果你注意到，我们同时引入了vue,vuex和axios，之后让vue使用vuex，这是因为它是很重要的一步。</p>
<p>我们已经定义了state的属性。现在vuex的state能够支持验证状态， <code>jwt</code> token以及用户信息。</p>
<h3>创建Vuex登录事件</h3>
<p>Vuex actions里面主要是提交更改到vuex的store里面。我们将创建一个<code>login</code> 的action，它将使用服务器对用户进行身份验证，并向vuex存储提交用户凭据。打开<code>./src/store.js</code>文件，并添加下面到actions对象中：</p>
<pre><code class="hljs stylus"><span class="hljs-function"><span class="hljs-title">login</span><span class="hljs-params">({commit}, user)</span></span>{
    return new Promise((resolve, reject) =&gt; {
      commit(<span class="hljs-string">'auth_request'</span>)
      axios({url: <span class="hljs-string">'http://localhost:3000/login'</span>, data: user, method: <span class="hljs-string">'POST'</span> })
      .then(resp =&gt; {
        const token = resp<span class="hljs-selector-class">.data</span><span class="hljs-selector-class">.token</span>
        const user = resp<span class="hljs-selector-class">.data</span><span class="hljs-selector-class">.user</span>
        localStorage.setItem(<span class="hljs-string">'token'</span>, token)
        axios<span class="hljs-selector-class">.defaults</span><span class="hljs-selector-class">.headers</span><span class="hljs-selector-class">.common</span>[<span class="hljs-string">'Authorization'</span>] = token
        commit(<span class="hljs-string">'auth_success'</span>, token, user)
        resolve(resp)
      })
      .catch(err =&gt; {
        commit(<span class="hljs-string">'auth_error'</span>)
        localStorage.removeItem(<span class="hljs-string">'token'</span>)
        reject(err)
      })
    })
},

</code></pre><p>登录action通过vuex <code>commit</code>验证，我们将用它进行触发更改。vuex store里面能记录这些更改的变化。</p>
<p>我们正在调用服务器的登录路径并返回必要的数据。我们在本地存储token，之后通过<code>auth_success</code>来更新存储用户信息和token。在这一点上，我们也在头部设置了<code>axios</code> 。</p>
<blockquote>
<p>我们可以在vuex store中存储token，但是如果用户离开我们的应用，所有在vuex里面的存储都将消失。为了确保用户在有效时间内不用再重复登录，我们只能将token进行本地存储。</p>
<p>重要的是你知道这些是如何工作的，这样你就能决定你到底想要实现什么。</p>
</blockquote>
<p>我们返回一个promise，这样我们能在用户登录完成后，做出响应。</p>
<h3>创建Vuex<code>注册</code>事件</h3>
<p>像 <code>login</code> 事件, the <code>register</code> 事件是同一种工作方式。在相同的文件中，添加下面的到actions对象里面:</p>
<pre><code class="hljs stylus"><span class="hljs-function"><span class="hljs-title">register</span><span class="hljs-params">({commit}, user)</span></span>{
  return new Promise((resolve, reject) =&gt; {
    commit(<span class="hljs-string">'auth_request'</span>)
    axios({url: <span class="hljs-string">'http://localhost:3000/register'</span>, data: user, method: <span class="hljs-string">'POST'</span> })
    .then(resp =&gt; {
      const token = resp<span class="hljs-selector-class">.data</span><span class="hljs-selector-class">.token</span>
      const user = resp<span class="hljs-selector-class">.data</span><span class="hljs-selector-class">.user</span>
      localStorage.setItem(<span class="hljs-string">'token'</span>, token)
      axios<span class="hljs-selector-class">.defaults</span><span class="hljs-selector-class">.headers</span><span class="hljs-selector-class">.common</span>[<span class="hljs-string">'Authorization'</span>] = token
      commit(<span class="hljs-string">'auth_success'</span>, token, user)
      resolve(resp)
    })
    .catch(err =&gt; {
      commit(<span class="hljs-string">'auth_error'</span>, err)
      localStorage.removeItem(<span class="hljs-string">'token'</span>)
      reject(err)
    })
  })
},

</code></pre><p>它与<code>login</code> 事件工作方式很像,。称之为有共同的mutators的 <code>login</code> 和<code>register</code> ，具有相同的目标——让用户进入系统。</p>
<h3>创建Vuex<code>退出</code>事件</h3>
<p>我们希望用户能够退出系统，同时，我们希望销毁上一次验证的会话数据。在同一个<code>actions</code>对象中，添加下面：</p>
<pre><code class="hljs stylus"><span class="hljs-function"><span class="hljs-title">logout</span><span class="hljs-params">({commit})</span></span>{
  return new Promise((resolve, reject) =&gt; {
    commit(<span class="hljs-string">'logout'</span>)
    localStorage.removeItem(<span class="hljs-string">'token'</span>)
    delete axios<span class="hljs-selector-class">.defaults</span><span class="hljs-selector-class">.headers</span><span class="hljs-selector-class">.common</span>[<span class="hljs-string">'Authorization'</span>]
    resolve()
  })
}

</code></pre><p>现在，当用户点击退出时，我们将移除之前在 <code>axios</code>头部设置的<code>jwt</code> token 。他们现在将无法执行需要token的事务。</p>
<h3>创建Mutations</h3>
<p>像我之前提到的，mutators是被用来改变vuex store的状态。让我们在应用中给用过的mutators定义。在mutators对象中，添加下面的：</p>
<pre><code class="hljs pf">mutations: {
  auth_request(<span class="hljs-keyword">state</span>){
    <span class="hljs-keyword">state</span>.status = 'loading'
  },
  auth_success(<span class="hljs-keyword">state</span>, token, <span class="hljs-keyword">user</span>){
    <span class="hljs-keyword">state</span>.status = 'success'
    <span class="hljs-keyword">state</span>.token = token
    <span class="hljs-keyword">state</span>.<span class="hljs-keyword">user</span> = <span class="hljs-keyword">user</span>
  },
  auth_error(<span class="hljs-keyword">state</span>){
    <span class="hljs-keyword">state</span>.status = 'error'
  },
  logout(<span class="hljs-keyword">state</span>){
    <span class="hljs-keyword">state</span>.status = ''
    <span class="hljs-keyword">state</span>.token = ''
  },
},

</code></pre><h3>创建Getters</h3>
<p>我们使用getter来获取vuex状态中的属性值。在这种情况下，getter的作用是将应用程序数据与应用程序逻辑分离，并确保我们不会泄露敏感信息。</p>
<p>添加下面的到<code>getters</code> 对象中:</p>
<pre><code class="hljs pf">getters : {
  isLoggedIn: <span class="hljs-keyword">state</span> =&gt; !!<span class="hljs-keyword">state</span>.token,
  authStatus: <span class="hljs-keyword">state</span> =&gt; <span class="hljs-keyword">state</span>.status,
}

</code></pre><p>你会同意我的观点，这是一种更简洁的访问存储数据的方式☺️.</p>
<h2>在Auth后面隐藏页面</h2>
<p>这篇文章的整个目的是实现身份验证，让没有权限的用户看不到某些页面。为了实现这个，我们需要知道用户想要访问的页面，以及当用户被授权时，我们有一定的方法来检验它。我们同时需要一定的方式，如果某些页面，授权或者未授权的用户可以单独或者同时访问的。这些都是很重要的考虑条件，幸运地是，我们可以通过vue-router来说实现。</p>
<h3>定义路由给授权和未授权的页面</h3>
<p>打开 <code>./src/router.js</code> 文件，并引入我们需要的这些:</p>
<pre><code class="hljs clean"><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-keyword">import</span> store <span class="hljs-keyword">from</span> <span class="hljs-string">'./store.js'</span>
<span class="hljs-keyword">import</span> Home <span class="hljs-keyword">from</span> <span class="hljs-string">'./views/Home.vue'</span>
<span class="hljs-keyword">import</span> About <span class="hljs-keyword">from</span> <span class="hljs-string">'./views/About.vue'</span>
<span class="hljs-keyword">import</span> Login <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Login.vue'</span>
<span class="hljs-keyword">import</span> Secure <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Secure.vue'</span>
<span class="hljs-keyword">import</span> Register <span class="hljs-keyword">from</span> <span class="hljs-string">'./components/Register.vue'</span>

Vue.use(Router)

</code></pre><p>正如你看到的这样，我们已经引入vue,vue-router和我们创建的vuex。我们同时还引入了定义的所有组件，并设置vue中使用路由。</p>
<p>让我们定义路由:</p>
<pre><code class="hljs xl">[...]
let router = new Router({
  mode: <span class="hljs-string">'history'</span>,
  routes: [
    {
      <span class="hljs-built_in">path</span>: <span class="hljs-string">'/'</span>,
      <span class="hljs-keyword">name</span>: <span class="hljs-string">'home'</span>,
      component: Home
    },
    {
      <span class="hljs-built_in">path</span>: <span class="hljs-string">'/login'</span>,
      <span class="hljs-keyword">name</span>: <span class="hljs-string">'login'</span>,
      component: Login
    },
    {
      <span class="hljs-built_in">path</span>: <span class="hljs-string">'/register'</span>,
      <span class="hljs-keyword">name</span>: <span class="hljs-string">'register'</span>,
      component: Register
    },
    {
      <span class="hljs-built_in">path</span>: <span class="hljs-string">'/secure'</span>,
      <span class="hljs-keyword">name</span>: <span class="hljs-string">'secure'</span>,
      component: Secure,
      meta: { 
        requiresAuth: <span class="hljs-literal">true</span>
      }
    },
    {
      <span class="hljs-built_in">path</span>: <span class="hljs-string">'/about'</span>,
      <span class="hljs-keyword">name</span>: <span class="hljs-string">'about'</span>,
      component: About
    }
  ]
})

export default router

</code></pre><p>我们路由的定义是很普遍的。对于需要权限验证的路由，我们需要增加额外的数据，确保当用户访问它时，我们可以识别它。这是添加到路由定义中的元属性的本质。如果你想问<strong>_”我可以添加更过的数据给</strong>元数据<strong>并使用它吗?”</strong>，我很坚定的告诉你，这是绝对的😁。</p>
<h3>解决未授权访问示例</h3>
<p>我们有自己的路由定义。现在，让我们检验未授权访问并采取行动。在 <code>router.js</code>文件中，添加下面的在 <code>export default router</code>之前：</p>
<pre><code class="hljs moonscript">router.beforeEach(<span class="hljs-function"><span class="hljs-params">(to, <span class="hljs-keyword">from</span>, <span class="hljs-built_in">next</span>)</span> =&gt;</span> {
  <span class="hljs-keyword">if</span>(to.matched.some(record =&gt; record.meta.requiresAuth)) {
    <span class="hljs-keyword">if</span> (store.getters.isLoggedIn) {
      <span class="hljs-built_in">next</span>()
      <span class="hljs-keyword">return</span>
    }
    <span class="hljs-built_in">next</span>(<span class="hljs-string">'/login'</span>) 
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-built_in">next</span>() 
  }
})

</code></pre><p>从这篇文章，通过使用vue router来进行身份验证，你可以回想一下我们这里有一个非常复杂的机制，它变得非常大，变得非常混乱。vuex已经帮我们简化了它，我们可以继续给路由添加任何条件。在我们的vuex存储中，我们可以定义操作来检查这些条件并获取返回它们的值。</p>
<h3>解决Token过期示例</h3>
<p>因为我们在本地存储token,它可以一直保留着。这意味着无论何时，我们打开自己的应用，它可以自动的验证用户，即使token已经过期失效。最多的情况是，我们的请求会因为无效token而持续失败。这对于用户是个不好的体验。</p>
<p>现在, 打开<code>./src/App.vue</code> 文件并在script里面，添加下面的：</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  [...]
  created: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.$http.interceptors.response.use(<span class="hljs-literal">undefined</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">resolve, reject</span>) </span>{
        <span class="hljs-keyword">if</span> (err.status === <span class="hljs-number">401</span> &amp;&amp; err.config &amp;&amp; !err.config.__isRetryRequest) {
          <span class="hljs-keyword">this</span>.$store.dispatch(logout)
        }
        <span class="hljs-keyword">throw</span> err;
      });
    });
  }
}

</code></pre><p>我们截获axios请求，已确定是否获取到<code>401未授权</code>响应。如果这么做，我们分发 <code>logout</code> 事件，那么用户获得退出应用。这会让用户跳转到之前设计的 <code>login</code>页面，这样他们可以再次登录。</p>
<p>我赞同这样会提升用户体验 ☺️.</p>
<h2>结束</h2>
<p>从以前的文章来看，您可以看到，基于vuex的引入，我们目前的应用程序发生了重大变化。现在，我们不依赖于一直检查token，不管到哪里都有混乱的条件。我们可以简单地使用vuex存储来管理权限，并且只需使用几行代码检查应用程序中的状态。</p>
<p>我希望这可以帮助您建立更好的应用。</p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/handling-authentication-in-vue-using-vuex](https://www.zcfy.cc/article/handling-authentication-in-vue-using-vuex)
原文标题: 使用Vuex解决Vue中的身份验证
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
