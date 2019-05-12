---
title: 'JavaScript 基础知识 - 入门篇(二)' 
date: 2018-12-23 2:30:06
hidden: true
slug: rr86g6hh7x
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">11. 函数</h2>
<h3 id="articleHeader1">11.1 函数的基础知识</h3>
<p><strong>为什么会有函数？</strong></p>
<blockquote>在写代码的时候，有一些常用的代码需要书写很多次，如果直接复制粘贴的话，会造成大量的代码冗余；<p>函数可以封装一段重复的<code>javascript</code>代码，它只需要声明<code>一次</code>，就可以<code>多次</code>调用；</p>
</blockquote>
<p><strong>冗余代码：</strong></p>
<ul>
<li>冗余：<code>多余的重复或啰嗦内容</code>
</li>
<li>
<p>缺点：</p>
<ul>
<li>代码重复，可阅读性差</li>
<li>不易维护，如果代码逻辑变了，所有地方的代码都要跟着改，效率太低了</li>
</ul>
</li>
</ul>
<h3 id="articleHeader2">11.2 函数的声明与调用</h3>
<p><strong>函数声明的语法：</strong></p>
<blockquote>
<code>var</code> 是用来声明变量的， 函数是用<code>function</code>来声明的，一个函数一般是用来做一件事情的。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function 函数名 (){
    //函数体
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> 函数名 (<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">//函数体</span>
}</code></pre>
<p><em>函数声明的时候，函数体并不会执行，只要当函数被调用的时候才会执行。</em></p>
<p><strong>调用函数的语法：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="函数名();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">函数名();</code></pre>
<p><em>函数体只有在调用的时候才会执行，调用需要<code>()</code>进行调用。可以调用多次</em></p>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 声明函数
function sayHi (){
    // 函数体
    console.log(&quot;Hi!!&quot;);
}
// 调用这个函数
sayHi();  // console.log(&quot;Hi!!&quot;);

// 注意
console.log(sayHi);  // 打印的是整个函数 
// sayHi:指的就是这个函数
// ():指的是调用
// sayHi():这个函数的调用结果" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 声明函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayHi</span> (<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">// 函数体</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"Hi!!"</span>);
}
<span class="hljs-comment">// 调用这个函数</span>
sayHi();  <span class="hljs-comment">// console.log("Hi!!");</span>

<span class="hljs-comment">// 注意</span>
<span class="hljs-built_in">console</span>.log(sayHi);  <span class="hljs-comment">// 打印的是整个函数 </span>
<span class="hljs-comment">// sayHi:指的就是这个函数</span>
<span class="hljs-comment">// ():指的是调用</span>
<span class="hljs-comment">// sayHi():这个函数的调用结果</span></code></pre>
<h3 id="articleHeader3">12.3 声明函数的两种方式</h3>
<p><strong>1、函数声明(命名函数)：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 声明一个函数并且命名了
function 函数名(){
    函数体;
}
函数名();  // 调用函数

/********示例代码***********/
function fn(){
    console.log(&quot;哈哈哈&quot;);
}
fn();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 声明一个函数并且命名了</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> 函数名(<span class="hljs-params"></span>)</span>{
    函数体;
}
函数名();  <span class="hljs-comment">// 调用函数</span>

<span class="hljs-comment">/********示例代码***********/</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"哈哈哈"</span>);
}
fn();</code></pre>
<p><strong>2、函数表达式(匿名函数)：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 必须先声明才能调用
var 函数名 = function(){
    函数体;
}
函数名(); // 调用函数

/********示例代码***********/
var fn = function(){
    console.log(&quot;哈哈哈&quot;);
}
fn();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 必须先声明才能调用</span>
<span class="hljs-keyword">var</span> 函数名 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    函数体;
}
函数名(); <span class="hljs-comment">// 调用函数</span>

<span class="hljs-comment">/********示例代码***********/</span>
<span class="hljs-keyword">var</span> fn = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"哈哈哈"</span>);
}
fn();</code></pre>
<p><strong>这两种函数的区别：</strong></p>
<ul>
<li>命名函数可以先调用，再声明，因为预解析</li>
<li>函数表达式必须先声明，再调用（在<code>DOM</code>中注册事件的时候用的非常的多）</li>
</ul>
<p><strong>匿名函数：</strong></p>
<blockquote>
<code>没有名字</code>的函数，叫做匿名函数。匿名函数没有办法直接用，需要<code>赋值给变量</code>或者<code>自调用</code>
</blockquote>
<p>自调用函数也叫自执行函数，声明和调用一起</p>
<ul>
<li>可以防止变量全局污染</li>
<li>匿名函数自调用示例代码：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(n1,n2){
    console.log(n1);        // 1
    console.log(n2);        // 2
    var name = &quot;张三&quot;
    var age = 18;
    function sayHello() {
      console.log(age);     // 18
      console.log(name);    // &quot;张三&quot;
    }
    sayHello();
})(1,2)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">n1,n2</span>)</span>{
    <span class="hljs-built_in">console</span>.log(n1);        <span class="hljs-comment">// 1</span>
    <span class="hljs-built_in">console</span>.log(n2);        <span class="hljs-comment">// 2</span>
    <span class="hljs-keyword">var</span> name = <span class="hljs-string">"张三"</span>
    <span class="hljs-keyword">var</span> age = <span class="hljs-number">18</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayHello</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(age);     <span class="hljs-comment">// 18</span>
      <span class="hljs-built_in">console</span>.log(name);    <span class="hljs-comment">// "张三"</span>
    }
    sayHello();
})(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>)</code></pre>
<h3 id="articleHeader4">11.4 函数的参数</h3>
<blockquote>
<strong>形式参数</strong>： 在声明一个函数的时候，为了函数的功能更加灵活，有些值是固定不了的，对于这些固定不了的值。我们可以给函数设置参数。这个参数没有具体的值，仅仅起到一个<code>占位置</code>的作用，我们通常称之为形式参数，也叫<code>形参</code>。<p><strong>实际参数</strong>： 如果函数在声明时，设置了行参，那么在函数调用的时候就需要传入对应的参数，我们把传入的参数叫做实际参数，也叫<code>实参</code>。</p>
</blockquote>
<p><strong>语法：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//带参数的函数声明
function 函数名(形参1, 形参2, 形参...){
  //函数体
}

//带参数的函数调用
函数名(实参1, 实参2, 实参3);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//带参数的函数声明</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> 函数名(<span class="hljs-params">形参<span class="hljs-number">1</span>, 形参<span class="hljs-number">2</span>, 形参...</span>)</span>{
  <span class="hljs-comment">//函数体</span>
}

<span class="hljs-comment">//带参数的函数调用</span>
函数名(实参<span class="hljs-number">1</span>, 实参<span class="hljs-number">2</span>, 实参<span class="hljs-number">3</span>);</code></pre>
<p><strong>特点：</strong></p>
<ul>
<li>在函数调用的时候，需要传递对应的参数，把实参的值赋值给形参。</li>
<li>
<code>实参</code>如果<code>多于</code>形参的个数：多传的参数就丢弃了</li>
<li>
<code>实参</code>如果<code>少于</code>形参的个数：没有传的参数，值就是<code>undefined</code>。（容易出问题）</li>
</ul>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 设置两个形参
function getSum(num1,num2){
    console.log(num1+num2);
}
// 调用的时候传两个值进去
getSum(10,20);   // 打印出来就是 30" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 设置两个形参</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getSum</span>(<span class="hljs-params">num1,num2</span>)</span>{
    <span class="hljs-built_in">console</span>.log(num1+num2);
}
<span class="hljs-comment">// 调用的时候传两个值进去</span>
getSum(<span class="hljs-number">10</span>,<span class="hljs-number">20</span>);   <span class="hljs-comment">// 打印出来就是 30</span></code></pre>
<p><strong>计算n1-n2之间所有数的乘积：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getProduct(n1, n2) {
    var product = 1;
    for (var i = n1; i <= n2; i++) {
        product *= i;
    }
    console.log(product);
}
getProduct(1, 5);  // 120
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getProduct</span>(<span class="hljs-params">n1, n2</span>) </span>{
    <span class="hljs-keyword">var</span> product = <span class="hljs-number">1</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = n1; i &lt;= n2; i++) {
        product *= i;
    }
    <span class="hljs-built_in">console</span>.log(product);
}
getProduct(<span class="hljs-number">1</span>, <span class="hljs-number">5</span>);  <span class="hljs-comment">// 120</span>
</code></pre>
<h3 id="articleHeader5">11.5 函数的返回值</h3>
<blockquote>当函数执行完的时候，我们期望函数给我一些反馈（比如计算的结果），这个时候可以让函数返回一些东西。也就是返回值。函数通过<code>return</code>返回一个返回值</blockquote>
<p><strong>返回值语法：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//声明一个带返回值的函数
function 函数名(形参1, 形参2, 形参...){
  //函数体
  return 返回值;
}

//可以通过变量来接收这个返回值
var 变量 = 函数名(实参1, 实参2, 实参3);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//声明一个带返回值的函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> 函数名(<span class="hljs-params">形参<span class="hljs-number">1</span>, 形参<span class="hljs-number">2</span>, 形参...</span>)</span>{
  <span class="hljs-comment">//函数体</span>
  <span class="hljs-keyword">return</span> 返回值;
}

<span class="hljs-comment">//可以通过变量来接收这个返回值</span>
<span class="hljs-keyword">var</span> 变量 = 函数名(实参<span class="hljs-number">1</span>, 实参<span class="hljs-number">2</span>, 实参<span class="hljs-number">3</span>);</code></pre>
<p><em>函数的调用结果就是返回值，因此我们可以直接对函数调用结果进行操作。</em></p>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 计算 n1- n2之间所有数的乘积
function getProduct(n1, n2) {
    var product = 1;
    for (var i = n1; i <= n2; i++) {
        product *= i;
    }
    return product; // 返回计算的值
}
var pro = getProduct(1, 5); // 用变量pro接收一下返回的值
console.log(pro);   // 120" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 计算 n1- n2之间所有数的乘积</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getProduct</span>(<span class="hljs-params">n1, n2</span>) </span>{
    <span class="hljs-keyword">var</span> product = <span class="hljs-number">1</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = n1; i &lt;= n2; i++) {
        product *= i;
    }
    <span class="hljs-keyword">return</span> product; <span class="hljs-comment">// 返回计算的值</span>
}
<span class="hljs-keyword">var</span> pro = getProduct(<span class="hljs-number">1</span>, <span class="hljs-number">5</span>); <span class="hljs-comment">// 用变量pro接收一下返回的值</span>
<span class="hljs-built_in">console</span>.log(pro);   <span class="hljs-comment">// 120</span></code></pre>
<p><strong>注意：</strong></p>
<ul>
<li>函数一碰到<code>return</code>，就代表<code>函数结束</code>了。<code>return</code>后面的代码不会执行了。</li>
<li>函数可以没有返回值， 会在最后面返回一个<code>undefined</code>。</li>
</ul>
<h3 id="articleHeader6">11.6 函数三要素</h3>
<p><strong>函数三要素包括：</strong></p>
<ul>
<li>函数名</li>
<li>参数</li>
<li>返回值</li>
</ul>
<h3 id="articleHeader7">11.7 文档注释</h3>
<blockquote>关于文档注释，javascript中还有一种注释叫做文档注释，经常用在函数<code>声明</code>处，用来解释这个函数的作用。</blockquote>
<p><strong>文档注释：</strong> <code>/**   这是文档注释 */</code></p>
<p><em>以后写的函数的声明，都应该加上文档注释，方便阅读</em></p>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 求圆的面积
 * @param r {number} 圆的半径
 * @returns {number} 圆的面积
 */
function getArea (r) {
    return Math.PI * r * r;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 求圆的面积
 * @param r {number} 圆的半径
 * @returns {number} 圆的面积
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getArea</span> (<span class="hljs-params">r</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.PI * r * r;
}</code></pre>
<h3 id="articleHeader8">11.8 函数综合练习</h3>
<p><strong>1、对任意数组从小到大排序</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 封装一个从小到大冒泡排序的函数
function bubbleSort(arr){
    for(var i = 0; i < arr.length - 1; i++){
        var flag = true;
        for(var j = 0; j < arr.length -1 -i; j++){
            if(arr[j] >arr[j+1]){
                flag =false;
                var temp = arr[j];
                arr[j] = arr[j+1];
                arr[j + 1] = temp;
            }
        }
        if(flag){
            break;
        }
    }
    return arr;
}
console.log(bubbleSort([12, 56, 14, 68, 45, 25, 17, 33]));
console.log(bubbleSort([25, 65, 48, 11, 15, 54, 24, 63]));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 封装一个从小到大冒泡排序的函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bubbleSort</span>(<span class="hljs-params">arr</span>)</span>{
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length - <span class="hljs-number">1</span>; i++){
        <span class="hljs-keyword">var</span> flag = <span class="hljs-literal">true</span>;
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>; j &lt; arr.length <span class="hljs-number">-1</span> -i; j++){
            <span class="hljs-keyword">if</span>(arr[j] &gt;arr[j+<span class="hljs-number">1</span>]){
                flag =<span class="hljs-literal">false</span>;
                <span class="hljs-keyword">var</span> temp = arr[j];
                arr[j] = arr[j+<span class="hljs-number">1</span>];
                arr[j + <span class="hljs-number">1</span>] = temp;
            }
        }
        <span class="hljs-keyword">if</span>(flag){
            <span class="hljs-keyword">break</span>;
        }
    }
    <span class="hljs-keyword">return</span> arr;
}
<span class="hljs-built_in">console</span>.log(bubbleSort([<span class="hljs-number">12</span>, <span class="hljs-number">56</span>, <span class="hljs-number">14</span>, <span class="hljs-number">68</span>, <span class="hljs-number">45</span>, <span class="hljs-number">25</span>, <span class="hljs-number">17</span>, <span class="hljs-number">33</span>]));
<span class="hljs-built_in">console</span>.log(bubbleSort([<span class="hljs-number">25</span>, <span class="hljs-number">65</span>, <span class="hljs-number">48</span>, <span class="hljs-number">11</span>, <span class="hljs-number">15</span>, <span class="hljs-number">54</span>, <span class="hljs-number">24</span>, <span class="hljs-number">63</span>]));</code></pre>
<p><strong>2、求任意数的阶乘(从1到n的积)</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getProduct (n){
    var product = 1; 
    for(var i = 1; i <= n; i++){
       product *= i; 
    }
    return product;
}
console.log(getProduct(5));  // 120
console.log(getProduct(3));  // 6   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getProduct</span> (<span class="hljs-params">n</span>)</span>{
    <span class="hljs-keyword">var</span> product = <span class="hljs-number">1</span>; 
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">1</span>; i &lt;= n; i++){
       product *= i; 
    }
    <span class="hljs-keyword">return</span> product;
}
<span class="hljs-built_in">console</span>.log(getProduct(<span class="hljs-number">5</span>));  <span class="hljs-comment">// 120</span>
<span class="hljs-built_in">console</span>.log(getProduct(<span class="hljs-number">3</span>));  <span class="hljs-comment">// 6   </span></code></pre>
<p><strong>3、求任意数组中的最大值与最小值</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getMaxAndMin(arr) {
    var max = arr[0];
    var min = arr[0];
    for (var i = 0; i < arr.length; i++) {
        if (max < arr[i]) {
            max = arr[i];
        }
        if (min > arr[i]) {
            min = arr[i];
        }
    }
    return [max, min]; // 返回一个数组
}
console.log(getMaxAndMin([11, 45, 59, 12, 8, 36, 14, 25]));  // [59 8]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getMaxAndMin</span>(<span class="hljs-params">arr</span>) </span>{
    <span class="hljs-keyword">var</span> max = arr[<span class="hljs-number">0</span>];
    <span class="hljs-keyword">var</span> min = arr[<span class="hljs-number">0</span>];
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {
        <span class="hljs-keyword">if</span> (max &lt; arr[i]) {
            max = arr[i];
        }
        <span class="hljs-keyword">if</span> (min &gt; arr[i]) {
            min = arr[i];
        }
    }
    <span class="hljs-keyword">return</span> [max, min]; <span class="hljs-comment">// 返回一个数组</span>
}
<span class="hljs-built_in">console</span>.log(getMaxAndMin([<span class="hljs-number">11</span>, <span class="hljs-number">45</span>, <span class="hljs-number">59</span>, <span class="hljs-number">12</span>, <span class="hljs-number">8</span>, <span class="hljs-number">36</span>, <span class="hljs-number">14</span>, <span class="hljs-number">25</span>]));  <span class="hljs-comment">// [59 8]</span></code></pre>
<h3 id="articleHeader9">11.9 函数的作用域</h3>
<blockquote>在函数中，只有<code>全局作用域</code>和<code>函数作用域</code>，因为在<code>if</code>、<code>while</code>、<code>for</code>等语句中定义的变量都是全局变量。</blockquote>
<p><strong>全局变量：</strong> 在<code>最外层</code>声明的变量就是全局变量，全局变量在<code>任何地方都能访问</code>的到。</p>
<p><strong>局部变量：</strong> 在<code>函数中</code>声明的变量，就是局部变量，局部变量只有在<code>当前函数体</code>内能够访问。</p>
<p><strong>隐式全局变量：</strong> 没有使用<code>var</code>定义的变量也是全局变量。</p>
<p><strong>作用域：</strong> 变量可以发挥作用的区域</p>
<p><strong>全局作用域：</strong> 在<code>script</code>标签内，<code>函数外</code>定义的作用域就是全局作用域。在全局作用域中定义的变量都是全局变量。</p>
<p><strong>函数作用域：</strong> 在<code>函数中</code>的区域叫做函数作用域，在函数作用域中定义的变量就是局部变量，只能在当前函数内访问。</p>
<h3 id="articleHeader10">11.10 预解析</h3>
<blockquote>js解析器执行js代码的时候，分为两个过程：<code>预解析过程</code>和<code>代码执行过程</code>
</blockquote>
<p><strong>预解析过程：</strong></p>
<ul>
<li>把变量的声明提升到当前作用域的最前面，只会提升声明，不会提升赋值。</li>
<li>把函数的声明提升到当前作用域的最前面，只会提升声明，不会提升调用。</li>
<li>先提升<code>var</code>，再提升<code>function</code>
</li>
</ul>
<p><strong>预解析例题：</strong></p>
<p>第一题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(a);    // 打印a这个函数整体
var a = 1;
function a(){
console.log(&quot;呵呵&quot;);
}
console.log(a);    // 1

