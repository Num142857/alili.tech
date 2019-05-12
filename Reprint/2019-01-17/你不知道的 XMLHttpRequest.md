---
title: '你不知道的 XMLHttpRequest' 
date: 2019-01-17 2:30:25
hidden: true
slug: emo34mxsncp
categories: [reprint]
---

{{< raw >}}

                    
<p>本文详细介绍了 XMLHttpRequest 相关知识，涉及内容：</p>
<ul>
<li><p>AJAX、XMLHTTP、XMLHttpRequest详解、XMLHttpRequest Level 1、Level 2 详解</p></li>
<li><p>XHR 上传、下载数据、XHR 流式传输、XHR 定时轮询和长轮询区别与优缺点、XMLHttpRequest 库 (Mock.js、Zone.js、Oboe.js、fetch.js)</p></li>
<li>
<p>XMLHttpRequest 常用代码片段：</p>
<ul>
<li><p>ArrayBuffer 对象转字符串</p></li>
<li><p>字符串转 ArrayBuffer 对象</p></li>
<li><p>创建 XHR 对象</p></li>
<li><p>sendAsBinary() polyfill</p></li>
<li><p>获取 XMLHttpRequest 响应体</p></li>
<li><p>获取 responseURL</p></li>
<li><p>验证请求是否成功</p></li>
<li><p>解析查询参数为Map对象</p></li>
<li><p>XHR 下载图片</p></li>
<li><p>XHR 上传图片</p></li>
<li><p>XHR 上传进度条</p></li>
</ul>
</li>
<li><p>分析 AJAX 请求状态为 0、GET请求方式为什么不能通过send() 方法发送请求体、简单请求和预请求、XMLHttpRequest对象垃圾回收机制、Get与Post请求区别、如何避免重复发送请求、AJAX 站点 SEO 优化等问题。</p></li>
</ul>
<h2 id="articleHeader0">AJAX</h2>
<h3 id="articleHeader1">AJAX 定义</h3>
<blockquote>
<p><strong>AJAX</strong>即“<strong>Asynchronous JavaScript and XML</strong>”（异步的<a href="https://zh.wikipedia.org/wiki/JavaScript" rel="nofollow noreferrer" target="_blank">JavaScript</a>与<a href="https://zh.wikipedia.org/wiki/XML" rel="nofollow noreferrer" target="_blank">XML</a>技术），指的是一套综合了多项技术的<a href="https://zh.wikipedia.org/wiki/%E7%80%8F%E8%A6%BD%E5%99%A8" rel="nofollow noreferrer" target="_blank">浏览器</a>端<a href="https://zh.wikipedia.org/wiki/%E7%B6%B2%E9%A0%81" rel="nofollow noreferrer" target="_blank">网页</a>开发技术。Ajax的概念由<a href="https://zh.wikipedia.org/wiki/%E5%82%91%E8%A5%BF%C2%B7%E8%A9%B9%E5%A7%86%E5%A3%AB%C2%B7%E8%B3%88%E7%91%9E%E7%89%B9" rel="nofollow noreferrer" target="_blank">杰西·詹姆士·贾瑞特</a>所提出。 </p>
<p>传统的Web应用允许用户端填写表单（form），当提交表单时就向<a href="https://zh.wikipedia.org/wiki/%E7%B6%B2%E9%A0%81%E4%BC%BA%E6%9C%8D%E5%99%A8" rel="nofollow noreferrer" target="_blank">网页服务器</a>发送一个请求。服务器接收并处理传来的表单，然后送回一个新的网页，但这个做法浪费了许多带宽，因为在前后两个页面中的大部分HTML码往往是相同的。由于每次应用的沟通都需要向服务器发送请求，应用的回应时间依赖于服务器的回应时间。这导致了用户界面的回应比本机应用慢得多。</p>
<p>与此不同，AJAX应用可以仅向服务器发送并取回必须的数据，并在客户端采用JavaScript处理来自服务器的回应。因为在服务器和浏览器之间交换的数据大量减少（大约只有原来的5%）<a href="https://zh.wikipedia.org/wiki/Wikipedia:%E5%88%97%E6%98%8E%E6%9D%A5%E6%BA%90" rel="nofollow noreferrer" target="_blank">[来源请求]</a>,服务器回应更快了。同时，很多的处理工作可以在发出请求的<a href="https://zh.wikipedia.org/wiki/%E5%AE%A2%E6%88%B7%E7%AB%AF" rel="nofollow noreferrer" target="_blank">客户端</a>机器上完成，因此Web服务器的负荷也减少了。</p>
<p>类似于<a href="https://zh.wikipedia.org/wiki/DHTML" rel="nofollow noreferrer" target="_blank">DHTML</a>或<a href="https://zh.wikipedia.org/wiki/LAMP" rel="nofollow noreferrer" target="_blank">LAMP</a>，AJAX不是指一种单一的技术，而是有机地利用了一系列相关的技术。虽然其名称包含XML，但实际上数据格式可以由<a href="https://zh.wikipedia.org/wiki/JSON" rel="nofollow noreferrer" target="_blank">JSON</a>代替，进一步减少数据量，形成所谓的AJAJ。而客户端与服务器也并不需要异步。一些基于AJAX的“派生／合成”式（derivative/composite）的技术也正在出现，如<a href="https://zh.wikipedia.org/wiki/AFLAX" rel="nofollow noreferrer" target="_blank">AFLAX</a>。 —— 维基百科</p>
</blockquote>
<h3 id="articleHeader2">AJAX 应用</h3>
<ul>
<li><p>运用<a href="https://zh.wikipedia.org/wiki/XHTML" rel="nofollow noreferrer" target="_blank">XHTML</a>+<a href="https://zh.wikipedia.org/wiki/CSS" rel="nofollow noreferrer" target="_blank">CSS</a>来表达信息；</p></li>
<li><p>运用<a href="https://zh.wikipedia.org/wiki/JavaScript" rel="nofollow noreferrer" target="_blank">JavaScript</a>操作<a href="https://zh.wikipedia.org/wiki/%E6%96%87%E4%BB%B6%E7%89%A9%E4%BB%B6%E6%A8%A1%E5%9E%8B" rel="nofollow noreferrer" target="_blank">DOM</a>（Document Object Model）来运行动态效果；</p></li>
<li><p>运用<a href="https://zh.wikipedia.org/wiki/XML" rel="nofollow noreferrer" target="_blank">XML</a>和<a href="https://zh.wikipedia.org/wiki/XSLT" rel="nofollow noreferrer" target="_blank">XSLT</a>操作数据</p></li>
<li><p>运用<a href="https://zh.wikipedia.org/wiki/XMLHttpRequest" rel="nofollow noreferrer" target="_blank">XMLHttpRequest</a>或新的Fetch API与<a href="https://zh.wikipedia.org/wiki/%E7%B6%B2%E9%A0%81%E4%BC%BA%E6%9C%8D%E5%99%A8" rel="nofollow noreferrer" target="_blank">网页服务器</a>进行异步数据交换；</p></li>
<li><p>注意：AJAX与<a href="https://zh.wikipedia.org/wiki/Flash" rel="nofollow noreferrer" target="_blank">Flash</a>、<a href="https://zh.wikipedia.org/wiki/Silverlight" rel="nofollow noreferrer" target="_blank">Silverlight</a>和<a href="https://zh.wikipedia.org/wiki/Java_Applet" rel="nofollow noreferrer" target="_blank">Java Applet</a>等<a href="https://zh.wikipedia.org/wiki/RIA" rel="nofollow noreferrer" target="_blank">RIA</a>技术是有区分的。</p></li>
</ul>
<h3 id="articleHeader3">AJAX 兼容性</h3>
<p><a href="https://zh.wikipedia.org/wiki/JavaScript" rel="nofollow noreferrer" target="_blank">JavaScript</a> 编程的最大问题来自不同的浏览器对各种技术和标准的支持。</p>
<p>XmlHttpRequest 对象在不同浏览器中不同的创建方法，以下是跨浏览器的通用方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Provide the XMLHttpRequest class for IE 5.x-6.x:
// Other browsers (including IE 7.x-8.x) ignore this
//   when XMLHttpRequest is predefined
var xmlHttp;
if (typeof XMLHttpRequest != &quot;undefined&quot;) {
    xmlHttp = new XMLHttpRequest();
} else if (window.ActiveXObject) {
    var aVersions = [&quot;Msxml2.XMLHttp.5.0&quot;, &quot;Msxml2.XMLHttp.4.0&quot;, 
        &quot;Msxml2.XMLHttp.3.0&quot;, &quot;Msxml2.XMLHttp&quot;, &quot;Microsoft.XMLHttp&quot;];
    for (var i = 0; i < aVersions.length; i++) {
        try {
            xmlHttp = new ActiveXObject(aVersions[i]);
            break;
        } catch (e) {}
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// Provide the XMLHttpRequest class for IE 5.x-6.x:</span>
<span class="hljs-comment">// Other browsers (including IE 7.x-8.x) ignore this</span>
<span class="hljs-comment">//   when XMLHttpRequest is predefined</span>
<span class="hljs-keyword">var</span> xmlHttp;
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> XMLHttpRequest != <span class="hljs-string">"undefined"</span>) {
    xmlHttp = <span class="hljs-keyword">new</span> XMLHttpRequest();
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.ActiveXObject) {
    <span class="hljs-keyword">var</span> aVersions = [<span class="hljs-string">"Msxml2.XMLHttp.5.0"</span>, <span class="hljs-string">"Msxml2.XMLHttp.4.0"</span>, 
        <span class="hljs-string">"Msxml2.XMLHttp.3.0"</span>, <span class="hljs-string">"Msxml2.XMLHttp"</span>, <span class="hljs-string">"Microsoft.XMLHttp"</span>];
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; aVersions.length; i++) {
        <span class="hljs-keyword">try</span> {
            xmlHttp = <span class="hljs-keyword">new</span> ActiveXObject(aVersions[i]);
            <span class="hljs-keyword">break</span>;
        } <span class="hljs-keyword">catch</span> (e) {}
    }
}</code></pre>
<p>详细信息请参考 - <a href="http://caniuse.com/#search=XMLHttpRequest" rel="nofollow noreferrer" target="_blank">Can I use XMLHttpRequest</a></p>
<h3 id="articleHeader4">AJAX/HTTP 库对比</h3>
<div class="table-wrap"><table>
<thead><tr>
<th> </th>
<th> </th>
<th>Support</th>
<th> </th>
<th> </th>
<th> </th>
<th>Features</th>
<th> </th>
<th> </th>
</tr></thead>
<tbody>
<tr>
<td> </td>
<td>All Browsers</td>
<td>Chrome &amp; Firefox1</td>
<td>Node</td>
<td>Concise Syntax</td>
<td>Promises</td>
<td>Native2</td>
<td>Single Purpose3</td>
<td>Formal Specification</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest" rel="nofollow noreferrer" target="_blank">XMLHttpRequest</a></td>
<td>✓</td>
<td>✓</td>
<td> </td>
<td> </td>
<td> </td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
</tr>
<tr>
<td><a href="https://nodejs.org/api/http.html" rel="nofollow noreferrer" target="_blank">Node HTTP</a></td>
<td> </td>
<td> </td>
<td>✓</td>
<td> </td>
<td> </td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
</tr>
<tr>
<td><a href="https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch" rel="nofollow noreferrer" target="_blank">fetch()</a></td>
<td> </td>
<td>✓</td>
<td> </td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
</tr>
<tr>
<td><a href="https://github.com/github/fetch" rel="nofollow noreferrer" target="_blank">Fetch polyfill</a></td>
<td>✓</td>
<td>✓</td>
<td> </td>
<td>✓</td>
<td>✓</td>
<td> </td>
<td>✓</td>
<td>✓</td>
</tr>
<tr>
<td><a href="https://github.com/bitinn/node-fetch" rel="nofollow noreferrer" target="_blank">node-fetch</a></td>
<td> </td>
<td> </td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
<td> </td>
<td>✓</td>
<td>✓</td>
</tr>
<tr>
<td><a href="https://github.com/matthew-andrews/isomorphic-fetch" rel="nofollow noreferrer" target="_blank">isomorphic-fetch</a></td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
<td> </td>
<td>✓</td>
<td>✓</td>
</tr>
<tr>
<td><a href="https://github.com/visionmedia/superagent" rel="nofollow noreferrer" target="_blank">superagent</a></td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
<td> </td>
<td> </td>
<td>✓</td>
<td> </td>
</tr>
<tr>
<td><a href="https://github.com/mzabriskie/axios" rel="nofollow noreferrer" target="_blank">axios</a></td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
<td> </td>
<td>✓</td>
<td> </td>
</tr>
<tr>
<td><a href="https://github.com/request/request" rel="nofollow noreferrer" target="_blank">request</a></td>
<td> </td>
<td> </td>
<td>✓</td>
<td>✓</td>
<td> </td>
<td> </td>
<td>✓</td>
<td> </td>
</tr>
<tr>
<td><a href="https://jquery.com/" rel="nofollow noreferrer" target="_blank">jQuery</a></td>
<td>✓</td>
<td>✓</td>
<td> </td>
<td>✓</td>
<td> </td>
<td> </td>
<td> </td>
<td> </td>
</tr>
<tr>
<td><a href="https://github.com/ded/reqwest" rel="nofollow noreferrer" target="_blank">reqwest</a></td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
<td>✓</td>
<td> </td>
<td>✓</td>
<td> </td>
</tr>
</tbody>
</table></div>
<p>1 <strong>Chrome &amp; Firefox</strong> are listed separately because they support <code>fetch()</code>: <a href="http://caniuse.com/fetch" rel="nofollow noreferrer" target="_blank">caniuse.com/fetch</a><br>2 <strong>Native:</strong> Meaning you can just use it - no need to include a library.<br>3 <strong>Single Purpose:</strong> Meaning this library or technology is ONLY used for AJAX / HTTP communication, nothing else.</p>
<p>详细信息请参考 - <a href="http://andrewhfarmer.com/ajax-libraries/" rel="nofollow noreferrer" target="_blank">AJAX/HTTP Library Comparison</a></p>
<h2 id="articleHeader5">XMLHTTP</h2>
<h3 id="articleHeader6">XMLHTTP 定义</h3>
<blockquote>
<p><strong>XMLHTTP</strong> 是一组<a href="https://zh.wikipedia.org/wiki/API" rel="nofollow noreferrer" target="_blank">API</a>函数集，可被<a href="https://zh.wikipedia.org/wiki/JavaScript" rel="nofollow noreferrer" target="_blank">JavaScript</a>、JScript、<a href="https://zh.wikipedia.org/wiki/VBScript" rel="nofollow noreferrer" target="_blank">VBScript</a>以及其它<a href="https://zh.wikipedia.org/wiki/Web%E6%B5%8F%E8%A7%88%E5%99%A8" rel="nofollow noreferrer" target="_blank">web浏览器</a>内嵌的<a href="https://zh.wikipedia.org/wiki/%E8%84%9A%E6%9C%AC%E8%AF%AD%E8%A8%80" rel="nofollow noreferrer" target="_blank">脚本语言</a>调用，通过<a href="https://zh.wikipedia.org/wiki/HTTP" rel="nofollow noreferrer" target="_blank">HTTP</a>在浏览器和<a href="https://zh.wikipedia.org/wiki/Web%E6%9C%8D%E5%8A%A1%E5%99%A8" rel="nofollow noreferrer" target="_blank">web服务器</a>之间收发<a href="https://zh.wikipedia.org/wiki/XML" rel="nofollow noreferrer" target="_blank">XML</a>或其它数据。XMLHTTP最大的好处在于可以动态地更新网页，它无需重新从服务器读取整个网页，也不需要安装额外的插件。该技术被许多网站使用，以实现快速响应的动态网页应用。例如：<a href="https://zh.wikipedia.org/wiki/Google" rel="nofollow noreferrer" target="_blank">Google</a>的<a href="https://zh.wikipedia.org/wiki/Gmail" rel="nofollow noreferrer" target="_blank">Gmail</a>服务、Google Suggest动态查找界面以及<a href="https://zh.wikipedia.org/wiki/Google%E5%9C%B0%E5%9B%BE" rel="nofollow noreferrer" target="_blank">Google Map</a>地理信息服务。</p>
<p>XMLHTTP是<strong>AJAX</strong>网页开发技术的重要组成部分。除XML之外，XMLHTTP还能用于获取其它格式的数据，如<a href="https://zh.wikipedia.org/wiki/JSON" rel="nofollow noreferrer" target="_blank">JSON</a>或者甚至纯文本。—— 维基百科</p>
</blockquote>
<h3 id="articleHeader7">XMLHTTP 背景知识</h3>
<blockquote>
<p>XMLHTTP最初是由微软公司发明的，在<a href="https://zh.wikipedia.org/wiki/Internet_Explorer" rel="nofollow noreferrer" target="_blank">Internet Explorer</a>&nbsp;5.0中用作<a href="https://zh.wikipedia.org/wiki/ActiveX" rel="nofollow noreferrer" target="_blank">ActiveX</a>对象，可通过JavaScript、VBScript或其它浏览器支持的脚本语言访问。<a href="https://zh.wikipedia.org/wiki/Mozilla" rel="nofollow noreferrer" target="_blank">Mozilla</a>的开发人员后来在Mozilla 1.0中实现了一个兼容的版本。之后苹果电脑公司在<a href="https://zh.wikipedia.org/wiki/Safari" rel="nofollow noreferrer" target="_blank">Safari</a>&nbsp;1.2中开始支持XMLHTTP，而<a href="https://zh.wikipedia.org/wiki/Opera" rel="nofollow noreferrer" target="_blank">Opera</a>从8.0版开始也宣布支持XMLHTTP。</p>
<p>大多数使用了XMLHTTP的设计良好的网页，会使用简单的JavaScript函数，将不同浏览器之间调用XMLHTTP的差异性屏蔽，该函数会自动检测浏览器版本并隐藏不同环境的差异。</p>
<p>在<a href="https://zh.wikipedia.org/wiki/DOM" rel="nofollow noreferrer" target="_blank">DOM</a>&nbsp;3（文档对象模型 Level 3）的读取和保存规范（Load and Save Specification）中也有类似的功能，它已经成为<a href="https://zh.wikipedia.org/wiki/W3C" rel="nofollow noreferrer" target="_blank">W3C</a>推荐的方法。截止2011年，大多数浏览器已经支持。—— 维基百科</p>
</blockquote>
<h3 id="articleHeader8">XMLHTTP 实现</h3>
<ul>
<li><p>ActiveXObject</p></li>
<li><p>XMLHttpRequest</p></li>
</ul>
<h4>什么是 ActiveX 控件</h4>
<p>Microsoft ActiveX 控件是由软件提供商开发的可重用的软件组件。使用 ActiveX 控件，可以很快地在网址、台式应用程序、以及开发工具中加入特殊的功能。例如，StockTicker 控件可以用来在网页上即时地加入活动信息，动画控件可用来向网页中加入动画特性。</p>
<h4>ActiveXObject 对象</h4>
<p>JavaScript 中 ActiveXObject 对象是启用并返回 Automation 对象的引用。</p>
<p><strong>ActiveXObject 语法</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="newObj = new ActiveXObject(servername.typename[, location])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">newObj = <span class="hljs-keyword">new</span> ActiveXObject(servername.typename[, location])</code></pre>
<p>参数：</p>
<ul>
<li>
<p>newObj</p>
<ul><li><p>必选 - ActiveXObject&nbsp;分配到的变量名称</p></li></ul>
</li>
<li>
<p>servername</p>
<ul><li><p>必选 - 提供对象的应用程序名称</p></li></ul>
</li>
<li>
<p>typename</p>
<ul><li><p>必选 - 要创建的对象的类型或类</p></li></ul>
</li>
<li>
<p>location</p>
<ul><li><p>可选 - 要再其中创建对象的网络服务器的名称</p></li></ul>
</li>
</ul>
<p><strong>ActiveXObject 使用</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 在IE5.x和IE6下创建xmlHttp对象
// servername - MSXML2
// typename - XMLHTTP.3.0
var xmlHttp = new ActiveXObject('MSXML2.XMLHTTP.3.0');
xmlHttp.open(&quot;GET&quot;, &quot;http://localhost/books.xml&quot;, false);  
xmlHttp.send();  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 在IE5.x和IE6下创建xmlHttp对象</span>
<span class="hljs-comment">// servername - MSXML2</span>
<span class="hljs-comment">// typename - XMLHTTP.3.0</span>
<span class="hljs-keyword">var</span> xmlHttp = <span class="hljs-keyword">new</span> ActiveXObject(<span class="hljs-string">'MSXML2.XMLHTTP.3.0'</span>);
xmlHttp.open(<span class="hljs-string">"GET"</span>, <span class="hljs-string">"http://localhost/books.xml"</span>, <span class="hljs-literal">false</span>);  
xmlHttp.send();  </code></pre>
<p>详细信息可以参考 - <a href="https://msdn.microsoft.com/zh-cn/library/7sw4ddf8(v=vs.94" rel="nofollow noreferrer" target="_blank">msdn - JavaScript 对象 - ActiveXObject 对象</a>.aspx)</p>
<h4>XMLHttpRequest</h4>
<p>XMLHttpRequest 是一个API, 它为客户端提供了在客户端和服务器之间传输数据的功能。它提供了一个通过 URL 来获取数据的简单方式，并且不会使整个页面刷新。这使得网页只更新一部分页面而不会打扰到用户。XMLHttpRequest 在&nbsp;<a href="https://developer.mozilla.org/zh-CN/docs/AJAX" rel="nofollow noreferrer" target="_blank">AJAX&nbsp;</a>中被大量使用。</p>
<p>XMLHttpRequest 是一个&nbsp;<a href="https://developer.mozilla.org/zh-cn/JavaScript" rel="nofollow noreferrer" target="_blank">JavaScript</a>&nbsp;对象，它最初由微软设计,随后被 Mozilla、Apple 和 Google采纳. 如今,该对象已经被&nbsp;<a href="http://www.w3.org/TR/XMLHttpRequest/" rel="nofollow noreferrer" target="_blank">W3C组织标准化</a>. 通过它,你可以很容易的取回一个URL上的资源数据. 尽管名字里有XML, 但&nbsp;XMLHttpRequest&nbsp;可以取回所有类型的数据资源，并不局限于XML。 而且除了<a href="https://developer.mozilla.org/zh-cn/HTTP" rel="nofollow noreferrer" target="_blank">HTTP</a>&nbsp;,它还支持<code>file</code>&nbsp;和&nbsp;<code>ftp</code>&nbsp;协议。</p>
<p><strong>XMLHttpRequest 语法</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var req = new XMLHttpRequest();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> req = <span class="hljs-keyword">new</span> XMLHttpRequest();</code></pre>
<p><strong>XMLHttpRequest 使用</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr = new XMLHttpRequest(); // 创建xhr对象
xhr.open( method, url );
xhr.onreadystatechange = function () { ... };
xhr.setRequestHeader( ..., ... );
xhr.send( optionalEncodedData );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest(); <span class="hljs-comment">// 创建xhr对象</span>
xhr.open( method, url );
xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ ... };
xhr.setRequestHeader( ..., ... );
xhr.send( optionalEncodedData );</code></pre>
<h2 id="articleHeader9">XMLHttpRequest 详解</h2>
<h3 id="articleHeader10">构造函数</h3>
<p>用于初始化一个 XMLHttpRequest 对象，必须在所有其它方法被调用前调用构造函数。使用示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var req = new XMLHttpRequest();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> req = <span class="hljs-keyword">new</span> <span class="hljs-type">XMLHttpRequest</span>();</code></pre>
<h3 id="articleHeader11">属性</h3>
<ul>
<li><p>onreadystatechange:  Function - 当 readyState 属性改变时会调用它。</p></li>
<li><p>readyState:  unsigned short - 用于表示请求的五种状态：</p></li>
</ul>
<table>
<thead><tr>
<th>值</th>
<th>状态</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td>0</td>
<td>UNSENT (未打开)</td>
<td>表示已创建 XHR 对象，open() 方法还未被调用</td>
</tr>
<tr>
<td>1</td>
<td>OPENED (未发送)</td>
<td>open() 方法已被成功调用，send() 方法还未被调用</td>
</tr>
<tr>
<td>2</td>
<td>HEADERS_RECEIVED (已获取响应头)</td>
<td>send() 方法已经被调用，响应头和响应状态已经返回</td>
</tr>
<tr>
<td>3</td>
<td>LOADING (正在下载响应体)</td>
<td>响应体下载中，responseText中已经获取了部分数据</td>
</tr>
<tr>
<td>4</td>
<td>DONE (请求完成)</td>
<td>整个请求过程已经完毕</td>
</tr>
</tbody>
</table>
<ul>
<li><p>response: varies - 响应体的类型由 responseType 来指定，可以是 ArrayBuffer、Blob、Document、JSON，或者是字符串。如果请求未完成或失败，则该值为 null。</p></li>
<li><p>response: varies - 响应体的类型由 responseType 来指定，可以是 ArrayBuffer、Blob、Document、JSON，或者是字符串。如果请求未完成或失败，则该值为 null。</p></li>
<li><p>responseText: DOMString - 此请求的响应为文本，或者当请求未成功或还是未发送时未 null <strong>(只读)</strong></p></li>
<li><p>responseType: XMLHttpRequestResponseType - 设置该值能够改变响应类型，就是告诉服务器你期望的响应格式：</p></li>
</ul>
<table>
<thead><tr>
<th>值</th>
<th>响应数据类型</th>
</tr></thead>
<tbody>
<tr>
<td>"" (空字符串)</td>
<td>字符串(默认值)</td>
</tr>
<tr>
<td>"arraybuffer"</td>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer" rel="nofollow noreferrer" target="_blank">ArrayBuffer</a></td>
</tr>
<tr>
<td>"blob"</td>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Blob" rel="nofollow noreferrer" target="_blank">Blob</a></td>
</tr>
<tr>
<td>"document"</td>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Document" rel="nofollow noreferrer" target="_blank">Document</a></td>
</tr>
<tr>
<td>"json"</td>
<td><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON" rel="nofollow noreferrer" target="_blank">JSON</a></td>
</tr>
<tr>
<td>"text"</td>
<td>字符串</td>
</tr>
</tbody>
</table>
<ul><li>
<p>xhr.spec 规范中定义的 XMLHttpRequestResponseType 类型如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="enum XMLHttpRequestResponseType {
  &quot;&quot;,
  &quot;arraybuffer&quot;,
  &quot;blob&quot;,
  &quot;document&quot;,
  &quot;json&quot;,
  &quot;text&quot;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">enum</span> XMLHttpRequestResponseType {
  <span class="hljs-string">""</span>,
  <span class="hljs-string">"arraybuffer"</span>,
  <span class="hljs-string">"blob"</span>,
  <span class="hljs-string">"document"</span>,
  <span class="hljs-string">"json"</span>,
  <span class="hljs-string">"text"</span>
};</code></pre>
</li></ul>
<ul>
<li>
<p>responseXML: Document - 本次请求响应式一个 Document 对象，如果是以下情况则值为 null：</p>
<ul>
<li><p>请求未成功</p></li>
<li><p>请求未发送</p></li>
<li><p>响应无法被解析成 XML 或 HTML</p></li>
</ul>
</li>
<li><p>status: unsigned short - 请求的响应状态码，如 200 (表示一个成功的请求)。  <strong>(只读)</strong></p></li>
<li><p>statusText: DOMString - 请求的响应状态信息，包含一个状态码和消息文本，如 "200 OK"。 <strong>(只读)</strong></p></li>
<li><p>timeout: unsigned long - 表示一个请求在被自动终止前所消耗的毫秒数。默认值为 0，意味着没有超时时间。超时并不能应用在同步请求中，否则会抛出一个 InvalidAccessError 异常。当发生超时时，timeout 事件将会被触发。</p></li>
<li><p>upload: XMLHttpRequestUpload - 可以在 upload 上添加一个事件监听来跟踪上传过程</p></li>
<li><p>withCredentials: boolean -  表明在进行跨站 (cross-site) 的访问控制 (Access-Control) 请求时，是否使用认证信息 (例如cookie或授权的header)。默认为 false。<strong>注意：这不会影响同站 same-site 请求</strong></p></li>
</ul>
<h3 id="articleHeader12">方法</h3>
<ul>
<li><p>abort() - 如果请求已经被发送，则立刻中止请求。</p></li>
<li><p>getAllResponseHeaders() - 返回所有响应头信息(响应头名和值)，如果响应头还没有接收，则返回 null。<strong>注意：使用该方法获取的 response headers 与在开发者工具 Network 面板中看到的响应头不一致</strong></p></li>
<li>
<p>getResponseHeader() - 返回指定响应头的值，如果响应头还没有被接收，或该响应头不存在，则返回 null。<strong>注意：使用该方法获取某些响应头时，浏览器会抛出异常，具体原因如下：</strong></p>
<ul>
<li><p><a href="https://www.w3.org/TR/XMLHttpRequest/" rel="nofollow noreferrer" target="_blank">W3C的 xhr 标准中做了限制</a>，规定客户端无法获取 response 中的 <code>Set-Cookie</code>、<code>Set-Cookie2 </code>这2个字段，无论是同域还是跨域请求。</p></li>
<li>
<p><a href="https://www.w3.org/TR/cors/#access-control-allow-credentials-response-header" rel="nofollow noreferrer" target="_blank">W3C 的 cors 标准对于跨域请求也做了限制</a>，规定对于跨域请求，客户端允许获取的response header字段只限于 <a href="https://www.w3.org/TR/cors/#ascii-case-insensitive" rel="nofollow noreferrer" target="_blank">simple response header</a> (常见的 simple response header 如下)</p>
<ul>
<li><p>Cache-Control</p></li>
<li><p>Content-Language</p></li>
<li><p>Content-Type</p></li>
<li><p>Expires</p></li>
<li><p>Last-Modified</p></li>
<li><p>Pragma</p></li>
</ul>
</li>
</ul>
<p>和 Access-Control-Expose-Headers。</p>
</li>
<li>
<p>open() - 初始化一个请求：</p>
<ul>
<li>
<p>方法签名：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="void open(
   DOMString method,
   DOMString url,
   optional boolean async,
   optional DOMString user,
   optional DOMString password
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code>void open(
   DOMString <span class="hljs-function"><span class="hljs-keyword">method</span>,
   <span class="hljs-title">DOMString</span> <span class="hljs-title">url</span>,
   <span class="hljs-title">optional</span> <span class="hljs-title">boolean</span> <span class="hljs-title">async</span>,
   <span class="hljs-title">optional</span> <span class="hljs-title">DOMString</span> <span class="hljs-title">user</span>,
   <span class="hljs-title">optional</span> <span class="hljs-title">DOMString</span> <span class="hljs-title">password</span>
);</span></code></pre>
</li>
<li>
<p>参数：</p>
<ul>
<li><p>method - 请求所使用的 HTTP 方法，如 GET、POST、PUT、DELETE</p></li>
<li><p>url - 请求的 URL 地址</p></li>
<li><p>async - 一个可选的布尔值参数，默认值为 true，表示执行异步操作。如果值为 false，则 send() 方法不会返回任何东西，直到接收到了服务器的返回数据</p></li>
<li><p>user - 用户名，可选参数，用于授权。默认参数为空字符串</p></li>
<li><p>password - 密码，可选参数，用于授权。默认参数为空字符串</p></li>
</ul>
</li>
<li>
<p>备注：</p>
<ul>
<li><p>如果 method 不是有效的 HTTP 方法或 url 地址不能被成功解析，将会抛出 <code>SyntaxError</code> 异常</p></li>
<li><p>如果请求方法(不区分大小写)为 <code>CONNECT</code>、<code>TRACE</code> 或 <code>TRACK</code> 将会抛出 <code>SecurityError</code> 异常</p></li>
</ul>
</li>
</ul>
</li>
<li><p>overrideMimeType() - 重写由服务器返回的 <a href="https://zh.wikipedia.org/wiki/%E5%A4%9A%E7%94%A8%E9%80%94%E4%BA%92%E8%81%AF%E7%B6%B2%E9%83%B5%E4%BB%B6%E6%93%B4%E5%B1%95" rel="nofollow noreferrer" target="_blank">MIME</a> 类型。例如，可以用于强制把响应流当做 <code>text/xml</code> 来解析，即使服务器没有指明数据是这个类型。<strong>注意：这个方法必须在 send() 之前被调用。</strong></p></li>
<li>
<p>send() - 发送请求。如果该请求是异步模式(默认)，该方法会立刻返回。相反，如果请求是同步模式，则直到请求的响应完全接受以后，该方法才会返回。<strong>注意：所有相关的事件绑定必须在调用 send() 方法之前进行。</strong></p>
<ul><li>
<p>方法签名：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="void send();
void send(ArrayBuffer data);
void send(Blob data);
void send(Document data);
void send(DOMString? data);
void send(FormData data);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cpp"><code><span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">send</span><span class="hljs-params">()</span></span>;
<span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">send</span><span class="hljs-params">(ArrayBuffer data)</span></span>;
<span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">send</span><span class="hljs-params">(Blob data)</span></span>;
<span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">send</span><span class="hljs-params">(Document data)</span></span>;
<span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">send</span><span class="hljs-params">(DOMString? data)</span></span>;
<span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">send</span><span class="hljs-params">(FormData data)</span></span>;</code></pre>
</li></ul>
</li>
<li>
<p>setRequestHeader() - 设置 HTTP 请求头信息。<strong>注意：在这之前，你必须确认已经调用了 open() 方法打开了一个 url</strong></p>
<ul>
<li>
<p>方法签名：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="void setRequestHeader(
   DOMString header,
   DOMString value
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">setRequestHeader</span>(<span class="hljs-params">
   DOMString header,
   DOMString <span class="hljs-keyword">value</span>
