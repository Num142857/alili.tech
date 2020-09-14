---
title: 'HTML5中手势原理分析与数学知识的实践' 
date: 2019-01-05 2:30:11
hidden: true
slug: ucl5gdwezzo
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">HTML5中手势原理分析与数学知识的实践</h1>
<h2 id="articleHeader1">引言</h2>
<p>在这触控屏的时代，人性化的手势操作已经深入了我们生活的每个部分。现代应用越来越重视与用户的交互及体验，手势是最直接且最为有效的交互方式，一个好的手势交互，能降低用户的使用成本和流程，大大提高了用户的体验。</p>
<p>近期，公司的多个项目中都对手势有着较高的需求，已有的手势库无法完全cover，因此便撸了一个轻量、便于使用的移动端手势库。这篇博文主要是解析了移动端常用手势的原理，及从前端的角度学习过程中所使用的数学知识。希望能对大家有一点点的启发作用，也期待大神们指出不足甚至错误，感恩。</p>
<p>主要讲解项目中经常使用到的五种手势：</p>
<ul>
<li><p>拖动: <code>drag</code></p></li>
<li><p>双指缩放: <code>pinch</code></p></li>
<li><p>双指旋转: <code>rotate</code></p></li>
<li><p>单指缩放: <code>singlePinch</code></p></li>
<li><p>单指旋转: <code>singleRotate</code></p></li>
</ul>
<blockquote><p>Tips :<br>因为 <code>tap</code> 及 <code>swipe</code> 很多基础库中包含，为了轻便，因此并没有包含,但如果需要，可进行扩展;</p></blockquote>
<h2 id="articleHeader2">实现原理</h2>
<p>众所周知，所有的手势都是基于浏览器原生事件<code>touchstart</code>, <code>touchmove</code>, <code>touchend</code>, <code>touchcancel</code>进行的上层封装，因此封装的思路是通过一个个相互独立的事件回调仓库<code>handleBus</code>，然后在原生<code>touch</code>事件中符合条件的时机触发并传出计算后的参数值，完成手势的操作。实现原理较为简单清晰，先不急，我们先来理清一些使用到的数学概念并结合代码，将数学运用到实际问题中，数学部分可能会比较枯燥，但希望大家坚持读完，相信会收益良多。</p>
<h2 id="articleHeader3">基础数学知识函数</h2>
<p>我们常见的坐标系属于线性空间，或称向量空间(Vector Space)。这个空间是一个由点(Point) 和 向量(Vector) 所组成集合；</p>
<h3 id="articleHeader4">点(Point)</h3>
<p>可以理解为我们的坐标点,例如原点<code>O(0,0),A(-1,2)</code>，通过原生事件对象的<code>touches</code>可以获取触摸点的坐标，参数<code>index</code>代表第几接触点；</p>
<p><span class="img-wrap"><img data-src="/img/bVSgD3?w=922&amp;h=336" src="https://static.alili.tech/img/bVSgD3?w=922&amp;h=336" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5">向量(Vector)</h3>
<p>是坐标系中一种 <strong>既有大小也有方向的线段</strong>，例如由原点<code>O(0,0)</code>指向点<code>A(1,1)</code>的箭头线段，称为向量<code>a</code>，则<code>a=(1-0,1-0)=(1,1)</code>;</p>
<p>如下图所示，其中<code>i</code>与<code>j</code>向量称为该坐标系的单位向量，也称为基向量，我们常见的坐标系单位为<code>1</code>,即<code>i=(1,0)；j=(0,1)</code>；</p>
<p><span class="img-wrap"><img data-src="/img/bVSgD7?w=600&amp;h=560" src="https://static.alili.tech/img/bVSgD7?w=600&amp;h=560" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>获取向量的函数：</p>
<p><span class="img-wrap"><img data-src="/img/bVSgD8?w=724&amp;h=290" src="https://static.alili.tech/img/bVSgD8?w=724&amp;h=290" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader6">向量模</h3>
<p>代表 <strong>向量的长度</strong>，记为<code>|a|</code>，是一个标量，只有大小，没有方向;</p>
<p>几何意义代表的是以<code>x,y</code>为直角边的直角三角形的斜边，通过勾股定理进行计算；</p>
<p><span class="img-wrap"><img data-src="/img/bVSgEc?w=552&amp;h=452" src="https://static.alili.tech/img/bVSgEc?w=552&amp;h=452" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><code>getLength</code>函数：</p>
<p><span class="img-wrap"><img data-src="/img/bVSgEg?w=946&amp;h=166" src="https://static.alili.tech/img/bVSgEg?w=946&amp;h=166" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader7">向量的数量积</h3>
<p>向量同样也具有可以运算的属性，它可以进行加、减、乘、数量积和向量积等运算，接下来就介绍下我们使用到的数量积这个概念，也称为点积，被定义为公式：</p>
<blockquote><p>当a=(x1,y1),b=(x2,y2)，则a·b=|a|·|b|·cosθ=x1·x2+y1·y2；</p></blockquote>
<h3 id="articleHeader8">共线定理</h3>
<p>共线，即两个向量处于 <strong>平行</strong> 的状态，当<code>a=(x1,y1),b=(x2,y2)</code>，则存在唯一的一个实数λ，使得<code>a=λb</code>，代入坐标点后，可以得到 <code>x1·y2= y1·x2</code>;</p>
<p>因此当<code>x1·y2-x2·y1&gt;0</code> 时，既斜率 <strong>ka &gt; kb</strong> ，所以此时<code>b</code>向量相对于<code>a</code>向量是属于顺时针旋转，反之，则为逆时针；</p>
<h3 id="articleHeader9">旋转角度</h3>
<p>通过数量积公式我们可以推到求出两个向量的夹角：</p>
<blockquote><p>cosθ=(x1·x2+y1·y2)/(|a|·|b|);</p></blockquote>
<p>然后通过共线定理我们可以判断出旋转的方向，函数定义为：</p>
<p><span class="img-wrap"><img data-src="/img/bVSgEh?w=1128&amp;h=1002" src="https://static.alili.tech/img/bVSgEh?w=1128&amp;h=1002" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader10">矩阵与变换</h3>
<p>由于空间最本质的特征就是其可以容纳运动，因此在线性空间中，</p>
<blockquote><p>我们用向量来刻画对象，而矩阵便是用来描述对象的运动；</p></blockquote>
<h4>而矩阵是如何描述运动的呢?</h4>
<p>我们知道，通过一个坐标系基向量便可以确定一个向量，例如 <code>a=(-1,2)</code>,我们通常约定的基向量是 i = (1,0) 与 j = (0,1)； 因此:</p>
<blockquote><p>a = -1i + 2j = -1<em>(1,0) + 2</em>(0,1) = (-1+0,0+2) = (-1,2);</p></blockquote>
<p>而矩阵变换的，其实便是通过矩阵转换了基向量，从而完成了向量的变换；</p>
<p>例如上面的栗子，把<code>a</code>向量通过矩阵(1,2,3,0)进行变换，此时基向量<code>i</code>由 <code>(1,0)</code>变换成<code>(1,-2)</code>与<code>j</code>由<code>(0,1)</code>变换成<code>(3,0)</code>,沿用上面的推导，则</p>
<blockquote><p>a = -1i + 2j = -1(-1,2) + 2(3,0) = (5,-2);</p></blockquote>
<p>如下图所示：<br>A图表示变换之前的坐标系，此时<code>a=(-1,2)</code>，通过矩阵变换后，基向量<code>i，j</code>的变换引起了坐标系的变换，变成了下图B，因此<code>a</code>向量由<code>(-1,2)</code>变换成了<code>(5,-2)</code>；</p>
<blockquote><p>其实向量与坐标系的关联不变(<code>a = -1i+2j</code>)，是基向量引起坐标系变化，然后坐标系沿用关联导致了向量的变化；</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVSgEW?w=593&amp;h=473" src="https://static.alili.tech/img/bVSgEW?w=593&amp;h=473" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h4>结合代码</h4>
<p>其实CSS的<code>transform</code>等变换便是通过矩阵进行的，我们平时所写的<code>translate/rotate</code>等语法类似于一种封装好的语法糖，便于快捷使用，而在底层都会被转换成矩阵的形式。例如<code>transform:translate(-30px,-30px)</code>编译后会被转换成<code>transform : matrix(1,0,0,1,30,30)</code>;</p>
<p>通常在二维坐标系中，只需要 2X2 的矩阵便足以描述所有的变换了， 但由于CSS是处于3D环境中的，因此CSS中使用的是 3X3 的矩阵，表示为：</p>
<p><span class="img-wrap"><img data-src="/img/bVSgE1?w=254&amp;h=164" src="https://static.alili.tech/img/bVSgE1?w=254&amp;h=164" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>其中第三行的<code>0,0,1</code>代表的就是<code>z</code>轴的默认参数。这个矩阵中，<code>(a,b)</code> 即为坐标轴的 <code>i</code>基，而<code>(c,d)</code>既为<code>j</code>基,<code>e</code>为<code>x</code>轴的偏移量,<code>f</code>为<code>y</code>轴的偏移量;因此上栗便很好理解，<strong><code>translate</code>并没有导致<code>i，j</code>基改变，只是发生了偏移</strong>，因此<code>translate(-30px,-30px) ==&gt; matrix(1,0,0,1,30,30)</code>~</p>
<p>所有的<code>transform</code>语句，都会发生对应的转换，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 发生偏移，但基向量不变；
transform:translate(x,y) ==> transform:matrix(1,0,0,1,x,y)

