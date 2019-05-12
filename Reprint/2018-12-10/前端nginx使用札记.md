---
title: '前端nginx使用札记' 
date: 2018-12-10 2:30:07
hidden: true
slug: mfdtjiszhoh
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">nginx是什么？</h2>
<p>nginx是俄罗斯人 Igor Sysoev为俄罗斯访问量第二的Rambler.ru站点开发的一个十分轻量级的HTTP服务器。它是一个高性能的HTTP和反向代理服务器，同时也可以作为IMAP/POP3/SMTP的代理服务器。nginx使用的是BSD许可。</p>
<p>Nginx 以事件驱动的方式编写，所以有非常好的性能，同时也是一个非常高效的反向代理、负载平衡。</p>
<p>Nginx 因为它的稳定性、丰富的模块库、灵活的配置和低系统资源的消耗而闻名。</p>
<p>nginx适合用来做mongrel clusters 的前端 HTTP 响应。</p>
<h2 id="articleHeader1">为什么要用nginx，nginx有什么特点？</h2>
<p><a href="https://www.ctolib.com/topics-101000.html" rel="nofollow noreferrer" target="_blank">nginx的特点</a>：</p>
<ul>
<li>核心特点：高并发请求的同时保持高效的服务</li>
<li>热部署</li>
<li>低内存消耗</li>
<li>处理响应请求很快</li>
<li>具有很高的可靠性</li>
</ul>
<p>同时，nginx也可以实现高效的反向代理、负载均衡。</p>
<p>前端可以用nginx做些什么？</p>
<ul>
<li>搭建静态资源服务器</li>
<li>反向代理分发后端服务（可以和nodejs搭配实现前后端分离）和跨域问题</li>
<li>根据User Agent来重定向站点</li>
<li>开发环境或测试环境切换（切换host）</li>
<li>url重写，使用rewrie规则本地映射</li>
<li>资源内容篡改</li>
<li>获取cookie做分流</li>
<li>资源合并</li>
<li>gzip压缩</li>
<li>压缩图片</li>
<li>sourceMap调试</li>
</ul>
<h2 id="articleHeader2">如何安装nginx？</h2>
<h3 id="articleHeader3">mac安装：</h3>
<p>安装<a href="https://brew.sh/" rel="nofollow noreferrer" target="_blank">brew</a>之后，执行命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ sudo brew install nginx" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ sudo brew install nginx</code></pre>
<h3 id="articleHeader4">windows安装</h3>
<p>1.下载： <a href="http://nginx.org" rel="nofollow noreferrer" target="_blank">nginx官网</a></p>
<ol>
<li>解压运行：解压至<code>c:\nginx</code>，运行<code>nginx.exe</code>(即<code>nginx -c conf\nginx.conf</code>)，默认使用80端口，日志见文件夹<code>C:\nginx\logs</code>
</li>
<li>关闭：<code>nginx -s stop</code> 或<code>taskkill /F /IM nginx.exe &gt; nul</code>
</li>
</ol>
<p><em>【注意】以下皆以mac为例。</em></p>
<h2 id="articleHeader5">nginx如何启动、重启、关闭？</h2>
<p>查看nginx版本：<code>nginx -v</code></p>
<p>启动nginx服务：<br>方法一：运行命令：<code>sudo brew services start nginx</code><br>方法二：运行命令：<code>nginx</code><br>访问<a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:8080<br>出现如下界面则表示安装成功：<br><span class="img-wrap"><img data-src="/img/remote/1460000013781167?w=1240&amp;h=419" src="https://static.alili.tech/img/remote/1460000013781167?w=1240&amp;h=419" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>关闭nginx服务：<br>方法一：运行命令：<code> sudo brew services stop nginx</code><br>方法二：运行命令： <code>nginx -s stop</code><br>方法三：<br>运行命令：<code>ps -ef | grep nginx</code>，找到master对应的进程号。<br>快速停止：<code>kill -TERM nginx进程号</code>或<code>kill -INT nginx进程号</code><br>从容停止： <code>kill -QUIT nginx进程号</code><br>强制停止所有nginx进程：<code>pkill -9 nginx</code></p>
<p>重启nginx服务：<br>方法一：<code>nginx -s reload</code><br>方法二： 平滑重启命令： <code>kill -HUP nginx进程号</code></p>
<p>nginx信号控制：</p>
<ul>
<li>
<code>TERM,INT</code> 快速关闭</li>
<li>
<code>QUIT</code> 从容关闭</li>
<li>
<code>HUP</code> 平滑重启，重新加载配置文件</li>
<li>
<code>USR1</code> 重新打开日志文件，在切割日志时用途较大</li>
<li>
<code>USR2</code> 平滑升级可执行程序</li>
<li>
<code>WINCH</code> 从容关闭工作进程</li>
</ul>
<h2 id="articleHeader6">如何查看nginx的配置文件nginx.conf的路径和安装路径？</h2>
<p>查看配置文件位置和测试配置文件语法：运行命令<code>nginx -t</code>:<br><span class="img-wrap"><img data-src="/img/remote/1460000013781168?w=1104&amp;h=108" src="https://static.alili.tech/img/remote/1460000013781168?w=1104&amp;h=108" alt="image" title="image" style="cursor: pointer; display: inline;"></span><br>查看nginx安装路径：<br>因为是使用brew安装的，所以使用brew命令：<code>brew info nginx</code>:<br><span class="img-wrap"><img data-src="/img/remote/1460000013781169" src="https://static.alili.tech/img/remote/1460000013781169" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader7">nginx.conf基本配置有哪些？</h2>
<p>nginx配置文件主要分成四个部分：</p>
<ul>
<li>main，全局设置，影响其它部分所有设置</li>
<li>server，主机服务相关设置，主要用于指定虚拟主机域名、IP和端口</li>
<li>location，URL匹配特定位置后的设置，反向代理、内容篡改相关设置</li>
<li>upstream，上游服务器设置，负载均衡相关配置</li>
</ul>
<p>他们之间的关系式：server继承main，location继承server；upstream既不会继承指令也不会被继承。</p>
<p>如下是一份通用的配置和详解：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#定义 Nginx 运行的用户和用户组,默认由 nobody 账号运行, windows 下面可以注释掉。 
user  nobody; 

