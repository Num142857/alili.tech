---
title: 'JavaScript各种排序算法的实现及其速度性能分析' 
date: 2019-01-02 2:30:09
hidden: true
slug: zd605n2xl8r
categories: [reprint]
---

{{< raw >}}

                    
<p>今天我们来讨论的问题有两个：</p>
<ol>
<li><p>如何用JavaScript实现选择排序、冒泡排序、插入排序、快速排序、归并排序、堆排序；</p></li>
<li><p>对生成的10万个随机数进行排序，各个排序算法的性能分析。</p></li>
</ol>
<h2 id="articleHeader0">创建数据类型</h2>
<p>这里我们全部用数组来存储数据，首先创建一个类ArrayList。<br>其中属性的说明如下：</p>
<ul>
<li><p>array空数组---&gt;用以存放数据</p></li>
<li><p>insert()方法---&gt;往array中插入数据</p></li>
<li><p>swapItemInArray(n,m)方法---&gt;将array中第n个元素和第m个元素交换位置</p></li>
<li><p>toString()方法---&gt;将array数组转换为字符串</p></li>
<li><p>originSort()方法---&gt;JavaScript原生排序算法实现，在之后的性能比较中，我们会用到它</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ArrayList(){
  var array = []
  this.insert = function(item){
    array.push(item)
  }
  this.swapItemInArray = function(n,m){
    let temp = array[n]
    array[n] = array[m]
    array[m] = temp
  }
  this.toString = function(){
    return array.join()
  }
  this.originSort = function(){
    array.sort(function(a,b){
      return a-b
    })
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs zephir"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ArrayList</span><span class="hljs-params">()</span></span>{
  <span class="hljs-keyword">var</span> <span class="hljs-keyword">array</span> = []
  this.insert = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(item)</span></span>{
    <span class="hljs-keyword">array</span>.push(item)
  }
  this.swapItemInArray = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(n,m)</span></span>{
    <span class="hljs-keyword">let</span> temp = <span class="hljs-keyword">array</span>[n]
    <span class="hljs-keyword">array</span>[n] = <span class="hljs-keyword">array</span>[m]
    <span class="hljs-keyword">array</span>[m] = temp
  }
  this.toString = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">array</span>.join()
  }
  this.originSort = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">array</span>.sort(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(a,b)</span></span>{
      <span class="hljs-keyword">return</span> a-b
    })
  }
}</code></pre>
<h2 id="articleHeader1">选择排序</h2>
<p>先来实现最简单的选择排序。<br>其思路是：对于有N个数字的数组，进行N轮排序，在每一轮中，将最大的数找出，放到末尾。下一轮的时候再找出次大的数放到倒数第二位。<br>我们来为ArrayList类添加如下方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  this.selectSort = function(){
    var self = this
    var len = array.length
    var maxIndex
    for (var i = 0; i < len; i++) {
      maxIndex = 0   //初始化最大数的位置
      for (var j = 0; j < len - i; j++) {
        if (array[maxIndex] < array[j]) {  //每一次都和之前的最大数比较
          maxIndex = j    //如果大于之前的最大数，则纪录当前数为最大数
        }
      }
      //第i轮结束后，将最大数放到数组倒数第i个
      self.swapItemInArray(maxIndex,len-i-1)  
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>  this.selectSort = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">self</span> = this
    <span class="hljs-keyword">var</span> len = <span class="hljs-keyword">array</span>.length
    <span class="hljs-keyword">var</span> maxIndex
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; len; i++) {
      maxIndex = <span class="hljs-number">0</span>   <span class="hljs-comment">//初始化最大数的位置</span>
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>; j &lt; len - i; j++) {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">array</span>[maxIndex] &lt; <span class="hljs-keyword">array</span>[j]) {  <span class="hljs-comment">//每一次都和之前的最大数比较</span>
          maxIndex = j    <span class="hljs-comment">//如果大于之前的最大数，则纪录当前数为最大数</span>
        }
      }
      <span class="hljs-comment">//第i轮结束后，将最大数放到数组倒数第i个</span>
      <span class="hljs-keyword">self</span>.swapItemInArray(maxIndex,len-i<span class="hljs-number">-1</span>)  
    }
  }</code></pre>
<h2 id="articleHeader2">冒泡排序</h2>
<p>选择排序是不是太简单了？接下来我们就来实现冒泡排序。<br>思路：对于有N个数字的数组，进行N轮排序，在每一轮中，从前往后以此比较两两相邻的数字，每次比较后，都把大的往后放，一轮下来，最大的数会被推到数组最后。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  this.bubbleSort = function(){
    var self = this
    var len = array.length
    for (var i = 0; i < len; i++) {     //数组长度要遍历的趟数
     //第i趟之后，后面i个元素都不用比较
      for (var j = 0; j < len - 1 - i; j++) {     
        if (array[j]>array[j+1]) {  //两两相邻进行比较
          self.swapItemInArray(j,j+1)  //将较大的数字放到后面
        }
      }
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>  this.bubbleSort = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">self</span> = this
    <span class="hljs-keyword">var</span> len = <span class="hljs-keyword">array</span>.length
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; len; i++) {     <span class="hljs-comment">//数组长度要遍历的趟数</span>
     <span class="hljs-comment">//第i趟之后，后面i个元素都不用比较</span>
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>; j &lt; len - <span class="hljs-number">1</span> - i; j++) {     
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">array</span>[j]&gt;<span class="hljs-keyword">array</span>[j+<span class="hljs-number">1</span>]) {  <span class="hljs-comment">//两两相邻进行比较</span>
          <span class="hljs-keyword">self</span>.swapItemInArray(j,j+<span class="hljs-number">1</span>)  <span class="hljs-comment">//将较大的数字放到后面</span>
        }
      }
    }
  }</code></pre>
