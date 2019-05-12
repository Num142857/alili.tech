---
title: 使用Canvas操作像素
hidden: true
categories: [reprint]
slug: b06c3a33
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <p>现代浏览器支持通过<code>&lt;video&gt;</code>元素播放视频。大多数浏览器也可以通过<a href="https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia">MediaDevices.getUserMedia()</a> API访问摄像头。但即使这两件事结合起来，我们也无法直接访问和操纵这些像素。</p>
<p>幸运的是，浏览器有一个<a href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API">Canvas API</a>，允许我们使用JavaScript绘制图形。实际上，我们可以从视频本身将图像绘制到<code>&lt;canvas&gt;</code>，这使我们能够操作和展示这些像素。</p>
<p>您在此学到的关于如何操作像素的方法，将成为您提供处理任何种类或任何来源的图像和视频的基础，而不仅仅是 canvas。</p>
<h3>将图像添加到画布</h3>
<p>在我们开始播放视频之前，让我们看看如何将图像添加到画布。</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"Canvas"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"video"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre>
<p>我们创建了一个图像元素来表示要在画布上绘制的图像。或者，我们可以在JavaScript中使用Image对象。</p>
<pre><code class="hljs maxima"><span class="hljs-built_in">var</span> canvas;
<span class="hljs-built_in">var</span> <span class="hljs-built_in">context</span>;

function init() {
  <span class="hljs-built_in">var</span> <span class="hljs-built_in">image</span> = document.getElementById('SourceImage');
  canvas = document.getElementById('Canvas');
  <span class="hljs-built_in">context</span> = canvas.getContext('2d');

  drawImage(<span class="hljs-built_in">image</span>);
  // Or
  // <span class="hljs-built_in">var</span> <span class="hljs-built_in">image</span> = <span class="hljs-built_in">new</span> Image();
  // <span class="hljs-built_in">image</span>.onload = function () {
  //    drawImage(<span class="hljs-built_in">image</span>);
  // }
  // <span class="hljs-built_in">image</span>.src = '<span class="hljs-built_in">image</span>.jpg';
}

