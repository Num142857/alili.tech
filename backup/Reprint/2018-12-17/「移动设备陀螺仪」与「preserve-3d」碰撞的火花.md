---
title: '「移动设备陀螺仪」与「preserve-3d」碰撞的火花' 
date: 2018-12-17 2:30:07
hidden: true
slug: 0e1n25wybzra
categories: [reprint]
---

{{< raw >}}

                    
<p>原文链接：<a href="https://github.com/hangyangws/article/blob/master/src/3d-orientation.md#%E7%A7%BB%E5%8A%A8%E8%AE%BE%E5%A4%87%E9%99%80%E8%9E%BA%E4%BB%AA%E4%B8%8Epreserve-3d%E7%A2%B0%E6%92%9E%E7%9A%84%E7%81%AB%E8%8A%B1" rel="nofollow noreferrer" target="_blank">航洋无声 - github</a></p>
<h1 id="articleHeader0">「移动设备陀螺仪」与「preserve-3d」碰撞的火花</h1>
<blockquote>涉及知识「CSS：transform、JS：deviceorientation」</blockquote>
<p>废话不多，先上 <a href="http://hangyangws.win/demos/src/device_orientation/cube" rel="nofollow noreferrer" target="_blank">DEMO</a>「请使用移动设备查看」</p>
<h3 id="articleHeader1">如何搭建一个简单的立方体</h3>
<p>只需要寥寥几行 HTML、CSS 代码就能产出一个「立方体」</p>
<ul><li>核心 HTML 如下</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;cube&quot;>
  <span class=&quot;cube-face cube-front&quot;></span>
  <span class=&quot;cube-face cube-back&quot;></span>
  <span class=&quot;cube-face cube-left&quot;></span>
  <span class=&quot;cube-face cube-right&quot;></span>
  <span class=&quot;cube-face cube-top&quot;></span>
  <span class=&quot;cube-face cube-bottom&quot;></span>
</div>

