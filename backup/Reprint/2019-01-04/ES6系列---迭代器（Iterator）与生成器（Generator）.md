---
title: 'ES6系列---迭代器（Iterator）与生成器（Generator）' 
date: 2019-01-04 2:30:10
hidden: true
slug: yb881ezh0ze
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">循环语句的问题</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var colors = [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;];
for(var i=0; i<colors.length; i++){
    console.log(colors[i]);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> colors = [<span class="hljs-string">"red"</span>, <span class="hljs-string">"green"</span>, <span class="hljs-string">"blue"</span>];
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>; i&lt;colors.length; i++){
    <span class="hljs-built_in">console</span>.log(colors[i]);
}</code></pre>
<p>在<code>ES6</code>之前，这种标准的for循环，通过变量来跟踪数组的索引。如果多个循环嵌套就需要追踪多个变量，代码复杂度会大大增加，也容易产生错用循环变量的bug。</p>
<p>迭代器的出现旨在消除这种复杂性并减少循环中的错误。</p>
<h1 id="articleHeader1">什么是迭代器</h1>
<p>我们先感受一下用<code>ES5</code>语法模拟创建一个迭代器：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createIterator(items) {
    var i = 0;
    
    return { // 返回一个迭代器对象
        next: function() { // 迭代器对象一定有个next()方法
            var done = (i >= items.length);
            var value = !done ? items[i++] : undefined;
            
            return { // next()方法返回结果对象
                value: value,
                done: done
            };
        }
    };
}

var iterator = createIterator([1, 2, 3]);

console.log(iterator.next());  // &quot;{ value: 1, done: false}&quot;
console.log(iterator.next());  // &quot;{ value: 2, done: false}&quot;
console.log(iterator.next());  // &quot;{ value: 3, done: false}&quot;
console.log(iterator.next());  // &quot;{ value: undefiend, done: true}&quot;
// 之后所有的调用都会返回相同内容
console.log(iterator.next());  // &quot;{ value: undefiend, done: true}&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createIterator</span>(<span class="hljs-params">items</span>) </span>{
    <span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>;
    
    <span class="hljs-keyword">return</span> { <span class="hljs-comment">// 返回一个迭代器对象</span>
        next: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-comment">// 迭代器对象一定有个next()方法</span>
            <span class="hljs-keyword">var</span> done = (i &gt;= items.length);
            <span class="hljs-keyword">var</span> value = !done ? items[i++] : <span class="hljs-literal">undefined</span>;
            
            <span class="hljs-keyword">return</span> { <span class="hljs-comment">// next()方法返回结果对象</span>
                value: value,
                <span class="hljs-attr">done</span>: done
            };
        }
    };
}

<span class="hljs-keyword">var</span> iterator = createIterator([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]);

<span class="hljs-built_in">console</span>.log(iterator.next());  <span class="hljs-comment">// "{ value: 1, done: false}"</span>
<span class="hljs-built_in">console</span>.log(iterator.next());  <span class="hljs-comment">// "{ value: 2, done: false}"</span>
<span class="hljs-built_in">console</span>.log(iterator.next());  <span class="hljs-comment">// "{ value: 3, done: false}"</span>
<span class="hljs-built_in">console</span>.log(iterator.next());  <span class="hljs-comment">// "{ value: undefiend, done: true}"</span>
<span class="hljs-comment">// 之后所有的调用都会返回相同内容</span>
<span class="hljs-built_in">console</span>.log(iterator.next());  <span class="hljs-comment">// "{ value: undefiend, done: true}"</span></code></pre>
<p>以上，我们通过调用createIterator()函数，返回一个对象，这个对象存在一个next()方法，当next()方法被调用时，返回格式{ value: 1, done: false}的结果对象。<br>因此，我们可以这么定义：迭代器是一个拥有next()方法的特殊对象，每次调用next()都返回一个结果对象。</p>
<p>借助这个迭代器对象，我们来改造刚开始那个标准的for循环【暂时先忘记ES6的for-of循环新特性】：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var colors = [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;];
var iterator = createIterator(colors);
while(!iterator.next().done){
    console.log(iterator.next().value);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> colors = [<span class="hljs-string">"red"</span>, <span class="hljs-string">"green"</span>, <span class="hljs-string">"blue"</span>];
<span class="hljs-keyword">var</span> iterator = createIterator(colors);
<span class="hljs-keyword">while</span>(!iterator.next().done){
    <span class="hljs-built_in">console</span>.log(iterator.next().value);
}</code></pre>
<p>what?，消除循环变量而已，需要搞这么麻烦，代码上不是得不偿失了吗？<br>并非如此，毕竟createIterator()只需写一次，就可以一直复用。不过<code>ES6</code>引入了生成器对象，可以让创建迭代器的过程变得更加简单。</p>
<h1 id="articleHeader2">什么是生成器</h1>
<p>生成器是一种返回迭代器的函数，通过<code>function</code>关键字后的星号（*）来表示，函数中会用到新的关键字<code>yield</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function *createIterator(items) {
    for(let i=0; i<items.length; i++) {
        yield items[i];
    }
}

let iterator = createIterator([1, 2, 3]);

// 既然生成器返回的是迭代器，自然就可以调用迭代器的next()方法
console.log(iterator.next());  // &quot;{ value: 1, done: false}&quot;
console.log(iterator.next());  // &quot;{ value: 2, done: false}&quot;
console.log(iterator.next());  // &quot;{ value: 3, done: false}&quot;
console.log(iterator.next());  // &quot;{ value: undefiend, done: true}&quot;
// 之后所有的调用都会返回相同内容
console.log(iterator.next());  // &quot;{ value: undefiend, done: true}&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> *<span class="hljs-title">createIterator</span>(<span class="hljs-params">items</span>) </span>{
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>; i&lt;items.length; i++) {
        <span class="hljs-keyword">yield</span> items[i];
    }
}

