---
title: '队列的JS实现及广度优先搜索（BFS）的实现' 
date: 2019-02-13 2:31:23
hidden: true
slug: 0r5e3i5ynfhi
categories: [reprint]
---

{{< raw >}}

                    
<p>队列是先进先出（FIFO）的数据结构，插入操作叫做入队，只能添加在队列的末尾；删除操作叫做出队，只能移除第一个元素。在JS中，用数组可以很简单的实现队列。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Queue () {
    this.queue = [];
}
// 增加
Queue.prototype.enQueue = function(x) {
    this.queue.push(x);
    return true;
}
// 删除
Queue.prototype.deQueue = function() {
    if(this.isEmpty()) {
        return false;
    }
    this.queue.shift();
    return true;    
}
// 获取队首元素
Queue.prototype.front = function() {
    if(this.isEmpty()) {
        return false;
    }
    this.queue[0];  
}
// 是否为空
Queue.prototype.isEmpty = function() {
    return !this.queue.length
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Queue</span> <span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">this</span>.queue = [];
}
<span class="hljs-comment">// 增加</span>
Queue.prototype.enQueue = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(x)</span> </span>{
    <span class="hljs-keyword">this</span>.queue.push(x);
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
}
<span class="hljs-comment">// 删除</span>
Queue.prototype.deQueue = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.isEmpty()) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
    <span class="hljs-keyword">this</span>.queue.shift();
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;    
}
<span class="hljs-comment">// 获取队首元素</span>
Queue.prototype.front = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.isEmpty()) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
    <span class="hljs-keyword">this</span>.queue[<span class="hljs-number">0</span>];  
}
<span class="hljs-comment">// 是否为空</span>
Queue.prototype.isEmpty = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">return</span> !<span class="hljs-keyword">this</span>.queue.length
}</code></pre>
<p>以上就实现了队列的数据结构，那么队列这种数据结构有什么作用呢？在广度优先搜索（BFS）中，很适合队列。那什么是BFS。在树的遍历中，有两种遍历方式，其中一种就是从根节点一层一层的往下遍历，这就是广度优先；另一种是先由根节点选一条路径直接遍历到叶子节点，这就是深度优先搜索（DFS）。队列可以用在BFS中，下面我们来实现一个广度优先搜索的例子，返回目标节点深度。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="        let root = {
            key: 1,
            children: [
                {
                    key:2,
                },
                {
                    key:3,
                    children:[
                        {
                            key:4,
                        }
                    ]
                }
            ]
        } // 数据源

function bfs(root, target) {
    //利用上面创建的Queue，当然也可以直接用数组实现
    let queue = new Queue();
    let step = 0;  // 根节点到目标节点之间的深度
    queue.enQueue(root); //将根节点加入
    //遍历队列
    while(!queue.isEmpty()) {
        step += 1;
        let len = queue.length;
        // 分层遍历队列，没有目标元素则删除该层元素，继续遍历下一层
        for(let i =0; i<len; i++) {
            let cur = queue.front()  // 获取队首元素
            if(target === cur.key) return step; //如果是目标元素，返回
            // 如果不是，将下一层节点加入到队列
            if(cur.children &amp;&amp; cur.children.length) {
                cur.children.map(item => {
                    queue.enQueue(item)
                })
            }
            queue.deQueue()  //然后将遍历过的节点删除，
        }
    }
}

bfs(root,4)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code>        <span class="hljs-keyword">let</span> root = {
            <span class="hljs-built_in">key</span>: <span class="hljs-number">1</span>,
            children: [
                {
                    <span class="hljs-built_in">key</span>:<span class="hljs-number">2</span>,
                },
                {
                    <span class="hljs-built_in">key</span>:<span class="hljs-number">3</span>,
                    children:[
                        {
                            <span class="hljs-built_in">key</span>:<span class="hljs-number">4</span>,
                        }
                    ]
                }
            ]
        } <span class="hljs-comment">// 数据源</span>

function bfs(root, target) {
    <span class="hljs-comment">//利用上面创建的Queue，当然也可以直接用数组实现</span>
    <span class="hljs-keyword">let</span> queue = <span class="hljs-keyword">new</span> Queue();
    <span class="hljs-keyword">let</span> step = <span class="hljs-number">0</span>;  <span class="hljs-comment">// 根节点到目标节点之间的深度</span>
    queue.enQueue(root); <span class="hljs-comment">//将根节点加入</span>
    <span class="hljs-comment">//遍历队列</span>
    <span class="hljs-keyword">while</span>(!queue.isEmpty()) {
        step += <span class="hljs-number">1</span>;
        <span class="hljs-keyword">let</span> len = queue.length;
        <span class="hljs-comment">// 分层遍历队列，没有目标元素则删除该层元素，继续遍历下一层</span>
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i =<span class="hljs-number">0</span>; i&lt;len; i++) {
            <span class="hljs-keyword">let</span> cur = queue.front()  <span class="hljs-comment">// 获取队首元素</span>
            <span class="hljs-keyword">if</span>(target === cur.<span class="hljs-built_in">key</span>) <span class="hljs-keyword">return</span> step; <span class="hljs-comment">//如果是目标元素，返回</span>
            <span class="hljs-comment">// 如果不是，将下一层节点加入到队列</span>
            <span class="hljs-keyword">if</span>(cur.children &amp;&amp; cur.children.length) {
                cur.children.map(item =&gt; {
                    queue.enQueue(item)
                })
            }
            queue.deQueue()  <span class="hljs-comment">//然后将遍历过的节点删除，</span>
        }
    }
}

bfs(root,<span class="hljs-number">4</span>)</code></pre>
<p>这样我们就完成了BFS的实现思路，大家可已参照该思路在具体的业务中灵活运用BFS。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
队列的JS实现及广度优先搜索（BFS）的实现

## 原文链接
[https://segmentfault.com/a/1190000016900956](https://segmentfault.com/a/1190000016900956)

