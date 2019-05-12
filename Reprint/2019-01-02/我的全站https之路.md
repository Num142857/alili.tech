---
title: '我的全站https之路' 
date: 2019-01-02 2:30:09
hidden: true
slug: 9h0914yjhmp
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://www.hazyzh.com/b/170903002855" rel="nofollow noreferrer" target="_blank">文章地址</a></p>
<h3 id="articleHeader0">背景</h3>
<p>很早前就想着升级<code>https</code>,总觉得会很难自己想用nginx但是也没用过不会弄就一直拖着，前两天突然决定搞一下，没想到一天多时间就搞完了，所以人还是要多尝试，有这个想法还没搞的人要赶快动起来啦。这里记录一下防止后面自己在搞还要去查资料。</p>
<p>网站是自己个<a href="https://www.hazyzh.com/" rel="nofollow noreferrer" target="_blank">人的网站</a>，后台用的 <code>nodejs</code> ,服务器用的阿里云的 <a href="https://www.aliyun.com/product/ecs" rel="nofollow noreferrer" target="_blank"><code>ECS</code></a>,操作系统是linux - centOS。</p>
<h3 id="articleHeader1">目的</h3>
<p>网上介绍好处的文章很多，我自己升级主要是为了几个方面</p>
<ul>
<li>
<strong>ios</strong> 之前做网页用到手机定位，以及现在用 <code>react-native</code>,很多时候都要 <code>https</code>才可以。</li>
<li>微信小程序很多地方也要求<code>https</code>。</li>
<li>最重要的一点。。看到自己网站前面有个 <strong>不安全</strong> 的标志，感觉很不爽。</li>
</ul>
<h3 id="articleHeader2">流程</h3>
<p><span class="img-wrap"><img data-src="/img/bVUfKI?w=1107&amp;h=455" src="https://static.alili.tech/img/bVUfKI?w=1107&amp;h=455" alt="升级思路" title="升级思路" style="cursor: pointer; display: inline;"></span></p>
<p>自己的站点比较简单，目前就想着这样子做，因为后面可能在这个站点上实验些其他的东西，有可能会用到 <a href="https://www.docker.com/" rel="nofollow noreferrer" target="_blank">docker</a>,选择了用 <code>nginx</code> 来处理请求。</p>
<h4>ssl证书</h4>
<p>sll证书用的阿里云的 <a href="https://common-buy.aliyun.com/?spm=5176.2020520163.cas.1.4272e7a9332SOK&amp;commodityCode=cas#/buy" rel="nofollow noreferrer" target="_blank">云盾证书</a>, 因为自己服务器就在阿里云，当然最大的原因还是免费。操作还是简单的，进去一通乱点找到免费的那个购买就行了。</p>
<h4>服务器(centos)下载 nginx</h4>
<ol>
<li>
<p>编译环境,已经安装的可以忽视</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 安装make:
yum -y install gcc automake autoconf libtool make
# 安装g++
yum install gcc gcc-c++" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code class="linux"><span class="hljs-comment"># 安装make:</span>
yum -y <span class="hljs-keyword">install</span> gcc automake autoconf libtool make
<span class="hljs-comment"># 安装g++</span>
yum <span class="hljs-keyword">install</span> gcc gcc-c++</code></pre>
</li>
<li>
<p>选择安装目录，我选择安装在 <code>/usr/local/src</code> 下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd /usr/local/src" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code class="linux" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">cd</span> /usr/<span class="hljs-built_in">local</span>/src</code></pre>
</li>
<li>
<p>安装 <code>pcre</code>, <code>zlib</code>, 前者为了重写rewrite，后者为了gzip压缩。</p>
<p>注意下面wget的地址，可能你下载时候这个版本会没有资源，你可以直接访问那个地址进去看看最新的资源版本号是多少，个人意见如果你和我一样之前的版本都没有用过的话，有最新稳定版的就用最新的，这个后面会提到。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 安装 pcre 
cd /usr/local/src
wget ftp://ftp.csx.cam.ac.uk/pub/software/programming/pcre/pcre-8.40.tar.gz 
tar -zxvf pcre-8.40.tar.gz
cd pcre-8.40
./configure
make
make install

