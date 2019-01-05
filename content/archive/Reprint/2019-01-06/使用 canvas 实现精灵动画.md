---
title: '使用 canvas 实现精灵动画' 
date: 2019-01-06 2:30:10
hidden: true
slug: qnkq2h1jixj
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>文章首发于个人博客：<a href="http://heavenru.com" rel="nofollow noreferrer" target="_blank">http://heavenru.com</a></p></blockquote>
<p>在最近项目中需要实现一个精灵动画，素材方只提供了一个短视频素材，所以在实现精灵动画之前先介绍两个工具来帮助我们更好的实现需求。在这篇文章中，主要是介绍两个命令行工具来实现将一个短视频文件转化成一张 sprite 图片与如何使用 canvas 绘制精灵动画</p>
<p>两个工具官方地址如下：</p>
<ul>
<li><p><a href="https://www.ffmpeg.org/" rel="nofollow noreferrer" target="_blank">ffmpeg</a></p></li>
<li><p><a href="http://www.imagemagick.org/script/montage.php" rel="nofollow noreferrer" target="_blank">montage</a></p></li>
</ul>
<h2 id="articleHeader0">1、ffmpeg 视频转图片工具</h2>
<p>ffmpeg 是「一个完整的跨平台解决方案，用于记录，转换和流式传输音频和视频的工具」，它的作用原不止于这篇文章中所介绍的，有兴趣的同学可以自己去官方网站了解更多。</p>
<h3 id="articleHeader1">将视频转成图片输出</h3>
<h4>基本用法</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="./ffmpeg -i jellyfish.mp4 -vf scale=138:-1 -r 8 %04d.png" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">./ffmpeg -i jellyfish.mp4 -vf scale=138:-1 -r 8 %04d.png</code></pre>
<ul>
<li><p><code>-i</code> 视频流输入 URL</p></li>
<li><p><code>-vf</code> 创建由过滤器指定的过滤器，并使用它过滤流，过滤器是要应用于流的过滤器的描述，并且必须具有相同类型流的单个输入和单个输出。对应的过滤器参数必须跟在这个之后，不然无法生效</p></li>
<li><p><code>scale</code> 视频缩放，<code>scale=width:height</code> 其中，如果 <code>height=-1</code> ，则表示自适应高度，按照视频的宽高比输出,后面紧接这 <code>scale=width:height,setar=16:9</code> 则可以指定输出宽高比</p></li>
<li><p><code>-r</code> 视频输出 <code>fps</code> 值, 值越大，则以越高的 <code>fps</code> 切片视频，别名 <code>-framerate</code>，比如我们想以 60fps 去裁剪视频导出图片，则使用 <code>-r 60</code></p></li>
<li><p><code>-aspect</code> 视频输出宽高比，比如常用的 <code>4:3</code>、<code>16:9</code> 都是规范的参数用法</p></li>
<li><p><code>-ss</code> 裁剪开始位置，表示从视频的某个时间开始裁剪，是一个非常有用的参数，该参数使用位置放在 <code>-i</code> 前面，参数格式 <code>hh:mm:ss</code> 表示时分秒</p></li>
<li><p><code>-t</code> 持续时间，表示需要裁剪的视频长度，通常配合 <code>-ss</code> 一起使用，就能实现裁剪任意视频时间段的内容了，比如我们需要裁剪 <code>5-10</code> 秒的视频导出，可以这么配合使用 <code>ffmgeg -ss 00:00:05 -t 00:00:10</code></p></li>
<li><p><code>-vframes</code> 设定输出视频帧数，它是 <code>-frames:v</code> 的别名</p></li>
<li><p><code>-qscale:v 2</code> 指定输出图片质量，取值范围<code>2-31</code>，值越大，质量越差，建议取值 <code>2-5</code></p></li>
</ul>
<h4>综合应用：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 截取 60 秒处的一张图片
ffmpeg -ss 60 -i input.mp4 -qscale:v 2 -vframes 1 output.jpg

// 将视频按照 60fps 的速度导出所有图片
ffmpeg -i input.mp4 -r 60 %04d.png" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs tap"><code>// 截取<span class="hljs-number"> 60 </span>秒处的一张图片
ffmpeg -ss<span class="hljs-number"> 60 </span>-i input.mp4 -qscale:v<span class="hljs-number"> 2 </span>-vframes<span class="hljs-number"> 1 </span>output.jpg

