---
title: '【译】JavaScript数据结构（2）：栈与队列' 
date: 2019-01-07 2:30:10
hidden: true
slug: fw2oi43q3ka
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><strong>翻译</strong>：疯狂的技术宅<br><strong>英文</strong>：<a href="https://code.tutsplus.com/articles/data-structures-with-javascript-stack-and-queue--cms-23348" rel="nofollow noreferrer" target="_blank">https://code.tutsplus.com/art...</a><br><strong>说明</strong>：本文翻译自系列文章《Data Structures With JavaScript》，总共为四篇，原作者是在美国硅谷工作的工程师 Cho S. Kim 。这是上本系列的第二篇。</p></blockquote>
<p>说明：本专栏文章首发于公众号：jingchengyideng 。</p>
<p>栈和队列是web开发中最常用的两种数据结构。绝大多数用户，甚至包括web开发人员，都不知道这个惊人的事实。如果你是一个程序员，那么请听我讲两个启发性的例子:使用堆栈来组织数据，来实现文本编辑器的“撤消”操作;使用队列处理数据，实现web浏览器的事件循环处理事件(单击click、悬停hoover等)。</p>
<p>等等，先想象一下我们作为用户和程序员，每天使用栈和队列的次数，这太惊人了吧！由于它们在设计上有普遍性和相似性，我决定从这里开始为大家介绍数据结构。</p>
<h2 id="articleHeader0"><strong>栈</strong></h2>
<p>在计算机科学中，栈是一种线性数据结构。如果你理解起来有困难，就像最初非常困惑的我一样，不妨这样认为：一个栈可以对数据按照顺序进行组织和管理。</p>
<p>要理解这种顺序，我们可以把栈这种结构想象为自助餐厅的一堆盘子，当一个盘子被叠加到一堆盘子上时，原有的盘子保留了它们原来的顺序；同时，当一个新盘子被添加时，它会朝栈的底部方向堆积。每当我们添加一个新盘子时，被称作入栈，这个新盘子处于栈的顶部，也被称作栈顶。</p>
<p>这个添加盘子的过程会保留每个盘子被添加到栈中的顺序，每次从栈中取出一个盘子时也是一样的。我可能用了太多的篇幅来描述自助餐厅中的盘子是怎样被添加和删除的过程。</p>
<p>为了是大家理解栈更多的技术细节，让我们回顾一下前面关于文本编辑器的“撤消”操作。每次将文本添加到文本编辑器事，该文本被压入栈中。其中第一次添加的文本代表栈的底部（栈底）；最后一次的修改表示栈的顶部（栈顶）。如果用户希望撤销最后一次修改，则删除处于栈的顶部的那段文本，这个过程可以不断重复，一直到栈中没有更多内容，这时我们会得到一个空白文件。</p>
<h3 id="articleHeader1"><strong>栈的操作</strong></h3>
<p>现在我们对栈的模型有了基本概念，下一步就要定义栈的两个操作：</p>
<ul>
<li><p>push(data) 添加数据</p></li>
<li><p>pop() 删除最后添加的数据</p></li>
</ul>
<h3 id="articleHeader2"><strong>栈的实现</strong></h3>
<p>现在让我们开始为栈编写代码吧！</p>
<h4><strong>栈的属性</strong></h4>
<p>为了实现栈结构，我们将会创建一个名为 Stack 的构造函数。栈的每个实例都有两个属性：_size 和 _storage。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Stack() {
    this._size = 0;
    this._storage = {};
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Stack</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>._size = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">this</span>._storage = {};
}</code></pre>
<p>this._storage 属性使栈的每一个实例都具有自己的用来存储数据的容器； this._size 属性反映了当前栈中数据的个数。如果创建了一个新的栈的实例，并且有一个数据被存入栈中，那么 this._size 的值将被增加到1。如果又有数据入栈，this._size 的值将增加到2。如果一个数据从栈中被取出，this._size 的值将会减少为1。</p>
<h4><strong>栈的方法(操作)</strong></h4>
<p>我们需要定义可以向栈中添加（入栈）和从栈中取出（出栈）数据的方法。让我们从添加数据开始。</p>
<h4>
<strong>方法1/2:</strong> push(data)</h4>
<p>（每一个栈的实例都具有这个方法，所以我们把它添加到栈结构的原型中）</p>
<p>我们对这个方法有两个要求：</p>
<ol>
<li><p>每当添加数据时, 我们希望能够增加栈的大小。</p></li>
<li><p>每当添加数据时,我们希望能够保留它的添加顺序。</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Stack.prototype.push = function(data) {
    // increases the size of our storage
    var size = this._size++;
 
    // assigns size as a key of storage
    // assigns data as the value of this key
    this._storage[size] = data;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code>Stack.prototype.push = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-comment">// increases the size of our storage</span>
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">size</span> = <span class="hljs-keyword">this</span>._size++;
 
    <span class="hljs-comment">// assigns size as a key of storage</span>
    <span class="hljs-comment">// assigns data as the value of this key</span>
    <span class="hljs-keyword">this</span>._storage[<span class="hljs-built_in">size</span>] = data;
};</code></pre>
<p>我们实现push(data)方法时要包含以下逻辑：声明一个变量 size 并赋值为 this._size++。指定 size 为 this._storage 的键;并将数据赋给相应键的值。</p>
<p>如果我们调用push(data)方法5次，那么栈的大小将是5。第一次入栈时，将会把数据存入this._storage 中键名为1对应的空间，当第5次入栈时，将会把数据存入this._storage 中键名为5对应的空间。现在我们的数据有了顺序！</p>
<h4>
<strong>方法2/2:</strong> pop()</h4>
<p>我们已经实现了把数据送入栈中，下一步我们要从栈中弹出（删除）数据。从栈中弹出数据并不是简单的删除数据，它只删除最后一次添加的数据。</p>
<p>以下是这个方法的要点：</p>
<ol>
<li><p>使用栈当前的大小获得最后一次添加的数据。</p></li>
<li><p>删除最后一次添加的数据。</p></li>
<li><p>使 _this._size 计数减一。</p></li>
<li><p>返回刚刚删除的数据。</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Stack.prototype.pop = function() {
    var size = this._size,
        deletedData;
 
    deletedData = this._storage[size];
 
    delete this._storage[size];
    this.size--;
 
    return deletedData;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code>Stack.prototype.pop = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">size</span> = <span class="hljs-keyword">this</span>._size,
        deletedData;
 
    deletedData = <span class="hljs-keyword">this</span>._storage[<span class="hljs-built_in">size</span>];
 
    <span class="hljs-keyword">delete</span> <span class="hljs-keyword">this</span>._storage[<span class="hljs-built_in">size</span>];
    <span class="hljs-keyword">this</span>.size--;
 
    <span class="hljs-keyword">return</span> deletedData;
};</code></pre>
<p>pop()方法满足以上四个要点。首先，我们声明了两个变量：size 用来初始化栈的大小；deletedData 用来保存栈中最后一次添加的数据。第二，我们删除了最后一次添加的数据的键值对。第三，我们把栈的大小减少了1.第四，返回从栈中删除的数据。</p>
<p>如果我们测试当前实现的pop()方法，会发现它适用下面的案例：如果向栈内push数据，栈的大小会增加1，如果从栈中pop()数据，栈的大小会减少1！</p>
<p>为了处理这个用例，我们将向pop()中添加if语句。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Stack.prototype.pop = function() {
    var size = this._size,
        deletedData;
 
    if (size) {
        deletedData = this._storage[size];
 
        delete this._storage[size];
        this._size--;
 
        return deletedData;
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code>Stack.prototype.pop = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">size</span> = <span class="hljs-keyword">this</span>._size,
        deletedData;
 
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">size</span>) {
        deletedData = <span class="hljs-keyword">this</span>._storage[<span class="hljs-built_in">size</span>];
 
        <span class="hljs-keyword">delete</span> <span class="hljs-keyword">this</span>._storage[<span class="hljs-built_in">size</span>];
        <span class="hljs-keyword">this</span>._size--;
 
        <span class="hljs-keyword">return</span> deletedData;
    }
};</code></pre>
<p>通过添加if语句，可以使代码在存储中有数据时才被执行。</p>
<h4><strong>栈的完整实现</strong></h4>
<p>我们已经实现了完整的栈结构。不管以怎样的顺序调用任何一个方法，代码都可以工作！下面使代码的最终版本：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Stack() {
    this._size = 0;
    this._storage = {};
}
 
