---
title: '如何通过 OpenELEC 创建你自己的媒体中心' 
date: 2019-01-23 2:30:08
hidden: true
slug: f6srmoktrzj
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何通过-openelec-创建你自己的媒体中心"></a>如何通过 OpenELEC 创建你自己的媒体中心</h1>
<p>你是否曾经想要创建你自己的家庭影院系统？如果是的话，这里有一个为你准备的指南！在本篇文章中，我们将会介绍如何设置一个由 OpenELEC 以及 Kodi 驱动的家庭娱乐系统。我们将会介绍如何制作安装介质，哪些设备可以运行该软件，如何安装它，以及其他一切需要知道的事情等等。</p>
<h3><a href="#选择一个设备"></a>选择一个设备</h3>
<p>在开始设定媒体中心的软件前，你需要选择一个设备。OpenELEC 支持一系列设备。从一般的桌面设备到树莓派 2/3 等等。选择好设备以后，考虑一下你怎么访问 OpenELEC 系统中的媒体并让其就绪。</p>
<p><strong>注意: </strong>OpenELEC 基于 Kodi，有许多方式加载一个可播放的媒体（比如 Samba 网络分享，外设，等等）。</p>
<h3><a href="#制作安装磁盘"></a>制作安装磁盘</h3>
<p>OpenELEC 安装磁盘需要一个 USB 存储器，且其至少有 1GB 的容量。这是安装该软件的唯一方式，因为开发者没有发布 ISO 文件。取而代之的是需要创建一个 IMG 原始文件。选择与你设备相关的链接并且<a href="http://openelec.tv/get-openelec/category/1-openelec-stable-releases">下载</a>原始磁盘镜像。当磁盘镜像下载完毕，打开一个终端，并且使用命令将数据从压缩包中解压出来。</p>
<p><strong>在Linux/macOS上</strong></p>
<pre><code class="hljs jboss-cli"><span class="hljs-keyword">cd</span> ~<span class="hljs-string">/Downloads</span>
gunzip -d OpenELEC*<span class="hljs-string">.img.gz</span>

