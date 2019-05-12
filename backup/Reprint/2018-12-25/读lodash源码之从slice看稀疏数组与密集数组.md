---
title: '读lodash源码之从slice看稀疏数组与密集数组' 
date: 2018-12-25 2:30:11
hidden: true
slug: j28bsmkafur
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>
<p>卑鄙是卑鄙者的通行证，高尚是高尚者的墓志铭。</p>
<p>——北岛《回答》</p>
</blockquote>
<p>看北岛就是从这两句诗开始的，高尚者已死，只剩卑鄙者在世间横行。</p>
<p>本文为读 lodash 源码的第一篇，后续文章会更新到这个仓库中，欢迎 star：<a href="https://github.com/yeyuqiudeng/pocket-lodash" rel="nofollow noreferrer" target="_blank">pocket-lodash</a></p>
<p>gitbook也会同步仓库的更新，gitbook地址：<a href="https://www.gitbook.com/book/yeyuqiudeng/pocket-lodash/details" rel="nofollow noreferrer" target="_blank">pocket-lodash</a></p>
<h2 id="articleHeader0">引言</h2>
<p>你可能会有点奇怪，原生的 slice 方法基本没有兼容性的问题，为什么 lodash 还要实现一个 slice  方法呢？</p>
<p>这个问题，lodash 的作者已经在 <a href="https://github.com/lodash/lodash/issues/2850" rel="nofollow noreferrer" target="_blank">why not the 'baseslice' func use Array.slice(), loop faster than slice?</a> 的 issue 中给出了答案：lodash 的 slice 会将数组当成密集数组对待，原生的 slice 会将数组当成稀疏数组对待。</p>
<h2 id="articleHeader1">密集数组VS稀疏数组</h2>
<p>我们先来看看犀牛书是怎样定义稀疏数组的：</p>
<blockquote><p>稀疏数组就是包含从0开始的不连续索引的数组。通常，数组的length属性值代表数组中元素的个数。如果数组是稀疏的，length属性值大于元素的个数。</p></blockquote>
<p>如果数组是稀疏的，那么这个数组中至少有一个以上的位置不存在元素（包括 <code>undefined</code> ）。</p>
<p>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sparse = new Array(10)
var dense = new Array(10).fill(undefined)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> sparse = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-number">10</span>)
<span class="hljs-keyword">var</span> dense = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-number">10</span>).fill(<span class="hljs-literal">undefined</span>)</code></pre>
<p>其中 <code>sparse</code> 的 <code>length</code> 为10，但是 <code>sparse</code> 数组中没有元素，是稀疏数组；而 <code>dense</code> 每个位置都是有元素的，虽然每个元素都为<code>undefined</code>，为密集数组 。</p>
<p>那稀疏数组和密集数组有什么区别呢？在 lodash 中最主要考虑的是两者在迭代器中的表现。</p>
<p>稀疏数组在迭代的时候会跳过不存在的元素。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sparse.forEach(function(item){
  console.log(item)
})
dense.forEach(function(item){
  console.log(item)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">sparse.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>)</span>{
  <span class="hljs-built_in">console</span>.log(item)
})
dense.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>)</span>{
  <span class="hljs-built_in">console</span>.log(item)
})</code></pre>
<p><code>sparse</code> 根本不会调用 <code>console.log</code> 打印任何东西，但是 <code>dense</code> 会打印出10个 <code>undefined</code> 。</p>
<h2 id="articleHeader2">源码总览</h2>
<p>当然，除了对待稀疏数组跟原生的 slice 不一致外，其他的规则还是一样的，下面是 lodash 实现 slice 的源码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function slice(array, start, end) {
  let length = array == null ? 0 : array.length
  if (!length) {
    return []
  }
  start = start == null ? 0 : start
  end = end === undefined ? length : end

  if (start < 0) {
    start = -start > length ? 0 : (length + start)
  }
  end = end > length ? length : end
  if (end < 0) {
    end += length
  }
  length = start > end ? 0 : ((end - start) >>> 0)
  start >>>= 0

  let index = -1
  const result = new Array(length)
  while (++index < length) {
    result[index] = array[index + start]
  }
  return result
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">slice</span>(<span class="hljs-params">array, start, end</span>) </span>{
  <span class="hljs-keyword">let</span> length = array == <span class="hljs-literal">null</span> ? <span class="hljs-number">0</span> : array.length
  <span class="hljs-keyword">if</span> (!length) {
    <span class="hljs-keyword">return</span> []
  }
  start = start == <span class="hljs-literal">null</span> ? <span class="hljs-number">0</span> : start
  end = end === <span class="hljs-literal">undefined</span> ? length : end

  <span class="hljs-keyword">if</span> (start &lt; <span class="hljs-number">0</span>) {
    start = -start &gt; length ? <span class="hljs-number">0</span> : (length + start)
  }
  end = end &gt; length ? length : end
  <span class="hljs-keyword">if</span> (end &lt; <span class="hljs-number">0</span>) {
    end += length
  }
  length = start &gt; end ? <span class="hljs-number">0</span> : ((end - start) &gt;&gt;&gt; <span class="hljs-number">0</span>)
  start &gt;&gt;&gt;= <span class="hljs-number">0</span>

  <span class="hljs-keyword">let</span> index = <span class="hljs-number">-1</span>
  <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(length)
  <span class="hljs-keyword">while</span> (++index &lt; length) {
    result[index] = array[index + start]
  }
  <span class="hljs-keyword">return</span> result
}</code></pre>
<h2 id="articleHeader3">不传参的情况</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let length = array == null ? 0 : array.length
if (!length) {
  return []
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> length = array == <span class="hljs-literal">null</span> ? <span class="hljs-number">0</span> : array.length
<span class="hljs-keyword">if</span> (!length) {
  <span class="hljs-keyword">return</span> []
}</code></pre>
<p>不传参时，<code>length</code> 默认为0，否则获取数组的长度。注意这里用的是 <code>array == null</code> ，非 <code>array === null</code> ，包含了 <code>undefined</code> 的判断。</p>
<p>所以在不传参调用 lodash 的 slice 时，返回的是空数组，而原生的 slice 没有这种调用方式。</p>
<h2 id="articleHeader4">处理start参数</h2>
<p><code>start</code> 参数用来指定截取的开始位置。</p>
<p>先来看下 MDN 对该参数的描述：</p>
<blockquote>
<p>如果该参数为负数，则表示从原数组中的倒数第几个元素开始提取。</p>
<p>如果省略，则从索引0开始</p>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="start = start == null ? 0 : start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">start = start == <span class="hljs-literal">null</span> ? <span class="hljs-number">0</span> : start</code></pre>
<p>因此这段是处理省略的情况，省略时，默认值为0。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (start < 0) {
  start = -start > length ? 0 : (length + start)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (start &lt; <span class="hljs-number">0</span>) {
  start = -start &gt; length ? <span class="hljs-number">0</span> : (length + start)
}</code></pre>
<p>这段是处理负数的情况。</p>
<p>如果负数取反后比数组的长度还要大，即超出了数组的范围，则取值为0，表示从开始的位置截取，否则用 <code>length + start</code> ，即向后倒数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="start >>>= 0" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">start &gt;&gt;&gt;= <span class="hljs-number">0</span></code></pre>
<p>最后，用在 <code>&gt;&gt;&gt;</code> 来确保 <code>start</code> 参数为整数或0。</p>
<p>因为 lodash 的 slice 除了可以处理数组外，也可以处理类数组，因此第一个参数 <code>array</code> 可能为一个对象， <code>length</code> 属性不一定为数字。</p>
<h2 id="articleHeader5">处理end参数</h2>
<p><code>end</code> 参数用来指定截取的结束位置。</p>
<p>同样来看下 MDN 对些的描述：</p>
<blockquote>
<p>如果该参数为负数，则它表示在原数组中的倒数第几个元素结束制取。</p>
<p>如果end被省略，则slice会一直提取到原数组的末尾。</p>
<p>如果end大于数组长度，slice也会一直提取到原数组末尾。</p>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="end = end === undefined ? length : end" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">end = end === <span class="hljs-literal">undefined</span> ? length : end</code></pre>
<p>这段是处理 <code>end</code> 被省略的情况，省略时，<code>end</code> 默认为为 <code>length</code>，即截取到数组的末尾。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="end = end > length ? length : end" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">end = end &gt; length ? length : end</code></pre>
<p>这是处理 <code>end</code> 比数组长度大的情况，如果被数组长度大，也会截取到数组的末尾。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (end < 0) {
  end += length
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (end &lt; <span class="hljs-number">0</span>) {
  end += length
}</code></pre>
<p>这段是处理负值的情况，如果为负值，则从数组末尾开始向前倒数。</p>
<p>这里没有像 <code>start</code> 一样控制 <code>end</code> 的向前倒数完后是否为负数，因为后面还有一层控制。</p>
<h2 id="articleHeader6">获取新数组的长度</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="length = start > end ? 0 : ((end - start) >>> 0)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">length = start &gt; end ? <span class="hljs-number">0</span> : ((end - start) &gt;&gt;&gt; <span class="hljs-number">0</span>)</code></pre>
<p>新数组的长度计算方式很简单，就是用 <code>edn - start</code> 即可得出。</p>
<p>上面说到，没有控制最终 <code>end</code> 是否为负数的情况。这里用的是 <code>start</code> 和 <code>end</code> 的比较，如果 <code>start</code> 比 <code>end</code> 大，则新数组长度为0，即返回一个空数组。否则用 <code>end - start</code> 来计算。</p>
<p>这里同样用了无符号右移位运算符来确保 <code>length</code> 为正数或0。</p>
<h2 id="articleHeader7">截取并返回新数组</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let index = -1
const result = new Array(length)
while (++index < length) {
  result[index] = array[index + start]
}
return result" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> index = <span class="hljs-number">-1</span>
<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(length)
<span class="hljs-keyword">while</span> (++index &lt; length) {
  result[index] = array[index + start]
}
<span class="hljs-keyword">return</span> result</code></pre>
<p><code>result</code> 为新数组容器。</p>
<p>用 <code>while</code> 循环，从 <code>start</code> 位置开始，获取原数组的值，依次存入新的数组中。</p>
<p>因为是通过索引取值，如果遇到稀疏数组，对应的索引值上没有元素时，通过数组索引取值返回的是 <code>undefined</code>， 但这并不是说稀疏数组中该位置的值为 <code>undefined</code> 。</p>
<p>最后将 <code>result</code> 返回。</p>
<h2 id="articleHeader8">参考</h2>
<ol>
<li><p>javascript权威指南(第6版), David Flanagan著,淘宝前端团队译,机械工业出版社</p></li>
<li><p><a href="https://github.com/lodash/lodash/issues/2850" rel="nofollow noreferrer" target="_blank">why not the 'baseslice' func use Array.slice(), loop faster than slice?</a></p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice" rel="nofollow noreferrer" target="_blank">Array.prototype.slice()</a></p></li>
<li><p><a href="http://2ality.com/2012/06/dense-arrays.html" rel="nofollow noreferrer" target="_blank">JavaScript: sparse arrays vs. dense arrays</a></p></li>
<li><p><a href="http://www.cnblogs.com/ziyunfei/archive/2012/09/16/2687165.html" rel="nofollow noreferrer" target="_blank">【译】JavaScript中的稀疏数组与密集数组</a></p></li>
</ol>
<h2 id="articleHeader9">License</h2>
<p><a href="http://creativecommons.org/licenses/by-nc-nd/4.0/" rel="nofollow noreferrer" target="_blank">署名-非商业性使用-禁止演绎 4.0 国际 (CC BY-NC-ND 4.0)</a></p>
<p>最后，所有文章都会同步发送到微信公众号上，欢迎关注,欢迎提意见：  <span class="img-wrap"><img data-src="/img/remote/1460000011338189" src="https://static.alili.tech/img/remote/1460000011338189" alt="" title="" style="cursor: pointer;"></span></p>
<p>作者：对角另一面</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
读lodash源码之从slice看稀疏数组与密集数组

## 原文链接
[https://segmentfault.com/a/1190000012074005](https://segmentfault.com/a/1190000012074005)

