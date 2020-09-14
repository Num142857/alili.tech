---
title: 'JavaScript 进阶知识 - Ajax篇' 
date: 2018-12-10 2:30:07
hidden: true
slug: qlk7l3b8qc
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000013696283?w=1920&amp;h=1080" src="https://static.alili.tech/img/remote/1460000013696283?w=1920&amp;h=1080" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader0">Ajax</h1>
<h2 id="articleHeader1">前言</h2>
<p>前面我们已经学习了<code>js</code>基础知识和一些简单的特效，基本上已经能够写出一个带有特效的静态页面了，为什么还要称之为静态页面呢？因为网页里的数据都是写死的，真正的工作中，我们是要通过<code>Ajax</code>技术，去后台获取数据的。所以在本篇文章，我会向大家介绍下什么是<code>Ajax</code>技术，并且它的实现原理是什么。</p>
<h2 id="articleHeader2">1. 服务器端技术基础</h2>
<h3 id="articleHeader3">1.1 服务器</h3>
<blockquote>在学习<code>Ajax</code>之前，我们首先需要知道什么是服务器。</blockquote>
<p><strong>1、什么是服务器？</strong></p>
<blockquote>服务器的本质其实就是一台电脑，不过它不像一般的电脑一样拥有鼠标键、键盘、显示器等输入设备，它直接就是一个主机，里面只有主板、硬盘、<code>cpu</code>、内存并且性能比一般计算机的性能更高，稳定性更强。</blockquote>
<ul>
<li>通过网络为其他计算机提供应用服务的计算机就是服务器。</li>
<li>有别于普通的<code>PC</code>，服务器性能更好、安全性更高、稳定性更强。</li>
<li>服务器运行在有特定环境要求的地方</li>
<li>
<code>IDC</code>（对气候、能源、消防、建筑、安保等要求。</li>
</ul>
<p>服务器外观图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013696284" src="https://static.alili.tech/img/remote/1460000013696284" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013696285" src="https://static.alili.tech/img/remote/1460000013696285" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p><strong>2、服务器提供什么服务</strong></p>
<blockquote>根据需求的不同，服务器的种类也有所不同。</blockquote>
<ul>
<li>网页服务器(<code>Web Server</code>)</li>
<li>邮件服务器(<code>Mail Server</code>)</li>
<li>数据库服务器(<code>Database Server</code>)</li>
<li>
<code>FTP</code>服务器(<code>FTP Server</code>)</li>
<li>域名服务器(<code>DNS Server</code>)</li>
</ul>
<p><strong>3、服务器操作系统：</strong></p>
<ul>
<li><code>Windows Server</code></li>
<li>
<code>Linux</code> （<code>Debian</code>，<code>Ubuntu</code>，<code>CentOS</code>，<code>Fedora</code>）</li>
</ul>
<p><strong>4、服务器的应用软件：</strong></p>
<ul>
<li>
<p><code>Web</code>服务器(又称：<code>http</code>服务器，主要提供文档的浏览功能，文本、图片、视频、音频)。</p>
<ul>
<li>
<code>IIS</code> （<code>Windows</code>）</li>
<li><code>Apache</code></li>
<li><code>Nginx</code></li>
</ul>
</li>
<li>
<p>数据库服务器</p>
<ul>
<li><code>SQL Server</code></li>
<li><code>Oracle</code></li>
<li><code>MySQL</code></li>
</ul>
</li>
</ul>
<h3 id="articleHeader4">1.2 客户端</h3>
<p><strong>客户端：</strong> 通过网络向服务器请求服务的计算机就是客户端（手机、电脑）；</p>
<p><strong>客户端软件：</strong> 在客户端计算机上运行的与服务器通讯的软件就叫客户端软件；</p>
<p><strong>单机软件：</strong> 在客户端计算机上运行的不访问网络的软件叫做单机软件；</p>
<h3 id="articleHeader5">1.3 软件开发架构</h3>
<blockquote>软件开发架构分为两种，分别是<code>C/S</code>架构和<code>B/S</code>架构。</blockquote>
<p><strong>1、C/S架构：</strong></p>
<blockquote>
<code>C/S</code>，是<code>Client</code>：（客户端）和<code>Server</code>（服务器）两个单词的简写，指的是客户端应用程序与服务器端应用程序通讯的软件开发架构。</blockquote>
<p>对于<code>C/S</code>架构，最为常见的例子就是网络游戏，比如<code>LOL</code>，如果不联网就无法使用。</p>
<p><strong>优点：</strong></p>
<ul>
<li>由于是原生的应用，所以显示的效果会更加酷炫;</li>
<li>性能较高，可以将一部分计算的工作放在客户端上，这样服务器只需要处理数据即可。</li>
</ul>
<p><strong>缺点：</strong></p>
<ul>
<li>重量级，必需要安装<code>app</code>；</li>
<li>软件需要用户去更新，并且要考虑不同的设备访问。</li>
</ul>
<p><strong>2、B/S架构</strong></p>
<blockquote>
<code>B/S</code>，是<code>Browser</code>：（浏览器）和<code>Server</code>（服务器），两个单词的简写，指的是<code>Web</code>浏览器与服务器端应用程序通讯的软件开发架构。</blockquote>
<p>现在所有的网站都是<code>B/S</code>架构，比如知乎、网易云音乐、百度...，用户只需使用浏览器就能访问服务器；</p>
<p><strong>优点：</strong></p>
<ul>
<li>轻量级，不需要安装客户端，用户不需要主动去更新内容，只需要开发人员更改服务器的内容即可；</li>
<li>多设备同步，所有数据都在网上。</li>
</ul>
<p><strong>缺点：</strong></p>
<ul>
<li>性能较低，如果是很酷炫的页面，那么现阶段还实现不了；</li>
<li>移动设备兼容性较好，但是浏览器兼容性较差。</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013696286" src="https://static.alili.tech/img/remote/1460000013696286" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader6">1.4 网络基础</h3>
<p><strong>1、IP地址</strong></p>
<blockquote>
<code>IP</code>地址是网络上每一台设备通讯时的身份标识(就像身份证、手机号)。</blockquote>
<p><code>IP</code>地址长什么样子呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="192.168.10.10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;">192<span class="hljs-selector-class">.168</span><span class="hljs-selector-class">.10</span><span class="hljs-selector-class">.10</span></code></pre>
<p>比如，百度的<code>IP</code>地址就是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="119.75.213.61" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;">119<span class="hljs-selector-class">.75</span><span class="hljs-selector-class">.213</span><span class="hljs-selector-class">.61</span></code></pre>
<p>特殊的<code>IP</code>地址-代表本机：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="127.0.0.1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;">127<span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.0</span><span class="hljs-selector-class">.1</span></code></pre>
<p>如何查看当前<code>IP</code>地址？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="打开命令行工具，直接输入“ipconfig”
ipconfig 命令" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dos"><code>打开命令行工具，直接输入“<span class="hljs-built_in">ipconfig</span>”
<span class="hljs-built_in">ipconfig</span> 命令</code></pre>
<p><strong>2、域名</strong></p>
<blockquote>域名简单的说，就是给<code>IP</code>地址起一个容易记忆的名字(就好比人的名字一样)例如百度的域名：<code>www.baidu.com</code>。</blockquote>
<p>因为<code>IP</code>地址记忆起来非常不方便，所以日常生活中用户通过域名来访问服务器更加方便。</p>
<p>特殊的域名：<code>localhost</code>(代表本机)。</p>
<p><strong>3、DNS 服务器</strong></p>
<blockquote>什么是<code>DNS</code>？<code>DNS</code>(<code>Domain Name Server</code>)，其实就是域名服务器。</blockquote>
<p>输入网址后的访问流程（域名-&gt;<code>DNS</code>-&gt;<code>IP</code>地址）</p>
<p>查看域名与<code>IP</code>地址的对应关系（<code>ping</code> 命令）</p>
<p>可以用<code>Hosts</code>文件让自己的电脑变成一个属于自己的<code>DNS</code>服务器。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013696287?w=1128&amp;h=525" src="https://static.alili.tech/img/remote/1460000013696287?w=1128&amp;h=525" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>4、网络端口（Port）</strong></p>
<blockquote>端口是指计算机与外界进行通讯的数据出口（入口），每个端口为不同的应用传输不同数据。</blockquote>
<p><strong>端口号：</strong> 每一个端口都有一个端口号。范围是从<code>0</code> 到<code>65535</code>。</p>
<p><em>端口号通常跟在<code>IP</code>地址后面，用冒号分隔。例如：<code>192.168.1.1:80</code>、<code>www.jd.com:80</code></em></p>
<p><strong>常用端口号：</strong> <code>80（HTTP）</code>、<code>3306（MySQL）</code>、<code>21（FTP）</code>。</p>
<p><em>查看本机被占用的端口情况（命令行输入：<code>netstat</code>）</em></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013696288" src="https://static.alili.tech/img/remote/1460000013696288" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>5、数据库</strong></p>
<blockquote>按照数据结构来组织、存储和管理数据的仓库，软件开发行业一般指的是数据库软件，常见的有<code>Oracle</code>、<code>MySQL</code>等。</blockquote>
<p><strong>特点：</strong></p>
<ul>
<li>数据共享，多用户同时访问数据的稳定性；</li>
<li>故障恢复，数据库软件，提供了一套方法，可以用来发现错误，并且修复错误。</li>
<li>减少数据冗余，由于大家都可以使用同一套数据，没有必要重复创建。</li>
</ul>
<p><strong>DBA数据库管理员：</strong></p>
<p>从事管理和维护数据库管理系统(<code>DBMS</code>)的相关工作人员的统称。保证数据库的稳定性、安全性、完整性和高性能。</p>
<h2 id="articleHeader7">2. Web 服务器</h2>
<h3 id="articleHeader8">2.1 Web服务器的作用</h3>
<ul>
<li>可以通过浏览器访问或查看<code>Web</code>服务器上的文件资源。</li>
<li>文件资源可以是<code>HTML</code>网页、文本、图片、视频、音频、<code>Web</code>服务器程序等。</li>
</ul>
<h3 id="articleHeader9">2.2 AMP 集成环境</h3>
<blockquote>
<code>AMP</code>，<code>A：Apache</code>，<code>M：MySQL</code>，<code>P：PHP</code>
</blockquote>
<p><strong>1、Apache：</strong></p>
<p>世界排名第一的服务器软件，特点是：简单速度快，性能稳定。</p>
<p><strong>2、MySQL：</strong></p>
<p>体积小、速度快、使用成本低，而且还是开源。</p>
<p><strong>3、PHP：</strong></p>
<p>超文本预处理器，直接将代码嵌入到<code>HTML</code>文档中执行，简单易学，容易上手。</p>
<h3 id="articleHeader10">2.3 Web服务器软件的安装</h3>
<p>在自己的<code>Windows</code>电脑上<code>Web</code>服务器软件 - <code>Wamp</code>。</p>
<blockquote>
<code>WampServer</code>: <code>Wamp</code>就是<code>Windows</code>、<code>Apache</code>、<code>Mysql</code>、<code>PHP</code>集成安装环境，即在<code>window</code>下的<code>apache</code>、<br><code>php</code>和<code>mysql</code>的服务器软件。<code>PHP</code>扩展、<code>Apache</code>模块，开启/关闭鼠标点点就搞定，再也不用亲自去修改<br>配置文件了，<code>WAMP</code>它会去做。再也不用到处询问<code>php</code>的安装问题了，<code>WAMP</code>一切都搞定了，这个软件<br>在<code>windows</code>平台上使用的较多。</blockquote>
<p>下载<code>Wamp</code>：<a>Wamp官网</a></p>
<p>安装<code>Wamp</code>：安装的时候要区分版本(<code>64</code>位，<code>32</code>位)，点击下一步下一步。</p>
<p>注意：安装目录的路径不能出现中文。</p>
<p>程序安装成功之后，任务栏里面的小图标是绿色的话，说明安装成功。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013696289" src="https://static.alili.tech/img/remote/1460000013696289" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>刚刚上面提到过，域名：<code>localhost</code> 和 <code>IP</code>地址：<code>127.0.0.1</code>都可以打开本地服务器：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013696290?w=466&amp;h=279" src="https://static.alili.tech/img/remote/1460000013696290?w=466&amp;h=279" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013696291?w=466&amp;h=279" src="https://static.alili.tech/img/remote/1460000013696291?w=466&amp;h=279" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>当出现<code>wamp</code>页面的时候说明软件安装成功。</p>
<h3 id="articleHeader11">2.4 安装的建议与问题</h3>
<ul>
<li>问题1：无法安装软件（请检查安装软件的版本与操作系统匹配）</li>
<li>问题2：安装完成后，<code>web</code>服务器没有正常运行（测试<code>web</code>服务器的端口号是否被占用）</li>
<li>建议1：<code>64</code>位版本、<code>32</code>位版本要分清</li>
<li>建议2：安装目录的路径不要有中文</li>
<li>建议3：提示默认浏览器和默认编辑器的设置可忽略</li>
<li>建议4：安装时建议关闭防火墙</li>
<li>建议5：如果已安装其他的<code>Web</code>服务器软件请先关闭</li>
</ul>
<h3 id="articleHeader12">2.5 Wamp服务器的使用</h3>
<p><strong>1、基本功能使用：</strong></p>
<p><strong>修改语言</strong> 右击任务栏中的软件小图标==&gt; <code>language</code> ==&gt; <code>chinese</code></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013696292" src="https://static.alili.tech/img/remote/1460000013696292" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>Web服务器的启动、停止、运行：</strong> 左击小图标 （修改配置文件之后，一定要重启服务器）；</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013696293" src="https://static.alili.tech/img/remote/1460000013696293" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>功能介绍：Apache</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013696294" src="https://static.alili.tech/img/remote/1460000013696294" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><em>其中两个配置文件后面可能需要修改，所以这里需要知道在哪找到它们。</em></p>
<p>看下它的配置文件-<code>httpd.conf</code>，其中 <code>#</code>表示的是注释的意思。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013696295?w=710&amp;h=362" src="https://static.alili.tech/img/remote/1460000013696295?w=710&amp;h=362" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>功能介绍：MySQL</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013696296" src="https://static.alili.tech/img/remote/1460000013696296" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>看下它的配置文件-<code>my.ini</code>，其中 <code>;</code>表示的是注释的意思：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013696297?w=706&amp;h=388" src="https://static.alili.tech/img/remote/1460000013696297?w=706&amp;h=388" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>功能介绍：PHP</strong> <code>Apache</code>是一个<code>web</code>服务器，它本身是不能解析<code>PHP</code>语言的，所以这里也集成了一个<code>PHP</code>解析器</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013696298" src="https://static.alili.tech/img/remote/1460000013696298" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>看下它的配置文件-<code>php.ini</code>，其中 <code>;</code>表示的是注释的意思：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013696299?w=664&amp;h=360" src="https://static.alili.tech/img/remote/1460000013696299?w=664&amp;h=360" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader13">2.6 Wamp服务器的简单配置</h3>
<p><strong>1、为Web服务配置一个域名（仅限本机使用的域名）</strong></p>
<p>找到<code>C:\Windows\System32\drivers\etc\hosts</code>文件并修改</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013696300?w=607&amp;h=427" src="https://static.alili.tech/img/remote/1460000013696300?w=607&amp;h=427" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>将本地的IP设置一个新的域名<code>lxh.com</code>，重启<code>Wamp</code>服务器，在地址栏里输入<code>lxh.com</code>就会跳转到服务器页面：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013696301?w=466&amp;h=279" src="https://static.alili.tech/img/remote/1460000013696301?w=466&amp;h=279" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>2、自定义Web服务器的根目录</strong></p>
<blockquote>我们可以看到，当我们输入本地域名或者<code>IP</code>的时候，都会弹出来服务器的界面，假如我想要打开一个文件的时候怎么办呢？这时候我们就需要配置服务器的根目录，只要是在根目录里面的文件，都可以通过服务器打开。</blockquote>
<p>查找并打开安装目录<code>D:\wamp64\bin\apache\apache2.4.23\conf\extra\httpd-vhosts.conf</code>文件：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013696302?w=959&amp;h=635" src="https://static.alili.tech/img/remote/1460000013696302?w=959&amp;h=635" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>打开修改配置文件，其中<code>ServerName</code>指的是域名，我们可以将第一步配好的本地域名地址写上去；<code>DocumentRoot D:/lxhAjax</code>和<code>&lt;Directory  "D:/lxhAjax/"&gt;</code>是自定义Web服务器的根目录为<code>D:/lxhAjax</code>文件夹</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013696303?w=576&amp;h=486" src="https://static.alili.tech/img/remote/1460000013696303?w=576&amp;h=486" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013696304?w=1381&amp;h=763" src="https://static.alili.tech/img/remote/1460000013696304?w=1381&amp;h=763" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p><strong>3、为Web服务器配置虚拟主机（一台Web服务器当多台用）</strong></p>
<blockquote>在同一局域网下别人可以通过你的<code>IP</code>访问你的<code>Web</code>服务器文件夹。</blockquote>
<ul>
<li>在<code>httpd-vhosts.conf</code> 文件中查找 <code>Require local</code>
</li>
<li>将<code>Require local</code> 改成 <code>Require all granted</code>
</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013696305?w=589&amp;h=175" src="https://static.alili.tech/img/remote/1460000013696305?w=589&amp;h=175" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p>不过建议大家不要这样做，安全性不高，电脑里面的东西会被别人看到。</p>
<p><strong>4、注意事项</strong></p>
<ul>
<li>
<code>php5.6</code> 以下版本要设置<code>php</code>默认编码，<code>default_charset = UTF-8</code>，否则<code>PHP</code>程序可能无法正确显示中文。</li>
<li>在<code>httpd.conf</code>文件设置<code>DocumentRoot</code>前，先检查是否已经关闭了虚拟主机，否则可能导致设置无效。</li>
<li>
<p>默认情况下<code>Wamp</code>服务器只能被本机访问，如果向被局域网的其他电脑访问需要修改配置</p>
<ul>
<li>在<code>httpd-vhosts.conf</code> 文件中查找 <code>Require local</code>
</li>
<li>将<code>Require local</code> 改成 <code>Require all granted</code>
</li>
</ul>
</li>
<li>检查网络是不是通的 <code>ping</code> 对方<code>IP</code>
</li>
<li>检查防火墙是否开启，如果开启将不能正常被访问</li>
<li>确保端口没有被其它程序占用</li>
<li>“<code>#</code>”表示注释</li>
<li>配置文件每一行不要增加多于的空格。否则服务器容易报错。</li>
<li>修改配置要格外小心，禁止无意修改其它内容</li>
</ul>
<h2 id="articleHeader14">3. HTTP传输协议</h2>
<blockquote>网络协议约定了网络计算机之间数据的传输的方式、数据的格式等。</blockquote>
<p><strong>常见的网络应用底层协议：</strong></p>
<ul>
<li>
<code>HTTP</code>、<code>HTTPS</code>超文本传输协议</li>
<li>
<code>FTP</code>文件传输协议</li>
<li>
<code>SMTP</code>简单邮件传输协议</li>
</ul>
<p><strong>HTTP协议：</strong></p>
<blockquote>
<code>HTTP</code>即超文本传输协议，网站是基于<code>HTTP</code>协议的，比如我们在开发网站中经常使用<code>css</code>、<code>js</code>、图片等等都是基于该协议传输的。</blockquote>
<p><strong>组成部分：</strong></p>
<p><code>HTTP</code>协议是对请求(<code>Request</code>)和响应(<code>Response</code>)的报文内容进行了约束和规范。</p>
<p><strong>请求：</strong> 客户机向服务器发送数据</p>
<p><strong>响应：</strong> 服务器向客户机发送数据</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013696306" src="https://static.alili.tech/img/remote/1460000013696306" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><em>发送并请求请求报文，接收响应报文，这种获取数据的方式我们称之为<code>HTTP</code>协议。</em></p>
<h3 id="articleHeader15">3.1 请求报文</h3>
<blockquote>请求是由客户端发起，其规范格式为：请求行、请求头、请求主体。</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013696307" src="https://static.alili.tech/img/remote/1460000013696307" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>1、请求行：</strong></p>
<blockquote>由请求方法、请求<code>URL</code>和<code>HTTP</code>协议及版本构成</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="GET /code/login.php?username=123&amp;password=123 HTTP/1.1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs http"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">GET</span> <span class="hljs-string">/code/login.php?username=123&amp;password=123</span> HTTP/1.1</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="POST /code/login.php HTTP/1.1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs http"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">POST</span> <span class="hljs-string">/code/login.php</span> HTTP/1.1</code></pre>
<p><strong>2、请求头：</strong></p>
<blockquote>这里设置的主要是一些信息，包含客户端，服务器。</blockquote>
<ul>
<li>
<code>User-Agent</code>：浏览器的具体类型,如：<code>User-Agent：Mozilla/5.0 (Windows NT 6.1; rv:17.0) Gecko/20100101 Firefox/17.0</code>
</li>
<li>
<code>Accept</code>：浏览器支持哪些数据类型,如：<code>Accept: text/html,application/xhtml+xml,application/xml;q=0.9;</code>
</li>
<li>
<code>Accept-Charset</code>：浏览器采用的是哪种编码,如：<code>Accept-Charset: ISO-8859-1</code>
</li>
<li>
<code>Accept-Encoding</code>：浏览器支持解码的数据压缩格式,如：<code>Accept-Encoding: gzip, deflate</code>
</li>
<li>
<code>Accept-Language</code>：浏览器的语言环境,如：<code>Accept-Language zh-cn,zh;q=0.8,en-us;q=0.5,en;q=0.3</code>
</li>
<li>
<code>Host</code>：请求的主机名，允许多个域名同处一个<code>IP</code>地址，即虚拟主机。<code>Host:www.baidu.com</code>
</li>
<li>
<code>Connection</code>：表示是否需要持久连接。<code>Keep-Alive/close</code>，<code>HTTP1.1</code>默认是持久连接，它可以利用持久连接的优点，当页面包含多个元素时（例如<code>Applet</code>，图片），显著地减少下载所需要的时间。要实现这一点，<code>Servlet</code>需要在应答中发送一个<code>Content-Length</code>头，最简单的实现方法是：先把内容写入<code>ByteArrayOutputStream</code>，然后在正式写出内容之前计算它的大小。如：<code>Connection: Keep-Alive</code>
</li>
<li>
<code>Content-Length</code>：表示请求消息正文的长度。对于POST请求来说Content-Length必须出现。</li>
<li>
<code>Content-Type</code>：WEB服务器告诉浏览器自己响应的对象的类型和字符集。例如：<code>Content-Type: text/html; charset='gb2312'</code>
</li>
<li>
<code>Content-Encoding</code>：<code>WEB</code>服务器表明自己使用了什么压缩方法（<code>gzip，deflate</code>）压缩响应中的对象。例如：<code>Content-Encoding：gzip</code>
</li>
<li>
<code>Content-Language</code>：<code>WEB</code>服务器告诉浏览器自己响应的对象的语言。</li>
<li>
<code>Cookie</code>：最常用的请求头，浏览器每次都会将<code>cookie</code>发送到服务器上，允许服务器在客户端存储少量数据。</li>
<li>
<code>Referer</code>：包含一个URL，用户从该<code>URL</code>代表的页面出发访问当前请求的页面。服务器能知道你是从哪个页面过来的。<code>Referer: http://www.baidu.com/</code>
</li>
</ul>
<p><strong>3、请求体：</strong></p>
<blockquote>这里是提交给服务器的数据</blockquote>
<p>需要注意的是,如果是往服务器提交数据,需要在请求头中设置<code>Content-Type:application/x-www-form-urlencoded</code>(在<code>ajax</code>中需要手动设置)；</p>
<h3 id="articleHeader16">3.2 响应报文</h3>
<blockquote>响应报文是服务器发回给客户端的。组成部分有状态行，响应头，响应主体。</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013696308" src="https://static.alili.tech/img/remote/1460000013696308" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>1、状态行：</strong></p>
<blockquote>由协议版本号、状态码和状态信息构成</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="HTTP/1.1 200 OK" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs http"><code style="word-break: break-word; white-space: initial;">HTTP/1.1 <span class="hljs-number">200</span> OK</code></pre>
<p><strong>常见的状态码：</strong></p>
<ul>
<li>
<p><code>1XX</code>：信息状态码</p>
<ul><li>
<code>100</code> <code>Continue</code> 继续，一般在发送<code>post</code>请求时，已发送了<code>http header</code>之后服务端将返回此信息，表示确认，之后发送具体参数信息</li></ul>
</li>
<li>
<p><code>2XX</code>：成功状态码</p>
<ul>
<li>
<code>200</code> <code>OK</code> 正常返回信息</li>
<li>
<code>201</code> <code>Created</code> 请求成功并且服务器创建了新的资源</li>
<li>
<code>202</code> <code>Accepted</code> 服务器已接受请求，但尚未处理</li>
</ul>
</li>
<li>
<p><code>3XX</code>：重定向</p>
<ul>
<li>
<code>301</code> <code>Moved Permanently </code>请求的网页已永久移动到新位置。</li>
<li>
<code>302</code> <code>Found </code>临时性重定向。</li>
<li>
<code>303</code> <code>See Other </code>临时性重定向，且总是使用 GET 请求新的 URI。</li>
<li>
<code>304</code> <code>Not Modified </code>自从上次请求后，请求的网页未修改过。</li>
</ul>
</li>
<li>
<p><code>4XX</code>：客户端错误</p>
<ul>
<li>
<code>400</code> <code>Bad Request</code> 服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发起请求。</li>
<li>
<code>401</code> <code>Unauthorized</code> 请求未授权。</li>
<li>
<code>403</code> <code>Forbidden</code> 禁止访问。</li>
<li>
<code>404</code> <code>Not Found</code> 找不到如何与 URI 相匹配的资源。</li>
</ul>
</li>
<li>
<p><code>5XX</code>: 服务器错误</p>
<ul>
<li>
<code>500</code> <code>Internal Server Error</code> 最常见的服务器端错误。</li>
<li>
<code>503</code> <code>Service Unavailable</code> 服务器端暂时无法处理请求（可能是过载或维护）。</li>
</ul>
</li>
</ul>
<p><strong>2、响应头:</strong></p>
<ul>
<li>
<code>Date</code>：响应时间</li>
<li>
<code>Server</code>：服务器信息</li>
<li>
<code>Last-Modified</code>：资源最后修改时间 由服务器自动生成</li>
<li>
<code>ETag</code>：资源修改后生成的唯一标识，由服务器自动生成</li>
<li>
<code>Content-Length</code>：响应主体长度</li>
<li>
<code>Content-Type</code>：响应资源的类型</li>
</ul>
<p><strong>3、响应主体:</strong></p>
<blockquote>即服务端返回给客户端的内容；</blockquote>
<h2 id="articleHeader17">4. Ajax 编程</h2>
<blockquote>
<code>Asynchronous Javascript And XML</code>（异步的<code>Javascript</code>和<code>XML</code>）。</blockquote>
<h3 id="articleHeader18">4.1 Ajax的基本概念</h3>
<p><strong>思考：</strong></p>
<p>我们访问一个普通网站时，当浏览器加载完<code>HTML</code>、<code>CSS</code>、<code>JS</code>以后，网站就固定了，如果网站内容发生改变，必须刷新网页后，才能看到更新内容。</p>
<p><strong>Ajax概念：</strong></p>
<p>在浏览器中，我们能够不刷新页面，通过<code>Ajax</code>的方式去获取一些新的内容。</p>
<ul>
<li>
<code>Ajax</code> 不是一门的新的语言，而是对现有技术的综合利用。</li>
<li>本质是在<code>HTTP</code>协议的基础上以异步的方式与服务器进行通信。</li>
<li>核心是通过浏览器端的<code>js</code>帮我们预定义的一个异步对象<code>XMLHttpRequest</code>来完成的</li>
</ul>
<p><code>AJAX</code>是一种用于创建快速动态网页的技术。通过在后台与服务器进行少量数据交换，<code>AJAX</code>可以使网页实现异步更新。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。</p>
<p><strong>优点：</strong></p>
<ul>
<li>页面无刷新，用户体验好；</li>
<li>异步通信，更加快的响应能力；</li>
<li>减少冗余请求，减轻了服务器负担；</li>
<li>基于标准化的并被广泛支持的技术，不需要下载插件或者小程序</li>
</ul>
<p><strong>缺点：</strong></p>
<ul>
<li>浏览器对<code>XMLHttpRequest</code>对象的支持度不足，存在兼容性；</li>
<li>
<code>Ajax</code>干掉了<code>back</code>按钮，即对浏览器后退机制的破坏；</li>
<li>对搜索引擎的支持比较弱；</li>
<li>存在一定的安全问题；</li>
<li>无法用<code>URL</code>直接访问；</li>
<li>开发调试工具的缺乏。</li>
</ul>
<p><strong>Ajax应用场景：</strong></p>
<ul>
<li>场景1 数据验证</li>
<li>场景2 按需取数据</li>
<li>场景3 自动更新页面</li>
</ul>
<p><strong>Ajax 包含以下五个部分：</strong></p>
<blockquote>
<code>Ajax</code>并非一种新的技术，而是几种原有技术的结合体。它由下列技术组合而成。</blockquote>
<ul>
<li>使用<code>CSS</code>和<code>XHTML</code>来表示。</li>
<li>使用<code>DOM</code>模型来交互和动态显示。</li>
<li>数据互换和操作技术，使用<code>XML</code>与<code>XSLT</code>
</li>
<li>使用<code>XMLHttpRequest</code>来和服务器进行异步通信。</li>
<li>使用<code>javascript</code>来绑定和调用。</li>
</ul>
<p><strong>传统Web应用程序与Ajax Web应用程序对比：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013696309" src="https://static.alili.tech/img/remote/1460000013696309" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><em>主要的差别，其实不是<code>JavaScript</code>，不是<code>HTML/XHTML</code>和<code>CSS</code>，而是采用了<code>XMLHttpRequest</code>来向服务器异步的请求<code>XML</code>数据。</em></p>
<p><strong>同步：</strong></p>
<ul><li>必须要等前面的任务完成，才能继续后面的任务，一定要按顺序执行。</li></ul>
<p><strong>异步：</strong></p>
<ul>
<li>指某段程序执行时不会阻塞其它程序执行，其表现形式为程序的执行顺序不依赖程序本身的书写顺序。</li>
<li>其优势在于不阻塞程序的执行，从而提升整体执行效率。</li>
<li>
<code>XMLHttpRequest</code>可以以异步方式的处理程序。</li>
</ul>
<h3 id="articleHeader19">4.2 创建Ajax</h3>
<blockquote>
<code>Ajax</code>的原理简单来说，就是通过<code>XMLHttpRequest</code>对象来向服务器发送异步请求，从服务器获得数据，然后用<code>javascript</code>来操作<code>DOM</code>而更新页面。其中最关键的一步就是从服务器获得请求数据。</blockquote>
<p><strong>1、创建XMLHttpRequest对象：</strong></p>
<blockquote>
<code>Ajax</code>的核心是<code>XMLHttpRequest</code>对象，它是<code>Ajax</code>实现的关键，发送异步请求、接受响应以及执行回调都是通过它来完成。</blockquote>
<p><strong>现代浏览器：</strong></p>
<blockquote>所有现代浏览器（<code>IE7+</code>、<code>Firefox</code>、<code>Chrome</code>、<code>Safari</code> 以及 <code>Opera</code>）均内建 <code>XMLHttpRequest</code> 对象。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr = new XMLHttpRequest();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();</code></pre>
<p><strong>老版本IE：</strong></p>
<blockquote>老版本的 <code>Internet Explorer </code>（IE5 和 IE6）使用 <code>ActiveX</code> 对象：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr = new ActiveXObject(&quot;Microsoft.XMLHTTP&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> ActiveXObject(<span class="hljs-string">"Microsoft.XMLHTTP"</span>);</code></pre>
<p>为了应对所有的现代浏览器，包括<code>IE5</code>和<code>IE6</code>，请检查浏览器是否支持<code>XMLHttpRequest</code>对象。如果支持，则创建 <code>XMLHttpRequest</code> 对象。如果不支持，则创建<code>ActiveXObject</code>：</p>
<p><strong>兼容性处理：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr = null;
if(window.XMLHttpRequest){
     //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
    xhr = new XMLHttpRequest();
}else{
    // IE6, IE5 浏览器执行代码
    xhr = new ActiveXObject(&quot;Microsoft.XMLHTTP&quot;);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> xhr = <span class="hljs-literal">null</span>;
<span class="hljs-keyword">if</span>(<span class="hljs-built_in">window</span>.XMLHttpRequest){
     <span class="hljs-comment">//  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码</span>
    xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
}<span class="hljs-keyword">else</span>{
    <span class="hljs-comment">// IE6, IE5 浏览器执行代码</span>
    xhr = <span class="hljs-keyword">new</span> ActiveXObject(<span class="hljs-string">"Microsoft.XMLHTTP"</span>);
}</code></pre>
<p><strong>XMLHttpRequest对象的属性和方法：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013696310" src="https://static.alili.tech/img/remote/1460000013696310" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>2、准备请求，设置请求的url等参数：</strong></p>
<blockquote>首先通过<code>open()</code>方法初始化<code>XMLHttpRequest</code>对象，接受三个参数：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 规定请求的类型、URL 以及是否异步处理请求。
xhr.open(method,url,async);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 规定请求的类型、URL 以及是否异步处理请求。</span>
xhr.open(method,url,<span class="hljs-keyword">async</span>);</code></pre>
<p><strong>method：</strong>  表示的是请求类型的字符串，可以是“<code>GET</code>”或者“<code>POST</code>”。</p>
<p>GET请求：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.open(&quot;GET&quot;,&quot;demo.php&quot;,true);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">xhr.open(<span class="hljs-string">"GET"</span>,<span class="hljs-string">"demo.php"</span>,<span class="hljs-literal">true</span>);</code></pre>
<p>POST请求：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.open(&quot;POST&quot;,&quot;demo.php&quot;,true);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">xhr.open(<span class="hljs-string">"POST"</span>,<span class="hljs-string">"demo.php"</span>,<span class="hljs-literal">true</span>);</code></pre>
<p><strong>url：</strong> 第二个参数是要作为请求发送目标的<code>URL</code>。</p>
<p><strong>async：</strong> 第三个参数是<code>true</code>或<code>false</code>，表示请求是以异步还是同步的模式发出。（默认为<code>true</code>，一般不建议为<code>false</code>）</p>
<ul>
<li>
<code>false</code>：同步模式发出的请求会暂停所有<code>javascript</code>代码的执行，直到服务器获得响应为止，如果浏览器在连接网络时或者在下载文件时出了故障，页面就会一直挂起。</li>
<li>
<code>true</code>：异步模式发出的请求，请求对象收发数据的同时，浏览器可以继续加载页面，执行其他<code>javascript</code>代码</li>
</ul>
<p><strong>3、发送请求：</strong></p>
<blockquote>通过<code>XMLHttpRequest</code>对象的<code>send()</code>方法，向服务器发送请求。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.send();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">xhr.send();</code></pre>
<p><strong>GET请求：</strong></p>
<blockquote>一般情况下，使用<code>Ajax</code>提交的参数多数是些简单的字符串，可以直接使用<code>GET</code>方法将要提交的参数写到<code>open</code>方法的<code>url</code>参数中，此时<code>send</code>方法的参数为<code>null</code>或为空。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// get请求是将数据拼接在url后面的
xhr.open(&quot;GET&quot;,demo.php?name=tsrot&amp;age=24,true);
xhr.send(null);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// get请求是将数据拼接在url后面的</span>
xhr.open(<span class="hljs-string">"GET"</span>,demo.php?name=tsrot&amp;age=<span class="hljs-number">24</span>,<span class="hljs-literal">true</span>);
xhr.send(<span class="hljs-literal">null</span>);</code></pre>
<p><strong>POST请求：</strong></p>
<blockquote>如果需要像<code>HTML</code>表单那样<code>POST</code>数据，请使用<code>setRequestHeader()</code>来添加<code>HTTP</code>头。然后在<code>send()</code>方法中规定你希望发送的数据：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// post请求需要加一个请求头，并且使用send方法将数据进行发送
xhr.open(&quot;POST&quot;,demo.php,true);
xhr.setRequestHeder(&quot;Content-Type&quot;,&quot;application/x-www-form-urlencoded;charset=UTF-8&quot;);
xhr.send(...);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// post请求需要加一个请求头，并且使用send方法将数据进行发送</span>
xhr.open(<span class="hljs-string">"POST"</span>,demo.php,<span class="hljs-literal">true</span>);
xhr.setRequestHeder(<span class="hljs-string">"Content-Type"</span>,<span class="hljs-string">"application/x-www-form-urlencoded;charset=UTF-8"</span>);
xhr.send(...);</code></pre>
<p><strong>4、处理响应：</strong></p>
<blockquote>当服务器收到浏览器发送的数据后，会响应一个内容，因为不知道什么时候数据响应回来，所以提供了一个事件方法<code>onreadystatechange</code>。每当<code>readyState</code>改变的时候就会触发<code>onreadystatechange</code>事件，<code>readyState</code>属性：存有<code>XMLHttpRequest</code>的状态信息。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.onreadystatechange = function(){
    // 为了保证数据完整回来，我们一般会判断两个值
     if (xhr.readyState == 4 &amp;&amp; xhr.status == 200) {
        console.log(xhr.responseText);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">// 为了保证数据完整回来，我们一般会判断两个值</span>
     <span class="hljs-keyword">if</span> (xhr.readyState == <span class="hljs-number">4</span> &amp;&amp; xhr.status == <span class="hljs-number">200</span>) {
        <span class="hljs-built_in">console</span>.log(xhr.responseText);
    }
}</code></pre>
<p><code>onreadystatechange</code>：当处理过程发生变化的时候执行里面的函数</p>
<p><code>readyState</code>：<code>ajax</code>处理过程</p>
<ul>
<li>
<code>0</code>：请求未初始化（还没有调用 <code>open()</code>）。</li>
<li>
<code>1</code>：请求已经建立，但是还没有发送（还没有调用 <code>send()</code>）。</li>
<li>
<code>2</code>：请求已发送，正在处理中（通常现在可以从响应中获取内容头）。</li>
<li>
<code>3</code>：请求在处理中；通常响应中已有部分数据可用了，但是服务器还没有完成响应的生成。</li>
<li>
<code>4</code>：响应已完成；您可以获取并使用服务器的响应了。</li>
</ul>
<p><code>status</code>状态码属性(详见上面状态码类型)：</p>
<ul>
<li>
<code>200</code>:”<code>OK</code>”</li>
<li>
<code>404</code>: 未找到页面</li>
</ul>
<p><code>responseText</code>：获得字符串形式的响应数据；</p>
<h3 id="articleHeader20">4.3 Ajax实现一个简单的聊天室</h3>
<p><strong>基本html结构：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<h3>简单的Ajax实例聊天室</h3>
<div class=&quot;chatbox&quot;>
    <!-- 聊天记录界面 -->
    <div class=&quot;messages&quot;></div>
    <!-- 输入界面 -->
    <div class=&quot;form&quot;>
        <div class=&quot;input&quot;><textarea></textarea></div>
        <div class=&quot;btn&quot;>
            <input type=&quot;button&quot; class=&quot;send&quot; value=&quot;发送&quot;>
            <input type=&quot;button&quot; class=&quot;clear&quot; value=&quot;清屏&quot;>
        </div>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>简单的Ajax实例聊天室<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"chatbox"</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 聊天记录界面 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"messages"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 输入界面 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"form"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"input"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">textarea</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">textarea</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"send"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"发送"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"clear"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"清屏"</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013696311?w=540&amp;h=560" src="https://static.alili.tech/img/remote/1460000013696311?w=540&amp;h=560" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>js部分：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 1-发送按钮注册点击事件
var send = document.querySelector(&quot;.send&quot;);
var clear = document.querySelector(&quot;.clear&quot;);
var messages = document.querySelector(&quot;.messages&quot;);
var textarea = document.querySelector(&quot;.input&quot;).children[0];
send.onclick = function() {
    // 1-获取输入的内容 动态创建一个p标签 添加到 messages中
    var p = document.createElement(&quot;p&quot;);
    var content = textarea.value;
    if (content != &quot;&quot; &amp;&amp; content.trim()) {
        p.innerText = content + &quot;：Levi&quot;;
        messages.appendChild(p);
        p.className = &quot;self&quot;;
        textarea.value = &quot;&quot;;
    }

    // 2-创建Ajax请求
    var xhr;
    if (window.XMLHttpRequest) {
        //  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码
        xhr = new XMLHttpRequest();
    } else {
        // IE6, IE5 浏览器执行代码
        xhr = new ActiveXObject(&quot;Microsoft.XMLHTTP&quot;);
    }

    xhr.open('post', 'chat.php', true);
    // post请求的时候，需要使用setRequestHeader()添加响应头
    xhr.setRequestHeader(&quot;Content-Type&quot;, &quot;application/x-www-form-urlencoded;charset=UTF-8&quot;);
    xhr.send(&quot;message=&quot; + content);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 &amp;&amp; xhr.status == 200) {
            var reply = xhr.responseText;
            var p = document.createElement(&quot;p&quot;);
            p.innerText = &quot;网友：&quot; + reply;
            p.className = &quot;other&quot;;
            messages.appendChild(p);
        }
    }

}

// 3-清屏按钮
clear.onclick = function() {
    messages.innerHTML = &quot;&quot;;
}

// 4-回车键触发发送按钮
textarea.onkeydown = function(e) {
    e = window.event || e;
    if (e.keyCode == 13) {
        send.onclick();
        e.preventDefault();
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 1-发送按钮注册点击事件</span>
<span class="hljs-keyword">var</span> send = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">".send"</span>);
<span class="hljs-keyword">var</span> clear = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">".clear"</span>);
<span class="hljs-keyword">var</span> messages = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">".messages"</span>);
<span class="hljs-keyword">var</span> textarea = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">".input"</span>).children[<span class="hljs-number">0</span>];
send.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 1-获取输入的内容 动态创建一个p标签 添加到 messages中</span>
    <span class="hljs-keyword">var</span> p = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"p"</span>);
    <span class="hljs-keyword">var</span> content = textarea.value;
    <span class="hljs-keyword">if</span> (content != <span class="hljs-string">""</span> &amp;&amp; content.trim()) {
        p.innerText = content + <span class="hljs-string">"：Levi"</span>;
        messages.appendChild(p);
        p.className = <span class="hljs-string">"self"</span>;
        textarea.value = <span class="hljs-string">""</span>;
    }

    <span class="hljs-comment">// 2-创建Ajax请求</span>
    <span class="hljs-keyword">var</span> xhr;
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.XMLHttpRequest) {
        <span class="hljs-comment">//  IE7+, Firefox, Chrome, Opera, Safari 浏览器执行代码</span>
        xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// IE6, IE5 浏览器执行代码</span>
        xhr = <span class="hljs-keyword">new</span> ActiveXObject(<span class="hljs-string">"Microsoft.XMLHTTP"</span>);
    }

    xhr.open(<span class="hljs-string">'post'</span>, <span class="hljs-string">'chat.php'</span>, <span class="hljs-literal">true</span>);
    <span class="hljs-comment">// post请求的时候，需要使用setRequestHeader()添加响应头</span>
    xhr.setRequestHeader(<span class="hljs-string">"Content-Type"</span>, <span class="hljs-string">"application/x-www-form-urlencoded;charset=UTF-8"</span>);
    xhr.send(<span class="hljs-string">"message="</span> + content);
    xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (xhr.readyState == <span class="hljs-number">4</span> &amp;&amp; xhr.status == <span class="hljs-number">200</span>) {
            <span class="hljs-keyword">var</span> reply = xhr.responseText;
            <span class="hljs-keyword">var</span> p = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"p"</span>);
            p.innerText = <span class="hljs-string">"网友："</span> + reply;
            p.className = <span class="hljs-string">"other"</span>;
            messages.appendChild(p);
        }
    }

}

