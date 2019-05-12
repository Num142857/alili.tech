---
title: '深入理解 js this 绑定 ( 无需死记硬背，尾部有总结和面试题解析 )' 
date: 2018-12-31 2:30:30
hidden: true
slug: 5sn0oyr4sev
categories: [reprint]
---

{{< raw >}}

                    
<p>js 的 this 绑定问题，让多数新手懵逼，部分老手觉得恶心,这是因为this的绑定 ‘难以捉摸’，出错的时候还往往不知道为什么，相当反逻辑。<br>让我们考虑下面代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var people = {
    name : &quot;海洋饼干&quot;,
    getName : function(){
        console.log(this.name);
    }
};
window.onload = function(){
    xxx.onclick =  people.getName;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> people = {
    <span class="hljs-attr">name</span> : <span class="hljs-string">"海洋饼干"</span>,
    <span class="hljs-attr">getName</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.name);
    }
};
<span class="hljs-built_in">window</span>.onload = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    xxx.onclick =  people.getName;
};</code></pre>
<p>在平时搬砖时比较常见的this绑定问题，大家可能也写给或者遇到过，当xxx.onclick触发时，输出什么呢 ？</p>
<p>为了方便测试，我将代码简化:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var people = {
    Name: &quot;海洋饼干&quot;,
    getName : function(){
        console.log(this.Name);
    }
};
var bar = people.getName;

bar();    // undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> people = {
    <span class="hljs-attr">Name</span>: <span class="hljs-string">"海洋饼干"</span>,
    <span class="hljs-attr">getName</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.Name);
    }
};
<span class="hljs-keyword">var</span> bar = people.getName;

bar();    <span class="hljs-comment">// undefined</span></code></pre>
<p>通过这个小例子带大家感受一下<code>this</code>恶心的地方，我最开始遇到这个问题的时候也是一脸懵逼，因为代码里的<code>this</code>在创建时指向非常明显啊，指向自己 <code>people</code> 对象，但是实际上指向 <code>window</code> 对象，这就是我马上要和大家说的 <strong><code>this</code> 绑定规则</strong>。</p>
<h2 id="articleHeader0">1 . <code>this</code>
</h2>
<p>什么是<code>this</code> ？在讨论<code>this</code>绑定前，我们得先搞清楚this代表什么。</p>
<ol>
<li>this是JavaScript的关键字之一。它是 对象 自动生成的一个内部对象，只能在 对象 内部使用。随着函数使用场合的不同，this的值会发生变化。</li>
<li>
<strong>this指向什么，完全取决于 什么地方以什么方式调用，而不是 创建时</strong>。（比较多人误解的地方）（它非常语义化，this在英文中的含义就是 <strong>这，这个</strong> ，但这其实起到了一定的误导作用，因为this并不是一成不变的，并不一定一直指向当前 <strong>这个</strong>）</li>
</ol>
<h2 id="articleHeader1">2 . <code>this</code> 绑定规则</h2>
<p>掌握了下面介绍的4种绑定的规则，那么<strong>你只要看到函数调用就可以判断 <code>this</code> 的指向了</strong>。</p>
<h2 id="articleHeader2">2 .1 默认绑定</h2>
<p>考虑下面代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(){
    var a = 1 ;
    console.log(this.a);    // 10
}
var a = 10;
foo();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> a = <span class="hljs-number">1</span> ;
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a);    <span class="hljs-comment">// 10</span>
}
<span class="hljs-keyword">var</span> a = <span class="hljs-number">10</span>;
foo();</code></pre>
<p>这种就是典型的默认绑定，我们看看foo调用的位置，”光杆司令“，像 <strong>这种直接使用而不带任何修饰的函数调用</strong> ，就 <strong>默认且只能</strong> 应用 默认绑定。</p>
<p>那默认绑定到哪呢，一般是<code>window</code>上，严格模式下 是<code>undefined</code>。</p>
<h2 id="articleHeader3">2 .2 隐性绑定</h2>
<p>代码说话:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(){
    console.log(this.a);
}
var obj = {
    a : 10,
    foo : foo
}
foo();                // ?

obj.foo();            // ?
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span><span class="hljs-params">()</span><span class="hljs-comment">{
    console.log(this.a);
}</span>
<span class="hljs-title">var</span> <span class="hljs-title">obj</span> = <span class="hljs-comment">{
    a : 10,
    foo : foo
}</span>
<span class="hljs-title">foo</span><span class="hljs-params">()</span>;</span>                <span class="hljs-comment">// ?</span>

