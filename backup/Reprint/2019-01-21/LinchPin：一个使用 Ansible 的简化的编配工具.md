---
title: 'LinchPin：一个使用 Ansible 的简化的编配工具' 
date: 2019-01-21 2:30:06
hidden: true
slug: avsi857wwur
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#linchpin一个使用-ansible-的简化的编配工具"></a>LinchPin：一个使用 Ansible 的简化的编配工具</h1>
<blockquote>
<p>2016 年末开始的 LinchPin，现在已经拥有一个 Python API 和一个成长中的社区。</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/403075493fe408ca055334c0aec8837e7273442f/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f696d6167652d66756c6c2d73697a652f7075626c69632f6c6561642d696d616765732f746f6f6c626f782d6c6561726e2d647261772d636f6e7461696e65722d79656172626f6f6b2e706e673f69746f6b3d784462777a317050"><img src="https://p0.ssl.qhimg.com/t01246bddc5e4e0f431.png" alt="LinchPin 1.0：一个使用 Ansible 的成熟的混合云编配工具" title="LinchPin 1.0: A maturing hybrid cloud orchestration tool using Ansible"></a></p>
<blockquote>
<p>Image by : <a href="https://www.flickr.com/photos/internetarchivebookimages/14587478927/in/photolist-oe2Gwy-otuvuy-otus3U-otuuh3-ovwtoH-oe2AXD-otutEw-ovwpd8-oe2Me9-ovf688-oxhaVa-oe2mNh-oe3AN6-ovuyL7-ovf9Kt-oe2m4G-ovwqsH-ovjfJY-ovjfrU-oe2rAU-otuuBw-oe3Dgn-oe2JHY-ovfcrF-oe2Ns1-ovjh2N-oe3AmK-otuwP7-ovwrHt-ovwmpH-ovf892-ovfbsr-ovuAzN-ovf3qp-ovuFcJ-oe2T3U-ovwn8r-oe2L3T-oe3ELr-oe2Dmr-ovuyB9-ovuA9s-otuvPG-oturHA-ovuDAh-ovwkV6-ovf5Yv-ovuCC5-ovfc2x-oxhf1V">Internet Archive Book Images</a>. Modified by Opensource.com. CC BY-SA 4.0</p>
</blockquote>
<p>去年，<a href="http://sexysexypenguins.com/posts/introducing-linch-pin/">我的团队公布了</a> <a href="http://linch-pin.readthedocs.io/en/develop/">LinchPin</a>，这是一个使用 Ansible 的混合云编配orchestration工具。配给provision云资源从来没有这么容易便捷过。借助 Ansible 强力支持，LinchPin 专注于简化，使云资源让用户可以触手可及。在这篇文章中，我将介绍 LinchPin，并且去看看过去的 10 个月该项目是如何逐渐成熟。</p>
<p>（LCTT 译注：关于 orchestration 应该翻译成惯例的“编排”还是“编配”，有个 @wffger 提出的<a href="https://github.com/LCTT/TranslateProject/issues/6715">建议</a> ，欢迎大家参与讨论。）</p>
<p>LinchPin 刚出现的时候，使用 <code>ansible-playbook</code> 命令去运行 LinchPin ，虽然可以完成，但是还是很复杂的，LinchPin 现在有一个前端命令行用户界面（CLI），它是用 <a href="http://click.pocoo.org/">Click</a> 写的，而且它使 LinchPin 比以前更简化。</p>
<p>没有止步于 CLI，LinchPin 现在还有一个 <a href="https://opensource.com/resources/python">Python</a> API，它可以用于管理资源，比如，Amazon EC2 和 OpenStack 实例、网络、存储、安全组等等。这个 API <a href="http://linchpin.readthedocs.io/en/develop/libdocs.html">文档</a> 可以在你想去尝试 LinchPin 的 Python API 时帮助你。</p>
<h3><a href="#playbook-是一个库"></a>Playbook 是一个库</h3>
<p>因为 LinchPin 的核心是 <a href="http://docs.ansible.com/ansible/playbooks.html">Ansible playbook</a>，其角色、模块、过滤器，以及任何被称为 Ansible 模块的东西都被移进 LinchPin 库中，这意味着我们虽然可以直接调用 playbook，但它不是资源管理的首选机制。<code>linchpin</code> 可执行文件事实上已经成为该命令行的前端。</p>
<h3><a href="#深入了解命令行"></a>深入了解命令行</h3>
<p>让我们深入了解 <code>linchpin</code> 命令行：</p>
<pre><code class="hljs routeros">$ linchpin
Usage: linchpin [OPTIONS] COMMAND [ARGS]<span class="hljs-built_in">..</span>.

  linchpin: hybrid cloud orchestration

