---
title: '用JSON-server模拟REST API(二) 动态数据' 
date: 2019-02-08 2:30:41
hidden: true
slug: dd3wjudpqlp
categories: [reprint]
---

{{< raw >}}

                    
<p>上一篇演示了如何安装并运行 <code>json server</code> , 在这里将使用第三方库让模拟的数据更加丰满和实用。</p>
<h2 id="articleHeader0">使用动态数据</h2>
<p>上一篇演示时，使用了 <code>db.json</code> 作为数据载体，虽然方便，但是如果需要大量的数据，则显得力不从心。<br>幸好 <code>json server</code> 可以通过js动态生成json格式数据，官方例子为生成1000组user数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# /mock/db.js

module.exports = function() {
  var data = { users: [] }
  // Create 1000 users
  for (var i = 0; i < 1000; i++) {
    data.users.push({ id: i, name: 'user' + i })
  }
  return data
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"># /mock/db.js

<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> data = { <span class="hljs-attr">users</span>: [] }
  <span class="hljs-comment">// Create 1000 users</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">1000</span>; i++) {
    data.users.push({ <span class="hljs-attr">id</span>: i, <span class="hljs-attr">name</span>: <span class="hljs-string">'user'</span> + i })
  }
  <span class="hljs-keyword">return</span> data
}</code></pre>
<p><code>/mock</code> 下运行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="json-server db.js -p 3003" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">json-server db<span class="hljs-selector-class">.js</span> -<span class="hljs-selector-tag">p</span> <span class="hljs-number">3003</span></code></pre>
<p>我们访问 <code>http://localhost:3003/news/</code> 看到的数据是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
  {&quot;id&quot;: 0,&quot;name&quot;: &quot;user0&quot;},
  {&quot;id&quot;: 1,&quot;name&quot;: &quot;user1&quot;},
  {&quot;id&quot;: 2,&quot;name&quot;: &quot;user2&quot;},
  {&quot;id&quot;: 3,&quot;name&quot;: &quot;user3&quot;},
  ...
  {&quot;id&quot;: 999,&quot;name&quot;: &quot;user999&quot;}
]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>[
  {<span class="hljs-attr">"id"</span>: <span class="hljs-number">0</span>,<span class="hljs-attr">"name"</span>: <span class="hljs-string">"user0"</span>},
  {<span class="hljs-attr">"id"</span>: <span class="hljs-number">1</span>,<span class="hljs-attr">"name"</span>: <span class="hljs-string">"user1"</span>},
  {<span class="hljs-attr">"id"</span>: <span class="hljs-number">2</span>,<span class="hljs-attr">"name"</span>: <span class="hljs-string">"user2"</span>},
  {<span class="hljs-attr">"id"</span>: <span class="hljs-number">3</span>,<span class="hljs-attr">"name"</span>: <span class="hljs-string">"user3"</span>},
  ...
  {<span class="hljs-attr">"id"</span>: <span class="hljs-number">999</span>,<span class="hljs-attr">"name"</span>: <span class="hljs-string">"user999"</span>}
]
</code></pre>
<p>但是在开发环境中，<code>name</code> 这个属性应该是诸如 “李铁蛋”， “张艳华” 或者是 “Brenda Thomas”，<br> “Daniel Wilson” 这样接地气的名字，而不是 “user0”, “user1” 这样让人望而生畏的名字，对于用户的<br> 年龄，性别，籍贯，也应该有比较合理的数据展示。</p>
<h2 id="articleHeader1">为什么选择mockjs<span class="img-wrap"><img data-src="http://dummyimage.com/60x25/396&amp;text=Mockjs" src="https://static.alili.techhttp://dummyimage.com/60x25/396&amp;text=Mockjs" alt="demo" title="demo" style="cursor: pointer; display: inline;"></span>
</h2>
<p>数据生成器有很多，比较出名的有 <a href="https://github.com/Marak/faker.js" rel="nofollow noreferrer" target="_blank">faker</a> ,<a href="https://github.com/chancejs/chancejs" rel="nofollow noreferrer" target="_blank">chance</a> ,<a href="http://mockjs.com/" rel="nofollow noreferrer" target="_blank">mockjs</a> 等，其中最为强大的非 faker 莫属，不但拥有几乎全部常用的数据格式，而且还有中英德法等多种语言的数据。但是在实际测试中发现，faker 对中文数据的支持还是以西方文字为基础，并不能很好的模拟中文，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let faker = require('faker');

faker.locale = &quot;zh_CN&quot;;

