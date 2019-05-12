---
title: '《算法》第一章学习笔记js实现' 
date: 2018-12-28 2:30:11
hidden: true
slug: fmj1x7uyadw
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">《算法》第一章学习笔记js实现</h1>
<p><a href="https://github.com/xiyuyizhi/notes" rel="nofollow noreferrer" target="_blank">更多内容</a></p>
<p>目标：总结本书主要内容，相应算法使用js来模仿实现</p>
<blockquote>在计算机科学领域，我们用算法这个词来描述一种有限、确定、有效的并适合用计算机程序来实现的解决问题的方法。<p>我们关注的大多数算法都需要<code>适当地组织数据</code>，而为了组织数据就产生了<code>数据结构</code></p>
</blockquote>
<p><strong>原书所有代码是基于JAVA语法的，这里，我们使用js来实现所有算法逻辑</strong></p>
<h2 id="articleHeader1">队列、栈的实现</h2>
<blockquote>队列是一种先进先出的集合类型，栈是一种先进后出的集合类型</blockquote>
<p>首先定义要实现的队列、栈的API</p>
<table>
<thead><tr>
<th><strong>Queue</strong></th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td>Queue()</td>
<td>创建空队列</td>
</tr>
<tr>
<td>enqueue(item)</td>
<td>添加一个元素</td>
</tr>
<tr>
<td>dequeue()</td>
<td>删除最近添加的元素</td>
</tr>
<tr>
<td>isEmpty()</td>
<td>队列是否为空</td>
</tr>
<tr>
<td>size（）</td>
<td>队列中元素的数量</td>
</tr>
<tr>
<td>iterator()</td>
<td>返回一个可迭代对象</td>
</tr>
</tbody>
</table>
<hr>
<table>
<thead><tr>
<th><strong>Stack</strong></th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td>Stack()</td>
<td>创建空栈</td>
</tr>
<tr>
<td>push(item)</td>
<td>添加一个元素</td>
</tr>
<tr>
<td>pop()</td>
<td>删除最近添加的元素</td>
</tr>
<tr>
<td>isEmpty()</td>
<td>栈是否为空</td>
</tr>
<tr>
<td>size（）</td>
<td>栈中元素的数量</td>
</tr>
<tr>
<td>iterator()</td>
<td>返回一个可迭代对象</td>
</tr>
</tbody>
</table>
<hr>
<table>
<thead><tr>
<th>Iterator</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td>hasNext()</td>
<td>是否还有下一个元素</td>
</tr>
<tr>
<td>next()</td>
<td>返回下一个元素</td>
</tr>
</tbody>
</table>
<ul><li><h3 id="articleHeader2">数组方式</h3></li></ul>
<p>由于JS语言的特殊性，采用数组的方式来实现队列、栈是非常容易的,js中数组本来就提供了从头部插入、删除元素，从尾部插入、删除元素的功能。这里只需要简单的封装一下(js的弱类型特点，不需要像JAVA那样采用泛型来声明可以储存任意类型的数据，同时，js中数组是不定长的，可以动态扩展)</p>
<p><strong>实现</strong></p>
<p>队列的数组方式实现，并模拟可迭代功能</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Queue() {
    this.container = []
}
Queue.prototype.enqueue = function (ele) {
    this.container.push(ele)
}
Queue.prototype.dequeue = function () {
    return this.container.shift()
}
Queue.prototype.isEmpty = function () {
    return !this.container.length
}
Queue.prototype.size = function () {
    return this.container.length
}

Queue.prototype.iterator = function () {
    var container = this.container
    var current = 0
    return {
        hasNext: function () {
            return current !== container.length
        },
        next: function () {
            return container[current++]
        }
    }
}

用例:
var Qu = new Queue()
Qu.enqueue('to')
Qu.enqueue('be')
Qu.enqueue('or')
Qu.enqueue('not')
Qu.dequeue()
var iterator = Qu.iterator()
while (iterator.hasNext()) {
    console.log(iterator.next())
}
输出:
be
or
not
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Queue</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.container = []
}
Queue.prototype.enqueue = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">ele</span>) </span>{
    <span class="hljs-keyword">this</span>.container.push(ele)
}
Queue.prototype.dequeue = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.container.shift()
}
Queue.prototype.isEmpty = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> !<span class="hljs-keyword">this</span>.container.length
}
Queue.prototype.size = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.container.length
}

Queue.prototype.iterator = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> container = <span class="hljs-keyword">this</span>.container
    <span class="hljs-keyword">var</span> current = <span class="hljs-number">0</span>
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">hasNext</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> current !== container.length
        },
        <span class="hljs-attr">next</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> container[current++]
        }
    }
}