Options:
  -c, --config PATH       Path <span class="hljs-keyword">to</span><span class="hljs-built_in"> config </span>file
  -w, --workspace PATH    Use the specified workspace <span class="hljs-keyword">if</span> the familiar Jenkins
                          <span class="hljs-variable">$WORKSPACE</span> environment variable is <span class="hljs-keyword">not</span> <span class="hljs-builtin-name">set</span>
  -v, --verbose           <span class="hljs-builtin-name">Enable</span> verbose output
  --version               Prints the version <span class="hljs-keyword">and</span> exits
  --creds-path PATH       Use the specified credentials path <span class="hljs-keyword">if</span> WORKSPACE
                          environment variable is <span class="hljs-keyword">not</span> <span class="hljs-builtin-name">set</span>
  -h, --help              Show this message <span class="hljs-keyword">and</span> exit.

Commands:
  init     Initializes a linchpin project.
  up       Provisions nodes <span class="hljs-keyword">from</span> the given target(s) <span class="hljs-keyword">in</span><span class="hljs-built_in">..</span>.
  destroy  Destroys nodes <span class="hljs-keyword">from</span> the given target(s) <span class="hljs-keyword">in</span><span class="hljs-built_in">..</span>.

</code></pre><p>你可以立即看到一个简单的描述，以及命令的选项和参数。这个帮助的最下面的三个命令是本文的重点内容。</p>
<h4><a href="#配置文件"></a>配置文件</h4>
<p>之前有个名为 <code>linchpin_config.yml</code> 的文件。但现在这个文件没有了，替换它的是一个 ini 形式的配置文件，称为 <code>linchpin.conf</code>。虽然这个文件可以被修改或放到别的地方，它可以放置在配置文件容易找到的库路径中。在多数情况下，<code>linchpin.conf</code> 文件是不需要去修改的。</p>
<h4><a href="#工作空间"></a>工作空间</h4>
<p>工作空间workspace是一个定义好的文件系统路径，它是一个逻辑上的资源组。一个工作空间可以认为是一个特定环境、服务组、或其它逻辑组的一个单点。它也可以是一个所有可管理资源的大的存储容器。</p>
<p>工作空间可以在命令行上使用 <code>--workspace</code> （<code>-w</code>） 选项去指定，随后是工作空间路径。它也可以使用环境变量指定（比如，bash 中的 <code>$WORKSPACE</code>）。默认工作空间是当前目录。</p>
<h4><a href="#初始化-linchpin-init"></a>初始化 (<code>linchpin init</code>)</h4>
<p>运行 <code>linchpin init</code> 将生成一个需要的目录结构，以及一个 <code>PinFile</code>、<code>topology</code>、和 <code>layout</code> 文件的示例：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">export</span> WORKSPACE=/tmp/workspace</span>
<span class="hljs-meta">$</span><span class="bash"> linchpin init</span>
PinFile and file structure created at /tmp/workspace
<span class="hljs-meta">$</span><span class="bash"> <span class="hljs-built_in">cd</span> /tmp/workspace/</span>
<span class="hljs-meta">$</span><span class="bash"> tree</span>
.
├── credentials
├── hooks
├── inventories
├── layouts
│   └── example-layout.yml
├── PinFile
├── resources
└── topologies
    └── example-topology.yml

