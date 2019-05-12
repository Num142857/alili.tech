---
title: '小而美的backbone' 
date: 2018-12-16 2:30:10
hidden: true
slug: blc5lkn18iw
categories: [reprint]
---

{{< raw >}}

                    
<p>本文已同步在<a href="http://hualuyao.com/2018/01/13/%E5%B0%8F%E8%80%8C%E7%BE%8E%E7%9A%84backbone/" rel="nofollow noreferrer" target="_blank">我的博客</a></p>
<p>在这个<strong>react</strong>和<strong>vue</strong>如日中天、<strong>jquery</strong>逐渐被大家抛弃的年代，我还是想要来说一说<strong>backbone</strong>。</p>
<blockquote>16年6月初，在没有任何前端框架使用经验、js水平也较一般的情况下，被告知需要在几个工作日内搭建完成一个后台管理系统，没有页面设计稿、没有组件库，一切都是从零开始。当时面临两个选择，backbone和react。虽然我很希望能够拿react来练手，但是考虑到学习成本和项目时间问题，leader还是建议我使用backbone来完成，就这样，一直用到差不多现在。虽然到项目后期业务场景越来越复杂，backbone的这套技术栈体现出越来越多的问题，但是对于小型项目来说，我还是认为backbone是个不错的选择，而且学习成本低，上手极快~</blockquote>
<p><strong>backbone</strong>是个非常轻量的<strong>mvc</strong>库，本文将基于<strong>backbone</strong>的源码谈一谈其实现的核心部分，以及其中一些巧妙的思想和代码实现技巧。</p>
<h1 id="articleHeader0">事件机制（Events）</h1>
<p>事件部分的核心逻辑其实比较简单，简化一下可以用如下的伪代码来表示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var events = {
    evt1: handlers1,
    evt2: handlers2,
    ...
}

//注册事件
function on(name, callback) {
    const handlers = events[name] || (events[name] = []);
    handles.push(callback);
}

//触发事件
function trigger(name) {
    if (!events[name]) {
        return;
    }
    const handlers = events[name];
    for (let i = 0, len = handlers.length; i < len; i++) {
        handlers[i]();
    }
}

//解除绑定
function off(name) {
    delete events[name];
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> events = {
    <span class="hljs-attr">evt1</span>: handlers1,
    <span class="hljs-attr">evt2</span>: handlers2,
    ...
}

<span class="hljs-comment">//注册事件</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">on</span>(<span class="hljs-params">name, callback</span>) </span>{
    <span class="hljs-keyword">const</span> handlers = events[name] || (events[name] = []);
    handles.push(callback);
}

<span class="hljs-comment">//触发事件</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">trigger</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">if</span> (!events[name]) {
        <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-keyword">const</span> handlers = events[name];
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, len = handlers.length; i &lt; len; i++) {
        handlers[i]();
    }
}

