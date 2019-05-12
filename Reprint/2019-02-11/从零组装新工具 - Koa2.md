---
title: '从零组装新工具 - Koa2' 
date: 2019-02-11 2:30:49
hidden: true
slug: 26vz6zpo1p8
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">起因</h2>
<p>作为一个前端，Node.js算是必备知识之一。同时因为自己需要做一些后台性的工作，或者完成一个小型应用。所以学习了Node的Express框架，用于辅助和加速开发。</p>
<p>不过当初自己对Express的学习和了解，并不是很深入。要求也仅仅是停留在能发送静态文件，构建后台API，与数据库完成简单交互而已。所以当初自己选用Express时，靠的是<a href="http://www.expressjs.com.cn/starter/generator.html" rel="nofollow noreferrer" target="_blank">Express 应用生成器</a>，相当于Express的最佳实践。<br>在使用了一段时间之后，被Express的“回调地狱”，“自定义程度不高”等问题所困扰，于是决定更换至新的框架。</p>
<p>在选择框架时，遵循了自己学习新技术的原则：</p>
<blockquote><p>要么找值得学习的，深入学习并理解。要么找适合当前业务，能快速解决问题的。不要在具体某某某个技术上纠结太久。</p></blockquote>
<p>这句话也是自己看余果大大的《Web全栈工程师的自我修养》这本书的体会。</p>
<h2 id="articleHeader1">选择Koa</h2>
<p>在上面原则的指导下，很容易的就找到了一款符合自己需求的框架：Koa。<br>Koa因为应用了ES6的生成器语法，所以非常优雅的解决了Node.js的回调地狱问题。<br>比如说这样的Ajax代码，看起来就比回调函数的写法优雅很多。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function* main() {
  var result = yield request(&quot;http://some.url&quot;);
  var resp = JSON.parse(result);
  console.log(resp.value);
}

function request(url) {
  makeAjaxCall(url, function(response){
    it.next(response);
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span>* <span class="hljs-title">main</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> result = <span class="hljs-keyword">yield</span> request(<span class="hljs-string">"http://some.url"</span>);
  <span class="hljs-keyword">var</span> resp = <span class="hljs-built_in">JSON</span>.parse(result);
  <span class="hljs-built_in">console</span>.log(resp.value);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">request</span>(<span class="hljs-params">url</span>) </span>{
  makeAjaxCall(url, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>)</span>{
    it.next(response);
  });
}</code></pre>
<blockquote><p>例子来源： <a href="http://es6.ruanyifeng.com/#docs/generator#yield-%E8%AF%AD%E5%8F%A5" rel="nofollow noreferrer" target="_blank">Generator 函数</a></p></blockquote>
<p>虽然yield的写法有点奇怪，但还是可以接受的。</p>
<h3 id="articleHeader2">选择Koa2</h3>
<p>同时在Koa的github首页中，看到了Koa2。<br>Koa2应用了ES7的<code>Async/Await</code>来替代Koa1中的生成器函数与yield。<br>所以上一段代码的main函数，在Koa2里长这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="async function main() {
  var result = await request(&quot;http://some.url&quot;);
  var resp = JSON.parse(result);
  console.log(resp.value);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">main</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> result = <span class="hljs-keyword">await</span> request(<span class="hljs-string">"http://some.url"</span>);
  <span class="hljs-keyword">var</span> resp = <span class="hljs-built_in">JSON</span>.parse(result);
  <span class="hljs-built_in">console</span>.log(resp.value);
}</code></pre>
<p>使用了<code>Async/Await</code>后，整段代码是变的更加好看的。</p>
<h3 id="articleHeader3">理解Koa的中间件</h3>
<p>在一开始学习Koa时，是不太理解Koa的中间件级联这个概念的。<br>就是下图这玩意。<br><span class="img-wrap"><img data-src="/img/remote/1460000006769307" src="https://static.alili.tech/img/remote/1460000006769307" alt="中间件级联" title="中间件级联" style="cursor: pointer; display: inline;"></span></p>
<p>这个算是Koa的核心概念了，不理解这个，只能安安心心继续用Express。</p>
<p>还好自己平时爱去看各种开发大会的视频，来提升自己的眼界。所以昨晚正好在慕课网看到了《阿里D2前端技术论坛——2015融合》的大会视频，便开心的点开学习。<br>而第一篇《用 Node.js 构建海量页面渲染服务——by 不四》讲的就有Koa框架，还梳理了Koa的中间件级联这个概念。<br>在不四前辈介绍完Koa的中间件级联后，我发现自己好像理解了。<br>配合着自己之前学习的ES6知识，才发现原来是这样。<br>在这儿我贴一段代码和自己的理解，有兴趣的同学可以看一看。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var koa = require('koa');
var app = koa();

// x-response-time

app.use(function *(next){
  // 首先启动第一个中间件，记录下时间
  var start = new Date;
  // 进入中间件，并等待返回。
  yield next;
  // 返回后，代表操作已完成，记录结束时间并输出。
  var ms = new Date - start;
  this.set('X-Response-Time', ms + 'ms');
});

// response
app.use(function *(){
  // 最后一个中间件，将body写成'Hello World'
  this.body = 'Hello World';
});

app.listen(3000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa'</span>);
<span class="hljs-keyword">var</span> app = koa();

<span class="hljs-comment">// x-response-time</span>

app.use(<span class="hljs-function"><span class="hljs-keyword">function</span> *(<span class="hljs-params">next</span>)</span>{
  <span class="hljs-comment">// 首先启动第一个中间件，记录下时间</span>
  <span class="hljs-keyword">var</span> start = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>;
  <span class="hljs-comment">// 进入中间件，并等待返回。</span>
  <span class="hljs-keyword">yield</span> next;
  <span class="hljs-comment">// 返回后，代表操作已完成，记录结束时间并输出。</span>
  <span class="hljs-keyword">var</span> ms = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span> - start;
  <span class="hljs-keyword">this</span>.set(<span class="hljs-string">'X-Response-Time'</span>, ms + <span class="hljs-string">'ms'</span>);
});

<span class="hljs-comment">// response</span>
app.use(<span class="hljs-function"><span class="hljs-keyword">function</span> *(<span class="hljs-params"></span>)</span>{
  <span class="hljs-comment">// 最后一个中间件，将body写成'Hello World'</span>
  <span class="hljs-keyword">this</span>.body = <span class="hljs-string">'Hello World'</span>;
});

app.listen(<span class="hljs-number">3000</span>);</code></pre>
<p>整个的流程，会是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".middleware1 {
  // (1) do some stuff
  .middleware2 {
    // (2) do some other stuff
    .middleware3 {
      // (3) NO next yield !
      // this.body = 'hello world'
    }
    // (4) do some other stuff later
  }
  // (5) do some stuff lastest and return
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">.middleware1 {
  <span class="hljs-comment">// (1) do some stuff</span>
  .middleware2 {
    <span class="hljs-comment">// (2) do some other stuff</span>
    .middleware3 {
      <span class="hljs-comment">// (3) NO next yield !</span>
      <span class="hljs-comment">// this.body = 'hello world'</span>
    }
    <span class="hljs-comment">// (4) do some other stuff later</span>
  }
  <span class="hljs-comment">// (5) do some stuff lastest and return</span>
}</code></pre>
<p>至此，学习Koa的最后一个难关，也被攻克了。</p>
<h2 id="articleHeader4">从零组装Koa</h2>
<p>因为对Express的学习和使用，知道了自己对于后台框架的真实需求。<br>所以这回决定不用Koa generator之内的工具，而是自己从零开始，组装一个适合自己的Koa框架。<br>基于Koa2，使用Async/Await，符合自己需求……<br>想想就是很美好的事情呀。</p>
<h3 id="articleHeader5">梳理需求</h3>
<p>首先要做的，自然就是梳理自己的需求。看看到底需要什么东西。<br>于是翻出自己前两个月在使用的Express框架，确定了以下要点。</p>
<ol>
<li><p>路由，创建Rest Api</p></li>
<li><p>发送静态HTML文件</p></li>
<li><p>设置静态文件目录</p></li>
<li><p>发送和读取JSON数据</p></li>
<li><p>渲染模板</p></li>
<li><p>使用ES6语法完成工作</p></li>
</ol>
<h3 id="articleHeader6">实现需求</h3>
<p>具体的实现部分，这儿就不再赘述了。就是去github和npm上，寻找一个一个的包并组装在一起了而已。<br>整个项目的亮点就在于：完全符合个人需求，并且使用ES6来完成工作。对我个人而言，用ES6不仅看起来爽，也能提升我的工作效率。</p>
<p>整个项目已开源于Github，日后自己取用也非常方便。有兴趣的同学，也可以尝试一下。<br>项目地址：<a href="https://github.com/Lxxyx/koa2-easy" rel="nofollow noreferrer" target="_blank">koa2-easy</a></p>
<h2 id="articleHeader7">总结</h2>
<p>这周因为胃肠炎，好像也没做啥事情……最大的事儿也只是组装了个Koa框架。<br>因为养病的原因，只能每天看看开发者大会的视频。因为肚子时不时的抽一下，真的很影响工作啊……</p>
<p>今天感觉好了一点，希望病情早日康复~<br>就酱~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从零组装新工具 - Koa2

## 原文链接
[https://segmentfault.com/a/1190000004996176](https://segmentfault.com/a/1190000004996176)

