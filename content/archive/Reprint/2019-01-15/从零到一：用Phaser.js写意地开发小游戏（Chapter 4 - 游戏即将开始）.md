---
title: '从零到一：用Phaser.js写意地开发小游戏（Chapter 4 - 游戏即将开始）' 
date: 2019-01-15 2:30:12
hidden: true
slug: 5r7uyl81wkj
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVM22H?w=900&amp;h=500" src="https://static.alili.tech/img/bVM22H?w=900&amp;h=500" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h4>回顾</h4>
<p><a href="https://segmentfault.com/a/1190000009252244">上一节</a>我们介绍了加载场景，并利用加载好的资源，丰富了开始界面。现在点击屏幕后仍是一片黑暗，那么，这一节我们就来完成游戏最核心的场景——play。我们要做的是一个接苹果的游戏，为此我们会加入物理引擎，会使用一些过渡动画以及监听触摸事件等等。</p>
<h4>物理引擎</h4>
<p>几乎每一个游戏框架都必须具备一个甚至多个物理引擎供开发使用，使用物理引擎可以实现例如碰撞、加减速运动、摩擦力等效果。Phaser非常人性化，提供了3个物理引擎供开发者使用，每个引擎各有自己的特点。下面来简单介绍一下：</p>
<h5>Arcade</h5>
<p>最简单快速的物理引擎，因为只支持AABB式的碰撞，计算速度最快，实现简单的物理碰撞、接触、重力等效果最佳。</p>
<p>关于AABB下面有几个链接可以让你去理解，全称是<code>Axis-Aligned Bounding Box</code>，直译就是<code>轴对称盒</code>。例如一张星星的图片，尽管边上很多透明的部分，但如果使用AABB来计算碰撞的话，则会用一个矩形将星星框住，这样计算起来非常方便，但精度就比较低。如此一来我们也可以想到，用Arcade构建的body是不可以发生形变的。</p>
<p><span class="img-wrap"><img data-src="/img/bVM25M?w=1706&amp;h=242" src="https://static.alili.tech/img/bVM25M?w=1706&amp;h=242" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>相关概念：</p>
<ul>
<li><p><a href="http://stackoverflow.com/questions/22512319/what-is-aabb-collision-detection" rel="nofollow noreferrer" target="_blank">What is AABB - Collision detection?</a></p></li>
<li><p><a href="http://baike.baidu.com/item/AABB%E7%9B%92" rel="nofollow noreferrer" target="_blank">AABB盒</a></p></li>
<li><p><a href="http://baike.baidu.com/item/%E5%8C%85%E5%9B%B4%E7%9B%92" rel="nofollow noreferrer" target="_blank">包围盒算法</a></p></li>
</ul>
<hr>
<h5>P2</h5>
<p>如果说Arcade是小而精，P2引擎则是大而全了。各种物理模型均可实现，诸如多边形、弹簧、摩擦力、碰撞物体的材质、反弹系数等等都可以实现。尽管在性能上有一定消耗，毕竟要做更多复杂的运算，但为了效果，我们也很常用P2，作者引进P2也是由于它的全面。</p>
<p><span class="img-wrap"><img data-src="/img/bVM250?w=1710&amp;h=282" src="https://static.alili.tech/img/bVM250?w=1710&amp;h=282" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<hr>
<h5>Ninja</h5>
<p>至于Ninja，则是比较专注精确的多种模式的碰撞检测。例如凹凸面的碰撞、平面和球的碰撞等等。平常比较少用，有兴趣的可以查看<a href="http://phaser.io/examples/v2/category/ninja-physics" rel="nofollow noreferrer" target="_blank">官方示例</a>，另外，作者给出引进Ninja的理由是：</p>
<blockquote><p>It's a really nice little physics system, supporting AABB and Circle vs. Tile collision, with lots of defs for sloping, convex and concave tile types. But that's all it does, it's not trying to be anything more really.</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVM253?w=1708&amp;h=840" src="https://static.alili.tech/img/bVM253?w=1708&amp;h=840" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<blockquote>
<p>Stack Exchange - Game Development上关于Phaser三个引擎的介绍<br><a href="https://gamedev.stackexchange.com/questions/72930/difference-between-arcade-p2-and-ninja-physics-in-phaser/72941" rel="nofollow noreferrer" target="_blank">Difference between Arcade, P2 and Ninja physics in Phaser</a></p>
<p>Phaser作者写的，关于物理引擎的介绍：<br><a href="http://www.html5gamedevs.com/topic/4518-explaining-phaser-2s-multiple-physics-systems/" rel="nofollow noreferrer" target="_blank">Explaining Phaser 2's multiple physics systems</a></p>
</blockquote>
<hr>
<h5>Box2D</h5>
<p>咦？为什么没有上面没有提到Box2D？很遗憾，这个引擎是收费的，40刀，如果没有特别大的需求，估计也用不上。</p>
<p>附上：<a href="http://phaser.io/examples/v2/box2d/car-on-terrain" rel="nofollow noreferrer" target="_blank">非常有趣的官方示例，车掉坑里就爬不起来了。</a></p>
<p><span class="img-wrap"><img data-src="/img/bVM3a2?w=1698&amp;h=786" src="https://static.alili.tech/img/bVM3a2?w=1698&amp;h=786" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<hr>
<h4>正式开始</h4>
<h5>第一步：先布置好场景</h5>
<ul>
<li><p>添加背景</p></li>
<li><p>添加主角</p></li>
<li><p>添加分数</p></li>
<li><p>播放背景音乐</p></li>
</ul>
<p>背景音乐的使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 创建背景音乐实例
var bgMusic = game.add.audio('bgMusic');
// 循环播放
bgMusic.loopFull();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-comment">// 创建背景音乐实例</span>
<span class="hljs-keyword">var</span> bgMusic = game.<span class="hljs-keyword">add</span>.audio(<span class="hljs-string">'bgMusic'</span>);
<span class="hljs-comment">// 循环播放</span>
bgMusic.loopFull();</code></pre>
<p>注意：</p>
<p>场景的布置和开始场景差不多，在开始场景中我们添加了背景音乐。会有人问，为什么不进入游戏就自动播放，是因为移动端的浏览器，必须要用户操作才能播放音频。</p>
<blockquote><p><a href="https://developer.apple.com/library/content/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/AudioandVideoTagBasics/AudioandVideoTagBasics.html#//apple_ref/doc/uid/TP40009523-CH2-SW1" rel="nofollow noreferrer" target="_blank">Safari HTML5 Audio and Video Guide</a><br>Warning: To prevent unsolicited downloads over cellular networks at the user’s expense, embedded media cannot be played automatically in Safari on iOS—the user always initiates playback.</p></blockquote>
<p>另外可参考：</p>
<p>segmentfault上的讨论：<a href="https://segmentfault.com/q/1010000002565534">HTML5的audio标签设置了autoplay属性在手机端出现的问题</a></p>
<p>示例代码：<a href="https://jsfiddle.net/Vincent_Pat/webzd2bc/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/Vincent_...</a><button class="btn btn-xs btn-default ml10 preview" data-url="Vincent_Pat/webzd2bc/" data-typeid="0">点击预览</button></p>
<hr>
<h5>第二步：让你的主角动起来</h5>
<ul>
<li><p>监听滑动事件</p></li>
<li><p>移动主角位置</p></li>
</ul>
<p>主要使用的就是input的addMoveCallback方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 监听滑动事件
game.input.addMoveCallback(function(pointer, x, y, isTap) {
    if (!isTap) man.x = x;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// 监听滑动事件</span>
game.input.addMoveCallback(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(pointer, x, y, isTap)</span> </span>{
    <span class="hljs-keyword">if</span> (!isTap) man.x = x;
});</code></pre>
<p>第四个参数非常有用，可以判断是否为点击事件，如果是点击就不移动主角。</p>
<p><span class="img-wrap"><img data-src="/img/bVM6OY?w=1716&amp;h=516" src="https://static.alili.tech/img/bVM6OY?w=1716&amp;h=516" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>示例代码：<a href="https://jsfiddle.net/Vincent_Pat/tf1hxgee/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/Vincent_...</a><button class="btn btn-xs btn-default ml10 preview" data-url="Vincent_Pat/tf1hxgee/" data-typeid="0">点击预览</button></p>
<hr>
<h5>就这么简单？NO,NO,NO</h5>
<p>很快你就会发觉在PC上主角一直跟着鼠标移动，根本无法停下来！</p>
<p>其实原因也很简单，在PC端，Phaser的move事件对应的是<code>mousemove</code>；在移动端，对应的是<code>touchmove</code>。这两个事件有什么区别？主要区别就是touchmove必须手指触摸屏幕并滑动才会触发，而mousemove则不需要点住鼠标，只需要移动鼠标就会触发。</p>
<p>于是，我们来修改一下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 是否正在触摸
var touching = false;
// 监听按下事件
game.input.onDown.add(function() {
    touching = true;
});
// 监听离开事件
game.input.onUp.add(function() {
    touching = false;
});
// 监听滑动事件
game.input.addMoveCallback(function(pointer, x, y, isTap) {
    if (!isTap &amp;&amp; touching) man.x = x;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// 是否正在触摸</span>
<span class="hljs-keyword">var</span> touching = <span class="hljs-literal">false</span>;
<span class="hljs-comment">// 监听按下事件</span>
game.input.onDown.add(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    touching = <span class="hljs-literal">true</span>;
});
<span class="hljs-comment">// 监听离开事件</span>
game.input.onUp.add(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    touching = <span class="hljs-literal">false</span>;
});
<span class="hljs-comment">// 监听滑动事件</span>
game.input.addMoveCallback(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(pointer, x, y, isTap)</span> </span>{
    <span class="hljs-keyword">if</span> (!isTap &amp;&amp; touching) man.x = x;
});</code></pre>
<p>Good！加入了触摸标记以后，我们监听了按下和离开事件，在PC端和移动端的表现一致了！</p>
<p>示例代码：<a href="https://jsfiddle.net/Vincent_Pat/ymrvtxj7/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/Vincent_...</a><button class="btn btn-xs btn-default ml10 preview" data-url="Vincent_Pat/ymrvtxj7/" data-typeid="0">点击预览</button></p>
<hr>
<h5>这样算完事了？NO,NO,NO</h5>
<p>细心的你多测试了几下，这时候发现了一个非常诡异的情况，当开始点击的时候，不是点在主角身上，主角就会瞬移过去！不难理解，因为我们是直接设置主角的x坐标，等于触摸位置的x坐标的。如果开始时x坐标不在主角身上，就会在一瞬间移动到手指的位置。</p>
<p>于是，我们又来修改一下代码，非常简单的一个方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 监听按下事件
game.input.onDown.add(function(pointer) {
    // 要判断是否点住主角，避免瞬移
    if (Math.abs(pointer.x - man.x) < man.width / 2) touching = true;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 监听按下事件</span>
game.input.onDown.add(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">pointer</span>) </span>{
    <span class="hljs-comment">// 要判断是否点住主角，避免瞬移</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Math</span>.abs(pointer.x - man.x) &lt; man.width / <span class="hljs-number">2</span>) touching = <span class="hljs-literal">true</span>;
});</code></pre>
<p>上述代码的意思就是，开始触摸的位置必须在主角的最左边到最右边的x坐标范围内，才算作开始触摸，否则不算。</p>
<p>Excellent！现在可以随心所欲地操控你的主角了！</p>
<p>示例代码：<a href="https://jsfiddle.net/Vincent_Pat/2gfnadau/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/Vincent_...</a><button class="btn btn-xs btn-default ml10 preview" data-url="Vincent_Pat/2gfnadau/" data-typeid="0">点击预览</button></p>
<hr>
<h5>第三步：让苹果掉下来吧</h5>
<h5>先来创造几个苹果看看</h5>
<p>这里用到了Phaser的group，实际上可以理解成是一个数组，只不过更形象，组的常用方法：</p>
<ul>
<li><p>add/addChild/addChildAt - 创建成员</p></li>
<li><p>countDead/countLiving - 统计成员</p></li>
<li><p>forEach/forEachAlive/forEachDead - 遍历成员</p></li>
<li><p>remove/removeAll/removeChildAt - 删除成员</p></li>
<li><p>create - 创建成员</p></li>
<li><p>bringToTop - 整个组的元素的图层提到最上层</p></li>
</ul>
<p>另外组本身也有x,y等属性，也就是说，整个组的成员都可以根据组的偏移值而一起偏移！另外组还提供了很多丰富的方法，活用组可以达到事半功倍的效果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 添加苹果组
var apples = game.add.group();
var green = apples.create(50, 0, 'green');
var red = apples.create(150, 0, 'red');
var yellow = apples.create(250, 0, 'yellow');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-comment">// 添加苹果组</span>
<span class="hljs-keyword">var</span> apples = game.<span class="hljs-keyword">add</span>.<span class="hljs-keyword">group</span>();
<span class="hljs-keyword">var</span> green = apples.create(<span class="hljs-number">50</span>, <span class="hljs-number">0</span>, <span class="hljs-string">'green'</span>);
<span class="hljs-keyword">var</span> red = apples.create(<span class="hljs-number">150</span>, <span class="hljs-number">0</span>, <span class="hljs-string">'red'</span>);
<span class="hljs-keyword">var</span> yellow = apples.create(<span class="hljs-number">250</span>, <span class="hljs-number">0</span>, <span class="hljs-string">'yellow'</span>);</code></pre>
<p>示例代码：<a href="https://jsfiddle.net/Vincent_Pat/rzw0jjd9/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/Vincent_...</a><button class="btn btn-xs btn-default ml10 preview" data-url="Vincent_Pat/rzw0jjd9/" data-typeid="0">点击预览</button></p>
<hr>
<h5>定时随机创造苹果</h5>
<p>上面我们看到有三种苹果，那么下面我们来实现：每隔一段时间，随机创建三种苹果中的一种，并且摆放到不同的位置。</p>
<p>为此我们用到Phaser的timer，用于创建定时任务。会有人问为什么不用setInterval，setTimeout这些，是因为Phaser只要焦点离开了页面，就会自动暂停游戏，包括定时任务也会暂停，而setInterval和setTimeout则不会。</p>
<p>一般会用到<code>add</code>和<code>loop</code>两个方法，分别对应setTimeout和setInterval：</p>
<p><span class="img-wrap"><img data-src="/img/bVM6Wq?w=1676&amp;h=870" src="https://static.alili.tech/img/bVM6Wq?w=1676&amp;h=870" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVM6V6?w=1684&amp;h=862" src="https://static.alili.tech/img/bVM6V6?w=1684&amp;h=862" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>我们修改一下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 添加苹果组
var apples = game.add.group();
// 苹果类型
var appleTypes = ['green', 'red', 'yellow'];
var appleTimer = game.time.create(true);
appleTimer.loop(1000, function() {
    var x = Math.random() * game.world.width;
    var y = Math.random() * game.world.height;
    var type = appleTypes[Math.floor(Math.random() * appleTypes.length)];
    apples.create(x, y, type);
});
appleTimer.start();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// 添加苹果组</span>
<span class="hljs-keyword">var</span> apples = game.add.group();
<span class="hljs-comment">// 苹果类型</span>
<span class="hljs-keyword">var</span> appleTypes = [<span class="hljs-string">'green'</span>, <span class="hljs-string">'red'</span>, <span class="hljs-string">'yellow'</span>];
<span class="hljs-keyword">var</span> appleTimer = game.time.create(<span class="hljs-literal">true</span>);
appleTimer.loop(<span class="hljs-number">1000</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> x = <span class="hljs-built_in">Math</span>.random() * game.world.width;
    <span class="hljs-keyword">var</span> y = <span class="hljs-built_in">Math</span>.random() * game.world.height;
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">type</span> = appleTypes[<span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random() * appleTypes.length)];
    apples.create(x, y, <span class="hljs-keyword">type</span>);
});
appleTimer.start();</code></pre>
<p>现在每隔1秒就会在屏幕随机位置出现一个苹果了，而且种类是随机的。</p>
<p>示例代码：<a href="https://jsfiddle.net/Vincent_Pat/Lcnv2s50/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/Vincent_...</a><button class="btn btn-xs btn-default ml10 preview" data-url="Vincent_Pat/Lcnv2s50/" data-typeid="0">点击预览</button></p>
<hr>
<h5>最后，我们让苹果掉下来</h5>
<p>这里就要使用到物理引擎了，考虑到接苹果的游戏对碰撞精度要求不是很高，我们选择使用Arcade，也就是Phaser默认的物理引擎。</p>
<p>关键代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 开启物理引擎
game.physics.startSystem(Phaser.Physics.Arcade);
game.physics.arcade.gravity.y = 300;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>// 开启物理引擎
game.physics.startSystem(Phaser.Physics.Arcade)<span class="hljs-comment">;</span>
game.physics.arcade.gravity.y = <span class="hljs-number">300</span><span class="hljs-comment">;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 设置苹果加入物理运动
game.physics.enable(apple);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code><span class="hljs-comment">// 设置苹果加入物理运动</span>
game.physics.<span class="hljs-keyword">enable</span>(apple);</code></pre>
<p>于是，我们继续修改上面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 添加苹果组
var apples = game.add.group();
// 苹果类型
var appleTypes = ['green', 'red', 'yellow'];
var appleTimer = game.time.create(true);
appleTimer.loop(1000, function() {
    var x = Math.random() * game.world.width;
    var type = appleTypes[Math.floor(Math.random() * appleTypes.length)];
    var apple = apples.create(x, 0, type);
    // 设置苹果大小
    var appleImg = game.cache.getImage(type);
    apple.width = game.world.width / 8;
    apple.height = apple.width / appleImg.width * appleImg.height;
    // 设置苹果加入物理运动
    game.physics.enable(apple);
});
appleTimer.start();
// 开启物理引擎
game.physics.startSystem(Phaser.Physics.Arcade);
game.physics.arcade.gravity.y = 300;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// 添加苹果组</span>
<span class="hljs-keyword">var</span> apples = game.add.group();
<span class="hljs-comment">// 苹果类型</span>
<span class="hljs-keyword">var</span> appleTypes = [<span class="hljs-string">'green'</span>, <span class="hljs-string">'red'</span>, <span class="hljs-string">'yellow'</span>];
<span class="hljs-keyword">var</span> appleTimer = game.time.create(<span class="hljs-literal">true</span>);
appleTimer.loop(<span class="hljs-number">1000</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> x = <span class="hljs-built_in">Math</span>.random() * game.world.width;
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">type</span> = appleTypes[<span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random() * appleTypes.length)];
    <span class="hljs-keyword">var</span> apple = apples.create(x, <span class="hljs-number">0</span>, <span class="hljs-keyword">type</span>);
    <span class="hljs-comment">// 设置苹果大小</span>
    <span class="hljs-keyword">var</span> appleImg = game.cache.getImage(<span class="hljs-keyword">type</span>);
    apple.width = game.world.width / <span class="hljs-number">8</span>;
    apple.height = apple.width / appleImg.width * appleImg.height;
    <span class="hljs-comment">// 设置苹果加入物理运动</span>
    game.physics.enable(apple);
});
appleTimer.start();
<span class="hljs-comment">// 开启物理引擎</span>
game.physics.startSystem(Phaser.Physics.Arcade);
game.physics.arcade.gravity.y = <span class="hljs-number">300</span>;</code></pre>
<p>Perfect！现在满天苹果都会有了重力，加速掉向地上了。</p>
<p>示例代码：<a href="https://jsfiddle.net/Vincent_Pat/vaba16zt/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/Vincent_...</a><button class="btn btn-xs btn-default ml10 preview" data-url="Vincent_Pat/vaba16zt/" data-typeid="0">点击预览</button></p>
<hr>
<h4>小结</h4>
<p>这一节内容比较多，我们首先布置了游戏场景，加入了背景音乐。然后实现了对主角的操作，最后实现了苹果的随机掉落。经过这一节，万事俱备只欠东风，下一节我们就来完成这个游戏的剩余逻辑，比如接苹果加分，接到炸弹或苹果掉到地上游戏结束，还有加入更丰富的音效。</p>
<p>游戏截图：</p>
<p><span class="img-wrap"><img data-src="/img/bVM61h?w=696&amp;h=1226" src="https://static.alili.tech/img/bVM61h?w=696&amp;h=1226" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h4>未完待续</h4>
<h5>回顾：</h5>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000009212221">Chapter 1 - 认识Phaser.js</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000009226335" target="_blank">Chapter 2 - 搭建游戏的骨架</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000009252244">Chapter 3 - 加载游戏资源</a></p></li>
</ul>
<h5>下一节：<a href="https://segmentfault.com/a/1190000009309167" target="_blank">Chapter 5 - 游戏大功告成</a>
</h5>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从零到一：用Phaser.js写意地开发小游戏（Chapter 4 - 游戏即将开始）

## 原文链接
[https://segmentfault.com/a/1190000009282734](https://segmentfault.com/a/1190000009282734)

