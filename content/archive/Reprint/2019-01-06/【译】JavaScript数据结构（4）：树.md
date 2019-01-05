---
title: '【译】JavaScript数据结构（4）：树' 
date: 2019-01-06 2:30:10
hidden: true
slug: 95lqazllq5m
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><strong>翻译</strong>：疯狂的技术宅<br><strong>英文</strong>：<a href="https://code.tutsplus.com/articles/data-structures-with-javascript-tree--cms-23393" rel="nofollow noreferrer" target="_blank">https://code.tutsplus.com/art...</a><br><strong>说明</strong>：本文翻译自系列文章《Data Structures With JavaScript》，总共为四篇，原作者是在美国硅谷工作的工程师 Cho S. Kim。这是本系列的第四篇。</p></blockquote>
<p>说明：本专栏文章首发于公众号：jingchengyideng 。</p>
<p>树是 web 开发中最常用的数据结构之一。 这种说法对开发者和用户都是正确的。每个编写HTML的开发者，只要把网页载入浏览器就会创建一个树，树通常被称为文档对象模型（DOM）。相应地，每个在互联网上浏览信息的人，也都是以DOM树的形式接受信息。 每个编写HTML并且将其加载到Web浏览器的Web开发人员都创建了一个树，这被称为文档对象模型（DOM）。互联网上的所有用户，在获取信息时，都是以树的形式收——即DOM。 </p>
<p>现在，高潮来了：你正在读的本文在浏览器中就是以树的形式进行渲染的。文字由<code>&lt;p&gt;</code>元素进行表示；<code>&lt;p&gt;</code>元素又嵌套在<code>&lt;body&gt;</code>元素中；<code>&lt;body&gt;</code>元素又嵌套在<code>&lt;html&gt;</code>元素中。  您正在阅读的段落表示为<code>&lt;p&gt;</code>元素中的文本；<code>&lt;p&gt;</code>元素嵌套在<code>&lt;body&gt;</code>元素中；<code>&lt;body&gt;</code>元素嵌套在<code>&lt;html&gt;</code>元素中。</p>
<p>这些嵌套数据和家族数类似。 <code>&lt;heml&gt;</code>是父元素，<code>&lt;body&gt;</code>是子元素，<code>&lt;p&gt;</code>又是<code>&lt;body&gt;</code>的子元素 如果这个比喻对你有点用的话，你将会发现在我们介绍树的时候会用到更多的类比。</p>
<p>在本文中，我们将会通过两种不同的遍历方式来创建一个树：深度优先(DFS)和广度优先(BFS)。 （如果你对遍历这个词感到比较陌生，不妨将他想象成访问树中的每一个节点。） 这两种类型的遍历强调了与树交互的不同方式， DFS和BFS分别用栈和队列来访问节点。 这听起来很酷！</p>
<h1 id="articleHeader0"><strong>树（深度搜索和广度搜索）</strong></h1>
<p>在计算机科学中，树是一种用节点来模拟分层数据的数据结构。每个树节点都包含他本身的数据及指向其他节点的指针。</p>
<p>节点和指针这些术语可能对一些读者来说比较陌生，所以让我们用类比来进一步描述他们。 让我们将树与组织图结构图进行比较。 这个结构图有一个顶级位置（根节点），比如CEO。 在这个节点下面还有一些其他的节点，比如副总裁(VP)。</p>
<p>为了表示这种关系，我们用箭头从CEO指向VP。 一个位置，比如CEO，是一个节点；我们创建的CEO到VP的关系是一个指针。 在我们的组织结构图中去创建更多的关系，我们只要重复这些步骤即可---我们让一个节点指向另一个节点。</p>
<p>在概念层次上，我希望节点和指针有意义。 在实际中，我们能从更科学的实例中获取收益。 让我们来思考DOM。 DOM有<code>&lt;html&gt;</code>元素作为其顶级位置（根节点）。 这个节点指向<code>&lt;head&gt;</code>元素和<code>&lt;body&gt;</code>元素。 这些步骤在DOM的所有节点中重复。</p>
<p>这种设计的一个优点是能够嵌套节点：例如：一个<code>&lt;ul&gt;</code>元素能够包含很多个<code>&lt;li&gt;</code>元素；此外，每个<code>&lt;li&gt;</code>元素能拥有兄弟<code>&lt;li&gt;</code>元素。这很怪异，但是确实真实有趣！</p>
<h2 id="articleHeader1"><strong>操作树</strong></h2>
<p>由于每个树都包含节点，其可以是来自树的单独构造器，我们将概述两个构造函数的操作：<code>Node</code>和<code>Tree</code></p>
<h3 id="articleHeader2"><strong>节点</strong></h3>
<ul>
<li><p><code>data</code> 存储值。</p></li>
<li><p><code>parent</code> 指向节点的父节点。</p></li>
<li><p><code>children</code> 指向列表中的下一个节点。</p></li>
</ul>
<h3 id="articleHeader3"><strong>树</strong></h3>
<ul>
<li><p><code>_root</code> 指向一个树的根节点。</p></li>
<li><p><code>traverseDF(callback)</code> 对树进行DFS遍历。</p></li>
<li><p><code>traverseBF(callback)</code> 对树进行BFS遍历。</p></li>
<li><p><code>contains(data, traversal)</code> 搜索树中的节点。</p></li>
<li><p><code>add(data, toData, traverse)</code> 向树中添加节点。</p></li>
<li><p><code>remove(child, parent)</code> 移除树中的节点。</p></li>
</ul>
<h2 id="articleHeader4"><strong>实现树</strong></h2>
<p>现在开始写树的代码！</p>
<h3 id="articleHeader5"><strong>节点的属性</strong></h3>
<p>在实现中，我们首先定义一个叫做<code>Node</code>的函数，然后构造一个<code>Tree</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Node(data) {
    this.data = data;
    this.parent = null;
    this.children = [];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Node</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-keyword">this</span>.data = data;
    <span class="hljs-keyword">this</span>.parent = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">this</span>.children = [];
}</code></pre>
<p>每一个<code>Node</code>的实例都包含三个属性：<code>data</code>，<code>parant</code>，和<code>children</code>。 第一个属性保存与节点相关联的数据。 第二个属性指向一个节点。 第三个属性指向许多子节点。</p>
<h3 id="articleHeader6"><strong>树的属性</strong></h3>
<p>现在让我们来定义<code>Tree</code>的构造函数，其中包括Node构造函数的定义：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Tree(data) {
    var node = new Node(data);
    this._root = node;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Tree</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-keyword">var</span> node = <span class="hljs-keyword">new</span> Node(data);
    <span class="hljs-keyword">this</span>._root = node;
}</code></pre>
<p><code>Tree</code>包含两行代码。 第一行创建了一个<code>Node</code>的新实例；第二行让node等于树的根节点。</p>
<p><code>Tree</code>和<code>Node</code>的定义只需要几行代码。 但是，通过这几行足以帮助我们模拟分层数据。 为了证明这一点，让我们用一些示例数据去创建Tree的示例（和间接的<code>Node</code>）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var tree = new Tree('CEO');
 
