---
title: 'Angular 2 Change Detection - 1' 
date: 2019-01-18 2:30:35
hidden: true
slug: 2tnk4uccj5t
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>阅读 Angular 6/RxJS 最新教程，请访问<a href="http://www.semlinker.com/" rel="nofollow noreferrer" target="_blank">前端修仙之路</a>
</blockquote>
<p>Change Detection (变化检测) 是 Angular 2 中最重要的一个特性。当组件中的数据发生变化的时候，Angular 2 能检测到数据变化并自动刷新视图反映出相应的变化。</p>
<p>在介绍变化检测之前，我们要先介绍一下浏览器中渲染的概念，渲染是将模型映射到视图的过程。模型的值可以是 JavaScript 中的原始数据类型、对象、数组或其他数据对象。然而视图可以是页面中的段落、表单、按钮等其他元素，这些页面元素内部使用 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Document_Object_Model" rel="nofollow noreferrer" target="_blank">DOM</a> (Document Object Model) 来表示。</p>
<p><span class="img-wrap"><img data-src="/img/bVKRzW?w=729&amp;h=207" src="https://static.alili.tech/img/bVKRzW?w=729&amp;h=207" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>为了更好地理解，我们来看一个具体的示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<h4 id=&quot;greeting&quot;></h4>
<script>
    document.getElementById(&quot;greeting&quot;).innerHTML = &quot;Hello World!&quot;;
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">h4</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"greeting"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"greeting"</span>).innerHTML = <span class="hljs-string">"Hello World!"</span>;
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>这个例子很简单，因为模型不会变化，所以页面只会渲染一次。如果数据模型在运行时会不断变化，那么整个过程将变得复杂。因此为了保证数据与视图的同步，页面将会进行多次渲染。接下来我们来考虑一下以下几个问题：</p>
<ul>
<li>什么时候模型会发生变化</li>
<li>模型产生了什么变化</li>
<li>变化后需要更新的视图区域在哪里</li>
<li>怎么更新对应视图区域</li>
</ul>
<p>而变化检测的基本目的就是解决上述问题。在 Angular 2 中当组件内的模型发生变化的时候，组件内的变化检测器就会检测到更新，然后通知视图刷新。因此变化检测器有两个主要的任务：</p>
<ul>
<li>检测模型的变化</li>
<li>通知视图刷新</li>
</ul>
<p>接下来我们来分析一下什么是变化，变化是怎么产生的。</p>
<h3 id="articleHeader0">变化和事件</h3>
<p>变化是旧模型与新模型之间的区别，换句话说变化产生了一个新的模型。让我们来看一下下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component } from '@angular/core';

@Component({
  selector: 'exe-counter',
  template: `
  <p>当前值："{{" counter "}}"</p>
  <button (click)=&quot;countUp()&quot;> + </button>`
})
export class CounterComponent {
  counter = 0;

  countUp() {
    this.counter++;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'exe-counter'</span>,
  template: <span class="hljs-string">`
  &lt;p&gt;当前值："{{" counter "}}"&lt;/p&gt;
  &lt;button (click)="countUp()"&gt; + &lt;/button&gt;`</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> CounterComponent {
  counter = <span class="hljs-number">0</span>;

  countUp() {
    <span class="hljs-keyword">this</span>.counter++;
  }
}</code></pre>
<p>页面首次渲染完后，计数器的当前值为0。当我们点击 <code>+</code> 按钮时，计数器的 counter 值将会自动加1，之后页面中当前值也会被更新。在这个例子中，点击事件引起了 counter 属性值的变化。</p>
<p>我们继续看下一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'exe-counter',
  template: `
    <p>当前值："{{" counter "}}"</p>
  `
})
export class CounterComponent implements OnInit {
  counter = 0;

