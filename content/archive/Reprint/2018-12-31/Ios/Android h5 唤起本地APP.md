---
title: 'Ios/Android h5 唤起本地APP' 
date: 2018-12-31 2:30:29
hidden: true
slug: aaivvl6j0lv
categories: [reprint]
---

{{< raw >}}

                    
<p>纠结两天（浏览器中唤起本地APP），一直找不到解决方案，今天总算基本搞定。</p>
<p>ps：吐槽一下 魔窗那篇文章，为什么就不直接把js代码开源开源，混淆后的代码看得我好恼火</p>
<p>参考文章：<a href="https://segmentfault.com/a/1190000006929722">魔窗解决方案</a>、<a href="https://segmentfault.com/a/1190000006929722" target="_blank">京东解决方案</a></p>
<h1 id="articleHeader0">首先是判断浏览器</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 判断浏览器
var Navigator = navigator.userAgent;
var ifChrome = Navigator.match(/Chrome/i) != null &amp;&amp; Navigator.match(/Version\/\d+\.\d+(\.\d+)?\sChrome\//i) == null ? true : false;
var ifAndroid = (Navigator.match(/(Android);?[\s\/]+([\d.]+)?/)) ? true : false;
var ifiPad = (Navigator.match(/(iPad).*OS\s([\d_]+)/)) ? true : false;
var ifiPhone = (!ifiPad &amp;&amp; Navigator.match(/(iPhone\sOS)\s([\d_]+)/)) ? true : false;
var ifIos = Navigator.match(/iPhone|iPad|iPd/i) ? true : false;
var ifSafari = ifIos &amp;&amp; Navigator.match(/Safari/);
// ios 设备的版本号
var iosVersion = Navigator.match(/OS\s*(\d+)/)
iosVersion = iosVersion ? (iosVersion[1] || 0) : 0;
// 安卓版本号
var androidVersion = Navigator.match(/Android\s*(\d+)/)
androidVersion = androidVersion ? (androidVersion[1] || 0) : 0;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 判断浏览器</span>
<span class="hljs-keyword">var</span> Navigator = navigator.userAgent;
<span class="hljs-keyword">var</span> ifChrome = Navigator.match(<span class="hljs-regexp">/Chrome/i</span>) != <span class="hljs-literal">null</span> &amp;&amp; Navigator.match(<span class="hljs-regexp">/Version\/\d+\.\d+(\.\d+)?\sChrome\//i</span>) == <span class="hljs-literal">null</span> ? <span class="hljs-literal">true</span> : <span class="hljs-literal">false</span>;
<span class="hljs-keyword">var</span> ifAndroid = (Navigator.match(<span class="hljs-regexp">/(Android);?[\s\/]+([\d.]+)?/</span>)) ? <span class="hljs-literal">true</span> : <span class="hljs-literal">false</span>;
<span class="hljs-keyword">var</span> ifiPad = (Navigator.match(<span class="hljs-regexp">/(iPad).*OS\s([\d_]+)/</span>)) ? <span class="hljs-literal">true</span> : <span class="hljs-literal">false</span>;
<span class="hljs-keyword">var</span> ifiPhone = (!ifiPad &amp;&amp; Navigator.match(<span class="hljs-regexp">/(iPhone\sOS)\s([\d_]+)/</span>)) ? <span class="hljs-literal">true</span> : <span class="hljs-literal">false</span>;
<span class="hljs-keyword">var</span> ifIos = Navigator.match(<span class="hljs-regexp">/iPhone|iPad|iPd/i</span>) ? <span class="hljs-literal">true</span> : <span class="hljs-literal">false</span>;
<span class="hljs-keyword">var</span> ifSafari = ifIos &amp;&amp; Navigator.match(<span class="hljs-regexp">/Safari/</span>);
<span class="hljs-comment">// ios 设备的版本号</span>
<span class="hljs-keyword">var</span> iosVersion = Navigator.match(<span class="hljs-regexp">/OS\s*(\d+)/</span>)
iosVersion = iosVersion ? (iosVersion[<span class="hljs-number">1</span>] || <span class="hljs-number">0</span>) : <span class="hljs-number">0</span>;
<span class="hljs-comment">// 安卓版本号</span>
<span class="hljs-keyword">var</span> androidVersion = Navigator.match(<span class="hljs-regexp">/Android\s*(\d+)/</span>)
androidVersion = androidVersion ? (androidVersion[<span class="hljs-number">1</span>] || <span class="hljs-number">0</span>) : <span class="hljs-number">0</span>;</code></pre>
<h1 id="articleHeader1">android5 及以上的高版本</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 延后50毫秒
setTimeout(function() {
    location.href = ‘自定义 URL’
}, 50)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// 延后50毫秒</span>
<span class="hljs-function"><span class="hljs-title">setTimeout</span><span class="hljs-params">(function()</span></span> {
    location<span class="hljs-selector-class">.href</span> = ‘自定义 URL’
}, <span class="hljs-number">50</span>)</code></pre>
<h1 id="articleHeader2">ios9 及以上的版本</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout(function() {  // 必须要使用settimeout
    var a = document.createElement(&quot;a&quot;); //创建a元素
    a.setAttribute(&quot;href&quot;, ‘自定义 URL’), a.style.display = &quot;none&quot;, document.body.appendChild(a);
    var t = document.createEvent(&quot;HTMLEvents&quot;); // 返回新创建的 Event 对象，具有指定的类型。
    t.initEvent(&quot;click&quot;, !1, !1) // 初始化新事件对象的属性
    a.dispatchEvent(t)  // 绑定事件
}, 0)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{  <span class="hljs-comment">// 必须要使用settimeout</span>
    <span class="hljs-keyword">var</span> a = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"a"</span>); <span class="hljs-comment">//创建a元素</span>
    a.setAttribute(<span class="hljs-string">"href"</span>, ‘自定义 URL’), a.style.display = <span class="hljs-string">"none"</span>, <span class="hljs-built_in">document</span>.body.appendChild(a);
    <span class="hljs-keyword">var</span> t = <span class="hljs-built_in">document</span>.createEvent(<span class="hljs-string">"HTMLEvents"</span>); <span class="hljs-comment">// 返回新创建的 Event 对象，具有指定的类型。</span>
    t.initEvent(<span class="hljs-string">"click"</span>, !<span class="hljs-number">1</span>, !<span class="hljs-number">1</span>) <span class="hljs-comment">// 初始化新事件对象的属性</span>
    a.dispatchEvent(t)  <span class="hljs-comment">// 绑定事件</span>
}, <span class="hljs-number">0</span>)</code></pre>
<h1 id="articleHeader3">所有情况都用 iframe</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.querySelector(&quot;#&quot; + iframe).src = ‘自定义 URL’ // 将iframe增加src" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">document</span>.<span class="hljs-built_in">querySelector</span>(<span class="hljs-string">"#"</span> + iframe).src = ‘自定义 URL’ <span class="hljs-comment">// 将iframe增加src</span></code></pre>
<h1 id="articleHeader4">计算时差的方案打开APP</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var checkOpen = function (cb){
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
checkOpen(function(opened){
    // APP没有打开成功  并且开启自动跳转到下载页
    if(opened === 0 &amp;&amp; option.autoRedirectToDownloadUrl){
        location.href = downloadUrl;
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> checkOpen = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">cb</span>)</span>{
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
checkOpen(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">opened</span>)</span>{
    <span class="hljs-comment">// APP没有打开成功  并且开启自动跳转到下载页</span>
    <span class="hljs-keyword">if</span>(opened === <span class="hljs-number">0</span> &amp;&amp; option.autoRedirectToDownloadUrl){
        location.href = downloadUrl;
    }
});</code></pre>
<h1 id="articleHeader5">注意</h1>
<blockquote><p>ios9 以上的 Universal Link 设置自行百度下（这个需要问问ios开发人员） 这里还有个我自己发现的 bug<br>在Android里面的qq里面打开<br>如果打开APP的同时立马返回到QQ里面，应用宝的下载页立马又重新打开APP。ios里面也有个情况，打开APP的同时立马用左上角的返回再次点击打开APP按钮则<br>Universal Link 失效，跳转到配置好的 Universal Link 链接，大家有知道的解答哈，共同成长<br>如果ios9 里面没有安装APP 则直接就挑转到 Universal Link 链接 ，这应该是个bug，我想的是，如果没有安装APP 则跳转到应用宝，这个不知道怎么实现</p></blockquote>
<p><strong>测试的配置所有用的 得到 的APP链接，为了方便</strong></p>
<p>GitHub上面有个示例：<a href="https://github.com/lmxdawn/test/tree/master/test-openapp" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/lmxdawn/test/tree/master/test-openapp" rel="nofollow noreferrer" target="_blank">https://github.com/lmxdawn/te...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Ios/Android h5 唤起本地APP

## 原文链接
[https://segmentfault.com/a/1190000011231042](https://segmentfault.com/a/1190000011231042)

