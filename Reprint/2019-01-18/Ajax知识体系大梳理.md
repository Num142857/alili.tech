---
title: 'Ajax知识体系大梳理' 
date: 2019-01-18 2:30:35
hidden: true
slug: 64q9xkchzh4
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">导读</h3>
<p>Ajax 全称 Asynchronous JavaScript and XML, 即异步JS与XML. 它最早在IE5中被使用, 然后由Mozilla, Apple, Google推广开来. 典型的代表应用有 Outlook Web Access, 以及 GMail. 现代网页中几乎无ajax不欢. 前后端分离也正是建立在ajax异步通信的基础之上.</p>
<h3 id="articleHeader1">浏览器为ajax做了什么</h3>
<p>现代浏览器中, 虽然几乎全部支持ajax, 但它们的技术方案却分为两种:</p>
<p>① 标准浏览器通过 <code>XMLHttpRequest</code> 对象实现了ajax的功能. 只需要通过一行语句便可创建一个用于发送ajax请求的对象.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr = new XMLHttpRequest();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();</code></pre>
<p>② IE浏览器通过 <code>XMLHttpRequest</code> 或者 <code>ActiveXObject</code> 对象同样实现了ajax的功能.</p>
<h4>MSXML</h4>
<p>鉴于IE系列各种 "神级" 表现,  我们先来看看IE浏览器风骚的走位.</p>
<p>IE下的使用环境略显复杂, IE7及更高版本浏览器可以直接使用BOM的 XMLHttpRequest 对象. MSDN传送门: <a href="https://blogs.msdn.microsoft.com/ie/2006/01/23/native-xmlhttprequest-object/" rel="nofollow noreferrer" target="_blank">Native XMLHTTPRequest object</a>. IE6及更低版本浏览器只能使用 <code>ActiveXObject</code> 对象来创建 XMLHttpRequest 对象实例. 创建时需要指明一个类似"Microsoft.XMLHTTP"这样的ProgID. 而实际呢, windows系统环境下, 以下ProgID都应该可以创建XMLHTTP对象:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Microsoft.XMLHTTP
Microsoft.XMLHTTP.1.0
Msxml2.ServerXMLHTTP
Msxml2.ServerXMLHTTP.3.0
Msxml2.ServerXMLHTTP.4.0
Msxml2.ServerXMLHTTP.5.0
Msxml2.ServerXMLHTTP.6.0
Msxml2.XMLHTTP
Msxml2.XMLHTTP.3.0
Msxml2.XMLHTTP.4.0
Msxml2.XMLHTTP.5.0
Msxml2.XMLHTTP.6.0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">Microsoft</span><span class="hljs-selector-class">.XMLHTTP</span>
<span class="hljs-selector-tag">Microsoft</span><span class="hljs-selector-class">.XMLHTTP</span><span class="hljs-selector-class">.1</span><span class="hljs-selector-class">.0</span>
<span class="hljs-selector-tag">Msxml2</span><span class="hljs-selector-class">.ServerXMLHTTP</span>
<span class="hljs-selector-tag">Msxml2</span><span class="hljs-selector-class">.ServerXMLHTTP</span><span class="hljs-selector-class">.3</span><span class="hljs-selector-class">.0</span>
<span class="hljs-selector-tag">Msxml2</span><span class="hljs-selector-class">.ServerXMLHTTP</span><span class="hljs-selector-class">.4</span><span class="hljs-selector-class">.0</span>
<span class="hljs-selector-tag">Msxml2</span><span class="hljs-selector-class">.ServerXMLHTTP</span><span class="hljs-selector-class">.5</span><span class="hljs-selector-class">.0</span>
<span class="hljs-selector-tag">Msxml2</span><span class="hljs-selector-class">.ServerXMLHTTP</span><span class="hljs-selector-class">.6</span><span class="hljs-selector-class">.0</span>
<span class="hljs-selector-tag">Msxml2</span><span class="hljs-selector-class">.XMLHTTP</span>
<span class="hljs-selector-tag">Msxml2</span><span class="hljs-selector-class">.XMLHTTP</span><span class="hljs-selector-class">.3</span><span class="hljs-selector-class">.0</span>
<span class="hljs-selector-tag">Msxml2</span><span class="hljs-selector-class">.XMLHTTP</span><span class="hljs-selector-class">.4</span><span class="hljs-selector-class">.0</span>
<span class="hljs-selector-tag">Msxml2</span><span class="hljs-selector-class">.XMLHTTP</span><span class="hljs-selector-class">.5</span><span class="hljs-selector-class">.0</span>
<span class="hljs-selector-tag">Msxml2</span><span class="hljs-selector-class">.XMLHTTP</span><span class="hljs-selector-class">.6</span><span class="hljs-selector-class">.0</span></code></pre>
<p>简言之, Microsoft.XMLHTTP 已经非常老了, 主要用于提供对历史遗留版本的支持, 不建议使用.对于 MSXML4, 它已被 MSXML6 替代; 而 MSXML5 又是专门针对office办公场景, 在没有安装 Microsoft Office 2003 及更高版本办公软件的情况下, MSXML5 未必可用. 相比之下, MSXML6 具有比 MSXML3 更稳定, 更高性能, 更安全的优势, 同时它也提供了一些 MSXML3 中没有的功能, 比如说 XSD schema. 唯一遗憾的是, MSXML6 只在 vista 系统及以上才是默认支持的; 而 MSXML3 在 Win2k SP4及以上系统就是可用的. 因此一般情况下, MSXML3 可以作为 MSXML6 的优雅降级方案, 我们通过指定 PorgID 为 Msxml2.XMLHTTP 即可自动映射到 Msxml2.XMLHTTP.3.0. 如下所示:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr = new ActiveXObject(&quot;Msxml2.XMLHTTP&quot;);// 即MSXML3,等同于如下语句
var xhr = new ActiveXObject(&quot;MSXML2.XMLHTTP.3.0&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> ActiveXObject(<span class="hljs-string">"Msxml2.XMLHTTP"</span>);<span class="hljs-comment">// 即MSXML3,等同于如下语句</span>
<span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> ActiveXObject(<span class="hljs-string">"MSXML2.XMLHTTP.3.0"</span>);</code></pre>
<p>MSDN有篇文章专门讲解了各个版本的MSXML. 传送门: <a href="https://blogs.msdn.microsoft.com/xmlteam/2006/10/23/using-the-right-version-of-msxml-in-internet-explorer/" rel="nofollow noreferrer" target="_blank">Using the right version of MSXML in Internet Explorer</a>.</p>
<p>亲测了 IE5, IE5.5, IE6, IE7, IE8, IE9, IE10, IE edge等浏览器, IE5及之后的浏览器均可以通过如下语句获取xhr对象:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr = new ActiveXObject(&quot;Msxml2.XMLHTTP&quot;);// 即MSXML3
var xhr = new ActiveXObject(&quot;Microsoft.XMLHTTP&quot;);// 很老的api,虽然浏览器支持,功能可能不完善,故不建议使用" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> ActiveXObject(<span class="hljs-string">"Msxml2.XMLHTTP"</span>);<span class="hljs-comment">// 即MSXML3</span>
<span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> ActiveXObject(<span class="hljs-string">"Microsoft.XMLHTTP"</span>);<span class="hljs-comment">// 很老的api,虽然浏览器支持,功能可能不完善,故不建议使用</span></code></pre>
<p>以上, 思路已经很清晰了, 下面给出个全兼容的方法.</p>
<h4>全平台兼容的XMLHttpRequest对象</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getXHR(){
  var xhr = null;
  if(window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    try {
      xhr = new ActiveXObject(&quot;Msxml2.XMLHTTP&quot;);
    } catch (e) {
      try {
        xhr = new ActiveXObject(&quot;Microsoft.XMLHTTP&quot;);
      } catch (e) { 
        alert(&quot;您的浏览器暂不支持Ajax!&quot;);
      }
    }
  }
  return xhr;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getXHR</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">var</span> xhr = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">if</span>(<span class="hljs-built_in">window</span>.XMLHttpRequest) {
    xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.ActiveXObject) {
    <span class="hljs-keyword">try</span> {
      xhr = <span class="hljs-keyword">new</span> ActiveXObject(<span class="hljs-string">"Msxml2.XMLHTTP"</span>);
    } <span class="hljs-keyword">catch</span> (e) {
      <span class="hljs-keyword">try</span> {
        xhr = <span class="hljs-keyword">new</span> ActiveXObject(<span class="hljs-string">"Microsoft.XMLHTTP"</span>);
      } <span class="hljs-keyword">catch</span> (e) { 
        alert(<span class="hljs-string">"您的浏览器暂不支持Ajax!"</span>);
      }
    }
  }
  <span class="hljs-keyword">return</span> xhr;
}</code></pre>
<h3 id="articleHeader2">ajax有没有破坏js单线程机制</h3>
<p>对于这个问题, 我们先看下浏览器线程机制. 一般情况下, 浏览器有如下四种线程:</p>
<ul>
<li><p>GUI渲染线程</p></li>
<li><p>javascript引擎线程</p></li>
<li><p>浏览器事件触发线程</p></li>
<li><p>HTTP请求线程</p></li>
</ul>
<p>那么这么多线程, 它们究竟是怎么同js引擎线程交互的呢?</p>
<p>通常, 它们的线程间交互以事件的方式发生, 通过事件回调的方式予以通知. 而事件回调, 又是以先进先出的方式添加到<code>任务队列</code> 的末尾 , 等到js引擎空闲时, <code>任务队列</code> 中排队的任务将会依次被执行. 这些事件回调包括 setTimeout, setInterval, click, ajax异步请求等回调.</p>
<p><strong>浏览器中, js引擎线程会循环从 <code>任务队列</code> 中读取事件并且执行, 这种运行机制称作 <code>Event Loop</code> (事件循环).</strong></p>
<p>对于一个ajax请求, js引擎首先生成 <code>XMLHttpRequest</code> 实例对象, open过后再调用send方法. 至此, 所有的语句都是同步执行. 但从send方法内部开始, 浏览器为将要发生的网络请求创建了新的http请求线程, 这个线程独立于js引擎线程, 于是网络请求异步被发送出去了. 另一方面, js引擎并不会等待 ajax 发起的http请求收到结果, 而是直接顺序往下执行.</p>
<p>当ajax请求被服务器响应并且收到response后, 浏览器事件触发线程捕获到了ajax的回调事件 <code>onreadystatechange</code> (当然也可能触发onload, 或者 onerror等等) . 该回调事件并没有被立即执行, 而是被添加到 <code>任务队列</code> 的末尾. 直到js引擎空闲了, <code>任务队列</code> 的任务才被捞出来, 按照添加顺序, 挨个执行, 当然也包括刚刚append到队列末尾的 <code>onreadystatechange</code> 事件.</p>
<p>在 <code>onreadystatechange</code> 事件内部, 有可能对dom进行操作. 此时浏览器便会挂起js引擎线程, 转而执行GUI渲染线程, 进行UI重绘(repaint)或者回流(reflow). 当js引擎重新执行时, GUI渲染线程又会被挂起, GUI更新将被保存起来, 等到js引擎空闲时立即被执行.</p>
<p>以上整个ajax请求过程中, 有涉及到浏览器的4种线程. 其中除了 <code>GUI渲染线程</code> 和 <code>js引擎线程</code> 是互斥的. 其他线程相互之间, 都是可以并行执行的. 通过这样的一种方式, ajax并没有破坏js的单线程机制.</p>
<h3 id="articleHeader3">ajax与setTimeout排队问题</h3>
<p>通常, ajax 和 setTimeout 的事件回调都被同等的对待, 按照顺序自动的被添加到 <code>任务队列</code> 的末尾, 等待js引擎空闲时执行. 但请注意, 并非xhr的所有回调执行都滞后于setTImeout的回调. 请看如下代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ajax(url, method){
  var xhr = getXHR();
  xhr.onreadystatechange = function(){
      console.log('xhr.readyState:' + this.readyState);
  }
  xhr.onloadstart = function(){
      console.log('onloadStart');
  }
  xhr.onload = function(){
      console.log('onload');
  }
  xhr.open(method, url, true);
  xhr.setRequestHeader('Cache-Control',3600);
  xhr.send();
}
var timer = setTimeout(function(){
  console.log('setTimeout');
},0);
ajax('http://louiszhai.github.io/docImages/ajax01.png','GET');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ajax</span>(<span class="hljs-params">url, method</span>)</span>{
  <span class="hljs-keyword">var</span> xhr = getXHR();
  xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'xhr.readyState:'</span> + <span class="hljs-keyword">this</span>.readyState);
  }
  xhr.onloadstart = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'onloadStart'</span>);
  }
  xhr.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'onload'</span>);
  }
  xhr.open(method, url, <span class="hljs-literal">true</span>);
  xhr.setRequestHeader(<span class="hljs-string">'Cache-Control'</span>,<span class="hljs-number">3600</span>);
  xhr.send();
}
<span class="hljs-keyword">var</span> timer = setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'setTimeout'</span>);
},<span class="hljs-number">0</span>);
ajax(<span class="hljs-string">'http://louiszhai.github.io/docImages/ajax01.png'</span>,<span class="hljs-string">'GET'</span>);</code></pre>
<p>上述代码执行结果如下图:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008697451?w=791&amp;h=194" src="https://static.alili.tech/img/remote/1460000008697451?w=791&amp;h=194" alt="ajax &amp; setTimeout" title="ajax &amp; setTimeout" style="cursor: pointer;"></span></p>
<p>由于ajax异步, setTimeout回调本应该最先被执行, 然而实际上, 一次ajax请求, 并非所有的部分都是异步的, 至少"readyState==1"的 <code>onreadystatechange</code> 回调以及 <code>onloadstart</code> 回调就是同步执行的. 因此它们的输出排在最前面.</p>
<h3 id="articleHeader4">XMLHttpRequest 属性解读</h3>
<p>首先在Chrome console下创建一个 XMLHttpRequest 实例对象xhr. 如下所示:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008697452?w=800&amp;h=364" src="https://static.alili.tech/img/remote/1460000008697452?w=800&amp;h=364" alt="XMLHttpRequest" title="XMLHttpRequest" style="cursor: pointer; display: inline;"></span></p>
<h4>inherit</h4>
<p>试运行以下代码.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr = new XMLHttpRequest(),
    i=0;
