---
title: 'AJAX总结（二），手写AJAX' 
date: 2019-01-28 2:30:09
hidden: true
slug: qmproxiq6s
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p><strong>博主博客：<a href="http://hiztx.top" rel="nofollow noreferrer" target="_blank">Stillwater的博客</a></strong><br><strong>知乎专栏：<a href="https://zhuanlan.zhihu.com/hiztx" rel="nofollow noreferrer" target="_blank">前端汪汪</a></strong><br><strong>本文为作者原创转载请注明出处：</strong><br><a href="http://hiztx.top/2017/01/12/ajax-2/" rel="nofollow noreferrer" target="_blank">http://hiztx.top/2017/01/12/a...</a></p>
<hr>
<blockquote><p>在前端面试的时候经常会有如下情景。AJAX会吗？能不能手写个AJAX？第一个问题可以参见我的另一篇博客，<a href="http://hiztx.top/2017/01/11/ajax-1/" rel="nofollow noreferrer" target="_blank">AJAX总结（一），AJAX概述</a>。这篇博文我们来回答第二个问题，手写AJAX。</p></blockquote>
<hr>
<h1 id="articleHeader1">一、手写AJAX的步骤</h1>
<p>  手写AJAX并没有一个固定的标准的答案，但是AJAX的关键步骤就那么几步，我会先用文字介绍关键步骤，然后给出两个版本的手写AJAX的代码及注释。帮助大家很好地理解和记忆。</p>
<blockquote><ol>
<li><p>创建XMLHttpRequest对象</p></li>
<li><p>指定响应函数</p></li>
<li><p>打开连接（指定请求）</p></li>
<li><p>发送请求</p></li>
<li><p>创建响应函数</p></li>
</ol></blockquote>
<hr>
<p>注：第三步是使用XMLHttpRequest对象的open（）方法，字面意思open是打开的意思，即打开连接。但是准确的说应该是指定Http请求。因为浏览器在使用AJAX技术与服务通信时，发送的是Http请求，那么就要指定Http的请求方法，url等信息。</p>
<h1 id="articleHeader2">二、参考代码（W3C）</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xmlhttp=null;//声明一个变量，用来实例化XMLHttpRequest对象
if (window.XMLHttpRequest)
  {
  xmlhttp=new XMLHttpRequest();// 新版本的浏览器可以直接创建XMLHttpRequest对象
  }
  
else if (window.ActiveXObject)
  {
  xmlhttp=new ActiveXObject(&quot;Microsoft.XMLHTTP&quot;);// IE5或IE6没有XMLHttpRequest对象，而是用的ActiveXObject对象
  }
  
  
if (xmlhttp!=null)
  {
  xmlhttp.onreadystatechange=state_Change;//指定响应函数为state_Change
  xmlhttp.open(&quot;GET&quot;,&quot;/example/xdom/note.xml&quot;,true);//指定请求，这里要访问在/example/xdom路径下的note.xml文件，true代表的使用的是异步请求
  xmlhttp.send(null);//发送请求
  } 
else
  {
  alert(&quot;Your browser does not support XMLHTTP.&quot;);
  }

