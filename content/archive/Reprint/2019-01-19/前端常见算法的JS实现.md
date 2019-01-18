---
title: '前端常见算法的JS实现' 
date: 2019-01-19 2:30:10
hidden: true
slug: t3rse8wtx3
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="http://www.qdfuns.com/notes/36539/24a66634ecba54ab3d8f7407168754f2.html" rel="nofollow noreferrer" target="_blank">原文链接</a></p>
<h1 id="articleHeader0">排序算法</h1>
<h2 id="articleHeader1">1、冒泡排序</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function bubbleSort(arr){
  var i = 0,
      j = 0;
  for(i=1; i<arr.length; i++){
    for(j=0; j<=arr.length-i; j++){
      var temp = 0;
      // &quot;>&quot; 从小到大排序
      // &quot;<&quot; 从大到小排序
      if(arr[j] > arr[j+1]){
        temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;
      }
    }
  }
  return arr;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bubbleSort</span>(<span class="hljs-params">arr</span>)</span>{
  <span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>,
      j = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">for</span>(i=<span class="hljs-number">1</span>; i&lt;arr.length; i++){
    <span class="hljs-keyword">for</span>(j=<span class="hljs-number">0</span>; j&lt;=arr.length-i; j++){
      <span class="hljs-keyword">var</span> temp = <span class="hljs-number">0</span>;
      <span class="hljs-comment">// "&gt;" 从小到大排序</span>
      <span class="hljs-comment">// "&lt;" 从大到小排序</span>
      <span class="hljs-keyword">if</span>(arr[j] &gt; arr[j+<span class="hljs-number">1</span>]){
        temp = arr[j];
        arr[j] = arr[j+<span class="hljs-number">1</span>];
        arr[j+<span class="hljs-number">1</span>] = temp;
      }
    }
  }
  <span class="hljs-keyword">return</span> arr;
}</code></pre>
<h2 id="articleHeader2">2、快速排序</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function quickSort(arr,l,r){
  if(l < r){
    var i = l, j = r, x = arr[i];
    while(i<j){
      while(i<j &amp;&amp; arr[j]>x)
        j--;
      
      if(i<j)
        //这里用i++，被换过来的必然比x小，赋值后直接让i自加，不用再比较，可以提高效率
        arr[i++] = arr[j];
      
      while(i<j &amp;&amp; arr[i]<x)
        i++;
      
      if(i<j)
        //这里用j--，被换过来的必然比x大，赋值后直接让j自减，不用再比较，可以提高效率
        arr[j--] = arr[i];
    }
    arr[i] = x;
    
    quickSort(arr, l, i-1);
    quickSort(arr, i+1, r);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">quickSort</span>(<span class="hljs-params">arr,l,r</span>)</span>{
  <span class="hljs-keyword">if</span>(l &lt; r){
    <span class="hljs-keyword">var</span> i = l, j = r, x = arr[i];
    <span class="hljs-keyword">while</span>(i&lt;j){
      <span class="hljs-keyword">while</span>(i&lt;j &amp;&amp; arr[j]&gt;x)
        j--;
      
      <span class="hljs-keyword">if</span>(i&lt;j)
        <span class="hljs-comment">//这里用i++，被换过来的必然比x小，赋值后直接让i自加，不用再比较，可以提高效率</span>
        arr[i++] = arr[j];
      
      <span class="hljs-keyword">while</span>(i&lt;j &amp;&amp; arr[i]&lt;x)
        i++;
      
      <span class="hljs-keyword">if</span>(i&lt;j)
        <span class="hljs-comment">//这里用j--，被换过来的必然比x大，赋值后直接让j自减，不用再比较，可以提高效率</span>
        arr[j--] = arr[i];
    }
    arr[i] = x;
    
    quickSort(arr, l, i<span class="hljs-number">-1</span>);
    quickSort(arr, i+<span class="hljs-number">1</span>, r);
  }
}</code></pre>
<h2 id="articleHeader3">3、二路归并</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function merge(left, right) {
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
    while(left[il]){
        result.push(left[il++]);
    }
    while(right[ir]){
        result.push(right[ir++]);
    }
    return result;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">merge</span>(<span class="hljs-params">left, right</span>) </span>{
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
    <span class="hljs-keyword">while</span>(left[il]){
        result.push(left[il++]);
    }
    <span class="hljs-keyword">while</span>(right[ir]){
        result.push(right[ir++]);
    }
    <span class="hljs-keyword">return</span> result;
}</code></pre>
<h1 id="articleHeader4">字符串操作</h1>
<h2 id="articleHeader5">1、判断回文字符串</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function palindrome(str){
  // \W匹配任何非单词字符。等价于“[^A-Za-z0-9_]”。
  var re = /[\W_]/g;
  // 将字符串变成小写字符,并干掉除字母数字外的字符
  var lowRegStr = str.toLowerCase().replace(re,'');
  // 如果字符串lowRegStr的length长度为0时，字符串即是palindrome
  if(lowRegStr.length===0) return true;
  // 如果字符串的第一个和最后一个字符不相同，那么字符串就不是palindrome
  if(lowRegStr[0]!=lowRegStr[lowRegStr.length-1]) return false;
  //递归
  return palindrome(lowRegStr.slice(1,lowRegStr.length-1));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">palindrome</span>(<span class="hljs-params">str</span>)</span>{
  <span class="hljs-comment">// \W匹配任何非单词字符。等价于“[^A-Za-z0-9_]”。</span>
  <span class="hljs-keyword">var</span> re = <span class="hljs-regexp">/[\W_]/g</span>;
  <span class="hljs-comment">// 将字符串变成小写字符,并干掉除字母数字外的字符</span>
  <span class="hljs-keyword">var</span> lowRegStr = str.toLowerCase().replace(re,<span class="hljs-string">''</span>);
  <span class="hljs-comment">// 如果字符串lowRegStr的length长度为0时，字符串即是palindrome</span>
  <span class="hljs-keyword">if</span>(lowRegStr.length===<span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
  <span class="hljs-comment">// 如果字符串的第一个和最后一个字符不相同，那么字符串就不是palindrome</span>
  <span class="hljs-keyword">if</span>(lowRegStr[<span class="hljs-number">0</span>]!=lowRegStr[lowRegStr.length<span class="hljs-number">-1</span>]) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
  <span class="hljs-comment">//递归</span>
  <span class="hljs-keyword">return</span> palindrome(lowRegStr.slice(<span class="hljs-number">1</span>,lowRegStr.length<span class="hljs-number">-1</span>));
}</code></pre>
<h2 id="articleHeader6">2、翻转字符串</h2>
<h3 id="articleHeader7">思路一：反向遍历字符串</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function reverseString(str){
  var tmp = '';
  for(var i=str.length-1; i>=0; i--)
    tmp += str[i];
  return tmp
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reverseString</span>(<span class="hljs-params">str</span>)</span>{
  <span class="hljs-keyword">var</span> tmp = <span class="hljs-string">''</span>;
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=str.length<span class="hljs-number">-1</span>; i&gt;=<span class="hljs-number">0</span>; i--)
    tmp += str[i];
  <span class="hljs-keyword">return</span> tmp
}</code></pre>
<h3 id="articleHeader8">思路二：转化成array操作</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function reverseString(str){
  var arr = str.split(&quot;&quot;);
  var i = 0,j = arr.length-1;
  while(i<j){
    tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
    i++;
    j--;
  }
  return arr.join(&quot;&quot;);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reverseString</span>(<span class="hljs-params">str</span>)</span>{
  <span class="hljs-keyword">var</span> arr = str.split(<span class="hljs-string">""</span>);
  <span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>,j = arr.length<span class="hljs-number">-1</span>;
  <span class="hljs-keyword">while</span>(i&lt;j){
    tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
    i++;
    j--;
  }
  <span class="hljs-keyword">return</span> arr.join(<span class="hljs-string">""</span>);
}</code></pre>
<h2 id="articleHeader9">3、生成指定长度随机字符串</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function randomString(n){
  var str = 'abcdefghijklmnopqrstuvwxyz0123456789';
  var tmp = '';
  for(var i=0; i<n; i++) {
    tmp += str.charAt(Math.round(Math.random()*str.length));
  }
  return tmp;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">randomString</span>(<span class="hljs-params">n</span>)</span>{
  <span class="hljs-keyword">var</span> str = <span class="hljs-string">'abcdefghijklmnopqrstuvwxyz0123456789'</span>;
  <span class="hljs-keyword">var</span> tmp = <span class="hljs-string">''</span>;
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>; i&lt;n; i++) {
    tmp += str.charAt(<span class="hljs-built_in">Math</span>.round(<span class="hljs-built_in">Math</span>.random()*str.length));
  }
  <span class="hljs-keyword">return</span> tmp;
}</code></pre>
<h2 id="articleHeader10">4、统计字符串中次数最多字母</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function findMaxDuplicateChar(str) {
  if(str.length == 1) {
    return str;
  }
  var charObj = {};
  for(var i = 0; i < str.length; i++) {
    if(!charObj[str.charAt(i)]) {
      charObj[str.charAt(i)] = 1;
    } else {
      charObj[str.charAt(i)] += 1;
    }
  }
  var maxChar = '',
      maxValue = 1;
  for(var k in charObj) {
    if(charObj[k] >= maxValue) {
      maxChar = k;
      maxValue = charObj[k];
    }
  }
  return maxChar + '：' + maxValue;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">findMaxDuplicateChar</span>(<span class="hljs-params">str</span>) </span>{
  <span class="hljs-keyword">if</span>(str.length == <span class="hljs-number">1</span>) {
    <span class="hljs-keyword">return</span> str;
  }
  <span class="hljs-keyword">var</span> charObj = {};
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; str.length; i++) {
    <span class="hljs-keyword">if</span>(!charObj[str.charAt(i)]) {
      charObj[str.charAt(i)] = <span class="hljs-number">1</span>;
    } <span class="hljs-keyword">else</span> {
      charObj[str.charAt(i)] += <span class="hljs-number">1</span>;
    }
  }
  <span class="hljs-keyword">var</span> maxChar = <span class="hljs-string">''</span>,
      maxValue = <span class="hljs-number">1</span>;
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> k <span class="hljs-keyword">in</span> charObj) {
    <span class="hljs-keyword">if</span>(charObj[k] &gt;= maxValue) {
      maxChar = k;
      maxValue = charObj[k];
    }
  }
  <span class="hljs-keyword">return</span> maxChar + <span class="hljs-string">'：'</span> + maxValue;
}</code></pre>
<h1 id="articleHeader11">数组操作</h1>
<h2 id="articleHeader12">1、数组去重</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function unique(arr){
  var obj = {}
  var result = []
  for(var i in arr){
    if(!obj[arr[i]]){
      obj[arr[i]] = true;
      result.push(arr[i]);
    }
  }
  return result;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">unique</span>(<span class="hljs-params">arr</span>)</span>{
  <span class="hljs-keyword">var</span> obj = {}
  <span class="hljs-keyword">var</span> result = []
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i <span class="hljs-keyword">in</span> arr){
    <span class="hljs-keyword">if</span>(!obj[arr[i]]){
      obj[arr[i]] = <span class="hljs-literal">true</span>;
      result.push(arr[i]);
    }
  }
  <span class="hljs-keyword">return</span> result;
}</code></pre>
<h2 id="articleHeader13">2、数组中最大差值</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getMaxProfit(arr){
  var min = arr[0],
      max = arr[0];
  for(var i = 0; i < arr.length; i++){
    if(arr[i] < min) min = arr[i];
    if(arr[i] > max) max = arr[i];
  }
  return max - min;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getMaxProfit</span>(<span class="hljs-params">arr</span>)</span>{
  <span class="hljs-keyword">var</span> min = arr[<span class="hljs-number">0</span>],
      max = arr[<span class="hljs-number">0</span>];
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++){
    <span class="hljs-keyword">if</span>(arr[i] &lt; min) min = arr[i];
    <span class="hljs-keyword">if</span>(arr[i] &gt; max) max = arr[i];
  }
  <span class="hljs-keyword">return</span> max - min;
}</code></pre>
<h1 id="articleHeader14">其他常见算法</h1>
<h2 id="articleHeader15">1、阶乘</h2>
<h3 id="articleHeader16">非递归实现</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function factorialize(num) {
  var result = 1;
    if(num < 0) return -1;
    if(num == 0 || num == 1) return 1;
    while(num>1) {
      result *= num--;
    }
    return result;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">factorialize</span>(<span class="hljs-params">num</span>) </span>{
  <span class="hljs-keyword">var</span> result = <span class="hljs-number">1</span>;
    <span class="hljs-keyword">if</span>(num &lt; <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> <span class="hljs-number">-1</span>;
    <span class="hljs-keyword">if</span>(num == <span class="hljs-number">0</span> || num == <span class="hljs-number">1</span>) <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
    <span class="hljs-keyword">while</span>(num&gt;<span class="hljs-number">1</span>) {
      result *= num--;
    }
    <span class="hljs-keyword">return</span> result;
}</code></pre>
<h3 id="articleHeader17">递归实现</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function factorialize(num) {
  var result = 1;
  if(num < 0) return -1;
  if(num == 0 || num == 1) return 1;
  if(num > 1) return num*factorialize(num-1);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">factorialize</span>(<span class="hljs-params">num</span>) </span>{
  <span class="hljs-keyword">var</span> result = <span class="hljs-number">1</span>;
  <span class="hljs-keyword">if</span>(num &lt; <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> <span class="hljs-number">-1</span>;
  <span class="hljs-keyword">if</span>(num == <span class="hljs-number">0</span> || num == <span class="hljs-number">1</span>) <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
  <span class="hljs-keyword">if</span>(num &gt; <span class="hljs-number">1</span>) <span class="hljs-keyword">return</span> num*factorialize(num<span class="hljs-number">-1</span>);
}</code></pre>
<h2 id="articleHeader18">2、生成菲波那切数列</h2>
<h3 id="articleHeader19">强行递归实现</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getfib(n){
  if(n == 0) return 0;
  if(n == 1) return 1;
  if(n > 1) return getfib(n-1) + getfib(n-2);
}
function fibo(len){
    var fibo = [];
    for(var i = 0; i < len; i++){
      fibo.push(getfib(i));
    }
    return fibo;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getfib</span>(<span class="hljs-params">n</span>)</span>{
  <span class="hljs-keyword">if</span>(n == <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
  <span class="hljs-keyword">if</span>(n == <span class="hljs-number">1</span>) <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
  <span class="hljs-keyword">if</span>(n &gt; <span class="hljs-number">1</span>) <span class="hljs-keyword">return</span> getfib(n<span class="hljs-number">-1</span>) + getfib(n<span class="hljs-number">-2</span>);
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fibo</span>(<span class="hljs-params">len</span>)</span>{
    <span class="hljs-keyword">var</span> fibo = [];
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; len; i++){
      fibo.push(getfib(i));
    }
    <span class="hljs-keyword">return</span> fibo;
}</code></pre>
<h3 id="articleHeader20">简约非递归实现</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getFibonacci(n) {
  var fibarr = [];
  var i = 0;
  while(i < n) {
    if(i <= 1) {
      fibarr.push(i);
    } else {
      fibarr.push(fibarr[i - 1] + fibarr[i - 2])
    }
    i++;
  }
  return fibarr;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getFibonacci</span>(<span class="hljs-params">n</span>) </span>{
  <span class="hljs-keyword">var</span> fibarr = [];
  <span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">while</span>(i &lt; n) {
    <span class="hljs-keyword">if</span>(i &lt;= <span class="hljs-number">1</span>) {
      fibarr.push(i);
    } <span class="hljs-keyword">else</span> {
      fibarr.push(fibarr[i - <span class="hljs-number">1</span>] + fibarr[i - <span class="hljs-number">2</span>])
    }
    i++;
  }
  <span class="hljs-keyword">return</span> fibarr;
}</code></pre>
<h2 id="articleHeader21">3、二分查找</h2>
<h3 id="articleHeader22">非递归实现</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function binary_search(arr, key) {
  var low = 0,
      high = arr.length - 1;
  while(low <= high){
    var mid = parseInt((high + low) / 2);
    if(key == arr[mid]){
      return mid;
    }else if(key > arr[mid]){
      low = mid + 1;
    }else if(key < arr[mid]){
      high = mid -1;
    }
  }
  return -1;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">binary_search</span>(<span class="hljs-params">arr, key</span>) </span>{
  <span class="hljs-keyword">var</span> low = <span class="hljs-number">0</span>,
      high = arr.length - <span class="hljs-number">1</span>;
  <span class="hljs-keyword">while</span>(low &lt;= high){
    <span class="hljs-keyword">var</span> mid = <span class="hljs-built_in">parseInt</span>((high + low) / <span class="hljs-number">2</span>);
    <span class="hljs-keyword">if</span>(key == arr[mid]){
      <span class="hljs-keyword">return</span> mid;
    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(key &gt; arr[mid]){
      low = mid + <span class="hljs-number">1</span>;
    }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(key &lt; arr[mid]){
      high = mid <span class="hljs-number">-1</span>;
    }
  }
  <span class="hljs-keyword">return</span> <span class="hljs-number">-1</span>;
}</code></pre>
<h3 id="articleHeader23">递归实现</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function binary_search2(arr, low, high, key) {
  if(low > high) return -1;
  var mid = parseInt((low + high)/2);
  if(key == arr[mid]) {
    return mid;
  } else if(key > arr[mid]) {
    return binary_search2(arr, mid+1, high, key);
  } else if(key < arr[mid]) {
    return binary_search2(arr, low, mid-1, key);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">binary_search2</span>(<span class="hljs-params">arr, low, high, key</span>) </span>{
  <span class="hljs-keyword">if</span>(low &gt; high) <span class="hljs-keyword">return</span> <span class="hljs-number">-1</span>;
  <span class="hljs-keyword">var</span> mid = <span class="hljs-built_in">parseInt</span>((low + high)/<span class="hljs-number">2</span>);
  <span class="hljs-keyword">if</span>(key == arr[mid]) {
    <span class="hljs-keyword">return</span> mid;
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(key &gt; arr[mid]) {
    <span class="hljs-keyword">return</span> binary_search2(arr, mid+<span class="hljs-number">1</span>, high, key);
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(key &lt; arr[mid]) {
    <span class="hljs-keyword">return</span> binary_search2(arr, low, mid<span class="hljs-number">-1</span>, key);
  }
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端常见算法的JS实现

## 原文链接
[https://segmentfault.com/a/1190000008593715](https://segmentfault.com/a/1190000008593715)

