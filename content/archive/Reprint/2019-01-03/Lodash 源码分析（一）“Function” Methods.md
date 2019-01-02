---
title: 'Lodash 源码分析（一）“Function” Methods' 
date: 2019-01-03 2:30:11
hidden: true
slug: caza8go4bn
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>Lodash一直是我很喜欢用的一个库，代码也十分简洁优美，一直想抽时间好好分析一下Lodash的源代码。最近抽出早上的一些时间来分析一下Lodash的一些我觉得比较好的源码。因为函数之间可能会有相互依赖，所以不会按照文档顺序进行分析，而是根据依赖关系和简易程度由浅入深地进行分析。因为个人能力有限，如果理解有偏差，还请直接指出，以便我及时修改。</p>
<p>源码都是针对<code>4.17.4</code>版本的，<a href="https://lodash.com/docs/4.17.4#after" rel="nofollow noreferrer" target="_blank">源docs</a>写得也很好，还有很多样例。</p>
<h2 id="articleHeader1"><code>_.after</code></h2>
<p><code>_.after</code>函数几乎是Lodash中最容易理解的一个函数了，它一共有两个参数，第一个参数是调用次数<code>n</code>,第二个参数是<code>n</code>次调用之后执行的函数<code>func</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function after(n, func) {
      if (typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      n = toInteger(n);
      return function() {
        if (--n < 1) {
          return func.apply(this, arguments);
        }
      };
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">after</span>(<span class="hljs-params">n, func</span>) </span>{
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> func != <span class="hljs-string">'function'</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(FUNC_ERROR_TEXT);
      }
      n = toInteger(n);
      <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (--n &lt; <span class="hljs-number">1</span>) {
          <span class="hljs-keyword">return</span> func.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);
        }
      };
    }</code></pre>
<p>这个函数的核心代码就是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="func.apply(this,arguments);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">func.apply(<span class="hljs-keyword">this</span>,<span class="hljs-built_in">arguments</span>);</code></pre>
<p>但是一定要注意，这个函数中有闭包的应用，就是这个参数<code>n</code>。<code>n</code>本应该在函数<code>_.after</code>返回的时候就应该从栈空间回收，但事实上它还被返回的函数引用着，一直在内存中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return function() {
        if (--n < 1) {
          return func.apply(this, arguments);
        }
      };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">if</span> (--n &lt; <span class="hljs-number">1</span>) {
          <span class="hljs-keyword">return</span> func.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);
        }
      };</code></pre>
<p>所以一直到返回的函数执行完毕，<code>n</code>所占用的内存空间都无法被回收。</p>
<p>我们再来看看这个<code>apply</code>函数，我们知道<code>apply</code>函数可以改变函数运行时的作用域，那么问题来了，<code>_.after</code>中<code>func.apply</code>函数的<code>this</code>到底是谁呢？其实这个东西我们没有办法从源码中看出来，因为<code>this</code>是在运行时决定的。那么<code>this</code>会变吗？如果会的话怎么变呢？要知道这个问题的答案，我们需要先弄懂<code>_.after</code>函数怎么用。</p>
<p><code>_.after</code>函数调用后返回了另一个函数，所以对于<code>_.after</code>函数的返回值，我们是需要再次调用的。所以最好的场景可能是在延迟加载等场景中。当然为了简单起见我给出一个很简单的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const _ = require(&quot;lodash&quot;);

function foo(func ){
    console.log(&quot;invoked foo.&quot;);
    func();
}


var done = _.after(2,function bar(){
    console.log(&quot;invoke bar&quot;);
});

for( var i = 0; i <  4; i++ ){
   foo(done);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> _ = <span class="hljs-built_in">require</span>(<span class="hljs-string">"lodash"</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">func </span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"invoked foo."</span>);
    func();
}


<span class="hljs-keyword">var</span> done = _.after(<span class="hljs-number">2</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"invoke bar"</span>);
});

<span class="hljs-keyword">for</span>( <span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt;  <span class="hljs-number">4</span>; i++ ){
   foo(done);
}</code></pre>
<p>正如我们前面说的，<code>n</code>的作用域是<code>_.after</code>函数内部，所以在执行过程中<code>n</code>会一直递减，因此输出结果应该是在调用两次<code>foo</code>之后调用一次<code>bar</code>，之后每次调用<code>foo</code>，都会调用一次<code>bar</code>。结果和我们预期的一致：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="invoked foo
invoked foo
invoke bar
invoked foo
invoke bar
invoked foo
invoke bar" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">invoked foo
invoked foo
invoke bar
invoked foo
invoke bar
invoked foo
invoke bar</code></pre>
<p>那么我们再看看<code>this</code>指向的问题，我们修改一下上面的调用函数，让<code>bar</code>函数输出一下内部的<code>this</code>的一些属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const _ = require(&quot;lodash&quot;);

function foo(func ){
    this.name = &quot;foo&quot;;
    console.log(&quot;invoked foo: &quot; + this.name );
    func();
}


var done = _.after(2,function bar(){
    console.log(&quot;invoke bar: &quot; + this.name);
});

