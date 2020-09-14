---
title: '一个更容易检测设备的JavaScript库——device.js' 
date: 2019-01-30 2:30:23
hidden: true
slug: am2vl03nt5
categories: [reprint]
---

{{< raw >}}

                    
<p>decice.js的<a href="https://github.com/matthewhudson/device.js/" rel="nofollow noreferrer" target="_blank">github地址</a></p>
<p>device.js是一个可以用来检测设备的平台、操作系统和方向的JavaScript库。device.js 通过操作系统（比如 iOS，安卓，黑莓，Windows，Firefox OX），方向（横屏或者竖屏），类型（平板或者移动设备），来为设备添加 <code>CSS Class</code>,并且它还提供了一些Javascript 函数用来判断设备。<br>比如在PC端打开引入了device.js的 html 页面时会在&lt;html&gt;标签里添加"<code>desktop landscape</code>"的class。<br><span class="img-wrap"><img data-src="/img/bVGiUQ?w=381&amp;h=148" src="https://static.alili.tech/img/bVGiUQ?w=381&amp;h=148" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">device支持的设备</h2>
<ul>
<li><p>iOS: iPhone, iPod, iPad</p></li>
<li><p>Android: Phones &amp; Tablets</p></li>
<li><p>Blackberry: Phones &amp; Tablets</p></li>
<li><p>Windows: Phones &amp; Tablets</p></li>
<li><p>Firefox OS: Phones &amp; Tablets</p></li>
</ul>
<h2 id="articleHeader1">device.js的使用</h2>
<p>直接在html页面的头部引入即可使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot; src=&quot;device.js&quot;></script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"device.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<h2 id="articleHeader2">根据设备的不同生成的CSS</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="**Device**            **CSS Classes**

iPhone                ios iphone mobile

iPod                  ios ipod mobile

Android Phone         android mobile

Android Tablet        android tablet

BlackBerry Phone      blackberry mobile

BlackBerry Tablet     blackberry tablet

Windows Phone         windows mobile

Windows Tablet        windows tablet

Firefox OS Phone      fxos mobile

Firefox OS Tablet     fxos tablet

MeeGo                 meego

Desktop               desktop

Television            television
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code>**Device**            **CSS Classes**

<span class="hljs-symbol">iPhone</span>                ios iphone mobile

<span class="hljs-symbol">iPod</span>                  ios ipod mobile

<span class="hljs-keyword">Android </span>Phone         <span class="hljs-keyword">android </span>mobile

<span class="hljs-keyword">Android </span>Tablet        <span class="hljs-keyword">android </span>tablet

<span class="hljs-keyword">BlackBerry </span>Phone      <span class="hljs-keyword">blackberry </span>mobile

<span class="hljs-keyword">BlackBerry </span>Tablet     <span class="hljs-keyword">blackberry </span>tablet

<span class="hljs-symbol">Windows</span> Phone         windows mobile

<span class="hljs-symbol">Windows</span> Tablet        windows tablet

<span class="hljs-symbol">Firefox</span> OS Phone      fxos mobile

<span class="hljs-symbol">Firefox</span> OS Tablet     fxos tablet

<span class="hljs-symbol">MeeGo</span>                 meego

<span class="hljs-symbol">Desktop</span>               desktop

<span class="hljs-symbol">Television</span>            television
</code></pre>
<h2 id="articleHeader3">根据方向的不同生成的CSS</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="**Orientation**     **CSS Classes**

Landscape             landscape

Portrait              portrait
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs asciidoc"><code>*<span class="hljs-strong">*Orientation*</span>*     *<span class="hljs-strong">*CSS Classes*</span>*

Landscape             landscape

Portrait              portrait
</code></pre>
<h2 id="articleHeader4">相关的JavaScript方法</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="**Device**       **JavaScript Method**

Mobile             device.mobile()

Tablet             device.tablet()

Desktop            device.desktop()

iOS                device.ios()

iPad               device.ipad()

iPhone             device.iphone()

iPod               device.ipod()

Android            device.android()

Android Phone      device.androidPhone()

Android Tablet     device.androidTablet()

BlackBerry         device.blackberry()

BlackBerry Phone   device.blackberryPhone()

BlackBerry Tablet  device.blackberryTablet()

Windows            device.windows()

Windows Phone      device.windowsPhone()

Windows Tablet     device.windowsTablet()

Firefox OS         device.fxos()

Firefox OS Phone   device.fxosPhone()

Firefox OS Tablet  device.fxosTablet()

MeeGo              device.meego()

Television         device.television()
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code>**Device**       **JavaScript <span class="hljs-function"><span class="hljs-keyword">Method</span>**

<span class="hljs-title">Mobile</span>             <span class="hljs-title">device</span>.<span class="hljs-title">mobile</span><span class="hljs-params">()</span>

<span class="hljs-title">Tablet</span>             <span class="hljs-title">device</span>.<span class="hljs-title">tablet</span><span class="hljs-params">()</span>

<span class="hljs-title">Desktop</span>            <span class="hljs-title">device</span>.<span class="hljs-title">desktop</span><span class="hljs-params">()</span>

<span class="hljs-title">iOS</span>                <span class="hljs-title">device</span>.<span class="hljs-title">ios</span><span class="hljs-params">()</span>

<span class="hljs-title">iPad</span>               <span class="hljs-title">device</span>.<span class="hljs-title">ipad</span><span class="hljs-params">()</span>

<span class="hljs-title">iPhone</span>             <span class="hljs-title">device</span>.<span class="hljs-title">iphone</span><span class="hljs-params">()</span>

