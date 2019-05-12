---
title: '同源策略与JS跨域（JSONP , CORS）' 
date: 2019-01-13 2:30:11
hidden: true
slug: pbv1389xpk
categories: [reprint]
---

{{< raw >}}

                    
<p>本文按照政治问答题必备套路分为以下3个部分：</p>
<ol>
<li>为什么要跨域？</li>
<li>跨域是什么？</li>
<li>如何实现跨域？</li>
</ol>
<h1 id="articleHeader0">Section1、为什么要跨域？</h1>
<p>自古以来（1995年起），为了用户的信息安全，浏览器就引入了同源策略。那么同源策略是如何保证用户的信息安全的呢？</p>
<p>栗子1：如果没有同源策略，你打开了你的银行账户页面A，又打开了另一个不相关的页面B，这时候如果B是恶意网站，B可以通过Javascript轻松访问和修改A页面中的内容。</p>
<p>栗子2：现在我们广泛的使用cookie来维护用户的登录状态，而如果没有同源策略，这些cookie信息就会泄露，其他网站就可以冒充这个登录用户。</p>
<p>由此可以看出，同源策略确实是必不可少的，那么它会带来哪些限制呢？</p>
<p>1、Cookie、LocalStorage和IndexDB无法读取。<br>2、DOM无法获得。<br>3、AJAX请求不能发送。</p>
<p>有时候我们需要突破上述限制，就需要用跨域的方法来解决。</p>
<h1 id="articleHeader1">Section2、跨域是什么？</h1>
<p>什么叫做不同的域？比如：</p>
<p><a href="http://www.a.com" rel="nofollow noreferrer" target="_blank">http://www.a.com</a>:8000/a.js<br>协议（http）、域名（www.a.com）、端口（8000）三者中有一个不同就叫不同的域。</p>
<p>跨域就是不同的域间相互访问时使用某些方法来突破上述限制。</p>
<p>【注意：协议或者端口的不同，只能通过后台来解决。】</p>
<h1 id="articleHeader2">Section3、怎么跨域？</h1>
<h2 id="articleHeader3">一、解决Section1中提到的1、2两点限制：</h2>
<p>1.Cookie、LocalStorage和IndexDB无法读取。<br>2.DOM无法获得。</p>
<h3 id="articleHeader4">方法1、通过document.domain跨子域</h3>
<p>【适用范围：（1）两个域只是子域不同；（2）只适用于<b>iframe窗口与父窗口之间</b>互相获取cookie和DOM节点，不能突破LocalStorage和IndexDB的限制。】</p>
<p>当两个不同的域只是子域不同时，可以通过把document.domain设置为他们共同的父域来解决。</p>
<p>栗子：</p>
<p>A: <a href="http://www.example.com/a.html" rel="nofollow noreferrer" target="_blank">http://www.example.com/a.html</a><br>B: <a href="http://example.com/b.html" rel="nofollow noreferrer" target="_blank">http://example.com/b.html</a><br>当A、B想要获取对方的<b>cookie或者DOM节点</b>时，可以设置:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.domain='example.com';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">document</span>.domain=<span class="hljs-string">'example.com'</span>;</code></pre>
<p>来解决。</p>
<p>这时A网页通过脚本设置:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.cookie = &quot;testA=hello&quot;;

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>document.cookie = <span class="hljs-string">"testA=hello"</span><span class="hljs-comment">;</span>

</code></pre>
<p>B网页就可以拿到这个cookie：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var aCookie = document.cookie;

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> aCookie = <span class="hljs-built_in">document</span>.cookie;

