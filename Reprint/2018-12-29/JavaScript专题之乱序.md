---
title: 'JavaScript专题之乱序' 
date: 2018-12-29 2:30:10
hidden: true
slug: y0rzgivpkls
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>JavaScript 专题系列第十九篇，讲解数组乱序，重点探究 Math.random() 为什么不能真正的乱序？</p></blockquote>
<h2 id="articleHeader0">乱序</h2>
<p>乱序的意思就是将数组打乱。</p>
<p>嗯，没有了，直接看代码吧。</p>
<h2 id="articleHeader1">Math.random</h2>
<p>一个经常会遇见的写法是使用 Math.random()：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var values = [1, 2, 3, 4, 5];

values.sort(function(){
    return Math.random() - 0.5;
});

console.log(values)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> values = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];

values.sort(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.random() - <span class="hljs-number">0.5</span>;
});

<span class="hljs-built_in">console</span>.log(values)</code></pre>
<p><code>Math.random() - 0.5</code> 随机得到一个正数、负数或是 0，如果是正数则降序排列，如果是负数则升序排列，如果是 0 就不变，然后不断的升序或者降序，最终得到一个乱序的数组。</p>
<p>看似很美好的一个方案，实际上，效果却不尽如人意。不信我们写个 demo 测试一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var times = [0, 0, 0, 0, 0];

for (var i = 0; i < 100000; i++) {
    
    let arr = [1, 2, 3, 4, 5];
    
    arr.sort(() => Math.random() - 0.5);
    
    times[arr[4]-1]++;

}

console.log(times)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> times = [<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>];

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">100000</span>; i++) {
    
    <span class="hljs-keyword">let</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];
    
    arr.sort(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">Math</span>.random() - <span class="hljs-number">0.5</span>);
    
    times[arr[<span class="hljs-number">4</span>]<span class="hljs-number">-1</span>]++;

}

<span class="hljs-built_in">console</span>.log(times)</code></pre>
<p>测试原理是：将 <code>[1, 2, 3, 4, 5]</code> 乱序 10 万次，计算乱序后的数组的最后一个元素是 1、2、3、4、5 的次数分别是多少。</p>
<p>一次随机的结果为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[30636, 30906, 20456, 11743, 6259]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">[<span class="hljs-number">30636</span>, <span class="hljs-number">30906</span>, <span class="hljs-number">20456</span>, <span class="hljs-number">11743</span>, <span class="hljs-number">6259</span>]</code></pre>
<p>该结果表示 10 万次中，数组乱序后的最后一个元素是 1 的情况共有 30636 次，是 2 的情况共有 30906 次，其他依此类推。</p>
<p>我们会发现，最后一个元素为 5 的次数远远低于为 1 的次数，所以这个方案是有问题的。</p>
<p>可是我明明感觉这个方法还不错呐？初见时还有点惊艳的感觉，为什么会有问题呢？</p>
<p>是的！我很好奇！</p>
<h2 id="articleHeader2">插入排序</h2>
<p>如果要追究这个问题所在，就必须了解 sort 函数的原理，然而 ECMAScript 只规定了效果，没有规定实现的方式，所以不同浏览器实现的方式还不一样。</p>
<p>为了解决这个问题，我们以 v8 为例，v8 在处理 sort 方法时，当目标数组长度小于 10 时，使用插入排序；反之，使用快速排序和插入排序的混合排序。</p>
<p>所以我们来看看 v8 的源码，因为是用 JavaScript 写的，大家也是可以看懂的。</p>
<p>源码地址：<a href="https://github.com/v8/v8/blob/master/src/js/array.js" rel="nofollow noreferrer" target="_blank">https://github.com/v8/v8/blob/master/src/js/array.js</a></p>
<p>为了简化篇幅，我们对 <code>[1, 2, 3]</code> 这个数组进行分析，数组长度为 3，此时采用的是插入排序。</p>
<p>插入排序的源码是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function InsertionSort(a, from, to) {
    for (var i = from + 1; i < to; i++) {
        var element = a[i];
        for (var j = i - 1; j >= from; j--) {
            var tmp = a[j];
            var order = comparefn(tmp, element);
            if (order > 0) {
                a[j + 1] = tmp;
            } else {
                break;
            }
        }
        a[j + 1] = element;
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">InsertionSort</span>(<span class="hljs-params">a, from, to</span>) </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-keyword">from</span> + <span class="hljs-number">1</span>; i &lt; to; i++) {
        <span class="hljs-keyword">var</span> element = a[i];
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = i - <span class="hljs-number">1</span>; j &gt;= <span class="hljs-keyword">from</span>; j--) {
            <span class="hljs-keyword">var</span> tmp = a[j];
            <span class="hljs-keyword">var</span> order = comparefn(tmp, element);
            <span class="hljs-keyword">if</span> (order &gt; <span class="hljs-number">0</span>) {
                a[j + <span class="hljs-number">1</span>] = tmp;
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-keyword">break</span>;
            }
        }
        a[j + <span class="hljs-number">1</span>] = element;
    }
};</code></pre>
<p>其原理在于将第一个元素视为有序序列，遍历数组，将之后的元素依次插入这个构建的有序序列中。</p>
<p>我们来个简单的示意图：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011521014?w=394&amp;h=520" src="https://static.alili.tech/img/remote/1460000011521014?w=394&amp;h=520" alt="插入排序" title="插入排序" style="cursor: pointer;"></span></p>
<h2 id="articleHeader3">具体分析</h2>
<p>明白了插入排序的原理，我们来具体分析下 [1, 2, 3] 这个数组乱序的结果。</p>
<p>演示代码为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var values = [1, 2, 3];

