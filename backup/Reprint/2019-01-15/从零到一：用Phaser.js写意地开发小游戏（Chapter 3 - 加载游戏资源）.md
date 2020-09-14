---
title: '从零到一：用Phaser.js写意地开发小游戏（Chapter 3 - 加载游戏资源）' 
date: 2019-01-15 2:30:12
hidden: true
slug: 84966nl6zcm
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVMWgO?w=900&amp;h=500" src="https://static.alili.tech/img/bVMWgO?w=900&amp;h=500" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h4>回顾</h4>
<p><a href="https://segmentfault.com/a/1190000009226335">上一节</a>我们搭建了游戏的骨架，添加了四个游戏场景，分别是加载、开始、游戏、结束。那么这一节我们来介绍加载这个场景，顺带丰富一下各个场景的基本内容。</p>
<h4>Phaser.Loader</h4>
<p>Phaser框架自带的一个loader，支持加载多种类型的资源，下面是离线文档中的介绍的截图，详细的API可以查阅文档得知。</p>
<p><span class="img-wrap"><img data-src="/img/bVMWhy?w=1662&amp;h=486" src="https://static.alili.tech/img/bVMWhy?w=1662&amp;h=486" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>介绍几个常用的加载资源的方法：(下列代码中的game默认为Phaser实例，通过new Phaser.Game赋值)</p>
<h5>加载图片</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="game.load.image('star', 'star.png');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code style="word-break: break-word; white-space: initial;">game.<span class="hljs-built_in">load</span>.<span class="hljs-built_in">image</span>(<span class="hljs-string">'star'</span>, <span class="hljs-string">'star.png'</span>);</code></pre>
<h5>加载音频</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="game.load.audio('bg', 'bg.mp3)');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">game</span><span class="hljs-selector-class">.load</span><span class="hljs-selector-class">.audio</span>(<span class="hljs-string">'bg'</span>, <span class="hljs-string">'bg.mp3)'</span>);</code></pre>
<h5>加载图片序列</h5>
<p>由于要指定帧的宽高，因此一般是动画的连续帧，例如行走动画的每一帧合成的图片。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="game.load.spritesheet('walk', 'walk.png', 80, 80);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">game</span><span class="hljs-selector-class">.load</span><span class="hljs-selector-class">.spritesheet</span>(<span class="hljs-string">'walk'</span>, <span class="hljs-string">'walk.png'</span>, <span class="hljs-number">80</span>, <span class="hljs-number">80</span>);</code></pre>
<h5>加载资源集合</h5>
<p>同样可以用作加载图片序列，但这种用法主要用于加载类似于<a href="https://www.codeandweb.com/texturepacker" rel="nofollow noreferrer" target="_blank">TexturePacker</a>打包出来的资源集合。相比于spritesheet一般是一连串的动画帧合成的图片，这种资源集合中的图片可以是各种各样的，和我们平常做网站会将icon、背景图片等合成sprites一个道理。<br>打包出来的资源一般包括一个json和一张合成的图片，json描述了合成图片中每张图片的宽高位置等信息。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="game.load.altasJSONArray('fly', 'fly.png', 'fly.json');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sml"><code style="word-break: break-word; white-space: initial;">game.load.altasJSONArray(<span class="hljs-symbol">'fly'</span>, <span class="hljs-symbol">'fly</span>.png', <span class="hljs-symbol">'fly</span>.json');</code></pre>
<h4>正式开始</h4>
<h5>第一步：加载你需要的资源</h5>
<p>上一节我们提过每个场景都有自己的生命周期，因此加载资源的操作应放在preload这个阶段执行。当preload中的资源加载完毕后，则preload场景将进入create阶段，示例代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 加载场景
preload: function() {
    this.preload = function() {
        // 设置背景为黑色
        game.stage.backgroundColor = '#000000';
        // 加载游戏资源
        game.load.crossOrigin = 'anonymous'; // 设置跨域
        game.load.image('bg', '//24haowan-cdn.shanyougame.com/pickApple2/assets/images/bg.png');
        game.load.image('dude', '//24haowan-cdn.shanyougame.com/pickApple2/assets/images/dude.png');
        game.load.image('green', '//24haowan-cdn.shanyougame.com/pickApple2/assets/images/green.png');
        game.load.image('red', '//24haowan-cdn.shanyougame.com/pickApple2/assets/images/red.png');
        game.load.image('yellow', '//24haowan-cdn.shanyougame.com/pickApple2/assets/images/yellow.png');
        game.load.image('bomb', '//24haowan-cdn.shanyougame.com/pickApple2/assets/images/bomb.png');
        game.load.image('five', '//24haowan-cdn.shanyougame.com/pickApple2/assets/images/five.png');
        game.load.image('three', '//24haowan-cdn.shanyougame.com/pickApple2/assets/images/three.png');
        game.load.image('one', '//24haowan-cdn.shanyougame.com/pickApple2/assets/images/one.png');
        game.load.audio('bgMusic', '//24haowan-cdn.shanyougame.com/pickApple2/assets/audio/bgMusic.mp3');
    },
    this.create = function() {
        alert('加载完毕!');
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code><span class="hljs-comment">// 加载场景</span>
preload: function() {
    this.preload = function() {
        <span class="hljs-comment">// 设置背景为黑色</span>
        game.stage.backgroundColor = <span class="hljs-string">'#000000'</span>;
        <span class="hljs-comment">// 加载游戏资源</span>
        game.<span class="hljs-built_in">load</span>.crossOrigin = <span class="hljs-string">'anonymous'</span>; <span class="hljs-comment">// 设置跨域</span>
        game.<span class="hljs-built_in">load</span>.<span class="hljs-built_in">image</span>(<span class="hljs-string">'bg'</span>, <span class="hljs-string">'//24haowan-cdn.shanyougame.com/pickApple2/assets/images/bg.png'</span>);
        game.<span class="hljs-built_in">load</span>.<span class="hljs-built_in">image</span>(<span class="hljs-string">'dude'</span>, <span class="hljs-string">'//24haowan-cdn.shanyougame.com/pickApple2/assets/images/dude.png'</span>);
        game.<span class="hljs-built_in">load</span>.<span class="hljs-built_in">image</span>(<span class="hljs-string">'green'</span>, <span class="hljs-string">'//24haowan-cdn.shanyougame.com/pickApple2/assets/images/green.png'</span>);
        game.<span class="hljs-built_in">load</span>.<span class="hljs-built_in">image</span>(<span class="hljs-string">'red'</span>, <span class="hljs-string">'//24haowan-cdn.shanyougame.com/pickApple2/assets/images/red.png'</span>);
        game.<span class="hljs-built_in">load</span>.<span class="hljs-built_in">image</span>(<span class="hljs-string">'yellow'</span>, <span class="hljs-string">'//24haowan-cdn.shanyougame.com/pickApple2/assets/images/yellow.png'</span>);
        game.<span class="hljs-built_in">load</span>.<span class="hljs-built_in">image</span>(<span class="hljs-string">'bomb'</span>, <span class="hljs-string">'//24haowan-cdn.shanyougame.com/pickApple2/assets/images/bomb.png'</span>);
        game.<span class="hljs-built_in">load</span>.<span class="hljs-built_in">image</span>(<span class="hljs-string">'five'</span>, <span class="hljs-string">'//24haowan-cdn.shanyougame.com/pickApple2/assets/images/five.png'</span>);
        game.<span class="hljs-built_in">load</span>.<span class="hljs-built_in">image</span>(<span class="hljs-string">'three'</span>, <span class="hljs-string">'//24haowan-cdn.shanyougame.com/pickApple2/assets/images/three.png'</span>);
        game.<span class="hljs-built_in">load</span>.<span class="hljs-built_in">image</span>(<span class="hljs-string">'one'</span>, <span class="hljs-string">'//24haowan-cdn.shanyougame.com/pickApple2/assets/images/one.png'</span>);
        game.<span class="hljs-built_in">load</span>.audio(<span class="hljs-string">'bgMusic'</span>, <span class="hljs-string">'//24haowan-cdn.shanyougame.com/pickApple2/assets/audio/bgMusic.mp3'</span>);
    },
    this.create = function() {
        alert(<span class="hljs-string">'加载完毕!'</span>);
    }
}</code></pre>
<p>示例代码：<a href="https://jsfiddle.net/Vincent_Pat/zvL5u6oc/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/Vincent_...</a><button class="btn btn-xs btn-default ml10 preview" data-url="Vincent_Pat/zvL5u6oc/" data-typeid="0">点击预览</button></p>
<hr>
<h5>第二步：监听加载完成的事件</h5>
<p>通常来说我们都需要反馈加载进度，例如一个进度条，或者是一个百分比的数字。于是我们接下来就需要监听加载完成的事件了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 监听加载完毕事件
game.load.onLoadComplete.add(function() {
    alert('加载完毕!');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// 监听加载完毕事件</span>
game.load.onLoadComplete.add(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    alert(<span class="hljs-string">'加载完毕!'</span>);
});</code></pre>
<p>如果我们需要监听到加载的进度，那么可以用下面的方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 添加进度文字
var progressText = game.add.text(game.world.centerX, game.world.centerY, '0%', {
    fontSize: '60px',
    fill: '#ffffff'
});
progressText.anchor.setTo(0.5, 0.5); // 设置锚点，用于居中
// 监听加载完一个文件的事件
game.load.onFileComplete.add(function(progress) {
    progressText.text = progress + '%';
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code><span class="hljs-comment">// 添加进度文字</span>
var progressText = game.<span class="hljs-built_in">add</span>.<span class="hljs-built_in">text</span>(game.world.centerX, game.world.centerY, <span class="hljs-string">'0%'</span>, {
    fontSize: <span class="hljs-string">'60px'</span>,
    <span class="hljs-built_in">fill</span>: <span class="hljs-string">'#ffffff'</span>
});
progressText.anchor.setTo(<span class="hljs-number">0.5</span>, <span class="hljs-number">0.5</span>); <span class="hljs-comment">// 设置锚点，用于居中</span>
<span class="hljs-comment">// 监听加载完一个文件的事件</span>
game.load.onFileComplete.<span class="hljs-built_in">add</span>(function(progress) {
    progressText.<span class="hljs-built_in">text</span> = progress + <span class="hljs-string">'%'</span>;
});</code></pre>
<p>示例代码： <a href="https://jsfiddle.net/Vincent_Pat/37f8jvej/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/Vincent_...</a><button class="btn btn-xs btn-default ml10 preview" data-url="Vincent_Pat/37f8jvej/" data-typeid="0">点击预览</button></p>
<hr>
<h5>第三步：添加加载页的最小展示时间</h5>
<p>一般而言，我们做游戏都会在loading界面放一个LOGO，作为展示宣传用，那么如果需要加载的资源体积很小的话，有可能加载界面就是一闪而过了。于是，根据我们开发的经验，会设置一个最小的展示时间（例如3秒），在未到最小的展示时间前，即便资源已经加载完毕，也不会离开加载场景。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 监听加载完毕事件
game.load.onLoadComplete.add(onLoad);
// 最小展示时间，示例为3秒
var deadLine = false;
setTimeout(function() {
    deadLine = true;
}, 3000);
// 加载完毕回调方法
function onLoad() {
    if (deadLine) {
        // 已到达最小展示时间，可以进入下一个场景
        game.state.start('created');
    } else {
        // 还没有到最小展示时间，1秒后重试
        setTimeout(onLoad, 1000);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// 监听加载完毕事件</span>
game.load.onLoadComplete.add(onLoad);
<span class="hljs-comment">// 最小展示时间，示例为3秒</span>
<span class="hljs-keyword">var</span> deadLine = <span class="hljs-literal">false</span>;
setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    deadLine = <span class="hljs-literal">true</span>;
}, <span class="hljs-number">3000</span>);
<span class="hljs-comment">// 加载完毕回调方法</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onLoad</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">if</span> (deadLine) {
        <span class="hljs-comment">// 已到达最小展示时间，可以进入下一个场景</span>
        game.state.start(<span class="hljs-string">'created'</span>);
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// 还没有到最小展示时间，1秒后重试</span>
        setTimeout(onLoad, <span class="hljs-number">1000</span>);
    }
}</code></pre>
<p>示例代码：<a href="https://jsfiddle.net/Vincent_Pat/egog3qmy/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/Vincent_...</a><button class="btn btn-xs btn-default ml10 preview" data-url="Vincent_Pat/egog3qmy/" data-typeid="0">点击预览</button></p>
<hr>
<h5>顺带丰富一下开始场景吧</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 开始场景
created: function() {
    this.create = function() {
        // 添加背景
        var bg = game.add.image(0, 0, 'bg');
        bg.width = game.world.width;
        bg.height = game.world.height;
        // 添加标题
        var title = game.add.text(game.world.centerX, game.world.height * 0.25, '小恐龙接苹果', {
            fontSize: '40px',
            fontWeight: 'bold',
            fill: '#f2bb15'
        });
        title.anchor.setTo(0.5, 0.5);
        // 添加提示
        var remind = game.add.text(game.world.centerX, game.world.centerY, '点击任意位置开始', {
            fontSize: '20px',
            fill: '#f2bb15'
        });
        remind.anchor.setTo(0.5, 0.5);
        // 添加主角
        var man = game.add.sprite(game.world.centerX, game.world.height * 0.75, 'dude');
        var manImage = game.cache.getImage('dude');
        man.width = game.world.width * 0.2;
        man.height = man.width / manImage.width * manImage.height;
        man.anchor.setTo(0.5, 0.5);
        // 添加点击事件
        game.input.onTap.add(function() {
            game.state.start('play');
        });
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code><span class="hljs-comment">// 开始场景</span>
created: function() {
    <span class="hljs-keyword">this</span>.create = function() {
        <span class="hljs-comment">// 添加背景</span>
        var bg = game.<span class="hljs-built_in">add</span>.<span class="hljs-built_in">image</span>(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-string">'bg'</span>);
        bg.<span class="hljs-built_in">width</span> = game.world.<span class="hljs-built_in">width</span>;
        bg.<span class="hljs-built_in">height</span> = game.world.<span class="hljs-built_in">height</span>;
        <span class="hljs-comment">// 添加标题</span>
        var title = game.<span class="hljs-built_in">add</span>.<span class="hljs-built_in">text</span>(game.world.centerX, game.world.<span class="hljs-built_in">height</span> * <span class="hljs-number">0.25</span>, <span class="hljs-string">'小恐龙接苹果'</span>, {
            fontSize: <span class="hljs-string">'40px'</span>,
            fontWeight: <span class="hljs-string">'bold'</span>,
            <span class="hljs-built_in">fill</span>: <span class="hljs-string">'#f2bb15'</span>
        });
        title.anchor.setTo(<span class="hljs-number">0.5</span>, <span class="hljs-number">0.5</span>);
        <span class="hljs-comment">// 添加提示</span>
        var remind = game.<span class="hljs-built_in">add</span>.<span class="hljs-built_in">text</span>(game.world.centerX, game.world.centerY, <span class="hljs-string">'点击任意位置开始'</span>, {
            fontSize: <span class="hljs-string">'20px'</span>,
            <span class="hljs-built_in">fill</span>: <span class="hljs-string">'#f2bb15'</span>
        });
        remind.anchor.setTo(<span class="hljs-number">0.5</span>, <span class="hljs-number">0.5</span>);
        <span class="hljs-comment">// 添加主角</span>
        var man = game.<span class="hljs-built_in">add</span>.sprite(game.world.centerX, game.world.<span class="hljs-built_in">height</span> * <span class="hljs-number">0.75</span>, <span class="hljs-string">'dude'</span>);
        var manImage = game.cache.getImage(<span class="hljs-string">'dude'</span>);
        man.<span class="hljs-built_in">width</span> = game.world.<span class="hljs-built_in">width</span> * <span class="hljs-number">0.2</span>;
        man.<span class="hljs-built_in">height</span> = man.<span class="hljs-built_in">width</span> / manImage.<span class="hljs-built_in">width</span> * manImage.<span class="hljs-built_in">height</span>;
        man.anchor.setTo(<span class="hljs-number">0.5</span>, <span class="hljs-number">0.5</span>);
        <span class="hljs-comment">// 添加点击事件</span>
        game.input.onTap.<span class="hljs-built_in">add</span>(function() {
            game.state.start(<span class="hljs-string">'play'</span>);
        });
    }
}</code></pre>
<p>示例代码中使用了input的onTap事件，那么input实际上还有其他事件，例如下图中框住的就是我们最常用的几个事件：</p>
<ul>
<li><p>onDown - 对应touchstart/mousedown</p></li>
<li><p>onUp - 对应touchend/mouseup</p></li>
<li><p>onHold - 封装了长按事件的实现</p></li>
<li><p>onTap - 封装了点击事件的实现</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVMY4g?w=2556&amp;h=1224" src="https://static.alili.tech/img/bVMY4g?w=2556&amp;h=1224" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>另外还有滑动事件：</p>
<p><span class="img-wrap"><img data-src="/img/bVMY4M?w=2552&amp;h=1050" src="https://static.alili.tech/img/bVMY4M?w=2552&amp;h=1050" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>示例代码：<a href="https://jsfiddle.net/Vincent_Pat/mnftL1u8/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/Vincent_...</a><button class="btn btn-xs btn-default ml10 preview" data-url="Vincent_Pat/mnftL1u8/" data-typeid="0">点击预览</button></p>
<hr>
<h5>现在，开始界面是这样子的：</h5>
<p><span class="img-wrap"><img data-src="/img/bVMY4Z?w=594&amp;h=1052" src="https://static.alili.tech/img/bVMY4Z?w=594&amp;h=1052" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h4>小结</h4>
<p>这一节我们介绍了加载场景，分步骤介绍了加载资源、监听加载完成的事件以及添加一个最小的加载展示时间，其中“添加一个最小的加载展示时间”是偏实际应用的内容，非必须。</p>
<p>在文章的最后我们还向场景中加入了主角、背景、标题和开始提示等元素，来丰富开始场景。顺带一说，这次的示例是做一个接苹果的游戏，一句话说完就是控制主角接住每一个从天上掉下来的苹果，否则就算输。</p>
<p>那么如何利用这些资源构建出游戏的玩法，苹果怎么掉，怎么控制主角等等，将是下一节的内容。</p>
<h4>未完待续</h4>
<p>回顾：</p>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000009212221">Chapter 1 - 认识Phaser.js</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000009226335" target="_blank">Chapter 2 - 搭建游戏的骨架</a></p></li>
</ul>
<p>下一节：<a href="https://segmentfault.com/a/1190000009282734">Chapter 4 - 游戏即将开始</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从零到一：用Phaser.js写意地开发小游戏（Chapter 3 - 加载游戏资源）

## 原文链接
[https://segmentfault.com/a/1190000009252244](https://segmentfault.com/a/1190000009252244)

