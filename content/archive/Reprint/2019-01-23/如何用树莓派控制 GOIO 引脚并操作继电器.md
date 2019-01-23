---
title: '如何用树莓派控制 GOIO 引脚并操作继电器' 
date: 2019-01-23 2:30:07
hidden: true
slug: 795bewwzbpb
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#如何用树莓派控制-goio-引脚并操作继电器"></a>如何用树莓派控制 GOIO 引脚并操作继电器</h1>
<blockquote>
<p>学习如何用 PHP 和温度传感器实现树莓派控制 GPIO 并操作继电器</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/102587fb171f2246b4d07be7abedc9cad06d7169/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f696d6167652d66756c6c2d73697a652f7075626c69632f696d616765732f6c6966652f7261737062657272795f70695f6461795f6c6561645f302e6a7065673f69746f6b3d6c43786d76695244"><img src="" alt="How to control GPIO pins and operate relays with the Raspberry Pi" title="How to control GPIO pins and operate relays with the Raspberry Pi"></a></p>
<p>你是否曾经想知道怎样使用手机或者电脑在任何地方控制你的风扇和灯等一些家用电器？</p>
<p>我现在想控制我的圣诞彩灯，是使用手机呢，还是使用平板电脑呢，或者是使用笔记本电脑呢？都不是，而是仅仅使用一个树莓派。让我来告诉你如何使用 PHP 和温度传感器实现树莓派控制 GPIO 引脚并操作继电器。我使用 AJAX 把它们整合在了一起。</p>
<h3><a href="#硬件要求"></a>硬件要求：</h3>
<ul>
<li>树莓派</li>
<li>安装有 Raspbian 系统的 SD 卡（任何一张 SD 卡都可以，但是我更偏向使用大小为 32GB 等级为 class 10 的 SD 卡）</li>
<li>电源适配器</li>
<li>跳线（母对母跳线和公转母跳线）</li>
<li>继电器板（我使用一个用于 12V 继电器的继电器板）</li>
<li>DS18B20 温度传感器</li>
<li>树莓派的 Wi-Fi 适配器</li>
<li>路由器（为了访问互联网，你需要有一个拥有端口转发的路由器）</li>
<li>10KΩ 的电阻</li>
</ul>
<h3><a href="#软件要求"></a>软件要求：</h3>
<ul>
<li>下载并安装 Raspbian 系统到你的 SD 卡</li>
<li>有效的互联网连接</li>
<li>Apache web 服务器</li>
<li>PHP</li>
<li>WiringPi</li>
<li>基于 Mac 或者 Windows 的 SSH 客户端</li>
</ul>
<h3><a href="#一般的配置和设置"></a>一般的配置和设置</h3>
<p>1、 插入 SD 卡到树莓派，然后使用以太网网线将它连接到路由器；</p>
<p>2、 连接 WiFi 适配器；</p>
<p>3、 使用 SSH 方式登录到树莓派，然后使用下面的命令编辑 <code>interfaces</code> 文件：</p>
<pre><code class="hljs dts">sudo nano <span class="hljs-meta-keyword">/etc/</span>network/interfaces

</code></pre><p>这个命令会用一个叫做 <code>nano</code> 的编辑器打开这个文件。它是一个非常简单又易于使用的文本编辑器。如果你不熟悉基 Linux 的操作系统，可以使用键盘上的方向键来操作。</p>
<p>用 <code>nano</code> 打开这个文件后，你会看到这样一个界面：</p>
<p><a href="https://camo.githubusercontent.com/4b55f5bf42ae050d91f357820ed8c625bceb1529/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f70757474795f302e706e67"><img src="https://p0.ssl.qhimg.com/t01ba9854610b07ed96.png" alt="File editor nano" title="File editor nano"></a></p>
<p>4、要配置你的无线网络，按照下面所示修改这个文件：</p>
<pre><code class="hljs pf">iface lo <span class="hljs-keyword">inet</span> loopback
iface eth0 <span class="hljs-keyword">inet</span> dhcp
allow-hotplug wlan0
auto wlan0
iface wlan0 <span class="hljs-keyword">inet</span> dhcp
   wpa-ssid <span class="hljs-string">"Your Network SSID"</span>
   wpa-psk <span class="hljs-string">"Your Password"</span>

