---
title: '数组reduce方法的高级技巧' 
date: 2019-02-07 2:30:15
hidden: true
slug: 0xeap275k7c
categories: [reprint]
---

{{< raw >}}

                    
<p>因为用for循环被老大鄙视之后，这几天都在偷偷摸摸的研究数组的那几个迭代方法。使用下来，感觉确实妙用无穷，仿佛自己的逼格在无形中变得高大了一点点，哈哈，上一篇文章的简单介绍确实有点糙，因此决定重新一些总结文章。</p>
<p>这篇文章就是专门总结reduce方法的，这个方法大有可研究的地方，值得大家get它并去同手实践一下。</p>
<p>上一篇文章我认为reduce是一个聚合或者减少方法，它可以将数组中的每一项通过叠加变成一项，但是其实这种说法似乎不太准确。先不管这个，我们来看看例子再说。</p>
<p>从最简单的例子开始。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var  arr = [1, 2, 3, 4, 5];
sum = arr.reduce(function(prev, cur, index, arr) {
    console.log(prevres, cur, index);
    return prevres + cur;
})
console.log(arr, sum);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span>  arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];
sum = arr.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">prev, cur, index, arr</span>) </span>{
    <span class="hljs-built_in">console</span>.log(prevres, cur, index);
    <span class="hljs-keyword">return</span> prevres + cur;
})
<span class="hljs-built_in">console</span>.log(arr, sum);</code></pre>
<p>输出结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1 2 1
3 3 2
6 4 3
10 5 4
[1, 2, 3, 4, 5] 15" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-number">1</span> <span class="hljs-number">2</span> <span class="hljs-number">1</span>
<span class="hljs-number">3</span> <span class="hljs-number">3</span> <span class="hljs-number">2</span>
<span class="hljs-number">6</span> <span class="hljs-number">4</span> <span class="hljs-number">3</span>
<span class="hljs-number">10</span> <span class="hljs-number">5</span> <span class="hljs-number">4</span>
[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>] <span class="hljs-number">15</span></code></pre>
<p>我们先重新回顾一下reduce中回调函数的参数，这个回调函数中有4个参数，意思分别为</p>
<p>prev: 第一项的值或者上一次叠加的结果值<br>cur: 当前会参与叠加的项<br>index： 当前值的索引<br>arr: 数组本身</p>
<p>首先我们要区分prev与cur这2个参数的区别，刚开始的时候我以为他们是一种类型的，可是后来我发现我理解错了。prev表示每次叠加之后的结果，类型可能与数组中的每一项不同，而cur则表示数组中参与叠加的当前项。在后边我们可以结合实例来理解这个地方。</p>
<p>其次我们看到，上例中其实值遍历了4次，数组有五项。数组中的第一项被当做了prev的初始值，而遍历从第二项开始。</p>
<p>我们看下面一个例子。</p>
<p>某同学的期末成绩如下表示</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var result = [
    {
        subject: 'math',
        score: 88
    },
    {
        subject: 'chinese',
        score: 95
    },
    {
        subject: 'english',
        score: 80
    }
];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> result = [
    {
        <span class="hljs-attr">subject</span>: <span class="hljs-string">'math'</span>,
        <span class="hljs-attr">score</span>: <span class="hljs-number">88</span>
    },
    {
        <span class="hljs-attr">subject</span>: <span class="hljs-string">'chinese'</span>,
        <span class="hljs-attr">score</span>: <span class="hljs-number">95</span>
    },
    {
        <span class="hljs-attr">subject</span>: <span class="hljs-string">'english'</span>,
        <span class="hljs-attr">score</span>: <span class="hljs-number">80</span>
    }
];</code></pre>
<p>如何求该同学的总成绩？</p>
<p>很显然，利用for循环可以很简单得出结论</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sum = 0;
for(var i=0; i<result.length; i++) {
    sum += result[i].score;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> sum = <span class="hljs-number">0</span>;
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>; i&lt;result.length; i++) {
    sum += result[i].score;
}</code></pre>
<p>但是我们的宗旨就是抛弃for循环，因此使用reduce来搞定这个问题</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sum = result.reduce(function(prev, cur) {
    return cur.score + prev;
}, 0);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> sum = result.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">prev, cur</span>) </span>{
    <span class="hljs-keyword">return</span> cur.score + prev;
}, <span class="hljs-number">0</span>);</code></pre>
<p>这个时候，我给reduce参数添加了第二个参数。通过打印我发现设置了这个参数之后，reduce遍历便已经从第一项开始了。</p>
<p>这第二个参数就是设置prev的初始类型和初始值，比如为0，就表示prev的初始值为number类型，值为0，因此，reduce的最终结果也会是number类型。</p>
<p>因为第二个参数为累计结果的初始值，因此假设该同学因为违纪被处罚在总成绩总扣10分，只需要将初始值设置为-10即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var sum = result.reduce(function(prev, cur) {
    return cur.score + prev;
}, -10);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> sum = result.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">prev, cur</span>) </span>{
    <span class="hljs-keyword">return</span> cur.score + prev;
}, <span class="hljs-number">-10</span>);</code></pre>
<p>我们来给这个例子增加一点难度。假如该同学的总成绩中，各科所占的比重不同，分别为50%，30%，20%，我们应该如何求出最终的权重结果呢？</p>
<p>解决方案如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var dis = {
    math: 0.5,
    chinese: 0.3,
    english: 0.2
}

