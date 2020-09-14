---
title: '【30分钟学完】canvas动画|游戏基础(extra1-1)：美图我也行' 
date: 2018-12-09 2:30:08
hidden: true
slug: ij8qardnbti
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>本文是接续系列教程的extra1，主要是介绍颜色系统在canvas中的应用。  <br>本来是与extra1一起成文的，因为segmentfault莫名其妙的字数限制bug只能分割放送了。</p>
<h2 id="articleHeader1">canvas操纵像素</h2>
<p>你如果认为canvas只是画图工具，那接下来的操作会颠覆你的认知。canvas提供api可以获取画布上任何一个像素，并可以自由的操作他们。</p>
<h3 id="articleHeader2">获取像素</h3>
<p>直接访问像素的功能由canvas上下文中的ImageData对象提供，它提供了以下一组方法，都会返回ImageData对象。</p>
<ul>
<li>getImageData()接受x轴坐标、y轴坐标、宽度、高度四个参数，获取画布上这个矩形区域的像素数据；</li>
<li>createImageData()可凭空创建指定宽高的矩形区域，初始是黑色，也可以输入一个ImageData对象用于创建一个同样大小的区域，但注意<strong>不会复制像素数据</strong>。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="context.getImageData(x, y, width, height);
context.createImageData(width, height);
context.createImageData(anothorImageData);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">context.getImageData(x, y, width, height);
context.createImageData(width, height);
context.createImageData(anothorImageData);</code></pre>
<p>获取到的ImageData对象中data属性是一个一维数组，乍看乱糟糟的，但细看你会发现其实这就是RGBA的颜色数据，也就是数组中每个四位就是一个像素的颜色数据，这里注意一下<strong>透明度A也是0~255，不是CSS里简化过的0~1</strong>。</p>
<ul><li><ul><li>*</li></ul></li></ul>
<p><strong>举个例子</strong><br>现在假定在一个纯红色区域取一块<code>2*2</code>的矩形，我们得到的像素数据是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let pixels = [255, 0, 0, 255, 255, 0, 0, 255,
              255, 0, 0, 255, 255, 0, 0, 255]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> pixels = [<span class="hljs-number">255</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">255</span>, <span class="hljs-number">255</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">255</span>,
              <span class="hljs-number">255</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">255</span>, <span class="hljs-number">255</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">255</span>]</code></pre>