</code></pre><p>5、 按 <code>CTRL+O</code> 保存，然后按 <code>CTRL+X</code> 退出编辑器。</p>
<p>到目前为止，一切都已经配置完成，接下来你需要做的就是使用命令重新加载网络：</p>
<pre><code class="hljs routeros">sudo<span class="hljs-built_in"> service </span>networking reload

</code></pre><p>（警告：如果你是使用远程连接的方式连接的树莓派，连接将会中断。)</p>
<h3><a href="#软件配置"></a>软件配置</h3>
<h4><a href="#安装-apache-web-服务器"></a>安装 Apache web 服务器</h4>
<p>Apache 是一个受欢迎的服务器应用，你可以在树莓派安装这个程序让它提供网页服务。Apache 原本就可以通过 HTTP 方式提供 HTML 文件服务，添加其他模块后，Apache 还可以使用像 PHP 这样的脚本语言来提供动态网页的服务。</p>
<p>可以在命令行输入下面命令安装 Apache：</p>
<pre><code class="hljs routeros">sudo apt-<span class="hljs-builtin-name">get</span> install apache2 -y

</code></pre><p>安装完成后，可以在浏览器地址栏输入树莓派的 IP 地址来测试 web 服务器。如果你可以获得下面图片的内容，说明你已经成功地安装并设置好了你的服务器。</p>
<p><a href="https://camo.githubusercontent.com/cfe04af3fb54ec0a4abebed865ada1b61430ddb1/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f6974776f726b732e706e67"><img src="https://p0.ssl.qhimg.com/t01ec18da6984456bb2.png" alt="Successful server setup" title="Successful server setup"></a></p>
<p>要改变这个默认的页面和添加你自己的 html 文件，进入 <code>var/www/html</code> 目录：</p>
<pre><code class="hljs jboss-cli"><span class="hljs-keyword">cd</span> <span class="hljs-string">/var/www/html</span>

</code></pre><p>添加一些文件来测试是否成功。</p>
<h4><a href="#安装-php"></a>安装 PHP</h4>
<p>PHP 是一个预处理器，这意味着它是当服务器收到网页请求时才会运行的一段代码。它开始运行，处理网页上需要被显示的内容，然后把网页发送给浏览器。不像静态的 HTML，PHP 在不同的环境下可以显示不同的内容。其他的语言也可以做到这一点，但是由于 WordPress 是用 PHP 编写的，有些时候你需要使用它。PHP 是 web 上一种非常受欢迎的语言，像 Facebok 和 Wikipeadia 这样的大型项目都是用 PHP 编写的。</p>
<p>使用下面的命令安装 PHP 和 Apache 软件包：</p>
<pre><code class="hljs applescript">sudo apt-<span class="hljs-keyword">get</span> install php5 libapache2-<span class="hljs-keyword">mod</span>-php5 -y

</code></pre><h4><a href="#测试-php"></a>测试 PHP</h4>
<p>创建文件 <code>index.php</code>：</p>
<pre><code class="hljs stylus">sudo nano index<span class="hljs-selector-class">.php</span>

</code></pre><p>在里面写入一些 PHP 内容：</p>
<pre><code class="hljs xml"><span class="php"><span class="hljs-meta">&lt;?php</span> <span class="hljs-keyword">echo</span> <span class="hljs-string">"hello world"</span>; <span class="hljs-meta">?&gt;</span></span>

</code></pre><p>保存文件，接下来删除 <code>index.html</code>，因为它比 <code>index.php</code> 的优先级更高：</p>
<pre><code class="hljs stylus">sudo rm index<span class="hljs-selector-class">.html</span>