<span class="hljs-comment">// 3-清屏按钮</span>
clear.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    messages.innerHTML = <span class="hljs-string">""</span>;
}

<span class="hljs-comment">// 4-回车键触发发送按钮</span>
textarea.onkeydown = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
    e = <span class="hljs-built_in">window</span>.event || e;
    <span class="hljs-keyword">if</span> (e.keyCode == <span class="hljs-number">13</span>) {
        send.onclick();
        e.preventDefault();
    }
}</code></pre>
<p><strong>PHP部分：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?php 
     header('Content-Type:text/html;charset=utf-8');

        /*创建 对话的队列 */
        $message = array(
            '你好呀!',
            '干嘛？',
            '我在睡觉。',
            '上课吧',
            '骗你的',
        );

        /*随机的取了一句话*/
        /*array_rand 去某个数组的随机索引*/
        echo $message[array_rand($message)];

        sleep(1);
?>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="php hljs"><code class="php"><span class="hljs-meta">&lt;?php</span> 
     header(<span class="hljs-string">'Content-Type:text/html;charset=utf-8'</span>);

        <span class="hljs-comment">/*创建 对话的队列 */</span>
        $message = <span class="hljs-keyword">array</span>(
            <span class="hljs-string">'你好呀!'</span>,
            <span class="hljs-string">'干嘛？'</span>,
            <span class="hljs-string">'我在睡觉。'</span>,
            <span class="hljs-string">'上课吧'</span>,
            <span class="hljs-string">'骗你的'</span>,
        );

        <span class="hljs-comment">/*随机的取了一句话*/</span>
        <span class="hljs-comment">/*array_rand 去某个数组的随机索引*/</span>
        <span class="hljs-keyword">echo</span> $message[array_rand($message)];

        sleep(<span class="hljs-number">1</span>);
