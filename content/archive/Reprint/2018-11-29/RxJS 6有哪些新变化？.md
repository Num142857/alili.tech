---
title: 'RxJS 6有哪些新变化？' 
date: 2018-11-29 9:34:56
hidden: true
slug: alhnm8xgk0n
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">RxJS 6有哪些新变化？</h1>
<p>RxJs 6于2018年4月24日正式发布，为开发人员带来了一些令人兴奋的增补和改进。Ben Lesh, rxJS核心开发成员，强调：</p>
<ol>
<li>RxJS 6在拥有更小API的同时，带来了更整洁的引入方式</li>
<li>提供一个npm包，该package可以处理RxJS的向后兼容性，使得开发人员可以在不更改代码的情况下进行更新，同时还可以帮助TypeScript代码自动迁移。</li>
</ol>
<p>RxJs 6这些新的改动为开发人员提供了以下三方面的优化：模块化方面的改进、性能提升、调试更方便。RxJs团队尽力保持新版本的向后兼容性，但是为了减少RxJs的API数量，还是引入了一些重大修改。</p>
<p>下面让我们一起来看一下RxJs团队在新版本中引入了哪些修改。</p>
<h2 id="articleHeader1">RxJS 6的向后兼容性</h2>
<p>为了便捷地从RxJS 5迁移到RxJS 6，RxJS团队发布了一个名为<code>rxjs-compa</code>t的兄弟软件包。该软件包在<code>v6</code>和<code>v5</code>的API之间创建了一个兼容层。<br>RxJs团队建议开发人员通过安装<code>^6.0.0</code>版本的<code>rxjs</code>和<code>rxjs-compat</code>包来升级现有应用:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install rxjs@6 rxjs-compat@6 --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install rxjs@6 rxjs-compat@6 --save</code></pre>
<p>此包允许您在升级RxJS 6的同时继续运行现有代码库，而不会出现问题。他支持在RxJs 6中移除掉的功能。<br>安装<code>rxjs-compat</code>会导致打包后代码包体积的增加，如果你使用的是4.0.0版本以下的Webpack，该影响会被放大。<br>因此建议升级完成后将<code>rxjs-compat</code>移除。</p>
<h2 id="articleHeader2">使用rxjs-compat升级RxJS的限制</h2>
<p>只有两个重大修改在<code>rxjs-compat</code>中未覆盖：</p>
<h3 id="articleHeader3">TypeScript原型操作符</h3>
<p>在极少数情况下，您的代码库定义了它自己的TypeScript原型操作符并修改了<code>Observable</code>命名空间。该情况下，您需要更新你的操作符相关代码才能使TypeScript正常编译。</p>
<p>在版本发布说明中，用户自定义的原型操作符可按如下方式创建：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Observable.prototype.userDefined = () => {
  return new Observable((subscriber) => {
    this.subscribe({
      next(value) { subscriber.next(value); },
      error(err) { subscriber.error(err); },
      complete() { subscriber.complete(); },
   });
  });
});

source$.userDefined().subscribe();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Observable.prototype.userDefined = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Observable(<span class="hljs-function">(<span class="hljs-params">subscriber</span>) =&gt;</span> {
    <span class="hljs-keyword">this</span>.subscribe({
      next(value) { subscriber.next(value); },
      error(err) { subscriber.error(err); },
      complete() { subscriber.complete(); },
   });
  });
});

source$.userDefined().subscribe();</code></pre>
<p>为编译该类型的自定义操作符，需要做如下修改：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const userDefined = <T>() => (source: Observable<T>) => new Observable<T>((subscriber) => {
    this.subscribe({
      next(value) { subscriber.next(value); },
      error(err) { subscriber.error(err); },
      complete() { subscriber.complete(); },
   });
  });
});

