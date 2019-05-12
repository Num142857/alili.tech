---
title: 像程序员一样思考：如何只使用 JavaScript，HTML 和 CSS 开发贪食蛇游戏
hidden: true
categories: [reprint]
slug: bdd791ff
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <p>大家好👋</p>
<p>欢迎上车。今天我们将开始一场激动人心的冒险，在这里我们将开发属于我们自己的贪食蛇游戏🐍。通过将其分解为一个个简短的步骤来学习如何解决问题。在这段旅程结束时，你会学到一些新东西，并且有信心能独立探索更多。</p>
<p>如果你是编程新手，<a href="https://www.freecodecamp.org/">freeCodeCamp</a> 了解一下。这是一个很棒的学习网站…没错…完全免费。我就是从那儿入门的。</p>
<p>好了，好了，言归正传 —— 要发车了，准备好了嘛？</p>
<blockquote>
<p>你可以在<a href="https://github.com/supergoat/snake">这里</a>找到完整代码，并且可以在<a href="https://snake-cdxejlircg.now.sh">这里</a>在线预览。</p>
</blockquote>
<h3>开始吧</h3>
<p>首先新建一个文件“snake.html”，它将包含全部代码。</p>
<p>因为这是一个 HTML 文件，所以要做的第一件事就是申明 <code>&lt;!DOCTYPE&gt;</code>。请在 snake.html 文件中输入以下内容：</p>
<pre><code class="hljs xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Snake Game<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    Welcome to Snake!
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre><p>不错，接下来在你最喜欢的浏览器中打开 snake.html。你应该能够看到 <strong>Welcome to Snake!</strong>。</p>
<p><img src="https://p0.ssl.qhimg.com/t01fd229818a191527a.png" alt=""></p>
<p>很好的开始！ 👊</p>
<h3>创建画布</h3>
<p>为了完成游戏，我们需要用到 <code>&lt;canvas&gt;</code> 标签，并借助 JavaScript 绘制图像。</p>
<p>用以下代码来替换 snake.html 里的欢迎语。</p>
<pre><code class="hljs routeros">&lt;canvas <span class="hljs-attribute">id</span>=<span class="hljs-string">"gameCanvas"</span> <span class="hljs-attribute">width</span>=<span class="hljs-string">"300"</span> <span class="hljs-attribute">height</span>=<span class="hljs-string">"300"</span>&gt;&lt;canvas&gt;
</code></pre><p>id 用于标识画布且始终应该被指定。稍后我们会用它来访问画布。width 和 height 分别是画布的宽和高，同样也需要被指定。在本例中，画布尺寸为 300 px * 300 px。</p>
<p>snake.html 文件此时应该是这样的：</p>
<pre><code class="hljs xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Snake Game<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"gameCanvas"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"300"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"300"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre><p>如果你刷新页面，你会发现页面一片空白。这是因为默认情况下，画布是空的并且没有背景。让我们来调整下。🔧</p>
<h4>为画布添加背景色和边框</h4>
<p>为了看到画布，我们可以写一段 JavaScript 代码给它加一个边框。为此，我们需要在 <code>&lt;/canvas&gt;</code> 后添加  <code>&lt;script&gt;&lt;/script&gt;</code> 标签，并在其中编写 JavaScript 代码。</p>
<blockquote>
<p>如果你把 <code>&lt;script&gt;</code> 标签放在了 <code>&lt;canvas&gt;</code> 标签前面，那么你的 JavaScript 代码将不会生效，因为此时 HTML 还未加载完。</p>
</blockquote>
<p>现在我们来写一些 JavaScript 代码，写在闭合的 <code>&lt;script&gt;&lt;/script&gt;</code> 标签之间。代码如下：</p>
<pre><code class="hljs xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Snake Game<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"gameCanvas"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"300"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"300"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
      <span class="hljs-comment">/** 常量 **/</span>
      <span class="hljs-keyword">const</span> CANVAS_BORDER_COLOUR = <span class="hljs-string">'black'</span>;
      <span class="hljs-keyword">const</span> CANVAS_BACKGROUND_COLOUR = <span class="hljs-string">"white"</span>;

      <span class="hljs-comment">// 获取 canvas 元素</span>
      <span class="hljs-keyword">var</span> gameCanvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"gameCanvas"</span>);
      <span class="hljs-comment">// 返回一个二维绘图上下文</span>
      <span class="hljs-keyword">var</span> ctx = gameCanvas.getContext(<span class="hljs-string">"2d"</span>);
      <span class="hljs-comment">// 选择画布的背景颜色</span>
      ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
      <span class="hljs-comment">// 选择画布的边框颜色</span>
      ctx.strokestyle = CANVAS_BORDER_COLOUR;
      <span class="hljs-comment">// 绘制一个“实心的”长方形来覆盖整个画布</span>
      ctx.fillRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, gameCanvas.width, gameCanvas.height);
      <span class="hljs-comment">// 绘制画布的“边框”</span>
      ctx.strokeRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, gameCanvas.width, gameCanvas.height);
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>