<span class="hljs-meta">?&gt;</span></code></pre>
<p><em><code>PHP</code>部分我们可以不用深究，只需要知道请求的数据<code>message</code>，在<code>php</code>里其实就是一个随机字符串。</em></p>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013696312?w=391&amp;h=420" src="https://static.alili.tech/img/remote/1460000013696312?w=391&amp;h=420" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader21">4.4 复杂的数据格式介绍</h3>
<blockquote>在<code>HTTP</code>协议中，所有数据最终的传输格式全部都是字符串。如果想要在<code>HTTP</code>协议中传输一些复杂类型的数据，如数组、对象等，无法直接实现。</blockquote>
<p>后台只有一个，但是开发语言却有很多种，一种后台格式的数据，如何适应全部开发语言的需求呢？所以需要一个统一的数据格式来在各个语言之间传递数据。</p>
<h4>4.4.1 XML数据格式</h4>
<blockquote>
<code>XML</code>(<code>Extensible Markup Language</code>)，可扩展标记语言。它也是一个标记语言，所以它里面也是标签，并且也有文档声明。</blockquote>
<p><strong>XML文件的基本格式：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 1-声明文档 version：版本 encoding：编码 -->
<?xml version = &quot;1.0&quot; encoding=&quot;UTF-8&quot;?>

<!-- 2-xml必须要有根节点 root-->
<root>
    <!-- name age相对于对象 -->
    <name>Levi</name>
    <age>18</age>
</root>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="xml"><span class="hljs-comment">&lt;!-- 1-声明文档 version：版本 encoding：编码 --&gt;</span>
<span class="php"><span class="hljs-meta">&lt;?</span>xml version = <span class="hljs-string">"1.0"</span> encoding=<span class="hljs-string">"UTF-8"</span><span class="hljs-meta">?&gt;</span></span>

<span class="hljs-comment">&lt;!-- 2-xml必须要有根节点 root--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">root</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- name age相对于对象 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">name</span>&gt;</span>Levi<span class="hljs-tag">&lt;/<span class="hljs-name">name</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">age</span>&gt;</span>18<span class="hljs-tag">&lt;/<span class="hljs-name">age</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">root</span>&gt;</span></code></pre>
<p><strong>注意：</strong></p>
<ul>
<li>必须有一个根元素</li>
<li>不可以有空格、标签不可以以数字、下划线、或其他特殊符号开头，大小写敏感；</li>
<li>不可交叉嵌套；</li>
<li>特殊符号要使用实体；</li>
<li>注释和<code>HTML</code>一样</li>
</ul>
<p><em>虽然可以描述和传输复杂数据，但是其解析过于复杂并且体积较大，所以实际开发已经使用很少了。</em></p>
<p><strong>Ajax请求XML数据：</strong></p>
<p>首先，新建一个<code>XML</code>数据格式的文件-<code>data.xml</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?xml version = &quot;1.0&quot; encoding=&quot;UTF-8&quot;?>

<root>
    <name>Levi</name>
    <age>18</age>
</root>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="xml"><span class="php"><span class="hljs-meta">&lt;?</span>xml version = <span class="hljs-string">"1.0"</span> encoding=<span class="hljs-string">"UTF-8"</span><span class="hljs-meta">?&gt;</span></span>

<span class="hljs-tag">&lt;<span class="hljs-name">root</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">name</span>&gt;</span>Levi<span class="hljs-tag">&lt;/<span class="hljs-name">name</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">age</span>&gt;</span>18<span class="hljs-tag">&lt;/<span class="hljs-name">age</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">root</span>&gt;</span></code></pre>
<p>新建一个<code>PHP</code>文件-<code>xml.php</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?php
    // 设置数据解析格式为xml解析方式
    header(&quot;Content-Type:application/xml&quot;);
    
    // 将数据返回给前端
    $xml = file_get_contents(&quot;data.xml&quot;);
    echo $xml;
?>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="php hljs"><code class="php"><span class="hljs-meta">&lt;?php</span>
    <span class="hljs-comment">// 设置数据解析格式为xml解析方式</span>
    header(<span class="hljs-string">"Content-Type:application/xml"</span>);
    
    <span class="hljs-comment">// 将数据返回给前端</span>
    $xml = file_get_contents(<span class="hljs-string">"data.xml"</span>);
    <span class="hljs-keyword">echo</span> $xml;
<span class="hljs-meta">?&gt;</span></code></pre>
<p>在<code>html</code>里面通过<code>Ajax</code>获得数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr = new XMLHttpRequest();
xhr.open(&quot;get&quot;,&quot;xml.php&quot;);
xhr.send();
xhr.onreadystatechange = function(){
    if(xhr.readyState == 4 &amp;&amp; xhr.status ==200){
        console.log(xhr.responseXML); // 返回XML形式的响应数据
        // DOM里面的api在xml里面同样适用
        console.log(xhr.responseXML.getElementByTagName(&quot;name&quot;)[0].innerHTML);  // 打印 Levi
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
xhr.open(<span class="hljs-string">"get"</span>,<span class="hljs-string">"xml.php"</span>);
xhr.send();
xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">if</span>(xhr.readyState == <span class="hljs-number">4</span> &amp;&amp; xhr.status ==<span class="hljs-number">200</span>){
        <span class="hljs-built_in">console</span>.log(xhr.responseXML); <span class="hljs-comment">// 返回XML形式的响应数据</span>
        <span class="hljs-comment">// DOM里面的api在xml里面同样适用</span>
        <span class="hljs-built_in">console</span>.log(xhr.responseXML.getElementByTagName(<span class="hljs-string">"name"</span>)[<span class="hljs-number">0</span>].innerHTML);  <span class="hljs-comment">// 打印 Levi</span>
    }
}</code></pre>
<p><code>responseXML</code>：获得<code>XML</code>形式的响应数据。</p>
<p><em>在<code>Ajax</code>中获取到<code>XML</code>数据之后，需要通过<code>xhr.responseXML</code>这个属性来获取数据，获取数据的时候可以直接使用<code>DOM</code>提供的<code>API</code>。<code>responseText</code>也可以获取到数据，但是获取到的是字符串，无法通过<code>dom</code>`api`来操作。</em></p>
<h4>4.4.2 JSON数据格式</h4>
<blockquote>
<code>JSON</code>(<code>JavaScript Object Notation</code>)，是一种轻量级的数据交换格式，独立语言。</blockquote>
<p><code>json</code>有别于一般的对象，虽然<code>json</code>也是键值对的存在，但是<code>json</code>的键必须要加双引号，而一般的<code>js</code>对象可以不用加。</p>
<p><strong>json数据的基本格式：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data:[
    { &quot;name&quot;:&quot;zs&quot;, &quot;age&quot;:18, &quot;skill&quot;:&quot;吹牛&quot; },
                       ...
    { &quot;name&quot;:&quot;ww&quot;, &quot;age&quot;:28, &quot;skill&quot;:&quot;睡觉&quot; }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">data:[
    { <span class="hljs-string">"name"</span>:<span class="hljs-string">"zs"</span>, <span class="hljs-string">"age"</span>:<span class="hljs-number">18</span>, <span class="hljs-string">"skill"</span>:<span class="hljs-string">"吹牛"</span> },
                       ...
    { <span class="hljs-string">"name"</span>:<span class="hljs-string">"ww"</span>, <span class="hljs-string">"age"</span>:<span class="hljs-number">28</span>, <span class="hljs-string">"skill"</span>:<span class="hljs-string">"睡觉"</span> }
]</code></pre>
<p><strong>Ajax请求json数据：</strong></p>
<blockquote>前面我们知道了，前端在拿后台数据的时候，对后台数据处理提供了两个方法，一个是对字符串处理的<code>responseText</code>方法，还有一个是对<code>XML</code>格式处理的<code>responseXML</code>方法，但是唯独没有处理<code>json</code>数据的方法，所以我们需要借助于<code>json</code>内置对象的<code>JSON.parse</code>方法，将后台的返回的<code>json</code>字符串，转换成<code>json</code>对象。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="JSON.parse(xhr.responseText);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">JSON</span>.parse(xhr.responseText);</code></pre>
<p>新建一个<code>PHP</code>文件-<code>json.php</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?php
    // 设置数据解析格式为json格式
    header(&quot;Content-Type:application/json&quot;);
    
    $person = array('name' =>'Levi' ,'age'=>18,'skill'=>'帅' );
    
    // json_encode 将对象数据转换成json格式的数据返回前端
    echo json_encode($person);
?>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="php hljs"><code class="php"><span class="hljs-meta">&lt;?php</span>
    <span class="hljs-comment">// 设置数据解析格式为json格式</span>
    header(<span class="hljs-string">"Content-Type:application/json"</span>);
    
    $person = <span class="hljs-keyword">array</span>(<span class="hljs-string">'name'</span> =&gt;<span class="hljs-string">'Levi'</span> ,<span class="hljs-string">'age'</span>=&gt;<span class="hljs-number">18</span>,<span class="hljs-string">'skill'</span>=&gt;<span class="hljs-string">'帅'</span> );
    
    <span class="hljs-comment">// json_encode 将对象数据转换成json格式的数据返回前端</span>
    <span class="hljs-keyword">echo</span> json_encode($person);
<span class="hljs-meta">?&gt;</span></code></pre>
<p>在<code>html</code>里面通过<code>Ajax</code>获得数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var xhr = new XMLHttpRequest();
    xhr.open(&quot;get&quot;, &quot;01-json.php&quot;);
    xhr.send();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 &amp;&amp; xhr.status == 200) {
            // 前端拿后台数据的时候，只有两种方式 responseText和responseXML
            // 没有单独为json数据提供一个方法，所以需要将json字符串通过JSON.parse()方法，转换成对象jianrong
            var jsonStr = xhr.responseText;
            var jsonObj = JSON.parse(jsonStr);
            console.log(jsonObj);  // 打印的是一个对象
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"> <span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
    xhr.open(<span class="hljs-string">"get"</span>, <span class="hljs-string">"01-json.php"</span>);
    xhr.send();
    xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (xhr.readyState == <span class="hljs-number">4</span> &amp;&amp; xhr.status == <span class="hljs-number">200</span>) {
            <span class="hljs-comment">// 前端拿后台数据的时候，只有两种方式 responseText和responseXML</span>
            <span class="hljs-comment">// 没有单独为json数据提供一个方法，所以需要将json字符串通过JSON.parse()方法，转换成对象jianrong</span>
            <span class="hljs-keyword">var</span> jsonStr = xhr.responseText;
            <span class="hljs-keyword">var</span> jsonObj = <span class="hljs-built_in">JSON</span>.parse(jsonStr);
            <span class="hljs-built_in">console</span>.log(jsonObj);  <span class="hljs-comment">// 打印的是一个对象</span>
        }
    }</code></pre>
<p><strong>总结方法：</strong></p>
<p>将<code>json</code>字符串，转换成一个对象：<code>JSON.parse(jsonStr);</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 注意，json字符串里面的属性必须是双引号包裹，单引号包裹会报错
var jsonStr = '{&quot;name&quot;:&quot;Levi&quot;,&quot;age&quot;:18,&quot;skill&quot;:&quot;帅&quot;}';
var obj = JSON.parse(jsonStr);
console.log(obj); // 打印对象 {name: &quot;Levi&quot;, age: 18, skill: &quot;帅&quot;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 注意，json字符串里面的属性必须是双引号包裹，单引号包裹会报错</span>
<span class="hljs-keyword">var</span> jsonStr = <span class="hljs-string">'{"name":"Levi","age":18,"skill":"帅"}'</span>;
<span class="hljs-keyword">var</span> obj = <span class="hljs-built_in">JSON</span>.parse(jsonStr);
<span class="hljs-built_in">console</span>.log(obj); <span class="hljs-comment">// 打印对象 {name: "Levi", age: 18, skill: "帅"}</span></code></pre>
<p>将对象转换成<code>json</code>格式的字符串：<code>JSON.stringify;</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
    name: &quot;Levi&quot;,
    age: &quot;18&quot;,
    skill: &quot;帅&quot;
};
var jsonStr = JSON.stringify(obj);
console.log(jsonStr); //打印{&quot;name&quot;:&quot;Levi&quot;,&quot;age&quot;:&quot;18&quot;,&quot;skill&quot;:&quot;帅&quot;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">"Levi"</span>,
    <span class="hljs-attr">age</span>: <span class="hljs-string">"18"</span>,
    <span class="hljs-attr">skill</span>: <span class="hljs-string">"帅"</span>
};
<span class="hljs-keyword">var</span> jsonStr = <span class="hljs-built_in">JSON</span>.stringify(obj);
<span class="hljs-built_in">console</span>.log(jsonStr); <span class="hljs-comment">//打印{"name":"Levi","age":"18","skill":"帅"}</span></code></pre>
<h3 id="articleHeader22">4.5 Ajax代码的封装</h3>
<blockquote>一个页面中，肯定不只是一处需要<code>ajax</code>请求，所以我们可以将它封装成一个函数。</blockquote>
<p><code>Ajax</code>对象获取响应头属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.getAllResponseHeaders();   // 获取全部响应头信息 
xhr.getResponseHeader('key');  // 获取指定头信息 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">xhr.getAllResponseHeaders();   <span class="hljs-comment">// 获取全部响应头信息 </span>
xhr.getResponseHeader(<span class="hljs-string">'key'</span>);  <span class="hljs-comment">// 获取指定头信息 </span></code></pre>
<p><strong>代码封装：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 封装前需要考虑的因素
// 1- 请求的方式
    // get: 需要将数据拼接在url之后
    // post: 需要加一个请求头，并且使用send方法将数据进行发送