// 将视频按照 60fps 的速度导出所有图片
ffmpeg -i input.mp4 -r<span class="hljs-number"> 60 </span>%04d.png</code></pre>
<h2 id="articleHeader2">2、合并多个图片为一张图片 montage</h2>
<p>通过上面介绍的工具，我们能很轻易的将一个视频转化为一系列的图片文件，那么这个时候，我们就可以使用 <a href="http://www.imagemagick.org/script/montage.php" rel="nofollow noreferrer" target="_blank">montage</a> 工具将前面导出的 n 张图片合并为一张图片</p>
<h4>基本用法：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="montage -border 0 -geometry 138x -tile 89x -quality 100% *.png myvideo.jpg" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">montage -border 0 -geometry 138x -tile 89x -quality 100% *.png myvideo.jpg</code></pre>
<ul>
<li><p><code>-tile</code> 代表需要合并的一行图片数量，当超出这个数字的时候，将换行合并</p></li>
<li><p><code>-quality</code> 代表合成图片质量，取值范围 <code>0 - 100%</code></p></li>
</ul>
<h2 id="articleHeader3">3、绘制 canvas 精灵动画</h2>
<p>在开始编辑代码之前，我们整理一下需求：</p>
<ul>
<li><p>动画需要能循环播放</p></li>
<li><p>动画需要能指定从某一帧开始渲染</p></li>
<li><p>指定渲染多少帧动画</p></li>
<li><p>动画需要能控制渲染帧率</p></li>
<li><p>当精灵图片不是单行的时候，要能实现自动换行渲染</p></li>
</ul>
<p>OK，明白了我们的需求之后，我们开始编写代码。先来一个简易的参数合并工具方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) { // 遍历传入的对象的属性
      if (Object.prototype.hasOwnProperty.call(source, key)) { // 只操作该实例上的属性和方法, 避免循环原型
        target[key] = source[key];
      }
    }
  }
  return target;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> _extends = <span class="hljs-built_in">Object</span>.assign || <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">target</span>) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt; <span class="hljs-built_in">arguments</span>.length; i++) {
    <span class="hljs-keyword">var</span> source = <span class="hljs-built_in">arguments</span>[i];
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> source) { <span class="hljs-comment">// 遍历传入的对象的属性</span>
      <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Object</span>.prototype.hasOwnProperty.call(source, key)) { <span class="hljs-comment">// 只操作该实例上的属性和方法, 避免循环原型</span>
        target[key] = source[key];
      }
    }
  }
  <span class="hljs-keyword">return</span> target;
}</code></pre>
<p>接下来是我们的 canvas 精灵对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Sprite(canvas, opts) {
  var defaults = {
    loop: false,  // 是否循环播放
    frameIndex: 0,  // 当前第几帧
    startFrameIndex: 0, // 其实渲染位置
    tickCount: 0, // 每个时间段内计数器
    ticksPerFrame: 1, // 每个渲染时间段帧数，通过这个来控制动画的渲染速度
    numberOfFrames: 1, // 动画总帧数
    numberOfPerLine: undefined, // 每行动画帧数
    width: 0, // 画布宽度
    height: 0, // 画屏高度
    sprite: undefined  // 图片 image 对象
  };

  var params = opts || {};
  this.canvas = canvas;
  this.ctx = canvas.getContext('2d');
  this.options = _extends({}, defaults, params);

  if (this.image) throw new Error('请传入图片对象');

  // 这里的取 Math.min() 的原因是，在 safari 下面，如果图片的大小超过了画布的大小，那么将不会渲染任何图像
  // 所以在这里，我们去画布和图片中的小者。
  this.options.width = Math.min(this.canvas.width, this.options.sprite.width);
  this.options.height = Math.min(this.canvas.height, this.options.sprite.height);
  if (!this.options.numberOfPerLine) {
    this.options.numberOfPerLine = this.options.numberOfFrames || 9999;
  }
}

Sprite.prototype.render = function () {
  this.ctx.clearRect(0, 0, this.options.width, this.options.height);
  // 核心绘制代码，主要使用了 canvas.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) API
  // this.options.frameIndex % this.options.numberOfPerLine 每次求余数，判断是否换行
  // Math.floor(this.options.frameIndex / this.options.numberOfPerLine)
  this.ctx.drawImage(this.options.sprite, this.options.width * (this.options.frameIndex % this.options.numberOfPerLine), this.options.height * Math.floor(this.options.frameIndex / this.options.numberOfPerLine), this.options.width, this.options.height, 0, 0, this.options.width, this.options.height);
}

