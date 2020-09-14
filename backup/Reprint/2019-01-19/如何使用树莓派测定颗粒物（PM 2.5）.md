---
title: '如何使用树莓派测定颗粒物（PM 2.5）' 
date: 2019-01-19 2:30:10
hidden: true
slug: qhlvuzntylf
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何使用树莓派测定颗粒物pm-25"></a>如何使用树莓派测定颗粒物（PM 2.5）</h1>
<blockquote>
<p>使用两个简单的硬件设备和几行代码构建一个空气质量探测器。</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/ca259ca2028f89670d189bd6423ac6f9feee1662/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f696d6167652d66756c6c2d73697a652f7075626c69632f6c6561642d696d616765732f627562626c6568616e64735f66726f6d5248545f3532305f303631324c4c2e706e673f69746f6b3d5f695132644f3353"><img src="https://p0.ssl.qhimg.com/t018e5f42d3f2f6e6c6.png" alt=""></a></p>
<p>我们在东南亚的学校定期测定空气中的颗粒物。这里的测定值非常高，尤其是在二到五月之间，干燥炎热、土地干旱等各种因素都对空气质量产生了不利的影响。我将会在这篇文章中展示如何使用树莓派来测定颗粒物。</p>
<h3><a href="#什么是颗粒物"></a>什么是颗粒物？</h3>
<p>颗粒物就是粉尘或者空气中的微小颗粒。其中 PM10 和 PM2.5 之间的差别就是 PM10 指的是粒径小于 10 微米的颗粒，而 PM2.5 指的是粒径小于 2.5 微米的颗粒。在粒径小于 2.5 微米的的情况下，由于它们能被吸入肺泡中并且对呼吸系统造成影响，因此颗粒越小，对人的健康危害越大。</p>
<p>世界卫生组织的建议<a href="https://en.wikipedia.org/wiki/Particulates">颗粒物浓度</a>是：</p>
<ul>
<li>年均 PM10 不高于 20 µg/m³</li>
<li>年均 PM2.5 不高于 10 µg/m³</li>
<li>不允许超标时，日均 PM10 不高于 50 µg/m³</li>
<li>不允许超标时，日均 PM2.5 不高于 25 µg/m³</li>
</ul>
<p>以上数值实际上是低于大多数国家的标准的，例如欧盟对于 PM10 所允许的年均值是不高于 40 µg/m³。</p>
<h3><a href="#什么是空气质量指数air-quality-indexaqi"></a>什么是空气质量指数Air Quality Index（AQI）？</h3>
<p>空气质量指数是按照颗粒物的测定值来评价空气质量的好坏，然而由于各国之间的计算方式有所不同，这个指数并没有统一的标准。维基百科上关于<a href="https://en.wikipedia.org/wiki/Air_quality_index">空气质量指数</a>的词条对此给出了一个概述。我们学校则以<a href="https://en.wikipedia.org/wiki/United_States_Environmental_Protection_Agency">美国环境保护协会</a>Environment Protection Agency（EPA）建立的分类法来作为依据。</p>
<p><a href="https://camo.githubusercontent.com/9f898512d9c6f201b69878a69f0f202e6724ff30/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f70616e6f706f6c795f696d6167655f6f726967696e616c2f7075626c69632f696d616765732f6c6966652d75706c6f6164732f6169725f7175616c6974795f696e6465782e706e673f69746f6b3d46776d4766315a53"><img src="https://p0.ssl.qhimg.com/t015134ffb7307cfd45.png" alt="空气质量指数" title="Air quality index"></a></p>
<p><em>空气质量指数</em></p>
<h3><a href="#测定颗粒物需要哪些准备"></a>测定颗粒物需要哪些准备？</h3>
<p>测定颗粒物只需要以下两种器材：</p>
<ul>
<li>树莓派（款式不限，最好带有 WiFi）</li>
<li>SDS011 颗粒物传感器</li>
</ul>
<p><a href="https://camo.githubusercontent.com/76008beb8df9e5ecbbc5db89a764e0997439cbc0/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f70616e6f706f6c795f696d6167655f6f726967696e616c2f7075626c69632f696d616765732f6c6966652d75706c6f6164732f706172746963756c6174655f73656e736f722e6a70673f69746f6b3d646448336242774f"><img src="https://p0.ssl.qhimg.com/t01da2663a8db1ffbce.jpg" alt="颗粒物传感器" title="Particulate sensor"></a></p>
<p><em>颗粒物传感器</em></p>
<p>如果是只带有 Micro USB 的树莓派 Zero W，那还需要一根连接到标准 USB 端口的适配线，只需要 20 美元，而传感器则自带适配串行接口的 USB 适配器。</p>
<h3><a href="#安装过程"></a>安装过程</h3>
<p>对于树莓派，只需要下载对应的 Raspbian Lite 镜像并且<a href="https://www.raspberrypi.org/documentation/installation/installing-images/README.md">写入到 Micro SD 卡</a>上就可以了（网上很多教程都有介绍如何设置 WLAN 连接，我就不细说了）。</p>
<p>如果要使用 SSH，那还需要在启动分区建立一个名为 <code>ssh</code> 的空文件。树莓派的 IP 通过路由器或者 DHCP 服务器获取，随后就可以通过 SSH 登录到树莓派了（默认密码是 raspberry）：</p>
<pre><code class="hljs lsl">$ ssh pi@<span class="hljs-number">192.168</span><span class="hljs-number">.1</span><span class="hljs-number">.5</span>