</code></pre><p>在这个时候，可以执行 <code>linchpin up</code> ，然后提供一个 <code>libvirt</code> 虚拟机，和一个名为 <code>linchpin-centos71</code> 的网络。会生成一个库存inventory，并放在 <code>inventories/libvirt.inventory</code> 目录中。它可以通过读取 <code>topologies/example-topology.yml</code> 和 <code>topology_name</code> 的值了解它。</p>
<h4><a href="#配给provisioning-linchpin-up"></a>配给provisioning (<code>linchpin up</code>)</h4>
<p>一旦有了一个 PinFile、拓扑、和一个可选的布局，就可以配给provisioning了。</p>
<p>我们使用 dummy （模拟）工具，因为用它来配给非常简单；它不需要任何额外的东西（认证、网络、等等）。dummy 配给程序会创建一个临时文件，它表示所配给的主机。如果临时文件没有任何数据，说明主机没有被配给，或者它已经被销毁了。</p>
<p>dummy 配给程序的目录树大致如下：</p>
<pre><code class="hljs stylus">$ tree
.
├── hooks
├── inventories
├── layouts
│   └── dummy-layout<span class="hljs-selector-class">.yml</span>
├── PinFile
├── resources
└── topologies
    └── dummy-cluster<span class="hljs-selector-class">.yml</span>

</code></pre><p>PinFile 也很简单；它指定了它的拓扑，并且为 <code>dummy1</code> 目标提供一个可选的布局：</p>
<pre><code class="hljs yaml"><span class="hljs-meta">---</span>
<span class="hljs-attr">dummy1:</span>
<span class="hljs-attr">  topology:</span> <span class="hljs-string">dummy-cluster.yml</span>
<span class="hljs-attr">  layout:</span> <span class="hljs-string">dummy-layout.yml</span>

</code></pre><p><code>dummy-cluster.yml</code> 拓扑文件是一个引用，指向到配给的三个 <code>dummy_node</code> 类型的资源：</p>
<pre><code class="hljs yaml"><span class="hljs-meta">---</span>
<span class="hljs-attr">topology_name:</span> <span class="hljs-string">"dummy_cluster"</span> <span class="hljs-comment"># topology name</span>
<span class="hljs-attr">resource_groups:</span>
<span class="hljs-bullet">  -</span>
<span class="hljs-attr">    resource_group_name:</span> <span class="hljs-string">"dummy"</span>
<span class="hljs-attr">    resource_group_type:</span> <span class="hljs-string">"dummy"</span>
<span class="hljs-attr">    resource_definitions:</span>
<span class="hljs-bullet">      -</span>
<span class="hljs-attr">        name:</span> <span class="hljs-string">"web"</span>
<span class="hljs-attr">        type:</span> <span class="hljs-string">"dummy_node"</span>
<span class="hljs-attr">        count:</span> <span class="hljs-number">3</span>

</code></pre><p>执行命令 <code>linchpin up</code> 将基于上面的 <code>topology_name</code>（在这个案例中是 <code>dummy_cluster</code>）生成 <code>resources</code> 和 <code>inventory</code> 文件。</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> linchpin up</span>
target: dummy1, action: up
<span class="hljs-meta">
$</span><span class="bash"> ls {resources,inventories}/dummy*</span>
inventories/dummy_cluster.inventory  resources/dummy_cluster.output

</code></pre><p>要验证 dummy 集群的资源，可以检查 <code>/tmp/dummy.hosts</code>：</p>
<pre><code class="hljs stylus">$ cat /tmp/dummy<span class="hljs-selector-class">.hosts</span>
web-<span class="hljs-number">0</span><span class="hljs-selector-class">.example</span><span class="hljs-selector-class">.net</span>
web-<span class="hljs-number">1</span><span class="hljs-selector-class">.example</span><span class="hljs-selector-class">.net</span>
web-<span class="hljs-number">2</span><span class="hljs-selector-class">.example</span><span class="hljs-selector-class">.net</span>

