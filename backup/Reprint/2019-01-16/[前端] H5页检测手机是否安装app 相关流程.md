---
title: '[前端] H5页检测手机是否安装app 相关流程' 
date: 2019-01-16 2:30:08
hidden: true
slug: 46cn02d9y8g
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>近期公司需要针对分享流程进行优化，其中一点就是<strong>前端H5检测是否安装应用</strong>，来进行不同的判断（下载或直接跳转到app中）。原理很简单：创建一个<strong>iframe</strong>去打开<strong>uri</strong>。如果打开app成功网页进入后台，再切换回来时间会超过2.5s。<strong>利用时间去检测</strong>。下面来看具体实现过程：</blockquote>
<h3 id="articleHeader0">你可能会遇到的问题</h3>
<ul>
<li>什么是uri，获取uri需要哪些帮助？</li>
<li>安卓中应用切换到后台， 计时器仍会不断运行有什么解决方法？</li>
<li>微信中不支持第三方uri,下载应用。怎么解决来完成跳转到自身app。</li>
<li>
<strong>补充</strong> 如果uri跳转的是webview页的话document并没有被隐藏，判断会可能失效</li>
</ul>
<p>都会在文中找到答案。</p>
<h4>uri获取</h4>
<blockquote>这里的uri,指得就是通过 Url scheme 来实现的H5与安卓、苹果应用之间的跳转链接。</blockquote>
<p>我们需要找到客户端的同事，来获取如下格式的链接。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xx://'跳转页面'/'携带参数'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code style="word-break: break-word; white-space: initial;">xx://<span class="hljs-string">'跳转页面'</span>/<span class="hljs-string">'携带参数'</span></code></pre>
<blockquote>这里给大家简单解释下url scheme。<br>url 就是我们平常理解的链接。<br>scheme 是指url链接中的最初位置，就是上边链接中 ‘xx’的位置。<br>详细介绍可以看这里：<a href="https://sspai.com/post/31500" rel="nofollow noreferrer" target="_blank">使用url scheme详解</a>
</blockquote>
<p>用这个链接我们可以跳转到 应用中的某个页面,并可以携带一定的参数。这个是我们实现这个<strong>功能的前提</strong>哟。</p>
<h4>具体实现</h4>
<h5>第一步：通过iframe打开App</h5>
<blockquote>Android平台则各个app厂商差异很大，比如Chrome从25及以后就不再支持通过js触发（非用户点击），所以这里使用iframe src地址等来触发scheme。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //在iframe 中打开APP
    var ifr = document.createElement('iframe');
    ifr.src = openUrl;
    ifr.style.display = 'none';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>    //在iframe 中打开APP
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">ifr</span> = document.createElement('iframe');
    <span class="hljs-built_in">ifr</span>.src = openUrl;
    <span class="hljs-built_in">ifr</span>.<span class="hljs-built_in">style</span>.<span class="hljs-built_in">display</span> = 'none';</code></pre>
<h5>第二步： 判断是否安装某应用</h5>
<blockquote>原理：若通过url scheme 打开app成功，那么当前h5会进入后台，通过计时器会有明显延迟。利用时间来判断。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //检查app是否打开
    function checkOpen(cb){
        var _clickTime = +(new Date());
        function check(elsTime) {
            if ( elsTime > 3000 || document.hidden || document.webkitHidden) {
                cb(1);
            } else {
                cb(0);
            }
        }
        //启动间隔20ms运行的定时器，并检测累计消耗时间是否超过3000ms，超过则结束
        var _count = 0, intHandle;
        intHandle = setInterval(function(){
            _count++;        
            var elsTime = +(new Date()) - _clickTime;
            if (_count>=100 || elsTime > 3000 ) {
                clearInterval(intHandle);
                check(elsTime);
            }
        }, 20);
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-comment">//检查app是否打开</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkOpen</span>(<span class="hljs-params">cb</span>)</span>{
        <span class="hljs-keyword">var</span> _clickTime = +(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>());
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">check</span>(<span class="hljs-params">elsTime</span>) </span>{
            <span class="hljs-keyword">if</span> ( elsTime &gt; <span class="hljs-number">3000</span> || <span class="hljs-built_in">document</span>.hidden || <span class="hljs-built_in">document</span>.webkitHidden) {
                cb(<span class="hljs-number">1</span>);
            } <span class="hljs-keyword">else</span> {
                cb(<span class="hljs-number">0</span>);
            }
        }
        <span class="hljs-comment">//启动间隔20ms运行的定时器，并检测累计消耗时间是否超过3000ms，超过则结束</span>
        <span class="hljs-keyword">var</span> _count = <span class="hljs-number">0</span>, intHandle;
        intHandle = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            _count++;        
            <span class="hljs-keyword">var</span> elsTime = +(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()) - _clickTime;
            <span class="hljs-keyword">if</span> (_count&gt;=<span class="hljs-number">100</span> || elsTime &gt; <span class="hljs-number">3000</span> ) {
                clearInterval(intHandle);
                check(elsTime);
            }
        }, <span class="hljs-number">20</span>);
    }</code></pre>
