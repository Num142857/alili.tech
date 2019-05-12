---
title: '20道HTML基础面试题（附答案）' 
date: 2018-12-13 2:30:07
hidden: true
slug: uizh28mrqmo
categories: [reprint]
---

{{< raw >}}

                    
<p>以下是我整理的一些HTML的基础面试体，并自己整理了答案。</p>
<p><strong>1 DOCTYPE有什么作用？标准模式与混杂模式如何区分？它们有何意义?</strong></p>
<p>告诉浏览器使用哪个版本的HTML规范来渲染文档。DOCTYPE不存在或形式不正确会导致HTML文档以混杂模式呈现。<br>标准模式（Standards mode）以浏览器支持的最高标准运行；混杂模式（Quirks mode）中页面是一种比较宽松的向后兼容的方式显示。</p>
<p><strong>2 HTML5为什么只需要写 &lt;!DOCTYPE HTML&gt;？</strong></p>
<p>HTML5不基于SGML（Standard Generalized Markup Language  标准通用标记语言），因此不需要对DTD（DTD  文档类型定义）进行引用，但是需要DOCTYPE来规范浏览器行为。</p>
<p>HTML4.01基于SGML，所以需要引用DTD。才能告知浏览器文档所使用的文档类型，如下：<br>&lt;!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd"&gt;</p>
<p><strong>3 行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？</strong></p>
<p>行内元素：<code>a span img input select</code> <br>块级元素：<code>div ul ol li dl dt dd h1 p</code><br>空元素：<code>&lt;br&gt; &lt;hr&gt; &lt;link&gt; &lt;meta&gt;</code></p>
<p><strong>4 页面导入样式时，使用link和@import有什么区别？</strong></p>
<p>相同的地方，都是外部引用CSS方式，区别：</p>
<ol>
<li>link是xhtml标签，除了加载css外，还可以定义RSS等其他事务；@import属于CSS范畴，只能加载CSS</li>
<li>link引用CSS时候，页面载入时同时加载；@import需要在页面完全加载以后加载，而且@import被引用的CSS会等到引用它的CSS文件被加载完才加载</li>
<li>link是xhtml标签，无兼容问题；@import是在css2.1提出来的，低版本的浏览器不支持</li>
<li>link支持使用javascript控制去改变样式，而@import不支持</li>
<li>link方式的样式的权重高于@import的权重</li>
<li>import在html使用时候需要<code>&lt;style type="text/css"&gt;</code>标签</li>
</ol>
<p><strong>5 无样式内容闪烁（FOUC）Flash of Unstyle Content</strong></p>
<p>@import导入CSS文件会等到文档加载完后再加载CSS样式表。因此，在页面DOM加载完成到CSS导入完成之间会有一段时间页面上的内容是没有样式的。</p>
<p>解决方法：使用link标签加载CSS样式文件。因为link是顺序加载的，这样页面会等到CSS下载完之后再下载HTML文件，这样先布局好，就不会出现FOUC问题。</p>
<p><strong>6 介绍一下你对浏览器内核的理解？</strong></p>
<p>主要分成两部分：渲染引擎(Layout Engine或Rendering Engine)和JS引擎。</p>
<p>渲染引擎：负责取得网页的内容（HTML、XML、图像等等）、整理讯息（例如加入CSS等），以及计算网页的显示方式，然后会输出至显示器或打印机。浏览器的内核的不同对于网页的语法解释会有不同，所以渲染的效果也不相同。<br>JS引擎：解析和执行javascript来实现网页的动态效果。</p>
<p>最开始渲染引擎和JS引擎并没有区分的很明确，后来JS引擎越来越独立，内核就倾向于只指渲染引擎。</p>
<p><strong>7 常见的浏览器内核有哪些？</strong></p>
<ol>
<li>Trident( MSHTML )：IE MaxThon TT The World 360 搜狗浏览器</li>
<li>Geckos：Netscape6及以上版本  FireFox  Mozilla  Suite/SeaMonkey</li>
<li>Presto：Opera7及以上(Opera内核原为：Presto，现为：Blink)</li>
<li>Webkit：Safari Chrome</li>
</ol>
<p><strong>8 HTML5有哪些新特性,移除了那些元素？如何处理HTML5新标签的浏览器兼容问题？如何区分HTML和HTML5</strong></p>
<p>新增加了图像、位置、存储、多任务等功能。<br>新增元素：</p>
<ol>
<li>canvas</li>
<li>用于媒介回放的video和audio元素</li>
<li>本地离线存储。localStorage长期存储数据，浏览器关闭后数据不丢失;sessionStorage的数据在浏览器关闭后自动删除</li>
<li>语意化更好的内容元素，比如 article footer header nav section</li>
<li>位置API：Geolocation</li>
<li>表单控件，calendar date time email url search</li>
<li>新的技术：web worker(web worker是运行在后台的 JavaScript，独立于其他脚本，不会影响页面的性能。您可以继续做任何愿意做的事情：点击、选取内容等等，而此时 web worker 在后台运行) web socket</li>
<li>拖放API：drag、drop</li>
</ol>
<p>移除的元素：</p>
<ol>
<li>纯表现的元素：basefont big center font s strike tt u</li>
<li>性能较差元素：frame frameset noframes</li>
</ol>
<p>区分：</p>
<ol>
<li>DOCTYPE声明的方式是区分重要因素</li>
<li>根据新增加的结构、功能来区分</li>
</ol>
<p><strong>9 简述一下你对HTML语义化的理解？</strong></p>
<ol>
<li>去掉或丢失样式的时候能够让页面呈现出清晰的结构。</li>
<li>有利于SEO和搜索引擎建立良好沟通，有助于爬虫抓取更多的信息，爬虫依赖于标签来确定上下文和各个关键字的权重。</li>
<li>方便其它设备解析。</li>
<li>便于团队开发和维护，语义化根据可读性。</li>
</ol>
<p><strong>10 HTML5的文件离线储存怎么使用，工作原理是什么？</strong></p>
<p>在线情况下，浏览器发现HTML头部有manifest属性，它会请求manifest文件，如果是第一次访问，那么浏览器就会根据manifest文件的内容下载相应的资源，并进行离线存储。如果已经访问过并且资源已经离线存储了，那么浏览器就会使用离线的资源加载页面。然后浏览器会对比新的manifest文件与旧的manifest文件，如果文件没有发生改变，就不会做任何操作，如果文件改变了，那么就会重新下载文件中的资源，并且进行离线存储。例如，</p>
<p>在页面头部加入manifest属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html manifest='cache.manifest'>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">html</span> manifest=<span class="hljs-string">'cache.manifest'</span>&gt;
</code></pre>
<p>在cache.manifest文件中编写离线存储的资源</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="CACHE MANIFEST
#v0.11
CACHE:
js/app.js
css/style.css
NETWORK:
Resourse/logo.png
FALLBACK:
 //offline.html
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>CACHE MANIFEST
<span class="hljs-selector-id">#v0</span>.<span class="hljs-number">11</span>
CACHE:
js/app<span class="hljs-selector-class">.js</span>
css/style<span class="hljs-selector-class">.css</span>
NETWORK:
Resourse/logo<span class="hljs-selector-class">.png</span>
FALLBACK:
 <span class="hljs-comment">//offline.html</span>
