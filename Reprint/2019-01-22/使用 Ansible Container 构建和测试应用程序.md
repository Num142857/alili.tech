---
title: '使用 Ansible Container 构建和测试应用程序' 
date: 2019-01-22 2:30:07
hidden: true
slug: h2biv5qw44l
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#使用-ansible-container-构建和测试应用程序"></a>使用 Ansible Container 构建和测试应用程序</h1>
<p>容器是一个日益流行的开发环境。作为一名开发人员，你可以选择多种工具来管理你的容器。本文将向你介绍 Ansible Container，并展示如何在类似生产环境中运行和测试你的应用程序。</p>
<h3><a href="#入门"></a>入门</h3>
<p>这个例子使用了一个简单的 Flask Hello World 程序。这个程序就像在生产环境中一样由 Apache HTTP 服务器提供服务。首先，安装必要的 <code>docker</code> 包：</p>
<pre><code class="hljs cmake">sudo dnf <span class="hljs-keyword">install</span> docker

</code></pre><p>Ansible Container 需要通过本地套接字与 Docker 服务进行通信。以下命令将更改套接字所有者，并将你添加到可访问此套接字的 <code>docker</code> 用户组：</p>
<pre><code class="hljs nginx"><span class="hljs-attribute">sudo</span> groupadd docker &amp;&amp; sudo gpasswd -a <span class="hljs-variable">$USER</span> docker
MYGRP=$(id -g) ; <span class="hljs-attribute">newgrp</span> docker ; <span class="hljs-attribute">newgrp</span> <span class="hljs-variable">$MYGRP</span>

</code></pre><p>运行 <code>id</code> 命令以确保 <code>docker</code> 组在你的组成员中列出。最后，<a href="https://fedoramagazine.org/howto-use-sudo/">使用 sudo</a> 启用并启动 docker 服务：</p>
<pre><code class="hljs stylus">sudo systemctl enable docker<span class="hljs-selector-class">.service</span>
sudo systemctl start docker<span class="hljs-selector-class">.service</span>

</code></pre><h3><a href="#设置-ansible-container"></a>设置 Ansible Container</h3>
<p>Ansible Container 使你能够构建容器镜像并使用 Ansible playbook 进行编排。该程序在一个 YAML 文件中描述，而不是使用 Dockerfile，列出组成容器镜像的 Ansible 角色。</p>
<p>不幸的是，Ansible Container 在 Fedora 中没有 RPM 包可用。要安装它，请使用 python3 虚拟环境模块。</p>
<pre><code class="hljs inform7">mkdir ansible-<span class="hljs-keyword">container</span>-flask-example
cd ansible-<span class="hljs-keyword">container</span>-flask-example
python3 -m venv .venv
source .venv/bin/activate
pip install ansible-<span class="hljs-keyword">container</span><span class="hljs-comment">[docker]</span>

</code></pre><p>这些命令将安装 Ansible Container 及 Docker 引擎。 Ansible Container 提供三种引擎：Docker、Kubernetes 和 Openshift。</p>
<h3><a href="#设置项目"></a>设置项目</h3>
<p>现在已经安装了 Ansible Container，接着设置这个项目。Ansible Container 提供了一个简单的命令来创建启动所需的所有文件：</p>
<pre><code class="hljs axapta">ansible-<span class="hljs-keyword">container</span> init

</code></pre><p>来看看这个命令在当前目录中创建的文件：</p>
<ul>
<li><code>ansible.cfg</code></li>
<li><code>ansible-requirements.txt</code></li>
<li><code>container.yml</code></li>
<li><code>meta.yml</code></li>
<li><code>requirements.yml</code></li>
</ul>
<p>该项目仅使用 <code>container.yml</code> 来描述程序服务。有关其他文件的更多信息，请查看 Ansible Container 的<a href="https://docs.ansible.com/ansible-container/getting_started.html">入门</a>文档。</p>
<h3><a href="#定义容器"></a>定义容器</h3>
<p>如下更新 <code>container.yml</code>：</p>
<pre><code class="hljs yaml"><span class="hljs-attr">version:</span> <span class="hljs-string">"2"</span>
<span class="hljs-attr">settings:</span>
<span class="hljs-attr">  conductor:</span>
    <span class="hljs-comment"># The Conductor container does the heavy lifting, and provides a portable</span>
    <span class="hljs-comment"># Python runtime for building your target containers. It should be derived</span>
    <span class="hljs-comment"># from the same distribution as you're building your target containers with.</span>
<span class="hljs-attr">    base:</span> <span class="hljs-attr">fedora:26</span>
    <span class="hljs-comment"># roles_path:   # Specify a local path containing Ansible roles</span>
    <span class="hljs-comment"># volumes:      # Provide a list of volumes to mount</span>
    <span class="hljs-comment"># environment:  # List or mapping of environment variables</span>

  <span class="hljs-comment"># Set the name of the project. Defaults to basename of the project directory.</span>
  <span class="hljs-comment"># For built services, concatenated with service name to form the built image name.</span>
