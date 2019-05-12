---
title: 'JavaScript 排序算法图解（JavaScript sorting algorithms）' 
date: 2019-01-03 2:30:11
hidden: true
slug: nbuit9mmfm
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">基础构造函数</h2>
<blockquote><p>以下几种排序算法做为方法放在构造函数里。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ArrayList () {
  var array = [];

  // 交换位置
  var swap = function (index1, index2) {
    var aux = array[index1];
    array[index1] = array[index2];
    array[index2] = aux;
  }

  this.insert = function (item) {
    array.push(item);
  };

  this.toString = function () {
    return array.join();
  };

  this.val = function () {
    return array;
  }

  // 冒泡排序
  this.bubbleSort = function () {
    //etc
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ArrayList</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> array = [];

  <span class="hljs-comment">// 交换位置</span>
  <span class="hljs-keyword">var</span> swap = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">index1, index2</span>) </span>{
    <span class="hljs-keyword">var</span> aux = array[index1];
    array[index1] = array[index2];
    array[index2] = aux;
  }

  <span class="hljs-keyword">this</span>.insert = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">item</span>) </span>{
    array.push(item);
  };

  <span class="hljs-keyword">this</span>.toString = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> array.join();
  };

  <span class="hljs-keyword">this</span>.val = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> array;
  }

  <span class="hljs-comment">// 冒泡排序</span>
  <span class="hljs-keyword">this</span>.bubbleSort = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//etc</span>
  }
}</code></pre>
<h3 id="articleHeader1">1. 冒泡排序</h3>
<blockquote>
<p>冒泡排序比较任何两个相邻的项，如果第一个比第二个大，则交换它们。</p>
<p>复杂度 O(n^2)。</p>
</blockquote>
<h4>代码</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.bubbleSort = function () {
  console.time('Bubble Sort');
  var length = array.length;
  for (var i = 0; i < length; i++) {
    for (var j = 0; j < length - 1 - i; j++) {
      if (array[j] > array[j+1]) {
        swap(j, j + 1);
      }
    }
  }
  console.timeEnd('Bubble Sort');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">this</span>.bubbleSort = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.time(<span class="hljs-string">'Bubble Sort'</span>);
  <span class="hljs-keyword">var</span> length = array.length;
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; length; i++) {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>; j &lt; length - <span class="hljs-number">1</span> - i; j++) {
      <span class="hljs-keyword">if</span> (array[j] &gt; array[j+<span class="hljs-number">1</span>]) {
        swap(j, j + <span class="hljs-number">1</span>);
      }
    }
  }
  <span class="hljs-built_in">console</span>.timeEnd(<span class="hljs-string">'Bubble Sort'</span>);
}</code></pre>
<h4>图解</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010768182" src="https://static.alili.tech/img/remote/1460000010768182" alt="冒泡排序" title="冒泡排序" style="cursor: pointer;"></span></p>
<h3 id="articleHeader2">2. 选择排序</h3>
<blockquote>
<p>选择排序算法是一种原址比较排序算法。选择排序大致的思路是找到数据结构中的最小值并将其放置在第一位，接着找到第二小的值并将其放在第二位，以此类推。</p>
<p>复杂度：O(n^2)。</p>
</blockquote>
<h4>代码</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.selectionSort = function () {
  console.time('selectionSort');
  var length = array.length,
      indexMin;

  for (var i = 0; i < length - 1; i++) {
    indexMin = i;
    for (var j = i; j < length; j++) {
      if (array[indexMin] > array[j]) {
        indexMin = j;
      }
    }

    if (i !== indexMin) {
      swap(i, indexMin);
    }
  }
  console.timeEnd('selectionSort');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">this</span>.selectionSort = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.time(<span class="hljs-string">'selectionSort'</span>);
  <span class="hljs-keyword">var</span> length = array.length,
      indexMin;

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; length - <span class="hljs-number">1</span>; i++) {
    indexMin = i;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = i; j &lt; length; j++) {
      <span class="hljs-keyword">if</span> (array[indexMin] &gt; array[j]) {
        indexMin = j;
      }
    }

    <span class="hljs-keyword">if</span> (i !== indexMin) {
      swap(i, indexMin);
    }
  }
  <span class="hljs-built_in">console</span>.timeEnd(<span class="hljs-string">'selectionSort'</span>);
}</code></pre>
<h4>图解</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010768183" src="https://static.alili.tech/img/remote/1460000010768183" alt="选择排序" title="选择排序" style="cursor: pointer;"></span></p>
<h3 id="articleHeader3">3. 插入排序</h3>
<blockquote>
<p>插入排序每次排一个数组项，以此方式构建最后的排序数组。假定第一项已经排序了，接着，它和第二项进行比较，第二项是应该待在原位还是插到第一项之前呢？这样，头两项就已正确排序，接着和第三项比较（它是该插入到第一、第二还是第三的位置呢？），以此类推。</p>
<p>排序小型数组时，此算法比选择排序和冒泡排序性能要好。</p>
</blockquote>
<h4>代码</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.insertionSort = function () {
  console.time('insertionSort');
  var length = array.length,
      j, temp;

  for (var i = 1; i < length; i++) {
    j = i;
    temp = array[i];
    while (j > 0 &amp;&amp; array[j-1] > temp) {
      array[j] = array[j-1];
      j--;
    }
    array[j] = temp;
  }
  console.timeEnd('insertionSort');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">this</span>.insertionSort = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.time(<span class="hljs-string">'insertionSort'</span>);
  <span class="hljs-keyword">var</span> length = array.length,
      j, temp;

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt; length; i++) {
    j = i;
    temp = array[i];
    <span class="hljs-keyword">while</span> (j &gt; <span class="hljs-number">0</span> &amp;&amp; array[j<span class="hljs-number">-1</span>] &gt; temp) {
      array[j] = array[j<span class="hljs-number">-1</span>];
      j--;
    }
    array[j] = temp;
  }
  <span class="hljs-built_in">console</span>.timeEnd(<span class="hljs-string">'insertionSort'</span>);
}</code></pre>
<h4>图解</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010768184" src="https://static.alili.tech/img/remote/1460000010768184" alt="插入排序" title="插入排序" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">4. 归并排序</h3>
<blockquote>
<p>归并排序是一种分治算法。其思想是将原始数组切分成较小的数组，直到每个小数组只有一个位置，接着将小数组归并成较大的数组，直到最后只有一个排序完毕的大数组。</p>
<p>复杂度：O(n log^n)。</p>
</blockquote>
<h4>代码</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.mergeSort = function () {
  console.time('mergeSort');
  array = mergeSortRec(array);
  console.timeEnd('mergeSort');
}
var mergeSortRec  = function (array) {
  var length = array.length;
  if (length === 1) {
    return array;
  }

  var mid = Math.floor(length / 2),
      left = array.slice(0, mid),
      right = array.slice(mid, length);

  return merge(mergeSortRec(left), mergeSortRec(right));
}
var merge = function (left, right) {
  var result = [],
      il = 0,
      ir = 0;

  while (il < left.length &amp;&amp; ir < right.length) {
    if (left[il] < right[ir]) {
      result.push(left[il++]);
    } else {
      result.push(right[ir++]);
    }
  }

  while (il < left.length) {
    result.push(left[il++]);
  }

  while (ir < right.length) {
    result.push(right[ir++]);
  }

  return result;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">this</span>.mergeSort = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.time(<span class="hljs-string">'mergeSort'</span>);
  array = mergeSortRec(array);
  <span class="hljs-built_in">console</span>.timeEnd(<span class="hljs-string">'mergeSort'</span>);
}
<span class="hljs-keyword">var</span> mergeSortRec  = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">array</span>) </span>{
  <span class="hljs-keyword">var</span> length = array.length;
  <span class="hljs-keyword">if</span> (length === <span class="hljs-number">1</span>) {
    <span class="hljs-keyword">return</span> array;
  }

  <span class="hljs-keyword">var</span> mid = <span class="hljs-built_in">Math</span>.floor(length / <span class="hljs-number">2</span>),
      left = array.slice(<span class="hljs-number">0</span>, mid),
      right = array.slice(mid, length);

  <span class="hljs-keyword">return</span> merge(mergeSortRec(left), mergeSortRec(right));
}
<span class="hljs-keyword">var</span> merge = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">left, right</span>) </span>{
  <span class="hljs-keyword">var</span> result = [],
      il = <span class="hljs-number">0</span>,
      ir = <span class="hljs-number">0</span>;

  <span class="hljs-keyword">while</span> (il &lt; left.length &amp;&amp; ir &lt; right.length) {
    <span class="hljs-keyword">if</span> (left[il] &lt; right[ir]) {
      result.push(left[il++]);
    } <span class="hljs-keyword">else</span> {
      result.push(right[ir++]);
    }
  }

  <span class="hljs-keyword">while</span> (il &lt; left.length) {
    result.push(left[il++]);
  }

  <span class="hljs-keyword">while</span> (ir &lt; right.length) {
    result.push(right[ir++]);
  }

  <span class="hljs-keyword">return</span> result;
}</code></pre>
<h4>图解</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010768185" src="https://static.alili.tech/img/remote/1460000010768185" alt="归并排序" title="归并排序" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5">5. 快速排序</h3>
<blockquote>
<p>归并排序一样，快速排序也使用分治的方法，将原始数组分为较小的数组（但它没有像归并排序那样将它们分割开）。</p>
<p>它的性能通常比其他的复杂度为O(n  log^n)的排序算法要好。</p>
<p>复杂度：O(n log^n)。</p>
</blockquote>
<h4>代码</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.quickSort = function () {
  console.time('quickSort');
  quick(array, 0, array.length - 1);
  console.timeEnd('quickSort');
}

