---
title: '排序算法的Javascript实现' 
date: 2018-12-11 2:30:10
hidden: true
slug: sxmaj9ep4e
categories: [reprint]
---

{{< raw >}}

                    
<p>1.冒泡排序：</p>
<p>比较相邻的两个数，如果前一个数大于后一个数，就将这两个数换位置。每一次遍历都会将本次遍历最大的数冒泡到最后。为了将n个数排好序，需要n-1次遍历。<br>如果某次遍历中，没有调整任何两个相邻的数的位置关系，说明此时数组已排好序，可以结束程序。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.bubbleSort = function () {
  let i, j;
  for (i = 1; i < this.length; i++) {  //表示本次是第i次遍历
    let changed = false;
    for (j = 0; j < this.length - i; j++) {   //访问序列为arr[0:length-i]
      if(this[j] > this[j + 1]){  //发现前一个数大于后一个时，互换位置
        [this[j],this[j+1]] = [this[j+1],this[j]];
        changed = true;
      }
    }
    if(!changed) {      //如果本轮遍历没有发现位置调整，结束排序函数
      break;
    }
  }
};

let arr = [43, 21, 10, 5, 9, 15, 32, 57, 35];
arr.bubbleSort();
console.log(arr);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>Array.prototype.bubbleSort = function () {
  let i, j;
  <span class="hljs-keyword">for</span> (i = <span class="hljs-number">1</span>; i &lt; <span class="hljs-keyword">this</span>.length; i++) {  <span class="hljs-comment">//表示本次是第i次遍历</span>
    let changed = <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">for</span> (j = <span class="hljs-number">0</span>; j &lt; <span class="hljs-keyword">this</span>.length - i; j++) {   <span class="hljs-comment">//访问序列为arr[0:length-i]</span>
      <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>[j] &gt; <span class="hljs-keyword">this</span>[j + <span class="hljs-number">1</span>]){  <span class="hljs-comment">//发现前一个数大于后一个时，互换位置</span>
        [<span class="hljs-keyword">this</span>[j],<span class="hljs-keyword">this</span>[j+<span class="hljs-number">1</span>]] = [<span class="hljs-keyword">this</span>[j+<span class="hljs-number">1</span>],<span class="hljs-keyword">this</span>[j]];
        changed = <span class="hljs-literal">true</span>;
      }
    }
    <span class="hljs-keyword">if</span>(!changed) {      <span class="hljs-comment">//如果本轮遍历没有发现位置调整，结束排序函数</span>
      <span class="hljs-keyword">break</span>;
    }
  }
};

let arr = [<span class="hljs-number">43</span>, <span class="hljs-number">21</span>, <span class="hljs-number">10</span>, <span class="hljs-number">5</span>, <span class="hljs-number">9</span>, <span class="hljs-number">15</span>, <span class="hljs-number">32</span>, <span class="hljs-number">57</span>, <span class="hljs-number">35</span>];
arr.bubbleSort();
console.log(arr);</code></pre>
<p>2.选择排序</p>
<p>第i轮遍历arr[0:n-i]选出最大的数，与arr[n-i]互换。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.selectSort = function () {
  let i, j;
  for (i = 1; i < this.length; i++) {     //表示本次是第i次遍历
    let maxIndex = 0;
    for (j = 0; j <= this.length - i; j++) {  //访问子序列为arr[0:this.length-i]
      if (this[j] > this[maxIndex]) {   //当前值大于当前最大值时，记录索引
        maxIndex = j;
      }
    }
    //将子数组最大值索引的值，与子数组末尾的值互换
    [this[this.length - i], this[maxIndex]] = [this[maxIndex], this[this.length - i]]
  }
};

let arr = [43, 21, 10, 5, 9, 15, 32, 57, 35];
arr.selectSort();
console.log(arr);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>Array.prototype.selectSort = function () {
  let i, j;
  <span class="hljs-keyword">for</span> (i = <span class="hljs-number">1</span>; i &lt; <span class="hljs-keyword">this</span>.length; i++) {     <span class="hljs-comment">//表示本次是第i次遍历</span>
    let maxIndex = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">for</span> (j = <span class="hljs-number">0</span>; j &lt;= <span class="hljs-keyword">this</span>.length - i; j++) {  <span class="hljs-comment">//访问子序列为arr[0:this.length-i]</span>
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>[j] &gt; <span class="hljs-keyword">this</span>[maxIndex]) {   <span class="hljs-comment">//当前值大于当前最大值时，记录索引</span>
        maxIndex = j;
      }
    }
    <span class="hljs-comment">//将子数组最大值索引的值，与子数组末尾的值互换</span>
    [<span class="hljs-keyword">this</span>[<span class="hljs-keyword">this</span>.length - i], <span class="hljs-keyword">this</span>[maxIndex]] = [<span class="hljs-keyword">this</span>[maxIndex], <span class="hljs-keyword">this</span>[<span class="hljs-keyword">this</span>.length - i]]
  }
};