for( var i = 0; i <  4; i++ ){
   foo(done);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> _ = <span class="hljs-built_in">require</span>(<span class="hljs-string">"lodash"</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">func </span>)</span>{
    <span class="hljs-keyword">this</span>.name = <span class="hljs-string">"foo"</span>;
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"invoked foo: "</span> + <span class="hljs-keyword">this</span>.name );
    func();
}


<span class="hljs-keyword">var</span> done = _.after(<span class="hljs-number">2</span>,<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bar</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"invoke bar: "</span> + <span class="hljs-keyword">this</span>.name);
});

<span class="hljs-keyword">for</span>( <span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt;  <span class="hljs-number">4</span>; i++ ){
   foo(done);
}</code></pre>
<p>其实想来大家也应该能够猜到，在<code>bar</code>函数中输出的<code>this.name</code>也是<code>foo</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="invoked foo: foo
invoked foo: foo
invoke bar: foo
invoked foo: foo
invoke bar: foo
invoked foo: foo
invoke bar: foo" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">invoked foo: foo
invoked foo: foo
invoke bar: foo
invoked foo: foo
invoke bar: foo
invoked foo: foo
invoke bar: foo</code></pre>
<p>这是因为<code>bar</code>的<code>this</code>应该指向的是<code>_.after</code>创建的函数的<code>this</code>,而这个函数是window调用的，因此<code>this</code>实际上指向就是<code>window</code>，但是为什么会输出<code>foo</code>呢?因为foo函数的调用者也是window，而在foo函数中，将window.name设置成了<code>foo</code>，所以<code>bar</code>函数输出的也是<code>foo</code>(多谢评论指出！)。</p>
<h2 id="articleHeader2"><code>_.map</code></h2>
<p><code>_.map</code>函数我们几乎随处可见，这个函数应用也相当广泛。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function map(collection, iteratee) {
      var func = isArray(collection) ? arrayMap : baseMap;
      return func(collection, getIteratee(iteratee, 3));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">map</span>(<span class="hljs-params">collection, iteratee</span>) </span>{
      <span class="hljs-keyword">var</span> func = isArray(collection) ? arrayMap : baseMap;
      <span class="hljs-keyword">return</span> func(collection, getIteratee(iteratee, <span class="hljs-number">3</span>));
}</code></pre>
<p>为了简化问题，我们分析比较简单的情况：用一个func函数处理数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_.map([1,2,3],func);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">_.map([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>],func);</code></pre>
<p>在处理数组的时候，lodash是分开处理的，对于<code>Array</code>采用<code>arrayMap</code>进行处理，对于对象则采用<code>baseMap</code>进行处理。</p>
<p>我们先看数组<code>arrayMap</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function arrayMap(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length,
        result = Array(length);

    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">arrayMap</span>(<span class="hljs-params">array, iteratee</span>) </span>{
    <span class="hljs-keyword">var</span> index = <span class="hljs-number">-1</span>,
        length = array == <span class="hljs-literal">null</span> ? <span class="hljs-number">0</span> : array.length,
        result = <span class="hljs-built_in">Array</span>(length);

    <span class="hljs-keyword">while</span> (++index &lt; length) {
      result[index] = iteratee(array[index], index, array);
    }
    <span class="hljs-keyword">return</span> result;
  }</code></pre>
<p>这个函数是一个私有函数，第一个参数是一个需要遍历的数组，第二个参数是在遍历过程当中进行处理的函数；返回一个进行map处理之后的函数。</p>
<p>在看我们需要进行遍历处理的函数<code>iteratee</code>，这个函数式通过<code>getIteratee</code>函数得到的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getIteratee() {
      var result = lodash.iteratee || iteratee;
      result = result === iteratee ? baseIteratee : result;
      return arguments.length ? result(arguments[0], arguments[1]) : result;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getIteratee</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">var</span> result = lodash.iteratee || iteratee;
      result = result === iteratee ? baseIteratee : result;
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">arguments</span>.length ? result(<span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>], <span class="hljs-built_in">arguments</span>[<span class="hljs-number">1</span>]) : result;
    }</code></pre>
<p>如果<code>lodash.iteratee</code>被重新定义,则使用用户定义的<code>iteratee</code>，否则就用官方定义的<code>baseIteratee</code>。需要强调的是，<code>result(arguments[0],arguments[1])</code>是柯里化的函数返回，返回的仍旧是一个函数。不可避免地，我们需要看看官方定义的<code>baseIteratee</code>的实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   function baseIteratee(value) {
      // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
      // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
      if (typeof value == 'function') {
        return value;
      }
      if (value == null) {
        return identity;
      }
      if (typeof value == 'object') {
        return isArray(value)
          ? baseMatchesProperty(value[0], value[1])
          : baseMatches(value);
      }
      return property(value);
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">   <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">baseIteratee</span>(<span class="hljs-params">value</span>) </span>{
      <span class="hljs-comment">// Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.</span>
      <span class="hljs-comment">// See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.</span>
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> value == <span class="hljs-string">'function'</span>) {
        <span class="hljs-keyword">return</span> value;
      }
      <span class="hljs-keyword">if</span> (value == <span class="hljs-literal">null</span>) {
        <span class="hljs-keyword">return</span> identity;
      }
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> value == <span class="hljs-string">'object'</span>) {
        <span class="hljs-keyword">return</span> isArray(value)
          ? baseMatchesProperty(value[<span class="hljs-number">0</span>], value[<span class="hljs-number">1</span>])
          : baseMatches(value);
      }
      <span class="hljs-keyword">return</span> property(value);
    }</code></pre>