<h2 id="articleHeader3">插入排序</h2>
<p>插入排序的实现思路如下：<br>对于有N个数字的数组，进行N轮排序</p>
<ul>
<li><p>第一轮 将第2个数字与第1个数字比较，如果第2个数字小，则与1交换</p></li>
<li><p>第二轮 将第3个数字与第2个数字比较<br>如果第3个数字小，则与第2个数字交换，再用第2个数字与第1个数字比较，将小的放前面。</p></li>
<li><p>第i轮 第1个到第i-1个数字已经全是从小到大排列了，第i个数字与前面的数字依次比较并交换位置，使得第1个数字，到第i个数字也是从小到达排列。</p></li>
</ul>
<p>代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  this.insertSort = function(){ 
    var self = this
    var len = array.length
    for (var i = 0; i < len; i++) {
      for (var j = i; j>0; j--) {
        if (array[j]<array[j-1]) {
          self.swapItemInArray(j,j-1)
        }
      }
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>  this.insertSort = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{ 
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">self</span> = this
    <span class="hljs-keyword">var</span> len = <span class="hljs-keyword">array</span>.length
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; len; i++) {
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = i; j&gt;<span class="hljs-number">0</span>; j--) {
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">array</span>[j]&lt;<span class="hljs-keyword">array</span>[j<span class="hljs-number">-1</span>]) {
          <span class="hljs-keyword">self</span>.swapItemInArray(j,j<span class="hljs-number">-1</span>)
        }
      }
    }
  }</code></pre>
<p>上面几种排序的实现是不是很小儿科呢？下面的就要稍微复杂点了。</p>
<h2 id="articleHeader4">快速排序</h2>
<p>快速排序算法基本上是面试必考排序算法，也是传闻最好用的算法。<br>不过实现起来可一点都不容易，至少对我来说是这样。<br><strong>算法思想</strong><br>本质上快速排排序是一种分治算法的实际应用。<br>按照下图所示，对于左边的原始数集合，（随便地）取一个数（称其为<strong>主元</strong>），比如取65为<strong>主元</strong>，则65则将原来的集合划分为了A集合和B集合，A中所有的数字都小于65，B中所有的数字都大于65。<br>然后。<br>之后再对A集合和B集合采取相同方式的划分。<br>最后就分为了<strong>从小到大排列</strong>的众多小集合。<br><span class="img-wrap"><img data-src="/img/bVTZ9L?w=1007&amp;h=354" src="https://static.alili.tech/img/bVTZ9L?w=1007&amp;h=354" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>实现思路</strong><br>对于有N个数字的数组，进行大约<strong>logN轮</strong>的排序。<br>若每次都能划分为两等份，则效率最高。如果选择的那个数将数组划分为了1、N-1长度的两个数组则效率会非常低。<br>因此，主元的选择非常关键。不能用JavaScript中所提供的Math.random()获得主元，由该函数生成随机数代价昂贵。<br>根据相关资料，一个比较好的方法为：取首项、中间项、末尾项中的中值作为划分基准。</p>
<p><strong>主元的具体实现函数</strong>如下<br>它传入三个参数，数组本身、首项索引、尾项索引。<br>在查找中值的时候，顺便将三个值分别排列成，首项最小、中位数中等、尾项最大。<br>为了方便后续的划分，将主元和倒数第二个数进行交换（由于尾项已经大于中值，因此不必对其进行操作，故主元放到倒数第二个）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function findPivot(arr,left,right){//主元取中位数
      var center = Math.floor((left+right)/2)
      if (arr[left] > arr[center]) {
        self.swapItemInArray(left,center)
      }
      if (arr[left] > arr[right]) {
        self.swapItemInArray(left,right)
      }
      if (arr[center] > arr[right]) {
        self.swapItemInArray(center,right)
      }
      self.swapItemInArray(center,right-1)//主元被藏在倒数第二个
      return arr[right-1]
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs swift"><code>    function findPivot(arr,<span class="hljs-keyword">left</span>,<span class="hljs-keyword">right</span>){<span class="hljs-comment">//主元取中位数</span>
      <span class="hljs-keyword">var</span> center = <span class="hljs-type">Math</span>.floor((<span class="hljs-keyword">left</span>+<span class="hljs-keyword">right</span>)/<span class="hljs-number">2</span>)
      <span class="hljs-keyword">if</span> (arr[<span class="hljs-keyword">left</span>] &gt; arr[center]) {
        <span class="hljs-keyword">self</span>.swapItemInArray(<span class="hljs-keyword">left</span>,center)
      }
      <span class="hljs-keyword">if</span> (arr[<span class="hljs-keyword">left</span>] &gt; arr[<span class="hljs-keyword">right</span>]) {
        <span class="hljs-keyword">self</span>.swapItemInArray(<span class="hljs-keyword">left</span>,<span class="hljs-keyword">right</span>)
      }
      <span class="hljs-keyword">if</span> (arr[center] &gt; arr[<span class="hljs-keyword">right</span>]) {
        <span class="hljs-keyword">self</span>.swapItemInArray(center,<span class="hljs-keyword">right</span>)
      }
      <span class="hljs-keyword">self</span>.swapItemInArray(center,<span class="hljs-keyword">right</span>-<span class="hljs-number">1</span>)<span class="hljs-comment">//主元被藏在倒数第二个</span>
      <span class="hljs-keyword">return</span> arr[<span class="hljs-keyword">right</span>-<span class="hljs-number">1</span>]
    }</code></pre>