</code></pre><p>首先我们需要在树莓派上安装一下这些包：</p>
<pre><code class="hljs crystal">$ sudo apt install git-core python-serial python-<span class="hljs-class"><span class="hljs-keyword">enum</span> <span class="hljs-title">lighttpd</span></span>

</code></pre><p>在开始之前，我们可以用 <code>dmesg</code> 来获取 USB 适配器连接的串行接口：</p>
<pre><code class="hljs routeros">$ dmesg
[ 5.559802] usbcore: registered new<span class="hljs-built_in"> interface </span>driver usbserial
[ 5.559930] usbcore: registered new<span class="hljs-built_in"> interface </span>driver usbserial_generic
[ 5.560049] usbserial: USB Serial support registered <span class="hljs-keyword">for</span> generic
[ 5.569938] usbcore: registered new<span class="hljs-built_in"> interface </span>driver ch341
[ 5.570079] usbserial: USB Serial support registered <span class="hljs-keyword">for</span> ch341-uart
[ 5.570217] ch341 1–1.4:1.0: ch341-uart converter detected
[ 5.575686] usb 1–1.4: ch341-uart converter now attached <span class="hljs-keyword">to</span> ttyUSB0

</code></pre><p>在最后一行，可以看到接口 <code>ttyUSB0</code>。然后我们需要写一个 Python 脚本来读取传感器的数据并以 JSON 格式存储，在通过一个 HTML 页面就可以把数据展示出来了。</p>
<h3><a href="#在树莓派上读取数据"></a>在树莓派上读取数据</h3>
<p>首先创建一个传感器实例，每 5 分钟读取一次传感器的数据，持续 30 秒，这些数值后续都可以调整。在每两次测定的间隔，我们把传感器调到睡眠模式以延长它的使用寿命（厂商认为元件的寿命大约 8000 小时）。</p>
<p>我们可以使用以下命令来下载 Python 脚本：</p>
<pre><code class="hljs awk">$ wget -O <span class="hljs-regexp">/home/</span>pi<span class="hljs-regexp">/aqi.py https:/</span><span class="hljs-regexp">/raw.githubusercontent.com/</span>zefanja<span class="hljs-regexp">/aqi/m</span>aster<span class="hljs-regexp">/python/</span>aqi.py

</code></pre><p>另外还需要执行以下两条命令来保证脚本正常运行：</p>
<pre><code class="hljs groovy">$ sudo chown <span class="hljs-string">pi:</span>pi <span class="hljs-regexp">/var/</span>www<span class="hljs-regexp">/html/</span>
$ echo <span class="hljs-string">'[]'</span> &gt; <span class="hljs-regexp">/var/</span>www<span class="hljs-regexp">/html/</span>aqi.json

</code></pre><p>下面就可以执行脚本了：</p>
<pre><code class="hljs gcode">$ chmod +x aqi.p
$ ./aqi.py
P<span class="hljs-name">M2.5</span>:<span class="hljs-number">55.3</span>, P<span class="hljs-name">M10</span>:<span class="hljs-number">47.5</span>
P<span class="hljs-name">M2.5</span>:<span class="hljs-number">55.5</span>, P<span class="hljs-name">M10</span>:<span class="hljs-number">47.7</span>
P<span class="hljs-name">M2.5</span>:<span class="hljs-number">55.7</span>, P<span class="hljs-name">M10</span>:<span class="hljs-number">47.8</span>
P<span class="hljs-name">M2.5</span>:<span class="hljs-number">53.9</span>, P<span class="hljs-name">M10</span>:<span class="hljs-number">47.6</span>
P<span class="hljs-name">M2.5</span>:<span class="hljs-number">53.6</span>, P<span class="hljs-name">M10</span>:<span class="hljs-number">47.4</span>
P<span class="hljs-name">M2.5</span>:<span class="hljs-number">54.2</span>, P<span class="hljs-name">M10</span>:<span class="hljs-number">47.3</span>
…

