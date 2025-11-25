---
title: '探索 RxJS - 做一个 github 小应用' 
date: 2019-01-31 2:31:16
hidden: true
slug: y543yn0dte
categories: [reprint]
---

{{< raw >}}

                    
<p>本文是一篇 RxJS 实战教程，利用 RxJS 和 github API 来一步步做一个 github 小应用。因此，文章的重点是解释 RxJS 的使用，而涉及的 ES6语法、webpack 等知识点不予讲解。</p>
<blockquote><p>本例的所有代码在 github 仓库：<a href="https://github.com/ecmadao/rxjs-example" rel="nofollow noreferrer" target="_blank">rxjs-example</a></p></blockquote>
<p>首先要注意的是，目前在 github 上有两个主流 RxJS，它们代表不同的版本：</p>
<ul>
<li><p><a href="https://github.com/ReactiveX/rxjs" rel="nofollow noreferrer" target="_blank">ReactiveX - rxjs</a> RxJS 5 beta 版</p></li>
<li><p><a href="https://github.com/Reactive-Extensions/RxJS" rel="nofollow noreferrer" target="_blank">Reactive-Extensions - RxJS</a> RxJS 4.x 稳定版</p></li>
</ul>
<p>这两个版本的安装和引用稍有不同：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 安装 4.x 稳定版
$ npm install rx --save
# 安装 5 beta 版
$ npm install rxjs --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># 安装 4.x 稳定版</span>
$ npm install rx --save
<span class="hljs-comment"># 安装 5 beta 版</span>
$ npm install rxjs --save</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 4.x 稳定版
import Rx from 'rx';
// 5 beta 版
import Rx from 'rxjs/Rx';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 4.x 稳定版</span>
<span class="hljs-keyword">import</span> Rx <span class="hljs-keyword">from</span> <span class="hljs-string">'rx'</span>;
<span class="hljs-comment">// 5 beta 版</span>
<span class="hljs-keyword">import</span> Rx <span class="hljs-keyword">from</span> <span class="hljs-string">'rxjs/Rx'</span>;</code></pre>
<p>除此以外，它们的语法也稍有不同，比如在 5 beta 版里，<code>subscribe</code>时可以代入一个对象作为参数，也可以代入回调函数作为参数，而 4.x 版则只支持以回调函数为参数的情况：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 5 beta
var observer = {
  next: x => console.log('Observer got a next value: ' + x),
  error: err => console.error('Observer got an error: ' + err),
  complete: () => console.log('Observer got a complete notification'),
};
Observable.subscribe(observer);

// 5 和 4.x 都支持：
Observable.subscribe(x => console.log(x), (err) => console.log(err), () => console.log('completed'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 5 beta</span>
<span class="hljs-keyword">var</span> observer = {
  <span class="hljs-attr">next</span>: <span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Observer got a next value: '</span> + x),
  <span class="hljs-attr">error</span>: <span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'Observer got an error: '</span> + err),
  <span class="hljs-attr">complete</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Observer got a complete notification'</span>),
};
Observable.subscribe(observer);

<span class="hljs-comment">// 5 和 4.x 都支持：</span>
Observable.subscribe(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(x), (err) =&gt; <span class="hljs-built_in">console</span>.log(err), () =&gt; <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'completed'</span>));</code></pre>
<p>其他更多语法不同可以参考：</p>
<ul>
<li><p><a href="https://github.com/Reactive-Extensions/RxJS/tree/master/doc" rel="nofollow noreferrer" target="_blank">4.x 稳定版 Document</a></p></li>
<li><p><a href="http://reactivex.io/rxjs/manual" rel="nofollow noreferrer" target="_blank">5 beta 版 Document</a></p></li>
<li><p><a href="https://github.com/ReactiveX/rxjs/blob/master/MIGRATION.md" rel="nofollow noreferrer" target="_blank">从 4 到 5 的迁移</a></p></li>
</ul>
<h2 id="articleHeader0">Let's start</h2>
<p>如上所说，我们要利用 RxJS 和 github API 来一步步做一个 github 小应用。首先完成其基本功能，即通过一个 input 输入文字，并实时根据 input 内值的变化去发送异步请求，调用 github API 进行搜索。如图所示（<a href="https://ecmadao.github.io/rxjs-example" rel="nofollow noreferrer" target="_blank">线上 Demo</a>）：</p>
<blockquote><p>通过<code>RxJS</code>，在输入过程中实时进行异步搜索：</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVFTz4?w=1348&amp;h=1286" src="https://static.alili.tech/img/bVFTz4?w=1348&amp;h=1286" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p><code>hover</code>到 avator 上之后异步获取用户信息</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVFTz9?w=1152&amp;h=870" src="https://static.alili.tech/img/bVFTz9?w=1152&amp;h=870" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>安装 webpack 配置编译环境，并使用 ES6 语法。安装如下依赖，并配置好 webpack：</p>
<ul>
<li><p>webpack</p></li>
<li><p>webpack-dev-server</p></li>
<li><p>babel-loader</p></li>
<li><p>babel-preset-es2015</p></li>
<li><p>html-webpack-plugin</p></li>
<li><p>css-loader / postcss 及其他</p></li>
<li><p>jquery</p></li>
<li><p>rx（4.x 版本）</p></li>
</ul>
<p>通过<code>webpack-dev-server</code>，我们将会启动一个 8080 端口的服务器，使得我们编译好的资源可以在<code>localhost:8080/webpack-dev-server</code>访问到。</p>
<h3 id="articleHeader1">初始化 DOM 事件流</h3>
<p>在<code>index.html</code>中编写一个<code>input</code>，我们将在<code>index.js</code>中，通过 RxJS 的 Observable 监听<code>input</code>的<code>keyup</code>事件。可以使用<a href="http://reactivex.io/documentation/operators/from.html" rel="nofollow noreferrer" target="_blank"><code>fromEvent</code></a>来创建一个基于 DOM 事件的流，并通过<a href="http://reactivex.io/documentation/operators/map.html" rel="nofollow noreferrer" target="_blank"><code>map</code></a>和<a href="http://reactivex.io/documentation/operators/filter.html" rel="nofollow noreferrer" target="_blank"><code>filter</code></a>进一步处理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- index.html -->
<input class=&quot;search&quot; type=&quot;text&quot; maxlength=&quot;1000&quot; required placeholder=&quot;search in github&quot;/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- index.html --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"search"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">maxlength</span>=<span class="hljs-string">"1000"</span> <span class="hljs-attr">required</span> <span class="hljs-attr">placeholder</span>=<span class="hljs-string">"search in github"</span>/&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/js/index.js
import Rx from 'rx';