obj.foo();            <span class="hljs-comment">// ?</span>
</code></pre>
<p>答案 : undefined 10</p>
<p><code>foo()</code>的这个写法熟悉吗，就是我们刚刚写的默认绑定,等价于打印<code>window.a</code>,故输出<code>undefined</code> ,<br>下面<code>obj.foo()</code>这种大家应该经常写，这其实就是我们马上要讨论的 <strong>隐性绑定</strong> 。</p>
<p>函数foo执行的时候有了<strong>上下文对象</strong>，即 <code>obj</code>。这种情况下，<strong>函数里的this默认绑定为上下文对象</strong>，等价于打印<code>obj.a</code>,故输出<code>10</code> 。</p>
<p>如果是链性的关系，比如 <code>xx.yy.obj.foo();</code>, 上下文取函数的直接上级，即紧挨着的那个，或者说对象链的最后一个。</p>
<h2 id="articleHeader4">2 .3 显性绑定</h2>
<h2 id="articleHeader5">2 .3 .1 隐性绑定的限制</h2>
<p>在我们刚刚的 <strong>隐性绑定中有一个致命的限制，就是上下文必须包含我们的函数</strong> ，例：<code>var obj = { foo : foo }</code>,如果上下文不包含我们的函数用隐性绑定明显是要出错的，<strong>不可能每个对象都要加这个函数</strong> ,那样的话扩展,维护性太差了，我们接下来聊的就是直接 <strong>给函数强制性绑定this</strong>。</p>
<h2 id="articleHeader6">2 .3 .2 call apply bind</h2>
<p>这里我们就要用到 js 给我们提供的函数 call 和 apply，<strong>它们的作用都是改变函数的this指向</strong>，<strong>第一个参数都是 设置this对象</strong>。</p>
<p>两个函数的区别：</p>
<ol>
<li>call从第二个参数开始所有的参数都是 原函数的参数。</li>
<li>apply只接受两个参数，且第二个参数必须是数组，这个数组代表原函数的参数列表。</li>
</ol>
<p>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(a,b){
    console.log(a+b);
}
foo.call(null,'海洋','饼干');        // 海洋饼干  这里this指向不重要就写null了
foo.apply(null, ['海洋','饼干'] );     // 海洋饼干" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">a,b</span>)</span>{
    <span class="hljs-built_in">console</span>.log(a+b);
}
foo.call(<span class="hljs-literal">null</span>,<span class="hljs-string">'海洋'</span>,<span class="hljs-string">'饼干'</span>);        <span class="hljs-comment">// 海洋饼干  这里this指向不重要就写null了</span>
foo.apply(<span class="hljs-literal">null</span>, [<span class="hljs-string">'海洋'</span>,<span class="hljs-string">'饼干'</span>] );     <span class="hljs-comment">// 海洋饼干</span></code></pre>
<p>除了 call，apply函数以外，还有一个改变this的函数 bind ，它和call,apply都不同。</p>
<p><strong>bind只有一个函数，且不会立刻执行，只是将一个值绑定到函数的this上,并将绑定好的函数返回</strong>。例:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(){
    console.log(this.a);
}
var obj = { a : 10 };

foo = foo.bind(obj);
foo();                    // 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a);
}
<span class="hljs-keyword">var</span> obj = { <span class="hljs-attr">a</span> : <span class="hljs-number">10</span> };

foo = foo.bind(obj);
foo();                    <span class="hljs-comment">// 10</span></code></pre>
<p>（bind函数非常特别，下次和大家一起讨论它的源码）</p>
<h2 id="articleHeader7">2 .3 .2 显性绑定</h2>
<p>开始正题，上代码，就用上面隐性绑定的例子 :</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(){
    console.log(this.a);
}
var obj = {
    a : 10            //去掉里面的foo
}
foo.call(obj);        // 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a);
}
<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">a</span> : <span class="hljs-number">10</span>            <span class="hljs-comment">//去掉里面的foo</span>
}
foo.call(obj);        <span class="hljs-comment">// 10</span></code></pre>
<p>我们将隐性绑定例子中的 上下文对象 里的函数去掉了，显然现在不能用 <code>上下文.函数</code> 这种形式来调用函数，大家看代码里的显性绑定代码<code>foo.call(obj)</code>，看起来很怪，和我们之前所了解的函数调用不一样。</p>
<p>其实call 是 foo 上的一个函数,在改变this指向的同时执行这个函数。</p>
<p>（想要深入理解 [<code>call apply bind this硬绑定,软绑定,箭头函数绑定</code> ] 等更多黑科技 的小伙伴欢迎关注我或本文的评论，最近我会单独做一期放到一起写一篇文章）（<strong>不想看的小伙伴不用担心，不影响对本文的理解</strong>）</p>
<h2 id="articleHeader8">2 .4 new 绑定</h2>
<h2 id="articleHeader9">2 .4 .1 什么是 <code>new</code>
</h2>
<p>学过面向对象的小伙伴对new肯定不陌生，js的new和传统的面向对象语言的new的作用都是创建一个新的对象，但是他们的机制完全不同。</p>
<p>创建一个新对象少不了一个概念，那就是<code>构造函数</code>，传统的面向对象 构造函数 是类里的一种特殊函数，要创建对象时使用<code>new 类名()</code>的形式去调用类中的构造函数，而js中就不一样了。</p>
<p><strong>js中的只要用new修饰的 函数就是'构造函数'</strong>，准确来说是 <strong>函数的<code>构造调用</code></strong>，因为在js中并不存在所谓的'构造函数'。</p>
<p>那么用new 做到函数的<code>构造调用</code>后，js帮我们做了什么工作呢:</p>
<ol>
<li>创建一个新对象。</li>
<li>把这个新对象的<code>__proto__</code>属性指向 原函数的<code>prototype</code>属性。(即继承原函数的原型)</li>
<li>
<strong>将这个新对象绑定到 此函数的this上 </strong>。</li>
<li>返回新对象，如果这个函数没有返回其他<strong>对象</strong>。</li>
</ol>
<p>第三条就是我们下面要聊的new绑定</p>
<h2 id="articleHeader10">2 .4 .2 new 绑定</h2>
<p>不哔哔，看代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(){
    this.a = 10;
    console.log(this);
}
foo();                    // window对象
console.log(window.a);    // 10   默认绑定

