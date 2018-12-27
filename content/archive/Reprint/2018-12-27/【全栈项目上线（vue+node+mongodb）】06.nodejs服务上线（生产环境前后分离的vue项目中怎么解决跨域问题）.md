---
title: '【全栈项目上线（vue+node+mongodb）】06.nodejs服务上线（生产环境前后分离的vue项目中怎么解决跨域问题）' 
date: 2018-12-27 2:30:12
hidden: true
slug: og35hhmvtic
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">以下操作使用下面项目为案例</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="https://github.com/itguide/vnshop" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">https:<span class="hljs-regexp">//gi</span>thub.com<span class="hljs-regexp">/itguide/</span>vnshop</code></pre>
<p>## 启动node服务</p>
<h3 id="articleHeader1">克隆好项目后记得把依赖包安装好</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> i</code></pre>
<h3 id="articleHeader2">使用  node 启动node服务</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd /home/wwwroot/vnshop/server

npm run start
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>cd /home/wwwroot/vnshop/server

npm <span class="hljs-keyword">run</span><span class="bash"> start
</span></code></pre>
<h3 id="articleHeader3">使用pm2方式启动node 服务</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i pm2 -g

cd /home/wwwroot/vnshop/server

pm2 start ./bin/www" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>npm i pm2 -g

cd <span class="hljs-regexp">/home/</span>wwwroot<span class="hljs-regexp">/vnshop/</span>server

pm2 start .<span class="hljs-regexp">/bin/</span>www</code></pre>
<h3 id="articleHeader4">测试</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http://vx.itnote.cn:3000/goods/list?sort=1&amp;priceLevel=all&amp;page=1&amp;pageSize=8" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code style="word-break: break-word; white-space: initial;">http://vx.itnote.<span class="hljs-keyword">cn</span>:<span class="hljs-number">3000</span>/goods/<span class="hljs-keyword">list</span>?<span class="hljs-keyword">sort</span>=<span class="hljs-number">1</span>&amp;priceLevel=<span class="hljs-keyword">all</span>&amp;page=<span class="hljs-number">1</span>&amp;pageSize=<span class="hljs-number">8</span></code></pre>
<blockquote><p>如果返回数据，说明node 启动正常</p></blockquote>
<h2 id="articleHeader5">如果单纯访问3000端口会请求出api数据来</h2>
<h2 id="articleHeader6">但是在vue项目里面请求，会产生跨域</h2>
<p><span class="img-wrap"><img data-src="/img/bVXEQE?w=1271&amp;h=231" src="https://static.alili.tech/img/bVXEQE?w=1271&amp;h=231" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader7">在本地开发解决跨域问题</h3>
<blockquote><p>后端node服务，启动后是3000端口,在前台vue项目中访问，会产生跨域，在本地开发中我们可以配置代理来解决</p></blockquote>
<p>下面这个是详细解决方案<br><a href="https://segmentfault.com/a/1190000011715088">https://segmentfault.com/a/11...</a></p>
<h2 id="articleHeader8">在线上生产环境前后分离的vue项目中怎么解决跨域问题</h2>
<h3 id="articleHeader9">我们在项目中配置好生产环境和开发环境的访问api地址</h3>
<p>在 src/config/api.config.js<br>api.config 配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//判断是开发模式还是本地模式，其实不需要这么麻烦 直接
const isPro = Object.is(process.env.NODE_ENV, 'production')