source$.pipe(
  userDefined(),
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> userDefined = &lt;T&gt;() =&gt; (source: Observable&lt;T&gt;) =&gt; new Observable&lt;T&gt;((subscriber) =&gt; {
    this.subscribe({
      next(value) { subscriber.next(value); },
      error(err) { subscriber.error(err); },
      complete() { subscriber.complete(); },
   });
  });
});

source$.pipe(
  userDefined(),
)</code></pre>
<h3 id="articleHeader4">同步错误处理</h3>
<p>不再支持在<code>try / catch</code>块内调用<code>Observable.subscribe()</code>。使用用<code>Observable.subscribe()</code>方法中的错误回调方法替换原先的<code>try / catch</code>块来完成的异步错误的处理。<br>示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// deprecated
try {
  source$.subscribe(nextFn, undefined, completeFn);
} catch (err) {
  handleError(err);
}

// use instead
source$.subscribe(nextFn, handleError, completeFn);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// deprecated</span>
<span class="hljs-keyword">try</span> {
  source$.subscribe(nextFn, <span class="hljs-literal">undefined</span>, completeFn);
} <span class="hljs-keyword">catch</span> (err) {
  handleError(err);
}

<span class="hljs-comment">// use instead</span>
source$.subscribe(nextFn, handleError, completeFn);</code></pre>
<p>现在在<code>Observable.subscribe()</code>中必须定义一个错误回调方法来异步处理错误。</p>
<h2 id="articleHeader5">删除RxJs兼容层前需要做的修改</h2>
<p>如上所诉，<code>rxjs-compat</code>提供了<code>V5</code>与<code>v6</code>API间的临时兼容层，实质上<code>rxjs-compat</code>为您的代码库提供了所需的<code>v5</code>版本功能，使得您可以逐步将您的代码库升级到v6版本。为了完成升级并移除<code>rxjs-compat</code>依赖，您的代码库需要重构并停止使用<code>v5</code>版本中的如下功能：</p>
<h3 id="articleHeader6">修改<code>import</code>路径</h3>
<p>建议TypeScript开发人员使用<code>rxjs-tslint</code>来重构<code>import</code>路径。<br>RxJS团队设计了以下规则来帮助JavaScript开发人员重构<code>import</code>路径：</p>
<ul>
<li>
<p><code>rxjs</code>: 包含创建方法，类型，调度程序和工具库。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Observable, Subject, asapScheduler, pipe, of, from, interval, merge, fromEvent } from 'rxjs';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> { Observable, Subject, asapScheduler, pipe, <span class="hljs-keyword">of</span>, <span class="hljs-keyword">from</span>, interval, merge, fromEvent } <span class="hljs-keyword">from</span> <span class="hljs-string">'rxjs'</span>;</code></pre>
</li>
<li>
<p><code>rxjs/operators</code>: 包含所有的管道操作符</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { map, filter, scan } from 'rxjs/operators';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> { map, filter, scan } <span class="hljs-keyword">from</span> <span class="hljs-string">'rxjs/operators'</span>;</code></pre>
</li>
<li>
<p><code>rxjs/webSocket</code>: 包含websocket subject实现.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { webSocket } from 'rxjs/webSocket';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> { webSocket } <span class="hljs-keyword">from</span> <span class="hljs-string">'rxjs/webSocket'</span>;</code></pre>
</li>
<li>
<p><code>rxjs/ajax</code>: 包含Rx ajax实现.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { ajax } from 'rxjs/ajax';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> { ajax } <span class="hljs-keyword">from</span> <span class="hljs-string">'rxjs/ajax'</span>;</code></pre>
</li>
<li>
<p><code>rxjs/testing</code>: 包含RxJS的测试工具库.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { TestScheduler } from 'rxjs/testing';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> { TestScheduler } <span class="hljs-keyword">from</span> <span class="hljs-string">'rxjs/testing'</span>;</code></pre>
</li>
</ul>
<p>以下是一项小调查：您是否有常识使用<code>rxjs-tslint</code>升级您的应用程序？<br><span class="img-wrap"><img data-src="/img/bVbaUii?w=502&amp;h=386" src="https://static.alili.tech/img/bVbaUii?w=502&amp;h=386" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader7">使用管道操作而不是链式操作</h3>
<p>使用新的管道操作符语法替换旧有的链式操作。上一个操作符方法的结果会被传递到下一个操作符方法中。<br>不要移除<code>rxjs-compat</code>包，直到你将所有的链式操作修改为管道操作符。如果您使用TypeScript, <code>ts-lint</code>会在某种程度上自动执行此项重构。<br>Ben Lesh在<a href="https://www.ng-conf.org/sessions/introducing-rxjs6/" rel="nofollow noreferrer" target="_blank">ng-conf 2018</a>上解释了<a href="https://youtu.be/JCXZhe6KsxQ?t=2m30s" rel="nofollow noreferrer" target="_blank">为什么我们应该使用管道操作符</a>。</p>
<p>请按照如下步骤将您的链式操作替换为管道操作：</p>
<ul>
<li>
<p>从<code>rxjs-operators</code>中引入您需要的操作符</p>
<blockquote>注意：由于与Javascript保留字冲突，以下运算符名字做了修改：<code>do</code> -&gt; <code>tap</code>, <code>catch</code> -&gt;<br><code>catchError</code>, <code>switch</code> -&gt; <code>switchAll</code>, <code>finally</code> -&gt; <code>finalize</code>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { map, filter, catchError, mergeMap } from 'rxjs/operators';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">import</span> { map, filter, catchError, mergeMap } <span class="hljs-keyword">from</span> <span class="hljs-string">'rxjs/operators'</span>;</code></pre>
</li>
<li>
<p>使用<code>pipe()</code>包裹所有的操作符方法。确保所有操作符间的<code>.</code>被移除，转而使用<code>,</code>连接。记住！！！有些操作符的名称变了！！！<br>以下为升级示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// an operator chain
source
  .map(x => x + x)
  .mergeMap(n => of(n + 1, n + 2)
    .filter(x => x % 1 == 0)
    .scan((acc, x) => acc + x, 0)
  )
  .catch(err => of('error found'))
  .subscribe(printResult);

