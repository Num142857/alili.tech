---
title: '[翻译]你点的ES6小技巧，请查收' 
date: 2018-12-09 2:30:08
hidden: true
slug: vqn88kdx55k
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>原文地址：<a href="https://medium.freecodecamp.org/check-out-these-useful-ecmascript-2015-es6-tips-and-tricks-6db105590377" rel="nofollow noreferrer" target="_blank">https://medium.freecodecamp.org/check-out-these-useful-ecmascript-2015-es6-tips-and-tricks-6db105590377</a>  <br>作者：<a href="https://medium.freecodecamp.org/@rajaraodv" rel="nofollow noreferrer" target="_blank">rajaraodv</a>  <br>摘要：总结ES6新特性：默认参数、reduce、解构赋值和Set在使用时的一些小技巧。</blockquote>
<p>ES6出来已经有好几年了，同时很多新特性可以被巧妙地运用在项目中。我想要列下其中一些，希望它们对你有用。</p>
<p>如果你还知道其他一些小技巧，欢迎留言。我很高兴把它们补充进来。</p>
<h1 id="articleHeader0">1. 强制要求参数</h1>
<p>ES6提供了默认参数值机制，允许你为参数设置默认值，防止在函数被调用时没有传入这些参数。</p>
<p>在下面的例子中，我们写了一个<code>required()</code>函数作为参数a和b的默认值。这意味着如果a或b其中有一个参数没有在调用时传值，会默认<code>required()</code>函数，然后抛出错误。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const required = () => {throw new Error('Missing parameter')};

const add = (a = required(), b = required()) => a + b;

add(1, 2) //3
add(1) // Error: Missing parameter." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> required = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {<span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'Missing parameter'</span>)};

<span class="hljs-keyword">const</span> add = <span class="hljs-function">(<span class="hljs-params">a = required(</span>), <span class="hljs-params">b</span> = <span class="hljs-params">required</span><span class="hljs-params">()</span>) =&gt;</span> a + b;

