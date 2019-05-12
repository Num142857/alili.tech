---
title: 'Ansible 起步指南' 
date: 2019-01-24 2:30:11
hidden: true
slug: p2i1yh8wy3
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#ansible-起步指南"></a>Ansible 起步指南</h1>
<p>这是一篇关于 Ansible 的速成课程，你可以用作小项目的模板，或者帮你深入了解这个神奇的工具。阅读了本指南之后，你将对自动化服务器配置、部署等有足够的了解。</p>
<h3><a href="#ansible-是什么为什么你该了解"></a>Ansible 是什么，为什么你该了解？</h3>
<p>Ansible 简单的说是一个配置管理系统（configuration management system）。你只需要可以使用 ssh 访问你的服务器或设备就行。它也不同于其他工具，因为它使用推送的方式，而不是像 puppet 或 chef 那样使用拉取的方式。你可以将代码部署到任意数量的服务器上，配置网络设备或在基础架构中自动执行任何操作。</p>
<h3><a href="#前置要求"></a>前置要求</h3>
<p>假设你使用 Mac 或 Linux 作为你的工作站，Ubuntu Trusty 作为你的服务器，并有一些安装软件包的经验。此外，你的计算机上将需要以下软件。所以，如果你还没有它们，请先安装：</p>
<ul>
<li><a href="https://www.virtualbox.org/">Virtualbox</a></li>
<li><a href="https://www.vagrantup.com/downloads.html">Vagrant</a></li>
<li>Mac 用户：<a href="http://brew.sh/">Homebrew</a></li>
</ul>
<h3><a href="#情景"></a>情景</h3>
<p>我们将模拟 2 个连接到 MySQL 数据库的 Web 应用程序服务器。Web 应用程序使用 Rails 5 和 Puma。</p>
<h3><a href="#准备"></a>准备</h3>
<h4><a href="#vagrantfile"></a>Vagrantfile</h4>
<p>为这个项目创建一个文件夹，并将下面的内容保存到名为 <code>Vagrantfile</code> 的文件。</p>
<pre><code class="hljs coq">VMs = [
    [ <span class="hljs-string">"web1"</span>, <span class="hljs-string">"10.1.1.11"</span>],
    [ <span class="hljs-string">"web2"</span>, <span class="hljs-string">"10.1.1.12"</span>],
    [ <span class="hljs-string">"dbserver"</span>, <span class="hljs-string">"10.1.1.21"</span>],
  ]

Vagrant.configure(<span class="hljs-number">2</span>) <span class="hljs-built_in">do</span> |<span class="hljs-type">config</span>|
  <span class="hljs-type">VMs</span>.each { |<span class="hljs-type">vm</span>|
    <span class="hljs-type">config</span>.vm.define vm[<span class="hljs-number">0</span>] <span class="hljs-built_in">do</span> |<span class="hljs-type">box</span>|
      <span class="hljs-type">box</span>.vm.box = <span class="hljs-string">"ubuntu/trusty64"</span>
      box.vm.network <span class="hljs-string">"private_network"</span>, ip: vm[<span class="hljs-number">1</span>]
      box.vm.hostname = vm[<span class="hljs-number">0</span>]
      box.vm.provider <span class="hljs-string">"virtualbox"</span> <span class="hljs-built_in">do</span> |<span class="hljs-type">vb</span>|
         <span class="hljs-type">vb</span>.memory = <span class="hljs-string">"512"</span>
      <span class="hljs-keyword">end</span>
    <span class="hljs-keyword">end</span>
  }
<span class="hljs-keyword">end</span>

</code></pre><h4><a href="#配置你的虚拟网络"></a>配置你的虚拟网络</h4>
<p>我们希望我们的虚拟机能互相交互，但不要让流量流出到真实的网络，所以我们将在 Virtualbox 中创建一个仅主机（HOST-Only）的网络适配器。</p>
<ol>
<li>打开 Virtualbox</li>
<li>转到 Preferences</li>
<li>转到 Network</li>
<li>单击 Host-Only</li>
<li>单击添加网络</li>
<li>单击 Adapter</li>
<li>将 IPv4 设置为 <code>10.1.1.1</code>，IPv4 网络掩码：<code>255.255.255.0</code></li>
<li>单击 “OK”</li>
</ol>
<h4><a href="#测试虚拟机及虚拟网络"></a>测试虚拟机及虚拟网络</h4>
<p>在终端中，在存放 <code>Vagrantfile</code> 的项目目录中，输入下面的命令：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">vagrant up</span>

</code></pre><p>它会创建你的虚拟机，因此会花费一会时间。输入下面的命令并验证输出内容以检查是否已经工作：</p>
<pre><code class="hljs applescript">$ vagrant status
Current machine states:

