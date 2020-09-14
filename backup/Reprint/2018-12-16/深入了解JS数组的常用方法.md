---
title: '深入了解JS数组的常用方法' 
date: 2018-12-16 2:30:10
hidden: true
slug: cge660np9at
categories: [reprint]
---

{{< raw >}}

                    
<p>数组作为一种重要的数据类型，除了基础的 pop、push、shift、unshift 几个方法外，还有很多实用的方法也是我们的必备技能。</p>
<p>假设我们有一队人，如下图：<br><span class="img-wrap"><img data-src="/img/bV2Qqg?w=1024&amp;h=339" src="https://static.alili.tech/img/bV2Qqg?w=1024&amp;h=339" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>我们要对其进行一些排序或筛选的操作（比喻按高矮排序，筛选女性等），我们都可以通过数组来进行操作。</p>
<p>注：这里更侧重讲解如何使用，至于详细方法请参考：<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array" rel="nofollow noreferrer" target="_blank">数组 | MDN</a></p>
<h3 id="articleHeader0">抽出一些人</h3>
<p>首先我们用数组定义该数据（为了简单起见，我们数据就不搞那么多）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var aPerson = ['person1', 'person2', 'person3', 'person4', 'person5', 'person6']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">var</span> aPerson = [<span class="hljs-string">'person1'</span>, <span class="hljs-string">'person2'</span>, <span class="hljs-string">'person3'</span>, <span class="hljs-string">'person4'</span>, <span class="hljs-string">'person5'</span>, <span class="hljs-string">'person6'</span>]</code></pre>
<h5>slice</h5>
<p>现在假设我们要抽取三个人，我们可以使用slice()方法来选取三个人，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var aP3 = aPerson.slice(1, 4);
console.log(aPerson); // ['person1', 'person2', 'person3', 'person4', 'person5', 'person6']
console.log(aP3); // [&quot;person2&quot;, &quot;person3&quot;, &quot;person4&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>var aP3 = aPerson.slice(<span class="hljs-number">1</span>, <span class="hljs-number">4</span>);
console.log(aPerson); <span class="hljs-regexp">//</span> [<span class="hljs-string">'person1'</span>, <span class="hljs-string">'person2'</span>, <span class="hljs-string">'person3'</span>, <span class="hljs-string">'person4'</span>, <span class="hljs-string">'person5'</span>, <span class="hljs-string">'person6'</span>]
console.log(aP3); <span class="hljs-regexp">//</span> [<span class="hljs-string">"person2"</span>, <span class="hljs-string">"person3"</span>, <span class="hljs-string">"person4"</span>]</code></pre>
<p>该方法返回一个从开始到结束（不包括结束）选择的数组的一部分浅拷贝到一个新数组对象。原数组不会改变。</p>
<p>详细语法请参考：<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/slice" rel="nofollow noreferrer" target="_blank">slice</a></p>
<h5>splice</h5>
<p>同样我们还可以使用splice()方法来选取，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var aPerson = ['person1', 'person2', 'person3', 'person4', 'person5', 'person6']
var aP3 = aPerson.splice(1, 3);
console.log(aPerson); // [&quot;person1&quot;, &quot;person5&quot;, &quot;person6&quot;]
console.log(aP3); // [&quot;person2&quot;, &quot;person3&quot;, &quot;person4&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>var aPerson = [<span class="hljs-string">'person1'</span>, <span class="hljs-string">'person2'</span>, <span class="hljs-string">'person3'</span>, <span class="hljs-string">'person4'</span>, <span class="hljs-string">'person5'</span>, <span class="hljs-string">'person6'</span>]
var aP3 = aPerson.splice(<span class="hljs-number">1</span>, <span class="hljs-number">3</span>);
console.log(aPerson); // [<span class="hljs-string">"person1"</span>, <span class="hljs-string">"person5"</span>, <span class="hljs-string">"person6"</span>]
console.log(aP3); // [<span class="hljs-string">"person2"</span>, <span class="hljs-string">"person3"</span>, <span class="hljs-string">"person4"</span>]</code></pre>
<p>该方法通过删除现有元素或添加新元素来更改数组的内容。原数组会改变。</p>
<p>对于 slice 来说，splice 的功能会更强大点，其区别主要在于：</p>
<ul>
<li>slice 不改变原数组，而 splice 则会改变</li>
<li>slice 的第二个参数为截至的索引值，而 splice 则表示要截取的个数</li>
<li>splice 还能用于增加元素，slice 则不可以</li>
</ul>
<p>详细语法请参考：<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/splice" rel="nofollow noreferrer" target="_blank">splice</a></p>
<h5>concat</h5>
<p>除了从队伍里抽出一些人出来，我们还可以把另外一个队伍和这个队伍合并成一个新队伍，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var aPerson1 = ['person1', 'person2', 'person3', 'person4', 'person5', 'person6']
var aPerson2 = ['person7', 'person8', 'person9'];