for(var key in xhr){
    if(xhr.hasOwnProperty(key)){
       i++;
   }
}
console.log(i);//0
console.log(XMLHttpRequest.prototype.hasOwnProperty('timeout'));//true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest(),
    i=<span class="hljs-number">0</span>;
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> xhr){
    <span class="hljs-keyword">if</span>(xhr.hasOwnProperty(key)){
       i++;
   }
}
<span class="hljs-built_in">console</span>.log(i);<span class="hljs-comment">//0</span>
<span class="hljs-built_in">console</span>.log(XMLHttpRequest.prototype.hasOwnProperty(<span class="hljs-string">'timeout'</span>));<span class="hljs-comment">//true</span></code></pre>
<p>可见,  XMLHttpRequest 实例对象没有自有属性. 实际上, 它的所有属性均来自于 <code>XMLHttpRequest.prototype</code> .</p>
<p>追根溯源, XMLHttpRequest 实例对象具有如下的继承关系. (下面以a&lt;&lt;b表示a继承b)</p>
<p><code>xhr</code> &lt;&lt; <code>XMLHttpRequest.prototype</code> &lt;&lt; <code>XMLHttpRequestEventTarget.prototype</code> &lt;&lt; <code>EventTarget.prototype</code> &lt;&lt; <code>Object.prototype</code></p>
<p>由上, xhr也具有Object等原型中的所有方法. 如toString方法.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.toString();//&quot;[object XMLHttpRequest]&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">xhr.toString();<span class="hljs-comment">//"[object XMLHttpRequest]"</span></code></pre>
<p>通常, 一个xhr实例对象拥有10个普通属性+9个方法.</p>
<h4>readyState</h4>
<p>只读属性, readyState属性记录了ajax调用过程中所有可能的状态. 它的取值简单明了, 如下:</p>
<table>
<thead><tr>
<th>readyState</th>
<th>对应常量</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td>0 (未初始化)</td>
<td>xhr.UNSENT</td>
<td>请求已建立, 但未初始化(此时未调用open方法)</td>
</tr>
<tr>
<td>1 (初始化)</td>
<td>xhr.OPENED</td>
<td>请求已建立, 但未发送 (已调用open方法, 但未调用send方法)</td>
</tr>
<tr>
<td>2 (发送数据)</td>
<td>xhr.HEADERS_RECEIVED</td>
<td>请求已发送 (send方法已调用, 已收到响应头)</td>
</tr>
<tr>
<td>3 (数据传送中)</td>
<td>xhr.LOADING</td>
<td>请求处理中, 因响应内容不全, 这时通过responseBody和responseText获取可能会出现错误</td>
</tr>
<tr>
<td>4 (完成)</td>
<td>xhr.DONE</td>
<td>数据接收完毕, 此时可以通过通过responseBody和responseText获取完整的响应数据</td>
</tr>
</tbody>
</table>
<p>注意, readyState 是一个只读属性, 想要改变它的值是不可行的.</p>
<h4>onreadystatechange</h4>
<p>onreadystatechange事件回调方法在readystate状态改变时触发, 在一个收到响应的ajax请求周期中, onreadystatechange 方法会被触发4次. 因此可以在 onreadystatechange 方法中绑定一些事件回调, 比如:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.onreadystatechange = function(e){
  if(xhr.readystate==4){
    var s = xhr.status;
    if((s >= 200 &amp;&amp; s < 300) || s == 304){
      var resp = xhr.responseText;
      //TODO ...
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
  <span class="hljs-keyword">if</span>(xhr.readystate==<span class="hljs-number">4</span>){
    <span class="hljs-keyword">var</span> s = xhr.status;
    <span class="hljs-keyword">if</span>((s &gt;= <span class="hljs-number">200</span> &amp;&amp; s &lt; <span class="hljs-number">300</span>) || s == <span class="hljs-number">304</span>){
      <span class="hljs-keyword">var</span> resp = xhr.responseText;
      <span class="hljs-comment">//TODO ...</span>
    }
  }
}</code></pre>
<p>注意: onreadystatechange回调中默认会传入Event实例, 如下:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008697453?w=300&amp;h=264" src="https://static.alili.tech/img/remote/1460000008697453?w=300&amp;h=264" alt="Event" title="Event" style="cursor: pointer;"></span></p>
<h4>status</h4>
<p>只读属性, status表示http请求的状态, 初始值为0. 如果服务器没有显式地指定状态码, 那么status将被设置为默认值, 即200.</p>
<h4>statusText</h4>
<p>只读属性, statusText表示服务器的响应状态信息, 它是一个 UTF-16 的字符串, 请求成功且status==20X时, 返回大写的 <code>OK</code> . 请求失败时返回空字符串. 其他情况下返回相应的状态描述. 比如: 301的 <code>Moved Permanently</code> , 302的 <code>Found</code> , 303的 <code>See Other</code> , 307 的 <code>Temporary Redirect</code> , 400的 <code>Bad Request</code> , 401的 <code>Unauthorized</code> 等等.</p>
<h4>onloadstart</h4>
<p>onloadstart事件回调方法在ajax请求发送之前触发, 触发时机在 <code>readyState==1</code> 状态之后, <code>readyState==2</code> 状态之前.</p>
<p>onloadstart方法中默认将传入一个ProgressEvent事件进度对象. 如下:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008697454?w=345&amp;h=372" src="https://static.alili.tech/img/remote/1460000008697454?w=345&amp;h=372" alt="ProgressEvent" title="ProgressEvent" style="cursor: pointer;"></span></p>
<p>ProgressEvent对象具有三个重要的Read only属性.</p>
<ul>
<li><p>lengthComputable 表示长度是否可计算, 它是一个布尔值, 初始值为false.</p></li>
<li><p>loaded 表示已加载资源的大小, 如果使用http下载资源, 它仅仅表示已下载内容的大小, 而不包括http headers等. 它是一个无符号长整型, 初始值为0.</p></li>
<li><p>total 表示资源总大小, 如果使用http下载资源, 它仅仅表示内容的总大小, 而不包括http headers等, 它同样是一个无符号长整型, 初始值为0.</p></li>
</ul>
<h4>onprogress</h4>
<p>onprogress事件回调方法在 <code>readyState==3</code> 状态时开始触发, 默认传入 ProgressEvent 对象, 可通过 <code>e.loaded/e.total</code> 来计算加载资源的进度, 该方法用于获取资源的下载进度.</p>
<p>注意: 该方法适用于 IE10+ 及其他现代浏览器.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.onprogress = function(e){
  console.log('progress:', e.loaded/e.total);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">xhr.onprogress = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'progress:'</span>, e.loaded/e.total);
}</code></pre>
<h4>onload</h4>
<p>onload事件回调方法在ajax请求成功后触发, 触发时机在 <code>readyState==4</code> 状态之后.</p>
<p>想要捕捉到一个ajax异步请求的成功状态, 并且执行回调, 一般下面的语句就足够了:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.onload = function(){
  var s = xhr.status;
  if((s >= 200 &amp;&amp; s < 300) || s == 304){
    var resp = xhr.responseText;
    //TODO ...
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">xhr.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">var</span> s = xhr.status;
  <span class="hljs-keyword">if</span>((s &gt;= <span class="hljs-number">200</span> &amp;&amp; s &lt; <span class="hljs-number">300</span>) || s == <span class="hljs-number">304</span>){
    <span class="hljs-keyword">var</span> resp = xhr.responseText;
    <span class="hljs-comment">//TODO ...</span>
  }
}</code></pre>
<h4>onloadend</h4>
<p>onloadend事件回调方法在ajax请求完成后触发, 触发时机在 <code>readyState==4</code> 状态之后(收到响应时) 或者  <code>readyState==2</code> 状态之后(未收到响应时).</p>
<p>onloadend方法中默认将传入一个ProgressEvent事件进度对象.</p>
<h4>timeout</h4>
<p>timeout属性用于指定ajax的超时时长. 通过它可以灵活地控制ajax请求时间的上限. timeout的值满足如下规则:</p>
<ul>
<li><p>通常设置为0时不生效.</p></li>
<li><p>设置为字符串时, 如果字符串中全部为数字, 它会自动将字符串转化为数字, 反之该设置不生效.</p></li>
<li><p>设置为对象时, 如果该对象能够转化为数字, 那么将设置为转化后的数字.</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.timeout = 0; //不生效
xhr.timeout = '123'; //生效, 值为123
xhr.timeout = '123s'; //不生效
xhr.timeout = ['123']; //生效, 值为123
xhr.timeout = {a:123}; //不生效" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">xhr.timeout = <span class="hljs-number">0</span>; <span class="hljs-comment">//不生效</span>
xhr.timeout = <span class="hljs-string">'123'</span>; <span class="hljs-comment">//生效, 值为123</span>
xhr.timeout = <span class="hljs-string">'123s'</span>; <span class="hljs-comment">//不生效</span>
xhr.timeout = [<span class="hljs-string">'123'</span>]; <span class="hljs-comment">//生效, 值为123</span>
xhr.timeout = {<span class="hljs-attr">a</span>:<span class="hljs-number">123</span>}; <span class="hljs-comment">//不生效</span></code></pre>
<h4>ontimeout</h4>
<p>ontimeout方法在ajax请求超时时触发, 通过它可以在ajax请求超时时做一些后续处理.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.ontimeout = function(e) {
  console.error(&quot;请求超时!!!&quot;)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">xhr.ontimeout = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
  <span class="hljs-built_in">console</span>.error(<span class="hljs-string">"请求超时!!!"</span>)
}</code></pre>
<h4>response responseText</h4>
<p>均为只读属性, response表示服务器的响应内容, 相应的, responseText表示服务器响应内容的文本形式.</p>
<h4>responseXML</h4>
<p>只读属性, responseXML表示xml形式的响应数据, 缺省为null, 若数据不是有效的xml, 则会报错.</p>
<h4>responseType</h4>
<p>responseType表示响应的类型, 缺省为空字符串, 可取 <code>"arraybuffer"</code> , <code>"blob"</code> , <code>"document"</code> , <code>"json"</code> , and <code>"text"</code> 共五种类型.</p>
<h4>responseURL</h4>
<p>responseURL返回ajax请求最终的URL, 如果请求中存在重定向, 那么responseURL表示重定向之后的URL.</p>
<h4>withCredentials</h4>
<p>withCredentials是一个布尔值, 默认为false, 表示跨域请求中不发送cookies等信息. 当它设置为true时, <code>cookies</code> , <code>authorization headers</code> 或者<code> TLS客户端证书</code> 都可以正常发送和接收. 显然它的值对同域请求没有影响.</p>
<p>注意: 该属性适用于 IE10+, opera12+及其他现代浏览器.</p>
<h4>abort</h4>
<p>abort方法用于取消ajax请求, 取消后, readyState 状态将被设置为&nbsp;<code>0</code>&nbsp;(<code>UNSENT</code>). 如下, 调用abort 方法后, 请求将被取消.</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008697455?w=702&amp;h=23" src="https://static.alili.tech/img/remote/1460000008697455?w=702&amp;h=23" alt="Event" title="Event" style="cursor: pointer; display: inline;"></span></p>
<h4>getResponseHeader</h4>
<p>getResponseHeader方法用于获取ajax响应头中指定name的值. 如果response headers中存在相同的name, 那么它们的值将自动以字符串的形式连接在一起.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(xhr.getResponseHeader('Content-Type'));//&quot;text/html&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(xhr.getResponseHeader(<span class="hljs-string">'Content-Type'</span>));<span class="hljs-comment">//"text/html"</span></code></pre>
<h4>getAllResponseHeaders</h4>
<p>getAllResponseHeaders方法用于获取所有安全的ajax响应头, 响应头以字符串形式返回. 每个HTTP报头名称和值用冒号分隔, 如key:value, 并以rn结束.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.onreadystatechange = function() {
  if(this.readyState == this.HEADERS_RECEIVED) {
    console.log(this.getAllResponseHeaders());
  }
}
//Content-Type: text/html&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.readyState == <span class="hljs-keyword">this</span>.HEADERS_RECEIVED) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.getAllResponseHeaders());
  }
}
<span class="hljs-comment">//Content-Type: text/html"</span></code></pre>
<p>以上,  <code>readyState === 2</code> 状态时, 就意味着响应头已接受完整. 此时便可以打印出完整的 response headers.</p>
<h4>setRequestHeader</h4>
<p>既然可以获取响应头, 那么自然也可以设置请求头, setRequestHeader就是干这个的. 如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//指定请求的type为json格式
xhr.setRequestHeader(&quot;Content-type&quot;, &quot;application/json&quot;);
//除此之外, 还可以设置其他的请求头
xhr.setRequestHeader('x-requested-with', '123456');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//指定请求的type为json格式</span>
xhr.setRequestHeader(<span class="hljs-string">"Content-type"</span>, <span class="hljs-string">"application/json"</span>);
<span class="hljs-comment">//除此之外, 还可以设置其他的请求头</span>
xhr.setRequestHeader(<span class="hljs-string">'x-requested-with'</span>, <span class="hljs-string">'123456'</span>);</code></pre>
<h4>onerror</h4>
<p>onerror方法用于在ajax请求出错后执行. 通常只在网络出现问题时或者ERR_CONNECTION_RESET时触发(如果请求返回的是407状态码, chrome下也会触发onerror).</p>
<h4>upload</h4>
<p>upload属性默认返回一个 <code>XMLHttpRequestUpload</code> 对象, 用于上传资源. 该对象具有如下方法:</p>
<ul>
<li><p>onloadstart</p></li>
<li><p>onprogress</p></li>
<li><p>onabort</p></li>
<li><p>onerror</p></li>
<li><p>onload</p></li>
<li><p>ontimeout</p></li>
<li><p>onloadend</p></li>
</ul>
<p>上述方法功能同 xhr 对象中同名方法一致. 其中, onprogress 事件回调方法可用于跟踪资源上传的进度.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.upload.onprogress = function(e){
  var percent = 100 * e.loaded / e.total |0;
  console.log('upload: ' + precent + '%');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">xhr.upload.onprogress = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
  <span class="hljs-keyword">var</span> percent = <span class="hljs-number">100</span> * e.loaded / e.total |<span class="hljs-number">0</span>;
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'upload: '</span> + precent + <span class="hljs-string">'%'</span>);
}</code></pre>
<h4>overrideMimeType</h4>
<p>overrideMimeType方法用于强制指定response 的 MIME 类型, 即强制修改response的 <code>Content-Type</code> . 如下, 服务器返回的response的 MIME 类型为 <code>text/plain</code> .</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008697456?w=421&amp;h=205" src="https://static.alili.tech/img/remote/1460000008697456?w=421&amp;h=205" alt="response headers" title="response headers" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.getResponseHeader('Content-Type');//&quot;text/plain&quot;
xhr.responseXML;//null" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">xhr.getResponseHeader(<span class="hljs-string">'Content-Type'</span>);<span class="hljs-comment">//"text/plain"</span>
xhr.responseXML;<span class="hljs-comment">//null</span></code></pre>
<p>通过overrideMimeType方法将response的MIME类型设置为 <code>text/xml;charset=utf-8</code> , 如下所示:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.overrideMimeType(&quot;text/xml; charset = utf-8&quot;);
xhr.send();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">xhr.overrideMimeType(<span class="hljs-string">"text/xml; charset = utf-8"</span>);
xhr.send();</code></pre>
<p>此时虽然 response headers 如上图, 没有变化, 但 <code>Content-Type</code> 已替换为新值.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.getResponseHeader('Content-Type');//&quot;text/xml; charset = utf-8&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">xhr.getResponseHeader(<span class="hljs-string">'Content-Type'</span>);<span class="hljs-comment">//"text/xml; charset = utf-8"</span></code></pre>
<p>此时, <code>xhr.responseXML</code> 也将返回DOM对象, 如下图.</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008697457?w=267&amp;h=173" src="https://static.alili.tech/img/remote/1460000008697457?w=267&amp;h=173" alt="response headers" title="response headers" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5">XHR一级</h3>
<p>XHR1 即 XMLHttpRequest Level 1. XHR1时, xhr对象具有如下缺点:</p>
<ul>
<li><p>仅支持文本数据传输, 无法传输二进制数据.</p></li>
<li><p>传输数据时, 没有进度信息提示, 只能提示是否完成.</p></li>
<li><p>受浏览器 <code>同源策略</code> 限制, 只能请求同域资源.</p></li>
<li><p>没有超时机制, 不方便掌控ajax请求节奏.</p></li>
</ul>
<h3 id="articleHeader6">XHR二级</h3>
<p>XHR2 即 XMLHttpRequest Level 2. XHR2针对XHR1的上述缺点做了如下改进:</p>
<ul>
<li><p>支持二进制数据, 可以上传文件, 可以使用FormData对象管理表单.</p></li>
<li><p>提供进度提示, 可通过 <code>xhr.upload.onprogress</code> 事件回调方法获取传输进度.</p></li>
<li><p>依然受 <code>同源策略</code> 限制, 这个安全机制不会变. XHR2新提供 <code>Access-Control-Allow-Origin</code> 等headers, 设置为 <code>*</code> 时表示允许任何域名请求, 从而实现跨域CORS访问(有关CORS详细介绍请耐心往下读).</p></li>
<li><p>可以设置timeout 及 ontimeout, 方便设置超时时长和超时后续处理.</p></li>
</ul>
<p>这里就H5新增的FormData对象举个例.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//可直接创建FormData实例
var data = new FormData();
data.append(&quot;name&quot;, &quot;louis&quot;);
xhr.send(data);
//还可以通过传入表单DOM对象来创建FormData实例
var form = document.getElementById('form');
var data = new FormData(form);
data.append(&quot;password&quot;, &quot;123456&quot;);
xhr.send(data);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//可直接创建FormData实例</span>
<span class="hljs-keyword">var</span> data = <span class="hljs-keyword">new</span> FormData();
data.append(<span class="hljs-string">"name"</span>, <span class="hljs-string">"louis"</span>);
xhr.send(data);
<span class="hljs-comment">//还可以通过传入表单DOM对象来创建FormData实例</span>
<span class="hljs-keyword">var</span> form = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'form'</span>);
<span class="hljs-keyword">var</span> data = <span class="hljs-keyword">new</span> FormData(form);
data.append(<span class="hljs-string">"password"</span>, <span class="hljs-string">"123456"</span>);
xhr.send(data);</code></pre>
<p>目前, 主流浏览器基本上都支持XHR2, 除了IE系列需要IE10及更高版本. 因此IE10以下是不支持XHR2的.</p>
<p>那么问题来了, IE7, 8,9的用户怎么办? 很遗憾, 这些用户是比较尴尬的. 对于IE8,9而言, 只有一个阉割版的 <code>XDomainRequest</code> 可用,IE7则没有. 估计IE7用户只能哭晕在厕所了.</p>
<h3 id="articleHeader7">XDomainRequest</h3>
<p>XDomainRequest 对象是IE8,9折腾出来的, 用于支持CORS请求非成熟的解决方案. 以至于IE10中直接移除了它, 并重新回到了 XMLHttpRequest 的怀抱.</p>
<p>XDomainRequest 仅可用于发送 <code>GET </code>和 <code>POST</code> 请求. 如下即创建过程.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xdr = new XDomainRequest();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> xdr = <span class="hljs-keyword">new</span> XDomainRequest();</code></pre>
<p>xdr具有如下属性:</p>
<ul>
<li><p>timeout</p></li>
<li><p>responseText</p></li>
</ul>
<p>如下方法:</p>
<ul>
<li><p>open: 只能接收Method,和url两个参数. 只能发送异步请求.</p></li>
<li><p>send</p></li>
<li><p>abort</p></li>
</ul>
<p>如下事件回调:</p>
<ul>
<li><p>onprogress</p></li>
<li><p>ontimeout</p></li>
<li><p>onerror</p></li>
<li><p>onload</p></li>
</ul>
<p>除了缺少一些方法外, XDomainRequest 基本上就和 XMLHttpRequest 的使用方式保持一致. </p>
<p>必须要明确的是:</p>
<ul>
<li><p>XDomainRequest 不支持跨域传输cookie.</p></li>
<li><p>只能设置请求头的Content-Type字段, 且不能访问响应头信息.</p></li>
</ul>
<h3 id="articleHeader8">$.ajax</h3>
<p>$.ajax是jquery对原生ajax的一次封装. 通过封装ajax, jquery抹平了不同版本浏览器异步http的差异性, 取而代之的是高度统一的api. jquery作为js类库时代的先驱, 对前端发展有着深远的影响. 了解并熟悉其ajax方法, 不可谓不重要.</p>
<h4>参数列表</h4>
<p>$.ajax() 只有一个参数, 该参数为key-value设置对象. 实际上, jq发送的所有ajax请求, 都是通过调用该ajax方法实现的. 它的详细参数如下表:</p>
<div class="table-wrap"><table>
<thead><tr>
<th align="center">序号</th>
<th align="center">参数</th>
<th align="center">类型</th>
<th align="left">描述</th>
</tr></thead>
<tbody>
<tr>
<td align="center">1</td>
<td align="center"><strong><em>accepts</em></strong></td>
<td align="center"><em>PlainObject</em></td>
<td align="left">用于通知服务器该请求需要接收何种类型的返回结果. 如有必要, 推荐在 <code>$.ajaxSetup()</code>&nbsp;方法中设置一次.</td>
</tr>
<tr>
<td align="center">2</td>
<td align="center"><strong><em>async</em></strong></td>
<td align="center"><em>Boolean</em></td>
<td align="left">默认为true, 即异步.</td>
</tr>
<tr>
<td align="center">3</td>
<td align="center"><strong><em>beforeSend</em></strong></td>
<td align="center"><em>Function</em></td>
<td align="left">请求发送前的回调, 默认传入参数jqXHR和settings. 函数内显式返回false将取消本次请求.</td>
</tr>
<tr>
<td align="center">4</td>
<td align="center"><strong><em>cache</em></strong></td>
<td align="center"><em>Boolean</em></td>
<td align="left">请求是否开启缓存, 默认为true, 如不需要缓存请设置为false. 不过, dataType为"script"和"jsonp"时默认为false.</td>
</tr>
<tr>
<td align="center">5</td>
<td align="center"><strong><em>complete</em></strong></td>
<td align="center"><em>Function</em></td>
<td align="left">请求完成后的回调(请求<code>success</code>&nbsp;和&nbsp;<code>error</code>之后均调用), 默认传入参数jqXHR和textStatus(请求状态, 取值为 "success","notmodified","error","timeout","abort","parsererror"之一). 从jq1.5开始, complete可以设置为一个包含函数的数组. 如此每个函数将依次被调用.</td>
</tr>
<tr>
<td align="center">6</td>
<td align="center"><strong><em>contents</em></strong></td>
<td align="center"><em>PlainObject</em></td>
<td align="left">一个以"{字符串/正则表达式}"配对的对象, 根据给定的内容类型, 解析请求的返回结果.</td>
</tr>
<tr>
<td align="center">7</td>
<td align="center"><strong><em>contentType</em></strong></td>
<td align="center"><em>String</em></td>
<td align="left">编码类型, 相对应于http请求头域的"Content-Type"字段. 默认值为"application/x-www-form-urlencoded; charset=UTF-8".</td>
</tr>
<tr>
<td align="center">8</td>
<td align="center"><strong><em>context</em></strong></td>
<td align="center"><em>Object</em></td>
<td align="left">设置ajax回调函数的上下文. 默认上下文为ajax请求传入的参数设置对象. 如设置为document.body, 那么所有ajax回调函数中将以body为上下文.</td>
</tr>
<tr>
<td align="center">9</td>
<td align="center"><strong><em>converters</em></strong></td>
<td align="center"><em>PlainObject</em></td>
<td align="left">一个数据类型到数据类型转换器的对象. 默认为 <code>{"* text": window.String, "text html": true, "text json": jQuery.parseJSON, "text xml": jQuery.parseXML}</code> . 如设置<code>converters:{"json jsonp": function(msg){"}}"</code>
</td>
</tr>
<tr>
<td align="center">10</td>
<td align="center"><strong><em>crossDomain</em></strong></td>
<td align="center"><em>Boolean</em></td>
<td align="left">默认同域请求为false, 跨域请求为true.</td>
</tr>
<tr>
<td align="center">11</td>
<td align="center"><strong><em>data</em></strong></td>
<td align="center"><em>Object, Array</em></td>
<td align="left">发送到服务器的数据, 默认data为键值对格式对象, 若data为数组则按照<code>traditional</code>参数的值, 自动转化为一个同名的多值查询字符串. 如{a:1,b:2}将转换为"&amp;a=1&amp;b=2".</td>
</tr>
<tr>
<td align="center">12</td>
<td align="center"><strong><em>dataFilter</em></strong></td>
<td align="center"><em>Function</em></td>
<td align="left">处理XMLHttpRequest原始响应数据的回调, 默认传入data和type参数, data是Ajax返回的原始数据, type是调用$.ajax时提供的dataType参数</td>
</tr>
<tr>
<td align="center">13</td>
<td align="center"><strong><em>dataType</em></strong></td>
<td align="center"><em>String</em></td>
<td align="left">预期服务器返回的数据类型, 可设置为"xml","html","script","json","jsonp","text"之一, 其中设置为"xml"或"text"类型时, 数据不会经过处理.</td>
</tr>
<tr>
<td align="center">14</td>
<td align="center"><strong><em>error</em></strong></td>
<td align="center"><em>Function</em></td>
<td align="left">请求失败时的回调函数, 默认传入jqXHR(jq1.4以前为原生xhr对象),textStatus(请求状态,取值为null,"timeout","error","abort" 或 "parsererror"),errorString(错误内容), 当一个HTTP错误发生时, <code>errorThrown</code>&nbsp;接收HTTP状态的文本部分,比如"Not Found"等. 从jq1.5开始, error可以设置为一个包含函数的数组. 如此每个函数将依次被调用.注意: 跨域脚本和JSONP请求时error不被调用.</td>
</tr>
<tr>
<td align="center">15</td>
<td align="center"><strong><em>global</em></strong></td>
<td align="center"><em>Boolean</em></td>
<td align="left">表示是否触发全局ajax事件, 默认为true. 设为false将不再触发ajaxStart,ajaxStop,ajaxSend,ajaxError等. 跨站脚本和jsonp请求, 该值自动设置为false.</td>
</tr>
<tr>
<td align="center">16</td>
<td align="center"><strong><em>headers</em></strong></td>
<td align="center"><em>PlainObject</em></td>
<td align="left">设置请求头, 格式为k-v键值对对象. 由于该设置会在beforeSend函数被调用之前生效, 因此可在beforeSend函数内覆盖该对象.</td>
</tr>
<tr>
<td align="center">17</td>
<td align="center"><strong><em>ifModified</em></strong></td>
<td align="center"><em>Boolean</em></td>
<td align="left">只有上次请求响应改变时, 才允许请求成功. 它使用HTTP包的Last-Modified 头信息判断, 默认为false. 若设置为true, 且数据自从上次请求后没有更改过就会报错.</td>
</tr>
<tr>
<td align="center">18</td>
<td align="center"><strong><em>isLocal</em></strong></td>
<td align="center"><em>Boolean</em></td>
<td align="left">运行当前环境设置为"本地",默认为false, 若设置为true, 将影响请求发送时的协议.</td>
</tr>
<tr>
<td align="center">19</td>
<td align="center"><strong><em>jsonp</em></strong></td>
<td align="center"><em>String</em></td>
<td align="left">显式指定jsonp请求中的回调函数的名称. 如jsonp:cb, jq会将cb代替callback, 以 "cb=?"传给服务器. 从jq1.5开始, 若设置jsonp:false, 那么需要明确设置jsonpCallback:"callbackName".</td>
</tr>
<tr>
<td align="center">20</td>
<td align="center"><strong><em>jsonpCallback</em></strong></td>
<td align="center"><em>String,Function</em></td>
<td align="left">为jsonp请求指定一个回调函数名, 以取代jq自动生成的随机函数名. 从jq1.5开始, 可以将该属性设置为一个函数, 函数的返回值就是jsonpCallback的结果.</td>
</tr>
<tr>
<td align="center">21</td>
<td align="center"><strong><em>mimeType</em></strong></td>
<td align="center"><em>String</em></td>
<td align="left">设置一个MIME类型, 以覆盖xhr的MIM类型(jq1.5新增)</td>
</tr>
<tr>
<td align="center">22</td>
<td align="center"><strong><em>password</em></strong></td>
<td align="center"><em>String</em></td>
<td align="left">设置认证请求中的密码</td>
</tr>
<tr>
<td align="center">23</td>
<td align="center"><strong><em>processData</em></strong></td>
<td align="center"><em>Boolean</em></td>
<td align="left">jq的ajax方法默认会将传入的data隐式转换为查询字符串(如"&amp;a=1&amp;b=2"), 以配合 默认内容类型 "application/x-www-form-urlencoded", 如果不希望转换请设置为false. angular中想要禁用默认转换, 需要重写transformRequest方法.</td>
</tr>
<tr>
<td align="center">24</td>
<td align="center"><strong><em>scriptCharset</em></strong></td>
<td align="center"><em>String</em></td>
<td align="left">仅在"script"请求中使用(如跨域jsonp, dataType为"script"类型). 显式指定时, 请求中将在script标签上设置<code>charset</code>属性, 可在发现本地和远程编码不一致时使用.</td>
</tr>
<tr>
<td align="center">25</td>
<td align="center"><strong><em>statusCode</em></strong></td>
<td align="center"><em>PlainObject</em></td>
<td align="left">一组http状态码和回调函数对应的键值对对象. 该对象以 {404:function(){"}}" 这种形式表示. 可用于根据不同的http状态码, 执行不同的回调.(jq1.5新增)</td>
</tr>
<tr>
<td align="center">26</td>
<td align="center"><strong><em>timeout</em></strong></td>
<td align="center"><em>Number</em></td>
<td align="left">设置超时时间.</td>
</tr>
<tr>
<td align="center">27</td>
<td align="center"><strong><em>traditional</em></strong></td>
<td align="center"><em>Boolean</em></td>
<td align="left">是否按照默认方式序列化data对象, 默认值为false.</td>
</tr>
<tr>
<td align="center">28</td>
<td align="center"><strong><em>type</em></strong></td>
<td align="center"><em>String</em></td>
<td align="left">可以设置为8种http method之一, jq中不区分大小写.</td>
</tr>
<tr>
<td align="center">29</td>
<td align="center"><strong><em>url</em></strong></td>
<td align="center"><em>String</em></td>
<td align="left">请求的uri地址.</td>
</tr>
<tr>
<td align="center">30</td>
<td align="center"><strong><em>username</em></strong></td>
<td align="center"><em>String</em></td>
<td align="left">设置认证请求中的用户名</td>
</tr>
<tr>
<td align="center">31</td>
<td align="center"><strong><em>xhr</em></strong></td>
<td align="center"><em>Function</em></td>
<td align="left">在回调内创建并返回xhr对象</td>
</tr>
<tr>
<td align="center">32</td>
<td align="center"><strong><em>xhrFields</em></strong></td>
<td align="center"><em>PlainObject</em></td>
<td align="left">键值对对象, 用于设置原生的xhr对象, 如可用来设置withCredentials:true(jq1.5.1新增)</td>
</tr>
</tbody>
</table></div>
<h4>支持promise</h4>
<p>$.ajax() 方法返回jqXHR对象(jq1.5起), 如果使用的不是XMLHttpRequest对象时, 如jsonp请求, 返回的jqXHR对象将尽可能模拟原生的xhr. 从jq1.5起, 返回的jqXHR对象实现了promise接口, 具有如下新方法.</p>
<table>
<thead><tr>
<th align="center">新方法</th>
<th align="center">被替代的老方法(jq1.8起弃用)</th>
</tr></thead>
<tbody>
<tr>
<td align="center">done(function(data, textStatus, jqXHR) {})</td>
<td align="center"><del>success</del></td>
</tr>
<tr>
<td align="center">fail(function(jqXHR, textStatus, errorThrown) {})</td>
<td align="center"><del>error</del></td>
</tr>
<tr>
<td align="center">always(function(data or jqXHR, textStatus, jqXHR or errorThrown) {})</td>
<td align="center"><del>complete</del></td>
</tr>
</tbody>
</table>
<p>从jq1.6开始, done, fail, always按照FIFO队列可以分配多个回调.</p>
<h4>使用转换器</h4>
<p>$.ajax() 的转换器可以将支持的数据类型映射到其它数据类型. 如果需要将自定义数据类型映射到已知的类型. 需要使用 <code>contents</code> 选项在响应的 "Content-Type" 和实际数据类型之间添加一个转换函数.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.ajaxSetup({
  contents: {
    myContentType: /myContentType/
  },
  converters: {
    &quot;myContentType json&quot;: function(data) {
      //TODO something
      return newData;
    }
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$.ajaxSetup({
  <span class="hljs-attr">contents</span>: {
    <span class="hljs-attr">myContentType</span>: <span class="hljs-regexp">/myContentType/</span>
  },
  <span class="hljs-attr">converters</span>: {
    <span class="hljs-string">"myContentType json"</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
      <span class="hljs-comment">//TODO something</span>
      <span class="hljs-keyword">return</span> newData;
    }
  }
});</code></pre>
<p>转换一个支持的类型为自定义类型, 然后再返回. 如 text—&gt;myContentType—&gt;json.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.ajaxSetup({
  contents: {
    myContentType: /myContentType/
  },
  converters: {
    &quot;text myContentType&quot;: true,
    &quot;myContentType json&quot;: function(data) {
      //TODO something
      return newData;
    }
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$.ajaxSetup({
  <span class="hljs-attr">contents</span>: {
    <span class="hljs-attr">myContentType</span>: <span class="hljs-regexp">/myContentType/</span>
  },
  <span class="hljs-attr">converters</span>: {
    <span class="hljs-string">"text myContentType"</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-string">"myContentType json"</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
      <span class="hljs-comment">//TODO something</span>
      <span class="hljs-keyword">return</span> newData;
    }
  }
});</code></pre>
<h4>事件触发顺序</h4>
<p>$.ajax()方法触发的事件纷繁复杂, 有将近20个之多. 为了囊括最多的事件, 这里以一次成功的上传请求为例, 以下是它们的调用顺序(请求出现错误时的顺序, 请自行对应).</p>
<table>
<thead><tr>
<th align="center">序号</th>
<th align="center">事件名称</th>
<th align="center">是否全局事件</th>
<th align="center">是否能关闭</th>
<th align="center">默认形参</th>
</tr></thead>
<tbody>
<tr>
<td align="center">1</td>
<td align="center">$.ajaxPrefilter</td>
<td align="center">✔️</td>
<td align="center">❌</td>
<td align="center">function(options, originalOptions, jqXHR){}</td>
</tr>
<tr>
<td align="center">2</td>
<td align="center">$(document).ajaxStar</td>
<td align="center">✔️</td>
<td align="center">✔️</td>
<td align="center">function(){}(只在当前无激活ajax时触发)</td>
</tr>
<tr>
<td align="center">3</td>
<td align="center">beforeSend</td>
<td align="center">❌</td>
<td align="center">-</td>
<td align="center">function(jqXHR, settings){}</td>
</tr>
<tr>
<td align="center">4</td>
<td align="center">$(document).ajaxSend</td>
<td align="center">✔️</td>
<td align="center">✔️</td>
<td align="center">function(){}</td>
</tr>
<tr>
<td align="center">5</td>
<td align="center">xhr.onloadstart</td>
<td align="center">-</td>
<td align="center">-</td>
<td align="center">ProgressEvent</td>
</tr>
<tr>
<td align="center">6</td>
<td align="center">xhr.upload.onloadstart</td>
<td align="center">-</td>
<td align="center">-</td>
<td align="center">ProgressEvent</td>
</tr>
<tr>
<td align="center">7</td>
<td align="center">xhr.upload.onprogress</td>
<td align="center">-</td>
<td align="center">-</td>
<td align="center">ProgressEvent</td>
</tr>
<tr>
<td align="center">8</td>
<td align="center">xhr.upload.onload</td>
<td align="center">-</td>
<td align="center">-</td>
<td align="center">ProgressEvent</td>
</tr>
<tr>
<td align="center">9</td>
<td align="center">xhr.upload.onloadend</td>
<td align="center">-</td>
<td align="center">-</td>
<td align="center">ProgressEvent</td>
</tr>
<tr>
<td align="center">10</td>
<td align="center">xhr.onprogress</td>
<td align="center">-</td>
<td align="center">-</td>
<td align="center">ProgressEvent</td>
</tr>
<tr>
<td align="center">11</td>
<td align="center">xhr.onload</td>
<td align="center">-</td>
<td align="center">-</td>
<td align="center">ProgressEvent</td>
</tr>
<tr>
<td align="center">12</td>
<td align="center">
<del>success</del>(弃用)</td>
<td align="center">❌</td>
<td align="center">-</td>
<td align="center">function(data, textStatus, jqXHR){}</td>
</tr>
<tr>
<td align="center">13</td>
<td align="center">$(document).ajaxSuccess</td>
<td align="center">✔️</td>
<td align="center">✔️</td>
<td align="center">function(event, jqXHR, options){}</td>
</tr>
<tr>
<td align="center">14</td>
<td align="center">
<del>complete</del>(弃用)</td>
<td align="center">❌</td>
<td align="center">-</td>
<td align="center">function(jqXHR, textStatus){}</td>
</tr>
<tr>
<td align="center">15</td>
<td align="center">$(document).ajaxComplete</td>
<td align="center">✔️</td>
<td align="center">✔️</td>
<td align="center">function(event, jqXHR, textStatus)</td>
</tr>
<tr>
<td align="center">16</td>
<td align="center">$(document).ajaxStop</td>
<td align="center">✔️</td>
<td align="center">✔️</td>
<td align="center">function(){}</td>
</tr>
<tr>
<td align="center">17</td>
<td align="center">xhr.onloadend</td>
<td align="center">-</td>
<td align="center">-</td>
<td align="center">ProgressEvent</td>
</tr>
</tbody>
</table>
<p>从jq1.8起, 对于函数 <code>ajaxStart</code>, <code>ajaxSend</code>, <code>ajaxSuccess</code>, <code>ajaxComplete</code>, <code>ajaxStop</code> , 只能为<code>document</code>对象绑定事件处理函数, 为其他元素绑定的事件处理函数不会起作用.</p>
<h3 id="articleHeader9">Axios</h3>
<p>实际上, 如果你仅仅只是想要一个不错的http库, 相比于庞大臃肿的jquery, 短小精悍的Axios可能更加适合你. 原因如下:</p>
<ul>
<li><p>Axios支持node, jquery并不支持.</p></li>
<li><p>Axios基于promise语法, jq3.0才开始全面支持.</p></li>
<li><p>Axios短小精悍, 更加适合http场景, jquery大而全, 加载较慢.</p></li>
<li><p>vue作者尤大放弃推荐vue-resource, 转向推荐Axios. 以下为尤大原话.</p></li>
</ul>
<blockquote><p>"最近团队讨论了一下, Ajax 本身跟 Vue 并没有什么需要特别整合的地方, 使用 fetch polyfill 或是 axios、superagent 等等都可以起到同等的效果, vue-resource 提供的价值和其维护成本相比并不划算, 所以决定在不久以后取消对 vue-resource 的官方推荐."</p></blockquote>
<p>Axios大小仅12k, 目前最新版本号为: <a href="https://www.npmjs.org/package/axios" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="/img/remote/1460000008697458" src="https://static.alili.tech/img/remote/1460000008697458" alt="npm version" title="npm version" style="cursor: pointer;"></span></a></p>
<p>语法上Axios基本就和promise一样, 在then方法中处理回调, 在catch方法中处理异常. 如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="axios.get(&quot;https://api.github.com/users/louiszhai&quot;)
  .then(function(response){
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">axios.get(<span class="hljs-string">"https://api.github.com/users/louiszhai"</span>)
  .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>)</span>{
    <span class="hljs-built_in">console</span>.log(response);
  })
  .catch(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error</span>) </span>{
    <span class="hljs-built_in">console</span>.log(error);
  });</code></pre>
<p>除了get, 它还支持post, delete, head, put, patch, request请求. 具体使用攻略, 请戳这里: <a href="http://www.bootcdn.cn/axios/readme/" rel="nofollow noreferrer" target="_blank">axios</a> .</p>
<p>如需在网页上引入 Axios, 可以链接CDN <a href="http://www.bootcdn.cn/axios/" rel="nofollow noreferrer" target="_blank">axios | Bootstrap中文网开源项目免费 CDN 服务</a> 或者将其下载到本地.</p>
<h3 id="articleHeader10">Fetch</h3>
<p>说到ajax, 就不得不提及fetch, 由于篇幅较长, fetch已从本文中独立出来, 请戳 <a href="http://louiszhai.github.io/2016/11/02/fetch/" rel="nofollow noreferrer" target="_blank">Fetch进阶指南</a> .</p>
<h3 id="articleHeader11">ajax跨域请求</h3>
<h4>什么是CORS</h4>
<p>CORS是一个W3C(World Wide Web)标准, 全称是跨域资源共享(Cross-origin resource sharing).它允许浏览器向跨域服务器, 发出异步http请求, 从而克服了ajax受同源策略的限制. 实际上, 浏览器不会拦截不合法的跨域请求, 而是拦截了他们的响应, 因此即使请求不合法, 很多时候, 服务器依然收到了请求.(Chrome和Firefox下https网站不允许发送http异步请求除外)</p>
<p>通常, 一次跨域访问拥有如下流程:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008697459?w=600&amp;h=443" src="https://static.alili.tech/img/remote/1460000008697459?w=600&amp;h=443" alt="" title="" style="cursor: pointer;"></span></p>
<h4>移动端CORS兼容性</h4>
<p>当前几乎所有的桌面浏览器(Internet Explorer 8+, Firefox 3.5+, Safari 4+和 Chrome 3+)都可通过名为跨域资源共享的协议支持ajax跨域调用.</p>
<p>那么移动端兼容性又如何呢? 请看下图:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008697460?w=563&amp;h=271" src="https://static.alili.tech/img/remote/1460000008697460?w=563&amp;h=271" alt="cors-mobile" title="cors-mobile" style="cursor: pointer;"></span></p>
<p>可见, CORS的技术在IOS Safari7.1及Android webview2.3中就早已支持, 即使低版本下webview的canvas在使用跨域的video或图片时会有问题, 也丝毫不影响CORS的在移动端的使用. 至此, 我们就可以放心大胆的去应用CORS了.</p>
<h4>CORS有关的headers</h4>
<p>1) HTTP Response Header(服务器提供):</p>
<ul>
<li><p>Access-Control-Allow-Origin: 指定允许哪些源的网页发送请求.</p></li>
<li><p>Access-Control-Allow-Credentials: 指定是否允许cookie发送.</p></li>
<li><p>Access-Control-Allow-Methods: 指定允许哪些请求方法.</p></li>
<li><p>Access-Control-Allow-Headers: 指定允许哪些常规的头域字段, 比如说 Content-Type.</p></li>
<li><p>Access-Control-Expose-Headers: 指定允许哪些额外的头域字段, 比如说 X-Custom-Header.</p></li>
</ul>
<p>该字段可省略. CORS请求时, xhr.getResponseHeader() 方法默认只能获取6个基本字段: <code>Cache-Control</code>、<code>Content-Language</code>、<code>Content-Type</code>、<code>Expires</code>、<code>Last-Modified</code>、<code>Pragma</code> . 如果需要获取其他字段, 就需要在Access-Control-Expose-Headers 中指定. 如上, 这样xhr.getResponseHeader('X-Custom-Header') 才能返回X-Custom-Header字段的值.(该部分摘自阮一峰老师博客)</p>
<ul><li><p>Access-Control-Max-Age: 指定preflight OPTIONS请求的有效期, 单位为秒.</p></li></ul>
<p>2) HTTP Request Header(浏览器OPTIONS请求默认自带):</p>
<ul>
<li><p>Access-Control-Request-Method: 告知服务器,浏览器将发送哪种请求, 比如说POST.</p></li>
<li><p>Access-Control-Request-Headers: 告知服务器, 浏览器将包含哪些额外的头域字段.</p></li>
</ul>
<p>3) 以下所有的header name 是被拒绝的:</p>
<ul>
<li><p>Accept-Charset</p></li>
<li><p>Accept-Encoding</p></li>
<li><p>Access-Control-Request-Headers</p></li>
<li><p>Access-Control-Request-Method</p></li>
<li><p>Connection</p></li>
<li><p>Content-Length</p></li>
<li><p>Cookie</p></li>
<li><p>Cookie2</p></li>
<li><p>Date</p></li>
<li><p>DNT</p></li>
<li><p>Expect</p></li>
<li><p>Host</p></li>
<li><p>Keep-Alive</p></li>
<li><p>Origin</p></li>
<li><p>Referer</p></li>
<li><p>TE</p></li>
<li><p>Trailer</p></li>
<li><p>Transfer-Encoding</p></li>
<li><p>Upgrade</p></li>
<li><p>Via</p></li>
<li><p>包含以<code>Proxy-</code> 或 <code>Sec-</code> 开头的header name</p></li>
</ul>
<h4>CORS请求</h4>
<p>CORS请求分为两种, ① 简单请求; ② 非简单请求.</p>
<p>满足如下两个条件便是简单请求, 反之则为非简单请求.(CORS请求部分摘自阮一峰老师博客)</p>
<p>1) 请求是以下三种之一:</p>
<ul>
<li><p>HEAD</p></li>
<li><p>GET</p></li>
<li><p>POST</p></li>
</ul>
<p>2) http头域不超出以下几种字段:</p>
<ul>
<li><p>Accept</p></li>
<li><p>Accept-Language</p></li>
<li><p>Content-Language</p></li>
<li><p>Last-Event-ID</p></li>
<li><p>Content-Type字段限三个值 <code>application/x-www-form-urlencoded</code>、<code>multipart/form-data</code>、<code>text/plain</code></p></li>
</ul>
<p>对于简单请求, 浏览器将发送一次http请求, 同时在Request头域中增加 <code>Origin</code> 字段, 用来标示请求发起的源, 服务器根据这个源采取不同的响应策略. 若服务器认为该请求合法, 那么需要往返回的 HTTP Response 中添加 <code>Access-Control-*</code> 等字段.( <code>Access-Control-*</code> 相关字段解析请阅读我之前写的<a href="http://louiszhai.github.io/2016/01/11/cross-domain/#CORS__u8DE8_u57DF_u8BBF_u95EE%5D" rel="nofollow noreferrer" target="_blank">CORS 跨域访问</a> )</p>
<p>对于非简单请求, 比如Method为<code>POST</code>且Content-Type值为 <code>application/json</code> 的请求或者Method为 <code>PUT</code> 或 <code>DELETE</code> 的请求, 浏览器将发送两次http请求. 第一次为preflight预检(Method: OPTIONS),主要验证来源是否合法. 值得注意的是:OPTION请求响应头同样需要包含 <code>Access-Control-*</code> 字段等. 第二次才是真正的HTTP请求. 所以服务器必须处理OPTIONS应答(通常需要返回20X的状态码, 否则xhr.onerror事件将被触发).</p>
<p>以上请求流程图为:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008697461?w=644&amp;h=328" src="https://static.alili.tech/img/remote/1460000008697461?w=644&amp;h=328" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h4>HTML启用CORS</h4>
<p>http-equiv 相当于http的响应头, 它回应给浏览器一些有用的信息,以帮助正确和精确地显示网页内容. 如下html将允许任意域名下的网页跨域访问.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta http-equiv=&quot;Access-Control-Allow-Origin&quot; content=&quot;*&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"Access-Control-Allow-Origin"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"*"</span>&gt;</span></code></pre>
<h4>图片启用CORS</h4>
<p>通常, 图片允许跨域访问, 也可以在canvas中使用跨域的图片, 但这样做会污染画布, 一旦画布受污染, 将无法读取其数据. 比如无法调用 toBlob(), toDataURL() 或 getImageData()方法. 浏览器的这种安全机制规避了未经许可的远程服务器图片被滥用的风险.(该部分内容摘自 <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTML/CORS_enabled_image" rel="nofollow noreferrer" target="_blank">启用了 CORS 的图片 - HTML（超文本标记语言） | MDN</a>)</p>
<p>因此如需在canvas中使用跨域的图片资源, 请参考如下apache配置片段(来自<a href="https://github.com/h5bp/server-configs-apache/blob/fc379c45f52a09dd41279dbf4e60ae281110a5b0/src/.htaccess#L36-L53" rel="nofollow noreferrer" target="_blank">HTML5 Boilerplate Apache server configs</a>).</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<IfModule mod_setenvif.c>
    <IfModule mod_headers.c>
        <FilesMatch &quot;\.(cur|gif|ico|jpe?g|png|svgz?|webp)$&quot;>
            SetEnvIf Origin &quot;:&quot; IS_CORS
            Header set Access-Control-Allow-Origin &quot;*&quot; env=IS_CORS
        </FilesMatch>
    </IfModule>
</IfModule>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code><span class="hljs-section">&lt;IfModule mod_setenvif.c&gt;</span>
    <span class="hljs-section">&lt;IfModule mod_headers.c&gt;</span>
        <span class="hljs-section">&lt;FilesMatch "\.(cur|gif|ico|jpe?g|png|svgz?|webp)$"&gt;</span>
            <span class="hljs-attribute">SetEnvIf</span> Origin <span class="hljs-string">":"</span> IS_CORS
            <span class="hljs-attribute"><span class="hljs-nomarkup">Header</span></span> set Access-Control-Allow-Origin <span class="hljs-string">"*"</span> env=IS_CORS
        <span class="hljs-section">&lt;/FilesMatch&gt;</span>
    <span class="hljs-section">&lt;/IfModule&gt;</span>
<span class="hljs-section">&lt;/IfModule&gt;</span></code></pre>
<h3 id="articleHeader12">ajax文件上传</h3>
<p>ajax实现文件上传非常简单, 这里我选取原生js, jq, angular 分别来比较下, 并顺便聊聊使用它们时的注意事项.(ajax文件上传的代码已上传至github, 请戳这里预览效果: <a href="http://louiszhai.github.io/res/ajaxUpload.html" rel="nofollow noreferrer" target="_blank">ajax 文件上传 demo | louis</a>)</p>
<p>1) 为了上传文件, 我们得先选中一个文件. 一个type为file的input框就够了.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input id=&quot;input&quot; type=&quot;file&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"input"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"file"</span>&gt;</span></code></pre>
<p>2) 然后用FormData对象包裹?选中的文件.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var input = document.getElementById(&quot;input&quot;),
    formData = new FormData();
formData.append(&quot;file&quot;,input.files[0]);//key可以随意定义,只要后台能理解就行" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> input = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"input"</span>),
    formData = <span class="hljs-keyword">new</span> FormData();
formData.append(<span class="hljs-string">"file"</span>,input.files[<span class="hljs-number">0</span>]);<span class="hljs-comment">//key可以随意定义,只要后台能理解就行</span></code></pre>
<p>3) 定义上传的URL, 以及方法. github上我搭建了一个 <a href="https://github.com/Louiszhai/node-webserver" rel="nofollow noreferrer" target="_blank">node-webserver</a>, 根据需要可以自行克隆下来npm start后便可调试本篇代码.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var url = &quot;http://localhost:10108/test&quot;,
    method = &quot;POST&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> url = <span class="hljs-string">"http://localhost:10108/test"</span>,
    method = <span class="hljs-string">"POST"</span>;</code></pre>
