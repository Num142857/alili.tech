---
title: '基于Ajax技术的前后端Json数据交互方式实现' 
date: 2018-12-19 2:30:07
hidden: true
slug: 7nkw5dgtxk
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>使用浏览器访问网站是日常生活中必不可少的一件事情，当我们在浏览器地址栏中输入网址后会看到网站的内容，那么这个过程中发生了什么?下面简单介绍下浏览器访问网站过程。</p>
<p>第一步：浏览器向DNS服务器发起DNS请求，DNS服务器解析域名后返回域名对应的网站服务器IP地址<br>第二步：浏览器获取IP地址后向网络服务器发送一个HTTP请求<br>第三步：网络服务器解析浏览器的请求后从数据库获取资源，将生成的html文件封装至HTTP 响应包中，返回至浏览器解析</p>
<p><em>下图抓包显示了访问“www.baidu.com”时，DNS请求和响应、HTTP请求和响应</em><br><span class="img-wrap"><img data-src="/img/bV1yuF?w=1320&amp;h=814" src="https://static.alili.tech/img/bV1yuF?w=1320&amp;h=814" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>第四步：浏览器解析HTTP 响应后，下载html文件，继而根据文件内包含的外部引用文件、图片或者多媒体文件等逐步下载，最终将获取到的全部文件渲染成完整的网站页面。</p>
<p><em>下图显示GET请求到HTML文件后继续请求了多个JS、CSS文件</em><br><span class="img-wrap"><img data-src="/img/bV1yuI?w=1440&amp;h=809" src="https://static.alili.tech/img/bV1yuI?w=1440&amp;h=809" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<hr>
<h2 id="articleHeader1">前端与后端</h2>
<p>浏览器显示的网页即为web前端界面，提供用户与网站进行交互的可视化接口，而web后端服务主要指在服务器中执行的逻辑运算和数据处理，它为前端提供着访问服务。所谓的前后端只是从代码被执行的位置来区分的，前端代码在用户面前被执行，后端代码在遥远的服务器上被执行。但是，无论前端或后端代码，都是存放在服务器上的，只是当浏览器请求的时候，从服务器发送过去而已。</p>
<p><span class="img-wrap"><img data-src="/img/bV1ywX?w=859&amp;h=235" src="https://static.alili.tech/img/bV1ywX?w=859&amp;h=235" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<hr>
<h2 id="articleHeader2">AJAX介绍</h2>
<p>在上述web应用工作的原理中，我们通过HTTP协议访问一个在服务端存在的文件，服务器可以找到该文件并将其内容封装到HTTP请求中，以消息体的形式返回给客户端。不过这种方式只能访问静态的页面，无法与后端数据库进行交互。既然用户需要通过web前端实时与后端数据库进行交互，那么网页也需要动态的更新，如果每次更新一个数据都通过重新获取Html文件的方式来实现势必会导致网络负荷加重，页面加载迟缓。而Ajax技术可以很好的解决这个问题。</p>
<p><span class="img-wrap"><img data-src="/img/bV1ywU?w=536&amp;h=230" src="https://static.alili.tech/img/bV1ywU?w=536&amp;h=230" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>Ajax即异步JavaScript和XML，是一种创建交互式网页的技术，可以不重新加载整个网页的情况下更新部分网页。目前jQuery库提供多个与AJAX相关的方法。通过 jQuery AJAX方法，能够使用HTTP Get和HTTP Post从远程服务器上请求文本、HTML、XML或JSON，同时能够把这些外部数据直接载入网页被选元素中。 </p>
<p><span class="img-wrap"><img data-src="/img/bV1ywR?w=850&amp;h=542" src="https://static.alili.tech/img/bV1ywR?w=850&amp;h=542" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>作为web开发人员广泛采用的JavaScript封装库之一的jQuery库，它可以极大地简化我们的JavaScript编程，缓解浏览器之间不兼容的影响，要知道在不同浏览器中进行web网页的兼容性测试也是一个不小的工作量。我们可以通过一个简单的例子发现jQuery库的优势所在：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$(&quot;p.neat&quot;).addClass(&quot;ohmy&quot;).show(&quot;slow&quot;); 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-variable">$(</span><span class="hljs-string">"p.neat"</span>).addClass(<span class="hljs-string">"ohmy"</span>).show(<span class="hljs-string">"slow"</span>); 
</code></pre>
<p>通过以上简短的代码，开发者可以遍历“neat”类中所有的&lt;p&gt;元素，然后向其增加“ohmy”类，同时以动画效果缓缓显示每一个段落。开发者无需检查客户端浏览器类型，无需编写循环代码，无需编写复杂的动画函数，仅仅通过一行代码就能实现上述效果。jQuery的口号“最少的代码做最多的事情”果真名副其实，它把JavaScript带到了一个更高的层次。</p>
<hr>
<h2 id="articleHeader3">JSON格式介绍</h2>
<p>对于交互的数据格式，这里采用JSON(JavaScript&nbsp;Object Notation)，它是一种轻量级的数据交换格式，采用完全独立于编程语言的文本格式来存储和表示数据。JSON键值的层次结构简洁清晰，易于阅读和编写，使得 JSON 成为理想的数据交换语言。举个例子来理解JSON数据格式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{//JSON键/值对
“'wJsona'”:”kkk”
“'wjsonb'”:”12”
“'wjsonc”:”80”
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs rust"><code>{<span class="hljs-comment">//JSON键/值对</span>
“<span class="hljs-symbol">'wJsona</span>'”:”kkk”
“<span class="hljs-symbol">'wjsonb</span>'”:”<span class="hljs-number">12</span>”
“<span class="hljs-symbol">'wjsonc</span>”:”<span class="hljs-number">80</span>”
}