add(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>) <span class="hljs-comment">//3</span>
add(<span class="hljs-number">1</span>) <span class="hljs-comment">// Error: Missing parameter.</span></code></pre>
<h1 id="articleHeader1">2. 强大的reduce</h1>
<p>数组的reduce方法用途很广。它一般被用来把数组中每一项规约到单个值。但是你可以利用它做更多的事。</p>
<h2 id="articleHeader2">2.1 使用reduce同时实现map和filter</h2>
<p>假设现在有一个数列，你希望更新它的每一项（map的功能）然后筛选出一部分（filter的功能）。如果是先使用map然后filter的话，你需要遍历这个数组两次。</p>
<p>在下面的代码中，我们将数列中的值翻倍，然后挑选出那些大于50的数。有注意到我们是如何非常高效地使用reduce来同时完成map和filter方法的吗？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const numbers = [10, 20, 30, 40];
const doubledOver50 = numbers.reduce((finalList, num) => {
  
  num = num * 2; 
  
  if (num > 50) {
    finalList.push(num);
  }
  return finalList;
}, []);
doubledOver50; // [60, 80]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> numbers = [<span class="hljs-number">10</span>, <span class="hljs-number">20</span>, <span class="hljs-number">30</span>, <span class="hljs-number">40</span>];
<span class="hljs-keyword">const</span> doubledOver50 = numbers.reduce(<span class="hljs-function">(<span class="hljs-params">finalList, num</span>) =&gt;</span> {
  
  num = num * <span class="hljs-number">2</span>; 
  
  <span class="hljs-keyword">if</span> (num &gt; <span class="hljs-number">50</span>) {
    finalList.push(num);
  }
  <span class="hljs-keyword">return</span> finalList;
}, []);
doubledOver50; <span class="hljs-comment">// [60, 80]</span></code></pre>
<h2 id="articleHeader3">2.2 使用reduce取代map和filter</h2>
<p>如果你认真阅读了上面的代码，你应该能理解reduce是可以取代map和filter的。</p>
<h2 id="articleHeader4">2.3 使用reduce匹配圆括号</h2>
<p>reduce的另外一个用途是能够匹配给定字符串中的圆括号。对于一个含有圆括号的字符串，我们需要知道<code>(</code>和<code>)</code>的数量是否一致，并且<code>(</code>是否出现在<code>)</code>之前。</p>
<p>下面的代码中我们使用reduce可以轻松地解决这个问题。我们只需要先声明一个<code>counter</code>变量，初值为0。在遇到<code>(</code>时counter加一，遇到<code>)</code>时counter减一。如果左右括号数目匹配，那最终结果为0。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//Returns 0 if balanced.
const isParensBalanced = (str) => {
  return str.split('').reduce((counter, char) => {
    if(counter < 0) { //matched &quot;)&quot; before &quot;(&quot;
      return counter;
    } else if(char === '(') {
      return ++counter;
    } else if(char === ')') {
      return --counter;
    }  else { //matched some other char
      return counter;
    }
    
  }, 0); //<-- starting value of the counter
}
isParensBalanced('(())') // 0 <-- balanced
isParensBalanced('(asdfds)') //0 <-- balanced
isParensBalanced('(()') // 1 <-- not balanced
isParensBalanced(')(') // -1 <-- not balanced" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//Returns 0 if balanced.</span>
<span class="hljs-keyword">const</span> isParensBalanced = <span class="hljs-function">(<span class="hljs-params">str</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> str.split(<span class="hljs-string">''</span>).reduce(<span class="hljs-function">(<span class="hljs-params">counter, char</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span>(counter &lt; <span class="hljs-number">0</span>) { <span class="hljs-comment">//matched ")" before "("</span>
      <span class="hljs-keyword">return</span> counter;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(char === <span class="hljs-string">'('</span>) {
      <span class="hljs-keyword">return</span> ++counter;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(char === <span class="hljs-string">')'</span>) {
      <span class="hljs-keyword">return</span> --counter;
    }  <span class="hljs-keyword">else</span> { <span class="hljs-comment">//matched some other char</span>
      <span class="hljs-keyword">return</span> counter;
    }
    
  }, <span class="hljs-number">0</span>); <span class="hljs-comment">//&lt;-- starting value of the counter</span>
}
isParensBalanced(<span class="hljs-string">'(())'</span>) <span class="hljs-comment">// 0 &lt;-- balanced</span>
isParensBalanced(<span class="hljs-string">'(asdfds)'</span>) <span class="hljs-comment">//0 &lt;-- balanced</span>
isParensBalanced(<span class="hljs-string">'(()'</span>) <span class="hljs-comment">// 1 &lt;-- not balanced</span>
isParensBalanced(<span class="hljs-string">')('</span>) <span class="hljs-comment">// -1 &lt;-- not balanced</span></code></pre>
<h2 id="articleHeader5">2.4 统计数组中相同项的个数</h2>
<p>很多时候，你希望统计数组中重复出现项的个数然后用一个对象表示。那么你可以使用reduce方法处理这个数组。</p>
<p>下面的代码将统计每一种车的数目然后把总数用一个对象表示。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var cars = ['BMW','Benz', 'Benz', 'Tesla', 'BMW', 'Toyota'];
var carsObj = cars.reduce(function (obj, name) { 
   obj[name] = obj[name] ? ++obj[name] : 1;
  return obj;
}, {});
carsObj; // => { BMW: 2, Benz: 2, Tesla: 1, Toyota: 1 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> cars = [<span class="hljs-string">'BMW'</span>,<span class="hljs-string">'Benz'</span>, <span class="hljs-string">'Benz'</span>, <span class="hljs-string">'Tesla'</span>, <span class="hljs-string">'BMW'</span>, <span class="hljs-string">'Toyota'</span>];
<span class="hljs-keyword">var</span> carsObj = cars.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">obj, name</span>) </span>{ 
   obj[name] = obj[name] ? ++obj[name] : <span class="hljs-number">1</span>;
  <span class="hljs-keyword">return</span> obj;
}, {});
carsObj; <span class="hljs-comment">// =&gt; { BMW: 2, Benz: 2, Tesla: 1, Toyota: 1 }</span></code></pre>
<p>reduce的其他用处实在是太多了，我建议你阅读MDN的相关代码示例。</p>
<h1 id="articleHeader6">3. 对象解构</h1>
<h2 id="articleHeader7">3.1 删除不需要的属性</h2>
<p>有时候你不希望保留某些对象属性，也许是因为它们包含敏感信息或仅仅是太大了（just too big）。你可能会枚举整个对象然后删除它们，但实际上只需要简单的将这些无用属性赋值给变量，然后把想要保留的有用部分作为剩余参数就可以了。</p>
<p>下面的代码里，我们希望删除<code>_internal</code>和<code>tooBig</code>参数。我们可以把它们赋值给<code>internal</code>和<code>tooBig</code>变量，然后在<code>cleanObject</code>中存储剩下的属性以备后用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let {_internal, tooBig, ...cleanObject} = {el1: '1', _internal:&quot;secret&quot;, tooBig:{}, el2: '2', el3: '3'};
console.log(cleanObject); // {el1: '1', el2: '2', el3: '3'}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> {_internal, tooBig, ...cleanObject} = {<span class="hljs-attr">el1</span>: <span class="hljs-string">'1'</span>, <span class="hljs-attr">_internal</span>:<span class="hljs-string">"secret"</span>, <span class="hljs-attr">tooBig</span>:{}, <span class="hljs-attr">el2</span>: <span class="hljs-string">'2'</span>, <span class="hljs-attr">el3</span>: <span class="hljs-string">'3'</span>};
<span class="hljs-built_in">console</span>.log(cleanObject); <span class="hljs-comment">// {el1: '1', el2: '2', el3: '3'}</span></code></pre>
<h2 id="articleHeader8">3.2 在函数参数中解构嵌套对象</h2>
<p>在下面的代码中，<code>engine</code>是对象<code>car</code>中嵌套的一个对象。如果我们对<code>engine</code>的<code>vin</code>属性感兴趣，使用解构赋值可以很轻松地得到它。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var car = {
  model: 'bmw 2018',
  engine: {
    v6: true,
    turbo: true,
    vin: 12345
  }
}
const modelAndVIN = ({model, engine: {vin"}}") => {
  console.log(`model: ${model} vin: ${vin}`);
}
modelAndVIN(car); // => model: bmw 2018  vin: 12345" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> car = {
  <span class="hljs-attr">model</span>: <span class="hljs-string">'bmw 2018'</span>,
  <span class="hljs-attr">engine</span>: {
    <span class="hljs-attr">v6</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">turbo</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">vin</span>: <span class="hljs-number">12345</span>
  }
}
<span class="hljs-keyword">const</span> modelAndVIN = <span class="hljs-function">(<span class="hljs-params">{model, engine: {vin"}}"</span>) =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`model: <span class="hljs-subst">${model}</span> vin: <span class="hljs-subst">${vin}</span>`</span>);
}
modelAndVIN(car); <span class="hljs-comment">// =&gt; model: bmw 2018  vin: 12345</span></code></pre>
<h2 id="articleHeader9">3.3 合并对象</h2>
<p>ES6带来了扩展运算符（...）。它一般被用来解构数组，但你也可以用它处理对象。</p>
<p>接下来，我们使用扩展运算符来展开一个新的对象，第二个对象中的属性值会改写第一个对象的属性值。比如<code>object2</code>的<code>b</code>和<code>c</code>就会改写<code>object1</code>的同名属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let object1 = { a:1, b:2,c:3 }
let object2 = { b:30, c:40, d:50}
let merged = {…object1, …object2} //spread and re-add into merged
console.log(merged) // {a:1, b:30, c:40, d:50}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> object1 = { <span class="hljs-attr">a</span>:<span class="hljs-number">1</span>, <span class="hljs-attr">b</span>:<span class="hljs-number">2</span>,<span class="hljs-attr">c</span>:<span class="hljs-number">3</span> }
<span class="hljs-keyword">let</span> object2 = { <span class="hljs-attr">b</span>:<span class="hljs-number">30</span>, <span class="hljs-attr">c</span>:<span class="hljs-number">40</span>, <span class="hljs-attr">d</span>:<span class="hljs-number">50</span>}
<span class="hljs-keyword">let</span> merged = {…object1, …object2} <span class="hljs-comment">//spread and re-add into merged</span>
<span class="hljs-built_in">console</span>.log(merged) <span class="hljs-comment">// {a:1, b:30, c:40, d:50}</span></code></pre>
<h1 id="articleHeader10">4. Sets</h1>
<h2 id="articleHeader11">4.1 使用Set实现数组去重</h2>
<p>在ES6中，因为Set只存储唯一值，所以你可以使用Set删除重复项。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [1, 1, 2, 2, 3, 3];
let deduped = [...new Set(arr)] // [1, 2, 3]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">3</span>];
<span class="hljs-keyword">let</span> deduped = [...new <span class="hljs-built_in">Set</span>(arr)] <span class="hljs-comment">// [1, 2, 3]</span></code></pre>
<h2 id="articleHeader12">4.2 对Set使用数组方法</h2>
<p>使用扩展运算符就可以简单的将Set转换为数组。所以你可以对Set使用Array的所有原生方法。</p>
<p>比如我们想要对下面的Set进行filter操作，获取大于3的项。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let mySet = new Set([1,2, 3, 4, 5]);
var filtered = [...mySet].filter((x) => x > 3) // [4, 5]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> mySet = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Set</span>([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>]);
<span class="hljs-keyword">var</span> filtered = [...mySet].filter(<span class="hljs-function">(<span class="hljs-params">x</span>) =&gt;</span> x &gt; <span class="hljs-number">3</span>) <span class="hljs-comment">// [4, 5]</span></code></pre>
<h1 id="articleHeader13">5. 数组解构</h1>
<p>有时候你会将函数返回的多个值放在一个数组里。我们可以使用数组解构来获取其中每一个值。</p>
<h2 id="articleHeader14">5.1 数值交换</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let param1 = 1;
let param2 = 2;
//swap and assign param1 &amp; param2 each others values
[param1, param2] = [param2, param1];
console.log(param1) // 2
console.log(param2) // 1" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> param1 = <span class="hljs-number">1</span>;
<span class="hljs-keyword">let</span> param2 = <span class="hljs-number">2</span>;
<span class="hljs-comment">//swap and assign param1 &amp; param2 each others values</span>
[param1, param2] = [param2, param1];
<span class="hljs-built_in">console</span>.log(param1) <span class="hljs-comment">// 2</span>
<span class="hljs-built_in">console</span>.log(param2) <span class="hljs-comment">// 1</span></code></pre>
<h2 id="articleHeader15">5.2 接收函数返回的多个结果</h2>
<p>在下面的代码中，我们从<code>/post</code>中获取一个帖子，然后在<code>/comments</code>中获取相关评论。由于我们使用的是<code>async/await</code>，函数把返回值放在一个数组中。而我们使用数组解构后就可以把返回值直接赋给相应的变量。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function getFullPost(){
  return await Promise.all([
    fetch('/post'),
    fetch('/comments')
  ]);
}
const [post, comments] = getFullPost();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getFullPost</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>.all([
    fetch(<span class="hljs-string">'/post'</span>),
    fetch(<span class="hljs-string">'/comments'</span>)
  ]);
}
<span class="hljs-keyword">const</span> [post, comments] = getFullPost();</code></pre>
<blockquote>查看更多我翻译的Medium文章请访问：  <br>项目地址：<a href="https://github.com/WhiteYin/translation/tree/master" rel="nofollow noreferrer" target="_blank">https://github.com/WhiteYin/translation</a>  <br>SF专栏：<a href="https://segmentfault.com/blog/yin-translation">https://segmentfault.com/blog/yin-translation</a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[翻译]你点的ES6小技巧，请查收

## 原文链接
[https://segmentfault.com/a/1190000013972464](https://segmentfault.com/a/1190000013972464)