</code></pre><p><strong>在Windows上</strong></p>
<p>下载 <a href="http://www.7-zip.org/">7zip</a>，安装它，然后解压压缩文件。</p>
<p>当原始的 .IMG 文件被解压后，下载 <a href="https://etcher.io/">Etcher USB creation tool</a>，并且依据在界面上的指示来安装它并创建 USB 磁盘。</p>
<p><strong>注意:</strong> 对于树莓派用户，Etcher 也支持将文件写入到 SD 卡中。</p>
<h3><a href="#安装-openelec"></a>安装 OpenELEC</h3>
<p>OpenELEC 安装进程可能是安装流程最简单的操作系统之一了。将 USB 设备加入，然后配置设备使其以 USB 方式启动。同样，这个过程也可以通过按 DEL 或者 F2 来替代。然而并不是所有的 BIOS 都是一样的，所以最好的方式就是看看手册什么的。</p>
<p><a href="https://camo.githubusercontent.com/029a798a11059edb30cf8a928fe8a97c63703737/68747470733a2f2f6d616b65746563686561736965722d326430662e6b7863646e2e636f6d2f6173736574732f75706c6f6164732f323031372f30332f6f70656e656c65632d696e7374616c6c65722d73656c656374696f6e2e706e67"><img src="https://p0.ssl.qhimg.com/t012f700221a562f461.png" alt="openelec-installer-selection" title="openelec-installer-selection"></a></p>
<p>一旦进入 BIOS，修改设置使其从 USB 磁盘中直接加载。这将会允许电脑从 USB 磁盘中启动，这将会使你进入到 Syslinux 引导屏幕。在提示符中，键入 <code>installer</code>，然后按下回车键。</p>
<p><a href="https://camo.githubusercontent.com/df65db6c1cd28af48d565e6e9ad4ecaceb2e151a/68747470733a2f2f6d616b65746563686561736965722d326430662e6b7863646e2e636f6d2f6173736574732f75706c6f6164732f323031372f30332f6f70656e656c65632d696e7374616c6c6174696f6e2d73656c656374696f6e2d6d656e752e706e67"><img src="https://p0.ssl.qhimg.com/t0137c44722ae35f778.png" alt="openelec-installation-selection-menu" title="openelec-installation-selection-menu"></a></p>
<p>默认情况下，快速安装选项已经是选中的。按回车键来开始安装。这将会使安装器跳转到磁盘选择界面。选择 OpenELEC 要被安装到的地方，然后按下回车键来开始安装过程。</p>
<p><a href="https://camo.githubusercontent.com/f0b1e5232b9de310f89117be18049ea1edcbf5bd/68747470733a2f2f6d616b65746563686561736965722d326430662e6b7863646e2e636f6d2f6173736574732f75706c6f6164732f323031372f30332f6f70656e656c65632d696e7374616c6c6174696f6e2d696e2d70726f67726573732e706e67"><img src="https://p0.ssl.qhimg.com/t0188611871224576a3.png" alt="openelec-installation-in-progress" title="openelec-installation-in-progress"></a></p>
<p>一旦完成安装，重启系统并加载 OpenELEC。</p>
<h3><a href="#配置-openelec"></a>配置 OpenELEC</h3>
<p><a href="https://camo.githubusercontent.com/184d1fa25d5d00a122fccb479b2b1ac332bd63d5/68747470733a2f2f6d616b65746563686561736965722d326430662e6b7863646e2e636f6d2f6173736574732f75706c6f6164732f323031372f30332f6f70656e656c65632d776972656c6573732d6e6574776f726b2d73657475702e6a7067"><img src="https://p0.ssl.qhimg.com/t01fe1f428b91d5342f.jpg" alt="openelec-wireless-network-setup" title="openelec-wireless-network-setup"></a></p>
<p>在第一次启动时，用户必须配置一些东西。如果你的媒体中心拥有一个无线网卡，OpenELEC 将会提示用户将其连接到一个热点上。选择一个列表中的网络并且输入密码。</p>
<p><a href="https://camo.githubusercontent.com/d1f7568eb0fb9a081cb1442c9ff95e7b24eb6b29/68747470733a2f2f6d616b65746563686561736965722d326430662e6b7863646e2e636f6d2f6173736574732f75706c6f6164732f323031372f30332f6f70656e656c65632d73686172696e672d73657475702e6a7067"><img src="https://p0.ssl.qhimg.com/t01b86298119205a7bd.jpg" alt="openelec-sharing-setup" title="openelec-sharing-setup"></a></p>
<p>在下一步“欢迎来到 OpenELECWelcome to OpenELEC”屏上，用户必须配置不同的分享设置（SSH 以及 Samba）。建议你把这些设置开启，因为可以用命令行访问，这将会使得远程传输媒体文件变得很简单。</p>
<h3><a href="#增加媒体"></a>增加媒体</h3>
<p>在 OpenELEC（Kodi）中增加媒体，首先选择你希望添加的媒体到的部分。以同样的流程，为照片、音乐等添加媒体。在这个指南中，我们将着重讲解添加视频。</p>
<p><a href="https://camo.githubusercontent.com/a9dfb87bda7723d322a3af8e539cda1a1f182fc2/68747470733a2f2f6d616b65746563686561736965722d326430662e6b7863646e2e636f6d2f6173736574732f75706c6f6164732f323031372f30332f6f70656e656c65632d6164642d66696c65732d746f2d6b6f64692e6a7067"><img src="https://p0.ssl.qhimg.com/t015c23247e3833698e.jpg" alt="openelec-add-files-to-kodi" title="openelec-add-files-to-kodi"></a></p>
<p>点击在主页的“视频Video”选项来进入视频页面。选择“文件Files”选项，在下一个页面点击“添加视频...Add videos…”，这将会使得用户进入Kodi 的添加媒体页面。在这个页面，你可以随意的添加媒体源了（包括内部和外部的）。</p>
<p><a href="https://camo.githubusercontent.com/8ec333275be39076b4aa37aedd9186312184dff8/68747470733a2f2f6d616b65746563686561736965722d326430662e6b7863646e2e636f6d2f6173736574732f75706c6f6164732f323031372f30332f6f70656e656c65632d6164642d6d656469612d736f757263652d6b6f64692e6a7067"><img src="https://p0.ssl.qhimg.com/t0101a052bfdb72aa64.jpg" alt="openelec-add-media-source-kodi" title="openelec-add-media-source-kodi"></a></p>
<p>OpenELEC 会自动挂载外部的设备（像是 USB，DVD 碟片，等等），并且它可以通过浏览文件挂载点来挂载。一般情况下，这些设备都会被放在“/run”下，或者，返回你点击“添加视频...Add videos…”的页面，在那里选择设备。任何外部设备，包括 DVD/CD，将会直接展示在那里，并可以直接访问。这是一个很好的选择——对于那些不懂如何找到挂载点的用户。</p>
<p><a href="https://camo.githubusercontent.com/bd6ea5b3c02429fcf7b4c63555a509d06e194708/68747470733a2f2f6d616b65746563686561736965722d326430662e6b7863646e2e636f6d2f6173736574732f75706c6f6164732f323031372f30332f6f70656e656c65632d6e616d652d766964656f2d736f757263652d666f6c6465722e6a7067"><img src="https://p0.ssl.qhimg.com/t0171120d570d27656c.jpg" alt="openelec-name-video-source-folder" title="openelec-name-video-source-folder"></a></p>
<p>现在这个设备在 Kodi 中被选中了，界面将会询问用户去浏览设备上私人文件夹，里面有私人文件——这一切都是在媒体中心文件浏览器工具下执行的。一旦找到了放置文件的文件夹，添加它，给予文件夹一个名字，然后按下 OK 按钮来保存它。</p>
<p><a href="https://camo.githubusercontent.com/673a7ab5ca99037050dc40debb769d94f58af43e/68747470733a2f2f6d616b65746563686561736965722d326430662e6b7863646e2e636f6d2f6173736574732f75706c6f6164732f323031372f30332f6f70656e656c65632d73686f772d61646465642d6d656469612d6b6f64692e6a7067"><img src="https://p0.ssl.qhimg.com/t017080ac47dcab93be.jpg" alt="openelec-show-added-media-kodi" title="openelec-show-added-media-kodi"></a></p>
<p>当一个用户浏览“视频Videos”，他们将会看到可以点击的文件夹，这个文件夹中带有从外部设备添加的媒体。这些文件夹可以很容易地在系统上播放。</p>
<h3><a href="#使用-openelec"></a>使用 OpenELec</h3>
<p>当用户登录他们将会看见一个“主界面”，这个主界面有许多部分，用户可以点击它们并且进入，包括：图片，视频，音乐，程序等等。当悬停在这些部分的时候，子部分就会出现。例如，当悬停在“图片”上时，子部分”文件“以及”插件”就会出现。</p>
<p><a href="https://camo.githubusercontent.com/3dc54232330de3f6fb8e31508fd8db27a36b8058/68747470733a2f2f6d616b65746563686561736965722d326430662e6b7863646e2e636f6d2f6173736574732f75706c6f6164732f323031372f30332f6f70656e656c65632d6e617669676174696f6e2d6261722e6a7067"><img src="https://p0.ssl.qhimg.com/t01c929ac3c77e5c946.jpg" alt="openelec-navigation-bar" title="openelec-navigation-bar"></a></p>
<p>如果一个用户点击了一个部分中的子部分，例如“插件”，Kodi 插件选择就会出现。这个安装器将会允许用户浏览新的插件内容，来安装到这个子部分（像是图片关联插件，等等）或者启动一个已经存在的图片关联插件，当然，这个插件应该已经安装到系统上了。</p>
<p>此外，点击任何部分的文件子部分（例如视频）将会直接给显示用户该部分可用的文件。</p>
<h3><a href="#系统设置"></a>系统设置</h3>
<p><a href="https://camo.githubusercontent.com/00dee4d907251961cdbec5349199adcc24892b54/68747470733a2f2f6d616b65746563686561736965722d326430662e6b7863646e2e636f6d2f6173736574732f75706c6f6164732f323031372f30332f6f70656e656c65632d73797374656d2d73657474696e67732e6a7067"><img src="https://p0.ssl.qhimg.com/t01f1ec97a1a96c1ff0.jpg" alt="openelec-system-settings" title="openelec-system-settings"></a></p>
<p>Kodi 有丰富的设置区域。为了找到这些设置，使鼠标在右方悬停，目录选择器将会滚动右方并且显示”系统System“。点击来打开全局系统设定区。</p>
<p>用户可以修改任何设置，从安装 Kodi 仓库的插件，到激活各种服务，到改变主题，甚至天气。如果想要退出设定区域并且返回主页面，点击右下方角落中的“home”图标。</p>
<h3><a href="#结论"></a>结论</h3>
<p>通过 OpenELEC 的安装和配置，你现在可以随意体验使用你自己的 Linux 支持的家庭影院系统。在所有的家庭影院系统 Linux 发行版中，这个是最用户友好的。请记住，尽管这个系统是以“OpenELEC”为名，但它运行着的是 Kodi ，并兼容任何 Kodi 的插件，工具以及程序。</p>
<hr>
<p>via: <a href="https://www.maketecheasier.com/build-media-center-with-openelec/">https://www.maketecheasier.com/build-media-center-with-openelec/</a></p>
<p>作者：<a href="https://www.maketecheasier.com/author/derrikdiener/">Derrik Diener</a> 译者：<a href="https://github.com/svtter">svtter</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何通过 OpenELEC 创建你自己的媒体中心

## 原文链接
[https://www.zcfy.cc/article/how-to-build-your-own-media-center-with-openelec](https://www.zcfy.cc/article/how-to-build-your-own-media-center-with-openelec)