# 安装 zlib
wget https://zlib.net/zlib-1.2.11.tar.gz
tar -zxvf zlib-1.2.11.tar.gz
cd zlib-1.2.11
./configure
make
make install
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code class="linux"><span class="hljs-meta"># 安装 pcre </span>
cd /usr/<span class="hljs-keyword">local</span>/src
wget ftp:<span class="hljs-comment">//ftp.csx.cam.ac.uk/pub/software/programming/pcre/pcre-8.40.tar.gz </span>
tar -zxvf pcre<span class="hljs-number">-8.40</span>.tar.gz
cd pcre<span class="hljs-number">-8.40</span>
./configure
<span class="hljs-built_in">make</span>
<span class="hljs-built_in">make</span> install

<span class="hljs-meta"># 安装 zlib</span>
wget https:<span class="hljs-comment">//zlib.net/zlib-1.2.11.tar.gz</span>
tar -zxvf zlib<span class="hljs-number">-1.2</span><span class="hljs-number">.11</span>.tar.gz
cd zlib<span class="hljs-number">-1.2</span><span class="hljs-number">.11</span>
./configure
<span class="hljs-built_in">make</span>
<span class="hljs-built_in">make</span> install
</code></pre>
</li>
<li>
<p>安装 <code>ssl</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="wget https://www.openssl.org/source/openssl-1.0.1t.tar.gz
tar -zxvf openssl-1.0.1t.tar.gz
./config
make
make install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="linux">wget https:<span class="hljs-comment">//www.openssl.org/source/openssl-1.0.1t.tar.gz</span>
tar -zxvf openssl-<span class="hljs-number">1.0</span>.<span class="hljs-number">1</span>t<span class="hljs-selector-class">.tar</span><span class="hljs-selector-class">.gz</span>
./config
make
make install</code></pre>
</li>
<li>
<p>安装 <code>nginx</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
wget https://nginx.org/download/nginx-1.13.0.tar.gz
tar -zxvf nginx-1.13.0.tar.gz
cd nginx-1.13.0
# 下面是把 Nginx 安装到 /usr/local/nginx 目录下，注意后面跟的是刚才安装的pcre、zlib和ssl的源码地址，根据自己安装的调整

./configure --sbin-path=/usr/local/nginx/nginx \
--conf-path=/usr/local/nginx/nginx.conf \
--pid-path=/usr/local/nginx/nginx.pid \
--with-http_ssl_module \
--with-pcre=/usr/local/src/pcre-8.40 \
--with-zlib=/usr/local/src/zlib-1.2.11 \
--with-openssl=/usr/local/src/openssl-1.0.1t

make
make install
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code class="linux">
wget https://nginx.org/download/nginx-1.13.0.tar.gz
tar -zxvf nginx-1.13.0.tar.gz
cd nginx-1.13.0
# 下面是把 Nginx 安装到 /usr/local/nginx 目录下，注意后面跟的是刚才安装的pcre、zlib和ssl的源码地址，根据自己安装的调整

./configure --sbin-path=/usr/local/nginx/nginx \
-<span class="ruby">-conf-path=<span class="hljs-regexp">/usr/local</span><span class="hljs-regexp">/nginx/nginx</span>.conf \
</span>-<span class="ruby">-pid-path=<span class="hljs-regexp">/usr/local</span><span class="hljs-regexp">/nginx/nginx</span>.pid \
</span>-<span class="ruby">-with-http_ssl_module \
</span>-<span class="ruby">-with-pcre=<span class="hljs-regexp">/usr/local</span><span class="hljs-regexp">/src/pcre</span>-<span class="hljs-number">8.40</span> \
</span>-<span class="ruby">-with-zlib=<span class="hljs-regexp">/usr/local</span><span class="hljs-regexp">/src/zlib</span>-<span class="hljs-number">1.2</span>.<span class="hljs-number">11</span> \
</span>-<span class="ruby">-with-openssl=<span class="hljs-regexp">/usr/local</span><span class="hljs-regexp">/src/openssl</span>-<span class="hljs-number">1.0</span>.<span class="hljs-number">1</span>t
</span>
make
make install
</code></pre>
</li>
<li>启动</li>
</ol>
<p>确保80端口没有被占用，我之前node是在监听80端口的，现在把服务先停止。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    # 查看端口情况
   netstat -ano|grep 80
   # 启动nginx
   sudo /usr/local/nginx/nginx
   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code class="linux">
    <span class="hljs-comment"># 查看端口情况</span>
   netstat -ano|grep <span class="hljs-number">80</span>
   <span class="hljs-comment"># 启动nginx</span>
   sudo <span class="hljs-regexp">/usr/</span>local<span class="hljs-regexp">/nginx/</span>nginx
   </code></pre>
