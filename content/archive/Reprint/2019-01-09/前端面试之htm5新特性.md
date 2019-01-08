---
title: '前端面试之htm5新特性' 
date: 2019-01-09 2:30:12
hidden: true
slug: 4vzftx4i1hu
categories: [reprint]
---

{{< raw >}}

                    
<p>今天来谈谈前端面试中基本上每次一面的时候都会被问到的一个问题，那就是html5的新特性。这个是学习前端必须掌握的基础知识。</p>
<h1 id="articleHeader0">新增的元素</h1>
<p>html5新增了一些语义化更好的标签元素。</p>
<h2 id="articleHeader1">结构元素</h2>
<ol>
<li><p>article元素，表示页面中的一块与上下文不相关的独立内容，比如博客中的一篇文章。</p></li>
<li><p>aside元素，表示article内容之外的内容，辅助信息。</p></li>
<li><p>header元素，表示页面中一个内容区块或整个页面的页眉。</p></li>
<li><p>hgroup元素，用于对页面中一个区块或整个页面的标题进行组合。</p></li>
<li><p>footer元素，表示页面中一个内容区块或整个页面的页脚。</p></li>
<li><p>figure元素，表示媒介内容的分组，以及它们的标题。</p></li>
<li><p>section元素，表示页面中一个内容区块，比如章节。</p></li>
<li><p>nav元素，表示页面中的导航链接。</p></li>
</ol>
<h2 id="articleHeader2">其他元素</h2>
<ol>
<li><p>video元素，用来定义视频。</p></li>
<li><p>audio元素，用来定义音频。</p></li>
<li><p>canvas元素，用来展示图形，该元素本身没有行为，仅提供一块画布。</p></li>
<li><p>embed元素，用来插入各种多媒体，格式可以是Midi、Wav、AIFF、AU、MP3等。</p></li>
<li><p>mark元素，用来展示高亮的文字。</p></li>
<li><p>progress元素，用来展示任何类型的任务的进度。</p></li>
<li><p>meter元素，表示度量衡，定义预定义范围内的度量。</p></li>
<li><p>time元素，用来展示日期或者时间。</p></li>
<li><p>command元素，表示命令按钮。</p></li>
<li><p>details元素，用来展示用户要求得到并且可以得到的细节信息。</p></li>
<li><p>summary元素，用来为details元素定义可见的标题。</p></li>
<li><p>datalist元素，用来展示可选的数据列表，与input元素配合使用，可以制作出输入值的下拉列表。</p></li>
<li><p>datagrid元素，也用来展示可选的数据列表，以树形列表的形式来显示。</p></li>
<li><p>keygen元素，表示生成密匙。</p></li>
<li><p>output元素，表示不同类型的输出。</p></li>
<li><p>source元素，为媒介元素定义媒介资源。</p></li>
<li><p>menu元素，表示菜单列表。</p></li>
<li><p>ruby元素，表示ruby注释， rt元素表示字符的解释或发音。    rp元素在ruby注释中使用，以定义不支持ruby元素的浏览器所显示的内容。</p></li>
<li><p>wbr元素，表示软换行。与br元素的区别是：br元素表示此处必须换行，而wbr元素的意思是浏览器窗口或父级元素的宽度够宽时。不进行换行，而当宽度不够时，主动在此处进行换行。</p></li>
<li><p>bdi元素，定义文本的文本方向，使其脱离其周围文本的方向设置。</p></li>
<li><p>dialog元素，表示对话框或窗口。</p></li>
</ol>
<h1 id="articleHeader3">废除的元素</h1>
<p>html5中废除了一些纯表现的元素，只有部分浏览器支持的元素还有一些会对可用性产生负面影响的元素。</p>
<h2 id="articleHeader4">纯表现元素</h2>
<p>纯表现的元素就是那些可以用css替代的元素。basefont、big、center、font、s、strike、tt、u这些元素，他们的功能都是纯粹为页面展示服务的，html5提倡把页面展示性功能放在css样式表中统一处理，所以将这些元素废除，用css样式进行替代。</p>
<h2 id="articleHeader5">对可用性产生负面影响的元素</h2>
<p>对于frameset元素、frame元素与noframes元素，由于frame框架对网页可用性存在负面影响，在html5中已不支持frame框架，只支持iframe框架，html5中同时将frameset、frame和noframes这三个元素废除。</p>
<h2 id="articleHeader6">只有部分浏览器支持的元素</h2>
<p>对于applet、bgsound、blink、marquee等元素，由于只有部分浏览器支持，特别是bgsound元素以及marquee元素，只被IE支持，所以在html5中被废除。其中applet元素可由embed元素或object元素替代，bgsound元素可由audio元素替代，marquee可以由javascript编程的方式替代。</p>
<h1 id="articleHeader7">新增的API</h1>
<h2 id="articleHeader8">Canvas API</h2>
<p>上文提到的canvas元素可以为页面提供一块画布来展示图形。结合Canvas API，就可以在这块画布上动态生成和展示各种图形、图表、图像以及动画了。Canvas本质上是位图画布，不可缩放，绘制出来的对象不属于页面DOM结构或者任何命名空间。不需要将每个图元当做对象存储，执行性能非常好。</p>
<p>利用Canvas API进行绘图，首先要获取canvas元素的上下文，然后用该上下文中封装的各种绘图功能进行绘图。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<canvas id=&quot;canvas&quot;>替代内容</canvas>
<script>
    var canvas = document.getElementById('canvas');
    var context =canvas.getContext(&quot;2d&quot;); // 获取上下文
    //设置纯色
    context.fillStyle = &quot;red&quot;;
    context.strokeStyle = &quot;blue&quot;;
    // 实践表明在不设置fillStyle下的默认fillStyle为black
    context.fillRect(0, 0, 100, 100);
    // 实践表明在不设置strokeStyle下的默认strokeStyle为black
    context.strokeRect(120, 0, 100, 100);
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html5"><span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"canvas"</span>&gt;</span>替代内容<span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'canvas'</span>);
    <span class="hljs-keyword">var</span> context =canvas.getContext(<span class="hljs-string">"2d"</span>); <span class="hljs-comment">// 获取上下文</span>
    <span class="hljs-comment">//设置纯色</span>
    context.fillStyle = <span class="hljs-string">"red"</span>;
    context.strokeStyle = <span class="hljs-string">"blue"</span>;
    <span class="hljs-comment">// 实践表明在不设置fillStyle下的默认fillStyle为black</span>
    context.fillRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">100</span>, <span class="hljs-number">100</span>);
    <span class="hljs-comment">// 实践表明在不设置strokeStyle下的默认strokeStyle为black</span>
    context.strokeRect(<span class="hljs-number">120</span>, <span class="hljs-number">0</span>, <span class="hljs-number">100</span>, <span class="hljs-number">100</span>);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h2 id="articleHeader9">SVG</h2>
