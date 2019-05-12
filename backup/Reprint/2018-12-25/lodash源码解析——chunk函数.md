---
title: 'lodash源码解析——chunk函数' 
date: 2018-12-25 2:30:11
hidden: true
slug: zaww3d8he5q
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">前言</h3>
<p>最近在研究算法，本来这一章打算写狄克斯特拉算法的JavaScript实现，但是遇到了一个地方一直想不明白怎么写，于是就打算放松一下，毕竟公司的切图任务也挺重的，顺手打开了lodash的源码，一眼就瞄到了chunk.js，好奇心突然袭来，这个函数是怎么实现的？</p>
<h3 id="articleHeader1">chunk函数实现原理</h3>
<p>首先呢，我先网上搜索了一下lodash源码解析的文章，确定没找到详细解析的博客，也许有大神将文章藏在了github上面吧。</p>
<p>为什么要解析chunk呢？</p>
<p>这个函数头部注释描写的作用吸引到了我，它传入一个数组，并且设置一个切割值，就能输出切割后的新的数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//input
chunk(['a', 'b', 'c', 'd'], 1)

//output
[['a'], ['b'], ['c'], ['d']]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//input</span>
chunk([<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>, <span class="hljs-string">'d'</span>], <span class="hljs-number">1</span>)

<span class="hljs-comment">//output</span>
[[<span class="hljs-string">'a'</span>], [<span class="hljs-string">'b'</span>], [<span class="hljs-string">'c'</span>], [<span class="hljs-string">'d'</span>]]</code></pre>
<p>在没看源码之前，我脑子里就在想，这家伙该不会用到了啥排序算法吧，于是带着好奇心看了下源码。结果出乎意料，的确用到了一个算法！！</p>
<p>你可能还没看过源码，别急，文章后面我列出了源码，你可以先滚下去看一下，然后再返回来看这个原理分析。</p>
<p>不想滚下去的就跟着我的脚步，看我列举的原理步骤：</p>
<p>1、先写一个函数名chunk；</p>
<p>2、设置2个参数，array当然是要的了，接着就是size，size表示的是要将数组切割多少个元素为1组。</p>
<p>3、在这一步，你先别想着代码是怎么写的，而是用小学生的思维去分析，假设有一个数组[1,2,3,4]，它的长度是4，size设置为2时，刚好可以拆分成2个新的数组合并[[1,2], [3,4]]，如果是size是3呢？第一组是[1,2,3]，后面只剩一个4，所以只能是[4]，合并之后就是[[1,2,3], [4]]。</p>
<p>4、扮演完小学生，现在可以从程序员的角度去思考了。</p>
<p>5、还是以数组[1,2,3,4]为例，假设size为1时，输出肯定是[[1],[2],[3],[4]]，那么，如何将原数组转换成新的数组呢？这里我们用到了一个小技巧，<strong>首先，你得根据原数组的长度和size的值判断输出的数组长度应该是多少！！</strong>这里很好理解，比如说原数组长度现在是4，size为1，那么输出后的数组长度就是4/1=4，如果size为2，就是4/2=2，那如果是3呢？4/3吗？是的，就是4/3=1.33333....，size为4时，是4/4=1，你会发现，只有商带有小数点的，就需要做一点转换的小技巧。</p>
<p>6、我们可以从上面一步的分析中知道，4/3=1.333，并不是我们想要的结果，实际上这个时候应该是等于2才对，想明白这点就很简单了，用到了Math.ceil()函数，这个函数的作用不是四舍五入，而是向上取整，比如Math.ceil(1.333) = 2，你可以自己传入各种小数进去看看输出结果，我就不详细讲解这个Math.ceil了。</p>
<p>7、接着就用到了算法了！！这个算法非常非常简单，他构造了一个新的数组。先根据length和size相除取整的值算出输出的数组的长度，然后创建这个空数组。<strong>这一步是该算法思想的j架构部分！！</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Array(Math.ceil(length / size))

