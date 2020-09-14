---
title: '怎么在网页中打开你的app' 
date: 2019-02-07 2:30:15
hidden: true
slug: pppdxzve0mn
categories: [reprint]
---

{{< raw >}}

                    
<p>先声明一下关于ios中9.0打开方式的文章来自博客：<a href="http://fegirl.com/2016/06/27/IOS9%20%E9%80%9A%E7%94%A8%E9%93%BE%E6%8E%A5%EF%BC%88universal%20link%EF%BC%89/" rel="nofollow noreferrer" target="_blank">IOS9通用链接（universal link）</a></p>
<h2 id="articleHeader0">前言</h2>
<p>对于一个完备的互联网产品而言需要有app端与web端两个不同前端，对于产品而言很多都希望能够将wap页上的用户引向native app上这就要求前端工程师们为网页提供各种入口去打开app，今天我们就聊一聊app的打开方式（有错误的地方还请高手指正）。</p>
<h2 id="articleHeader1">常规打开</h2>
<p>对于app打开而言最常规的打开就是通过url scheme的方式去打开你的app，如下的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="myapp://
myapp://open
myapp://type=1&amp;id=2sdeo223lwe" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-symbol">myapp:</span><span class="hljs-comment">//</span>
<span class="hljs-symbol">myapp:</span><span class="hljs-comment">//open</span>
<span class="hljs-symbol">myapp:</span><span class="hljs-comment">//type=1&amp;id=2sdeo223lwe</span></code></pre>
<p>这些抛出都是以url的方式进行抛出，app捕捉到这些抛出去做相应的处理，本文对app的处理不做详细描述，app开发请自行谷歌百度。对于前端而言抛出的方式也有很多，而最理想的方式是通过iframe的src对其进行链抛出，来！说的在多都没有代码来的清晰，请看下面。</p>
<p>首先我们需要有一个iframe：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//实际上就是新建一个iframe的生成器
var  createIframe=(function(){
  var iframe;
    return function(){
        if(iframe){
            return iframe;
        }else{
            iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            document.body.appendChild(iframe);
            return iframe;      
        }
    }
})()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//实际上就是新建一个iframe的生成器</span>
<span class="hljs-keyword">var</span>  createIframe=(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">var</span> iframe;
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">if</span>(iframe){
            <span class="hljs-keyword">return</span> iframe;
        }<span class="hljs-keyword">else</span>{
            iframe = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'iframe'</span>);
            iframe.style.display = <span class="hljs-string">'none'</span>;
            <span class="hljs-built_in">document</span>.body.appendChild(iframe);
            <span class="hljs-keyword">return</span> iframe;      
        }
    }
})()</code></pre>
<p>之后我们还需要一个url scheme:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//生成一个url scheme,假设我们约定的scheme是myApp://type=1&amp;id=iewo212j32这种形式的

