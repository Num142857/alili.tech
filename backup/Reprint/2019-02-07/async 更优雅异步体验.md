---
title: 'async 更优雅异步体验' 
date: 2019-02-07 2:30:15
hidden: true
slug: 7dgk15zw3qf
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>文章同步自个人博客：<a href="http://www.52cik.com/2016/07/11/generator-co.html" rel="nofollow noreferrer" target="_blank">http://www.52cik.com/2016/07/11/generator-co.html</a></p></blockquote>
<p>上一篇《<a href="http://www.52cik.com/2016/07/11/generator-co.html" rel="nofollow noreferrer" target="_blank">让 Generator 自启动</a>》介绍了通过起动器让 Generator 跑起来，而本篇采用 async 实现更优雅的异步编程。</p>
<h2 id="articleHeader0">从例子开始</h2>
<p>借用上一篇例子中的例子说起。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* gen() {
  var r1 = yield $.get('url1');
  var r2 = yield $.get('url2');
  var r3 = yield $.get('url3');

  console.log(r1, r2, r3);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">gen</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> r1 = <span class="hljs-keyword">yield</span> $.get(<span class="hljs-string">'url1'</span>);
  <span class="hljs-keyword">var</span> r2 = <span class="hljs-keyword">yield</span> $.get(<span class="hljs-string">'url2'</span>);
  <span class="hljs-keyword">var</span> r3 = <span class="hljs-keyword">yield</span> $.get(<span class="hljs-string">'url3'</span>);

  <span class="hljs-built_in">console</span>.log(r1, r2, r3);
}</code></pre>
<p>然后，我们需要写一个启动器来启动这个函数。<br>而采用 async 写，代码则是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function gen() {
  var r1 = await $.get('url1');
  var r2 = await $.get('url2');
  var r3 = await $.get('url3');

  console.log([r1, r2, r3].join('\n'));
}

gen(); // 直接运行即可" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">gen</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> r1 = <span class="hljs-keyword">await</span> $.get(<span class="hljs-string">'url1'</span>);
  <span class="hljs-keyword">var</span> r2 = <span class="hljs-keyword">await</span> $.get(<span class="hljs-string">'url2'</span>);
  <span class="hljs-keyword">var</span> r3 = <span class="hljs-keyword">await</span> $.get(<span class="hljs-string">'url3'</span>);

  <span class="hljs-built_in">console</span>.log([r1, r2, r3].join(<span class="hljs-string">'\n'</span>));
}

gen(); <span class="hljs-comment">// 直接运行即可</span></code></pre>
<p>直接运行了，无须写生成器来运行了，而代码仅仅是 <code>*</code> 改为 <code>async</code>, <code>yield</code> 改为 <code>await</code> 而已。<br>所以本质上讲：<strong>async 就是 Generator 的语法糖</strong>。</p>
<h2 id="articleHeader1">多任务处理</h2>
<p>多任务处理有个坑，就是不能直接在 <code>forEach</code>, <code>map</code> 之类的方法里处理，否则会报错或者得到错误的结果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sleep(t) {
  return new Promise(resolve => setTimeout( _ => { resolve(+new Date) }, t))
}

async function run() {
  // 顺序
  let a = await sleep(100)
  let b = await sleep(200)

  // 并发1
  let c = await Promise.all([sleep(100), sleep(200), sleep(300)])

  // 并发2
  let d = await Promise.all([100, 200, 300].map(t => sleep(t)))

  // 并发3
  let list = [sleep(100), sleep(200), sleep(300)]
  let e = []
  for (let fn of list) {
    e.push(await fn)
  }

  console.log(
    '',
    'a:', a, '\n',
    'b:', b, '\n',
    'c:', c, '\n',
    'd:', d, '\n',
    'e:', e, '\n'
  )
}

run()

// a: 1468317737179 
// b: 1468317737384 
// c: [ 1468317737485, 1468317737589, 1468317737688 ] 
// d: [ 1468317737792, 1468317737890, 1468317737989 ] 
// e: [ 1468317738094, 1468317738193, 1468317738293 ] " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sleep</span>(<span class="hljs-params">t</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> setTimeout( <span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span> { resolve(+<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>) }, t))
}

<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">run</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// 顺序</span>
  <span class="hljs-keyword">let</span> a = <span class="hljs-keyword">await</span> sleep(<span class="hljs-number">100</span>)
  <span class="hljs-keyword">let</span> b = <span class="hljs-keyword">await</span> sleep(<span class="hljs-number">200</span>)

  <span class="hljs-comment">// 并发1</span>
  <span class="hljs-keyword">let</span> c = <span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>.all([sleep(<span class="hljs-number">100</span>), sleep(<span class="hljs-number">200</span>), sleep(<span class="hljs-number">300</span>)])

  <span class="hljs-comment">// 并发2</span>
  <span class="hljs-keyword">let</span> d = <span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>.all([<span class="hljs-number">100</span>, <span class="hljs-number">200</span>, <span class="hljs-number">300</span>].map(<span class="hljs-function"><span class="hljs-params">t</span> =&gt;</span> sleep(t)))

  <span class="hljs-comment">// 并发3</span>
  <span class="hljs-keyword">let</span> list = [sleep(<span class="hljs-number">100</span>), sleep(<span class="hljs-number">200</span>), sleep(<span class="hljs-number">300</span>)]
  <span class="hljs-keyword">let</span> e = []
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> fn <span class="hljs-keyword">of</span> list) {
    e.push(<span class="hljs-keyword">await</span> fn)
  }

  <span class="hljs-built_in">console</span>.log(
    <span class="hljs-string">''</span>,
    <span class="hljs-string">'a:'</span>, a, <span class="hljs-string">'\n'</span>,
    <span class="hljs-string">'b:'</span>, b, <span class="hljs-string">'\n'</span>,
    <span class="hljs-string">'c:'</span>, c, <span class="hljs-string">'\n'</span>,
    <span class="hljs-string">'d:'</span>, d, <span class="hljs-string">'\n'</span>,
    <span class="hljs-string">'e:'</span>, e, <span class="hljs-string">'\n'</span>
  )
}

run()

<span class="hljs-comment">// a: 1468317737179 </span>
<span class="hljs-comment">// b: 1468317737384 </span>
<span class="hljs-comment">// c: [ 1468317737485, 1468317737589, 1468317737688 ] </span>
<span class="hljs-comment">// d: [ 1468317737792, 1468317737890, 1468317737989 ] </span>
<span class="hljs-comment">// e: [ 1468317738094, 1468317738193, 1468317738293 ] </span></code></pre>
<h2 id="articleHeader2">小结</h2>
<p>async 没多大的变动，归根结底就是个语法糖，帮助我们运行生成器，而不需要我们自己写起动器了。<br>不过效果确实非常好，让异步编程更加的<code>同步</code>了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
async 更优雅异步体验

## 原文链接
[https://segmentfault.com/a/1190000005945909](https://segmentfault.com/a/1190000005945909)