// 预解析后为
/**
var a;
function a(){
    console.log(&quot;呵呵&quot;);
}
console.log(a);    // 打印a这个函数整体
a = 1;
console.log(a);    // 1
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(a);    <span class="hljs-comment">// 打印a这个函数整体</span>
<span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span>(<span class="hljs-params"></span>)</span>{
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"呵呵"</span>);
}
<span class="hljs-built_in">console</span>.log(a);    <span class="hljs-comment">// 1</span>

<span class="hljs-comment">// 预解析后为</span>
<span class="hljs-comment">/**
var a;
function a(){
    console.log("呵呵");
}
console.log(a);    // 打印a这个函数整体
a = 1;
console.log(a);    // 1
*/</span></code></pre>
<p>第二题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var num = 10;
fn1();
function fn1() {
    //在函数调用的时候，这个函数也会做预解析操作。
    console.log(num);   // undefined
    var num = 20;
    console.log(num);   // 20
}
console.log(num);       // 10


// 预解析后为
/**
var num ;
function fn1() {
    var num;
    console.log(num);   // undefined
    num = 20;
    console.log(num);   // 20
}
num = 10;
fn1();
console.log(num);       // 10
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> num = <span class="hljs-number">10</span>;
fn1();
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn1</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//在函数调用的时候，这个函数也会做预解析操作。</span>
    <span class="hljs-built_in">console</span>.log(num);   <span class="hljs-comment">// undefined</span>
    <span class="hljs-keyword">var</span> num = <span class="hljs-number">20</span>;
    <span class="hljs-built_in">console</span>.log(num);   <span class="hljs-comment">// 20</span>
}
<span class="hljs-built_in">console</span>.log(num);       <span class="hljs-comment">// 10</span>


<span class="hljs-comment">// 预解析后为</span>
<span class="hljs-comment">/**
var num ;
function fn1() {
    var num;
    console.log(num);   // undefined
    num = 20;
    console.log(num);   // 20
}
num = 10;
fn1();
console.log(num);       // 10
*/</span></code></pre>
<p>第三题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a = 18;
var b = 30;
fn();
function fn() {
    var b = 9;
    console.log(a); // undefined
    console.log(b); // 9
    var a = 20;
}


// 预解析后为
/**
var a;
var b;
function fn() {
    var b;
    b = 9;
    var a;
    console.log(a);     // 自己作用域里有的就不要出去找
    console.log(b);     // 9
    a = 20;
}
a = 18;
b = 30;
fn();
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> a = <span class="hljs-number">18</span>;
<span class="hljs-keyword">var</span> b = <span class="hljs-number">30</span>;
fn();
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> b = <span class="hljs-number">9</span>;
    <span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// undefined</span>
    <span class="hljs-built_in">console</span>.log(b); <span class="hljs-comment">// 9</span>
    <span class="hljs-keyword">var</span> a = <span class="hljs-number">20</span>;
}


<span class="hljs-comment">// 预解析后为</span>
<span class="hljs-comment">/**
var a;
var b;
function fn() {
    var b;
    b = 9;
    var a;
    console.log(a);     // 自己作用域里有的就不要出去找
    console.log(b);     // 9
    a = 20;
}
a = 18;
b = 30;
fn();
*/</span></code></pre>
<p>第四题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fn();
var b = 10;
console.log(c); // 9
console.log(b); // 10
console.log(a); // 报错

function fn() {
    var a = 9;
    b = 9;
    c = 9;
    console.log(a); // 9
    console.log(b); // 9 
    console.log(c); // 9
}


// 预解析之后
/**
var b;
function fn() {
    var a;
    a = 9;
    b = 9;
    c = 9;
    console.log(a); // 9
    console.log(b); // 9
    console.log(c); // 9
}
fn();
b = 10;
console.log(c); // 9
console.log(b); // 10
console.log(a); // 报错
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">fn();
<span class="hljs-keyword">var</span> b = <span class="hljs-number">10</span>;
<span class="hljs-built_in">console</span>.log(c); <span class="hljs-comment">// 9</span>
<span class="hljs-built_in">console</span>.log(b); <span class="hljs-comment">// 10</span>
<span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// 报错</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> a = <span class="hljs-number">9</span>;
    b = <span class="hljs-number">9</span>;
    c = <span class="hljs-number">9</span>;
    <span class="hljs-built_in">console</span>.log(a); <span class="hljs-comment">// 9</span>
    <span class="hljs-built_in">console</span>.log(b); <span class="hljs-comment">// 9 </span>
    <span class="hljs-built_in">console</span>.log(c); <span class="hljs-comment">// 9</span>
}


<span class="hljs-comment">// 预解析之后</span>
<span class="hljs-comment">/**
var b;
function fn() {
    var a;
    a = 9;
    b = 9;
    c = 9;
    console.log(a); // 9
    console.log(b); // 9
    console.log(c); // 9
}
fn();
b = 10;
console.log(c); // 9
console.log(b); // 10
console.log(a); // 报错
*/</span></code></pre>
<p>第五题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fn() { 
    console.log(num1);  // undefined
    console.log(num2);  // undefined
    console.log(num3);  // 30
    var num1 = 10;
    var num2 = 20;
    num3 = 40;
    console.log(num1);  // 10
    console.log(num2);  // 20
    console.log(num3);  // 40
}
var num1 = 20;
var num3 = 30;
fn();
console.log(num1);      // 20
console.log(num3);      // 40
console.log(num2);      // 报错


// 预解析之后
/**
var num1;
var num3;

function fn() {
    var num1;
    var num2;
    console.log(num1); // undefined
    console.log(num2); // undefined
    console.log(num3); // 30
    num1 = 10;
    num2 = 20;
    num3 = 40;
    console.log(num1); // 10
    console.log(num2); // 20
    console.log(num3); // 40
}
num1 = 20;
num3 = 30;
fn();
console.log(num1); // 20
console.log(num3); // 40
console.log(num2); // 报错
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>) </span>{ 
    <span class="hljs-built_in">console</span>.log(num1);  <span class="hljs-comment">// undefined</span>
    <span class="hljs-built_in">console</span>.log(num2);  <span class="hljs-comment">// undefined</span>
    <span class="hljs-built_in">console</span>.log(num3);  <span class="hljs-comment">// 30</span>
    <span class="hljs-keyword">var</span> num1 = <span class="hljs-number">10</span>;
    <span class="hljs-keyword">var</span> num2 = <span class="hljs-number">20</span>;
    num3 = <span class="hljs-number">40</span>;
    <span class="hljs-built_in">console</span>.log(num1);  <span class="hljs-comment">// 10</span>
    <span class="hljs-built_in">console</span>.log(num2);  <span class="hljs-comment">// 20</span>
    <span class="hljs-built_in">console</span>.log(num3);  <span class="hljs-comment">// 40</span>
}
<span class="hljs-keyword">var</span> num1 = <span class="hljs-number">20</span>;
<span class="hljs-keyword">var</span> num3 = <span class="hljs-number">30</span>;
fn();
<span class="hljs-built_in">console</span>.log(num1);      <span class="hljs-comment">// 20</span>
<span class="hljs-built_in">console</span>.log(num3);      <span class="hljs-comment">// 40</span>
<span class="hljs-built_in">console</span>.log(num2);      <span class="hljs-comment">// 报错</span>


<span class="hljs-comment">// 预解析之后</span>
<span class="hljs-comment">/**
var num1;
var num3;

function fn() {
    var num1;
    var num2;
    console.log(num1); // undefined
    console.log(num2); // undefined
    console.log(num3); // 30
    num1 = 10;
    num2 = 20;
    num3 = 40;
    console.log(num1); // 10
    console.log(num2); // 20
    console.log(num3); // 40
}
num1 = 20;
num3 = 30;
fn();
console.log(num1); // 20
console.log(num3); // 40
console.log(num2); // 报错
*/</span></code></pre>
<h3 id="articleHeader11">11.11 递归函数</h3>
<blockquote>函数直接或者间接调用自己，必须要留<code>出口</code>，不然就调死了</blockquote>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 用递归求1-100的和
/* 
    之前封装过一个getSum的函数比如getSum(100)，就是求的1-100的和
    现在我们可以这样理解：
    1-100的和我们可以看做是 100 + getSum(99)
    getSum(99) 可以看成 99 + getSum(98)。。。
    依次这样推下去，但是要注意，到getSum(1)的时候,要留出口，否则会一直死循环下去
 */
function getSum(n) {
    if (n == 1) {       // 一定要留出口
        return 1;
    }
    return n + getSum(n - 1);
}
console.log(getSum(100));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 用递归求1-100的和</span>
<span class="hljs-comment">/* 
    之前封装过一个getSum的函数比如getSum(100)，就是求的1-100的和
    现在我们可以这样理解：
    1-100的和我们可以看做是 100 + getSum(99)
    getSum(99) 可以看成 99 + getSum(98)。。。
    依次这样推下去，但是要注意，到getSum(1)的时候,要留出口，否则会一直死循环下去
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getSum</span>(<span class="hljs-params">n</span>) </span>{
    <span class="hljs-keyword">if</span> (n == <span class="hljs-number">1</span>) {       <span class="hljs-comment">// 一定要留出口</span>
        <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
    }
    <span class="hljs-keyword">return</span> n + getSum(n - <span class="hljs-number">1</span>);
}
<span class="hljs-built_in">console</span>.log(getSum(<span class="hljs-number">100</span>));</code></pre>
<h3 id="articleHeader12">11.12 回调函数</h3>
<blockquote>回调函数：把函数当成参数来使用，那么这个函数就叫回调函数。函数也是一种数据类型</blockquote>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
思考，之前封装了一个bubbleSort排序的函数，但是只能排元素是数字的数组
现在想要判断字符串的长度，或者对象的属性的时候就很麻烦，就需要重新写一个函数
比如字符串长度，就需要是arr[j].length - arr[i+1].length
*/
function bubbleSort(arr, fn) {
    for (var i = 0; i < arr.length; i++) {
        var flag = true;
        for (var j = 0; j < arr.length - 1 - i; j++) {
        
            // 传一个函数进来，并且将arr[j], arr[j + 1]作为两个参数传进去
            if (fn(arr[j], arr[j + 1]) > 0) {
                flag = false;
                var temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
        if (flag) {
            break;
        }
    }
}
// 纯数字数组
var arr = [4, 3, 1, 6, 22, 21, 41, 4];
// 调用的时候，我们需要将fn函数的两个参数也传进去
// 这种把一个函数作为参数传进另一个函数的方式就叫回调函数
bubbleSort(arr, function(a, b) { // a b 就相当于 arr[j] 和 arr[j+1]
    return a - b;
    // 如果是 return b - a 就相当于，上面的 arr[j+1] - arr[j]>0 那么就是从大到小排序 
});
console.log(arr);

// 封装后的排序函数也可以直接根据字符串的长度进行排序了
var arrStr = [&quot;aaa&quot;, &quot;bb&quot;, &quot;cccc&quot;, &quot;d&quot;];
bubbleSort(arrStr, function(a, b) {
    // 因为传进去的是一个函数，arr[j] 和 arr[j+1]是以两个参数的形式传进去的
    // 当数组元素是字符串的时候，就可以进行.length操作了
    return a.length - b.length;
});
console.log(arrStr);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/*
思考，之前封装了一个bubbleSort排序的函数，但是只能排元素是数字的数组
现在想要判断字符串的长度，或者对象的属性的时候就很麻烦，就需要重新写一个函数
比如字符串长度，就需要是arr[j].length - arr[i+1].length
*/</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bubbleSort</span>(<span class="hljs-params">arr, fn</span>) </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {
        <span class="hljs-keyword">var</span> flag = <span class="hljs-literal">true</span>;
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> j = <span class="hljs-number">0</span>; j &lt; arr.length - <span class="hljs-number">1</span> - i; j++) {
        
            <span class="hljs-comment">// 传一个函数进来，并且将arr[j], arr[j + 1]作为两个参数传进去</span>
            <span class="hljs-keyword">if</span> (fn(arr[j], arr[j + <span class="hljs-number">1</span>]) &gt; <span class="hljs-number">0</span>) {
                flag = <span class="hljs-literal">false</span>;
                <span class="hljs-keyword">var</span> temp = arr[j];
                arr[j] = arr[j + <span class="hljs-number">1</span>];
                arr[j + <span class="hljs-number">1</span>] = temp;
            }
        }
        <span class="hljs-keyword">if</span> (flag) {
            <span class="hljs-keyword">break</span>;
        }
    }
}
<span class="hljs-comment">// 纯数字数组</span>
<span class="hljs-keyword">var</span> arr = [<span class="hljs-number">4</span>, <span class="hljs-number">3</span>, <span class="hljs-number">1</span>, <span class="hljs-number">6</span>, <span class="hljs-number">22</span>, <span class="hljs-number">21</span>, <span class="hljs-number">41</span>, <span class="hljs-number">4</span>];
<span class="hljs-comment">// 调用的时候，我们需要将fn函数的两个参数也传进去</span>
<span class="hljs-comment">// 这种把一个函数作为参数传进另一个函数的方式就叫回调函数</span>
bubbleSort(arr, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b</span>) </span>{ <span class="hljs-comment">// a b 就相当于 arr[j] 和 arr[j+1]</span>
    <span class="hljs-keyword">return</span> a - b;
    <span class="hljs-comment">// 如果是 return b - a 就相当于，上面的 arr[j+1] - arr[j]&gt;0 那么就是从大到小排序 </span>
});
<span class="hljs-built_in">console</span>.log(arr);

<span class="hljs-comment">// 封装后的排序函数也可以直接根据字符串的长度进行排序了</span>
<span class="hljs-keyword">var</span> arrStr = [<span class="hljs-string">"aaa"</span>, <span class="hljs-string">"bb"</span>, <span class="hljs-string">"cccc"</span>, <span class="hljs-string">"d"</span>];
bubbleSort(arrStr, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b</span>) </span>{
    <span class="hljs-comment">// 因为传进去的是一个函数，arr[j] 和 arr[j+1]是以两个参数的形式传进去的</span>
    <span class="hljs-comment">// 当数组元素是字符串的时候，就可以进行.length操作了</span>
    <span class="hljs-keyword">return</span> a.length - b.length;
});
<span class="hljs-built_in">console</span>.log(arrStr);</code></pre>
<h2 id="articleHeader13">12. 对象</h2>
<h3 id="articleHeader14">12.1 对象的基本概念</h3>
<blockquote>无序的键值对集合</blockquote>
<p><strong>为什么要有对象？</strong></p>
<blockquote>在<code>javascript</code>中：对象跟数组、函数一样，都是一种复杂数据类型，是一系列相关的属性的集合，可以很方便对变量和函数进行管理。</blockquote>
<p><strong>什么是对象？</strong></p>
<blockquote>现实生活中: 万物皆对象，对象是一个<code>具体的事物</code>，一个具体的事物就会有<code>行为</code>和<code>特征</code>。<p>javascript: <code>javascript</code>中的对象其实就是生活中对象的一个<code>抽象</code>。</p>
</blockquote>
<ul>
<li>事物的<code>特征</code>在对象中用<code>属性</code>来表示。</li>
<li>事物的<code>行为</code>在对象中用<code>方法</code>来表示。</li>
<li>对象中的方法，其实就是对象里面的函数。</li>
</ul>
<p><strong>举个例子：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="特征：名字、性别、年龄、身高、体重、爱好、星座、血型    (属性)
行为：罚钱、吃肉、打招呼                             (方法: 对象里面的函数)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gcode"><code>特征：名字、性别、年龄、身高、体重、爱好、星座、血型    <span class="hljs-comment">(属性)</span>
行为：罚钱、吃肉、打招呼                             <span class="hljs-comment">(方法: 对象里面的函数)</span></code></pre>
<h3 id="articleHeader15">12.2 创建对象</h3>
<h4>12.2.1 通过构造函数创建</h4>
<blockquote>通过<code>var 对象名 = new Object();</code>的方式创建一个对象，通过对象名<code>.</code>的语法，给这个对象添加<code>属性</code>；通过<code>通对象名.方法名 = function(){} </code>给这个对象加上一个<code>方法</code>。</blockquote>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 创建一个英雄对象，并且给他加上属性和方法
var hero = new Object(); // 创建一个空的英雄对象

// 通过&quot;.&quot;语法给这个hero加上一些属性
hero.name = &quot;盖伦&quot;;         // 给对象添加了一个name的属性
hero.skill = &quot;正义审判&quot;;    // 给对象添加一个技能属性

// 通过 对象名.方法名 = function(){} 给hero加上一个方法
hero.attack = function() {
  console.log(&quot;盖伦攻击了小怪物&quot;);
}
attack();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 创建一个英雄对象，并且给他加上属性和方法</span>
<span class="hljs-keyword">var</span> hero = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>(); <span class="hljs-comment">// 创建一个空的英雄对象</span>

