---
title: 'Minimax 和 Alpha-beta 剪枝算法简介，以及以此实现的井字棋游戏（Tic-tac-toe）' 
date: 2018-12-12 2:30:10
hidden: true
slug: 2c112r9xhpx
categories: [reprint]
---

{{< raw >}}

                    
<p>前段时间用 React 写了个<a href="https://github.com/noiron/react-2048" rel="nofollow noreferrer" target="_blank">2048 游戏</a>来练练手，准备用来回顾下 React 相关的各种技术，以及试验一下新技术。在写这个2048的过程中，我考虑是否可以在其中加入一个 AI 算法来自动进行游戏，于是我找到了这篇文章：<a href="http://blog.codinglabs.org/articles/2048-ai-analysis.html" rel="nofollow noreferrer" target="_blank">2048-AI程序算法分析</a>，文中介绍了 minimax 算法和 alpha-beta 剪枝算法。于是我决定先学习下这两种算法，并以此写了这个 tic-tac-toe 游戏：<a href="https://tic-tac-toe-js-app.herokuapp.com/" rel="nofollow noreferrer" target="_blank">tic-tac-toe-js</a>（<a href="https://github.com/noiron/tic-tac-toe-js" rel="nofollow noreferrer" target="_blank">代码见此处</a>）。本文将说明如何用 JavaScript 来简单地实现算法，并将其运用到 tic-tac-toe 游戏中。</p>
<h2 id="articleHeader0">Minimax 算法简介</h2>
<p>我觉得要解释 minimax 算法的原理，需要用示意图来解释更清晰，以下的几篇文章都对原理说的足够清楚。</p>
<blockquote><ol>
<li><a href="http://blog.codinglabs.org/articles/2048-ai-analysis.html" rel="nofollow noreferrer" target="_blank">2048-AI程序算法分析</a></li>
<li><a href="https://www.neverstopbuilding.com/blog/2013/12/13/tic-tac-toe-understanding-the-minimax-algorithm13/" rel="nofollow noreferrer" target="_blank">Tic Tac Toe: Understanding the Minimax Algorithm</a></li>
<li><a href="http://www.flyingmachinestudios.com/programming/minimax/" rel="nofollow noreferrer" target="_blank">An Exhaustive Explanation of Minimax, a Staple AI Algorithm</a></li>
</ol></blockquote>
<p>其中后面的两篇文章都是以 tic-tac-toe 游戏为例，并用 Ruby 实现。</p>
<p>以棋类游戏为例来说明 minimax 算法，每一个棋盘的状态都会对应一个分数。双方将会轮流下棋。轮到我方下子时，我会选择分数最高的状态；而对方会选择对我最不利的状态。可以这么认为，每次我都需要从对手给我选择的最差（min）局面中选出最好（max）的一个，这就是这个算法名称 <strong>minimax</strong> 的意义。</p>
<p><span class="img-wrap"><img data-src="/img/bV4Vis?w=813&amp;h=495" src="https://static.alili.tech/img/bV4Vis?w=813&amp;h=495" alt="minimax tree" title="minimax tree" style="cursor: pointer; display: inline;"></span></p>
<p>（图片来自于 <a href="http://web.cs.ucla.edu/~rosen/161/notes/alphabeta.html" rel="nofollow noreferrer" target="_blank">http://web.cs.ucla.edu/~rosen...</a>）</p>
<p>我们接下来会解决这样一个问题，如上图所示，正方形的节点对应于我的决策，圆形的节点是对手的决策。双方轮流选择一个分支，我的目标是让最后选出的数字尽可能大，对方的目标是让这个数字尽可能小。</p>
<h2 id="articleHeader1">Minimax 算法的实现</h2>
<p>为了简单起见，对于这个特定的问题，我用了一个嵌套的数组来表示状态树。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const dataTree = [
    [
        [
            [3, 17], [2, 12]
        ],
        [
            [15], [25, 0]
        ]
    ],
    [
        [
            [2, 5], [3]
        ],
        [
            [2, 14]
        ]
    ]
];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> dataTree = [
    [
        [
            [<span class="hljs-number">3</span>, <span class="hljs-number">17</span>], [<span class="hljs-number">2</span>, <span class="hljs-number">12</span>]
        ],
        [
            [<span class="hljs-number">15</span>], [<span class="hljs-number">25</span>, <span class="hljs-number">0</span>]
        ]
    ],
    [
        [
            [<span class="hljs-number">2</span>, <span class="hljs-number">5</span>], [<span class="hljs-number">3</span>]
        ],
        [
            [<span class="hljs-number">2</span>, <span class="hljs-number">14</span>]
        ]
    ]
];</code></pre>
<p>图中的节点分为两种类型：</p>
<ol>
<li>
<strong>Max 节点</strong>：图中的正方形节点，对应于我的回合，它会选取所有子节点中的最大值作为自身的值</li>
<li>
<strong>Min 节点</strong>：图中的圆形节点，对应于对手的回合，它会选取所有子节点中的最小值作为自身的值</li>
</ol>
<p>先定义一个 <code>Node</code> 类，<code>constructor</code> 如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor(data, type, depth) {
    this.data = data;
    this.type = type; // 区分此节点的种类是 max 或 min
    this.depth = depth;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">constructor</span>(data, type, depth) {
    <span class="hljs-keyword">this</span>.data = data;
    <span class="hljs-keyword">this</span>.type = type; <span class="hljs-comment">// 区分此节点的种类是 max 或 min</span>
    <span class="hljs-keyword">this</span>.depth = depth;
}</code></pre>
<p>根节点的 <code>depth</code> 为0，以下的每一层 <code>depth</code> 依次加一。最底层的节点 <code>depth</code> 为4，其 <code>data</code> 是写在图中的数字，其它层节点的 <code>data</code> 均是一个数组。</p>
<p>接下来考虑如何给每个节点打分，可能会出现这样的几种情况：</p>
<ol>
<li>最底层的节点，直接返回本身的数字</li>
<li>中间层的 max 节点，返回子节点中的最大分数</li>
<li>中间层的 min 节点，返回子节点中的最小分数</li>
</ol>
<p>为方便描述，我们按照由上到下、由左到右的顺序给图中节点进行标号。节点1是 max 节点，从节点2和节点3中选择较大值；而对于节点2来说，需要从节点4，5中选取较小值。很显然，我们这里要用递归的方法来实现，当搜索到最底层的节点时，递归过程开始返回。</p>
<p><span class="img-wrap"><img data-src="/img/bV4ViB?w=813&amp;h=495" src="https://static.alili.tech/img/bV4ViB?w=813&amp;h=495" alt="minimax tree mark" title="minimax tree mark" style="cursor: pointer; display: inline;"></span></p>
<p>以下是打分函数 <code>score</code> 的具体代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="score() {
    // 到达了最大深度后，此时的 data 是数组最内层的数字
    if (this.depth >= 4) {
        return this.data;
    }

    // 对于 max 节点，返回的是子节点中的最大值
    if (this.type === 'max') {
        let maxScore = -1000;

        for (let i = 0; i < this.data.length; i++) {
            const d = this.data[i];
            // 生成新的节点，子节点的 type 会和父节点不同
            const childNode = new Node(d, changeType(this.type), this.depth + 1);
            // 递归获取其分数
            const childScore = childNode.score();

            if (childScore > maxScore) {
                maxScore = childScore;
            }
        }

        return maxScore;
    }

    // 对于 min 节点，返回的是子节点中的最小值
    else if (this.type === 'min') {
        // 与上方代码相似，省略部分代码
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">score() {
    <span class="hljs-comment">// 到达了最大深度后，此时的 data 是数组最内层的数字</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.depth &gt;= <span class="hljs-number">4</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.data;
    }

    <span class="hljs-comment">// 对于 max 节点，返回的是子节点中的最大值</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.type === <span class="hljs-string">'max'</span>) {
        <span class="hljs-keyword">let</span> maxScore = <span class="hljs-number">-1000</span>;

        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-keyword">this</span>.data.length; i++) {
            <span class="hljs-keyword">const</span> d = <span class="hljs-keyword">this</span>.data[i];
            <span class="hljs-comment">// 生成新的节点，子节点的 type 会和父节点不同</span>
            <span class="hljs-keyword">const</span> childNode = <span class="hljs-keyword">new</span> Node(d, changeType(<span class="hljs-keyword">this</span>.type), <span class="hljs-keyword">this</span>.depth + <span class="hljs-number">1</span>);
            <span class="hljs-comment">// 递归获取其分数</span>
            <span class="hljs-keyword">const</span> childScore = childNode.score();

            <span class="hljs-keyword">if</span> (childScore &gt; maxScore) {
                maxScore = childScore;
            }
        }

        <span class="hljs-keyword">return</span> maxScore;
    }

    <span class="hljs-comment">// 对于 min 节点，返回的是子节点中的最小值</span>
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.type === <span class="hljs-string">'min'</span>) {
        <span class="hljs-comment">// 与上方代码相似，省略部分代码</span>
    }
}</code></pre>
<blockquote><a href="https://github.com/noiron/tic-tac-toe-js/blob/master/algorithms/minimax.js" rel="nofollow noreferrer" target="_blank">完整的 minimax 算法代码</a></blockquote>
<h2 id="articleHeader2">Alpha-beta 剪枝算法简介</h2>
<p>Alpha-beta 剪枝算法可以认为是 minimax 算法的一种改进，在实际的问题中，需要搜索的状态数量将会非常庞大，利用 alpha-beta 剪枝算法可以去除一些不必要的搜索。</p>
<p>关于 alpha-beta 算法的具体解释可以看这篇文章 <a href="http://web.cs.ucla.edu/~rosen/161/notes/alphabeta.html" rel="nofollow noreferrer" target="_blank">Minimax with Alpha Beta Pruning</a>。我们在前文中考虑的那张图就来自这篇文章，之后我们会用 alpha-beta 剪枝算法来改进之前的解决方案。</p>
<p>剪枝算法中主要有这么些概念：</p>
<p>每一个节点都会由 alpha 和 beta 两个值来确定一个范围 [alpha, beta]，alpha 值代表的是下界，beta 代表的是上界。每搜索一个子节点，都会按规则对范围进行修正。</p>
<p>Max 节点可以修改 alpha 值，min 节点修改 beta 值。</p>
<p>如果出现了 beta &lt;= alpha 的情况，则不用搜索更多的子树了，未搜索的这部分子树将被忽略，这个操作就被称作<strong>剪枝（pruning）</strong>。</p>
<p>接下来我会尽量说明为什么剪枝这个操作是合理的，省略了一部分节点为什么不会对结果产生影响。用原图中以4号节点（第三层的第一个节点）为根节点的子树来举例，方便描述这里将他们用 A - G 的字母来重新标记。</p>
<p><span class="img-wrap"><img data-src="/img/bV4Vjd?w=544&amp;h=419" src="https://static.alili.tech/img/bV4Vjd?w=544&amp;h=419" alt="子树" title="子树" style="cursor: pointer;"></span></p>
<p>从 B 节点看起，B 是 min 节点，需要在 D 和 E 中寻找较小值，因此 B 取值为3，同时 B 的 beta 值也设置为 3。假设 B 还有更多值大于3的子节点，但因为已经出现了 D 这个最小值，所以不会对 B 产生影响，即这里的 beta = 3 确定了一个上界。</p>
<p>.A 是 max 节点，需要在 B 和 C 中找到较大值，因为子树 B 已经搜索完毕，B 的值确定为 3，所以 A 的值至少为 3，这样确定了 A 的下界 alpha = 3。在搜索 C 子树之前，我们<strong>希望 C 的值大于3</strong>，这样才会对 A 的下界 alpha 产生影响。于是 C 从 A 这里获得了下界 alpha = 3 这个限制条件。</p>
<p>.C 是 min 节点，要从 F 和 G 里找出较小值。F 的值为2，所以 C 的值一定小于等于 2，更新 C 的上界 beta = 2。此时 C 的 alpha = 3, beta = 2，这是一个空区间，也就是说即使继续考虑 C 的其它子节点， 也<strong>不可能让 C 的值大于 3</strong>，所以我们不必再考虑 G 节点。G 节点就是被剪枝的节点。</p>
<p>重复这样的过程，会有更多的节点因为剪枝操作被忽略，从而对 minimax 算法进行了优化。</p>
<h2 id="articleHeader3">Alpha-beta 剪枝算法的实现</h2>
<p>接下来讨论如何修改前面实现的 minimax 算法，使其变为 alpha-beta 剪枝算法。</p>
<p>第一步在 constructor 中加入两个新属性，alpha、beta。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor(data, type, depth, alpha, beta) {
    this.data = data;
    this.type = type; // 区分此节点的种类是 max 或 min
    this.depth = depth;

    this.alpha = alpha || -Infinity;
    this.beta = beta || Infinity;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">constructor</span>(data, type, depth, alpha, beta) {
    <span class="hljs-keyword">this</span>.data = data;
    <span class="hljs-keyword">this</span>.type = type; <span class="hljs-comment">// 区分此节点的种类是 max 或 min</span>
    <span class="hljs-keyword">this</span>.depth = depth;

    <span class="hljs-keyword">this</span>.alpha = alpha || -<span class="hljs-literal">Infinity</span>;
    <span class="hljs-keyword">this</span>.beta = beta || <span class="hljs-literal">Infinity</span>;
}</code></pre>
<p>然后每次都搜索会视情况更新 alpha, beta 的值，以下的代码片段来自于搜索 max 节点的过程：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// alphabeta.js 中的 score() 函数