  ngOnInit() {
    setInterval(() => {
      this.counter++;
    }, 1000);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component, OnInit } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'exe-counter'</span>,
  template: <span class="hljs-string">`
    &lt;p&gt;当前值："{{" counter "}}"&lt;/p&gt;
  `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> CounterComponent <span class="hljs-keyword">implements</span> OnInit {
  counter = <span class="hljs-number">0</span>;

  ngOnInit() {
    setInterval(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-keyword">this</span>.counter++;
    }, <span class="hljs-number">1000</span>);
  }
}</code></pre>
<p>该组件通过 <code>setInterval</code> 定时器，实现每秒钟  <code>counter</code>  值自动加1。在这种情况下，它是定时器事件引起了属性值的变化。最后我们再来看个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'exe-counter',
  template: `
    <p>当前值："{{" counter "}}"</p>
  `
})
export class CounterComponent implements OnInit {
  counter = 0;
  constructor(private http: Http) {}

  ngOnInit() {
    this.http.get('/counter-data.json')
        .map(res => res.json())
        .subscribe(data => {
          this.counter = data.value;
        });
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">import</span> { Component, OnInit } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/core'</span>;
<span class="hljs-keyword">import</span> { Http } <span class="hljs-keyword">from</span> <span class="hljs-string">'@angular/http'</span>;

<span class="hljs-meta">@Component</span>({
  selector: <span class="hljs-string">'exe-counter'</span>,
  template: <span class="hljs-string">`
    &lt;p&gt;当前值："{{" counter "}}"&lt;/p&gt;
  `</span>
})
<span class="hljs-keyword">export</span> <span class="hljs-keyword">class</span> CounterComponent <span class="hljs-keyword">implements</span> OnInit {
  counter = <span class="hljs-number">0</span>;
  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> http: Http</span>) {}

  ngOnInit() {
    <span class="hljs-keyword">this</span>.http.get(<span class="hljs-string">'/counter-data.json'</span>)
        .map(<span class="hljs-function"><span class="hljs-params">res</span> =&gt;</span> res.json())
        .subscribe(<span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
          <span class="hljs-keyword">this</span>.counter = data.value;
        });
  }
}</code></pre>
<p>该组件在进行初始化的时候，会发送一个 <code>HTTP</code> 请求去获取初始值。当请求成功返回的时候，组件的 counter 属性的值会被更新。在这种情况下，它是由 XHR 回调引起了属性值的变化。</p>
<p>现在我们来总结一下，引起模型变化的三类事件源：</p>
<ul>
<li>Events：click, mouseover, keyup ...</li>
<li>Timers：setInterval、setTimeout</li>
<li>XHRs：Ajax(GET、POST ...)</li>
</ul>
<p>这些事件源有一个共同的特性，即它们都是异步操作。那我们可以这样认为，所有的异步操作都有可能会引起模型的变化。</p>
<p>非常好，你已经了解了引起模型变化的事件源和触发变化的时机点。但是你还不知道，是由谁来负责通知相应的变化给视图。接下来，我们将讨论一种允许 Angular 随时检测到变化的机制，它被称为 <code>Zone</code> 。</p>
<h3 id="articleHeader1">Zones</h3>
<p><a href="https://domenic.github.io/zones/" rel="nofollow noreferrer" target="_blank">Zone</a> 是下一个 ECMAScript 规范的建议之一。Angular 团队实现了 JavaScript 版本的 <a href="https://github.com/angular/zone.js/" rel="nofollow noreferrer" target="_blank">zone.js</a> ，它是用于拦截和跟踪异步工作的机制。</p>
<p>Zone 是一个全局的对象，用来配置有关如何拦截和跟踪异步回调的规则。Zone 有以下能力：</p>
<ul>
<li>拦截异步任务调度</li>
<li>提供了将数据附加到 zones 的方法</li>
<li>为异常处理函数提供正确的上下文</li>
<li>拦截阻塞的方法，如 alert、confirm 方法</li>
</ul>
<p>我们来看一个简单的示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Zone.current.fork({}).run(function () {
    Zone.current.inTheZone = true;
  
    setTimeout(function () {
        console.log('in the zone: ' + !!Zone.current.inTheZone); 
    }, 0);
});

