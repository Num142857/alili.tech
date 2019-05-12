---
title: 'leetcode 225 用队列实现栈（JS）' 
date: 2019-02-14 2:30:37
hidden: true
slug: 1j4zgfa8m9x
categories: [reprint]
---

{{< raw >}}

                    
<ul>
<li>
<p>使用队列实现栈的下列操作：</p>
<ul>
<li>push(x) -- 元素 x 入栈</li>
<li>pop() -- 移除栈顶元素</li>
<li>top() -- 获取栈顶元素</li>
<li>empty() -- 返回栈是否为空</li>
</ul>
</li>
<li>
<p>注意:</p>
<ul>
<li>你只能使用队列的基本操作-- 也就是 push to back, peek/pop from front, size, 和 is empty 这些操作是合法的。</li>
<li>你所使用的语言也许不支持队列。 你可以使用 list 或者 deque（双端队列）来模拟一个队列 , 只要是标准的队列操作即可。</li>
<li>你可以假设所有操作都是有效的（例如, 对一个空的栈不会调用 pop 或者 top 操作）。</li>
</ul>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="javascript中没有队列这种数据结构，因此用数组来实现
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code><span class="hljs-keyword">javascript中没有队列这种数据结构，因此用数组来实现
</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var MyStack = function() {
    this.stack = []; //初始化空数组
    this.top = 0; //记录栈顶的位置
}

Mystack.prototype.push = function(x) {
    this.stack.push(x);
    this.top++;
}

Mystack.prototype.pop = function(x) {
    return this.stack[--this.top]; //返回栈顶元素并将top值减一
}

MyStack.prototype.empty = function() {
    return !this.len
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> MyStack = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">this</span>.stack = []; <span class="hljs-comment">//初始化空数组</span>
    <span class="hljs-keyword">this</span>.top = <span class="hljs-number">0</span>; <span class="hljs-comment">//记录栈顶的位置</span>
}

Mystack.prototype.push = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(x)</span> </span>{
    <span class="hljs-keyword">this</span>.stack.push(x);
    <span class="hljs-keyword">this</span>.top++;
}

Mystack.prototype.pop = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(x)</span> </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.stack[--<span class="hljs-keyword">this</span>.top]; <span class="hljs-comment">//返回栈顶元素并将top值减一</span>
}

MyStack.prototype.empty = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-keyword">return</span> !<span class="hljs-keyword">this</span>.len
};</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
leetcode 225 用队列实现栈（JS）

## 原文链接
[https://segmentfault.com/a/1190000016836279](https://segmentfault.com/a/1190000016836279)