<p>启动后再重新打开你的站点，看到 <code>Welcome to nginx!</code> 界面就安装好了。</p>
<h4>配置ssl证书</h4>
<p>一般网上申请好证书，下载时候都会给你些配置提示，我这个阿里云的证书，下载时候就根据不同配置给了详细的答案。把证书下载下来，放到nginx文件中，我这里放在了一个新建的 <code>cert</code>文件夹中,然后配置nginx文件下的 <code>nginx.conf</code>开启 <code>https</code> .</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    
    # 配置前先备份总没有错
    cp nginx.conf nginx.conf.back
    
    # 进入配置文件后找到下面https的配置，有个 `# HTTPS server`的注释  
    server {
        listen 443;
        server_name 你的证书站点；
        ssl on;
        root html;
        index index.html index.htm;
        ssl_certificate   cert/你的证书;
        ssl_certificate_key  cert/你的key;
        ssl_session_timeout 5m;
        ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
        ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
        ssl_prefer_server_ciphers on;
        location / {
            root html;
            index index.html index.htm;
        }
    }
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code class="linux">    
    <span class="hljs-comment"># 配置前先备份总没有错</span>
    <span class="hljs-attribute">cp</span> nginx.conf nginx.conf.back
    
    <span class="hljs-comment"># 进入配置文件后找到下面https的配置，有个 `# HTTPS server`的注释  </span>
    server {
        <span class="hljs-attribute">listen</span> <span class="hljs-number">443</span>;
        <span class="hljs-attribute">server_name</span> 你的证书站点；
        ssl <span class="hljs-literal">on</span>;
        <span class="hljs-attribute">root</span> html;
        <span class="hljs-attribute">index</span> index.html index.htm;
        <span class="hljs-attribute">ssl_certificate</span>   cert/你的证书;
        <span class="hljs-attribute">ssl_certificate_key</span>  cert/你的key;
        <span class="hljs-attribute">ssl_session_timeout</span> <span class="hljs-number">5m</span>;
        <span class="hljs-attribute">ssl_ciphers</span> ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
        <span class="hljs-attribute">ssl_protocols</span> TLSv1 TLSv1.<span class="hljs-number">1</span> TLSv1.<span class="hljs-number">2</span>;
        <span class="hljs-attribute">ssl_prefer_server_ciphers</span> <span class="hljs-literal">on</span>;
        <span class="hljs-attribute">location</span> / {
            <span class="hljs-attribute">root</span> html;
            <span class="hljs-attribute">index</span> index.html index.htm;
        }
    }
    </code></pre>