// 基向量旋转；
transform:rotate(θdeg)==> transform:matrix(cos(θ·π/180),sin(θ·π/180),-sin(θ·π/180),cos(θ·π/180),0,0)

// 基向量放大且方向不变；
transform:scale(s) ==> transform:matrix(s,0,0,s,0,0)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs rsl"><code><span class="hljs-comment">// 发生偏移，但基向量不变；</span>
<span class="hljs-built_in">transform</span>:translate(x,y) ==&gt; <span class="hljs-built_in">transform</span>:<span class="hljs-keyword">matrix</span>(<span class="hljs-number">1</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,x,y)

<span class="hljs-comment">// 基向量旋转；</span>
<span class="hljs-built_in">transform</span>:rotate(θdeg)==&gt; <span class="hljs-built_in">transform</span>:<span class="hljs-keyword">matrix</span>(<span class="hljs-built_in">cos</span>(θ·π/<span class="hljs-number">180</span>),<span class="hljs-built_in">sin</span>(θ·π/<span class="hljs-number">180</span>),-<span class="hljs-built_in">sin</span>(θ·π/<span class="hljs-number">180</span>),<span class="hljs-built_in">cos</span>(θ·π/<span class="hljs-number">180</span>),<span class="hljs-number">0</span>,<span class="hljs-number">0</span>)

