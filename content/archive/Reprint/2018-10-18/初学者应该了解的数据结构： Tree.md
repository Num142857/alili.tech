---
title: 初学者应该了解的数据结构： Tree
hidden: true
categories: [reprint]
slug: fcaaa7e6
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <p><img src="https://adrianmejia.com/images/data-structures-for-beginners-trees-binary-search-tree-large.jpg" alt="Tree Data Structures for Beginners"></p>
<p>很多（上层）数据结构，如 Map、Set 等，它们的基础数据结构都（可以）是 Tree。同时，在数据库中快速搜索（元素）用到了树。HTML 的 DOM 节点也通过树来表示对应的层次结构。以上仅仅是树的一少部分例子。在这篇文章中，我们将探讨不同类型的树，如二叉树、二叉搜索树以及如何实现它们。</p>
<p>在<a href="https://adrianmejia.com/blog/2018/05/14/Data-Structures-for-Beginners-Graphs-Time-Complexity-tutorial/">上一篇文章</a>中，我们探讨了数据结构：图，它是树一般化的情况。让我们开始学习树吧！</p>
<hr>
<p>本篇是以下教程的一部分（译者注：如果大家觉得还不错，我会翻译整个系列的文章）:</p>
<p><strong>初学者应该了解的数据结构与算法（DSA）</strong></p>
<ol>
<li><a href="https://adrianmejia.com/blog/2018/04/04/how-you-can-change-the-world-learning-data-structures-algorithms-free-online-course-tutorial/">算法的时间复杂性与大 O 符号</a></li>
<li><a href="https://adrianmejia.com/blog/2018/04/05/most-popular-algorithms-time-complexity-every-programmer-should-know-free-online-tutorial-course/">每个程序员应该知道的八种时间复杂度</a></li>
<li><a href="https://adrianmejia.com/blog/2018/04/28/Data-Structures-Time-Complexity-for-Beginners-Arrays-HashMaps-Linked-Lists-Stacks-Queues-tutorial/">初学者应该了解的数据结构：Array、HashMap 与 List</a></li>
<li><a href="https://adrianmejia.com/blog/2018/05/14/Data-Structures-for-Beginners-Graphs-Time-Complexity-tutorial/">初学者应该了解的数据结构： Graph</a></li>
<li>初学者应该了解的数据结构：Tree <strong>👈 即本文</strong></li>
<li><a href="https://adrianmejia.com/blog/2018/07/16/self-balanced-binary-search-trees-with-avl-tree-data-structure-for-beginners/">自平衡二叉搜索树</a></li>
<li><a href="https://adrianmejia.com/blog/2018/04/24/Analysis-of-Recursive-Algorithms/">附录 I：递归算法分析</a></li>
</ol>
<hr>
<h1>树的基本概念</h1>
<p>在树中，每个节点可有零个或多个子节点，每个节点都包含一个<strong>值</strong>。和图一样，节点之间的连接被称为<strong>边</strong>。树是图的一种，但并不是所有图都是树（只有无环无向图才是树）。</p>
<p>这种数据类型之所以被称为树，是因为它长得很像一棵（倒置的）树 🌳。它从<strong>根</strong>节点出发，它的子节点是它的<strong>分支</strong>，没有任何子节点的节点就是树的<strong>叶子</strong>（即叶节点）。</p>
<p><img src="https://p0.ssl.qhimg.com/t015cb24ea4f5b908a4.jpg" alt=""></p>
<p>以下是树的一些属性：</p>
<ul>
<li>最顶层的节点被称为<strong>根</strong>（root）节点（译者注：即没有任何父节点的节点）。</li>
<li>没有任何子节点的节点被称为<strong>叶</strong>节点（leaf node）或者<strong>终端</strong>节点（terminal node）。</li>
<li>树的<strong>度</strong>（Height）是最深的叶节点与根节点之间的距离（即边的数量）。<ul>
<li><code>A</code> 的度是 3。</li>
<li><code>I</code> 的度是 0（译者注：子树也是树，I 的度是指 I 为根节点的子树的度）。</li>
</ul>
</li>
<li><strong>深度</strong>（Depth）或者<strong>层次</strong>（level）是节点与根节点的距离。<ul>
<li><code>H</code> 的层次是 2。</li>
<li><code>B</code> 的层次是 1。</li>
</ul>
</li>
</ul>
<h2>树的简单实现</h2>
<p>正如此前所见，树的节点有一个值，且存有它每一个子节点的引用。</p>
<p>以下是节点的例子：</p>
<pre><code class="hljs cs"><span class="hljs-keyword">class</span> <span class="hljs-title">TreeNode</span> {
  constructor(<span class="hljs-keyword">value</span>) {
    <span class="hljs-keyword">this</span>.<span class="hljs-keyword">value</span> = <span class="hljs-keyword">value</span>;
    <span class="hljs-keyword">this</span>.descendents = [];
  }
}
</code></pre><p>我们可以创建一棵树，它有三个叶节点：</p>
<pre><code class="hljs actionscript"><span class="hljs-comment">// create nodes with values</span>
<span class="hljs-keyword">const</span> abe = <span class="hljs-keyword">new</span> TreeNode(<span class="hljs-string">'Abe'</span>);
<span class="hljs-keyword">const</span> homer = <span class="hljs-keyword">new</span> TreeNode(<span class="hljs-string">'Homer'</span>);
<span class="hljs-keyword">const</span> bart = <span class="hljs-keyword">new</span> TreeNode(<span class="hljs-string">'Bart'</span>);
<span class="hljs-keyword">const</span> lisa = <span class="hljs-keyword">new</span> TreeNode(<span class="hljs-string">'Lisa'</span>);
<span class="hljs-keyword">const</span> maggie = <span class="hljs-keyword">new</span> TreeNode(<span class="hljs-string">'Maggie'</span>);
<span class="hljs-comment">// associate root with is descendents</span>
abe.descendents.push(homer);
homer.descendents.push(bart, lisa, maggie);
</code></pre><p>这样就完成啦，我们有了一棵树！</p>
<p><img src="https://p0.ssl.qhimg.com/t01516921afe77ca73b.jpg" alt="" title="Simpson tree data structure"></p>
<p>节点 <code>abe</code> 是<strong>根</strong>节点，而节点 <code>bart</code>、<code>lisa</code> 和 <code>maggie</code> 则是这棵树的 <strong>叶</strong>节点。注意，树的节点的子节点可以是任意数量的，无论是 0 个、1 个、3 个或是多个均可。</p>
<h1>二叉树</h1>
<p>树的节点可以有 0 个或多个子节点。然而，当一棵树（的所有节点）最多只能有两个子节点时，这样的树被称为<strong>二叉树</strong>。</p>
<p>二叉树是树中最常见的形式之一，它应用广泛，如：</p>
<ul>
<li><a href="https://adrianmejia.com/blog/2018/04/28/data-structures-time-complexity-for-beginners-arrays-hashmaps-linked-lists-stacks-queues-tutorial/#HashMaps">Maps</a></li>
<li><a href="https://adrianmejia.com/blog/2018/04/28/data-structures-time-complexity-for-beginners-arrays-hashmaps-linked-lists-stacks-queues-tutorial/#Sets">Sets</a></li>
<li>数据库</li>
<li>优先队列</li>
<li>在 LDAP（Lightweight Directory Access Protocol）中查找相应信息。</li>
<li>在 XML/HTML 文件中，使用文档对象模型（DOM）接口进行搜索。</li>
</ul>
<h2>完满二叉树、完全二叉树、完美二叉树</h2>
<p>取决于二叉树节点的组织方式，一棵二叉树可以是<strong>完满二叉树</strong>、<strong>完全二叉树</strong>或<strong>完美二叉树</strong>。</p>
<ul>
<li><strong>完满二叉树</strong>（Full binary tree）：除去叶节点，每个节点都有两个子节点。</li>
<li><strong>完全二叉树</strong>（Complete binary tree）：除了最深一层之外，其余所有层的节点都必须有两个子节点（译者注：其实还需要最深一层的节点均集中在左边，即左对齐）。</li>
<li><strong>完美二叉树</strong>（Perfect binary tree）：满足完全二叉树性质，树的叶子节点均在最后一层（也就是形成了一个完美的三角形）。</li>
</ul>
<p>（译者注：国内外的定义是不同的，此处根据原文与查找的资料，作了一定的修改，用的是国外的标准）</p>
<p>下图是上述概念的例子：</p>
<p><img src="https://p0.ssl.qhimg.com/t01b0d1575bd8040171.jpg" alt="" title="Full vs. Complete vs. Perfect Binary Tree"></p>
<p>完满二叉树、完全二叉树与完美二叉树并不总是互斥的：</p>
<ul>
<li>完美二叉树<strong>必然</strong>是完满二叉树和完全二叉树。<ul>
<li>完美的二叉树正好有 2 的 k 次方 减 1 个节点，其中 k 是树的最深一层（从1开始）。.</li>
</ul>
</li>
<li>完全二叉树并不总是完满二叉树。<ul>
<li>正如上面的完全二叉树例子，最右侧的灰色节点是它父子点仅有的一个子节点。如果移除掉它，这棵树就既是完全二叉树，也是完满二叉树。（译者注：其实有了那个灰色节点的话，这颗树不能算是完全二叉树的，因为完满二叉树需要左对齐）</li>
</ul>
</li>
<li>完满二叉树并不一定是完全二叉树与完美二叉树。</li>
</ul>
<h1>二叉搜索树 (BST)</h1>
<p>二叉搜索树（Binary Search Tree，简写为：BST）是二叉树的特定应用。BST 的每个节点如二叉树一样，最多只能有两个子节点。然而，BST 左子节点的值必须小于父节点的值，而右子节点的值则必须大于父节点的值。</p>
<p><strong>强调一下</strong>：一些 BST 并不允许重复值的节点被添加到树中，如若允许，那么重复值的节点将作为右子节点。有些二叉搜索树的实现，会记录起重复的情况（这也是接下来我们需要实现的）。 </p>
<p>一起来实现二叉搜索树吧！</p>
<h2>BST 的实现</h2>
<p>BST 的实现与上文树的实现相像，然而有两点不同：</p>
<ul>
<li>节点最多只能拥有两个子节点。</li>
<li>节点的值满足以下关系：<code>左子节点 &lt; 父节点 &lt; 右子节点</code>。</li>
</ul>
<p>以下是树节点的实现，与之前树的实现类似，但会为左右子节点添加 <code>getter</code> 与 <code>setter</code>。请注意，实例中会保存父节点的引用，当添加新的子节点时，将更新（子节点中）父节点的引用。</p>
<pre><code class="hljs kotlin">const LEFT = <span class="hljs-number">0</span>;
const RIGHT = <span class="hljs-number">1</span>;
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TreeNode</span> </span>{
  <span class="hljs-keyword">constructor</span>(value) {
    <span class="hljs-keyword">this</span>.value = value;
    <span class="hljs-keyword">this</span>.descendents = [];
    <span class="hljs-keyword">this</span>.parent = <span class="hljs-literal">null</span>;
    <span class="hljs-comment">//译者注：原文并没有以下两个属性，但不加上去话下文的实现会报错</span>
    <span class="hljs-keyword">this</span>.newNode.isParentLeftChild = <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">this</span>.meta = {};  
  }
  <span class="hljs-keyword">get</span> left() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.descendents[LEFT];
  }
  <span class="hljs-keyword">set</span> left(node) {
    <span class="hljs-keyword">this</span>.descendents[LEFT] = node;
    <span class="hljs-keyword">if</span> (node) {
      node.parent = <span class="hljs-keyword">this</span>;
    }
  }
  <span class="hljs-keyword">get</span> right() {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.descendents[RIGHT];
  }
  <span class="hljs-keyword">set</span> right(node) {
    <span class="hljs-keyword">this</span>.descendents[RIGHT] = node;
    <span class="hljs-keyword">if</span> (node) {
      node.parent = <span class="hljs-keyword">this</span>;
    }
  }
}
</code></pre><p>OK，现在已经可以添加左右子节点。接下来将编写 BST 类，使其满足 <code>左子节点 &lt; 父节点 &lt; 右子节点</code>。</p>
<pre><code class="hljs cs"><span class="hljs-keyword">class</span> <span class="hljs-title">BinarySearchTree</span> {
  constructor() {
    <span class="hljs-keyword">this</span>.root = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">this</span>.size = <span class="hljs-number">0</span>;
  }
  <span class="hljs-keyword">add</span>(<span class="hljs-keyword">value</span>) { <span class="hljs-comment">/* ... */</span> }
  find(<span class="hljs-keyword">value</span>) { <span class="hljs-comment">/* ... */</span> }
  <span class="hljs-keyword">remove</span>(<span class="hljs-keyword">value</span>) { <span class="hljs-comment">/* ... */</span> }
  getMax() { <span class="hljs-comment">/* ... */</span> }
  getMin() { <span class="hljs-comment">/* ... */</span> }
}
</code></pre><p>下面先编写插入新节点相关的的代码。</p>
<h2>BST 节点的插入</h2>
<p>要将一个新的节点插入到二叉搜索树中，我们需要以下三步：</p>
<ol>
<li>如果树中没有任何节点，第一个节点当成为<strong>根节点</strong>。</li>
<li>（将新插入节点的值）与树中的根节点或树节点进行对比，如果值 _更大_，则放至右子树（进行下一次对比），反之放到左子树（进行对比） 。如果值一样，则说明被重复添加，可增加重复节点的计数。</li>
<li>重复第二点操作，直至找到空位插入新节点。</li>
</ol>
<p>让我们通过以下例子来说明，树中将依次插入30、40、10、15、12、50：</p>
<p><img src="https://p0.ssl.qhimg.com/t011df4b16eceab43de.gif" alt="" title="Inserting nodes on a Binary Search Tree (BST)"></p>
<p>代码实现如下：</p>
<pre><code class="hljs haxe">add(value) {
  const <span class="hljs-keyword">new</span><span class="hljs-type">Node</span> = <span class="hljs-keyword">new</span> <span class="hljs-type">TreeNode</span>(value);
  <span class="hljs-keyword">if</span> (<span class="hljs-built_in">this</span>.root) {
    const { found, parent } = <span class="hljs-built_in">this</span>.findNodeAndParent(value);
    <span class="hljs-keyword">if</span> (found) { <span class="hljs-comment">// duplicated: value already exist on the tree</span>
      found.meta.multiplicity = (found.meta.multiplicity || <span class="hljs-number">1</span>) + <span class="hljs-number">1</span>;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (value &lt; parent.value) {
      parent.left = <span class="hljs-keyword">new</span><span class="hljs-type">Node</span>;
      <span class="hljs-comment">//译者注：原文并没有这行代码，但不加上去的话下文实现会报错</span>
      <span class="hljs-keyword">new</span><span class="hljs-type">Node</span>.isParentLeftChild = <span class="hljs-literal">true</span>;
    } <span class="hljs-keyword">else</span> {
      parent.right = <span class="hljs-keyword">new</span><span class="hljs-type">Node</span>;
    }
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-built_in">this</span>.root = <span class="hljs-keyword">new</span><span class="hljs-type">Node</span>;
  }
  <span class="hljs-built_in">this</span>.size += <span class="hljs-number">1</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span><span class="hljs-type">Node</span>;
}
</code></pre><p>我们使用了名为 <code>findNodeAndParent</code>  的辅助函数。如果（与新插入节点值相同的）节点已存在于树中，则将节点统计重复的计数器加一。看看这个辅助函数该如何实现：</p>
<pre><code class="hljs crmsh">findNodeAndParent(value) {
  let <span class="hljs-keyword">node</span> <span class="hljs-title">= this</span>.root;
  let parent;
  while (<span class="hljs-keyword">node</span><span class="hljs-title">) {
    if</span> (<span class="hljs-keyword">node</span>.<span class="hljs-title">value</span> === value) {
      break;
    }
    parent = <span class="hljs-keyword">node</span><span class="hljs-title">;
    node</span> = ( value &gt;= <span class="hljs-keyword">node</span>.<span class="hljs-title">value</span>) ? <span class="hljs-keyword">node</span>.<span class="hljs-title">right</span> : <span class="hljs-keyword">node</span>.<span class="hljs-title">left</span>;
  }
  return { found: <span class="hljs-keyword">node</span><span class="hljs-title">, parent</span> };
}
</code></pre><p><code>findNodeAndParent</code> 沿着树的结构搜索值。它从根节点出发，往左还是往右搜索取决于节点的值。如果已存在相同值的节点，函数返回找到的节点（即相同值的节点）与它的父节点。如果没有相同值的节点，则返回最后找到的节点（即将变为新插入节点父节点的节点）。</p>
<h2>BST 节点的删除</h2>
<p>我们已经知道如何（在二叉搜索树中）插入与查找值，现在将实现删除操作。这比插入而言稍微麻烦一点，让我们用下面的例子进行说明：</p>
<p><strong>删除叶节点（即没有任何子节点的节点）</strong></p>
<pre><code class="hljs lsl">    <span class="hljs-number">30</span>                             <span class="hljs-number">30</span>
 /     \         remove(<span class="hljs-number">12</span>)     /     \
<span class="hljs-number">10</span>      <span class="hljs-number">40</span>       ---------&gt;    <span class="hljs-number">10</span>      <span class="hljs-number">40</span>
  \    /  \                      \    /  \
  <span class="hljs-number">15</span>  <span class="hljs-number">35</span>   <span class="hljs-number">50</span>                    <span class="hljs-number">15</span>  <span class="hljs-number">35</span>   <span class="hljs-number">50</span>
  /
<span class="hljs-number">12</span>*
</code></pre><p>只需要删除父节点（即节点 #15）中保存着的 节点 #12 的引用即可。</p>
<p><strong>删除有一个子节点的节点</strong></p>
<pre><code class="hljs lsl">    <span class="hljs-number">30</span>                              <span class="hljs-number">30</span>
 /     \         remove(<span class="hljs-number">10</span>)      /     \
<span class="hljs-number">10</span>*     <span class="hljs-number">40</span>       ---------&gt;     <span class="hljs-number">15</span>      <span class="hljs-number">40</span>
  \    /  \                            /  \
  <span class="hljs-number">15</span>  <span class="hljs-number">35</span>   <span class="hljs-number">50</span>                         <span class="hljs-number">35</span>   <span class="hljs-number">50</span>
</code></pre><p>在这种情况中，我们将父节点 #30 中保存着的子节点 #10 的引用，替换为子节点的子节点 #15 的引用。</p>
<p><strong>删除有两个子节点的节点</strong></p>
<pre><code class="hljs lsl">   <span class="hljs-number">30</span>                              <span class="hljs-number">30</span>
 /     \         remove(<span class="hljs-number">40</span>)      /     \
<span class="hljs-number">15</span>      <span class="hljs-number">40</span>*      ---------&gt;     <span class="hljs-number">15</span>      <span class="hljs-number">50</span>
       /  \                            /
      <span class="hljs-number">35</span>   <span class="hljs-number">50</span>                         <span class="hljs-number">35</span>
</code></pre><p>待删除的节点 #40 有两个子节点（#35 与 #50）。我们将待删除节点替换为节点 #50。待删除的左子节点 #35 将在原位不动，但它的父节点已被替换。</p>
<p>另一个删除节点 #40 的方式是：将左子节点 #35 移到节点 #40 的位置，右子节点位置保持不变。</p>
<pre><code class="hljs lsl">    <span class="hljs-number">30</span>
 /     \
<span class="hljs-number">15</span>      <span class="hljs-number">35</span>
          \
           <span class="hljs-number">50</span>
</code></pre><p>两种形式都可以，这是因为它们都遵循了二叉搜索树的原则：<code>左子节点 &lt; 父节点 &lt; 右子节点</code>。</p>
<p><strong>删除根节点</strong></p>
<pre><code class="hljs lsl">   <span class="hljs-number">30</span>*                            <span class="hljs-number">50</span>
 /     \       remove(<span class="hljs-number">30</span>)      /     \
<span class="hljs-number">15</span>      <span class="hljs-number">50</span>     ---------&gt;     <span class="hljs-number">15</span>      <span class="hljs-number">35</span>
       /
      <span class="hljs-number">35</span>
</code></pre><p>删除根节点与此前讨论的机制情况差不多。唯一的区别是需要更新二叉搜索树实例中根节点的引用。</p>
<p>以下的动画是上述操作的具体展示：</p>
<p><img src="https://p0.ssl.qhimg.com/t01ae013251439d3f4b.gif" alt="" title="Removing a node with 0, 1, 2 children from a binary search tree"></p>
<p>在动画中，被移动的节点是左子节点或者左子树，右子节点或右子树位置保持不变。</p>
<p>关于删除节点，已经有了思路，让我们来实现它吧：</p>
<pre><code class="hljs kotlin">remove(value) {
  const nodeToRemove = <span class="hljs-keyword">this</span>.find(value);
  <span class="hljs-keyword">if</span> (!nodeToRemove) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  <span class="hljs-comment">// Combine left and right children into one subtree without nodeToRemove</span>
  const nodeToRemoveChildren = <span class="hljs-keyword">this</span>.combineLeftIntoRightSubtree(nodeToRemove);
  <span class="hljs-keyword">if</span> (nodeToRemove.meta.multiplicity &amp;&amp; nodeToRemove.meta.multiplicity &gt; <span class="hljs-number">1</span>) {
    nodeToRemove.meta.multiplicity -= <span class="hljs-number">1</span>; <span class="hljs-comment">// handle duplicated</span>
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (nodeToRemove === <span class="hljs-keyword">this</span>.root) {
    <span class="hljs-comment">// Replace (root) node to delete with the combined subtree.</span>
    <span class="hljs-keyword">this</span>.root = nodeToRemoveChildren;
    <span class="hljs-keyword">this</span>.root.parent = <span class="hljs-literal">null</span>; <span class="hljs-comment">// clearing up old parent</span>
  } <span class="hljs-keyword">else</span> {
    const side = nodeToRemove.isParentLeftChild ? <span class="hljs-string">'left'</span> : <span class="hljs-string">'right'</span>;
    const { parent } = nodeToRemove; <span class="hljs-comment">// get parent</span>
    <span class="hljs-comment">// Replace node to delete with the combined subtree.</span>
    parent[side] = nodeToRemoveChildren;
  }
  <span class="hljs-keyword">this</span>.size -= <span class="hljs-number">1</span>;
  <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
}
</code></pre><p>以下是实现中一些要注意的地方：</p>
<ul>
<li>首先，搜索待删除的节点是否存在。如果不存在，返回 <code>false</code>。</li>
<li>如果待删除的节点存在，则将它的左子树合并到右子树中，组合为一颗新子树。</li>
<li>替换待删除的节点为组合好的子树。</li>
</ul>
<p>将左子树组合到右子树的函数如下：</p>
<pre><code class="hljs crmsh">combineLeftIntoRightSubtree(<span class="hljs-keyword">node</span><span class="hljs-title">) {
  if</span> (<span class="hljs-keyword">node</span>.<span class="hljs-title">right</span>) {
    //译者注：原文是  getLeftmost，寻找左子树最大的节点，这肯定有问题，应该是找最小的节点才对
    const leftLeast = this.getLefLeast(<span class="hljs-keyword">node</span>.<span class="hljs-title">right</span>);  
    leftLeast.left = <span class="hljs-keyword">node</span>.<span class="hljs-title">left</span>;
    return <span class="hljs-keyword">node</span>.<span class="hljs-title">right</span>;
  }
  return <span class="hljs-keyword">node</span>.<span class="hljs-title">left</span>;
}
</code></pre><p>正如下面例子所示，我们想把节点 #30 删除，将待删除节点的左子树整合到右子树中，结果如下：</p>
<pre><code class="hljs lsl">   <span class="hljs-number">30</span>*                             <span class="hljs-number">40</span>
 /     \                          /  \
<span class="hljs-number">10</span>      <span class="hljs-number">40</span>    combine(<span class="hljs-number">30</span>)       <span class="hljs-number">35</span>   <span class="hljs-number">50</span>
  \    /  \   -----------&gt;      /
  <span class="hljs-number">15</span>  <span class="hljs-number">35</span>   <span class="hljs-number">50</span>                  <span class="hljs-number">10</span>
                                \
                                 <span class="hljs-number">15</span>
</code></pre><p>现在把新的子树的根节点作为整个二叉树的根节点，节点 #30 将不复存在！</p>
<h1>二叉树的遍历</h1>
<p>根据遍历的顺序，二叉树的遍历有若干种形式：中序遍历、先序遍历与后序遍历。同时，我们也可以使用在《初学者应该了解的数据结构： Graph》一文中学到的  DFS 或 BFS 来遍历整棵树。以下是具体的实现：</p>
<p><strong>中序遍历</strong>（In-Order Traversal）</p>
<p>中序遍历访问节点的顺序是：左子节点、节点本身、右子节点。</p>
<pre><code class="hljs crmsh">* inOrderTraversal(<span class="hljs-keyword">node</span> <span class="hljs-title">= this</span>.root) {
    if (<span class="hljs-keyword">node</span>.<span class="hljs-title">left</span>) { yield* this.inOrderTraversal(<span class="hljs-keyword">node</span>.<span class="hljs-title">left</span>); }
    yield <span class="hljs-keyword">node</span><span class="hljs-title">;
    if</span> (<span class="hljs-keyword">node</span>.<span class="hljs-title">right</span>) { yield* this.inOrderTraversal(<span class="hljs-keyword">node</span>.<span class="hljs-title">right</span>); }
  }
</code></pre><p>用以下这棵树作为例子：</p>
<pre><code class="hljs lsl">         <span class="hljs-number">10</span>
       /    \
      <span class="hljs-number">5</span>      <span class="hljs-number">30</span>
    /       /  \
   <span class="hljs-number">4</span>       <span class="hljs-number">15</span>   <span class="hljs-number">40</span>
 /
<span class="hljs-number">3</span>
</code></pre><p>中序遍历将按照以下顺序输出对应的值：3、4、5、10、15、30、40。也就是说，如果待遍历的树是一颗二叉搜索树，那输出值的顺序将是升序的。</p>
<p><strong>后序遍历</strong>（Post-Order Traversal）</p>
<p>后序遍历访问节点的顺序是：左子节点、右子节点、节点本身。</p>
<pre><code class="hljs crmsh">* postOrderTraversal(<span class="hljs-keyword">node</span> <span class="hljs-title">= this</span>.root) {
    if (<span class="hljs-keyword">node</span>.<span class="hljs-title">left</span>) { yield* this.postOrderTraversal(<span class="hljs-keyword">node</span>.<span class="hljs-title">left</span>); }
    if (<span class="hljs-keyword">node</span>.<span class="hljs-title">right</span>) { yield* this.postOrderTraversal(<span class="hljs-keyword">node</span>.<span class="hljs-title">right</span>); }
    yield <span class="hljs-keyword">node</span><span class="hljs-title">;
  }
</span></code></pre><p>后序遍历将按照以下顺序输出对应的值：3、4、5、15、40、30、10。</p>
<p><strong>先序遍历与 DFS</strong>（Pre-Order Traversal）</p>
<p>先序遍历访问节点的顺序是：节点本身、左子节点、右子节点。</p>
<pre><code class="hljs crmsh">* preOrderTraversal(<span class="hljs-keyword">node</span> <span class="hljs-title">= this</span>.root) {
    yield <span class="hljs-keyword">node</span><span class="hljs-title">;
    if</span> (<span class="hljs-keyword">node</span>.<span class="hljs-title">left</span>) { yield* this.preOrderTraversal(<span class="hljs-keyword">node</span>.<span class="hljs-title">left</span>); }
    if (<span class="hljs-keyword">node</span>.<span class="hljs-title">right</span>) { yield* this.preOrderTraversal(<span class="hljs-keyword">node</span>.<span class="hljs-title">right</span>); }
  }
</code></pre><p>先序遍历将按照以下顺序输出对应的值：10、5、4、3、30、15、40。与深度优先搜索（DPS）的顺序是一致的。</p>
<p><strong>广度优先搜索 (BFS)</strong></p>
<p>树的 BFS 可以通过队列来实现：</p>
<pre><code class="hljs routeros">* bfs() {
    const<span class="hljs-built_in"> queue </span>= new Queue();
    queue.<span class="hljs-builtin-name">add</span>(this.root);
    <span class="hljs-keyword">while</span> (!queue.isEmpty()) {
      const node = queue.<span class="hljs-builtin-name">remove</span>();
      yield node;
      node.descendents.<span class="hljs-keyword">forEach</span>(child =&gt; queue.<span class="hljs-builtin-name">add</span>(child));
    }
  }
</code></pre><p>BFS 将按照以下顺序输出对应的值：10、5、30、4、15、40、3。</p>
<h1>平衡树 vs. 非平衡树</h1>
<p>目前，我们已经讨论了如何新增、删除与查找元素。然而，我们并未谈到（相关操作的）时间复杂度，先思考一下最坏的情况。</p>
<p>假设按升序添加数字：</p>
<p><img src="https://p0.ssl.qhimg.com/t014b63aee408286fcc.gif" alt="" title="Inserting values in ascending order in a Binary Search Tree"></p>
<p>树的左侧没有任何节点！在这颗非平衡树（ Non-balanced Tree）中进行查找元素并不比使用链表所花的时间短，都是 <em>O(n)</em>。 😱</p>
<p>在非平衡树中查找元素，如同以逐页翻看的方式在字典中寻找一个单词。但如果树是平衡的，将类似于对半翻开字典，视乎该页的字母，选择左半部分或右半部分继续查找（对应的词）。</p>
<p>需要找到一种方式使树变得平衡！</p>
<p>如果树是<strong>平衡</strong>的，查找元素不在需要遍历全部元素，时间复杂度降为 <em>O(log n)</em>。让我们探讨一下平衡树的意义。</p>
<p><img src="https://p0.ssl.qhimg.com/t01348a324b8b528bae.jpg" alt="" title="Balanced vs unbalanced Tree"></p>
<p>如果在非平衡树中寻找值为 7 的节点，就必须从节点 #1 往下直到节点 #7。然而在平衡树中，我们依次访问 #4、#6 后，下一个节点将到达 #7。随着树规模的增大，（非平衡树的）表现会越来越糟糕。如果树中有上百万个节点，查找一个不存在的元素需要上百万次访问，而平衡树中只要20次！这是天壤之别！</p>
<p>我们将在下一篇文章中通过自平衡树来解决这个问题。</p>
<h1>总结</h1>
<p>我们讨论了不少树的基础，以下是相关的总结：</p>
<ul>
<li>树是一种数据结构，它的节点有 0 个或多个子节点。</li>
<li>树并不存在环，图才存在。</li>
<li>在二叉树中，每个节点最多只有两个子节点。</li>
<li>当一颗二叉树中，左子节点的值小于节点的值，而右子节点的值大于节点的值时，这颗树被称为<strong>二叉搜索树</strong>。</li>
<li>可以通过先序、后续和中序的方式访问一棵树。</li>
<li>在非平衡树中查找的时间复杂度是 <em>O(n)</em>。 🤦🏻</li>
<li>在平衡树中查找的时间复杂度是 <em>O(log n)</em>。 🎉</li>
</ul>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/tree-data-structures-for-beginners](https://www.zcfy.cc/article/tree-data-structures-for-beginners)
原文标题: 初学者应该了解的数据结构： Tree
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
