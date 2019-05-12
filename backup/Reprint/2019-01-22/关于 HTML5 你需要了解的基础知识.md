---
title: '关于 HTML5 你需要了解的基础知识' 
date: 2019-01-22 2:30:07
hidden: true
slug: a44z6i0asye
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#关于-html5-你需要了解的基础知识"></a>关于 HTML5 你需要了解的基础知识</h1>
<blockquote>
<p>HTML5 是第五个且是当前的 HTML 版本，它是用于在万维网上构建和呈现内容的标记语言。本文将帮助读者了解它。</p>
</blockquote>
<p>HTML5 通过 W3C 和Web 超文本应用技术工作组Web Hypertext Application Technology Working Group之间的合作发展起来。它是一个更高版本的 HTML，它的许多新元素可以使你的页面更加语义化和动态。它是为所有人提供更好的 Web 体验而开发的。HTML5 提供了很多的功能，使 Web 更加动态和交互。</p>
<p>HTML5 的新功能是：</p>
<ul>
<li>新标签，如 <code>&lt;header&gt;</code> 和 <code>&lt;section&gt;</code></li>
<li>用于 2D 绘图的 <code>&lt;canvas&gt;</code> 元素</li>
<li>本地存储</li>
<li>新的表单控件，如日历、日期和时间</li>
<li>新媒体功能</li>
<li>地理位置</li>
</ul>
<p>HTML5 还不是正式标准（LCTT 译注：HTML5 已于 2014 年成为“推荐标准”），因此，并不是所有的浏览器都支持它或其中一些功能。开发 HTML5 背后最重要的原因之一是防止用户下载并安装像 Silverlight 和 Flash 这样的多个插件。</p>
<p><strong>新标签和元素</strong></p>
<ul>
<li><strong>语义化元素：</strong> 图 1 展示了一些有用的语义化元素。</li>
<li><strong>表单元素：</strong> HTML5 中的表单元素如图 2 所示。</li>
<li><strong>图形元素：</strong> HTML5 中的图形元素如图 3 所示。</li>
<li><strong>媒体元素：</strong> HTML5 中的新媒体元素如图 4 所示。</li>
</ul>
<p><a href="http://opensourceforu.com/wp-content/uploads/2017/05/Figure-1-7.jpg"><img src="https://p0.ssl.qhimg.com/t014bc464f49726e090.jpg" alt=""></a></p>
<p><em>图 1：语义化元素</em></p>
<p><a href="http://opensourceforu.com/wp-content/uploads/2017/05/Figure-2-5.jpg"><img src="https://p0.ssl.qhimg.com/t01de7cfb72b155b26e.jpg" alt=""></a></p>
<p><em>图 2：表单元素</em></p>
<p><a href="http://opensourceforu.com/wp-content/uploads/2017/05/Figure-3-2.jpg"><img src="https://p0.ssl.qhimg.com/t0111bb6d977781534a.jpg" alt=""></a></p>
<p><em>图 3：图形元素</em></p>
<p><a href="http://opensourceforu.com/wp-content/uploads/2017/05/Figure-4-2.jpg"><img src="https://p0.ssl.qhimg.com/t01536266f5c53b8724.jpg" alt=""></a></p>
<p><em>图 4：媒体元素</em></p>
<h3><a href="#html5-的高级功能"></a>HTML5 的高级功能</h3>
<h4><a href="#地理位置"></a>地理位置</h4>
<p>这是一个 HTML5 API，用于获取网站用户的地理位置，用户必须首先允许网站获取他或她的位置。这通常通过按钮和/或浏览器弹出窗口来实现。所有最新版本的 Chrome、Firefox、IE、Safari 和 Opera 都可以使用 HTML5 的地理位置功能。</p>
<p>地理位置的一些用途是：</p>
<ul>
<li>公共交通网站</li>
<li>出租车及其他运输网站</li>
<li>电子商务网站计算运费</li>
<li>旅行社网站</li>
<li>房地产网站</li>
<li>在附近播放的电影的电影院网站</li>
<li>在线游戏</li>
<li>网站首页提供本地标题和天气</li>
<li>工作职位可以自动计算通勤时间</li>
</ul>
<p><strong>工作原理：</strong> 地理位置通过扫描位置信息的常见源进行工作，其中包括以下：</p>
<ul>
<li>全球定位系统（GPS）是最准确的</li>
<li>网络信号 - IP地址、RFID、Wi-Fi 和蓝牙 MAC地址</li>
<li>GSM/CDMA 蜂窝 ID</li>
<li>用户输入</li>
</ul>
<p>该 API 提供了非常方便的函数来检测浏览器中的地理位置支持：</p>
<pre><code class="hljs awk"><span class="hljs-keyword">if</span> (navigator.geolocation) {
<span class="hljs-regexp">//</span> <span class="hljs-keyword">do</span> stuff
}