<p><strong>每趟如何划分?</strong><br>以下图为例，“9”为主元，我们把它放在最后一个。<br>这里设置i和j两个指针（JavaScript中则是数组下标），i指向首项“2”，j指向倒数第2个数字“7”。<br>让i指针往右边移动，遇到&gt;=主元“9”的项时停下来<br>让j指针往左边移动，遇到&lt;=主元“9”的项时停下来<br>交换i和j所指的值，并且i右移一位，j左移一位<br>i指针和j指针继续移动比较交换<br>当i与j发生交错时，本趟划分结束，把主元与i所指的“6”进行交换（即把主元放回原位）。此时数组被划分为了两个[0,...,j]、[i+1,...,last]。[0,...,j]中的所有元素都小于主元，[i+1,...,last]中所有元素都大于主元。<br>对划分出来的两个子数组继续进行下一步划分。<br><span class="img-wrap"><img data-src="/img/bVT0hE?w=959&amp;h=239" src="https://static.alili.tech/img/bVT0hE?w=959&amp;h=239" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>具体函数实现如下，由于数组长度太小时采用快速排序效率较低，因而当数组长度太小时，我们改用插入排序。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function partition(arr,left,right){ //分割操作
      var pivot = findPivot(arr,left,right) //找到主元
      var length = right - left
      if (length>cutoff) { //当划分组没有小于阈值时，继续采用快速排序
        var i = left
        var j = right - 2 
        while(i<=j){ //i和j没有交错
          while(arr[i]<pivot){
            i++
          }
          while(arr[j]>pivot){
            j--
          }
          if (i<=j) {
            self.swapItemInArray(i,j)
            i++
            j--
          }
        }
        self.swapItemInArray(i,right-1)  //结束后将主元放回原位
        if (left<i-1) { //对主元左侧的子数组展开快排
          partition(arr,left,i-1)
        }
        if (i+1<right) {  //对主元右侧的子数组展开快排
          partition(arr,i+1,right)
        }
      }else{  //如果数组长度小于阈值，采用插入排序
        insertSort(left,right)
      }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs swift"><code>    function <span class="hljs-built_in">partition</span>(arr,<span class="hljs-keyword">left</span>,<span class="hljs-keyword">right</span>){ <span class="hljs-comment">//分割操作</span>
      <span class="hljs-keyword">var</span> pivot = findPivot(arr,<span class="hljs-keyword">left</span>,<span class="hljs-keyword">right</span>) <span class="hljs-comment">//找到主元</span>
      <span class="hljs-keyword">var</span> length = <span class="hljs-keyword">right</span> - <span class="hljs-keyword">left</span>
      <span class="hljs-keyword">if</span> (length&gt;cutoff) { <span class="hljs-comment">//当划分组没有小于阈值时，继续采用快速排序</span>
        <span class="hljs-keyword">var</span> i = <span class="hljs-keyword">left</span>
        <span class="hljs-keyword">var</span> j = <span class="hljs-keyword">right</span> - <span class="hljs-number">2</span> 
        <span class="hljs-keyword">while</span>(i&lt;=j){ <span class="hljs-comment">//i和j没有交错</span>
          <span class="hljs-keyword">while</span>(arr[i]&lt;pivot){
            i++
          }
          <span class="hljs-keyword">while</span>(arr[j]&gt;pivot){
            j--
          }
          <span class="hljs-keyword">if</span> (i&lt;=j) {
            <span class="hljs-keyword">self</span>.swapItemInArray(i,j)
            i++
            j--
          }
        }
        <span class="hljs-keyword">self</span>.swapItemInArray(i,<span class="hljs-keyword">right</span>-<span class="hljs-number">1</span>)  <span class="hljs-comment">//结束后将主元放回原位</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">left</span>&lt;i-<span class="hljs-number">1</span>) { <span class="hljs-comment">//对主元左侧的子数组展开快排</span>
          <span class="hljs-built_in">partition</span>(arr,<span class="hljs-keyword">left</span>,i-<span class="hljs-number">1</span>)
        }
        <span class="hljs-keyword">if</span> (i+<span class="hljs-number">1</span>&lt;<span class="hljs-keyword">right</span>) {  <span class="hljs-comment">//对主元右侧的子数组展开快排</span>
          <span class="hljs-built_in">partition</span>(arr,i+<span class="hljs-number">1</span>,<span class="hljs-keyword">right</span>)
        }
      }<span class="hljs-keyword">else</span>{  <span class="hljs-comment">//如果数组长度小于阈值，采用插入排序</span>
        insertSort(<span class="hljs-keyword">left</span>,<span class="hljs-keyword">right</span>)
      }
    }</code></pre>
