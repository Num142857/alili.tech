---
title: '从一道面试题谈谈函数柯里化(Currying)' 
date: 2019-01-27 2:31:00
hidden: true
slug: vllfqz31zr
categories: [reprint]
---

{{< raw >}}

                    
<p>　　欢迎大家再一次来到我的文章专栏:<a href="https://mrerhu.github.io/categories/%E4%BB%8E%E9%9D%A2%E8%AF%95%E9%A2%98%E4%B8%AD%E6%88%91%E4%BB%AC%E8%83%BD%E5%AD%A6%E5%88%B0%E4%BB%80%E4%B9%88/" rel="nofollow noreferrer" target="_blank"><strong>从面试题中我们能学到什么</strong></a>，各位同行小伙伴是否已经开始了悠闲的春节假期呢?在这里提前祝大家鸡年大吉吧~哈哈，之前有人说，学面试题不会有什么长进，其实我觉得这个就像是我们英语考试中的阅读理解，带着问题去看文章反而更有利于自己的学习。<br>　　之前的两篇文章:</p>
<ul>
<li><p><a href="https://segmentfault.com/a/1190000007979730">一道颇有难度的JavaScript题</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000007964935" target="_blank">一个小小的JavaScript题目</a></p></li>
</ul>
<p>都在稀土掘金和Segmentfault都获得了非常多的点击量，没有看的小伙伴们可以点击了解一下，今天为大家带来一道关于闭包和函数的柯里化方面的编程题目，各位小伙伴有没有开始跃跃欲试呢？<br>　　编程题目的要求如下，完成<code>plus</code>函数，通过全部的测试用例。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict';
function plus(n){
  
}
module.exports = plus" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">'use strict'</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">plus</span>(<span class="hljs-params">n</span>)</span>{
  
}
<span class="hljs-built_in">module</span>.exports = plus</code></pre>
<p>测试用例如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict';
var assert = require('assert')

var plus = require('../lib/assign-4')

