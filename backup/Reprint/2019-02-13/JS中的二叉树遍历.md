---
title: 'JS中的二叉树遍历' 
date: 2019-02-13 2:31:22
hidden: true
slug: fw82afy56wq
categories: [reprint]
---

{{< raw >}}

                    
<p>二叉树是由根节点，左子树，右子树组成，左子树和友子树分别是一个二叉树。<br>这篇文章主要在JS中实现二叉树的遍历。</p>
<h2 id="articleHeader0">一个二叉树的例子</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var tree = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 4
    }
  },
  right: {
    value: 3,
    left: {
      value: 5,
      left: {
        value: 7
      },
      right: {
        value: 8
      }
    },
    right: {
      value: 6
    }
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">var</span> tree = {
  <span class="hljs-attr">value</span>: <span class="hljs-number">1</span>,
  <span class="hljs-attr">left</span>: {
    <span class="hljs-attr">value</span>: <span class="hljs-number">2</span>,
    <span class="hljs-attr">left</span>: {
      <span class="hljs-attr">value</span>: <span class="hljs-number">4</span>
    }
  },
  <span class="hljs-attr">right</span>: {
    <span class="hljs-attr">value</span>: <span class="hljs-number">3</span>,
    <span class="hljs-attr">left</span>: {
      <span class="hljs-attr">value</span>: <span class="hljs-number">5</span>,
      <span class="hljs-attr">left</span>: {
        <span class="hljs-attr">value</span>: <span class="hljs-number">7</span>
      },
      <span class="hljs-attr">right</span>: {
        <span class="hljs-attr">value</span>: <span class="hljs-number">8</span>
      }
    },
    <span class="hljs-attr">right</span>: {
      <span class="hljs-attr">value</span>: <span class="hljs-number">6</span>
    }
  }
}
</code></pre>
<h2 id="articleHeader1">广度优先遍历</h2>
<p>广度优先遍历是从二叉树的第一层（根结点）开始，自上至下逐层遍历；在同一层中，按照从左到右的顺序对结点逐一访问。<br>实现：<br>&lt;!--more--&gt;<br>使用数组模拟队列。首先将根节点归入队列。当队列不为空的时候，执行循环：取出队列的一个节点，如果该结点的左子树为非空，则将该结点的左子树入队列；如果该结点的右子树为非空，则将该结点的右子树入队列。<br>（描述有点不清楚，直接看代码吧。）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var levelOrderTraversal = function(node) {
  if(!node) {
    throw new Error('Empty Tree')
  }

  var que = []
  que.push(node)
  while(que.length !== 0) {
    node = que.shift()
    console.log(node.value)
    if(node.left) que.push(node.left)
    if(node.right) que.push(node.right)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> levelOrderTraversal = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">node</span>) </span>{
  <span class="hljs-keyword">if</span>(!node) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Empty Tree'</span>)
  }

  <span class="hljs-keyword">var</span> que = []
  que.push(node)
  <span class="hljs-keyword">while</span>(que.length !== <span class="hljs-number">0</span>) {
    node = que.shift()
    <span class="hljs-built_in">console</span>.log(node.value)
    <span class="hljs-keyword">if</span>(node.left) que.push(node.left)
    <span class="hljs-keyword">if</span>(node.right) que.push(node.right)
  }
}</code></pre>
<h2 id="articleHeader2">递归遍历</h2>
<p>觉得用这几个字母表示递归遍历的三种方法不错：<br>D：访问根结点，L：遍历根结点的左子树，R：遍历根结点的右子树。<br>先序遍历：DLR<br>中序遍历：LDR<br>后序遍历：LRD<br>顺着字母表示的意思念下来就是遍历的顺序了 ^ ^</p>
<p>这3种遍历都属于递归遍历，或者说深度优先遍历（Depth-First Search，DFS），因为它总<br>是优先往深处访问。</p>
<h3 id="articleHeader3">先序遍历的递归算法：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var preOrder = function (node) {
  if (node) {
    console.log(node.value);
    preOrder(node.left);
    preOrder(node.right);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> preOrder = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">node</span>) </span>{
  <span class="hljs-keyword">if</span> (node) {
    <span class="hljs-built_in">console</span>.log(node.value);
    preOrder(node.left);
    preOrder(node.right);
  }
}</code></pre>
<h3 id="articleHeader4">中序遍历的递归算法：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var inOrder = function (node) {
  if (node) {
    inOrder(node.left);
    console.log(node.value);
    inOrder(node.right);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> inOrder = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">node</span>) </span>{
  <span class="hljs-keyword">if</span> (node) {
    inOrder(node.left);
    <span class="hljs-built_in">console</span>.log(node.value);
    inOrder(node.right);
  }
}</code></pre>
<h3 id="articleHeader5">后序遍历的递归算法：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var postOrder = function (node) {
  if (node) {
    postOrder(node.left);
    postOrder(node.right);
    console.log(node.value);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> postOrder = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">node</span>) </span>{
  <span class="hljs-keyword">if</span> (node) {
    postOrder(node.left);
    postOrder(node.right);
    <span class="hljs-built_in">console</span>.log(node.value);
  }
}</code></pre>
<h2 id="articleHeader6">非递归深度优先遍历</h2>
<p>其实对于这些概念谁是属于谁的我也搞不太清楚。有的书里将二叉树的遍历只讲了上面三种递归遍历。有的分广度优先遍历和深度优先遍历两种，把递归遍历都分入深度遍历当中;有的分递归遍历和非递归遍历两种，非递归遍历里包括广度优先遍历和下面这种遍历。个人觉得怎么分其实并不重要，掌握方法和用途就好 ：）</p>
<p>刚刚在广度优先遍历中使用的是队列，相应的，在这种不递归的深度优先遍历中我们使用栈。在JS中还是使用一个数组来模拟它。<br>这里只说先序的：<br>额，我尝试了描述这个算法，然而并描述不清楚。按照代码走一边你就懂了。（认真脸）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var preOrderUnRecur = function(node) {
  if(!node) {
    throw new Error('Empty Tree')
  }
  var stack = []
  stack.push(node)
  while(stack.length !== 0) {
    node = stack.pop()
    console.log(node.value)    
    if(node.right) stack.push(node.right)
    if(node.left) stack.push(node.left)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> preOrderUnRecur = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">node</span>) </span>{
  <span class="hljs-keyword">if</span>(!node) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Empty Tree'</span>)
  }
  <span class="hljs-keyword">var</span> stack = []
  stack.push(node)
  <span class="hljs-keyword">while</span>(stack.length !== <span class="hljs-number">0</span>) {
    node = stack.pop()
    <span class="hljs-built_in">console</span>.log(node.value)    
    <span class="hljs-keyword">if</span>(node.right) stack.push(node.right)
    <span class="hljs-keyword">if</span>(node.left) stack.push(node.left)
  }
}</code></pre>
<hr>
<p>看了LK的<a href="https://github.com/LeuisKen/algorithm/blob/master/ch03/q1.md" rel="nofollow noreferrer" target="_blank">这一篇</a>，找到了非递归后序的算法（之前没写就是因为这种实在不会啊啊啊），所以在这里把非递归的遍历方法补充完整。<br>非递归中序<br>先把数的左节点推入栈，然后取出，再推右节点。（我能说出的描述就如此了～～）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var inOrderUnRecur = function(node) {
  if(!node) {
    throw new Error('Empty Tree')
  }  
  var stack = []
  while(stack.length !== 0 || node) {
    if(node) {
      stack.push(node)
      node = node.left
    } else {
      node = stack.pop()
      console.log(node.value)
      node = node.right
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> inOrderUnRecur = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">node</span>) </span>{
  <span class="hljs-keyword">if</span>(!node) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Empty Tree'</span>)
  }  
  <span class="hljs-keyword">var</span> stack = []
  <span class="hljs-keyword">while</span>(stack.length !== <span class="hljs-number">0</span> || node) {
    <span class="hljs-keyword">if</span>(node) {
      stack.push(node)
      node = node.left
    } <span class="hljs-keyword">else</span> {
      node = stack.pop()
      <span class="hljs-built_in">console</span>.log(node.value)
      node = node.right
    }
  }
}</code></pre>
<p>非递归后序(使用一个栈)<br>这里使用了一个临时变量记录上次入栈/出栈的节点。思路是先把根节点和左树推入栈，然后取出左树，再推入右树，取出，最后取跟节点。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var posOrderUnRecur = function(node) {
  if(!node) {
    throw new Error('Empty Tree')
  }
  var stack = []
  stack.push(node)
  var tmp = null
  while(stack.length !== 0) {
    tmp = stack[stack.length - 1]
    if(tmp.left &amp;&amp; node !== tmp.left &amp;&amp; node !== tmp.right) {
      stack.push(tmp.left)
    } else if(tmp.right &amp;&amp; node !== tmp.right) {
      stack.push(tmp.right)
    } else {
      console.log(stack.pop().value)
      node = tmp
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> posOrderUnRecur = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">node</span>) </span>{
  <span class="hljs-keyword">if</span>(!node) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Empty Tree'</span>)
  }
  <span class="hljs-keyword">var</span> stack = []
  stack.push(node)
  <span class="hljs-keyword">var</span> tmp = <span class="hljs-literal">null</span>
  <span class="hljs-keyword">while</span>(stack.length !== <span class="hljs-number">0</span>) {
    tmp = stack[stack.length - <span class="hljs-number">1</span>]
    <span class="hljs-keyword">if</span>(tmp.left &amp;&amp; node !== tmp.left &amp;&amp; node !== tmp.right) {
      stack.push(tmp.left)
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(tmp.right &amp;&amp; node !== tmp.right) {
      stack.push(tmp.right)
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-built_in">console</span>.log(stack.pop().value)
      node = tmp
    }
  }
}</code></pre>
<p>非递归后序(使用两个栈)<br>这个算法的思路和上面那个差不多，s1有点像一个临时变量。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var posOrderUnRecur = function(node) {
  if(node) {
    var s1 = []
    var s2 = []
    s1.push(node)
    while(s1.length !== 0) {
      node = s1.pop()
      s2.push(node)
      if(node.left) {
        s1.push(node.left)
      }
      if(node.right) {
        s1.push(node.right)
      }
    }
    while(s2.length !== 0) {
      console.log(s2.pop().value);
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> posOrderUnRecur = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">node</span>) </span>{
  <span class="hljs-keyword">if</span>(node) {
    <span class="hljs-keyword">var</span> s1 = []
    <span class="hljs-keyword">var</span> s2 = []
    s1.push(node)
    <span class="hljs-keyword">while</span>(s1.length !== <span class="hljs-number">0</span>) {
      node = s1.pop()
      s2.push(node)
      <span class="hljs-keyword">if</span>(node.left) {
        s1.push(node.left)
      }
      <span class="hljs-keyword">if</span>(node.right) {
        s1.push(node.right)
      }
    }
    <span class="hljs-keyword">while</span>(s2.length !== <span class="hljs-number">0</span>) {
      <span class="hljs-built_in">console</span>.log(s2.pop().value);
    }
  }
}</code></pre>
<hr>
<h2 id="articleHeader7">Morris遍历</h2>
<p>这个方法即不用递归也不用栈实现三种深度遍历，空间复杂度为O(1)（这个概念我也不是特别清楚org）<br>（这三种算法我先放着，有空再研究）<br>Morris先序:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var morrisPre = function(head) {
  if(!head) {
    return
  }
  var cur1 = head,
      cur2 = null
  while(cur1) {
    cur2 = cur1.left
    if(cur2) {
      while(cur2.right &amp;&amp; cur2.right != cur1) {
        cur2 = cur2.right
      }
      if(!cur2.right) {
        cur2.right = cur1
        console.log(cur1.value)
        cur1 = cur1.left
        continue
      } else {
        cur2.right = null
      }
    } else {
      console.log(cur1.value)
    }
    cur1 = cur1.right
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> morrisPre = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">head</span>) </span>{
  <span class="hljs-keyword">if</span>(!head) {
    <span class="hljs-keyword">return</span>
  }
  <span class="hljs-keyword">var</span> cur1 = head,
      cur2 = <span class="hljs-literal">null</span>
  <span class="hljs-keyword">while</span>(cur1) {
    cur2 = cur1.left
    <span class="hljs-keyword">if</span>(cur2) {
      <span class="hljs-keyword">while</span>(cur2.right &amp;&amp; cur2.right != cur1) {
        cur2 = cur2.right
      }
      <span class="hljs-keyword">if</span>(!cur2.right) {
        cur2.right = cur1
        <span class="hljs-built_in">console</span>.log(cur1.value)
        cur1 = cur1.left
        <span class="hljs-keyword">continue</span>
      } <span class="hljs-keyword">else</span> {
        cur2.right = <span class="hljs-literal">null</span>
      }
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-built_in">console</span>.log(cur1.value)
    }
    cur1 = cur1.right
  }
}</code></pre>
<p>Morris中序:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var morrisIn = function(head) {
  if(!head) {
    return
  }
  var cur1 = head,
      cur2 = null
  while(cur1) {
    cur2 = cur1.left
    if(cur2) {
      while(cur2.right &amp;&amp; cur2.right !== cur1) {
        cur2 = cur2.right
      }
      if(!cur2.right) {
        cur2.right = cur1
        cur1 = cur1.left
        continue
      } else {
        cur2.right = null
      }
    }
    console.log(cur1.value)
    cur1 = cur1.right
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> morrisIn = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">head</span>) </span>{
  <span class="hljs-keyword">if</span>(!head) {
    <span class="hljs-keyword">return</span>
  }
  <span class="hljs-keyword">var</span> cur1 = head,
      cur2 = <span class="hljs-literal">null</span>
  <span class="hljs-keyword">while</span>(cur1) {
    cur2 = cur1.left
    <span class="hljs-keyword">if</span>(cur2) {
      <span class="hljs-keyword">while</span>(cur2.right &amp;&amp; cur2.right !== cur1) {
        cur2 = cur2.right
      }
      <span class="hljs-keyword">if</span>(!cur2.right) {
        cur2.right = cur1
        cur1 = cur1.left
        <span class="hljs-keyword">continue</span>
      } <span class="hljs-keyword">else</span> {
        cur2.right = <span class="hljs-literal">null</span>
      }
    }
    <span class="hljs-built_in">console</span>.log(cur1.value)
    cur1 = cur1.right
  }
}</code></pre>
<p>Morris后序:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var morrisPost = function(head) {
  if(!head) {
    return
  }
  var cur1 = head,
      cur2 = null
  while(cur1) {
    cur2 = cur1.left
    if(cur2) {
      while(cur2.right &amp;&amp; cur2.right !== cur1) {
        cur2 = cur2.right
      }
      if(!cur2.right) {
        cur2.right = cur1
        cur1 = cur1.left
        continue
      } else {
        cur2.right = null
        printEdge(cur1.left)
      }
    }
    cur1 = cur1.right
  }
  printEdge(head)
}

var printEdge = function(head) {
  var tail = reverseEdge(head)
  var cur = tail
  while(cur) {
    console.log(cur.value)
    cur = cur.right
  }
  reverseEdge(tail)
}

var reverseEdge = function(head) {
  var pre = null,
      next = null
  while(head) {
    next = head.right
    head.right = pre
    pre = head
    head = next
  }
  return pre
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> morrisPost = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">head</span>) </span>{
  <span class="hljs-keyword">if</span>(!head) {
    <span class="hljs-keyword">return</span>
  }
  <span class="hljs-keyword">var</span> cur1 = head,
      cur2 = <span class="hljs-literal">null</span>
  <span class="hljs-keyword">while</span>(cur1) {
    cur2 = cur1.left
    <span class="hljs-keyword">if</span>(cur2) {
      <span class="hljs-keyword">while</span>(cur2.right &amp;&amp; cur2.right !== cur1) {
        cur2 = cur2.right
      }
      <span class="hljs-keyword">if</span>(!cur2.right) {
        cur2.right = cur1
        cur1 = cur1.left
        <span class="hljs-keyword">continue</span>
      } <span class="hljs-keyword">else</span> {
        cur2.right = <span class="hljs-literal">null</span>
        printEdge(cur1.left)
      }
    }
    cur1 = cur1.right
  }
  printEdge(head)
}

<span class="hljs-keyword">var</span> printEdge = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">head</span>) </span>{
  <span class="hljs-keyword">var</span> tail = reverseEdge(head)
  <span class="hljs-keyword">var</span> cur = tail
  <span class="hljs-keyword">while</span>(cur) {
    <span class="hljs-built_in">console</span>.log(cur.value)
    cur = cur.right
  }
  reverseEdge(tail)
}

<span class="hljs-keyword">var</span> reverseEdge = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">head</span>) </span>{
  <span class="hljs-keyword">var</span> pre = <span class="hljs-literal">null</span>,
      next = <span class="hljs-literal">null</span>
  <span class="hljs-keyword">while</span>(head) {
    next = head.right
    head.right = pre
    pre = head
    head = next
  }
  <span class="hljs-keyword">return</span> pre
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS中的二叉树遍历

## 原文链接
[https://segmentfault.com/a/1190000004620352](https://segmentfault.com/a/1190000004620352)