var quick = function (array, left, right) {
  var index;
  if (array.length > 1) {
    index = partition(array, left, right);

    if (left < index - 1) {
      quick(array, left, index - 1);
    }

    if (index < right) {
      quick(array, index, right);
    }
  }
};

// 划分过程
var partition = function (array, left, right) {
  var pivot = array[Math.floor((right + left) / 2)],
      i = left,
      j = right;

  while (i < j) {
    while (array[i] < pivot) {
      i++;
    }

    while (array[j] > pivot) {
      j--;
    }

    if (i <= j) {
      swapQuickSort(array, i, j);
      i++;
      j--;
    }
  }
  return i;
}

var swapQuickSort = function (array, index1, index2) {
  var aux = array[index1];
  array[index1] = array[index2];
  array[index2] = aux;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">this</span>.quickSort = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.time(<span class="hljs-string">'quickSort'</span>);
  quick(array, <span class="hljs-number">0</span>, array.length - <span class="hljs-number">1</span>);
  <span class="hljs-built_in">console</span>.timeEnd(<span class="hljs-string">'quickSort'</span>);
}

<span class="hljs-keyword">var</span> quick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">array, left, right</span>) </span>{
  <span class="hljs-keyword">var</span> index;
  <span class="hljs-keyword">if</span> (array.length &gt; <span class="hljs-number">1</span>) {
    index = partition(array, left, right);

    <span class="hljs-keyword">if</span> (left &lt; index - <span class="hljs-number">1</span>) {
      quick(array, left, index - <span class="hljs-number">1</span>);
    }

    <span class="hljs-keyword">if</span> (index &lt; right) {
      quick(array, index, right);
    }
  }
};