#nginx进程数，建议设置为等于CPU总核心数。可以和worker_cpu_affinity配合
worker_processes  1; 

#全局错误日志定义类型，[ debug | info | notice | warn | error | crit ]
#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#进程文件，window下可以注释掉
#pid        logs/nginx.pid;

# 一个nginx进程打开的最多文件描述符(句柄)数目，理论值应该是最多打开文件数（系统的值ulimit -n）与nginx进程数相除，
# 但是nginx分配请求并不均匀，所以建议与ulimit -n的值保持一致。
worker_rlimit_nofile 65535;

#工作模式与连接数上限
events {
    # 参考事件模型，use [ kqueue | rtsig | epoll | /dev/poll | select | poll ]; 
    # epoll模型是Linux 2.6以上版本内核中的高性能网络I/O模型，如果跑在FreeBSD上面，就用kqueue模型。
   #use epoll;
   #connections 20000;  # 每个进程允许的最多连接数
   # 单个进程最大连接数（最大连接数=连接数*进程数）该值受系统进程最大打开文件数限制，需要使用命令ulimit -n 查看当前设置
   worker_connections 65535;
}

#设定http服务器
http {
    #文件扩展名与文件类型映射表
    #include 是个主模块指令，可以将配置文件拆分并引用，可以减少主配置文件的复杂度
    include       mime.types;
    #默认文件类型
    default_type  application/octet-stream;
    #charset utf-8; #默认编码

    #定义虚拟主机日志的格式
    #log_format  main  '$remote_addr - $remote_user [$time_local] &quot;$request&quot; '
    #                  '$status $body_bytes_sent &quot;$http_referer&quot; '
    #                  '&quot;$http_user_agent&quot; &quot;$http_x_forwarded_for&quot;';
    
    #定义虚拟主机访问日志
    #access_log  logs/access.log  main;

    #开启高效文件传输模式，sendfile指令指定nginx是否调用sendfile函数来输出文件，对于普通应用设为 on，如果用来进行下载等应用磁盘IO重负载应用，可设置为off，以平衡磁盘与网络I/O处理速度，降低系统的负载。注意：如果图片显示不正常把这个改成off。
    sendfile        on;
    #autoindex on; #开启目录列表访问，合适下载服务器，默认关闭。

    #防止网络阻塞
    #tcp_nopush     on;

    #长连接超时时间，单位是秒，默认为0
    keepalive_timeout  65;

    # gzip压缩功能设置
    gzip on; #开启gzip压缩输出
    gzip_min_length 1k; #最小压缩文件大小
    gzip_buffers    4 16k; #压缩缓冲区
    gzip_http_version 1.0; #压缩版本（默认1.1，前端如果是squid2.5请使用1.0）
    gzip_comp_level 6; #压缩等级
    #压缩类型，默认就已经包含text/html，所以下面就不用再写了，写上去也不会有问题，但是会有一个warn。
    gzip_types text/plain text/css text/javascript application/json application/javascript application/x-javascript application/xml;
    gzip_vary on; //和http头有关系，加个vary头，给代理服务器用的，有的浏览器支持压缩，有的不支持，所以避免浪费不支持的也压缩，所以根据客户端的HTTP头来判断，是否需要压缩
    #limit_zone crawler $binary_remote_addr 10m; #开启限制IP连接数的时候需要使用

    # http_proxy服务全局设置
    client_max_body_size   10m;
    client_body_buffer_size   128k;
    proxy_connect_timeout   75;
    proxy_send_timeout   75;
    proxy_read_timeout   75;
    proxy_buffer_size   4k;
    proxy_buffers   4 32k;
    proxy_busy_buffers_size   64k;
    proxy_temp_file_write_size  64k;
    proxy_temp_path   /usr/local/nginx/proxy_temp 1 2;

   # 设定负载均衡后台服务器列表 
    upstream  backend.com  { 
        #ip_hash; # 指定支持的调度算法
        # upstream 的负载均衡，weight 是权重，可以根据机器配置定义权重。weigth 参数表示权值，权值越高被分配到的几率越大。
        server   192.168.10.100:8080 max_fails=2 fail_timeout=30s ;  
        server   192.168.10.101:8080 max_fails=2 fail_timeout=30s ;  
    }

    #虚拟主机的配置
    server {
        #监听端口
        listen       80;
        #域名可以有多个，用空格隔开
        server_name  localhost fontend.com;
        # Server Side Include，通常称为服务器端嵌入
        #ssi on;
        #默认编码
        #charset utf-8;
        #定义本虚拟主机的访问日志
        #access_log  logs/host.access.log  main;
        
        # 因为所有的地址都以 / 开头，所以这条规则将匹配到所有请求
        location / {
            root   html;
            index  index.html index.htm;
        }
        
        #error_page  404              /404.html;

        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }

       # 图片缓存时间设置
       location ~ .*.(gif|jpg|jpeg|png|bmp|swf)$ {
          expires 10d;
       }

       # JS和CSS缓存时间设置
       location ~ .*.(js|css)?$ {
          expires 1h;
       }

        #代理配置
        # proxy the PHP scripts to Apache listening on 127.0.0.1:80
        #location /proxy/ {
        #    proxy_pass   http://127.0.0.1;
        #}

        # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
        #
        #location ~ \.php$ {
        #    root           html;
        #    fastcgi_pass   127.0.0.1:9000;
        #    fastcgi_index  index.php;
        #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
        #    include        fastcgi_params;
        #}

        # deny access to .htaccess files, if Apache's document root
        # concurs with nginx's one
        #
        #location ~ /\.ht {
        #    deny  all;
        #}
    }

    # another virtual host using mix of IP-, name-, and port-based configuration
    #
    #server {
    #    listen       8000;
    #    listen       somename:8080;
    #    server_name  somename  alias  another.alias;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}

    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="nginx hljs"><code class="nginx"><span class="hljs-comment">#定义 Nginx 运行的用户和用户组,默认由 nobody 账号运行, windows 下面可以注释掉。 </span>