web1                      <span class="hljs-built_in">running</span> (virtualbox)
web2                      <span class="hljs-built_in">running</span> (virtualbox)
master                    <span class="hljs-built_in">running</span> (virtualbox)

This environment represents multiple VMs. The VMs are all listed
<span class="hljs-keyword">above</span> <span class="hljs-keyword">with</span> their current state. For more information <span class="hljs-keyword">about</span> a specific
VM, <span class="hljs-built_in">run</span> `vagrant status NAME`.

</code></pre><p>现在使用 <code>vagrant</code> 的用户名和密码 ，按 <code>Vagrantfile</code> 中的 IP 登录其中一台虚拟机，这将验证虚拟机并将它们的密钥添加到你的已知主机（<code>known_hosts</code>）文件中。</p>
<pre><code class="hljs lsl">ssh vagrant@<span class="hljs-number">10.1</span><span class="hljs-number">.1</span><span class="hljs-number">.11</span> # password is `vagrant`
ssh vagrant@<span class="hljs-number">10.1</span><span class="hljs-number">.1</span><span class="hljs-number">.12</span>
ssh vagrant@<span class="hljs-number">10.1</span><span class="hljs-number">.1</span><span class="hljs-number">.21</span>

</code></pre><p>恭喜你！现在你已经有可以实验的服务器了。下面的剩下的部分！</p>
<h3><a href="#安装-ansible"></a>安装 Ansible</h3>
<p>对于 Mac 用户:</p>
<pre><code class="hljs mipsasm">$ <span class="hljs-keyword">brew </span><span class="hljs-keyword">install </span>ansible

</code></pre><p>对于 Ubuntu 用户:</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> sudo apt install ansible</span>

</code></pre><p>确保你使用了ansible 最近的版本 2.1 或者更高的版本：</p>
<pre><code class="hljs lsl">$ ansible --version
ansible <span class="hljs-number">2.1</span><span class="hljs-number">.1</span><span class="hljs-number">.0</span>

</code></pre><h3><a href="#清单"></a>清单</h3>
<p>Ansible 使用清单文件来了解要使用的服务器，以及如何将它们分组以并行执行任务。让我们为这个项目创建我们的清单文件 <code>inventory</code>，并将它放在与 <code>Vagrantfile</code> 相同的文件夹中：</p>
<pre><code class="hljs routeros">[all:children]
webs
db

[all:vars]
<span class="hljs-attribute">ansible_user</span>=vagrant
<span class="hljs-attribute">ansible_ssh_pass</span>=vagrant

[webs]
web1 <span class="hljs-attribute">ansible_host</span>=10.1.1.11
web2 <span class="hljs-attribute">ansible_host</span>=10.1.1.12

[db]
dbserver <span class="hljs-attribute">ansible_host</span>=10.1.1.21

</code></pre><ul>
<li><code>[all：children]</code> 定义一个组的组（<code>all</code>）</li>
<li><code>[all：vars]</code> 定义属于组 <code>all</code> 的变量</li>
<li><code>[webs]</code> 定义一个组，就像 <code>[db]</code> 一样</li>
<li>文件的其余部分只是主机的声明，带有它们的名称和 IP</li>
<li>空行表示声明结束</li>
</ul>
<p>现在我们有了一个清单，我们可以从命令行开始使用 ansible，指定一个主机或一个组来执行命令。以下是检查与服务器的连接的命令示例：</p>
<pre><code class="hljs routeros">$ ansible -i inventory all -m<span class="hljs-built_in"> ping
</span>
</code></pre><ul>
<li><code>-i</code> 指定清单文件</li>
<li><code>all</code> 指定要操作的服务器或服务器组</li>
<li><code>-m' 指定一个 ansible 模块，在这种情况下为</code>ping`</li>
</ul>
<p>下面是命令输出：</p>
<pre><code class="hljs javascript">dbserver | <span class="hljs-function"><span class="hljs-params">SUCCESS</span> =&gt;</span> {
    <span class="hljs-string">"changed"</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-string">"ping"</span>: <span class="hljs-string">"pong"</span>
}
web1 | <span class="hljs-function"><span class="hljs-params">SUCCESS</span> =&gt;</span> {
    <span class="hljs-string">"changed"</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-string">"ping"</span>: <span class="hljs-string">"pong"</span>
}
web2 | <span class="hljs-function"><span class="hljs-params">SUCCESS</span> =&gt;</span> {
    <span class="hljs-string">"changed"</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-string">"ping"</span>: <span class="hljs-string">"pong"</span>
}