function drawImage(<span class="hljs-built_in">image</span>) {
  // Set the canvas the same <span class="hljs-built_in">width</span> <span class="hljs-keyword">and</span> <span class="hljs-built_in">height</span> of the <span class="hljs-built_in">image</span>
  canvas.<span class="hljs-built_in">width</span> = <span class="hljs-built_in">image</span>.<span class="hljs-built_in">width</span>;
  canvas.<span class="hljs-built_in">height</span> = <span class="hljs-built_in">image</span>.<span class="hljs-built_in">height</span>;

  <span class="hljs-built_in">context</span>.drawImage(<span class="hljs-built_in">image</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
}

window.addEventListener('<span class="hljs-built_in">load</span>', init);
</code></pre>
<p>上面的代码将整个图像绘制到画布上。</p>
<p>通过<a href="https://codepen.io">CodePen</a>上的Welling Guzman（(<a href="https://codepen.io/wellingguzman">@wellingguzman</a>）查看画布上的 <a href="https://codepen.io/wellingguzman/pen/yjEYYX/">Paint image on canvas</a> 图像。</p>
<p>现在我们可以开始玩这些像素了！</p>
<h3>更新图像数据</h3>
<p>画布上的图像数据允许我们操纵和更改像素。</p>
<p>data属性是一个<a href="https://developer.mozilla.org/en-US/docs/Web/API/ImageData">ImageData</a> 对象，它具有三个属性 - 宽度，高度和数据/所有这些都代表基于原始图像的东西。所有这些属性都是只读的。我们关心的是数据，一个由<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray">Uint8ClampedArray</a> 对象表示的一维数组，包含RGBA格式中每个像素的数据。</p>
<p>尽管数据属性是只读的，但并不意味着我们无法更改其值。这意味着我们不能将另一个数组分配给此属性。</p>
<pre><code class="hljs arduino"><span class="hljs-comment">// Get the canvas image data</span>
var imageData = context.getImageData(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, canvas.<span class="hljs-built_in">width</span>, canvas.<span class="hljs-built_in">height</span>);

<span class="hljs-built_in">image</span>.data = <span class="hljs-keyword">new</span> Uint8ClampedArray(); <span class="hljs-comment">// WRONG</span>
<span class="hljs-built_in">image</span>.data[<span class="hljs-number">1</span>] = <span class="hljs-number">0</span>; <span class="hljs-comment">// CORRECT</span>
</code></pre>
<p>你可能会问，Uint8ClampedArray对象代表什么值。以下是来自MDN的描述：</p>
<blockquote>
<p><strong> Uint8ClampedArray </strong> 类型数组表示一个8位无符号整数的数组，它被钳位到0-255;如果您指定的值超出[0,255]的范围，则将设置0或255;如果你指定一个非整数，最近的整数将被设置。内容初始化为0.一旦建立，就可以使用对象的方法引用数组中的元素，或使用标准数组索引语法（即使用括号表示法）</p>
</blockquote>
<p>简而言之，这个数组在每个位置存储范围从0到255的值，这使得它成为RGBA格式的完美解决方案，因为每个部分都由0到255个值表示。</p>
<h4>RGBA颜色</h4>
<p>颜色可以用RGBA格式表示，它是红色，绿色和蓝色的组合。 A表示颜色不透明度的α值。</p>
<p>数组中的每个位置代表一个颜色（像素）通道值。</p>
<ul>
<li>第一个位置是红色值</li>
<li>第二个位置是绿色值</li>
<li>第三个位置是蓝色值</li>
<li>第四个位置是Alpha值</li>
<li>第5个位置是下一个像素红色值</li>
<li>第6个位置是下一个像素的绿色值</li>
<li>第7个位置是下一个像素的蓝色值</li>
<li>第8个位置是下一个像素Alpha值</li>
<li>等等...</li>
</ul>
<p>如果您有2x2图像，那么我们有一个16位阵列（每个2x2像素x 4值）。</p>
<p><img src="http://s0.qhres.com/static/7cc6f407b21e4a93.css" alt=""></p>
<p>2x2图像缩小了</p>
<p>该数组将如下所示：</p>
<pre><code class="hljs lsl"><span class="hljs-comment">// RED                 GREEN                BLUE                 WHITE</span>
[ <span class="hljs-number">255</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">255</span>,      <span class="hljs-number">0</span>, <span class="hljs-number">255</span>, <span class="hljs-number">0</span>, <span class="hljs-number">255</span>,      <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">255</span>, <span class="hljs-number">255</span>,      <span class="hljs-number">255</span>, <span class="hljs-number">255</span>, <span class="hljs-number">255</span>, <span class="hljs-number">255</span>]
</code></pre>
<h4>更改像素数据</h4>
<p>我们可以做的最快的事情之一是通过将所有RGBA值更改为255来将所有像素设置为白色。</p>
<pre><code class="hljs javascript"><span class="hljs-comment">// Use a button to trigger the "effect"</span>
<span class="hljs-keyword">var</span> button = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'Button'</span>);

button.addEventListener(<span class="hljs-string">'click'</span>, onClick);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">changeToWhite</span>(<span class="hljs-params">data</span>) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; data.length; i++) {
    data[i] = <span class="hljs-number">255</span>;
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onClick</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> imageData = context.getImageData(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, canvas.width, canvas.height);

  changeToWhite(imageData.data);

  <span class="hljs-comment">// Update the canvas with the new data</span>
  context.putImageData(imageData, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
}
</code></pre>
<p>数据将作为参考传递，这意味着我们对它做出的任何修改，它都会改变传递参数的值。</p>
<h4>反转颜色</h4>
<p>不需要太多计算的好效果就是反转图像的颜色。</p>
<p>可以使用XOR运算符（^）或此公式255 - 值（值必须介于0-255之间）来反转颜色值。</p>
<pre><code class="hljs lsl">function invertColors(data) {
  for (var i = <span class="hljs-number">0</span>; i &lt; data.length; i+= <span class="hljs-number">4</span>) {
    data[i] = data[i] ^ <span class="hljs-number">255</span>; <span class="hljs-comment">// Invert Red</span>
    data[i+<span class="hljs-number">1</span>] = data[i+<span class="hljs-number">1</span>] ^ <span class="hljs-number">255</span>; <span class="hljs-comment">// Invert Green</span>
    data[i+<span class="hljs-number">2</span>] = data[i+<span class="hljs-number">2</span>] ^ <span class="hljs-number">255</span>; <span class="hljs-comment">// Invert Blue</span>
  }
}

function onClick() {
  var imageData = context.getImageData(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, canvas.width, canvas.height);

  invertColors(imageData.data);

  <span class="hljs-comment">// Update the canvas with the new data</span>
  context.putImageData(imageData, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
}
</code></pre>
<p>我们正在像前面那样将循环增加4而不是1，所以我们可以从像素到像素，每个像素填充数组中的4个元素。</p>
<p>alpha值对反转颜色没有影响，所以我们跳过它。</p>
<h4>亮度和对比度</h4>
<p>使用下面的公式可以调整图像的亮度：newValue = currentValue + 255 *（brightness / 100）。</p>
<ul>
<li>亮度必须介于-100和100之间</li>
<li>currentValue是红色，绿色或蓝色的当前光照值。</li>
<li>newValue是当前颜色灯加亮度的结果</li>
<li>调整图像的对比度可以用这个<a href="http://www.dfstudios.co.uk/articles/image-processing-algorithms-part-5">公式</a>来完成：</li>
</ul>
<pre><code class="hljs lisp">factor = (<span class="hljs-number">259</span> * (contrast + 255)) / (255 * (<span class="hljs-number">259</span> - contrast))
color = GetPixelColor(<span class="hljs-name">x</span>, y)
newRed   = Truncate(<span class="hljs-name">factor</span> * (Red(color)   - 128) + 128)
newGreen = Truncate(factor * (<span class="hljs-name">Green</span>(<span class="hljs-name">color</span>) - <span class="hljs-number">128</span>) + <span class="hljs-number">128</span>)
newBlue  = Truncate(<span class="hljs-name">factor</span> * (Blue(color)  - 128) + 128)
</code></pre>
<p>主要计算是获取将应用于每个颜色值的对比度因子。截断是一个确保值保持在0到255之间的函数。</p>
<p>让我们将这些函数写入JavaScript：</p>
<pre><code class="hljs lsl">function applyBrightness(data, brightness) {
  for (var i = <span class="hljs-number">0</span>; i &lt; data.length; i+= <span class="hljs-number">4</span>) {
    data[i] += <span class="hljs-number">255</span> * (brightness / <span class="hljs-number">100</span>);
    data[i+<span class="hljs-number">1</span>] += <span class="hljs-number">255</span> * (brightness / <span class="hljs-number">100</span>);
    data[i+<span class="hljs-number">2</span>] += <span class="hljs-number">255</span> * (brightness / <span class="hljs-number">100</span>);
  }
}

function truncateColor(value) {
  if (value &lt; <span class="hljs-number">0</span>) {
    value = <span class="hljs-number">0</span>;
  } else if (value &gt; <span class="hljs-number">255</span>) {
    value = <span class="hljs-number">255</span>;
  }

  return value;
}

function applyContrast(data, contrast) {
  var factor = (<span class="hljs-number">259.0</span> * (contrast + <span class="hljs-number">255.0</span>)) / (<span class="hljs-number">255.0</span> * (<span class="hljs-number">259.0</span> - contrast));

  for (var i = <span class="hljs-number">0</span>; i &lt; data.length; i+= <span class="hljs-number">4</span>) {
    data[i] = truncateColor(factor * (data[i] - <span class="hljs-number">128.0</span>) + <span class="hljs-number">128.0</span>);
    data[i+<span class="hljs-number">1</span>] = truncateColor(factor * (data[i+<span class="hljs-number">1</span>] - <span class="hljs-number">128.0</span>) + <span class="hljs-number">128.0</span>);
    data[i+<span class="hljs-number">2</span>] = truncateColor(factor * (data[i+<span class="hljs-number">2</span>] - <span class="hljs-number">128.0</span>) + <span class="hljs-number">128.0</span>);
  }
}
</code></pre>
<p>在这种情况下，您不需要truncateColor函数，因为Uint8ClampedArray会截断这些值，但为了翻译我们在其中添加的算法。</p>
<p>需要记住的一点是，如果应用亮度或对比度，则图像数据被覆盖后无法回到之前的状态。如果我们想要重置为原始状态，则原始图像数据必须单独存储以供参考。保持图像变量对其他函数可访问将会很有帮助，因为您可以使用该图像来重绘画布和原始图像。</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">var</span> image = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'SourceImage'</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">redrawImage</span>(<span class="hljs-params"></span>) </span>{
  context.drawImage(image, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
}
</code></pre>
<h3>使用视频</h3>
<p>为了使它适用于视频，我们将采用我们的初始图像脚本和HTML代码并做一些小的修改。</p>
<h4>HTML</h4>
<p>通过替换以下行来更改视频元素的Image元素：</p>
<pre><code class="hljs stylus">&lt;<span class="hljs-selector-tag">img</span> src&gt;
</code></pre>
<p>...with this:</p>
<pre><code class="hljs apache"><span class="hljs-section">&lt;video src&gt;</span><span class="hljs-section">&lt;/video&gt;</span>
</code></pre>
<h4>JavaScript</h4>
<p>替换这一行：</p>
<pre><code class="hljs dart"><span class="hljs-keyword">var</span> image = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'SourceImage'</span>);
</code></pre>
<p>...添加这行：</p>
<pre><code class="hljs dart"><span class="hljs-keyword">var</span> video = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'SourceVideo'</span>);
</code></pre>
<p>要开始处理视频，我们必须等到视频可以播放。</p>
<pre><code class="hljs actionscript">video.addEventListener(<span class="hljs-string">'canplay'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-comment">// Set the canvas the same width and height of the video</span>
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;    

    <span class="hljs-comment">// Play the video</span>
    video.play();

    <span class="hljs-comment">// start drawing the frames  </span>
    drawFrame(video);
});
</code></pre>
<p>当有足够的数据可以播放媒体时，至少在几帧内播放事件播放。</p>
<p>我们无法看到画布上显示的任何视频，因为我们只显示第一帧。我们必须每n毫秒执行一次drawFrame以跟上视频帧速率。</p>
<p>在drawFrame内部，我们每10ms再次调用drawFrame。</p>
<pre><code class="hljs actionscript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawFrame</span><span class="hljs-params">(video)</span> </span>{
  context.drawImage(video, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);

  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    drawFrame(video);
  }, <span class="hljs-number">10</span>);
}
</code></pre>
<p>在执行drawFrame之后，我们创建一个循环，每10ms执行一次drawFrame - 足够的时间让视频在画布中保持同步。</p>
<h4>将效果添加到视频</h4>
<p>我们可以使用我们之前创建的相同函数来反转颜色：</p>
<pre><code class="hljs kotlin">function invertColors(<span class="hljs-keyword">data</span>) {
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-keyword">data</span>.length; i+= <span class="hljs-number">4</span>) {
    <span class="hljs-keyword">data</span>[i] = <span class="hljs-keyword">data</span>[i] ^ <span class="hljs-number">255</span>; <span class="hljs-comment">// Invert Red</span>
    <span class="hljs-keyword">data</span>[i+<span class="hljs-number">1</span>] = <span class="hljs-keyword">data</span>[i+<span class="hljs-number">1</span>] ^ <span class="hljs-number">255</span>; <span class="hljs-comment">// Invert Green</span>
    <span class="hljs-keyword">data</span>[i+<span class="hljs-number">2</span>] = <span class="hljs-keyword">data</span>[i+<span class="hljs-number">2</span>] ^ <span class="hljs-number">255</span>; <span class="hljs-comment">// Invert Blue</span>
  }
}
</code></pre>
<p>并将其添加到drawFrame函数中：</p>
<pre><code class="hljs mipsasm">function drawFrame(video) {
  <span class="hljs-built_in">context</span>.drawImage(video, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>)<span class="hljs-comment">;</span>

  var imageData = <span class="hljs-built_in">context</span>.getImageData(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, canvas.width, canvas.height)<span class="hljs-comment">;</span>
  invertColors(imageData<span class="hljs-meta">.data</span>)<span class="hljs-comment">;</span>
  <span class="hljs-built_in">context</span>.putImageData(imageData, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>)<span class="hljs-comment">;</span>

  setTimeout(function () {
    drawFrame(video)<span class="hljs-comment">;</span>
  }, <span class="hljs-number">10</span>)<span class="hljs-comment">;</span>
}
</code></pre>
<p>我们可以添加一个按钮并切换效果：</p>
<pre><code class="hljs mipsasm">function drawFrame(video) {
  <span class="hljs-built_in">context</span>.drawImage(video, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>)<span class="hljs-comment">;</span>

  if (applyEffect) {
    var imageData = <span class="hljs-built_in">context</span>.getImageData(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, canvas.width, canvas.height)<span class="hljs-comment">;</span>
    invertColors(imageData<span class="hljs-meta">.data</span>)<span class="hljs-comment">;</span>
    <span class="hljs-built_in">context</span>.putImageData(imageData, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>)<span class="hljs-comment">;</span>
  }

  setTimeout(function () {
    drawFrame(video)<span class="hljs-comment">;</span>
  }, <span class="hljs-number">10</span>)<span class="hljs-comment">;</span>
}
</code></pre>
<h3>使用 camera</h3>
<p>我们将保留我们用于视频的相同代码，唯一不同的是我们将使用MediaDevices.getUserMedia将视频流从文件更改为相机流。</p>
<p>MediaDevices.getUserMedia是弃用先前API MediaDevices.getUserMedia（）的新API。浏览器仍旧支持旧版本，并且某些浏览器不支持新版本，我们必须求助于polyfill以确保浏览器支持其中一种。</p>
<p>首先，从视频元素中删除src属性：</p>
<pre><code class="hljs php">&lt;video&gt;&lt;code&gt;&lt;/pre&gt;

