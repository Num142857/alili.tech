---
title: 'RxJS: 详解forkJoin, zip, combineLatest之间的区别' 
date: 2018-12-22 2:30:11
hidden: true
slug: pl6bkvedxq
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">前言</h3>
<p><code>forkJoin</code>, <code>zip</code>, <code>combineLatest</code>是<code>rxjs</code>中的合并操作符，用于对多个流进行合并。很多人第一次接触<code>rxjs</code>时往往分不清它们之间的区别，其实这很正常，因为当你准备用来合并的流是那种只会发射一次数据就关闭的流时（比如<code>http</code>请求），就结果而言这三个操作符没有任何区别。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ob1 = Rx.Observable.of(1).delay(1000);
const ob2 = Rx.Observable.of(2).delay(2000);
const ob3 = Rx.Observable.of(3).delay(3000);

Rx.Observable.forkJoin(ob1, ob2, ob3).subscribe((data) => console.log(data));
Rx.Observable.zip(ob1, ob2, ob3).subscribe((data) => console.log(data));
Rx.Observable.combineLatest(ob1, ob2, ob3).subscribe((data) => console.log(data));

// [1, 2, 3]
// [1, 2, 3]
// [1, 2, 3]
// 都是在3秒的时候打印" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code>const ob1 = <span class="hljs-literal">Rx</span>.Observable.of(<span class="hljs-number">1</span>).delay(<span class="hljs-number">1000</span>);
const ob2 = <span class="hljs-literal">Rx</span>.Observable.of(<span class="hljs-number">2</span>).delay(<span class="hljs-number">2000</span>);
const ob3 = <span class="hljs-literal">Rx</span>.Observable.of(<span class="hljs-number">3</span>).delay(<span class="hljs-number">3000</span>);

<span class="hljs-literal">Rx</span>.Observable.forkJoin(ob1, ob2, ob3).subscribe((<span class="hljs-built_in">data</span>) =&gt; console.<span class="hljs-keyword">log</span>(<span class="hljs-built_in">data</span>));
<span class="hljs-literal">Rx</span>.Observable.zip(ob1, ob2, ob3).subscribe((<span class="hljs-built_in">data</span>) =&gt; console.<span class="hljs-keyword">log</span>(<span class="hljs-built_in">data</span>));
<span class="hljs-literal">Rx</span>.Observable.combineLatest(ob1, ob2, ob3).subscribe((<span class="hljs-built_in">data</span>) =&gt; console.<span class="hljs-keyword">log</span>(<span class="hljs-built_in">data</span>));

<span class="hljs-comment">// [1, 2, 3]</span>
<span class="hljs-comment">// [1, 2, 3]</span>
<span class="hljs-comment">// [1, 2, 3]</span>
<span class="hljs-comment">// 都是在3秒的时候打印</span></code></pre>
<p><code>rxjs</code>中很多操作符功能相近，只有当其操作的流会多次发射数据时才会体现出它们之间的区别，下面我们来详细解释<code>forkJoin</code>, <code>zip</code>, 和<code>combineLatest</code>。</p>
<h3 id="articleHeader1">一个基本概念</h3>
<p>首先我们要知道，一个流（或者说<code>Observable</code>序列）的生命周期中，每次发射数据会发出<code>next</code>信号（<code>Notification</code>），结束发射时会发出<code>complete</code>信号，发生错误时发出<code>error</code>信号，三个信号分别对应<code>observer</code>的三个方法。<code>next</code>信号会由于发射源的不同发射0到多次；而<code>complete</code>和<code>error</code>仅会发射其中一个，且只发射一次，标志着流的结束。<br><code>subscribe</code>接收一个<code>observer</code>对象用来处理上述三种信号，只传入一个函数会被认为是<code>next</code>方法，因此传入<code>subscribe</code>的<code>next</code>方法会执行0到N次，N为序列正常发射信号的次数。</p>
<h3 id="articleHeader2"><code>forkJoin</code></h3>
<p>用<code>forkJoin</code>合并的流，会在每个被合并的流都发出结束信号时发射一次也是唯一一次数据。假设我们有两个流：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ob1 = Rx.Observable.interval(1000).map(d => `ob1:${d}`).take(3);
const ob2 = Rx.Observable.interval(2000).map(d => `ob2:${d}`).take(2);

Rx.Observable.forkJoin(ob1, ob2).subscribe((data) => console.log(data));
// [&quot;ob1:2&quot;, &quot;ob2:1&quot;]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> ob1 = Rx.Observable.interval(<span class="hljs-number">1000</span>).map(<span class="hljs-function"><span class="hljs-params">d</span> =&gt;</span> <span class="hljs-string">`ob1:<span class="hljs-subst">${d}</span>`</span>).take(<span class="hljs-number">3</span>);
<span class="hljs-keyword">const</span> ob2 = Rx.Observable.interval(<span class="hljs-number">2000</span>).map(<span class="hljs-function"><span class="hljs-params">d</span> =&gt;</span> <span class="hljs-string">`ob2:<span class="hljs-subst">${d}</span>`</span>).take(<span class="hljs-number">2</span>);

