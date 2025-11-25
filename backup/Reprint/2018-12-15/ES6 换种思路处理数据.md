---
title: 'ES6 换种思路处理数据' 
date: 2018-12-15 2:30:11
hidden: true
slug: b8d05fzct99
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><a href="https://codeburst.io/writing-javascript-with-map-reduce-980602ff2f2f" rel="nofollow noreferrer" target="_blank">Handle javascript data structures with map/reduce</a></blockquote>
<p>看完本文，希望可以写出更加漂亮、简洁、函数式的代码?</p>
<h2 id="articleHeader0">reduce</h2>
<p>reduce 可以用来<code>汇总</code>数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const customer = [
  {id: 1, count: 2},
  {id: 2, count: 89},
  {id: 3, count: 1}
];
const totalCount = customer.reduce((total, item) =>
  total + item.count,
  0 // total 的初始值
);
// now totalCount = 92" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> customer = [
  {<span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">count</span>: <span class="hljs-number">2</span>},
  {<span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">count</span>: <span class="hljs-number">89</span>},
  {<span class="hljs-attr">id</span>: <span class="hljs-number">3</span>, <span class="hljs-attr">count</span>: <span class="hljs-number">1</span>}
];
<span class="hljs-keyword">const</span> totalCount = customer.reduce(<span class="hljs-function">(<span class="hljs-params">total, item</span>) =&gt;</span>
  total + item.count,
  <span class="hljs-number">0</span> <span class="hljs-comment">// total 的初始值</span>
);
<span class="hljs-comment">// now totalCount = 92</span></code></pre>
<p>把一个对象数组变成一个以数组中各个对象的 id 为属性名，对象本身为属性值的对象。<a href="http://haoduoshipin.com/videos/240/" rel="nofollow noreferrer" target="_blank">haoduoshipin</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let products = [
  {
    id: '123',
    name: '苹果'
  },
  {
    id: '345',
    name: '橘子'
  }
];

const productsById = products.reduce(
  (obj, product) => {
    obj[product.id] = product
    return obj
  },
  {}
);

console.log('result', productsById);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> products = [
  {
    <span class="hljs-attr">id</span>: <span class="hljs-string">'123'</span>,
    <span class="hljs-attr">name</span>: <span class="hljs-string">'苹果'</span>
  },
  {
    <span class="hljs-attr">id</span>: <span class="hljs-string">'345'</span>,
    <span class="hljs-attr">name</span>: <span class="hljs-string">'橘子'</span>
  }
];

<span class="hljs-keyword">const</span> productsById = products.reduce(
  <span class="hljs-function">(<span class="hljs-params">obj, product</span>) =&gt;</span> {
    obj[product.id] = product
    <span class="hljs-keyword">return</span> obj
  },
  {}
);

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'result'</span>, productsById);</code></pre>
<h2 id="articleHeader1">map</h2>
<p>map 可以理解为是数组的转换器，依次对数组中的每个元素做变换进而得到一个新的数组。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const integers = [1, 2, 3, 4, 6, 7];
const twoXIntegers = integers.map(i => i*2);
// twoXIntegers are now [2, 4, 6, 8, 12, 14]
// integers数组并不会受到影响" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> integers = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>];
<span class="hljs-keyword">const</span> twoXIntegers = integers.map(<span class="hljs-function"><span class="hljs-params">i</span> =&gt;</span> i*<span class="hljs-number">2</span>);
<span class="hljs-comment">// twoXIntegers are now [2, 4, 6, 8, 12, 14]</span>
<span class="hljs-comment">// integers数组并不会受到影响</span></code></pre>
<h2 id="articleHeader2">find?</h2>
<p>筛选出数组中的<code>个别</code>元素</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const posts = [
  {id: 1, title: 'Title 1'},
  {id: 2, title: 'Title 2'},
];
// find the title of post whose id is 1
const title = posts.find(p => p.id === 1).title;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> posts = [
  {<span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">title</span>: <span class="hljs-string">'Title 1'</span>},
  {<span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">title</span>: <span class="hljs-string">'Title 2'</span>},
];
<span class="hljs-comment">// find the title of post whose id is 1</span>
<span class="hljs-keyword">const</span> title = posts.find(<span class="hljs-function"><span class="hljs-params">p</span> =&gt;</span> p.id === <span class="hljs-number">1</span>).title;</code></pre>
<p>唉~ 使用了半年的 es6才发现有这么好用的东西，译者傻缺还像下面这么写过呢</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const posts = [
  {id: 1, title: 'Title 1'},
  {id: 2, title: 'Title 2'},
];

const title = posts.filter(item => item.id === 1)[0].title;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> posts = [
  {<span class="hljs-attr">id</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">title</span>: <span class="hljs-string">'Title 1'</span>},
  {<span class="hljs-attr">id</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">title</span>: <span class="hljs-string">'Title 2'</span>},
];

<span class="hljs-keyword">const</span> title = posts.filter(<span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> item.id === <span class="hljs-number">1</span>)[<span class="hljs-number">0</span>].title;</code></pre>
<h2 id="articleHeader3">filter</h2>
<p>筛选出数组中<code>某些</code>符合条件的元素组成新的数组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const integers = [1, 2, 3, 4, 6, 7];
const evenIntegers = integers.filter(i => i % 2 === 0);
// evenIntegers are [2, 4, 6]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> integers = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>];
<span class="hljs-keyword">const</span> evenIntegers = integers.filter(<span class="hljs-function"><span class="hljs-params">i</span> =&gt;</span> i % <span class="hljs-number">2</span> === <span class="hljs-number">0</span>);
<span class="hljs-comment">// evenIntegers are [2, 4, 6]</span></code></pre>
<p>请大家自行思考下<code>filter</code>和<code>find</code>的区别</p>
<h2 id="articleHeader4">数组concat</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const arr1 = [1, 2, 3, 4, 5];
const arr2 = [6, 7, 8, 9, 0];
const arrTarget = [...arr1, ...arr2];
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> arr1 = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>];
<span class="hljs-keyword">const</span> arr2 = [<span class="hljs-number">6</span>, <span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>, <span class="hljs-number">0</span>];
<span class="hljs-keyword">const</span> arrTarget = [...arr1, ...arr2];
<span class="hljs-comment">// [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]</span></code></pre>
<h2 id="articleHeader5">对象操作</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function operation(query, option = {}) {
    const param = {...query, ...option};
    // ....
    return param;
}
let opt = {startTime: 123455555, endTime: 113345555};
let q = {name: '一步', age: 'xxx'};
operation(q, opt);
// {name: &quot;一步&quot;, age: &quot;xxx&quot;, startTime: 123455555, endTime: 113345555}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">operation</span>(<span class="hljs-params">query, option = {}</span>) </span>{
    <span class="hljs-keyword">const</span> param = {...query, ...option};
    <span class="hljs-comment">// ....</span>
    <span class="hljs-keyword">return</span> param;
}
<span class="hljs-keyword">let</span> opt = {<span class="hljs-attr">startTime</span>: <span class="hljs-number">123455555</span>, <span class="hljs-attr">endTime</span>: <span class="hljs-number">113345555</span>};
<span class="hljs-keyword">let</span> q = {<span class="hljs-attr">name</span>: <span class="hljs-string">'一步'</span>, <span class="hljs-attr">age</span>: <span class="hljs-string">'xxx'</span>};
operation(q, opt);
<span class="hljs-comment">// {name: "一步", age: "xxx", startTime: 123455555, endTime: 113345555}</span></code></pre>
<p>对象是引用传参的，所以函数内部应该尽可能的保证传入的参数不受到污染。</p>
<h2 id="articleHeader6">为对象动态地添加字段</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const dynamicKey = 'wearsSpectacles';
const user = {name: 'Shivek Khurana'};
const updatedUser = {...user, [dynamicKey]: true};
// updatedUser is {name: 'Shivek Khurana', wearsSpectacles: true}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> dynamicKey = <span class="hljs-string">'wearsSpectacles'</span>;
<span class="hljs-keyword">const</span> user = {<span class="hljs-attr">name</span>: <span class="hljs-string">'Shivek Khurana'</span>};
<span class="hljs-keyword">const</span> updatedUser = {...user, [dynamicKey]: <span class="hljs-literal">true</span>};
<span class="hljs-comment">// updatedUser is {name: 'Shivek Khurana', wearsSpectacles: true}</span></code></pre>
<h2 id="articleHeader7">将对象转换为query字符串?</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const params = {color: 'red', minPrice: 8000, maxPrice: 10000};
const query = '?' + Object.keys(params)
  .map(k =>
    encodeURIComponent(k) + '=' + encodeURIComponent(params[k])
  )
  .join('&amp;')
;
// encodeURIComponent encodes special characters like spaces, hashes
// query is now &quot;color=red&amp;minPrice=8000&amp;maxPrice=10000&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> params = {<span class="hljs-attr">color</span>: <span class="hljs-string">'red'</span>, <span class="hljs-attr">minPrice</span>: <span class="hljs-number">8000</span>, <span class="hljs-attr">maxPrice</span>: <span class="hljs-number">10000</span>};
<span class="hljs-keyword">const</span> query = <span class="hljs-string">'?'</span> + <span class="hljs-built_in">Object</span>.keys(params)
  .map(<span class="hljs-function"><span class="hljs-params">k</span> =&gt;</span>
    <span class="hljs-built_in">encodeURIComponent</span>(k) + <span class="hljs-string">'='</span> + <span class="hljs-built_in">encodeURIComponent</span>(params[k])
  )
  .join(<span class="hljs-string">'&amp;'</span>)
;
<span class="hljs-comment">// encodeURIComponent encodes special characters like spaces, hashes</span>
<span class="hljs-comment">// query is now "color=red&amp;minPrice=8000&amp;maxPrice=10000"</span></code></pre>
<h2 id="articleHeader8">得到对象数组的元素 index</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const posts = [
  {id: 13, title: 'Title 221'},
  {id: 5, title: 'Title 102'},
  {id: 131, title: 'Title 18'},
  {id: 55, title: 'Title 234'}
];
// to find index of element with id 131
const requiredIndex = posts.map(p => p.id).indexOf(131);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> posts = [
  {<span class="hljs-attr">id</span>: <span class="hljs-number">13</span>, <span class="hljs-attr">title</span>: <span class="hljs-string">'Title 221'</span>},
  {<span class="hljs-attr">id</span>: <span class="hljs-number">5</span>, <span class="hljs-attr">title</span>: <span class="hljs-string">'Title 102'</span>},
  {<span class="hljs-attr">id</span>: <span class="hljs-number">131</span>, <span class="hljs-attr">title</span>: <span class="hljs-string">'Title 18'</span>},
  {<span class="hljs-attr">id</span>: <span class="hljs-number">55</span>, <span class="hljs-attr">title</span>: <span class="hljs-string">'Title 234'</span>}
];
<span class="hljs-comment">// to find index of element with id 131</span>
<span class="hljs-keyword">const</span> requiredIndex = posts.map(<span class="hljs-function"><span class="hljs-params">p</span> =&gt;</span> p.id).indexOf(<span class="hljs-number">131</span>);</code></pre>
<p>更加优雅的写法<a href="https://segmentfault.com/u/_58a665056a5e4">呱呱呱提供</a>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const posts = [
  {id: 13, title: 'Title 221'},
  {id: 5, title: 'Title 102'},
  {id: 131, title: 'Title 18'},
  {id: 55, title: 'Title 234'}
];
const index = posts.findIndex(p => p.id === 131)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> posts = [
  {<span class="hljs-attr">id</span>: <span class="hljs-number">13</span>, <span class="hljs-attr">title</span>: <span class="hljs-string">'Title 221'</span>},
  {<span class="hljs-attr">id</span>: <span class="hljs-number">5</span>, <span class="hljs-attr">title</span>: <span class="hljs-string">'Title 102'</span>},
  {<span class="hljs-attr">id</span>: <span class="hljs-number">131</span>, <span class="hljs-attr">title</span>: <span class="hljs-string">'Title 18'</span>},
  {<span class="hljs-attr">id</span>: <span class="hljs-number">55</span>, <span class="hljs-attr">title</span>: <span class="hljs-string">'Title 234'</span>}
];
<span class="hljs-keyword">const</span> index = posts.findIndex(<span class="hljs-function"><span class="hljs-params">p</span> =&gt;</span> p.id === <span class="hljs-number">131</span>)</code></pre>
<h2 id="articleHeader9">删除对象的某个字段</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const user = { name: 'Shivek Khurana', age: 23, password: 'SantaCl@use' };
const userWithoutPassword = Object.keys(user)
    .filter(key => key !== 'password')
    .map(key => ({[key]: user[key]}))
    .reduce((accumulator, current) => ({ ...accumulator, ...current }), {});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> user = { <span class="hljs-attr">name</span>: <span class="hljs-string">'Shivek Khurana'</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">23</span>, <span class="hljs-attr">password</span>: <span class="hljs-string">'SantaCl@use'</span> };
<span class="hljs-keyword">const</span> userWithoutPassword = <span class="hljs-built_in">Object</span>.keys(user)
    .filter(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> key !== <span class="hljs-string">'password'</span>)
    .map(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> ({[key]: user[key]}))
    .reduce(<span class="hljs-function">(<span class="hljs-params">accumulator, current</span>) =&gt;</span> ({ ...accumulator, ...current }), {});</code></pre>
<p>这里我认为原作者有点为了函数式编程而函数式了，下面是我的解决方案：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const user = {name: 'Shivek Khurana', age: 23, password: 'SantaCl@use'};
const newUser = {...user};
delete newUser.password;
// {name: &quot;Shivek Khurana&quot;, age: 23}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> user = {<span class="hljs-attr">name</span>: <span class="hljs-string">'Shivek Khurana'</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">23</span>, <span class="hljs-attr">password</span>: <span class="hljs-string">'SantaCl@use'</span>};
<span class="hljs-keyword">const</span> newUser = {...user};
<span class="hljs-keyword">delete</span> newUser.password;
<span class="hljs-comment">// {name: "Shivek Khurana", age: 23}</span></code></pre>
<p>更现代的写法<a href="https://segmentfault.com/u/yihzo" target="_blank">YiHzo提供</a>: ?????</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const user = {name: 'Shivek Khurana', age: 23, password: 'SantaCl@use'};
// 利用对象的解构，取出非password的所有字段
const {password, ...newUser} = user" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> user = {<span class="hljs-attr">name</span>: <span class="hljs-string">'Shivek Khurana'</span>, <span class="hljs-attr">age</span>: <span class="hljs-number">23</span>, <span class="hljs-attr">password</span>: <span class="hljs-string">'SantaCl@use'</span>};
<span class="hljs-comment">// 利用对象的解构，取出非password的所有字段</span>
<span class="hljs-keyword">const</span> {password, ...newUser} = user</code></pre>
<p>以上代码片段的共同原则：不改变原数据。希望大家的代码都可以尽可能的简洁，可维护?。</p>
<blockquote>【开发环境推荐】<a href="https://studio.coding.net/intro" rel="nofollow noreferrer" target="_blank">Cloud Studio</a> 是基于浏览器的集成式开发环境，支持绝大部分编程语言，包括 HTML5、PHP、Python、Java、Ruby、C/C++、.NET 小程序等等，无需下载安装程序，一键切换开发环境。 Cloud Studio提供了完整的 Linux 环境，并且支持自定义域名指向，动态计算资源调整，可以完成各种应用的开发编译与部署。</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6 换种思路处理数据

## 原文链接
[https://segmentfault.com/a/1190000013099221](https://segmentfault.com/a/1190000013099221)