// 2- 请求的url地址
// 3- 需要发送的数据
// 4- 添加回调函数success，将请求到的数据返回给调用的函数
    // 判断服务器返回的是什么格式的数据（通过响应头）
        // a- xhr.getAllResponseHeaders();  获取全部响应头信息 
        // b- xhr.getResponseHeader('key'); 获取指定头信息 
function ajax(options) {
    // 默认值处理
    // 设置默认的请求方式为type
    options.type = options.type || &quot;get&quot;;
    // 设置默认的请求地址为当前地址栏地址
    options.url = options.url || location.href;
    // 设置默认的请求同步或者异步
    options.async = options.async || &quot;true&quot;;
    // 设置请求参数data的默认值
    options.data = options.data || {};
    // 处理用户传进来的请求参数（data）对象
    var dataArr = [];
    for (var k in options.data) {
        dataArr.push(k + &quot;=&quot; + options.data[k]);
    }
    var dataStr = dataArr.join(&quot;&amp;&quot;);

    // 异步请求对象兼容性处理
    var xhr;
    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else {
        // IE6及其以下版本   
        xhr = new ActiveXObjcet('Microsoft.XMLHTTP');
    };

    // 判断当前的请求方式，如果是get，将数据拼接在地址后面
    xhr.open(options.type, options.type == &quot;get&quot; ? options.url + &quot;?&quot; + dataStr : options.url, options.async);
    // 当是post请求的时候，需要设置请求头
    if (options.type == &quot;post&quot;) {
        xhr.setRequestHeader(&quot;Content-Type&quot;, &quot;application/x-www-form-urlencoded&quot;);
    }
    // 发送数据，当是post方式的时候，发送数据
    xhr.send(options.type == &quot;get&quot; ? null : dataStr);
    if (options.async) {
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 &amp;&amp; xhr.status == 200) {
                // 判断请求的数据是什么类型的
                var type = xhr.getResponseHeader(&quot;Content-Type&quot;);
                var result;
                if (type.indexOf(&quot;json&quot;) != -1) {
                    // 如果是json格式的数据，就将其转换成js对象
                    result = JSON.parse(xhr.responseText);
                } else if (type.indexOf(&quot;xml&quot;) != -1) {
                    // 如果是xml格式的数据，直接返回responseXML
                    result = xhr.responseXML;
                } else {
                    // 如果两种格式都不是，直接返回responseText
                    result = xhr.responseText;
                }
                // 将处理好的数据进行传递
                options.success(result);
            }
        }
    } else {
        // 如果是同步的话就不需要在监测状态改变的情况了
        var type = xhr.getResponseHeader(&quot;Content-Type&quot;);
        var result;
        if (type.indexOf(&quot;json&quot;) != -1) {
            result = JSON.parse(xhr.responseText);
        } else if (type.indexOf(&quot;xml&quot;) != -1) {
            result = xhr.responseXML;
        } else {
            result = xhr.responseText;
        }
        options.success(result);
    }
}

// 调用ajax请求
ajax({
    url: &quot;json.php&quot;,
    type: &quot;get&quot;,
    data: {name: &quot;levi&quot;,age: 18},
    success: function(data) {
        console.log(data);
    }
});
ajax({
    url: &quot;xml.php&quot;,
    type: &quot;get&quot;,
    data: {name: &quot;levi&quot;,age: 18},
    success: function(data) {
        console.log(data);
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 封装前需要考虑的因素</span>
<span class="hljs-comment">// 1- 请求的方式</span>
    <span class="hljs-comment">// get: 需要将数据拼接在url之后</span>
    <span class="hljs-comment">// post: 需要加一个请求头，并且使用send方法将数据进行发送</span>
<span class="hljs-comment">// 2- 请求的url地址</span>
<span class="hljs-comment">// 3- 需要发送的数据</span>
<span class="hljs-comment">// 4- 添加回调函数success，将请求到的数据返回给调用的函数</span>
    <span class="hljs-comment">// 判断服务器返回的是什么格式的数据（通过响应头）</span>
        <span class="hljs-comment">// a- xhr.getAllResponseHeaders();  获取全部响应头信息 </span>
        <span class="hljs-comment">// b- xhr.getResponseHeader('key'); 获取指定头信息 </span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ajax</span>(<span class="hljs-params">options</span>) </span>{
    <span class="hljs-comment">// 默认值处理</span>
    <span class="hljs-comment">// 设置默认的请求方式为type</span>
    options.type = options.type || <span class="hljs-string">"get"</span>;
    <span class="hljs-comment">// 设置默认的请求地址为当前地址栏地址</span>
    options.url = options.url || location.href;
    <span class="hljs-comment">// 设置默认的请求同步或者异步</span>
    options.async = options.async || <span class="hljs-string">"true"</span>;
    <span class="hljs-comment">// 设置请求参数data的默认值</span>
    options.data = options.data || {};
    <span class="hljs-comment">// 处理用户传进来的请求参数（data）对象</span>
    <span class="hljs-keyword">var</span> dataArr = [];
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> k <span class="hljs-keyword">in</span> options.data) {
        dataArr.push(k + <span class="hljs-string">"="</span> + options.data[k]);
    }
    <span class="hljs-keyword">var</span> dataStr = dataArr.join(<span class="hljs-string">"&amp;"</span>);

    <span class="hljs-comment">// 异步请求对象兼容性处理</span>
    <span class="hljs-keyword">var</span> xhr;
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.XMLHttpRequest) {
        xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// IE6及其以下版本   </span>
        xhr = <span class="hljs-keyword">new</span> ActiveXObjcet(<span class="hljs-string">'Microsoft.XMLHTTP'</span>);
    };

    <span class="hljs-comment">// 判断当前的请求方式，如果是get，将数据拼接在地址后面</span>
    xhr.open(options.type, options.type == <span class="hljs-string">"get"</span> ? options.url + <span class="hljs-string">"?"</span> + dataStr : options.url, options.async);
    <span class="hljs-comment">// 当是post请求的时候，需要设置请求头</span>
    <span class="hljs-keyword">if</span> (options.type == <span class="hljs-string">"post"</span>) {
        xhr.setRequestHeader(<span class="hljs-string">"Content-Type"</span>, <span class="hljs-string">"application/x-www-form-urlencoded"</span>);
    }
    <span class="hljs-comment">// 发送数据，当是post方式的时候，发送数据</span>
    xhr.send(options.type == <span class="hljs-string">"get"</span> ? <span class="hljs-literal">null</span> : dataStr);
    <span class="hljs-keyword">if</span> (options.async) {
        xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">if</span> (xhr.readyState == <span class="hljs-number">4</span> &amp;&amp; xhr.status == <span class="hljs-number">200</span>) {
                <span class="hljs-comment">// 判断请求的数据是什么类型的</span>
                <span class="hljs-keyword">var</span> type = xhr.getResponseHeader(<span class="hljs-string">"Content-Type"</span>);
                <span class="hljs-keyword">var</span> result;
                <span class="hljs-keyword">if</span> (type.indexOf(<span class="hljs-string">"json"</span>) != <span class="hljs-number">-1</span>) {
                    <span class="hljs-comment">// 如果是json格式的数据，就将其转换成js对象</span>
                    result = <span class="hljs-built_in">JSON</span>.parse(xhr.responseText);
                } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (type.indexOf(<span class="hljs-string">"xml"</span>) != <span class="hljs-number">-1</span>) {
                    <span class="hljs-comment">// 如果是xml格式的数据，直接返回responseXML</span>
                    result = xhr.responseXML;
                } <span class="hljs-keyword">else</span> {
                    <span class="hljs-comment">// 如果两种格式都不是，直接返回responseText</span>
                    result = xhr.responseText;
                }
                <span class="hljs-comment">// 将处理好的数据进行传递</span>
                options.success(result);
            }
        }
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// 如果是同步的话就不需要在监测状态改变的情况了</span>
        <span class="hljs-keyword">var</span> type = xhr.getResponseHeader(<span class="hljs-string">"Content-Type"</span>);
        <span class="hljs-keyword">var</span> result;
        <span class="hljs-keyword">if</span> (type.indexOf(<span class="hljs-string">"json"</span>) != <span class="hljs-number">-1</span>) {
            result = <span class="hljs-built_in">JSON</span>.parse(xhr.responseText);
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (type.indexOf(<span class="hljs-string">"xml"</span>) != <span class="hljs-number">-1</span>) {
            result = xhr.responseXML;
        } <span class="hljs-keyword">else</span> {
            result = xhr.responseText;
        }
        options.success(result);
    }
}

<span class="hljs-comment">// 调用ajax请求</span>
ajax({
    <span class="hljs-attr">url</span>: <span class="hljs-string">"json.php"</span>,
    <span class="hljs-attr">type</span>: <span class="hljs-string">"get"</span>,
    <span class="hljs-attr">data</span>: {<span class="hljs-attr">name</span>: <span class="hljs-string">"levi"</span>,<span class="hljs-attr">age</span>: <span class="hljs-number">18</span>},
    <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
        <span class="hljs-built_in">console</span>.log(data);
    }
});
ajax({
    <span class="hljs-attr">url</span>: <span class="hljs-string">"xml.php"</span>,
    <span class="hljs-attr">type</span>: <span class="hljs-string">"get"</span>,
    <span class="hljs-attr">data</span>: {<span class="hljs-attr">name</span>: <span class="hljs-string">"levi"</span>,<span class="hljs-attr">age</span>: <span class="hljs-number">18</span>},
    <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
        <span class="hljs-built_in">console</span>.log(data);
    }
});</code></pre>
<h2 id="articleHeader23">5. jQuery中的Ajax操作</h2>
<blockquote>前面的《<code>jQuery</code>入门详解》中已经讲到了如何通过<code>jQuery</code>操作<code>Ajax</code>，这里再为大家总结一遍。</blockquote>
<p><strong>1、$.ajax()方式常用参数解析：</strong></p>
<table>
<thead><tr>
<th>方法</th>
<th>作用</th>
</tr></thead>
<tbody>
<tr>
<td><code>url</code></td>
<td>请求的地址</td>
</tr>
<tr>
<td><code>type</code></td>
<td>请求的方式</td>
</tr>
<tr>
<td><code>dataType</code></td>
<td>告诉<code>jQuery</code>，需要按照什么格式对服务器返回的数据进行解析，默认<code>json</code>
</td>
</tr>
<tr>
<td><code>data</code></td>
<td>数据</td>
</tr>
<tr>
<td><code>success</code></td>
<td>请求成功的回调函数</td>
</tr>
<tr>
<td><code>error</code></td>
<td>请求失败的回调函数</td>
</tr>
<tr>
<td><code>beforeSend</code></td>
<td>请求发送之前调用的函数</td>
</tr>
<tr>
<td><code>complete</code></td>
<td>不论请求是成功还是失败的，只要请求完成就会调用</td>
</tr>
<tr>
<td><code>timeout</code></td>
<td>设置请求超时时间</td>
</tr>
</tbody>
</table>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.ajax({
    // 请求的地址
    url: &quot;04-data.php&quot;,
    // 请求的方式
    type: &quot;get&quot;,
    // 告诉jQuery，需要按照什么格式对服务器返回的数据进行解析，默认json
    dataType: &quot;json&quot;,
    // 数据
    data: {
        msg: &quot;我是来请求数据的&quot;
    },
    // 请求成功的回调函数
    success: function(data) {
        console.log(data);
    },
    // 请求失败的回调函数
    error: function() {
        console.log(&quot;失败了&quot;);
    },
    // 请求发送之前调用的函数
    beforeSend: function() {
        console.log(&quot;请求发送之前调用的函数&quot;);
        // 如果返回一个false，那么就会阻止整个请求的发送
        // return false;
        // 用法：可以用作表单验证，当表单内容符合规范的时候发送ajax请求，当不符合的时候就不发送ajax请求
    },
    // 不论请求是成功还是失败的，只要请求完成就会调用
    complete: function() {
        console.log(&quot;请求完成了&quot;);
    },
    // 设置请求超时时间(单位:ms)，超过这个时间后，就不会请求了
    timeout:2000
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$.ajax({
    <span class="hljs-comment">// 请求的地址</span>
    url: <span class="hljs-string">"04-data.php"</span>,
    <span class="hljs-comment">// 请求的方式</span>
    type: <span class="hljs-string">"get"</span>,
    <span class="hljs-comment">// 告诉jQuery，需要按照什么格式对服务器返回的数据进行解析，默认json</span>
    dataType: <span class="hljs-string">"json"</span>,
    <span class="hljs-comment">// 数据</span>
    data: {
        <span class="hljs-attr">msg</span>: <span class="hljs-string">"我是来请求数据的"</span>
    },
    <span class="hljs-comment">// 请求成功的回调函数</span>
    success: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
        <span class="hljs-built_in">console</span>.log(data);
    },
    <span class="hljs-comment">// 请求失败的回调函数</span>
    error: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"失败了"</span>);
    },
    <span class="hljs-comment">// 请求发送之前调用的函数</span>
    beforeSend: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"请求发送之前调用的函数"</span>);
        <span class="hljs-comment">// 如果返回一个false，那么就会阻止整个请求的发送</span>
        <span class="hljs-comment">// return false;</span>
        <span class="hljs-comment">// 用法：可以用作表单验证，当表单内容符合规范的时候发送ajax请求，当不符合的时候就不发送ajax请求</span>
    },
    <span class="hljs-comment">// 不论请求是成功还是失败的，只要请求完成就会调用</span>
    complete: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"请求完成了"</span>);
    },
    <span class="hljs-comment">// 设置请求超时时间(单位:ms)，超过这个时间后，就不会请求了</span>
    timeout:<span class="hljs-number">2000</span>
});</code></pre>
<p><strong>2、jQuery中的serialize方法：</strong></p>
<blockquote>
<code>serialize</code>方法会将表单中所有的内容拼接成<code>key=value&amp;key=value</code>这样的字符串。</blockquote>
<p>通过这种方式就不要再去手动获取表单中的内容的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<form id=&quot;form&quot;>
    <input type=&quot;text&quot; name=&quot;username&quot;>
    <input type=&quot;text&quot; name=&quot;pwd&quot;>
    <input type=&quot;text&quot; name=&quot;phonenumber&quot;>
    <input type=&quot;text&quot; name=&quot;email&quot;>

    <button id=&quot;btn&quot;>获取数据</button>
</form>