let arr = [<span class="hljs-number">43</span>, <span class="hljs-number">21</span>, <span class="hljs-number">10</span>, <span class="hljs-number">5</span>, <span class="hljs-number">9</span>, <span class="hljs-number">15</span>, <span class="hljs-number">32</span>, <span class="hljs-number">57</span>, <span class="hljs-number">35</span>];
arr.selectSort();
console.log(arr);</code></pre>
<p>3.插入排序<br>数组的前面部分已经排好序，要把当前数字插入到前面已排好序的数组的相应位置。可能有人会有疑问为什么默认数组前面部分已排好序？是怎么排好序的？是因为当排序开始时，从第2个数字开始进行向前插入，此时当前数字索引为1，当前数字前面仅有一个数字，因此可以认为前面部分已经排好序，将这个数字插入到相应位置之后数组仍然是有序的。每次都将当前数字插入到对应的位置，因此每次插入之后前面的数组仍是排好序的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.insertSort = function () {
  let i, j;
  for (i = 1; i < this.length; i++) {   //i表示当前要向前插入的数字的索引，从1(即第2个数)开始前插
    let val = this[i];   //记录当前要前插的数的大小
    /*
    * 用指针j来遍历第i个数字前面的，已经排好序的子数组。当j没有指到头，并且j的数字大于要插入的数字时，说明
    * j还要向前遍历，直到发现一个比要插入数字小的位置pos，然后将这个数字插到pos+1处。如果j已经指到头了，
    * 到了-1了还没有找到比当前数字小的位置，就把当前数字放在索引0处。
    * */
    for (j = i - 1; j >= 0 &amp;&amp; this[j] > val; j--) {  
      this[j + 1] = this[j];
    }
    this[j + 1] = val;
  }
};

let arr = [43, 21, 10, 5, 9, 15, 32, 57, 35];
arr.insertSort();
console.log(arr);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>Array.prototype.insertSort = function () {
  let i, j;
  <span class="hljs-keyword">for</span> (i = <span class="hljs-number">1</span>; i &lt; <span class="hljs-keyword">this</span>.length; i++) {   <span class="hljs-comment">//i表示当前要向前插入的数字的索引，从1(即第2个数)开始前插</span>
    let <span class="hljs-keyword">val</span> = <span class="hljs-keyword">this</span>[i];   <span class="hljs-comment">//记录当前要前插的数的大小</span>
    <span class="hljs-comment">/*
    * 用指针j来遍历第i个数字前面的，已经排好序的子数组。当j没有指到头，并且j的数字大于要插入的数字时，说明
    * j还要向前遍历，直到发现一个比要插入数字小的位置pos，然后将这个数字插到pos+1处。如果j已经指到头了，
    * 到了-1了还没有找到比当前数字小的位置，就把当前数字放在索引0处。
    * */</span>
    <span class="hljs-keyword">for</span> (j = i - <span class="hljs-number">1</span>; j &gt;= <span class="hljs-number">0</span> &amp;&amp; <span class="hljs-keyword">this</span>[j] &gt; <span class="hljs-keyword">val</span>; j--) {  
      <span class="hljs-keyword">this</span>[j + <span class="hljs-number">1</span>] = <span class="hljs-keyword">this</span>[j];
    }
    <span class="hljs-keyword">this</span>[j + <span class="hljs-number">1</span>] = <span class="hljs-keyword">val</span>;
  }
};

let arr = [<span class="hljs-number">43</span>, <span class="hljs-number">21</span>, <span class="hljs-number">10</span>, <span class="hljs-number">5</span>, <span class="hljs-number">9</span>, <span class="hljs-number">15</span>, <span class="hljs-number">32</span>, <span class="hljs-number">57</span>, <span class="hljs-number">35</span>];
arr.insertSort();
console.log(arr);</code></pre>
<p>4.shell排序<br>加了step的插入排序。分别以索引数为0,1,......step-1的元素为起点，将其看做不同的组，0、0+step,0+2<em>step，......，0+n</em>step为一组，1,1+step,1+2<em>step，.....,1+n</em>step为一组依次分组，按照组为单位进行插入排序。各组都已经插入排序一轮过后，将step除以2向下取整，再进行分组并将各组分别进行插入排序，直到step为0。<br>step的取值与性能直接相关，需要思考后取值。<br>并且这里的分组仅仅是逻辑上分组，并没有开辟新的地址空间将其进行物理上的分组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const {floor} = Math;

//这个和插入排序相同，只不过加了step
Array.prototype.shellInsertSort = function (startIndex, step) {
  let i, j;
  for (i = startIndex + step; i < this.length; i += step) {
    let val = this[i];
    for (j = i - step; j >= 0 &amp;&amp; this[j] > val; j -= step) {
      this[j + step] = this[j];
    }
    this[j + step] = val;
  }
};

Array.prototype.shellSort = function () {
  let i, step;
  for (step = floor(this.length / 2); step > 0; step = floor(step / 2)) {
    for (i = 0; i < step; i++) {
      this.shellInsertSort(i, step);
    }
  }
};

let arr = [43, 21, 10, 5, 9, 15, 32, 57, 35];
arr.shellSort(true);
console.log(arr);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>const {<span class="hljs-built_in">floor</span>} = Math;

//这个和插入排序相同，只不过加了<span class="hljs-keyword">step</span>
Array.prototype.shellInsertSort = function (startIndex, <span class="hljs-keyword">step</span>) {
  <span class="hljs-built_in">let</span> i, j;
  <span class="hljs-keyword">for</span> (i = startIndex + <span class="hljs-keyword">step</span>; i &lt; this.<span class="hljs-built_in">length</span>; i += <span class="hljs-keyword">step</span>) {
    <span class="hljs-built_in">let</span> val = this[i];
    <span class="hljs-keyword">for</span> (j = i - <span class="hljs-keyword">step</span>; j &gt;= <span class="hljs-number">0</span> &amp;&amp; this[j] &gt; val; j -= <span class="hljs-keyword">step</span>) {
      this[j + <span class="hljs-keyword">step</span>] = this[j];
    }
    this[j + <span class="hljs-keyword">step</span>] = val;
  }
};

