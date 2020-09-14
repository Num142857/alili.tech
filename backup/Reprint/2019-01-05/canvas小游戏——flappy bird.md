---
title: 'canvas小游戏——flappy bird' 
date: 2019-01-05 2:30:10
hidden: true
slug: qef8o4z447
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>如果说学编程就是学逻辑的话，那锻炼逻辑能力的最好方法就莫过于写游戏了。最近看了一位大神的<a href="http://www.jianshu.com/p/45d994d04a25" rel="nofollow noreferrer" target="_blank">fly bird</a>小游戏，感觉很有帮助。于是为了寻求进一步的提高，我花了两天时间自己写了一个canvas版本的。虽然看起来原理都差不多，但是实现方法大相径庭，如果有兴趣的话可以大家自己<a href="https://github.com/tzc123/canvas_game" rel="nofollow noreferrer" target="_blank">下载</a>下来玩一玩，大概效果就像下面这样：<br><span class="img-wrap"><img data-src="/img/remote/1460000010542674" src="https://static.alili.tech/img/remote/1460000010542674" alt="游戏效果" title="游戏效果" style="cursor: pointer; display: inline;"></span><br><br>怎么样？是不是感觉难度巨大？...可能是因为我比较菜吧。相信高手还是大有人在的，随便过个几十关也是不在话下。但是如果有和我一样10关都过不了小菜鸡的话，根本不用丧气对吧？咱是程序员是不是？游戏不会玩，作弊还不会吗？咳咳，下面就是作弊的方法：</p>
<h2 id="articleHeader1">首先搞清楚结构</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
  *{
    margin: 0;
    padding: 0;
  }
  html,body {
    height: 100%;
    width: 100%;
    overflow: hidden;
  }
  #canvas{
    display: block;
    margin: 50px auto;
  }
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
  *{
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
  }
  <span class="hljs-selector-tag">html</span>,<span class="hljs-selector-tag">body</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">overflow</span>: hidden;
  }
  <span class="hljs-selector-id">#canvas</span>{
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">50px</span> auto;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<canvas id=&quot;canvas&quot; width=&quot;343&quot; height=&quot;480&quot;></canvas>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-selector-tag">canvas</span> <span class="hljs-selector-tag">id</span>="<span class="hljs-selector-tag">canvas</span>" <span class="hljs-selector-tag">width</span>="343" <span class="hljs-selector-tag">height</span>="480"&gt;&lt;/<span class="hljs-selector-tag">canvas</span>&gt;</code></pre>
<p>很简单，就是这样。</p>
<h2 id="articleHeader2">注意！我要开始说了</h2>
<h3 id="articleHeader3">首先咱先加载一下所有的图片</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 图片集合
var imgs = {
  //创建图片
  bg: new Image(),
  grass: new Image(),
  title: new Image(),
  bird0: new Image(),
  bird1: new Image(),
  up_bird0: new Image(),
  up_bird1: new Image(),
  down_bird0: new Image(),
  down_bird1: new Image(),
  startBtn: new Image(),
  up_pipe: new Image(),
  up_mod: new Image(),
  down_pipe: new Image(),
  down_mod: new Image(),
  scroe0:new Image(),
  scroe1:new Image(),
  scroe2:new Image(),
  scroe3:new Image(),
  scroe4:new Image(),
  scroe5:new Image(),
  scroe6:new Image(),
  scroe7:new Image(),
  scroe8:new Image(),
  scroe9:new Image(),
  //加载图片
  loadImg: function (fn) {
    this.bg.src = './img/bg.jpg';
    this.grass.src = './img/banner.jpg';
    this.title.src = './img/head.jpg';
    this.bird0.src = './img/bird0.png';
    this.bird1.src = './img/bird1.png';
    this.up_bird0.src = './img/up_bird0.png';
    this.up_bird1.src = './img/up_bird1.png';
    this.down_bird0.src = './img/down_bird0.png';
    this.down_bird1.src = './img/down_bird1.png';
    this.startBtn.src = './img/start.jpg';
    this.up_pipe.src = './img/up_pipe.png';
    this.up_mod.src = './img/up_mod.png';
    this.down_pipe.src = './img/down_pipe.png';
    this.down_mod.src = './img/down_mod.png';
    this.scroe0.src = './img/0.jpg';
    this.scroe1.src = './img/1.jpg';
    this.scroe2.src = './img/2.jpg';
    this.scroe3.src = './img/3.jpg';
    this.scroe4.src = './img/4.jpg';
    this.scroe5.src = './img/5.jpg';
    this.scroe6.src = './img/6.jpg';
    this.scroe7.src = './img/7.jpg';
    this.scroe8.src = './img/8.jpg';
    this.scroe9.src = './img/9.jpg';
    var that = this;
    //添加定时器，判断图片是否加载完成
    var timer = setInterval(function() {
      if (that.bg.complete&amp;&amp;that.grass.complete
        &amp;&amp;that.title.complete&amp;&amp;that.startBtn.complete
        &amp;&amp;that.bird0.complete&amp;&amp;that.bird1.complete
        &amp;&amp;that.up_bird0.complete&amp;&amp;that.up_bird1.complete
        &amp;&amp;that.down_bird0.complete&amp;&amp;that.down_bird1.complete
        &amp;&amp;that.up_pipe.complete&amp;&amp;that.up_mod.complete
        &amp;&amp;that.down_mod.complete&amp;&amp;that.down_pipe.complete
        &amp;&amp;that.scroe0.complete&amp;&amp;that.scroe1.complete
        &amp;&amp;that.scroe2.complete&amp;&amp;that.scroe3.complete
        &amp;&amp;that.scroe4.complete&amp;&amp;that.scroe5.complete
        &amp;&amp;that.scroe6.complete&amp;&amp;that.scroe7.complete
        &amp;&amp;that.scroe8.complete&amp;&amp;that.scroe9.complete) {
        //删除定时器
        clearInterval(timer);
        //图片全部加载完成后，运行此函数
        fn();
      }
    }, 50)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 图片集合</span>
<span class="hljs-keyword">var</span> imgs = {
  <span class="hljs-comment">//创建图片</span>
  bg: <span class="hljs-keyword">new</span> Image(),
  <span class="hljs-attr">grass</span>: <span class="hljs-keyword">new</span> Image(),
  <span class="hljs-attr">title</span>: <span class="hljs-keyword">new</span> Image(),
  <span class="hljs-attr">bird0</span>: <span class="hljs-keyword">new</span> Image(),
  <span class="hljs-attr">bird1</span>: <span class="hljs-keyword">new</span> Image(),
  <span class="hljs-attr">up_bird0</span>: <span class="hljs-keyword">new</span> Image(),
  <span class="hljs-attr">up_bird1</span>: <span class="hljs-keyword">new</span> Image(),
  <span class="hljs-attr">down_bird0</span>: <span class="hljs-keyword">new</span> Image(),
  <span class="hljs-attr">down_bird1</span>: <span class="hljs-keyword">new</span> Image(),
  <span class="hljs-attr">startBtn</span>: <span class="hljs-keyword">new</span> Image(),
  <span class="hljs-attr">up_pipe</span>: <span class="hljs-keyword">new</span> Image(),
  <span class="hljs-attr">up_mod</span>: <span class="hljs-keyword">new</span> Image(),
  <span class="hljs-attr">down_pipe</span>: <span class="hljs-keyword">new</span> Image(),
  <span class="hljs-attr">down_mod</span>: <span class="hljs-keyword">new</span> Image(),
  <span class="hljs-attr">scroe0</span>:<span class="hljs-keyword">new</span> Image(),
  <span class="hljs-attr">scroe1</span>:<span class="hljs-keyword">new</span> Image(),
  <span class="hljs-attr">scroe2</span>:<span class="hljs-keyword">new</span> Image(),
  <span class="hljs-attr">scroe3</span>:<span class="hljs-keyword">new</span> Image(),
  <span class="hljs-attr">scroe4</span>:<span class="hljs-keyword">new</span> Image(),
  <span class="hljs-attr">scroe5</span>:<span class="hljs-keyword">new</span> Image(),
  <span class="hljs-attr">scroe6</span>:<span class="hljs-keyword">new</span> Image(),
  <span class="hljs-attr">scroe7</span>:<span class="hljs-keyword">new</span> Image(),
  <span class="hljs-attr">scroe8</span>:<span class="hljs-keyword">new</span> Image(),
  <span class="hljs-attr">scroe9</span>:<span class="hljs-keyword">new</span> Image(),
  <span class="hljs-comment">//加载图片</span>
  loadImg: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">fn</span>) </span>{
    <span class="hljs-keyword">this</span>.bg.src = <span class="hljs-string">'./img/bg.jpg'</span>;
    <span class="hljs-keyword">this</span>.grass.src = <span class="hljs-string">'./img/banner.jpg'</span>;
    <span class="hljs-keyword">this</span>.title.src = <span class="hljs-string">'./img/head.jpg'</span>;
    <span class="hljs-keyword">this</span>.bird0.src = <span class="hljs-string">'./img/bird0.png'</span>;
    <span class="hljs-keyword">this</span>.bird1.src = <span class="hljs-string">'./img/bird1.png'</span>;
    <span class="hljs-keyword">this</span>.up_bird0.src = <span class="hljs-string">'./img/up_bird0.png'</span>;
    <span class="hljs-keyword">this</span>.up_bird1.src = <span class="hljs-string">'./img/up_bird1.png'</span>;
    <span class="hljs-keyword">this</span>.down_bird0.src = <span class="hljs-string">'./img/down_bird0.png'</span>;
    <span class="hljs-keyword">this</span>.down_bird1.src = <span class="hljs-string">'./img/down_bird1.png'</span>;
    <span class="hljs-keyword">this</span>.startBtn.src = <span class="hljs-string">'./img/start.jpg'</span>;
    <span class="hljs-keyword">this</span>.up_pipe.src = <span class="hljs-string">'./img/up_pipe.png'</span>;
    <span class="hljs-keyword">this</span>.up_mod.src = <span class="hljs-string">'./img/up_mod.png'</span>;
    <span class="hljs-keyword">this</span>.down_pipe.src = <span class="hljs-string">'./img/down_pipe.png'</span>;
    <span class="hljs-keyword">this</span>.down_mod.src = <span class="hljs-string">'./img/down_mod.png'</span>;
    <span class="hljs-keyword">this</span>.scroe0.src = <span class="hljs-string">'./img/0.jpg'</span>;
    <span class="hljs-keyword">this</span>.scroe1.src = <span class="hljs-string">'./img/1.jpg'</span>;
    <span class="hljs-keyword">this</span>.scroe2.src = <span class="hljs-string">'./img/2.jpg'</span>;
    <span class="hljs-keyword">this</span>.scroe3.src = <span class="hljs-string">'./img/3.jpg'</span>;
    <span class="hljs-keyword">this</span>.scroe4.src = <span class="hljs-string">'./img/4.jpg'</span>;
    <span class="hljs-keyword">this</span>.scroe5.src = <span class="hljs-string">'./img/5.jpg'</span>;
    <span class="hljs-keyword">this</span>.scroe6.src = <span class="hljs-string">'./img/6.jpg'</span>;
    <span class="hljs-keyword">this</span>.scroe7.src = <span class="hljs-string">'./img/7.jpg'</span>;
    <span class="hljs-keyword">this</span>.scroe8.src = <span class="hljs-string">'./img/8.jpg'</span>;
    <span class="hljs-keyword">this</span>.scroe9.src = <span class="hljs-string">'./img/9.jpg'</span>;
    <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;
    <span class="hljs-comment">//添加定时器，判断图片是否加载完成</span>
    <span class="hljs-keyword">var</span> timer = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">if</span> (that.bg.complete&amp;&amp;that.grass.complete
        &amp;&amp;that.title.complete&amp;&amp;that.startBtn.complete
        &amp;&amp;that.bird0.complete&amp;&amp;that.bird1.complete
        &amp;&amp;that.up_bird0.complete&amp;&amp;that.up_bird1.complete
        &amp;&amp;that.down_bird0.complete&amp;&amp;that.down_bird1.complete
        &amp;&amp;that.up_pipe.complete&amp;&amp;that.up_mod.complete
        &amp;&amp;that.down_mod.complete&amp;&amp;that.down_pipe.complete
        &amp;&amp;that.scroe0.complete&amp;&amp;that.scroe1.complete
        &amp;&amp;that.scroe2.complete&amp;&amp;that.scroe3.complete
        &amp;&amp;that.scroe4.complete&amp;&amp;that.scroe5.complete
        &amp;&amp;that.scroe6.complete&amp;&amp;that.scroe7.complete
        &amp;&amp;that.scroe8.complete&amp;&amp;that.scroe9.complete) {
        <span class="hljs-comment">//删除定时器</span>
        clearInterval(timer);
        <span class="hljs-comment">//图片全部加载完成后，运行此函数</span>
        fn();
      }
    }, <span class="hljs-number">50</span>)
  }
}</code></pre>
<p>...抱歉有点长，但是怕破坏代码的结构，就全部拷下来了，上面的朋友快点下来吧，都是重复的没啥好看的。我来给大家解释一下，首先这是一个对象字面量，创建的时候新建了若干个图片对象，然后它有一个函数loadImg，只要一执行，就会给所有的图片添加路径，然后添加一个定时器每一段时间通过查询所有图片的complete属性判断图片是否全部加载完成。如果是，就删除这个定时器，并执行一段回调函数，还是很好理解的吧:)，不过我感觉这种方法可能有点蠢，不知道各位高人有没有更好的方法？</p>
<h2 id="articleHeader4">接下来，就要开始画了</h2>
<p>大家都知道，其实canvas就是画图，如果要用canvas实现动画效果的话，就只能一遍一遍的擦了画、画了擦了。</p>
<h3 id="articleHeader5">首先</h3>
<p>先把几个固定不动的部分的绘制方法和清空画布的方法写在函数里</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//绘制背景
  function drawBg() {
    ctx.drawImage(imgs.bg,0,0);
  }
  //绘制开始按钮
  function drawStartBtn() {
    ctx.drawImage(imgs.startBtn,130,300);
  }
    //清空画布
  function clean() {
    ctx.clearRect(0,0,canvas.width,canvas.height);
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//绘制背景</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawBg</span>(<span class="hljs-params"></span>) </span>{
    ctx.drawImage(imgs.bg,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>);
  }
  <span class="hljs-comment">//绘制开始按钮</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawStartBtn</span>(<span class="hljs-params"></span>) </span>{
    ctx.drawImage(imgs.startBtn,<span class="hljs-number">130</span>,<span class="hljs-number">300</span>);
  }
    <span class="hljs-comment">//清空画布</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">clean</span>(<span class="hljs-params"></span>) </span>{
    ctx.clearRect(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,canvas.width,canvas.height);
  }</code></pre>
