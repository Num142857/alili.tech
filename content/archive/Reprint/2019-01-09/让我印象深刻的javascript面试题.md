---
title: '让我印象深刻的javascript面试题' 
date: 2019-01-09 2:30:12
hidden: true
slug: ukzp2oggnzo
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1.前言</h2>
<p>对于一个web前端来说，面试的时候，难免会遇到javascript的面试题。就我自己而言。有几道面试题，有些是我面试遇到的，有些是在网上看到的，但是都印象深刻。今天就来简单分析一下我遇到的，印象深刻的一些面试题！主要目的希望能让小伙伴学到一些东西，如过以后遇到类似的情况，就记得不要掉坑了！</p>
<h2 id="articleHeader1">2.预解析</h2>
<p><strong>预解析：在当前作用域下,js运行之前，会把带有var和function关键字的事先声明，但不会赋值（个人见解）</strong></p>
<p>对预解析印象深刻，并不是因为难，而是要细心，稍微一粗心，答案就写错了！我遇到预解析的题目不止一道，有两道我现在还能记住，我说下！</p>
<h3 id="articleHeader2">2-1.预解析1</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="alert(a)
a();
var a=3;
function a(){
    alert(10)
}   
alert(a)
a=6;
a();  

------------分割线------------------

alert(a)
a();
var a=3;
var a=function(){
    alert(10)
}   
alert(a)
a=6;
a(); 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code>alert(a)
a();
<span class="hljs-keyword">var</span> a=<span class="hljs-number">3</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span><span class="hljs-params">()</span><span class="hljs-comment">{
    alert(10)
}</span>   
<span class="hljs-title">alert</span><span class="hljs-params">(a)</span>
<span class="hljs-title">a</span>=6;</span>
a();  

------------分割线------------------

alert(a)
a();
<span class="hljs-keyword">var</span> a=<span class="hljs-number">3</span>;
<span class="hljs-keyword">var</span> a=<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span><span class="hljs-comment">{
    alert(10)
}</span>   
<span class="hljs-title">alert</span><span class="hljs-params">(a)</span>
<span class="hljs-title">a</span>=6;</span>
a(); 
</code></pre>
<p>看到这个代码，当时答错了。后来请教了朋友，然后自己再理解下，就理顺了！<br>考点其实就两个，第一变量声明提前，第二函数声明优先于变量声明！<br>下面我简单分析一下，<br>第一部分运行结果：<br>1.函数声明优先于变量声明，所以，刚开始，a就是<code>function a(){alert(10)}</code>  ，就会看到这个函数。<br>2.<code>a()</code>，执行函数，就是出现<code>alert(10)</code><br>3.执行了<code>var a=3;</code> 所以<code>alert(a)</code>就是显示<code>3</code><br>4.由于<code>a</code>不是一个函数了，所以往下在执行到<code>a()</code>的时候， 报错。<br>第二部分运行结果：<br>1.underfind<br>2.报错<br>在之前说过，预解析是把带有<code>var</code>和<code>function</code>关键字的事先声明，但不会赋值。所以一开始是<code>underfind</code>，然后报错是因为执行到<code>a()</code>的时候，<code>a</code>并不是一个函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//函数表达式，和变量声明同等
var a=function(){
    alert(10)
} 
//函数声明，优于变量声明    
function a(){
    alert(10)
} 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//函数表达式，和变量声明同等</span>
<span class="hljs-keyword">var</span> a=<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    alert(<span class="hljs-number">10</span>)
} 
<span class="hljs-comment">//函数声明，优于变量声明    </span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span><span class="hljs-params">()</span></span>{
    alert(<span class="hljs-number">10</span>)
} 
</code></pre>
<h3 id="articleHeader3">2-2.预解析和作用域</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var a=0;
function aa(){
    alert(a)
    a=3
}
//结果是什么都没发生，因为要执行aa函数才会执行alert(0)

------------分割线1------------------