describe('闭包应用',function(){
  it('plus(0) === 0',function(){
    assert.equal(0,plus(0).toString())
  })
  it('plus(1)(1)(2)(3)(5) === 12',function(){
    assert.equal(12,plus(1)(1)(2)(3)(5).toString())
  })
  it('plus(1)(4)(2)(3) === 10',function(){
    assert.equal(10,plus(1)(4)(2)(3).toString())
  })
  it('方法引用',function(){
    var plus2 = plus(1)(1)
    assert.equal(12,plus2(1)(4)(2)(3).toString())
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">'use strict'</span>;
<span class="hljs-keyword">var</span> assert = <span class="hljs-built_in">require</span>(<span class="hljs-string">'assert'</span>)

<span class="hljs-keyword">var</span> plus = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../lib/assign-4'</span>)

describe(<span class="hljs-string">'闭包应用'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  it(<span class="hljs-string">'plus(0) === 0'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    assert.equal(<span class="hljs-number">0</span>,plus(<span class="hljs-number">0</span>).toString())
  })
  it(<span class="hljs-string">'plus(1)(1)(2)(3)(5) === 12'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    assert.equal(<span class="hljs-number">12</span>,plus(<span class="hljs-number">1</span>)(<span class="hljs-number">1</span>)(<span class="hljs-number">2</span>)(<span class="hljs-number">3</span>)(<span class="hljs-number">5</span>).toString())
  })
  it(<span class="hljs-string">'plus(1)(4)(2)(3) === 10'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    assert.equal(<span class="hljs-number">10</span>,plus(<span class="hljs-number">1</span>)(<span class="hljs-number">4</span>)(<span class="hljs-number">2</span>)(<span class="hljs-number">3</span>).toString())
  })
  it(<span class="hljs-string">'方法引用'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> plus2 = plus(<span class="hljs-number">1</span>)(<span class="hljs-number">1</span>)
    assert.equal(<span class="hljs-number">12</span>,plus2(<span class="hljs-number">1</span>)(<span class="hljs-number">4</span>)(<span class="hljs-number">2</span>)(<span class="hljs-number">3</span>).toString())
  })
})</code></pre>
<p>　　实话说刚开始拿到这道题的时候我并没有完全的做出来，但是具体的思路是有的，肯定是关于函数的柯里化(Currying)方面的，应该是想考察一下面试者的闭包理解能力.<br>　　那么首先介绍一下什么是函数的柯里化(Currying)。《JavaScript忍者秘籍》一书中，对于柯里化的定义如下：<br>　　</p>
<blockquote><p>在一个函数中首先填充几个参数(然后再返回一个新函数)的技术称为柯里化(Currying。</p></blockquote>
<p>维基百科中关于其定义如下：</p>
<blockquote><p>在计算机科学中，柯里化（Currying），又译为卡瑞化或加里化，是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。这个技术由克里斯托弗·斯特雷奇以逻辑学家哈斯凯尔·加里命名的。</p></blockquote>
<p>　　首先我们举个例子来具体的解释一下以上的概念。<br>　　例如一个最简单的加法函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//函数定义
function add(x,y){
    return x + y;
}
//函数调用
add(3,4);//5" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//函数定义</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params">x,y</span>)</span>{
    <span class="hljs-keyword">return</span> x + y;
}
<span class="hljs-comment">//函数调用</span>
add(<span class="hljs-number">3</span>,<span class="hljs-number">4</span>);<span class="hljs-comment">//5</span></code></pre>
<p>　　如果采用柯里化是怎样将接受两个参数的函数变成接受单一参数的函数呢，其实很简单如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//函数表达式定义
var add = function(x){
    return function(y){
        return x + y;
    }
};
//函数调用
add(3)(4);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//函数表达式定义</span>
<span class="hljs-keyword">var</span> add = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">x</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">y</span>)</span>{
        <span class="hljs-keyword">return</span> x + y;
    }
};
<span class="hljs-comment">//函数调用</span>
add(<span class="hljs-number">3</span>)(<span class="hljs-number">4</span>);</code></pre>
<p>　　这样理解起来其实是不是就很简单了，其实实质利用的就是闭包的概念(大家可以在我的另一篇文章<a href="https://mrerhu.github.io/2016/12/21/%E6%B5%85%E8%B0%88JavaScript%E9%97%AD%E5%8C%85/" rel="nofollow noreferrer" target="_blank">浅谈JavaScript闭包</a>看一下)。本质上讲柯里化(Currying)只是一个理论模型，柯里化所要表达是:如果你固定某些参数，你将得到接受余下参数的一个函数,所以对于有两个变量的函数<code>y^x</code>，如果固定了<code>y=2</code>，则得到有一个变量的函数<code>2^x</code>。这就是求值策略中的部分求值策略。<br>　　柯里化(Currying)具有：延迟计算、参数复用、动态生成函数的作用。例如如果我们需要创建一个通用的DOM事件绑定函数，不使用柯里化的写法如下(该示例来自于博客园<a href="https://home.cnblogs.com/u/zztt/" rel="nofollow noreferrer" target="_blank">Tong Zeng</a>)：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//第四个参数用来标识是在冒泡阶段还是在捕获阶段执行函数
var addEvent = function(el,type,fn,capture){
    if (window.addEventListener) {
         el.addEventListener(type, function(e) {
             fn.call(el, e);
         }, capture);
     } else if (window.attachEvent) {
         el.attachEvent(&quot;on&quot; + type, function(e) {
             fn.call(el, e);
         });
     } 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//第四个参数用来标识是在冒泡阶段还是在捕获阶段执行函数</span>
<span class="hljs-keyword">var</span> addEvent = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">el,type,fn,capture</span>)</span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.addEventListener) {
         el.addEventListener(type, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
             fn.call(el, e);
         }, capture);
     } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-built_in">window</span>.attachEvent) {
         el.attachEvent(<span class="hljs-string">"on"</span> + type, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
             fn.call(el, e);
         });
     } 
}</code></pre>
<p>　　但是在使用了柯里化(Currying)的情况下，不再需要每次添加事件处理都要执行一遍<code>if...else...</code>判断，只需要在浏览器中判定一次就可以了，把根据一次判定之后的结果动态生成新的函数，以后就不必重新计算。其实在实际使用中使用最多的一个柯里化的例子就是<code>Function.prototype.bind()</code>函数，我们也一并给出一个较为简单的<code>Function.prototype.bind()</code>函数的实现方式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.prototype.bind = function(){
    var fn = this;
    var args = Array.prototye.slice.call(arguments);
    var context = args.shift();

    return function(){
        return fn.apply(context,
            args.concat(Array.prototype.slice.call(arguments)));
    };
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">Function</span>.prototype.bind = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> fn = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">var</span> args = <span class="hljs-built_in">Array</span>.prototye.slice.call(<span class="hljs-built_in">arguments</span>);
    <span class="hljs-keyword">var</span> context = args.shift();

    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> fn.apply(context,
            args.concat(<span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>)));
    };
};</code></pre>
<p>　　回到我们的题目本身，其实根据测试用例我们可以发现，<code>plus</code>函数的要求就是接受单一函数，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plus(1)(4)(2)(3).toString()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">plus(<span class="hljs-number">1</span>)(<span class="hljs-number">4</span>)(<span class="hljs-number">2</span>)(<span class="hljs-number">3</span>).toString()</code></pre>
<p>但是与柯里化不同之处在于，柯里化返回的一个新函数。我们观察其实最后的求值是通过<code>toString</code>函数得到的，那么我们就很容易想到，我们可以给返回的函数增加一个<code>toString</code>属性就可以了。我自己写出的答案如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * Created by lei.wang on 2017/1/22.
 */