</span>)</span>;</code></pre>
</li>
<li>
<p>参数：</p>
<ul>
<li><p>header - 请求头名称</p></li>
<li><p>value - 请求头的值</p></li>
</ul>
</li>
</ul>
</li>
<li>
<p>sendAsBinary() - 发送二进制的 send() 方法的变种。</p>
<ul>
<li>
<p>方法签名：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="void sendAsBinary(
   in DOMString body
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">sendAsBinary</span>(<span class="hljs-params">
   <span class="hljs-keyword">in</span> DOMString body
</span>)</span>;</code></pre>
</li>
<li>
<p>参数：</p>
<ul><li><p>body - 消息体</p></li></ul>
</li>
</ul>
</li>
</ul>
<h3 id="articleHeader13">浏览器兼容性</h3>
<ul><li><p>Desktop</p></li></ul>
<table>
<thead><tr>
<th>Feature</th>
<th>Chrome</th>
<th>Firefox (Gecko)</th>
<th>Internet Explorer</th>
<th>Opera</th>
<th>Safari (WebKit)</th>
</tr></thead>
<tbody>
<tr>
<td>Basic support (XHR1)</td>
<td>1</td>
<td>1.0</td>
<td>5 (via ActiveXObject)7 (XMLHttpRequest)</td>
<td>(Yes)</td>
<td>1.2</td>
</tr>
<tr>
<td>send(ArrayBuffer)</td>
<td>9</td>
<td>9</td>
<td>?</td>
<td>11.60</td>
<td>?</td>
</tr>
<tr>
<td>send(Blob)</td>
<td>7</td>
<td>3.6</td>
<td>?</td>
<td>12</td>
<td>?</td>
</tr>
<tr>
<td>send(FormData)</td>
<td>6</td>
<td>4</td>
<td>?</td>
<td>12</td>
<td>?</td>
</tr>
<tr>
<td>response</td>
<td>10</td>
<td>6</td>
<td>10</td>
<td>11.60</td>
<td>?</td>
</tr>
<tr>
<td>responseType = 'arraybuffer'</td>
<td>10</td>
<td>6</td>
<td>10</td>
<td>11.60</td>
<td>?</td>
</tr>
<tr>
<td>responseType = 'blob'</td>
<td>19</td>
<td>6</td>
<td>10</td>
<td>12</td>
<td>?</td>
</tr>
<tr>
<td>responseType = 'document'</td>
<td>18</td>
<td>11</td>
<td>未实现</td>
<td>未实现</td>
<td>未实现</td>
</tr>
<tr>
<td>responseType = 'json'</td>
<td>未实现</td>
<td>10</td>
<td>未实现</td>
<td>12</td>
<td>未实现</td>
</tr>
<tr>
<td>Progress Events</td>
<td>7</td>
<td>3.5</td>
<td>10</td>
<td>12</td>
<td>?</td>
</tr>
<tr>
<td>withCredentials</td>
<td>3</td>
<td>3.5</td>
<td>10</td>
<td>12</td>
<td>4</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader14">事件</h3>
<ul>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/Events/loadstart" rel="nofollow noreferrer" target="_blank">loadstart</a> - 当程序开始加载时，loadstart 事件将被触发。</p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/Events/%E8%BF%9B%E5%BA%A6%E6%9D%A1" rel="nofollow noreferrer" target="_blank">progress</a> - 进度事件会被触发用来指示一个操作正在进行中。</p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/Events/abort" rel="nofollow noreferrer" target="_blank">abort</a> - 当一个资源的加载已中止时，将触发&nbsp;abort 事件。</p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/Events/error" rel="nofollow noreferrer" target="_blank">error</a> - 当一个资源加载失败时会触发error事件。</p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/Events/load" rel="nofollow noreferrer" target="_blank">load</a> - 当一个资源及其依赖资源已完成加载时，将触发load事件。</p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/Events/timeout" rel="nofollow noreferrer" target="_blank">timeout</a> - 当进度由于预定时间到期而终止时，会触发timeout&nbsp;事件。</p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/Events/loadend" rel="nofollow noreferrer" target="_blank">loadend</a> - 当一个资源加载进度停止时 (例如，在已经分派“错误”，“中止”或“加载”之后)，触发loadend事件。</p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/Events/readystatechange" rel="nofollow noreferrer" target="_blank">readystatechange</a> - readystatechange 事件会在 document.readyState属性发生变化时触发。</p></li>
</ul>
<h2 id="articleHeader15">XMLHttpRequest Level 1</h2>
<h3 id="articleHeader16">XMLHttpRequest Level 1 使用</h3>
<p>首先，创建一个 XMLHttpRequest 对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr = new XMLHttpRequest();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();</code></pre>
<p>然后，向服务器发出一个 HTTP 请求：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.open('GET', 'example.php');
xhr.send();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">xhr.open(<span class="hljs-string">'GET'</span>, <span class="hljs-string">'example.php'</span>);
xhr.send();</code></pre>
<p>接着，就等待远程主机做出回应。这时需要监控XMLHttpRequest对象的状态变化，指定回调函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.onreadystatechange = function(){
　　if ( xhr.readyState == 4 &amp;&amp; xhr.status == 200 ) {
　　　　　alert( xhr.responseText );
　　} else {
　　　　　alert( xhr.statusText );
　　}
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
　　<span class="hljs-keyword">if</span> ( xhr.readyState == <span class="hljs-number">4</span> &amp;&amp; xhr.status == <span class="hljs-number">200</span> ) {
　　　　　alert( xhr.responseText );
　　} <span class="hljs-keyword">else</span> {
　　　　　alert( xhr.statusText );
　　}
};</code></pre>
<p>上面的代码包含了老版本 XMLHttpRequest 对象的主要属性：</p>
<ul>
<li><p>xhr.readyState： XMLHttpRequest对象的状态，等于4表示数据已经接收完毕。</p></li>
<li><p>xhr.status：服务器返回的状态码，等于200表示一切正常。</p></li>
<li><p>xhr.responseText：服务器返回的文本数据。</p></li>
<li><p>xhr.statusText：服务器返回的状态文本。</p></li>
</ul>
<h3 id="articleHeader17">XMLHttpRequest Level 1 缺点</h3>
<ul>
<li><p>只支持文本数据的传送，无法用来读取和上传二进制文件。</p></li>
<li><p>传送和接收数据时，没有进度信息，只能提示有没有完成。</p></li>
<li><p>受到<a href="http://www.w3.org/Security/wiki/Same_Origin_Policy" rel="nofollow noreferrer" target="_blank">"同域限制"</a>（Same Origin Policy），只能向同一域名的服务器请求数据。</p></li>
</ul>
<h2 id="articleHeader18">XMLHttpRequest Level 2</h2>
<p>XMLHttpRequest Level 2 针对 XMLHttpRequest Level 1 的缺点，做了大幅改进。具体如下：</p>
<ul>
<li><p>可以设置HTTP请求的超时时间。</p></li>
<li><p>可以使用FormData对象管理表单数据。</p></li>
<li><p>可以上传文件。</p></li>
<li><p>可以请求不同域名下的数据（跨域请求）。</p></li>
<li><p>可以获取服务器端的二进制数据。</p></li>
<li><p>可以获得数据传输的进度信息。</p></li>
</ul>
<h3 id="articleHeader19">设置超时时间</h3>
<p>新版本 XMLHttpRequest 对象，增加了 timeout 属性，可以设置HTTP请求的时限。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="　xhr.timeout = 3000;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code style="word-break: break-word; white-space: initial;">　xhr.timeout = <span class="hljs-number">3000</span><span class="hljs-comment">;</span></code></pre>
<p>上面的语句，将最长等待时间设为3000毫秒。过了这个时限，就自动停止HTTP请求。与之配套的还有一个timeout事件，用来指定回调函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.ontimeout = function(event){
　　console.log('请求超时');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">xhr.ontimeout = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
　　<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'请求超时'</span>);
}</code></pre>
<h3 id="articleHeader20">FormData 对象</h3>
<p>AJAX 操作往往用来传递表单数据。为了方便表单处理，HTML 5新增了一个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/FormData" rel="nofollow noreferrer" target="_blank">FormData</a> 对象，可以用于模拟表单。</p>
<h4>FormData 简介</h4>
<p><strong>构造函数 FormData()</strong></p>
<p>用于创建一个新的 FormData 对象。</p>
<p><strong>语法</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var formData = new FormData(form)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> formData = <span class="hljs-keyword">new</span> FormData(form)</code></pre>
<ul><li>
<p>参数</p>
<ul><li><p>form 可选 - 一个 HTML 上的 <code>&lt;form&gt;</code> 表单元素。当使用 form 参数，创建的 FormData 对象会自动将 form 中的表单值也包含进去，文件内容会被编码</p></li></ul>
</li></ul>
<h4>FormData 使用</h4>
<p>首先，新建一个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/FormData/FormData" rel="nofollow noreferrer" target="_blank">FormData</a> 对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var formData = new FormData();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> formData = <span class="hljs-keyword">new</span> FormData();</code></pre>
<p>然后，为它添加表单项：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="formData.append('username', 'semlinker');
formData.append('id', 2005821040);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">formData.append(<span class="hljs-string">'username'</span>, <span class="hljs-string">'semlinker'</span>);
formData.append(<span class="hljs-string">'id'</span>, <span class="hljs-number">2005821040</span>);</code></pre>
<p>最后，直接传送这个FormData对象。这与提交网页表单的效果，完全一样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.send(formData);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">xhr.send(formData);</code></pre>
<p>FormData 对象也可以用来获取网页表单的值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var form = document.getElementById('myform'); // 获取页面上表单对象
var formData = new FormData(form);
formData.append('username', 'semlinker'); // 添加一个表单项
xhr.open('POST', form.action);
xhr.send(formData);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> form = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'myform'</span>); <span class="hljs-comment">// 获取页面上表单对象</span>
<span class="hljs-keyword">var</span> formData = <span class="hljs-keyword">new</span> FormData(form);
formData.append(<span class="hljs-string">'username'</span>, <span class="hljs-string">'semlinker'</span>); <span class="hljs-comment">// 添加一个表单项</span>
xhr.open(<span class="hljs-string">'POST'</span>, form.action);
xhr.send(formData);</code></pre>
<h3 id="articleHeader21">上传文件</h3>
<p>新版 XMLHttpRequest 对象，不仅可以发送文本信息，还可以上传文件。</p>
<p>1.为了上传文件, 我们得先选中一个文件. 一个 type 为 file 的 input 输入框</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input id=&quot;input&quot; type=&quot;file&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"input"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"file"</span>&gt;</span></code></pre>
<p>2.然后用 FormData 对象包裹选中的文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var input = document.getElementById(&quot;input&quot;),
    formData = new FormData();