var a=0;
function aa(){
    alert(a)
    var a=3
}
aa();
//underfind  在aa函数里面，有var a=3，那么在aa作用域里面，就是把a这个变量声明提前，但是不会赋值，所以是underfind

------------分割线2------------------

var a=0;
function aa(a){
    alert(a)
    var a=3
}
aa(5)
alert(a)
//5,0   在函数体内，参数a的优先级高于变量a

------------分割线3------------------

var a=0;
function aa(a){
    alert(a)
    a=3
}
aa(5)
alert(a)
//5,0   在函数体内，执行alert(a)和a=3,修改的的并不是全局变量a，而是参数a

------------分割线4------------------

var a=0;
function aa(a){
    alert(a)
    var a=3
    alert(a)
}
aa(5)
//5,3
//这个我也有点不理解，请教网上的说法，有两个答案(小伙伴如果知道怎么理解，欢迎在评论上指点)
//1.参数优先级高于变量声明，所以 变量n的声明其实被忽略了，此时相当于
//var a=0;
//function aa(a){
//  var a=5;
//    alert(a)
//    a=3
//    alert(a)
//}
//aa(5)

//2.形参和局部变量优先级一样，此时相当于
//var a=0;
//function aa(a){
//  var a;    先声明
//  a=5      由于形参和变量名称一样，覆盖了！
//    alert(a)
//    a=3
//    alert(a)
//}
//aa(5)

------------分割线5------------------

var a=0;
function aa(a){
    alert(a)
    a=3
    alert(a)
}
aa()
alert(a)
//underfind  3  0 
//首先，参数优先级高于全局变量，由于没传参数，所以是underfind
//a=3，实际上修改的时形参a的值，并不是全局变量a，往下alert(a)也是形参a
//最后的alert(a)，你懂的
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-keyword">var</span> a=<span class="hljs-number">0</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">aa</span><span class="hljs-params">()</span><span class="hljs-comment">{
    alert(a)
    a=3
}</span>
<span class="hljs-comment">//结果是什么都没发生，因为要执行aa函数才会执行alert(0)</span>

------------分割线1------------------

<span class="hljs-title">var</span> <span class="hljs-title">a</span>=0;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">aa</span><span class="hljs-params">()</span><span class="hljs-comment">{
    alert(a)
    var a=3
}</span>
<span class="hljs-title">aa</span><span class="hljs-params">()</span>;</span>
<span class="hljs-comment">//underfind  在aa函数里面，有var a=3，那么在aa作用域里面，就是把a这个变量声明提前，但是不会赋值，所以是underfind</span>

------------分割线<span class="hljs-number">2</span>------------------

<span class="hljs-keyword">var</span> a=<span class="hljs-number">0</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">aa</span><span class="hljs-params">(a)</span><span class="hljs-comment">{
    alert(a)
    var a=3
}</span>
<span class="hljs-title">aa</span><span class="hljs-params">(5)</span>
<span class="hljs-title">alert</span><span class="hljs-params">(a)</span>
<span class="hljs-comment">//5,0   在函数体内，参数a的优先级高于变量a</span>

------------分割线3------------------

<span class="hljs-title">var</span> <span class="hljs-title">a</span>=0;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">aa</span><span class="hljs-params">(a)</span><span class="hljs-comment">{
    alert(a)
    a=3
}</span>
<span class="hljs-title">aa</span><span class="hljs-params">(5)</span>
<span class="hljs-title">alert</span><span class="hljs-params">(a)</span>
<span class="hljs-comment">//5,0   在函数体内，执行alert(a)和a=3,修改的的并不是全局变量a，而是参数a</span>

------------分割线4------------------

