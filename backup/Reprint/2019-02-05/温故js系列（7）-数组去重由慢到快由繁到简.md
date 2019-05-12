---
title: '温故js系列（7）-数组去重由慢到快由繁到简' 
date: 2019-02-05 2:30:09
hidden: true
slug: vc61k3qtycj
categories: [reprint]
---

{{< raw >}}

                    
<p>前端学习：<a href="https://github.com/xiaohuazheng/-/issues/1" rel="nofollow noreferrer" target="_blank">教程&amp;开发模块化/规范化/工程化/优化&amp;工具/调试&amp;值得关注的博客/Git&amp;面试-前端资源汇总</a></p>
<p>欢迎提issues斧正：<a href="https://github.com/xiaohuazheng/tasteJs/issues/8" rel="nofollow noreferrer" target="_blank">数组去重</a></p>
<h2 id="articleHeader0">JavaScript-数组去重由慢到快由繁到简演化</h2>
<h3 id="articleHeader1">indexOf去重</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.unique1 = function() {
      var arr = [];
      for (var i = 0; i < this.length; i++) {
        var item = this[i];
        if (arr.indexOf(item) === -1) {
              arr.push(item);
        }
      }
      return arr;
}
[1,2,3,'4',3,4,3,1,'34',2].unique1(); //[1, 2, 3, &quot;4&quot;, 4, &quot;34&quot;]

//filter+indexOf写法，箭头函数为ES6新写法。
Array.prototype.unique1 = function() {
    return this.filter((item, index, arr) => arr.indexOf(item) === index);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Array</span>.prototype.unique1 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">var</span> arr = [];
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-keyword">this</span>.length; i++) {
        <span class="hljs-keyword">var</span> item = <span class="hljs-keyword">this</span>[i];
        <span class="hljs-keyword">if</span> (arr.indexOf(item) === <span class="hljs-number">-1</span>) {
              arr.push(item);
        }
      }
      <span class="hljs-keyword">return</span> arr;
}
[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-string">'4'</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">3</span>,<span class="hljs-number">1</span>,<span class="hljs-string">'34'</span>,<span class="hljs-number">2</span>].unique1(); <span class="hljs-comment">//[1, 2, 3, "4", 4, "34"]</span>

<span class="hljs-comment">//filter+indexOf写法，箭头函数为ES6新写法。</span>
<span class="hljs-built_in">Array</span>.prototype.unique1 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.filter(<span class="hljs-function">(<span class="hljs-params">item, index, arr</span>) =&gt;</span> arr.indexOf(item) === index);
}</code></pre>
<p>indexOf的思想就是遍历一个数组的字符，判断这个字符在另一个数组存不存在，不存在就把这个字符也弄一个到结果数组里去。在 IE6-8 下，数组的 indexOf 方法还不存在（虽然这已经算有点古老的话题了O(∩_∩)O~），但是，程序员就要写一个indexOf方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var indexOf = [].indexOf ? function(arr, item) {
      return arr.indexOf(item);
} :
function indexOf(arr, item) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] === item) {
              return i;
        }
      }
      return -1;
}
 
Array.prototype.unique2 = function() {
      var arr = [];
      for (var i = 0; i < this.length; i++) {
        var item = this[i];
        if (arr.indexOf(item) === -1) {
              arr.push(item);
        }
      }
      return arr;
}
[1,2,3,'4',3,4,3,1,'34',2].unique2(); //[1, 2, 3, &quot;4&quot;, 4, &quot;34&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> indexOf = [].indexOf ? <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">arr, item</span>) </span>{
      <span class="hljs-keyword">return</span> arr.indexOf(item);
} :
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">indexOf</span>(<span class="hljs-params">arr, item</span>) </span>{
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {
        <span class="hljs-keyword">if</span> (arr[i] === item) {
              <span class="hljs-keyword">return</span> i;
        }
      }
      <span class="hljs-keyword">return</span> <span class="hljs-number">-1</span>;
}
 