<span class="hljs-comment">// 通过"."语法给这个hero加上一些属性</span>
hero.name = <span class="hljs-string">"盖伦"</span>;         <span class="hljs-comment">// 给对象添加了一个name的属性</span>
hero.skill = <span class="hljs-string">"正义审判"</span>;    <span class="hljs-comment">// 给对象添加一个技能属性</span>

<span class="hljs-comment">// 通过 对象名.方法名 = function(){} 给hero加上一个方法</span>
hero.attack = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"盖伦攻击了小怪物"</span>);
}
attack();</code></pre>
<h4>12.2.2 通过对象字面量</h4>
<blockquote>通过<code>var 对象名 = {}</code>的方式创建一个对象，通过<code>键值对</code>的方式，给这个对象加上属性和方法。<p>字面量：<code>11</code> <code>"abc"</code> <code>true</code> <code>[]</code> <code>{}</code>等   <code>{}</code>就相当于 <code>new Object();</code></p>
</blockquote>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 创建一个英雄对象，并且给他加上属性和方法
var hero = {
    name  : &quot;盖伦&quot;,          // 键值对的形式给hero加上属性
    skill : &quot;正义审判&quot;,
    
    attcck : function(){    // 键值对的形式给hero加上方法
        console.log(&quot;盖伦攻击了小怪物&quot;);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 创建一个英雄对象，并且给他加上属性和方法</span>
<span class="hljs-keyword">var</span> hero = {
    <span class="hljs-attr">name</span>  : <span class="hljs-string">"盖伦"</span>,          <span class="hljs-comment">// 键值对的形式给hero加上属性</span>
    skill : <span class="hljs-string">"正义审判"</span>,
    
    <span class="hljs-attr">attcck</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{    <span class="hljs-comment">// 键值对的形式给hero加上方法</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"盖伦攻击了小怪物"</span>);
    }
}</code></pre>
<p><strong>注意</strong>： 键值对之间用<code>,</code>号隔开</p>
<h4>12.2.3 关于 this</h4>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var hero = {
    name  : &quot;盖伦&quot;, 
    skill : &quot;正义审判&quot;,
    
    attcck : function(){    
        // 这里的this指向的是当前的对象，表示当前对象下的skill属性，如果直接写skill 是报错的
        console.log(&quot;盖伦使用了&quot;+this.skill+&quot;攻击了敌人&quot;);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> hero = {
    <span class="hljs-attr">name</span>  : <span class="hljs-string">"盖伦"</span>, 
    <span class="hljs-attr">skill</span> : <span class="hljs-string">"正义审判"</span>,
    
    <span class="hljs-attr">attcck</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{    
        <span class="hljs-comment">// 这里的this指向的是当前的对象，表示当前对象下的skill属性，如果直接写skill 是报错的</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"盖伦使用了"</span>+<span class="hljs-keyword">this</span>.skill+<span class="hljs-string">"攻击了敌人"</span>);
    }
}</code></pre>
<p><strong>注意：</strong></p>
<ul>
<li>
<code>this</code>一定要出现在方法中才有意义，不在方法中的<code>this</code>没有意义。</li>
<li>在方法中出现的<code>this</code>，指的是<code>当前对象</code>，即调用这个方法的对象</li>
</ul>
<h3 id="articleHeader16">12.3 操作对象的属性</h3>
<blockquote>操作对象的属性分为<code>存值</code>和<code>取值</code>
</blockquote>
<h4>12.3.1 "." 语法</h4>
<p><strong>存值：</strong></p>
<blockquote><code>对象名.属性名 = "值";</code></blockquote>
<p><strong>存值-示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
    age:18,
    name:&quot;盖伦&quot;
};

// 存值
obj.hobby = &quot;K人&quot;;
obj.age = 20;
console.log(obj); // {age:20,name:&quot;盖伦&quot;,hobby:&quot;K人&quot;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">age</span>:<span class="hljs-number">18</span>,
    <span class="hljs-attr">name</span>:<span class="hljs-string">"盖伦"</span>
};

<span class="hljs-comment">// 存值</span>
obj.hobby = <span class="hljs-string">"K人"</span>;
obj.age = <span class="hljs-number">20</span>;
<span class="hljs-built_in">console</span>.log(obj); <span class="hljs-comment">// {age:20,name:"盖伦",hobby:"K人"}</span></code></pre>
<p><strong>存值-注意：</strong></p>
<ul>
<li>如果对象原来就<code>有</code>这个属性，会<code>覆盖</code>原来的值。</li>
<li>如果对象<code>没有</code>这个属性，就会<code>新增加</code>这个属性。(属性在对象中是独一无二的)</li>
</ul>
<p><strong>取值：</strong></p>
<blockquote><code>对象名.属性名</code></blockquote>
<p><strong>取值-示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
    age:18,
    name:&quot;盖伦&quot;
};

// 取值
console.log(obj.age);  // 18
console.log(obj.name); // &quot;盖伦&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">age</span>:<span class="hljs-number">18</span>,
    <span class="hljs-attr">name</span>:<span class="hljs-string">"盖伦"</span>
};

<span class="hljs-comment">// 取值</span>
<span class="hljs-built_in">console</span>.log(obj.age);  <span class="hljs-comment">// 18</span>
<span class="hljs-built_in">console</span>.log(obj.name); <span class="hljs-comment">// "盖伦"</span></code></pre>
<p><strong>取值-注意：</strong></p>
<ul>
<li>如果对象<code>有</code>这个属性，就会返回对应的值</li>
<li>如果对象<code>没有</code>这个属性，就会返回<code>undefined</code>。</li>
</ul>
<h4>12.3.2 "[]"语法</h4>
<blockquote>关联数组的语法,把对象当成数组来看待</blockquote>
<p><strong>存值：</strong></p>
<blockquote>
<code>对象名[属性名(下标)] = "值";</code> 数组的下标是数字，对象的下标是<code>字符串</code>
</blockquote>
<p><strong>存值-示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
    age:18,
    name:&quot;盖伦&quot;
};

// 存值
obj[&quot;hobby&quot;] = &quot;K人&quot;;
obj[&quot;age&quot;] = 20;
console.log(obj); // {age:20,name:&quot;盖伦&quot;,hobby:&quot;K人&quot;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">age</span>:<span class="hljs-number">18</span>,
    <span class="hljs-attr">name</span>:<span class="hljs-string">"盖伦"</span>
};

<span class="hljs-comment">// 存值</span>
obj[<span class="hljs-string">"hobby"</span>] = <span class="hljs-string">"K人"</span>;
obj[<span class="hljs-string">"age"</span>] = <span class="hljs-number">20</span>;
<span class="hljs-built_in">console</span>.log(obj); <span class="hljs-comment">// {age:20,name:"盖伦",hobby:"K人"}</span></code></pre>
<p><strong>取值：</strong></p>
<blockquote><code>对象名[属性名(下标)]</code></blockquote>
<p><strong>取值-示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
    age:18,
    name:&quot;盖伦&quot;
};

// 取值
console.log(obj[&quot;age&quot;]);  // 18
console.log(obj[&quot;name&quot;]]); // &quot;盖伦&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">age</span>:<span class="hljs-number">18</span>,
    <span class="hljs-attr">name</span>:<span class="hljs-string">"盖伦"</span>
};

<span class="hljs-comment">// 取值</span>
<span class="hljs-built_in">console</span>.log(obj[<span class="hljs-string">"age"</span>]);  <span class="hljs-comment">// 18</span>
<span class="hljs-built_in">console</span>.log(obj[<span class="hljs-string">"name"</span>]]); <span class="hljs-comment">// "盖伦"</span></code></pre>
<p><strong>注意：</strong> <code>[]</code>语法是将对象当数组看，数组的下标是<code>数字</code>，对象的下标是<code>字符串</code>，取值的时候一定要注意</p>
<h4>12.3.3 两种方法的区别</h4>
<blockquote>当属性名是一个字符串存储在变量中的时候，只能使用<code>关联数组</code>的方式。</blockquote>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
    age:18,
    name:&quot;盖伦&quot;
};
var temp = &quot;age&quot;;
console.log(obj[temp]); // 打印 18 ==> obj[&quot;age&quot;]
console.log(obj.temp);  //  点语法就不行，undefined 点语法会去对象中找temp的属性" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">age</span>:<span class="hljs-number">18</span>,
    <span class="hljs-attr">name</span>:<span class="hljs-string">"盖伦"</span>
};
<span class="hljs-keyword">var</span> temp = <span class="hljs-string">"age"</span>;
<span class="hljs-built_in">console</span>.log(obj[temp]); <span class="hljs-comment">// 打印 18 ==&gt; obj["age"]</span>
<span class="hljs-built_in">console</span>.log(obj.temp);  <span class="hljs-comment">//  点语法就不行，undefined 点语法会去对象中找temp的属性</span></code></pre>
<p><em>大部分情况，都用<code>.</code>语法，比较简单，如果属性的名字存在一个变量中，只能用<code>[]</code>语法</em></p>
<h3 id="articleHeader17">12.4 遍历对象</h3>
<blockquote>通过<code>for..in</code>语法可以遍历一个对象：for(var <code>键</code> in <code>对象</code>)</blockquote>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var hero = {
    name : &quot;盖伦&quot;,
    skill: &quot;正义审判&quot;,

    attcck: function() {
        console.log(&quot;盖伦使用了&quot; + this.skill + &quot;攻击了敌人&quot;);
    }
}

for(var key in hero){      // key表示的是对象的属性名
    console.log(key);      // 遍历了所有的属性名
    console.log(obj[key]); // 遍历所有的值
    
    console.log(obj.key);  // undefined 这样写是错的，找的是obj的key属性
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> hero = {
    <span class="hljs-attr">name</span> : <span class="hljs-string">"盖伦"</span>,
    <span class="hljs-attr">skill</span>: <span class="hljs-string">"正义审判"</span>,

    <span class="hljs-attr">attcck</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"盖伦使用了"</span> + <span class="hljs-keyword">this</span>.skill + <span class="hljs-string">"攻击了敌人"</span>);
    }
}

<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> hero){      <span class="hljs-comment">// key表示的是对象的属性名</span>
    <span class="hljs-built_in">console</span>.log(key);      <span class="hljs-comment">// 遍历了所有的属性名</span>
    <span class="hljs-built_in">console</span>.log(obj[key]); <span class="hljs-comment">// 遍历所有的值</span>
    
    <span class="hljs-built_in">console</span>.log(obj.key);  <span class="hljs-comment">// undefined 这样写是错的，找的是obj的key属性</span>
}</code></pre>
<p><strong>遍历对象案例：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var datas = [
    {name:&quot;露娜&quot;, age:18, score:100, gender:&quot;男&quot;},
    {name:&quot;妲己&quot;, age:1000, score:101, gender:&quot;女&quot;},
    {name:&quot;甄姬&quot;, age:888, score:102, gender:&quot;女&quot;},
    {name:&quot;大乔&quot;, age:21, score:103, gender:&quot;女&quot;},
    {name:&quot;小乔&quot;, age:22, score:104, gender:&quot;女&quot;}
];

document.write(&quot;<table>&quot;);
for (var i = 0; i < datas.length; i++) {
    document.write(&quot;<tr>&quot;);
    var data = datas[i];
    for (var key in data) {
        document.write(&quot;<td>&quot;);
        document.write(data[key]);
        document.write(&quot;</td>&quot;);
    }
    document.write(&quot;</tr>&quot;);
}
document.write(&quot;</table>&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> datas = [
    {<span class="hljs-attr">name</span>:<span class="hljs-string">"露娜"</span>, <span class="hljs-attr">age</span>:<span class="hljs-number">18</span>, <span class="hljs-attr">score</span>:<span class="hljs-number">100</span>, <span class="hljs-attr">gender</span>:<span class="hljs-string">"男"</span>},
    {<span class="hljs-attr">name</span>:<span class="hljs-string">"妲己"</span>, <span class="hljs-attr">age</span>:<span class="hljs-number">1000</span>, <span class="hljs-attr">score</span>:<span class="hljs-number">101</span>, <span class="hljs-attr">gender</span>:<span class="hljs-string">"女"</span>},
    {<span class="hljs-attr">name</span>:<span class="hljs-string">"甄姬"</span>, <span class="hljs-attr">age</span>:<span class="hljs-number">888</span>, <span class="hljs-attr">score</span>:<span class="hljs-number">102</span>, <span class="hljs-attr">gender</span>:<span class="hljs-string">"女"</span>},
    {<span class="hljs-attr">name</span>:<span class="hljs-string">"大乔"</span>, <span class="hljs-attr">age</span>:<span class="hljs-number">21</span>, <span class="hljs-attr">score</span>:<span class="hljs-number">103</span>, <span class="hljs-attr">gender</span>:<span class="hljs-string">"女"</span>},
    {<span class="hljs-attr">name</span>:<span class="hljs-string">"小乔"</span>, <span class="hljs-attr">age</span>:<span class="hljs-number">22</span>, <span class="hljs-attr">score</span>:<span class="hljs-number">104</span>, <span class="hljs-attr">gender</span>:<span class="hljs-string">"女"</span>}
];

<span class="hljs-built_in">document</span>.write(<span class="hljs-string">"&lt;table&gt;"</span>);
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; datas.length; i++) {
    <span class="hljs-built_in">document</span>.write(<span class="hljs-string">"&lt;tr&gt;"</span>);
    <span class="hljs-keyword">var</span> data = datas[i];
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> data) {
        <span class="hljs-built_in">document</span>.write(<span class="hljs-string">"&lt;td&gt;"</span>);
        <span class="hljs-built_in">document</span>.write(data[key]);
        <span class="hljs-built_in">document</span>.write(<span class="hljs-string">"&lt;/td&gt;"</span>);
    }
    <span class="hljs-built_in">document</span>.write(<span class="hljs-string">"&lt;/tr&gt;"</span>);
}
<span class="hljs-built_in">document</span>.write(<span class="hljs-string">"&lt;/table&gt;"</span>);</code></pre>
<p><strong>效果图：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012344592" src="https://static.alili.tech/img/remote/1460000012344592" alt="效果" title="效果" style="cursor: pointer; display: inline;"></span></p>
<p><strong>注意</strong>：遍历的时候<code>for</code>后面是键(属性名)，<code>in</code>后面是对象</p>
<p><strong>判断一个对象中是否有某一属性：</strong></p>
<blockquote>
<code>in</code>关键字可以查看对象是否拥有某个属性。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
    name:&quot;zs&quot;,
    age:18,
    score:100
}
//in关键字可以查看对象是否拥有某个属性。
console.log( &quot;sex&quot; in obj );  // false
console.log( &quot;name&quot; in obj ); // true
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">name</span>:<span class="hljs-string">"zs"</span>,
    <span class="hljs-attr">age</span>:<span class="hljs-number">18</span>,
    <span class="hljs-attr">score</span>:<span class="hljs-number">100</span>
}
<span class="hljs-comment">//in关键字可以查看对象是否拥有某个属性。</span>
<span class="hljs-built_in">console</span>.log( <span class="hljs-string">"sex"</span> <span class="hljs-keyword">in</span> obj );  <span class="hljs-comment">// false</span>
<span class="hljs-built_in">console</span>.log( <span class="hljs-string">"name"</span> <span class="hljs-keyword">in</span> obj ); <span class="hljs-comment">// true</span>
</code></pre>
<h3 id="articleHeader18">12.5 查看对象的类型</h3>
<p><strong>1、typeof 查看对象类型</strong></p>
<blockquote>所有的复杂类型，使用<code>typeof</code>关键字的话，都是<code>object</code>
</blockquote>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = new Array();
console.log(typeof arr);     // Object

var obj = new Object();
console.log(typeof obj);     // Object

var student = new Object();
console.log(typeof student); // Object

function fn(){
    
}
console.log(typeof student); // Function" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>();
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> arr);     <span class="hljs-comment">// Object</span>

<span class="hljs-keyword">var</span> obj = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> obj);     <span class="hljs-comment">// Object</span>

<span class="hljs-keyword">var</span> student = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> student); <span class="hljs-comment">// Object</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>)</span>{
    
}
<span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">typeof</span> student); <span class="hljs-comment">// Function</span></code></pre>
<p><strong>注意：</strong></p>
<ul>
<li>
<code>typeof</code>只能区分出来是复杂类型，并不能区分出具体类型</li>
<li>函数比较特殊，在js里面的地位比较高，<code>typeof</code>可以查看到它的类型</li>
</ul>
<p><strong>2、instanceof 查看对象类型</strong></p>
<blockquote>
<code>instance</code>: 实例 这种方法也不能直接获得对象的具体类型</blockquote>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = new Array();
console.log(arr instanceof Array);   // true 说明arr的实例是Array" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>();
<span class="hljs-built_in">console</span>.log(arr <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Array</span>);   <span class="hljs-comment">// true 说明arr的实例是Array</span></code></pre>
<p><em>这种方法还是比较麻烦，看下面这种方法</em></p>
<p><strong>3、.constructor.name 查看对象类型</strong></p>
<blockquote>借助于js原型里的<code>constructor</code>关键字，可以直接获取到对象的具体类型</blockquote>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = new Array();
console.log(arr.constructor.name);   // Array

var obj = new Object();
console.log(obj.constructor.name);   // Object" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Array</span>();
<span class="hljs-built_in">console</span>.log(arr.constructor.name);   <span class="hljs-comment">// Array</span>

<span class="hljs-keyword">var</span> obj = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();
<span class="hljs-built_in">console</span>.log(obj.constructor.name);   <span class="hljs-comment">// Object</span></code></pre>
<h3 id="articleHeader19">12.6 批量创建对象</h3>
<p><strong>1、使用普通函数批量创建对象</strong></p>
<blockquote>将创建对象封装在一个函数里，需要批量创建对象的时候，只需调用这个函数即可</blockquote>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 封装
function createObj(name,age,gender){
    var heros = new Object();
    student.name = name;
    student.age  = age;
    student.gender = gender;
    student.sayHello = function () {
        console.log(&quot;大家好,我是&quot;+this.name);
    }
    return heros;
}

