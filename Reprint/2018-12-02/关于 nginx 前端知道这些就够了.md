---
title: '关于 nginx 前端知道这些就够了' 
date: 2018-12-02 2:30:15
hidden: true
slug: yyo5n0l0hk
categories: [reprint]
---

{{< raw >}}

                    
<p>我备案了个域名，买了一个阿里云服务器，想要搭建几个自己的网站，难免要接触 <a href="https://baike.baidu.com/item/nginx/3817705" rel="nofollow noreferrer" target="_blank">nginx</a>。</p>
<p>那么我用 nginx 来干嘛呢：</p>
<ol>
<li>静态资源反向代理</li>
<li>将域名泛解析到服务器之后，通过 nginx 来给不同的二级域名分配服务器上的程序。</li>
</ol>
<h1 id="articleHeader0">1、安装 nginx</h1>
<h2 id="articleHeader1">1.1、centos7</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yum install -y nginx
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code>yum <span class="hljs-keyword">install</span> -y nginx
</code></pre>
<h2 id="articleHeader2">1.2、windows</h2>
<p>到官网下载，安装包，解压即可使用：<a href="http://nginx.org/en/download.html" rel="nofollow noreferrer" target="_blank">官网</a></p>
<h2 id="articleHeader3">1.3、centos7 中 nginx 常用命令</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 开机启动
systemctl enable nginx.service

# 启动
systemctl start nginx.service

# 使用某个配置文件启动（要先关闭 ngxin，不然会报错的）
nginx -c /etc/nginx/nginx.conf

# 关闭（如果这样关闭不了的话，就把 nginx 进程给杀掉）
nginx -s stop

# 查看 nginx 的进程 id
ps -ef | grep nginx

# 杀死进程（比如杀死进程1234）
kill -9 1234" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vala"><code><span class="hljs-meta"># 开机启动</span>
systemctl enable nginx.service

<span class="hljs-meta"># 启动</span>
systemctl start nginx.service

<span class="hljs-meta"># 使用某个配置文件启动（要先关闭 ngxin，不然会报错的）</span>
nginx -c /etc/nginx/nginx.conf

<span class="hljs-meta"># 关闭（如果这样关闭不了的话，就把 nginx 进程给杀掉）</span>
nginx -s stop

<span class="hljs-meta"># 查看 nginx 的进程 id</span>
ps -ef | grep nginx

<span class="hljs-meta"># 杀死进程（比如杀死进程1234）</span>
kill <span class="hljs-number">-9</span> <span class="hljs-number">1234</span></code></pre>
<p>nginx 的默认配置文件是：<code>/etc/nginx/nginx.conf</code></p>
<p>这个配置文件会自动读取：<code>/etc/nginx/conf.d/</code> 文件夹下的所有 <code>.conf</code> 文件。</p>
<p>假如你写了个网站，需要用到 nginx ，那么你就把配置文件丢到 <code>/etc/nginx/conf.d/</code> 文件夹下，然后重启 nginx 就行了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="nginx -s stop
nginx -c /etc/nginx/nginx.conf" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>nginx -s <span class="hljs-keyword">stop</span>
nginx -<span class="hljs-keyword">c</span> /etc/nginx/nginx.<span class="hljs-keyword">conf</span></code></pre>
<h1 id="articleHeader4">2、nginx 配置（反向代理设置 &amp; 二级域名）</h1>
<h2 id="articleHeader5">2.1 配置文件</h2>
<p>假设我们有两个网站：<br><code>www.example.com</code><br><code>blog.example.com</code></p>
<p>它们分别有两个 ngxin 配置文件放在：<br><code>/home/www.example.com/www.example.com.nginx.conf</code><br><code>/home/blog.example.com/blog.example.com.nginx.conf</code></p>
<p>服务器对外开放 80 端口，两个网站对应的程序端口分别为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="www.example.com 程序 8000
www.example.com 静态资源 8080

blog.example.com 程序 8001
blog.example.com 静态资源 8081" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>www<span class="hljs-selector-class">.example</span><span class="hljs-selector-class">.com</span> 程序 <span class="hljs-number">8000</span>
www<span class="hljs-selector-class">.example</span><span class="hljs-selector-class">.com</span> 静态资源 <span class="hljs-number">8080</span>

