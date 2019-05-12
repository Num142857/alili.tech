---
title: 'vue前后端分离项目做权限控制、自动登陆、h5 history模式及404页面' 
date: 2018-12-29 2:30:10
hidden: true
slug: 14am814gyf79
categories: [reprint]
---

{{< raw >}}

                    
<p>本文来谈谈前后端分离的项目如何做权限控制和自动登陆，如何应用history模式使网址看起来和传统无差，以及设置404页面，以vue为例。</p>
<h1 id="articleHeader0">自动登陆</h1>
<p>自动登陆一般是通过cookie和session的配合实现的。原理是登陆完成后服务端将用户信息保存在session中，并将sessionid保存在cookie中发送给客户端。客户端将cookie存起来，下次访问时带上cookie(如果没有过期)发起请求，服务端收到请求从cookie里获取sessionid来找到session，如果session还在的话就认为此用户不需要登陆了，给他返回他需要的数据。否则就跳转到登陆页面。</p>
<p>看起来好像很复杂，实际应用起来却十分简单，因为前人已经为我们做了很多工作，很多框架里使用session便会自动生成cookie发往客户端，客户端(浏览器)会自动保存cookie(没有禁用cookie的话)，下次发送请求的时候客户端也会自动带上cookie，服务端的session包会自动从相关cookie的信息里找到session。很多工作库和浏览器已经帮我们做了，其实我们只需要做两个事：1、存session 2、判断session是否有效。</p>
<p>我们通过session和cookie的过期时间来设置自动登陆的有效期，一般两者设置相同的时间，因为cookie很容易伪造。session的储存位置也很有讲究，可以储存在文件系统里、内存里、redis，单台服务器存在文件系统里就行了，分布式系统的话就得用redis了。</p>
<p>原理讲完了，下面说应用。传统后端项目自动登陆没前端啥事，但在前后端分离的项目里，控制路由跳转的逻辑都在前端，前后端通过接口来交流，我们只需要在<strong>首次进入前端单页应用时给后端发送一个请求，带上cookie让后端返回是否登陆，如果后端返回为403则前端控制跳转登陆页面。</strong></p>
<h1 id="articleHeader1">权限控制</h1>
<p>并不是所有页面都是开放的，有些页面需要登陆后或者一些权限才能使用，这时候就需要用到权限控制，这个工作在前后端分离的项目里，前后端都要做。</p>
<h2 id="articleHeader2">前端</h2>
<p>先说前端，因为有些接口需要用户id等信息，所以我们需要用到vuex来储存全局数据，同时配合vue-router的meta元数据和钩子实现权限控制。vue-router文档里有介绍。</p>
<p>具体应用就是给需要权限的路由加上mete字段，在进入每个路由前调用钩子，如果需要权限并且没有vuex里user信息，就发起检查登陆请求，如果已登陆这个请求会返回用户信息并存在vuex里，否则返回403错误码前端跳转登陆。这样前端只需要进入页面检查一次登陆就行了，需要用户信息的接口去vuex取即可，必要时可以手动刷新user数据。当然刷新页面后vuex便清空了，需要重新检查登陆，有需要的话可以储存在localstorage或cookie里。注销的时候调用注销接口后端清除session，前端清除user</p>
<p>代码片段：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// router.js router文件里
routes: [
    {
      path: '/login',
      component: Foo,
    },
    {
      path: '/user',
      component: Foo,
      meta: { requiresAuth: true }
    },
]


router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.auth !== false) &amp;&amp; !store.state.user) {
        store.dispatch('checkLogin', next);
    } else {
        next();
    }
});


// store.js vuex文件里
actions: {
    // 检查登陆
    checkLogin({commit}, next) {
        axios('get', '/check-auth')
            .then(res => {
                if (res.status == 200) {
                    commit('user', res.data.data);
                    next();
                }
            })
            .catch(err => {
                commit('user', null);
                next('/login');
            })
    },
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// router.js router文件里</span>
routes: [
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/login'</span>,
      <span class="hljs-attr">component</span>: Foo,
    },
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/user'</span>,
      <span class="hljs-attr">component</span>: Foo,
      <span class="hljs-attr">meta</span>: { <span class="hljs-attr">requiresAuth</span>: <span class="hljs-literal">true</span> }
    },
]


router.beforeEach(<span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (to.matched.some(<span class="hljs-function"><span class="hljs-params">record</span> =&gt;</span> record.meta.auth !== <span class="hljs-literal">false</span>) &amp;&amp; !store.state.user) {
        store.dispatch(<span class="hljs-string">'checkLogin'</span>, next);
    } <span class="hljs-keyword">else</span> {
        next();
    }
});


