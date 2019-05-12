---
title: 'javascript中那些折磨人的面试题' 
date: 2019-02-06 2:30:09
hidden: true
slug: 343iozu97dl
categories: [reprint]
---

{{< raw >}}

                    
<p>前端工程师有时候面试时会遇到一类面试官，他们问的问题对于语言本身非常较真儿，往往不是候选人可能期待的面向实际的问题(有些候选人强调能干活就行，至于知不知道其中缘由是无关痛痒的)。这类题目，虽然没有逻辑，但某种程度说，确实考察了候选人对于<code>javascript</code>这门语言的理解。</p>
<p>突然想到这个话题是无聊在翻自己的<a href="https://github.com/leftstick" rel="nofollow noreferrer" target="_blank">Github</a>，看看以前都写过什么丑货。然后翻到了这篇解释<a href="http://perfectionkills.com/javascript-quiz/" rel="nofollow noreferrer" target="_blank">Javascript quiz</a>的文章<a href="https://leftstick.github.io/quiz-legend/" rel="nofollow noreferrer" target="_blank">quiz-legend</a>，反正没事儿，就想搬过来供大家学习、理解、背诵、批判。</p>
<h2 id="articleHeader0">问题一</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(){
    return typeof arguments;//&quot;object&quot;
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> <span class="hljs-built_in">arguments</span>;<span class="hljs-comment">//"object"</span>
})();</code></pre>
<p><code>arguments</code>是一个Array-like对象，对应的就是传入函数的参数列表。你可以在任何函数中直接使用该变量。</p>
<p><code>typeof</code>操作符只会返回<code>string</code>类型的结果。参照如下列表可知对应不同数据，<code>typeof</code>返回的值都是什么：</p>
<table>
<thead><tr>
<th align="left">类型</th>
<th align="left">结果</th>
</tr></thead>
<tbody>
<tr>
<td align="left"><code>undefined</code></td>
<td align="left"><code>'undefined'</code></td>
</tr>
<tr>
<td align="left"><code>null</code></td>
<td align="left"><code>'object'</code></td>
</tr>
<tr>
<td align="left"><code>Boolean</code></td>
<td align="left"><code>'boolean'</code></td>
</tr>
<tr>
<td align="left"><code>Number</code></td>
<td align="left"><code>'number'</code></td>
</tr>
<tr>
<td align="left"><code>String</code></td>
<td align="left"><code>'string'</code></td>
</tr>
<tr>
<td align="left">Symbol (new in ECMAScript 2015)</td>
<td align="left"><code>'symbol'</code></td>
</tr>
<tr>
<td align="left">Host object (provided by the JS environment)</td>
<td align="left">Implementation-dependent</td>
</tr>
<tr>
<td align="left">Function object (implements [[Call]] in ECMA-262 terms)</td>
<td align="left"><code>'function'</code></td>
</tr>
<tr>
<td align="left">Any other object</td>
<td align="left"><code>'object'</code></td>
</tr>
</tbody>
</table>
<blockquote><p>由此我们推断出，<code>typeof arguments</code>是<code>object</code></p></blockquote>
<h2 id="articleHeader1">问题二</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var f = function g(){ return 23; };
typeof g();//报错" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> f = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">g</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-keyword">return</span> <span class="hljs-number">23</span>; };
<span class="hljs-keyword">typeof</span> g();<span class="hljs-comment">//报错</span></code></pre>
<p>这是一个名字是<code>g</code>的<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function" rel="nofollow noreferrer" target="_blank">function expression</a>，然后又被赋值给了变量<code>f</code>。</p>
<p>这里的函数名<code>g</code>和被其赋值的变量<code>f</code>有如下差异：</p>
<ul>
<li><p>函数名<code>g</code>不能变动，而变量<code>f</code>可以被重新赋值</p></li>
<li><p>函数名<code>g</code>只能在函数体内部被使用，试图在函数外部使用<code>g</code>会报错的</p></li>
</ul>
<h2 id="articleHeader2">问题三</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(x){
    delete x;
    return x;//1
})(1);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">x</span>)</span>{
    <span class="hljs-keyword">delete</span> x;
    <span class="hljs-keyword">return</span> x;<span class="hljs-comment">//1</span>
})(<span class="hljs-number">1</span>);</code></pre>
<p><code>delete</code>操作符可以从对象中删除属性，正确用法如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="delete object.property
delete object['property']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">delete</span> object.property
<span class="hljs-keyword">delete</span> object[<span class="hljs-string">'property'</span>]</code></pre>
<p><code>delete</code>操作符只能作用在对象的属性上，对变量和函数名无效。也就是说<code>delete x</code>是没有意义的。</p>
<blockquote><p>你最好也知道，<code>delete</code>是不会直接释放内存的，她只是间接的中断对象引用</p></blockquote>
<h2 id="articleHeader3">问题四</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var y = 1, x = y = typeof x;
x;//&quot;undefined&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> y = <span class="hljs-number">1</span>, x = y = <span class="hljs-keyword">typeof</span> x;
x;<span class="hljs-comment">//"undefined"</span></code></pre>
<p>我们试图分解上述代码成下面两步：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var y = 1; //step 1
var x = y = typeof x; //step 2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> y = <span class="hljs-number">1</span>; <span class="hljs-comment">//step 1</span>
<span class="hljs-keyword">var</span> x = y = <span class="hljs-keyword">typeof</span> x; <span class="hljs-comment">//step 2</span></code></pre>
<p>第一步应该没有异议，我们直接看第二步</p>
<ol>
<li><p>赋值表达式从右向左执行</p></li>
<li><p><code>y</code>被重新赋值为<code>typeof x</code>的结果，也就是<code>undefined</code></p></li>
<li><p><code>x</code>被赋值为右边表达式(<code>y = typeof x</code>)的结果，也就是<code>undefined</code></p></li>
</ol>
<h2 id="articleHeader4">问题五</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function f(f){
    return typeof f();//&quot;number&quot;
})(function(){ return 1; });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params">f</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> f();<span class="hljs-comment">//"number"</span>
})(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>; });</code></pre>
<p>直接上注释解释：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function f(f){
    //这里的f是传入的参数function(){ return 1; }
    //执行的结果自然是1
    return typeof f(); //所以根据问题一的表格我们知道，typeof 1结果是&quot;number&quot;
})(function(){ return 1; });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params">f</span>)</span>{
    <span class="hljs-comment">//这里的f是传入的参数function(){ return 1; }</span>
    <span class="hljs-comment">//执行的结果自然是1</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> f(); <span class="hljs-comment">//所以根据问题一的表格我们知道，typeof 1结果是"number"</span>
})(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>; });</code></pre>
<h2 id="articleHeader5">问题六</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = {
    bar: function() { return this.baz; },
    baz: 1
};