<span class="hljs-comment">//解除绑定</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">off</span>(<span class="hljs-params">name</span>) </span>{
    <span class="hljs-keyword">delete</span> events[name];
}
</code></pre>
<p>当然了，以上写法有很多细节的地方没有加入进来，比如<strong>上下文绑定</strong>、<strong>对多种传参方式的支持</strong>、<strong>触发事件时对事件处理器传参的处理</strong>等等。</p>
<p>我们知道，对于<strong>MVC</strong>来说，<strong>M（模型）</strong>的变化会反映在<strong>V（视图）</strong>上，实际上是视图监听了模型的变化，再根据模型去更新自身的状态，这当中最重要的一个功能就是监听<strong>（listen）</strong>。该功能也是由<strong>Events</strong>部分实现的，包括：<strong>listenTo</strong>、<strong>stopListening</strong>等</p>
<p><strong>listenTo</strong>和<strong>on</strong>类似，都是监听一个事件，只不过<strong>listenTo</strong>是监听其他对象的对应事件，而<strong>on</strong>是监听自身的对应事件。<strong>stopListening同</strong>理。比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a.on('testevent', function(){
    alert('1');
});
a.trigger('testevent');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>a.on(<span class="hljs-string">'testevent'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    alert(<span class="hljs-string">'1'</span>);
});
a.trigger(<span class="hljs-string">'testevent'</span>);</code></pre>
<p>如果其他对象希望监听<strong>a</strong>的<strong>testevent</strong>事件呢？则可以通过<strong>listenTo</strong>来实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="b.listenTo(a, 'testevent', function() {
    alert('catch a\'s testevent');
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>b.listenTo(a, <span class="hljs-string">'testevent'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    alert(<span class="hljs-string">'catch a\'s testevent'</span>);
})</code></pre>
<p>其中第一个参数为要监听的对象，第二个参数为事件名称</p>
<p>当调用<strong>on</strong>方法的时候，会为对象自身创建一个<strong>_event</strong>属性；而调用<strong>listenTo</strong>方法时，会为监听对象创建<strong>_event</strong>属性，同时为了记录监听者，被监听对象还会创建一个<strong>_listeners</strong>属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="a.on('testevent', handlers1);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;">a.<span class="hljs-literal">on</span>(<span class="hljs-string">'testevent'</span>, handlers1);</code></pre>
<p><strong>a</strong>会变成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    _events: {
        testevent: [handlers1]
    },
    on: function() {
        //...
    }
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
    _events: {
        testevent: [handlers1]
    },
    on: function() {
        //...
    }
    ...
}</code></pre>
<p>当有其他对象监听<strong>a</strong>时，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    b.listenTo(a, 'testevent', handlers2);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code style="word-break: break-word; white-space: initial;">    <span class="hljs-selector-tag">b</span><span class="hljs-selector-class">.listenTo</span>(a, <span class="hljs-string">'testevent'</span>, handlers2);</code></pre>
<p><strong>a</strong>会变成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    _events: {
        testevent: [handlers1, handlers2]
    },
    _listeners: b,
    on: function() {
        //...
    }
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>{
    _event<span class="hljs-variable">s:</span> {
        testeven<span class="hljs-variable">t:</span> [handlers1, handlers2]
    },
    _listener<span class="hljs-variable">s:</span> <span class="hljs-keyword">b</span>,
    <span class="hljs-keyword">on</span>: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> {</span>
        //...
    }
    ...
}</code></pre>
<p>在事件机制的实现部分，除了核心逻辑之外，在对一些方法的使用上，也很考究。为了绑定函数执行的上下文，我们经常会使用<strong>apply</strong>，<strong>call</strong>这些方法，而源码中多次提到<strong>apply</strong>的执行效率要低一些，因此，有这样的实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// A difficult-to-believe, but optimized internal dispatch function for
// triggering events. Tries to keep the usual cases speedy (most internal
// Backbone events have 3 arguments).
var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args); return;
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>// A difficult-to-believe, but optimized internal dispatch function <span class="hljs-keyword">for</span>
// triggering events. Tries to keep the usual cases speedy (most internal
// Backbone events have <span class="hljs-number">3</span> arguments).
<span class="hljs-built_in">var</span> triggerEvents = function(events, <span class="hljs-built_in">args</span>) {
    <span class="hljs-built_in">var</span> <span class="hljs-built_in">ev</span>, i = -<span class="hljs-number">1</span>, l = events.<span class="hljs-built_in">length</span>, a1 = <span class="hljs-built_in">args</span>[<span class="hljs-number">0</span>], a2 = <span class="hljs-built_in">args</span>[<span class="hljs-number">1</span>], a3 = <span class="hljs-built_in">args</span>[<span class="hljs-number">2</span>];
    switch (<span class="hljs-built_in">args</span>.<span class="hljs-built_in">length</span>) {
      case <span class="hljs-number">0</span>: <span class="hljs-keyword">while</span> (++i &lt; l) (<span class="hljs-built_in">ev</span> = events[i]).callback.call(<span class="hljs-built_in">ev</span>.ctx); <span class="hljs-built_in">return</span>;
      case <span class="hljs-number">1</span>: <span class="hljs-keyword">while</span> (++i &lt; l) (<span class="hljs-built_in">ev</span> = events[i]).callback.call(<span class="hljs-built_in">ev</span>.ctx, a1); <span class="hljs-built_in">return</span>;
      case <span class="hljs-number">2</span>: <span class="hljs-keyword">while</span> (++i &lt; l) (<span class="hljs-built_in">ev</span> = events[i]).callback.call(<span class="hljs-built_in">ev</span>.ctx, a1, a2); <span class="hljs-built_in">return</span>;
      case <span class="hljs-number">3</span>: <span class="hljs-keyword">while</span> (++i &lt; l) (<span class="hljs-built_in">ev</span> = events[i]).callback.call(<span class="hljs-built_in">ev</span>.ctx, a1, a2, a3); <span class="hljs-built_in">return</span>;
      default: <span class="hljs-keyword">while</span> (++i &lt; l) (<span class="hljs-built_in">ev</span> = events[i]).callback.<span class="hljs-built_in">apply</span>(<span class="hljs-built_in">ev</span>.ctx, <span class="hljs-built_in">args</span>); <span class="hljs-built_in">return</span>;
    }
};</code></pre>
<p>有关为什么<strong>call</strong>比<strong>apply</strong>的效率更高的解释可以参考<a href="https://www.w3ctech.com/topic/2070" rel="nofollow noreferrer" target="_blank">这篇文章</a></p>
<h1 id="articleHeader1">模型（Model）</h1>
<p><strong>model</strong>用于维护数据，其中最关键的是对数据的更新部分，即<strong>set</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Trigger all relevant attribute changes.
if (!silent) {
    if (changes.length) this._pending = options;
    for (var i = 0; i < changes.length; i++) {
        this.trigger('change:' + changes[i], this, current[changes[i]], options);
    }
}