<p>我们可以看出来，这个<code>iteratee</code>迭代者其实就是一个函数，在<code>_.map</code>中<code>getIteratee(iteratee, 3)</code>，给了两个参数，按照逻辑，最终返回的是一个<code>baseIteratee</code>，<code>baseIteratee</code>的第一个参数<code>value</code>就是<code>iteratee</code>,这是一个函数，所以，<code>baseIteratee</code>函数在第一个判断就返回了。</p>
<p>所以我们可以将map函数简化为如下版本:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function map(collection,iteratee){
    return arrayMap(collection,getIteratee(iteratee,3));
}

function arrayMap(array, iteratee) {
    var index = -1,
        length = array == null ? 0 : array.length,
        result = Array(length);

    while (++index < length) {
      result[index] = iteratee(array[index], index, array);
    }
    return result;
}

function getIteratee() {
      var result =  baseIteratee;
      return arguments.length ? result(arguments[0], arguments[1]) : result;
}

function baseIteratee(value) {
      if (typeof value == 'function') {
        return value;
      }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">map</span>(<span class="hljs-params">collection,iteratee</span>)</span>{
    <span class="hljs-keyword">return</span> arrayMap(collection,getIteratee(iteratee,<span class="hljs-number">3</span>));
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">arrayMap</span>(<span class="hljs-params">array, iteratee</span>) </span>{
    <span class="hljs-keyword">var</span> index = <span class="hljs-number">-1</span>,
        length = array == <span class="hljs-literal">null</span> ? <span class="hljs-number">0</span> : array.length,
        result = <span class="hljs-built_in">Array</span>(length);

    <span class="hljs-keyword">while</span> (++index &lt; length) {
      result[index] = iteratee(array[index], index, array);
    }
    <span class="hljs-keyword">return</span> result;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getIteratee</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">var</span> result =  baseIteratee;
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">arguments</span>.length ? result(<span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>], <span class="hljs-built_in">arguments</span>[<span class="hljs-number">1</span>]) : result;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">baseIteratee</span>(<span class="hljs-params">value</span>) </span>{
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> value == <span class="hljs-string">'function'</span>) {
        <span class="hljs-keyword">return</span> value;
      }
}</code></pre>
<p>可以看到，最终调用函数<code>func</code>的时候会传入3个参数。<code>array[index],index,array</code>。我们可以实验，将<code>func</code>实现如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function func(){
   console.log(“arguments[0] ” + arguments[0]);
   console.log(“arguments[1] ” + arguments[1]);
   console.log(“arguments[2] ” + arguments[2]);
   console.log(&quot;-----&quot;)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func</span>(<span class="hljs-params"></span>)</span>{
   <span class="hljs-built_in">console</span>.log(“<span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>] ” + <span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>]);
   <span class="hljs-built_in">console</span>.log(“<span class="hljs-built_in">arguments</span>[<span class="hljs-number">1</span>] ” + <span class="hljs-built_in">arguments</span>[<span class="hljs-number">1</span>]);
   <span class="hljs-built_in">console</span>.log(“<span class="hljs-built_in">arguments</span>[<span class="hljs-number">2</span>] ” + <span class="hljs-built_in">arguments</span>[<span class="hljs-number">2</span>]);
   <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"-----"</span>)
}</code></pre>
<p>输出的结果也和我们的预期一样，输出的第一个参数是该列表元素本身，第二个参数是数组下标，第三个参数是整个列表：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arguments[0] 6
arguments[1] 0
arguments[2] 6,8,10
-----
arguments[0] 8
arguments[1] 1
arguments[2] 6,8,10
-----
arguments[0] 10
arguments[1] 2
arguments[2] 6,8,10
-----
[ undefined, undefined, undefined ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>] <span class="hljs-number">6</span>
<span class="hljs-built_in">arguments</span>[<span class="hljs-number">1</span>] <span class="hljs-number">0</span>
<span class="hljs-built_in">arguments</span>[<span class="hljs-number">2</span>] <span class="hljs-number">6</span>,<span class="hljs-number">8</span>,<span class="hljs-number">10</span>
-----
<span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>] <span class="hljs-number">8</span>
<span class="hljs-built_in">arguments</span>[<span class="hljs-number">1</span>] <span class="hljs-number">1</span>
<span class="hljs-built_in">arguments</span>[<span class="hljs-number">2</span>] <span class="hljs-number">6</span>,<span class="hljs-number">8</span>,<span class="hljs-number">10</span>
-----
<span class="hljs-built_in">arguments</span>[<span class="hljs-number">0</span>] <span class="hljs-number">10</span>
<span class="hljs-built_in">arguments</span>[<span class="hljs-number">1</span>] <span class="hljs-number">2</span>
<span class="hljs-built_in">arguments</span>[<span class="hljs-number">2</span>] <span class="hljs-number">6</span>,<span class="hljs-number">8</span>,<span class="hljs-number">10</span>
-----
[ <span class="hljs-literal">undefined</span>, <span class="hljs-literal">undefined</span>, <span class="hljs-literal">undefined</span> ]</code></pre>
<p>上面的分析就是抛砖引玉，先给出数组的分析，别的非数组，例如对象的遍历处理则会走到别的分支进行处理，各位看官有兴趣可以深入研究。</p>
<h2 id="articleHeader3"><code>_.ary</code></h2>
<p>这个函数是用来限制参数个数的。这个函数咋一看好像没有什么用，但我们考虑如下场景，将一个字符列表<code>['6','8','10']</code>转为整型列表<code>[6,8,10]</code>，用<code>_.map</code>实现，我们自然而然会写出这样的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const _ = require(&quot;lodash&quot;);
_.map(['6','8','10'],parseInt);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> _ = <span class="hljs-built_in">require</span>(<span class="hljs-string">"lodash"</span>);
_.map([<span class="hljs-string">'6'</span>,<span class="hljs-string">'8'</span>,<span class="hljs-string">'10'</span>],<span class="hljs-built_in">parseInt</span>);</code></pre>
<p>好像很完美，我们输出看看：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[ 6, NaN, 2 ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">[ <span class="hljs-number">6</span>, <span class="hljs-literal">NaN</span>, <span class="hljs-number">2</span> ]</code></pre>
<p>很诡异是不是，看看内部到底发生了什么？其实看了上面的<code>-.map</code>函数的分析，其实原因已经很明显了。对于<code>parseInt</code>函数而言，其接收两个参数，第一个是需要处理的字符串，第二个是进制：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
* @param string    必需。要被解析的字符串。
* @param radix    
* 可选。表示要解析的数字的基数。该值介于 2 ~ 36 之间。
* 如果省略该参数或其值为 0，则数字将以 10 为基础来解析。如果它以 “0x” 或 “0X” 开头，将以 16 为基数。
* 如果该参数小于 2 或者大于 36，则 parseInt() 将返回 NaN
*/
parseInt(string, radix)
/**
当参数 radix 的值为 0，或没有设置该参数时，parseInt() 会根据 string 来判断数字的基数。

举例，如果 string 以 &quot;0x&quot; 开头，parseInt() 会把 string 的其余部分解析为十六进制的整数。如果 string 以 0 开头，那么 ECMAScript v3 允许 parseInt() 的一个实现把其后的字符解析为八进制或十六进制的数字。如果 string 以 1 ~ 9 的数字开头，parseInt() 将把它解析为十进制的整数。
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
* @param string    必需。要被解析的字符串。
* @param radix    
* 可选。表示要解析的数字的基数。该值介于 2 ~ 36 之间。
* 如果省略该参数或其值为 0，则数字将以 10 为基础来解析。如果它以 “0x” 或 “0X” 开头，将以 16 为基数。
* 如果该参数小于 2 或者大于 36，则 parseInt() 将返回 NaN
*/</span>
<span class="hljs-built_in">parseInt</span>(string, radix)
<span class="hljs-comment">/**
当参数 radix 的值为 0，或没有设置该参数时，parseInt() 会根据 string 来判断数字的基数。

举例，如果 string 以 "0x" 开头，parseInt() 会把 string 的其余部分解析为十六进制的整数。如果 string 以 0 开头，那么 ECMAScript v3 允许 parseInt() 的一个实现把其后的字符解析为八进制或十六进制的数字。如果 string 以 1 ~ 9 的数字开头，parseInt() 将把它解析为十进制的整数。
*/</span></code></pre>
<p>那么这样的输出也就不难理解了：</p>
<p>处理第一个数组元素6的时候，<code>parseInt</code>实际传入参数<code>(6,0)</code>,那么按照十进制解析，会得到<code>6</code>,处理第二个数组元素的时候传入的实际参数是<code>(8,1)</code>，返回<code>NaN</code>,对于第三个数组元素，按照2进制处理，则<code>10</code>返回的是<code>2</code>。</p>
<p>所以在上述需求的时候我们需要限制参数的个数，这个时候<code>_.ary</code>函数就登场了，上面的函数这样处理就没有问题了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const _ = require(&quot;lodash&quot;);
_.map(['6','8','10'],_.ary(parseInt,1));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> _ = <span class="hljs-built_in">require</span>(<span class="hljs-string">"lodash"</span>);
_.map([<span class="hljs-string">'6'</span>,<span class="hljs-string">'8'</span>,<span class="hljs-string">'10'</span>],_.ary(<span class="hljs-built_in">parseInt</span>,<span class="hljs-number">1</span>));</code></pre>
<p>我们看看这个函数是怎么实现的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" function ary(func, n, guard) {
      n = guard ? undefined : n;
      n = (func &amp;&amp; n == null) ? func.length : n;
      return createWrap(func, WRAP_ARY_FLAG, undefined, undefined, undefined, undefined, n);
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ary</span>(<span class="hljs-params">func, n, guard</span>) </span>{
      n = guard ? <span class="hljs-literal">undefined</span> : n;
      n = (func &amp;&amp; n == <span class="hljs-literal">null</span>) ? func.length : n;
      <span class="hljs-keyword">return</span> createWrap(func, WRAP_ARY_FLAG, <span class="hljs-literal">undefined</span>, <span class="hljs-literal">undefined</span>, <span class="hljs-literal">undefined</span>, <span class="hljs-literal">undefined</span>, n);
    }</code></pre>
<p>这个函数先检查<code>n</code>的值，需要说明的是<code>func.length</code>返回的是函数的声明参数个数。然后返回了一个<code>createWrap</code>包裹函数，这个函数可以说是脏活累活处理工厂了，负责很多函数的包裹处理工作，而且为了提升性能，还将不同的判断用<code>bitflag</code>进行与/非处理，可以说是很用尽心机了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
     * Creates a function that either curries or invokes `func` with optional
     * `this` binding and partially applied arguments.
     *
     * @private
     * @param {Function|string} func The function or method name to wrap.
     * @param {number} bitmask The bitmask flags.
     *    1 - `_.bind` 1                      0b0000000000000001
     *    2 - `_.bindKey`                       0b0000000000000010
     *    4 - `_.curry` or `_.curryRight`...  0b0000000000000100
     *    8 - `_.curry`                       0b0000000000001000
     *   16 - `_.curryRight`                  0b0000000000010000
     *   32 - `_.partial`                     0b0000000000100000
     *   64 - `_.partialRight`                0b0000000001000000
     *  128 - `_.rearg`                       0b0000000010000000
     *  256 - `_.ary`                            0b0000000100000000
     *  512 - `_.flip`                           0b0000001000000000
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to be partially applied.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */
    function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
      var isBindKey = bitmask &amp; WRAP_BIND_KEY_FLAG;
      if (!isBindKey &amp;&amp; typeof func != 'function') {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var length = partials ? partials.length : 0;
      if (!length) {
        bitmask &amp;= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
        partials = holders = undefined;
      }
      ary = ary === undefined ? ary : nativeMax(toInteger(ary), 0);
      arity = arity === undefined ? arity : toInteger(arity);
      length -= holders ? holders.length : 0;

      if (bitmask &amp; WRAP_PARTIAL_RIGHT_FLAG) {
        var partialsRight = partials,
            holdersRight = holders;

        partials = holders = undefined;
      }
      var data = isBindKey ? undefined : getData(func);

      var newData = [
        func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,
        argPos, ary, arity
      ];

      if (data) {
        mergeData(newData, data);
      }
      func = newData[0];
      bitmask = newData[1];
      thisArg = newData[2];
      partials = newData[3];
      holders = newData[4];
      arity = newData[9] = newData[9] === undefined
        ? (isBindKey ? 0 : func.length)
        : nativeMax(newData[9] - length, 0);

      if (!arity &amp;&amp; bitmask &amp; (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
        bitmask &amp;= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
      }
      if (!bitmask || bitmask == WRAP_BIND_FLAG) {
        var result = createBind(func, bitmask, thisArg);
      } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
        result = createCurry(func, bitmask, arity);
      } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) &amp;&amp; !holders.length) {
        result = createPartial(func, bitmask, thisArg, partials);
      } else {
        result = createHybrid.apply(undefined, newData);
      }
      var setter = data ? baseSetData : setData;
      return setWrapToString(setter(result, newData), func, bitmask);
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">/**
     * Creates a function that either curries or invokes `func` with optional
     * `this` binding and partially applied arguments.
     *
     * @private
     * @param {Function|string} func The function or method name to wrap.
     * @param {number} bitmask The bitmask flags.
     *    1 - `_.bind` 1                      0b0000000000000001
     *    2 - `_.bindKey`                       0b0000000000000010
     *    4 - `_.curry` or `_.curryRight`...  0b0000000000000100
     *    8 - `_.curry`                       0b0000000000001000
     *   16 - `_.curryRight`                  0b0000000000010000
     *   32 - `_.partial`                     0b0000000000100000
     *   64 - `_.partialRight`                0b0000000001000000
     *  128 - `_.rearg`                       0b0000000010000000
     *  256 - `_.ary`                            0b0000000100000000
     *  512 - `_.flip`                           0b0000001000000000
     * @param {*} [thisArg] The `this` binding of `func`.
     * @param {Array} [partials] The arguments to be partially applied.
     * @param {Array} [holders] The `partials` placeholder indexes.
     * @param {Array} [argPos] The argument positions of the new function.
     * @param {number} [ary] The arity cap of `func`.
     * @param {number} [arity] The arity of `func`.
     * @returns {Function} Returns the new wrapped function.
     */</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createWrap</span>(<span class="hljs-params">func, bitmask, thisArg, partials, holders, argPos, ary, arity</span>) </span>{
      <span class="hljs-keyword">var</span> isBindKey = bitmask &amp; WRAP_BIND_KEY_FLAG;
      <span class="hljs-keyword">if</span> (!isBindKey &amp;&amp; <span class="hljs-keyword">typeof</span> func != <span class="hljs-string">'function'</span>) {
        <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">TypeError</span>(FUNC_ERROR_TEXT);
      }
      <span class="hljs-keyword">var</span> length = partials ? partials.length : <span class="hljs-number">0</span>;
      <span class="hljs-keyword">if</span> (!length) {
        bitmask &amp;= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
        partials = holders = <span class="hljs-literal">undefined</span>;
      }
      ary = ary === <span class="hljs-literal">undefined</span> ? ary : nativeMax(toInteger(ary), <span class="hljs-number">0</span>);
      arity = arity === <span class="hljs-literal">undefined</span> ? arity : toInteger(arity);
      length -= holders ? holders.length : <span class="hljs-number">0</span>;

      <span class="hljs-keyword">if</span> (bitmask &amp; WRAP_PARTIAL_RIGHT_FLAG) {
        <span class="hljs-keyword">var</span> partialsRight = partials,
            holdersRight = holders;

        partials = holders = <span class="hljs-literal">undefined</span>;
      }
      <span class="hljs-keyword">var</span> data = isBindKey ? <span class="hljs-literal">undefined</span> : getData(func);

      <span class="hljs-keyword">var</span> newData = [
        func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,
        argPos, ary, arity
      ];

      <span class="hljs-keyword">if</span> (data) {
        mergeData(newData, data);
      }
      func = newData[<span class="hljs-number">0</span>];
      bitmask = newData[<span class="hljs-number">1</span>];
      thisArg = newData[<span class="hljs-number">2</span>];
      partials = newData[<span class="hljs-number">3</span>];
      holders = newData[<span class="hljs-number">4</span>];
      arity = newData[<span class="hljs-number">9</span>] = newData[<span class="hljs-number">9</span>] === <span class="hljs-literal">undefined</span>
        ? (isBindKey ? <span class="hljs-number">0</span> : func.length)
        : nativeMax(newData[<span class="hljs-number">9</span>] - length, <span class="hljs-number">0</span>);

      <span class="hljs-keyword">if</span> (!arity &amp;&amp; bitmask &amp; (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
        bitmask &amp;= ~(WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG);
      }
      <span class="hljs-keyword">if</span> (!bitmask || bitmask == WRAP_BIND_FLAG) {
        <span class="hljs-keyword">var</span> result = createBind(func, bitmask, thisArg);
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
        result = createCurry(func, bitmask, arity);
      } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) &amp;&amp; !holders.length) {
        result = createPartial(func, bitmask, thisArg, partials);
      } <span class="hljs-keyword">else</span> {
        result = createHybrid.apply(<span class="hljs-literal">undefined</span>, newData);
      }
      <span class="hljs-keyword">var</span> setter = data ? baseSetData : setData;
      <span class="hljs-keyword">return</span> setWrapToString(setter(result, newData), func, bitmask);
    }</code></pre>
