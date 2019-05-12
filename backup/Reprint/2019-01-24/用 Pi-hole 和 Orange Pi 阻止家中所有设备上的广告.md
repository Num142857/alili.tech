---
title: '用 Pi-hole 和 Orange Pi 阻止家中所有设备上的广告' 
date: 2019-01-24 2:30:11
hidden: true
slug: j2ufbucq87e
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#用-pi-hole-和-orange-pi-阻止家中所有设备上的广告"></a>用 Pi-hole 和 Orange Pi 阻止家中所有设备上的广告</h1>
<p>你是否很恼火地发现你的浏览器、智能手机和平板上不装广告拦截器不行？ 至少我是这样的。我家里有一些“智能”设备，但是它们似乎没有任何类型的广告拦截软件。 好了，我了解到 <a href="https://pi-hole.net/">Pi-hole</a> 是一个可以运行在树莓派板子上的广告拦截软件，它能在各种广告到达你的设备之前拦截它们。它允许你将任何域加入到黑名单或白名单，并且它有一个很好的仪表盘面板，可以让你深入了解你的家庭网络最常访问的域/网站、最活跃的设备和最常见的广告商。</p>
<p>Pi-hole 原本是运行在树莓派上的，但我想知道它能否在我运行 Armbian Linux 的廉价 Orange Pi 上运行。 好吧，它绝对可以！下面是我让 Pi-hole 能快速运行的方法。</p>
<h3><a href="#安装-pi-hole"></a>安装 Pi-hole</h3>
<p>安装 Pi-hole 是使用终端完成的，所以打开你的 Orange Pi 桌面上的终端或使用 ssh 连接。</p>
<p>因为需要下载软件，所以进入到一个你选定的目录，确保你有写入权限。像这样：</p>
<pre><code class="hljs mipsasm">cd &lt;your <span class="hljs-keyword">preferred </span><span class="hljs-keyword">directory&gt;/
</span>
</code></pre><p>我没有选择 Pi-hole 主页上的“单条命令”安装方式。 我的意思是，他们在那条命令下面写着“用管道到 bash 可能是危险的”，本地安装“更安全”。所以，这里是我的本地安装步骤：</p>
<pre><code class="hljs excel">git clone --depth <span class="hljs-number">1</span> htt<span class="hljs-symbol">ps:</span>//github.com/<span class="hljs-built_in">pi</span>-hole/<span class="hljs-built_in">pi</span>-hole.git <span class="hljs-built_in">Pi</span>-hole
cd <span class="hljs-built_in">Pi</span>-hole/automated\ install/
./basic-install.sh

</code></pre><p>如果你没有以 root 用户身份登录，那么这个安装脚本将提示你输入密码，然后再继续。 如果需要，脚本将下载并安装一些必备的 Linux 软件包。接着它会显示一个红蓝界面，提示你回答有关如何配置 Pi-hole 的几个问题。以我的经验，直接接受默认值就可以了，我后来发现 Pi-hole 的 web 应用可以让你更改设置，比如 DNS 提供商。</p>
<p>该脚本将告诉你在图形界面和终端中 Pi-hole 的密码。 请记住该密码！</p>
<p>脚本还会告诉你 Pi-hole 的网址，应该像这样：</p>
<pre><code class="hljs dts"><span class="hljs-symbol">http:</span><span class="hljs-comment">//&lt;your pi’s IP address&gt;/admin</span>

</code></pre><p>或者类似这样：</p>
<pre><code class="hljs dts"><span class="hljs-symbol">http:</span><span class="hljs-comment">//orangepipc/admin</span>

</code></pre><p>输入 Pi-hole 密码，接着你会看到像下面这样的漂亮的仪表盘面板：</p>
<p><a href="https://camo.githubusercontent.com/5e0f5a8dbd769687ab2fa746ec9548dbf4901799/68747470733a2f2f69312e77702e636f6d2f7069626f617264732e636f6d2f77702d636f6e74656e742f75706c6f6164732f323031372f30312f70682d686f6c652e706e673f726573697a653d363430253243353332"><img src="https://p2.ssl.qhimg.com/t0185ca8778a62fd00b.png" alt="Ph-hole"></a></p>
<p>请记住更改家庭网络路由器上的 DNS 设置并使用你的 Orange Pi 的地址。 否则，广告不会被过滤！</p>
<p>上面的说明与 Pi-hole 网站提供的替代“安全”方法大致相同，尽管 Armbian 没有被列为官方支持的操作系统。我相信这些说明应该在树莓派或其他运行某种形式的基于 Debian 的 Linux 操作系统的 Pi 上工作。但是，我并没有测试这一点，所以期待听到你的经验（请给我留下简短的评论）。</p>
<h3><a href="#思考和观察"></a>思考和观察</h3>
<p>运行 Pi-hole 一段时间，并研究了在 Pi-hole 面板上出现的信息后，我发现有很多我不知道的网络活动在进行，而它们并不都是我批准的活动。例如，有一些我不知道的关于游戏程序的“有趣”连接从我的孩子的设备上发出，还有社交网络程序显然一直在给我发送骚扰数据。总之，无论是否是无害流量，我很高兴减少了流量负载，即使仅减少了一点点……我的意思是，为什么我应该允许我不想要的或者不关心的应用程序和广告吃掉我的网络流量？好吧，现在他们被封锁了。</p>
<p>像这样为 Orange Pi 设置广告屏蔽很便宜、容易，限制一些不必要的流量在我的家庭网络中进出（特别是与孩子们相关的）使我感到放松多了。如果有兴趣，你可以看看我的上一篇文章，如何<a href="http://piboards.com/2017/01/04/easy-set-up-orange-pi/">轻松设置一个 Orange Pi</a>，并使用下面的链接来查看 Orange Pi 是多么便宜。我相信这是一个值得的投资。</p>
<ul>
<li>Amazon 上的 Orange Pi （受益链接）：  <a href="https://www.amazon.com/gp/product/B018W6OTIM/ref=as_li_tl?ie=UTF8&amp;camp=1789&amp;creative=9325&amp;creativeASIN=B018W6OTIM&amp;linkCode=as2&amp;tag=piboards-20&amp;linkId=ac292a536d58eabf1ee73e2c575e1111">Orange Pi PC Single Board Computer Quad Core ARM Cortex-A7 1GB DDR3 4K Decode</a></li>
<li><a href="http://s.click.aliexpress.com/e/bAMVj2R">AliExpress 上的 Orange Pi 商店</a> （受益链接）</li>
</ul>
<p>更新：具有讽刺意味的是，如果你成功地按照这篇文章设置了 Pi-hole，这个站点上（s.click.aliexpress.com）的受益链接会被屏蔽，是否将它加入到白名单取决于你。</p>
<hr>
<p>via: <a href="http://piboards.com/2017/01/07/block-ads-on-all-your-devices-at-home-with-pi-hole-and-an-orange-pi/">http://piboards.com/2017/01/07/block-ads-on-all-your-devices-at-home-with-pi-hole-and-an-orange-pi/</a></p>
<p>作者：<a href="http://piboards.com/author/piguy/">MIKE WILMOTH</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/jasminepeng">jasminepeng</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用 Pi-hole 和 Orange Pi 阻止家中所有设备上的广告

## 原文链接
[https://www.zcfy.cc/article/block-ads-on-all-your-devices-at-home-with-pi-hole-and-an-orange-pi](https://www.zcfy.cc/article/block-ads-on-all-your-devices-at-home-with-pi-hole-and-an-orange-pi)

