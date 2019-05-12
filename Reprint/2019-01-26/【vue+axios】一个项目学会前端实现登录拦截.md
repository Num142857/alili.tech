---
title: '【vue+axios】一个项目学会前端实现登录拦截' 
date: 2019-01-26 2:30:18
hidden: true
slug: 4nh0dh6zpy8
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">一个项目学会前端实现登录拦截</h1>
<blockquote><p>一个项目学会vue全家桶+axios实现登录、拦截、登出功能，以及利用axios的http拦截器拦截请求和响应。</p></blockquote>
<h2 id="articleHeader1">前言</h2>
<p>该项目是利用了Github 提供的personal token作为登录token，通过token访问你的Repository List。通过这个项目学习如何实现一个前端项目中所需要的<br>登录及拦截、登出、token失效的拦截及对应 axios 拦截器的使用。<br><strong>准备</strong><br>你需要先生成自己的 Github Personal Token（<a href="https://github.com/settings/tokens/new" rel="nofollow noreferrer" target="_blank">生成Token</a>）。<br>Token 生成后 访问 <a href="http://www.iamsuperman.cn/vue-axios-github/" rel="nofollow noreferrer" target="_blank">Demo</a>，即可查看你的Repository List。</p>
<h2 id="articleHeader2">项目结构</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── README.md
├── dist  // 打包构建后的文件夹
│&nbsp;&nbsp; ├── build.js
│&nbsp;&nbsp; └── build.js.map
├── index.html
├── package.json
├── src
│&nbsp;&nbsp; ├── App.vue
│&nbsp;&nbsp; ├── assets
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── css.css
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── icon.css
│&nbsp;&nbsp; │&nbsp;&nbsp; └── logo.png
│&nbsp;&nbsp; ├── constant
│&nbsp;&nbsp; │&nbsp;&nbsp; └── api.js  // 配置api接口文件
│&nbsp;&nbsp; ├── http.js // 封装fetch、post请求及http 拦截器配置文件
│&nbsp;&nbsp; ├── index.vue
│&nbsp;&nbsp; ├── login.vue
│&nbsp;&nbsp; ├── main.js
│&nbsp;&nbsp; ├── repository.vue
│&nbsp;&nbsp; ├── router.js // 路由配置文件
│&nbsp;&nbsp; └── store
│&nbsp;&nbsp;     ├── store.js  
│&nbsp;&nbsp;     └── types.js  // vuex types
└── webpack.config.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>.
├── README.md
├── <span class="hljs-built_in">dist</span>  <span class="hljs-comment">// 打包构建后的文件夹</span>
│&nbsp;&nbsp; ├── build.js
│&nbsp;&nbsp; └── build.js.<span class="hljs-built_in">map</span>
├── index.html
├── <span class="hljs-keyword">package</span>.json
├── src
│&nbsp;&nbsp; ├── App.vue
│&nbsp;&nbsp; ├── assets
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── css.css
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── icon.css
│&nbsp;&nbsp; │&nbsp;&nbsp; └── logo.png
│&nbsp;&nbsp; ├── constant
│&nbsp;&nbsp; │&nbsp;&nbsp; └── api.js  <span class="hljs-comment">// 配置api接口文件</span>
│&nbsp;&nbsp; ├── http.js <span class="hljs-comment">// 封装fetch、post请求及http 拦截器配置文件</span>
│&nbsp;&nbsp; ├── index.vue
│&nbsp;&nbsp; ├── login.vue
│&nbsp;&nbsp; ├── main.js
│&nbsp;&nbsp; ├── repository.vue
│&nbsp;&nbsp; ├── router.js <span class="hljs-comment">// 路由配置文件</span>
│&nbsp;&nbsp; └── store
│&nbsp;&nbsp;     ├── store.js  
│&nbsp;&nbsp;     └── types.js  <span class="hljs-comment">// vuex types</span>
└── webpack.config.js</code></pre>
<h3 id="articleHeader3">技术栈</h3>
<ul>
<li><p>Vue 2.0</p></li>
<li><p>vue-router</p></li>
<li><p>vuex</p></li>
<li><p>axios</p></li>
<li><p>vue-material</p></li>
</ul>
<h3 id="articleHeader4">登录拦截逻辑</h3>
<h4>第一步：路由拦截</h4>
<p>首先在定义路由的时候就需要多添加一个自定义字段<code>requireAuth</code>，用于判断该路由的访问是否需要登录。如果用户已经登录，则顺利进入路由，<br>否则就进入登录页面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const routes = [
    {
        path: '/',
        name: '/',
        component: Index
    },
    {
        path: '/repository',
        name: 'repository',
        meta: {
            requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
        component: Repository
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    }
];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> routes = [
    {
        <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">'/'</span>,
        <span class="hljs-attr">component</span>: Index
    },
    {
        <span class="hljs-attr">path</span>: <span class="hljs-string">'/repository'</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">'repository'</span>,
        <span class="hljs-attr">meta</span>: {
            <span class="hljs-attr">requireAuth</span>: <span class="hljs-literal">true</span>,  <span class="hljs-comment">// 添加该字段，表示进入这个路由是需要登录的</span>
        },
        <span class="hljs-attr">component</span>: Repository
    },
    {
        <span class="hljs-attr">path</span>: <span class="hljs-string">'/login'</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">'login'</span>,
        <span class="hljs-attr">component</span>: Login
    }
];</code></pre>
<p>定义完路由后，我们主要是利用<code>vue-router</code>提供的钩子函数<code>beforeEach()</code>对路由进行判断。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
        if (store.state.token) {  // 通过vuex state获取当前的token是否存在
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
        }
    }
    else {
        next();
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">router.beforeEach(<span class="hljs-function">(<span class="hljs-params">to, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (to.meta.requireAuth) {  <span class="hljs-comment">// 判断该路由是否需要登录权限</span>
        <span class="hljs-keyword">if</span> (store.state.token) {  <span class="hljs-comment">// 通过vuex state获取当前的token是否存在</span>
            next();
        }
        <span class="hljs-keyword">else</span> {
            next({
                <span class="hljs-attr">path</span>: <span class="hljs-string">'/login'</span>,
                <span class="hljs-attr">query</span>: {<span class="hljs-attr">redirect</span>: to.fullPath}  <span class="hljs-comment">// 将跳转的路由path作为参数，登录成功后跳转到该路由</span>
            })
        }
    }
    <span class="hljs-keyword">else</span> {
        next();
    }
})</code></pre>
<p>每个钩子方法接收三个参数：</p>
<ul>
<li><p>to: Route: 即将要进入的目标 路由对象</p></li>
<li><p>from: Route: 当前导航正要离开的路由</p></li>
<li>
<p>next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。</p>
<ul>
<li><p>next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed （确认的）。</p></li>
<li><p>next(false): 中断当前的导航。如果浏览器的 URL 改变了（可能是用户手动或者浏览器后退按钮），那么 URL 地址会重置到 from 路由对应的地址。</p></li>
<li><p>next('/') 或者 next({ path: '/' }): 跳转到一个不同的地址。当前的导航被中断，然后进行一个新的导航。</p></li>
</ul>
</li>
</ul>
<p><strong>确保要调用 next 方法，否则钩子就不会被 resolved。</strong></p>
<blockquote><p>完整的方法见<code>/src/router.js</code></p></blockquote>
<p>其中，<code>to.meta</code>中是我们自定义的数据，其中就包括我们刚刚定义的<code>requireAuth</code>字段。通过这个字段来判断该路由是否需要登录权限。需要的话，同时当前应用不存在token，则跳转到登录页面，进行登录。登录成功后跳转到目标路由。</p>
<p>登录拦截到这里就结束了吗？并没有。这种方式只是简单的前端路由控制，并不能真正阻止用户访问需要登录权限的路由。还有一种情况便是：当前token失效了，但是token依然保存在本地。这时候你去访问需要登录权限的路由时，实际上应该让用户重新登录。<br>这时候就需要结合 http 拦截器 + 后端接口返回的http 状态码来判断。</p>
<h4>第二步：拦截器</h4>
<p>要想统一处理所有http请求和响应，就得用上 axios 的拦截器。通过配置<code>http response inteceptor</code>，当后端接口返回<code>401 Unauthorized（未授权）</code>，让用户重新登录。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.state.token) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = `token ${store.state.token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 返回 401 清除token信息并跳转到登录页面
                    store.commit(types.LOGOUT);
                    router.replace({
                        path: 'login',
                        query: {redirect: router.currentRoute.fullPath}
                    })
            }
        }
        return Promise.reject(error.response.data)   // 返回接口返回的错误信息
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// http request 拦截器</span>
axios.interceptors.request.use(
    <span class="hljs-function"><span class="hljs-params">config</span> =&gt;</span> {
        <span class="hljs-keyword">if</span> (store.state.token) {  <span class="hljs-comment">// 判断是否存在token，如果存在的话，则每个http header都加上token</span>
            config.headers.Authorization = <span class="hljs-string">`token <span class="hljs-subst">${store.state.token}</span>`</span>;
        }
        <span class="hljs-keyword">return</span> config;
    },
    err =&gt; {
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(err);
    });

<span class="hljs-comment">// http response 拦截器</span>
axios.interceptors.response.use(
    <span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> response;
    },
    error =&gt; {
        <span class="hljs-keyword">if</span> (error.response) {
            <span class="hljs-keyword">switch</span> (error.response.status) {
                <span class="hljs-keyword">case</span> <span class="hljs-number">401</span>:
                    <span class="hljs-comment">// 返回 401 清除token信息并跳转到登录页面</span>
                    store.commit(types.LOGOUT);
                    router.replace({
                        <span class="hljs-attr">path</span>: <span class="hljs-string">'login'</span>,
                        <span class="hljs-attr">query</span>: {<span class="hljs-attr">redirect</span>: router.currentRoute.fullPath}
                    })
            }
        }
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error.response.data)   <span class="hljs-comment">// 返回接口返回的错误信息</span>
    });</code></pre>
<blockquote><p>完整的方法见<code>/src/http.js</code>.</p></blockquote>
<p>通过上面这两步，就可以在前端实现登录拦截了。<code>登出</code>功能也就很简单，只需要把当前token清除，再跳转到首页即可。</p>
<h2 id="articleHeader5">关于axios</h2>
<p>对于axios，很多刚开始学习vue的人都觉得文档比较难以看懂。我刚开始也是这么觉得的。但通过这么一个项目下来后，发现axios并不难理解。建议在学习axios的时带着下面的目的去看文档会更高效。因为掌握了下面这些内容，基本上就可以无障碍得在项目中使用axios了。</p>
<ul>
<li><p>发起http请求的方法</p></li>
<li><p>http 请求成功时返回的数据及其类型</p></li>
<li><p>http请求失败的处理</p></li>
<li><p>拦截器的使用</p></li>
<li><p>http的配置</p></li>
</ul>
<blockquote><p><a href="https://github.com/mzabriskie/axios" rel="nofollow noreferrer" target="_blank">axios文档</a></p></blockquote>
<h2 id="articleHeader6">运行及构建</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># install dependencies</span>
npm install

<span class="hljs-comment"># serve with hot reload at localhost:8080</span>
npm run dev

<span class="hljs-comment"># build for production with minification</span>
npm run build</code></pre>
<p>项目地址：<a href="https://github.com/superman66/vue-axios-github" rel="nofollow noreferrer" target="_blank">https://github.com/superman66/vue-axios-github</a><br>欢迎star + issues.</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【vue+axios】一个项目学会前端实现登录拦截

## 原文链接
[https://segmentfault.com/a/1190000008383094](https://segmentfault.com/a/1190000008383094)

