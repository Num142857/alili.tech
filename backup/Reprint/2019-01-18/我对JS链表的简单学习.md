---
title: '我对JS链表的简单学习' 
date: 2019-01-18 2:30:35
hidden: true
slug: 3fygxq56cul
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">我对JS链表的学习</h2>
<h3 id="articleHeader1">什么是链表</h3>
<p>要存储多个元素，数组可能是最常用的数据结构。这种数据结构非常方便，但是有一个缺点：从数组的起点或者中间插入或移除项的成本非常高，因为需要移动元素（比如你插入一个元素后面的所有的元素都移动了“位置”）。</p>
<p>链表存储有序的元素集合，但是不同于数组，<em>链表中的元素在内存中并不是连续放置的</em>。每个元素都是由一个存储元素本身的节点和一个指向下一元素的引用（也叫指针或者链接）组成。</p>
<p><span class="img-wrap"><img data-src="http://img2016.itdadao.com/d/file/tech/2016/10/01/cd3415631011009111.png" src="https://static.alili.techhttp://img2016.itdadao.com/d/file/tech/2016/10/01/cd3415631011009111.png" alt="单向链表示意图" title="单向链表示意图" style="cursor: pointer;"></span></p>
<p>相比于数组来说，链表的好处在于添加或者删除元素的时候不需要移动其他元素。但是操作链表需要使用指针。数组的一个优点是可以直接访问任何位置的任何元素，但是要是想访问链表中的某一元素，则是必须从起点开始迭代直到找到目标元素。</p>
<h3 id="articleHeader2">链表的学习</h3>
<p>创建一个链表</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function LinkedList() {
    var Node = function(element) {
        this.element = element;
        this.next = null;
    }

    //各种方法
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">LinkedList</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> Node = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">element</span>) </span>{
        <span class="hljs-keyword">this</span>.element = element;
        <span class="hljs-keyword">this</span>.next = <span class="hljs-literal">null</span>;
    }

    <span class="hljs-comment">//各种方法</span>
}</code></pre>
<p>Node表示要加入列表的项，它包含一个element属性以及一个next属性，element表示要添加到列表的值，next表示指向列表下一个节点项的指针。</p>
<p><strong>当一个Node元素被创建时，它的next指针总是null</strong></p>
<ul><li><p>向链表尾部追加元素</p></li></ul>
<p>列表为空，添加的是第一个元素。列表不为空，向其追加元素。</p>
<p><strong>要循环访问列表中的所有元素，就需要有一个起点，就是head</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.append = function(element) {
    var node = new Node(element), //传入值创建Node项
        current;

    if(head === null) { //如果为空链表
        head = node; //设置node为head（head为第一个节点的引用）
    } else {
        current = head; //从表头开始
        while(current.next) { 
            //循环列表，找到最后一项（列表最后一个节点的下一个元素始终是null）
            current = current.next;
        }
        //使当前最后一项的指针指向node
        current.next = node;
    }
    length++; //更新列表长度
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">this</span>.append = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">element</span>) </span>{
    <span class="hljs-keyword">var</span> node = <span class="hljs-keyword">new</span> Node(element), <span class="hljs-comment">//传入值创建Node项</span>
        current;

    <span class="hljs-keyword">if</span>(head === <span class="hljs-literal">null</span>) { <span class="hljs-comment">//如果为空链表</span>
        head = node; <span class="hljs-comment">//设置node为head（head为第一个节点的引用）</span>
    } <span class="hljs-keyword">else</span> {
        current = head; <span class="hljs-comment">//从表头开始</span>
        <span class="hljs-keyword">while</span>(current.next) { 
            <span class="hljs-comment">//循环列表，找到最后一项（列表最后一个节点的下一个元素始终是null）</span>
            current = current.next;
        }
        <span class="hljs-comment">//使当前最后一项的指针指向node</span>
        current.next = node;
    }
    length++; <span class="hljs-comment">//更新列表长度</span>
};</code></pre>
<p>使用append</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var list = new LinkedList();
list.append(15);
list.append(10);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> <span class="hljs-keyword">list</span> = new LinkedList();
<span class="hljs-keyword">list</span>.<span class="hljs-keyword">append</span>(15);
<span class="hljs-keyword">list</span>.<span class="hljs-keyword">append</span>(10);</code></pre>
<ul><li><p>从链表移除元素</p></li></ul>
<p>输入位置，从特定位置移除一个元素</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.removeAt = function(position) {
    if(position > -1 &amp;&amp; position < length) { //有效性检测
        var current = head, //用current来循环列表
        previous,
        index = 0;

        if(position === 0) {
            head = current.next; //移除第一个元素，直接把head指向下一个元素
        } else {
            while(index++ < position) { //循环列表找到满足条件的那个元素
                previous = current; //
                current = current.next; //把下一个变量覆给current
            }
            //跳过current，将当前要移除的元素的上一个与下一项直接连接起来。
            previous.next = current.next;
        }
        length --;
        return current.element;
    } else {
        return null;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">this</span>.removeAt = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">position</span>) </span>{
    <span class="hljs-keyword">if</span>(position &gt; <span class="hljs-number">-1</span> &amp;&amp; position &lt; length) { <span class="hljs-comment">//有效性检测</span>
        <span class="hljs-keyword">var</span> current = head, <span class="hljs-comment">//用current来循环列表</span>
        previous,
        index = <span class="hljs-number">0</span>;

        <span class="hljs-keyword">if</span>(position === <span class="hljs-number">0</span>) {
            head = current.next; <span class="hljs-comment">//移除第一个元素，直接把head指向下一个元素</span>
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">while</span>(index++ <span class="xml"><span class="hljs-tag">&lt; <span class="hljs-attr">position</span>) { //循环列表找到满足条件的那个元素
                <span class="hljs-attr">previous</span> = <span class="hljs-string">current;</span> //
                <span class="hljs-attr">current</span> = <span class="hljs-string">current.next;</span> //把下一个变量覆给<span class="hljs-attr">current</span>
            }
            //跳过<span class="hljs-attr">current</span>，将当前要移除的元素的上一个与下一项直接连接起来。
            <span class="hljs-attr">previous.next</span> = <span class="hljs-string">current.next;</span>
        }
        <span class="hljs-attr">length</span> <span class="hljs-attr">--</span>;
        <span class="hljs-attr">return</span> <span class="hljs-attr">current.element</span>;
    } <span class="hljs-attr">else</span> {
        <span class="hljs-attr">return</span> <span class="hljs-attr">null</span>;
    }
}</span></span></code></pre>
<p>在任意位置插入一个元素</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.insert = function (position, element) {
    if(position >= 0 &amp;&amp; position <= length) {
        var node = new Node(element),
            current = head; //通过current从head位置开始迭代
            previous,
            index = 0;

        if(position === 0) { //第一个位置
            node.next = current; //此时current = head,指向head那么node就成了第一个
            head = node; //node指向为head
        } else {
            while (index++ < position ) { //循环迭代到目标位置
                previous = current; 
                current = current.next;
            }

            node.next = current; // node的下一个为current
            previous.next = node; // node的上一个位置为previous
        }
        length++;
        return true;
    } else {
        return false;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">this</span>.insert = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">position, element</span>) </span>{
    <span class="hljs-keyword">if</span>(position &gt;= <span class="hljs-number">0</span> &amp;&amp; position &lt;= length) {
        <span class="hljs-keyword">var</span> node = <span class="hljs-keyword">new</span> Node(element),
            current = head; <span class="hljs-comment">//通过current从head位置开始迭代</span>
            previous,
            index = <span class="hljs-number">0</span>;

        <span class="hljs-keyword">if</span>(position === <span class="hljs-number">0</span>) { <span class="hljs-comment">//第一个位置</span>
            node.next = current; <span class="hljs-comment">//此时current = head,指向head那么node就成了第一个</span>
            head = node; <span class="hljs-comment">//node指向为head</span>
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">while</span> (index++ <span class="xml"><span class="hljs-tag">&lt; <span class="hljs-attr">position</span> ) { //循环迭代到目标位置
                <span class="hljs-attr">previous</span> = <span class="hljs-string">current;</span> 
                <span class="hljs-attr">current</span> = <span class="hljs-string">current.next;</span>
            }

            <span class="hljs-attr">node.next</span> = <span class="hljs-string">current;</span> // <span class="hljs-attr">node</span>的下一个为<span class="hljs-attr">current</span>
            <span class="hljs-attr">previous.next</span> = <span class="hljs-string">node;</span> // <span class="hljs-attr">node</span>的上一个位置为<span class="hljs-attr">previous</span>
        }
        <span class="hljs-attr">length</span>++;
        <span class="hljs-attr">return</span> <span class="hljs-attr">true</span>;
    } <span class="hljs-attr">else</span> {
        <span class="hljs-attr">return</span> <span class="hljs-attr">false</span>;
    }
}</span></span></code></pre>
<p>把LinkedList对象转换成一个字符串。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.toString = function() {
    var current = head,
        string = '';
    while(current) { //循环访问列表
        string += current.element + (current.next ? '\n' : '');
        current = current.next;
    }
    return string; //返回字符串
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">this</span>.toString = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> current = head,
        string = <span class="hljs-string">''</span>;
    <span class="hljs-keyword">while</span>(current) { <span class="hljs-comment">//循环访问列表</span>
        string += current.element + (current.next ? <span class="hljs-string">'\n'</span> : <span class="hljs-string">''</span>);
        current = current.next;
    }
    <span class="hljs-keyword">return</span> string; <span class="hljs-comment">//返回字符串</span>
}</code></pre>
<p>返回元素的位置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.indexOf = function(element) {
    var current = head,
        index = 0;
    while(current) {
        if(element === current.element) {
            return index; //找到返回当前位置
        }
        index ++;
        current = current.next;
    }
    return -1;    //找不到返回-1
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">this</span>.indexOf = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">element</span>) </span>{
    <span class="hljs-keyword">var</span> current = head,
        index = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">while</span>(current) {
        <span class="hljs-keyword">if</span>(element === current.element) {
            <span class="hljs-keyword">return</span> index; <span class="hljs-comment">//找到返回当前位置</span>
        }
        index ++;
        current = current.next;
    }
    <span class="hljs-keyword">return</span> <span class="hljs-number">-1</span>;    <span class="hljs-comment">//找不到返回-1</span>
}</code></pre>
<p>输入元素，移除该元素</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.remove = function(element) {
    var index = this.indexOf(element); //得到元素的位置
    return this.removeAt(index); //移除该元素
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">this</span>.remove = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">element</span>) </span>{
    <span class="hljs-keyword">var</span> index = <span class="hljs-keyword">this</span>.indexOf(element); <span class="hljs-comment">//得到元素的位置</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.removeAt(index); <span class="hljs-comment">//移除该元素</span>
}</code></pre>
<p>判断是否为空 得到长度 得到第一个元素</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.isEmpty = function () {
    return length === 0;
}

