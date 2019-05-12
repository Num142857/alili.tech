---
title: 'JavaScript专题之解读 v8 排序源码' 
date: 2018-12-28 2:30:11
hidden: true
slug: tarrvk1f7or
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>JavaScript 专题系列第二十篇，也是最后一篇，解读 v8 排序源码</p></blockquote>
<h2 id="articleHeader0">前言</h2>
<p>v8 是 Chrome 的 JavaScript 引擎，其中关于数组的排序完全采用了 JavaScript 实现。</p>
<p>排序采用的算法跟数组的长度有关，当数组长度小于等于 10 时，采用插入排序，大于 10 的时候，采用快速排序。(当然了，这种说法并不严谨)。</p>
<p>我们先来看看插入排序和快速排序。</p>
<h2 id="articleHeader1">插入排序</h2>
<h3 id="articleHeader2">原理</h3>
<p>将第一个元素视为有序序列，遍历数组，将之后的元素依次插入这个构建的有序序列中。</p>
<h3 id="articleHeader3">图示</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011521014?w=394&amp;h=520" src="https://static.alili.tech/img/remote/1460000011521014?w=394&amp;h=520" alt="插入排序" title="插入排序" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">实现</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function insertionSort(arr) {
    for (var i = 1; i < arr.length; i++) {
        var element = arr[i];
        for (var j = i - 1; j >= 0; j--) {
            var tmp = arr[j];
            var order = tmp - element;
            if (order > 0) {
                arr[j + 1] = tmp;
            } else {
                break;
            }
        }
        arr[j + 1] = element;
    }
    return arr;
}

var arr = [6, 5, 4, 3, 2, 1];
console.log(insertionSort(arr));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">insertionSort</span>(<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt; arr.length; i++) {
        <span class="hljs-keyword">var</span> element = arr[i];
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = i - <span class="hljs-number">1</span>; j &gt;= <span class="hljs-number">0</span>; j--) {
            <span class="hljs-keyword">var</span> tmp = arr[j];
            <span class="hljs-keyword">var</span> order = tmp - element;
            <span class="hljs-keyword">if</span> (order &gt; <span class="hljs-number">0</span>) {
                arr[j + <span class="hljs-number">1</span>] = tmp;
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-keyword">break</span>;
            }
        }
        arr[j + <span class="hljs-number">1</span>] = element;
    }
    <span class="hljs-keyword">return</span> arr;
}