// 调用
var stu1 = createObj(&quot;露娜&quot;,15,&quot;女&quot;);
console.log(stu1);  // 打印这个对象
stu1.sayHello();    // &quot;大家好我是露娜&quot;


var stu2 = createObj(&quot;小乔&quot;,800,&quot;女&quot;);
console.log(stu2);  // 打印这个对象
stu2.sayHello();    // &quot;大家好我是小乔&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 封装</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createObj</span>(<span class="hljs-params">name,age,gender</span>)</span>{
    <span class="hljs-keyword">var</span> heros = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Object</span>();
    student.name = name;
    student.age  = age;
    student.gender = gender;
    student.sayHello = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"大家好,我是"</span>+<span class="hljs-keyword">this</span>.name);
    }
    <span class="hljs-keyword">return</span> heros;
}

<span class="hljs-comment">// 调用</span>
<span class="hljs-keyword">var</span> stu1 = createObj(<span class="hljs-string">"露娜"</span>,<span class="hljs-number">15</span>,<span class="hljs-string">"女"</span>);
<span class="hljs-built_in">console</span>.log(stu1);  <span class="hljs-comment">// 打印这个对象</span>
stu1.sayHello();    <span class="hljs-comment">// "大家好我是露娜"</span>


<span class="hljs-keyword">var</span> stu2 = createObj(<span class="hljs-string">"小乔"</span>,<span class="hljs-number">800</span>,<span class="hljs-string">"女"</span>);
<span class="hljs-built_in">console</span>.log(stu2);  <span class="hljs-comment">// 打印这个对象</span>
stu2.sayHello();    <span class="hljs-comment">// "大家好我是小乔"</span></code></pre>
<p><strong>优点</strong>：可以同时创建多个对象<br><strong>缺点</strong>：创建出来的没有具体的类型，都是<code>object</code>类型的</p>
<p><strong>2、构造函数批量创建对象</strong></p>
<blockquote>构造函数 ，是一种特殊的函数。主要用来在创建对象时初始化对象(给对象加属性和方法)，即为对象成员变量赋初始值，总与<code>new</code>运算符一起使用在创建对象的语句中。<p>一般创建一个对象的时候直接<code>new object</code>出来的没有具体的类型，都是<code>object</code>类型的，要想分类的更清楚就需要用到构造函数创建对象</p>
<p>首字母需要大写，通常是名词，表示一类对象。</p>
</blockquote>
<p><strong>语法：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 首字母需要大写，通常是名词，表示一类对象。
function Teacher(){
    // 函数体
}
var cjk = new Teacher();            // 如果没有new, cjk就是一个普通的函数
console.log(cjk.constructor.name);  // 输出的对象类型为 Teacher" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 首字母需要大写，通常是名词，表示一类对象。</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Teacher</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">// 函数体</span>
}
<span class="hljs-keyword">var</span> cjk = <span class="hljs-keyword">new</span> Teacher();            <span class="hljs-comment">// 如果没有new, cjk就是一个普通的函数</span>
<span class="hljs-built_in">console</span>.log(cjk.constructor.name);  <span class="hljs-comment">// 输出的对象类型为 Teacher</span></code></pre>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 构造函数 this指向new出来的新对象
function Teacher(name, age){
    this.name = name;
    this.age = age;
    this.sayHello = function () {
        console.log(&quot;大家好，我是&quot;+this.name+&quot;，今天晚上我给大家唱首歌&quot;);
    }
}

// new 创建了一个空对象 类型为Teacher
var cjk = new Teacher(&quot;苍井空&quot;, 18);
console.log(cjk);   // 对象的类型为Teacher {name:&quot;苍井空&quot;,age:18}

var bdyjy = new Teacher(&quot;波多野结衣&quot;, 19);
console.log(bdyjy); //  对象的类型为Teacher {name:&quot;波多野结衣&quot;,age:19,sayHello:function(){"}}"
bdyjy.sayHello();   //  大家好，我是波多野结衣，今天晚上我给大家唱首歌" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 构造函数 this指向new出来的新对象</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Teacher</span>(<span class="hljs-params">name, age</span>)</span>{
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.age = age;
    <span class="hljs-keyword">this</span>.sayHello = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"大家好，我是"</span>+<span class="hljs-keyword">this</span>.name+<span class="hljs-string">"，今天晚上我给大家唱首歌"</span>);
    }
}

<span class="hljs-comment">// new 创建了一个空对象 类型为Teacher</span>
<span class="hljs-keyword">var</span> cjk = <span class="hljs-keyword">new</span> Teacher(<span class="hljs-string">"苍井空"</span>, <span class="hljs-number">18</span>);
<span class="hljs-built_in">console</span>.log(cjk);   <span class="hljs-comment">// 对象的类型为Teacher {name:"苍井空",age:18}</span>

<span class="hljs-keyword">var</span> bdyjy = <span class="hljs-keyword">new</span> Teacher(<span class="hljs-string">"波多野结衣"</span>, <span class="hljs-number">19</span>);
<span class="hljs-built_in">console</span>.log(bdyjy); <span class="hljs-comment">//  对象的类型为Teacher {name:"波多野结衣",age:19,sayHello:function(){"}}"</span>
bdyjy.sayHello();   <span class="hljs-comment">//  大家好，我是波多野结衣，今天晚上我给大家唱首歌</span></code></pre>
<p><strong>new做了四件事情：</strong></p>
<ul>
<li>
<code>new</code> 会创建一个空的对象，并且对象的类型是<code>new </code>后面跟的名字;</li>
<li>让函数内部的<code>this</code>指向这个空对象，操作<code>this</code>就相当于操作了这个对象;</li>
<li>执行构造函数</li>
<li>返回这个对象</li>
</ul>
<p><strong>优点：</strong></p>
<ul>
<li>创建出来的对象，类型是可变的</li>
<li>写法更加简洁</li>
</ul>
<p><strong>案例-批量创建一个英雄对象：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//属性：名字、性别、技能、口号、等级、金钱
//行为：打怪兽

function Hero(name, gender, skill, slogan, level, money){
//给this加属性和方法
    this.name = name;
    this.gender =gender;
    this.skill = skill;
    this.slogan = slogan;
    this.level = level;
    this.money = money;
    
    this.attack = function (n) {
      console.log(this.name + &quot;使用了&quot; + this.skill + &quot;攻击了&quot; + n);
    }
}

var atm = new Hero(&quot;奥特曼&quot;, &quot;不详&quot;, &quot;激光&quot;, &quot;呵呵&quot;, 100, 0);
console.log(atm);      // 返回了一个Hero类型的对象
atm.attack(&quot;小怪兽&quot;);  // 奥特曼使用了激光攻击了小怪兽

var dm = new Hero(&quot;盖伦&quot;, &quot;男&quot;, &quot;大宝剑&quot;, &quot;人在塔在&quot;, 18, 3150);
console.log(dm);       // 返回了一个Hero类型的对象
dm.attack(&quot;防御塔&quot;);   // 盖伦使用了大宝剑攻击了防御塔" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//属性：名字、性别、技能、口号、等级、金钱</span>
<span class="hljs-comment">//行为：打怪兽</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Hero</span>(<span class="hljs-params">name, gender, skill, slogan, level, money</span>)</span>{
<span class="hljs-comment">//给this加属性和方法</span>
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.gender =gender;
    <span class="hljs-keyword">this</span>.skill = skill;
    <span class="hljs-keyword">this</span>.slogan = slogan;
    <span class="hljs-keyword">this</span>.level = level;
    <span class="hljs-keyword">this</span>.money = money;
    
    <span class="hljs-keyword">this</span>.attack = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">n</span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name + <span class="hljs-string">"使用了"</span> + <span class="hljs-keyword">this</span>.skill + <span class="hljs-string">"攻击了"</span> + n);
    }
}

<span class="hljs-keyword">var</span> atm = <span class="hljs-keyword">new</span> Hero(<span class="hljs-string">"奥特曼"</span>, <span class="hljs-string">"不详"</span>, <span class="hljs-string">"激光"</span>, <span class="hljs-string">"呵呵"</span>, <span class="hljs-number">100</span>, <span class="hljs-number">0</span>);
<span class="hljs-built_in">console</span>.log(atm);      <span class="hljs-comment">// 返回了一个Hero类型的对象</span>
atm.attack(<span class="hljs-string">"小怪兽"</span>);  <span class="hljs-comment">// 奥特曼使用了激光攻击了小怪兽</span>

<span class="hljs-keyword">var</span> dm = <span class="hljs-keyword">new</span> Hero(<span class="hljs-string">"盖伦"</span>, <span class="hljs-string">"男"</span>, <span class="hljs-string">"大宝剑"</span>, <span class="hljs-string">"人在塔在"</span>, <span class="hljs-number">18</span>, <span class="hljs-number">3150</span>);
<span class="hljs-built_in">console</span>.log(dm);       <span class="hljs-comment">// 返回了一个Hero类型的对象</span>
dm.attack(<span class="hljs-string">"防御塔"</span>);   <span class="hljs-comment">// 盖伦使用了大宝剑攻击了防御塔</span></code></pre>
<h3 id="articleHeader20">12.7 值类型与引用类型</h3>
<p><strong>1、值类型(简单数据类型)</strong></p>
<blockquote>值类型 : 又叫简单数据类型，例如：<code>number</code>、<code>string</code>、<code>boolean</code>、<code>undefined</code>、<code>null</code><p>变量储存数据的时候，存储的直接就是这个值本身</p>
</blockquote>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var num = 12;
var num1 = num;
num1 = 20;
console.log(num);   // 12
console.log(num1);  // 20" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> num = <span class="hljs-number">12</span>;
<span class="hljs-keyword">var</span> num1 = num;
num1 = <span class="hljs-number">20</span>;
<span class="hljs-built_in">console</span>.log(num);   <span class="hljs-comment">// 12</span>
<span class="hljs-built_in">console</span>.log(num1);  <span class="hljs-comment">// 20</span></code></pre>
<p><strong>2、引用类型(复杂数据类型)</strong></p>
<blockquote>引用类型 ：又叫复杂数据类型，例如：<code>Object</code>、<code>Function</code>、<code>Array</code>和<code>自定义</code>类型</blockquote>
<p><em>变量在储存数据的时候，不会直接存储这对象，存储的是这个对象的<code>地址</code></em></p>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {             // 在内存中存储了一个地址
    name: &quot;凹凸曼&quot;,
    age: 100
}
    
var obj1 = obj;     // 把这个地址赋值给了obj1，obj1就有了obj的所有属性
obj1.name = &quot;奥特曼&quot;;   // 因为obj1 和 obj 用的是同一个地址，所以当obj1的属性值改变的时候，obj也会改变
console.log(obj.name);  // &quot;奥特曼&quot;
console.log(obj1.name); // &quot;奥特曼&quot;    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> obj = {             <span class="hljs-comment">// 在内存中存储了一个地址</span>
    name: <span class="hljs-string">"凹凸曼"</span>,
    <span class="hljs-attr">age</span>: <span class="hljs-number">100</span>
}
    
<span class="hljs-keyword">var</span> obj1 = obj;     <span class="hljs-comment">// 把这个地址赋值给了obj1，obj1就有了obj的所有属性</span>
obj1.name = <span class="hljs-string">"奥特曼"</span>;   <span class="hljs-comment">// 因为obj1 和 obj 用的是同一个地址，所以当obj1的属性值改变的时候，obj也会改变</span>
<span class="hljs-built_in">console</span>.log(obj.name);  <span class="hljs-comment">// "奥特曼"</span>
<span class="hljs-built_in">console</span>.log(obj1.name); <span class="hljs-comment">// "奥特曼"    </span></code></pre>
<p><strong>引用类型详解：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//复杂类型变量不会存这个对象，只会存这个对象的地址。
var hero = {
    name: &quot;大黄蜂&quot;,
    age: 100,
    car: {
        name: &quot;科迈罗&quot;,
        price: 400000
    },
    brothers: [&quot;擎天柱&quot;, &quot;铁皮&quot;, &quot;救护车&quot;]
};

console.log(hero.car.name);     // &quot;科迈罗&quot;
console.log(hero.brothers[0]);  // &quot;擎天柱&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//复杂类型变量不会存这个对象，只会存这个对象的地址。</span>
<span class="hljs-keyword">var</span> hero = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">"大黄蜂"</span>,
    <span class="hljs-attr">age</span>: <span class="hljs-number">100</span>,
    <span class="hljs-attr">car</span>: {
        <span class="hljs-attr">name</span>: <span class="hljs-string">"科迈罗"</span>,
        <span class="hljs-attr">price</span>: <span class="hljs-number">400000</span>
    },
    <span class="hljs-attr">brothers</span>: [<span class="hljs-string">"擎天柱"</span>, <span class="hljs-string">"铁皮"</span>, <span class="hljs-string">"救护车"</span>]
};

<span class="hljs-built_in">console</span>.log(hero.car.name);     <span class="hljs-comment">// "科迈罗"</span>
<span class="hljs-built_in">console</span>.log(hero.brothers[<span class="hljs-number">0</span>]);  <span class="hljs-comment">// "擎天柱"</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012344593" src="https://static.alili.tech/img/remote/1460000012344593" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>面试题(一)：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var num1 = 55;
var num2 = 66;
function f1(num, num1) {
    num = 100;
    num1 = 100;
    num2 = 100;
    console.log(num);   //100
    console.log(num1);  //100
    console.log(num2);  //100
}

f1(num1, num2);
console.log(num1);      //55
console.log(num2);      //100
console.log(num);       //报错" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> num1 = <span class="hljs-number">55</span>;
<span class="hljs-keyword">var</span> num2 = <span class="hljs-number">66</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f1</span>(<span class="hljs-params">num, num1</span>) </span>{
    num = <span class="hljs-number">100</span>;
    num1 = <span class="hljs-number">100</span>;
    num2 = <span class="hljs-number">100</span>;
    <span class="hljs-built_in">console</span>.log(num);   <span class="hljs-comment">//100</span>
    <span class="hljs-built_in">console</span>.log(num1);  <span class="hljs-comment">//100</span>
    <span class="hljs-built_in">console</span>.log(num2);  <span class="hljs-comment">//100</span>
}

f1(num1, num2);
<span class="hljs-built_in">console</span>.log(num1);      <span class="hljs-comment">//55</span>
<span class="hljs-built_in">console</span>.log(num2);      <span class="hljs-comment">//100</span>
<span class="hljs-built_in">console</span>.log(num);       <span class="hljs-comment">//报错</span></code></pre>
<p><strong>面试题(二)：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(name, age) {
    this.name = name;
    this.age = age;
}
var p1 = new Person(&quot;zs&quot;, 18);
var p2 = p1;

p2 = new Person(&quot;ls&quot;, 20);

p2.name = &quot;ww&quot;;

console.log(p1.name); // zs
console.log(p2.name); // ww" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params">name, age</span>) </span>{
    <span class="hljs-keyword">this</span>.name = name;
    <span class="hljs-keyword">this</span>.age = age;
}
<span class="hljs-keyword">var</span> p1 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"zs"</span>, <span class="hljs-number">18</span>);
<span class="hljs-keyword">var</span> p2 = p1;

p2 = <span class="hljs-keyword">new</span> Person(<span class="hljs-string">"ls"</span>, <span class="hljs-number">20</span>);

p2.name = <span class="hljs-string">"ww"</span>;

<span class="hljs-built_in">console</span>.log(p1.name); <span class="hljs-comment">// zs</span>
<span class="hljs-built_in">console</span>.log(p2.name); <span class="hljs-comment">// ww</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012344594" src="https://static.alili.tech/img/remote/1460000012344594" alt="image" title="image" style="cursor: pointer;"></span></p>
<p><strong>3、栈内存与堆内存</strong></p>
<blockquote>栈内存: 空间比较小，但运算速度非常的快<p>堆内存：空间非常大，但运算速度相对而言比较慢</p>
</blockquote>
<h3 id="articleHeader21">12.8 基本包装类型</h3>
<blockquote>简单类型有没有属性和方法？<code>JS</code>为了我们操作方便，内置了对应的复杂类型(<code>String</code>、<code>Number</code>、<code>Boolean</code>)</blockquote>
<p><em>我们使用简单类型的时候，可以直接使用复杂类型的属性和方法。(<code>js</code>会自动帮我们把简单类型转换成复杂类型。用完之后，又自动的给我们转成了简单类型)</em></p>
<p><strong>简单类型：</strong> <code>number</code>  <code>string</code>  <code>boolean</code>  <code>undefined</code> <code>null</code></p>
<p><strong>复杂类型：</strong> <code>Object</code> <code>Function</code> <code>Array</code> <code>String</code>  <code>Number</code>  <code>Boolean</code></p>
<p><strong>基本包装类型：</strong></p>
<ul>
<li>对于<code>string</code> <code>number</code> <code>boolean</code>基本类型来说，可以直接使用属性和方法。</li>
<li>自动把简单类型转换成对应的复杂类型</li>
<li>调用复杂类型的属性或者方法得到结果</li>
<li>自动的把复杂类型转换成简单类型</li>
</ul>
<h3 id="articleHeader22">12.9 伪数组(类数组)</h3>
<blockquote>不是数组，是对象， 叫伪数组（可以跟数组一样的使用下标，也可以遍历）</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj = {
    0:&quot;呵呵&quot;,
    1:&quot;哈哈&quot;,
    2:&quot;嘻嘻&quot;,
    3:&quot;嘿嘿嘿&quot;,
    4:&quot;呜呜&quot;,
    length:5
}