console.log('in the zone: ' + !!Zone.current.inTheZone);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">Zone.current.fork({}).run(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    Zone.current.inTheZone = <span class="hljs-literal">true</span>;
  
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'in the zone: '</span> + !!Zone.current.inTheZone); 
    }, <span class="hljs-number">0</span>);
});

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'in the zone: '</span> + !!Zone.current.inTheZone);</code></pre>
<p>以上代码运行后的结果是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="in the zone: false
in the zone: true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code class="shell"><span class="hljs-keyword">in</span> the <span class="hljs-string">zone:</span> <span class="hljs-literal">false</span>
<span class="hljs-keyword">in</span> the <span class="hljs-string">zone:</span> <span class="hljs-literal">true</span></code></pre>
<p>是不是感觉很神奇！在Angular 2 中，有一个 NgZone，它是专门为 Angular 2 定制的 zone。在正式介绍它之前，我们先来看一下 Angular 1.x 中的一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Angular 1.x Demo</title>
    <script src=&quot;//cdn.bootcss.com/angular.js/1.6.3/angular.min.js&quot;></script>
</head>
<body ng-app=&quot;exeApp&quot;>
<div ng-controller=&quot;MainCtrl&quot;>
    <h4>Hello "{{" name "}}"</h4>
</div>
<script type=&quot;text/javascript&quot;>
    angular.module('exeApp', [])
            .controller('MainCtrl', ['$scope', function ($scope) {
                $scope.name = 'Angular';

                setTimeout(function () {
                    $scope.name = 'Angular 2';
                }, 2000);
            }]);
</script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Angular 1.x Demo<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//cdn.bootcss.com/angular.js/1.6.3/angular.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span> <span class="hljs-attr">ng-app</span>=<span class="hljs-string">"exeApp"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ng-controller</span>=<span class="hljs-string">"MainCtrl"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>Hello "{{" name "}}"<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="actionscript">
    angular.module(<span class="hljs-string">'exeApp'</span>, [])
            .controller(<span class="hljs-string">'MainCtrl'</span>, [<span class="hljs-string">'$scope'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">($scope)</span> </span>{
                $scope.name = <span class="hljs-string">'Angular'</span>;

                setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
                    $scope.name = <span class="hljs-string">'Angular 2'</span>;
                }, <span class="hljs-number">2000</span>);
            }]);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>以上代码运行后的输出结果：</p>
