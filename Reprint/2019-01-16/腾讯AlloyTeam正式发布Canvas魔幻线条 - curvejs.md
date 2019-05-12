---
title: '腾讯AlloyTeam正式发布Canvas魔幻线条 - curvejs' 
date: 2019-01-16 2:30:07
hidden: true
slug: hdn75qekkra
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://github.com/AlloyTeam/curvejs/blob/master/README-CN.md" rel="nofollow noreferrer" target="_blank">【原文链接】</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009170889?w=900&amp;h=500" src="https://static.alili.tech/img/remote/1460000009170889?w=900&amp;h=500" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>﻿&lt;h2&gt;写在前面&lt;/h2&gt;</p>
<p><a href="https://github.com/AlloyTeam/curvejs" rel="nofollow noreferrer" target="_blank">curvejs</a> 中文读["克js"]，是腾讯AlloyTeam打造的一款魔幻线条框架，让线条成为一名优秀的舞者，让线条们成为优秀的舞团，HTML5 Canvas就是舞台。</p>
<p>官网：<a href="https://alloyteam.github.io/curvejs/" rel="nofollow noreferrer" target="_blank">https://alloyteam.github.io/curvejs/</a></p>
<p>你还记得window经典的屏幕保护程序《变幻线》吗？</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009170890?w=408&amp;h=251" src="https://static.alili.tech/img/remote/1460000009170890?w=408&amp;h=251" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>其原理就是使用 Perlin-Noise + Particle System + Bézier Curve + Color Transition 制作而成。</p>
<p>使用curvejs实现类似变幻线功能只需要不到10行代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const  { Stage, Curve, motion } = curvejs

let stage = new Stage(document.getElementById('myCanvas'))

stage.add(new Curve({
    color: '#00FF00',
    data: {value: 0, step: 0.008, width: 600, height: 400},
    motion: motion.noise
}))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span>  { Stage, Curve, motion } = curvejs

<span class="hljs-keyword">let</span> stage = <span class="hljs-keyword">new</span> Stage(<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'myCanvas'</span>))

stage.add(<span class="hljs-keyword">new</span> Curve({
    <span class="hljs-attr">color</span>: <span class="hljs-string">'#00FF00'</span>,
    <span class="hljs-attr">data</span>: {<span class="hljs-attr">value</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">step</span>: <span class="hljs-number">0.008</span>, <span class="hljs-attr">width</span>: <span class="hljs-number">600</span>, <span class="hljs-attr">height</span>: <span class="hljs-number">400</span>},
    <span class="hljs-attr">motion</span>: motion.noise
}))</code></pre>
<p><a href="https://alloyteam.github.io/curvejs/pg/rd.html?type=noise" rel="nofollow noreferrer" target="_blank">【体验地址】</a></p>
<p>当然，curvejs的能力不仅仅是变换线，这完全取决于你的想象力。比如：</p>
<ul>
<li><p><a href="https://alloyteam.github.io/curvejs/pg/rd.html?type=points-to" rel="nofollow noreferrer" target="_blank">Points-To</a></p></li>
<li><p><a href="https://alloyteam.github.io/curvejs/pg/rd.html?type=rotate" rel="nofollow noreferrer" target="_blank">Rotate</a></p></li>
<li><p><a href="https://alloyteam.github.io/curvejs/pg/rd.html?type=word" rel="nofollow noreferrer" target="_blank">Word</a></p></li>
<li><p><a href="https://alloyteam.github.io/curvejs/pg/rd.html?type=noise" rel="nofollow noreferrer" target="_blank">Perlin-Noise</a></p></li>
<li><p><a href="https://alloyteam.github.io/curvejs/pg/rd.html?type=simple" rel="nofollow noreferrer" target="_blank">Simple</a></p></li>
<li><p><a href="https://alloyteam.github.io/curvejs/pg/rd.html?type=simple-es5" rel="nofollow noreferrer" target="_blank">Simple-ES5</a></p></li>
<li><p><a href="https://alloyteam.github.io/curvejs/pg/rd.html?type=curves" rel="nofollow noreferrer" target="_blank">Curves</a></p></li>
<li><p><a href="https://alloyteam.github.io/curvejs/pg/rd.html?type=line" rel="nofollow noreferrer" target="_blank">Line</a></p></li>
<li><p><a href="https://alloyteam.github.io/curvejs/pg/rd.html?type=close" rel="nofollow noreferrer" target="_blank">Close</a></p></li>
</ul>
<h2 id="articleHeader0">使用指南</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install curvejs" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ npm install curvejs</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import curvejs from 'curvejs'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> curvejs <span class="hljs-keyword">from</span> <span class="hljs-string">'curvejs'</span></code></pre>
<p>也可以直接插入script到你的HTML页面:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;https://unpkg.com/curvejs@0.2.0/dist/curve.min.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/curvejs@0.2.0/dist/curve.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>开始跳舞:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Stage = curvejs.Stage,
    Curve = curvejs.Curve,
    canvas = document.getElementById('myCanvas'),
    stage = new Stage(canvas),
    rd = function() {
     return -2 + Math.random() * 2
    }

var curve = new Curve({
  color: '#00FF00',
  points: [277, 327, 230, 314, 236, 326, 257, 326],
  data: [rd(), rd(), rd(), rd(), rd(), rd(), rd(), rd()],
  motion: function motion(points, data) {
      points.forEach(function (item, index) {
          points[index] += data[index]
      })
  }
})

stage.add(curve)

function tick(){
  stage.update()
  requestAnimationFrame(tick)
}

tick()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> Stage = curvejs.Stage,
    Curve = curvejs.Curve,
    canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'myCanvas'</span>),
    stage = <span class="hljs-keyword">new</span> Stage(canvas),
    rd = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
     <span class="hljs-keyword">return</span> <span class="hljs-number">-2</span> + <span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">2</span>
    }

