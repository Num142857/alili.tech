---
title: '【VUE + SPA】接口跨域, 携带cookie 的解决方案' 
date: 2019-01-17 2:30:25
hidden: true
slug: 59860gm2jw
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">背景</h2>
<blockquote><p>由于历史原因，一个站点需要做成完全的<code>SPA</code>应用是非常困难的, 但我们可以在一些比较独立的业务中使用<code>SPA</code>, 每个<code>SPA</code>应用相互独立. 这样在用<code>webpack</code>打包的时候其实是会加快效率，同时不同的业务的依赖也可以不一样, 方便以后维护.</p></blockquote>
<h2 id="articleHeader1">思考</h2>
<p>当我在使用 <code>vue</code> + <code>webpack</code> 开发单页面的时候，主机<code>host</code>是 <code>localhost</code>, 端口是 <code>8080</code>(可自行更改). 但我的本地开发站点 在其它的<code>linux</code> 主机上, 而且使用 <code>nginx</code> 进行了代理. <br>站点里面已经存在了其它业务， 如果我在自己机器上开发，那么如何去调用访问这个站点的接口呢?</p>
<h2 id="articleHeader2">代理转发</h2>
<p>如果你使用的是 <code>vue-cli</code> 进行初始化项目， 比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init webpack new-project" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code class="shell" style="word-break: break-word; white-space: initial;">vue init webpack <span class="hljs-keyword">new</span>-<span class="hljs-keyword">project</span></code></pre>
<p>那么在<code>config/index.js</code> 下可以修改 <code>dev.proxyTable</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="proxyTable: {
  '/api': {
    target: 'http://api.example.com',
    changeOrigin: true,
    onProxyReq (proxyReq, req, res) {
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">proxyTable: {
  <span class="hljs-string">'/api'</span>: {
    <span class="hljs-attr">target</span>: <span class="hljs-string">'http://api.example.com'</span>,
    <span class="hljs-attr">changeOrigin</span>: <span class="hljs-literal">true</span>,
    onProxyReq (proxyReq, req, res) {
    }
  }
}</code></pre>
<p>实际上这是因为脚手架使用了中间件 <a href="https://github.com/chimurai/http-proxy-middleware" rel="nofollow noreferrer" target="_blank">http-proxy-middleware</a></p>
<table>
<thead><tr>
<th align="left">源地址</th>
<th align="left">转发地址</th>
</tr></thead>
<tbody>
<tr>
<td align="left">localhost:8080/api</td>
<td align="left">api.example.com/api</td>
</tr>
<tr>
<td align="left">localhost:8080/api/notifications</td>
<td align="left">api.example.com/api/notifications</td>
</tr>
</tbody>
</table>
<p><strong> 如果我们要去掉 api.example.com的api路径？</strong></p>
<h3 id="articleHeader3">设置 <code>pathRewrite</code>
</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="proxyTable: {
  '/api': {
    target: 'http://api.example.com',
    changeOrigin: true,
    pathRewrite: '^/api' : '',
    onProxyReq (proxyReq, req, res) {
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">proxyTable: {
  <span class="hljs-string">'/api'</span>: {
    <span class="hljs-attr">target</span>: <span class="hljs-string">'http://api.example.com'</span>,
    <span class="hljs-attr">changeOrigin</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">pathRewrite</span>: <span class="hljs-string">'^/api'</span> : <span class="hljs-string">''</span>,
    onProxyReq (proxyReq, req, res) {
    }
  }
}</code></pre>
<table>
<thead><tr>
<th align="left">源地址</th>
<th align="left">转发地址</th>
</tr></thead>
<tbody>
<tr>
<td align="left">localhost:8080/api</td>
<td align="left">api.example.com</td>
</tr>
<tr>
<td align="left">localhost:8080/api/notifications</td>
<td align="left">api.example.com/notifications</td>
</tr>
</tbody>
</table>
<p>代理的好处:</p>
<ol><li><p>解决开发时跨域问题</p></li></ol>
<p>代理的问题：</p>
<ol><li><p>代码需要设置环境变量，<code>prod</code>环境下不存在 <code>http-proxy-middleware</code> 中间件</p></li></ol>
<h2 id="articleHeader4">携带Cookie</h2>
<p>如果我想拥有 <code>www.example.com</code> 或 <code>*.example.com</code> 下的 <code>cookie</code> 进行模拟请求.</p>
<table>
<thead><tr>
<th align="left">本地host</th>
<th align="left">线下域名</th>
</tr></thead>
<tbody><tr>
<td align="left">localhost:8080</td>
<td align="left">www.example.com</td>
</tr></tbody>
</table>
<p>可以利用 <code>nginx + host</code> 进行转发配置<br>本地配置 <code>host</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="127.0.0.1 www.example.com" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;">127<span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1</span> <span class="hljs-selector-tag">www</span><span class="hljs-selector-class">.example</span><span class="hljs-selector-class">.com</span></code></pre>
<p>配置 <code>linux</code> 机器的 <code>nginx.conf</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http: {
    server： {
        listen 80;  
        server_name www.example.com;
        location / {
        }
        location /project_name { # 指定发布时的路径, 如 /profile
           proxy_pass http://xxx.xxx.xxx.xxx:8080; # 你的主机IP
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>http: {
    server： {
        listen <span class="hljs-number">80</span>;  
        server_name www.example.com;
        location / {
        }
        location /project_name { # 指定发布时的路径, 如 /profile
           proxy_pass http://xxx.xxx.xxx.xxx:<span class="hljs-number">8080</span>; # 你的主机IP
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        }
    }
}</code></pre>
<p>只要你访问 <code>www.example.com/profile</code> 就能访问到 你正在开发的<code>SPA</code> 应用了</p>
<p>虽然这样能够解决问题，不过这样就会带来 nginx 的配置, 然而这在上线的时候又不是必备的.</p>
<p>虽然我用过 <code>fiddler4</code>, 但我发现了一个更简单的配置工具，叫做 <code>whistle</code>. 具体使用可以在github官网去搜索学习.</p>
<p><code>whistle</code> 是由nodejs开发的工具，他能做的东西有很多，可以查看报文，注入代码。自带了<code>weinre</code> 调试工具, 再配合<code>whistle</code> 的 chrome 插件. 就可以很快的进行配置host, 以及基本的代理了.</p>
<h3 id="articleHeader5">安装 whistle</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g whistle
whistle.cmd" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code>npm <span class="hljs-keyword">install</span> -g whistle
whistle.cmd</code></pre>
<p>他会启动一个端口，访问站点。然后配置 <code>rules</code></p>
<p><span class="img-wrap"><img data-src="/img/bVLsya?w=506&amp;h=61" src="https://static.alili.tech/img/bVLsya?w=506&amp;h=61" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>我们就可以通过访问 <code>www.example.com/profile</code> 进行访问我们的单页面应用了, 这样请求就能携带我们<code>www.example.com</code> 下面的<code>cookie</code>了</p>
<h2 id="articleHeader6">小结</h2>
<p>以上是个人的开发经验， 如果你有更好的解决方案。欢迎提出来一起讨论一下!!</p>
<h2 id="articleHeader7">相关项目及地址</h2>
<ul>
<li><p><a href="https://github.com/vuejs/vue" rel="nofollow noreferrer" target="_blank">vue</a></p></li>
<li><p><a href="https://github.com/webpack/webpack" rel="nofollow noreferrer" target="_blank">webpack</a></p></li>
<li><p><a href="https://github.com/vuejs/vue-cli" rel="nofollow noreferrer" target="_blank">vue-cli</a></p></li>
<li><p><a href="https://github.com/vuejs-templates/webpack" rel="nofollow noreferrer" target="_blank">vuejs-templates/webpack</a></p></li>
<li><p><a href="https://github.com/avwo/whistle" rel="nofollow noreferrer" target="_blank">whistle</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【VUE + SPA】接口跨域, 携带cookie 的解决方案

## 原文链接
[https://segmentfault.com/a/1190000008888874](https://segmentfault.com/a/1190000008888874)

