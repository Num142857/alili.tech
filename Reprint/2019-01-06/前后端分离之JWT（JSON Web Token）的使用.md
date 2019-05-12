---
title: '前后端分离之JWT（JSON Web Token）的使用' 
date: 2019-01-06 2:30:10
hidden: true
slug: 6w0qvsw4e6e
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>由于自己开发的项目中用到了 JWT 技术，前端采用了 <code>Vue.js</code> 框架，后端采用了 <code>CodeIgniter</code> 框架，故作此文帮助使用相同技术栈的朋友们。</p>
<p>具体思路如下：<br>把后端生成的 JWT token 存入 localStorage，然后前端切换路由（刷新页面）的时候，通过 Ajax 请求的时候带上这个 token，提交给后端判断当前的 token 是否有效，后端返回结果。</p>
<p>JWT 用处很多，可以用于后台权限的限制、接口安全性校验。</p>
<h1 id="articleHeader1">使用教程</h1>
<h2 id="articleHeader2">前端 Vue.js</h2>
<h3 id="articleHeader3">vue-router</h3>
<p>登录时，将后端返回的 <code>token</code> 存入 <code>localStorage</code></p>
<p>使用 <code>Vue-Router</code> 判断是否存在 <code>token</code>，不存在跳转至登录</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// JWT 用户权限校验，判断 TOKEN 是否在 localStorage 当中
router.beforeEach(({name}, from, next) => {
  // 获取 JWT Token
  if (localStorage.getItem('JWT_TOKEN')) {
    // 如果用户在login页面
    if (name === 'login') {
      next('/');
    } else {
      next();
    }
  } else {
    if (name === 'login') {
      next();
    } else {
      next({name: 'login'});
    }
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// JWT 用户权限校验，判断 TOKEN 是否在 localStorage 当中</span>
router.beforeEach(<span class="hljs-function">(<span class="hljs-params">{name}, <span class="hljs-keyword">from</span>, next</span>) =&gt;</span> {
  <span class="hljs-comment">// 获取 JWT Token</span>
  <span class="hljs-keyword">if</span> (localStorage.getItem(<span class="hljs-string">'JWT_TOKEN'</span>)) {
    <span class="hljs-comment">// 如果用户在login页面</span>
    <span class="hljs-keyword">if</span> (name === <span class="hljs-string">'login'</span>) {
      next(<span class="hljs-string">'/'</span>);
    } <span class="hljs-keyword">else</span> {
      next();
    }
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">if</span> (name === <span class="hljs-string">'login'</span>) {
      next();
    } <span class="hljs-keyword">else</span> {
      next({<span class="hljs-attr">name</span>: <span class="hljs-string">'login'</span>});
    }
  }
});</code></pre>
<h3 id="articleHeader4">axios</h3>
<p>axios 全局配置拦截器<br>每次向后端请求携带 头信息</p>
<p>在 <code>src/main.js</code> 当中加上以下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (localStorage.JWT_TOKEN) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
      config.headers.Authorization = `token ${localStorage.JWT_TOKEN}`;
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
      console.log('axios:' + error.response.status);
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          store.commit('LOG_OUT');
          router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.fullPath}
          });
      }
    }
    return Promise.reject(error.response.data);   // 返回接口返回的错误信息
  });

Vue.prototype.$http = axios;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// http request 拦截器</span>
axios.interceptors.request.use(
  <span class="hljs-function"><span class="hljs-params">config</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (localStorage.JWT_TOKEN) {  <span class="hljs-comment">// 判断是否存在token，如果存在的话，则每个http header都加上token</span>
      config.headers.Authorization = <span class="hljs-string">`token <span class="hljs-subst">${localStorage.JWT_TOKEN}</span>`</span>;
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
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'axios:'</span> + error.response.status);
      <span class="hljs-keyword">switch</span> (error.response.status) {
        <span class="hljs-keyword">case</span> <span class="hljs-number">401</span>:
          <span class="hljs-comment">// 返回 401 清除token信息并跳转到登录页面</span>
          store.commit(<span class="hljs-string">'LOG_OUT'</span>);
          router.replace({
            <span class="hljs-attr">path</span>: <span class="hljs-string">'login'</span>,
            <span class="hljs-attr">query</span>: {<span class="hljs-attr">redirect</span>: router.currentRoute.fullPath}
          });
      }
    }
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.reject(error.response.data);   <span class="hljs-comment">// 返回接口返回的错误信息</span>
  });

Vue.prototype.$http = axios;</code></pre>
<h2 id="articleHeader5">后端 CodeIgniter</h2>
<p>后端 Controller 接收请求头信息，验证 token 有效性，无效返回 401 状态码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    $header = $this->input->get_request_header('Authorization', TRUE); // 获取请求头 Authorization
    list($token) = sscanf($header, 'token %s'); // 提取 token
    if ($header != '' &amp;&amp; jwt_helper::validate($token)) {
        $userid = jwt_helper::decode($header)->userId; // 解码token 提取 userId 字段
        // do something
    } else {
        show_error(&quot;Permission denied&quot;, 401, &quot;Please check your token.&quot;); // 401错误
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="php hljs"><code class="php">    $header = <span class="hljs-keyword">$this</span>-&gt;input-&gt;get_request_header(<span class="hljs-string">'Authorization'</span>, <span class="hljs-keyword">TRUE</span>); <span class="hljs-comment">// 获取请求头 Authorization</span>
    <span class="hljs-keyword">list</span>($token) = sscanf($header, <span class="hljs-string">'token %s'</span>); <span class="hljs-comment">// 提取 token</span>
    <span class="hljs-keyword">if</span> ($header != <span class="hljs-string">''</span> &amp;&amp; jwt_helper::validate($token)) {
        $userid = jwt_helper::decode($header)-&gt;userId; <span class="hljs-comment">// 解码token 提取 userId 字段</span>
        <span class="hljs-comment">// do something</span>
    } <span class="hljs-keyword">else</span> {
        show_error(<span class="hljs-string">"Permission denied"</span>, <span class="hljs-number">401</span>, <span class="hljs-string">"Please check your token."</span>); <span class="hljs-comment">// 401错误</span>
    }</code></pre>
<blockquote>这里提供了自己使用的封装好的 JWT Helper 类 和 JWT 的库 使用方法和文件可以访问 Github<br>仓库：<a href="https://github.com/52admln/JWT-CodeIgniter" rel="nofollow noreferrer" target="_blank">https://github.com/52admln/JW...</a>
</blockquote>
<h2 id="articleHeader6">安全性</h2>
<p>可参考文章：<a href="http://www.cnblogs.com/xiekeli/p/5607107.html" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/xiekel...</a> 当中的<code>基于JWT的Token认证的安全问题</code>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前后端分离之JWT（JSON Web Token）的使用

## 原文链接
[https://segmentfault.com/a/1190000010444825](https://segmentfault.com/a/1190000010444825)