<span class="hljs-keyword">var</span> arr = [<span class="hljs-number">6</span>, <span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">3</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>];
<span class="hljs-built_in">console</span>.log(insertionSort(arr));</code></pre>
<h3 id="articleHeader5">时间复杂度</h3>
<p>时间复杂度是指执行算法所需要的计算工作量，它考察当输入值大小趋近无穷时的情况，一般情况下，算法中基本操作重复执行的次数是问题规模 n 的某个函数。</p>
<p>最好情况：数组升序排列，时间复杂度为：O(n)</p>
<p>最坏情况：数组降序排列，时间复杂度为：O(n²)</p>
<h3 id="articleHeader6">稳定性</h3>
<p>稳定性，是指相同的元素在排序后是否还保持相对的位置。</p>
<p>要注意的是对于不稳定的排序算法，只要举出一个实例，即可说明它的不稳定性；而对于稳定的排序算法，必须对算法进行分析从而得到稳定的特性。</p>
<p>比如 [3, 3, 1]，排序后，还是 [3, 3, 1]，但是其实是第二个 3 在 第一个 3 前，那这就是不稳定的排序算法。</p>
<p>插入排序是稳定的算法。</p>
<h3 id="articleHeader7">优势</h3>
<p>当数组是快要排序好的状态或者问题规模比较小的时候，插入排序效率更高。这也是为什么 v8 会在数组长度小于等于 10 的时候采用插入排序。</p>
<h2 id="articleHeader8">快速排序</h2>
<h3 id="articleHeader9">原理</h3>
<ol>
<li>选择一个元素作为"基准"</li>
<li>小于"基准"的元素，都移到"基准"的左边；大于"基准"的元素，都移到"基准"的右边。</li>
<li>对"基准"左边和右边的两个子集，不断重复第一步和第二步，直到所有子集只剩下一个元素为止。</li>
</ol>
<h3 id="articleHeader10">示例</h3>
<p>示例和下面的实现方式来源于阮一峰老师的<a href="http://www.ruanyifeng.com/blog/2011/04/quicksort_in_javascript.html" rel="nofollow noreferrer" target="_blank">《快速排序（Quicksort）的Javascript实现》</a> </p>
<p>以数组 [85, 24, 63, 45, 17, 31, 96, 50] 为例：</p>
<p>第一步，选择中间的元素 45 作为"基准"。（基准值可以任意选择，但是选择中间的值比较容易理解。）</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011623642?w=1044&amp;h=152" src="https://static.alili.tech/img/remote/1460000011623642?w=1044&amp;h=152" alt="quick 第一步" title="quick 第一步" style="cursor: pointer; display: inline;"></span></p>
<p>第二步，按照顺序，将每个元素与"基准"进行比较，形成两个子集，一个"小于45"，另一个"大于等于45"。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011623643?w=1054&amp;h=156" src="https://static.alili.tech/img/remote/1460000011623643?w=1054&amp;h=156" alt="quick 第二步" title="quick 第二步" style="cursor: pointer; display: inline;"></span></p>
<p>第三步，对两个子集不断重复第一步和第二步，直到所有子集只剩下一个元素为止。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011623644?w=1056&amp;h=620" src="https://static.alili.tech/img/remote/1460000011623644?w=1056&amp;h=620" alt="quick 第三步" title="quick 第三步" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader11">实现</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var quickSort = function(arr) {
　　if (arr.length <= 1) { return arr; }
    // 取数组的中间元素作为基准
　　var pivotIndex = Math.floor(arr.length / 2);
　　var pivot = arr.splice(pivotIndex, 1)[0];

　　var left = [];
　　var right = [];

　　for (var i = 0; i < arr.length; i++){
　　　　if (arr[i] < pivot) {
　　　　　　left.push(arr[i]);
　　　　} else {
　　　　　　right.push(arr[i]);
　　　　}
　　}
　　return quickSort(left).concat([pivot], quickSort(right));
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> quickSort = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">arr</span>) </span>{
　　<span class="hljs-keyword">if</span> (arr.length &lt;= <span class="hljs-number">1</span>) { <span class="hljs-keyword">return</span> arr; }
    <span class="hljs-comment">// 取数组的中间元素作为基准</span>
　　<span class="hljs-keyword">var</span> pivotIndex = <span class="hljs-built_in">Math</span>.floor(arr.length / <span class="hljs-number">2</span>);
　　<span class="hljs-keyword">var</span> pivot = arr.splice(pivotIndex, <span class="hljs-number">1</span>)[<span class="hljs-number">0</span>];

　　<span class="hljs-keyword">var</span> left = [];
　　<span class="hljs-keyword">var</span> right = [];

　　<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++){
　　　　<span class="hljs-keyword">if</span> (arr[i] &lt; pivot) {
　　　　　　left.push(arr[i]);
　　　　} <span class="hljs-keyword">else</span> {
　　　　　　right.push(arr[i]);
　　　　}
　　}
　　<span class="hljs-keyword">return</span> quickSort(left).concat([pivot], quickSort(right));
};</code></pre>
<p>然而这种实现方式需要额外的空间用来储存左右子集，所以还有一种原地(in-place)排序的实现方式。</p>
<h3 id="articleHeader12">图示</h3>
<p>我们来看看原地排序的实现图示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011623645?w=866&amp;h=260" src="https://static.alili.tech/img/remote/1460000011623645?w=866&amp;h=260" alt="快速排序" title="快速排序" style="cursor: pointer;"></span></p>
<p>为了让大家看明白快速排序的原理，我调慢了执行速度。</p>
<p>在这张示意图里，基准的取值规则是取最左边的元素，黄色代表当前的基准，绿色代表小于基准的元素，紫色代表大于基准的元素。</p>
<p>我们会发现，绿色的元素会紧挨在基准的右边，紫色的元素会被移到后面，然后交换基准和绿色的最后一个元素，此时，基准处于正确的位置，即前面的元素都小于基准值，后面的元素都大于基准值。然后再对前面的和后面的多个元素取基准，做排序。</p>
<h3 id="articleHeader13">in-place 实现</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function quickSort(arr) {
    // 交换元素
    function swap(arr, a, b) {
        var temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;
    }

    function partition(arr, left, right) {
        var pivot = arr[left];
        var storeIndex = left;

        for (var i = left + 1; i <= right; i++) {
            if (arr[i] < pivot) {
                swap(arr, ++storeIndex, i);
            }
        }

        swap(arr, left, storeIndex);

        return storeIndex;
    }

    function sort(arr, left, right) {
        if (left < right) {
            var storeIndex = partition(arr, left, right);
            sort(arr, left, storeIndex - 1);
            sort(arr, storeIndex + 1, right);
        }
    }

    sort(arr, 0, arr.length - 1);

    return arr;
}