</code></pre>
<h3 id="articleHeader5">方法2、通过window.name跨域</h3>
<p>【适用范围：（1）可以是两个完全不同源的域；（2）同一个窗口内：即同一个标签页内先后打开的窗口。】</p>
<p>pre-condition：</p>
<p>window.name属性有个特征：即在一个窗口(window)的生命周期内,窗口载入的所有的页面都是共享一个window.name的，每个页面对window.name都有读写的权限，window.name是持久存在一个窗口载入过的所有页面中的。</p>
<p>基于这个思想，我们可以在某个页面设置好 window.name 的值，然后在本标签页内跳转到另外一个域下的页面。在这个页面中就可以获取到我们刚刚设置的 window.name 了。</p>
<p>结合iframe还有更高级的用法：</p>
<p>父窗口先打开一个与自己不同源的子窗口，在这个子窗口里设置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.name = data;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>window.<span class="hljs-keyword">name</span> = <span class="hljs-keyword">data</span>;
</code></pre>
<p>然后让子窗口跳转到一个与父窗口同域的网址：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="location='http://www.parent.com/a.html';
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">location</span>=<span class="hljs-string">'http://www.parent.com/a.html'</span>;
</code></pre>
<p>这时，因为同域并且同一窗口window.name是不变的，所以父窗口可以获取到子窗口下的window.name。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data = document.getElementById('myFrame').contentWindow.name;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> data = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'myFrame'</span>).contentWindow.name;
</code></pre>
<p>优点：window.name容量很大，可以放置非常长的字符串；缺点：必须监听子窗口window.name属性的变化，影响网页性能。</p>
<h3 id="articleHeader6">方法3、使用HTML5的window.postMessage跨域</h3>
<p>window.postMessage(message,targetOrigin) 方法是html5新引进的特性，可以使用它来向其它的window对象发送消息，无论这个window对象是属于同源或不同源，目前IE8+、FireFox、Chrome、Opera等浏览器都已经支持window.postMessage方法。</p>
<p><b>otherWindow.postMessage(message, targetOrigin);</b></p>
<p><b>otherWindow:</b>接受消息页面的window的引用。可以是页面中iframe的contentWindow属性；window.open的返回值；通过name或下标从window.frames取到的值。<br><b>message:</b>所要发送的数据，string类型。<br><b>targetOrigin:</b>用于限制otherWindow，*表示不做限制。</p>
<h3 id="articleHeader7">栗子1：</h3>
<p>在父页面中嵌入子页面，通过postMessage发送数据。<br>parent.com/index.html中的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<iframe id=&quot;ifr&quot; src=&quot;child.com/index.html&quot;></iframe>
<script type=&quot;text/javascript&quot;>
window.onload = function() {
    var ifr = document.getElementById('ifr');
    var targetOrigin = 'http://child.com'; 
    // 若写成'http://child.com/c/proxy.html'效果一样
    // 若写成'http://c.com'就不会执行postMessage了
    ifr.contentWindow.postMessage('I was there!', targetOrigin);
};
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">iframe</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"ifr"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"child.com/index.html"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">iframe</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
<span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> ifr = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'ifr'</span>);
    <span class="hljs-keyword">var</span> targetOrigin = <span class="hljs-string">'http://child.com'</span>; 
    <span class="hljs-comment">// 若写成'http://child.com/c/proxy.html'效果一样</span>
    <span class="hljs-comment">// 若写成'http://c.com'就不会执行postMessage了</span>
    ifr.contentWindow.postMessage(<span class="hljs-string">'I was there!'</span>, targetOrigin);
};
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p>在子页面中通过message事件监听父页面发送来的消息并显示。<br>child.com/index.html中的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;>
window.addEventListener('message', function(event){
    // 通过origin属性判断消息来源地址
    if (event.origin == 'http://parent.com') {
        alert(event.data);    // 弹出&quot;I was there!&quot;
        alert(event.source);  
        // 对parent.com、index.html中window对象的引用
        // 但由于同源策略，这里event.source不可以访问window对象
    }
}, false);
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
<span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'message'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
    <span class="hljs-comment">// 通过origin属性判断消息来源地址</span>
    <span class="hljs-keyword">if</span> (event.origin == <span class="hljs-string">'http://parent.com'</span>) {
        alert(event.data);    <span class="hljs-comment">// 弹出"I was there!"</span>
        alert(event.source);  
        <span class="hljs-comment">// 对parent.com、index.html中window对象的引用</span>
        <span class="hljs-comment">// 但由于同源策略，这里event.source不可以访问window对象</span>
    }
}, <span class="hljs-literal">false</span>);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<h3 id="articleHeader8">栗子2：</h3>
<p>假设在a.html里嵌套个</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<iframe src=&quot;http://www.child.com/b.html&quot; frameborder=&quot;0&quot;></iframe>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">iframe</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://www.child.com/b.html"</span> <span class="hljs-attr">frameborder</span>=<span class="hljs-string">"0"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">iframe</span>&gt;</span></code></pre>
<p>在这两个页面里互相通信</p>
<p>a.html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.onload = function() {
    window.addEventListener(&quot;message&quot;, function(e) {
        alert(e.data);
    });

    window.frames[0].postMessage(&quot;b data&quot;, &quot;http://www.child.com/b.html&quot;);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">"message"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
        alert(e.data);
    });

    <span class="hljs-built_in">window</span>.frames[<span class="hljs-number">0</span>].postMessage(<span class="hljs-string">"b data"</span>, <span class="hljs-string">"http://www.child.com/b.html"</span>);
}</code></pre>
<p>b.html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.onload = function() {
    window.addEventListener(&quot;message&quot;, function(e) {
        alert(e.data);
    });
    window.parent.postMessage(&quot;a data&quot;, &quot;http://www.parent.com/a.html&quot;);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">"message"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
        alert(e.data);
    });
    <span class="hljs-built_in">window</span>.parent.postMessage(<span class="hljs-string">"a data"</span>, <span class="hljs-string">"http://www.parent.com/a.html"</span>);
}</code></pre>
<p>这样打开a页面，首先监听到了b.html通过postMessage传来的消息，就先弹出 a data，然后a通过postMessage传递消息给子页面b.html，这时会弹出 b data。</p>
<h2 id="articleHeader9">二、解决第3点限制：</h2>
<p>3）AJAX请求不能发送。</p>
<h3 id="articleHeader10">方法4、通过JSONP跨域</h3>
<p>【适用范围：（1）可以是两个完全不同源的域；（2）只支持HTTP请求中的GET方式；（3）老式浏览器全部支持；（4）需要服务端支持】</p>
<p>JSONP(JSON with Padding)是资料格式JSON的一种使用模式，可以让网页从别的网域要资料。</p>
<p>由于浏览器的同源策略，在网页端出现了这个“跨域”的问题，然而我们发现，所有的 src 属性并没有受到相关的限制，比如 img / script 等。</p>
<p>JSONP 的原理就要从 script 说起。script 可以引用其他域的脚本文件，比如这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a.html
...
<script>
    function callback(data) {
        console.log(data.url)
    }