&lt;pre&gt;&lt;code&gt;<span class="hljs-comment">// Set the source of the video to the camera stream</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initCamera</span><span class="hljs-params">(stream)</span> </span>{
    video.src = window.URL.createObjectURL(stream);
}

<span class="hljs-keyword">if</span> (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({video: <span class="hljs-keyword">true</span>, audio: <span class="hljs-keyword">false</span>})
    .then(initCamera)
    .<span class="hljs-keyword">catch</span>(console.error)
  );
}
</code></pre>
<p><a href="https://codepen.io/wellingguzman/pen/MGXGQR">Live Demo</a></p>
<h3>效果</h3>
<p>到目前为止，我们所介绍的所有内容都是我们需要的基础，以便为视频或图像创建不同的效果。我们可以通过独立转换每种颜色来使用很多不同的效果。</p>
<h4>灰阶</h4>
<p>将颜色转换为灰度可以使用不同的公式/技巧以不同的方式完成，以避免陷入太深的问题我将向您展示基于 <a href="https://docs.gimp.org/2.6/en/gimp-tool-desaturate.html">GIMP desaturate tool</a>去饱和工具和<a href="https://en.wikipedia.org/wiki/Grayscale#Luma_coding_in_video_systems">Luma</a>的五个公式：</p>
<pre><code class="hljs lsl">Gray = <span class="hljs-number">0.21</span>R + <span class="hljs-number">0.72</span>G + <span class="hljs-number">0.07</span>B <span class="hljs-comment">// Luminosity</span>
Gray = (R + G + B) ÷ <span class="hljs-number">3</span> <span class="hljs-comment">// Average Brightness</span>
Gray = <span class="hljs-number">0.299</span>R + <span class="hljs-number">0.587</span>G + <span class="hljs-number">0.114</span>B <span class="hljs-comment">// rec601 standard</span>
Gray = <span class="hljs-number">0.2126</span>R + <span class="hljs-number">0.7152</span>G + <span class="hljs-number">0.0722</span>B <span class="hljs-comment">// ITU-R BT.709 standard</span>
Gray = <span class="hljs-number">0.2627</span>R + <span class="hljs-number">0.6780</span>G + <span class="hljs-number">0.0593</span>B <span class="hljs-comment">// ITU-R BT.2100 standard</span>
</code></pre>
<p>我们想要使用这些公式找到的是每个像素颜色的亮度等级。该值的范围从0（黑色）到255（白色）。这些值将创建灰度（黑白）效果。</p>
<p>这意味着最亮的颜色将最接近255，最暗的颜色最接近0。</p>
<p><a href="https://codepen.io/wellingguzman/pen/oybBOb">Live Demo</a></p>
<h4>双色调</h4>
<p>双色调效果和灰度效果的区别在于使用了两种颜色。在灰度上，您有一个从黑色到白色的渐变色，而在双色调中，您可以从任何颜色到任何其他颜色（从蓝色到粉红色）都有一个渐变。</p>
<p>使用灰度的强度值，我们可以将其替换为梯度值。</p>
<p>我们需要创建一个从ColorA到ColorB的渐变。</p>
<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createGradient</span>(<span class="hljs-params">colorA, colorB</span>) </span>{   
  <span class="hljs-comment">// Values of the gradient from colorA to colorB</span>
  <span class="hljs-keyword">var</span> gradient = [];
  <span class="hljs-comment">// the maximum color value is 255</span>
  <span class="hljs-keyword">var</span> maxValue = <span class="hljs-number">255</span>;
  <span class="hljs-comment">// Convert the hex color values to RGB object</span>
  <span class="hljs-keyword">var</span> <span class="hljs-keyword">from</span> = getRGBColor(colorA);
  <span class="hljs-keyword">var</span> to = getRGBColor(colorB);

  <span class="hljs-comment">// Creates 256 colors from Color A to Color B</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt;= maxValue; i++) {
    <span class="hljs-comment">// IntensityB will go from 0 to 255</span>
    <span class="hljs-comment">// IntensityA will go from 255 to 0</span>
    <span class="hljs-comment">// IntensityA will decrease intensity while instensityB will increase</span>
    <span class="hljs-comment">// What this means is that ColorA will start solid and slowly transform into ColorB</span>
    <span class="hljs-comment">// If you look at it in other way the transparency of color A will increase and the transparency of color B will decrease</span>
    <span class="hljs-keyword">var</span> intensityB = i;
    <span class="hljs-keyword">var</span> intensityA = maxValue - intensityB;

    <span class="hljs-comment">// The formula below combines the two color based on their intensity</span>
    <span class="hljs-comment">// (IntensityA * ColorA + IntensityB * ColorB) / maxValue</span>
    gradient[i] = {
      <span class="hljs-attr">r</span>: (intensityA*<span class="hljs-keyword">from</span>.r + intensityB*to.r) / maxValue,
      <span class="hljs-attr">g</span>: (intensityA*<span class="hljs-keyword">from</span>.g + intensityB*to.g) / maxValue,
      <span class="hljs-attr">b</span>: (intensityA*<span class="hljs-keyword">from</span>.b + intensityB*to.b) / maxValue
    };
  }

  <span class="hljs-keyword">return</span> gradient;
}

