---
title: 使用 ARA 分析 Ansible 运行
hidden: true
categories: reprint
slug: 3707de70
date: 2018-10-21 00:00:00
---

{{< raw >}}

            <h1><a href="#使用-ara-分析-ansible-运行"></a>使用 ARA 分析 Ansible 运行</h1>
<blockquote>
<p>Ansible 运行分析工具（ARA）与 Ansible 无缝集成，可以简单便捷的找到你所需数据的方法。</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/931c1a8d7c643d462bb4258c89beb40506a88b43/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f696d6167652d66756c6c2d73697a652f7075626c69632f6c6561642d696d616765732f627261696e5f646174612e706e673f69746f6b3d5248364e41333258"><img src="https://p0.ssl.qhimg.com/t01f7337e1e43c8e191.png" alt=""></a></p>
<p><a href="https://www.ansible.com/">Ansible</a> 是一个多功能平台，它已经成为管理服务器和服务器配置的流行平台。如今，Ansible 大量用于通过持续集成 （CI） 进行部署和测试。</p>
<p>在自动化持续集成的世界中，每天都有数百个甚至数千个作业运行测试、构建、编译、部署等等，这并不罕见。</p>
<h3><a href="#ansible-运行分析-ara-工具"></a>Ansible 运行分析 （ARA） 工具</h3>
<p>Ansible 运行生成大量控制台数据，在 CI 的环境下跟上大量的 Ansible 输出是具有挑战性的。Ansible Run Analysis（ARA） 工具使此详细输出可读并且使作业状态和调试信息更有代表性。ARA 组织了记录的剧本playbook数据，以便你尽可能快速和容易地搜索并找到你感兴趣的内容。</p>
<p>请注意，ARA 不会运行你的剧本playbook。相反，无论在哪它都它作为回调插件与 Ansible 集成。回调插件可以在响应事件时向 Ansible 添加新行为。它可以根据 Ansible 事件执行自定义操作，例如在主机开始执行或任务完成时执行。</p>
<p>与 <a href="https://www.ansible.com/products/awx-project">AWX</a> 和 <a href="https://www.ansible.com/products/tower">Tower</a> 相比，它们是控制整个工作流程的工具，具有仓库管理、剧本playbook执行、编辑功能等功能，ARA 的范围相对较窄：记录数据并提供直观的界面。这是一个相对简单的程序，易于安装和配置。</p>
<h4><a href="#安装"></a>安装</h4>
<p>在系统上安装 ARA 有两种方法：</p>
<ul>
<li>使用托管在 <a href="https://github.com/AjinkyaBapat/Ansible-Run-Analyser">GitHub 帐户</a> 上的 Ansible 角色。克隆仓库并：</li>
</ul>
<p>ansible-playbook Playbook.yml</p>
<pre><code class="hljs">
    如果剧本执行成功，你将看到：

</code></pre><p>TASK [ara : Display ara UI URL] <strong><strong><strong><strong><strong><em>**</em></strong></strong></strong></strong></strong>
   ok: [localhost] =&gt; {}
   "msg": "Access playbook records at <a href="http://YOUR_IP:9191&quot;">http://YOUR_IP:9191"</a></p>
