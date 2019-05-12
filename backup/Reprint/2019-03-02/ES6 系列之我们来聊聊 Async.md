---
title: 'ES6 系列之我们来聊聊 Async' 
date: 2019-03-02 2:30:07
hidden: true
slug: cazifdrck0u
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">async</h2>
<p>ES2017 标准引入了 async 函数，使得异步操作变得更加方便。</p>
<p>在异步处理上，async 函数就是 Generator 函数的语法糖。</p>
<p>举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 使用 generator
var fetch = require('node-fetch');
var co = require('co');

function* gen() {
    var r1 = yield fetch('https://api.github.com/users/github');
    var json1 = yield r1.json();
    console.log(json1.bio);
}

co(gen);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 使用 generator</span>
<span class="hljs-keyword">var</span> fetch = <span class="hljs-built_in">require</span>(<span class="hljs-string">'node-fetch'</span>);
<span class="hljs-keyword">var</span> co = <span class="hljs-built_in">require</span>(<span class="hljs-string">'co'</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">gen</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> r1 = <span class="hljs-keyword">yield</span> fetch(<span class="hljs-string">'https://api.github.com/users/github'</span>);
    <span class="hljs-keyword">var</span> json1 = <span class="hljs-keyword">yield</span> r1.json();
    <span class="hljs-built_in">console</span>.log(json1.bio);
}

co(gen);</code></pre>
<p>当你使用 async 时：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 使用 async
var fetch = require('node-fetch');

var fetchData = async function () {
    var r1 = await fetch('https://api.github.com/users/github');
    var json1 = await r1.json();
    console.log(json1.bio);
};

fetchData();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 使用 async</span>
<span class="hljs-keyword">var</span> fetch = <span class="hljs-built_in">require</span>(<span class="hljs-string">'node-fetch'</span>);

<span class="hljs-keyword">var</span> fetchData = <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> r1 = <span class="hljs-keyword">await</span> fetch(<span class="hljs-string">'https://api.github.com/users/github'</span>);
    <span class="hljs-keyword">var</span> json1 = <span class="hljs-keyword">await</span> r1.json();
    <span class="hljs-built_in">console</span>.log(json1.bio);
};

fetchData();</code></pre>
<p>其实 async 函数的实现原理，就是将 Generator 函数和自动执行器，包装在一个函数里。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function fn(args) {
  // ...
}

// 等同于

function fn(args) {
  return spawn(function* () {
    // ...
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params">args</span>) </span>{
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-comment">// 等同于</span>

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fn</span>(<span class="hljs-params">args</span>) </span>{
  <span class="hljs-keyword">return</span> spawn(<span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// ...</span>
  });
}</code></pre>
<p>spawn 函数指的是自动执行器，就比如说 co。</p>
<p>再加上 async 函数返回一个 Promise 对象，你也可以理解为 async 函数是基于 Promise 和 Generator 的一层封装。</p>
<h2 id="articleHeader1">async 与 Promise</h2>
<p>严谨的说，async 是一种语法，Promise 是一个内置对象，两者并不具备可比性，更何况 async 函数也返回一个 Promise 对象……</p>
<p>这里主要是展示一些场景，使用 async 会比使用 Promise 更优雅的处理异步流程。</p>
<h3 id="articleHeader2">1. 代码更加简洁</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 示例一
 */
function fetch() {
  return (
    fetchData()
    .then(() => {
      return &quot;done&quot;
    });
  )
}

async function fetch() {
  await fetchData()
  return &quot;done&quot;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 示例一
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fetch</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> (
    fetchData()
    .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-keyword">return</span> <span class="hljs-string">"done"</span>
    });
  )
}

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fetch</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">await</span> fetchData()
  <span class="hljs-keyword">return</span> <span class="hljs-string">"done"</span>
};</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 示例二
 */
