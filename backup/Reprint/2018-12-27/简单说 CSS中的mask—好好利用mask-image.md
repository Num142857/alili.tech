---
title: '简单说 CSS中的mask—好好利用mask-image' 
date: 2018-12-27 2:30:12
hidden: true
slug: fwek3ik8slk
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">说明</h3>
<p>CSS中的mask属性允许用户屏蔽或剪裁特定点的图像来实现，部分或完全隐藏某个元素的可见性。  <br>好吧，这个概念可能有点不好理解，先看图。   </p>
<p><span class="img-wrap"><img data-src="/img/bVXPSW?w=919&amp;h=136" src="https://static.alili.tech/img/bVXPSW?w=919&amp;h=136" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>看了这个等式，似乎明白点什么了吧，朋友们，第一张图就是一张普通的图，第二张图，黑色部分是不透明的，白色部分是透明的，用上mask之后，两张图重叠，黑色区域中的会显示出来，白色区域不显示。   </p>
<p>用过ps的朋友，应该很清楚，蒙版这东西，这就和蒙版很像，好吧，没用过ps的朋友，又要问蒙版是什么了，相信看完这篇文章，你应该连蒙版也知道了。   </p>
<p>mask和background用法是相仿的，mask的值有这些</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mask-clip
mask-composite
mask-image
mask-mode
mask-origin
mask-position
mask-repeat
mask-size
mask-type" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">mask</span>-<span class="hljs-attribute">clip</span>
<span class="hljs-attribute">mask</span>-composite
<span class="hljs-attribute">mask</span>-image
<span class="hljs-attribute">mask</span>-mode
<span class="hljs-attribute">mask</span>-origin
<span class="hljs-attribute">mask</span>-<span class="hljs-attribute">position</span>
<span class="hljs-attribute">mask</span>-repeat
<span class="hljs-attribute">mask</span>-size
<span class="hljs-attribute">mask</span>-type</code></pre>
<p>具体细节参考这里：<br><a href="http://www.runoob.com/cssref/css3-pr-background.html" rel="nofollow noreferrer" target="_blank">CSS background 属性</a>   <br><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/mask" rel="nofollow noreferrer" target="_blank">CSS mask 属性</a></p>
<h3 id="articleHeader1">解释</h3>
<p>由于目前，只有webkit内核的浏览器支持mask属性，所以考虑到兼容性的话，用mask属性的时候还是要想想的。  </p>
<p>今天我们主要说说 mask-image，这个比较有意思，这两个单词翻译过来就是，面具 图片，的确很形象，真的就像是给元素带上一个面具一样。   <br>我们直接上代码，把上面提到那个等式，实现一下，顺便说一句，mask-image  和 background-image 一样，不仅可以取值是 图片路径，也可以是渐变色。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!doctype html>
<html lang=&quot;en&quot;>
 <head>
  <meta charset=&quot;UTF-8&quot;>

  <style>
    .mask{
        width:475px;
        height:260px;
        background-image:url(&quot;http://img.blog.csdn.net/20170701221659356&quot;);

        /* 取值是图片路径 */
        -webkit-mask-image:url(&quot;http://img.blog.csdn.net/20170701221732018&quot;);
    }
  </style>
 </head>
 <body>
    <div class=&quot;mask&quot;> </div>
 </body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!doctype html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.mask</span>{
        <span class="hljs-attribute">width</span>:<span class="hljs-number">475px</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">260px</span>;
        <span class="hljs-attribute">background-image</span>:<span class="hljs-built_in">url</span>(<span class="hljs-string">"http://img.blog.csdn.net/20170701221659356"</span>);

        <span class="hljs-comment">/* 取值是图片路径 */</span>
        <span class="hljs-attribute">-webkit-mask-image</span>:<span class="hljs-built_in">url</span>(<span class="hljs-string">"http://img.blog.csdn.net/20170701221732018"</span>);
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
 <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mask"</span>&gt;</span> <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
 <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><strong>background-image</strong>   </p>
<p><span class="img-wrap"><img data-src="/img/bVXPSt?w=475&amp;h=260" src="https://static.alili.tech/img/bVXPSt?w=475&amp;h=260" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>-webkit-mask-image</strong>   </p>
<p><span class="img-wrap"><img data-src="/img/bVXPSq?w=475&amp;h=260" src="https://static.alili.tech/img/bVXPSq?w=475&amp;h=260" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>效果图</strong>   </p>
<p><span class="img-wrap"><img data-src="/img/bVXPSr?w=473&amp;h=258" src="https://static.alili.tech/img/bVXPSr?w=473&amp;h=258" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!doctype html>
<html lang=&quot;en&quot;>
 <head>
  <meta charset=&quot;UTF-8&quot;>

  <style>
    .mask{
        width:475px;
        height:260px;
        background-image:url(&quot;http://img.blog.csdn.net/20170701221659356&quot;);

        /* 取值是渐变色 */
        -webkit-mask-image:linear-gradient(blue, transparent);
    }
  </style>
 </head>
 <body>
    <div class=&quot;mask&quot;> </div>
 </body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!doctype html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-class">.mask</span>{
        <span class="hljs-attribute">width</span>:<span class="hljs-number">475px</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">260px</span>;
        <span class="hljs-attribute">background-image</span>:<span class="hljs-built_in">url</span>(<span class="hljs-string">"http://img.blog.csdn.net/20170701221659356"</span>);

        <span class="hljs-comment">/* 取值是渐变色 */</span>
        <span class="hljs-attribute">-webkit-mask-image</span>:<span class="hljs-built_in">linear-gradient</span>(blue, transparent);
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
 <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mask"</span>&gt;</span> <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
 <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><strong>效果图</strong>   </p>
<p><span class="img-wrap"><img data-src="/img/bVXPSs?w=479&amp;h=261" src="https://static.alili.tech/img/bVXPSs?w=479&amp;h=261" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>我再善意的提醒下，-webkit-mask-image 的值应该是一张，背景是透明色的图，或者说有透明色，而透明色的区域，最后都是不显示的。  </p>
<p>下面是mask 和 animation 配合完成的一个效果    <br><strong>效果图</strong>  </p>
<p><span class="img-wrap"><img data-src="/img/bVXPSV?w=704&amp;h=393" src="https://static.alili.tech/img/bVXPSV?w=704&amp;h=393" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!doctype html>
<html lang=&quot;en&quot;>
 <head>
  <meta charset=&quot;UTF-8&quot;>

  <style>
     @keyframes mask{
        0% {-webkit-mask-position:0px 0px;}
        25% {-webkit-mask-position:619px 0px;}
        50% {-webkit-mask-position:0px 0px;}
        75% {-webkit-mask-position:308px 0px;-webkit-mask-size:100%;}
        100% {-webkit-mask-size:1000%;}
     }

    .mask{
        width:700px;
        height:392px;
        <!doctype html>
<html lang=&quot;en&quot;>
 <head>
  <meta charset=&quot;UTF-8&quot;>

  <style>
     @keyframes mask{
        0% {-webkit-mask-position:0px 0px;}
        25% {-webkit-mask-position:619px 0px;}
        50% {-webkit-mask-position:0px 0px;}
        75% {-webkit-mask-position:308px 0px;-webkit-mask-size:100%;}
        100% {-webkit-mask-size:1000%;}
     }

    .mask{
        width:700px;
        height:392px;
        background:black url(&quot;http://www.kkkk1000.com/images/1534750163.jpg&quot;);
        -webkit-mask-image:url(&quot;http://www.kkkk1000.com/images/1534750222.jpg&quot;);
        animation:mask 5s linear infinite forwards;
    }
  </style>
 </head>
 <body>
    <div class=&quot;mask&quot;> </div>
 </body>

</html>
        animation:mask 5s linear infinite forwards;
    }
  </style>
 </head>
 <body>
    <div class=&quot;mask&quot;> </div>
 </body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!doctype html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="xml">
     @keyframes mask{
        0% {-webkit-mask-position:0px 0px;}
        25% {-webkit-mask-position:619px 0px;}
        50% {-webkit-mask-position:0px 0px;}
        75% {-webkit-mask-position:308px 0px;-webkit-mask-size:100%;}
        100% {-webkit-mask-size:1000%;}
     }

    .mask{
        width:700px;
        height:392px;
        <span class="hljs-meta">&lt;!doctype html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
     @<span class="hljs-keyword">keyframes</span> mask{
        0% {<span class="hljs-attribute">-webkit-mask-position</span>:<span class="hljs-number">0px</span> <span class="hljs-number">0px</span>;}
        25% {<span class="hljs-attribute">-webkit-mask-position</span>:<span class="hljs-number">619px</span> <span class="hljs-number">0px</span>;}
        50% {<span class="hljs-attribute">-webkit-mask-position</span>:<span class="hljs-number">0px</span> <span class="hljs-number">0px</span>;}
        75% {<span class="hljs-attribute">-webkit-mask-position</span>:<span class="hljs-number">308px</span> <span class="hljs-number">0px</span>;<span class="hljs-attribute">-webkit-mask-size</span>:<span class="hljs-number">100%</span>;}
        100% {<span class="hljs-attribute">-webkit-mask-size</span>:<span class="hljs-number">1000%</span>;}
     }

    <span class="hljs-selector-class">.mask</span>{
        <span class="hljs-attribute">width</span>:<span class="hljs-number">700px</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">392px</span>;
        <span class="hljs-attribute">background</span>:black <span class="hljs-built_in">url</span>(<span class="hljs-string">"http://www.kkkk1000.com/images/1534750163.jpg"</span>);
        <span class="hljs-attribute">-webkit-mask-image</span>:<span class="hljs-built_in">url</span>(<span class="hljs-string">"http://www.kkkk1000.com/images/1534750222.jpg"</span>);
        <span class="hljs-attribute">animation</span>:mask <span class="hljs-number">5s</span> linear infinite forwards;
    }
  </span></span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
 <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mask"</span>&gt;</span> <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
 <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
        animation:mask 5s linear infinite forwards;
    }
  <span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
 <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"mask"</span>&gt;</span> <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
 <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h3 id="articleHeader2">总结</h3>
<p>说了这么多相信你也一定明白mask-image属性了，如果还是不清楚，那就多看看下面这张图吧！！！<br><span class="img-wrap"><img data-src="/img/bVXPSU?w=480&amp;h=272" src="https://static.alili.tech/img/bVXPSU?w=480&amp;h=272" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016248923?w=600&amp;h=342" src="https://static.alili.tech/img/remote/1460000016248923?w=600&amp;h=342" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
简单说 CSS中的mask—好好利用mask-image

## 原文链接
[https://segmentfault.com/a/1190000011838367](https://segmentfault.com/a/1190000011838367)