console.log(quickSort(6, 7, 3, 4, 1, 5, 9, 2, 8))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">quickSort</span>(<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-comment">// 交换元素</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">swap</span>(<span class="hljs-params">arr, a, b</span>) </span>{
        <span class="hljs-keyword">var</span> temp = arr[a];
        arr[a] = arr[b];
        arr[b] = temp;
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">partition</span>(<span class="hljs-params">arr, left, right</span>) </span>{
        <span class="hljs-keyword">var</span> pivot = arr[left];
        <span class="hljs-keyword">var</span> storeIndex = left;

        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = left + <span class="hljs-number">1</span>; i &lt;= right; i++) {
            <span class="hljs-keyword">if</span> (arr[i] &lt; pivot) {
                swap(arr, ++storeIndex, i);
            }
        }

        swap(arr, left, storeIndex);

        <span class="hljs-keyword">return</span> storeIndex;
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sort</span>(<span class="hljs-params">arr, left, right</span>) </span>{
        <span class="hljs-keyword">if</span> (left &lt; right) {
            <span class="hljs-keyword">var</span> storeIndex = partition(arr, left, right);
            sort(arr, left, storeIndex - <span class="hljs-number">1</span>);
            sort(arr, storeIndex + <span class="hljs-number">1</span>, right);
        }
    }

    sort(arr, <span class="hljs-number">0</span>, arr.length - <span class="hljs-number">1</span>);

    <span class="hljs-keyword">return</span> arr;
}