用例:
<span class="hljs-keyword">var</span> Qu = <span class="hljs-keyword">new</span> Queue()
Qu.enqueue(<span class="hljs-string">'to'</span>)
Qu.enqueue(<span class="hljs-string">'be'</span>)
Qu.enqueue(<span class="hljs-string">'or'</span>)
Qu.enqueue(<span class="hljs-string">'not'</span>)
Qu.dequeue()
<span class="hljs-keyword">var</span> iterator = Qu.iterator()
<span class="hljs-keyword">while</span> (iterator.hasNext()) {
    <span class="hljs-built_in">console</span>.log(iterator.next())
}
输出:
be
or
not
</code></pre>
<p>栈的数组方式实现，并模拟可迭代功能</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" class Stack {

    constructor() {
        this.container = []
    }

    push(ele) {
        this.container.unshift(ele)
    }

    pop() {
        return this.container.shift()
    }

    isEmpty() {
        return !this.container.length
    }
    size() {
        return this.container.length
    }

    iterator() {
        const container = this.container
        let current = 0
        return {
            hasNext: function () {
                return current !== container.length
            },
            next: function () {
                return container[current++]
            }
        }
    }

}
用例:
var St = new Stack()
Stack.push('to')
Stack.push('be')
Stack.push('or')
Stack.push('not')
Stack.pop()
var iterator = Stack.iterator()
while (iterator.hasNext()) {
    console.log(iterator.next())
}
输出:
or
be
to" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Stack</span> </span>{

    <span class="hljs-keyword">constructor</span>() {
        <span class="hljs-keyword">this</span>.container = []
    }

    push(ele) {
        <span class="hljs-keyword">this</span>.container.unshift(ele)
    }

    pop() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.container.shift()
    }

    isEmpty() {
        <span class="hljs-keyword">return</span> !<span class="hljs-keyword">this</span>.container.length
    }
    size() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.container.length
    }

    iterator() {
        const container = <span class="hljs-keyword">this</span>.container
        let current = <span class="hljs-number">0</span>
        <span class="hljs-keyword">return</span> {
            hasNext: function () {
                <span class="hljs-keyword">return</span> current !== container.length
            },
            next: function () {
                <span class="hljs-keyword">return</span> container[current++]
            }
        }
    }

}
用例:
<span class="hljs-keyword">var</span> St = new Stack()
Stack.push(<span class="hljs-string">'to'</span>)
Stack.push(<span class="hljs-string">'be'</span>)
Stack.push(<span class="hljs-string">'or'</span>)
Stack.push(<span class="hljs-string">'not'</span>)
Stack.pop()
<span class="hljs-keyword">var</span> iterator = Stack.iterator()
<span class="hljs-keyword">while</span> (iterator.hasNext()) {
    console.log(iterator.next())
}
输出:
or
be
to</code></pre>
<ul><li><h3 id="articleHeader3">链表方式实现</h3></li></ul>
<blockquote>链表是一种递归的数据结构，它或者为空(null)，或者是指向一个结点(node)的引用，该结点含有一个泛型的元素和一个指向另一个链表的引用。</blockquote>
<p>在这个定义中，结点是一个可能含有任意类型数据的抽象实体，它所包含的指向结点的应用显示了它在构造链表之中的作用。</p>
<p>结点表示:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function Node(){
        this.item=null
        this.next=null
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Node</span><span class="hljs-params">()</span></span>{
        <span class="hljs-keyword">this</span>.item=<span class="hljs-literal">null</span>
        <span class="hljs-keyword">this</span>.next=<span class="hljs-literal">null</span>
    }</code></pre>
<p>构造链表：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011577586?w=370&amp;h=500" src="https://static.alili.tech/img/remote/1460000011577586?w=370&amp;h=500" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>在表头插入结点</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var oldFirst=first
    first=new Node()
    first.next=oldFirst" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>    <span class="hljs-built_in">var</span> oldFirst=<span class="hljs-built_in">first</span>
    <span class="hljs-built_in">first</span>=<span class="hljs-built_in">new</span> Node()
    <span class="hljs-built_in">first</span>.next=oldFirst</code></pre>
<p>从表头删除结点</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    first=first.next" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code style="word-break: break-word; white-space: initial;">    <span class="hljs-built_in">first</span>=<span class="hljs-built_in">first</span>.<span class="hljs-built_in">next</span></code></pre>
<p>从表尾插入结点</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var oldlast=last
    lst=new Node()
    oldlast.next=last" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>    var <span class="hljs-attr">oldlast=</span>last
    <span class="hljs-attr">lst=</span>new <span class="hljs-keyword">Node</span><span class="hljs-title">()
    oldlast</span>.<span class="hljs-attr">next=</span>last</code></pre>
<blockquote>实现任意插入和删除操作的标准解决方案是双向链表，其中每个结点都含有两个链接，分别指向不同的方向</blockquote>
<ul><li>栈的链表实现</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
function Node(item) {
    this.item = item
    this.next = null
}

function Stack() {
    this.count = 0 //元素数量
    this.first = null //指向栈顶
}

Stack.prototype.isEmpty = function () {
    return this.first == null
}
Stack.prototype.size = function () {
    return this.count
}
Stack.prototype.push = function (ele) {
    var oldfirst = this.first
    var newnode = new Node(ele)
    newnode.next = oldfirst
    this.first = newnode
    this.count++
}
Stack.prototype.pop = function () {
    var ele = this.first.item
    this.first = this.first.next
    this.count--
    return ele
}
Stack.prototype.iterator = function () {
    var firstnode = this.first
    var count = this.count
    return {
        hasNext: function () {
            return  count
        },
        next: function () {
            var ele=firstnode.item
            firstnode=firstnode.next
            count--
            return ele
        }
    }
}
用例：
var stack=new Stack()
stack.push('to')
stack.push('be')
stack.push('or')
stack.push('not')
stack.push('to')
stack.push('be')
console.log(stack.size())
var iterator=stack.iterator()
while(iterator.hasNext()){
    console.log(iterator.next())
}
输出：
6
be
to
not
or
be
to" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>
function Node(item) {
    this<span class="hljs-selector-class">.item</span> = item
    this<span class="hljs-selector-class">.next</span> = null
}

function Stack() {
    this<span class="hljs-selector-class">.count</span> = <span class="hljs-number">0</span> <span class="hljs-comment">//元素数量</span>
    this<span class="hljs-selector-class">.first</span> = null <span class="hljs-comment">//指向栈顶</span>
}

Stack<span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.isEmpty</span> = function () {
    return this<span class="hljs-selector-class">.first</span> == null
}
Stack<span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.size</span> = function () {
    return this<span class="hljs-selector-class">.count</span>
}
Stack<span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.push</span> = function (ele) {
    <span class="hljs-selector-tag">var</span> oldfirst = this<span class="hljs-selector-class">.first</span>
    <span class="hljs-selector-tag">var</span> newnode = new Node(ele)
    newnode<span class="hljs-selector-class">.next</span> = oldfirst
    this<span class="hljs-selector-class">.first</span> = newnode
    this.count++
}
Stack<span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.pop</span> = function () {
    <span class="hljs-selector-tag">var</span> ele = this<span class="hljs-selector-class">.first</span><span class="hljs-selector-class">.item</span>
    this<span class="hljs-selector-class">.first</span> = this<span class="hljs-selector-class">.first</span><span class="hljs-selector-class">.next</span>
    this<span class="hljs-selector-class">.count--</span>
    return ele
}
Stack<span class="hljs-selector-class">.prototype</span><span class="hljs-selector-class">.iterator</span> = function () {
    <span class="hljs-selector-tag">var</span> firstnode = this<span class="hljs-selector-class">.first</span>
    <span class="hljs-selector-tag">var</span> count = this<span class="hljs-selector-class">.count</span>
    return {
        hasNext: function () {
            return  count
        },
        next: function () {
            <span class="hljs-selector-tag">var</span> ele=firstnode<span class="hljs-selector-class">.item</span>
            firstnode=firstnode<span class="hljs-selector-class">.next</span>
            count--
            return ele
        }
    }
}
用例：
<span class="hljs-selector-tag">var</span> stack=new Stack()
stack.push(<span class="hljs-string">'to'</span>)
stack.push(<span class="hljs-string">'be'</span>)
stack.push(<span class="hljs-string">'or'</span>)
stack.push(<span class="hljs-string">'not'</span>)
stack.push(<span class="hljs-string">'to'</span>)
stack.push(<span class="hljs-string">'be'</span>)
console.log(stack.size())
<span class="hljs-selector-tag">var</span> iterator=stack.iterator()
<span class="hljs-function"><span class="hljs-title">while</span><span class="hljs-params">(iterator.hasNext()</span></span>){
    console.log(iterator.next())
}
输出：
<span class="hljs-number">6</span>
be
to
not
or
be
to</code></pre>
<ul><li>队列的链表实现</li></ul>
<blockquote>将链表表示为一条从最早插入的元素到最近插入的元素的链表，实例变量first指向队列的开头，last指向队列的结尾。这样，要讲一个元素入列，就将它添加到表尾，要将一个元素出列，就删除表头的结点.</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Node(item) {
    this.item = item
    this.next = null
}

class Queue {

    constructor() {
        this.first = null
        this.last = null
        this.count = 0
    }

    isEmpty() {
        return this.first == null
    }
    size() {
        return this.count
    }
    enqueue(item) {
        const oldlast = this.last
        const last = new Node(item)
        this.last = last
        if (this.isEmpty()) {
            this.first = last
        } else {
            oldlast.next = last
        }
        this.count++
    }
    dequeue() {
        const ele = this.first.item
        this.first = this.first.next
        if (this.isEmpty()) {
            this.last = null
        }
        this.count--
        return ele
    }
    iterator() {
        let firstnode = this.first
        let count = this.count
        return {
            hasNext: function () {
                return count
            },
            next: function () {
                var ele = firstnode.item
                firstnode = firstnode.next
                count--
                return ele
            }
        }
    }
}
用例:
const queue=new Queue()
queue.enqueue('to')
queue.enqueue('be')
queue.enqueue('or')
queue.enqueue('not')
queue.enqueue('to')
queue.enqueue('be')
queue.dequeue()
console.log(queue.size())
const iterator=queue.iterator()
while(iterator.hasNext()){
    console.log(iterator.next())
}

输出:
5
be
or
not 
to
be" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>function Node(item) {
    <span class="hljs-keyword">this</span>.item = item
    <span class="hljs-keyword">this</span>.next = <span class="hljs-literal">null</span>
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Queue</span> </span>{

    <span class="hljs-keyword">constructor</span>() {
        <span class="hljs-keyword">this</span>.first = <span class="hljs-literal">null</span>
        <span class="hljs-keyword">this</span>.last = <span class="hljs-literal">null</span>
        <span class="hljs-keyword">this</span>.count = <span class="hljs-number">0</span>
    }

    isEmpty() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.first == <span class="hljs-literal">null</span>
    }
    size() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.count
    }
    enqueue(item) {
        const oldlast = <span class="hljs-keyword">this</span>.last
        const last = new Node(item)
        <span class="hljs-keyword">this</span>.last = last
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.isEmpty()) {
            <span class="hljs-keyword">this</span>.first = last
        } <span class="hljs-keyword">else</span> {
            oldlast.next = last
        }
        <span class="hljs-keyword">this</span>.count++
    }
    dequeue() {
        const ele = <span class="hljs-keyword">this</span>.first.item
        <span class="hljs-keyword">this</span>.first = <span class="hljs-keyword">this</span>.first.next
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.isEmpty()) {
            <span class="hljs-keyword">this</span>.last = <span class="hljs-literal">null</span>
        }
        <span class="hljs-keyword">this</span>.count--
        <span class="hljs-keyword">return</span> ele
    }
    iterator() {
        let firstnode = <span class="hljs-keyword">this</span>.first
        let count = <span class="hljs-keyword">this</span>.count
        <span class="hljs-keyword">return</span> {
            hasNext: function () {
                <span class="hljs-keyword">return</span> count
            },
            next: function () {
                <span class="hljs-keyword">var</span> ele = firstnode.item
                firstnode = firstnode.next
                count--
                <span class="hljs-keyword">return</span> ele
            }
        }
    }
}
用例:
const queue=new Queue()
queue.enqueue(<span class="hljs-string">'to'</span>)
queue.enqueue(<span class="hljs-string">'be'</span>)
queue.enqueue(<span class="hljs-string">'or'</span>)
queue.enqueue(<span class="hljs-string">'not'</span>)
queue.enqueue(<span class="hljs-string">'to'</span>)
queue.enqueue(<span class="hljs-string">'be'</span>)
queue.dequeue()
console.log(queue.size())
const iterator=queue.iterator()
<span class="hljs-keyword">while</span>(iterator.hasNext()){
    console.log(iterator.next())
}