<span class="hljs-comment">// 划分过程</span>
<span class="hljs-keyword">var</span> partition = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">array, left, right</span>) </span>{
  <span class="hljs-keyword">var</span> pivot = array[<span class="hljs-built_in">Math</span>.floor((right + left) / <span class="hljs-number">2</span>)],
      i = left,
      j = right;

  <span class="hljs-keyword">while</span> (i &lt; j) {
    <span class="hljs-keyword">while</span> (array[i] &lt; pivot) {
      i++;
    }

    <span class="hljs-keyword">while</span> (array[j] &gt; pivot) {
      j--;
    }

    <span class="hljs-keyword">if</span> (i &lt;= j) {
      swapQuickSort(array, i, j);
      i++;
      j--;
    }
  }
  <span class="hljs-keyword">return</span> i;
}

<span class="hljs-keyword">var</span> swapQuickSort = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">array, index1, index2</span>) </span>{
  <span class="hljs-keyword">var</span> aux = array[index1];
  array[index1] = array[index2];
  array[index2] = aux;
}</code></pre>
<h4>图解</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010768186" src="https://static.alili.tech/img/remote/1460000010768186" alt="快速排序1" title="快速排序1" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010768187" src="https://static.alili.tech/img/remote/1460000010768187" alt="快速排序2" title="快速排序2" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010768188" src="https://static.alili.tech/img/remote/1460000010768188" alt="快速排序3" title="快速排序3" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010768189" src="https://static.alili.tech/img/remote/1460000010768189" alt="快速排序4" title="快速排序4" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010768190" src="https://static.alili.tech/img/remote/1460000010768190" alt="快速排序5" title="快速排序5" style="cursor: pointer;"></span></p>
<h3 id="articleHeader6">6. ECMAScript 排序</h3>
<blockquote><p>ECMAScript没有定义用哪个排序算法，所以浏览器厂商可以自行去实现算法。例如，Mozilla  Firefox使用归并排序作为Array.prototype.sort的实现，而Chrome使用了一个快速排序（下面我们会学习的）的变体。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.esSort = function () {
  console.time('esSort');
  var tempArray = [];
  tempArray = array.sort(function (a, b) {
    return a - b;
  });
  console.timeEnd('esSort');
  return tempArray;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">this</span>.esSort = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.time(<span class="hljs-string">'esSort'</span>);
  <span class="hljs-keyword">var</span> tempArray = [];
  tempArray = array.sort(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">a, b</span>) </span>{
    <span class="hljs-keyword">return</span> a - b;
  });
  <span class="hljs-built_in">console</span>.timeEnd(<span class="hljs-string">'esSort'</span>);
  <span class="hljs-keyword">return</span> tempArray;
}</code></pre>
<h2 id="articleHeader7">性能测试</h2>
<h3 id="articleHeader8">环境</h3>
<ul>
<li><p>OS：WIN10 64位</p></li>
<li><p>浏览器：Google Chrome   60.0.3112.78</p></li>
</ul>
<h3 id="articleHeader9">代码</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
* 创建随机数组
* @param  {[type]} size [description]
* @return {[type]}      [description]
*/
function createNonSortedArray (size) {
  var array = new ArrayList();
  for (var i = size; i > 0; i--) {
    var tempNum = Math.random() * i >>> 0;
    array.insert(tempNum);
  }
  return array;
}