// {data: 'CEO', parent: null, children: []}
tree._root;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> tree = <span class="hljs-keyword">new</span> Tree(<span class="hljs-string">'CEO'</span>);
 
<span class="hljs-comment">// {data: 'CEO', parent: null, children: []}</span>
tree._root;</code></pre>
<p>幸好有<code>parent</code>和<code>children</code>的存在，我们可以为<code>_root</code>添加子节点和让这些子节点的父节点等于<code>_root</code>。 换一种说法，我们可以模拟分层数据的创建。</p>
<h3 id="articleHeader7"><strong>Tree的方法</strong></h3>
<p>接下来我们将要创建以下五种方法。</p>
<h4><strong>树</strong></h4>
<ol>
<li><p><code>traverseDF(callback)</code></p></li>
<li><p><code>traverseBF(callback)</code></p></li>
<li><p><code>contains(data, traversal)</code></p></li>
<li><p><code>add(child, parent)</code></p></li>
<li><p><code>remove(node, parent)</code></p></li>
</ol>
<p>因为每种方法都需要遍历一个树，所以我们首先要实现一个方法去定义不同的树遍历。 （遍历树是访问树的每个节点的正式方式。）</p>
<h3 id="articleHeader8">方法1/5: <code>traverseDF(callback)</code>
</h3>
<p>这种方法以深度优先方式遍历树。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Tree.prototype.traverseDF = function(callback) {
 
    // this is a recurse and immediately-invoking function 
    (function recurse(currentNode) {
        // step 2
        for (var i = 0, length = currentNode.children.length; i < length; i++) {
            // step 3
            recurse(currentNode.children[i]);
        }
 
        // step 4
        callback(currentNode);
         
        // step 1
    })(this._root);
 
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Tree.prototype.traverseDF = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callback</span>) </span>{
 
    <span class="hljs-comment">// this is a recurse and immediately-invoking function </span>
    (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">recurse</span>(<span class="hljs-params">currentNode</span>) </span>{
        <span class="hljs-comment">// step 2</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, length = currentNode.children.length; i &lt; length; i++) {
            <span class="hljs-comment">// step 3</span>
            recurse(currentNode.children[i]);
        }
 
        <span class="hljs-comment">// step 4</span>
        callback(currentNode);
         
        <span class="hljs-comment">// step 1</span>
    })(<span class="hljs-keyword">this</span>._root);
 
};</code></pre>
<p><code>traverseDF(callback)</code>有一个参数<code>callback</code>。 如果对这个名字不明白，<code>callback</code>被假定是一个函数，将在后面被<code>traverseDF(callback)</code>调用。</p>
<p><code>traverseDF(callback)</code>的函数体含有另一个叫做<code>recurse</code>的函数。 这个函数是一个递归函数！ 换句话说，它是自我调用和自我终止。 使用<code>recurse</code>的注释中提到的步骤，我将描述递归用来<code>recurse</code>整个树的一般过程。</p>
<p>这里是步骤：</p>
<ol>
<li><p>立即使用树的根节点作为其参数调用<code>recurse</code>。 此时，<code>currentNode</code>指向当前节点。</p></li>
<li><p>进入<code>for</code>循环并且从第一个子节点开始，每一个子节点都迭代一次<code>currentNode</code>函数。</p></li>
<li><p>在<code>for</code>循环体内，使用<code>currentNode</code>的子元素调用递归。 确切的子节点取决于当前<code>for</code>循环的当前迭代。</p></li>
<li><p>当<code>currentNode</code>不存在子节点时，我们退出<code>for</code>循环并<code>callback</code>我们在调用<code>traverseDF（callback）</code>期间传递的回调。</p></li>
</ol>
<p>步骤2（自终止），3（自调用）和4（回调）重复，直到我们遍历树的每个节点。 </p>
<p>递归是一个非常困难的话题，需要一个完整的文章来充分解释它。由于递归的解释不是本文的重点 —— 重点是实现一棵树 —— 我建议任何读者没有很好地掌握递归做以下两件事。 </p>
<p>首先，实验我们当前的<code>traverseDF(callback)</code>实现，并尝试一定程度上理解它是如何工作的。 第二，如果你想要我写一篇关于递归的文章，那么请在本文的评论中请求它。 </p>
<p>以下示例演示如何使用<code>traverseDF(callback)</code>遍历树。要遍历树，我将在下面的示例中创建一个。我现在使用的方法不是罪理想的，但它能很好的工作。 一个更好的方法是使用<code>add(value)</code>，我们将在第4步和第5步中实现。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var tree = new Tree('one');
 
