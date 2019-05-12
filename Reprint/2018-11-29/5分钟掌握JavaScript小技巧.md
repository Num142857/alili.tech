---
title: '5分钟掌握JavaScript小技巧' 
date: 2018-11-29 9:34:56
hidden: true
slug: 8twgp4of3a
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>译者按：</strong> 技巧虽好、重在掌握并使用起来！</p>
<ul>
<li>原文: <a href="https://medium.freecodecamp.org/9-neat-javascript-tricks-e2742f2735c3" rel="nofollow noreferrer" target="_blank">Learn these neat JavaScript tricks in less than 5 minutes</a>
</li>
<li>译者: <a href="https://fundebug.com/" rel="nofollow noreferrer" target="_blank">Fundebug</a>
</li>
</ul>
<p><strong>为了保证可读性，本文采用意译而非直译。另外，本文版权归原作者所有，翻译仅用于学习。</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVbaXhp?w=1920&amp;h=500" src="https://static.alili.tech/img/bVbaXhp?w=1920&amp;h=500" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader0">1. 删除数组尾部元素</h3>
<p>一个简单的用来清空或则删除数组尾部元素的简单方法就是改变数组的length属性值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const arr = [11, 22, 33, 44, 55, 66];
// truncanting
arr.length = 3;
console.log(arr); //=> [11, 22, 33]
// clearing
arr.length = 0;
console.log(arr); //=> []
console.log(arr[2]); //=> undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> arr = [<span class="hljs-number">11</span>, <span class="hljs-number">22</span>, <span class="hljs-number">33</span>, <span class="hljs-number">44</span>, <span class="hljs-number">55</span>, <span class="hljs-number">66</span>];
<span class="hljs-comment">// truncanting</span>
arr.length = <span class="hljs-number">3</span>;
<span class="hljs-built_in">console</span>.log(arr); <span class="hljs-comment">//=&gt; [11, 22, 33]</span>
<span class="hljs-comment">// clearing</span>
arr.length = <span class="hljs-number">0</span>;
<span class="hljs-built_in">console</span>.log(arr); <span class="hljs-comment">//=&gt; []</span>
<span class="hljs-built_in">console</span>.log(arr[<span class="hljs-number">2</span>]); <span class="hljs-comment">//=&gt; undefined</span></code></pre>
<h3 id="articleHeader1">2.使用对象解构来模拟命名参数</h3>
<p>如果你需要将一系列可选项作为参数传入函数，那么你也许倾向于使用了一个对象(Object)来定义配置(Config)。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="doSomething({ foo: 'Hello', bar: 'Hey!', baz: 42 });
function doSomething(config) {
    const foo = config.foo !== undefined ? config.foo : 'Hi';
    const bar = config.bar !== undefined ? config.bar : 'Yo!';
      const baz = config.baz !== undefined ? config.baz : 13;
      // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">doSomething({ <span class="hljs-attr">foo</span>: <span class="hljs-string">'Hello'</span>, <span class="hljs-attr">bar</span>: <span class="hljs-string">'Hey!'</span>, <span class="hljs-attr">baz</span>: <span class="hljs-number">42</span> });
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doSomething</span>(<span class="hljs-params">config</span>) </span>{
    <span class="hljs-keyword">const</span> foo = config.foo !== <span class="hljs-literal">undefined</span> ? config.foo : <span class="hljs-string">'Hi'</span>;
    <span class="hljs-keyword">const</span> bar = config.bar !== <span class="hljs-literal">undefined</span> ? config.bar : <span class="hljs-string">'Yo!'</span>;
      <span class="hljs-keyword">const</span> baz = config.baz !== <span class="hljs-literal">undefined</span> ? config.baz : <span class="hljs-number">13</span>;
      <span class="hljs-comment">// ...</span>
}</code></pre>
<p>这是一个陈旧、但是很有效的方法，它模拟了JavaScript中的命名参数。不过呢，在<code>doSomething</code>中处理<code>config</code>的方式略显繁琐。在ES2015中，你可以直接使用对象解构。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function doSomething({ foo = 'Hi', bar = 'Yo!', baz = 13 }) {
  // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doSomething</span>(<span class="hljs-params">{ foo = <span class="hljs-string">'Hi'</span>, bar = <span class="hljs-string">'Yo!'</span>, baz = <span class="hljs-number">13</span> }</span>) </span>{
  <span class="hljs-comment">// ...</span>
}</code></pre>
<p>如果你想让这个参数是可选的，也很简单。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function doSomething({ foo = 'Hi', bar = 'Yo!', baz = 13 } = {}) {
  // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">doSomething</span>(<span class="hljs-params">{ foo = <span class="hljs-string">'Hi'</span>, bar = <span class="hljs-string">'Yo!'</span>, baz = <span class="hljs-number">13</span> } = {}</span>) </span>{
  <span class="hljs-comment">// ...</span>
}</code></pre>
<h3 id="articleHeader2">3. 使用对象解构来处理数组</h3>
<p>可以使用对象解构的语法来获取数组的元素：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const csvFileLine = '1997,John Doe,US,john@doe.com,New York';
const { 2: country, 4: state } = csvFileLine.split(',');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> csvFileLine = <span class="hljs-string">'1997,John Doe,US,john@doe.com,New York'</span>;
<span class="hljs-keyword">const</span> { <span class="hljs-number">2</span>: country, <span class="hljs-number">4</span>: state } = csvFileLine.split(<span class="hljs-string">','</span>);</code></pre>
<h3 id="articleHeader3">4. 在switch语句中用范围值</h3>
<p>可以使用下面的技巧来写满足范围值的switch语句：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getWaterState(tempInCelsius) {
  let state;
  
  switch (true) {
    case (tempInCelsius <= 0): 
      state = 'Solid';
      break;
    case (tempInCelsius > 0 &amp;&amp; tempInCelsius < 100): 
      state = 'Liquid';
      break;
    default: 
      state = 'Gas';
  }
  return state;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getWaterState</span>(<span class="hljs-params">tempInCelsius</span>) </span>{
  <span class="hljs-keyword">let</span> state;
  
  <span class="hljs-keyword">switch</span> (<span class="hljs-literal">true</span>) {
    <span class="hljs-keyword">case</span> (tempInCelsius &lt;= <span class="hljs-number">0</span>): 
      state = <span class="hljs-string">'Solid'</span>;
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> (tempInCelsius &gt; <span class="hljs-number">0</span> &amp;&amp; tempInCelsius &lt; <span class="hljs-number">100</span>): 
      state = <span class="hljs-string">'Liquid'</span>;
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">default</span>: 
      state = <span class="hljs-string">'Gas'</span>;
  }
  <span class="hljs-keyword">return</span> state;
}</code></pre>
<h3 id="articleHeader4">5. await多个async函数</h3>
<p>在使用async/await的时候，可以使用Promise.all来await多个async函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="await Promise.all([anAsyncCall(), thisIsAlsoAsync(), oneMore()])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>.all([anAsyncCall(), thisIsAlsoAsync(), oneMore()])</code></pre>
<h3 id="articleHeader5">6. 创建一个纯(pure)对象</h3>
<p>你可以创建一个100%的纯对象，他不从<code>Object</code>中继承任何属性或则方法（比如，<code>constructor</code>，<code>toString()</code>等等）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const pureObject = Object.create(null);
console.log(pureObject); //=> {}
console.log(pureObject.constructor); //=> undefined
console.log(pureObject.toString); //=> undefined
console.log(pureObject.hasOwnProperty); //=> undefined" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> pureObject = <span class="hljs-built_in">Object</span>.create(<span class="hljs-literal">null</span>);
<span class="hljs-built_in">console</span>.log(pureObject); <span class="hljs-comment">//=&gt; {}</span>
<span class="hljs-built_in">console</span>.log(pureObject.constructor); <span class="hljs-comment">//=&gt; undefined</span>
<span class="hljs-built_in">console</span>.log(pureObject.toString); <span class="hljs-comment">//=&gt; undefined</span>
<span class="hljs-built_in">console</span>.log(pureObject.hasOwnProperty); <span class="hljs-comment">//=&gt; undefined</span></code></pre>
<h3 id="articleHeader6">7. 格式化JSON代码</h3>
<p><code>JSON.stringify</code>不止可以将一个对象字符化，还可以格式化输出JSON对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const obj = { 
  foo: { bar: [11, 22, 33, 44], baz: { bing: true, boom: 'Hello' } } 
};
// The third parameter is the number of spaces used to 
// beautify the JSON output.
JSON.stringify(obj, null, 4); 
// =>&quot;{
// =>    &quot;foo&quot;: {
// =>        &quot;bar&quot;: [
// =>            11,
// =>            22,
// =>            33,
// =>            44
// =>        ],
// =>        &quot;baz&quot;: {
// =>            &quot;bing&quot;: true,
// =>            &quot;boom&quot;: &quot;Hello&quot;
// =>        }
// =>    }
// =>}&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> obj = { 
  <span class="hljs-attr">foo</span>: { <span class="hljs-attr">bar</span>: [<span class="hljs-number">11</span>, <span class="hljs-number">22</span>, <span class="hljs-number">33</span>, <span class="hljs-number">44</span>], <span class="hljs-attr">baz</span>: { <span class="hljs-attr">bing</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">boom</span>: <span class="hljs-string">'Hello'</span> } } 
};
<span class="hljs-comment">// The third parameter is the number of spaces used to </span>
<span class="hljs-comment">// beautify the JSON output.</span>
<span class="hljs-built_in">JSON</span>.stringify(obj, <span class="hljs-literal">null</span>, <span class="hljs-number">4</span>); 
<span class="hljs-comment">// =&gt;"{</span>
<span class="hljs-comment">// =&gt;    "foo": {</span>
<span class="hljs-comment">// =&gt;        "bar": [</span>
<span class="hljs-comment">// =&gt;            11,</span>
<span class="hljs-comment">// =&gt;            22,</span>
<span class="hljs-comment">// =&gt;            33,</span>
<span class="hljs-comment">// =&gt;            44</span>
<span class="hljs-comment">// =&gt;        ],</span>
<span class="hljs-comment">// =&gt;        "baz": {</span>
<span class="hljs-comment">// =&gt;            "bing": true,</span>
<span class="hljs-comment">// =&gt;            "boom": "Hello"</span>
<span class="hljs-comment">// =&gt;        }</span>
<span class="hljs-comment">// =&gt;    }</span>
<span class="hljs-comment">// =&gt;}"</span></code></pre>
<h3 id="articleHeader7">8. 从数组中移除重复元素</h3>
<p>ES2015中，有了集合的语法。通过使用集合语法和Spread操作，可以很容易将重复的元素移除：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const removeDuplicateItems = arr => [...new Set(arr)];
removeDuplicateItems([42, 'foo', 42, 'foo', true, true]);
//=> [42, &quot;foo&quot;, true]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> removeDuplicateItems = <span class="hljs-function"><span class="hljs-params">arr</span> =&gt;</span> [...new <span class="hljs-built_in">Set</span>(arr)];
removeDuplicateItems([<span class="hljs-number">42</span>, <span class="hljs-string">'foo'</span>, <span class="hljs-number">42</span>, <span class="hljs-string">'foo'</span>, <span class="hljs-literal">true</span>, <span class="hljs-literal">true</span>]);
<span class="hljs-comment">//=&gt; [42, "foo", true]</span></code></pre>
<h3 id="articleHeader8">9. 平铺多维数组</h3>
<p>使用Spread操作，可以很容易去平铺嵌套多维数组：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const arr = [11, [22, 33], [44, 55], 66];
const flatArr = [].concat(...arr); //=> [11, 22, 33, 44, 55, 66]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> arr = [<span class="hljs-number">11</span>, [<span class="hljs-number">22</span>, <span class="hljs-number">33</span>], [<span class="hljs-number">44</span>, <span class="hljs-number">55</span>], <span class="hljs-number">66</span>];
<span class="hljs-keyword">const</span> flatArr = [].concat(...arr); <span class="hljs-comment">//=&gt; [11, 22, 33, 44, 55, 66]</span></code></pre>
<p>可惜，上面的方法仅仅适用于二维数组。不过，通过递归，我们可以平铺任意维度的嵌套数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function flattenArray(arr) {
  const flattened = [].concat(...arr);
  return flattened.some(item => Array.isArray(item)) ? 
    flattenArray(flattened) : flattened;
}

const arr = [11, [22, 33], [44, [55, 66, [77, [88]], 99]]];
const flatArr = flattenArray(arr); 
//=> [11, 22, 33, 44, 55, 66, 77, 88, 99]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">flattenArray</span>(<span class="hljs-params">arr</span>) </span>{
  <span class="hljs-keyword">const</span> flattened = [].concat(...arr);
  <span class="hljs-keyword">return</span> flattened.some(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> <span class="hljs-built_in">Array</span>.isArray(item)) ? 
    flattenArray(flattened) : flattened;
}

<span class="hljs-keyword">const</span> arr = [<span class="hljs-number">11</span>, [<span class="hljs-number">22</span>, <span class="hljs-number">33</span>], [<span class="hljs-number">44</span>, [<span class="hljs-number">55</span>, <span class="hljs-number">66</span>, [<span class="hljs-number">77</span>, [<span class="hljs-number">88</span>]], <span class="hljs-number">99</span>]]];
<span class="hljs-keyword">const</span> flatArr = flattenArray(arr); 
<span class="hljs-comment">//=&gt; [11, 22, 33, 44, 55, 66, 77, 88, 99]</span></code></pre>
<p>就这些啦！我希望这些小技巧可以帮你写出更加漂亮的JS代码！如果还不够，那么不妨用<a href="https://www.fundebug.com" rel="nofollow noreferrer" target="_blank">Fundebug</a>做你的辅助！</p>
<h3 id="articleHeader9">精选评论</h3>
<ul>
<li>
<p>Ethan B Martin: 这个switch的写法很巧妙，不过不推荐。请不要鼓励开发者用这种方式去写JS代码。我们曾经有一个工程师这么写，后来在代码review的时候，造成了很大的阅读苦难。好在我们及时将其重构为更加容易读懂的代码。不妨对比一下用swtich和if的区别：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getWaterState1(tempInCelsius) {
  let state;
  
  switch (true) {
    case (tempInCelsius <= 0): 
      state = 'Solid';
      break;
    case (tempInCelsius < 100): 
      state = 'Liquid';
      break;
    default: 
      state = 'Gas';
  }
  return state;
}
function getWaterState2(tempInCelsius) {
  if (tempInCelsius <= 0) {
    return 'Solid';
  }
  if (tempInCelsius < 100) {
    return 'Liquid';
  }
  return 'Gas';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getWaterState1</span>(<span class="hljs-params">tempInCelsius</span>) </span>{
  <span class="hljs-keyword">let</span> state;
  
  <span class="hljs-keyword">switch</span> (<span class="hljs-literal">true</span>) {
    <span class="hljs-keyword">case</span> (tempInCelsius &lt;= <span class="hljs-number">0</span>): 
      state = <span class="hljs-string">'Solid'</span>;
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">case</span> (tempInCelsius &lt; <span class="hljs-number">100</span>): 
      state = <span class="hljs-string">'Liquid'</span>;
      <span class="hljs-keyword">break</span>;
    <span class="hljs-keyword">default</span>: 
      state = <span class="hljs-string">'Gas'</span>;
  }
  <span class="hljs-keyword">return</span> state;
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getWaterState2</span>(<span class="hljs-params">tempInCelsius</span>) </span>{
  <span class="hljs-keyword">if</span> (tempInCelsius &lt;= <span class="hljs-number">0</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-string">'Solid'</span>;
  }
  <span class="hljs-keyword">if</span> (tempInCelsius &lt; <span class="hljs-number">100</span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-string">'Liquid'</span>;
  }
  <span class="hljs-keyword">return</span> <span class="hljs-string">'Gas'</span>;
}</code></pre>
<p>第二种写法有几点优势：<br>A) 代码量更少，更加易读；B) 你不需要声明一个局部变量，读者不会一直要去追踪你如何对这个变量做了更改；C) <code>switch(true)</code>真的会让人莫名其妙。</p>
</li>
<li>Flo Sloot： 很棒的文章！不过不推荐第六招，除非你一定要使用。因为它的执行效率很慢，而且占用空间更大。因为V8并没有对空对象做优化。</li>
</ul>
<h3 id="articleHeader10">关于Fundebug</h3>
<p><a href="https://www.fundebug.com/" rel="nofollow noreferrer" target="_blank">Fundebug</a>专注于JavaScript、微信小程序、微信小游戏、支付宝小程序、React Native、Node.js和Java实时BUG监控。 自从2016年双十一正式上线，Fundebug累计处理了6亿+错误事件，得到了Google、360、金山软件等众多知名用户的认可。欢迎免费试用！</p>
<p><span class="img-wrap"><img data-src="/img/bVbhe1G?w=400&amp;h=225" src="https://static.alili.tech/img/bVbhe1G?w=400&amp;h=225" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader11">版权声明</h3>
<p>转载时请注明作者Fundebug以及本文地址：<br><a href="https://blog.fundebug.com/2018/05/07/learn_js_tricks_in_5_minutes/" rel="nofollow noreferrer" target="_blank">https://blog.fundebug.com/201...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
5分钟掌握JavaScript小技巧

## 原文链接
[https://segmentfault.com/a/1190000014965183](https://segmentfault.com/a/1190000014965183)