Array.prototype.shellSort = function () {
  <span class="hljs-built_in">let</span> i, <span class="hljs-keyword">step</span>;
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">step</span> = <span class="hljs-built_in">floor</span>(this.<span class="hljs-built_in">length</span> / <span class="hljs-number">2</span>); <span class="hljs-keyword">step</span> &gt; <span class="hljs-number">0</span>; <span class="hljs-keyword">step</span> = <span class="hljs-built_in">floor</span>(<span class="hljs-keyword">step</span> / <span class="hljs-number">2</span>)) {
    <span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-keyword">step</span>; i++) {
      this.shellInsertSort(i, <span class="hljs-keyword">step</span>);
    }
  }
};

<span class="hljs-built_in">let</span> arr = [<span class="hljs-number">43</span>, <span class="hljs-number">21</span>, <span class="hljs-number">10</span>, <span class="hljs-number">5</span>, <span class="hljs-number">9</span>, <span class="hljs-number">15</span>, <span class="hljs-number">32</span>, <span class="hljs-number">57</span>, <span class="hljs-number">35</span>];
arr.shellSort(<span class="hljs-literal">true</span>);
console.<span class="hljs-built_in">log</span>(arr);</code></pre>
<p>5.合并排序</p>
<p>举个例子： 有 43 12 32 29 66 78 31这个数组要用合并排序。<br>先将相邻两数分为一组进行合并 43|12 32|29 66|78 31<br>结果为12 43 29 32 66 78 31</p>
<p>再将组的大小乘以二  (12 43|29 32)  (66 78|31)<br>本次合并后结果为 12 29 32 43 31 66 78</p>
<p>再将组的大小乘以二  12 43 29 32 | 66 78 31<br>合并结果：12 29 31 32 43 66 78</p>
<p>合并的过程中要开辟新的数组arr，建立两个指针i,j分别指向arr1与arr2，此时arr1与arr2都是排好序的，然后每次都将arr1[i]与arr2[j]较小的数加到arr中并将指针后移。最后哪个数组有剩余的数在追加到arr后面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const {min} = Math;

function merge(arr1, arr2,) {
  let arr = [];
  let i = 0, j = 0;
  while (i < arr1.length &amp;&amp; j < arr2.length) {
    arr1[i] < arr2[j] ? arr.push(arr1[i++]) : arr.push(arr2[j++]);
  }
  return i < arr1.length ? arr.concat(arr1.slice(i)) : arr.concat(arr2.slice(j))
}

Array.prototype.mergeSort = function () {
  let groupSize, i, secondPartSize, firstPart, secondPart, totalSize;
  //最初合并时，每组的大小仅为1，然后将组的大小乘以2。
  for (groupSize = 1; groupSize < this.length; groupSize *= 2) {
    for (i = 0; i < this.length; i += 2 * groupSize) {
      //前半段大小一定是groupSize，后半段则不一定
      secondPartSize = min(groupSize, this.length - i - groupSize);
      totalSize = secondPartSize + groupSize;
      //截取前后部分数组，将其排序
      firstPart = this.slice(i, i + groupSize);
      secondPart = this.slice(i + groupSize, i + groupSize + secondPartSize);
      this.splice(i, totalSize, ...merge(firstPart, secondPart));
    }
  }
};

let arr = [43, 21, 10, 5, 9, 15, 32, 57, 35];
arr.mergeSort();
console.log(arr);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> {min} = <span class="hljs-built_in">Math</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">merge</span>(<span class="hljs-params">arr1, arr2,</span>) </span>{
  <span class="hljs-keyword">let</span> arr = [];
  <span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, j = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">while</span> (i &lt; arr1.length &amp;&amp; j &lt; arr2.length) {
    arr1[i] &lt; arr2[j] ? arr.push(arr1[i++]) : arr.push(arr2[j++]);
  }
  <span class="hljs-keyword">return</span> i &lt; arr1.length ? arr.concat(arr1.slice(i)) : arr.concat(arr2.slice(j))
}

<span class="hljs-built_in">Array</span>.prototype.mergeSort = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> groupSize, i, secondPartSize, firstPart, secondPart, totalSize;
  <span class="hljs-comment">//最初合并时，每组的大小仅为1，然后将组的大小乘以2。</span>
  <span class="hljs-keyword">for</span> (groupSize = <span class="hljs-number">1</span>; groupSize &lt; <span class="hljs-keyword">this</span>.length; groupSize *= <span class="hljs-number">2</span>) {
    <span class="hljs-keyword">for</span> (i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-keyword">this</span>.length; i += <span class="hljs-number">2</span> * groupSize) {
      <span class="hljs-comment">//前半段大小一定是groupSize，后半段则不一定</span>
      secondPartSize = min(groupSize, <span class="hljs-keyword">this</span>.length - i - groupSize);
      totalSize = secondPartSize + groupSize;
      <span class="hljs-comment">//截取前后部分数组，将其排序</span>
      firstPart = <span class="hljs-keyword">this</span>.slice(i, i + groupSize);
      secondPart = <span class="hljs-keyword">this</span>.slice(i + groupSize, i + groupSize + secondPartSize);
      <span class="hljs-keyword">this</span>.splice(i, totalSize, ...merge(firstPart, secondPart));
    }
  }
};