<span class="hljs-built_in">console</span>.log(quickSort(<span class="hljs-number">6</span>, <span class="hljs-number">7</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">1</span>, <span class="hljs-number">5</span>, <span class="hljs-number">9</span>, <span class="hljs-number">2</span>, <span class="hljs-number">8</span>))</code></pre>
<h3 id="articleHeader14">稳定性</h3>
<p>快速排序是不稳定的排序。如果要证明一个排序是不稳定的，你只用举出一个实例就行。</p>
<p>所以我们举一个呗~</p>
<p>就以数组 [1, 2, 3, 3, 4, 5] 为例，因为基准的选择不确定，假如选定了第三个元素(也就是第一个 3) 为基准，所有小于 3 的元素在前面，大于等于 3 的在后面，排序的结果没有问题。可是如果选择了第四个元素(也就是第二个 3 )，小于 3 的在基准前面，大于等于 3 的在基准后面，第一个 3 就会被移动到 第二个 3 后面，所以快速排序是不稳定的排序。</p>
<h3 id="articleHeader15">时间复杂度</h3>
<p>阮一峰老师的实现中，基准取的是中间元素，而原地排序中基准取最左边的元素。快速排序的关键点就在于基准的选择，选取不同的基准时，会有不同性能表现。</p>
<p>快速排序的时间复杂度最好为 O(nlogn)，可是为什么是 nlogn 呢？来一个并不严谨的证明：</p>
<p>在最佳情况下，每一次都平分整个数组。假设数组有 n 个元素，其递归的深度就为 log<sub>2</sub>n + 1，时间复杂度为 O(n)[(log<sub>2</sub>n + 1)]，因为时间复杂度考察当输入值大小趋近无穷时的情况，所以会忽略低阶项，时间复杂度为：o(nlog<sub>2</sub>n)。</p>
<p>如果一个程序的运行时间是对数级的，则随着 n 的增大程序会渐渐慢下来。如果底数是 10，lg1000 等于 3，如果 n 为 1000000，lgn 等于 6，仅为之前的两倍。如果底数为 2，log<sub>2</sub>1000 的值约为 10，log<sub>2</sub>1000000 的值约为 19，约为之前的两倍。我们可以发现任意底数的一个对数函数其实都相差一个常数倍而已。所以我们认为 O(logn)已经可以表达所有底数的对数了，所以时间复杂度最后为： O(nlogn)。</p>
<p>而在最差情况下，如果对一个已经排序好的数组，每次选择基准元素时总是选择第一个元素或者最后一个元素，那么每次都会有一个子集是空的，递归的层数将达到 n，最后导致算法的时间复杂度退化为 O(n²)。</p>
<p>这也充分说明了一个基准的选择是多么的重要，而 v8 为了提高性能，就对基准的选择做了很多优化。</p>
<h2 id="articleHeader16">v8 基准选择</h2>
<p>v8 选择基准的原理是从头和尾之外再选择一个元素，然后三个值排序取中间值。</p>
<p>当数组长度大于 10 但是小于 1000 的时候，取中间位置的元素，实现代码为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 基准的下标
// >> 1 相当于除以 2 (忽略余数)
third_index = from + ((to - from) >> 1);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 基准的下标</span>
<span class="hljs-comment">// &gt;&gt; 1 相当于除以 2 (忽略余数)</span>
third_index = <span class="hljs-keyword">from</span> + ((to - <span class="hljs-keyword">from</span>) &gt;&gt; <span class="hljs-number">1</span>);</code></pre>
<p>当数组长度大于 1000 的时候，每隔 200 ~ 215 个元素取一个值，然后将这些值进行排序，取中间值的下标，实现的代码为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 简单处理过
function GetThirdIndex(a, from, to) {
    var t_array = new Array();

    // &amp; 位运算符
    var increment = 200 + ((to - from) &amp; 15);

    var j = 0;
    from += 1;
    to -= 1;

    for (var i = from; i < to; i += increment) {
        t_array[j] = [i, a[i]];
        j++;
    }
    // 对随机挑选的这些值进行排序
    t_array.sort(function(a, b) {
        return comparefn(a[1], b[1]);
    });
    // 取中间值的下标
    var third_index = t_array[t_array.length >> 1][0];
    return third_index;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 简单处理过</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">GetThirdIndex</span>(<span class="hljs-params">a, from, to</span>) </span>{
    <span class="hljs-keyword">var</span> t_array = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>();

    <span class="hljs-comment">// &amp; 位运算符</span>
    <span class="hljs-keyword">var</span> increment = <span class="hljs-number">200</span> + ((to - <span class="hljs-keyword">from</span>) &amp; <span class="hljs-number">15</span>);

    <span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">from</span> += <span class="hljs-number">1</span>;
    to -= <span class="hljs-number">1</span>;

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-keyword">from</span>; i &lt; to; i += increment) {
        t_array[j] = [i, a[i]];
        j++;
    }
    <span class="hljs-comment">// 对随机挑选的这些值进行排序</span>
    t_array.sort(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b</span>) </span>{
        <span class="hljs-keyword">return</span> comparefn(a[<span class="hljs-number">1</span>], b[<span class="hljs-number">1</span>]);
    });
    <span class="hljs-comment">// 取中间值的下标</span>
    <span class="hljs-keyword">var</span> third_index = t_array[t_array.length &gt;&gt; <span class="hljs-number">1</span>][<span class="hljs-number">0</span>];
    <span class="hljs-keyword">return</span> third_index;
}</code></pre>
<p>也许你会好奇 <code>200 + ((to - from) &amp; 15)</code> 是什么意思？</p>
<p><code>&amp;</code> 表示是按位与，对整数操作数逐位执行布尔与操作。只有两个操作数中相对应的位都是 1，结果中的这一位才是 1。</p>
<p>以 <code>15 &amp; 127</code> 为例：</p>
<p>15 二进制为： （0000 1111）</p>
<p>127 二进制为：（1111 1111）</p>
<p>按位与结果为：（0000 1111）＝ 15</p>
<p>所以 <code>15 &amp; 127</code> 的结果为 <code>15</code>。</p>
<p>注意 15 的二进制为： <code>1111</code>，这就意味着任何和 15 按位与的结果都会小于或者等于 15，这才实现了每隔 200 ~ 215 个元素取一个值。</p>
<h2 id="articleHeader17">v8 源码</h2>
<p>终于到了看源码的时刻！源码地址为：<a href="https://github.com/v8/v8/blob/master/src/js/array.js#L758" rel="nofollow noreferrer" target="_blank">https://github.com/v8/v8/blob/master/src/js/array.js#L758</a>。</p>
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
};