for(var k in obj){
    console.log(obj[k]);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> obj = {
    <span class="hljs-number">0</span>:<span class="hljs-string">"呵呵"</span>,
    <span class="hljs-number">1</span>:<span class="hljs-string">"哈哈"</span>,
    <span class="hljs-number">2</span>:<span class="hljs-string">"嘻嘻"</span>,
    <span class="hljs-number">3</span>:<span class="hljs-string">"嘿嘿嘿"</span>,
    <span class="hljs-number">4</span>:<span class="hljs-string">"呜呜"</span>,
    <span class="hljs-attr">length</span>:<span class="hljs-number">5</span>
}

<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> k <span class="hljs-keyword">in</span> obj){
    <span class="hljs-built_in">console</span>.log(obj[k]);
}</code></pre>
<h3 id="articleHeader23">12.10 arguments 对象</h3>
<blockquote>JavaScript中，<code>arguments</code>对象是比较特别的一个对象，实际上是当前函数的一个内置属性。也就是说所有函数都内置了一个<code>arguments</code>对象，<code>arguments</code>对象中存储了传递的所有的实参。<code>arguments</code>是一个<code>伪数组</code>，因此及可以进行<code>遍历</code>
</blockquote>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Math.max 的原理是什么？
// 不知道形参个数的时候，怎么判别一个最大值或者最小值呢？
// arguments对象中 存储的是所有的实参 是以一个伪数组的形式存在的
function max(){
    var m = arguments[0];
    // 所以不管你传多少参数进来，arguments就储存多少参数
    for(var i = 0; i < arguments.length; i++) {
        if(m < arguments[i]){
            m = arguments[i];
        }
    }
    return m;
  }
}
console.log(max(1, 2, -1));     // 2
console.log(max(1, 2, 4, 10));  // 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Math.max 的原理是什么？</span>
<span class="hljs-comment">// 不知道形参个数的时候，怎么判别一个最大值或者最小值呢？</span>
<span class="hljs-comment">// arguments对象中 存储的是所有的实参 是以一个伪数组的形式存在的</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">max</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> m = <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>];
    <span class="hljs-comment">// 所以不管你传多少参数进来，arguments就储存多少参数</span>
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-built_in">arguments</span>.length; i++) {
        <span class="hljs-keyword">if</span>(m &lt; <span class="hljs-built_in">arguments</span>[i]){
            m = <span class="hljs-built_in">arguments</span>[i];
        }
    }
    <span class="hljs-keyword">return</span> m;
  }
}
<span class="hljs-built_in">console</span>.log(max(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">-1</span>));     <span class="hljs-comment">// 2</span>
<span class="hljs-built_in">console</span>.log(max(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">4</span>, <span class="hljs-number">10</span>));  <span class="hljs-comment">// 10</span></code></pre>
<h3 id="articleHeader24">12.11 JSON 对象</h3>
<blockquote>
<code>JSON</code>(<code>JavaScript Object Notation</code>)是一种轻量级的数据交换格式，采用完全独立于语言的文本格式，是理想的数据交换格式。同时，<code>JSON</code>是 <code>JavaScript</code>原生格式，这意味着在<code>JavaScript</code>中处理<code>JSON</code>数据跟处理对象是一样的。</blockquote>
<p><em><code>JSON</code>的属性必须用双引号引起来，对象字面量可以省略</em></p>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// js里面，属性名可以用双引号引起来，也可以不引起来。
var obj = {
    name:&quot;张三&quot;,
    age:18
}

// JSON属性名必须用双引号引起来
var json = {
    &quot;name&quot;:&quot;张三&quot;,
    &quot;age&quot;:18
 }


//json是js对象    js对象不一定是json
console.log(json.name);     // &quot;张三&quot;
console.log(json[&quot;name&quot;]);  // &quot;张三&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// js里面，属性名可以用双引号引起来，也可以不引起来。</span>
<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">name</span>:<span class="hljs-string">"张三"</span>,
    <span class="hljs-attr">age</span>:<span class="hljs-number">18</span>
}

<span class="hljs-comment">// JSON属性名必须用双引号引起来</span>
<span class="hljs-keyword">var</span> json = {
    <span class="hljs-string">"name"</span>:<span class="hljs-string">"张三"</span>,
    <span class="hljs-string">"age"</span>:<span class="hljs-number">18</span>
 }


<span class="hljs-comment">//json是js对象    js对象不一定是json</span>
<span class="hljs-built_in">console</span>.log(json.name);     <span class="hljs-comment">// "张三"</span>
<span class="hljs-built_in">console</span>.log(json[<span class="hljs-string">"name"</span>]);  <span class="hljs-comment">// "张三"</span></code></pre>
<p><strong>json对象的两个方法：</strong></p>
<ul>
<li>对象转换为<code>JSON</code>格式使用：<code>JSON.stringify</code>；</li>
<li>
<code>JSON</code>装换为对象格式：<code>JSONparse()</code>；</li>
</ul>
<h2 id="articleHeader25">13. 内置对象</h2>
<blockquote>JS内置对象就是指<code>Javascript</code>自带的一些对象，供开发者使用，这些对象提供了一些常用的的功能。</blockquote>
<p><em>常见的内置对象有<code>Math</code>、<code>String</code>、<code>Array</code>、<code>Date</code>等</em></p>
<h3 id="articleHeader26">13.1 Math 对象</h3>
<blockquote>
<code>Math</code>对象中封装很多与数学相关的属性和方法。<code>Math</code>对象比较特殊，不需要<code>new</code>。</blockquote>
<p><strong>1、属性 PI</strong></p>
<blockquote>
<code>Math.PI</code> 表示的就是圆周率，通常计算圆的周长或者面积的时候会用到。也可以用作表示角度、弧度(<code>π= 180°</code>)</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(Math.PI);  // 3.141592653589793" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.PI);  <span class="hljs-comment">// 3.141592653589793</span></code></pre>
<p><strong>2、最大值/最小值</strong></p>
<blockquote>
<code>Math.max(x,y)</code> 表示求出两者之间的最大值</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(Math.max(10,99)); // 返回99" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.max(<span class="hljs-number">10</span>,<span class="hljs-number">99</span>)); <span class="hljs-comment">// 返回99</span></code></pre>
<blockquote>
<code>Math.min(x,y)</code> 表示求出两者之间的最小值</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(Math.min(10,99)); // 返回10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.min(<span class="hljs-number">10</span>,<span class="hljs-number">99</span>)); <span class="hljs-comment">// 返回10</span></code></pre>
<p><strong>3、取整</strong></p>
<blockquote>
<code>Math.ceil() </code>天花板函数(向上取整)</blockquote>
<ul>
<li>
<code>整数</code>向上取整还是<code>整数</code>；</li>
<li>
<code>正小数</code>向上取整，整数部分<code>加1</code>，小数部分<code>舍去</code>；</li>
<li>
<code>负小数</code>向上取整，整数部分<code>不变</code>，小数部分<code>舍去</code>；</li>
</ul>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(Math.ceil(2));    // 2
console.log(Math.ceil(1.2));  // 2
console.log(Math.ceil(1.8));  // 2
console.log(Math.ceil(-1.2)); // -1
console.log(Math.ceil(-1.8)); // -1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.ceil(<span class="hljs-number">2</span>));    <span class="hljs-comment">// 2</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.ceil(<span class="hljs-number">1.2</span>));  <span class="hljs-comment">// 2</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.ceil(<span class="hljs-number">1.8</span>));  <span class="hljs-comment">// 2</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.ceil(<span class="hljs-number">-1.2</span>)); <span class="hljs-comment">// -1</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.ceil(<span class="hljs-number">-1.8</span>)); <span class="hljs-comment">// -1</span></code></pre>
<blockquote>
<code>Math.floor() </code>地板函数(向下取整)</blockquote>
<ul>
<li>
<code>整数</code>向下取整还是<code>整数</code>；</li>
<li>
<code>正小数</code>向下取整，整数部分<code>不变</code>，小数部分<code>舍去</code>；</li>
<li>
<code>负小数</code>向下取整，整数部分<code>减1</code>，小数部分<code>舍去</code>；</li>
</ul>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(Math.floor(2));    // 2
console.log(Math.floor(1.2));  // 1
console.log(Math.floor(1.8));  // 1
console.log(Math.floor(-1.2)); // -2
console.log(Math.floor(-1.8)); // -2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.floor(<span class="hljs-number">2</span>));    <span class="hljs-comment">// 2</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.floor(<span class="hljs-number">1.2</span>));  <span class="hljs-comment">// 1</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.floor(<span class="hljs-number">1.8</span>));  <span class="hljs-comment">// 1</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.floor(<span class="hljs-number">-1.2</span>)); <span class="hljs-comment">// -2</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.floor(<span class="hljs-number">-1.8</span>)); <span class="hljs-comment">// -2</span></code></pre>
<blockquote>
<code>Math.round()</code> 四舍五入(如果是.5，则取更大的那个数)</blockquote>
<ul>
<li>
<code>正小数</code>四舍五入，对小数点后面一位数进行判断，<code>大于等于5</code>整数部分<code>加1</code>，小数舍去;<code>小于5</code>,整数部分<code>不变</code>，小数部分<code>舍去</code>
</li>
<li>
<p><code>负小数</code>四舍五入，对小数点后面一位进数行判断：</p>
<ul>
<li>
<code>小于5</code>的时候，小数<code>舍去</code>，整数部分<code>不变</code>；</li>
<li>
<code>大于5</code>的时候，小数<code>舍去</code>，整数部分<code>减 1</code>；</li>
<li>
<code>等于5</code>的时候要<code>再判断</code>，如果<code>后面没有数</code>了，小数<code>舍去</code>，整数部分<code>不变</code>；如果<code>后面还有数</code>，小数<code>舍去</code>，整数部分<code>减 1</code>；</li>
</ul>
</li>
</ul>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(Math.round(1.2));    // 1
console.log(Math.round(1.5));    // 2
console.log(Math.round(1.56));   // 2
console.log(Math.round(1.6));    // 2

console.log(Math.round(-0.3));   // 0
console.log(Math.round(-0.6));   // -1
console.log(Math.round(-1.5));   // -1
console.log(Math.round(-1.6));   // -2
console.log(Math.round(-1.56));  // -2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.round(<span class="hljs-number">1.2</span>));    <span class="hljs-comment">// 1</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.round(<span class="hljs-number">1.5</span>));    <span class="hljs-comment">// 2</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.round(<span class="hljs-number">1.56</span>));   <span class="hljs-comment">// 2</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.round(<span class="hljs-number">1.6</span>));    <span class="hljs-comment">// 2</span>

<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.round(<span class="hljs-number">-0.3</span>));   <span class="hljs-comment">// 0</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.round(<span class="hljs-number">-0.6</span>));   <span class="hljs-comment">// -1</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.round(<span class="hljs-number">-1.5</span>));   <span class="hljs-comment">// -1</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.round(<span class="hljs-number">-1.6</span>));   <span class="hljs-comment">// -2</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.round(<span class="hljs-number">-1.56</span>));  <span class="hljs-comment">// -2</span></code></pre>
<p><strong>4、随机数</strong></p>
<blockquote>
<code>Math.random()</code> 返回一个<code>[0,1)</code>之间的数，能取到<code>0</code>，取不到<code>1</code>
</blockquote>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 获得0-5的随机数，包括0-5
// parseInt：取整
console.log(parseInt(Math.random() * 6)); // 因为随机数 能取到0，取不到1，要想返回5 就需要乘以6 


// 获得3-5之间的随机数
// 3-5？可以先取到随机数0-2，然后再加3 获得的就是3-5
console.log(parseInt(Math.random() * 3) + 3);  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 获得0-5的随机数，包括0-5</span>
<span class="hljs-comment">// parseInt：取整</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">parseInt</span>(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">6</span>)); <span class="hljs-comment">// 因为随机数 能取到0，取不到1，要想返回5 就需要乘以6 </span>


<span class="hljs-comment">// 获得3-5之间的随机数</span>
<span class="hljs-comment">// 3-5？可以先取到随机数0-2，然后再加3 获得的就是3-5</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">parseInt</span>(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">3</span>) + <span class="hljs-number">3</span>);  </code></pre>
<p><strong>5、绝对值</strong></p>
<blockquote>
<code>Math.abs()</code> 对一个数进行绝对值操作,纯数字字符串也可以转换</blockquote>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(Math.abs(-11));   // 11
console.log(Math.abs(11));    // 11
console.log(Math.abs(&quot;-11&quot;)); // 11
console.log(Math.abs(&quot;aaa&quot;)); // NaN" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.abs(<span class="hljs-number">-11</span>));   <span class="hljs-comment">// 11</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.abs(<span class="hljs-number">11</span>));    <span class="hljs-comment">// 11</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.abs(<span class="hljs-string">"-11"</span>)); <span class="hljs-comment">// 11</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.abs(<span class="hljs-string">"aaa"</span>)); <span class="hljs-comment">// NaN</span></code></pre>
<p><strong>6、次幂和开平方</strong></p>
<blockquote>
<code>Math.pow(num, power)</code> 求 num 的 power 的次方</blockquote>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(Math.pow(2,4));   // 2的4次方 16" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.pow(<span class="hljs-number">2</span>,<span class="hljs-number">4</span>));   <span class="hljs-comment">// 2的4次方 16</span></code></pre>
<blockquote>
<code>Math.sqrt(num)</code> 为 num 开平方根</blockquote>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(Math.sqrt(9));   // 为9开平方根  3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">Math</span>.sqrt(<span class="hljs-number">9</span>));   <span class="hljs-comment">// 为9开平方根  3</span></code></pre>
<h3 id="articleHeader27">13.2 Date对象</h3>
<blockquote>
<code>Data</code> 对象是用来处理日期和时间的</blockquote>
<h4>13.2.1 创建一个日期对象</h4>
<blockquote>使用构造函数创建一个当前时间对象 <code>var date = new Date();</code>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var date = new Date();
console.log(date); // Fri Nov 17 2017 11:59:19 GMT+0800 (中国标准时间)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> date = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
<span class="hljs-built_in">console</span>.log(date); <span class="hljs-comment">// Fri Nov 17 2017 11:59:19 GMT+0800 (中国标准时间)</span></code></pre>
<blockquote>创建一个指定时间的日期对象 <code>var date = new Date(指定时间);</code>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var date = new Date(&quot;2017-03-22&quot;);          //创建一个指定时间的日期对象 Wed Mar 22 2017 08:00:00 GMT+0800 (中国标准时间)
var date = new Date(&quot;2017-03-22 00:52:34&quot;); //创建一个指定时间的日期对象 Wed Mar 22 2017 00:52:34 GMT+0800 (中国标准时间)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> date = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-string">"2017-03-22"</span>);          <span class="hljs-comment">//创建一个指定时间的日期对象 Wed Mar 22 2017 08:00:00 GMT+0800 (中国标准时间)</span>
<span class="hljs-keyword">var</span> date = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-string">"2017-03-22 00:52:34"</span>); <span class="hljs-comment">//创建一个指定时间的日期对象 Wed Mar 22 2017 00:52:34 GMT+0800 (中国标准时间)</span></code></pre>
<h4>13.2.2 日期格式化</h4>
<blockquote>日期格式化，一般用到的不多，通过格式化可以获得当前日期的日期部分或者时间部分</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var date = new Date();
date.toString();            // 默认的日期格式
date.toLocalString();       // 本地风格的日期格式(存在兼容性)
date.toDateString();        // 获得当前日期时间的，日期部分 Fri Nov 17 2017
date.toLocalDateString();   // 本地风格的日期部分(存在兼容性)
date.toTimeString();        // 获得当前日期时间的，时间部分 13:23:42 GMT+0800 (中国标准时间)
date.toLocalTimeString();   // 本地风格的时间部分(存在兼容性)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> date = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
date.toString();            <span class="hljs-comment">// 默认的日期格式</span>
date.toLocalString();       <span class="hljs-comment">// 本地风格的日期格式(存在兼容性)</span>
date.toDateString();        <span class="hljs-comment">// 获得当前日期时间的，日期部分 Fri Nov 17 2017</span>
date.toLocalDateString();   <span class="hljs-comment">// 本地风格的日期部分(存在兼容性)</span>
date.toTimeString();        <span class="hljs-comment">// 获得当前日期时间的，时间部分 13:23:42 GMT+0800 (中国标准时间)</span>
date.toLocalTimeString();   <span class="hljs-comment">// 本地风格的时间部分(存在兼容性)</span></code></pre>
<h4>13.2.3 获取日期的指定部分</h4>
<ul>
<li>
<code>getMilliseconds();</code> 获取毫秒值</li>
<li>
<code>getSeconds();</code> 获取秒</li>
<li>
<code>getMinutes();</code> 获取分钟</li>
<li>
<code>getHours();</code> 获取小时</li>
<li>
<code>getDay();</code> 获取星期，<code>0-6</code>   <code>0</code>：星期天</li>
<li>
<code>getDate();</code> 获取日，即当月的第几天</li>
<li>
<code>getMonth();</code> 返回月份，注意从<code>0</code>开始计算，这个地方坑爹，<code>0-11</code>
</li>
<li>
<code>getFullYear();</code> 返回<code>4</code>位的年份  如 <code>2016</code>
</li>
</ul>
<p><strong>示例代码：封装一个格式 xxxx-xx-xx xx:xx:xx 的日期函数</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var date = new Date();
var year = date.getFullYear();     // 获取当前时间的年份

var month = date.getMonth() + 1;   // 获取当前时间的月份，注意月份是从0开始的0-11，所以加1
addZore(month);                    // 获得的月份有可能是一位数，此时需要给他再拼接一位

var d = date.getDate();            // 获得当前时间的日期天数
addZore(d);

var h = date.getHours();           // 获取当前时间的小时
addZore(h);

var m = date.getMinutes();         // 获取当前时间的分钟
addZore(m);

var s = date.getSeconds();         // 获取当前时间的秒
addZore(s);

function addZore(n) {
    return n > 10 ? n : &quot;0&quot; + n;   // 判断获取到的数字大于10的时候 返回本身，小于的时候需要拼串
}

var dateStr = year + &quot;-&quot; + month + &quot;-&quot; + d + &quot; &quot; + h + &quot;:&quot; + m + &quot;:&quot; + s;
console.log(dateStr); // 2017-11-17 13:58:53" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> date = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
<span class="hljs-keyword">var</span> year = date.getFullYear();     <span class="hljs-comment">// 获取当前时间的年份</span>

<span class="hljs-keyword">var</span> month = date.getMonth() + <span class="hljs-number">1</span>;   <span class="hljs-comment">// 获取当前时间的月份，注意月份是从0开始的0-11，所以加1</span>
addZore(month);                    <span class="hljs-comment">// 获得的月份有可能是一位数，此时需要给他再拼接一位</span>

<span class="hljs-keyword">var</span> d = date.getDate();            <span class="hljs-comment">// 获得当前时间的日期天数</span>
addZore(d);

<span class="hljs-keyword">var</span> h = date.getHours();           <span class="hljs-comment">// 获取当前时间的小时</span>
addZore(h);

<span class="hljs-keyword">var</span> m = date.getMinutes();         <span class="hljs-comment">// 获取当前时间的分钟</span>
addZore(m);

<span class="hljs-keyword">var</span> s = date.getSeconds();         <span class="hljs-comment">// 获取当前时间的秒</span>
addZore(s);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addZore</span>(<span class="hljs-params">n</span>) </span>{
    <span class="hljs-keyword">return</span> n &gt; <span class="hljs-number">10</span> ? n : <span class="hljs-string">"0"</span> + n;   <span class="hljs-comment">// 判断获取到的数字大于10的时候 返回本身，小于的时候需要拼串</span>
}

<span class="hljs-keyword">var</span> dateStr = year + <span class="hljs-string">"-"</span> + month + <span class="hljs-string">"-"</span> + d + <span class="hljs-string">" "</span> + h + <span class="hljs-string">":"</span> + m + <span class="hljs-string">":"</span> + s;
<span class="hljs-built_in">console</span>.log(dateStr); <span class="hljs-comment">// 2017-11-17 13:58:53</span></code></pre>
<h4>13.2.4 时间戳</h4>
<blockquote>1970年01月01日00时00分00秒起至现在的总毫秒数叫做时间戳</blockquote>
<p><strong>获取时间戳：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var date = new Date();
// 方法一
console.log(date.getTime()); // getTime的方法获得毫秒数

// 方法二
console.log(+date);    // 直接通过计算的方式转换成毫秒数" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> date = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
<span class="hljs-comment">// 方法一</span>
<span class="hljs-built_in">console</span>.log(date.getTime()); <span class="hljs-comment">// getTime的方法获得毫秒数</span>

<span class="hljs-comment">// 方法二</span>
<span class="hljs-built_in">console</span>.log(+date);    <span class="hljs-comment">// 直接通过计算的方式转换成毫秒数</span></code></pre>
<p><strong>示例代码：计算代码执行的时间</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var start = new Date();
var sum = 0;
// 电脑性能不好的小伙伴 不要这么搞  循环的次数少一点
for (var index = 0; index < 1000000000; index++) {
    sum += index;
}
console.log(sum);  // 499999999067109000
var end = new Date();
console.log(end - start);  // 17899" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> start = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
<span class="hljs-keyword">var</span> sum = <span class="hljs-number">0</span>;
<span class="hljs-comment">// 电脑性能不好的小伙伴 不要这么搞  循环的次数少一点</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> index = <span class="hljs-number">0</span>; index &lt; <span class="hljs-number">1000000000</span>; index++) {
    sum += index;
}
<span class="hljs-built_in">console</span>.log(sum);  <span class="hljs-comment">// 499999999067109000</span>
<span class="hljs-keyword">var</span> end = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>();
<span class="hljs-built_in">console</span>.log(end - start);  <span class="hljs-comment">// 17899</span></code></pre>
<h3 id="articleHeader28">13.3 Array 对象</h3>
<blockquote>数组对象在javascript中非常的常用</blockquote>
<h4>13.3.1 数组转换成字符串 join()</h4>
<blockquote>将数组的值拼接成字符串</blockquote>
<p><strong>语法：</strong><code>array.join(separator)</code></p>
<ul>
<li>数组的每一项默认的拼接符是<code>逗号</code>
</li>
<li>想要改变拼接符就在<code>join()</code>方法的括号里传入其他的拼接字符</li>
</ul>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [&quot;大乔&quot;,&quot;小乔&quot;,&quot;甄姬&quot;,&quot;妲己&quot;,&quot;露娜&quot;];
var str = arr.join();
console.log(str);  // &quot;大乔,小乔,甄姬,妲己,露娜&quot;

// 用“-”拼接符
var arr2 = [&quot;大乔&quot;,&quot;小乔&quot;,&quot;甄姬&quot;,&quot;妲己&quot;,&quot;露娜&quot;];
var str2 = arr2.join(&quot;-&quot;);
console.log(str2);  // &quot;大乔-小乔-甄姬-妲己-露娜&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-string">"大乔"</span>,<span class="hljs-string">"小乔"</span>,<span class="hljs-string">"甄姬"</span>,<span class="hljs-string">"妲己"</span>,<span class="hljs-string">"露娜"</span>];
<span class="hljs-keyword">var</span> str = arr.join();
<span class="hljs-built_in">console</span>.log(str);  <span class="hljs-comment">// "大乔,小乔,甄姬,妲己,露娜"</span>

<span class="hljs-comment">// 用“-”拼接符</span>
<span class="hljs-keyword">var</span> arr2 = [<span class="hljs-string">"大乔"</span>,<span class="hljs-string">"小乔"</span>,<span class="hljs-string">"甄姬"</span>,<span class="hljs-string">"妲己"</span>,<span class="hljs-string">"露娜"</span>];
<span class="hljs-keyword">var</span> str2 = arr2.join(<span class="hljs-string">"-"</span>);
<span class="hljs-built_in">console</span>.log(str2);  <span class="hljs-comment">// "大乔-小乔-甄姬-妲己-露娜"</span></code></pre>
<h4>13.3.2 数组的增删操作</h4>
<p><strong>1、<code>arr.push()</code> 在数组最后面 添加元素，返回新数组的长度</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [&quot;大乔&quot;,&quot;小乔&quot;,&quot;甄姬&quot;];
console.log(arr.push(&quot;妲己&quot;, &quot;露娜&quot;));  // 返回 5
console.log(arr);                       // [&quot;大乔&quot;,&quot;小乔&quot;,&quot;甄姬&quot;,&quot;妲己&quot;,&quot;露娜&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-string">"大乔"</span>,<span class="hljs-string">"小乔"</span>,<span class="hljs-string">"甄姬"</span>];
<span class="hljs-built_in">console</span>.log(arr.push(<span class="hljs-string">"妲己"</span>, <span class="hljs-string">"露娜"</span>));  <span class="hljs-comment">// 返回 5</span>
<span class="hljs-built_in">console</span>.log(arr);                       <span class="hljs-comment">// ["大乔","小乔","甄姬","妲己","露娜"]</span></code></pre>
<p><strong>2、<code>arr.pop()</code> 在数组最后面删除一个元素，返回删除的那个元素</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [&quot;大乔&quot;,&quot;小乔&quot;,&quot;甄姬&quot;,&quot;妲己&quot;, &quot;露娜&quot;];
console.log(arr.pop());   // 返回 &quot;露娜&quot;
console.log(arr);         // [&quot;大乔&quot;,&quot;小乔&quot;,&quot;甄姬&quot;,&quot;妲己&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-string">"大乔"</span>,<span class="hljs-string">"小乔"</span>,<span class="hljs-string">"甄姬"</span>,<span class="hljs-string">"妲己"</span>, <span class="hljs-string">"露娜"</span>];
<span class="hljs-built_in">console</span>.log(arr.pop());   <span class="hljs-comment">// 返回 "露娜"</span>
<span class="hljs-built_in">console</span>.log(arr);         <span class="hljs-comment">// ["大乔","小乔","甄姬","妲己"]</span></code></pre>
<p><strong>3、<code>arr.unshift()</code> 在数组前面添加元素，返回新数组的长度</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [&quot;甄姬&quot;,&quot;妲己&quot;, &quot;露娜&quot;];
console.log(arr.unshift(&quot;大乔&quot;,&quot;小乔&quot;));   // 返回 5
console.log(arr);                          // [&quot;大乔&quot;,&quot;小乔&quot;,&quot;甄姬&quot;,&quot;妲己&quot;, &quot;露娜&quot;];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-string">"甄姬"</span>,<span class="hljs-string">"妲己"</span>, <span class="hljs-string">"露娜"</span>];
<span class="hljs-built_in">console</span>.log(arr.unshift(<span class="hljs-string">"大乔"</span>,<span class="hljs-string">"小乔"</span>));   <span class="hljs-comment">// 返回 5</span>
<span class="hljs-built_in">console</span>.log(arr);                          <span class="hljs-comment">// ["大乔","小乔","甄姬","妲己", "露娜"];</span></code></pre>
<p><strong>4、<code>arr.shift()</code> 在数组最前面删除一个元素，返回删除的那个元素</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [&quot;大乔&quot;,&quot;小乔&quot;,&quot;甄姬&quot;,&quot;妲己&quot;, &quot;露娜&quot;];
console.log(arr.shift());   // 返回 &quot;大乔&quot;
console.log(arr);           // [小乔&quot;,&quot;甄姬&quot;,&quot;妲己&quot;, &quot;露娜&quot;];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-string">"大乔"</span>,<span class="hljs-string">"小乔"</span>,<span class="hljs-string">"甄姬"</span>,<span class="hljs-string">"妲己"</span>, <span class="hljs-string">"露娜"</span>];
<span class="hljs-built_in">console</span>.log(arr.shift());   <span class="hljs-comment">// 返回 "大乔"</span>
<span class="hljs-built_in">console</span>.log(arr);           <span class="hljs-comment">// [小乔","甄姬","妲己", "露娜"];</span></code></pre>
<p><strong>示例代码(一)：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [&quot;刘备&quot;];
//添加数据后变成：[&quot;赵云&quot;,&quot;马超&quot;,&quot;刘备&quot;,&quot;关羽&quot;,&quot;张飞&quot;]
arr.push(&quot;关羽&quot;,&quot;张飞&quot;);
arr.unshift(&quot;赵云&quot;,&quot;马超&quot;);
console.log(arr);   //  [&quot;赵云&quot;,&quot;马超&quot;,&quot;刘备&quot;,&quot;关羽&quot;,&quot;张飞&quot;]

//删除数据后变成：[&quot;关羽&quot;,&quot;张飞&quot;]
arr.shift();
arr.shift();
arr.shift();
console.log(arr);   // [&quot;关羽&quot;,&quot;张飞&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-string">"刘备"</span>];
<span class="hljs-comment">//添加数据后变成：["赵云","马超","刘备","关羽","张飞"]</span>
arr.push(<span class="hljs-string">"关羽"</span>,<span class="hljs-string">"张飞"</span>);
arr.unshift(<span class="hljs-string">"赵云"</span>,<span class="hljs-string">"马超"</span>);
<span class="hljs-built_in">console</span>.log(arr);   <span class="hljs-comment">//  ["赵云","马超","刘备","关羽","张飞"]</span>

<span class="hljs-comment">//删除数据后变成：["关羽","张飞"]</span>
arr.shift();
arr.shift();
arr.shift();
<span class="hljs-built_in">console</span>.log(arr);   <span class="hljs-comment">// ["关羽","张飞"]</span></code></pre>
<p><strong>示例代码(二)：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [&quot;赵云&quot;,&quot;马超&quot;,&quot;刘备&quot;,&quot;关羽&quot;,&quot;张飞&quot;];

//把数组的最后一个元素变成数组的第一个元素
arr.unshift(arr.pop());
console.log(arr);        // [&quot;张飞&quot;,&quot;赵云&quot;,&quot;马超&quot;,&quot;刘备&quot;,&quot;关羽&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-string">"赵云"</span>,<span class="hljs-string">"马超"</span>,<span class="hljs-string">"刘备"</span>,<span class="hljs-string">"关羽"</span>,<span class="hljs-string">"张飞"</span>];

<span class="hljs-comment">//把数组的最后一个元素变成数组的第一个元素</span>
arr.unshift(arr.pop());
<span class="hljs-built_in">console</span>.log(arr);        <span class="hljs-comment">// ["张飞","赵云","马超","刘备","关羽"]</span></code></pre>
<h4>13.3.3 数组的翻转与排序</h4>
<p><strong>1、<code>arr.reverse()</code> 翻转数组</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1,2,3,4,5];
var newArr = arr.reverse();
console.log(newArr);  // [5,4,3,2,1]   
console.log(arr);     // [5,4,3,2,1]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>];
<span class="hljs-keyword">var</span> newArr = arr.reverse();
<span class="hljs-built_in">console</span>.log(newArr);  <span class="hljs-comment">// [5,4,3,2,1]   </span>
<span class="hljs-built_in">console</span>.log(arr);     <span class="hljs-comment">// [5,4,3,2,1]</span></code></pre>
<p><strong>2、<code>arr.sort()</code> 数组排序</strong></p>
<ul>
<li>默认按照字母顺序排序</li>
<li>sort方法可以<code>传递一个函数</code>作为<code>参数</code>，这个参数用来控制数组如何进行排序</li>
<li>
<code>a-b</code> 从小到大排序，<code>b-a</code> 从大到小排序</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1,3,5,7,9,2,4,6,8,10];
var newArr = arr.sort(function(a,b){
    // 如果返回值>0,则交换位置
    return a - b;
});
console.log(newArr);  // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(arr);     // [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">3</span>,<span class="hljs-number">5</span>,<span class="hljs-number">7</span>,<span class="hljs-number">9</span>,<span class="hljs-number">2</span>,<span class="hljs-number">4</span>,<span class="hljs-number">6</span>,<span class="hljs-number">8</span>,<span class="hljs-number">10</span>];
<span class="hljs-keyword">var</span> newArr = arr.sort(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a,b</span>)</span>{
    <span class="hljs-comment">// 如果返回值&gt;0,则交换位置</span>
    <span class="hljs-keyword">return</span> a - b;
});
<span class="hljs-built_in">console</span>.log(newArr);  <span class="hljs-comment">// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]</span>
<span class="hljs-built_in">console</span>.log(arr);     <span class="hljs-comment">// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]</span></code></pre>
<p><strong>示例代码(一)：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 将字符串数组按照字符长度从大到小排列
var arr = [&quot;ccc&quot;, &quot;bb&quot;, &quot;a&quot;, &quot;dddd&quot;];
arr.sort(function (a, b) {
    return b.length - a.length;
});
console.log(arr);       // [&quot;dddd&quot;, &quot;ccc&quot;, &quot;bb&quot;, &quot;a&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 将字符串数组按照字符长度从大到小排列</span>
<span class="hljs-keyword">var</span> arr = [<span class="hljs-string">"ccc"</span>, <span class="hljs-string">"bb"</span>, <span class="hljs-string">"a"</span>, <span class="hljs-string">"dddd"</span>];
arr.sort(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">a, b</span>) </span>{
    <span class="hljs-keyword">return</span> b.length - a.length;
});
<span class="hljs-built_in">console</span>.log(arr);       <span class="hljs-comment">// ["dddd", "ccc", "bb", "a"]</span></code></pre>
<p><strong>示例代码(二)：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
//将学生数组按照年龄从小到大排列
var arr = [
    {name:&quot;张三&quot;, age: 18, score: 50},
    {name:&quot;李四&quot;, age: 70, score: 95},
    {name:&quot;王五&quot;, age: 9, score: 33},
    {name:&quot;赵六&quot;, age: 38, score: 100},
    {name:&quot;田七&quot;, age: 6, score: 8},
    {name:&quot;王八&quot;, age: 22, score: 66}
];