</code></pre><p>刷新你的浏览器，你会看到 “hello world”。这并不是动态的，但是它仍然由 PHP 提供服务。如果你在上面看到提原始的 PHP 文件而不是“hello world”，重新加载和重启 Apahce（LCTT 译注，重启即可）：</p>
<pre><code class="hljs jboss-cli">sudo <span class="hljs-string">/etc/init.d/apache2</span> <span class="hljs-keyword">reload</span>
sudo <span class="hljs-string">/etc/init.d/apache2</span> restart

</code></pre><h4><a href="#安装-wiringpi"></a>安装 WiringPi</h4>
<p>为了可以对代码的更改进行跟踪，WiringPi 的维护采用 git。但假如你因为某些原因而没法使用 git，还有一种可以替代的方案。（通常你的防火墙会把你隔离开来，所以请先检查一下你的防火墙的设置情况！）</p>
<p>如果你还没有安装 git，那么在 Debian 及其衍生版本中（比如 Raspbian），你可以这样安装它：</p>
<pre><code class="hljs routeros">sudo apt-<span class="hljs-builtin-name">get</span> install git-core

</code></pre><p>若是你遇到了一些错误，请确保你的树莓派是最新版本的 Raspbian 系统：</p>
<pre><code class="hljs routeros">sudo apt-<span class="hljs-builtin-name">get</span> update sudo apt-<span class="hljs-builtin-name">get</span><span class="hljs-built_in"> upgrade
</span>
</code></pre><p>使用 git 获取最 WiringPi：</p>
<pre><code class="hljs crmsh">sudo git <span class="hljs-keyword">clone</span> <span class="hljs-title">git</span>://git.drogon.net/wiringPi

</code></pre><p>如果你之前已经使用过 clone 操作，那么可以使用下面命令：</p>
<pre><code class="hljs 1c">cd wiringPi <span class="hljs-meta">&amp;&amp; git pull origin</span>

</code></pre><p>这个命令会将会获取更新的版本，你然后可以重新运行下面的构建脚本。</p>
<p>有一个新的简化的脚本来构建和安装:</p>
<pre><code class="hljs jboss-cli"><span class="hljs-keyword">cd</span> wiringPi &amp;&amp; <span class="hljs-string">./build</span>

</code></pre><p>这个新的构建脚本将会为你完成编译和安装 WiringPi。它曾一度需要使用 <code>sudo</code> 命令，所以在运行这它之前你可能需要检查一下这个脚本。</p>
<h4><a href="#测试-wiringpi"></a>测试 WiringPi</h4>
<p>运行 <code>gpio</code> 命令来检查安装成功与否:</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">gpio -v gpio readall</span>

</code></pre><p>这将给你一些信心，软件运行良好。</p>
<h4><a href="#连接-ds18b20-传感器到树莓派"></a>连接 DS18B20 传感器到树莓派</h4>
<ul>
<li>传感器上的黑线用于 GND。</li>
<li>红线用于 VCC。</li>
<li>黄线是 GPIO 线。</li>
</ul>
<p><a href="https://camo.githubusercontent.com/a360396d0ca1168b5319de55d396a2f4b2ad4a47/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f6770696f5f302e706e67"><img src="https://p0.ssl.qhimg.com/t015f51077b275133d4.png" alt="GPIO image" title="GPIO image"></a></p>
<p>连线：</p>
<ul>
<li>VCC 连接 3V 的 1 号引脚。</li>
<li>GPIO 线连接 7 号引脚（GPIO4）。</li>
<li>地线连接 GND 的 9 号引脚。</li>
</ul>
<h4><a href="#软件配置-1"></a>软件配置</h4>
<p>为了用 PHP 使用 DS18B20 温度传感器模块，你需要执行下面的命令来激活用于树莓派上 GPIO 引脚和 DS18B20 的内核模块：</p>
<pre><code class="hljs nginx"><span class="hljs-attribute">sudo</span> modprobe w1-gpio
sudo modprobe w1-therm

