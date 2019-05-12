---
title: '使用Docker Compose部署Django和Vue.js应用' 
date: 2019-01-08 2:30:11
hidden: true
slug: fbd5kdztg34
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>本文主要内容关于使用docker-compose实践部署后端django-rest-framework和前端vue.js应用。记录其中遇到的一些坑以及解决办法。</p>
<h1 id="articleHeader1">准备Docker-compose环境</h1>
<p>系统：Ubuntu 16.04(阿里云)<br>代码中用户名：test</p>
<h2 id="articleHeader2">安装Docker</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# install docker
## prepare
echo 'Preparing...'
sudo apt update
sudo apt upgrade -y
sudo apt install -y linux-image-extra-$(uname -r) linux-image-extra-virtual
## docker
echo 'Installing docker...'
sudo apt remove -y docker-ce docker-engine docker.io
wget -qO- http://acs-public-mirror.oss-cn-hangzhou.aliyuncs.com/docker-engine/internet | sh
sudo apt autoremove -y

sudo usermod -aG docker ${USER}

## docker Aliyun accelerator
## https://cr.console.aliyun.com/#/accelerator
echo 'Configuring docker registry mirrors...'
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json <<-'EOF'
{
  &quot;registry-mirrors&quot;: [&quot;https://<your-own>.mirror.aliyuncs.com&quot;]
}
EOF

exists(){
  command -v &quot;$1&quot; >/dev/null 2>&amp;1
}

echo 'Installing docker-compose...'
if ! exists pip; then
    sudo apt install python-pip
fi
sudo python `which pip` install docker-compose

echo 'Restarting docker...'
sudo systemctl daemon-reload
sudo systemctl restart docker" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># install docker</span>
<span class="hljs-comment">## prepare</span>
<span class="hljs-built_in">echo</span> <span class="hljs-string">'Preparing...'</span>
sudo apt update
sudo apt upgrade -y
sudo apt install -y linux-image-extra-$(uname -r) linux-image-extra-virtual
<span class="hljs-comment">## docker</span>
<span class="hljs-built_in">echo</span> <span class="hljs-string">'Installing docker...'</span>
sudo apt remove -y docker-ce docker-engine docker.io
wget -qO- http://acs-public-mirror.oss-cn-hangzhou.aliyuncs.com/docker-engine/internet | sh
sudo apt autoremove -y

sudo usermod <span class="hljs-_">-a</span>G docker <span class="hljs-variable">${USER}</span>

<span class="hljs-comment">## docker Aliyun accelerator</span>
<span class="hljs-comment">## https://cr.console.aliyun.com/#/accelerator</span>
<span class="hljs-built_in">echo</span> <span class="hljs-string">'Configuring docker registry mirrors...'</span>
sudo mkdir -p /etc/docker
sudo tee /etc/docker/daemon.json &lt;&lt;-<span class="hljs-string">'EOF'</span>
{
  <span class="hljs-string">"registry-mirrors"</span>: [<span class="hljs-string">"https://&lt;your-own&gt;.mirror.aliyuncs.com"</span>]
}
EOF

<span class="hljs-function"><span class="hljs-title">exists</span></span>(){
  <span class="hljs-built_in">command</span> -v <span class="hljs-string">"<span class="hljs-variable">$1</span>"</span> &gt;/dev/null 2&gt;&amp;1
}

<span class="hljs-built_in">echo</span> <span class="hljs-string">'Installing docker-compose...'</span>
<span class="hljs-keyword">if</span> ! exists pip; <span class="hljs-keyword">then</span>
    sudo apt install python-pip
<span class="hljs-keyword">fi</span>
sudo python `<span class="hljs-built_in">which</span> pip` install docker-compose

<span class="hljs-built_in">echo</span> <span class="hljs-string">'Restarting docker...'</span>
sudo systemctl daemon-reload
sudo systemctl restart docker</code></pre>
<h2 id="articleHeader3">部署</h2>
<h3 id="articleHeader4">目录结构</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── .env // 环境变量
├── docker-compose.yml
├── backend // 放置后台django文件
├── frontend // 放置前端vue编译后代码
└── nginx // nginx相关配置
    ├── backend.conf
    ├── Dockerfile
    └── frontend.conf" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>.
├── <span class="hljs-selector-class">.env</span> <span class="hljs-comment">// 环境变量</span>
├── docker-compose<span class="hljs-selector-class">.yml</span>
├── backend <span class="hljs-comment">// 放置后台django文件</span>
├── frontend <span class="hljs-comment">// 放置前端vue编译后代码</span>
└── nginx <span class="hljs-comment">// nginx相关配置</span>
    ├── backend<span class="hljs-selector-class">.conf</span>
    ├── Dockerfile
    └── frontend.conf</code></pre>
<h3 id="articleHeader5">具体配置</h3>
<h4><code>docker-compose.yml</code></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="version: '3'

services:
  web:
    restart: always
    build: ./backend
    expose:
      - &quot;8000&quot;
    volumes:
      - ./backend:/code
    env_file: .env
    links:
      - db
    depends_on:
      - db
    command: [&quot;/code/wait-for-it.sh&quot;, &quot;db:3306&quot;, &quot;--&quot;, &quot;bash&quot;,&quot;startup.sh&quot;]
  nginx:
    restart: always
    build: ./nginx
    ports:
      - &quot;80:80&quot;
    volumes:
      - ./frontend:/usr/share/nginx/html/frontend:ro
      - ./backend/public:/usr/share/nginx//html/backend/public:ro
    links:
      - web
    depends_on:
      - web
  db:
    restart: always
    image: mysql:latest
    env_file: .env
    volumes:
      - ./data/initsql:/docker-entrypoint-initdb.d
      - ./data/db:/var/lib/mysql
    command: [mysqld, --character-set-server=utf8, --collation-server=utf8_unicode_ci]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="yaml hljs"><code class="yaml"><span class="hljs-attr">version:</span> <span class="hljs-string">'3'</span>

<span class="hljs-attr">services:</span>
<span class="hljs-attr">  web:</span>
<span class="hljs-attr">    restart:</span> <span class="hljs-string">always</span>
<span class="hljs-attr">    build:</span> <span class="hljs-string">./backend</span>
<span class="hljs-attr">    expose:</span>
<span class="hljs-bullet">      -</span> <span class="hljs-string">"8000"</span>
<span class="hljs-attr">    volumes:</span>
<span class="hljs-bullet">      -</span> <span class="hljs-string">./backend:/code</span>
<span class="hljs-attr">    env_file:</span> <span class="hljs-string">.env</span>
<span class="hljs-attr">    links:</span>
<span class="hljs-bullet">      -</span> <span class="hljs-string">db</span>
<span class="hljs-attr">    depends_on:</span>
<span class="hljs-bullet">      -</span> <span class="hljs-string">db</span>
<span class="hljs-attr">    command:</span> <span class="hljs-string">["/code/wait-for-it.sh",</span> <span class="hljs-string">"db:3306"</span><span class="hljs-string">,</span> <span class="hljs-string">"--"</span><span class="hljs-string">,</span> <span class="hljs-string">"bash"</span><span class="hljs-string">,"startup.sh"]</span>
<span class="hljs-attr">  nginx:</span>
<span class="hljs-attr">    restart:</span> <span class="hljs-string">always</span>
<span class="hljs-attr">    build:</span> <span class="hljs-string">./nginx</span>
<span class="hljs-attr">    ports:</span>
<span class="hljs-bullet">      -</span> <span class="hljs-string">"80:80"</span>
<span class="hljs-attr">    volumes:</span>
<span class="hljs-bullet">      -</span> <span class="hljs-string">./frontend:/usr/share/nginx/html/frontend:ro</span>
<span class="hljs-bullet">      -</span> <span class="hljs-string">./backend/public:/usr/share/nginx//html/backend/public:ro</span>
<span class="hljs-attr">    links:</span>
<span class="hljs-bullet">      -</span> <span class="hljs-string">web</span>
<span class="hljs-attr">    depends_on:</span>
<span class="hljs-bullet">      -</span> <span class="hljs-string">web</span>
<span class="hljs-attr">  db:</span>
<span class="hljs-attr">    restart:</span> <span class="hljs-string">always</span>
<span class="hljs-attr">    image:</span> <span class="hljs-attr">mysql:latest</span>
<span class="hljs-attr">    env_file:</span> <span class="hljs-string">.env</span>
<span class="hljs-attr">    volumes:</span>
<span class="hljs-bullet">      -</span> <span class="hljs-string">./data/initsql:/docker-entrypoint-initdb.d</span>
<span class="hljs-bullet">      -</span> <span class="hljs-string">./data/db:/var/lib/mysql</span>
<span class="hljs-attr">    command:</span> <span class="hljs-string">[mysqld,</span> <span class="hljs-bullet">--character-set-server=utf8,</span> <span class="hljs-bullet">--collation-server=utf8_unicode_ci]</span></code></pre>
<p>第一次使用docker-compose部署，从网上参考了许多例子。但是由于docker-compose个版本的语法改动不小，遇到很多坑：</p>
<h4>不同容器共享数据(host主机上的数据)</h4>
<blockquote>
<p>有些例子使用<code>volumes_from</code>，但是version 3已经删除该设置项<a href="https://docs.docker.com/compose/compose-file/compose-versioning/#version-3" rel="nofollow noreferrer" target="_blank">更新变化</a>。<br>官方推荐在根节点（与<code>services</code>同级）下配置<code>volumes</code>，但是没法映射到host主机的文件，有个插件<a href="https://github.com/CWSpear/local-persist" rel="nofollow noreferrer" target="_blank"><code>local-persist</code></a>可以做到，但是不想依赖第三方插件。只能使用麻烦点的写法：在每个service的<code>volume</code>设置项里重复映射host主机的文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="web:
  volumes:
    - ./backend:/code
nginx:
  volumes:
    - ./backend/public:/usr/share/nginx//html/backend/public:ro" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="yaml hljs"><code class="yaml"><span class="hljs-attr">web:</span>
<span class="hljs-attr">  volumes:</span>
<span class="hljs-bullet">    -</span> <span class="hljs-string">./backend:/code</span>
<span class="hljs-attr">nginx:</span>
<span class="hljs-attr">  volumes:</span>
<span class="hljs-bullet">    -</span> <span class="hljs-string">./backend/public:/usr/share/nginx//html/backend/public:ro</span></code></pre>
</blockquote>
<h4>不同容器互相通信</h4>
<blockquote>使用links实现容器间通信。配置需要访问的容器于links配置项下，没什么毛病。</blockquote>
<h4>容器启动顺序</h4>
<blockquote>
<p>实现容器按顺序启动，需要用到<code>depends_on</code>。</p>
<p>但是会有一个问题：<code>depends_on</code>只保证启动顺序，而我们的实际需求是：web容器启动的commands必须等到mysql完全启动，web容器的command才可以执行。因为我们加了<code>restart: always</code>，所以会导致web容器不断重启直到db容器启动完成。</p>
<p>我的解决办法是：给web容器的启动命令加上对mysql服务可用的查询，使用了一个查询脚本<a href="https://github.com/vishnubob/wait-for-it" rel="nofollow noreferrer" target="_blank">wait-for-it</a>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="command: [&quot;/code/wait-for-it.sh&quot;, &quot;db:3306&quot;, &quot;--&quot;, &quot;bash&quot;,&quot;startup.sh&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="dockerfile hljs"><code class="dockerfile" style="word-break: break-word; white-space: initial;">command: [<span class="hljs-string">"/code/wait-for-it.sh"</span>, <span class="hljs-string">"db:3306"</span>, <span class="hljs-string">"--"</span>, <span class="hljs-string">"bash"</span>,<span class="hljs-string">"startup.sh"</span>]</code></pre>
</blockquote>
<h4>环境变量</h4>
<blockquote>
<p>会有多个容器使用相同环境变量的情况，所以都放在<code>.env</code>文件里</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="DEBUG=false

MYSQL_HOST=db
MYSQL_DATABASE=mydb
MYSQL_ROOT_PASSWORD=mypass" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code class="shell"><span class="hljs-attr">DEBUG</span>=<span class="hljs-literal">false</span>

<span class="hljs-attr">MYSQL_HOST</span>=db
<span class="hljs-attr">MYSQL_DATABASE</span>=mydb
<span class="hljs-attr">MYSQL_ROOT_PASSWORD</span>=mypass</code></pre>
</blockquote>
<h4>关于Mysql官方镜像配置</h4>
<blockquote>
<ul><li>
<p>可以定义volume持久化数据库文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="volumes:" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="yaml hljs"><code class="yaml" style="word-break: break-word; white-space: initial;"><span class="hljs-attr">volumes:</span></code></pre>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
- 如果有初始数据需要导入，可以定义volume映射到`/docker-entrypoint-initdb.d`：
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>
- 如果有初始数据需要导入，可以定义<span class="hljs-keyword">volume</span><span class="bash">映射到`/docker-entrypoint-initdb.d`：
</span></code></pre>
<p>volumes:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- ./data/initsql:/docker-entrypoint-initdb.d" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">- ./data/initsql:/docker-<span class="hljs-keyword">entrypoint</span><span class="bash">-initdb.d</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="注意： 该配置只有在`/var/lib/mysql/`下的`mysql`目录不存在时才会生效。也就是说，一旦容器启动过一次，之后就在也不会导入`/docker-entrypoint-initdb.d`里的文件，除非手动清空`/var/lib/mysql/`（或host主机的`./data/db`目录）。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code>注意： 该配置只有在`/var/lib/mysql/`下的`mysql`目录不存在时才会生效。也就是说，一旦容器启动过一次，之后就在也不会导入`/docker-entrypoint-initdb.d`里的文件，除非手动清空`/var/lib/mysql/`（或host主机的`./data/db`目录）。
</code></pre>
</blockquote>
<h4>关于Nginx容器配置</h4>
<blockquote>
<p><code>Dockerfile</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="FROM nginx:alpine

RUN rm /etc/nginx/conf.d/default.conf

ADD frontend.conf /etc/nginx/conf.d/
ADD backend.conf /etc/nginx/conf.d/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="dockerfile hljs"><code class="dockerfile"><span class="hljs-keyword">FROM</span> nginx:alpine

<span class="hljs-keyword">RUN</span><span class="bash"> rm /etc/nginx/conf.d/default.conf
</span>
<span class="hljs-keyword">ADD</span><span class="bash"> frontend.conf /etc/nginx/conf.d/
</span><span class="hljs-keyword">ADD</span><span class="bash"> backend.conf /etc/nginx/conf.d/</span></code></pre>
<p><code>frontend.conf</code> - vue app build files</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="server {
    listen 80 deferred;
    server_name new.bylie.cn;

    root /usr/share/nginx/html/frontend;

    location / {
        try_files $uri $uri/ /index.html =404;
    }

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   /usr/share/nginx/html;
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="nginx hljs"><code class="nginx"><span class="hljs-section">server</span> {
    <span class="hljs-attribute">listen</span> <span class="hljs-number">80</span> deferred;
    <span class="hljs-attribute">server_name</span> new.bylie.cn;

    <span class="hljs-attribute">root</span> /usr/share/nginx/html/frontend;

    <span class="hljs-attribute">location</span> / {
        <span class="hljs-attribute">try_files</span> <span class="hljs-variable">$uri</span> <span class="hljs-variable">$uri</span>/ /index.html =<span class="hljs-number">404</span>;
    }

    <span class="hljs-comment"># redirect server error pages to the static page /50x.html</span>
    <span class="hljs-comment">#</span>
    <span class="hljs-attribute">error_page</span>   <span class="hljs-number">500</span> <span class="hljs-number">502</span> <span class="hljs-number">503</span> <span class="hljs-number">504</span>  /50x.html;
    <span class="hljs-attribute">location</span> = /50x.html {
        <span class="hljs-attribute">root</span>   /usr/share/nginx/html;
    }
}
</code></pre>
<p><code>backend.conf</code> - django app</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="server {
    # use 'listen 80 deferred;' for Linux
    # use 'listen 80 accept_filter=httpready;' for FreeBSD
    listen 80 deferred;
    client_max_body_size 5M;

    # set the correct host(s) for your site
    server_name service.bylie.cn;

    keepalive_timeout 5;

    location /public {
        root /usr/share/nginx/html/backend;
    }

    location / {
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        # enable this if and only if you use HTTPS
        # proxy_set_header X-Forwarded-Proto https;
        proxy_set_header Host $http_host;
        # we don't want nginx trying to do something clever with
        # redirects, we set the Host: header above already.
        proxy_redirect off;
        proxy_pass http://web:8000;
    }

    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="nginx hljs"><code class="nginx"><span class="hljs-section">server</span> {
    <span class="hljs-comment"># use 'listen 80 deferred;' for Linux</span>
    <span class="hljs-comment"># use 'listen 80 accept_filter=httpready;' for FreeBSD</span>
    <span class="hljs-attribute">listen</span> <span class="hljs-number">80</span> deferred;
    <span class="hljs-attribute">client_max_body_size</span> <span class="hljs-number">5M</span>;

    <span class="hljs-comment"># set the correct host(s) for your site</span>
    <span class="hljs-attribute">server_name</span> service.bylie.cn;

    <span class="hljs-attribute">keepalive_timeout</span> <span class="hljs-number">5</span>;

    <span class="hljs-attribute">location</span> /public {
        <span class="hljs-attribute">root</span> /usr/share/nginx/html/backend;
    }

    <span class="hljs-attribute">location</span> / {
        <span class="hljs-attribute">proxy_set_header</span> X-Forwarded-For <span class="hljs-variable">$proxy_add_x_forwarded_for</span>;
        <span class="hljs-comment"># enable this if and only if you use HTTPS</span>
        <span class="hljs-comment"># proxy_set_header X-Forwarded-Proto https;</span>
        <span class="hljs-attribute">proxy_set_header</span> Host <span class="hljs-variable">$http_host</span>;
        <span class="hljs-comment"># we don't want nginx trying to do something clever with</span>
        <span class="hljs-comment"># redirects, we set the Host: header above already.</span>
        <span class="hljs-attribute">proxy_redirect</span> <span class="hljs-literal">off</span>;
        <span class="hljs-attribute">proxy_pass</span> http://web:8000;
    }

    <span class="hljs-attribute">error_page</span>   <span class="hljs-number">500</span> <span class="hljs-number">502</span> <span class="hljs-number">503</span> <span class="hljs-number">504</span>  /50x.html;
    <span class="hljs-attribute">location</span> = /50x.html {
        <span class="hljs-attribute">root</span>   html;
    }
}</code></pre>
<p>备份数据库到host主机</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="docker-compose exec db sh -c 'exec mysqldump -uroot -p&quot;$MYSQL_ROOT_PASSWORD&quot; --databases ${MYSQL_DATABASE}' > ./backup/database.sql" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code class="shell" style="word-break: break-word; white-space: initial;">docker-compose exec <span class="hljs-keyword">db</span> <span class="hljs-keyword">sh</span> -c 'exec mysqldump -uroot -p<span class="hljs-string">"$MYSQL_ROOT_PASSWORD"</span> --databases <span class="hljs-variable">${MYSQL_DATABASE}</span>' &gt; ./backup/database.sql</code></pre>
</blockquote>
<h4>关于django web容器配置</h4>
<blockquote>
<p>比较简单</p>
<p><code>Dockerfile</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="FROM python:3

ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
ADD requirements.txt /tmp/
RUN pip install -r /tmp/requirements.txt" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="dockerfile hljs"><code class="dockerfile"><span class="hljs-keyword">FROM</span> python:<span class="hljs-number">3</span>

<span class="hljs-keyword">ENV</span> PYTHONUNBUFFERED <span class="hljs-number">1</span>
<span class="hljs-keyword">RUN</span><span class="bash"> mkdir /code
</span><span class="hljs-keyword">WORKDIR</span><span class="bash"> /code
</span><span class="hljs-keyword">ADD</span><span class="bash"> requirements.txt /tmp/
</span><span class="hljs-keyword">RUN</span><span class="bash"> pip install -r /tmp/requirements.txt</span></code></pre>
<p>启动脚本<code>startup.sh</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#!/usr/bin/env bash
python manage.py collectstatic --noinput &amp;&amp;
python manage.py migrate &amp;&amp;
gunicorn django_web_app.wsgi:application -w 2 -b :8000" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code class="shell"><span class="hljs-meta">#!/usr/bin/env bash</span>
python manage.py collectstatic --noinput &amp;&amp;
python manage.py migrate &amp;&amp;
gunicorn django_web_app.wsgi:application -w 2 -b :8000</code></pre>
<p>当容器运行起来之后，可能需要导入一些初始数据或者fixtures，我写了一个init的django custom command，手动执行该command：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="docker-compose exec web python manage.py init" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code style="word-break: break-word; white-space: initial;">docker-compose <span class="hljs-keyword">exec</span> web <span class="hljs-keyword">python</span> manage.py init</code></pre>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用Docker Compose部署Django和Vue.js应用

## 原文链接
[https://segmentfault.com/a/1190000010227994](https://segmentfault.com/a/1190000010227994)

