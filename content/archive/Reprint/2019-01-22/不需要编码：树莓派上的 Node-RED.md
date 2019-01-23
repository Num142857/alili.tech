---
title: '不需要编码：树莓派上的 Node-RED' 
date: 2019-01-22 2:30:08
hidden: true
slug: 482jx5m2ihd
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#不需要编码树莓派上的-node-red"></a>不需要编码：树莓派上的 Node-RED</h1>
<blockquote>
<p>查看本教程，看看使用 Node-RED 的拖放界面设置硬件流程是多么容易。</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/9ec55345796f956e12fa0808ccc69804a32bb3b9/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f696d6167652d66756c6c2d73697a652f7075626c69632f696d616765732f6c6966652f68617264776172655f68616d6d65725f7369676e2e6a70673f69746f6b3d766837364c426962"><img src="" alt="No coding required: Node-RED on a Raspberry Pi" title="No coding required: Node-RED on a Raspberry Pi"></a></p>
<p>Node-RED 是一个编程工具，可让你使用基于浏览器的编辑器快速连接硬件设备。它具有大量的节点，可以以拖放的方式构建流程，这大大减少了开发时间。<a href="https://nodered.org/">Node-RED</a> 与树莓派的 Raspian Jessie 一起安装，你还可以独立下载 Node-RED。</p>
<p>为了向你展示它如何工作，我们将使用 Node-RED 构建一个简单的工具，与连接到树莓派的蜂窝调制解调器通信。使用蜂窝调制解调器，你可以通过蜂窝网络从你的树莓派发送/接收数据。你可以使用蜂窝网络提供商通常提供的 3G/4G USB 加密狗，也可以将开发板与 3G 或 4G 无线调制解调器连接。</p>
<p>无论你是连接 USB 加密狗还是开发板，树莓派的连接接口都是通过 USB 端口的。在本教程中，我将一块 <a href="http://m2msupport.net/m2msupport/simcom-sim900-gprs-2g-module/">SIM900</a> 开发板通过一根 USB 转串行电缆连接到树莓派。</p>
<p><a href="https://camo.githubusercontent.com/9616db5ea9ddc61e4dad5819997dbb7a01f26425/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f753132383635312f6e6f64655f726564312e706e67"><img src="https://p0.ssl.qhimg.com/t013a020fb8a32f811e.png" alt="Connecting SIM900 to Raspberry Pi through a USB-to-serial converter cable" title="Connecting SIM900 to Raspberry Pi through a USB-to-serial converter cable"></a></p>
<p>第一步是检查 SIM900 开发板是否连接到树莓派上。</p>
<p><a href="https://camo.githubusercontent.com/45c0a2947bc5e1f19158a350740fa2a6b6b16afb/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f753132383635312f6e6f64655f72656432612e706e67"><img src="https://p0.ssl.qhimg.com/t01fbd75c33b4b650dc.png" alt="Checking that the SIM900 development board is connected" title="Checking that the SIM900 development board is connected"></a></p>
<p>USB 转串行适配器在这里被显示为连接到树莓派的 USB 设备之一。</p>
<p>接下来，检查 SIM900 连接的 USB 端口号。</p>
<p><a href="https://camo.githubusercontent.com/b7d8e072aa1d605f69cc59584ce9049976b2cc00/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f753132383635312f6e6f64655f72656433612e706e67"><img src="https://p0.ssl.qhimg.com/t014873ce7c02bc35b8.png" alt="Checking the SIM900 board's USB port number" title="Checking the SIM900 board's USB port number"></a></p>
<p>在最后一行，你可以看到 SIM900 板（通过 USB 转串行转换器连接）连接到了树莓派上的 <strong>ttyUSB0</strong>。现在我们准备开始使用 Node-RED。</p>
<p>在树莓派上启动 Node-RED。</p>
<p><a href="https://camo.githubusercontent.com/4c492046083146478780a39d728a5002d52d2bb5/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f753132383635312f6e6f64655f72656434612e706e67"><img src="https://p0.ssl.qhimg.com/t0170e05785edc69566.png" alt="​​​​Launching Node-RED in Raspberry Pi" title="​​​​Launching Node-RED in Raspberry Pi"></a></p>
<p>下载<a href="http://m2msupport.net/m2msupport/wp-content/themes/admired/Node-RED/modem_commands">示例流图</a>并将其导入到 Node-RED 中。请注意，流文件是该图形 UI 的 JSON 表示形式。</p>
<p>在 Node-RED 中，导入的流图应该看上去像这样：</p>
<p><a href="https://camo.githubusercontent.com/937eab932f5902b334555a1f99c9bc76b73eed1a/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f753132383635312f6e6f64655f726564352e706e67"><img src="https://p0.ssl.qhimg.com/t01e8d4b81d7badc23b.png" alt="The imported flow in Node-RED" title="The imported flow in Node-RED"></a></p>
<p>注入节点设置 <a href="http://m2msupport.net/m2msupport/software-and-at-commands-for-m2m-modules/">AT 命令</a>需要查询调制解调器。<strong>添加换行</strong> 功能节点会在注入节点传递过来的 AT 命令后面附加 <strong>\r\n</strong>。<strong>添加换行</strong> 的输出然后被连接到<strong>串行输出</strong>节点，它将数据写入串行端口。来自调制解调器的 AT 命令的响应通过 <strong>串行输入</strong> 节点读取，该节点将响应输出到 <strong>调试</strong> 窗口。确认串行端口号和端口速度在 <strong>串行输入</strong> 和 <strong>串行输出</strong> 节点中的配置。</p>
<p>Node-RED 是一种易于使用的编程工具，可用于快速集成和测试硬件设备。从本教程可以看出，使用 Node-RED 连接和测试使用树莓派的蜂窝模式不需要编码。</p>
<p>有关 Node-RED 和其他可以使用的方式的更多信息，请访问<a href="https://nodered.org/">项目网站</a>。</p>
<p>（题图： Thomas Hawk 的 <a href="https://www.flickr.com/photos/thomashawk/3048157616/in/photolist-5DmB4E-BzrZ4-5aUXCN-nvBWYa-qbkwAq-fEFeDm-fuZxgC-dufA8D-oi8Npd-b6FiBp-7ChGA3-aSn7xK-7NXMyh-a9bQQr-5NG9W7-agCY7E-4QD9zm-7HLTtj-4uCiHy-bYUUtG">Flickr</a>. <a href="https://creativecommons.org/licenses/by-nc/2.0/">CC BY-NC 2.0</a>. Opensource.com 修改）</p>
<hr>
<p>作者简介：</p>
<p>Surya G - 我的兴趣是为物联网项目尤其是使用蜂窝调制解调器的项目做软件开发。</p>
<hr>
<p>via: <a href="https://opensource.com/article/17/7/nodered-raspberrypi-hardware">https://opensource.com/article/17/7/nodered-raspberrypi-hardware</a></p>
<p>作者：<a href="https://opensource.com/users/gssm2m">Surya G</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
不需要编码：树莓派上的 Node-RED

## 原文链接
[https://www.zcfy.cc/article/no-coding-required-node-red-on-a-raspberry-pi](https://www.zcfy.cc/article/no-coding-required-node-red-on-a-raspberry-pi)