<span class="hljs-keyword">let</span> iterator = createIterator([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]);

<span class="hljs-comment">// 既然生成器返回的是迭代器，自然就可以调用迭代器的next()方法</span>
<span class="hljs-built_in">console</span>.log(iterator.next());  <span class="hljs-comment">// "{ value: 1, done: false}"</span>
<span class="hljs-built_in">console</span>.log(iterator.next());  <span class="hljs-comment">// "{ value: 2, done: false}"</span>
<span class="hljs-built_in">console</span>.log(iterator.next());  <span class="hljs-comment">// "{ value: 3, done: false}"</span>
<span class="hljs-built_in">console</span>.log(iterator.next());  <span class="hljs-comment">// "{ value: undefiend, done: true}"</span>
<span class="hljs-comment">// 之后所有的调用都会返回相同内容</span>
<span class="hljs-built_in">console</span>.log(iterator.next());  <span class="hljs-comment">// "{ value: undefiend, done: true}"</span></code></pre>
<p>上面，我们用<code>ES6</code>的生成器，大大简化了迭代器的创建过程。我们给生成器函数createIterator()传入一个items数组，函数内部，for循环不断从数组中生成新的元素放入迭代器中，每遇到一个<code>yield</code>语句循环都会停止；每次调用迭代器的next()方法，循环便继续运行并停止在下一条<code>yield</code>语句处。</p>
<h2 id="articleHeader3">生成器的创建方式</h2>
<p>生成器是个函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function *createIterator(items) { ... }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-keyword">function</span> *<span class="hljs-title">createIterator</span>(<span class="hljs-params">items</span>) </span>{ ... }</code></pre>
<p>可以用函数表达式方式书写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let createIterator = function *(item) { ... }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> createIterator = <span class="hljs-function"><span class="hljs-keyword">function</span> *(<span class="hljs-params">item</span>) </span>{ ... }</code></pre>
<p>也可以添加到对象中，<code>ES5</code>风格对象字面量：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let o = {
    createIterator: function *(items) { ... }
};

