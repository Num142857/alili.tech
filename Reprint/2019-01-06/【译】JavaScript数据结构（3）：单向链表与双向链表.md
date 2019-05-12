---
title: '【译】JavaScript数据结构（3）：单向链表与双向链表' 
date: 2019-01-06 2:30:10
hidden: true
slug: rp0rk4xmvdi
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><strong>翻译</strong>：疯狂的技术宅<br><strong>英文</strong>：<a href="https://code.tutsplus.com/articles/data-structures-with-javascript-singly-linked-list-and-doubly-linked-list--cms-23392" rel="nofollow noreferrer" target="_blank">https://code.tutsplus.com/art...</a><br><strong>说明</strong>：本文翻译自系列文章《Data Structures With JavaScript》，总共为四篇，原作者是在美国硅谷工作的工程师 Cho S. Kim 。这是本系列的第三篇。</p></blockquote>
<p>说明：本专栏文章首发于公众号：jingchengyideng 。</p>
<p>计算机科学中最常见的两种数据结构是单链表和双链表。</p>
<p>在我学习这些数据结构的时候，曾经问我的同伴在生活中有没有类似的概念。我所听到的例子是购物清单和火车。但是我最终明白了，这些类比是不准确的，购物清单更类似队列，火车则更像是一个数组。</p>
<p>随着时间的推移，我终于发现了一个能够准确类比单链表和双向链表的例子：寻宝游戏。 如果你对寻宝游戏和链表之间的关系感到好奇，请继续往下读。</p>
<h1 id="articleHeader0"><strong>单链表</strong></h1>
<p>在计算机科学中，单链表是一种数据结构，保存了一系列链接的节点。 每个节点中包含数据和一个可指向另一个节点的指针。</p>
<p>单链列表的节点非常类似于寻宝游戏中的步骤。 每个步骤都包含一条消息（例如“您已到达法国”）和指向下一步骤的指针（例如“访问这些经纬度坐标”）。 当我们开始对这些单独的步骤进行排序并形成一系列步骤时，就是在玩一个寻宝游戏。</p>
<p>现在我们对单链表有了一个基本的概念，接下来讨论单链表的操作</p>
<h2 id="articleHeader1"><strong>单链表的操作</strong></h2>
<p>因为单链表包含节点，这两者的构造函数可以是两个独立的构造函数，所以我们需要些构造函数：<code>Node</code> 和 <code>SinglyList</code></p>
<h3 id="articleHeader2"><strong>Node</strong></h3>
<ul>
<li><p><code>data</code> 存储数据</p></li>
<li><p><code>next</code> 指向链表中下一个节点的指针</p></li>
</ul>
<h3 id="articleHeader3"><strong>SinglyList</strong></h3>
<ul>
<li><p><code>_length</code> 用于表示链表中的节点数量</p></li>
<li><p><code>head</code> 分配一个节点作为链表的头</p></li>
<li><p><code>add(value)</code> 向链表中添加一个节点</p></li>
<li><p><code>searchNodeAt(position)</code> 找到在列表中指定位置 n 上的节点</p></li>
<li><p><code>remove(position)</code> 删除指定位置的节点</p></li>
</ul>
<h2 id="articleHeader4"><strong>单链表的实现</strong></h2>
<p>在实现时，我们首先定义一个名为<code>Node</code>的构造函数，然后定义一个名为<code>SinglyList</code>的构造函数。</p>
<p><code>Node</code> 的每个实例都应该能够存储数据并且能够指向另外一个节点。 要实现此功能，我们将分别创建两个属性：<code>data</code>和<code>next</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Node(data) {
    this.data = data;
    this.next = null;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Node</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-keyword">this</span>.data = data;
    <span class="hljs-keyword">this</span>.next = <span class="hljs-literal">null</span>;
}</code></pre>
<p>下一步我们定义<code>SinglyList</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function SinglyList() {
    this._length = 0;
    this.head = null;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SinglyList</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>._length = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">this</span>.head = <span class="hljs-literal">null</span>;
}</code></pre>
<p><code>SinglyList</code> 的每个实例有两个属性：<code>_length</code>和<code>head</code>。前者保存链表中的节点数，后者指向链表的头部，链表前面的节点。由于新创建的<code>singlylist</code>实例不包含任何节点，所以<code>head</code>的默认值是<code>null</code>，<code>_length</code>的默认值是 <code>0</code>。</p>
<h3 id="articleHeader5"><strong>单链表的方法</strong></h3>
<p>我们需要定义可以从链表中添加、查找和删除节点的方法。先从添加节点开始。</p>
<h4>方法1/3: <code>add(value)</code>
</h4>
<p>太棒了，现在我们来实现将节点添加到链表的功能。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="SinglyList.prototype.add = function(value) {
    var node = new Node(value),
        currentNode = this.head;
 
    // 1st use-case: an empty list 
    if (!currentNode) {
        this.head = node;
        this._length++;
         
        return node;
    }
 
    // 2nd use-case: a non-empty list
    while (currentNode.next) {
        currentNode = currentNode.next;
    }
 
    currentNode.next = node;
 
    this._length++;
     
    return node;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">SinglyList.prototype.add = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
    <span class="hljs-keyword">var</span> node = <span class="hljs-keyword">new</span> Node(value),
        currentNode = <span class="hljs-keyword">this</span>.head;
 
    <span class="hljs-comment">// 1st use-case: an empty list </span>
    <span class="hljs-keyword">if</span> (!currentNode) {
        <span class="hljs-keyword">this</span>.head = node;
        <span class="hljs-keyword">this</span>._length++;
         
        <span class="hljs-keyword">return</span> node;
    }
 
    <span class="hljs-comment">// 2nd use-case: a non-empty list</span>
    <span class="hljs-keyword">while</span> (currentNode.next) {
        currentNode = currentNode.next;
    }
 
    currentNode.next = node;
 
    <span class="hljs-keyword">this</span>._length++;
     
    <span class="hljs-keyword">return</span> node;
};</code></pre>
<p>把节点添加到链表会涉及很多步骤。先从方法开始。 我们使用<code>add(value)</code>的参数来创建一个节点的新实例，该节点被分配给名为<code>node</code>的变量。我们还声明了一个名为<code>currentNode</code>的变量，并将其初始化为链表的<code>_head</code>。 如果链表中还没有节点，那么<code>head</code>的值为<code>null</code>。</p>
<p>实现了这一点之后，我们将处理两种情况。</p>
<p>第一种情况考虑将节点添加到空的链表中，如果<code>head</code>没有指向任何节点的话，那么将该<code>node</code>指定为链表的头，同时链表的长度加一，并返回<code>node</code>。</p>
<p>第二种情况考虑将节点添加到飞空链表。我们进入<code>while</code>循环，在每次循环中，判断<code>currentNode.next</code>是否指向下一个节点。（第一次循环时，<code>CurrentNode</code>指向链表的头部。）</p>
<p>如果答案是否定的，我们会把<code>currentnode.next</code>指向新添加的节点，并返回<code>node</code>。</p>
<p>如果答案是肯定的，就进入<code>while</code>循环。 在循环体中，我们将<code>currentNode</code>重新赋值给<code>currentNode.next</code>。 重复这个过程，直到<code>currentNode.next</code>不再指向任何。换句话说，<code>currentNode</code>指向链表中的最后一个节点。</p>
<p><code>while</code>循环结束后，使<code>currentnode.next</code>指向新添加的节点，同时<code>_length</code>加1，最后返回<code>node</code>。</p>
<h4>方法2/3: <code>searchNodeAt(position)</code>
</h4>
<p>现在我们可以将节点添加到链表中了，但是还没有办法找到特定位置的节点。下面添加这个功能。创建一个名为<code>searchNodeAt(position)</code> 的方法，它接受一个名为 <code>position</code> 的参数。这个参数是个整数，用来表示链表中的位置n。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="SinglyList.prototype.searchNodeAt = function(position) {
    var currentNode = this.head,
        length = this._length,
        count = 1,
        message = {failure: 'Failure: non-existent node in this list.'};
 
    // 1st use-case: an invalid position 
    if (length === 0 || position < 1 || position > length) {
        throw new Error(message.failure);
    }
 
    // 2nd use-case: a valid position 
    while (count < position) {
        currentNode = currentNode.next;
        count++;
    }
 
    return currentNode;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">SinglyList.prototype.searchNodeAt = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">position</span>) </span>{
    <span class="hljs-keyword">var</span> currentNode = <span class="hljs-keyword">this</span>.head,
        length = <span class="hljs-keyword">this</span>._length,
        count = <span class="hljs-number">1</span>,
        message = {<span class="hljs-attr">failure</span>: <span class="hljs-string">'Failure: non-existent node in this list.'</span>};
 
    <span class="hljs-comment">// 1st use-case: an invalid position </span>
    <span class="hljs-keyword">if</span> (length === <span class="hljs-number">0</span> || position &lt; <span class="hljs-number">1</span> || position &gt; length) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(message.failure);
    }
 
    <span class="hljs-comment">// 2nd use-case: a valid position </span>
    <span class="hljs-keyword">while</span> (count &lt; position) {
        currentNode = currentNode.next;
        count++;
    }
 
    <span class="hljs-keyword">return</span> currentNode;
};</code></pre>
<p>在<code>if</code>中检查第一种情况：参数非法。</p>
<p>如果传给searchNodeAt(position)的索引是有效的，那么我们执行第二种情况 —— <code>while</code>循环。 在<code>while</code>的每次循环中，指向头的<code>currentNode</code>被重新指向链表中的下一个节点。 </p>
<p>这个循环不断执行，一直到<code>count</code>等于<code>position</code>。</p>
<h4>方法3/3: <code>remove(position)</code>
</h4>
<p>最后一个方法是<code>remove(position)</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="SinglyList.prototype.remove = function(position) {
    var currentNode = this.head,
        length = this._length,
        count = 0,
        message = {failure: 'Failure: non-existent node in this list.'},
        beforeNodeToDelete = null,
        nodeToDelete = null,
        deletedNode = null;
 
    // 1st use-case: an invalid position
    if (position < 0 || position > length) {
        throw new Error(message.failure);
    }
 
    // 2nd use-case: the first node is removed
    if (position === 1) {
        this.head = currentNode.next;
        deletedNode = currentNode;
        currentNode = null;
        this._length--;
         
        return deletedNode;
    }
 
    // 3rd use-case: any other node is removed
    while (count < position) {
        beforeNodeToDelete = currentNode;
        nodeToDelete = currentNode.next;
        count++;
    }
 
    beforeNodeToDelete.next = nodeToDelete.next;
    deletedNode = nodeToDelete;
    nodeToDelete = null;
    this._length--;
 
    return deletedNode;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">SinglyList.prototype.remove = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">position</span>) </span>{
    <span class="hljs-keyword">var</span> currentNode = <span class="hljs-keyword">this</span>.head,
        length = <span class="hljs-keyword">this</span>._length,
        count = <span class="hljs-number">0</span>,
        message = {<span class="hljs-attr">failure</span>: <span class="hljs-string">'Failure: non-existent node in this list.'</span>},
        beforeNodeToDelete = <span class="hljs-literal">null</span>,
        nodeToDelete = <span class="hljs-literal">null</span>,
        deletedNode = <span class="hljs-literal">null</span>;
 
    <span class="hljs-comment">// 1st use-case: an invalid position</span>
    <span class="hljs-keyword">if</span> (position &lt; <span class="hljs-number">0</span> || position &gt; length) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(message.failure);
    }
 
    <span class="hljs-comment">// 2nd use-case: the first node is removed</span>
    <span class="hljs-keyword">if</span> (position === <span class="hljs-number">1</span>) {
        <span class="hljs-keyword">this</span>.head = currentNode.next;
        deletedNode = currentNode;
        currentNode = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">this</span>._length--;
         
        <span class="hljs-keyword">return</span> deletedNode;
    }
 
    <span class="hljs-comment">// 3rd use-case: any other node is removed</span>
    <span class="hljs-keyword">while</span> (count &lt; position) {
        beforeNodeToDelete = currentNode;
        nodeToDelete = currentNode.next;
        count++;
    }
 
    beforeNodeToDelete.next = nodeToDelete.next;
    deletedNode = nodeToDelete;
    nodeToDelete = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">this</span>._length--;
 
    <span class="hljs-keyword">return</span> deletedNode;
};</code></pre>
<p>我们要实现的<code>remove(position)</code>涉及三种情况：</p>
<ol>
<li><p>无效的位置作为参数传递。</p></li>
<li><p>第一个位置（链表的的`head）作为参数的传递。</p></li>
<li><p>一个合法的位置（不是第一个位置）作为参数的传递。</p></li>
</ol>
<p>前两种情况是最简单的处理。 关于第一种情况，如果链表为空或传入的位置不存在，则会抛出错误。</p>
<p>第二种情况处理链表中第一个节点的删除，这也是头节点。 如果是这种情况，就执行下面的逻辑：</p>
<ol>
<li><p>头被重新赋值给<code>currentNode.next</code>。</p></li>
<li><p><code>deletedNode</code>指向<code>currentNode</code>。</p></li>
<li><p><code>currentNode</code>被重新赋值为null。</p></li>
<li><p>将的链表的长度减1。</p></li>
<li><p>返回<code>deletedNode</code>。</p></li>
</ol>
<p>第三种情况是最难理解的。 其复杂性在于我们要在每一次循环中操作两个节点的必要性。 在每次循环中，需要处理要删除的节点和它前面的节点。当循环到要被删除的位置的节点时，循环终止。</p>
<p>在这一点上，我们涉及到三个节点：<br><code>beforeNodeToDelete</code>, <code>nodeToDelete</code>, 和 <code>deletedNode</code>。删除<code>nodeToDelete</code>之前，必须先把它的<code>next</code>的值赋给<code>beforeNodeToDelete</code>的<code>next</code>，如果不清楚这一步骤的目的，可以提醒自己有一个节点负责链接其前后的其他节点，只需要删除这个节点，就可以把链表断开。</p>
<p>接下来，我们将<code>deletedNode</code>赋值给<code>nodeToDelete</code>。 然后我们将<code>nodeToDelete</code>的值设置为<code>null</code>，将列表的长度减1，最后返回<code>deletedNode</code>。</p>
<h2 id="articleHeader6">单向链表的完整实现</h2>
<p>以下是单向链表的完整实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Node(data) {
    this.data = data;
    this.next = null;
}
 
function SinglyList() {
    this._length = 0;
    this.head = null;
}
 
SinglyList.prototype.add = function(value) {
    var node = new Node(value),
        currentNode = this.head;
 
    // 1st use-case: an empty list
    if (!currentNode) {
        this.head = node;
        this._length++;
 
        return node;
    }
 
    // 2nd use-case: a non-empty list
    while (currentNode.next) {
        currentNode = currentNode.next;
    }
 
    currentNode.next = node;
 
    this._length++;
     
    return node;
};
 
SinglyList.prototype.searchNodeAt = function(position) {
    var currentNode = this.head,
        length = this._length,
        count = 1,
        message = {failure: 'Failure: non-existent node in this list.'};
 
    // 1st use-case: an invalid position
    if (length === 0 || position < 1 || position > length) {
        throw new Error(message.failure);
    }
 
    // 2nd use-case: a valid position
    while (count < position) {
        currentNode = currentNode.next;
        count++;
    }
 
    return currentNode;
};
 
SinglyList.prototype.remove = function(position) {
    var currentNode = this.head,
        length = this._length,
        count = 0,
        message = {failure: 'Failure: non-existent node in this list.'},
        beforeNodeToDelete = null,
        nodeToDelete = null,
        deletedNode = null;
 
    // 1st use-case: an invalid position
    if (position < 0 || position > length) {
        throw new Error(message.failure);
    }
 
    // 2nd use-case: the first node is removed
    if (position === 1) {
        this.head = currentNode.next;
        deletedNode = currentNode;
        currentNode = null;
        this._length--;
         
        return deletedNode;
    }
 
    // 3rd use-case: any other node is removed
    while (count < position) {
        beforeNodeToDelete = currentNode;
        nodeToDelete = currentNode.next;
        count++;
    }
 
    beforeNodeToDelete.next = nodeToDelete.next;
    deletedNode = nodeToDelete;
    nodeToDelete = null;
    this._length--;
 
    return deletedNode;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Node</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-keyword">this</span>.data = data;
    <span class="hljs-keyword">this</span>.next = <span class="hljs-literal">null</span>;
}
 
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SinglyList</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>._length = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">this</span>.head = <span class="hljs-literal">null</span>;
}
 
SinglyList.prototype.add = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
    <span class="hljs-keyword">var</span> node = <span class="hljs-keyword">new</span> Node(value),
        currentNode = <span class="hljs-keyword">this</span>.head;
 
    <span class="hljs-comment">// 1st use-case: an empty list</span>
    <span class="hljs-keyword">if</span> (!currentNode) {
        <span class="hljs-keyword">this</span>.head = node;
        <span class="hljs-keyword">this</span>._length++;
 
        <span class="hljs-keyword">return</span> node;
    }
 
    <span class="hljs-comment">// 2nd use-case: a non-empty list</span>
    <span class="hljs-keyword">while</span> (currentNode.next) {
        currentNode = currentNode.next;
    }
 
    currentNode.next = node;
 
    <span class="hljs-keyword">this</span>._length++;
     
    <span class="hljs-keyword">return</span> node;
};
 
SinglyList.prototype.searchNodeAt = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">position</span>) </span>{
    <span class="hljs-keyword">var</span> currentNode = <span class="hljs-keyword">this</span>.head,
        length = <span class="hljs-keyword">this</span>._length,
        count = <span class="hljs-number">1</span>,
        message = {<span class="hljs-attr">failure</span>: <span class="hljs-string">'Failure: non-existent node in this list.'</span>};
 
    <span class="hljs-comment">// 1st use-case: an invalid position</span>
    <span class="hljs-keyword">if</span> (length === <span class="hljs-number">0</span> || position &lt; <span class="hljs-number">1</span> || position &gt; length) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(message.failure);
    }
 
    <span class="hljs-comment">// 2nd use-case: a valid position</span>
    <span class="hljs-keyword">while</span> (count &lt; position) {
        currentNode = currentNode.next;
        count++;
    }
 
    <span class="hljs-keyword">return</span> currentNode;
};
 
SinglyList.prototype.remove = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">position</span>) </span>{
    <span class="hljs-keyword">var</span> currentNode = <span class="hljs-keyword">this</span>.head,
        length = <span class="hljs-keyword">this</span>._length,
        count = <span class="hljs-number">0</span>,
        message = {<span class="hljs-attr">failure</span>: <span class="hljs-string">'Failure: non-existent node in this list.'</span>},
        beforeNodeToDelete = <span class="hljs-literal">null</span>,
        nodeToDelete = <span class="hljs-literal">null</span>,
        deletedNode = <span class="hljs-literal">null</span>;
 
    <span class="hljs-comment">// 1st use-case: an invalid position</span>
    <span class="hljs-keyword">if</span> (position &lt; <span class="hljs-number">0</span> || position &gt; length) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(message.failure);
    }
 
    <span class="hljs-comment">// 2nd use-case: the first node is removed</span>
    <span class="hljs-keyword">if</span> (position === <span class="hljs-number">1</span>) {
        <span class="hljs-keyword">this</span>.head = currentNode.next;
        deletedNode = currentNode;
        currentNode = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">this</span>._length--;
         
        <span class="hljs-keyword">return</span> deletedNode;
    }
 
    <span class="hljs-comment">// 3rd use-case: any other node is removed</span>
    <span class="hljs-keyword">while</span> (count &lt; position) {
        beforeNodeToDelete = currentNode;
        nodeToDelete = currentNode.next;
        count++;
    }
 
    beforeNodeToDelete.next = nodeToDelete.next;
    deletedNode = nodeToDelete;
    nodeToDelete = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">this</span>._length--;
 
    <span class="hljs-keyword">return</span> deletedNode;
};</code></pre>
<h1 id="articleHeader7"><strong>从单链表到双链表</strong></h1>
<p>我们已经完整的实现了单链表，这真是极好的。现在可以在一个占用费连续的空间的链表结构中，进行添加、删除和查找节点的操作了。</p>
<p>然而现在所有的操作都是从链表的起始位置开始，并运行到链表的结尾。换句话说，它们是单向的。</p>
<p>可能在某些情况下我们希望操作是双向的。如果你考虑了这种可能性，那么你刚才就是描述了一个双向链表。</p>
<h1 id="articleHeader8"><strong>双向链表</strong></h1>
<p>双向链表具有单链表的所有功能，并将其扩展为在链表中可以进行双向遍历。 换句话说，我们可从链表中第一个节点遍历到到最后一个节点；也可以从最后一个节点遍历到第一个节点。</p>
<p>在本节中，我们将重点关注双向链表和单链列表之间的差异。</p>
<h2 id="articleHeader9"><strong>双向链表的操作</strong></h2>
<p>我们的链表将包括两个构造函数：<code>Node</code>和<code>DoublyList</code>。看看他们是怎样运作的。</p>
<h3 id="articleHeader10"><strong>Node</strong></h3>
<ul>
<li><p><code>data</code> 存储数据。</p></li>
<li><p><code>next</code> 指向链表中下一个节点的指针。</p></li>
<li><p><code>previous</code> 指向链表中前一个节点的指针。</p></li>
</ul>
<h3 id="articleHeader11"><strong>DoublyList</strong></h3>
<ul>
<li><p><code>_length</code> 保存链表中节点的个数</p></li>
<li><p><code>head</code> 指定一个节点作为链表的头节点</p></li>
<li><p><code>tail</code> 指定一个节点作为链表的尾节点</p></li>
<li><p><code>add(value)</code> 向链表中添加一个节点</p></li>
<li><p><code>searchNodeAt(position)</code> 找到在列表中指定位置 n 上的节点</p></li>
<li><p><code>remove(position)</code> 删除链表中指定位置上的节点</p></li>
</ul>
<h2 id="articleHeader12"><strong>双向链表的实现</strong></h2>
<p>现在开始写代码！</p>
<p>在实现中，将会创建一个名为<code>Node</code>的构造函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Node(value) {
    this.data = value;
    this.previous = null;
    this.next = null;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Node</span>(<span class="hljs-params">value</span>) </span>{
    <span class="hljs-keyword">this</span>.data = value;
    <span class="hljs-keyword">this</span>.previous = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">this</span>.next = <span class="hljs-literal">null</span>;
}</code></pre>
<p>想要实现双向链表的双向遍历，我们需要指向链表两个方向的属性。这些属性被命名为<code>previous</code>和<code>next</code>。</p>
<p>接下来，我们需要实现<code>DoublyList</code>并添加三个属性：<code>_length</code>，<code>head</code>和<code>tail</code>。</p>
<p>与单链表不同，双向链表包含对链表开头和结尾节点的引用。 由于<code>DoublyList</code>刚被实例化时并不包含任何节点，所以<code>head</code>和<code>tail</code>的默认值都被设置为<code>null</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function DoublyList() {
    this._length = 0;
    this.head = null;
    this.tail = null;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">DoublyList</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>._length = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">this</span>.head = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">this</span>.tail = <span class="hljs-literal">null</span>;
}</code></pre>
<h3 id="articleHeader13"><strong>双向链表的方法</strong></h3>
<p>接下来我们讨论以下方法：<code>add(value)</code>, <code>remove(position)</code>, 和 <code>searchNodeAt(position)</code>。所有这些方法都用于单链表; 然而，它们必须备重写为可以双向遍历。</p>
<h4><strong>方法1/3 <code>add(value)</code></strong></h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="DoublyList.prototype.add = function(value) {
    var node = new Node(value);
 
    if (this._length) {
        this.tail.next = node;
        node.previous = this.tail;
        this.tail = node;
    } else {
        this.head = node;
        this.tail = node;
    }
 
    this._length++;
     
    return node;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">DoublyList.prototype.add = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
    <span class="hljs-keyword">var</span> node = <span class="hljs-keyword">new</span> Node(value);
 
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>._length) {
        <span class="hljs-keyword">this</span>.tail.next = node;
        node.previous = <span class="hljs-keyword">this</span>.tail;
        <span class="hljs-keyword">this</span>.tail = node;
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">this</span>.head = node;
        <span class="hljs-keyword">this</span>.tail = node;
    }
 
    <span class="hljs-keyword">this</span>._length++;
     
    <span class="hljs-keyword">return</span> node;
};</code></pre>
<p>在这个方法中，存在两种可能。首先，如果链表是空的，则给它的<code>head </code>和<code>tail</code>分配节点。其次，如果链表中已经存在节点，则查找链表的尾部并把心节点分配给<code>tail.next</code>；同样，我们需要配置新的尾部以供进行双向遍历。换句话说，我们需要把<code>tail.previous</code>设置为原来的尾部。</p>
<h4><strong>方法2/3 <code>searchNodeAt(position)</code></strong></h4>
<p><code>searchNodeAt(position)</code>的实现与单链表相同。 如果你忘记了如何实现它，请通过下面的代码回忆：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="DoublyList.prototype.searchNodeAt = function(position) {
    var currentNode = this.head,
        length = this._length,
        count = 1,
        message = {failure: 'Failure: non-existent node in this list.'};
 
    // 1st use-case: an invalid position 
    if (length === 0 || position < 1 || position > length) {
        throw new Error(message.failure);
    }
 
    // 2nd use-case: a valid position 
    while (count < position) {
        currentNode = currentNode.next;
        count++;
    }
 
    return currentNode;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">DoublyList.prototype.searchNodeAt = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">position</span>) </span>{
    <span class="hljs-keyword">var</span> currentNode = <span class="hljs-keyword">this</span>.head,
        length = <span class="hljs-keyword">this</span>._length,
        count = <span class="hljs-number">1</span>,
        message = {<span class="hljs-attr">failure</span>: <span class="hljs-string">'Failure: non-existent node in this list.'</span>};
 
    <span class="hljs-comment">// 1st use-case: an invalid position </span>
    <span class="hljs-keyword">if</span> (length === <span class="hljs-number">0</span> || position &lt; <span class="hljs-number">1</span> || position &gt; length) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(message.failure);
    }
 
    <span class="hljs-comment">// 2nd use-case: a valid position </span>
    <span class="hljs-keyword">while</span> (count &lt; position) {
        currentNode = currentNode.next;
        count++;
    }
 
    <span class="hljs-keyword">return</span> currentNode;
};</code></pre>
<h4><strong>方法3/3 <code>remove(position)</code></strong></h4>
<p>理解这个方法是最具挑战性的。我先写出代码，然后再解释它。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="DoublyList.prototype.remove = function(position) {
    var currentNode = this.head,
        length = this._length,
        count = 1,
        message = {failure: 'Failure: non-existent node in this list.'},
        beforeNodeToDelete = null,
        nodeToDelete = null,
        deletedNode = null;
 
    // 1st use-case: an invalid position
    if (length === 0 || position < 1 || position > length) {
        throw new Error(message.failure);
    }
 
    // 2nd use-case: the first node is removed
    if (position === 1) {
        this.head = currentNode.next;
 
        // 2nd use-case: there is a second node
        if (!this.head) {
            this.head.previous = null;
        // 2nd use-case: there is no second node
        } else {
            this.tail = null;
        }
 
    // 3rd use-case: the last node is removed
    } else if (position === this._length) {
        this.tail = this.tail.previous;
        this.tail.next = null;
    // 4th use-case: a middle node is removed
    } else {
        while (count < position) {
            currentNode = currentNode.next;
            count++;
        }
 
        beforeNodeToDelete = currentNode.previous;
        nodeToDelete = currentNode;
        afterNodeToDelete = currentNode.next;
 
        beforeNodeToDelete.next = afterNodeToDelete;
        afterNodeToDelete.previous = beforeNodeToDelete;
        deletedNode = nodeToDelete;
        nodeToDelete = null;
    }
 
    this._length--;
 
    return message.success;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">DoublyList.prototype.remove = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">position</span>) </span>{
    <span class="hljs-keyword">var</span> currentNode = <span class="hljs-keyword">this</span>.head,
        length = <span class="hljs-keyword">this</span>._length,
        count = <span class="hljs-number">1</span>,
        message = {<span class="hljs-attr">failure</span>: <span class="hljs-string">'Failure: non-existent node in this list.'</span>},
        beforeNodeToDelete = <span class="hljs-literal">null</span>,
        nodeToDelete = <span class="hljs-literal">null</span>,
        deletedNode = <span class="hljs-literal">null</span>;
 
    <span class="hljs-comment">// 1st use-case: an invalid position</span>
    <span class="hljs-keyword">if</span> (length === <span class="hljs-number">0</span> || position &lt; <span class="hljs-number">1</span> || position &gt; length) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(message.failure);
    }
 
    <span class="hljs-comment">// 2nd use-case: the first node is removed</span>
    <span class="hljs-keyword">if</span> (position === <span class="hljs-number">1</span>) {
        <span class="hljs-keyword">this</span>.head = currentNode.next;
 
        <span class="hljs-comment">// 2nd use-case: there is a second node</span>
        <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.head) {
            <span class="hljs-keyword">this</span>.head.previous = <span class="hljs-literal">null</span>;
        <span class="hljs-comment">// 2nd use-case: there is no second node</span>
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">this</span>.tail = <span class="hljs-literal">null</span>;
        }
 
    <span class="hljs-comment">// 3rd use-case: the last node is removed</span>
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (position === <span class="hljs-keyword">this</span>._length) {
        <span class="hljs-keyword">this</span>.tail = <span class="hljs-keyword">this</span>.tail.previous;
        <span class="hljs-keyword">this</span>.tail.next = <span class="hljs-literal">null</span>;
    <span class="hljs-comment">// 4th use-case: a middle node is removed</span>
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">while</span> (count &lt; position) {
            currentNode = currentNode.next;
            count++;
        }
 
        beforeNodeToDelete = currentNode.previous;
        nodeToDelete = currentNode;
        afterNodeToDelete = currentNode.next;
 
        beforeNodeToDelete.next = afterNodeToDelete;
        afterNodeToDelete.previous = beforeNodeToDelete;
        deletedNode = nodeToDelete;
        nodeToDelete = <span class="hljs-literal">null</span>;
    }
 
    <span class="hljs-keyword">this</span>._length--;
 
    <span class="hljs-keyword">return</span> message.success;
};</code></pre>
<p><code>remove(position)</code> 处理以下四种情况：</p>
<ol>
<li><p>如果<code>remove(position)</code>的参数传递的位置存在, 将会抛出一个错误。</p></li>
<li><p>如果<code>remove(position)</code>的参数传递的位置是链表的第一个节点（<code>head</code>），将把<code>head</code>赋值给<code>deletedNode </code>，然后把<code>head</code>重新分配到链表中的下一个节点。 此时，我们必须考虑链表中否存在多个节点。 如果答案为否，头部将被分配为null，之后进入<code>if-else</code>语句的<code>if</code>部分。 在<code>if</code>的代码中，还必须将<code>tail</code>设置为<code>null</code> —— 换句话说，我们返回到一个空的双向链表的初始状态。如果删除列表中的第一个节点，并且链表中存在多个节点，那么我们输入<code>if-else</code>语句的<code>else</code>部分。 在这种情况下，我们必须正确地将<code>head</code>的<code>previous</code>属性设置为<code>null</code> —— 在链表的头前面是没有节点的。</p></li>
<li><p>如果<code>remove(position)</code>的参数传递的位置是链表的尾部，首先把<code>tail</code>赋值给<code>deletedNode</code>，然后<code>tail</code>被重新赋值为尾部之前的那个节点，最后新尾部后面没有其他节点，需要将其<code>next</code>值设置为<code>null</code>。</p></li>
<li><p>这里发生了很多事情，所以我将重点关注逻辑，而不是每一行代码。 一旦<code>CurrentNode</code>指向的节点是将要被<code>remove(position)</code>删除的节点时，就退出<code>while</code>循环。这时我们把<code>nodeToDelete</code>之后的节点重新赋值给<code>beforeNodeToDelete.next</code>。相应的，<br>把<code>nodeToDelete</code>之前的节点重新赋值给<code>afterNodeToDelete.previous</code>。——换句话说，我们把指向已删除节点的指针，改为指向正确的节点。最后，把<code>nodeToDelete </code>赋值为<code>null</code>。</p></li>
</ol>
<p>最后，把链表的长度减1，返回<code>deletedNode</code>。</p>
<h2 id="articleHeader14"><strong>双向链表的完整实现</strong></h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Node(value) {
    this.data = value;
    this.previous = null;
    this.next = null;
}
 
function DoublyList() {
    this._length = 0;
    this.head = null;
    this.tail = null;
}
 
DoublyList.prototype.add = function(value) {
    var node = new Node(value);
 
    if (this._length) {
        this.tail.next = node;
        node.previous = this.tail;
        this.tail = node;
    } else {
        this.head = node;
        this.tail = node;
    }
 
    this._length++;
 
    return node;
};
 
DoublyList.prototype.searchNodeAt = function(position) {
    var currentNode = this.head,
        length = this._length,
        count = 1,
        message = {failure: 'Failure: non-existent node in this list.'};
 
    // 1st use-case: an invalid position
    if (length === 0 || position < 1 || position > length) {
        throw new Error(message.failure);
    }
 
    // 2nd use-case: a valid position
    while (count < position) {
        currentNode = currentNode.next;
        count++;
    }
 
    return currentNode;
};
 
DoublyList.prototype.remove = function(position) {
    var currentNode = this.head,
        length = this._length,
        count = 1,
        message = {failure: 'Failure: non-existent node in this list.'},
        beforeNodeToDelete = null,
        nodeToDelete = null,
        deletedNode = null;
 
    // 1st use-case: an invalid position
    if (length === 0 || position < 1 || position > length) {
        throw new Error(message.failure);
    }
 
    // 2nd use-case: the first node is removed
    if (position === 1) {
        this.head = currentNode.next;
 
        // 2nd use-case: there is a second node
        if (!this.head) {
            this.head.previous = null;
        // 2nd use-case: there is no second node
        } else {
            this.tail = null;
        }
 
    // 3rd use-case: the last node is removed
    } else if (position === this._length) {
        this.tail = this.tail.previous;
        this.tail.next = null;
    // 4th use-case: a middle node is removed
    } else {
        while (count < position) {
            currentNode = currentNode.next;
            count++;
        }
 
        beforeNodeToDelete = currentNode.previous;
        nodeToDelete = currentNode;
        afterNodeToDelete = currentNode.next;
 
        beforeNodeToDelete.next = afterNodeToDelete;
        afterNodeToDelete.previous = beforeNodeToDelete;
        deletedNode = nodeToDelete;
        nodeToDelete = null;
    }
 
    this._length--;
 
    return message.success;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Node</span>(<span class="hljs-params">value</span>) </span>{
    <span class="hljs-keyword">this</span>.data = value;
    <span class="hljs-keyword">this</span>.previous = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">this</span>.next = <span class="hljs-literal">null</span>;
}
 
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">DoublyList</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>._length = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">this</span>.head = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">this</span>.tail = <span class="hljs-literal">null</span>;
}
 
DoublyList.prototype.add = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>) </span>{
    <span class="hljs-keyword">var</span> node = <span class="hljs-keyword">new</span> Node(value);
 
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>._length) {
        <span class="hljs-keyword">this</span>.tail.next = node;
        node.previous = <span class="hljs-keyword">this</span>.tail;
        <span class="hljs-keyword">this</span>.tail = node;
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">this</span>.head = node;
        <span class="hljs-keyword">this</span>.tail = node;
    }
 
    <span class="hljs-keyword">this</span>._length++;
 
    <span class="hljs-keyword">return</span> node;
};
 
DoublyList.prototype.searchNodeAt = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">position</span>) </span>{
    <span class="hljs-keyword">var</span> currentNode = <span class="hljs-keyword">this</span>.head,
        length = <span class="hljs-keyword">this</span>._length,
        count = <span class="hljs-number">1</span>,
        message = {<span class="hljs-attr">failure</span>: <span class="hljs-string">'Failure: non-existent node in this list.'</span>};
 
    <span class="hljs-comment">// 1st use-case: an invalid position</span>
    <span class="hljs-keyword">if</span> (length === <span class="hljs-number">0</span> || position &lt; <span class="hljs-number">1</span> || position &gt; length) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(message.failure);
    }
 
    <span class="hljs-comment">// 2nd use-case: a valid position</span>
    <span class="hljs-keyword">while</span> (count &lt; position) {
        currentNode = currentNode.next;
        count++;
    }
 
    <span class="hljs-keyword">return</span> currentNode;
};
 
DoublyList.prototype.remove = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">position</span>) </span>{
    <span class="hljs-keyword">var</span> currentNode = <span class="hljs-keyword">this</span>.head,
        length = <span class="hljs-keyword">this</span>._length,
        count = <span class="hljs-number">1</span>,
        message = {<span class="hljs-attr">failure</span>: <span class="hljs-string">'Failure: non-existent node in this list.'</span>},
        beforeNodeToDelete = <span class="hljs-literal">null</span>,
        nodeToDelete = <span class="hljs-literal">null</span>,
        deletedNode = <span class="hljs-literal">null</span>;
 
    <span class="hljs-comment">// 1st use-case: an invalid position</span>
    <span class="hljs-keyword">if</span> (length === <span class="hljs-number">0</span> || position &lt; <span class="hljs-number">1</span> || position &gt; length) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(message.failure);
    }
 
    <span class="hljs-comment">// 2nd use-case: the first node is removed</span>
    <span class="hljs-keyword">if</span> (position === <span class="hljs-number">1</span>) {
        <span class="hljs-keyword">this</span>.head = currentNode.next;
 
        <span class="hljs-comment">// 2nd use-case: there is a second node</span>
        <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.head) {
            <span class="hljs-keyword">this</span>.head.previous = <span class="hljs-literal">null</span>;
        <span class="hljs-comment">// 2nd use-case: there is no second node</span>
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">this</span>.tail = <span class="hljs-literal">null</span>;
        }
 
    <span class="hljs-comment">// 3rd use-case: the last node is removed</span>
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (position === <span class="hljs-keyword">this</span>._length) {
        <span class="hljs-keyword">this</span>.tail = <span class="hljs-keyword">this</span>.tail.previous;
        <span class="hljs-keyword">this</span>.tail.next = <span class="hljs-literal">null</span>;
    <span class="hljs-comment">// 4th use-case: a middle node is removed</span>
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">while</span> (count &lt; position) {
            currentNode = currentNode.next;
            count++;
        }
 
        beforeNodeToDelete = currentNode.previous;
        nodeToDelete = currentNode;
        afterNodeToDelete = currentNode.next;
 
        beforeNodeToDelete.next = afterNodeToDelete;
        afterNodeToDelete.previous = beforeNodeToDelete;
        deletedNode = nodeToDelete;
        nodeToDelete = <span class="hljs-literal">null</span>;
    }
 
    <span class="hljs-keyword">this</span>._length--;
 
    <span class="hljs-keyword">return</span> message.success;
};</code></pre>
<h1 id="articleHeader15"><strong>总结</strong></h1>
<p>本文中已经介绍了很多信息。 如果其中任何地方看起来令人困惑，就再读一遍并查看代码。如果它最终对你有所帮助，我会感到自豪。你刚刚揭开了一个单链表和双向链表的秘密，可以把这些数据结构添加到自己的编码工具弹药库中！</p>
<p><strong> 欢迎扫描二维码关注公众号，每天推送我翻译的技术文章。</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVRyYe?w=430&amp;h=430" src="https://static.alili.tech/img/bVRyYe?w=430&amp;h=430" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【译】JavaScript数据结构（3）：单向链表与双向链表

## 原文链接
[https://segmentfault.com/a/1190000010345293](https://segmentfault.com/a/1190000010345293)

