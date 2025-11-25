---
title: '第六天 移动端Web开发注意事项' 
date: 2019-01-31 2:31:16
hidden: true
slug: 8k20276v9vo
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>随着移动互联网的发展，移动Web已经逐渐成为互联网的主要入口，随之而来的是前端在移动Web开发上面临的各种机遇与挑战，本文就一些常见移动端问题对移动Web开发需要注意的事项进行一下总结，必然不可能涉及方方面面，但会随着笔者的积累持续更新。</p></blockquote>
<h2 id="articleHeader0">一、移动端适配</h2>
<h3 id="articleHeader1">1、H5页面窗口需要自动调整到设备宽度，并禁止用户缩放页面</h3>
<ul>
<li><p>一般情况下，在所有无线页面的头部，都要加上此viewport的设置，如果不加上此数值，会造成在某些webkit游览器中，游览器会根据自身的某些判断，自行做放大、缩小等，造成页面无法正常访问，特别是某些app中嵌入了webkit游览器来进行访问的时候， 会出现以上所说的情况，因此为了保证你说设计的网页在所有手机中显示保持一致，加上此设置</p></li>
<li><p>viewport中的设置数值一般不需要进行修改，因为现在的数值已经满足了绝大多数项目，当然会出现在非常特殊的页面里，需要用户进行手动缩放的操作，不过如果修改了数值，需要在不同的手机上进行详细的测试，否则会有你预期外的事情发生。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta name=&quot;viewport&quot; content=&quot;width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"</span> /&gt;</span></code></pre>
<h3 id="articleHeader2">2、禁止将页面中的数字识别为电话号码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta name=&quot;format-detection&quot; content=&quot;telephone=no&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"format-detection"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"telephone=no"</span> /&gt;</span></code></pre>
<h3 id="articleHeader3">3、忽略Android平台中对邮箱地址的识别</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta name=&quot;format-detection&quot; content=&quot;email=no&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"format-detection"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"email=no"</span> /&gt;</span></code></pre>
<h3 id="articleHeader4">4、当网站添加到主屏幕快速启动方式，可隐藏地址栏（仅针对ios的safari有效）</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta name=&quot;apple-mobile-web-app-capable&quot; content=&quot;yes&quot; />
<!-- ios7.0版本以后，safari上已看不到效果 -->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"apple-mobile-web-app-capable"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"yes"</span> /&gt;</span>
<span class="hljs-comment">&lt;!-- ios7.0版本以后，safari上已看不到效果 --&gt;</span></code></pre>
<h3 id="articleHeader5">5、将网站添加到主屏幕快速启动方式（仅针对ios的safari）</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta name=&quot;apple-mobile-web-app-status-bar-style&quot; content=&quot;black&quot; />
<!-- 可选default、black、black-translucent -->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"apple-mobile-web-app-status-bar-style"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"black"</span> /&gt;</span>
<span class="hljs-comment">&lt;!-- 可选default、black、black-translucent --&gt;</span></code></pre>
<h3 id="articleHeader6">6、viewport模板</h3>
<p><strong>viewport模板——通用</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
<meta charset=&quot;utf-8&quot;>
<meta content=&quot;width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no&quot; name=&quot;viewport&quot;>
<meta content=&quot;yes&quot; name=&quot;apple-mobile-web-app-capable&quot;>
<meta content=&quot;black&quot; name=&quot;apple-mobile-web-app-status-bar-style&quot;>
<meta content=&quot;telephone=no&quot; name=&quot;format-detection&quot;>
<meta content=&quot;email=no&quot; name=&quot;format-detection&quot;>
<title>标题</title>
<link rel=&quot;stylesheet&quot; href=&quot;index.css&quot;>
</head>