function fetch() {
  return fetchData()
  .then(data => {
    if (data.moreData) {
        return fetchAnotherData(data)
        .then(moreData => {
          return moreData
        })
    } else {
      return data
    }
  });
}

async function fetch() {
  const data = await fetchData()
  if (data.moreData) {
    const moreData = await fetchAnotherData(data);
    return moreData
  } else {
    return data
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 示例二
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fetch</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> fetchData()
  .then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (data.moreData) {
        <span class="hljs-keyword">return</span> fetchAnotherData(data)
        .then(<span class="hljs-function"><span class="hljs-params">moreData</span> =&gt;</span> {
          <span class="hljs-keyword">return</span> moreData
        })
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">return</span> data
    }
  });
}

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fetch</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> fetchData()
  <span class="hljs-keyword">if</span> (data.moreData) {
    <span class="hljs-keyword">const</span> moreData = <span class="hljs-keyword">await</span> fetchAnotherData(data);
    <span class="hljs-keyword">return</span> moreData
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> data
  }
};</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 示例三
 */
function fetch() {
  return (
    fetchData()
    .then(value1 => {
      return fetchMoreData(value1)
    })
    .then(value2 => {
      return fetchMoreData2(value2)
    })
  )
}

async function fetch() {
  const value1 = await fetchData()
  const value2 = await fetchMoreData(value1)
  return fetchMoreData2(value2)
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">/**
 * 示例三
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fetch</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> (
    fetchData()
    .then(<span class="hljs-function"><span class="hljs-params">value1</span> =&gt;</span> {
      <span class="hljs-keyword">return</span> fetchMoreData(value1)
    })
    .then(<span class="hljs-function"><span class="hljs-params">value2</span> =&gt;</span> {
      <span class="hljs-keyword">return</span> fetchMoreData2(value2)
    })
  )
}

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fetch</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> value1 = <span class="hljs-keyword">await</span> fetchData()
  <span class="hljs-keyword">const</span> value2 = <span class="hljs-keyword">await</span> fetchMoreData(value1)
  <span class="hljs-keyword">return</span> fetchMoreData2(value2)
};</code></pre>
<h3 id="articleHeader3">2. 错误处理</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function fetch() {
  try {
    fetchData()
      .then(result => {
        const data = JSON.parse(result)
      })
      .catch((err) => {
        console.log(err)
      })
  } catch (err) {
    console.log(err)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fetch</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">try</span> {
    fetchData()
      .then(<span class="hljs-function"><span class="hljs-params">result</span> =&gt;</span> {
        <span class="hljs-keyword">const</span> data = <span class="hljs-built_in">JSON</span>.parse(result)
      })
      .catch(<span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> {
        <span class="hljs-built_in">console</span>.log(err)
      })
  } <span class="hljs-keyword">catch</span> (err) {
    <span class="hljs-built_in">console</span>.log(err)
  }
}</code></pre>
<p>在这段代码中，try/catch 能捕获 fetchData() 中的一些 Promise 构造错误，但是不能捕获 JSON.parse 抛出的异常，如果要处理 JSON.parse 抛出的异常，需要添加 catch 函数重复一遍异常处理的逻辑。</p>
<p>在实际项目中，错误处理逻辑可能会很复杂，这会导致冗余的代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function fetch() {
  try {
    const data = JSON.parse(await fetchData())
  } catch (err) {
    console.log(err)
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fetch</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">const</span> data = <span class="hljs-built_in">JSON</span>.parse(<span class="hljs-keyword">await</span> fetchData())
  } <span class="hljs-keyword">catch</span> (err) {
    <span class="hljs-built_in">console</span>.log(err)
  }
};</code></pre>
<p>async/await 的出现使得 try/catch 就可以捕获同步和异步的错误。</p>
<h3 id="articleHeader4">3. 调试</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fetchData = () => new Promise((resolve) => setTimeout(resolve, 1000, 1))
const fetchMoreData = (value) => new Promise((resolve) => setTimeout(resolve, 1000, value + 1))
const fetchMoreData2 = (value) => new Promise((resolve) => setTimeout(resolve, 1000, value + 2))