formData.append(&quot;file&quot;,input.files[0]); // file名称与后台接收的名称一致" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">input</span> = document.getElementById(<span class="hljs-string">"input"</span>),
    formData = new FormData();
formData.<span class="hljs-keyword">append</span>(<span class="hljs-string">"file"</span>,<span class="hljs-keyword">input</span>.files[0]); <span class="hljs-comment">// file名称与后台接收的名称一致</span></code></pre>
<p>3.设置上传地址和请求方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var url = &quot;http://localhost:3000/upload&quot;,
    method = &quot;POST&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> url = <span class="hljs-string">"http://localhost:3000/upload"</span>,
    method = <span class="hljs-string">"POST"</span>;</code></pre>
<p>4.发送 FormData 对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.send(formData);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">xhr.send(formData);</code></pre>
<h3 id="articleHeader22">跨域资源共享 (CORS)</h3>
<p>新版本的 XMLHttpRequest 对象，可以向不同域名的服务器发出 HTTP 请求。这叫做 <a href="http://en.wikipedia.org/wiki/Cross-Origin_Resource_Sharing" rel="nofollow noreferrer" target="_blank">"跨域资源共享"</a>（Cross-origin resource sharing，简称 CORS）。</p>
<p>使用"跨域资源共享"的前提，是浏览器必须支持这个功能，而且服务器端必须同意这种"跨域"。如果能够满足上面的条件，则代码的写法与不跨域的请求完全一样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.open('GET', 'http://other.server/and/path/to/script');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">xhr.open(<span class="hljs-string">'GET'</span>, <span class="hljs-string">'http://other.server/and/path/to/script'</span>);</code></pre>
<h3 id="articleHeader23">接收二进制数据</h3>
<p>XMLHttpRequest Level 1 XMLHttpRequest 对象只能处理文本数据，新版则可以处理二进制数据。从服务器取回二进制数据，较新的方法是使用新增的 responseType 属性。如果服务器返回文本数据，这个属性的值是 "TEXT"，这是默认值。较新的浏览器还支持其他值，也就是说，可以接收其他格式的数据。</p>
<p>你可以把 responseType 设为 blob，表示服务器传回的是二进制对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr = new XMLHttpRequest();
xhr.open('GET', '/path/to/image.png');
xhr.responseType = 'blob';
xhr.send();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
xhr.open(<span class="hljs-string">'GET'</span>, <span class="hljs-string">'/path/to/image.png'</span>);
xhr.responseType = <span class="hljs-string">'blob'</span>;
xhr.send();</code></pre>
<p>接收数据的时候，用浏览器自带的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Blob" rel="nofollow noreferrer" target="_blank">Blob</a> 对象即可。</p>
<blockquote><p>一个 &nbsp;<strong>Blob </strong>对象表示一个不可变的, 原始数据的类似文件对象。Blob 表示的数据不一定是一个 JavaScript 原生格式。&nbsp;<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/File" rel="nofollow noreferrer" target="_blank"><code>File</code></a>&nbsp;接口基于Blob，继承 blob功能并将其扩展为支持用户系统上的文件。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var blob = new Blob([xhr.response], {type: 'image/png'});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> blob = <span class="hljs-keyword">new</span> Blob([xhr.response], {<span class="hljs-attr">type</span>: <span class="hljs-string">'image/png'</span>});</code></pre>
<p>更多示例请参考&nbsp;<a href="https://developer.mozilla.org/zh-cn/DOM/XMLHttpRequest/Sending_and_Receiving_Binary_Data" rel="nofollow noreferrer" target="_blank">发送和接收二进制数据</a>&nbsp;。</p>
<h3 id="articleHeader24">进度信息</h3>
<p>新版本的 XMLHttpRequest 对象，传送数据的时候，有一个 progress 事件，用来返回进度信息。</p>
<p>它分成上传和下载两种情况。下载的 progress 事件属于 XMLHttpRequest 对象，上传的 progress 事件属于XMLHttpRequest.upload 对象。</p>
<p>我们先定义progress事件的回调函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.onprogress = updateProgress;
xhr.upload.onprogress = updateProgress;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">xhr.onprogress = updateProgress;
xhr.upload.onprogress = updateProgress;</code></pre>
<p>然后，在回调函数里面，使用这个事件的一些属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function updateProgress(event) {
　　if (event.lengthComputable) {
　　　　var percentComplete = event.loaded / event.total;
　　}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">updateProgress</span>(<span class="hljs-params">event</span>) </span>{
　　<span class="hljs-keyword">if</span> (event.lengthComputable) {
　　　　<span class="hljs-keyword">var</span> percentComplete = event.loaded / event.total;
　　}
}</code></pre>
<p>上面的代码中，event.total 是需要传输的总字节，event.loaded 是已经传输的字节。如果event.lengthComputable 不为真，则 event.total 等于0。</p>
<p>各个浏览器 XMLHttpRequest Level 2 的兼容性 - <a href="http://caniuse.com/#feat=xhr2" rel="nofollow noreferrer" target="_blank">Can I use/xhr2</a></p>
<h2 id="articleHeader25">XHR 下载数据</h2>
<p>XHR 可以传输基于文本和二进制数据。实际上，浏览器可以为各种本地数据类型提供自动编码和解码，这样可以让应用程序将这些类型直接传递给XHR，以便正确编码，反之亦然，这些类型可以由浏览器自动解码：</p>
<ul>
<li><p>ArrayBuffer - 固定长度二进制数据缓冲区</p></li>
<li><p>Blob - 二进制不可变数据</p></li>
<li><p>Document - HTML或XML文档</p></li>
<li><p>JSON - JavaScript Object Notation</p></li>
<li><p>Text - 普通文本</p></li>
</ul>
<p>XHR 下载图片示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://avatars2.githubusercontent.com/u/4220799?v=3');
    xhr.responseType = 'blob'; // 1

    xhr.onload = function() {
        if (this.status == 200) {
            var img = document.createElement('img');
            img.src = window.URL.createObjectURL(this.response); // 2
            img.onload = function() {
                window.URL.revokeObjectURL(this.src); //3
            };
            document.body.appendChild(img);
        }
    };
    xhr.send();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
    xhr.open(<span class="hljs-string">'GET'</span>, <span class="hljs-string">'https://avatars2.githubusercontent.com/u/4220799?v=3'</span>);
    xhr.responseType = <span class="hljs-string">'blob'</span>; <span class="hljs-comment">// 1</span>

    xhr.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.status == <span class="hljs-number">200</span>) {
            <span class="hljs-keyword">var</span> img = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'img'</span>);
            img.src = <span class="hljs-built_in">window</span>.URL.createObjectURL(<span class="hljs-keyword">this</span>.response); <span class="hljs-comment">// 2</span>
            img.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-built_in">window</span>.URL.revokeObjectURL(<span class="hljs-keyword">this</span>.src); <span class="hljs-comment">//3</span>
            };
            <span class="hljs-built_in">document</span>.body.appendChild(img);
        }
    };
    xhr.send();</code></pre>
