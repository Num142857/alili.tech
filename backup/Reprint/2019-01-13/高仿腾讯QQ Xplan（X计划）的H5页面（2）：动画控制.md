---
title: '高仿腾讯QQ Xplan（X计划）的H5页面（2）：动画控制' 
date: 2019-01-13 2:30:11
hidden: true
slug: ylh7ujztqle
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://segmentfault.com/a/1190000009667320">上一篇</a>知道如何制作threejs地球之后，就正式coding了，当然还是使用最心爱的Vue。本篇会有一些代码，但是都是十几行的独立片段，相信你不用担心。</p>
<h2 id="articleHeader0">布局</h2>
<p>在进入本篇主题前，要简单看一下xplan中的自适应解决方案，即如何在不同尺寸设备中，都保证地球最合适的大小和位置，并且与其配套的一些图片（虚线的椭圆轨道、正中心白色的圆环等）都不会显示的错位。</p>
<p><span class="img-wrap"><img data-src="http://ofkyhrvda.bkt.clouddn.com/post/image/o_1bhtj1nndhok1r1918ba1tclu07r.jpeg" src="https://static.alili.techhttp://ofkyhrvda.bkt.clouddn.com/post/image/o_1bhtj1nndhok1r1918ba1tclu07r.jpeg" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>xplan用的方式简单直接，固定大小内作布局，然后针对不同的设备尺寸进行缩放。</p>
<p>固定画布大小（375 * 600），所有和地球相关的元素都可以在这个范围内绝对定位，之后scale一下，保证在设备实际尺寸中是被包含（contain）的。这种方式比REM等其他的自适应方式更适合这个项目，毕竟threejs中不能使用REM单位。</p>
<p><span class="img-wrap"><img data-src="http://ofkyhrvda.bkt.clouddn.com/post/image/o_1bhtjns3m1858cnf55213ti1o591f.jpeg" src="https://static.alili.techhttp://ofkyhrvda.bkt.clouddn.com/post/image/o_1bhtjns3m1858cnf55213ti1o591f.jpeg" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>感谢Vue，我得以将上面这个自行缩放的逻辑写成一个<a href="https://github.com/JackGit/xplan/blob/master/src/components/Page.vue" rel="nofollow noreferrer" target="_blank">Page组件</a>，之后再也不用操心布局问题了。</p>
<h2 id="articleHeader1">动画</h2>
<p>xplan中的动画是最吸引我的地方，特别是地球放大，穿越云层的那一刻，想想还有点小激动。</p>
<p>其实之前看到过一些项目有做从外太空俯冲进地球表面的动画，但是那些基本都是纯图片制作的SpriteSheet Animation，动画的前进后退控制都很容易。但xplan项目中则不同，动画过程中需要控制多个动画对象，还要配合其他资源（音频和视频）。</p>
<p><span class="img-wrap"><img data-src="http://ofkyhrvda.bkt.clouddn.com/post/image/o_1bhti5m6pei11ntm1jcc35t1kl2h.gif" src="https://static.alili.techhttp://ofkyhrvda.bkt.clouddn.com/post/image/o_1bhti5m6pei11ntm1jcc35t1kl2h.gif" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">分析</h3>
<p>xplan中动画的逻辑是，在地球自转过程中，长按按钮，会依次发生：</p>
<ol>
<li><p>地球旋转到目的坐标</p></li>
<li><p>地球放大（相机推进）到该坐标</p></li>
<li><p>到足够近的时候，播放云层穿越动画</p></li>
<li><p>云层穿越结束后，展示对应坐标的视频内容</p></li>
<li><p>任何时刻松开长按按钮，动画都会回退到地球自转的状态</p></li>
</ol>
<p>为了方便讨论，将上面分析到的动画阶段命名一下：</p>
<ol>
<li><p>地球自转过程：<strong>idle</strong>阶段</p></li>
<li><p>地球转动到指定坐标的过程：<strong>rotating</strong>阶段</p></li>
<li><p>地球距离被拉近拉远的过程：<strong>zooming</strong>阶段</p></li>
<li><p>穿越云层的过程：<strong>diving</strong>阶段</p></li>
<li><p>云层过后的视频展示：<strong>presenting</strong>阶段</p></li>
</ol>
<p>具体分析几个过程：</p>
<p><span class="img-wrap"><img data-src="http://ofkyhrvda.bkt.clouddn.com/post/image/o_1bhu3fcjn1778i4ibdo1gt61tm931.jpeg" src="https://static.alili.techhttp://ofkyhrvda.bkt.clouddn.com/post/image/o_1bhu3fcjn1778i4ibdo1gt61tm931.jpeg" alt="" title="" style="cursor: pointer;"></span></p>
<p>在idle阶段，只要touchstart，就算你只长按了0.1s，那么rotating的动画就会完整的触发，然后状态跳回idle（rotating没有反向旋转）。如上示意图。</p>
<p><span class="img-wrap"><img data-src="http://ofkyhrvda.bkt.clouddn.com/post/image/o_1bhu3oqm91m1o15na4q7802bm93b.jpeg" src="https://static.alili.techhttp://ofkyhrvda.bkt.clouddn.com/post/image/o_1bhu3oqm91m1o15na4q7802bm93b.jpeg" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>如果长按至了zooming阶段，松开手指之后，zooming动画会立刻反向播放，直至回到idle阶段。如上示意图。</p>
<p><span class="img-wrap"><img data-src="http://ofkyhrvda.bkt.clouddn.com/post/image/o_1bhu2ruu4ki01vl41louu2n1f7s2n.jpeg" src="https://static.alili.techhttp://ofkyhrvda.bkt.clouddn.com/post/image/o_1bhu2ruu4ki01vl41louu2n1f7s2n.jpeg" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>如果zooming过程松开手指后，但是在离开zooming阶段前再次按下去，那么zooming动画会再一次正向播放。如上示意图。</p>
<p><span class="img-wrap"><img data-src="http://ofkyhrvda.bkt.clouddn.com/post/image/o_1bhu3rn2h2f55o6ir81bmg1rk13l.jpeg" src="https://static.alili.techhttp://ofkyhrvda.bkt.clouddn.com/post/image/o_1bhu3rn2h2f55o6ir81bmg1rk13l.jpeg" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>diving阶段貌似又回到了和rotating类似的行为，就算中途结束，也会完成当前阶段的动画。但是和rotating不一样的是，diving阶段是有反向动画的。因此可以看到上面的示意图。</p>
<p>我在考虑的过程中，阴差阳错的误以为还有一个条件：即除了rotating阶段外，其他动画过程都可以随时进和退（上面的GIF就是我最终完成的动画控制）。这个给自己添加额外的难度，困扰了我很久。</p>
<h3 id="articleHeader3">分步实现：地球</h3>
<p>我创建了一个<a href="https://github.com/JackGit/xplan/tree/master/src/assets/js/earth" rel="nofollow noreferrer" target="_blank">Earth类</a>，负责3D地球（包括光线，光晕，地表的云，浮动坐标点等）的创建和渲染，同时向外提供几个public方法：</p>
<ul>
<li><p>setCameraPosition()</p></li>
<li><p>getCameraPosition()</p></li>
<li><p>startAutoRotation()</p></li>
<li><p>stopAutoRotation()</p></li>
</ul>
<p>地球旋转到指定坐标点，其实就是设置camera的position来完成了。要有流畅动画的感觉，就使用<a href="https://www.npmjs.com/package/tween.js" rel="nofollow noreferrer" target="_blank">tween</a>去做position的更新。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new TWEEN.Tween(
  earth.getCameraPosition()
).to(
  targetCameraPosition,
  1000
).onUpdate(function () {
  earth.setCameraPosition(this.x, this.y, this.z)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">new</span> TWEEN.Tween(
  earth.getCameraPosition()
).to(
  targetCameraPosition,
  <span class="hljs-number">1000</span>
).onUpdate(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
  earth.setCameraPosition(<span class="hljs-keyword">this</span>.x, <span class="hljs-keyword">this</span>.y, <span class="hljs-keyword">this</span>.z)
})</code></pre>
<p>关于tween和threejs动画，这里有<a href="http://learningthreejs.com/blog/2011/08/17/tweenjs-for-smooth-animation/" rel="nofollow noreferrer" target="_blank">教程</a>。</p>
<p>其实最开始，这个Earth类没有这么纯粹，我在里面加了<code>targetLocation</code>代表当前要转到的目标地点；还将tween的逻辑写在了这个类里面，让earth知道自己的目的地，控制自己的旋转动画。但后面发现对于这个项目中动画可控制的灵活性，这样封装在内部的动画逻辑，将很难写成清晰的代码，让其能和后面的云层动画统一来控制起来。</p>
<h3 id="articleHeader4">分步实现：云层</h3>
<p>决定使用SpriteSheet Animation类似的方法做云层动画。其实有这样的库，比如<a href="http://tgideas.github.io/motion/doc/data/component/mo.Film.html" rel="nofollow noreferrer" target="_blank">Film</a>（这个好像也是qq下面的团队做的），但是我还是更想从npm中install一个，由于没有找到合适的，就索性自己写一个好了，于是就发布了一个小工具——<a href="https://github.com/JackGit/image-sprite" rel="nofollow noreferrer" target="_blank">image-sprite</a>。</p>
<p>操作由ImageSprite类创建云层对象，只用到了两个public方法，主要控制播放前一帧和后一帧：</p>
<ul>
<li><p>imageSprite.next()</p></li>
<li><p>imageSprite.prev()</p></li>
</ul>
<p>其实应该使用自动播放（play）和暂停（pause）应该也能完成，anyway</p>
<p>云层动画功能单一，想把它写的不纯粹也难。个人觉得coding的艺术就在于如何去划分这个纯粹。</p>
<h3 id="articleHeader5">第一印象</h3>
<p>上面两个关键动画对象都实现了，用户的行为也很简单，只有touchstart和touchend，那么用一个<code>touchDown</code>标志位记录一下就可以了。所以可以有一个中控器（controller），根据用户产生的状态，来调用不同的动画对象播放动画。</p>
<p>最先开始，脑子里面第一印象是下面这样的解决方案：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function handleTouchDown () {
  touchDown = true

    if (currentState is idle) {
        playRotatingForwardAnimation(handleAnimationComplete)
    } else if (currentState is rotating) {
        playZoomingForwardAnimation(handleAnimationComplete)
    } else if (currentState is zooming) {
        playDivingForwardAnimation(handleAnimationComplete)
    } else if (currentState is diving) {
        playPresentingForwardAnimation(handleAnimationComplete)
    } else if (currentState is presenting) {
        // nothing to do
    }
}