<p>他们与图像的对应关系是<strong>从左到右，从上到下</strong>，大概就像上面代码格式化这样，如图所示：  </p>
<p><span class="img-wrap"><img data-src="/img/bV6Qad?w=1254&amp;h=798" src="https://static.alili.tech/img/bV6Qad?w=1254&amp;h=798" alt="像素对应位置" title="像素对应位置" style="cursor: pointer; display: inline;"></span></p>
<p>根据4对1的对应关系，我们很容易就能写出遍历的办法，offset就相当于指针，每次移动4位，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (let offset = 0, len = pixels.length; offset < len; offset += 4) {
  r = pixels[offset];
  g = pixels[offset + 1];
  b = pixels[offset + 2];
  a = pixels[offset + 3];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> offset = <span class="hljs-number">0</span>, len = pixels.length; offset &lt; len; offset += <span class="hljs-number">4</span>) {
  r = pixels[offset];
  g = pixels[offset + <span class="hljs-number">1</span>];
  b = pixels[offset + <span class="hljs-number">2</span>];
  a = pixels[offset + <span class="hljs-number">3</span>];
}</code></pre>
<p>当需要访问特定坐标的像素时，可以使用如下公式，其中xpos是像素点在该区域的x坐标；ypos是像素点在该区域的y坐标，imagedata.width是指区域横向有多少像素。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let offset = (xpos + ypos * imagedata.width) * 4;
let r = pixels[offset];
let g = pixels[offset + 1];
let b = pixels[offset + 2];
let a = pixels[offset + 3];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> offset = (xpos + ypos * imagedata.width) * <span class="hljs-number">4</span>;
<span class="hljs-keyword">let</span> r = pixels[offset];
<span class="hljs-keyword">let</span> g = pixels[offset + <span class="hljs-number">1</span>];
<span class="hljs-keyword">let</span> b = pixels[offset + <span class="hljs-number">2</span>];
<span class="hljs-keyword">let</span> a = pixels[offset + <span class="hljs-number">3</span>];</code></pre>
<h3 id="articleHeader3">绘制像素</h3>
<p>可以将修改过的ImageData对象重新用上下文的putImageData()方法绘制到指定区域，该方法接受三个参数：ImageData对象、x轴坐标、y轴坐标。绘制指定的位置绘制ImageData对象的内容。直接看下面例子的核心代码。  <br>先绘制铺满画布的色块，点击按钮触发change事件处理器可改变颜色，过程见注释。  <br>完整例子：<a href="https://nimokuri.github.io/H5Learning-animationDemo/part3/13-invert-color.html" rel="nofollow noreferrer" target="_blank">演示反色变化</a></p>
<blockquote>【PS】对js了解不深的朋友可能会有疑问，遍历过程操作的是pixels，imageData怎么会改变呢？  <br>这是因为js中对象都是地址传递的特点，也就是pixels = imageData.data操作只是将pixels变量的指向到imageData.data所指向的内存空间，所以操作pixels就是操作imageData.data。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.onload = function () {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  // 绘制色块，每个色块宽10像素，高等于画布高，铺满画布
  for (let i = 0; i < canvas.width; i += 10) {
    context.fillStyle = (i % 20 === 0) ? '#f00' : ((i % 30 === 0) ? '#0f0' : '#00f');
    context.fillRect(i, 0, 10, canvas.height);
  }
};