<p>(1) 设置响应的数据类型为 blob</p>
<p>(2) 基于Blob创建一个唯一的对象URL，并作为图片的源地址 (<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL" rel="nofollow noreferrer" target="_blank">URL.createObjectURL()</a>)</p>
<p>(3) 图片加载成功后释放对象的URL(<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/URL/revokeObjectURL" rel="nofollow noreferrer" target="_blank">URL.revokeObjectURL()</a>)</p>
<h2 id="articleHeader26">XHR 上传数据</h2>
<p>通过 XHR 上传数据对于所有数据类型来说都是简单而有效的。实际上，唯一的区别是当我们在XHR请求中调用 send() 时，我们需传递不同的数据对象。其余的由浏览器处理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr = new XMLHttpRequest();
xhr.open('POST','/upload');
xhr.onload = function() { ... };
xhr.send(&quot;text string&quot;); // 1

var formData = new FormData(); // 2
formData.append('id', 123456);
formData.append('topic', 'performance');

var xhr = new XMLHttpRequest();
xhr.open('POST', '/upload');
xhr.onload = function() { ... };
xhr.send(formData); // 3

var xhr = new XMLHttpRequest();
xhr.open('POST', '/upload');
xhr.onload = function() { ... };
var uInt8Array = new Uint8Array([1, 2, 3]); // 4
xhr.send(uInt8Array.buffer); // 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
xhr.open(<span class="hljs-string">'POST'</span>,<span class="hljs-string">'/upload'</span>);
xhr.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ ... };
xhr.send(<span class="hljs-string">"text string"</span>); <span class="hljs-comment">// 1</span>

<span class="hljs-keyword">var</span> formData = <span class="hljs-keyword">new</span> FormData(); <span class="hljs-comment">// 2</span>
formData.append(<span class="hljs-string">'id'</span>, <span class="hljs-number">123456</span>);
formData.append(<span class="hljs-string">'topic'</span>, <span class="hljs-string">'performance'</span>);

<span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
xhr.open(<span class="hljs-string">'POST'</span>, <span class="hljs-string">'/upload'</span>);
xhr.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ ... };
xhr.send(formData); <span class="hljs-comment">// 3</span>