(function(){
    return typeof arguments[0]();//&quot;undefined&quot;
})(foo.bar);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> foo = {
    <span class="hljs-attr">bar</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.baz; },
    <span class="hljs-attr">baz</span>: <span class="hljs-number">1</span>
};

(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>]();<span class="hljs-comment">//"undefined"</span>
})(foo.bar);</code></pre>
<p>这里你可能会误以为最终结果是<code>number</code>。向函数中传递参数可以看作是一种赋值，所以<code>arguments[0]</code>得到是是真正的<code>bar</code>函数的值，而不是<code>foo.bar</code>这个引用，那么自然<code>this</code>也就不会指向<code>foo</code>，而是<code>window</code>了。</p>
<h2 id="articleHeader6">问题七</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var foo = {
    bar: function(){ return this.baz; },
    baz: 1
}
typeof (f = foo.bar)();//&quot;undefined&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> foo = {
    <span class="hljs-attr">bar</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.baz; },
    <span class="hljs-attr">baz</span>: <span class="hljs-number">1</span>
}
<span class="hljs-keyword">typeof</span> (f = foo.bar)();<span class="hljs-comment">//"undefined"</span></code></pre>
<p>这和上一题是一样的问题，<code>(f = foo.bar)</code>返回的就是<code>bar</code>的值，而不是其引用，那么<code>this</code>也就指的不是<code>foo</code>了。</p>
<h2 id="articleHeader7">问题八</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var f = (function f(){ return '1'; }, function g(){ return 2; })();
typeof f;//&quot;number&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> f = (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-keyword">return</span> <span class="hljs-string">'1'</span>; }, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">g</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-keyword">return</span> <span class="hljs-number">2</span>; })();
<span class="hljs-keyword">typeof</span> f;<span class="hljs-comment">//"number"</span></code></pre>
<p>逗号操作符 对它的每个操作对象求值（从左至右），然后返回最后一个操作对象的值</p>
<p>所以<code>(function f(){ return '1'; }, function g(){ return 2; })</code>的返回值就是函数<code>g</code>，然后执行她，那么结果是<code>2</code>；最后再<code>typeof 2</code>，根据问题一的表格，结果自然是<code>number</code></p>
<h2 id="articleHeader8">问题九</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x = 1;
if (function f(){}) {
    x += typeof f;
}
x;//&quot;1undefined&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> x = <span class="hljs-number">1</span>;
<span class="hljs-keyword">if</span> (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>)</span>{}) {
    x += <span class="hljs-keyword">typeof</span> f;
}
x;<span class="hljs-comment">//"1undefined"</span></code></pre>
<p>这个问题的关键点，我们在<a>问题二</a>中谈到过，<code>function expression</code>中的函数名<code>f</code>是不能在函数体外部访问的</p>
<h2 id="articleHeader9">问题十</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x = [typeof x, typeof y][1];
typeof typeof x;//&quot;string&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> x = [<span class="hljs-keyword">typeof</span> x, <span class="hljs-keyword">typeof</span> y][<span class="hljs-number">1</span>];
<span class="hljs-keyword">typeof</span> <span class="hljs-keyword">typeof</span> x;<span class="hljs-comment">//"string"</span></code></pre>
<ol>
<li><p>因为没有声明过变量<code>y</code>，所以<code>typeof y</code>返回<code>"undefined"</code></p></li>
<li><p>将<code>typeof y</code>的结果赋值给<code>x</code>，也就是说<code>x</code>现在是<code>"undefined"</code></p></li>
<li><p>然后<code>typeof x</code>当然是<code>"string"</code></p></li>
<li><p>最后<code>typeof "string"</code>的结果自然还是<code>"string"</code></p></li>
</ol>
<h2 id="articleHeader10">问题十一</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(foo){
    return typeof foo.bar;//&quot;undefined&quot;
})({ foo: { bar: 1 } });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">foo</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> foo.bar;<span class="hljs-comment">//"undefined"</span>
})({ <span class="hljs-attr">foo</span>: { <span class="hljs-attr">bar</span>: <span class="hljs-number">1</span> } });</code></pre>
<p>这是个纯粹的视觉诡计，上注释</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(foo){
    
    //这里的foo，是{ foo: { bar: 1 } }，并没有bar属性哦。
    //bar属性是在foo.foo下面
    //所以这里结果是&quot;undefined&quot;
    return typeof foo.bar;
})({ foo: { bar: 1 } });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">foo</span>)</span>{
    
    <span class="hljs-comment">//这里的foo，是{ foo: { bar: 1 } }，并没有bar属性哦。</span>
    <span class="hljs-comment">//bar属性是在foo.foo下面</span>
    <span class="hljs-comment">//所以这里结果是"undefined"</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> foo.bar;
})({ <span class="hljs-attr">foo</span>: { <span class="hljs-attr">bar</span>: <span class="hljs-number">1</span> } });</code></pre>
<h2 id="articleHeader11">问题十二</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function f(){
    function f(){ return 1; }
    return f();//2
    function f(){ return 2; }
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>; }
    <span class="hljs-keyword">return</span> f();<span class="hljs-comment">//2</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-keyword">return</span> <span class="hljs-number">2</span>; }
})();</code></pre>
<p>通过<code>function declaration</code>声明的函数甚至可以在声明之前使用，这种特性我们称之为<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function#Function_declaration_hoisting" rel="nofollow noreferrer" target="_blank">hoisting</a>。于是上述代码其实是这样被运行环境解释的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function f(){
    function f(){ return 1; }
    function f(){ return 2; }
    return f();
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>; }
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-keyword">return</span> <span class="hljs-number">2</span>; }
    <span class="hljs-keyword">return</span> f();
})();</code></pre>
<h2 id="articleHeader12">问题十三</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function f(){ return f; }
new f() instanceof f;//false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-keyword">return</span> f; }
<span class="hljs-keyword">new</span> f() <span class="hljs-keyword">instanceof</span> f;<span class="hljs-comment">//false</span></code></pre>
<p>当代码<code>new f()</code>执行时，下面事情将会发生：</p>
<ol>
<li><p>一个新对象被创建。它继承自<code>f.prototype</code></p></li>
<li><p>构造函数<code>f</code>被执行。执行的时候，相应的传参会被传入，同时上下文(<code>this</code>)会被指定为这个新实例。<code>new f</code>等同于<code>new f()</code>，只能用在不传递任何参数的情况。</p></li>
<li><p>如果构造函数返回了一个“对象”，那么这个对象会取代整个<code>new</code>出来的结果。如果构造函数没有返回对象，那么<code>new</code>出来的结果为步骤1创建的对象，</p></li>
</ol>
<blockquote><p>ps：一般情况下构造函数不返回任何值，不过用户如果想覆盖这个返回值，可以自己选择返回一个普通对象来覆盖。当然，返回数组也会覆盖，因为数组也是对象。</p></blockquote>
<p>于是，我们这里的<code>new f()</code>返回的仍然是函数<code>f</code>本身，而并非他的实例</p>
<h2 id="articleHeader13">问题十四</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="with (function(x, undefined){}) length;//2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">with</span> (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">x, undefined</span>)</span>{}) length;<span class="hljs-comment">//2</span></code></pre>
<p><code>with</code>语句将某个对象添加的作用域链的顶部，如果在<code>statement</code>中有某個未使用命名空间的变量，跟作用域链中的某個属性同名，則這個变量将指向這個属性值。如果沒有同名的属性，则将拋出<code>ReferenceError</code>异常。</p>
<p>OK，现在我们来看，由于<code>function(x, undefined){}</code>是一个匿名函数表达式，是函数，就会有<code>length</code>属性，指的就是函数的参数个数。所以最终结果就是<code>2</code>了</p>
<h2 id="articleHeader14">写在最后</h2>
<p>有人觉得这些题坑爹，也有人觉得开阔了眼界，见仁见智吧。但有一件事是真的，无论你是否坚定的实践派，缺了理论基础，也铁定走不远 － 你永远不会见到哪个熟练的技术工人突然成了火箭专家。</p>
<p>看文档、读标准、结合实践，才是同志们的决胜之道</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javascript中那些折磨人的面试题

## 原文链接
[https://segmentfault.com/a/1190000006129337](https://segmentfault.com/a/1190000006129337)