<span class="hljs-comment">// store.js vuex文件里</span>
actions: {
    <span class="hljs-comment">// 检查登陆</span>
    checkLogin({commit}, next) {
        axios(<span class="hljs-string">'get'</span>, <span class="hljs-string">'/check-auth'</span>)
            .then(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> {
                <span class="hljs-keyword">if</span> (res.status == <span class="hljs-number">200</span>) {
                    commit(<span class="hljs-string">'user'</span>, res.data.data);
                    next();
                }
            })
            .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
                commit(<span class="hljs-string">'user'</span>, <span class="hljs-literal">null</span>);
                next(<span class="hljs-string">'/login'</span>);
            })
    },
}</code></pre>
<h2 id="articleHeader3">后端</h2>
<p>虽然前端做了权限控制，但是后端也需要做接口权限控制，防止接口被滥用。web安全是一个很大的话题，本人对这方面了解的不是很深入，只能浅显的谈谈。比如应用https保证传输安全；请求时带上xrsf-token；服务端对Access-Control-Allow-Origin做限制，防止跨域请求。如果是授权的话使用oauth2.0方案，如果是简单的基于登陆的应用，在后端写一个中间件，需要登陆权限的接口都走这个中间件，未登陆便不返回数据。</p>
<h1 id="articleHeader4">history网址模式</h1>
<p>什么是history模式？vue-router文档里介绍的比较清楚了</p>
<blockquote>
<p>vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。</p>
<p>history 模式利用 history.pushState API 来完成 URL 跳转而无须重新加载页面。当你使用 history 模式时，URL 就像正常的 url，例如 <a href="http://yoursite.com/user/id" rel="nofollow noreferrer" target="_blank">http://yoursite.com/user/id</a>，也好看！</p>
</blockquote>
<p>vue等单页应用的网址是通过hash模拟实现的，其实是网址加上#path，这样不光很丑陋还占用了锚点，而且在很多请求中#hash部分会被忽略，例如微信开发中。react-router就提到，每个人都应该使用history模式。</p>
<p>开启history模式需要后端配置，一般是在web代理服务器上配置，也可以通过后端路由来重定向。例如用的较多的ngnix配置:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="location / {
  try_files $uri $uri/ /index.html;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-attribute">location</span> / {
  <span class="hljs-attribute">try_files</span> <span class="hljs-variable">$uri</span> <span class="hljs-variable">$uri</span>/ /index.html;
}</code></pre>
<p>配置很简单，这配置是什么意思？为什么需要这么做呢？如果<a href="http://yoursite.com" rel="nofollow noreferrer" target="_blank">http://yoursite.com</a>指向你的单页的index.html这个文件，那会打开这个html并运行其中的js，你的应用就呈现给用户了。但是你访问<a href="http://yoursite.com/user" rel="nofollow noreferrer" target="_blank">http://yoursite.com/user</a>，这个网址并没有指向静态文件，也没有后端路由去处理他，就会出现404，浏览器根本找不到你的单页入口。通过这个配置，访问<a href="http://yoursite.com/user" rel="nofollow noreferrer" target="_blank">http://yoursite.com/user</a>服务器尝试寻找index.html入口文件，在浏览器拿到html和js运行后，vue-router会分析url之中的path:/user，利用js控制理由渲染user页面。</p>
<h1 id="articleHeader5">404页面</h1>
<p>用户总会不小心误入歧途，所以你需要一个404页面带她回家。配置404页面很简单，就是写一个路由匹配所有路径(*)，<strong>放在最后</strong>，匹配不到的都会进入404页面。</p>
<p>代码片段：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// router.js router文件里
routes: [
    {
      path: '/login',
      component: Foo,
    },
    {
      path: '/user',
      component: Foo,
      meta: { requiresAuth: true }
    },
    // 一定要在最后
    {
      path: '*',
      component: 404,
      meta: { requiresAuth: true }
    },
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// router.js router文件里</span>
routes: [
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/login'</span>,
      <span class="hljs-attr">component</span>: Foo,
    },
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'/user'</span>,
      <span class="hljs-attr">component</span>: Foo,
      <span class="hljs-attr">meta</span>: { <span class="hljs-attr">requiresAuth</span>: <span class="hljs-literal">true</span> }
    },
    <span class="hljs-comment">// 一定要在最后</span>
    {
      <span class="hljs-attr">path</span>: <span class="hljs-string">'*'</span>,
      <span class="hljs-attr">component</span>: <span class="hljs-number">404</span>,
      <span class="hljs-attr">meta</span>: { <span class="hljs-attr">requiresAuth</span>: <span class="hljs-literal">true</span> }
    },
]</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue前后端分离项目做权限控制、自动登陆、h5 history模式及404页面

## 原文链接
[https://segmentfault.com/a/1190000011427411](https://segmentfault.com/a/1190000011427411)

