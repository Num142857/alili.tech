---
title: 'SVG 扬帆起航' 
date: 2018-12-24 2:30:07
hidden: true
slug: 7gonh1lnf2b
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>原文链接：<a href="https://github.com/hangyangws/article/blob/master/src/svg.md" rel="nofollow noreferrer" target="_blank">https://github.com/hangyangws...</a><br>本文不能让你成为 SVG 大神，但是能让你知道、了解他「揭开神秘面纱」</p></blockquote>
<h2 id="articleHeader0">基础认知</h2>
<p>SVG「Scalable Vector Graphics」表示「可缩放矢量图形『放大不模糊』」面向未来「W3C 标准」。  <br>基本的 SVG 文档由 <code>&lt;svg&gt;</code> 根元素和 <a href="https://developer.mozilla.org/en-US/docs/Web/SVG/Element" rel="nofollow noreferrer" target="_blank">基本形状元素</a> 构成  <br>作为 XML 的一种方言，SVG 必须正确的绑定命名空间（在 xmlns 属性中绑定）。<a href="https://developer.mozilla.org/zh-CN/docs/Web/SVG/Namespaces_Crash_Course" rel="nofollow noreferrer" target="_blank">命名空间速成</a> 获取更多信息  <br>SVG 文件全局有效的规则是 「后来居上」，越后面的元素越可见。</p>
<h3 id="articleHeader1">能做什么</h3>
<p>动画、图形、渐变、旋转、滤镜、JavaScript 接口、各种超酷的动画…</p>
<h3 id="articleHeader2">和 HTML 使用的几种方式</h3>
<p><strong><code>&lt;img src="xxx.svg" height="10" width="10" /&gt;</code></strong>  <br>不能使用JS来控制</p>
<p><strong><code>.svg { background-image: url(xxx.svg);}</code></strong>  <br>最好不使用 base64 格式化 SVG「阻塞其它资源」、不能使用 JS 控制</p>
<p><strong><code>&lt;iframe src="xxx.svg"&gt;Not support iframe&lt;/iframe&gt;</code></strong></p>
<p><strong><code>&lt;embed type="image/svg+xml" src="xxx.svg" /&gt;</code></strong></p>
<p><strong><code>&lt;object type="image/svg+xml" data="xxx.svg"&gt;Not support SVG&lt;/object&gt;</code></strong>  <br>能使用JS来控制「推荐方式」</p>
<p><strong><code>&lt;svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 10"&gt;…&lt;/svg&gt;</code></strong>  <br>节省 HTTP 请求，能使用 JS 控制，不能被浏览器缓存</p>
<h3 id="articleHeader3">坐标系统</h3>
<p>看图说话「原点在左上角」：<br><span class="img-wrap"><img data-src="/img/bVDcVo?w=220&amp;h=220" src="https://static.alili.tech/img/bVDcVo?w=220&amp;h=220" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">viewBox</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<svg width=&quot;400&quot; height=&quot;300&quot; viewBox=&quot;0,0,40,30&quot; style=&quot;border:1px solid #cd0000;&quot;>
  <rect x=&quot;10&quot; y=&quot;5&quot; width=&quot;20&quot; height=&quot;15&quot; fill=&quot;#cd0000&quot;/>