function fetch() {
  return (
    fetchData()
    .then((value1) => {
      console.log(value1)
      return fetchMoreData(value1)
    })
    .then(value2 => {
      return fetchMoreData2(value2)
    })
  )
}

const res = fetch();
console.log(res);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> fetchData = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> setTimeout(resolve, <span class="hljs-number">1000</span>, <span class="hljs-number">1</span>))
<span class="hljs-keyword">const</span> fetchMoreData = <span class="hljs-function">(<span class="hljs-params">value</span>) =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> setTimeout(resolve, <span class="hljs-number">1000</span>, value + <span class="hljs-number">1</span>))
<span class="hljs-keyword">const</span> fetchMoreData2 = <span class="hljs-function">(<span class="hljs-params">value</span>) =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> setTimeout(resolve, <span class="hljs-number">1000</span>, value + <span class="hljs-number">2</span>))

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fetch</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> (
    fetchData()
    .then(<span class="hljs-function">(<span class="hljs-params">value1</span>) =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(value1)
      <span class="hljs-keyword">return</span> fetchMoreData(value1)
    })
    .then(<span class="hljs-function"><span class="hljs-params">value2</span> =&gt;</span> {
      <span class="hljs-keyword">return</span> fetchMoreData2(value2)
    })
  )
}

<span class="hljs-keyword">const</span> res = fetch();
<span class="hljs-built_in">console</span>.log(res);</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016781013" src="https://static.alili.tech/img/remote/1460000016781013" alt="promise 断点演示" title="promise 断点演示" style="cursor: pointer; display: inline;"></span></p>
<p>因为 then 中的代码是异步执行，所以当你打断点的时候，代码不会顺序执行，尤其当你使用 step over 的时候，then 函数会直接进入下一个 then 函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fetchData = () => new Promise((resolve) => setTimeout(resolve, 1000, 1))
const fetchMoreData = () => new Promise((resolve) => setTimeout(resolve, 1000, 2))
const fetchMoreData2 = () => new Promise((resolve) => setTimeout(resolve, 1000, 3))

async function fetch() {
  const value1 = await fetchData()
  const value2 = await fetchMoreData(value1)
  return fetchMoreData2(value2)
};

const res = fetch();
console.log(res);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> fetchData = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> setTimeout(resolve, <span class="hljs-number">1000</span>, <span class="hljs-number">1</span>))
<span class="hljs-keyword">const</span> fetchMoreData = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> setTimeout(resolve, <span class="hljs-number">1000</span>, <span class="hljs-number">2</span>))
<span class="hljs-keyword">const</span> fetchMoreData2 = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> setTimeout(resolve, <span class="hljs-number">1000</span>, <span class="hljs-number">3</span>))

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fetch</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> value1 = <span class="hljs-keyword">await</span> fetchData()
  <span class="hljs-keyword">const</span> value2 = <span class="hljs-keyword">await</span> fetchMoreData(value1)
  <span class="hljs-keyword">return</span> fetchMoreData2(value2)
};