<body>
这里开始内容
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"yes"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"apple-mobile-web-app-capable"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"black"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"apple-mobile-web-app-status-bar-style"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"telephone=no"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"format-detection"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"email=no"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"format-detection"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>标题<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"index.css"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
这里开始内容
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>参考案例： <a href="http://action.weixin.qq.com/payact/readtemplate?t=mobile/2015/wxzfsht/index_tmpl" rel="nofollow noreferrer" target="_blank">http://action.weixin.qq.com/payact/readtemplate?t=mobile/2015/wxzfsht/index_tmpl</a></p>
<h2 id="articleHeader7">二、开发常见问题</h2>
<h3 id="articleHeader8">1、移动端如何定义字体font-family</h3>
<p>中文字体使用系统默认，英文用Helvetica</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 移动端定义字体的代码 */
body{font-family:Helvetica;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* 移动端定义字体的代码 */</span>
<span class="hljs-selector-tag">body</span>{<span class="hljs-attribute">font-family</span>:Helvetica;}</code></pre>
<p>参考《 <a href="http://www.cnblogs.com/PeunZhang/p/3592096.html" rel="nofollow noreferrer" target="_blank">移动端使用字体的思考</a> 》</p>
<h3 id="articleHeader9">2、移动端字体单位font-size选择px还是rem</h3>
<ul>
<li><p>对于只需要适配少部分手机设备，且分辨率对页面影响不大的，使用px即可</p></li>
<li><p>对于需要适配各种移动设备，使用rem</p></li>
<li><p>媒体查询配置参考：</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html{font-size:10px}
@media screen and (min-width:321px) and (max-width:375px){html{font-size:11px"}}"
@media screen and (min-width:376px) and (max-width:414px){html{font-size:12px"}}"
@media screen and (min-width:415px) and (max-width:639px){html{font-size:15px"}}"
@media screen and (min-width:640px) and (max-width:719px){html{font-size:20px"}}"
@media screen and (min-width:720px) and (max-width:749px){html{font-size:22.5px"}}"
@media screen and (min-width:750px) and (max-width:799px){html{font-size:23.5px"}}"
@media screen and (min-width:800px){html{font-size:25px"}}"" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">html</span>{<span class="hljs-attribute">font-size</span>:<span class="hljs-number">10px</span>}
@<span class="hljs-keyword">media</span> screen and (min-width:<span class="hljs-number">321px</span>) and (max-width:<span class="hljs-number">375px</span>){<span class="hljs-selector-tag">html</span>{<span class="hljs-attribute">font-size</span>:<span class="hljs-number">11px</span>"}}"
@<span class="hljs-keyword">media</span> screen and (min-width:<span class="hljs-number">376px</span>) and (max-width:<span class="hljs-number">414px</span>){<span class="hljs-selector-tag">html</span>{<span class="hljs-attribute">font-size</span>:<span class="hljs-number">12px</span>"}}"
@<span class="hljs-keyword">media</span> screen and (min-width:<span class="hljs-number">415px</span>) and (max-width:<span class="hljs-number">639px</span>){<span class="hljs-selector-tag">html</span>{<span class="hljs-attribute">font-size</span>:<span class="hljs-number">15px</span>"}}"
@<span class="hljs-keyword">media</span> screen and (min-width:<span class="hljs-number">640px</span>) and (max-width:<span class="hljs-number">719px</span>){<span class="hljs-selector-tag">html</span>{<span class="hljs-attribute">font-size</span>:<span class="hljs-number">20px</span>"}}"
@<span class="hljs-keyword">media</span> screen and (min-width:<span class="hljs-number">720px</span>) and (max-width:<span class="hljs-number">749px</span>){<span class="hljs-selector-tag">html</span>{<span class="hljs-attribute">font-size</span>:<span class="hljs-number">22.5px</span>"}}"
@<span class="hljs-keyword">media</span> screen and (min-width:<span class="hljs-number">750px</span>) and (max-width:<span class="hljs-number">799px</span>){<span class="hljs-selector-tag">html</span>{<span class="hljs-attribute">font-size</span>:<span class="hljs-number">23.5px</span>"}}"
@<span class="hljs-keyword">media</span> screen and (min-width:<span class="hljs-number">800px</span>){<span class="hljs-selector-tag">html</span>{<span class="hljs-attribute">font-size</span>:<span class="hljs-number">25px</span>"}}"</code></pre>
<h3 id="articleHeader10">3、移动端touch事件(区分webkit 和 winphone)</h3>
<p>当用户手指放在移动设备在屏幕上滑动会触发的touch事件</p>
<p><strong>以下支持webkit</strong></p>
<ul>
<li><p>touchstart——当手指触碰屏幕时候发生。不管当前有多少只手指</p></li>
<li><p>touchmove——当手指在屏幕上滑动时连续触发。通常我们再滑屏页面，会调用event的preventDefault()可以阻止默认情况的发生：阻止页面滚动</p></li>
<li><p>touchend——当手指离开屏幕时触发</p></li>
<li><p>touchcancel——系统停止跟踪触摸时候会触发。例如在触摸过程中突然页面alert()一个提示框，此时会触发该事件，这个事件比较少用</p></li>
</ul>
<p>参数信息(changedTouches[0])</p>
<ul>
<li><p>clientX、clientY在显示区的坐标</p></li>
<li><p>target：当前元素</p></li>
</ul>
<p>参考： <a href="https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/en-US/docs/Web/API/TouchEvent</a></p>
<p><strong>以下支持winphone 8</strong></p>
<ul>
<li><p>MSPointerDown——当手指触碰屏幕时候发生。不管当前有多少只手指</p></li>
<li><p>MSPointerMove——当手指在屏幕上滑动时连续触发。通常我们再滑屏页面，会调用css的html{-ms-touch-action: none;}可以阻止默认情况的发生：阻止页面滚动</p></li>
<li><p>MSPointerUp——当手指离开屏幕时触发</p></li>
</ul>
<h3 id="articleHeader11">4、移动端click屏幕产生200-300 ms的延迟响应</h3>
<p>移动设备上的web网页是有300ms延迟的，往往会造成按钮点击延迟甚至是点击失效。</p>
<p>以下是 <strong>历史原因</strong> ，来源一个公司内一个同事的分享：</p>
<blockquote><p>2007年苹果发布首款iphone上IOS系统搭载的safari为了将适用于PC端上大屏幕的网页能比较好的展示在手机端上，使用了双击缩放(double tap to zoom)的方案，比如你在手机上用浏览器打开一个PC上的网页，你可能在看到页面内容虽然可以撑满整个屏幕，但是字体、图片都很小看不清，此时可以快速双击屏幕上的某一部分，你就能看清该部分放大后的内容，再次双击后能回到原始状态。</p></blockquote>
<p>双击缩放是指用手指在屏幕上快速点击两次，iOS 自带的 Safari 浏览器会将网页缩放至原始比例。</p>
<p>原因就出在浏览器需要如何判断快速点击上，当用户在屏幕上单击某一个元素时候，例如跳转链接<a></a>，此处浏览器会先捕获该次单击，但浏览器不能决定用户是单纯要点击链接还是要双击该部分区域进行缩放操作，所以，捕获第一次单击后，浏览器会先Hold一段时间t，如果在t时间区间里用户未进行下一次点击，则浏览器会做单击跳转链接的处理，如果t时间里用户进行了第二次单击操作，则浏览器会禁止跳转，转而进行对该部分区域页面的缩放操作。那么这个时间区间t有多少呢？在IOS safari下，大概为300毫秒。这就是延迟的由来。造成的后果用户纯粹单击页面，页面需要过一段时间才响应，给用户慢体验感觉，对于web开发者来说是，页面js捕获click事件的回调函数处理，需要300ms后才生效，也就间接导致影响其他业务逻辑的处理。</p>
<p><strong>解决方案</strong> ：</p>
<ul>
<li><p><code>fastclick</code> 可以解决在手机上点击事件的300ms延迟</p></li>
<li><p><code>zepto</code> 的 <code>touch</code> 模块， <code>tap</code> 事件也是为了解决在click的延迟问题</p></li>
</ul>
<h3 id="articleHeader12">5、触摸事件的响应顺序</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1、ontouchstart 
2、ontouchmove 
3、ontouchend 
4、onclick" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-number">1</span>、ontouchstart 
<span class="hljs-number">2</span>、ontouchmove 
<span class="hljs-number">3</span>、ontouchend 
<span class="hljs-number">4</span>、onclick</code></pre>
<p>解决300ms延迟的问题，也可以通过绑定ontouchstart事件，加快对事件的响应</p>
<h3 id="articleHeader13">6、什么是Retina 显示屏，带来了什么问题</h3>
<p>retina：一种具备超高像素密度的液晶屏，同样大小的屏幕上显示的像素点由1个变为多个，如在同样带下的屏幕上，苹果设备的retina显示屏中，像素点1个变为4个</p>
<p>在高清显示屏中的位图被放大，图片会变得模糊，因此移动端的视觉稿通常会设计为传统PC的2倍</p>
<p>那么，前端的应对方案是：</p>
<p>设计稿切出来的图片长宽保证为 <strong>偶数</strong> ，并使用 <code>backgroud-size</code> 把图片缩小为原来的 <code>1/2</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//例如图片宽高为：200px*200px，那么写法如下
.css{
    width:100px;
    height:100px;
    background-size:100px 100px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">//例如图片宽高为：200<span class="hljs-selector-tag">px</span>*200<span class="hljs-selector-tag">px</span>，那么写法如下
<span class="hljs-selector-class">.css</span>{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">100px</span>;
    <span class="hljs-attribute">background-size</span>:<span class="hljs-number">100px</span> <span class="hljs-number">100px</span>;
}</code></pre>
<p>其它元素的取值为原来的1/2，例如视觉稿40px的字体，使用样式的写法为20px</p>
<p>参考《 <a href="http://www.cnblogs.com/PeunZhang/p/3441110.html" rel="nofollow noreferrer" target="_blank">高清显示屏原理及设计方案</a> 》</p>
<h3 id="articleHeader14">7、ios系统中元素被触摸时产生半透明灰色遮罩</h3>
<p>ios用户点击一个链接，会出现一个半透明灰色遮罩, 如果想要禁用，可设置 <code>-webkit-tap-highlight-color</code> 的 <code>alpha</code> 值为 <code>0</code> ，也就是属性值的最后一位设置为0就可以去除半透明灰色遮罩</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a,button,input,textarea {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">a</span>,<span class="hljs-selector-tag">button</span>,<span class="hljs-selector-tag">input</span>,<span class="hljs-selector-tag">textarea</span> {
    <span class="hljs-attribute">-webkit-tap-highlight-color</span>: <span class="hljs-built_in">rgba</span>(0,0,0,0);
}</code></pre>
<h3 id="articleHeader15">8、部分android系统中元素被点击时产生边框</h3>
<p>android用户点击一个链接，会出现一个边框或者半透明灰色遮罩, 不同生产商定义出来额效果不一样，可设置 <code>-webkit-tap-highlight-color</code> 的 <code>alpha</code> 值为 <code>0</code> 去除部分机器自带的效果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a,button,input,textarea{
-webkit-tap-highlight-color: rgba(0,0,0,0;)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">a</span>,<span class="hljs-selector-tag">button</span>,<span class="hljs-selector-tag">input</span>,<span class="hljs-selector-tag">textarea</span>{
<span class="hljs-attribute">-webkit-tap-highlight-color</span>: <span class="hljs-built_in">rgba</span>(0,0,0,0;)
}</code></pre>
<p>另外，有些机型去除不了，如小米2</p>
<p>对于按钮类还有个办法，不使用a或者input标签，直接用div标签</p>
<p>参考《 <a href="http://www.cnblogs.com/PeunZhang/archive/2013/02/28/2907708.html" rel="nofollow noreferrer" target="_blank">如何去除android上a标签产生的边框</a> 》</p>
<h3 id="articleHeader16">9、WP系统a、input标签被点击时产生的半透明灰色背景怎么去掉</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta name=&quot;msapplication-tap-highlight&quot; content=&quot;no&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"msapplication-tap-highlight"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"no"</span>&gt;</span></code></pre>
<h3 id="articleHeader17">10、webkit表单元素的默认外观怎么重置</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".css{
    -webkit-appearance:none;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.css</span>{
    <span class="hljs-attribute">-webkit-appearance</span>:none;
}</code></pre>
<h3 id="articleHeader18">11、webkit表单输入框placeholder的颜色值能改变么</h3>
<p>答案是可以的，如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="input::-webkit-input-placeholder{color:#AAAAAA;}
input:focus::-webkit-input-placeholder{color:#EEEEEE;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">input</span><span class="hljs-selector-pseudo">::-webkit-input-placeholder</span>{<span class="hljs-attribute">color</span>:<span class="hljs-number">#AAAAAA</span>;}
<span class="hljs-selector-tag">input</span><span class="hljs-selector-pseudo">:focus</span><span class="hljs-selector-pseudo">::-webkit-input-placeholder</span>{<span class="hljs-attribute">color</span>:<span class="hljs-number">#EEEEEE</span>;}</code></pre>
<h3 id="articleHeader19">12、webkit表单输入框placeholder的文字能换行么</h3>
<p>ios可以，android不行~</p>
<p>在textarea标签下都可以换行~</p>
<h3 id="articleHeader20">13、IE10（winphone8）表单元素默认外观如何重置</h3>
<p><strong>禁用 select</strong> <strong>默认下拉箭头</strong></p>
<p>::-ms-expand 适用于表单选择控件下拉箭头的修改，有多个属性值，设置它隐藏 (display:none) 并使用背景图片来修饰可得到我们想要的效果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="select::-ms-expand {
display: none;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">select</span><span class="hljs-selector-pseudo">::-ms-expand</span> {
<span class="hljs-attribute">display</span>: none;
}</code></pre>
<p><strong>禁用 radio</strong> <strong>和 checkbox</strong> <strong>默认样式</strong></p>
<p>::-ms-check 适用于表单复选框或单选按钮默认图标的修改，同样有多个属性值，设置它隐藏 (display:none) 并使用背景图片来修饰可得到我们想要的效果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="input[type=radio]::-ms-check,input[type=checkbox]::-ms-check{
display: none;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type=radio]</span><span class="hljs-selector-pseudo">::-ms-check</span>,<span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type=checkbox]</span><span class="hljs-selector-pseudo">::-ms-check</span>{
<span class="hljs-attribute">display</span>: none;
}</code></pre>
<p><strong>禁用PC</strong> <strong>端表单输入框默认清除按钮</strong></p>
<p>当表单文本输入框输入内容后会显示文本清除按钮，::-ms-clear 适用于该清除按钮的修改，同样设置使它隐藏 (display:none) 并使用背景图片来修饰可得到我们想要的效果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="input[type=text]::-ms-clear,input[type=tel]::-ms-clear,input[type=number]::-ms-clear{
display: none;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type=text]</span><span class="hljs-selector-pseudo">::-ms-clear</span>,<span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type=tel]</span><span class="hljs-selector-pseudo">::-ms-clear</span>,<span class="hljs-selector-tag">input</span><span class="hljs-selector-attr">[type=number]</span><span class="hljs-selector-pseudo">::-ms-clear</span>{
<span class="hljs-attribute">display</span>: none;
}</code></pre>
<h3 id="articleHeader21">14、禁止iOS长按时触发系统的菜单，禁止iOS&amp;android长按时下载图片</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".css{-webkit-touch-callout: none}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-class">.css</span>{<span class="hljs-attribute">-webkit-touch-callout</span>: none}</code></pre>
<h3 id="articleHeader22">15、禁止iOS和android用户选中文字</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".css{-webkit-user-select:none}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-class">.css</span>{<span class="hljs-attribute">-webkit-user-select</span>:none}</code></pre>
<p>参考《 <a href="http://www.cnblogs.com/PeunZhang/p/3522603.html" rel="nofollow noreferrer" target="_blank">如何改变表单元素的外观(for Webkit and IE10)</a> 》</p>
<h3 id="articleHeader23">16、打电话发短信写邮件怎么实现</h3>
<ul><li><p>打电话</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a href=&quot;tel:0755-10086&quot;>打电话给:0755-10086</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"tel:0755-10086"</span>&gt;</span>打电话给:0755-10086<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<ul><li><p>发短信，winphone系统无效</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a href=&quot;sms:10086&quot;>发短信给: 10086</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"sms:10086"</span>&gt;</span>发短信给: 10086<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<ul><li><p>写邮件，可参考《 <a href="http://www.cnblogs.com/PeunZhang/p/4952783.html" rel="nofollow noreferrer" target="_blank">移动web页面给用户发送邮件的方法</a> 》</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a href=&quot;mailto:peun@foxmail.com&quot;>peun@foxmail.com</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"mailto:peun@foxmail.com"</span>&gt;</span>peun@foxmail.com<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<h3 id="articleHeader24">17、如何模拟按钮hover效果</h3>
<p>移动端触摸按钮的效果，可明示用户有些事情正要发生，是一个比较好体验，但是移动设备中并没有鼠标指针，使用css的hover并不能满足我们的需求，还好国外有个激活css的active效果，代码如下，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
<meta charset=&quot;utf-8&quot;>
<meta content=&quot;width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no&quot; name=&quot;viewport&quot;>
<meta content=&quot;yes&quot; name=&quot;apple-mobile-web-app-capable&quot;>
<meta content=&quot;black&quot; name=&quot;apple-mobile-web-app-status-bar-style&quot;>
<meta content=&quot;telephone=no&quot; name=&quot;format-detection&quot;>
<meta content=&quot;email=no&quot; name=&quot;format-detection&quot;>
<style type=&quot;text/css&quot;>
a {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}
.btn-blue{
    display:block;
    height:42px;
    line-height:42px;
    text-align:center;
    border-radius:4px;
    font-size:18px;
    color:#FFFFFF;
    background-color: #4185F3;
}
.btn-blue:active{
    background-color: #357AE8;
}
</style>
</head>
<body>

<div class=&quot;btn-blue&quot;>按钮</div>

<script type=&quot;text/javascript&quot;>
document.addEventListener(&quot;touchstart&quot;, function(){}, true)
</script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"yes"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"apple-mobile-web-app-capable"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"black"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"apple-mobile-web-app-status-bar-style"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"telephone=no"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"format-detection"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"email=no"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"format-detection"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
<span class="hljs-selector-tag">a</span> {
    <span class="hljs-attribute">-webkit-tap-highlight-color</span>: <span class="hljs-built_in">rgba</span>(0,0,0,0);
}
<span class="hljs-selector-class">.btn-blue</span>{
    <span class="hljs-attribute">display</span>:block;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">42px</span>;
    <span class="hljs-attribute">line-height</span>:<span class="hljs-number">42px</span>;
    <span class="hljs-attribute">text-align</span>:center;
    <span class="hljs-attribute">border-radius</span>:<span class="hljs-number">4px</span>;
    <span class="hljs-attribute">font-size</span>:<span class="hljs-number">18px</span>;
    <span class="hljs-attribute">color</span>:<span class="hljs-number">#FFFFFF</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#4185F3</span>;
}
<span class="hljs-selector-class">.btn-blue</span><span class="hljs-selector-pseudo">:active</span>{
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#357AE8</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn-blue"</span>&gt;</span>按钮<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
<span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">"touchstart"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{}, <span class="hljs-literal">true</span>)
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>兼容性ios5+、部分android 4+、winphone 8</p>
<p>要做到全兼容的办法，可通过绑定ontouchstart和ontouchend来控制按钮的类名</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
<meta charset=&quot;utf-8&quot;>
<meta content=&quot;width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no&quot; name=&quot;viewport&quot;>
<meta content=&quot;yes&quot; name=&quot;apple-mobile-web-app-capable&quot;>
<meta content=&quot;black&quot; name=&quot;apple-mobile-web-app-status-bar-style&quot;>
<meta content=&quot;telephone=no&quot; name=&quot;format-detection&quot;>
<meta content=&quot;email=no&quot; name=&quot;format-detection&quot;>
<style type=&quot;text/css&quot;>
a {
    -webkit-tap-highlight-color: rgba(0,0,0,0);
}
.btn-blue{
    display:block;
    height:42px;
    line-height:42px;
    text-align:center;
    border-radius:4px;
    font-size:18px;
    color:#FFFFFF;
    background-color: #4185F3;
}
.btn-blue-on{
    background-color: #357AE8;
}
</style>
</head>
<body>

<div class=&quot;btn-blue&quot;>按钮</div>

<script type=&quot;text/javascript&quot;>
var btnBlue = document.querySelector(&quot;.btn-blue&quot;);
btnBlue.ontouchstart = function(){
    this.className = &quot;btn-blue btn-blue-on&quot;
}
btnBlue.ontouchend = function(){
    this.className = &quot;btn-blue&quot;
}
</script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"yes"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"apple-mobile-web-app-capable"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"black"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"apple-mobile-web-app-status-bar-style"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"telephone=no"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"format-detection"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"email=no"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"format-detection"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="css">
<span class="hljs-selector-tag">a</span> {
    <span class="hljs-attribute">-webkit-tap-highlight-color</span>: <span class="hljs-built_in">rgba</span>(0,0,0,0);
}
<span class="hljs-selector-class">.btn-blue</span>{
    <span class="hljs-attribute">display</span>:block;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">42px</span>;
    <span class="hljs-attribute">line-height</span>:<span class="hljs-number">42px</span>;
    <span class="hljs-attribute">text-align</span>:center;
    <span class="hljs-attribute">border-radius</span>:<span class="hljs-number">4px</span>;
    <span class="hljs-attribute">font-size</span>:<span class="hljs-number">18px</span>;
    <span class="hljs-attribute">color</span>:<span class="hljs-number">#FFFFFF</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#4185F3</span>;
}
<span class="hljs-selector-class">.btn-blue-on</span>{
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#357AE8</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"btn-blue"</span>&gt;</span>按钮<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">var</span> btnBlue = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">".btn-blue"</span>);
btnBlue.ontouchstart = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.className = <span class="hljs-string">"btn-blue btn-blue-on"</span>
}
btnBlue.ontouchend = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.className = <span class="hljs-string">"btn-blue"</span>
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h3 id="articleHeader25">18、屏幕旋转的事件和样式</h3>
<ul><li><p><strong>事件</strong></p></li></ul>
<p><code>window.orientation</code> ，取值：正负90表示横屏模式、0和180表现为竖屏模式；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.onorientationchange = function(){
    switch(window.orientation){
        case -90:
        case 90:
        alert(&quot;横屏:&quot; + window.orientation);
        case 0:
        case 180:
        alert(&quot;竖屏:&quot; + window.orientation);
        break;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">window</span>.onorientationchange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">switch</span>(<span class="hljs-built_in">window</span>.orientation){
        <span class="hljs-keyword">case</span> <span class="hljs-number">-90</span>:
        <span class="hljs-keyword">case</span> <span class="hljs-number">90</span>:
        alert(<span class="hljs-string">"横屏:"</span> + <span class="hljs-built_in">window</span>.orientation);
        <span class="hljs-keyword">case</span> <span class="hljs-number">0</span>:
        <span class="hljs-keyword">case</span> <span class="hljs-number">180</span>:
        alert(<span class="hljs-string">"竖屏:"</span> + <span class="hljs-built_in">window</span>.orientation);
        <span class="hljs-keyword">break</span>;
    }
}</code></pre>
<ul><li><p><strong>样式</strong></p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//竖屏时使用的样式
@media all and (orientation:portrait) {
.css{}
}

//横屏时使用的样式
@media all and (orientation:landscape) {
.css{}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">//竖屏时使用的样式
@<span class="hljs-keyword">media</span> all and (orientation:portrait) {
<span class="hljs-selector-class">.css</span>{}
}

//横屏时使用的样式
@<span class="hljs-keyword">media</span> all and (orientation:landscape) {
<span class="hljs-selector-class">.css</span>{}
}</code></pre>
<h3 id="articleHeader26">19、audio元素和video元素在ios和andriod中无法自动播放</h3>
<p>应对方案：触屏即播</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$('html').one('touchstart',function(){
    audio.play()
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$(<span class="hljs-string">'html'</span>).one(<span class="hljs-string">'touchstart'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    audio.play()
})</code></pre>
<p>可参考《 <a href="http://www.cnblogs.com/PeunZhang/archive/2013/02/05/2893093.html" rel="nofollow noreferrer" target="_blank">无法自动播放的audio元素</a> 》</p>
<h3 id="articleHeader27">20、摇一摇功能</h3>
<p><code>HTML5 deviceMotion</code> ：封装了运动传感器数据的事件，可以获取手机运动状态下的运动加速度等数据。</p>
<p><a href="https://segmentfault.com/a/1190000003095883">HTML5晃动DeviceMotionEvent事件</a></p>
<h3 id="articleHeader28">21、手机拍照和上传图片</h3>
<p>使用 <code>&lt;input type=“file”&gt;</code> 的 <code>accept </code> 属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 选择照片 -->
<input type=file accept=&quot;image/*&quot;>
<!-- 选择视频 -->
<input type=file accept=&quot;video/*&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 选择照片 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">file</span> <span class="hljs-attr">accept</span>=<span class="hljs-string">"image/*"</span>&gt;</span>
<span class="hljs-comment">&lt;!-- 选择视频 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">file</span> <span class="hljs-attr">accept</span>=<span class="hljs-string">"video/*"</span>&gt;</span></code></pre>
<p>使用总结：</p>
<ul>
<li><p>ios 有拍照、录像、选取本地图片功能</p></li>
<li><p>部分android只有选取本地图片功能</p></li>
<li><p>winphone不支持</p></li>
<li><p>input控件默认外观丑陋</p></li>
</ul>
<h3 id="articleHeader29">22、微信浏览器用户调整字体大小后页面变矬了，怎么阻止用户调整</h3>
<p><strong>原理</strong> ：</p>
<ul>
<li><p>android侧是复写了 <code>layoutinflater</code> 对 <code>textview</code> 做了统一处理</p></li>
<li><p>ios侧是修改了 <code>body.style.webkitTextSizeAdjust</code> 值</p></li>
</ul>
<p><strong>解决方案</strong> ：</p>
<ul><li><p>android使用以下代码，该接口只在微信浏览器下有效</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 页面加入这段代码可使Android机器页面不再受到用户字体缩放强制改变大小
 * 但是会有一个1秒左右的延迟，期间可以考虑通过loading展示
 * 仅供参考
 */
(function(){
    if (typeof(WeixinJSBridge) == &quot;undefined&quot;) {
        document.addEventListener(&quot;WeixinJSBridgeReady&quot;, function (e) {
            setTimeout(function(){
                WeixinJSBridge.invoke('setFontSizeCallback',{&quot;fontSize&quot;:0}, function(res) {
                    alert(JSON.stringify(res));
                });
            },0);
        });
    } else {
        setTimeout(function(){
            WeixinJSBridge.invoke('setFontSizeCallback',{&quot;fontSize&quot;:0}, function(res) {
                alert(JSON.stringify(res));
            });
        },0);
    }
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 页面加入这段代码可使Android机器页面不再受到用户字体缩放强制改变大小
 * 但是会有一个1秒左右的延迟，期间可以考虑通过loading展示
 * 仅供参考
 */</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span>(WeixinJSBridge) == <span class="hljs-string">"undefined"</span>) {
        <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">"WeixinJSBridgeReady"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
            setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                WeixinJSBridge.invoke(<span class="hljs-string">'setFontSizeCallback'</span>,{<span class="hljs-string">"fontSize"</span>:<span class="hljs-number">0</span>}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>) </span>{
                    alert(<span class="hljs-built_in">JSON</span>.stringify(res));
                });
            },<span class="hljs-number">0</span>);
        });
    } <span class="hljs-keyword">else</span> {
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
            WeixinJSBridge.invoke(<span class="hljs-string">'setFontSizeCallback'</span>,{<span class="hljs-string">"fontSize"</span>:<span class="hljs-number">0</span>}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res</span>) </span>{
                alert(<span class="hljs-built_in">JSON</span>.stringify(res));
            });
        },<span class="hljs-number">0</span>);
    }
})();</code></pre>
<ul><li><p>ios使用 <code>-webkit-text-size-adjust</code> 禁止调整字体大小</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body{-webkit-text-size-adjust: 100%!important;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">body</span>{<span class="hljs-attribute">-webkit-text-size-adjust</span>: <span class="hljs-number">100%</span><span class="hljs-meta">!important</span>;}</code></pre>
<ul><li><p>最好的解决方案：</p></li></ul>
<p><em>整个页面用rem或者百分比布局</em></p>
<h3 id="articleHeader30">23、消除transition闪屏</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".css{
/*设置内嵌的元素在 3D 空间如何呈现：保留 3D*/
-webkit-transform-style: preserve-3d;
/*（设置进行转换的元素的背面在面对用户时是否可见：隐藏）*/
-webkit-backface-visibility: hidden;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.css</span>{
<span class="hljs-comment">/*设置内嵌的元素在 3D 空间如何呈现：保留 3D*/</span>
<span class="hljs-attribute">-webkit-transform-style</span>: preserve-<span class="hljs-number">3</span>d;
<span class="hljs-comment">/*（设置进行转换的元素的背面在面对用户时是否可见：隐藏）*/</span>
<span class="hljs-attribute">-webkit-backface-visibility</span>: hidden;
}</code></pre>
<h3 id="articleHeader31">24、开启硬件加速</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".css {
   -webkit-transform: translate3d(0, 0, 0);
   -moz-transform: translate3d(0, 0, 0);
   -ms-transform: translate3d(0, 0, 0);
   transform: translate3d(0, 0, 0);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.css</span> {
   <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">translate3d</span>(0, 0, 0);
   <span class="hljs-attribute">-moz-transform</span>: <span class="hljs-built_in">translate3d</span>(0, 0, 0);
   <span class="hljs-attribute">-ms-transform</span>: <span class="hljs-built_in">translate3d</span>(0, 0, 0);
   <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(0, 0, 0);
}</code></pre>
<p>参考《 <a href="http://www.cnblogs.com/PeunZhang/p/3510083.html" rel="nofollow noreferrer" target="_blank">用CSS开启硬件加速来提高网站性能</a> 》</p>
<h3 id="articleHeader32">25、取消input在ios下，输入的时候英文首字母的默认大写</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input autocapitalize=&quot;off&quot; autocorrect=&quot;off&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">autocapitalize</span>=<span class="hljs-string">"off"</span> <span class="hljs-attr">autocorrect</span>=<span class="hljs-string">"off"</span> /&gt;</span></code></pre>
<h3 id="articleHeader33">26、android 上去掉语音输入按钮</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="input::-webkit-input-speech-button {display: none}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">input</span><span class="hljs-selector-pseudo">::-webkit-input-speech-button</span> {<span class="hljs-attribute">display</span>: none}</code></pre>
<h3 id="articleHeader34">27、android 2.3 的一些bug</h3>
<ul>
<li><p><code>@-webkit-keyframes</code>  需要以0%开始100%结束，0%的百分号不能去掉</p></li>
<li><p><code>after</code> 和 <code>before</code> 伪类无法使用动画 <code>animation</code></p></li>
<li><p><code>border-radius</code> 不支持%单位</p></li>
<li><p><code>translate</code> 百分比的写法和 <code>scale</code> 在一起会导致失效，例如 <code>-webkit-transform: translate(-50%,-50%) scale(-0.5, 1)</code></p></li>
</ul>
<h3 id="articleHeader35">28、android 4.x 的一些bug</h3>
<ul>
<li><p>三星 Galaxy S4中自带浏览器不支持 <code>border-radius</code> 缩写</p></li>
<li><p>同时设置 <code>border-radius</code> 和背景色的时候，背景色会溢出到圆角以外部分</p></li>
<li><p>部分手机(如三星)，a链接支持鼠标 <code>:visited</code> 事件，也就是说链接访问后文字变为紫色</p></li>
<li><p>android无法同时播放多音频audio</p></li>
</ul>
<p>参考《 <a href="https://github.com/yisibl/blog/issues/2" rel="nofollow noreferrer" target="_blank">border-radius 移动之伤</a> 》</p>
<h3 id="articleHeader36">29、设计高性能CSS3动画的几个要素</h3>
<ul>
<li><p>尽可能地使用合成属性 <code>transform</code> 和 <code>opacity</code> 来设计CSS3动画，不使用 <code>position</code> 的left和top来定位</p></li>
<li><p>利用 <code>translate3D</code> 开启GPU加速</p></li>
</ul>
<p>参考《 <a href="http://www.html5rocks.com/en/tutorials/speed/high-performance-animations/" rel="nofollow noreferrer" target="_blank">High Performance Animations</a> 》</p>
<h3 id="articleHeader37">29、fixed 属性 bug</h3>
<ul>
<li><p>ios下fixed元素容易定位出错，软键盘弹出时，影响fixed元素定位</p></li>
<li><p>android下fixed表现要比iOS更好，软键盘弹出时，不会影响fixed元素定位</p></li>
<li><p>ios4下不支持position:fixed</p></li>
</ul>
<p>解决方案</p>
<ul><li><p>可用isroll.js，暂无完美方案</p></li></ul>
<p>《 <a href="https://github.com/maxzhang/maxzhang.github.com/issues/2" rel="nofollow noreferrer" target="_blank">移动端web页面使用position:fixed问题总结</a> 》</p>
<p>《 <a href="http://www.cnblogs.com/PeunZhang/archive/2013/06/14/3117589.html" rel="nofollow noreferrer" target="_blank">使用iScroll.js解决ios4下不支持position:fixed的问题</a> 》</p>
<h3 id="articleHeader38">30、如何阻止windows Phone的默认触摸事件</h3>
<p>winphone下默认触摸事件事件使用e.preventDefault是无效的</p>
<p>目前解决方法是使用样式来禁用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html{-ms-touch-action: none;}/* 禁止winphone默认触摸事件 */" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">html</span>{<span class="hljs-attribute">-ms-touch-action</span>: none;}<span class="hljs-comment">/* 禁止winphone默认触摸事件 */</span></code></pre>
<p>《 <a href="http://stackoverflow.com/questions/13396297/windows-phone-8-touch-support" rel="nofollow noreferrer" target="_blank">Windows phone 8 touch support</a> 》</p>
<h3 id="articleHeader39">31、播放视频如何不自动全屏</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--
1.目前只有ios7+、winphone8+支持自动播放
2.支持Airplay的设备（如：音箱、Apple TV)播放
x-webkit-airplay=&quot;true&quot; 
3.播放视频不全屏，ios7+、winphone8+支持，部分android4+支持（含华为、小米、魅族）
webkit-playsinline=&quot;true&quot; 
-->
<video x-webkit-airplay=&quot;true&quot; webkit-playsinline=&quot;true&quot; preload=&quot;auto&quot; autoplay src=&quot;http://&quot;></video>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!--
1.目前只有ios7+、winphone8+支持自动播放
2.支持Airplay的设备（如：音箱、Apple TV)播放
x-webkit-airplay="true" 
3.播放视频不全屏，ios7+、winphone8+支持，部分android4+支持（含华为、小米、魅族）
webkit-playsinline="true" 
--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">video</span> <span class="hljs-attr">x-webkit-airplay</span>=<span class="hljs-string">"true"</span> <span class="hljs-attr">webkit-playsinline</span>=<span class="hljs-string">"true"</span> <span class="hljs-attr">preload</span>=<span class="hljs-string">"auto"</span> <span class="hljs-attr">autoplay</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">video</span>&gt;</span></code></pre>
<h3 id="articleHeader40">32、微信内置浏览器里面多行截断有时生效有时无效</h3>
<ul><li><p>解决方案：</p></li></ul>
<p><strong>暂时无解</strong> ，应该是微信bug</p>
<ul><li><p>折中方案：</p></li></ul>
<p>为段落设置好高度和 <code>overflow:hidden</code> ，保证截断没生效时不会导致文档混乱</p>
<h3 id="articleHeader41">33、部分版本浏览器内 <code>margin</code> 不生效</h3>
<ul><li><p>解决方案：</p></li></ul>
<p>尽量使用 <code>padding</code></p>
<h2 id="articleHeader42">三、常用的移动端框架</h2>
<h3 id="articleHeader43">1、zepto.js</h3>
<p>语法与jquery几乎一样，会jquery基本会zepto~</p>
<p>官网： <a href="http://zeptojs.com/" rel="nofollow noreferrer" target="_blank">http://zeptojs.com/</a></p>
<p>中文(非官网)： <a href="http://www.css88.com/doc/zeptojs_api/" rel="nofollow noreferrer" target="_blank">http://www.css88.com/doc/zeptojs_api/</a></p>
<p>常使用的扩展模块：</p>
<p>浏览器检测： <a href="https://github.com/madrobby/zepto/blob/master/src/detect.js" rel="nofollow noreferrer" target="_blank">https://github.com/madrobby/zepto/blob/master/src/detect.js</a></p>
<p>tap事件： <a href="https://github.com/madrobby/zepto/blob/master/src/touch.js" rel="nofollow noreferrer" target="_blank">https://github.com/madrobby/zepto/blob/master/src/touch.js</a></p>
<h3 id="articleHeader44">2、iscroll.js</h3>
<p>解决页面不支持弹性滚动，不支持fixed引起的问题~</p>
<p>实现下拉刷新，滑屏，缩放等功能~</p>
<p>官网： <a href="http://cubiq.org/iscroll-5" rel="nofollow noreferrer" target="_blank">http://cubiq.org/iscroll-5</a></p>
<h3 id="articleHeader45">3、underscore.js</h3>
<p>该库提供了一整套函数式编程的实用功能，但是没有扩展任何JavaScript内置对象。</p>
<p>官网： <a href="http://underscorejs.org/" rel="nofollow noreferrer" target="_blank">http://underscorejs.org/</a></p>
<h3 id="articleHeader46">4、滑屏框架</h3>
<p>适合上下滑屏、左右滑屏等滑屏切换页面的效果</p>
<ul>
<li><p><a href="https://github.com/peunzhang/slip.js" rel="nofollow noreferrer" target="_blank">slip.js</a></p></li>
<li><p><a href="https://github.com/peunzhang/iSlider" rel="nofollow noreferrer" target="_blank">iSlider.js</a></p></li>
<li><p><a href="https://github.com/peunzhang/fullpage" rel="nofollow noreferrer" target="_blank">fullpage.js</a></p></li>
<li><p><a href="http://www.swiper.com.cn/" rel="nofollow noreferrer" target="_blank">swiper.js</a></p></li>
</ul>
<h3 id="articleHeader47">5、flex布局</h3>
<p>flex布局目前可使用在移动中，并非所有的语法都全兼容，建议做好充分测试，我使用过程中遇到过一些flex布局在安卓UC浏览器，iOS7的safari失效的问题~</p>
<p><strong>建议尽量使用-webkit-box</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* ============================================================
   flex：定义布局为盒模型
   flex-v：盒模型垂直布局
   flex-1：子元素占据剩余的空间
   flex-align-center：子元素垂直居中
   flex-pack-center：子元素水平居中
   flex-pack-justify：子元素两端对齐
   兼容性：ios 4+、android 2.3+、winphone8+
   ============================================================ */
.flex{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;}
.flex-v{-webkit-box-orient:vertical;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;}
.flex-1{-webkit-box-flex:1;-webkit-flex:1;-ms-flex:1;flex:1;}
.flex-align-center{-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;}
.flex-pack-center{-webkit-box-pack:center;-webkit-justify-content:center;-ms-flex-pack:center;justify-content:center;}
.flex-pack-justify{-webkit-box-pack:justify;-webkit-justify-content:space-between;-ms-flex-pack:justify;justify-content:space-between;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* ============================================================
   flex：定义布局为盒模型
   flex-v：盒模型垂直布局
   flex-1：子元素占据剩余的空间
   flex-align-center：子元素垂直居中
   flex-pack-center：子元素水平居中
   flex-pack-justify：子元素两端对齐
   兼容性：ios 4+、android 2.3+、winphone8+
   ============================================================ */</span>
<span class="hljs-selector-class">.flex</span>{<span class="hljs-attribute">display</span>:-webkit-box;<span class="hljs-attribute">display</span>:-webkit-flex;<span class="hljs-attribute">display</span>:-ms-flexbox;<span class="hljs-attribute">display</span>:flex;}
<span class="hljs-selector-class">.flex-v</span>{<span class="hljs-attribute">-webkit-box-orient</span>:vertical;<span class="hljs-attribute">-webkit-flex-direction</span>:column;<span class="hljs-attribute">-ms-flex-direction</span>:column;<span class="hljs-attribute">flex-direction</span>:column;}
<span class="hljs-selector-class">.flex-1</span>{<span class="hljs-attribute">-webkit-box-flex</span>:<span class="hljs-number">1</span>;<span class="hljs-attribute">-webkit-flex</span>:<span class="hljs-number">1</span>;<span class="hljs-attribute">-ms-flex</span>:<span class="hljs-number">1</span>;<span class="hljs-attribute">flex</span>:<span class="hljs-number">1</span>;}
<span class="hljs-selector-class">.flex-align-center</span>{<span class="hljs-attribute">-webkit-box-align</span>:center;<span class="hljs-attribute">-webkit-align-items</span>:center;<span class="hljs-attribute">-ms-flex-align</span>:center;<span class="hljs-attribute">align-items</span>:center;}
<span class="hljs-selector-class">.flex-pack-center</span>{<span class="hljs-attribute">-webkit-box-pack</span>:center;<span class="hljs-attribute">-webkit-justify-content</span>:center;<span class="hljs-attribute">-ms-flex-pack</span>:center;<span class="hljs-attribute">justify-content</span>:center;}
<span class="hljs-selector-class">.flex-pack-justify</span>{<span class="hljs-attribute">-webkit-box-pack</span>:justify;<span class="hljs-attribute">-webkit-justify-content</span>:space-between;<span class="hljs-attribute">-ms-flex-pack</span>:justify;<span class="hljs-attribute">justify-content</span>:space-between;}</code></pre>
<p>使用注意：</p>
<ul>
<li><p>flex下的子元素必须为块级元素，非块级元素在android2.3机器下flex失效</p></li>
<li><p>flex下的子元素宽度和高度不能超过父元素，否则会导致子元素定位错误，例如水平垂直居中</p></li>
</ul>
<p>参考：</p>
<p><a href="http://the-echoplex.net/flexyboxes/" rel="nofollow noreferrer" target="_blank">flexyboxes</a></p>
<p><a href="http://www.w3cplus.com/css3/old-flexbox-and-new-flexbox.html" rel="nofollow noreferrer" target="_blank">“老”的Flexbox和“新”的Flexbox</a></p>
<p><a href="http://www.w3cplus.com/css3/advanced-cross-browser-flexbox.html" rel="nofollow noreferrer" target="_blank">跨浏览器的Flexbox</a></p>
<h3 id="articleHeader48">6、FastClick</h3>
<p>消除在移动浏览器上触发click事件与一个物理Tap(敲击)之间的300ms延迟</p>
<p>参考《 <a href="https://github.com/ftlabs/fastclick" rel="nofollow noreferrer" target="_blank">FastClick</a> 》</p>
<h3 id="articleHeader49">7、Sea.js</h3>
<p>提供简单、极致的模块化开发体验</p>
<ul>
<li><p><strong>简单友好的模块定义规范</strong> ：Sea.js 遵循&nbsp; <a href="https://github.com/cmdjs/specification/blob/master/draft/module.md" rel="nofollow noreferrer" target="_blank">CMD</a> &nbsp;规范，可以像&nbsp; <a href="http://nodejs.org/" rel="nofollow noreferrer" target="_blank">Node.js</a> &nbsp;一般书写模块代码。</p></li>
<li><p><strong>自然直观的代码组织方式</strong> ：依赖的自动加载、配置的简洁清晰，可以让我们更多地享受编码的乐趣。</p></li>
</ul>
<p>地址： <a href="http://seajs.org/docs/" rel="nofollow noreferrer" target="_blank">http://seajs.org/docs/</a></p>
<h2 id="articleHeader50">四、阿里移动Web开发经验谈</h2>
<p>偶然发现的阿里移动Web开发经验，写得非常全面，很值得收藏</p>
<p><a href="http://am-team.github.io/amg/dev-exp-doc.html" rel="nofollow noreferrer" target="_blank">无线Web开发经验谈 | AM - 移动Web开放解决方案</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
第六天 移动端Web开发注意事项

## 原文链接
[https://segmentfault.com/a/1190000007574023](https://segmentfault.com/a/1190000007574023)

