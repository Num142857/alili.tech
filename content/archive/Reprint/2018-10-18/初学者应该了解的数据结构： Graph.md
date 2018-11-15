---
title: 初学者应该了解的数据结构： Graph
hidden: true
categories: reprint
slug: cf024897
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <p>在这篇文章中，我们将要探索非线性的数据结构：图，将涵盖它的基本概念及其典型的应用。</p>
<p>你很可能在不同的应用中接触到图（或树）。比如你想知道从家出发怎么去公司最近，就可以利用图的（寻路）算法来得到答案！我们将探讨上述场景与其他有趣的情况。</p>
<p>在上一篇文章中，我们探讨了线性的数据结构，如数组、链表、集合、栈等。本文将以此（译者注：即线性数据结构，没看过前文也没关系，其实也很好懂）为基础。</p>
<hr>
<p>本篇是以下教程的一部分（译者注：如果大家觉得还不错，我会翻译整个系列的文章）:</p>
<p><strong>初学者应该了解的数据结构与算法（DSA）</strong></p>
<ol>
<li><a href="https://adrianmejia.com/blog/2018/04/04/how-you-can-change-the-world-learning-data-structures-algorithms-free-online-course-tutorial/">算法的时间复杂性与大 O 符号</a></li>
<li><a href="https://adrianmejia.com/blog/2018/04/05/most-popular-algorithms-time-complexity-every-programmer-should-know-free-online-tutorial-course/">每个程序员应该知道的八种时间复杂度</a></li>
<li><a href="https://adrianmejia.com/blog/2018/04/28/Data-Structures-Time-Complexity-for-Beginners-Arrays-HashMaps-Linked-Lists-Stacks-Queues-tutorial/">初学者应该了解的数据结构：Array、HashMap 与 List</a></li>
<li><a href="https://adrianmejia.com/blog/2018/05/14/Data-Structures-for-Beginners-Graphs-Time-Complexity-tutorial/">初学者应该了解的数据结构： Graph</a>     <strong>👈 即本文</strong></li>
<li>初学者应该了解的数据结构：Tree (<strong>敬请期待</strong>)</li>
<li><a href="https://adrianmejia.com/blog/2018/04/24/Analysis-of-Recursive-Algorithms/">附录 I：递归算法分析</a></li>
</ol>
<hr>
<p>以下是本文对图操作的小结：</p>
<table>
<thead>
<tr>
<th></th>
<th>邻接表</th>
<th>邻接矩阵</th>
</tr>
</thead>
<tbody>
<tr>
<td>空间复杂度</td>
<td><em>O(|V|+ |E|)</em></td>
<td><em>O(|V|²)</em></td>
</tr>
<tr>
<td><strong>添加</strong>顶点</td>
<td><em>O(1)</em></td>
<td><em>O(|V|²)</em></td>
</tr>
<tr>
<td><strong>移除</strong>顶点</td>
<td><em>O(|V| + |E|)</em></td>
<td><em>O(|V|)²</em></td>
</tr>
<tr>
<td><strong>添加</strong>边</td>
<td><em>O(1)</em></td>
<td><em>O(1)</em></td>
</tr>
<tr>
<td><strong>移除</strong>边 (基于 Array 实现)</td>
<td><em>O(|E|)</em></td>
<td><em>O(1)</em></td>
</tr>
<tr>
<td><strong>移除</strong>边 (基于 HashSet 实现)</td>
<td><em>O(1)</em></td>
<td><em>O(1</em></td>
</tr>
<tr>
<td><strong>获取</strong>相邻的顶点</td>
<td><em>O(|E|)</em></td>
<td><em>O(|V|)</em></td>
</tr>
<tr>
<td><strong>判断</strong>是否相邻 (基于 Array 实现)</td>
<td><em>O(|E|)</em></td>
<td><em>O(1)</em></td>
</tr>
<tr>
<td><strong>判断</strong>是否相邻  (基于 HashSet 实现)</td>
<td><em>O(1)</em></td>
<td><em>O(1)</em></td>
</tr>
</tbody>
</table>
<h1>图的基础</h1>
<p>图是一种（包含若干个节点），每个<strong>节点</strong>可以连接 0 个或多个元素</p>
<p>两个节点相连的部分称为<strong>边（edge）</strong>。节点也被称作<strong>顶点（vertice）</strong>。</p>
<p><img src="https://user-gold-cdn.xitu.io/2018/7/23/164c76f06793a319?w=459&amp;h=303&amp;f=jpeg&amp;s=28080" alt="" title="Graph is composed of vertices and edges"> </p>
<p>一个顶点的<strong>度（degree）</strong>是指与该顶点相连的边的条数。比如上图中，紫色顶点的度是 3，蓝色顶点的度是 1。</p>
<p>如果所有的边都是双向（译者注：或者理解为没有方向）的，那我们就有了一个<strong>无向图（undirected graph）</strong>。反之如果边是有向的，我们得到的就是<strong>有向图（directed graph）</strong>。你可以将有向图和无向图想象为单行道或双行道组成的交通网。</p>
<p><img src="https://user-gold-cdn.xitu.io/2018/7/23/164c76f0763f8910?w=704&amp;h=288&amp;f=jpeg&amp;s=29827" alt="" title="Directed vs Undirected graph"></p>
<p>顶点的边可以是从自己出发再连接回自己（如蓝色的顶点），拥有这样的边的图被称为<strong>自环</strong>。</p>
<p>图可以有<strong>环（cycle）</strong>，即如果遍历图的顶点，某个顶点可以被访问超过一次。而没有环的图被称为<strong>无环图（acyclic graph）</strong>。</p>
<p><img src="https://user-gold-cdn.xitu.io/2018/7/23/164c76f066352d46?w=667&amp;h=293&amp;f=jpeg&amp;s=28075" alt="" title="Cyclic vs Acyclic directed graph"></p>
<p>此外，无环无向图也被称为<strong>树（tree）</strong>。在下篇文章中，我们将深入套路这种数据结构。</p>
<p>在图中，从一个顶点出发，并非所有顶点都是可到达的。可能会存在孤立的顶点或者是相分离的子图。如果一个图所有顶点都至少有一条边（译者注：原文表述有点奇怪，个人认为不应该是至少有一条边，而是从任一节点出发，沿着各条边可以访问图中任意节点），这样的图被称为<strong>连通图（connected graph）</strong>。而当一个图中两两不同的顶点之间都恰有一条边相连，这样的图就是<strong>完全图（complete graph）</strong>。</p>
<p><img src="https://user-gold-cdn.xitu.io/2018/7/23/164c76f06428af90?w=987&amp;h=330&amp;f=jpeg&amp;s=60378" alt="" title="Complete vs Connected graph"></p>
<p>对于完全图而言，每个顶点都有 图的顶点数 - 1 条边。在上面完全图的例子中，一共有7个顶点，因此每个顶点有6条边。</p>
<h1>图的应用</h1>
<p>当图的每条边都被分配了权重时，我们就有了一个<strong>加权图（weighted graph）</strong>。如果边的权重被忽略，那么可以将（每条边的）权重都视为 1（译者注：权重都是一样，也就是无权重）。</p>
<p><img src="https://user-gold-cdn.xitu.io/2018/7/23/164c76f06abe1418?w=647&amp;h=210&amp;f=jpeg&amp;s=27730" alt="" title="Airports weighted graph"></p>
<p>加权图应用的场景很多，根据待解决问题主体的不同，有不同的展现。一起来看一些具体的场景吧：</p>
<ul>
<li><p>航空线路图 (如上图所示)</p>
<ul>
<li>顶点 = 机场</li>
<li>边 = 两个机场间的飞行线路</li>
<li>权重 = 两个机场间的距离</li>
</ul>
</li>
</ul>
<ul>
<li><p>GPS 导航</p>
<ul>
<li>顶点 = 交叉路口</li>
<li>边 = 道路</li>
<li>权重 = 从一个路口到另一个路口所花的时间</li>
</ul>
</li>
</ul>
<ul>
<li><p>网络</p>
<ul>
<li>顶点 = 服务器</li>
<li>边 = 数据链路</li>
<li>权重 = 连接速度</li>
</ul>
</li>
</ul>
<p>一般而言， 图在现实世界中的应用有：</p>
<ul>
<li>电子电路</li>
<li>航空控制</li>
<li>行车导航</li>
<li>电信设施： 基站建设规划</li>
<li>社交网络： Facebook 利用图来推荐（你可能认识的）朋友</li>
<li>推荐系统： Amazon/Netflix 利用图来推荐产品与电影</li>
<li>利用图来规划物流线路</li>
</ul>
<p><img src="https://user-gold-cdn.xitu.io/2018/7/23/164c76f06606e8cf?w=644&amp;h=530&amp;f=jpeg&amp;s=124568" alt="" title="Graph applications: path finder"></p>
<p>我们学习了图的基础以及它的一些应用场景。接下来一起学习怎么使用代码来表示图。</p>
<h1>图的表示</h1>
<p>图的表示有两种主要方式：</p>
<ol>
<li>邻接表</li>
<li>邻接矩阵</li>
</ol>
<p>让我们以有向图为例子，阐述这两种表示方式：</p>
<p><img src="https://user-gold-cdn.xitu.io/2018/7/23/164c76f08eab7b13?w=310&amp;h=310&amp;f=png&amp;s=28122" alt="" title="digraph"></p>
<p>这是一个拥有四个顶点的图。当一个顶点有一条边指向它自身时（译者注：即闭合的路径），称之为<strong>自环（self-loop）</strong>。</p>
<h2>邻接矩阵</h2>
<p>邻接矩阵使用二维数组（N x N）来表示图。如若不同顶点存在连接的边，就赋值两顶点交汇处为1（也可以是这条边的权重），反之赋值为 0 或者 -。</p>
<p>我们可以通过建立以下的邻接矩阵，来表示上面的图：</p>
<pre><code class="hljs stylus">  <span class="hljs-selector-tag">a</span> <span class="hljs-selector-tag">b</span> c d e
<span class="hljs-selector-tag">a</span> <span class="hljs-number">1</span> <span class="hljs-number">1</span> - - -
<span class="hljs-selector-tag">b</span> - - <span class="hljs-number">1</span> - -
c - - - <span class="hljs-number">1</span> -
d - <span class="hljs-number">1</span> <span class="hljs-number">1</span> - -
</code></pre><p>如你所见，矩阵水平与垂直两个方向都列出了所有的顶点。如果图中只有很少顶点互相连接，那么这个图就是<strong>稀疏图（sparse graph）</strong>。如果图相连的顶点很多（接近两两顶点都相连）的话，我们称这种图为<strong>稠密图（dense graph）</strong>。而如果图的每个顶点都直接连接到除此之外的所有顶点，那就是一个<strong>完全图（complete graph）</strong>。</p>
<p>注意，你必须意识到对于无向图而言，邻接矩阵<strong>始终</strong>是对角线对称的。然而，对于有向图而言，并非总是如此（反例如上面的有向图）。</p>
<p>那查询两个顶点是否相邻的时间复杂度是什么呢？</p>
<blockquote>
<p>在邻接矩阵中，查询两个顶点是否相邻的时间复杂度是  <em>O(1)</em>。</p>
</blockquote>
<p>那空间复杂度呢？</p>
<blockquote>
<p>利用邻接矩阵存储一个图，空间复杂度是 <em>O(n²)</em>，n 为顶点的数量，因此也可以表示为 <em>O(|V|²)</em>。</p>
</blockquote>
<p>添加一个顶点的时间复杂度呢？</p>
<p>邻接矩阵根据顶点的数量存储为  <code>V x V</code> 的矩阵。因此每增加一个顶点，矩阵需要重建为 <code>V+1 x V+1</code> 的新矩阵。</p>
<blockquote>
<p>（因此，）在邻接矩阵中添加一个顶点的时间复杂度是 <em>O(|V|²)</em>。</p>
</blockquote>
<p>如何获取相邻的顶点？</p>
<p>由于邻接矩阵是一个 <code>V x V</code> 的矩阵，为了获取所有相邻的顶点，我们必须去到该顶点所在的行中，查询它与其他顶点是否有边。</p>
<p>以上面的邻接矩阵为例，假设我们想知道与顶点 <code>b</code> 相邻的顶点有哪些，就需要到达记录 <code>b</code> 与其他节点关系的那一行中进行查询。</p>
<pre><code class="hljs stylus">  <span class="hljs-selector-tag">a</span> <span class="hljs-selector-tag">b</span> c d e
<span class="hljs-selector-tag">b</span> - - <span class="hljs-number">1</span> - -
</code></pre><p>访问它与其他所有顶点的关系，因此：</p>
<blockquote>
<p>在邻接矩阵中，查询相邻顶点的时间复杂度是  <em>O(|V|)</em>。</p>
</blockquote>
<p>想象一下，如果你需要将 FaceBook 中人们的关系网表示为一个图。你必须建立一个 <code>20亿 x 20亿</code> 的邻接矩阵，而该矩阵中很多位置都是空的。没有任何人可能认识其他所有人，最多也就认识几千个人。</p>
<p>通常，我们使用邻接矩阵处理稀疏图时，会浪费很多空间。这就是大多时候使用邻接表而不是邻接矩阵去表示一个图的原因（译者注：邻接矩阵也有优势的，尤其是表示有向稠密图时，比邻接表要方便得多）。</p>
<h2>邻接表</h2>
<p>表示一个图，最常用的方式是邻接表。每个顶点都有一个记录着与它所相邻顶点的表。</p>
<p>可以使用一个数组或者 HashMap 来建立一个邻接表，它存储这所有的顶点。每个顶点都有一个列表（可以是数组、链表、集合等数据结构），存放着与其相邻的顶点。</p>
<p>例如上面的图，对于顶点 a，与之相邻的有顶点 b，同时也是自环；而顶点 b 则有指向顶点 c 的边，如此类推：</p>
<pre><code class="hljs stylus"><span class="hljs-selector-tag">a</span> -&gt; { <span class="hljs-selector-tag">a</span> <span class="hljs-selector-tag">b</span> }
<span class="hljs-selector-tag">b</span> -&gt; { c }
c -&gt; { d }
d -&gt; { <span class="hljs-selector-tag">b</span> c }
</code></pre><p>和想象中的一样，如果想知道一个顶点是否连接着其他顶点，就必须遍历（顶点的）整个列表。</p>
<blockquote>
<p>在邻接表中查询两个顶点是否相连的时间复杂度是 <em>O(n)</em>，n 为顶点的数量，因此也可以表示为  <em>O(|V|)</em>。</p>
</blockquote>
<p>那空间复杂度呢？</p>
<blockquote>
<p>利用邻接表存储一个图的空间复杂度是  <em>O(n)</em>，n 为顶点数量与边数量之和，因此也可以表示为 <em>O(|V| + |E|)</em>。</p>
</blockquote>
<h1>基于 HashMap 实现的邻接表</h1>
<p>要表示一个图，最常见的方式是使用邻接表。有几种实现邻接表的方式：</p>
<p>最简单的实现方式之一是使用 HashMap。HashMap 的键是顶点的值，HashMap 的值是一个邻接数组（即也该顶点相邻顶点的集合）。</p>
<pre><code class="hljs prolog">const graph = {
  a：[ <span class="hljs-string">'a'</span>，<span class="hljs-string">'b'</span> ]，
  b：[ <span class="hljs-string">'c'</span> ]，
  c：[ <span class="hljs-string">'d'</span> ]，
  d：[ <span class="hljs-string">'b'</span>，<span class="hljs-string">'c'</span> ]
};
</code></pre><p>图通常需要实现以下两种操作：</p>
<ul>
<li>添加或删除顶点。</li>
<li>添加或删除边。</li>
</ul>
<p>添加或删除一个顶点需要更新邻接表。</p>
<p>假设需要删除顶点 b。我们不但需要 <code>delete graph['b']</code>，还需要删除顶点 a 与顶点 d 的邻接数组中的引用。</p>
<p>每当移除一个顶点，都需要遍历整个邻接表，因此时间复杂度是 <em>O(|V| + |E|)</em>。有更好的实现方式吗？稍后再回答这问题。首先让我们以更面向对象的方式实现邻接表，之后切换（邻接表的底层）实现将更容易。</p>
<h1>基于邻接表，以面向对象风格实现图</h1>
<p>先从顶点的类开始，在该类中，除了保存顶点自身以及它的相邻顶点集合之外，还会编写一些方法，用于在邻接表中增加或删除相邻的顶点。</p>
<pre><code class="hljs crmsh">class <span class="hljs-keyword">Node</span> <span class="hljs-title">{
  constructor</span>(value) {
    this.value = value;
    this.adjacents = []; // adjacency list
  }

  addAdjacent(<span class="hljs-keyword">node</span><span class="hljs-title">) {
    this</span>.adjacents.push(<span class="hljs-keyword">node</span><span class="hljs-title">);
  }

  removeAdjacent</span>(<span class="hljs-keyword">node</span><span class="hljs-title">) {
    const</span> index = this.adjacents.indexOf(<span class="hljs-keyword">node</span><span class="hljs-title">);
    if</span> (index &gt; -<span class="hljs-number">1</span>) {
      this.adjacents.splice(index, <span class="hljs-number">1</span>);
      return <span class="hljs-keyword">node</span><span class="hljs-title">;
    }
  }

  getAdjacents</span>() {
    return this.adjacents;
  }

  isAdjacent(<span class="hljs-keyword">node</span><span class="hljs-title">) {
    return</span> this.adjacents.indexOf(<span class="hljs-keyword">node</span><span class="hljs-title">) &gt; -1</span>;
  }
}
</code></pre><p>注意，<code>addAdjacent</code> 方法的时间复杂度是  <em>O(1)</em>，但删除相邻顶点的函数时间复杂度是  <em>O(|E|)</em>。如果不使用数组而是用 HashSet 会怎样呢？（删除相邻顶点的）时间复杂度会下降到 <em>O(1)</em>。但现在先让代码能跑起来，之后再做优化。</p>
<blockquote>
<p>Make it work. Make it right. Make it faster.</p>
</blockquote>
<p>现在有了 <code>Node</code> 类，是时候编写 <code>Graph</code> 类，它可以执行添加或删除顶点和边。</p>
<p><strong>Graph.constructor</strong></p>
<pre><code class="hljs javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Graph</span> </span>{
  <span class="hljs-keyword">constructor</span>(edgeDirection = Graph.DIRECTED) {
    <span class="hljs-keyword">this</span>.nodes = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>();
    <span class="hljs-keyword">this</span>.edgeDirection = edgeDirection;
  }
  <span class="hljs-comment">// ...</span>
}
Graph.UNDIRECTED = <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">'directed graph'</span>); <span class="hljs-comment">// one-way edges</span>
Graph.DIRECTED = <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">'undirected graph'</span>); <span class="hljs-comment">// two-ways edges</span>
</code></pre><p>首先，我们需要确认图是有向还是无向的，当添加边时，这会有所不同。</p>
<p><strong>Graph.addEdge</strong></p>
<p>添加一条新的边，需要知道两个顶点：边的起点与边的终点。</p>
<pre><code class="hljs kotlin">addEdge(source, destination) {
  const sourceNode = <span class="hljs-keyword">this</span>.addVertex(source);
  const destinationNode = <span class="hljs-keyword">this</span>.addVertex(destination);
  sourceNode.addAdjacent(destinationNode);
  <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.edgeDirection === Graph.UNDIRECTED) {
    destinationNode.addAdjacent(sourceNode);
  }
  <span class="hljs-keyword">return</span> [sourceNode, destinationNode];
}
</code></pre><p>我们往边的起点添加了一个相邻顶点（即边的终点）。如果该图是无向图，也需要往边的终点添加一个相邻顶点（即边的起点），因为（无向图中）边是双向的。</p>
<blockquote>
<p>在邻接表中新增一条边的时间复杂度是：<em>O(1)</em>。</p>
</blockquote>
<p>如果新添加的边两端的顶点并不存在，就必需先创建（不存在的顶底），下面让我们来实现它！</p>
<p><strong>Graph.addVertex</strong></p>
<p>创建顶点的方式是往 <code>this.nodes</code> 中新增一个顶点。<code>this.nodes</code> 中存储着的是一组组键值对，键是顶点的值，值是 <code>Node</code> 类的实例。注意看下面代码的 5-6 行（即 <code>const vertex = new Node(value); this.nodes.set(value, vertex);</code>）：</p>
<pre><code class="hljs cs">addVertex(<span class="hljs-keyword">value</span>) {
  <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.nodes.has(<span class="hljs-keyword">value</span>)) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.nodes.<span class="hljs-keyword">get</span>(<span class="hljs-keyword">value</span>);
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">const</span> vertex = <span class="hljs-keyword">new</span> Node(<span class="hljs-keyword">value</span>);
    <span class="hljs-keyword">this</span>.nodes.<span class="hljs-keyword">set</span>(<span class="hljs-keyword">value</span>, vertex);
    <span class="hljs-keyword">return</span> vertex;
  }
}
</code></pre><p>没必要覆写已存在的顶点。因此先检查一下顶点是否存在，如果不存在才创造一个新节点。</p>
<blockquote>
<p>在邻接表中新增一个顶点的时间复杂度是： <em>O(1)</em>。</p>
</blockquote>
<p><strong>Graph.removeVertex</strong></p>
<p>从一个图中删除一个顶点会相对麻烦一点。我们必须检查待删除的顶点是否为其他顶点的相邻顶点。</p>
<pre><code class="hljs cs">removeVertex(<span class="hljs-keyword">value</span>) {
  <span class="hljs-keyword">const</span> current = <span class="hljs-keyword">this</span>.nodes.<span class="hljs-keyword">get</span>(<span class="hljs-keyword">value</span>);
  <span class="hljs-keyword">if</span>(current) {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> node of <span class="hljs-keyword">this</span>.nodes.values()) {
      node.removeAdjacent(current);
    }
  }
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.nodes.delete(<span class="hljs-keyword">value</span>);
}
</code></pre><p>必须访问每个顶点及其它们的相邻顶点集合。</p>
<blockquote>
<p>在邻接表中删除一个顶点的时间复杂度是： <em>O(|V| + |E|)</em>。</p>
</blockquote>
<p>最后，一起来实现删除一条边吧！</p>
<p><strong>Graph.removeEdge</strong></p>
<p>删除一条边是十分简单的，与新增一条边类似。</p>
<pre><code class="hljs kotlin">removeEdge(source, destination) {
  const sourceNode = <span class="hljs-keyword">this</span>.nodes.<span class="hljs-keyword">get</span>(source);
  const destinationNode = <span class="hljs-keyword">this</span>.nodes.<span class="hljs-keyword">get</span>(destination);
  <span class="hljs-keyword">if</span>(sourceNode &amp;&amp; destinationNode) {
    sourceNode.removeAdjacent(destinationNode);
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.edgeDirection === Graph.UNDIRECTED) {
      destinationNode.removeAdjacent(sourceNode);
    }
  }
  <span class="hljs-keyword">return</span> [sourceNode, destinationNode];
}
</code></pre><p>删除与新增一条边主要的不同是：</p>
<ul>
<li>如果边两端的顶点不存在，不再需要创建它。</li>
<li>使用<code>Node.removeAdjacent</code> 而不是 <code>Node.addAdjacent</code>。</li>
</ul>
<p>由于 <code>removeAdjacent</code> 需要遍历相邻节点的集合，因此它的运行时是：</p>
<blockquote>
<p>在邻接表中删除一条边的时间复杂度是：  <em>O(|E|)</em>。</p>
</blockquote>
<p>接下来，我们将讨论如何从图中搜索。</p>
<h1>广度优先搜索(BFS) - 图的搜索</h1>
<p>广度优先搜索是一种从最初的顶点开始，优先访问所有相邻顶点的搜索方法。</p>
<p><img src="https://user-gold-cdn.xitu.io/2018/7/23/164c76f095c3bd34?w=500&amp;h=500&amp;f=gif&amp;s=13445" alt="" title="Breadth First Search in a graph"></p>
<p>接下来一起看看如何用代码来实现它：</p>
<pre><code class="hljs crmsh">*bfs(first) {
  const visited = new Map();
  const visitList = new Queue();
  visitList.add(first);
  while(!visitList.isEmpty()) {
    const <span class="hljs-keyword">node</span> <span class="hljs-title">= visitList</span>.remove();
    if(<span class="hljs-keyword">node</span> <span class="hljs-title">&amp;&amp; !visited</span>.has(<span class="hljs-keyword">node</span><span class="hljs-title">)) {
      yield</span> <span class="hljs-keyword">node</span><span class="hljs-title">;
      visited</span>.set(<span class="hljs-keyword">node</span><span class="hljs-title">);
      node</span>.getAdjacents().forEach(adj =&gt; visitList.add(adj));
    }
  }
}
</code></pre><p>正如你所见的一样，我们使用了一个队列来暂存待访问的顶点，队列遵循先进先出（FIFO）的原则。</p>
<p>同时也是用了 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator">JavaScript generators</a>，要注意函数名前面 <code>*</code>（，那是生成器的标志）。通过生成器，可以一次迭代一个值（即顶点）。对于巨型（包含数以百万计的顶点）的图而言是很有用的，很多情况下不用访问图的每一个顶点。</p>
<p>以下是如何使用上述 BFS 代码的示例：</p>
<pre><code class="hljs lsl">const graph = new Graph(Graph.UNDIRECTED);
const [first] = graph.addEdge(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>);
graph.addEdge(<span class="hljs-number">1</span>, <span class="hljs-number">3</span>);
graph.addEdge(<span class="hljs-number">1</span>, <span class="hljs-number">4</span>);
graph.addEdge(<span class="hljs-number">5</span>, <span class="hljs-number">2</span>);
graph.addEdge(<span class="hljs-number">6</span>, <span class="hljs-number">3</span>);
graph.addEdge(<span class="hljs-number">7</span>, <span class="hljs-number">3</span>);
graph.addEdge(<span class="hljs-number">8</span>, <span class="hljs-number">4</span>);
graph.addEdge(<span class="hljs-number">9</span>, <span class="hljs-number">5</span>);
graph.addEdge(<span class="hljs-number">10</span>, <span class="hljs-number">6</span>);
bfsFromFirst = graph.bfs(first);
bfsFromFirst.next().value.value; <span class="hljs-comment">// 1</span>
bfsFromFirst.next().value.value; <span class="hljs-comment">// 2</span>
bfsFromFirst.next().value.value; <span class="hljs-comment">// 3</span>
bfsFromFirst.next().value.value; <span class="hljs-comment">// 4</span>
<span class="hljs-comment">// ...</span>
</code></pre><p>你可以在<a href="https://github.com/amejiarosario/algorithms.js/blob/master/lib/data-structures/graphs/graph.spec.js">这</a>找到更多的测试代码。</p>
<p>接下来该讲述深度优先搜索了！</p>
<h1>深度优先搜索 (DFS) -图的搜索</h1>
<p>深度优先搜索是图的另一种搜索方法，通过递归搜索顶点的首个相邻顶点，再搜索其他相邻顶点，从而访问所有的顶点。</p>
<p><img src="https://user-gold-cdn.xitu.io/2018/7/23/164c76f0943a8a2b?w=500&amp;h=500&amp;f=gif&amp;s=13447" alt="" title="Depth First Search in a graph"></p>
<p>DFS 的实现近似于 BFS，但使用的是栈而不是队列：</p>
<pre><code class="hljs crmsh">*dfs(first) {
  const visited = new Map();
  const visitList = new Stack();
  visitList.add(first);
  while(!visitList.isEmpty()) {
    const <span class="hljs-keyword">node</span> <span class="hljs-title">= visitList</span>.remove();
    if(<span class="hljs-keyword">node</span> <span class="hljs-title">&amp;&amp; !visited</span>.has(<span class="hljs-keyword">node</span><span class="hljs-title">)) {
      yield</span> <span class="hljs-keyword">node</span><span class="hljs-title">;
      visited</span>.set(<span class="hljs-keyword">node</span><span class="hljs-title">);
      node</span>.getAdjacents().forEach(adj =&gt; visitList.add(adj));
    }
  }
}
</code></pre><p>测试例子如下：</p>
<pre><code class="hljs mipsasm">const graph = new Graph(Graph.UNDIRECTED)<span class="hljs-comment">;</span>
const [first] = graph.<span class="hljs-keyword">addEdge(1, </span><span class="hljs-number">2</span>)<span class="hljs-comment">;</span>
graph.<span class="hljs-keyword">addEdge(1, </span><span class="hljs-number">3</span>)<span class="hljs-comment">;</span>
graph.<span class="hljs-keyword">addEdge(1, </span><span class="hljs-number">4</span>)<span class="hljs-comment">;</span>
graph.<span class="hljs-keyword">addEdge(5, </span><span class="hljs-number">2</span>)<span class="hljs-comment">;</span>
graph.<span class="hljs-keyword">addEdge(6, </span><span class="hljs-number">3</span>)<span class="hljs-comment">;</span>
graph.<span class="hljs-keyword">addEdge(7, </span><span class="hljs-number">3</span>)<span class="hljs-comment">;</span>
graph.<span class="hljs-keyword">addEdge(8, </span><span class="hljs-number">4</span>)<span class="hljs-comment">;</span>
graph.<span class="hljs-keyword">addEdge(9, </span><span class="hljs-number">5</span>)<span class="hljs-comment">;</span>
graph.<span class="hljs-keyword">addEdge(10, </span><span class="hljs-number">6</span>)<span class="hljs-comment">;</span>
dfsFromFirst = graph.dfs(first)<span class="hljs-comment">;</span>
visitedOrder = Array.from(dfsFromFirst)<span class="hljs-comment">;</span>
const values = visitedOrder.map(node =&gt; node.value)<span class="hljs-comment">;</span>
console.log(values)<span class="hljs-comment">; // [1, 4, 8, 3, 7, 6, 10, 2, 5, 9]</span>
</code></pre><p> 正如你所看到的，BFS 与 DFS 所用的图（的数据）是一样的，然而访问顶点的顺序却非常不一样。BFS 是从 1 到 10 按顺序输出，DFS 则是先进入最深处访问顶点（译者注：其实这个例子是先序遍历，看起来可能不太像先深入最深处）。</p>
<h1>图的时间与空间复杂度</h1>
<p>我们接触了图的一些基础操作，如何添加和删除一个顶点或一条边，以下是前文涵盖内容的小结：</p>
<table>
<thead>
<tr>
<th></th>
<th>邻接表</th>
<th>邻接矩阵</th>
</tr>
</thead>
<tbody>
<tr>
<td>空间复杂度</td>
<td><em>O(|V|+ |E|)</em></td>
<td><em>O(|V|²)</em></td>
</tr>
<tr>
<td><strong>添加</strong>顶点</td>
<td><em>O(1)</em></td>
<td><em>O(|V|²)</em></td>
</tr>
<tr>
<td><strong>移除</strong>顶点</td>
<td><em>O(|V| + |E|)</em></td>
<td><em>O(|V|)²</em></td>
</tr>
<tr>
<td><strong>添加</strong>边</td>
<td><em>O(1)</em></td>
<td><em>O(1)</em></td>
</tr>
<tr>
<td><strong>移除</strong>边 (基于 Array 实现)</td>
<td><em>O(|E|)</em></td>
<td><em>O(1)</em></td>
</tr>
<tr>
<td><strong>移除</strong>边 (基于 HashSet 实现)</td>
<td><em>O(1)</em></td>
<td><em>O(1</em></td>
</tr>
<tr>
<td><strong>获取</strong>相邻的顶点</td>
<td><em>O(|E|)</em></td>
<td><em>O(|V|)</em></td>
</tr>
<tr>
<td><strong>判断</strong>是否相邻 (基于 Array 实现)</td>
<td><em>O(|E|)</em></td>
<td><em>O(1)</em></td>
</tr>
<tr>
<td><strong>判断</strong>是否相邻  (基于 HashSet 实现)</td>
<td><em>O(1)</em></td>
<td><em>O(1)</em></td>
</tr>
</tbody>
</table>
<p>正如上表所示，邻接表中几乎所有的操作方法都是更快的。邻接矩阵比邻接表性能更高的方法只有一处：检查顶点是否与其他顶点相邻，然而使用 HashSet 而不是 Array 实现邻接表的话，也能在恒定时间内获取结果 :)</p>
<h1>总结</h1>
<p>图可以是很多现实场景的抽象，如机场，社交网络，互联网等。我们介绍了一些图的基础算法，如广度优先搜索（BFS）与深度优先搜索（DFS）等。同时权衡了图的不同实现方式：邻接矩阵和邻接表。我们将在另外一篇文章（更深入地）介绍图的其他应用，如查找图的两个顶点间的最短距离及其他有趣的算法（译者注：这篇文章介绍的比较基础，图的各种算法才是最有趣的，有兴趣的同学可以搜索相关的慕课)）。</p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/graph-data-structures-for-beginners](https://www.zcfy.cc/article/graph-data-structures-for-beginners)
原文标题: 初学者应该了解的数据结构： Graph
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