let iterator = o.createIterator([1, 2, 3]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> o = {
    <span class="hljs-attr">createIterator</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> *(<span class="hljs-params">items</span>) </span>{ ... }
};

<span class="hljs-keyword">let</span> iterator = o.createIterator([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]);</code></pre>
<p><code>ES6</code>风格的对象方法简写方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let o = {
    *createIterator(items) { ... }
};

let iterator = o.createIterator([1, 2, 3]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">let o</span> = {
    *createIterator(items) { ... }
};

<span class="hljs-attribute">let iterator</span> = o.createIterator([1, 2, 3]);</code></pre>
<h1 id="articleHeader4">可迭代（Iterable）对象</h1>
<p>在ES6中，所有的集合对象（数组、Set集合及Map集合）和字符串都是可迭代对象，可迭代对象都绑定了默认的迭代器。</p>
<p>来了来了，姗姗来迟的ES6循环新特性<code>for-of</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var colors = [&quot;red&quot;, &quot;green&quot;, &quot;blue&quot;];
for(let color of colors){
    console.log(color);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> colors = [<span class="hljs-string">"red"</span>, <span class="hljs-string">"green"</span>, <span class="hljs-string">"blue"</span>];
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> color <span class="hljs-keyword">of</span> colors){
    <span class="hljs-built_in">console</span>.log(color);
}</code></pre>
<p><code>for-of</code>循环，可作用在可迭代对象上，正是利用了可迭代对象上的默认迭代器。大致过程是：<code>for-of</code>循环每执行一次都会调用可迭代对象的next()方法，并将迭代器返回的结果对象的value属性存储在变量中，循环将继续执行这一过程直到返回对象的<code>done</code>属性的值为<code>true</code>。</p>
<p>如果只需要迭代数组或集合中的值，用for-of循环代替for循环是个不错的选择。</p>
<h2 id="articleHeader5">访问默认迭代器</h2>
<p>可迭代对象，都有一个Symbol.iterator方法，<code>for-of</code>循环时，通过调用<code>colors</code>数组的Symbol.iterator方法来获取默认迭代器的，这一过程是在<code>JavaScript</code>引擎背后完成的。</p>
<p>我们可以主动获取一下这个默认迭代器来感受一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let values = [1, 2, 3];
let iterator = values[Symbol.iterator]();

console.log(iterator.next());  // &quot;{ value: 1, done: false}&quot;
console.log(iterator.next());  // &quot;{ value: 2, done: false}&quot;
console.log(iterator.next());  // &quot;{ value: 3, done: false}&quot;
console.log(iterator.next());  // &quot;{ value: undefined, done: true}&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> values = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>];
<span class="hljs-keyword">let</span> iterator = values[<span class="hljs-built_in">Symbol</span>.iterator]();

<span class="hljs-built_in">console</span>.log(iterator.next());  <span class="hljs-comment">// "{ value: 1, done: false}"</span>
<span class="hljs-built_in">console</span>.log(iterator.next());  <span class="hljs-comment">// "{ value: 2, done: false}"</span>
<span class="hljs-built_in">console</span>.log(iterator.next());  <span class="hljs-comment">// "{ value: 3, done: false}"</span>
<span class="hljs-built_in">console</span>.log(iterator.next());  <span class="hljs-comment">// "{ value: undefined, done: true}"</span></code></pre>
<p>在这段代码中，通过Symbol.iterator获取了数组values的默认迭代器，并用它遍历数组中的元素。在JavaScript引擎中执行for-of循环语句也是类似的处理过程。</p>
<p>用Symbol.iterator属性来检测对象是否为可迭代对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function isIterator(object) {
    return typeof object[Symbol.iterator] === &quot;function&quot;;
}

console.log(isIterable([1, 2, 3]));  // true
console.log(isIterable(new Set()));  // true
console.log(isIterable(new Map()));  // true
console.log(isIterable(&quot;Hello&quot;));  // true
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isIterator</span>(<span class="hljs-params">object</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">typeof</span> object[<span class="hljs-built_in">Symbol</span>.iterator] === <span class="hljs-string">"function"</span>;
}

<span class="hljs-built_in">console</span>.log(isIterable([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]));  <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(isIterable(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>()));  <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(isIterable(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>()));  <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(isIterable(<span class="hljs-string">"Hello"</span>));  <span class="hljs-comment">// true</span>
</code></pre>
<h2 id="articleHeader6">创建可迭代对象</h2>
<p>当我们在创建对象时，给Symbol.iterator属性添加一个生成器，则可以将其变成可迭代对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let collection = {
    items: [],
    *[Symbol.iterator]() { // 将生成器赋值给对象的Symbol.iterator属性来创建默认的迭代器
        for(let item of this.items) {
            yield item;
        }
    }
};

collection.items.push(1);
collection.items.push(2);
collection.items.push(3);

for(let x of collection) {
    console.log(x);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> collection = {
    <span class="hljs-attr">items</span>: [],
    *[<span class="hljs-built_in">Symbol</span>.iterator]() { <span class="hljs-comment">// 将生成器赋值给对象的Symbol.iterator属性来创建默认的迭代器</span>
        <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> item <span class="hljs-keyword">of</span> <span class="hljs-keyword">this</span>.items) {
            <span class="hljs-keyword">yield</span> item;
        }
    }
};

collection.items.push(<span class="hljs-number">1</span>);
collection.items.push(<span class="hljs-number">2</span>);
collection.items.push(<span class="hljs-number">3</span>);

<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> x <span class="hljs-keyword">of</span> collection) {
    <span class="hljs-built_in">console</span>.log(x);
}</code></pre>
<h2 id="articleHeader7">内建迭代器</h2>
<p><code>ES6</code>中的集合对象，数组、<code>Set</code>集合和<code>Map</code>集合，都内建了三种迭代器：</p>
<ul>
<li><p>entries() 返回一个迭代器，其值为多个键值对。<br>  如果是数组，第一个元素是索引位置；如果是<code>Set</code>集合，第一个元素与第二个元素一样，都是值。</p></li>
<li><p>values() 返回一个迭代器，其值为集合的值。</p></li>
<li><p>keys() 返回一个迭代器，其值为集合中的所有键名。<br>  如果是数组，返回的是索引；如果是<code>Set</code>集合，返回的是值（<code>Set</code>的值被同时用作键和值）。</p></li>
</ul>
<h2 id="articleHeader8">不同集合的默认迭代器</h2>
<p>每个集合类型都有一个默认的迭代器，在for-of循环中，如果没有显式指定则使用默认的迭代器。按常规使用习惯，我们很容易猜到，数组和<code>Set</code>集合的默认迭代器是values()，<code>Map</code>集合的默认迭代器是entries()。</p>
<p>请看以下示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let colors = [ &quot;red&quot;, &quot;green&quot;, &quot;blue&quot;];
let tracking = new Set([1234, 5678, 9012]);
let data = new Map();