// 冒泡排序
(function () {
  var array = createNonSortedArray(500);
  array.bubbleSort(); // Bubble Sort: 2.625ms
  console.log(array.val());
}());


// 选择排序
(function () {
  var array = createNonSortedArray(500);
  array.selectionSort(); // selectionSort: 1.986083984375ms
  console.log(array.val());
}());

// 插入排序
(function () {
  var array = createNonSortedArray(500);
  array.insertionSort(); // insertionSort: 1.825927734375ms
  console.log(array.val());
}());

// 归并排序
(function () {
  var array = createNonSortedArray(500);
  array.mergeSort(); // mergeSort: 0.76416015625ms
  console.log(array.val());
}());


// 快速排序
(function () {
  var array = createNonSortedArray(500);
  array.quickSort(); // quickSort: 0.39111328125ms
  console.log(array.val());
}());


// ES排序
(function () {
  var array = createNonSortedArray(500);
  array.esSort(); // esSort: 0.34130859375ms
  console.log(array.val());
}());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
* 创建随机数组
* @param  {[type]} size [description]
* @return {[type]}      [description]
*/</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createNonSortedArray</span> (<span class="hljs-params">size</span>) </span>{
  <span class="hljs-keyword">var</span> array = <span class="hljs-keyword">new</span> ArrayList();
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = size; i &gt; <span class="hljs-number">0</span>; i--) {
    <span class="hljs-keyword">var</span> tempNum = <span class="hljs-built_in">Math</span>.random() * i &gt;&gt;&gt; <span class="hljs-number">0</span>;
    array.insert(tempNum);
  }
  <span class="hljs-keyword">return</span> array;
}

