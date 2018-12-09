---
title: '玩转你的图片，各种图片效果的Canvas实现' 
date: 2018-12-10 2:30:07
hidden: true
slug: ir9ybkpx5y
categories: [reprint]
---

{{< raw >}}

                    
<p>前阵子因业务需求，需要对图片进行一些特殊处理，例如反相，高亮，黑白等，都是使用<code>Canvas</code>来实现</p>
<h3 id="articleHeader0">ImageData</h3>
<p>要实现上述所说的各种效果，最核心的事情便是对图片的<a href="https://developer.mozilla.org/en-US/docs/Web/API/ImageData" rel="nofollow noreferrer" target="_blank"><code>ImageData</code></a>对象进行改动。</p>
<p><code>ImageData</code>对象是一个用来描述图片属性的一种数据对象，它有三个属性，分别是<code>data</code>、<code>width</code>、<code>height</code>。后两个代表的是图片的宽高，不用多说。最重要的就是<code>data</code>属性，它是一个<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray" rel="nofollow noreferrer" target="_blank"><code>Uint8ClampedArray</code></a>（8位无符号整形固定数组）类型化数组。按照从上到下，从左到右的顺序，它里面储存了一张图片的所有像素的rgba信息。</p>
<p>例如，一张图片有4个像素，那<code>data</code>里面就有16个值，<code>data[0]~data[3]</code>的值就是第一个像素中的r、g、b、a值（不了解rgba的看<a href="https://www.w3cplus.com/content/css3-rgba" rel="nofollow noreferrer" target="_blank">这里</a>）。</p>
<p>如何获得一张图片的<code>ImageData</code>对象？通过canvas的<code>getImageData</code>便可以很简单地获得：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')
ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

const oriPeixel = ctx.getImageData(0, 0, canvas.width, canvas.height)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> canvas = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'canvas'</span>)
<span class="hljs-keyword">const</span> ctx = canvas.getContext(<span class="hljs-string">'2d'</span>)
ctx.drawImage(img, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, canvas.width, canvas.height)

<span class="hljs-keyword">const</span> oriPeixel = ctx.getImageData(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, canvas.width, canvas.height)</code></pre>
<p>值得注意的是，<code>ImageData</code>里面的属性都是只读的，不能直接更改和赋值。</p>
<p>例如我们把上面的<code>oriPeixel</code>的属性赋值，就会报以下的错：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="oriPeixel.data = []

> Uncaught TypeError: Cannot assign to read only property 'data' of object '#<ImageData>'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">oriPeixel.data = []