arr.sort(function(a, b) {
    return a.age - b.age;
});
console.log(arr);  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-comment">//将学生数组按照年龄从小到大排列</span>
<span class="hljs-keyword">var</span> arr = [
    {<span class="hljs-attr">name</span>:<span class="hljs-string">"张三"</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">18</span>, <span class="hljs-attr">score</span>: <span class="hljs-number">50</span>},
    {<span class="hljs-attr">name</span>:<span class="hljs-string">"李四"</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">70</span>, <span class="hljs-attr">score</span>: <span class="hljs-number">95</span>},
    {<span class="hljs-attr">name</span>:<span class="hljs-string">"王五"</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">9</span>, <span class="hljs-attr">score</span>: <span class="hljs-number">33</span>},
    {<span class="hljs-attr">name</span>:<span class="hljs-string">"赵六"</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">38</span>, <span class="hljs-attr">score</span>: <span class="hljs-number">100</span>},
    {<span class="hljs-attr">name</span>:<span class="hljs-string">"田七"</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">6</span>, <span class="hljs-attr">score</span>: <span class="hljs-number">8</span>},
    {<span class="hljs-attr">name</span>:<span class="hljs-string">"王八"</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">22</span>, <span class="hljs-attr">score</span>: <span class="hljs-number">66</span>}
];

arr.sort(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b</span>) </span>{
    <span class="hljs-keyword">return</span> a.age - b.age;
});
<span class="hljs-built_in">console</span>.log(arr);  </code></pre>
<h4>13.3.4 数组的拼接与截取</h4>
<p><strong>1、<code>concat</code> 数组的合并</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr1 = [1, 3, 5, 7, 9];
var arr2 = [2, 4, 6, 8, 10];

// concat: 合并两个数组
var newArr = arr1.concat(arr2);
console.log(newArr);        //  [1, 3, 5, 7, 9, 2, 4, 6, 8, 10]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr1 = [<span class="hljs-number">1</span>, <span class="hljs-number">3</span>, <span class="hljs-number">5</span>, <span class="hljs-number">7</span>, <span class="hljs-number">9</span>];
<span class="hljs-keyword">var</span> arr2 = [<span class="hljs-number">2</span>, <span class="hljs-number">4</span>, <span class="hljs-number">6</span>, <span class="hljs-number">8</span>, <span class="hljs-number">10</span>];

<span class="hljs-comment">// concat: 合并两个数组</span>
<span class="hljs-keyword">var</span> newArr = arr1.concat(arr2);
<span class="hljs-built_in">console</span>.log(newArr);        <span class="hljs-comment">//  [1, 3, 5, 7, 9, 2, 4, 6, 8, 10]</span></code></pre>
<p><em>不会影响原来的数组，会返回一个新的数组</em></p>
<p><strong>2、<code>slice</code> 数组切分</strong></p>
<p><code>复制</code>数组的一部分(浅拷贝)到一个新数组，并返回这个数组，原来的数组不受影响</p>
<p><code>slice</code>有两个属性，分别是<code>开始的</code>下标和<code>结束的</code>下标，截取的时候包含<code>begin</code>，不包含<code>end</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1, 3, 5, 7, 9];


// slice: 截取数组的一部分
var newArr = arr.slice(0,3);
console.log(newArr);        //  [1, 3, 5]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">3</span>, <span class="hljs-number">5</span>, <span class="hljs-number">7</span>, <span class="hljs-number">9</span>];


<span class="hljs-comment">// slice: 截取数组的一部分</span>
<span class="hljs-keyword">var</span> newArr = arr.slice(<span class="hljs-number">0</span>,<span class="hljs-number">3</span>);
<span class="hljs-built_in">console</span>.log(newArr);        <span class="hljs-comment">//  [1, 3, 5]</span></code></pre>
<p><strong>3、<code>splice</code> 数组拼接</strong></p>
<p><code>splice</code>:数组拼接，以<code>新元素</code>来替换<code>旧元素</code>，以此来修改数组的内容，常用于<code>删除数组</code>的某些项</p>
<p><code>array.slice(start, deleteCount, [items]);</code> <code>start</code>:开始下标  <code>deleteCount</code>:删除的个数 <code>items</code>:替换的内容</p>
<p><strong>splice 能实现多种用法：</strong></p>
<ul>
<li>找到开始下标，删除个数为<code>0</code>，再输入替换的内容，此时就可以在数组中任意位置<code>添加</code>元素</li>
<li>找到开始下标，需要删除的个数，再输入替换的内容，此时就可以在数组任意位置<code>替换</code>元素</li>
<li>找到开始下标，需要删除的个数，不输入替换内容，此时就可以在数组任意位置，<code>删除</code>任意个数的元素</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// 从下标是2的位置开始，删除0个，把 100 101 添加进去
var newArr = arr.splice(2, 0, 100, 101);
console.log(newArr); // 操作的是原数组，不会返回这个新数组
console.log(arr); // [1, 2,100,101,3, 4, 5, 6, 7, 8, 9, 10]     


// 也可以替换元素 (此时arr = [1, 2,100, 101, 3, 4, 5, 6, 7, 8, 9, 10] )
arr.splice(0, 2, 98, 99);
console.log(arr); // [98, 99, 100, 101, 3, 4, 5, 6, 7, 8, 9, 10]


// 也可以用于删除数组里的多个元素 (此时arr = [98, 99, 100, 101, 3, 4, 5, 6, 7, 8, 9, 10] )
arr.splice(0, 4);
console.log(arr); // [3, 4, 5, 6, 7, 8, 9, 10]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>, <span class="hljs-number">10</span>];

<span class="hljs-comment">// 从下标是2的位置开始，删除0个，把 100 101 添加进去</span>
<span class="hljs-keyword">var</span> newArr = arr.splice(<span class="hljs-number">2</span>, <span class="hljs-number">0</span>, <span class="hljs-number">100</span>, <span class="hljs-number">101</span>);
<span class="hljs-built_in">console</span>.log(newArr); <span class="hljs-comment">// 操作的是原数组，不会返回这个新数组</span>
<span class="hljs-built_in">console</span>.log(arr); <span class="hljs-comment">// [1, 2,100,101,3, 4, 5, 6, 7, 8, 9, 10]     </span>


<span class="hljs-comment">// 也可以替换元素 (此时arr = [1, 2,100, 101, 3, 4, 5, 6, 7, 8, 9, 10] )</span>
arr.splice(<span class="hljs-number">0</span>, <span class="hljs-number">2</span>, <span class="hljs-number">98</span>, <span class="hljs-number">99</span>);
<span class="hljs-built_in">console</span>.log(arr); <span class="hljs-comment">// [98, 99, 100, 101, 3, 4, 5, 6, 7, 8, 9, 10]</span>


<span class="hljs-comment">// 也可以用于删除数组里的多个元素 (此时arr = [98, 99, 100, 101, 3, 4, 5, 6, 7, 8, 9, 10] )</span>
arr.splice(<span class="hljs-number">0</span>, <span class="hljs-number">4</span>);
<span class="hljs-built_in">console</span>.log(arr); <span class="hljs-comment">// [3, 4, 5, 6, 7, 8, 9, 10]</span></code></pre>
<h4>13.3.5 数组查找元素</h4>
<p><code>indexOf()</code>方法，是用来查找数组中，某个元素<code>首次出现</code>的位置，下标从<code>0</code>开始，找到的话返回位置信息，当找不到的时候返回<code>-1</code></p>
<p><code>arr.indexOf(search,[fromIndex])</code>;<code>search</code>:需要搜索的元素，<code>fromIndex</code>:规定在字符串中开始检索的位置。</p>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1, 5, 8, 11, 1, 2, 9];
arr.indexOf(8);  // 返回2
arr.indexOf(8,1) // 从下标1，往后查找 返回 2 
arr.indexOf(10); // 返回-1 说明找不到" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">5</span>, <span class="hljs-number">8</span>, <span class="hljs-number">11</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">9</span>];
arr.indexOf(<span class="hljs-number">8</span>);  <span class="hljs-comment">// 返回2</span>
arr.indexOf(<span class="hljs-number">8</span>,<span class="hljs-number">1</span>) <span class="hljs-comment">// 从下标1，往后查找 返回 2 </span>
arr.indexOf(<span class="hljs-number">10</span>); <span class="hljs-comment">// 返回-1 说明找不到</span></code></pre>
<p><strong>与之对应的还有一个<code>lastIndexOf()</code>,从后往前找</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1, 5, 8, 11, 1, 2, 9];
arr.lastIndexOf(1);  // 返回4
arr.lastIndexOf(1,3) // 从下标3，往前查找 返回0 
arr.lastIndexOf(10); // 返回-1 说明找不到" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">5</span>, <span class="hljs-number">8</span>, <span class="hljs-number">11</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">9</span>];
arr.lastIndexOf(<span class="hljs-number">1</span>);  <span class="hljs-comment">// 返回4</span>
arr.lastIndexOf(<span class="hljs-number">1</span>,<span class="hljs-number">3</span>) <span class="hljs-comment">// 从下标3，往前查找 返回0 </span>
arr.lastIndexOf(<span class="hljs-number">10</span>); <span class="hljs-comment">// 返回-1 说明找不到</span></code></pre>
<h4>13.3.6 清空数组</h4>
<p><strong>1、删除数组中的所有元素</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1,2,3,4,5];
arr.splice(0,arr.length);
console.log(arr);  // []" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>];
arr.splice(<span class="hljs-number">0</span>,arr.length);
<span class="hljs-built_in">console</span>.log(arr);  <span class="hljs-comment">// []</span></code></pre>
<p><strong>2、直接修改数组的长度</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1,2,3,4,5];
arr.length = 0;
console.log(arr);  // []" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>];
arr.length = <span class="hljs-number">0</span>;
<span class="hljs-built_in">console</span>.log(arr);  <span class="hljs-comment">// []</span></code></pre>
<p><strong>3、将数组赋值为一个空的数组</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [1,2,3,4,5];
arr = [];
console.log(arr);  // []" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>];
arr = [];
<span class="hljs-built_in">console</span>.log(arr);  <span class="hljs-comment">// []</span></code></pre>
<h4>13.3.7 数组的综合练习</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr = [&quot;c&quot;, &quot;a&quot;, &quot;z&quot;, &quot;a&quot;, &quot;x&quot;, &quot;a&quot;, &quot;a&quot;, &quot;z&quot;, &quot;c&quot;, &quot;x&quot;, &quot;a&quot;, &quot;x&quot;];
//1. 找到数组中第一个a出现的位置
console.log(arr.indexOf(&quot;a&quot;));          // 1