var baseScheme = &quot;myApp://&quot;
var createScheme=function(options){
    var urlScheme=baseScheme;
    for(var item in options){
        urlScheme=urlScheme+item + '=' + encodeURIComponent(options[item]) + &quot;&amp;&quot;;
    }
    urlScheme = urlScheme.substring(0, urlScheme.length - 1);
    return encodeURIComponent(urlScheme);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//生成一个url scheme,假设我们约定的scheme是myApp://type=1&amp;id=iewo212j32这种形式的</span>

<span class="hljs-keyword">var</span> baseScheme = <span class="hljs-string">"myApp://"</span>
<span class="hljs-keyword">var</span> createScheme=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">options</span>)</span>{
    <span class="hljs-keyword">var</span> urlScheme=baseScheme;
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> item <span class="hljs-keyword">in</span> options){
        urlScheme=urlScheme+item + <span class="hljs-string">'='</span> + <span class="hljs-built_in">encodeURIComponent</span>(options[item]) + <span class="hljs-string">"&amp;"</span>;
    }
    urlScheme = urlScheme.substring(<span class="hljs-number">0</span>, urlScheme.length - <span class="hljs-number">1</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">encodeURIComponent</span>(urlScheme);
}</code></pre>
<p>这种scheme形式的其实不是最好的,根据我们踩过的坑，觉得约定为与http协议相近可能更好一些，具体的协议需要前端人员自己去和app端人员约定。</p>
<p>ok万事具备，iframe有了，urlScheme也有了，该去打开app了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var openApp=function(){
    var localUrl=createScheme();
    var openIframe=createIframe();
    if(isIos()){
        //判断是否是ios,具体的判断函数自行百度
        window.location.href = localUrl;
        var loadDateTime = Date.now();
        setTimeout(function () {
            var timeOutDateTime = Date.now();
            if (timeOutDateTime - loadDateTime < 1000) {
                window.location.href = &quot;你的下载页面&quot;;
            }
        }, 25);
    }else if(isAndroid()){
        //判断是否是android，具体的判断函数自行百度
        if (isChrome()) {
            //chrome浏览器用iframe打不开得直接去打开，算一个坑
            window.location.href = localUrl;
        } else {
            //抛出你的scheme
            openIframe.src = localUrl;
        }
        setTimeout(function () {
            window.location.href = &quot;你的下载页面&quot;;
        }, 500);
    }else{
        //主要是给winphone的用户准备的,实际都没测过，现在winphone不好找啊
        openIframe.src = localUrl;
        setTimeout(function () {
            window.location.href = &quot;你的下载页面&quot;;
        }, 500);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> openApp=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> localUrl=createScheme();
    <span class="hljs-keyword">var</span> openIframe=createIframe();
    <span class="hljs-keyword">if</span>(isIos()){
        <span class="hljs-comment">//判断是否是ios,具体的判断函数自行百度</span>
        <span class="hljs-built_in">window</span>.location.href = localUrl;
        <span class="hljs-keyword">var</span> loadDateTime = <span class="hljs-built_in">Date</span>.now();
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> timeOutDateTime = <span class="hljs-built_in">Date</span>.now();
            <span class="hljs-keyword">if</span> (timeOutDateTime - loadDateTime &lt; <span class="hljs-number">1000</span>) {
                <span class="hljs-built_in">window</span>.location.href = <span class="hljs-string">"你的下载页面"</span>;
            }
        }, <span class="hljs-number">25</span>);
    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(isAndroid()){
        <span class="hljs-comment">//判断是否是android，具体的判断函数自行百度</span>
        <span class="hljs-keyword">if</span> (isChrome()) {
            <span class="hljs-comment">//chrome浏览器用iframe打不开得直接去打开，算一个坑</span>
            <span class="hljs-built_in">window</span>.location.href = localUrl;
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">//抛出你的scheme</span>
            openIframe.src = localUrl;
        }
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">window</span>.location.href = <span class="hljs-string">"你的下载页面"</span>;
        }, <span class="hljs-number">500</span>);
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-comment">//主要是给winphone的用户准备的,实际都没测过，现在winphone不好找啊</span>
        openIframe.src = localUrl;
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">window</span>.location.href = <span class="hljs-string">"你的下载页面"</span>;
        }, <span class="hljs-number">500</span>);
    }
}</code></pre>
<p>以上就是你要打开scheme的主要代码了，好吧，实际上不只是打开app，还要实现未打开的时候跳到下载页去。其中安卓实际上无论有没有打开都会跳到下载页去，而ios........好吧!按照网上的说法是浏览器失焦后会挂起脚本，呵呵，这是多老的ios版本的表现了，实际上现在的ios已经没有这么做，有些版本会跟安卓的表现一样，而有些则是直接跳转根本不会去打开，还有打开的时候那个恶心的系统弹窗是什么鬼。好吧，实际上至此你会发现，ios9.0以上的有些打不开直接跳，有些打得开还会有允许弹窗，而微信则是无论如何都打不开，实际上微信会在他的浏览器里拦截掉所有未经其允许的scheme包括app store，那么接下来我们要解决这些问题。</p>
<h2 id="articleHeader2">通用链接</h2>
<p>针对ios9及以上的打不开问题，实际上ios9提供了更好的解决方案————通用链接。</p>
<p>什么是Universal Links(通用链接)?</p>
<p>这是iOS9推出的一项功能，如果你的应用支持Universal Links(通用链接)，那么就能够方便的通过传统的HTTP链接来启动APP(如果iOS设备上已经安装了你的app，不需要额外做任何判断等)，或者打开网页(iOS设备上没有安装你的app)。或许可以更简单点来说明，在iOS9之前，对于从各种从浏览器，Safari、UIWebView或者 WKWebView中唤醒APP的需求，我们通常只能使用scheme。</p>
<p>以上来自网上关于通用链接的介绍，对于前端简单点讲就是你访问一个http的url，如果这个url带有你提交给开发平台的配置文件中匹配规则的内容，ios系统会去尝试打开你的app，如果打不开，系统就会在浏览器中转向你要访问的链接。很好的一个属性，因为通过这个属性在ios9上我们能够绕过微信的拦截从而打开app。</p>
<p>以下是ios开发人员要做的百度搜索结果第一条<a href="http://www.jianshu.com/p/c2ca5b5f391f" rel="nofollow noreferrer" target="_blank">ios中实现通用链接</a>：</p>
<p>而我们要做的真的很简单，实际上我们只需要抛出链接就好了（实际上博主只是来骗经验的）。在此之前请准备好与主站不同的域名，比如主站www.xxxx.com，你们可以准备好open.xxxx.com的域名作为重定向用。好吧！实际上通用链接有一个很坑的属性，必须是异域打开，而且如果你提交的是你主站的链接，你打开你的主站你会发现网站上方会挂着一个难看的灰条转向appstore中你们的app，没错，就是ios系统干的这个事，具体的其他注意事项可以参考这篇文章<a href="http://fegirl.com/2016/06/27/IOS9%20%E9%80%9A%E7%94%A8%E9%93%BE%E6%8E%A5%EF%BC%88universal%20link%EF%BC%89/" rel="nofollow noreferrer" target="_blank">IOS9通用链接（universal link）</a>。</p>
<p>那么接下来我们的代码得做好更改</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//增加通用链接的生成,
var baseScheme = &quot;myApp://&quot;,
    baseLink=&quot;http://m.xxxx.com?&quot;;
