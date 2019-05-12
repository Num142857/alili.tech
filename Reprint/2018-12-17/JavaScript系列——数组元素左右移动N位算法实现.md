---
title: 'JavaScript系列——数组元素左右移动N位算法实现' 
date: 2018-12-17 2:30:07
hidden: true
slug: a7ycsplg3i
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">引言</h3>
<p>在自己刚刚毕业不久的时候，去了一家公司面试，面试官现场考了我这道题，我记忆深刻，当时没有想到思路，毫无疑问被面试官当成菜鸟了。<br>最近刚好在研究数组的各种算法实现，就想到这道题，可以拿来实现一下，纪念自己逝去的青春。</p>
<h3 id="articleHeader1">需求</h3>
<p>假设有这样一个数组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[1,2,3,4,5]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json" style="word-break: break-word; white-space: initial;">[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>]</code></pre>
<p>现在想要左移或者右移N位，比如移动1位</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//左移1位
[2,3,4,5,1]

//右移1位
[5,1,2,3,4]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-comment">//左移1位</span>
[<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">1</span>]

<span class="hljs-comment">//右移1位</span>
[<span class="hljs-number">5</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>]</code></pre>
<h3 id="articleHeader2">算法实现</h3>
<p>这样一道题目，你先不要看我下面的代码，自己思考一下如何实现它，不管是复杂的还是简单的方法。<br><strong>可以先告诉你我用了2行代码实现左、右移动元素。</strong></p>
<h4>拆分法</h4>
<h4>当我们没有具体思路的时候，就先假设数组移动1位的情况。</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[1,2,3,4,5]
=>
[null,1,2,3,4] and [5,null,null,null,null]
=>
[5,1,2,3,4]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs excel"><code>[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>]
=&gt;
[null,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>] <span class="hljs-built_in">and</span> [<span class="hljs-number">5</span>,null,null,null,null]
=&gt;
[<span class="hljs-number">5</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>]</code></pre>
<p>这里可以看成2个数组，一个是没有到达边界的元素移动[null,1,2,3,4]，一个是到达了边界的元素移动[5,null,null,null,null]，当元素到达边界，就会往数组的初始位置移动，形成了一个循环的过程。</p>
<p>很明显，如果我们将这2个移动后的数组合并起来，就是需求的结果。</p>
<h4>移动2位</h4>
<p>同样符合2个移动后的数组合并起来为结果的情况</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[1,2,3,4,5]
=>
[null,null,1,2,3] and [4,5,null,null,null]
=>
[4,5,1,2,3]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs excel"><code>[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>]
=&gt;
[null,null,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>] <span class="hljs-built_in">and</span> [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,null,null,null]
=&gt;
[<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]</code></pre>
<h4>刚好移动数组长度</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[1,2,3,4,5]
=>
[1,2,3,4,5] and [] //如果没有，就假设为空数组" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs excel"><code>[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>]
=&gt;
[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>] <span class="hljs-built_in">and</span> [] //如果没有，就假设为空数组</code></pre>
<h4>合并数组</h4>
<p>假设移动1位的情况<br>上面的步骤，我们找到了规律，接下来要做的是找到2个数组，需要用到slice截取数组元素。<br>截取第一个数组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arr.slice(0,-1)
// [1,2,3,4]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">arr.slice(<span class="hljs-number">0</span>,<span class="hljs-number">-1</span>)
<span class="hljs-comment">// [1,2,3,4]</span></code></pre>
<p>截取第二个数组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arr.slice(-1)
// [5]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">arr.slice(<span class="hljs-number">-1</span>)
<span class="hljs-comment">// [5]</span></code></pre>
<p>合并数组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arr.slice(-1).concat(arr.slice(0,-1))
// [5,1,2,3,4]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">arr.slice(<span class="hljs-number">-1</span>).concat(arr.slice(<span class="hljs-number">0</span>,<span class="hljs-number">-1</span>))
<span class="hljs-comment">// [5,1,2,3,4]</span></code></pre>
<p>这样你就实现了移动1位的情况，接着，你继续拿+5和-5范围内的数字进行测试，发现都可以正常移动，当数字大于5或者小于-5的时候，代码就无效了，始终输出[1,2,3,4,5]</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arr.slice(-6).concat(arr.slice(0,-6))
// [1,2,3,4,5]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">arr.slice(<span class="hljs-number">-6</span>).concat(arr.slice(<span class="hljs-number">0</span>,<span class="hljs-number">-6</span>))
<span class="hljs-comment">// [1,2,3,4,5]</span></code></pre>
<p>我们再加上一个小技巧，求余数，假设是移动6，那么，实际上和移动1是相同的，我们就可以根据公式求余数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="n = n%arr.length
// n = 6%5 余1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">n = n%arr.length
<span class="hljs-comment">// n = 6%5 余1</span></code></pre>
<p>同理，当移动-6时</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="n = n%arr.length
// n = -6%5 余-1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">n = n%arr.length
<span class="hljs-comment">// n = -6%5 余-1</span></code></pre>
<p>接着带入公式，发现输出全部都正确了！！</p>
<p>思路分析完了，应该很清晰了吧，源码在下面、</p>
<h3 id="articleHeader3">算法源码</h3>
<p>arr表示原始数组，n表示移动的距离，可以是正数、可以是0、也可以是负数、正数表示右移，负数表示左移，0表示不移动。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function moveElement(arr, n) {
  if(Math.abs(n)>arr.length) n = n%arr.length
  return arr.slice(-n).concat(arr.slice(0,-n))
}

// moveElement(arr, 9)
// moveElement(arr, 0)
// moveElement(arr, -9)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">moveElement</span>(<span class="hljs-params">arr, n</span>) </span>{
  <span class="hljs-keyword">if</span>(<span class="hljs-built_in">Math</span>.abs(n)&gt;arr.length) n = n%arr.length
  <span class="hljs-keyword">return</span> arr.slice(-n).concat(arr.slice(<span class="hljs-number">0</span>,-n))
}

<span class="hljs-comment">// moveElement(arr, 9)</span>
<span class="hljs-comment">// moveElement(arr, 0)</span>
<span class="hljs-comment">// moveElement(arr, -9)</span></code></pre>
<h3 id="articleHeader4">总结</h3>
<p>下次面试要是继续碰到这道题，可能我又当场忘记思路了?</p>
<h3 id="articleHeader5">补充</h3>
<p>看到有评论讨论不同方案的实现，这些都很厉害，没有唯一的答案，而思考解决方案的时候，要考虑的是时间复杂度，移动数组的元素都会造成数组的重新排列。</p>
<p>第一步方案我觉得应该是找到最小移动位置的代价，即移动2和移动2n是一样的，我们就只需要移动2，不需要再移动n，求余数的作用在于此，根据移动的位置切分出2个数组，不需要移动元素，最后我用的是concat合并2个数组，返回一个新的数组副本，这样就避免了移动元素。</p>
<p>还有一种方案是将2个数组使用new Set(array1)和new Set(array2)设置为集合，集合是key、value的散列表，可以用最少的代价移动位置，不导致重排，用集合移动完之后，再Array.from()转换回数组。</p>
<p>切忌，不要尝试去直接修改原数组的元素位置，这样做代价非常大，尤其是数组长度很长的时候！！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript系列——数组元素左右移动N位算法实现

## 原文链接
[https://segmentfault.com/a/1190000012882330](https://segmentfault.com/a/1190000012882330)

