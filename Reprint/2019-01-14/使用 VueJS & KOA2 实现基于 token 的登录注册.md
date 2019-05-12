---
title: '使用 VueJS & KOA2 实现基于 token 的登录注册' 
date: 2019-01-14 2:30:07
hidden: true
slug: t82fbc9iiyi
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">使用 VueJS &amp; NodeJS 实现基于 token 的登录注册</h1>
<h2 id="articleHeader1">前言：</h2>
<p>需要耐心，需要耐心，我在代码写了很多注释，你需要的是耐心阅读。能学到前后端很多东西。</p>
<h2 id="articleHeader2">github</h2>
<p><a href="https://github.com/sinner77/vue-koa2-login" rel="nofollow noreferrer" target="_blank">https://github.com/sinner77/v...</a></p>
<h2 id="articleHeader3">技术栈：</h2>
<ul>
<li><p>vue 2.X</p></li>
<li><p>vuex</p></li>
<li><p>vue-router</p></li>
<li><p>element-ui</p></li>
<li><p>axios</p></li>
<li><p>koa2</p></li>
<li><p>mongoose</p></li>
<li><p>jsonwebtoken</p></li>
</ul>
<h2 id="articleHeader4">功能：</h2>
<p>用户输入网站进入localhost:8000/,由于没有登录直接跳转到/login页面，登录完成后自动跳转到主页并能进行其他操作。（没有登录没办法完成这些操作）</p>
<h2 id="articleHeader5">运行环境：</h2>
<p>由于用的是koa2,所以请在官网下载最新版本,我用的是<strong>7.8.0</strong>版本。建议下载个nvm，它是window下管理node版本的工具，非常好用，只需几个命令就能随时切换node版本<br>项目目录是用vue-cli搭建。然后自己在里面新建了server.js和server文件夹来写后端代码。不能少一步就是在config/index.js配置代理</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="proxyTable: {
      '/api': {
                target: 'http://localhost:8888',
                changeOrigin: true
            }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">proxyTable: {
      <span class="hljs-string">'/api'</span>: {
                <span class="hljs-attr">target</span>: <span class="hljs-string">'http://localhost:8888'</span>,
                <span class="hljs-attr">changeOrigin</span>: <span class="hljs-literal">true</span>
            }
    }</code></pre>
<h2 id="articleHeader6">运行项目</h2>
<p>前提条件：mongodb服务是挂起来的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//第一步
cd vue-koa2-login
//第二步
npm run dev
//第三步:挂起mongodb
mongod --dbpath XXXX(可以随便建个文件夹，这里是该文件夹的地址，将来用来存放数据)
//第三步
node server.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-comment">//第一步</span>
<span class="hljs-keyword">cd</span> vue-koa2-login
<span class="hljs-comment">//第二步</span>
npm <span class="hljs-keyword">run</span> dev
<span class="hljs-comment">//第三步:挂起mongodb</span>
mongod --dbpath XXXX(可以随便建个文件夹，这里是该文件夹的地址，将来用来存放数据)
<span class="hljs-comment">//第三步</span>
node server.js</code></pre>
<h2 id="articleHeader7">关键代码一：</h2>
<p>所有需要登录的路由在配置路由时都需加上：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="meta: {
            requireAuth: true // 添加该字段，表示进入这个路由是需要登录的
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">meta</span>: {
            <span class="hljs-attribute">requireAuth</span>: true // 添加该字段，表示进入这个路由是需要登录的
        }</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//注册全局钩子用来拦截导航