tree._root.children.push(new Node('two'));
tree._root.children[0].parent = tree;
 
tree._root.children.push(new Node('three'));
tree._root.children[1].parent = tree;
 
tree._root.children.push(new Node('four'));
tree._root.children[2].parent = tree;
 
tree._root.children[0].children.push(new Node('five'));
tree._root.children[0].children[0].parent = tree._root.children[0];
 
tree._root.children[0].children.push(new Node('six'));
tree._root.children[0].children[1].parent = tree._root.children[0];
 
tree._root.children[2].children.push(new Node('seven'));
tree._root.children[2].children[0].parent = tree._root.children[2];
 
/*
 
creates this tree
 
 one
 ├── two
 │   ├── five
 │   └── six
 ├── three
 └── four
     └── seven
 
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> tree = <span class="hljs-keyword">new</span> Tree(<span class="hljs-string">'one'</span>);
 
tree._root.children.push(<span class="hljs-keyword">new</span> Node(<span class="hljs-string">'two'</span>));
tree._root.children[<span class="hljs-number">0</span>].parent = tree;
 
tree._root.children.push(<span class="hljs-keyword">new</span> Node(<span class="hljs-string">'three'</span>));
tree._root.children[<span class="hljs-number">1</span>].parent = tree;
 
tree._root.children.push(<span class="hljs-keyword">new</span> Node(<span class="hljs-string">'four'</span>));
tree._root.children[<span class="hljs-number">2</span>].parent = tree;
 
tree._root.children[<span class="hljs-number">0</span>].children.push(<span class="hljs-keyword">new</span> Node(<span class="hljs-string">'five'</span>));
tree._root.children[<span class="hljs-number">0</span>].children[<span class="hljs-number">0</span>].parent = tree._root.children[<span class="hljs-number">0</span>];
 
tree._root.children[<span class="hljs-number">0</span>].children.push(<span class="hljs-keyword">new</span> Node(<span class="hljs-string">'six'</span>));
tree._root.children[<span class="hljs-number">0</span>].children[<span class="hljs-number">1</span>].parent = tree._root.children[<span class="hljs-number">0</span>];
 
tree._root.children[<span class="hljs-number">2</span>].children.push(<span class="hljs-keyword">new</span> Node(<span class="hljs-string">'seven'</span>));
tree._root.children[<span class="hljs-number">2</span>].children[<span class="hljs-number">0</span>].parent = tree._root.children[<span class="hljs-number">2</span>];
 
<span class="hljs-comment">/*
 
creates this tree
 
 one
 ├── two
 │   ├── five
 │   └── six
 ├── three
 └── four
     └── seven
 
*/</span></code></pre>
<p>现在，让我们调用<code>traverseDF(callback)</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="tree.traverseDF(function(node) {
    console.log(node.data)
});
 
