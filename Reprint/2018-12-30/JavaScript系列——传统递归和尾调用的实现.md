---
title: 'JavaScript系列——传统递归和尾调用的实现' 
date: 2018-12-30 2:30:10
hidden: true
slug: mkzm575njy9
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">递归最经典的写法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//传统递归写法
function factorial(n) {
  if(n === 0) {
    return 1
  } else {
    return n * factorial(n - 1)
  }
}

factorial(4) // 24
//4 * factorial(3)
//4 * 3 * factorial(2)
//4 * 3 * 2 factorial(1)
//4 * 3 * 2 * 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//传统递归写法</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">factorial</span>(<span class="hljs-params">n</span>) </span>{
  <span class="hljs-keyword">if</span>(n === <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> n * factorial(n - <span class="hljs-number">1</span>)
  }
}

factorial(<span class="hljs-number">4</span>) <span class="hljs-comment">// 24</span>
<span class="hljs-comment">//4 * factorial(3)</span>
<span class="hljs-comment">//4 * 3 * factorial(2)</span>
<span class="hljs-comment">//4 * 3 * 2 factorial(1)</span>
<span class="hljs-comment">//4 * 3 * 2 * 1</span></code></pre>
<h3 id="articleHeader1">尾调用优化</h3>
<p>1、有人认为尾调用优化需要柯里化函数来实现。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function factorial(n, res) {
    if (n == 1) return res;
    return factorial(n - 1, n * res)
}
var _Factorial = curry(factorial, _, 1)

_Factorial(4)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">factorial</span>(<span class="hljs-params">n, res</span>) </span>{
    <span class="hljs-keyword">if</span> (n == <span class="hljs-number">1</span>) <span class="hljs-keyword">return</span> res;
    <span class="hljs-keyword">return</span> factorial(n - <span class="hljs-number">1</span>, n * res)
}
<span class="hljs-keyword">var</span> _Factorial = curry(factorial, _, <span class="hljs-number">1</span>)

_Factorial(<span class="hljs-number">4</span>)</code></pre>
<p>2、我们可以借助函数默认参数的方式去实现尾调用函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function factorial(n, s=1) {
  if(n < 0) throw Error('传入的参数不能小于0')
  if(n <= 1) {
    return s
  }
  s = n * s
  return factorial(n-1, s)
}
factorial(4) // 24" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">factorial</span>(<span class="hljs-params">n, s=<span class="hljs-number">1</span></span>) </span>{
  <span class="hljs-keyword">if</span>(n &lt; <span class="hljs-number">0</span>) <span class="hljs-keyword">throw</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'传入的参数不能小于0'</span>)
  <span class="hljs-keyword">if</span>(n &lt;= <span class="hljs-number">1</span>) {
    <span class="hljs-keyword">return</span> s
  }
  s = n * s
  <span class="hljs-keyword">return</span> factorial(n<span class="hljs-number">-1</span>, s)
}
factorial(<span class="hljs-number">4</span>) <span class="hljs-comment">// 24</span></code></pre>
<p><strong>更多编程小技巧，请关注专栏 <a href="https://segmentfault.com/blog/hyyreact">前端架构经验分享</a></strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript系列——传统递归和尾调用的实现

## 原文链接
[https://segmentfault.com/a/1190000011324711](https://segmentfault.com/a/1190000011324711)