<h3 id="articleHeader6">然后</h3>
<p>把会动的部分也加上</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var v = 0;//草坪滚动的增量
  //绘制草坪
  function drawGrass() {
    //每次运行横坐标向左移
    ctx.drawImage(imgs.grass,3*v--,423);
    ctx.drawImage(imgs.grass,337+3*v--,423);
    if(3*v < -343){
      v=0;
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> v = <span class="hljs-number">0</span>;<span class="hljs-comment">//草坪滚动的增量</span>
  <span class="hljs-comment">//绘制草坪</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawGrass</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//每次运行横坐标向左移</span>
    ctx.drawImage(imgs.grass,<span class="hljs-number">3</span>*v--,<span class="hljs-number">423</span>);
    ctx.drawImage(imgs.grass,<span class="hljs-number">337</span>+<span class="hljs-number">3</span>*v--,<span class="hljs-number">423</span>);
    <span class="hljs-keyword">if</span>(<span class="hljs-number">3</span>*v &lt; <span class="hljs-number">-343</span>){
      v=<span class="hljs-number">0</span>;
    }
  }</code></pre>
<p>这样每次运行一次，草坪就会向左移一点了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var shake = true;//标题的抖动状态
  //标题的抖动效果
  function titleShake() {
    if (shake) {
      ctx.drawImage(imgs.title,53,97);
      ctx.drawImage(imgs.bird1,250,137);
    }else{
      ctx.drawImage(imgs.title,53,103);
      ctx.drawImage(imgs.bird0,250,143);
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> shake = <span class="hljs-literal">true</span>;<span class="hljs-comment">//标题的抖动状态</span>
  <span class="hljs-comment">//标题的抖动效果</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">titleShake</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (shake) {
      ctx.drawImage(imgs.title,<span class="hljs-number">53</span>,<span class="hljs-number">97</span>);
      ctx.drawImage(imgs.bird1,<span class="hljs-number">250</span>,<span class="hljs-number">137</span>);
    }<span class="hljs-keyword">else</span>{
      ctx.drawImage(imgs.title,<span class="hljs-number">53</span>,<span class="hljs-number">103</span>);
      ctx.drawImage(imgs.bird0,<span class="hljs-number">250</span>,<span class="hljs-number">143</span>);
    }
  }</code></pre>
<p>这样通过改变shake的值，就可以使标题的抖动了。<br>机智的各位应该已经发现了，上面两个函数需要重复调用，才能产生动画的效果，所以这就是我接下来要讲的。</p>
<h3 id="articleHeader7">开始界面的定时器</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010542675" src="https://static.alili.tech/img/remote/1460000010542675" alt="开始界面" title="开始界面" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var startTimer;//开始界面定时器
var startTime = 0;//定时器运行的次数
function startLayer() {
    startTimer = setInterval(function () {
      clean();
      drawBg();
      drawStartBtn();
      drawGrass();
      titleShake();
      //定时器每运行7次改变标题位置
      if(startTime == 7){
        shake = !shake;
        startTime = 0;
      }
      //运行次数+1
      startTime++;
      //window.requestAnimationFrame(startLayer)
    }, 24);
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> startTimer;<span class="hljs-comment">//开始界面定时器</span>
<span class="hljs-keyword">var</span> startTime = <span class="hljs-number">0</span>;<span class="hljs-comment">//定时器运行的次数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">startLayer</span>(<span class="hljs-params"></span>) </span>{
    startTimer = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      clean();
      drawBg();
      drawStartBtn();
      drawGrass();
      titleShake();
      <span class="hljs-comment">//定时器每运行7次改变标题位置</span>
      <span class="hljs-keyword">if</span>(startTime == <span class="hljs-number">7</span>){
        shake = !shake;
        startTime = <span class="hljs-number">0</span>;
      }
      <span class="hljs-comment">//运行次数+1</span>
      startTime++;
      <span class="hljs-comment">//window.requestAnimationFrame(startLayer)</span>
    }, <span class="hljs-number">24</span>);
  }</code></pre>
