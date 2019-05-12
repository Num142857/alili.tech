---
title: 'JavaScript排序，不只是冒泡' 
date: 2019-01-18 2:30:34
hidden: true
slug: vxgf3fo2mk
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>非常非常推荐大家去读一本gitBook上的书 - <a href="https://sort.hust.cc/" rel="nofollow noreferrer" target="_blank">十大经典排序算法 : https://sort.hust.cc/</a> ， 本文的动图和演示代码均是这里面的。</p></blockquote>
<p>做编程，排序是个必然的需求。前端也不例外，虽然不多，但是你肯定会遇到。</p>
<p>不过说到排序，最容易想到的就是冒泡排序，选择排序，插入排序了。</p>
<h2 id="articleHeader0">冒泡排序</h2>
<p>依次比较相邻的两个元素，如果后一个小于前一个，则交换，这样从头到尾一次，就将最大的放到了末尾。</p>
<p>从头到尾再来一次，由于每进行一轮，最后的都已经是最大的了，因此后一轮需要比较次数可以比上一次少一个。虽然你还是可以让他从头到尾来比较，但是后面的比较是没有意义的无用功，为了效率，你应该对代码进行优化。</p>
<p>图片演示如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008796662?w=826&amp;h=257" src="https://static.alili.tech/img/remote/1460000008796662?w=826&amp;h=257" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>代码实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function bubbleSort(arr) {
    var len = arr.length;
    for (var i = 0; i < len - 1; i++) {
        for (var j = 0; j < len - 1 - i; j++) {
            if (arr[j] > arr[j+1]) {        // 相邻元素两两对比
                var temp = arr[j+1];        // 元素交换
                arr[j+1] = arr[j];
                arr[j] = temp;
            }
        }
    }
    return arr;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" rel="n"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bubbleSort</span>(<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-keyword">var</span> len = arr.length;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; len - <span class="hljs-number">1</span>; i++) {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>; j &lt; len - <span class="hljs-number">1</span> - i; j++) {
            <span class="hljs-keyword">if</span> (arr[j] &gt; arr[j+<span class="hljs-number">1</span>]) {        <span class="hljs-comment">// 相邻元素两两对比</span>
                <span class="hljs-keyword">var</span> temp = arr[j+<span class="hljs-number">1</span>];        <span class="hljs-comment">// 元素交换</span>
                arr[j+<span class="hljs-number">1</span>] = arr[j];
                arr[j] = temp;
            }
        }
    }
    <span class="hljs-keyword">return</span> arr;
}</code></pre>
<h2 id="articleHeader1">选择排序</h2>
<p>选择排序我觉得是最简单的了，大一学VB的时候，就只记住了这个排序方法，原理非常简单：每次都找一个最大或者最小的排在开始即可。</p>
<ol>
<li><p>首先在未排序序列中找到最小（大）元素，存放到排序序列的起始位置</p></li>
<li><p>再从剩余未排序元素中继续寻找最小（大）元素，然后放到已排序序列的末尾。</p></li>
<li><p>重复第二步，直到所有元素均排序完毕。</p></li>
</ol>
<p>动图演示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008796663?w=811&amp;h=248" src="https://static.alili.tech/img/remote/1460000008796663?w=811&amp;h=248" alt="" title="" style="cursor: pointer;"></span></p>
<p>代码演示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function selectionSort(arr) {
    var len = arr.length;
    var minIndex, temp;
    for (var i = 0; i < len - 1; i++) {
        minIndex = i;
        for (var j = i + 1; j < len; j++) {
            if (arr[j] < arr[minIndex]) {     // 寻找最小的数
                minIndex = j;                 // 将最小数的索引保存
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    return arr;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" rel="n"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">selectionSort</span>(<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-keyword">var</span> len = arr.length;
    <span class="hljs-keyword">var</span> minIndex, temp;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; len - <span class="hljs-number">1</span>; i++) {
        minIndex = i;
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = i + <span class="hljs-number">1</span>; j &lt; len; j++) {
            <span class="hljs-keyword">if</span> (arr[j] &lt; arr[minIndex]) {     <span class="hljs-comment">// 寻找最小的数</span>
                minIndex = j;                 <span class="hljs-comment">// 将最小数的索引保存</span>
            }
        }
        temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
    }
    <span class="hljs-keyword">return</span> arr;
}</code></pre>
<h2 id="articleHeader2">插入排序</h2>
<p>插入排序也比较简单。就像打扑克一样，依次将拿到的元素插入到正确的位置即可。</p>
<ol>
<li><p>将第一待排序序列第一个元素看做一个有序序列，把第二个元素到最后一个元素当成是未排序序列。</p></li>
<li><p>从头到尾依次扫描未排序序列，将扫描到的每个元素插入有序序列的适当位置。（如果待插入的元素与有序序列中的某个元素相等，则将待插入元素插入到相等元素的后面。）</p></li>
</ol>
<p>动图演示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008796664?w=811&amp;h=505" src="https://static.alili.tech/img/remote/1460000008796664?w=811&amp;h=505" alt="" title="" style="cursor: pointer;"></span></p>
<p>代码示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function insertionSort(arr) {
    var len = arr.length;
    var preIndex, current;
    for (var i = 1; i < len; i++) {
        preIndex = i - 1;
        current = arr[i];
        while(preIndex >= 0 &amp;&amp; arr[preIndex] > current) {
            arr[preIndex+1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex+1] = current;
    }
    return arr;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" rel="n"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">insertionSort</span>(<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-keyword">var</span> len = arr.length;
    <span class="hljs-keyword">var</span> preIndex, current;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt; len; i++) {
        preIndex = i - <span class="hljs-number">1</span>;
        current = arr[i];
        <span class="hljs-keyword">while</span>(preIndex &gt;= <span class="hljs-number">0</span> &amp;&amp; arr[preIndex] &gt; current) {
            arr[preIndex+<span class="hljs-number">1</span>] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex+<span class="hljs-number">1</span>] = current;
    }
    <span class="hljs-keyword">return</span> arr;
}</code></pre>
<h2 id="articleHeader3">简单的代价是低效</h2>
<p>上面三种都是非常简单的排序方法，简单的同时呢，效率也会比较低，还是拿这本书里的对比图来说明：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008796665?w=966&amp;h=588" src="https://static.alili.tech/img/remote/1460000008796665?w=966&amp;h=588" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>时间复杂度都高达<code>O(n^2)</code>,而它们后面的一些排序算法时间复杂度基本都只有<code>O(n log n)</code>。</p>
<p>我的强迫症又犯了，我想要高效率一点的排序方法。</p>
<h2 id="articleHeader4">归并排序</h2>
<p>简单把这本书的内容过了一遍，当时就理解了这个归并排序，因此这里就谈一下这个归并排序吧。</p>
<p>基本原理是分治法，就是分开并且递归来排序。</p>
<p>步骤如下：</p>
<blockquote><ol>
<li><p>申请空间，使其大小为两个已经排序序列之和，该空间用来存放合并后的序列；</p></li>
<li><p>设定两个指针，最初位置分别为两个已经排序序列的起始位置；</p></li>
<li><p>比较两个指针所指向的元素，选择相对小的元素放入到合并空间，并移动指针到下一位置；</p></li>
<li><p>重复步骤 3 直到某一指针达到序列尾；</p></li>
<li><p>将另一序列剩下的所有元素直接复制到合并序列尾。</p></li>
</ol></blockquote>
<p>动图演示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008796666?w=811&amp;h=505" src="https://static.alili.tech/img/remote/1460000008796666?w=811&amp;h=505" alt="" title="" style="cursor: pointer;"></span></p>
<p>代码示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function mergeSort(arr) {  // 采用自上而下的递归方法
    var len = arr.length;
    if(len < 2) {
        return arr;
    }
    var middle = Math.floor(len / 2),
        left = arr.slice(0, middle),
        right = arr.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}

function merge(left, right)
{
    var result = [];

    while (left.length &amp;&amp; right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length)
        result.push(left.shift());

    while (right.length)
        result.push(right.shift());

    return result;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" rel="n"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mergeSort</span>(<span class="hljs-params">arr</span>) </span>{  <span class="hljs-comment">// 采用自上而下的递归方法</span>
    <span class="hljs-keyword">var</span> len = arr.length;
    <span class="hljs-keyword">if</span>(len &lt; <span class="hljs-number">2</span>) {
        <span class="hljs-keyword">return</span> arr;
    }
    <span class="hljs-keyword">var</span> middle = <span class="hljs-built_in">Math</span>.floor(len / <span class="hljs-number">2</span>),
        left = arr.slice(<span class="hljs-number">0</span>, middle),
        right = arr.slice(middle);
    <span class="hljs-keyword">return</span> merge(mergeSort(left), mergeSort(right));
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">merge</span>(<span class="hljs-params">left, right</span>)
</span>{
    <span class="hljs-keyword">var</span> result = [];

    <span class="hljs-keyword">while</span> (left.length &amp;&amp; right.length) {
        <span class="hljs-keyword">if</span> (left[<span class="hljs-number">0</span>] &lt;= right[<span class="hljs-number">0</span>]) {
            result.push(left.shift());
        } <span class="hljs-keyword">else</span> {
            result.push(right.shift());
        }
    }

    <span class="hljs-keyword">while</span> (left.length)
        result.push(left.shift());

    <span class="hljs-keyword">while</span> (right.length)
        result.push(right.shift());

    <span class="hljs-keyword">return</span> result;
}
</code></pre>
<p>既然是个爱折腾的人，折腾了总得看看效果吧。</p>
<h2 id="articleHeader5">效率测试</h2>
<p>由于我学这个来进行排序不是对简单数组，数组内都是对象，要对对象的某个属性进行排序，还要考虑升降序。</p>
<p>因此我的代码实现如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * [归并排序]
 * @param  {[Array]} arr   [要排序的数组]
 * @param  {[String]} prop  [排序字段，用于数组成员是对象时，按照其某个属性进行排序，简单数组直接排序忽略此参数]
 * @param  {[String]} order [排序方式 省略或asc为升序 否则降序]
 * @return {[Array]}       [排序后数组，新数组，并非在原数组上的修改]
 */
var mergeSort = (function() {
    // 合并
    var _merge = function(left, right, prop) {
        var result = [];

        // 对数组内成员的某个属性排序
        if (prop) {
            while (left.length &amp;&amp; right.length) {
                if (left[0][prop] <= right[0][prop]) {
                    result.push(left.shift());
                } else {
                    result.push(right.shift());
                }
            }
        } else {
            // 数组成员直接排序
            while (left.length &amp;&amp; right.length) {
                if (left[0] <= right[0]) {
                    result.push(left.shift());
                } else {
                    result.push(right.shift());
                }
            }
        }

        while (left.length)
            result.push(left.shift());

        while (right.length)
            result.push(right.shift());

        return result;
    };

    var _mergeSort = function(arr, prop) { // 采用自上而下的递归方法
        var len = arr.length;
        if (len < 2) {
            return arr;
        }
        var middle = Math.floor(len / 2),
            left = arr.slice(0, middle),
            right = arr.slice(middle);
        return _merge(_mergeSort(left, prop), _mergeSort(right, prop), prop);
    };

    return function(arr, prop, order) {
        var result = _mergeSort(arr, prop);
        if (!order || order.toLowerCase() === 'asc') {
            // 升序
            return result;
        } else {
            // 降序
            var _ = [];
            result.forEach(function(item) {
                _.unshift(item);
            });
            return _;
        }
    };
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" rel="n"><span class="hljs-comment">/**
 * [归并排序]
 * @param  {[Array]} arr   [要排序的数组]
 * @param  {[String]} prop  [排序字段，用于数组成员是对象时，按照其某个属性进行排序，简单数组直接排序忽略此参数]
 * @param  {[String]} order [排序方式 省略或asc为升序 否则降序]
 * @return {[Array]}       [排序后数组，新数组，并非在原数组上的修改]
 */</span>
<span class="hljs-keyword">var</span> mergeSort = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 合并</span>
    <span class="hljs-keyword">var</span> _merge = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">left, right, prop</span>) </span>{
        <span class="hljs-keyword">var</span> result = [];

        <span class="hljs-comment">// 对数组内成员的某个属性排序</span>
        <span class="hljs-keyword">if</span> (prop) {
            <span class="hljs-keyword">while</span> (left.length &amp;&amp; right.length) {
                <span class="hljs-keyword">if</span> (left[<span class="hljs-number">0</span>][prop] &lt;= right[<span class="hljs-number">0</span>][prop]) {
                    result.push(left.shift());
                } <span class="hljs-keyword">else</span> {
                    result.push(right.shift());
                }
            }
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">// 数组成员直接排序</span>
            <span class="hljs-keyword">while</span> (left.length &amp;&amp; right.length) {
                <span class="hljs-keyword">if</span> (left[<span class="hljs-number">0</span>] &lt;= right[<span class="hljs-number">0</span>]) {
                    result.push(left.shift());
                } <span class="hljs-keyword">else</span> {
                    result.push(right.shift());
                }
            }
        }

        <span class="hljs-keyword">while</span> (left.length)
            result.push(left.shift());

        <span class="hljs-keyword">while</span> (right.length)
            result.push(right.shift());

        <span class="hljs-keyword">return</span> result;
    };

    <span class="hljs-keyword">var</span> _mergeSort = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">arr, prop</span>) </span>{ <span class="hljs-comment">// 采用自上而下的递归方法</span>
        <span class="hljs-keyword">var</span> len = arr.length;
        <span class="hljs-keyword">if</span> (len &lt; <span class="hljs-number">2</span>) {
            <span class="hljs-keyword">return</span> arr;
        }
        <span class="hljs-keyword">var</span> middle = <span class="hljs-built_in">Math</span>.floor(len / <span class="hljs-number">2</span>),
            left = arr.slice(<span class="hljs-number">0</span>, middle),
            right = arr.slice(middle);
        <span class="hljs-keyword">return</span> _merge(_mergeSort(left, prop), _mergeSort(right, prop), prop);
    };

    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">arr, prop, order</span>) </span>{
        <span class="hljs-keyword">var</span> result = _mergeSort(arr, prop);
        <span class="hljs-keyword">if</span> (!order || order.toLowerCase() === <span class="hljs-string">'asc'</span>) {
            <span class="hljs-comment">// 升序</span>
            <span class="hljs-keyword">return</span> result;
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">// 降序</span>
            <span class="hljs-keyword">var</span> _ = [];
            result.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>) </span>{
                _.unshift(item);
            });
            <span class="hljs-keyword">return</span> _;
        }
    };
})();</code></pre>
<p>需要对哪个属性进行排序是不确定，可以随意指定，因此写成了参数。有由于不想让这些东西在每次循环都进行判断，因此代码有点冗余。</p>
<p>关于降序的问题，也没有加入参数中，而是简单的升序后再逆序输出。原因是不想让每次循环递归里都去判断条件，所以简单处理了。</p>
<p>下面就是见证效率的时候了，一段数据模拟：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var getData = function() {
    return Mock.mock({
        &quot;list|1000&quot;: [{
            name: '@cname',
            age: '@integer(0,500)'
        }]
    }).list;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" rel="n"><span class="hljs-keyword">var</span> getData = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> Mock.mock({
        <span class="hljs-string">"list|1000"</span>: [{
            <span class="hljs-attr">name</span>: <span class="hljs-string">'@cname'</span>,
            <span class="hljs-attr">age</span>: <span class="hljs-string">'@integer(0,500)'</span>
        }]
    }).list;
};</code></pre>
<p>上面使用<code>Mock</code>进行了模拟数据，关于Mock ： <a href="http://mockjs.com/" rel="nofollow noreferrer" target="_blank">http://mockjs.com/</a></p>
<p>实际测试来啦：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 效率测试
var arr = getData();

