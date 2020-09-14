---
title: '温故js系列（12）-ajax&&优缺点&&node后端' 
date: 2019-02-05 2:30:08
hidden: true
slug: 7enesj2zrrc
categories: [reprint]
---

{{< raw >}}

                    
<p>前端学习：<a href="https://github.com/xiaohuazheng/-/issues/1" rel="nofollow noreferrer" target="_blank">教程&amp;开发模块化/规范化/工程化/优化&amp;工具/调试&amp;值得关注的博客/Git&amp;面试-前端资源汇总</a></p>
<p>欢迎提issues斧正：<a href="https://github.com/xiaohuazheng/tasteJs/issues/13" rel="nofollow noreferrer" target="_blank">Ajax</a></p>
<h2 id="articleHeader0">JavaScript-Ajax&amp;&amp;node后端</h2>
<p>2005年Jesse James Garrett 发表了一篇文章，标题为：“Ajax：A new Approach to Web Applications”。他在这篇文章里介绍了一种技术叫：Ajax，即Asynchronous JavaScript And XML。这种技术能够向服务器请求数据而不须刷新整个页面，会带来更好的用户体验。</p>
<h3 id="articleHeader1">XMLHttpRequest</h3>
<p>Ajax技术核心是XMLHttpRequest 对象(简称XHR)，提供了向服务器发送请求和解析服务器响应提供了流畅的接口。能够以异步方式从服务器获取更多的信息，在不刷新网页的情况下，更新服务器最新的数据到页面上。IE7+、Firefox、Opera、Chrome 和Safari 都支持原生的XHR对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr = new XMLHttpRequest();  //实例化XMLHttpRequest" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> <span class="hljs-type">XMLHttpRequest</span>();  <span class="hljs-comment">//实例化XMLHttpRequest</span></code></pre>
<p>虽然说现在基本不用去兼容IE6了，有句话叫啥：你不用为了一点用户去提高开发成本。不过，学习的时候还是要摸清楚。IE6 及以下，那么我们必须还需要使用ActiveX 对象通过MSXML 库来实现。兼容一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function CreateXHR() {
    if(window.XMLHttpRequest){
        return new XMLHttpRequest();
    }else{
        return new ActiveXObject('Microsoft.XMLHTTP');
    }
}
var xhr = new CreateXHR();  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">CreateXHR</span></span>() {
    <span class="hljs-keyword">if</span>(window.XMLHttpRequest){
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-type">XMLHttpRequest</span>();
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-type">ActiveXObject</span>(<span class="hljs-string">'Microsoft.XMLHTTP'</span>);
    }
}
<span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> <span class="hljs-type">CreateXHR</span>();  </code></pre>
<h3 id="articleHeader2">Ajax实现</h3>
<h4>1. 实例化XMLHttpRequest</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr = new CreateXHR();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> <span class="hljs-type">CreateXHR</span>();</code></pre>
<h4>2. 连接服务器</h4>
<p>在使用XHR 对象时，必须先调用open()方法，它接受三个参数：要发送的请求类型(get、post)、请求的URL 和表示是否异步，true 为异步，false 为同步。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.open('get', 'xzavier', true); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code style="word-break: break-word; white-space: initial;">xhr.<span class="hljs-keyword">open</span>(<span class="hljs-string">'get'</span>, <span class="hljs-string">'xzavier'</span>, <span class="hljs-literal">true</span>); </code></pre>
<p>open()方法并不会真正发送请求，而只是启动一个请求以备发送。在send()之前，有一个设置自定义请求头部的方法setRequestHeader('key', 'value');放在open 方法之后，send 方法之前。不过，一般在post提交表单时用到：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>xhr.setRequestHeader(<span class="hljs-symbol">'Content</span>-<span class="hljs-keyword">Type</span>', <span class="hljs-symbol">'application</span>/x-www-form-urlencoded');
</code></pre>
<h4>3. 发送请求</h4>
<p>当open()方法准备好之后，通过send()方法进行发送请求，send()方法接受一个参数，作为请求主体发送的数据。如果不需要则，必须填null。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.send(null); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code style="word-break: break-word; white-space: initial;">xhr.<span class="hljs-built_in">send</span>(<span class="hljs-literal">null</span>)<span class="hljs-comment">; </span></code></pre>
<p>执行send()方法之后，请求就会发送到服务器上。</p>
<h4>4. 接收响应</h4>
<p>当请求发送到服务器端，收到响应后，响应的数据会自动填充XHR 对象的属性。一共有四个属性，常用前面三个：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    属性                       说明
responseText    作为响应主体被返回的文本
status          响应的HTTP 状态
statusText      HTTP 状态的说明
responseXML     如果响应主体内容类型是&quot;text/xml&quot;或&quot;application/xml&quot;，则返回包含响应数据的XML DOM 文档" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>    属性                       说明
responseText    作为响应主体被返回的文本
status          响应的HTTP 状态
statusText      HTTP 状态的说明
responseXML     如果响应主体内容类型是<span class="hljs-string">"text/xml"</span>或<span class="hljs-string">"application/xml"</span>，则返回包含响应数据的<span class="hljs-keyword">XML</span> <span class="hljs-title">DOM</span> 文档</code></pre>
<p>接受响应之后，第一步检查status 属性，以确定响应已经成功返回。一般而已HTTP状态代码为200作为成功的标志。HTTP状态代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="HTTP      状态码                  说明
200   OK                    服务器成功返回
400   Bad Request           语法错误导致服务器无法识别
404   Not found             URL不存在
500   Internal Server Error 服务器遇到意外错误无法完成请求
503   ServiceUnavailable    服务器过载导致无法完成请求" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>HTTP      状态码                  说明
<span class="hljs-number">200</span>   OK                    服务器成功返回
<span class="hljs-number">400</span>   Bad Request           语法错误导致服务器无法识别
<span class="hljs-number">404</span>   Not found             URL不存在
<span class="hljs-number">500</span>   Internal Server Error 服务器遇到意外错误无法完成请求
<span class="hljs-number">503</span>   ServiceUnavailable    服务器过载导致无法完成请求</code></pre>
<p>列几个比较常用的状态码，详见：<a href="https://segmentfault.com/a/1190000004356398#articleHeader18">状态码</a><br>同步方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var oButton = document.getElementById('myButton');
oButton.onclick = function() {
    var xhr = new createXHR();
    xhr.open('get', 'xzavier', false); //false同步
    xhr.send(null);
    if (xhr.status == 200) { 
        console.log(xhr.responseText); 
    } else {
        console.log('error status:' + xhr.status + 'info:' + xhr.statusText);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> oButton = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'myButton'</span>);
oButton.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> createXHR();
    xhr.open(<span class="hljs-string">'get'</span>, <span class="hljs-string">'xzavier'</span>, <span class="hljs-literal">false</span>); <span class="hljs-comment">//false同步</span>
    xhr.send(<span class="hljs-literal">null</span>);
    <span class="hljs-keyword">if</span> (xhr.status == <span class="hljs-number">200</span>) { 
        <span class="hljs-built_in">console</span>.log(xhr.responseText); 
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'error status:'</span> + xhr.status + <span class="hljs-string">'info:'</span> + xhr.statusText);
    }
}</code></pre>
<p>同步只是这项技术的一种使用方式，但是很少用，使用异步调用才是常用的。使用异步调用的时候，需要触发readystatechange事件，然后检测readyState属性，属性值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="属性值    状态         说明
  0     未初始化    未调用open()方法
  1     启动       已经调用open()方法，未调用send()方法
  2     发送       已经调用send()方法，未接受响应
  3     接受       已经接受到部分响应数据
  4     完成       已经接受到全部响应数据" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>属性值    状态         说明
  <span class="hljs-number">0</span>     未初始化    未调用open()方法
  <span class="hljs-number">1</span>     启动       已经调用open()方法，未调用send()方法
  <span class="hljs-number">2</span>     发送       已经调用send()方法，未接受响应
  <span class="hljs-number">3</span>     接受       已经接受到部分响应数据
  <span class="hljs-number">4</span>     完成       已经接受到全部响应数据</code></pre>