Rx.Observable.forkJoin(ob1, ob2).subscribe(<span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(data));
<span class="hljs-comment">// ["ob1:2", "ob2:1"]</span></code></pre>
<p><code>ob1</code>会在发射完第三个数据时停止发射，<code>ob2</code>会在发射完第二个数据时停止，而<code>forkJoin</code>合并后的流会等到<code>ob1</code>和<code>ob2</code>都结束时，发射一次数据，也就是触发一次<code>subscribe</code>里的回调，接收到的数据为<code>ob1</code>和<code>ob2</code>发射的最后一次数据的数组。</p>
<h3 id="articleHeader3"><code>zip</code></h3>
<p><code>zip</code>工作原理如下，当每个传入<code>zip</code>的流都发射完毕第一次数据时，<code>zip</code>将这些数据合并为数组并发射出去；当这些流都发射完第二次数据时，<code>zip</code>再次将它们合并为数组并发射。以此类推直到其中某个流发出结束信号，整个被合并后的流结束，不再发射数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ob1 = Rx.Observable.interval(1000).map(d => `ob1:${d}`).take(3);
const ob2 = Rx.Observable.interval(2000).map(d => `ob2:${d}`).take(2);

Rx.Observable.zip(ob1, ob2).subscribe({
  next: (data) => console.log(data),
  complete: () => console.log('complete')
});
// [&quot;ob1:0&quot;, &quot;ob2:0&quot;] ob1等待ob2发射数据，之后合并
// [&quot;ob1:1&quot;, &quot;ob2:1&quot;] 此时ob2结束，整个合并的流也结束
// &quot;complete&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> ob1 = Rx.Observable.interval(<span class="hljs-number">1000</span>).map(<span class="hljs-function"><span class="hljs-params">d</span> =&gt;</span> <span class="hljs-string">`ob1:<span class="hljs-subst">${d}</span>`</span>).take(<span class="hljs-number">3</span>);
<span class="hljs-keyword">const</span> ob2 = Rx.Observable.interval(<span class="hljs-number">2000</span>).map(<span class="hljs-function"><span class="hljs-params">d</span> =&gt;</span> <span class="hljs-string">`ob2:<span class="hljs-subst">${d}</span>`</span>).take(<span class="hljs-number">2</span>);

Rx.Observable.zip(ob1, ob2).subscribe({
  <span class="hljs-attr">next</span>: <span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(data),
  <span class="hljs-attr">complete</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'complete'</span>)
});
<span class="hljs-comment">// ["ob1:0", "ob2:0"] ob1等待ob2发射数据，之后合并</span>
<span class="hljs-comment">// ["ob1:1", "ob2:1"] 此时ob2结束，整个合并的流也结束</span>
<span class="hljs-comment">// "complete"</span></code></pre>
<p><code>zip</code>和<code>forkJoin</code>的区别在于，<code>forkJoin</code>仅会合并各个子流最后发射的一次数据，触发一次回调；<code>zip</code>会等待每个子流都发射完一次数据然后合并发射，之后继续等待，直到其中某个流结束（因为此时不能使合并的数据包含每个子流的数据）。</p>
<h3 id="articleHeader4"><code>combineLatest</code></h3>
<p><code>combineLatest</code>与<code>zip</code>很相似，<code>combineLatest</code>一开始也会等待每个子流都发射完一次数据，但是在合并时，如果子流1在等待其他流发射数据期间又发射了新数据，则使用子流最新发射的数据进行合并，之后每当有某个流发射新数据，不再等待其他流同步发射数据，而是使用其他流之前的最近一次数据进行合并。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ob1 = Rx.Observable.interval(1000).map(d => `ob1:${d}`).take(3);
const ob2 = Rx.Observable.interval(2000).map(d => `ob2:${d}`).take(2);

Rx.Observable.combineLatest(ob1, ob2).subscribe({
  next: (data) => console.log(data),
  complete: () => console.log('complete')
});
// [&quot;ob1:1&quot;, &quot;ob2:0&quot;] ob1等待ob2发射，当ob2发射时ob1已经发射了第二次数据，使用ob1的第二次数据
// [&quot;ob1:2&quot;, &quot;ob2:0&quot;] ob1继续发射第三次也是最后一次数据，ob2虽然还未发射，但是可以使用它上一次的数据
// [&quot;ob1:2&quot;, &quot;ob2:1&quot;] ob2发射第二次也是最后一次数据，使ob1上一次的数据。
// &quot;complete&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> ob1 = Rx.Observable.interval(<span class="hljs-number">1000</span>).map(<span class="hljs-function"><span class="hljs-params">d</span> =&gt;</span> <span class="hljs-string">`ob1:<span class="hljs-subst">${d}</span>`</span>).take(<span class="hljs-number">3</span>);
<span class="hljs-keyword">const</span> ob2 = Rx.Observable.interval(<span class="hljs-number">2000</span>).map(<span class="hljs-function"><span class="hljs-params">d</span> =&gt;</span> <span class="hljs-string">`ob2:<span class="hljs-subst">${d}</span>`</span>).take(<span class="hljs-number">2</span>);

Rx.Observable.combineLatest(ob1, ob2).subscribe({
  <span class="hljs-attr">next</span>: <span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(data),
  <span class="hljs-attr">complete</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'complete'</span>)
});
<span class="hljs-comment">// ["ob1:1", "ob2:0"] ob1等待ob2发射，当ob2发射时ob1已经发射了第二次数据，使用ob1的第二次数据</span>
<span class="hljs-comment">// ["ob1:2", "ob2:0"] ob1继续发射第三次也是最后一次数据，ob2虽然还未发射，但是可以使用它上一次的数据</span>
<span class="hljs-comment">// ["ob1:2", "ob2:1"] ob2发射第二次也是最后一次数据，使ob1上一次的数据。</span>
<span class="hljs-comment">// "complete"</span></code></pre>
<p>本期内容结束，下一期会继续带来<code>rxjs</code>的其他操作符或者概念详解。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
RxJS: 详解forkJoin, zip, combineLatest之间的区别

## 原文链接
[https://segmentfault.com/a/1190000012369871](https://segmentfault.com/a/1190000012369871)