<p>快速排序的完整代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  this.quickSort = function(){
    var self = this
    var cutoff = 3

    function partition(arr,left,right){ //分割操作
      var pivot = findPivot(arr,left,right)
      var length = right - left
      if (length>cutoff) {
        var i = left
        var j = right - 2
        while(i<=j){
          while(arr[i]<pivot){
            i++
          }
          while(arr[j]>pivot){
            j--
          }
          if (i<=j) {
            self.swapItemInArray(i,j)
            i++
            j--
          }
        }
        self.swapItemInArray(i,right-1)
        if (left<i-1) {
          partition(arr,left,i-1)
        }
        if (i+1<right) {
          partition(arr,i+1,right)
        }
      }else{
        insertSort(left,right)
      }
    }
    function findPivot(arr,left,right){//主元取中位数
      var center = Math.floor((left+right)/2)
      if (arr[left] > arr[center]) {
        self.swapItemInArray(left,center)
      }
      if (arr[left] > arr[right]) {
        self.swapItemInArray(left,right)
      }
      if (arr[center] > arr[right]) {
        self.swapItemInArray(center,right)
      }
      self.swapItemInArray(center,right-1)//主元被藏在倒数第二个
      return arr[right-1]
    }
    function insertSort(left,right){ //当分块足够小的时候，用插入排序
      var len = right - left
      for (var i = 0; i <= len; i++) {
        for (var j = i; j > 0; j--) {
          if (array[j]<array[j-1]) {
            self.swapItemInArray(j,j-1)
          }
        }
      }
    }
    partition(array,0,array.length-1)
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs swift"><code>  this.<span class="hljs-built_in">quickSort</span> = function(){
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">self</span> = this
    <span class="hljs-keyword">var</span> cutoff = <span class="hljs-number">3</span>

    function <span class="hljs-built_in">partition</span>(arr,<span class="hljs-keyword">left</span>,<span class="hljs-keyword">right</span>){ <span class="hljs-comment">//分割操作</span>
      <span class="hljs-keyword">var</span> pivot = findPivot(arr,<span class="hljs-keyword">left</span>,<span class="hljs-keyword">right</span>)
      <span class="hljs-keyword">var</span> length = <span class="hljs-keyword">right</span> - <span class="hljs-keyword">left</span>
      <span class="hljs-keyword">if</span> (length&gt;cutoff) {
        <span class="hljs-keyword">var</span> i = <span class="hljs-keyword">left</span>
        <span class="hljs-keyword">var</span> j = <span class="hljs-keyword">right</span> - <span class="hljs-number">2</span>
        <span class="hljs-keyword">while</span>(i&lt;=j){
          <span class="hljs-keyword">while</span>(arr[i]&lt;pivot){
            i++
          }
          <span class="hljs-keyword">while</span>(arr[j]&gt;pivot){
            j--
          }
          <span class="hljs-keyword">if</span> (i&lt;=j) {
            <span class="hljs-keyword">self</span>.swapItemInArray(i,j)
            i++
            j--
          }
        }
        <span class="hljs-keyword">self</span>.swapItemInArray(i,<span class="hljs-keyword">right</span>-<span class="hljs-number">1</span>)
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">left</span>&lt;i-<span class="hljs-number">1</span>) {
          <span class="hljs-built_in">partition</span>(arr,<span class="hljs-keyword">left</span>,i-<span class="hljs-number">1</span>)
        }
        <span class="hljs-keyword">if</span> (i+<span class="hljs-number">1</span>&lt;<span class="hljs-keyword">right</span>) {
          <span class="hljs-built_in">partition</span>(arr,i+<span class="hljs-number">1</span>,<span class="hljs-keyword">right</span>)
        }
      }<span class="hljs-keyword">else</span>{
        insertSort(<span class="hljs-keyword">left</span>,<span class="hljs-keyword">right</span>)
      }
    }
    function findPivot(arr,<span class="hljs-keyword">left</span>,<span class="hljs-keyword">right</span>){<span class="hljs-comment">//主元取中位数</span>
      <span class="hljs-keyword">var</span> center = <span class="hljs-type">Math</span>.floor((<span class="hljs-keyword">left</span>+<span class="hljs-keyword">right</span>)/<span class="hljs-number">2</span>)
      <span class="hljs-keyword">if</span> (arr[<span class="hljs-keyword">left</span>] &gt; arr[center]) {
        <span class="hljs-keyword">self</span>.swapItemInArray(<span class="hljs-keyword">left</span>,center)
      }
      <span class="hljs-keyword">if</span> (arr[<span class="hljs-keyword">left</span>] &gt; arr[<span class="hljs-keyword">right</span>]) {
        <span class="hljs-keyword">self</span>.swapItemInArray(<span class="hljs-keyword">left</span>,<span class="hljs-keyword">right</span>)
      }
      <span class="hljs-keyword">if</span> (arr[center] &gt; arr[<span class="hljs-keyword">right</span>]) {
        <span class="hljs-keyword">self</span>.swapItemInArray(center,<span class="hljs-keyword">right</span>)
      }
      <span class="hljs-keyword">self</span>.swapItemInArray(center,<span class="hljs-keyword">right</span>-<span class="hljs-number">1</span>)<span class="hljs-comment">//主元被藏在倒数第二个</span>
      <span class="hljs-keyword">return</span> arr[<span class="hljs-keyword">right</span>-<span class="hljs-number">1</span>]
    }
    function insertSort(<span class="hljs-keyword">left</span>,<span class="hljs-keyword">right</span>){ <span class="hljs-comment">//当分块足够小的时候，用插入排序</span>
      <span class="hljs-keyword">var</span> len = <span class="hljs-keyword">right</span> - <span class="hljs-keyword">left</span>
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt;= len; i++) {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = i; j &gt; <span class="hljs-number">0</span>; j--) {
          <span class="hljs-keyword">if</span> (array[j]&lt;array[j-<span class="hljs-number">1</span>]) {
            <span class="hljs-keyword">self</span>.swapItemInArray(j,j-<span class="hljs-number">1</span>)
          }
        }
      }
    }
    <span class="hljs-built_in">partition</span>(array,<span class="hljs-number">0</span>,array.length-<span class="hljs-number">1</span>)
  }</code></pre>