</code></pre><p>Dummy 模块为假定的（或模拟的）配给提供了一个基本工具。关于在 OpenStack、AWS EC2、Google Cloud 上和 LinchPin 的更多详细情况，可以去看<a href="https://github.com/CentOS-PaaS-SIG/linchpin/tree/develop/linchpin/examples/topologies">示例</a>。</p>
<h4><a href="#库存inventory生成"></a>库存inventory生成</h4>
<p>作为上面提到的 PinFile 的一部分，可以指定一个 <code>layout</code>。如果这个文件被指定，并且放在一个正确的位置上，就会为配给的资源自动生成一个用于 Ansible 的静态库存inventory文件：</p>
<pre><code class="hljs yaml"><span class="hljs-meta">---</span>
<span class="hljs-attr">inventory_layout:</span>
<span class="hljs-attr">  vars:</span>
<span class="hljs-attr">    hostname:</span> <span class="hljs-string">`ip`</span> 
<span class="hljs-attr">  hosts:</span>
<span class="hljs-attr">    example-node:</span>
<span class="hljs-attr">      count:</span> <span class="hljs-number">3</span>
<span class="hljs-attr">      host_groups:</span>
<span class="hljs-bullet">        -</span> <span class="hljs-string">example</span>

</code></pre><p>当 <code>linchpin up</code> 运行完成，资源文件将提供一个很有用的详细信息。特别是，插入到静态库存的 IP 地址或主机名：</p>
<pre><code class="hljs stylus">[example]
web-<span class="hljs-number">2</span><span class="hljs-selector-class">.example</span><span class="hljs-selector-class">.net</span> hostname=web-<span class="hljs-number">2</span><span class="hljs-selector-class">.example</span><span class="hljs-selector-class">.net</span>
web-<span class="hljs-number">1</span><span class="hljs-selector-class">.example</span><span class="hljs-selector-class">.net</span> hostname=web-<span class="hljs-number">1</span><span class="hljs-selector-class">.example</span><span class="hljs-selector-class">.net</span>
web-<span class="hljs-number">0</span><span class="hljs-selector-class">.example</span><span class="hljs-selector-class">.net</span> hostname=web-<span class="hljs-number">0</span><span class="hljs-selector-class">.example</span><span class="hljs-selector-class">.net</span>

[all]
web-<span class="hljs-number">2</span><span class="hljs-selector-class">.example</span><span class="hljs-selector-class">.net</span> hostname=web-<span class="hljs-number">2</span><span class="hljs-selector-class">.example</span><span class="hljs-selector-class">.net</span>
web-<span class="hljs-number">1</span><span class="hljs-selector-class">.example</span><span class="hljs-selector-class">.net</span> hostname=web-<span class="hljs-number">1</span><span class="hljs-selector-class">.example</span><span class="hljs-selector-class">.net</span>
web-<span class="hljs-number">0</span><span class="hljs-selector-class">.example</span><span class="hljs-selector-class">.net</span> hostname=web-<span class="hljs-number">0</span><span class="hljs-selector-class">.example</span><span class="hljs-selector-class">.net</span>

</code></pre><h4><a href="#卸载-linchpin-destroy"></a>卸载 （<code>linchpin destroy</code>）</h4>
<p>LinchPin 也可以执行资源卸载。卸载动作一般认为该资源是已经配给好的；然而，因为 Ansible 是幂等的idempotent，<code>linchpin destroy</code> 将仅检查确认该资源是启用的。如果这个资源已经是启用的，它将去卸载它。</p>
<p>命令 <code>linchpin destroy</code> 也将使用资源和/或拓扑文件去决定合适的卸载过程。</p>
<p>Ansible <code>dummy</code> 角色不使用资源，卸载期间仅有拓扑：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> linchpin destroy</span>
target: dummy1, action: destroy
<span class="hljs-meta">
$</span><span class="bash"> cat /tmp/dummy.hosts</span>
-- EMPTY FILE --