values.sort(function(){
    return Math.random() - 0.5;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> values = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];

values.sort(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.random() - <span class="hljs-number">0.5</span>;
});</code></pre>
<p>注意此时 sort 函数底层是使用插入排序实现，InsertionSort 函数的 from 的值为 0，to 的值为 3。</p>
<p>我们开始逐步分析乱序的过程：</p>
<p>因为插入排序视第一个元素为有序的，所以数组的外层循环从 <code>i = 1</code> 开始，a[i] 值为 2，此时内层循环遍历，比较 <code>compare(1, 2)</code>，因为 <code>Math.random() - 0.5</code> 的结果有 50% 的概率小于 0 ，有 50% 的概率大于 0，所以有 50% 的概率数组变成 [2, 1, 3]，50% 的结果不变，数组依然为 [1, 2, 3]。</p>
<p>假设依然是 [1, 2, 3]，我们再进行一次分析，接着遍历，<code>i = 2</code>，a[i] 的值为 3，此时内层循环遍历，比较 <code>compare(2, 3)</code>：</p>
<p>有 50% 的概率数组不变，依然是 <code>[1, 2, 3]</code>，然后遍历结束。</p>
<p>有 50% 的概率变成 [1, 3, 2]，因为还没有找到 3 正确的位置，所以还会进行遍历，所以在这 50% 的概率中又会进行一次比较，<code>compare(1, 3)</code>，有 50% 的概率不变，数组为 [1, 3, 2]，此时遍历结束，有 50% 的概率发生变化，数组变成 [3, 1, 2]。</p>
<p>综上，在 [1, 2, 3] 中，有 50% 的概率会变成 [1, 2, 3]，有 25% 的概率会变成 [1, 3, 2]，有 25% 的概率会变成 [3, 1, 2]。</p>
<p>另外一种情况 [2, 1, 3] 与之分析类似，我们将最终的结果汇总成一个表格：</p>
<table class="table table-bordered table-striped table-condensed">
<tbody><tr>
<th>数组</th>
        <th>i = 1</th>
        <th>i = 2</th>
        <th>总计</th>
    </tr>
<tr>
<td rowspan="6">[1, 2, 3]</td>
        <td rowspan="3">50% [1, 2, 3]</td>
         <td>50% [1, 2, 3]</td>
         <td>25% [1, 2, 3]</td>
    </tr>
<tr>
<td>25% [1, 3, 2]</td>
        <td>12.5% [1, 3, 2]</td>
    </tr>
<tr>
<td>25% [3, 1, 2]</td>
        <td>12.5% [3, 1, 2]</td>
    </tr>
<tr>
<td rowspan="3">50% [2, 1, 3]</td>
        <td>50% [2, 1, 3]</td>
         <td>25% [2, 1, 3]</td>
    </tr>
<tr>
<td>25% [2, 3, 1]</td>
        <td>12.5% [2, 3, 1]</td>
    </tr>
<tr>
<td>25% [3, 2, 1]</td>
        <td>12.5% [3, 2, 1]</td>
    </tr>
</tbody></table>
<p>为了验证这个推算是否准确，我们写个 demo 测试一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var times = 100000;
var res = {};

for (var i = 0; i < times; i++) {
    
    var arr = [1, 2, 3];
    arr.sort(() => Math.random() - 0.5);
    
    var key = JSON.stringify(arr);
    res[key] ? res[key]++ :  res[key] = 1;
}

// 为了方便展示，转换成百分比
for (var key in res) {
    res[key] = res[key] / times * 100 + '%'
}

console.log(res)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> times = <span class="hljs-number">100000</span>;
<span class="hljs-keyword">var</span> res = {};

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; times; i++) {
    
    <span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
    arr.sort(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">Math</span>.random() - <span class="hljs-number">0.5</span>);
    
    <span class="hljs-keyword">var</span> key = <span class="hljs-built_in">JSON</span>.stringify(arr);
    res[key] ? res[key]++ :  res[key] = <span class="hljs-number">1</span>;
}

<span class="hljs-comment">// 为了方便展示，转换成百分比</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> res) {
    res[key] = res[key] / times * <span class="hljs-number">100</span> + <span class="hljs-string">'%'</span>
}