<span class="hljs-comment">// 基向量放大且方向不变；</span>
<span class="hljs-built_in">transform</span>:scale(s) ==&gt; <span class="hljs-built_in">transform</span>:<span class="hljs-keyword">matrix</span>(s,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,s,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>)
</code></pre>
<p><code>translate/rotate/scale</code>等语法十分强大，让我们的代码更为可读且方便书写，但是<code>matrix</code>有着更强大的转换特性，通过<code>matrix</code>，可以发生任何方式的变换，例如我们常见的<strong>镜像对称</strong>，<code>transform:matrix(-1,0,0,1,0,0)</code>;</p>
<p><span class="img-wrap"><img data-src="/img/bVSgE3?w=442&amp;h=129" src="https://static.alili.tech/img/bVSgE3?w=442&amp;h=129" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h4>MatrixTo</h4>
<p>然而<code>matrix</code>虽然强大，但可读性却不好，而且我们的写入是通过<code>translate/rotate/scale</code>的属性,然而通过<code>getComputedStyle</code>读取到的 <code>transform</code>却是<code>matrix</code>:</p>
<blockquote><p>transform:matrix(1.41421, 1.41421, -1.41421, 1.41421, -50, -50);</p></blockquote>
<p>请问这个元素发生了怎么样的变化?。。这就一脸懵逼了。-_-|||</p>
<p>因此，我们必须要有个方法，来将<code>matrix</code>翻译成我们更为熟悉的<code>translate/rotate/scale</code>方式，在理解了其原理后，我们便可以着手开始表演咯~</p>
<p>我们知道，前4个参数会同时受到<code>rotate</code>和<code>scale</code>的影响，具有两个变量，因此需要通过前两个参数根据上面的转换方式列出两个不等式：</p>
<blockquote>
<p>cos(θ·π/180)*s=1.41421;</p>
<p>sin(θ·π/180)*s=1.41421;</p>
</blockquote>
<p>将两个不等式相除，即可以轻松求出<code>θ</code>和<code>s</code>了，perfect！！函数如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVSgE6?w=1392&amp;h=1062" src="https://static.alili.tech/img/bVSgE6?w=1392&amp;h=1062" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader11">手势原理</h2>
<p>接下来我们将上面的函数用到实际环境中，通过图示的方式来模拟手势的操作，简要地讲解手势计算的原理。希望各位大神理解这些基础的原理后，能创造出更多炫酷的手势，像我们在<code>mac</code>触控板上使用的一样。</p>
<p>下面图例：</p>
<blockquote>
<p>圆点: 代表手指的触碰点;</p>
<p>两个圆点之间的虚线段: 代表双指操作时组成的向量;</p>
<p>a向量/A点：代表在 touchstart 时获取的初始向量/初始点；</p>
<p>b向量/B点：代表在 touchmove 时获取的实时向量/实时点；</p>
<p>坐标轴底部的公式代表需要计算的值；</p>
</blockquote>
<h3 id="articleHeader12">Drag(拖动事件)</h3>
<p><span class="img-wrap"><img data-src="/img/bVSgE7?w=616&amp;h=510" src="https://static.alili.tech/img/bVSgE7?w=616&amp;h=510" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>上图是模拟了拖动手势，由<code>A</code>点移动到<code>B</code>点，我们要计算的便是这个过程的偏移量；</p>
<p>因此我们在<code>touchstart</code>中记录初始点A的坐标：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 获取初始点A；
let startPoint = getPoint(ev,0);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 获取初始点A；</span>
<span class="hljs-keyword">let</span> startPoint = getPoint(ev,<span class="hljs-number">0</span>);</code></pre>
<p>然后在<code>touchmove</code>事件中获取当前点并实时的计算出<code>△x</code>与<code>△y</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 实时获取初始点B；
let curPoint = getPoint(ev,0);