<script src=&quot;jquery.min.js&quot;></script>
<script>
    $(function() {
        $('#btn').click = function() {
            var dataStr = $('#form').serialize();
            $.ajax({
                url: &quot;json.php&quot;,
                //data这个参数可以接收对象，也可以接受 key=value&amp;key=value的这种字符串
                data: dataStr,
                type: &quot;post&quot;
            });
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"form"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"username"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"pwd"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"phonenumber"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"email"</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>获取数据<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        $(<span class="hljs-string">'#btn'</span>).click = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> dataStr = $(<span class="hljs-string">'#form'</span>).serialize();
            $.ajax({
                <span class="hljs-attr">url</span>: <span class="hljs-string">"json.php"</span>,
                <span class="hljs-comment">//data这个参数可以接收对象，也可以接受 key=value&amp;key=value的这种字符串</span>
                data: dataStr,
                <span class="hljs-attr">type</span>: <span class="hljs-string">"post"</span>
            });
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>3、jQuery中的serializeArray方法：</strong></p>
<blockquote>上面的方法我们可以看到，获取整个数据的时候，是很简单，但是想要进行校验的话就很难，因为上面的方法获取的是一个字符串，不能进行校验，所以此时我们需要另外一个方法，<code>jQuery</code>中的<code>serializeArray</code>方法。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<form id=&quot;form&quot;>
    <input type=&quot;text&quot; name=&quot;username&quot;>
    <input type=&quot;text&quot; name=&quot;pwd&quot;>
    <input type=&quot;text&quot; name=&quot;phonenumber&quot;>
    <input type=&quot;text&quot; name=&quot;email&quot;>

    <button id=&quot;btn&quot;>获取数据</button>
</form>

<script src=&quot;jquery.min.js&quot;></script>
<script>
    $(function() {
        $('#btn').click = function() {
            // 获取到的数组拼接成字符串
            var dataArr = $('#form').serializeArray();
            $.ajax({
                url: &quot;json.php&quot;,
                data: dataArr,
                type: &quot;post&quot;
            });
        }
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"form"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"username"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"pwd"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"phonenumber"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"email"</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>获取数据<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        $(<span class="hljs-string">'#btn'</span>).click = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 获取到的数组拼接成字符串</span>
            <span class="hljs-keyword">var</span> dataArr = $(<span class="hljs-string">'#form'</span>).serializeArray();
            $.ajax({
                <span class="hljs-attr">url</span>: <span class="hljs-string">"json.php"</span>,
                <span class="hljs-attr">data</span>: dataArr,
                <span class="hljs-attr">type</span>: <span class="hljs-string">"post"</span>
            });
        }
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>示例代码：ajax模拟表单校验及注册</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>sing in page</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            background-color: #F7F7F7;
        }
        
        ul {
            margin: 0;
            padding: 50px;
            list-style: none;
        }
        
        .register {
            width: 800px;
            margin: 50px auto;
            background-color: #FFF;
            border: 1px solid #CCC;
            border-radius: 5px;
        }
        
        li {
            display: flex;
            margin: 20px 0;
        }
        
        label,
        input {
            display: block;
            float: left;
            height: 46px;
            font-size: 24px;
            box-sizing: border-box;
            color: #333;
        }
        
        label {
            width: 200px;
            line-height: 46px;
            margin-right: 30px;
            text-align: right;
        }
        
        input {
            width: 320px;
            padding: 8px;
            line-height: 1;
            outline: none;
            position: relative;
        }
        
        input.code {
            width: 120px;
        }
        
        input.verify {
            width: 190px;
            margin-left: 10px;
        }
        
        input.disabled {
            background-color: #CCC !important;
        }
        
        input[type=button] {
            border: none;
            color: #FFF;
            background-color: #E64145;
            border-radius: 4px;
            cursor: pointer;
        }
        
        .error {
            color: red;
            margin-left: 10px;
            font-size: 12px;
            line-height: 46px;
        }
        
        .tips {
            position: fixed;
            top: 0;
            width: 100%;
            height: 40px;
            text-align: center;
        }
        
        .tips p {
            min-width: 300px;
            max-width: 400px;
            line-height: 40px;
            margin: 0 auto;
            color: #FFF;
            display: none;
            background-color: #C91623;
        }
    </style>
</head>

<body>
    <div class=&quot;register&quot;>
        <form id=&quot;ajaxForm&quot;>
            <ul>
                <li>
                    <label for=&quot;name&quot;>用户名</label>
                    <input type=&quot;text&quot; name=&quot;name&quot; class=&quot;name&quot; id=&quot;name&quot;>
                    <span class=&quot;error&quot;></span>
                </li>
                <li>
                    <label for=&quot;pass&quot;>请设置密码</label>
                    <input type=&quot;password&quot; name=&quot;pass&quot; class=&quot;pass&quot; id=&quot;pass&quot;>
                </li>
                <li>
                    <label for=&quot;repass&quot;>请确认密码</label>
                    <input type=&quot;password&quot; name=&quot;repass&quot; class=&quot;repass&quot; id=&quot;repass&quot;>
                </li>
                <li>
                    <label for=&quot;mobile&quot;>验证手机</label>
                    <input type=&quot;text&quot; name=&quot;mobile&quot; class=&quot;mobile&quot; id=&quot;mobile&quot;>
                </li>
                <li>
                    <label for=&quot;code&quot;>短信验证码</label>
                    <input type=&quot;text&quot; name=&quot;code&quot; class=&quot;code&quot; id=&quot;code&quot;>
                    <input type=&quot;button&quot; value=&quot;获取验证码&quot; class=&quot;verify&quot;>
                </li>
                <li>
                    <label for=&quot;submit&quot;></label>
                    <input type=&quot;button&quot; class=&quot;submit&quot; value=&quot;立即注册&quot; id=&quot;submit&quot;>
                </li>
            </ul>
        </form>
    </div>
    <div class=&quot;tips&quot;>
        <p>用户名不能为空</p>
    </div>

    <script src=&quot;../05-Form-Validation/js/jquery.min.js&quot;></script>
    <script>
        /*
         * 1.获取短信验证码
         * 1.1 当没有输入手机号的时候  提示请输入手机号
         * 1.2 手机号格式不正确        提示请输入正确的手机号
         * 1.3 调获取短信验证码接口
         * 1.4 显示正在发送中  不能再次发送（防止重复提交）
         * 1.5 当接口成功  按照后台的计时时间  进行倒计时
         * 1.6 当接口失败  提示短信接口繁忙 恢复按钮
         * 1.7 倒计时完成之后  恢复按钮
         * */

        /*
         * 2.注册
         * 2.1 当没有输入用户名的时候  提示请输入用户名
         * 2.2 调注册接口
         * 2.3 显示正在提交 不能再次发送（防止重复提交）
         * 2.4 当接口成功
         *     状态码 10000 成功
         *     状态码 10001 失败 提示用户  用户名已注册  表单后
         *     状态码 10002 失败 没输用户  请输入用户名
         *     恢复按钮
         * 2.5 当接口失败  恢复按钮
         * */
        $(function() {
            /* 警告显示提示 */
            var showTip = function(tip) {
                $(&quot;.tips p&quot;).html(tip).fadeIn(500).delay(1000).fadeOut(500);
            };

            /* 1.获取短信验证码 */
            $(&quot;.verify&quot;).on(&quot;click&quot;, function() {
                /* 当前按钮指定变量 */
                var $btn = $(this);
                /* 判断当前按钮是否有disabled属性，有的话说明已经被点击了，就不让再点击了 */
                if ($btn.hasClass('disabled')) {
                    return false;
                }

                /* 获取手机号 */
                var mobile = $.trim($('#mobile').val());
                /* 判断是否输入内容，没有的话提示信息 */
                if (!mobile) {
                    showTip('请输入手机号');
                    return false;
                }
                /* 判断手机格式 不正确的话提示信息 */
                var regPhone = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
                if (!regPhone.test(mobile)) {
                    showTip('请输入正确的手机号');
                    return false;
                }
                /* 调取短信验证码接口 */
                $.ajax({
                    url: 'registerCode.php',
                    type: 'post',
                    dataType: 'json',
                    data: {
                        mobile: mobile
                    },
                    success: function(data) {
                        if (data.code == 10000) {
                            /* 给发送成功的按钮添加一个倒计时 */
                            var time = parseInt(data.result.time);
                            var timer = setInterval(function() {
                                time--;
                                $btn.val(time + '秒后再次获取');
                                /* 倒计时完成之后  恢复按钮*/
                                if (time <= 0) {
                                    $btn.val('获取验证码').removeClass('disabled');
                                    clearInterval(timer);
                                }
                            }, 1000);
                        } else {
                            /* 逻辑上的失败 */
                            $btn.val('获取验证码').removeClass('disabled');
                        }
                    },
                    error: function() {
                        /* 当接口失败，提示短信接口繁忙 */
                        showTip('短信接口繁忙');
                        $btn.val('获取验证码').removeClass('disabled');
                    },
                    beforeSend: function() {
                        /* 点击之后，显示正在发送 */
                        $btn.val('正在发送...').addClass('disabled');
                    }
                });
                $btn.addClass('disabled');
            });
            /* 2.注册功能的实现 */
            $('.submit').on('click', function() {
                /* 当前点击的按钮 */
                var $btn = $(this);
                /* 正在请求当中 不能再次点击 */
                if ($btn.hasClass('disabled')) {
                    return false;
                }
                var username = $(&quot;#name&quot;).val().trim();
                var password = $(&quot;#pass&quot;).val().trim();
                var repeatPassword = $(&quot;#repass&quot;).val().trim();
                var code = $(&quot;#code&quot;).val().trim();
                var phoneNum = $(&quot;#mobile&quot;).val().trim();

                /* 调注册接口 */
                $.ajax({
                    type: 'post',
                    url: 'register.php',
                    data: {
                        name: username,
                        pass: password,
                        repass: repeatPassword,
                        code: code,
                        mobile: phoneNum
                    },
                    dataType: 'json',
                    // beforeSend: function() {
                    //     /* 显示正在提交 不能再次发送（防止重复提交）*/
                    //     $btn.val('正在提交...').addClass('disabled');
                    // },
                    success: function(data) {
                        /* 当接口成功 */
                        /* 状态码 10000 成功 */
                        if (data.code == 10000) {
                            /* 提示+跳转登录页 */
                            showTip('恭喜' + data.result.name + '注册成功,3后秒自动前往登录页');
                            setTimeout(function() {
                                location.href = 'http://www.baidu.com/';
                            }, 3000);
                        } else if (data.code == 10001) {
                            /* 输入框提示 */
                            $('.error').html('用户名已注册');
                            /* 恢复按钮 */
                            $btn.val('立即注册').removeClass('disabled');
                        } else if (data.code == 10002) {
                            showTip('请输入用户名');
                            /* 恢复按钮 */
                            $btn.val('立即注册').removeClass('disabled');
                        }
                    },
                    error: function() {
                        showTip('系统繁忙！');
                        $btn.val('立即注册').removeClass('disabled');
                    }
                })
            });
        });
    </script>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>sing in page<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">body</span> {
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#F7F7F7</span>;
        }
        
        <span class="hljs-selector-tag">ul</span> {
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">50px</span>;
            <span class="hljs-attribute">list-style</span>: none;
        }
        
        <span class="hljs-selector-class">.register</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">800px</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">50px</span> auto;
            <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#FFF</span>;
            <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#CCC</span>;
            <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">5px</span>;
        }
        
        <span class="hljs-selector-tag">li</span> {
            <span class="hljs-attribute">display</span>: flex;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span> <span class="hljs-number">0</span>;
        }
        
        <span class="hljs-selector-tag">label</span>,
        <span class="hljs-selector-tag">input</span> {
            <span class="hljs-attribute">display</span>: block;
            <span class="hljs-attribute">float</span>: left;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">46px</span>;
            <span class="hljs-attribute">font-size</span>: <span class="hljs-number">24px</span>;
            <span class="hljs-attribute">box-sizing</span>: border-box;
            <span class="hljs-attribute">color</span>: <span class="hljs-number">#333</span>;
        }
        
        <span class="hljs-selector-tag">label</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
            <span class="hljs-attribute">line-height</span>: <span class="hljs-number">46px</span>;
            <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">30px</span>;
            <span class="hljs-attribute">text-align</span>: right;
        }
        
        <span class="hljs-selector-tag">input</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">320px</span>;
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">8px</span>;
            <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1</span>;
            <span class="hljs-attribute">outline</span>: none;
            <span class="hljs-attribute">position</span>: relative;
        }
        
        <span class="hljs-selector-tag">input</span><span class="hljs-selector-class">.code</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">120px</span>;
        }
        
        <span class="hljs-selector-tag">input</span><span class="hljs-selector-class">.verify</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">190px</span>;
            <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">10px</span>;
        }
        
        <span class="hljs-selector-tag">input</span><span class="hljs-selector-class">.disabled</span> {
            <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#CCC</span> <span class="hljs-meta">!important</span>;
        }
        
        <span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type=button]</span> {
            <span class="hljs-attribute">border</span>: none;
            <span class="hljs-attribute">color</span>: <span class="hljs-number">#FFF</span>;
            <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#E64145</span>;
            <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4px</span>;
            <span class="hljs-attribute">cursor</span>: pointer;
        }
        
        <span class="hljs-selector-class">.error</span> {
            <span class="hljs-attribute">color</span>: red;
            <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">10px</span>;
            <span class="hljs-attribute">font-size</span>: <span class="hljs-number">12px</span>;
            <span class="hljs-attribute">line-height</span>: <span class="hljs-number">46px</span>;
        }
        
        <span class="hljs-selector-class">.tips</span> {
            <span class="hljs-attribute">position</span>: fixed;
            <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
            <span class="hljs-attribute">text-align</span>: center;
        }
        
        <span class="hljs-selector-class">.tips</span> <span class="hljs-selector-tag">p</span> {
            <span class="hljs-attribute">min-width</span>: <span class="hljs-number">300px</span>;
            <span class="hljs-attribute">max-width</span>: <span class="hljs-number">400px</span>;
            <span class="hljs-attribute">line-height</span>: <span class="hljs-number">40px</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
            <span class="hljs-attribute">color</span>: <span class="hljs-number">#FFF</span>;
            <span class="hljs-attribute">display</span>: none;
            <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#C91623</span>;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"register"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"ajaxForm"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"name"</span>&gt;</span>用户名<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"name"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"name"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"name"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"error"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"pass"</span>&gt;</span>请设置密码<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"password"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"pass"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"pass"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"pass"</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"repass"</span>&gt;</span>请确认密码<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"password"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"repass"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"repass"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"repass"</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"mobile"</span>&gt;</span>验证手机<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"mobile"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mobile"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"mobile"</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"code"</span>&gt;</span>短信验证码<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"code"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"code"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"code"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"获取验证码"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"verify"</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"submit"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"submit"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"立即注册"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"submit"</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"tips"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>用户名不能为空<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"../05-Form-Validation/js/jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-comment">/*
         * 1.获取短信验证码
         * 1.1 当没有输入手机号的时候  提示请输入手机号
         * 1.2 手机号格式不正确        提示请输入正确的手机号
         * 1.3 调获取短信验证码接口
         * 1.4 显示正在发送中  不能再次发送（防止重复提交）
         * 1.5 当接口成功  按照后台的计时时间  进行倒计时
         * 1.6 当接口失败  提示短信接口繁忙 恢复按钮
         * 1.7 倒计时完成之后  恢复按钮
         * */</span>

        <span class="hljs-comment">/*
         * 2.注册
         * 2.1 当没有输入用户名的时候  提示请输入用户名
         * 2.2 调注册接口
         * 2.3 显示正在提交 不能再次发送（防止重复提交）
         * 2.4 当接口成功
         *     状态码 10000 成功
         *     状态码 10001 失败 提示用户  用户名已注册  表单后
         *     状态码 10002 失败 没输用户  请输入用户名
         *     恢复按钮
         * 2.5 当接口失败  恢复按钮
         * */</span>
        $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">/* 警告显示提示 */</span>
            <span class="hljs-keyword">var</span> showTip = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">tip</span>) </span>{
                $(<span class="hljs-string">".tips p"</span>).html(tip).fadeIn(<span class="hljs-number">500</span>).delay(<span class="hljs-number">1000</span>).fadeOut(<span class="hljs-number">500</span>);
            };

            <span class="hljs-comment">/* 1.获取短信验证码 */</span>
            $(<span class="hljs-string">".verify"</span>).on(<span class="hljs-string">"click"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-comment">/* 当前按钮指定变量 */</span>
                <span class="hljs-keyword">var</span> $btn = $(<span class="hljs-keyword">this</span>);
                <span class="hljs-comment">/* 判断当前按钮是否有disabled属性，有的话说明已经被点击了，就不让再点击了 */</span>
                <span class="hljs-keyword">if</span> ($btn.hasClass(<span class="hljs-string">'disabled'</span>)) {
                    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
                }

                <span class="hljs-comment">/* 获取手机号 */</span>
                <span class="hljs-keyword">var</span> mobile = $.trim($(<span class="hljs-string">'#mobile'</span>).val());
                <span class="hljs-comment">/* 判断是否输入内容，没有的话提示信息 */</span>
                <span class="hljs-keyword">if</span> (!mobile) {
                    showTip(<span class="hljs-string">'请输入手机号'</span>);
                    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
                }
                <span class="hljs-comment">/* 判断手机格式 不正确的话提示信息 */</span>
                <span class="hljs-keyword">var</span> regPhone = <span class="hljs-regexp">/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/</span>;
                <span class="hljs-keyword">if</span> (!regPhone.test(mobile)) {
                    showTip(<span class="hljs-string">'请输入正确的手机号'</span>);
                    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
                }
                <span class="hljs-comment">/* 调取短信验证码接口 */</span>
                $.ajax({
                    <span class="hljs-attr">url</span>: <span class="hljs-string">'registerCode.php'</span>,
                    <span class="hljs-attr">type</span>: <span class="hljs-string">'post'</span>,
                    <span class="hljs-attr">dataType</span>: <span class="hljs-string">'json'</span>,
                    <span class="hljs-attr">data</span>: {
                        <span class="hljs-attr">mobile</span>: mobile
                    },
                    <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
                        <span class="hljs-keyword">if</span> (data.code == <span class="hljs-number">10000</span>) {
                            <span class="hljs-comment">/* 给发送成功的按钮添加一个倒计时 */</span>
                            <span class="hljs-keyword">var</span> time = <span class="hljs-built_in">parseInt</span>(data.result.time);
                            <span class="hljs-keyword">var</span> timer = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                                time--;
                                $btn.val(time + <span class="hljs-string">'秒后再次获取'</span>);
                                <span class="hljs-comment">/* 倒计时完成之后  恢复按钮*/</span>
                                <span class="hljs-keyword">if</span> (time &lt;= <span class="hljs-number">0</span>) {
                                    $btn.val(<span class="hljs-string">'获取验证码'</span>).removeClass(<span class="hljs-string">'disabled'</span>);
                                    clearInterval(timer);
                                }
                            }, <span class="hljs-number">1000</span>);
                        } <span class="hljs-keyword">else</span> {
                            <span class="hljs-comment">/* 逻辑上的失败 */</span>
                            $btn.val(<span class="hljs-string">'获取验证码'</span>).removeClass(<span class="hljs-string">'disabled'</span>);
                        }
                    },
                    <span class="hljs-attr">error</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                        <span class="hljs-comment">/* 当接口失败，提示短信接口繁忙 */</span>
                        showTip(<span class="hljs-string">'短信接口繁忙'</span>);
                        $btn.val(<span class="hljs-string">'获取验证码'</span>).removeClass(<span class="hljs-string">'disabled'</span>);
                    },
                    <span class="hljs-attr">beforeSend</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                        <span class="hljs-comment">/* 点击之后，显示正在发送 */</span>
                        $btn.val(<span class="hljs-string">'正在发送...'</span>).addClass(<span class="hljs-string">'disabled'</span>);
                    }
                });
                $btn.addClass(<span class="hljs-string">'disabled'</span>);
            });
            <span class="hljs-comment">/* 2.注册功能的实现 */</span>
            $(<span class="hljs-string">'.submit'</span>).on(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-comment">/* 当前点击的按钮 */</span>
                <span class="hljs-keyword">var</span> $btn = $(<span class="hljs-keyword">this</span>);
                <span class="hljs-comment">/* 正在请求当中 不能再次点击 */</span>
                <span class="hljs-keyword">if</span> ($btn.hasClass(<span class="hljs-string">'disabled'</span>)) {
                    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
                }
                <span class="hljs-keyword">var</span> username = $(<span class="hljs-string">"#name"</span>).val().trim();
                <span class="hljs-keyword">var</span> password = $(<span class="hljs-string">"#pass"</span>).val().trim();
                <span class="hljs-keyword">var</span> repeatPassword = $(<span class="hljs-string">"#repass"</span>).val().trim();
                <span class="hljs-keyword">var</span> code = $(<span class="hljs-string">"#code"</span>).val().trim();
                <span class="hljs-keyword">var</span> phoneNum = $(<span class="hljs-string">"#mobile"</span>).val().trim();

                <span class="hljs-comment">/* 调注册接口 */</span>
                $.ajax({
                    <span class="hljs-attr">type</span>: <span class="hljs-string">'post'</span>,
                    <span class="hljs-attr">url</span>: <span class="hljs-string">'register.php'</span>,
                    <span class="hljs-attr">data</span>: {
                        <span class="hljs-attr">name</span>: username,
                        <span class="hljs-attr">pass</span>: password,
                        <span class="hljs-attr">repass</span>: repeatPassword,
                        <span class="hljs-attr">code</span>: code,
                        <span class="hljs-attr">mobile</span>: phoneNum
                    },
                    <span class="hljs-attr">dataType</span>: <span class="hljs-string">'json'</span>,
                    <span class="hljs-comment">// beforeSend: function() {</span>
                    <span class="hljs-comment">//     /* 显示正在提交 不能再次发送（防止重复提交）*/</span>
                    <span class="hljs-comment">//     $btn.val('正在提交...').addClass('disabled');</span>
                    <span class="hljs-comment">// },</span>
                    success: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
                        <span class="hljs-comment">/* 当接口成功 */</span>
                        <span class="hljs-comment">/* 状态码 10000 成功 */</span>
                        <span class="hljs-keyword">if</span> (data.code == <span class="hljs-number">10000</span>) {
                            <span class="hljs-comment">/* 提示+跳转登录页 */</span>
                            showTip(<span class="hljs-string">'恭喜'</span> + data.result.name + <span class="hljs-string">'注册成功,3后秒自动前往登录页'</span>);
                            setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                                location.href = <span class="hljs-string">'http://www.baidu.com/'</span>;
                            }, <span class="hljs-number">3000</span>);
                        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (data.code == <span class="hljs-number">10001</span>) {
                            <span class="hljs-comment">/* 输入框提示 */</span>
                            $(<span class="hljs-string">'.error'</span>).html(<span class="hljs-string">'用户名已注册'</span>);
                            <span class="hljs-comment">/* 恢复按钮 */</span>
                            $btn.val(<span class="hljs-string">'立即注册'</span>).removeClass(<span class="hljs-string">'disabled'</span>);
                        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (data.code == <span class="hljs-number">10002</span>) {
                            showTip(<span class="hljs-string">'请输入用户名'</span>);
                            <span class="hljs-comment">/* 恢复按钮 */</span>
                            $btn.val(<span class="hljs-string">'立即注册'</span>).removeClass(<span class="hljs-string">'disabled'</span>);
                        }
                    },
                    <span class="hljs-attr">error</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                        showTip(<span class="hljs-string">'系统繁忙！'</span>);
                        $btn.val(<span class="hljs-string">'立即注册'</span>).removeClass(<span class="hljs-string">'disabled'</span>);
                    }
                })
            });
        });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013677279?w=573&amp;h=381" src="https://static.alili.tech/img/remote/1460000013677279?w=573&amp;h=381" alt="image" title="image" style="cursor: pointer;"></span></p>