<span class="hljs-title">var</span> <span class="hljs-title">a</span>=0;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">aa</span><span class="hljs-params">(a)</span><span class="hljs-comment">{
    alert(a)
    var a=3
    alert(a)
}</span>
<span class="hljs-title">aa</span><span class="hljs-params">(5)</span>
<span class="hljs-comment">//5,3</span>
<span class="hljs-comment">//这个我也有点不理解，请教网上的说法，有两个答案(小伙伴如果知道怎么理解，欢迎在评论上指点)</span>
<span class="hljs-comment">//1.参数优先级高于变量声明，所以 变量n的声明其实被忽略了，此时相当于</span>
<span class="hljs-comment">//var a=0;</span>
<span class="hljs-comment">//function aa(a){</span>
<span class="hljs-comment">//  var a=5;</span>
<span class="hljs-comment">//    alert(a)</span>
<span class="hljs-comment">//    a=3</span>
<span class="hljs-comment">//    alert(a)</span>
<span class="hljs-comment">//}</span>
<span class="hljs-comment">//aa(5)</span>

<span class="hljs-comment">//2.形参和局部变量优先级一样，此时相当于</span>
<span class="hljs-comment">//var a=0;</span>
<span class="hljs-comment">//function aa(a){</span>
<span class="hljs-comment">//  var a;    先声明</span>
<span class="hljs-comment">//  a=5      由于形参和变量名称一样，覆盖了！</span>
<span class="hljs-comment">//    alert(a)</span>
<span class="hljs-comment">//    a=3</span>
<span class="hljs-comment">//    alert(a)</span>
<span class="hljs-comment">//}</span>
<span class="hljs-comment">//aa(5)</span>

------------分割线5------------------

<span class="hljs-title">var</span> <span class="hljs-title">a</span>=0;</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">aa</span><span class="hljs-params">(a)</span><span class="hljs-comment">{
    alert(a)
    a=3
    alert(a)
}</span>
<span class="hljs-title">aa</span><span class="hljs-params">()</span>
<span class="hljs-title">alert</span><span class="hljs-params">(a)</span>
<span class="hljs-comment">//underfind  3  0 </span>
<span class="hljs-comment">//首先，参数优先级高于全局变量，由于没传参数，所以是underfind</span>
<span class="hljs-comment">//a=3，实际上修改的时形参a的值，并不是全局变量a，往下alert(a)也是形参a</span>
<span class="hljs-comment">//最后的alert(a)，你懂的</span>
</span></code></pre>
<h2 id="articleHeader4">3.递归</h2>
<h3 id="articleHeader5">3-1.费波纳茨数组</h3>
<p>这个不多说了，很简单，但是很经典。就是当前项等于前两项的和</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var arr=[];
for(var i=0;i<10;i++ ){
    i<=1?arr.push(1):arr.push(arr[i-1]+arr[i-2]);
}
console.log(arr)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> arr=[];
<span class="hljs-keyword">for</span>(<span class="hljs-built_in">var</span> i=<span class="hljs-number">0</span>;i&lt;<span class="hljs-number">10</span>;i++ ){
    i&lt;=<span class="hljs-number">1</span>?arr.<span class="hljs-built_in">push</span>(<span class="hljs-number">1</span>):arr.<span class="hljs-built_in">push</span>(arr[i-<span class="hljs-number">1</span>]+arr[i-<span class="hljs-number">2</span>]);
}
console.<span class="hljs-built_in">log</span>(arr)</code></pre>
<h3 id="articleHeader6">3-2.数据排列</h3>
<p>比如  123454321  23456765432<br>这个怎么做呢？当时我的做法的分两步写，先展示前面，再展示后面<br>代码是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//01234543210
//先展示前面的   01234
//n：开始的数字    m:结束的数字
function num1(n,m){
    for(var i=n;i<m;i++){
        //再展示后面的 543210
        console.log(i);
        if(i===m-1){
            num2(n,m)
        }
    }
}
function num2(n,m){
    for(var i=m;i>=n;i--){
        console.log(i)
    }
}
test(2,5)  //2345432" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//01234543210</span>
<span class="hljs-comment">//先展示前面的   01234</span>
<span class="hljs-comment">//n：开始的数字    m:结束的数字</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">num1</span>(<span class="hljs-params">n,m</span>)</span>{
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=n;i&lt;m;i++){
        <span class="hljs-comment">//再展示后面的 543210</span>
        <span class="hljs-built_in">console</span>.log(i);
        <span class="hljs-keyword">if</span>(i===m<span class="hljs-number">-1</span>){
            num2(n,m)
        }
    }
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">num2</span>(<span class="hljs-params">n,m</span>)</span>{
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=m;i&gt;=n;i--){
        <span class="hljs-built_in">console</span>.log(i)
    }
}
test(<span class="hljs-number">2</span>,<span class="hljs-number">5</span>)  <span class="hljs-comment">//2345432</span></code></pre>
<p>这样代码太多了，后来研究了这种</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function num(n,m){
    console.log(n);
    if(n<m){
        test(n+1,m);
        console.log(n);
    }
}
num(2,5)  //2345432" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">num</span>(<span class="hljs-params">n,m</span>)</span>{
    <span class="hljs-built_in">console</span>.log(n);
    <span class="hljs-keyword">if</span>(n&lt;m){
        test(n+<span class="hljs-number">1</span>,m);
        <span class="hljs-built_in">console</span>.log(n);
    }
}
num(<span class="hljs-number">2</span>,<span class="hljs-number">5</span>)  <span class="hljs-comment">//2345432</span></code></pre>
<p>解释如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.首先执行num(2,5)，就是
console.log(2); ->  test(3,5);  ->  console.log(2);      
//执行test(3,5);  就是是相当于   console.log(3); -> test(4,5); -> console.log(3); 下面以此类推
console.log(2); -> console.log(3); -> test(4,5); -> console.log(3); ->  console.log(2);  