var createScheme=function(options,isLink){
    var urlScheme=isLink?baseLink:baseScheme;
    for(var item in options){
        urlScheme=urlScheme+item + '=' + encodeURIComponent(options[item]) + &quot;&amp;&quot;;
    }
    urlScheme = urlScheme.substring(0, urlScheme.length - 1);
    return isLink?urlScheme:encodeURIComponent(urlScheme);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//增加通用链接的生成,</span>
<span class="hljs-keyword">var</span> baseScheme = <span class="hljs-string">"myApp://"</span>,
    baseLink=<span class="hljs-string">"http://m.xxxx.com?"</span>;
<span class="hljs-keyword">var</span> createScheme=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">options,isLink</span>)</span>{
    <span class="hljs-keyword">var</span> urlScheme=isLink?baseLink:baseScheme;
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> item <span class="hljs-keyword">in</span> options){
        urlScheme=urlScheme+item + <span class="hljs-string">'='</span> + <span class="hljs-built_in">encodeURIComponent</span>(options[item]) + <span class="hljs-string">"&amp;"</span>;
    }
    urlScheme = urlScheme.substring(<span class="hljs-number">0</span>, urlScheme.length - <span class="hljs-number">1</span>);
    <span class="hljs-keyword">return</span> isLink?urlScheme:<span class="hljs-built_in">encodeURIComponent</span>(urlScheme);
}</code></pre>
<p>然后对抛出做</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var openApp=function(){
    //生成你的scheme你也可以选择外部传入
    var localUrl=createScheme({type:1,id:&quot;sdsdewe2122&quot;});
    var openIframe=createIframe();
    if(isIos()){
        //判断是否是ios,具体的判断函数自行百度
        if(isGreaterThan9()){
            //判断是否为ios9以上的版本,跟其他判断一样navigator.userAgent判断,ios会有带版本号
            localUrl=createScheme({type:1,id:&quot;sdsdewe2122&quot;},true);//代码还可以优化一下
            location.href = localUrl;//实际上不少产品会选择一开始将链接写入到用户需要点击的a标签里
            return;
        }
        window.location.href = localUrl;
        var loadDateTime = Date.now();
        setTimeout(function () {
            var timeOutDateTime = Date.now();
            if (timeOutDateTime - loadDateTime < 1000) {
                window.location.href = &quot;你的下载页面&quot;;
            }
        }, 25);
    }else if(isAndroid()){
        //判断是否是android，具体的判断函数自行百度
        if (isChrome()) {
            //chrome浏览器用iframe打不开得直接去打开，算一个坑
            window.location.href = localUrl;
        } else {
            //抛出你的scheme
            openIframe.src = localUrl;
        }
        setTimeout(function () {
            window.location.href = &quot;你的下载页面&quot;;
        }, 500);
    }else{
        //主要是给winphone的用户准备的,实际都没测过，现在winphone不好找啊
        openIframe.src = localUrl;
        setTimeout(function () {
            window.location.href = &quot;你的下载页面&quot;;
        }, 500);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> openApp=<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">//生成你的scheme你也可以选择外部传入</span>
    <span class="hljs-keyword">var</span> localUrl=createScheme({<span class="hljs-attr">type</span>:<span class="hljs-number">1</span>,<span class="hljs-attr">id</span>:<span class="hljs-string">"sdsdewe2122"</span>});
    <span class="hljs-keyword">var</span> openIframe=createIframe();
    <span class="hljs-keyword">if</span>(isIos()){
        <span class="hljs-comment">//判断是否是ios,具体的判断函数自行百度</span>
        <span class="hljs-keyword">if</span>(isGreaterThan9()){
            <span class="hljs-comment">//判断是否为ios9以上的版本,跟其他判断一样navigator.userAgent判断,ios会有带版本号</span>
            localUrl=createScheme({<span class="hljs-attr">type</span>:<span class="hljs-number">1</span>,<span class="hljs-attr">id</span>:<span class="hljs-string">"sdsdewe2122"</span>},<span class="hljs-literal">true</span>);<span class="hljs-comment">//代码还可以优化一下</span>
            location.href = localUrl;<span class="hljs-comment">//实际上不少产品会选择一开始将链接写入到用户需要点击的a标签里</span>
            <span class="hljs-keyword">return</span>;
        }
        <span class="hljs-built_in">window</span>.location.href = localUrl;
        <span class="hljs-keyword">var</span> loadDateTime = <span class="hljs-built_in">Date</span>.now();
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> timeOutDateTime = <span class="hljs-built_in">Date</span>.now();
            <span class="hljs-keyword">if</span> (timeOutDateTime - loadDateTime &lt; <span class="hljs-number">1000</span>) {
                <span class="hljs-built_in">window</span>.location.href = <span class="hljs-string">"你的下载页面"</span>;
            }
        }, <span class="hljs-number">25</span>);
    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(isAndroid()){
        <span class="hljs-comment">//判断是否是android，具体的判断函数自行百度</span>
        <span class="hljs-keyword">if</span> (isChrome()) {
            <span class="hljs-comment">//chrome浏览器用iframe打不开得直接去打开，算一个坑</span>
            <span class="hljs-built_in">window</span>.location.href = localUrl;
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">//抛出你的scheme</span>
            openIframe.src = localUrl;
        }
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">window</span>.location.href = <span class="hljs-string">"你的下载页面"</span>;
        }, <span class="hljs-number">500</span>);
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-comment">//主要是给winphone的用户准备的,实际都没测过，现在winphone不好找啊</span>
        openIframe.src = localUrl;
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">window</span>.location.href = <span class="hljs-string">"你的下载页面"</span>;
        }, <span class="hljs-number">500</span>);
    }
}</code></pre>
<p>实际上就只需要更改这么点，最重要的是app端接入通用链接，注意抛出的链接不要跟主站同域即可，之后就是不断的调试，自己去踩坑吧，记得绑定域名，这个对域名具有一定的依赖性。</p>
<h2 id="articleHeader3">微信中打开</h2>
<p>至此只有微信是打不开的，实际上腾讯系的产品都是打不开的，包括qq浏览器。</p>
<p>对于微信中有两种方式：</p>
<ul>
<li><p>一种简单的方式就是弹窗告诉用户让他去浏览器中打开——在技术之外的办法</p></li>
<li><p>还有一种方式就是应用宝</p></li>
</ul>
<p>是的如果是微信就去打开你的app对应的应用宝，应用宝会去检测你的app是否存在有则去打开，但只是去打开。实际上腾讯的应用宝对于开发者在功能上做的比想象中的要强大，你在应用宝的微下载中配置申请你的applink与app store的链接,之后你只要在你的链接参数中带上<code>android_schema="myApp://"</code>就在应用宝中打开app中的特定功能，如果忽略应用宝的页面跟自己scheme打开没有太大区别，具体的操作可以查看应用宝的说明。简而言之，腾讯的产品中都去借助应用宝这个平台去执行你需要的操作。在此就不贴代码了，只要判断浏览器如果是微信或者是qq就去跳你的应用宝链接就行。</p>
<h2 id="articleHeader4">总结</h2>
<p>实际上单纯打开app非常简单，目前无论安卓还是ios都能够很好的支持scheme，当然腾讯系产品除外，实际上百度浏览器也会拦截scheme（我觉得真是奇了葩！！！微信这种尚能理解，一个浏览器居然擅自去拦截scheme）目前对百度浏览器还没有什么很好的办法，可以尝试是否能够通过百度应用市场去解决。如果是希望打开app同时又要打开下载页，那么ios9及以上就得用通用链接去解决，重点就是这个通用链接。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
怎么在网页中打开你的app

## 原文链接
[https://segmentfault.com/a/1190000005967865](https://segmentfault.com/a/1190000005967865)