<h2 id="articleHeader5">归并排序</h2>
<p>与快速排序的“在划分中排序”不同，归并排序的基本思想是先将<strong>长度为N的数组</strong>划分为<strong>N个长度为1的数组</strong>，然后两两合并，<strong>在合并的时候排序</strong>。<br><span class="img-wrap"><img data-src="/img/bVT0vQ?w=757&amp;h=382" src="https://static.alili.tech/img/bVT0vQ?w=757&amp;h=382" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><strong>如何在两个子数组归并的时候排序</strong><br>如下图，对于A数组和B数组，设置指针Aptr和指针Bptr，它们的初始位置都在俩数组的首部。<br>将Aptr和Bptr所指的数对比，将小的数放到C数组中。<br>比如Aptr所指“1”，Bptr所指“2”，Aptr所指的“1”小，则将“1”放入到C中，Aptr后移，Bptr不动。<br>再对比Aptr所指的“13”和Bptr所指的“2”，“2”较小，将其推入到C中，Bptr右移，Aptr不动。<br>反复重复上述操作，如果最后一个数组A空，另一个数组B还有剩余元素，则依次将数组B的剩余元素全部放到C中。<br>至此完成依次归并操作。<br><span class="img-wrap"><img data-src="/img/bVT0wp?w=686&amp;h=381" src="https://static.alili.tech/img/bVT0wp?w=686&amp;h=381" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>代码实现为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="     function merge(arr1,arr2){
      var i = 0
      var j = 0
      var tempArr = []
      while(i<arr1.length &amp;&amp; j<arr2.length){
        if(arr1[i]<=arr2[j]){
          tempArr.push(arr1[i])
          i++
        }else{
          tempArr.push(arr2[j])
          j++
        }
      }
      while(i<arr1.length){ //如果arr1还有剩余元素，则全部放到tempArr中
        tempArr.push(arr1[i])
        i++
      }
      while(j<arr2.length){ //如果arr2还有剩余元素，则全部放到tempArr中
        tempArr.push(arr2[j])
        j++
      }
      return tempArr
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs matlab"><code>     <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">merge</span><span class="hljs-params">(arr1,arr2)</span>{</span>
      var <span class="hljs-built_in">i</span> = <span class="hljs-number">0</span>
      var <span class="hljs-built_in">j</span> = <span class="hljs-number">0</span>
      var tempArr = []
      <span class="hljs-keyword">while</span>(<span class="hljs-built_in">i</span>&lt;arr1.<span class="hljs-built_in">length</span> &amp;&amp; <span class="hljs-built_in">j</span>&lt;arr2.<span class="hljs-built_in">length</span>){
        if(arr1[i]&lt;=arr2[j]){
          tempArr.push(arr1[i])
          i++
        }<span class="hljs-keyword">else</span>{
          tempArr.push(arr2[j])
          j++
        }
      }
      <span class="hljs-keyword">while</span>(<span class="hljs-built_in">i</span>&lt;arr1.<span class="hljs-built_in">length</span>){ //如果arr1还有剩余元素，则全部放到tempArr中
        tempArr.push(arr1[i])
        i++
      }
      <span class="hljs-keyword">while</span>(<span class="hljs-built_in">j</span>&lt;arr2.<span class="hljs-built_in">length</span>){ //如果arr2还有剩余元素，则全部放到tempArr中
        tempArr.push(arr2[j])
        j++
      }
      <span class="hljs-keyword">return</span> tempArr
    }</code></pre>