<p>SVG是html5的另一项图形功能，它是一种标准的矢量图形，是一种文件格式，有自己的API。html5引入了内联SVG，使得SVG元素可以直接出现在html标记中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<svg height=100 width=100><circle cx=50 cy=50 r=50 /></svg>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html5" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">height</span>=<span class="hljs-string">100</span> <span class="hljs-attr">width</span>=<span class="hljs-string">100</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">circle</span> <span class="hljs-attr">cx</span>=<span class="hljs-string">50</span> <span class="hljs-attr">cy</span>=<span class="hljs-string">50</span> <span class="hljs-attr">r</span>=<span class="hljs-string">50</span> /&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span></code></pre>
<h2 id="articleHeader10">音频和视频</h2>
<p>audio和video元素的出现让html5的媒体应用多了新选择，开发人员不必使用插件就能播放音频和视频。对于这两个元素，html5规范提供了通用、完整、可脚本化控制的API。<br>html5规范出来之前，在页面中播放视频的典型方式是使用Flash、QuickTime或者Windows Media插件往html中嵌入音频视频，相对这种方式，使用html5的媒体标签有两大好处。</p>
<ol>
<li><p>作为浏览器原生支持的功能，新的audio和video元素无需安装。</p></li>
<li><p>媒体元素想Web页面提供了通用、集成和可脚本化控制的API。</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<video src=&quot;video.webm&quot; controls>
    <object data=&quot;videoplayer.swf&quot; type=&quot;application/x-shockwave-flash&quot;>
        <param name=&quot;movie&quot; value=&quot;video.swf&quot; />
    </object>
    Your browser does not support HTML5 video.
