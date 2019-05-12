---
title: 'ES2018 新特征之：异步迭代器 for-await-of' 
date: 2018-12-12 2:30:10
hidden: true
slug: e5xjwxfsxdv
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">ES2018 新特性</h2>
<ul>
<li>
<strong>异步迭代器</strong>（本文）</li>
<li><a href="http://esnext.justjavac.com/proposal/regexp-lookbehind.html" rel="nofollow noreferrer" target="_blank">正则表达式反向(lookbehind)断言</a></li>
<li><a href="http://esnext.justjavac.com/proposal/regexp-unicode-property-escapes.html" rel="nofollow noreferrer" target="_blank">正则表达式 Unicode 转义</a></li>
<li><a href="http://esnext.justjavac.com/proposal/template-literal-revision.html" rel="nofollow noreferrer" target="_blank">非转义序列的模板字符串</a></li>
<li><a href="http://esnext.justjavac.com/proposal/regexp-dotall-flag.html" rel="nofollow noreferrer" target="_blank">正则表达式 s/dotAll 模式</a></li>
<li><a href="http://esnext.justjavac.com/proposal/regexp-named-groups.html" rel="nofollow noreferrer" target="_blank">正则表达式命名捕获组</a></li>
<li><a href="http://esnext.justjavac.com/proposal/object-rest-spread.html" rel="nofollow noreferrer" target="_blank">对象展开运算符</a></li>
<li><a href="http://esnext.justjavac.com/api/Promise.prototype.finally.html" rel="nofollow noreferrer" target="_blank">Promise.prototype.finally</a></li>
</ul>
<h2 id="articleHeader1">1. 概述</h2>
<p>在 ECMAScript 2015(ES6) 中 JavaScript 引入了迭代器接口（iterator）用来遍历数据。迭代器对象知道如何每次访问集合中的一项， 并跟踪该序列中的当前位置。在  JavaScript 中迭代器是一个对象，它提供了一个 <code>next()</code> 方法，用来返回序列中的下一项。这个方法返回包含两个属性：<code>done</code> 和 <code>value</code>。</p>
<p>迭代器对象一旦被创建，就可以反复调用 <code>next()</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function makeIterator(array) {
  let nextIndex = 0;  // 初始索引

  // 返回一个迭代器对象，对象的属性是一个 next 方法
  return {
    next: function() {
      if (nextIndex < array.length) {
        // 当没有到达末尾时，返回当前值，并把索引加1
        return { value: array[nextIndex++], done: false };
      }

      // 到达末尾，done 属性为 true
      return {done: true};
    }
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">makeIterator</span>(<span class="hljs-params">array</span>) </span>{
  <span class="hljs-keyword">let</span> nextIndex = <span class="hljs-number">0</span>;  <span class="hljs-comment">// 初始索引</span>

  <span class="hljs-comment">// 返回一个迭代器对象，对象的属性是一个 next 方法</span>
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">next</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">if</span> (nextIndex &lt; array.length) {
        <span class="hljs-comment">// 当没有到达末尾时，返回当前值，并把索引加1</span>
        <span class="hljs-keyword">return</span> { <span class="hljs-attr">value</span>: array[nextIndex++], <span class="hljs-attr">done</span>: <span class="hljs-literal">false</span> };
      }

      <span class="hljs-comment">// 到达末尾，done 属性为 true</span>
      <span class="hljs-keyword">return</span> {<span class="hljs-attr">done</span>: <span class="hljs-literal">true</span>};
    }
  };
}</code></pre>
<p>一旦初始化，<code>next()</code> 方法可以用来依次访问对象中的键值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const it = makeIterator(['j', 'u', 's', 't']);
it.next().value;  // j
it.next().value;  // u
it.next().value;  // s
it.next().value;  // t
it.next().value;  // undefined
it.next().done;   // true
it.next().value;  // undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> it = makeIterator([<span class="hljs-string">'j'</span>, <span class="hljs-string">'u'</span>, <span class="hljs-string">'s'</span>, <span class="hljs-string">'t'</span>]);
it.next().value;  <span class="hljs-comment">// j</span>
it.next().value;  <span class="hljs-comment">// u</span>
it.next().value;  <span class="hljs-comment">// s</span>
it.next().value;  <span class="hljs-comment">// t</span>
it.next().value;  <span class="hljs-comment">// undefined</span>
it.next().done;   <span class="hljs-comment">// true</span>
it.next().value;  <span class="hljs-comment">// undefined</span></code></pre>
<h2 id="articleHeader2">2. 可迭代对象</h2>
<p>一个定义了<strong>迭代行为</strong>的对象，比如在 <code>for...of</code> 中循环了哪些值。为了实现可迭代，一个对象必须实现 <code>@@iterator</code> 方法，这意味着这个对象（或其原型链中的一个对象）必须具有带 <code>Symbol.iterator</code> 键的属性：</p>
<p><code>String</code>，<code>Array</code>，<code>TypedArray</code>，<code>Map</code> 和 <code>Set</code> 都内置可迭代对象，因为它们的原型对象都有一个 <code>Symbol.iterator</code> 方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const justjavac = {
  [Symbol.iterator]: () => {
    const items = [`j`, `u`, `s`, `t`, `j`, `a`, `v`, `a`, `c`];
    return {
      next: () => ({
        done: items.length === 0,
        value: items.shift()
      })
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> justjavac = {
  [<span class="hljs-built_in">Symbol</span>.iterator]: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> items = [<span class="hljs-string">`j`</span>, <span class="hljs-string">`u`</span>, <span class="hljs-string">`s`</span>, <span class="hljs-string">`t`</span>, <span class="hljs-string">`j`</span>, <span class="hljs-string">`a`</span>, <span class="hljs-string">`v`</span>, <span class="hljs-string">`a`</span>, <span class="hljs-string">`c`</span>];
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">next</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ({
        <span class="hljs-attr">done</span>: items.length === <span class="hljs-number">0</span>,
        <span class="hljs-attr">value</span>: items.shift()
      })
    }
  }
}</code></pre>
<p>当我们定义了可迭代对象后，就可以在 <code>Array.from</code>、<code>for...of</code> 中使用这个对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[...justjavac];
// [&quot;j&quot;, &quot;u&quot;, &quot;s&quot;, &quot;t&quot;, &quot;j&quot;, &quot;a&quot;, &quot;v&quot;, &quot;a&quot;, &quot;c&quot;]