<span class="hljs-attribute">user</span>  nobody; 

<span class="hljs-comment">#nginx进程数，建议设置为等于CPU总核心数。可以和worker_cpu_affinity配合</span>
<span class="hljs-attribute">worker_processes</span>  <span class="hljs-number">1</span>; 

<span class="hljs-comment">#全局错误日志定义类型，[ debug | info | notice | warn | error | crit ]</span>
<span class="hljs-comment">#error_log  logs/error.log;</span>
<span class="hljs-comment">#error_log  logs/error.log  notice;</span>
<span class="hljs-comment">#error_log  logs/error.log  info;</span>

<span class="hljs-comment">#进程文件，window下可以注释掉</span>
<span class="hljs-comment">#pid        logs/nginx.pid;</span>

<span class="hljs-comment"># 一个nginx进程打开的最多文件描述符(句柄)数目，理论值应该是最多打开文件数（系统的值ulimit -n）与nginx进程数相除，</span>
<span class="hljs-comment"># 但是nginx分配请求并不均匀，所以建议与ulimit -n的值保持一致。</span>
<span class="hljs-attribute">worker_rlimit_nofile</span> <span class="hljs-number">65535</span>;

<span class="hljs-comment">#工作模式与连接数上限</span>
<span class="hljs-section">events</span> {
    <span class="hljs-comment"># 参考事件模型，use [ kqueue | rtsig | epoll | /dev/poll | select | poll ]; </span>
    <span class="hljs-comment"># epoll模型是Linux 2.6以上版本内核中的高性能网络I/O模型，如果跑在FreeBSD上面，就用kqueue模型。</span>
   <span class="hljs-comment">#use epoll;</span>
   <span class="hljs-comment">#connections 20000;  # 每个进程允许的最多连接数</span>
   <span class="hljs-comment"># 单个进程最大连接数（最大连接数=连接数*进程数）该值受系统进程最大打开文件数限制，需要使用命令ulimit -n 查看当前设置</span>
   <span class="hljs-attribute">worker_connections</span> <span class="hljs-number">65535</span>;
}