</code></pre><p>首先，使用前面指定的 id（gameCanvas）获取 canvas 元素。然后获取画布的“2d”上下文，这意味着我们将在 2D 空间绘制图像。</p>
<p>最后，我们画了一个 300 x 300 的白色矩形，边框为黑色。这个矩形从左上角（0，0）开始覆盖了整个画布。</p>
<p>如果你在浏览器中重新加载 snake.html，你会看到一个带黑色边框的白块！干得漂亮，现在我们已经有了一个画布，可以用来创建我们的贪食蛇游戏了！ 👏迎接下一个挑战吧！</p>
<h3>用坐标来表示贪食蛇</h3>
<p>为了让游戏能玩，我们需要知道蛇在画布中的位置。为此，我们用一系列坐标来表示蛇。因此，要在画布中间（150,150）画一条横向的蛇，我们可以这样写：</p>
<pre><code class="hljs groovy">let snake = [
  {<span class="hljs-string">x:</span> <span class="hljs-number">150</span>, <span class="hljs-string">y:</span> <span class="hljs-number">150</span>},
  {<span class="hljs-string">x:</span> <span class="hljs-number">140</span>, <span class="hljs-string">y:</span> <span class="hljs-number">150</span>},
  {<span class="hljs-string">x:</span> <span class="hljs-number">130</span>, <span class="hljs-string">y:</span> <span class="hljs-number">150</span>},
  {<span class="hljs-string">x:</span> <span class="hljs-number">120</span>, <span class="hljs-string">y:</span> <span class="hljs-number">150</span>},
  {<span class="hljs-string">x:</span> <span class="hljs-number">110</span>, <span class="hljs-string">y:</span> <span class="hljs-number">150</span>},
];
</code></pre><p>注意蛇所有部位的 y 坐标都是 150。每一部位的 x 坐标比（左边）前一个部位多 10 px。数组中的第一对坐标 {x: 150, y: 150} 表示蛇头，位于蛇的最右边。</p>
<p>别急，在下一步我们画蛇的时候，会对此有更清晰的认识。</p>
<h3>开始画蛇</h3>
<p>为了画蛇，我们可以写一个函数为蛇身上的<strong>每一个</strong>部位画一个矩形。</p>
<pre><code class="hljs actionscript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawSnakePart</span><span class="hljs-params">(snakePart)</span> </span>{
  ctx.fillStyle = <span class="hljs-string">'lightgreen'</span>;
  ctx.strokestyle = <span class="hljs-string">'darkgreen'</span>;
  ctx.fillRect(snakePart.x, snakePart.y, <span class="hljs-number">10</span>, <span class="hljs-number">10</span>);
  ctx.strokeRect(snakePart.x, snakePart.y, <span class="hljs-number">10</span>, <span class="hljs-number">10</span>);
}
</code></pre><p>接下来，我们用另一个函数在画布上把蛇展示出来。</p>
<pre><code class="hljs php"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawSnake</span><span class="hljs-params">()</span> </span>{
  snake.<span class="hljs-keyword">forEach</span>(drawSnakePart);
}
</code></pre><p>此时 snake.html 文件应该是这样的。</p>
<pre><code class="hljs xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Snake Game<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"gameCanvas"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"300"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"300"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
      <span class="hljs-comment">/** 常量 **/</span>
      <span class="hljs-keyword">const</span> CANVAS_BORDER_COLOUR = <span class="hljs-string">'black'</span>;
      <span class="hljs-keyword">const</span> CANVAS_BACKGROUND_COLOUR = <span class="hljs-string">"white"</span>;
      <span class="hljs-keyword">const</span> SNAKE_COLOUR = <span class="hljs-string">'lightgreen'</span>;
      <span class="hljs-keyword">const</span> SNAKE_BORDER_COLOUR = <span class="hljs-string">'darkgreen'</span>;

      <span class="hljs-keyword">let</span> snake = [
        {<span class="hljs-attr">x</span>: <span class="hljs-number">150</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">150</span>},
        {<span class="hljs-attr">x</span>: <span class="hljs-number">140</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">150</span>},
        {<span class="hljs-attr">x</span>: <span class="hljs-number">130</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">150</span>},
        {<span class="hljs-attr">x</span>: <span class="hljs-number">120</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">150</span>},
        {<span class="hljs-attr">x</span>: <span class="hljs-number">110</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">150</span>}
      ]

      <span class="hljs-comment">// 获取 canvas 元素</span>
      <span class="hljs-keyword">var</span> gameCanvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"gameCanvas"</span>);
      <span class="hljs-comment">// 返回一个二维绘制上下文</span>
      <span class="hljs-keyword">var</span> ctx = gameCanvas.getContext(<span class="hljs-string">"2d"</span>);
      <span class="hljs-comment">//  选择画布的背景颜色</span>
      ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
      <span class="hljs-comment">//  选择画布的边框颜色</span>
      ctx.strokestyle = CANVAS_BORDER_COLOUR;
      <span class="hljs-comment">// 绘制一个“实心的”长方形来覆盖整个画布</span>
      ctx.fillRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, gameCanvas.width, gameCanvas.height);
      <span class="hljs-comment">// 绘制画布的“边框”</span>
      ctx.strokeRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, gameCanvas.width, gameCanvas.height);
      drawSnake();

      <span class="hljs-comment">/**
       * 在画布上画蛇
       */</span>
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawSnake</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 循环遍历蛇的每一部分，并将其绘制到画布上</span>
        snake.forEach(drawSnakePart)
      }
      <span class="hljs-comment">/**
       * 在画布上画蛇的一个部分
       * @param { object } snakePart —— 需要绘制的部位的所在坐标
       */</span>
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawSnakePart</span>(<span class="hljs-params">snakePart</span>) </span>{
        <span class="hljs-comment">// 设置蛇身体的背景颜色</span>
        ctx.fillStyle = SNAKE_COLOUR;
        <span class="hljs-comment">// 设置蛇身的边框色</span>
        ctx.strokestyle = SNAKE_BORDER_COLOUR;
        <span class="hljs-comment">// 在蛇身坐标所在的位置，绘制“实心”的矩形以表示蛇    </span>
        ctx.fillRect(snakePart.x, snakePart.y, <span class="hljs-number">10</span>, <span class="hljs-number">10</span>);
        <span class="hljs-comment">// 绘制蛇身的边框</span>
        ctx.strokeRect(snakePart.x, snakePart.y, <span class="hljs-number">10</span>, <span class="hljs-number">10</span>);
      }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre><p>刷新页面，你会发现画布中间有一条绿色的蛇。666！ 😎</p>
<p><img src="https://p0.ssl.qhimg.com/t0114f43f310d04d6d3.png" alt=""></p>
<h3>让贪食蛇横向移动</h3>
<p>接下来我们想要让蛇能动起来。不过我们该怎么做呢？🤔</p>
<p>嗯，为了让蛇能够一步一步（10 px）移动到最右边，我们可以把蛇的<strong>每个</strong>部位的 x 坐标，每次增加 10 px（dx = +10 px）。同理，为了让蛇移动到最左边，每次把蛇的<strong>每个</strong>部位的 x 坐标减少 10 px（dx = -10）。</p>
<blockquote>
<p><strong>dx</strong> 是蛇的横向移动速度。</p>
</blockquote>
<p>蛇向右移动了 10 px 后，坐标如下图所示：</p>
<p><img src="https://p0.ssl.qhimg.com/t010a96ab728cf221e6.png" alt=""></p>
<p>用 advanceSnake 函数来更新蛇的状态。</p>
<pre><code class="hljs actionscript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">advanceSnake</span><span class="hljs-params">()</span> </span>{
  <span class="hljs-keyword">const</span> head = {x: snake[<span class="hljs-number">0</span>].x + dx, y: snake[<span class="hljs-number">0</span>].y};
  snake.unshift(head);
  snake.pop();
}
</code></pre><p>首先，我们为蛇画了个新头。然后使用 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift">unshift</a> 方法将新头放在<strong>蛇</strong>的第一个部位，然后使用 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop">pop</a> 方法移除<strong>蛇</strong>的最后一部分。这样以后，如上图所示，所有蛇身上其他部位都移动到了对应位置。</p>
<p>Boom 💥，你已经找到窍门了吧。</p>
<h3>让贪食蛇纵向移动</h3>
<p>为了让蛇能够上下移动，我们不能直接将蛇的所有 y 坐标调整 10 px。那会让整条蛇上下移动。</p>
<p><img src="https://p0.ssl.qhimg.com/t01f60003f8d1d05646.gif" alt=""></p>
<p>相反，我们可以调整蛇头的 y 坐标。减少 10 px 蛇会向下移动，增加 10 px 蛇会向上移动。这样就能让蛇正确地移动了。</p>
<p>幸运的是，因为我们编写的 advanceSnake 函数很棒，所以这很容易做到。在 advanceSnake 函数中，更新 head 让 y 坐标随着 <strong>dy</strong> 变化。</p>
<pre><code class="hljs roboconf">const head = {<span class="hljs-attribute">x</span>: snake[0]<span class="hljs-variable">.x</span> + dx, y: snake[0]<span class="hljs-variable">.y</span> + dy};
</code></pre><p>为了验证 advanceSnake 函数是否正确，我们可以临时性地在 drawSnake 函数前调用它。</p>
<pre><code class="hljs lsl"><span class="hljs-comment">// 向右走一步</span>
advanceSnake()
<span class="hljs-comment">// 水平速度改为 0</span>
dx = <span class="hljs-number">0</span>;
<span class="hljs-comment">// 垂直速度改为 10</span>
dy = <span class="hljs-number">-10</span>;
<span class="hljs-comment">// 向上走一步</span>
advanceSnake();
<span class="hljs-comment">// 在画布上画蛇</span>
drawSnake();

</code></pre><p>现在 snake.html 代码如下：</p>
<pre><code class="hljs xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Snake Game<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"gameCanvas"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"300"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"300"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
      <span class="hljs-comment">/** 常量 **/</span>
      <span class="hljs-keyword">const</span> CANVAS_BORDER_COLOUR = <span class="hljs-string">'black'</span>;
      <span class="hljs-keyword">const</span> CANVAS_BACKGROUND_COLOUR = <span class="hljs-string">"white"</span>;
      <span class="hljs-keyword">const</span> SNAKE_COLOUR = <span class="hljs-string">'lightgreen'</span>;
      <span class="hljs-keyword">const</span> SNAKE_BORDER_COLOUR = <span class="hljs-string">'darkgreen'</span>;

      <span class="hljs-keyword">let</span> snake = [
        {<span class="hljs-attr">x</span>: <span class="hljs-number">150</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">150</span>},
        {<span class="hljs-attr">x</span>: <span class="hljs-number">140</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">150</span>},
        {<span class="hljs-attr">x</span>: <span class="hljs-number">130</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">150</span>},
        {<span class="hljs-attr">x</span>: <span class="hljs-number">120</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">150</span>},
        {<span class="hljs-attr">x</span>: <span class="hljs-number">110</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">150</span>}
      ]

      <span class="hljs-comment">// 横向移动速度</span>
      <span class="hljs-keyword">let</span> dx = <span class="hljs-number">10</span>;
      <span class="hljs-comment">// 纵向移动速度</span>
      <span class="hljs-keyword">let</span> dy = <span class="hljs-number">0</span>;

      <span class="hljs-comment">// 获取 canvas 元素</span>
      <span class="hljs-keyword">var</span> gameCanvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"gameCanvas"</span>);
      <span class="hljs-comment">// 返回一个二维绘制上下文</span>
      <span class="hljs-keyword">var</span> ctx = gameCanvas.getContext(<span class="hljs-string">"2d"</span>);
      <span class="hljs-comment">//  选择画布的背景颜色</span>
      ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
      <span class="hljs-comment">//  选择画布的边框颜色</span>
      ctx.strokestyle = CANVAS_BORDER_COLOUR;
      <span class="hljs-comment">// 绘制一个“实心的”长方形来覆盖整个画布</span>
      ctx.fillRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, gameCanvas.width, gameCanvas.height);
      <span class="hljs-comment">// 绘制画布的“边框”</span>
      ctx.strokeRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, gameCanvas.width, gameCanvas.height);

      <span class="hljs-comment">// 向右走一步</span>
      advanceSnake()
      <span class="hljs-comment">// 水平速度改为 0</span>
      dx = <span class="hljs-number">0</span>;
      <span class="hljs-comment">// 垂直速度改为 10</span>
      dy = <span class="hljs-number">-10</span>;
      <span class="hljs-comment">// 向上走一步</span>
      advanceSnake();
      <span class="hljs-comment">// 在画布上画蛇</span>
      drawSnake();

      <span class="hljs-comment">/**
        * 根据蛇的水平移动速度改变蛇的 x 坐标，
        * 根据蛇的垂直移动速度改变蛇的 y 坐标
        */</span>
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">advanceSnake</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">const</span> head = {<span class="hljs-attr">x</span>: snake[<span class="hljs-number">0</span>].x + dx, <span class="hljs-attr">y</span>: snake[<span class="hljs-number">0</span>].y + dy};
        snake.unshift(head);
        snake.pop();
      }

      <span class="hljs-comment">/**
       * 在画布上画蛇
       */</span>
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawSnake</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 循环遍历蛇的每一部分，并将其绘制到画布上</span>
        snake.forEach(drawSnakePart)
      }
      <span class="hljs-comment">/**
       * 在画布上画蛇的一个部分
       * @param { object } snakePart —— 需要绘制的部位的所在坐标
       */</span>
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawSnakePart</span>(<span class="hljs-params">snakePart</span>) </span>{
        <span class="hljs-comment">// 设置蛇身体的背景颜色</span>
        ctx.fillStyle = SNAKE_COLOUR;
        <span class="hljs-comment">// 设置蛇身的边框色</span>
        ctx.strokestyle = SNAKE_BORDER_COLOUR;
        <span class="hljs-comment">// 在蛇身坐标所在的位置，绘制“实心”的矩形以表示蛇    </span>
        ctx.fillRect(snakePart.x, snakePart.y, <span class="hljs-number">10</span>, <span class="hljs-number">10</span>);
        <span class="hljs-comment">// 绘制蛇身的边框</span>
        ctx.strokeRect(snakePart.x, snakePart.y, <span class="hljs-number">10</span>, <span class="hljs-number">10</span>);
      }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre><p>刷新页面，蛇动了。恭喜！</p>
<p><img src="https://p0.ssl.qhimg.com/t01058946718ea792e4.png" alt=""></p>
<h3>重构代码</h3>
<p>在继续下一步之前，让我们重构一下现有代码，将绘制画布的代码封装在一个函数中。这有助于完成下一步。</p>
<blockquote>
<p><strong>代码重构</strong>是重构现有计算机<strong>代码</strong>的过程，同时不改变其外部行为。” —— <a href="https://en.wikipedia.org/wiki/Code_refactoring">维基百科</a></p>
</blockquote>
<pre><code class="hljs arduino">function clearCanvas() {
  ctx.fillStyle = <span class="hljs-string">"white"</span>;
  ctx.strokeStyle = <span class="hljs-string">"black"</span>;
  ctx.fillRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, gameCanvas.<span class="hljs-built_in">width</span>, gameCanvas.<span class="hljs-built_in">height</span>);
  ctx.strokeRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, gameCanvas.<span class="hljs-built_in">width</span>, gameCanvas.<span class="hljs-built_in">height</span>);
}
</code></pre><p>我们正在大踏步前进！🐾</p>
<h3>让贪食蛇自动移动</h3>
<p>好的，既然我们已经成功地重构了代码，那么接下来让贪食蛇能够自动移动吧。</p>
<p>之前为了测试 advanceSnake 函数是否正确，我们调用了它两次。一次为了让蛇向右移动，一次为了让它向上移动。</p>
<p>因此如果想要让蛇右移五次，那么我们需要连续调用 advanceSnake() 函数五次。</p>
<pre><code class="hljs abnf">clearCanvas()<span class="hljs-comment">;</span>
advanceSnake()<span class="hljs-comment">;</span>
advanceSnake()<span class="hljs-comment">;</span>
advanceSnake()<span class="hljs-comment">;</span>
advanceSnake()<span class="hljs-comment">;</span>
advanceSnake()<span class="hljs-comment">;</span>
drawSnake()<span class="hljs-comment">;</span>
</code></pre><p>但是，如上所示连续五次调用 advanceSnake 函数会让蛇一下子向前跳 50 px。</p>
<p><img src="https://p0.ssl.qhimg.com/t01e97ff3c91820df28.gif" alt=""></p>
<p>相反，我们想让蛇看起来像是一步一步地前进。</p>
<p>为此，我们用 <a href="https://www.w3schools.com/Jsref/met_win_settimeout.asp">setTimeout</a> 在每次调用之间添加一个短暂的延时。我们还需要确保每次调用 advanceSnake 函数时都调用 drawSnake 函数。如果我们不这样做，我们将无法看到蛇移动的中间步骤。</p>
<pre><code class="hljs mipsasm">setTimeout(function onTick() {
  clearCanvas()<span class="hljs-comment">;</span>
  advanceSnake()<span class="hljs-comment">;</span>
  drawSnake()<span class="hljs-comment">;</span>
}, <span class="hljs-number">100</span>)<span class="hljs-comment">;</span>
setTimeout(function onTick() {
  clearCanvas()<span class="hljs-comment">;</span>
  advanceSnake()<span class="hljs-comment">;</span>
  drawSnake()<span class="hljs-comment">;</span>
}, <span class="hljs-number">100</span>)<span class="hljs-comment">;</span>
...
drawSnake()<span class="hljs-comment">;</span>