<span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
xhr.open(<span class="hljs-string">'POST'</span>, <span class="hljs-string">'/upload'</span>);
xhr.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ ... };
<span class="hljs-keyword">var</span> uInt8Array = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Uint8Array</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]); <span class="hljs-comment">// 4</span>
xhr.send(uInt8Array.buffer); <span class="hljs-comment">// 5</span></code></pre>
<p>(1) 发送普通的文本到服务器</p>
<p>(2) 通过 FormData API 创建动态表单</p>
<p>(3) 发送 FormData 数据到服务器</p>
<p>(4) 创建 Unit8Array 数组 (<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array" rel="nofollow noreferrer" target="_blank">Uint8Array</a> 数组类型表示一个8位无符号整型数组，创建时内容被初始化为0)</p>
<p>(5) 发送二进制数据到服务器</p>
<p>XHR send() 方法签名：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="void send();
void send(ArrayBuffer data);
void send(Blob data);
void send(Document data);
void send(DOMString? data);
void send(FormData data);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">void</span> send();
<span class="hljs-keyword">void</span> send(<span class="hljs-built_in">ArrayBuffer</span> data);
<span class="hljs-keyword">void</span> send(Blob data);
<span class="hljs-keyword">void</span> send(Document data);
<span class="hljs-keyword">void</span> send(DOMString? data);
<span class="hljs-keyword">void</span> send(FormData data);</code></pre>
<p>除此之外，XHR 还支持大文件分块传输：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var blob = ...; // 1

const BYTES_PER_CHUNK = 1024 * 1024; // 2
const SIZE = blob.size;

var start = 0;
var end = BYTES_PER_CHUNK;

while(start < SIZE) { // 3
  var xhr = new XMLHttpRequest();
  xhr.open('POST', '/upload');
  xhr.onload = function() { ... };

  xhr.setRequestHeader('Content-Range', start+'-'+end+'/'+SIZE); // 4
  xhr.send(blob.slice(start, end)); // 5

  start = end;
  end = start + BYTES_PER_CHUNK;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> blob = ...; <span class="hljs-comment">// 1</span>

<span class="hljs-keyword">const</span> BYTES_PER_CHUNK = <span class="hljs-number">1024</span> * <span class="hljs-number">1024</span>; <span class="hljs-comment">// 2</span>
<span class="hljs-keyword">const</span> SIZE = blob.size;

<span class="hljs-keyword">var</span> start = <span class="hljs-number">0</span>;
<span class="hljs-keyword">var</span> end = BYTES_PER_CHUNK;

<span class="hljs-keyword">while</span>(start &lt; SIZE) { <span class="hljs-comment">// 3</span>
  <span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
  xhr.open(<span class="hljs-string">'POST'</span>, <span class="hljs-string">'/upload'</span>);
  xhr.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ ... };

  xhr.setRequestHeader(<span class="hljs-string">'Content-Range'</span>, start+<span class="hljs-string">'-'</span>+end+<span class="hljs-string">'/'</span>+SIZE); <span class="hljs-comment">// 4</span>
  xhr.send(blob.slice(start, end)); <span class="hljs-comment">// 5</span>

  start = end;
  end = start + BYTES_PER_CHUNK;
}</code></pre>
<p>(1) 一个任意的数据块 (二进制或文本)</p>
<p>(2) 将数据库大小设置为 1MB</p>
<p>(3) 迭代提供的数据，增量为1MB</p>
<p>(4) 设置上传的数据范围 (<a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Range" rel="nofollow noreferrer" target="_blank">Content-Range请求头</a>)</p>
<p>(5) 通过 XHR 上传 1MB 数据块</p>
<h2 id="articleHeader27">监听上传和下载进度</h2>
<p>XHR 对象提供了一系列 API，用于监听进度事件，表示请求的当前状态：</p>
<table>
<thead><tr>
<th>事件类型</th>
<th>描述</th>
<th>触发次数</th>
</tr></thead>
<tbody>
<tr>
<td>loadstart</td>
<td>开始传输</td>
<td>1次</td>
</tr>
<tr>
<td>progress</td>
<td>传输中</td>
<td>0次或多次</td>
</tr>
<tr>
<td>error</td>
<td>传输中出现错误</td>
<td>0次或1次</td>
</tr>
<tr>
<td>abort</td>
<td>传输被用户取消</td>
<td>0次或1次</td>
</tr>
<tr>
<td>load</td>
<td>传输成功</td>
<td>0次或1次</td>
</tr>
<tr>
<td>loadend</td>
<td>传输完成</td>
<td>1次</td>
</tr>
</tbody>
</table>
<p>每个 XHR 传输都以 <code>loadstart</code> 事件开始，并以 <code>loadend</code> 事件结束，并在这两个事件期间触发一个或多个附加事件来指示传输的状态。因此，为了监控进度，应用程序可以在 XHR 对象上注册一组 JavaScript 事件侦听器：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr = new XMLHttpRequest();
xhr.open('GET','/resource');
xhr.timeout = 5000; // 1

xhr.addEventListener('load', function() { ... }); // 2
xhr.addEventListener('error', function() { ... }); // 3

var onProgressHandler = function(event) {
  if(event.lengthComputable) {
    var progress = (event.loaded / event.total) * 100; // 4
    ...
  }
}

xhr.upload.addEventListener('progress', onProgressHandler); // 5
xhr.addEventListener('progress', onProgressHandler); // 6
xhr.send();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
xhr.open(<span class="hljs-string">'GET'</span>,<span class="hljs-string">'/resource'</span>);
xhr.timeout = <span class="hljs-number">5000</span>; <span class="hljs-comment">// 1</span>

xhr.addEventListener(<span class="hljs-string">'load'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ ... }); <span class="hljs-comment">// 2</span>
xhr.addEventListener(<span class="hljs-string">'error'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ ... }); <span class="hljs-comment">// 3</span>

<span class="hljs-keyword">var</span> onProgressHandler = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
  <span class="hljs-keyword">if</span>(event.lengthComputable) {
    <span class="hljs-keyword">var</span> progress = (event.loaded / event.total) * <span class="hljs-number">100</span>; <span class="hljs-comment">// 4</span>
    ...
  }
}

xhr.upload.addEventListener(<span class="hljs-string">'progress'</span>, onProgressHandler); <span class="hljs-comment">// 5</span>
xhr.addEventListener(<span class="hljs-string">'progress'</span>, onProgressHandler); <span class="hljs-comment">// 6</span>
xhr.send();</code></pre>
<p>(1) 设置请求超时时间为 5,000 ms (默认无超时时间)</p>
<p>(2) 注册成功回调</p>
<p>(3) 注册异常回调</p>
<p>(4) 计算已完成的进度</p>
<p>(5) 注册上传进度事件回调</p>
<p>(6) 注册下载进度事件回调</p>
<h2 id="articleHeader28">使用XHR流式传输数据</h2>
<p>在某些情况下，应用程序可能需要或希望逐步处理数据流：将数据上传到服务器，使其在客户机上可用，或者在从服务器下载数据时，进行流式处理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr = new XMLHttpRequest();
xhr.open('GET', '/stream');
xhr.seenBytes = 0;

xhr.onreadystatechange = function() {  // 1
  if(xhr.readyState > 2) {
    var newData = xhr.responseText.substr(xhr.seenBytes); // 2
    // process newData
    xhr.seenBytes = xhr.responseText.length; // 3
  }
};

xhr.send();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
xhr.open(<span class="hljs-string">'GET'</span>, <span class="hljs-string">'/stream'</span>);
xhr.seenBytes = <span class="hljs-number">0</span>;

xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{  <span class="hljs-comment">// 1</span>
  <span class="hljs-keyword">if</span>(xhr.readyState &gt; <span class="hljs-number">2</span>) {
    <span class="hljs-keyword">var</span> newData = xhr.responseText.substr(xhr.seenBytes); <span class="hljs-comment">// 2</span>
    <span class="hljs-comment">// process newData</span>
    xhr.seenBytes = xhr.responseText.length; <span class="hljs-comment">// 3</span>
  }
};

xhr.send();</code></pre>
<p>(1) 监听 onreadystatechange 事件</p>
<p>(2) 从部分响应中提取新数据</p>
<p>(3) 更新处理的字节偏移</p>
<p>这个例子可以在大多数现代浏览器中使用。但是,性能并不好，而且还有大量的注意事项和问题：</p>
<ul>
<li><p>请注意，我们正在手动跟踪所看到字节的偏移量，然后手动分割数据：responseText 正在缓冲完整的响应！对于小的传输，这可能不是一个问题，但对于更大的下载，特别是在内存受限的设备，如手机，这是一个问题。释放缓冲响应的唯一方法是完成请求并打开一个新的请求。</p></li>
<li><p>部分响应只能从 responseText 属性中读取，这将限制为仅限文本传输。没有办法读取二进制传输的部分响应。</p></li>
<li><p>一旦读取了部分数据，我们必须识别消息边界：应用程序逻辑必须定义自己的数据格式，然后缓冲并解析流以提取单个消息。</p></li>
<li><p>浏览器在处理缓冲数据方面有所不同：一些浏览器可能会立即释放数据，而其他浏览器可能会缓冲小的响应并等到积累到一定大小的数据块才释放它们。</p></li>
<li><p>浏览器对不同 Content-Type 资源类型的处理方式不同，对于某些资源类型允许逐步读取 - 例如，text / html 类型，而其他 Content-Type 类型只能使用 application / x-javascript。</p></li>
</ul>
<h2 id="articleHeader29">XHR 定时轮询</h2>
<p>从服务器检索更新的最简单的策略之一是让客户端进行定期检查：客户端可以以周期性间隔（轮询服务器）启动后台XHR请求，以检查更新。如果新数据在服务器上可用，则在响应中返回，否则响应为空。</p>
<p>定时轮询的方式很简单，但如果定时间隔很短的话，也是很低效。因此设置合适的时间间隔显得至关重要：轮询间隔时间过长，会导致更新不及时，然而间隔时间过短的话，则会导致客户端与服务器不必要的流程和高开销。接下来我们来看一个简单的示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function checkUpdates(url) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = function() { ... }; // 1
  xhr.send();
}

setInterval(function() { checkUpdates('/updates') }, 60000); // 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkUpdates</span>(<span class="hljs-params">url</span>) </span>{
  <span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
  xhr.open(<span class="hljs-string">'GET'</span>, url);
  xhr.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ ... }; <span class="hljs-comment">// 1</span>
  xhr.send();
}

setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ checkUpdates(<span class="hljs-string">'/updates'</span>) }, <span class="hljs-number">60000</span>); <span class="hljs-comment">// 2</span></code></pre>
<p>(1) 处理服务端接收的数据</p>
<p>(2) 设置定时轮询时间为 60s</p>
<p>定时轮询会产生以下的问题：</p>
<ul><li><p>每个 XHR 请求都是一个独立的 HTTP 请求，平均来说，HTTP 的请求头可能会引起大约 800 字节的开销 (不带HTTP cookie)。</p></li></ul>
<blockquote><p>每个浏览器发起 HTTP 请求时都将携带额外的 500 - 800 字节的元数据 (请求头)，如 user-agent、accept、Cache-Control 缓存控制头等。更糟糕的是，500 - 800 字节是理想的情况，如果携带 Cookies 信息，那么这个数值将会更大。总而言之，这些未压缩的 HTTP 元数据会引起很大开销。</p></blockquote>
<ul>
<li><p>如果数据能够在间隔期间顺序到达，那么定时轮询可以正常工作。但我们并没有任何机制保证数据的正常接收。另外周期性轮询也将会引起服务器上可用的消息及其传送到客户端之间引入额外的延迟。简单的理解是如果有轮询期间有新的可用消息，客户端是不会马上收到此新消息，而是要等到下一次轮询的时候，才能获取最新数据。</p></li>
<li><p>除非仔细考虑，不然轮询通常会成为无线网络上昂贵的性能反模式。频繁地轮询会大量的消耗移动设备的电量。</p></li>
</ul>
<h3 id="articleHeader30">轮询开销</h3>
<p>平均每个 HTTP 1.x 请求会增加大约 800字节的请求和响应开销 (详细信息可以查看 - <a href="https://hpbn.co/http1x/#measuring-and-controlling-protocol-overhead" rel="nofollow noreferrer" target="_blank">Measuring and Controlling Protocol Overhead</a>) 。另外在客户端登录后，我们还将产生一个额外的身份验证 cookie 和 消息ID; 假设这又增加了50个字节。因此，不返回新消息的请求将产生 850字节开销！现在假设我们有10,000个客户端，所有的轮询间隔时间都是60秒：<br>$$<br>(850 bytes <em> 8 bits </em> 10,000) / 60 seconds ≈ 1.13 Mbps<br>$$<br>每个客户端在每个请求上发送 850 字节的数据，这转换为每秒 167 个请求，服务器上的吞吐量大约为 1.13 Mbps！这不是一个固定的值，此外该计算值还是在假设服务器没有向任何客户端传递任何新的消息的理想情况下计算而得的。</p>
<h2 id="articleHeader31">XHR 长轮询</h2>
<p>周期性轮询的挑战在于有可能进行许多不必要的和空的检查。考虑到这一点，如果我们对轮询工作流程进行了轻微的修改，而不是在没有更新可用的情况下返回一个空的响应，我们可以保持连接空闲，直到更新可用吗？</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008950792" src="https://static.alili.tech/img/remote/1460000008950792" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>（图片来源 - <a href="https://hpbn.co/xmlhttprequest/" rel="nofollow noreferrer" target="_blank">https://hpbn.co/xmlhttprequest/</a>）</p>
<p>通过保持长连接，直到更新可用，数据可以立即发送到客户端，一旦它在服务器上可用。因此，长时间轮询为消息延迟提供了最佳的情况，并且还消除了空检查，这减少了 XHR 请求的数量和轮询的总体开销。一旦更新被传递，长的轮询请求完成，并且客户端可以发出另一个长轮询请求并等待下一个可用的消息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function checkUpdates(url) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = function() { // 1
    ...
    checkUpdates('/updates'); // 2
  };
  xhr.send();
}

checkUpdates('/updates'); // 3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkUpdates</span>(<span class="hljs-params">url</span>) </span>{
  <span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
  xhr.open(<span class="hljs-string">'GET'</span>, url);
  xhr.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">// 1</span>
    ...
    checkUpdates(<span class="hljs-string">'/updates'</span>); <span class="hljs-comment">// 2</span>
  };
  xhr.send();
}

