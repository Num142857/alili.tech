---
title: '条理清晰的Ajax基础讲解' 
date: 2018-12-20 2:30:10
hidden: true
slug: uz3yfopw77q
categories: [reprint]
---

{{< raw >}}

                    
<p>最近一直在搞基础的东西，弄了一个持续更新的github笔记，可以去看看，诚意之作（本来就是写给自己看的……）链接地址：<a href="https://qiqihaobenben.github.io/Front-End-Basics/" rel="nofollow noreferrer" target="_blank">Front-End-Basics</a>  </p>
<p>此篇文章的地址：<a href="https://qiqihaobenben.github.io/Front-End-Basics/JavaScript/utility/data-interaction/ajax" rel="nofollow noreferrer" target="_blank">Ajax基础相关</a>  </p>
<p>基础笔记的github地址：<a href="https://github.com/qiqihaobenben/Front-End-Basics" rel="nofollow noreferrer" target="_blank">https://github.com/qiqihaobenben/Front-End-Basics</a> ,可以watch,也可以star。</p>
<hr>
<h4>正文开始……</h4>
<hr>
<h2 id="articleHeader0">Ajax</h2>
<p><strong>Asynchronous JavaScript and XML : 异步的js和XML，前后端数据交互的一种技术。</strong></p>
<blockquote>Ajax优点</blockquote>
<p>传输获取数据 , 不用跳转页面，在本页面请求服务器，做到实时验证。  <br>减少用户返工率并且优化用户体验。</p>
<h2 id="articleHeader1">方式</h2>
<h3 id="articleHeader2">GET方式</h3>
<p>把数据放在url中发送，以获取数据为主</p>
<h4>步骤</h4>
<p><strong>1、创建一个ajax对象</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ajax = new XMLHttpRequest();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> ajax = <span class="hljs-keyword">new</span> <span class="hljs-type">XMLHttpRequest</span>();</code></pre>
<p><strong>2、传入请求参数</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//method,url,true    参数
ajax.open('get','php/get.php?user='+encodeURIComponent(value),true);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-comment">//method,url,true    参数</span>
ajax.open(<span class="hljs-string">'get'</span>,<span class="hljs-string">'php/get.php?user='</span>+encodeURIComponent(<span class="hljs-keyword">value</span>),<span class="hljs-literal">true</span>);</code></pre>
<p><strong>3、发送数据</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ajax.send(null);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code style="word-break: break-word; white-space: initial;">ajax.<span class="hljs-built_in">send</span>(<span class="hljs-literal">null</span>)<span class="hljs-comment">;</span></code></pre>
<p>send()方法传入一个参数，即要作为请求主体发送的数据。如果不需要通过请求主体发送数据，则必须传入null，因为这个参数对有些浏览器来说是必需的。</p>
<h4>注意点</h4>
<p>1、用get方式请求，是有长度限制的。因为是通过地址栏的查询信息来请求的。（即get通过url地址传输，post通过浏览器内部传输）  </p>
<p>2、请求信息在地址栏中显示，直接暴露了用户填写的信息，并且访问的数据会被浏览器缓存到历史记录中，所以说不安全。</p>
<p>3、在get拼接数据的时候要用encodeURIComponent来包一下，不然在IE低版本浏览器中使用中文会乱码的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="encodeURIComponent('刘')  转成url
decodeURIComponent('%E5%88%98')  转成中文" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-function"><span class="hljs-title">encodeURIComponent</span><span class="hljs-params">(<span class="hljs-string">'刘'</span>)</span></span>  转成url
<span class="hljs-function"><span class="hljs-title">decodeURIComponent</span><span class="hljs-params">(<span class="hljs-string">'%E5%88%98'</span>)</span></span>  转成中文</code></pre>
<p>4、有缓存问题    解决方法：在url？后面连接一个随机数，时间戳</p>
<h3 id="articleHeader3">POST方式</h3>
<p>数据放在 <code>send()</code> 中发送</p>
<h4>步骤</h4>
<p><strong>1、创建一个ajax对象</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ajax = new XMLHttpRequest();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> ajax = <span class="hljs-keyword">new</span> <span class="hljs-type">XMLHttpRequest</span>();</code></pre>
<p><strong>2、传入请求参数</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ajax.open('post','php/post.php',true);
//method,url,true三个参数的含义
1、提交方式 Form-method 
2、提交地址 Form-action 
3、异步（同步）
异步:非阻塞 前面的代码不会影响后面代码的执行
同步:阻塞 前面的代码会影响后面代码的执行" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code>ajax.open(<span class="hljs-string">'post'</span>,<span class="hljs-string">'php/post.php'</span>,<span class="hljs-keyword">true</span>);
<span class="hljs-comment">//method,url,true三个参数的含义</span>
<span class="hljs-number">1</span>、提交方式 Form-<span class="hljs-function"><span class="hljs-keyword">method</span> 
2、提交地址 <span class="hljs-title">Form</span>-<span class="hljs-title">action</span> 
3、异步（同步）
异步:</span>非阻塞 前面的代码不会影响后面代码的执行
同步:阻塞 前面的代码会影响后面代码的执行</code></pre>
<p><strong>3、设置请求头</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ajax.setRequestHeader('Content-Type','application/x-www-form-urlencoded')