</code></pre><p>针对暂时的资源，卸载功能有一些限制，像网络、存储、等等。网络资源可以被用于多个云实例。在这种情况下，执行一个 <code>linchpin destroy</code> 某些资源就不能卸载。这取决于每个供应商的实现。查看每个<a href="https://github.com/CentOS-PaaS-SIG/linch-pin/tree/develop/linchpin/provision/roles">供应商</a>的具体实现。</p>
<h3><a href="#linchpin-的-python-api"></a>LinchPin 的 Python API</h3>
<p>在 <code>linchpin</code> 命令行中实现的功能大多数都是用 Python API 写的。这个 API，虽然不完整，但它已经成为 LinchPin 工具的至关重要的组件。</p>
<p>这个 API 由下面的三个包组成：</p>
<ul>
<li><code>linchpin</code></li>
<li><code>linchpin.cli</code></li>
<li><code>linchpin.api</code></li>
</ul>
<p>该命令行工具是基于 <code>linchpin</code> 包来管理的。它导入了 <code>linchpin.cli</code> 模块和类，该类是 <code>linchpin.api</code> 的子类。这样做的目的是为了允许使用 <code>linchpin.api</code> 来做其它的 LinchPin 实现，比如像计划中的 RESTful API。</p>
<p>更多信息，去查看 <a href="http://linchpin.readthedocs.io/en/develop/libdocs.html">Python API library documentation on Read the Docs</a>。</p>
<h3><a href="#hook"></a>Hook</h3>
<p>LinchPin 1.0 的其中一个大的变化是转向 hook。hook 的目标是在 <code>linchpin</code> 运行期间的特定状态下，允许配置使用更多外部资源。目前的状态有：</p>
<ul>
<li><code>preup</code>: 在配给拓扑资源之前运行</li>
<li><code>postup</code>: 在配给拓扑资源之后运行，并且生成可选的库存inventory</li>
<li><code>predestroy</code>: 卸载拓扑资源之前运行</li>
<li><code>postdestroy</code>: 卸载拓扑资源之后运行</li>
</ul>
<p>在每种状态下，这些 hooks 允许运行外部脚本。存在几种类型的 hook，包括一个定制的叫做 <em>Action Managers</em>。这是一个内置的 Action Manager 的列表：</p>
<ul>
<li><code>shell</code>: 允许任何的内联inline的 shell 命令，或者一个可运行的 shell 脚本</li>
<li><code>python</code>: 运行一个 Python 脚本</li>
<li><code>ansible</code>: 运行一个 Ansible playbook，允许传递一个 <code>vars_file</code> 和 <code>extra_vars</code> 作为 Python 字典</li>
<li><code>nodejs</code>: 运行一个 Node.js 脚本</li>
<li><code>ruby</code>: 运行一个 Ruby 脚本</li>
</ul>
<p>hook 被绑定到一个特定的目标，并且每个目标使用时必须重新声明。将来，hook 将可能是全局的，然后它们在每个目标的 <code>hooks</code> 节下命名会更简单。</p>
<h4><a href="#使用-hook"></a>使用 hook</h4>
<p>hook 描述起来非常简单，但理解它们强大的功能却并不简单。这个特性的存在是为了给用户灵活提供那些 LinchPin 开发者所没有考虑到的功能。这个概念可能会带来 ping 一套系统的简单方式，举个实例，比如在运行另一个 hook 之前。</p>
<p>更仔细地去研究 <em>工作空间</em> ，你可能会注意到 <code>hooks</code> 目录，让我们看一下这个目录的结构：</p>
<pre><code class="hljs routeros">$ tree hooks/
hooks/
├── ansible
│   ├──<span class="hljs-built_in"> ping
</span>│   │   └── dummy_ping.yaml
└── shell
    └── database
        ├── init_db.sh
        └── setup_db.sh