<span class="hljs-attr">  project_name:</span> <span class="hljs-string">flask-helloworld</span>

<span class="hljs-attr">services:</span> 
  <span class="hljs-comment"># Add your containers here, specifying the base image you want to build from.</span>
  <span class="hljs-comment"># To use this example, uncomment it and delete the curly braces after services key.</span>
  <span class="hljs-comment"># You may need to run `docker pull ubuntu:trusty` for this to work.</span>
<span class="hljs-attr">  web:</span>
<span class="hljs-attr">    from:</span> <span class="hljs-string">"fedora:26"</span>
<span class="hljs-attr">    roles:</span> 
<span class="hljs-bullet">      -</span> <span class="hljs-string">base</span>
<span class="hljs-attr">    ports:</span>
<span class="hljs-bullet">      -</span> <span class="hljs-string">"5000:80"</span>
<span class="hljs-attr">    command:</span> <span class="hljs-string">["/usr/bin/dumb-init",</span> <span class="hljs-string">"httpd"</span><span class="hljs-string">,</span> <span class="hljs-string">"-DFOREGROUND"</span><span class="hljs-string">]</span>
<span class="hljs-attr">    volumes:</span>
<span class="hljs-bullet">      -</span> <span class="hljs-string">$PWD/flask-helloworld:/flaskapp:Z</span>

</code></pre><p><code>conductor</code> 部分更新了基本设置以使用 Fedora 26 容器基础镜像。</p>
<p><code>services</code> 部分添加了 <code>web</code> 服务。这个服务使用 Fedora 26，后面有一个名为 <code>base</code> 的角色。它还设置容器和主机之间的端口映射。Apache HTTP 服务器为容器的端口 80 上的 Flask 程序提供服务，该容器重定向到主机的端口 5000。然后这个文件定义了一个卷，它将 Flask 程序源代码挂载到容器中的 <code>/flaskapp</code> 中。</p>
<p>最后，容器启动时运行 <code>command</code> 配置。这个例子中使用 <a href="https://github.com/Yelp/dumb-init">dumb-init</a>，一个简单的进程管理器并初始化系统启动 Apache HTTP 服务器。</p>
<h3><a href="#ansible-角色"></a>Ansible 角色</h3>
<p>现在已经设置完了容器，创建一个 Ansible 角色来安装并配置 Flask 程序所需的依赖关系。首先，创建 <code>base</code> 角色。</p>
<pre><code class="hljs stylus">mkdir -<span class="hljs-selector-tag">p</span> roles/base/tasks
touch roles/base/tasks/main<span class="hljs-selector-class">.yml</span>

</code></pre><p>现在编辑 <code>main.yml</code> ，它看起来像这样：</p>
<pre><code class="hljs yaml"><span class="hljs-meta">---</span>
<span class="hljs-attr">- name:</span> <span class="hljs-string">Install</span> <span class="hljs-string">dependencies</span> 
<span class="hljs-attr">  dnf:</span> <span class="hljs-string">pkg="{{"item"}}"</span> <span class="hljs-string">state=present</span>
<span class="hljs-attr">  with_items:</span>
<span class="hljs-bullet">    -</span> <span class="hljs-string">python3-flask</span>
<span class="hljs-bullet">    -</span> <span class="hljs-string">dumb-init</span>
<span class="hljs-bullet">    -</span> <span class="hljs-string">httpd</span>
<span class="hljs-bullet">    -</span> <span class="hljs-string">python3-mod_wsgi</span>

<span class="hljs-attr">- name:</span> <span class="hljs-string">copy</span> <span class="hljs-string">the</span> <span class="hljs-string">apache</span> <span class="hljs-string">configuration</span>
<span class="hljs-attr">  copy:</span>
<span class="hljs-attr">    src:</span> <span class="hljs-string">flask-helloworld.conf</span>
<span class="hljs-attr">    dest:</span> <span class="hljs-string">/etc/httpd/conf.d/flask-helloworld.conf</span>
<span class="hljs-attr">    owner:</span> <span class="hljs-string">apache</span>
<span class="hljs-attr">    group:</span> <span class="hljs-string">root</span>
<span class="hljs-attr">    mode:</span> <span class="hljs-number">655</span>