/*
 
logs the following strings to the console
 
'five'
'six'
'two'
'three'
'seven'
'four'
'one'
 
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">tree.traverseDF(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">node</span>) </span>{
    <span class="hljs-built_in">console</span>.log(node.data)
});
 
<span class="hljs-comment">/*
 
logs the following strings to the console
 
'five'
'six'
'two'
'three'
'seven'
'four'
'one'
 
*/</span></code></pre>
<h4><strong>方法2/5: <code>traverseBF(callback)</code></strong></h4>
<p>这个方法使用深度优先搜索去遍历树</p>
<p>深度优先搜索和广度优先搜索之间的差别涉及树的节点访问的序列。 为了说明这一点，让我们使用<code>traverseDF(callback)</code>创建的树。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 
 tree
 
 one (depth: 0)
 ├── two (depth: 1)
 │   ├── five (depth: 2)
 │   └── six (depth: 2)
 ├── three (depth: 1)
 └── four (depth: 1)
     └── seven (depth: 2)
 */" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/* 
 tree
 
 one (depth: 0)
 ├── two (depth: 1)
 │   ├── five (depth: 2)
 │   └── six (depth: 2)
 ├── three (depth: 1)
 └── four (depth: 1)
     └── seven (depth: 2)
 */</span></code></pre>
<p>现在，让我们传递<code>traverseBF(callback)</code>和我们用于traverseDF（callback）的回调。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="tree.traverseBF(function(node) {
    console.log(node.data)
});
 