<span class="hljs-comment">#设定http服务器</span>
<span class="hljs-section">http</span> {
    <span class="hljs-comment">#文件扩展名与文件类型映射表</span>
    <span class="hljs-comment">#include 是个主模块指令，可以将配置文件拆分并引用，可以减少主配置文件的复杂度</span>
    <span class="hljs-attribute">include</span>       mime.types;
    <span class="hljs-comment">#默认文件类型</span>
    <span class="hljs-attribute">default_type</span>  application/octet-stream;
    <span class="hljs-comment">#charset utf-8; #默认编码</span>

    <span class="hljs-comment">#定义虚拟主机日志的格式</span>
    <span class="hljs-comment">#log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '</span>
    <span class="hljs-comment">#                  '$status $body_bytes_sent "$http_referer" '</span>
    <span class="hljs-comment">#                  '"$http_user_agent" "$http_x_forwarded_for"';</span>
    
    <span class="hljs-comment">#定义虚拟主机访问日志</span>
    <span class="hljs-comment">#access_log  logs/access.log  main;</span>

    <span class="hljs-comment">#开启高效文件传输模式，sendfile指令指定nginx是否调用sendfile函数来输出文件，对于普通应用设为 on，如果用来进行下载等应用磁盘IO重负载应用，可设置为off，以平衡磁盘与网络I/O处理速度，降低系统的负载。注意：如果图片显示不正常把这个改成off。</span>
    <span class="hljs-attribute">sendfile</span>        <span class="hljs-literal">on</span>;
    <span class="hljs-comment">#autoindex on; #开启目录列表访问，合适下载服务器，默认关闭。</span>

    <span class="hljs-comment">#防止网络阻塞</span>
    <span class="hljs-comment">#tcp_nopush     on;</span>

    <span class="hljs-comment">#长连接超时时间，单位是秒，默认为0</span>
    <span class="hljs-attribute">keepalive_timeout</span>  <span class="hljs-number">65</span>;

    <span class="hljs-comment"># gzip压缩功能设置</span>
    <span class="hljs-attribute">gzip</span> <span class="hljs-literal">on</span>; <span class="hljs-comment">#开启gzip压缩输出</span>
    <span class="hljs-attribute">gzip_min_length</span> <span class="hljs-number">1k</span>; <span class="hljs-comment">#最小压缩文件大小</span>
    <span class="hljs-attribute">gzip_buffers</span>    <span class="hljs-number">4</span> <span class="hljs-number">16k</span>; <span class="hljs-comment">#压缩缓冲区</span>
    <span class="hljs-attribute">gzip_http_version</span> <span class="hljs-number">1</span>.<span class="hljs-number">0</span>; <span class="hljs-comment">#压缩版本（默认1.1，前端如果是squid2.5请使用1.0）</span>
    <span class="hljs-attribute">gzip_comp_level</span> <span class="hljs-number">6</span>; <span class="hljs-comment">#压缩等级</span>
    <span class="hljs-comment">#压缩类型，默认就已经包含text/html，所以下面就不用再写了，写上去也不会有问题，但是会有一个warn。</span>
    <span class="hljs-attribute">gzip_types</span> text/plain text/css text/javascript application/json application/javascript application/x-javascript application/xml;
    <span class="hljs-attribute">gzip_vary</span> <span class="hljs-literal">on</span>; //和http头有关系，加个vary头，给代理服务器用的，有的浏览器支持压缩，有的不支持，所以避免浪费不支持的也压缩，所以根据客户端的HTTP头来判断，是否需要压缩
    <span class="hljs-comment">#limit_zone crawler $binary_remote_addr 10m; #开启限制IP连接数的时候需要使用</span>

    <span class="hljs-comment"># http_proxy服务全局设置</span>
    <span class="hljs-attribute">client_max_body_size</span>   <span class="hljs-number">10m</span>;
    <span class="hljs-attribute">client_body_buffer_size</span>   <span class="hljs-number">128k</span>;
    <span class="hljs-attribute">proxy_connect_timeout</span>   <span class="hljs-number">75</span>;
    <span class="hljs-attribute">proxy_send_timeout</span>   <span class="hljs-number">75</span>;
    <span class="hljs-attribute">proxy_read_timeout</span>   <span class="hljs-number">75</span>;
    <span class="hljs-attribute">proxy_buffer_size</span>   <span class="hljs-number">4k</span>;
    <span class="hljs-attribute">proxy_buffers</span>   <span class="hljs-number">4</span> <span class="hljs-number">32k</span>;
    <span class="hljs-attribute">proxy_busy_buffers_size</span>   <span class="hljs-number">64k</span>;
    <span class="hljs-attribute">proxy_temp_file_write_size</span>  <span class="hljs-number">64k</span>;
    <span class="hljs-attribute">proxy_temp_path</span>   /usr/local/nginx/proxy_temp <span class="hljs-number">1</span> <span class="hljs-number">2</span>;

   <span class="hljs-comment"># 设定负载均衡后台服务器列表 </span>
    <span class="hljs-attribute">upstream</span>  backend.com  { 
        <span class="hljs-comment">#ip_hash; # 指定支持的调度算法</span>
        <span class="hljs-comment"># upstream 的负载均衡，weight 是权重，可以根据机器配置定义权重。weigth 参数表示权值，权值越高被分配到的几率越大。</span>
        <span class="hljs-attribute">server</span>   <span class="hljs-number">192.168.10.100:8080</span> max_fails=<span class="hljs-number">2</span> fail_timeout=<span class="hljs-number">30s</span> ;  
        <span class="hljs-attribute">server</span>   <span class="hljs-number">192.168.10.101:8080</span> max_fails=<span class="hljs-number">2</span> fail_timeout=<span class="hljs-number">30s</span> ;  
    }

    <span class="hljs-comment">#虚拟主机的配置</span>
    <span class="hljs-section">server</span> {
        <span class="hljs-comment">#监听端口</span>
        <span class="hljs-attribute">listen</span>       <span class="hljs-number">80</span>;
        <span class="hljs-comment">#域名可以有多个，用空格隔开</span>
        <span class="hljs-attribute">server_name</span>  localhost fontend.com;
        <span class="hljs-comment"># Server Side Include，通常称为服务器端嵌入</span>
        <span class="hljs-comment">#ssi on;</span>
        <span class="hljs-comment">#默认编码</span>
        <span class="hljs-comment">#charset utf-8;</span>
        <span class="hljs-comment">#定义本虚拟主机的访问日志</span>
        <span class="hljs-comment">#access_log  logs/host.access.log  main;</span>
        
        <span class="hljs-comment"># 因为所有的地址都以 / 开头，所以这条规则将匹配到所有请求</span>
        <span class="hljs-attribute">location</span> / {
            <span class="hljs-attribute">root</span>   html;
            <span class="hljs-attribute">index</span>  index.html index.htm;
        }
        
        <span class="hljs-comment">#error_page  404              /404.html;</span>

        <span class="hljs-comment"># redirect server error pages to the static page /50x.html</span>
        <span class="hljs-comment">#</span>
        <span class="hljs-attribute">error_page</span>   <span class="hljs-number">500</span> <span class="hljs-number">502</span> <span class="hljs-number">503</span> <span class="hljs-number">504</span>  /50x.html;
        <span class="hljs-attribute">location</span> = /50x.html {
            <span class="hljs-attribute">root</span>   html;
        }

       <span class="hljs-comment"># 图片缓存时间设置</span>
       <span class="hljs-attribute">location</span> <span class="hljs-regexp">~ .*.(gif|jpg|jpeg|png|bmp|swf)$</span> {
          <span class="hljs-attribute">expires</span> <span class="hljs-number">10d</span>;
       }

       <span class="hljs-comment"># JS和CSS缓存时间设置</span>
       <span class="hljs-attribute">location</span> <span class="hljs-regexp">~ .*.(js|css)?$</span> {
          <span class="hljs-attribute">expires</span> <span class="hljs-number">1h</span>;
       }

        <span class="hljs-comment">#代理配置</span>
        <span class="hljs-comment"># proxy the PHP scripts to Apache listening on 127.0.0.1:80</span>
        <span class="hljs-comment">#location /proxy/ {</span>
        <span class="hljs-comment">#    proxy_pass   http://127.0.0.1;</span>
        <span class="hljs-comment">#}</span>

        <span class="hljs-comment"># pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000</span>
        <span class="hljs-comment">#</span>
        <span class="hljs-comment">#location ~ \.php$ {</span>
        <span class="hljs-comment">#    root           html;</span>
        <span class="hljs-comment">#    fastcgi_pass   127.0.0.1:9000;</span>
        <span class="hljs-comment">#    fastcgi_index  index.php;</span>
        <span class="hljs-comment">#    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;</span>
        <span class="hljs-comment">#    include        fastcgi_params;</span>
        <span class="hljs-comment">#}</span>

        <span class="hljs-comment"># deny access to .htaccess files, if Apache's document root</span>
        <span class="hljs-comment"># concurs with nginx's one</span>
        <span class="hljs-comment">#</span>
        <span class="hljs-comment">#location ~ /\.ht {</span>
        <span class="hljs-comment">#    deny  all;</span>
        <span class="hljs-comment">#}</span>
    }

    <span class="hljs-comment"># another virtual host using mix of IP-, name-, and port-based configuration</span>
    <span class="hljs-comment">#</span>
    <span class="hljs-comment">#server {</span>
    <span class="hljs-comment">#    listen       8000;</span>
    <span class="hljs-comment">#    listen       somename:8080;</span>
    <span class="hljs-comment">#    server_name  somename  alias  another.alias;</span>

    <span class="hljs-comment">#    location / {</span>
    <span class="hljs-comment">#        root   html;</span>
    <span class="hljs-comment">#        index  index.html index.htm;</span>
    <span class="hljs-comment">#    }</span>
    <span class="hljs-comment">#}</span>

    <span class="hljs-comment"># HTTPS server</span>
    <span class="hljs-comment">#</span>
    <span class="hljs-comment">#server {</span>
    <span class="hljs-comment">#    listen       443 ssl;</span>
    <span class="hljs-comment">#    server_name  localhost;</span>

    <span class="hljs-comment">#    ssl_certificate      cert.pem;</span>
    <span class="hljs-comment">#    ssl_certificate_key  cert.key;</span>

    <span class="hljs-comment">#    ssl_session_cache    shared:SSL:1m;</span>
    <span class="hljs-comment">#    ssl_session_timeout  5m;</span>

    <span class="hljs-comment">#    ssl_ciphers  HIGH:!aNULL:!MD5;</span>
    <span class="hljs-comment">#    ssl_prefer_server_ciphers  on;</span>

    <span class="hljs-comment">#    location / {</span>
    <span class="hljs-comment">#        root   html;</span>
    <span class="hljs-comment">#        index  index.html index.htm;</span>
    <span class="hljs-comment">#    }</span>
    <span class="hljs-comment">#}</span>
}
</code></pre>
<h3 id="articleHeader8">location如何匹配？</h3>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="location  = / {
  # 精确匹配 / ，主机名后面不能带任何字符串
  [ configuration A ] 
}