<span class="hljs-title">iPod</span>               <span class="hljs-title">device</span>.<span class="hljs-title">ipod</span><span class="hljs-params">()</span>

<span class="hljs-title">Android</span>            <span class="hljs-title">device</span>.<span class="hljs-title">android</span><span class="hljs-params">()</span>

<span class="hljs-title">Android</span> <span class="hljs-title">Phone</span>      <span class="hljs-title">device</span>.<span class="hljs-title">androidPhone</span><span class="hljs-params">()</span>

<span class="hljs-title">Android</span> <span class="hljs-title">Tablet</span>     <span class="hljs-title">device</span>.<span class="hljs-title">androidTablet</span><span class="hljs-params">()</span>

<span class="hljs-title">BlackBerry</span>         <span class="hljs-title">device</span>.<span class="hljs-title">blackberry</span><span class="hljs-params">()</span>

<span class="hljs-title">BlackBerry</span> <span class="hljs-title">Phone</span>   <span class="hljs-title">device</span>.<span class="hljs-title">blackberryPhone</span><span class="hljs-params">()</span>

<span class="hljs-title">BlackBerry</span> <span class="hljs-title">Tablet</span>  <span class="hljs-title">device</span>.<span class="hljs-title">blackberryTablet</span><span class="hljs-params">()</span>

<span class="hljs-title">Windows</span>            <span class="hljs-title">device</span>.<span class="hljs-title">windows</span><span class="hljs-params">()</span>

<span class="hljs-title">Windows</span> <span class="hljs-title">Phone</span>      <span class="hljs-title">device</span>.<span class="hljs-title">windowsPhone</span><span class="hljs-params">()</span>

<span class="hljs-title">Windows</span> <span class="hljs-title">Tablet</span>     <span class="hljs-title">device</span>.<span class="hljs-title">windowsTablet</span><span class="hljs-params">()</span>

<span class="hljs-title">Firefox</span> <span class="hljs-title">OS</span>         <span class="hljs-title">device</span>.<span class="hljs-title">fxos</span><span class="hljs-params">()</span>

<span class="hljs-title">Firefox</span> <span class="hljs-title">OS</span> <span class="hljs-title">Phone</span>   <span class="hljs-title">device</span>.<span class="hljs-title">fxosPhone</span><span class="hljs-params">()</span>

<span class="hljs-title">Firefox</span> <span class="hljs-title">OS</span> <span class="hljs-title">Tablet</span>  <span class="hljs-title">device</span>.<span class="hljs-title">fxosTablet</span><span class="hljs-params">()</span>

<span class="hljs-title">MeeGo</span>              <span class="hljs-title">device</span>.<span class="hljs-title">meego</span><span class="hljs-params">()</span>

<span class="hljs-title">Television</span>         <span class="hljs-title">device</span>.<span class="hljs-title">television</span><span class="hljs-params">()</span>
</span></code></pre>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="**Orientation**  **JavaScript Method**

Landscape          device.landscape()

Portrait           device.portrait()   
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code>**Orientation**  **JavaScript <span class="hljs-function"><span class="hljs-keyword">Method</span>**

<span class="hljs-title">Landscape</span>          <span class="hljs-title">device</span>.<span class="hljs-title">landscape</span><span class="hljs-params">()</span>

<span class="hljs-title">Portrait</span>           <span class="hljs-title">device</span>.<span class="hljs-title">portrait</span><span class="hljs-params">()</span>   
</span></code></pre>
<p>通常情况下，我们为了使页面在不同分辨率的设备上展示出不同的效果，会使用<code>CSS3</code>的 <code>@media</code>属性来实现，但如果我们想在 PC端和 mobile端展示两个不同的页面，使用device.js 就会方便很多，首先用它来检测设备，然后再在不同的设备上打开不同的页面。<br>假设有个项目，我们想让它在手机上打开的页面为 m.html,在电脑上打开的页面为 desk.html,这个时候我们就可以用device.js来实现，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
    <meta http-equiv=&quot;Content-Type&quot; content=&quot;text/html;charset=utf-8&quot;>
    <title>device.js的使用</title>
    <script type=&quot;text/javascript&quot; src=&quot;device.js&quot;></script>
</head>
<body>
    <script type=&quot;text/javascript&quot;>
        var isMobile = device.mobile(),
             isTable = device.tablet();

        if(isMobile || isTable){
            window.open(&quot;m.html&quot;,&quot;_self&quot;); //如果终端是手机或者平板，就打开m.html
        }
        else{
            window.open(&quot;desk.html&quot;,&quot;_self&quot;); //否则打开desk.html
        }
    </script>
</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"Content-Type"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"text/html;charset=utf-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>device.js的使用<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"device.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> isMobile = device.mobile(),
             isTable = device.tablet();

        <span class="hljs-keyword">if</span>(isMobile || isTable){
            <span class="hljs-built_in">window</span>.open(<span class="hljs-string">"m.html"</span>,<span class="hljs-string">"_self"</span>); <span class="hljs-comment">//如果终端是手机或者平板，就打开m.html</span>
        }
        <span class="hljs-keyword">else</span>{
            <span class="hljs-built_in">window</span>.open(<span class="hljs-string">"desk.html"</span>,<span class="hljs-string">"_self"</span>); <span class="hljs-comment">//否则打开desk.html</span>
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
一个更容易检测设备的JavaScript库——device.js

## 原文链接
[https://segmentfault.com/a/1190000007662527](https://segmentfault.com/a/1190000007662527)

