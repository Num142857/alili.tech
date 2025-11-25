---
title: '为什么是 JSONP' 
date: 2019-02-11 2:30:49
hidden: true
slug: o0w4l8o5r5
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">AJAX、JSON、JSONP</h2>
<p>在 WEB 开发中，经常见到诸如 AJAX、JSON、JSONP 这些名词。三者看起来很像，很多同学尤其是没有系统了解过前端技术体系的同学，平常只是借助类似 JQuery 这类库封装好的函数使用而已，并不了解其原理。但这三种东西具体是什么，有什么关系和区别却常常说不清楚。</p>
<p>接下来，会简要介绍一下三者的的含义，重点阐述 JSONP 的来源和原理，以及为什么 JSONP 不是 AJAX。</p>
<h3 id="articleHeader1">AJAX （Asynchronous JavaScript + XML）</h3>
<blockquote>
<p>Ajax isn’t a technology. It’s really several technologies, each flourishing in its own right, coming together in powerful new ways. Ajax incorporates:</p>
<ul>
<li><p>standards-based presentation using XHTML and CSS;</p></li>
<li><p>dynamic display and interaction using the Document Object Model;</p></li>
<li><p>data interchange and manipulation using XML and XSLT;</p></li>
<li><p>asynchronous data retrieval using XMLHttpRequest;</p></li>
<li><p>and JavaScript binding everything together.</p></li>
</ul>
</blockquote>
<p>异步 JavaScript + XML，是在 2005 年由 <a href="http://adaptivepath.org/ideas/ajax-new-approach-web-applications/" rel="nofollow noreferrer" target="_blank">Jesse James Garrett 提出的一个术语</a>。 AJAX 并非特指某种技术, 描述的是一种结合使用大量已有技术的方式, 包括: HTML 或 XHTML, CSS, JavaScript, DOM, XML, XSLT, 还有最重要的 XMLHttpRequest 对象.</p>
<p>尽管在 AJAX 中 X 代表 XML, 但现在更多的在使用 JSON，因为 JSON 具有很多优势，比如更轻量并且是 JavaScript 的一部分。在 AJAX 模型中 JSON 和 XML 都用于承载信息.</p>
<h3 id="articleHeader2">JSON（Javascript Object Notation）</h3>
<p><a href="http://www.json.org/json-zh.html" rel="nofollow noreferrer" target="_blank">JSON</a> 是一种轻量级的数据交换格式。由道格拉斯·克罗克福特（Douglas Crockford）在 2012 年发明，并逐渐取代 XML 成为事实上的数据交换格式标准。</p>
<p>JSON 基于 JavaScript Programming Language, Standard ECMA-262 3rd Edition - December 1999的一个子集。但采用完全独立于语言的文本格式，并使用了类似于 C 语言家族的习惯。</p>
<p>在 JSON 中，一共 6 种数据类型：</p>
<ul>
<li><p>number：跟 Javascript 的数值一致，除去未曾使用的八进制与十六进制格式，和一些编码细节</p></li>
<li><p>boolean：<code>true</code> 和 <code>false</code></p></li>
<li><p>string：是由双引号包围的任意数量Unicode字符的集合，使用反斜线转义</p></li>
<li><p>null：<code>null</code></p></li>
<li><p>array：数组是值（value）的有序集合。一个数组以“[”（左中括号）开始，“]”（右中括号）结束，值之间使用“,”（逗号）分隔</p></li>
<li><p>object：对象是一个无序的“‘名称/值’对”集合。一个对象以“{”（左括号）开始，“}”（右括号）结束，每个“名称”后跟一个“:”（冒号）；“‘名称/值’ 对”之间使用“,”（逗号）分隔</p></li>
</ul>
<p>以及上面的任意组合。</p>
<p>在 JavaScript 中有一个全局对象 JSON，包含两个方法 <code>JSON.stringify()</code> 和 <code>JSON.parse()</code>，用于序列化和解析 JSON。</p>
<p>当然也有人使用 <code>eval("(" + string + ")")</code> 代替 <code>JSON.parse()</code> 来 解析JSON，相比而言这种方式的容错性更高。</p>
<h3 id="articleHeader3">JSONP（JSON with Padding）</h3>
<p>因为 <code>XMLHttpRequest</code> 有同源策略，而在实际开发中又常常会有跨域的需求，早期开发者为了解决跨域问题而搞出来这样一个颇为奇怪的东西。产生原因和名字一样古怪，光听名字恐怕没几个人知道说的是个什么东西。</p>
<p>刚好 <code>&lt;script&gt;</code> 标签可以引用其他域下的静态资源，想想我们有时候在站点引入的数据统计类的 JS。</p>
<p>但我们要的是数据，而不是一段静态的 JS 代码，怎么办？</p>
<p>这还不简单吗，让服务器动态生成 js ，再把数据放进去不就可以吗。为了区分每一份数据，还需要针对返回的数据做一个标识，其实就是在数据外面包裹一个函数名。</p>
<p>然后需要浏览器端预先设置好这样一个函数，返回的数据就相当于一次执行过程，对获取数据的处理。</p>
<h3 id="articleHeader4">总结</h3>
<ol>
<li><p>AJAX 是一类技术的集合，其中最重要的是 <code>XMLHttpRequest</code></p></li>
<li><p>JSON 是一个数据交换格式，也是目前事实上的标准</p></li>
<li><p>JSONP 是为解决跨域问题搞出来的一种获取数据的方式</p></li>
</ol>
<h2 id="articleHeader5">举个栗子</h2>
<p>接下来，用这个简单的示例来说明如何通过 JSONP 的方式获取数据，以及它到底是怎样工作的。</p>
<h3 id="articleHeader6">服务器</h3>
<p>这里使用 Node.js 返回一段简单的数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 一个简单的 http 服务器,返回 json 数据
 * 跟 Node 主页上的那个经典例子没太大差别
 */