checkUpdates(<span class="hljs-string">'/updates'</span>); <span class="hljs-comment">// 3</span></code></pre>
<p>(1) 处理接收到的数据并启动下一轮检测更新</p>
<p>(2) 启动下一轮检测更新</p>
<p>(3) 发起首次更新请求</p>
<p>那么长时间轮询总是比定期轮询更好的选择？除非消息到达率已知且不变，否则长轮询将始终提供更短的消息延迟。</p>
<p>另一方面，开销讨论需要更细微的观点。首先，请注意，每个传递的消息仍然引起相同的 HTTP 开销;每个新消息都是独立的 HTTP 请求。但是，如果消息到达率高，那么长时间轮询会比定期轮询发出更多的XHR请求！</p>
<p>长轮询通过最小化消息延迟来动态地适应消息到达速率，这是您可能想要的或可能不需要的行为。如果对消息延迟要求不高的话，则定时轮询可能是更有效的传输方式 - 例如，如果消息更新速率较高，则定时轮询提供简单的 "消息聚合" 机制 (即合并一定时间内的消息)，这可以减少请求数量并提高移动设备的电池寿命。</p>
<h2 id="articleHeader32">XMLHttpRequest 库</h2>
<h3 id="articleHeader33">Mock.js</h3>
<p>Mock.js 是一款模拟数据生成器，旨在帮助前端攻城师独立于后端进行开发，帮助编写单元测试。提供了以下模拟功能：</p>
<ul>
<li><p>根据数据模板生成模拟数据</p></li>
<li><p>模拟 Ajax 请求，生成并返回模拟数据</p></li>
<li><p>基于 HTML 模板生成模拟数据</p></li>
</ul>
<p>详细信息，请查看 - <a href="http://mockjs.com/0.1/" rel="nofollow noreferrer" target="_blank">Mock.js 文档</a></p>
<h3 id="articleHeader34">Zone.js</h3>
<p><a href="https://domenic.github.io/zones/" rel="nofollow noreferrer" target="_blank">Zone</a> 是下一个 ECMAScript 规范的建议之一。Angular 团队实现了 JavaScript 版本的 <a href="https://github.com/angular/zone.js/" rel="nofollow noreferrer" target="_blank">zone.js</a> ，它是用于拦截和跟踪异步工作的机制。</p>
<p>Zone 是一个全局的对象，用来配置有关如何拦截和跟踪异步回调的规则。Zone 有以下能力：</p>
<ul>
<li><p>拦截异步任务调度，如 setTimeout、setInterval、XMLHttpRequest 等</p></li>
<li><p>提供了将数据附加到 zones 的方法</p></li>
<li><p>为异常处理函数提供正确的上下文</p></li>
<li><p>拦截阻塞的方法，如 alert、confirm 方法</p></li>
</ul>
<p>zone.js 内部使用 <a href="https://en.wikipedia.org/wiki/Monkey_patch" rel="nofollow noreferrer" target="_blank">Monkey Patch</a> 方式，拦截 XMLHttpRequest.prototype 对象中的 open、send、abort 等方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// zone.js 源码片段
var openNative = patchMethod(window.XMLHttpRequest.prototype, 'open', function () { 
    return function (self, args) {
        self[XHR_SYNC] = args[2] == false;
        return openNative.apply(self, args);
    }; 
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// zone.js 源码片段</span>
<span class="hljs-keyword">var</span> openNative = patchMethod(<span class="hljs-built_in">window</span>.XMLHttpRequest.prototype, <span class="hljs-string">'open'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ 
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">self, args</span>) </span>{
        self[XHR_SYNC] = args[<span class="hljs-number">2</span>] == <span class="hljs-literal">false</span>;
        <span class="hljs-keyword">return</span> openNative.apply(self, args);
    }; 
});</code></pre>
<h3 id="articleHeader35">Oboe.js</h3>
<p>Oboe.js 通过将 HTTP 请求-应答模型封装在一个渐进流式接口中，帮助网页应用快速应答。它将 streaming 和downloading 间的转换与SAX和DOM间JSON的解析整合在一起。它是个非常小的库，不依赖于其他程序库。它可以在 ajax 请求结束前就开始解析 json 变得十分容易，从而提高应用的应答速度。另外，它支持 Node.js 框架，还可以读入除了 http 外的其他流。</p>
<p>有兴趣的读者，推荐看一下官网的可交互的演示示例 - <a href="http://oboejs.com/why" rel="nofollow noreferrer" target="_blank">Why Oboe.js</a></p>
<p>(备注：该库就是文中 - 使用XHR流式传输数据章节的实际应用，不信往下看)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// oboe-browser.js 源码片段
function handleProgress() {            
    var textSoFar = xhr.responseText,
        newText = textSoFar.substr(numberOfCharsAlreadyGivenToCallback);
    if( newText ) {
        emitStreamData( newText );
    } 
    numberOfCharsAlreadyGivenToCallback = len(textSoFar);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// oboe-browser.js 源码片段</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleProgress</span>(<span class="hljs-params"></span>) </span>{            
    <span class="hljs-keyword">var</span> textSoFar = xhr.responseText,
        newText = textSoFar.substr(numberOfCharsAlreadyGivenToCallback);
    <span class="hljs-keyword">if</span>( newText ) {
        emitStreamData( newText );
    } 
    numberOfCharsAlreadyGivenToCallback = len(textSoFar);
}</code></pre>
<h3 id="articleHeader36">fetch.js</h3>
<p>fetch 函数是一个基于 Promise 的机制，用于在浏览器中以编程方式发送 Web 请求。该项目是实现标准 <a href="https://fetch.spec.whatwg.org/" rel="nofollow noreferrer" target="_blank">Fetch</a> 规范的一个子集的 polyfill ，足以作为传统 Web 应用程序中 XMLHttpRequest 的代替品。</p>
<p>详细信息，请参考 - <a href="https://github.com/github/fetch" rel="nofollow noreferrer" target="_blank">Github - fetch</a> </p>
<p>Fetch API 兼容性，请参考 - <a href="http://caniuse.com/#search=Fetch" rel="nofollow noreferrer" target="_blank">Can I use Fetch</a></p>
<h2 id="articleHeader37">XMLHttpRequest 代码片段</h2>
<h3 id="articleHeader38">ArrayBuffer 对象转为字符串</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ab2str(buf) {
  return String.fromCharCode.apply(null, new Uint16Array(buf));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ab2str</span>(<span class="hljs-params">buf</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">String</span>.fromCharCode.apply(<span class="hljs-literal">null</span>, <span class="hljs-keyword">new</span> <span class="hljs-built_in">Uint16Array</span>(buf));
}</code></pre>
<p>代码片段来源 - <a href="http://javascript.ruanyifeng.com/stdlib/arraybuffer.html#toc11" rel="nofollow noreferrer" target="_blank">ArrayBuffer与字符串的互相转换</a></p>
<h3 id="articleHeader39">字符串转 ArrayBuffer对象</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function str2ab(str) {
  var buf = new ArrayBuffer(str.length * 2); // 每个字符占用2个字节
  var bufView = new Uint16Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">str2ab</span>(<span class="hljs-params">str</span>) </span>{
  <span class="hljs-keyword">var</span> buf = <span class="hljs-keyword">new</span> <span class="hljs-built_in">ArrayBuffer</span>(str.length * <span class="hljs-number">2</span>); <span class="hljs-comment">// 每个字符占用2个字节</span>
  <span class="hljs-keyword">var</span> bufView = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Uint16Array</span>(buf);
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, strLen = str.length; i &lt; strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  <span class="hljs-keyword">return</span> buf;
}</code></pre>
<p>代码片段来源 - <a href="http://javascript.ruanyifeng.com/stdlib/arraybuffer.html#toc11" rel="nofollow noreferrer" target="_blank">ArrayBuffer与字符串的互相转换</a></p>
<h3 id="articleHeader40">创建 XHR 对象</h3>
<h4>兼容所有浏览器</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Provide the XMLHttpRequest class for IE 5.x-6.x:
// Other browsers (including IE 7.x-8.x) ignore this
//   when XMLHttpRequest is predefined
var xmlHttp;
if (typeof XMLHttpRequest != &quot;undefined&quot;) {
    xmlHttp = new XMLHttpRequest();
} else if (window.ActiveXObject) {
    var aVersions = [&quot;Msxml2.XMLHttp.5.0&quot;, &quot;Msxml2.XMLHttp.4.0&quot;, 
        &quot;Msxml2.XMLHttp.3.0&quot;, &quot;Msxml2.XMLHttp&quot;, &quot;Microsoft.XMLHttp&quot;];
    for (var i = 0; i < aVersions.length; i++) {
        try {
            xmlHttp = new ActiveXObject(aVersions[i]);
            break;
        } catch (e) {}
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// Provide the XMLHttpRequest class for IE 5.x-6.x:</span>
<span class="hljs-comment">// Other browsers (including IE 7.x-8.x) ignore this</span>
<span class="hljs-comment">//   when XMLHttpRequest is predefined</span>
<span class="hljs-keyword">var</span> xmlHttp;
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> XMLHttpRequest != <span class="hljs-string">"undefined"</span>) {
    xmlHttp = <span class="hljs-keyword">new</span> XMLHttpRequest();
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.ActiveXObject) {
    <span class="hljs-keyword">var</span> aVersions = [<span class="hljs-string">"Msxml2.XMLHttp.5.0"</span>, <span class="hljs-string">"Msxml2.XMLHttp.4.0"</span>, 
        <span class="hljs-string">"Msxml2.XMLHttp.3.0"</span>, <span class="hljs-string">"Msxml2.XMLHttp"</span>, <span class="hljs-string">"Microsoft.XMLHttp"</span>];
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; aVersions.length; i++) {
        <span class="hljs-keyword">try</span> {
            xmlHttp = <span class="hljs-keyword">new</span> ActiveXObject(aVersions[i]);
            <span class="hljs-keyword">break</span>;
        } <span class="hljs-keyword">catch</span> (e) {}
    }
}</code></pre>
<h4>精简版</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xmlHttp;
if (typeof XMLHttpRequest != &quot;undefined&quot;) {
    xmlHttp = new XMLHttpRequest();
} else if (window.ActiveXObject) {
    try {
       xmlHttp = new ActiveXObject(&quot;Microsoft.XMLHTTP&quot;);
    } catch (e) {} 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> xmlHttp;
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> XMLHttpRequest != <span class="hljs-string">"undefined"</span>) {
    xmlHttp = <span class="hljs-keyword">new</span> XMLHttpRequest();
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.ActiveXObject) {
    <span class="hljs-keyword">try</span> {
       xmlHttp = <span class="hljs-keyword">new</span> ActiveXObject(<span class="hljs-string">"Microsoft.XMLHTTP"</span>);
    } <span class="hljs-keyword">catch</span> (e) {} 
}</code></pre>
<h3 id="articleHeader41">sendAsBinary() polyfill</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (!XMLHttpRequest.prototype.sendAsBinary) {
  XMLHttpRequest.prototype.sendAsBinary = function (sData) {
    var nBytes = sData.length, ui8Data = new Uint8Array(nBytes);
    for (var nIdx = 0; nIdx < nBytes; nIdx++) {
      ui8Data[nIdx] = sData.charCodeAt(nIdx) &amp; 0xff;
    }
    this.send(ui8Data);
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (!XMLHttpRequest.prototype.sendAsBinary) {
  XMLHttpRequest.prototype.sendAsBinary = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">sData</span>) </span>{
    <span class="hljs-keyword">var</span> nBytes = sData.length, ui8Data = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Uint8Array</span>(nBytes);
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> nIdx = <span class="hljs-number">0</span>; nIdx &lt; nBytes; nIdx++) {
      ui8Data[nIdx] = sData.charCodeAt(nIdx) &amp; <span class="hljs-number">0xff</span>;
    }
    <span class="hljs-keyword">this</span>.send(ui8Data);
  };
}</code></pre>
<h3 id="articleHeader42">获取 XMLHttpRequest 响应体</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function readBody(xhr) {
    var data;
    if (!xhr.responseType || xhr.responseType === &quot;text&quot;) {
        data = xhr.responseText;
    } else if (xhr.responseType === &quot;document&quot;) {
        data = xhr.responseXML;
    } else {
        data = xhr.response;
    }
    return data;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">readBody</span>(<span class="hljs-params">xhr</span>) </span>{
    <span class="hljs-keyword">var</span> data;
    <span class="hljs-keyword">if</span> (!xhr.responseType || xhr.responseType === <span class="hljs-string">"text"</span>) {
        data = xhr.responseText;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (xhr.responseType === <span class="hljs-string">"document"</span>) {
        data = xhr.responseXML;
    } <span class="hljs-keyword">else</span> {
        data = xhr.response;
    }
    <span class="hljs-keyword">return</span> data;
}</code></pre>
<p>应用示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4) {
        console.log(readBody(xhr));
    }
}
xhr.open('GET', 'https://www.baidu.com', true);
xhr.send(null);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (xhr.readyState == <span class="hljs-number">4</span>) {
        <span class="hljs-built_in">console</span>.log(readBody(xhr));
    }
}
xhr.open(<span class="hljs-string">'GET'</span>, <span class="hljs-string">'https://www.baidu.com'</span>, <span class="hljs-literal">true</span>);
xhr.send(<span class="hljs-literal">null</span>);</code></pre>
<h3 id="articleHeader43">获取 responseURL</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function getResponseURL(xhr: any): string {
  if ('responseURL' in xhr) {
    return xhr.responseURL;
  }
  if (/^X-Request-URL:/m.test(xhr.getAllResponseHeaders())) {
    return xhr.getResponseHeader('X-Request-URL');
  }
  return;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getResponseURL</span>(<span class="hljs-params">xhr: <span class="hljs-built_in">any</span></span>): <span class="hljs-title">string</span> </span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-string">'responseURL'</span> <span class="hljs-keyword">in</span> xhr) {
    <span class="hljs-keyword">return</span> xhr.responseURL;
  }
  <span class="hljs-keyword">if</span> (<span class="hljs-regexp">/^X-Request-URL:/m</span>.test(xhr.getAllResponseHeaders())) {
    <span class="hljs-keyword">return</span> xhr.getResponseHeader(<span class="hljs-string">'X-Request-URL'</span>);
  }
  <span class="hljs-keyword">return</span>;
}</code></pre>
<p>代码片段来源 - <a href="https://github.com/angular/angular/blob/master/packages/http/src/http_utils.ts#L35" rel="nofollow noreferrer" target="_blank">Github - @angular/http - http_utils.ts</a></p>
<h3 id="articleHeader44">验证请求是否成功</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const isSuccess = (status: number): boolean => (status >= 200 &amp;&amp; status < 300);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> isSuccess = (status: <span class="hljs-built_in">number</span>): <span class="hljs-function"><span class="hljs-params">boolean</span> =&gt;</span> (status &gt;= <span class="hljs-number">200</span> &amp;&amp; status &lt; <span class="hljs-number">300</span>);</code></pre>
<p>代码片段来源 - <a href="https://github.com/angular/angular/blob/master/packages/http/src/http_utils.ts#L33" rel="nofollow noreferrer" target="_blank">Github - @angular/http - http_utils.ts</a></p>
<h3 id="articleHeader45">解析查询参数为Map对象</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function paramParser(rawParams: string = ''): Map<string, string[]> {
  const map = new Map<string, string[]>();
  if (rawParams.length > 0) {
    const params: string[] = rawParams.split('&amp;');
    params.forEach((param: string) => {
      const eqIdx = param.indexOf('=');
      const [key, val]: string[] =
          eqIdx == -1 ? [param, ''] : [param.slice(0, eqIdx), param.slice(eqIdx + 1)];
      const list = map.get(key) || [];
      list.push(val);
      map.set(key, list);
    });
  }
  return map;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">paramParser</span>(<span class="hljs-params">rawParams: <span class="hljs-built_in">string</span> = ''</span>): <span class="hljs-title">Map</span>&lt;<span class="hljs-title">string</span>, <span class="hljs-title">string</span>[]&gt; </span>{
  <span class="hljs-keyword">const</span> map = <span class="hljs-keyword">new</span> Map&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>[]&gt;();
  <span class="hljs-keyword">if</span> (rawParams.length &gt; <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">const</span> params: <span class="hljs-built_in">string</span>[] = rawParams.split(<span class="hljs-string">'&amp;'</span>);
    params.forEach(<span class="hljs-function">(<span class="hljs-params">param: <span class="hljs-built_in">string</span></span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> eqIdx = param.indexOf(<span class="hljs-string">'='</span>);
      <span class="hljs-keyword">const</span> [key, val]: <span class="hljs-built_in">string</span>[] =
          eqIdx == <span class="hljs-number">-1</span> ? [param, <span class="hljs-string">''</span>] : [param.slice(<span class="hljs-number">0</span>, eqIdx), param.slice(eqIdx + <span class="hljs-number">1</span>)];
      <span class="hljs-keyword">const</span> list = map.get(key) || [];
      list.push(val);
      map.set(key, list);
    });
  }
  <span class="hljs-keyword">return</span> map;
}</code></pre>
<p>代码片段来源 - <a href="https://github.com/angular/angular/blob/master/packages/http/src/url_search_params.ts#L9" rel="nofollow noreferrer" target="_blank">Github - @angular/http - url_search_params.ts</a></p>
<p>ts 转换为 js 的代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   function paramParser(rawParams) {
        if (rawParams === void 0) { rawParams = ''; }
        var map = new Map();
        if (rawParams.length > 0) {
            var params = rawParams.split('&amp;');
            params.forEach(function (param) {
                var eqIdx = param.indexOf('=');
                var _a = eqIdx == -1 ? [param, ''] : 
                    [param.slice(0, eqIdx), param.slice(eqIdx + 1)], key = _a[0], 
                        val = _a[1];
                var list = map.get(key) || [];
                list.push(val);
                map.set(key, list);
            });
        }
        return map;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">   <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">paramParser</span>(<span class="hljs-params">rawParams</span>) </span>{
        <span class="hljs-keyword">if</span> (rawParams === <span class="hljs-keyword">void</span> <span class="hljs-number">0</span>) { rawParams = <span class="hljs-string">''</span>; }
        <span class="hljs-keyword">var</span> map = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>();
        <span class="hljs-keyword">if</span> (rawParams.length &gt; <span class="hljs-number">0</span>) {
            <span class="hljs-keyword">var</span> params = rawParams.split(<span class="hljs-string">'&amp;'</span>);
            params.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">param</span>) </span>{
                <span class="hljs-keyword">var</span> eqIdx = param.indexOf(<span class="hljs-string">'='</span>);
                <span class="hljs-keyword">var</span> _a = eqIdx == <span class="hljs-number">-1</span> ? [param, <span class="hljs-string">''</span>] : 
                    [param.slice(<span class="hljs-number">0</span>, eqIdx), param.slice(eqIdx + <span class="hljs-number">1</span>)], key = _a[<span class="hljs-number">0</span>], 
                        val = _a[<span class="hljs-number">1</span>];
                <span class="hljs-keyword">var</span> list = map.get(key) || [];
                list.push(val);
                map.set(key, list);
            });
        }
        <span class="hljs-keyword">return</span> map;
    }</code></pre>