<p>看上去太复杂了，把无关的代码削减掉：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
      //      0000000100000000 &amp; 0000000000000010
      // var isBindKey = bitmask &amp; WRAP_BIND_KEY_FLAG;
      var isBindKey = 0;
      var length =  0;
      // if (!length) {
        //              0000000000100000 | 0000000001000000
        //            ~(0000000001100000)
        //              1111111110011111
        //             &amp;0000000100000000
        //              0000000100000000 = WRAP_ARY_FLAG 
        // bitmask &amp;= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);
      //  bitmask = WRAP_ARY_FLAG;
      //  partials = holders = undefined;
      // }
      bitmask = WRAP_ARY_FLAG;
      partials = holders = undefined;
      ary = undefined;
      arity = arity === undefined ? arity : toInteger(arity);
      // because holders == undefined
      //length -= 0;
      // because isBindKey  == 0
      // var data = isBindKey ? undefined : getData(func);
      var data = getData(func);
      var newData = [
        func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,
        argPos, ary, arity
      ];
      if (data) {
        mergeData(newData, data);
      }
      func = newData[0];
      bitmask = newData[1];
      thisArg = newData[2];
      partials = newData[3];
      holders = newData[4];
      arity = newData[9] = newData[9] === undefined
        ? func.length : newData[9];
      result = createHybrid.apply(undefined, newData);
      var setter = data ? baseSetData : setData;
      return setWrapToString(setter(result, newData), func, bitmask);
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createWrap</span>(<span class="hljs-params">func, bitmask, thisArg, partials, holders, argPos, ary, arity</span>) </span>{
      <span class="hljs-comment">//      0000000100000000 &amp; 0000000000000010</span>
      <span class="hljs-comment">// var isBindKey = bitmask &amp; WRAP_BIND_KEY_FLAG;</span>
      <span class="hljs-keyword">var</span> isBindKey = <span class="hljs-number">0</span>;
      <span class="hljs-keyword">var</span> length =  <span class="hljs-number">0</span>;
      <span class="hljs-comment">// if (!length) {</span>
        <span class="hljs-comment">//              0000000000100000 | 0000000001000000</span>
        <span class="hljs-comment">//            ~(0000000001100000)</span>
        <span class="hljs-comment">//              1111111110011111</span>
        <span class="hljs-comment">//             &amp;0000000100000000</span>
        <span class="hljs-comment">//              0000000100000000 = WRAP_ARY_FLAG </span>
        <span class="hljs-comment">// bitmask &amp;= ~(WRAP_PARTIAL_FLAG | WRAP_PARTIAL_RIGHT_FLAG);</span>
      <span class="hljs-comment">//  bitmask = WRAP_ARY_FLAG;</span>
      <span class="hljs-comment">//  partials = holders = undefined;</span>
      <span class="hljs-comment">// }</span>
      bitmask = WRAP_ARY_FLAG;
      partials = holders = <span class="hljs-literal">undefined</span>;
      ary = <span class="hljs-literal">undefined</span>;
      arity = arity === <span class="hljs-literal">undefined</span> ? arity : toInteger(arity);
      <span class="hljs-comment">// because holders == undefined</span>
      <span class="hljs-comment">//length -= 0;</span>
      <span class="hljs-comment">// because isBindKey  == 0</span>
      <span class="hljs-comment">// var data = isBindKey ? undefined : getData(func);</span>
      <span class="hljs-keyword">var</span> data = getData(func);
      <span class="hljs-keyword">var</span> newData = [
        func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,
        argPos, ary, arity
      ];
      <span class="hljs-keyword">if</span> (data) {
        mergeData(newData, data);
      }
      func = newData[<span class="hljs-number">0</span>];
      bitmask = newData[<span class="hljs-number">1</span>];
      thisArg = newData[<span class="hljs-number">2</span>];
      partials = newData[<span class="hljs-number">3</span>];
      holders = newData[<span class="hljs-number">4</span>];
      arity = newData[<span class="hljs-number">9</span>] = newData[<span class="hljs-number">9</span>] === <span class="hljs-literal">undefined</span>
        ? func.length : newData[<span class="hljs-number">9</span>];
      result = createHybrid.apply(<span class="hljs-literal">undefined</span>, newData);
      <span class="hljs-keyword">var</span> setter = data ? baseSetData : setData;
      <span class="hljs-keyword">return</span> setWrapToString(setter(result, newData), func, bitmask);
    }</code></pre>