<span class="hljs-keyword">const</span> res = fetch();
<span class="hljs-built_in">console</span>.log(res);</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016781014" src="https://static.alili.tech/img/remote/1460000016781014" alt="async 断点演示" title="async 断点演示" style="cursor: pointer;"></span></p>
<p>而使用 async 的时候，则可以像调试同步代码一样调试。</p>
<h2 id="articleHeader5">async 地狱</h2>
<p>async 地狱主要是指开发者贪图语法上的简洁而让原本可以并行执行的内容变成了顺序执行，从而影响了性能，但用地狱形容有点夸张了点……</p>
<h3 id="articleHeader6">例子一</h3>
<p>举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(async () => {
  const getList = await getList();
  const getAnotherList = await getAnotherList();
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">(<span class="hljs-keyword">async</span> () =&gt; {
  <span class="hljs-keyword">const</span> getList = <span class="hljs-keyword">await</span> getList();
  <span class="hljs-keyword">const</span> getAnotherList = <span class="hljs-keyword">await</span> getAnotherList();
})();</code></pre>
<p>getList() 和 getAnotherList() 其实并没有依赖关系，但是现在的这种写法，虽然简洁，却导致了 getAnotherList() 只能在 getList() 返回后才会执行，从而导致了多一倍的请求时间。</p>
<p>为了解决这个问题，我们可以改成这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(async () => {
  const listPromise = getList();
  const anotherListPromise = getAnotherList();
  await listPromise;
  await anotherListPromise;
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">(<span class="hljs-keyword">async</span> () =&gt; {
  <span class="hljs-keyword">const</span> listPromise = getList();
  <span class="hljs-keyword">const</span> anotherListPromise = getAnotherList();
  <span class="hljs-keyword">await</span> listPromise;
  <span class="hljs-keyword">await</span> anotherListPromise;
})();</code></pre>
<p>也可以使用 Promise.all()：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(async () => {
  Promise.all([getList(), getAnotherList()]).then(...);
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">(<span class="hljs-keyword">async</span> () =&gt; {
  <span class="hljs-built_in">Promise</span>.all([getList(), getAnotherList()]).then(...);
})();</code></pre>
<h3 id="articleHeader7">例子二</h3>
<p>当然上面这个例子比较简单，我们再来扩充一下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(async () => {
  const listPromise = await getList();
  const anotherListPromise = await getAnotherList();

  // do something

  await submit(listData);
  await submit(anotherListData);

})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">(<span class="hljs-keyword">async</span> () =&gt; {
  <span class="hljs-keyword">const</span> listPromise = <span class="hljs-keyword">await</span> getList();
  <span class="hljs-keyword">const</span> anotherListPromise = <span class="hljs-keyword">await</span> getAnotherList();

  <span class="hljs-comment">// do something</span>

  <span class="hljs-keyword">await</span> submit(listData);
  <span class="hljs-keyword">await</span> submit(anotherListData);

})();</code></pre>
<p>因为 await 的特性，整个例子有明显的先后顺序，然而 getList() 和 getAnotherList() 其实并无依赖，submit(listData) 和 submit(anotherListData) 也没有依赖关系，那么对于这种例子，我们该怎么改写呢？</p>
<p>基本分为三个步骤：</p>
<p><strong>1. 找出依赖关系</strong></p>
<p>在这里，submit(listData) 需要在 getList() 之后，submit(anotherListData) 需要在 anotherListPromise() 之后。</p>
<p><strong>2. 将互相依赖的语句包裹在 async 函数中</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function handleList() {
  const listPromise = await getList();
  // ...
  await submit(listData);
}

async function handleAnotherList() {
  const anotherListPromise = await getAnotherList()
  // ...
  await submit(anotherListData)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleList</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> listPromise = <span class="hljs-keyword">await</span> getList();
  <span class="hljs-comment">// ...</span>
  <span class="hljs-keyword">await</span> submit(listData);
}

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleAnotherList</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> anotherListPromise = <span class="hljs-keyword">await</span> getAnotherList()
  <span class="hljs-comment">// ...</span>
  <span class="hljs-keyword">await</span> submit(anotherListData)
}</code></pre>
<p><strong>3.并发执行 async 函数</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function handleList() {
  const listPromise = await getList();
  // ...
  await submit(listData);
}

async function handleAnotherList() {
  const anotherListPromise = await getAnotherList()
  // ...
  await submit(anotherListData)
}

// 方法一
(async () => {
  const handleListPromise = handleList()
  const handleAnotherListPromise = handleAnotherList()
  await handleListPromise
  await handleAnotherListPromise
})()