var aPerson3 = aPerson1.concat(aPerson2);
console.log(aPerson3); // [&quot;person1&quot;, &quot;person2&quot;, &quot;person3&quot;, &quot;person4&quot;, &quot;person5&quot;, &quot;person6&quot;, &quot;person7&quot;, &quot;person8&quot;, &quot;person9&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cal"><code><span class="hljs-keyword">var</span> aPerson1 = [<span class="hljs-string">'person1'</span>, <span class="hljs-string">'person2'</span>, <span class="hljs-string">'person3'</span>, <span class="hljs-string">'person4'</span>, <span class="hljs-string">'person5'</span>, <span class="hljs-string">'person6'</span>]
<span class="hljs-keyword">var</span> aPerson2 = [<span class="hljs-string">'person7'</span>, <span class="hljs-string">'person8'</span>, <span class="hljs-string">'person9'</span>];

<span class="hljs-keyword">var</span> aPerson3 = aPerson1.concat(aPerson2);
console.log(aPerson3); // [<span class="hljs-string">"person1"</span>, <span class="hljs-string">"person2"</span>, <span class="hljs-string">"person3"</span>, <span class="hljs-string">"person4"</span>, <span class="hljs-string">"person5"</span>, <span class="hljs-string">"person6"</span>, <span class="hljs-string">"person7"</span>, <span class="hljs-string">"person8"</span>, <span class="hljs-string">"person9"</span>]</code></pre>
<p>concat() 方法用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组。</p>
<p>详细语法请参考：<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/concat" rel="nofollow noreferrer" target="_blank">concat</a></p>
<h3 id="articleHeader1">高矮排序</h3>
<p>现在我们以高矮的形式定义一组数据，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var aHeight = ['170', '165', '178', '183', '168', '175', '173'];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">var aHeight</span> = [<span class="hljs-string">'170'</span>, <span class="hljs-string">'165'</span>, <span class="hljs-string">'178'</span>, <span class="hljs-string">'183'</span>, <span class="hljs-string">'168'</span>, <span class="hljs-string">'175'</span>, <span class="hljs-string">'173'</span>];</code></pre>
<h5>reverse</h5>
<p>我们可以直接使用reverse()方法来实现倒序，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="aHeight.reverse();
console.log(aHeight); // [&quot;173&quot;, &quot;175&quot;, &quot;168&quot;, &quot;183&quot;, &quot;178&quot;, &quot;165&quot;, &quot;170&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>aHeight.<span class="hljs-built_in">reverse</span>();
console.<span class="hljs-built_in">log</span>(aHeight); // [<span class="hljs-string">"173"</span>, <span class="hljs-string">"175"</span>, <span class="hljs-string">"168"</span>, <span class="hljs-string">"183"</span>, <span class="hljs-string">"178"</span>, <span class="hljs-string">"165"</span>, <span class="hljs-string">"170"</span>]</code></pre>
<p>该方法非常简单，没有任何参数，就是把数组的出现顺序调换下，第一个元素会成为最后一个，最后一个会成为第一个。一般也很少用到。</p>
<h5>sort</h5>
<p>比起 reverse() 来说，sort() 方法使用的地方就多了。我们先来个从矮到高的排序，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="aHeight.sort();
console.log(aHeight); // [&quot;165&quot;, &quot;168&quot;, &quot;170&quot;, &quot;173&quot;, &quot;175&quot;, &quot;178&quot;, &quot;183&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>aHeight.<span class="hljs-built_in">sort</span>();
console.<span class="hljs-built_in">log</span>(aHeight); // [<span class="hljs-string">"165"</span>, <span class="hljs-string">"168"</span>, <span class="hljs-string">"170"</span>, <span class="hljs-string">"173"</span>, <span class="hljs-string">"175"</span>, <span class="hljs-string">"178"</span>, <span class="hljs-string">"183"</span>]</code></pre>
<p>sort() 方法默认的排序是升序，如上代码可见。但是我们也可以传入一个函数，指定其排序方式，如现在让其以降序方式排列：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="aHeight.sort(function(a, b){
    return b - a;
});
console.log(aHeight); // [&quot;183&quot;, &quot;178&quot;, &quot;175&quot;, &quot;173&quot;, &quot;170&quot;, &quot;168&quot;, &quot;165&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code>aHeight.sort(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(a, b)</span></span>{
    <span class="hljs-keyword">return</span> b - a;
});
console.log(aHeight); // [<span class="hljs-string">"183"</span>, <span class="hljs-string">"178"</span>, <span class="hljs-string">"175"</span>, <span class="hljs-string">"173"</span>, <span class="hljs-string">"170"</span>, <span class="hljs-string">"168"</span>, <span class="hljs-string">"165"</span>]</code></pre>
<p>详细语法请参考：<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/sort" rel="nofollow noreferrer" target="_blank">sort</a></p>
<h5>随机排序</h5>
<p>除了正常的升序降序之外，其实我们还经常使用到随机排序，如我们的抢红包，棋牌游戏中的洗牌都是随机排序的应用。</p>
<p>在使用随机排序的时候，我们得使用到一个随机函数 Math.random()。<br>该函数返回一个浮点数, 其数字在范围[0，1)。</p>
<p>这样我们就可以使用该随机生成浮点数与0.5大小进行比较，那样结果可能大于或小于0，最后就得到了我们的随机排序。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 第一次运行
aHeight.sort(function(){
    return 0.5 - Math.random();
});
console.log(aHeight); // [&quot;183&quot;, &quot;168&quot;, &quot;175&quot;, &quot;173&quot;, &quot;170&quot;, &quot;165&quot;, &quot;178&quot;]

