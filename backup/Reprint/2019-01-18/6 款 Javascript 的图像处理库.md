---
title: '6 款 Javascript 的图像处理库' 
date: 2019-01-18 2:30:35
hidden: true
slug: ecriucnvxvo
categories: [reprint]
---

{{< raw >}}

                    
<p>文/ Tine<br>译/Mantra</p>
<p>附原文地址：<a href="http://blog.webkid.io/image-processing-in-javascript/" rel="nofollow noreferrer" target="_blank">http://blog.webkid.io/image-p...</a></p>
<p>如果你正在寻找更高效的办法来处理或操纵你 web 项目中的图片，那么这篇 blog 介绍的一些库，很值得你仔细阅读一下。这些库，大部分都提供了亮度、灰度、反转等调整操作，其他一部分则集中在可读性和易扩展性上。接下来的部分将帮助你了解并选择一款适合自己需求的工具。</p>
<p>你会从这里找到调整图片亮度的代码片段，这将提供给你如何使用库的 idea。运行代码（Source: flickr.com）的结果如下：<br><span class="img-wrap"><img data-src="/img/bVKxDo?w=600&amp;h=198" src="https://static.alili.tech/img/bVKxDo?w=600&amp;h=198" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><br><br><strong>1.Caman JS</strong></p>
<p>Caman JS 是大名鼎鼎的并且非常权威的图像处理库。它提供了各种内置功能以及各种扩展的可能性。此外，该库还提供了详细的文档，可以用于 NodeJS 和浏览器。</p>
<p>CamanJS 的函数使用&lt;canvas&gt;元素，所以开始之前，你可以自己创建一个 Canvas 元素，也可以让 CamanJS 用相同尺寸的画布替换图像。</p>
<p>基本功能包含了，设置对比度/亮度或单独修改 RGB 通道以及增加或减少图像噪点，这样的色彩操作。更高级的操作，还有使用图层、复合或裁减图像可以通过插件来实现。</p>
<p>主页地址：<a href="http://camanjs.com/" rel="nofollow noreferrer" target="_blank">http://camanjs.com/</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img id=&quot;caman-image&quot; src=&quot;otter.jpg&quot;>
<script src=&quot;caman.js&quot;></script>
<script>
Caman('#caman-image', function () {
  this.brightness(50).render();
});
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"caman-image"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"otter.jpg"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"caman.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
Caman(<span class="hljs-string">'#caman-image'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
  <span class="hljs-keyword">this</span>.brightness(<span class="hljs-number">50</span>).render();
});
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><br><br><strong>2. glfx.js</strong></p>
<p>像前两个库那样，glfx.js 是一个提供了广泛功能的强大工具。不同于 Filtrr2 和 CamanJS，它遵守 WebGL 标准。非常赞的一点是，图像处理操作在显卡完成，因此可以实时运行。它主要的缺点是只支持最新版本的浏览器。</p>
<p>除了基本的调节功能和炫酷效果外，glfx.js 提供了（模糊和包装功能）的列表。这样可以通过调整不同的参数来创建唯一的结果。</p>
<p>查看这个项目主页的 demo 然后下载这个库。</p>
<p>项目地址：<a href="http://evanw.github.io/glfx.js/" rel="nofollow noreferrer" target="_blank">http://evanw.github.io/glfx.js/</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;glfx.js&quot;></script>
<script>
window.onload = function () {
    const canvas = fx.canvas();
    const image = document.getElementById('glfx-image');
    const texture = canvas.texture(image);
    canvas.draw(texture).brightnessContrast(0.5, 0).update();
    image.parentNode.insertBefore(canvas, image);
    image.parentNode.removeChild(image);
};
</script>
<img id=&quot;glfx-image&quot; src=&quot;otter.jpg&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"glfx.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> canvas = fx.canvas();
    <span class="hljs-keyword">const</span> image = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'glfx-image'</span>);
    <span class="hljs-keyword">const</span> texture = canvas.texture(image);
    canvas.draw(texture).brightnessContrast(<span class="hljs-number">0.5</span>, <span class="hljs-number">0</span>).update();
    image.parentNode.insertBefore(canvas, image);
    image.parentNode.removeChild(image);
};
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"glfx-image"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"otter.jpg"</span>&gt;</span></code></pre>
<p><br><br><strong>3．Grafi.js</strong></p>
<p>正如在它项目主页上所说的，grafi.js 是一个鼓励用户去了解图像处理是如何工作的库。源代码可以在 github 找到，并且它里面的很多注释，可以帮助你理解每个函数到底发生了什么。如果你在寻找一些提供更高级图像操作的库，也许 grafi.js 并不能够满足你的需求，但它可以让你了解图像处理是如何执行然后得到满意效果的。</p>
<p>注意，涉及改变图像的方向或大小的操作不是由 grafi.js 提供的。</p>
<p><a href="https://github.com/grafijs/grafi" rel="nofollow noreferrer" target="_blank">https://github.com/grafijs/grafi</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<canvas id=&quot;grafi-canvas&quot;></canvas>
<script type=&quot;text/javascript&quot; src=&quot;grafi.js&quot;></script>
<script>
  const grafiCanvas = document.getElementById('grafi-canvas')
  let canvas = document.createElement('canvas')
  let ctx = canvas.getContext('2d')
  let original, newImage, imageCtx
  let img = new Image()
  img.src = 'otter.jpg';

  img.onload = function () {
    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0)
    original = ctx.getImageData(0,0, canvas.width, canvas.height)

    grafiCanvas.width = img.width
    grafiCanvas.height = img.height
    imageCtx = grafiCanvas.getContext('2d')
    imageCtx.putImageData(grafi.brightness(original, {level: 100}), 0, 0)
  }
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"grafi-canvas"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"grafi.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">const</span> grafiCanvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'grafi-canvas'</span>)
  <span class="hljs-keyword">let</span> canvas = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'canvas'</span>)
  <span class="hljs-keyword">let</span> ctx = canvas.getContext(<span class="hljs-string">'2d'</span>)
  <span class="hljs-keyword">let</span> original, newImage, imageCtx
  <span class="hljs-keyword">let</span> img = <span class="hljs-keyword">new</span> Image()
  img.src = <span class="hljs-string">'otter.jpg'</span>;

  img.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>)
    original = ctx.getImageData(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>, canvas.width, canvas.height)

    grafiCanvas.width = img.width
    grafiCanvas.height = img.height
    imageCtx = grafiCanvas.getContext(<span class="hljs-string">'2d'</span>)
    imageCtx.putImageData(grafi.brightness(original, {<span class="hljs-attr">level</span>: <span class="hljs-number">100</span>}), <span class="hljs-number">0</span>, <span class="hljs-number">0</span>)
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p><br><br><strong>4. Jimp</strong></p>
<p>像 CamanJS 一样，可以用于 NodeJS 和浏览器中，他不需要使用 HTML 元素（&lt;img&gt;或者&lt;canvas&gt;）,但需要从路径或URL读取图像。</p>
<p>Jimp 提供了颜色调节和一些效果的函数清单。当然也提供了一些你可能在其他库错过的操作，比如调整尺寸，缩放以及旋转图像。图片也可以手动或自动裁减。在 Node 中使用，Jimp 则是一个非常强大的工具，可以让你在多个文件上执行链接操作，并储存修改的图像。</p>
<p><a href="https://github.com/oliver-moran/jimp" rel="nofollow noreferrer" target="_blank">https://github.com/oliver-mor...</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;jimp.min.js&quot;></script>
<script>
  Jimp.read('otter.jpg').then(function (lenna) {
    lenna.brightness(0.5)
      .getBase64(Jimp.MIME_JPEG, function (err, src) {
        const img = document.createElement('img');
        img.setAttribute('src', src);
        document.body.appendChild(img);
      });
    }).catch(function (err) {
      console.error(err);
    });
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"jimp.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  Jimp.read(<span class="hljs-string">'otter.jpg'</span>).then(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">lenna</span>) </span>{
    lenna.brightness(<span class="hljs-number">0.5</span>)
      .getBase64(Jimp.MIME_JPEG, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err, src</span>) </span>{
        <span class="hljs-keyword">const</span> img = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'img'</span>);
        img.setAttribute(<span class="hljs-string">'src'</span>, src);
        <span class="hljs-built_in">document</span>.body.appendChild(img);
      });
    }).catch(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
      <span class="hljs-built_in">console</span>.error(err);
    });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p><br><br><strong>5. Filtrr2</strong></p>