<p>简化了一些之后我们来到了<code>createHybrid</code>函数，这个函数也巨复杂，所以我们还是按照简化方法，把我们用不到的逻辑给简化:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
      var isAry = bitmask &amp; WRAP_ARY_FLAG,
          isBind = bitmask &amp; WRAP_BIND_FLAG,
          isBindKey = bitmask &amp; WRAP_BIND_KEY_FLAG,
          isCurried = bitmask &amp; (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG),
          isFlip = bitmask &amp; WRAP_FLIP_FLAG,
          Ctor = isBindKey ? undefined : createCtor(func);

      function wrapper() {
        var length = arguments.length,
            args = Array(length),
            index = length;

        while (index--) {
          args[index] = arguments[index];
        }
        if (isCurried) {
          var placeholder = getHolder(wrapper),
              holdersCount = countHolders(args, placeholder);
        }
        if (partials) {
          args = composeArgs(args, partials, holders, isCurried);
        }
        if (partialsRight) {
          args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
        }
        length -= holdersCount;
        if (isCurried &amp;&amp; length < arity) {
          var newHolders = replaceHolders(args, placeholder);
          return createRecurry(
            func, bitmask, createHybrid, wrapper.placeholder, thisArg,
            args, newHolders, argPos, ary, arity - length
          );
        }
        var thisBinding = isBind ? thisArg : this,
            fn = isBindKey ? thisBinding[func] : func;

        length = args.length;
        if (argPos) {
          args = reorder(args, argPos);
        } else if (isFlip &amp;&amp; length > 1) {
          args.reverse();
        }
        if (isAry &amp;&amp; ary < length) {
          args.length = ary;
        }
        if (this &amp;&amp; this !== root &amp;&amp; this instanceof wrapper) {
          fn = Ctor || createCtor(fn);
        }
        return fn.apply(thisBinding, args);
      }
      return wrapper;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">   <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createHybrid</span>(<span class="hljs-params">func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity</span>) </span>{
      <span class="hljs-keyword">var</span> isAry = bitmask &amp; WRAP_ARY_FLAG,
          isBind = bitmask &amp; WRAP_BIND_FLAG,
          isBindKey = bitmask &amp; WRAP_BIND_KEY_FLAG,
          isCurried = bitmask &amp; (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG),
          isFlip = bitmask &amp; WRAP_FLIP_FLAG,
          Ctor = isBindKey ? <span class="hljs-literal">undefined</span> : createCtor(func);

      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">wrapper</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> length = <span class="hljs-built_in">arguments</span>.length,
            args = <span class="hljs-built_in">Array</span>(length),
            index = length;

        <span class="hljs-keyword">while</span> (index--) {
          args[index] = <span class="hljs-built_in">arguments</span>[index];
        }
        <span class="hljs-keyword">if</span> (isCurried) {
          <span class="hljs-keyword">var</span> placeholder = getHolder(wrapper),
              holdersCount = countHolders(args, placeholder);
        }
        <span class="hljs-keyword">if</span> (partials) {
          args = composeArgs(args, partials, holders, isCurried);
        }
        <span class="hljs-keyword">if</span> (partialsRight) {
          args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
        }
        length -= holdersCount;
        <span class="hljs-keyword">if</span> (isCurried &amp;&amp; length &lt; arity) {
          <span class="hljs-keyword">var</span> newHolders = replaceHolders(args, placeholder);
          <span class="hljs-keyword">return</span> createRecurry(
            func, bitmask, createHybrid, wrapper.placeholder, thisArg,
            args, newHolders, argPos, ary, arity - length
          );
        }
        <span class="hljs-keyword">var</span> thisBinding = isBind ? thisArg : <span class="hljs-keyword">this</span>,
            fn = isBindKey ? thisBinding[func] : func;

        length = args.length;
        <span class="hljs-keyword">if</span> (argPos) {
          args = reorder(args, argPos);
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (isFlip &amp;&amp; length &gt; <span class="hljs-number">1</span>) {
          args.reverse();
        }
        <span class="hljs-keyword">if</span> (isAry &amp;&amp; ary &lt; length) {
          args.length = ary;
        }
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span> &amp;&amp; <span class="hljs-keyword">this</span> !== root &amp;&amp; <span class="hljs-keyword">this</span> <span class="hljs-keyword">instanceof</span> wrapper) {
          fn = Ctor || createCtor(fn);
        }
        <span class="hljs-keyword">return</span> fn.apply(thisBinding, args);
      }
      <span class="hljs-keyword">return</span> wrapper;
    }</code></pre>