data.set(&quot;title&quot;, &quot;Understanding ECMAScript 6&quot;);
data.set(&quot;format&quot;, &quot;print&quot;);

// 与调用colors.values()方法相同
for(let value of colors) {
    console.log(value);
}

// 与调用tracking.values()方法相同
for(let num of tracking) {
    console.log(num);
}

// 与调用data.entries()方法相同
for(let entry of data) {
    console.log(entry);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> colors = [ <span class="hljs-string">"red"</span>, <span class="hljs-string">"green"</span>, <span class="hljs-string">"blue"</span>];
<span class="hljs-keyword">let</span> tracking = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-number">1234</span>, <span class="hljs-number">5678</span>, <span class="hljs-number">9012</span>]);
<span class="hljs-keyword">let</span> data = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>();

data.set(<span class="hljs-string">"title"</span>, <span class="hljs-string">"Understanding ECMAScript 6"</span>);
data.set(<span class="hljs-string">"format"</span>, <span class="hljs-string">"print"</span>);

<span class="hljs-comment">// 与调用colors.values()方法相同</span>
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> value <span class="hljs-keyword">of</span> colors) {
    <span class="hljs-built_in">console</span>.log(value);
}

<span class="hljs-comment">// 与调用tracking.values()方法相同</span>
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> num <span class="hljs-keyword">of</span> tracking) {
    <span class="hljs-built_in">console</span>.log(num);
}

<span class="hljs-comment">// 与调用data.entries()方法相同</span>
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> entry <span class="hljs-keyword">of</span> data) {
    <span class="hljs-built_in">console</span>.log(entry);
}</code></pre>
<p>这段代码会输入以下内容：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;red&quot;
&quot;green&quot;
&quot;blue&quot;
1234
5678
9012
[&quot;title&quot;, &quot;Understanding ECMAScript 6&quot;]
[&quot;format&quot;, &quot;print&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code><span class="hljs-string">"red"</span>
<span class="hljs-string">"green"</span>
<span class="hljs-string">"blue"</span>
<span class="hljs-number">1234</span>
<span class="hljs-number">5678</span>
<span class="hljs-number">9012</span>
[<span class="hljs-string">"title"</span>, <span class="hljs-string">"Understanding ECMAScript 6"</span>]
[<span class="hljs-string">"format"</span>, <span class="hljs-string">"print"</span>]</code></pre>
<p>for-of循环配合解构特性，操纵数据会更方便：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for(let [key, value] of data) {
    console.log(key + &quot;=&quot; + value);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code><span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> [key, <span class="hljs-keyword">value</span>] <span class="hljs-keyword">of</span> data) {
    console.log(key + <span class="hljs-string">"="</span> + <span class="hljs-keyword">value</span>);
}</code></pre>
<h2 id="articleHeader9">用展开运算符操纵</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let set = new Set([1, 2, 3, 4, 5]),
    array = [...set];
    
console.log(array);  // [1,2,3,4,5]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smali"><code>let set =<span class="hljs-built_in"> new </span>Set([1, 2, 3, 4, 5]),
   <span class="hljs-built_in"> array </span>= [...set];
    
console.log(array);  // [1,2,3,4,5]</code></pre>
<p>展开运算符可以操作所有的可迭代对象，并根据默认迭代器来选取要引用的值，从迭代器读取所有值。然后按返回顺序将它们依次插入到数组中。因此如果想将可迭代对象转换为数组，用展开运算符是最简单的方法。</p>
<h1 id="articleHeader10">迭代器高级功能</h1>
<h2 id="articleHeader11">给迭代器传参</h2>
<p>前面我们看到，在迭代器内部使用yield关键字可以生成值，在外面可以用迭代器的next()方法获得返回值。<br>其实next()方法还可以接收参数，这个参数的值就会代替生成器内部上一条yield语句的返回值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function *createIterator() {
    let first = yield 1;
    let second = yield first + 2;  // 4 + 2
    yield second + 3;  // 5 + 3
}

let iterator = createIterator();

console.log(iterator.next());  // &quot;{ value: 1, done: false }&quot;
console.log(iterator.next(4)); // &quot;{ value: 6, done: false }&quot;
console.log(iterator.next(5)); // &quot;{ value: 8, done: false }&quot;
console.log(iterator.next());  // &quot;{ value: undefined, done: true }&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> *<span class="hljs-title">createIterator</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> first = <span class="hljs-keyword">yield</span> <span class="hljs-number">1</span>;
    <span class="hljs-keyword">let</span> second = <span class="hljs-keyword">yield</span> first + <span class="hljs-number">2</span>;  <span class="hljs-comment">// 4 + 2</span>
    <span class="hljs-keyword">yield</span> second + <span class="hljs-number">3</span>;  <span class="hljs-comment">// 5 + 3</span>
}

