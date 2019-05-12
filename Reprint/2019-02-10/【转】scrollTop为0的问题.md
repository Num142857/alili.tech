---
title: '【转】scrollTop为0的问题' 
date: 2019-02-10 2:30:42
hidden: true
slug: tzdcntkt56m
categories: [reprint]
---

{{< raw >}}

                    
<p>原文地址<a href="http://wo13145219.iteye.com/blog/2001598" rel="nofollow noreferrer" target="_blank">http://wo13145219.iteye.com/blog/2001598</a></p>
<p>一、先遇到document.body.scrollTop值为0的问题 </p>
<p>　　做页面的时候可能会用到位置固定的层,读取document.body.scrollTop来设置层的位置,像这样,</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.onscroll=function () { 
    var oId=document.getElementByIdx_x(&quot;id&quot;); 
    oId.style.top=document.body.scrollTop+&quot;px&quot;; 
} 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">window</span>.onscroll=<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ 
    <span class="hljs-keyword">var</span> oId=<span class="hljs-built_in">document</span>.getElementByIdx_x(<span class="hljs-string">"id"</span>); 
    oId.style.top=<span class="hljs-built_in">document</span>.body.scrollTop+<span class="hljs-string">"px"</span>; 
} 
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="可是怎么没有达到预期效果呢,输出document.body.scrollTop的值一看,一直都是0.原来是DTD的问题,要是页面直接用开头的话就没有问题了.但是要符合web标准,DTD当然是不能少的.使用DTD时用document.documentElement.scrollTop代替document.body.scrollTop就可以了 
window.onscroll=function () { 
    var oId=document.getElementByIdx_x(&quot;id&quot;); 
    oId.style.top=document.documentElement.scrollTop+&quot;px&quot;; 
} 
或者用函数来解决： 
function get_scrollTop_of_body(){ 
    var scrollTop; 
    if(typeof window.pageYOffset != 'undefined'){//pageYOffset指的是滚动条顶部到网页顶部的距离 
        scrollTop = window.pageYOffset; 
    }else if(typeof document.compatMode != 'undefined' &amp;&amp; document.compatMode != 'BackCompat')        { 
        scrollTop = document.documentElement.scrollTop; 
    }else if(typeof document.body != 'undefined'){ 
        scrollTop = document.body.scrollTop; 
    } 
    return scrollTop; 
} 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>可是怎么没有达到预期效果呢,输出<span class="hljs-built_in">document</span>.body.scrollTop的值一看,一直都是<span class="hljs-number">0.</span>原来是DTD的问题,要是页面直接用开头的话就没有问题了.但是要符合web标准,DTD当然是不能少的.使用DTD时用<span class="hljs-built_in">document</span>.documentElement.scrollTop代替<span class="hljs-built_in">document</span>.body.scrollTop就可以了 
<span class="hljs-built_in">window</span>.onscroll=<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ 
    <span class="hljs-keyword">var</span> oId=<span class="hljs-built_in">document</span>.getElementByIdx_x(<span class="hljs-string">"id"</span>); 
    oId.style.top=<span class="hljs-built_in">document</span>.documentElement.scrollTop+<span class="hljs-string">"px"</span>; 
} 
或者用函数来解决： 
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">get_scrollTop_of_body</span>(<span class="hljs-params"></span>)</span>{ 
    <span class="hljs-keyword">var</span> scrollTop; 
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span>.pageYOffset != <span class="hljs-string">'undefined'</span>){<span class="hljs-comment">//pageYOffset指的是滚动条顶部到网页顶部的距离 </span>
        scrollTop = <span class="hljs-built_in">window</span>.pageYOffset; 
    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">document</span>.compatMode != <span class="hljs-string">'undefined'</span> &amp;&amp; <span class="hljs-built_in">document</span>.compatMode != <span class="hljs-string">'BackCompat'</span>)        { 
        scrollTop = <span class="hljs-built_in">document</span>.documentElement.scrollTop; 
    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-keyword">typeof</span> <span class="hljs-built_in">document</span>.body != <span class="hljs-string">'undefined'</span>){ 
        scrollTop = <span class="hljs-built_in">document</span>.body.scrollTop; 
    } 
    <span class="hljs-keyword">return</span> scrollTop; 
} 
</code></pre>
<p>　　注：IE对盒模型的渲染在 Standards Mode和Quirks Mode是有很大差别的，在Standards Mode下对于盒模型的解释和其他的标准浏览器是一样，但在Quirks Mode模式下则有很大差别，而在不声明Doctype的情况下，IE默认又是Quirks Mode。所以为兼容性考虑，我们可能需要获取当前的文档渲染方式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.compatMode正好派上用场，它有两种可能的返回值：BackCompat和CSS1Compat，对其解释如下： 
BackCompat： Standards-compliant mode is not switched on. (Quirks Mode) 
CSS1Compat： Standards-compliant mode is switched on. (Standards Mode) 
在实际的项目中，我们还需要在获取浏览是否IE，这样就可以得到IE的渲染模式了。 
当文档有了标准声明时， document.compatMode 的值就等于 &quot;CSS1compat&quot;， 因此，我们可以根据 document.compatMode 的值来判断文档是否加了标准声明： 
var height = document.compatMode==&quot;CSS1Compat&quot; ? document.documentElement.clientHeight : document.body.clientHeight; 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code><span class="hljs-built_in">document</span>.compatMode正好派上用场，它有两种可能的返回值：BackCompat和CSS1Compat，对其解释如下： 
BackCompat： Standards-compliant mode <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> switched <span class="hljs-literal">on</span>. (Quirks Mode) 
CSS1Compat： Standards-compliant mode <span class="hljs-keyword">is</span> switched <span class="hljs-literal">on</span>. (Standards Mode) 
在实际的项目中，我们还需要在获取浏览是否IE，这样就可以得到IE的渲染模式了。 
当文档有了标准声明时， <span class="hljs-built_in">document</span>.compatMode 的值就等于 <span class="hljs-string">"CSS1compat"</span>， 因此，我们可以根据 <span class="hljs-built_in">document</span>.compatMode 的值来判断文档是否加了标准声明： 
<span class="hljs-keyword">var</span> height = <span class="hljs-built_in">document</span>.compatMode==<span class="hljs-string">"CSS1Compat"</span> ? <span class="hljs-built_in">document</span>.documentElement.clientHeight : <span class="hljs-built_in">document</span>.body.clientHeight; 
</code></pre>
<p>二、再次遇到谷歌浏览器不支持document.documentElement.scrollTop，值0的问题 <br>　　信息显示浮动层时，IE、Firefox下都能显示正常，但Chrome下出现了浮动层永远显示在上面，经过仔细分析，发现Chrome对document.documentElement.scrollTop的识别会出现误差。不过加上document.body.scrollTop后，则显示正常。 <br>　　由于document.documentElement.scrollTop和document.body.scrollTop在标准模式或者是奇怪模式下都只有一个会返回有效的值，所以都加上也不会有问题（看来上面的问题是Chrome可能把文档当作非标准文档来解析了）。 <br>　　即获取高度时使用document.documentElement.scrollTop+document.body.scrollTop，经测试，代码在IE、Firefox、Chrome下都能显示正常了。 </p>
<p>三、浏览器兼容模式 <br>　　对于document.compatMode，很多朋友可能都根我一样很少接触，知道他的存在却不清楚他的用途。今天在ext中看到 document.compatMode的使用，感觉这个对于我们开发兼容性的web页面还是很有帮助，我们都知道，IE对盒模型的渲染在 Standards Mode和Quirks Mode是有很大差别的，在Standards Mode下对于盒模型的解释和其他的标准浏览器是一样，但在Quirks Mode模式下则有很大差别，而在不声明Doctype的情况下，IE默认又是Quirks Mode。所以为兼容性考虑，我们可能需要获取当前的文档渲染方式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  document.compatMode正好派上用场，它有两种可能的返回值：BackCompat和CSS1Compat，对其解释如下： " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code style="word-break: break-word; white-space: initial;">  document.compatMode正好派上用场，它有两种可能的返回值：<span class="hljs-keyword">BackCompat和CSS1Compat，对其解释如下： </span></code></pre>
<p>BackCompat Standards-compliant mode is not switched on. (Quirks Mode) <br>CSS1Compat Standards-compliant mode is switched on. (Standards Mode)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="在实际的项目中，我们还需要在获取浏览是否IE，这样就可以得到IE的渲染模式了。在Ext中的代码：isBorderBox=isIE&amp;&amp;!isStrict。 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code style="word-break: break-word; white-space: initial;">在实际的项目中，我们还需要在获取浏览是否IE，这样就可以得到IE的渲染模式了。在Ext中的代码：<span class="hljs-keyword">isBorderBox=isIE&amp;&amp;!isStrict。 </span></code></pre>
<p>当文档有了标准声明时， document.compatMode 的值就等于 "CSS1compat"， 因此， 我们可以根据 document.compatMode 的值来判断文档是否加了标准声明 <br>var height = document.compatMode=="CSS1Compat" ? document.documentElement.clientHeight : document.body.clientHeight; </p>
<p>==========================模式应用=========================== </p>
<p>　　document.compatMode:获取当前浏览器采用的渲染方式。主要是浏览器的模式，有两个：BackCompat，CSS1Compat。其中前者是怪异模式，后者是标准模式。 <br>　　IE默认是BackCompat模式，Gecko内核的浏览器只在table中图片层上不同，可以认为CSS1Compat标准模式document.compatMode等于BackCompat时，浏览器客户区宽度是document.body.clientWidth； <br>　　当document.compatMode等于CSS1Compat时，浏览器客户区宽度是document.documentElement.clientWidth。 <br>　　浏览器客户区高度、滚动条高度、滚动条的Left、滚动条的Top等等都是上面的情况。 <br>　　一个准确获取网页客户区的宽高、滚动条宽高、滚动条Left和Top的代码： <br>if (document.compatMode == "BackCompat") <br>{ <br>　　cWidth = document.body.clientWidth; <br>　　cHeight = document.body.clientHeight; <br>　　sWidth = document.body.scrollWidth; <br>　　sHeight = document.body.scrollHeight; <br>　　sLeft = document.body.scrollLeft; <br>　　sTop = document.body.scrollTop; <br>} <br>else <br>{ <br>　　//document.compatMode == "CSS1Compat" <br>　　cWidth = document.documentElement.clientWidth; <br>　　cHeight = document.documentElement.clientHeight; <br>　　sWidth = document.documentElement.scrollWidth; <br>　　sHeight = document.documentElement.scrollHeight; <br>　　sLeft = document.documentElement.scrollLeft == 0 ? document.body.scrollLeft : document.documentElement.scrollLeft; <br>　　sTop = document.documentElement.scrollTop == 0 ? document.body.scrollTop : document.documentElement.scrollTop; <br>} <br>（以上代码兼容目前流行的全部浏览器，包括：IE、Firefox、Safari、Opera、Chrome）</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【转】scrollTop为0的问题

## 原文链接
[https://segmentfault.com/a/1190000005063489](https://segmentfault.com/a/1190000005063489)