<h3 id="articleHeader46">XHR 下载图片</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://avatars2.githubusercontent.com/u/4220799?v=3');
    xhr.responseType = 'blob';

    xhr.onload = function() {
        if (this.status == 200) {
            var img = document.createElement('img');
            img.src = window.URL.createObjectURL(this.response); 
            img.onload = function() {
                window.URL.revokeObjectURL(this.src); 
            };
            document.body.appendChild(img);
        }
    };
    xhr.send();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
    xhr.open(<span class="hljs-string">'GET'</span>, <span class="hljs-string">'https://avatars2.githubusercontent.com/u/4220799?v=3'</span>);
    xhr.responseType = <span class="hljs-string">'blob'</span>;

    xhr.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.status == <span class="hljs-number">200</span>) {
            <span class="hljs-keyword">var</span> img = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'img'</span>);
            img.src = <span class="hljs-built_in">window</span>.URL.createObjectURL(<span class="hljs-keyword">this</span>.response); 
            img.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                <span class="hljs-built_in">window</span>.URL.revokeObjectURL(<span class="hljs-keyword">this</span>.src); 
            };
            <span class="hljs-built_in">document</span>.body.appendChild(img);
        }
    };
    xhr.send();</code></pre>
<h3 id="articleHeader47">XHR 上传数据</h3>
<h4>发送普通文本</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr = new XMLHttpRequest();
xhr.open('POST','/upload');
xhr.onload = function() { ... };
xhr.send(&quot;text string&quot;); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
xhr.open(<span class="hljs-string">'POST'</span>,<span class="hljs-string">'/upload'</span>);
xhr.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ ... };
xhr.send(<span class="hljs-string">"text string"</span>); </code></pre>
<h4>发送FormData</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var formData = new FormData(); 
formData.append('id', 123456);
formData.append('topic', 'performance');

var xhr = new XMLHttpRequest();
xhr.open('POST', '/upload');
xhr.onload = function() { ... };
xhr.send(formData); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> formData = <span class="hljs-keyword">new</span> FormData(); 
formData.append(<span class="hljs-string">'id'</span>, <span class="hljs-number">123456</span>);
formData.append(<span class="hljs-string">'topic'</span>, <span class="hljs-string">'performance'</span>);

<span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
xhr.open(<span class="hljs-string">'POST'</span>, <span class="hljs-string">'/upload'</span>);
xhr.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ ... };
xhr.send(formData); </code></pre>
<h4>发送 Buffer</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr = new XMLHttpRequest();
xhr.open('POST', '/upload');
xhr.onload = function() { ... };
var uInt8Array = new Uint8Array([1, 2, 3]); 
xhr.send(uInt8Array.buffer);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> <span class="hljs-type">XMLHttpRequest</span>();
xhr.open(<span class="hljs-string">'POST'</span>, <span class="hljs-string">'/upload'</span>);
xhr.onload = <span class="hljs-function"><span class="hljs-keyword">function</span></span>() { ... };
<span class="hljs-keyword">var</span> uInt8Array = <span class="hljs-keyword">new</span> <span class="hljs-type">Uint8Array</span>([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]); 
xhr.send(uInt8Array.buffer);</code></pre>
<h3 id="articleHeader48">XHR 上传进度条</h3>
<p>progress 元素</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<progress id=&quot;uploadprogress&quot; min=&quot;0&quot; max=&quot;100&quot; value=&quot;0&quot;>0</progress>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">progress</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"uploadprogress"</span> <span class="hljs-attr">min</span>=<span class="hljs-string">"0"</span> <span class="hljs-attr">max</span>=<span class="hljs-string">"100"</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"0"</span>&gt;</span>0<span class="hljs-tag">&lt;/<span class="hljs-name">progress</span>&gt;</span></code></pre>
<p>定义 progress 事件的回调函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.upload.onprogress = function (event) {
　　if (event.lengthComputable) {
　　　　　　var complete = (event.loaded / event.total * 100 | 0);
　　　　　　var progress = document.getElementById('uploadprogress');
　　　　　　progress.value = progress.innerHTML = complete;
　　}
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">xhr.upload.onprogress = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
　　<span class="hljs-keyword">if</span> (event.lengthComputable) {
　　　　　　<span class="hljs-keyword">var</span> complete = (event.loaded / event.total * <span class="hljs-number">100</span> | <span class="hljs-number">0</span>);
　　　　　　<span class="hljs-keyword">var</span> progress = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'uploadprogress'</span>);
　　　　　　progress.value = progress.innerHTML = complete;
　　}
};</code></pre>
<p>注意，progress事件不是定义在xhr，而是定义在xhr.upload，因为这里需要区分下载和上传，下载也有一个progress事件。</p>
<h2 id="articleHeader49">我有话说</h2>
<h3 id="articleHeader50">1.什么情况下 XMLHttpRequest status 会为 0？</h3>
<p>XMLHttpRequest 返回 status 时，会执行以下步骤：</p>
<ul>
<li><p>如果状态是 UNSENT 或 OPENED，则返回 0</p></li>
<li><p>如果错误标志被设置，则返回 0</p></li>
<li><p>否则返回 HTTP 状态码</p></li>
</ul>
<p>另外当访问本地文件资源或在 Android 4.1 stock browser 中从应用缓存中获取文件时，XMLHttpRequest 的 status 值也会为0。</p>
<p><strong>示例一：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xmlhttp;
xmlhttp = new XMLHttpRequest();
xmlhttp.open(&quot;GET&quot;,&quot;http://www.w3schools.com/XML/cd_catalog.xml&quot;, true);
xmlhttp.onreadystatechange=function() {
  if(xmlhttp.readyState == 4) console.log(&quot;status &quot; + xmlhttp.status);
};
xmlhttp.addEventListener('error', function (error) {
   console.dir(error);
});
xmlhttp.send();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> xmlhttp;
xmlhttp = <span class="hljs-keyword">new</span> XMLHttpRequest();
xmlhttp.open(<span class="hljs-string">"GET"</span>,<span class="hljs-string">"http://www.w3schools.com/XML/cd_catalog.xml"</span>, <span class="hljs-literal">true</span>);
xmlhttp.onreadystatechange=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">if</span>(xmlhttp.readyState == <span class="hljs-number">4</span>) <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"status "</span> + xmlhttp.status);
};
xmlhttp.addEventListener(<span class="hljs-string">'error'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
   <span class="hljs-built_in">console</span>.dir(error);
});
xmlhttp.send();</code></pre>
<p>以上代码运行后，将会在控制台输出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="status 0
ProgressEvent # error 对象" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs subunit"><code>status 0
<span class="hljs-keyword">Progress</span>Event # error 对象</code></pre>
<h3 id="articleHeader51">2.为什么 GET 或 HEAD 请求，不能通过 send() 方法发送请求体？</h3>
<blockquote>
<p><code>client . send([body = null])</code></p>
<p>Initiates the request. The optional argument provides the <a href="https://xhr.spec.whatwg.org/#request-body" rel="nofollow noreferrer" target="_blank">request body</a>. The argument is ignored if <a href="https://xhr.spec.whatwg.org/#request-method" rel="nofollow noreferrer" target="_blank">request method</a> is <code>GET</code> or <code>HEAD</code>.  —— xhr.spec</p>
</blockquote>
<p>通过 XMLHttpRequest 规范，我们知道当请求方法是 GET 或 HEAD 时，<code>send()</code> 方法的 body 参数值将会被忽略。那么对于我们常用的 GET 请求，我们要怎么传递参数呢？解决参数传递可以使用以下两种方式：</p>
<ul>
<li><p>URL 传参 - 常用方式，有大小限制大约为 2KB</p></li>
<li><p>请求头传参 - 一般用于传递 token 等认证信息</p></li>
</ul>
<p><strong>URL 传参</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var url = &quot;bla.php&quot;;
var params = &quot;somevariable=somevalue&amp;anothervariable=anothervalue&quot;;
var http = new XMLHttpRequest();

http.open(&quot;GET&quot;, url+&quot;?&quot;+params, true);
http.onreadystatechange = function()
{
    if(http.readyState == 4 &amp;&amp; http.status == 200) {
        alert(http.responseText);
    }
}
http.send(null); // 请求方法是GET或HEAD时，设置请求体为空" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> url = <span class="hljs-string">"bla.php"</span>;
<span class="hljs-keyword">var</span> params = <span class="hljs-string">"somevariable=somevalue&amp;anothervariable=anothervalue"</span>;
<span class="hljs-keyword">var</span> http = <span class="hljs-keyword">new</span> XMLHttpRequest();

http.open(<span class="hljs-string">"GET"</span>, url+<span class="hljs-string">"?"</span>+params, <span class="hljs-literal">true</span>);
http.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)
</span>{
    <span class="hljs-keyword">if</span>(http.readyState == <span class="hljs-number">4</span> &amp;&amp; http.status == <span class="hljs-number">200</span>) {
        alert(http.responseText);
    }
}
http.send(<span class="hljs-literal">null</span>); <span class="hljs-comment">// 请求方法是GET或HEAD时，设置请求体为空</span></code></pre>
<p>在日常开发中，我们最常用的方式是传递参数对象，因此我们可以封装一个 <code>formatParams()</code> 来实现参数格式，具体示例如下：</p>
<p>formatParams() 函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function formatParams( params ){
  return &quot;?&quot; + Object
        .keys(params)
        .map(function(key){
          return key+&quot;=&quot;+params[key]
        })
        .join(&quot;&amp;&quot;)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">formatParams</span>(<span class="hljs-params"> params </span>)</span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">"?"</span> + <span class="hljs-built_in">Object</span>
        .keys(params)
        .map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">key</span>)</span>{
          <span class="hljs-keyword">return</span> key+<span class="hljs-string">"="</span>+params[key]
        })
        .join(<span class="hljs-string">"&amp;"</span>)
}</code></pre>
<p>应用示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var endpoint = &quot;https://api.example.com/endpoint&quot;;
var params = {
  a: 1, 
  b: 2,
  c: 3
};
var url = endpoint + formatParams(params); // 实际应用中需要判断endpoint是否已经包含查询参数
// => &quot;https://api.example.com/endpoint?a=1&amp;b=2&amp;c=3&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> endpoint = <span class="hljs-string">"https://api.example.com/endpoint"</span>;
<span class="hljs-keyword">var</span> params = {
  <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>, 
  <span class="hljs-attr">b</span>: <span class="hljs-number">2</span>,
  <span class="hljs-attr">c</span>: <span class="hljs-number">3</span>
};
<span class="hljs-keyword">var</span> url = endpoint + formatParams(params); <span class="hljs-comment">// 实际应用中需要判断endpoint是否已经包含查询参数</span>
<span class="hljs-comment">// =&gt; "https://api.example.com/endpoint?a=1&amp;b=2&amp;c=3";</span></code></pre>
<p>一些常用的 AJAX 库，如 jQuery、zepto 等，内部已经封装了参数序列化的方法 (如：<a href="http://api.jquery.com/jquery.param/" rel="nofollow noreferrer" target="_blank">jquery.param</a>)，我们直接调用顶层的 API 方法即可。</p>
<p>(备注：以上示例来源 - <a href="http://stackoverflow.com/questions/8064691/how-do-i-pass-along-variables-with-xmlhttprequest" rel="nofollow noreferrer" target="_blank">stackoverflow - How do I pass along variables with XMLHttpRequest</a>)</p>
<p><strong>请求头传参 - (身份认证)</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr = new XMLHttpRequest();
xhr.open(&quot;POST&quot;, '/server', true);