var obj = new foo();      // foo{ a : 10 }  创建的新对象的默认名为函数名
                          // 然后等价于 foo { a : 10 };  var obj = foo;
console.log(obj.a);       // 10    new绑定" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.a = <span class="hljs-number">10</span>;
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);
}
foo();                    <span class="hljs-comment">// window对象</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">window</span>.a);    <span class="hljs-comment">// 10   默认绑定</span>

<span class="hljs-keyword">var</span> obj = <span class="hljs-keyword">new</span> foo();      <span class="hljs-comment">// foo{ a : 10 }  创建的新对象的默认名为函数名</span>
                          <span class="hljs-comment">// 然后等价于 foo { a : 10 };  var obj = foo;</span>
<span class="hljs-built_in">console</span>.log(obj.a);       <span class="hljs-comment">// 10    new绑定</span></code></pre>
<p><strong>使用new调用函数后，函数会 <em>以自己的名字 命名 和 创建</em> 一个新的对象，并返回。</strong></p>
<p>特别注意 : 如果原函数返回一个对象类型，那么将无法返回新对象,你将丢失绑定this的新对象，例:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(){
    this.a = 10;
    return new String(&quot;捣蛋鬼&quot;);
}
var obj = new foo();
console.log(obj.a);       // undefined
console.log(obj);         // &quot;捣蛋鬼&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.a = <span class="hljs-number">10</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">String</span>(<span class="hljs-string">"捣蛋鬼"</span>);
}
<span class="hljs-keyword">var</span> obj = <span class="hljs-keyword">new</span> foo();
<span class="hljs-built_in">console</span>.log(obj.a);       <span class="hljs-comment">// undefined</span>
<span class="hljs-built_in">console</span>.log(obj);         <span class="hljs-comment">// "捣蛋鬼"</span></code></pre>
<h2 id="articleHeader11">2 .5 this绑定优先级</h2>
<p><em>过程是些无聊的代码测试，我直接写出优先级了</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new 绑定 > 显示绑定 > 隐式绑定 > 默认绑定

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">new</span> <span class="hljs-type"></span>绑定 &gt; 显示绑定 &gt; 隐式绑定 &gt; 默认绑定

