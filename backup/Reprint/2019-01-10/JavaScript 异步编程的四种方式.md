---
title: 'JavaScript 异步编程的四种方式' 
date: 2019-01-10 2:30:08
hidden: true
slug: xyfrz84gtu
categories: [reprint]
---

{{< raw >}}

                    
<p>异步编程是每个使用 JavaScript 编程的人都会遇到的问题，无论是前端的 ajax 请求，或是 node 的各种异步 API。本文就来总结一下常见的四种处理异步编程的方法。</p>
<h2 id="articleHeader0">回调函数</h2>
<p>使用回调函数是最常见的一种形式，下面来举几个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery ajax
$.get('test.html', data => {
  $('#result').html(data)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// jQuery ajax</span>
$.get(<span class="hljs-string">'test.html'</span>, data =&gt; {
  $(<span class="hljs-string">'#result'</span>).html(data)
})</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// node 异步读取文件
const fs = require('fs')

fs.readFile('/etc/passwd', (err, data) => {
  if (err) {
    throw err
  }
  console.log(data)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// node 异步读取文件</span>
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>)

fs.readFile(<span class="hljs-string">'/etc/passwd'</span>, (err, data) =&gt; {
  <span class="hljs-keyword">if</span> (err) {
    <span class="hljs-keyword">throw</span> err
  }
  <span class="hljs-built_in">console</span>.log(data)
})</code></pre>
<p>回调函数非常容易理解，就是定义函数的时候将另一个函数（回调函数）作为参数传入定义的函数当中，当异步操作执行完毕后在执行该回调函数，从而可以确保接下来的操作在异步操作之后执行。</p>
<p>回调函数的缺点在于当需要执行多个异步操作的时候会将多个回调函数嵌套在一起，组成代码结构上混乱，被称为回调地狱（callback hell）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="func1(data0, data1 => {
  func2(data2, data3 => {
    func3(data3, data4 => data4)
  })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">func1(data0, data1 =&gt; {
  func2(data2, data3 =&gt; {
    func3(data3, data4 =&gt; data4)
  })
})</code></pre>
<h2 id="articleHeader1">Promise</h2>
<p>Promise 利用一种链式调用的方法来组织异步代码，可以将原来以回调函数形式调用的代码改为链式调用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// jQuery ajax promise 方式
$.get('test.html')
  .then(data => $(data))
  .then($data => $data.find('#link').val('href'))
  .then(href => console.log(href))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// jQuery ajax promise 方式</span>
$.get(<span class="hljs-string">'test.html'</span>)
  .then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> $(data))
  .then(<span class="hljs-function"><span class="hljs-params">$data</span> =&gt;</span> $data.find(<span class="hljs-string">'#link'</span>).val(<span class="hljs-string">'href'</span>))
  .then(<span class="hljs-function"><span class="hljs-params">href</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(href))</code></pre>
<p>自己定义一个 Promise 形式的函数在 ES6 当中也非常简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ready() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('ready')
    }, 3000)
  })
}

ready().then(ready => console.log(`${ready} go!`))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ready</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      resolve(<span class="hljs-string">'ready'</span>)
    }, <span class="hljs-number">3000</span>)
  })
}