</code></pre><p>注意我们同样在每个 setTimeout 中调用了 clearCanvas() 函数。这是为了移除蛇先前所有的位置，以免留下痕迹。</p>
<p><img src="https://p0.ssl.qhimg.com/t0109fcd2ed761bc8b1.png" alt=""></p>
<p>尽管如此，上述代码仍然有问题。没有任何代码告诉程序它必须等待一个 <strong>setTimeout</strong> 完成后才能移动到下一个<strong>setTimeout</strong>。也就是说蛇<strong>仍然</strong>会在<strong>一个短暂延迟</strong>后向前跳 50 px。</p>
<p>要解决这个问题，我们必须将代码包装在函数中，每次只调用一个函数。</p>
<pre><code class="hljs actionscript">stepOne();

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">stepOne</span><span class="hljs-params">()</span> </span>{
  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onTick</span><span class="hljs-params">()</span> </span>{
    clearCanvas();
    advanceSnake();
    drawSnake();
   <span class="hljs-comment">// 调用第二个函数</span>
   stepTwo();
  }, <span class="hljs-number">100</span>)
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">stepTwo</span><span class="hljs-params">()</span> </span>{
  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onTick</span><span class="hljs-params">()</span> </span>{
    clearCanvas();
    advanceSnake();
    drawSnake();
    <span class="hljs-comment">// 调用第三个函数</span>
    stepThree();
  }, <span class="hljs-number">100</span>)
}
...
</code></pre><p>如何让贪食蛇一直前进？我们可以改为创建一个 main 函数并递归调用它，而不是创建无数个相互调用的函数。</p>
<pre><code class="hljs actionscript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span><span class="hljs-params">()</span> </span>{
  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onTick</span><span class="hljs-params">()</span> </span>{
    clearCanvas();
    advanceSnake();
    drawSnake();
    <span class="hljs-comment">// 再次调用 main 函数</span>
    main();
  }, <span class="hljs-number">100</span>)
}
</code></pre><p>看啊！贪食蛇现在会一直向右移动。虽然一旦它到达画布的尽头，将继续其无尽的旅程并进入未知的地方😅。我们将在适当的时候解决这个问题，耐心点年轻的朋友们。🙏。</p>
<p><img src="https://p0.ssl.qhimg.com/t0105917546eadd03c1.gif" alt=""></p>
<h3>调整蛇的移动方向</h3>
<p>我们的下一个任务是在按下任意方向键时更改蛇的移动方向。在 drawSnakePart 函数之后添加以下代码。</p>
<pre><code class="hljs nix">function changeDirection(event) {
  const <span class="hljs-attr">LEFT_KEY</span> = <span class="hljs-number">37</span>;
  const <span class="hljs-attr">RIGHT_KEY</span> = <span class="hljs-number">39</span>;
  const <span class="hljs-attr">UP_KEY</span> = <span class="hljs-number">38</span>;
  const <span class="hljs-attr">DOWN_KEY</span> = <span class="hljs-number">40</span>;
  const <span class="hljs-attr">keyPressed</span> = event.keyCode;
  const <span class="hljs-attr">goingUp</span> = <span class="hljs-attr">dy</span> === -<span class="hljs-number">10</span>;
  const <span class="hljs-attr">goingDown</span> = <span class="hljs-attr">dy</span> === <span class="hljs-number">10</span>;
  const <span class="hljs-attr">goingRight</span> = <span class="hljs-attr">dx</span> === <span class="hljs-number">10</span>;
  const <span class="hljs-attr">goingLeft</span> = <span class="hljs-attr">dx</span> === -<span class="hljs-number">10</span>;
  <span class="hljs-keyword">if</span> (<span class="hljs-attr">keyPressed</span> === LEFT_KEY &amp;&amp; !goingRight) {
    <span class="hljs-attr">dx</span> = -<span class="hljs-number">10</span>;
    <span class="hljs-attr">dy</span> = <span class="hljs-number">0</span>;
  }
  <span class="hljs-keyword">if</span> (<span class="hljs-attr">keyPressed</span> === UP_KEY &amp;&amp; !goingDown) {
    <span class="hljs-attr">dx</span> = <span class="hljs-number">0</span>;
    <span class="hljs-attr">dy</span> = -<span class="hljs-number">10</span>;
  }
  <span class="hljs-keyword">if</span> (<span class="hljs-attr">keyPressed</span> === RIGHT_KEY &amp;&amp; !goingLeft) {
    <span class="hljs-attr">dx</span> = <span class="hljs-number">10</span>;
    <span class="hljs-attr">dy</span> = <span class="hljs-number">0</span>;
  }
  <span class="hljs-keyword">if</span> (<span class="hljs-attr">keyPressed</span> === DOWN_KEY &amp;&amp; !goingDown) {
    <span class="hljs-attr">dx</span> = <span class="hljs-number">0</span>;
    <span class="hljs-attr">dy</span> = <span class="hljs-number">10</span>;
  }
}
</code></pre><p>这没有什么特别的。我们检查按下的键是否与其中一个方向键匹配。如果匹配到，我们如上所述改变垂直和水平速度。</p>
<p>请注意，我们还要检查蛇是否往新预期方向的相反方向上移动。这是为了防止我们的蛇掉头，例如当蛇向<strong>左</strong>移动时按下<strong>右</strong>键。</p>
<p><img src="https://p0.ssl.qhimg.com/t0184be9b4be117a78f.gif" alt=""></p>
<p>要将 changeDirection  加到游戏代码中，可以在 <a href="https://www.w3schools.com/Jsref/dom_obj_document.asp">document</a>  上使用  <a href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener">addEventListener</a>  来“监听”是否有键被按下。然后我们随着 <a href="https://developer.mozilla.org/en-US/docs/Web/Events/keydown">keydown</a>  事件调用 changeDirection 方法。接着在 main 函数之后添加以下代码。</p>
<pre><code class="hljs coffeescript"><span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">"keydown"</span>, changeDirection)
</code></pre><p>你现在应该可以使用四个方向键更改蛇的方向。干得漂亮，你火了🔥！</p>
<p>接下来让我们看看如何生成食物并让我们的蛇长大。</p>
<h3>为蛇生成食物</h3>
<p>为了生成蛇食，我们必须生成一组随机坐标。我们可以使用辅助函数 randomTen 来生成两个数字。一个用于 x 坐标，一个用于 y 坐标。</p>
<p>我们还必须确保食物不与蛇的位置重叠。如果重叠了，我们必须生成一个新的食物位置。</p>
<pre><code class="hljs lua"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">randomTen</span><span class="hljs-params">(min, max)</span></span> {
  <span class="hljs-keyword">return</span> Math.round((Math.<span class="hljs-built_in">random</span>() * (<span class="hljs-built_in">max</span>-<span class="hljs-built_in">min</span>) + <span class="hljs-built_in">min</span>) / <span class="hljs-number">10</span>) * <span class="hljs-number">10</span>;
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createFood</span><span class="hljs-params">()</span></span> {
  foodX = randomTen(<span class="hljs-number">0</span>, gameCanvas.width - <span class="hljs-number">10</span>);
  foodY = randomTen(<span class="hljs-number">0</span>, gameCanvas.height - <span class="hljs-number">10</span>);
  snake.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isFoodOnSnake</span><span class="hljs-params">(part)</span></span> {
    const foodIsOnSnake = part.x == foodX &amp;&amp; part.y == foodY
    <span class="hljs-keyword">if</span> (foodIsOnSnake)
      createFood();
  });
}
</code></pre><p>然后我们需要写一个在画布上绘制食物的函数。</p>
<pre><code class="hljs actionscript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawFood</span><span class="hljs-params">()</span> </span>{
 ctx.fillStyle = <span class="hljs-string">'red'</span>;
 ctx.strokestyle = <span class="hljs-string">'darkred'</span>;
 ctx.fillRect(foodX, foodY, <span class="hljs-number">10</span>, <span class="hljs-number">10</span>);
 ctx.strokeRect(foodX, foodY, <span class="hljs-number">10</span>, <span class="hljs-number">10</span>);
}
</code></pre><p>最后我们可以在调用 main 之前调用 createFood。别忘了还要更新 main 函数以调用 drawFood 函数。</p>
<pre><code class="hljs actionscript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span><span class="hljs-params">()</span> </span>{
  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onTick</span><span class="hljs-params">()</span> </span>{
    clearCanvas();
    drawFood()
    advanceSnake();
    drawSnake();
    main();
  }, <span class="hljs-number">100</span>)
}
</code></pre><h3>让蛇长大</h3>
<p>让蛇长大很简单。更新 advanceSnake 函数，检查蛇头是否碰到了食物。如果碰到了，我们可以跳过移除蛇的最后部分这一操作，同时创建一个新的食物位置。</p>
<pre><code class="hljs actionscript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">advanceSnake</span><span class="hljs-params">()</span> </span>{
  <span class="hljs-keyword">const</span> head = {x: snake[<span class="hljs-number">0</span>].x + dx, y: snake[<span class="hljs-number">0</span>].y};
  snake.unshift(head);
  <span class="hljs-keyword">const</span> didEatFood = snake[<span class="hljs-number">0</span>].x === foodX &amp;&amp; snake[<span class="hljs-number">0</span>].y === foodY;
  <span class="hljs-keyword">if</span> (didEatFood) {
    createFood();
  } <span class="hljs-keyword">else</span> {
    snake.pop();
  }
}
</code></pre><h4>记录游戏分数</h4>
<p>为了让游戏更有乐趣，我们还可以添加一个分数，当蛇吃食物时分数增加。</p>
<p>在声明了 snake 后，创建一个新的变量 score，并将其设为 0。</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">let score</span> = 0;
</code></pre><p>接下来在画布前添加一个 id 为“score”的新 div，用于显示分数。</p>
<pre><code class="hljs routeros">&lt;div <span class="hljs-attribute">id</span>=<span class="hljs-string">"score"</span>&gt;0&lt;/div&gt;
&lt;canvas <span class="hljs-attribute">id</span>=<span class="hljs-string">"gameCanvas"</span> <span class="hljs-attribute">width</span>=<span class="hljs-string">"300"</span> <span class="hljs-attribute">height</span>=<span class="hljs-string">"300"</span>&gt;&lt;/canvas&gt;
</code></pre><p>最后更新 advanceSnake， 当蛇吃食物时，增加并显示分数。</p>
<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">advanceSnake</span>(<span class="hljs-params"></span>) </span>{
  ...
  if (didEatFood) {
    score += <span class="hljs-number">10</span>;
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'score'</span>).innerHTML = score;
    createFood();
  } <span class="hljs-keyword">else</span> {
    ...
  }
}
</code></pre><p>呼…真不容易，不过胜利就在眼前了 😌</p>
<h3>结束游戏</h3>
<p>还剩下最后一部分，那就是结束游戏🖐。为此创建一个函数 didGameEnd，当游戏结束时返回 <strong>true</strong>，否则返回 <strong>false</strong>。</p>
<pre><code class="hljs javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">didGameEnd</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">4</span>; i &lt; snake.length; i++) {
    <span class="hljs-keyword">const</span> didCollide = snake[i].x === snake[<span class="hljs-number">0</span>].x &amp;&amp;
      snake[i].y === snake[<span class="hljs-number">0</span>].y
    <span class="hljs-keyword">if</span> (didCollide) <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
  }
  <span class="hljs-keyword">const</span> hitLeftWall = snake[<span class="hljs-number">0</span>].x &lt; <span class="hljs-number">0</span>;
  <span class="hljs-keyword">const</span> hitRightWall = snake[<span class="hljs-number">0</span>].x &gt; gameCanvas.width - <span class="hljs-number">10</span>;
  <span class="hljs-keyword">const</span> hitToptWall = snake[<span class="hljs-number">0</span>].y &lt; <span class="hljs-number">0</span>;
  <span class="hljs-keyword">const</span> hitBottomWall = snake[<span class="hljs-number">0</span>].y &gt; gameCanvas.height - <span class="hljs-number">10</span>;
  <span class="hljs-keyword">return</span> hitLeftWall || 
         hitRightWall || 
         hitToptWall ||
         hitBottomWall
} 
</code></pre><p>首先，我们检查蛇的头部是否碰到蛇身上其他部分，如果碰到了那么返回 <strong>true</strong>。</p>
<blockquote>
<p>请注意，我们从索引值 4 开始循环。这有两个原因：一个是如果索引为 0，<strong>didCollide</strong> 则会立即判断为 true，导致游戏结束。另一个是，蛇的前三个部分不可能相互接触。</p>
</blockquote>
<p>接下来我们检查蛇是否在画布上撞墙了，如果是，那么返回 <strong>true</strong>，否则返回 <strong>false </strong>。</p>
<p>现在，如果 didEndGame 返回 true，我们可以在主函数中提前返回，从而结束游戏。</p>
<pre><code class="hljs actionscript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span><span class="hljs-params">()</span> </span>{
  <span class="hljs-keyword">if</span> (didGameEnd()) <span class="hljs-keyword">return</span>;
  ...
}
</code></pre><p>snake.html 现在应该是这样的：</p>
<pre><code class="hljs xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Snake Game<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"score"</span>&gt;</span>0<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"gameCanvas"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"300"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"300"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
      <span class="hljs-comment">/** 常量 **/</span>
      <span class="hljs-keyword">const</span> CANVAS_BORDER_COLOUR = <span class="hljs-string">'black'</span>;
      <span class="hljs-keyword">const</span> CANVAS_BACKGROUND_COLOUR = <span class="hljs-string">"white"</span>;
      <span class="hljs-keyword">const</span> SNAKE_COLOUR = <span class="hljs-string">'lightgreen'</span>;
      <span class="hljs-keyword">const</span> SNAKE_BORDER_COLOUR = <span class="hljs-string">'darkgreen'</span>;
      <span class="hljs-keyword">const</span> FOOD_COLOUR = <span class="hljs-string">'red'</span>;
      <span class="hljs-keyword">const</span> FOOD_BORDER_COLOUR = <span class="hljs-string">'darkred'</span>;
      <span class="hljs-keyword">let</span> snake = [
        {<span class="hljs-attr">x</span>: <span class="hljs-number">150</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">150</span>},
        {<span class="hljs-attr">x</span>: <span class="hljs-number">140</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">150</span>},
        {<span class="hljs-attr">x</span>: <span class="hljs-number">130</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">150</span>},
        {<span class="hljs-attr">x</span>: <span class="hljs-number">120</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">150</span>},
        {<span class="hljs-attr">x</span>: <span class="hljs-number">110</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">150</span>}
      ]
      <span class="hljs-comment">// 玩家的分数</span>
      <span class="hljs-keyword">let</span> score = <span class="hljs-number">0</span>;
      <span class="hljs-comment">// 横向移动速度</span>
      <span class="hljs-keyword">let</span> dx = <span class="hljs-number">10</span>;
      <span class="hljs-comment">// 纵向移动速度</span>
      <span class="hljs-keyword">let</span> dy = <span class="hljs-number">0</span>;
      <span class="hljs-comment">// 获取 canvas 元素</span>
      <span class="hljs-keyword">var</span> gameCanvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"gameCanvas"</span>);
      <span class="hljs-comment">// 返回一个二维绘制上下文</span>
      <span class="hljs-keyword">var</span> ctx = gameCanvas.getContext(<span class="hljs-string">"2d"</span>);
      <span class="hljs-comment">//  选择画布的背景颜色</span>
      ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
      <span class="hljs-comment">//  选择画布的边框颜色</span>
      ctx.strokestyle = CANVAS_BORDER_COLOUR;
      <span class="hljs-comment">// 绘制一个“实心的”长方形来覆盖整个画布</span>
      ctx.fillRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, gameCanvas.width, gameCanvas.height);
      <span class="hljs-comment">// 绘制画布的“边框”</span>
      ctx.strokeRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, gameCanvas.width, gameCanvas.height);
      <span class="hljs-comment">// 开始游戏</span>
      main();
      <span class="hljs-comment">// 生成第一个食物位置</span>
      createFood();
      <span class="hljs-comment">// 按下任意一个键，都会调用 changeDirection</span>
      <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">"keydown"</span>, changeDirection);
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (didGameEnd()) <span class="hljs-keyword">return</span>;
        setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onTick</span>(<span class="hljs-params"></span>) </span>{
          clearCanvas();
          drawFood();
          advanceSnake();
          drawSnake();
          <span class="hljs-comment">// Call main again</span>
          main();
        }, <span class="hljs-number">100</span>)
      }
      <span class="hljs-comment">/**
      * 设置画布的背景色为 CANVAS_BACKGROUND_COLOUR 
      * 并绘制画布的边框
      */</span>
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">clearCanvas</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">//  选择画布的背景颜色</span>
        ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
        <span class="hljs-comment">//  选择画布的边框颜色</span>
        ctx.strokestyle = CANVAS_BORDER_COLOUR;
        <span class="hljs-comment">// 绘制一个“实心的”长方形来覆盖整个画布</span>
        ctx.fillRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, gameCanvas.width, gameCanvas.height);
        <span class="hljs-comment">// 绘制画布的“边框”</span>
        ctx.strokeRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, gameCanvas.width, gameCanvas.height);
      }
      <span class="hljs-comment">/**
       * 当蛇撞墙或者蛇头碰到蛇身的时候返回 true
       */</span>
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">didGameEnd</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">4</span>; i &lt; snake.length; i++) {
          <span class="hljs-keyword">const</span> didCollide = snake[i].x === snake[<span class="hljs-number">0</span>].x &amp;&amp; snake[i].y === snake[<span class="hljs-number">0</span>].y
          <span class="hljs-keyword">if</span> (didCollide) <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
        }
        <span class="hljs-keyword">const</span> hitLeftWall = snake[<span class="hljs-number">0</span>].x &lt; <span class="hljs-number">0</span>;
        <span class="hljs-keyword">const</span> hitRightWall = snake[<span class="hljs-number">0</span>].x &gt; gameCanvas.width - <span class="hljs-number">10</span>;
        <span class="hljs-keyword">const</span> hitToptWall = snake[<span class="hljs-number">0</span>].y &lt; <span class="hljs-number">0</span>;
        <span class="hljs-keyword">const</span> hitBottomWall = snake[<span class="hljs-number">0</span>].y &gt; gameCanvas.height - <span class="hljs-number">10</span>;
        <span class="hljs-keyword">return</span> hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
      }
      <span class="hljs-comment">/**
       * 在画布上画食物
       */</span>
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawFood</span>(<span class="hljs-params"></span>) </span>{
        ctx.fillStyle = FOOD_COLOUR;
        ctx.strokestyle = FOOD_BORDER_COLOUR;
        ctx.fillRect(foodX, foodY, <span class="hljs-number">10</span>, <span class="hljs-number">10</span>);
        ctx.strokeRect(foodX, foodY, <span class="hljs-number">10</span>, <span class="hljs-number">10</span>);
      }
      <span class="hljs-comment">/**
       * 根据蛇的水平移动速度改变蛇的 x 坐标，
       * 根据蛇的垂直移动速度改变蛇的 y 坐标
       */</span>
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">advanceSnake</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 绘制新的头部</span>
        <span class="hljs-keyword">const</span> head = {<span class="hljs-attr">x</span>: snake[<span class="hljs-number">0</span>].x + dx, <span class="hljs-attr">y</span>: snake[<span class="hljs-number">0</span>].y + dy};
        <span class="hljs-comment">// 将新的头部放到蛇身体的第一个部位</span>
        snake.unshift(head);
        <span class="hljs-keyword">const</span> didEatFood = snake[<span class="hljs-number">0</span>].x === foodX &amp;&amp; snake[<span class="hljs-number">0</span>].y === foodY;
        <span class="hljs-keyword">if</span> (didEatFood) {
          <span class="hljs-comment">// 增加分数</span>
          score += <span class="hljs-number">10</span>;
          <span class="hljs-comment">// 在屏幕上显示分数</span>
          <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'score'</span>).innerHTML = score;
          <span class="hljs-comment">// 生成新的食物</span>
          createFood();
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-comment">// 移除蛇的最后一个部分</span>
          snake.pop();
        }
      }
      <span class="hljs-comment">/**
        * 给定一个最大值和最小值，生成一个 10 的倍数的随机数     
        * @param { number } min —— 随机数的下限
        * @param { number } max —— 随机数的上限
       */</span>
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">randomTen</span>(<span class="hljs-params">min, max</span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.round((<span class="hljs-built_in">Math</span>.random() * (max-min) + min) / <span class="hljs-number">10</span>) * <span class="hljs-number">10</span>;
      }
     <span class="hljs-comment">/**     
      * 随机生成食物坐标
      */</span>
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createFood</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 随机生成食物的 x 坐标</span>
        foodX = randomTen(<span class="hljs-number">0</span>, gameCanvas.width - <span class="hljs-number">10</span>);
        <span class="hljs-comment">// 随机生成食物的 y 坐标</span>
        foodY = randomTen(<span class="hljs-number">0</span>, gameCanvas.height - <span class="hljs-number">10</span>);
        <span class="hljs-comment">// 如果新生成的食物与蛇当前位置重叠，重新为食物生成一个位置</span>
        snake.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isOnSnake</span>(<span class="hljs-params">part</span>) </span>{
          <span class="hljs-keyword">if</span> (part.x == foodX &amp;&amp; part.y == foodY) createFood();
        });
      }
      <span class="hljs-comment">/**
       * 在画布上画蛇
       */</span>
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawSnake</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 循环遍历蛇的每一部分，并将其绘制到画布上</span>
        snake.forEach(drawSnakePart)
      }
      <span class="hljs-comment">/**
       * 在画布上画蛇的一个部分
       * @param { object } snakePart  —— 需要绘制的部位的所在坐标
       */</span>
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawSnakePart</span>(<span class="hljs-params">snakePart</span>) </span>{
        <span class="hljs-comment">// 设置蛇身体的背景颜色</span>
        ctx.fillStyle = SNAKE_COLOUR;
        <span class="hljs-comment">// 设置蛇身的边框色</span>
        ctx.strokestyle = SNAKE_BORDER_COLOUR;
        <span class="hljs-comment">// 在蛇身坐标所在的位置，绘制“实心”的矩形以表示蛇      </span>
        ctx.fillRect(snakePart.x, snakePart.y, <span class="hljs-number">10</span>, <span class="hljs-number">10</span>);
        <span class="hljs-comment">// 绘制蛇身的边框</span>
        ctx.strokeRect(snakePart.x, snakePart.y, <span class="hljs-number">10</span>, <span class="hljs-number">10</span>);
      }
      <span class="hljs-comment">/**     
      * 根据按下的键，改变蛇的水平移动速度和垂直移动速度
      * 为了避免蛇反转，蛇的移动方向不能直接变成相反的方向，
      * 比如说，当前方向是“向右”，那么下一个方向不能是“向左”
      * @param { object } event —— 键盘事件
      */</span>
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">changeDirection</span>(<span class="hljs-params">event</span>) </span>{
        <span class="hljs-keyword">const</span> LEFT_KEY = <span class="hljs-number">37</span>;
        <span class="hljs-keyword">const</span> RIGHT_KEY = <span class="hljs-number">39</span>;
        <span class="hljs-keyword">const</span> UP_KEY = <span class="hljs-number">38</span>;
        <span class="hljs-keyword">const</span> DOWN_KEY = <span class="hljs-number">40</span>;
        <span class="hljs-keyword">const</span> keyPressed = event.keyCode;
        <span class="hljs-keyword">const</span> goingUp = dy === <span class="hljs-number">-10</span>;
        <span class="hljs-keyword">const</span> goingDown = dy === <span class="hljs-number">10</span>;
        <span class="hljs-keyword">const</span> goingRight = dx === <span class="hljs-number">10</span>;
        <span class="hljs-keyword">const</span> goingLeft = dx === <span class="hljs-number">-10</span>;
        <span class="hljs-keyword">if</span> (keyPressed === LEFT_KEY &amp;&amp; !goingRight) {
          dx = <span class="hljs-number">-10</span>;
          dy = <span class="hljs-number">0</span>;
        }
        <span class="hljs-keyword">if</span> (keyPressed === UP_KEY &amp;&amp; !goingDown) {
          dx = <span class="hljs-number">0</span>;
          dy = <span class="hljs-number">-10</span>;
        }
        <span class="hljs-keyword">if</span> (keyPressed === RIGHT_KEY &amp;&amp; !goingLeft) {
          dx = <span class="hljs-number">10</span>;
          dy = <span class="hljs-number">0</span>;
        }
        <span class="hljs-keyword">if</span> (keyPressed === DOWN_KEY &amp;&amp; !goingUp) {
          dx = <span class="hljs-number">0</span>;
          dy = <span class="hljs-number">10</span>;
        }
      }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre><p>现在贪食蛇游戏已经可以玩了，你可以独乐乐或者分享给你的朋友。不过在庆祝之前，我们还是来看看最后一个问题。我保证，这绝对是最后一个。</p>