<span class="hljs-keyword">let</span> iterator = createIterator();

<span class="hljs-built_in">console</span>.log(iterator.next());  <span class="hljs-comment">// "{ value: 1, done: false }"</span>
<span class="hljs-built_in">console</span>.log(iterator.next(<span class="hljs-number">4</span>)); <span class="hljs-comment">// "{ value: 6, done: false }"</span>
<span class="hljs-built_in">console</span>.log(iterator.next(<span class="hljs-number">5</span>)); <span class="hljs-comment">// "{ value: 8, done: false }"</span>
<span class="hljs-built_in">console</span>.log(iterator.next());  <span class="hljs-comment">// "{ value: undefined, done: true }"</span></code></pre>
<p>下图的阴影展示了每次yield前正在执行的代码，可以辅助理解程序内部的具体细节：</p>
<p><span class="img-wrap"><img data-src="/img/bVTgFC?w=313&amp;h=110" src="https://static.alili.tech/img/bVTgFC?w=313&amp;h=110" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>在生成器内部，浅红色高亮的是next()方法的第一次调用，浅绿色标识了next(4)的调用过程，紫色标示了next(5)的调用过程，分别返回每一次yield生成的值。这里有一个过程很复杂，在执行左侧代码前，右侧的每一个表达式会先执行再停止。<br>这里有个特例，第一次调用next()方法时无论传入什么参数都会被丢弃。由于传递给next()方法的参数会代替上一次yield的返回值，而在第一次调用next()方法前不会执行任何yield语句，因此在第一次调用next()方法时传递参数是毫无意义的。</p>
<h2 id="articleHeader12">在迭代器中抛出错误</h2>
<p>除了给迭代器传递数据外，还可以给它传递错误条件。通过throw()方法，当迭代器恢复执行时可令其抛出一个错误。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function *createIterator() {
    let first = yield 1;
    let second = yield first + 2;  // yield 4 + 2, 然后抛出错误
    yield second + 3;              // 永远不会被执行
}

let iterator = createIterator();

console.log(iterator.next());                    // &quot;{ value: 1, done: false }&quot;
console.log(iterator.next(4));                   // &quot;{ value: 6, done: false }&quot;
console.log(iterator.throw(new Error(&quot;Boom&quot;)));  // 从生成器中抛出错误" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> *<span class="hljs-title">createIterator</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> first = <span class="hljs-keyword">yield</span> <span class="hljs-number">1</span>;
    <span class="hljs-keyword">let</span> second = <span class="hljs-keyword">yield</span> first + <span class="hljs-number">2</span>;  <span class="hljs-comment">// yield 4 + 2, 然后抛出错误</span>
    <span class="hljs-keyword">yield</span> second + <span class="hljs-number">3</span>;              <span class="hljs-comment">// 永远不会被执行</span>
}

<span class="hljs-keyword">let</span> iterator = createIterator();