</code></pre><p><code>getCurrentPosition</code> API 是使用地理位置的主要方法。它检索用户设备的当前地理位置。该位置被描述为一组地理坐标以及航向和速度。位置信息作为位置对象返回。</p>
<p>语法是：</p>
<pre><code class="hljs lisp">getCurrentPosition(<span class="hljs-name">showLocation</span>, ErrorHandler, options)<span class="hljs-comment">;</span>

</code></pre><ul>
<li><code>showLocation</code>：定义了检索位置信息的回调方法。</li>
<li><code>ErrorHandler</code>（可选）：定义了在处理异步调用时发生错误时调用的回调方法。</li>
<li><code>options</code> （可选）： 定义了一组用于检索位置信息的选项。</li>
</ul>
<p>我们可以通过两种方式向用户提供位置信息：测地和民用。</p>
<ol>
<li>描述位置的测地方式直接指向纬度和经度。</li>
<li>位置信息的民用表示法是人类可读的且容易理解。</li>
</ol>
<p>如下表 1 所示，每个属性/参数都具有测地和民用表示。</p>
<p><a href="http://opensourceforu.com/wp-content/uploads/2017/05/table-1.jpg"><img src="https://p0.ssl.qhimg.com/t013a1e670d7a517fa4.jpg" alt=""></a></p>
<p>图 5 包含了一个位置对象返回的属性集。</p>
<p><a href="http://opensourceforu.com/wp-content/uploads/2017/05/Figure5-1.jpg"><img src="https://p0.ssl.qhimg.com/t0137a17a90e407fe04.jpg" alt=""></a></p>
<p><em>图5：位置对象属性</em></p>
<h4><a href="#网络存储"></a>网络存储</h4>
<p>在 HTML 中，为了在本机存储用户数据，我们需要使用 JavaScript cookie。为了避免这种情况，HTML5 已经引入了 Web 存储，网站利用它在本机上存储用户数据。</p>
<p>与 Cookie 相比，Web 存储的优点是：</p>
<ul>
<li>更安全</li>
<li>更快</li>
<li>存储更多的数据</li>
<li>存储的数据不会随每个服务器请求一起发送。只有在被要求时才包括在内。这是 HTML5 Web 存储超过 Cookie 的一大优势。</li>
</ul>
<p>有两种类型的 Web 存储对象：</p>
<ol>
<li>本地 - 存储没有到期日期的数据。</li>
<li>会话 - 仅存储一个会话的数据。</li>
</ol>
<p><strong>如何工作：</strong> <code>localStorage</code> 和 <code>sessionStorage</code> 对象创建一个 <code>key=value</code> 对。比如： <code>key="Name"</code>，<code>value="Palak"</code>。</p>
<p>这些存储为字符串，但如果需要，可以使用 JavaScript 函数（如 <code>parseInt()</code> 和 <code>parseFloat()</code>）进行转换。</p>
<p>下面给出了使用 Web 存储对象的语法：</p>
<ul>
<li>存储一个值：<ul>
<li><code>localStorage.setItem("key1", "value1");</code></li>
<li><code>localStorage["key1"] = "value1";</code></li>
</ul>
</li>
<li>得到一个值：<ul>
<li><code>alert(localStorage.getItem("key1"));</code></li>
<li><code>alert(localStorage["key1"]);</code></li>
</ul>
</li>
<li>删除一个值： -<code>removeItem("key1");</code></li>
<li>删除所有值：<ul>
<li><code>localStorage.clear();</code></li>
</ul>
</li>
</ul>
<h4><a href="#应用缓存appcache"></a>应用缓存（AppCache）</h4>
<p>使用 HTML5 AppCache，我们可以使 Web 应用程序在没有 Internet 连接的情况下脱机工作。除 IE 之外，所有浏览器都可以使用 AppCache（截止至此时）。</p>
<p>应用缓存的优点是：</p>
<ul>
<li>网页浏览可以脱机</li>
<li>页面加载速度更快</li>
<li>服务器负载更小</li>
</ul>
<p><code>cache manifest</code> 是一个简单的文本文件，其中列出了浏览器应缓存的资源以进行脱机访问。 <code>manifest</code> 属性可以包含在文档的 HTML 标签中，如下所示：</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">manifest</span>=<span class="hljs-string">"test.appcache"</span>&gt;</span> 
... 
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>