</code></pre><p>服务器以不同的顺序响应，这只取决于谁先响应，但是这个没有关系，因为 ansible 独立保持每台服务器的状态。</p>
<p>你也可以使用另外一个选项来运行任何命令：</p>
<ul>
<li><code>-a &lt;command&gt;</code></li>
</ul>
<pre><code class="hljs ruby">$ ansible -i inventory all -a uptime
web1 <span class="hljs-params">| SUCCESS |</span> rc=<span class="hljs-number">0</span> <span class="hljs-meta">&gt;&gt;
 </span><span class="hljs-number">21</span><span class="hljs-symbol">:</span><span class="hljs-number">43</span><span class="hljs-symbol">:</span><span class="hljs-number">27</span> up <span class="hljs-number">25</span> min,  <span class="hljs-number">1</span> user,  load <span class="hljs-symbol">average:</span> <span class="hljs-number">0</span>.<span class="hljs-number">00</span>, <span class="hljs-number">0</span>.<span class="hljs-number">01</span>, <span class="hljs-number">0</span>.<span class="hljs-number">05</span>

dbserver <span class="hljs-params">| SUCCESS |</span> rc=<span class="hljs-number">0</span> <span class="hljs-meta">&gt;&gt;
 </span><span class="hljs-number">21</span><span class="hljs-symbol">:</span><span class="hljs-number">43</span><span class="hljs-symbol">:</span><span class="hljs-number">27</span> up <span class="hljs-number">24</span> min,  <span class="hljs-number">1</span> user,  load <span class="hljs-symbol">average:</span> <span class="hljs-number">0</span>.<span class="hljs-number">00</span>, <span class="hljs-number">0</span>.<span class="hljs-number">01</span>, <span class="hljs-number">0</span>.<span class="hljs-number">05</span>

web2 <span class="hljs-params">| SUCCESS |</span> rc=<span class="hljs-number">0</span> <span class="hljs-meta">&gt;&gt;
 </span><span class="hljs-number">21</span><span class="hljs-symbol">:</span><span class="hljs-number">43</span><span class="hljs-symbol">:</span><span class="hljs-number">27</span> up <span class="hljs-number">25</span> min,  <span class="hljs-number">1</span> user,  load <span class="hljs-symbol">average:</span> <span class="hljs-number">0</span>.<span class="hljs-number">00</span>, <span class="hljs-number">0</span>.<span class="hljs-number">01</span>, <span class="hljs-number">0</span>.<span class="hljs-number">05</span>

</code></pre><p>这是只有一台服务器的另外一个例子：</p>
<pre><code class="hljs lsl">$ ansible -i inventory dbserver -a <span class="hljs-string">"df -h /"</span>
dbserver | SUCCESS | rc=<span class="hljs-number">0</span> &gt;&gt;
Filesystem      Size  Used Avail Use% Mounted on
/dev/sda1        <span class="hljs-number">40</span>G  <span class="hljs-number">1.4</span>G   <span class="hljs-number">37</span>G   <span class="hljs-number">4</span>% /

</code></pre><h3><a href="#剧本"></a>剧本</h3>
<p>剧本（playbook）只是个 YAML 文件，它将清单文件中的服务器组与命令关联。在 ansible 中的对于关键字是 <code>tasks</code>，它可以是一个预期的状态、shell 命令或许多其它的选项。有关 ansible 可做的所有事情列表，可以查看<a href="http://docs.ansible.com/ansible/list_of_all_modules.html">所有模块的列表</a>。</p>
<p>下面是一个运行 shell 命令的剧本示例，将其保存为 <code>playbook1.yml</code>：</p>
<pre><code class="hljs yaml"><span class="hljs-meta">---</span>
<span class="hljs-attr">- hosts:</span> <span class="hljs-string">all</span>
<span class="hljs-attr">  tasks:</span>
<span class="hljs-attr">    - shell:</span> <span class="hljs-string">uptime</span>