</code></pre><p>你不想每次 Raspberry 重启后都手动执行上述命令，所以你想每次开机能自动启动这些模块。可以在文件 <code>/etc/modules</code> 中添加下面的命令行来做到：</p>
<pre><code class="hljs coffeescript">sudo nano <span class="hljs-regexp">/etc/modules/</span>

</code></pre><p>添加下面的命令行到它里面:</p>
<pre><code class="hljs">w1-gpio
w1-therm

</code></pre><p>为了测试，输入:</p>
<pre><code class="hljs dts">cd <span class="hljs-meta-keyword">/sys/</span>bus<span class="hljs-meta-keyword">/w1/</span>devices/

</code></pre><p>现在输入 <code>ls</code>。</p>
<p>你会看到你的设备信息。在设备驱动程序中，你的 DS18B20 传感器应该作为一串字母和数字被列出。在本例中，设备被记录为 <code>28-000005e2fdc3</code>。然后你需要使用 <code>cd</code> 命令来访问传感器，用你自己的序列号替代我的： <code>cd 28-000005e2fdc3</code>。</p>
<p>DS18B20 会周期性的将数据写入文件 <code>w1_slave</code>，所以你只需要使用命令 <code>cat</code>来读出数据： <code>cat w1_slave</code>。</p>
<p>这会生成下面的两行文本，输出中 <code>t=</code> 表示摄氏单位的温度。在前两位数后面加上一个小数点(例如，我收到的温度读数是 30.125 摄氏度)。</p>
<h3><a href="#连接继电器"></a>连接继电器</h3>
<p>1、 取两根跳线，把其中一根连接到树莓派上的 GPIO24（18 号引脚），另一根连接 GND 引脚。你可以参考下面这张图。</p>
<p>2、 现在将跳线的另一端连接到继电器板。GND 连接到继电器上的 GND，GPIO 输出线连接到继电器的通道引脚号，这取决于你正使用的继电器型号。记住，将树莓派上的 GND 与继电器上的 GND 连接连接起来，树莓派上的 GPIO 输出连接继电器上的输入引脚。</p>
<p><a href="https://camo.githubusercontent.com/4642236cc5939e1a05aaeddb5965bd3cfca77304/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f686561646572732e706e67"><img src="https://p0.ssl.qhimg.com/t010a197dc3a4d671ad.png" alt="Headers" title="Headers"></a></p>
<p>注意！将继电器连接树莓派的时候小心一些，因为它可能会导致电流回流，这会造成短路。</p>
<p>3、 现在将电源连接继电器，可以使用 12V 的电源适配器，也可以将 VCC 引脚连接到什么破上的 3.3V 或 5.5V 引脚。</p>
<h3><a href="#使用-php-控制继电器"></a>使用 PHP 控制继电器</h3>
<p>让我们先写一个借助于 WiringPi 软件用来控制 Paspberry Pi 上 GPIO 引脚的 PHP 脚本。</p>
<p>1、在 Apache 服务器的网站根目录下创建一个文件，使用下面命令切换到该目录：</p>
<pre><code class="hljs jboss-cli"><span class="hljs-keyword">cd</span> <span class="hljs-string">/var/www/html</span>

</code></pre><p>2、 新建一个叫 <code>Home</code> 的文件夹：</p>
<pre><code class="hljs arduino">sudo <span class="hljs-built_in">mkdir</span> Home

</code></pre><p>3、 新建一个叫 <code>on.php</code>的脚本</p>
<pre><code class="hljs applescript">sudo nano <span class="hljs-keyword">on</span>.<span class="hljs-title">php</span>

</code></pre><p>4、 在脚本中加入下面的代码：</p>
<pre><code class="hljs xml"><span class="php"><span class="hljs-meta">&lt;?php</span>

        system(<span class="hljs-string">"gpio-g mode 24 out"</span>);
        system(<span class="hljs-string">"gpio-g write 24 1"</span>);

<span class="hljs-meta">?&gt;</span></span>