function QuickSort(a, from, to) {

    var third_index = 0;
    while (true) {
            // Insertion sort is faster for short arrays.
        if (to - from <= 10) {
            InsertionSort(a, from, to);
            return;
        }
        if (to - from > 1000) {
            third_index = GetThirdIndex(a, from, to);
        } else {
            third_index = from + ((to - from) >> 1);
        }
        // Find a pivot as the median of first, last and middle element.
        var v0 = a[from];
        var v1 = a[to - 1];
        var v2 = a[third_index];

        var c01 = comparefn(v0, v1);
        if (c01 > 0) {
            // v1 < v0, so swap them.
            var tmp = v0;
            v0 = v1;
            v1 = tmp;
        } // v0 <= v1.
        var c02 = comparefn(v0, v2);
        if (c02 >= 0) {
            // v2 <= v0 <= v1.
            var tmp = v0;
            v0 = v2;
            v2 = v1;
            v1 = tmp;
        } else {
            // v0 <= v1 &amp;&amp; v0 < v2
            var c12 = comparefn(v1, v2);
            if (c12 > 0) {
                // v0 <= v2 < v1
                var tmp = v1;
                v1 = v2;
                v2 = tmp;
            }
        }

        // v0 <= v1 <= v2
        a[from] = v0;
        a[to - 1] = v2;

        var pivot = v1;

        var low_end = from + 1; // Upper bound of elements lower than pivot.
        var high_start = to - 1; // Lower bound of elements greater than pivot.

        a[third_index] = a[low_end];
        a[low_end] = pivot;

        // From low_end to i are elements equal to pivot.
        // From i to high_start are elements that haven't been compared yet.

        partition: for (var i = low_end + 1; i < high_start; i++) {
            var element = a[i];
            var order = comparefn(element, pivot);
            if (order < 0) {
                a[i] = a[low_end];
                a[low_end] = element;
                low_end++;
            } else if (order > 0) {
                do {
                    high_start--;
                    if (high_start == i) break partition;
                    var top_elem = a[high_start];
                    order = comparefn(top_elem, pivot);
                } while (order > 0);

                a[i] = a[high_start];
                a[high_start] = element;
                if (order < 0) {
                    element = a[i];
                    a[i] = a[low_end];
                    a[low_end] = element;
                    low_end++;
                }
            }
        }


        if (to - high_start < low_end - from) {
            QuickSort(a, high_start, to);
            to = low_end;
        } else {
            QuickSort(a, from, low_end);
            from = high_start;
        }
    }
}

var arr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

function comparefn(a, b) {
    return a - b
}

QuickSort(arr, 0, arr.length)
console.log(arr)" title="" data-original-title="复制"></span>
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
};


