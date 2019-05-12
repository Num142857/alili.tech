---
title: '使用 RxJS 处理多个 Http 请求' 
date: 2019-01-09 2:30:12
hidden: true
slug: junqhkh9awn
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>阅读 Angular 6/RxJS 最新教程，请访问<a href="http://www.semlinker.com/" rel="nofollow noreferrer" target="_blank">前端修仙之路</a>
</blockquote>
<p>有时候进入某个页面时，我们需要从多个 API 地址获取数据然后进行显示。管理多个异步数据请求会比较困难，但我们可以借助 Angular Http 服务和 RxJS 库提供的功能来实现上述的功能。处理多个请求有多种方式，使用串行或并行的方式。</p>
<h2 id="articleHeader0">基础知识</h2>
<h3 id="articleHeader1">mergeMap</h3>
<p>mergeMap 操作符用于从内部的 Observable 对象中获取值，然后返回给父级流对象。</p>
<ul><li>合并 Observable 对象 ( <a href="http://jsbin.com/kodaqud/edit?js,console" rel="nofollow noreferrer" target="_blank">jsBin</a>)</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const source = Rx.Observable.of('Hello');
//map to inner observable and flatten
const example = source.mergeMap(val => Rx.Observable.of(`${val} World!`));

const subscribe = example.subscribe(val => console.log(val)); //output: 'Hello World!'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">const</span> source = Rx.Observable.of(<span class="hljs-string">'Hello'</span>);
<span class="hljs-comment">//map to inner observable and flatten</span>
<span class="hljs-keyword">const</span> example = source.mergeMap(<span class="hljs-function"><span class="hljs-params">val</span> =&gt;</span> Rx.Observable.of(<span class="hljs-string">`<span class="hljs-subst">${val}</span> World!`</span>));

<span class="hljs-keyword">const</span> subscribe = example.subscribe(<span class="hljs-function"><span class="hljs-params">val</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(val)); <span class="hljs-comment">//output: 'Hello World!'</span></code></pre>
<p>在上面示例中包含两种 Observable 类型：</p>
<ul>
<li>源 Observable 对象 - 即 source 对象</li>
<li>内部 Observable 对象 - 即 Rx.Observable.of(`${val} World!`) 对象</li>
</ul>
<p>仅当内部的 Observable 对象发出值后，才会合并源 Observable 对象输出的值，并最终输出合并的值。</p>
<h3 id="articleHeader2">forkJoin</h3>
<p>forkJoin 是 Rx 版本的 <code>Promise.all()</code>，即表示等到所有的 Observable 都完成后，才一次性返回值。</p>
<ul><li>合并多个 Observable 对象 (<a href="http://jsbin.com/mohipez/edit?js,console" rel="nofollow noreferrer" target="_blank">jsBin</a>)</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const getPostOne$ = Rx.Observable.timer(1000).mapTo({id: 1});
const getPostTwo$ = Rx.Observable.timer(2000).mapTo({id: 2});

Rx.Observable.forkJoin(getPostOne$, getPostTwo$).subscribe(
  res => console.log(res) // [{id: 1}, {id: 2}]
); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">const</span> getPostOne$ = Rx.Observable.timer(<span class="hljs-number">1000</span>).mapTo({id: <span class="hljs-number">1</span>});
<span class="hljs-keyword">const</span> getPostTwo$ = Rx.Observable.timer(<span class="hljs-number">2000</span>).mapTo({id: <span class="hljs-number">2</span>});

Rx.Observable.forkJoin(getPostOne$, getPostTwo$).subscribe(
  <span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(res) <span class="hljs-comment">// [{id: 1}, {id: 2}]</span>
); </code></pre>
<h2 id="articleHeader3">处理 Http 请求</h2>
<p>我们先来看一下 Angular Http 服务简单示例。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  template: `
    <p>HttpModule Demo</p>
  `
})
export class AppComponent implements OnInit {
  constructor(private http: Http) { }