</code></pre><p>5、 使用 <code>CTRL+O</code> 保存文件，<code>CTRL+X</code> 退出。</p>
<p>上面的代码中，你在第一行使用命令将 24 号 GPIO引脚设置为 output 模式：</p>
<pre><code class="hljs abnf">system(<span class="hljs-string">"gpio-g mode 24 out"</span>) <span class="hljs-comment">;</span>

</code></pre><p>在第二行，你使用 <code>1</code> 将 24 号引脚 GPIO 打开，在二进制中"1"表示打开，"0"表示关闭。</p>
<p>6、 为了关闭继电器，可以创建另外一个 <code>off.php</code> 文件，并用 <code>0</code> 替换 <code>1</code>。</p>
<pre><code class="hljs xml"><span class="php"><span class="hljs-meta">&lt;?php</span>

        system(<span class="hljs-string">" gpio-g mode 24 out "</span>);
        system(<span class="hljs-string">" gpio-g write 24 1 "</span>);

<span class="hljs-meta">?&gt;</span></span>

</code></pre><p>7、 如果你已经将继电器连接了树莓派，可以在浏览器中输入你的树莓派的 IP 地址，并在后面加上目录名和文件名来进行访问：</p>
<pre><code class="hljs awk">http:<span class="hljs-regexp">//</span>{IPADDRESS}<span class="hljs-regexp">/home/</span>on.php 

</code></pre><p>这将会打开继电器。</p>
<p>8、 要关闭它，可以访问叫 <code>off.php</code> 的文件：</p>
<pre><code class="hljs awk">http:<span class="hljs-regexp">//</span>{IPADDRESS}<span class="hljs-regexp">/home/</span>off.php

</code></pre><p>现在你需要能够在一个单独的页面来控制这两样事情，而不用单独的刷新或者访问这两个页面。你可以使用 AJAX 来完成。</p>
<p>9、 新建一个 HTML 文件，并在其中加入下面代码：</p>
<pre><code class="hljs django"><span class="xml">[html + php + ajax codeblock]

<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript"><span class="hljs-comment">// &lt;![CDATA[</span>

$(<span class="hljs-built_in">document</span>).ready(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{

$(<span class="hljs-string">'#on'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{

<span class="hljs-keyword">var</span> a= <span class="hljs-keyword">new</span> XMLHttpRequest();

a.open(<span class="hljs-string">"GET"</span>, <span class="hljs-string">"on.php"</span>); a.onreadystatechange=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{

<span class="hljs-keyword">if</span>(a.readyState==<span class="hljs-number">4</span>){ <span class="hljs-keyword">if</span>(a.status ==<span class="hljs-number">200</span>){

 } <span class="hljs-keyword">else</span> alert (<span class="hljs-string">"http error"</span>); } }

a.send();

});

});

$(<span class="hljs-built_in">document</span>).ready(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)

</span>{ $(<span class="hljs-string">'#Off'</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{

<span class="hljs-keyword">var</span> a= <span class="hljs-keyword">new</span> XMLHttpRequest();

a.open(<span class="hljs-string">"GET"</span>, <span class="hljs-string">"off.php"</span>);

a.onreadystatechange=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{

<span class="hljs-keyword">if</span>(a.readyState==<span class="hljs-number">4</span>){

<span class="hljs-keyword">if</span>(a.status ==<span class="hljs-number">200</span>){

 } <span class="hljs-keyword">else</span> alert (<span class="hljs-string">"http error"</span>); } }

a.send();

});

});

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"on"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span>``<span class="hljs-attr">Switch</span> <span class="hljs-attr">Lights</span> <span class="hljs-attr">On</span> &lt;/<span class="hljs-attr">button</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"off"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span>``<span class="hljs-attr">Switch</span> <span class="hljs-attr">Lights</span> <span class="hljs-attr">Off</span> &lt;/<span class="hljs-attr">button</span>&gt;</span>

