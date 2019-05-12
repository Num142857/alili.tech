---
title: 'jsonp 跨域原理分析' 
date: 2019-01-12 2:30:24
hidden: true
slug: 60fx6b4s7hf
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">本篇文章借鉴自 <a href="http://www.cnblogs.com/yunfeifei/p/4138632.html" rel="nofollow noreferrer" target="_blank">博客园文章</a>
</h3>
<h6><a href="https://hugeorange.github.io/2017/06/13/jsonp%E5%8E%9F%E7%90%86/" rel="nofollow noreferrer" target="_blank">原文地址</a></h6>
<blockquote>
<p>AJAX即“Asynchronous Javascript And XML”（异步JavaScript和XML），是指一种创建交互式网页应用的网页开发技术。</p>
<p>AJAX 的出现使得网页可以通过在后台与服务器进行少量数据交换，实现网页的局部刷新。</p>
</blockquote>
<p>但是出于安全的考虑，ajax不允许跨域通信(浏览器同源策略)。<br>如果尝试从不同的域请求数据，就会出现错误（跨域错误）。<br>在实际开发中，往往需要进行跨于请求，这时要怎么办呢？</p>
<h3 id="articleHeader1">关于ajax跨域请求？</h3>
<p>1、Ajax为什么不能跨域？到底是卡在哪个环节了？。 （请求成功了，但客户端浏览器拿不到请求结果）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Ajax其实就是向服务器发送一个GET或POST请求，然后取得服务器响应结果，返回客户端。

理论上这是没有任何问题的，然而普通ajax跨域请求，在服务器端不会有任何问题，只是服务端响应数据返回给浏览器的时候，

浏览器根据响应头的Access-Control-Allow-Origin字段的值来判断是否有权限获取数据，

一般情况下，服务器端如果没有在这个字段做特殊处理的话，跨域是没有权限访问的，所以响应数据被浏览器给拦截了，

所以在ajax回调函数里是获取不到数据的。所以现在ajax跨域的问题可以转化为数据怎么拿回客户端的问题。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>Ajax其实就是向服务器发送一个GET或POST请求，然后取得服务器响应结果，返回客户端。

理论上这是没有任何问题的，然而普通ajax跨域请求，在服务器端不会有任何问题，只是服务端响应数据返回给浏览器的时候，

浏览器根据响应头的<span class="hljs-keyword">Access</span>-Control-Allow-Origin字段的值来判断是否有权限获取数据，

一般情况下，服务器端如果没有在这个字段做特殊处理的话，跨域是没有权限访问的，所以响应数据被浏览器给拦截了，

所以在ajax回调函数里是获取不到数据的。所以现在ajax跨域的问题可以转化为数据怎么拿回客户端的问题。
</code></pre>
<p>2、  html的script标签，img标签，iframe标签，可以请求第三方的资源（不受同源策略影响）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="web页面可以加载放在任意站点的js、css、图片等资源，不会受到&quot;跨域&quot;的影响。

这个时候，我们会想到：既然我们可以调用第三方站点的js,那么如果我们将数据放到第三方站点的js中不就可以将数据带到客户端了吗？
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs x86asm"><code>web页面可以加载放在任意站点的<span class="hljs-keyword">js</span>、css、图片等资源，不会受到<span class="hljs-string">"跨域"</span>的影响。

这个时候，我们会想到：既然我们可以调用第三方站点的<span class="hljs-keyword">js</span>,那么如果我们将数据放到第三方站点的<span class="hljs-keyword">js</span>中不就可以将数据带到客户端了吗？
</code></pre>
<h3 id="articleHeader2">JSONP</h3>
<p>1、什么是JSONP？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="JSONP(JSON with Padding（填充）)是JSON的一种“使用模式”，可用于解决主流浏览器的跨域数据访问的问题。

其核心思想是利用JS标签里面的跨域特性进行跨域数据访问，
在JS标签里面存在的是一个跨域的URL，实际执行的时候通过这个URL获得一段字符串，
这段返回的字符串必须是一个合法的JS调用，通过EVAL这个字符串来完成对获得的数据的处理。

即： <script src='url'></script>