</code></pre>
<h2 id="articleHeader12">3 . 总结</h2>
<ol>
<li>
<p>如果函数被<code>new</code> 修饰</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   this绑定的是新创建的对象，例:var bar = new foo();  函数 foo 中的 this 就是一个叫foo的新创建的对象 , 然后将这个对象赋给bar , 这样的绑定方式叫 new绑定 ." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code style="word-break: break-word; white-space: initial;">   <span class="hljs-built_in">this</span>绑定的是新创建的对象，例:<span class="hljs-type">var bar </span>= <span class="hljs-keyword">new</span> <span class="hljs-type">foo</span>();  函数 foo 中的 <span class="hljs-built_in">this</span> 就是一个叫foo的新创建的对象 , 然后将这个对象赋给bar , 这样的绑定方式叫 <span class="hljs-keyword">new</span><span class="hljs-type"></span>绑定 .</code></pre>
</li>
<li>
<p>如果函数是使用<code>call,apply,bind</code>来调用的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   this绑定的是 call,apply,bind 的第一个参数.例: foo.call(obj); , foo 中的 this 就是 obj , 这样的绑定方式叫 显性绑定 ." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code style="word-break: break-word; white-space: initial;">   <span class="hljs-keyword">this</span>绑定的是 call,apply,bind 的第一个参数.例: foo.<span class="hljs-keyword">call</span>(obj); , foo 中的 <span class="hljs-keyword">this</span> 就是 obj , 这样的绑定方式叫 显性绑定 .</code></pre>
</li>
<li>
<p>如果函数是在某个 上下文对象 下被调用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   this绑定的是那个上下文对象，例 : var obj = { foo : foo };    obj.foo();  foo 中的 this 就是 obj . 这样的绑定方式叫 隐性绑定 ." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code style="word-break: break-word; white-space: initial;">   <span class="hljs-keyword">this</span>绑定的是那个上下文对象，例 : <span class="hljs-keyword">var</span> obj = { foo : foo };    obj.foo();  foo 中的 <span class="hljs-keyword">this</span> 就是 obj . 这样的绑定方式叫 隐性绑定 .</code></pre>
</li>
<li>
<p>如果都不是，即使用默认绑定</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   例:function foo(){...} foo() ,foo 中的 this 就是 window.(严格模式下默认绑定到undefined).
   这样的绑定方式叫 默认绑定 .
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code>   例:function foo()<span class="hljs-meta">{...}</span> foo() ,foo 中的 this 就是 window.(严格模式下默认绑定到undefined).
   这样的绑定方式叫 默认绑定 .
</code></pre>
</li>
</ol>
<h2 id="articleHeader13">4 . 面试题解析</h2>
<p><strong>1.</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x = 10;
var obj = {
    x: 20,
    f: function(){
        console.log(this.x);        // ?
        var foo = function(){ 
            console.log(this.x);    
            }
        foo();                      // ?
    }
};
obj.f();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> x = <span class="hljs-number">10</span>;
<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">x</span>: <span class="hljs-number">20</span>,
    <span class="hljs-attr">f</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.x);        <span class="hljs-comment">// ?</span>
        <span class="hljs-keyword">var</span> foo = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ 
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.x);    
            }
        foo();                      <span class="hljs-comment">// ?</span>
    }
};
obj.f();</code></pre>
<hr>
<p>-----------------------答案---------------------<br>答案 ： 20 10<br>解析 ：考点 <strong>1.</strong> this默认绑定 <strong>2.</strong> this隐性绑定</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x = 10;
var obj = {
    x: 20,
    f: function(){
        console.log(this.x);    // 20
                                // 典型的隐性绑定,这里 f 的this指向上下文 obj ,即输出 20
        function foo(){ 
            console.log(this.x); 
            }
        foo();       // 10
                     //有些人在这个地方就想当然的觉得 foo 在函数 f 里,也在 f 里执行，
                     //那 this 肯定是指向obj 啊 , 仔细看看我们说的this绑定规则 , 对应一下很容易
                     //发现这种'光杆司令'，是我们一开始就示范的默认绑定,这里this绑定的是window
    }
};
obj.f();             " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> x = <span class="hljs-number">10</span>;
<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">x</span>: <span class="hljs-number">20</span>,
    <span class="hljs-attr">f</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.x);    <span class="hljs-comment">// 20</span>
                                <span class="hljs-comment">// 典型的隐性绑定,这里 f 的this指向上下文 obj ,即输出 20</span>
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{ 
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.x); 
            }
        foo();       <span class="hljs-comment">// 10</span>
                     <span class="hljs-comment">//有些人在这个地方就想当然的觉得 foo 在函数 f 里,也在 f 里执行，</span>
                     <span class="hljs-comment">//那 this 肯定是指向obj 啊 , 仔细看看我们说的this绑定规则 , 对应一下很容易</span>
                     <span class="hljs-comment">//发现这种'光杆司令'，是我们一开始就示范的默认绑定,这里this绑定的是window</span>
    }
};
obj.f();             </code></pre>
<p><strong>2.</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(arg){
    this.a = arg;
    return this
};

var a = foo(1);
var b = foo(10);

console.log(a.a);    // ?
console.log(b.a);    // ?" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">arg</span>)</span>{
    <span class="hljs-keyword">this</span>.a = arg;
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
};

<span class="hljs-keyword">var</span> a = foo(<span class="hljs-number">1</span>);
<span class="hljs-keyword">var</span> b = foo(<span class="hljs-number">10</span>);