// 方法二
(async () => {
  Promise.all([handleList(), handleAnotherList()]).then()
})()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleList</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> listPromise = <span class="hljs-keyword">await</span> getList();
  <span class="hljs-comment">// ...</span>
  <span class="hljs-keyword">await</span> submit(listData);
}

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleAnotherList</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> anotherListPromise = <span class="hljs-keyword">await</span> getAnotherList()
  <span class="hljs-comment">// ...</span>
  <span class="hljs-keyword">await</span> submit(anotherListData)
}

<span class="hljs-comment">// 方法一</span>
(<span class="hljs-keyword">async</span> () =&gt; {
  <span class="hljs-keyword">const</span> handleListPromise = handleList()
  <span class="hljs-keyword">const</span> handleAnotherListPromise = handleAnotherList()
  <span class="hljs-keyword">await</span> handleListPromise
  <span class="hljs-keyword">await</span> handleAnotherListPromise
})()

<span class="hljs-comment">// 方法二</span>
(<span class="hljs-keyword">async</span> () =&gt; {
  <span class="hljs-built_in">Promise</span>.all([handleList(), handleAnotherList()]).then()
})()</code></pre>
<h2 id="articleHeader8">继发与并发</h2>
<p><strong>问题：给定一个 URL 数组，如何实现接口的继发和并发？</strong></p>
<p>async 继发实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 继发一
async function loadData() {
  var res1 = await fetch(url1);
  var res2 = await fetch(url2);
  var res3 = await fetch(url3);
  return &quot;whew all done&quot;;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 继发一</span>
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loadData</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> res1 = <span class="hljs-keyword">await</span> fetch(url1);
  <span class="hljs-keyword">var</span> res2 = <span class="hljs-keyword">await</span> fetch(url2);
  <span class="hljs-keyword">var</span> res3 = <span class="hljs-keyword">await</span> fetch(url3);
  <span class="hljs-keyword">return</span> <span class="hljs-string">"whew all done"</span>;
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 继发二
async function loadData(urls) {
  for (const url of urls) {
    const response = await fetch(url);
    console.log(await response.text());
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 继发二</span>
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loadData</span>(<span class="hljs-params">urls</span>) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> url <span class="hljs-keyword">of</span> urls) {
    <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> fetch(url);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">await</span> response.text());
  }
}</code></pre>
<p>async 并发实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 并发一
async function loadData() {
  var res = await Promise.all([fetch(url1), fetch(url2), fetch(url3)]);
  return &quot;whew all done&quot;;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 并发一</span>
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loadData</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> res = <span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>.all([fetch(url1), fetch(url2), fetch(url3)]);
  <span class="hljs-keyword">return</span> <span class="hljs-string">"whew all done"</span>;
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 并发二
async function loadData(urls) {
  // 并发读取 url
  const textPromises = urls.map(async url => {
    const response = await fetch(url);
    return response.text();
  });

  // 按次序输出
  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 并发二</span>
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loadData</span>(<span class="hljs-params">urls</span>) </span>{
  <span class="hljs-comment">// 并发读取 url</span>
  <span class="hljs-keyword">const</span> textPromises = urls.map(<span class="hljs-keyword">async</span> url =&gt; {
    <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> fetch(url);
    <span class="hljs-keyword">return</span> response.text();
  });

  <span class="hljs-comment">// 按次序输出</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> textPromise <span class="hljs-keyword">of</span> textPromises) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">await</span> textPromise);
  }
}</code></pre>
<h2 id="articleHeader9">async 错误捕获</h2>
<p>尽管我们可以使用 try catch 捕获错误，但是当我们需要捕获多个错误并做不同的处理时，很快 try catch 就会导致代码杂乱，就比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function asyncTask(cb) {
    try {
       const user = await UserModel.findById(1);
       if(!user) return cb('No user found');
    } catch(e) {
        return cb('Unexpected error occurred');
    }

    try {
       const savedTask = await TaskModel({userId: user.id, name: 'Demo Task'});
    } catch(e) {
        return cb('Error occurred while saving task');
    }

    if(user.notificationsEnabled) {
        try {
            await NotificationService.sendNotification(user.id, 'Task Created');
        } catch(e) {
            return cb('Error while sending notification');
        }
    }

    if(savedTask.assignedUser.id !== user.id) {
        try {
            await NotificationService.sendNotification(savedTask.assignedUser.id, 'Task was created for you');
        } catch(e) {
            return cb('Error while sending notification');
        }
    }

    cb(null, savedTask);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">asyncTask</span>(<span class="hljs-params">cb</span>) </span>{
    <span class="hljs-keyword">try</span> {
       <span class="hljs-keyword">const</span> user = <span class="hljs-keyword">await</span> UserModel.findById(<span class="hljs-number">1</span>);
       <span class="hljs-keyword">if</span>(!user) <span class="hljs-keyword">return</span> cb(<span class="hljs-string">'No user found'</span>);
    } <span class="hljs-keyword">catch</span>(e) {
        <span class="hljs-keyword">return</span> cb(<span class="hljs-string">'Unexpected error occurred'</span>);
    }

    <span class="hljs-keyword">try</span> {
       <span class="hljs-keyword">const</span> savedTask = <span class="hljs-keyword">await</span> TaskModel({<span class="hljs-attr">userId</span>: user.id, <span class="hljs-attr">name</span>: <span class="hljs-string">'Demo Task'</span>});
    } <span class="hljs-keyword">catch</span>(e) {
        <span class="hljs-keyword">return</span> cb(<span class="hljs-string">'Error occurred while saving task'</span>);
    }

    <span class="hljs-keyword">if</span>(user.notificationsEnabled) {
        <span class="hljs-keyword">try</span> {
            <span class="hljs-keyword">await</span> NotificationService.sendNotification(user.id, <span class="hljs-string">'Task Created'</span>);
        } <span class="hljs-keyword">catch</span>(e) {
            <span class="hljs-keyword">return</span> cb(<span class="hljs-string">'Error while sending notification'</span>);
        }
    }

    <span class="hljs-keyword">if</span>(savedTask.assignedUser.id !== user.id) {
        <span class="hljs-keyword">try</span> {
            <span class="hljs-keyword">await</span> NotificationService.sendNotification(savedTask.assignedUser.id, <span class="hljs-string">'Task was created for you'</span>);
        } <span class="hljs-keyword">catch</span>(e) {
            <span class="hljs-keyword">return</span> cb(<span class="hljs-string">'Error while sending notification'</span>);
        }
    }

    cb(<span class="hljs-literal">null</span>, savedTask);
}</code></pre>
<p>为了简化这种错误的捕获，我们可以给 await 后的 promise 对象添加 catch 函数，为此我们需要写一个 helper:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// to.js
export default function to(promise) {
   return promise.then(data => {
      return [null, data];
   })
   .catch(err => [err]);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// to.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">to</span>(<span class="hljs-params">promise</span>) </span>{
   <span class="hljs-keyword">return</span> promise.then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
      <span class="hljs-keyword">return</span> [<span class="hljs-literal">null</span>, data];
   })
   .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> [err]);
}</code></pre>
<p>整个错误捕获的代码可以简化为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import to from './to.js';