router.beforeEach((to, from, next) => {
  //获取store里面的token
  let token = store.state.token;
  //判断要去的路由有没有requiresAuth
  if(to.meta.requiresAuth){
    if(token){
      next();
    }else{
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      });
    }
  }else{
    next();//如果无需token,那么随它去吧
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-comment">//注册全局钩子用来拦截导航</span>
router.beforeEach((to, <span class="hljs-keyword">from</span>, <span class="hljs-keyword">next</span>) =&gt; {
  <span class="hljs-comment">//获取store里面的token</span>
  let token = store.state.token;
  <span class="hljs-comment">//判断要去的路由有没有requiresAuth</span>
  <span class="hljs-keyword">if</span>(to.meta.requiresAuth){
    <span class="hljs-keyword">if</span>(token){
      <span class="hljs-keyword">next</span>();
    }<span class="hljs-keyword">else</span>{
      <span class="hljs-keyword">next</span>({
        path: <span class="hljs-string">'/login'</span>,
        query: {redirect: to.fullPath}  <span class="hljs-comment">// 将跳转的路由path作为参数，登录成功后跳转到该路由</span>
      });
    }
  }<span class="hljs-keyword">else</span>{
    <span class="hljs-keyword">next</span>();<span class="hljs-comment">//如果无需token,那么随它去吧</span>
  }
});</code></pre>
<h2 id="articleHeader8">关键代码二</h2>
<p>拦截器可以做到统一处理所有利用axios发送的请求</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//request拦截器
instance.interceptors.request.use(
    config => {
        if(store.state.token){
            config.headers.Authorization = `token ${store.state.token}`;
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);
//respone拦截器
instance.interceptors.response.use(
    response => {
        return response;
    },
    error => { //默认除了2XX之外的都是错误的，就会走这里
        if(error.response){
            switch(error.response.status){
                case 401:
                    store.dispatch('UserLogout'); //可能是token失效，清楚它
                    router.replace({ //跳转到登录页面
                        path: 'login',
                        query: { redirect: router.currentRoute.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
                    });
            }
        }
        return Promise.reject(error.response.data);
    }
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">//request拦截器</span>
instance.interceptors.request.use(
    <span class="hljs-function"><span class="hljs-params">config</span> =&gt;</span> {
        <span class="hljs-keyword">if</span>(store.state.token){
            config.headers.Authorization = <span class="hljs-string">`token <span class="hljs-subst">${store.state.token}</span>`</span>;
        }
        <span class="hljs-keyword">return</span> config;
    },
    <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(err);
    }
);
<span class="hljs-comment">//respone拦截器</span>
instance.interceptors.response.use(
    <span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> response;
    },
    <span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> { <span class="hljs-comment">//默认除了2XX之外的都是错误的，就会走这里</span>
        <span class="hljs-keyword">if</span>(error.response){
            <span class="hljs-keyword">switch</span>(error.response.status){
                <span class="hljs-keyword">case</span> <span class="hljs-number">401</span>:
                    store.dispatch(<span class="hljs-string">'UserLogout'</span>); <span class="hljs-comment">//可能是token失效，清楚它</span>
                    router.replace({ <span class="hljs-comment">//跳转到登录页面</span>
                        path: <span class="hljs-string">'login'</span>,
                        query: { redirect: router.currentRoute.fullPath } <span class="hljs-comment">// 将跳转的路由path作为参数，登录成功后跳转到该路由</span>
                    });
            }
        }
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error.response.data);
    }
);</code></pre>
<h2 id="articleHeader9">关于token的存储问题:</h2>
<p>store,localStorage,sessionStorage三者皆可，看需求</p>
<h2 id="articleHeader10">分享阅读的资料及源码：</h2>
<p>资料:<br><a href="https://github.com/chenshenhai/koa2-note" rel="nofollow noreferrer" target="_blank">学习koa2</a><br><a href="http://www.cocoachina.com/webapp/20151020/13824.html" rel="nofollow noreferrer" target="_blank">学习JSON Web Token</a><br><a href="http://blog.leapoahead.com/2015/09/06/understanding-jwt/" rel="nofollow noreferrer" target="_blank">学习JSON Web Token</a><br><a href="http://www.tuicool.com/articles/uuAzAbU" rel="nofollow noreferrer" target="_blank">学习JSON Web Token</a></p>
<p>源码：<br><a href="https://github.com/superman66/vue-axios-github" rel="nofollow noreferrer" target="_blank">一个项目学会前端实现登录拦截</a><br><a href="https://github.com/ykloveyxk/vue-login" rel="nofollow noreferrer" target="_blank">vue-login</a><br>我是结合看这上面两个项目。</p>
<p>代码有什么问题，可以提issue或者加我QQ525136628联系我</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 VueJS & KOA2 实现基于 token 的登录注册

## 原文链接
[https://segmentfault.com/a/1190000009381161](https://segmentfault.com/a/1190000009381161)