<h4>js文件上传</h4>
<p>4.1) 封装一个用于发送ajax请求的方法.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ajax(url, method, data){
  var xhr = null;
  if(window.XMLHttpRequest) {
    xhr = new XMLHttpRequest();
  } else if (window.ActiveXObject) {
    try {
      xhr = new ActiveXObject(&quot;Msxml2.XMLHTTP&quot;);
    } catch (e) {
      try {
        xhr = new ActiveXObject(&quot;Microsoft.XMLHTTP&quot;);
      } catch (e) { 
        alert(&quot;您的浏览器暂不支持Ajax!&quot;);
      }
    }
  }
  xhr.onerror = function(e){
    console.log(e);
  }
  xhr.open(method, url);
  try{
    setTimeout(function(){
      xhr.send(data);
    });
  }catch(e){
    console.log('error:',e);
  }
  return xhr;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ajax</span>(<span class="hljs-params">url, method, data</span>)</span>{
  <span class="hljs-keyword">var</span> xhr = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">if</span>(<span class="hljs-built_in">window</span>.XMLHttpRequest) {
    xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.ActiveXObject) {
    <span class="hljs-keyword">try</span> {
      xhr = <span class="hljs-keyword">new</span> ActiveXObject(<span class="hljs-string">"Msxml2.XMLHTTP"</span>);
    } <span class="hljs-keyword">catch</span> (e) {
      <span class="hljs-keyword">try</span> {
        xhr = <span class="hljs-keyword">new</span> ActiveXObject(<span class="hljs-string">"Microsoft.XMLHTTP"</span>);
      } <span class="hljs-keyword">catch</span> (e) { 
        alert(<span class="hljs-string">"您的浏览器暂不支持Ajax!"</span>);
      }
    }
  }
  xhr.onerror = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
    <span class="hljs-built_in">console</span>.log(e);
  }
  xhr.open(method, url);
  <span class="hljs-keyword">try</span>{
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      xhr.send(data);
    });
  }<span class="hljs-keyword">catch</span>(e){
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'error:'</span>,e);
  }
  <span class="hljs-keyword">return</span> xhr;
}</code></pre>
<p>4.2) 上传文件并绑定事件.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr = ajax(url, method, formData);
xhr.upload.onprogress = function(e){
  console.log(&quot;upload progress:&quot;, e.loaded/e.total*100 + &quot;%&quot;);
};
xhr.upload.onload = function(){
  console.log(&quot;upload onload.&quot;);
};
xhr.onload = function(){
  console.log(&quot;onload.&quot;);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> xhr = ajax(url, method, formData);
xhr.upload.onprogress = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"upload progress:"</span>, e.loaded/e.total*<span class="hljs-number">100</span> + <span class="hljs-string">"%"</span>);
};
xhr.upload.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"upload onload."</span>);
};
xhr.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"onload."</span>);
}</code></pre>
<p>上传结果如下所示:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008697462?w=850&amp;h=212" src="https://static.alili.tech/img/remote/1460000008697462?w=850&amp;h=212" alt="js file upload" title="js file upload" style="cursor: pointer;"></span></p>
<h4>fetch上传</h4>
<p>5) fetch只要发送一个post请求, 并且body属性设置为formData即可. 遗憾的是, fetch无法跟踪上传的进度信息.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fetch(url, {
  method: method,
  body: formData
  }).then(function(res){
  console.log(res);
  }).catch(function(e){
  console.log(e);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">fetch(url, {
  <span class="hljs-attr">method</span>: method,
  <span class="hljs-attr">body</span>: formData
  }).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>)</span>{
  <span class="hljs-built_in">console</span>.log(res);
  }).catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
  <span class="hljs-built_in">console</span>.log(e);
});</code></pre>
<h4>jquery文件上传</h4>
<p>jq提供了各式各样的上传插件, 其原理都是利用jq自身的ajax方法.</p>
<p>6) jq的ajax提供了xhr属性用于自定义各种事件.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.ajax({
  type: method,
  url: url,
  data: formData,
  processData : false,
  contentType : false ,//必须false才会自动加上正确的Content-Type
  xhr: function(){
    var xhr = $.ajaxSettings.xhr();//实际上就是return new window.XMLHttpRequest()对象
    if(xhr.upload) {
      xhr.upload.addEventListener(&quot;progress&quot;, function(e){
        console.log(&quot;jq upload progress:&quot;, e.loaded/e.total*100 + &quot;%&quot;);
      }, false);
      xhr.upload.addEventListener(&quot;load&quot;, function(){
        console.log(&quot;jq upload onload.&quot;);
      });
      xhr.addEventListener(&quot;load&quot;, function(){
        console.log(&quot;jq onload.&quot;);
      });
      return xhr;
    }
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$.ajax({
  <span class="hljs-attr">type</span>: method,
  <span class="hljs-attr">url</span>: url,
  <span class="hljs-attr">data</span>: formData,
  <span class="hljs-attr">processData</span> : <span class="hljs-literal">false</span>,
  <span class="hljs-attr">contentType</span> : <span class="hljs-literal">false</span> ,<span class="hljs-comment">//必须false才会自动加上正确的Content-Type</span>
  xhr: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> xhr = $.ajaxSettings.xhr();<span class="hljs-comment">//实际上就是return new window.XMLHttpRequest()对象</span>
    <span class="hljs-keyword">if</span>(xhr.upload) {
      xhr.upload.addEventListener(<span class="hljs-string">"progress"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"jq upload progress:"</span>, e.loaded/e.total*<span class="hljs-number">100</span> + <span class="hljs-string">"%"</span>);
      }, <span class="hljs-literal">false</span>);
      xhr.upload.addEventListener(<span class="hljs-string">"load"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"jq upload onload."</span>);
      });
      xhr.addEventListener(<span class="hljs-string">"load"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"jq onload."</span>);
      });
      <span class="hljs-keyword">return</span> xhr;
    }
  }
});</code></pre>
<p>jq上传结果如下所示:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008697463?w=838&amp;h=210" src="https://static.alili.tech/img/remote/1460000008697463?w=838&amp;h=210" alt="jq file upload" title="jq file upload" style="cursor: pointer;"></span></p>
<p>有关jq ajax更多的api, 请参考中文文档 <a href="http://www.jquery123.com/jQuery.ajax/" rel="nofollow noreferrer" target="_blank">jQuery.ajax() | jQuery API 中文文档</a> .</p>
<h4>angular文件上传</h4>
<p>7.1) angular提供了$http方法用于发送http请求, 该方法返回一个promise对象.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$http({
  method: method,
  url: url,
  data: formData,
}).success(function(res) {
  console.log(res);
}).error(function(err, status) {
  console.log(err);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$http({
  <span class="hljs-attr">method</span>: method,
  <span class="hljs-attr">url</span>: url,
  <span class="hljs-attr">data</span>: formData,
}).success(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>) </span>{
  <span class="hljs-built_in">console</span>.log(res);
}).error(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, status</span>) </span>{
  <span class="hljs-built_in">console</span>.log(err);
});</code></pre>
<p>angular文件上传的代码已上传至github, 请戳这里预览效果: <a href="http://louiszhai.github.io/res/angularUpload.html" rel="nofollow noreferrer" target="_blank">angular 文件上传 demo | louis</a>.</p>
<p>低版本angular中文件上传的功能并不完整,  直到angular1.5.5才在$http中加入了eventHandler和uploadEventHandlers等方法, 使得它支持上传进度信息. 如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$http({
  method: method,
  url: url,
  eventHandlers: {
    progress: function(c) {//下载进度
      console.log('Progress -> ' + c);
    }
  },
  uploadEventHandlers: {
    progress: function(e) {//上传进度
      console.log('UploadProgress -> ' + e);
    }
  },
  data: formData,
}).success(function(res) {
  console.log(res);
}).error(function(err, status) {
  console.log(err);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$http({
  <span class="hljs-attr">method</span>: method,
  <span class="hljs-attr">url</span>: url,
  <span class="hljs-attr">eventHandlers</span>: {
    <span class="hljs-attr">progress</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">c</span>) </span>{<span class="hljs-comment">//下载进度</span>
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Progress -&gt; '</span> + c);
    }
  },
  <span class="hljs-attr">uploadEventHandlers</span>: {
    <span class="hljs-attr">progress</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{<span class="hljs-comment">//上传进度</span>
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'UploadProgress -&gt; '</span> + e);
    }
  },
  <span class="hljs-attr">data</span>: formData,
}).success(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>) </span>{
  <span class="hljs-built_in">console</span>.log(res);
}).error(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, status</span>) </span>{
  <span class="hljs-built_in">console</span>.log(err);
});</code></pre>
<p>angular1.5.5以下低版本中, 请参考成熟的实现方案 <a href="https://github.com/nervgh/angular-file-upload" rel="nofollow noreferrer" target="_blank">angular-file-upload</a> 以及它提供的demo <a href="http://nervgh.github.io/pages/angular-file-upload/examples/simple/" rel="nofollow noreferrer" target="_blank">Simple example</a> .</p>
<h3 id="articleHeader13">ajax请求二进制文件</h3>
<h4>FileReader</h4>
<p>处理二进制文件主要使用的是H5的FileReader.</p>
<p>PC支持性如下:</p>
<table>
<thead><tr>
<th align="center">IE</th>
<th align="center">Edge</th>
<th align="center">Firefox</th>
<th align="center">Chrome</th>
<th align="center">Safari</th>
<th align="center">Opera</th>
</tr></thead>
<tbody><tr>
<td align="center">10</td>
<td align="center">12</td>
<td align="center">3.6</td>
<td align="center">6</td>
<td align="center">6</td>
<td align="center">11.5</td>
</tr></tbody>
</table>
<p>Mobile支持性如下:</p>
<table>
<thead><tr>
<th align="center">IOS Safari</th>
<th align="center">Opera Mini</th>
<th align="center">Android Browser</th>
<th align="center">Chrome/Android</th>
<th align="center">UC/Android</th>
</tr></thead>
<tbody><tr>
<td align="center">7.1</td>
<td align="center">-</td>
<td align="center">4</td>
<td align="center">53</td>
<td align="center">11</td>
</tr></tbody>
</table>
<p>以下是其API:</p>
<table>
<thead><tr>
<th align="center">属性/方法名称</th>
<th align="left">描述</th>
</tr></thead>
<tbody>
<tr>
<td align="center"><strong><em>error</em></strong></td>
<td align="left">表示读取文件期间发生的错误.</td>
</tr>
<tr>
<td align="center"><strong><em>readyState</em></strong></td>
<td align="left">表示读取文件的状态.默认有三个值:0表示文件还没有加载;1表示文件正在读取;2表示文件读取完成.</td>
</tr>
<tr>
<td align="center"><strong><em>result</em></strong></td>
<td align="left">读取的文件内容.</td>
</tr>
<tr>
<td align="center"><strong><em>abort()</em></strong></td>
<td align="left">取消文件读取操作, 此时<code>readyState</code>属性将置为2.</td>
</tr>
<tr>
<td align="center"><strong><em>readAsArrayBuffer()</em></strong></td>
<td align="left">读取文件(或blob对象)为类型化数组(<a href="http://blog.csdn.net/lichwei1983/article/details/43893025" rel="nofollow noreferrer" target="_blank">ArrayBuffer</a>),  类型化数组允许开发者以数组下标的方式, 直接操作内存, 由于数据以二进制形式传递, 效率非常高.</td>
</tr>
<tr>
<td align="center"><em><del>readAsBinaryString()</del></em></td>
<td align="left">读取文件(或blob对象)为二进制字符串, 该方法已移出标准api, 请谨慎使用.</td>
</tr>
<tr>
<td align="center"><strong><em>readAsDataURL()</em></strong></td>
<td align="left">读取文件(或blob对象)为base64编码的URL字符串, 与window.URL.createObjectURL方法效果类似.</td>
</tr>
<tr>
<td align="center"><strong><em>readAsText()</em></strong></td>
<td align="left">读取文件(或blob对象)为文本字符串.</td>
</tr>
<tr>
<td align="center"><strong><em>onload()</em></strong></td>
<td align="left">文件读取完成时的事件回调, 默认传入event事件对象. 该回调内, 可通过this.result 或 event.target.result获取读取的文件内容.</td>
</tr>
</tbody>
</table>
<h4>ajax请求二进制图片并预览</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr = new XMLHttpRequest(),
    url = &quot;http://louiszhai.github.io/docImages/ajax01.png&quot;;