Sprite.prototype.update = function () {
  this.options.tickCount++;
  // 控制帧率的核心部分，在每个绘制时间点，判断当前的计数器是否大于我们传入的值
  if (this.options.tickCount > this.options.ticksPerFrame) {
    this.options.tickCount = 0;

    // 动画循环判断
    if (this.options.frameIndex < this.options.numberOfFrames - 1) {
      this.options.frameIndex++;
    } else if (this.options.loop) {
      // 每次循环都从给定的 startFrameIndex 开始
      this.options.frameIndex = this.options.startFrameIndex;
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Sprite</span>(<span class="hljs-params">canvas, opts</span>) </span>{
  <span class="hljs-keyword">var</span> defaults = {
    <span class="hljs-attr">loop</span>: <span class="hljs-literal">false</span>,  <span class="hljs-comment">// 是否循环播放</span>
    frameIndex: <span class="hljs-number">0</span>,  <span class="hljs-comment">// 当前第几帧</span>
    startFrameIndex: <span class="hljs-number">0</span>, <span class="hljs-comment">// 其实渲染位置</span>
    tickCount: <span class="hljs-number">0</span>, <span class="hljs-comment">// 每个时间段内计数器</span>
    ticksPerFrame: <span class="hljs-number">1</span>, <span class="hljs-comment">// 每个渲染时间段帧数，通过这个来控制动画的渲染速度</span>
    numberOfFrames: <span class="hljs-number">1</span>, <span class="hljs-comment">// 动画总帧数</span>
    numberOfPerLine: <span class="hljs-literal">undefined</span>, <span class="hljs-comment">// 每行动画帧数</span>
    width: <span class="hljs-number">0</span>, <span class="hljs-comment">// 画布宽度</span>
    height: <span class="hljs-number">0</span>, <span class="hljs-comment">// 画屏高度</span>
    sprite: <span class="hljs-literal">undefined</span>  <span class="hljs-comment">// 图片 image 对象</span>
  };

  <span class="hljs-keyword">var</span> params = opts || {};
  <span class="hljs-keyword">this</span>.canvas = canvas;
  <span class="hljs-keyword">this</span>.ctx = canvas.getContext(<span class="hljs-string">'2d'</span>);
  <span class="hljs-keyword">this</span>.options = _extends({}, defaults, params);

  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.image) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'请传入图片对象'</span>);

  <span class="hljs-comment">// 这里的取 Math.min() 的原因是，在 safari 下面，如果图片的大小超过了画布的大小，那么将不会渲染任何图像</span>
  <span class="hljs-comment">// 所以在这里，我们去画布和图片中的小者。</span>
  <span class="hljs-keyword">this</span>.options.width = <span class="hljs-built_in">Math</span>.min(<span class="hljs-keyword">this</span>.canvas.width, <span class="hljs-keyword">this</span>.options.sprite.width);
  <span class="hljs-keyword">this</span>.options.height = <span class="hljs-built_in">Math</span>.min(<span class="hljs-keyword">this</span>.canvas.height, <span class="hljs-keyword">this</span>.options.sprite.height);
  <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.options.numberOfPerLine) {
    <span class="hljs-keyword">this</span>.options.numberOfPerLine = <span class="hljs-keyword">this</span>.options.numberOfFrames || <span class="hljs-number">9999</span>;
  }
}

Sprite.prototype.render = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.ctx.clearRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-keyword">this</span>.options.width, <span class="hljs-keyword">this</span>.options.height);
  <span class="hljs-comment">// 核心绘制代码，主要使用了 canvas.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight) API</span>
  <span class="hljs-comment">// this.options.frameIndex % this.options.numberOfPerLine 每次求余数，判断是否换行</span>
  <span class="hljs-comment">// Math.floor(this.options.frameIndex / this.options.numberOfPerLine)</span>
  <span class="hljs-keyword">this</span>.ctx.drawImage(<span class="hljs-keyword">this</span>.options.sprite, <span class="hljs-keyword">this</span>.options.width * (<span class="hljs-keyword">this</span>.options.frameIndex % <span class="hljs-keyword">this</span>.options.numberOfPerLine), <span class="hljs-keyword">this</span>.options.height * <span class="hljs-built_in">Math</span>.floor(<span class="hljs-keyword">this</span>.options.frameIndex / <span class="hljs-keyword">this</span>.options.numberOfPerLine), <span class="hljs-keyword">this</span>.options.width, <span class="hljs-keyword">this</span>.options.height, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-keyword">this</span>.options.width, <span class="hljs-keyword">this</span>.options.height);
}

