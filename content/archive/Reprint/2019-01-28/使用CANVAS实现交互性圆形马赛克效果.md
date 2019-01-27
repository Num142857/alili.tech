---
title: '使用CANVAS实现交互性圆形马赛克效果' 
date: 2019-01-28 2:30:10
hidden: true
slug: uj12mb7thp
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>在看D3.js的时候，无意间看到了一个<a href="http://bl.ocks.org/nswamy14/df13d67b6efeb19eb640" rel="nofollow noreferrer" target="_blank">例子</a>，觉得很有趣，像是会分裂的圆形马赛克。看了下代码，使用svg完成的，但是具体实现方式使得在手机端无法把玩，于是就自己实现了一个canvas版本的。代码很简单，canvas初学者可以自己试试当做练笔，还是挺有趣的一个效果。</p></blockquote>
<h2 id="articleHeader0">Online Demo</h2>
<p><span class="img-wrap"><img data-src="/img/bVHGaZ" src="https://static.alili.tech/img/bVHGaZ" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><a href="https://jackgit.github.io/circle-split/index.html" rel="nofollow noreferrer" target="_blank">online demo</a></p>
<p>在demo中任意从本地选择一张图片，然后通过鼠标移动或者移动端touchmove就能实现圆形分裂的效果。</p>
<h2 id="articleHeader1">使用</h2>
<p>如果觉得用得着，你可以在自己的项目中安装使用这个效果。<code>npm i circle-split -S</code></p>
<h2 id="articleHeader2">难点</h2>
<p>说是难点，其实根本不难。一开始看到的时候会好奇大大小小的圆形的颜色是怎么计算的，计算该面积下的平均值？其实很简单，就是从绘制了图片的canvas上获取圆心坐标在图片对应位置上的颜色值。这样的算法在圆形半径较大的时候，对被遮盖的图片区域颜色代表性其实不好，但是从整个分裂过程来看，这个取色方案的效果还不错。</p>
<h2 id="articleHeader3">关键技术点</h2>
<ul>
<li><p>canvas绘图：<a href="https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/drawImage" rel="nofollow noreferrer" target="_blank">CanvasRenderingContext2D.drawImage()</a></p></li>
<li><p>canvas绘制圆形：<a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc" rel="nofollow noreferrer" target="_blank">CanvasRenderingContext2D.arc()</a></p></li>
<li><p>canvas上取指定坐标上的颜色值：<a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData" rel="nofollow noreferrer" target="_blank">CanvasRenderingContext2D.getImageData()</a></p></li>
</ul>
<h2 id="articleHeader4">思路</h2>
<ol>
<li><p>将图片绘制在一个offline（即不用挂在DOM树上）的canvas上，为了在指定位置获取颜色用</p></li>
<li><p>创建另一个canvas，用来绘制圆。两个canvas尺寸保持一致（而且都是方形），方便无需坐标转换获取颜色</p></li>
<li><p>绘制第一个圆形，以canvas中心为圆心，使用对应offline canvas坐标上的颜色填充</p></li>
<li><p>维持一个<code>circles</code>数组，代表所有的圆，每个元素有坐标（x, y），半径（r）和是否标记分裂（readyToSplit）</p></li>
<li><p>需要一个渲染循环（rendering loop），不断的找出被标记需要分裂（readyToSplit）的圆，拿去做分裂绘制</p></li>
<li><p>事件处理：当mousemove或者touchmove发生在圆上时，该圆被标记<code>readyToSplit = true</code>，后面的则有渲染循环去处理</p></li>
</ol>
<h2 id="articleHeader5">测试驱动</h2>
<p>在我自己做这样的编程时，会以测试驱动的方式开始代码。因此会脑子里先写下自己的类将被如何使用，怎么样能够简单易用。</p>
<p>我打算把这个效果封装成一个类，它将在使用时被实例化。最终的效果肯定是要在DOM树上显示的，所以这里在实例化时肯定需要指定一个mount节点，所有的事情在其内部进行。而且，按照通常的习惯，开放一些配置，使得使用者可以做一些简单的定制化。但是目前还没有想好哪些内部的配置拿出来比较合适，所以第二个参数<code>options</code>可以后面再考虑。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var cs = new CircleSplit('#mountNode', options);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> cs = <span class="hljs-keyword">new</span> <span class="hljs-type">CircleSplit</span>(<span class="hljs-string">'#mountNode'</span>, options);</code></pre>
<p>我希望能够动态的切换显示的图片内容，所以想提供一个<code>setImage</code>的方法，它应该能接受图片路径，或者<code>Image</code>元素对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cs.setImage(image);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code style="word-break: break-word; white-space: initial;">cs.setImage(image)<span class="hljs-comment">;</span></code></pre>
<p>OK，这就是目前我希望的实例化方式，和想要提供的接口。后面再具体实现过程中，可以再继续添加或者修改。</p>
<h2 id="articleHeader6">试想内部</h2>
<p>结合前面谈到的实现思路，考虑<code>CircleSplit</code>类里面该如果定义属性和私有共有方法。</p>
<p><strong>从构造函数入手</strong>。个人习惯在构造函数最后加上init方法，init方法里做一些准备工作，完成<code>setImage</code>前的一些必要的事情。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function CircleSplit (el, options) {
        ...
        this._init();
}

