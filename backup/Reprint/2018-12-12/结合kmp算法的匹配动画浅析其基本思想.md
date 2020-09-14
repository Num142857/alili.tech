---
title: '结合kmp算法的匹配动画浅析其基本思想' 
date: 2018-12-12 2:30:10
hidden: true
slug: oen4nntt3f
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">写在最前</h2>
<p>本次分享一下通过实现kmp算法的动画效果来试图展示kmp的基本思路。</p>
<p>欢迎关注<a href="https://github.com/Aaaaaaaty/Blog" rel="nofollow noreferrer" target="_blank">我的博客</a>，不定期更新中——</p>
<h3 id="articleHeader1">前置概念</h3>
<h4>字符串匹配</h4>
<blockquote>字符串匹配是计算机科学中最古老、研究最广泛的问题之一。一个字符串是一个定义在有限字母表∑上的字符序列。例如，ATCTAGAGA是字母表∑ = {A,C,G,T}上的一个字符串。字符串匹配问题就是在一个大的字符串T中搜索某个字符串P的所有出现位置。</blockquote>
<h4>kmp算法</h4>
<blockquote>KMP算法是一种改进的字符串匹配算法，由D.E.Knuth，J.H.Morris和V.R.Pratt同时发现，因此人们称它为克努特——莫里斯——普拉特操作（简称KMP算法）。KMP算法的关键是利用匹配失败后的信息，尽量减少模式串与主串的匹配次数以达到快速匹配的目的。具体实现就是实现一个next()函数，函数本身包含了模式串的局部匹配信息。时间复杂度O(m+n)。</blockquote>
<p>在js中字符串匹配我们通常使用的是原生api，indexOf；其本身是c++实现的不在这次的讨论范围中。本次主要通过动画演示的方式展现朴素算法与kmp算法对比过程的异同从而试图理解kmp的基本思路。</p>
<p>PS:在之后的叙述中BBC ABCDAB ABCDABCDABDE为<strong>主串</strong>；ABCDABD为<strong>模式串</strong></p>
<h3 id="articleHeader2">效果预览</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013386860?w=848&amp;h=308" src="https://static.alili.tech/img/remote/1460000013386860?w=848&amp;h=308" alt="2018-02-23 18_56_50" title="2018-02-23 18_56_50" style="cursor: pointer;"></span></p>
<p>上方为朴素算法即按位比较，下方为kmp算法实现的字符串比较方式。kmp可以通过较少的比较次数完成匹配。</p>
<h3 id="articleHeader3">基本思路</h3>
<p>从上图的效果预览中可以看出使用朴素算法依次比较模式串需要移位13次，而使用kmp需要8次，故可以说kmp的思路是通过避免无效的移位，来快速移动到指定的地点。接下来我们关注一下kmp是如何“跳着”移动的：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013386861?w=908&amp;h=363" src="https://static.alili.tech/img/remote/1460000013386861?w=908&amp;h=363" alt="wechatimg167" title="wechatimg167" style="cursor: pointer; display: inline;"></span></p>
<p>与朴素算法一致，在之前对于主串“BBC ”的匹配中模式串ABCBABD的第一个字符均与之不同故向后移位到现在上图所示的位置。主串通过依次与模式串中的字符比较我们可以看出，模式串的前6个字符与主串相同即<strong>ABCDAB</strong>；而这也就是kmp算法的关键。</p>
<h3 id="articleHeader4">根据已知信息计算下一次移位位置</h3>
<p>我们先从下图来看朴素算法与kmp中下一次移位的过程：<br><span class="img-wrap"><img data-src="/img/remote/1460000013386862" src="https://static.alili.tech/img/remote/1460000013386862" alt="wechatimg165" title="wechatimg165" style="cursor: pointer; display: inline;"></span></p>
<p>朴素算法雨打不动得向后移了一位。<strong>而kmp跳过了主串的BCD三个字符</strong>。从而进行了一次避免无意义的移位比较。那么它是怎么知道我这次要跳过三个而不是两个或者不跳呢？关键在于上一次已经匹配的部分<strong>ABCDAB</strong></p>
<h3 id="articleHeader5">从已匹配部分发掘信息</h3>
<p>我们已知此时主串与模式串均有此相同的部分<strong>ABCDAB</strong>。那么如何从这共同部分中获得有用的信息？或者换个角度想一下：<strong>我们能跳过部分位置的依据是什么？</strong></p>
<p>第一次匹配失败时的情形如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    BBC ABCDAB ABCDABCDABDE
        ABCDABD
              D != 空格 故失败" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code>    <span class="hljs-keyword">BBC </span>ABCDAB ABCDABCDABDE
        ABCDABD
              D != 空格 故失败</code></pre>