<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">QuickSort</span>(<span class="hljs-params">a, from, to</span>) </span>{

    <span class="hljs-keyword">var</span> third_index = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {
            <span class="hljs-comment">// Insertion sort is faster for short arrays.</span>
        <span class="hljs-keyword">if</span> (to - <span class="hljs-keyword">from</span> &lt;= <span class="hljs-number">10</span>) {
            InsertionSort(a, <span class="hljs-keyword">from</span>, to);
            <span class="hljs-keyword">return</span>;
        }
        <span class="hljs-keyword">if</span> (to - <span class="hljs-keyword">from</span> &gt; <span class="hljs-number">1000</span>) {
            third_index = GetThirdIndex(a, <span class="hljs-keyword">from</span>, to);
        } <span class="hljs-keyword">else</span> {
            third_index = <span class="hljs-keyword">from</span> + ((to - <span class="hljs-keyword">from</span>) &gt;&gt; <span class="hljs-number">1</span>);
        }
        <span class="hljs-comment">// Find a pivot as the median of first, last and middle element.</span>
        <span class="hljs-keyword">var</span> v0 = a[<span class="hljs-keyword">from</span>];
        <span class="hljs-keyword">var</span> v1 = a[to - <span class="hljs-number">1</span>];
        <span class="hljs-keyword">var</span> v2 = a[third_index];

        <span class="hljs-keyword">var</span> c01 = comparefn(v0, v1);
        <span class="hljs-keyword">if</span> (c01 &gt; <span class="hljs-number">0</span>) {
            <span class="hljs-comment">// v1 &lt; v0, so swap them.</span>
            <span class="hljs-keyword">var</span> tmp = v0;
            v0 = v1;
            v1 = tmp;
        } <span class="hljs-comment">// v0 &lt;= v1.</span>
        <span class="hljs-keyword">var</span> c02 = comparefn(v0, v2);
        <span class="hljs-keyword">if</span> (c02 &gt;= <span class="hljs-number">0</span>) {
            <span class="hljs-comment">// v2 &lt;= v0 &lt;= v1.</span>
            <span class="hljs-keyword">var</span> tmp = v0;
            v0 = v2;
            v2 = v1;
            v1 = tmp;
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">// v0 &lt;= v1 &amp;&amp; v0 &lt; v2</span>
            <span class="hljs-keyword">var</span> c12 = comparefn(v1, v2);
            <span class="hljs-keyword">if</span> (c12 &gt; <span class="hljs-number">0</span>) {
                <span class="hljs-comment">// v0 &lt;= v2 &lt; v1</span>
                <span class="hljs-keyword">var</span> tmp = v1;
                v1 = v2;
                v2 = tmp;
            }
        }

        <span class="hljs-comment">// v0 &lt;= v1 &lt;= v2</span>
        a[<span class="hljs-keyword">from</span>] = v0;
        a[to - <span class="hljs-number">1</span>] = v2;

        <span class="hljs-keyword">var</span> pivot = v1;

        <span class="hljs-keyword">var</span> low_end = <span class="hljs-keyword">from</span> + <span class="hljs-number">1</span>; <span class="hljs-comment">// Upper bound of elements lower than pivot.</span>
        <span class="hljs-keyword">var</span> high_start = to - <span class="hljs-number">1</span>; <span class="hljs-comment">// Lower bound of elements greater than pivot.</span>

        a[third_index] = a[low_end];
        a[low_end] = pivot;

        <span class="hljs-comment">// From low_end to i are elements equal to pivot.</span>
        <span class="hljs-comment">// From i to high_start are elements that haven't been compared yet.</span>

        partition: <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = low_end + <span class="hljs-number">1</span>; i &lt; high_start; i++) {
            <span class="hljs-keyword">var</span> element = a[i];
            <span class="hljs-keyword">var</span> order = comparefn(element, pivot);
            <span class="hljs-keyword">if</span> (order &lt; <span class="hljs-number">0</span>) {
                a[i] = a[low_end];
                a[low_end] = element;
                low_end++;
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (order &gt; <span class="hljs-number">0</span>) {
                <span class="hljs-keyword">do</span> {
                    high_start--;
                    <span class="hljs-keyword">if</span> (high_start == i) <span class="hljs-keyword">break</span> partition;
                    <span class="hljs-keyword">var</span> top_elem = a[high_start];
                    order = comparefn(top_elem, pivot);
                } <span class="hljs-keyword">while</span> (order &gt; <span class="hljs-number">0</span>);

                a[i] = a[high_start];
                a[high_start] = element;
                <span class="hljs-keyword">if</span> (order &lt; <span class="hljs-number">0</span>) {
                    element = a[i];
                    a[i] = a[low_end];
                    a[low_end] = element;
                    low_end++;
                }
            }
        }


        <span class="hljs-keyword">if</span> (to - high_start &lt; low_end - <span class="hljs-keyword">from</span>) {
            QuickSort(a, high_start, to);
            to = low_end;
        } <span class="hljs-keyword">else</span> {
            QuickSort(a, <span class="hljs-keyword">from</span>, low_end);
            <span class="hljs-keyword">from</span> = high_start;
        }
    }
}

<span class="hljs-keyword">var</span> arr = [<span class="hljs-number">10</span>, <span class="hljs-number">9</span>, <span class="hljs-number">8</span>, <span class="hljs-number">7</span>, <span class="hljs-number">6</span>, <span class="hljs-number">5</span>, <span class="hljs-number">4</span>, <span class="hljs-number">3</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>, <span class="hljs-number">0</span>];

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">comparefn</span>(<span class="hljs-params">a, b</span>) </span>{
    <span class="hljs-keyword">return</span> a - b
}

