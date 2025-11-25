---
title: 'ES6箭头函数学习笔记' 
date: 2019-02-09 2:30:59
hidden: true
slug: b0r5gml8zvg
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">语法</h2>
<ol>
<li>
<p>具有一个参数的简单函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var single = a => a
single('hello, world') // 'hello, world'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> single = <span class="hljs-function"><span class="hljs-params">a</span> =&gt;</span> a
single(<span class="hljs-string">'hello, world'</span>) <span class="hljs-comment">// 'hello, world'</span></code></pre>
</li>
<li>
<p>没有参数的需要用在箭头前加上小括号</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var log = () => {
    alert('no param')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> log = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    alert(<span class="hljs-string">'no param'</span>)
}</code></pre>
</li>
<li>
<p>多个参数需要用到小括号，参数间逗号间隔，例如两个数字相加</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var add = (a, b) => a + b
add(3, 8) // 11" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> add = <span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a + b
add(<span class="hljs-number">3</span>, <span class="hljs-number">8</span>) <span class="hljs-comment">// 11</span></code></pre>
</li>
<li>
<p>函数体多条语句需要用到大括号</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var add = (a, b) => {
    if (typeof a == 'number' &amp;&amp; typeof b == 'number') {
        return a + b
    } else {
        return 0
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> add = <span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> a == <span class="hljs-string">'number'</span> &amp;&amp; <span class="hljs-keyword">typeof</span> b == <span class="hljs-string">'number'</span>) {
        <span class="hljs-keyword">return</span> a + b
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>
    }
}</code></pre>
</li>
<li>
<p>返回对象时需要用小括号包起来，因为大括号被占用解释为代码块了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var getHash = arr => {
    // ...
    return ({
        name: 'Jack',
        age: 33
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> getHash = <span class="hljs-function"><span class="hljs-params">arr</span> =&gt;</span> {
    <span class="hljs-comment">// ...</span>
    <span class="hljs-keyword">return</span> ({
        <span class="hljs-attr">name</span>: <span class="hljs-string">'Jack'</span>,
        <span class="hljs-attr">age</span>: <span class="hljs-number">33</span>
    })
}</code></pre>
</li>
<li>
<p>直接作为事件handler</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.addEventListener('click', ev => {
    console.log(ev)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'click'</span>, ev =&gt; {
    <span class="hljs-built_in">console</span>.log(ev)
})</code></pre>
</li>
<li>
<p>作为数组排序回调</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1, 9 , 2, 4, 3, 8].sort((a, b) => {
    if (a - b > 0 ) {
        return 1
    } else {
        return -1
    }
})
arr // [1, 2, 3, 4, 8, 9]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">9</span> , <span class="hljs-number">2</span>, <span class="hljs-number">4</span>, <span class="hljs-number">3</span>, <span class="hljs-number">8</span>].sort(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (a - b &gt; <span class="hljs-number">0</span> ) {
        <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-number">-1</span>
    }
})
arr <span class="hljs-comment">// [1, 2, 3, 4, 8, 9]</span></code></pre>
</li>
</ol>
<h2 id="articleHeader1">特性</h2>
<ol>
<li>this：用function生成的函数会定义一个自己的this，而箭头函数没有自己的this，而是会和上一层的作用域共享this。</li>
<li>apply &amp; call：由于箭头函数已经绑定了this的值，即使使用apply或者call也不能只能起到传参数的作用，并不能强行改变箭头函数里的this。</li>
<li>arguments：普通函数里arguments代表了调用时传入的参数，但是箭头函数不然，箭头函数会把arguments当成一个普通的变量，顺着作用域链由内而外地查询。</li>
<li>不能被new：箭头函数不能与new关键字一起使用，会报错。</li>
<li>
<p>typeof运算符和普通的function一样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var func = a => a
console.log(typeof func); // &quot;function&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> func = <span class="hljs-function"><span class="hljs-params">a</span> =&gt;</span> a
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> func); <span class="hljs-comment">// "function"</span></code></pre>
</li>
<li>
<p>instanceof也返回true，表明也是Function的实例:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(func instanceof Function); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(func <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Function</span>); <span class="hljs-comment">// true</span></code></pre>
</li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6箭头函数学习笔记

## 原文链接
[https://segmentfault.com/a/1190000005636588](https://segmentfault.com/a/1190000005636588)