<p>Filtrr2 是一个基于jQuery 的被描述为「开箱即用」的库。它使用&lt;canvas&gt;来操作图像。CamanJS 的功能并没有被 Filtrr2 完全包含，他还提供了一些其他的功能如（海报已经模糊图像）。Filtrr2提供的所有这些功能和用法与CamanJS 很相似。</p>
<p>虽然 Fitlrr2 是很强悍的库，但github库一段时间内并没有及时更新了。<br>项目地址：<a href="https://github.com/alexmic/filtrr/tree/master/filtrr2" rel="nofollow noreferrer" target="_blank">https://github.com/alexmic/fi...</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot; src=&quot;jquery.min.js&quot;/></script>
<script src=&quot;filtrr2.js&quot;></script>

<img id=&quot;filtrr2-img&quot; src=&quot;otter.jpg&quot;/>
<script>
  Filtrr2('#filtrr2-img', function () {
    this.brighten(50).render();
  });
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"jquery.min.js"</span>/&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"filtrr2.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"filtrr2-img"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"otter.jpg"</span>/&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
  Filtrr2(<span class="hljs-string">'#filtrr2-img'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">this</span>.brighten(<span class="hljs-number">50</span>).render();
  });
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p><br><br><strong>6. Processing.js</strong></p>
<p>如果你熟悉Processing编程语言，这个库可能会派上用场。Processing 允许使用不同的媒介，用于创建动画片，数字形象和数字艺术，也可以用于图像处理。</p>
<p>Processing.js 可以让你编写 Processing 代码并通过应用 canvas 元素简单的包含你的网站。</p>
<p>虽然库提供了一些有用的功能，例如缩放、旋转或图像混合，但用于基本操作的解决方案必须由用户实现，例如灰度和颜色的调整。从正面的角度看，他是一个可灵活调整以及一个很好的了解图像处理算法的途径。</p>
<p>这里有很多示例和详细的步骤来帮助你开始：<a href="http://processingjs.org/" rel="nofollow noreferrer" target="_blank">http://processingjs.org/</a><br><br><br><strong>综述</strong></p>
<p>总的来看一下这些库所提供的功能，如下表：<br><span class="img-wrap"><img data-src="/img/bVKxGb?w=650&amp;h=914" src="https://static.alili.tech/img/bVKxGb?w=650&amp;h=914" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>正如你看到的，CamanJS 提供了多种多样的像素修饰以及用于修改图片的操作。如模糊和锐化等一些操作，只有别的库提供，那你就必须根据自己到底想做什么来做取舍了。<br>此列表中唯一支持翻转和自动剪裁的库就是 Jimp。如果你只想调整大小或剪裁图片，那么 CamanJS 和 Jimp 都可以选择。</p>
<p>如果你正在寻找更多抽象的操作，glfx.js 也许可以选择，因为它配备了一列表的花式效果，你可以尝试一下。如下表这样：<br><span class="img-wrap"><img data-src="/img/bVKxGi?w=500&amp;h=376" src="https://static.alili.tech/img/bVKxGi?w=500&amp;h=376" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>当然，你觉得这篇文章介绍的库并不值得一看，那你也许对下面的更感兴趣：</p>
<ul>
<li><p><a href="http://mezzoblue.github.io/PaintbrushJS/demo/" rel="nofollow noreferrer" target="_blank">PaintbrushJS</a></p></li>
<li><p><a href="http://fhtr.org/canvasfilters/" rel="nofollow noreferrer" target="_blank">Canvasfilters</a></p></li>
<li><p><a href="http://rendro.github.io/vintageJS/" rel="nofollow noreferrer" target="_blank">VintageJS</a></p></li>
<li><p><a href="http://matthewruddy.github.io/jQuery-filter.me/" rel="nofollow noreferrer" target="_blank">jQuery filter.me</a></p></li>
<li><p><a href="https://github.com/JoelBesada/JSManipulate" rel="nofollow noreferrer" target="_blank">JSManipulate</a></p></li>
<li><p><a href="http://fabricjs.com/" rel="nofollow noreferrer" target="_blank">Fabric.js</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
6 款 Javascript 的图像处理库

## 原文链接
[https://segmentfault.com/a/1190000008670319](https://segmentfault.com/a/1190000008670319)

