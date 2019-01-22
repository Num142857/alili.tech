---
title: '如何在 AWS EC2 的 Linux 服务器上开放一个端口' 
date: 2019-01-23 2:30:08
hidden: true
slug: zsnsz9ieej
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何在-aws-ec2-的-linux-服务器上开放一个端口"></a>如何在 AWS EC2 的 Linux 服务器上开放一个端口</h1>
<p><em>这是一篇用屏幕截图解释如何在 AWS EC2 Linux 服务器上打开端口的教程。它能帮助你管理 EC2 服务器上特定端口的服务。</em></p>
<hr>
<p>AWS（即 Amazon Web Services）不是 IT 世界中的新术语了。它是亚马逊提供的云服务平台。它的免费帐户能为你提供一年的有限免费服务。这是尝试新技术而不用花费金钱的最好的方式之一。</p>
<p>AWS 提供服务器计算作为他们的服务之一，他们称之为 EC（弹性计算）。使用它可以构建我们的 Linux 服务器。我们已经看到了<a href="http://kerneltalks.com/howto/install-ec2-linux-server-aws-with-screenshots/">如何在 AWS 上设置免费的 Linux 服务器</a>了。</p>
<p>默认情况下，所有基于 EC2 的 Linux 服务器都只打开 22 端口，即 SSH 服务端口（允许所有 IP 的入站连接）。因此，如果你托管了任何特定端口的服务，则要为你的服务器在 AWS 防火墙上打开相应端口。</p>
<p>同样它的 1 到 65535 的端口是打开的（对于所有出站流量）。如果你想改变这个，你可以使用下面的方法编辑出站规则。</p>
<p>在 AWS 上为你的服务器设置防火墙规则很容易。你能够在几秒钟内为你的服务器打开端口。我将用截图指导你如何打开 EC2 服务器的端口。</p>
<h3><a href="#步骤-1-"></a>步骤 1 ：</h3>
<p>登录 AWS 帐户并进入 <strong>EC2 管理控制台</strong>。进入“网络及安全”Network &amp; Security 菜单下的<strong>安全组</strong>Security Groups，如下高亮显示：</p>
<p><a href="https://camo.githubusercontent.com/28d280e8949c040dbfd44f66a7aafe5d252d2555/687474703a2f2f63646e322e6b65726e656c74616c6b732e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30332f4157532d4543322d6d616e6167656d656e742d636f6e736f6c652e6a7067"><img src="https://camo.githubusercontent.com/28d280e8949c040dbfd44f66a7aafe5d252d2555/687474703a2f2f63646e322e6b65726e656c74616c6b732e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30332f4157532d4543322d6d616e6167656d656e742d636f6e736f6c652e6a7067" alt="AWS EC2 management console"></a></p>
<p><em>AWS EC2 管理控制台</em></p>
<h3><a href="#步骤-2-"></a>步骤 2 :</h3>
<p>在安全组Security Groups中选择你的 EC2 服务器，并在 <strong>行动</strong>Actions 菜单下选择 <strong>编辑入站规则</strong>Edit inbound rules。</p>
<p><a href="https://camo.githubusercontent.com/fd2d0290d191635e37c01d5dc45edb5f6ec7a7c5/687474703a2f2f63646e322e6b65726e656c74616c6b732e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30332f4157532d696e626f756e642d72756c65732e6a7067"><img src="https://camo.githubusercontent.com/fd2d0290d191635e37c01d5dc45edb5f6ec7a7c5/687474703a2f2f63646e322e6b65726e656c74616c6b732e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30332f4157532d696e626f756e642d72756c65732e6a7067" alt="AWS inbound rules"></a></p>
<p><em>AWS 入站规则菜单</em></p>
<h3><a href="#步骤-3"></a>步骤 3:</h3>
<p>现在你会看到入站规则窗口。你可以在此处添加/编辑/删除入站规则。这有几个如 http、nfs 等列在下拉菜单中，它们可以为你自动填充端口。如果你有自定义服务和端口，你也可以定义它。</p>
<p><a href="https://camo.githubusercontent.com/2ead5469292651e6711ed44b761f4e171e4d7c3c/687474703a2f2f63646e322e6b65726e656c74616c6b732e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30332f4157532d6164642d696e626f756e642d72756c652e6a7067"><img src="https://camo.githubusercontent.com/2ead5469292651e6711ed44b761f4e171e4d7c3c/687474703a2f2f63646e322e6b65726e656c74616c6b732e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30332f4157532d6164642d696e626f756e642d72756c652e6a7067" alt="AWS add inbound rule"></a></p>
<p><em>AWS 添加入站规则</em></p>
<p>比如，如果你想要打开 80 端口，你需要选择：</p>
<ul>
<li>类型：http</li>
<li>协议：TCP</li>
<li>端口范围：80</li>
<li>源：任何来源：打开 80 端口接受来自“任何IP（0.0.0.0/0）”的请求；我的 IP：那么它会自动填充你当前的公共互联网 IP</li>
</ul>
<h3><a href="#步骤-4"></a>步骤 4:</h3>
<p>就是这样了。保存完毕后，你的服务器入站 80 端口将会打开！你可以通过 telnet 到 EC2 服务器公共域名的 80 端口来检验（可以在 EC2 服务器详细信息中找到）。</p>
<p>你也可以在 <a href="http://ping.eu/port-chk/">ping.eu</a> 等网站上检验。</p>
<hr>
<p>同样的方式可以编辑出站规则，这些更改都是即时生效的。</p>
<hr>
<p>via: <a href="http://kerneltalks.com/virtualization/how-to-open-port-on-aws-ec2-linux-server/">http://kerneltalks.com/virtualization/how-to-open-port-on-aws-ec2-linux-server/</a></p>
<p>作者：<a href="http://kerneltalks.com/virtualization/how-to-open-port-on-aws-ec2-linux-server/">Shrikant Lavhate</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/jasminepeng">jasminepeng</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在 AWS EC2 的 Linux 服务器上开放一个端口

## 原文链接
[https://www.zcfy.cc/article/how-to-open-port-on-aws-ec2-linux-server](https://www.zcfy.cc/article/how-to-open-port-on-aws-ec2-linux-server)