</script>
<script src='b.js'></script>
...

b.js
callback({url: 'http://www.rccoder.net'})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>a.html
...
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">callback</span>(<span class="hljs-params">data</span>) </span>{
        <span class="hljs-built_in">console</span>.log(data.url)
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">'b.js'</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
...

b.js
callback({url: 'http://www.rccoder.net'})</code></pre>
<p>这就类似于JSONP的原理了。</p>
<p>JSONP的基本思想是：先在网页上添加一个script标签，设置这个script标签的src属性用于向服务器请求JSON数据 ，需要注意的是，src属性的查询字符串一定要加一个callback参数，用来指定回调函数的名字 。而这个函数是在资源加载之前就已经在前端定义好的，这个函数接受一个参数并利用这个参数做一些事情。向服务器请求后，服务器会将JSON数据放在一个指定名字的回调函数里作为其参数传回来。这时，因为函数已经在前端定义好了，所以会直接调用。</p>
<p>一个栗子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function addScriptTag(src) {
    var script = document.createElement('script');
    script.setAttribute(&quot;type&quot;,&quot;text/javascript&quot;);
    script.src = src;
    document.body.appendChild(script);
}

window.onload = function () {
    addScriptTag('http://example.com/ip?callback=foo');//请求服务器数据并规定回调函数为foo
}

function foo(data) {
    console.log('Your public IP address is: ' + data.ip);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addScriptTag</span>(<span class="hljs-params">src</span>) </span>{
    <span class="hljs-keyword">var</span> script = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'script'</span>);
    script.setAttribute(<span class="hljs-string">"type"</span>,<span class="hljs-string">"text/javascript"</span>);
    script.src = src;
    <span class="hljs-built_in">document</span>.body.appendChild(script);
}

