---
title: '关于vue-cli的线上部署 run build' 
date: 2019-02-03 2:30:39
hidden: true
slug: 8kobblu0nep
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">发布服务器</h1>
<p>进入项目所在目录运行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> build</span></code></pre>
<h1 id="articleHeader1">修改build生成的静态文件路径</h1>
<p>进入<code>~\config\index.js</code><br>在<code>build</code>下的<code>assetsPublicPath</code>默认情况下是<code>'/'</code>，此时打包的index.html文件中的资源文件(js、css、img)默认情况都是以<code>/</code>开头的绝对路径，指向http服务器的根路径<br>如果想修改为相对路径则需要将<code>assetsPublicPath</code>的值修改为<code>'./'</code>，这样就是指向index.html的相对路径了</p>
<h1 id="articleHeader2">部署SPA</h1>
<blockquote><p>将打包生成好的项目部署到服务器，但是访问SPA项目的前端路由会出现<code>404</code>，这是由于HTTP服务器默认情况下访问的是对应目录下的index.html，此时需要对HTTP服务器做下路由映射，将前端路由地址映射到index.html。</p></blockquote>
<p>以下是SPA项目常用的几种部署方式:<br><em>例如前端路由地址:<a href="http://localhost/live/292/wonderful" rel="nofollow noreferrer" target="_blank">http://localhost/live/292/wonderful</a></em></p>
<h2 id="articleHeader3">Apache</h2>
<p>如果只使用Apache做HTTP服务器，可以设置Apache的url重定向，将所有的请求路由到index.html</p>
<ol>
<li><p>打开<code>~\Apache\conf\httpd.conf</code>文件</p></li>
<li><p>去除httpd.conf文件中<code>LoadModule rewrite_module modules/mod_rewrite.so</code>前面的<code>#</code>号</p></li>
<li><p>在httpd.conf文件中添加重定向规则</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="RewriteEngine on 
# 当访问路由地址为 /live 开头的，则将路由重定向到 /index.html
RewriteRule \/live.*$ /index.html" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code><span class="hljs-attribute"><span class="hljs-nomarkup">RewriteEngine</span></span> <span class="hljs-literal">on</span> 
<span class="hljs-comment"># 当访问路由地址为 /live 开头的，则将路由重定向到 /index.html</span>
<span class="hljs-attribute"><span class="hljs-nomarkup">RewriteRule</span></span> \/live.*$ /index.html</code></pre>
<h2 id="articleHeader4">nginx</h2>
<p>使用nginx做反向代理服务器，配置文件参考：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="server {
    listen 80;
    server_name localhost:80;
    index  index.html;
    root /wwwroot/;
    location / {
        try_files $uri $uri/ /index.html;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-section">server</span> {
    <span class="hljs-attribute">listen</span> <span class="hljs-number">80</span>;
    <span class="hljs-attribute">server_name</span> localhost:<span class="hljs-number">80</span>;
    <span class="hljs-attribute">index</span>  index.html;
    <span class="hljs-attribute">root</span> /wwwroot/;
    <span class="hljs-attribute">location</span> / {
        <span class="hljs-attribute">try_files</span> <span class="hljs-variable">$uri</span> <span class="hljs-variable">$uri</span>/ /index.html;
    }
}</code></pre>
<h2 id="articleHeader5">node.js</h2>
<p>使用node.js做反向代理服务器，配置文件参考：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var config = require(&quot;./webpack.config.js&quot;);
var webpack = require(&quot;webpack&quot;)
var webpackDevServer=require(&quot;webpack-dev-server&quot;)

config.entry.unshift(&quot;webpack-dev-server/client?http://localhost:80&quot;, &quot;webpack/hot/dev-server&quot;);
var compiler = webpack(config);

var server = new webpackDevServer(compiler, {
  contentBase: &quot;build&quot;,
  hot: true,
  inline: true,
  historyApiFallback: true,
  proxy: {
        '/*': {
            target: 'loaclhost:8080/',
            secure: false
        },
    }
});

server.listen(80);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-built_in">var</span> config = <span class="hljs-keyword">require</span>(<span class="hljs-string">"./webpack.config.js"</span>);
<span class="hljs-built_in">var</span> webpack = <span class="hljs-keyword">require</span>(<span class="hljs-string">"webpack"</span>)
<span class="hljs-built_in">var</span> webpackDevServer=<span class="hljs-keyword">require</span>(<span class="hljs-string">"webpack-dev-server"</span>)

config.entry.unshift(<span class="hljs-string">"webpack-dev-server/client?http://localhost:80"</span>, <span class="hljs-string">"webpack/hot/dev-server"</span>);
<span class="hljs-built_in">var</span> compiler = webpack(config);

<span class="hljs-built_in">var</span> server = <span class="hljs-literal">new</span> webpackDevServer(compiler, {
  contentBase: <span class="hljs-string">"build"</span>,
  hot: <span class="hljs-literal">true</span>,
  <span class="hljs-keyword">inline</span>: <span class="hljs-literal">true</span>,
  historyApiFallback: <span class="hljs-literal">true</span>,
  proxy: {
        <span class="hljs-string">'/*'</span>: {
            target: <span class="hljs-string">'loaclhost:8080/'</span>,
            secure: <span class="hljs-literal">false</span>
        },
    }
});

server.listen(<span class="hljs-number">80</span>);</code></pre>
<h1 id="articleHeader6">参考</h1>
<ul>
<li><p><a href="http://forum.vuejs.org/topic/215/vue-router" rel="nofollow noreferrer" target="_blank">Vue-router子页面刷新404</a></p></li>
<li><p><a href="http://www.jb51.net/article/24435.htm" rel="nofollow noreferrer" target="_blank">Apache Rewrite url重定向功能的简单配置</a></p></li>
<li><p><a href="https://segmentfault.com/q/1010000006757292">webpack构建的项目的部署问题</a></p></li>
<li><p><a href="http://www.jianshu.com/p/32259952a5a8" rel="nofollow noreferrer" target="_blank">vue实现spa实例讲解：前后分离</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于vue-cli的线上部署 run build

## 原文链接
[https://segmentfault.com/a/1190000007020948](https://segmentfault.com/a/1190000007020948)