</code></pre><h3><a href="#自动化执行脚本"></a>自动化执行脚本</h3>
<p>只需要使用诸如 crontab 的服务，我们就不需要每次都手动启动脚本了。按照以下命令打开 crontab 文件：</p>
<pre><code class="hljs shell"><span class="hljs-meta">$</span><span class="bash"> crontab -e</span>

</code></pre><p>在文件末尾添加这一行：</p>
<pre><code class="hljs groovy"><span class="hljs-meta">@reboot</span> cd <span class="hljs-regexp">/home/</span>pi<span class="hljs-regexp">/ &amp;&amp; ./</span>aqi.py

</code></pre><p>现在我们的脚本就会在树莓派每次重启后自动执行了。</p>
<h3><a href="#展示颗粒物测定值和空气质量指数的-html-页面"></a>展示颗粒物测定值和空气质量指数的 HTML 页面</h3>
<p>我们在前面已经安装了一个轻量级的 web 服务器 <code>lighttpd</code>，所以我们需要把 HTML、JavaScript、CSS 文件放置在 <code>/var/www/html</code> 目录中，这样就能通过电脑和智能手机访问到相关数据了。执行下面的三条命令，可以下载到对应的文件：</p>
<pre><code class="hljs elixir"><span class="hljs-variable">$ </span>wget -O /var/www/html/index.html <span class="hljs-symbol">https:</span>/<span class="hljs-regexp">/raw.githubusercontent.com/zefanja</span><span class="hljs-regexp">/aqi/master</span><span class="hljs-regexp">/html/index</span>.html
<span class="hljs-variable">$ </span>wget -O /var/www/html/aqi.js <span class="hljs-symbol">https:</span>/<span class="hljs-regexp">/raw.githubusercontent.com/zefanja</span><span class="hljs-regexp">/aqi/master</span><span class="hljs-regexp">/html/aqi</span>.js
<span class="hljs-variable">$ </span>wget -O /var/www/html/style.css <span class="hljs-symbol">https:</span>/<span class="hljs-regexp">/raw.githubusercontent.com/zefanja</span><span class="hljs-regexp">/aqi/master</span><span class="hljs-regexp">/html/style</span>.css

</code></pre><p>在 JavaScript 文件中，实现了打开 JSON 文件、提取数据、计算空气质量指数的过程，随后页面的背景颜色将会根据 EPA 的划分标准而变化。</p>
<p>你只需要用浏览器访问树莓派的地址，就可以看到当前颗粒物浓度值等数据了： <a href="http://192.168.1.5/">http://192.168.1.5:</a></p>
<p>这个页面比较简单而且可扩展，比如可以添加一个展示过去数小时历史数据的表格等等。</p>
<p>这是<a href="https://github.com/zefanja/aqi">Github上的完整源代码</a>。</p>
<h3><a href="#总结"></a>总结</h3>
<p>在资金相对紧张的情况下，树莓派是一种选择。除此以外，还有很多可以用来测定颗粒物的应用，包括室外固定装置、移动测定设备等等。我们学校则同时采用了这两种：固定装置在室外测定全天颗粒物浓度，而移动测定设备在室内检测空调过滤器的效果。</p>
<p><a href="http://luftdaten.info/">Luftdaten.info</a> 提供了一个如何设计类似的传感器的介绍，其中的软件效果出众，而且因为它没有使用树莓派，所以硬件更是小巧。</p>
<p>对于学生来说，设计一个颗粒物传感器确实算得上是一个优秀的课外项目。</p>
<p>你又打算如何使用你的<a href="https://openschoolsolutions.org/shutdown-servers-case-power-failure%e2%80%8a-%e2%80%8aups-nut-co/">树莓派</a>呢？</p>
<hr>
<p>via: <a href="https://opensource.com/article/18/3/how-measure-particulate-matter-raspberry-pi">https://opensource.com/article/18/3/how-measure-particulate-matter-raspberry-pi</a></p>
<p>作者：<a href="https://opensource.com/users/stephan">Stephan Tetzel</a> 译者：<a href="https://github.com/HankChow">HankChow</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何使用树莓派测定颗粒物（PM 2.5）

## 原文链接
[https://www.zcfy.cc/article/how-to-measure-particulate-matter-with-a-raspberry-pi](https://www.zcfy.cc/article/how-to-measure-particulate-matter-with-a-raspberry-pi)