console.log(faker.address.city());          => 南 罗
console.log(faker.address.streetName());    => 陈 桥
console.log(faker.company.companyName());   => 静琪 - 越泽
console.log(faker.date.month());            => May
console.log(faker.internet.email());        => 87@yahoo.com
console.log(faker.phone.phoneNumber());     => 922-61957652" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-keyword">let</span> faker = <span class="hljs-keyword">require</span>(<span class="hljs-string">'faker'</span>);

faker.<span class="hljs-built_in">locale</span> = <span class="hljs-string">"zh_CN"</span>;

console.<span class="hljs-keyword">log</span>(faker.address.city());          =&gt; 南 罗
console.<span class="hljs-keyword">log</span>(faker.address.streetName());    =&gt; 陈 桥
console.<span class="hljs-keyword">log</span>(faker.company.companyName());   =&gt; 静琪 - 越泽
console.<span class="hljs-keyword">log</span>(faker.<span class="hljs-built_in">date</span>.month());            =&gt; May
console.<span class="hljs-keyword">log</span>(faker.internet.email());        =&gt; <span class="hljs-number">87</span>@yahoo.com
console.<span class="hljs-keyword">log</span>(faker.phone.phoneNumber());     =&gt; <span class="hljs-number">922</span><span class="hljs-number">-61957652</span></code></pre>
<p>这些看起来有些怪异的中文格式，多半是不能用于国内的数据模拟的，我们再看看 mockjs 的表现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let Mock  = require('mockjs');
let Random = Mock.Random;

console.log(Random.city());          => 珠海市
console.log(Random.cname());         => 韩桂英
console.log(Random.date());          => 2007-08-05
console.log(Mock.mock({              => {stars: '★★★★★'}
  &quot;stars|1-10&quot;: &quot;★&quot;
}));
Random.image('200x100', '#4A7BF7', 'hello')
  =>  见下图" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>let Mock  = require(<span class="hljs-string">'mockjs'</span>);
let <span class="hljs-built_in">Random</span> = Mock.<span class="hljs-built_in">Random</span>;

console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">Random</span>.city());          =&gt; 珠海市
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">Random</span>.cname());         =&gt; 韩桂英
console.<span class="hljs-built_in">log</span>(<span class="hljs-built_in">Random</span>.<span class="hljs-built_in">date</span>());          =&gt; <span class="hljs-number">2007</span>-<span class="hljs-number">08</span>-<span class="hljs-number">05</span>
console.<span class="hljs-built_in">log</span>(Mock.mock({              =&gt; {stars: <span class="hljs-string">'★★★★★'</span>}
  <span class="hljs-string">"stars|1-10"</span>: <span class="hljs-string">"★"</span>
}));
<span class="hljs-built_in">Random</span>.<span class="hljs-built_in">image</span>(<span class="hljs-string">'200x100'</span>, <span class="hljs-string">'#4A7BF7'</span>, <span class="hljs-string">'hello'</span>)
  =&gt;  见下图</code></pre>
<p><span class="img-wrap"><img data-src="http://dummyimage.com/200x100/4a7bf7&amp;text=hello" src="https://static.alili.techhttp://dummyimage.com/200x100/4a7bf7&amp;text=hello" alt="demo" title="demo" style="cursor: pointer; display: inline;"></span></p>
<p>虽然 mockj s可以模拟的数据不如 faker 那么多，但是由于其对中文的良好支持，并且使用了位于国内的<br>随机图片提供商，显然是更适合国情的选择。</p>
<h2 id="articleHeader2">mockjs用法示例</h2>
<p>请先用15分钟阅读 <a href="https://github.com/nuysoft/Mock/wiki" rel="nofollow noreferrer" target="_blank">mockjs官方文档</a></p>
<h3 id="articleHeader3">安装mockjs</h3>
<p>在 <code>/mock</code> 目录下安装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install mockjs --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> mockjs <span class="hljs-comment">--save</span></code></pre>
<h3 id="articleHeader4">Mock.mock</h3>
<blockquote><p>我知道有些人不会去认真的阅读官方文档，所以在此摘抄一些官方文档中的例子作为示范：</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// repeat 方法（部分）