var sum = result.reduce(function(prev, cur) {
    console.log(prev);
    return cur.score + prev;
}, -10);

var qsum = result.reduce(function(prev, cur) {
    return prev + cur.score * dis[cur.subject]
}, 0)

console.log(sum, qsum);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> dis = {
    <span class="hljs-attr">math</span>: <span class="hljs-number">0.5</span>,
    <span class="hljs-attr">chinese</span>: <span class="hljs-number">0.3</span>,
    <span class="hljs-attr">english</span>: <span class="hljs-number">0.2</span>
}

<span class="hljs-keyword">var</span> sum = result.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">prev, cur</span>) </span>{
    <span class="hljs-built_in">console</span>.log(prev);
    <span class="hljs-keyword">return</span> cur.score + prev;
}, <span class="hljs-number">-10</span>);

<span class="hljs-keyword">var</span> qsum = result.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">prev, cur</span>) </span>{
    <span class="hljs-keyword">return</span> prev + cur.score * dis[cur.subject]
}, <span class="hljs-number">0</span>)

<span class="hljs-built_in">console</span>.log(sum, qsum);</code></pre>
<p>为了计算出权重之后的总值，我们在回调函数内部修改了数组当前项，是使他和权重比例关联袭来，并重新返回一个一样的回调函数，将新修改的当前项传入，就和之前的例子是一样的了。</p>
<p>在segmentfault上看到一个面试题，问如何知道一串字符串中每个字母出现的次数？</p>
<p>我们可以运用reduce来解决这个问题。</p>
<p>我们在reduce的第二个参数里面初始了回调函数第一个参数的类型和值，将字符串转化为数组，那么迭代的结果将是一个对象，对象的每一项key值就是字符串的字母。运行感受一下吧。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var arrString = 'abcdaabc';

arrString.split('').reduce(function(res, cur) {
    res[cur] ? res[cur] ++ : res[cur] = 1
    return res;
}, {})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-keyword">var</span> arrString = <span class="hljs-string">'abcdaabc'</span>;

arrString.split(<span class="hljs-string">''</span>).reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res, cur</span>) </span>{
    res[cur] ? res[cur] ++ : res[cur] = <span class="hljs-number">1</span>
    <span class="hljs-keyword">return</span> res;
}, {})
</code></pre>
<p>由于可以通过第二参数设置叠加结果的类型初始值，因此这个时候reduce就不再仅仅只是做一个加法了，我们可以灵活的运用它来进行各种各样的类型转换，比如将数组按照一定规则转换为对象，也可以将一种形式的数组转换为另一种形式的数组，大家可以动手去尝试一样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[1, 2].reduce(function(res, cur) { 
    res.push(cur + 1); 
    return res; 
}, [])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>].reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">res, cur</span>) </span>{ 
    res.push(cur + <span class="hljs-number">1</span>); 
    <span class="hljs-keyword">return</span> res; 
}, [])</code></pre>
<p>这种特性使得reduce在实际开发中大有可为！但是需要注意点，在ie9一下的浏览器中，并不支持该方法 ！</p>
<p><span class="img-wrap"><img data-src="/img/bV0emY?w=800&amp;h=300" src="https://static.alili.tech/img/bV0emY?w=800&amp;h=300" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
数组reduce方法的高级技巧

## 原文链接
[https://segmentfault.com/a/1190000005921341](https://segmentfault.com/a/1190000005921341)