console.time('归并排序');
mergeSort(arr, 'age');
console.timeEnd('归并排序');

console.time('冒泡排序');
for (var i = 0, l = arr.length; i < l - 1; ++i) {
    var temp;
    for (var j = 0; j < l - i - 1; ++j) {
        if (arr[j].age > arr[j + 1].age) {
            temp = arr[j + 1];
            arr[j + 1] = arr[j];
            arr[j] = temp;
        }
    }
}
console.timeEnd('冒泡排序');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" rel="n"><span class="hljs-comment">// 效率测试</span>
<span class="hljs-keyword">var</span> arr = getData();

<span class="hljs-built_in">console</span>.time(<span class="hljs-string">'归并排序'</span>);
mergeSort(arr, <span class="hljs-string">'age'</span>);
<span class="hljs-built_in">console</span>.timeEnd(<span class="hljs-string">'归并排序'</span>);

<span class="hljs-built_in">console</span>.time(<span class="hljs-string">'冒泡排序'</span>);
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>, l = arr.length; i &lt; l - <span class="hljs-number">1</span>; ++i) {
    <span class="hljs-keyword">var</span> temp;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>; j &lt; l - i - <span class="hljs-number">1</span>; ++j) {
        <span class="hljs-keyword">if</span> (arr[j].age &gt; arr[j + <span class="hljs-number">1</span>].age) {
            temp = arr[j + <span class="hljs-number">1</span>];
            arr[j + <span class="hljs-number">1</span>] = arr[j];
            arr[j] = temp;
        }
    }
}
<span class="hljs-built_in">console</span>.timeEnd(<span class="hljs-string">'冒泡排序'</span>);</code></pre>
<p>进行了五次，效果如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 归并排序: 6.592ms
// 冒泡排序: 25.959ms