xhr.setRequestHeader(&quot;x-access-token&quot;, &quot;87a476494db6ec53d0a206589611aa3f&quot;);
xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 &amp;&amp; xhr.status == 200) {
       // handle data 
    }
};
xhr.send(&quot;foo=bar&amp;lorem=ipsum&quot;); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
xhr.open(<span class="hljs-string">"POST"</span>, <span class="hljs-string">'/server'</span>, <span class="hljs-literal">true</span>);

xhr.setRequestHeader(<span class="hljs-string">"x-access-token"</span>, <span class="hljs-string">"87a476494db6ec53d0a206589611aa3f"</span>);
xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span>(xhr.readyState == <span class="hljs-number">4</span> &amp;&amp; xhr.status == <span class="hljs-number">200</span>) {
       <span class="hljs-comment">// handle data </span>
    }
};
xhr.send(<span class="hljs-string">"foo=bar&amp;lorem=ipsum"</span>); </code></pre>
<p>详细的身份认证信息，请参考 - <a href="https://jwt.io/" rel="nofollow noreferrer" target="_blank">JSON Web Tokens</a></p>
<h3 id="articleHeader52">3.XMLHttpRequest 请求体支持哪些格式？</h3>
<p>send() 方法签名：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="void send();

void send(ArrayBuffer data);

void send(Blob data);

void send(Document data);

void send(DOMString? data);

void send(FormData data);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-built_in">void</span> send();

<span class="hljs-built_in">void</span> send(<span class="hljs-built_in">ArrayBuffer</span> data);

<span class="hljs-built_in">void</span> send(Blob data);

<span class="hljs-built_in">void</span> send(Document data);

<span class="hljs-built_in">void</span> send(DOMString? data);

<span class="hljs-built_in">void</span> send(FormData data);</code></pre>
<p><strong>POST请求示例</strong></p>
<p>发送 POST 请求通常需要以下步骤：</p>
<ul>
<li><p>使用 open() 方法打开连接时，设定 POST 请求方法和请求 URL地址</p></li>
<li><p>设置正确的 <code>Content-Type</code> 请求头</p></li>
<li><p>设置相关的事件监听</p></li>
<li><p>设置请求体，并使用 send() 方法，发送请求</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr = new XMLHttpRequest();
xhr.open(&quot;POST&quot;, '/server', true);

//Send the proper header information along with the request
xhr.setRequestHeader(&quot;Content-Type&quot;, &quot;application/x-www-form-urlencoded&quot;);

xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 &amp;&amp; xhr.status == 200) {
        // handle data
    }
}
xhr.send(&quot;foo=bar&amp;lorem=ipsum&quot;); 
// xhr.send('string'); 
// xhr.send(new Blob()); 
// xhr.send(new Int8Array()); 
// xhr.send({ form: 'data' }); 
// xhr.send(document);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
xhr.open(<span class="hljs-string">"POST"</span>, <span class="hljs-string">'/server'</span>, <span class="hljs-literal">true</span>);

<span class="hljs-comment">//Send the proper header information along with the request</span>
xhr.setRequestHeader(<span class="hljs-string">"Content-Type"</span>, <span class="hljs-string">"application/x-www-form-urlencoded"</span>);

xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span>(xhr.readyState == <span class="hljs-number">4</span> &amp;&amp; xhr.status == <span class="hljs-number">200</span>) {
        <span class="hljs-comment">// handle data</span>
    }
}
xhr.send(<span class="hljs-string">"foo=bar&amp;lorem=ipsum"</span>); 
<span class="hljs-comment">// xhr.send('string'); </span>
<span class="hljs-comment">// xhr.send(new Blob()); </span>
<span class="hljs-comment">// xhr.send(new Int8Array()); </span>
<span class="hljs-comment">// xhr.send({ form: 'data' }); </span>
<span class="hljs-comment">// xhr.send(document);</span></code></pre>
<h3 id="articleHeader53">4.什么是简单请求和预请求 (preflight request) ？</h3>
<p><strong>简单请求</strong></p>
<p>一些不会触发 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS#Preflighted_requests" rel="nofollow noreferrer" target="_blank">CORS preflight</a> 的请求被称为 "简单请求"，虽然 <a href="https://fetch.spec.whatwg.org/" rel="nofollow noreferrer" target="_blank">Fetch</a>  (定义 CORS的) 不使用这个术语。满足下述条件的就是 "简单请求"：</p>
<ul>
<li>
<p>只允许下列方法：</p>
<ul>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/GET" rel="nofollow noreferrer" target="_blank">GET</a></p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/HEAD" rel="nofollow noreferrer" target="_blank">HEAD</a></p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/POST" rel="nofollow noreferrer" target="_blank">POST</a></p></li>
</ul>
</li>
<li>
<p>除了用户代理自动设置的头部外（比如 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Connection" rel="nofollow noreferrer" target="_blank">Connection</a>， <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/User-Agent" rel="nofollow noreferrer" target="_blank">User-Agent</a> ，或者<a href="https://fetch.spec.whatwg.org/#forbidden-header-name" rel="nofollow noreferrer" target="_blank">其他任意的 Fetch 规范定义的 禁止的头部名</a> ），唯一允许人工设置的头部是 Fetch 规范定义的 <a href="https://fetch.spec.whatwg.org/#cors-safelisted-request-header" rel="nofollow noreferrer" target="_blank">CORS-safelisted request-header</a>，如下：</p>
<ul>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept" rel="nofollow noreferrer" target="_blank">Accept</a></p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept-Language" rel="nofollow noreferrer" target="_blank">Accept-Language</a></p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Language" rel="nofollow noreferrer" target="_blank">Content-Language</a></p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type" rel="nofollow noreferrer" target="_blank">Content-Type</a></p></li>
</ul>
</li>
<li>
<p>允许的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type" rel="nofollow noreferrer" target="_blank"><code>Content-Type</code></a> 值有：</p>
<ul>
<li><p>application/x-www-form-urlencoded</p></li>
<li><p>multipart/form-data</p></li>
<li><p>text/plain</p></li>
</ul>
</li>
</ul>
<p><strong>预请求</strong></p>
<p>不同于上面讨论的简单请求，"预请求" 要求必须先发送一个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/OPTIONS" rel="nofollow noreferrer" target="_blank"><code>OPTIONS</code></a>  方法请求给目的站点，来查明这个跨站请求对于目的站点是不是安全的可接受的。这样做，是因为跨站请求可能会对目的站点的数据产生影响。 当请求具备以下条件，就会被当成预请求处理：</p>
<ul>
<li>
<p>使用下述方法以外的请求：</p>
<ul>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/GET" rel="nofollow noreferrer" target="_blank">GET</a></p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/HEAD" rel="nofollow noreferrer" target="_blank">HEAD</a></p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Methods/POST" rel="nofollow noreferrer" target="_blank">POST</a></p></li>
</ul>
</li>
<li>
<p>除了用户代理自动设置的头部外（比如 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Connection" rel="nofollow noreferrer" target="_blank">Connection</a>， <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/User-Agent" rel="nofollow noreferrer" target="_blank">User-Agent</a> ，或者<a href="https://fetch.spec.whatwg.org/#forbidden-header-name" rel="nofollow noreferrer" target="_blank">其他任意的 Fetch 规范定义的 “禁止的头部名”</a> ），预请求不包括 Fetch 规范定义的 "<a href="https://fetch.spec.whatwg.org/#cors-safelisted-request-header" rel="nofollow noreferrer" target="_blank">CORS-safelisted request-header</a>"：</p>
<ul>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept" rel="nofollow noreferrer" target="_blank">Accept</a></p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Accept-Language" rel="nofollow noreferrer" target="_blank">Accept-Language</a></p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Language" rel="nofollow noreferrer" target="_blank">Content-Language</a></p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type" rel="nofollow noreferrer" target="_blank">Content-Type</a></p></li>
</ul>
</li>
<li>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Content-Type" rel="nofollow noreferrer" target="_blank">Content-Type</a> 头部的值除了下列之外的:</p>
<ul>
<li><p>application/x-www-form-urlencoded</p></li>
<li><p>multipart/form-data</p></li>
<li><p>text/plain</p></li>
</ul>
</li>
</ul>
<p>详细的信息，请参考 - <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS" rel="nofollow noreferrer" target="_blank">MDN - HTTP 访问控制 (CORS)</a></p>
<h3 id="articleHeader54">5.XMLHttpRequest 对象垃圾回收机制是什么？</h3>
<p>在以下情况下，XMLHttpRequest 对象不会被垃圾回收：</p>
<ul>
<li><p>如果 XMLHttpRequest 对象的状态是 <code>OPENED</code> 且已设置 <code>send()</code> 的标识符</p></li>
<li><p>XMLHttpRequest 对象的状态是 HEADERS_RECEIVED (已获取响应头)</p></li>
<li><p>XMLHttpRequest 对象的状态是 LOADING (正在下载响应体)，并且监听了以下一个或多个事件：readystatechange、progress、abort、error、load、timeout、loadend</p></li>
</ul>
<p>如果 XMLHttpRequest 对象在连接尚存打开时被垃圾回收机制回收了，用户代理必须终止请求。</p>
<h3 id="articleHeader55">6.GET 和 POST 请求的区别？</h3>
<ul>
<li><p>对于 GET 请求，浏览器会把 HTTP headers 和 data 一并发送出去，服务器响应 200。</p></li>
<li><p>而对于 POST 请求，浏览器会先发送 HTTP headers，服务器响应 100 continue ，浏览器再发送 data，服务器响应 200。</p></li>
</ul>
<p>详细的信息，请参考 - <a href="https://zhuanlan.zhihu.com/p/22536382" rel="nofollow noreferrer" target="_blank">99%的人都理解错了HTTP中GET与POST的区别</a></p>
<h3 id="articleHeader56">7.怎样防止重复发送 AJAX 请求？</h3>
<ul>
<li><p>setTimeout + clearTimeout - 连续的点击会把上一次点击清除掉，也就是ajax请求会在最后一次点击后发出去</p></li>
<li><p>disable 按钮</p></li>
<li><p>缓存已成功的请求，若请求参数一致，则直接返回，不发送请求</p></li>
</ul>
<p>详细的信息，请参考 - <a href="https://www.zhihu.com/question/19805411" rel="nofollow noreferrer" target="_blank">知乎 - 怎样防止重复发送 Ajax 请求</a></p>
<h3 id="articleHeader57">8、AJAX 站点怎么做 SEO 优化</h3>
<p>众所周知，大部分的搜索引擎爬虫都不会执行 JS，也就是说，如果页面内容由 Ajax 返回的话，搜索引擎是爬取不到部分内容的，也就无从做 SEO (搜索引擎优化)了。国外的 <a href="https://prerender.io/" rel="nofollow noreferrer" target="_blank">prerender.io</a> 网站提供了一套比较成熟的方案，但是需要付费的。接下来我们来看一下，怎么 <a href="http://phantomjs.org/" rel="nofollow noreferrer" target="_blank">PhantomJS</a> 为我们的站点做 SEO。</p>
<p>详细的信息，请参考 - <a href="https://www.mxgw.info/t/phantomjs-prerender-for-seo.html" rel="nofollow noreferrer" target="_blank">用PhantomJS来给AJAX站点做SEO优化</a></p>
<h2 id="articleHeader58">精品文章</h2>
<ul>
<li><p><a href="https://www.html5rocks.com/zh/tutorials/file/xhr2/" rel="nofollow noreferrer" target="_blank">XMLHttpRequest 2新技巧</a></p></li>
<li><p><a href="http://www.ruanyifeng.com/blog/2012/09/xmlhttprequest_level_2.html" rel="nofollow noreferrer" target="_blank">阮一峰 - XMLHttpRequest Level 2 使用指南</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000004322487">segmentfault - 你真的会使用XMLHttpRequest吗?</a></p></li>
<li><p><a href="http://louiszhai.github.io/2016/11/02/ajax/" rel="nofollow noreferrer" target="_blank">Github - Ajax 知识体系大梳理</a></p></li>
</ul>
<h2 id="articleHeader59">参考资源</h2>
<ul>
<li><p><a href="https://xhr.spec.whatwg.org/" rel="nofollow noreferrer" target="_blank">XMLHttpRequest 标准</a></p></li>
<li><p><a href="https://hpbn.co/xmlhttprequest/#preflight" rel="nofollow noreferrer" target="_blank">High Performance Browser Networking - XMLHttpRequest</a></p></li>
<li><p><a href="https://msdn.microsoft.com/zh-cn/library/7sw4ddf8(v=vs.94" rel="nofollow noreferrer" target="_blank">msdn - ActiveXObject 对象</a>.aspx)</p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest" rel="nofollow noreferrer" target="_blank">mdn - XMLHttpRequest</a></p></li>
<li><p><a href="https://www.html5rocks.com/zh/tutorials/file/xhr2/" rel="nofollow noreferrer" target="_blank">XMLHttpRequest 2新技巧</a></p></li>
<li><p><a href="http://www.ruanyifeng.com/blog/2012/09/xmlhttprequest_level_2.html" rel="nofollow noreferrer" target="_blank">阮一峰 - XMLHttpRequest Level 2 使用指南</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000004322487">segmentfault - 你真的会使用XMLHttpRequest吗?</a></p></li>
<li><p><a href="http://louiszhai.github.io/2016/11/02/ajax/" rel="nofollow noreferrer" target="_blank">Github - Ajax 知识体系大梳理</a></p></li>
<li><p><a href="http://javascript.ruanyifeng.com/stdlib/arraybuffer.html" rel="nofollow noreferrer" target="_blank">JavaScript 标准参考教程 (alpha) - 二进制数组</a>​</p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
你不知道的 XMLHttpRequest

## 原文链接
[https://segmentfault.com/a/1190000008950789](https://segmentfault.com/a/1190000008950789)

