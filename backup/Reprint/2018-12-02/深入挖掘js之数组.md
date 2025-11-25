---
title: '深入挖掘js之数组' 
date: 2018-12-02 2:30:16
hidden: true
slug: xvcmulhoe
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一、数组字面量</h2>
<ul>
<li>数组字面量提供了一种非常方便的创建数组的表达法。</li>
<li>一个数组字面量是在一对方括号中包围零个或多个用逗号分隔的值的表达式。</li>
</ul>
<p>对象字面量数组：</p>
<blockquote>var numbers_object = {<br>'0' : 'zero',<br>'1' : 'one',<br>'2' : 'two'<br>};</blockquote>
<ul><li>javascript运行数组包括任意混合类型的数组。</li></ul>
<h2 id="articleHeader1">二、长度</h2>
<ul>
<li>每个数组都有一个length的属性，JavaScript数组的length没有上界。如果你用大于等于当前length的数字作为下标来存储一个元素，那么length值会增大以容纳新元素，不会发生数组越界错误。</li>
<li>length属性的值是这些数组的最大整数属性名加上1。它等于数组里的属性的个数。</li>
</ul>
<blockquote>numbers.push('go');</blockquote>
<p>可以使用push向数组中增加元素，也可以用.join['']方式加入到数组中。</p>
<h2 id="articleHeader2">三、删除</h2>
<ul><li>JavaScript数组就是对象，delete运算符可以用来从数组中移除元素：</li></ul>
<blockquote>delete numbers[2];</blockquote>
<p>这样操作的话会使数组留下一个空洞，被删除的元素依旧保留着它在数组的位置，排在被删除后面的元素依旧保留着他们最初的属性。这样是不行的，我们就要去寻找一个新的方法去解决这个问题，splice方法</p>
<blockquote>numbers.splice(2,1);</blockquote>
<ul><li>第一个参数是数组的序号，第二个参数是删除元素的个数。</li></ul>
<h2 id="articleHeader3">四、枚举</h2>
<ul>
<li>1、fon in 遍历每个数组的所有属性，无法保证数组的排序，可能从原型链上得到以外的属性。</li>
<li>2、for 来避免这些问题</li>
</ul>
<blockquote>var i;<br>for(i=0;i&lt;myArray.length;i+=1){<br>console.log(myArray[i];<br>};</blockquote>
<h2 id="articleHeader4">五、方法</h2>
<p>JavaScript提供了一套数组的方法，被存储在Array.prototype中的函数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.method('reduce',function(f,value){
    var i;
    for(i=0;i<this.length;i+=1){
        value = f((this[i]),value);
    }
    return value;
});
//通过各Array.prototype扩充一个方法，每个数组斗继承这个方法。
var data = [4,5,5,9];
var add = function(a,b){
    return a+d;
};
var mult = function(a,b){
    return a*b;
};
var sum = data.reduce(add,0);
console.log(sum);
var product = data.reduce(mult,1);
console.log(product);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Array</span>.method(<span class="hljs-string">'reduce'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">f,value</span>)</span>{
    <span class="hljs-keyword">var</span> i;
    <span class="hljs-keyword">for</span>(i=<span class="hljs-number">0</span>;i&lt;<span class="hljs-keyword">this</span>.length;i+=<span class="hljs-number">1</span>){
        value = f((<span class="hljs-keyword">this</span>[i]),value);
    }
    <span class="hljs-keyword">return</span> value;
});
<span class="hljs-comment">//通过各Array.prototype扩充一个方法，每个数组斗继承这个方法。</span>
<span class="hljs-keyword">var</span> data = [<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">5</span>,<span class="hljs-number">9</span>];
<span class="hljs-keyword">var</span> add = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a,b</span>)</span>{
    <span class="hljs-keyword">return</span> a+d;
};
<span class="hljs-keyword">var</span> mult = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a,b</span>)</span>{
    <span class="hljs-keyword">return</span> a*b;
};
<span class="hljs-keyword">var</span> sum = data.reduce(add,<span class="hljs-number">0</span>);
<span class="hljs-built_in">console</span>.log(sum);
<span class="hljs-keyword">var</span> product = data.reduce(mult,<span class="hljs-number">1</span>);
<span class="hljs-built_in">console</span>.log(product);</code></pre>
<h2 id="articleHeader5">六、指定初始值</h2>
<ul>
<li>JavaScript数组通常不会预置顶。</li>
<li>JavaScript提供一个类似Array.dim这样的方法</li>
</ul>
<blockquote>Array.dim = function(dimension,initial){<br>var a =[], i;<br>for (i=0;i&lt;dimension;i+=1){<br>a[i] = initial;<br>}<br>return a;<br>};<br>var MyArray = Array.dim(10,0);</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入挖掘js之数组

## 原文链接
[https://segmentfault.com/a/1190000014664908](https://segmentfault.com/a/1190000014664908)