// must be updated to a pipe flow

source.pipe(
  map(x => x + x),
  mergeMap(n => of(n + 1, n + 2).pipe(
    filter(x => x % 1 == 0),
    scan((acc, x) => acc + x, 0),
  )),
  catchError(err => of('error found')),
).subscribe(printResult);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// an operator chain</span>
source
  .map(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> x + x)
  .mergeMap(<span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> <span class="hljs-keyword">of</span>(n + <span class="hljs-number">1</span>, n + <span class="hljs-number">2</span>)
    .filter(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> x % <span class="hljs-number">1</span> == <span class="hljs-number">0</span>)
    .scan(<span class="hljs-function">(<span class="hljs-params">acc, x</span>) =&gt;</span> acc + x, <span class="hljs-number">0</span>)
  )
  .catch(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> <span class="hljs-keyword">of</span>(<span class="hljs-string">'error found'</span>))
  .subscribe(printResult);

<span class="hljs-comment">// must be updated to a pipe flow</span>

source.pipe(
  map(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> x + x),
  mergeMap(<span class="hljs-function"><span class="hljs-params">n</span> =&gt;</span> <span class="hljs-keyword">of</span>(n + <span class="hljs-number">1</span>, n + <span class="hljs-number">2</span>).pipe(
    filter(<span class="hljs-function"><span class="hljs-params">x</span> =&gt;</span> x % <span class="hljs-number">1</span> == <span class="hljs-number">0</span>),
    scan(<span class="hljs-function">(<span class="hljs-params">acc, x</span>) =&gt;</span> acc + x, <span class="hljs-number">0</span>),
  )),
  catchError(<span class="hljs-function"><span class="hljs-params">err</span> =&gt;</span> <span class="hljs-keyword">of</span>(<span class="hljs-string">'error found'</span>)),
).subscribe(printResult);</code></pre>
<p>注意我们在以上代码中嵌套使用了<code>pipe()</code>。</p>
</li>
</ul>
<h3 id="articleHeader8">使用函数而不是类</h3>
<p>使用函数而不是类来操作可观察对象(Observables)。所有的Observable类已被移除。他们的功能被新旧操作符及函数替代。这些替代品的功能与之前的类功能一模一样。<br>示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// removed
ArrayObservable.create(myArray)