<span class="hljs-built_in">console</span>.log(iterator.next());                    <span class="hljs-comment">// "{ value: 1, done: false }"</span>
<span class="hljs-built_in">console</span>.log(iterator.next(<span class="hljs-number">4</span>));                   <span class="hljs-comment">// "{ value: 6, done: false }"</span>
<span class="hljs-built_in">console</span>.log(iterator.throw(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">"Boom"</span>)));  <span class="hljs-comment">// 从生成器中抛出错误</span></code></pre>
<p>这个示例中，前两个表达式正常求值，而调用throw()后，在继续执行let second求值前，错误就会被抛出并阻止代码继续执行。<br>知道了这一点，就可以在生成器内部通过try-catch代码块来捕获这些错误：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function *createIterator() {
    let first = yield 1;
    let second;
    
    try {
        second = yield first + 2;  // yield 4 + 2, 然后抛出错误
    } catch(e) {
        second = 6;
    }
    yield second + 3;
}

let iterator = createIterator();

console.log(iterator.next());                    // &quot;{ value: 1, done: false }&quot;
console.log(iterator.next(4));                   // &quot;{ value: 6, done: false }&quot;
console.log(iterator.throw(new Error(&quot;Boom&quot;)));  // &quot;{ value: 9, done: false }&quot;
console.log(iterator.next());                    // &quot;{ value: undefined, done: true }&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> *<span class="hljs-title">createIterator</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> first = <span class="hljs-keyword">yield</span> <span class="hljs-number">1</span>;
    <span class="hljs-keyword">let</span> second;
    
    <span class="hljs-keyword">try</span> {
        second = <span class="hljs-keyword">yield</span> first + <span class="hljs-number">2</span>;  <span class="hljs-comment">// yield 4 + 2, 然后抛出错误</span>
    } <span class="hljs-keyword">catch</span>(e) {
        second = <span class="hljs-number">6</span>;
    }
    <span class="hljs-keyword">yield</span> second + <span class="hljs-number">3</span>;
}

<span class="hljs-keyword">let</span> iterator = createIterator();

<span class="hljs-built_in">console</span>.log(iterator.next());                    <span class="hljs-comment">// "{ value: 1, done: false }"</span>
<span class="hljs-built_in">console</span>.log(iterator.next(<span class="hljs-number">4</span>));                   <span class="hljs-comment">// "{ value: 6, done: false }"</span>
<span class="hljs-built_in">console</span>.log(iterator.throw(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">"Boom"</span>)));  <span class="hljs-comment">// "{ value: 9, done: false }"</span>
<span class="hljs-built_in">console</span>.log(iterator.next());                    <span class="hljs-comment">// "{ value: undefined, done: true }"</span></code></pre>
<p>这里有个有趣的现象：调用throw()方法后也会像调用next()方法一样返回一个结果对象。由于在生成器内部捕获了这个错误，因而会继续执行下一条yield语句，最终返回数值9。<br>如此一来，next()和throw()就像是迭代器的两条指令，调用next()方法命令迭代器继续执行（可能提供一个值），调用throw()方法也会命令迭代器继续执行，但同时抛出一个错误，在此之后的执行过程取决于生成器内部的代码。</p>
<h2 id="articleHeader13">生成器返回语句</h2>
<p>由于生成器也是函数，因此可以通过return语句提前退出函数执行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function *createIterator() {
    yield 1;
    return;
    yield 2;
    yield 3;
}

let iterator = createIterator();

console.log(iterator.next());      // &quot;{ value: 1, done: false }&quot;
console.log(iterator.next());      // &quot;{ value: undefined, done: true }&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> *<span class="hljs-title">createIterator</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">yield</span> <span class="hljs-number">1</span>;
    <span class="hljs-keyword">return</span>;
    <span class="hljs-keyword">yield</span> <span class="hljs-number">2</span>;
    <span class="hljs-keyword">yield</span> <span class="hljs-number">3</span>;
}

<span class="hljs-keyword">let</span> iterator = createIterator();

<span class="hljs-built_in">console</span>.log(iterator.next());      <span class="hljs-comment">// "{ value: 1, done: false }"</span>
<span class="hljs-built_in">console</span>.log(iterator.next());      <span class="hljs-comment">// "{ value: undefined, done: true }"</span></code></pre>
<p>这段代码中的生成器包含多条yield语句和一条return语句，其中return语句紧随第一条yield语句，其后的yield语句将不会被执行。<br>在return语句中也可以指定一个返回值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function *createIterator() {
    yield 1;
    return 10;
}

let iterator = createIterator();

console.log(iterator.next());      // &quot;{ value: 1, done: false }&quot;
console.log(iterator.next());      // &quot;{ value: 10, done: true }&quot;
console.log(iterator.next());      // &quot;{ value: undefined, done: true }&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> *<span class="hljs-title">createIterator</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">yield</span> <span class="hljs-number">1</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-number">10</span>;
}

<span class="hljs-keyword">let</span> iterator = createIterator();

<span class="hljs-built_in">console</span>.log(iterator.next());      <span class="hljs-comment">// "{ value: 1, done: false }"</span>
<span class="hljs-built_in">console</span>.log(iterator.next());      <span class="hljs-comment">// "{ value: 10, done: true }"</span>
<span class="hljs-built_in">console</span>.log(iterator.next());      <span class="hljs-comment">// "{ value: undefined, done: true }"</span></code></pre>
<p>通过return语句指定的返回值，只会在返回对象中出现一次，在后续调用返回的对象中，value属性会被重置为undefined。</p>
<h2 id="articleHeader14">委托生成器</h2>
<p>在某些情况下，需要将两个迭代器合二为一，这时可以创建一个生成器，再给yield语句添加一个星号，就可以将生成数据的过程委托给其他生成器。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function *createNumberIterator() {
    yield 1;
    yield 2;
}

function *createColorIterator() {
    yield &quot;red&quot;;
    yield &quot;green&quot;;
}

function *createCombinedIterator() {
    yield *createNumberIterator();
    yield *createColorIterator();
    yield true;
}

var iterator = createCombinedIterator();

console.log(iterator.next());      // &quot;{ value: 1, done: false }&quot;
console.log(iterator.next());      // &quot;{ value: 2, done: false }&quot;
console.log(iterator.next());      // &quot;{ value: &quot;red&quot;, done: false }&quot;
console.log(iterator.next());      // &quot;{ value: &quot;green&quot;, done: false }&quot;
console.log(iterator.next());      // &quot;{ value: true, done: false }&quot;
console.log(iterator.next());      // &quot;{ value: undfined, done: true }&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> *<span class="hljs-title">createNumberIterator</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">yield</span> <span class="hljs-number">1</span>;
    <span class="hljs-keyword">yield</span> <span class="hljs-number">2</span>;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> *<span class="hljs-title">createColorIterator</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">yield</span> <span class="hljs-string">"red"</span>;
    <span class="hljs-keyword">yield</span> <span class="hljs-string">"green"</span>;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> *<span class="hljs-title">createCombinedIterator</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">yield</span> *createNumberIterator();
    <span class="hljs-keyword">yield</span> *createColorIterator();
    <span class="hljs-keyword">yield</span> <span class="hljs-literal">true</span>;
}