<span class="hljs-comment">// 冒泡排序</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> array = createNonSortedArray(<span class="hljs-number">500</span>);
  array.bubbleSort(); <span class="hljs-comment">// Bubble Sort: 2.625ms</span>
  <span class="hljs-built_in">console</span>.log(array.val());
}());


<span class="hljs-comment">// 选择排序</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> array = createNonSortedArray(<span class="hljs-number">500</span>);
  array.selectionSort(); <span class="hljs-comment">// selectionSort: 1.986083984375ms</span>
  <span class="hljs-built_in">console</span>.log(array.val());
}());

<span class="hljs-comment">// 插入排序</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> array = createNonSortedArray(<span class="hljs-number">500</span>);
  array.insertionSort(); <span class="hljs-comment">// insertionSort: 1.825927734375ms</span>
  <span class="hljs-built_in">console</span>.log(array.val());
}());

<span class="hljs-comment">// 归并排序</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> array = createNonSortedArray(<span class="hljs-number">500</span>);
  array.mergeSort(); <span class="hljs-comment">// mergeSort: 0.76416015625ms</span>
  <span class="hljs-built_in">console</span>.log(array.val());
}());


<span class="hljs-comment">// 快速排序</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> array = createNonSortedArray(<span class="hljs-number">500</span>);
  array.quickSort(); <span class="hljs-comment">// quickSort: 0.39111328125ms</span>
  <span class="hljs-built_in">console</span>.log(array.val());
}());


<span class="hljs-comment">// ES排序</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> array = createNonSortedArray(<span class="hljs-number">500</span>);
  array.esSort(); <span class="hljs-comment">// esSort: 0.34130859375ms</span>
  <span class="hljs-built_in">console</span>.log(array.val());
}());</code></pre>
<blockquote><p>由此可见，一般情况我们只需要使用<code>JavaScript</code>  提供的 <code>Array.prototype.sort()</code> 方法即可，浏览器（或宿主环境）会在底层采用最优算法帮我们实现排序。</p></blockquote>
<h2 id="articleHeader10">来源/参考</h2>
<ul>
<li><p><a href="https://www.amazon.cn/%E5%9B%BE%E4%B9%A6/dp/B016DWSF8M/ref=sr_1_1?ie=UTF8&amp;qid=1501473141&amp;sr=8-1&amp;keywords=%E5%AD%A6%E4%B9%A0+javascript+%E6%95%B0%E6%8D%AE%E7%BB%93%E6%9E%84" rel="nofollow noreferrer" target="_blank">《学习 javascript 数据结构》</a></p></li>
<li><p><a href="http://blog.benoitvallon.com/sorting-algorithms-in-javascript/sorting-algorithms-in-javascript-all-the-code/" rel="nofollow noreferrer" target="_blank">About the #sorting-algorithms series</a></p></li>
<li><p><a href="https://github.com/benoitvallon/computer-science-in-javascript/tree/master/sorting-algorithms-in-javascript" rel="nofollow noreferrer" target="_blank">https://github.com/benoitvallon/computer-science-in-javascript/tree/master/sorting-algorithms-in-javascript</a></p></li>
</ul>
<h3 id="articleHeader11">转载请注明出处： <a href="http://blog.givebest.cn/javascript/2017/08/02/javascript-sorting-algorithms.html" rel="nofollow noreferrer" target="_blank">http://blog.givebest.cn/javascript/2017/08/02/javascript-sorting-algorithms.html</a>
</h3>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 排序算法图解（JavaScript sorting algorithms）

## 原文链接
[https://segmentfault.com/a/1190000010768177](https://segmentfault.com/a/1190000010768177)