<span class="hljs-keyword">let</span> arr = [<span class="hljs-number">43</span>, <span class="hljs-number">21</span>, <span class="hljs-number">10</span>, <span class="hljs-number">5</span>, <span class="hljs-number">9</span>, <span class="hljs-number">15</span>, <span class="hljs-number">32</span>, <span class="hljs-number">57</span>, <span class="hljs-number">35</span>];
arr.mergeSort();
<span class="hljs-built_in">console</span>.log(arr);</code></pre>
<p>6.自然合并排序</p>
<p>合并排序的分组是死板的没有利用到数组中原本就是顺序的子序列。</p>
<p>如果数组为 43 56 79 12 33 90 66<br>将其分组为 43 56 79 | 12 33 90 | 66<br>再将相邻的，原本就是从小到大的顺序的数组进行合并，效果会更好。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function merge(arr1, arr2) {
  let arr = [], i = 0, j = 0;
  while (i < arr1.length &amp;&amp; j < arr2.length) {
    arr.push(arr1[i] < arr2[j] ? arr1[i++] : arr2[j++])
  }
  return arr.concat(i < arr1.length ? arr1.slice(i) : arr2.slice(j));
}

function getSortedArrList(arr) {
  //记录下已经原本就是从小到大顺序的子数组
  let sortedArrList = [];
  let childArr = [arr[0]];
  for (let i = 1; i < arr.length; i++) {
    //当前值小于上一个值时，将childArr加入sortedArrList中，创建新的childArr，并加入当前值。
    if (arr[i] < arr[i - 1]) {
      sortedArrList.push(childArr);
      childArr = [arr[i]];
    }
    //否则，将当前值加入到childArr中
    else {
      childArr.push(arr[i]);
    }
  }
  sortedArrList.push(childArr);
  return sortedArrList;
}

Array.prototype.naturalMergeSort = function() {
  let sortedArrList = getSortedArrList(this);  //获取原本从小到大顺序的子数组

  while (sortedArrList.length > 1) {    //当还有两个及以上的数组没合并完成时
    let newSortedArrList = [];
    for (let i = 0; i < sortedArrList.length; i += 2) {
      if (i !== sortedArrList.length - 1) {
        newSortedArrList.push(merge(sortedArrList[i], sortedArrList[i + 1]));
      }
      else {
        newSortedArrList.push(sortedArrList[i]);
      }
    }
    sortedArrList = newSortedArrList;
  }
  this.splice(0,this.length,...sortedArrList[0]);
};

let arr = [43, 21, 10, 5, 9, 15, 32, 57, 35];
arr.naturalMergeSort();
console.log(arr);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">merge</span>(<span class="hljs-params">arr1, arr2</span>) </span>{
  <span class="hljs-keyword">let</span> arr = [], i = <span class="hljs-number">0</span>, j = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">while</span> (i &lt; arr1.length &amp;&amp; j &lt; arr2.length) {
    arr.push(arr1[i] &lt; arr2[j] ? arr1[i++] : arr2[j++])
  }
  <span class="hljs-keyword">return</span> arr.concat(i &lt; arr1.length ? arr1.slice(i) : arr2.slice(j));
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getSortedArrList</span>(<span class="hljs-params">arr</span>) </span>{
  <span class="hljs-comment">//记录下已经原本就是从小到大顺序的子数组</span>
  <span class="hljs-keyword">let</span> sortedArrList = [];
  <span class="hljs-keyword">let</span> childArr = [arr[<span class="hljs-number">0</span>]];
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">1</span>; i &lt; arr.length; i++) {
    <span class="hljs-comment">//当前值小于上一个值时，将childArr加入sortedArrList中，创建新的childArr，并加入当前值。</span>
    <span class="hljs-keyword">if</span> (arr[i] &lt; arr[i - <span class="hljs-number">1</span>]) {
      sortedArrList.push(childArr);
      childArr = [arr[i]];
    }
    <span class="hljs-comment">//否则，将当前值加入到childArr中</span>
    <span class="hljs-keyword">else</span> {
      childArr.push(arr[i]);
    }
  }
  sortedArrList.push(childArr);
  <span class="hljs-keyword">return</span> sortedArrList;
}

<span class="hljs-built_in">Array</span>.prototype.naturalMergeSort = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> sortedArrList = getSortedArrList(<span class="hljs-keyword">this</span>);  <span class="hljs-comment">//获取原本从小到大顺序的子数组</span>

  <span class="hljs-keyword">while</span> (sortedArrList.length &gt; <span class="hljs-number">1</span>) {    <span class="hljs-comment">//当还有两个及以上的数组没合并完成时</span>
    <span class="hljs-keyword">let</span> newSortedArrList = [];
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; sortedArrList.length; i += <span class="hljs-number">2</span>) {
      <span class="hljs-keyword">if</span> (i !== sortedArrList.length - <span class="hljs-number">1</span>) {
        newSortedArrList.push(merge(sortedArrList[i], sortedArrList[i + <span class="hljs-number">1</span>]));
      }
      <span class="hljs-keyword">else</span> {
        newSortedArrList.push(sortedArrList[i]);
      }
    }
    sortedArrList = newSortedArrList;
  }
  <span class="hljs-keyword">this</span>.splice(<span class="hljs-number">0</span>,<span class="hljs-keyword">this</span>.length,...sortedArrList[<span class="hljs-number">0</span>]);
};

