---
title: '【vuejs项目部署】使用docker基于daocloud自动化部署到自己的主机' 
date: 2018-12-19 2:30:07
hidden: true
slug: gpo783z8sre
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">在前端开发中，部署项目是我们经常发生的事情</h2>
<blockquote>如果在你的公司中，项目部署需要你来负责，怎么优雅无痛的让你的项目自动上线<br>在之前的文章中，写过几篇关于项目上线的方式，大家可以翻阅这个专栏去看。<br>今天主要讲怎么优雅的部署vue项目，使用docker容器，配合git webhook 钩子，当我们触发到git hook 事件，就自动化部署。这里当然建议是 tag事件。</blockquote>
<h2 id="articleHeader1">嘿，你想快速get这门技能？</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="你可以的！" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">你可以的！</code></pre>
<blockquote>在这里我已经写完了项目的基本的文件，你只需要把这个项目复制到你的vue项目中即可！</blockquote>
<p>项目地址 <a href="https://github.com/devdocker/dao-vue.git" rel="nofollow noreferrer" target="_blank">docker vue项目</a></p>
<h3 id="articleHeader2">使用说明</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://github.com/devdocker/dao-vue

cp -r dao-vue vueitem

vueitem 是你的vue项目地址
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://github.com/devdocker/dao-vue

cp -r dao-vue vueitem

vueitem 是你的vue项目地址
</code></pre>
<h3 id="articleHeader3">此时你项目文件结构</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012677125?w=376&amp;h=1100" src="https://static.alili.tech/img/remote/1460000012677125?w=376&amp;h=1100" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader4">然后去 daocloud.io 官网新建一个基于这个项目的项目</h2>
<blockquote>如果你不了解 daocloud.io ，没关系，去注册，看文档，今后会写关于daocloud.io详细文档。</blockquote>
<p>如果你用过daocloud ，请去创建一个项目，编译发布，设置触发条件，自动化发布到你的主机。<br>当然部署到你的服务器上后，把端口写死，不要动态的。</p>
<h2 id="articleHeader5">然后可以使用nginx upstream proxy_pass 反向代理来解决跨域问题</h2>
<p>配置如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="upstream webfenxi {
        server 127.0.0.1:8083; # 这是服务器使用docker启动的端口
}
server
    {
        listen 80;
        #listen [::]:80;
        server_name webfenxi.com ; # 这是绑定的自己的域名
        index index.html index.htm index.php default.html default.htm default.php;
        root  /home/wwwroot/webfenxi.com;

        include other.conf;
        #error_page   404   /404.html;

        # Deny access to PHP files in specific directory
        #location ~ /(wp-content|uploads|wp-includes|images)/.*\.php$ { deny all; }

        include enable-php.conf;

        location / {
                proxy_set_header X-Real-Ip $remote_addr;
                proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;

                proxy_set_header X-Nginx-Proxy true;
                proxy_pass http://webfenxi;  # 代理地址
                proxy_redirect off;
               # try_files $uri $uri/ /index.html;
             }

          location /v1/ {
             proxy_pass http://api.xxxx.com/v1/;  #代理的接口，解决跨域问题
          }

          location ~ /.well-known {
              allow all;
          }

          location ~ /\.
          {
              deny all;
          }

          access_log  /home/wwwlogs/webfenxi.com.log;
      }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code><span class="hljs-attribute">upstream</span> webfenxi {
        <span class="hljs-attribute">server</span> <span class="hljs-number">127.0.0.1:8083</span>; <span class="hljs-comment"># 这是服务器使用docker启动的端口</span>
}
<span class="hljs-section">server</span>
    {
        <span class="hljs-attribute">listen</span> <span class="hljs-number">80</span>;
        <span class="hljs-comment">#listen [::]:80;</span>
        <span class="hljs-attribute">server_name</span> webfenxi.com ; <span class="hljs-comment"># 这是绑定的自己的域名</span>
        <span class="hljs-attribute">index</span> index.html index.htm index.php default.html default.htm default.php;
        <span class="hljs-attribute">root</span>  /home/wwwroot/webfenxi.com;

        <span class="hljs-attribute">include</span> other.conf;
        <span class="hljs-comment">#error_page   404   /404.html;</span>

        <span class="hljs-comment"># Deny access to PHP files in specific directory</span>
        <span class="hljs-comment">#location ~ /(wp-content|uploads|wp-includes|images)/.*\.php$ { deny all; }</span>

        <span class="hljs-attribute">include</span> enable-php.conf;

        <span class="hljs-attribute">location</span> / {
                <span class="hljs-attribute">proxy_set_header</span> X-Real-Ip <span class="hljs-variable">$remote_addr</span>;
                <span class="hljs-attribute">proxy_set_header</span> X-Forward-For <span class="hljs-variable">$proxy_add_x_forwarded_for</span>;

                <span class="hljs-attribute">proxy_set_header</span> X-Nginx-Proxy <span class="hljs-literal">true</span>;
                <span class="hljs-attribute">proxy_pass</span> http://webfenxi;  <span class="hljs-comment"># 代理地址</span>
                <span class="hljs-attribute">proxy_redirect</span> <span class="hljs-literal">off</span>;
               <span class="hljs-comment"># try_files $uri $uri/ /index.html;</span>
             }

          <span class="hljs-attribute">location</span> /v1/ {
             <span class="hljs-attribute">proxy_pass</span> http://api.xxxx.com/v1/;  <span class="hljs-comment">#代理的接口，解决跨域问题</span>
          }

          <span class="hljs-attribute">location</span> <span class="hljs-regexp">~ /.well-known</span> {
              <span class="hljs-attribute">allow</span> all;
          }

          <span class="hljs-attribute">location</span> <span class="hljs-regexp">~ /\.</span>
          {
              <span class="hljs-attribute">deny</span> all;
          }

          <span class="hljs-attribute">access_log</span>  /home/wwwlogs/webfenxi.com.log;
      }
</code></pre>
<h2 id="articleHeader6">另一种方式完全基于docker</h2>
<p>今后会写详细的文章</p>
<blockquote>如果你是中小型企业，建议使用daocloud.io 比较方便，快速。</blockquote>
<p>今天把之前的 webfenxi.com  这个应用，使用vue重构了一下。<br>项目开源，基于docker daocloud.io<br>地址：<a href="https://github.com/wsdo/docker-vue.git" rel="nofollow noreferrer" target="_blank">docker vue项目</a></p>
<p>大家可以参考一下 效果：webfenxi.com<br>作用：分析你网站使用什么cms，系统，编程语言，组成</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【vuejs项目部署】使用docker基于daocloud自动化部署到自己的主机

## 原文链接
[https://segmentfault.com/a/1190000012677120](https://segmentfault.com/a/1190000012677120)