<span class="hljs-built_in">console</span>.log(a.a);    <span class="hljs-comment">// ?</span>
<span class="hljs-built_in">console</span>.log(b.a);    <span class="hljs-comment">// ?</span></code></pre>
<hr>
<p>-----------------------答案---------------------</p>
<p>答案 ： undefined 10<br>解析 ：考点 <strong>1.</strong> 全局污染 <strong>2.</strong> this默认绑定 </p>
<p>这道题很有意思，问题基本上都集中在第一undefined上，这其实是题目的小陷阱，但是追栈的过程绝对精彩<br>让我们一步步分析这里发生了什么：</p>
<ol>
<li>foo(1)执行，应该不难看出是默认绑定吧 , this指向了window，函数里等价于 window<strong>.</strong>a = 1,return window;</li>
<li>var a = foo(1) 等价于 window<strong>.</strong>a = window , 很多人都忽略了<strong>var a 就是window.a </strong>，将刚刚赋值的 1 替换掉了。</li>
<li>所以这里的 a 的值是 window , a<strong>.</strong>a 也是window ， 即window<strong>.</strong>a = window ; window<strong>.</strong>a<strong>.</strong>a = window;</li>
<li>foo(10) 和第一次一样，都是默认绑定，这个时候，<strong>将window.a 赋值成 10</strong> ，注意这里是关键，原来window.a = window ,现在被赋值成了10，变成了值类型，所以现在 a.a = undefined。(验证这一点只需要将var b = foo(10);删掉，这里的 a.a 还是window)</li>
<li>var b = foo(10); 等价于 window.b = window;</li>
</ol>
<p>本题中所有变量的值，a = window.a = 10 , a.a = undefined , b = window , b.a = window.a = 10;</p>
<p><strong>3.</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x = 10;
var obj = {
    x: 20,
    f: function(){ console.log(this.x); }
};
var bar = obj.f;
var obj2 = {
    x: 30,
    f: obj.f
}
obj.f();
bar();
obj2.f();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> x = <span class="hljs-number">10</span>;
<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">x</span>: <span class="hljs-number">20</span>,
    <span class="hljs-attr">f</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.x); }
};
<span class="hljs-keyword">var</span> bar = obj.f;
<span class="hljs-keyword">var</span> obj2 = {
    <span class="hljs-attr">x</span>: <span class="hljs-number">30</span>,
    <span class="hljs-attr">f</span>: obj.f
}
obj.f();
bar();
obj2.f();</code></pre>
<hr>
<p>-----------------------答案---------------------<br>答案：20 10 30<br>解析：传说中的送分题，考点，辨别this绑定</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x = 10;
var obj = {
    x: 20,
    f: function(){ console.log(this.x); }
};
var bar = obj.f;
var obj2 = {
    x: 30,
    f: obj.f
}
obj.f();    // 20
            //有上下文，this为obj，隐性绑定
bar();      // 10
            //'光杆司令' 默认绑定  （ obj.f 只是普通的赋值操作 ）
obj2.f();   //30
            //不管 f 函数怎么折腾，this只和 执行位置和方式有关，即我们所说的绑定规则
            " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> x = <span class="hljs-number">10</span>;
<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">x</span>: <span class="hljs-number">20</span>,
    <span class="hljs-attr">f</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.x); }
};
<span class="hljs-keyword">var</span> bar = obj.f;
<span class="hljs-keyword">var</span> obj2 = {
    <span class="hljs-attr">x</span>: <span class="hljs-number">30</span>,
    <span class="hljs-attr">f</span>: obj.f
}
obj.f();    <span class="hljs-comment">// 20</span>
            <span class="hljs-comment">//有上下文，this为obj，隐性绑定</span>
bar();      <span class="hljs-comment">// 10</span>
            <span class="hljs-comment">//'光杆司令' 默认绑定  （ obj.f 只是普通的赋值操作 ）</span>
obj2.f();   <span class="hljs-comment">//30</span>
            <span class="hljs-comment">//不管 f 函数怎么折腾，this只和 执行位置和方式有关，即我们所说的绑定规则</span>
            </code></pre>
<p><strong>4.</strong> 压轴题了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
    getName = function () { console.log (1); };
    return this;
}
foo.getName = function () { console.log(2);};
foo.prototype.getName = function () { console.log(3);};
var getName = function () { console.log(4);};
function getName () { console.log(5);}
 
foo.getName ();                // ?
getName ();                    // ?
foo().getName ();              // ?
getName ();                    // ?
new foo.getName ();            // ?
new foo().getName ();          // ?
new new foo().getName ();      // ?" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    getName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-built_in">console</span>.log (<span class="hljs-number">1</span>); };
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
}
foo.getName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>);};
foo.prototype.getName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>);};
<span class="hljs-keyword">var</span> getName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-number">4</span>);};
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getName</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-number">5</span>);}
 