<h2 id="articleHeader24">6. 模板引擎的使用</h2>
<blockquote>模板引擎，就是将一段已经写好模板，使用数据进行填充之后生成<code>html</code>。</blockquote>
<h3 id="articleHeader25">6.1 模板引擎的使用步骤</h3>
<p><strong>1、引入模板引擎插件：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;template-web.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"template-web.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>2、创建<code>script</code>标签，注意类型是<code>type="text/template"</code>，并且要有一个<code>id</code>，模板内部是需要渲染的内容：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/template&quot; id=&quot;tpl&quot;>
    <div>我叫  </div>
    <div>我今年  岁</div>
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/template"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"tpl"</span>&gt;</span><span class="handlebars"><span class="xml">
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>我叫  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>我今年  岁<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>3、调用<code>template</code>方法，将数据渲染到模板内：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
    name:&quot;Levi&quot;,
    age:18
}

// template(&quot;模板的id&quot;,要将什么数据渲染到模板中)
var html = template(&quot;tpl&quot;,obj);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">name</span>:<span class="hljs-string">"Levi"</span>,
    <span class="hljs-attr">age</span>:<span class="hljs-number">18</span>
}

<span class="hljs-comment">// template("模板的id",要将什么数据渲染到模板中)</span>
<span class="hljs-keyword">var</span> html = template(<span class="hljs-string">"tpl"</span>,obj);</code></pre>
<p><strong>4、回到上面的模板部分,在里面添加占位符：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/template&quot; id=&quot;tpl&quot;>
    // "{{""}}" ==> 就是占位符
    // name 和 age 对应的就是对象obj里面的两个属性
    <div>我叫"{{"name"}}"</div>
    <div>我今年"{{"age"}}"岁</div>
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/template"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"tpl"</span>&gt;</span><span class="handlebars"><span class="xml">
    // </span><span class="hljs-template-variable">"{{""}}"</span><span class="xml"> ==&gt; 就是占位符
    // name 和 age 对应的就是对象obj里面的两个属性
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>我叫</span><span class="hljs-template-variable">"{{"name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>我今年</span><span class="hljs-template-variable">"{{"age"}}"</span><span class="xml">岁<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>5、打印调用的字符串：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var html = template(&quot;tpl&quot;,obj);
console.log(html);  // 打印的就是div字符串 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> html = template(<span class="hljs-string">"tpl"</span>,obj);
<span class="hljs-built_in">console</span>.log(html);  <span class="hljs-comment">// 打印的就是div字符串 </span></code></pre>
<h3 id="articleHeader26">6.2 模板引擎的其他用法</h3>
<p><strong>1、$data：</strong></p>
<blockquote>模板一级特殊变量可以使用<code>$data</code>，指的就是获取的数据；</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 可以通过$data拿到 template函数传进来的数据 -->
"{{"$data[&quot;name&quot;]"}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 可以通过$data拿到 template函数传进来的数据 --&gt;</span>
"{{"$data["name"]"}}"</code></pre>
<p><strong>2、条件语句：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=""{{"if value"}}"..."{{"/if"}}"
"{{"if value1"}}"..."{{"else if value2"}}"..."{{"/if"}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">"{{"if value"}}"..."{{"/if"}}"
"{{"if value1"}}"..."{{"else if value2"}}"..."{{"/if"}}"</code></pre>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 注意结束必须要有"{{"/if结尾"}}" -->
"{{"if age >= 18"}}"
    <div>我成年了</div>
"{{"else"}}"
    <div>我没有成年了</div>
"{{"/if"}}"  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 注意结束必须要有"{{"/if结尾"}}" --&gt;</span>
"{{"if age &gt;= 18"}}"
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>我成年了<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
"{{"else"}}"
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>我没有成年了<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
"{{"/if"}}"  </code></pre>
<p><strong>3、循环语句：</strong></p>
<blockquote>
<code>$index</code>指的是获取当前遍历的索引值；<code>$value</code>指的是获取当前遍历的元素。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=""{{"each target"}}"
    "{{"$index"}}" "{{"$value"}}"
"{{"/each"}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">"{{"each target"}}"
    "{{"$index"}}" "{{"$value"}}"
"{{"/each"}}"</code></pre>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/template&quot; id=&quot;tpl&quot;>
    "{{"each idol"}}"
        <!--$index 获取当前遍历的索引-->
        <!--$value 获取当前正在遍历的元素-->
        <div>第"{{"$index"}}"号偶像："{{"$value.name"}}"</div>
    "{{"/each"}}"
</script>

<script>
    var obj = {
        name: &quot;Levi&quot;,
        age: 18,
        idol:[
            {name : &quot;刘德华&quot;},
            {name : &quot;张学友&quot;},
            {name : &quot;古天乐&quot;}
        ]
    }
    var html = template(&quot;tpl&quot;, obj);
    // 引入jQuery
    $('body').append(html);
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/template"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"tpl"</span>&gt;</span><span class="handlebars"><span class="xml">
    </span><span class="hljs-template-variable">"{{"<span class="hljs-builtin-name">each</span> idol"}}"</span><span class="xml">
        <span class="hljs-comment">&lt;!--$index 获取当前遍历的索引--&gt;</span>
        <span class="hljs-comment">&lt;!--$value 获取当前正在遍历的元素--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>第</span><span class="hljs-template-variable">"{{"$index"}}"</span><span class="xml">号偶像：</span><span class="hljs-template-variable">"{{"$value.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    </span><span class="hljs-template-tag">"{{"/<span class="hljs-name"><span class="hljs-builtin-name">each</span></span>"}}"</span><span class="xml">
</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> obj = {
        <span class="hljs-attr">name</span>: <span class="hljs-string">"Levi"</span>,
        <span class="hljs-attr">age</span>: <span class="hljs-number">18</span>,
        <span class="hljs-attr">idol</span>:[
            {<span class="hljs-attr">name</span> : <span class="hljs-string">"刘德华"</span>},
            {<span class="hljs-attr">name</span> : <span class="hljs-string">"张学友"</span>},
            {<span class="hljs-attr">name</span> : <span class="hljs-string">"古天乐"</span>}
        ]
    }
    <span class="hljs-keyword">var</span> html = template(<span class="hljs-string">"tpl"</span>, obj);
    <span class="hljs-comment">// 引入jQuery</span>
    $(<span class="hljs-string">'body'</span>).append(html);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>效果图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013696313?w=162&amp;h=83" src="https://static.alili.tech/img/remote/1460000013696313?w=162&amp;h=83" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>注意：这里介绍一个语法<code>as v i</code>，可以手动指定<code>$index</code>和<code>$value</code>的量</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/template&quot; id=&quot;tpl&quot;>
    "{{"each idol as v i"}}"
        <!--i 获取当前遍历的索引-->
        <!--v 获取当前正在遍历的元素-->
        <div>第"{{"i"}}"号偶像："{{"v.name"}}"</div>
    "{{"/each"}}"
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/template"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"tpl"</span>&gt;</span><span class="handlebars"><span class="xml">
    </span><span class="hljs-template-variable">"{{"<span class="hljs-builtin-name">each</span> idol as v i"}}"</span><span class="xml">
        <span class="hljs-comment">&lt;!--i 获取当前遍历的索引--&gt;</span>
        <span class="hljs-comment">&lt;!--v 获取当前正在遍历的元素--&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>第</span><span class="hljs-template-variable">"{{"i"}}"</span><span class="xml">号偶像：</span><span class="hljs-template-variable">"{{"v.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    </span><span class="hljs-template-tag">"{{"/<span class="hljs-name"><span class="hljs-builtin-name">each</span></span>"}}"</span><span class="xml">
</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>4、变量：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--可以在模板引擎中声明变量-->
"{{"set temp = data.content"}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!--可以在模板引擎中声明变量--&gt;</span>
"{{"set temp = data.content"}}"</code></pre>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/template&quot; id=&quot;tpl&quot;>
    <!-- 设置一个变量val 用来接收数据的name值 -->
    "{{"set val = name"}}"
    <!-- 打印的就是对象的name属性对应的值 -->
    "{{"val"}}"  
</script>

<script>
    var obj = {
        name: &quot;Levi&quot;,
        age: 18,
        idol:[
            {name : &quot;刘德华&quot;},
            {name : &quot;张学友&quot;},
            {name : &quot;古天乐&quot;}
        ]
    }
    var html = template(&quot;tpl&quot;, obj);
    // 引入jQuery
    $('body').append(html);
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/template"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"tpl"</span>&gt;</span><span class="handlebars"><span class="xml">
    <span class="hljs-comment">&lt;!-- 设置一个变量val 用来接收数据的name值 --&gt;</span>
    </span><span class="hljs-template-variable">"{{"set val = name"}}"</span><span class="xml">
    <span class="hljs-comment">&lt;!-- 打印的就是对象的name属性对应的值 --&gt;</span>
    </span><span class="hljs-template-variable">"{{"val"}}"</span><span class="xml">  
</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> obj = {
        <span class="hljs-attr">name</span>: <span class="hljs-string">"Levi"</span>,
        <span class="hljs-attr">age</span>: <span class="hljs-number">18</span>,
        <span class="hljs-attr">idol</span>:[
            {<span class="hljs-attr">name</span> : <span class="hljs-string">"刘德华"</span>},
            {<span class="hljs-attr">name</span> : <span class="hljs-string">"张学友"</span>},
            {<span class="hljs-attr">name</span> : <span class="hljs-string">"古天乐"</span>}
        ]
    }
    <span class="hljs-keyword">var</span> html = template(<span class="hljs-string">"tpl"</span>, obj);
    <span class="hljs-comment">// 引入jQuery</span>
    $(<span class="hljs-string">'body'</span>).append(html);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>5、标签“@”的用法：</strong></p>
<blockquote>当一个标签在页面以字符串形式显示的时候，加上“<code>@</code>”后就会当成标签去解析。</blockquote>
<p>首先根据后台数据，动态创建一个信息表格：</p>
<p>前端渲染：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <button id=&quot;btn&quot;>获取数据生成表格</button>
<script type=&quot;text/template&quot; id=&quot;tpl&quot;>
    <table width=&quot;600&quot; border=&quot;1&quot;>
        <thead>
            <tr>
                <th>姓名</th>
                <th>年龄</th>
                <th>性别</th>
                <th>头像</th>
            </tr>
        </thead>
        <tbody>
            <!-- $data 是个一级变量，表示的就是返回的数据 -->
            "{{"each $data as v i"}}"
            <tr>
                <td>"{{"v.name"}}"</td>
                <td>"{{"v.age"}}"</td>
                <td>"{{"v.gender"}}"</td>
                <td>"{{"v.avatar"}}"</td>
            </tr>
            "{{"/each"}}"
        </tbody>
    </table>
</script>