<!-- 6 个 <span /> 表示立方体的 6 个面 -->
<!--
 这里有个小插曲：
 起初，我使用的 6 个 <i /> 标签，因为大部分表示「图形、图标」的元素都用 <i /> 标签，
 不过，强迫症的我，细细想来，<i /> 是表示的「斜体文字」，语义上完全不匹配啊。
 所以，我在知乎上搜到这样一个描述：[为什么大家都用i标签<i></i>用作小图标?](https://www.zhihu.com/question/26880548)
 有个回答：
 「
   大家都遵循开放的标准来做事，未来可能少走弯路。
   少用 hack 的方法解决问题，有助于你写出向未来兼容的代码。
  」
  我很赞同，所以就把 <i /> 改成了 <span />。
 -->" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cube"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cube-face cube-front"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cube-face cube-back"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cube-face cube-left"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cube-face cube-right"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cube-face cube-top"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"cube-face cube-bottom"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- 6 个 &lt;span /&gt; 表示立方体的 6 个面 --&gt;</span>
<span class="hljs-comment">&lt;!--
 这里有个小插曲：
 起初，我使用的 6 个 &lt;i /&gt; 标签，因为大部分表示「图形、图标」的元素都用 &lt;i /&gt; 标签，
 不过，强迫症的我，细细想来，&lt;i /&gt; 是表示的「斜体文字」，语义上完全不匹配啊。
 所以，我在知乎上搜到这样一个描述：[为什么大家都用i标签&lt;i&gt;&lt;/i&gt;用作小图标?](https://www.zhihu.com/question/26880548)
 有个回答：
 「
   大家都遵循开放的标准来做事，未来可能少走弯路。
   少用 hack 的方法解决问题，有助于你写出向未来兼容的代码。
  」
  我很赞同，所以就把 &lt;i /&gt; 改成了 &lt;span /&gt;。
 --&gt;</span></code></pre>
<ul><li>CSS 第一步</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".cube {
  width: 160px;
  height: 160px;
  position: relative;
  -webkit-transform-style: preserve-3d; /* 这一句重点 */
  transform-style: preserve-3d;
  -webkit-transform: rotateX(10deg) rotateY(10deg) rotateZ(10deg);
  transform: rotateX(10deg) rotateY(10deg) rotateZ(10deg);
}
.cube-face {
  display: block;
  position: absolute;
  width: 100%;
  height: 100%;
  box-shadow: inset 0 0 4px 1px #fff;
  box-sizing: border-box;
  background: -webkit-linear-gradient(45deg, rgba(156, 144, 144, .6), #000);
  background: -o-linear-gradient(45deg, rgba(156, 144, 144, .6), #000);
  background: linear-gradient(45deg, rgba(156, 144, 144, .6), #000)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.cube</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">160px</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">160px</span>;
  <span class="hljs-attribute">position</span>: relative;
  <span class="hljs-attribute">-webkit-transform-style</span>: preserve-<span class="hljs-number">3</span>d; <span class="hljs-comment">/* 这一句重点 */</span>
  <span class="hljs-attribute">transform-style</span>: preserve-<span class="hljs-number">3</span>d;
  <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">rotateX</span>(10deg) <span class="hljs-built_in">rotateY</span>(10deg) <span class="hljs-built_in">rotateZ</span>(10deg);
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateX</span>(10deg) <span class="hljs-built_in">rotateY</span>(10deg) <span class="hljs-built_in">rotateZ</span>(10deg);
}
<span class="hljs-selector-class">.cube-face</span> {
  <span class="hljs-attribute">display</span>: block;
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">box-shadow</span>: inset <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">4px</span> <span class="hljs-number">1px</span> <span class="hljs-number">#fff</span>;
  <span class="hljs-attribute">box-sizing</span>: border-box;
  <span class="hljs-attribute">background</span>: <span class="hljs-built_in">-webkit-linear-gradient</span>(45deg, rgba(156, 144, 144, .6), <span class="hljs-number">#000</span>);
  <span class="hljs-attribute">background</span>: <span class="hljs-built_in">-o-linear-gradient</span>(45deg, rgba(156, 144, 144, .6), <span class="hljs-number">#000</span>);
  <span class="hljs-attribute">background</span>: <span class="hljs-built_in">linear-gradient</span>(45deg, rgba(156, 144, 144, .6), <span class="hljs-number">#000</span>)
}</code></pre>
<p>这个 CSS 过于简单，就不赘述与解释。  <br>主要是要设置父元素 <code>.cube</code> 的 <code>transform-style: preserve-3d</code>，  <br>使子元素位于 3D 空间中，不然子元素都是「平面内、扁平化」，达不到 3D 效果。</p>
<p>给所有子元素 <code>.cube-face</code> 设置了透明的渐变色 <code>rgba(156, 144, 144, .6)</code> 背景，  <br>是为了更好的观察到「被遮住的反面」，视觉上更加 <strong>立体</strong></p>
<p>目前效果截图大概是这个样子：</p>
<p><span class="img-wrap"><img data-src="/img/bV2gQj?w=399&amp;h=401" src="https://static.alili.tech/img/bV2gQj?w=399&amp;h=401" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>看起来就像一个正方形，其实是 6 个面全部重叠在一起。</p>
<ul><li>CSS 第二步</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".cube-front {
  -webkit-transform: translateZ(80px);
  transform: translateZ(80px);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.cube-front</span> {
  <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">translateZ</span>(80px);
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateZ</span>(80px);
}</code></pre>
<p>上面 4 行代码使得「正面 <code>.cube-front</code>」向前移动 <code>80px</code>「也就是立方体一半的边长」。  <br>同理我们可以设置「背面 <code>.cube-back</code>」向后移动 <code>80px</code>  <br>效果大概是这样：</p>
<p><span class="img-wrap"><img data-src="/img/bV2gQt?w=401&amp;h=399" src="https://static.alili.tech/img/bV2gQt?w=401&amp;h=399" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ul><li>CSS 第三步</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".cube-left {
  -webkit-transform: rotateY(90deg);
  transform: rotateY(90deg);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.cube-left</span> {
  <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">rotateY</span>(90deg);
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateY</span>(90deg);
}</code></pre>
<p>上面 4 行代码使得「左面 <code>.cube-left</code>」先顺时针旋转「90 度」  <br>大概是这个样子：</p>
<p><span class="img-wrap"><img data-src="/img/bV2gQA?w=401&amp;h=404" src="https://static.alili.tech/img/bV2gQA?w=401&amp;h=404" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>然后再向「左边」移动 <code>80px</code> 就 OK 啦，  <br>注意：左边是 Z 轴负方向。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".cube-left {
  -webkit-transform: rotateY(90deg) translateZ(-80px);
  transform: rotateY(90deg) translateZ(-80px);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.cube-left</span> {
  <span class="hljs-attribute">-webkit-transform</span>: <span class="hljs-built_in">rotateY</span>(90deg) <span class="hljs-built_in">translateZ</span>(-80px);
  <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">rotateY</span>(90deg) <span class="hljs-built_in">translateZ</span>(-80px);
}</code></pre>
<p>大概是这个样子：</p>
<p><span class="img-wrap"><img data-src="/img/bV2gQB?w=401&amp;h=402" src="https://static.alili.tech/img/bV2gQB?w=401&amp;h=402" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>同理，我们可以做出右边的效果，唯一区别就是，右边移动方向与左边相反。  <br>道理类似，异曲同工，上边和下边，想必聪明的大家都掌握了正确写法姿势。</p>
<p>成品大概是这个样子：</p>
<p><span class="img-wrap"><img data-src="/img/bV2gQC?w=400&amp;h=401" src="https://static.alili.tech/img/bV2gQC?w=400&amp;h=401" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader2">用陀螺仪使立方体动起来</h3>
<p>细心的开发者应该发现了，在最开始，我给父元素 <code>.cube</code> 设置了：  <br><code>transform: rotateX(10deg) rotateY(10deg) rotateZ(10deg)</code>  <br>认让父元素在三维空间上旋转 10 度。  <br>如果我们动态连续修改这三个值，绝对可以达到 3D 旋转动画的效果。</p>
<p>这个时候，JS 的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Detecting_device_orientation#%E5%A4%84%E7%90%86%E6%96%B9%E5%90%91%EF%BC%88orientation%EF%BC%89%E4%BA%8B%E4%BB%B6" rel="nofollow noreferrer" target="_blank">deviceorientation「检测设备方向」</a> 事件闪现突然闪现在我的脑海。  <br>因为这个事件的回调参数里面恰好有三个参数「beta、gamma、alpha」，分别代表「X、Y、Z」的旋转方向。</p>
<p><strong>beta</strong> 表示设备在 x 轴上的旋转角度，范围为 <code>[-180, 180]</code> 度。它描述的是设备由前向后旋转的情况。  <br><strong>gamma</strong> 表示设备在 y 轴上的旋转角度，范围为 <code>[-90, 90]</code> 度。它描述的是设备由左向右旋转的情况。  <br><strong>alpha</strong> 表示设备沿 z 轴上的旋转角度，范围为 <code>[0, 360]</code> 度。  </p>
<p>大概是这个样子：</p>
<p><span class="img-wrap"><img data-src="/img/bV2gQD?w=399&amp;h=401" src="https://static.alili.tech/img/bV2gQD?w=399&amp;h=401" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<ul><li>注册 deviceorientation 事件，得到 x、y、z</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const handleOrientation = ({beta: x, gamma: y, alpha: z}) => {
  // 1. 得到 x、y、z
  // 2. 处理 x、y、z
  // 3. 使用 x、y、z
}

global.addEventListener('deviceorientation', handleOrientation)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> handleOrientation = <span class="hljs-function">(<span class="hljs-params">{beta: x, gamma: y, alpha: z}</span>) =&gt;</span> {
  <span class="hljs-comment">// 1. 得到 x、y、z</span>
  <span class="hljs-comment">// 2. 处理 x、y、z</span>
  <span class="hljs-comment">// 3. 使用 x、y、z</span>
}

global.addEventListener(<span class="hljs-string">'deviceorientation'</span>, handleOrientation)</code></pre>
<ul><li>处理 x、y、z</li></ul>
<p>由于我们期望立方体可以在 x、y、z 三个反向的旋转范围是 <code>[-360, 360]</code> 度，  <br>但是 beta、gamma、alpha 的范围并不是我们期望的范围，所以我们要处理一下数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  x: x * 2,
  y: y * 4,
  z: (z - 180) * 2
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-attr">x</span>: x * <span class="hljs-number">2</span>,
  <span class="hljs-attr">y</span>: y * <span class="hljs-number">4</span>,
  <span class="hljs-attr">z</span>: (z - <span class="hljs-number">180</span>) * <span class="hljs-number">2</span>
}</code></pre>
<ul><li>使用 x、y、z</li></ul>
<p>我们现在得到的 x、y、z 已经在 <code>[-360, 360]</code> 度范围内了，  <br>接下来要做的就是，使用 x、y、z 修改父元素 <code>.cube</code> 的 <code>rotateX(xdeg) rotateY(ydeg) rotateZ(zdeg)</code> 旋转值。</p>
<p>完整的代码大概是这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const cube = document.querySelector('.cube')
const setCubePosition = ({x = 0, y = 0, z = 0}) => {
  cube.style = `transform: rotateX(${x}deg) rotateY(${y}deg) rotateZ(${x}deg);-webkit-transform: rotateX(${x}deg) rotateY(${y}deg) rotateZ(${x}deg);`
}
const handleOrientation = ({beta: x, gamma: y, alpha: z}) => {
  setCubePosition({
    x: x * 2,
    y: y * 4,
    z: (z - 180) * 2
  })
}

global.addEventListener('deviceorientation', handleOrientation)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> cube = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'.cube'</span>)
<span class="hljs-keyword">const</span> setCubePosition = <span class="hljs-function">(<span class="hljs-params">{x = <span class="hljs-number">0</span>, y = <span class="hljs-number">0</span>, z = <span class="hljs-number">0</span>}</span>) =&gt;</span> {
  cube.style = <span class="hljs-string">`transform: rotateX(<span class="hljs-subst">${x}</span>deg) rotateY(<span class="hljs-subst">${y}</span>deg) rotateZ(<span class="hljs-subst">${x}</span>deg);-webkit-transform: rotateX(<span class="hljs-subst">${x}</span>deg) rotateY(<span class="hljs-subst">${y}</span>deg) rotateZ(<span class="hljs-subst">${x}</span>deg);`</span>
}
<span class="hljs-keyword">const</span> handleOrientation = <span class="hljs-function">(<span class="hljs-params">{beta: x, gamma: y, alpha: z}</span>) =&gt;</span> {
  setCubePosition({
    <span class="hljs-attr">x</span>: x * <span class="hljs-number">2</span>,
    <span class="hljs-attr">y</span>: y * <span class="hljs-number">4</span>,
    <span class="hljs-attr">z</span>: (z - <span class="hljs-number">180</span>) * <span class="hljs-number">2</span>
  })
}

global.addEventListener(<span class="hljs-string">'deviceorientation'</span>, handleOrientation)</code></pre>
<h3 id="articleHeader3">庆祝时刻</h3>
<p>现在我们已经完成了，一个利用「移动设备陀螺仪」与「preserve-3d」实现的 3D 交互效果。  <br>让我们为自己鼓掌  <br> ???</p>
<p><a href="https://github.com/hangyangws/demos/blob/master/src/device_orientation/cube.html" rel="nofollow noreferrer" target="_blank">点我查看完整代码</a></p>
<hr>
<p>感谢阅读</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
「移动设备陀螺仪」与「preserve-3d」碰撞的火花

## 原文链接
[https://segmentfault.com/a/1190000012895374](https://segmentfault.com/a/1190000012895374)