this.size = function () {
    return length;
}

this.getHead = function () {
    return head;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">this</span>.isEmpty = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> length === <span class="hljs-number">0</span>;
}

<span class="hljs-keyword">this</span>.size = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> length;
}

<span class="hljs-keyword">this</span>.getHead = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> head;
}</code></pre>
<h3 id="articleHeader3">双向链表</h3>
<ul><li><p>他和普通链表的区别，在双向链表中，链接是双向的，一个链向下一个元素一个链向上一个元素。在操作双向链表的时候既要像普通链表一样考虑next，也要考虑prev。</p></li></ul>
<p>双向列表提供了两种迭代列表的方法：从头到尾迭代，或者反过来。</p>
<p><span class="img-wrap"><img data-src="http://images.cnitblog.com/i/569008/201406/191710073648852.jpg" src="https://static.alili.techhttp://images.cnitblog.com/i/569008/201406/191710073648852.jpg" alt="" title="" style="cursor: pointer;"></span></p>
<ul><li><p>创建一个双向列表</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function DoublyLinkedList() {
    var Node = function(element) {
        this.element = element;
        this.next = null;
        this.prev = null; //新指针
    };
    
    var length = 0;
    var head = null;
    var tail = null; //对列表最后一项的引用
    
    //各种方法
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">DoublyLinkedList</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">var</span> Node = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(element)</span> </span>{
        <span class="hljs-keyword">this</span>.element = element;
        <span class="hljs-keyword">this</span>.next = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">this</span>.prev = <span class="hljs-literal">null</span>; <span class="hljs-comment">//新指针</span>
    };
    
    <span class="hljs-keyword">var</span> length = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">var</span> head = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">var</span> tail = <span class="hljs-literal">null</span>; <span class="hljs-comment">//对列表最后一项的引用</span>
    
    <span class="hljs-comment">//各种方法</span>
}</code></pre>
<ul><li><p>在任意位置插入一个新元素</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.insert = function(position, element) {
    if(position >= 0 &amp;&amp; position <= length) {
        var node = new Node(element),
            current = head,
            previous,
            index = 0;
            
        if(position === 0) { //在第一个位置添加
            if(!head) { //如果head不存在即链表为空
                head = node;
                tail = node;
            } else { //链表不为空
                node.next = current;
                current.prev = node;
                head = node;
            }
        } else if(position === length) { //在最后一个位置添加
            current = tail;
            current.next = node;
            node.prev = current;
            tail = node;
        } else {
            while(index++ < position) { //在列表中间添加
                previous = current; //循环迭代
                current = current.next;
            }
            node.next = current;
            previous.next = node;
            
            current.prev = node;
            node.prev = previous;
        }
        length ++; //更新列表长度
        
        return true;
    } else {
        return false;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-keyword">this</span>.insert = function(position, element) {
    <span class="hljs-keyword">if</span>(position &gt;= <span class="hljs-number">0</span> &amp;&amp; position &lt;= length) {
        var node = <span class="hljs-keyword">new</span> Node(element),
            current = head,
            <span class="hljs-keyword">previous</span>,
            index = <span class="hljs-number">0</span>;
            
        <span class="hljs-keyword">if</span>(position === <span class="hljs-number">0</span>) { <span class="hljs-comment">//在第一个位置添加</span>
            <span class="hljs-keyword">if</span>(!head) { <span class="hljs-comment">//如果head不存在即链表为空</span>
                head = node;
                tail = node;
            } <span class="hljs-keyword">else</span> { <span class="hljs-comment">//链表不为空</span>
                node.<span class="hljs-keyword">next</span> = current;
                current.prev = node;
                head = node;
            }
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(position === length) { <span class="hljs-comment">//在最后一个位置添加</span>
            current = tail;
            current.<span class="hljs-keyword">next</span> = node;
            node.prev = current;
            tail = node;
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">while</span>(index++ &lt; position) { <span class="hljs-comment">//在列表中间添加</span>
                <span class="hljs-keyword">previous</span> = current; <span class="hljs-comment">//循环迭代</span>
                current = current.<span class="hljs-keyword">next</span>;
            }
            node.<span class="hljs-keyword">next</span> = current;
            <span class="hljs-keyword">previous</span>.<span class="hljs-keyword">next</span> = node;
            
            current.prev = node;
            node.prev = <span class="hljs-keyword">previous</span>;
        }
        length ++; <span class="hljs-comment">//更新列表长度</span>
        
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">true</span>;
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">false</span>;
    }
}</code></pre>
<ul><li><p>从任意位置移除元素</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.removeAt = function(position) {
    if(position > -1 &amp;&amp; position < length) { //检查越界值
        var current = head,
            previous,
            index = 0;
        if(position === 0) { //第一个位置
            head = current.next;
            
            if(length === 1) { //如果链表只有一项
                tail = null;
            } else { //也就相当于把current.next.prev = null
                head.prev = null;
            }
        } else if(position === length -1) { //最后一项
            current = tail; //tail的引用赋给current变量
            tail = current.prev; //上一项指向tail
            tail.next = null; //最后一项的next都是指向null的
        } else {
            while(index++ < position) { //从中间位置移除
                previous = current;
                current = current.next;
            }
            
            previous.next = current.next; //直接跳过current连接上一项和下一项
            current.next.prev = previous;
        }
        length --;
        return current.element;
    } else {
        return null;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-keyword">this</span>.removeAt = function(position) {
    <span class="hljs-keyword">if</span>(position &gt; -<span class="hljs-number">1</span> &amp;&amp; position &lt; length) { <span class="hljs-comment">//检查越界值</span>
        var current = head,
            <span class="hljs-keyword">previous</span>,
            index = <span class="hljs-number">0</span>;
        <span class="hljs-keyword">if</span>(position === <span class="hljs-number">0</span>) { <span class="hljs-comment">//第一个位置</span>
            head = current.<span class="hljs-keyword">next</span>;
            
            <span class="hljs-keyword">if</span>(length === <span class="hljs-number">1</span>) { <span class="hljs-comment">//如果链表只有一项</span>
                tail = <span class="hljs-keyword">null</span>;
            } <span class="hljs-keyword">else</span> { <span class="hljs-comment">//也就相当于把current.next.prev = null</span>
                head.prev = <span class="hljs-keyword">null</span>;
            }
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(position === length -<span class="hljs-number">1</span>) { <span class="hljs-comment">//最后一项</span>
            current = tail; <span class="hljs-comment">//tail的引用赋给current变量</span>
            tail = current.prev; <span class="hljs-comment">//上一项指向tail</span>
            tail.<span class="hljs-keyword">next</span> = <span class="hljs-keyword">null</span>; <span class="hljs-comment">//最后一项的next都是指向null的</span>
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">while</span>(index++ &lt; position) { <span class="hljs-comment">//从中间位置移除</span>
                <span class="hljs-keyword">previous</span> = current;
                current = current.<span class="hljs-keyword">next</span>;
            }
            
            <span class="hljs-keyword">previous</span>.<span class="hljs-keyword">next</span> = current.<span class="hljs-keyword">next</span>; <span class="hljs-comment">//直接跳过current连接上一项和下一项</span>
            current.<span class="hljs-keyword">next</span>.prev = <span class="hljs-keyword">previous</span>;
        }
        length --;
        <span class="hljs-keyword">return</span> current.element;
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">null</span>;
    }
}</code></pre>
<h3 id="articleHeader4">循环链表</h3>
<ul>
<li><p>单向循环链表和链表唯一去别在于：最后一个元素指向下一个元素的指针（tail.next）不是引用null而是指向第一个元素（head）<br><span class="img-wrap"><img data-src="http://images.cnitblog.com/i/569008/201406/191717088015639.jpg" src="https://static.alili.techhttp://images.cnitblog.com/i/569008/201406/191717088015639.jpg" alt="" title="" style="cursor: pointer; display: inline;"></span></p></li>
<li><p>双向循环链表有指向head的tail.next，也有指向tail的head.prev</p></li>
</ul>
<p><span class="img-wrap"><img data-src="http://images.cnitblog.com/i/569008/201406/191718543173574.jpg" src="https://static.alili.techhttp://images.cnitblog.com/i/569008/201406/191718543173574.jpg" alt="双向循环链表示意图" title="双向循环链表示意图" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
我对JS链表的简单学习

## 原文链接
[https://segmentfault.com/a/1190000008706650](https://segmentfault.com/a/1190000008706650)

