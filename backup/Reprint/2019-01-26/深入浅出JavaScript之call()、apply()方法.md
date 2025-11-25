---
title: '深入浅出JavaScript之call()、apply()方法' 
date: 2019-01-26 2:30:18
hidden: true
slug: kua59l3f1qo
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">写在前面：</h2>
<p>隔了很长时间了，也不知道写点什么。最近一直在研究ES6，一直想写出来的文章能对初学者或者是在学习JS路上有所帮助的。这就是我的初衷。</p>
<h2 id="articleHeader1">call、apply的作用</h2>
<p><strong>在JavaScript中，call()方法和apply()方法都是为了改变函数运行时上下文而存在的，换句话说：就是为了改变函数体内部 this 的指向。</strong><br>在JavaScript中，也可以说再OOP JavaScript思想编程中，其实最绕的地方就是：<strong>函数被定义时的上下文、运行时的上下文、上下文的改变。</strong></p>
<p>我们先来定义一个构造函数(constructor)然后改变指向：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Fn() {}

Fn.prototype = {
    color:'red',
    say:function () {
        alert(this.color);
    }
};

var fn = new Fn();
fn.say();       //返回red" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Fn</span><span class="hljs-params">()</span> </span>{}

Fn.prototype = {
    color:<span class="hljs-string">'red'</span>,
    say:<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
        alert(<span class="hljs-keyword">this</span>.color);
    }
};

<span class="hljs-keyword">var</span> fn = <span class="hljs-keyword">new</span> Fn();
fn.say();       <span class="hljs-comment">//返回red</span></code></pre>
<p>这是一个很普通的构造函数，给原型new了一个新的对象，然后添加一个属性和方法。那么我们如果要再创建一个对象呢，不想给这个新的对象添加方法怎么去公用上面这个方法呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var Fn1 = {
    color:'yellow'
};

var fn = new Fn();
fn.say.call(Fn1);    //使用call()方法返回yellow
fn.say.apply(Fn1);   //使用apply()方法返回yellow" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code> var Fn1 = {
    color:'yellow'
};

var <span class="hljs-function"><span class="hljs-keyword">fn</span> = <span class="hljs-keyword">new</span> <span class="hljs-keyword">Fn</span><span class="hljs-params">()</span></span>;
<span class="hljs-function"><span class="hljs-keyword">fn</span>.say.<span class="hljs-keyword">call</span><span class="hljs-params">(Fn1)</span></span>;    <span class="hljs-comment">//使用call()方法返回yellow</span>
<span class="hljs-function"><span class="hljs-keyword">fn</span>.say.apply<span class="hljs-params">(Fn1)</span></span>;   <span class="hljs-comment">//使用apply()方法返回yellow</span></code></pre>
<p>所以，可以看出 call()和 apply()是为了动态改变 this 而出现的，当一个对象(Object)没有这个方法，但是其他的Fn原型里面有这个方法，我们可以借助call或apply用其它对象的方法来操作。<br>大家是不是感觉这个call()和apply()没什么差距对吧？</p>
<h2 id="articleHeader2">call()方法与apply()方法的差别</h2>
<p>对于使用者而言，call与apply的作用完全一样，不过它们接受的参数不一样：<br><strong>call()方法中的其余的参数必须直接传给函数</strong><br><strong>apply()接收两个参数：一个参数是在其中运行的作用域,另一个是参数数组(可以是Array实例,也可以是arguments对象).</strong><br>也可以理解为其实call传参为固定的必须知道你有多少个参数传进去，而apply可以传一个数组。</p>
<p><strong>当明确知道传参数量时使用call()而不确定的时候使用apply()方法然后把参数push进数组传递进去，函数内部也可以通过 arguments 这个数组来遍历所有的参数。</strong></p>
<h2 id="articleHeader3">深入理解call与apply</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function box(msg)　{
    alert(msg);
}
box(1); //1
box(1,2); //1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">box</span><span class="hljs-params">(msg)</span>　<span class="hljs-comment">{
    alert(msg);
}</span>
<span class="hljs-title">box</span><span class="hljs-params">(1)</span>;</span> <span class="hljs-comment">//1</span>
box(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>); <span class="hljs-comment">//1</span></code></pre>
<p>上面的这个函数就是没有确定实参数量，这个时候就可以考虑使用call或者apply，刚刚讲过，只有apply在不确定的数量的时候使用最佳。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function&nbsp;box(){
&nbsp;console.log.apply(console,arguments);
};
box(1);&nbsp;//1
box(1,2);&nbsp;//1 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span>&nbsp;<span class="hljs-title">box</span>(<span class="hljs-params"></span>)</span>{
&nbsp;<span class="hljs-built_in">console</span>.log.apply(<span class="hljs-built_in">console</span>,<span class="hljs-built_in">arguments</span>);
};
box(<span class="hljs-number">1</span>);&nbsp;<span class="hljs-comment">//1</span>
box(<span class="hljs-number">1</span>,<span class="hljs-number">2</span>);&nbsp;<span class="hljs-comment">//1 2</span></code></pre>
<p>这一章差不多就讲完了，其实要点没多少知识点，主要就是充分掌握了技巧与思想，JavaScript就会变的很容易。欢迎前端大牛纠正错误，如有错误我会及时改正。谢谢~</p>
<p><em>(PS:其实一直不知道写什么，所以这么长时间没更新，如果大家想看JS哪些方面的，在我了解与掌握的前提下还是可以写一写的。我的邮箱:cn_brian@163.com)</em></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入浅出JavaScript之call()、apply()方法

## 原文链接
[https://segmentfault.com/a/1190000008354485](https://segmentfault.com/a/1190000008354485)

