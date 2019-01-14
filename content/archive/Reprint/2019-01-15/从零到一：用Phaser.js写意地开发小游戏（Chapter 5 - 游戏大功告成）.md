---
title: '从零到一：用Phaser.js写意地开发小游戏（Chapter 5 - 游戏大功告成）' 
date: 2019-01-15 2:30:12
hidden: true
slug: ez9frc5ms0f
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVNawu?w=900&amp;h=500" src="https://static.alili.tech/img/bVNawu?w=900&amp;h=500" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h4>回顾</h4>
<p><a href="https://segmentfault.com/a/1190000009282734">上一节</a>我们完成了游戏核心场景play的大部分工作，能操控主角，能随机掉落苹果了。那么这一节我们来完成游戏剩余的部分，主要是计算分数、如何结束游戏等等。</p>
<h4>正式开始</h4>
<h5>第一步：接住苹果得分</h5>
<ul>
<li><p>主角加入物理运动</p></li>
<li><p>检测接触事件</p></li>
<li><p>接到苹果后，让苹果消失，并加分</p></li>
</ul>
<p>对主角的修改：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="game.physics.enable(man); // 加入物理运动
man.body.allowGravity = false; // 清除重力影响" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs d"><code>game.physics.enable(man); <span class="hljs-comment">// 加入物理运动</span>
man.<span class="hljs-keyword">body</span>.allowGravity = <span class="hljs-literal">false</span>; <span class="hljs-comment">// 清除重力影响</span></code></pre>
<p>检测接触事件要写在play场景的update生命周期内，意思为每次更新视图都会去检测主角和苹果是否有接触，有的话，则执行pickApple方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.update = function() {
    // 监听接触事件
    game.physics.arcade.overlap(man, apples, pickApple, null, this);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">this</span>.update = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-comment">// 监听接触事件</span>
    game.physics.arcade.overlap(man, apples, pickApple, <span class="hljs-literal">null</span>, <span class="hljs-keyword">this</span>);
}</code></pre>
<p>接触事件则非常简单，调用apple的kill方法，则可以让苹果从场景中清除。同时，我们更新一下分数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 接触事件
function pickApple(man, apple) {
    apple.kill();
    title.text = ++score;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs openscad"><code><span class="hljs-comment">// 接触事件</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pickApple</span><span class="hljs-params">(man, apple)</span> {</span>
    apple.kill();
    title.<span class="hljs-built_in">text</span> = ++score;
}</code></pre>
<p>示例代码：<a href="https://jsfiddle.net/Vincent_Pat/h7o4cqdp/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/Vincent_...</a><button class="btn btn-xs btn-default ml10 preview" data-url="Vincent_Pat/h7o4cqdp/" data-typeid="0">点击预览</button></p>
<hr>
<h5>第二步：苹果掉地上，游戏结束</h5>
<ul>
<li><p>检测苹果与场景边缘的接触</p></li>
<li><p>一旦接触，则游戏结束，跳转到结束场景</p></li>
<li><p>布置结束场景，并显示分数</p></li>
<li><p>为结束场景添加点击事件，点击后再玩一次</p></li>
</ul>
<p>onWorldBounds属性可设置为一个Phaser.Signal对象，当开启了collideWorldBounds并且接触到场景边缘时，将触发Signal的事件。另外，这个特殊的Signal提供了上下左右四个值来让我们判断物体到底接触的是哪条边，考虑到有些苹果会接触到左右两边，我们只在和下边界接触的时候才结束游戏。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 设置苹果与游戏边缘碰撞，
apple.body.collideWorldBounds = true;
apple.body.onWorldBounds = new Phaser.Signal();
apple.body.onWorldBounds.add(function(apple, up, down, left, right) {
    if (down) {
        apple.kill();
        game.state.start('over', true, false, score);
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// 设置苹果与游戏边缘碰撞，</span>
apple.body.collideWorldBounds = <span class="hljs-literal">true</span>;
apple.body.onWorldBounds = <span class="hljs-keyword">new</span> Phaser.Signal();
apple.body.onWorldBounds.add(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(apple, up, down, left, right)</span> </span>{
    <span class="hljs-keyword">if</span> (down) {
        apple.kill();
        game.state.start(<span class="hljs-string">'over'</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, score);
    }
});</code></pre>
<p>布置结束场景，和之前布置其他场景一样，添加背景、文本等等。不同的是这次多了init这个生命周期，主要是由于在play场景中跳转到这个场景时会带上score，这个score会传入init这个生命周期的方法中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 结束场景
over: function() {
    var score = 0;
    this.init = function() {
        score = arguments[0];
    }
    this.create = function() {
        // 添加背景
        var bg = game.add.image(0, 0, 'bg');
        bg.width = game.world.width;
        bg.height = game.world.height;
        // 添加文本
        var title = game.add.text(game.world.centerX, game.world.height * 0.25, '游戏结束', {
            fontSize: '40px',
            fontWeight: 'bold',
            fill: '#f2bb15'
        });
        title.anchor.setTo(0.5, 0.5);
        var scoreStr = '你的得分是：'+score+'分';
        var scoreText = game.add.text(game.world.centerX, game.world.height * 0.4, scoreStr, {
            fontSize: '30px',
            fontWeight: 'bold',
            fill: '#f2bb15'
        });
        scoreText.anchor.setTo(0.5, 0.5);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 结束场景</span>
over: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> score = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">this</span>.init = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        score = <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>];
    }
    <span class="hljs-keyword">this</span>.create = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 添加背景</span>
        <span class="hljs-keyword">var</span> bg = game.add.image(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-string">'bg'</span>);
        bg.width = game.world.width;
        bg.height = game.world.height;
        <span class="hljs-comment">// 添加文本</span>
        <span class="hljs-keyword">var</span> title = game.add.text(game.world.centerX, game.world.height * <span class="hljs-number">0.25</span>, <span class="hljs-string">'游戏结束'</span>, {
            <span class="hljs-attr">fontSize</span>: <span class="hljs-string">'40px'</span>,
            <span class="hljs-attr">fontWeight</span>: <span class="hljs-string">'bold'</span>,
            <span class="hljs-attr">fill</span>: <span class="hljs-string">'#f2bb15'</span>
        });
        title.anchor.setTo(<span class="hljs-number">0.5</span>, <span class="hljs-number">0.5</span>);
        <span class="hljs-keyword">var</span> scoreStr = <span class="hljs-string">'你的得分是：'</span>+score+<span class="hljs-string">'分'</span>;
        <span class="hljs-keyword">var</span> scoreText = game.add.text(game.world.centerX, game.world.height * <span class="hljs-number">0.4</span>, scoreStr, {
            <span class="hljs-attr">fontSize</span>: <span class="hljs-string">'30px'</span>,
            <span class="hljs-attr">fontWeight</span>: <span class="hljs-string">'bold'</span>,
            <span class="hljs-attr">fill</span>: <span class="hljs-string">'#f2bb15'</span>
        });
        scoreText.anchor.setTo(<span class="hljs-number">0.5</span>, <span class="hljs-number">0.5</span>);
    }
}</code></pre>
<p>最后我们在结束场景添加一个点击事件，点击后跳转到play场景，再玩一次。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var remind = game.add.text(game.world.centerX, game.world.height * 0.6, '点击任意位置再玩一次', {
    fontSize: '20px',
    fontWeight: 'bold',
    fill: '#f2bb15'
});
remind.anchor.setTo(0.5, 0.5);
// 添加点击事件
game.input.onTap.add(function() {
    game.state.start('play');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>var remind = game.add.text(game.world.centerX, game.world.height * <span class="hljs-number">0.6</span>, '点击任意位置再玩一次', {
    fontSize: '<span class="hljs-number">20</span>px',
    fontWeight: 'bold',
    fill: '<span class="hljs-comment">#f2bb15'</span>
});
remind.<span class="hljs-built_in">anchor</span>.<span class="hljs-built_in">set</span>To(<span class="hljs-number">0.5</span>, <span class="hljs-number">0.5</span>);
// 添加点击事件
game.input.<span class="hljs-keyword">on</span>Tap.add(function() {
    game.<span class="hljs-keyword">state</span>.start('play');
});</code></pre>
<p>示例代码：<a href="https://jsfiddle.net/Vincent_Pat/m2q3z3uo/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/Vincent_...</a><button class="btn btn-xs btn-default ml10 preview" data-url="Vincent_Pat/m2q3z3uo/" data-typeid="0">点击预览</button></p>
<hr>
<h5>第三步：添加得分效果</h5>
<ul>
<li><p>为不同苹果设置不同的得分</p></li>
<li><p>接到苹果时添加对应的得分图片到场景中</p></li>
<li><p>为得分图片添加过渡效果</p></li>
</ul>
<p>先来介绍一下Phaser的过渡：</p>
<p>要使用过渡，首先要创建过渡对象，传入的是要应用过渡效果的对象，例如apple。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 创建过渡对象
game.add.tween(obj);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-comment">// 创建过渡对象</span>
game.<span class="hljs-keyword">add</span>.tween(obj);</code></pre>
<p>然后使用得最多的是Tween的to方法，也就是过渡到指定状态的方法。可以指定过渡时间曲线，延迟、是否重复、过渡时间等等参数，使用Tween已经可以实现大部分的动画效果。</p>
<p><span class="img-wrap"><img data-src="/img/bVNdMv?w=1686&amp;h=1280" src="https://static.alili.tech/img/bVNdMv?w=1686&amp;h=1280" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>于是我们修改之前的pickApple方法，也就是接到苹果后的方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function pickApple(man, apple) {
    var point = 1;
    var img = 'one';
    if (apple.type === 'red') {
        point = 3;
        img = 'three';
    } else if (apple.type === 'yellow') {
        point = 5;
        img = 'five';
    }
    // 添加得分图片
    var goal = game.add.image(apple.x, apple.y, img);
    var goalImg = game.cache.getImage(img);
    goal.width = apple.width;
    goal.height = goal.width / (goalImg.width / goalImg.height);
    goal.alpha = 0;
    // 添加过渡效果
    var showTween = game.add.tween(goal).to({
        alpha: 1,
        y: goal.y - 20
    }, 100, Phaser.Easing.Linear.None, true, 0, 0, false);
    showTween.onComplete.add(function() {
        var hideTween = game.add.tween(goal).to({
            alpha: 0,
            y: goal.y - 20
        }, 100, Phaser.Easing.Linear.None, true, 200, 0, false);
        hideTween.onComplete.add(function() {
            goal.kill();
        });
    });
    // 更新分数
    score += point;
    title.text = score;
    // 清除苹果
    apple.kill();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>function pickApple(man, apple) {
    var <span class="hljs-built_in">point</span> = <span class="hljs-number">1</span>;
    var img = <span class="hljs-string">'one'</span>;
    <span class="hljs-keyword">if</span> (apple.type === <span class="hljs-string">'red'</span>) {
        <span class="hljs-built_in">point</span> = <span class="hljs-number">3</span>;
        img = <span class="hljs-string">'three'</span>;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (apple.type === <span class="hljs-string">'yellow'</span>) {
        <span class="hljs-built_in">point</span> = <span class="hljs-number">5</span>;
        img = <span class="hljs-string">'five'</span>;
    }
    <span class="hljs-comment">// 添加得分图片</span>
    var goal = game.<span class="hljs-built_in">add</span>.<span class="hljs-built_in">image</span>(apple.x, apple.y, img);
    var goalImg = game.cache.getImage(img);
    goal.<span class="hljs-built_in">width</span> = apple.<span class="hljs-built_in">width</span>;
    goal.<span class="hljs-built_in">height</span> = goal.<span class="hljs-built_in">width</span> / (goalImg.<span class="hljs-built_in">width</span> / goalImg.<span class="hljs-built_in">height</span>);
    goal.<span class="hljs-built_in">alpha</span> = <span class="hljs-number">0</span>;
    <span class="hljs-comment">// 添加过渡效果</span>
    var showTween = game.<span class="hljs-built_in">add</span>.tween(goal).to({
        <span class="hljs-built_in">alpha</span>: <span class="hljs-number">1</span>,
        y: goal.y - <span class="hljs-number">20</span>
    }, <span class="hljs-number">100</span>, Phaser.Easing.Linear.None, <span class="hljs-keyword">true</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-keyword">false</span>);
    showTween.onComplete.<span class="hljs-built_in">add</span>(function() {
        var hideTween = game.<span class="hljs-built_in">add</span>.tween(goal).to({
            <span class="hljs-built_in">alpha</span>: <span class="hljs-number">0</span>,
            y: goal.y - <span class="hljs-number">20</span>
        }, <span class="hljs-number">100</span>, Phaser.Easing.Linear.None, <span class="hljs-keyword">true</span>, <span class="hljs-number">200</span>, <span class="hljs-number">0</span>, <span class="hljs-keyword">false</span>);
        hideTween.onComplete.<span class="hljs-built_in">add</span>(function() {
            goal.kill();
        });
    });
    <span class="hljs-comment">// 更新分数</span>
    score += <span class="hljs-built_in">point</span>;
    title.<span class="hljs-built_in">text</span> = score;
    <span class="hljs-comment">// 清除苹果</span>
    apple.kill();
}</code></pre>
<p>示例代码：<a href="https://jsfiddle.net/Vincent_Pat/t8d99pxc/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/Vincent_...</a><button class="btn btn-xs btn-default ml10 preview" data-url="Vincent_Pat/t8d99pxc/" data-typeid="0">点击预览</button></p>
<hr>
<h5>第四步：加入炸弹，丰富音效</h5>
<ul>
<li><p>随机掉落炸弹</p></li>
<li><p>加入接到苹果或炸弹的音效</p></li>
<li><p>接到炸弹后游戏结束</p></li>
</ul>
<p>要想随机掉落炸弹非常简单，只需要在之前的appleTypes里面加入bomb即可，同时如果有其他东西（例如梨子）要加入的话也可以这样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var appleTypes = ['green', 'red', 'yellow', 'bomb'];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">var appleTypes</span> = [<span class="hljs-string">'green'</span>, <span class="hljs-string">'red'</span>, <span class="hljs-string">'yellow'</span>, <span class="hljs-string">'bomb'</span>];</code></pre>
<p>同时，由于我们不接炸弹，因此炸弹掉到地上也不会导致游戏结束，因此修改一下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="apple.body.onWorldBounds.add(function(apple, up, down, left, right) {
    if (down) {
        apple.kill();
        if (apple.type !== 'bomb') game.state.start('over', true, false, score);
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>apple.<span class="hljs-keyword">body</span>.onWorldBounds.add(<span class="hljs-keyword">function</span>(apple, up, down, left, right) {
    <span class="hljs-keyword">if</span> (down) {
        apple.kill();
        <span class="hljs-keyword">if</span> (apple.<span class="hljs-keyword">type</span> <span class="hljs-type">!== </span><span class="hljs-symbol">'bomb</span>') game.state.start(<span class="hljs-symbol">'over</span>', <span class="hljs-literal">true</span>, <span class="hljs-literal">false</span>, score);
    }
});</code></pre>
<p>接到苹果和炸弹时播放音效，这个很简单，直接调用音频对象的<code>play</code>方法即可。接到炸弹后结束和苹果掉地上的调用方式是一样的。我们继续来修改pickApple方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function pickApple(man, apple) {
    if (apple.type === 'bomb') {
        // 播放音效
        bombMusic.play();
        game.state.start('over', true, false, score);
    } else {
        var point = 1;
        var img = 'one';
        if (apple.type === 'red') {
            point = 3;
            img = 'three';
        } else if (apple.type === 'yellow') {
            point = 5;
            img = 'five';
        }
        // 添加得分图片
        var goal = game.add.image(apple.x, apple.y, img);
        var goalImg = game.cache.getImage(img);
        goal.width = apple.width;
        goal.height = goal.width / (goalImg.width / goalImg.height);
        goal.alpha = 0;
        // 添加过渡效果
        var showTween = game.add.tween(goal).to({
            alpha: 1,
            y: goal.y - 20
        }, 100, Phaser.Easing.Linear.None, true, 0, 0, false);
        showTween.onComplete.add(function() {
            var hideTween = game.add.tween(goal).to({
                alpha: 0,
                y: goal.y - 20
            }, 100, Phaser.Easing.Linear.None, true, 200, 0, false);
            hideTween.onComplete.add(function() {
                goal.kill();
            });
        });
        // 更新分数
        score += point;
        title.text = score;
        // 清除苹果
        apple.kill();
        // 播放音效
        scoreMusic.play();
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>function pickApple(man, apple) {
    <span class="hljs-keyword">if</span> (apple.type === <span class="hljs-string">'bomb'</span>) {
        <span class="hljs-comment">// 播放音效</span>
        bombMusic.play();
        game.state.start(<span class="hljs-string">'over'</span>, <span class="hljs-keyword">true</span>, <span class="hljs-keyword">false</span>, score);
    } <span class="hljs-keyword">else</span> {
        var <span class="hljs-built_in">point</span> = <span class="hljs-number">1</span>;
        var img = <span class="hljs-string">'one'</span>;
        <span class="hljs-keyword">if</span> (apple.type === <span class="hljs-string">'red'</span>) {
            <span class="hljs-built_in">point</span> = <span class="hljs-number">3</span>;
            img = <span class="hljs-string">'three'</span>;
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (apple.type === <span class="hljs-string">'yellow'</span>) {
            <span class="hljs-built_in">point</span> = <span class="hljs-number">5</span>;
            img = <span class="hljs-string">'five'</span>;
        }
        <span class="hljs-comment">// 添加得分图片</span>
        var goal = game.<span class="hljs-built_in">add</span>.<span class="hljs-built_in">image</span>(apple.x, apple.y, img);
        var goalImg = game.cache.getImage(img);
        goal.<span class="hljs-built_in">width</span> = apple.<span class="hljs-built_in">width</span>;
        goal.<span class="hljs-built_in">height</span> = goal.<span class="hljs-built_in">width</span> / (goalImg.<span class="hljs-built_in">width</span> / goalImg.<span class="hljs-built_in">height</span>);
        goal.<span class="hljs-built_in">alpha</span> = <span class="hljs-number">0</span>;
        <span class="hljs-comment">// 添加过渡效果</span>
        var showTween = game.<span class="hljs-built_in">add</span>.tween(goal).to({
            <span class="hljs-built_in">alpha</span>: <span class="hljs-number">1</span>,
            y: goal.y - <span class="hljs-number">20</span>
        }, <span class="hljs-number">100</span>, Phaser.Easing.Linear.None, <span class="hljs-keyword">true</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-keyword">false</span>);
        showTween.onComplete.<span class="hljs-built_in">add</span>(function() {
            var hideTween = game.<span class="hljs-built_in">add</span>.tween(goal).to({
                <span class="hljs-built_in">alpha</span>: <span class="hljs-number">0</span>,
                y: goal.y - <span class="hljs-number">20</span>
            }, <span class="hljs-number">100</span>, Phaser.Easing.Linear.None, <span class="hljs-keyword">true</span>, <span class="hljs-number">200</span>, <span class="hljs-number">0</span>, <span class="hljs-keyword">false</span>);
            hideTween.onComplete.<span class="hljs-built_in">add</span>(function() {
                goal.kill();
            });
        });
        <span class="hljs-comment">// 更新分数</span>
        score += <span class="hljs-built_in">point</span>;
        title.<span class="hljs-built_in">text</span> = score;
        <span class="hljs-comment">// 清除苹果</span>
        apple.kill();
        <span class="hljs-comment">// 播放音效</span>
        scoreMusic.play();
    }
}</code></pre>
<p>示例代码：<a href="https://jsfiddle.net/Vincent_Pat/3ck4vom5/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/Vincent_...</a><button class="btn btn-xs btn-default ml10 preview" data-url="Vincent_Pat/3ck4vom5/" data-typeid="0">点击预览</button></p>
<hr>
<h4>大功告成</h4>
<p>游戏终于完成了它的逻辑，算是一个完整的游戏了。当然了，效果远未达到理想，要说的话，游戏水非常深，这个系列的教程只是从零到一，引导大家接触并上手Phaser.js。</p>
<p>这里可以抛出一些优化的方向，大家也可以当做Phaser的练习题目去做：</p>
<ul>
<li><p>游戏中字体的更换</p></li>
<li><p>地面应该和小恐龙底部持平，而非屏幕底部，如何实现？</p></li>
<li><p>现在三种苹果和炸弹的出现概率是随机的，如何调整它们各自的出现概率？</p></li>
<li><p>现在苹果和炸弹出现的时间间隔是固定的，如何随着游戏进行加快节奏？</p></li>
<li><p>如何调整游戏难度梯度？</p></li>
<li><p>现在炸弹和苹果有可能会相邻出现，导致很难接到苹果而不碰到炸弹，如何避免？</p></li>
<li><p>……</p></li>
</ul>
<p>本来没想写这么多点的，一不小心。可见游戏优化的空间还是很大的，希望大家能继续发掘Phaser.js的潜力，做出更多的优秀的小游戏~</p>
<p>Github地址：<a href="https://github.com/VincentPat/Phaser-PickApple" rel="nofollow noreferrer" target="_blank">https://github.com/VincentPat...</a></p>
<p>扫描下面二维码的话也可以用手机查看效果了：</p>
<p><span class="img-wrap"><img data-src="/img/bVNdPR?w=386&amp;h=382" src="https://static.alili.tech/img/bVNdPR?w=386&amp;h=382" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h4>未完待续...？</h4>
<h5>回顾：</h5>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000009212221">Chapter 1 - 认识Phaser.js</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000009226335" target="_blank">Chapter 2 - 搭建游戏的骨架</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000009252244">Chapter 3 - 加载游戏资源</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000009282734" target="_blank">Chapter 4 - 游戏即将开始</a></p></li>
</ul>
<p>如果接下来有时间整理的话，会补充一篇Phaser.js的实战技巧和注意事项。本系列文章写作纯粹个人喜好，如有写得不严谨或不正确的地方，还请多多包涵。第一次花这么长时间写技术分享，还是用那句话勉励自己：</p>
<h5>希望我是真的喜欢编程，由始至终。</h5>
<p>如果你喜欢这几篇文章，或者说<a href="https://segmentfault.com/blog/zero2one">从零到一</a>这个系列，给我点个赞，我就心满意足了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从零到一：用Phaser.js写意地开发小游戏（Chapter 5 - 游戏大功告成）

## 原文链接
[https://segmentfault.com/a/1190000009309167](https://segmentfault.com/a/1190000009309167)

