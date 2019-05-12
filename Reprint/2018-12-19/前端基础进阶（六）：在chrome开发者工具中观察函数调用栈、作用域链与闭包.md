---
title: '前端基础进阶（六）：在chrome开发者工具中观察函数调用栈、作用域链与闭包' 
date: 2018-12-19 2:30:08
hidden: true
slug: wqz8mzmdu1d
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000008404321" src="https://static.alili.tech/img/remote/1460000008404321" alt="配图与本文无关" title="配图与本文无关" style="cursor: pointer; display: inline;"></span></p>
<p>在前端开发中，有一个非常重要的技能，叫做<strong>断点调试</strong>。</p>
<p>在chrome的开发者工具中，通过断点调试，我们能够非常方便的一步一步的观察JavaScript的执行过程，直观感知函数调用栈，作用域链，变量对象，闭包，this等关键信息的变化。因此，断点调试对于快速定位代码错误，快速了解代码的执行过程有着非常重要的作用，这也是我们前端开发者必不可少的一个高级技能。</p>
<p>当然如果你对JavaScript的这些基础概念（执行上下文，变量对象，闭包，this等）了解还不够的话，想要透彻掌握断点调试可能会有一些困难。但是好在在前面几篇文章，我都对这些概念进行了详细的概述，因此要掌握这个技能，对大家来说，应该是比较轻松的。</p>
<p>这篇文章的主要目的在于借助对于断点调试的学习，来进一步加深对闭包的理解。</p>
<h5>一、基础概念回顾</h5>
<p>函数在被调用执行时，会创建一个当前函数的执行上下文。在该执行上下文的创建阶段，变量对象、作用域链、闭包、this指向会分别被确定。而一个JavaScript程序中一般来说会有多个函数，JavaScript引擎使用函数调用栈来管理这些函数的调用顺序。函数调用栈的调用顺序与栈数据结构一致。</p>
<h5>二、认识断点调试工具</h5>
<p>在尽量新版本的chrome浏览器中（不确定你用的老版本与我的一致），调出chrome浏览器的开发者工具。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="浏览器右上角竖着的三点 -> 更多工具 -> 开发者工具 -> Sources" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">浏览器右上角竖着的三点 -&gt; 更多工具 -&gt; 开发者工具 -&gt; Sources</code></pre>
<p>界面如图。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008404322" src="https://static.alili.tech/img/remote/1460000008404322" alt="断点调试界面" title="断点调试界面" style="cursor: pointer; display: inline;"></span></p>
<p>在我的demo中，我把代码放在app.js中，在index.html中引入。我们暂时只需要关注截图中红色箭头的地方。在最右侧上方，有一排图标。我们可以通过使用他们来控制函数的执行顺序。从左到右他们依次是：</p>
<ul>
<li>resume/pause script execution<br>恢复/暂停脚本执行</li>
<li><strong>step over next function call</strong></li>
</ul>
<p>跨过，实际表现是不遇到函数时，执行下一步。遇到函数时，不进入函数直接执行下一步。</p>
<ul><li><strong>step into next function call</strong></li></ul>
<p>跨入，实际表现是不遇到函数时，执行下一步。遇到到函数时，进入函数执行上下文。</p>
<ul><li><strong>step out of current function</strong></li></ul>
<p>跳出当前函数</p>
<ul><li>deactivate breakpoints</li></ul>
<p>停用断点</p>
<ul><li>don‘t pause on exceptions</li></ul>
<p>不暂停异常捕获</p>
<p>其中跨过，跨入，跳出是我使用最多的三个操作。</p>
<p>上图右侧第二个红色箭头指向的是函数调用栈（call Stack），这里会显示代码执行过程中，调用栈的变化。</p>
<p>右侧第三个红色箭头指向的是作用域链（Scope），这里会显示当前函数的作用域链。其中Local表示当前的局部变量对象，Closure表示当前作用域链中的闭包。借助此处的作用域链展示，我们可以很直观的判断出一个例子中，到底谁是闭包，对于闭包的深入了解具有非常重要的帮助作用。</p>
<h5>三、断点设置</h5>
<p>在显示代码行数的地方点击，即可设置一个断点。断点设置有以下几个特点：</p>
<ul>
<li>在单独的变量声明(如果没有赋值)，函数声明的那一行，无法设置断点。</li>
<li>设置断点后刷新页面，JavaScript代码会执行到断点位置处暂停执行，然后我们就可以使用上边介绍过的几个操作开始调试了。</li>
<li>当你设置多个断点时，chrome工具会自动判断从最早执行的那个断点开始执行，因此我一般都是设置一个断点就行了。</li>
</ul>
<h5>四、实例</h5>
<p>接下来，我们借助一些实例，来使用断点调试工具，看一看，我们的demo函数，在执行过程中的具体表现。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// demo01