<h3>潜藏的 bugs 🐛</h3>
<p>如果你玩了足够多次游戏，可能会注意到游戏有时会意外结束。这是一个很好的例子，展示了 bug 会潜入我们的程序并制造麻烦🙄。</p>
<p>发现 bug 的时候，解决它的最好方法是首先找到可靠的方法来重现它。也就是说，找到导致意外行为的精确步骤。然后，需要了解它们导致意外行为的原因，最后寻求解决方案。</p>
<h4>重现 bug</h4>
<p>在我们的例子中，重现 bug 的步骤如下：</p>
<ul>
<li>蛇正向左移动</li>
<li>玩家按下向下键</li>
<li>玩家立即按下向右键（在 100 ms 内）</li>
<li>游戏结束</li>
</ul>
<p><img src="https://p0.ssl.qhimg.com/t01f5db14e92f238906.gif" alt=""></p>
<h4>分析导致 bug 的原因</h4>
<p>让我们一步步分解 bug 产生的过程。</p>
<p><strong>蛇正在向左移动</strong></p>
<ul>
<li>水平速度，dx 等于 -10</li>
<li>调用 main 函数</li>
<li>调用 advanceSnake 函数，蛇向左移动 10 px。</li>
</ul>
<p><strong>玩家按下向下键</strong></p>
<ul>
<li>调用 changeDirection</li>
<li><code>keyPressed === DOWN_KEY &amp;&amp;  !goingUp</code> 的值为 true</li>
<li>dx 更改为 0</li>
<li>dy 更改为 +10</li>
</ul>
<p><strong>玩家立即按下向右键（在 100 ms 内）</strong></p>
<ul>
<li>调用 changeDirection</li>
<li><code>keyPressed === RIGHT_KEY &amp;&amp; !goingLeft</code> 的值为 true</li>
<li>dx 更改为 +10</li>
<li>dy 更改为 0</li>
</ul>
<p><strong>游戏结束</strong></p>
<ul>
<li>main 函数<strong>延时 100 ms 后</strong>被调用</li>
<li>调用 advanceSnake，蛇向右移动 10 px。</li>
<li><code>const didCollide = snake[i].x === snake[0].x &amp;&amp; snake[i].y === snake[0].y</code> 的值为true</li>
<li>didGameEnd 返回 true</li>
<li>main 函数提前返回</li>
<li>游戏结束</li>
</ul>
<h4>解决 bug</h4>
<p>在分析了发生的事情之后，我们了解到游戏结束是因为蛇掉头了。</p>
<p>这是因为当玩家按下向下键时，dx 被设置为 0。因此 <code>keyPressed === RIGHT_KEY &amp;&amp; !goingLeft</code> 值为 true，同时 dx 更改为 10。</p>
<p>重要的是要注意，在 <strong>100 ms 时间内</strong>，方向改变了。如果超过 100 ms，那么蛇首先会向下移而不会掉头。</p>
<p>为了解决这个 bug，必须确保只有在 main 和 advanceSnake 被调用之后，才可以改变蛇的方向。可以创建一个变量 <strong>changingDirection。</strong>当调用 changeDirection 时设置 changingDirection 为 true，并在调用 advanceSnake 时设置为 false。</p>
<p>在 changeDirection 函数中，如果 <strong>changingDirection</strong> 为 true，就提前返回。</p>
<pre><code class="hljs actionscript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">changeDirection</span><span class="hljs-params">(event)</span> </span>{
  <span class="hljs-keyword">const</span> LEFT_KEY = <span class="hljs-number">37</span>;
  <span class="hljs-keyword">const</span> RIGHT_KEY = <span class="hljs-number">39</span>;
  <span class="hljs-keyword">const</span> UP_KEY = <span class="hljs-number">38</span>;
  <span class="hljs-keyword">const</span> DOWN_KEY = <span class="hljs-number">40</span>;
  <span class="hljs-keyword">if</span> (changingDirection) <span class="hljs-keyword">return</span>;
  changingDirection = <span class="hljs-literal">true</span>;
  ...
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span><span class="hljs-params">()</span> </span>{
  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onTick</span><span class="hljs-params">()</span> </span>{
    changingDirection = <span class="hljs-literal">false</span>;

    ...
  }, <span class="hljs-number">100</span>)
}
</code></pre><p>以下是 snake.html 的最终版本</p>
<blockquote>
<p>注意我还在 <code>&lt;style&gt;&lt;/style&gt;</code> 标签之间添加了一些样式🎨。这是为了让画布和分数显示在屏幕中间。</p>
</blockquote>
<pre><code class="hljs xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Snake Game<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://fonts.googleapis.com/css?family=Antic+Slab"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span>&gt;</span>

  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"score"</span>&gt;</span>0<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"gameCanvas"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"300"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"300"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
      <span class="hljs-selector-id">#gameCanvas</span> {
        <span class="hljs-attribute">position</span>: absolute;
        <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
        <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-50%, -50%);
      }
      <span class="hljs-selector-id">#score</span> {
        <span class="hljs-attribute">text-align</span>: center;
        <span class="hljs-attribute">font-size</span>: <span class="hljs-number">140px</span>;
        <span class="hljs-attribute">font-family</span>: <span class="hljs-string">'Antic Slab'</span>, serif;
      }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">const</span> GAME_SPEED = <span class="hljs-number">100</span>;
    <span class="hljs-keyword">const</span> CANVAS_BORDER_COLOUR = <span class="hljs-string">'black'</span>;
    <span class="hljs-keyword">const</span> CANVAS_BACKGROUND_COLOUR = <span class="hljs-string">"white"</span>;
    <span class="hljs-keyword">const</span> SNAKE_COLOUR = <span class="hljs-string">'lightgreen'</span>;
    <span class="hljs-keyword">const</span> SNAKE_BORDER_COLOUR = <span class="hljs-string">'darkgreen'</span>;
    <span class="hljs-keyword">const</span> FOOD_COLOUR = <span class="hljs-string">'red'</span>;
    <span class="hljs-keyword">const</span> FOOD_BORDER_COLOUR = <span class="hljs-string">'darkred'</span>;
    <span class="hljs-keyword">let</span> snake = [
      {<span class="hljs-attr">x</span>: <span class="hljs-number">150</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">150</span>},
      {<span class="hljs-attr">x</span>: <span class="hljs-number">140</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">150</span>},
      {<span class="hljs-attr">x</span>: <span class="hljs-number">130</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">150</span>},
      {<span class="hljs-attr">x</span>: <span class="hljs-number">120</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">150</span>},
      {<span class="hljs-attr">x</span>: <span class="hljs-number">110</span>, <span class="hljs-attr">y</span>: <span class="hljs-number">150</span>}
    ]
    <span class="hljs-comment">// 玩家的分数</span>
    <span class="hljs-keyword">let</span> score = <span class="hljs-number">0</span>;
    <span class="hljs-comment">// changingDirection 为 true 时表示蛇正在改变方向</span>
    <span class="hljs-keyword">let</span> changingDirection = <span class="hljs-literal">false</span>;
    <span class="hljs-comment">// 食物的 x 坐标</span>
    <span class="hljs-keyword">let</span> foodX;
    <span class="hljs-comment">// 食物的 y 坐标</span>
    <span class="hljs-keyword">let</span> foodY;
    <span class="hljs-comment">// 横向移动速度</span>
    <span class="hljs-keyword">let</span> dx = <span class="hljs-number">10</span>;
    <span class="hljs-comment">// 纵向移动速度</span>
    <span class="hljs-keyword">let</span> dy = <span class="hljs-number">0</span>;
    <span class="hljs-comment">// 获取 canvas 元素</span>
    <span class="hljs-keyword">const</span> gameCanvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"gameCanvas"</span>);
    <span class="hljs-comment">// 返回一个二维绘制上下文</span>
    <span class="hljs-keyword">const</span> ctx = gameCanvas.getContext(<span class="hljs-string">"2d"</span>);
    <span class="hljs-comment">// 开始游戏</span>
    main();
    <span class="hljs-comment">// 生成第一个食物位置</span>
    createFood();
    <span class="hljs-comment">// 按下任意一个键，都会调用 changeDirection</span>
    <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">"keydown"</span>, changeDirection);
    <span class="hljs-comment">/**
     * 游戏的主函数
     * 递归调用以推进游戏  
     */</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-comment">// 判定游戏结束时提前返回从而终止游戏</span>
      <span class="hljs-keyword">if</span> (didGameEnd()) <span class="hljs-keyword">return</span>;
      setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onTick</span>(<span class="hljs-params"></span>) </span>{
        changingDirection = <span class="hljs-literal">false</span>;
        clearCanvas();
        drawFood();
        advanceSnake();
        drawSnake();
        <span class="hljs-comment">// 再次调用 main</span>
        main();
      }, GAME_SPEED)
    }
    <span class="hljs-comment">/**
     * 设置画布的背景色为 CANVAS_BACKGROUND_COLOUR 
     * 并绘制画布的边框
     */</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">clearCanvas</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-comment">//  选择画布的背景颜色</span>
      ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
      <span class="hljs-comment">//  选择画布的边框颜色</span>
      ctx.strokestyle = CANVAS_BORDER_COLOUR;
      <span class="hljs-comment">// 绘制一个“实心的”长方形来覆盖整个画布</span>
      ctx.fillRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, gameCanvas.width, gameCanvas.height);
      <span class="hljs-comment">// 绘制画布的“边框”</span>
      ctx.strokeRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, gameCanvas.width, gameCanvas.height);
    }
    <span class="hljs-comment">/**
     * 在画布上画食物
     */</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawFood</span>(<span class="hljs-params"></span>) </span>{
      ctx.fillStyle = FOOD_COLOUR;
      ctx.strokestyle = FOOD_BORDER_COLOUR;
      ctx.fillRect(foodX, foodY, <span class="hljs-number">10</span>, <span class="hljs-number">10</span>);
      ctx.strokeRect(foodX, foodY, <span class="hljs-number">10</span>, <span class="hljs-number">10</span>);
    }
    <span class="hljs-comment">/**
     * 根据蛇的水平移动速度改变蛇的 x 坐标，
     * 根据蛇的垂直移动速度改变蛇的 y 坐标
     */</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">advanceSnake</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-comment">// 绘制新的头部</span>
      <span class="hljs-keyword">const</span> head = {<span class="hljs-attr">x</span>: snake[<span class="hljs-number">0</span>].x + dx, <span class="hljs-attr">y</span>: snake[<span class="hljs-number">0</span>].y + dy};
      <span class="hljs-comment">// 将新的头部放到蛇身体的第一个部位</span>
      snake.unshift(head);
      <span class="hljs-keyword">const</span> didEatFood = snake[<span class="hljs-number">0</span>].x === foodX &amp;&amp; snake[<span class="hljs-number">0</span>].y === foodY;
      <span class="hljs-keyword">if</span> (didEatFood) {
        <span class="hljs-comment">// 增加分数</span>
        score += <span class="hljs-number">10</span>;
        <span class="hljs-comment">// 在屏幕上显示分数</span>
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'score'</span>).innerHTML = score;
        <span class="hljs-comment">// 生成新的食物</span>
        createFood();
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">// 移除蛇的最后一个部分</span>
        snake.pop();
      }
    }
    <span class="hljs-comment">/**
     * 当蛇撞墙或者蛇头碰到蛇身的时候返回 true
     */</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">didGameEnd</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">4</span>; i &lt; snake.length; i++) {
        <span class="hljs-keyword">if</span> (snake[i].x === snake[<span class="hljs-number">0</span>].x &amp;&amp; snake[i].y === snake[<span class="hljs-number">0</span>].y) <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
      }
      <span class="hljs-keyword">const</span> hitLeftWall = snake[<span class="hljs-number">0</span>].x &lt; <span class="hljs-number">0</span>;
      <span class="hljs-keyword">const</span> hitRightWall = snake[<span class="hljs-number">0</span>].x &gt; gameCanvas.width - <span class="hljs-number">10</span>;
      <span class="hljs-keyword">const</span> hitToptWall = snake[<span class="hljs-number">0</span>].y &lt; <span class="hljs-number">0</span>;
      <span class="hljs-keyword">const</span> hitBottomWall = snake[<span class="hljs-number">0</span>].y &gt; gameCanvas.height - <span class="hljs-number">10</span>;
      <span class="hljs-keyword">return</span> hitLeftWall || hitRightWall || hitToptWall || hitBottomWall
    }
    <span class="hljs-comment">/**
     * 给定一个最大值和最小值，生成一个 10 的倍数的随机数     
     * @param { number } min —— 随机数的下限
     * @param { number } max —— 随机数的上限
     */</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">randomTen</span>(<span class="hljs-params">min, max</span>) </span>{
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.round((<span class="hljs-built_in">Math</span>.random() * (max-min) + min) / <span class="hljs-number">10</span>) * <span class="hljs-number">10</span>;
    }
    <span class="hljs-comment">/**     
     * 随机生成食物坐标
     */</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createFood</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-comment">// 随机生成食物的 x 坐标</span>
      foodX = randomTen(<span class="hljs-number">0</span>, gameCanvas.width - <span class="hljs-number">10</span>);
      <span class="hljs-comment">// 随机生成食物的 y 坐标</span>
      foodY = randomTen(<span class="hljs-number">0</span>, gameCanvas.height - <span class="hljs-number">10</span>);
      <span class="hljs-comment">// 如果新生成的食物与蛇当前位置重叠，重新为食物生成一个位置</span>
      snake.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isFoodOnSnake</span>(<span class="hljs-params">part</span>) </span>{
        <span class="hljs-keyword">const</span> foodIsoNsnake = part.x == foodX &amp;&amp; part.y == foodY;
        <span class="hljs-keyword">if</span> (foodIsoNsnake) createFood();
      });
    }
    <span class="hljs-comment">/**
     * 在画布上画蛇
     */</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawSnake</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-comment">// 循环遍历蛇的每一部分，并将其绘制到画布上</span>
      snake.forEach(drawSnakePart)
    }
    <span class="hljs-comment">/**
     * 在画布上画蛇的一个部分
     * @param { object } snakePart —— 需要绘制的部位的所在坐标
     */</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawSnakePart</span>(<span class="hljs-params">snakePart</span>) </span>{
      <span class="hljs-comment">// 设置蛇身体的背景颜色</span>
      ctx.fillStyle = SNAKE_COLOUR;
      <span class="hljs-comment">// 设置蛇身的边框色</span>
      ctx.strokestyle = SNAKE_BORDER_COLOUR;
      <span class="hljs-comment">// 在蛇身坐标所在的位置，绘制“实心”的矩形以表示蛇      </span>
      ctx.fillRect(snakePart.x, snakePart.y, <span class="hljs-number">10</span>, <span class="hljs-number">10</span>);
      <span class="hljs-comment">// 绘制蛇身的边框</span>
      ctx.strokeRect(snakePart.x, snakePart.y, <span class="hljs-number">10</span>, <span class="hljs-number">10</span>);
    }
    <span class="hljs-comment">/**     
     * 根据按下的键，改变蛇的水平移动速度和垂直移动速度
     * 为了避免蛇反转，蛇的移动方向不能直接变成相反的方向，
     * 比如说，当前方向是“向右”，那么下一个方向不能是“向左”
     * @param { object } event —— 键盘事件
     */</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">changeDirection</span>(<span class="hljs-params">event</span>) </span>{
      <span class="hljs-keyword">const</span> LEFT_KEY = <span class="hljs-number">37</span>;
      <span class="hljs-keyword">const</span> RIGHT_KEY = <span class="hljs-number">39</span>;
      <span class="hljs-keyword">const</span> UP_KEY = <span class="hljs-number">38</span>;
      <span class="hljs-keyword">const</span> DOWN_KEY = <span class="hljs-number">40</span>;
      <span class="hljs-comment">/**
       * 避免贪食蛇掉头
       * 举个例子：
       * 蛇正在向右移动。玩家按下向下键然后迅速地按下向左键。
       * 此时蛇不会先向下移动一步，而会马上改变方向
       */</span>
      <span class="hljs-keyword">if</span> (changingDirection) <span class="hljs-keyword">return</span>;
      changingDirection = <span class="hljs-literal">true</span>;

      <span class="hljs-keyword">const</span> keyPressed = event.keyCode;
      <span class="hljs-keyword">const</span> goingUp = dy === <span class="hljs-number">-10</span>;
      <span class="hljs-keyword">const</span> goingDown = dy === <span class="hljs-number">10</span>;
      <span class="hljs-keyword">const</span> goingRight = dx === <span class="hljs-number">10</span>;
      <span class="hljs-keyword">const</span> goingLeft = dx === <span class="hljs-number">-10</span>;
      <span class="hljs-keyword">if</span> (keyPressed === LEFT_KEY &amp;&amp; !goingRight) {
        dx = <span class="hljs-number">-10</span>;
        dy = <span class="hljs-number">0</span>;
      }

      <span class="hljs-keyword">if</span> (keyPressed === UP_KEY &amp;&amp; !goingDown) {
        dx = <span class="hljs-number">0</span>;
        dy = <span class="hljs-number">-10</span>;
      }

      <span class="hljs-keyword">if</span> (keyPressed === RIGHT_KEY &amp;&amp; !goingLeft) {
        dx = <span class="hljs-number">10</span>;
        dy = <span class="hljs-number">0</span>;
      }

      <span class="hljs-keyword">if</span> (keyPressed === DOWN_KEY &amp;&amp; !goingUp) {
        dx = <span class="hljs-number">0</span>;
        dy = <span class="hljs-number">10</span>;
      }
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre><h3>结尾</h3>
<p>恭喜！🎉👏</p>
<p>我们已经走完了这次旅程。希望你喜欢和我一起学习，并且有信心继续挑战下一次冒险。</p>
<p>不过现在还不必告别。我的下一篇文章将重点介绍如何帮助您开启<strong>非常</strong>令人兴奋的<strong>开源</strong>世界。</p>
<p><a href="https://en.wikipedia.org/wiki/Open-source_software">开源</a>是学习<strong>许多</strong>新知识、结识大佬的好方法。虽然最初未必敢于尝试，但这毫无疑问是非常有价值的。</p>
<p>如果想要收到我下一篇文章的发布通知，可以关注我！📫</p>
<p>很高兴能和你一起踏上这段旅程。</p>
<p>期待下次再见。✨</p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/think-like-a-programmer-how-to-build-snake-using-only-javascript-html-css](https://www.zcfy.cc/article/think-like-a-programmer-how-to-build-snake-using-only-javascript-html-css)
原文标题: 像程序员一样思考：如何只使用 JavaScript，HTML 和 CSS 开发贪食蛇游戏
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。 

本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