Array.from(justjavac)
// [&quot;j&quot;, &quot;u&quot;, &quot;s&quot;, &quot;t&quot;, &quot;j&quot;, &quot;a&quot;, &quot;v&quot;, &quot;a&quot;, &quot;c&quot;]

new Set(justjavac);
// {&quot;j&quot;, &quot;u&quot;, &quot;s&quot;, &quot;t&quot;, &quot;a&quot;, &quot;v&quot;, &quot;c&quot;}

for (const item of justjavac) {
  console.log(item)
}
// j 
// u 
// s 
// t 
// j 
// a 
// v 
// a 
// c" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">[...justjavac];
<span class="hljs-comment">// ["j", "u", "s", "t", "j", "a", "v", "a", "c"]</span>

<span class="hljs-built_in">Array</span>.from(justjavac)
<span class="hljs-comment">// ["j", "u", "s", "t", "j", "a", "v", "a", "c"]</span>

<span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>(justjavac);
<span class="hljs-comment">// {"j", "u", "s", "t", "a", "v", "c"}</span>

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> item <span class="hljs-keyword">of</span> justjavac) {
  <span class="hljs-built_in">console</span>.log(item)
}
<span class="hljs-comment">// j </span>
<span class="hljs-comment">// u </span>
<span class="hljs-comment">// s </span>
<span class="hljs-comment">// t </span>
<span class="hljs-comment">// j </span>
<span class="hljs-comment">// a </span>
<span class="hljs-comment">// v </span>
<span class="hljs-comment">// a </span>
<span class="hljs-comment">// c</span></code></pre>
<h2 id="articleHeader3">3. 同步迭代</h2>
<p>由于在迭代器方法返回时，序列中的下一个值和数据源的 "done" 状态必须已知，所以迭代器只适合于表示<strong>同步</strong>数据源。</p>
<p>虽然 JavaScript 程序员遇到的许多数据源是同步的（比如内存中的列表和其他数据结构），但是其他许多数据源却不是。例如，任何需要 I/O 访问的数据源通常都会使用基于事件的或流式异步 API 来表示。不幸的是，迭代器不能用来表示这样的数据源。</p>
<p>（即使是 promise 的迭代器也是不够的，因为它的 value 是异步的，但是迭代器需要同步确定 "done" 状态。）</p>
<p>为了给异步数据源提供通用的数据访问协议，我们引入了 <code>AsyncIterator</code> 接口，异步迭代语句（<code>for-await-of</code>）和异步生成器函数。</p>
<h2 id="articleHeader4">4. 异步迭代器</h2>
<p>一个异步迭代器就像一个迭代器，除了它的 <code>next()</code> 方法返回一个 <code>{ value, done }</code> 的 promise。如上所述，我们必须返回迭代器结果的 promise，因为在迭代器方法返回时，迭代器的下一个值和“完成”状态可能未知。</p>
<p>我们修改一下之前的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" const justjavac = {
-  [Symbol.iterator]: () => {
+  [Symbol.asyncIterator]: () => {
     const items = [`j`, `u`, `s`, `t`, `j`, `a`, `v`, `a`, `c`];
     return {
-      next: () => ({
+      next: () => Promise.resolve({
         done: items.length === 0,
         value: items.shift()
       })
     }
   }
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="diff hljs"><code class="diff"> const justjavac = {
<span class="hljs-deletion">-  [Symbol.iterator]: () =&gt; {</span>
<span class="hljs-addition">+  [Symbol.asyncIterator]: () =&gt; {</span>
     const items = [`j`, `u`, `s`, `t`, `j`, `a`, `v`, `a`, `c`];
     return {
<span class="hljs-deletion">-      next: () =&gt; ({</span>
<span class="hljs-addition">+      next: () =&gt; Promise.resolve({</span>
         done: items.length <span class="hljs-comment">=== 0,</span>
         value: items.shift()
       })
     }
   }
 }</code></pre>
<p>好的，我们现在有了一个异步迭代器，代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const justjavac = {
  [Symbol.asyncIterator]: () => {
    const items = [`j`, `u`, `s`, `t`, `j`, `a`, `v`, `a`, `c`];
    return {
      next: () => Promise.resolve({
        done: items.length === 0,
        value: items.shift()
      })
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> justjavac = {
  [<span class="hljs-built_in">Symbol</span>.asyncIterator]: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> items = [<span class="hljs-string">`j`</span>, <span class="hljs-string">`u`</span>, <span class="hljs-string">`s`</span>, <span class="hljs-string">`t`</span>, <span class="hljs-string">`j`</span>, <span class="hljs-string">`a`</span>, <span class="hljs-string">`v`</span>, <span class="hljs-string">`a`</span>, <span class="hljs-string">`c`</span>];
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">next</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">Promise</span>.resolve({
        <span class="hljs-attr">done</span>: items.length === <span class="hljs-number">0</span>,
        <span class="hljs-attr">value</span>: items.shift()
      })
    }
  }
}</code></pre>
<p>我们可以使用如下代码进行遍历：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for await (const item of justjavac) {
  console.log(item)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">for</span> <span class="hljs-keyword">await</span> (<span class="hljs-keyword">const</span> item <span class="hljs-keyword">of</span> justjavac) {
  <span class="hljs-built_in">console</span>.log(item)
}</code></pre>
<p>如果你遇到了 <code>SyntaxError: for await (... of ...) is only valid in async functions and async generators</code> 错误，那是因为 <code>for-await-of</code> 只能在 async 函数或者 async 生成器里面使用。</p>
<p>修改一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(async function(){
  for await (const item of justjavac) {
    console.log(item)
  }
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">(<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">for</span> <span class="hljs-keyword">await</span> (<span class="hljs-keyword">const</span> item <span class="hljs-keyword">of</span> justjavac) {
    <span class="hljs-built_in">console</span>.log(item)
  }
})();</code></pre>
<h2 id="articleHeader5">5. 同步迭代器 vs 异步迭代器</h2>
<h3 id="articleHeader6">5.1 Iterators</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 迭代器
interface Iterator {
    next(value) : IteratorResult;
    [optional] throw(value) : IteratorResult;
    [optional] return(value) : IteratorResult;
}

// 迭代结果
interface IteratorResult {
    value : any;
    done : bool;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 迭代器</span>
interface Iterator {
    next(value) : IteratorResult;
    [optional] <span class="hljs-keyword">throw</span>(value) : IteratorResult;
    [optional] <span class="hljs-keyword">return</span>(value) : IteratorResult;
}

<span class="hljs-comment">// 迭代结果</span>
interface IteratorResult {
    <span class="hljs-attr">value</span> : any;
    done : bool;
}</code></pre>
<h3 id="articleHeader7">5.2 Async Iterators</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 异步迭代器
interface AsyncIterator {
    next(value) : Promise<IteratorResult>;
    [optional] throw(value) : Promise<IteratorResult>;
    [optional] return(value) : Promise<IteratorResult>;
}

// 迭代结果
interface IteratorResult {
    value : any;
    done : bool;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 异步迭代器</span>
interface AsyncIterator {
    next(value) : <span class="hljs-built_in">Promise</span>&lt;IteratorResult&gt;;
    [optional] <span class="hljs-keyword">throw</span>(value) : <span class="hljs-built_in">Promise</span>&lt;IteratorResult&gt;;
    [optional] <span class="hljs-keyword">return</span>(value) : <span class="hljs-built_in">Promise</span>&lt;IteratorResult&gt;;
}

<span class="hljs-comment">// 迭代结果</span>
interface IteratorResult {
    <span class="hljs-attr">value</span> : any;
    done : bool;
}</code></pre>
<h2 id="articleHeader8">6. 异步生成器函数</h2>
<p>异步生成器函数与生成器函数类似，但有以下区别：</p>
<ul>
<li>当被调用时，异步生成器函数返回一个对象，"async generator"，含有 3 个方法（<code>next</code>，<code>throw</code>，和<code>return</code>），每个方法都返回一个 Promise，Promise 返回 <code>{ value, done }</code>。而普通生成器函数并不返回 Promise，而是直接返回 <code>{ value, done }</code>。这会自动使返回的异步生成器对象具有异步迭代的功能。</li>
<li>允许使用 <code>await</code> 表达式和 <code>for-await-of</code> 语句。</li>
<li>修改了 <code>yield*</code> 的行为以支持异步迭代。</li>
</ul>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function* readLines(path) {
  let file = await fileOpen(path);

  try {
    while (!file.EOF) {
      yield await file.readLine();
    }
  } finally {
    await file.close();
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">readLines</span>(<span class="hljs-params">path</span>) </span>{
  <span class="hljs-keyword">let</span> file = <span class="hljs-keyword">await</span> fileOpen(path);

  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">while</span> (!file.EOF) {
      <span class="hljs-keyword">yield</span> <span class="hljs-keyword">await</span> file.readLine();
    }
  } <span class="hljs-keyword">finally</span> {
    <span class="hljs-keyword">await</span> file.close();
  }
}</code></pre>
<p>函数返回一个异步生成器（async generator）对象，可以用在 <code>for-await-of</code> 语句中。</p>
<h2 id="articleHeader9">7. 实现</h2>
<ul>
<li>
<a href="https://github.com/Microsoft/ChakraCore/issues/2720" rel="nofollow noreferrer" target="_blank">Chakra</a> - 暂未支持</li>
<li>
<a href="https://github.com/tc39/proposal-async-iteration/issues/63#issuecomment-330929480" rel="nofollow noreferrer" target="_blank">JavaScriptCore</a> - Safari Tech Preview 40</li>
<li>
<a href="https://github.com/tc39/proposal-async-iteration/issues/63#issuecomment-330978069" rel="nofollow noreferrer" target="_blank">SpiderMonkey</a> - Firefox 57</li>
<li>
<a href="https://blog.chromium.org/2017/10/chrome-63-beta-dynamic-module-imports_27.html" rel="nofollow noreferrer" target="_blank">V8</a> - Chrome 63</li>
</ul>
<h2 id="articleHeader10">Polyfills</h2>
<p>Facebook 的 <a href="https://github.com/facebook/regenerator" rel="nofollow noreferrer" target="_blank">Regenerator</a> 项目为 <code>AsyncIterator</code> 接口提供了一个 polyfill，将异步生成器函数变成返回 <code>AsyncIterator</code> 的对象 ECMAScript 5 函数。Regenerator 还不支持 <code>for-await-of</code> 异步迭代语法。</p>
<p><a href="https://github.com/babel/babel/tree/master/packages/babylon" rel="nofollow noreferrer" target="_blank">Babylon parser</a> 项目支持异步生成器函数和 <code>for- await-of</code> 语句（v6.8.0+）。你可以使用它的 <a href="https://github.com/babel/babel/tree/master/packages/babylon#plugins" rel="nofollow noreferrer" target="_blank">asyncGenerators 插件</a>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&quot;babylon&quot;).parse(&quot;code&quot;, {
  sourceType: &quot;module&quot;,
  plugins: [
    &quot;asyncGenerators&quot;
  ]
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">require</span>(<span class="hljs-string">"babylon"</span>).parse(<span class="hljs-string">"code"</span>, {
  <span class="hljs-attr">sourceType</span>: <span class="hljs-string">"module"</span>,
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-string">"asyncGenerators"</span>
  ]
});</code></pre>
<p>另外，从 6.16.0 开始，异步迭代被包含在 Babel 的 <a href="https://github.com/babel/babel/tree/master/packages/babel-plugin-transform-async-generator-functions" rel="nofollow noreferrer" target="_blank"><code>"babel-plugin-transform-async-generator-functions"</code></a> 下以及 <a href="http://babeljs.io/docs/plugins/preset-stage-3/" rel="nofollow noreferrer" target="_blank"><code>babel-preset-stage-3</code></a>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&quot;babel-core&quot;).transform(&quot;code&quot;, {
  plugins: [
    &quot;transform-async-generator-functions&quot;
  ]
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">require</span>(<span class="hljs-string">"babel-core"</span>).transform(<span class="hljs-string">"code"</span>, {
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-string">"transform-async-generator-functions"</span>
  ]
});</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES2018 新特征之：异步迭代器 for-await-of

## 原文链接
[https://segmentfault.com/a/1190000013387616](https://segmentfault.com/a/1190000013387616)

