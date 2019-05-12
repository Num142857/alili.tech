---
title: 'Lodash学习笔记 - chunk函数' 
date: 2018-12-10 2:30:07
hidden: true
slug: 0snn8gfg6ek
categories: [reprint]
---

{{< raw >}}

                    
<p>百忙之中（闲来无事）想抽点时间好好读一下源码，于是就选了Lodash来写一个系列罢。读源码顺序就按照loadsh文档顺序来。</p>
<p>文档地址：<a href="http://www.css88.com/doc/lodash/" rel="nofollow noreferrer" target="_blank">中文文档</a>&nbsp;&nbsp; <a href="https://lodash.com/docs/4.17.5" rel="nofollow noreferrer" target="_blank">英文文档</a><br>源码地址：<a href="https://github.com/lodash/lodash" rel="nofollow noreferrer" target="_blank">gayhub</a></p>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    _.chunk(array, [size=1])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">    _.chunk(array, [size=<span class="hljs-number">1</span>])</code></pre>
<p>将数组<code>array</code>拆分成多个 <code>size</code> 长度的区块，并将这些区块组成一个新数组。 如果<code>array</code> 无法被分割成全部等长的区块，那么最后剩余的元素将组成一个区块。</p>
<p>例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    chunk(['a', 'b', 'c', 'd'], 2)
    // => [['a', 'b'], ['c', 'd']]
     
    chunk(['a', 'b', 'c', 'd'], 3)
    // => [['a', 'b', 'c'], ['d']]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    chunk([<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>, <span class="hljs-string">'d'</span>], <span class="hljs-number">2</span>)
    <span class="hljs-comment">// =&gt; [['a', 'b'], ['c', 'd']]</span>
     
    chunk([<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>, <span class="hljs-string">'d'</span>], <span class="hljs-number">3</span>)
    <span class="hljs-comment">// =&gt; [['a', 'b', 'c'], ['d']]</span></code></pre>
<p>很实用的一个函数，下面来看下具体实现：</p>
<ul>
<li>
<p>可以看到，<code>chunk</code>依赖了<code>slice.js</code>，具体实现解析已经讲过了：<a href="https://segmentfault.com/a/1190000013703023">传送门</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    import slice from './slice.js'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">    <span class="hljs-keyword">import</span> slice <span class="hljs-keyword">from</span> <span class="hljs-string">'./slice.js'</span></code></pre>
</li>
<li>
<p>首先是参数的验证</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="size = Math.max(size, 0)
const length = array == null ? 0 : array.length
if (!length || size < 1) {
    return []
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">size = <span class="hljs-built_in">Math</span>.max(size, <span class="hljs-number">0</span>)
<span class="hljs-keyword">const</span> length = array == <span class="hljs-literal">null</span> ? <span class="hljs-number">0</span> : array.length
<span class="hljs-keyword">if</span> (!length || size &lt; <span class="hljs-number">1</span>) {
    <span class="hljs-keyword">return</span> []
}</code></pre>
</li>
<li>
<p>根据<code>length/size</code>向上取整来确定新的数组长度，循环调用切片函数<code>slice</code>，最后返回结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let index = 0
let resIndex = 0
const result = new Array(Math.ceil(length / size))
while (index < length) {
    result[resIndex++] = slice(array, index, (index += size))
}
return result" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> index = <span class="hljs-number">0</span>
<span class="hljs-keyword">let</span> resIndex = <span class="hljs-number">0</span>
<span class="hljs-keyword">const</span> result = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-built_in">Math</span>.ceil(length / size))
<span class="hljs-keyword">while</span> (index &lt; length) {
    result[resIndex++] = slice(array, index, (index += size))
}
<span class="hljs-keyword">return</span> result</code></pre>
</li>
</ul>
<p>最后贴个源码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import slice from './slice.js'

/**
 * Creates an array of elements split into groups the length of `size`.
 * If `array` can't be split evenly, the final chunk will be the remaining
 * elements.
 *
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to process.
 * @param {number} [size=1] The length of each chunk
 * @returns {Array} Returns the new array of chunks.
 * @example
 *
 * chunk(['a', 'b', 'c', 'd'], 2)
 * // => [['a', 'b'], ['c', 'd']]
 *
 * chunk(['a', 'b', 'c', 'd'], 3)
 * // => [['a', 'b', 'c'], ['d']]
 */
function chunk(array, size) {
  size = Math.max(size, 0)
  const length = array == null ? 0 : array.length
  if (!length || size < 1) {
    return []
  }
  let index = 0
  let resIndex = 0
  const result = new Array(Math.ceil(length / size))

  while (index < length) {
    result[resIndex++] = slice(array, index, (index += size))
  }
  return result
}

export default chunk" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> slice <span class="hljs-keyword">from</span> <span class="hljs-string">'./slice.js'</span>

<span class="hljs-comment">/**
 * Creates an array of elements split into groups the length of `size`.
 * If `array` can't be split evenly, the final chunk will be the remaining
 * elements.
 *
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to process.
 * @param {number} [size=1] The length of each chunk
 * @returns {Array} Returns the new array of chunks.
 * @example
 *
 * chunk(['a', 'b', 'c', 'd'], 2)
 * // =&gt; [['a', 'b'], ['c', 'd']]
 *
 * chunk(['a', 'b', 'c', 'd'], 3)
 * // =&gt; [['a', 'b', 'c'], ['d']]
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">chunk</span>(<span class="hljs-params">array, size</span>) </span>{
  size = <span class="hljs-built_in">Math</span>.max(size, <span class="hljs-number">0</span>)
  <span class="hljs-keyword">const</span> length = array == <span class="hljs-literal">null</span> ? <span class="hljs-number">0</span> : array.length
  <span class="hljs-keyword">if</span> (!length || size &lt; <span class="hljs-number">1</span>) {
    <span class="hljs-keyword">return</span> []
  }
  <span class="hljs-keyword">let</span> index = <span class="hljs-number">0</span>
  <span class="hljs-keyword">let</span> resIndex = <span class="hljs-number">0</span>
  <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-built_in">Math</span>.ceil(length / size))

  <span class="hljs-keyword">while</span> (index &lt; length) {
    result[resIndex++] = slice(array, index, (index += size))
  }
  <span class="hljs-keyword">return</span> result
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> chunk</code></pre>
<hr>
<p><span class="img-wrap"><img data-src="/img/bV5Jgc?w=352&amp;h=469" src="https://static.alili.tech/img/bV5Jgc?w=352&amp;h=469" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Lodash学习笔记 - chunk函数

## 原文链接
[https://segmentfault.com/a/1190000013722760](https://segmentfault.com/a/1190000013722760)