$(() => {
  const $input = $('.search');
  // 通过 input 的 keyup 事件来创建流
  const observable = Rx.Observable.fromEvent($input, 'keyup')
      // 并获取每次 keyup 时搜索框的值，筛选出合法值
      .map(() => $input.val().trim())
    .filter((text) => !!text)
    // 利用 do 可以做一些不影响流的事件，比如这里打印出 input 的值
    .do((value) => console.log(value));
  // 开启监听
  observable.subscribe();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// src/js/index.js</span>
<span class="hljs-keyword">import</span> Rx <span class="hljs-keyword">from</span> <span class="hljs-string">'rx'</span>;

$(() =&gt; {
  <span class="hljs-keyword">const</span> $input = $(<span class="hljs-string">'.search'</span>);
  <span class="hljs-comment">// 通过 input 的 keyup 事件来创建流</span>
  <span class="hljs-keyword">const</span> observable = Rx.Observable.fromEvent($input, <span class="hljs-string">'keyup'</span>)
      <span class="hljs-comment">// 并获取每次 keyup 时搜索框的值，筛选出合法值</span>
      .map(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> $input.val().trim())
    .filter(<span class="hljs-function">(<span class="hljs-params">text</span>) =&gt;</span> !!text)
    <span class="hljs-comment">// 利用 do 可以做一些不影响流的事件，比如这里打印出 input 的值</span>
    .do(<span class="hljs-function">(<span class="hljs-params">value</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(value));
  <span class="hljs-comment">// 开启监听</span>
  observable.subscribe();
});</code></pre>
<p>去 input 里随便打打字，可以看到我们已经成功监听了<code>keyup</code>事件，并在每次<code>keyup</code>时在 console 里输出 input 当前的值。</p>
<h3 id="articleHeader2">实时进行异步获取</h3>
<p>监听了 input 事件，我们就能够在每次<code>keyup</code>时拿到 value，那么就可以通过它来异步获取数据。将整个过程拆分一下：</p>
<ol>
<li><p>用户在 input 里输入任意内容</p></li>
<li><p>触发<code>keyup</code>事件，获取到当前 value</p></li>
<li><p>将 value 代入到一个异步方法里，通过接口获取数据</p></li>
<li><p>利用返回数据渲染 DOM</p></li>
</ol>
<p>也就是说，我们要把原有的 Observable 中每个事件返回的 value 进行异步处理，并使其返回一个新的 Observable。可以这么处理：</p>
<ol>
<li><p>让每个 value 返回一个 Observable</p></li>
<li><p>通过<a href="http://reactivex.io/documentation/operators/flatmap.html" rel="nofollow noreferrer" target="_blank"><code>flatMap</code></a>将所有的 Observable 扁平化，成为一个新的 Observable</p></li>
</ol>
<p>图解<code>flatMap</code>：</p>
<p><span class="img-wrap"><img data-src="/img/bVFTAh?w=1280&amp;h=620" src="https://static.alili.tech/img/bVFTAh?w=1280&amp;h=620" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>而既然需要异步获取数据，那么在上面的第一步时，可以通过<a href="http://reactivex.io/documentation/operators/from.html" rel="nofollow noreferrer" target="_blank"><code>fromPromise</code></a>来创建一个 Observable：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/js/helper.js
const SEARCH_REPOS = 'https://api.github.com/search/repositories?sort=stars&amp;order=desc&amp;q=';

// 创建一个 ajax 的 promise
const getReposPromise = (query) => {
  return $.ajax({
      type: &quot;GET&quot;,
    url: `${SEARCH_REPOS}${query}`,
  }).promise();
};
// 通过 fromPromise 创建一个 Observable
export const getRepos = (query) => {
  const promise = getReposPromise(query);
  return Rx.Observable.fromPromise(promise);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// src/js/helper.js</span>
<span class="hljs-keyword">const</span> SEARCH_REPOS = <span class="hljs-string">'https://api.github.com/search/repositories?sort=stars&amp;order=desc&amp;q='</span>;

<span class="hljs-comment">// 创建一个 ajax 的 promise</span>
<span class="hljs-keyword">const</span> getReposPromise = <span class="hljs-function">(<span class="hljs-params">query</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> $.ajax({
      <span class="hljs-attr">type</span>: <span class="hljs-string">"GET"</span>,
    <span class="hljs-attr">url</span>: <span class="hljs-string">`<span class="hljs-subst">${SEARCH_REPOS}</span><span class="hljs-subst">${query}</span>`</span>,
  }).promise();
};
<span class="hljs-comment">// 通过 fromPromise 创建一个 Observable</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> getRepos = <span class="hljs-function">(<span class="hljs-params">query</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> promise = getReposPromise(query);
  <span class="hljs-keyword">return</span> Rx.Observable.fromPromise(promise);
};</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/js/index.js
import {getRepos} from './helper';

// ...
const observable = Rx.Observable.fromEvent($input, 'keyup')
      .map(() => $input.val())
    .filter((text) => !!text)
    .do((value) => console.log(value))
    // 调用 getRepos 方法将返回一个 Observable
    // flatMap 则将所有 Observable 合并，转为一个 Observable
    .flatMap(getRepos);
// ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// src/js/index.js</span>
<span class="hljs-keyword">import</span> {getRepos} <span class="hljs-keyword">from</span> <span class="hljs-string">'./helper'</span>;

<span class="hljs-comment">// ...</span>
<span class="hljs-keyword">const</span> observable = Rx.Observable.fromEvent($input, <span class="hljs-string">'keyup'</span>)
      .map(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> $input.val())
    .filter(<span class="hljs-function">(<span class="hljs-params">text</span>) =&gt;</span> !!text)
    .do(<span class="hljs-function">(<span class="hljs-params">value</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(value))
    <span class="hljs-comment">// 调用 getRepos 方法将返回一个 Observable</span>
    <span class="hljs-comment">// flatMap 则将所有 Observable 合并，转为一个 Observable</span>
    .flatMap(getRepos);
<span class="hljs-comment">// ...</span></code></pre>
<p>这样，每一次<code>keyup</code>的时候，都会根据此时 input 的 value 去异步获取数据。但这样做有几个问题：</p>
<ul>
<li><p>不断打字时会连续不断触发异步请求，占用资源影响体验</p></li>
<li><p>如果相邻的<code>keyup</code>事件触发时 input 的值一样，也就是说按下了不改变 value 的按键（比如方向键），会重复触发一样的异步事件</p></li>
<li><p>发出多个异步事件之后，每个事件所耗费的时间不一定相同。如果前一个异步所用时间较后一个长，那么当它最终返回结果时，有可能把后面的异步率先返回的结果覆盖</p></li>
</ul>
<p>所以接下来我们就处理这几个问题。</p>
<h3 id="articleHeader3">优化事件流</h3>
<p>针对上面的问题，一步一步进行优化。</p>
<hr>
<blockquote><p>不断打字时会连续不断触发异步请求，占用资源影响体验</p></blockquote>
<p>也就是说，当用户在连续打字时，我们不应该继续进行之后的事件处理，而如果打字中断，或者说两次<code>keyup</code>事件的时间间隔足够长时，才应该发送异步请求。针对这点，可以使用 RxJS 的<a href="http://reactivex.io/documentation/operators/debounce.html" rel="nofollow noreferrer" target="_blank"><code>debounce</code></a>方法：</p>
<p><span class="img-wrap"><img data-src="/img/bVFTAi?w=1280&amp;h=620" src="https://static.alili.tech/img/bVFTAi?w=1280&amp;h=620" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>如图所示，在一段时间内事件被不断触发时，不会被之后的操作所处理；只有超过指定时间间隔的事件才会留下来：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/js/index.js
// ...
const observable = Rx.Observable.fromEvent($input, 'keyup')
    // 若 400ms 内连续触发 keyup 事件，则不会继续往下处理
    .debounce(400)
      .map(() => $input.val())
    .filter((text) => !!text)
    .do((value) => console.log(value))
    .flatMap(getRepos);
// ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// src/js/index.js</span>
<span class="hljs-comment">// ...</span>
<span class="hljs-keyword">const</span> observable = Rx.Observable.fromEvent($input, <span class="hljs-string">'keyup'</span>)
    <span class="hljs-comment">// 若 400ms 内连续触发 keyup 事件，则不会继续往下处理</span>
    .debounce(<span class="hljs-number">400</span>)
      .map(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> $input.val())
    .filter(<span class="hljs-function">(<span class="hljs-params">text</span>) =&gt;</span> !!text)
    .do(<span class="hljs-function">(<span class="hljs-params">value</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(value))
    .flatMap(getRepos);
<span class="hljs-comment">// ...</span></code></pre>
<hr>
<blockquote><p>如果相邻的<code>keyup</code>事件触发时 input 的值一样，也就是说按下了不改变 value 的按键（比如方向键），会重复触发一样的异步事件</p></blockquote>
<p>也就是说，对于任意相邻的事件，如果它们的返回值一样，则只要取一个（重复事件中的第一个）就好了。可以利用<a href="http://reactivex.io/documentation/operators/distinct.html" rel="nofollow noreferrer" target="_blank"><code>distinctUntilChanged</code></a>方法：</p>
<p><span class="img-wrap"><img data-src="/img/bVFTAn?w=1280&amp;h=620" src="https://static.alili.tech/img/bVFTAn?w=1280&amp;h=620" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/js/index.js
// ...
const observable = Rx.Observable.fromEvent($input, 'keyup')
    .debounce(400)
      .map(() => $input.val())
    .filter((text) => !!text)
    // 只取不一样的值进行异步
    .distinctUntilChanged()
    .do((value) => console.log(value))
    .flatMap(getRepos);
// ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// src/js/index.js</span>
<span class="hljs-comment">// ...</span>
<span class="hljs-keyword">const</span> observable = Rx.Observable.fromEvent($input, <span class="hljs-string">'keyup'</span>)
    .debounce(<span class="hljs-number">400</span>)
      .map(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> $input.val())
    .filter(<span class="hljs-function">(<span class="hljs-params">text</span>) =&gt;</span> !!text)
    <span class="hljs-comment">// 只取不一样的值进行异步</span>
    .distinctUntilChanged()
    .do(<span class="hljs-function">(<span class="hljs-params">value</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(value))
    .flatMap(getRepos);
<span class="hljs-comment">// ...</span></code></pre>
<hr>
<blockquote><p>发出多个异步事件之后，每个事件所耗费的时间不一定相同。如果前一个异步所用时间较后一个长，那么当它最终返回结果时，有可能把后面的异步率先返回的结果覆盖</p></blockquote>
<p>这个蛋疼的问题我相信大家很可能遇见过。在发送多个异步请求时，因为所用时长不一定，无法保障异步返回的先后顺序，所以，有时候可能<strong>早请求的异步的结果会覆盖后来请求的异步结果</strong>。</p>
<p>而这种情况的处理方式就是，在连续发出多个异步的时候，既然我们期待的是最后一个异步返回的结果，那么就可以把之前的异步取消掉，不 care 其返回了什么。因此，我们可以使用<a href="http://reactivex.io/documentation/operators/flatmap.html" rel="nofollow noreferrer" target="_blank"><code>flatMapLatest</code></a> API（类似于 RxJava 中的<code>switchMap</code> API，同时在 RxJS 5.0 中也已经改名为<code>switchMap</code>）</p>
<p>通过<code>flatMapLatest</code>，当 Observable 触发某个事件，返回新的 Observable 时，将取消之前触发的事件，并且不再关心返回结果的处理，只监视当前这一个。也就是说，发送多个请求时，不关心之前请求的处理，只处理最后一次的请求：</p>
<p><span class="img-wrap"><img data-src="/img/bVFRfd?w=1280&amp;h=700" src="https://static.alili.tech/img/bVFRfd?w=1280&amp;h=700" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/js/index.js
// ...
const observable = Rx.Observable.fromEvent($input, 'keyup')
    .debounce(400)
      .map(() => $input.val())
    .filter((text) => !!text)
    .distinctUntilChanged()
    .do((value) => console.log(value))
    // 仅处理最后一次的异步
    .flatMapLatest(getRepos);
// ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// src/js/index.js</span>
<span class="hljs-comment">// ...</span>
<span class="hljs-keyword">const</span> observable = Rx.Observable.fromEvent($input, <span class="hljs-string">'keyup'</span>)
    .debounce(<span class="hljs-number">400</span>)
      .map(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> $input.val())
    .filter(<span class="hljs-function">(<span class="hljs-params">text</span>) =&gt;</span> !!text)
    .distinctUntilChanged()
    .do(<span class="hljs-function">(<span class="hljs-params">value</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(value))
    <span class="hljs-comment">// 仅处理最后一次的异步</span>
    .flatMapLatest(getRepos);
<span class="hljs-comment">// ...</span></code></pre>
<h3 id="articleHeader4">流的监听</h3>
<p>至此，我们对 input <code>keyup</code>以及异步获取数据的整个事件流处理完毕，并进行了一定的优化，避免了过多的请求、异步返回结果错乱等问题。但创建了一个流之后也有对其进行监听：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/js/index.js
// ...
const observable = Rx.Observable.fromEvent($input, 'keyup')
    .debounce(400)
      .map(() => $input.val())
    .filter((text) => !!text)
    .distinctUntilChanged()
    .do((value) => console.log(value))
    .flatMapLatest(getRepos);
// 第一个回调中的 data 代表异步的返回值
observable.subscribe((data) => {
  // 在 showNewResults 方法中使用返回值渲染 DOM
  showNewResults(data);
}, (err) => {
  console.log(err);
}, () => {
  console.log('completed');
});

// 异步返回的结果是个 Array，代表搜索到的各个仓库 item
// 遍历所有 item，转化为 jQuery 对象，最后插入到 content_container 中
const showNewResults = (items) => {
  const repos = items.map((item, i) => {
    return reposTemplate(item);
  }).join('');
  $('.content_container').html(repos);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// src/js/index.js</span>
<span class="hljs-comment">// ...</span>
<span class="hljs-keyword">const</span> observable = Rx.Observable.fromEvent($input, <span class="hljs-string">'keyup'</span>)
    .debounce(<span class="hljs-number">400</span>)
      .map(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> $input.val())
    .filter(<span class="hljs-function">(<span class="hljs-params">text</span>) =&gt;</span> !!text)
    .distinctUntilChanged()
    .do(<span class="hljs-function">(<span class="hljs-params">value</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(value))
    .flatMapLatest(getRepos);
<span class="hljs-comment">// 第一个回调中的 data 代表异步的返回值</span>
observable.subscribe(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
  <span class="hljs-comment">// 在 showNewResults 方法中使用返回值渲染 DOM</span>
  showNewResults(data);
}, (err) =&gt; {
  <span class="hljs-built_in">console</span>.log(err);
}, () =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'completed'</span>);
});

<span class="hljs-comment">// 异步返回的结果是个 Array，代表搜索到的各个仓库 item</span>
<span class="hljs-comment">// 遍历所有 item，转化为 jQuery 对象，最后插入到 content_container 中</span>
<span class="hljs-keyword">const</span> showNewResults = <span class="hljs-function">(<span class="hljs-params">items</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> repos = items.map(<span class="hljs-function">(<span class="hljs-params">item, i</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> reposTemplate(item);
  }).join(<span class="hljs-string">''</span>);
  $(<span class="hljs-string">'.content_container'</span>).html(repos);
};</code></pre>
<hr>
<p>这样，一个通过 RxJS 监听事件的流已经完全建立完毕了。整个过程使用图像来表示则如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVFTAy?w=569&amp;h=601" src="https://static.alili.tech/img/bVFTAy?w=569&amp;h=601" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>而如果我们不使用 RxJS，用传统方式监听 input 的话：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/js/index.js
import {getRepos} from './helper';

$(() => {
  const $input = $('.search');
  const interval = 400;
  var previousValue = null;
  var fetching = false;
  var lastKeyUp = Date.now() - interval;
  $input.on('keyup', (e) => {
    const nextValue = $input.val();
    if (!nextValue) {
      return;
    }
    if (Date.now() - lastKeyUp <= interval) {
      return;
    }
    lastKeyUp = Date.now();
    if (nextValue === previousValue) {
      return;
    }
    previousValue = nextValue;
    if (!fetching) {
      fetching = true;
      getRepos(nextValue).then((data) => {
          fetching = false;
        showNewResults(data);
      });
    }
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// src/js/index.js</span>
<span class="hljs-keyword">import</span> {getRepos} <span class="hljs-keyword">from</span> <span class="hljs-string">'./helper'</span>;

$(() =&gt; {
  <span class="hljs-keyword">const</span> $input = $(<span class="hljs-string">'.search'</span>);
  <span class="hljs-keyword">const</span> interval = <span class="hljs-number">400</span>;
  <span class="hljs-keyword">var</span> previousValue = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">var</span> fetching = <span class="hljs-literal">false</span>;
  <span class="hljs-keyword">var</span> lastKeyUp = <span class="hljs-built_in">Date</span>.now() - interval;
  $input.on(<span class="hljs-string">'keyup'</span>, (e) =&gt; {
    <span class="hljs-keyword">const</span> nextValue = $input.val();
    <span class="hljs-keyword">if</span> (!nextValue) {
      <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Date</span>.now() - lastKeyUp &lt;= interval) {
      <span class="hljs-keyword">return</span>;
    }
    lastKeyUp = <span class="hljs-built_in">Date</span>.now();
    <span class="hljs-keyword">if</span> (nextValue === previousValue) {
      <span class="hljs-keyword">return</span>;
    }
    previousValue = nextValue;
    <span class="hljs-keyword">if</span> (!fetching) {
      fetching = <span class="hljs-literal">true</span>;
      getRepos(nextValue).then(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> {
          fetching = <span class="hljs-literal">false</span>;
        showNewResults(data);
      });
    }
  });
});</code></pre>
<p>挺复杂了吧？而且即便如此，这样的处理还是不够到位。上面仅仅是通过<code>fetching</code>变量来判断是否正在异步，如果正在异步，则不进行新的异步；而我们更希望的是能够取消旧的异步，只处理新的异步请求。</p>
<h3 id="articleHeader5">更加优雅的 Rx 风格</h3>
<p>按照上面的教程，我们在 Observable 中获取到了数据、发送异步请求并拿到了最新一次的返回值。之后，再通过<code>subscribe</code>，在监听的回调中将返回值拼接成 HTML 并插入 DOM。</p>
<p>但是有一个问题：小应用的另一个功能是，当鼠标<code>hover</code>到头像上时，异步获取并展现用户的信息。可是用户头像是在<code>subscribe</code>回调中动态插入的，又该如何创建事件流呢？当然了，可以在每次插入 DOM 之后在利用<code>fromEvent</code>创建一个基于<code>hover</code>的事件流，但那样总是不太好的，写出来的代码也不够 Rx。或许我们就不应该在<code>.flatMapLatest(getRepos)</code>之后中断流的传递？但那样的话，又该如何把异步的返回值插入 DOM 呢？</p>
<p>针对这种情况，我们可以使用 RxJS 的<a href="http://reactivex.io/documentation/operators/do.html" rel="nofollow noreferrer" target="_blank"><code>do</code></a>方法：</p>
<p><span class="img-wrap"><img data-src="/img/bVFTAM?w=1280&amp;h=620" src="https://static.alili.tech/img/bVFTAM?w=1280&amp;h=620" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>你想在<code>do</code>的回调内做什么都可以，它不会影响到流内的事件；除此以外，还可以拿到流中各个事件的返回值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var observable = Rx.Observable.from([0, 1, 2])
    .do((x) => console.log(x))
    .map((x) => x + 1);
observable.subscribe((x) => {
  console.log(x);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> observable = Rx.Observable.from([<span class="hljs-number">0</span>, <span class="hljs-number">1</span>, <span class="hljs-number">2</span>])
    .do(<span class="hljs-function">(<span class="hljs-params">x</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(x))
    .map(<span class="hljs-function">(<span class="hljs-params">x</span>) =&gt;</span> x + <span class="hljs-number">1</span>);
observable.subscribe(<span class="hljs-function">(<span class="hljs-params">x</span>) =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(x);
});</code></pre>
<p>所以，我们可以利用<code>do</code>来完成 DOM 的渲染：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/js/index.js
// ...
// $conatiner 是装载搜索结果的容器 div
const $conatiner = $('.content_container');

const observable = Rx.Observable.fromEvent($input, 'keyup')
    .debounce(400)
      .map(() => $input.val())
    .filter((text) => !!text)
    .distinctUntilChanged()
    .do((value) => console.log(value))
    .flatMapLatest(getRepos)
    // 首先把之前的搜索结果清空
    .do((results) => $conatiner.html(''))
    // 利用 Rx.Observable.from 将异步的结果转化为 Observable，并通过 flatMap 合并到原有的流中。此时流中的每个元素是 results 中的每个 item
    .flatMap((results) => Rx.Observable.from(results))
    // 将各 item 转化为 jQuery 对象
    .map((repos) => $(reposTemplate(repos)))
    // 最后把每个 jQuery 对象依次加到容器里
    .do(($repos) => {
      $conatiner.append($repos);
    });

// 在 subscribe 中实际上什么都不用做，就能达到之前的效果
observable.subscribe(() => {
  console.log('success');
}, (err) => {
  console.log(err);
}, () => {
  console.log('completed');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// src/js/index.js</span>
<span class="hljs-comment">// ...</span>
<span class="hljs-comment">// $conatiner 是装载搜索结果的容器 div</span>
<span class="hljs-keyword">const</span> $conatiner = $(<span class="hljs-string">'.content_container'</span>);

<span class="hljs-keyword">const</span> observable = Rx.Observable.fromEvent($input, <span class="hljs-string">'keyup'</span>)
    .debounce(<span class="hljs-number">400</span>)
      .map(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> $input.val())
    .filter(<span class="hljs-function">(<span class="hljs-params">text</span>) =&gt;</span> !!text)
    .distinctUntilChanged()
    .do(<span class="hljs-function">(<span class="hljs-params">value</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(value))
    .flatMapLatest(getRepos)
    <span class="hljs-comment">// 首先把之前的搜索结果清空</span>
    .do(<span class="hljs-function">(<span class="hljs-params">results</span>) =&gt;</span> $conatiner.html(<span class="hljs-string">''</span>))
    <span class="hljs-comment">// 利用 Rx.Observable.from 将异步的结果转化为 Observable，并通过 flatMap 合并到原有的流中。此时流中的每个元素是 results 中的每个 item</span>
    .flatMap(<span class="hljs-function">(<span class="hljs-params">results</span>) =&gt;</span> Rx.Observable.from(results))
    <span class="hljs-comment">// 将各 item 转化为 jQuery 对象</span>
    .map(<span class="hljs-function">(<span class="hljs-params">repos</span>) =&gt;</span> $(reposTemplate(repos)))
    <span class="hljs-comment">// 最后把每个 jQuery 对象依次加到容器里</span>
    .do(<span class="hljs-function">(<span class="hljs-params">$repos</span>) =&gt;</span> {
      $conatiner.append($repos);
    });

<span class="hljs-comment">// 在 subscribe 中实际上什么都不用做，就能达到之前的效果</span>
observable.subscribe(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'success'</span>);
}, (err) =&gt; {
  <span class="hljs-built_in">console</span>.log(err);
}, () =&gt; {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'completed'</span>);
});</code></pre>
<p>简直完美！现在我们这个<code>observable</code>在最后通过<code>map</code>，依次返回了一个 jQuery 对象。那么之后如果要对头像添加<code>hover</code>的监听，则可以在这个流的基础上继续进行。</p>
<h3 id="articleHeader6">创建基于<code>hover</code>的事件流</h3>
<p>我们接下来针对用户头像的<code>hover</code>事件创建一个流。用户的详细资料是异步加载的，而<code>hover</code>到头像上时弹出 modal。如果是第一个<code>hover</code>，则 modal 里只有一个 loading 的图标，并且异步获取数据，之后将返回的数据插入到 modal 里；而如果已经拿到并插入好了数据，则不再有异步请求，直接展示：</p>
<blockquote><p>没有数据时展示 loading，同时异步获取数据</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVFTAO?w=1150&amp;h=428" src="https://static.alili.tech/img/bVFTAO?w=1150&amp;h=428" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<blockquote><p>异步返回后插入数据。且如果已经有了数据则直接展示</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVFTAS?w=1130&amp;h=432" src="https://static.alili.tech/img/bVFTAS?w=1130&amp;h=432" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>先不管上一个流，我们先创建一个新的事件流：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/js/index.js
// ...
const initialUserInfoSteam = () => {
  const $avator = $('.user_header');
  // 通过头像 $avator 的 hover 事件来创建流
  const avatorMouseover = Rx.Observable.fromEvent($avator, 'mouseover')
    // 500ms 内重复触发事件则会被忽略
    .debounce(500)
    // 只有当满足了下列条件的流才会继续执行，否则将中断
    .takeWhile((e) => {
      // 异步获取的用户信息被新建到 DOM 里，该 DOM 最外层是 infos_container
      // 因此，如果已经有了 infos_container，则可以认为我们已经异步获取过数据了，此时 takeWhile 将返回 false，流将会中断
      const $infosWrapper = $(e.target).parent().find('.user_infos_wrapper');
      return $infosWrapper.find('.infos_container').length === 0;
    })
    .map((e) => {
      const $infosWrapper = $(e.target).parent().find('.user_infos_wrapper');
      return {
        conatiner: $infosWrapper,
        url: $(e.target).attr('data-api')
      }
    })
    .filter((data) => !!data.url)
    // getUser 来异步获取用户信息
    .flatMapLatest(getUser)
    .do((result) => {
      // 将用户信息组建成为 DOM 元素，并插入到页面中。在这之后，该用户对应的 DOM 里就会拥有 infos_container 这个 div，所以 takeWhile 会返回 false。也就是说，之后再 hover 上去，流也不会被触发了
      const {data, conatiner} = result;
      showUserInfo(conatiner, data);
    });

  avatorMouseover.subscribe((result) => {
      console.log('fetch user info succeed');
  }, (err) => {
    console.log(err);
  }, () => {
    console.log('completed');
  });
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// src/js/index.js</span>
<span class="hljs-comment">// ...</span>
<span class="hljs-keyword">const</span> initialUserInfoSteam = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> $avator = $(<span class="hljs-string">'.user_header'</span>);
  <span class="hljs-comment">// 通过头像 $avator 的 hover 事件来创建流</span>
  <span class="hljs-keyword">const</span> avatorMouseover = Rx.Observable.fromEvent($avator, <span class="hljs-string">'mouseover'</span>)
    <span class="hljs-comment">// 500ms 内重复触发事件则会被忽略</span>
    .debounce(<span class="hljs-number">500</span>)
    <span class="hljs-comment">// 只有当满足了下列条件的流才会继续执行，否则将中断</span>
    .takeWhile(<span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
      <span class="hljs-comment">// 异步获取的用户信息被新建到 DOM 里，该 DOM 最外层是 infos_container</span>
      <span class="hljs-comment">// 因此，如果已经有了 infos_container，则可以认为我们已经异步获取过数据了，此时 takeWhile 将返回 false，流将会中断</span>
      <span class="hljs-keyword">const</span> $infosWrapper = $(e.target).parent().find(<span class="hljs-string">'.user_infos_wrapper'</span>);
      <span class="hljs-keyword">return</span> $infosWrapper.find(<span class="hljs-string">'.infos_container'</span>).length === <span class="hljs-number">0</span>;
    })
    .map(<span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
      <span class="hljs-keyword">const</span> $infosWrapper = $(e.target).parent().find(<span class="hljs-string">'.user_infos_wrapper'</span>);
      <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">conatiner</span>: $infosWrapper,
        <span class="hljs-attr">url</span>: $(e.target).attr(<span class="hljs-string">'data-api'</span>)
      }
    })
    .filter(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> !!data.url)
    <span class="hljs-comment">// getUser 来异步获取用户信息</span>
    .flatMapLatest(getUser)
    .do(<span class="hljs-function">(<span class="hljs-params">result</span>) =&gt;</span> {
      <span class="hljs-comment">// 将用户信息组建成为 DOM 元素，并插入到页面中。在这之后，该用户对应的 DOM 里就会拥有 infos_container 这个 div，所以 takeWhile 会返回 false。也就是说，之后再 hover 上去，流也不会被触发了</span>
      <span class="hljs-keyword">const</span> {data, conatiner} = result;
      showUserInfo(conatiner, data);
    });

  avatorMouseover.subscribe(<span class="hljs-function">(<span class="hljs-params">result</span>) =&gt;</span> {
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'fetch user info succeed'</span>);
  }, (err) =&gt; {
    <span class="hljs-built_in">console</span>.log(err);
  }, () =&gt; {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'completed'</span>);
  });
};</code></pre>
<p>上面的代码中有一个 API 需要讲解：<a href="http://reactivex.io/documentation/operators/takewhile.html" rel="nofollow noreferrer" target="_blank"><code>takeWhile</code></a></p>
<p><span class="img-wrap"><img data-src="/img/bVFTAU?w=1280&amp;h=610" src="https://static.alili.tech/img/bVFTAU?w=1280&amp;h=610" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>由图可知，当<code>takeWhile</code>中的回调返回<code>true</code>时，流可以正常进行；而一旦返回<code>false</code>，则之后的事件不会再发生，流将直接终止：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var source = Rx.Observable.range(1, 5)
    .takeWhile(function (x) { return x < 3; });

var subscription = source.subscribe(
    function (x) { console.log('Next: ' + x); },
    function (err) { console.log('Error: ' + err); },
    function () { console.log('Completed'); });
// Next: 0
// Next: 1
// Next: 2
// Completed" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> source = Rx.Observable.range(<span class="hljs-number">1</span>, <span class="hljs-number">5</span>)
    .takeWhile(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">x</span>) </span>{ <span class="hljs-keyword">return</span> x &lt; <span class="hljs-number">3</span>; });

<span class="hljs-keyword">var</span> subscription = source.subscribe(
    <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">x</span>) </span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Next: '</span> + x); },
    <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Error: '</span> + err); },
    <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Completed'</span>); });
<span class="hljs-comment">// Next: 0</span>
<span class="hljs-comment">// Next: 1</span>
<span class="hljs-comment">// Next: 2</span>
<span class="hljs-comment">// Completed</span></code></pre>
<hr>
<p>创建好针对<code>hover</code>的事件流，我们可以把它和上一个事件流结合起来：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/js/index.js
// ...
const initialUserInfoSteam = ($repos) => {
  const $avator = $repos.find('.user_header');
  // ...
}

const observable = Rx.Observable.fromEvent($input, 'keyup')
    // ...
    .do(($repos) => {
      $conatiner.append($repos);
      initialUserInfoSteam($repos);
    });
// ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// src/js/index.js</span>
<span class="hljs-comment">// ...</span>
<span class="hljs-keyword">const</span> initialUserInfoSteam = <span class="hljs-function">(<span class="hljs-params">$repos</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> $avator = $repos.find(<span class="hljs-string">'.user_header'</span>);
  <span class="hljs-comment">// ...</span>
}

<span class="hljs-keyword">const</span> observable = Rx.Observable.fromEvent($input, <span class="hljs-string">'keyup'</span>)
    <span class="hljs-comment">// ...</span>
    .do(<span class="hljs-function">(<span class="hljs-params">$repos</span>) =&gt;</span> {
      $conatiner.append($repos);
      initialUserInfoSteam($repos);
    });
<span class="hljs-comment">// ...</span></code></pre>
<p>现在这样就已经可以使用了，但依旧不够好。目前总共有两个流：监听 input <code>keyup</code>的流和监听<code>mouseover</code>的流。但是，因为用户头像是动态插入的 ，所以我们必须在<code>$conatiner.append($repos);</code>之后才能创建并监听<code>mouseover</code>。不过鉴于我们已经在最后的<code>do</code>方法里插入了获取的数据，所以可以试着把两个流合并到一起：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/js/index.js
// ...
const initialUserInfoSteam = ($repos) => {
  const $avator = $repos.find('.user_header');
  const avatorMouseover = Rx.Observable.fromEvent($avator, 'mouseover')
  // ... 流的处理跟之前的一样
  // 但我们不再需要 subscribe 它，而是返回这个 Observable
  return avatorMouseover;
};

const observable = Rx.Observable.fromEvent($input, 'keyup')
    // ...
    .do(($repos) => {
      $conatiner.append($repos);
      // 不再在 do 里面创建新的流并监听
      // initialUserInfoSteam($repos);
    })
    // 相反，我们继续这个流的传递，只是通过 flatMap 将原来的流变成了监听 mouseover 的流
    .flatMap(($repos) => {
      return initialUserInfoSteam($repos);
    });
// ..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// src/js/index.js</span>
<span class="hljs-comment">// ...</span>
<span class="hljs-keyword">const</span> initialUserInfoSteam = <span class="hljs-function">(<span class="hljs-params">$repos</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> $avator = $repos.find(<span class="hljs-string">'.user_header'</span>);
  <span class="hljs-keyword">const</span> avatorMouseover = Rx.Observable.fromEvent($avator, <span class="hljs-string">'mouseover'</span>)
  <span class="hljs-comment">// ... 流的处理跟之前的一样</span>
  <span class="hljs-comment">// 但我们不再需要 subscribe 它，而是返回这个 Observable</span>
  <span class="hljs-keyword">return</span> avatorMouseover;
};

<span class="hljs-keyword">const</span> observable = Rx.Observable.fromEvent($input, <span class="hljs-string">'keyup'</span>)
    <span class="hljs-comment">// ...</span>
    .do(<span class="hljs-function">(<span class="hljs-params">$repos</span>) =&gt;</span> {
      $conatiner.append($repos);
      <span class="hljs-comment">// 不再在 do 里面创建新的流并监听</span>
      <span class="hljs-comment">// initialUserInfoSteam($repos);</span>
    })
    <span class="hljs-comment">// 相反，我们继续这个流的传递，只是通过 flatMap 将原来的流变成了监听 mouseover 的流</span>
    .flatMap(<span class="hljs-function">(<span class="hljs-params">$repos</span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> initialUserInfoSteam($repos);
    });
<span class="hljs-comment">// ...</span></code></pre>
<p>DONE ！</p>
<h2 id="articleHeader7">APIS</h2>
<p>栗子中使用到的 RxJS API：</p>
<ul>
<li><p><a href="http://reactivex.io/documentation/operators/from.html" rel="nofollow noreferrer" target="_blank"><code>from</code></a> 通过一个可迭代对象来创建流</p></li>
<li><p><a href="http://reactivex.io/documentation/operators/from.html" rel="nofollow noreferrer" target="_blank"><code>fromEvent</code></a> 通过 DOM 事件来创建流</p></li>
<li><p><a href="http://reactivex.io/documentation/operators/debounce.html" rel="nofollow noreferrer" target="_blank"><code>debounce</code></a> 如果在一定时间内流中的某个事件不断被触发，则不会进行之后的事件操作</p></li>
<li><p><a href="http://reactivex.io/documentation/operators/map.html" rel="nofollow noreferrer" target="_blank"><code>map</code></a> 遍历流中所有事件，返回新的流</p></li>
<li><p><a href="http://reactivex.io/documentation/operators/filter.html" rel="nofollow noreferrer" target="_blank"><code>filter</code></a> 筛选流中所有事件，返回新的流</p></li>
<li><p><a href="http://reactivex.io/documentation/operators/flatmap.html" rel="nofollow noreferrer" target="_blank"><code>flatMap</code></a> 对各个事件返回的值进行处理并返回 Observable，然后将所有的 Observable 扁平化，成为一个新的 Observable</p></li>
<li><p><a href="http://reactivex.io/documentation/operators/flatmap.html" rel="nofollow noreferrer" target="_blank"><code>flatMapLatest</code></a> 对各个事件返回的值进行处理并返回 Observable，然后将所有的 Observable 扁平化，成为一个新的 Observable。但只会获取最后一次返回的 Observable，其他的返回结果不予处理</p></li>
<li><p><a href="http://reactivex.io/documentation/operators/distinct.html" rel="nofollow noreferrer" target="_blank"><code>distinctUntilChanged</code></a> 流中如果相邻事件的结果一样，则仅筛选出一个（剔除重复值）</p></li>
<li><p><a href="http://reactivex.io/documentation/operators/do.html" rel="nofollow noreferrer" target="_blank"><code>do</code></a> 可以依次拿到流上每个事件的返回值，利用其做一些无关流传递的事情</p></li>
<li><p><a href="http://reactivex.io/documentation/operators/takewhile.html" rel="nofollow noreferrer" target="_blank"><code>takeWhile</code></a> 给予流一个判断，只有当<code>takeWhile</code>中的回调返回<code>true</code>时，流才会继续执行；否则将中断之后的事件</p></li>
</ul>
<h2 id="articleHeader8">扩展阅读</h2>
<ul>
<li><p><a href="http://stackoverflow.com/questions/30840247/what-does-rxjs-observable-debounce-do" rel="nofollow noreferrer" target="_blank">What does RxJS observable debounce do</a></p></li>
<li><p><a href="https://github.com/Reactive-Extensions/RxJS/blob/master/doc/howdoi/jquery.md" rel="nofollow noreferrer" target="_blank">How do I work with jQuery and RxJS</a></p></li>
<li><p><a href="http://reactivex.io/documentation/operators.html" rel="nofollow noreferrer" target="_blank">Introduction of observable operators</a></p></li>
<li><p><a href="https://github.com/ecmadao/rxjs-example" rel="nofollow noreferrer" target="_blank">文章源码 - rxjs-example</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
探索 RxJS - 做一个 github 小应用

## 原文链接
[https://segmentfault.com/a/1190000007562818](https://segmentfault.com/a/1190000007562818)