var http = require('http');
var urllib = require('url');

var host = '127.0.0.1';
var port = 9999;

var data = {'name': 'Mirreal', 'age': '24'};

http.createServer(function(req, res) {
  var params = urllib.parse(req.url, true);

  if (params.query &amp;&amp; params.query.callback) {

    var str =  params.query.callback + '(' + JSON.stringify(data) + ')'; // jsonp
    res.writeHead(200, { 'Content-Type': 'application/javascript' });
    res.end(str);
  } else {
    res.end(JSON.stringify(data)); // 普通的json
  }

}).listen(port, host, function() {
  console.log('server is listening on port ' + port);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 一个简单的 http 服务器,返回 json 数据
 * 跟 Node 主页上的那个经典例子没太大差别
 */</span>

<span class="hljs-keyword">var</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>);
<span class="hljs-keyword">var</span> urllib = <span class="hljs-built_in">require</span>(<span class="hljs-string">'url'</span>);

<span class="hljs-keyword">var</span> host = <span class="hljs-string">'127.0.0.1'</span>;
<span class="hljs-keyword">var</span> port = <span class="hljs-number">9999</span>;

<span class="hljs-keyword">var</span> data = {<span class="hljs-string">'name'</span>: <span class="hljs-string">'Mirreal'</span>, <span class="hljs-string">'age'</span>: <span class="hljs-string">'24'</span>};

http.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
  <span class="hljs-keyword">var</span> params = urllib.parse(req.url, <span class="hljs-literal">true</span>);

  <span class="hljs-keyword">if</span> (params.query &amp;&amp; params.query.callback) {

    <span class="hljs-keyword">var</span> str =  params.query.callback + <span class="hljs-string">'('</span> + <span class="hljs-built_in">JSON</span>.stringify(data) + <span class="hljs-string">')'</span>; <span class="hljs-comment">// jsonp</span>
    res.writeHead(<span class="hljs-number">200</span>, { <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'application/javascript'</span> });
    res.end(str);
  } <span class="hljs-keyword">else</span> {
    res.end(<span class="hljs-built_in">JSON</span>.stringify(data)); <span class="hljs-comment">// 普通的json</span>
  }

}).listen(port, host, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'server is listening on port '</span> + port);
});</code></pre>
<h3 id="articleHeader7">浏览器</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// zepto 的写法
$.ajax({
  type: 'GET',
  url: 'http://127.0.0.1:9999',
  data: { _input_charset: 'utf-8' },
  dataType: 'jsonp',
  timeout: 300,
  context: $('body'),
  success: function(data){
    console.log(data)
  },
  error: function(xhr, type) {
    console.log('Ajax error!')
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// zepto 的写法</span>
$.ajax({
  <span class="hljs-attr">type</span>: <span class="hljs-string">'GET'</span>,
  <span class="hljs-attr">url</span>: <span class="hljs-string">'http://127.0.0.1:9999'</span>,
  <span class="hljs-attr">data</span>: { <span class="hljs-attr">_input_charset</span>: <span class="hljs-string">'utf-8'</span> },
  <span class="hljs-attr">dataType</span>: <span class="hljs-string">'jsonp'</span>,
  <span class="hljs-attr">timeout</span>: <span class="hljs-number">300</span>,
  <span class="hljs-attr">context</span>: $(<span class="hljs-string">'body'</span>),
  <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
    <span class="hljs-built_in">console</span>.log(data)
  },
  <span class="hljs-attr">error</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">xhr, type</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Ajax error!'</span>)
  }
});</code></pre>
<p>这样就很轻松的通过 JSONP 的方式获取到数据，我们似乎也不需要关心里面究竟是怎么一回事。但有时候肯能会有人问起：“为什么 jsonp 不能使用 POST 方法”的问题，其实稍微了解一下 JSONP 的原理，这种问题完全就不存在了。</p>
<p>虽然像 JQuery 这类库将 JSONP 封装到 <code>$.Ajax()</code> 上，但准确来讲是不对的。因为 JSONP 只是通过动态地通过 <code>&lt;script&gt;</code> 标签去请求一段 JS 代码（或者叫数据），而非使用 <code>XMLHttpRequest</code> ，原理就像下面这样：</p>
<h3 id="articleHeader8">对 JSONP 的简单封装</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 对 JSONP 的一种简单封装
 *
 * @param {Object} options
 * @returns null
 */
function getJsonp(options) {

  var callbackName = options.callbackName;
  var url = options.url;


  var scriptElem = document.createElement('script');
  scriptElem.setAttribute('src', url + '?callback=' + callbackName);

  scriptElem.onload = function(e) {
    delete window[callbackName];
    this.parentNode.removeChild(this);
  };

  scriptElem.onerror = function(e) {
    console.log(e, 'load error');

    delete window[callbackName];
    this.parentNode.removeChild(this);
  };

  window[callbackName] = options.success;

  // 调用
  document.querySelector('head').appendChild(scriptElem);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 对 JSONP 的一种简单封装
 *
 * @param {Object} options
 * @returns null
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getJsonp</span>(<span class="hljs-params">options</span>) </span>{

  <span class="hljs-keyword">var</span> callbackName = options.callbackName;
  <span class="hljs-keyword">var</span> url = options.url;


  <span class="hljs-keyword">var</span> scriptElem = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'script'</span>);
  scriptElem.setAttribute(<span class="hljs-string">'src'</span>, url + <span class="hljs-string">'?callback='</span> + callbackName);

  scriptElem.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
    <span class="hljs-keyword">delete</span> <span class="hljs-built_in">window</span>[callbackName];
    <span class="hljs-keyword">this</span>.parentNode.removeChild(<span class="hljs-keyword">this</span>);
  };

  scriptElem.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
    <span class="hljs-built_in">console</span>.log(e, <span class="hljs-string">'load error'</span>);

    <span class="hljs-keyword">delete</span> <span class="hljs-built_in">window</span>[callbackName];
    <span class="hljs-keyword">this</span>.parentNode.removeChild(<span class="hljs-keyword">this</span>);
  };

  <span class="hljs-built_in">window</span>[callbackName] = options.success;

  <span class="hljs-comment">// 调用</span>
  <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'head'</span>).appendChild(scriptElem);
}</code></pre>
<p>这段代码对 JSONP 进行一层简单包装，调用也很简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getJsonp({
  'url': 'http://127.0.0.1:9999/',
  'callbackName': 'log',
  'success': function(data) {
     console.log('我是回调函数,我拿到数据了', data);
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">getJsonp({
  <span class="hljs-string">'url'</span>: <span class="hljs-string">'http://127.0.0.1:9999/'</span>,
  <span class="hljs-string">'callbackName'</span>: <span class="hljs-string">'log'</span>,
  <span class="hljs-string">'success'</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
     <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'我是回调函数,我拿到数据了'</span>, data);
  }
});</code></pre>
<p>看上去代码还挺长的，实际上核心代码不多，分三步：</p>
<h4>1.创建一个 <code>&lt;script&gt;</code> 标签，并设置其 url</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var scriptElem = document.createElement('script');
scriptElem.setAttribute('src', url + '?callback=' + callbackName);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> scriptElem = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'script'</span>);
scriptElem.setAttribute(<span class="hljs-string">'src'</span>, url + <span class="hljs-string">'?callback='</span> + callbackName);</code></pre>
<h4>2.设置回调函数</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window[callbackName] = options.success;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">window</span>[callbackName] = options.success;</code></pre>
<p>这里简单处理，直接把传入的回调函数设置成全局的</p>
<h4>3.调用</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.querySelector('head').appendChild(scriptElem);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'head'</span>).appendChild(scriptElem);</code></pre>
<p>实际上就是把 <code>&lt;script&gt;</code> 加到 html 文档中，这样就会去加载标签的内容，也就是一个 JS 文件。</p>
<p>但通常现实中跑的代码内容会更多，包含一些错误控制、参数拼接、超时处理、性能安全等方面的，但它仍然清楚地描述 JSONP 的原理。</p>
<h2 id="articleHeader9">安全</h2>
<p>早期的浏览器处于安全层面的考量，制定同源策略，限制了一个源（origin）中加载文本或脚本与来自其它源（origin）中资源的交互方式。</p>
<p>但是随着互联网的发展催生了跨域访问进行数据交互的需求，于是 JSONP 就产生了，以及后来的 CORS 机制，允许 XMLHttpRequest 对象发起跨域的请求。</p>
<p>但是另一方面，也增加了安全风险，我们在使用的时候应当更加谨慎小心，防止 XSS、CSRF 等攻击。</p>
<h2 id="articleHeader10">其他</h2>
<h3 id="articleHeader11">数据预览</h3>
<p>之前碰到一个问题，在调用一些接口返回的数据无法使用 Chrome 预览，自己写测试接口的时候也碰到过。后来发现，只是因为没有在 response 头部加上 <code>Content-Type: application/javascript</code>，仅此而已。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
为什么是 JSONP

## 原文链接
[https://segmentfault.com/a/1190000004953537](https://segmentfault.com/a/1190000004953537)