</code></pre>
<hr>
<h2 id="articleHeader4">代码实现</h2>
<p>下面介绍前端jQuery .ajax()请求JSON数据的方法，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; function useTestFun() {
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; $.ajax({
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; url: &quot;/Usedefine&quot;,//获取数据的URL
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; data:JSON.stringify({
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; 'wJsona':&quot;kkk&quot;,&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; 
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; 'wjsonb':12,
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; 'wjsonc':80,
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }),
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; type: &quot;POST&quot;,//HTTP请求方法
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; dataType:'JSON',//获取数据执行方式
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; success:function(data){
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; if(data.status == 'True'){//传入为JSON对象格式
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; alert('连接成功');
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; else{ 
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; $(&quot;#labletip&quot;).show();
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; },
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; error:function(err){
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; alert('连接失败');
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; });
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">useTestFun</span>(<span class="hljs-params"></span>) </span>{
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; $.ajax({
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span class="hljs-attr">url</span>: <span class="hljs-string">"/Usedefine"</span>,<span class="hljs-comment">//获取数据的URL</span>
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; data:<span class="hljs-built_in">JSON</span>.stringify({
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span class="hljs-string">'wJsona'</span>:<span class="hljs-string">"kkk"</span>,&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; 
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span class="hljs-string">'wjsonb'</span>:<span class="hljs-number">12</span>,
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span class="hljs-string">'wjsonc'</span>:<span class="hljs-number">80</span>,
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }),
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span class="hljs-attr">type</span>: <span class="hljs-string">"POST"</span>,<span class="hljs-comment">//HTTP请求方法</span>
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; dataType:<span class="hljs-string">'JSON'</span>,<span class="hljs-comment">//获取数据执行方式</span>
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; success:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span class="hljs-keyword">if</span>(data.status == <span class="hljs-string">'True'</span>){<span class="hljs-comment">//传入为JSON对象格式</span>
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; alert(<span class="hljs-string">'连接成功'</span>);
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span class="hljs-keyword">else</span>{ 
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; $(<span class="hljs-string">"#labletip"</span>).show();
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; },
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; <span class="hljs-attr">error</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>)</span>{
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; alert(<span class="hljs-string">'连接失败'</span>);
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; });
&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; }
</code></pre>
<p>在数据传输过程中，JSON是以文本，即字符串的形式传递的，而JS操作的是JSON对象，所以JSON对象和JSON字符串之间的相互转换是关键，可以使用JSON.stringify()将JSON对象转化为JSON字符串，使用JSON.parse()将JSON字符串转换为JSON对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="JSON字符串:    var str1 = '{ &quot;name&quot;: &quot;cxh&quot;, &quot;sex&quot;: &quot;man&quot; }'; 
    JSON对象:    var str2 = { &quot;name&quot;: &quot;cxh&quot;, &quot;sex&quot;: &quot;man&quot; };
var obj = str.parseJSON(); //由JSON字符串转换为JSON对象
var obj = JSON.parse(str); //由JSON字符串转换为JSON对象
var last = obj.toJSONString(); //将JSON对象转化为JSON字符
var last = JSON.stringify(obj); //将JSON对象转化为JSON字符
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">JSON</span>字符串:    <span class="hljs-keyword">var</span> str1 = <span class="hljs-string">'{ "name": "cxh", "sex": "man" }'</span>; 
    <span class="hljs-built_in">JSON</span>对象:    <span class="hljs-keyword">var</span> str2 = { <span class="hljs-string">"name"</span>: <span class="hljs-string">"cxh"</span>, <span class="hljs-string">"sex"</span>: <span class="hljs-string">"man"</span> };
<span class="hljs-keyword">var</span> obj = str.parseJSON(); <span class="hljs-comment">//由JSON字符串转换为JSON对象</span>
<span class="hljs-keyword">var</span> obj = <span class="hljs-built_in">JSON</span>.parse(str); <span class="hljs-comment">//由JSON字符串转换为JSON对象</span>
<span class="hljs-keyword">var</span> last = obj.toJSONString(); <span class="hljs-comment">//将JSON对象转化为JSON字符</span>
<span class="hljs-keyword">var</span> last = <span class="hljs-built_in">JSON</span>.stringify(obj); <span class="hljs-comment">//将JSON对象转化为JSON字符</span>
</code></pre>
<p><em>如下所示为HTTP协议中JSON数据的传输格式，后端服务器可使用第三方JSON库来处理JSON数据，返回JSON数据时对HTTP协议的Content-Type字段设置为“application/json”。</em><br><span class="img-wrap"><img data-src="/img/bV1ywB?w=1003&amp;h=696" src="https://static.alili.tech/img/bV1ywB?w=1003&amp;h=696" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
基于Ajax技术的前后端Json数据交互方式实现

## 原文链接
[https://segmentfault.com/a/1190000012725007](https://segmentfault.com/a/1190000012725007)