<span class="hljs-keyword">var</span> curve = <span class="hljs-keyword">new</span> Curve({
  <span class="hljs-attr">color</span>: <span class="hljs-string">'#00FF00'</span>,
  <span class="hljs-attr">points</span>: [<span class="hljs-number">277</span>, <span class="hljs-number">327</span>, <span class="hljs-number">230</span>, <span class="hljs-number">314</span>, <span class="hljs-number">236</span>, <span class="hljs-number">326</span>, <span class="hljs-number">257</span>, <span class="hljs-number">326</span>],
  <span class="hljs-attr">data</span>: [rd(), rd(), rd(), rd(), rd(), rd(), rd(), rd()],
  <span class="hljs-attr">motion</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">motion</span>(<span class="hljs-params">points, data</span>) </span>{
      points.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">item, index</span>) </span>{
          points[index] += data[index]
      })
  }
})

stage.add(curve)

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">tick</span>(<span class="hljs-params"></span>)</span>{
  stage.update()
  requestAnimationFrame(tick)
}

tick()</code></pre>
<p>上面的points代表了三次贝塞尔曲线的4个点。motion代表运动方式，motion可以拿去到points和data。motion里函数的this指向Curve是实例curve。</p>
<h2 id="articleHeader1">使用内置motion</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var curve = new Curve({
  points: [277, 327, 230, 314, 236, 326, 257, 326],
  data: {angle: 0, r:5 ,step:Math.PI / 50 }
  motion: curvejs.motion.dance
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> curve = <span class="hljs-keyword">new</span> Curve({
  <span class="hljs-attr">points</span>: [<span class="hljs-number">277</span>, <span class="hljs-number">327</span>, <span class="hljs-number">230</span>, <span class="hljs-number">314</span>, <span class="hljs-number">236</span>, <span class="hljs-number">326</span>, <span class="hljs-number">257</span>, <span class="hljs-number">326</span>],
  <span class="hljs-attr">data</span>: {<span class="hljs-attr">angle</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">r</span>:<span class="hljs-number">5</span> ,<span class="hljs-attr">step</span>:<span class="hljs-built_in">Math</span>.PI / <span class="hljs-number">50</span> }
  motion: curvejs.motion.dance
})</code></pre>
<h2 id="articleHeader2">基本原理</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009170891?w=330&amp;h=226" src="https://static.alili.tech/img/remote/1460000009170891?w=330&amp;h=226" alt="" title="" style="cursor: pointer;"></span></p>
<ul>
<li><p>每次创建Curve 可以传入八个数字，其实就代表上面的4个点的坐标</p></li>
<li><p>motion里可以拿到 points 进行自定义变幻</p></li>
<li><p>幻影不需要开发者考虑，curvejs会自动生成幻影</p></li>
</ul>
<p>这里需要特别强调，curvejs的幻影不是利用canvas的黑色底，然后fillRect填充半透而产生，而是Particle System。所以curvejs制作出的效果不用一定是黑色背景，而且canvas也可以是透明，这就大大增加了适用场景。</p>
<h2 id="articleHeader3">提交你的motion</h2>
<p>在 <a href="https://github.com/AlloyTeam/curvejs/tree/master/src/motion" rel="nofollow noreferrer" target="_blank"> motion 目录</a>, 有许多内置的motion提供给开发者使用，但是你也可以提交你的motion到这个项目，我会第一时间review并合入主干。</p>
<p>基本motion格式规则:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * motion description.
 *
 * @param {points}
 * @param {data}
 *      data rule example:
 *      [1, 0.2, -3, 0.7, 0.5, 0.3, -1, 1]
 */
export default function (points, data) {
    //你的motion逻辑
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * motion description.
 *
 * @param {points}
 * @param {data}
 *      data rule example:
 *      [1, 0.2, -3, 0.7, 0.5, 0.3, -1, 1]
 */</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">points, data</span>) </span>{
    <span class="hljs-comment">//你的motion逻辑</span>
}</code></pre>
<h2 id="articleHeader4">curvejs相关</h2>
<ul>
<li><p>官网：<a href="https://alloyteam.github.io/curvejs/" rel="nofollow noreferrer" target="_blank">https://alloyteam.github.io/curvejs/</a></p></li>
<li><p>Github: <a href="https://github.com/AlloyTeam/curvejs" rel="nofollow noreferrer" target="_blank">https://github.com/AlloyTeam/curvejs</a></p></li>
<li><p>更加方便的交流关于curvejs的一切可以加入QQ的curvejs交流群(179181560)</p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
腾讯AlloyTeam正式发布Canvas魔幻线条 - curvejs

## 原文链接
[https://segmentfault.com/a/1190000009170886](https://segmentfault.com/a/1190000009170886)