<span class="hljs-comment">// Helper function to convert 6digit hex values to a RGB color object</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getRGBColor</span>(<span class="hljs-params">hex</span>)
</span>{
  <span class="hljs-keyword">var</span> colorValue;

  <span class="hljs-keyword">if</span> (hex[<span class="hljs-number">0</span>] === <span class="hljs-string">'#'</span>) {
    hex = hex.substr(<span class="hljs-number">1</span>);
  }

  colorValue = <span class="hljs-built_in">parseInt</span>(hex, <span class="hljs-number">16</span>);

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">r</span>: colorValue &gt;&gt; <span class="hljs-number">16</span>,
    <span class="hljs-attr">g</span>: (colorValue &gt;&gt; <span class="hljs-number">8</span>) &amp; <span class="hljs-number">255</span>,
    <span class="hljs-attr">b</span>: colorValue &amp; <span class="hljs-number">255</span>
  }
}
</code></pre>
<p>简而言之，我们从颜色A创建一组颜色值，降低强度，同时转到颜色B并增加强度。</p>
<p><img src="" alt=""></p>
<p>从 #0096ff 到 #ff00f0</p>
<p><img src="" alt=""></p>
<p>缩放颜色过渡的表示</p>
<pre><code class="hljs groovy">var gradients = [
  {<span class="hljs-string">r:</span> <span class="hljs-number">32</span>, <span class="hljs-string">g:</span> <span class="hljs-number">144</span>, <span class="hljs-string">b:</span> <span class="hljs-number">254</span>},
  {<span class="hljs-string">r:</span> <span class="hljs-number">41</span>, <span class="hljs-string">g:</span> <span class="hljs-number">125</span>, <span class="hljs-string">b:</span> <span class="hljs-number">253</span>},
  {<span class="hljs-string">r:</span> <span class="hljs-number">65</span>, <span class="hljs-string">g:</span> <span class="hljs-number">112</span>, <span class="hljs-string">b:</span> <span class="hljs-number">251</span>},
  {<span class="hljs-string">r:</span> <span class="hljs-number">91</span>, <span class="hljs-string">g:</span> <span class="hljs-number">96</span>, <span class="hljs-string">b:</span> <span class="hljs-number">250</span>},
  {<span class="hljs-string">r:</span> <span class="hljs-number">118</span>, <span class="hljs-string">g:</span> <span class="hljs-number">81</span>, <span class="hljs-string">b:</span> <span class="hljs-number">248</span>},
  {<span class="hljs-string">r:</span> <span class="hljs-number">145</span>, <span class="hljs-string">g:</span> <span class="hljs-number">65</span>, <span class="hljs-string">b:</span> <span class="hljs-number">246</span>},
  {<span class="hljs-string">r:</span> <span class="hljs-number">172</span>, <span class="hljs-string">g:</span> <span class="hljs-number">49</span>, <span class="hljs-string">b:</span> <span class="hljs-number">245</span>},
  {<span class="hljs-string">r:</span> <span class="hljs-number">197</span>, <span class="hljs-string">g:</span> <span class="hljs-number">34</span>, <span class="hljs-string">b:</span> <span class="hljs-number">244</span>},
  {<span class="hljs-string">r:</span> <span class="hljs-number">220</span>, <span class="hljs-string">g:</span> <span class="hljs-number">21</span>, <span class="hljs-string">b:</span> <span class="hljs-number">242</span>},
  {<span class="hljs-string">r:</span> <span class="hljs-number">241</span>, <span class="hljs-string">g:</span> <span class="hljs-number">22</span>, <span class="hljs-string">b:</span> <span class="hljs-number">242</span>},
];
</code></pre>
<p>上面有一个从＃0096ff到＃ff00f0的10个颜色值的渐变示例。</p>
<p><img src="" alt=""></p>
<p>颜色过渡的灰度表示</p>
<p>现在我们已经有了图像的灰度表示，我们可以使用它将其映射到双色调渐变值。</p>
<p>The duotone gradient has 256 colors while the grayscale has also 256 colors ranging from black (0) to white (255). That means a grayscale color value will map to a gradient element index.</p>
<pre><code class="hljs kotlin"><span class="hljs-keyword">var</span> gradientColors = createGradient(<span class="hljs-string">'#0096ff'</span>, <span class="hljs-string">'#ff00f0'</span>);
<span class="hljs-keyword">var</span> imageData = context.getImageData(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, canvas.width, canvas.height);
applyGradient(imageData.<span class="hljs-keyword">data</span>);

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-keyword">data</span>.length; i += <span class="hljs-number">4</span>) {
  <span class="hljs-comment">// Get the each channel color value</span>
  <span class="hljs-keyword">var</span> redValue = <span class="hljs-keyword">data</span>[i];
  <span class="hljs-keyword">var</span> greenValue = <span class="hljs-keyword">data</span>[i+<span class="hljs-number">1</span>];
  <span class="hljs-keyword">var</span> blueValue = <span class="hljs-keyword">data</span>[i+<span class="hljs-number">2</span>];

  <span class="hljs-comment">// Mapping the color values to the gradient index</span>
  <span class="hljs-comment">// Replacing the grayscale color value with a color for the duotone gradient</span>
  <span class="hljs-keyword">data</span>[i] = gradientColors[redValue].r;
  <span class="hljs-keyword">data</span>[i+<span class="hljs-number">1</span>] = gradientColors[greenValue].g;
  <span class="hljs-keyword">data</span>[i+<span class="hljs-number">2</span>] = gradientColors[blueValue].b;
  <span class="hljs-keyword">data</span>[i+<span class="hljs-number">3</span>] = <span class="hljs-number">255</span>;
}
</code></pre>
<p><a href="https://codepen.io/wellingguzman/pen/GGoWaY">Live Demo</a></p>
<h3>结论</h3>
<p>这个主题可以更深入或解释更多的影响。为你做的功课是找到可以应用于这些骨架示例的不同算法。</p>
<p>了解像素在画布上的结构将允许您创建无限数量的效果，如棕褐色，混色，绿色屏幕效果，图像闪烁/毛刺等。</p>
<p>您甚至可以在不使用图像或视频的情况下即时创建效果：</p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/manipulating-pixels-using-canvas](https://www.zcfy.cc/article/manipulating-pixels-using-canvas)
原文标题: 使用Canvas操作像素
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