然后就是

console.log(2); -> console.log(3); -> console.log(4); -> test(5,5); -> console.log(4); -> console.log(3); ->  console.log(2);

最后就是

console.log(2); -> console.log(3); -> console.log(4); -> console.log(5); -> console.log(4); -> console.log(3); ->  console.log(2);

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xl"><code><span class="hljs-number">1</span>.首先执行num(<span class="hljs-number">2</span>,<span class="hljs-number">5</span>)，就是
<span class="hljs-function"><span class="hljs-title">console</span>.<span class="hljs-built_in">log</span>(2); -&gt;</span>  <span class="hljs-function"><span class="hljs-title">test</span>(3,5);  -&gt;</span>  console.<span class="hljs-built_in">log</span>(<span class="hljs-number">2</span>);      
<span class="hljs-comment">//执行test(3,5);  就是是相当于   console.log(3); -&gt; test(4,5); -&gt; console.log(3); 下面以此类推</span>
<span class="hljs-function"><span class="hljs-title">console</span>.<span class="hljs-built_in">log</span>(2); -&gt;</span> <span class="hljs-function"><span class="hljs-title">console</span>.<span class="hljs-built_in">log</span>(3); -&gt;</span> <span class="hljs-function"><span class="hljs-title">test</span>(4,5); -&gt;</span> <span class="hljs-function"><span class="hljs-title">console</span>.<span class="hljs-built_in">log</span>(3); -&gt;</span>  console.<span class="hljs-built_in">log</span>(<span class="hljs-number">2</span>);  

然后就是

<span class="hljs-function"><span class="hljs-title">console</span>.<span class="hljs-built_in">log</span>(2); -&gt;</span> <span class="hljs-function"><span class="hljs-title">console</span>.<span class="hljs-built_in">log</span>(3); -&gt;</span> <span class="hljs-function"><span class="hljs-title">console</span>.<span class="hljs-built_in">log</span>(4); -&gt;</span> <span class="hljs-function"><span class="hljs-title">test</span>(5,5); -&gt;</span> <span class="hljs-function"><span class="hljs-title">console</span>.<span class="hljs-built_in">log</span>(4); -&gt;</span> <span class="hljs-function"><span class="hljs-title">console</span>.<span class="hljs-built_in">log</span>(3); -&gt;</span>  console.<span class="hljs-built_in">log</span>(<span class="hljs-number">2</span>);