<p><span class="img-wrap"><img data-src="/img/bVKRz7?w=1590&amp;h=424" src="https://static.alili.tech/img/bVKRz7?w=1590&amp;h=424" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>用过 Angular 1.x 的同学，应该很清楚可以通过 Angular 1.x 中的 <code>$timeout</code> 服务或手动调用 <code>$scope.$digest()</code> 方法来通知视图刷新。这对初学者来说，是很麻烦的一件事情。你们应该还记得前面计数器组件的例子，我们通过 <code>setInterval</code> 定时器，实现每秒钟  <code>counter</code>  值自动加1，页面就自动刷新了。不需要再使用 Angular 1.x 中的 <code>$timeout</code> 服务或手动调用 <code>$scope.$digest()</code> 方法来刷新视图。</p>
<p>为什么我们都是使用定时器，而在 Angular 2 中模型发生变化后，却能自动通知视图进行刷新呢 ？我们来分析一下，首先在浏览器中新开一个 Tab 页，在控制台输入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.setTimeout.toString() 
&quot;function setTimeout() { [native code] }&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">window</span>.setTimeout.toString() 
<span class="hljs-string">"function setTimeout() { [native code] }"</span></code></pre>
<p>然后再打开一个 Angular 2 应用的页面，在控制台同样输入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.setTimeout.toString()
&quot;function setTimeout(){return f(this, arguments)}&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">window</span>.setTimeout.toString()
<span class="hljs-string">"function setTimeout(){return f(this, arguments)}"</span></code></pre>
<p>我们发现在 Angular 2 中，setTimeout 方法已经被重写了，最简单的实现方式如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var originSetTimeout = window.setTimeout;
window.setTimeout = function(fn, delay) {
  console.log('setTimeout has been called');
  originSetTimeout(fn, delay); 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> originSetTimeout = <span class="hljs-built_in">window</span>.setTimeout;
<span class="hljs-built_in">window</span>.setTimeout = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fn, delay</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'setTimeout has been called'</span>);
  originSetTimeout(fn, delay); 
}</code></pre>
<p>其实在 Angular 2 应用程序启动之前，Zone 采用猴子补丁 (Monkey-patched) 的方式，将 JavaScript 中的异步任务都进行了包装，这使得这些异步任务都能运行在 Zone 的执行上下文中，每个异步任务在 Zone 中都是一个任务，除了提供了一些供开发者使用的钩子外，默认情况下 Zone 重写了以下方法：</p>
<ul>
<li>setInterval、clearInterval、setTimeout、clearTimeout</li>
<li>alert、prompt、confirm</li>
<li>requestAnimationFrame、cancelAnimationFrame</li>
<li>addEventListener、removeEventListener</li>
</ul>
<p>Zone 内部源码片段：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var set = 'set';
var clear = 'clear';
var blockingMethods = ['alert', 'prompt', 'confirm'];
var _global = typeof window === 'object' &amp;&amp; window || 
     typeof self === 'object' &amp;&amp; self || global;
patchTimer(_global, set, clear, 'Timeout');
patchTimer(_global, set, clear, 'Interval');
patchTimer(_global, set, clear, 'Immediate');
patchTimer(_global, 'request', 'cancel', 'AnimationFrame');
patchTimer(_global, 'mozRequest', 'mozCancel', 'AnimationFrame');
patchTimer(_global, 'webkitRequest', 'webkitCancel', 'AnimationFrame');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> set = <span class="hljs-string">'set'</span>;
<span class="hljs-keyword">var</span> clear = <span class="hljs-string">'clear'</span>;
<span class="hljs-keyword">var</span> blockingMethods = [<span class="hljs-string">'alert'</span>, <span class="hljs-string">'prompt'</span>, <span class="hljs-string">'confirm'</span>];
<span class="hljs-keyword">var</span> _global = <span class="hljs-keyword">typeof</span> <span class="hljs-built_in">window</span> === <span class="hljs-string">'object'</span> &amp;&amp; <span class="hljs-built_in">window</span> || 
     <span class="hljs-keyword">typeof</span> self === <span class="hljs-string">'object'</span> &amp;&amp; self || global;