<p>为了从已匹配部分提取信息。现在将主串做一下变形：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    ABCDABXXXXXX...  X可能是任何字符" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;">    ABCDABXXXXXX...  X可能是任何字符</code></pre>
<p>我们现在只知道已匹配的部分，因为匹配已经失败了不会再去读取后面的字符，故用X代替。</p>
<p>那么我们能跳过多少位置的问题就可以由下面的解得知答案：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //ABCDAB向后移动几位可能能匹配上？
    ABCDABXXXXXX...
    ABCDABD" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>    <span class="hljs-comment">//ABCDAB向后移动几位可能能匹配上？</span>
    ABCDABXXXXXX...
    ABCDABD</code></pre>
<p>答案自然是如下移动：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    ABCDABXXXXXX...
        ABCDABD" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>    ABCDABXXXXXX...
        ABCDABD</code></pre>
<p>因为我们不知道X代表什么，只能从已匹配的串来分析。</p>
<p><strong>故我们能跳过部分位置的依据是什么？</strong></p>
<p><strong>答：已匹配的模式串的前n位能否等于匹配部分的主串的后n位。并且n尽可能大。</strong></p>
<p>举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//第一次匹配失败时匹配到ABCDDDABC为共同部分
    XXXABCDDDABCFXXX
       ABCDDDABCE
//寻找模式串的最大前几位与主串匹配到的部分后几位相同，
//可以发现最多是ABC部分相同，故可以略过DDD的匹配因为肯定对不上
    XXXABCDDDABCFXXX
             ABCDDDABCE     " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-comment">//第一次匹配失败时匹配到ABCDDDABC为共同部分</span>
    XXXABCDDDABCFXXX
       ABCDDDABCE
<span class="hljs-comment">//寻找模式串的最大前几位与主串匹配到的部分后几位相同，</span>
<span class="hljs-comment">//可以发现最多是ABC部分相同，故可以略过DDD的匹配因为肯定对不上</span>
    XXXABCDDDABCFXXX
             ABCDDDABCE     </code></pre>
