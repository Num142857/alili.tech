---
title: '利用vue制作在线涂鸦板' 
date: 2019-01-28 2:30:09
hidden: true
slug: 2z3221tkybf
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>效果展示</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVHJXf?w=1550&amp;h=846" src="https://static.alili.tech/img/bVHJXf?w=1550&amp;h=846" alt="绘画板" title="绘画板" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader0">Canvas API简介</h1>
<h2 id="articleHeader1">调用方法</h2>
<ul>
<li><p><code>getImageData()</code> 返回<code>ImageData</code>对象，该对象为画布上指定的矩形复制像素数据</p></li>
<li><p><code>putImageData()</code> 把图像数据（从指定的 <code>ImageData</code> 对象）放回画布上</p></li>
<li><p><code>clearRect()</code> 在给定的矩形内清除指定的像素</p></li>
<li><p><code>toDataURL()</code> 返回canvas图像的URL</p></li>
<li><p><code>lineTo()</code> 添加一个新点，创建从该点到最后指定点的线条</p></li>
<li><p><code>stroke()</code> 绘制已定义的路径</p></li>
<li><p><code>beginPath()</code> 起始一条路径，或重置当前路径</p></li>
<li><p><code>moveTo()</code> 把路径移动到画布中的指定点，不创建线条</p></li>
</ul>
<h2 id="articleHeader2">调用属性</h2>
<ul>
<li><p><code>strokeStyle</code> 设置或返回用于笔触的颜色、渐变或模式</p></li>
<li><p><code>shadowBlur</code> 设置或返回用于阴影的模糊级别</p></li>
<li><p><code>shadowColor</code> 设置或返回用于阴影的颜色</p></li>
<li><p><code>lineWidth</code> 设置或返回当前的线条宽度</p></li>
</ul>
<blockquote><p>更多API请参考 <a href="https://lingmissing.github.io/myBlog/2016/12/13/canvas-basic/" rel="nofollow noreferrer" target="_blank">canvas基本使用</a></p></blockquote>
<h1 id="articleHeader3">功能需求说明</h1>
<ul>
<li><p>基础线条绘制功能</p></li>
<li><p>笔触颜色修改</p></li>
<li><p>笔刷粗细调整</p></li>
<li><p>撤回、前进、情况功能</p></li>
<li><p>生成图片</p></li>
</ul>
<h1 id="articleHeader4">初始化数据</h1>
<ul>
<li><p><code>colors</code>: 笔触颜色列表</p></li>
<li><p><code>brushs</code>: 笔刷对应的粗细</p></li>
<li><p><code>context</code>: canvas context</p></li>
<li><p><code>imgUrl</code>: 用于存放保存图片的地址</p></li>
<li><p><code>canvasMoveUse</code>: 是否允许执行move时候绘制线条</p></li>
<li><p><code>preDrawAry</code>: 存储当前表面状态数组-上一步</p></li>
<li><p><code>nextDrawAry</code>: 存储当前表面状态数组-下一步</p></li>
<li><p><code>middleAry</code>: 中间数组</p></li>
<li><p><code>lineWidth</code>: 线条宽度</p></li>
<li><p><code>lineColor</code>: 线条颜色</p></li>
<li><p><code>shadowBlur</code>: 阴影</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="data() {
  return {
    colors: ['#fef4ac','#0018ba','#ffc200','#f32f15','#cccccc','#5ab639'],
    brushs: [{
            className: 'small fa fa-paint-brush',
            lineWidth: 3
          },{
            className: 'middle fa fa-paint-brush',
            lineWidth: 6
          },{
            className: 'big fa fa-paint-brush',
            lineWidth: 12
          }],
    context: {},
    imgUrl: [],
    canvasMoveUse: true,
    preDrawAry: [],
    nextDrawAry: [],
    middleAry: [],
    config: {
      lineWidth: 1,
      lineColor: &quot;#f2849e&quot;,
      shadowBlur: 2
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">data() {
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">colors</span>: [<span class="hljs-string">'#fef4ac'</span>,<span class="hljs-string">'#0018ba'</span>,<span class="hljs-string">'#ffc200'</span>,<span class="hljs-string">'#f32f15'</span>,<span class="hljs-string">'#cccccc'</span>,<span class="hljs-string">'#5ab639'</span>],
    <span class="hljs-attr">brushs</span>: [{
            <span class="hljs-attr">className</span>: <span class="hljs-string">'small fa fa-paint-brush'</span>,
            <span class="hljs-attr">lineWidth</span>: <span class="hljs-number">3</span>
          },{
            <span class="hljs-attr">className</span>: <span class="hljs-string">'middle fa fa-paint-brush'</span>,
            <span class="hljs-attr">lineWidth</span>: <span class="hljs-number">6</span>
          },{
            <span class="hljs-attr">className</span>: <span class="hljs-string">'big fa fa-paint-brush'</span>,
            <span class="hljs-attr">lineWidth</span>: <span class="hljs-number">12</span>
          }],
    <span class="hljs-attr">context</span>: {},
    <span class="hljs-attr">imgUrl</span>: [],
    <span class="hljs-attr">canvasMoveUse</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">preDrawAry</span>: [],
    <span class="hljs-attr">nextDrawAry</span>: [],
    <span class="hljs-attr">middleAry</span>: [],
    <span class="hljs-attr">config</span>: {
      <span class="hljs-attr">lineWidth</span>: <span class="hljs-number">1</span>,
      <span class="hljs-attr">lineColor</span>: <span class="hljs-string">"#f2849e"</span>,
      <span class="hljs-attr">shadowBlur</span>: <span class="hljs-number">2</span>
    }
  }
}</code></pre>
<h1 id="articleHeader5">设置绘画配置</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  setCanvasStyle() {
    this.context.lineWidth = this.config.lineWidth
    this.context.shadowBlur = this.config.shadowBlur
    this.context.shadowColor = this.config.lineColor
    this.context.strokeStyle = this.config.lineColor
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  setCanvasStyle() {
    <span class="hljs-keyword">this</span>.context.lineWidth = <span class="hljs-keyword">this</span>.config.lineWidth
    <span class="hljs-keyword">this</span>.context.shadowBlur = <span class="hljs-keyword">this</span>.config.shadowBlur
    <span class="hljs-keyword">this</span>.context.shadowColor = <span class="hljs-keyword">this</span>.config.lineColor
    <span class="hljs-keyword">this</span>.context.strokeStyle = <span class="hljs-keyword">this</span>.config.lineColor
  }</code></pre>
<p>笔触颜色及粗细相关设置（点击修改config数据）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 画笔颜色 -->
<li 
  v-for=&quot;item in colors&quot; 
  :class=&quot;{'active':config.lineColor === item}&quot;
  :style=&quot;{ background: item }&quot; 
  @click=&quot;setColor(item)&quot;
></li>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 画笔颜色 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">li</span> 
  <span class="hljs-attr">v-for</span>=<span class="hljs-string">"item in colors"</span> 
  <span class="hljs-attr">:class</span>=<span class="hljs-string">"{'active':config.lineColor === item}"</span>
  <span class="hljs-attr">:style</span>=<span class="hljs-string">"{ background: item }"</span> 
  @<span class="hljs-attr">click</span>=<span class="hljs-string">"setColor(item)"</span>
&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 画笔粗细 -->
 <span 
  v-for=&quot;pen in brushs&quot; 
  :class=&quot;[pen.className,{'active': config.lineWidth === pen.lineWidth}]&quot;
  @click=&quot;setBrush(pen.lineWidth)&quot;
></span>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 画笔粗细 --&gt;</span>
 <span class="hljs-tag">&lt;<span class="hljs-name">span</span> 
  <span class="hljs-attr">v-for</span>=<span class="hljs-string">"pen in brushs"</span> 
  <span class="hljs-attr">:class</span>=<span class="hljs-string">"[pen.className,{'active': config.lineWidth === pen.lineWidth}]"</span>
  @<span class="hljs-attr">click</span>=<span class="hljs-string">"setBrush(pen.lineWidth)"</span>
&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></code></pre>
<h2 id="articleHeader6">画笔的移动操作</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 当在屏幕中移动时即开始绘制准备
beginPath(e){
  const canvas = document.querySelector('#canvas')
  if (e.target !== canvas) {
    this.context.beginPath()
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 当在屏幕中移动时即开始绘制准备</span>
beginPath(e){
  <span class="hljs-keyword">const</span> canvas = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#canvas'</span>)
  <span class="hljs-keyword">if</span> (e.target !== canvas) {
    <span class="hljs-keyword">this</span>.context.beginPath()
  }
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 在canvas中鼠标按下
 canvasDown(e) {
  // 让move方法可用
  this.canvasMoveUse = true
  // client是基于整个页面的坐标
  // offset是cavas距离顶部以及左边的距离
  const canvasX = e.clientX - e.target.parentNode.offsetLeft
  const canvasY = e.clientY - e.target.parentNode.offsetTop
  // 设置canvas的配置
  this.setCanvasStyle()
  //清除子路径
  this.context.beginPath()
  // 移动的起点
  this.context.moveTo(canvasX, canvasY)
  //当前绘图表面状态
  const preData = this.context.getImageData(0, 0, 600, 400)
  //当前绘图表面进栈
  // 按下相当于新的操作的开始，所以把当前记录数据放到prev中
  this.preDrawAry.push(preData)
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 在canvas中鼠标按下</span>
 canvasDown(e) {
  <span class="hljs-comment">// 让move方法可用</span>
  <span class="hljs-keyword">this</span>.canvasMoveUse = <span class="hljs-literal">true</span>
  <span class="hljs-comment">// client是基于整个页面的坐标</span>
  <span class="hljs-comment">// offset是cavas距离顶部以及左边的距离</span>
  <span class="hljs-keyword">const</span> canvasX = e.clientX - e.target.parentNode.offsetLeft
  <span class="hljs-keyword">const</span> canvasY = e.clientY - e.target.parentNode.offsetTop
  <span class="hljs-comment">// 设置canvas的配置</span>
  <span class="hljs-keyword">this</span>.setCanvasStyle()
  <span class="hljs-comment">//清除子路径</span>
  <span class="hljs-keyword">this</span>.context.beginPath()
  <span class="hljs-comment">// 移动的起点</span>
  <span class="hljs-keyword">this</span>.context.moveTo(canvasX, canvasY)
  <span class="hljs-comment">//当前绘图表面状态</span>
  <span class="hljs-keyword">const</span> preData = <span class="hljs-keyword">this</span>.context.getImageData(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">600</span>, <span class="hljs-number">400</span>)
  <span class="hljs-comment">//当前绘图表面进栈</span>
  <span class="hljs-comment">// 按下相当于新的操作的开始，所以把当前记录数据放到prev中</span>
  <span class="hljs-keyword">this</span>.preDrawAry.push(preData)
},</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// canvas中鼠标移动
canvasMove(e) {
  if(this.canvasMoveUse) {
    // 只有允许移动时调用
    const t = e.target
    let canvasX
    let canvasY
    // 由于手机端和pc端获取页面坐标方式不同，所以需要做出判断
    if(this.isPc()){
      canvasX = e.clientX - t.parentNode.offsetLeft
      canvasY = e.clientY - t.parentNode.offsetTop
    }else {
      canvasX = e.changedTouches[0].clientX - t.parentNode.offsetLeft
      canvasY = e.changedTouches[0].clientY - t.parentNode.offsetTop
    }
    // 连接到移动的位置并上色
    this.context.lineTo(canvasX, canvasY)
    this.context.stroke()
  }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// canvas中鼠标移动</span>
canvasMove(e) {
  <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.canvasMoveUse) {
    <span class="hljs-comment">// 只有允许移动时调用</span>
    <span class="hljs-keyword">const</span> t = e.target
    <span class="hljs-keyword">let</span> canvasX
    <span class="hljs-keyword">let</span> canvasY
    <span class="hljs-comment">// 由于手机端和pc端获取页面坐标方式不同，所以需要做出判断</span>
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.isPc()){
      canvasX = e.clientX - t.parentNode.offsetLeft
      canvasY = e.clientY - t.parentNode.offsetTop
    }<span class="hljs-keyword">else</span> {
      canvasX = e.changedTouches[<span class="hljs-number">0</span>].clientX - t.parentNode.offsetLeft
      canvasY = e.changedTouches[<span class="hljs-number">0</span>].clientY - t.parentNode.offsetTop
    }
    <span class="hljs-comment">// 连接到移动的位置并上色</span>
    <span class="hljs-keyword">this</span>.context.lineTo(canvasX, canvasY)
    <span class="hljs-keyword">this</span>.context.stroke()
  }
},</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// canvas中鼠标放开
canvasUp(e){
  const preData = this.context.getImageData(0, 0, 600, 400)
  if (!this.nextDrawAry.length) {
    // 在没有撤销过的情况下，将当前数据放入prev
    //当前绘图表面进栈
    this.middleAry.push(preData)
  } else {
    // 在撤销的情况下，将在后面步骤的数据情况记录
    this.middleAry = []
    this.middleAry = this.middleAry.concat(this.preDrawAry)
    this.middleAry.push(preData)
    this.nextDrawAry = []
  }
  // 设置move时不可绘制
  this.canvasMoveUse = false
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// canvas中鼠标放开</span>
canvasUp(e){
  <span class="hljs-keyword">const</span> preData = <span class="hljs-keyword">this</span>.context.getImageData(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">600</span>, <span class="hljs-number">400</span>)
  <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.nextDrawAry.length) {
    <span class="hljs-comment">// 在没有撤销过的情况下，将当前数据放入prev</span>
    <span class="hljs-comment">//当前绘图表面进栈</span>
    <span class="hljs-keyword">this</span>.middleAry.push(preData)
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-comment">// 在撤销的情况下，将在后面步骤的数据情况记录</span>
    <span class="hljs-keyword">this</span>.middleAry = []
    <span class="hljs-keyword">this</span>.middleAry = <span class="hljs-keyword">this</span>.middleAry.concat(<span class="hljs-keyword">this</span>.preDrawAry)
    <span class="hljs-keyword">this</span>.middleAry.push(preData)
    <span class="hljs-keyword">this</span>.nextDrawAry = []
  }
  <span class="hljs-comment">// 设置move时不可绘制</span>
  <span class="hljs-keyword">this</span>.canvasMoveUse = <span class="hljs-literal">false</span>
}</code></pre>
<p>为了保证移动端的可用性，加入touchstart等。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<canvas 
  id=&quot;canvas&quot; 
  class=&quot;fl&quot; 
  width=&quot;600&quot; 
  height=&quot;400&quot; 
  @mousedown=&quot;canvasDown($event)&quot; 
  @mouseup=&quot;canvasUp($event)&quot;
  @mousemove=&quot;canvasMove($event)&quot;
  @touchstart=&quot;canvasDown($event)&quot; 
  @touchend=&quot;canvasUp($event)&quot;
  @touchmove=&quot;canvasMove($event)&quot;
>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> 
  <span class="hljs-attr">id</span>=<span class="hljs-string">"canvas"</span> 
  <span class="hljs-attr">class</span>=<span class="hljs-string">"fl"</span> 
  <span class="hljs-attr">width</span>=<span class="hljs-string">"600"</span> 
  <span class="hljs-attr">height</span>=<span class="hljs-string">"400"</span> 
  @<span class="hljs-attr">mousedown</span>=<span class="hljs-string">"canvasDown($event)"</span> 
  @<span class="hljs-attr">mouseup</span>=<span class="hljs-string">"canvasUp($event)"</span>
  @<span class="hljs-attr">mousemove</span>=<span class="hljs-string">"canvasMove($event)"</span>
  @<span class="hljs-attr">touchstart</span>=<span class="hljs-string">"canvasDown($event)"</span> 
  @<span class="hljs-attr">touchend</span>=<span class="hljs-string">"canvasUp($event)"</span>
  @<span class="hljs-attr">touchmove</span>=<span class="hljs-string">"canvasMove($event)"</span>
&gt;</span></code></pre>
<h2 id="articleHeader7">撤销清空等操作</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 撤销
if (this.preDrawAry.length) {
  const popData = this.preDrawAry.pop()
  const midData = this.middleAry[this.preDrawAry.length + 1]
  this.nextDrawAry.push(midData)
  this.context.putImageData(popData, 0, 0)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 撤销</span>
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.preDrawAry.length) {
  <span class="hljs-keyword">const</span> popData = <span class="hljs-keyword">this</span>.preDrawAry.pop()
  <span class="hljs-keyword">const</span> midData = <span class="hljs-keyword">this</span>.middleAry[<span class="hljs-keyword">this</span>.preDrawAry.length + <span class="hljs-number">1</span>]
  <span class="hljs-keyword">this</span>.nextDrawAry.push(midData)
  <span class="hljs-keyword">this</span>.context.putImageData(popData, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>)
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 前进
if (this.nextDrawAry.length) {
  const popData = this.nextDrawAry.pop()
  const midData = this.middleAry[this.middleAry.length - this.nextDrawAry.length - 2]
  this.preDrawAry.push(midData)
  this.context.putImageData(popData, 0, 0)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 前进</span>
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.nextDrawAry.length) {
  <span class="hljs-keyword">const</span> popData = <span class="hljs-keyword">this</span>.nextDrawAry.pop()
  <span class="hljs-keyword">const</span> midData = <span class="hljs-keyword">this</span>.middleAry[<span class="hljs-keyword">this</span>.middleAry.length - <span class="hljs-keyword">this</span>.nextDrawAry.length - <span class="hljs-number">2</span>]
  <span class="hljs-keyword">this</span>.preDrawAry.push(midData)
  <span class="hljs-keyword">this</span>.context.putImageData(popData, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>)
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 清空
this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height)
// 清空前后数据
this.preDrawAry = []
this.nextDrawAry = []
// middleAry恢复到默认数据
this.middleAry = [this.middleAry[0]]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 清空</span>
<span class="hljs-keyword">this</span>.context.clearRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-keyword">this</span>.context.canvas.width, <span class="hljs-keyword">this</span>.context.canvas.height)
<span class="hljs-comment">// 清空前后数据</span>
<span class="hljs-keyword">this</span>.preDrawAry = []
<span class="hljs-keyword">this</span>.nextDrawAry = []
<span class="hljs-comment">// middleAry恢复到默认数据</span>
<span class="hljs-keyword">this</span>.middleAry = [<span class="hljs-keyword">this</span>.middleAry[<span class="hljs-number">0</span>]]</code></pre>
<blockquote><p><a href="https://lingmissing.github.io/#/draw" rel="nofollow noreferrer" target="_blank">demo地址</a></p></blockquote>
<hr>
<blockquote><p><a href="https://github.com/lingmissing/lingmissing.github.com/tree/code/src/router/OnlineTools/Draw" rel="nofollow noreferrer" target="_blank">查看代码</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
利用vue制作在线涂鸦板

## 原文链接
[https://segmentfault.com/a/1190000008002412](https://segmentfault.com/a/1190000008002412)

