---
title: '[聊一聊系列]聊一聊移动web分辨率的那些事儿' 
date: 2019-02-07 2:30:16
hidden: true
slug: vfb05wxw8ia
categories: [reprint]
---

{{< raw >}}

                    
<p>欢迎大家收看聊一聊系列，这一套系列文章，可以帮助前端工程师们了解前端的方方面面（不仅仅是代码）：</p>
<p><a href="https://segmentfault.com/blog/frontenddriver">https://segmentfault.com/blog/frontenddriver</a></p>
<p>不同于PC时代，移动web的样式更加多样，也由于手机分辨率的碎片化，移动web的兼容问题日益突出，下面，我就和各位读者一起聊聊移动web所面临的手机分辨率问题。</p>
<h2 id="articleHeader0">1&nbsp;PC到移动，渲染的变迁</h2>
<p>在PC时代，我们书写CSS的时候，理所应当的认为，我们所书写的1px，在屏幕上就是1px的宽度。<br>但是到了移动端，事情就不是这样了，我们所书写的1px，其实到了屏幕上，可能是2px，可能是3px。甚至是你想多少px就多少px。这是为什么呢？让我们来说一个故<del>~事</del>~~~<br>苹果发布ios的时候，肯定会想到成千上万的PC网页，没法在自己的IOS系统上运行起来时间多么蛋疼的事情啊。但是呢，这些网页都是按照PC屏幕的大小写的呀。<br>动不动就出现两个500多px的宽的div并列。这在当时640*960屏幕大小的iphone4上显示的话，简直是毁灭性的。(会各种折行，样式错乱)，那么细致如苹果肯定不允许这种事情发生。<br>于是苹果公司的攻城狮们想出了一个歪招，那就是告诉浏览器，“你在一个980宽的大屏幕下在渲染呢”，<strong>浏览器就按照了980宽的方式，渲染出来页面图像。</strong>可是到了浏览器这边，其实是拿到了一张渲染好的、比屏幕大的网页图像。<strong>此时，苹果再把这张图像，缩放一下，缩为屏幕大小。</strong>(我们平时也经常这样干，把一张大图片用双指放大缩小)</p>
<p>在手机上观察segmentfault的电脑版，正式这样的(如图1.1)</p>
<p><span class="img-wrap"><img data-src="/img/bVyQ5O" src="https://static.alili.tech/img/bVyQ5O" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>图1.1</p>
<h2 id="articleHeader1">2 可以更改的布局宽度</h2>
<p>上面所说的浏览器就按照了980宽的方式，渲染出来页面图像。<strong>浏览器的渲染依据，我们就称为layout viewport。其实我们可以指定欺骗浏览器的宽度是多少。</strong></p>
<p>比如，我们默认的viewport宽度是980px，我们写了一个宽度为480的div，显示在网页上的时候，是这样(如图1.2.1所示)：&nbsp;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
<head>
    <meta charset=&quot;utf-8&quot; />
</head>
<body>
    <h1 style=&quot;width:480px;background-color:#000;color:#fff;&quot;>测试</h1>
</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width:480px;background-color:#000;color:#fff;"</span>&gt;</span>测试<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVyQ5Z" src="https://static.alili.tech/img/bVyQ5Z" alt="144352_qgFx_1177792.png" title="144352_qgFx_1177792.png" style="cursor: pointer;"></span><br>图1.2.1</p>
<p>如果我们书写viewport标签，让其布局的时候，告诉浏览器，自己是一个宽度为480的小屏幕，又会怎样呢？(如图1.2.2所示)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
<head>
    <meta charset=&quot;utf-8&quot; />
    <meta name=&quot;viewport&quot; content=&quot;width=480&quot; />
</head>
<body>
    <h1 style=&quot;width:480px;background-color:#000;color:#fff;&quot;>测试</h1>