  ngOnInit() {
    this.http.get('https://jsonplaceholder.typicode.com/users')
      .map(res => res.json())
      .subscribe(users => console.log(users));
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component, OnInit } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> { Http } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/http'</span>;

<span class="hljs-keyword">import</span> <span class="hljs-string">'rxjs/add/operator/map'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'app-root'</span>,
  template: <span class="hljs-string">`
    &lt;p&gt;HttpModule Demo&lt;/p&gt;
  `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent <span class="hljs-keyword">implements</span> OnInit {
  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> http: Http</span>) { }

  ngOnInit() {
    <span class="hljs-keyword">this</span>.http.get(<span class="hljs-string">'https://jsonplaceholder.typicode.com/users'</span>)
      .map(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> res.json())
      .subscribe(<span class="hljs-function"><span class="hljs-params">users</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(users));
  }
}</code></pre>
<p>上面示例中，我们通过依赖注入方式注入 <code>http</code> 服务，然后在 <code>ngOnInit()</code> 方法中调用 http 对象的 <code>get()</code> 方法来获取数据。这个例子很简单，它只处理一个请求，接下来我们来看一下如何处理两个请求。</p>
<h3 id="articleHeader4">Map 和 Subscribe</h3>
<p>有些时候，当我们发送下一个请求时，需要依赖于上一个请求的数据。即我们在需要在上一个请求的回调函数中获取相应数据，然后在发起另一个 HTTP 请求。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-root',
  template: `
    <p>"{{"username"}}" Detail Info</p>
    "{{"user | json"}}"
  `
})
export class AppComponent implements OnInit {
  constructor(private http: Http) { }

  apiUrl = 'https://jsonplaceholder.typicode.com/users';
  username: string = '';
  user: any;

  ngOnInit() {
    this.http.get(this.apiUrl)
      .map(res => res.json())
      .subscribe(users => {
        let username = users[6].username;
        this.http.get(`${this.apiUrl}?username=${username}`)
          .map(res => res.json())
          .subscribe(
            user => {
              this.username = username;
              this.user = user;
            });
      });
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component, OnInit } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> { Http } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/http'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'rxjs/add/operator/map'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'app-root'</span>,
  template: <span class="hljs-string">`
    &lt;p&gt;"{{"username"}}" Detail Info&lt;/p&gt;
    "{{"user | json"}}"
  `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent <span class="hljs-keyword">implements</span> OnInit {
  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> http: Http</span>) { }

  apiUrl = <span class="hljs-string">'https://jsonplaceholder.typicode.com/users'</span>;
  username: <span class="hljs-built_in">string</span> = <span class="hljs-string">''</span>;
  user: <span class="hljs-built_in">any</span>;

  ngOnInit() {
    <span class="hljs-keyword">this</span>.http.get(<span class="hljs-keyword">this</span>.apiUrl)
      .map(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> res.json())
      .subscribe(<span class="hljs-function"><span class="hljs-params">users</span> =&gt;</span> {
        <span class="hljs-keyword">let</span> username = users[<span class="hljs-number">6</span>].username;
        <span class="hljs-keyword">this</span>.http.get(<span class="hljs-string">`<span class="hljs-subst">${this.apiUrl}</span>?username=<span class="hljs-subst">${username}</span>`</span>)
          .map(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> res.json())
          .subscribe(
            <span class="hljs-function"><span class="hljs-params">user</span> =&gt;</span> {
              <span class="hljs-keyword">this</span>.username = username;
              <span class="hljs-keyword">this</span>.user = user;
            });
      });
  }
}</code></pre>
<p>在上面示例中，我们先从 <code>https://jsonplaceholder.typicode.com/users</code> 地址获取所有用户的信息，然后再根据指定用户的 <code>username</code> 进一步获取用户的详细信息。虽然功能实现了，但有没有更好的解决方案呢？答案是有的，可以通过 RxJS 库中提供的 <code>mergeMap</code> 操作符来优化上述的流程。</p>
<h3 id="articleHeader5">mergeMap</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'app-root',
  template: `
    <p>"{{"username"}}" Detail Info</p>
    "{{"user | json"}}"
  `
})
export class AppComponent implements OnInit {
  constructor(private http: Http) { }

  apiUrl = 'https://jsonplaceholder.typicode.com/users';

  username: string = '';

  user: any;