<p>异步方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var oButton = document.getElementById('myButton');
oButton.onclick = function() {
    var xhr = new createXHR();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                alert(xhr.responseText);
            } else {
                console.log('error status:' + xhr.status + 'info:' + xhr.statusText);
            }
        }
    }
    xhr.open('get', '/xzavier', true); //true同步
    xhr.send(null);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> oButton = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'myButton'</span>);
oButton.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> createXHR();
    xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (xhr.readyState == <span class="hljs-number">4</span>) {
            <span class="hljs-keyword">if</span> (xhr.status == <span class="hljs-number">200</span>) {
                alert(xhr.responseText);
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'error status:'</span> + xhr.status + <span class="hljs-string">'info:'</span> + xhr.statusText);
            }
        }
    }
    xhr.open(<span class="hljs-string">'get'</span>, <span class="hljs-string">'/xzavier'</span>, <span class="hljs-literal">true</span>); <span class="hljs-comment">//true同步</span>
    xhr.send(<span class="hljs-literal">null</span>);
}</code></pre>
<p>整个ajax异步可以总结为：</p>
<ol>
<li>创建XMLHttpRequest对象,即创建一个异步调用对象</li>
<li>创建一个新的HTTP请求,并指定该HTTP请求的方法、URL及是否异步</li>
<li>设置响应HTTP请求状态变化的函数</li>
<li>发送HTTP请求</li>
<li>获取异步调用返回的数据</li>
<li>使用JavaScript和DOM实现局部刷新</li>
</ol>
<h3 id="articleHeader3">GET与 POST</h3>
<p>在提供服务器请求的过程中，有两种方式，分别是：GET和POST。<br>GET： 一般用于信息获取，用URL传递参数，对发送信息数量有限制，一般2000个字符<br>POST：一般用于修改服务器上的资源，对所发送的信息没有限制<br>GET： 是通过地址栏来传值<br>POST：是通过提交表单来传值<br>在以下情况中，请使用 POST 请求：</p>
<ol>
<li>无法使用缓存文件（更新服务器上的文件或数据库）</li>
<li>向服务器发送大量数据（POST 没有数据量限制）</li>
<li>发送包含未知字符的用户输入时，POST比 GET更稳定也更可靠</li>
</ol>
<h4>GET</h4>
<p>GET请求是最常见的请求类型，常用于向服务器查询某些信息。必要时，可以将查询字符串参数追加到URL的末尾，以便提交给服务器。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.open('get', 'xzavier?name=' + name + '&amp;sex='+ sex , true);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>xhr.<span class="hljs-keyword">open</span>(<span class="hljs-string">'get'</span>, <span class="hljs-string">'xzavier?name='</span> + name + <span class="hljs-string">'&amp;sex='</span>+ sex , <span class="hljs-literal">true</span>);
</code></pre>
<p>通过URL 后的问号给服务器传递键值对数据，服务器接收到返回响应数据。特殊字符传参产生的问题可以使用encodeURIComponent()进行编码处理，中文字符的返回及传参，可以讲页面保存和设置为utf-8 格式即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.open('get', 'xzavier?name=' + encodeURIComponent(name) + '&amp;sex='+ encodeURIComponent(sex) , true);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;">xhr.open(<span class="hljs-string">'get'</span>, <span class="hljs-string">'xzavier?name='</span> + <span class="hljs-built_in">encodeURIComponent</span>(name) + <span class="hljs-string">'&amp;sex='</span>+ <span class="hljs-built_in">encodeURIComponent</span>(sex) , <span class="hljs-literal">true</span>);</code></pre>
<h4>POST</h4>
<p>POST 请求可以包含非常多的数据，我们在使用表单提交的时候，很多就是使用的POST传输方式。<br>发送POST请求的数据，不会跟在URL后面，而是通过send()方法向服务器提交数据。向服务器发送POST请求由于解析机制的原因，需要进行请求头部的处理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code style="word-break: break-word; white-space: initial;">xhr.setRequestHeader(<span class="hljs-symbol">'Content</span>-<span class="hljs-keyword">Type</span>', <span class="hljs-symbol">'application</span>/x-www-form-urlencoded');</code></pre>
<h3 id="articleHeader4">Ajax封装</h3>
<p>jquery的ajax方法非常好用，不用写很多代码去区别get还是post，异步还是同步。当然了，自己用的话jquery已经很完美了，用着比自己封装的好用多了，当然，全球互联网有大部分都用着jquery插件。这儿就不说jquery的ajax，我们自己来封装一个，封装一个东西也是对基础知识的巩固和提升。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//名值对转换为字符串
function params(data) {
    var arr = [];
    for (var i in data) {
        arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(data[i]));
    }
    return arr.join('&amp;');
}
function ajax(obj) {
    var xhr = createXHR();
    obj.data = params(obj.data);
    if (obj.async === true) {
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                callback();
            }
        };
    }
    if (obj.method === 'get'){
        obj.url += obj.url.indexOf('?') == -1 ? '?' + obj.data : '&amp;' + obj.data;
    }
    xhr.open(obj.method, obj.url, obj.async);
    if (obj.method === 'post') {
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send(obj.data);    
    } else {
        xhr.send(null);
    }
    if (obj.async === false) {
        callback();
    }
    function callback() {
        if (xhr.status == 200) {
            obj.success(xhr.responseText);
        } else {
            console.log('error status:' + xhr.status + 'info:' + xhr.statusText);
        }    
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//名值对转换为字符串</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">params</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-keyword">var</span> arr = [];
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> data) {
        arr.push(<span class="hljs-built_in">encodeURIComponent</span>(i) + <span class="hljs-string">'='</span> + <span class="hljs-built_in">encodeURIComponent</span>(data[i]));
    }
    <span class="hljs-keyword">return</span> arr.join(<span class="hljs-string">'&amp;'</span>);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ajax</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-keyword">var</span> xhr = createXHR();
    obj.data = params(obj.data);
    <span class="hljs-keyword">if</span> (obj.async === <span class="hljs-literal">true</span>) {
        xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">if</span> (xhr.readyState == <span class="hljs-number">4</span>) {
                callback();
            }
        };
    }
    <span class="hljs-keyword">if</span> (obj.method === <span class="hljs-string">'get'</span>){
        obj.url += obj.url.indexOf(<span class="hljs-string">'?'</span>) == <span class="hljs-number">-1</span> ? <span class="hljs-string">'?'</span> + obj.data : <span class="hljs-string">'&amp;'</span> + obj.data;
    }
    xhr.open(obj.method, obj.url, obj.async);
    <span class="hljs-keyword">if</span> (obj.method === <span class="hljs-string">'post'</span>) {
        xhr.setRequestHeader(<span class="hljs-string">'Content-Type'</span>, <span class="hljs-string">'application/x-www-form-urlencoded'</span>);
        xhr.send(obj.data);    
    } <span class="hljs-keyword">else</span> {
        xhr.send(<span class="hljs-literal">null</span>);
    }
    <span class="hljs-keyword">if</span> (obj.async === <span class="hljs-literal">false</span>) {
        callback();
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">callback</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (xhr.status == <span class="hljs-number">200</span>) {
            obj.success(xhr.responseText);
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'error status:'</span> + xhr.status + <span class="hljs-string">'info:'</span> + xhr.statusText);
        }    
    }
}</code></pre>
<p>使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var oButton = document.getElementById('myButton');
oButton.onclick = function() {
    ajax({
        method : 'post',
        url : 'xzavier',
        data : {
            'name' : 'xzavier',
            'sex' : 'man'
        },
        success : function (result) {
            console.log(result);
        },
        async : true
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> oButton = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'myButton'</span>);
oButton.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    ajax({
        <span class="hljs-attr">method</span> : <span class="hljs-string">'post'</span>,
        <span class="hljs-attr">url</span> : <span class="hljs-string">'xzavier'</span>,
        <span class="hljs-attr">data</span> : {
            <span class="hljs-string">'name'</span> : <span class="hljs-string">'xzavier'</span>,
            <span class="hljs-string">'sex'</span> : <span class="hljs-string">'man'</span>
        },
        <span class="hljs-attr">success</span> : <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">result</span>) </span>{
            <span class="hljs-built_in">console</span>.log(result);
        },
        <span class="hljs-attr">async</span> : <span class="hljs-literal">true</span>
    });
}</code></pre>
<p>学习使用，要用于别处需要封装的还有很多。</p>
<h3 id="articleHeader5">后端实现</h3>
<p>可以自学一点后端知识，便于学习。比如php，当然，现在node在前端这么火，怎么能不用呢。这里不多讲node安装、搭建项目等知识了，等之后自己再熟一点再写。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var oButton = document.getElementById('myButton');
var sName = document.getElementById('isName').value;
oButton.onclick = function() {
    ajax({
        method : 'post',
        url : 'isuser',
        data : sName,
        success : function () {
            console.log('useable name');
        },
        async : false
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> oButton = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'myButton'</span>);
<span class="hljs-keyword">var</span> sName = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'isName'</span>).value;
oButton.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    ajax({
        <span class="hljs-attr">method</span> : <span class="hljs-string">'post'</span>,
        <span class="hljs-attr">url</span> : <span class="hljs-string">'isuser'</span>,
        <span class="hljs-attr">data</span> : sName,
        <span class="hljs-attr">success</span> : <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'useable name'</span>);
        },
        <span class="hljs-attr">async</span> : <span class="hljs-literal">false</span>
    });
}</code></pre>
<p>node端：node学习（朴灵的书： 深入浅出nodeJs）<br>//用户注册时判断用户名是否已存在</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.post('/isuser', function(req, res) {
  var username = req.body.username;
  User.isUser(username, function(status){  //查询数据库，牵扯知识点多，不详述    
    if(status == 'OK'){
      res.send(200);          
    }else{
      res.send(404);
    }
  });
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>app.post(<span class="hljs-string">'/isuser'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(req, res)</span> </span>{
  <span class="hljs-keyword">var</span> username = req.body.username;
  User.isUser(username, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(status)</span></span>{  <span class="hljs-comment">//查询数据库，牵扯知识点多，不详述    </span>
    <span class="hljs-keyword">if</span>(status == <span class="hljs-string">'OK'</span>){
      res.send(<span class="hljs-number">200</span>);          
    }<span class="hljs-keyword">else</span>{
      res.send(<span class="hljs-number">404</span>);
    }
  });
});
</code></pre>
<h3 id="articleHeader6">Ajax优缺点</h3>
<p>Ajax带来的好处：<br>1、通过异步模式，实现动态不刷新，提升了用户体验   <br>2、优化了浏览器和服务器之间的传输，减少不必要的数据往返，减少了带宽占用   <br>3、Ajax在客户端运行，承担了一部分本来由服务器承担的工作，减少了大用户量下的服务器负载</p>
<p>Ajax的缺点：<br>1、Ajax不支持浏览器back按钮<br>2、安全问题,Ajax暴露了与服务器交互的细节  <br>3、对搜索引擎的支持比较弱<br>4、破坏了程序的异常机制<br>5、不容易调试<br>虽然优缺点，但是研发人员就是克服并完善技术缺点，发扬技术优点的存在O(∩_∩)O~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
温故js系列（12）-ajax&&优缺点&&node后端

## 原文链接
[https://segmentfault.com/a/1190000006737732](https://segmentfault.com/a/1190000006737732)