<span class="hljs-keyword">let</span> arr = [<span class="hljs-number">43</span>, <span class="hljs-number">21</span>, <span class="hljs-number">10</span>, <span class="hljs-number">5</span>, <span class="hljs-number">9</span>, <span class="hljs-number">15</span>, <span class="hljs-number">32</span>, <span class="hljs-number">57</span>, <span class="hljs-number">35</span>];
arr.naturalMergeSort();
<span class="hljs-built_in">console</span>.log(arr);</code></pre>
<p>7.基数排序(LSD least significant digit first)<br>LSD中没有数值之间的比较。建立一个[10][]的二维数组arr。<br>挑选出要排序数组中最大的数字，计算该数字的位数记为digitNum。将数组中的所有数字填充到digitNum位，位数不够的高位补0。<br>然后遍历digitNum次，从低位开始。第i次遍历按照将数组中元素的第i位的数值，将元素num放到二维数组相应位置处，如果num第i位数值为n，则执行arr[n].push(num)的操作。每次遍历之后，将arr[0:9]各数组的元素依次取出，并且重新初始化二维数组。直到遍历到最高位为止，再取出的就是已经排好序的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const {max} = Math;

function initBarrel() {
  let barrel = [];
  for (let i = 0; i < 10; i++) {
    barrel[i] = [];
  }
  return barrel;
}

function radixSort(arr) {
  let barrel = initBarrel();
  let figureNum = max(...arr).toString().length;  //计算最大的数字的位数
  arr = arr.map(num => num.toString().padStart(figureNum, '0'));  //将数字填充到figureNum位
  for (let i = 0; i < figureNum; i++) {
    let index = figureNum - i - 1;  //本次根据第index位来选择放入哪个桶
    arr.forEach(numStr => {         //将填充过的数组放入桶中
      let num = Number(numStr[index]);
      barrel[num].push(numStr);
    });
    arr = barrel.reduce((prevArr, curArr) => prevArr.concat(curArr), []);//汇总barrel中的数
    barrel = initBarrel();    //初始化barrel
  }
  return arr.map(num => Number(num));   //最终转为数字形式
}

Array.prototype.radixSort = function () {
  let arr = radixSort(this);
  this.splice(0, this.length, ...arr);
};

let arr = [1234342, 52165, 75, 1, 356, 575, 765433212, 57994, 3535];
arr.radixSort();
console.log(arr);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> {max} = <span class="hljs-built_in">Math</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initBarrel</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> barrel = [];
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
    barrel[i] = [];
  }
  <span class="hljs-keyword">return</span> barrel;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">radixSort</span>(<span class="hljs-params">arr</span>) </span>{
  <span class="hljs-keyword">let</span> barrel = initBarrel();
  <span class="hljs-keyword">let</span> figureNum = max(...arr).toString().length;  <span class="hljs-comment">//计算最大的数字的位数</span>
  arr = arr.map(<span class="hljs-function"><span class="hljs-params">num</span> =&gt;</span> num.toString().padStart(figureNum, <span class="hljs-string">'0'</span>));  <span class="hljs-comment">//将数字填充到figureNum位</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; figureNum; i++) {
    <span class="hljs-keyword">let</span> index = figureNum - i - <span class="hljs-number">1</span>;  <span class="hljs-comment">//本次根据第index位来选择放入哪个桶</span>
    arr.forEach(<span class="hljs-function"><span class="hljs-params">numStr</span> =&gt;</span> {         <span class="hljs-comment">//将填充过的数组放入桶中</span>
      <span class="hljs-keyword">let</span> num = <span class="hljs-built_in">Number</span>(numStr[index]);
      barrel[num].push(numStr);
    });
    arr = barrel.reduce(<span class="hljs-function">(<span class="hljs-params">prevArr, curArr</span>) =&gt;</span> prevArr.concat(curArr), []);<span class="hljs-comment">//汇总barrel中的数</span>
    barrel = initBarrel();    <span class="hljs-comment">//初始化barrel</span>
  }
  <span class="hljs-keyword">return</span> arr.map(<span class="hljs-function"><span class="hljs-params">num</span> =&gt;</span> <span class="hljs-built_in">Number</span>(num));   <span class="hljs-comment">//最终转为数字形式</span>
}

<span class="hljs-built_in">Array</span>.prototype.radixSort = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> arr = radixSort(<span class="hljs-keyword">this</span>);
  <span class="hljs-keyword">this</span>.splice(<span class="hljs-number">0</span>, <span class="hljs-keyword">this</span>.length, ...arr);
};