  ngOnInit() {
    this.http.get(this.apiUrl)
      .map(res => res.json())
      .mergeMap(users => {
        this.username = users[6].username;
        return this.http.get(`${this.apiUrl}?username=${this.username}`)
          .map(res => res.json())
      })
      .subscribe(user => this.user = user);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component, OnInit } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> { Http } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/http'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'rxjs/add/operator/map'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'rxjs/add/operator/mergeMap'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'app-root'</span>,
  template: <span class="hljs-string">`
    &lt;p&gt;"{{"username"}}" Detail Info&lt;/p&gt;
    "{{"user | json"}}"
  `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent <span class="hljs-keyword">implements</span> OnInit {
  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> http: Http</span>) { }

  apiUrl = <span class="hljs-string">'https://jsonplaceholder.typicode.com/users'</span>;

  username: <span class="hljs-built_in">string</span> = <span class="hljs-string">''</span>;

  user: <span class="hljs-built_in">any</span>;

  ngOnInit() {
    <span class="hljs-keyword">this</span>.http.get(<span class="hljs-keyword">this</span>.apiUrl)
      .map(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> res.json())
      .mergeMap(<span class="hljs-function"><span class="hljs-params">users</span> =&gt;</span> {
        <span class="hljs-keyword">this</span>.username = users[<span class="hljs-number">6</span>].username;
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.http.get(<span class="hljs-string">`<span class="hljs-subst">${this.apiUrl}</span>?username=<span class="hljs-subst">${this.username}</span>`</span>)
          .map(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> res.json())
      })
      .subscribe(<span class="hljs-function"><span class="hljs-params">user</span> =&gt;</span> <span class="hljs-keyword">this</span>.user = user);
  }
}</code></pre>
<p>在上面示例中，我们通过 <code>mergeMap</code> 操作符，解决了嵌套订阅的问题。最后我们来看一下如何处理多个并行的 Http 请求。</p>
<h3 id="articleHeader6">forkJoin</h3>
<p>接下来的示例，我们将使用 <code>forkJoin</code> 操作符。如果你熟悉 Promises 的话，该操作符与 <code>Promise.all()</code>  实现的功能类似。<code>forkJoin</code> 操作符接收一个 Observable 对象列表，然后并行地执行它们。一旦列表的 Observable 对象都发出值后，<code>forkJoin</code> 操作符返回的 Observable 对象会发出新的值，即包含所有 Observable 对象输出值的列表。具体示例如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/forkJoin';

@Component({
  selector: 'app-root',
  template: `
    <p>Post Detail Info</p>
    <ul>
      <li>"{{"post1 | json"}}"</li>
      <li>"{{"post2 | json"}}"</li>
    </ul>
  `
})
export class AppComponent implements OnInit {
  constructor(private http: Http) { }

  apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  post1: any;

  post2: any;

  ngOnInit() {
    let post1 = this.http.get(`${this.apiUrl}/1`);
    let post2 = this.http.get(`${this.apiUrl}/2`);

    Observable.forkJoin([post1, post2])
      .subscribe(results => {
        this.post1 = results[0];
        this.post2 = results[1];
      });
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component, OnInit } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> { Http } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/http'</span>;

<span class="hljs-keyword">import</span> { Observable } <span class="hljs-keyword">from</span> <span class="hljs-string">'rxjs/Observable'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'rxjs/add/operator/map'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'rxjs/add/observable/forkJoin'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'app-root'</span>,
  template: <span class="hljs-string">`
    &lt;p&gt;Post Detail Info&lt;/p&gt;
    &lt;ul&gt;
      &lt;li&gt;"{{"post1 | json"}}"&lt;/li&gt;
      &lt;li&gt;"{{"post2 | json"}}"&lt;/li&gt;
    &lt;/ul&gt;
  `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> AppComponent <span class="hljs-keyword">implements</span> OnInit {
  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> http: Http</span>) { }

  apiUrl = <span class="hljs-string">'https://jsonplaceholder.typicode.com/posts'</span>;

  post1: <span class="hljs-built_in">any</span>;

  post2: <span class="hljs-built_in">any</span>;