// 第二次运行
aHeight.sort(function(){
    return 0.5 - Math.random();
});
console.log(aHeight); // [&quot;170&quot;, &quot;183&quot;, &quot;175&quot;, &quot;168&quot;, &quot;173&quot;, &quot;165&quot;, &quot;178&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code>// 第一次运行
aHeight.sort(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">return</span> <span class="hljs-number">0.5</span> - Math.random();
});
console.log(aHeight); // [<span class="hljs-string">"183"</span>, <span class="hljs-string">"168"</span>, <span class="hljs-string">"175"</span>, <span class="hljs-string">"173"</span>, <span class="hljs-string">"170"</span>, <span class="hljs-string">"165"</span>, <span class="hljs-string">"178"</span>]

// 第二次运行
aHeight.sort(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">return</span> <span class="hljs-number">0.5</span> - Math.random();
});
console.log(aHeight); // [<span class="hljs-string">"170"</span>, <span class="hljs-string">"183"</span>, <span class="hljs-string">"175"</span>, <span class="hljs-string">"168"</span>, <span class="hljs-string">"173"</span>, <span class="hljs-string">"165"</span>, <span class="hljs-string">"178"</span>]</code></pre>
<p>因为是随机的，所以每次运行都会不一样，我们可以多运行几次试试。</p>
<h3 id="articleHeader2">条件筛选测试</h3>
<p>现在我们以肤色和年龄的的形式定义两组数据，如下（yellow 表示黄种人，white 表示白人，black 表示黑人）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var aColor = ['yellow', 'black', 'white', 'white', 'yellow', 'yellow'];
var aAge = [19, 30, 25, 37, 18, 35];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">var aColor</span> = [<span class="hljs-string">'yellow'</span>, <span class="hljs-string">'black'</span>, <span class="hljs-string">'white'</span>, <span class="hljs-string">'white'</span>, <span class="hljs-string">'yellow'</span>, <span class="hljs-string">'yellow'</span>];
<span class="hljs-attribute">var aAge</span> = [19, 30, 25, 37, 18, 35];</code></pre>
<h4>测试是否符合条件</h4>
<h5>every</h5>
<p>every() 方法用于测试数组的所有数据是否都通过了指定函数的测试，如果通过返回 true，否则 false。</p>
<p>比喻判断是否所有人的年龄都大于20岁，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ageTest = aAge.every(function(item, index){
    return item > 20;
})

console.log(ageTest); // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-keyword">var</span> ageTest = aAge.every(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(item, <span class="hljs-keyword">index</span>)</span><span class="hljs-comment">{
    return item &gt; 20;
}</span>)

<span class="hljs-title">console</span>.<span class="hljs-title">log</span><span class="hljs-params">(ageTest)</span>;</span> <span class="hljs-comment">// false</span></code></pre>
<p>every 需要数组中的每个数据都满足该条件则返回 true，否则就是 false。</p>
<p>详细语法请参考：<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/every" rel="nofollow noreferrer" target="_blank">every</a></p>
<h5>some</h5>
<p>对应 every() 方法，还有一个 some() 方法，表示数组中只要有任何一个数据满足条件则返回 ture，如果一个数据都不满足则返回 false。</p>
<p>比喻判断是否有人的年龄都大于32岁，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ageTest2 = aAge.some(function(item, index){
    return item > 32;
})

console.log(ageTest2); // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-keyword">var</span> ageTest2 = aAge.some(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(item, <span class="hljs-keyword">index</span>)</span><span class="hljs-comment">{
    return item &gt; 32;
}</span>)