patchTimer(_global, set, clear, <span class="hljs-string">'Timeout'</span>);
patchTimer(_global, set, clear, <span class="hljs-string">'Interval'</span>);
patchTimer(_global, set, clear, <span class="hljs-string">'Immediate'</span>);
patchTimer(_global, <span class="hljs-string">'request'</span>, <span class="hljs-string">'cancel'</span>, <span class="hljs-string">'AnimationFrame'</span>);
patchTimer(_global, <span class="hljs-string">'mozRequest'</span>, <span class="hljs-string">'mozCancel'</span>, <span class="hljs-string">'AnimationFrame'</span>);
patchTimer(_global, <span class="hljs-string">'webkitRequest'</span>, <span class="hljs-string">'webkitCancel'</span>, <span class="hljs-string">'AnimationFrame'</span>);</code></pre>
<h3 id="articleHeader2">NgZone</h3>
<p>NgZone 是基于 Zone 实现的，它是Zone派生出来的一个子Zone，在 Angular 环境内注册的异步事件都运行在这个子 Zone 内 (因为NgZone拥有整个运行环境的执行上下文)，它扩展了自有的一些 API 并添加了一些功能性的方法到它的执行上下文中。</p>
<p>在 Angular 源码中，有一个 <code>ApplicationRef_</code> 类，其作用是用来监听 NgZone 中的 <code>onMicrotaskEmpty</code> 事件，无论何时只要触发这个事件，那么将会执行一个 <code>tick</code> 方法用来告诉 Angular 去执行变化检测，简化版的代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class ApplicationRef { 
  private _views: InternalViewRef[] = [];

  constructor(private zone: NgZone) {
        this.zone.onMicrotaskEmpty.subscribe(() => {
            this.zone.run(() => { 
              this.tick();
            }); 
        });
  }
  
  tick() { 
    if (this._runningTick) {
      throw new Error('ApplicationRef.tick is called recursively');
    }
    this._views.forEach((view) => view.detectChanges());
   }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="typescript hljs"><code class="typescript"><span class="hljs-keyword">class</span> ApplicationRef { 
  <span class="hljs-keyword">private</span> _views: InternalViewRef[] = [];

  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">private</span> zone: NgZone</span>) {
        <span class="hljs-keyword">this</span>.zone.onMicrotaskEmpty.subscribe(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-keyword">this</span>.zone.run(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> { 
              <span class="hljs-keyword">this</span>.tick();
            }); 
        });
  }
  
  tick() { 
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>._runningTick) {
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'ApplicationRef.tick is called recursively'</span>);
    }
    <span class="hljs-keyword">this</span>._views.forEach(<span class="hljs-function">(<span class="hljs-params">view</span>) =&gt;</span> view.detectChanges());
   }
}</code></pre>
<p>现在我们先来总结一下前面所讲的内容：</p>
<ul>
<li>异步操作被安排为任务</li>
<li>Zones 跟踪任务的执行</li>
<li>Angular 处理由执行异步操作引起的事件</li>
<li>Angular 对所有组件执行变化检测，若发生变化则更新视图</li>
</ul>
<p>要完全理解 Zone 的工作原理是比较困难的，对我们大部分的人来说，只要知道 Angular 内部是通过它来跟踪异步任务，然后执行变化检测任务就可以了。</p>
<h3 id="articleHeader3">我有话说</h3>
<p>1.在 Angular 2 项目中怎么访问 Zone 打补丁前的方法，如 setTimeout、clearTimeout 等</p>
<p>因为 Zone 内部通过内建的 <code>__symbol__</code> 函数来模拟 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Symbol" rel="nofollow noreferrer" target="_blank">Symbol</a> ：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function __symbol__(name) {
  return '__zone_symbol__' + name;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">__symbol__</span>(<span class="hljs-params">name</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">'__zone_symbol__'</span> + name;
}</code></pre>
<p>因此我们可以在浏览器的控制台中运行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.keys(window).forEach((key) => {
 if(key.indexOf('zone_symbol') > 0) {
    console.log(key);
 }  
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">Object</span>.keys(<span class="hljs-built_in">window</span>).forEach(<span class="hljs-function">(<span class="hljs-params">key</span>) =&gt;</span> {
 <span class="hljs-keyword">if</span>(key.indexOf(<span class="hljs-string">'zone_symbol'</span>) &gt; <span class="hljs-number">0</span>) {
    <span class="hljs-built_in">console</span>.log(key);
 }  
});</code></pre>
<p>运行后控制台的输出结果如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVKRIm?w=1032&amp;h=568" src="https://static.alili.tech/img/bVKRIm?w=1032&amp;h=568" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>2.前面介绍 Zone 使用的示例，为什么控制台会输出那样的结果 ？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 加载Zone.js给浏览器中的一些异步操作打上补丁
// 创建Root Zone
// 调用Zone.current对象上的fork方法创建新的zone，我们称之为childZone
Zone.current.fork({}).run(function () { 
      // 运行run方法，Zone.current被设置为函数被执行时所属的Zone，即childZone
    Zone.current.inTheZone = true;
  
      // 这里注册了一个定时器。由于被打过了猴子补丁，这里调用的并不是
    // 浏览器&quot;默认&quot;的setTimeout方法。因此，这里实际上是在配置代理。这里
    // 要重点指出的是这个代理会保留一个指向创建时所属Zone的引用即childZone，
    // 稍后会用到这个引用。
    setTimeout(function () {
        // 定时时间到，此时的Zone.current的值会被重置为childZone
        console.log('in the zone: ' + !!Zone.current.inTheZone); 
    }, 0);
  
      // 代码执行完 Zone.current属性被重置为Root Zone
    // Zone的生命周期里的钩子函数会被触发
});