</code></pre><p>这个 Ansible 角色是简单的。首先它安装依赖关系。然后，复制 Apache HTTP 服务器配置。如果你对 Ansible 角色不熟悉，请查看<a href="http://docs.ansible.com/ansible/latest/playbooks_reuse_roles.html">角色文档</a>。</p>
<h3><a href="#apache-http-配置"></a>Apache HTTP 配置</h3>
<p>接下来，通过创建 <code>flask-helloworld.conf</code> 来配置 Apache HTTP 服务器：</p>
<pre><code class="hljs gams"><span class="hljs-symbol">$</span> mkdir -p roles/base/<span class="hljs-keyword">files</span>
<span class="hljs-symbol">$</span> touch roles/base/<span class="hljs-keyword">files</span>/flask-helloworld.conf

</code></pre><p>最后将以下内容添加到文件中：</p>
<pre><code class="hljs apache"><span class="hljs-section">&lt;VirtualHost *&gt;</span>
    <span class="hljs-attribute"><span class="hljs-nomarkup">ServerName</span></span> example.com

    <span class="hljs-attribute">WSGIDaemonProcess</span> hello_world user=apache group=root
    <span class="hljs-attribute">WSGIScriptAlias</span> / /flaskapp/flask-helloworld.wsgi

    <span class="hljs-section">&lt;Directory /flaskapp&gt;</span>
        <span class="hljs-attribute">WSGIProcessGroup</span> hello_world
        <span class="hljs-attribute">WSGIApplicationGroup</span> <span class="hljs-variable">%{GLOBAL}</span>
    <span class="hljs-attribute">Require</span> <span class="hljs-literal">all</span> granted
    <span class="hljs-section">&lt;/Directory&gt;</span>
<span class="hljs-section">&lt;/VirtualHost&gt;</span>

</code></pre><p>这个文件的重要部分是 <code>WSGIScriptAlias</code>。该指令将脚本 <code>flask-helloworld.wsgi</code> 映射到 <code>/</code>。有关 Apache HTTP 服务器和 mod_wsgi 的更多详细信息，请阅读 <a href="http://flask.pocoo.org/docs/0.12/deploying/mod_wsgi/">Flask 文档</a>。</p>
<h3><a href="#flask-hello-world"></a>Flask “hello world”</h3>
<p>最后，创建一个简单的 Flask 程序和 <code>flask-helloworld.wsgi</code> 脚本。</p>
<pre><code class="hljs stylus">mkdir flask-helloworld
touch flask-helloworld/app<span class="hljs-selector-class">.py</span>
touch flask-helloworld/flask-helloworld<span class="hljs-selector-class">.wsgi</span>

</code></pre><p>将以下内容添加到 <code>app.py</code>：</p>
<pre><code class="hljs python"><span class="hljs-keyword">from</span> flask <span class="hljs-keyword">import</span> Flask
app = Flask(__name__)

<span class="hljs-meta">@app.route("/")</span>
<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">hello</span><span class="hljs-params">()</span>:</span>
    <span class="hljs-keyword">return</span> <span class="hljs-string">"Hello World!"</span>

</code></pre><p>然后编辑 <code>flask-helloworld.wsgi</code> ，添加这个：</p>
<pre><code class="hljs xl"><span class="hljs-keyword">import</span> sys
sys.<span class="hljs-built_in">path</span>.insert(<span class="hljs-number">0</span>, <span class="hljs-string">'/flaskapp/'</span>)

from app <span class="hljs-keyword">import</span> app <span class="hljs-keyword">as</span> application

</code></pre><h3><a href="#构建并运行"></a>构建并运行</h3>
<p>现在是时候使用 <code>ansible-container build</code> 和 <code>ansible-container run</code> 命令来构建和运行容器。</p>
<pre><code class="hljs armasm"><span class="hljs-symbol">ansible</span>-container <span class="hljs-keyword">build
</span>
</code></pre><p>这个命令需要一些时间来完成，所以要耐心等待。</p>
<pre><code class="hljs dockerfile">ansible-container <span class="hljs-keyword">run</span><span class="bash">

</span></code></pre><p>你现在可以通过以下 URL 访问你的 flask 程序： <a href="http://localhost:5000/">http://localhost:5000/</a></p>
<h3><a href="#结论"></a>结论</h3>
<p>你现在已经看到如何使用 Ansible Container 来管理、构建和配置在容器中运行的程序。本例的所有配置文件和源代码在 <a href="https://pagure.io/ansible-container-flask-example">Pagure.io</a> 上。你可以使用此例作为基础来开始在项目中使用 Ansible Container。</p>
<hr>
<p>via: <a href="https://fedoramagazine.org/build-test-applications-ansible-container/">https://fedoramagazine.org/build-test-applications-ansible-container/</a></p>
<p>作者：<a href="https://fedoramagazine.org/author/cverna/">Clement Verna</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 Ansible Container 构建和测试应用程序

## 原文链接
[https://www.zcfy.cc/article/build-and-test-applications-with-ansible-container](https://www.zcfy.cc/article/build-and-test-applications-with-ansible-container)

