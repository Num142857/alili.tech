---
title: 'JS基础-连续赋值' 
date: 2019-01-26 2:30:18
hidden: true
slug: r0kewiatdoa
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">引子</h3>
<p>今天同事聊天群里发现了一道面试题(js基础)，但答案基本没有几个能答对并且理解的很透彻的。</p>
<h3 id="articleHeader1">问题</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = {n: 1};

var b = a;  

a.x = a = {n: 2};

console.log(a.x);  
console.log(b.x);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>var a = {n: <span class="hljs-number">1</span>}<span class="hljs-comment">;</span>

var <span class="hljs-keyword">b </span>= a<span class="hljs-comment">;  </span>

a.x = a = {n: <span class="hljs-number">2</span>}<span class="hljs-comment">;</span>

console.log(a.x)<span class="hljs-comment">;  </span>
console.log(<span class="hljs-keyword">b.x);</span></code></pre>
<p>先不说答案，可能有些人已经答错了~</p>
<h3 id="articleHeader2">错误的答案</h3>
<p>这多简单!JS赋值运算右结合！那就分开算呗！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a = {n: 2}
a.x = a
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">a</span> = {n: <span class="hljs-number">2</span>}
<span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.x</span> = <span class="hljs-selector-tag">a</span>
</code></pre>
<p>然后错误的答案就这么产生了，a.x = {n: 2}</p>
<h3 id="articleHeader3">正解</h3>
<p>其实这道题看似简单但还是有一些绕，我依稀记得高中数学老师那句经典的口头禅！<br>遇到难题：画图啊！<br>好吧，这句话可能我会受用一辈子，同时也送给看这篇文章的同学，希望能给你们编程带来一些新的思路。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = {n: 1};

var b = a; " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">var a</span> = {n: 1};

<span class="hljs-attribute">var b</span> = a; </code></pre>
<ul><li><p>画图</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVJI16?w=734&amp;h=325" src="https://static.alili.tech/img/bVJI16?w=734&amp;h=325" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这句话也是关键所在</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a.x = a = {n: 2};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code style="word-break: break-word; white-space: initial;">a.<span class="hljs-attr">x</span> = <span class="hljs-attr">a</span> = {n: <span class="hljs-number">2</span>};</code></pre>
<ul><li><p>画图</p></li></ul>
<p>根据js引擎语法解析，会先去从左到右寻找有没有未声明的变量，如果有就把该变量提升至作用域顶部并声明该变量。那么恭喜js引擎他找到a.x这个属性没有声明，那么他会在{n: 1}这个内存区声明一个x属性等待赋值！</p>
<p>语法解析完成后，开始进行运算(ps：赋值运算),首先将a变量的指针指向了一个新的内存区{n: 2},那么a变量脱离了对内存区{n: 1}的引用关系。</p>
<p>但是此时{n:1 }这个内存区并没有被GC回收因为b变量的指针依然指向它。并且因为之前就声明了x属性所以该内存区<br>增加了X属性。那么X属性指向哪儿呢？a.x = a = {n: 2}它的返回值就是{n: 2}的内存区。</p>
<p>如下图：<br><span class="img-wrap"><img data-src="/img/bVJI3h?w=871&amp;h=501" src="https://static.alili.tech/img/bVJI3h?w=871&amp;h=501" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>那么根据图上可得:<br>a.x 不存在,故: =&gt; undefined(ps：因为JS的缺陷这里应当报个错啥的~ Undefind reference)<br>b.x =&gt; {n: 2}</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS基础-连续赋值

## 原文链接
[https://segmentfault.com/a/1190000008475665](https://segmentfault.com/a/1190000008475665)