</body>
</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=480"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width:480px;background-color:#000;color:#fff;"</span>&gt;</span>测试<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVyQ56" src="https://static.alili.tech/img/bVyQ56" alt="144535_FG3W_1177792.png" title="144535_FG3W_1177792.png" style="cursor: pointer; display: inline;"></span><br>图1.2.2</p>
<p>此时，浏览器就真的按照宽度为480的样子去渲染了。这就是viewport的魅力。这个viewpor的宽度是任我们更改的，究竟更改到多少才算合适呢？</p>
<p>大多数网站采取的方式是</p>
<p>width=device-width，就是别忽悠浏览器了，像PC上一样，手机屏幕多宽，浏览器就照着多宽去渲染吧。</p>
<p>这是一个比较好的方案，因为这下子，不会再有什么缩放问题了。设计就是按照手机去设计，显示也按照手机去显示，好看了很多(如图1.2.3)。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<html>
<head>
    <meta charset=&quot;utf-8&quot; />
    <style>
        body {
            padding: 0;
            margin: 0;
        }
    </style>
    <meta name=&quot;viewport&quot; content=&quot;width=device-width&quot; />
</head>
<body>
    <h1 style=&quot;width:320px;background-color:#000;color:#fff;&quot;>测试</h1>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">body</span> {
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width:320px;background-color:#000;color:#fff;"</span>&gt;</span>测试<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVyQ57" src="https://static.alili.tech/img/bVyQ57" alt="150516_YjEj_1177792.png" title="150516_YjEj_1177792.png" style="cursor: pointer;"></span><br>图1.2.3</p>
<h2 id="articleHeader2">3. 再次变迁的像素</h2>
<p>时代是在变迁的，iphone也不例外，iphone3的像素为320<em>480，然而到了iphone4，虽然屏幕不曾变大，但是像素密度大大增加，变为了640</em>960，总不能把之前设计的网页都缩小一倍显示吧？所以苹果公司的老司机们就又开车了。</p>
<p>iphone4对浏览器说，“我的宽度是320px”，其实iphone4是640px。我们按照320px的设计得以渲染，而到了真实的世界中，我们写的1px的元素，其实是化为2px渲染到用户面前的。有的同学可能会说，这不是把之前的网页变大了吗？</p>
<p>nonono，别忘了，手机的大小并没有变，只不过是物理世界上的1英寸，上面的像素点数更多了。以前1px的屏幕像素点，展现在人眼面前是1/96英寸，像素密度变为两倍后，一个像素的宽度是1/96<em>2英寸。那么两个像素就是2</em>1/(96*2)=1/96英寸。物理世界上的宽度又变回来了。</p>
<p>换句话说，虽然像素变大了，但是10px的图片在iphone3与iphone4上看起来是一样大的。</p>
<p>在这里，我们已经学会了两个知识点：</p>
<p><strong>1.&nbsp;320px的逻辑分辨率，对于我们来说，无论是iphone3gs还是iPhone4，我们都照着320px去写代码就好了，这是我们的逻辑。</strong></p>
<p><strong>2.&nbsp;320px/640px的物理分辨率，对于苹果手机来说，iphone3gs，他就真的按照320px去显示，640px的iPhone4，它就将我们写的逻辑分辨率乘以2再显示。这就是为什么iphone4上面物理分辨率是逻辑分辨率的两倍的缘故了。UE给你的图，你除以2去写代码就好了。</strong></p>
<h2 id="articleHeader3">4. 又一次变迁</h2>
<p>苹果公司在2014年，推出了新一代的iphone6/iphone6 plus，他们的屏幕都比iphone4要宽、要大。所以，再维持原来的320宽度方法，显然不行了。所以，苹果公司按照手机尺寸的比例，上调了分辨率：</p>
<h3 id="articleHeader4">4.1&nbsp;iphone6的普通扩大</h3>
<p>我们看到上图，iphone6的宽为750px，iphone4的宽为640px(物理分辨率)，比例应该是：750/640<br>iphone6的逻辑分辨率的宽是375px，iphone4的逻辑分辨率的宽为320px，比例是：375/320。<br>750/640 == 375/320，所以，苹果公司只是把手机普普通通的扩大了一点而已。顺便把逻辑分辨率也扩大了。并不影响我们的书写。</p>
<h3 id="articleHeader5">4.2 iphone6 plus的扩大高清度</h3>
<p>这次升级，最蛋疼的点就是iphone6 plus了，苹果公司希望更高清的屏幕，于是他们再一次施展大法，一块5.5英寸的屏幕上，竟然容得下宽度1080的像素点数量。</p>
<p>但是，苹果的老司机们又犯难了，该如何“欺骗浏览器”呢？这次是朝着3倍的方向压缩的。即1个逻辑像素对应3个物理像素。<strong>但是，事实根本不是这样，他们只在与iphone4同样宽度的屏幕上，渲染出2.6个像素点，iphone4渲染出2个，iphone3gs渲染出1个。</strong></p>
<p>所以，按照我们之前的理论，是不是逻辑像素就应该是1080/2.6呢。的确是的，1080/2.6~=414px，所以，我们的逻辑分辨率就被定格在了414*736。</p>
<p>但是！2.6这个比例太蛋疼了，苹果是真心想让我们相信它家的屏幕好呀，于是苹果公司再一次施展欺骗大法，它让我们认为，他的屏幕是1242<em>2208的超级高清屏幕。于是，好像是在与iphone3同样的1px的屏幕尺寸里面，塞下了3个像素点。于是我们用1242除以3，还是得到了我们的逻辑分辨率：414px。而且，UE(设计师)们出一张1242的图片，工程师们将其除以3，远比UE们出一张1080px的图片，工程师将其除以2.6要爽得多。试想一下，除以2.6好算还是除以3好算？但是，iphone6s plus，实际的渲染是1080px,咋整？缩放呗，于是被浏览器渲染好的1242</em>2208的图像，被iphone6s plus给缩放成了1080*1920(就好像我们用手指头缩放过的图片一样)</p>
<p>这个3倍还是2倍的比例，前端可以从浏览器中获取：window.devicePixelRatio</p>
<p>结论就是，iphone6s plus，我们可以认为，它的物理分辨率是逻辑分辨率的三倍就好了，UE给你的图，你除以3去写代码就好了。</p>
<p>几代iphone手机的分辨率如图4.2.1所示：</p>
<p><span class="img-wrap"><img data-src="/img/bVyQ6j" src="https://static.alili.tech/img/bVyQ6j" alt="163411_egL3_1177792.png" title="163411_egL3_1177792.png" style="cursor: pointer;"></span></p>
<p>图4.2.1</p>
<p>根据上述，我们的出结论，虽然一样的逻辑像素，在iphone6上面和在iphone6 plus上面也是不一致的，因为iphone6 plus会对其渲染后的图像进行缩放。</p>
<h4>iphone6下</h4>
<p>1px的逻辑像素 === 2px的真的物理像素 === 2px *63.5px/326ppi  === (1/64)cm</p>
<h4>然后是iphone6 plus：（注意，这里面的ppi使用1080的真实物理尺寸算的）</h4>
<p>1px的逻辑像素 === 3px的，我们以为是3px的物理像素  ===  3<em>1080/1242 的真的物理像素 === 2.6px </em>63.5px/401ppi ===(2.6/157)cm</p>
<p>这样看来，在iphone6s plus 和iphone6 plus下，在真实世界的显示上面，尺寸会比iphone6/iphone5等，大1.15倍左右，经测量（拿尺子量的），的确是有这样的倍数关系。</p>
<h2 id="articleHeader6">5 是时候说说安卓了</h2>
<p>苹果的变迁史我们说完了，是时候说说更乱的安卓了。其实，了解完了苹果的机制，安卓的也并不难理解，这些零散的安卓设备，他们也都采用了物理像素是逻辑像素N倍的设计方法，当然，这个N是多少，就要看安卓的制造厂商了。总之，我们在安卓上的代码，也是按照逻辑像素渲染的。</p>
<h2 id="articleHeader7">6 课后问题</h2>
<p>聪明的你，知道如何描述什么是逻辑分辨率，什么是物理分辨率了吗？</p>
<p><strong>接下来的一篇文章，我将会和读者们一起聊聊iconfont那些事儿，不要走开，请关注我.....</strong></p>
<p><a href="https://segmentfault.com/a/1190000005904616" target="_blank">https://segmentfault.com/a/1190000005904616</a></p>
<p>原创文章,版权所有,转载请注明出处</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[聊一聊系列]聊一聊移动web分辨率的那些事儿

## 原文链接
[https://segmentfault.com/a/1190000005884985](https://segmentfault.com/a/1190000005884985)