<p>把不需要的逻辑削减掉：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
      var isAry = 1;
      function wrapper() {
        var length = arguments.length,
            args = Array(length),
            index = length;
        while (index--) {
          args[index] = arguments[index];
        }
        var thisBinding = this, fn = func;
        length = args.length;
        if (isAry &amp;&amp; ary < length) {
          args.length = ary;
        }
        return fn.apply(thisBinding, args);
      }
      return wrapper;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">   <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createHybrid</span>(<span class="hljs-params">func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity</span>) </span>{
      <span class="hljs-keyword">var</span> isAry = <span class="hljs-number">1</span>;
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">wrapper</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> length = <span class="hljs-built_in">arguments</span>.length,
            args = <span class="hljs-built_in">Array</span>(length),
            index = length;
        <span class="hljs-keyword">while</span> (index--) {
          args[index] = <span class="hljs-built_in">arguments</span>[index];
        }
        <span class="hljs-keyword">var</span> thisBinding = <span class="hljs-keyword">this</span>, fn = func;
        length = args.length;
        <span class="hljs-keyword">if</span> (isAry &amp;&amp; ary &lt; length) {
          args.length = ary;
        }
        <span class="hljs-keyword">return</span> fn.apply(thisBinding, args);
      }
      <span class="hljs-keyword">return</span> wrapper;
    }</code></pre>
