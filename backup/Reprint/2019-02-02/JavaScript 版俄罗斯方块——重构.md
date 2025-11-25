---
title: 'JavaScript 版俄罗斯方块——重构' 
date: 2019-02-02 2:30:11
hidden: true
slug: d31ygsiurr7
categories: [reprint]
---

{{< raw >}}

                    
<p>在 <a href="https://segmentfault.com/a/1190000006919702">JavaScript 版俄罗斯方块</a> 中曾提到，因为临时起意，所以项目结构和很多命名都比较混乱。另外，计分等功能也未实现。这次抽空实现计分和速度设置，并在此之前进行了简单的重构。</p>
<h3 id="articleHeader0">传送门</h3>
<ul>
<li><a href="https://git.oschina.net/jamesfancy/tetris/tree/js_version" rel="nofollow noreferrer" target="_blank">本文源码地址</a></li>
<li><a href="http://jamesfancy.oschina.io/tetris" rel="nofollow noreferrer" target="_blank">演示地址（最新发布，不一定与本文源码对应）</a></li>
<li><a href="https://segmentfault.com/a/1190000006919702">如何构建 - 参考前一篇博文</a></li>
</ul>
<h2 id="articleHeader1">重构项目结构</h2>
<p>项目结构上主要是将原来的 <code>app</code> 更名为 <code>src</code>，表示脚本和 less 源码都在这里。当然原来存放脚本源码的 <code>app/src</code> 也相更名为 <code>src/scripts</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[root>
  |-- index.html    : 入口
  |-- js/           : 构建生成的脚本
  |-- css/          : 构建生成的样式表
  |-- lib/          : bower 引入的库
  `-- src/          : 前端源文件
        |-- less    : 样式表源文件
        `-- scripts : 脚本(es6)源文件" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="markdown hljs"><code class="markdown">[root&gt;
  |-- index.html    : 入口
  |-- js/           : 构建生成的脚本
  |-- css/          : 构建生成的样式表
  |-- lib/          : bower 引入的库
  `-- src/          : 前端源文件
<span class="hljs-code">        |-- less    : 样式表源文件</span>
<span class="hljs-code">        `-- scripts : 脚本(es6)源文件</span></code></pre>
<p>除此这外，基 <code>scripts</code> 中细分了模块，在重构的过程中创建了 <code>model</code> 和 <code>tetris</code> 两个子目录。</p>
<h2 id="articleHeader2">结构分析</h2>
<p>重构之前先进行了简单的结构分析，主要是将几个模块划分出来，放在 <code>model</code> 目录下。重构和写新功能的过程中创建了 <code>tetris</code> 目录，这里放的是功能类和辅助类。然而最主要的功能还是在 <code>scrits/tetris.js</code> 中。</p>
<p>下面是一开始分析模型时画的图：</p>
<p><span class="img-wrap"><img data-src="/img/bVDMXD?w=1281&amp;h=523" src="https://static.alili.tech/img/bVDMXD?w=1281&amp;h=523" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader3">重构</h2>
<p>写程序，重构总是非常需要但也非常容易出错的部分。俄罗斯方块的整个重构的过程从 <a href="https://git.oschina.net/jamesfancy/tetris/tree/working" rel="nofollow noreferrer" target="_blank">源码中 working 分支</a> 的提交日志中可以看到。</p>
<p>关于重构，最重要的一点是：<strong>改变代码结构，但不改变逻辑</strong>。也就是说，每一步重构都要在保证原有业务逻辑的基础上对代码进行修改——虽然并不是 100% 能达到，但要尽最大努力遵循这个原则，才不会在重构的过程中产生莫名其妙的 BUG。关于这一点，应该是在《重构 改善既有代码的设计》一书中提到的。</p>
<blockquote><p>虽然不确定改代码不改逻辑的原则是在 《重构 改善既有代码的设计》 这本书中提到的，但是这本书还是推荐大家去看一看。重构对于开发有着很重要的作用，不过重构过程中涉及到很多设计模式，所以设计模式也是需要读一读的。</p></blockquote>
<h3 id="articleHeader4">私有成员</h3>
<p>在重构的过程中，我为所有类都加入了私有成员定义。这样做的目的是避免在使用它们的时候，不小心访问了不该访问的成员（一般指不小心改写，但有时候不小心取值也可能造成错误）。</p>
<p>关于私有成员这个话题，我曾在 <a href="https://segmentfault.com/a/1190000003488631">ES5 中模拟 ES6 的 Symbol 实现私有成员</a> 中讨论过。在这里我没有用那篇博客中提到的方法，而是直接使用了 Symbol。Babel 对 <code>Symbol()</code> 做了兼容处理，如果是在支持 <code>Symbol</code> 的浏览器上，会直接使用 ES6 的 Symbol；不支持的，则用 Babel 实现的一个模拟的 Symbol 代替。</p>
<p>加入了私有化成员的代码看起来有些奇怪，比如下面这个简单的 <code>Point</code> 类的代码。以下的实现主要是为了（尽可能）保证 <code>Point</code> 对象一但生成，其坐标就不能随意改动——也就是 Immutable。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const __ = {
    x: Symbol(&quot;x&quot;),
    y: Symbol(&quot;y&quot;)
};

export default class Point {
    constructor(x, y) {
        this[__.x] = x;
        this[__.y] = y;
    }

    get x() {
        return this[__.x];
    }

    get y() {
        return this[__.y];
    }

    move(offsetX = 0, offsetY = 0) {
        return new Point(this.x + offsetX, this.y + offsetY);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> __ = {
    <span class="hljs-attr">x</span>: <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">"x"</span>),
    <span class="hljs-attr">y</span>: <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">"y"</span>)
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Point</span> </span>{
    <span class="hljs-keyword">constructor</span>(x, y) {
        <span class="hljs-keyword">this</span>[__.x] = x;
        <span class="hljs-keyword">this</span>[__.y] = y;
    }

    get x() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>[__.x];
    }

    get y() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>[__.y];
    }

    move(offsetX = <span class="hljs-number">0</span>, offsetY = <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Point(<span class="hljs-keyword">this</span>.x + offsetX, <span class="hljs-keyword">this</span>.y + offsetY);
    }
}</code></pre>
<blockquote>
<p>这段代码还好，在写了很多 <code>const __ = { ... }</code> 之后，我突然觉得非常思念 TypeScript。在 TypeScript 中只需要简单的 <code>private _x;</code> 就可以申明私有成员。</p>
<p>TypeScript 中申明的私有成员仅限于静态检查，最终生成的 JavaScript 脚本中，这些成员都可以在外部访问。不过没关系，因为静态检查可以更好的帮我们规避错误。</p>
</blockquote>
<h2 id="articleHeader5">Models</h2>
<p>只有 <code>scripts/model</code> 下面实现的几个类是比较纯粹的模型，除了用于存储数据的字段（Field）和存取数据的属性（Property）之外，方法也都是用于存取数据的。</p>
<h3 id="articleHeader6">Point 和 BlockPoint，继承</h3>
<p><code>model/point.js</code> 和 <code>model/blockpoint.js</code> 里分别实现了用于描述点（小方块）的两个类，区别仅仅在于 <code>BlockPoint</code> 多一个颜色属性。实际上 <code>BlockPoint</code> 是 <code>Point</code> 的子类。在 ES6 里实现继承太容易了，下面是这两个类的结构示意</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Point {
    constructor(x, y) {
        // ....
    }
}

class BlockPoint extends Point {
    constructor(x = 0, y = 0, c = &quot;c0&quot;) {
        super(x, y);
        // ....
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Point</span> </span>{
    <span class="hljs-keyword">constructor</span>(x, y) {
        <span class="hljs-comment">// ....</span>
    }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">BlockPoint</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Point</span> </span>{
    <span class="hljs-keyword">constructor</span>(x = 0, y = 0, c = "c0") {
        <span class="hljs-keyword">super</span>(x, y);
        <span class="hljs-comment">// ....</span>
    }
}</code></pre>
<p>继氶的实现关键就两点需要注意：</p>
<ol>
<li>通过 <code>extends</code> 关键字实现继承</li>
<li>如果子类中定义了构造函数 <code>constructor</code>，记得第一句话一定要调用父类的构造函数 <code>super(...)</code>。Javaer 应该很熟悉这个要求的。</li>
</ol>
<h3 id="articleHeader7">Form</h3>
<p><code>Form</code> 在这里不是“表单”的意思，而是“形状、外形”的意思，表示一个方块图形（Shape）通过旋转形成的最多4 种形态，每个 <code>Form</code> 对象是其中一种。所以 <code>Form</code> 其实是一组 <code>Point</code> 组成的。</p>
<p>上一个版本中没有定义 <code>Form</code> 这个数据结构，是在生成 Shape 的时候生成的匿名对象。那段代码看起来特别绕，虽然也可以提取个函数出来，不过现在通过 <code>Form</code> 类的构造函数来生成，不仅达到了同样的目的，也把 <code>width</code> 的 <code>height</code> 封装起来了。</p>
<h3 id="articleHeader8">Shape 和 SHAPES</h3>
<p><code>Shape</code> 和 <code>SHAPES</code> 跟原来区别不大。<code>SHAPES</code> 的生成代码通过定义 <code>Form</code> 类，简化了不少。而 <code>Shape</code> 类在构建后，也由于成员私有化的原因，<code>color</code> 和 <code>forms</code> 不能被改变了，只能获取。</p>
<h2 id="articleHeader9">Tetris 中的游戏相关类</h2>
<p>除了几个比较纯粹的模型类放在 <code>model</code> 中，主要入口 <code>index.js</code> 和 <code>tetris.js</code> 放在脚本源码根目录下，其它的游戏相关类都是放在 <code>tetris</code> 目录下的。这只是用包（Java概念）或命名空间（C++/C#概念）的概念对源码进行了一个基本的划分。</p>
<h3 id="articleHeader10">Block 和 BlockFactory</h3>
<p><code>Block</code> 表示一个大方块，是由四个小方块组成的大方块，它的原型（此原型非 JS 的 Prototype）就是 <code>Shape</code>。所以一个 <code>Block</code> 会有一个 <code>Shape</code> 原型的引用，同时保存着当前它的位置 <code>position</code> 和形态 <code>formIndex</code>，这两个属性在游戏过程中是可以改变的，直接影响着 <code>Block</code> 最终绘制出来的位置和样子。</p>
<p>整有游戏中其实只有两个 <code>Block</code>，一个在预览区中，另一个在游戏区定时下落并被玩家操作。</p>
<p><code>Block</code> 对象下落到底之后就不再是 <code>Block</code> 了，它会被固化在游戏区。为什么要这样设计呢？因为 <code>Block</code> 表示的是一个完整的大方块，而游戏区下方的方块一旦填满一行就会被消除，大方块将再也不完整。这种情况有两个方案可以描述：</p>
<ol>
<li>仍然以大方块对象放在那里，但是标记已被消除的块，这样在绘制的时候就可以不绘制已消除的块。</li>
<li>大方块下落完成之后就将其打散成一个个的 <code>BlockPoint</code>，通过矩阵管理。</li>
</ol>
<p>很明显，第二种方法通过二维数组实现，会更直观，程序写起来也会更简单。所以我选用了第二种方法。</p>
<p><code>Block</code> 除了描述大方块的位置和形态之外，也会配合游戏控制进行一些数据运算和变化，比如位置的变化：<code>moveLeft()</code>、<code>moveRight()</code>、<code>moveDown()</code> 等，以及形态的变化 <code>rotate()</code>；还有几个 <code>fastenXxxx</code> 方法，生成 <code>BlockPoint[]</code> 用于绘制或判断下一个位置是否可以放置。关于这一点，在 <a href="https://segmentfault.com/a/1190000006919702" target="_blank">JavaScript 版俄罗斯方块</a> 中已经谈过。</p>
<p><code>BlockFactory</code> 功能未变，仍然是产生一个随机方块。</p>
<h3 id="articleHeader11">Puzzle 和 Matrix</h3>
<p>之前对 Puzzle 和 Matrix 的定义有点混淆，这里把它们区分开了。</p>
<p>Puzzle 用于绘制浏览区和预览区，它除了描述一个指定长宽的绘制区域之外，还有存储着两个重要的对象，<code>block: Block</code> 和 <code>fastened: BlockPoint[]</code>，也就是上面提到的运动中的方块，和固定下来的若干小方块。</p>
<p>Puzzle 本向不维护 <code>block</code> 和 <code>fastened</code>，但它要绘制这两个重要数据对象中的所有 <code>BlockPoint</code>。</p>
<p>Matrix 不再是一个类，它是两个数据。一个是 <code>Puzzle</code> 中的 <code>matrix</code> 属性，维护着由 <code>&lt;div&gt;</code>（行） 和 <code>&lt;span&gt;</code>（单元） 组成的绘制区；另一个是 <code>Tetris</code> 中的 <code>matrix</code> 属性，维护着一个 <code>BlockPoint</code> 的矩阵，也就是 <code>Puzzle::fastened</code> 的矩阵形态，它更容易通过固化或删除等操作来改变。</p>
<p>由于 <code>Tetris::matrix</code> 在大部分时间是不变的，则 <code>Puzzle</code> 绘制的时候需要的只是其中其中非空部分的列表，所以这里有一个比较好的业务逻辑是：在 <code>Tetris::matrix</code> 变化的时候，从它重新生成 <code>Puzzle::fastened</code>，由 <code>Puzzle</code> 绘制时使用。</p>
<blockquote><p>有点遗憾，写此博文的时候发现重构之后忘了实现这一优化处理，仍然是在每次 <code>Tetris::render</code> 的时候都会去重新生成 <code>Puzzle::fastened</code>。不过没关系，下个版本一定记得处理这个事情。</p></blockquote>
<h3 id="articleHeader12">Eventable</h3>
<p>在重构和写新功能的过程中，发现了事件的重要性，好些处理都会用到事件。</p>
<p>比如在点击<kbd>暂停/恢复</kbd> 和 <kbd>重新开始</kbd> 的时候，需要去判断当前游戏的状态，并根据状态的情况来触发到底是不是真的暂停或重新开始。</p>
<p>又比如，在计分和速度选择功能中，如果计分达到一定程度，就需要触发提速。</p>
<p>上面提到的这些都可以使用观察者模式来设计，则事件就是观察者模式的一个典型实现。要实现自己的事件处理机制其实不难，但是这里可以偷偷懒，直接借用 jQuery 的事件处理，所以定义了 <code>Eventable</code> 类用于封装 jQuery 的事件处理，所有支持事件的业务类都可以从它继承。</p>
<p>封装很简单，这里采用的是封装事件代理对象的方式，具体可以看源代码，一共只有 20 多行，很容易懂。也可以在构造函数中把 <code>this</code> 封装一个 jQuery 对象出来代理事件处理，这种方式可以将事件处理函数中的 <code>this</code> 指向自己（自己指 Eventable 对象）。不过还好，这个项目中不需要关心事件处理函数中的 <code>this</code>。</p>
<h3 id="articleHeader13">StateManager</h3>
<p>在实现 Tetris 中的主要游戏逻辑的时候，发现状态管理并不简单，尤其是加了 <kbd>暂停/恢复</kbd> 按钮之后，暂停状态就分为代码暂停和人工暂停两种情况，对于两种情况的恢复操作也是有区别的。除此之外还有游戏结束的状态……所以干脆就定义个 <code>StateManager</code> 来管理状态了。</p>
<p><code>StateManager</code> 维护着游戏的状态，提供改变状态的方法，也提供判断状态的属性。如果 JavaScript 有接口语法的话，这个接口大概是这样的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="interface IStateManager {
    get isPaused(): boolean;
    get isPausedByManual(): boolean;
    get isRestartable(): boolean;
    get isOver(): boolean;

    pause(byWhat);
    resume(byWhat);
    start();
    over();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">interface</span> IStateManager {
    <span class="hljs-keyword">get</span> isPaused(): <span class="hljs-built_in">boolean</span>;
    <span class="hljs-keyword">get</span> isPausedByManual(): <span class="hljs-built_in">boolean</span>;
    <span class="hljs-keyword">get</span> isRestartable(): <span class="hljs-built_in">boolean</span>;
    <span class="hljs-keyword">get</span> isOver(): <span class="hljs-built_in">boolean</span>;

    pause(byWhat);
    resume(byWhat);
    start();
    over();
}</code></pre>
<blockquote><p>我又开始想念 TypeScript 了</p></blockquote>
<h3 id="articleHeader14">InfoPanel 和 CommandPanel</h3>
<p><code>InfoPanel</code> 主要用于积分和速度的管理，包括与用户的交互（UI）。<code>CommandPanel</code> 则是负责两个按钮事件的处理。</p>
<h3 id="articleHeader15">Tetris</h3>
<p>说实在的，我仍然认为 <code>Tetris</code> 的代码有点复杂，还需要重构简化。不过尝试了一下之后发现这并不是一件很容易的事情，所以就留待后面的版本来处理了。</p>
<h2 id="articleHeader16">小结</h2>
<p>这次对俄罗斯方块游戏的重构只是一个初步的重构，最初的目的只是想把模型定义清楚，不过也对业务处理进行了一些拆分。模型定义的目的是达到了，但是业务拆分仍然不尽满意。</p>
<p>工作上之前的两个项目都是用的 TypeScript 1.8，虽然是 TypeScript 1.8 有一些坑在那里，但是 TypeScript 的静态语言特性，尤其是静态检查对大型 JavaScript 项目还是有很大帮助的。之前一直认为 TypeScript 增加了代码量，也降低了 JavaScript 的灵活度，但这次用 ES6 重构俄罗斯方块游戏让我深深的感受到，这根本不是 TypeScript 的缺点，它至少可以解决 JavaScript 中的这几个问题：</p>
<ul>
<li>静态检查在开发阶段就能发现很多潜在的问题，而不是在运行的时候才能发现问题。要知道，问题发现得越早改起来越容易。</li>
<li>编辑器（我用的 VSCode）的智能提示和自动完成功能在 TypeScript 的严格语法下非常好用，一个点出来就知道哪些方法可以调用，哪些不能。而对于 JavaScript 这方面就要弱一些了，编辑器不是按语义来分析，而是看代码中出现了哪些，这样难免会出现写代码不小心对象和方法不匹配的情况。</li>
</ul>
<p>所以，下个版本我准备尝试用 <a href="https://segmentfault.com/a/1190000006992529">TypeScript 2.0</a> 来改写。</p>
<blockquote><p>新篇来啦：<a href="https://segmentfault.com/a/1190000007074816" target="_blank">JavaScript 版俄罗斯方块——转换为 TypeScript</a></p></blockquote>
<h3 id="articleHeader17">传送门</h3>
<ul>
<li><a href="https://git.oschina.net/jamesfancy/tetris/tree/js_version" rel="nofollow noreferrer" target="_blank">本文源码地址</a></li>
<li><a href="http://jamesfancy.oschina.io/tetris" rel="nofollow noreferrer" target="_blank">演示地址（最新发布，不一定与本文源码对应）</a></li>
<li><a href="https://segmentfault.com/a/1190000006919702">如何构建 - 参考前一篇博文</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 版俄罗斯方块——重构

## 原文链接
[https://segmentfault.com/a/1190000007063852](https://segmentfault.com/a/1190000007063852)

