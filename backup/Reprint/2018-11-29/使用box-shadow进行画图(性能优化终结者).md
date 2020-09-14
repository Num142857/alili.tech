---
title: '使用box-shadow进行画图(性能优化终结者)' 
date: 2018-11-29 9:34:56
hidden: true
slug: j4c8fqsehq
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>最近突然想做一些好玩的东西，找来找去，想到了之前曾经在网上看到过有人用<code>box-shadow</code>画了一副蒙娜丽莎出来  <br>感觉这个挺有意思，正好趁着周末，自己也搞一波</blockquote>
<h2 id="articleHeader0">前言</h2>
<h3 id="articleHeader1">在线地址：</h3>
<p><a href="https://blog.jiasm.org/box-shadow-image-generator/index-first" rel="nofollow noreferrer" target="_blank">优化前的版本</a>  <br><a href="https://blog.jiasm.org/box-shadow-image-generator/" rel="nofollow noreferrer" target="_blank">优化后的版本</a>  <br><a href="https://github.com/Jiasm/box-shadow-image-generator/blob/master/index.js" rel="nofollow noreferrer" target="_blank">源码仓库地址</a>  </p>
<p><em>不建议上传大图片。。喜欢听电脑引擎声的除外</em></p>
<hr>
<p>首先，并不打算单纯的实现某一张图片（这样太没意思了），而是通过上传图片，来动态生成<code>box-shadow</code>的数据。  <br>所以，你需要了解这些东西：</p>
<ol>
<li><code>box-shadow</code></li>
<li><code>canvas</code></li>
</ol>
<h3 id="articleHeader2">box-shadow</h3>
<p><code>box-shadow</code>可以让我们针对任意一个<code>html</code>标签生成阴影，我们可以控制阴影的偏移量、模糊半径、实际半径、颜色等一系列属性。  <br>语法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="selector {
  /* offset-x | offset-y | color */
  box-shadow: 60px -16px teal;

  /* offset-x | offset-y | blur-radius | color */
  box-shadow: 10px 5px 5px black;

  /* offset-x | offset-y | blur-radius | spread-radius | color */
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);

  /* inset | offset-x | offset-y | color */
  box-shadow: inset 5em 1em gold;

  /* Any number of shadows, separated by commas */
  box-shadow: 3px 3px red, -1em 0 0.4em olive;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">selector</span> {
  <span class="hljs-comment">/* offset-x | offset-y | color */</span>
  <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">60px</span> -<span class="hljs-number">16px</span> teal;

  <span class="hljs-comment">/* offset-x | offset-y | blur-radius | color */</span>
  <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">10px</span> <span class="hljs-number">5px</span> <span class="hljs-number">5px</span> black;

  <span class="hljs-comment">/* offset-x | offset-y | blur-radius | spread-radius | color */</span>
  <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">2px</span> <span class="hljs-number">2px</span> <span class="hljs-number">2px</span> <span class="hljs-number">1px</span> <span class="hljs-built_in">rgba</span>(0, 0, 0, 0.2);

  <span class="hljs-comment">/* inset | offset-x | offset-y | color */</span>
  <span class="hljs-attribute">box-shadow</span>: inset <span class="hljs-number">5em</span> <span class="hljs-number">1em</span> gold;

  <span class="hljs-comment">/* Any number of shadows, separated by commas */</span>
  <span class="hljs-attribute">box-shadow</span>: <span class="hljs-number">3px</span> <span class="hljs-number">3px</span> red, -<span class="hljs-number">1em</span> <span class="hljs-number">0</span> <span class="hljs-number">0.4em</span> olive;
}</code></pre>
<p>这里是MDN的<a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/box-shadow" rel="nofollow noreferrer" target="_blank">box-shadow</a>描述，里边有一些示例。</p>
<h3 id="articleHeader3">canvas</h3>
<p>是的，我们还需要<code>canvas</code>，因为我们需要将图片资源转存到<code>canvas</code>中，再生成我们实际需要的数据格式。<br>在这里并不会拿<code>canvas</code>去做渲染之类的，单纯的是要利用<code>canvas</code>的某些API。</p>
<h2 id="articleHeader4">首版规划</h2>
<p>刚开始的规划大致是这样的：</p>
<ol>
<li>我们上传一张图片</li>
<li>创建一个<code>Image</code>对象接收上传的图片资源</li>
<li>将<code>Image</code>对象放入<code>canvas</code>中</li>
<li>通过<code>canvas</code>生成图片文件对应的<code>rgba</code>数据</li>
<li>处理<code>rgba</code>数据转换为<code>box-shadow</code>属性</li>
<li>done</li>
</ol>
<h3 id="articleHeader5">如何接收图片文件数据</h3>
<p>我们在监听<code>input[type="file"]</code>的<code>change</code>事件时，可以在<code>target</code>里边拿到一个<code>files</code>的对象。  <br>该对象为本次上传传入的文件列表集合，一般来说我们取第一个元素就是了。  <br>我们拿到了一个<code>File</code>类型的对象，接下来就是用<code>Image</code>来接收这个<code>File</code>对象了。  </p>
<p>这里会用到一个浏览器提供的全局对象<code>URL</code>，<code>URL</code>提供了一个<code>createObjectURL</code>的方法。  <br>方法接收一个<code>Blob</code>类型的参数，而<code>File</code>则是继承自<code>Blog</code>，所以我们直接传入就可以了。<br>然后再使用一个<code>Image</code>对象进行接收就可以了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$input.addEventListener('change', ({target: {files: [file]"}}") => {
  let $img = new Image()

  $img.addEventListener('load', _ => {
    console.log('we got this image')
  })

  $img.src = URL.createObjectURL(file)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$input.addEventListener(<span class="hljs-string">'change'</span>, ({<span class="hljs-attr">target</span>: {<span class="hljs-attr">files</span>: [file]"}}") =&gt; {
  <span class="hljs-keyword">let</span> $img = <span class="hljs-keyword">new</span> Image()

  $img.addEventListener(<span class="hljs-string">'load'</span>, _ =&gt; {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'we got this image'</span>)
  })

  $img.src = URL.createObjectURL(file)
})</code></pre>
<blockquote>MDN关于<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL" rel="nofollow noreferrer" target="_blank">URL.createObjectURL</a>的介绍</blockquote>
<h3 id="articleHeader6">通过canvas获取我们想要的数据</h3>
<p><code>canvas</code>可以直接渲染图片到画布中，可以是一个<code>Image</code>对象、<code>HTMLImageElement</code>及更多媒体相关的标签对象。  <br>所以我们上边会把数据暂存到一个<code>Image</code>对象中去。  <br>我们在调用<code>drawImage</code>时需要传入<code>x</code>、<code>y</code>、<code>width</code>、<code>height</code>四个参数，前两个必然是0了，关于后边两个属性，正好当我们的<code>Image</code>对象加载完成后，直接读取它的<code>width</code>和<code>height</code>就是真实的数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let context = $canvas.getContext('2d')
$img.addEventListener('load', _ => {
  context.drawImage($img, 0, 0, $img.width, $img.height)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> context = $canvas.getContext(<span class="hljs-string">'2d'</span>)
$img.addEventListener(<span class="hljs-string">'load'</span>, _ =&gt; {
  context.drawImage($img, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, $img.width, $img.height)
})</code></pre>
<p>当我们把图片渲染至<code>canvas</code>后，我们可以调用另一个API获取<code>rgba</code>相关的数据。</p>
<h4>getImageData</h4>
<p>我们调用<code>getImageData</code>会返回如下几个参数：</p>
<ol>
<li>data</li>
<li>width</li>
<li>height</li>
</ol>
<p><code>data</code>为一个数组，每相邻的四个元素为一个像素点的<code>rgba</code>描述。<br>一个类似这样结构的数组：<code>[r, g, b, a, r, g, b, a]</code>。</p>
<blockquote>MDN关于<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage" rel="nofollow noreferrer" target="_blank">context.drawImage</a>的介绍  <br>MDN关于<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/getImageData" rel="nofollow noreferrer" target="_blank">context.getImageData</a>的介绍</blockquote>
<h3 id="articleHeader7">处理rgba数据并转换为box-shadow</h3>
<p>在上边我们拿到了一个一维数组，接下来就是将它处理为更合理的结构。<br><strong>P.S. 一维数组是从左到右从上到下排列的，而不是从上到下从左到右</strong></p>
<p>我们可以发现，<code>width</code>与<code>height</code>相乘正好是<code>data</code>数组的<code>length</code>。  <br>而数组的顺序则是先按照<code>x</code>轴进行增加的，所以我们这样处理得到的数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getRGBA (pixels) {
  let results = []
  let {width, height, data} = pixels
  for (let i = 0; i < data.length / 4; i++) {
    results.push({
      x: i % width | 0,
      y: i / width | 0,
      r: data[i * 4],
      g: data[i * 4 + 1],
      b: data[i * 4 + 2],
      a: data[i * 4 + 3]
    })
  }

  return results
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getRGBA</span> (<span class="hljs-params">pixels</span>) </span>{
  <span class="hljs-keyword">let</span> results = []
  <span class="hljs-keyword">let</span> {width, height, data} = pixels
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; data.length / <span class="hljs-number">4</span>; i++) {
    results.push({
      <span class="hljs-attr">x</span>: i % width | <span class="hljs-number">0</span>,
      <span class="hljs-attr">y</span>: i / width | <span class="hljs-number">0</span>,
      <span class="hljs-attr">r</span>: data[i * <span class="hljs-number">4</span>],
      <span class="hljs-attr">g</span>: data[i * <span class="hljs-number">4</span> + <span class="hljs-number">1</span>],
      <span class="hljs-attr">b</span>: data[i * <span class="hljs-number">4</span> + <span class="hljs-number">2</span>],
      <span class="hljs-attr">a</span>: data[i * <span class="hljs-number">4</span> + <span class="hljs-number">3</span>]
    })
  }

  <span class="hljs-keyword">return</span> results
}</code></pre>
<p>我们将<code>length</code>除以<code>4</code>作为循环的最大长度，然后在生成每个像素点的描述时  <br>通过当前下标对图片宽度取余得到当前像素点在图片中的<code>x</code>轴下标  <br>通过当前下标对图片宽度取商得到当前像素点在图片中的<code>y</code>轴下标  <br>同时塞入<code>rgba</code>四个值，这样我们就会拿到一个类似这样结构的数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[{
  x: 0,
  y: 0,
  r: 255,
  g: 255,
  b: 255,
  a: 255
}]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">[{
  <span class="hljs-attr">x</span>: <span class="hljs-number">0</span>,
  <span class="hljs-attr">y</span>: <span class="hljs-number">0</span>,
  <span class="hljs-attr">r</span>: <span class="hljs-number">255</span>,
  <span class="hljs-attr">g</span>: <span class="hljs-number">255</span>,
  <span class="hljs-attr">b</span>: <span class="hljs-number">255</span>,
  <span class="hljs-attr">a</span>: <span class="hljs-number">255</span>
}]</code></pre>
<h4>将数据生成为box-shadow格式的数据</h4>
<p><code>box-shadow</code>是支持多组属性的，两组属性之间使用<code>,</code>进行分割。  <br>所以，我们拿到上边的数据以后，直接遍历拼接字符串就可以生成我们想要的结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let boxShadow = results.map(item =>
  `${item.x}px ${item.y}px rgba(${item.r}, ${item.g}, ${item.b}, ${item.a})`
).join(',')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> boxShadow = results.map(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span>
  <span class="hljs-string">`<span class="hljs-subst">${item.x}</span>px <span class="hljs-subst">${item.y}</span>px rgba(<span class="hljs-subst">${item.r}</span>, <span class="hljs-subst">${item.g}</span>, <span class="hljs-subst">${item.b}</span>, <span class="hljs-subst">${item.a}</span>)`</span>
).join(<span class="hljs-string">','</span>)</code></pre>
<p>效果图：<br><span class="img-wrap"><img data-src="/img/bVbaRCh?w=2558&amp;h=1228" src="https://static.alili.tech/img/bVbaRCh?w=2558&amp;h=1228" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>虽说这样就做出来了，但是对浏览器来说太不友好了。因为是每一个像素点对应的一个<code>box-shadow</code>属性。  <br>好奇的童鞋可以选择F12检查元素查看该<code>div</code>。<em>(反正苹果本是扛不住)</em><br>所以为了我们能够正常使用F12，我们下一步的操作就是合并相邻同色值的<code>box-shadow</code>，减少<code>box-shadow</code>属性值的数量。</p>
<h2 id="articleHeader8">合并相邻的单元格</h2>
<p>虽说图片可能是由各种颜色不规则的组合而成，但毕竟还是会有很多是重复颜色的。  <br>所以我们要计算出某一种颜色可合并的最大面积。  <br>针对某一种颜色，用表格表示可能是这样的：  <br><span class="img-wrap"><img data-src="/img/bVbaRCl?w=1314&amp;h=880" src="https://static.alili.tech/img/bVbaRCl?w=1314&amp;h=880" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>就像在图中所示，我们最理想的合并方式应该是这样的 <em>（radius的取值意味着我们只能设置一个正方形）</em>：  <br><span class="img-wrap"><img data-src="/img/bVbaRCm?w=1316&amp;h=890" src="https://static.alili.tech/img/bVbaRCm?w=1316&amp;h=890" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>于是。。如果计算出来这一块面积就成为了一个问题-.-  </p>
<p>目前的思路是，将数组转换为二维数组，而不是单纯的在对象中用<code>x</code>、<code>y</code>标识。  <br>所以，我们对处理数组的函数进行如下修改：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getRGBA (pixels) {
  let results = []
  let {width, height, data} = pixels
  for (let i = 0; i < data.length / 4; i++) {
    let x = i % width | 0
    let y = i / width | 0
    let row = results[y] = results[y] || []
    row[x] = {
      rgba: `${data.slice(i * 4, i * 4 + 4)}` // 为了方便后续的对比相同颜色，直接返回一个字符串
    }
  }

  return results
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getRGBA</span> (<span class="hljs-params">pixels</span>) </span>{
  <span class="hljs-keyword">let</span> results = []
  <span class="hljs-keyword">let</span> {width, height, data} = pixels
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; data.length / <span class="hljs-number">4</span>; i++) {
    <span class="hljs-keyword">let</span> x = i % width | <span class="hljs-number">0</span>
    <span class="hljs-keyword">let</span> y = i / width | <span class="hljs-number">0</span>
    <span class="hljs-keyword">let</span> row = results[y] = results[y] || []
    row[x] = {
      <span class="hljs-attr">rgba</span>: <span class="hljs-string">`<span class="hljs-subst">${data.slice(i * <span class="hljs-number">4</span>, i * <span class="hljs-number">4</span> + <span class="hljs-number">4</span>)}</span>`</span> <span class="hljs-comment">// 为了方便后续的对比相同颜色，直接返回一个字符串</span>
    }
  }

  <span class="hljs-keyword">return</span> results
}</code></pre>
<p>这时我们就能得到一个按照<code>x</code>、<code>y</code>排列的二维数组，下一步的操作就是以任意点为原点，进行匹配周围的<code>cell</code>。<br>参考上边的表格示例，我们会拿到一个类似这样的数据 <em>（仅作示例）</em>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1],
  [1, 1, 1],
  [1, 1, 1, 1, 1],
  [1, 1, 1, 1],
  [1, 1],
  [1, 1, 1, 1, 1, 1],
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">[
  [<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>],
  [<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>],
  [<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>],
  [<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>],
  [<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>],
  [<span class="hljs-number">1</span>, <span class="hljs-number">1</span>],
  [<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>],
]</code></pre>
<h3 id="articleHeader9">获取可合并的最大半径</h3>
<p>目前采用的是递归的方式，从<code>0,0</code>原点处开始搜索，获取当前原点的色值，然后与周围进行比较，获取一个最大半径的正方形：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 根据给定范围获取匹配当前节点的正方形
 * @param  {Array}  matrix            二维矩阵数组
 * @param  {Object} tag               当前要匹配的节点
 * @param  {Number} [startRowIndex=0] 开始的行下标，默认为1
 * @param  {Number} [startColIndex=0] 开始的列下标，默认为1
 * @return {Number}                   返回一个最小范围
 */
function range (matrix, tag, startRowIndex = 0, startColIndex = 0) {
  let results = []
  rows:
  for (let rowIndex = startRowIndex; rowIndex < matrix.length; rowIndex++) {
    let row = matrix[rowIndex]
    for (let colIndex = startColIndex; colIndex < row.length; colIndex++) {
      let item = row[colIndex]

      if (item.rgba !== tag.rgba) {
        if (colIndex === startColIndex) {
          break rows
          // 这个表示在某一行的第一列就匹配失败了，没有必要再进行后续的匹配，直接`break`到最外层
        } else {
          results.push(colIndex - startColIndex)
          break
          // 将当前下标放入集合，终止当前循环
        }
      } else if (colIndex === row.length - 1) {
        results.push(colIndex - startColIndex)
        // 这里表示一整行都可以与当前元素匹配
      }
    }
  }

  // 对所有的x、y轴的值进行比较获取最小的值
  let count = Math.min.apply(Math, [results.length].concat(results))

  return count
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * 根据给定范围获取匹配当前节点的正方形
 * @param  {Array}  matrix            二维矩阵数组
 * @param  {Object} tag               当前要匹配的节点
 * @param  {Number} [startRowIndex=0] 开始的行下标，默认为1
 * @param  {Number} [startColIndex=0] 开始的列下标，默认为1
 * @return {Number}                   返回一个最小范围
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">range</span> (<span class="hljs-params">matrix, tag, startRowIndex = <span class="hljs-number">0</span>, startColIndex = <span class="hljs-number">0</span></span>) </span>{
  <span class="hljs-keyword">let</span> results = []
  rows:
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> rowIndex = startRowIndex; rowIndex &lt; matrix.length; rowIndex++) {
    <span class="hljs-keyword">let</span> row = matrix[rowIndex]
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> colIndex = startColIndex; colIndex &lt; row.length; colIndex++) {
      <span class="hljs-keyword">let</span> item = row[colIndex]

      <span class="hljs-keyword">if</span> (item.rgba !== tag.rgba) {
        <span class="hljs-keyword">if</span> (colIndex === startColIndex) {
          <span class="hljs-keyword">break</span> rows
          <span class="hljs-comment">// 这个表示在某一行的第一列就匹配失败了，没有必要再进行后续的匹配，直接`break`到最外层</span>
        } <span class="hljs-keyword">else</span> {
          results.push(colIndex - startColIndex)
          <span class="hljs-keyword">break</span>
          <span class="hljs-comment">// 将当前下标放入集合，终止当前循环</span>
        }
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (colIndex === row.length - <span class="hljs-number">1</span>) {
        results.push(colIndex - startColIndex)
        <span class="hljs-comment">// 这里表示一整行都可以与当前元素匹配</span>
      }
    }
  }

  <span class="hljs-comment">// 对所有的x、y轴的值进行比较获取最小的值</span>
  <span class="hljs-keyword">let</span> count = <span class="hljs-built_in">Math</span>.min.apply(<span class="hljs-built_in">Math</span>, [results.length].concat(results))

  <span class="hljs-keyword">return</span> count
}</code></pre>
<p>函数会从起点开始按顺序遍历所有的元素，在遇到不匹配的节点后，就会<code>break</code>进入下次循环，并将当前的下标存入数组中。  <br>在遍历完成后，我们将数组所有的<code>item</code>以及数组的长度（可以认为是<code>y</code>轴的值）一同放入<code>Math.min</code>获取一个最小的值。  <br>这个最小的值就是我们以当前节点为原点时可以生成的最大范围的正方形了。  <br><em>P.S. 这个计算方式并不是很好，还不够灵活</em></p>
<h3 id="articleHeader10">递归计算剩余面积</h3>
<p>因为上边也只是合并了一个正方形，还会剩下很多面积没有被查看。  <br>所以我们用递归的方式来计算剩余面积，在第一次匹配结束后，是大概这个样子的：<br><span class="img-wrap"><img data-src="/img/bVbaRCn?w=340&amp;h=341" src="https://static.alili.tech/img/bVbaRCn?w=340&amp;h=341" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>所以我们在递归处拆分出了两块会有重复数据的面积：  <br><span class="img-wrap"><img data-src="/img/bVbaRCo?w=340&amp;h=338" src="https://static.alili.tech/img/bVbaRCo?w=340&amp;h=338" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><span class="img-wrap"><img data-src="/img/bVbaRCp?w=340&amp;h=341" src="https://static.alili.tech/img/bVbaRCp?w=340&amp;h=341" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>以及之后的递归也是参照这个样子来的，这样能保证所有的节点都会被照顾到，不会漏掉。<em>(如果有更好的方式，求回复)。</em>  </p>
<p>这样配合着前边拿到的半径数据，很轻松的就可以组装出合并后的集合，下一步就是将其渲染到<code>DOM</code>中了。</p>
<h3 id="articleHeader11">渲染到box-shadow中</h3>
<p>现在我们已经拿到了想要的数据，关于生成<code>box-shadow</code>属性处我们也要进行一些修改，之前因为是一个像素对应一个属性值，但是现在做了一些合并，所以，生成属性值的操作大概是这个样子的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$output.style.boxShadow = results.map(item =>
  `${item.x}px ${item.y}px 0px ${item.radius}px rgba(${item.target.rgba})`
).join(',')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">$output.style.boxShadow = results.map(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span>
  <span class="hljs-string">`<span class="hljs-subst">${item.x}</span>px <span class="hljs-subst">${item.y}</span>px 0px <span class="hljs-subst">${item.radius}</span>px rgba(<span class="hljs-subst">${item.target.rgba}</span>)`</span>
).join(<span class="hljs-string">','</span>)</code></pre>
<p><strong>P.S. <code>x</code>和<code>y</code>的值必须要加上半径的值，否则会出现错位，因为<code>box-shadow</code>是从中心开始渲染的，而不是左上角</strong></p>
<h3 id="articleHeader12">完成后的效果对比</h3>
<p>原图&amp;两种实现方式的效果对比：  <br><span class="img-wrap"><img data-src="/img/bVbaRCI?w=600&amp;h=557" src="https://static.alili.tech/img/bVbaRCI?w=600&amp;h=557" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>我们拿合并前后生成的<code>CSS</code>存为了文件，并查看了文件大小，效果在一些背景不是太复杂的图片上还是很明显的，减少了<code>2/3</code>左右的体积。  <br><em>如果将rgba替换为hex，还会再小一些</em><br><span class="img-wrap"><img data-src="/img/bVbaRCJ?w=476&amp;h=88" src="https://static.alili.tech/img/bVbaRCJ?w=476&amp;h=88" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>现在再进行检查元素不会崩溃了，但是依然会卡:)</p>
<h2 id="articleHeader13">参考资料</h2>
<ul>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow" rel="nofollow noreferrer" target="_blank">box-shadow</a></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/drawImage" rel="nofollow noreferrer" target="_blank">drawImage</a></li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData" rel="nofollow noreferrer" target="_blank">getImageData</a></li>
<li><a href="https://developer.mozilla.org/zh-CN/docs/Web/API/URL/createObjectURL" rel="nofollow noreferrer" target="_blank">createObjectURL</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用box-shadow进行画图(性能优化终结者)

## 原文链接
[https://segmentfault.com/a/1190000014943400](https://segmentfault.com/a/1190000014943400)