//创建具体的响应函数state_Change
function state_Change()
{
if (xmlhttp.readyState==4)
  {
  if (xmlhttp.status==200)
    {
    // 这里应该是函数具体的逻辑
    }
  else
    {
    alert(&quot;Problem retrieving XML data&quot;);
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> xmlhttp=<span class="hljs-literal">null</span>;<span class="hljs-comment">//声明一个变量，用来实例化XMLHttpRequest对象</span>
<span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.XMLHttpRequest)
  {
  xmlhttp=<span class="hljs-keyword">new</span> XMLHttpRequest();<span class="hljs-comment">// 新版本的浏览器可以直接创建XMLHttpRequest对象</span>
  }
  
<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.ActiveXObject)
  {
  xmlhttp=<span class="hljs-keyword">new</span> ActiveXObject(<span class="hljs-string">"Microsoft.XMLHTTP"</span>);<span class="hljs-comment">// IE5或IE6没有XMLHttpRequest对象，而是用的ActiveXObject对象</span>
  }
  
  
<span class="hljs-keyword">if</span> (xmlhttp!=<span class="hljs-literal">null</span>)
  {
  xmlhttp.onreadystatechange=state_Change;<span class="hljs-comment">//指定响应函数为state_Change</span>
  xmlhttp.open(<span class="hljs-string">"GET"</span>,<span class="hljs-string">"/example/xdom/note.xml"</span>,<span class="hljs-literal">true</span>);<span class="hljs-comment">//指定请求，这里要访问在/example/xdom路径下的note.xml文件，true代表的使用的是异步请求</span>
  xmlhttp.send(<span class="hljs-literal">null</span>);<span class="hljs-comment">//发送请求</span>
  } 
<span class="hljs-keyword">else</span>
  {
  alert(<span class="hljs-string">"Your browser does not support XMLHTTP."</span>);
  }

<span class="hljs-comment">//创建具体的响应函数state_Change</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">state_Change</span>(<span class="hljs-params"></span>)
</span>{
<span class="hljs-keyword">if</span> (xmlhttp.readyState==<span class="hljs-number">4</span>)
  {
  <span class="hljs-keyword">if</span> (xmlhttp.status==<span class="hljs-number">200</span>)
    {
    <span class="hljs-comment">// 这里应该是函数具体的逻辑</span>
    }
  <span class="hljs-keyword">else</span>
    {
    alert(<span class="hljs-string">"Problem retrieving XML data"</span>);
    }
  }
}</code></pre>
<ol>
<li><p>创建XMLHttpRequest对象 （1-10行代码）</p></li>
<li><p>指定响应函数（第15行代码）</p></li>
<li><p>打开连接（指定请求）（第16行代码）</p></li>
<li><p>发送请求（第18行代码）</p></li>
<li><p>创建响应函数（25-38行代码）</p></li>
</ol>
<p>  这个是W3C上讲解AJAX的代码，比较权威，我做了一些注释，方便大家理解。面试的时候写这段代码应该是没有问题的。<br><a href="http://www.w3school.com.cn/xml/xml_http.asp" rel="nofollow noreferrer" target="_blank">W3C原文链接</a></p>
<hr>
<h1 id="articleHeader3">三、参考代码（MDN）</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--html部分，创建一个按钮控件-->
<span id=&quot;ajaxButton&quot; style=&quot;cursor: pointer; text-decoration: underline&quot;>
  Make a request
</span>


<script type=&quot;text/javascript&quot;>
(function() {
  var httpRequest;//声明一个变量，用来实例化XMLHttpRequest对象
  document.getElementById(&quot;ajaxButton&quot;).onclick = function() { makeRequest('test.html'); }; //这里将AJAX操作封装在makeRequest函数中，函数的参数为要请求的url，即根目录下的test.html文件。
 
  function makeRequest(url) {
    httpRequest = new XMLHttpRequest();//创建XMLHttpRequest对象
    if (!httpRequest) {
      alert('Giving up :( Cannot create an XMLHTTP instance');
      return false;
    }
    
    httpRequest.onreadystatechange = alertContents;//指定响应函数为alertContents
    
    httpRequest.open('GET', url); //指定请求，方法为GET，url为上面的test.html
   
    httpRequest.send();//发送请求
    
  }
  
  
//创建响应函数alertContents
  function alertContents() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        alert(httpRequest.responseText);
      } else {
        alert('There was a problem with the request.');
      }
    }
  }
})();//这是一个立即执行函数
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!--html部分，创建一个按钮控件--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"ajaxButton"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"cursor: pointer; text-decoration: underline"</span>&gt;</span>
  Make a request
<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>


<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> httpRequest;<span class="hljs-comment">//声明一个变量，用来实例化XMLHttpRequest对象</span>
  <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"ajaxButton"</span>).onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ makeRequest(<span class="hljs-string">'test.html'</span>); }; <span class="hljs-comment">//这里将AJAX操作封装在makeRequest函数中，函数的参数为要请求的url，即根目录下的test.html文件。</span>
 
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeRequest</span>(<span class="hljs-params">url</span>) </span>{
    httpRequest = <span class="hljs-keyword">new</span> XMLHttpRequest();<span class="hljs-comment">//创建XMLHttpRequest对象</span>
    <span class="hljs-keyword">if</span> (!httpRequest) {
      alert(<span class="hljs-string">'Giving up :( Cannot create an XMLHTTP instance'</span>);
      <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
    
    httpRequest.onreadystatechange = alertContents;<span class="hljs-comment">//指定响应函数为alertContents</span>
    
    httpRequest.open(<span class="hljs-string">'GET'</span>, url); <span class="hljs-comment">//指定请求，方法为GET，url为上面的test.html</span>
   
    httpRequest.send();<span class="hljs-comment">//发送请求</span>
    
  }
  
  
<span class="hljs-comment">//创建响应函数alertContents</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">alertContents</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (httpRequest.readyState === XMLHttpRequest.DONE) {
      <span class="hljs-keyword">if</span> (httpRequest.status === <span class="hljs-number">200</span>) {
        alert(httpRequest.responseText);
      } <span class="hljs-keyword">else</span> {
        alert(<span class="hljs-string">'There was a problem with the request.'</span>);
      }
    }
  }
})();<span class="hljs-comment">//这是一个立即执行函数</span>
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<ol>
<li><p>创建XMLHttpRequest对象 （第13行代码）</p></li>
<li><p>指定响应函数（第19行代码）</p></li>
<li><p>打开连接（指定请求）（第21行代码）</p></li>
<li><p>发送请求（第23行代码）</p></li>
<li><p>创建响应函数（29-37行代码）</p></li>
</ol>
<p>  这个是MDN上讲解AJAX的代码，我做了一些注释，方便大家理解。<br><a href="https://developer.mozilla.org/zh-CN/docs/AJAX/Getting_Started" rel="nofollow noreferrer" target="_blank">MDN原文链接</a></p>
<hr>
<h1 id="articleHeader4">四、总结</h1>
<blockquote><p>这篇文章讲解了如何较为规范的手写AJAX，下篇文章我会具体介绍XMLHttpRequest对象的有关知识以及AJAX相关的Http请求的知识。</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
AJAX总结（二），手写AJAX

## 原文链接
[https://segmentfault.com/a/1190000008097712](https://segmentfault.com/a/1190000008097712)