<p>大家也可以理解为这就是开始界面，因为开始界面就是通过定时器一次次运行上面的函数所实现的。然而上面定义的startTimer和startTime又有什么用呢，当然不是多此一举，首先，把这个定时器赋给一个变量，是为了在开始游戏的时候把这个界面关掉，也就是把这个定时器取消，往后看大家就明白了:)其次，startTime是为了记录定时器运行的次数，因为这个定时器刷新的实现极快，只有短短的24毫秒，如果标题以这个速度抖动的话，大家的眼睛一定受不了了吧，所以我设法让他慢下来，每运行7次抖动一次，当然大家可以设置9、10、11使它的频率更加缓慢（大家还可以尝试使用requestAnimation-<br> -Frame,那样性能更佳，但是控制频率略显麻烦。这里使用setInterval更容易理解）当然这个作弊没有半毛钱关系，不过下面就是重头戏了。</p>
<h3 id="articleHeader8">主角登场！！！</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var bird = {
  bird: [imgs.bird0,imgs.bird1],//正常状态，图片
  up_bird: [imgs.up_bird0,imgs.up_bird1],//向上飞状态
  down_bird: [imgs.down_bird0,imgs.down_bird1],//向下掉状态
  posX: 100,//横坐标
  posY: 200,//纵坐标Y
  speed: 0,//速度
  index: 0,//翅膀挥动，切换图片的标
  alive: true,//存活状态
  //绘制小鸟
  draw: function (bird) {
    ctx.drawImage(bird,this.posX,this.posY);
  },
  //飞行中
  fly: function () {
    //纵坐标随速度改变
    this.posY+=this.speed;
    //加速度为1
    this.speed++;
    //如果坠地，死亡
    if(this.posY >= 395){
      this.speed = 0;
      this.draw(this.bird[this.index]);
      this.dead();
    }
    //如果撞顶，弹回来
    if(this.posY <= 0){
      this.speed = 6;
    }
    //如果速度为正，则向下，反之，则向上，否则水平
    if(this.speed>0){
      this.draw(this.down_bird[this.index]);
    }else if(this.speed<0){
      this.draw(this.up_bird[this.index]);
    }else{
      this.draw(this.bird[this.index]);
    }
    //确保坠落速度不会太快
    if(bird.speed > 6){
      bird.speed = 6;
    }
  },
  //煽动翅膀，切换图片
  wingWave: function () {
    this.index++;
    if(this.index > 1){
      this.index = 0;
    }
  },
  //死亡
  dead: function() {
    this.alive = false;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> bird = {
  <span class="hljs-attr">bird</span>: [imgs.bird0,imgs.bird1],<span class="hljs-comment">//正常状态，图片</span>
  up_bird: [imgs.up_bird0,imgs.up_bird1],<span class="hljs-comment">//向上飞状态</span>
  down_bird: [imgs.down_bird0,imgs.down_bird1],<span class="hljs-comment">//向下掉状态</span>
  posX: <span class="hljs-number">100</span>,<span class="hljs-comment">//横坐标</span>
  posY: <span class="hljs-number">200</span>,<span class="hljs-comment">//纵坐标Y</span>
  speed: <span class="hljs-number">0</span>,<span class="hljs-comment">//速度</span>
  index: <span class="hljs-number">0</span>,<span class="hljs-comment">//翅膀挥动，切换图片的标</span>
  alive: <span class="hljs-literal">true</span>,<span class="hljs-comment">//存活状态</span>
  <span class="hljs-comment">//绘制小鸟</span>
  draw: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">bird</span>) </span>{
    ctx.drawImage(bird,<span class="hljs-keyword">this</span>.posX,<span class="hljs-keyword">this</span>.posY);
  },
  <span class="hljs-comment">//飞行中</span>
  fly: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//纵坐标随速度改变</span>
    <span class="hljs-keyword">this</span>.posY+=<span class="hljs-keyword">this</span>.speed;
    <span class="hljs-comment">//加速度为1</span>
    <span class="hljs-keyword">this</span>.speed++;
    <span class="hljs-comment">//如果坠地，死亡</span>
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.posY &gt;= <span class="hljs-number">395</span>){
      <span class="hljs-keyword">this</span>.speed = <span class="hljs-number">0</span>;
      <span class="hljs-keyword">this</span>.draw(<span class="hljs-keyword">this</span>.bird[<span class="hljs-keyword">this</span>.index]);
      <span class="hljs-keyword">this</span>.dead();
    }
    <span class="hljs-comment">//如果撞顶，弹回来</span>
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.posY &lt;= <span class="hljs-number">0</span>){
      <span class="hljs-keyword">this</span>.speed = <span class="hljs-number">6</span>;
    }
    <span class="hljs-comment">//如果速度为正，则向下，反之，则向上，否则水平</span>
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.speed&gt;<span class="hljs-number">0</span>){
      <span class="hljs-keyword">this</span>.draw(<span class="hljs-keyword">this</span>.down_bird[<span class="hljs-keyword">this</span>.index]);
    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.speed&lt;<span class="hljs-number">0</span>){
      <span class="hljs-keyword">this</span>.draw(<span class="hljs-keyword">this</span>.up_bird[<span class="hljs-keyword">this</span>.index]);
    }<span class="hljs-keyword">else</span>{
      <span class="hljs-keyword">this</span>.draw(<span class="hljs-keyword">this</span>.bird[<span class="hljs-keyword">this</span>.index]);
    }
    <span class="hljs-comment">//确保坠落速度不会太快</span>
    <span class="hljs-keyword">if</span>(bird.speed &gt; <span class="hljs-number">6</span>){
      bird.speed = <span class="hljs-number">6</span>;
    }
  },
  <span class="hljs-comment">//煽动翅膀，切换图片</span>
  wingWave: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.index++;
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.index &gt; <span class="hljs-number">1</span>){
      <span class="hljs-keyword">this</span>.index = <span class="hljs-number">0</span>;
    }
  },
  <span class="hljs-comment">//死亡</span>
  dead: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.alive = <span class="hljs-literal">false</span>;
  }
}</code></pre>
<p>...当然这只是主角的代码，一个对象字面量。但是它可以操控主角的所有行为（虽然也没有几个行为...），首先就是画出主角draw()，通过传进不同的图片绘制出主角不同情况下的英姿...然后是wingWave()，通过改变index,切换上面定义的图片数组中的图片，也就是挥翅膀。再然后就是飞行fly(),在飞行过程中主角会碰到各种各样的事故，像是飞的太高撞到天花板啊，或是飞的太低，摔了个狗啃屎。再干脆点一头撞死在了钢管上，但是这个函数并不在这里，因为小鸟撞死在钢管上到底是小鸟的行为，还是钢管的行为呢，我还没想明白，所以干脆放在了全局中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  //判断是否碰撞
  function isHit(oPipe){
    if(bird.posX+bird.bird[0].width>oPipe.posX&amp;&amp;bird.posX<oPipe.posX+oPipe.down_pipe.width){
      if(bird.posY<oPipe.up_posY||bird.posY+30>oPipe.down_posY){
        bird.dead();
      }
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-comment">//判断是否碰撞</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isHit</span>(<span class="hljs-params">oPipe</span>)</span>{
    <span class="hljs-keyword">if</span>(bird.posX+bird.bird[<span class="hljs-number">0</span>].width&gt;oPipe.posX&amp;&amp;bird.posX&lt;oPipe.posX+oPipe.down_pipe.width){
      <span class="hljs-keyword">if</span>(bird.posY&lt;oPipe.up_posY||bird.posY+<span class="hljs-number">30</span>&gt;oPipe.down_posY){
        bird.dead();
      }
    }
  }</code></pre>
<p>就像这样，通过判断小鸟和钢管的位置判断小鸟是不是撞在钢管上了。反正结果还是撞死bird.dead()。看到这里相信不用我说，大家也明白了吧，只要将这段代码注释掉，我们的小鸟不就练成的绝世铁头功，钢管都捅穿给你看。或者稍稍增大一点小鸟会被碰撞到的体积，那就是凌波微步、轻功管上飘了呀。说了半天，还没告诉大家这个水管又是哪里来的。</p>
<h3 id="articleHeader9">钢管</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//水管类
class Pipe {
  constructor(up_pipe,up_mod,down_pipe,down_mod) {
    //构造函数
    this.up_pipe = up_pipe;//上水管头部
    this.up_mod = up_mod;//上水管中间部分
    this.down_pipe = down_pipe;
    this.down_mod = down_mod;
    this.up_height = Math.floor(Math.random()*60);//随机生成上管体高度
    this.down_height = (60 - this.up_height)*3;//保证所有上下水管距离相同
    this.posX = 300;//横坐标
    this.up_posY = this.up_height*3+this.up_pipe.height;//上水管纵坐标
    this.down_posY = 362-this.down_height;//下水管纵坐标
    this.hadSkipped = false;//是否被越过
    this.hadSkippedChange = false;//去重
  }
  //绘制水管
  drawPipe() {
    ctx.drawImage(this.up_pipe,this.posX,this.up_height*3);
    ctx.drawImage(this.down_pipe,this.posX,362-this.down_height);
  }
  //绘制管体
  drawMods() {
    for(var i=0;i<this.up_height;i++){
      ctx.drawImage(this.up_mod,this.posX,i*3)
    }
    for(var j=0;j<this.down_height;j++){
      ctx.drawImage(this.down_mod,this.posX,362-this.down_height+this.down_pipe.height+j);
    }
  }
  //水管移动
  move() {
    this.posX -= 6;
    this.drawMods();
    this.drawPipe();
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//水管类</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Pipe</span> </span>{
  <span class="hljs-keyword">constructor</span>(up_pipe,up_mod,down_pipe,down_mod) {
    <span class="hljs-comment">//构造函数</span>
    <span class="hljs-keyword">this</span>.up_pipe = up_pipe;<span class="hljs-comment">//上水管头部</span>
    <span class="hljs-keyword">this</span>.up_mod = up_mod;<span class="hljs-comment">//上水管中间部分</span>
    <span class="hljs-keyword">this</span>.down_pipe = down_pipe;
    <span class="hljs-keyword">this</span>.down_mod = down_mod;
    <span class="hljs-keyword">this</span>.up_height = <span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random()*<span class="hljs-number">60</span>);<span class="hljs-comment">//随机生成上管体高度</span>
    <span class="hljs-keyword">this</span>.down_height = (<span class="hljs-number">60</span> - <span class="hljs-keyword">this</span>.up_height)*<span class="hljs-number">3</span>;<span class="hljs-comment">//保证所有上下水管距离相同</span>
    <span class="hljs-keyword">this</span>.posX = <span class="hljs-number">300</span>;<span class="hljs-comment">//横坐标</span>
    <span class="hljs-keyword">this</span>.up_posY = <span class="hljs-keyword">this</span>.up_height*<span class="hljs-number">3</span>+<span class="hljs-keyword">this</span>.up_pipe.height;<span class="hljs-comment">//上水管纵坐标</span>
    <span class="hljs-keyword">this</span>.down_posY = <span class="hljs-number">362</span>-<span class="hljs-keyword">this</span>.down_height;<span class="hljs-comment">//下水管纵坐标</span>
    <span class="hljs-keyword">this</span>.hadSkipped = <span class="hljs-literal">false</span>;<span class="hljs-comment">//是否被越过</span>
    <span class="hljs-keyword">this</span>.hadSkippedChange = <span class="hljs-literal">false</span>;<span class="hljs-comment">//去重</span>
  }
  <span class="hljs-comment">//绘制水管</span>
  drawPipe() {
    ctx.drawImage(<span class="hljs-keyword">this</span>.up_pipe,<span class="hljs-keyword">this</span>.posX,<span class="hljs-keyword">this</span>.up_height*<span class="hljs-number">3</span>);
    ctx.drawImage(<span class="hljs-keyword">this</span>.down_pipe,<span class="hljs-keyword">this</span>.posX,<span class="hljs-number">362</span>-<span class="hljs-keyword">this</span>.down_height);
  }
  <span class="hljs-comment">//绘制管体</span>
  drawMods() {
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;<span class="hljs-keyword">this</span>.up_height;i++){
      ctx.drawImage(<span class="hljs-keyword">this</span>.up_mod,<span class="hljs-keyword">this</span>.posX,i*<span class="hljs-number">3</span>)
    }
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> j=<span class="hljs-number">0</span>;j&lt;<span class="hljs-keyword">this</span>.down_height;j++){
      ctx.drawImage(<span class="hljs-keyword">this</span>.down_mod,<span class="hljs-keyword">this</span>.posX,<span class="hljs-number">362</span>-<span class="hljs-keyword">this</span>.down_height+<span class="hljs-keyword">this</span>.down_pipe.height+j);
    }
  }
  <span class="hljs-comment">//水管移动</span>
  move() {
    <span class="hljs-keyword">this</span>.posX -= <span class="hljs-number">6</span>;
    <span class="hljs-keyword">this</span>.drawMods();
    <span class="hljs-keyword">this</span>.drawPipe();
  }
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010542676" src="https://static.alili.tech/img/remote/1460000010542676" alt="管口" title="管口" style="cursor: pointer;"></span><span class="img-wrap"><img data-src="/img/remote/1460000010542677" src="https://static.alili.tech/img/remote/1460000010542677" alt="管体" title="管体" style="cursor: pointer;"></span><br><br>又是一段冗长的代码，大家不要急躁，我来给大家详细解释，水管分为两部分，一部分是固定的管口，还有一部分是为了控制钢管长度的管体，在上面的图片也可以看到，每一关的管道是分为上下两个的——up_pipe和down_pipe，也就是说我们看到的钢管是由数个相同的管体加管口构成的，这里管体的数量是随机的，这样就可以使管道拥有随机的长度了。然后为了保证上下两个钢管的中间距离固定，下管道的高度就是总高度减去上管道的高度，嗯，这里需要理一理，大家也可以直接去看我的代码。有了上面的理论，接下来就简单了，绘制管口drawPipe()，注意给管体预留出位置来，再绘制管体drawMods(),用一个for循环依次绘制出数个管体叠加在一起的样子。水管移动move(),就是改变水管的横坐标了。这里可以通过改变上下水管高度的总值，来增加上下水管之间的距离，是不是游戏难度一下就降了很多？再有就是判断水管是否被小鸟跨越的hadskiped属性，往下看</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//判断是否越过水管
  function isSkipped(oPipe) {
    if(bird.posX>oPipe.posX+oPipe.down_pipe.width){
      //水管已经被越过
      oPipe.hadSkipped = true;
      //确保水管只被越过一次
      if(!oPipe.hadSkippedChange&amp;&amp;oPipe.hadSkipped){
        //分数+1
        scroll++;
        oPipe.hadSkippedChange = true;
      }
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//判断是否越过水管</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isSkipped</span>(<span class="hljs-params">oPipe</span>) </span>{
    <span class="hljs-keyword">if</span>(bird.posX&gt;oPipe.posX+oPipe.down_pipe.width){
      <span class="hljs-comment">//水管已经被越过</span>
      oPipe.hadSkipped = <span class="hljs-literal">true</span>;
      <span class="hljs-comment">//确保水管只被越过一次</span>
      <span class="hljs-keyword">if</span>(!oPipe.hadSkippedChange&amp;&amp;oPipe.hadSkipped){
        <span class="hljs-comment">//分数+1</span>
        scroll++;
        oPipe.hadSkippedChange = <span class="hljs-literal">true</span>;
      }
    }
  }</code></pre>
<p>我是通过判断水管的位置是否已经位于小鸟的后面来判断，小鸟是否越过了水管的，如果越过了就+1分，至于没越过就是通过前面讲过到的isHit()判断了，因为不是同一时间段发生的事情所以不能放在一起。</p>
<h3 id="articleHeader10">计分表</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010542678" src="https://static.alili.tech/img/remote/1460000010542678" alt="计分表" title="计分表" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var scroll = 0;//当前得分
var scrollImg = [imgs.scroe0,imgs.scroe1,imgs.scroe2,
              imgs.scroe3,imgs.scroe4,imgs.scroe5,
              imgs.scroe6,imgs.scroe7,imgs.scroe8,
              imgs.scroe9];//存储数字图片
  //绘制当前得分
  function drawScore() {
    //每绘制一位数，向右移23，绘制下一位数
    for(var i=0;i<scroll.toString().length;i++){
      ctx.drawImage(scrollImg[parseInt(scroll.toString().substr(i,1))],147+i*23,40)
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> scroll = <span class="hljs-number">0</span>;<span class="hljs-comment">//当前得分</span>
<span class="hljs-keyword">var</span> scrollImg = [imgs.scroe0,imgs.scroe1,imgs.scroe2,
              imgs.scroe3,imgs.scroe4,imgs.scroe5,
              imgs.scroe6,imgs.scroe7,imgs.scroe8,
              imgs.scroe9];<span class="hljs-comment">//存储数字图片</span>
  <span class="hljs-comment">//绘制当前得分</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawScore</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//每绘制一位数，向右移23，绘制下一位数</span>
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>;i&lt;scroll.toString().length;i++){
      ctx.drawImage(scrollImg[<span class="hljs-built_in">parseInt</span>(scroll.toString().substr(i,<span class="hljs-number">1</span>))],<span class="hljs-number">147</span>+i*<span class="hljs-number">23</span>,<span class="hljs-number">40</span>)
    }
  }</code></pre>
<p>首先，把所有分数有关的图片放到这里scrollImg来，方便使用。然后判断数字的位数，也就是个十百千万。循环并截取每个位数，再通过相应的图片绘制出来，并且每绘制一个位数的图片位置向右移23，这样数字就不会叠在一起了。这里有一种最没意思的作弊方法，就是手动调整分数，但这只是一个数字，游戏的乐趣果然还是在于过程，下面...</p>
<h3 id="articleHeader11">游戏开始！</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//游戏界面
  function gameLayer() {
    gameTimer = setInterval(function () {
      clean();
      drawBg();
      drawGrass();
      if(gameTime%5 == 0){
        if(gameTime == 30){
          createPipes();
          gameTime = 0;
        }
        bird.wingWave();
      }
      gameTime++;
      for(var i = 0;i< pipes.length;i++){
        pipes[i].move();
        isHit(pipes[i]);
        isSkipped(pipes[i]);
      }
      drawScore();
      bird.fly();
      //如果小鸟死了
      if(!bird.alive){
        gameOver();//游戏结束
        reset();//数据重置
      }
    }, 24);
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//游戏界面</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">gameLayer</span>(<span class="hljs-params"></span>) </span>{
    gameTimer = setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      clean();
      drawBg();
      drawGrass();
      <span class="hljs-keyword">if</span>(gameTime%<span class="hljs-number">5</span> == <span class="hljs-number">0</span>){
        <span class="hljs-keyword">if</span>(gameTime == <span class="hljs-number">30</span>){
          createPipes();
          gameTime = <span class="hljs-number">0</span>;
        }
        bird.wingWave();
      }
      gameTime++;
      <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;i&lt; pipes.length;i++){
        pipes[i].move();
        isHit(pipes[i]);
        isSkipped(pipes[i]);
      }
      drawScore();
      bird.fly();
      <span class="hljs-comment">//如果小鸟死了</span>
      <span class="hljs-keyword">if</span>(!bird.alive){
        gameOver();<span class="hljs-comment">//游戏结束</span>
        reset();<span class="hljs-comment">//数据重置</span>
      }
    }, <span class="hljs-number">24</span>);
  }</code></pre>