</code></pre><p>它应该在你要缓存的所有页面上。</p>
<p>缓存的应用程序页面将一直保留，除非：</p>
<ol>
<li>用户清除它们</li>
<li><code>manifest</code> 被修改</li>
<li>缓存更新</li>
</ol>
<h4><a href="#视频"></a>视频</h4>
<p>在 HTML5 发布之前，没有统一的标准来显示网页上的视频。大多数视频都是通过 Flash 等不同的插件显示的。但 HTML5 规定了使用 video 元素在网页上显示视频的标准方式。</p>
<p>目前，video 元素支持三种视频格式，如表 2 所示。</p>
<p><a href="http://opensourceforu.com/wp-content/uploads/2017/05/table-2.jpg"><img src="https://p0.ssl.qhimg.com/t011a6164193a0fdea3.jpg" alt=""></a></p>
<p>下面的例子展示了 video 元素的使用：</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">!</span> <span class="hljs-attr">DOCTYPE</span> <span class="hljs-attr">HTML</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">video</span> <span class="hljs-attr">src</span>=<span class="hljs-string">" vdeo.ogg"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"320"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"240"</span> <span class="hljs-attr">controls</span>=<span class="hljs-string">"controls"</span>&gt;</span>

This browser does not support the video element.

<span class="hljs-tag">&lt;/<span class="hljs-name">video</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>

</code></pre><p>例子使用了 Ogg 文件，并且可以在 Firefox、Opera 和 Chrome 中使用。要使视频在 Safari 和未来版本的 Chrome 中工作，我们必须添加一个 MPEG4 和 WebM 文件。</p>
<p><code>video</code> 元素允许多个 <code>source</code> 元素。<code>source</code> 元素可以链接到不同的视频文件。浏览器将使用第一个识别的格式，如下所示：</p>
<pre><code class="hljs bash">&lt;video width=<span class="hljs-string">"320"</span> height=<span class="hljs-string">"240"</span> controls=<span class="hljs-string">"controls"</span>&gt;
&lt;<span class="hljs-built_in">source</span> src=<span class="hljs-string">"vdeo.ogg"</span> <span class="hljs-built_in">type</span>=<span class="hljs-string">"video/ogg"</span> /&gt;
&lt;<span class="hljs-built_in">source</span> src=<span class="hljs-string">" vdeo.mp4"</span> <span class="hljs-built_in">type</span>=<span class="hljs-string">"video/mp4"</span> /&gt;
&lt;<span class="hljs-built_in">source</span> src=<span class="hljs-string">" vdeo.webm"</span> <span class="hljs-built_in">type</span>=<span class="hljs-string">"video/webm"</span> /&gt;
This browser does not support the video element.
&lt;/video&gt;