CircleSplit.prototype._init = function () {
    this._createSourceCanvas(); // 创建源canvas，用来绘制图片，作为offline canvas，提供坐标颜色使用
    this._createTargetCanvas(); // 创建目标canvas，用来绘制看到的大大小小的圆
    this._render(); // 开启渲染循环
    this.bindEvent(); // 绑定事件，touchmove mousemove这些
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">CircleSplit</span> (<span class="hljs-params">el, options</span>) </span>{
        ...
        <span class="hljs-keyword">this</span>._init();
}

CircleSplit.prototype._init = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>._createSourceCanvas(); <span class="hljs-comment">// 创建源canvas，用来绘制图片，作为offline canvas，提供坐标颜色使用</span>
    <span class="hljs-keyword">this</span>._createTargetCanvas(); <span class="hljs-comment">// 创建目标canvas，用来绘制看到的大大小小的圆</span>
    <span class="hljs-keyword">this</span>._render(); <span class="hljs-comment">// 开启渲染循环</span>
    <span class="hljs-keyword">this</span>.bindEvent(); <span class="hljs-comment">// 绑定事件，touchmove mousemove这些</span>
}</code></pre>
<p>这样我们一下子多了好几个函数，而且目的都很明确，因此可以很容易的判断需要那些实例属性和该如何实现各自函数体。这里可能需要多注意一下<code>_render()</code>，思路中谈到在这里应该去绘制需要分裂的圆，那么大致应该像下面这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="CircleSplit.prototype._render = function () {
    // 循环体
    this.circles.forEach(function (circle) {
        if (circle.readyToSplit) {
            this._splitCircle(circle);
            circle.readyToSplit = false;
        }
    }, this);
    
    // 下一个循环
    requestAnimationFrame(this._render.bind(this));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>CircleSplit.prototype._render = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-comment">// 循环体</span>
    <span class="hljs-keyword">this</span>.circles.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(circle)</span> </span>{
        <span class="hljs-keyword">if</span> (circle.readyToSplit) {
            <span class="hljs-keyword">this</span>._splitCircle(circle);
            circle.readyToSplit = <span class="hljs-literal">false</span>;
        }
    }, <span class="hljs-keyword">this</span>);
    
    <span class="hljs-comment">// 下一个循环</span>
    requestAnimationFrame(<span class="hljs-keyword">this</span>._render.bind(<span class="hljs-keyword">this</span>));
}</code></pre>
<p>而什么时候设置<code>circle.readyToSplit</code>呢？就是在<code>bindEvent()</code>的事件处理函数里面。这里会通过<code>_tagCircle()</code>遍历circles，找到能hit到事件坐标的一个圆，将其标记（tag）上readyToSplit。</p>
<p><strong>从共有方法入手</strong>。<code>setImage</code>之后，相当于将整个CircleSplit中的状态都重置了下，<code>circles</code>数组得重置，两个canvas得重置等。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="CircleSplit.prototype.setImage = function (image) {
    this._resetCanvas(this.sourceCanvas); // clear source canvas
    this._drawSourceImage(image); // draw source canvas
    this._resetCanvas(this.targetCanvas); // clear target canvas
    this._drawCircle(x, y, r) // draw target canvas。绘制第一个，也是最大的一个圆形。圆心为canvas中心，半径为canvas的一半
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>CircleSplit.prototype.setImage = function (image) {
    <span class="hljs-keyword">this</span>._resetCanvas(<span class="hljs-keyword">this</span>.sourceCanvas); <span class="hljs-comment">// clear source canvas</span>
    <span class="hljs-keyword">this</span>._drawSourceImage(image); <span class="hljs-comment">// draw source canvas</span>
    <span class="hljs-keyword">this</span>._resetCanvas(<span class="hljs-keyword">this</span>.targetCanvas); <span class="hljs-comment">// clear target canvas</span>
    <span class="hljs-keyword">this</span>._drawCircle(x, y, r) <span class="hljs-comment">// draw target canvas。绘制第一个，也是最大的一个圆形。圆心为canvas中心，半径为canvas的一半</span>
}</code></pre>
<p><code>_drawSourceImage()</code>里面就是调用了<code>CanvasRenderingContext2D.drawImage()</code>进行图片绘制。这个API函数有3种传参形式，我这里选择了5参数的形式，使用了自己写的简易的居中库<a href="https://www.npmjs.com/package/center-it" rel="nofollow noreferrer" target="_blank">CenterIt</a>，来解决图片居中绘制问题：无论图片尺寸，都可以轻易的居中覆盖填充（cover）或者居中包含（contain）填充。</p>
<p>这里的<code>_drawCircle(x, y, r)</code>应该能重用，后面每次圆形分裂的时候都能调用。初步给它3个参数，圆心坐标和半径。在其内部应该能够自己去获取坐标对应的颜色值。所以简单想象一下它的内部：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="CircleSplit.prototype._drawCircle = function (x, y, r) {
    ...
    context.fillStyle = this._getColor(x, y); // 获取坐标颜色
  context.beginPath();
  context.arc(x, y, r, 0, 2 * Math.PI);
  context.closePath();
  context.fill();
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>CircleSplit.prototype._drawCircle = function (x, y, r) {
    ...
    <span class="hljs-built_in">context</span>.fillStyle = this._getColor(x, y)<span class="hljs-comment">; // 获取坐标颜色</span>
  <span class="hljs-built_in">context</span>.<span class="hljs-keyword">beginPath();
</span>  <span class="hljs-built_in">context</span>.arc(x, y, r, <span class="hljs-number">0</span>, <span class="hljs-number">2</span> * Math.PI)<span class="hljs-comment">;</span>
  <span class="hljs-built_in">context</span>.<span class="hljs-keyword">closePath();
</span>  <span class="hljs-built_in">context</span>.fill()<span class="hljs-comment">;</span>
    ...
}</code></pre>
<p>绘制圆时使用<code>CanvasRenderingContext2D.arc()</code>API，使用起来不算简单明了，每次还需要begin和close Path。相比而下，一些canvas的游戏库或者图形库，则简单直观的多：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// create.js
var circle = new createjs.Shape();
circle.graphics.beginFill(&quot;DeepSkyBlue&quot;).drawCircle(0, 0, 50);

