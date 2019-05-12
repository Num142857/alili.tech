---
title: '移动端rem自适应布局(切图)' 
date: 2019-02-01 2:30:10
hidden: true
slug: rljo49vbjj
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>简介：</strong><br>本篇适用于初次使用rem为单位切图而无从下手的童鞋。核心是根据屏幕动态改变根元素字体大小，以达到适配各种屏幕。这只是一个拿来就用的教程。很多东西没有详细说明。不过对于快速做手机端切图很有帮助。</p>
<p><strong>模板</strong>：<a href="https://github.com/cainiubi/mobile_rem_750px" rel="nofollow noreferrer" target="_blank">Github</a> </p>
<p><strong>使用</strong>：<br>1.下载完成后首先修改js文件中的基本单位：psd宽度是640就写640，是750就写750.现在的设计稿大部分是以iphone 6 为基准设计的，也就是750px。<br><span class="img-wrap"><img data-src="/img/bVEG69?w=680&amp;h=336" src="https://static.alili.tech/img/bVEG69?w=680&amp;h=336" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>2.切图时，我们以100px为基本单位（<em>至于为什么是100px，自己看看我的js代码就知道了</em>），每个元素的宽高，字体等等就直接用rem来写，不用执行减半等操作，设计稿是多少就写多少。下面是一张750px的设计稿</p>
<p>图中那个690px*336PX元素css样式如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box{
    width: 6.9rem;
    height: 3.36rem;
    margin: 0 auto;
    background: #ffffff;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.box</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">6.9rem</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">3.36rem</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#ffffff</span>;
}</code></pre>
<p>因为我们用了动态改变根字体大小，所以.box会自动适应各种屏幕。现在我们就可以愉快的切图了。<br>使用方法就这么简单。其中最重要的就是那段js代码。。后面的文字，想看的就看看吧。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   3.这句是废话，如果你够牛逼就可以直接用px来写各个元素的宽高，字体等等，之后直接用sass或者less转换成rem就行了。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code style="word-break: break-word; white-space: initial;">   <span class="hljs-number">3</span>.这句是废话，如果你够牛逼就可以直接用px来写各个元素的宽高，字体等等，之后直接用sass或者less转换成<span class="hljs-keyword">rem</span>就行了。</code></pre>
<p>4.调试时记得把浏览器默认最小字体设置为最小。手机端是支持12px以下的字体的。<br><span class="img-wrap"><img data-src="/img/bVEJtL?w=583&amp;h=607" src="https://static.alili.tech/img/bVEJtL?w=583&amp;h=607" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVEJtS?w=813&amp;h=348" src="https://static.alili.tech/img/bVEJtS?w=813&amp;h=348" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVEJt5?w=575&amp;h=602" src="https://static.alili.tech/img/bVEJt5?w=575&amp;h=602" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>5.对于不是750px的设计稿，我们其实是可以将其等比缩放到750px的<br><span class="img-wrap"><img data-src="/img/bVEJHO?w=368&amp;h=455" src="https://static.alili.tech/img/bVEJHO?w=368&amp;h=455" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVEJHW?w=644&amp;h=328" src="https://static.alili.tech/img/bVEJHW?w=644&amp;h=328" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><strong>说明：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="一、头部加入最常用的meta内容
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>一、头部加入最常用的<span class="hljs-keyword">meta</span>内容
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <meta name=&quot;viewport&quot; content=&quot;width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no,minimal-ui&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">    &lt;meta <span class="hljs-built_in">name</span>=<span class="hljs-string">"viewport"</span> content=<span class="hljs-string">"width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no,minimal-ui"</span>&gt;</code></pre>
<p>width viewport的宽度<br>initial-scale 初始化缩放比例<br>minimum-scale 最小缩放比例<br>maxinum-scale 最大缩放比例<br>user-scalable 用户是否可以缩放<br>minimal-ui ios7以上隐藏浏览器导航栏<br>具体关于viewport的说明请看<a href="http://www.imooc.com/video/9669" rel="nofollow noreferrer" target="_blank">慕课网</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="二、css样式重置" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">二、css样式重置</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
button,article, aside, canvas, details, embed, figure,
figcaption, footer, header, hgroup, menu, nav,
output, ruby, section, summary, time, mark,
audio, video {
     margin: 0;
    padding: 0;
    border: 0;
    vertical-align: baseline;
    background: transparent;
    outline: none;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section { display: block; }
ol, ul { list-style: none; }
button{background: transparent;}
blockquote, q { quotes: none; }
blockquote:before, blockquote:after, q:before, q:after { content: ''; content: none; }
strong { font-weight: bold; }
table { border-collapse: collapse; border-spacing: 0; }
img { border: 0; max-width: 100%; }
html{
    line-height: initial;
}
body{
    font-size: 0.32rem;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">html</span>, <span class="hljs-selector-tag">body</span>, <span class="hljs-selector-tag">div</span>, <span class="hljs-selector-tag">span</span>, applet, <span class="hljs-selector-tag">object</span>, <span class="hljs-selector-tag">iframe</span>,
<span class="hljs-selector-tag">h1</span>, <span class="hljs-selector-tag">h2</span>, <span class="hljs-selector-tag">h3</span>, <span class="hljs-selector-tag">h4</span>, <span class="hljs-selector-tag">h5</span>, <span class="hljs-selector-tag">h6</span>, <span class="hljs-selector-tag">p</span>, <span class="hljs-selector-tag">blockquote</span>, pre,
<span class="hljs-selector-tag">a</span>, <span class="hljs-selector-tag">abbr</span>, acronym, <span class="hljs-selector-tag">address</span>, big, <span class="hljs-selector-tag">cite</span>, <span class="hljs-selector-tag">code</span>,
<span class="hljs-selector-tag">del</span>, <span class="hljs-selector-tag">dfn</span>, <span class="hljs-selector-tag">em</span>, <span class="hljs-selector-tag">img</span>, <span class="hljs-selector-tag">ins</span>, <span class="hljs-selector-tag">kbd</span>, <span class="hljs-selector-tag">q</span>, s, <span class="hljs-selector-tag">samp</span>,
small, strike, <span class="hljs-selector-tag">strong</span>, sub, <span class="hljs-selector-tag">sup</span>, tt, <span class="hljs-selector-tag">var</span>,
<span class="hljs-selector-tag">b</span>, u, <span class="hljs-selector-tag">i</span>, center,
<span class="hljs-selector-tag">dl</span>, <span class="hljs-selector-tag">dt</span>, <span class="hljs-selector-tag">dd</span>, <span class="hljs-selector-tag">ol</span>, <span class="hljs-selector-tag">ul</span>, <span class="hljs-selector-tag">li</span>,
<span class="hljs-selector-tag">fieldset</span>, <span class="hljs-selector-tag">form</span>, <span class="hljs-selector-tag">label</span>, <span class="hljs-selector-tag">legend</span>,
<span class="hljs-selector-tag">table</span>, <span class="hljs-selector-tag">caption</span>, <span class="hljs-selector-tag">tbody</span>, <span class="hljs-selector-tag">tfoot</span>, <span class="hljs-selector-tag">thead</span>, <span class="hljs-selector-tag">tr</span>, <span class="hljs-selector-tag">th</span>, <span class="hljs-selector-tag">td</span>,
<span class="hljs-selector-tag">button</span>,<span class="hljs-selector-tag">article</span>, <span class="hljs-selector-tag">aside</span>, <span class="hljs-selector-tag">canvas</span>, <span class="hljs-selector-tag">details</span>, embed, <span class="hljs-selector-tag">figure</span>,
<span class="hljs-selector-tag">figcaption</span>, <span class="hljs-selector-tag">footer</span>, <span class="hljs-selector-tag">header</span>, <span class="hljs-selector-tag">hgroup</span>, <span class="hljs-selector-tag">menu</span>, <span class="hljs-selector-tag">nav</span>,
output, ruby, <span class="hljs-selector-tag">section</span>, <span class="hljs-selector-tag">summary</span>, <span class="hljs-selector-tag">time</span>, <span class="hljs-selector-tag">mark</span>,
<span class="hljs-selector-tag">audio</span>, <span class="hljs-selector-tag">video</span> {
     <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">vertical-align</span>: baseline;
    <span class="hljs-attribute">background</span>: transparent;
    <span class="hljs-attribute">outline</span>: none;
    -webkit-<span class="hljs-attribute">box-sizing</span>: border-box;
    -moz-<span class="hljs-attribute">box-sizing</span>: border-box;
    <span class="hljs-attribute">box-sizing</span>: border-box;
}
<span class="hljs-selector-tag">article</span>, <span class="hljs-selector-tag">aside</span>, <span class="hljs-selector-tag">details</span>, <span class="hljs-selector-tag">figcaption</span>, <span class="hljs-selector-tag">figure</span>, <span class="hljs-selector-tag">footer</span>, <span class="hljs-selector-tag">header</span>, <span class="hljs-selector-tag">hgroup</span>, <span class="hljs-selector-tag">menu</span>, <span class="hljs-selector-tag">nav</span>, <span class="hljs-selector-tag">section</span> { <span class="hljs-attribute">display</span>: block; }
<span class="hljs-selector-tag">ol</span>, <span class="hljs-selector-tag">ul</span> { <span class="hljs-attribute">list-style</span>: none; }
button{<span class="hljs-attribute">background</span>: transparent;}
<span class="hljs-selector-tag">blockquote</span>, <span class="hljs-selector-tag">q</span> { <span class="hljs-attribute">quotes</span>: none; }
<span class="hljs-selector-tag">blockquote</span>:before, <span class="hljs-selector-tag">blockquote</span>:after, <span class="hljs-selector-tag">q</span>:before, <span class="hljs-selector-tag">q</span>:after { <span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>; <span class="hljs-attribute">content</span>: none; }
<span class="hljs-selector-tag">strong</span> { <span class="hljs-attribute">font-weight</span>: bold; }
<span class="hljs-selector-tag">table</span> { <span class="hljs-attribute">border-collapse</span>: collapse; <span class="hljs-attribute">border-spacing</span>: <span class="hljs-number">0</span>; }
<span class="hljs-selector-tag">img</span> { <span class="hljs-attribute">border</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">max-width</span>: <span class="hljs-number">100%</span>; }
html{
    <span class="hljs-attribute">line-height</span>: initial;
}
body{
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0.32rem</span>;
}
</code></pre>
<p><strong>特别注意下面这段代码必不可少。</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html{
    line-height: initial;
}
body{
    font-size: 0.32rem;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">html</span>{
    <span class="hljs-attribute">line-height</span>: initial;
}
<span class="hljs-selector-tag">body</span>{
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">0.32rem</span>;
}</code></pre>
<p>是为了解决我们由js动态设置html字体过大时，他的line-height对子孙元素的不良影响，请自行体会。<br><strong>重要</strong>三、引入动态改变根节点字体大小的js文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(doc, win) {
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function() {
            var clientWidth = docEl.clientWidth;
            if (!clientWidth) return;
            if (clientWidth >= 750) {
                docEl.style.fontSize = '100px';
            } else {
                docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
            }
        };

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
    doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scheme"><code>(<span class="hljs-name">function</span>(<span class="hljs-name">doc</span>, win) {
    var docEl = doc.documentElement,
        resizeEvt = <span class="hljs-symbol">'orientationchange</span>' in window ? <span class="hljs-symbol">'orientationchange</span>' : <span class="hljs-symbol">'resize</span>',
        recalc = function() {
            var clientWidth = docEl.clientWidth<span class="hljs-comment">;</span>
            if (<span class="hljs-name">!clientWidth</span>) return<span class="hljs-comment">;</span>
            if (<span class="hljs-name">clientWidth</span> &gt;= <span class="hljs-number">750</span>) {
                docEl.style.fontSize = <span class="hljs-symbol">'100px</span>'<span class="hljs-comment">;</span>
            } else {
                docEl.style.fontSize = <span class="hljs-number">100</span> * (<span class="hljs-name">clientWidth</span> / <span class="hljs-number">750</span>) + <span class="hljs-symbol">'px</span>'<span class="hljs-comment">;</span>
            }
        }<span class="hljs-comment">;</span>

    if (<span class="hljs-name">!doc.addEventListener</span>) return<span class="hljs-comment">;</span>
    win.addEventListener(<span class="hljs-name">resizeEvt</span>, recalc, false)<span class="hljs-comment">;</span>
    doc.addEventListener(<span class="hljs-symbol">'DOMContentLoaded</span>', recalc, false)<span class="hljs-comment">;</span>
})(<span class="hljs-name">document</span>, window)<span class="hljs-comment">;</span>
</code></pre>
<p>这是rem布局的核心代码，这段代码的大意是：</p>
<p>如果页面的宽度超过了750px，那么页面中html的font-size恒为100px，否则，页面中html的font-size的大小为： 100 * (当前页面宽度 / 750)。<br>我们刚开始切图时，如果在手机端使用固定宽高px，那么我们的宽高都要减半，以上图的设计稿为例，使用固定px时的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box{
    width: 345px;
    height: 168px;
    margin: 0 auto;
    background: #ffffff;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.box</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">345px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">168px</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#ffffff</span>;
}</code></pre>
<p>使用rem时的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box{
    width: 6.9rem;
    height: 3.36rem;
    margin: 0 auto;
    background: #ffffff;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.box</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">6.9rem</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">3.36rem</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#ffffff</span>;
}</code></pre>
<p>对应公式，我们的iPhone 6 是375px宽度，所以此时的字体为50px。自己算一算是不是和减半的效果一样。<br><span class="img-wrap"><img data-src="/img/bVEJkE?w=872&amp;h=189" src="https://static.alili.tech/img/bVEJkE?w=872&amp;h=189" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>我们在切图时，自己根据设计稿设置是640px宽度或者750px宽度或者其他的</strong><br>四、移动端还有好多解决体验性问题的东西。可以看看<a href="http://liuyy.coding.me/2016/05/14/webapp/webapp_mobile_page/?utm_source=tuicool&amp;utm_medium=referral" rel="nofollow noreferrer" target="_blank">这个</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
移动端rem自适应布局(切图)

## 原文链接
[https://segmentfault.com/a/1190000007276635](https://segmentfault.com/a/1190000007276635)