</code></pre><p><a href="http://opensourceforu.com/wp-content/uploads/2017/05/Figure6-1.jpg"><img src="https://p0.ssl.qhimg.com/t019dd0c2a79a8e9b9c.jpg" alt=""></a></p>
<p><em>图6：Canvas 的输出</em></p>
<h4><a href="#音频"></a>音频</h4>
<p>对于音频，情况类似于视频。在 HTML5 发布之前，在网页上播放音频没有统一的标准。大多数音频也通过 Flash 等不同的插件播放。但 HTML5 规定了通过使用音频元素在网页上播放音频的标准方式。音频元素用于播放声音文件和音频流。</p>
<p>目前，HTML5 <code>audio</code> 元素支持三种音频格式，如表 3 所示。</p>
<p><a href="http://opensourceforu.com/wp-content/uploads/2017/05/table-3.jpg"><img src="https://p0.ssl.qhimg.com/t013d57a1cd5c6ca657.jpg" alt=""></a></p>
<p><code>audio</code> 元素的使用如下所示：</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">!</span> <span class="hljs-attr">DOCTYPE</span> <span class="hljs-attr">HTML</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">audio</span> <span class="hljs-attr">src</span>=<span class="hljs-string">" song.ogg"</span> <span class="hljs-attr">controls</span>=<span class="hljs-string">"controls"</span>&gt;</span>

This browser does not support the audio element.

<span class="hljs-tag">&lt;/<span class="hljs-name">video</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>

</code></pre><p>此例使用 Ogg 文件，并且可以在 Firefox、Opera 和 Chrome 中使用。要在 Safari 和 Chrome 的未来版本中使 audio 工作，我们必须添加一个 MP3 和 Wav 文件。</p>
<p><code>audio</code> 元素允许多个 <code>source</code> 元素，它可以链接到不同的音频文件。浏览器将使用第一个识别的格式，如下所示：</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">audio</span> <span class="hljs-attr">controls</span>=<span class="hljs-string">"controls"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">source</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"song.ogg"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"audio/ogg"</span> /&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">source</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"song.mp3"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"audio/mpeg"</span> /&gt;</span>

This browser does not support the audio element.

<span class="hljs-tag">&lt;/<span class="hljs-name">audio</span>&gt;</span>

</code></pre><h4><a href="#画布canvas"></a>画布（Canvas）</h4>
<p>要在网页上创建图形，HTML5 使用 画布 API。我们可以用它绘制任何东西，并且它使用 JavaScript。它通过避免从网络下载图像而提高网站性能。使用画布，我们可以绘制形状和线条、弧线和文本、渐变和图案。此外，画布可以让我们操作图像中甚至视频中的像素。你可以将 <code>canvas</code> 元素添加到 HTML 页面，如下所示：</p>
<pre><code class="hljs routeros">&lt;canvas <span class="hljs-attribute">id</span>=<span class="hljs-string">"myCanvas"</span> <span class="hljs-attribute">width</span>=<span class="hljs-string">"200"</span> <span class="hljs-attribute">height</span>=<span class="hljs-string">"100"</span>&gt;&lt;/canvas&gt;

</code></pre><p>画布元素不具有绘制元素的功能。我们可以通过使用 JavaScript 来实现绘制。所有绘画应在 JavaScript 中。</p>
<pre><code class="hljs lsl">&lt;script type=<span class="hljs-string">"text/javascript"</span>&gt;
var c=document.getElementById(<span class="hljs-string">"myCanvas"</span>);
var cxt=c.getContext(<span class="hljs-string">"2d"</span>);
cxt.fillStyle=<span class="hljs-string">"blue"</span>;
cxt.storkeStyle = <span class="hljs-string">"red"</span>;
cxt.fillRect(<span class="hljs-number">10</span>,<span class="hljs-number">10</span>,<span class="hljs-number">100</span>,<span class="hljs-number">100</span>);
cxt.storkeRect(<span class="hljs-number">10</span>,<span class="hljs-number">10</span>,<span class="hljs-number">100</span>,<span class="hljs-number">100</span>);
&lt;/script&gt;

