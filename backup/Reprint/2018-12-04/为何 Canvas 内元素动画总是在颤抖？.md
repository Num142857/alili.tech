---
title: '为何 Canvas 内元素动画总是在颤抖？' 
date: 2018-12-04 2:30:05
hidden: true
slug: 6bq72sjrglt
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>来源： <a href="https://fanmingfei.com/posts/Why_The_Canvas_Is_Shake.html" rel="nofollow noreferrer">https://fanmingfei.com/posts/...</a>
</blockquote>
<h2>背景</h2>
<p>过年的项目中遇到一个问题让我百思不得其解，明明我的帧率保持在60帧，为何我的动画却一直抖动？</p>
<p>我的场景是一个匀速直线运动的小姐姐。</p>
<p>先上一个 <a href="https://codepen.io/fanmingfei/full/JvYdWW" rel="nofollow noreferrer">Demo</a></p>
<p>在这个 Demo 中，小姐姐是按照 x 轴 10px/s，y 轴 30 px/s 进行移动的，不过她的移动是明显伴随着抖动的。</p>
<p>这到底是怎么了呢？</p>
<h2>解决</h2>
<p>如果小姐姐的y轴速度是 10px/s，我们的帧率是 60f/s，计算一下：</p>
<pre><code>10 / 60 = 1/6 (px/f)</code></pre>
<p>实际上，的实际速度是每 6 帧才会移动 1px，这当然会有抖动，小姐姐走一步停一会，总感觉怪怪的~</p>
<p>我索性把小姐姐的移动速度调快，调成 100px/s，发现，还是会抖动，以为高高兴兴能解决了这个问题，发现还是没那么简单。</p>
<p>既然我们能算，那我们就算一算</p>
<pre><code class="js">100 / 60 = 10/6 (px/f) = 1.666666....(px/f)</code></pre>
<p>写了个for循环，看看一秒中每一帧小姐姐都在什么位置</p>
<pre><code class="js">for(let i = 0; i &lt; 60; i ++) {
  console.log(i*10/6)
}</code></pre>
<p>输出结果取小数点后两位是这样的：</p>
<pre><code class="js">0.00 1.67 3.33 5.00 6.67 8.33 10.00 11.67 13.33 15.00 16.67 18.33 20.00 21.67 23.33 25.00 26.67 28.33 30.00 31.67
33.33 35.00 36.67 38.33 40.00 41.67 43.33 45.00 46.67 48.33 50.00 51.67 53.33 55.00 56.67 58.33 60.00 61.67 63.33
65.00 66.67 68.33 70.00 71.67 73.33 75.00 76.67 78.33 80.00 81.67 83.33 85.00 86.67 88.33 90.00 91.67 93.33 95.00 96.67 98.33</code></pre>
<p>那么作为浮点数，Canvas 将如何定位呢？</p>
<p>我们来写一个 <a href="https://codepen.io/fanmingfei/full/vjNNRq" rel="nofollow noreferrer">Demo</a></p>
<p>使用 Chrome 打开，作为一个像素眼，我发现，小姐姐定位在 50.6px 的时候，其实就已经被渲染到 51px 的位置。</p>
<p>所以在 Chrome 中，<code>drawImage</code> 中设置的位置最终会被四舍五入，这可能和 CSS Sub-pixel 有关 这里先不探究。</p>
<p>所以真正的位置其实是</p>
<pre><code> 0 2 3 5 7 8 10 12 13 15 17 18 20 22 23 25 27 28 30 32
 33 35 37 38 40 42 43 45 47 48 50 52 53 55 57 58 60 62 63 65
 67 68 70 72 73 75 77 78 80 82 83 85 87 88 90 92 93 95 97 98</code></pre>
<p>从数值来看，每帧移动的距离可能是 1px 也可能是 2px，小姐姐可能是在边跳芭蕾边走路喽~</p>
<p>既然这样，60 帧的帧率下，设置 60px/s 就可以解决问题了，尝试了一下，真的可以！</p>
<h2>总结</h2>
<p><a href="https://fanmingfei.com/posts/RequestAnimationFrame_Lock_Frame.html" rel="nofollow noreferrer">前端动画/游戏开发 requestAnimationFrame 之 锁帧</a> 这篇文章介绍过，在项目中我们可能对动画进行锁帧，帧率可能是 60 或者 30，如果我们想保证渲染不抖动，在匀速直线运动中，我们尽量保证我们设置的速度要是帧率的倍数，或者保证平均每帧移动的像素点是一样的。</p>
<p>在 <code>drawImage</code> 中，不建议使用浮点数进行定位。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
为何 Canvas 内元素动画总是在颤抖？

## 原文链接
[https://segmentfault.com/a/1190000014522615](https://segmentfault.com/a/1190000014522615)