Sprite.prototype.update = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.options.tickCount++;
  <span class="hljs-comment">// 控制帧率的核心部分，在每个绘制时间点，判断当前的计数器是否大于我们传入的值</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.options.tickCount &gt; <span class="hljs-keyword">this</span>.options.ticksPerFrame) {
    <span class="hljs-keyword">this</span>.options.tickCount = <span class="hljs-number">0</span>;

    <span class="hljs-comment">// 动画循环判断</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.options.frameIndex &lt; <span class="hljs-keyword">this</span>.options.numberOfFrames - <span class="hljs-number">1</span>) {
      <span class="hljs-keyword">this</span>.options.frameIndex++;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.options.loop) {
      <span class="hljs-comment">// 每次循环都从给定的 startFrameIndex 开始</span>
      <span class="hljs-keyword">this</span>.options.frameIndex = <span class="hljs-keyword">this</span>.options.startFrameIndex;
    }
  }
}</code></pre>
<p>到这里，我们的精灵类基本完成了，接下来看下具体在业务代码中如何使用它</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var spriteCanvas = document.getElementById('spriteCanvas');
spriteCanvas.width = 138;
spriteCanvas.height = 308;
var isSpriteLoaded = false;
var spriteImage = new Image();
var sprite;

// 这里有个 IE 下的 BUG，如果我们的 sprite 在图片没有加载完全就执行
// 那么在 IE 下面会抛出一个 DOM Exception
// 因此我们将 Sprite 初始化放在了 image.onlaod 回调函数中执行
sprite.onload = function () {
  sprite = new Sprite(spriteCanvas, {
    sprite: spriteImage,
    loop: true,
    numberOfFrames: 92,
    ticksPerFrame: 3
  });

  spriteAnimate();
}

sprite.src = 'xxxxx/sprite.jpg';

function spriteAnimate() {
  requestAnimationFrame(spriteAnimate);
  sprite.render();
  sprite.update();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> spriteCanvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'spriteCanvas'</span>);
spriteCanvas.width = <span class="hljs-number">138</span>;
spriteCanvas.height = <span class="hljs-number">308</span>;
<span class="hljs-keyword">var</span> isSpriteLoaded = <span class="hljs-literal">false</span>;
<span class="hljs-keyword">var</span> spriteImage = <span class="hljs-keyword">new</span> Image();
<span class="hljs-keyword">var</span> sprite;

<span class="hljs-comment">// 这里有个 IE 下的 BUG，如果我们的 sprite 在图片没有加载完全就执行</span>
<span class="hljs-comment">// 那么在 IE 下面会抛出一个 DOM Exception</span>
<span class="hljs-comment">// 因此我们将 Sprite 初始化放在了 image.onlaod 回调函数中执行</span>
sprite.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  sprite = <span class="hljs-keyword">new</span> Sprite(spriteCanvas, {
    <span class="hljs-attr">sprite</span>: spriteImage,
    <span class="hljs-attr">loop</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">numberOfFrames</span>: <span class="hljs-number">92</span>,
    <span class="hljs-attr">ticksPerFrame</span>: <span class="hljs-number">3</span>
  });

  spriteAnimate();
}

sprite.src = <span class="hljs-string">'xxxxx/sprite.jpg'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">spriteAnimate</span>(<span class="hljs-params"></span>) </span>{
  requestAnimationFrame(spriteAnimate);
  sprite.render();
  sprite.update();
}</code></pre>
<p>文章到这里基本完成了，想要看具体效果的同学，可以去这里查看<br>传送门： <a href="https://www.meizu.com/pro7/fenetre/" rel="nofollow noreferrer" target="_blank">水母动画</a>， <a href="https://www.meizu.com/pro7/summary/" rel="nofollow noreferrer" target="_blank">蜂鸟动画</a></p>
<h2 id="articleHeader4">参考资料</h2>
<p><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage" rel="nofollow noreferrer" target="_blank">https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage</a><br><a href="http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/" rel="nofollow noreferrer" target="_blank">http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 canvas 实现精灵动画

## 原文链接
[https://segmentfault.com/a/1190000010435543](https://segmentfault.com/a/1190000010435543)

