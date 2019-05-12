---
title: '图解JavaScript的参数传递' 
date: 2018-12-19 2:30:07
hidden: true
slug: xlj6cce2dq
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">写在最前</h2>
<p>本次尝试通过流程图的形式并结合两个例子来重新理解一下JavaScript中的参数传递。</p>
<p>欢迎关注<a href="https://github.com/Aaaaaaaty/Blog" rel="nofollow noreferrer" target="_blank">我的博客</a>，不定期更新中——</p>
<h3 id="articleHeader1">参数到底如何传递？</h3>
<p>借用红宝书的一句话：</p>
<blockquote>ECMAScript中所有函数的参数都是按值传递的</blockquote>
<p>这个值如果是简单类型，那么就是其本身。如果是引用类型也就是对象传递的就是指向这个对象的地址。故我们可以认为参数传递全部都是值传递，那么具体怎么理解呢？看下例子：</p>
<h3 id="articleHeader2">第一个例子</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
    n: 1
};
function foo(data) {
    data = 2;
    console.log(data); //2
}
foo(obj);
console.log(obj.n) // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">n</span>: <span class="hljs-number">1</span>
};
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">data</span>) </span>{
    data = <span class="hljs-number">2</span>;
    <span class="hljs-built_in">console</span>.log(data); <span class="hljs-comment">//2</span>
}
foo(obj);
<span class="hljs-built_in">console</span>.log(obj.n) <span class="hljs-comment">// 1</span></code></pre>
<p>先不说为什么原因，我们就通过画图的方式来走一遍流程，我相信应该就能理解其中的参数传递了。切记传递引用类型传递的是指针！<br><span class="img-wrap"><img data-src="/img/remote/1460000012672380?w=769&amp;h=281" src="https://static.alili.tech/img/remote/1460000012672380?w=769&amp;h=281" alt="image" title="image" style="cursor: pointer; display: inline;"></span><br>首先执行<code>var obj = {n: 1}; </code>，可以看作在栈的001地址中存入了一个指向<code>{n:1}</code>的指针*p<br><span class="img-wrap"><img data-src="/img/remote/1460000012672381?w=743&amp;h=200" src="https://static.alili.tech/img/remote/1460000012672381?w=743&amp;h=200" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>接下来为声明<code>function foo </code>此时会创建函数执行上下文，产生一个变量对象，其中声明了形参data，由于函数没有执行，当前值为undefined。我们记data地址为022。关于更多变量对象的知识可以参考冴羽老师的这篇<a href="https://github.com/mqyqingfeng/Blog/issues/5" rel="nofollow noreferrer" target="_blank">JavaScript深入之变量对象</a>，本文不深入研究关于AO相关，你只需要知道在声明这个函数的时候里面的形参已经被创建出来了。<br><span class="img-wrap"><img data-src="/img/remote/1460000012672382?w=775&amp;h=302" src="https://static.alili.tech/img/remote/1460000012672382?w=775&amp;h=302" alt="" title="" style="cursor: pointer; display: inline;"></span><br>执行<code>foo(obj) </code>其中会进行参数传递，其中将obj中存储的*p拷贝给处在022地址的data，那么此时它们就指向了同一个对象，如果某一个变量更改了n的值，另一个变量中n的值也会更改，因为其中保存的是指针。<br><span class="img-wrap"><img data-src="/img/remote/1460000012672383?w=677&amp;h=205" src="https://static.alili.tech/img/remote/1460000012672383?w=677&amp;h=205" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>进入函数内部，顺序执行<code>data = 2;</code>此时002地址存储了基本类型值，则直接存储在栈中，从而与堆中的{n:1}失去了联系。从而打印<code>console.log(data) // 2 </code>，最后发现初始开辟的{n:1}对象没有过更改，故而<code> console.log(obj.n) // 1</code>仍然打印1。</p>
<h3 id="articleHeader3">第二个例子</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {n:1};
(function(obj){
  console.log(obj.n); //1
  obj.n=3;
  var obj = {n:2};
  console.log(obj.n) //2
})(obj);
console.log(obj.n) //3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> obj = {<span class="hljs-attr">n</span>:<span class="hljs-number">1</span>};
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>)</span>{
  <span class="hljs-built_in">console</span>.log(obj.n); <span class="hljs-comment">//1</span>
  obj.n=<span class="hljs-number">3</span>;
  <span class="hljs-keyword">var</span> obj = {<span class="hljs-attr">n</span>:<span class="hljs-number">2</span>};
  <span class="hljs-built_in">console</span>.log(obj.n) <span class="hljs-comment">//2</span>
})(obj);
<span class="hljs-built_in">console</span>.log(obj.n) <span class="hljs-comment">//3</span></code></pre>
<p>整体来看这个例子中出现了同名覆盖的问题。不太了解代码如何执行的流程，可能会因为同名的关系而有些混乱，不过没关系。只要按照上一个例子的流程图中的执行过程，一定可以得出正确的结果。<br><span class="img-wrap"><img data-src="/img/remote/1460000012672384?w=763&amp;h=226" src="https://static.alili.tech/img/remote/1460000012672384?w=763&amp;h=226" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>声明变量obj，地址为011其中存入指向{n:1}的指针*p<br><span class="img-wrap"><img data-src="/img/remote/1460000012672385?w=761&amp;h=203" src="https://static.alili.tech/img/remote/1460000012672385?w=761&amp;h=203" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>声明函数，虽然同为obj变量名，但是形参obj为AO中的属性，不会与全局造成覆盖，其拥有新的地址记作022，在未执行前其值为undefined。<br><span class="img-wrap"><img data-src="/img/remote/1460000012672386?w=810&amp;h=293" src="https://static.alili.tech/img/remote/1460000012672386?w=810&amp;h=293" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>函数立即执行，此时将全局obj赋值给形参obj，我们忽略这个重复命名的问题，其实就是将011中的 指针*p拷贝了一份给了022。同时执行第一个<code>console.log(obj.n)</code>结果即为1。<br><span class="img-wrap"><img data-src="/img/remote/1460000012672387?w=569&amp;h=202" src="https://static.alili.tech/img/remote/1460000012672387?w=569&amp;h=202" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>执行<code>obj.n=3</code>，此时为函数的形参即022中的obj来改变了对象内n的值。<br><span class="img-wrap"><img data-src="/img/remote/1460000012672388?w=716&amp;h=266" src="https://static.alili.tech/img/remote/1460000012672388?w=716&amp;h=266" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><strong>最关键的一步</strong>：<code>var obj = {n:2}; </code>由于对象命名的关系可能很多童鞋就会有点懵，但依然按照同样的方式来分析即可，由于使用了var那么就是新声明一个对象，从而会在栈中压入新的地址记作033，其中存入了新的指针指向了新的对象{n:2}。从而之后打印的<code>console.log(obj.n)</code>结果则应是新开辟的对象中的n的值。</p>
<p>最后打印<code> console.log(obj.n) //3</code>很显然，全局的对象有过一次更改其值为3。</p>
<h3 id="articleHeader4">小结</h3>
<p>至此我们走完了上述两段代码涉及变量的所有“心路历程”，由于作者不是科班出身，这个图中对于堆栈以及变量重名的描述可能不是非常的准确，有差错的地方还望不吝赐教~重点是能理解我希望表达的意思就好。总的来说关键点就在于传参的过程中存在一次值的拷贝，同时如果赋值对象是引用类型传入的是指针，明白这两点之后再加上之前流程图的分析相信再遇到类似的问题都可以有较为一致的思路了。</p>
<h2 id="articleHeader5">最后</h2>
<p>惯例po<a href="https://github.com/Aaaaaaaty/Blog" rel="nofollow noreferrer" target="_blank">作者的博客</a>，不定时更新中——<br>有问题欢迎在issues下交流。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
图解JavaScript的参数传递

## 原文链接
[https://segmentfault.com/a/1190000012672374](https://segmentfault.com/a/1190000012672374)