<p>好了，绕了一大圈，终于看到最终的逻辑了，<code>_.ary</code>函数其实就是把参数列表重新赋值了一下，并进行了长度限制。想想这个函数实在是太麻烦了，我们自己可以根据这个逻辑实现一个简化版的<code>_.ary</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ary(func,n){
    return function(){
        var length = arguments.length,
            args = Array(length),
            index = length;
          while(index--){
            args[index] = arguments[index];
        }
        args.length = n;
        return func.apply(this,args);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ary</span>(<span class="hljs-params">func,n</span>)</span>{
    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-keyword">var</span> length = <span class="hljs-built_in">arguments</span>.length,
            args = <span class="hljs-built_in">Array</span>(length),
            index = length;
          <span class="hljs-keyword">while</span>(index--){
            args[index] = <span class="hljs-built_in">arguments</span>[index];
        }
        args.length = n;
        <span class="hljs-keyword">return</span> func.apply(<span class="hljs-keyword">this</span>,args);
    }
}</code></pre>
<p>试试效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(_.map(['6','8','10'],ary(parseInt,1)));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(_.map([<span class="hljs-string">'6'</span>,<span class="hljs-string">'8'</span>,<span class="hljs-string">'10'</span>],ary(<span class="hljs-built_in">parseInt</span>,<span class="hljs-number">1</span>)));</code></pre>
<p>工作得很不错：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[ 6, 8, 10 ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">[ <span class="hljs-number">6</span>, <span class="hljs-number">8</span>, <span class="hljs-number">10</span> ]</code></pre>
<h2 id="articleHeader4">小结</h2>
<p>今天分析这三个函数就花了一整天的时间，但是收获颇丰，能够静下心来好好分析一个著名的开源库，并能够理解透里面的一些逻辑，确实是一件很有意思的事情。我会在有时间的时候把Lodash这个我很喜欢的库都好好分析一遍，尽我最大的努力将里面的逻辑表述清楚，希望能够简明易懂。</p>
<h2 id="articleHeader5">敬请期待</h2>
<p>最后，最晚下周一将会更新第二篇分析文章，敬请期待。</p>
<blockquote><p>© 版权所有，未经允许不得转载，宣传一下个人博客 <a href="https://chenquan.me" rel="nofollow noreferrer" target="_blank">chenquan.me</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Lodash 源码分析（一）“Function” Methods

## 原文链接
[https://segmentfault.com/a/1190000010775719](https://segmentfault.com/a/1190000010775719)