module.exports = {
    baseUrl: isPro ? 'http://vx.itnote.cn/api/' : 'api/'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-comment">//判断是开发模式还是本地模式，其实不需要这么麻烦 直接</span>
<span class="hljs-keyword">const</span> isPro = Object.is(<span class="hljs-built_in">process</span>.env.NODE_ENV, <span class="hljs-string">'production'</span>)

<span class="hljs-keyword">module</span>.exports = {
    baseUrl: isPro ? <span class="hljs-string">'http://vx.itnote.cn/api/'</span> : <span class="hljs-string">'api/'</span>
}</code></pre>
<p>注意：</p>
<blockquote><p><a href="http://vx.itnote.cn/api/" rel="nofollow noreferrer" target="_blank">http://vx.itnote.cn/api/</a>  这个地址是你自己的服务，能访问的服务<br>每次修改这个配置，需要去编译 npm run build</p></blockquote>
<h3 id="articleHeader10">如果是线上环境  则会访问 <a href="http://vx.itnote.cn/api/" rel="nofollow noreferrer" target="_blank">http://vx.itnote.cn/api/</a>
</h3>
<p><span class="img-wrap"><img data-src="/img/bVXEYe?w=967&amp;h=138" src="https://static.alili.tech/img/bVXEYe?w=967&amp;h=138" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader11">在Nginx配置里面修改添加反向代理</h3>
<blockquote><p>每次vue项目请求以 /api/开头的路由自动转换成 3000端口的服务</p></blockquote>
<p>nginx 配置 修改</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vim vim /usr/local/nginx/conf/vhost/vx.itnote.cn.conf" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">vim</span> <span class="hljs-keyword">vim</span> /usr/local/nginx/<span class="hljs-keyword">conf</span>/vhost/vx.itnote.<span class="hljs-keyword">cn</span>.<span class="hljs-keyword">conf</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    location /api/ {
       proxy_pass http://127.0.0.1:3000/; # 当访问v1的时候默认转发到 3000端口
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>    <span class="hljs-keyword">location</span> <span class="hljs-title">/api</span>/ {
       proxy_pass http://<span class="hljs-number">127.0</span>.<span class="hljs-number">0.1</span>:<span class="hljs-number">3000</span>/; <span class="hljs-comment"># 当访问v1的时候默认转发到 3000端口</span>
    }
</code></pre>
<p>整体nginx 配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="server
    {
        listen 80;
        #listen [::]:80;
        server_name vx.itnote.cn ;
        index index.html index.htm index.php default.html default.htm default.php;
        root  /home/wwwroot/vnshop/client/dist/;

        include none.conf;
        #error_page   404   /404.html;

        # Deny access to PHP files in specific directory
        #location ~ /(wp-content|uploads|wp-includes|images)/.*\.php$ { deny all; }

        include enable-php.conf;

        location ~ .*\.(gif|jpg|jpeg|png|bmp|swf)$
        {
            expires      30d;
        }

        location /api/ {
                proxy_pass http://127.0.0.1:3000/; # 当访问api的时候默认转发到 3000端口
        }

        location ~ .*\.(js|css)?$
        {
            expires      12h;
        }

        location ~ /.well-known {
            allow all;
        }

        location ~ /\.
        {
            deny all;
        }

        access_log  /home/wwwlogs/vx.itnote.cn.log;
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-section">server</span>
    {
        <span class="hljs-attribute">listen</span> <span class="hljs-number">80</span>;
        <span class="hljs-comment">#listen [::]:80;</span>
        <span class="hljs-attribute">server_name</span> vx.itnote.cn ;
        <span class="hljs-attribute">index</span> index.html index.htm index.php default.html default.htm default.php;
        <span class="hljs-attribute">root</span>  /home/wwwroot/vnshop/client/dist/;

        <span class="hljs-attribute">include</span> <span class="hljs-literal">none</span>.conf;
        <span class="hljs-comment">#error_page   404   /404.html;</span>

        <span class="hljs-comment"># Deny access to PHP files in specific directory</span>
        <span class="hljs-comment">#location ~ /(wp-content|uploads|wp-includes|images)/.*\.php$ { deny all; }</span>

        <span class="hljs-attribute">include</span> enable-php.conf;

        <span class="hljs-attribute">location</span> <span class="hljs-regexp">~ .*\.(gif|jpg|jpeg|png|bmp|swf)$</span>
        {
            <span class="hljs-attribute">expires</span>      <span class="hljs-number">30d</span>;
        }

        <span class="hljs-attribute">location</span> /api/ {
                <span class="hljs-attribute">proxy_pass</span> http://127.0.0.1:3000/; <span class="hljs-comment"># 当访问api的时候默认转发到 3000端口</span>
        }

        <span class="hljs-attribute">location</span> <span class="hljs-regexp">~ .*\.(js|css)?$</span>
        {
            <span class="hljs-attribute">expires</span>      <span class="hljs-number">12h</span>;
        }

        <span class="hljs-attribute">location</span> <span class="hljs-regexp">~ /.well-known</span> {
            <span class="hljs-attribute">allow</span> all;
        }

        <span class="hljs-attribute">location</span> <span class="hljs-regexp">~ /\.</span>
        {
            <span class="hljs-attribute">deny</span> all;
        }

        <span class="hljs-attribute">access_log</span>  /home/wwwlogs/vx.itnote.cn.log;
    }
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【全栈项目上线（vue+node+mongodb）】06.nodejs服务上线（生产环境前后分离的vue项目中怎么解决跨域问题）

## 原文链接
[https://segmentfault.com/a/1190000011796903](https://segmentfault.com/a/1190000011796903)