<span class="hljs-keyword">var</span> iterator = createCombinedIterator();

<span class="hljs-built_in">console</span>.log(iterator.next());      <span class="hljs-comment">// "{ value: 1, done: false }"</span>
<span class="hljs-built_in">console</span>.log(iterator.next());      <span class="hljs-comment">// "{ value: 2, done: false }"</span>
<span class="hljs-built_in">console</span>.log(iterator.next());      <span class="hljs-comment">// "{ value: "red", done: false }"</span>
<span class="hljs-built_in">console</span>.log(iterator.next());      <span class="hljs-comment">// "{ value: "green", done: false }"</span>
<span class="hljs-built_in">console</span>.log(iterator.next());      <span class="hljs-comment">// "{ value: true, done: false }"</span>
<span class="hljs-built_in">console</span>.log(iterator.next());      <span class="hljs-comment">// "{ value: undfined, done: true }"</span></code></pre>
<p>有了委托生成器这个信功能，你可以进一步利用生成器的返回值来处理复杂任务：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function *createNumberIterator() {
    yield 1;
    yield 2;
    return 3;
}

function *createRepeatingIterator(count) {
    for(let i=0; i<count; i++) {
        yield &quot;repeat&quot;;
    }
}

function *createCombinedIterator() {
    let result = yield *createNumberIterator();
    yield *createRepeatingIterator(result);
}

var iterator = createCombinedIterator();

console.log(iterator.next());      // &quot;{ value: 1, done: false }&quot;
console.log(iterator.next());      // &quot;{ value: 2, done: false }&quot;
console.log(iterator.next());      // &quot;{ value: &quot;repeat&quot;, done: false }&quot;
console.log(iterator.next());      // &quot;{ value: &quot;repeat&quot;, done: false }&quot;
console.log(iterator.next());      // &quot;{ value: &quot;repeat&quot;, done: false }&quot;
console.log(iterator.next());      // &quot;{ value: undfined, done: true }&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> *<span class="hljs-title">createNumberIterator</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">yield</span> <span class="hljs-number">1</span>;
    <span class="hljs-keyword">yield</span> <span class="hljs-number">2</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-number">3</span>;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> *<span class="hljs-title">createRepeatingIterator</span>(<span class="hljs-params">count</span>) </span>{
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>; i&lt;count; i++) {
        <span class="hljs-keyword">yield</span> <span class="hljs-string">"repeat"</span>;
    }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> *<span class="hljs-title">createCombinedIterator</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> result = <span class="hljs-keyword">yield</span> *createNumberIterator();
    <span class="hljs-keyword">yield</span> *createRepeatingIterator(result);
}