foo.getName ();                <span class="hljs-comment">// ?</span>
getName ();                    <span class="hljs-comment">// ?</span>
foo().getName ();              <span class="hljs-comment">// ?</span>
getName ();                    <span class="hljs-comment">// ?</span>
<span class="hljs-keyword">new</span> foo.getName ();            <span class="hljs-comment">// ?</span>
<span class="hljs-keyword">new</span> foo().getName ();          <span class="hljs-comment">// ?</span>
<span class="hljs-keyword">new</span> <span class="hljs-keyword">new</span> foo().getName ();      <span class="hljs-comment">// ?</span></code></pre>
<hr>
<p>-----------------------答案---------------------<br>答案：2 4 1 1 2 3 3 <br>解析：考点 1. new绑定 2.隐性绑定 3. 默认绑定 4.变量污染</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo() {
    getName = function () { console.log (1); }; 
            //这里的getName 将创建到全局window上
    return this;
}
foo.getName = function () { console.log(2);};   
        //这个getName和上面的不同，是直接添加到foo上的
foo.prototype.getName = function () { console.log(3);}; 
        // 这个getName直接添加到foo的原型上，在用new创建新对象时将直接添加到新对象上 
var getName = function () { console.log(4);}; 
        // 和foo函数里的getName一样, 将创建到全局window上
function getName () { console.log(5);}    
        // 同上，但是这个函数不会被使用，因为函数声明的提升优先级最高，所以上面的函数表达式将永远替换
        // 这个同名函数，除非在函数表达式赋值前去调用getName()，但是在本题中，函数调用都在函数表达式
        // 之后，所以这个函数可以忽略了
        
        // 通过上面对 getName的分析基本上答案已经出来了

foo.getName ();                // 2
                               // 下面为了方便，我就使用输出值来简称每个getName函数
                               // 这里有小伙伴疑惑是在 2 和 3 之间，觉得应该是3 , 但其实直接设置
                               // foo.prototype上的属性，对当前这个对象的属性是没有影响的,如果要使
                               // 用的话，可以foo.prototype.getName() 这样调用 ，这里需要知道的是
                               // 3 并不会覆盖 2，两者不冲突 ( 当你使用new 创建对象时，这里的
                               // Prototype 将自动绑定到新对象上，即用new 构造调用的第二个作用)
                               
getName ();                    // 4 
                               // 这里涉及到函数提升的问题，不知道的小伙伴只需要知道 5 会被 4 覆盖，
                               // 虽然 5 在 4 的下面，其实 js 并不是完全的自上而下，想要深入了解的
                               // 小伙伴可以看文章最后的链接
                               
foo().getName ();              // 1 
                               // 这里的foo函数执行完成了两件事, 1. 将window.getName设置为1,
                               // 2. 返回window , 故等价于 window.getName(); 输出 1
getName ();                    // 1
                               // 刚刚上面的函数刚把window.getName设置为1,故同上 输出 1
                               
new foo.getName ();            // 2
                               // new 对一个函数进行构造调用 , 即 foo.getName ,构造调用也是调用啊
                               // 该执行还是执行，然后返回一个新对象，输出 2 (虽然这里没有接收新
                               // 创建的对象但是我们可以猜到，是一个函数名为 foo.getName 的对象
                               // 且__proto__属性里有一个getName函数，是上面设置的 3 函数)
                               
new foo().getName ();          // 3
                               // 这里特别的地方就来了,new 是对一个函数进行构造调用,它直接找到了离它
                               // 最近的函数,foo(),并返回了应该新对象,等价于 var obj = new foo();
                               // obj.getName(); 这样就很清晰了,输出的是之前绑定到prototype上的
                               // 那个getName  3 ,因为使用new后会将函数的prototype继承给 新对象
                               
new new foo().getName ();      // 3
                               // 哈哈，这个看上去很吓人，让我们来分解一下：
                               // var obj = new foo();
                               // var obj1 = new obj.getName();
                               // 好了，仔细看看, 这不就是上两题的合体吗,obj 有getName 3, 即输出3
                               // obj 是一个函数名为 foo的对象,obj1是一个函数名为obj.getName的对象
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
    getName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-built_in">console</span>.log (<span class="hljs-number">1</span>); }; 
            <span class="hljs-comment">//这里的getName 将创建到全局window上</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
}
foo.getName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-number">2</span>);};   
        <span class="hljs-comment">//这个getName和上面的不同，是直接添加到foo上的</span>
foo.prototype.getName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-number">3</span>);}; 
        <span class="hljs-comment">// 这个getName直接添加到foo的原型上，在用new创建新对象时将直接添加到新对象上 </span>