/*
 
logs the following strings to the console
 
'one'
'two'
'three'
'four'
'five'
'six'
'seven'
 
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">tree.traverseBF(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">node</span>) </span>{
    <span class="hljs-built_in">console</span>.log(node.data)
});
 
<span class="hljs-comment">/*
 
logs the following strings to the console
 
'one'
'two'
'three'
'four'
'five'
'six'
'seven'
 
*/</span></code></pre>
<p>来自控制台的日志和我们的树的图显示了关于广度优先搜索的模式。从根节点开始；然后行进一个深度并访问该深度从左到右的每个节点。重复此过程，直到没有更多的深度要移动。 </p>
<p>由于我们有一个广度优先搜索的概念模型，现在让我们实现使我们的示例工作的代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Tree.prototype.traverseBF = function(callback) {
    var queue = new Queue();
     
    queue.enqueue(this._root);
 
    currentTree = queue.dequeue();
 
    while(currentTree){
        for (var i = 0, length = currentTree.children.length; i < length; i++) {
            queue.enqueue(currentTree.children[i]);
        }
 
        callback(currentTree);
        currentTree = queue.dequeue();
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Tree.prototype.traverseBF = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callback</span>) </span>{
    <span class="hljs-keyword">var</span> queue = <span class="hljs-keyword">new</span> Queue();
     
    queue.enqueue(<span class="hljs-keyword">this</span>._root);
 
    currentTree = queue.dequeue();
 
    <span class="hljs-keyword">while</span>(currentTree){
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, length = currentTree.children.length; i &lt; length; i++) {
            queue.enqueue(currentTree.children[i]);
        }
 
        callback(currentTree);
        currentTree = queue.dequeue();
    }
};</code></pre>
<p>我们对<code>traverseBF(callback)</code>的定义包含了很多逻辑。 因此，我会用下面的步骤解释这些逻辑：</p>
<ol>
<li><p>创建 <code>Queue</code>的实例。</p></li>
<li><p>调用<code>traverseBF(callback)</code>产生的节点添加到<code>Queue</code>的实例。</p></li>
<li><p>定义一个变量<code>currentNode</code>并且将其值初始化为刚才添加到队列里的<code>node</code></p></li>
<li><p>当<code>currentNode</code>指向一个节点时，执行<code>wille</code>循环里面的代码。</p></li>
<li><p>用<code>for</code>循环去迭代<code>currentNode</code>的子节点。</p></li>
<li><p>在<code>for</code>循环体内，将每个子元素加入队列。</p></li>
<li><p>获取<code>currentNode</code>并将其作为<code>callback</code>的参数传递。</p></li>
<li><p>将<code>currentNode</code>重新分配给正从队列中删除的节点。</p></li>
<li><p>直到<code>currentNode</code>不再指向任何节点——也就是说树中的每个节点都访问过了——重复4-8步。</p></li>
</ol>
<h4><strong>方法3/5 <code>contains(callback, traversal)</code></strong></h4>
<p>让我们定义一个方法，可以在树中搜索一个特定的值。去使用我们创建的任意一种树的遍历方法，我们已经定义了<code>contains(callback, traversal)</code>接收两个参数：搜索的数据和遍历的类型。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Tree.prototype.contains = function(callback, traversal) {
    traversal.call(this, callback);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Tree.prototype.contains = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callback, traversal</span>) </span>{
    traversal.call(<span class="hljs-keyword">this</span>, callback);
};</code></pre>
<p>在<code>contains(callback, traversal)</code>函数体内，我们用<code>call</code>方法去传递<code>this</code>和<code>callback</code>。 第一个参数将<code>traversal</code>绑定到被调用的树<code>contains（callback，traversal）</code>；第二个参数是在树中每个节点上调用的函数。</p>
<p>想象一下，我们要将包含奇数数据的任何节点记录到控制台，并使用BFS遍历树中的每个节点。 我们可以这么写代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// tree is an example of a root node
tree.contains(function(node){
    if (node.data === 'two') {
        console.log(node);
    }
}, tree.traverseBF);
add(data, toData, traversal) " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// tree is an example of a root node</span>
tree.contains(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">node</span>)</span>{
    <span class="hljs-keyword">if</span> (node.data === <span class="hljs-string">'two'</span>) {
        <span class="hljs-built_in">console</span>.log(node);
    }
}, tree.traverseBF);
add(data, toData, traversal) </code></pre>
<h4><strong>方法4/5: <code>add(data, toData, traversal)</code></strong></h4>
<p>现在有了一个可以搜索树中特定节点的方法。 让我们定义一个允许向指定节点添加节点的方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Tree.prototype.add = function(data, toData, traversal) {
    var child = new Node(data),
        parent = null,
        callback = function(node) {
            if (node.data === toData) {
                parent = node;
            }
        };
 
    this.contains(callback, traversal);
 
    if (parent) {
        parent.children.push(child);
        child.parent = parent;
    } else {
        throw new Error('Cannot add node to a non-existent parent.');
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Tree.prototype.add = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data, toData, traversal</span>) </span>{
    <span class="hljs-keyword">var</span> child = <span class="hljs-keyword">new</span> Node(data),
        parent = <span class="hljs-literal">null</span>,
        callback = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">node</span>) </span>{
            <span class="hljs-keyword">if</span> (node.data === toData) {
                parent = node;
            }
        };
 
    <span class="hljs-keyword">this</span>.contains(callback, traversal);
 
    <span class="hljs-keyword">if</span> (parent) {
        parent.children.push(child);
        child.parent = parent;
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Cannot add node to a non-existent parent.'</span>);
    }
};</code></pre>
<p><code>add(data, toData, traversal)</code>定义了三个参数。 第一个参数<code>data</code>用来创建一个<code>Node</code>的新实例。 第二个参数<code>toData</code>用来比较树中的每个节点。 第三个参数<code>traversal</code>，是这个方法中用来遍历树的类型。</p>
<p>在<code>add(data, toData, traversal)</code>函数体内，我们声明了三个变量。 第一个变量<code>child</code>代表初始化的<code>Node</code>实例。 第二个变量<code>parent</code>初始化为<code>null</code>；但是将来会指向匹配<code>toData</code>值的树中的任意节点。<code>parent</code>的重新分配发生在我们声明的第三个变量，这就是<code>callback</code>。</p>
<p><code>callback</code>是一个将<code>toData</code>和每一个节点的<code>data</code>属性做比较的函数。 如果<code>if</code>语句的值是<code>true</code>，那么<code>parent</code>将被赋值给<code>if</code>语句中匹配比较的节点。</p>
<p>每个节点的<code>toData</code>在<code>contains(callback, traversal)</code>中进行比较。遍历类型和<code>callback</code>必须作为<code>contains(callback, traversal)</code>的参数进行传递。</p>
<p>最后，如果<code>parent</code>不存在于树中，我们将<code>child</code>推入<code>parent.children</code>； 同时也要将<code>parent</code>赋值给<code>child</code>的父级。否则，将抛出错误。</p>
<p>让我们用<code>add(data, toData, traversal)</code>做个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var tree = new Tree('CEO');
 