'use strict';

function plus(num) {
    var adder = function () {
        var _args = [];
        var _adder = function _adder() {
            [].push.apply(_args, [].slice.call(arguments));
            return _adder;
        };

        _adder.toString = function () {
            return _args.reduce(function (a, b) {
                return a + b;
            });
        }

        return _adder;
    }
    return adder()(num);
}

module.exports = plus;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
 * Created by lei.wang on 2017/1/22.
 */</span>
<span class="hljs-meta">
'use strict'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">plus</span>(<span class="hljs-params">num</span>) </span>{
    <span class="hljs-keyword">var</span> adder = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> _args = [];
        <span class="hljs-keyword">var</span> _adder = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">_adder</span>(<span class="hljs-params"></span>) </span>{
            [].push.apply(_args, [].slice.call(<span class="hljs-built_in">arguments</span>));
            <span class="hljs-keyword">return</span> _adder;
        };

        _adder.toString = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> _args.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">a, b</span>) </span>{
                <span class="hljs-keyword">return</span> a + b;
            });
        }

        <span class="hljs-keyword">return</span> _adder;
    }
    <span class="hljs-keyword">return</span> adder()(num);
}

<span class="hljs-built_in">module</span>.exports = plus;</code></pre>
<p>　　运行一下,通过全部的测试用例，需要注意的是由于题目的要求运行在严格模式下，所以我们在<code>_adder</code>函数内部是不能引用<code>arguments.callee</code>，这时我们采用的方法是给函数表达式中函数本身起名<code>_adder</code>，这样就解决的这个问题。<br>　　再次感谢大家阅读本篇文章，希望大家能从中或多或少学到一些东西，入行资历甚浅，不足之处请多指教，欢迎大家在去我的博客<a href="https://mrerhu.github.io/" rel="nofollow noreferrer" target="_blank">MrErHu</a>中留言打赏，愿大家一同进步。<br>　　<span class="img-wrap"><img data-src="/img/remote/1460000008193610?w=1386&amp;h=1026" src="https://static.alili.tech/img/remote/1460000008193610?w=1386&amp;h=1026" alt="此处输入图片的描述" title="此处输入图片的描述" style="cursor: pointer; display: inline;"></span><br>　　</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从一道面试题谈谈函数柯里化(Currying)

## 原文链接
[https://segmentfault.com/a/1190000008193605](https://segmentfault.com/a/1190000008193605)