xhr.open(&quot;GET&quot;, url);
xhr.responseType = &quot;blob&quot;;
xhr.onload = function(){
  if(this.status == 200){
    var blob = this.response;
    var img = document.createElement(&quot;img&quot;);
    //方案一
    img.src = window.URL.createObjectURL(blob);//这里blob依然占据着内存
    img.onload = function() {
      window.URL.revokeObjectURL(img.src);//释放内存
    };
    //方案二
    /*var reader = new FileReader();
    reader.readAsDataURL(blob);//FileReader将返回base64编码的data-uri对象
    reader.onload = function(){
      img.src = this.result;
    }*/
    //方案三
    //img.src = url;//最简单方法
    document.body.appendChild(img);
  }
}
xhr.send();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest(),
    url = <span class="hljs-string">"http://louiszhai.github.io/docImages/ajax01.png"</span>;
xhr.open(<span class="hljs-string">"GET"</span>, url);
xhr.responseType = <span class="hljs-string">"blob"</span>;
xhr.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.status == <span class="hljs-number">200</span>){
    <span class="hljs-keyword">var</span> blob = <span class="hljs-keyword">this</span>.response;
    <span class="hljs-keyword">var</span> img = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"img"</span>);
    <span class="hljs-comment">//方案一</span>
    img.src = <span class="hljs-built_in">window</span>.URL.createObjectURL(blob);<span class="hljs-comment">//这里blob依然占据着内存</span>
    img.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">window</span>.URL.revokeObjectURL(img.src);<span class="hljs-comment">//释放内存</span>
    };
    <span class="hljs-comment">//方案二</span>
    <span class="hljs-comment">/*var reader = new FileReader();
    reader.readAsDataURL(blob);//FileReader将返回base64编码的data-uri对象
    reader.onload = function(){
      img.src = this.result;
    }*/</span>
    <span class="hljs-comment">//方案三</span>
    <span class="hljs-comment">//img.src = url;//最简单方法</span>
    <span class="hljs-built_in">document</span>.body.appendChild(img);
  }
}
xhr.send();</code></pre>
<h4>ajax请求二进制文本并展示</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr = new XMLHttpRequest();
xhr.open(&quot;GET&quot;,&quot;http://localhost:8080/Information/download.jsp?data=node-fetch.js&quot;);
xhr.responseType = &quot;blob&quot;;
xhr.onload = function(){
  if(this.status == 200){
    var blob = this.response;
    var reader = new FileReader();
    reader.readAsBinaryString(blob);//该方法已被移出标准api,建议使用reader.readAsText(blob);
    reader.onload=function(){
      document.body.innerHTML = &quot;<div>&quot; + this.result + &quot;</div>&quot;;
    }
  }
}
xhr.send();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
xhr.open(<span class="hljs-string">"GET"</span>,<span class="hljs-string">"http://localhost:8080/Information/download.jsp?data=node-fetch.js"</span>);
xhr.responseType = <span class="hljs-string">"blob"</span>;
xhr.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.status == <span class="hljs-number">200</span>){
    <span class="hljs-keyword">var</span> blob = <span class="hljs-keyword">this</span>.response;
    <span class="hljs-keyword">var</span> reader = <span class="hljs-keyword">new</span> FileReader();
    reader.readAsBinaryString(blob);<span class="hljs-comment">//该方法已被移出标准api,建议使用reader.readAsText(blob);</span>
    reader.onload=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
      <span class="hljs-built_in">document</span>.body.innerHTML = <span class="hljs-string">"&lt;div&gt;"</span> + <span class="hljs-keyword">this</span>.result + <span class="hljs-string">"&lt;/div&gt;"</span>;
    }
  }
}
xhr.send();</code></pre>
<p>有关二进制文件的读取, 请移步这篇博客 <a href="http://www.cnblogs.com/jscode/archive/2013/04/27/3572239.html" rel="nofollow noreferrer" target="_blank">HTML5新特性之文件和二进制数据的操作</a> .</p>
<h3 id="articleHeader14">如何等待多个ajax请求完成</h3>
<p>原生js可以使用ES6新增的Promise. ES6的Promise基于 <a href="https://promisesaplus.com/" rel="nofollow noreferrer" target="_blank">Promises/A+</a> 规范(该部分 <a href="http://louiszhai.github.io/2016/10/19/fetch/" rel="nofollow noreferrer" target="_blank">Fetch入门指南</a> 一文也有提及).</p>
<p>这里先提供一个解析responses的函数.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function todo(responses){
  responses.forEach(function(response){
    response.json().then(function(res){
      console.log(res);
    });
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">todo</span>(<span class="hljs-params">responses</span>)</span>{
  responses.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>)</span>{
    response.json().then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>)</span>{
      <span class="hljs-built_in">console</span>.log(res);
    });
  });
}</code></pre>
<p>原生js使用 <code>Promise.all</code> 方法. 如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p1 = fetch(&quot;http://localhost:10108/test1&quot;),
    p2 = fetch(&quot;http://localhost:10108/test2&quot;);
Promise.all([p1, p2]).then(function(responses){
  todo(responses);
  //TODO do somethings
});
//&quot;test1&quot;
//&quot;test2&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> p1 = fetch(<span class="hljs-string">"http://localhost:10108/test1"</span>),
    p2 = fetch(<span class="hljs-string">"http://localhost:10108/test2"</span>);
<span class="hljs-built_in">Promise</span>.all([p1, p2]).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">responses</span>)</span>{
  todo(responses);
  <span class="hljs-comment">//TODO do somethings</span>
});
<span class="hljs-comment">//"test1"</span>
<span class="hljs-comment">//"test2"</span></code></pre>
<p>jquery可以使用$.when方法. 该方法接受一个或多个Deferred对象作为参数, 只有全部成功才调用resolved状态的回调函数, 但只要其中有一个失败，就调用rejected状态的回调函数. 其实, jq的Deferred是基于 Promises/A规范实现, 但并非完全遵循. (传送门: <a href="http://www.css88.com/archives/4750/comment-page-1" rel="nofollow noreferrer" target="_blank">jQuery 中的 Deferred 和 Promises (2)</a> ).</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p1 = $.ajax(&quot;http://localhost:10108/test1&quot;),
    p2 = $.ajax(&quot;http://localhost:10108/test2&quot;);
$.when(p1, p2).then(function(res1, res2){
  console.log(res1);//[&quot;test1&quot;, &quot;success&quot;, Object]
  console.log(res2);//[&quot;test2&quot;, &quot;success&quot;, Object]
  //TODO do somethings
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> p1 = $.ajax(<span class="hljs-string">"http://localhost:10108/test1"</span>),
    p2 = $.ajax(<span class="hljs-string">"http://localhost:10108/test2"</span>);
$.when(p1, p2).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res1, res2</span>)</span>{
  <span class="hljs-built_in">console</span>.log(res1);<span class="hljs-comment">//["test1", "success", Object]</span>
  <span class="hljs-built_in">console</span>.log(res2);<span class="hljs-comment">//["test2", "success", Object]</span>
  <span class="hljs-comment">//TODO do somethings</span>
});</code></pre>
<p>如上, $.when默认返回一个jqXHR对象, 可以直接进行链式调用. then方法的回调中默认传入相应的请求结果, 每个请求结果的都是数组, 数组中依次是responseText, 请求状态, 请求的jqXHR对象.</p>
<p>angular中可以借助 <code>$q.all()</code> 来实现. 别忘了, <code>$q</code> 需要在controller中注入. 此外, <code> $q</code> 相关讲解可参考 <a href="https://code.angularjs.org/1.2.6/docs/api/ng." rel="nofollow noreferrer" target="_blank">AngularJS: ng.$q</a> 或 <a href="https://segmentfault.com/a/1190000000402555">Angular $q service学习笔记</a> .</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var p1 = fetch(&quot;http://localhost:10108/test1&quot;),
    p2 = fetch(&quot;http://localhost:10108/test2&quot;);
$q.all([p1, p2]).then(function(responses){
  todo(responses);
  //TODO do somethings
});
//&quot;test1&quot;
//&quot;test2&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> p1 = fetch(<span class="hljs-string">"http://localhost:10108/test1"</span>),
    p2 = fetch(<span class="hljs-string">"http://localhost:10108/test2"</span>);
$q.all([p1, p2]).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">responses</span>)</span>{
  todo(responses);
  <span class="hljs-comment">//TODO do somethings</span>
});
<span class="hljs-comment">//"test1"</span>
<span class="hljs-comment">//"test2"</span></code></pre>
<p><code>$q.all()</code> 实际上就是对 <code>Promise.all</code> 的封装.</p>
<h3 id="articleHeader15">ajax与history的兼容</h3>
<p>ajax的一大痛点就是无法支持浏览器前进和后退操作. 因此早期的Gmail 采用 iframe, 来模拟ajax的前进和后退.</p>
<p>如今, H5普及, pjax大行其道. pajax 就是 ajax+history.pushState 组合的一种技术. 使用它便可以无刷新通过浏览器前进和后退来改变页面内容.</p>
<p>先看下兼容性.</p>
<div class="table-wrap"><table>
<thead><tr>
<th align="center"> </th>
<th align="center">IE</th>
<th align="center">Edge</th>
<th align="center">Firefox</th>
<th align="center">Chrome</th>
<th align="center">Safari</th>
<th align="center">Opera</th>
<th align="center">iOS Safari</th>
<th align="center">Android Browser</th>
<th align="center">Chrome for Android</th>
</tr></thead>
<tbody>
<tr>
<td align="center">pushState/replaceState</td>
<td align="center">10</td>
<td align="center">12</td>
<td align="center">4</td>
<td align="center">5</td>
<td align="center">6</td>
<td align="center">11.5</td>
<td align="center">7.1</td>
<td align="center">4.3</td>
<td align="center">53</td>
</tr>
<tr>
<td align="center">history.state</td>
<td align="center">10</td>
<td align="center"> </td>
<td align="center">4</td>
<td align="center">18</td>
<td align="center">6</td>
<td align="center">11.5</td>
<td align="center"> </td>
<td align="center"> </td>
<td align="center"> </td>
</tr>
</tbody>
</table></div>
<p>可见IE8,9并不能使用 H5的history. 需要使用垫片 <a href="https://github.com/devote/HTML5-History-API" rel="nofollow noreferrer" target="_blank">HTML5 History API expansion for browsers not supporting pushState, replaceState</a> .</p>
<h4>pjax</h4>
<p>pjax简单易用, 仅需要如下三个api:</p>
<ul>
<li><p>history.pushState(obj, title, url) 表示往页面history末尾新增一个历史项(history entry), 此时history.length会+1.</p></li>
<li><p>history.replaceState(obj, title, url) 表示替换当前历史项为新的历史项. 此时history.length保持不变.</p></li>
<li><p>window.onpopstate 仅在浏览器前进和后退时触发(history.go(1), history.back() 及location.href="xxx" 均会触发), 此时可在history.state中拿到刚刚塞进去的state, 即obj对象(其他数据类型亦可).</p></li>
</ul>
<p>我们注意到, 首次进入一个页面, 此时 <code>history.length</code> 值为1, <code>history.state</code> 为空. 如下:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008697464?w=391&amp;h=125" src="https://static.alili.tech/img/remote/1460000008697464?w=391&amp;h=125" alt="history.state" title="history.state" style="cursor: pointer;"></span></p>
<p>1) 为了在onpopstate事件回调中每次都能拿到 <code>history.state</code> , 此时需要在页面载入完成后, 自动替换下当前url.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="history.replaceState(&quot;init&quot;, title, &quot;xxx.html?state=0&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">history.replaceState(<span class="hljs-string">"init"</span>, title, <span class="hljs-string">"xxx.html?state=0"</span>);</code></pre>
<p>2) 每次发送ajax请求时, 在请求完成后, 调用如下, 从而实现浏览器history往前进.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="history.pushState(&quot;ajax请求相关参数&quot;, title, &quot;xxx.html?state=标识符&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">history.pushState(<span class="hljs-string">"ajax请求相关参数"</span>, title, <span class="hljs-string">"xxx.html?state=标识符"</span>);</code></pre>
<p>3) 浏览器前进和后退时, <code>popstate </code> 事件会自动触发, 此时我们手动取出 <code>history.state</code> , 构建参数并重新发送ajax请求或者直接取用state值, 从而实现无刷新还原页面.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.addEventListener(&quot;popstate&quot;, function(e) {
    var currentState = history.state;
    //TODO 拼接ajax请求参数并重新发送ajax请求, 从而回到历史页面
      //TODO 或者从state中拿到关键值直接还原历史页面
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">"popstate"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
    <span class="hljs-keyword">var</span> currentState = history.state;
    <span class="hljs-comment">//TODO 拼接ajax请求参数并重新发送ajax请求, 从而回到历史页面</span>
      <span class="hljs-comment">//TODO 或者从state中拿到关键值直接还原历史页面</span>
});</code></pre>
<p><code>popstate </code> 事件触发时, 默认会传入 <code>PopStateEvent</code> 事件对象. 该对象具有如下属性.</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008697465?w=800&amp;h=306" src="https://static.alili.tech/img/remote/1460000008697465?w=800&amp;h=306" alt="PopStateEvent" title="PopStateEvent" style="cursor: pointer; display: inline;"></span></p>
<p>如有不懂, 更详细讲解请移步 : <a href="http://www.zhangxinxu.com/wordpress/2013/06/html5-history-api-pushstate-replacestate-ajax/" rel="nofollow noreferrer" target="_blank">ajax与HTML5 history pushState/replaceState实例 « 张鑫旭-鑫空间-鑫生活</a> .</p>
<h3 id="articleHeader16">ajax缓存处理</h3>
<p>js中的http缓存没有开关, 受制于浏览器http缓存策略. 原生xhr请求中, 可通过如下设置关闭缓存.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.setRequestHeader(&quot;If-Modified-Since&quot;,&quot;0&quot;);
xhr.setRequestHeader(&quot;Cache-Control&quot;,&quot;no-cache&quot;);
//或者 URL 参数后加上  &quot;?timestamp=&quot; + new Date().getTime()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">xhr.setRequestHeader(<span class="hljs-string">"If-Modified-Since"</span>,<span class="hljs-string">"0"</span>);
xhr.setRequestHeader(<span class="hljs-string">"Cache-Control"</span>,<span class="hljs-string">"no-cache"</span>);
<span class="hljs-comment">//或者 URL 参数后加上  "?timestamp=" + new Date().getTime()</span></code></pre>
<p>jquery的http缓存是否开启可通过在settings中指定cache.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.ajax({
  url : 'url',
  dataType : &quot;xml&quot;,
  cache: true,//true表示缓存开启, false表示缓存不开启
  success : function(xml, status){    
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">$.ajax({
  <span class="hljs-attr">url</span> : <span class="hljs-string">'url'</span>,
  <span class="hljs-attr">dataType</span> : <span class="hljs-string">"xml"</span>,
  <span class="hljs-attr">cache</span>: <span class="hljs-literal">true</span>,<span class="hljs-comment">//true表示缓存开启, false表示缓存不开启</span>
  success : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">xml, status</span>)</span>{    
  }
});</code></pre>
<p>同时jquery还可以全局设置是否缓存. 如下将全局关闭ajax缓存.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.ajaxSetup({cache:false});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">$.ajaxSetup({<span class="hljs-attr">cache</span>:<span class="hljs-literal">false</span>});</code></pre>
<p>除此之外, 调试过程中出现的浏览器缓存尤为可恶. 建议开启隐私浏览器或者勾选☑️控制台的 <code>Disable cache</code> 选项. (这里以Chrome举例, 其他浏览器类似)</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008697466?w=900&amp;h=70" src="https://static.alili.tech/img/remote/1460000008697466?w=900&amp;h=70" alt="PopStateEvent" title="PopStateEvent" style="cursor: pointer;"></span></p>
<h3 id="articleHeader17">ajax的错误处理</h3>
<p>前面已经提过, 通常只要是ajax请求收到了http状态码, 便不会进入到错误捕获里.(Chrome中407响应头除外)</p>
<p>实际上, <code>$.ajax </code> 方法略有区别, jquery的ajax方法还会在类型解析出错时触发error回调. 最常见的便是: dataType设置为json, 但是返回的data并非json格式, 此时 <code>$.ajax</code> 的error回调便会触发.</p>
<h3 id="articleHeader18">ajax调试技巧</h3>
<p>有关调试, 如果接口只是做小部分修改. 那么可以使用charles(Mac) 或者fiddler(Windows), 做代理, 将请求的资源替换为本地文件, 或者使用其断点功能, 直接编辑response.</p>
<p>如果是新增接口的调试, 可以本地搭建node服务. 利用hosts文件配置dns + nginx将http请求转发到本地node服务器. 简易的node调试服务器可参考我的 <a href="https://github.com/Louiszhai/node-webserver" rel="nofollow noreferrer" target="_blank">node-webserver</a> . 如下举一个栗子?:</p>
<h4>hosts+nginx+node-webserver</h4>
<p>假设我们要调试的是 www.test.com 的GET接口. 以下所有步骤以Mac为例, 其他系统, 请自行搜索?文件路径.</p>
<p>1) hosts配置.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sudo vim /etc/hosts
#新增一行 127.0.0.1 www.test.com" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">sudo vim /etc/hosts
<span class="hljs-comment">#新增一行 127.0.0.1 www.test.com</span></code></pre>
<p>2) nginx 配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="brew install nginx #安装
#安装成功后进入目标目录
cd /usr/local/etc/nginx/
cd servers #默认配置入口为nginx.conf.同时servers目录下*.conf文件已自动加入到配置文件列表中
vim test.conf
#粘贴如下内容
server {
  listen       80;
  server_name  www.test.com;
  index index.html;
  error_page   500 502 503 504  /50x.html;
  location = /50x.html {
      root   html;
  }
  location / {
    proxy_pass http://localhost:10108/;
    proxy_redirect off;
    proxy_set_header Host $host;
    proxy_set_header        X-Read-IP       $remote_addr;
    proxy_set_header        X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
#:wq保存并退出
#启动nginx
sudo nginx -s reload #如果启动了只需重启即可
sudo nginx #如果没有启动,便启动之" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">brew install nginx <span class="hljs-comment">#安装</span>
<span class="hljs-comment">#安装成功后进入目标目录</span>
<span class="hljs-built_in">cd</span> /usr/<span class="hljs-built_in">local</span>/etc/nginx/
<span class="hljs-built_in">cd</span> servers <span class="hljs-comment">#默认配置入口为nginx.conf.同时servers目录下*.conf文件已自动加入到配置文件列表中</span>
vim test.conf
<span class="hljs-comment">#粘贴如下内容</span>
server {
  listen       80;
  server_name  www.test.com;
  index index.html;
  error_page   500 502 503 504  /50x.html;
  location = /50x.html {
      root   html;
  }
  location / {
    proxy_pass http://localhost:10108/;
    proxy_redirect off;
    proxy_set_header Host <span class="hljs-variable">$host</span>;
    proxy_set_header        X-Read-IP       <span class="hljs-variable">$remote_addr</span>;
    proxy_set_header        X-Forwarded-For <span class="hljs-variable">$proxy_add_x_forwarded_for</span>;
  }
}
<span class="hljs-comment">#:wq保存并退出</span>
<span class="hljs-comment">#启动nginx</span>
sudo nginx <span class="hljs-_">-s</span> reload <span class="hljs-comment">#如果启动了只需重启即可</span>
sudo nginx <span class="hljs-comment">#如果没有启动,便启动之</span></code></pre>
<p>3) node-webServer 配置</p>
<p>参考 <a href="https://github.com/Louiszhai/node-webserver" rel="nofollow noreferrer" target="_blank">node-webserver</a> . 启动服务前只需更改index.js, 在第9行后插入如下内容:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'get': {
  '/': {
      getKey : 'Welcome to Simple Node  WebServer!'
  },
  '接口api': '你的response内容'//插入的代码                               
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">'get': {
  '/': {
      getKey : 'Welcome to Simple Node  WebServer!'
  },
  '接口api': '你的response内容'//插入的代码                               
},</code></pre>
<p>如需在nginx中配置CORS, 请看这里: <a href="http://mp.weixin.qq.com/s?__biz=MzI3MTI2NzkxMA==&amp;mid=2247484408&amp;idx=1&amp;sn=5c64dd43ff2060e1c4a22d93e4e887c9&amp;scene=1&amp;srcid=0901vPdwJR0crm8vJmjboYzI#rd" rel="nofollow noreferrer" target="_blank">Nginx通过CORS实现跨域</a>.</p>
<h4>编码问题</h4>
<p>XMLHttpRequest 返回的数据默认的字符编码是utf-8, post方法提交数据默认的字符编码也是utf-8. 若页面编码为gbk等中文编码, 那么就会产生乱码.</p>
<h3 id="articleHeader19">后端接口测试技巧</h3>
<p>通常, 如果后端接口开发OK了, 前端同学需要通过一些手段来确认接口是能正常访问的.</p>
<h4>使用命令测试OPTIONS请求</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="curl -I -X OPTIONS -H &quot;Origin: http://example.com&quot; http://localhost:10108/
# response
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/json;charset=UTF-8
Access-Control-Allow-Credentials: true
Access-Control-Allow-Headers: x-requested-with,Content-Type
Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS
Access-Control-Allow-Origin: http://example.com
Access-Control-Max-Age: 3600
Server: Node WebServer
Website: https://github.com/Louiszhai/node-webserver
Date: Fri, 21 Oct 2016 09:00:40 GMT
Connection: keep-alive
Transfer-Encoding: chunked" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">curl -I -X OPTIONS -H <span class="hljs-string">"Origin: http://example.com"</span> http://localhost:10108/
<span class="hljs-comment"># response</span>
HTTP/1.1 200 OK
X-Powered-By: Express
Content-Type: text/json;charset=UTF-8
Access-Control-Allow-Credentials: <span class="hljs-literal">true</span>
Access-Control-Allow-Headers: x-requested-with,Content-Type
Access-Control-Allow-Methods: GET,POST,PUT,DELETE,OPTIONS
Access-Control-Allow-Origin: http://example.com
Access-Control-Max-Age: 3600
Server: Node WebServer
Website: https://github.com/Louiszhai/node-webserver
Date: Fri, 21 Oct 2016 09:00:40 GMT
Connection: keep-alive
Transfer-Encoding: chunked</code></pre>
<p>以上, http状态码为200, 表示允许OPTIONS请求.</p>
<p>GET, POST 请求与GET类似, 其他请求亦然.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="curl -I -X GET -H &quot;Origin: http://example.com&quot; http://localhost:10108/
#HTTP/1.1 200 OK
curl -I -X POST -H &quot;Origin: http://example.com&quot; http://localhost:10108/test
#HTTP/1.1 200 OK" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">curl -I -X GET -H <span class="hljs-string">"Origin: http://example.com"</span> http://localhost:10108/
<span class="hljs-comment">#HTTP/1.1 200 OK</span>
curl -I -X POST -H <span class="hljs-string">"Origin: http://example.com"</span> http://localhost:10108/<span class="hljs-built_in">test</span>
<span class="hljs-comment">#HTTP/1.1 200 OK</span></code></pre>
<h4>postman</h4>
<p>除此之外, 我们还可以通过chrome的postman扩展进行测试. 请看postman素洁的界面:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008697467?w=1023&amp;h=349" src="https://static.alili.tech/img/remote/1460000008697467?w=1023&amp;h=349" alt="" title="" style="cursor: pointer;"></span></p>
<p>postman支持所有类型的http请求, 由于其向chrome申请了cookie访问权限及所有http(s)网站的访问权限. 因此可以放心使用它进行各种网站api的测试.</p>
<p>同时, 强烈建议阅读本文的你升级postman的使用技巧, 这里有篇: <a href="https://segmentfault.com/a/1190000005055899">基于Postman的API自动化测试</a> , 拿走不谢.</p>
<h3 id="articleHeader20">ajax移动端兼容性</h3>
<p>移动端的支持性比较弱, 使用需谨慎. 看表.</p>
<table>
<thead><tr>
<th align="center"> </th>
<th align="center">IOS Safari</th>
<th align="center">Opera Mini</th>
<th align="center">Android Browser</th>
<th align="center">Android Chrome</th>
<th align="center">Android UC</th>
</tr></thead>
<tbody>
<tr>
<td align="center">XMLHttpRequest</td>
<td align="center">8.4</td>
<td align="center">-</td>
<td align="center">4.4.4</td>
<td align="center">53</td>
<td align="center">11(part)</td>
</tr>
<tr>
<td align="center">fetch</td>
<td align="center">-</td>
<td align="center">-</td>
<td align="center">52</td>
<td align="center">53</td>
<td align="center">-</td>
</tr>
</tbody>
</table>
<p>本篇为ajax而生, 通篇介绍 XMLHTTPRequest 相关的知识, 力求简明, 本欲为梳理知识, 为读者答疑解惑, 但因本人理解所限, 难免有所局限, 希望正在阅读的你取其精华去其糟粕. 谢谢.</p>
<hr>
<p>本文就讨论这么多内容,大家有什么问题或好的想法欢迎在下方参与留言和评论.</p>
<p>本文作者: <a href="https://github.com/Louiszhai" rel="nofollow noreferrer" target="_blank">louis</a></p>
<p>本文链接: <a href="http://louiszhai.github.io/2016/11/02/ajax/" rel="nofollow noreferrer" target="_blank">http://louiszhai.github.io/20...</a></p>
<p>参考文章</p>
<ul>
<li><p><a href="https://xhr.spec.whatwg.org/" rel="nofollow noreferrer" target="_blank">XMLHttpRequest Standard</a></p></li>
<li><p><a href="http://www.ruanyifeng.com/blog/2012/09/xmlhttprequest_level_2.html" rel="nofollow noreferrer" target="_blank">XMLHttpRequest Level 2 使用指南 - 阮一峰的网络日志</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000004322487">你真的会使用XMLHttpRequest吗？ - WEB前端路上踩过的坑儿 - SegmentFault</a></p></li>
<li><p><a href="http://www.zhangxinxu.com/wordpress/2013/06/html5-history-api-pushstate-replacestate-ajax/" rel="nofollow noreferrer" target="_blank">ajax与HTML5 history pushState/replaceState实例 « 张鑫旭-鑫空间-鑫生活</a></p></li>
<li><p><a href="http://www.ruanyifeng.com/blog/2016/04/cors.html" rel="nofollow noreferrer" target="_blank">跨域资源共享 CORS 详解 - 阮一峰的网络日志</a></p></li>
<li><p><a href="http://www.jquery123.com/jQuery.ajax/" rel="nofollow noreferrer" target="_blank">jQuery.ajax() | jQuery API 中文文档 -- jQuery 中文网</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Ajax知识体系大梳理

## 原文链接
[https://segmentfault.com/a/1190000008697448](https://segmentfault.com/a/1190000008697448)