tree.add('VP of Happiness', 'CEO', tree.traverseBF);
 
/*
 
our tree
 
'CEO'
└── 'VP of Happiness'
 
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> tree = <span class="hljs-keyword">new</span> Tree(<span class="hljs-string">'CEO'</span>);
 
tree.add(<span class="hljs-string">'VP of Happiness'</span>, <span class="hljs-string">'CEO'</span>, tree.traverseBF);
 
<span class="hljs-comment">/*
 
our tree
 
'CEO'
└── 'VP of Happiness'
 
*/</span></code></pre>
<p>这里是<code>add(addData, toData, traversal)</code>的更加复杂的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var tree = new Tree('CEO');
 
tree.add('VP of Happiness', 'CEO', tree.traverseBF);
tree.add('VP of Finance', 'CEO', tree.traverseBF);
tree.add('VP of Sadness', 'CEO', tree.traverseBF);
 
tree.add('Director of Puppies', 'VP of Finance', tree.traverseBF);
tree.add('Manager of Puppies', 'Director of Puppies', tree.traverseBF);
 
/*
 
 tree
 
 'CEO'
 ├── 'VP of Happiness'
 ├── 'VP of Finance'
 │   ├── 'Director of Puppies'
 │   └── 'Manager of Puppies'
 └── 'VP of Sadness'
 
 */" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> tree = <span class="hljs-keyword">new</span> Tree(<span class="hljs-string">'CEO'</span>);
 
tree.add(<span class="hljs-string">'VP of Happiness'</span>, <span class="hljs-string">'CEO'</span>, tree.traverseBF);
tree.add(<span class="hljs-string">'VP of Finance'</span>, <span class="hljs-string">'CEO'</span>, tree.traverseBF);
tree.add(<span class="hljs-string">'VP of Sadness'</span>, <span class="hljs-string">'CEO'</span>, tree.traverseBF);
 
tree.add(<span class="hljs-string">'Director of Puppies'</span>, <span class="hljs-string">'VP of Finance'</span>, tree.traverseBF);
tree.add(<span class="hljs-string">'Manager of Puppies'</span>, <span class="hljs-string">'Director of Puppies'</span>, tree.traverseBF);
 
<span class="hljs-comment">/*
 
 tree
 
 'CEO'
 ├── 'VP of Happiness'
 ├── 'VP of Finance'
 │   ├── 'Director of Puppies'
 │   └── 'Manager of Puppies'
 └── 'VP of Sadness'
 
 */</span></code></pre>
