---
title: 'Lodash源码讲解-slice函数' 
date: 2019-01-04 2:30:10
hidden: true
slug: nmv5aqeu0qe
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文首发于<a href="https://dreamapple.me/2017/08/13/lodash%E6%BA%90%E7%A0%81%E8%AE%B2%E8%A7%A3-1/" rel="nofollow noreferrer" target="_blank">技术风暴-Lodash源码讲解</a></p></blockquote>
<p>这是我们阅读源码的第1篇博客，这一篇博客主要介绍<a href="https://lodash.com/" rel="nofollow noreferrer" target="_blank">Lodash</a>的<a href="https://github.com/lodash/lodash/blob/master/slice.js" rel="nofollow noreferrer" target="_blank">slice</a>函数，这个函数内部的实现没有依赖别的函数；我们这篇博客就来讲解一下这个slice函数。</p>
<p>我们首先来看一下这个函数的源码，源码如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * Creates a slice of `array` from `start` up to, but not including, `end`.
 *
 * **Note:** This method is used instead of
 * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are
 * returned.
 *
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function slice(array, start, end) {
  // #1  
  let length = array == null ? 0 : array.length
  if (!length) {
    return []
  }
  // #2
  start = start == null ? 0 : start
  end = end === undefined ? length : end
    
  // #3  
  if (start < 0) {
    start = -start > length ? 0 : (length + start)
  }
  end = end > length ? length : end
  if (end < 0) {
    end += length
  }
  // #4
  length = start > end ? 0 : ((end - start) >>> 0)
  start >>>= 0

  // #5 
  let index = -1
  const result = new Array(length)
  while (++index < length) {
    result[index] = array[index + start]
  }
  return result
}