ready().then(<span class="hljs-function"><span class="hljs-params">ready</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${ready}</span> go!`</span>))</code></pre>
<p>在 node 8.0 以上的版本还可以利用 <code>util.promisify</code> 方法将回调形式的函数变为 Promise 形式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const util = require('util')
const fs = require('fs')

const readPromise = util.promisify(fs.readFile)

readPromise('test.txt').then(data => console.log(data.toString()))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> util = <span class="hljs-built_in">require</span>(<span class="hljs-string">'util'</span>)
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>)

<span class="hljs-keyword">const</span> readPromise = util.promisify(fs.readFile)

readPromise(<span class="hljs-string">'test.txt'</span>).then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(data.toString()))</code></pre>
<p>想详细了解 Promise 可以阅读拙作<a href="http://blog.acwong.org/2015/06/22/es6-promise/" rel="nofollow noreferrer" target="_blank">谈谈 ES6 的 Promise 对象</a>。</p>
<h2 id="articleHeader2">Generators</h2>
<p>node 的著名开发者 TJ 利用 ES6 新特性生成器（Generators）开发了一个异步控制工具 <a href="https://github.com/tj/co" rel="nofollow noreferrer" target="_blank">co</a>。</p>
<p>如果不了解 Generators 可以看看以下的文章：</p>
<ul>
<li><p><a href="http://www.infoq.com/cn/articles/es6-in-depth-generators" rel="nofollow noreferrer" target="_blank">深入浅出ES6（三）：生成器 Generators</a></p></li>
<li><p><a href="http://www.infoq.com/cn/articles/es6-in-depth-generators-continued" rel="nofollow noreferrer" target="_blank">深入浅出ES6（十一）：生成器 Generators，续篇</a></p></li>
</ul>
<p>利用 co 可以将异步代码的写法写成类似同步代码的形式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const util = require('util')
const fs = require('fs')
const co = require('co')

const readFile = util.promisify(fs.readFile)

co(function* () {
  const txt = yield readFile('file1.txt', 'utf8')
  console.log(txt)
  const txt2 = yield readFile('file2.txt', 'utf8')
  console.log(txt2)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> util = <span class="hljs-built_in">require</span>(<span class="hljs-string">'util'</span>)
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>)
<span class="hljs-keyword">const</span> co = <span class="hljs-built_in">require</span>(<span class="hljs-string">'co'</span>)

<span class="hljs-keyword">const</span> readFile = util.promisify(fs.readFile)

co(<span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> txt = <span class="hljs-keyword">yield</span> readFile(<span class="hljs-string">'file1.txt'</span>, <span class="hljs-string">'utf8'</span>)
  <span class="hljs-built_in">console</span>.log(txt)
  <span class="hljs-keyword">const</span> txt2 = <span class="hljs-keyword">yield</span> readFile(<span class="hljs-string">'file2.txt'</span>, <span class="hljs-string">'utf8'</span>)
  <span class="hljs-built_in">console</span>.log(txt2)
})</code></pre>
<p>使用 Generators 的好似显然易见，可以使异步代码写得非常清晰，缺点就是要另外引入相关的库来利用该特性。</p>
<h2 id="articleHeader3">Async/Await</h2>
<p>node7.6 以上的版本引入了一个 ES7 的新特性 Async/Await 是专门用于控制异步代码。先看一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const util = require('util')
const fs = require('fs')

const readFile = util.promisify(fs.readFile)

async function readFiles () {
  const txt = await readFile('file1.txt', 'utf8')
  console.log(txt)
  const txt2 = await readFile('file2.txt', 'utf8')
  console.log(txt2)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> util = <span class="hljs-built_in">require</span>(<span class="hljs-string">'util'</span>)
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>)

<span class="hljs-keyword">const</span> readFile = util.promisify(fs.readFile)

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">readFiles</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> txt = <span class="hljs-keyword">await</span> readFile(<span class="hljs-string">'file1.txt'</span>, <span class="hljs-string">'utf8'</span>)
  <span class="hljs-built_in">console</span>.log(txt)
  <span class="hljs-keyword">const</span> txt2 = <span class="hljs-keyword">await</span> readFile(<span class="hljs-string">'file2.txt'</span>, <span class="hljs-string">'utf8'</span>)
  <span class="hljs-built_in">console</span>.log(txt2)
})</code></pre>
<p>首先要使用 <code>async</code> 关键字定义一个包含异步代码的函数，在 Promise 形式的异步函数前面使用 <code>await</code> 关键字就可以将异步写成同步操作的形式。</p>
<p>看上去与 Generators 控制方式相差不大，但是 Async/Await 是原生用于控制异步，所以是比较推荐使用的。</p>
<h2 id="articleHeader4">错误处理</h2>
<p>最后来探讨下四种异步控制方法的错误处理。</p>
<h3 id="articleHeader5">回调函数</h3>
<p>回调函数错误处理非常简单，就是在回调函数中同时回传错误信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fs = require('fs')

fs.readFile('file.txt', (err, data) => {
  if (err) {
    throw err
  }
  console.log(data)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>)

fs.readFile(<span class="hljs-string">'file.txt'</span>, (err, data) =&gt; {
  <span class="hljs-keyword">if</span> (err) {
    <span class="hljs-keyword">throw</span> err
  }
  <span class="hljs-built_in">console</span>.log(data)
})</code></pre>
<h3 id="articleHeader6">Promise</h3>
<p>Promise 在 <code>then</code> 方法之后使用一个 <code>catch</code> 方案来捕捉错误信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fs = require('fs')
const readFile = util.promisify(fs.readFile)

readFile('file.txt')
  .then(data => console.log(data))
  .catch(err => console.log(err))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>)
<span class="hljs-keyword">const</span> readFile = util.promisify(fs.readFile)

readFile(<span class="hljs-string">'file.txt'</span>)
  .then(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(data))
  .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(err))</code></pre>
<h3 id="articleHeader7">Generators 和 Async/Await</h3>
<p>Generators 和 Async/Await 比较类似，可以有两种方式，第一种使用 Promise 的 <code>catch</code> 方法，第二种用 <code>try</code> <code>catch</code> 关键字。</p>
<p><strong>Promise catch</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fs = require('fs')
const co = require('co')
const readFile = util.promisify(fs.readFile)

co(function* () {
  const data = yield readFile('file.txt').catch(err => console.log(err))
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>)
<span class="hljs-keyword">const</span> co = <span class="hljs-built_in">require</span>(<span class="hljs-string">'co'</span>)
<span class="hljs-keyword">const</span> readFile = util.promisify(fs.readFile)

co(<span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">yield</span> readFile(<span class="hljs-string">'file.txt'</span>).catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(err))
})</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fs = require('fs')
const co = require('co')
const readFile = util.promisify(fs.readFile)

async function testRead() {
  const data = await readFile('file.txt').catch(err => console.log(err))
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>)
<span class="hljs-keyword">const</span> co = <span class="hljs-built_in">require</span>(<span class="hljs-string">'co'</span>)
<span class="hljs-keyword">const</span> readFile = util.promisify(fs.readFile)

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testRead</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> readFile(<span class="hljs-string">'file.txt'</span>).catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(err))
}</code></pre>
<p><strong>try/catch</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fs = require('fs')
const co = require('co')
const readFile = util.promisify(fs.readFile)

co(function* () {
  try {
    const data = yield readFile('file.txt')
  } catch(err) {
    console.log(err)
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>)
<span class="hljs-keyword">const</span> co = <span class="hljs-built_in">require</span>(<span class="hljs-string">'co'</span>)
<span class="hljs-keyword">const</span> readFile = util.promisify(fs.readFile)

co(<span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">yield</span> readFile(<span class="hljs-string">'file.txt'</span>)
  } <span class="hljs-keyword">catch</span>(err) {
    <span class="hljs-built_in">console</span>.log(err)
  }
})</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fs = require('fs')
const readFile = util.promisify(fs.readFile)

async function testRead() {
  try {
    const data = await readFile('file.txt')
  } catch(err) {
    console.log(data)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>)
<span class="hljs-keyword">const</span> readFile = util.promisify(fs.readFile)

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testRead</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> readFile(<span class="hljs-string">'file.txt'</span>)
  } <span class="hljs-keyword">catch</span>(err) {
    <span class="hljs-built_in">console</span>.log(data)
  }
}</code></pre>
<p>感谢您的阅读，有不足之处请为我指出。</p>
<p><strong>参考</strong></p>
<ol>
<li><p><a href="http://blog.acwong.org/2015/06/22/es6-promise/" rel="nofollow noreferrer" target="_blank">谈谈 ES6 的 Promise 对象</a></p></li>
<li><p><a href="http://www.infoq.com/cn/articles/es6-in-depth-generators" rel="nofollow noreferrer" target="_blank">深入浅出ES6（三）：生成器 Generators</a></p></li>
<li><p><a href="http://www.infoq.com/cn/articles/es6-in-depth-generators-continued" rel="nofollow noreferrer" target="_blank">深入浅出ES6（十一）：生成器 Generators，续篇</a></p></li>
</ol>
<blockquote><p>本文同步于我的个人博客 <a href="http://blog.acwong.org/2017/06/24/javascript-async-programming/" rel="nofollow noreferrer" target="_blank">http://blog.acwong.org/2017/06/24/javascript-async-programming/</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 异步编程的四种方式

## 原文链接
[https://segmentfault.com/a/1190000009954735](https://segmentfault.com/a/1190000009954735)