最后就是

<span class="hljs-function"><span class="hljs-title">console</span>.<span class="hljs-built_in">log</span>(2); -&gt;</span> <span class="hljs-function"><span class="hljs-title">console</span>.<span class="hljs-built_in">log</span>(3); -&gt;</span> <span class="hljs-function"><span class="hljs-title">console</span>.<span class="hljs-built_in">log</span>(4); -&gt;</span> <span class="hljs-function"><span class="hljs-title">console</span>.<span class="hljs-built_in">log</span>(5); -&gt;</span> <span class="hljs-function"><span class="hljs-title">console</span>.<span class="hljs-built_in">log</span>(4); -&gt;</span> <span class="hljs-function"><span class="hljs-title">console</span>.<span class="hljs-built_in">log</span>(3); -&gt;</span>  console.<span class="hljs-built_in">log</span>(<span class="hljs-number">2</span>);

</code></pre>
<h2 id="articleHeader7">4.其它</h2>
<h3 id="articleHeader8">4-1</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo1()
{
 return {
     bar: &quot;hello&quot;
 };
}
 
function foo2()
{
 return
 {
     bar: &quot;hello&quot;
 };
}
var a=foo1();
var b=foo2();
console.log(a) //Object {bar: &quot;hello&quot;}
console.log(b) //underfind
//仔细看就知道了" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo1</span>(<span class="hljs-params"></span>)
</span>{
 <span class="hljs-keyword">return</span> {
     <span class="hljs-attr">bar</span>: <span class="hljs-string">"hello"</span>
 };
}
 
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo2</span>(<span class="hljs-params"></span>)
</span>{
 <span class="hljs-keyword">return</span>
 {
     <span class="hljs-attr">bar</span>: <span class="hljs-string">"hello"</span>
 };
}
<span class="hljs-keyword">var</span> a=foo1();
<span class="hljs-keyword">var</span> b=foo2();
<span class="hljs-built_in">console</span>.log(a) <span class="hljs-comment">//Object {bar: "hello"}</span>
<span class="hljs-built_in">console</span>.log(b) <span class="hljs-comment">//underfind</span>
<span class="hljs-comment">//仔细看就知道了</span></code></pre>
<h3 id="articleHeader9">4-2</h3>
<p>网上看到的题目，我自己改造下  <a href="http://www.jb51.net/article/109005.htm" rel="nofollow noreferrer" target="_blank">80%应聘者都不及格的JS面试题</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for (var i = 0; i < 5; i++) {
  console.log(i);
}
console.log(i);
//这个大家应该很快就知道了，012345



for (var i = 0; i < 5; i++) {
 setTimeout(function() {
  console.log(i);
 }, 1000);
}
console.log(i);
//这个大家就要小心一点了，答案是5    55555
//在setTimeout执行之前，for循环早就执行完了，i的值早已经是5了，所以一开始是执行，最后面的console.log(i);
//在for循环的时候一下子自定义5个setTimeout，大概一秒后，就是输出55555



for (var i = 0; i < 5; i++) {
 (function(j) { // j = i
  setTimeout(function() {
   console.log(j);
  }, 1000);
 })(i);
}
console.log(i); 
//这里的解析和上面基本一样，只是用闭包来记录每一次循环的i,
//所以答案是5     01234



var output = function (i) {
 setTimeout(function() {
  console.log(i);
 }, 1000);
};
 
for (var i = 0; i < 5; i++) {
 output(i); // 这里传过去的 i 值被复制了
}
console.log(i);

//这里的解析和上面基本一样，把i当参数传进output，记录每一次循环的i,
//所以答案是5     01234



