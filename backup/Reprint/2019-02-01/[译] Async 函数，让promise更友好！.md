---
title: '[译] Async 函数，让promise更友好！' 
date: 2019-02-01 2:30:10
hidden: true
slug: b7z3v67372b
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>
<p><a href="https://developers.google.com/web/fundamentals/getting-started/primers/async-functions?utm_source=javascriptweekly&amp;utm_medium=email" rel="nofollow noreferrer" target="_blank">原文链接</a></p>
<p>另，断断续续<a href="https://github.com/kraaas/blog/blob/master/2016-11/Async%20%E5%87%BD%E6%95%B0%EF%BC%8C%E8%AE%A9promise%E6%9B%B4%E5%8F%8B%E5%A5%BD" rel="nofollow noreferrer" target="_blank">翻译了好几天</a>，在发表的时候去搜索了下有没人翻译了，因为这确实是篇好文章。还真有：<a href="http://www.zcfy.cc/article/async-functions-making-promises-friendly-1566.html?hmsr=toutiao.io&amp;utm_medium=toutiao.io&amp;utm_source=toutiao.io" rel="nofollow noreferrer" target="_blank">文章链接</a>，看了下，这篇翻译的专业些，大家可以去看看。</p>
</blockquote>
<p>Async 函数是一个非常了不起的东西，它将会在<code>Chrome 55</code>中得到默认支持。它允许你书写基于<code>promise</code>的代码，但它看起来就跟同步的代码一样，而且不会阻塞主线程。所以，它让你的异步代码看起来并没有那么"聪明"却更具有可读性。   </p>
<p>Async 函数的代码示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function myFirstAsyncFunction() {
  try {
    const fulfilledValue = await promise;
  }
  catch (rejectedValue) {
    // …
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">myFirstAsyncFunction</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">const</span> fulfilledValue = <span class="hljs-keyword">await</span> promise;
  }
  <span class="hljs-keyword">catch</span> (rejectedValue) {
    <span class="hljs-comment">// …</span>
  }
}</code></pre>
<p>如果你在一个函数声明的的前面使用<code>async</code>关键字，那你就可以在这个函数内使用<code>await</code>。当你去<code>await</code>一个<code>promise</code>的时候，这个函数将会以非阻塞的方式暂停，直到<code>promise</code>处于<code>settled</code>状态。如果这个<code>Promise</code>返回的是成功的状态，你将会得到返回值，如果返回的是失败的状态，那失败的信息将会被抛出。</p>
<blockquote><p><img src="https://static.alili.techundefined" class="emoji" alt="star" title="star"> 提示: 如果你对<code>promises</code>不熟悉，请查看我们的<a href="https://developers.google.com/web/fundamentals/getting-started/primers/promises" rel="nofollow noreferrer" target="_blank">promises指南</a></p></blockquote>
<h3 id="articleHeader0">示例1： 打印响应信息</h3>
<p>假设我们想要请求一个URL然后把响应信息打印出来，下面是使用<code>promise</code>的示例代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function logFetch(url) {
  return fetch(url)
    .then(response => response.text())
    .then(text => {
      console.log(text);
    }).catch(err => {
      console.error('fetch failed', err);
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">logFetch</span>(<span class="hljs-params">url</span>) </span>{
  <span class="hljs-keyword">return</span> fetch(url)
    .then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> response.text())
    .then(<span class="hljs-function"><span class="hljs-params">text</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(text);
    }).catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> {
      <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'fetch failed'</span>, err);
    });
}</code></pre>
<p>下面用<code>async</code> 函数来实现同样的功能：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function logFetch(url) {
  try {
    const response = await fetch(url);
    console.log(await response.text());
  }
  catch (err) {
    console.log('fetch failed', err);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">logFetch</span>(<span class="hljs-params">url</span>) </span>{
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> fetch(url);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">await</span> response.text());
  }
  <span class="hljs-keyword">catch</span> (err) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'fetch failed'</span>, err);
  }
}</code></pre>
<p>可以看到代码行数和上例一样，但是使用<code>async</code>函数的方式使得所有的回调函数都不见了！这让我们的代码非常容易阅读，特别是那些对<code>promise</code>不是特别熟悉的同学。</p>
<blockquote><p><img src="https://static.alili.techundefined" class="emoji" alt="star" title="star"> 提示: 你<code>await</code>的任何值都是通过<code>Promise.resolve()</code>来传递的，所以你可以安全地使用非本地的<code>promise</code>.</p></blockquote>
<h3 id="articleHeader1">Async 函数的返回值</h3>
<p>不管你是否在函数内部使用了<code>await</code>, <code>Async</code> 函数总是返回一个<code>promise</code> 。当 <code>async</code>函数显示滴返回任意值时,返回的<code>promise</code>将会调用<code>resolve</code>方法, 当<code>async</code>函数抛出异常错误时，返回的<code>promise</code>将会调用<code>reject</code>方法，所以：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// wait ms milliseconds
function wait(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function hello() {
  await wait(500);
  return 'world';
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// wait ms milliseconds</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">wait</span>(<span class="hljs-params">ms</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">r</span> =&gt;</span> setTimeout(r, ms));
}

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">hello</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">await</span> wait(<span class="hljs-number">500</span>);
  <span class="hljs-keyword">return</span> <span class="hljs-string">'world'</span>;
}</code></pre>
<p>当执行<code>hello()</code>时，返回一个成功状态，并且传递的值为<code>world</code>的<code>promise</code>.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function foo() {
  await wait(500);
  throw Error('bar');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">await</span> wait(<span class="hljs-number">500</span>);
  <span class="hljs-keyword">throw</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'bar'</span>);
}</code></pre>
<p>当执行<code>foo()</code>时，返回一个失败状态，并且传递的值为<code>Error('bar')</code>的<code>promise</code>.</p>
<h3 id="articleHeader2">示例2： 响应流</h3>
<p>在更复杂点的案例中, <code>async</code>函数更能体现其优越性。假设我们想要在记录<code>chunks</code>数据时将其变成响应流， 并返回最终的信息长度。</p>
<blockquote><p><img src="https://static.alili.techundefined" class="emoji" alt="star" title="star"> 提示: "记录<code>chunks</code>" 让我感觉很别扭.</p></blockquote>
<p>下面是使用<code>promise</code>的方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getResponseSize(url) {
  return fetch(url).then(response => {
    const reader = response.body.getReader();
    let total = 0;

    return reader.read().then(function processResult(result) {
      if (result.done) return total;

      const value = result.value;
      total += value.length;
      console.log('Received chunk', value);

      return reader.read().then(processResult);
    })
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getResponseSize</span>(<span class="hljs-params">url</span>) </span>{
  <span class="hljs-keyword">return</span> fetch(url).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> reader = response.body.getReader();
    <span class="hljs-keyword">let</span> total = <span class="hljs-number">0</span>;

    <span class="hljs-keyword">return</span> reader.read().then(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">processResult</span>(<span class="hljs-params">result</span>) </span>{
      <span class="hljs-keyword">if</span> (result.done) <span class="hljs-keyword">return</span> total;

      <span class="hljs-keyword">const</span> value = result.value;
      total += value.length;
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Received chunk'</span>, value);

      <span class="hljs-keyword">return</span> reader.read().then(processResult);
    })
  });
}</code></pre>
<p>看清楚了，我是 promise “地下党” Jake Archibald。看到我是怎样在它内部调用 processResult 并建立异步循环的了吗？这样写让我觉得自己“很聪明”。但是正如大多数“聪明的”代码一样，你不得不盯着它看很久才能搞清楚它在做什么，就像九十年代的那些魔眼照片一样。<a href="http://www.zcfy.cc/article/async-functions-making-promises-friendly-1566.html?hmsr=toutiao.io&amp;utm_medium=toutiao.io&amp;utm_source=toutiao.io" rel="nofollow noreferrer" target="_blank">引用</a></p>
<p>让我们用<code>async</code>函数来重写上面的功能：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function getResponseSize(url) {
  const response = await fetch(url);
  const reader = response.body.getReader();
  let result = await reader.read();
  let total = 0;

  while (!result.done) {
    const value = result.value;
    total += value.length;
    console.log('Received chunk', value);
    // get the next result
    result = await reader.read();
  }

  return total;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getResponseSize</span>(<span class="hljs-params">url</span>) </span>{
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> fetch(url);
  <span class="hljs-keyword">const</span> reader = response.body.getReader();
  <span class="hljs-keyword">let</span> result = <span class="hljs-keyword">await</span> reader.read();
  <span class="hljs-keyword">let</span> total = <span class="hljs-number">0</span>;

  <span class="hljs-keyword">while</span> (!result.done) {
    <span class="hljs-keyword">const</span> value = result.value;
    total += value.length;
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Received chunk'</span>, value);
    <span class="hljs-comment">// get the next result</span>
    result = <span class="hljs-keyword">await</span> reader.read();
  }

  <span class="hljs-keyword">return</span> total;
}</code></pre>
<p>所有的"聪明"的代码都不见了。现在新的异步循环使用了可靠的，看起来普通的<code>while</code>循环来代替，这使我感觉非常的整洁。更多的是，在将来，我们将会使用<a href="https://github.com/tc39/proposal-async-iteration" rel="nofollow noreferrer" target="_blank">async iterators</a>,它将会使用<code>for of</code>循环来代替<code>while</code>循环，那这讲会变得更加整洁！</p>
<blockquote><p><img src="https://static.alili.techundefined" class="emoji" alt="star" title="star"> 提示:  我对<code>streams</code>比较有好感。如果你对<code>streams</code>不太熟悉，可以看看我的<a href="https://jakearchibald.com/2016/streams-ftw/#streams-the-fetch-api" rel="nofollow noreferrer" target="_blank">指南</a></p></blockquote>
<h3 id="articleHeader3">Async 函数的其他语法</h3>
<p>我们已经看过了<code>async function() {} </code>的使用方式，但是<code>async</code>关键字还可以用于其他的函数语法中。</p>
<h5>箭头函数</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// map some URLs to json-promises
const jsonPromises = urls.map(async url => {
  const response = await fetch(url);
  return response.json();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// map some URLs to json-promises</span>
<span class="hljs-keyword">const</span> jsonPromises = urls.map(<span class="hljs-keyword">async</span> url =&gt; {
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> fetch(url);
  <span class="hljs-keyword">return</span> response.json();
});</code></pre>
<blockquote><p><img src="https://static.alili.techundefined" class="emoji" alt="star" title="star"> 提示: <code> array.map(func)</code>不会在乎你给的是否是<code>async</code>函数，它只会把它当做一个返回值是<code>promise</code>的普通函数。所以，第二个回调的执行并不会等待第一个回调中的<code>await</code>处理完成。</p></blockquote>
<h5>对象方法</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const storage = {
  async getAvatar(name) {
    const cache = await caches.open('avatars');
    return cache.match(`/avatars/${name}.jpg`);
  }
};

storage.getAvatar('jaffathecake').then(…);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> storage = {
  <span class="hljs-keyword">async</span> getAvatar(name) {
    <span class="hljs-keyword">const</span> cache = <span class="hljs-keyword">await</span> caches.open(<span class="hljs-string">'avatars'</span>);
    <span class="hljs-keyword">return</span> cache.match(<span class="hljs-string">`/avatars/<span class="hljs-subst">${name}</span>.jpg`</span>);
  }
};

storage.getAvatar(<span class="hljs-string">'jaffathecake'</span>).then(…);</code></pre>
<h5>类方法</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Storage {
  constructor() {
    this.cachePromise = caches.open('avatars');
  }

  async getAvatar(name) {
    const cache = await this.cachePromise;
    return cache.match(`/avatars/${name}.jpg`);
  }
}

const storage = new Storage();
storage.getAvatar('jaffathecake').then(…);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Storage</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">this</span>.cachePromise = caches.open(<span class="hljs-string">'avatars'</span>);
  }

  <span class="hljs-keyword">async</span> getAvatar(name) {
    <span class="hljs-keyword">const</span> cache = <span class="hljs-keyword">await</span> <span class="hljs-keyword">this</span>.cachePromise;
    <span class="hljs-keyword">return</span> cache.match(<span class="hljs-string">`/avatars/<span class="hljs-subst">${name}</span>.jpg`</span>);
  }
}

<span class="hljs-keyword">const</span> storage = <span class="hljs-keyword">new</span> Storage();
storage.getAvatar(<span class="hljs-string">'jaffathecake'</span>).then(…);</code></pre>
<blockquote><p><img src="https://static.alili.techundefined" class="emoji" alt="star" title="star"> 提示: 类的 <code>constructors</code>和<code>getters/settings</code>不能是 <code>async</code> 函数。</p></blockquote>
<h3 id="articleHeader4">注意！请避免太过强调顺序</h3>
<p>尽管你正在写的代码看起来是同步的，但请确保你没有错失并行处理的机会。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function series() {
  await wait(500);
  await wait(500);
  return &quot;done!&quot;;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">series</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">await</span> wait(<span class="hljs-number">500</span>);
  <span class="hljs-keyword">await</span> wait(<span class="hljs-number">500</span>);
  <span class="hljs-keyword">return</span> <span class="hljs-string">"done!"</span>;
}</code></pre>
<p>上面的代码需要 <code>1000ms</code>才能完成，然而：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function parallel() {
 const wait1 = wait(500);
 const wait2 = wait(500);
 await wait1;
 await wait2;
 return &quot;done!&quot;;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">parallel</span>(<span class="hljs-params"></span>) </span>{
 <span class="hljs-keyword">const</span> wait1 = wait(<span class="hljs-number">500</span>);
 <span class="hljs-keyword">const</span> wait2 = wait(<span class="hljs-number">500</span>);
 <span class="hljs-keyword">await</span> wait1;
 <span class="hljs-keyword">await</span> wait2;
 <span class="hljs-keyword">return</span> <span class="hljs-string">"done!"</span>;
}</code></pre>
<p>上面的代码只需要<code>500ms</code>，因为两个<code>wait</code>在同一时间处理了。</p>
<h3 id="articleHeader5">示例3： 顺序输出请求信息</h3>
<p>假设我们想要获取一系列的URL响应信息，并将它们尽可能快的按正确的顺序打印出来。  <br>深呼吸....下面就是使用<code>promise</code>来实现的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function logInOrder(urls) {
  // fetch all the URLs
  const textPromises = urls.map(url => {
    return fetch(url).then(response => response.text());
  });

  // log them in order
  textPromises.reduce((chain, textPromise) => {
    return chain.then(() => textPromise)
      .then(text => console.log(text));
  }, Promise.resolve());
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">logInOrder</span>(<span class="hljs-params">urls</span>) </span>{
  <span class="hljs-comment">// fetch all the URLs</span>
  <span class="hljs-keyword">const</span> textPromises = urls.map(<span class="hljs-function"><span class="hljs-params">url</span> =&gt;</span> {
    <span class="hljs-keyword">return</span> fetch(url).then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> response.text());
  });

  <span class="hljs-comment">// log them in order</span>
  textPromises.reduce(<span class="hljs-function">(<span class="hljs-params">chain, textPromise</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> chain.then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> textPromise)
      .then(<span class="hljs-function"><span class="hljs-params">text</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(text));
  }, <span class="hljs-built_in">Promise</span>.resolve());
}</code></pre>
<p>Yeah, 这达到了目的。我正在用<code>reduce</code>来处理一串的<code>promise</code>，我太"聪明"了。这是一个如此"聪明"的代码，但我们最好不要这样做。</p>
<p>但是，当把上面的代码转换成使用 <code>async</code>函数来实现时，它看起来太有顺序了，以至于会使我们很迷惑：  </p>
<p><strong>:-1:  不推荐</strong> - 过于强调先后顺序</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function logInOrder(urls) {
  for (const url of urls) {
    const response = await fetch(url);
    console.log(await response.text());
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">logInOrder</span>(<span class="hljs-params">urls</span>) </span>{
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> url <span class="hljs-keyword">of</span> urls) {
    <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> fetch(url);
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">await</span> response.text());
  }
}</code></pre>
<p>看起来整洁多了，但是我的第二个请求只有在第一个请求被完全处理完成之后才会发出去，以此类推。这个比上面那个<code>promise</code>的实例慢多了。幸好这还有一个中立的方案：  </p>
<p><strong>:+1:  推荐</strong> - 很好而且并行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function logInOrder(urls) {
  // fetch all the URLs in parallel
  const textPromises = urls.map(async url => {
    const response = await fetch(url);
    return response.text();
  });

  // log them in sequence
  for (const textPromise of textPromises) {
    console.log(await textPromise);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">logInOrder</span>(<span class="hljs-params">urls</span>) </span>{
  <span class="hljs-comment">// fetch all the URLs in parallel</span>
  <span class="hljs-keyword">const</span> textPromises = urls.map(<span class="hljs-keyword">async</span> url =&gt; {
    <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> fetch(url);
    <span class="hljs-keyword">return</span> response.text();
  });

  <span class="hljs-comment">// log them in sequence</span>
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> textPromise <span class="hljs-keyword">of</span> textPromises) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">await</span> textPromise);
  }
}</code></pre>
<p>在这个例子中，全部的url一个接一个被请求和处理，但是那个'聪明的'的<code>reduce</code>被标准的，普通的和更具可读性的<code>for loop</code> 循环取代了。</p>
<h3 id="articleHeader6">浏览器兼容性和解决方法</h3>
<p>在我写这篇文章时，<code>Chrome 55</code>已经默认支持<code>async</code> 函数。但是在所有主流浏览器中，它还在开发中：</p>
<ul>
<li><p>Edge - <a href="https://developer.microsoft.com/en-us/microsoft-edge/platform/status/asyncfunctions/" rel="nofollow noreferrer" target="_blank">In build 14342+ behind a flag</a></p></li>
<li><p>Firefox - <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1185106" rel="nofollow noreferrer" target="_blank">active development</a></p></li>
<li><p>Safari - <a href="https://bugs.webkit.org/show_bug.cgi?id=156147" rel="nofollow noreferrer" target="_blank">active development</a></p></li>
</ul>
<h4>解决方法 1：Generators</h4>
<p>所有的主流浏览器的最新版本都支持<code>generators</code>，如果你正在使用它们，你可以稍稍<code>polyfill</code>一下 <code>async</code>函数.</p>
<p><code>Babel</code>正可以为你做这些事情，<a href="https://goo.gl/0Cg1Sq" rel="nofollow noreferrer" target="_blank">这里有个通过<code>Babel REPL</code>写的示例</a> - 是不是感觉对转换后的代码很熟悉。这个转换机制是<a href="http://babeljs.io/docs/plugins/preset-es2017/" rel="nofollow noreferrer" target="_blank"> Babel's es2017 preset</a>的一部分。</p>
<blockquote><p><img src="https://static.alili.techundefined" class="emoji" alt="star" title="star"> 提示: <code>Babel REPL</code>是一个很有趣的东西，试试吧。</p></blockquote>
<p>我建议你现在就这样做，因为当你的目标浏览器支持了<code>async</code>函数时，你只需要将<code>Babel</code>从你的项目中去除即可。但是如果你真的不想使用转换工具，你可以使用<a href="https://gist.github.com/jakearchibald/edbc78f73f7df4f7f3182b3c7e522d25" rel="nofollow noreferrer" target="_blank">Babel's polyfill</a><button class="btn btn-xs btn-default ml10 preview" data-url="jakearchibald/edbc78f73f7df4f7f3182b3c7e522d25" data-typeid="1">点击预览</button>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function slowEcho(val) {
  await wait(1000);
  return val;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">slowEcho</span>(<span class="hljs-params">val</span>) </span>{
  <span class="hljs-keyword">await</span> wait(<span class="hljs-number">1000</span>);
  <span class="hljs-keyword">return</span> val;
}</code></pre>
<p>当你使用了上面说的<a href="https://gist.github.com/jakearchibald/edbc78f73f7df4f7f3182b3c7e522d25" rel="nofollow noreferrer" target="_blank">polyfill</a><button class="btn btn-xs btn-default ml10 preview" data-url="jakearchibald/edbc78f73f7df4f7f3182b3c7e522d25" data-typeid="1">点击预览</button>,你可以将上面的代码替换为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const slowEcho = createAsyncFunction(function*(val) {
  yield wait(1000);
  return val;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> slowEcho = createAsyncFunction(<span class="hljs-function"><span class="hljs-keyword">function</span>*(<span class="hljs-params">val</span>) </span>{
  <span class="hljs-keyword">yield</span> wait(<span class="hljs-number">1000</span>);
  <span class="hljs-keyword">return</span> val;
});</code></pre>
<p>注意到你通过给<code>createAsyncFunction</code>函数传递了一个<code>generator</code> <code>(function*)</code>,然后使用<code>yield</code> 代替 <code>await</code>。除此之外它们的效果一样。</p>
<h4>解决方法2： regenerator</h4>
<p>如果你想要兼容旧的浏览器，<code>Babel</code>同样也能把<code>generators</code>给转换了，这样你就可以在IE8以上的浏览器中使用<code>async</code>函数，但你需要使用<code>Babel</code>的 <a href="http://babeljs.io/docs/plugins/preset-es2017/" rel="nofollow noreferrer" target="_blank">es2017 preset</a>和 <a href="http://babeljs.io/docs/plugins/preset-es2015/" rel="nofollow noreferrer" target="_blank">the es2015 preset</a></p>
<p>你会看到<a href="https://goo.gl/jlXboV" rel="nofollow noreferrer" target="_blank">转换后的代码</a>并不好看，所以请小心代码膨胀。</p>
<h3 id="articleHeader7">Async all the things!</h3>
<p>一旦所有浏览器都支持<code>async</code>函数了，请在所有返回值是<code>promise</code>的函数上使用<code>async</code>！因为它不仅可以使你的代码更<code>tider</code>， 而且它确保了<code>async</code>函数 总是返回一个 <code>promise</code> 。</p>
<p><a href="https://jakearchibald.com/2014/es7-async-functions/" rel="nofollow noreferrer" target="_blank">回到 2014 年</a>,我对<code>async</code>函数的出现感到非常激动, 现在很高兴看到它们在浏览器中被支持了。Whoop!</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译] Async 函数，让promise更友好！

## 原文链接
[https://segmentfault.com/a/1190000007368701](https://segmentfault.com/a/1190000007368701)