<script src=&quot;template-web.js&quot;></script>
<script>
    $(function() {
        // 点击按钮，发送Ajax请求
        $(&quot;#btn&quot;).click(function() {
            $.ajax({
                url: &quot;tableData.php&quot;,
                type: &quot;get&quot;,
                success: function(data) {
                    var htmlStr = template(&quot;tpl&quot;, data);
                    $(&quot;body&quot;).append(htmlStr);
                }
            });
        });
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"> <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"btn"</span>&gt;</span>获取数据生成表格<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/template"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"tpl"</span>&gt;</span><span class="handlebars"><span class="xml">
    <span class="hljs-tag">&lt;<span class="hljs-name">table</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"600"</span> <span class="hljs-attr">border</span>=<span class="hljs-string">"1"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">thead</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>姓名<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>年龄<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>性别<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>头像<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">thead</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tbody</span>&gt;</span>
            <span class="hljs-comment">&lt;!-- $data 是个一级变量，表示的就是返回的数据 --&gt;</span>
            </span><span class="hljs-template-variable">"{{"<span class="hljs-builtin-name">each</span> $data as v i"}}"</span><span class="xml">
            <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span></span><span class="hljs-template-variable">"{{"v.name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span></span><span class="hljs-template-variable">"{{"v.age"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span></span><span class="hljs-template-variable">"{{"v.gender"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span></span><span class="hljs-template-variable">"{{"v.avatar"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
            </span><span class="hljs-template-tag">"{{"/<span class="hljs-name"><span class="hljs-builtin-name">each</span></span>"}}"</span><span class="xml">
        <span class="hljs-tag">&lt;/<span class="hljs-name">tbody</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>
</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"template-web.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 点击按钮，发送Ajax请求</span>
        $(<span class="hljs-string">"#btn"</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            $.ajax({
                <span class="hljs-attr">url</span>: <span class="hljs-string">"tableData.php"</span>,
                <span class="hljs-attr">type</span>: <span class="hljs-string">"get"</span>,
                <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
                    <span class="hljs-keyword">var</span> htmlStr = template(<span class="hljs-string">"tpl"</span>, data);
                    $(<span class="hljs-string">"body"</span>).append(htmlStr);
                }
            });
        });
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>后台数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?php 
    header(&quot;Content-Type:application/json;charset=utf-8&quot;);

    echo '[{&quot;name&quot;: &quot;小乔&quot;, &quot;age&quot;: 18, &quot;gender&quot;: &quot;male&quot;, &quot;avatar&quot;: &quot;<img src=\&quot;1.jpg\&quot; />&quot;}, {&quot;name&quot;: &quot;大乔&quot;, &quot;age&quot;: 18, &quot;gender&quot;: &quot;female&quot;, &quot;avatar&quot;: &quot;<img src=\&quot;1.jpg\&quot; />&quot;}, {&quot;name&quot;: &quot;甄姬&quot;, &quot;age&quot;: 18, &quot;gender&quot;: &quot;male&quot;, &quot;avatar&quot;: &quot;<img src=\&quot;1.jpg\&quot; />&quot;}]';
 ?>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="php hljs"><code class="php"><span class="hljs-meta">&lt;?php</span> 
    header(<span class="hljs-string">"Content-Type:application/json;charset=utf-8"</span>);

    <span class="hljs-keyword">echo</span> <span class="hljs-string">'[{"name": "小乔", "age": 18, "gender": "male", "avatar": "&lt;img src=\"1.jpg\" /&gt;"}, {"name": "大乔", "age": 18, "gender": "female", "avatar": "&lt;img src=\"1.jpg\" /&gt;"}, {"name": "甄姬", "age": 18, "gender": "male", "avatar": "&lt;img src=\"1.jpg\" /&gt;"}]'</span>;
 <span class="hljs-meta">?&gt;</span></code></pre>
<p>根据上面的代码，我们可以动态生成一个表格：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013696314?w=615&amp;h=147" src="https://static.alili.tech/img/remote/1460000013696314?w=615&amp;h=147" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><em>看到问题所在了，在后台请求回来的图片地址直接以字符串的形式渲染到页面上了。</em></p>
<p>解决办法：只需要在头像占位那一栏里面加一个<code>@</code>符号</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=""{{"each $data as v i"}}"
<tr>
    <td>"{{"v.name"}}"</td>
    <td>"{{"v.age"}}"</td>
    <td>"{{"v.gender"}}"</td>
    <td>"{{"@v.avatar"}}"</td>
</tr>
"{{"/each"}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">"{{"each $data as v i"}}"
<span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>"{{"v.name"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>"{{"v.age"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>"{{"v.gender"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span>"{{"@v.avatar"}}"<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
"{{"/each"}}"</code></pre>
<p>再看效果图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013696315?w=615&amp;h=271" src="https://static.alili.tech/img/remote/1460000013696315?w=615&amp;h=271" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><em>此时头像就可以显示了。</em></p>
<h3 id="articleHeader27">6.3 模板引擎原生语法</h3>
<p><strong>1、原生语法：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<%= name %>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">%=</span> <span class="hljs-attr">name</span> %&gt;</span></code></pre>
<p><strong>2、原生语法判断语句：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<%= if(age == 18){ %>
<div>我满18岁了</div>
<% } %>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">%=</span> <span class="hljs-attr">if</span>(<span class="hljs-attr">age</span> == <span class="hljs-string">18){</span> %&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>我满18岁了<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">%</span> } %&gt;</span></code></pre>
<p><strong>3、原生语法循环语句：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<% for(var i = 0; i < arr.length; i++){ %>
    <!-- 遍历数据数组arr，将它里面的name属性显现出来 -->
    <div><%= arr[i].name %></div>
<% } %>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">%</span> <span class="hljs-attr">for</span>(<span class="hljs-attr">var</span> <span class="hljs-attr">i</span> = <span class="hljs-string">0;</span> <span class="hljs-attr">i</span> &lt; <span class="hljs-attr">arr.length</span>; <span class="hljs-attr">i</span>++){ %&gt;</span>
    <span class="hljs-comment">&lt;!-- 遍历数据数组arr，将它里面的name属性显现出来 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">%=</span> <span class="hljs-attr">arr</span>[<span class="hljs-attr">i</span>]<span class="hljs-attr">.name</span> %&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">%</span> } %&gt;</span></code></pre>
<h3 id="articleHeader28">6.4 案例：Ajax模拟请求json数据案例</h3>
<p><strong><code>json</code>数据模拟后台数据：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    &quot;code&quot;: 200,
    &quot;msg&quot;: &quot;OK&quot;,
    &quot;result&quot;: [{
            &quot;tc_id&quot;: &quot;193&quot;,
            &quot;tc_name&quot;: &quot;一代天骄葫芦娃&quot;,
            &quot;tc_roster&quot;: &quot;攻城狮&quot;,
            &quot;tc_gender&quot;: &quot;1&quot;,
            &quot;tc_cellphone&quot;: &quot;&quot;,
            &quot;tc_email&quot;: &quot;&quot;,
            &quot;tc_status&quot;: &quot;0&quot;,
            &quot;tc_birthday&quot;: &quot;1970-01-01&quot;,
            &quot;tc_join_date&quot;: &quot;2017-06-15&quot;
        },
        {
            &quot;tc_id&quot;: &quot;194&quot;,
            &quot;tc_name&quot;: &quot;用爱感化司马ad&quot;,
            &quot;tc_roster&quot;: &quot;攻城狮&quot;,
            &quot;tc_gender&quot;: &quot;0&quot;,
            &quot;tc_cellphone&quot;: &quot;&quot;,
            &quot;tc_email&quot;: &quot;&quot;,
            &quot;tc_status&quot;: &quot;0&quot;,
            &quot;tc_birthday&quot;: &quot;1970-01-01&quot;,
            &quot;tc_join_date&quot;: &quot;1970-01-01&quot;
        }
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
    <span class="hljs-string">"code"</span>: <span class="hljs-number">200</span>,
    <span class="hljs-string">"msg"</span>: <span class="hljs-string">"OK"</span>,
    <span class="hljs-string">"result"</span>: [{
            <span class="hljs-string">"tc_id"</span>: <span class="hljs-string">"193"</span>,
            <span class="hljs-string">"tc_name"</span>: <span class="hljs-string">"一代天骄葫芦娃"</span>,
            <span class="hljs-string">"tc_roster"</span>: <span class="hljs-string">"攻城狮"</span>,
            <span class="hljs-string">"tc_gender"</span>: <span class="hljs-string">"1"</span>,
            <span class="hljs-string">"tc_cellphone"</span>: <span class="hljs-string">""</span>,
            <span class="hljs-string">"tc_email"</span>: <span class="hljs-string">""</span>,
            <span class="hljs-string">"tc_status"</span>: <span class="hljs-string">"0"</span>,
            <span class="hljs-string">"tc_birthday"</span>: <span class="hljs-string">"1970-01-01"</span>,
            <span class="hljs-string">"tc_join_date"</span>: <span class="hljs-string">"2017-06-15"</span>
        },
        {
            <span class="hljs-string">"tc_id"</span>: <span class="hljs-string">"194"</span>,
            <span class="hljs-string">"tc_name"</span>: <span class="hljs-string">"用爱感化司马ad"</span>,
            <span class="hljs-string">"tc_roster"</span>: <span class="hljs-string">"攻城狮"</span>,
            <span class="hljs-string">"tc_gender"</span>: <span class="hljs-string">"0"</span>,
            <span class="hljs-string">"tc_cellphone"</span>: <span class="hljs-string">""</span>,
            <span class="hljs-string">"tc_email"</span>: <span class="hljs-string">""</span>,
            <span class="hljs-string">"tc_status"</span>: <span class="hljs-string">"0"</span>,
            <span class="hljs-string">"tc_birthday"</span>: <span class="hljs-string">"1970-01-01"</span>,
            <span class="hljs-string">"tc_join_date"</span>: <span class="hljs-string">"1970-01-01"</span>
        }
    ]
}</code></pre>
<p><strong><code>html</code>页面<code>Ajax</code>请求部分：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 引入jQuery -->
<script src=&quot;jquery.min.js&quot;></script>
<!-- 引入模板引擎 -->
<script src=&quot;template-web.js&quot;></script>
<!-- 模板引擎渲染数据 -->
<script type=&quot;text/template&quot; id=&quot;tpl&quot;>
    <table>
        <thead>
            <tr>
                <th>序号</th>
                <th>昵称</th>
                <th>性别</th>
                <th>生日</th>
                <th>花名</th>
            </tr>
        </thead>
        <tbody>
            "{{"each $data.result as v i"}}"
            <tr>
                <!-- 序号从1开始，所以就是遍历的下标加1 -->
                <td>"{{"i + 1"}}"</td>
                <!-- 昵称 -->
                <td>"{{"v.tc_name"}}"</td>
                <!-- 后台数据返回的是数字字符串。判断下以男女显示 -->
                <td>"{{"if v.tc_gender == &quot;1&quot;"}}"男"{{"else"}}"女"{{"/if"}}"</td>
                <!-- 生日 -->
                <td>"{{"v.tc_birthday"}}"</td>
                <!-- 花名 -->
                <td>"{{"v.tc_roster"}}"</td>
            </tr>
            "{{"/each"}}"
        </tbody>
    </table>
</script>
<script>
    $(function() {
        $.ajax({
            url: &quot;teacher.json&quot;,
            type: &quot;get&quot;,
            success: function(data) {
                // 一般后台都会提供接口文档，可以知道数据的名字，也可以直接打印数据在控制台中查看
                console.log(data);
                // 当数据成功返回之后，将数据以表格的形式打印在页面当中
                if (data.code == 200) {
                    var htmlStr = template(&quot;tpl&quot;, data);
                    $('body').append(htmlStr);
                }
            }
        });
    });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 引入jQuery --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 引入模板引擎 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"template-web.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 模板引擎渲染数据 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/template"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"tpl"</span>&gt;</span><span class="handlebars"><span class="xml">
    <span class="hljs-tag">&lt;<span class="hljs-name">table</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">thead</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>序号<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>昵称<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>性别<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>生日<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">th</span>&gt;</span>花名<span class="hljs-tag">&lt;/<span class="hljs-name">th</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">thead</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">tbody</span>&gt;</span>
            </span><span class="hljs-template-variable">"{{"<span class="hljs-builtin-name">each</span> $data.result as v i"}}"</span><span class="xml">
            <span class="hljs-tag">&lt;<span class="hljs-name">tr</span>&gt;</span>
                <span class="hljs-comment">&lt;!-- 序号从1开始，所以就是遍历的下标加1 --&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span></span><span class="hljs-template-variable">"{{"i + 1"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-comment">&lt;!-- 昵称 --&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span></span><span class="hljs-template-variable">"{{"v.tc_name"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-comment">&lt;!-- 后台数据返回的是数字字符串。判断下以男女显示 --&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span></span><span class="hljs-template-variable">"{{"<span class="hljs-builtin-name">if</span> v.tc_gender == "1""}}"</span><span class="xml">男</span><span class="hljs-template-variable">"{{"<span class="hljs-builtin-name">else</span>"}}"</span><span class="xml">女</span><span class="hljs-template-tag">"{{"/<span class="hljs-name"><span class="hljs-builtin-name">if</span></span>"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-comment">&lt;!-- 生日 --&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span></span><span class="hljs-template-variable">"{{"v.tc_birthday"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
                <span class="hljs-comment">&lt;!-- 花名 --&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">td</span>&gt;</span></span><span class="hljs-template-variable">"{{"v.tc_roster"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">tr</span>&gt;</span>
            </span><span class="hljs-template-tag">"{{"/<span class="hljs-name"><span class="hljs-builtin-name">each</span></span>"}}"</span><span class="xml">
        <span class="hljs-tag">&lt;/<span class="hljs-name">tbody</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span>
</span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    $(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        $.ajax({
            <span class="hljs-attr">url</span>: <span class="hljs-string">"teacher.json"</span>,
            <span class="hljs-attr">type</span>: <span class="hljs-string">"get"</span>,
            <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
                <span class="hljs-comment">// 一般后台都会提供接口文档，可以知道数据的名字，也可以直接打印数据在控制台中查看</span>
                <span class="hljs-built_in">console</span>.log(data);
                <span class="hljs-comment">// 当数据成功返回之后，将数据以表格的形式打印在页面当中</span>
                <span class="hljs-keyword">if</span> (data.code == <span class="hljs-number">200</span>) {
                    <span class="hljs-keyword">var</span> htmlStr = template(<span class="hljs-string">"tpl"</span>, data);
                    $(<span class="hljs-string">'body'</span>).append(htmlStr);
                }
            }
        });
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013696316?w=671&amp;h=91" src="https://static.alili.tech/img/remote/1460000013696316?w=671&amp;h=91" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader29">6.5 案例：Ajax提供数据实现瀑布流</h3>
<blockquote>通过后台提供的图片信息，以及图片链接，动态的生成瀑布流。</blockquote>
<p><strong>首先需要后台提供的接口文档：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="接口地址：waterfull.php
请求方式：get
接口参数：page：当前是第几页 pageSize：当前页面需要显示数据的条数
返回类型：json
返回数据：{page: 2,items:[{path:&quot;./images/0011.jpg&quot;,text:&quot;文本信息&quot;}...]}  
          page：下一页的页码
          items：返回当前页的数据
                path：图片地址
                text：图片下方的文本" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code>接口地址：waterfull.php
请求方式：get
接口参数：<span class="hljs-built_in">page</span>：当前是第几页 pageSize：当前页面需要显示数据的条数
返回类型：json
返回数据：{<span class="hljs-built_in">page</span>: <span class="hljs-number">2</span>,items:[{<span class="hljs-built_in">path</span>:<span class="hljs-string">"./images/0011.jpg"</span>,<span class="hljs-keyword">text</span>:<span class="hljs-string">"文本信息"</span>}...]}  
          <span class="hljs-built_in">page</span>：下一页的页码
          items：返回当前页的数据
                <span class="hljs-built_in">path</span>：图片地址
                <span class="hljs-keyword">text</span>：图片下方的文本</code></pre>
<p><strong>后台程序以及数据(仅攻参考，不是前端的活)：</strong></p>
<p>waterfull.php：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?php
    header('Content-Type:text/html; charset=utf-8');
    
    /*获取数据  字符串*/
    $data = file_get_contents('data.json');

    /*转化php对象？ 需要对其操作*/
    $data = json_decode($data);

    /*页码*/
    $page = $_GET['page'];
    /*条数*/
    $pageSize = $_GET['pageSize'];

    /*获取数据的起始索引*/
    $offset = ($page - 1) * $pageSize;

    /*slice 从什么位子开始切割 切割多少条*/
    $result = array_slice($data, $offset, $pageSize);

    /*下一页的页码*/
    $page++;

    /*转化json字符串 输出到前端*/
    echo json_encode(array('page'=>$page, 'items'=>$result));/*｛items:[]｝*/

    /*延时1秒返回数据*/
    sleep(1);

?>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="php hljs"><code class="php"><span class="hljs-meta">&lt;?php</span>
    header(<span class="hljs-string">'Content-Type:text/html; charset=utf-8'</span>);
    
    <span class="hljs-comment">/*获取数据  字符串*/</span>
    $data = file_get_contents(<span class="hljs-string">'data.json'</span>);

    <span class="hljs-comment">/*转化php对象？ 需要对其操作*/</span>
    $data = json_decode($data);

    <span class="hljs-comment">/*页码*/</span>
    $page = $_GET[<span class="hljs-string">'page'</span>];
    <span class="hljs-comment">/*条数*/</span>
    $pageSize = $_GET[<span class="hljs-string">'pageSize'</span>];

    <span class="hljs-comment">/*获取数据的起始索引*/</span>
    $offset = ($page - <span class="hljs-number">1</span>) * $pageSize;

    <span class="hljs-comment">/*slice 从什么位子开始切割 切割多少条*/</span>
    $result = array_slice($data, $offset, $pageSize);

    <span class="hljs-comment">/*下一页的页码*/</span>
    $page++;

    <span class="hljs-comment">/*转化json字符串 输出到前端*/</span>
    <span class="hljs-keyword">echo</span> json_encode(<span class="hljs-keyword">array</span>(<span class="hljs-string">'page'</span>=&gt;$page, <span class="hljs-string">'items'</span>=&gt;$result));<span class="hljs-comment">/*｛items:[]｝*/</span>

    <span class="hljs-comment">/*延时1秒返回数据*/</span>
    sleep(<span class="hljs-number">1</span>);

<span class="hljs-meta">?&gt;</span></code></pre>
<p>data.json：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
    {
        &quot;path&quot;: &quot;./images/001.jpg&quot;,
        &quot;text&quot;: &quot;一支素笔，一杯花茶，一段时光，浅笑又安然一场盛世的繁华，愿不倾城，不倾国，只倾我所有。只为过简单安稳的生活，单纯不平凡。一支素笔，一杯花茶，一段时光，浅笑又安然。早安！&quot;
    },
                    ...
    {
        &quot;path&quot;: &quot;./images/100.jpg&quot;,
        &quot;text&quot;: &quot;青春，青春，一场盛世不平凡。一支素笔，一杯花茶，一段时光，浅笑又安然一场盛世的繁华，愿不倾城，不倾国，只倾我所有。只为过简单安稳的生活，单纯不平凡。一支素笔，一杯花茶，一段时光，浅笑又安然。早安！&quot;
    }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">[
    {
        <span class="hljs-string">"path"</span>: <span class="hljs-string">"./images/001.jpg"</span>,
        <span class="hljs-string">"text"</span>: <span class="hljs-string">"一支素笔，一杯花茶，一段时光，浅笑又安然一场盛世的繁华，愿不倾城，不倾国，只倾我所有。只为过简单安稳的生活，单纯不平凡。一支素笔，一杯花茶，一段时光，浅笑又安然。早安！"</span>
    },
                    ...
    {
        <span class="hljs-string">"path"</span>: <span class="hljs-string">"./images/100.jpg"</span>,
        <span class="hljs-string">"text"</span>: <span class="hljs-string">"青春，青春，一场盛世不平凡。一支素笔，一杯花茶，一段时光，浅笑又安然一场盛世的繁华，愿不倾城，不倾国，只倾我所有。只为过简单安稳的生活，单纯不平凡。一支素笔，一杯花茶，一段时光，浅笑又安然。早安！"</span>
    }
]</code></pre>
<p><strong>Ajax请求后台数据，动态渲染瀑布流：</strong></p>
<ul>
<li>通过接口文档，以及活动模板将数据渲染到页面；</li>
<li>利用jQuery里面封装的瀑布流插件，实现瀑布流的布局；</li>
<li>通过页面中的“加载更多”按钮，控制显示的数据数量；</li>
</ul>
<p>Ajax请求数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
    <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
    <title>瀑布流</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: &quot;Microsoft Yahei&quot;;
            background: #f5f5f5;
        }
        .box {
            width: 1200px;
            margin: 0 auto;
            padding-top: 40px
        }
        .box > .items {
            position: relative;
        }
        .box > .items > .item {
            width: 220px;
            box-shadow: 2px 2px 2px #999;
            position: absolute;
        }
        .box > .items > .item > p {
            margin: 0;
            padding: 10px;
            background: #fff;
        }
        /*目的是固定高度且不一样*/
        .box > .items > .item > img {
            width: 100%;
            display: block;
            height:  px;
        }

        /*目的是固定高度且不一样*/
        .box > .items > .item:nth-child(4n) > img {
            width: 100%;
            display: block;
            height: 450px;
        }
        .box > .btn {
            width: 280px;
            height: 40px;
            margin: 30px auto;
            text-align: center;
            line-height: 40px;
            background-color: #CCC;
            border-radius: 6px;
            font-size: 24px;
            cursor: pointer;
        }
        .box > .loading {
            background-color: transparent;
        }
    </style>
</head>

<body>
    <div class=&quot;box&quot;>
        <div class=&quot;items&quot;>
            
        </div>
        <div class=&quot;btn&quot;>加载更多</div>
    </div>

    <script type=&quot;text/template&quot; id=&quot;tpl&quot;>
        "{{"each items as v i"}}"
        <div class=&quot;item&quot;>
            <img src=&quot;"{{"v.path"}}"&quot; alt=&quot;&quot;>
            <p>"{{"v.text"}}"</p>
        </div>
        "{{"/each"}}"
    </script>

    <script src=&quot;jquery.min.js&quot;></script>
    <script src=&quot;jquery.waterfull.js&quot;></script>
    <script src=&quot;template-web.js&quot;></script>

    <script>
    // ajax 请求，一进来先调用一次
    function render(){
        $.ajax({
            url:&quot;waterfull.php&quot;,
            type:&quot;get&quot;,
            dataType:&quot;json&quot;,
            data:{
                // 3-首先去按钮中，找下一页的page属性，如果没有的话，给一个默认值1
                page:$(&quot;.btn&quot;).data(&quot;page&quot;) || 1,
                pageSize: 15
            },
            success:function(data){
                var htmlStr = template(&quot;tpl&quot;,data);
                $(&quot;.items&quot;).append(htmlStr);
                $(&quot;.items&quot;).waterfull();
                // 1-将请求回来的数据中表示下一页的页码page存入btn的自定义属性data-page中
                // 2-给按钮加上一个自定义属性page  值就是后台返回的page属性
                //   7-当数据加载完之后，还要将按钮变成正在加载，并且要移除disabled这个类
                $(&quot;.btn&quot;).data(&quot;page&quot;,data.page).text(&quot;加载更多&quot;).removeClass(&quot;disabled&quot;);
                // 8-数据是有限的，假如请求不到数据之后，需要将按钮置成disabled，并且加上文字“没有更多数据了”
                if(data.items.length == 0){
                    $(&quot;.btn&quot;).text(&quot;没有更多数据了&quot;).addClass(&quot;disabled&quot;);
                }
            }
        });
    }
    render();

    // 4-点击加载更多的时候，调用Ajax请求
    $(&quot;.btn&quot;).click(function(){
        // 6- 一进来县普安段一下按钮有没有disabled这个类，如果有的话让它不可以被点击
        if($(this).hasClass(&quot;disabled&quot;)){
            return false;
        }
        render();
        // 5-点击按钮之后改变按钮的状态，和文本
        $(this).text(&quot;正在加载中&quot;);
        $(this).addClass(&quot;disabled&quot;);
    });
    </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>瀑布流<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">body</span> {
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">font-family</span>: <span class="hljs-string">"Microsoft Yahei"</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#f5f5f5</span>;
        }
        <span class="hljs-selector-class">.box</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">1200px</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
            <span class="hljs-attribute">padding-top</span>: <span class="hljs-number">40px</span>
        }
        <span class="hljs-selector-class">.box</span> &gt; <span class="hljs-selector-class">.items</span> {
            <span class="hljs-attribute">position</span>: relative;
        }
        <span class="hljs-selector-class">.box</span> &gt; <span class="hljs-selector-class">.items</span> &gt; <span class="hljs-selector-class">.item</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">220px</span>;
            <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">2px</span> <span class="hljs-number">2px</span> <span class="hljs-number">2px</span> <span class="hljs-number">#999</span>;
            <span class="hljs-attribute">position</span>: absolute;
        }
        <span class="hljs-selector-class">.box</span> &gt; <span class="hljs-selector-class">.items</span> &gt; <span class="hljs-selector-class">.item</span> &gt; <span class="hljs-selector-tag">p</span> {
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
        }
        <span class="hljs-comment">/*目的是固定高度且不一样*/</span>
        <span class="hljs-selector-class">.box</span> &gt; <span class="hljs-selector-class">.items</span> &gt; <span class="hljs-selector-class">.item</span> &gt; <span class="hljs-selector-tag">img</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
            <span class="hljs-attribute">display</span>: block;
            <span class="hljs-attribute">height</span>:  px;
        }

        <span class="hljs-comment">/*目的是固定高度且不一样*/</span>
        <span class="hljs-selector-class">.box</span> &gt; <span class="hljs-selector-class">.items</span> &gt; <span class="hljs-selector-class">.item</span><span class="hljs-selector-pseudo">:nth-child(4n)</span> &gt; <span class="hljs-selector-tag">img</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
            <span class="hljs-attribute">display</span>: block;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">450px</span>;
        }
        <span class="hljs-selector-class">.box</span> &gt; <span class="hljs-selector-class">.btn</span> {
            <span class="hljs-attribute">width</span>: <span class="hljs-number">280px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">40px</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">30px</span> auto;
            <span class="hljs-attribute">text-align</span>: center;
            <span class="hljs-attribute">line-height</span>: <span class="hljs-number">40px</span>;
            <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#CCC</span>;
            <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">6px</span>;
            <span class="hljs-attribute">font-size</span>: <span class="hljs-number">24px</span>;
            <span class="hljs-attribute">cursor</span>: pointer;
        }
        <span class="hljs-selector-class">.box</span> &gt; <span class="hljs-selector-class">.loading</span> {
            <span class="hljs-attribute">background-color</span>: transparent;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"items"</span>&gt;</span>
            
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn"</span>&gt;</span>加载更多<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/template"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"tpl"</span>&gt;</span><span class="handlebars"><span class="xml">
        </span><span class="hljs-template-variable">"{{"<span class="hljs-builtin-name">each</span> items as v i"}}"</span><span class="xml">
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"item"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"</span></span></span><span class="hljs-template-variable">"{{"v.path"}}"</span><span class="xml"><span class="hljs-tag"><span class="hljs-string">"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">""</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{"v.text"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        </span><span class="hljs-template-tag">"{{"/<span class="hljs-name"><span class="hljs-builtin-name">each</span></span>"}}"</span><span class="xml">
    </span></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"jquery.waterfull.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"template-web.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-comment">// ajax 请求，一进来先调用一次</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span>(<span class="hljs-params"></span>)</span>{
        $.ajax({
            <span class="hljs-attr">url</span>:<span class="hljs-string">"waterfull.php"</span>,
            <span class="hljs-attr">type</span>:<span class="hljs-string">"get"</span>,
            <span class="hljs-attr">dataType</span>:<span class="hljs-string">"json"</span>,
            <span class="hljs-attr">data</span>:{
                <span class="hljs-comment">// 3-首先去按钮中，找下一页的page属性，如果没有的话，给一个默认值1</span>
                page:$(<span class="hljs-string">".btn"</span>).data(<span class="hljs-string">"page"</span>) || <span class="hljs-number">1</span>,
                <span class="hljs-attr">pageSize</span>: <span class="hljs-number">15</span>
            },
            <span class="hljs-attr">success</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
                <span class="hljs-keyword">var</span> htmlStr = template(<span class="hljs-string">"tpl"</span>,data);
                $(<span class="hljs-string">".items"</span>).append(htmlStr);
                $(<span class="hljs-string">".items"</span>).waterfull();
                <span class="hljs-comment">// 1-将请求回来的数据中表示下一页的页码page存入btn的自定义属性data-page中</span>
                <span class="hljs-comment">// 2-给按钮加上一个自定义属性page  值就是后台返回的page属性</span>
                <span class="hljs-comment">//   7-当数据加载完之后，还要将按钮变成正在加载，并且要移除disabled这个类</span>
                $(<span class="hljs-string">".btn"</span>).data(<span class="hljs-string">"page"</span>,data.page).text(<span class="hljs-string">"加载更多"</span>).removeClass(<span class="hljs-string">"disabled"</span>);
                <span class="hljs-comment">// 8-数据是有限的，假如请求不到数据之后，需要将按钮置成disabled，并且加上文字“没有更多数据了”</span>
                <span class="hljs-keyword">if</span>(data.items.length == <span class="hljs-number">0</span>){
                    $(<span class="hljs-string">".btn"</span>).text(<span class="hljs-string">"没有更多数据了"</span>).addClass(<span class="hljs-string">"disabled"</span>);
                }
            }
        });
    }
    render();

    <span class="hljs-comment">// 4-点击加载更多的时候，调用Ajax请求</span>
    $(<span class="hljs-string">".btn"</span>).click(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-comment">// 6- 一进来县普安段一下按钮有没有disabled这个类，如果有的话让它不可以被点击</span>
        <span class="hljs-keyword">if</span>($(<span class="hljs-keyword">this</span>).hasClass(<span class="hljs-string">"disabled"</span>)){
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }
        render();
        <span class="hljs-comment">// 5-点击按钮之后改变按钮的状态，和文本</span>
        $(<span class="hljs-keyword">this</span>).text(<span class="hljs-string">"正在加载中"</span>);
        $(<span class="hljs-keyword">this</span>).addClass(<span class="hljs-string">"disabled"</span>);
    });
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>其中<code>jquery.waterfull.js</code>为封装的<code>jQuery</code>瀑布流插件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function() {
    $.fn.waterFull = function() {
        //1. 确定一共多少列
        var columns = 5;
        //2. 获取每一个元素的宽度
        var width = this.children().width();
        //3. 计算间隔
        var space = (this.width() - width * columns) / (columns - 1);
        //声明数组来保存每一列当前的高度
        var heightArr = [];
        this.children().each(function(index, ele) {
            //4. 为第一行的元素设置定位
            if (index < columns) {
                $(ele).css({
                    top: 0,
                    left: index * (width + space),
                });
                heightArr.push($(ele).height());
            } else {
                //除过第一行之外的所有的内容
                //先计算当前所有列中最短的列
                var minHeight = heightArr[0];
                var minIndex = 0;
                $.each(heightArr, function(index, value) {
                        if (minHeight > value) {
                            minHeight = value;
                            //找到了最短的列所在的索引
                            minIndex = index;
                        }
                    })
                    //将当前要摆放的元素的高度累加到当前列所对应的高度中
                heightArr[minIndex] += $(ele).height() + space;
                //就是最短列的高度加上间隔
                var top = minHeight + space;
                //因为已经找到了要把当前元素放在哪一列
                //所以直接使用列的索引计算即可
                var left = minIndex * (width + space);
                $(ele).css({
                    top: top,
                    left: left,
                })
            }
            //5. 将items的高度设置为最高的那一列的高度
            var maxHeight = heightArr[0];
            $.each(heightArr, function(index, value) {
                maxHeight = maxHeight > value ? maxHeight : value;
            })
            console.log($(this));
            $(this).parent().height(maxHeight)
        });
    }
})()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    $.fn.waterFull = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">//1. 确定一共多少列</span>
        <span class="hljs-keyword">var</span> columns = <span class="hljs-number">5</span>;
        <span class="hljs-comment">//2. 获取每一个元素的宽度</span>
        <span class="hljs-keyword">var</span> width = <span class="hljs-keyword">this</span>.children().width();
        <span class="hljs-comment">//3. 计算间隔</span>
        <span class="hljs-keyword">var</span> space = (<span class="hljs-keyword">this</span>.width() - width * columns) / (columns - <span class="hljs-number">1</span>);
        <span class="hljs-comment">//声明数组来保存每一列当前的高度</span>
        <span class="hljs-keyword">var</span> heightArr = [];
        <span class="hljs-keyword">this</span>.children().each(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">index, ele</span>) </span>{
            <span class="hljs-comment">//4. 为第一行的元素设置定位</span>
            <span class="hljs-keyword">if</span> (index &lt; columns) {
                $(ele).css({
                    <span class="hljs-attr">top</span>: <span class="hljs-number">0</span>,
                    <span class="hljs-attr">left</span>: index * (width + space),
                });
                heightArr.push($(ele).height());
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-comment">//除过第一行之外的所有的内容</span>
                <span class="hljs-comment">//先计算当前所有列中最短的列</span>
                <span class="hljs-keyword">var</span> minHeight = heightArr[<span class="hljs-number">0</span>];
                <span class="hljs-keyword">var</span> minIndex = <span class="hljs-number">0</span>;
                $.each(heightArr, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">index, value</span>) </span>{
                        <span class="hljs-keyword">if</span> (minHeight &gt; value) {
                            minHeight = value;
                            <span class="hljs-comment">//找到了最短的列所在的索引</span>
                            minIndex = index;
                        }
                    })
                    <span class="hljs-comment">//将当前要摆放的元素的高度累加到当前列所对应的高度中</span>
                heightArr[minIndex] += $(ele).height() + space;
                <span class="hljs-comment">//就是最短列的高度加上间隔</span>
                <span class="hljs-keyword">var</span> top = minHeight + space;
                <span class="hljs-comment">//因为已经找到了要把当前元素放在哪一列</span>
                <span class="hljs-comment">//所以直接使用列的索引计算即可</span>
                <span class="hljs-keyword">var</span> left = minIndex * (width + space);
                $(ele).css({
                    <span class="hljs-attr">top</span>: top,
                    <span class="hljs-attr">left</span>: left,
                })
            }
            <span class="hljs-comment">//5. 将items的高度设置为最高的那一列的高度</span>
            <span class="hljs-keyword">var</span> maxHeight = heightArr[<span class="hljs-number">0</span>];
            $.each(heightArr, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">index, value</span>) </span>{
                maxHeight = maxHeight &gt; value ? maxHeight : value;
            })
            <span class="hljs-built_in">console</span>.log($(<span class="hljs-keyword">this</span>));
            $(<span class="hljs-keyword">this</span>).parent().height(maxHeight)
        });
    }
})()</code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013696317?w=614&amp;h=357" src="https://static.alili.tech/img/remote/1460000013696317?w=614&amp;h=357" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>除了手动点击按钮之外，我们还可以监听滚动条的位置，当在底部的时候直接调用加载函数：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(window).scroll(function(){
    // 获取滚动条当前滚动的距离
    var scrollTop = $(this).scrollTop();
    // 获取整个盒子的高度
    var boxHeight = $(&quot;.box&quot;).outerHeight();
    // 获取可视区的高度
    var windowHeight = $(window).height();
    // 判断当滚动条的高度大于等于盒子的高度减去可视区的高度的时候，调用加载函数
    if(scrollTop >= boxHeight - windowHeight){
        // 请求数据还需要判断下有没有disabled这个类，没有的时候才能加载
        if(!$(&quot;.btn&quot;).hasClass(&quot;disabled&quot;)){
            render();
            $(&quot;.btn&quot;).text(&quot;正在获取数据&quot;).addClass(&quot;disabled&quot;);
        }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$(<span class="hljs-built_in">window</span>).scroll(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">// 获取滚动条当前滚动的距离</span>
    <span class="hljs-keyword">var</span> scrollTop = $(<span class="hljs-keyword">this</span>).scrollTop();
    <span class="hljs-comment">// 获取整个盒子的高度</span>
    <span class="hljs-keyword">var</span> boxHeight = $(<span class="hljs-string">".box"</span>).outerHeight();
    <span class="hljs-comment">// 获取可视区的高度</span>
    <span class="hljs-keyword">var</span> windowHeight = $(<span class="hljs-built_in">window</span>).height();
    <span class="hljs-comment">// 判断当滚动条的高度大于等于盒子的高度减去可视区的高度的时候，调用加载函数</span>
    <span class="hljs-keyword">if</span>(scrollTop &gt;= boxHeight - windowHeight){
        <span class="hljs-comment">// 请求数据还需要判断下有没有disabled这个类，没有的时候才能加载</span>
        <span class="hljs-keyword">if</span>(!$(<span class="hljs-string">".btn"</span>).hasClass(<span class="hljs-string">"disabled"</span>)){
            render();
            $(<span class="hljs-string">".btn"</span>).text(<span class="hljs-string">"正在获取数据"</span>).addClass(<span class="hljs-string">"disabled"</span>);
        }
    }
});</code></pre>
<h2 id="articleHeader30">8. Ajax请求模拟软件</h2>
<blockquote>
<code>Postman</code>是一款模拟<code>Ajax</code>请求的软件，根据接口文档，输入请求地址，以及选择请求的方式，再输入需要请求的数据，就能模拟从后台，获取到数据。</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013696318?w=1278&amp;h=586" src="https://static.alili.tech/img/remote/1460000013696318?w=1278&amp;h=586" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>根据图片的注释，我们可以大致了解这款软件的用法，根据接口文档填上信息，点击右上角<code>send</code>，就会模拟发送<code>Ajax</code>请求，<code>response</code>返回请求的结果。</p>
<h2 id="articleHeader31">9. 同源策略</h2>
<blockquote>同源策略最初是在1995年时提出,到目前为止所有浏览器都实行这个政策。</blockquote>
<h3 id="articleHeader32">9.1 什么是同源策略</h3>
<blockquote>最初它的含义是指,A网页设置的<code>Cookie</code>,B网页不能打开,除非这两个网页"同源",所谓同源就是必须要满足三个条件:</blockquote>
<ul>
<li>协议相同</li>
<li>域名相同</li>
<li>端口相同</li>
</ul>
<p><strong>举个例子:</strong></p>
<p><code>http://www.abc.com/home/index.html</code>这个网址中,协议是<code>http://</code>,域名是<code>www.abc.com</code>,端口是<code>80</code>(默认端口可以省略)，下面看几个例子：</p>
<table>
<thead><tr>
<th>URL</th>
<th>说明</th>
<th>是否允许通信</th>
</tr></thead>
<tbody>
<tr>
<td>
<code>http://www.a.com/a.html</code>&lt;br/&gt;<code>http://www.a.com/b.html</code>
</td>
<td>协议、域名、端口都相同</td>
<td>允许</td>
</tr>
<tr>
<td>
<code>http://www.a.com/a/a.html</code>&lt;br/&gt;<code>http://www.a.com/b/b.html</code>
</td>
<td>协议、域名、端口都相同，不同文件夹下</td>
<td>允许</td>
</tr>
<tr>
<td>
<code>http://www.a.com/a.html</code>&lt;br/&gt;<code>http://www.a.com:8000/b.html</code>
</td>
<td>协议、域名相同，端口不同</td>
<td>不允许</td>
</tr>
<tr>
<td>
<code>http://www.a.com/a.html</code>&lt;br/&gt;<code>https://www.a.com/b.html</code>
</td>
<td>域名、端口相同，协议不同</td>
<td>不允许</td>
</tr>
<tr>
<td>
<code>http://www.a.com/a.html</code>&lt;br/&gt;<code>https://www.b.com/b.html</code>
</td>
<td>协议、端口相同，域名不同</td>
<td>不允许</td>
</tr>
<tr>
<td>
<code>http://www.a.com/a.html</code>&lt;br/&gt;<code>http://70.32.92.74/b.html</code>
</td>
<td>协议、端口相同，域名和域名对应ip</td>
<td>不允许</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader33">9.2 同源策略的目的</h3>
<blockquote>同源策略的目的就是为了保护用户信息安全，防止恶意的网站窃取数据。</blockquote>
<p>打个比方，你登录了某个网站<code>A</code>，同时你又去浏览了另一个网站<code>B</code>，如果<code>B</code>网站能够读取你<code>A</code>网站里存储的<code>cookie</code>，会发生什么？你在<code>A</code>网站里面的信息，将会被泄露，更可怕的是，<code>cookie</code>往往用来保存用户的登录状态，如果用户没有退出登录，<code>B</code>网站就可以冒充用户进行操作。所以“同源策略”是必须得。</p>
<h3 id="articleHeader34">9.3 限制范围</h3>
<blockquote>随着互联网的发展，“同源策略”越来越严格。目前如果非同源，共有三种行为受到限制：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="（1） Cookie、LocalStorage 和 IndexDB 无法读取。