async function asyncTask() {
     let err, user, savedTask;

     [err, user] = await to(UserModel.findById(1));
     if(!user) throw new CustomerError('No user found');

     [err, savedTask] = await to(TaskModel({userId: user.id, name: 'Demo Task'}));
     if(err) throw new CustomError('Error occurred while saving task');

    if(user.notificationsEnabled) {
       const [err] = await to(NotificationService.sendNotification(user.id, 'Task Created'));
       if (err) console.error('Just log the error and continue flow');
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> to <span class="hljs-keyword">from</span> <span class="hljs-string">'./to.js'</span>;

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">asyncTask</span>(<span class="hljs-params"></span>) </span>{
     <span class="hljs-keyword">let</span> err, user, savedTask;

     [err, user] = <span class="hljs-keyword">await</span> to(UserModel.findById(<span class="hljs-number">1</span>));
     <span class="hljs-keyword">if</span>(!user) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> CustomerError(<span class="hljs-string">'No user found'</span>);

     [err, savedTask] = <span class="hljs-keyword">await</span> to(TaskModel({<span class="hljs-attr">userId</span>: user.id, <span class="hljs-attr">name</span>: <span class="hljs-string">'Demo Task'</span>}));
     <span class="hljs-keyword">if</span>(err) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> CustomError(<span class="hljs-string">'Error occurred while saving task'</span>);

    <span class="hljs-keyword">if</span>(user.notificationsEnabled) {
       <span class="hljs-keyword">const</span> [err] = <span class="hljs-keyword">await</span> to(NotificationService.sendNotification(user.id, <span class="hljs-string">'Task Created'</span>));
       <span class="hljs-keyword">if</span> (err) <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'Just log the error and continue flow'</span>);
    }
}</code></pre>
<h2 id="articleHeader10">async 的一些讨论</h2>
<h3 id="articleHeader11">async 会取代 Generator 吗？</h3>
<p>Generator 本来是用作生成器，使用 Generator 处理异步请求只是一个比较 hack 的用法，在异步方面，async 可以取代 Generator，但是 async 和 Generator 两个语法本身是用来解决不同的问题的。</p>
<h3 id="articleHeader12">async 会取代 Promise 吗？</h3>
<ol>
<li>async 函数返回一个 Promise 对象</li>
<li>面对复杂的异步流程，Promise 提供的 all 和 race 会更加好用</li>
<li>Promise 本身是一个对象，所以可以在代码中任意传递</li>
<li>async 的支持率还很低，即使有 Babel，编译后也要增加 1000 行左右。</li>
</ol>
<h2 id="articleHeader13">参考</h2>
<ol>
<li><a href="https://zhuanlan.zhihu.com/p/26260061" rel="nofollow noreferrer" target="_blank">(译) 6 个 Async/Await 优于 Promise 的方面</a></li>
<li><a href="https://juejin.im/post/5aefbb48f265da0b9b073c40" rel="nofollow noreferrer" target="_blank">(译) 如何逃离 async/await 地狱</a></li>
<li><a href="https://segmentfault.com/a/1190000014753495">精读《async/await 是把双刃剑》</a></li>
<li><a href="http://es6.ruanyifeng.com/#docs/async" rel="nofollow noreferrer" target="_blank">ECMAScript 6 入门</a></li>
<li><a href="https://blog.grossman.io/how-to-write-async-await-without-try-catch-blocks-in-javascript/" rel="nofollow noreferrer" target="_blank">How to write async await without try-catch blocks in Javascript</a></li>
</ol>
<h2 id="articleHeader14">ES6 系列</h2>
<p>ES6 系列目录地址：<a href="https://github.com/mqyqingfeng/Blog" rel="nofollow noreferrer" target="_blank">https://github.com/mqyqingfeng/Blog</a></p>
<p>ES6 系列预计写二十篇左右，旨在加深 ES6 部分知识点的理解，重点讲解块级作用域、标签模板、箭头函数、Symbol、Set、Map 以及 Promise 的模拟实现、模块加载方案、异步处理等内容。</p>
<p>如果有错误或者不严谨的地方，请务必给予指正，十分感谢。如果喜欢或者有所启发，欢迎 star，对作者也是一种鼓励。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ES6 系列之我们来聊聊 Async

## 原文链接
[https://segmentfault.com/a/1190000016781010](https://segmentfault.com/a/1190000016781010)