Mock.mock({
  &quot;string|5&quot;: &quot;★&quot;       =>   &quot;string&quot;: &quot;★★★★★&quot;
  &quot;string|1-10&quot;: &quot;★&quot;    =>   &quot;string&quot;: &quot;★★&quot;
  &quot;number|1-100&quot;: 100    =>   &quot;number&quot;: 85
  &quot;number|1-100.2&quot;: 100  =>   &quot;number&quot;: 25.69
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code>// <span class="hljs-built_in">repeat</span> 方法（部分）

Mock.mock({
  <span class="hljs-string">"string|5"</span>: <span class="hljs-string">"★"</span>       =&gt;   <span class="hljs-string">"string"</span>: <span class="hljs-string">"★★★★★"</span>
  <span class="hljs-string">"string|1-10"</span>: <span class="hljs-string">"★"</span>    =&gt;   <span class="hljs-string">"string"</span>: <span class="hljs-string">"★★"</span>
  <span class="hljs-string">"number|1-100"</span>: <span class="hljs-number">100</span>    =&gt;   <span class="hljs-string">"number"</span>: <span class="hljs-number">85</span>
  <span class="hljs-string">"number|1-100.2"</span>: <span class="hljs-number">100</span>  =&gt;   <span class="hljs-string">"number"</span>: <span class="hljs-number">25.69</span>
})</code></pre>
<p><a></a></p>
<h3 id="articleHeader5">Mock.Random</h3>
<blockquote><p>我知道有些人不会去认真的阅读官方文档，所以在此摘抄一些官方文档中的例子作为示范：</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// random 方法（部分）

Random.integer(60, 100)    => 78
Random.float(60, 100)      => 89.565475
Random.range(60, 100)      => [60,61,62,...,99]
Random.date()              => &quot;2018-12-28&quot;
Random.image('200x100','#396') => &quot;http://dummyimage.com/200x100/396&quot;
Random.color()             => &quot;#79d8f2&quot;  (默认使用hex颜色)
Random.county(true)        => &quot;浙江省 舟山市 岱山县&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-comment">// random 方法（部分）</span>

Random.<span class="hljs-type">integer</span>(<span class="hljs-number">60</span>, <span class="hljs-number">100</span>)    =&gt; <span class="hljs-number">78</span>
Random.<span class="hljs-type">float</span>(<span class="hljs-number">60</span>, <span class="hljs-number">100</span>)      =&gt; <span class="hljs-number">89.565475</span>
Random.range(<span class="hljs-number">60</span>, <span class="hljs-number">100</span>)      =&gt; [<span class="hljs-number">60</span>,<span class="hljs-number">61</span>,<span class="hljs-number">62</span>,...,<span class="hljs-number">99</span>]
Random.date()              =&gt; <span class="hljs-string">"2018-12-28"</span>
Random.image('<span class="hljs-number">200</span>x100','#<span class="hljs-number">396</span>') =&gt; <span class="hljs-string">"http://dummyimage.com/200x100/396"</span>
Random.color()             =&gt; <span class="hljs-string">"#79d8f2"</span>  (默认使用hex颜色)
Random.county(true)        =&gt; <span class="hljs-string">"浙江省 舟山市 岱山县"</span></code></pre>
<h3 id="articleHeader6">为什么不在浏览器中使用mockjs</h3>
<p>通过阅读 mockjs 的官方文档可以发现，它其实是作为一个独立的 mock server 存在的，就算没有json server，一样可以反馈数据，但是由于以下一些缺点，让我只能把它作为一个数据构造器来使用：</p>
<ul>
<li><p>不能跨域使用</p></li>
<li><p>与某些框架中的路由处理逻辑冲突</p></li>
<li><p>无法定义复杂的数据结构，比如下面的数据结构，images 将会是字符串 <code>[object object]</code>， 而非预想中的数组：</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Mock.mock({
    &quot;list|1-10&quot;: [
      &quot;id|+1&quot;: 1,
      &quot;images&quot;: [1,2,3]
    ] 
  })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code><span class="hljs-symbol">Mock</span>.mock({
    <span class="hljs-string">"list|1-10"</span>: [
      <span class="hljs-string">"id|+1"</span>: <span class="hljs-number">1</span>,
      <span class="hljs-string">"images"</span>: [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]
    ] 
  })</code></pre>
<ul><li><p>无法自定义较为复杂的路由</p></li></ul>
<h3 id="articleHeader7">示例</h3>
<p>下面是一个使用 mockjs 构造的比较复杂的数据格式,对象是一个新闻列表，其中有100条新闻，每条新闻有对应的id，标题，内容，简介，标签，浏览量，和一个图片数组：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# /mock/db.js

let Mock  = require('mockjs');
let Random = Mock.Random;

module.exports = function() {
  var data = { 
      news: []
  };
  
  var images = [1,2,3].map(x=>Random.image('200x100', Random.color(), Random.word(2,6)));

  for (var i = 0; i < 100; i++) {
      
    var content = Random.cparagraph(0,10);

    data.news.push({
         id: i, 
         title: Random.cword(8,20),
         desc: content.substr(0,40),
         tag: Random.cword(2,6),
         views: Random.integer(100,5000),
         images: images.slice(0,Random.integer(1,3))
    })
  }

  return data
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"># /mock/db.js

<span class="hljs-keyword">let</span> Mock  = <span class="hljs-built_in">require</span>(<span class="hljs-string">'mockjs'</span>);
<span class="hljs-keyword">let</span> Random = Mock.Random;

<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> data = { 
      <span class="hljs-attr">news</span>: []
  };
  
  <span class="hljs-keyword">var</span> images = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>].map(<span class="hljs-function"><span class="hljs-params">x</span>=&gt;</span>Random.image(<span class="hljs-string">'200x100'</span>, Random.color(), Random.word(<span class="hljs-number">2</span>,<span class="hljs-number">6</span>)));

  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">100</span>; i++) {
      
    <span class="hljs-keyword">var</span> content = Random.cparagraph(<span class="hljs-number">0</span>,<span class="hljs-number">10</span>);

    data.news.push({
         <span class="hljs-attr">id</span>: i, 
         <span class="hljs-attr">title</span>: Random.cword(<span class="hljs-number">8</span>,<span class="hljs-number">20</span>),
         <span class="hljs-attr">desc</span>: content.substr(<span class="hljs-number">0</span>,<span class="hljs-number">40</span>),
         <span class="hljs-attr">tag</span>: Random.cword(<span class="hljs-number">2</span>,<span class="hljs-number">6</span>),
         <span class="hljs-attr">views</span>: Random.integer(<span class="hljs-number">100</span>,<span class="hljs-number">5000</span>),
         <span class="hljs-attr">images</span>: images.slice(<span class="hljs-number">0</span>,Random.integer(<span class="hljs-number">1</span>,<span class="hljs-number">3</span>))
    })
  }

  <span class="hljs-keyword">return</span> data
}
</code></pre>
<p><code>/mock</code> 下运行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="json-server db.js -p 3003" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">json-server db<span class="hljs-selector-class">.js</span> -<span class="hljs-selector-tag">p</span> <span class="hljs-number">3003</span></code></pre>
<p>访问 <code>http://localhost:3003/news</code> 看到的数据是:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
    {
        &quot;id&quot;: 0,
        &quot;title&quot;: &quot;元小总小把清保住影办历战资和总由&quot;,
        &quot;desc&quot;: &quot;共先定制向向圆适者定书她规置斗平相。要广确但教金更前三响角面等以白。眼查何参提适&quot;,
        &quot;tag&quot;: &quot;值集空&quot;,
        &quot;views&quot;: 3810,
        &quot;images&quot;: [
            &quot;http://dummyimage.com/200x100/79f2a5&amp;text=别角置&quot;,
            &quot;http://dummyimage.com/200x100/f28279&amp;text=收面几容受取&quot;,
            &quot;http://dummyimage.com/200x100/7993f2&amp;text=做件&quot;
        ]
    },
    {
        &quot;id&quot;: 1,
        &quot;title&quot;: &quot;物器许条对越复术&quot;,
        &quot;desc&quot;: &quot;方江周是府整头书生权部部条。始克识史但给又约同段十子按者感律备。关长厂平难山从合&quot;,
        &quot;tag&quot;: &quot;分七眼术保&quot;,
        &quot;views&quot;: 4673,
        &quot;images&quot;: [
        &quot;http://dummyimage.com/200x100/79f2a5&amp;text=别角置&quot;
        ]
    },
    {
        &quot;id&quot;: 2,
        &quot;title&quot;: &quot;但学却连质法计性想般最&quot;,
        &quot;desc&quot;: &quot;以群亲它天即资几行位具回同务度。场养验快但部光天火金时内我。任提教毛办结论感看还&quot;,
        &quot;tag&quot;: &quot;响六&quot;,
        &quot;views&quot;: 4131,
        &quot;images&quot;: [
            &quot;http://dummyimage.com/200x100/79f2a5&amp;text=别角置&quot;,
            &quot;http://dummyimage.com/200x100/f28279&amp;text=收面几容受取&quot;,
            &quot;http://dummyimage.com/200x100/7993f2&amp;text=做件&quot;
        ]
    },
    ...
    {
        &quot;id&quot;: 99,
        &quot;title&quot;: &quot;则群起然线部其深我位价业红候院&quot;,
        &quot;desc&quot;: &quot;为高值务须西生型住断况里听。志置开用她你然始查她响元还。照员给门次府此据它后支越&quot;,
        &quot;tag&quot;: &quot;何你&quot;,
        &quot;views&quot;: 2952,
        &quot;images&quot;: [
            &quot;http://dummyimage.com/200x100/79f2a5&amp;text=别角置&quot;
        ]
    }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>[
    {
        <span class="hljs-attr">"id"</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">"title"</span>: <span class="hljs-string">"元小总小把清保住影办历战资和总由"</span>,
        <span class="hljs-attr">"desc"</span>: <span class="hljs-string">"共先定制向向圆适者定书她规置斗平相。要广确但教金更前三响角面等以白。眼查何参提适"</span>,
        <span class="hljs-attr">"tag"</span>: <span class="hljs-string">"值集空"</span>,
        <span class="hljs-attr">"views"</span>: <span class="hljs-number">3810</span>,
        <span class="hljs-attr">"images"</span>: [
            <span class="hljs-string">"http://dummyimage.com/200x100/79f2a5&amp;text=别角置"</span>,
            <span class="hljs-string">"http://dummyimage.com/200x100/f28279&amp;text=收面几容受取"</span>,
            <span class="hljs-string">"http://dummyimage.com/200x100/7993f2&amp;text=做件"</span>
        ]
    },
    {
        <span class="hljs-attr">"id"</span>: <span class="hljs-number">1</span>,
        <span class="hljs-attr">"title"</span>: <span class="hljs-string">"物器许条对越复术"</span>,
        <span class="hljs-attr">"desc"</span>: <span class="hljs-string">"方江周是府整头书生权部部条。始克识史但给又约同段十子按者感律备。关长厂平难山从合"</span>,
        <span class="hljs-attr">"tag"</span>: <span class="hljs-string">"分七眼术保"</span>,
        <span class="hljs-attr">"views"</span>: <span class="hljs-number">4673</span>,
        <span class="hljs-attr">"images"</span>: [
        <span class="hljs-string">"http://dummyimage.com/200x100/79f2a5&amp;text=别角置"</span>
        ]
    },
    {
        <span class="hljs-attr">"id"</span>: <span class="hljs-number">2</span>,
        <span class="hljs-attr">"title"</span>: <span class="hljs-string">"但学却连质法计性想般最"</span>,
        <span class="hljs-attr">"desc"</span>: <span class="hljs-string">"以群亲它天即资几行位具回同务度。场养验快但部光天火金时内我。任提教毛办结论感看还"</span>,
        <span class="hljs-attr">"tag"</span>: <span class="hljs-string">"响六"</span>,
        <span class="hljs-attr">"views"</span>: <span class="hljs-number">4131</span>,
        <span class="hljs-attr">"images"</span>: [
            <span class="hljs-string">"http://dummyimage.com/200x100/79f2a5&amp;text=别角置"</span>,
            <span class="hljs-string">"http://dummyimage.com/200x100/f28279&amp;text=收面几容受取"</span>,
            <span class="hljs-string">"http://dummyimage.com/200x100/7993f2&amp;text=做件"</span>
        ]
    },
    ...
    {
        <span class="hljs-attr">"id"</span>: <span class="hljs-number">99</span>,
        <span class="hljs-attr">"title"</span>: <span class="hljs-string">"则群起然线部其深我位价业红候院"</span>,
        <span class="hljs-attr">"desc"</span>: <span class="hljs-string">"为高值务须西生型住断况里听。志置开用她你然始查她响元还。照员给门次府此据它后支越"</span>,
        <span class="hljs-attr">"tag"</span>: <span class="hljs-string">"何你"</span>,
        <span class="hljs-attr">"views"</span>: <span class="hljs-number">2952</span>,
        <span class="hljs-attr">"images"</span>: [
            <span class="hljs-string">"http://dummyimage.com/200x100/79f2a5&amp;text=别角置"</span>
        ]
    }
]</code></pre>
<h4>参考资料</h4>
<p>json-server源码 ： <a href="https://github.com/typicode/json-server" rel="nofollow noreferrer" target="_blank">json-server</a><br>mockjs源码 ： <a href="https://github.com/nuysoft/Mock" rel="nofollow noreferrer" target="_blank">mockjs</a><br>demo ： <a href="https://github.com/Iamlars/diaries/tree/master/demos/mock" rel="nofollow noreferrer" target="_blank">示例代码</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用JSON-server模拟REST API(二) 动态数据

## 原文链接
[https://segmentfault.com/a/1190000005793320](https://segmentfault.com/a/1190000005793320)

