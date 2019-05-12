---
title: '【响应式布局】理解设备像素、设备独立像素和css像素' 
date: 2018-12-27 2:30:13
hidden: true
slug: a8gffmd4c35
categories: [reprint]
---

{{< raw >}}

                    
<p>这篇文章是我在<a href="http://www.jianshu.com/p/6b1f94bfa263" rel="nofollow noreferrer" target="_blank">我的旧博客</a>上发过的文章，最近又碰到这个问题，整理修改了一下发到这里。</p>
<h1 id="articleHeader0">像素单位</h1>
<p>像素单位有设备像素、逻辑像素和CSS像素3种。</p>
<h2 id="articleHeader1">设备像素（device pixels）、设备分辨率</h2>
<blockquote>设备像素也叫物理像素。</blockquote>
<p>设备像素指的是显示器上的真实像素，每个像素的大小是屏幕固有的属性，屏幕出厂以后就不会改变了。<br>设备分辨率描述的就是这个显示器的宽和高分别是多少个设备像素。<br>设备像素和设备分辨率交给操作系统来管理，浏览器不知道、也不需要知道设备分辨率的大小，浏览器只需要知道<strong>逻辑分辨率</strong>就可以了。</p>
<h2 id="articleHeader2">设备独立像素（Device Independent Pixels）、逻辑分辨率</h2>
<blockquote>设备独立像素也叫逻辑像素。</blockquote>
<p>设备独立像素(dips)是<strong>操作系统</strong>定义的一种像素单位，应用程序将设备独立像素告诉操作系统，操作系统再将设备独立像素转化为设备像素，从而控制屏幕上真正的物理像素点。</p>
<p>为什么需要在应用程序与设备像素之间定义这么一种单位呢？为什么应用程序不应该直接使用设备像素？<br>随着显示器制造技术越来越先进，屏幕像素密度越来越高。同样是1920*1080颗像素，以前要放在宽大的显示器中，现在都可以放在手机屏幕上了。原本高度为12个设备像素的字体，现在高度为24个设备像素才能得到相近的大小（这也说明字变得更加清晰锐利了），如果应用程序直接使用设备像素，那么编写应用程序将变得非常困难：字体在一些屏幕上高度为12个设备像素，在另一些屏幕上却要变为24个设备像素。<br>因此操作系统定义了一个单位：设备独立像素。操作系统保证：用设备独立像素定义的尺寸，不管屏幕的参数如何，都能以合适的大小显示（这也是设备独立像素名字的由来）。操作系统是如何做到的呢？<strong>对于那些像素密度高的屏幕，将多个设备像素划分为一个逻辑像素。</strong>至于将多少设备像素划分为一个逻辑像素，这<strong>由操作系统决定</strong>。<br>对于上面的例子：“原本高度为12个设备像素的字体，现在高度为24个设备像素才能得到相同的大小”，操作系统会将一个逻辑像素定义为2*2个真实像素，从而设备独立像素尺寸不需要改变，而且不管在新、旧设备上，显示的尺寸大致相同。<br><span class="img-wrap"><img data-src="/img/bVXtRR?w=204&amp;h=204" src="https://static.alili.tech/img/bVXtRR?w=204&amp;h=204" alt="用4个设备像素来显示一个设备独立像素" title="用4个设备像素来显示一个设备独立像素" style="cursor: pointer; display: inline;"></span></p>
<blockquote>设备独立像素与设备像素之间的比例是多少，显示器厂商和操作系统厂商会通过调查研究来得出最利于观看的比例。普遍规律是，屏幕的像素密度越高，就需要更多的设备像素来显示一个设备独立像素。</blockquote>
<p>通过<code>screen.width/height</code>得到的数值就是整个屏幕（不仅仅是浏览器的区域）的宽度和高度（单位：设备独立像素）。这个数值不随页面缩放、浏览器窗口大小而改变。</p>
<p>逻辑分辨率用屏幕的宽*高来表示（单位：设备独立像素）。</p>
<h3 id="articleHeader3">通过操作系统设置来改变设备独立像素的大小</h3>
<p>你可以通过操作系统的分辨率设置来改变设备独立像素的大小，但<strong>在前端开发的时候我们完全可以将它们当作定值</strong>。（没人会闲着无聊频繁改变操作系统分辨率）<br><span class="img-wrap"><img data-src="/img/bVXtRU?w=1240&amp;h=969" src="https://static.alili.tech/img/bVXtRU?w=1240&amp;h=969" alt="通过操作系统设置来手动调节逻辑像素" title="通过操作系统设置来手动调节逻辑像素" style="cursor: pointer; display: inline;"></span><br>我屏幕的设备分辨率是1920*1200（单位：设备像素），<strong>当前的分辨率设置下</strong>逻辑分辨率是1280*800（单位：设备独立像素）。从图中可以验证，横、纵方向的设备像素数量恰好是设备独立像素的1.5倍。这也意味着，设备独立像素的边长是设备像素边长的1.5倍。</p>
<blockquote>window.devicePixelRatio在下文会解释。</blockquote>
<h2 id="articleHeader4">css像素</h2>
<p>在CSS中使用的<code>px</code>都是指css像素，比如<code>width: 128px</code>。css像素的大小是很容易变化的。<strong>当我们缩放页面的时候，元素的css像素数量不会改变，改变的只是每个css像素的大小</strong>。也就是说<code>width: 128px</code>的元素在缩放200%以后，宽度依然是128个css像素，只不过<strong>每个css像素的宽度和高度</strong>变为原来的两倍。如果原本元素宽度为128个<strong>设备独立像素</strong>，那么缩放200%以后元素宽度为256个设备独立像素（css像素宽度始终是128）。</p>
<blockquote><strong>开发者在开发的时候基本上只用考虑css像素，在这里介绍设备像素和设备独立像素只是为了讲述页面缩放的原理，以及方便以后理解viewport。</strong></blockquote>
<h2 id="articleHeader5">css像素与设备独立像素的关系</h2>
<p><strong>缩放比例就是css像素边长/设备独立像素边长</strong>。<br>根据缩放比例和设备独立像素边长，就能计算出css像素边长。<br>在<strong>缩放比例为100%</strong>的情况下，一个css像素大小<strong>等于</strong>一个设备独立像素。</p>
<h2 id="articleHeader6">css像素与设备像素的关系</h2>
<p><strong><a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio" rel="nofollow noreferrer" target="_blank">window.devicePixelRatio</a></strong>设备像素比，devicePixelRatio = <strong>CSS像素边长/设备像素边长</strong>。如devicePixelRatio=2，表示CSS像素的边长是设备像素的2倍，因此<strong>在相同长度的直线</strong>上，设备像素的数量是CSS像素数量的2倍。<br>缩放会导致CSS像素边长的改变，从而导致window.devicePixelRatio的改变！<br>改变操作系统分辨率会导致<strong>设备独立像素</strong>边长改变，从而导致CSS像素边长改变（前面已经说过，CSS像素边长是根据缩放比例和设备独立像素计算出来的），从而导致window.devicePixelRatio的改变！</p>
<h2 id="articleHeader7">例子</h2>
<p><span class="img-wrap"><img data-src="/img/bVXtRW?w=1240&amp;h=775" src="https://static.alili.tech/img/bVXtRW?w=1240&amp;h=775" alt="" title="" style="cursor: pointer;"></span><br>我的屏幕宽度是1280个<strong>设备独立像素</strong>。这个值可以直接通过<code>window.screen.width</code>获得，或者自己根据操作系统的缩放比例和显示器物理像素宽度来计算。我将div宽度也设为了1280px（<strong>css像素</strong>），当缩放为100%的时候，DIV恰好撑满整个屏幕，不会出现横向滚动条。（这说明缩放比例为100%的时候一个CSS像素完全等于一个设备独立像素。）</p>
<blockquote>这里有一个小坑点。<strong>如果纵向滚动条存在的话</strong>，它会占据一点点宽度，这时如果我还将元素宽度设为屏幕宽度1280px，屏幕就无法装下整个元素，然后就会出现横向滚动条。<br>在上面这个例子中因为纵向滚动条不存在，所以没有这个问题，将来在开发的时候要注意。<p>注意到我设置了5px的橙色边框，为什么最终的宽度不是1280+5+5=1290呢？因为我给所有元素加上了<code>box-sizing: border-box</code>的样式，这样我设置的边框宽度就会包含在width中，也就是最终<strong>加上边框以后宽度为1280px</strong>。</p>
</blockquote>
<p><span class="img-wrap"><img data-src="/img/bVXtR2?w=1240&amp;h=775" src="https://static.alili.tech/img/bVXtR2?w=1240&amp;h=775" alt="" title="" style="cursor: pointer;"></span><br>当我缩小浏览器窗口的时候滚动条出现了。因为div的宽度没有改变，无论以什么单位衡量（设备像素、设备独立像素还是CSS像素）。</p>
<blockquote>因为缩放依然是100%，css像素边长/设备独立像素边长依然是1：1。</blockquote>
<p><span class="img-wrap"><img data-src="/img/bVXtR6?w=1240&amp;h=775" src="https://static.alili.tech/img/bVXtR6?w=1240&amp;h=775" alt="" title="" style="cursor: pointer; display: inline;"></span><br>将窗口最大化，并通过<code>Ctrl+鼠标滚轮</code>将浏览器缩放调整为200%，屏幕只能显示DIV的左半部分了，这时DIV的宽度依然是1280个css像素，但是它宽度变成了2560个设备独立像素。</p>
<hr>
<p>以下是测试用的简单代码，大家可以自己在Chrome中试试！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
  <meta charset=&quot;UTF-8&quot;>
  <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1, user-scalable=no&quot;>
  <title>test</title>
  <style>
    * {
      padding: 0;
      margin: 0;
      box-sizing: border-box;
    }

    body {
      text-align: center;
    }

    #box {
      /* 这里的width设置为screen.width的值，screen.width以设备独立像素为单位，给出屏幕的宽度。
      从而，在缩放为100%时，#box的宽度恰好等于屏幕宽度。 */
      width: 1280px;
      /* 限制高度防止出现纵向滚动条 */
      max-height: 100vh;
      background: lightblue;
      border: 5px solid orangered;
      border-radius: 20px;
    }

    /*
      media query rule中px的单位是设备独立像素，与缩放比例无关！
      也就是说，仅仅通过缩放窗口，不可能触发以下样式的切换。
    */
    @media (max-width: 640px) {
      #box {
        background-color: aqua;
      }
    }
  </style>