// You might be wondering why there's a `while` loop here. Changes can
// be recursively nested within `&quot;change&quot;` events.
if (changing) return this;
if (!silent) {
    while (this._pending) {
        options = this._pending;
        this._pending = false;
        this.trigger('change', this, options);
    }
}
this._pending = false;
this._changing = false;
return this;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">// Trigger all relevant attribute changes.</span>
<span class="hljs-keyword">if</span> (!silent) {
    <span class="hljs-keyword">if</span> (changes.length) <span class="hljs-keyword">this</span>._pending = options;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; changes.length; i++) {
        <span class="hljs-keyword">this</span>.trigger(<span class="hljs-string">'change:'</span> + changes[i], <span class="hljs-keyword">this</span>, current[changes[i]], options);
    }
}

<span class="hljs-comment">// You might be wondering why there's a `while` loop here. Changes can</span>
<span class="hljs-comment">// be recursively nested within `"change"` events.</span>
<span class="hljs-keyword">if</span> (changing) <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
<span class="hljs-keyword">if</span> (!silent) {
    <span class="hljs-keyword">while</span> (<span class="hljs-keyword">this</span>._pending) {
        options = <span class="hljs-keyword">this</span>._pending;
        <span class="hljs-keyword">this</span>._pending = <span class="hljs-literal">false</span>;
        <span class="hljs-keyword">this</span>.trigger(<span class="hljs-string">'change'</span>, <span class="hljs-keyword">this</span>, options);
    }
}
<span class="hljs-keyword">this</span>._pending = <span class="hljs-literal">false</span>;
<span class="hljs-keyword">this</span>._changing = <span class="hljs-literal">false</span>;
<span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;</code></pre>
<p>每次<strong>set</strong>数据的时候，根据数据变化的部分，使用<strong>trigger</strong>方法触发相应的事件；在<strong>set</strong>数据时，如果不希望触发<strong>change</strong>事件，可以设置<strong>silent</strong>为<strong>true</strong>。</p>
<p>这部分比较容易让人产生疑惑的是<strong>while</strong>循环部分，这个<strong>while</strong>循环有什么用呢？举个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Model.on(&quot;change&quot;, function() {
    console.log('model change');
}).set({
    a: 1
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">new</span> <span class="hljs-type">Model</span>.on(<span class="hljs-string">"change"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span></span>() {
    console.log(<span class="hljs-string">'model change'</span>);
}).<span class="hljs-keyword">set</span>({
    a: <span class="hljs-type">1</span>
});</code></pre>
<p>以上代码是最简单的情况，监听<strong>change</strong>事件，当<strong>model</strong>变化时，打印出<strong>model change</strong><br>在源码中，当第一次进入<strong>while</strong>后，紧接着<strong>this._pending</strong>被置为<strong>false</strong>，而事件触发回调函数也不会更改<strong>this._pending</strong>的值，因此再次判断时条件不成立，<strong>while</strong>内的代码段只会执行一次。</p>
<p>但是实际情况往往不是这么简单，如代码注释中所说，有可能会有嵌套的情况，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new Model.on(&quot;change&quot;, function() {
    this.set({
        b: 1
    })
}).set({
    a: 1
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">new</span> <span class="hljs-type">Model</span>.on(<span class="hljs-string">"change"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span></span>() {
    <span class="hljs-built_in">this</span>.<span class="hljs-keyword">set</span>({
        b: <span class="hljs-type">1</span>
    })
}).<span class="hljs-keyword">set</span>({
    a: <span class="hljs-type">1</span>
});</code></pre>
<p>在这种情况下，第一次<strong>trigger</strong>触发<strong>change</strong>的回调函数中，又再次对<strong>model</strong>进行了更新操作，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.set({
    b: 1
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">this</span><span class="hljs-selector-class">.set</span>({
    <span class="hljs-attribute">b</span>: <span class="hljs-number">1</span>
})</code></pre>
<p>每次<strong>set</strong>时，会更新<strong>this._pending</strong>为<strong>true</strong>，这样当<strong>set b</strong>后，就会再次进入<strong>while</strong>内，触发<strong>change</strong>事件。而如果没有使用<strong>while</strong>循环的话，对<strong>b</strong>属性更新的操作就无法触发<strong>change</strong>事件，导致其监听者到无法根据最新的数据更新自身状态。</p>
<h1 id="articleHeader2">视图（View）</h1>
<p><strong>View</strong>部分的实现比较简单，其中最主要的是<strong>events</strong>部分，通常在一个<strong>View</strong>中，都会绑定一些<strong>dom</strong>事件，比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    'click .preview-btn': 'preview',
    'click .save-btn': 'save'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sml"><code>{
    <span class="hljs-symbol">'click</span> .preview-btn': <span class="hljs-symbol">'preview'</span>,
    <span class="hljs-symbol">'click</span> .save-btn': <span class="hljs-symbol">'save'</span>
}</code></pre>
<p>主要有两点需要说明：</p>
<ul>
<li>
<strong>backbone</strong>中是采用的事件委托的方式绑定事件，因此，一些不冒泡的事件，比如<strong>scroll</strong>，是无法通过这样的方式绑定的</li>
<li>回调函数会保持正确的<strong>this</strong>指向。<strong>backbone</strong>内部进行了处理</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="delegateEvents: function(events) {
    events || (events = _.result(this, 'events'));
    if (!events) return this;
    this.undelegateEvents();
    for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[method];
        if (!method) continue;
        var match = key.match(delegateEventSplitter);
        this.delegate(match[1], match[2], _.bind(method, this));
    }
    return this;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>delegateEvents: function(events) {
    events || (events = _.result(<span class="hljs-keyword">this</span>, <span class="hljs-string">'events'</span>));
    <span class="hljs-keyword">if</span> (!events) <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">this</span>.undelegateEvents();
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> key <span class="hljs-keyword">in</span> events) {
        <span class="hljs-keyword">var</span> method = events[key];
        <span class="hljs-keyword">if</span> (!_.isFunction(method)) method = <span class="hljs-keyword">this</span>[method];
        <span class="hljs-keyword">if</span> (!method) <span class="hljs-keyword">continue</span>;
        <span class="hljs-keyword">var</span> match = key.match(delegateEventSplitter);
        <span class="hljs-keyword">this</span>.delegate(match[<span class="hljs-number">1</span>], match[<span class="hljs-number">2</span>], _.bind(method, <span class="hljs-keyword">this</span>));
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
}</code></pre>
<h1 id="articleHeader3">结语</h1>
<p>以上部分介绍了<strong>backbone</strong>中最核心部分的实现机制。可以看到其实现非常的简单，但是对于小型项目来说，确实可以帮我们做一些对数据的维护和管理工作，提高开发效率。但是随着业务逐渐复杂，会越来越发现，<strong>backbone</strong>所能做的实现有限，而对于数据维护部分也非常不方便，尤其是需要是对多个模块间的通信和数据维护问题。后续我会结合在复杂业务中的使用谈一谈<strong>backbone</strong>的缺点，以及更优的框架能带来的便利。</p>
<p>说句题外话，虽然去年由于时间原因选择了<strong>backbone</strong>，这一年基本没有在复杂业务场景中使用<strong>react</strong>技术栈，都是自己做个小<strong>demo</strong>练手。但是也正是因为有了使用<strong>backbone</strong>去写复杂业务的经历，在数据维护上和模块间通信上非常麻烦，以及<strong>backbone</strong>渲染<strong>dom</strong>时直接全部更新的会导致的页面渲染性能问题，才更让我感觉<strong>react</strong> + <strong>redux</strong>的美好。知其然，还需知其所以然啊~ ~ <br>不然我觉得我可能会一直疑惑为什么要用一套这么复杂的技术栈，异步请求这块写起来还那么麻烦。这么看，坏事也算是好事了吧~~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
小而美的backbone

## 原文链接
[https://segmentfault.com/a/1190000012967515](https://segmentfault.com/a/1190000012967515)