<p>...看到这里，估计已经有人在骂我了，讲了半天游戏还没开始...好吧，你们看，其实游戏的界面也不过是一个定时器，将前面讲到的函数和代码，无脑的、重复的执行着。然后这里一定要注意画图的顺序，不然后画的部分会把前面覆盖掉，其次这里的gameTimer和gameTime也和开始界面中startTimer、startTime起到类似的作用，每过一段较长的时间生成一个水管，也就是通过水管类实例化一个水管对象，具体的方法被我封装进一个createPipes函数里了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var pipes = [];//用于存放水管
function createPipes() {
    var pipe = new Pipe(imgs.up_pipe,imgs.up_mod,imgs.down_pipe,imgs.down_mod);
    //添加进pipes中，如果已经有三个水管，则依次替换
    if(pipes.length<3){
      pipes.push(pipe);
    }else{
      pipes[index] = pipe;
      index++;
      if(index >= 3){
        index = 0;
      }
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> pipes = [];<span class="hljs-comment">//用于存放水管</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createPipes</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> pipe = <span class="hljs-keyword">new</span> Pipe(imgs.up_pipe,imgs.up_mod,imgs.down_pipe,imgs.down_mod);
    <span class="hljs-comment">//添加进pipes中，如果已经有三个水管，则依次替换</span>
    <span class="hljs-keyword">if</span>(pipes.length&lt;<span class="hljs-number">3</span>){
      pipes.push(pipe);
    }<span class="hljs-keyword">else</span>{
      pipes[index] = pipe;
      index++;
      <span class="hljs-keyword">if</span>(index &gt;= <span class="hljs-number">3</span>){
        index = <span class="hljs-number">0</span>;
      }
    }
  }</code></pre>
<p>因为实现的方法没有想象中那么简单，首先我们要创造一个水管的数组，它的作用就是为了控制水管的数量，不然我们的定时器就会一遍一遍的创造出无数的水管，但是前面的水管早就离我们远去，所以我就用数组把水管装起来，控制只有一个屏幕的水管，也就是三个。如果创建了超过三个水管，就会把最前面一个替换掉，因为它已经超出了我们的视野。</p>
<h3 id="articleHeader12">响应事件</h3>
<p>光有动画也不行，只能看不能玩有个皮用啊。所以我们当然要添加响应事件了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//键盘点击事件
  function kd(e) {
    if (e.keyCode === 32) {
      bird.speed = -10;
    }
  }
  //触屏事件
  function ts() {
    bird.speed = -10;
  }
  //start按钮点击事件
  function startBtn_click(e) {
    //判断点击位置
    if(e.clientX>canvas.offsetLeft+canvas.width/2-imgs.startBtn.width/2
      &amp;&amp;e.clientX<canvas.offsetLeft+canvas.width/2+imgs.startBtn.width/2
      &amp;&amp;e.clientY<canvas.offsetTop+300+imgs.startBtn.height
      &amp;&amp;e.clientY>canvas.offsetTop+300){
      clean();
      //清除开始界面定时器
      clearInterval(startTimer);
      gameLayer();
      //添加响应事件
      window.addEventListener('keydown',kd,false)
      window.addEventListener('touchstart',ts,false)
      //删除start按钮响应事件
      canvas.removeEventListener('click',startBtn_click,false);
    }
  }
  canvas.addEventListener('click', startBtn_click , false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//键盘点击事件</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">kd</span>(<span class="hljs-params">e</span>) </span>{
    <span class="hljs-keyword">if</span> (e.keyCode === <span class="hljs-number">32</span>) {
      bird.speed = <span class="hljs-number">-10</span>;
    }
  }
  <span class="hljs-comment">//触屏事件</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ts</span>(<span class="hljs-params"></span>) </span>{
    bird.speed = <span class="hljs-number">-10</span>;
  }
  <span class="hljs-comment">//start按钮点击事件</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">startBtn_click</span>(<span class="hljs-params">e</span>) </span>{
    <span class="hljs-comment">//判断点击位置</span>
    <span class="hljs-keyword">if</span>(e.clientX&gt;canvas.offsetLeft+canvas.width/<span class="hljs-number">2</span>-imgs.startBtn.width/<span class="hljs-number">2</span>
      &amp;&amp;e.clientX&lt;canvas.offsetLeft+canvas.width/<span class="hljs-number">2</span>+imgs.startBtn.width/<span class="hljs-number">2</span>
      &amp;&amp;e.clientY&lt;canvas.offsetTop+<span class="hljs-number">300</span>+imgs.startBtn.height
      &amp;&amp;e.clientY&gt;canvas.offsetTop+<span class="hljs-number">300</span>){
      clean();
      <span class="hljs-comment">//清除开始界面定时器</span>
      clearInterval(startTimer);
      gameLayer();
      <span class="hljs-comment">//添加响应事件</span>
      <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'keydown'</span>,kd,<span class="hljs-literal">false</span>)
      <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'touchstart'</span>,ts,<span class="hljs-literal">false</span>)
      <span class="hljs-comment">//删除start按钮响应事件</span>
      canvas.removeEventListener(<span class="hljs-string">'click'</span>,startBtn_click,<span class="hljs-literal">false</span>);
    }
  }
  canvas.addEventListener(<span class="hljs-string">'click'</span>, startBtn_click , <span class="hljs-literal">false</span>);</code></pre>