<span class="hljs-built_in">console</span>.log(res)</code></pre>
<p>这是一次随机的结果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011521015?w=1920&amp;h=274" src="https://static.alili.tech/img/remote/1460000011521015?w=1920&amp;h=274" alt="Math random 效果演示" title="Math random 效果演示" style="cursor: pointer; display: inline;"></span></p>
<p>我们会发现，乱序后，<code>3</code> 还在原位置(即 [1, 2, 3] 和 [2, 1, 3]) 的概率有 50% 呢。</p>
<p>所以根本原因在于什么呢？其实就在于在插入排序的算法中，当待排序元素跟有序元素进行比较时，一旦确定了位置，就不会再跟位置前面的有序元素进行比较，所以就乱序的不彻底。</p>
<p>那么如何实现真正的乱序呢？而这就要提到经典的 Fisher–Yates 算法。</p>
<h2 id="articleHeader4">Fisher–Yates</h2>
<p>为什么叫 Fisher–Yates 呢？ 因为这个算法是由 Ronald Fisher 和 Frank Yates 首次提出的。</p>
<p>话不多说，我们直接看 JavaScript 的实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
    return a;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">shuffle</span>(<span class="hljs-params">a</span>) </span>{
    <span class="hljs-keyword">var</span> j, x, i;
    <span class="hljs-keyword">for</span> (i = a.length; i; i--) {
        j = <span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random() * i);
        x = a[i - <span class="hljs-number">1</span>];
        a[i - <span class="hljs-number">1</span>] = a[j];
        a[j] = x;
    }
    <span class="hljs-keyword">return</span> a;
}</code></pre>
<p>原理很简单，就是遍历数组元素，然后将当前元素与以后随机位置的元素进行交换，从代码中也可以看出，这样乱序的就会更加彻底。</p>
<p>如果利用 ES6，代码还可以简化成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function shuffle(a) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">shuffle</span>(<span class="hljs-params">a</span>) </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = a.length; i; i--) {
        <span class="hljs-keyword">let</span> j = <span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random() * i);
        [a[i - <span class="hljs-number">1</span>], a[j]] = [a[j], a[i - <span class="hljs-number">1</span>]];
    }
    <span class="hljs-keyword">return</span> a;
}</code></pre>
<p>还是再写个 demo 测试一下吧：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var times = 100000;
var res = {};

for (var i = 0; i < times; i++) {
    var arr = shuffle([1, 2, 3]);

    var key = JSON.stringify(arr);
    res[key] ? res[key]++ :  res[key] = 1;
}

// 为了方便展示，转换成百分比
for (var key in res) {
    res[key] = res[key] / times * 100 + '%'
}

console.log(res)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> times = <span class="hljs-number">100000</span>;
<span class="hljs-keyword">var</span> res = {};

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; times; i++) {
    <span class="hljs-keyword">var</span> arr = shuffle([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]);

    <span class="hljs-keyword">var</span> key = <span class="hljs-built_in">JSON</span>.stringify(arr);
    res[key] ? res[key]++ :  res[key] = <span class="hljs-number">1</span>;
}

<span class="hljs-comment">// 为了方便展示，转换成百分比</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> res) {
    res[key] = res[key] / times * <span class="hljs-number">100</span> + <span class="hljs-string">'%'</span>
}

<span class="hljs-built_in">console</span>.log(res)</code></pre>
<p>这是一次随机的结果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011521016?w=2240&amp;h=276" src="https://static.alili.tech/img/remote/1460000011521016?w=2240&amp;h=276" alt="Fisher–Yates 效果演示" title="Fisher–Yates 效果演示" style="cursor: pointer; display: inline;"></span></p>
<p>真正的实现了乱序的效果！</p>
<h2 id="articleHeader5">专题系列</h2>
<p>JavaScript专题系列目录地址：<a href="https://github.com/mqyqingfeng/Blog" rel="nofollow noreferrer" target="_blank">https://github.com/mqyqingfeng/Blog</a>。</p>
<p>JavaScript专题系列预计写二十篇左右，主要研究日常开发中一些功能点的实现，比如防抖、节流、去重、类型判断、拷贝、最值、扁平、柯里、递归、乱序、排序等，特点是研(chao)究(xi) underscore 和 jQuery 的实现方式。</p>
<p>如果有错误或者不严谨的地方，请务必给予指正，十分感谢。如果喜欢或者有所启发，欢迎 star，对作者也是一种鼓励。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript专题之乱序

## 原文链接
[https://segmentfault.com/a/1190000011521009](https://segmentfault.com/a/1190000011521009)