for (let i = 0; i < 5; i++) {
 setTimeout(function() {
  console.log(i);
 }, 1000);
}
console.log(i);
//结果是  报错   01234 
//注意i是用let定义的，不是var" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">5</span>; i++) {
  <span class="hljs-built_in">console</span>.log(i);
}
<span class="hljs-built_in">console</span>.log(i);
<span class="hljs-comment">//这个大家应该很快就知道了，012345</span>



<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">5</span>; i++) {
 setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(i);
 }, <span class="hljs-number">1000</span>);
}
<span class="hljs-built_in">console</span>.log(i);
<span class="hljs-comment">//这个大家就要小心一点了，答案是5    55555</span>
<span class="hljs-comment">//在setTimeout执行之前，for循环早就执行完了，i的值早已经是5了，所以一开始是执行，最后面的console.log(i);</span>
<span class="hljs-comment">//在for循环的时候一下子自定义5个setTimeout，大概一秒后，就是输出55555</span>



<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">5</span>; i++) {
 (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">j</span>) </span>{ <span class="hljs-comment">// j = i</span>
  setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
   <span class="hljs-built_in">console</span>.log(j);
  }, <span class="hljs-number">1000</span>);
 })(i);
}
<span class="hljs-built_in">console</span>.log(i); 
<span class="hljs-comment">//这里的解析和上面基本一样，只是用闭包来记录每一次循环的i,</span>
<span class="hljs-comment">//所以答案是5     01234</span>



<span class="hljs-keyword">var</span> output = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">i</span>) </span>{
 setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(i);
 }, <span class="hljs-number">1000</span>);
};
 
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">5</span>; i++) {
 output(i); <span class="hljs-comment">// 这里传过去的 i 值被复制了</span>
}
<span class="hljs-built_in">console</span>.log(i);

<span class="hljs-comment">//这里的解析和上面基本一样，把i当参数传进output，记录每一次循环的i,</span>
<span class="hljs-comment">//所以答案是5     01234</span>



<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">5</span>; i++) {
 setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(i);
 }, <span class="hljs-number">1000</span>);
}
<span class="hljs-built_in">console</span>.log(i);
<span class="hljs-comment">//结果是  报错   01234 </span>
<span class="hljs-comment">//注意i是用let定义的，不是var</span></code></pre>
<h2 id="articleHeader10">5.小结</h2>
<p>首先，要说一个就是这些是我自己遇到的题目里面，印象比较深刻的一些题目，并不一定是常见的题目。<br>然后，这篇文章可以说是我的一个笔记，记录着我遇到过的题目。我发这样的面试题文章给小伙伴看，目的不是为了让小伙伴们记住题目和答案，或者是应付面试，这样没有意义，也不现实！我的目的是为了让大家可以学习一下，通过题目来知道一些原理和运行的机制，或者是知道一些可能的‘陷阱’。<br>另外，我遇到过的实际的操作题也很多，比如<strong><code>数组去重，打乱数组，统计数组各个元素出现的次数， 字符串各个字符的出现次数，获取地址链接的各个参数</code></strong>等等。这些题目不仅在面试题出现的比较多，在实际项目开发也会经常用到，小伙伴可以自己学习。当然我自己也有封装过一些函数，就是实现上面说的那些操作的函数，这个我近期也会写文章，记录我封装过哪些函数，封装过哪些常用的功能，到时候再分享。有什么需要改正的，或者好的建议，也欢迎指出！</p>
<p>-------------------------华丽的分割线--------------------<br>想了解更多，关注关注我的微信公众号：守候书阁</p>
<p><span class="img-wrap"><img data-src="/img/bV1Cv6?w=258&amp;h=258" src="https://static.alili.tech/img/bV1Cv6?w=258&amp;h=258" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
让我印象深刻的javascript面试题

## 原文链接
[https://segmentfault.com/a/1190000010114505](https://segmentfault.com/a/1190000010114505)