（2） DOM 无法获得。

（3） AJAX 请求不能发送。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>（<span class="hljs-number">1</span>） Cookie、LocalStorage 和 IndexDB 无法读取。

（<span class="hljs-number">2</span>） DOM 无法获得。

（<span class="hljs-number">3</span>） AJAX 请求不能发送。</code></pre>
<p><em>虽然这些限制是必要的，但是有时很不方便，合理的用途也受到影响。</em></p>
<h2 id="articleHeader35">10. 跨域</h2>
<blockquote>同源策略规定，<code>Ajax</code>请求只能发给同源的网址，否则就报错。</blockquote>
<ul>
<li>由于浏览器的同源策略，使用<code>XHR</code>对象进行跨域请求会直接被浏览器制止</li>
<li>
<code>html</code>一些标签中的<code>src</code>属性也可以发送请求，相当于是发送了一个<code>get</code>请求</li>
<li>
<code>src</code>属性中书写的地址，发送出去的请求，是不会受到浏览器同源策略的限制的</li>
</ul>
<p><em>下面介绍三种解决跨域的方法</em></p>
<h3 id="articleHeader36">10.1 JSONP</h3>
<blockquote>
<code>JSONP</code>是服务器与客户端跨源通信的常用方法，最大的特点就是简单适用。老式浏览器全部支持，服务器改造非常小。</blockquote>
<p><strong>实现原理：</strong></p>
<p><code>jsonp</code>的原理就是：动态的创建一个<code>script</code>标签，将这个<code>script</code>标签的<code>src</code>属性设置为要请求的地址<code>url</code>，将<code>script</code>标签添加到页面之后，<code>src</code>属性会自动向<code>url</code>发送一个<code>get</code>请求，又由于，后台返回的数据格式比较特殊，是一个函数调用的语句，所以我们提前定义好一个函数，那么这个函数就会在请求成功之后自动被调用，数据也会被传入到这个函数中，最终就类似于<code>ajax</code>请求的回调的效果！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
    // url即请求的地址，赋值给动态创建的script标签的src属性
    function creatScriptTag(url,callback){
        // 一个页面可能会有很多跨域请求，如果回调函数名写死，那么只能用一次
        // 随机生成一个函数名，将回调函数以这个随机生成的名字命名
        var callbackName = &quot;jsonp&quot; + new Data().getTime() + parseInt(Math.random() * 1000);
        // 将回调函数添加到window对象中，类似于添加了一个这个随机函数名的一个全局函数
        window[callbackName] = callback;
        var script = document.createElement('script');
        script.setAttribute('type','text/javascript');
        // 注意，该请求的查询字符串有一个callback参数，用来指定回调函数的名字，这对于JSONP是必需的。
        script.src = url + &quot;?callback=&quot; + callbackName;
        document.body.appendChild(script);
    }
    creatScriptTag(&quot;http://api.ajax.com/data.php&quot;, function(data){
        console.log(data);
    })
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-comment">// url即请求的地址，赋值给动态创建的script标签的src属性</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">creatScriptTag</span>(<span class="hljs-params">url,callback</span>)</span>{
        <span class="hljs-comment">// 一个页面可能会有很多跨域请求，如果回调函数名写死，那么只能用一次</span>
        <span class="hljs-comment">// 随机生成一个函数名，将回调函数以这个随机生成的名字命名</span>
        <span class="hljs-keyword">var</span> callbackName = <span class="hljs-string">"jsonp"</span> + <span class="hljs-keyword">new</span> Data().getTime() + <span class="hljs-built_in">parseInt</span>(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">1000</span>);
        <span class="hljs-comment">// 将回调函数添加到window对象中，类似于添加了一个这个随机函数名的一个全局函数</span>
        <span class="hljs-built_in">window</span>[callbackName] = callback;
        <span class="hljs-keyword">var</span> script = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'script'</span>);
        script.setAttribute(<span class="hljs-string">'type'</span>,<span class="hljs-string">'text/javascript'</span>);
        <span class="hljs-comment">// 注意，该请求的查询字符串有一个callback参数，用来指定回调函数的名字，这对于JSONP是必需的。</span>
        script.src = url + <span class="hljs-string">"?callback="</span> + callbackName;
        <span class="hljs-built_in">document</span>.body.appendChild(script);
    }
    creatScriptTag(<span class="hljs-string">"http://api.ajax.com/data.php"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
        <span class="hljs-built_in">console</span>.log(data);
    })
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><strong>jQuery里的JSONP：</strong></p>
<blockquote>在<code>jQuery</code>中，发送<code>Ajax</code>方法的时候，只要定义一个<code>dataType:"jsonp"</code>，即可实现跨域。</blockquote>
<h3 id="articleHeader37">10.2 WebSocket</h3>
<blockquote>
<code>WebSocket</code>是一种通信协议，正常是由后台操控，使用<code>ws://</code>（非加密）和<code>wss://</code>（加密）作为协议前缀。该协议不实行同源政策，只要服务器支持，就可以通过它进行跨源通信。</blockquote>
<p>下面是一个例子，浏览器发出的<code>WebSocket</code>请求的头信息。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="GET /chat HTTP/1.1
Host: server.example.com
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==
Sec-WebSocket-Protocol: chat, superchat
Sec-WebSocket-Version: 13
Origin: http://example.com" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs http"><code><span class="hljs-keyword">GET</span> <span class="hljs-string">/chat</span> HTTP/1.1
<span class="hljs-attribute">Host</span>: server.example.com
<span class="hljs-attribute">Upgrade</span>: websocket
<span class="hljs-attribute">Connection</span>: Upgrade
<span class="hljs-attribute">Sec-WebSocket-Key</span>: x3JJHMbDL1EzLkh9GBhXDw==
<span class="hljs-attribute">Sec-WebSocket-Protocol</span>: chat, superchat
<span class="hljs-attribute">Sec-WebSocket-Version</span>: 13
<span class="hljs-attribute">Origin</span>: http://example.com</code></pre>
<p>上面代码中，有一个字段是<code>Origin</code>，表示该请求的请求源（<code>origin</code>），即发自哪个域名。</p>
<p>正是因为有了<code>Origin</code>这个字段，所以<code>WebSocket</code>才没有实行同源政策。因为服务器可以根据这个字段，判断是否许可本次通信。如果该域名在白名单内，服务器就会做出如下回应。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
Sec-WebSocket-Protocol: chat" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs http"><code>HTTP/1.1 <span class="hljs-number">101</span> Switching Protocols
<span class="hljs-attribute">Upgrade</span>: websocket
<span class="hljs-attribute">Connection</span>: Upgrade
<span class="hljs-attribute">Sec-WebSocket-Accept</span>: HSmrc0sMlYUkAGmm5OPpG2HaGWk=
<span class="hljs-attribute">Sec-WebSocket-Protocol</span>: chat</code></pre>
<p><strong>(本篇完)</strong></p>
<p><a href="https://segmentfault.com/a/1190000012623554">上一篇：JavaScript 进阶知识 - 特效篇(二)</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 进阶知识 - Ajax篇

## 原文链接
[https://segmentfault.com/a/1190000013696278](https://segmentfault.com/a/1190000013696278)