QuickSort(arr, <span class="hljs-number">0</span>, arr.length)
<span class="hljs-built_in">console</span>.log(arr)</code></pre>
<p>我们以数组 <code>[10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]</code> 为例，分析执行的过程。</p>
<p>1.执行 QuickSort 函数 参数 from 值为 0，参数 to 的值 11。</p>
<p>2.10 &lt; to - from &lt; 1000 第三个基准元素的下标为 <code>(0 + 11 &gt;&gt; 1) = 5</code>，基准值 a[5] 为 5。</p>
<p>3.比较 a[0] a[10] a[5] 的值，然后根据比较结果修改数组，数组此时为 [0, 9, 8, 7, 6, 5, 4, 3, 2, 1, 10]</p>
<p>4.将基准值和数组的第(from + 1)个即数组的第二个元素互换，此时数组为 [0, 5, 8, 7, 6, 9, 4, 3, 2, 1, 10]，此时在基准值 5 前面的元素肯定是小于 5 的，因为第三步已经做了一次比较。后面的元素是未排序的。</p>
<p>我们接下来要做的就是把后面的元素中小于 5 的全部移到 5 的前面。</p>
<p>5.然后我们进入 partition 循环，我们依然以这个数组为例，单独抽出来写个 demo 讲一讲</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 假设代码执行到这里，为了方便演示，我们直接设置 low_end 等变量的值
// 可以直接复制到浏览器中查看数组变换效果
var a = [0, 5, 8, 7, 6, 9, 4, 3, 2, 1, 10]
var low_end = 1;
var high_start = 10;
var pivot = 5;

console.log('起始数组为', a)

partition: for (var i = low_end + 1; i < high_start; i++) {

    var element = a[i];
    console.log('循环当前的元素为：', a[i])
    var order = element - pivot;

    if (order < 0) {
        a[i] = a[low_end];
        a[low_end] = element;
        low_end++;
        console.log(a)
    }
    else if (order > 0) {
        do {
            high_start--;
            if (high_start == i) break partition;
            var top_elem = a[high_start];
            order = top_elem - pivot;
        } while (order > 0);

        a[i] = a[high_start];
        a[high_start] = element;

        console.log(a)

        if (order < 0) {
            element = a[i];
            a[i] = a[low_end];
            a[low_end] = element;
            low_end++;
        }
        console.log(a)
    }
}

console.log('最后的结果为', a)
console.log(low_end)
console.log(high_start)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 假设代码执行到这里，为了方便演示，我们直接设置 low_end 等变量的值</span>
<span class="hljs-comment">// 可以直接复制到浏览器中查看数组变换效果</span>
<span class="hljs-keyword">var</span> a = [<span class="hljs-number">0</span>, <span class="hljs-number">5</span>, <span class="hljs-number">8</span>, <span class="hljs-number">7</span>, <span class="hljs-number">6</span>, <span class="hljs-number">9</span>, <span class="hljs-number">4</span>, <span class="hljs-number">3</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>, <span class="hljs-number">10</span>]
<span class="hljs-keyword">var</span> low_end = <span class="hljs-number">1</span>;
<span class="hljs-keyword">var</span> high_start = <span class="hljs-number">10</span>;
<span class="hljs-keyword">var</span> pivot = <span class="hljs-number">5</span>;

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'起始数组为'</span>, a)