Stack.prototype.push = function(data) {
    var size = ++this._size;
    this._storage[size] = data;
};
 
Stack.prototype.pop = function() {
    var size = this._size,
        deletedData;
 
    if (size) {
        deletedData = this._storage[size];
 
        delete this._storage[size];
        this._size--;
 
        return deletedData;
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Stack</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>._size = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">this</span>._storage = {};
}
 
Stack.prototype.push = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">size</span> = ++<span class="hljs-keyword">this</span>._size;
    <span class="hljs-keyword">this</span>._storage[<span class="hljs-built_in">size</span>] = data;
};
 
Stack.prototype.pop = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">size</span> = <span class="hljs-keyword">this</span>._size,
        deletedData;
 
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">size</span>) {
        deletedData = <span class="hljs-keyword">this</span>._storage[<span class="hljs-built_in">size</span>];
 
        <span class="hljs-keyword">delete</span> <span class="hljs-keyword">this</span>._storage[<span class="hljs-built_in">size</span>];
        <span class="hljs-keyword">this</span>._size--;
 
        <span class="hljs-keyword">return</span> deletedData;
    }
};</code></pre>
<h2 id="articleHeader3"><strong>从栈到队列</strong></h2>
<p>当我们想要按顺序添加数据或删除数据时，可以使用栈结构。根据它的定义，栈可以只删除最近添加的数据。如果想要删除最早的数据该怎么办呢?这时我们希望使用名为queue的数据结构。</p>
<h2 id="articleHeader4"><strong>队列</strong></h2>
<p>与栈类似，队列也是一个线性数据结构。与栈不同的是，队列只删除最先添加的数据。</p>
<p>为了帮助你明白队列是如何工作的，让我们花点时间举个例子。我们可以把队列想象成为熟食店的售票系统。每个顾客拿一张票，当他们的号码被呼叫时接受服务。持第一张票的顾客首先接受服务。</p>
<p>再进一步想象一下，这张票上有一个数字“1”。下一张票上有数字“2”。得到二张票的顾客将会第二个接受服务。（如果我们的售票系统像栈一样运行，最先进入堆栈的客户将会最后一个接受服务！）</p>
<p>队列的一个更实际的例子是Web浏览器的事件循环。当触发不同事件时，例如单击某个按钮，点击事件将被添加到事件循环队列中，并按照它们进入队列的顺序进行处理。</p>
<p>现在我们具有了队列的概念，接下来就要定义它的操作。你会注意到，队列的操作和栈非常相似。区别就在被删除的数据在什么地方。</p>
<ul>
<li><p>enqueue(data) 将数据添加到队列中。</p></li>
<li><p>dequeue 删除最早加入队列的数据。</p></li>
</ul>
<h2 id="articleHeader5"><strong>队列的实现</strong></h2>
<p>现在让我们开始写队列的代码吧！</p>
<h3 id="articleHeader6"><strong>队列的属性</strong></h3>
<p>在实现队列的代码中，我们将会创建一个名为 Queue 的构造方法。接下来添加三个属性：_oldestIndex, _newestIndex, 和 _storage。在下一小节中，_oldestIndex 和 _newestIndex 的作用将变得更加清晰。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Queue() {
    this._oldestIndex = 1;
    this._newestIndex = 1;
    this._storage = {};
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Queue</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">this</span>._oldestIndex = <span class="hljs-number">1</span>;
    <span class="hljs-keyword">this</span>._newestIndex = <span class="hljs-number">1</span>;
    <span class="hljs-keyword">this</span>._storage = {};
}</code></pre>
<h3 id="articleHeader7"><strong>队列的方法</strong></h3>
<p>现在我们将创建队列会用到的三个方法：size(), enqueue(data), 和 dequeue(data)。我将描述每个方法的作用，写出每个方法的代码，然后解释这些代码。</p>
<h4><strong>方法1/3：size( )</strong></h4>
<p>这个方法有两个作用：</p>
<ol>
<li><p>返回当前队列的长度。</p></li>
<li><p>保持队列中键的正确范围。</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Queue.prototype.size = function() {
    return this._newestIndex - this._oldestIndex;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>Queue.prototype.size = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._newestIndex - <span class="hljs-keyword">this</span>._oldestIndex;
};</code></pre>
<p>实现 size() 可能显得微不足道，但你会很快发现并不是这样的。为了理解其原因，我们必须快速重新审视 size() 在栈结构中的实现。</p>
<p>回想一下栈的概念模型，假设我们把5个盘子添加到一个栈上。栈的大小是5，每个盘子都有一个数字，从1(第一个添加的盘子)到5(最后一个添加的盘子)。如果我们取走三个盘子，就只剩下两个盘子。我们可以简单地用5减去3，得到正确的大小，也就是2。这是关于栈大小最重要的一点：当前大小相当于从栈顶部的盘子（2）到栈中其他盘子（1）的计数。换句话说，键的范围总是从当前大小到1之间。</p>
<p>现在，让我们将栈大小的实现应用到队列中。假设有五个顾客从我们的售票系统中取到了票。第一个顾客有一张显示数字1的票，第五个客户有一张显示数字5的票。现在有了一个队列，拿着第一张票的第一位顾客。</p>
<p>假设第一个客户接受了服务，这张票会从队列中被移除。与栈类似，我们可以通过从5减去1来获得队列的正确大小。那么服务队列中还有4张票。现在出现了一个问题：队列的大小不能对应正确的票号。如果我们从五减去一个，得到大小是4，但是不能使用4来确定当前队列中剩余票的编号范围。我们并不能确定队列中票号的顺序到底是1到4还是2到5。</p>
<p>这就是 oldestIndex 和 newestIndex 这两个属性 在队列中的用途。所有这一切似乎令人困惑——到现在我仍然会偶尔觉得困惑。下面的例子可以帮助我门理顺所有的逻辑。</p>
<p>假设我们的熟食店有两个售票系统：</p>
<ol>
<li><p>_newestindex 代表顾客售票系统的票。</p></li>
<li><p>_oldestindex 代表员工售票系统的票。</p></li>
</ol>
<p>对于两个售票系统来说，这是最难掌握的概念：当两个系统中的数字相同时，队列中的每个客户都被处理了，队列是空的。我们将使用下面的场景来加强这种逻辑：</p>
<ol>
<li><p>当顾客买票时，顾客的票号从_newestIndex 得到，票的编号是1。顾客售票系统的下一张票号码是2。</p></li>
<li><p>员工不买票，员工售票系统中当前票的编号是1。</p></li>
<li><p>我们在顾客系统中得到当前的票号2，减去员工系统中的号码1，得到的结果是1。这个数字1表示仍然在队列中没有被删除的票的数量</p></li>
<li><p>员工从它们的售票系统中取票，这张票代表正在被服务的顾客的票号，从_oldestIndex中得到，数字为1。</p></li>
<li><p>重复第4步，现在差为0，队列中没有其他的票了。</p></li>
</ol>
<p>现在属性 _newestindex可以告诉我们被分配在队列中票号的最大值（键），属性 _oldestindex 可以告诉我们最先进入队列中票号（键）。</p>
<p>探讨完了size()，接下来看enqueue(data)方法。</p>
<h4><strong>方法2/3：enqueue(data)</strong></h4>
<p>对于 enqueue 方法，有两个功能：</p>
<ol>
<li><p>使用_newestIndex 的值作为 this._storage 的键，并使用要添加的数据作为该键的值。</p></li>
<li><p>将_newestIndex 的值增加1。</p></li>
</ol>
<p>基于这两个功能，我们将编写 enqueue(data) 方法的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Queue.prototype.enqueue = function(data) {
    this._storage[this._newestIndex] = data;
    this._newestIndex++;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>Queue.prototype.enqueue = function(<span class="hljs-keyword">data</span>) {
    <span class="hljs-keyword">this</span>._storage[<span class="hljs-keyword">this</span>._newestIndex] = <span class="hljs-keyword">data</span>;
    <span class="hljs-keyword">this</span>._newestIndex++;
};</code></pre>
<p>该方法的主体只有两行代码。 在第一行，用 this._newestIndex 为this._storage 创建一个新的键，并为其分配数据。 this._newestIndex 始终从1开始。在第二行代码中，我们将 this._newestIndex 的值增加1，将其更新为2。</p>
<p>以上是方法 enqueue(data) 的所有代码。下面我们来实现方法 dequeue( )。</p>
<h4><strong>方法2/3：dequeue( )</strong></h4>
<p>以下是此方法的两个功能点：</p>
<ol>
<li><p>删除队列中最旧的数据。</p></li>
<li><p>属性 _oldestIndex 加1。</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Queue.prototype.dequeue = function() {
    var oldestIndex = this._oldestIndex,
        deletedData = this._storage[oldestIndex];
 
    delete this._storage[oldestIndex];
    this._oldestIndex++;
 
    return deletedData;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>Queue.prototype.dequeue = function() {
    <span class="hljs-keyword">var</span> oldestIndex = <span class="hljs-keyword">this</span>._oldestIndex,
        deletedData = <span class="hljs-keyword">this</span>._storage[oldestIndex];
 
    delete <span class="hljs-keyword">this</span>._storage[oldestIndex];
    <span class="hljs-keyword">this</span>._oldestIndex++;
 
    <span class="hljs-keyword">return</span> deletedData;
};</code></pre>
<p>在 dequeue( )的代码中，我们声明两个变量。 第一个变量 oldestIndex 给 this._oldestIndex 赋值。第二个变量 deletedData 被赋予 this._storage[oldestIndex] 的值。</p>
<p>下一步，删除队列中最早的索引。之后将 this._oldestIndex 的值加1。最后返回刚刚被删除的数据。</p>
<p>与栈的 pop() 方法第一次实现中出现的问题类似，dequeue() 在队列中没有数据的情况下不应该被执行。我们需要一些代码来处理这种情况。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Queue.prototype.dequeue = function() {
    var oldestIndex = this._oldestIndex,
        newestIndex = this._newestIndex,
        deletedData;
 
    if (oldestIndex !== newestIndex) {
        deletedData = this._storage[oldestIndex];
        delete this._storage[oldestIndex];
        this._oldestIndex++;
 
        return deletedData;
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>Queue.prototype.dequeue = <span class="hljs-function"><span class="hljs-keyword">function</span></span>() {
    <span class="hljs-keyword">var</span> oldestIndex = <span class="hljs-built_in">this</span>._oldestIndex,
        <span class="hljs-keyword">new</span><span class="hljs-type">estIndex</span> = <span class="hljs-built_in">this</span>._new<span class="hljs-type">estIndex</span>,
        deletedData;
 
    <span class="hljs-keyword">if</span> (oldestIndex !== <span class="hljs-keyword">new</span><span class="hljs-type">estIndex</span>) {
        deletedData = <span class="hljs-built_in">this</span>._storage[oldestIndex];
        delete <span class="hljs-built_in">this</span>._storage[oldestIndex];
        <span class="hljs-built_in">this</span>._oldestIndex++;
 
        <span class="hljs-keyword">return</span> deletedData;
    }
};</code></pre>
<p>每当 oldestIndex 和 newestIndex 的值不相等时，我们就执行前面的逻辑。</p>
<h3 id="articleHeader8"><strong>队列的完整实现代码</strong></h3>
<p>到此为止，我们实现了一个完整的队列结构的逻辑。下面是全部代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Queue() {
    this._oldestIndex = 1;
    this._newestIndex = 1;
    this._storage = {};
}
 
Queue.prototype.size = function() {
    return this._newestIndex - this._oldestIndex;
};
 
Queue.prototype.enqueue = function(data) {
    this._storage[this._newestIndex] = data;
    this._newestIndex++;
};
 
Queue.prototype.dequeue = function() {
    var oldestIndex = this._oldestIndex,
        newestIndex = this._newestIndex,
        deletedData;
 
    if (oldestIndex !== newestIndex) {
        deletedData = this._storage[oldestIndex];
        delete this._storage[oldestIndex];
        this._oldestIndex++;
 
        return deletedData;
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Queue</span></span>() {
    <span class="hljs-built_in">this</span>._oldestIndex = <span class="hljs-number">1</span>;
    <span class="hljs-built_in">this</span>._new<span class="hljs-type">estIndex</span> = <span class="hljs-number">1</span>;
    <span class="hljs-built_in">this</span>._storage = {};
}
 
Queue.prototype.size = <span class="hljs-function"><span class="hljs-keyword">function</span></span>() {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">this</span>._new<span class="hljs-type">estIndex</span> - <span class="hljs-built_in">this</span>._oldestIndex;
};
 
Queue.prototype.enqueue = <span class="hljs-function"><span class="hljs-keyword">function</span></span>(data) {
    <span class="hljs-built_in">this</span>._storage[<span class="hljs-built_in">this</span>._new<span class="hljs-type">estIndex</span>] = data;
    <span class="hljs-built_in">this</span>._new<span class="hljs-type">estIndex</span>++;
};
 
Queue.prototype.dequeue = <span class="hljs-function"><span class="hljs-keyword">function</span></span>() {
    <span class="hljs-keyword">var</span> oldestIndex = <span class="hljs-built_in">this</span>._oldestIndex,
        <span class="hljs-keyword">new</span><span class="hljs-type">estIndex</span> = <span class="hljs-built_in">this</span>._new<span class="hljs-type">estIndex</span>,
        deletedData;
 
    <span class="hljs-keyword">if</span> (oldestIndex !== <span class="hljs-keyword">new</span><span class="hljs-type">estIndex</span>) {
        deletedData = <span class="hljs-built_in">this</span>._storage[oldestIndex];
        delete <span class="hljs-built_in">this</span>._storage[oldestIndex];
        <span class="hljs-built_in">this</span>._oldestIndex++;
 
        <span class="hljs-keyword">return</span> deletedData;
    }
};</code></pre>
<h2 id="articleHeader9"><strong>结束语</strong></h2>
<p>在本文中，我们探讨了两个线性数据结构：栈和队列。栈按照顺序存储数据，并删除最后添加的数据；队列按顺序存储数据，但删除最先的添加数据。</p>
<p>如果这些数据结构的实现看起来微不足道，请提醒自己数据结构的用途。它们并没有被设计得过于复杂，它们是用来帮助我们组织数据的。在这种情况下，如果您发现有需要按顺序组织数据的场合，请考虑使用栈或队列。</p>
<p><strong>欢迎扫描二维码关注公众号，每天推送我翻译的技术文章。</strong><br><span class="img-wrap"><img data-src="/img/bVRyYe?w=430&amp;h=430" src="https://static.alili.tech/img/bVRyYe?w=430&amp;h=430" alt="欢迎扫描二维码关注公众号，每天推送我翻译的技术文章" title="欢迎扫描二维码关注公众号，每天推送我翻译的技术文章" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【译】JavaScript数据结构（2）：栈与队列

## 原文链接
[https://segmentfault.com/a/1190000010344706](https://segmentfault.com/a/1190000010344706)