<span class="hljs-keyword">let</span> arr = [<span class="hljs-number">1234342</span>, <span class="hljs-number">52165</span>, <span class="hljs-number">75</span>, <span class="hljs-number">1</span>, <span class="hljs-number">356</span>, <span class="hljs-number">575</span>, <span class="hljs-number">765433212</span>, <span class="hljs-number">57994</span>, <span class="hljs-number">3535</span>];
arr.radixSort();
<span class="hljs-built_in">console</span>.log(arr);</code></pre>
<p>8.基数排序(MSD most significant digit first)<br>从高位开始，依然没有数值之间的比较。<br>将最初的元素序列按照各元素最高位的数值进行分组，将分组后，组中只有一个元素或者多个相等元素的组拼接到result数组中，而有多个不同元素的组再递归地向下分，取的位次依次减少。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const {max} = Math;

function initBarrel() {
  let barrel = [];
  for (let i = 0; i < 10; i++) {
    barrel[i] = [];
  }
  return barrel;
}

//判断当前桶中是否只有唯一值 有的桶中可能只有一种值，但是有多个重复项
function unique(barrel) {
  return new Set(barrel).size <= 1;
}

Array.prototype.radixSort = function () {
  let result = [];
  let figureNum = max(...this).toString().length;
  this.splice(0, this.length, ...this.map(num => num.toString().padStart(figureNum, '0')));
  radixGroup(this, 0, figureNum, result);
  this.splice(0, this.length, ...result.map(numStr => Number(numStr)));
};

function radixGroup(group, index, figureNum, result) {    //输入的group是一组numStr，index是当前分桶依据第几位数
  if (index < figureNum) {
    let barrel = initBarrel();
    group.forEach(numStr => {
      let idx = Number(numStr[index]);
      barrel[idx].push(numStr);
    });

    barrel.forEach(subBarrel => {
      if(unique(subBarrel)) {
        subBarrel.forEach(num => {
          result.push(num);
        })
      }
      else {
        radixGroup(subBarrel,index+1,figureNum,result);
      }
    })
  }
}
let arr = [1234342, 52165, 75, 1, 356, 575, 765433212, 57994, 3535];
arr.radixSort();
console.log(arr);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> {max} = <span class="hljs-built_in">Math</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">initBarrel</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> barrel = [];
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++) {
    barrel[i] = [];
  }
  <span class="hljs-keyword">return</span> barrel;
}

<span class="hljs-comment">//判断当前桶中是否只有唯一值 有的桶中可能只有一种值，但是有多个重复项</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">barrel</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>(barrel).size &lt;= <span class="hljs-number">1</span>;
}

<span class="hljs-built_in">Array</span>.prototype.radixSort = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> result = [];
  <span class="hljs-keyword">let</span> figureNum = max(...this).toString().length;
  <span class="hljs-keyword">this</span>.splice(<span class="hljs-number">0</span>, <span class="hljs-keyword">this</span>.length, ...this.map(<span class="hljs-function"><span class="hljs-params">num</span> =&gt;</span> num.toString().padStart(figureNum, <span class="hljs-string">'0'</span>)));
  radixGroup(<span class="hljs-keyword">this</span>, <span class="hljs-number">0</span>, figureNum, result);
  <span class="hljs-keyword">this</span>.splice(<span class="hljs-number">0</span>, <span class="hljs-keyword">this</span>.length, ...result.map(<span class="hljs-function"><span class="hljs-params">numStr</span> =&gt;</span> <span class="hljs-built_in">Number</span>(numStr)));
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">radixGroup</span>(<span class="hljs-params">group, index, figureNum, result</span>) </span>{    <span class="hljs-comment">//输入的group是一组numStr，index是当前分桶依据第几位数</span>
  <span class="hljs-keyword">if</span> (index &lt; figureNum) {
    <span class="hljs-keyword">let</span> barrel = initBarrel();
    group.forEach(<span class="hljs-function"><span class="hljs-params">numStr</span> =&gt;</span> {
      <span class="hljs-keyword">let</span> idx = <span class="hljs-built_in">Number</span>(numStr[index]);
      barrel[idx].push(numStr);
    });

    barrel.forEach(<span class="hljs-function"><span class="hljs-params">subBarrel</span> =&gt;</span> {
      <span class="hljs-keyword">if</span>(unique(subBarrel)) {
        subBarrel.forEach(<span class="hljs-function"><span class="hljs-params">num</span> =&gt;</span> {
          result.push(num);
        })
      }
      <span class="hljs-keyword">else</span> {
        radixGroup(subBarrel,index+<span class="hljs-number">1</span>,figureNum,result);
      }
    })
  }
}
<span class="hljs-keyword">let</span> arr = [<span class="hljs-number">1234342</span>, <span class="hljs-number">52165</span>, <span class="hljs-number">75</span>, <span class="hljs-number">1</span>, <span class="hljs-number">356</span>, <span class="hljs-number">575</span>, <span class="hljs-number">765433212</span>, <span class="hljs-number">57994</span>, <span class="hljs-number">3535</span>];
arr.radixSort();
<span class="hljs-built_in">console</span>.log(arr);</code></pre>
<p>9.快速排序</p>
<p>将数组头部的元素pivotNum作为一个基准，通过两个指针指向数组的头部和尾部，经过一次partition以后将pivotNum放在一个位置pivot，pivot前面的数小于pivotNum，后面的数大于pivotNum。<br>为了防止最坏情况的发生，可以在数组中随机选出一个数来与数组头部元素换位置，来降低具体实例与最坏情况的关联性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const {floor, random} = Math;

function randomIndex(start, end) {
  return floor(random() * (end - start + 1)) + start;
}