输出:
<span class="hljs-number">5</span>
be
or
not 
to
be</code></pre>
<blockquote>在结构化存储数据集时，链表是数组的一种重要的替代方式，两者都非常基础，常常被称为顺序存储和链式存储。</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011577587?w=1852&amp;h=334" src="https://static.alili.tech/img/remote/1460000011577587?w=1852&amp;h=334" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">常见的时间复杂度的级别</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011577588?w=577&amp;h=400" src="https://static.alili.tech/img/remote/1460000011577588?w=577&amp;h=400" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<ul><li><h3 id="articleHeader5">threeSum问题分析</h3></li></ul>
<p>问题描述：</p>
<blockquote>假设所有整数都不相同，统计一个数组中所有和为0的三整数元组的数量</blockquote>
<ul><li>最基本的实现,暴力算法</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function threesum(arr){
    var N=arr.length
    var count=0
    for(var i=0;i<N;i++){
        for(var j=i+1;j<N;j++){
            for(var k=j+1;k<N;k++){
                if(arr[i]+arr[j]+arr[k]==0){
                    count++
                }
            }
        }
    }
    return count
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>function threesum(arr){
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">N</span>=arr.<span class="hljs-built_in">length</span>
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">count</span>=0
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=0;i&lt;<span class="hljs-keyword">N</span>;i++){
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> j=i+1;j&lt;<span class="hljs-keyword">N</span>;j++){
            <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> k=j+1;k&lt;<span class="hljs-keyword">N</span>;k++){
                <span class="hljs-keyword">if</span>(arr[i]+arr[j]+arr[k]==0){
                    <span class="hljs-keyword">count</span>++
                }
            }
        }
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">count</span>
}
</code></pre>
<p>分析：</p>
<p>执行最频繁的指令决定了程序执行的总时间，对上面的threesum算法，最频繁的部分就是if语句判断，它套在三个for循环内，对于给定的N，if语句执行次数为<code>N*(N-1)*(N-2)/6=N^3/6-N^2/2+N/3</code>,当N很大时，首项后的其他项都相对较小可以忽略，所以if语句的执行次数约等于<code>N^3/6</code>,表示为(~N^3/6)</p>
<p>所以暴力算法的threesum执行用时的增长数量级为<code>N^3</code></p>
<ul><li>优化</li></ul>
<blockquote>学习程序的增长数量级的一个重要动力是为了帮助我们为同一个问题设计更快的算法</blockquote>
<p>改进后的算法的思路是：当且仅当-( a[i]+a[j] )在数组中( 不是a[i]也不是a[j] )时,整数对( a[i]和a[j] )为某个和为0的三元组的一部分。要解决这个问题，首先对数组进行排序(为二分查找做准备),然后对数组中的每个a[i]+a[j],使用二分查找算法对-(a[i]+a[j])进行二分查找，如果结果为k，且k&gt;j,则count加一。</p>
<p>下面中的代码会将数组排序并进行N*(N-1)/2次二分查找，每次查找所需的时间都和logN成正比，因此总的运行时间和N^2logN成正比。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//二分查找
function binarySearch(key, arr) {
    var start = 0
    var end = arr.length - 1
    while (start <= end) {
        var mid = start + Math.floor((end - start) / 2)
        if (key < arr[mid]) {
            end = mid - 1
        } else if (key > arr[mid]) {
            start = mid + 1
        } else {
            return mid
        }
    }
    return -1
}