<p>现在kmp的基本思路已经很明显了，其就是通过经失败后得知的已匹配字段，来寻找主串尾部与模式串头部的相同最大匹配，如果有则可以跨过中间的部分，因为所谓“中间”的部分，也是有可能进入主串尾与模式串头的，没进去的原因即是相对位置字符不同，故最终在模式串移位时可以跳过。</p>
<h3 id="articleHeader6">部分匹配值</h3>
<p>上面是用通俗的话来述说我们如何根据已匹配的部分来决定下一次模式串移位的位置，大家应该已经大体知道kmp的思路了。现在来引出官方的说法。</p>
<p>之前叙述的在已匹配部分中查找主串头部与模式串尾部相同的部分的结果我们可以用部分匹配值的说法来形容：</p>
<ul>
<li>其中定义"前缀"和"后缀"。"前缀"指除了最后一个字符以外，一个字符串的全部头部组合；"后缀"指除了第一个字符以外，一个字符串的全部尾部组合。</li>
<li>"部分匹配值"就是"前缀"和"后缀"的最长的共有元素的长度。</li>
</ul>
<p>例如ABCDAB</p>
<ul>
<li>前缀分别为A、AB、ABC、ABCD、ABCDA</li>
<li>后缀分别为B、AB、DAB、CDAB、BCDAB</li>
</ul>
<p>很容易发现部分匹配值为2即AB的长度。从而结合之前的思路可以知道将模式串直接移位到主串AB对应的地方即可，中间的部分一定是不匹配的。移动几位呢？</p>
<p>答：<strong>匹配串长度 - 部分匹配值；本次例子中为6-2=4，模式串向右移动四位</strong></p>
<h3 id="articleHeader7">代码实现</h3>
<h4>计算部分匹配表</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function pmtArr(target) {
    var pmtArr = []
    target = target.split('')
    for(var j = 0; j < target.length; j++) {
    //获取模式串不同长度下的部分匹配值
        var pmt = target
        var pmtNum = 0
        for (var k = 0; k < j; k++) {
            var head = pmt.slice(0, k + 1) //前缀
            var foot = pmt.slice(j - k, j + 1) //后缀
            if (head.join('') === foot.join('')) {
                var num = head.length
                if (num > pmtNum) pmtNum = num
            }
        }
        pmtArr.push(j + 1 - pmtNum) 
    }
    return pmtArr
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pmtArr</span><span class="hljs-params">(target)</span> </span>{
    <span class="hljs-keyword">var</span> pmtArr = []
    target = target.split(<span class="hljs-string">''</span>)
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>; j &lt; target.length; j++) {
    <span class="hljs-comment">//获取模式串不同长度下的部分匹配值</span>
        <span class="hljs-keyword">var</span> pmt = target
        <span class="hljs-keyword">var</span> pmtNum = <span class="hljs-number">0</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> k = <span class="hljs-number">0</span>; k &lt; j; k++) {
            <span class="hljs-keyword">var</span> head = pmt.slice(<span class="hljs-number">0</span>, k + <span class="hljs-number">1</span>) <span class="hljs-comment">//前缀</span>
            <span class="hljs-keyword">var</span> foot = pmt.slice(j - k, j + <span class="hljs-number">1</span>) <span class="hljs-comment">//后缀</span>
            <span class="hljs-keyword">if</span> (head.join(<span class="hljs-string">''</span>) === foot.join(<span class="hljs-string">''</span>)) {
                <span class="hljs-keyword">var</span> num = head.length
                <span class="hljs-keyword">if</span> (num &gt; pmtNum) pmtNum = num
            }
        }
        pmtArr.push(j + <span class="hljs-number">1</span> - pmtNum) 
    }
    <span class="hljs-keyword">return</span> pmtArr
}</code></pre>
<h4>kmp算法</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function mapKMPStr(base, target) {
    var isMatch = []
    var pmt = pmtArr(target)
    console.time('kmp')
    var times = 0
    for(var i = 0; i < base.length; i++) {
        times++
        var tempIndex = 0
        for(var j = 0; j < target.length; j++) {
            if(i + target.length <= base.length) {
                if (target.charAt(j) === base.charAt(i + j)) {
                    isMatch.push(target.charAt(j))
                } else {
                    if(!j) break //第一个就不匹配直接跳到下一个
                    var skip = pmt[j - 1]
                    tempIndex = i + skip - 1
                    break 
                }
            }
        }
        var data = {
            index: i,
            matchArr: isMatch
        }
        callerKmp.push(data)
        if(tempIndex) i = tempIndex
        if(isMatch.length === target.length) {
            console.timeEnd('kmp')
            console.log('移位次数:', times)
            return i
        }
        isMatch = []
    }
    console.timeEnd('kmp')
    return -1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mapKMPStr</span>(<span class="hljs-params">base, target</span>) </span>{
    <span class="hljs-keyword">var</span> isMatch = []
    <span class="hljs-keyword">var</span> pmt = pmtArr(target)
    <span class="hljs-built_in">console</span>.time(<span class="hljs-string">'kmp'</span>)
    <span class="hljs-keyword">var</span> times = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; base.length; i++) {
        times++
        <span class="hljs-keyword">var</span> tempIndex = <span class="hljs-number">0</span>
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>; j &lt; target.length; j++) {
            <span class="hljs-keyword">if</span>(i + target.length &lt;= base.length) {
                <span class="hljs-keyword">if</span> (target.charAt(j) === base.charAt(i + j)) {
                    isMatch.push(target.charAt(j))
                } <span class="hljs-keyword">else</span> {
                    <span class="hljs-keyword">if</span>(!j) <span class="hljs-keyword">break</span> <span class="hljs-comment">//第一个就不匹配直接跳到下一个</span>
                    <span class="hljs-keyword">var</span> skip = pmt[j - <span class="hljs-number">1</span>]
                    tempIndex = i + skip - <span class="hljs-number">1</span>
                    <span class="hljs-keyword">break</span> 
                }
            }
        }
        <span class="hljs-keyword">var</span> data = {
            <span class="hljs-attr">index</span>: i,
            <span class="hljs-attr">matchArr</span>: isMatch
        }
        callerKmp.push(data)
        <span class="hljs-keyword">if</span>(tempIndex) i = tempIndex
        <span class="hljs-keyword">if</span>(isMatch.length === target.length) {
            <span class="hljs-built_in">console</span>.timeEnd(<span class="hljs-string">'kmp'</span>)
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'移位次数:'</span>, times)
            <span class="hljs-keyword">return</span> i
        }
        isMatch = []
    }
    <span class="hljs-built_in">console</span>.timeEnd(<span class="hljs-string">'kmp'</span>)
    <span class="hljs-keyword">return</span> <span class="hljs-number">-1</span></code></pre>
<p>有了思路后整体实现并不复杂，只需要先通过模式串计算各长度的部分匹配值，在之后的与主串的匹配过程中，<strong>每失败一次后如果有部分匹配值存在，我们就可以通过部分匹配值查找到下一次应该移位的位置</strong>，省去不必要的步骤。</p>
<p>所以在某些极端情况下，比如需要搜索的词如果内部完全没有重复，算法就会退化成遍历，性能可能还不如传统算法，里面还涉及了比较的开销。</p>
<h3 id="articleHeader8">参考文章</h3>
<ul><li><a href="http://www.ruanyifeng.com/blog/2013/05/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm.html" rel="nofollow noreferrer" target="_blank">字符串匹配的KMP算法</a></li></ul>
<h2 id="articleHeader9">最后</h2>
<p>惯例po<a href="https://github.com/Aaaaaaaty/Blog" rel="nofollow noreferrer" target="_blank">作者的博客</a>，不定时更新中——</p>
<p>有问题欢迎在issues下交流。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
结合kmp算法的匹配动画浅析其基本思想

## 原文链接
[https://segmentfault.com/a/1190000013386857](https://segmentfault.com/a/1190000013386857)