// use instead

from(myArray)

// you may also use

new operator fromArray()." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// removed</span>
ArrayObservable.create(myArray)

<span class="hljs-comment">// use instead</span>

<span class="hljs-keyword">from</span>(myArray)

<span class="hljs-comment">// you may also use</span>

<span class="hljs-keyword">new</span> operator fromArray().</code></pre>
<p>有关替换<code>v5</code>类为<code>v6</code>函数的完整列表，请查看<a href="https://github.com/ReactiveX/rxjs" rel="nofollow noreferrer" target="_blank">RxJS文档</a>。</p>
<h4>特殊情况</h4>
<ul>
<li>
<code>ConnectableObservable</code>在v6中不能直接使用，要访问它，请使用操作符<code>multicast</code>，<code>publish</code>，<code>publishReplay</code>和<code>publishLast</code>。</li>
<li>
<code>SubscribeOnObservable</code>在v6中不能直接使用，要访问它，请使用操作符<code>subscribeOn</code>
</li>
</ul>
<h3 id="articleHeader9">移除<code>resultSelector</code>
</h3>
<p>Result Selectors是一项没有被广泛使用甚至没有文档说明的RxJs特性，同时Result Selectors严重的增加了RxJs代码库的体积，因此RxJs团队决定弃用或删除他。</p>
<p>对于使用到该功能的开发人员，他们需要将<code>esultSelector</code>参数替换为外部代码。</p>
<p>对于<code>first()</code>, <code>last()</code>这两个函数，这些参数已被移除，在删除<code>rxjs-compat</code>之前务必升级代码。</p>
<p>对于其他拥有<code>resultSelector</code>参数的函数，如<code>mapping</code>操作符，该参数已被弃用，并<br>以其他方式重写。如果您移除<code>rxjs-compat</code>，这些函数仍可正常工作，但是RxJs团队声明他们必须在v7版本发布之前将其移除。</p>
<p>针对该情况的更多详情，请查阅<a href="https://github.com/ReactiveX/rxjs" rel="nofollow noreferrer" target="_blank">RxJs文档</a></p>
<h2 id="articleHeader10">其他RxJs6弃用</h2>
<h3 id="articleHeader11">
<code>Observable.if</code> and <code>Observable.throw</code>
</h3>
<p><code>Observable.if</code>已被<code>iif()</code>取代，<code>Observable.throw</code>已被<code>throwError()</code>取代。您可使用<code>rxjs-tslint</code>将这些废弃的成员方法修改为函数调用。</p>
<p>代码示例如下：</p>
<h4>OBSERVABLE.IF &gt; IIF()</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// deprecated
Observable.if(test, a$, b$);

// use instead

iif(test, a$, b$);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// deprecated</span>
Observable.if(test, a$, b$);

<span class="hljs-comment">// use instead</span>

iif(test, a$, b$);</code></pre>
<h4>OBSERVABLE.ERROR &gt; THROWERROR()</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// deprecated
Observable.throw(new Error());

//use instead

throwError(new Error());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// deprecated</span>
Observable.throw(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>());

<span class="hljs-comment">//use instead</span>

throwError(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>());</code></pre>
<h3 id="articleHeader12">已弃用的方法</h3>
<p>根据迁移指南，以下方法已被弃用或重构：</p>
<h4>merge</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { merge } from 'rxjs/operators';
a$.pipe(merge(b$, c$));