for (let i = 0; i < this.data.length; i++) {
    // ...

    if (childScore > maxScore) {
        maxScore = childScore;
        // 相对于 minimax 算法，alpha-beta 剪枝算法在这里增加了一个更新 alpha 值的操作
        this.alpha = maxScore;
    }

    // 如果满足了退出的条件，我们不需要继续搜索更多的节点了，退出循环
    if (this.alpha >= this.beta) {
        break;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// alphabeta.js 中的 score() 函数</span>

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-keyword">this</span>.data.length; i++) {
    <span class="hljs-comment">// ...</span>

    <span class="hljs-keyword">if</span> (childScore &gt; maxScore) {
        maxScore = childScore;
        <span class="hljs-comment">// 相对于 minimax 算法，alpha-beta 剪枝算法在这里增加了一个更新 alpha 值的操作</span>
        <span class="hljs-keyword">this</span>.alpha = maxScore;
    }

    <span class="hljs-comment">// 如果满足了退出的条件，我们不需要继续搜索更多的节点了，退出循环</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.alpha &gt;= <span class="hljs-keyword">this</span>.beta) {
        <span class="hljs-keyword">break</span>;
    }</code></pre>
<p>相对应的是在 min 节点中，我们更新的将是 beta 值。好了，只需要做这么些简单的改变，就将 minimax 算法改变成了 alpha-beta 剪枝算法了。</p>
<p>最后看看如何将算法应用到 tic-tac-toe 游戏中。</p>
<blockquote><a href="https://github.com/noiron/tic-tac-toe-js/blob/master/algorithms/alphabeta.js" rel="nofollow noreferrer" target="_blank">完整的 alpha-beta 剪枝算法代码</a></blockquote>
<h2 id="articleHeader4">Tic-tac-toe 游戏中的应用</h2>
<p>Tic-tac-toe，即井字棋游戏，规则是在双方轮流在 3x3 的棋盘上的任意位置下子，率先将三子连成一线的一方获胜。</p>
<p>这就是一个非常适合用 minimax 来解决的问题，即使在不考虑对称的情况，所有的游戏状态也只有 9! = 362880 种，相比于其它棋类游戏天文数字般的状态数量已经很少了，因而很适合作为算法的示例。</p>
<p>我在代码中将棋盘的状态用一个长度为9的数组来表示，然后利用 canvas 绘制出一个简易的棋盘，下子的过程就是修改数组的对应位置然后重绘画面。</p>
<p>现在我们已经有了现成的 minimax 和 alpha-beta 剪枝算法，只要加上一点儿细节就能完成这个游戏了?。</p>
<p>先来定义一个 <code>GameState</code> 类，其中保存了游戏的状态，对应于之前分析过程中的节点，其 <code>constructor</code> 如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor(board, player, depth, alpha, beta) {
    this.board = board;
    // player 是用字符 X 和 O 来标记当前由谁下子，以此来判断当前是 max 还是 min 节点
    this.playerTurn = player;
    this.depth = depth;

    // 保存分数最高或最低的状态，用于确定下一步的棋盘状态
    this.choosenState = null;
    this.alpha = alpha || -Infinity;
    this.beta = beta || Infinity;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">constructor</span>(board, player, depth, alpha, beta) {
    <span class="hljs-keyword">this</span>.board = board;
    <span class="hljs-comment">// player 是用字符 X 和 O 来标记当前由谁下子，以此来判断当前是 max 还是 min 节点</span>
    <span class="hljs-keyword">this</span>.playerTurn = player;
    <span class="hljs-keyword">this</span>.depth = depth;

    <span class="hljs-comment">// 保存分数最高或最低的状态，用于确定下一步的棋盘状态</span>
    <span class="hljs-keyword">this</span>.choosenState = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">this</span>.alpha = alpha || -<span class="hljs-literal">Infinity</span>;
    <span class="hljs-keyword">this</span>.beta = beta || <span class="hljs-literal">Infinity</span>;
}</code></pre>
<p>为进行游戏，首先需要一个 <code>checkFinish</code> 函数，检查游戏是否结束，结束时返回胜利者信息。搜索的过程是在 <code>getScore</code> 函数中完成的，每次搜索先检查游戏是否结束，平局返回零分，我们的算法是站在 AI 的角度来考虑的，因此 AI 胜利时返回10分，AI 失利时返回-10分。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// alphabeta.js 中的 getScore() 方法

const winner = this.checkFinish();
if (winner) {
    if (winner === 'draw') return 0;
    if (winner === aiToken) return 10;
    return -10;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// alphabeta.js 中的 getScore() 方法</span>

<span class="hljs-keyword">const</span> winner = <span class="hljs-keyword">this</span>.checkFinish();
<span class="hljs-keyword">if</span> (winner) {
    <span class="hljs-keyword">if</span> (winner === <span class="hljs-string">'draw'</span>) <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
    <span class="hljs-keyword">if</span> (winner === aiToken) <span class="hljs-keyword">return</span> <span class="hljs-number">10</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-number">-10</span>;
}</code></pre>
<p>接着是对 max 和 min 节点的分类处理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// alphabeta.js 中的 getScore() 方法

// 获得所有可能的位置，利用 shuffle 加入随机性
const availablePos = _.shuffle(this.getAvailablePos());

// 对于 max 节点，返回的是子节点中的最大值
if (this.playerTurn === aiToken) {
    let maxScore = -1000;
    let maxIndex = 0;

    for (let i = 0; i < availablePos.length; i++) {
        const pos = availablePos[i];
        // 在给定的位置下子，生成一个新的棋盘
        const newBoard = this.generateNewBoard(pos, this.playerTurn);

        // 生成一个新的节点
        const childState = new GameState(newBoard, changeTurn(this.playerTurn), this.depth + 1, this.alpha, this.beta);
        // 这里开始递归调用 getScore() 函数
        const childScore = childState.getScore();

        if (childScore > maxScore) {
            maxScore = childScore;
            maxIndex = i;
            // 这里保存产生了最大的分数的节点，之后会被用于进行下一步
            this.choosenState = childState;
            this.alpha = maxScore;
        }

        if (this.alpha >= this.beta) {
            break;
        }
    }

    return maxScore;
}

// min 节点的处理与上面类似
// ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// alphabeta.js 中的 getScore() 方法</span>

<span class="hljs-comment">// 获得所有可能的位置，利用 shuffle 加入随机性</span>
<span class="hljs-keyword">const</span> availablePos = _.shuffle(<span class="hljs-keyword">this</span>.getAvailablePos());

<span class="hljs-comment">// 对于 max 节点，返回的是子节点中的最大值</span>
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.playerTurn === aiToken) {
    <span class="hljs-keyword">let</span> maxScore = <span class="hljs-number">-1000</span>;
    <span class="hljs-keyword">let</span> maxIndex = <span class="hljs-number">0</span>;

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; availablePos.length; i++) {
        <span class="hljs-keyword">const</span> pos = availablePos[i];
        <span class="hljs-comment">// 在给定的位置下子，生成一个新的棋盘</span>
        <span class="hljs-keyword">const</span> newBoard = <span class="hljs-keyword">this</span>.generateNewBoard(pos, <span class="hljs-keyword">this</span>.playerTurn);

        <span class="hljs-comment">// 生成一个新的节点</span>
        <span class="hljs-keyword">const</span> childState = <span class="hljs-keyword">new</span> GameState(newBoard, changeTurn(<span class="hljs-keyword">this</span>.playerTurn), <span class="hljs-keyword">this</span>.depth + <span class="hljs-number">1</span>, <span class="hljs-keyword">this</span>.alpha, <span class="hljs-keyword">this</span>.beta);
        <span class="hljs-comment">// 这里开始递归调用 getScore() 函数</span>
        <span class="hljs-keyword">const</span> childScore = childState.getScore();

        <span class="hljs-keyword">if</span> (childScore &gt; maxScore) {
            maxScore = childScore;
            maxIndex = i;
            <span class="hljs-comment">// 这里保存产生了最大的分数的节点，之后会被用于进行下一步</span>
            <span class="hljs-keyword">this</span>.choosenState = childState;
            <span class="hljs-keyword">this</span>.alpha = maxScore;
        }

        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.alpha &gt;= <span class="hljs-keyword">this</span>.beta) {
            <span class="hljs-keyword">break</span>;
        }
    }

    <span class="hljs-keyword">return</span> maxScore;
}

