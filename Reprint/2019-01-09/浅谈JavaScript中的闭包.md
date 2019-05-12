---
title: '浅谈JavaScript中的闭包' 
date: 2019-01-09 2:30:12
hidden: true
slug: ziuwua7i3lr
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">一、闭包是什么？</h3>
<blockquote>
<p>《JavaScript高级程序设计》中写道：“闭包是指有权访问另一个函数作用域中的变量的函数”，如果用下定义的观点看，这句话就是说“闭包是函数”，我带着怀疑的心态又去网上找了找，发现什么说法都有，终究没能明白闭包的含义，还是看代码来得直接。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function outter(){
  var sky=&quot;blue&quot;;
  function inner(){
    console.log(sky);
  }

  return inner;
}
var result=outter();
result();    //&quot;blue&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">outter</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">var</span> sky=<span class="hljs-string">"blue"</span>;
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">inner</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(sky);
  }

  <span class="hljs-keyword">return</span> inner;
}
<span class="hljs-keyword">var</span> result=outter();
result();    <span class="hljs-comment">//"blue"</span>
</code></pre>
<p>这段代码就包含一个简单的闭包：outter函数的返回值是一个函数，即inner。inner在outter内部，理所当然能访问到局部变量sky，但当inner作为outter的返回值赋给outter外的全局变量时，神奇的事情发生了：在全局作用域中访问到了sky，这就是闭包。</p>
</blockquote>
<h3 id="articleHeader1">二、闭包的原理?</h3>
<blockquote>
<p>每个函数都有自己的执行环境，当一个函数被执行时，它的执行环境就会被推入环境栈，其活动对象(存储环境中定义的变量及函数)加入作用域链中，一旦函数执行完，栈将其环境弹出，活动对象被销毁。</p>
<p>对于上面的例子来说，outter执行完之后将返回inner给了result，outter的执行环境从环境栈弹出，控制权交给全局环境，outter的活动对象理应被销毁。但此时inner已经存储在全局活动对象中了，同时inner需要访问sky，所以outter的活动对象没有被销毁，即使result执行完毕，outter的活动对象依然存在于作用域链中，只有当result被销毁</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="result = null；" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attr">result</span> = null；</code></pre>
<p>outter的活动对象才会彻底释放。</p>
</blockquote>
<h3 id="articleHeader2">三、闭包有什么用?</h3>
<blockquote><p>说了这么多，闭包到底有什么用呢？我个人认为闭包最大的用处就是防止对全局作用域的污染。 试想如果我们把一些仅仅只用到一两次的变量都声明在全局作用域中，最后肯定是容易出错且不可维护的。而闭包最神奇的地方就是能在一个函数外访问函数中的局部变量，把这些变量用闭包的形式放在函数中便能避免污染。</p></blockquote>
<h3 id="articleHeader3">四、Caveat</h3>
<blockquote><ul>
<li><p>闭包将函数的活动对象维持在内存中，过度使用闭包会导致内存占用过多；</p></li>
<li><p>闭包只能取得外部函数中任何变量的最后一个值，在使用循环且返回的函数中带有循环变量时会得到错误结果；</p></li>
<li><p>当返回的函数为匿名函数时，注意匿名函数中的this指的是window对象。</p></li>
</ul></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
浅谈JavaScript中的闭包

## 原文链接
[https://segmentfault.com/a/1190000010071669](https://segmentfault.com/a/1190000010071669)