<p>归并排序的完整代码如下，我们这里采用递归来实现划分</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  this.mergeSort = function(){
     function merge(arr1,arr2){
      var i = 0
      var j = 0
      var tempArr = []
      while(i<arr1.length &amp;&amp; j<arr2.length){
        if(arr1[i]<=arr2[j]){
          tempArr.push(arr1[i])
          i++
        }else{
          tempArr.push(arr2[j])
          j++
        }
      }
      while(i<arr1.length){
        tempArr.push(arr1[i])
        i++
      }
      while(j<arr2.length){
        tempArr.push(arr2[j])
        j++
      }
      return tempArr
    }
    function sliceArr(array){
      var len = array.length
      if (len === 1) {
        return array
      }
      var middle = Math.floor(len/2)
      var left = array.slice(0,middle)
      var right = array.slice(middle,len)
      return merge(sliceArr(left),sliceArr(right))
    }
    array = sliceArr(array)
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>  this.mergeSort = function(){
     function merge(arr1,arr2){
      <span class="hljs-built_in">var</span> i = <span class="hljs-number">0</span>
      <span class="hljs-built_in">var</span> j = <span class="hljs-number">0</span>
      <span class="hljs-built_in">var</span> tempArr = []
      <span class="hljs-keyword">while</span>(i&lt;arr1.<span class="hljs-built_in">length</span> &amp;&amp; j&lt;arr2.<span class="hljs-built_in">length</span>){
        <span class="hljs-keyword">if</span>(arr1[i]&lt;=arr2[j]){
          tempArr.<span class="hljs-built_in">push</span>(arr1[i])
          i++
        }<span class="hljs-keyword">else</span>{
          tempArr.<span class="hljs-built_in">push</span>(arr2[j])
          j++
        }
      }
      <span class="hljs-keyword">while</span>(i&lt;arr1.<span class="hljs-built_in">length</span>){
        tempArr.<span class="hljs-built_in">push</span>(arr1[i])
        i++
      }
      <span class="hljs-keyword">while</span>(j&lt;arr2.<span class="hljs-built_in">length</span>){
        tempArr.<span class="hljs-built_in">push</span>(arr2[j])
        j++
      }
      <span class="hljs-built_in">return</span> tempArr
    }
    function sliceArr(<span class="hljs-built_in">array</span>){
      <span class="hljs-built_in">var</span> len = <span class="hljs-built_in">array</span>.<span class="hljs-built_in">length</span>
      <span class="hljs-keyword">if</span> (len === <span class="hljs-number">1</span>) {
        <span class="hljs-built_in">return</span> <span class="hljs-built_in">array</span>
      }
      <span class="hljs-built_in">var</span> middle = Math.<span class="hljs-built_in">floor</span>(len/<span class="hljs-number">2</span>)
      <span class="hljs-built_in">var</span> left = <span class="hljs-built_in">array</span>.slice(<span class="hljs-number">0</span>,middle)
      <span class="hljs-built_in">var</span> right = <span class="hljs-built_in">array</span>.slice(middle,len)
      <span class="hljs-built_in">return</span> merge(sliceArr(left),sliceArr(right))
    }
    <span class="hljs-built_in">array</span> = sliceArr(<span class="hljs-built_in">array</span>)
  }</code></pre>
<h2 id="articleHeader6">堆排序</h2>
<p><strong>最大堆是什么</strong><br>最大堆是一个完全二叉树。<br>但它还满足，任意一个节点，它的值大于左子树中的任意元素的值，也大于右子树中的任意元素值。<br>该节点的左子树元素的值和右子树元素的值的大小没有要求。<br><span class="img-wrap"><img data-src="/img/bVT0N7?w=303&amp;h=172" src="https://static.alili.tech/img/bVT0N7?w=303&amp;h=172" alt="最大堆" title="最大堆" style="cursor: pointer;"></span></p>
<p><strong>堆的数组表示</strong><br>当我们用数组(从0开始)来表示一个堆的时候，第i个元素的左子元素为第(2*i+1)个元素，右子元素为第(2i*2)个元素。</p>
<p><strong>堆排序的大致思想</strong><br>将数组按最大堆的方式排列，比如排列为[a,b,c,d]<br>将一个最大堆的根（a）和最后一个元素（d）交换，<br>把数组中除了最后一个数（a）以外的元素[d,b,c]重新调整为最大堆。<br>对[d,b,c]重复上述操作<br><span class="img-wrap"><img data-src="/img/bVT0Fc?w=340&amp;h=295" src="https://static.alili.tech/img/bVT0Fc?w=340&amp;h=295" alt="堆排序" title="堆排序" style="cursor: pointer;"></span></p>
<p><strong>如何创建最大堆</strong><br>把所有元素插入到数组array（设长度为N）中后，从索引为<strong>(Math.floor(N/2) - 1)</strong>的元素开始，依次向前地将它和它的子树调整为最大堆。<br>如下图，先将子树①调整为最大堆 ----&gt; 调整子树②为最大堆 ----&gt; 调整整个树③为最大堆<br><span class="img-wrap"><img data-src="/img/bVT0Id?w=398&amp;h=341" src="https://static.alili.tech/img/bVT0Id?w=398&amp;h=341" alt="创建最大堆" title="创建最大堆" style="cursor: pointer;"></span></p>
<p>最大堆创建的代码如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function createMaxHeap(){  //创建最大堆
      var len = array.length
      var startIndex = Math.floor(len/2) - 1 //从这个节点开始，将其子树调整为最大堆
      for (var i = startIndex; i >= 0; i--) {
        compareChildAndAdjust(i)
      }
    }
    function compareChildAndAdjust(i,lastIndex){
      var bigChildIndex = findBigInChildren(i,lastIndex)
      if (bigChildIndex==false) {  //当找到的子节点返回为false时，表示没有子节点应当结束
        return
      }
      var parent = array[i]
      var bigChild = array[bigChildIndex]
      if (parent >= bigChild) {
        return
      }else{
        self.swapItemInArray(i,bigChildIndex)
        compareChildAndAdjust(bigChildIndex,lastIndex)//调整后要对子树调整
      }
    }
    function findBigInChildren(i,lastIndex){
      var leftChild = array[2*i+1] //i节点的左子节点
      var rightChild = array[2*i+2] //i节点的右子节点
      if (lastIndex) {
        if (2*i+1 >= lastIndex) {
          return false
        }
        if (!(2*i+1 >= lastIndex) &amp;&amp; (2*i+2 >= lastIndex)) {
          return 2*i+1
        }
      }
      if (!leftChild) {
        return false
      }
      if ( leftChild &amp;&amp; !rightChild) {
        return 2*i+1
      }
      if (leftChild>rightChild) {
        return 2*i+1
      }else{
        return 2*i+2
      }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createMaxHeap</span><span class="hljs-params">()</span></span>{  <span class="hljs-comment">//创建最大堆</span>
      <span class="hljs-keyword">var</span> len = <span class="hljs-keyword">array</span>.length
      <span class="hljs-keyword">var</span> startIndex = Math.floor(len/<span class="hljs-number">2</span>) - <span class="hljs-number">1</span> <span class="hljs-comment">//从这个节点开始，将其子树调整为最大堆</span>
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = startIndex; i &gt;= <span class="hljs-number">0</span>; i--) {
        compareChildAndAdjust(i)
      }
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">compareChildAndAdjust</span><span class="hljs-params">(i,lastIndex)</span></span>{
      <span class="hljs-keyword">var</span> bigChildIndex = findBigInChildren(i,lastIndex)
      <span class="hljs-keyword">if</span> (bigChildIndex==<span class="hljs-keyword">false</span>) {  <span class="hljs-comment">//当找到的子节点返回为false时，表示没有子节点应当结束</span>
        <span class="hljs-keyword">return</span>
      }
      <span class="hljs-keyword">var</span> <span class="hljs-keyword">parent</span> = <span class="hljs-keyword">array</span>[i]
      <span class="hljs-keyword">var</span> bigChild = <span class="hljs-keyword">array</span>[bigChildIndex]
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">parent</span> &gt;= bigChild) {
        <span class="hljs-keyword">return</span>
      }<span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">self</span>.swapItemInArray(i,bigChildIndex)
        compareChildAndAdjust(bigChildIndex,lastIndex)<span class="hljs-comment">//调整后要对子树调整</span>
      }
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">findBigInChildren</span><span class="hljs-params">(i,lastIndex)</span></span>{
      <span class="hljs-keyword">var</span> leftChild = <span class="hljs-keyword">array</span>[<span class="hljs-number">2</span>*i+<span class="hljs-number">1</span>] <span class="hljs-comment">//i节点的左子节点</span>
      <span class="hljs-keyword">var</span> rightChild = <span class="hljs-keyword">array</span>[<span class="hljs-number">2</span>*i+<span class="hljs-number">2</span>] <span class="hljs-comment">//i节点的右子节点</span>
      <span class="hljs-keyword">if</span> (lastIndex) {
        <span class="hljs-keyword">if</span> (<span class="hljs-number">2</span>*i+<span class="hljs-number">1</span> &gt;= lastIndex) {
          <span class="hljs-keyword">return</span> <span class="hljs-keyword">false</span>
        }
        <span class="hljs-keyword">if</span> (!(<span class="hljs-number">2</span>*i+<span class="hljs-number">1</span> &gt;= lastIndex) &amp;&amp; (<span class="hljs-number">2</span>*i+<span class="hljs-number">2</span> &gt;= lastIndex)) {
          <span class="hljs-keyword">return</span> <span class="hljs-number">2</span>*i+<span class="hljs-number">1</span>
        }
      }
      <span class="hljs-keyword">if</span> (!leftChild) {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">false</span>
      }
      <span class="hljs-keyword">if</span> ( leftChild &amp;&amp; !rightChild) {
        <span class="hljs-keyword">return</span> <span class="hljs-number">2</span>*i+<span class="hljs-number">1</span>
      }
      <span class="hljs-keyword">if</span> (leftChild&gt;rightChild) {
        <span class="hljs-keyword">return</span> <span class="hljs-number">2</span>*i+<span class="hljs-number">1</span>
      }<span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-number">2</span>*i+<span class="hljs-number">2</span>
      }
    }</code></pre>