console.log('in the zone: ' + !!Zone.current.inTheZone);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 加载Zone.js给浏览器中的一些异步操作打上补丁</span>
<span class="hljs-comment">// 创建Root Zone</span>
<span class="hljs-comment">// 调用Zone.current对象上的fork方法创建新的zone，我们称之为childZone</span>
Zone.current.fork({}).run(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{ 
      <span class="hljs-comment">// 运行run方法，Zone.current被设置为函数被执行时所属的Zone，即childZone</span>
    Zone.current.inTheZone = <span class="hljs-literal">true</span>;
  
      <span class="hljs-comment">// 这里注册了一个定时器。由于被打过了猴子补丁，这里调用的并不是</span>
    <span class="hljs-comment">// 浏览器"默认"的setTimeout方法。因此，这里实际上是在配置代理。这里</span>
    <span class="hljs-comment">// 要重点指出的是这个代理会保留一个指向创建时所属Zone的引用即childZone，</span>
    <span class="hljs-comment">// 稍后会用到这个引用。</span>
    setTimeout(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 定时时间到，此时的Zone.current的值会被重置为childZone</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'in the zone: '</span> + !!Zone.current.inTheZone); 
    }, <span class="hljs-number">0</span>);
  
      <span class="hljs-comment">// 代码执行完 Zone.current属性被重置为Root Zone</span>
    <span class="hljs-comment">// Zone的生命周期里的钩子函数会被触发</span>
});

<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'in the zone: '</span> + !!Zone.current.inTheZone);</code></pre>
<p>如果还是不好理解的话，我们可以想象一下同步的过程：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const rootZone = Zone.current;
// 创建一个新的Zone
const childZone = Zone.current.fork({});
// 设置当前的zone
Zone.current = zone;
// 为当前的zone添加inTheZone属性
Zone.current.inTheZone = true;
console.log('in the zone: ' + !!Zone.current.inTheZone);
// 退出当前的zone
Zone.current = rootZone;
console.log('in the zone: ' + !!Zone.current.inTheZone);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> rootZone = Zone.current;
<span class="hljs-comment">// 创建一个新的Zone</span>
<span class="hljs-keyword">const</span> childZone = Zone.current.fork({});
<span class="hljs-comment">// 设置当前的zone</span>
Zone.current = zone;
<span class="hljs-comment">// 为当前的zone添加inTheZone属性</span>
Zone.current.inTheZone = <span class="hljs-literal">true</span>;
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'in the zone: '</span> + !!Zone.current.inTheZone);
<span class="hljs-comment">// 退出当前的zone</span>
Zone.current = rootZone;
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'in the zone: '</span> + !!Zone.current.inTheZone);</code></pre>
<h3 id="articleHeader4">总结</h3>
<p>这篇文章我们先介绍了浏览器中渲染的概念，然后通过三个示例引出了引起模型变化的事件源并总结了它们之间的共性，此外我们还介绍了 Angular 1.x 项目中初学者容易遇到的问题，并基于该问题引入了 Zone 和 NgZone 的概念，最后我们简单介绍了 Zone.js 的内部工作原理。下一篇文章我们将详细介绍 Angular 2 组件中的变化检测器。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Angular 2 Change Detection - 1

## 原文链接
[https://segmentfault.com/a/1190000008747225](https://segmentfault.com/a/1190000008747225)