  ngOnInit() {
    <span class="hljs-keyword">let</span> post1 = <span class="hljs-keyword">this</span>.http.get(<span class="hljs-string">`<span class="hljs-subst">${this.apiUrl}</span>/1`</span>);
    <span class="hljs-keyword">let</span> post2 = <span class="hljs-keyword">this</span>.http.get(<span class="hljs-string">`<span class="hljs-subst">${this.apiUrl}</span>/2`</span>);

    Observable.forkJoin([post1, post2])
      .subscribe(<span class="hljs-function"><span class="hljs-params">results</span> =&gt;</span> {
        <span class="hljs-keyword">this</span>.post1 = results[<span class="hljs-number">0</span>];
        <span class="hljs-keyword">this</span>.post2 = results[<span class="hljs-number">1</span>];
      });
  }
}</code></pre>
<h2 id="articleHeader7">我有话说</h2>
<h3 id="articleHeader8">除了 mergeMap 外，RxJS 中的 switchMap 有什么用？</h3>
<p>switchMap 操作符用于对源 Observable 对象发出的值，做映射处理。若有新的 Observable 对象出现，会在新的 Observable 对象发出新值后，退订前一个未处理完的 Observable 对象。</p>
<p>使用示例：<a href="https://jsbin.com/wajogud/edit?js,console,output" rel="nofollow noreferrer" target="_blank">JSBin</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var source = Rx.Observable.fromEvent(document.body, 'click');
var example = source.switchMap(e => Rx.Observable.interval(100).take(3));

example.subscribe({
    next: (value) => { console.log(value); },
    error: (err) => { console.log('Error: ' + err); },
    complete: () => { console.log('complete'); }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">var</span> source = Rx.Observable.fromEvent(<span class="hljs-built_in">document</span>.body, <span class="hljs-string">'click'</span>);
<span class="hljs-keyword">var</span> example = source.switchMap(<span class="hljs-function"><span class="hljs-params">e</span> =&gt;</span> Rx.Observable.interval(<span class="hljs-number">100</span>).take(<span class="hljs-number">3</span>));

example.subscribe({
    next: <span class="hljs-function">(<span class="hljs-params">value</span>) =&gt;</span> { <span class="hljs-built_in">console</span>.log(value); },
    error: <span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> { <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Error: '</span> + err); },
    complete: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'complete'</span>); }
});</code></pre>
<p>示例 marble 图：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="source : -----------c--c-----------------...
        concatMap(c => Rx.Observable.interval(100).take(3))
example: -------------0--0-1-2-----------..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code><span class="hljs-comment">source</span> <span class="hljs-comment">:</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">c</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">c</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-string">.</span><span class="hljs-string">.</span><span class="hljs-string">.</span>
        <span class="hljs-comment">concatMap(c</span> <span class="hljs-comment">=</span>&gt; <span class="hljs-comment">Rx</span><span class="hljs-string">.</span><span class="hljs-comment">Observable</span><span class="hljs-string">.</span><span class="hljs-comment">interval(100)</span><span class="hljs-string">.</span><span class="hljs-comment">take(3))</span>
<span class="hljs-comment">example:</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">0</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">0</span><span class="hljs-literal">-</span><span class="hljs-comment">1</span><span class="hljs-literal">-</span><span class="hljs-comment">2</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-string">.</span><span class="hljs-string">.</span><span class="hljs-string">.</span></code></pre>
<p>以上代码运行后，控制台的输出结果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="0
0
1
2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">0</span>
<span class="hljs-number">0</span>
<span class="hljs-number">1</span>
<span class="hljs-number">2</span></code></pre>
<p>而在实际使用 Http 服务的场景中，比如实现 AutoComplete 功能，我们可以利用 <code>switchMap</code> 操作符，来取消无用的 Http 请求。</p>
<h2 id="articleHeader9">参考资源</h2>
<ul>
<li><a href="https://coryrylan.com/blog/angular-multiple-http-requests-with-rxjs" rel="nofollow noreferrer" target="_blank">angular-multiple-http-requests-with-rxjs</a></li>
<li><a href="https://netbasal.com/rxjs-six-operators-that-you-must-know-5ed3b6e238a0" rel="nofollow noreferrer" target="_blank"> Six Operators That you Must Know</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 RxJS 处理多个 Http 请求

## 原文链接
[https://segmentfault.com/a/1190000010088631](https://segmentfault.com/a/1190000010088631)

