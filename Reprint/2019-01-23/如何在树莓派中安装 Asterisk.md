---
title: '如何在树莓派中安装 Asterisk' 
date: 2019-01-23 2:30:08
hidden: true
slug: avfw74qabkm
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何在树莓派中安装-asterisk"></a>如何在树莓派中安装 Asterisk</h1>
<blockquote>
<p>你是否在为小型企业或家庭办公室寻找电话系统？</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/33f661692dda57b74907fb2100293cdeea9efc7f/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f696d6167652d66756c6c2d73697a652f7075626c69632f696d616765732f6c6966652f6c6966652d72617370626572727970695f302e706e673f69746f6b3d7778567851305a34"><img src="" alt="How to install Asterisk on the Raspberry Pi" title="How to install Asterisk on the Raspberry Pi"></a></p>
<blockquote>
<p>图片版权： Dwight Sipler 的 <a href="http://www.flickr.com/photos/photofarmer/272567650/">Flickr</a></p>
</blockquote>
<p>你是否在为小型企业或家庭办公室寻找电话系统？我一直对可扩展 VoIP（Voice over IP）解决方案感兴趣，后来我在树莓派上找到 <a href="http://www.asterisk.org/">Asterisk</a> 的一个实现。</p>
<p>我的好奇心被激起了，我决心尝试一下，所以我从 <a href="http://www.raspberry-asterisk.org/downloads/">Asterisk</a> 官网<a href="http://download.raspberry-asterisk.org/raspbx-28-01-2017.zip">下载</a>了它（RasPBX），然后使用我的树莓派 3 构建服务器。</p>
<h3><a href="#准备开始"></a>准备开始</h3>
<p>首先，我将下载的镜像刻录到 MicroSD 卡上。建议的最小值是 4 GB。将镜像传输到 MicroSD 卡并插到树莓派上的相应插槽中后，我将网线连接到树莓派和家庭路由器上的以太网端口中。</p>
<p>更多关于树莓派的内容：</p>
<ul>
<li><a href="https://opensource.com/resources/what-raspberry-pi?src=raspberry_pi_resource_menu">什么是树莓派？</a></li>
<li><a href="https://opensource.com/article/16/12/getting-started-raspberry-pi?src=raspberry_pi_resource_menu">开始使用树莓派</a></li>
<li><a href="https://opensource.com/article/17/2/raspberry-pi-submit-your-article?src=raspberry_pi_resource_menu">给我们发送你的树莓派项目和教程</a></li>
</ul>
<p>接下来，我在 Linux 上打开一个终端，并输入 <code>ssh root@192.168.1.8</code>，这是我的服务器的 IP 地址。我被提示以 <code>root</code> 用户身份登录到 RasPBX 上。默认密码是 <code>raspberry</code>。 （出于安全考虑，如果你打算再多试试，请务必更改默认密码。）</p>
<p>当我登录到了 RasPBX 上的 shell 后，接下来我需要准备配置了。根据网站上提供的<a href="http://www.raspberry-asterisk.org/documentation/">文档</a>，我在 shell 下输入 <code>regen-hostkeys</code> 来创建新的主机密钥。然后输入 <code>configure-timezone</code> 来配置服务器的时区。我通过在提示符下输入 <code>dpkg-reconfigure locales</code> 来配置区域设置。我也安装了 <a href="http://www.raspberry-asterisk.org/documentation/#fail2ban">Fail2Ban</a> 来保障服务器的安全性。</p>
<p>现在我准备测试我的配置。</p>
<h3><a href="#测试"></a>测试</h3>
<p>我从 RasPBX 的 shell 中登出，然后打开浏览器并输入我的服务器的 IP 地址。将服务器 IP 地址加载到浏览器中，我看到了一个可爱的登录页面。</p>
<p><a href="https://www.freepbx.org/">FreePBX</a> 提供了一个非常好的基于 Web 的开源图形用户界面，我用它来控制和配置 Asterisk（可在 <a href="https://github.com/asterisk/asterisk/blob/master/LICENSE">GitHub</a> 上找到）。（FreePBX 是 GPL 许可的）。我用它来完成其余的配置。FreePBX 的默认登录账号为用户名：<code>admin</code>； 密码：<code>admin</code>。</p>
<p><a href="https://camo.githubusercontent.com/78be268152474ac1433213e0427a041aa7983636/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f667265657062785f6c6f67696e5f73637265656e2e706e67"><img src="https://p0.ssl.qhimg.com/t01a60ab7768da79ede.png" alt="FreePBX_Login_Screen" title="FreePBX_Login_Screen"></a></p>
<p>登录之后，我进入位于显示屏左上方的应用菜单Application Menu。点击菜单链接并选择了第二个选项，即 “应用”Applications，接着选择了第四个选项，“分机”Extensions。从那里我选择创建一个  New Chan_Sip 分机。</p>
<p><a href="https://camo.githubusercontent.com/065cecd8ad6448ac051fc752d3adbf76f25aa08d/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f6164645f615f6e65775f6368616e5f7369705f657874656e73696f6e2e706e67"><img src="https://p0.ssl.qhimg.com/t0172896e79b39dacc4.png" alt=""></a></p>
<p>我使用密码配置了一个 sip 分机用户。密码是自动生成的，也可以选择创建自己的密码。</p>
<p>现在我有了一个完整的分机，我急于尝试我的新的 VoIP 服务器。我下载并安装了 <a href="http://yateclient.yate.ro/index.php/Download/Download">Yate 客户端</a>，这是在构建服务器的过程中发现的。安装 <a href="https://en.wikipedia.org/wiki/Yate_(telephony_engine">Yate</a>) 之后，我想测试与服务器的连接。我发现我可以使用 Yate 连接到服务器并输入 <code>*43</code> 进行回声测试。当我听到客户端指示时，我感到很激动。</p>
<p><a href="https://camo.githubusercontent.com/bbd1c4d1ceaf3167ea440ac3ceaf11f8e858783d/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f6563686f746573742e706e67"><img src="https://p0.ssl.qhimg.com/t01e91662b0e640077f.png" alt=""></a></p>
<p>我决定创建另外一个 sip 分机，这样我就可以测试系统的语音信箱功能。 在完成后，我使用 Yate 客户端来呼叫这个分机，并留下了简短的语音留言。然后再次使用 Yate 呼叫该分机并输入 <code>*97</code> 来检索语音留言。然后我想看看我是否可以使用我的新服务器来呼叫外线。返回到菜单，选择 “连接”Connectivity 选项，并添加了 Google Voice 号码。</p>
<p><a href="https://camo.githubusercontent.com/1bca65d005e1d385bed4bf9642726b2b9e26ad25/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f676f6f676c655f766f6963655f636f6e6e65637469766974792e706e67"><img src="https://p0.ssl.qhimg.com/t0129474e4d6f1f6705.png" alt="Google_Voice_Connectivity" title="Google_Voice_Connectivity"></a></p>
<p>接着我返回到 “连接” 菜单，并将 Google Voice 添加到出站路由中。</p>
<p><a href="https://camo.githubusercontent.com/8b149089d5f8ad6e03948fbaec735b108097bcc2/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f676f6f676c655f766f6963655f6f7574626f756e645f726f7574652e706e67"><img src="https://p0.ssl.qhimg.com/t016c299b16e7cdee8e.png" alt="Google_Voice_outbound_route" title="Google_Voice_outbound_route"></a></p>
<h3><a href="#完成一个呼叫"></a>完成一个呼叫</h3>
<p>回到 Yate 客户端，我呼叫了一个外线并成功完成了这个呼叫。</p>
<p>我相信这个特定的 VoIP 解决方案可以轻松地为一个小型办公室工作。根据 RasPBX 网站的<a href="http://www.raspberry-asterisk.org/faq/">常见问题</a>部分，典型的树莓派系统可以在树莓派 1 上支持多达 10 个并发呼叫。</p>
<p>Asterisk 有很多细微差别的功能，FreePBX 则可以很容易地利用它们。</p>
<p><em>关于树莓派上的 Asterisk 的更多信息，请参考他们的<a href="http://www.raspberry-asterisk.org/blog/">博客</a>。你可以在他们的网站上找到有关 <a href="https://www.freepbx.org/development/source-code/">FreePBX 源代码</a>的其他信息。</em></p>
<hr>
<p>作者简介：</p>
<p>Don Watkins - 教育家、教育技术专家、企业家、开源倡导者。教育心理学硕士、教育领导硕士、Linux 系统管理员、CCNA、使用 Virtual Box 虚拟化。关注我 @Don_Watkins。</p>
<hr>
<p>via: <a href="https://opensource.com/article/17/4/asterisk-raspberry-pi-3">https://opensource.com/article/17/4/asterisk-raspberry-pi-3</a></p>
<p>作者：<a href="https://opensource.com/users/don-watkins">Don Watkins</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/jasminepeng">jasminepeng</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在树莓派中安装 Asterisk

## 原文链接
[https://www.zcfy.cc/article/how-to-install-asterisk-on-the-raspberry-pi](https://www.zcfy.cc/article/how-to-install-asterisk-on-the-raspberry-pi)