function partition(arr, start, end) {
  let index = randomIndex(start, end);
  [arr[start], arr[index]] = [arr[index], arr[start]];

  let value = arr[start];

  while (start < end) {
    while (start < end &amp;&amp; arr[end] > value) end--;
    arr[start] = arr[end];
    while (start < end &amp;&amp; arr[start] < value) start++;
    arr[end] = arr[start];
  }

  arr[start] = value;
  return start;
}

function quickSort(arr, start, end) {
  if (start < end) {
    let pivot = partition(arr, start, end);
    quickSort(arr, start, pivot - 1);
    quickSort(arr, pivot + 1, end);
  }
}

Array.prototype.quickSort = function (asc = true) {
  quickSort(this, 0, this.length - 1, asc)
};

let arr = [43, 21, 10, 5, 9, 15, 32, 57, 35];
arr.quickSort();
console.log(arr);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>const {<span class="hljs-built_in">floor</span>, random} = Math;

<span class="hljs-function"><span class="hljs-keyword">function</span></span> randomIndex(start, <span class="hljs-keyword">end</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">floor</span>(random() * (<span class="hljs-keyword">end</span> - start + <span class="hljs-number">1</span>)) + start;
}

<span class="hljs-function"><span class="hljs-keyword">function</span></span> partition(arr, start, <span class="hljs-keyword">end</span>) {
  let <span class="hljs-built_in">index</span> = randomIndex(start, <span class="hljs-keyword">end</span>);
  [arr[start], arr[<span class="hljs-built_in">index</span>]] = [arr[<span class="hljs-built_in">index</span>], arr[start]];

  let <span class="hljs-keyword">value</span> = arr[start];

  <span class="hljs-keyword">while</span> (start &lt; <span class="hljs-keyword">end</span>) {
    <span class="hljs-keyword">while</span> (start &lt; <span class="hljs-keyword">end</span> &amp;&amp; arr[<span class="hljs-keyword">end</span>] &gt; <span class="hljs-keyword">value</span>) <span class="hljs-keyword">end</span>--;
    arr[start] = arr[<span class="hljs-keyword">end</span>];
    <span class="hljs-keyword">while</span> (start &lt; <span class="hljs-keyword">end</span> &amp;&amp; arr[start] &lt; <span class="hljs-keyword">value</span>) start++;
    arr[<span class="hljs-keyword">end</span>] = arr[start];
  }

  arr[start] = <span class="hljs-keyword">value</span>;
  <span class="hljs-keyword">return</span> start;
}

<span class="hljs-function"><span class="hljs-keyword">function</span></span> quickSort(arr, start, <span class="hljs-keyword">end</span>) {
  <span class="hljs-keyword">if</span> (start &lt; <span class="hljs-keyword">end</span>) {
    let pivot = partition(arr, start, <span class="hljs-keyword">end</span>);
    quickSort(arr, start, pivot - <span class="hljs-number">1</span>);
    quickSort(arr, pivot + <span class="hljs-number">1</span>, <span class="hljs-keyword">end</span>);
  }
}

Array.prototype.quickSort = <span class="hljs-function"><span class="hljs-keyword">function</span></span> (asc = true) {
  quickSort(this, <span class="hljs-number">0</span>, this.length - <span class="hljs-number">1</span>, asc)
};

let arr = [<span class="hljs-number">43</span>, <span class="hljs-number">21</span>, <span class="hljs-number">10</span>, <span class="hljs-number">5</span>, <span class="hljs-number">9</span>, <span class="hljs-number">15</span>, <span class="hljs-number">32</span>, <span class="hljs-number">57</span>, <span class="hljs-number">35</span>];
arr.quickSort();
console.<span class="hljs-built_in">log</span>(arr);</code></pre>
<p>10.堆排序<br>将数组看做完全二叉树，因此节点i的左右子节点的索引分别为2i+1与2i+2。通过从根节点开始令小的值下沉，或者从最后的叶节点开始令大的值上浮的方法，将一个数组构造成一个大根堆。再将大根堆的头元素与尾元素换位置，这样就将当前最大值置换到了尾部。然后下次构建大根堆的时候，将刚置换过的尾部元素刨除在外不做为节点。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const {floor, max} = Math;

function getBiggestNodeIndex(...nodes) {
  return nodes.indexOf(max(...nodes));
}

//将arr从0开始，长度为length的子数组构建为堆
function constructHeap(arr, length) {
  let adjusted = true;  //adjusted来标识本次堆是否作出了调整，若未调整说明堆已构建完毕
  while (adjusted) {
    adjusted = false;
    for (let i = 0; i < floor(length / 2); i++) {
      //当只有左节点时
      if (2 * i + 2 === length) {
        //当父节点比左节点小的时候
        if (arr[i] < arr[2 * i + 1]) {
          //互换
          [arr[i], arr[2 * i + 1]] = [arr[2 * i + 1], arr[i]];
          adjusted = true;
        }
      }
      //当同时有左节点和右节点时
      else {
        //判断三个中最大的节点
        let biggestNodeIndex = getBiggestNodeIndex(arr[i], arr[2 * i + 1], arr[2 * i + 2]);
        //若父节点不是最大的，则和最大的交换
        //如果biggestNodeIndex为0，说明自己最大，为1，说明左节点大，为2，说明右节点大
        switch (biggestNodeIndex) {
          case 0:
            break;
          case 1:
            [arr[i], arr[2 * i + 1]] = [arr[2 * i + 1], arr[i]];
            adjusted = true;
            break;
          case 2:
            [arr[i], arr[2 * i + 2]] = [arr[2 * i + 2], arr[i]];
            adjusted = true;
            break;
        }
      }
    }
  }
}