//2. 找到数组中最后一个a出现的位置
console.log(arr.lastIndexOf(&quot;a&quot;));      // 10

//3. 找到数组中每一个a出现的位置
for (var i = 0; i < arr.length; i++) {
    if (arr[i] == &quot;a&quot;) {
        console.log(i);                 // 1 3 5 6 10
    }
}

//4. 数组去重，返回一个新数组
var newArr = [];
for (var i = 0; i < arr.length; i++) {
    if (newArr.indexOf(arr[i]) == -1) {   // 判断当newArr的数组里没有arr[i]的时候
        newArr.push(arr[i]);              // 将arr[i] 添加到newArr中 [&quot;c&quot;, &quot;a&quot;, &quot;z&quot;, &quot;x&quot;]
    }
}
console.log(newArr);

//5. 获取数组中每个元素出现的次数
//　首先需要知道 如何判断一个对象中是否存在某属性
/*
    var obj = {
        name:&quot;zs&quot;,
        age:18,
        score:100
    }
    //in关键字可以查看对象是否拥有某个属性。
    console.log( &quot;sex&quot; in obj );  // false
*/
var obj = {};
for(var i = 0; i < arr.length; i++){
    // 遍历数组，判断对象有没有这个属性， 
    if(arr[i] in obj){
        // 如果有这个属性，让这个属性的值+1 
        obj[arr[i]] ++;
    }else{
        // 如果没有这个属性，让这个属性等于1                    
        obj[arr[i]] = 1;
    }
}
console.log(obj);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> arr = [<span class="hljs-string">"c"</span>, <span class="hljs-string">"a"</span>, <span class="hljs-string">"z"</span>, <span class="hljs-string">"a"</span>, <span class="hljs-string">"x"</span>, <span class="hljs-string">"a"</span>, <span class="hljs-string">"a"</span>, <span class="hljs-string">"z"</span>, <span class="hljs-string">"c"</span>, <span class="hljs-string">"x"</span>, <span class="hljs-string">"a"</span>, <span class="hljs-string">"x"</span>];
<span class="hljs-comment">//1. 找到数组中第一个a出现的位置</span>
<span class="hljs-built_in">console</span>.log(arr.indexOf(<span class="hljs-string">"a"</span>));          <span class="hljs-comment">// 1</span>

<span class="hljs-comment">//2. 找到数组中最后一个a出现的位置</span>
<span class="hljs-built_in">console</span>.log(arr.lastIndexOf(<span class="hljs-string">"a"</span>));      <span class="hljs-comment">// 10</span>

<span class="hljs-comment">//3. 找到数组中每一个a出现的位置</span>
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {
    <span class="hljs-keyword">if</span> (arr[i] == <span class="hljs-string">"a"</span>) {
        <span class="hljs-built_in">console</span>.log(i);                 <span class="hljs-comment">// 1 3 5 6 10</span>
    }
}

<span class="hljs-comment">//4. 数组去重，返回一个新数组</span>
<span class="hljs-keyword">var</span> newArr = [];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {
    <span class="hljs-keyword">if</span> (newArr.indexOf(arr[i]) == <span class="hljs-number">-1</span>) {   <span class="hljs-comment">// 判断当newArr的数组里没有arr[i]的时候</span>
        newArr.push(arr[i]);              <span class="hljs-comment">// 将arr[i] 添加到newArr中 ["c", "a", "z", "x"]</span>
    }
}
<span class="hljs-built_in">console</span>.log(newArr);

<span class="hljs-comment">//5. 获取数组中每个元素出现的次数</span>
<span class="hljs-comment">//　首先需要知道 如何判断一个对象中是否存在某属性</span>
<span class="hljs-comment">/*
    var obj = {
        name:"zs",
        age:18,
        score:100
    }
    //in关键字可以查看对象是否拥有某个属性。
    console.log( "sex" in obj );  // false
*/</span>
<span class="hljs-keyword">var</span> obj = {};
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++){
    <span class="hljs-comment">// 遍历数组，判断对象有没有这个属性， </span>
    <span class="hljs-keyword">if</span>(arr[i] <span class="hljs-keyword">in</span> obj){
        <span class="hljs-comment">// 如果有这个属性，让这个属性的值+1 </span>
        obj[arr[i]] ++;
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-comment">// 如果没有这个属性，让这个属性等于1                    </span>
        obj[arr[i]] = <span class="hljs-number">1</span>;
    }
}
<span class="hljs-built_in">console</span>.log(obj);</code></pre>
<h3 id="articleHeader29">13.4 String 对象</h3>
<blockquote>字符串可以看成是一个字符数组（伪数组）。因此字符串也有长度，也可以进行遍历。<code>String</code>对象很多方法的名字和和<code>Array</code>的一样。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 遍历一段字符串
var str = &quot;abcdefghijk&quot;;
for(var i = 0; i < str.length; i++){
    console.log(str[i]);  // &quot;a&quot; &quot;b&quot; &quot;c&quot; &quot;d&quot;...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 遍历一段字符串</span>
<span class="hljs-keyword">var</span> str = <span class="hljs-string">"abcdefghijk"</span>;
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; str.length; i++){
    <span class="hljs-built_in">console</span>.log(str[i]);  <span class="hljs-comment">// "a" "b" "c" "d"...</span>
}</code></pre>
<h4>13.4.1 字符串大小写转换的方法</h4>
<p><strong>小写转换成大写</strong></p>
<blockquote>
<code>toUpperCase()</code>,<code>toLocaleUpperCase()</code>是将英文小写的字符串转换为大写,其中<code>toLocaleUpperCase()</code>方法则是针对特定地区的实现(如土耳其语会为Unicode大小写转换应用特殊的规则)。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = &quot;hello world&quot;;
str.toUpperCase(); // &quot;HELLO WORLD&quot;
str.toLocaleUpperCase();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> str = <span class="hljs-string">"hello world"</span>;
str.toUpperCase(); <span class="hljs-comment">// "HELLO WORLD"</span>
str.toLocaleUpperCase();</code></pre>
<p><strong>大写转换成小写</strong></p>
<blockquote>
<code>toLowerCase()</code>,<code>toLocaleLowerCase()</code>是将英文小写的字符串转换为大写</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = &quot;HELLO WORLD&quot;;
str.toUpperCase(); // &quot;hello world&quot;
str.toLocaleUpperCase();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> str = <span class="hljs-string">"HELLO WORLD"</span>;
str.toUpperCase(); <span class="hljs-comment">// "hello world"</span>
str.toLocaleUpperCase();</code></pre>
<p><strong>注意</strong>: 因为是方法，所以一定不要忘记加上<code>()</code></p>
<h4>13.4.2 indexOf 查找指定字符串</h4>
<blockquote>
<code>indexOf()</code>方法，是用来判断指定字符，在当前字符串中<code>首次出现</code>的位置，下标从<code>0</code>开始，找到的话返回位置信息，当找不到的时候返回<code>-1</code>
</blockquote>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str= &quot;good good study , day day up!&quot;;
str.indexOf(&quot;day&quot;);  // 返回18
str.indexOf(&quot;good&quot;); // 返回0
str.indexOf(&quot;GOOD&quot;); // 返回-1 说明找不到" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> str= <span class="hljs-string">"good good study , day day up!"</span>;
str.indexOf(<span class="hljs-string">"day"</span>);  <span class="hljs-comment">// 返回18</span>
str.indexOf(<span class="hljs-string">"good"</span>); <span class="hljs-comment">// 返回0</span>
str.indexOf(<span class="hljs-string">"GOOD"</span>); <span class="hljs-comment">// 返回-1 说明找不到</span></code></pre>
<p><strong>与之对应的还有一个<code>lastIndexOf()</code>,是用来从后面开始查找字符第一次出现的位置</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str= &quot;good good study , day day up!&quot;;
str.lastIndexOf(&quot;good&quot;);  // 返回 5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> str= <span class="hljs-string">"good good study , day day up!"</span>;
str.lastIndexOf(<span class="hljs-string">"good"</span>);  <span class="hljs-comment">// 返回 5</span></code></pre>
<h4>13.4.3 trim 去除空白</h4>
<blockquote>
<code>trim();</code>方法，是用来去除字符串两边的空格，内部空格不会去除</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = &quot; A B C &quot;;
console.log(str.trim());  // &quot;A B C&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> str = <span class="hljs-string">" A B C "</span>;
<span class="hljs-built_in">console</span>.log(str.trim());  <span class="hljs-comment">// "A B C"</span></code></pre>
<h4>13.4.4 slice 截取字符串</h4>
<blockquote>
<code>slice()</code>方法是用来截取一段字符串的，<code>str.slice(start,end);</code>它的两个参数都是表示下标的，一个表示开始，一个表示结束(截取时不包括结束下标)</blockquote>
<p><strong>说明：</strong></p>
<ul>
<li>
<code>start</code>下标从<code>0</code>开始的str指定部分起始索引。如果<code>start</code>为负，将它作为<code>length+start</code>处理，此处<code>length</code>为字符串的长度。</li>
<li>
<code>end</code>下标从<code>0</code>开始的str指定部分结束索引。如果<code>end</code>为负，将它作为<code>length+end</code>处理，此处<code>length</code>为字符串的长度。</li>
</ul>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 起始位置结束位置都是正数
var str = &quot;ABCDEFGHIJK&quot;;
str.slice(2,6);  // &quot;CDEF&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 起始位置结束位置都是正数</span>
<span class="hljs-keyword">var</span> str = <span class="hljs-string">"ABCDEFGHIJK"</span>;
str.slice(<span class="hljs-number">2</span>,<span class="hljs-number">6</span>);  <span class="hljs-comment">// "CDEF"</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 当起始位置为负数的时候
var str = &quot;ABCDEFGHIJK&quot;;
str.slice(-6, 10); // &quot;FGHIJ&quot;
// str的length为11，所以起始位置是-6+11=5，就是F结束是10(不包括10)，那么就是J；" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 当起始位置为负数的时候</span>
<span class="hljs-keyword">var</span> str = <span class="hljs-string">"ABCDEFGHIJK"</span>;
str.slice(<span class="hljs-number">-6</span>, <span class="hljs-number">10</span>); <span class="hljs-comment">// "FGHIJ"</span>
<span class="hljs-comment">// str的length为11，所以起始位置是-6+11=5，就是F结束是10(不包括10)，那么就是J；</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 特殊情况 当起始位置在结束位置后面的时候，是截取不了的，返回空
var str = &quot;ABCDEFGHIJK&quot;;
str.slice(-6, 2); // 空
// str的length为11，所以起始位置是-6+11=5，就是F，结束位置在2，这个时候是截取不了的" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 特殊情况 当起始位置在结束位置后面的时候，是截取不了的，返回空</span>
<span class="hljs-keyword">var</span> str = <span class="hljs-string">"ABCDEFGHIJK"</span>;
str.slice(<span class="hljs-number">-6</span>, <span class="hljs-number">2</span>); <span class="hljs-comment">// 空</span>
<span class="hljs-comment">// str的length为11，所以起始位置是-6+11=5，就是F，结束位置在2，这个时候是截取不了的</span></code></pre>
<p><strong>注意：</strong></p>
<ul>
<li>
<code>end</code>为结束下标，截取的时候不包括<code>end</code>那一位</li>
<li>截取是有顺序的，开始到结束的顺序必须是从左向右，否则是截取不了的,为空</li>
</ul>
<h4>13.4.5 substring 截取字符串</h4>
<blockquote>
<code>substring()</code>方法返回位于String对象中指定位置的子字符串,<code>str.substring(start,end);</code>它的两个参数都是表示下标的，一个表示开始，一个表示结束(截取时不包括结束下标)</blockquote>
<p><strong>说明：</strong></p>
<ul>
<li>
<code>start</code>指明子字符串的<code>起始位置</code>，该索引从<code>0</code>开始起算。</li>
<li>
<code>end</code>指明子字符串的<code>结束位置</code>，该索引从<code>0</code>开始起算。</li>
<li>
<code>substring</code>方法使用<code>start</code>和<code>end</code>两者中的较小值作为子字符串的起始点。如果<code>start</code>或<code>end</code>为<code>NaN</code>或者为负数，那么将其替换为<code>0</code>。</li>
</ul>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 当起始位置，结束位置都是正数的时候
var str = &quot;ABCDEFGHIJK&quot;;
str.substring(2,6); // &quot;CDEF&quot;
// 同样的，substring方法结束位置也不包括自己" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 当起始位置，结束位置都是正数的时候</span>
<span class="hljs-keyword">var</span> str = <span class="hljs-string">"ABCDEFGHIJK"</span>;
str.substring(<span class="hljs-number">2</span>,<span class="hljs-number">6</span>); <span class="hljs-comment">// "CDEF"</span>
<span class="hljs-comment">// 同样的，substring方法结束位置也不包括自己</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 当起始位置为负数的时候，直接转换成下标0
var str = &quot;ABCDEFGHIJK&quot;;
str.substring(-2,6); // &quot;ABCDEF&quot; 下标转换成了0 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 当起始位置为负数的时候，直接转换成下标0</span>
<span class="hljs-keyword">var</span> str = <span class="hljs-string">"ABCDEFGHIJK"</span>;
str.substring(<span class="hljs-number">-2</span>,<span class="hljs-number">6</span>); <span class="hljs-comment">// "ABCDEF" 下标转换成了0 </span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 当开始的位置大于结束位置的时候，自动转换较小的值作为起点
var str = &quot;ABCDEFGHIJK&quot;;
str.substring(6,2); // &quot;CDEF&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 当开始的位置大于结束位置的时候，自动转换较小的值作为起点</span>
<span class="hljs-keyword">var</span> str = <span class="hljs-string">"ABCDEFGHIJK"</span>;
str.substring(<span class="hljs-number">6</span>,<span class="hljs-number">2</span>); <span class="hljs-comment">// "CDEF"</span></code></pre>
<p><strong>利用substring方法，实现打字效果</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*样式部分*/
#box {
    width: 300px;
    height: 150px;
    border: 2px dashed fuchsia;
    margin: 100px auto;
    text-align: left;
    padding: 10px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/*样式部分*/</span>