function threesum(arr) {
    var N = arr.length
    var count = 0
    arr = arr.sort(function (a, b) {
        return a > b ? 1 : -1
    })
    for (var i = 0; i < N; i++) {
        for (var j = i + 1; j < N; j++) {
            if (binarySearch(-arr[i] - arr[j], arr) > j) {
                count++
            }
        }
    }
    return count
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//二分查找</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">binarySearch</span>(<span class="hljs-params">key, arr</span>) </span>{
    <span class="hljs-keyword">var</span> start = <span class="hljs-number">0</span>
    <span class="hljs-keyword">var</span> end = arr.length - <span class="hljs-number">1</span>
    <span class="hljs-keyword">while</span> (start &lt;= end) {
        <span class="hljs-keyword">var</span> mid = start + <span class="hljs-built_in">Math</span>.floor((end - start) / <span class="hljs-number">2</span>)
        <span class="hljs-keyword">if</span> (key &lt; arr[mid]) {
            end = mid - <span class="hljs-number">1</span>
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (key &gt; arr[mid]) {
            start = mid + <span class="hljs-number">1</span>
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">return</span> mid
        }
    }
    <span class="hljs-keyword">return</span> <span class="hljs-number">-1</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">threesum</span>(<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-keyword">var</span> N = arr.length
    <span class="hljs-keyword">var</span> count = <span class="hljs-number">0</span>
    arr = arr.sort(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">a, b</span>) </span>{
        <span class="hljs-keyword">return</span> a &gt; b ? <span class="hljs-number">1</span> : <span class="hljs-number">-1</span>
    })
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; N; i++) {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = i + <span class="hljs-number">1</span>; j &lt; N; j++) {
            <span class="hljs-keyword">if</span> (binarySearch(-arr[i] - arr[j], arr) &gt; j) {
                count++
            }
        }
    }
    <span class="hljs-keyword">return</span> count
}</code></pre>
<ul><li>增长数量级的分类</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011577589?w=1822&amp;h=1064" src="https://static.alili.tech/img/remote/1460000011577589?w=1822&amp;h=1064" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader6">案例研究:union-find算法</h2>
<h3 id="articleHeader7">动态连通性问题</h3>
<p>首先我们详细说明一下问题</p>
<blockquote>问题的输入是一列整数对，对于一对整数p,q,如果p,q不相连，则将p,q连接</blockquote>
<p>所谓的相连:</p>
<ul>
<li>[x] 自反性: p与p是相连的</li>
<li>[x] 对称性: 若p与q是相连的,则q与p是相连的</li>
<li>[x] 传递性: 若p与q是相连的,且q和r相连，则p与r是相连的</li>
</ul>
<p>我们假设相连的整数构成了一个“集合”,对于新的连接，就是在将新的元素加入“集合”来构成更大的“集合”,若判断p,q是否相连，只要判断p,q是否在同一个“集合”中即可。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011577590?w=146&amp;h=300" src="https://static.alili.tech/img/remote/1460000011577590?w=146&amp;h=300" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote>这里我们应用动态连通性来处理计算机网络中的主机之间的连通关系<p>输入中的整数表示的可能是一个大型计算机网络中的计算机，而整数对则表示网络中的连接，这个程序能够判定我们是否需要在p和q之间架设一条新的连接来通信，或是我们可以通过已有的连接在两者之间建立通信线路。</p>
</blockquote>
<p>这里我们使用网络方面的术语，将<code>输入的整数</code>称为<code>触点</code>，将形成的<code>集合</code>称为<code>连通分量</code></p>
<h3 id="articleHeader8">分析</h3>
<p>为了说明问题，我们设计一份API来封装所需的基本操作:初始化、连接两个触点、判断包含某个触点的分量、判断两个触点是否存在于同一个分量之中以及返回所有分量的数量</p>
<table>
<thead><tr>
<th>UF</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td>UF(N)</td>
<td>以整数标识（0到N-1）初始化N个触点</td>
</tr>
<tr>
<td>union(p,q)</td>
<td>连接触点p、q</td>
</tr>
<tr>
<td>find(p)</td>
<td>返回p所在分量的标识符</td>
</tr>
<tr>
<td>connected(p,q)</td>
<td>判断p,q是否存在于同一个连通分量中</td>
</tr>
<tr>
<td>count()</td>
<td>连通分量的数量</td>
</tr>
</tbody>
</table>
<p><strong>我们看到，为解决动态连通性问题设计算法的任务转化成了实现这份API，所有的实现都应该</strong></p>
<p>[x] 定义一种数据结构表示已知的连接</p>
<p>[x] 基于此数据结构实现高效的union()、find()、connected()、count()</p>
<p><strong>我们用一个以触点为索引的数组id[]作为基本数据结构来表示所有分量，我们将使用分量中的某个触点的名称作为分量的标识符</strong></p>
<p>一开始，我们有N个分量，每个触点都构成了一个只含有自己的分量，因此我们将id[i]的值设为i。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class UF {

    /**
     * 
     * @param {number} N 
     */
    constructor(N) {
        this.id = new Array(N).fill(0).map((x, index) => index)
        this.count = 0
    }

    count(){
        return this.count
    }

    /**
     * 
     * @param {number} p 
     * @param {number} q 
     */
    connected(p,q){
        return this.find(p)===this.find(q)
    }

    /** 
     * @param {number} p 
     */
    find(p){

    }
    /**
     * 
     * @param {number} p 
     * @param {number} q 
     */
    union(p,q){

    }

}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">UF</span> </span>{

    <span class="hljs-comment">/**
     * 
     * <span class="hljs-doctag">@param</span> {number} N 
     */</span>
    <span class="hljs-keyword">constructor</span>(N) {
        <span class="hljs-keyword">this</span>.id = new Array(N).fill(<span class="hljs-number">0</span>).map((x, index) =&gt; index)
        <span class="hljs-keyword">this</span>.count = <span class="hljs-number">0</span>
    }

    count(){
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.count
    }

    <span class="hljs-comment">/**
     * 
     * <span class="hljs-doctag">@param</span> {number} p 
     * <span class="hljs-doctag">@param</span> {number} q 
     */</span>
    connected(p,q){
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.find(p)===<span class="hljs-keyword">this</span>.find(q)
    }

    <span class="hljs-comment">/** 
     * <span class="hljs-doctag">@param</span> {number} p 
     */</span>
    find(p){

    }
    <span class="hljs-comment">/**
     * 
     * <span class="hljs-doctag">@param</span> {number} p 
     * <span class="hljs-doctag">@param</span> {number} q 
     */</span>
    union(p,q){

    }

}
</code></pre>
<p><strong>find()和union()是实现的重点,我们将讨论三种不同的实现，它们均根据以触点为索引的id[]数组来确定两个触点是否存在于相同的连通分量中</strong></p>
<h3 id="articleHeader9">实现</h3>
<ul><li>quick-find算法</li></ul>
<p>思想是:保证当且仅当<code>id[p]==id[q]</code>时，p和q是连通的。换句话说，在同一个连通分量中的所有触点在id[]数组中的值都一样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    /** 
     * @param {number} p 
     */
    find(p){
        return this.id[p]
    }

    /**
     * 
     * @param {number} p 
     * @param {number} q 
     */
    union(p,q){
        var pId=this.find(p)
        var qId=this.find(q)
        if(pId==qId) return
        this.id.forEach(x=>{
            if(id[x]==pId){
                id[x]==qId
            }
        })
        this.count--
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>    <span class="hljs-comment">/** 
     * <span class="hljs-doctag">@param</span> {number} p 
     */</span>
    find(p){
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.id[p]
    }

    <span class="hljs-comment">/**
     * 
     * <span class="hljs-doctag">@param</span> {number} p 
     * <span class="hljs-doctag">@param</span> {number} q 
     */</span>
    union(p,q){
        <span class="hljs-keyword">var</span> pId=<span class="hljs-keyword">this</span>.find(p)
        <span class="hljs-keyword">var</span> qId=<span class="hljs-keyword">this</span>.find(q)
        <span class="hljs-keyword">if</span>(pId==qId) <span class="hljs-keyword">return</span>
        <span class="hljs-keyword">this</span>.id.forEach(x=&gt;{
            <span class="hljs-keyword">if</span>(id[x]==pId){
                id[x]==qId
            }
        })
        <span class="hljs-keyword">this</span>.count--
    }</code></pre>
<p>复杂度分析:</p>
<p>find()操作很快，它只访问id[]数组一次,但union()会整个扫描id[]数组</p>
<p>在union()中,find p、q会访问2次数组，for循环及赋值操作会访问数组 N+1 ~ N+（N-1）次。</p>
<p>所以union()方法访问数组的次数在(2+N+1) ~(2+N+(N-1)) 即 N+3 ~ 2N+1 次之间</p>
<p>假设我们使用quick-union算法来解决动态连通性问题并最后只得到一个连通分量，则至少需要调用(N-1)次 union(),<br>即（N+3）<em>（N-1） ~（2N+1）</em>（N-1）次数组访问</p>
<p>所以此算法的时间复杂度是<code>平方级别的</code></p>
<ul><li>quick-union算法</li></ul>
<p>此算法的重点是提高union()方法的速度，它也是基于相同的数据结构--以触点作为索引的id[]数组，但我们赋予这些值的意义不同，我们需要用他们来定义更加复杂的数据结构:</p>
<blockquote>每个触点所对应的id[]元素都是同一个分量中的另一个触点的名称（也可以说是它自己，即根触点）--我们将这种联系称为链接。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    /** 
     * 找到根触点，即分量的标识符
     * @param {number} p 
     */
    find(p) {
        while (p !== this.id[p]) p = this.id[p]
        return p
    }

    /**
     * 
     * @param {number} p 
     * @param {number} q 
     */
    union(p, q) {
        let pRoot = this.find(p)
        let qRoot = this.find(q)
        if (pRoot == qRoot) return
        id[pRoot] = qRoot
        this.count--
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>    <span class="hljs-comment">/** 
     * 找到根触点，即分量的标识符
     * <span class="hljs-doctag">@param</span> {number} p 
     */</span>
    find(p) {
        <span class="hljs-keyword">while</span> (p !== <span class="hljs-keyword">this</span>.id[p]) p = <span class="hljs-keyword">this</span>.id[p]
        <span class="hljs-keyword">return</span> p
    }

    <span class="hljs-comment">/**
     * 
     * <span class="hljs-doctag">@param</span> {number} p 
     * <span class="hljs-doctag">@param</span> {number} q 
     */</span>
    union(p, q) {
        let pRoot = <span class="hljs-keyword">this</span>.find(p)
        let qRoot = <span class="hljs-keyword">this</span>.find(q)
        <span class="hljs-keyword">if</span> (pRoot == qRoot) <span class="hljs-keyword">return</span>
        id[pRoot] = qRoot
        <span class="hljs-keyword">this</span>.count--
    }</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011577591?w=588&amp;h=400" src="https://static.alili.tech/img/remote/1460000011577591?w=588&amp;h=400" alt="" title="" style="cursor: pointer;"></span></p>
<p>如图所示：id[]数组用父链接的形式表示了一片森林</p>
<p>复杂度分析：</p>
<blockquote>一棵树的大小是它的节点的数量，树中一个节点的深度是它到根节点路径上的链接数</blockquote>
<p>quick-union算法的分析依赖于输入的特点，find()访问数组的次数为1加上给定的触点所对应的节点的深度的2倍。</p>
<p>在最好的情况下，find()只需要访问数组1次就能够得到当前触点所在分量的标识符</p>
<p>在最坏的情况下，find()需要1 + 2*(N-1) 即 2N-1 次数组访问</p>
<p>如下图所示</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011577592?w=446&amp;h=400" src="https://static.alili.tech/img/remote/1460000011577592?w=446&amp;h=400" alt="" title="" style="cursor: pointer;"></span></p>
<p>对最坏的情况，处理N对整数所需的所有find()操作访问数组的总次数为:</p>
<p>等差数列 (1+ 2N-1) *N /2 = N^2,即<code>在最差的情况下，quick-union算的复杂度为平方级的</code></p>
<p>union()访问数组的次数是两次find()操作，(如果union中给定的两个触点在不同的分量还要加1)</p>
<p>由此，我们构造了一个最佳情况的输入使得算法的运行时间是线性的，最差情况的输入使得算法的运行时间是平方级的。</p>
<ul><li>加权 quick-union算法 (控制树的深度)</li></ul>
<blockquote>与其在union()中随意将一颗树连接到另一棵树，我们现在会记录每一颗树的大小并总是将较小的树连接到较大的树上。</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011577593?w=588&amp;h=400" src="https://static.alili.tech/img/remote/1460000011577593?w=588&amp;h=400" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class UF {

    /**
     * 
     * @param {number} N 
     */
    constructor(N) {
        this.id = new Array(N).fill(0).map((x, index) => index)
        //各个根节点所对应的分量的大小
        this.sz = new Array(N).fill(1)
        this.count = 0
    }

    count() {
        return this.count
    }

    /**
     * 
     * @param {number} p 
     * @param {number} q 
     */
    connected(p, q) {
        return this.find(p) === this.find(q)
    }

    /** 
     * 找到根触点，即分量的标识符
     * @param {number} p 
     */
    find(p) {
        while (p !== this.id[p]) p = this.id[p]
        return p
    }
    /**
     * 
     * @param {number} p 
     * @param {number} q 
     */
    union(p, q) {
        let pRoot = this.find(p)
        let qRoot = this.find(q)
        if (pRoot == qRoot) return
        //将小树连接到大树上
        if (sz[pRoot] < sz[qRoot]) {
            id[p] = qRoot
            sz[qRoot] += sz[pRoot]
        } else {
            id[q] = pRoot
            sz[pRoot] += sz[qRoot]
        }
        this.count--
    }

}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">UF</span> </span>{

    <span class="hljs-comment">/**
     * 
     * <span class="hljs-doctag">@param</span> {number} N 
     */</span>
    <span class="hljs-keyword">constructor</span>(N) {
        <span class="hljs-keyword">this</span>.id = new Array(N).fill(<span class="hljs-number">0</span>).map((x, index) =&gt; index)
        <span class="hljs-comment">//各个根节点所对应的分量的大小</span>
        <span class="hljs-keyword">this</span>.sz = new Array(N).fill(<span class="hljs-number">1</span>)
        <span class="hljs-keyword">this</span>.count = <span class="hljs-number">0</span>
    }

    count() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.count
    }

    <span class="hljs-comment">/**
     * 
     * <span class="hljs-doctag">@param</span> {number} p 
     * <span class="hljs-doctag">@param</span> {number} q 
     */</span>
    connected(p, q) {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.find(p) === <span class="hljs-keyword">this</span>.find(q)
    }

    <span class="hljs-comment">/** 
     * 找到根触点，即分量的标识符
     * <span class="hljs-doctag">@param</span> {number} p 
     */</span>
    find(p) {
        <span class="hljs-keyword">while</span> (p !== <span class="hljs-keyword">this</span>.id[p]) p = <span class="hljs-keyword">this</span>.id[p]
        <span class="hljs-keyword">return</span> p
    }
    <span class="hljs-comment">/**
     * 
     * <span class="hljs-doctag">@param</span> {number} p 
     * <span class="hljs-doctag">@param</span> {number} q 
     */</span>
    union(p, q) {
        let pRoot = <span class="hljs-keyword">this</span>.find(p)
        let qRoot = <span class="hljs-keyword">this</span>.find(q)
        <span class="hljs-keyword">if</span> (pRoot == qRoot) <span class="hljs-keyword">return</span>
        <span class="hljs-comment">//将小树连接到大树上</span>
        <span class="hljs-keyword">if</span> (sz[pRoot] &lt; sz[qRoot]) {
            id[p] = qRoot
            sz[qRoot] += sz[pRoot]
        } <span class="hljs-keyword">else</span> {
            id[q] = pRoot
            sz[pRoot] += sz[qRoot]
        }
        <span class="hljs-keyword">this</span>.count--
    }

}
</code></pre>
<p>复杂度分析：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011577594?w=271&amp;h=400" src="https://static.alili.tech/img/remote/1460000011577594?w=271&amp;h=400" alt="" title="" style="cursor: pointer;"></span></p>
<p>如图所示，在最坏的情况下，其中将要被归并的树的大小总是相等的，它们均含有2^n个节点（树的高度为n）,当我们归并两个2^n个节点的树时，得到的树的高度增加到n+1。</p>
<p>对于加权quick-union算法和N个触点，在最坏的情况下，find() union()的运行时间的增长数量级为logN</p>
<blockquote>加权quick-union算法处理N个触点和M条连接时最多访问数组cMlgN次，这与quick-find需要MN形成了鲜明对比</blockquote>
<h3 id="articleHeader10">总结</h3>
<p>通过《算法》第一章我学习了</p>
<ul>
<li>[x] 基本的数据类型栈、队列</li>
<li>[x] 通过数组、链表来构造队列和栈</li>
<li>[x] 数组和链表是两种基本的数据结构</li>
<li>[x] 时间复杂度的分析和常见的复杂度增长数量级</li>
<li>[x] 二分查找算法</li>
<li>[x] 对一个问题寻求解决方案时，要确定好基本的数据结构，好的数据结构是构造高效算法的前提</li>
<li>[x] 动态连通性问题</li>
<li>[x] 动态连通性问题的解决方案，并不断优化算法</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
《算法》第一章学习笔记js实现

## 原文链接
[https://segmentfault.com/a/1190000011577583](https://segmentfault.com/a/1190000011577583)