// 归并排序: 1.334ms
// 冒泡排序: 20.078ms

// 归并排序: 1.085ms
// 冒泡排序: 16.420ms

// 归并排序: 1.200ms
// 冒泡排序: 16.574ms

// 归并排序: 2.593ms
// 冒泡排序: 12.653ms" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" rel="n"><span class="hljs-comment">// 归并排序: 6.592ms</span>
<span class="hljs-comment">// 冒泡排序: 25.959ms</span>

<span class="hljs-comment">// 归并排序: 1.334ms</span>
<span class="hljs-comment">// 冒泡排序: 20.078ms</span>

<span class="hljs-comment">// 归并排序: 1.085ms</span>
<span class="hljs-comment">// 冒泡排序: 16.420ms</span>

<span class="hljs-comment">// 归并排序: 1.200ms</span>
<span class="hljs-comment">// 冒泡排序: 16.574ms</span>

<span class="hljs-comment">// 归并排序: 2.593ms</span>
<span class="hljs-comment">// 冒泡排序: 12.653ms</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008796667?w=206&amp;h=246" src="https://static.alili.tech/img/remote/1460000008796667?w=206&amp;h=246" alt="" title="" style="cursor: pointer;"></span></p>
<p>最低4倍，最高近16倍的效率之差还是比较满意的。</p>
<p>虽然<code>1000</code>条数据让前端排序的可能性不大，但是几十上百条的情况还是有的。另外由于node，<code>JavaScript</code>也能运行的服务端了，这个效率的提升也还是有用武之地的。</p>
<h2 id="articleHeader6">一点疑问</h2>
<p>归并排序里面使用了递归，在《数据结构与算法 JavaScript 描述》中，作者给出了自下而上的迭代方法。但是对于递归法，作者却认为：</p>
<blockquote>
<p>However, it is not possible to do so in JavaScript, as the recursion goes too deep for the language to handle.</p>
<p>然而，在 JavaScript 中这种方式不太可行，因为这个算法的递归深度对它来讲太深了。</p>
</blockquote>
<p>gitbook上这本书的作者对此有疑问，我也有疑问。</p>
<p>归并中虽然用了递归，但是他是放在<code>return</code>后的呀。关于在renturn后的递归是有尾递归优化的呀。</p>
<p>关于尾递归优化是指：本来外层函数内部再调用一个函数的话，由于外层函数需要等待内层函数返回后才能返回结果，进入内层函数后，外层函数的信息，内存中是必须记住的，也就是调用堆栈。而内部函数放在<code>return</code>关键字后，就表示外层函数到此也就结束了，进入内层函数后，没有必要再记住外层函数内的所有信息。</p>
<p>上面是我的理解的描述，不知道算不算准确。<strong>chrome</strong>下已经可以开启尾递归优化的功能了，我觉得这个递归是不该影响他在<code>JavaScript</code>下的使用的。</p>
<h2 id="articleHeader7">最后</h2>
<p>有兴趣的话，推荐读读这本书，进行排序的时候，可以考虑一些更高效的方法。</p>
<p>不过需要注意的是，这些高效率的排序方法，一般都需要相对较多的额外内存空间，需要权衡一下。</p>
<p>另外，非常小规模的数据就没有必要了。一是影响太小，而是我们人的效率问题，一分钟能从头写个冒泡、选择、插入的排序方法，而换成是归并排序呢？</p>
<p>原文发表在我的博客<a href="http://blog.cdswyda.com/post/javascript/2017-03-22-js-sort-not-only-bubblesort" rel="nofollow noreferrer" target="_blank">JavaScript排序，不只是冒泡</a>，欢迎访问！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript排序，不只是冒泡

## 原文链接
[https://segmentfault.com/a/1190000008796659](https://segmentfault.com/a/1190000008796659)