</code></pre><p>在任何情况下，hook 都可以用在 <code>PinFile</code> 中，展示如下：</p>
<pre><code class="hljs yaml"><span class="hljs-meta">---</span>
<span class="hljs-attr">dummy1:</span>
<span class="hljs-attr">  topology:</span> <span class="hljs-string">dummy-cluster.yml</span>
<span class="hljs-attr">  layout:</span> <span class="hljs-string">dummy-layout.yml</span>
<span class="hljs-attr">  hooks:</span>
<span class="hljs-attr">    postup:</span>
<span class="hljs-attr">      - name:</span> <span class="hljs-string">ping</span>
<span class="hljs-attr">        type:</span> <span class="hljs-string">ansible</span>
<span class="hljs-attr">        actions:</span>
<span class="hljs-bullet">          -</span> <span class="hljs-string">dummy_ping.yaml</span>
<span class="hljs-attr">      - name:</span> <span class="hljs-string">database</span>
<span class="hljs-attr">        type:</span> <span class="hljs-string">shell</span>
<span class="hljs-attr">        actions:</span>
<span class="hljs-bullet">          -</span> <span class="hljs-string">setup_db.sh</span>
<span class="hljs-bullet">          -</span> <span class="hljs-string">init_db.sh</span>

</code></pre><p>基本概念是有三个 postup 动作要完成。Hook 是从上到下运行的，因此，Ansible <code>ping</code> 任务将首先运行，紧接着是两个 shell 任务， <code>setup_db.sh</code> 和 <code>init_db.sh</code>。假设 hook 运行成功。将发生一个系统的 ping，然后，一个数据库被安装和初始化。</p>
<h3><a href="#认证的驱动程序"></a>认证的驱动程序</h3>
<p>在 LinchPin 的最初设计中，开发者决定在 Ansible playbooks 中管理认证；然而，逐渐有更多的 API 和命令行驱动的工具后，意味着认证将被置于 playbooks 库之外，并且还可以根据需要去传递认证值。</p>
<h4><a href="#配置"></a>配置</h4>
<p>让用户使用驱动程序提供的认证方法去完成这个任务。举个实例，如果对于 OpenStack 调用的拓扑，标准方法是使用一个 yaml 文件，或者类似于 <code>OS_</code> 前缀的环境变量。<code>clouds.yaml</code> 文件是一个 profile 文件的组成部分，它有一个 <code>auth</code> 节：</p>
<pre><code class="hljs less"><span class="hljs-attribute">clouds</span>:
  <span class="hljs-attribute">default</span>:
    <span class="hljs-attribute">auth</span>:
      <span class="hljs-attribute">auth_url</span>: <span class="hljs-attribute">http</span>:<span class="hljs-comment">//stack.example.com:5000/v2.0/</span>
      <span class="hljs-attribute">project_name</span>: factory2
      <span class="hljs-attribute">username</span>: factory-user
      <span class="hljs-attribute">password</span>: password-is-not-a-good-password

