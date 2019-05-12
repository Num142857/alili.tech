---
title: 'JavaScript中Map和ForEach的区别' 
date: 2018-12-13 2:30:07
hidden: true
slug: 61y3fpjtdmr
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>译者按：</strong> 惯用Haskell的我更爱map。</p>
<ul>
<li>原文: <a href="https://codeburst.io/javascript-map-vs-foreach-f38111822c0f" rel="nofollow noreferrer" target="_blank">JavaScript — Map vs. ForEach - What’s the difference between Map and ForEach in JavaScript?</a>
</li>
<li>译者: <a href="https://www.fundebug.com/" rel="nofollow noreferrer" target="_blank">Fundebug</a>
</li>
</ul>
<p><strong>为了保证可读性，本文采用意译而非直译。另外，本文版权归原作者所有，翻译仅用于学习。</strong></p>
<p>如果你已经有使用JavaScript的经验，你可能已经知道这两个看似相同的方法：<code>Array.prototype.map()</code>和<code>Array.prototype.forEach()</code>。</p>
<p>那么，它们到底有什么区别呢？</p>
<h3 id="articleHeader0">定义</h3>
<p>我们首先来看一看MDN上对Map和ForEach的定义：</p>
<ul>
<li>
<code>forEach()</code>: 针对每一个元素执行提供的函数(executes a provided function once for each array element)。</li>
<li>
<code>map()</code>: 创建一个新的数组，其中每一个元素由调用数组中的每一个元素执行提供的函数得来(creates a new array with the results of calling a provided function on every element in the calling array)。</li>
</ul>
<h3 id="articleHeader1">示例</h3>
<p>下方提供了一个数组，如果我们想将其中的每一个元素翻倍，我们可以使用<code>map</code>和<code>forEach</code>来达到目的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [1, 2, 3, 4, 5];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];</code></pre>
<h4>ForEach</h4>
<p>注意，<code>forEach</code>是不会返回有意义的值的。<br>我们在回调函数中直接修改<code>arr</code>的值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arr.forEach((num, index) => {
    return arr[index] = num * 2;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">arr.forEach(<span class="hljs-function">(<span class="hljs-params">num, index</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> arr[index] = num * <span class="hljs-number">2</span>;
});</code></pre>
<p>执行结果如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// arr = [2, 4, 6, 8, 10]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-comment">// arr = [2, 4, 6, 8, 10]</span></code></pre>
<h4>Map</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let doubled = arr.map(num => {
    return num * 2;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> doubled = arr.map(<span class="hljs-function"><span class="hljs-params">num</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> num * <span class="hljs-number">2</span>;
});</code></pre>
<p>执行结果如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// doubled = [2, 4, 6, 8, 10]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-comment">// doubled = [2, 4, 6, 8, 10]</span></code></pre>
<h3 id="articleHeader2">执行速度对比</h3>
<p><strong>jsPref</strong>是一个非常好的网站用来比较不同的JavaScript函数的执行速度。</p>
<p>这里是<code>forEach()</code>和<code>map()</code>的测试结果：</p>
<p><span class="img-wrap"><img data-src="/img/bV3Gfm?w=1600&amp;h=487" src="https://static.alili.tech/img/bV3Gfm?w=1600&amp;h=487" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到，在我的电脑上<code>forEach()</code>的执行速度比<code>map()</code>慢了70%。每个人的浏览器的执行结果会不一样。你可以使用下面的链接来测试一下: <a href="https://jsperf.com/map-vs-foreach-speed-test" rel="nofollow noreferrer" target="_blank">Map vs. forEach - jsPref</a>。</p>
<p><em>JavaScript太灵(gui)活(yi)了，出了BUG你也不知道，不妨接入<a href="https://www.fundebug.com" rel="nofollow noreferrer" target="_blank">Fundebug</a>线上实时监控</em>。</p>
<h3 id="articleHeader3">函数式角度的理解</h3>
<p>如果你习惯使用函数式编程，那么肯定喜欢使用<code>map()</code>。</p>
<h3 id="articleHeader4">哪个更好呢？</h3>
<p>取决于你想要做什么。</p>
<p><code>forEach</code>适合于你并不打算改变数据的时候，而只是想用数据做一些事情 -- 比如存入数据库或则打印出来。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = ['a', 'b', 'c', 'd'];
arr.forEach((letter) => {
    console.log(letter);
});
// a
// b
// c
// d" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> arr = [<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>, <span class="hljs-string">'d'</span>];
arr.forEach(<span class="hljs-function">(<span class="hljs-params">letter</span>) =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(letter);
});
<span class="hljs-comment">// a</span>
<span class="hljs-comment">// b</span>
<span class="hljs-comment">// c</span>
<span class="hljs-comment">// d</span></code></pre>
<p><code>map()</code>适用于你要改变数据值的时候。不仅仅在于它更快，而且返回一个新的数组。这样的优点在于你可以使用复合(composition)(map(), filter(), reduce()等组合使用)来玩出更多的花样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [1, 2, 3, 4, 5];
let arr2 = arr.map(num => num * 2).filter(num => num > 5);
// arr2 = [6, 8, 10]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];
<span class="hljs-keyword">let</span> arr2 = arr.map(<span class="hljs-function"><span class="hljs-params">num</span> =&gt;</span> num * <span class="hljs-number">2</span>).filter(<span class="hljs-function"><span class="hljs-params">num</span> =&gt;</span> num &gt; <span class="hljs-number">5</span>);
<span class="hljs-comment">// arr2 = [6, 8, 10]</span></code></pre>
<p>我们首先使用map将每一个元素乘以2，然后紧接着筛选出那些大于5的元素。最终结果赋值给<code>arr2</code>。</p>
<h3 id="articleHeader5">核心要点</h3>
<ul>
<li>能用<code>forEach()</code>做到的，<code>map()</code>同样可以。反过来也是如此。</li>
<li>
<code>map()</code>会分配内存空间存储新数组并返回，<code>forEach()</code>不会返回数据。</li>
<li>
<code>forEach()</code>允许<code>callback</code>更改原始数组的元素。<code>map()</code>返回新的数组。</li>
</ul>
<h3 id="articleHeader6">关于Fundebug</h3>
<p><a href="https://www.fundebug.com/" rel="nofollow noreferrer" target="_blank">Fundebug</a>专注于JavaScript、微信小程序、微信小游戏、支付宝小程序、React Native、Node.js和Java实时BUG监控。 自从2016年双十一正式上线，Fundebug累计处理了6亿+错误事件，得到了Google、360、金山软件等众多知名用户的认可。欢迎免费试用！</p>
<p><span class="img-wrap"><img data-src="/img/bVbhe1G?w=400&amp;h=225" src="https://static.alili.tech/img/bVbhe1G?w=400&amp;h=225" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader7">版权声明</h3>
<p>转载时请注明作者<a href="https://www.fundebug.com/" rel="nofollow noreferrer" target="_blank">Fundebug</a>以及本文地址：<br><a href="https://blog.fundebug.com/2018/02/05/map_vs_foreach/" rel="nofollow noreferrer" target="_blank">https://blog.fundebug.com/2018/02/05/map_vs_foreach/</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript中Map和ForEach的区别

## 原文链接
[https://segmentfault.com/a/1190000013368741](https://segmentfault.com/a/1190000013368741)