<span class="hljs-keyword">var</span> iterator = createCombinedIterator();

<span class="hljs-built_in">console</span>.log(iterator.next());      <span class="hljs-comment">// "{ value: 1, done: false }"</span>
<span class="hljs-built_in">console</span>.log(iterator.next());      <span class="hljs-comment">// "{ value: 2, done: false }"</span>
<span class="hljs-built_in">console</span>.log(iterator.next());      <span class="hljs-comment">// "{ value: "repeat", done: false }"</span>
<span class="hljs-built_in">console</span>.log(iterator.next());      <span class="hljs-comment">// "{ value: "repeat", done: false }"</span>
<span class="hljs-built_in">console</span>.log(iterator.next());      <span class="hljs-comment">// "{ value: "repeat", done: false }"</span>
<span class="hljs-built_in">console</span>.log(iterator.next());      <span class="hljs-comment">// "{ value: undfined, done: true }"</span></code></pre>
<p>注意，无论通过何种方式调用迭代器的next()方法，数值3永远不会被返回，它只存在于生成器createCombinedIterator()的内部。但如果想输出这个值，则可以额外添加一条yield语句：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function *createNumberIterator() {
    yield 1;
    yield 2;
    return 3;
}

function *createRepeatingIterator(count) {
    for(let i=0; i<count; i++) {
        yield &quot;repeat&quot;;
    }
}

function *createCombinedIterator() {
    let result = yield *createNumberIterator();
    yield result;  // 这里加一句yield
    yield *createRepeatingIterator(result);
}

var iterator = createCombinedIterator();

console.log(iterator.next());      // &quot;{ value: 1, done: false }&quot;
console.log(iterator.next());      // &quot;{ value: 2, done: false }&quot;
console.log(iterator.next());      // &quot;{ value: 3, done: false }&quot;
console.log(iterator.next());      // &quot;{ value: &quot;repeat&quot;, done: false }&quot;
console.log(iterator.next());      // &quot;{ value: &quot;repeat&quot;, done: false }&quot;
console.log(iterator.next());      // &quot;{ value: &quot;repeat&quot;, done: false }&quot;
console.log(iterator.next());      // &quot;{ value: undfined, done: true }&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> *<span class="hljs-title">createNumberIterator</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">yield</span> <span class="hljs-number">1</span>;
    <span class="hljs-keyword">yield</span> <span class="hljs-number">2</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-number">3</span>;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> *<span class="hljs-title">createRepeatingIterator</span>(<span class="hljs-params">count</span>) </span>{
    <span class="hljs-keyword">for</span>(<span class="hljs-keyword">let</span> i=<span class="hljs-number">0</span>; i&lt;count; i++) {
        <span class="hljs-keyword">yield</span> <span class="hljs-string">"repeat"</span>;
    }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> *<span class="hljs-title">createCombinedIterator</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> result = <span class="hljs-keyword">yield</span> *createNumberIterator();
    <span class="hljs-keyword">yield</span> result;  <span class="hljs-comment">// 这里加一句yield</span>
    <span class="hljs-keyword">yield</span> *createRepeatingIterator(result);
}

<span class="hljs-keyword">var</span> iterator = createCombinedIterator();

<span class="hljs-built_in">console</span>.log(iterator.next());      <span class="hljs-comment">// "{ value: 1, done: false }"</span>
<span class="hljs-built_in">console</span>.log(iterator.next());      <span class="hljs-comment">// "{ value: 2, done: false }"</span>
<span class="hljs-built_in">console</span>.log(iterator.next());      <span class="hljs-comment">// "{ value: 3, done: false }"</span>
<span class="hljs-built_in">console</span>.log(iterator.next());      <span class="hljs-comment">// "{ value: "repeat", done: false }"</span>
<span class="hljs-built_in">console</span>.log(iterator.next());      <span class="hljs-comment">// "{ value: "repeat", done: false }"</span>
<span class="hljs-built_in">console</span>.log(iterator.next());      <span class="hljs-comment">// "{ value: "repeat", done: false }"</span>
<span class="hljs-built_in">console</span>.log(iterator.next());      <span class="hljs-comment">// "{ value: undfined, done: true }"</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6系列---迭代器（Iterator）与生成器（Generator）

## 原文链接
[https://segmentfault.com/a/1190000010747122](https://segmentfault.com/a/1190000010747122)