var fn;
function foo() {
    var a = 2;
    function baz() {
        console.log( a );
    }
    fn = baz;
}
function bar() {
    fn();
}

foo();
bar(); // 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// demo01</span>

<span class="hljs-keyword">var</span> fn;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> a = <span class="hljs-number">2</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">baz</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log( a );
    }
    fn = baz;
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
    fn();
}

foo();
bar(); <span class="hljs-comment">// 2</span></code></pre>
<p>在向下阅读之前，我们可以停下来思考一下，这个例子中，谁是闭包？</p>
<p>这是来自《你不知道的js》中的一个例子。由于在使用断点调试过程中，发现chrome浏览器理解的闭包与该例子中所理解的闭包不太一致，因此专门挑出来，供大家参考。我个人更加倾向于chrome中的理解。</p>
<ul><li>第一步：设置断点，然后刷新页面。</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008404323" src="https://static.alili.tech/img/remote/1460000008404323" alt="设置断点" title="设置断点" style="cursor: pointer;"></span></p>
<ul><li>第二步：点击上图红色箭头指向的按钮（step into），该按钮的作用会根据代码执行顺序，一步一步向下执行。在点击的过程中，我们要注意观察下方call stack 与 scope的变化，以及函数执行位置的变化。</li></ul>
<p>一步一步执行，当函数执行到上例子中<br><span class="img-wrap"><img data-src="/img/remote/1460000008404324" src="https://static.alili.tech/img/remote/1460000008404324" alt="baz函数被调用执行，foo形成了闭包" title="baz函数被调用执行，foo形成了闭包" style="cursor: pointer; display: inline;"></span></p>
<p>我们可以看到，在chrome工具的理解中，由于在foo内部声明的baz函数在调用时访问了它的变量a，因此foo成为了闭包。这好像和我们学习到的知识不太一样。我们来看看在《你不知道的js》这本书中的例子中的理解。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008404325" src="https://static.alili.tech/img/remote/1460000008404325" alt="你不知道的js中的例子" title="你不知道的js中的例子" style="cursor: pointer; display: inline;"></span></p>
<p>书中的注释可以明显的看出，作者认为fn为闭包。即baz，这和chrome工具中明显是不一样的。</p>
<p>而在备受大家推崇的《JavaScript高级编程》一书中，是这样定义闭包。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008404326" src="https://static.alili.tech/img/remote/1460000008404326" alt="JavaScript高级编程中闭包的定义" title="JavaScript高级编程中闭包的定义" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008404327" src="https://static.alili.tech/img/remote/1460000008404327" alt="书中作者将自己理解的闭包与包含函数所区分" title="书中作者将自己理解的闭包与包含函数所区分" style="cursor: pointer; display: inline;"></span></p>
<p>这里chrome中理解的闭包，与我所阅读的这几本书中的理解的闭包不一样。其实在之前对于闭包分析的文章中，我已经有对这种情况做了一个解读。<a href="http://www.jianshu.com/p/21a16d44f150" rel="nofollow noreferrer" target="_blank">闭包详解</a></p>
<p>闭包是一个特殊对象，它由执行上下文(代号A)与在该执行上下文中创建的函数(代号B)共同组成。</p>
<p>当B执行时，如果访问了A中变量对象中的值，那么闭包就会产生。</p>
<p>那么在大多数理解中，包括许多著名的书籍，文章里都以函数B的名字代指这里生成的闭包。而在chrome中，则以执行上下文A的函数名代指闭包。</p>
<p>我们修改一下demo01中的例子，来看看一个非常有意思的变化。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// demo02
var fn;
var m = 20;
function foo() {
    var a = 2;
    function baz(a) {
        console.log(a);
    }
    fn = baz;
}
function bar() {
    fn(m);
}