</code></pre><ul>
<li><code>---</code> 是 YAML 文件的开始</li>
<li><code>- hosts</code>：指定要使用的组</li>
<li><code>tasks</code>：标记任务列表的开始</li>
<li><code>- shell</code>：指定第一个任务使用 [shell] (<a href="http://docs.ansible.com/ansible/shell_module.html">http://docs.ansible.com/ansible/shell_module.html</a>) 模块</li>
<li><strong>记住：YAML 需要缩进结构，确保你始终遵循剧本中的正确结构</strong></li>
</ul>
<p>用下面的命令运行它：</p>
<pre><code class="hljs markdown">$ ansible-playbook -i inventory playbook1.yml

PLAY [all] <span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-emphasis">***</span>*

TASK [setup] <span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span>**
ok: [web1]
ok: [web2]
ok: [dbmaster]

TASK [command] <span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span>
changed: [web1]
changed: [web2]
changed: [dbmaster]

PLAY RECAP <span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-emphasis">***</span>*
dbmaster                   : ok=2    changed=1    unreachable=0    failed=0
web1                       : ok=2    changed=1    unreachable=0    failed=0
web2                       : ok=2    changed=1    unreachable=0    failed=0

</code></pre><p>正如你所见，ansible 运行了 2 个任务，而不是只有剧本中的一个。<code>TASK [setup]</code> 是一个隐式任务，它会首先运行以捕获服务器的信息，如主机名、IP、发行版和更多详细信息，然后可以使用这些信息运行条件任务。</p>
<p>还有最后的 <code>PLAY RECAP</code>，其中 ansible 显示了运行了多少个任务以及每个对应的状态。在我们的例子中，因为我们运行了一个 shell 命令，ansible 不知道结果的状态，它被认为是 <code>changed</code>。</p>
<h4><a href="#安装软件"></a>安装软件</h4>
<p>我们将使用 <a href="http://docs.ansible.com/ansible/apt_module.html">apt</a> 在我们的服务器上安装软件，因为我们需要 root 权限，所以我们必须使用 <code>become</code> 语句，将这个内容保存在 <code>playbook2.yml</code> 中并运行它（<code>ansible-playbook playbook2.yml</code>）：</p>
<pre><code class="hljs yaml"><span class="hljs-meta">---</span>
<span class="hljs-attr">- hosts:</span> <span class="hljs-string">webs</span>
<span class="hljs-attr">  become_user:</span> <span class="hljs-string">root</span>
<span class="hljs-attr">  become:</span> <span class="hljs-literal">true</span>
<span class="hljs-attr">  tasks:</span>
<span class="hljs-attr">    - apt:</span> <span class="hljs-string">name=git</span> <span class="hljs-string">state=present</span>

</code></pre><p>有一些语句可以应用于 ansible 中所有模块；一个是 <code>name</code> 语句，可以让我们输出关于正在执行的任务的更具描述性的文本。要使用它，保持任务内容一样，但是添加 <code>name ：描述性文本</code> 作为第一行，所以我们以前的文本将改成：</p>
<pre><code class="hljs yaml"><span class="hljs-meta">---</span>
<span class="hljs-attr">- hosts:</span> <span class="hljs-string">webs</span>
<span class="hljs-attr">  become_user:</span> <span class="hljs-string">root</span>
<span class="hljs-attr">  become:</span> <span class="hljs-literal">true</span>
<span class="hljs-attr">  tasks:</span>
<span class="hljs-attr">    - name:</span> <span class="hljs-string">This</span> <span class="hljs-string">task</span> <span class="hljs-string">will</span> <span class="hljs-string">make</span> <span class="hljs-string">sure</span> <span class="hljs-string">git</span> <span class="hljs-string">is</span> <span class="hljs-string">present</span> <span class="hljs-string">on</span> <span class="hljs-string">the</span> <span class="hljs-string">system</span>
<span class="hljs-attr">      apt:</span> <span class="hljs-string">name=git</span> <span class="hljs-string">state=present</span>

</code></pre><h4><a href="#使用-with_items"></a>使用 <code>with_items</code></h4>
<p>当你要处理一个列表时，比如要安装的项目和软件包、要创建的文件，可以用 ansible 提供的 <code>with_items</code>。下面是我们如何在 <code>playbook3.yml</code> 中使用它，同时添加一些我们已经知道的其他语句：</p>
<pre><code class="hljs yaml"><span class="hljs-meta">---</span>
<span class="hljs-attr">- hosts:</span> <span class="hljs-string">all</span>
<span class="hljs-attr">  become_user:</span> <span class="hljs-string">root</span>
<span class="hljs-attr">  become:</span> <span class="hljs-literal">true</span>
<span class="hljs-attr">  tasks:</span>
<span class="hljs-attr">    - name:</span> <span class="hljs-string">Installing</span> <span class="hljs-string">dependencies</span>
<span class="hljs-attr">      apt:</span> <span class="hljs-string">name="{{"item"}}"</span> <span class="hljs-string">state=present</span>
<span class="hljs-attr">      with_items:</span>
<span class="hljs-bullet">        -</span> <span class="hljs-string">git</span>
<span class="hljs-bullet">        -</span> <span class="hljs-string">mysql-client</span>
<span class="hljs-bullet">        -</span> <span class="hljs-string">libmysqlclient-dev</span>
<span class="hljs-bullet">        -</span> <span class="hljs-string">build-essential</span>
<span class="hljs-bullet">        -</span> <span class="hljs-string">python-software-properties</span>

</code></pre><h4><a href="#使用-template-和-vars"></a>使用 <code>template</code> 和 <code>vars</code></h4>
<p><code>vars</code> 是一个定义变量语句，可以在 <code>task</code> 语句或 <code>template</code> 文件中使用。 <a href="http://jinja.pocoo.org/docs/dev/">Jinja2</a> 是 Ansible 中使用的模板引擎，但是关于它你不需要学习很多。在你的剧本中定义变量，如下所示：</p>
<pre><code class="hljs yaml"><span class="hljs-meta">---</span>
<span class="hljs-attr">- hosts:</span> <span class="hljs-string">all</span>
<span class="hljs-attr">  vars:</span>
<span class="hljs-attr">    - secret_key:</span> <span class="hljs-string">VqnzCLdCV9a3jK</span>
<span class="hljs-attr">    - path_to_vault:</span> <span class="hljs-string">/opt/very/deep/path</span>
<span class="hljs-attr">  tasks:</span>
<span class="hljs-attr">    - name:</span> <span class="hljs-string">Setting</span> <span class="hljs-string">a</span> <span class="hljs-string">configuration</span> <span class="hljs-string">file</span> <span class="hljs-string">using</span> <span class="hljs-string">template</span>
<span class="hljs-attr">      template:</span> <span class="hljs-string">src=myconfig.j2</span> <span class="hljs-string">dest="{{"path_to_vault"}}"/app.conf</span>

</code></pre><p>正如你看到的，我可以使用 <code>"{{"path_to_vault"}}"</code> 作为剧本的一部分，但也因为我使用了 <code>template</code>语句，我可以使用 <code>myconfig.j2</code> 中的任何变量，该文件必须存在一个名为 <code>templates</code> 的子文件夹中。你项目树应该如下所示：</p>
<pre><code class="hljs stylus">├── Vagrantfile
├── inventory
├── playbook1<span class="hljs-selector-class">.yml</span>
├── playbook2<span class="hljs-selector-class">.yml</span>
└── templates
    └── myconfig<span class="hljs-selector-class">.j2</span>

</code></pre><p>当 ansible 找到一个 <code>template</code> 语句后它会在 <code>templates</code> 文件夹内查找，并将把被 <code>"{{"</code> 和 <code>"}}"</code> 括起来的变量展开来。</p>
<p>示例模板：</p>
<pre><code class="hljs xquery">this is just an example vault_dir: "{{"path_to_vault"}}" secret_password: "{{"secret_key"}}"

</code></pre><p>即使你不扩展变量你也可以使用 <code>template</code>。考虑到将来会添加所以我先做了。比如创建一个 <code>hosts.j2</code> 模板并加入主机名和 IP。</p>
<pre><code class="hljs css">10<span class="hljs-selector-class">.1</span><span class="hljs-selector-class">.1</span><span class="hljs-selector-class">.11</span> <span class="hljs-selector-tag">web1</span>
10<span class="hljs-selector-class">.1</span><span class="hljs-selector-class">.1</span><span class="hljs-selector-class">.12</span> <span class="hljs-selector-tag">web2</span>
10<span class="hljs-selector-class">.1</span><span class="hljs-selector-class">.1</span><span class="hljs-selector-class">.21</span> <span class="hljs-selector-tag">dbserver</span>

</code></pre><p>这里要用像这样的语句：</p>
<pre><code class="hljs routeros">  -  name: Installing the hosts file <span class="hljs-keyword">in</span> all servers
     template: <span class="hljs-attribute">src</span>=hosts.j2 <span class="hljs-attribute">dest</span>=/etc/hosts <span class="hljs-attribute">mode</span>=644

</code></pre><h4><a href="#shell-命令"></a>shell 命令</h4>
<p>你应该尽量使用模块，因为 Ansible 可以跟踪任务的状态，并避免不必要的重复，但有时 shell 命令是不可避免的。 对于这些情况，Ansible 提供两个选项：</p>
<ul>
<li><a href="http://docs.ansible.com/ansible/command_module.html">command</a>：直接运行一个命令，没有环境变量或重定向（<code>|</code>，<code>&lt;</code>，<code>&gt;</code> 等）</li>
<li><a href="http://docs.ansible.com/ansible/shell_module.html">shell</a>：运行 <code>/bin/sh</code> 并展开变量和支持重定向</li>
</ul>
<h4><a href="#其他有用的模块"></a>其他有用的模块</h4>
<ul>
<li><a href="http://docs.ansible.com/ansible/apt_repository_module.html">apt_repository</a> - 在 Debian 系的发行版中添加/删除包仓库</li>
<li><a href="https://docs.ansible.com/ansible/yum_repository_module.html">yum_repository</a> - 在 RedHat 系的发行版中添加/删除包仓库</li>
<li><a href="http://docs.ansible.com/ansible/service_module.html">service</a> - 启动/停止/重新启动/启用/禁用服务</li>
<li><a href="http://docs.ansible.com/ansible/git_module.html">git</a> - 从 git 服务器部署代码</li>
<li><a href="http://docs.ansible.com/ansible/unarchive_module.html">unarchive</a> - 从 Web 或本地源解开软件包</li>
</ul>
<h4><a href="#只在一台服务器中运行任务"></a>只在一台服务器中运行任务</h4>
<p>Rails 使用 <a href="http://edgeguides.rubyonrails.org/active_record_migrations.html">migrations</a> 来逐步更改数据库，但由于你有多个应用程序服务器，因此这些迁移任务不能被分配为组任务，而我们只需要一个服务器来运行迁移。在这种情况下，当使用 <code>run_once</code> 时，<code>run_once</code> 将分派任务到一个服务器，并直到这个任务完成继续下一个任务。你只需要在你的任务中设置 <code>run_once：true</code>。</p>
<pre><code class="hljs yaml"><span class="hljs-attr">    - name:</span> <span class="hljs-string">'Run db:migrate'</span>
<span class="hljs-attr">      shell:</span> <span class="hljs-string">cd</span> <span class="hljs-string">"{{"appdir"}}";rails</span> <span class="hljs-attr">db:migrate</span>
<span class="hljs-attr">      run_once:</span> <span class="hljs-literal">true</span>

</code></pre><h4><a href="#会失败的任务"></a>会失败的任务</h4>
<p>通过指定 <code>ignore_errors：true</code>，你可以运行可能会失败的任务，但不会影响剧本中剩余的任务完成。这是非常有用的，例如，当删除最初并不存在的日志文件时。</p>
<pre><code class="hljs dockerfile">    - name: <span class="hljs-string">'Delete logs'</span>
      <span class="hljs-keyword">shell</span><span class="bash">: rm -f /var/<span class="hljs-built_in">log</span>/nginx/errors.log
</span>      ignore_errors: true

</code></pre><h3><a href="#放到一起"></a>放到一起</h3>
<p>现在用我们先前学到的，这里是每个文件的最终版：</p>
<p><code>Vagrantfile</code>：</p>
<pre><code class="hljs coq">VMs = [
    [ <span class="hljs-string">"web1"</span>, <span class="hljs-string">"10.1.1.11"</span>],
    [ <span class="hljs-string">"web2"</span>, <span class="hljs-string">"10.1.1.12"</span>],
    [ <span class="hljs-string">"dbserver"</span>, <span class="hljs-string">"10.1.1.21"</span>],
  ]

Vagrant.configure(<span class="hljs-number">2</span>) <span class="hljs-built_in">do</span> |<span class="hljs-type">config</span>|
  <span class="hljs-type">VMs</span>.each { |<span class="hljs-type">vm</span>|
    <span class="hljs-type">config</span>.vm.define vm[<span class="hljs-number">0</span>] <span class="hljs-built_in">do</span> |<span class="hljs-type">box</span>|
      <span class="hljs-type">box</span>.vm.box = <span class="hljs-string">"ubuntu/trusty64"</span>
      box.vm.network <span class="hljs-string">"private_network"</span>, ip: vm[<span class="hljs-number">1</span>]
      box.vm.hostname = vm[<span class="hljs-number">0</span>]
      box.vm.provider <span class="hljs-string">"virtualbox"</span> <span class="hljs-built_in">do</span> |<span class="hljs-type">vb</span>|
         <span class="hljs-type">vb</span>.memory = <span class="hljs-string">"512"</span>
      <span class="hljs-keyword">end</span>
    <span class="hljs-keyword">end</span>
  }
<span class="hljs-keyword">end</span>

</code></pre><p><code>inventory</code>：</p>
<pre><code class="hljs routeros">[all:children]
webs
db

[all:vars]
<span class="hljs-attribute">ansible_user</span>=vagrant
<span class="hljs-attribute">ansible_ssh_pass</span>=vagrant

[webs]
web1 <span class="hljs-attribute">ansible_host</span>=10.1.1.11
web2 <span class="hljs-attribute">ansible_host</span>=10.1.1.12

[db]
dbserver <span class="hljs-attribute">ansible_host</span>=10.1.1.21

</code></pre><p><code>templates/hosts.j2</code>:</p>
<pre><code class="hljs css">10<span class="hljs-selector-class">.1</span><span class="hljs-selector-class">.1</span><span class="hljs-selector-class">.11</span> <span class="hljs-selector-tag">web1</span>
10<span class="hljs-selector-class">.1</span><span class="hljs-selector-class">.1</span><span class="hljs-selector-class">.12</span> <span class="hljs-selector-tag">web2</span>
10<span class="hljs-selector-class">.1</span><span class="hljs-selector-class">.1</span><span class="hljs-selector-class">.21</span> <span class="hljs-selector-tag">dbserver</span>

</code></pre><p><code>templates/my.cnf.j2</code>：</p>
<pre><code class="hljs makefile">[client]
port        = 3306
socket      = /var/run/mysqld/mysqld.sock

[mysqld_safe]
socket      = /var/run/mysqld/mysqld.sock
nice        = 0

[mysqld]
server-id   = 1
user        = mysql
pid-file    = /var/run/mysqld/mysqld.pid
socket      = /var/run/mysqld/mysqld.sock
port        = 3306
basedir     = /usr
datadir     = /var/lib/mysql
tmpdir      = /tmp
lc-messages-dir = /usr/share/mysql
skip-external-locking
bind-address        = 0.0.0.0
key_buffer      = 16M
max_allowed_packet  = 16M
thread_stack        = 192K
thread_cache_size       = 8
myisam-recover         = BACKUP
query_cache_limit   = 1M
query_cache_size        = 16M
log_error = /var/log/mysql/error.log
expire_logs_days    = 10
max_binlog_size         = 100M

[mysqldump]
quick
quote-names
max_allowed_packet  = 16M

[mysql]

[isamchk]
key_buffer      = 16M

!includedir /etc/mysql/conf.d/

</code></pre><p><code>final-playbook.yml</code>：</p>
<pre><code class="hljs haml">-<span class="ruby"> <span class="hljs-symbol">hosts:</span> all
</span>  become_user: root
  become: true
  tasks:
    -<span class="ruby"> <span class="hljs-symbol">name:</span> <span class="hljs-string">'Install common software on all servers'</span>
</span>      apt: name="{{"item"}}" state=present
      with_items:
        -<span class="ruby"> git
</span>        -<span class="ruby"> mysql-client
</span>        -<span class="ruby"> libmysqlclient-dev
</span>        -<span class="ruby"> build-essential
</span>        -<span class="ruby"> python-software-properties
</span>    -<span class="ruby"> <span class="hljs-symbol">name:</span> <span class="hljs-string">'Install hosts file'</span>
</span>      template: src=hosts.j2 dest=/etc/hosts mode=644

-<span class="ruby"> <span class="hljs-symbol">hosts:</span> db
</span>  become_user: root
  become: true
  tasks:
    -<span class="ruby"> <span class="hljs-symbol">name:</span> <span class="hljs-string">'Software for DB server'</span>
</span>      apt: name="{{"item"}}" state=present
      with_items:
        -<span class="ruby"> mysql-server
</span>        -<span class="ruby"> percona-xtrabackup
</span>        -<span class="ruby"> mytop
</span>        -<span class="ruby"> mysql-utilities
</span>    -<span class="ruby"> <span class="hljs-symbol">name:</span> <span class="hljs-string">'MySQL config file'</span>
</span>      template: src=my.cnf.j2 dest=/etc/mysql/my.cnf
    -<span class="ruby"> <span class="hljs-symbol">name:</span> <span class="hljs-string">'Restart MySQL'</span>
</span>      service: name=mysql state=restarted
    -<span class="ruby"> <span class="hljs-symbol">name:</span> <span class="hljs-string">'Grant access to web app servers'</span>
</span>      shell: echo 'GRANT ALL PRIVILEGES ON *.* TO "root"@"%" WITH GRANT OPTION;FLUSH PRIVILEGES;'|mysql -u root mysql

-<span class="ruby"> <span class="hljs-symbol">hosts:</span> webs
</span>  vars:
    -<span class="ruby"> <span class="hljs-symbol">appdir:</span> /opt/dummyapp
</span>  become_user: root
  become: true
  tasks:
    -<span class="ruby"> <span class="hljs-symbol">name:</span> <span class="hljs-string">'Add ruby-ng repo'</span>
</span>      apt_repository: repo='ppa:brightbox/ruby-ng'
    -<span class="ruby"> <span class="hljs-symbol">name:</span> <span class="hljs-string">'Install rails software'</span>
</span>      apt: name="{{"item"}}" state=present
      with_items:
        -<span class="ruby"> ruby-dev
</span>        -<span class="ruby"> ruby-all-dev
</span>        -<span class="ruby"> ruby2.<span class="hljs-number">2</span>
</span>        -<span class="ruby"> ruby2.<span class="hljs-number">2</span>-dev
</span>        -<span class="ruby"> ruby-switch
</span>        -<span class="ruby"> libcurl4-openssl-dev
</span>        -<span class="ruby"> libssl-dev
</span>        -<span class="ruby"> zlib1g-dev
</span>        -<span class="ruby"> nodejs
</span>    -<span class="ruby"> <span class="hljs-symbol">name:</span> <span class="hljs-string">'Set ruby to 2.2'</span>
</span>      shell: ruby-switch --set ruby2.2
    -<span class="ruby"> <span class="hljs-symbol">name:</span> <span class="hljs-string">'Install gems'</span>
</span>      shell: gem install bundler rails
    -<span class="ruby"> <span class="hljs-symbol">name:</span> <span class="hljs-string">'Kill puma if running'</span>
</span>      shell: file /run/puma.pid &gt;/dev/null &amp;&amp; kill `cat /run/puma.pid` 2&gt;/dev/null
      ignore_errors: True
    -<span class="ruby"> <span class="hljs-symbol">name:</span> <span class="hljs-string">'Clone app repo'</span>
</span>      git:
           repo=https://github.com/c0d5x/rails_dummyapp.git
           dest="{{"appdir"}}"
           version=staging
           force=yes
    -<span class="ruby"> <span class="hljs-symbol">name:</span> <span class="hljs-string">'Run bundler'</span>
</span>      shell: cd "{{"appdir"}}";bundler
    -<span class="ruby"> <span class="hljs-symbol">name:</span> <span class="hljs-string">'Run db:setup'</span>
</span>      shell: cd "{{"appdir"}}";rails db:setup
      run_once: true
    -<span class="ruby"> <span class="hljs-symbol">name:</span> <span class="hljs-string">'Run db:migrate'</span>
</span>      shell: cd "{{"appdir"}}";rails db:migrate
      run_once: true
    -<span class="ruby"> <span class="hljs-symbol">name:</span> <span class="hljs-string">'Run rails server'</span>
</span>      shell: cd "{{"appdir"}}";rails server -b 0.0.0.0 -p 80 --pid /run/puma.pid -d

</code></pre><h3><a href="#放在你的环境中"></a>放在你的环境中</h3>
<p>将这些文件放在相同的目录，运行下面的命令打开你的开发环境：</p>
<pre><code class="hljs stylus">vagrant up
ansible-playbook -<span class="hljs-selector-tag">i</span> inventory final-playbook<span class="hljs-selector-class">.yml</span>

</code></pre><h3><a href="#部署新的代码"></a>部署新的代码</h3>
<p>确保修改了代码并推送到了仓库中。接下来，确保你 git 语句中使用了正确的分支：</p>
<pre><code class="hljs vim">    - name: <span class="hljs-string">'Clone app repo'</span>
      gi<span class="hljs-variable">t:</span>
           repo=http<span class="hljs-variable">s:</span>//github.<span class="hljs-keyword">com</span>/c0d5x/rails_dummyapp.git
           dest="{{"appdir"}}"
           <span class="hljs-keyword">version</span>=staging
           force=yes

</code></pre><p>作为一个例子，你可以修改 <code>version</code> 字段为 <code>master</code>，再次运行剧本：</p>
<pre><code class="hljs stylus">ansible-playbook -<span class="hljs-selector-tag">i</span> inventory final-playbook<span class="hljs-selector-class">.yml</span>

</code></pre><p>检查所有的 web 服务器上的页面是否已更改：<code>http://10.1.1.11</code> 或 <code>http://10.1.1.12</code>。将其更改为 <code>version = staging</code> 并重新运行剧本并再次检查页面。</p>
<p>你还可以创建只包含与部署相关的任务的替代剧本，以便其运行更快。</p>
<h3><a href="#接下来是什么-"></a>接下来是什么 ？！</h3>
<p>这只是可以做的很小一部分。我们没有接触角色（role）、过滤器（filter）、调试等许多其他很棒的功能，但我希望它给了你一个良好的开始！所以，请继续学习并使用它。如果你有任何问题，你可以在 <a href="https://twitter.com/c0d5x">twitter</a> 或评论栏联系我，让我知道你还想知道哪些关于 ansible 的东西！</p>
<hr>
<p>via: <a href="https://gorillalogic.com/blog/getting-started-with-ansible/?utm_source=webopsweekly&amp;utm_medium=email">https://gorillalogic.com/blog/getting-started-with-ansible/?utm_source=webopsweekly&amp;utm_medium=email</a></p>
<p>作者：<a href="https://gorillalogic.com/author/josehidalgo/">JOSE HIDALGO</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 组织编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Ansible 起步指南

## 原文链接
[https://www.zcfy.cc/article/getting-started-with-ansible](https://www.zcfy.cc/article/getting-started-with-ansible)