JSONP是一个非官方的协议，它允许在服务器端集成Script tags返回至客户端，
通过javascript callback的形式实现跨域访问（这仅仅是JSONP简单的实现形式）。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>JSONP(<span class="hljs-built_in">JSON</span> <span class="hljs-keyword">with</span> Padding（填充）)是<span class="hljs-built_in">JSON</span>的一种“使用模式”，可用于解决主流浏览器的跨域数据访问的问题。

其核心思想是利用JS标签里面的跨域特性进行跨域数据访问，
在JS标签里面存在的是一个跨域的URL，实际执行的时候通过这个URL获得一段字符串，
这段返回的字符串必须是一个合法的JS调用，通过EVAL这个字符串来完成对获得的数据的处理。

即： &lt;script src=<span class="hljs-string">'url'</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>

JSONP是一个非官方的协议，它允许在服务器端集成Script tags返回至客户端，
通过javascript callback的形式实现跨域访问（这仅仅是JSONP简单的实现形式）。
</code></pre>
<p>2、JSONP的粗糙实现</p>
<p>下面我们通过一个例子来说明一下JSONP是如何实现ajax跨域请求的。</p>
<h4>html 代码</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Title</title>
</head>
<body>
    <div>jsonp</div>
</body>
<script>
    function getremotedata(data) {
        console.log(data);
    }
    var div = document.getElementsByTagName('div');

    div[0].onclick = function(){
        var url = &quot;./getdata.js&quot;;
        var script = document.createElement('script');
        script.setAttribute('src', url);
        document.getElementsByTagName('head')[0].appendChild(script);
    };
</script>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Title<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>jsonp<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getremotedata</span>(<span class="hljs-params">data</span>) </span>{
        <span class="hljs-built_in">console</span>.log(data);
    }
    <span class="hljs-keyword">var</span> div = <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'div'</span>);

    div[<span class="hljs-number">0</span>].onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> url = <span class="hljs-string">"./getdata.js"</span>;
        <span class="hljs-keyword">var</span> script = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'script'</span>);
        script.setAttribute(<span class="hljs-string">'src'</span>, url);
        <span class="hljs-built_in">document</span>.getElementsByTagName(<span class="hljs-string">'head'</span>)[<span class="hljs-number">0</span>].appendChild(script);
    };
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h3 id="articleHeader3">远程的getdata.js</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getremotedata({
    code:0,
    result:'success'
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">getremotedata</span>({
    <span class="hljs-attribute">code</span>:<span class="hljs-number">0</span>,
    result:<span class="hljs-string">'success'</span>
});
</code></pre>
<p>得到的结果：<br><span class="img-wrap"><img data-src="/img/bVPaJO?w=786&amp;h=388" src="https://static.alili.tech/img/bVPaJO?w=786&amp;h=388" alt="动态添加的script标签" title="动态添加的script标签" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVPaKn?w=626&amp;h=196" src="https://static.alili.tech/img/bVPaKn?w=626&amp;h=196" alt="得到结果" title="得到结果" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">jsonp前端及后台php的写法</h3>
<p>html代码还是和上面一样，只要改变 url就可以了<br><code> url= 'localhsot:8080/search.php?callback=getremotedata' </code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="后台 php 代码" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">后台 php 代码</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <?php
    $callback = $_GET['callback'];

    if($callback == 'getremotedata' ){
        echo $_GET['$callback']).'('. json_encode({code:0,msg:&quot;success&quot;}) .')';
    }
    ?>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>    <span class="php"><span class="hljs-meta">&lt;?php</span>
    $callback = $_GET[<span class="hljs-string">'callback'</span>];

    <span class="hljs-keyword">if</span>($callback == <span class="hljs-string">'getremotedata'</span> ){
        <span class="hljs-keyword">echo</span> $_GET[<span class="hljs-string">'$callback'</span>]).<span class="hljs-string">'('</span>. json_encode({code:<span class="hljs-number">0</span>,msg:<span class="hljs-string">"success"</span>}) .<span class="hljs-string">')'</span>;
    }
    <span class="hljs-meta">?&gt;</span></span></code></pre>