foo();
bar(); // 20" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// demo02</span>
<span class="hljs-keyword">var</span> fn;
<span class="hljs-keyword">var</span> m = <span class="hljs-number">20</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> a = <span class="hljs-number">2</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">baz</span>(<span class="hljs-params">a</span>) </span>{
        <span class="hljs-built_in">console</span>.log(a);
    }
    fn = baz;
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
    fn(m);
}

foo();
bar(); <span class="hljs-comment">// 20</span></code></pre>
<p>这个例子在demo01的基础上，我在baz函数中传入一个参数，并打印出来。在调用时，我将全局的变量m传入。输出结果变为20。在使用断点调试看看作用域链。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008404328" src="https://static.alili.tech/img/remote/1460000008404328" alt="闭包没了，作用域链中没有包含foo了。" title="闭包没了，作用域链中没有包含foo了。" style="cursor: pointer;"></span></p>
<p>是不是结果有点意外，闭包没了，作用域链中没有包含foo了。我靠，跟我们理解的好像又有点不一样。所以通过这个对比，我们可以确定闭包的形成需要两个条件。</p>
<ul>
<li>在函数内部创建新的函数；</li>
<li>新的函数在执行时，访问了函数的变量对象；</li>
</ul>
<p>还有更有意思的。</p>
<p>我们继续来看看一个例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// demo03

function foo() {
    var a = 2;

    return function bar() {
        var b = 9;

        return function fn() {
            console.log(a);
        }
    }
}

var bar = foo();
var fn = bar();
fn();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// demo03</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> a = <span class="hljs-number">2</span>;

    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> b = <span class="hljs-number">9</span>;

        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(a);
        }
    }
}

<span class="hljs-keyword">var</span> bar = foo();
<span class="hljs-keyword">var</span> fn = bar();
fn();</code></pre>
<p>在这个例子中，fn只访问了foo中的a变量，因此它的闭包只有foo。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008404329" src="https://static.alili.tech/img/remote/1460000008404329" alt="闭包只有foo" title="闭包只有foo" style="cursor: pointer; display: inline;"></span></p>
<p>修改一下demo03，我们在fn中也访问bar中b变量试试看。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// demo04

function foo() {
    var a = 2;

    return function bar() {
        var b = 9;

        return function fn() {
            console.log(a, b);
        }
    }
}

var bar = foo();
var fn = bar();
fn();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// demo04</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> a = <span class="hljs-number">2</span>;

    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> b = <span class="hljs-number">9</span>;

        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-built_in">console</span>.log(a, b);
        }
    }
}

<span class="hljs-keyword">var</span> bar = foo();
<span class="hljs-keyword">var</span> fn = bar();
fn();</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008404330" src="https://static.alili.tech/img/remote/1460000008404330" alt="这个时候闭包变成了两个" title="这个时候闭包变成了两个" style="cursor: pointer;"></span></p>
<p>这个时候，闭包变成了两个。分别是bar，foo。</p>
<p>我们知道，闭包在模块中的应用非常重要。因此，我们来一个模块的例子，也用断点工具来观察一下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// demo05
(function() {

    var a = 10;
    var b = 20;

    var test = {
        m: 20,
        add: function(x) {
            return a + x;
        },
        sum: function() {
            return a + b + this.m;
        },
        mark: function(k, j) {
            return k + j;
        }
    }

    window.test = test;

})();

test.add(100);
test.sum();
test.mark();

var _mark = test.mark;
_mark();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// demo05</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{

    <span class="hljs-keyword">var</span> a = <span class="hljs-number">10</span>;
    <span class="hljs-keyword">var</span> b = <span class="hljs-number">20</span>;

    <span class="hljs-keyword">var</span> test = {
        <span class="hljs-attr">m</span>: <span class="hljs-number">20</span>,
        <span class="hljs-attr">add</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">x</span>) </span>{
            <span class="hljs-keyword">return</span> a + x;
        },
        <span class="hljs-attr">sum</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">return</span> a + b + <span class="hljs-keyword">this</span>.m;
        },
        <span class="hljs-attr">mark</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">k, j</span>) </span>{
            <span class="hljs-keyword">return</span> k + j;
        }
    }

    <span class="hljs-built_in">window</span>.test = test;

})();