<span class="hljs-built_in">Array</span>.prototype.unique2 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">var</span> arr = [];
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-keyword">this</span>.length; i++) {
        <span class="hljs-keyword">var</span> item = <span class="hljs-keyword">this</span>[i];
        <span class="hljs-keyword">if</span> (arr.indexOf(item) === <span class="hljs-number">-1</span>) {
              arr.push(item);
        }
      }
      <span class="hljs-keyword">return</span> arr;
}
[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-string">'4'</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">3</span>,<span class="hljs-number">1</span>,<span class="hljs-string">'34'</span>,<span class="hljs-number">2</span>].unique2(); <span class="hljs-comment">//[1, 2, 3, "4", 4, "34"]</span></code></pre>
<p>indexOf还可以以这样的去重思路：判断当前字符在数组中出现的位置是不是第一次出现的位置，如果是就把字符放到结果数组中。在去重过程中，原数组都是不变的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.unique3 = function(){
    var arr = [this[0]]; 
    for(var i = 1; i < this.length; i++){
        if (this.indexOf(this[i]) == i){
            arr.push(this[i]);
        } 
    }
    return arr;
}
[1,2,3,'4',3,4,3,1,'34',2].unique3(); //[1, 2, 3, &quot;4&quot;, 4, &quot;34&quot;]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>Array.prototype.unique3 = function(){
    <span class="hljs-keyword">var</span> arr = [<span class="hljs-keyword">this</span>[<span class="hljs-number">0</span>]]; 
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt; <span class="hljs-keyword">this</span>.length; i++){
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.indexOf(<span class="hljs-keyword">this</span>[i]) == i){
            arr.push(<span class="hljs-keyword">this</span>[i]);
        } 
    }
    <span class="hljs-keyword">return</span> arr;
}
[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-string">'4'</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">3</span>,<span class="hljs-number">1</span>,<span class="hljs-string">'34'</span>,<span class="hljs-number">2</span>].unique3(); <span class="hljs-comment">//[1, 2, 3, "4", 4, "34"]</span>
</code></pre>
<h3 id="articleHeader2">hash去重</h3>
<p>以上indexOf正确性没问题，但性能上，两重循环会降低性能。那我们就用hash。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.unique4 = function() {
      var arr = [];
      var hash = {};
      for (var i = 0; i < this.length; i++) {
        var item = this[i];
        var key = typeof(item) + item
        if (hash[key] !== 1) {
              arr.push(item);
              hash[key] = 1;
        }
      } 
      return arr;
}
[1,2,3,'4',3,4,3,1,'34',2].unique4(); //[1, 2, 3, &quot;4&quot;, 4, &quot;34&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Array</span>.prototype.unique4 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">var</span> arr = [];
      <span class="hljs-keyword">var</span> hash = {};
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-keyword">this</span>.length; i++) {
        <span class="hljs-keyword">var</span> item = <span class="hljs-keyword">this</span>[i];
        <span class="hljs-keyword">var</span> key = <span class="hljs-keyword">typeof</span>(item) + item
        <span class="hljs-keyword">if</span> (hash[key] !== <span class="hljs-number">1</span>) {
              arr.push(item);
              hash[key] = <span class="hljs-number">1</span>;
        }
      } 
      <span class="hljs-keyword">return</span> arr;
}
[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-string">'4'</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">3</span>,<span class="hljs-number">1</span>,<span class="hljs-string">'34'</span>,<span class="hljs-number">2</span>].unique4(); <span class="hljs-comment">//[1, 2, 3, "4", 4, "34"]</span></code></pre>
<p>hash去重的核心是构建了一个 hash 对象来替代 indexOf。以空间换时间。注意在 JavaScript 里，对象的键值只能是字符串，因此需要var key = typeof(item) + item 来区分数值 1 和字符串 '1' 等情况。（当然，ES6提供了Map数据结构。它类似于对象，也是键值对的集合，但是“键”的范围不限于字符串，各种类型的值（包括对象）都可以当作键。也就是说，Object结构提供了“字符串—值”的对应，Map结构提供了“值—值”的对应，是一种更完善的Hash结构现。）</p>
<p>那如果你想要'4' 和 4 被认为是相同的话（其他方法同理）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.unique5 = function(){
    var arr=[];
    var hash={};
    for(var i=0,len=this.length;i<len;i++){
        if(!hash[this[i]]){ 
            arr.push(this[i]);
            hash[this[i]]=true;
        }
    }
    return arr;
}
[1,2,3,'4',3,4,3,1,'34',2].unique5(); //[1, 2, 3, &quot;4&quot;, &quot;34&quot;]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>Array.prototype.unique5 = function(){
    <span class="hljs-keyword">var</span> arr=[];
    <span class="hljs-keyword">var</span> hash={};
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>,len=<span class="hljs-keyword">this</span>.length;i&lt;len;i++){
        <span class="hljs-keyword">if</span>(!hash[<span class="hljs-keyword">this</span>[i]]){ 
            arr.push(<span class="hljs-keyword">this</span>[i]);
            hash[<span class="hljs-keyword">this</span>[i]]=<span class="hljs-literal">true</span>;
        }
    }
    <span class="hljs-keyword">return</span> arr;
}
[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-string">'4'</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">3</span>,<span class="hljs-number">1</span>,<span class="hljs-string">'34'</span>,<span class="hljs-number">2</span>].unique5(); <span class="hljs-comment">//[1, 2, 3, "4", "34"]</span>
</code></pre>
<h3 id="articleHeader3">排序后去重</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.unique6 = function(){
    this.sort();
    var arr = [this[0]];
    for(var i = 1; i < this.length; i++){
        if( this[i] !== arr[arr.length-1]){
            arr.push(this[i]);
        }
    }
    return arr;
}
[1,2,3,'4',3,4,3,1,'34',2].unique6(); //[1, 2, 3, &quot;34&quot;, &quot;4&quot;, 4]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>Array.prototype.unique6 = function(){
    <span class="hljs-keyword">this</span>.sort();
    <span class="hljs-keyword">var</span> arr = [<span class="hljs-keyword">this</span>[<span class="hljs-number">0</span>]];
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt; <span class="hljs-keyword">this</span>.length; i++){
        <span class="hljs-keyword">if</span>( <span class="hljs-keyword">this</span>[i] !== arr[arr.length<span class="hljs-number">-1</span>]){
            arr.push(<span class="hljs-keyword">this</span>[i]);
        }
    }
    <span class="hljs-keyword">return</span> arr;
}
[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-string">'4'</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">3</span>,<span class="hljs-number">1</span>,<span class="hljs-string">'34'</span>,<span class="hljs-number">2</span>].unique6(); <span class="hljs-comment">//[1, 2, 3, "34", "4", 4]</span></code></pre>
<p>先把数组排序，然后比较相邻的两个值，排序的时候用的JS原生的sort方法，所以非常快。而这个方法的缺陷只有一点，比较字符时按照字符编码的顺序进行排序。所以会看到10排在2前面这种情况。不过在去重中不影响。不过，解决sort的这个问题，是sort方法接受一个参数，这个参数是一个方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function compare(value1,value2) {
    if (value1 < value2) {
        return -1;
    } else if (value1 > value2) {
        return 1;
    } else {
        return 0;
    }
}
[1,2,5,2,10,3,20].sort(compare);  //[1, 2, 2, 3, 5, 10, 20]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code><span class="hljs-keyword">function</span> compare(<span class="hljs-keyword">value</span><span class="hljs-number">1</span>,<span class="hljs-keyword">value</span><span class="hljs-number">2</span>) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">value</span><span class="hljs-number">1</span> &lt; <span class="hljs-keyword">value</span><span class="hljs-number">2</span>) {
        <span class="hljs-keyword">return</span> -<span class="hljs-number">1</span>;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-keyword">value</span><span class="hljs-number">1</span> &gt; <span class="hljs-keyword">value</span><span class="hljs-number">2</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
    }
}
[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">5</span>,<span class="hljs-number">2</span>,<span class="hljs-number">10</span>,<span class="hljs-number">3</span>,<span class="hljs-number">20</span>].sort(compare);  <span class="hljs-comment">//[1, 2, 2, 3, 5, 10, 20]</span>
</code></pre>
<h3 id="articleHeader4">Set去重</h3>
<p>ES6提供了新的数据结构Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。现在浏览器正在全面支持，服务端的node也已经支持。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.prototype.unique7 = function(){
    return [...new Set(this)];
}
[1,2,3,'4',3,4,3,1,'34',2].unique7(); //[1, 2, 3, &quot;4&quot;, 4, &quot;34&quot;]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>Array.prototype.unique7 = function(){
    return [...new Set(this)];
}
[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,'<span class="hljs-number">4</span>',<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">3</span>,<span class="hljs-number">1</span>,'<span class="hljs-number">34</span>',<span class="hljs-number">2</span>].unique7(); <span class="hljs-comment">//[1, 2, 3, "4", 4, "34"]</span>
</code></pre>
<h3 id="articleHeader5">方法库</h3>
<p>推荐一个方法库Underscore.js，在node或浏览器js中都很受欢迎。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const _ = require('underscore');
_.uniq([1, 2, 1, 3, 1, 4]);  //[1, 2, 3, 4]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>const _ = require('underscore');
_.uniq([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">1</span>, <span class="hljs-number">3</span>, <span class="hljs-number">1</span>, <span class="hljs-number">4</span>]);  <span class="hljs-comment">//[1, 2, 3, 4]</span>
</code></pre>
<h3 id="articleHeader6">测试时间</h3>
<p>以上方法均可以用一个简单的方法去测试一下所耗费的时间,然后对各个方法做比较择优：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.time(&quot;test&quot;);
[1,2,3,'4',3,4,3,1,'34',2].unique7();
console.timeEnd(&quot;test&quot;);
==> VM314:3 test: 0.378ms" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">console</span>.time(<span class="hljs-string">"test"</span>);
[<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-string">'4'</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">3</span>,<span class="hljs-number">1</span>,<span class="hljs-string">'34'</span>,<span class="hljs-number">2</span>].unique7();
<span class="hljs-built_in">console</span>.timeEnd(<span class="hljs-string">"test"</span>);
=<span class="hljs-function">=&gt;</span> VM314:<span class="hljs-number">3</span> test: <span class="hljs-number">0.378</span>ms</code></pre>
<p>让数据变得大一点，就随机创建100万个数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [];
var num = 0;
for(var i = 0; i < 1000000; i++){
    num = Math.floor(Math.random()*100);
    arr.push(num);
}
console.time(&quot;test&quot;);
arr.unique7();
console.timeEnd(&quot;test&quot;);
==> VM325:3 test: 108025.815ms （比较数目越多，差距越大，更好选择）
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> arr = [];
<span class="hljs-built_in">var</span> <span class="hljs-built_in">num</span> = <span class="hljs-number">0</span>;
<span class="hljs-keyword">for</span>(<span class="hljs-built_in">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">1000000</span>; i++){
    <span class="hljs-built_in">num</span> = Math.<span class="hljs-built_in">floor</span>(Math.<span class="hljs-built_in">random</span>()*<span class="hljs-number">100</span>);
    arr.<span class="hljs-built_in">push</span>(<span class="hljs-built_in">num</span>);
}
console.<span class="hljs-built_in">time</span>(<span class="hljs-string">"test"</span>);
arr.unique7();
console.timeEnd(<span class="hljs-string">"test"</span>);
==&gt; VM325:<span class="hljs-number">3</span> test: <span class="hljs-number">108025.</span>815ms （比较数目越多，差距越大，更好选择）
</code></pre>
<p>我们平时使用数组去重的地方，视业务不同，需求量不一样。但使用的方法则可以视业务场景而选择一个正确的合适的方法来写代码。更重要的是我们的代码要写来让别人看得懂...写晦涩难懂的代码切不做注释只是装得一手好逼。。。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
温故js系列（7）-数组去重由慢到快由繁到简

## 原文链接
[https://segmentfault.com/a/1190000006632291](https://segmentfault.com/a/1190000006632291)