// becomes

import { merge } from 'rxjs';
merge(a$, b$, c$);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { merge } <span class="hljs-keyword">from</span> <span class="hljs-string">'rxjs/operators'</span>;
a$.pipe(merge(b$, c$));

<span class="hljs-comment">// becomes</span>

<span class="hljs-keyword">import</span> { merge } <span class="hljs-keyword">from</span> <span class="hljs-string">'rxjs'</span>;
merge(a$, b$, c$);</code></pre>
<h4>concat</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { concat } from 'rxjs/operators';
a$.pipe(concat(b$, c$));

// becomes

import { concat } from 'rxjs';
concat(a$, b$, c$);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { concat } <span class="hljs-keyword">from</span> <span class="hljs-string">'rxjs/operators'</span>;
a$.pipe(concat(b$, c$));

<span class="hljs-comment">// becomes</span>

<span class="hljs-keyword">import</span> { concat } <span class="hljs-keyword">from</span> <span class="hljs-string">'rxjs'</span>;
concat(a$, b$, c$);</code></pre>
<h4>combineLatest</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { combineLatest } from 'rxjs/operators';
a$.pipe(combineLatest(b$, c$));

// becomes

import { combineLatest } from 'rxjs';
combineLatest(a$, b$, c$);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { combineLatest } <span class="hljs-keyword">from</span> <span class="hljs-string">'rxjs/operators'</span>;
a$.pipe(combineLatest(b$, c$));

<span class="hljs-comment">// becomes</span>

<span class="hljs-keyword">import</span> { combineLatest } <span class="hljs-keyword">from</span> <span class="hljs-string">'rxjs'</span>;
combineLatest(a$, b$, c$);</code></pre>
<h4>race</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { race } from 'rxjs/operators';
a$.pipe(race(b$, c$));

// becomes

import { race } from 'rxjs';
race(a$, b$, c$);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { race } <span class="hljs-keyword">from</span> <span class="hljs-string">'rxjs/operators'</span>;
a$.pipe(race(b$, c$));

<span class="hljs-comment">// becomes</span>

<span class="hljs-keyword">import</span> { race } <span class="hljs-keyword">from</span> <span class="hljs-string">'rxjs'</span>;
race(a$, b$, c$);</code></pre>
<h4>zip</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { zip } from 'rxjs/operators';
a$.pipe(zip(b$, c$));

// becomes

import { zip } from 'rxjs';
zip(a$, b$, c$);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { zip } <span class="hljs-keyword">from</span> <span class="hljs-string">'rxjs/operators'</span>;
a$.pipe(zip(b$, c$));

<span class="hljs-comment">// becomes</span>

<span class="hljs-keyword">import</span> { zip } <span class="hljs-keyword">from</span> <span class="hljs-string">'rxjs'</span>;
zip(a$, b$, c$);</code></pre>
<h2 id="articleHeader13">总结</h2>
<p>RxJS 6带来了一些重大改变，但是通过添加rxjs-compat软件包可以缓解这一问题，该软件包允许您在保持v5代码运行的同时逐渐迁移。对于Typescript用户，其他中包括大多数Angular开发人员，<code>tslint</code>提供了大量的自动重构功能，使转换变得更加简单。</p>
<p>任何升级与代码修改都会引入一些bug到代码库中。因此请务必测试您的功能以确保您的终端用户最终接受到相同的质量体验。</p>
<p>视频：<a href="https://youtu.be/JCXZhe6KsxQ" rel="nofollow noreferrer" target="_blank">RxJS 6详细介绍 by Ben Lesh</a></p>
<p><a href="https://auth0.com/blog/whats-new-in-rxjs-6/" rel="nofollow noreferrer" target="_blank">原文链接</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
RxJS 6有哪些新变化？

## 原文链接
[https://segmentfault.com/a/1190000014956260](https://segmentfault.com/a/1190000014956260)