function handleTouchEnd () {
    touchDown = false
}

function handleAnimationComplete () {
    if (touchDown) {
        // 找到下一个阶段，正向播放动画
        findNextState()
        play<nextstate>ForwardAnimation(handleAnimationComplete)
    } else {
        // 找到上一个阶段，反向播放动画 
        findPrevState()
        play<prevstate>BackwardAnimation(handleAnimationComplete)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleTouchDown</span> (<span class="hljs-params"></span>) </span>{
  touchDown = <span class="hljs-literal">true</span>

    <span class="hljs-keyword">if</span> (currentState is idle) {
        playRotatingForwardAnimation(handleAnimationComplete)
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (currentState is rotating) {
        playZoomingForwardAnimation(handleAnimationComplete)
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (currentState is zooming) {
        playDivingForwardAnimation(handleAnimationComplete)
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (currentState is diving) {
        playPresentingForwardAnimation(handleAnimationComplete)
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (currentState is presenting) {
        <span class="hljs-comment">// nothing to do</span>
    }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleTouchEnd</span> (<span class="hljs-params"></span>) </span>{
    touchDown = <span class="hljs-literal">false</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleAnimationComplete</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (touchDown) {
        <span class="hljs-comment">// 找到下一个阶段，正向播放动画</span>
        findNextState()
        play&lt;nextstate&gt;ForwardAnimation(handleAnimationComplete)
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// 找到上一个阶段，反向播放动画 </span>
        findPrevState()
        play&lt;prevstate&gt;BackwardAnimation(handleAnimationComplete)
    }
}</code></pre>
<p>这样的方案能解决动画的大方向，即动画阶段之间的前进和后退，无法控制阶段内的每一帧的方向。而且也能看到，上面有太多的if判断，<code>handleTouchDown</code>函数中的那种if情况，一定要避免，否则大项目中代码很难维护。这样的情况使用有限状态机模式或者策略模式都是很容易解决的。</p>
<p>第一印象告诉我：</p>
<ol>
<li><p>要使用状态机设计模式</p></li>
<li><p>要从帧级别去做控制</p></li>
</ol>
<h3 id="articleHeader6">状态机</h3>
<p>写代码过程中肯定会遇到状态，最常见的状态会被记录成布尔值或者字符串常量，然后在做某个行为的时候对状态变量进行if-else判断。如果只有2个状态，还行，但是状态如果会变多，那么这样的代码就很难维护，将在主体中引入越来越多的if-else，越来越多的与特定状态相关的变量和逻辑。</p>
<p>个人非常喜欢状态机模式或者策略模式，它们本质都一样，都是使用组合代替继承，完成统一接口下的行为的多样性。最开心的是，这个模式将混杂在主体中的状态量和行为抽离出来，单独封装，让主体变的清清爽爽；还有，在JS中，你甚至连接口类都不用写！</p>
<p>举个简单的例子，上一篇中谈到的<a href="https://github.com/JackGit/image-sprite" rel="nofollow noreferrer" target="_blank">ImageSprite</a>，用来将一系列图片进行播放，本质上就是绘制图片而已。但是我这里提供两种模式，一种绘制在canvas里，一种绘制在dom里（即image展示）。</p>
<p>不使用模式，可以简单的写成这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class ImageSprite {
    constructor () {
        this.renderMode = 'canvas'
        this.context = null
        this.imageElement = null
        this.images = []
    }
    drawImage () {
        if (this.renderMode === 'canvas') {
            this.context.drawImage()
        } else if (this.rendererMode === 'dom') {
            this.imageElement.src = '...'
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ImageSprite</span> </span>{
    <span class="hljs-keyword">constructor</span> () {
        <span class="hljs-keyword">this</span>.renderMode = <span class="hljs-string">'canvas'</span>
        <span class="hljs-keyword">this</span>.context = <span class="hljs-literal">null</span>
        <span class="hljs-keyword">this</span>.imageElement = <span class="hljs-literal">null</span>
        <span class="hljs-keyword">this</span>.images = []
    }
    drawImage () {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.renderMode === <span class="hljs-string">'canvas'</span>) {
            <span class="hljs-keyword">this</span>.context.drawImage()
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.rendererMode === <span class="hljs-string">'dom'</span>) {
            <span class="hljs-keyword">this</span>.imageElement.src = <span class="hljs-string">'...'</span>
        }
    }
}</code></pre>
<p>使用了状态机模式（这里的场景来看，叫策略模式更贴切，渲染策略不同）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class ImageSprite {
    constructor () {
        this.renderer = new CanvasRenderer(this)
        this.images = []
    }
    drawImage () {
        this.renderer.drawImage()
    }
}

class CanvasRenderer {
    constructor (imageSprite) {
        this.imageSprite = imageSprite
        this.context = null
    }
    drawImage () {
        this.context.drawImage()
    }
}

class DomRenderer {
    constructor (imageSprite) {
        this.imageSprite = imageSprite
        this.imageElement = null
    }
    drawImage () {
        this.imageElement.src = '...'
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ImageSprite</span> </span>{
    <span class="hljs-keyword">constructor</span> () {
        <span class="hljs-keyword">this</span>.renderer = new CanvasRenderer(<span class="hljs-keyword">this</span>)
        <span class="hljs-keyword">this</span>.images = []
    }
    drawImage () {
        <span class="hljs-keyword">this</span>.renderer.drawImage()
    }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CanvasRenderer</span> </span>{
    <span class="hljs-keyword">constructor</span> (imageSprite) {
        <span class="hljs-keyword">this</span>.imageSprite = imageSprite
        <span class="hljs-keyword">this</span>.context = <span class="hljs-literal">null</span>
    }
    drawImage () {
        <span class="hljs-keyword">this</span>.context.drawImage()
    }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">DomRenderer</span> </span>{
    <span class="hljs-keyword">constructor</span> (imageSprite) {
        <span class="hljs-keyword">this</span>.imageSprite = imageSprite
        <span class="hljs-keyword">this</span>.imageElement = <span class="hljs-literal">null</span>
    }
    drawImage () {
        <span class="hljs-keyword">this</span>.imageElement.src = <span class="hljs-string">'...'</span>
    }
}</code></pre>
<p>可以看到使用了模式之后，<code>context</code>和<code>imageElement</code>这样的和状态相关的变量，还有绘制canvas图片和绘制dom图片的不同代码，都从主体ImageSprite中抽离出去，单独的封装到了不同的状态对象中去了。</p>
<p>想想一下如果有第三种渲染模式，比如渲染在webgl中去，在不使用模式的代码中，要添加变量，要修改<code>drawImage</code>函数；但是在使用了模式的代码中，现有代码都不用改变，只需要添加一个新类<code>WebglRenderer</code>就可以了。这就是代码的可扩展性和可维护性的体现。（在Java中，还能省去代码的重新编译的过程）</p>
<h3 id="articleHeader7">整合</h3>
<p>回到xplan的动画中去。在前面分析动画阶段的时候，其实就得到了每个状态，这些状态的统一接口就是向前帧动画（forward）和向后帧动画（backward）。</p>
<p>先不管每个state中逻辑该怎样，有了约定的接口，就可以把我们的中控器（Controller）写个基本框架了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Controller {
    constructor (earth, cloud) {
        this.earth = earth
        this.cloud = cloud
        this.touchDown = false
        this.state = new IdleState(this) // 初始状态为IdleState
        this._init()
    }
    _loop () {
        requestAnimationFrame(this._loop.bind(this))
        if (this.touchDown) { // 如果touchDown，则向前一帧
            this.state.forward()
        } else { // 否则，向后一帧
            this.state.backward()
    }
    handleTouchStart () {
        this.touchDown = true
    }
    handleTouchEnd () {
        this.touchDown = false
    }
    
    // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Controller</span> </span>{
    <span class="hljs-keyword">constructor</span> (earth, cloud) {
        <span class="hljs-keyword">this</span>.earth = earth
        <span class="hljs-keyword">this</span>.cloud = cloud
        <span class="hljs-keyword">this</span>.touchDown = <span class="hljs-literal">false</span>
        <span class="hljs-keyword">this</span>.state = <span class="hljs-keyword">new</span> IdleState(<span class="hljs-keyword">this</span>) <span class="hljs-comment">// 初始状态为IdleState</span>
        <span class="hljs-keyword">this</span>._init()
    }
    _loop () {
        requestAnimationFrame(<span class="hljs-keyword">this</span>._loop.bind(<span class="hljs-keyword">this</span>))
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.touchDown) { <span class="hljs-comment">// 如果touchDown，则向前一帧</span>
            <span class="hljs-keyword">this</span>.state.forward()
        } <span class="hljs-keyword">else</span> { <span class="hljs-comment">// 否则，向后一帧</span>
            <span class="hljs-keyword">this</span>.state.backward()
    }
    handleTouchStart () {
        <span class="hljs-keyword">this</span>.touchDown = <span class="hljs-literal">true</span>
    }
    handleTouchEnd () {
        <span class="hljs-keyword">this</span>.touchDown = <span class="hljs-literal">false</span>
    }
    
    <span class="hljs-comment">// ...</span>
}</code></pre>
<p>因为要做到帧级别的控制，因此这里用到requestAnimationFrame来制作渲染循环。代码是不是很清晰简单！在渲染循环中，根本不在乎动画逻辑怎么执行，只知道touchDown了，就做向前动画，否则做向后动画，其他的都在各自的状态类里去实现。</p>
<p>下面拿两个状态类举例，其他的请移步<a href="https://github.com/JackGit/xplan/blob/master/src/assets/js/controller.js" rel="nofollow noreferrer" target="_blank">这里</a>。</p>
<p><strong>IdleState</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class IdleState {
    constructor (controller) {
        this.controller = controller
    }
    forward () {
        this.controller.state = new RotatingState(this.controller)
    }
    backward () {
        // do nothing
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">IdleState</span> </span>{
    <span class="hljs-keyword">constructor</span> (controller) {
        <span class="hljs-keyword">this</span>.controller = controller
    }
    forward () {
        <span class="hljs-keyword">this</span>.controller.state = <span class="hljs-keyword">new</span> RotatingState(<span class="hljs-keyword">this</span>.controller)
    }
    backward () {
        <span class="hljs-comment">// do nothing</span>
    }
}</code></pre>
<p>这里IdleState没有向后的动画，因此<code>backward()</code>里面是空的；而该状态下的touchDown都会让earth开始旋转到指定坐标，而这个过程我们知道是RotatingState该做的，所以在RotatingState的‘forward()`里会去实现旋转控制。</p>
<p><strong>DivingState</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class DivingState {
    constructor (controller) {
        this.controller = controller
    }
    forward () {
        let cloud = this.controller.cloud
        if (cloud.currentFrame is last frame) {  // 最后一帧时，进入下一个状态
            this.controller.state = new PresentingState(this.controller)
        } else {
            cloud.next() // 播放下一帧
        }
    }
    backward () {
        let cloud = this.controller.cloud
        if (cloud.currentFrame is first frame) {  // 回退到第一帧时，进入上一个状态
            this.controller.state = new ZoomingState(this.controller)
        } else {
            cloud.prev() // 播放前一帧
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">DivingState</span> </span>{
    <span class="hljs-keyword">constructor</span> (controller) {
        <span class="hljs-keyword">this</span>.controller = controller
    }
    forward () {
        <span class="hljs-keyword">let</span> cloud = <span class="hljs-keyword">this</span>.controller.cloud
        <span class="hljs-keyword">if</span> (cloud.currentFrame is last frame) {  <span class="hljs-comment">// 最后一帧时，进入下一个状态</span>
            <span class="hljs-keyword">this</span>.controller.state = <span class="hljs-keyword">new</span> PresentingState(<span class="hljs-keyword">this</span>.controller)
        } <span class="hljs-keyword">else</span> {
            cloud.next() <span class="hljs-comment">// 播放下一帧</span>
        }
    }
    backward () {
        <span class="hljs-keyword">let</span> cloud = <span class="hljs-keyword">this</span>.controller.cloud
        <span class="hljs-keyword">if</span> (cloud.currentFrame is first frame) {  <span class="hljs-comment">// 回退到第一帧时，进入上一个状态</span>
            <span class="hljs-keyword">this</span>.controller.state = <span class="hljs-keyword">new</span> ZoomingState(<span class="hljs-keyword">this</span>.controller)
        } <span class="hljs-keyword">else</span> {
            cloud.prev() <span class="hljs-comment">// 播放前一帧</span>
        }
    }
}</code></pre>
<p>还记得么，diving是指穿越云层的那个过程。因此它往前（forward）是presenting，往后（backward）是zooming。而什么时候切换到下一个或者前一个状态，和往前或者往后的每一帧动画该如何执行，都只有这个DivingState知道，完美的逻辑封装。</p>
<p>完整的动画逻辑里，还包含着一些音频和视频的控制逻辑。比如地球自转时播放背景音乐，动画一旦开始则停止；穿越云层后播放视频，其他时候视频是停止的。这些逻辑，能够很容易的添加到上面的状态中去。比如在IdleState的contructor中播放音乐，在RotatingState的contructor中停止播放音乐；在PresentingState的constructor中播放视频，在DivingState的contructor中停止视频。</p>
<p>所以，一旦逻辑清晰了，代码清晰了，添加功能时显得很容易。</p>
<h3 id="articleHeader8">意外收获</h3>
<p>完成上面的所有动画状态之后，我发现地球其实还有一个动画，那就是开场的逆向旋转并放大的入场动画。在上面做动画分析的时候，是把这个开场动画分开来设想的，但是上面的controller用上状态机之后，意外的发现这个入场动画可以以另外一个state放进来。</p>
<p>入场动画状态类：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class EnteringState {
  constructor (controller) {
    this.controller = controller
    this.tween = new TWEEN.Tween({
      // 起点位置
    }).to({
      // 终点位置
    }, 1600).onUpdate(function () {
      // 设置earth的缩放和旋转
    }).onComplete(function () {
      this.controller.state = new IdleState(this.controller) // 完成后进入IdleState
    }).easing(TWEEN.Easing.Cubic.Out).start()
  }
  forward () {
    TWEEN.update()
  }
    backward () {
        // do nothing
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">EnteringState</span> </span>{
  <span class="hljs-keyword">constructor</span> (controller) {
    <span class="hljs-keyword">this</span>.controller = controller
    <span class="hljs-keyword">this</span>.tween = <span class="hljs-keyword">new</span> TWEEN.Tween({
      <span class="hljs-comment">// 起点位置</span>
    }).to({
      <span class="hljs-comment">// 终点位置</span>
    }, <span class="hljs-number">1600</span>).onUpdate(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-comment">// 设置earth的缩放和旋转</span>
    }).onComplete(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">this</span>.controller.state = <span class="hljs-keyword">new</span> IdleState(<span class="hljs-keyword">this</span>.controller) <span class="hljs-comment">// 完成后进入IdleState</span>
    }).easing(TWEEN.Easing.Cubic.Out).start()
  }
  forward () {
    TWEEN.update()
  }
    backward () {
        <span class="hljs-comment">// do nothing</span>
    }
}</code></pre>
<p>最后将Controller初始化时的第一个state赋值改为<code>EnteringState</code>即可。这真算是一个意外的收获，本来是打算单独（在controller之外）去实现的。</p>
<h2 id="articleHeader9">小结</h2>
<p>到这里就差不多了，xplan主要的东西都讲到了，高（shan）仿（zhai）的过程还不错，了解了three，顺便还publish了几个小的工具库；有不足、也有超越。这个h5看似复杂，但是技术也没有多高深，主要还是创意，还是要给xplan点个赞！</p>
<p>最后，个人接h5，有没有个人或者公司啊，不要不好意思联系我~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
高仿腾讯QQ Xplan（X计划）的H5页面（2）：动画控制

## 原文链接
[https://segmentfault.com/a/1190000009679590](https://segmentfault.com/a/1190000009679590)