function change() {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  // 获取整个画布的ImageData对象
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  // 取出颜色数据
  const pixels = imageData.data;
  // 遍历颜色数据求每个颜色的反色
  for (let offset = 0, len = pixels.length; offset < len; offset += 4) {
    pixels[offset] = 255 - pixels[offset];
    pixels[offset + 1] = 255 - pixels[offset + 1];
    pixels[offset + 2] = 255 - pixels[offset + 2];
    // 这里没有操作透明度
  }
  // 将ImageData重新绘制到画布上
  context.putImageData(imageData, 0, 0);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'canvas'</span>);
  <span class="hljs-keyword">const</span> context = canvas.getContext(<span class="hljs-string">'2d'</span>);
  <span class="hljs-comment">// 绘制色块，每个色块宽10像素，高等于画布高，铺满画布</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; canvas.width; i += <span class="hljs-number">10</span>) {
    context.fillStyle = (i % <span class="hljs-number">20</span> === <span class="hljs-number">0</span>) ? <span class="hljs-string">'#f00'</span> : ((i % <span class="hljs-number">30</span> === <span class="hljs-number">0</span>) ? <span class="hljs-string">'#0f0'</span> : <span class="hljs-string">'#00f'</span>);
    context.fillRect(i, <span class="hljs-number">0</span>, <span class="hljs-number">10</span>, canvas.height);
  }
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">change</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'canvas'</span>);
  <span class="hljs-keyword">const</span> context = canvas.getContext(<span class="hljs-string">'2d'</span>);
  <span class="hljs-comment">// 获取整个画布的ImageData对象</span>
  <span class="hljs-keyword">const</span> imageData = context.getImageData(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, canvas.width, canvas.height);
  <span class="hljs-comment">// 取出颜色数据</span>
  <span class="hljs-keyword">const</span> pixels = imageData.data;
  <span class="hljs-comment">// 遍历颜色数据求每个颜色的反色</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> offset = <span class="hljs-number">0</span>, len = pixels.length; offset &lt; len; offset += <span class="hljs-number">4</span>) {
    pixels[offset] = <span class="hljs-number">255</span> - pixels[offset];
    pixels[offset + <span class="hljs-number">1</span>] = <span class="hljs-number">255</span> - pixels[offset + <span class="hljs-number">1</span>];
    pixels[offset + <span class="hljs-number">2</span>] = <span class="hljs-number">255</span> - pixels[offset + <span class="hljs-number">2</span>];
    <span class="hljs-comment">// 这里没有操作透明度</span>
  }
  <span class="hljs-comment">// 将ImageData重新绘制到画布上</span>
  context.putImageData(imageData, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
}</code></pre>
<h3 id="articleHeader4">更多有趣的例子</h3>
<p>canvas强大的像素操作可以给我们带来更多的可能，也许你会想开始做一个网页版的美图工具了吧（笑）。  <br>这里还有一些有趣的demo可以玩玩：</p>
<ul>
<li><a href="https://nimokuri.github.io/H5Learning-animationDemo/part3/14-grayscale.html" rel="nofollow noreferrer" target="_blank">演示灰度变化</a></li>
<li><a href="https://nimokuri.github.io/H5Learning-animationDemo/part3/15-pixel-move.html" rel="nofollow noreferrer" target="_blank">有趣的色彩波纹</a></li>
</ul>
<h2 id="articleHeader5">综合案例</h2>
<p>有关颜色的番外部分到这里就基本完结了，最后有个综合题，会应用这些技术。  <br>将系列第二篇中的<a href="https://nimokuri.github.io/H5Learning-animationDemo/part3/01-drawing-app.html" rel="nofollow noreferrer" target="_blank">鼠标画图工具</a>改造成鼠标喷漆工具，这里建议自己动手实践一下。  <br>下面例子基本思路就是取得画布像素数据，每当鼠标点下并移动（执行onMouseMove）就随机改变鼠标周围一定范围的像素点的颜色。  <br>完整案例：<a href="https://nimokuri.github.io/H5Learning-animationDemo/part3/16-spray-paint.html" rel="nofollow noreferrer" target="_blank">鼠标喷漆工具</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.onload = function () {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');
  // 获得整个画布区域的ImageData对象
  const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
  // 取出像素数据
  const pixels = imageData.data;
  // 设定笔刷大小
  const brush_size = 25;
  // 设定笔刷密度
  const brush_density = 80;
  // 笔刷的颜色变量
  let brush_color;

  function onMouseMove() {
    // 根据设定的笔刷密度生成随机像素点
    for (let i = 0; i < brush_density; i++) {
      // 随机像素点角度相对于鼠标的角度
      const angle = Math.random() * Math.PI * 2;
      // 根据设定的笔刷大小，随机像素点以鼠标为圆心的半径
      const radius = Math.random() * brush_size;
      // 计算出像素点的x轴相对坐标
      const xpos = (mouse.x + Math.cos(angle) * radius) | 0;
      // 计算出像素点的y轴相对坐标
      const ypos = (mouse.y + Math.sin(angle) * radius) | 0;
      // 算出该像素点在pixels中的偏移量
      const offset = (xpos + ypos * imageData.width) * 4;
      // 对这个像素点的颜色数据进行操作，将颜色分解成三基色
      pixels[offset] = brush_color >> 16 &amp; 0xff;
      pixels[offset + 1] = brush_color >> 8 &amp; 0xff;
      pixels[offset + 2] = brush_color &amp; 0xff;
      pixels[offset + 3] = 255;
    }
    // 重新绘制区域
    context.putImageData(imageData, 0, 0);
  }
  canvas.addEventListener('mousedown', () => {
    // 随机一个颜色
    brush_color = utils.parseColor(Math.random() * 0xffffff, true);
    canvas.addEventListener('mousemove', onMouseMove, false);
  }, false);
  canvas.addEventListener('mouseup', () => {
    canvas.removeEventListener('mousemove', onMouseMove, false);
  }, false);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'canvas'</span>);
  <span class="hljs-keyword">const</span> context = canvas.getContext(<span class="hljs-string">'2d'</span>);
  <span class="hljs-comment">// 获得整个画布区域的ImageData对象</span>
  <span class="hljs-keyword">const</span> imageData = context.getImageData(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, canvas.width, canvas.height);
  <span class="hljs-comment">// 取出像素数据</span>
  <span class="hljs-keyword">const</span> pixels = imageData.data;
  <span class="hljs-comment">// 设定笔刷大小</span>
  <span class="hljs-keyword">const</span> brush_size = <span class="hljs-number">25</span>;
  <span class="hljs-comment">// 设定笔刷密度</span>
  <span class="hljs-keyword">const</span> brush_density = <span class="hljs-number">80</span>;
  <span class="hljs-comment">// 笔刷的颜色变量</span>
  <span class="hljs-keyword">let</span> brush_color;

  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onMouseMove</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 根据设定的笔刷密度生成随机像素点</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; brush_density; i++) {
      <span class="hljs-comment">// 随机像素点角度相对于鼠标的角度</span>
      <span class="hljs-keyword">const</span> angle = <span class="hljs-built_in">Math</span>.random() * <span class="hljs-built_in">Math</span>.PI * <span class="hljs-number">2</span>;
      <span class="hljs-comment">// 根据设定的笔刷大小，随机像素点以鼠标为圆心的半径</span>
      <span class="hljs-keyword">const</span> radius = <span class="hljs-built_in">Math</span>.random() * brush_size;
      <span class="hljs-comment">// 计算出像素点的x轴相对坐标</span>
      <span class="hljs-keyword">const</span> xpos = (mouse.x + <span class="hljs-built_in">Math</span>.cos(angle) * radius) | <span class="hljs-number">0</span>;
      <span class="hljs-comment">// 计算出像素点的y轴相对坐标</span>
      <span class="hljs-keyword">const</span> ypos = (mouse.y + <span class="hljs-built_in">Math</span>.sin(angle) * radius) | <span class="hljs-number">0</span>;
      <span class="hljs-comment">// 算出该像素点在pixels中的偏移量</span>
      <span class="hljs-keyword">const</span> offset = (xpos + ypos * imageData.width) * <span class="hljs-number">4</span>;
      <span class="hljs-comment">// 对这个像素点的颜色数据进行操作，将颜色分解成三基色</span>
      pixels[offset] = brush_color &gt;&gt; <span class="hljs-number">16</span> &amp; <span class="hljs-number">0xff</span>;
      pixels[offset + <span class="hljs-number">1</span>] = brush_color &gt;&gt; <span class="hljs-number">8</span> &amp; <span class="hljs-number">0xff</span>;
      pixels[offset + <span class="hljs-number">2</span>] = brush_color &amp; <span class="hljs-number">0xff</span>;
      pixels[offset + <span class="hljs-number">3</span>] = <span class="hljs-number">255</span>;
    }
    <span class="hljs-comment">// 重新绘制区域</span>
    context.putImageData(imageData, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
  }
  canvas.addEventListener(<span class="hljs-string">'mousedown'</span>, () =&gt; {
    <span class="hljs-comment">// 随机一个颜色</span>
    brush_color = utils.parseColor(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">0xffffff</span>, <span class="hljs-literal">true</span>);
    canvas.addEventListener(<span class="hljs-string">'mousemove'</span>, onMouseMove, <span class="hljs-literal">false</span>);
  }, <span class="hljs-literal">false</span>);
  canvas.addEventListener(<span class="hljs-string">'mouseup'</span>, () =&gt; {
    canvas.removeEventListener(<span class="hljs-string">'mousemove'</span>, onMouseMove, <span class="hljs-literal">false</span>);
  }, <span class="hljs-literal">false</span>);
};</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【30分钟学完】canvas动画|游戏基础(extra1-1)：美图我也行

## 原文链接
[https://segmentfault.com/a/1190000013971943](https://segmentfault.com/a/1190000013971943)