location  / {
  # 因为所有的地址都以 / 开头，所以这条规则将匹配到所有请求
  # 但是正则和最长字符串会优先匹配
  [ configuration B ] 
}

location /documents/ {
  # 匹配任何以 /documents/ 开头的地址，匹配符合以后，还要继续往下搜索
  # 只有后面的正则表达式没有匹配到时，这一条才会采用这一条
  [ configuration C ] 
}

location ~ /documents/Abc {
  # 匹配任何以 /documents/ 开头的地址，匹配符合以后，还要继续往下搜索
  # 只有后面的正则表达式没有匹配到时，这一条才会采用这一条
  [ configuration CC ] 
}

location ^~ /images/ {
  # 匹配任何以 /images/ 开头的地址，匹配符合以后，停止往下搜索正则，采用这一条。
  [ configuration D ] 
}

location ~* \.(gif|jpg|jpeg)$ {
  # 匹配所有以 gif,jpg或jpeg 结尾的请求
  # 然而，所有请求 /images/ 下的图片会被 config D 处理，因为 ^~ 到达不了这一条正则
  [ configuration E ] 
}

location /images/ {
  # 字符匹配到 /images/，继续往下，会发现 ^~ 存在
  [ configuration F ] 
}

location /images/abc {
  # 最长字符匹配到 /images/abc，继续往下，会发现 ^~ 存在
  # F与G的放置顺序是没有关系的
  [ configuration G ] 
}

location ~ /images/abc/ {
  # 只有去掉 config D 才有效：先最长匹配 config G 开头的地址，继续往下搜索，匹配到这一条正则，采用
    [ configuration H ] 
}

location ~* /js/.*/\.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="nginx hljs"><code class="nginx"><span class="hljs-attribute">location</span>  = / {
  <span class="hljs-comment"># 精确匹配 / ，主机名后面不能带任何字符串</span>
  [ <span class="hljs-attribute">configuration</span> A ] 
}

location  / {
  <span class="hljs-comment"># 因为所有的地址都以 / 开头，所以这条规则将匹配到所有请求</span>
  <span class="hljs-comment"># 但是正则和最长字符串会优先匹配</span>
  [ <span class="hljs-attribute">configuration</span> B ] 
}

location /documents/ {
  <span class="hljs-comment"># 匹配任何以 /documents/ 开头的地址，匹配符合以后，还要继续往下搜索</span>
  <span class="hljs-comment"># 只有后面的正则表达式没有匹配到时，这一条才会采用这一条</span>
  [ <span class="hljs-attribute">configuration</span> C ] 
}

location <span class="hljs-regexp">~ /documents/Abc</span> {
  <span class="hljs-comment"># 匹配任何以 /documents/ 开头的地址，匹配符合以后，还要继续往下搜索</span>
  <span class="hljs-comment"># 只有后面的正则表达式没有匹配到时，这一条才会采用这一条</span>
  [ <span class="hljs-attribute">configuration</span> CC ] 
}

location<span class="hljs-regexp"> ^~</span> /images/ {
  <span class="hljs-comment"># 匹配任何以 /images/ 开头的地址，匹配符合以后，停止往下搜索正则，采用这一条。</span>
  [ <span class="hljs-attribute">configuration</span> D ] 
}

location <span class="hljs-regexp">~* \.(gif|jpg|jpeg)$</span> {
  <span class="hljs-comment"># 匹配所有以 gif,jpg或jpeg 结尾的请求</span>
  <span class="hljs-comment"># 然而，所有请求 /images/ 下的图片会被 config D 处理，因为 ^~ 到达不了这一条正则</span>
  [ <span class="hljs-attribute">configuration</span> E ] 
}

location /images/ {
  <span class="hljs-comment"># 字符匹配到 /images/，继续往下，会发现 ^~ 存在</span>
  [ <span class="hljs-attribute">configuration</span> F ] 
}

location /images/abc {
  <span class="hljs-comment"># 最长字符匹配到 /images/abc，继续往下，会发现 ^~ 存在</span>
  <span class="hljs-comment"># F与G的放置顺序是没有关系的</span>
  [ <span class="hljs-attribute">configuration</span> G ] 
}

location <span class="hljs-regexp">~ /images/abc/</span> {
  <span class="hljs-comment"># 只有去掉 config D 才有效：先最长匹配 config G 开头的地址，继续往下搜索，匹配到这一条正则，采用</span>
    [ <span class="hljs-attribute">configuration</span> H ] 
}