blog<span class="hljs-selector-class">.example</span><span class="hljs-selector-class">.com</span> 程序 <span class="hljs-number">8001</span>
blog<span class="hljs-selector-class">.example</span><span class="hljs-selector-class">.com</span> 静态资源 <span class="hljs-number">8081</span></code></pre>
<p>那么他们的配置内容分别为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# /home/www.example.com/www.example.com.nginx.conf
server {
    # 服务器对外只监听 80 端口
    listen 80;
    # 当 80 端口监听到了来自 www.example.com 的请求
    server_name www.example.com;
    # 那么把这个请求转到 http://localhost:8080
    location / {
        proxy_pass http://localhost:8080;
    }
}
server {
    # 监听到 8080 端口有人发起请求（其实就是上面转过来的↑，用户不能直接访问 8080 端口的）
    listen 8080;
    # 只允许本机访问
    server_name localhost;
    # 程序根目录
    root /home/www.example.com;
    # 默认的网页文件
    index index.html index.htm;
    # 匹配所有 uri （如果 url 为：http://www.example.com/hehe，那么 uri 为：/hehe）
    location / {
        # 我们的程序实际上是在 8000 端口上
        proxy_pass http://localhost:8000$request_uri;

        # 下面这一大堆，欲知详情自己查
        proxy_redirect     off;
        proxy_set_header   Host             $host;
        proxy_set_header   X-Real-IP        $remote_addr;
        proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
        proxy_max_temp_file_size 0;
        proxy_connect_timeout      90;
        proxy_send_timeout         90;
        proxy_read_timeout         90;
        proxy_buffer_size          4k;
        proxy_buffers              4 32k;
        proxy_busy_buffers_size    64k;
        proxy_temp_file_write_size 64k;
    }
    # 匹配首页
    location = / {
        proxy_pass http://localhost:8000;
    }
    # 匹配 /**.** 结尾的 uri，并且不是 /**.html、/**.htm
    location ~* ^.+\/[^\/]+(?=\.)([^\/](?!(html|htm)))+$ {
      # 匹配到的都定位到静态资源目录里
      root /home/www.example.com/static;
      etag         on;
      expires      max;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-comment"># /home/www.example.com/www.example.com.nginx.conf</span>
<span class="hljs-section">server</span> {
    <span class="hljs-comment"># 服务器对外只监听 80 端口</span>
    <span class="hljs-attribute">listen</span> <span class="hljs-number">80</span>;
    <span class="hljs-comment"># 当 80 端口监听到了来自 www.example.com 的请求</span>
    <span class="hljs-attribute">server_name</span> www.example.com;
    <span class="hljs-comment"># 那么把这个请求转到 http://localhost:8080</span>
    <span class="hljs-attribute">location</span> / {
        <span class="hljs-attribute">proxy_pass</span> http://localhost:8080;
    }
}
<span class="hljs-section">server</span> {
    <span class="hljs-comment"># 监听到 8080 端口有人发起请求（其实就是上面转过来的↑，用户不能直接访问 8080 端口的）</span>
    <span class="hljs-attribute">listen</span> <span class="hljs-number">8080</span>;
    <span class="hljs-comment"># 只允许本机访问</span>
    <span class="hljs-attribute">server_name</span> localhost;
    <span class="hljs-comment"># 程序根目录</span>
    <span class="hljs-attribute">root</span> /home/www.example.com;
    <span class="hljs-comment"># 默认的网页文件</span>
    <span class="hljs-attribute">index</span> index.html index.htm;
    <span class="hljs-comment"># 匹配所有 uri （如果 url 为：http://www.example.com/hehe，那么 uri 为：/hehe）</span>
    <span class="hljs-attribute">location</span> / {
        <span class="hljs-comment"># 我们的程序实际上是在 8000 端口上</span>
        <span class="hljs-attribute">proxy_pass</span> http://localhost:8000<span class="hljs-variable">$request_uri</span>;

        <span class="hljs-comment"># 下面这一大堆，欲知详情自己查</span>
        <span class="hljs-attribute">proxy_redirect</span>     <span class="hljs-literal">off</span>;
        <span class="hljs-attribute">proxy_set_header</span>   Host             <span class="hljs-variable">$host</span>;
        <span class="hljs-attribute">proxy_set_header</span>   X-Real-IP        <span class="hljs-variable">$remote_addr</span>;
        <span class="hljs-attribute">proxy_set_header</span>   X-Forwarded-For  <span class="hljs-variable">$proxy_add_x_forwarded_for</span>;
        <span class="hljs-attribute">proxy_next_upstream</span> <span class="hljs-literal">error</span> timeout invalid_header http_500 http_502 http_503 http_504;
        <span class="hljs-attribute">proxy_max_temp_file_size</span> <span class="hljs-number">0</span>;
        <span class="hljs-attribute">proxy_connect_timeout</span>      <span class="hljs-number">90</span>;
        <span class="hljs-attribute">proxy_send_timeout</span>         <span class="hljs-number">90</span>;
        <span class="hljs-attribute">proxy_read_timeout</span>         <span class="hljs-number">90</span>;
        <span class="hljs-attribute">proxy_buffer_size</span>          <span class="hljs-number">4k</span>;
        <span class="hljs-attribute">proxy_buffers</span>              <span class="hljs-number">4</span> <span class="hljs-number">32k</span>;
        <span class="hljs-attribute">proxy_busy_buffers_size</span>    <span class="hljs-number">64k</span>;
        <span class="hljs-attribute">proxy_temp_file_write_size</span> <span class="hljs-number">64k</span>;
    }
    <span class="hljs-comment"># 匹配首页</span>
    <span class="hljs-attribute">location</span> = / {
        <span class="hljs-attribute">proxy_pass</span> http://localhost:8000;
    }
    <span class="hljs-comment"># 匹配 /**.** 结尾的 uri，并且不是 /**.html、/**.htm</span>
    <span class="hljs-attribute">location</span> <span class="hljs-regexp">~* ^.+\/[^\/]+(?=\.)([^\/](?!(html|htm)))+$</span> {
      <span class="hljs-comment"># 匹配到的都定位到静态资源目录里</span>
      <span class="hljs-attribute">root</span> /home/www.example.com/static;
      <span class="hljs-attribute">etag</span>         <span class="hljs-literal">on</span>;
      <span class="hljs-attribute">expires</span>      max;
    }
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# /home/blog.example.com/blog.example.com.nginx.conf
server {
    # 服务器对外只监听 80 端口
    listen 80;
    # 当 80 端口监听到了来自 blog.example.com 的请求
    server_name blog.example.com;
    # 那么把这个请求转到 http://localhost:8081
    location / {
        proxy_pass http://localhost:8081;
    }
}
server {
    # 监听到 8081 端口有人发起请求（其实就是上面转过来的↑，用户不能直接访问 8081 端口的）
    listen 8081;
    # 只允许本机访问
    server_name localhost;
    # 程序根目录
    root /home/blog.example.com;
    # 默认的网页文件
    index index.html index.htm;
    # 匹配所有 uri （如果 url 为：http://blog.example.com/hehe，那么 uri 为：/hehe）
    location / {
        # 我们的程序实际上是在 8001 端口上
        proxy_pass http://localhost:8001$request_uri;

        # 下面这一大堆，欲知详情自己查
        proxy_redirect     off;
        proxy_set_header   Host             $host;
        proxy_set_header   X-Real-IP        $remote_addr;
        proxy_set_header   X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_next_upstream error timeout invalid_header http_500 http_502 http_503 http_504;
        proxy_max_temp_file_size 0;
        proxy_connect_timeout      90;
        proxy_send_timeout         90;
        proxy_read_timeout         90;
        proxy_buffer_size          4k;
        proxy_buffers              4 32k;
        proxy_busy_buffers_size    64k;
        proxy_temp_file_write_size 64k;
    }
    # 匹配首页
    location = / {
        proxy_pass http://localhost:8001;
    }
    # 匹配 /**.** 结尾的 uri，并且不是 /**.html、/**.htm
    location ~* ^.+\/[^\/]+(?=\.)([^\/](?!(html|htm)))+$ {
      # 匹配到的都定位到静态资源目录里
      root /home/blog.example.com/static;
      etag         on;
      expires      max;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-comment"># /home/blog.example.com/blog.example.com.nginx.conf</span>
<span class="hljs-section">server</span> {
    <span class="hljs-comment"># 服务器对外只监听 80 端口</span>
    <span class="hljs-attribute">listen</span> <span class="hljs-number">80</span>;
    <span class="hljs-comment"># 当 80 端口监听到了来自 blog.example.com 的请求</span>
    <span class="hljs-attribute">server_name</span> blog.example.com;
    <span class="hljs-comment"># 那么把这个请求转到 http://localhost:8081</span>
    <span class="hljs-attribute">location</span> / {
        <span class="hljs-attribute">proxy_pass</span> http://localhost:8081;
    }
}
<span class="hljs-section">server</span> {
    <span class="hljs-comment"># 监听到 8081 端口有人发起请求（其实就是上面转过来的↑，用户不能直接访问 8081 端口的）</span>
    <span class="hljs-attribute">listen</span> <span class="hljs-number">8081</span>;
    <span class="hljs-comment"># 只允许本机访问</span>
    <span class="hljs-attribute">server_name</span> localhost;
    <span class="hljs-comment"># 程序根目录</span>
    <span class="hljs-attribute">root</span> /home/blog.example.com;
    <span class="hljs-comment"># 默认的网页文件</span>
    <span class="hljs-attribute">index</span> index.html index.htm;
    <span class="hljs-comment"># 匹配所有 uri （如果 url 为：http://blog.example.com/hehe，那么 uri 为：/hehe）</span>
    <span class="hljs-attribute">location</span> / {
        <span class="hljs-comment"># 我们的程序实际上是在 8001 端口上</span>
        <span class="hljs-attribute">proxy_pass</span> http://localhost:8001<span class="hljs-variable">$request_uri</span>;

        <span class="hljs-comment"># 下面这一大堆，欲知详情自己查</span>
        <span class="hljs-attribute">proxy_redirect</span>     <span class="hljs-literal">off</span>;
        <span class="hljs-attribute">proxy_set_header</span>   Host             <span class="hljs-variable">$host</span>;
        <span class="hljs-attribute">proxy_set_header</span>   X-Real-IP        <span class="hljs-variable">$remote_addr</span>;
        <span class="hljs-attribute">proxy_set_header</span>   X-Forwarded-For  <span class="hljs-variable">$proxy_add_x_forwarded_for</span>;
        <span class="hljs-attribute">proxy_next_upstream</span> <span class="hljs-literal">error</span> timeout invalid_header http_500 http_502 http_503 http_504;
        <span class="hljs-attribute">proxy_max_temp_file_size</span> <span class="hljs-number">0</span>;
        <span class="hljs-attribute">proxy_connect_timeout</span>      <span class="hljs-number">90</span>;
        <span class="hljs-attribute">proxy_send_timeout</span>         <span class="hljs-number">90</span>;
        <span class="hljs-attribute">proxy_read_timeout</span>         <span class="hljs-number">90</span>;
        <span class="hljs-attribute">proxy_buffer_size</span>          <span class="hljs-number">4k</span>;
        <span class="hljs-attribute">proxy_buffers</span>              <span class="hljs-number">4</span> <span class="hljs-number">32k</span>;
        <span class="hljs-attribute">proxy_busy_buffers_size</span>    <span class="hljs-number">64k</span>;
        <span class="hljs-attribute">proxy_temp_file_write_size</span> <span class="hljs-number">64k</span>;
    }
    <span class="hljs-comment"># 匹配首页</span>
    <span class="hljs-attribute">location</span> = / {
        <span class="hljs-attribute">proxy_pass</span> http://localhost:8001;
    }
    <span class="hljs-comment"># 匹配 /**.** 结尾的 uri，并且不是 /**.html、/**.htm</span>
    <span class="hljs-attribute">location</span> <span class="hljs-regexp">~* ^.+\/[^\/]+(?=\.)([^\/](?!(html|htm)))+$</span> {
      <span class="hljs-comment"># 匹配到的都定位到静态资源目录里</span>
      <span class="hljs-attribute">root</span> /home/blog.example.com/static;
      <span class="hljs-attribute">etag</span>         <span class="hljs-literal">on</span>;
      <span class="hljs-attribute">expires</span>      max;
    }
}</code></pre>
<p>注意看两个配置的区别。</p>
<h2 id="articleHeader6">2.2 创建软链接</h2>
<p>假如我们每个网站程序放在一个文件夹里，该程序的 nginx 配置文件也应该放在这个文件夹里才方便管理。但前面提到，我们需要把配置文件丢到 <code>/etc/nginx/conf.d/</code> 文件夹下，怎样才能使这个配置文件既在程序文件夹下，又在 <code>/etc/nginx/conf.d/</code>文件夹下呢？</p>
<p>假如我们在程序文件夹下有一个 ngxin 配置文件：<code>/home/www.example.com/www.example.com.nginx.conf</code></p>
<p>我们需要给这个文件创建一个软链接到 <code>/etc/nginx/conf.d/</code> 下：</p>
<p><code>ln -s /home/example/example.nginx.conf /etc/nginx/conf.d/www.example.com.nginx.conf</code></p>
<p>这样操作之后，当我们改程序文件夹下的配置文件，<code>/etc/nginx/conf.d/</code> 下与之对应的配置文件也会被修改，修改后重启 nginx 就能够使新的 ngxin 配置生效了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于 nginx 前端知道这些就够了

## 原文链接
[https://segmentfault.com/a/1190000014740383](https://segmentfault.com/a/1190000014740383)