// two.js
var circle = two.makeCircle(72, 100, 50);
circle.fill = '#FF8000';
circle.stroke = 'orangered';
circle.linewidth = 5;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-comment">// create.js</span>
var <span class="hljs-built_in">circle</span> = <span class="hljs-keyword">new</span> createjs.Shape();
<span class="hljs-built_in">circle</span>.graphics.beginFill(<span class="hljs-string">"DeepSkyBlue"</span>).drawCircle(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">50</span>);

<span class="hljs-comment">// two.js</span>
var <span class="hljs-built_in">circle</span> = two.makeCircle(<span class="hljs-number">72</span>, <span class="hljs-number">100</span>, <span class="hljs-number">50</span>);
<span class="hljs-built_in">circle</span>.<span class="hljs-built_in">fill</span> = <span class="hljs-string">'#FF8000'</span>;
<span class="hljs-built_in">circle</span>.<span class="hljs-built_in">stroke</span> = <span class="hljs-string">'orangered'</span>;
<span class="hljs-built_in">circle</span>.linewidth = <span class="hljs-number">5</span>;</code></pre>
<p>因此，如果要做比较复杂的绘制操作，推荐找一个适合自己的canvas库，会使得工作变得容易的多。</p>
<p>关于<code>_getColor()</code>函数，这里使用了<code>CanvasRenderingContext2D.getImageData()</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="CircleSplit.prototype._getColor = function (x, y) {
    ...
    var pixelData = this.sourceCanvas.getContext('2d').getImageData(parseInt(x), parseInt(y), 1, 1).data;
  return 'rgb(' + pixelData[0] + ',' + pixelData[1] + ',' + pixelData[2] + ')';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code>CircleSplit.prototype._getColor = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">x, y</span>) </span>{
    ...
    <span class="hljs-built_in">var</span> pixelData = <span class="hljs-keyword">this</span>.sourceCanvas.getContext(<span class="hljs-string">'2d'</span>).getImageData(<span class="hljs-built_in">parseInt</span>(x), <span class="hljs-built_in">parseInt</span>(y), <span class="hljs-number">1</span>, <span class="hljs-number">1</span>).data;
  <span class="hljs-keyword">return</span> <span class="hljs-string">'rgb('</span> + pixelData[<span class="hljs-number">0</span>] + <span class="hljs-string">','</span> + pixelData[<span class="hljs-number">1</span>] + <span class="hljs-string">','</span> + pixelData[<span class="hljs-number">2</span>] + <span class="hljs-string">')'</span>;
}</code></pre>
<p>如下图：</p>
<p><span class="img-wrap"><img data-src="http://ofkyhrvda.bkt.clouddn.com/post/image/o_1b5db3ehq1knbvs6knr1jfdal0m.jpeg" src="https://static.alili.techhttp://ofkyhrvda.bkt.clouddn.com/post/image/o_1b5db3ehq1knbvs6knr1jfdal0m.jpeg" alt="getImageData illustration" title="getImageData illustration" style="cursor: pointer;"></span></p>
<p>假设左上角起始点为(x, y)，一个方格为一个像素，那么<code>getImageData(x, y, 1, 1).data</code>就会返回<code>[255,0,0,255]</code>，代表Red=255，Alpha=255。如果<code>getImageData(x, y, 2, 2).data</code>就会返回<code>[255,0,0,255, 255,0,0,255, 255,0,0,255, 255,0,0,255]</code> 长度为16的数组，每4个为一组代表一个像素上的rgba值。<code>getImageData()</code>就是一个能帮助我们对canvas进行像素级别操作的API函数。</p>
<p>一些基于canvas的“刮刮卡”插件，也是<code>getImageData()</code>的应用：在图片上绝对定位一个灰色的canvas，代表刮刮卡蒙层；通过对手指触摸的像素点的alpha值进行修改来实现被“刮“开的效果。当然这里的修改需要使用到配套的<code>putImageData()</code>函数；同时对整个canvas像素中alpha值为0的像素点的百分比 进行统计，可以完成刮开了80%就展示全部图片的效果。</p>
<h2 id="articleHeader7">实现</h2>
<p>上面是大致的实现思路，和编码的思想过程。为了表达出我自己在完成一个功能的时候，是如何从无到有，定义属性，定义API的。只是自己的一点经验，希望有帮助。</p>
<p>如果你对这些知识不熟悉，却也感兴趣的话，可以参考该<a href="https://github.com/JackGit/circle-split" rel="nofollow noreferrer" target="_blank">github项目代码</a></p>
<h2 id="articleHeader8">问题与优化</h2>
<p>github上的代码与上面讲的思路一致，但是会有些不一样，主要是在功能实现之后，发现了一个需要优化的地方。</p>
<p><strong>渲染速度</strong> 在<code>_render()</code>渲染循环中，我们对所有的circles进行遍历。但是当整副图片分裂次数很彻底时，会有上万个圆，会导致每个渲染循环里的计算时间过长，导致下一个渲染循环在理想的时间后才执行，从而导致了卡顿的感觉。于是为了解决这个问题，引入了<code>renderingCircles</code>数组，将被标记的circle全部插入这个数组中，渲染循环中只关心这里的值，用额外的存储空间换更短的计算时间。</p>
<p><strong>显示模糊</strong> 最先的实现中，两个canvas得尺寸是根据mountNode决定的，<code>canvas.width</code> <code>canvas.height</code>被设为和mountNode一样的维度值。于是在一些设备上显示出明显的边缘锯齿。这里的解决方案就是设置canvas的宽和高为两倍于mountNode的宽高，然后通过style去设置canvas显示成和mountNode一样的尺寸。这里就是canvas的自身的宽高属性和canvas style的宽高之前的区别的理解和应用。</p>
<p><strong>图片跨域问题</strong> 在canvas操作图片时，可能会碰到这样的错误信息：Unable to get image data from canvas because the canvas has been tainted by cross-origin data.</p>
<p>关于这个的<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/CORS_enabled_image" rel="nofollow noreferrer" target="_blank">官方解释</a>是：</p>
<blockquote><p>在canvas上可以绘制没有跨域许可的图片资源（images without CORS approval），但是这样做会“感染（taints）”的canvas，而在感染的（tainted）canvas上调用<code>toBlog()</code>，<code>toDataURL()</code>，<code>getImageData()</code>会抛出上面的安全方面的错误。</p></blockquote>
<p>在<code>CircleSplit.setImage(imageUrl)</code>时，可能就会碰到这个问题。<br>解决方案，首先需要图片有跨域许可。这个需要在提供图片服务的server上进行配置。这里不多介绍，有跨域许可的图片被加载时，在控制台上应该能看到：（这里我使用的七牛的图片）</p>
<p><span class="img-wrap"><img data-src="http://ofkyhrvda.bkt.clouddn.com/post/image/o_1b5dd4jcm1migj6asdc1cq11jqp10.jpeg" src="https://static.alili.techhttp://ofkyhrvda.bkt.clouddn.com/post/image/o_1b5dd4jcm1migj6asdc1cq11jqp10.jpeg" alt="access-control-allow-origin" title="access-control-allow-origin" style="cursor: pointer;"></span></p>
<p>其次，需要在加载图片时，设置crossOrigin属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var image = new Image();
image.crossOrigin = 'anonymous';
image.onload = function () {};
image.src = imageUrl;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> image = <span class="hljs-keyword">new</span> Image();
image.crossOrigin = <span class="hljs-string">'anonymous'</span>;
image.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{};
image.src = imageUrl;</code></pre>
<h2 id="articleHeader9">应用</h2>
<p>其实个人很喜欢最后完成的交互效果（有点强迫症，喜欢不断的戳掉泡泡），于是将这个小效果做了一个简单的H5页面，在年底这个时间点里，讲述和回顾在2016年的大事件。你也可以来体验下：<a href="https://jackyang-me.github.io/2016-recap.jackyang.me/" rel="nofollow noreferrer" target="_blank">2016-recap</a></p>
<p>原文地址：<a href="http://blog.jackyang.me/blog/index.html#/post/5863182161ff4b006cf3f5f5" rel="nofollow noreferrer" target="_blank">http://blog.jackyang.me/blog/...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用CANVAS实现交互性圆形马赛克效果

## 原文链接
[https://segmentfault.com/a/1190000007983811](https://segmentfault.com/a/1190000007983811)