// 通过A、B两点，实时的计算出位移增量，触发 drag 事件并传出参数；
_eventFire('drag', {
    delta: {
        deltaX: curPoint.x - startPoint.x,
        deltaY: curPoint.y - startPoint.y,
    },
    origin: ev,
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 实时获取初始点B；</span>
<span class="hljs-keyword">let</span> curPoint = getPoint(ev,<span class="hljs-number">0</span>);

<span class="hljs-comment">// 通过A、B两点，实时的计算出位移增量，触发 drag 事件并传出参数；</span>
_eventFire(<span class="hljs-string">'drag'</span>, {
    <span class="hljs-attr">delta</span>: {
        <span class="hljs-attr">deltaX</span>: curPoint.x - startPoint.x,
        <span class="hljs-attr">deltaY</span>: curPoint.y - startPoint.y,
    },
    <span class="hljs-attr">origin</span>: ev,
});</code></pre>
<blockquote><p>Tips: <code>fire</code>函数即遍历执行<code>drag</code>事件对应的回调仓库即可；</p></blockquote>
<h3 id="articleHeader13">Pinch(双指缩放)</h3>
<p><span class="img-wrap"><img data-src="/img/bVSgE9?w=598&amp;h=554" src="https://static.alili.tech/img/bVSgE9?w=598&amp;h=554" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>上图是双指缩放的模拟图，双指由<code>a</code>向量放大到<code>b</code>向量，通过初始状态时的<code>a</code>向量的模与<code>touchmove</code>中获取的<code>b</code>向量的模进行计算，便可得出缩放值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// touchstart中计算初始双指的向量模；
let vector1 = getVector(secondPoint, startPoint);
let pinchStartLength = getLength(vector1);

// touchmove中计算实时的双指向量模；
let vector2 = getVector(curSecPoint, curPoint);
let pinchLength = getLength(vector2);
this._eventFire('pinch', {
    delta: {
        scale: pinchLength / pinchStartLength,
    },
    origin: ev,
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// touchstart中计算初始双指的向量模；</span>
<span class="hljs-keyword">let</span> vector1 = getVector(secondPoint, startPoint);
<span class="hljs-keyword">let</span> pinchStartLength = getLength(vector1);

<span class="hljs-comment">// touchmove中计算实时的双指向量模；</span>
<span class="hljs-keyword">let</span> vector2 = getVector(curSecPoint, curPoint);
<span class="hljs-keyword">let</span> pinchLength = getLength(vector2);
<span class="hljs-keyword">this</span>._eventFire(<span class="hljs-string">'pinch'</span>, {
    <span class="hljs-attr">delta</span>: {
        <span class="hljs-attr">scale</span>: pinchLength / pinchStartLength,
    },
    <span class="hljs-attr">origin</span>: ev,
});</code></pre>
<h3 id="articleHeader14">Rotate(双指旋转)</h3>
<p><span class="img-wrap"><img data-src="/img/bVSgFa?w=592&amp;h=566" src="https://static.alili.tech/img/bVSgFa?w=592&amp;h=566" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>初始时双指向量<code>a</code>，旋转到<code>b</code>向量，<code>θ</code>便是我们需要的值，因此只要通过我们上面构建的<code>getAngle</code>函数，便可求出旋转的角度：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// a向量；
let vector1 = getVector(secondPoint, startPoint);

// b向量；
let vector2 = getVector(curSecPoint, curPoint);

// 触发事件;
this._eventFire('rotate', {
    delta: {
        rotate: getAngle(vector1, vector2),
    },
    origin: ev,
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// a向量；</span>
<span class="hljs-keyword">let</span> vector1 = getVector(secondPoint, startPoint);

<span class="hljs-comment">// b向量；</span>
<span class="hljs-keyword">let</span> vector2 = getVector(curSecPoint, curPoint);

<span class="hljs-comment">// 触发事件;</span>
<span class="hljs-keyword">this</span>._eventFire(<span class="hljs-string">'rotate'</span>, {
    <span class="hljs-attr">delta</span>: {
        <span class="hljs-attr">rotate</span>: getAngle(vector1, vector2),
    },
    <span class="hljs-attr">origin</span>: ev,
});</code></pre>
<h3 id="articleHeader15">singlePinch(单指缩放)</h3>
<p><span class="img-wrap"><img data-src="/img/bVSgFc?w=606&amp;h=584" src="https://static.alili.tech/img/bVSgFc?w=606&amp;h=584" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>与上面的手势不同，单指缩放和单指旋转都需要多个特有概念：</p>
<blockquote>
<p>操作元素(<code>operator</code>)：需要操作的元素。上面三个手势其实并不关心操作元素，因为单纯靠手势自身，便能计算得出正确的参数值，而单指缩放和旋转需要依赖于操作元素的基准点(操作元素的中心点)进行计算；</p>
<p>按钮：因为单指的手势与拖动(drag)手势是相互冲突的，需要一种特殊的交互方式来进行区分，这里是通过特定的区域来区分，类似于一个按钮，当在按钮上操作时，是单指缩放或者旋转，而在按钮区域外，则是常规的拖动，实践证明，这是一个用户很容易接受且体验较好的操作方式；</p>
</blockquote>
<p>图中由<code>a</code>向量单指放大到<code>b</code>向量，对操作元(正方形)素进行了中心放大，此时缩放值即为<code>b</code>向量的模 / <code>a</code>向量的模；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 计算单指操作时的基准点，获取operator的中心点；
let singleBasePoint = getBasePoint(operator);

// touchstart 中计算初始向量模；
let pinchV1 = getVector(startPoint,singleBasePoint);
singlePinchStartLength = getLength(pinchV1);

// touchmove 中计算实时向量模；
pinchV2 = getVector(curPoint, singleBasePoint);
singlePinchLength = getLength(pinchV2);

// 触发事件；
this._eventFire('singlePinch', {
    delta: {
        scale: singlePinchLength / singlePinchStartLength,
    },
    origin: ev,
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 计算单指操作时的基准点，获取operator的中心点；</span>
<span class="hljs-keyword">let</span> singleBasePoint = getBasePoint(operator);

<span class="hljs-comment">// touchstart 中计算初始向量模；</span>
<span class="hljs-keyword">let</span> pinchV1 = getVector(startPoint,singleBasePoint);
singlePinchStartLength = getLength(pinchV1);

<span class="hljs-comment">// touchmove 中计算实时向量模；</span>
pinchV2 = getVector(curPoint, singleBasePoint);
singlePinchLength = getLength(pinchV2);

<span class="hljs-comment">// 触发事件；</span>
<span class="hljs-keyword">this</span>._eventFire(<span class="hljs-string">'singlePinch'</span>, {
    <span class="hljs-attr">delta</span>: {
        <span class="hljs-attr">scale</span>: singlePinchLength / singlePinchStartLength,
    },
    <span class="hljs-attr">origin</span>: ev,
});</code></pre>
<h3 id="articleHeader16">singleRotate(单指旋转)</h3>
<p><span class="img-wrap"><img data-src="/img/bVSgFh?w=644&amp;h=640" src="https://static.alili.tech/img/bVSgFh?w=644&amp;h=640" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>结合单指缩放和双指旋转，可以很简单的知道 <code>θ</code>便是我们需要的旋转角度；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 获取初始向量与实时向量
let rotateV1 = getVector(startPoint, singleBasePoint);
let rotateV2 = getVector(curPoint, singleBasePoint);

// 通过 getAngle 获取旋转角度并触发事件；
this._eventFire('singleRotate', {
    delta: {
        rotate: getAngle(rotateV1, rotateV2),
    },
    origin: ev,
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 获取初始向量与实时向量</span>
<span class="hljs-keyword">let</span> rotateV1 = getVector(startPoint, singleBasePoint);
<span class="hljs-keyword">let</span> rotateV2 = getVector(curPoint, singleBasePoint);

<span class="hljs-comment">// 通过 getAngle 获取旋转角度并触发事件；</span>
<span class="hljs-keyword">this</span>._eventFire(<span class="hljs-string">'singleRotate'</span>, {
    <span class="hljs-attr">delta</span>: {
        <span class="hljs-attr">rotate</span>: getAngle(rotateV1, rotateV2),
    },
    <span class="hljs-attr">origin</span>: ev,
});</code></pre>
<h3 id="articleHeader17">运动增量</h3>
<p>由于<code>touchmove</code>事件是个高频率的实时触发事件，一个拖动操作，其实触发了N次的<code>touchmove</code>事件，因此计算出来的值只是一种增量，即代表的是一次 <code>touchmove</code>事件增加的值，只代表一段很小的值，并不是最终的结果值，因此需要由<code>mtouch.js</code>外部维护一个位置数据，类似于:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//    真实位置数据；
let dragTrans = {x = 0,y = 0};

// 累加上 mtouch 所传递出的增量 deltaX 与 deltaY;
dragTrans.x += ev.delta.deltaX;
dragTrans.y += ev.delta.deltaY;

// 通过 transform 直接操作元素；
set($drag,dragTrans);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//    真实位置数据；</span>
<span class="hljs-keyword">let</span> dragTrans = {x = <span class="hljs-number">0</span>,y = <span class="hljs-number">0</span>};

<span class="hljs-comment">// 累加上 mtouch 所传递出的增量 deltaX 与 deltaY;</span>
dragTrans.x += ev.delta.deltaX;
dragTrans.y += ev.delta.deltaY;

<span class="hljs-comment">// 通过 transform 直接操作元素；</span>
set($drag,dragTrans);</code></pre>
<h3 id="articleHeader18">初始位置</h3>
<p>维护外部的这个位置数据，如果初始值像上述那样直接取0，则遇到使用css设置了<code>transform</code>属性的元素便无法正确识别了，会导致操作元素开始时瞬间跳回<code>(0,0)</code>的点，因此我们需要初始去获取一个元素真实的位置值，再进行维护与操作。此时，便需要用到上面我们提到的<code>getComputedStyle</code>方法与<code>matrixTo</code>函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 获取css transform属性，此时得到的是一个矩阵数据；
// transform:matrix(1.41421,1.41421,-1.41421,1.41421,-50,-50);
let style = window.getComputedStyle(el,null);
let cssTrans = style.transform || style.webkitTransform;

// 按规则进行转换，得到：
let initTrans = _.matrixTo(cssTrans);

// {x:-50,y:-50,scale:2,rotate:45};
// 即该元素设置了：transform:translate(-50px,-50px) scale(2) rotate(45deg);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 获取css transform属性，此时得到的是一个矩阵数据；</span>
<span class="hljs-comment">// transform:matrix(1.41421,1.41421,-1.41421,1.41421,-50,-50);</span>
<span class="hljs-keyword">let</span> style = <span class="hljs-built_in">window</span>.getComputedStyle(el,<span class="hljs-literal">null</span>);
<span class="hljs-keyword">let</span> cssTrans = style.transform || style.webkitTransform;

<span class="hljs-comment">// 按规则进行转换，得到：</span>
<span class="hljs-keyword">let</span> initTrans = _.matrixTo(cssTrans);

<span class="hljs-comment">// {x:-50,y:-50,scale:2,rotate:45};</span>
<span class="hljs-comment">// 即该元素设置了：transform:translate(-50px,-50px) scale(2) rotate(45deg);</span>
</code></pre>
<h2 id="articleHeader19">结语</h2>
<p>至此，相信大家对手势的原理已经有基础的了解，基于这些原理，我们可以再封装出更多的手势，例如双击，长按，扫动，甚至更酷炫的三指、四指操作等，让应用拥有更多人性化的特质。</p>
<p>基于以上原理，我封装了几个常见的工具：（求star -.-）</p>
<blockquote><p>Tips: 因为只针对移动端，需在移动设备中打开<code>demo</code>，或者pc端开启mobile调试模式！</p></blockquote>
<ol>
<li><p>mtouch.js : 移动端的手势库，封装了上述的五种手势，精简的api设计，涵盖了常见的手势交互，基于此也可以很方便的进行扩展。<br><strong><a href="http://f2er.meitu.com/gxd/mtouch/example/index.html" rel="nofollow noreferrer" target="_blank">demo</a><br><a href="https://github.com/xd-tayde/mtouch" rel="nofollow noreferrer" target="_blank">github</a></strong></p></li>
<li><p>touchkit.js : 基于<code>mtouch</code>所封装的一层更贴近业务的工具包，可用于制作多种手势操作业务，一键开启，一站式服务。<br><strong><a href="http://f2er.meitu.com/gxd/touchkit/example/index.html" rel="nofollow noreferrer" target="_blank">demo</a></strong><br><strong><a href="https://github.com/xd-tayde/touchkit" rel="nofollow noreferrer" target="_blank">github</a></strong></p></li>
<li><p>mcanvas.js : 基于canvas 开放极简的api实现图片&lt;段落文字&gt; &lt;混排文字&gt; &lt;裁剪&gt; &lt;平移&gt; &lt;旋转&gt; &lt;缩放&gt; &lt;水印添加&gt; 一键导出等。<br><strong><a href="http://f2er.meitu.com/gxd/mcanvas/example/index.html" rel="nofollow noreferrer" target="_blank">demo</a></strong> <br><strong><a href="https://github.com/xd-tayde/mcanvas" rel="nofollow noreferrer" target="_blank">github</a></strong></p></li>
</ol>
<h2 id="articleHeader20">致谢</h2>
<ul>
<li><p>张鑫旭： <a href="http://www.zhangxinxu.com/wordpress/2012/05/getcomputedstyle-js-getpropertyvalue-currentstyle/" rel="nofollow noreferrer" target="_blank">获取元素CSS值之getComputedStyle方法熟悉</a></p></li>
<li><p>张鑫旭：<a href="http://www.zhangxinxu.com/wordpress/2012/06/css3-transform-matrix-%E7%9F%A9%E9%98%B5/" rel="nofollow noreferrer" target="_blank">理解CSS3 transform中的Matrix(矩阵)</a></p></li>
<li><p>AlloyTeam团队的<code>AlloyFinger</code></p></li>
<li><p>hcysunyangd： <a href="https://juejin.im/post/5916851444d904006c5538f8" rel="nofollow noreferrer" target="_blank">从矩阵与空间操作的关系理解CSS3的transform</a></p></li>
<li><p><a href="http://www.360doc.com/content/14/1112/00/202378_424428214.shtml" rel="nofollow noreferrer" target="_blank">线性代数的理解 学完再看觉得自己弱爆了</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
HTML5中手势原理分析与数学知识的实践

## 原文链接
[https://segmentfault.com/a/1190000010511484](https://segmentfault.com/a/1190000010511484)