<p>看到这里清楚了吧，就是第三方站点生成一个对回调函数的调用，传入查询结果，<br>然后通过 <code>&lt;script&gt;</code> 加载到客户端执行</p>
<p>下图是 jsonp请求的流程图<br><span class="img-wrap"><img data-src="/img/bVPaKF?w=1410&amp;h=562" src="https://static.alili.tech/img/bVPaKF?w=1410&amp;h=562" alt="jsonp请求的流程图" title="jsonp请求的流程图" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5">jquery 封装在 ajax方法 里面的jsonp</h3>
<p>jquery 是如何把 jsonp 封装到ajax里面的？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;>
    function GetAjaxData() {
        $.ajax({
            type: &quot;get&quot;,
            async: false,
            url: &quot;http://localhost:8080/getdata.php&quot;,
            dataType: &quot;jsonp&quot;,
            jsonp: &quot;callback&quot;,//传递给请求处理程序或页面的，标识jsonp回调函数名(一般为:callback)
            jsonpCallback: &quot;GetData&quot;,//callback的function名称
            success: function (data) {
                console.log(data);
            },
            error: function () {
                alert('fail');
            }
        });
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">GetAjaxData</span>(<span class="hljs-params"></span>) </span>{
        $.ajax({
            <span class="hljs-attr">type</span>: <span class="hljs-string">"get"</span>,
            <span class="hljs-attr">async</span>: <span class="hljs-literal">false</span>,
            <span class="hljs-attr">url</span>: <span class="hljs-string">"http://localhost:8080/getdata.php"</span>,
            <span class="hljs-attr">dataType</span>: <span class="hljs-string">"jsonp"</span>,
            <span class="hljs-attr">jsonp</span>: <span class="hljs-string">"callback"</span>,<span class="hljs-comment">//传递给请求处理程序或页面的，标识jsonp回调函数名(一般为:callback)</span>
            jsonpCallback: <span class="hljs-string">"GetData"</span>,<span class="hljs-comment">//callback的function名称</span>
            success: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">data</span>) </span>{
                <span class="hljs-built_in">console</span>.log(data);
            },
            <span class="hljs-attr">error</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
                alert(<span class="hljs-string">'fail'</span>);
            }
        });
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>一般情况下jqury 生成的访问 远程站点的 url<br>默认情况下：（我所在的实际项目中的使用）</p>
<p><code>http://web.k3k.net/haila3/pt/tp/index.php/Home/User/getusergoto/?callback=jQuery191028614189839964865_1497261919344&amp;token=420171c8-031a58667e64&amp;_=1497261919346</code></p>
<p>上述代码请求生成的url（设置 <code>jsonpCallback</code>的值为 <code>GetData</code> ）</p>
<p><code>http://web.k3k.net/haila3/pt/tp/index.php/Home/User/getusergoto/?callback=GetData&amp;token=420171c8-00b8-031a58667e64&amp;_=1497261919346</code></p>
<p>最后 一个 <code>_=1497261919346</code> k v 是为了防止浏览器缓存，而由 jquery 自动增加上的。</p>
<p>所以相当于 在 前端文件中引入了 一个这样的js文件</p>
<p><code>&lt;script src="http://web.k3k.net/haila3/pt/tp/index.php/Home/User/getusergoto/?callback=GetData&amp;token=420171c8-00b8-031a58667e64&amp;_=1497261919346"&gt;&lt;/script&gt;</code></p>
<blockquote><p>这里有2个重要的参数</p></blockquote>
<p><code>jsonp</code>：<br>在一个jsonp请求中重写回调函数的名字。这个值用来替代在"callback=?"这种GET或POST请求中URL参数里的"callback"部分，<br>比如{jsonp:'onJsonPLoad'}会导致将"onJsonPLoad=?"传给服务器。</p>
<p><code>jsonpCallback</code>：<br>为jsonp请求指定一个回调函数名。这个值将用来取代jQuery自动生成的随机函数名。<br>这主要用来让jQuery生成一个独特的函数名，这样管理请求更容易，也能方便地提供回调函数和错误处理。</p>
<p>你也可以在想让浏览器缓存GET请求的时候，指定这个回调函数名。</p>
<p>从jQuery 1.5开始，你也可以使用一个函数作为该参数设置，在这种情况下，该函数的返回值就是jsonpCallback的结果。</p>
<hr>
<blockquote><p>通过一开始 <code>jsonp</code> 原理的分析，可以得出：</p></blockquote>
<p>当我们正常地请求一个JSON数据的时候，服务端返回的是一串JSON类型的数据。<br>而我们使用JSONP模式来请求数据的时候，服务端返回的是一段可执行的JavaScript代码</p>
<p>所以我们可见服务器代码最后一行</p>
<p><code>echo $_GET['$callback']).'('. json_encode({code:0,msg:"success"}) .')';</code></p>
<p>就是执行的<code> getdata</code>，然后把数据通过回调的方式传递过去</p>
<p>OK，就是整个流程就是：</p>
<p>客户端发送一个请求，规定一个可执行的函数名<br>（这里就是jQuery做了封装的处理，自动帮你生成回调函数并把数据取出来供success属性方法来调用,不是传递的一个回调句柄），<br>服务端接受了这个<code> getdata </code>函数名，然后把数据通过实参的形式发送出去</p>
<hr>
<blockquote><p>以上是 jquery 封装的 ajax方法里面的 <code>jsonp</code> 请求，说来说去，自己都好像忘记了普通的 <code>ajax</code>请求</p></blockquote>
<h5>js原生 ajax 请求</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        //1.创建对象
        var ajax = '';

        if(window.XMLHttpRequest){
            ajax = new XMLHttpRequest();    /* 现代浏览器 *／
        }else if(window.ActiveXObject){
            ajax = new ActiveXObject(&quot;Microsoft.XMLHTTP&quot;);  /* 万恶的ie浏览器 *／
        }

        //2.创建请求

        //get请求方法(拼接url参数)
//      var url=&quot;login.php?name=&quot;+name+&quot;&amp;password=&quot;+pass;
//      ajax.open(&quot;GET&quot;,url,true);

        //post请求
        ajax.open(&quot;POST&quot;,&quot;login.php&quot;,true);
        ajax.setRequestHeader(&quot;Content-Type&quot;,&quot;application/x-www-form-urlencoded&quot;);
        var data=&quot;name=&quot;+name+&quot;&amp;password=&quot;+pass;

        //3.发送请求
//      ajax.send();        //get 方式发送请求
        ajax.send(data);    //post 方式发送请求

        //4.捕获请求状态、onreadystatechange表示当前请求状态

        ajax.onreadystatechange=function(){
            //5.判断请求状态
            if(ajax.readyState==4){
                //6.判断请求结果
                if(ajax.status==200){
                    //请求成功将结果 responseText 放入回调函数中
                    succ(ajax.responseText);
                }
            }
        }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code>        //<span class="hljs-number">1</span>.创建对象
        var ajax = '';

        if(window.XMLHttpRequest){
            ajax = new XMLHttpRequest();    /* 现代浏览器 *／
        }else if(window.ActiveXObject){
            ajax = new ActiveXObject(<span class="hljs-string">"Microsoft.XMLHTTP"</span>);  /* 万恶的ie浏览器 *／
        }

        //<span class="hljs-number">2</span>.创建请求

        //get请求方法(拼接url参数)
//      var url=<span class="hljs-string">"login.php?name="</span>+name+<span class="hljs-string">"&amp;password="</span>+pass;
//      ajax.open(<span class="hljs-string">"<span class="hljs-keyword">GET</span>"</span>,url,true);

        //post请求
        ajax.open(<span class="hljs-string">"<span class="hljs-keyword">POST</span>"</span>,<span class="hljs-string">"login.php"</span>,true);
        ajax.setRequestHeader(<span class="hljs-string">"Content-Type"</span>,<span class="hljs-string">"application/x-www-form-urlencoded"</span>);
        var data=<span class="hljs-string">"name="</span>+name+<span class="hljs-string">"&amp;password="</span>+pass;

        //<span class="hljs-number">3</span>.发送请求
//      ajax.send();        //get 方式发送请求
        ajax.send(data);    //post 方式发送请求

        //<span class="hljs-number">4</span>.捕获请求状态、onreadystatechange表示当前请求状态

        ajax.onreadystatechange=function(){
            //<span class="hljs-number">5</span>.判断请求状态
            if(ajax.readyState==<span class="hljs-number">4</span>){
                //<span class="hljs-number">6</span>.判断请求结果
                if(ajax.status==<span class="hljs-number">200</span>){
                    //请求成功将结果 responseText 放入回调函数中
                    succ(ajax.responseText);
                }
            }
        }</code></pre>
<blockquote><p>注意</p></blockquote>
<p>通过检测window对象是否有XMLHttpRequest属性来确定浏览器是否支持标准的XMLHttpRequest。<br>注意，不要根据浏览器的navigator.userAgent来检测浏览器是否支持某个JavaScript特性，一是因为这个字符串本身可以伪造，二是通过IE版本判断JavaScript特性将非常复杂。</p>
<p>当创建了XMLHttpRequest对象后，要先设置onreadystatechange的回调函数。在回调函数中，通常我们只需通过readyState === 4判断请求是否完成，<br>如果已完成，再根据status === 200判断是否是一个成功的响应。</p>
<p>XMLHttpRequest对象的open()方法有3个参数，<br>第一个参数指定是GET还是POST，<br>第二个参数指定URL地址，<br>第三个参数指定是否使用异步，默认是true，所以不用写。</p>
<p>注意，千万不要把第三个参数指定为false，否则浏览器将停止响应，直到AJAX请求完成。<br>如果这个请求耗时10秒，那么10秒内你会发现浏览器处于“假死”状态。</p>
<p>最后调用send()方法才真正发送请求。<br>GET请求不需要参数，<br>POST请求需要把body部分以字符串或者FormData对象传进去。</p>
<h4>jquery实现普通ajax</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot;>
    $(&quot;#btn&quot;).on(&quot;click&quot;,function(){
        var name=$(&quot;#name&quot;).val();
        var pass=$(&quot;#password&quot;).val();

        $.ajax({
            type:&quot;post&quot;,
            url:&quot;login&amp;jq.php&quot;,
            async:true,        //异步简写
            dataType:&quot;json&quot;,   //转化为json类型
            data:{
                name:name,
                password:pass,
            },
            success:function(data){
                console.log(data);
            },
            error:function(data){
                alert(data);
            }
        });
    })
    </script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
    $(<span class="hljs-string">"#btn"</span>).on(<span class="hljs-string">"click"</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> name=$(<span class="hljs-string">"#name"</span>).val();
        <span class="hljs-keyword">var</span> pass=$(<span class="hljs-string">"#password"</span>).val();

        $.ajax({
            <span class="hljs-attr">type</span>:<span class="hljs-string">"post"</span>,
            <span class="hljs-attr">url</span>:<span class="hljs-string">"login&amp;jq.php"</span>,
            <span class="hljs-attr">async</span>:<span class="hljs-literal">true</span>,        <span class="hljs-comment">//异步简写</span>
            dataType:<span class="hljs-string">"json"</span>,   <span class="hljs-comment">//转化为json类型</span>
            data:{
                <span class="hljs-attr">name</span>:name,
                <span class="hljs-attr">password</span>:pass,
            },
            <span class="hljs-attr">success</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
                <span class="hljs-built_in">console</span>.log(data);
            },
            <span class="hljs-attr">error</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>)</span>{
                alert(data);
            }
        });
    })
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>后台 php 代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?php
    include_once &quot;common.php&quot;;
    $name=$_POST[&quot;name&quot;];
    $password=$_POST[&quot;password&quot;];

    $sql=&quot;select*from user where name='$name' and password= '$password'&quot;;

    $result=mysql_query($sql);

    if(mysql_num_rows($result)==1){
        $row = mysql_fetch_assoc($result);
        //只能传一个json
        echo json_encode($row);
    }else{
        //只能用json
        echo '{&quot;msg&quot;:&quot;输入有误&quot;}';
    }

?>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="php"><span class="hljs-meta">&lt;?php</span>
    <span class="hljs-keyword">include_once</span> <span class="hljs-string">"common.php"</span>;
    $name=$_POST[<span class="hljs-string">"name"</span>];
    $password=$_POST[<span class="hljs-string">"password"</span>];

    $sql=<span class="hljs-string">"select*from user where name='$name' and password= '$password'"</span>;

    $result=mysql_query($sql);

    <span class="hljs-keyword">if</span>(mysql_num_rows($result)==<span class="hljs-number">1</span>){
        $row = mysql_fetch_assoc($result);
        <span class="hljs-comment">//只能传一个json</span>
        <span class="hljs-keyword">echo</span> json_encode($row);
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-comment">//只能用json</span>
        <span class="hljs-keyword">echo</span> <span class="hljs-string">'{"msg":"输入有误"}'</span>;
    }

<span class="hljs-meta">?&gt;</span></span></code></pre>
<blockquote><p>当然实现跨域的方法还有很多，html5规范 的 CORS(全称Cross-Origin Resource Sharing)，是HTML5规范定义的如何跨域访问资源。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="了解CORS前，我们先搞明白概念：
Origin表示本域，也就是浏览器当前页面的域。当JavaScript向外域（如sina.com）
发起请求后，浏览器收到响应后，首先检查Access-Control-Allow-Origin是否包含本域，
如果是，则此次跨域请求成功，如果不是，则请求失败，JavaScript将无法获取到响应的任何数据。

假设本域是my.com，外域是sina.com，只要响应头Access-Control-Allow-Origin为http://my.com，或者是*，本次请求就可以成功。

可见，跨域能否成功，取决于对方服务器是否愿意给你设置一个正确的Access-Control-Allow-Origin，决定权始终在对方手中。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>了解CORS前，我们先搞明白概念：
<span class="hljs-keyword">Origin表示本域，也就是浏览器当前页面的域。当JavaScript向外域（如sina.com）
</span>发起请求后，浏览器收到响应后，首先检查Access-Control-Allow-<span class="hljs-keyword">Origin是否包含本域，
</span>如果是，则此次跨域请求成功，如果不是，则请求失败，<span class="hljs-keyword">JavaScript将无法获取到响应的任何数据。
</span>
假设本域是my.com，外域是sina.com，只要响应头Access-Control-Allow-<span class="hljs-keyword">Origin为http://my.com，或者是*，本次请求就可以成功。
</span>
可见，跨域能否成功，取决于对方服务器是否愿意给你设置一个正确的Access-Control-Allow-<span class="hljs-keyword">Origin，决定权始终在对方手中。
</span></code></pre>
<h3 id="articleHeader6">总结</h3>
<p>1、ajax和jsonp这两种技术在调用方式上“看起来”很像，目的也一样，都是请求一个url，然后把服务器返回的数据进行处理，因此jquery和ext等框架都把jsonp作为ajax的一种形式进行了封装；</p>
<p>2、ajax和jsonp其实本质上是不同的东西。ajax的核心是通过XMLHttpRequest获取非本页内容，而jsonp的核心则是通过HTTP来动态添加<code> &lt;script&gt; </code>标签来调用服务器提供的js脚本。</p>
<p>3、其实ajax与jsonp的区别不在于是否跨域，ajax通过服务端代理（CORS）一样可以实现跨域，jsonp本身也不排斥同域的数据的获取。</p>
<p>4、jsonp是一种方式或者说非强制性协议，如同ajax一样，它也不一定非要用json格式来传递数据，如果你愿意，字符串都行，只不过这样不利于用jsonp提供公开服务。</p>
<p>5、jsonp整个过程中，本地站点一直处于主动的地位，主动的发送请求，主动的加载远程js.而第三方站点则处于被动的响应。</p>
<h3 id="articleHeader7">josnp 优缺点分析： <a href="http://www.qdfuns.com/notes/18271/df9ecd8f0ca5e523ae75745a3996c47c.html" rel="nofollow noreferrer" target="_blank">借鉴自w3cfun</a>
</h3>
<h4>优点：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.1它不像XMLHttpRequest对象实现的Ajax请求那样受到同源策略的限制，JSONP可以跨越同源策略；
    
1.2它的兼容性更好，在更加古老的浏览器中都可以运行，不需要XMLHttpRequest或ActiveX的支持；
    
1.3在请求完毕后可以通过调用callback的方式回传结果。
将回调方法的权限给了调用方。这个就相当于将controller层和view层终于分开了。
我提供的jsonp服务只提供纯服务的数据，至于提供服务以 后的页面渲染和后续view操作都由调用者来自己定义就好了。
如果有两个页面需要渲染同一份数据，你们只需要有不同的渲染逻辑就可以了，
逻辑都可以使用同 一个jsonp服务。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>1<span class="hljs-selector-class">.1</span>它不像<span class="hljs-selector-tag">XMLHttpRequest</span>对象实现的<span class="hljs-selector-tag">Ajax</span>请求那样受到同源策略的限制，<span class="hljs-selector-tag">JSONP</span>可以跨越同源策略；
    
1<span class="hljs-selector-class">.2</span>它的兼容性更好，在更加古老的浏览器中都可以运行，不需要<span class="hljs-selector-tag">XMLHttpRequest</span>或<span class="hljs-selector-tag">ActiveX</span>的支持；
    
1<span class="hljs-selector-class">.3</span>在请求完毕后可以通过调用<span class="hljs-selector-tag">callback</span>的方式回传结果。
将回调方法的权限给了调用方。这个就相当于将<span class="hljs-selector-tag">controller</span>层和<span class="hljs-selector-tag">view</span>层终于分开了。
我提供的<span class="hljs-selector-tag">jsonp</span>服务只提供纯服务的数据，至于提供服务以 后的页面渲染和后续<span class="hljs-selector-tag">view</span>操作都由调用者来自己定义就好了。
如果有两个页面需要渲染同一份数据，你们只需要有不同的渲染逻辑就可以了，
逻辑都可以使用同 一个<span class="hljs-selector-tag">jsonp</span>服务。
</code></pre>
<h4>缺点</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="2.1它只支持GET请求而不支持POST等其它类型的HTTP请求

2.2它只支持跨域HTTP请求这种情况，不能解决不同域的两个页面之间如何进行JavaScript调用的问题。

2.3 jsonp在调用失败的时候不会返回各种HTTP状态码。

2.4缺点是安全性。万一假如提供jsonp的服务存在页面注入漏洞，即它返回的javascript的内容被人控制的。
那么结果是什么？所有调用这个 jsonp的网站都会存在漏洞。
于是无法把危险控制在一个域名下…所以在使用jsonp的时候必须要保证使用的jsonp服务必须是安全可信的。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>2<span class="hljs-selector-class">.1</span>它只支持<span class="hljs-selector-tag">GET</span>请求而不支持<span class="hljs-selector-tag">POST</span>等其它类型的<span class="hljs-selector-tag">HTTP</span>请求

2<span class="hljs-selector-class">.2</span>它只支持跨域<span class="hljs-selector-tag">HTTP</span>请求这种情况，不能解决不同域的两个页面之间如何进行<span class="hljs-selector-tag">JavaScript</span>调用的问题。

2<span class="hljs-selector-class">.3</span> <span class="hljs-selector-tag">jsonp</span>在调用失败的时候不会返回各种<span class="hljs-selector-tag">HTTP</span>状态码。

2<span class="hljs-selector-class">.4</span>缺点是安全性。万一假如提供<span class="hljs-selector-tag">jsonp</span>的服务存在页面注入漏洞，即它返回的<span class="hljs-selector-tag">javascript</span>的内容被人控制的。
那么结果是什么？所有调用这个 <span class="hljs-selector-tag">jsonp</span>的网站都会存在漏洞。
于是无法把危险控制在一个域名下…所以在使用<span class="hljs-selector-tag">jsonp</span>的时候必须要保证使用的<span class="hljs-selector-tag">jsonp</span>服务必须是安全可信的。</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
jsonp 跨域原理分析

## 原文链接
[https://segmentfault.com/a/1190000009773724](https://segmentfault.com/a/1190000009773724)

