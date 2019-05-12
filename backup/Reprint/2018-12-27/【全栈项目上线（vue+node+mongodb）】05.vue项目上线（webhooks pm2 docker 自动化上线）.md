---
title: '【全栈项目上线（vue+node+mongodb）】05.vue项目上线（webhooks pm2 docker 自动化上线）' 
date: 2018-12-27 2:30:12
hidden: true
slug: beqkpau1jt
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">项目上线常用方案：</h2>
<blockquote><p>把本地的代码打包压缩一份上传到服务器，然后解压到相应地方<br>从GitHub拉去到相应的地方<br> 配置git webhooks 自动化上线<br> 配置 pm2 自动化上线<br> 使用docker 自动化上线</p></blockquote>
<h3 id="articleHeader1">我们以vnshop项目作为案例</h3>
<p><a href="https://github.com/itguide/vnshop" rel="nofollow noreferrer" target="_blank">https://github.com/itguide/vn...</a></p>
<h3 id="articleHeader2">把本地的代码打包压缩一份上传到服务器，然后解压到相应地方</h3>
<blockquote><p>把本地的代码压缩一下，然后上传到服务器</p></blockquote>
<p>在我们的vue项目里面的client里面执行以下命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run build " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> build </span></code></pre>
<blockquote><p>这个命令用来把vue项目编译成生产环境需要的文件</p></blockquote>
<blockquote><p>生成一个dist 文件夹，把这个文件夹，压缩成zip格式的文件</p></blockquote>
<p>然后通过xshell 上传到服务器</p>
<h4>第一步：安装 lrzsz</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="apt-get install lrzsz -y" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code style="word-break: break-word; white-space: initial;">apt-<span class="hljs-keyword">get</span> install lrzsz -y</code></pre>
<p>sz：将选定的文件发送到本地机器<br>rz：运行该命令会弹出一个文件选择窗口，从本地选择文件上传到Linux服务器<br>rz，sz是Linux/Unix同Windows进行ZModem文件传输的命令行工具，</p>
<h4>第二步：把本地的压缩打包的项目文件通过rz命令上传到服务器</h4>
<p>在 /home/wwwroot/ 目录里面执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd /home/wwwroot/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code style="word-break: break-word; white-space: initial;">cd /<span class="hljs-built_in">home</span>/wwwroot/</code></pre>
<p>执行rz命令，然后跳出一个框，让你选择本地需要上传到服务器的文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="rz" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">rz</span></code></pre>
<p>在服务器哪执行的命令，就上传到哪去</p>
<h4>第三步：把上传后的项目，解压复制到网站访问的文件夹里面</h4>
<h4>添加一个网站，虚拟主机</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="lnmp vhost add
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>lnmp vhost <span class="hljs-keyword">add</span><span class="bash">
</span></code></pre>
<p>添加网详细请看 <a href="https://segmentfault.com/a/1190000011791001">https://segmentfault.com/a/11...</a></p>
<p>把上传的压缩包解压：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" unzip dist.zip" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"> <span class="hljs-selector-tag">unzip</span> <span class="hljs-selector-tag">dist</span><span class="hljs-selector-class">.zip</span></code></pre>
<p>解压完之后，生成一个 dist文件夹<br>需要把这个文件夹里面的所有文件复制到 vn.itnote.cn文件夹里面去，执行以下命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cp -r dist/* vn.itnote.cn" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">cp</span> -r dist/* <span class="hljs-keyword">vn</span>.itnote.<span class="hljs-keyword">cn</span></code></pre>
<blockquote><p>cp 是拷贝  -r  是深度拷贝，如果里面是文件，需要用 -r  /* 代表把dist 文件夹里面的所有文件都拷贝  后面的vn.itnote.cn 文件夹，是要拷贝的目的地</p></blockquote>
<h3 id="articleHeader3">从GitHub拉取项目到相应的地方</h3>
<h3 id="articleHeader4">第一步：域名绑定到这个主机，并且创建一个虚拟主机</h3>
<p><span class="img-wrap"><img data-src="/img/bVXEhg?w=825&amp;h=175" src="https://static.alili.tech/img/bVXEhg?w=825&amp;h=175" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="lnmp vhost add

创建详细过程请看 https://segmentfault.com/a/1190000011791001" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code>lnmp vhost <span class="hljs-keyword">add</span>

创建详细过程请看 https:<span class="hljs-comment">//segmentfault.com/a/1190000011791001</span></code></pre>
<p>### 第二步：把项目拉取到主机</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd /home/wwwroot

git clone https://github.com/itguide/vnshop10.git vnshop

npm install -g cnpm --registry=https://registry.npm.taobao.org

cd /home/wwwroot/vnshop/client

cnpm i

npm run build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>cd <span class="hljs-regexp">/home/</span>wwwroot

git clone <span class="hljs-string">https:</span><span class="hljs-comment">//github.com/itguide/vnshop10.git vnshop</span>

npm install -g cnpm --registry=<span class="hljs-string">https:</span><span class="hljs-comment">//registry.npm.taobao.org</span>

cd <span class="hljs-regexp">/home/</span>wwwroot<span class="hljs-regexp">/vnshop/</span>client

cnpm i

npm run build</code></pre>
<h4>第三步：修改Nginx 配置</h4>
<p>修改配置</p>
<blockquote><p>别傻乎乎的复制，后面要修改自己需要配置的文件</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vim /usr/local/nginx/conf/vhost/vx.itnote.cn.conf" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">vim /usr/local/nginx/conf/vhost/vx<span class="hljs-selector-class">.itnote</span><span class="hljs-selector-class">.cn</span><span class="hljs-selector-class">.conf</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVXEf9?w=1360&amp;h=343" src="https://static.alili.tech/img/bVXEf9?w=1360&amp;h=343" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
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
<h4>记得重启Nginx 配置哦</h4>
<p>重启命令</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/etc/init.d/nginx restart" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;"><span class="hljs-regexp">/etc/i</span>nit.d<span class="hljs-regexp">/nginx restart</span></code></pre>
<p>最后在浏览器访问 vx.itnote.cn</p>
<h2 id="articleHeader5">稍后即将奉上</h2>
<h3 id="articleHeader6">配置git webhooks 自动化上线</h3>
<h3 id="articleHeader7">配置 pm2 自动化上线</h3>
<h3 id="articleHeader8">使用docker 自动化上线</h3>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【全栈项目上线（vue+node+mongodb）】05.vue项目上线（webhooks pm2 docker 自动化上线）

## 原文链接
[https://segmentfault.com/a/1190000011793908](https://segmentfault.com/a/1190000011793908)

