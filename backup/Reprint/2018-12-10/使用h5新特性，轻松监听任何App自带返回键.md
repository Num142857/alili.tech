---
title: '使用h5新特性，轻松监听任何App自带返回键' 
date: 2018-12-10 2:30:07
hidden: true
slug: qwmwcaz064
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1、前言</h2>
<p>如今h5新特性、新标签、新规范等有很多，而且正在不断完善中，各大浏览器商对它们的支持，也是相当给力。作为前端程序员，我觉得我们还是有必要积极关注并勇敢地加以实践。接下来我将和各位分享一个特别好用的h5新特性（目前也不是特别新），轻松监听任何App自带的返回键，包括安卓机里的物理返回键，从而实现项目开发中进一步的需求。</p>
<h2 id="articleHeader1">2、起因</h2>
<p>大概半年前接到pm一需求，用纯h5实现多audio的播放、暂停、续播，页面放至驾考宝典App中，与客户端没有任何的交互，所以与客户端相关的js不需要引用。看上去这需求挺简单的嘛，虽然之前也没做过类似的需求。不管三七二十一，撸起袖子就是干。开始了学习之旅。</p>
<h2 id="articleHeader2">3、我这里着重介绍下我具体是怎么监听任何App自带的返回键，以及安卓机里的物理返回键。</h2>
<p>那为什么我要去监听呢，这里我有必要强调强调再强调。苹果手机不管是微信、QQ、App，还是浏览器里，涉及到audio、video，返回上一页系统会自动暂停当前的播放的，但不是所有安卓机都可以。所以我们自己必须自定义监听。很多朋友可能第一想法就是百度，然后出来的答案无非是这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pushHistory(); 
window.addEventListener(&quot;popstate&quot;, function(e) { 
    alert(&quot;我监听到了浏览器的返回按钮事件啦&quot;);//根据自己的需求实现自己的功能 
}, false); 
function pushHistory() { 
    var state = { 
        title: &quot;title&quot;, 
        url: &quot;#&quot;
    }; 
    window.history.pushState(state, &quot;title&quot;, &quot;#&quot;); 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>pushHistory(); 
<span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">"popstate"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{ 
    alert(<span class="hljs-string">"我监听到了浏览器的返回按钮事件啦"</span>);<span class="hljs-comment">//根据自己的需求实现自己的功能 </span>
}, <span class="hljs-literal">false</span>); 
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pushHistory</span>(<span class="hljs-params"></span>) </span>{ 
    <span class="hljs-keyword">var</span> state = { 
        <span class="hljs-attr">title</span>: <span class="hljs-string">"title"</span>, 
        <span class="hljs-attr">url</span>: <span class="hljs-string">"#"</span>
    }; 
    <span class="hljs-built_in">window</span>.history.pushState(state, <span class="hljs-string">"title"</span>, <span class="hljs-string">"#"</span>); 
}</code></pre>
<p>是不是很眼熟？然而关键需求不能完美实现，要这段代码有何用，当时我也是绞尽脑汁。直到经过大神好友指导，复制了这段代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var hiddenProperty = 'hidden' in document ? 'hidden' :    
    'webkitHidden' in document ? 'webkitHidden' :    
    'mozHidden' in document ? 'mozHidden' :    
    null;
var visibilityChangeEvent = hiddenProperty.replace(/hidden/i, 'visibilitychange');
var onVisibilityChange = function(){
    if (document[hiddenProperty]) {    
        console.log('页面非激活');
    }else{
        console.log('页面激活')
    }
}
document.addEventListener(visibilityChangeEvent, onVisibilityChange);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> hiddenProperty = <span class="hljs-string">'hidden'</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">document</span> ? <span class="hljs-string">'hidden'</span> :    
    <span class="hljs-string">'webkitHidden'</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">document</span> ? <span class="hljs-string">'webkitHidden'</span> :    
    <span class="hljs-string">'mozHidden'</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">document</span> ? <span class="hljs-string">'mozHidden'</span> :    
    <span class="hljs-literal">null</span>;
<span class="hljs-keyword">var</span> visibilityChangeEvent = hiddenProperty.replace(<span class="hljs-regexp">/hidden/i</span>, <span class="hljs-string">'visibilitychange'</span>);
<span class="hljs-keyword">var</span> onVisibilityChange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>[hiddenProperty]) {    
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'页面非激活'</span>);
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'页面激活'</span>)
    }
}
<span class="hljs-built_in">document</span>.addEventListener(visibilityChangeEvent, onVisibilityChange);</code></pre>
<p>所有问题迎刃而解。<br>这段代码的原理我个人理解就是通过判断用户浏览的是否为当前页，从而进行相关操作。<br>这是 MDN相关链接:<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Document/hidden" rel="nofollow noreferrer" target="_blank"></a><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Document/hidden" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org...</a>。</p>
<h2 id="articleHeader3">4、手机兼容性</h2>
<p>众所周知现在的安卓机系统4.0等都是低配版了，该属性大部分安卓机都能识别，个人低配版安卓机无法识别，原因在于navigator.userAgent内核版本过低，chrome现在很多是64+了，所以遇到该问题只要想办法兼容它就好了。</p>
<p>并不是说真的可以通过JS监听到用户对App里的自带返回键的直接操作，甚至安卓的物理返回键，而是通过转变思路，快速实现需求。希望这个特性能帮到各位。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用h5新特性，轻松监听任何App自带返回键

## 原文链接
[https://segmentfault.com/a/1190000013700474](https://segmentfault.com/a/1190000013700474)

