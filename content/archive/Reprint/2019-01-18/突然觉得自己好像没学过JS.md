---
title: '突然觉得自己好像没学过JS' 
date: 2019-01-18 2:30:34
hidden: true
slug: bw1wb7yyeog
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">先看题：mean的值是什么？</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var scores = [10,11,12];
var total = 0;

for(var score in scores){
  total += score;
}

var mean = total/scores.length;
console.log(mean);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> scores = [10,11,12];
<span class="hljs-keyword">var</span> <span class="hljs-keyword">total</span> = 0;

<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> <span class="hljs-keyword">score</span> <span class="hljs-keyword">in</span> scores){
  <span class="hljs-keyword">total</span> += <span class="hljs-keyword">score</span>;
}

<span class="hljs-keyword">var</span> <span class="hljs-keyword">mean</span> = <span class="hljs-keyword">total</span>/scores.length;
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">mean</span>);</code></pre>
<h2 id="articleHeader1">是11？</h2>
<p>恭喜你：答错了！</p>
<h2 id="articleHeader2">是1？</h2>
<p>恭喜你：答错了！</p>
<h2 id="articleHeader3">正确答案： 4</h2>
<p>解释： <code>for in 循环循环的值永远是key, key是一个字符串</code>。所以total的值是：'0012'。它是一个字符串，字符串'0012'/3,0012会被转换成12，然后除以3，结果是4。</p>
<h2 id="articleHeader4">后记</h2>
<p>这个示例是来自《编写高质量JavaScript的68个方法》的第49条：<code>数组迭代要优先使用for循环而不是for in循环</code>。<br>既然已经发布，就可能有好事者拿出去当面试题。这个题目很有可能坑一堆人。其中包括我。</p>
<p>这里涉及到许多js的基础知识.</p>
<ol>
<li><code>for in 循环是循环对象的索引属性，key是一个字符串。</code></li>
<li><code>数值类型和字符串相加，会自动转换为字符串</code></li>
<li><code>字符串除以数值类型，会先把字符串转为数值，最终结果为数值</code></li>
</ol>
<p>正确方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var scores = [10,11,12];
var total = 0;

for(var i=0, n=scores.length; i < n; i++){
  total += scores[i];
}

var mean = total/scores.length;
console.log(mean);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">var</span> scores = [10,11,12];
<span class="hljs-keyword">var</span> <span class="hljs-keyword">total</span> = 0;

<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=0, <span class="hljs-keyword">n</span>=scores.length; i &lt; <span class="hljs-keyword">n</span>; i++){
  <span class="hljs-keyword">total</span> += scores[i];
}

<span class="hljs-keyword">var</span> <span class="hljs-keyword">mean</span> = <span class="hljs-keyword">total</span>/scores.length;
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">mean</span>);</code></pre>
<p>这样写有几个好处。</p>
<ul>
<li>循环的终止条件简单且明确</li>
<li>即使在循环体内修改了数组，也能有效的终止循环。否则就可能变成死循环。</li>
<li>编译器很难保证重启计算scores.length是安全的。</li>
<li>提前确定了循环终止条件，避免多次计算数组长度。这个可能会被一些浏览器优化。</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
突然觉得自己好像没学过JS

## 原文链接
[https://segmentfault.com/a/1190000008823431](https://segmentfault.com/a/1190000008823431)