&gt; Uncaught <span class="hljs-built_in">TypeError</span>: Cannot assign to read only property <span class="hljs-string">'data'</span> <span class="hljs-keyword">of</span> object <span class="hljs-string">'#&lt;ImageData&gt;'</span></code></pre>
<p>了解了ImageData后，我们来看看效果demo</p>
<h3 id="articleHeader1">Demo 1：图片反相渐变</h3>
<p>先看demo：<a href="http://bless-l.github.io/demo/post-1/demo-1/index.html" rel="nofollow noreferrer" target="_blank">demo-1</a></p>
<h4>1、像素处理</h4>
<p>可以见到，图片先是渐变成反相的样子，再渐变为下一张图片，是不是很酷炫。要现实这个，主要是用到<code>getImageData</code>及<code>putImageData</code>这两个API</p>
<p>刚才我们说过，图片的<code>ImageData</code>对象储存着该图片的每个像素的信息，想要得到图片的反相效果，要作如下处理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="threshold (ctx, idx) {
  let pixels = ctx.getImageData(0, this.height * idx, this.width, this.height)
  let d = pixels.data
  for (let i = 0; i < d.length; i += 4) {
    let r = d[i]
    let g = d[i + 1]
    let b = d[i + 2]
    // 根据rgb求灰度值公式0.2126 * r + 0.7152 * g + 0.0722 * b
    let v = (0.2126 * r + 0.7152 * g + 0.0722 * b >= 100) ? 255 : 128
    d[i] = d[i + 1] = d[i + 2] = v
  }
  return pixels
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">threshold (ctx, idx) {
  <span class="hljs-keyword">let</span> pixels = ctx.getImageData(<span class="hljs-number">0</span>, <span class="hljs-keyword">this</span>.height * idx, <span class="hljs-keyword">this</span>.width, <span class="hljs-keyword">this</span>.height)
  <span class="hljs-keyword">let</span> d = pixels.data
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; d.length; i += <span class="hljs-number">4</span>) {
    <span class="hljs-keyword">let</span> r = d[i]
    <span class="hljs-keyword">let</span> g = d[i + <span class="hljs-number">1</span>]
    <span class="hljs-keyword">let</span> b = d[i + <span class="hljs-number">2</span>]
    <span class="hljs-comment">// 根据rgb求灰度值公式0.2126 * r + 0.7152 * g + 0.0722 * b</span>
    <span class="hljs-keyword">let</span> v = (<span class="hljs-number">0.2126</span> * r + <span class="hljs-number">0.7152</span> * g + <span class="hljs-number">0.0722</span> * b &gt;= <span class="hljs-number">100</span>) ? <span class="hljs-number">255</span> : <span class="hljs-number">128</span>
    d[i] = d[i + <span class="hljs-number">1</span>] = d[i + <span class="hljs-number">2</span>] = v
  }
  <span class="hljs-keyword">return</span> pixels
}</code></pre>
<p>返回的<code>pixels</code>便是图片经过反相处理后的<code>ImageData</code></p>
<p>这里主要是对每个像素的灰度值作过滤，大于等于100的，直接为白色，否则置于128</p>
<p>除此之外，还有黑白，高亮等其他像素处理，具体的可以看<a href="https://www.html5rocks.com/en/tutorials/canvas/imagefilters/" rel="nofollow noreferrer" target="_blank">这篇文章</a></p>
<h4>2、渐变处理</h4>
<p>有了经过反相处理后的图片的<code>ImageData</code>数据，下一步要做的自然就是渐变赋值了。原生是没有提供相关的API自动达成这种的渐变效果的，所以就需要我们自行实现一遍了，这个会比较麻烦。</p>
<p>用js写过动画的同学都知道，基本上都会使用<code>requestAnimationFrame</code>函数来进行帧处理，这里也不意外。</p>
<p>主要思路是这样，图片经过如下的顺序进行渐变：</p>
<p><strong><em>图片1-----&gt;图片1反相-----&gt;图片2-----&gt;图片2反相-----&gt;图片3......</em></strong></p>
<p>直接贴上主要代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gradualChange () {
  // 图片原始的ImageData数据
  let oriPixels = this.ctx.getImageData(0, 0, this.width, this.height)
  let oriData = oriPixels.data
  // 图片反相后的ImageData数据
  let nextData = this.nextPixel[0].data
  let length = oriData.length
  let totalgap = 0
  let gap = 0
  let gapTemp
  for (let i = 0; i < length; i++) {
    // 计算每个rgba的差值，同时缩小处理。除的数值代表着渐变速度，越大越慢
    gapTemp = (nextData[i] - oriData[i]) / 13

    if (oriData[i] !== nextData[i]) {
      // 每个rgba值增量处理，简单来说就是各种取整，[-1，1]区间直接取-1或1
      gap = gapTemp > 1 ? Math.floor(gapTemp) : gapTemp < -1 ? Math.ceil(gapTemp) : oriData[i] < nextData[i] ? 1 : oriData[i] > nextData[i] ? -1 : 0
      totalgap += Math.abs(gap)
      oriData[i] = oriData[i] + gap
    }
  }
  
  // 通过putImageData更新图片
  this.ctx.putImageData(oriPixels, 0, 0)

  // 总值为0，证明已经渐变完成
  if (!totalgap) {
    this.nextPixel.shift()
    if (!this.nextPixel[0]) {
      this.isChange = false
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">gradualChange () {
  <span class="hljs-comment">// 图片原始的ImageData数据</span>
  <span class="hljs-keyword">let</span> oriPixels = <span class="hljs-keyword">this</span>.ctx.getImageData(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-keyword">this</span>.width, <span class="hljs-keyword">this</span>.height)
  <span class="hljs-keyword">let</span> oriData = oriPixels.data
  <span class="hljs-comment">// 图片反相后的ImageData数据</span>
  <span class="hljs-keyword">let</span> nextData = <span class="hljs-keyword">this</span>.nextPixel[<span class="hljs-number">0</span>].data
  <span class="hljs-keyword">let</span> length = oriData.length
  <span class="hljs-keyword">let</span> totalgap = <span class="hljs-number">0</span>
  <span class="hljs-keyword">let</span> gap = <span class="hljs-number">0</span>
  <span class="hljs-keyword">let</span> gapTemp
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; length; i++) {
    <span class="hljs-comment">// 计算每个rgba的差值，同时缩小处理。除的数值代表着渐变速度，越大越慢</span>
    gapTemp = (nextData[i] - oriData[i]) / <span class="hljs-number">13</span>

    <span class="hljs-keyword">if</span> (oriData[i] !== nextData[i]) {
      <span class="hljs-comment">// 每个rgba值增量处理，简单来说就是各种取整，[-1，1]区间直接取-1或1</span>
      gap = gapTemp &gt; <span class="hljs-number">1</span> ? <span class="hljs-built_in">Math</span>.floor(gapTemp) : gapTemp &lt; <span class="hljs-number">-1</span> ? <span class="hljs-built_in">Math</span>.ceil(gapTemp) : oriData[i] &lt; nextData[i] ? <span class="hljs-number">1</span> : oriData[i] &gt; nextData[i] ? <span class="hljs-number">-1</span> : <span class="hljs-number">0</span>
      totalgap += <span class="hljs-built_in">Math</span>.abs(gap)
      oriData[i] = oriData[i] + gap
    }
  }
  
  <span class="hljs-comment">// 通过putImageData更新图片</span>
  <span class="hljs-keyword">this</span>.ctx.putImageData(oriPixels, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>)

  <span class="hljs-comment">// 总值为0，证明已经渐变完成</span>
  <span class="hljs-keyword">if</span> (!totalgap) {
    <span class="hljs-keyword">this</span>.nextPixel.shift()
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.nextPixel[<span class="hljs-number">0</span>]) {
      <span class="hljs-keyword">this</span>.isChange = <span class="hljs-literal">false</span>
    }
  }
}</code></pre>
<p>上面是渐变过程的主要代码，完整的代码可以查看：<a href="https://github.com/Bless-L/little-project/blob/master/demo/post-1/demo-1/demo-1.js" rel="nofollow noreferrer" target="_blank">我是代码</a></p>
<h3 id="articleHeader2">Demo 2：光条高亮移动效果</h3>
<p>同样是先看demo</p>
<ul>
<li>移动端：<a href="http://bless-l.github.io/demo/post-1/demo-2/index.html" rel="nofollow noreferrer" target="_blank">demo-2</a>
</li>
<li>PC端：<a href="http://bless-l.github.io/demo/post-1/demo-3/index.html" rel="nofollow noreferrer" target="_blank">demo-3</a>
</li>
</ul>
<p>可以见到，移动端的demo中，光条上有几个亮斑在同时移动；而PC端，则是在当鼠标hover上去之后，在光条中有一个圆形光斑的高亮效果，因为图片本身是透明的，所以背景色做了深色处理。</p>
<h4>1、像素处理</h4>
<p>需要说明的是，要实现这种效果，最好是找一些背景一部分透明，一部分带有带状色条的图片，例如我demo中的图片。这类图片有相当区域像素的rgba值为4个0，我们很容易对其做边界处理   </p>
<p>同样的，实现这种效果也是需要对图片像素的rgba值进行处理，但是会比图片反相渐变复杂一些，因为这里需要先实现一个圆形的光斑。</p>
<p><strong>光斑实现</strong></p>
<p>既然是圆形光斑，肯定是先有圆心和半径。在这里，我是在横向的方向上，取光条的中心为圆心，半径取50</p>
<p>实现的代码在demo2的<code>brightener</code>函数里面，理解起来也不困难，给定一个<code>y</code>坐标，然后再遍历一遍在这个<code>y</code>坐标下的像素，找出每条光条初始点和结束点的<code>x</code>坐标。rgba值连续两点不为0的，就认为是仍处在光条中，还没有达到边界值</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="brightener (y) {
  // ....完整请看源代码
  for (let x = 0; x < cW; x++) {
    sPx = (cY * cW + x) * 4
    if (oriData[sPx] || oriData[sPx + 1] || oriData[sPx + 2]) {
      startX || (startX = x)
      tempX = sPx + 4
      if (oriData[tempX] || oriData[tempX + 1] || oriData[tempX + 2]) {
        continue
      } else {
        endX = tempX / 4 - cY * cW
        cX = Math.ceil((endX - startX) / 2) + startX
        startX = 0
        res.push({
          x: cX,
          y: cY
        })
      }
    }
  }
  return res
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">brightener (y) {
  <span class="hljs-comment">// ....完整请看源代码</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> x = <span class="hljs-number">0</span>; x &lt; cW; x++) {
    sPx = (cY * cW + x) * <span class="hljs-number">4</span>
    <span class="hljs-keyword">if</span> (oriData[sPx] || oriData[sPx + <span class="hljs-number">1</span>] || oriData[sPx + <span class="hljs-number">2</span>]) {
      startX || (startX = x)
      tempX = sPx + <span class="hljs-number">4</span>
      <span class="hljs-keyword">if</span> (oriData[tempX] || oriData[tempX + <span class="hljs-number">1</span>] || oriData[tempX + <span class="hljs-number">2</span>]) {
        <span class="hljs-keyword">continue</span>
      } <span class="hljs-keyword">else</span> {
        endX = tempX / <span class="hljs-number">4</span> - cY * cW
        cX = <span class="hljs-built_in">Math</span>.ceil((endX - startX) / <span class="hljs-number">2</span>) + startX
        startX = <span class="hljs-number">0</span>
        res.push({
          <span class="hljs-attr">x</span>: cX,
          <span class="hljs-attr">y</span>: cY
        })
      }
    }
  }
  <span class="hljs-keyword">return</span> res
}</code></pre>
<p>确定了圆心之后，就可以根据半径确定一个圆，并用一个数组存储这个圆内各个点，以便后续处理。过程也很简单，就是初中学的那一套，两点距离小于半径就可以了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="createArea (x, y, radius) {
  let result = []
  for (let i = x - radius; i <= x + radius; i++) {
    for (let j = y - radius; j <= y + radius; j++) {
      let dx = i - x
      let dy = j - y
      if ((dx * dx + dy * dy) <= (radius * radius)) {
        let obj = {}
        if (i > 0 &amp;&amp; j > 0) {
          obj.x = i
          obj.y = j
          result.push(obj)
        }
      }
    }
  }
  return result
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">createArea (x, y, radius) {
  <span class="hljs-keyword">let</span> result = []
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = x - radius; i &lt;= x + radius; i++) {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = y - radius; j &lt;= y + radius; j++) {
      <span class="hljs-keyword">let</span> dx = i - x
      <span class="hljs-keyword">let</span> dy = j - y
      <span class="hljs-keyword">if</span> ((dx * dx + dy * dy) &lt;= (radius * radius)) {
        <span class="hljs-keyword">let</span> obj = {}
        <span class="hljs-keyword">if</span> (i &gt; <span class="hljs-number">0</span> &amp;&amp; j &gt; <span class="hljs-number">0</span>) {
          obj.x = i
          obj.y = j
          result.push(obj)
        }
      }
    }
  }
  <span class="hljs-keyword">return</span> result
}</code></pre>
<p>之后，就是实现一个光斑效果。在这里，我是从圆心向边缘进行一个透明度的衰减渐变</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ...
const validArr = this.createArea(x, y, radius)
validArr.forEach((px, i) => {
  sPx = (px.y * cW + px.x) * 4
  // 像素点的rgb值不全为0
  if (oriData[sPx] || oriData[sPx + 1] || oriData[sPx + 2]) {
    distance = Math.sqrt((px.x - x) * (px.x - x) + (px.y - y) * (px.y - y))
    // 根据距离和半径的比率进行正比衰减
    gap = Math.floor(opacity * (1 - distance / radius))
    oriData[sPx + 3] += gap
  }
})
// 更新ImageData
this.ctx.putImageData(oriPixels, 0, 0)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// ...</span>
<span class="hljs-keyword">const</span> validArr = <span class="hljs-keyword">this</span>.createArea(x, y, radius)
validArr.forEach(<span class="hljs-function">(<span class="hljs-params">px, i</span>) =&gt;</span> {
  sPx = (px.y * cW + px.x) * <span class="hljs-number">4</span>
  <span class="hljs-comment">// 像素点的rgb值不全为0</span>
  <span class="hljs-keyword">if</span> (oriData[sPx] || oriData[sPx + <span class="hljs-number">1</span>] || oriData[sPx + <span class="hljs-number">2</span>]) {
    distance = <span class="hljs-built_in">Math</span>.sqrt((px.x - x) * (px.x - x) + (px.y - y) * (px.y - y))
    <span class="hljs-comment">// 根据距离和半径的比率进行正比衰减</span>
    gap = <span class="hljs-built_in">Math</span>.floor(opacity * (<span class="hljs-number">1</span> - distance / radius))
    oriData[sPx + <span class="hljs-number">3</span>] += gap
  }
})
<span class="hljs-comment">// 更新ImageData</span>
<span class="hljs-keyword">this</span>.ctx.putImageData(oriPixels, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>)</code></pre>
<p>到这里，一个光斑就这样实现了</p>
<h4><strong>2、移动效果</strong></h4>
<p>光斑有了，自然就是让它动起来。这个就简单啦，光斑生成的我们已经完成，那么我们只要把圆心动起来就可以了</p>
<p>在这里，同样是使用<code>requestAnimationFrame</code>函数来进行帧处理。而光斑是从下向上移动的，可以看到<code>startY</code>在不断递减</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="autoPlay (timestamp) {
  if (this.startY <= -25) {
    let timeGap
    if (!this.progress) {
      this.progress = timestamp
    }
    timeGap = timestamp - this.progress
    // 判断间隔时间是否满足
    if (timeGap > this.autoPlayInterval) {
      this.startY = this.height - 1
      this.progress = 0
    }
  } else {
    // 根据Y坐标生成圆心及光斑 
    const res = this.getBrightCenter(this.startY)
    this.brightnessCtx(res, 50, 60)
    this.startY -= 10
  }
  window.requestAnimationFrame(this.autoPlay.bind(this), false)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">autoPlay (timestamp) {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.startY &lt;= <span class="hljs-number">-25</span>) {
    <span class="hljs-keyword">let</span> timeGap
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.progress) {
      <span class="hljs-keyword">this</span>.progress = timestamp
    }
    timeGap = timestamp - <span class="hljs-keyword">this</span>.progress
    <span class="hljs-comment">// 判断间隔时间是否满足</span>
    <span class="hljs-keyword">if</span> (timeGap &gt; <span class="hljs-keyword">this</span>.autoPlayInterval) {
      <span class="hljs-keyword">this</span>.startY = <span class="hljs-keyword">this</span>.height - <span class="hljs-number">1</span>
      <span class="hljs-keyword">this</span>.progress = <span class="hljs-number">0</span>
    }
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// 根据Y坐标生成圆心及光斑 </span>
    <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">this</span>.getBrightCenter(<span class="hljs-keyword">this</span>.startY)
    <span class="hljs-keyword">this</span>.brightnessCtx(res, <span class="hljs-number">50</span>, <span class="hljs-number">60</span>)
    <span class="hljs-keyword">this</span>.startY -= <span class="hljs-number">10</span>
  }
  <span class="hljs-built_in">window</span>.requestAnimationFrame(<span class="hljs-keyword">this</span>.autoPlay.bind(<span class="hljs-keyword">this</span>), <span class="hljs-literal">false</span>)
}</code></pre>
<p>可以看到，无非就是循环<code>startY</code>坐标，生成新光斑的过程。而PC上的效果是当鼠标hover上去时有光斑效果，同理去掉这个自动移动的过程，对图片的<code>mousemove</code>事件进行监听，得出<code>x</code>，<code>y</code>坐标作为圆心即可</p>
<p>值得注意的是，因为在不断地更新<code>ImageData</code>，所以我们需要一个临时的<code>canvas</code>来存放原始图片的<code>ImageData</code>数据。demo1也是作了同样的处理</p>
<p>完整的代码可以查看：<a href="https://github.com/Bless-L/little-project/blob/master/demo/post-1/demo-3/demo-3.js" rel="nofollow noreferrer" target="_blank">PC端</a> 、 <a href="https://github.com/Bless-L/little-project/blob/master/demo/post-1/demo-2/demo-2.js" rel="nofollow noreferrer" target="_blank">移动端</a></p>
<h3 id="articleHeader3">总结</h3>
<p>以上便是使用<code>Canvas</code>实现一些图片效果的介绍，权当抛砖引玉，各种看官也可以发挥想象力，实现自己的酷炫效果</p>
<h3 id="articleHeader4">参考</h3>
<ul>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/API/ImageData" rel="nofollow noreferrer" target="_blank">ImageData</a></li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8ClampedArray" rel="nofollow noreferrer" target="_blank">Uint8ClampedArray</a></li>
<li><a href="https://www.html5rocks.com/en/tutorials/canvas/imagefilters/" rel="nofollow noreferrer" target="_blank">Image Filters with Canvas</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
玩转你的图片，各种图片效果的Canvas实现

## 原文链接
[https://segmentfault.com/a/1190000013757445](https://segmentfault.com/a/1190000013757445)

