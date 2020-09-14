---
title: '【js】async和await使用' 
date: 2019-01-28 2:30:09
hidden: true
slug: oy7jchnpqu
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>摘自<a href="http://es6.ruanyifeng.com/#docs/async#co" rel="nofollow noreferrer" target="_blank">http://es6.ruanyifeng.com/#docs/async#co模块</a></p></blockquote>
<h3 id="articleHeader0">关于<code>async</code>和<code>await</code>使用</h3>
<p>个人理解：在每一个函数前面的都加上<code>async</code>，函数内部，如果是异步操作，直接在其前面加上<code>await</code>即可，等待一步函数执行的结果。<code>await</code>后面可以接任何变量，可以是常量或者<code>promise</code>。<code>async</code>修饰的函数自动变成一个<code>promise</code>.正常情况下，await命令后面是一个 Promise 对象。如果不是，会被转成一个立即resolve的 Promise 对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//经过async修饰之后，自动变成promise对象
async function f() {
  return 'hello world';
}

f().then(v => console.log(v))
// &quot;hello world&quot;

async function f() {
  return await 123;
}

f().then(v => console.log(v))
// 123
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//经过async修饰之后，自动变成promise对象</span>
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">'hello world'</span>;
}

f().then(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(v))
<span class="hljs-comment">// "hello world"</span>

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">await</span> <span class="hljs-number">123</span>;
}

f().then(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(v))
<span class="hljs-comment">// 123</span>
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//错误处理 
async function f() {
  throw new Error('出错了');
}

f().then(
  v => console.log(v),
  e => console.log(e)
)
// Error: 出错了" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">//错误处理 </span>
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'出错了'</span>);
}

f().then(
  <span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(v),
  <span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(e)
)
<span class="hljs-comment">// Error: 出错了</span></code></pre>
<h4>
<code>async</code>中错误处理</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//使用catch捕捉错误
async function f() {
  await Promise.reject('出错了');
}

f()
.then(v => console.log(v))
.catch(e => console.log(e))
// 出错了" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//使用catch捕捉错误</span>
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>.reject(<span class="hljs-string">'出错了'</span>);
}

f()
.then(<span class="hljs-function"><span class="hljs-params">v</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(v))
.catch(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(e))
<span class="hljs-comment">// 出错了</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function main() {
  try {
    var val1 = await firstStep();
    var val2 = await secondStep(val1);
    var val3 = await thirdStep(val1, val2);

    console.log('Final: ', val3);
  }
  catch (err) {
    console.error(err);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">var</span> val1 = <span class="hljs-keyword">await</span> firstStep();
    <span class="hljs-keyword">var</span> val2 = <span class="hljs-keyword">await</span> secondStep(val1);
    <span class="hljs-keyword">var</span> val3 = <span class="hljs-keyword">await</span> thirdStep(val1, val2);

    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Final: '</span>, val3);
  }
  <span class="hljs-keyword">catch</span> (err) {
    <span class="hljs-built_in">console</span>.error(err);
  }
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//使用async控制指定时间打印
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value)
}

asyncPrint('hello world', 50);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//使用async控制指定时间打印</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">timeout</span>(<span class="hljs-params">ms</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> {
    setTimeout(resolve, ms);
  });
}

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">asyncPrint</span>(<span class="hljs-params">value, ms</span>) </span>{
  <span class="hljs-keyword">await</span> timeout(ms);
  <span class="hljs-built_in">console</span>.log(value)
}

asyncPrint(<span class="hljs-string">'hello world'</span>, <span class="hljs-number">50</span>);
</code></pre>
<h4>多种形式</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const foo = async function(){}
async function foo(){}
const foo = async () => {};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> foo = <span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{}
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params"></span>)</span>{}
<span class="hljs-keyword">const</span> foo = <span class="hljs-keyword">async</span> () =&gt; {};</code></pre>
<h4>并发处理</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let foo = await getFoo();
let bar = await getBar();
//======================
// 写法一
let [foo, bar] = await Promise.all([getFoo(), getBar()]);

// 写法二
let fooPromise = getFoo();
let barPromise = getBar();
let foo = await fooPromise;
let bar = await barPromise;
//使用下面的方式是，使一步操作同时触发。最上面的方式是同步执行。


//并发执行的方式选择
async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) => db.post(doc));

  let results = await Promise.all(promises);
  console.log(results);
}

// 或者使用下面的写法
//使用for循环控制了使用await的时间
async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) => db.post(doc));

  let results = [];
  for (let promise of promises) {
    results.push(await promise);
  }
  console.log(results);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> foo = <span class="hljs-keyword">await</span> getFoo();
<span class="hljs-keyword">let</span> bar = <span class="hljs-keyword">await</span> getBar();
<span class="hljs-comment">//======================</span>
<span class="hljs-comment">// 写法一</span>
<span class="hljs-keyword">let</span> [foo, bar] = <span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>.all([getFoo(), getBar()]);

<span class="hljs-comment">// 写法二</span>
<span class="hljs-keyword">let</span> fooPromise = getFoo();
<span class="hljs-keyword">let</span> barPromise = getBar();
<span class="hljs-keyword">let</span> foo = <span class="hljs-keyword">await</span> fooPromise;
<span class="hljs-keyword">let</span> bar = <span class="hljs-keyword">await</span> barPromise;
<span class="hljs-comment">//使用下面的方式是，使一步操作同时触发。最上面的方式是同步执行。</span>


<span class="hljs-comment">//并发执行的方式选择</span>
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dbFuc</span>(<span class="hljs-params">db</span>) </span>{
  <span class="hljs-keyword">let</span> docs = [{}, {}, {}];
  <span class="hljs-keyword">let</span> promises = docs.map(<span class="hljs-function">(<span class="hljs-params">doc</span>) =&gt;</span> db.post(doc));

  <span class="hljs-keyword">let</span> results = <span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>.all(promises);
  <span class="hljs-built_in">console</span>.log(results);
}

<span class="hljs-comment">// 或者使用下面的写法</span>
<span class="hljs-comment">//使用for循环控制了使用await的时间</span>
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dbFuc</span>(<span class="hljs-params">db</span>) </span>{
  <span class="hljs-keyword">let</span> docs = [{}, {}, {}];
  <span class="hljs-keyword">let</span> promises = docs.map(<span class="hljs-function">(<span class="hljs-params">doc</span>) =&gt;</span> db.post(doc));

  <span class="hljs-keyword">let</span> results = [];
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> promise <span class="hljs-keyword">of</span> promises) {
    results.push(<span class="hljs-keyword">await</span> promise);
  }
  <span class="hljs-built_in">console</span>.log(results);
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【js】async和await使用

## 原文链接
[https://segmentfault.com/a/1190000008011822](https://segmentfault.com/a/1190000008011822)