test.add(<span class="hljs-number">100</span>);
test.sum();
test.mark();

<span class="hljs-keyword">var</span> _mark = test.mark;
_mark();</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008404331" src="https://static.alili.tech/img/remote/1460000008404331" alt="add执行时，闭包为外层的自执行函数，this指向test" title="add执行时，闭包为外层的自执行函数，this指向test" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008404332" src="https://static.alili.tech/img/remote/1460000008404332" alt="sum执行时，同上" title="sum执行时，同上" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008404333" src="https://static.alili.tech/img/remote/1460000008404333" alt="mark执行时，闭包为外层的自执行函数，this指向test" title="mark执行时，闭包为外层的自执行函数，this指向test" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008404334" src="https://static.alili.tech/img/remote/1460000008404334" alt="_mark执行时，闭包为外层的自执行函数，this指向window" title="_mark执行时，闭包为外层的自执行函数，this指向window" style="cursor: pointer; display: inline;"></span></p>
<blockquote>注意：这里的this指向显示为Object或者Window，大写开头，他们表示的是实例的构造函数，实际上this是指向的具体实例<p>test.mark能形成闭包，跟下面的补充例子（demo07）情况是一样的。</p>
</blockquote>
<p>我们还可以结合点断调试的方式，来理解那些困扰我们很久的this指向。随时观察this的指向，在实际开发调试中非常有用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// demo06

var a = 10;
var obj = {
    a: 20
}

function fn () {
    console.log(this.a);
}

fn.call(obj); // 20" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// demo06</span>

<span class="hljs-keyword">var</span> a = <span class="hljs-number">10</span>;
<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">a</span>: <span class="hljs-number">20</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a);
}

fn.call(obj); <span class="hljs-comment">// 20</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008404335" src="https://static.alili.tech/img/remote/1460000008404335" alt="this指向obj" title="this指向obj" style="cursor: pointer; display: inline;"></span></p>
<p>最后继续补充一个例子。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// demo07
function foo() {
    var a = 10;

    function fn1() {
        return a;
    }

    function fn2() {
        return 10;
    }

    fn2();
}

foo();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// demo07</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> a = <span class="hljs-number">10</span>;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn1</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> a;
    }

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn2</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-number">10</span>;
    }

    fn2();
}

foo();</code></pre>
<p>这个例子，和其他例子不太一样。虽然fn2并没有访问到foo的变量，但是foo执行时仍然变成了闭包。而当我将fn1的声明去掉时，闭包便不会出现了。</p>
<p>那么结合这个特殊的例子，我们可以这样这样定义闭包。</p>
<p><strong>闭包是指这样的作用域(foo)，它包含有一个函数(fn1)，这个函数(fn1)可以调用被这个作用域所封闭的变量(a)、函数、或者闭包等内容。通常我们通过闭包所对应的函数来获得对闭包的访问。</strong></p>
<p>更多的例子，大家可以自行尝试，总之，学会了使用断点调试之后，我们就能够很轻松的了解一段代码的执行过程了。这对快速定位错误，快速了解他人的代码都有非常巨大的帮助。大家一定要动手实践，把它给学会。</p>
<p>最后，根据以上的摸索情况，再次总结一下闭包：</p>
<ul>
<li>闭包是在函数被调用执行的时候才被确认创建的。</li>
<li>闭包的形成，与作用域链的访问顺序有直接关系。</li>
<li>只有内部函数访问了上层作用域链中的变量对象时，才会形成闭包，因此，我们可以利用闭包来访问函数内部的变量。</li>
</ul>
<blockquote>大家也可以根据我提供的这个方法，对其他的例子进行更多的测试，如果发现我的结论有不对的地方，欢迎指出，大家相互学习进步，谢谢大家。</blockquote>
<p><a href="https://segmentfault.com/a/1190000012646488">前端基础进阶系列目录</a></p>
<p><span class="img-wrap"><img data-src="/img/bV0emY?w=800&amp;h=300" src="https://static.alili.tech/img/bV0emY?w=800&amp;h=300" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端基础进阶（六）：在chrome开发者工具中观察函数调用栈、作用域链与闭包

## 原文链接
[https://segmentfault.com/a/1190000012646261](https://segmentfault.com/a/1190000012646261)