</code></pre><p>更多详细信息在 <a href="https://docs.openstack.org/developer/python-openstackclient/configuration.html">OpenStack documentation</a>。</p>
<p>这个 <code>clouds.yaml</code> 或者任何其它认证文件位于 <code>default_credentials_path</code> （比如，<code>~/.config/linchpin</code>）中，并在拓扑中引用：</p>
<pre><code class="hljs yaml"><span class="hljs-meta">---</span>
<span class="hljs-attr">topology_name:</span> <span class="hljs-string">openstack-test</span>
<span class="hljs-attr">resource_groups:</span>
<span class="hljs-bullet">  -</span>
<span class="hljs-attr">    resource_group_name:</span> <span class="hljs-string">linchpin</span>
<span class="hljs-attr">    resource_group_type:</span> <span class="hljs-string">openstack</span>
<span class="hljs-attr">    resource_definitions:</span>
<span class="hljs-attr">      - name:</span> <span class="hljs-string">resource</span>
<span class="hljs-attr">        type:</span> <span class="hljs-string">os_server</span>
<span class="hljs-attr">        flavor:</span> <span class="hljs-string">m1.small</span>
<span class="hljs-attr">        image:</span> <span class="hljs-string">rhel-7.2-server-x86_64-released</span>
<span class="hljs-attr">        count:</span> <span class="hljs-number">1</span>
<span class="hljs-attr">        keypair:</span> <span class="hljs-string">test-key</span>
<span class="hljs-attr">        networks:</span>
<span class="hljs-bullet">          -</span> <span class="hljs-string">test-net2</span>
<span class="hljs-attr">        fip_pool:</span> <span class="hljs-number">10.0</span><span class="hljs-number">.72</span><span class="hljs-number">.0</span><span class="hljs-string">/24</span>
<span class="hljs-attr">    credentials:</span>
<span class="hljs-attr">      filename:</span> <span class="hljs-string">clouds.yaml</span>
<span class="hljs-attr">      profile:</span> <span class="hljs-string">default</span>

</code></pre><p><code>default_credentials_path</code> 可以通过修改 <code>linchpin.conf</code> 改变。</p>
<p>拓扑在底部包含一个新的 <code>credentials</code> 节。使用 <code>openstack</code>、<code>ec2</code>、和 <code>gcloud</code> 模块，也可以去指定类似的凭据。认证驱动程序将查看给定的名为 <code>clouds.yaml</code> 的文件，并搜索名为 <code>default</code> 的 _配置_。</p>
<p>假设认证被找到并被加载，配给将正常继续。</p>
<h3><a href="#简化"></a>简化</h3>
<p>虽然 LinchPin 可以完成复杂的拓扑、库存布局、hooks、和认证管理，但是，终极目标是简化。通过使用一个命令行界面的简化，除了提升已经完成的 1.0 版的开发者体验外，LinchPin 将持续去展示复杂的配置可以很简单地去管理。</p>
<h3><a href="#社区的成长"></a>社区的成长</h3>
<p>在过去的一年中，LinchPin 的社区现在已经有了 <a href="https://www.redhat.com/mailman/listinfo/linchpin">邮件列表</a>和一个 IRC 频道（#linchpin on chat.freenode.net，而且在 <a href="https://github.com/CentOS-PaaS-SIG/linch-pin/projects/4">GitHub</a> 中我们很努力地管理它。</p>
<p>在过去的一年里，社区成员已经从 2 位核心开发者增加到大约 10 位贡献者。更多的人持续参与到项目中。如果你对 LinchPin 感兴趣，可以给我们写信、在 GitHub 上提问，加入 IRC，或者给我们发邮件。</p>
<p><em>这篇文章是基于 Clint Savage 在 OpenWest 上的演讲 <a href="https://www.openwest.org/custom/description.php?id=166">Introducing LinchPin: Hybrid cloud provisioning using Ansible</a> 整理的。<a href="https://www.openwest.org/">OpenWest</a> 将在 2017 年 7 月 12-15 日在盐城湖市举行。</em></p>
<hr>
<p>作者简介：</p>
<p>Clint Savage - 工作于 Red Hat 是一位负责原子项目（Project Atomic）的高级软件工程师。他的工作是为 Fedora、CentOS、和 Red Hat Enterprise Linux（RHEL）提供自动原子服务器构建。</p>
<hr>
<p>via: <a href="https://opensource.com/article/17/6/linchpin">https://opensource.com/article/17/6/linchpin</a></p>
<p>作者：<a href="https://opensource.com/users/herlo">Clint Savage</a> 译者：<a href="https://github.com/qhwdw">qhwdw</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
LinchPin：一个使用 Ansible 的简化的编配工具

## 原文链接
[https://www.zcfy.cc/article/linchpin-a-simplified-cloud-orchestration-tool-using-ansible](https://www.zcfy.cc/article/linchpin-a-simplified-cloud-orchestration-tool-using-ansible)