<h6>注意：</h6>
<ul>
<li>由于安卓手机,页面进入后台，定时器setTimeout仍会不断运行，所以这里使用setInterval,较小间隔时间重复多次。来根据累计时间判断。</li>
<li>cb为回调函数，根据返回0 or 1来判断是否安装。</li>
<li>document.hidden对大于4.4webview支持很好，为页面可见性api。</li>
</ul>
<h5>第三步：微信中实现打开or下载应用效果</h5>
<blockquote>这里使用的是<strong>应用宝微链接</strong>实现。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" if (callback) {
      //客户端检测微信直接跳应用宝链接
      var browser = BrowserInfo();
      //使用微链接
      var encodeUri = encodeURIComponent('你的uri');

      if (browser.isWeixin) {
        window.location.href = '你的微链url&amp;android_schema='+encodeUri;
      
      }else{
        checkOpen(function(opened){
            callback &amp;&amp; callback(opened);
        });
     
      }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">callback</span>) {
      <span class="hljs-comment">//客户端检测微信直接跳应用宝链接</span>
      <span class="hljs-keyword">var</span> browser = BrowserInfo();
      <span class="hljs-comment">//使用微链接</span>
      <span class="hljs-keyword">var</span> encodeUri = encodeURIComponent(<span class="hljs-string">'你的uri'</span>);

      <span class="hljs-keyword">if</span> (browser.isWeixin) {
        window.location.href = <span class="hljs-string">'你的微链url&amp;android_schema='</span>+encodeUri;
      
      }<span class="hljs-keyword">else</span>{
        checkOpen(<span class="hljs-function"><span class="hljs-keyword">function</span></span>(opened){
            <span class="hljs-keyword">callback</span> &amp;&amp; <span class="hljs-keyword">callback</span>(opened);
        });
     
      }
    }</code></pre>