<p>这就是所有的响应事件了，通过按空格键和点击屏幕都可以改变小鸟的速度，只要把这个速度调整到一个比较舒服的程度，游戏难度就会大大降低。其次，因为canvas是一个整体，所以我们没有办法直接监听里面图片按钮的响应事件，只能退而求其次，判断点击的位置是否在按钮的位置上了，就上面那段有点长的if判断语句。</p>
<h3 id="articleHeader13">游戏结束</h3>
<p>假如我们的主角真的一个不小心如我们所料的撞死在了钢管上（往上翻，就在游戏开始那里），那就表示gameOver();</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  //游戏结束
  function gameOver(){
    //清除定时器
    clearInterval(gameTimer);
    //清除窗口响应事件
    window.removeEventListener('keydown',kd,false);
    window.removeEventListener('touchstart',ts,false);
    //绘制GAME OVER
    ctx.font = &quot;50px blod&quot;;
    ctx.fontWeight = '1000'
    ctx.fillStyle = &quot;white&quot;;
    ctx.fillText(&quot;GAME OVER&quot;, 20, 200);
    drawStartBtn();
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-comment">//游戏结束</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">gameOver</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">//清除定时器</span>
    clearInterval(gameTimer);
    <span class="hljs-comment">//清除窗口响应事件</span>
    <span class="hljs-built_in">window</span>.removeEventListener(<span class="hljs-string">'keydown'</span>,kd,<span class="hljs-literal">false</span>);
    <span class="hljs-built_in">window</span>.removeEventListener(<span class="hljs-string">'touchstart'</span>,ts,<span class="hljs-literal">false</span>);
    <span class="hljs-comment">//绘制GAME OVER</span>
    ctx.font = <span class="hljs-string">"50px blod"</span>;
    ctx.fontWeight = <span class="hljs-string">'1000'</span>
    ctx.fillStyle = <span class="hljs-string">"white"</span>;
    ctx.fillText(<span class="hljs-string">"GAME OVER"</span>, <span class="hljs-number">20</span>, <span class="hljs-number">200</span>);
    drawStartBtn();
  }</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010542679" src="https://static.alili.tech/img/remote/1460000010542679" alt="游戏结束" title="游戏结束" style="cursor: pointer;"></span><br><br>整个世界都平静了下来，定时器关掉，响应事件移除掉，然后绘上大大的、惨白的GAME OVER,下面附带一个游戏开始时就出现的start按钮。不是有一句话说的是，结束不过是新的开始吗，你又可以再来一局了。......好吧，这个就是我为了偷懒随便搞搞的。不过这还没完，数据还得重置一下，不然怎么重新开始。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  //重置数据
  function reset(){
    bird.posY = 200;
    bird.speed = 0;
    bird.alive = true;
    pipes = [];
    scroll = 0;
    canvas.addEventListener('click', startBtn_click , false);
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-comment">//重置数据</span>
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reset</span>(<span class="hljs-params"></span>)</span>{
    bird.posY = <span class="hljs-number">200</span>;
    bird.speed = <span class="hljs-number">0</span>;
    bird.alive = <span class="hljs-literal">true</span>;
    pipes = [];
    scroll = <span class="hljs-number">0</span>;
    canvas.addEventListener(<span class="hljs-string">'click'</span>, startBtn_click , <span class="hljs-literal">false</span>);
  }</code></pre>
<p>最后再给这个start按钮添加上点击事件，大功告成！这就是我调整难度之后的样子：<br><span class="img-wrap"><img data-src="/img/remote/1460000010542680" src="https://static.alili.tech/img/remote/1460000010542680" alt="低难度版" title="低难度版" style="cursor: pointer;"></span><br><br>啧啧啧，这种闲庭信步的感觉......<br><br>果然游戏还是有点难度才有意思......</p>
<h2 id="articleHeader14">总结</h2>
<p>吁...一篇又臭又长、废话又多的文章终于写完了，如果大家觉得有帮助，或者对这篇文章有兴趣的话，就赏个赞。如果觉得我的程序有问题，或者有别的想说的，都可以在评论里告诉我，我会看的。<br><br>我的项目地址：<a href="https://github.com/tzc123/canvas_game" rel="nofollow noreferrer" target="_blank">https://github.com/tzc123/can...</a><br><br>参考项目地址：<a href="http://www.jianshu.com/p/45d994d04a25" rel="nofollow noreferrer" target="_blank">http://www.jianshu.com/p/45d9...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
canvas小游戏——flappy bird

## 原文链接
[https://segmentfault.com/a/1190000010542669](https://segmentfault.com/a/1190000010542669)