<p><strong>堆排序的完整代码如下</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  this.heapSort = function(){
    var self = this
    createMaxHeap()
    swapMaxWithLast()
    function swapMaxWithLast(){
      var lastIndex = array.length - 1
      for (var i = lastIndex; i > 0; i--) {
        self.swapItemInArray(0,i)  //将根节点与最后一个节点交换
        //从根节点开始，与其子节点比较并重新形成最大堆
        //传入的第二个参数表示，向下比较的时候，比到第i个节点之前停下来
        compareChildAndAdjust(0,i)  
      }
    }
    function createMaxHeap(){  //创建最大堆
      var len = array.length
      var startIndex = Math.floor(len/2) - 1 //从这个节点开始，将其子树调整为最大堆

      for (var i = startIndex; i >= 0; i--) {
        compareChildAndAdjust(i)
      }
    }
    function compareChildAndAdjust(i,lastIndex){
      var bigChildIndex = findBigInChildren(i,lastIndex)
      if (bigChildIndex==false) {  //当找到的子节点返回为false时，表示没有子节点应当结束
        return
      }
      var parent = array[i]
      var bigChild = array[bigChildIndex]
      if (parent >= bigChild) {
        return
      }else{
        self.swapItemInArray(i,bigChildIndex)
        compareChildAndAdjust(bigChildIndex,lastIndex)//调整后要对子树调整
      }
    }
    function findBigInChildren(i,lastIndex){
      var leftChild = array[2*i+1] //i节点的左子节点
      var rightChild = array[2*i+2] //i节点的右子节点
      if (lastIndex) {
        if (2*i+1 >= lastIndex) {
          return false
        }
        if (!(2*i+1 >= lastIndex) &amp;&amp; (2*i+2 >= lastIndex)) {
          return 2*i+1
        }
      }
      if (!leftChild) {
        return false
      }
      if ( leftChild &amp;&amp; !rightChild) {
        return 2*i+1
      }
      if (leftChild>rightChild) {
        return 2*i+1
      }else{
        return 2*i+2
      }
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code>  this.heapSort = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">var</span> <span class="hljs-keyword">self</span> = this
    createMaxHeap()
    swapMaxWithLast()
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">swapMaxWithLast</span><span class="hljs-params">()</span></span>{
      <span class="hljs-keyword">var</span> lastIndex = <span class="hljs-keyword">array</span>.length - <span class="hljs-number">1</span>
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = lastIndex; i &gt; <span class="hljs-number">0</span>; i--) {
        <span class="hljs-keyword">self</span>.swapItemInArray(<span class="hljs-number">0</span>,i)  <span class="hljs-comment">//将根节点与最后一个节点交换</span>
        <span class="hljs-comment">//从根节点开始，与其子节点比较并重新形成最大堆</span>
        <span class="hljs-comment">//传入的第二个参数表示，向下比较的时候，比到第i个节点之前停下来</span>
        compareChildAndAdjust(<span class="hljs-number">0</span>,i)  
      }
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createMaxHeap</span><span class="hljs-params">()</span></span>{  <span class="hljs-comment">//创建最大堆</span>
      <span class="hljs-keyword">var</span> len = <span class="hljs-keyword">array</span>.length
      <span class="hljs-keyword">var</span> startIndex = Math.floor(len/<span class="hljs-number">2</span>) - <span class="hljs-number">1</span> <span class="hljs-comment">//从这个节点开始，将其子树调整为最大堆</span>

      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = startIndex; i &gt;= <span class="hljs-number">0</span>; i--) {
        compareChildAndAdjust(i)
      }
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">compareChildAndAdjust</span><span class="hljs-params">(i,lastIndex)</span></span>{
      <span class="hljs-keyword">var</span> bigChildIndex = findBigInChildren(i,lastIndex)
      <span class="hljs-keyword">if</span> (bigChildIndex==<span class="hljs-keyword">false</span>) {  <span class="hljs-comment">//当找到的子节点返回为false时，表示没有子节点应当结束</span>
        <span class="hljs-keyword">return</span>
      }
      <span class="hljs-keyword">var</span> <span class="hljs-keyword">parent</span> = <span class="hljs-keyword">array</span>[i]
      <span class="hljs-keyword">var</span> bigChild = <span class="hljs-keyword">array</span>[bigChildIndex]
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">parent</span> &gt;= bigChild) {
        <span class="hljs-keyword">return</span>
      }<span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">self</span>.swapItemInArray(i,bigChildIndex)
        compareChildAndAdjust(bigChildIndex,lastIndex)<span class="hljs-comment">//调整后要对子树调整</span>
      }
    }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">findBigInChildren</span><span class="hljs-params">(i,lastIndex)</span></span>{
      <span class="hljs-keyword">var</span> leftChild = <span class="hljs-keyword">array</span>[<span class="hljs-number">2</span>*i+<span class="hljs-number">1</span>] <span class="hljs-comment">//i节点的左子节点</span>
      <span class="hljs-keyword">var</span> rightChild = <span class="hljs-keyword">array</span>[<span class="hljs-number">2</span>*i+<span class="hljs-number">2</span>] <span class="hljs-comment">//i节点的右子节点</span>
      <span class="hljs-keyword">if</span> (lastIndex) {
        <span class="hljs-keyword">if</span> (<span class="hljs-number">2</span>*i+<span class="hljs-number">1</span> &gt;= lastIndex) {
          <span class="hljs-keyword">return</span> <span class="hljs-keyword">false</span>
        }
        <span class="hljs-keyword">if</span> (!(<span class="hljs-number">2</span>*i+<span class="hljs-number">1</span> &gt;= lastIndex) &amp;&amp; (<span class="hljs-number">2</span>*i+<span class="hljs-number">2</span> &gt;= lastIndex)) {
          <span class="hljs-keyword">return</span> <span class="hljs-number">2</span>*i+<span class="hljs-number">1</span>
        }
      }
      <span class="hljs-keyword">if</span> (!leftChild) {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">false</span>
      }
      <span class="hljs-keyword">if</span> ( leftChild &amp;&amp; !rightChild) {
        <span class="hljs-keyword">return</span> <span class="hljs-number">2</span>*i+<span class="hljs-number">1</span>
      }
      <span class="hljs-keyword">if</span> (leftChild&gt;rightChild) {
        <span class="hljs-keyword">return</span> <span class="hljs-number">2</span>*i+<span class="hljs-number">1</span>
      }<span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-number">2</span>*i+<span class="hljs-number">2</span>
      }
    }
  }</code></pre>