</code></pre><p>以上脚本的输出如图 6 所示。</p>
<p>你可以绘制许多对象，如弧、圆、线/垂直梯度等。</p>
<h3><a href="#html5-工具"></a>HTML5 工具</h3>
<p>为了有效操作，所有熟练的或业余的 Web 开发人员/设计人员都应该使用 HTML5 工具，当需要设置工作流/网站或执行重复任务时，这些工具非常有帮助。它们提高了网页设计的可用性。</p>
<p>以下是一些帮助创建很棒的网站的必要工具。</p>
<ul>
<li><strong>HTML5 Maker：</strong>  用来在 HTML、JavaScript 和 CSS 的帮助下与网站内容交互。非常容易使用。它还允许我们开发幻灯片、滑块、HTML5 动画等。</li>
<li><strong>Liveweave：</strong> 用来测试代码。它减少了保存代码并将其加载到屏幕上所花费的时间。在编辑器中粘贴代码即可得到结果。它非常易于使用，并为一些代码提供自动完成功能，这使得开发和测试更快更容易。</li>
<li><strong>Font dragr：</strong>  在浏览器中预览定制的 Web 字体。它会直接载入该字体，以便你可以知道看起来是否正确。也提供了拖放界面，允许你拖动字形、Web 开放字体和矢量图形来马上测试。</li>
<li><strong>HTML5 Please：</strong>  可以让我们找到与 HTML5 相关的任何内容。如果你想知道如何使用任何一个功能，你可以在 HTML Please 中搜索。它提供了支持的浏览器和设备的有用资源的列表，语法，以及如何使用元素的一般建议等。</li>
<li><strong>Modernizr：</strong> 这是一个开源工具，用于给访问者浏览器提供最佳体验。使用此工具，你可以检测访问者的浏览器是否支持 HTML5 功能，并加载相应的脚本。</li>
<li><strong>Adobe Edge Animate：</strong>  这是必须处理交互式 HTML 动画的 HTML5 开发人员的有用工具。它用于数字出版、网络和广告领域。此工具允许用户创建无瑕疵的动画，可以跨多个设备运行。</li>
<li><strong>Video.js：</strong>  这是一款基于 JavaScript 的 HTML5 视频播放器。如果要将视频添加到你的网站，你应该使用此工具。它使视频看起来不错，并且是网站的一部分。</li>
<li><strong>The W3 Validator：</strong>  W3 验证工具测试 HTML、XHTML、SMIL、MathML 等中的网站标记的有效性。要测试任何网站的标记有效性，你必须选择文档类型为 HTML5 并输入你网页的 URL。这样做之后，你的代码将被检查，并将提供所有错误和警告。</li>
<li><strong>HTML5 Reset：</strong>  此工具允许开发人员在 HTML5 中重写旧网站的代码。你可以使用这些工具为你网站的访问者提供一个良好的网络体验。</li>
</ul>
<hr>
<p>Palak Shah</p>
<p>作者是高级软件工程师。她喜欢探索新技术，学习创新概念。她也喜欢哲学。你可以通过 <a href="mailto:palak311@gmail.com">palak311@gmail.com</a> 联系她。</p>
<hr>
<p>via: <a href="http://opensourceforu.com/2017/06/introduction-to-html5/">http://opensourceforu.com/2017/06/introduction-to-html5/</a></p>
<p>作者：<a href="http://opensourceforu.com/author/palak-shah/">Palak Shah</a> 译者：<a href="https://github.com/geekpi">geekpi</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于 HTML5 你需要了解的基础知识

## 原文链接
[https://www.zcfy.cc/article/what-all-you-need-to-know-about-html5](https://www.zcfy.cc/article/what-all-you-need-to-know-about-html5)