<span class="hljs-selector-id">#box</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">150px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">2px</span> dashed fuchsia;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">100px</span> auto;
    <span class="hljs-attribute">text-align</span>: left;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">10px</span>;
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!--html部分-->
<div id=&quot;box&quot;></div>

<!--js部分-->
<script>
    var str = &quot;ABCDEFGHIJKLMNOPQRSTUVWXYZ&quot;;
    var strLength = str.length;
    var index = 0;
    setInterval(function() {
        if (index >= strLength) {
            return;
        }
        index++;
        document.getElementById('box').innerHTML = str.substring(0, index);
    }, 100);
</script>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!--html部分--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"box"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!--js部分--&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-keyword">var</span> str = <span class="hljs-string">"ABCDEFGHIJKLMNOPQRSTUVWXYZ"</span>;
    <span class="hljs-keyword">var</span> strLength = str.length;
    <span class="hljs-keyword">var</span> index = <span class="hljs-number">0</span>;
    setInterval(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (index &gt;= strLength) {
            <span class="hljs-keyword">return</span>;
        }
        index++;
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'box'</span>).innerHTML = str.substring(<span class="hljs-number">0</span>, index);
    }, <span class="hljs-number">100</span>);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</code></pre>
<p><strong>注意：</strong></p>
<ul>
<li>
<code>substring</code>方法，<code>end</code>为结束下标，截取的时候同样不包括<code>end</code>那一位</li>
<li>当<code>start</code>的值大于<code>end</code>的时候，两者中较小的值作为起始下标</li>
</ul>
<h4>13.4.6 字符串的 substr方法</h4>
<blockquote>
<code>substr()</code>方法返回一个从指定位置开始,指定长度的子字符串。<code>str.substr(start,length)</code>,<code>start</code>为开始的下标,<code>length</code>为需要返回字符串的长度</blockquote>
<p><strong>说明：</strong></p>
<ul>
<li>
<code>start</code>所需的子字符串的起始位置。字符串中的第一个字符的索引为<code>0</code>。</li>
<li>
<code>length</code>在返回的子字符串中应包括的字符个数。</li>
</ul>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = &quot;ABCDEFGHIJK&quot;;
str.substr(1,5); // BCDEF" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> str = <span class="hljs-string">"ABCDEFGHIJK"</span>;
str.substr(<span class="hljs-number">1</span>,<span class="hljs-number">5</span>); <span class="hljs-comment">// BCDEF</span></code></pre>
<h4>13.4.7 match 查找字符串</h4>
<blockquote>
<code>match()</code> 来查找字符串中特定的字符，并且如果找到的话，则返回这个字符,找不到的话返回<code>null</code>。</blockquote>
<p><strong>示例代码:</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str= &quot;good good study , day day up!&quot;;
str1.match(&quot;good&quot;);  // good
str1.match(&quot;Good&quot;);  // null" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> str= <span class="hljs-string">"good good study , day day up!"</span>;
str1.match(<span class="hljs-string">"good"</span>);  <span class="hljs-comment">// good</span>
str1.match(<span class="hljs-string">"Good"</span>);  <span class="hljs-comment">// null</span></code></pre>
<h4>13.4.8 replace 替换字符串</h4>
<blockquote>
<code>replace()</code> 方法在字符串中用某些字符替换另一些字符。</blockquote>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str2 = &quot;hello world&quot;;
str2.replace(&quot;world&quot;, &quot;china&quot;); // &quot;hello china&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> str2 = <span class="hljs-string">"hello world"</span>;
str2.replace(<span class="hljs-string">"world"</span>, <span class="hljs-string">"china"</span>); <span class="hljs-comment">// "hello china"</span></code></pre>
<h4>13.4.9 split 切割字符串转为数组</h4>
<blockquote>将一个字符串分割为子字符串，然后将结果作为字符串数组返回。<code>str.split(separator,num)</code>,带一个参数<code>separator</code>表示切割的条件，第二个参数<code>num</code>表示需要切割的位数</blockquote>
<p><strong>说明：</strong></p>
<ul>
<li>
<code>separator(分隔符)</code>字符串或<code>正则表达式</code>对象，它标识了分隔字符串时使用的是一个还是多个字符。如果忽略该选项，返回包含整个字符串的单一元素数组。</li>
<li>
<code>num</code>该值用来限制返回数组中的元素个数。</li>
</ul>
<p><strong>示例代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = &quot;ABCDEFGHIJK&quot;;
str.split(&quot;&quot;,6); // [&quot;A&quot;, &quot;B&quot;, &quot;C&quot;, &quot;D&quot;, &quot;E&quot;, &quot;F&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> str = <span class="hljs-string">"ABCDEFGHIJK"</span>;
str.split(<span class="hljs-string">""</span>,<span class="hljs-number">6</span>); <span class="hljs-comment">// ["A", "B", "C", "D", "E", "F"]</span></code></pre>
<h3 id="articleHeader30">13.5 Array对象 与 String对象综合练习</h3>
<p><strong>1、翻转一个字符串</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var str = &quot;abcdefg&quot;;
var strArr = str.split(&quot;&quot;); // 将字符串转换为数组 [&quot;a&quot;,&quot;b&quot;,&quot;c&quot;,&quot;d&quot;,&quot;e&quot;,&quot;f&quot;,&quot;g&quot;]
strArr.reverse();           // 翻转这个数组       [&quot;g&quot;,&quot;f&quot;,&quot;e&quot;,&quot;d&quot;,&quot;c&quot;,&quot;b&quot;,&quot;a&quot;]
var newStr = strArr.join(&quot;&quot;);
console.log(newArr);        // &quot;gfedcba&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> str = <span class="hljs-string">"abcdefg"</span>;
<span class="hljs-keyword">var</span> strArr = str.split(<span class="hljs-string">""</span>); <span class="hljs-comment">// 将字符串转换为数组 ["a","b","c","d","e","f","g"]</span>
strArr.reverse();           <span class="hljs-comment">// 翻转这个数组       ["g","f","e","d","c","b","a"]</span>
<span class="hljs-keyword">var</span> newStr = strArr.join(<span class="hljs-string">""</span>);
<span class="hljs-built_in">console</span>.log(newArr);        <span class="hljs-comment">// "gfedcba"</span></code></pre>
<p><strong>2、将一串字符转化成对象</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
有一个链接：http://www.baidu.com?name=cc&amp;id=100&amp;desc=很帅 
将链接的参数部分转换成一个对象
即{name:&quot;cc&quot;, id=100 , desc: &quot;很帅&quot;}
*/
var str = &quot;http://www.baidu.com?name=cc&amp;id=100&amp;desc=很帅&quot;;
var obj = {};
var strArr = str.split(&quot;?&quot;);          // [&quot;http://www.baidu.com&quot;, &quot;name=cc&amp;id=100&amp;desc=很帅&quot;]
var strArr2 = strArr[1].split(&quot;=&quot;);   // [&quot;name=cc&quot;, &quot;id=100&quot;, &quot;desc=很帅&quot;]
for(var i = 0; i < strArr2.length; i++){
    console.log(strArr2[i]);          // &quot;name=cc&quot; &quot;id=100&quot; &quot;desc=很帅&quot;
    var key = strArr2[i].split(&quot;=&quot;)[0];     // name  id  desc
    var value = strArr2[i].split(&quot;=&quot;)[1];   // cc 100 很帅
    obj[key] = value;
}
console.log(obj);     // {name:&quot;cc&quot;, id=100 , desc: &quot;很帅&quot;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/*
有一个链接：http://www.baidu.com?name=cc&amp;id=100&amp;desc=很帅 
将链接的参数部分转换成一个对象
即{name:"cc", id=100 , desc: "很帅"}
*/</span>
<span class="hljs-keyword">var</span> str = <span class="hljs-string">"http://www.baidu.com?name=cc&amp;id=100&amp;desc=很帅"</span>;
<span class="hljs-keyword">var</span> obj = {};
<span class="hljs-keyword">var</span> strArr = str.split(<span class="hljs-string">"?"</span>);          <span class="hljs-comment">// ["http://www.baidu.com", "name=cc&amp;id=100&amp;desc=很帅"]</span>
<span class="hljs-keyword">var</span> strArr2 = strArr[<span class="hljs-number">1</span>].split(<span class="hljs-string">"="</span>);   <span class="hljs-comment">// ["name=cc", "id=100", "desc=很帅"]</span>
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; strArr2.length; i++){
    <span class="hljs-built_in">console</span>.log(strArr2[i]);          <span class="hljs-comment">// "name=cc" "id=100" "desc=很帅"</span>
    <span class="hljs-keyword">var</span> key = strArr2[i].split(<span class="hljs-string">"="</span>)[<span class="hljs-number">0</span>];     <span class="hljs-comment">// name  id  desc</span>
    <span class="hljs-keyword">var</span> value = strArr2[i].split(<span class="hljs-string">"="</span>)[<span class="hljs-number">1</span>];   <span class="hljs-comment">// cc 100 很帅</span>
    obj[key] = value;
}
<span class="hljs-built_in">console</span>.log(obj);     <span class="hljs-comment">// {name:"cc", id=100 , desc: "很帅"}</span></code></pre>
<p><strong>3、将对象转换成字符串</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
有一个对象{name:&quot;cc&quot;, id:100,desc:&quot;很帅&quot;}
和一个链接http://www.baidu.com,
拼接成链接http://www.baidu.com?name=cc&amp;id=100&amp;desc=很帅
*/
var prefix = &quot;http://www.baidu.com&quot;;
var obj = {name:&quot;cc&quot;, id:100,desc:&quot;很帅&quot;};
var arr = [];
for (var key in obj) {
    // console.log(key);            name id desc
    // console.log(obj[key]);       &quot;cc&quot; 100 &quot;很帅&quot;
    var str = key + &quot;=&quot; + obj[key];
    console.log(str);               // name=cc id=100 desc=很帅
    arr.push(str);  
    console.log(arr);               // [&quot;name=cc&quot;, &quot;id=100&quot;, &quot;desc=很帅&quot;]
}
var arrStr = arr.join(&quot;&amp;&quot;);         
console.log(arrStr);                // name=cc&amp;id=100&amp;desc=很帅
var result = prefix + &quot;?&quot; + arrStr;
console.log(result);                // http://www.baidu.com?name=cc&amp;id=100&amp;desc=很帅" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/*
有一个对象{name:"cc", id:100,desc:"很帅"}
和一个链接http://www.baidu.com,
拼接成链接http://www.baidu.com?name=cc&amp;id=100&amp;desc=很帅
*/</span>
<span class="hljs-keyword">var</span> prefix = <span class="hljs-string">"http://www.baidu.com"</span>;
<span class="hljs-keyword">var</span> obj = {<span class="hljs-attr">name</span>:<span class="hljs-string">"cc"</span>, <span class="hljs-attr">id</span>:<span class="hljs-number">100</span>,<span class="hljs-attr">desc</span>:<span class="hljs-string">"很帅"</span>};
<span class="hljs-keyword">var</span> arr = [];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> obj) {
    <span class="hljs-comment">// console.log(key);            name id desc</span>
    <span class="hljs-comment">// console.log(obj[key]);       "cc" 100 "很帅"</span>
    <span class="hljs-keyword">var</span> str = key + <span class="hljs-string">"="</span> + obj[key];
    <span class="hljs-built_in">console</span>.log(str);               <span class="hljs-comment">// name=cc id=100 desc=很帅</span>
    arr.push(str);  
    <span class="hljs-built_in">console</span>.log(arr);               <span class="hljs-comment">// ["name=cc", "id=100", "desc=很帅"]</span>
}
<span class="hljs-keyword">var</span> arrStr = arr.join(<span class="hljs-string">"&amp;"</span>);         
<span class="hljs-built_in">console</span>.log(arrStr);                <span class="hljs-comment">// name=cc&amp;id=100&amp;desc=很帅</span>
<span class="hljs-keyword">var</span> result = prefix + <span class="hljs-string">"?"</span> + arrStr;
<span class="hljs-built_in">console</span>.log(result);                <span class="hljs-comment">// http://www.baidu.com?name=cc&amp;id=100&amp;desc=很帅</span></code></pre>
<p><a href="https://segmentfault.com/a/1190000012344521">上一篇：JavaScript 基础知识 - 入门篇(一)</a><br><a href="https://segmentfault.com/a/1190000012369840" target="_blank">下一篇：JavaScript 基础知识 - DOM篇(一)</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 基础知识 - 入门篇(二)

## 原文链接
[https://segmentfault.com/a/1190000012344586](https://segmentfault.com/a/1190000012344586)