<h4><strong>方法5/5:<code>remove(data, fromData, traversal)</code></strong></h4>
<p>为了完成<code>Tree</code>的实现，我们将添加一个叫做<code>remove(data, fromData, traversal)</code>的方法。 跟从DOM里面移除节点类似，这个方法将移除一个节点和他的所有子级。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Tree.prototype.remove = function(data, fromData, traversal) {
    var tree = this,
        parent = null,
        childToRemove = null,
        index;
 
    var callback = function(node) {
        if (node.data === fromData) {
            parent = node;
        }
    };
 
    this.contains(callback, traversal);
 
    if (parent) {
        index = findIndex(parent.children, data);
 
        if (index === undefined) {
            throw new Error('Node to remove does not exist.');
        } else {
            childToRemove = parent.children.splice(index, 1);
        }
    } else {
        throw new Error('Parent does not exist.');
    }
 
    return childToRemove;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Tree.prototype.remove = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data, fromData, traversal</span>) </span>{
    <span class="hljs-keyword">var</span> tree = <span class="hljs-keyword">this</span>,
        parent = <span class="hljs-literal">null</span>,
        childToRemove = <span class="hljs-literal">null</span>,
        index;
 
    <span class="hljs-keyword">var</span> callback = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">node</span>) </span>{
        <span class="hljs-keyword">if</span> (node.data === fromData) {
            parent = node;
        }
    };
 
    <span class="hljs-keyword">this</span>.contains(callback, traversal);
 
    <span class="hljs-keyword">if</span> (parent) {
        index = findIndex(parent.children, data);
 
        <span class="hljs-keyword">if</span> (index === <span class="hljs-literal">undefined</span>) {
            <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Node to remove does not exist.'</span>);
        } <span class="hljs-keyword">else</span> {
            childToRemove = parent.children.splice(index, <span class="hljs-number">1</span>);
        }
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Parent does not exist.'</span>);
    }
 
    <span class="hljs-keyword">return</span> childToRemove;
};</code></pre>
<p>与<code>add(data, toData, traversal)</code>类似，移除将遍历树以查找包含第二个参数的节点，现在为<code>fromData</code>。 如果这个节点被发现了，那么<code>parent</code>将指向它。</p>
<p>在这时候，我们到达了第一个<code>if</code>语句。 如果parent不存在，将抛出错误。 如果<code>parent</code>不存在，我们使用<code>parent.children</code>调用<code>findIndex（）</code>和我们要从<code>parent</code>节点的子节点中删除的数据 （<code>findIndex（）</code>是一个帮助方法，我将在下面定义。）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function findIndex(arr, data) {
    var index;
 
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].data === data) {
            index = i;
        }
    }
 
    return index;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">findIndex</span>(<span class="hljs-params">arr, data</span>) </span>{
    <span class="hljs-keyword">var</span> index;
 
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {
        <span class="hljs-keyword">if</span> (arr[i].data === data) {
            index = i;
        }
    }
 
    <span class="hljs-keyword">return</span> index;
}</code></pre>
<p>在<code>findIndex()</code>里面，以下逻辑将发生。 如果<code>parent.children</code>中的任意一个节点包含匹配<code>data</code>值的数据,那么变量<code>index</code>赋值为一个整数。 如果没有子级的数值属性匹配<code>data</code>，那么index保留他的默认值<code>undefined</code>。 在最后一行的<code>findIndex()</code>方法，我们返回一个index。</p>
<p>我们现在去<code>remove(data, fromData, traversal) </code>如果<code>index</code>的值是<code>undefined</code>，将会抛出错误。 如果<code>index</code>的值存在，我们用它来拼接我们想从<code>parent</code>的子节点中删除的节点。同样我们给删除的子级赋值为<code>childToRemove</code>。</p>
<p>最后，我们返回<code>childToRemove</code>。</p>
<h1 id="articleHeader9"><strong>树的的完整实现</strong></h1>
<p>到此为止<code>Tree</code>已经完全实现。回过头看看，我们到底完成了多少工作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
function Node(data) {
    this.data = data;
    this.parent = null;
    this.children = [];
}
 
function Tree(data) {
    var node = new Node(data);
    this._root = node;
}
 
Tree.prototype.traverseDF = function(callback) {
 
    // this is a recurse and immediately-invoking function
    (function recurse(currentNode) {
        // step 2
        for (var i = 0, length = currentNode.children.length; i < length; i++) {
            // step 3
            recurse(currentNode.children[i]);
        }
 
        // step 4
        callback(currentNode);
 
        // step 1
    })(this._root);
 
};
 
Tree.prototype.traverseBF = function(callback) {
    var queue = new Queue();
 
    queue.enqueue(this._root);
 
    currentTree = queue.dequeue();
 
    while(currentTree){
        for (var i = 0, length = currentTree.children.length; i < length; i++) {
            queue.enqueue(currentTree.children[i]);
        }
 
        callback(currentTree);
        currentTree = queue.dequeue();
    }
};
 
Tree.prototype.contains = function(callback, traversal) {
    traversal.call(this, callback);
};
 
Tree.prototype.add = function(data, toData, traversal) {
    var child = new Node(data),
        parent = null,
        callback = function(node) {
            if (node.data === toData) {
                parent = node;
            }
        };
 
    this.contains(callback, traversal);
 
    if (parent) {
        parent.children.push(child);
        child.parent = parent;
    } else {
        throw new Error('Cannot add node to a non-existent parent.');
    }
};
 
Tree.prototype.remove = function(data, fromData, traversal) {
    var tree = this,
        parent = null,
        childToRemove = null,
        index;
 
    var callback = function(node) {
        if (node.data === fromData) {
            parent = node;
        }
    };
 
    this.contains(callback, traversal);
 
    if (parent) {
        index = findIndex(parent.children, data);
 
        if (index === undefined) {
            throw new Error('Node to remove does not exist.');
        } else {
            childToRemove = parent.children.splice(index, 1);
        }
    } else {
        throw new Error('Parent does not exist.');
    }
 
    return childToRemove;
};
 