export default slice" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * Creates a slice of `array` from `start` up to, but not including, `end`.
 *
 * **Note:** This method is used instead of
 * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are
 * returned.
 *
 * @since 3.0.0
 * @category Array
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">slice</span>(<span class="hljs-params">array, start, end</span>) </span>{
  <span class="hljs-comment">// #1  </span>
  <span class="hljs-keyword">let</span> length = array == <span class="hljs-literal">null</span> ? <span class="hljs-number">0</span> : array.length
  <span class="hljs-keyword">if</span> (!length) {
    <span class="hljs-keyword">return</span> []
  }
  <span class="hljs-comment">// #2</span>
  start = start == <span class="hljs-literal">null</span> ? <span class="hljs-number">0</span> : start
  end = end === <span class="hljs-literal">undefined</span> ? length : end
    
  <span class="hljs-comment">// #3  </span>
  <span class="hljs-keyword">if</span> (start &lt; <span class="hljs-number">0</span>) {
    start = -start &gt; length ? <span class="hljs-number">0</span> : (length + start)
  }
  end = end &gt; length ? length : end
  <span class="hljs-keyword">if</span> (end &lt; <span class="hljs-number">0</span>) {
    end += length
  }
  <span class="hljs-comment">// #4</span>
  length = start &gt; end ? <span class="hljs-number">0</span> : ((end - start) &gt;&gt;&gt; <span class="hljs-number">0</span>)
  start &gt;&gt;&gt;= <span class="hljs-number">0</span>

  <span class="hljs-comment">// #5 </span>
  <span class="hljs-keyword">let</span> index = <span class="hljs-number">-1</span>
  <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(length)
  <span class="hljs-keyword">while</span> (++index &lt; length) {
    result[index] = array[index + start]
  }
  <span class="hljs-keyword">return</span> result
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> slice</code></pre>
<p>首先我们来说一下这个函数的作用，它的作用就是获取一个数组的切片；所谓切片，就是指数组的一部分连续元素，当然也可以是数组的全部元素。我们这时可能想到了数组本身就有一个<a href="https://mdn.io/Array/slice" rel="nofollow noreferrer" target="_blank"><code>slice</code></a>方法，那我们为什么不使用原生的数组的那个<code>slice</code>方法而非要自己重新写一个呢？</p>
<p>有两个原因：</p>
<ul>
<li>更好的兼容性，确保了IE浏览器在版本小于9的情况下，对于元素节点列表的操作可以返回一个<a href="http://2ality.com/2012/06/dense-arrays.html" rel="nofollow noreferrer" target="_blank">密集的数组(dense-arrays,这个不太好翻译)</a>
</li>
<li>比原生的方法效率更高，这个会在本文的后面有一个对比图。</li>
</ul>
<p>下面我们就来好好看一下这个函数，首先这个函数需要接收三个参数，但是后两个参数不是必须选择的；第一个参数是一个数组，可以是元素的节点集合；第二个参数表示开始截取切片的位置，第三个参数表示的是切片截取的截至位置，但是不包含这个数所在位置的元素。</p>
<p>接下来是分步骤的讲解，我在相应的位置做了标记，大家看的时候可以找标记的位置，下面的讲解就是按照标记的位置来的。</p>
<ul>
<li>
<code>#1</code>：我们使用了三目运算符来判断是否传入了一个数组，如果没有传入数组我们直接把数组的长度设置为0；反之，我们就获取数组的长度；然后做了一个判断，如果数组的长度为0，我们直接返回一个空的数组。</li>
<li>
<code>#2</code>：判断参数<code>start</code>和<code>end</code>是否存在；如果都存在的话，就取传入的这个值；如果不存在的话，<code>start</code>的取值默认为<code>0</code>, <code>end</code>的取值默认为数组的长度。</li>
<li>
<code>#3</code>：判断参数<code>start</code>是否是负数；如果<code>start</code>是负数的话，再比较一下<code>start</code>的相反数与数组长度的大小，如果大于数组的长度，那么就赋值为0；反之，就把<code>start</code>赋值为<code>length + start</code>，也就是从数组的后面开始数开始截取的位置；然后判断一下<code>end</code>是否大于数组的长度，如果大于数组的长度，那么就把它赋值为数组的长度；然后判断一下<code>end</code>是否小于<code>0</code>，如果小于<code>0</code>的话，就赋值为<code>end + length</code>，也就是从后向前数结束的位置。</li>
<li>
<code>#4</code>：我们看到<code>&gt;&gt;&gt;</code>这样一个操作符，这个是按位移动操作符，表示<code>向右无符号移动</code>；我们先来看一下代码，首先判断<code>start</code>是否大于<code>end</code>，如果大于<code>end</code>就把<code>length</code>的值设为<code>0</code>，否则就把<code>end</code>减去<code>start</code>然后向右无符号移动<code>零位</code>；然后把<code>start</code>向右无符号移动零位。那么这里为什么要使用<code>&gt;&gt;&gt;</code>这个按位操作符呢？<strong>首先我们要了解<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators" rel="nofollow noreferrer" target="_blank"><code>&gt;&gt;&gt;</code></a>的作用，<code>&gt;&gt;&gt;</code>的作用就是把一个数字，变成一个无符号的32位的整数，那么<code>num &gt;&gt;&gt; 0</code>的作用，就是把<code>num</code>变成一个无符号的32位的整数，不论<code>num</code>是负数还是小数。而且我们还需要知道，JavaScript的数组的最大长度是<code>2^32-1</code>，所以这样做也避免了数组的索引超出界限。</strong>
</li>
<li>
<code>#5</code>：上一步计算出了我们要取的数组的长度，然后我们在这一步就新创建了一个数组，然后将我们要获取的数组的值，从原数组中拷贝过来；然后返回这个数组。</li>
</ul>
<p>到这里，我们已经把这个函数需要注意的地方都讲解了一下；那么接下来就需要我们自己去实现这么一个函数了，<a href="https://runkit.com/dreamapplehappy/slice/2.0.0" rel="nofollow noreferrer" target="_blank">slice</a>是我实现的一个版本。大家可以去好好练一下啦，没有什么特别困难的地方。</p>
<p>对了，上面我们说了要比较一下<code>_.slice</code>和原生的<code>[].slice</code>方法的性能，下图是在我的电脑上的一个测试，大家也可以自己测试测试一下，测试的链接是<a href="https://jsperf.com/slice-vs-slice" rel="nofollow noreferrer" target="_blank">slice-vs-slice</a></p>
<p><span class="img-wrap"><img data-src="/img/bVSYJb?w=996&amp;h=455" src="https://static.alili.tech/img/bVSYJb?w=996&amp;h=455" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>从上图可以明显的看到，<code>_.slice</code>方法比原生的<code>[].slice</code>方法性能要好很多。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Lodash源码讲解-slice函数

## 原文链接
[https://segmentfault.com/a/1190000010680849](https://segmentfault.com/a/1190000010680849)