// 假设length为4，size为3
// 将要输出的数组[undefined, undefined]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-built_in">Math</span>.ceil(length / size))

<span class="hljs-comment">// 假设length为4，size为3</span>
<span class="hljs-comment">// 将要输出的数组[undefined, undefined]</span></code></pre>
<p>8、有了算法架构，实现起来就很容易了，<strong>你将会看到的是该算法的核心部分</strong>，我们要做的是将原数组[1,2,3,4]根据size的值来截取前面3个元素，然后合并成一个数组，接着传入输出数组作为第一个元素。最后将4合并成[4]，写入输出的数组作为第二个元素。</p>
<p>9、上一步是怎么做到的呢？还记得Array.prototype.slice()方法吗？<strong>slice() 方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。原始数组不会被修改。</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[1,2,3,4].slice(0,3) // [1,2,3]
[1,2,3,4].slice(3,6) // [4]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>].slice(<span class="hljs-number">0</span>,<span class="hljs-number">3</span>) <span class="hljs-comment">// [1,2,3]</span>
[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>].slice(<span class="hljs-number">3</span>,<span class="hljs-number">6</span>) <span class="hljs-comment">// [4]</span></code></pre>
<p>10、将slice切割合并后的2个新数组插入[undefined, undefined]，这一步使用到了循环，注意一下，<strong>循环的对象是原数组！！</strong></p>
<p>这里有个(index += size)，size在这里设置的是3</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let index = 0 //用来表示切割元素的范围start
let resIndex = 0 //输出数组的元素下标
while (index < length) {
  result[resIndex++] = array.slice(index, (index += size))
}

//第一轮循环，index=0,length=4,resIndex=0，index += size为3，array.slice(0,3)
//第二轮循环，index=3,length=4,resIndex=1，index += size为6，array.slice(3,6)
//没有第三轮，因为index<length，也就是输出的数组长度只有2。resIndex表示的是输出数组的元素下标，随着循环递增即可。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> index = <span class="hljs-number">0</span> <span class="hljs-comment">//用来表示切割元素的范围start</span>
<span class="hljs-keyword">let</span> resIndex = <span class="hljs-number">0</span> <span class="hljs-comment">//输出数组的元素下标</span>
<span class="hljs-keyword">while</span> (index &lt; length) {
  result[resIndex++] = array.slice(index, (index += size))
}

<span class="hljs-comment">//第一轮循环，index=0,length=4,resIndex=0，index += size为3，array.slice(0,3)</span>
<span class="hljs-comment">//第二轮循环，index=3,length=4,resIndex=1，index += size为6，array.slice(3,6)</span>
<span class="hljs-comment">//没有第三轮，因为index&lt;length，也就是输出的数组长度只有2。resIndex表示的是输出数组的元素下标，随着循环递增即可。</span></code></pre>
<p>11、循环中的步骤效果展示给你看一下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="初始化：[undefined, undefined]
第一步循环：[[1,2,3], undefined]
第二步循环：[[1,2,3], [4]]
结束，返回result" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">初始化：[<span class="hljs-literal">undefined</span>, <span class="hljs-literal">undefined</span>]
第一步循环：[[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>], <span class="hljs-literal">undefined</span>]
第二步循环：[[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>], [<span class="hljs-number">4</span>]]
结束，返回result</code></pre>
<h3 id="articleHeader2">chunk源码修改版</h3>
<p>源码与下面的写法有点出入，是我修改了部分代码之后的版本，你问我为什么要修改它？因为源码写的过于装逼了啊，我就随手降低了一点逼格，好让和我一样的普通前端切图仔能够看得懂。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function chunk(array, size) {
  //获取数组的长度，如果你传入的不是数组，那么获取到的就是undefined
  const length = array.length
  //判断不是数组，或者size没有设置，size小于1，就返回空数组
  if (!length || !size || size < 1) {
    return []
  }

  //核心部分
  let index = 0 //用来表示切割元素的范围start
  let resIndex = 0 //用来递增表示输出数组的下标

  //根据length和size算出输出数组的长度，并且创建它。
  let result = new Array(Math.ceil(length / size))
  //进行循环
  while (index < length) {
    //循环过程中设置result[0]和result[1]的值。该值根据array.slice切割得到。
    result[resIndex++] = array.slice(index, (index += size))
  }
  //输出新数组
  return result
}