</svg>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"400"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"300"</span> <span class="hljs-attr">viewBox</span>=<span class="hljs-string">"0,0,40,30"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"border:1px solid #cd0000;"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">rect</span> <span class="hljs-attr">x</span>=<span class="hljs-string">"10"</span> <span class="hljs-attr">y</span>=<span class="hljs-string">"5"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"20"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"15"</span> <span class="hljs-attr">fill</span>=<span class="hljs-string">"#cd0000"</span>/&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span></code></pre>
<p><a href="https://jsfiddle.net/hangyangws/ectdkt4u/1/" rel="nofollow noreferrer" target="_blank">viewBox demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="hangyangws/ectdkt4u/1/" data-typeid="0">点击预览</button></p>
<p>动画理解：  <br><span class="img-wrap"><img data-src="/img/bVY8yV?w=410&amp;h=315" src="https://static.alili.tech/img/bVY8yV?w=410&amp;h=315" alt="图片描述" title="图片描述" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/bVY8y5?w=403&amp;h=320" src="https://static.alili.tech/img/bVY8y5?w=403&amp;h=320" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><a href="http://www.zhangxinxu.com/wordpress/2014/08/svg-viewport-viewbox-preserveaspectratio/" rel="nofollow noreferrer" target="_blank">深度阅读 - viewBox</a></p>
<h2 id="articleHeader5">CSS、JS 与 SVG</h2>
<h3 id="articleHeader6">内敛样式</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 68 65&quot;>
  <style type=&quot;text/css&quot;>
    <![CDATA[
    .red { strock: #f00; }
    ]]>
  </style>
  <path class=&quot;red&quot; d=&quot;M10 10v20&quot; />
</svg>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">xmlns</span>=<span class="hljs-string">"http://www.w3.org/2000/svg"</span> <span class="hljs-attr">viewBox</span>=<span class="hljs-string">"0 0 68 65"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span>&gt;</span><span class="xml">
    &lt;![CDATA[
    .red { strock: #f00; }
    ]]&gt;
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">path</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"red"</span> <span class="hljs-attr">d</span>=<span class="hljs-string">"M10 10v20"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span></code></pre>
<h3 id="articleHeader7">外链样式</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<?xml-stylesheet type=&quot;text/css&quot; href=&quot;xxx.css&quot;?>
<svg xmlns=&quot;http://www.w3.org/2000/svg&quot; viewBox=&quot;0 0 68 65&quot;>
  <path class=&quot;cls&quot; d=&quot;M42 27v-20&quot; />
</svg>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="php"><span class="hljs-meta">&lt;?</span>xml-stylesheet type=<span class="hljs-string">"text/css"</span> href=<span class="hljs-string">"xxx.css"</span><span class="hljs-meta">?&gt;</span></span>
<span class="hljs-tag">&lt;<span class="hljs-name">svg</span> <span class="hljs-attr">xmlns</span>=<span class="hljs-string">"http://www.w3.org/2000/svg"</span> <span class="hljs-attr">viewBox</span>=<span class="hljs-string">"0 0 68 65"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">path</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cls"</span> <span class="hljs-attr">d</span>=<span class="hljs-string">"M42 27v-20"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span></code></pre>
<h3 id="articleHeader8">JS 操作 SVG</h3>
<p>如果 SVG 代码作为 DOM 在 HTML 内部，可以向平常一样操作 DOM 操作 SVG  <br>如果是使用 <code>&lt;object&gt;</code> 你可以使用 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLIFrameElement/contentDocument" rel="nofollow noreferrer" target="_blank">contentDocument</a> 来控制它 SVG</p>
<p><strong>注意</strong></p>
<ol>
<li>
<code>&lt;img&gt;</code>、<code>background-image</code> 形式的 SVG 不支持「外链 CSS、JS」</li>
<li>内敛 CSS 和 JS 最好放在 <code>&lt;![CDATA[</code> 与 <code>]]&gt;</code> 之中</li>
</ol>
<h2 id="articleHeader9">SVG 基础元素</h2>
<ul>
<li>
<code>&lt;svg&gt;</code>：SVG 的根元素，可以相互嵌套</li>
<li>
<code>&lt;g&gt;</code>：将 SVG 中的元素进行分组操作，分组后可以看成一个单独的形状，统一转换</li>
<li>
<code>&lt;defs&gt;</code>：用于定义在 SVG 中可重用的元素，def 元素不会直接展示出来，可以通过 use 元素来引用</li>
<li>
<code>&lt;use&gt;</code>：通过它来复用 def 元素，也包括 <code>&lt;g&gt;、&lt;symbol&gt;</code> 元素，使用 <code>&lt;use xlink:href="#id"/&gt;</code> 调用</li>
<li>
<code>&lt;text&gt;</code>：文本节点，可以实现 word 中的那种「艺术字」</li>
<li>
<code>&lt;image&gt;</code>：在 SVG 中嵌套图片，可以对图片做对应的处理</li>
<li>…</li>
</ul>
<h2 id="articleHeader10">SVG 形状元素</h2>
<p>来张图压压惊：  <br><span class="img-wrap"><img data-src="/img/bVY8zi?w=720&amp;h=843" src="https://static.alili.tech/img/bVY8zi?w=720&amp;h=843" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><a href="https://jsfiddle.net/hangyangws/gc8m0nen/1/" rel="nofollow noreferrer" target="_blank">点我查看 SVG 元素的基本 DEMO</a><button class="btn btn-xs btn-default ml10 preview" data-url="hangyangws/gc8m0nen/1/" data-typeid="0">点击预览</button></p>
<h3 id="articleHeader11"><code>&lt;path /&gt;</code></h3>
<p>别说话，先举个 ? ，一起感受一下 path：<a href="https://jsfiddle.net/hangyangws/ek7s4v1d/5/" rel="nofollow noreferrer" target="_blank">点我</a><button class="btn btn-xs btn-default ml10 preview" data-url="hangyangws/ek7s4v1d/5/" data-typeid="0">点击预览</button></p>
<blockquote><p>基于 path 的不同属性，可以画出各种各样的路径，所以 path 可算是 SVG 的「节点之王」  <br>除了 path 之外的节点都「比较普通」，可以看成是对 path 的封装，比如「Rect、Circle…」</p></blockquote>
<p><strong>命令</strong>  <br>命令都用一个关键字母来表示，命令 <strong>都有两种</strong> 表示方式</p>
<ol>
<li>大写字母，表示采用「绝对定位」</li>
<li>小写字母，表示采用「相对定位『相对于上一个点』」</li>
</ol>
<h4>path 的命令列表</h4>
<blockquote><p><code>document.getElementById(‘path’).getTotalLength()</code> 得到路径长度</p></blockquote>
<ul>
<li>M：moveto 移动到</li>
<li>L：lineto 画线到；H：horizontal lineto 水平线到；V：vertical lineto 垂直线到</li>
</ul>
<ol><li>命令将会在当前位置和新位置之间画一条线段：L x y (or l dx dy)</li></ol>
<p>还有两个简写命令：H，绘制平行线。V，绘制垂直线。这两个命令都只带一个参数，标明在 x 或 y 轴移动到的位置：<code>H x (or h dx)</code> 、<code>V y (or v dy)</code></p>
<ul><li>Z：closepath 关闭路径</li></ul>
<ol><li>命令会从当前点画一条直线到路径的起点，所以它还是经常被放到路径的最后。另外，Z 命令不用区分大小写：Z (or z)</li></ol>
<ul><li>C：curveto 三次贝塞尔曲线</li></ul>
<p><code>C x1 y1, x2 y2, x y</code> 或 <code>c dx1 dy1, dx2 dy2, dx dy</code>  <br>(x1, y1)、(x2, y2) 分别是起点、终点控制点。最后一个坐标 (x, y)，表示曲线的终点  <br>三次贝塞尔曲线 <strong>表现形式</strong> 是：曲线沿着 <strong>起点开始</strong> 到第一控制点的方向伸出，逐渐弯曲，然后沿着第二控制点到 <strong>终点的方向结束</strong></p>
<ul><li>S：smooth curveto 光滑三次贝塞尔曲线</li></ul>
<ol><li>命令可以用来创建与之前那些曲线一样的贝塞尔曲线，通常和 C 命令一起使用</li></ol>
<p>如果 S 命令跟在一个 C 命令或者另一个 S 命令的后面，它的第一个控制点，就会被假设成前一个控制点的对称点，不应该写出来，所以 S 省略了一个对称点</p>
<ul><li>Q：quadratic Belzier curve 二次贝塞尔曲线</li></ul>
<p><code>Q x1 y1, x y</code> 或 <code>q dx1 dy1, dx dy</code></p>
<ul><li>T：smooth quadratic Belzier curveto 光滑二次贝塞尔曲线</li></ul>
<p><code>T x y</code> 或 <code>t dx dy</code></p>
<ol><li>命令类似于 S 命令，用于二次贝塞尔曲线。T 命令前面最好是一个 Q 命令，或者是另一个 T 命令</li></ol>
<p>如果 T 单独使用，那么控制点就会被认为和终点是同一个点，所以画出来的将是一条直线</p>
<ul><li>A：elliptical Arc 椭圆弧</li></ul>
<p><code>A rx ry x-axis-rotation large-arc-flag sweep-flag x y</code> 或 <code>a rx ry x-axis-rotation large-arc-flag sweep-flag dx dy</code></p>
<p>rx ry：「椭圆」的 x，y半径  <br>x-axis-rotation：X 轴旋转角度，顺时针为正数  <br>large-arc-flag：1 表示用大弧度，0 表示小弧度  <br>sweep-flag：弧度回话方向，1 顺时针，0 逆时针</p>
<ol><li>y：弧度终点</li></ol>
<h2 id="articleHeader12">元素与样式</h2>
<ul>
<li>stroke</li>
<li>fill</li>
<li>transform</li>
<li>linearGradient</li>
<li>mask</li>
<li>filter</li>
<li>clipPath</li>
</ul>
<p>一些 Demo：  <br><a href="https://jsfiddle.net/hangyangws/48uprrq5/" rel="nofollow noreferrer" target="_blank">svg 模糊 demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="hangyangws/48uprrq5/" data-typeid="0">点击预览</button>  <br><a href="https://jsfiddle.net/hangyangws/0odr1kky/" rel="nofollow noreferrer" target="_blank">symbol demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="hangyangws/0odr1kky/" data-typeid="0">点击预览</button>  <br><a href="https://jsfiddle.net/hangyangws/6L15hotf/" rel="nofollow noreferrer" target="_blank">symbol-use-demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="hangyangws/6L15hotf/" data-typeid="0">点击预览</button>  <br><a href="https://jsfiddle.net/hangyangws/1puLynrs/" rel="nofollow noreferrer" target="_blank">text mask demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="hangyangws/1puLynrs/" data-typeid="0">点击预览</button>  <br><a href="https://jsfiddle.net/hangyangws/60q9srrd/" rel="nofollow noreferrer" target="_blank">mask demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="hangyangws/60q9srrd/" data-typeid="0">点击预览</button>  <br><a href="https://jsfiddle.net/hangyangws/Lh09hkpb/" rel="nofollow noreferrer" target="_blank">clip demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="hangyangws/Lh09hkpb/" data-typeid="0">点击预览</button>  <br><a href="https://jsfiddle.net/hangyangws/dwvgwnc2/" rel="nofollow noreferrer" target="_blank">SVG 文字路径动画</a><button class="btn btn-xs btn-default ml10 preview" data-url="hangyangws/dwvgwnc2/" data-typeid="0">点击预览</button>  <br><a href="https://jsfiddle.net/hangyangws/yhxxdp6o/" rel="nofollow noreferrer" target="_blank">linearGradient Demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="hangyangws/yhxxdp6o/" data-typeid="0">点击预览</button></p>
<p><strong>使用 CSS 请注意</strong>  <br>把 background-color、border 改成 fill 和 stroke  <br>上色和填充的部分一般是可以用 CSS 来设置的，比如 fill，stroke，stroke-dasharray，但不包括渐变和图案等。  <br>另外，width、height，以及路径的命令等等，都不能用 css 设置  <br><em>不是所有的属性都能用 CSS 来设置</em>：<a href="https://www.w3.org/TR/SVG/propidx.html" rel="nofollow noreferrer" target="_blank">SVG 规范</a> 将属性区分成 properties 和 attributes，前者是可以用 CSS 设置的，后者不能</p>
<h2 id="articleHeader13">SVG 动画</h2>
<blockquote><p><a href="http://svgtrick.com/" rel="nofollow noreferrer" target="_blank">SVG 动画 集合</a>  <br>SVG 的动画元素是和 SMIL <a href="https://www.w3.org/TR/REC-smil/" rel="nofollow noreferrer" target="_blank">Synchronized Multimedia Integration Language</a>开发组合作开发的。  <br>SMIL 开发组和 SVG 开发组合作开发了 SMIL 动画规范，在规范中制定了一个基本的 XML 动画特征集合。  <br>SVG 吸收了 SMIL 动画规范当中的动画优点，并提供了一些SVG继承实现。</p></blockquote>
<p>大概三种实现方式：</p>
<ul>
<li>JS 动画「DOM 操作『忽视它』」</li>
<li>CSS3 动画「animation、transition『不是 svg 的重点』」</li>
<li>SVG 本身的动画「基于 SMIL」「主要借助 SVG <code>animate</code> 相关标签」</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVY8zu?w=720&amp;h=623" src="https://static.alili.tech/img/bVY8zu?w=720&amp;h=623" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader14">set</h3>
<p>set 表示此元素没有动画效果 ???。  <br>好吧：这样的，虽然 set 虽然不能触发连续的动画，但是，其还是可以实现基本的延迟功能。  <br>就是指：可以在特定时间之后修改某个属性值「也可以是 CSS 属性值」。</p>
<p><a href="https://jsfiddle.net/hangyangws/d6m1oyng/1/" rel="nofollow noreferrer" target="_blank">一个 Demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="hangyangws/d6m1oyng/1/" data-typeid="0">点击预览</button></p>
<h3 id="articleHeader15">animate</h3>
<p>SVG animation 最强大的地方在于：「只要在页面放几个 animate 元素，没有任何 CSS, 没有任何JS」</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<animate
  id=&quot;id&quot;
  begin=&quot;id.end + 1s&quot;
  attributeName=&quot;r&quot;
  attributeType=&quot;XML&quot;
  from=&quot;50&quot;
  to=&quot;80&quot;
  by=&quot;30&quot;
  values=&quot;50;80&quot;
  begin=&quot;0s&quot;
  dur=&quot;.5s&quot;
  repeatCount=&quot;indefinite&quot;
  fill=&quot;freeze&quot;>
</animate>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">animate</span>
  <span class="hljs-attr">id</span>=<span class="hljs-string">"id"</span>
  <span class="hljs-attr">begin</span>=<span class="hljs-string">"id.end + 1s"</span>
  <span class="hljs-attr">attributeName</span>=<span class="hljs-string">"r"</span>
  <span class="hljs-attr">attributeType</span>=<span class="hljs-string">"XML"</span>
  <span class="hljs-attr">from</span>=<span class="hljs-string">"50"</span>
  <span class="hljs-attr">to</span>=<span class="hljs-string">"80"</span>
  <span class="hljs-attr">by</span>=<span class="hljs-string">"30"</span>
  <span class="hljs-attr">values</span>=<span class="hljs-string">"50;80"</span>
  <span class="hljs-attr">begin</span>=<span class="hljs-string">"0s"</span>
  <span class="hljs-attr">dur</span>=<span class="hljs-string">".5s"</span>
  <span class="hljs-attr">repeatCount</span>=<span class="hljs-string">"indefinite"</span>
  <span class="hljs-attr">fill</span>=<span class="hljs-string">"freeze"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">animate</span>&gt;</span></code></pre>
<p><a href="https://jsfiddle.net/hangyangws/vk3j2pk1/1/" rel="nofollow noreferrer" target="_blank">一个 Demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="hangyangws/vk3j2pk1/1/" data-typeid="0">点击预览</button></p>
<h3 id="articleHeader16">animateColor</h3>
<p>一看就知道是颜色动画。不过，animate 可以实现其功能与效果，因此，此属性已经被废弃。  <br>可谓因为兄弟相争而年少陨落的天王。逝者已矣，过去的就让它过去吧 ~~~</p>
<h3 id="articleHeader17">animateTransform</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<animateTransform
  attributeName=&quot;transform&quot;
  attributeType=&quot;XML&quot;
  type=&quot;rotate&quot;
  from=&quot;0 125 135&quot;
  to=&quot;360 125 135&quot;
  begin=&quot;0s&quot;
  dur=&quot;10s&quot;
  repeatCount=&quot;indefinite&quot;>
</animateTransform>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">animateTransform</span>
  <span class="hljs-attr">attributeName</span>=<span class="hljs-string">"transform"</span>
  <span class="hljs-attr">attributeType</span>=<span class="hljs-string">"XML"</span>
  <span class="hljs-attr">type</span>=<span class="hljs-string">"rotate"</span>
  <span class="hljs-attr">from</span>=<span class="hljs-string">"0 125 135"</span>
  <span class="hljs-attr">to</span>=<span class="hljs-string">"360 125 135"</span>
  <span class="hljs-attr">begin</span>=<span class="hljs-string">"0s"</span>
  <span class="hljs-attr">dur</span>=<span class="hljs-string">"10s"</span>
  <span class="hljs-attr">repeatCount</span>=<span class="hljs-string">"indefinite"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">animateTransform</span>&gt;</span></code></pre>
<p><a href="https://jsfiddle.net/hangyangws/zqLorfo9/1/" rel="nofollow noreferrer" target="_blank">一个 Demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="hangyangws/zqLorfo9/1/" data-typeid="0">点击预览</button></p>
<h3 id="articleHeader18">animateMotion</h3>
<p>animateMotion 元素可以让 SVG 各种图形沿着特定的 path 路径运动 ~~~</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<animateMotion
  dur=&quot;6s&quot;
  repeatCount=&quot;indefinite&quot;
  path=&quot;M100 100, A120 120, -45 0 1, 300 300 A120 120, -45 0 1, 100 100&quot;>
</animateMotion>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">animateMotion</span>
  <span class="hljs-attr">dur</span>=<span class="hljs-string">"6s"</span>
  <span class="hljs-attr">repeatCount</span>=<span class="hljs-string">"indefinite"</span>
  <span class="hljs-attr">path</span>=<span class="hljs-string">"M100 100, A120 120, -45 0 1, 300 300 A120 120, -45 0 1, 100 100"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">animateMotion</span>&gt;</span></code></pre>
<p><a href="https://jsfiddle.net/hangyangws/yxncvsph/1/" rel="nofollow noreferrer" target="_blank">一个 Demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="hangyangws/yxncvsph/1/" data-typeid="0">点击预览</button></p>
<h3 id="articleHeader19">例子分析</h3>
<p>组合：  <br><a href="https://jsfiddle.net/hangyangws/z0zLcm9c/1/" rel="nofollow noreferrer" target="_blank">一个 Demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="hangyangws/z0zLcm9c/1/" data-typeid="0">点击预览</button></p>
<p>end 事件：  <br><a href="https://jsfiddle.net/hangyangws/xxm1wkx4/2/" rel="nofollow noreferrer" target="_blank">一个 Demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="hangyangws/xxm1wkx4/2/" data-typeid="0">点击预览</button></p>
<p>click 事件：  <br><a href="https://jsfiddle.net/hangyangws/Lr8gs5gn/1/" rel="nofollow noreferrer" target="_blank">一个 Demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="hangyangws/Lr8gs5gn/1/" data-typeid="0">点击预览</button></p>
<h2 id="articleHeader20">进阶阅读推荐</h2>
<ul><li><a href="http://www.cnblogs.com/hnfxs/p/3148483.html" rel="nofollow noreferrer" target="_blank">贝塞尔曲线原理「简单阐述」</a></li></ul>
<h2 id="articleHeader21">工具推荐</h2>
<ul><li>svgo</li></ul>
<p>项目地址：<a href="https://github.com/svg/svgo" rel="nofollow noreferrer" target="_blank">点我查看</a>  <br>比较厉害的压缩优化 SVG 的工具，可以将 SVG 中的无用信息删掉，同时支持代码进行压缩</p>
<ul><li>SVGOMG</li></ul>
<p>展示地址：<a href="https://jakearchibald.github.io/svgomg/" rel="nofollow noreferrer" target="_blank">SVGOMG - SVGO's Missing GUI</a>  <br>SVGOMG 是 svgo 的可视化界面工具，操作起来很方便，还提供了一些其他有用的功能</p>
<ul><li>Snap.svg</li></ul>
<p>项目地址：<a href="http://snapsvg.io/" rel="nofollow noreferrer" target="_blank">Snap.svg - Home</a>  <br>Snap.svg 是一个可以使你操纵 SVG 资源和 jQuery 操作 DOM 一样简单的类库，  <br>可以写出更加复杂的 SVG 效果，同时文档超级齐全，推荐给想深入了解的同学。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
SVG 扬帆起航

## 原文链接
[https://segmentfault.com/a/1190000012148693](https://segmentfault.com/a/1190000012148693)