// 要成功的发送请求头部信息，必须在调用open() 方法之后且调用send()方法之前调用setRequestHeader()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">ajax</span><span class="hljs-selector-class">.setRequestHeader</span>(<span class="hljs-string">'Content-Type'</span>,<span class="hljs-string">'application/x-www-form-urlencoded'</span>)

<span class="hljs-comment">// 要成功的发送请求头部信息，必须在调用open() 方法之后且调用send()方法之前调用setRequestHeader()</span></code></pre>
<p><strong>4、发送数据</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ajax.send('user=cfangxu')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code style="word-break: break-word; white-space: initial;">ajax.<span class="hljs-built_in">send</span>(<span class="hljs-string">'user=cfangxu'</span>)</code></pre>
<h4>注意点</h4>
<ol>
<li>用post方式请求，理论上来说是没有长度或体积限制的，看具体浏览器和后端的设置。</li>
<li>数据是通过http正文（请求体-请求正文）进行发送的，不会直接的暴露用户的信息，并且发送的数据不会被浏览器缓存，相对来说是比较安全的。</li>
<li>在send()的前面需要设置一个请求头（不设置要出错）。</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="post提交的数据格式有多种

    text/plain
    application/x-www-form-urlencoded - 默认
    multipart/form-data" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>post提交的数据格式有多种

    text/plain
    application/x-www-<span class="hljs-keyword">form</span>-urlencoded - 默认
    multipart/<span class="hljs-keyword">form</span>-<span class="hljs-keyword">data</span></code></pre>
<p>在post提交数据的时候，需要设置请求头<code>content-type:</code>值可以为上面三中类型之一</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ajax.setRequestHeader( 'Content-Type','application/x-www-form-urlencoded');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code style="word-break: break-word; white-space: initial;">ajax.setRequestHeader( <span class="hljs-symbol">'Content</span>-<span class="hljs-keyword">Type</span><span class="hljs-string">','</span>application/x-www-form-urlencoded');</code></pre>
<ol><li>open的时候，不用像get那样去拼数据，拼接数据是在send中填写。</li></ol>
<h2 id="articleHeader4">接收数据</h2>
<h3 id="articleHeader5">onload 事件</h3>
<p>属于html5的，有兼容性问题</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ajax.onload = function () {
    //打印传输过来的数据
    console.log(ajax.responseText)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>ajax.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//打印传输过来的数据</span>
    <span class="hljs-built_in">console</span>.log(ajax.responseText)
}</code></pre>
<h3 id="articleHeader6">onreadystatechange 事件</h3>
<p>支持IE6，兼容性好。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="其中的readyState属性：请求状态 
0  （未初始化）还没有调用open()方法0是监听不到的
1  启动，open()&nbsp;方法已经被调用。
2  发送，send() 方法已经被调用，但尚未接收到响应。 
3  接收，已经接收到部分相应数据。 
4  完成，已经接收到全部响应数据，而且可以在客户端使用了。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>其中的readyState属性：请求状态 
<span class="hljs-number">0</span>  （未初始化）还没有调用open()方法<span class="hljs-number">0</span>是监听不到的
<span class="hljs-number">1</span>  启动，open()&nbsp;方法已经被调用。
<span class="hljs-number">2</span>  发送，send() 方法已经被调用，但尚未接收到响应。 
<span class="hljs-number">3</span>  接收，已经接收到部分相应数据。 
<span class="hljs-number">4</span>  完成，已经接收到全部响应数据，而且可以在客户端使用了。</code></pre>
<p>readyState : ajax工作状态  <br>onreadystatechange : 当readyState改变的时候触发  <br>status : 服务器状态，http状态码  <br>responseText : 返回以文本形式存放的内容  ajax请求返回的内容就被存放到这个属性下面</p>
<h3 id="articleHeader7">注意</h3>
<ul><li>事件监听最好写在事件发生之前(即.onload（.onreadystatechange）要放在.send之前)，避免没有监听到。</li></ul>
<h2 id="articleHeader8">扩展</h2>
<h3 id="articleHeader9">
<code>XMLHttpRequest</code> 兼容性问题，单纯了解，可以直接略过</h3>
<p><code>new XMLHttpRequest()</code> ie6 及以下不支持，所以需要用到插件  <br><code>new ActiveXObject('MSXML2.XMLHTTP')</code><br> IE中会有三种不同的XHR版本： <code>MSXML2.XMLHTTP</code> 、 <code>MSXML2.XMLHTTP.3.0</code> 、 <code>MSXML2.XMLHTTP.6.0</code> 因为只做了解，这里用最老的那一版</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="兼容写法如下：
var xhr = null;
if (window.XMLHttpRequest) {    
   //直接用XMLHttpRequest是不能做判断的，因为IE6下没有，window.XMLHttpRequest会返回undefined
   xhr = new XMLHttpRequest();
} else {
   xhr = new ActiveXObject('MSXML2.XMLHTTP');
}