function findIndex(arr, data) {
    var index;
 
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].data === data) {
            index = i;
        }
    }
 
    return index;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Node</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-keyword">this</span>.data = data;
    <span class="hljs-keyword">this</span>.parent = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">this</span>.children = [];
}
 
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Tree</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-keyword">var</span> node = <span class="hljs-keyword">new</span> Node(data);
    <span class="hljs-keyword">this</span>._root = node;
}
 
Tree.prototype.traverseDF = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callback</span>) </span>{
 
    <span class="hljs-comment">// this is a recurse and immediately-invoking function</span>
    (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">recurse</span>(<span class="hljs-params">currentNode</span>) </span>{
        <span class="hljs-comment">// step 2</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, length = currentNode.children.length; i &lt; length; i++) {
            <span class="hljs-comment">// step 3</span>
            recurse(currentNode.children[i]);
        }
 
        <span class="hljs-comment">// step 4</span>
        callback(currentNode);
 
        <span class="hljs-comment">// step 1</span>
    })(<span class="hljs-keyword">this</span>._root);
 
};
 
Tree.prototype.traverseBF = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callback</span>) </span>{
    <span class="hljs-keyword">var</span> queue = <span class="hljs-keyword">new</span> Queue();
 
    queue.enqueue(<span class="hljs-keyword">this</span>._root);
 
    currentTree = queue.dequeue();
 
    <span class="hljs-keyword">while</span>(currentTree){
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, length = currentTree.children.length; i &lt; length; i++) {
            queue.enqueue(currentTree.children[i]);
        }
 
        callback(currentTree);
        currentTree = queue.dequeue();
    }
};
 
Tree.prototype.contains = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callback, traversal</span>) </span>{
    traversal.call(<span class="hljs-keyword">this</span>, callback);
};
 
Tree.prototype.add = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data, toData, traversal</span>) </span>{
    <span class="hljs-keyword">var</span> child = <span class="hljs-keyword">new</span> Node(data),
        parent = <span class="hljs-literal">null</span>,
        callback = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">node</span>) </span>{
            <span class="hljs-keyword">if</span> (node.data === toData) {
                parent = node;
            }
        };
 
    <span class="hljs-keyword">this</span>.contains(callback, traversal);
 
    <span class="hljs-keyword">if</span> (parent) {
        parent.children.push(child);
        child.parent = parent;
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Cannot add node to a non-existent parent.'</span>);
    }
};
 
Tree.prototype.remove = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data, fromData, traversal</span>) </span>{
    <span class="hljs-keyword">var</span> tree = <span class="hljs-keyword">this</span>,
        parent = <span class="hljs-literal">null</span>,
        childToRemove = <span class="hljs-literal">null</span>,
        index;
 
    <span class="hljs-keyword">var</span> callback = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">node</span>) </span>{
        <span class="hljs-keyword">if</span> (node.data === fromData) {
            parent = node;
        }
    };
 
    <span class="hljs-keyword">this</span>.contains(callback, traversal);
 
    <span class="hljs-keyword">if</span> (parent) {
        index = findIndex(parent.children, data);
 
        <span class="hljs-keyword">if</span> (index === <span class="hljs-literal">undefined</span>) {
            <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Node to remove does not exist.'</span>);
        } <span class="hljs-keyword">else</span> {
            childToRemove = parent.children.splice(index, <span class="hljs-number">1</span>);
        }
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Parent does not exist.'</span>);
    }
 
    <span class="hljs-keyword">return</span> childToRemove;
};
 
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">findIndex</span>(<span class="hljs-params">arr, data</span>) </span>{
    <span class="hljs-keyword">var</span> index;
 
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {
        <span class="hljs-keyword">if</span> (arr[i].data === data) {
            index = i;
        }
    }
 
    <span class="hljs-keyword">return</span> index;
}</code></pre>
<h1 id="articleHeader10"><strong>总结</strong></h1>
<p>树可以用来模拟分层数据。我们周围有许多类似这种类型的层次结构，例如网页和族谱。当你发现自己需要使用层次结构来结构化数据时，可以考虑使用树。</p>
<p><strong> 欢迎扫描二维码关注公众号，每天推送我翻译的技术文章。</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVRyYe?w=430&amp;h=430" src="https://static.alili.tech/img/bVRyYe?w=430&amp;h=430" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【译】JavaScript数据结构（4）：树

## 原文链接
[https://segmentfault.com/a/1190000010345441](https://segmentfault.com/a/1190000010345441)