chunk(['a', 'b', 'c', 'd'], 1) //[['a'], ['b'], ['c'], ['d']]
chunk(['a', 'b', 'c', 'd'], 2) //[['a', 'b'], ['c', 'd']]
chunk(['a', 'b', 'c', 'd'], 3) //[['a', 'b', 'c'], ['d']]
chunk(['a', 'b', 'c', 'd'], 4) //[['a', 'b', 'c', 'd']]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">chunk</span>(<span class="hljs-params">array, size</span>) </span>{
  <span class="hljs-comment">//获取数组的长度，如果你传入的不是数组，那么获取到的就是undefined</span>
  <span class="hljs-keyword">const</span> length = array.length
  <span class="hljs-comment">//判断不是数组，或者size没有设置，size小于1，就返回空数组</span>
  <span class="hljs-keyword">if</span> (!length || !size || size &lt; <span class="hljs-number">1</span>) {
    <span class="hljs-keyword">return</span> []
  }

  <span class="hljs-comment">//核心部分</span>
  <span class="hljs-keyword">let</span> index = <span class="hljs-number">0</span> <span class="hljs-comment">//用来表示切割元素的范围start</span>
  <span class="hljs-keyword">let</span> resIndex = <span class="hljs-number">0</span> <span class="hljs-comment">//用来递增表示输出数组的下标</span>

  <span class="hljs-comment">//根据length和size算出输出数组的长度，并且创建它。</span>
  <span class="hljs-keyword">let</span> result = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>(<span class="hljs-built_in">Math</span>.ceil(length / size))
  <span class="hljs-comment">//进行循环</span>
  <span class="hljs-keyword">while</span> (index &lt; length) {
    <span class="hljs-comment">//循环过程中设置result[0]和result[1]的值。该值根据array.slice切割得到。</span>
    result[resIndex++] = array.slice(index, (index += size))
  }
  <span class="hljs-comment">//输出新数组</span>
  <span class="hljs-keyword">return</span> result
}

chunk([<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>, <span class="hljs-string">'d'</span>], <span class="hljs-number">1</span>) <span class="hljs-comment">//[['a'], ['b'], ['c'], ['d']]</span>
chunk([<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>, <span class="hljs-string">'d'</span>], <span class="hljs-number">2</span>) <span class="hljs-comment">//[['a', 'b'], ['c', 'd']]</span>
chunk([<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>, <span class="hljs-string">'d'</span>], <span class="hljs-number">3</span>) <span class="hljs-comment">//[['a', 'b', 'c'], ['d']]</span>
chunk([<span class="hljs-string">'a'</span>, <span class="hljs-string">'b'</span>, <span class="hljs-string">'c'</span>, <span class="hljs-string">'d'</span>], <span class="hljs-number">4</span>) <span class="hljs-comment">//[['a', 'b', 'c', 'd']]</span></code></pre>
<h3 id="articleHeader3">总结</h3>
<p>切图之余，偶尔学习一下这些插件的原理，可以提高自己分析问题的能力，有时候，没有找对方法很难看懂，或者是思想不集中，也很难理解，就像现在很多人都鼓吹自己看过react、vue、angular源码，真正能一行行代码清晰的分析出来的，能有几个？</p>
<p>但很多人现在能做到的是将这些基础的函数逐渐的搞明白，我想，对自己或者是对你的未来发展很有帮助了！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
lodash源码解析——chunk函数

## 原文链接
[https://segmentfault.com/a/1190000012025488](https://segmentfault.com/a/1190000012025488)