partition: <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = low_end + <span class="hljs-number">1</span>; i &lt; high_start; i++) {

    <span class="hljs-keyword">var</span> element = a[i];
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'循环当前的元素为：'</span>, a[i])
    <span class="hljs-keyword">var</span> order = element - pivot;

    <span class="hljs-keyword">if</span> (order &lt; <span class="hljs-number">0</span>) {
        a[i] = a[low_end];
        a[low_end] = element;
        low_end++;
        <span class="hljs-built_in">console</span>.log(a)
    }
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (order &gt; <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">do</span> {
            high_start--;
            <span class="hljs-keyword">if</span> (high_start == i) <span class="hljs-keyword">break</span> partition;
            <span class="hljs-keyword">var</span> top_elem = a[high_start];
            order = top_elem - pivot;
        } <span class="hljs-keyword">while</span> (order &gt; <span class="hljs-number">0</span>);

        a[i] = a[high_start];
        a[high_start] = element;

        <span class="hljs-built_in">console</span>.log(a)

        <span class="hljs-keyword">if</span> (order &lt; <span class="hljs-number">0</span>) {
            element = a[i];
            a[i] = a[low_end];
            a[low_end] = element;
            low_end++;
        }
        <span class="hljs-built_in">console</span>.log(a)
    }
}

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'最后的结果为'</span>, a)
<span class="hljs-built_in">console</span>.log(low_end)
<span class="hljs-built_in">console</span>.log(high_start)</code></pre>
<p>6.此时数组为 <code>[0, 5, 8, 7, 6, 9, 4, 3, 2, 1, 10]</code>，循环从第三个元素开始，a[i] 的值为 8，因为大于基准值 5，即 order &gt; 0，开始执行 do while 循环，do while 循环的目的在于倒序查找元素，找到第一个小于基准值的元素，然后让这个元素跟 a[i] 的位置交换。<br>第一个小于基准值的元素为 1，然后 1 与 8 交换，数组变成  <code>[0, 5, 1, 7, 6, 9, 4, 3, 2, 8, 10]</code>。high_start 的值是为了记录倒序查找到哪里了。</p>
<p>7.此时 a[i] 的值变成了 1，然后让 1 跟 基准值 5 交换，数组变成了 <code>[0, 1, 5, 7, 6, 9, 4, 3, 2, 8, 10]</code>，low_end 的值加 1，low_end 的值是为了记录基准值的所在位置。</p>
<p>8.循环接着执行，遍历第四个元素 7，跟第 6、7 的步骤一致，数组先变成 <code>[0, 1, 5, 2, 6, 9, 4, 3, 7, 8, 10]</code>，再变成 <code>[0, 1, 2, 5, 6, 9, 4, 3, 7, 8, 10]</code></p>
<p>9.遍历第五个元素 6，跟第 6、7 的步骤一致，数组先变成 <code>[0, 1, 2, 5, 3, 9, 4, 6, 7, 8, 10]</code>，再变成 <code>[0, 1, 2, 3, 5, 9, 4, 6, 7, 8, 10]</code></p>
<p>10.遍历第六个元素 9，跟第 6、7 的步骤一致，数组先变成 <code>[0, 1, 2, 3, 5, 4, 9, 6, 7, 8, 10]</code>，再变成 <code>[0, 1, 2, 3, 4, 5, 9, 6, 7, 8, 10]</code></p>
<p>11.在下一次遍历中，因为 i == high_start，意味着正序和倒序的查找终于找到一起了，后面的元素肯定都是大于基准值的，此时退出循环</p>
<p>12.遍历后的结果为 <code>[0, 1, 2, 3, 4, 5, 9, 6, 7, 8, 10]</code>，在基准值 5 前面的元素都小于 5，后面的元素都大于 5，然后我们分别对两个子集进行 QuickSort</p>
<p>13.此时 low_end 值为 5，high_start 值为 6，to 的值依然是 10，from 的值依然是 0，<code>to - high_start &lt; low_end - from </code> 的结果为 <code>true</code>，我们对 QuickSort(a, 6, 10)，即对后面的元素进行排序，但是注意，在新的 QuickSort 中，因为 from - to 的值小于 10，所以这一次其实是采用了插入排序。所以准确的说，<strong>当数组长度大于 10 的时候，v8 采用了快速排序和插入排序的混合排序方法。</strong></p>
<p>14.然后 <code>to = low_end</code> 即设置 to 为 5，因为 while(true) 的原因，会再执行一遍，to - from 的值为 5，执行 InsertionSort(a, 0, 5)，即对基准值前面的元素执行一次插入排序。</p>
<p>15.因为在 to - from &lt;= 10 的判断中，有 return 语句，所以 while 循环结束。</p>
<p>16.v8 在对数组进行了一次快速排序后，然后对两个子集分别进行了插入排序，最终修改数组为正确排序后的数组。</p>
<h2 id="articleHeader18">比较</h2>
<p>最后来张示意图感受下插入排序和快速排序：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011623646?w=1036&amp;h=517" src="https://static.alili.tech/img/remote/1460000011623646?w=1036&amp;h=517" alt="插入排序和快速排序" title="插入排序和快速排序" style="cursor: pointer;"></span></p>
<p>图片来自于 <a href="https://www.toptal.com/developers/sorting-algorithms" rel="nofollow noreferrer" target="_blank">https://www.toptal.com/developers/sorting-algorithms</a></p>
<h2 id="articleHeader19">专题系列</h2>
<p>JavaScript专题系列目录地址：<a href="https://github.com/mqyqingfeng/Blog" rel="nofollow noreferrer" target="_blank">https://github.com/mqyqingfeng/Blog</a>。</p>
<p>JavaScript专题系列预计写二十篇左右，主要研究日常开发中一些功能点的实现，比如防抖、节流、去重、类型判断、拷贝、最值、扁平、柯里、递归、乱序、排序等，特点是研(chao)究(xi) underscore 和 jQuery 的实现方式。</p>
<p>如果有错误或者不严谨的地方，请务必给予指正，十分感谢。如果喜欢或者有所启发，欢迎 star，对作者也是一种鼓励。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript专题之解读 v8 排序源码

## 原文链接
[https://segmentfault.com/a/1190000011623637](https://segmentfault.com/a/1190000011623637)

