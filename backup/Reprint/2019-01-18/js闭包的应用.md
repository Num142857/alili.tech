---
title: 'js闭包的应用' 
date: 2019-01-18 2:30:35
hidden: true
slug: 9g6lf2mn3to
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>之前发了一篇文章，写了一些对于闭包的理解。现在补上闭包的应用篇，(很惭愧因为严重的拖延症一直拖到现在)。本文主要分享一些常见的闭包用法和分析，也希望能增加对闭包的理解。</p>
<h1 id="articleHeader1">简单回顾</h1>
<p>在之前的文章里，讲解了闭包的原理，如果忘记了可以<a href="https://segmentfault.com/a/1190000007376061%5D(">点击这里</a>再看一下，在这里我们简单回顾一些知识点：</p>
<ul>
<li><p>闭包的本质是一个函数</p></li>
<li><p>闭包可以访问函数内部变量</p></li>
<li><p>闭包的存在会使内部变量保留在内存中</p></li>
</ul>
<h1 id="articleHeader2">闭包的应用</h1>
<p>闭包常见的用法，就将围绕这些特点展开：</p>
<h2 id="articleHeader3">1.模仿块级作用域</h2>
<p>首先简单举个例子来，解释一下什么是块级作用域：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function A(num) {
    for (var i = 0; i < num; i++) {
      num++;
    }
    console.log(i)
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs matlab"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span><span class="hljs-params">(num)</span> {</span>
    <span class="hljs-keyword">for</span> (var <span class="hljs-built_in">i</span> = <span class="hljs-number">0</span>; <span class="hljs-built_in">i</span> &lt; num; <span class="hljs-built_in">i</span>++) {
      num++;
    }
    console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">i</span>)
  }</code></pre>
<p>在这个简单的函数中，<code>变量i</code>是在<code>for</code>循环中定义的，如果是在C++或者Java中，这样定义的变量，一旦循环结束，变量也就随之销毁，i的作用范围只在循环这个小块，就称为<strong>块级作用域</strong>。在javascript中，没有这样的块级作用域，前面一篇文章已经提到，<strong>变量是定义在函数的活动对象中</strong>的，因此，从定义<code>i</code>开始，在函数内部可以随时访问它。<br>这样的坏处显而易见：<strong>由于javascript不会告诉你变量是否已经被声明，容易造成命名冲突，如果是在全局环境定义的变量，就会污染全局环境</strong>，因此可以利用闭包特性来模拟块级作用域。不过在此之前要先介绍另一个知识点：<strong>匿名立即执行函数</strong>。如果已经比较熟悉的同学可以直接跳过这一块：</p>
<h3 id="articleHeader4">匿名立即执行函数</h3>
<p>首先举个例子(我比较喜欢举例，感觉看例子比较更容易理解)：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var helloWorld = function(){
    alert('Hello world')
}
helloWorld();//执行函数" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> helloWorld = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    alert(<span class="hljs-string">'Hello world'</span>)
}
helloWorld();<span class="hljs-comment">//执行函数</span></code></pre>
<p>上面的简短代码一共就做两件事：1.定义了一个<strong>匿名函数</strong>并赋值给<code>helloWorld</code>；2.在<code>helloWorld</code>后面加括号表示调用函数，所以 匿名函数如果直接执行，是不是应该这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function(){
    alert('Hello world')
}()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    alert(<span class="hljs-string">'Hello world'</span>)
}()</code></pre>
<p>这样的写法会报错，因为在javascript中，function是函数声明的标志，不允许在后面直接加括号，而应该写成这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(){
    //函数体
    alert('Hello world')
})()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>(<span class="hljs-name">function</span>(){
    //函数体
    alert(<span class="hljs-name">'Hello</span> world')
})()</code></pre>
<p>也就是把声明部分加括号即可，加了括号以后，这一段代码就相当于执行了里面的函数体部分，但是此时内部的变量已经不能被外部访问，请看下面详细样例</p>
<h3 id="articleHeader5">具体实现</h3>
<p>现在我们讲模拟块级作用域的具体步骤，假设还是针对前面的<code>A函数</code>，如果我们想让i变量只有块级作用域，可以这样写:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function A(num) {
    //核心代码
   (funnction(){
    for(var i = 0; i<num; i++) {
      num++;
    }
    })()
    //核心代码结束
    console.log(i)//underfined
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">A</span>(<span class="hljs-params">num</span>) </span>{
    <span class="hljs-comment">//核心代码</span>
   (funnction(){
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i&lt;num; i++) {
      num++;
    }
    })()
    <span class="hljs-comment">//核心代码结束</span>
    <span class="hljs-built_in">console</span>.log(i)<span class="hljs-comment">//underfined</span>
  }</code></pre>