function heepSort(arr) {
  //只将arr从0开始，长度为length的子数组构建成大根堆
  let length = arr.length;
  while (length > 1) {
    constructHeap(arr, length);
    [arr[0], arr[length-- - 1]] = [arr[length - 1], arr[0]];
  }
}

Array.prototype.heepSort = function () {
  heepSort(this);
};

let arr = [43, 21, 10, 5, 9, 15, 32, 57, 35];
arr.heepSort();
console.log(arr);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">const</span> {floor, max} = Math;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getBiggestNodeIndex</span><span class="hljs-params">(<span class="hljs-rest_arg">...nodes</span>)</span> </span>{
  <span class="hljs-keyword">return</span> nodes.indexOf(max(...nodes));
}

<span class="hljs-comment">//将arr从0开始，长度为length的子数组构建为堆</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">constructHeap</span><span class="hljs-params">(arr, length)</span> </span>{
  let adjusted = <span class="hljs-literal">true</span>;  <span class="hljs-comment">//adjusted来标识本次堆是否作出了调整，若未调整说明堆已构建完毕</span>
  <span class="hljs-keyword">while</span> (adjusted) {
    adjusted = <span class="hljs-literal">false</span>;
    <span class="hljs-keyword">for</span> (let i = <span class="hljs-number">0</span>; i &lt; floor(length / <span class="hljs-number">2</span>); i++) {
      <span class="hljs-comment">//当只有左节点时</span>
      <span class="hljs-keyword">if</span> (<span class="hljs-number">2</span> * i + <span class="hljs-number">2</span> === length) {
        <span class="hljs-comment">//当父节点比左节点小的时候</span>
        <span class="hljs-keyword">if</span> (arr[i] &lt; arr[<span class="hljs-number">2</span> * i + <span class="hljs-number">1</span>]) {
          <span class="hljs-comment">//互换</span>
          [arr[i], arr[<span class="hljs-number">2</span> * i + <span class="hljs-number">1</span>]] = [arr[<span class="hljs-number">2</span> * i + <span class="hljs-number">1</span>], arr[i]];
          adjusted = <span class="hljs-literal">true</span>;
        }
      }
      <span class="hljs-comment">//当同时有左节点和右节点时</span>
      <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">//判断三个中最大的节点</span>
        let biggestNodeIndex = getBiggestNodeIndex(arr[i], arr[<span class="hljs-number">2</span> * i + <span class="hljs-number">1</span>], arr[<span class="hljs-number">2</span> * i + <span class="hljs-number">2</span>]);
        <span class="hljs-comment">//若父节点不是最大的，则和最大的交换</span>
        <span class="hljs-comment">//如果biggestNodeIndex为0，说明自己最大，为1，说明左节点大，为2，说明右节点大</span>
        <span class="hljs-keyword">switch</span> (biggestNodeIndex) {
          <span class="hljs-keyword">case</span> <span class="hljs-number">0</span>:
            <span class="hljs-keyword">break</span>;
          <span class="hljs-keyword">case</span> <span class="hljs-number">1</span>:
            [arr[i], arr[<span class="hljs-number">2</span> * i + <span class="hljs-number">1</span>]] = [arr[<span class="hljs-number">2</span> * i + <span class="hljs-number">1</span>], arr[i]];
            adjusted = <span class="hljs-literal">true</span>;
            <span class="hljs-keyword">break</span>;
          <span class="hljs-keyword">case</span> <span class="hljs-number">2</span>:
            [arr[i], arr[<span class="hljs-number">2</span> * i + <span class="hljs-number">2</span>]] = [arr[<span class="hljs-number">2</span> * i + <span class="hljs-number">2</span>], arr[i]];
            adjusted = <span class="hljs-literal">true</span>;
            <span class="hljs-keyword">break</span>;
        }
      }
    }
  }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">heepSort</span><span class="hljs-params">(arr)</span> </span>{
  <span class="hljs-comment">//只将arr从0开始，长度为length的子数组构建成大根堆</span>
  let length = arr.length;
  <span class="hljs-keyword">while</span> (length &gt; <span class="hljs-number">1</span>) {
    constructHeap(arr, length);
    [arr[<span class="hljs-number">0</span>], arr[length-- - <span class="hljs-number">1</span>]] = [arr[length - <span class="hljs-number">1</span>], arr[<span class="hljs-number">0</span>]];
  }
}

Array.prototype.heepSort = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
  heepSort(<span class="hljs-keyword">this</span>);
};

let arr = [<span class="hljs-number">43</span>, <span class="hljs-number">21</span>, <span class="hljs-number">10</span>, <span class="hljs-number">5</span>, <span class="hljs-number">9</span>, <span class="hljs-number">15</span>, <span class="hljs-number">32</span>, <span class="hljs-number">57</span>, <span class="hljs-number">35</span>];
arr.heepSort();
console.log(arr);</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
排序算法的Javascript实现

## 原文链接
[https://segmentfault.com/a/1190000013613746](https://segmentfault.com/a/1190000013613746)