</video>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html5"><span class="hljs-tag">&lt;<span class="hljs-name">video</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"video.webm"</span> <span class="hljs-attr">controls</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">object</span> <span class="hljs-attr">data</span>=<span class="hljs-string">"videoplayer.swf"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"application/x-shockwave-flash"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">param</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"movie"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"video.swf"</span> /&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">object</span>&gt;</span>
    Your browser does not support HTML5 video.
<span class="hljs-tag">&lt;/<span class="hljs-name">video</span>&gt;</span></code></pre>
<h3 id="articleHeader11">浏览器支持性检测</h3>
<p>浏览器检测是否支持audio元素或者video元素最简单的方式是用脚本动态创建它，然后检测特定函数是否存在。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var hasVideo = !!(document.createElement('video').canPlayType);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> hasVideo = !!(<span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'video'</span>).canPlayType);</code></pre>
<h2 id="articleHeader12">Geolocation API</h2>
<p>html5的Geolocation API（地理定位API），可以请求用户共享他们的位置。使用方法非常简单，如果用户同意，浏览器就会返回位置信息，该位置信息是通过支持html5地理定位功能的底层设备（如笔记本电脑或手机）提供给浏览器的。位置信息由纬度、经度坐标和一些其他元数据组成。</p>
<h3 id="articleHeader13">位置信息从何而来</h3>
<p>Geolocation API不指定设备使用哪种底层技术来定位应用程序的用户。相反，它只是用于检索位置信息的API，而且通过该API检索到的数据只具有某种程度的准确性，并不能保证设备返回的位置是精确的。设备可以使用下列数据源：</p>
<ol>
<li><p>IP地址</p></li>
<li>
<p>三维坐标</p>
<ol>
<li><p>GPS</p></li>
<li><p>从RFID、WiFi和蓝牙到WiFi的MAC地址</p></li>
<li><p>GSM或CDMA手机的ID</p></li>
</ol>
</li>
<li><p>用户自定义数据</p></li>
</ol>
<h3 id="articleHeader14">使用方法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 一次更新
navigator.geolocation.getCurrentPosition(updateLocation, handleLocationEror);
function updateLocation(position) {
    var latitude = position.coords.latitude;     // 纬度
    var longitude = position.coords.longitude;   // 经度
    var accuracy = position.coords.accuracy;     // 准确度
    var timestamp = position.coords.timestamp;   // 时间戳
}
// 错误处理函数
function handleLocationEror(error) {
    ....
}
// 重复更新
navigator.geolocation.watchPosition(updateLocation, handleLocationEror);
// 不再接受位置更新
navigator.geolocation.clearWatch(watchId);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 一次更新</span>
navigator.geolocation.getCurrentPosition(updateLocation, handleLocationEror);
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">updateLocation</span>(<span class="hljs-params">position</span>) </span>{
    <span class="hljs-keyword">var</span> latitude = position.coords.latitude;     <span class="hljs-comment">// 纬度</span>
    <span class="hljs-keyword">var</span> longitude = position.coords.longitude;   <span class="hljs-comment">// 经度</span>
    <span class="hljs-keyword">var</span> accuracy = position.coords.accuracy;     <span class="hljs-comment">// 准确度</span>
    <span class="hljs-keyword">var</span> timestamp = position.coords.timestamp;   <span class="hljs-comment">// 时间戳</span>
}
<span class="hljs-comment">// 错误处理函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleLocationEror</span>(<span class="hljs-params">error</span>) </span>{
    ....
}
<span class="hljs-comment">// 重复更新</span>
navigator.geolocation.watchPosition(updateLocation, handleLocationEror);
<span class="hljs-comment">// 不再接受位置更新</span>
navigator.geolocation.clearWatch(watchId);</code></pre>
<h2 id="articleHeader15">Communication API</h2>
<h3 id="articleHeader16">跨文档消息传递</h3>
<p>出于安全方面的考虑，运行在同一浏览器中的框架、标签页、窗口间的通信一直都受到了严格的限制。然而，现实中存在一些合理的让不同站点的内容能在浏览器内进行交互的需求。这种情形下，如果浏览器内部能提供直接的通信机制，就能更好地组织这些应用。<br>html5中引入了一种新功能，跨文档消息通信，可以确保iframe、标签页、窗口间安全地进行跨源通信。postMessage API为发送消息的标准方式，发送消息非常简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.postMessage('Hello, world', 'http://www.example.com/');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">window</span>.postMessage(<span class="hljs-string">'Hello, world'</span>, <span class="hljs-string">'http://www.example.com/'</span>);</code></pre>
<p>接收消息时，仅需在页面中增加一个事件处理函数。当某个消息到达时，通过检查消息的来源来决定是否对这条消息进行处理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.addEventListener(&quot;message&quot;, messageHandler, true);
function messageHandler(e) {
    switch(e.origin) {
        case &quot;friend.example.com&quot;:
        // 处理消息
        processMessage(e.data);
        break;
    default: 
        // 消息来源无法识别
        // 消息被忽略
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">"message"</span>, messageHandler, <span class="hljs-literal">true</span>);
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">messageHandler</span>(<span class="hljs-params">e</span>) </span>{
    <span class="hljs-keyword">switch</span>(e.origin) {
        <span class="hljs-keyword">case</span> <span class="hljs-string">"friend.example.com"</span>:
        <span class="hljs-comment">// 处理消息</span>
        processMessage(e.data);
        <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">default</span>: 
        <span class="hljs-comment">// 消息来源无法识别</span>
        <span class="hljs-comment">// 消息被忽略</span>
    }
}</code></pre>
<p>消息事件是一个拥有data(数据)和origin(源)属性的DOM事件。data属性是发送方传递的实际消息，而origin属性是发送来源。</p>
<h3 id="articleHeader17">XMLHttpRequest Level2</h3>
<p>XMLHttpRequest API使得Ajax技术成为可能，作为XMLHttpRequest的改进版，XMLHttpRequest Level2在功能上有了很大的改进。主要两个方面：</p>
<ol>
<li><p>跨源XMLHttpRequest</p></li>
<li><p>进度事件</p></li>
</ol>
<h4>跨源XMLHttpRequest</h4>
<p>过去，XMLHttpRequest仅限于同源通信，XMLHttpRequest Level2通过CORS实现了跨源XMLHttpRequest。跨源HTTP请求包含一个Origin头部，它为服务器提供HTTP请求的源信息。</p>
<h2 id="articleHeader18">WebSockets API</h2>
<p>WebSockets是html5中最强大的通信功能，它定义了一个全双工通信信道，仅通过Web上的一个Socket即可进行通信。</p>
<h3 id="articleHeader19">WebSockets握手</h3>
<p>为了建立WebSockets通信，客户端和服务器在初始握手时，将HTTP协议升级到WebSocket协议。一旦连接建立成功，就可以在全双工模式下在客户端和服务器之间来回传递WebSocket消息。</p>
<h3 id="articleHeader20">WebSockets接口</h3>
<p>除了对WebSockets协议定义外，该规范还同时定义了用于JavaScript应用程序的WebSocket接口。WebSockets接口的使用很简单。要连接远程主机，只需要新建一个WebSocket实例，提供希望连接的对端URL。</p>
<h2 id="articleHeader21">Forms API</h2>
<h3 id="articleHeader22">新表单元素</h3>
<ol>
<li><p>tel元素，表示电话号码。</p></li>
<li><p>email元素，表示电子邮件地址文本框。</p></li>
<li><p>url元素，表示网页的url。</p></li>
<li><p>search元素，用于搜索引擎，比如在站点顶部显示的搜索框。</p></li>
<li><p>range元素，特定值范围内的数值选择器，典型的显示方式是滑动条。</p></li>
<li><p>number元素，只包含数值的字段。</p></li>
</ol>
<h3 id="articleHeader23">未来的表单元素</h3>
<ol>
<li><p>color元素，颜色选择器，基于调色盘或者取色板进行选择。</p></li>
<li><p>datetime元素，显示完整的日期和时间，包括时区。</p></li>
<li><p>datetime-local，显示日期和时间。</p></li>
<li><p>time元素，不含时区的时间选择器和指示器。</p></li>
<li><p>date元素，日期选择器。</p></li>
<li><p>week元素，某年中的周选择器。</p></li>
<li><p>month元素，某年中的月选择器。</p></li>
</ol>
<h3 id="articleHeader24">新的表单特性和函数</h3>
<h4>placeholder</h4>
<p>当用户还没输入值的时候，输入型控件可以通过placeholder特性向用户显示描述性说明或者提示信息。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input name=&quot;name&quot; placeholder=&quot;First and last name&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html5" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"name"</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"First and last name"</span>&gt;</span></code></pre>
<h4>autocomplete</h4>
<p>浏览器通过autocomplete特性能够知晓是否应该保存输入值以备将来使用。</p>
<h4>autofocus</h4>
<p>通过autofocus特性可以指定某个表单元素获得输入焦点，每个页面上只允许出现一个autofocus特性，如果设置了多个，则相当于未指定此行为。</p>
<h4>spellcheck</h4>
<p>可对带有文本内容的输入控件和textarea空间控制spellcheck属性。设置完后，会询问浏览器是否应该给出拼写检查结果反馈。spellcheck属性需要赋值。</p>
<h4>list特性和datalist元素</h4>
<p>通过组合使用list特性和datalist元素，开发人员能够为某个输入型控件构造一张选值列表。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<datalist id=&quot;contactList&quot;>
    <option value=&quot;a@qq.com&quot;></option>
    <option value=&quot;b@qq.com&quot;></option>
</datalist>
<input type=&quot;email&quot; id=&quot;contatcs&quot; list=&quot;contactList&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html5"><span class="hljs-tag">&lt;<span class="hljs-name">datalist</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"contactList"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"a@qq.com"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"b@qq.com"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">datalist</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"email"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"contatcs"</span> <span class="hljs-attr">list</span>=<span class="hljs-string">"contactList"</span>&gt;</span></code></pre>
<h4>min和max</h4>
<p>通过设置min和max特性，可以将range输入框的数值输入范围限定在最低值和最高值之间。可以只设置一个，也可以两个都设置，也可以都不设置。</p>
<h4>step</h4>
<p>对于输入型控件，设置其step特性能够指定输入值递增或者递减的粒度。</p>
<h4>required</h4>
<p>一旦为某输入型控件设置了required特性，那么此项必填，否则无法提交表单。</p>
<h2 id="articleHeader25">拖放API</h2>
<h3 id="articleHeader26">draggable属性</h3>
<p>如果网页元素的draggable元素为true，这个元素就是可以拖动的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div draggable=&quot;true&quot;>Draggable Div</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html5" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">draggable</span>=<span class="hljs-string">"true"</span>&gt;</span>Draggable Div<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<h3 id="articleHeader27">拖放事件</h3>
<p>拖动过程会触发很多事件，主要有下面这些：</p>
<ol>
<li><p>dragstart：网页元素开始拖动时触发。</p></li>
<li><p>drag：被拖动的元素在拖动过程中持续触发。</p></li>
<li><p>dragenter：被拖动的元素进入目标元素时触发，应在目标元素监听该事件。</p></li>
<li><p>dragleave：被拖动的元素离开目标元素时触发，应在目标元素监听该事件。</p></li>
<li><p>dragover：被拖动元素停留在目标元素之中时持续触发，应在目标元素监听该事件。</p></li>
<li><p>drap：被拖动元素或从文件系统选中的文件，拖放落下时触发。</p></li>
<li><p>dragend：网页元素拖动结束时触发。</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="draggableElement.addEventListener('dragstart', function(e) {
    console.log('拖动开始！');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">draggableElement.addEventListener(<span class="hljs-string">'dragstart'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'拖动开始！'</span>);
});</code></pre>
<h3 id="articleHeader28">dataTransfer对象</h3>
<p>拖动过程中，回调函数接受的事件参数，有一个dataTransfer属性，指向一个对象，包含与拖动相关的各种信息。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="draggableElement.addEventListener('dragstart', function(event) {
    event.dataTransfer.setData('text', 'Hello World!');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">draggableElement.addEventListener(<span class="hljs-string">'dragstart'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
    event.dataTransfer.setData(<span class="hljs-string">'text'</span>, <span class="hljs-string">'Hello World!'</span>);
});</code></pre>
<p>dataTransfer对象的属性有：</p>
<ol>
<li><p>dropEffect：拖放的操作类型，决定了浏览器如何显示鼠标形状，可能的值为copy、move、link和none。</p></li>
<li><p>effectAllowed：指定所允许的操作，可能的值为copy、move、link、copyLink、copyMove、linkMove、all、none和uninitialized（默认值，等同于all，即允许一切操作）。</p></li>
<li><p>files：包含一个FileList对象，表示拖放所涉及的文件，主要用于处理从文件系统拖入浏览器的文件。</p></li>
<li><p>types：储存在DataTransfer对象的数据的类型。</p></li>
</ol>
<p>dataTransfer对象的方法有：</p>
<ol>
<li><p>setData(format, data)：在dataTransfer对象上储存数据。第一个参数format用来指定储存的数据类型，比如text、url、text/html等。</p></li>
<li><p>getData(format)：从dataTransfer对象取出数据。</p></li>
<li><p>clearData(format)：清除dataTransfer对象所储存的数据。如果指定了format参数，则只清除该格式的数据，否则清除所有数据。</p></li>
<li><p>setDragImage(imgElement, x, y)：指定拖动过程中显示的图像。默认情况下，许多浏览器显示一个被拖动元素的半透明版本。参数imgElement必须是一个图像元素，而不是指向图像的路径，参数x和y表示图像相对于鼠标的位置。</p></li>
</ol>
<h2 id="articleHeader29">Web Workers API</h2>
<p>Javascript是单线程的。因此，持续时间较长的计算，回阻塞UI线程，进而导致无法在文本框中填入文本，单击按钮等，并且在大多数浏览器中，除非控制权返回，否则无法打开新的标签页。该问题的解决方案是Web Workers，可以让Web应用程序具备后台处理能力，对多线程的支持性非常好。</p>
<p>但是在Web Workers中执行的脚本不能访问该页面的window对象，也就是Web Workers不能直接访问Web页面和DOM API。虽然Web Workers不会导致浏览器UI停止响应，但是仍然会消耗CPU周期，导致系统反应速度变慢。</p>
<h2 id="articleHeader30">Web Storage API</h2>
<p>Web Storage是html5引入的一个非常重要的功能，可以在客户端本地存储数据，类似html4的cookie，但可实现功能要比cookie强大的多。</p>
<h3 id="articleHeader31">sessionStorage</h3>
<p>sessionStorage将数据保存在session中，浏览器关闭数据就消失。</p>
<h3 id="articleHeader32">localStorage</h3>
<p>localStorage则一直将数据保存在客户端本地，除非手动删除，否则一直保存。<br>不管是sessionStorage，还是localStorage，可使用的API相同，常用的有如下几个（以localStorage为例）：</p>
<ol>
<li><p>保存数据：localStorage.setItem(key,value);</p></li>
<li><p>读取数据：localStorage.getItem(key);</p></li>
<li><p>删除单个数据：localStorage.removeItem(key);</p></li>
<li><p>删除所有数据：localStorage.clear();</p></li>
<li><p>得到某个索引的key：localStorage.key(index);</p></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端面试之htm5新特性

## 原文链接
[https://segmentfault.com/a/1190000010081812](https://segmentfault.com/a/1190000010081812)