<span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    addScriptTag(<span class="hljs-string">'http://example.com/ip?callback=foo'</span>);<span class="hljs-comment">//请求服务器数据并规定回调函数为foo</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Your public IP address is: '</span> + data.ip);
};</code></pre>
<p>向服务器example.com请求数据，这时服务器会先生成JSON数据，这里是{"ip": "8.8.8.8"}，然后以JS语法的方式生成一个函数，函数名就是传递上来的callback参数的值，最后将数据放在函数的参数中返回：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="foo({
    &quot;ip&quot;: &quot;8.8.8.8&quot;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>foo({
    <span class="hljs-string">"ip"</span>: <span class="hljs-string">"8.8.8.8"</span>
})<span class="hljs-comment">;</span></code></pre>
<p>客户端解析script标签，执行返回的JS代码，调用函数。</p>
<h3 id="articleHeader11">方法5、通过CORS跨域</h3>
<p>【适用范围：（1）可以是两个完全不同源的域；（2）支持所有类型的HTTP请求；（3）被绝大多数现代浏览器支持，老式浏览器不支持；（4）需要服务端支持】</p>
<p>对于前端开发者来说，跨域的CORS通信与同源的AJAX通信没有差别，代码完全一样。因此，实现CORS通信的关键是服务器。<b>只要服务器实现了CORS接口，就可以跨源通信。</b></p>
<p>浏览器将CORS请求分成两类：简单请求（simple request）和非简单请求（not-so-simple request）。</p>
<p>只要同时满足以下两大条件，就属于简单请求。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="（1) 请求方法是以下三种方法之一：
HEAD
GET
POST
（2）HTTP的头信息不超出以下几种字段：
Accept
Accept-Language
Content-Language
Last-Event-ID
Content-Type：只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>（1) 请求方法是以下三种方法之一：
HEAD
<span class="hljs-built_in">GET</span>
<span class="hljs-keyword">POST</span>
（2）HTTP的头信息不超出以下几种字段：
Accept
Accept-Language
Content-Language
Last-Event-ID
Content-<span class="hljs-keyword">Type</span>：只限于三个值application/x-www-<span class="hljs-keyword">form</span>-urlencoded、multipart/<span class="hljs-keyword">form</span>-data、text/plain
</code></pre>
<p>凡是不同时满足上面两个条件，就属于非简单请求。<br>浏览器对这两种请求的处理，是不一样的。</p>
<h4>简单请求：</h4>
<p>下面是一次跨源AJAX请求，浏览器发现它是简单请求，就会直接在头信息中加一个origin字段：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="GET /cors HTTP/1.1
Origin: http://api.bob.com
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs http"><code><span class="hljs-keyword">GET</span> <span class="hljs-string">/cors</span> HTTP/1.1
<span class="hljs-attribute">Origin</span>: http://api.bob.com
<span class="hljs-attribute">Host</span>: api.alice.com
<span class="hljs-attribute">Accept-Language</span>: en-US
<span class="hljs-attribute">Connection</span>: keep-alive
<span class="hljs-attribute">User-Agent</span>: Mozilla/5.0...</code></pre>
<p>服务器收到这条请求，如果这个origin指定的源在许可范围内，那么服务器返回的头信息中会包含Access-Control-Allow-Origin字段，值与origin的值相同，以及其他几个相关字段：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Credentials: true
Access-Control-Expose-Headers: FooBar" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>Access-Control-Allow-<span class="hljs-string">Origin:</span> <span class="hljs-string">http:</span><span class="hljs-comment">//api.bob.com</span>
Access-Control-Allow-<span class="hljs-string">Credentials:</span> <span class="hljs-literal">true</span>
Access-Control-Expose-<span class="hljs-string">Headers:</span> FooBar</code></pre>
<p><b>Access-Control-Allow-Origin: </b>该字段是必须的。要么与origin相同，要么为*<br><b>Access-Control-Allow-Credentials: </b>该字段可选。设为true表示服务器允许发送cookie<br><b>Access-Control-Expose-Headers: </b>该字段可选。CORS请求时，XMLHttpRequest对象的getResponseHeader()方法只能拿到6个基本字段：Cache-Control、Content-Language、Content-Type、Expires、Last-Modified、Pragma。如果想拿到其他字段，就必须在Access-Control-Expose-Headers里面指定。上面的例子指定，getResponseHeader('FooBar')可以返回FooBar字段的值。</p>
<p>想要发送cookie，这里还有两点需要额外注意：</p>
<p>1）开发者必须在AJAX请求中打开withCredentials属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr = new XMLHttpRequest();
xhr.withCredentials = true;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> xhr = <span class="hljs-keyword">new</span> <span class="hljs-type">XMLHttpRequest</span>();
xhr.withCredentials = <span class="hljs-literal">true</span>;</code></pre>
<p>否则即使服务器允许，客户端也不会发送。</p>
<p>2）Access-Control-Allow-Origin不能设为星号，必须指定明确的、与请求网页一致的域名。同时，Cookie依然遵循同源政策，只有用服务器域名设置的Cookie才会上传，其他域名的Cookie并不会上传，且（跨源）原网页代码中的document.cookie也无法读取服务器域名下的Cookie。</p>
<h4>非简单请求：</h4>
<p>1.预检请求：</p>
<p>非简单请求会在正式通信前加一次预检（preflight）请求。作用是浏览器先询问服务器当前网页所在域名是否在服务器的许可名单中，以及可以使用哪些HTTP方法以及头信息字段。只有得到肯定答复，浏览器才会发送XMLHttpRequest，否则报错。</p>
<p>一个栗子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var url = 'http://api.alice.com/cors';
var xhr = new XMLHttpRequest();
xhr.open('PUT', url, true);
xhr.setRequestHeader('X-Custom-Header', 'value');
xhr.send();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-built_in">var</span> <span class="hljs-built_in">url</span> = <span class="hljs-string">'http://api.alice.com/cors'</span>;
<span class="hljs-built_in">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest();
xhr.open(<span class="hljs-string">'PUT'</span>, <span class="hljs-built_in">url</span>, <span class="hljs-literal">true</span>);
xhr.setRequestHeader(<span class="hljs-string">'X-Custom-Header'</span>, <span class="hljs-string">'value'</span>);
xhr.send();
</code></pre>
<p>HTTP请求方法为PUT，并发送一个自定义头信息"X-Custom-Header"，浏览器发现这是一个非简单请求，就会自动发送一个预检请求，预检请求的HTTP头信息如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="OPTIONS /cors HTTP/1.1
Origin: http://api.bob.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: X-Custom-Header
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/5.0..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code>OPTIONS /cors HTTP/<span class="hljs-number">1.1</span>
Origin: http:<span class="hljs-comment">//api.bob.com</span>
Access-Control-Request-<span class="hljs-function"><span class="hljs-keyword">Method</span>:</span> PUT
Access-Control-Request-Headers: X-Custom-Header
Host: api.alice.com
Accept-Language: en-US
Connection: keep-alive
User-Agent: Mozilla/<span class="hljs-number">5.0</span>...</code></pre>
<p>请求方法是OPTIONS，表示这个请求是用来询问的，头信息中的关键信息有3个：</p>
<p>（1）表示请求来自哪个源</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Origin: http://api.bob.com" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">Origin:</span> <span class="hljs-string">http:</span><span class="hljs-comment">//api.bob.com</span></code></pre>
<p>（2）列出浏览器的CORS请求会用到哪些HTTP方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
Access-Control-Request-Method: PUT
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code>
Access-Control-Request-<span class="hljs-function"><span class="hljs-keyword">Method</span>:</span> PUT
</code></pre>
<p>（3）指定浏览器CORS请求会额外发送的头信息字段</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Access-Control-Request-Headers: X-Custom-Header
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code><span class="hljs-keyword">Access</span>-Control-Request-Headers: X-Custom-Header
</code></pre>
<p>2.预检请求的回应（有两种情况：A允许、B不允许）</p>
<p>A.服务器允许这次跨域请求</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="HTTP/1.1 200 OK
Date: Mon, 01 Dec 2008 01:15:39 GMT
Server: Apache/2.0.61 (Unix)
Access-Control-Allow-Origin: http://api.bob.com
Access-Control-Allow-Methods: GET, POST, PUT
Access-Control-Allow-Headers: X-Custom-Header
Content-Type: text/html; charset=utf-8
Content-Encoding: gzip
Content-Length: 0
Keep-Alive: timeout=2, max=100
Connection: Keep-Alive
Content-Type: text/plain
Access-Control-Allow-Credentials: true
Access-Control-Max-Age: 1728000
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>HTTP/<span class="hljs-number">1.1</span> <span class="hljs-number">200</span> OK
<span class="hljs-string">Date:</span> Mon, <span class="hljs-number">01</span> Dec <span class="hljs-number">2008</span> <span class="hljs-number">01</span>:<span class="hljs-number">15</span>:<span class="hljs-number">39</span> GMT
<span class="hljs-string">Server:</span> Apache/<span class="hljs-number">2.0</span><span class="hljs-number">.61</span> (Unix)
Access-Control-Allow-<span class="hljs-string">Origin:</span> <span class="hljs-string">http:</span><span class="hljs-comment">//api.bob.com</span>
Access-Control-Allow-<span class="hljs-string">Methods:</span> GET, POST, PUT
Access-Control-Allow-<span class="hljs-string">Headers:</span> X-Custom-Header
Content-<span class="hljs-string">Type:</span> text/html; charset=utf<span class="hljs-number">-8</span>
Content-<span class="hljs-string">Encoding:</span> gzip
Content-<span class="hljs-string">Length:</span> <span class="hljs-number">0</span>
Keep-<span class="hljs-string">Alive:</span> timeout=<span class="hljs-number">2</span>, max=<span class="hljs-number">100</span>
<span class="hljs-string">Connection:</span> Keep-Alive
Content-<span class="hljs-string">Type:</span> text/plain
Access-Control-Allow-<span class="hljs-string">Credentials:</span> <span class="hljs-literal">true</span>
Access-Control-Max-<span class="hljs-string">Age:</span> <span class="hljs-number">1728000</span>
</code></pre>
<p>服务器返回中要注意的字段：</p>
<p>（1）服务器同意的跨域请求源：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Access-Control-Allow-Origin: http://api.bob.com" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;">Access-Control-Allow-<span class="hljs-string">Origin:</span> <span class="hljs-string">http:</span><span class="hljs-comment">//api.bob.com</span></code></pre>
<p>（2）服务器支持的所有跨域请求的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" Access-Control-Allow-Methods: GET, POST, PUT   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code style="word-break: break-word; white-space: initial;"> <span class="hljs-keyword">Access</span>-Control-Allow-Methods: GET, POST, PUT   </code></pre>
<p>（3）表明服务器支持的所有头信息字段：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Access-Control-Allow-Headers: X-Custom-Header" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">Access</span>-Control-Allow-Headers: X-Custom-Header</code></pre>
<p>（4）指定本次预检请求的有效期，单位为秒，即允许请求该条回应在有效期之前都不用再发送预检请求：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Access-Control-Max-Age: 1728000
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code><span class="hljs-keyword">Access</span>-Control-<span class="hljs-built_in">Max</span>-Age: <span class="hljs-number">1728000</span>
</code></pre>
<p>B.服务器不允许这次跨域请求<br>即origin指定的源不在许可范围内，服务器会返回一个正常的HTTP回应。但是头信息中没有包含Access-Control-Allow-Origin字段，就知道出错了，从而抛出一个错误，被XMLHttpRequest的onerror回调函数捕获。但是要注意的是，这种HTTP回应的状态码很有可能是200，所以无法通过状态码识别这种错误。</p>
<p>3.正式请求<br>过了预检请求，非简单请求的正式请求就与简单请求一样了。</p>
<h4>参考资料</h4>
<ol>
<li>《Javascript高级程序设计》 P582</li>
<li>《Javascript权威指南》 P668 22.3 跨域消息传递</li>
<li><a href="http://www.ruanyifeng.com/blog/2016/04/same-origin-policy.html" rel="nofollow noreferrer" target="_blank">http://www.ruanyifeng.com/blo...</a></li>
<li><a href="http://www.ruanyifeng.com/blog/2016/04/cors.html" rel="nofollow noreferrer" target="_blank">http://www.ruanyifeng.com/blo...</a></li>
<li><a href="https://segmentfault.com/a/1190000000718840">https://segmentfault.com/a/11...</a></li>
<li><a href="https://segmentfault.com/a/1190000003642057#articleHeader3" target="_blank">https://segmentfault.com/a/11...</a></li>
<li><a href="https://segmentfault.com/a/1190000003882126">https://segmentfault.com/a/11...</a></li>
<li><a href="http://www.cnblogs.com/rainman/archive/2011/02/20/1959325.html#m5" rel="nofollow noreferrer" target="_blank">http://www.cnblogs.com/rainma...</a></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
同源策略与JS跨域（JSONP , CORS）

## 原文链接
[https://segmentfault.com/a/1190000009624849](https://segmentfault.com/a/1190000009624849)