<h2 id="articleHeader7">各种排序的速度性能</h2>
<p>首先用一个函数来随机生成10万个数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function createNonSortedArray(size){
      var array = new ArrayList()
      for (var i = size; i > 0; i--) {
        let num = Math.floor(1 + Math.random()*99)
        array.insert(num)
      }
      return array
    }
    var arr = createNonSortedArray(100000)
    //console.log(arr.toString()) //打印查看生成结果" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>    function createNonSortedArray(size){
      <span class="hljs-built_in">var</span> <span class="hljs-built_in">array</span> = <span class="hljs-built_in">new</span> ArrayList()
      <span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> i = size; i &gt; <span class="hljs-number">0</span>; i--) {
        <span class="hljs-built_in">let</span> <span class="hljs-built_in">num</span> = Math.<span class="hljs-built_in">floor</span>(<span class="hljs-number">1</span> + Math.<span class="hljs-built_in">random</span>()*<span class="hljs-number">99</span>)
        <span class="hljs-built_in">array</span>.insert(<span class="hljs-built_in">num</span>)
      }
      <span class="hljs-built_in">return</span> <span class="hljs-built_in">array</span>
    }
    <span class="hljs-built_in">var</span> arr = createNonSortedArray(<span class="hljs-number">100000</span>)
    //console.<span class="hljs-built_in">log</span>(arr.toString()) //打印查看生成结果</code></pre>
<p>接下来采用如下函数来计算排序时间</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var start = (new Date).getTime()
//在这里调用arr的各种排序方法
//如 arr.quickSort()
var end = (new Date).getTime()
console.log(end-start)  //打印查看生成结果
//console.log(arr.toString()) //打印查看排序结果" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code>var start = (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>).getTime()
<span class="hljs-comment">//在这里调用arr的各种排序方法</span>
<span class="hljs-comment">//如 arr.quickSort()</span>
var <span class="hljs-keyword">end</span> = (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>).getTime()
console.<span class="hljs-built_in">log</span>(<span class="hljs-keyword">end</span>-start)  <span class="hljs-comment">//打印查看生成结果</span>
<span class="hljs-comment">//console.log(arr.toString()) //打印查看排序结果</span></code></pre>
<p><strong>数据结果如下</strong></p>
<ul>
<li><p>冒泡排序耗时26000ms左右</p></li>
<li><p>选择排序耗时5800ms左右</p></li>
<li><p>插入排序耗时10600ms左右</p></li>
<li><p>归并排序耗时80-100ms</p></li>
<li><p>快速排序<br>   cutoff==5---&gt;30-50ms<br>   cutoff==10 ---&gt;30-60ms<br>   cutoff==50 ----&gt;40-50ms<br>   cutoff==3效果不错---&gt;30-50ms，30ms出现的机会很多<br>   cutoff==0时（即不在分割长度短的时候转为插入排序），效果依然不错，30-50ms，30ms出现的很多</p></li>
<li><p>堆排序耗时120-140ms</p></li>
<li><p>JavaScript提供的原生排序耗时55-70ms</p></li>
</ul>
<p><strong>结论</strong></p>
<ul>
<li><p>快速排序效率最高，cutoff取3效果最好（没有悬念）</p></li>
<li><p>原生排序竟然是第二快的排序算法！诸位同学参加笔试的时候，在没有指明必须要用哪种排序算法的情况下，如果需要排个序，还是用原生的yourArr.sort(function(a,b){return a-b})吧，毕竟不易错还特别快！</p></li>
</ul>
<h2 id="articleHeader8">关于数据结构和排序算法的学习建议</h2>
<p>如果想了解数据结构和排序算法的基础理论知识，推荐中国大学mooc浙江大学陈越老师主讲的《数据结构》。该课程采用C语言讲解，但仍然可以系统地学习到数据结构的实现思路。<br>你要是觉得本文文字描述难以理解，去听或看该课程的动态图片讲解应该会豁然开朗。</p>
<h2 id="articleHeader9">参考资料</h2>
<p>《数据结构》(第2版)，陈越，高等教育出版社<br>《学习JavaScript数据结构与算法》[巴西]Loiane Groner，中国工信出版集团，人民邮电出版社</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript各种排序算法的实现及其速度性能分析

## 原文链接
[https://segmentfault.com/a/1190000010928302](https://segmentfault.com/a/1190000010928302)