</span></code></pre><p>10、 保存文件，进入你的 web 浏览器目录，然后打开那个网页。你会看到两个按钮，它们可以打开和关闭灯泡。基于同样的想法，你还可以使用 bootstrap 和 CSS 来创建一个更加漂亮的 web 界面。</p>
<h3><a href="#在这个网页上观察温度"></a>在这个网页上观察温度</h3>
<p>1、 新建一个 <code>temperature.php</code> 的文件：</p>
<pre><code class="hljs stylus">sudo nano temperature<span class="hljs-selector-class">.php</span>

</code></pre><p>2、 在文件中加入下面的代码，用你自己的设备 ID 替换 <code>10-000802292522</code>：</p>
<pre><code class="hljs xml"><span class="php"><span class="hljs-meta">&lt;?php</span>
<span class="hljs-comment">//File to read</span>
$file = <span class="hljs-string">'/sys/devices/w1_bus_master1/10-000802292522/w1_slave'</span>;
<span class="hljs-comment">//Read the file line by line</span>
$lines = file($file);
<span class="hljs-comment">//Get the temp from second line</span>
$temp = explode(<span class="hljs-string">'='</span>, $lines[<span class="hljs-number">1</span>]);
<span class="hljs-comment">//Setup some nice formatting (i.e., 21,3)</span>
$temp = number_format($temp[<span class="hljs-number">1</span>] / <span class="hljs-number">1000</span>, <span class="hljs-number">1</span>, <span class="hljs-string">','</span>, <span class="hljs-string">''</span>);
<span class="hljs-comment">//And echo that temp</span>
<span class="hljs-keyword">echo</span> $temp . <span class="hljs-string">" °C"</span>;
<span class="hljs-meta">?&gt;</span></span>

</code></pre><p>3、 打开你刚刚创建的 HTML 文件，并创建一个新的带有 <code>id</code> 为 “screen” 的 <code>&lt;div&gt;</code>标签</p>
<pre><code class="hljs applescript">&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">id</span>=<span class="hljs-string">"screen"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;

</code></pre><p>4、 在这个标签后或者这个文档的尾部下面的代码：</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
$(<span class="hljs-built_in">document</span>).ready(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
$(<span class="hljs-string">"#screen"</span>).load(<span class="hljs-string">'temperature.php'</span>)
}, <span class="hljs-number">1000</span>);
});
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

</code></pre><p>其中，<code>#screen</code> 是标签 <code>&lt;div&gt;</code> 的 <code>id</code> ，你想在它里面显示温度。它会每隔 1000 毫秒加载一次 <code>temperature.php</code> 文件。</p>
<p>我使用了 bootstrap 框架来制作一个漂亮的面板来显示温度，你还可以加入多个图标和图形让网页更有吸引力。</p>
<p>这只是一个控制继电器板并显示温度的基础的系统，你可以通过创建基于定时和从恒温器读数等基于事件触发来进一步地对系统进行开发。</p>
<p>（ 题图：opensource.com）</p>
<hr>
<p>作者简介：</p>
<p>Abdul Hannan Mustajab: 我 17 岁，生活在印度。我正在追求科学，数学和计算机科学方面的教育。我在 spunkytechnology.com 上发表关于我的项目的博客。我一直在对使用不同的微控制器和电路板的基于物联网的 AI 进行研究。</p>
<p>via: <a href="https://opensource.com/article/17/3/operate-relays-control-gpio-pins-raspberry-pi">https://opensource.com/article/17/3/operate-relays-control-gpio-pins-raspberry-pi</a></p>
<p>作者：<a href="https://opensource.com/users/mustajabhannan">Abdul Hannan Mustajab</a> 译者：<a href="https://github.com/zhousiyu325">zhousiyu325</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何用树莓派控制 GOIO 引脚并操作继电器

## 原文链接
[https://www.zcfy.cc/article/how-to-control-gpio-pins-and-operate-relays-with-the-raspberry-pi](https://www.zcfy.cc/article/how-to-control-gpio-pins-and-operate-relays-with-the-raspberry-pi)