</code></pre>
<p><strong>11 cookies，sessionStorage和localStorage的区别？</strong></p>
<p>共同点：都是保存在浏览器端，且是同源的。</p>
<p>区别：</p>
<ol>
<li>cookies是为了标识用户身份而存储在用户本地终端上的数据，始终在同源http请求中携带，即cookies在浏览器和服务器间来回传递，而sessionstorage和localstorage不会自动把数据发给服务器，仅在本地保存。</li>
<li>存储大小的限制不同。cookie保存的数据很小，不能超过4k，而sessionstorage和localstorage保存的数据大，可达到5M。</li>
<li>数据的有效期不同。cookie在设置的cookie过期时间之前一直有效，即使窗口或者浏览器关闭。sessionstorage仅在浏览器窗口关闭之前有效。localstorage始终有效，窗口和浏览器关闭也一直保存，用作长久数据保存。</li>
<li>作用域不同。cookie在所有的同源窗口都是共享；sessionstorage不在不同的浏览器共享，即使同一页面；localstorage在所有同源窗口都是共享</li>
</ol>
<p><strong>12 iframe框架有那些优缺点？</strong></p>
<p>优点：</p>
<ol>
<li>iframe能够原封不动的把嵌入的网页展现出来。</li>
<li>如果有多个网页引用iframe，那么你只需要修改iframe的内容，就可以实现调用的每一个页面内容的更改，方便快捷。</li>
<li>网页如果为了统一风格，头部和版本都是一样的，就可以写成一个页面，用iframe来嵌套，可以增加代码的可重用。</li>
<li>如果遇到加载缓慢的第三方内容如图标和广告，这些问题可以由iframe来解决。</li>
</ol>
<p>缺点：</p>
<ol>
<li>搜索引擎的爬虫程序无法解读这种页面</li>
<li>框架结构中出现各种滚动条</li>
<li>使用框架结构时，保证设置正确的导航链接。</li>
<li>iframe页面会增加服务器的http请求</li>
</ol>
<p><strong>13 label的作用是什么? 是怎么用的?</strong></p>
<p>label标签用来定义表单控件间的关系,当用户选择该标签时，浏览器会自动将焦点转到和标签相关的表单控件上。label 中有两个属性是非常有用的, FOR和ACCESSKEY。 <br>FOR属性功能：表示label标签要绑定的HTML元素，你点击这个标签的时候，所绑定的元素将获取焦点。例如，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Label FOR=&quot;InputBox&quot;>姓名</Label><input ID=&quot;InputBox&quot; type=&quot;text&quot;> 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>&lt;<span class="hljs-keyword">Label</span> <span class="hljs-keyword">FOR</span>=<span class="hljs-string">"InputBox"</span>&gt;姓名&lt;/<span class="hljs-keyword">Label</span>&gt;&lt;<span class="hljs-keyword">input</span> ID=<span class="hljs-string">"InputBox"</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">"text"</span>&gt; 
</code></pre>
<p>ACCESSKEY属性功能：表示访问label标签所绑定的元素的热键，当您按下热键，所绑定的元素将获取焦点。例如，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Label FOR=&quot;InputBox&quot; ACCESSKEY＝&quot;N&quot;>姓名</Label><input ID=&quot;InputBox&quot; type=&quot;text&quot;>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>&lt;<span class="hljs-keyword">Label</span> <span class="hljs-keyword">FOR</span>=<span class="hljs-string">"InputBox"</span> ACCESSKEY＝<span class="hljs-string">"N"</span>&gt;姓名&lt;/<span class="hljs-keyword">Label</span>&gt;&lt;<span class="hljs-keyword">input</span> ID=<span class="hljs-string">"InputBox"</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">"text"</span>&gt;
</code></pre>
<p><strong>14 HTML5的form如何关闭自动完成功能？</strong></p>
<p>HTML的输入框可以拥有自动完成的功能，当你往输入框输入内容的时候，浏览器会从你以前的同名输入框的历史记录中查找出类似的内容并列在输入框下面，这样就不用全部输入进去了，直接选择列表中的项目就可以了。但有时候我们希望关闭输入框的自动完成功能，例如当用户输入内容的时候，我们希望使用AJAX技术从数据库搜索并列举而不是在用户的历史记录中搜索。</p>
<p>方法：</p>
<ol>
<li>在IE的internet选项菜单中里的自动完成里面设置</li>
<li>设置form输入框的autocomplete为on或者off来来开启输入框的自动完成功能</li>
</ol>
<p><strong>15 如何实现浏览器内多个标签页之间的通信?</strong></p>
<ol>
<li>WebSocket SharedWorker</li>
<li>也可以调用 localstorge、cookies 等本地存储方式。 localstorge 在另一个浏览上下文里被添加、修改或删除时，它都会触发一个事件，我们通过监听事件，控制它的值来进行页面信息通信。</li>
</ol>
<p>注意：Safari 在无痕模式下设置 localstorge 值时会抛出QuotaExceededError 的异常</p>
<p><strong>16 webSocket如何兼容低浏览器？</strong></p>
<ol>
<li>Adobe Flash Socket  ActiveX HTMLFile (IE)  基于 multipart 编码发送 XHR 基于长轮询的 XHR</li>
<li>引用WebSocket.js这个文件来兼容低版本浏览器。</li>
</ol>
<p><strong>16 页面可见性（Page Visibility）API 可以有哪些用途？</strong></p>
<ol>
<li>通过visibility state的值得检测页面当前是否可见，以及打开网页的时间。</li>
<li>在页面被切换到其他后台进程时，自动暂停音乐或视频的播放。</li>
</ol>
<p><strong>17 如何在页面上实现一个圆形的可点击区域？</strong></p>
<ol>
<li>map+area或者svg</li>
<li>border-radius</li>
<li>纯js实现，一个点不在圆上的算法</li>
</ol>
<p><strong>18  实现不使用 border 画出1px高的线，在不同浏览器的Quirks mode和CSS Compat模式下都能保持同一效果</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div style=&quot;height:1px;overflow:hidden;background:red&quot;></div>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> style=<span class="hljs-string">"height:1px;overflow:hidden;background:red"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
</code></pre>
<p><strong>19 网页验证码是干嘛的，是为了解决什么安全问题？</strong></p>
<ol>
<li>区分用户是计算机还是人的程序;</li>
<li>可以防止恶意破解密码、刷票、论坛灌水；</li>
</ol>
<p><strong>20 title与h1的区别、b与strong的区别、i与em的区别？</strong></p>
<p>title属性没有明确意义，只表示标题；h1表示层次明确的标题，对页面信息的抓取也有很大的影响<br>strong标明重点内容，语气加强含义；b是无意义的视觉表示<br>em表示强调文本；i是斜体，是无意义的视觉表示<br>视觉样式标签：<code>b i u s</code><br>语义样式标签：<code>strong em ins del code</code></p>
<p><strong>21 元素的alt和title有什么异同？</strong></p>
<p>在alt和title同时设置的时候，alt作为图片的替代文字出现，title是图片的解释文字。</p>
<p><strong>持续更新中...</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
20道HTML基础面试题（附答案）

## 原文链接
[https://segmentfault.com/a/1190000013311880](https://segmentfault.com/a/1190000013311880)