<pre><code class="hljs">
</code></pre><p>注意：它从 Ansible 收集的 <code>ansible_default_ipv4</code> fact 中选择 IP 地址。如果没有收集这些 fact，请用 <code>roles/ara/tasks/</code> 文件夹中 <code>main.yml</code> 文件中的 IP 替换它。</p>
<p><code>`</code></p>
<ul>
<li>ARA 是一个在 <a href="https://github.com/dmsimard/ara">GitHub</a> 上以 Apache v2 许可证授权的开源项目。安装说明在快速入门章节。<a href="http://ara.readthedocs.io/en/latest/">文档</a>和 <a href="http://ara.readthedocs.io/en/latest/faq.html">FAQ</a> 可在 <a href="http://ara.readthedocs.io/en/latest/">readthedocs.io</a> 上找到。</li>
</ul>
<h4><a href="#ara-能做些什么"></a>ARA 能做些什么？</h4>
<p>下图显示了从浏览器启动 ARA 登录页面：</p>
<p><a href="https://camo.githubusercontent.com/d79f2c3f272921886fce12b99f76d66707074a1b/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f70616e6f706f6c795f696d6167655f6f726967696e616c2f7075626c69632f696d616765732f6c6966652d75706c6f6164732f6172615f6c616e64696e675f706167652e706e673f69746f6b3d506f42374b666842"><img src="https://p0.ssl.qhimg.com/t01710946700ea521b6.png" alt="ara landing page" title="ara landing page"></a></p>
<p><em>ARA 登录页面</em></p>
<p>它提供了每个主机或每个 playbook 的任务结果摘要：</p>
<p><a href="https://camo.githubusercontent.com/d2504a32bebec1e8cb35ee42b71f7bd1f313f221/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f70616e6f706f6c795f696d6167655f6f726967696e616c2f7075626c69632f696d616765732f6c6966652d75706c6f6164732f7461736b5f73756d6d61726965732e706e673f69746f6b3d3845425039735447"><img src="https://p0.ssl.qhimg.com/t01738b0fa2afd7aaf6.png" alt="task summaries" title="task summaries"></a></p>
<p><em>ARA 显示任务摘要</em></p>
<p>它允许你通过剧本，play，主机、任务或状态来过滤任务结果：</p>
<p><a href="https://camo.githubusercontent.com/d2395d618cd51dc842f9b523fd75214ec16e4872/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f70616e6f706f6c795f696d6167655f6f726967696e616c2f7075626c69632f696d616765732f6c6966652d75706c6f6164732f706c6179626f6f6b5f66696c74657265645f62795f686f7374732e706e673f69746f6b3d4c6f6c304b5f4d79"><img src="https://p0.ssl.qhimg.com/t018a1810cac7a402ba.png" alt="playbook runs filtered by hosts" title="playbook runs filtered by hosts"></a></p>
<p><em>通过主机过滤剧本运行</em></p>
<p>借助 ARA，你可以在摘要视图中轻松查看你感兴趣的结果，无论是特定的主机还是特定的任务：</p>
<p><a href="https://camo.githubusercontent.com/e8a313b357b2fce1b324ce1a748c7de696fab659/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f70616e6f706f6c795f696d6167655f6f726967696e616c2f7075626c69632f696d616765732f6c6966652d75706c6f6164732f73756d6d6172795f6f665f656163685f7461736b2e706e673f69746f6b3d4b4a6e4c48455a43"><img src="https://p0.ssl.qhimg.com/t01a66c63c8e7b45256.png" alt="summary of each task" title="summary of each task"></a></p>
<p><em>每项任务的详细摘要</em></p>
<p>ARA 支持在同一数据库中记录和查看多个运行。</p>
<p><a href="https://camo.githubusercontent.com/a328395022bf14add5b4e3ac4cacff1dd82df52e/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f70616e6f706f6c795f696d6167655f6f726967696e616c2f7075626c69632f696d616765732f6c6966652d75706c6f6164732f73686f77696e675f67617468657265645f66616374732e706e673f69746f6b3d46564463366f4130"><img src="https://p0.ssl.qhimg.com/t0153473d0dc628ef63.png" alt="show gathered facts" title="show gathered facts"></a></p>
<p><em>显示收集的 fact</em></p>
<h4><a href="#总结"></a>总结</h4>
<p>ARA 是一个已经帮助我从 Ansible 运行日志和输出中了解更多的有用资源。我强烈推荐给所有的 Ansible 使用者。</p>
<p>请随意分享，并请在评论中告诉我你使用 ARA 的经历。</p>
<p><strong>[参见我们的相关文章，<a href="/article/18/2/tips-success-when-getting-started-ansible">成功使用 Ansible 的秘诀</a>]。</strong></p>
<hr>
<p>via: <a href="https://opensource.com/article/18/5/analyzing-ansible-runs-using-ara">https://opensource.com/article/18/5/analyzing-ansible-runs-using-ara</a></p>
<p>作者：<a href="https://opensource.com/users/iamajinkya">Ajinkya Bapat</a> 选题：<a href="https://github.com/lujun9972">lujun9972</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
原文链接: [www.zcfy.cc](https://www.zcfy.cc/article/analyzing-ansible-runs-using-ara)
原文标题: 使用 ARA 分析 Ansible 运行
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