<span class="hljs-keyword">var</span> getName = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-number">4</span>);}; 
        <span class="hljs-comment">// 和foo函数里的getName一样, 将创建到全局window上</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getName</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-number">5</span>);}    
        <span class="hljs-comment">// 同上，但是这个函数不会被使用，因为函数声明的提升优先级最高，所以上面的函数表达式将永远替换</span>
        <span class="hljs-comment">// 这个同名函数，除非在函数表达式赋值前去调用getName()，但是在本题中，函数调用都在函数表达式</span>
        <span class="hljs-comment">// 之后，所以这个函数可以忽略了</span>
        
        <span class="hljs-comment">// 通过上面对 getName的分析基本上答案已经出来了</span>

foo.getName ();                <span class="hljs-comment">// 2</span>
                               <span class="hljs-comment">// 下面为了方便，我就使用输出值来简称每个getName函数</span>
                               <span class="hljs-comment">// 这里有小伙伴疑惑是在 2 和 3 之间，觉得应该是3 , 但其实直接设置</span>
                               <span class="hljs-comment">// foo.prototype上的属性，对当前这个对象的属性是没有影响的,如果要使</span>
                               <span class="hljs-comment">// 用的话，可以foo.prototype.getName() 这样调用 ，这里需要知道的是</span>
                               <span class="hljs-comment">// 3 并不会覆盖 2，两者不冲突 ( 当你使用new 创建对象时，这里的</span>
                               <span class="hljs-comment">// Prototype 将自动绑定到新对象上，即用new 构造调用的第二个作用)</span>
                               
getName ();                    <span class="hljs-comment">// 4 </span>
                               <span class="hljs-comment">// 这里涉及到函数提升的问题，不知道的小伙伴只需要知道 5 会被 4 覆盖，</span>
                               <span class="hljs-comment">// 虽然 5 在 4 的下面，其实 js 并不是完全的自上而下，想要深入了解的</span>
                               <span class="hljs-comment">// 小伙伴可以看文章最后的链接</span>
                               
foo().getName ();              <span class="hljs-comment">// 1 </span>
                               <span class="hljs-comment">// 这里的foo函数执行完成了两件事, 1. 将window.getName设置为1,</span>
                               <span class="hljs-comment">// 2. 返回window , 故等价于 window.getName(); 输出 1</span>
getName ();                    <span class="hljs-comment">// 1</span>
                               <span class="hljs-comment">// 刚刚上面的函数刚把window.getName设置为1,故同上 输出 1</span>
                               
<span class="hljs-keyword">new</span> foo.getName ();            <span class="hljs-comment">// 2</span>
                               <span class="hljs-comment">// new 对一个函数进行构造调用 , 即 foo.getName ,构造调用也是调用啊</span>
                               <span class="hljs-comment">// 该执行还是执行，然后返回一个新对象，输出 2 (虽然这里没有接收新</span>
                               <span class="hljs-comment">// 创建的对象但是我们可以猜到，是一个函数名为 foo.getName 的对象</span>
                               <span class="hljs-comment">// 且__proto__属性里有一个getName函数，是上面设置的 3 函数)</span>
                               
<span class="hljs-keyword">new</span> foo().getName ();          <span class="hljs-comment">// 3</span>
                               <span class="hljs-comment">// 这里特别的地方就来了,new 是对一个函数进行构造调用,它直接找到了离它</span>
                               <span class="hljs-comment">// 最近的函数,foo(),并返回了应该新对象,等价于 var obj = new foo();</span>
                               <span class="hljs-comment">// obj.getName(); 这样就很清晰了,输出的是之前绑定到prototype上的</span>
                               <span class="hljs-comment">// 那个getName  3 ,因为使用new后会将函数的prototype继承给 新对象</span>
                               
<span class="hljs-keyword">new</span> <span class="hljs-keyword">new</span> foo().getName ();      <span class="hljs-comment">// 3</span>
                               <span class="hljs-comment">// 哈哈，这个看上去很吓人，让我们来分解一下：</span>
                               <span class="hljs-comment">// var obj = new foo();</span>
                               <span class="hljs-comment">// var obj1 = new obj.getName();</span>
                               <span class="hljs-comment">// 好了，仔细看看, 这不就是上两题的合体吗,obj 有getName 3, 即输出3</span>
                               <span class="hljs-comment">// obj 是一个函数名为 foo的对象,obj1是一个函数名为obj.getName的对象</span>
</code></pre>
<h2 id="articleHeader14">5 . 箭头函数的this绑定 <em>(2017.9.18更新)</em>
</h2>
<p>箭头函数，一种特殊的函数，不使用<code>function</code>关键字，而是使用<code>=&gt;</code>，学名 <code>胖箭头</code>(2333),它和普通函数的区别：</p>
<ol>
<li>箭头函数不使用我们上面介绍的四种绑定，而是<strong>完全根据外部作用域来决定this</strong>。(它的父级是使用我们的规则的哦)</li>
<li>箭头函数的this绑定无法被修改 (这个特性非常爽（滑稽）)</li>
</ol>
<p>先看个代码巩固一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(){
    return ()=>{
        console.log(this.a);
    }
}
foo.a = 10;