<p>配置好之后重启你的nginx, <code>sudo /usr/local/nginx/nginx -s reload</code> 然后用<code>https</code> 访问你的站点,如果可以看到欢迎界面就说明成功了，我这里被坑了一下，因为服务器默认没有开启443端口的权限，我就一直访问不了，后面去阿里的控制台加了443端口权限就可以了。</p>
<h4>全站https</h4>
<p>说白了就是访问<code>http</code>的请求强行转到<code>https</code>上，还是配置nginx,把上面监听80端口的server重定向到https</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
    server {
        listen       80;
        server_name  xxxx.com www.xxxx.com;
        rewrite ^ https://$http_host$request_uri? permanent;
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code class="linux">
    <span class="hljs-section">server</span> {
        <span class="hljs-attribute">listen</span>       <span class="hljs-number">80</span>;
        <span class="hljs-attribute">server_name</span>  xxxx.com www.xxxx.com;
        <span class="hljs-attribute">rewrite</span><span class="hljs-regexp"> ^</span> https://<span class="hljs-variable">$http_host</span><span class="hljs-variable">$request_uri</span>? <span class="hljs-literal">permanent</span>;
    }
</code></pre>
<p>设置好后重启nginx,再去访问自己站点的<code>http</code>链接，应该可以看到自动跳转到了<code>https</code>,这一步应该问题不大，我这里遇到了一个奇怪的问题，访问主站点时候居然重定向到了这个网站<code>https://localhost</code>,还以为配置不对搞了半天不知道哪里的问题，后面把我的<code>chrome</code> 的缓存啥的清理一遍居然自己好了。</p>
<h4>反向代理到真正的服务</h4>
<p>这里主要就是把https的请求即监听433端口的那个<code>server</code>,代理到真正的处理后台上。我这里把<code>nodejs</code>监听的端口挑到了8080,还是配置nginx,修改上面433端口server配置里面<code>location /</code>里面到内容。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    
    location / {
        # 代理用户真实信息
        proxy_set_header Host $http_host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-NginX-Proxy true;
        # 要代理的本地后台 我的是8080端口
        proxy_pass  http://127.0.0.1:8080;
        
        # 这里是因为我站点有websocket服务，nginx (>= 1.3.13) 版本可以代理，所以说用尽量新的版本比较ok.
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection &quot;upgrade&quot;;
    }
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code class="linux">    
    <span class="hljs-attribute">location</span> / {
        <span class="hljs-comment"># 代理用户真实信息</span>
        <span class="hljs-attribute">proxy_set_header</span> Host <span class="hljs-variable">$http_host</span>;
        <span class="hljs-attribute">proxy_set_header</span> X-Real-IP <span class="hljs-variable">$remote_addr</span>;
        <span class="hljs-attribute">proxy_set_header</span> X-Forwarded-For <span class="hljs-variable">$proxy_add_x_forwarded_for</span>;
        <span class="hljs-attribute">proxy_set_header</span> X-NginX-Proxy <span class="hljs-literal">true</span>;
        <span class="hljs-comment"># 要代理的本地后台 我的是8080端口</span>
        <span class="hljs-attribute">proxy_pass</span>  http://127.0.0.1:8080;
        
        <span class="hljs-comment"># 这里是因为我站点有websocket服务，nginx (&gt;= 1.3.13) 版本可以代理，所以说用尽量新的版本比较ok.</span>
        <span class="hljs-attribute">proxy_http_version</span> <span class="hljs-number">1</span>.<span class="hljs-number">1</span>;
        <span class="hljs-attribute">proxy_set_header</span> Upgrade <span class="hljs-variable">$http_upgrade</span>;
        <span class="hljs-attribute">proxy_set_header</span> Connection <span class="hljs-string">"upgrade"</span>;
    }
    </code></pre>
<p>设置好之后重启nginx,如果正常的话配置就差不多可以了。</p>
<h4>第三方服务和一些问题</h4>
<p>因为我的网站还没做多久，所以历史问题还不严重，大概看一看就知道那些第三方链接不对，现在基本上服务商都提供<code>https</code>的资源了，把不合格的资源换成<code>https</code>试一试，可以请求的话就去改代码吧,这里遇到两个问题。</p>
<ul>
<li>
<a href="https://www.qiniu.com/" rel="nofollow noreferrer" target="_blank">七牛云</a> 的图片资源，改<code>https</code> 后请求不了。去七牛云搞了半天上传了自己的证书什么的，还是不知道在哪里配置。索性自己网站用的图片还少，愤怒的打算用自己站点之前做的文件上传服务了，后面想想我自己1M的网速，还是忍住了。后面发现阿里云的 <a href="https://www.aliyun.com/product/oss/" rel="nofollow noreferrer" target="_blank">oss</a>,可以用https请求，就把图片资源换成阿里云的了。</li>
<li>自己的<code>websocket</code> 服务用的nodejs的<code>socket.io</code>库，还用到了根据用户ip定位的功能，转发后原来代码里获取到的ip地址全变成了<code>127.0.0.1</code>,还以为配置不对改了半天，后面打印出库说明文件里获取ip信息的<code>client.handshake</code>对象。发现用户ip是<code>headers</code>的<code>x-real-ip</code>属性,所以改代码根据这个属性获取ip,然后可以正常获取ip信息了。</li>
</ul>
<p>到这里全站https基本都配置好了，因为自己网站比较新，全站转过来还挺轻松了，可以想象如果维护很久了都站点去转肯定要遇见n多的问题。所以大家有这个想法的就早点动手吧。</p>
<h3 id="articleHeader3">参考资料</h3>
<ul>
<li><a href="http://www.nginx.cn/install" rel="nofollow noreferrer" target="_blank">Nginx安装</a></li>
<li><a href="http://www.jianshu.com/p/d5114a2a2052" rel="nofollow noreferrer" target="_blank">Centos下 Nginx安装与配置</a></li>
<li><a href="https://stackoverflow.com/questions/5009324/node-js-nginx-what-now/5015178#5015178" rel="nofollow noreferrer" target="_blank">Node.js + Nginx - What now?</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
我的全站https之路

## 原文链接
[https://segmentfault.com/a/1190000010984590](https://segmentfault.com/a/1190000010984590)

