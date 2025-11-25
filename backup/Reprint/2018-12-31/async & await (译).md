---
title: 'async & await (译)' 
date: 2018-12-31 2:30:30
hidden: true
slug: j4f1mt7tunh
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://davidwalsh.name/promises" rel="nofollow noreferrer" target="_blank">JavaScript Promises</a>的出现，让我们可以走出回调地狱，着实惊艳。Promises 允许我们更好的引入和处理异步任务，虽然如此，但引入好多的 <code>then</code> 还是会让代码变的混乱。我已经开始使用 ES2017 里的 <code>async</code> 和 <code>await</code> 关键字来简化 promises 的处理。让我们一睹 <code>async</code> 和 <code>await</code> 的风采！</p>
<h2 id="articleHeader0">快速入门</h2>
<ul>
<li>
<code>async</code> 是函数声明的关键字</li>
<li>
<code>await</code> 用于 promises 处理过程中</li>
<li>
<code>await</code> 必须用在 <code>async</code> 声明的函数内部，虽然 Chrome 已经支持“顶级的”的 <code>await</code>
</li>
<li>
<code>async</code> 函数返回 promises 对象，不关心函数的返回值是什么</li>
<li>
<code>async/await</code> 和 promises 的底层实现是一样的</li>
<li>大多数浏览器和 Nodejs 已经可用</li>
</ul>
<h2 id="articleHeader1">
<code>async</code> 和 <code>await</code> 的好处</h2>
<ul>
<li>代码更加清晰简洁</li>
<li>更少的回调，调试更加简单</li>
<li>容易从 promises 中的 <code>then / catch</code> 转换</li>
<li>代码看起来自上而下，更少的缩进。</li>
</ul>
<h2 id="articleHeader2">
<code>async</code> 和 <code>await</code> 简介</h2>
<p>从实例入手要更简单，我们先来看一个简单的 <code>async/await</code> 的使用方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 使用 async 定义函数，然后 await 才能使用
async function fetchContent() {
  // Instead of using fetch().then, use await
  let content = await fetch('/');
  let text = await content.text();
  
  // async 函数内，text 是响应值
  console.log(text);

  // Resolve this async function with the text
  return text;
}

// Use the async function
var promise = fetchContent().then(...);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 使用 async 定义函数，然后 await 才能使用</span>
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">fetchContent</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// Instead of using fetch().then, use await</span>
  <span class="hljs-keyword">let</span> content = <span class="hljs-keyword">await</span> fetch(<span class="hljs-string">'/'</span>);
  <span class="hljs-keyword">let</span> text = <span class="hljs-keyword">await</span> content.text();
  
  <span class="hljs-comment">// async 函数内，text 是响应值</span>
  <span class="hljs-built_in">console</span>.log(text);

  <span class="hljs-comment">// Resolve this async function with the text</span>
  <span class="hljs-keyword">return</span> text;
}

<span class="hljs-comment">// Use the async function</span>
<span class="hljs-keyword">var</span> promise = fetchContent().then(...);</code></pre>
<p>首先使用 <code>async</code> 声明函数；声明之后，<code>await</code> 可以用在该函数内部。<code>await</code> 关键字后面跟 promise：<a href="https://davidwalsh.name/fetch" rel="nofollow noreferrer" target="_blank"><code>fetch API</code></a>。异步任务（在这个例子是 <code>fetch</code>）执行之后，一直在执行完成才继续下一个任务（并没有产生阻塞）。最后这个函数处理了返回值并且返回了一个 promises 对象。</p>
<p>代码自上而下，告别回调，异步处理变的更加简单！</p>
<h2 id="articleHeader3">转换 Promise 为 <code>await</code>
</h2>
<p>当时间允许，你一定很想将你的 promise 的代码升级到 <code>await</code>，让我们看下该怎么做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Before: callback city!
fetch('/users.json')
  .then(response => response.json())
  .then(json => {
    console.log(json);
  })
  .catch(e => { console.log('error!'); })

