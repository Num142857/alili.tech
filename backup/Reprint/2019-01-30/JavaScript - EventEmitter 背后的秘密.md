---
title: 'JavaScript - EventEmitter 背后的秘密' 
date: 2019-01-30 2:30:23
hidden: true
slug: i00hiszlr1
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">什么是 Event Emitter?</h2>
<p>Event emitter 听起来只是触发一个事件，这个事件任何东西都能监听。</p>
<p>想象一下这样的场景，在你的异步代码中，去“呼叫”一些事件的发生，以及让你其他部分都要听到你的“呼叫”并且注册他们的想法。</p>
<p>为了不同的目的，对于 Event Emitter 模式有大量不同的实现，但是基本的想法是为了给一个框架提供事件的管理以及能够去订阅他们。</p>
<p>在这里，我们的目标创建属于我们自己的 Event Emitter 去理解背后的秘密。所以，让我们看一下下面的代码是怎么工作的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let input = document.querySelector('input[type=&quot;text&quot;]');
let button = document.querySelector('button');
let h1 = document.querySelector('h1');

button.addEventListener('click', () => {
    emitter.emit('event:name-changed', { name: input.value });
});

let emitter = new EventEmitter();
emitter.subscribe('event:name-changed', data => {
    h1.innerHTML = `Your name is: ${data.name}`;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> input = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'input[type="text"]'</span>);
<span class="hljs-keyword">let</span> button = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'button'</span>);
<span class="hljs-keyword">let</span> h1 = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'h1'</span>);

button.addEventListener(<span class="hljs-string">'click'</span>, () =&gt; {
    emitter.emit(<span class="hljs-string">'event:name-changed'</span>, { <span class="hljs-attr">name</span>: input.value });
});

<span class="hljs-keyword">let</span> emitter = <span class="hljs-keyword">new</span> EventEmitter();
emitter.subscribe(<span class="hljs-string">'event:name-changed'</span>, data =&gt; {
    h1.innerHTML = <span class="hljs-string">`Your name is: <span class="hljs-subst">${data.name}</span>`</span>;
});</code></pre>
<p>让我们开始。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class EventEmitter {
    constructor() {
        this.events = {};
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">EventEmitter</span> </span>{
    <span class="hljs-keyword">constructor</span>() {
        <span class="hljs-keyword">this</span>.events = {};
    }
}</code></pre>
<p>我们先创建一个 <strong>EventEmiiter</strong> 类以及初始化 <strong>events</strong> 空对象属性。这个 events 属性的目的是为了存储我们的事件集合，这个 events 对象使用事件名当做 key，用订阅者集合当做 value。（可以把每个订阅者看作是一个函数）。</p>
<h2 id="articleHeader1">订阅函数</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="subscribe(eventName, fn) {
    if (!this.events[eventName]) {
        this.events[eventName] = [];
    }

    this.events[eventName].push(fn);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">subscribe(eventName, fn) {
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.events[eventName]) {
        <span class="hljs-keyword">this</span>.events[eventName] = [];
    }

    <span class="hljs-keyword">this</span>.events[eventName].push(fn);
}</code></pre>
<p>这个订阅函数获取事件名称，在我们之前的例子中，它是 "event:name-changed" 以及传入一个回调，当有人调用 emit（或尖叫）事件的时候调用回调。</p>
<p>在 JavaScript 函数的优点之一是函数是第一对象，所以我们能像之前我们的订阅方法一样，通过函数作为另一个函数的参数。</p>
<p>如果未注册这个事件，我们需要在第一次为它设置一个初始值，事件名称作为 key 以及初始化一个空数组赋值给它，然后我们将函数放入这个数组，以便我们想通过 emit 去调用这个事件。</p>
<h2 id="articleHeader2">调用函数</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="emit(eventName, data) {
    const event = this.events[eventName];
    if (event) {
        event.forEach(fn => {
            fn.call(null, data);
        });
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">emit(eventName, data) {
    <span class="hljs-keyword">const</span> event = <span class="hljs-keyword">this</span>.events[eventName];
    <span class="hljs-keyword">if</span> (event) {
        event.forEach(<span class="hljs-function"><span class="hljs-params">fn</span> =&gt;</span> {
            fn.call(<span class="hljs-literal">null</span>, data);
        });
    }
}</code></pre>
<p>这个调用函数接受事件名，这个事件名是我们想“呼叫”的名称，以及我们想传递给这个事件的数据。如果在我们的 events 中存在这个事件，我们将带上数据循环调用所有订阅的方法。</p>
<p>使用上面的代码能做我们所说的全部的事情。但我们仍然有一个问题。当我们不再需要它们的时候，我们需要一种方法来取消注册这些订阅，因为如果你不这样做，将造成内存泄漏。</p>
<p>让我们来解决这个问题，通过在订阅函数中返回一个取消注册的方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="subscribe(eventName, fn) {
    if (!this.events[eventName]) {
        this.events[eventName] = [];
    }

    this.events[eventName].push(fn);

    return () => {
        this.events[eventName] = this.events[eventName].filter(eventFn => fn !== eventFn);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">subscribe(eventName, fn) {
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.events[eventName]) {
        <span class="hljs-keyword">this</span>.events[eventName] = [];
    }

    <span class="hljs-keyword">this</span>.events[eventName].push(fn);

    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">this</span>.events[eventName] = <span class="hljs-keyword">this</span>.events[eventName].filter(<span class="hljs-function"><span class="hljs-params">eventFn</span> =&gt;</span> fn !== eventFn);
    }
}</code></pre>
<p>因为 JavaScript 函数是第一对象，你能在一个函数中返回一个函数。因此现在我们能调用这个取消注册函数，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let unsubscribe = emitter.subscribe('event:name-changed', data => console.log(data));

unsubscribe();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> unsubscribe = emitter.subscribe(<span class="hljs-string">'event:name-changed'</span>, data =&gt; <span class="hljs-built_in">console</span>.log(data));

unsubscribe();</code></pre>
<p>当我们调用取消注册函数的时候，我们删除的功能依赖于对订阅函数集合的筛选方法（Array filter）。</p>
<p>和内存泄露说再见！??</p>
<p>你能运行这份<a href="https://plnkr.co/edit/TEM1eA9ahavEybuEKn6E?p=preview" rel="nofollow noreferrer" target="_blank">代码</a>，所有代码都在这里。</p>
<blockquote><p>注：这份代码可能需要翻墙或者特别慢，所以我放到了 <a href="https://github.com/fegg/EventEmitter/tree/master/magic" rel="nofollow noreferrer" target="_blank">github</a> 上，大家可以下载。(⊙o⊙)…暂时放我的账号下，如果有合适的地方请联系我。</p></blockquote>
<p>原文出自：<a href="https://medium.com/@NetanelBasal/javascript-the-magic-behind-event-emitter-cce3abcbcef9#.nzgbagnxe" rel="nofollow noreferrer" target="_blank">https://medium.com/@NetanelBasal/javascript-the-magic-behind-event-emitter-cce3abcbcef9#.nzgbagnxe</a></p>
<p>博客原文：<a href="http://60sky.com/post/js-eventemitter-magic.html" rel="nofollow noreferrer" target="_blank">http://60sky.com/post/js-eventemitter-magic.html</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript - EventEmitter 背后的秘密

## 原文链接
[https://segmentfault.com/a/1190000007696347](https://segmentfault.com/a/1190000007696347)