location <span class="hljs-regexp">~* /js/.*/\.js</span></code></pre>
<ul>
<li>以<code>=</code>开头表示精确匹配</li>
<li>
<code>^~</code> 开头表示uri以某个常规字符串开头，不是正则匹配</li>
<li>
<code>~ </code>开头表示区分大小写的正则匹配;</li>
<li>
<code>~*</code> 开头表示不区分大小写的正则匹配</li>
<li>
<code>/</code> 通用匹配, 如果没有其它匹配,任何请求都会匹配到</li>
</ul>
<p>优先级：<br>(location =) &gt; (location 完整路径) &gt; (location ^~ 路径) &gt; (location ~,~* 正则顺序) &gt; (location 部分起始路径) &gt; (/)</p>
<h3 id="articleHeader9">如何配置反向代理？</h3>
<p>详解：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 对 “/” 启用反向代理
location / {
  proxy_pass http://127.0.0.1:3000;  # 设置要代理的 uri，注意最后的 /。可以是 Unix 域套接字路径，也可以是正则表达式。
  proxy_redirect off; # 设置后端服务器“Location”响应头和“Refresh”响应头的替换文本
  proxy_set_header X-Real-IP $remote_addr; # 获取用户的真实 IP 地址
  #后端的Web服务器可以通过 X-Forwarded-For 获取用户真实IP，多个 nginx 反代的情况下，例如 CDN。参见：http://gong1208.iteye.com/blog/1559835 和 http://bbs.linuxtone.org/thread-9050-1-1.html
  proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
  #以下是一些反向代理的配置，可选。
  proxy_set_header Host $host; # 允许重新定义或者添加发往后端服务器的请求头。

  client_max_body_size 10m; #允许客户端请求的最大单文件字节数
  client_body_buffer_size 128k; #缓冲区代理缓冲用户端请求的最大字节数，
  proxy_connect_timeout 90; #nginx跟后端服务器连接超时时间(代理连接超时)
  proxy_send_timeout 90; #后端服务器数据回传时间(代理发送超时)
  proxy_read_timeout 90; #连接成功后，后端服务器响应时间(代理接收超时)
  proxy_buffer_size 4k; #设置代理服务器（nginx）保存用户头信息的缓冲区大小
  proxy_buffers 4 32k; #proxy_buffers缓冲区，网页平均在32k以下的设置
  proxy_busy_buffers_size 64k; #高负荷下缓冲大小（proxy_buffers*2）
  proxy_temp_file_write_size 64k;
  #设定缓存文件夹大小，大于这个值，将从upstream服务器传
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="nginx hljs"><code class="nginx"><span class="hljs-comment"># 对 “/” 启用反向代理</span>
<span class="hljs-attribute">location</span> / {
  <span class="hljs-attribute">proxy_pass</span> http://127.0.0.1:3000;  <span class="hljs-comment"># 设置要代理的 uri，注意最后的 /。可以是 Unix 域套接字路径，也可以是正则表达式。</span>
  <span class="hljs-attribute">proxy_redirect</span> <span class="hljs-literal">off</span>; <span class="hljs-comment"># 设置后端服务器“Location”响应头和“Refresh”响应头的替换文本</span>
  <span class="hljs-attribute">proxy_set_header</span> X-Real-IP <span class="hljs-variable">$remote_addr</span>; <span class="hljs-comment"># 获取用户的真实 IP 地址</span>
  <span class="hljs-comment">#后端的Web服务器可以通过 X-Forwarded-For 获取用户真实IP，多个 nginx 反代的情况下，例如 CDN。参见：http://gong1208.iteye.com/blog/1559835 和 http://bbs.linuxtone.org/thread-9050-1-1.html</span>
  <span class="hljs-attribute">proxy_set_header</span> X-Forwarded-For <span class="hljs-variable">$proxy_add_x_forwarded_for</span>;
  <span class="hljs-comment">#以下是一些反向代理的配置，可选。</span>
  <span class="hljs-attribute">proxy_set_header</span> Host <span class="hljs-variable">$host</span>; <span class="hljs-comment"># 允许重新定义或者添加发往后端服务器的请求头。</span>

  <span class="hljs-attribute">client_max_body_size</span> <span class="hljs-number">10m</span>; <span class="hljs-comment">#允许客户端请求的最大单文件字节数</span>
  <span class="hljs-attribute">client_body_buffer_size</span> <span class="hljs-number">128k</span>; <span class="hljs-comment">#缓冲区代理缓冲用户端请求的最大字节数，</span>
  <span class="hljs-attribute">proxy_connect_timeout</span> <span class="hljs-number">90</span>; <span class="hljs-comment">#nginx跟后端服务器连接超时时间(代理连接超时)</span>
  <span class="hljs-attribute">proxy_send_timeout</span> <span class="hljs-number">90</span>; <span class="hljs-comment">#后端服务器数据回传时间(代理发送超时)</span>
  <span class="hljs-attribute">proxy_read_timeout</span> <span class="hljs-number">90</span>; <span class="hljs-comment">#连接成功后，后端服务器响应时间(代理接收超时)</span>
  <span class="hljs-attribute">proxy_buffer_size</span> <span class="hljs-number">4k</span>; <span class="hljs-comment">#设置代理服务器（nginx）保存用户头信息的缓冲区大小</span>
  <span class="hljs-attribute">proxy_buffers</span> <span class="hljs-number">4</span> <span class="hljs-number">32k</span>; <span class="hljs-comment">#proxy_buffers缓冲区，网页平均在32k以下的设置</span>
  <span class="hljs-attribute">proxy_busy_buffers_size</span> <span class="hljs-number">64k</span>; <span class="hljs-comment">#高负荷下缓冲大小（proxy_buffers*2）</span>
  <span class="hljs-attribute">proxy_temp_file_write_size</span> <span class="hljs-number">64k</span>;
  <span class="hljs-comment">#设定缓存文件夹大小，大于这个值，将从upstream服务器传</span>
}</code></pre>
<p>举例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="location ^~ /service/ {
  proxy_pass http://192.168.60.245:8080/;
  proxy_redirect      default;
  proxy_set_header    Host $host
  proxy_set_header    X-Real-IP $remote_addr;
  proxy_set_header    X-Forwarded-For  $proxy_add_x_forwarded_for;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="nginx hljs"><code class="nginx"><span class="hljs-attribute">location</span><span class="hljs-regexp"> ^~</span> /service/ {
  <span class="hljs-attribute">proxy_pass</span> http://192.168.60.245:8080/;
  <span class="hljs-attribute">proxy_redirect</span>      default;
  <span class="hljs-attribute">proxy_set_header</span>    Host <span class="hljs-variable">$host</span>
  proxy_set_header    X-Real-IP <span class="hljs-variable">$remote_addr</span>;
  <span class="hljs-attribute">proxy_set_header</span>    X-Forwarded-For  <span class="hljs-variable">$proxy_add_x_forwarded_for</span>;
}</code></pre>
<p>简化：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="location /proxy/ {
  proxy_pass http://backend.com/;
  proxy_redirect      default;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="nginx hljs"><code class="nginx"><span class="hljs-attribute">location</span> /proxy/ {
  <span class="hljs-attribute">proxy_pass</span> http://backend.com/;
  <span class="hljs-attribute">proxy_redirect</span>      default;
}</code></pre>
<h3 id="articleHeader10">如何配置rewrite？</h3>
<p>rewrite功能就是集合正则表达式和标志位实现url重写和重定向。rewrite只能放在server{}、location{}、if(){}块中，并且只能对域名后边的出去传递参数外的字符串起作用。如URL：<br><code>http://microloan-sms-platform.yxapp.xyz/proxy/sms/task/querydeleted?page=1&amp;pagesize=10</code><br>只对/proxy/sms/task/querydeleted进行重写。</p>
<p>如果相对域名或参数字符串起作用，可以使用全局变量匹配，也可以使用proxy_pass反向代理。</p>
<p>表明看rewrite和location功能有点像，都能实现跳转，主要区别在于rewrite是在同一域名内更改获取资源的路径，而location是对一类路径做控制访问或反向代理，可以proxy_pass到其他机器。很多情况下rewrite也会写在location里，它们的执行顺序是：</p>
<ul>
<li>执行server块的rewrite指令</li>
<li>执行location匹配</li>
<li>执行选定的location中的rewrite指令</li>
</ul>
<p>如果其中某步URI被重写，则重新循环执行1-3，直到找到真实存在的文件；循环超过10次，则返回500 Internal Server Error错误。</p>
<p>rewrite规则后边，通常会带有flag标志位：</p>
<ul>
<li>
<code>last</code> : 相当于Apache的[L]标记，表示完成rewrite</li>
<li>
<code>break</code> : 停止执行当前虚拟主机的后续rewrite指令集</li>
<li>
<code>redirect</code> : 返回<code>302</code>临时重定向，地址栏会显示跳转后的地址</li>
<li>
<code>permanent</code> : 返回<code>301</code>永久重定向，地址栏会显示跳转后的地址</li>
</ul>
<p><code>last</code> 和 <code>break</code> 区别：</p>
<ul>
<li>
<code>last</code>一般写在<code>server</code>和<code>if</code>中，而<code>break</code>一般使用在<code>location</code>中</li>
<li>
<code>last</code>不终止重写后的url匹配，即新的url会再从<code>server</code>走一遍匹配流程，而<code>break</code>终止重写后的匹配</li>
<li>
<code>break</code>和<code>last</code>都能组织继续执行后面的rewrite指令</li>
</ul>
<p>rewrite常用正则：</p>
<ul>
<li>
<code>.</code> ： 匹配除换行符以外的任意字符</li>
<li>
<code>?</code> ： 重复0次或1次</li>
<li>
<code>+</code> ： 重复1次或更多次</li>
<li>
<code>*</code> ： 重复0次或更多次</li>
<li>
<code>\d</code> ：匹配数字</li>
<li>
<code>^</code> ： 匹配字符串的开始</li>
<li>
<code>$</code> ： 匹配字符串的介绍</li>
<li>
<code>{n}</code> ： 重复n次</li>
<li>
<code>{n,}</code> ： 重复n次或更多次</li>
<li>
<code>[c]</code> ： 匹配单个字符c</li>
<li>
<code>[a-z]</code> ： 匹配a-z小写字母的任意一个</li>
</ul>
<p>可以使用<code>()</code>来进行分组，可以通过<code>$1</code>的形式来引用。</p>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="location /proxy/ {
        proxy_pass http://microloan-notification-web.yxapp.in;
        rewrite /proxy/(.*)$ /$1 break;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="nginx hljs"><code class="nginx"><span class="hljs-attribute">location</span> /proxy/ {
        <span class="hljs-attribute">proxy_pass</span> http://microloan-notification-web.yxapp.in;
        <span class="hljs-attribute">rewrite</span> /proxy/(.*)$ /<span class="hljs-variable">$1</span> <span class="hljs-literal">break</span>;
}</code></pre>
<h3 id="articleHeader11">如何配置负载均衡？</h3>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="upstream test.net{
   ip_hash;
   server 192.168.11.1:80;
   server 192.168.11.11:80  down;
   server 192.168.11.123:8009  max_fails=3  fail_timeout=20s;
   server 192.168.11.1234:8080;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="nginx hljs"><code class="nginx"><span class="hljs-attribute">upstream</span> test.net{
   ip_hash;
   <span class="hljs-attribute">server</span> <span class="hljs-number">192.168.11.1:80</span>;
   <span class="hljs-attribute">server</span> <span class="hljs-number">192.168.11.11:80</span>  down;
   <span class="hljs-attribute">server</span> <span class="hljs-number">192.168.11.123:8009</span>  max_fails=<span class="hljs-number">3</span>  fail_timeout=<span class="hljs-number">20s</span>;
   <span class="hljs-attribute">server</span> <span class="hljs-number">192</span>.<span class="hljs-number">168</span>.<span class="hljs-number">11</span>.<span class="hljs-number">1234</span>:<span class="hljs-number">8080</span>;
}</code></pre>
<p>upstream是Nginx的HTTP Upstream模块，这个模块通过一个简单的调度算法来实现客户端IP到后端服务器的负载均衡。<br>Nginx的负载均衡模块目前支持4种调度算法：</p>
<ul>
<li>
<code>轮询（默认）</code>。每个请求按时间顺序逐一分配到不同的后端服务器，如果后端某台服务器宕机，故障系统被自动剔除，使用户访问不受影响。Weight 指定轮询权值，Weight值越大，分配到的访问机率越高，主要用于后端每个服务器性能不均的情况下。</li>
<li>
<code>ip_hash</code>。每个请求按访问IP的hash结果分配，这样来自同一个IP的访客固定访问一个后端服务器，有效解决了动态网页存在的session共享问题。</li>
<li>
<code>fair</code>。这是比上面两个更加智能的负载均衡算法。此种算法可以依据页面大小和加载时间长短智能地进行负载均衡，也就是根据后端服务器的响应时间来分配请求，响应时间短的优先分配。Nginx本身是不支持fair的，如果需要使用这种调度算法，必须下载Nginx的upstream_fair模块。</li>
<li>
<code>url_hash</code>。此方法按访问url的hash结果来分配请求，使每个url定向到同一个后端服务器，可以进一步提高后端缓存服务器的效率。Nginx本身是不支持url_hash的，如果需要使用这种调度算法，必须安装Nginx 的hash软件包。</li>
</ul>
<p>upstream可以设定每个后端服务器在负载均衡调度中的状态，支持的状态参数:</p>
<ul>
<li>
<code>down</code>，表示当前的server暂时不参与负载均衡</li>
<li>
<code>backup</code>，预留的备份机器。当其他所有的非backup机器出现故障或者忙的时候，才会请求<code>backup</code>机器，因此这台机器的压力最轻。</li>
<li>
<code>max_fails</code>，允许请求失败的次数，默认为<code>1</code>。当超过最大次数时，返回<code>proxy_next_upstream</code> 模块定义的错误。</li>
<li>
<code>fail_timeout</code>，在经历了<code>max_fails</code>次失败后，暂停服务的时间。<code>max_fails</code>可以和<code>fail_timeout</code>一起使用。</li>
</ul>
<p><strong>注，当负载调度算法为ip_hash时，后端服务器在负载均衡调度中的状态不能是weight和backup。</strong></p>
<h3 id="articleHeader12">如何设置页面缓存？</h3>
<p>页面缓存设置指令：</p>
<ul>
<li>
<p><code>proxy_cache_path </code>: 指定缓存的路径和一些其他参数，缓存的数据存储在文件中，并且使用代理url的哈希值作为关键字与文件名。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  proxy_cache_path /data/nginx/cache/webserver levels=1:2 keys_zone=webserver:20m max_size=1g;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="nginx hljs"><code class="nginx" style="word-break: break-word; white-space: initial;">  <span class="hljs-attribute">proxy_cache_path</span> /data/nginx/cache/webserver levels=<span class="hljs-number">1</span>:<span class="hljs-number">2</span> keys_zone=webserver:<span class="hljs-number">20m</span> max_size=<span class="hljs-number">1g</span>;</code></pre>
<p><code>levels</code>参数指定缓存的子目录数。<code>keys_zone</code>指定活动的key和元数据存储在共享池（webserver为共享池名称，20m位共享池大小），<code>inactive</code>参数指定的时间内缓存的数据没有被请求则被删除，默认inactive为10分钟<code>·max_size</code>指定缓存空间的大小。</p>
</li>
<li>
<code>proxy_cache </code>: 设置一个缓存区域的名称，一个相同的区域可以在不同的地方使用。</li>
<li>
<code>proxy_cache_valid </code>: 为不同的应答设置不同的缓存时间。</li>
</ul>
<h3 id="articleHeader13">如何设置读写分离？</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="server {
        listen       80;
        server_name  localhost;
        #charset koi8-r;
        #access_log  logs/host.access.log  main;
        location / {
                proxy_pass http://192.128.133.202;
                if ($request_method = &quot;PUT&quot;){
                        proxy_pass http://192.128.18.201;
                }
        }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="nginx hljs"><code class="nginx"><span class="hljs-section">server</span> {
        <span class="hljs-attribute">listen</span>       <span class="hljs-number">80</span>;
        <span class="hljs-attribute">server_name</span>  localhost;
        <span class="hljs-comment">#charset koi8-r;</span>
        <span class="hljs-comment">#access_log  logs/host.access.log  main;</span>
        <span class="hljs-attribute">location</span> / {
                <span class="hljs-attribute">proxy_pass</span> http://192.128.133.202;
                <span class="hljs-attribute">if</span> (<span class="hljs-variable">$request_method</span> = <span class="hljs-string">"PUT"</span>){
                        <span class="hljs-attribute">proxy_pass</span> http://192.128.18.201;
                }
        }
}</code></pre>
<h2 id="articleHeader14">参考</h2>
<p><a href="http://imweb.io/topic/56386972d12b230c26e1a17d" rel="nofollow noreferrer" target="_blank">Nginx能为前端开发带来什么？</a><br><a href="https://www.arayzou.com/2016/09/20/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%B8%88%E5%BA%94%E8%AF%A5%E7%9F%A5%E9%81%93%E7%9A%84nginx/" rel="nofollow noreferrer" target="_blank">前端工程师应该知道的Nginx</a><br><a href="https://www.itsns.org/article/2" rel="nofollow noreferrer" target="_blank">前端 Nginx https SSL proxy + 后端 Nginx http 应用的布署教程</a><br><a href="https://segmentfault.com/a/1190000002797606#articleHeader0">nginx配置location总结及rewrite规则写法</a><br><a href="https://segmentfault.com/a/1190000002797601#articleHeader3" target="_blank">nginx服务器安装及配置文件详解</a><br><a href="http://freeloda.blog.51cto.com/2033581/1288553" rel="nofollow noreferrer" target="_blank">http://freeloda.blog.51cto.com/2033581/1288553</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端nginx使用札记

## 原文链接
[https://segmentfault.com/a/1190000013781162](https://segmentfault.com/a/1190000013781162)