</head>

<body>
  <div id=&quot;box&quot;>this is box<br> 1
    <br> 2
    <br> 3
    <br> 4
    <br> 5
    <br> 6
    <br> 7
    <br> 8
    <br> 9
    <br> 10
    <br>
  </div>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1, user-scalable=no"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>test<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    * {
      <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
      <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
      <span class="hljs-attribute">box-sizing</span>: border-box;
    }

    <span class="hljs-selector-tag">body</span> {
      <span class="hljs-attribute">text-align</span>: center;
    }

    <span class="hljs-selector-id">#box</span> {
      <span class="hljs-comment">/* 这里的width设置为screen.width的值，screen.width以设备独立像素为单位，给出屏幕的宽度。
      从而，在缩放为100%时，#box的宽度恰好等于屏幕宽度。 */</span>
      <span class="hljs-attribute">width</span>: <span class="hljs-number">1280px</span>;
      <span class="hljs-comment">/* 限制高度防止出现纵向滚动条 */</span>
      <span class="hljs-attribute">max-height</span>: <span class="hljs-number">100vh</span>;
      <span class="hljs-attribute">background</span>: lightblue;
      <span class="hljs-attribute">border</span>: <span class="hljs-number">5px</span> solid orangered;
      <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">20px</span>;
    }

    <span class="hljs-comment">/*
      media query rule中px的单位是设备独立像素，与缩放比例无关！
      也就是说，仅仅通过缩放窗口，不可能触发以下样式的切换。
    */</span>
    @<span class="hljs-keyword">media</span> (max-width: <span class="hljs-number">640px</span>) {
      <span class="hljs-selector-id">#box</span> {
        <span class="hljs-attribute">background-color</span>: aqua;
      }
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span>this is box<span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span> 1
    <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span> 2
    <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span> 3
    <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span> 4
    <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span> 5
    <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span> 6
    <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span> 7
    <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span> 8
    <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span> 9
    <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span> 10
    <span class="hljs-tag">&lt;<span class="hljs-name">br</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<hr>
<h1 id="articleHeader8">参考资料</h1>
<ol>
<li><a href="https://www.quirksmode.org/mobile/viewports.html" rel="nofollow noreferrer" target="_blank">A tale of two viewports — part one</a></li>
<li><a href="https://developer.mozilla.org/en-US/docs/Mozilla/Mobile/Viewport_meta_tag#A_pixel_is_not_a_pixel" rel="nofollow noreferrer" target="_blank">A pixel is not a pixel - MDN</a></li>
</ol>
<hr>
<p>欢迎阅读下一篇文章：<a href="https://segmentfault.com/a/1190000016432896">initial containing block、viewport以及相关尺寸</a>，它使用这篇文章介绍的3个概念，来解释响应式布局中有关的概念和属性。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【响应式布局】理解设备像素、设备独立像素和css像素

## 原文链接
[https://segmentfault.com/a/1190000011753855](https://segmentfault.com/a/1190000011753855)

