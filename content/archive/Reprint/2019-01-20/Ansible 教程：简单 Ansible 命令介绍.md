---
title: 'Ansible 教程：简单 Ansible 命令介绍' 
date: 2019-01-20 2:30:11
hidden: true
slug: 17zeizkggnl
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#ansible-教程简单-ansible-命令介绍"></a>Ansible 教程：简单 Ansible 命令介绍</h1>
<p>在我们之前的 Ansible 教程中，我们讨论了 <a href="http://linuxtechlab.com/create-first-ansible-server-automation-setup/">Ansible 的安装和配置</a>。在这个 Ansible 教程中，我们将学习一些基本的 Ansible 命令的例子，我们将用它来管理基础设施。所以让我们先看看一个完整的 Ansible 命令的语法：</p>
<pre><code class="hljs ruby">$ ansible &lt;group&gt; -m &lt;<span class="hljs-class"><span class="hljs-keyword">module</span>&gt; -<span class="hljs-title">a</span> &lt;arguments&gt;</span>

</code></pre><p>在这里，我们可以用单个主机或用 <code>&lt;group&gt;</code> 代替一组主机，<code>&lt;arguments&gt;</code> 是可选的参数。现在我们来看看一些 Ansible 的基本命令。</p>
<h3><a href="#检查主机的连通性"></a>检查主机的连通性</h3>
<p>我们在之前的教程中也使用了这个命令。检查主机连接的命令是：</p>
<pre><code class="hljs routeros">$ ansible &lt;group&gt; -m<span class="hljs-built_in"> ping
</span>
</code></pre><h3><a href="#重启主机"></a>重启主机</h3>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> ansible &lt;group&gt; -a <span class="hljs-string">"/sbin/reboot"</span></span>

</code></pre><h3><a href="#检查主机的系统信息"></a>检查主机的系统信息</h3>
<p>Ansible 收集所有连接到它主机的信息。要显示主机的信息，请运行：</p>
<pre><code class="hljs gherkin">$ ansible <span class="hljs-variable">&lt;group&gt;</span> -m setup |<span class="hljs-string"> less

</span></code></pre><p>其次，通过传递参数来从收集的信息中检查特定的信息：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> ansible &lt;group&gt; -m setup -a <span class="hljs-string">"filter=ansible_distribution"</span></span>

</code></pre><h3><a href="#传输文件"></a>传输文件</h3>
<p>对于传输文件，我们使用模块 <code>copy</code> ，完整的命令是这样的：</p>
<pre><code class="hljs dockerfile">$ ansible &lt;group&gt; -m <span class="hljs-keyword">copy</span><span class="bash"> -a <span class="hljs-string">"src=/home/dan dest=/tmp/home"</span>
</span>
</code></pre><h3><a href="#管理用户"></a>管理用户</h3>
<p>要管理已连接主机上的用户，我们使用一个名为 <code>user</code> 的模块，并如下使用它。</p>
<h4><a href="#创建新用户"></a>创建新用户</h4>
<pre><code class="hljs routeros">$ ansible &lt;group&gt; -m<span class="hljs-built_in"> user </span>-a <span class="hljs-string">"name=testuser password=&lt;encrypted password&gt;"</span>

</code></pre><h4><a href="#删除用户"></a>删除用户</h4>
<pre><code class="hljs routeros">$ ansible &lt;group&gt; -m<span class="hljs-built_in"> user </span>-a <span class="hljs-string">"name=testuser state=absent"</span>

</code></pre><p><strong>注意：</strong> 要创建加密密码，请使用 <code>"mkpasswd -method=sha-512"</code>。</p>
<h3><a href="#更改权限和所有者"></a>更改权限和所有者</h3>
<p>要改变已连接主机文件的所有者，我们使用名为 <code>file</code> 的模块，使用如下。</p>
<h4><a href="#更改文件权限"></a>更改文件权限</h4>
<pre><code class="hljs gams"><span class="hljs-symbol">$</span> ansible &lt;group&gt; -m <span class="hljs-keyword">file</span> -a <span class="hljs-string">"dest=/home/dan/file1.txt mode=777"</span>

</code></pre><h4><a href="#更改文件的所有者"></a>更改文件的所有者</h4>
<pre><code class="hljs gams"><span class="hljs-symbol">$</span> ansible &lt;group&gt; -m <span class="hljs-keyword">file</span> -a <span class="hljs-string">"dest=/home/dan/file1.txt mode=777 owner=dan group=dan"</span>

</code></pre><h3><a href="#管理软件包"></a>管理软件包</h3>
<p>我们可以通过使用 <code>yum</code> 和 <code>apt</code> 模块来管理所有已连接主机的软件包，完整的命令如下：</p>
<h4><a href="#检查包是否已安装并更新"></a>检查包是否已安装并更新</h4>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> ansible &lt;group&gt; -m yum -a <span class="hljs-string">"name=ntp state=latest"</span></span>

</code></pre><h4><a href="#检查包是否已安装但不更新"></a>检查包是否已安装，但不更新</h4>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> ansible &lt;group&gt; -m yum -a <span class="hljs-string">"name=ntp state=present"</span></span>

</code></pre><h4><a href="#检查包是否是特定的版本"></a>检查包是否是特定的版本</h4>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> ansible &lt;group&gt; -m yum -a <span class="hljs-string">"name= ntp-1.8 state=present"</span></span>

</code></pre><h4><a href="#检查包是否没有安装"></a>检查包是否没有安装</h4>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> ansible &lt;group&gt; -m yum -a <span class="hljs-string">"name=ntp state=absent"</span></span>

</code></pre><h3><a href="#管理服务"></a>管理服务</h3>
<p>要管理服务，我们使用模块 <code>service</code> ，完整命令如下：</p>
<h4><a href="#启动服务"></a>启动服务</h4>
<pre><code class="hljs routeros"><span class="hljs-variable">$ansible</span> &lt;group&gt; -m<span class="hljs-built_in"> service </span>-a <span class="hljs-string">"name=httpd state=started"</span>

</code></pre><h4><a href="#停止服务"></a>停止服务</h4>
<pre><code class="hljs routeros">$ ansible &lt;group&gt; -m<span class="hljs-built_in"> service </span>-a <span class="hljs-string">"name=httpd state=stopped"</span>

</code></pre><h4><a href="#重启服务"></a>重启服务</h4>
<pre><code class="hljs routeros">$ ansible &lt;group&gt; -m<span class="hljs-built_in"> service </span>-a <span class="hljs-string">"name=httpd state=restarted"</span>

</code></pre><p>这样我们简单的、单行 Ansible 命令的教程就完成了。此外，在未来的教程中，我们将学习创建 playbook，来帮助我们更轻松高效地管理主机。</p>
<hr>
<p>via: <a href="http://linuxtechlab.com/ansible-tutorial-simple-commands/">http://linuxtechlab.com/ansible-tutorial-simple-commands/</a></p>
<p>作者：<a href="http://linuxtechlab.com/author/shsuain/">SHUSAIN</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Ansible 教程：简单 Ansible 命令介绍

## 原文链接
[https://www.zcfy.cc/article/ansible-tutorial-intorduction-to-simple-ansible-commands](https://www.zcfy.cc/article/ansible-tutorial-intorduction-to-simple-ansible-commands)