<p>注意看核心代码部分，我们用刚刚讲到的匿名自执行函数在内部形成了一个<strong>闭包</strong>，这个闭包在哪呢？一直强调，<strong>闭包的本质是函数</strong>，其实在这里闭包就是那个匿名函数，这个闭包可以到<code>函数A</code>内部的活动变量，又能保证自己内部的变量<strong>在自执行后直接销毁</strong>，这个应该不难理解了</p>
<h3 id="articleHeader6">优点分析</h3>
<p>这种写法的经常用在全局环境中，可以避免添加太多的全局变量和全局函数，特别是多人合作开发的时候，可以减少因此产生的命名冲突等，避免污染全局环境。</p>
<h2 id="articleHeader7">2.存储变量</h2>
<p>我们知道闭包的另一个特点是可以保存外部函数的变量，原理是<strong>基于javascript中函数作用域链的特点，内部函数保留了对外部函数的活动变量的引用，所以变量不会被释放</strong>（这一块没有理解清楚的请看前一篇文章，里面讲的比较详细），然后我们再来愉快地举例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function B(){
    var x = 100;
    return {
        function(){
            return x
        }
    }
}
var m = B()//运行B函数，生成活动变量 x被m引用" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">B</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">var</span> x = <span class="hljs-number">100</span>;
    <span class="hljs-keyword">return</span> {
        <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
            <span class="hljs-keyword">return</span> x
        }
    }
}
<span class="hljs-keyword">var</span> m = B()<span class="hljs-comment">//运行B函数，生成活动变量 x被m引用</span></code></pre>
<p>这是前文介绍过的一个最简单的闭包例子，我们运行<code>B函数</code>，返回值就是B内部的匿名函数，此时m引用了变量x，所以B执行后x不会被释放，利用这一点，我们可以把比较重要或者计算耗费很大的值存在x中，只需要第一次计算赋值后，就可以通过m函数引用x的值，不必重复计算，同时也不容易被修改</p>
<h3 id="articleHeader8">优点分析</h3>
<p>这种写法可能会用在把一些不经常变动，但是计算比较复杂的值保存起来，就可以节省每次访问的时间。</p>
<h2 id="articleHeader9">3.封装私有变量</h2>
<p>javascript中没有私有成员的概念，我们可以把函数当做一个范围，函数内的变量就是私有变量，在外部无法引用，比如:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function C(a,b){
    var c = a - b ;
    return c
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">C</span><span class="hljs-params">(a,b)</span></span>{
    <span class="hljs-keyword">var</span> c = a - b ;
    <span class="hljs-keyword">return</span> c
}</code></pre>
<p>在这个函数中，a b c都是私有变量，在外部无法访，利用闭包的特点，我们可以就可以创建可以访问私有变量的方法:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Person(){
    var name = 'default';
    this.getName:function(){
        return name;
    }
    this,setName:function(value){
        name = value;
    }
}
console.log(Person.getName())//default
console.log(Person.setName('mike'))
console.log(Person.getName())//mike" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Person</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> name = <span class="hljs-string">'default'</span>;
    <span class="hljs-keyword">this</span>.getName:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> name;
    }
    <span class="hljs-keyword">this</span>,<span class="hljs-attr">setName</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">value</span>)</span>{
        name = value;
    }
}
<span class="hljs-built_in">console</span>.log(Person.getName())<span class="hljs-comment">//default</span>
<span class="hljs-built_in">console</span>.log(Person.setName(<span class="hljs-string">'mike'</span>))
<span class="hljs-built_in">console</span>.log(Person.getName())<span class="hljs-comment">//mike</span></code></pre>
<p>在这个例子中，设置了两个闭包函数来操作<code>Person函数内部的name变量</code>,除了这两个函数，在外部无法再访问到name变量，name也就相当于是私有成员。在这个例子中，我们用的是在构造函数中定义公有方法，对于所有的Person实例，都分别创建了新的办法，当然还可以使用其他形式来避免这个问题，要涉及到创建对象模式的一些知识，在这里说明怕反而增加了闭包的理解难度，之后在写对象和继承的时候再提到(下一次更新一定不会这样久了QAQ)。</p>
<h1 id="articleHeader10">小结</h1>
<p>关于闭包的主要主要应用就讲到这里，本文中很多知识点与上一篇文章有关，又因为发布相隔时间比较长（我的锅），建议大家可以先看看上一篇复习一下，这篇相对来前一篇容易理解，而且在举例过程尽量没有加入其它的疑难知识点，希望能对看到的人有所帮助。以上内容属于个人见解，如果有不同意见，欢迎指出和探讨。同时，码字不易请尊重作者的版权，转载请注明出处，如作商用，请与作者联系，感谢！</p>
<h1 id="articleHeader11">补充</h1>
<p>如果看完对您有帮助，顺手点个推荐呗~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
js闭包的应用

## 原文链接
[https://segmentfault.com/a/1190000008681174](https://segmentfault.com/a/1190000008681174)

