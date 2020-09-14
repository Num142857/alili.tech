---
title: '介绍RxJS在Angular中的应用' 
date: 2019-01-12 2:30:25
hidden: true
slug: 6g8jaf4lsr9
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://github.com/ReactiveX/rxjs" rel="nofollow noreferrer" target="_blank">RxJS</a>是一种针对异步数据流编程工具，或者叫响应式扩展编程；可不管如何解释RxJS其目标就是异步编程，Angular引入RxJS为了就是让异步可控、更简单。</p>
<p>而今就是要探讨什么是Observable、observer、operator、Submit、EventEmmit，以及如何去使用它们。</p>
<h1 id="articleHeader0">什么是Observable？</h1>
<p>Observable只是一个普通函数，要想让他有所作为，就需要跟observer一起使用；<strong>前者是受后者是攻</strong>。而这个observer（后面我们会介绍）只是一个带有 <code>next</code>、<code>error</code>、<code>complete</code> 的简单对象而已。最后，还需要通过 <code>subscribe</code> 订阅来启动Observable；否则它是不会有任何反应；<strong>可以理解为陌*为了他们能在一起而提供的环境</strong>，而订阅也会返回一个可用于取消操作（在RxJS里叫 <code>unsubscribe</code>）。</p>
<p>当Observable设置观察者后，而连接并获取原始数据的这个过程叫生产者，可能是DOM中的 <code>click</code> 事件、<code>input</code> 事件、或者更加复杂的HTTP通信。</p>
<p>为了更好理解，先从一个简单的示例开始：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  template: `<input type=&quot;text&quot;> `
})
export class HomeComponent {
  ngOnInit() {
    const node = document.querySelector('input[type=text]');

    // 第二个参数 input 是事件名，对于input元素有一个 oninput 事件用于接受用户输入
    const input$ = Observable.fromEvent(node, 'input');
    input$.subscribe({
      next: (event: any) => console.log(`You just typed ${event.target.value}!`),
      error: (err) => console.log(`Oops... ${err}`),
      complete: () => console.log(`Complete!`)
    });
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> { Observable, Subscription } <span class="hljs-keyword">from</span> <span class="hljs-string">'rxjs'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'app-home'</span>,
  template: <span class="hljs-string">`&lt;input type="text"&gt; `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> HomeComponent {
  ngOnInit() {
    <span class="hljs-keyword">const</span> node = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'input[type=text]'</span>);

    <span class="hljs-comment">// 第二个参数 input 是事件名，对于input元素有一个 oninput 事件用于接受用户输入</span>
    <span class="hljs-keyword">const</span> input$ = Observable.fromEvent(node, <span class="hljs-string">'input'</span>);
    input$.subscribe({
      next: <span class="hljs-function">(<span class="hljs-params">event: <span class="hljs-built_in">any</span></span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`You just typed <span class="hljs-subst">${event.target.value}</span>!`</span>),
      error: <span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Oops... <span class="hljs-subst">${err}</span>`</span>),
      complete: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`Complete!`</span>)
    });
  }
}</code></pre>
<p>示例中 <code>Observable.fromEvent()</code> 会返回一个Observable，并且监听 <code>input</code> 事件，当事件被触发后会发送一个 <code>Event</code> 给对应的observer观察者。</p>
<h1 id="articleHeader1">什么是observer？</h1>
<p>observer非常简单，像上面示例中 <code>subscribe</code> 订阅就是接收一个 observer 方法。</p>
<p>一般在Angular我们 <code>subscribe</code> 会这么写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="input$.subscribe((event: any) => {

});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">input$.subscribe(<span class="hljs-function">(<span class="hljs-params">event: <span class="hljs-built_in">any</span></span>) =&gt;</span> {

});</code></pre>
<p>从语法角度来讲和 <code>subscribe({ next, error, complete })</code> 是一样的。</p>
<p>当Observable产生一个新值时，会通知 observer 的 <code>next()</code>，而当捕获失败可以调用 <code>error()</code>。</p>
<p>当Observable被订阅后，除非调用observer的 <code>complete()</code> 或 <code>unsubscribe()</code> 取消订阅两情况以外；会一直将值传递给 observer。</p>
<p>Observable的生产的值允许经过一序列格式化或操作，最终得到一个有价值的数据给观察者，而这一切是由一序列链式operator来完成的，每一个operator都会产生一个新的Observable。而我们也称这一序列过程为：流。</p>
<h1 id="articleHeader2">什么是operator？</h1>
<p>正如前面说到的，Observable可以链式写法，这意味着我们可以这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Observable.fromEvent(node, 'input')
  .map((event: any) => event.target.value)
  .filter(value => value.length >= 2)
  .subscribe(value => { console.log(value); });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">Observable.fromEvent(node, <span class="hljs-string">'input'</span>)
  .map(<span class="hljs-function">(<span class="hljs-params">event: <span class="hljs-built_in">any</span></span>) =&gt;</span> event.target.value)
  .filter(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> value.length &gt;= <span class="hljs-number">2</span>)
  .subscribe(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> { <span class="hljs-built_in">console</span>.log(value); });</code></pre>
<p>下面是整个顺序步骤：</p>
<ul>
<li>假设用户输入：a</li>
<li>Observable对触发 <code>oninput</code> 事件作出反应，将值以参数的形式传递给observer的 <code>next()</code>。</li>
<li>
<code>map()</code> 根据 <code>event.target.value</code> 的内容返回一个新的 Observable，并调用 <code>next()</code> 传递给下一个observer。</li>
<li>
<code>filter()</code> 如果值长度 <code>&gt;=2</code> 的话，则返回一个新的 Observable，并调用 <code>next()</code> 传递给下一个observer。</li>
<li>最后，将结果传递给 <code>subscribe</code> 订阅块。</li>
</ul>
<p>你只要记住每一次 operator 都会返回一个新的 Observable，不管 operator 有多少个，最终只有最后一个 Observable 会被订阅。</p>
<h1 id="articleHeader3">不要忘记取消订阅</h1>
<p><strong>为什么需要取消订阅</strong></p>
<p>Observable 当有数据产生时才会推送给订阅者，所以它可能会无限次向订阅者推送数据。正因为如此，在Angular里面创建组件的时候务必要取消订阅操作，以避免<strong>内存泄漏</strong>，要知道在SPA世界里懂得<strong>擦屁股</strong>是一件必须的事。</p>
<h2 id="articleHeader4">unsubscribe</h2>
<p>前面示例讲过，调用 <code>subscribe()</code> 后，会返回一个 <code>Subscription</code> 可用于取消操作 <code>unsubscribe()</code>。最合理的方式在 <code>ngOnDestroy</code> 调用它。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ngOnDestroy() {
    this.inputSubscription.unsubscribe();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript">ngOnDestroy() {
    <span class="hljs-keyword">this</span>.inputSubscription.unsubscribe();
}</code></pre>
<h2 id="articleHeader5">takeWhile</h2>
<p>如果组件有很多订阅者的话，则需要将这些订阅者存储在数组中，并组件被销毁时再逐个取消订阅。但，我们有更好的办法：</p>
<p>使用 [takeWhile()<br>](<a href="http://reactivex.io/documentation/operators/takewhile.html)" rel="nofollow noreferrer" target="_blank">http://reactivex.io/documenta...</a> operator，它会在你传递一个布尔值是调用 <code>next()</code> 还是 <code>complete()</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="private alive: boolean = true;
ngOnInit() {
  const node = document.querySelector('input[type=text]');

  this.s = Observable.fromEvent(node, 'input')
    .takeWhile(() => this.alive)
    .map((event: any) => event.target.value)
    .filter(value => value.length >= 2)
    .subscribe(value => { console.log(value) });
}

ngOnDestroy() {
  this.alive = false;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">private</span> alive: <span class="hljs-built_in">boolean</span> = <span class="hljs-literal">true</span>;
ngOnInit() {
  <span class="hljs-keyword">const</span> node = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'input[type=text]'</span>);

  <span class="hljs-keyword">this</span>.s = Observable.fromEvent(node, <span class="hljs-string">'input'</span>)
    .takeWhile(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">this</span>.alive)
    .map(<span class="hljs-function">(<span class="hljs-params">event: <span class="hljs-built_in">any</span></span>) =&gt;</span> event.target.value)
    .filter(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> value.length &gt;= <span class="hljs-number">2</span>)
    .subscribe(<span class="hljs-function"><span class="hljs-params">value</span> =&gt;</span> { <span class="hljs-built_in">console</span>.log(value) });
}

ngOnDestroy() {
  <span class="hljs-keyword">this</span>.alive = <span class="hljs-literal">false</span>;
}</code></pre>
<p>简单有效，而且优雅。</p>
<h1 id="articleHeader6">Subject</h1>
<p>如果说 <code>Observable</code> 与 <code>observer</code> 是攻受结合体的话，那么 <code>Subject</code> 就是一个人即攻亦受。正因为如此，我们在写一个Service用于数据传递时，总是使用 <code>new Subject</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Injectable()
export class MessageService {
    private subject = new Subject<any>();

    send(message: any) {
        this.subject.next(message);
    }

    get(): Observable<any> {
        return this.subject.asObservable();
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-meta">@Injectable</span>()
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> MessageService {
    <span class="hljs-keyword">private</span> subject = <span class="hljs-keyword">new</span> Subject&lt;<span class="hljs-built_in">any</span>&gt;();

    send(message: <span class="hljs-built_in">any</span>) {
        <span class="hljs-keyword">this</span>.subject.next(message);
    }

    <span class="hljs-keyword">get</span>(): Observable&lt;<span class="hljs-built_in">any</span>&gt; {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.subject.asObservable();
    }
}</code></pre>
<p>当F组件需要向M组件传递数据时，我们可以在F组件中使用 <code>send()</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor(public srv: MessageService) { }

ngOnInit() {
    this.srv.send('w s k f m?')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">public</span> srv: MessageService</span>) { }

ngOnInit() {
    <span class="hljs-keyword">this</span>.srv.send(<span class="hljs-string">'w s k f m?'</span>)
}</code></pre>
<p>而M组件只需要订阅内容就行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor(private srv: MessageService) {}

message: any;
ngOnInit() {
    this.srv.get().subscribe((result) => {
        this.message = result;
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> srv: MessageService</span>) {}

message: <span class="hljs-built_in">any</span>;
ngOnInit() {
    <span class="hljs-keyword">this</span>.srv.get().subscribe(<span class="hljs-function">(<span class="hljs-params">result</span>) =&gt;</span> {
        <span class="hljs-keyword">this</span>.message = result;
    })
}</code></pre>
<h1 id="articleHeader7">EventEmitter</h1>
<p>其实EventEmitter跟RxJS没有直接关系，因为他是Angular的产物，而非RxJS的东西。或者我们压根没必要去谈，因为EventEmitter就是Subject。</p>
<p>EventEmitter的作用是<strong>使指令或组件能自定义事件</strong>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Output() changed = new EventEmitter<string>();

click() {
    this.changed.emit('hi~');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-meta">@Output</span>() changed = <span class="hljs-keyword">new</span> EventEmitter&lt;<span class="hljs-built_in">string</span>&gt;();

click() {
    <span class="hljs-keyword">this</span>.changed.emit(<span class="hljs-string">'hi~'</span>);
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@Component({
  template: `<comp (changed)=&quot;subscribe($event)&quot;></comp>`
})
export class HomeComponent {
  subscribe(message: string) {
     // 接收：hi~
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">@Component({
  template: `<span class="hljs-tag">&lt;<span class="hljs-name">comp</span> (<span class="hljs-attr">changed</span>)=<span class="hljs-string">"subscribe($event)"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">comp</span>&gt;</span>`
})
export class HomeComponent {
  subscribe(message: string) {
     // 接收：hi~
  }
}</code></pre>
<p>上面示例其实和上一个示例中 <code>MessageService</code> 如出一辙，只不过是将 <code>next()</code> 换成 <code>emit()</code> 仅此而已。</p>
<h1 id="articleHeader8">结论</h1>
<p>RxJS最难我想就是各种operator的应用了，这需要一些经验的积累。</p>
<p>RxJS很火很大原因我认还是提供了丰富的API，以下是摘抄：</p>
<p>创建数据流：</p>
<ul>
<li>单值：of, empty, never</li>
<li>多值：from</li>
<li>定时：interval, timer</li>
<li>从事件创建：fromEvent</li>
<li>从Promise创建：fromPromise</li>
<li>自定义创建：create</li>
</ul>
<p>转换操作：</p>
<ul>
<li>改变数据形态：map, mapTo, pluck</li>
<li>过滤一些值：filter, skip, first, last, take</li>
<li>时间轴上的操作：delay, timeout, throttle, debounce, audit, bufferTime</li>
<li>累加：reduce, scan</li>
<li>异常处理：throw, catch, retry, finally</li>
<li>条件执行：takeUntil, delayWhen, retryWhen, subscribeOn, ObserveOn</li>
<li>转接：switch</li>
</ul>
<p>组合数据流：</p>
<ul>
<li>concat，保持原来的序列顺序连接两个数据流</li>
<li>merge，合并序列</li>
<li>race，预设条件为其中一个数据流完成</li>
<li>forkJoin，预设条件为所有数据流都完成</li>
<li>zip，取各来源数据流最后一个值合并为对象</li>
<li>combineLatest，取各来源数据流最后一个值合并为数组</li>
</ul>
<p>另，最好使用 **$** 结尾的命名方式来表示Observable，例：input$。</p>
<p>happy coding!</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
介绍RxJS在Angular中的应用

## 原文链接
[https://segmentfault.com/a/1190000009729247](https://segmentfault.com/a/1190000009729247)

