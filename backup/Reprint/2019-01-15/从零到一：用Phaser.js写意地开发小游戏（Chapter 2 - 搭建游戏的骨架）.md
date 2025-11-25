---
title: '从零到一：用Phaser.js写意地开发小游戏（Chapter 2 - 搭建游戏的骨架）' 
date: 2019-01-15 2:30:12
hidden: true
slug: wi3cfgtkx9
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVMR3L?w=900&amp;h=500" src="https://static.alili.tech/img/bVMR3L?w=900&amp;h=500" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h4>写在前面</h4>
<p><a href="https://segmentfault.com/a/1190000009212221">上一节</a>我们认识了Phaser.js，也说到了Phaser比较适合开发2D的小游戏，那么接下来的几篇文章会以开发一个移动端的小游戏为例，来介绍如何上手Phaser.js。这一节的主要内容是用Phaser.js搭建游戏的骨架。</p>
<h4>游戏相关的一些概念</h4>
<h5>画布</h5>
<p>一般来说，做游戏的话基于Canvas会比基于DOM性能要好很多，尤其是涉及大量动画的情况下。Phaser会将一切渲染在canvas元素上，于是，毫不夸张地说，你的body标签里可能只包含一个canvas元素。</p>
<p>由于本节开发的目标是一个移动端的小游戏，因此画布一般来说都是充满全屏的。</p>
<h5>场景</h5>
<p>一个完整的游戏都是有分场景的，不是指“迷宫”、“沙漠”这些游戏场景，而是“加载”、“开始”、“游戏”、“结束”等场景。一般来说我们实际做项目的时候也大概是如下四种场景：</p>
<ul>
<li><p>加载——展示进度条和loading动画，主要操作为加载游戏资源，如图片、音频等。</p></li>
<li><p>开始——展示开始按钮、活动规则等，主要是让玩家能有主动开始的操作（很关键，后面会说到）。</p></li>
<li><p>游戏——整个游戏的主要逻辑都在这个场景中，最核心的部分。</p></li>
<li><p>结束——展示游戏最终得分、排名等。</p></li>
</ul>
<p>这样的场景的划分也算是描述出了整个游戏的生命周期，我认为上述四个场景是最基本的，缺了哪个场景游戏都不算完整，或者是体验不够完善。</p>
<p>另外，关于再玩一次，有两种方式，一种是回到开始场景，也就是说要再点一次开始游戏，这时候你可以再看看游戏规则等；另一种是直接开始游戏。选用哪一种方式视具体项目而定，比较常见的是直接开始游戏。</p>
<p><span class="img-wrap"><img data-src="/img/bVMR9G?w=728&amp;h=180" src="https://static.alili.tech/img/bVMR9G?w=728&amp;h=180" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h5>对象池</h5>
<p>游戏中生成非常多的元素，我们会需要一个对象池来维护他们，对象池可以理解成是一个Group。那么关于对象池有以下相关的操作：</p>
<ul>
<li><p>尽可能的复用对象，可以减少内存的开销。例如已经移出可视范围的对象（例如跑酷游戏的障碍），重新设置它们的位置，而不是重新创建。</p></li>
<li><p>如有确定要销毁的对象，记得显式调用distroy方法（一般游戏框架并不会被销毁killed的对象，它们还能被“复活”）。</p></li>
</ul>
<h4>正式开始</h4>
<p>每一步我都会给出示例代码，大家点击示例代码链接旁的“点击预览”即可看到效果。</p>
<h5>第一步：创建实例</h5>
<ul>
<li><p>引入Phaser.js</p></li>
<li><p>创建游戏实例</p></li>
</ul>
<p>说明：这里宽高设置成320*568是为了方便大家查看示例，实际应用场景应该是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var width = window.innerWidth;
var height = window.innerHeight;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">var</span> width = <span class="hljs-built_in">window</span>.innerWidth;
<span class="hljs-keyword">var</span> height = <span class="hljs-built_in">window</span>.innerHeight;</code></pre>
<p>示例代码：<a href="https://jsfiddle.net/Vincent_Pat/5j4x4v85/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/Vincent_...</a><button class="btn btn-xs btn-default ml10 preview" data-url="Vincent_Pat/5j4x4v85/" data-typeid="0">点击预览</button></p>
<hr>
<h5>第二步：定义场景</h5>
<ul>
<li><p>定义每个场景的内容</p></li>
<li><p>将场景添加到游戏实例中</p></li>
</ul>
<p>说明：</p>
<ul>
<li><p>每个场景都是一个function。</p></li>
<li><p>通过<code>game.state.add</code>可以将场景添加到游戏</p></li>
</ul>
<p>示例代码：<a href="https://jsfiddle.net/Vincent_Pat/euL6ps0y/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/Vincent_...</a><button class="btn btn-xs btn-default ml10 preview" data-url="Vincent_Pat/euL6ps0y/" data-typeid="0">点击预览</button></p>
<hr>
<h5>第三步：将场景串通</h5>
<ul>
<li><p>具体定义每个场景的生命周期</p></li>
<li><p>从一个场景切换到另一个场景</p></li>
<li><p>启动游戏</p></li>
</ul>
<p>说明：</p>
<p>每个场景都有自己的生命周期，常用的生命周期是preload（加载）、create（准备就绪）、update（更新周期）、render（渲染完成）。顺带介绍一下这四个生命周期吧（详细介绍可以查看官方离线文档）：</p>
<ul>
<li><p>preload - 尽管我们有预加载的场景，但如果你希望能缩短进入页面时加载的时间，可以分摊一些到其他场景，只需要在其他场景加入preload方法即可。</p></li>
<li><p>create - 如果存在preload方法，则会在加载完毕后执行此方法；否则将在进入该场景时直接执行此方法。</p></li>
<li><p>update - 更新周期自动执行的方法，例如在play场景的update方法中可以去检测两个物体是否有接触。</p></li>
<li><p>render - 渲染完毕后执行的方法，例如可以在此方法中勾勒出物体的边缘，来方便观察物体的碰撞区域。</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVMSkr?w=2558&amp;h=1224" src="https://static.alili.tech/img/bVMSkr?w=2558&amp;h=1224" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>示例代码：<a href="https://jsfiddle.net/Vincent_Pat/ymcshatv/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/Vincent_...</a><button class="btn btn-xs btn-default ml10 preview" data-url="Vincent_Pat/ymcshatv/" data-typeid="0">点击预览</button></p>
<h4>迈出了第一步</h4>
<p>至此我们已经将游戏的场景设置好，并成功启动了游戏，通过游戏背景颜色的变化可以体验到场景的切换，我们也能了解到整个游戏分为了四部分，每部分有自己的生命周期。</p>
<p>很多教程会从创建主角做起，但我认为先把游戏骨架搭建好了，再丰富每个场景里面的细节，会更容易理解整个游戏的运行过程。</p>
<p>代码没有很多行，我也都用ES5来写，阅读起来应该不费劲。这一节包括后面的章节的内容都不会太多，方便大家消化。同时也尽可能的介绍每一步是怎么做的。</p>
<p>搭建好游戏的骨架后，我们总算是迈出了第一步。</p>
<h4>未完待续</h4>
<h5>回顾：<a href="https://segmentfault.com/a/1190000009212221">Chapter 1 - 认识Phaser.js</a>
</h5>
<h5>下一节：<a href="https://segmentfault.com/a/1190000009252244" target="_blank">Chapter 3 - 加载游戏资源</a>
</h5>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从零到一：用Phaser.js写意地开发小游戏（Chapter 2 - 搭建游戏的骨架）

## 原文链接
[https://segmentfault.com/a/1190000009226335](https://segmentfault.com/a/1190000009226335)