<h6>注意点：</h6>
<ul>
<li>微链接是应用宝提供的，可以在后台获取。</li>
<li>使用微链接<strong>必须</strong>做encodeURIComponent转义。</li>
<li>链接地址在微链接后拼接一个android_schema参数加你的uri。</li>
</ul>
<h5>完整函数</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const openApp = function(openUrl, callback) {
    //检查app是否打开
    function checkOpen(cb){
        var _clickTime = +(new Date());
        function check(elsTime) {
            if ( elsTime > 3000 || document.hidden || document.webkitHidden) {
                cb(1);
            } else {
                cb(0);
            }
        }
        //启动间隔20ms运行的定时器，并检测累计消耗时间是否超过3000ms，超过则结束
        var _count = 0, intHandle;
        intHandle = setInterval(function(){
            _count++;        
            var elsTime = +(new Date()) - _clickTime;
            if (_count>=100 || elsTime > 3000 ) {
                clearInterval(intHandle);
                check(elsTime);
            }
        }, 20);
    }
   
    //在iframe 中打开APP
    var ifr = document.createElement('iframe');
    ifr.src = openUrl;
    ifr.style.display = 'none';

    if (callback) {
      //客户端检测微信直接跳应用宝链接
      var browser = BrowserInfo();
      //使用微链接
      var encodeUri = encodeURIComponent(openUrl);

      if (browser.isWeixin) {
        window.location.href = '你的微链url&amp;android_schema='+encodeUri;
      }else{
        checkOpen(function(opened){
            callback &amp;&amp; callback(opened);
        });
     
      }
    }
    
    document.body.appendChild(ifr);      
    setTimeout(function() {
        document.body.removeChild(ifr);
    }, 2000);  

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> openApp = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">openUrl, callback</span>) </span>{
    <span class="hljs-comment">//检查app是否打开</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">checkOpen</span>(<span class="hljs-params">cb</span>)</span>{
        <span class="hljs-keyword">var</span> _clickTime = +(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>());
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">check</span>(<span class="hljs-params">elsTime</span>) </span>{
            <span class="hljs-keyword">if</span> ( elsTime &gt; <span class="hljs-number">3000</span> || <span class="hljs-built_in">document</span>.hidden || <span class="hljs-built_in">document</span>.webkitHidden) {
                cb(<span class="hljs-number">1</span>);
            } <span class="hljs-keyword">else</span> {
                cb(<span class="hljs-number">0</span>);
            }
        }
        <span class="hljs-comment">//启动间隔20ms运行的定时器，并检测累计消耗时间是否超过3000ms，超过则结束</span>
        <span class="hljs-keyword">var</span> _count = <span class="hljs-number">0</span>, intHandle;
        intHandle = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            _count++;        
            <span class="hljs-keyword">var</span> elsTime = +(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()) - _clickTime;
            <span class="hljs-keyword">if</span> (_count&gt;=<span class="hljs-number">100</span> || elsTime &gt; <span class="hljs-number">3000</span> ) {
                clearInterval(intHandle);
                check(elsTime);
            }
        }, <span class="hljs-number">20</span>);
    }
   
    <span class="hljs-comment">//在iframe 中打开APP</span>
    <span class="hljs-keyword">var</span> ifr = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'iframe'</span>);
    ifr.src = openUrl;
    ifr.style.display = <span class="hljs-string">'none'</span>;

    <span class="hljs-keyword">if</span> (callback) {
      <span class="hljs-comment">//客户端检测微信直接跳应用宝链接</span>
      <span class="hljs-keyword">var</span> browser = BrowserInfo();
      <span class="hljs-comment">//使用微链接</span>
      <span class="hljs-keyword">var</span> encodeUri = <span class="hljs-built_in">encodeURIComponent</span>(openUrl);

      <span class="hljs-keyword">if</span> (browser.isWeixin) {
        <span class="hljs-built_in">window</span>.location.href = <span class="hljs-string">'你的微链url&amp;android_schema='</span>+encodeUri;
      }<span class="hljs-keyword">else</span>{
        checkOpen(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">opened</span>)</span>{
            callback &amp;&amp; callback(opened);
        });
     
      }
    }
    
    <span class="hljs-built_in">document</span>.body.appendChild(ifr);      
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">document</span>.body.removeChild(ifr);
    }, <span class="hljs-number">2000</span>);  

}</code></pre>
<h5>其他</h5>
<h6>函数中调用的BrowserInfo是一个简单的客户端检测。具体如下：</h6>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 客户端检测
 */
export const BrowserInfo = function() {
  var json = {
    userAgent: navigator.userAgent.toLowerCase(),
    isAndroid: Boolean(navigator.userAgent.match(/android/ig)),
    isIphone: Boolean(navigator.userAgent.match(/iphone|ipod/ig)),
    isIpad: Boolean(navigator.userAgent.match(/ipad/ig)),
    isWeixin: Boolean(navigator.userAgent.match(/MicroMessenger/ig)),
  }
  
  return json;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/**
 * 客户端检测
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> BrowserInfo = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> json = {
    <span class="hljs-attr">userAgent</span>: navigator.userAgent.toLowerCase(),
    <span class="hljs-attr">isAndroid</span>: <span class="hljs-built_in">Boolean</span>(navigator.userAgent.match(<span class="hljs-regexp">/android/ig</span>)),
    <span class="hljs-attr">isIphone</span>: <span class="hljs-built_in">Boolean</span>(navigator.userAgent.match(<span class="hljs-regexp">/iphone|ipod/ig</span>)),
    <span class="hljs-attr">isIpad</span>: <span class="hljs-built_in">Boolean</span>(navigator.userAgent.match(<span class="hljs-regexp">/ipad/ig</span>)),
    <span class="hljs-attr">isWeixin</span>: <span class="hljs-built_in">Boolean</span>(navigator.userAgent.match(<span class="hljs-regexp">/MicroMessenger/ig</span>)),
  }
  
  <span class="hljs-keyword">return</span> json;
}</code></pre>
<h6>回调函数的使用</h6>
<blockquote>页面中可以通过传递回调函数，来获取返回值；并通过是否传这个参数来做进入页面检测。</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[前端] H5页检测手机是否安装app 相关流程

## 原文链接
[https://segmentfault.com/a/1190000009123583](https://segmentfault.com/a/1190000009123583)