// 1. 箭头函数关联父级作用域this

var bar = foo();            // foo默认绑定
bar();                      // undefined 哈哈，是不是有小伙伴想当然了

var baz = foo.call(foo);    // foo 显性绑定
baz();                      // 10 

// 2. 箭头函数this不可修改
//这里我们使用上面的已经绑定了foo 的 baz
var obj = {
    a : 999
}
baz.call(obj);              // 10" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.a);
    }
}
foo.a = <span class="hljs-number">10</span>;

<span class="hljs-comment">// 1. 箭头函数关联父级作用域this</span>

<span class="hljs-keyword">var</span> bar = foo();            <span class="hljs-comment">// foo默认绑定</span>
bar();                      <span class="hljs-comment">// undefined 哈哈，是不是有小伙伴想当然了</span>

<span class="hljs-keyword">var</span> baz = foo.call(foo);    <span class="hljs-comment">// foo 显性绑定</span>
baz();                      <span class="hljs-comment">// 10 </span>

<span class="hljs-comment">// 2. 箭头函数this不可修改</span>
<span class="hljs-comment">//这里我们使用上面的已经绑定了foo 的 baz</span>
<span class="hljs-keyword">var</span> obj = {
    <span class="hljs-attr">a</span> : <span class="hljs-number">999</span>
}
baz.call(obj);              <span class="hljs-comment">// 10</span></code></pre>
<p>来来来，实战一下，还记得我们之前第一个例子吗，将它改成箭头函数的形式(可以彻底解决恶心的this绑定问题)：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var people = {
    Name: &quot;海洋饼干&quot;,
    getName : function(){
        console.log(this.Name);
    }
};
var bar = people.getName;

bar();    // undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> people = {
    <span class="hljs-attr">Name</span>: <span class="hljs-string">"海洋饼干"</span>,
    <span class="hljs-attr">getName</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.Name);
    }
};
<span class="hljs-keyword">var</span> bar = people.getName;

bar();    <span class="hljs-comment">// undefined</span></code></pre>
<hr>
<p>====================修改后====================</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var people = {
    Name: &quot;海洋饼干&quot;,
    getName : function(){
        return ()=>{
            console.log(this.Name);
        }
    }
};
var bar = people.getName(); //获得一个永远指向people的函数，不用想this了,岂不是美滋滋？

bar();    // 海洋饼干 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> people = {
    <span class="hljs-attr">Name</span>: <span class="hljs-string">"海洋饼干"</span>,
    <span class="hljs-attr">getName</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.Name);
        }
    }
};
<span class="hljs-keyword">var</span> bar = people.getName(); <span class="hljs-comment">//获得一个永远指向people的函数，不用想this了,岂不是美滋滋？</span>

bar();    <span class="hljs-comment">// 海洋饼干 </span></code></pre>
<p>可能会有人不解为什么在箭头函数外面再套一层，直接写不就行了吗，搞这么麻烦干嘛，其实这<strong>也是箭头函数很多人用不好的地方</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var obj= {
    that : this,
    bar : function(){
        return ()=>{
            console.log(this);
        }
    },
    baz : ()=>{
        console.log(this);
    }
}
console.log(obj.that);  // window
obj.bar()();            // obj
obj.baz();              // window" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> obj= {
    <span class="hljs-attr">that</span> : <span class="hljs-keyword">this</span>,
    <span class="hljs-attr">bar</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);
        }
    },
    <span class="hljs-attr">baz</span> : <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>);
    }
}
<span class="hljs-built_in">console</span>.log(obj.that);  <span class="hljs-comment">// window</span>
obj.bar()();            <span class="hljs-comment">// obj</span>
obj.baz();              <span class="hljs-comment">// window</span></code></pre>
<ol>
<li>我们先要搞清楚一点，obj的当前作用域是window,如 obj.that === window。</li>
<li>如果不用function（function有自己的函数作用域）将其包裹起来，那么默认绑定的父级作用域就是window。</li>
<li>用function包裹的目的就是将箭头函数绑定到当前的对象上。函数的作用域是当前这个对象，然后箭头函数会自动绑定函数所在作用域的this，即obj。</li>
</ol>
<p>美滋滋，溜了溜了</p>
<hr>
<hr>
<hr>
<p>参考书籍：你不知道的JavaScript&lt;上卷&gt; ＫＹＬＥ　ＳＩＭＰＳＯＮ　著　（推荐）</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入理解 js this 绑定 ( 无需死记硬背，尾部有总结和面试题解析 )

## 原文链接
[https://segmentfault.com/a/1190000011194676](https://segmentfault.com/a/1190000011194676)