<span class="hljs-title">console</span>.<span class="hljs-title">log</span><span class="hljs-params">(ageTest2)</span>;</span> <span class="hljs-comment">// true</span></code></pre>
<p>详细语法请参考：<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/some" rel="nofollow noreferrer" target="_blank">some</a></p>
<h5>includes</h5>
<p>includes() 方法用来判断当前数组是否包含某指定的值，如果是，则返回 true，否则返回 false。</p>
<p>比喻判断是否有35岁的人，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ageTest3 = aAge.includes(35);
var ageTest4 = aAge.includes(28);

console.log(ageTest3); // true
console.log(ageTest4); // false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> ageTest3 = aAge.includes(<span class="hljs-number">35</span>);
<span class="hljs-keyword">var</span> ageTest4 = aAge.includes(<span class="hljs-number">28</span>);

<span class="hljs-built_in">console</span>.log(ageTest3); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(ageTest4); <span class="hljs-comment">// false</span></code></pre>
<h4>条件筛选</h4>
<h5>filter</h5>
<p>比喻我要选取所有黄皮肤的人，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var aYellow = aColor.filter(function(item, index) {
    return item === 'yellow';
})

console.log(aYellow); // [&quot;yellow&quot;, &quot;yellow&quot;, &quot;yellow&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> aYellow = aColor.filter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item, index</span>) </span>{
    <span class="hljs-keyword">return</span> item === <span class="hljs-string">'yellow'</span>;
})

<span class="hljs-built_in">console</span>.log(aYellow); <span class="hljs-comment">// ["yellow", "yellow", "yellow"]</span></code></pre>
<p>该方法返回所有满足条件数据组成的数组。</p>
<p>详细语法请参考：<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter" rel="nofollow noreferrer" target="_blank">filter</a></p>
<p>让每个人都干点啥</p>
<h5>forEach</h5>
<p>forEach() 方法对数组的每个元素执行一次提供的函数，该方法没有返回值。</p>
<p>比喻过节的时候给每个人去老板那边领个红包，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var aPerson = ['person1', 'person2', 'person3', 'person4', 'person5', 'person6']

aPerson.forEach(function(item, index) {
    console.log(item + '领取了 200 元红包')
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> aPerson = [<span class="hljs-string">'person1'</span>, <span class="hljs-string">'person2'</span>, <span class="hljs-string">'person3'</span>, <span class="hljs-string">'person4'</span>, <span class="hljs-string">'person5'</span>, <span class="hljs-string">'person6'</span>]

aPerson.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item, index</span>) </span>{
    <span class="hljs-built_in">console</span>.log(item + <span class="hljs-string">'领取了 200 元红包'</span>)
})</code></pre>
<p>详细语法请参考：<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach" rel="nofollow noreferrer" target="_blank">forEach</a></p>
<h6>map</h6>
<p>map() 方法创建一个新数组，其结果是该数组中的每个元素调用一个提供的函数。</p>
<p>比喻每个人的工资都增加 5000元，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 先构造一份工资数据
var aSalary = [8000, 7000, 1500, 9000, 22000];

var aNewSalary = aSalary.map(function(item, index) {
    return item + 5000;
})

console.log(aNewSalary); // [13000, 12000, 6500, 14000, 27000]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-comment">// 先构造一份工资数据</span>
<span class="hljs-keyword">var</span> aSalary = [<span class="hljs-number">8000</span>, <span class="hljs-number">7000</span>, <span class="hljs-number">1500</span>, <span class="hljs-number">9000</span>, <span class="hljs-number">22000</span>];

<span class="hljs-keyword">var</span> aNewSalary = aSalary.map(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(item, <span class="hljs-keyword">index</span>)</span> <span class="hljs-comment">{
    return item + 5000;
}</span>)

<span class="hljs-title">console</span>.<span class="hljs-title">log</span><span class="hljs-params">(aNewSalary)</span>;</span> <span class="hljs-comment">// [13000, 12000, 6500, 14000, 27000]</span></code></pre>
<p>详细语法请参考：<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map" rel="nofollow noreferrer" target="_blank">map</a></p>
<h3 id="articleHeader3">其他</h3>
<p>除了上面说的那些方法之外，还有一些常用方法，如 indexOf、join 等等，这里就不再一一说明了，具体可参考：<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array" rel="nofollow noreferrer" target="_blank">数组 | MDN</a></p>
<p>总之，数组的方法一定要了如指掌，如果你实在记不住，那也必须知道有这么个东西，以后知道怎么查阅，因为平时做业务的时候处理数据就需要这些各种方法。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入了解JS数组的常用方法

## 原文链接
[https://segmentfault.com/a/1190000013032289](https://segmentfault.com/a/1190000013032289)