也可以用try catch来解决。
try {
   xhr = new XMLHttpRequest();
} catch (e) {
   xhr = new ActiveXObject('MSXML2.XMLHTTP');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>兼容写法如下：
<span class="hljs-keyword">var</span> xhr = <span class="hljs-literal">null</span>;
<span class="hljs-keyword">if</span> (window.XMLHttpRequest) {    
   <span class="hljs-comment">//直接用XMLHttpRequest是不能做判断的，因为IE6下没有，window.XMLHttpRequest会返回undefined</span>
   xhr = <span class="hljs-keyword">new</span> <span class="hljs-type">XMLHttpRequest</span>();
} <span class="hljs-keyword">else</span> {
   xhr = <span class="hljs-keyword">new</span> <span class="hljs-type">ActiveXObject</span>(<span class="hljs-string">'MSXML2.XMLHTTP'</span>);
}

也可以用<span class="hljs-keyword">try</span> <span class="hljs-keyword">catch</span>来解决。
<span class="hljs-keyword">try</span> {
   xhr = <span class="hljs-keyword">new</span> <span class="hljs-type">XMLHttpRequest</span>();
} <span class="hljs-keyword">catch</span> (e) {
   xhr = <span class="hljs-keyword">new</span> <span class="hljs-type">ActiveXObject</span>(<span class="hljs-string">'MSXML2.XMLHTTP'</span>);
}</code></pre>
<h3 id="articleHeader10">表单提交</h3>
<p><strong>form 标签的一些属性</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="action : 数据提交的地址，默认是当前页面

method : 数据提交的方式，默认是get方式
    1.get
    把数据名称和数据值用=连接，如果有多个的话，那么他会把多个数据组合用&amp;进行连接，然后把数据放到url?后面传到指定页面
    2.post
    通过请求头进行请求

enctype : 提交的数据格式，默认application/x-www-form-urlencoded" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code>action : 数据提交的地址，默认是当前页面

<span class="hljs-function"><span class="hljs-keyword">method</span> :</span> 数据提交的方式，默认是get方式
    <span class="hljs-number">1</span>.get
    把数据名称和数据值用=连接，如果有多个的话，那么他会把多个数据组合用&amp;进行连接，然后把数据放到url?后面传到指定页面
    <span class="hljs-number">2</span>.post
    通过请求头进行请求

enctype : 提交的数据格式，默认application/x-www-form-urlencoded</code></pre>
<h3 id="articleHeader11">上传文件</h3>
<p>不管是form还是ajax,上传必须要用post请求方式来传输。如果后端返回的内容有中文编码格式，那么直接输入到页面中就能变成中文了。</p>
<h4>form</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<form action=&quot;post_file.php&quot; method=&quot;post&quot; enctype=&quot;multipart/form-data&quot;>
           <input type=&quot;file&quot; name=&quot;file&quot; id=&quot;f&quot; value=&quot;&quot; />
           <input type=&quot;submit&quot; value=&quot;上传&quot;/>
</form>
action会跳转页面" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>&lt;<span class="hljs-keyword">form</span> action=<span class="hljs-string">"post_file.php"</span> method=<span class="hljs-string">"post"</span> enctype=<span class="hljs-string">"multipart/form-data"</span>&gt;
           &lt;<span class="hljs-keyword">input</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">"file"</span> name=<span class="hljs-string">"file"</span> id=<span class="hljs-string">"f"</span> value=<span class="hljs-string">""</span> /&gt;
           &lt;<span class="hljs-keyword">input</span> <span class="hljs-keyword">type</span>=<span class="hljs-string">"submit"</span> value=<span class="hljs-string">"上传"</span>/&gt;
&lt;/<span class="hljs-keyword">form</span>&gt;
action会跳转页面</code></pre>
<h4>ajax</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ajax = new XMLHttpRequest();

ajax.open('post','post_file.php',true);

//传输类型设置为二进制的格式
ajax.setRequestHeader('Content-Type','multipart/form-data');

//二进制传输在写入send前要用FormData转换
var fromD = new FormData();    

//FormData构造函数中有一个append方法
//在file中，有一个对象：files（详细信息的列表）files[0]里面是files的具体参数；
fromD.append('file',f.files[0]);    

ajax.send(fromD)


ajax的上传方式需要注意以下几点：
1.new FormData()

2.给这个对象append(key,value)
key：跟后端的要求走
value:file元素的files[0];

3.send(这个对象)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs go"><code><span class="hljs-keyword">var</span> ajax = <span class="hljs-built_in">new</span> XMLHttpRequest();

ajax.open(<span class="hljs-string">'post'</span>,<span class="hljs-string">'post_file.php'</span>,<span class="hljs-literal">true</span>);

<span class="hljs-comment">//传输类型设置为二进制的格式</span>
ajax.setRequestHeader(<span class="hljs-string">'Content-Type'</span>,<span class="hljs-string">'multipart/form-data'</span>);

<span class="hljs-comment">//二进制传输在写入send前要用FormData转换</span>
<span class="hljs-keyword">var</span> fromD = <span class="hljs-built_in">new</span> FormData();    

<span class="hljs-comment">//FormData构造函数中有一个append方法</span>
<span class="hljs-comment">//在file中，有一个对象：files（详细信息的列表）files[0]里面是files的具体参数；</span>
fromD.<span class="hljs-built_in">append</span>(<span class="hljs-string">'file'</span>,f.files[<span class="hljs-number">0</span>]);    

ajax.send(fromD)


ajax的上传方式需要注意以下几点：
<span class="hljs-number">1.</span><span class="hljs-built_in">new</span> FormData()

<span class="hljs-number">2.</span>给这个对象<span class="hljs-built_in">append</span>(key,value)
key：跟后端的要求走
value:file元素的files[<span class="hljs-number">0</span>];

<span class="hljs-number">3.s</span>end(这个对象)</code></pre>
<h2 id="articleHeader12">XMLHttpRequest 2级</h2>
<h3 id="articleHeader13">FormData</h3>
<p>上面的ajax上传文件用到的 <code>FormData</code> 类型就是 <code>XMLHttpRequest 2级</code>中定义的。</p>
<p>FormData 为序列化表单以及创建与表单格式相同的数据(用于XHR传输)提供了便利。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data = new FormData();
data.append('name','cfangxu');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code><span class="hljs-title">var</span> <span class="hljs-class"><span class="hljs-keyword">data</span> = new <span class="hljs-type">FormData</span>();</span>
<span class="hljs-class"><span class="hljs-keyword">data</span>.append('<span class="hljs-title">name'</span>,'<span class="hljs-title">cfangxu'</span>);</span></code></pre>
<p><code>append()</code>方法接收两个参数：键和值，分别对应表单字段的名字和字段中包含的值。可以像上面代码一样添加任意多个值。</p>
<p>FormData 构造函数可以直接传入表单元素，表单元素的数据预先向其中填入键值对。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data = new FormData(document.forms[0]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> data = <span class="hljs-keyword">new</span> FormData(<span class="hljs-built_in">document</span>.forms[<span class="hljs-number">0</span>]);</code></pre>
<p>FormData的另一个方便之处在于用其发送POST请求可以不必明确地在XHR对象上设置请求头部，XHR对象能够识别传入的数据类型是FormData的实例，并配置适当的头部信息。</p>
<h3 id="articleHeader14">overrideMimeType() 方法</h3>
<p>重写XHR响应的MIME类型，比如服务器返回的MIME类型是 <code>text/plain</code>，但是数据中实际包含的是XML。根据MIME类型，即使数据是XML， responseXML属性中仍然是null，通过调用 <code>overrideMimeType()</code>方法，可以保证把响应当做XML而并非文本来处理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr = new XMLHttpRequest();
xhr.open('get','text.php',true);
xhr.overrideMimeType('text/xml');
xhr.send(null);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> <span class="hljs-type">XMLHttpRequest</span>();
xhr.open(<span class="hljs-string">'get'</span>,<span class="hljs-string">'text.php'</span>,<span class="hljs-literal">true</span>);
xhr.overrideMimeType(<span class="hljs-string">'text/xml'</span>);
xhr.send(<span class="hljs-literal">null</span>);</code></pre>
<h3 id="articleHeader15">load 事件</h3>
<p>上面提到过，用load事件替代readystatechange,响应接收完毕后会触发load事件，所以也就没有必要去检查readyState属性了，不过只要浏览器接收到服务器的响应，不管状态如何，都会触发load事件。所以必须要检查status属性，才能确定数据是否真的是可用的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr = new XMLHttpRequest();
xhr.onload = function () {
    if(xhr.status >= 200 &amp;&amp; xhr.status < 300) {
        console.log(xhr.responseText);
    }else {
        console.log('Request is unsuccessful' + xhr.status)
    }
}
xhr.open('get','test.php',true);
xhr.send(null);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
xhr.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span>(xhr.status &gt;= <span class="hljs-number">200</span> &amp;&amp; xhr.status &lt; <span class="hljs-number">300</span>) {
        <span class="hljs-built_in">console</span>.log(xhr.responseText);
    }<span class="hljs-keyword">else</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Request is unsuccessful'</span> + xhr.status)
    }
}
xhr.open(<span class="hljs-string">'get'</span>,<span class="hljs-string">'test.php'</span>,<span class="hljs-literal">true</span>);
xhr.send(<span class="hljs-literal">null</span>);</code></pre>
<h3 id="articleHeader16">progress 事件</h3>
<p>这个事件会在浏览器接收新数据期间周期性地触发。事件监听函数会接收到一个event对象，其target属性是XHR对象，但是包含着三个额外的属性：lengthComputable、position和totalSize。</p>
<ul>
<li>lengthComputable: 是一个表示进度信息是否可用的布尔值。</li>
<li>position: 表示已经接收的字节数</li>
<li>totalSize: 表示根据Content-Length响应头部确定的预期字节数。</li>
</ul>
<p>这些信息可以用来展示进度。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr = new XMLHttpRequest();
xhr.onload = function () {
    if(xhr.status >= 200 &amp;&amp; xhr.status < 300) {
        console.log(xhr.responseText);
    }else {
        console.log('Request is unsuccessful' + xhr.status)
    }
}
xhr.onprogress = function (event) {
    var showEle = document.getElementById('status');
    if(event.lengthComputable){
        showEle.innerHTML = '接收' + event.position + 'of' + event.totalSize + '字节';
    }
}
xhr.open('get','test.php',true);
xhr.send(null);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
xhr.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span>(xhr.status &gt;= <span class="hljs-number">200</span> &amp;&amp; xhr.status &lt; <span class="hljs-number">300</span>) {
        <span class="hljs-built_in">console</span>.log(xhr.responseText);
    }<span class="hljs-keyword">else</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Request is unsuccessful'</span> + xhr.status)
    }
}
xhr.onprogress = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">event</span>) </span>{
    <span class="hljs-keyword">var</span> showEle = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'status'</span>);
    <span class="hljs-keyword">if</span>(event.lengthComputable){
        showEle.innerHTML = <span class="hljs-string">'接收'</span> + event.position + <span class="hljs-string">'of'</span> + event.totalSize + <span class="hljs-string">'字节'</span>;
    }
}
xhr.open(<span class="hljs-string">'get'</span>,<span class="hljs-string">'test.php'</span>,<span class="hljs-literal">true</span>);
xhr.send(<span class="hljs-literal">null</span>);</code></pre>
<p>为确保正常执行，必须在调用open()方法之前添加onprogress事件监听函数。</p>
<h2 id="articleHeader17">总结</h2>
<h3 id="articleHeader18">XMLHttpRequest实例的属性</h3>
<p>readyState   <br>responseType  <br>responseText  <br>responseXML  <br>status  <br>statusText  <br>withCredentials</p>
<h3 id="articleHeader19">XMLHttpRequest实例的方法</h3>
<p>abort()  abort方法用来终止已经发出的HTTP请求。  <br>getAllResponseHeaders()  <br>getResponseHeader()  <br>open()  <br>send()  <br>setRequestHeader()  <br>overrideMimeType()</p>
<h3 id="articleHeader20">XMLHttpRequest实例的事件</h3>
<p>readyStateChange事件  <br>progress事件  <br>load事件</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
条理清晰的Ajax基础讲解

## 原文链接
[https://segmentfault.com/a/1190000012630793](https://segmentfault.com/a/1190000012630793)