<span class="hljs-comment">// min 节点的处理与上面类似</span>
<span class="hljs-comment">// ...</span></code></pre>
<blockquote>完整代码见<a href="https://github.com/noiron/tic-tac-toe-js/blob/master/src/alphabeta.js" rel="nofollow noreferrer" target="_blank">alphabeta.js</a>
</blockquote>
<h2 id="articleHeader5">总结</h2>
<p>这样就简单地介绍了 minimax 算法和 alpha-beta 算法，并分别给出了一个简单的实现，然后在 tic-tac-toe 游戏中应用了算法。</p>
<p>文章中所提到的所有代码可见此项目：<a href="https://github.com/noiron/tic-tac-toe-js" rel="nofollow noreferrer" target="_blank">Tic-tac-toe-js</a>。其中的 <code>algorithms</code> 文件夹中是两种算法的简单实现，<code>src</code> 文件中是游戏的代码。</p>
<p>文章开头说到了这篇文章起源于写2048游戏项目的过程中，之后我将 minimax 算法应用到了2048游戏的 AI 中，不过对于局面的评估函数尚不完善，现在 AI 只能勉强合成1024?， 还有很大的改进空间。</p>
<hr>
<p><a href="http://www.wukai.me/2018/03/04/minimax-alpha-beta-pruning-and-tic-tac-toe/" rel="nofollow noreferrer" target="_blank">本文原链接</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Minimax 和 Alpha-beta 剪枝算法简介，以及以此实现的井字棋游戏（Tic-tac-toe）

## 原文链接
[https://segmentfault.com/a/1190000013527949](https://segmentfault.com/a/1190000013527949)