// After: no more callbacks!
async function getJson() {
  try {
    let response = await fetch('/users.json');
    let json = await response.json();
    console.log(json);
  }
  catch(e) {
    console.log('Error!', e);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Before: callback city!</span>
fetch(<span class="hljs-string">'/users.json'</span>)
  .then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> response.json())
  .then(<span class="hljs-function"><span class="hljs-params">json</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log(json);
  })
  .catch(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> { <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'error!'</span>); })

<span class="hljs-comment">// After: no more callbacks!</span>
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getJson</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">let</span> response = <span class="hljs-keyword">await</span> fetch(<span class="hljs-string">'/users.json'</span>);
    <span class="hljs-keyword">let</span> json = <span class="hljs-keyword">await</span> response.json();
    <span class="hljs-built_in">console</span>.log(json);
  }
  <span class="hljs-keyword">catch</span>(e) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Error!'</span>, e);
  }
}</code></pre>
<p>从使用多个 <code>then</code> 到 <code>await</code> 十分简单，但你的代码的维护性变得很高。</p>
<h2 id="articleHeader4">
<code>async</code> / <code>await</code> 模式</h2>
<p>声明 <code>async</code> 函数有以下方式：</p>
<h3 id="articleHeader5">匿名 Async 函数</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let main = (async function() {
  let value = await fetch('/');
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> main = (<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> value = <span class="hljs-keyword">await</span> fetch(<span class="hljs-string">'/'</span>);
})();</code></pre>
<h3 id="articleHeader6">Async 函数声明</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function main() {
  let value = await fetch('/');
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> value = <span class="hljs-keyword">await</span> fetch(<span class="hljs-string">'/'</span>);
};</code></pre>
<h3 id="articleHeader7">Async 函数赋值</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let main = async function() {
  let value = await fetch('/');
};

// Arrow functions too!
let main = async () => {
  let value = await fetch('/');
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> main = <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> value = <span class="hljs-keyword">await</span> fetch(<span class="hljs-string">'/'</span>);
};

<span class="hljs-comment">// Arrow functions too!</span>
<span class="hljs-keyword">let</span> main = <span class="hljs-keyword">async</span> () =&gt; {
  <span class="hljs-keyword">let</span> value = <span class="hljs-keyword">await</span> fetch(<span class="hljs-string">'/'</span>);
};</code></pre>
<h3 id="articleHeader8">Async 函数作为参数</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.body.addEventListener('click', async function() {
  let value = await fetch('/');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-built_in">document</span>.body.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> value = <span class="hljs-keyword">await</span> fetch(<span class="hljs-string">'/'</span>);
});</code></pre>
<h3 id="articleHeader9">对象和类方法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Object property
let obj = {
  async method() {
    let value = await fetch('/');
  }
};

// Class methods
class MyClass {
  async myMethod() {
    let value = await fetch('/');
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Object property</span>
<span class="hljs-keyword">let</span> obj = {
  <span class="hljs-keyword">async</span> method() {
    <span class="hljs-keyword">let</span> value = <span class="hljs-keyword">await</span> fetch(<span class="hljs-string">'/'</span>);
  }
};

<span class="hljs-comment">// Class methods</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyClass</span> </span>{
  <span class="hljs-keyword">async</span> myMethod() {
    <span class="hljs-keyword">let</span> value = <span class="hljs-keyword">await</span> fetch(<span class="hljs-string">'/'</span>);
  }
}</code></pre>
<p>正如你看到的，增加 <code>async</code> 函数十分简单，而且能很好的适用各种函数创建的流程。</p>
<h2 id="articleHeader10">错误处理</h2>
<p>传统的 promises 允许使用 <code>catch</code> 回调处理 rejection，当你使用 <code>await</code>，最好使用 <code>try/catch</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="try {
  let x = await myAsyncFunction();
}
catch(e) {
 // Error!
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">try</span> {
  <span class="hljs-keyword">let</span> x = <span class="hljs-keyword">await</span> myAsyncFunction();
}
<span class="hljs-keyword">catch</span>(e) {
 <span class="hljs-comment">// Error!</span>
}</code></pre>
<p>老式的 <code>try/catch</code> 不如 promises 的 <code>catch</code> 优雅，但在这里，它很给力！</p>
<h2 id="articleHeader11">并行</h2>
<p>Google 的Jake Archibald在<a href="https://developers.google.com/web/fundamentals/getting-started/primers/async-functions" rel="nofollow noreferrer" target="_blank">Async functions document</a>中提出了一个完美的观点：不要用 <code>await</code> 使得任务变的太序列化。也就是说对于可以同时执行的任务，先触发任务然后再使用 <code>await</code>，而不是直接使用 <code>await</code> 使得任务像堆栈式一样的存储。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Will take 1000ms total!
async function series() {
  await wait(500);
  await wait(500);
  return &quot;done!&quot;;
}

// Would take only 500ms total!
async function parallel() {
  const wait1 = wait(500);
  const wait2 = wait(500);
  await wait1;
  await wait2;
  return &quot;done!&quot;;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Will take 1000ms total!</span>
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">series</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">await</span> wait(<span class="hljs-number">500</span>);
  <span class="hljs-keyword">await</span> wait(<span class="hljs-number">500</span>);
  <span class="hljs-keyword">return</span> <span class="hljs-string">"done!"</span>;
}

<span class="hljs-comment">// Would take only 500ms total!</span>
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">parallel</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> wait1 = wait(<span class="hljs-number">500</span>);
  <span class="hljs-keyword">const</span> wait2 = wait(<span class="hljs-number">500</span>);
  <span class="hljs-keyword">await</span> wait1;
  <span class="hljs-keyword">await</span> wait2;
  <span class="hljs-keyword">return</span> <span class="hljs-string">"done!"</span>;
}</code></pre>
<p>第一个代码块反面例子，第二个 <code>await</code> 需要等待第一个 <code>await</code> 执行完毕后才执行，第二个代码块是一个更好的方法，同时触发了两个任务，然后才使用 <code>await</code>；这样做可以使得多个异步操作同时执行！</p>
<h2 id="articleHeader12">
<code>Promise.all</code> 等价方式</h2>
<p>Primises API 中我最爱的 API 之一就是 <code>Promise.all</code>：当多有任务完成后才会触发回调。<code>async / await</code> 中没有等价的操作，但是<a href="https://medium.com/@bluepnume/learn-about-promises-before-you-start-using-async-await-eb148164a9c8" rel="nofollow noreferrer" target="_blank">这篇文章</a>提供了一个很好的解决方案：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let [foo, bar] = await Promise.all([getFoo(), getBar()]);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> [foo, bar] = <span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>.all([getFoo(), getBar()]);</code></pre>
<p>请记住，<code>async / await</code>和 promises 在底层实现上是一致的，所以我们可以简单的等待（await）所有的 promises 任务结束!</p>
<p>现在大多数浏览器都可以使用 <code>async</code> 和 <code>await</code>，Nodejs 一样可用，老版本的Nodejs可以使用 <a href="https://babeljs.io/docs/plugins/transform-async-to-generator/" rel="nofollow noreferrer" target="_blank">transform-async-to-generator</a> 这个 babel 插件来使用 <code>async</code> 和 <code>await</code>。Promises 依然很棒，但 <code>async</code> 和 <code>await</code> 使得它可维护性更好。</p>
<p>原文地址：<a href="https://davidwalsh.name/async-await" rel="nofollow noreferrer" target="_blank">https://davidwalsh.name/async...</a></p>
<p>博客原地址：<a href="http://zhaojizong.online/posts/2017/09/14/async-and-await/" rel="nofollow noreferrer" target="_blank">http://zhaojizong.online/post...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
async & await (译)

## 原文链接
[https://segmentfault.com/a/1190000011173341](https://segmentfault.com/a/1190000011173341)

