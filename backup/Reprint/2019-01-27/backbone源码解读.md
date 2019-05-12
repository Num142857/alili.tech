---
title: 'backbone源码解读' 
date: 2019-01-27 2:30:59
hidden: true
slug: 8nnhbxlbo8
categories: [reprint]
---

{{< raw >}}

                    
<h5>写在前面</h5>
<p>backbone是我两年多前入门前端的时候接触到的第一个框架，当初被backbone的强大功能所吸引(当然的确比裸写js要好得多)，虽然现在backbone并不算最主流的前端框架了，但是，它里面大量设计模式的灵活运用，以及令人赞叹的处理技巧，还是非常值得学习。个人认为，读懂老牌框架的源代码比会用流行框架的API要有用的多。</p>
<p>另外，backbone的源代码最近也改了许多(特别是针对<strong>ES6</strong>)，所以有些老旧的分析，可能会和现在的源代码有些出入。</p>
<p>所以我写这一篇分析backbone的文章，供自己和大家一起学习，本文适合使用过backbone的朋友，笔者水平有限，而内容又实有点多，难免会出差错，欢迎大家在<a href="https://github.com/aircloud/backboneAnalyze" rel="nofollow noreferrer" target="_blank">GitHub</a>上指正</p>
<p>接下来，我们将通过一篇文章解析backbone，我们是按照源码的顺序来讲解的，这有利于大家边看源代码边解读，另外，<strong>我给源代码加了全部的中文注释和批注</strong>，请见<a href="https://github.com/aircloud/backboneAnalyze/tree/master/src" rel="nofollow noreferrer" target="_blank">这里</a>，强烈建议大家边看源码边看解析，并且遇到我给出外链的地方，最好把外链的内容也看看(如果能够给大家帮助，欢迎给star鼓励～)</p>
<p>当然，这篇文章很长[为了避免文章有上没下，我还是整合到一篇文章中了]。</p>
<h3 id="articleHeader0">backbone宏观解读</h3>
<p>backbone是很早期将MVC的思想带入前端的框架，现在MVC以及后来的MVVM这么火可以在一定程度上归功于backbone。关于前端MVC，我在自己的<a href="http://aircloud.10000h.top/29" rel="nofollow noreferrer" target="_blank">这篇文章</a>中结合阮一峰老师的图示简单分析过，简单来讲就是Model层控制数据，View层通过发布订阅(在backbone中)来处理和用户的交互，Controller是控制器，在这里主要是指backbone的路由功能。这样的设计非常直接清晰，有利于前端工程化。</p>
<p>backbone中主要实现了Model、Collection、View、Router、History几大功能，前四种我们用的比较多，另外backbone基于发布-订阅模式自己实现了一套对象的事件系统Events，简单来说Events可以让对象拥有事件能力，其定义了比较丰富的API，并且如果你引入了backbone，这套事件系统还可以集成到自己的对象上，这是一个非常好的设计。</p>
<p>另外，源代码中所有的以<code>_</code>开头的方法，可以认为是私有方法，是没有必要直接使用的，也不建议用户覆盖。</p>
<h3 id="articleHeader1">backbone模块化处理、防止冲突和underscore混入</h3>
<p>代码首先进行了区分使用环境(self或者是global,前者代表浏览器环境(self和window等价)，后者代表node环境)和模块化处理操作，之后处理了在AMD和CommonJS加载规范下的引入方式，并且明确声明了对jQuery(或者Zepto)和underscore的依赖。</p>
<p>很遗憾的是，虽然backbone这样做了，但是backbone并不适合在node端直接使用，也不适合服务端渲染，另外还和ES6相处的不是很融洽，这个我们后面还会陆续提到原因。</p>
<h4>backbone noConflict</h4>
<p>backbone也向jQuery致敬，学习了它的处理冲突的方式:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var previousBackbone = root.Backbone;
//...
Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> previousBackbone = root.Backbone;
<span class="hljs-comment">//...</span>
Backbone.noConflict = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    root.Backbone = previousBackbone;
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
};</code></pre>
<p>这段代码的逻辑非常简单，我们可以通过以下方式使用:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var localBackbone = Backbone.noConflict();   
var model = localBackbone.Model.extend(...);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">var localBackbone</span> = Backbone.noConflict();   
<span class="hljs-attribute">var model</span> = localBackbone.Model.extend(...);</code></pre>
<h4>混入underscore的方法</h4>
<p>backbone通过addUnderscoreMethods将一些underscore的实用方法混入到自己定义的几个类中(注:确切地说是可供构造调用的函数,我们下文也会用类这个简单明了的说法代替)。</p>
<p>这里面值得一提的是关于underscore的方法(underscore的源码解读请移步<a href="https://github.com/aircloud/underscore-analysis" rel="nofollow noreferrer" target="_blank">这里</a>,fork from韩子迟)，underscore的所有方法的参数序列都是固定的，也就是说第一个参数代表什么第二个参数代表什么，所有函数都是一致的，第一个参数一定代表目标对象，第二个参数一定代表作用函数(有的函数可能只有一个参数),在有三个参数的情况下，第三个参数代表上下文this，另外如果有第四个参数，第三个参数代表初始值或者默认值，第四个参数代表上下文。所以addMethod就是根据以上规定来使用的。</p>
<p>另外关于javascript中的this，我曾经写过博客<a href="http://aircloud.10000h.top/38" rel="nofollow noreferrer" target="_blank">在这里</a>,有兴趣的可以看</p>
<p>混入方法的实现逻辑:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var addMethod = function(length, method, attribute) {
  //... 
};
var addUnderscoreMethods = function(Class, methods, attribute) {
    _.each(methods, function(length, method) {
      if (_[method]) Class.prototype[method] = addMethod(length, method, attribute);
    });
};
//之后使用：
var modelMethods = {keys: 1, values: 1, pairs: 1, invert: 1, pick: 0,
      omit: 0, chain: 1, isEmpty: 1};
//混入一些underscore中常用的方法
addUnderscoreMethods(Model, modelMethods, 'attributes');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> addMethod = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(length, method, attribute)</span> </span>{
  <span class="hljs-comment">//... </span>
};
<span class="hljs-keyword">var</span> addUnderscoreMethods = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(Class, methods, attribute)</span> </span>{
    _.each(methods, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(length, method)</span> </span>{
      <span class="hljs-keyword">if</span> (_[method]) Class.prototype[method] = addMethod(length, method, attribute);
    });
};
<span class="hljs-comment">//之后使用：</span>
<span class="hljs-keyword">var</span> modelMethods = {keys: <span class="hljs-number">1</span>, values: <span class="hljs-number">1</span>, pairs: <span class="hljs-number">1</span>, invert: <span class="hljs-number">1</span>, pick: <span class="hljs-number">0</span>,
      omit: <span class="hljs-number">0</span>, chain: <span class="hljs-number">1</span>, isEmpty: <span class="hljs-number">1</span>};
<span class="hljs-comment">//混入一些underscore中常用的方法</span>
addUnderscoreMethods(Model, modelMethods, <span class="hljs-string">'attributes'</span>);</code></pre>
<h3 id="articleHeader2">backbone Events</h3>
<p>backbone的Events是一个对象,其中的方法(onlistenTooffstopListeningoncelistenToOncetrigger)都是对象方法。</p>
<p>总体上，backbone的Events实现了监听/触发/解除对自己对象本身的事件，也可以让一个对象监听/解除监听另外一个对象的事件。</p>
<h4>绑定对象自身的监听事件on</h4>
<p>关于对象自身事件的绑定，这个比较简单，除了最基本的绑定之外(一个事件一个回调)，backbone还支持以下两种方式的绑定：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//传统方式
model.on(&quot;change&quot;, common_callback);  

//传入一个名称，回调函数的对象
model.on({ 
     &quot;change&quot;: on_change_callback,
     &quot;remove&quot;: on_remove_callback
});  

//使用空格分割的多个事件名称绑定到同一个回调函数上
model.on(&quot;change remove&quot;, common_callback);  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code><span class="hljs-comment">//传统方式</span>
model.<span class="hljs-keyword">on</span>(<span class="hljs-string">"change"</span>, common_callback);  

<span class="hljs-comment">//传入一个名称，回调函数的对象</span>
model.<span class="hljs-keyword">on</span>({ 
     <span class="hljs-string">"change"</span>: on_change_callback,
     <span class="hljs-string">"remove"</span>: on_remove_callback
});  

<span class="hljs-comment">//使用空格分割的多个事件名称绑定到同一个回调函数上</span>
model.<span class="hljs-keyword">on</span>(<span class="hljs-string">"change remove"</span>, common_callback);  </code></pre>
<p>这用到了它定义的一个中间函数eventsApi，这个函数比较实用，可以根据判断使用的是哪种方式(实际上这个判断也比较简单，根据传入的是对象判断属于上述第二种方式，根据正则表达式判断是上述的第三种方式，否则就是传统的方式)。然后再进行递归或者循环或者直接处理。</p>
<p>在对象中存储事件实际上大概是下述形式:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="events:{
    change:[事件一,事件二]
    move:[事件一,事件二,事件三]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">events</span>:{
    <span class="hljs-attribute">change</span>:[事件一,事件二]
    move:[事件一,事件二,事件三]
}</code></pre>
<p>而其中的事件实际上是一个整理好的对象，是如下形式:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{callback: callback, context: context, ctx: context || ctx, listening: listening}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;">{<span class="hljs-attribute">callback</span>: callback, context: context, ctx: context || ctx, listening: listening}</code></pre>
<p>这样在触发的时候,一个个调用就是了。</p>
<h4>监听其他对象的事件listenTo</h4>
<p>backbone还支持监听其他对象的事件，比如，B对象上面发生b事件的时候，通知A调用回调函数<code>A.listenTo(B, “b”, callback);</code>，而这也是backbone处理非常巧妙的地方，我们来看看它是怎么做的。</p>
<p>实际上，这和B监听自己的事件，并且在回调函数的时候把上下文变成A，是差不多的:<code>B.on(“b”, callback, A);</code>(on的第三个参数代表上下文)。</p>
<p>但是backbone还做了另外的事情，这里我们假设是A监听B的一个事件(比如change事件好了)。</p>
<p>首先A有一个<code>A._listeningTo</code>属性，这个属性是一个对象，存放着它监听的别的对象的信息<code>A._listeningTo[id] = {obj: obj, objId: id, id: thisId, listeningTo: listeningTo, count: 0}</code>,这个id并不是数字，是每一个对象都有的唯一字符串，是通过<code>_.uniqueId</code>这个underscore方法生成的，这里的obj是B，objId是B的_listenId,id是A的_listenId,count是一个计数功能,而这个<code>A._listeningTo[id]</code>会被直接引用赋值到上面事件对象的listening属性中。</p>
<h4>为什么要多listenTo？Inversion of Control</h4>
<p>通过以上我们似乎有一个疑问，好像on就能把listenTo的功能搞定了，用一个listenTo纯属多余，并且许多其他的类库也是只有一个on方法。</p>
<p>首先，这里会引入一个概念:<strong>控制反转</strong>，所谓控制反转，就是原来这个是B对象来控制的事件我们现在交由A对象来控制，那现在假设A分别listenTo B、C、D三个对象,那么这个时候假设A不监听了，那么我们直接对A调用一个stopListening方法，则可以同时解除对B、C、D的监听(这里我讲的可能不是十分正确，这里另外推荐一个<a href="https://segmentfault.com/a/1190000002549651">文章</a>)。</p>
<p>另外，我们需要从backbone的设计初衷来看，backbone的重点是View、Model和Collection，实际上，backbone的View可以对应一个或者多个Collection，当然我们也可以让View直接对应Model，但问题是View也并不一定对应一个Model，可能对应多个Model，那么这个时候我们通过listenTo和stopListening可以非常方便的添加、解除监听。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//on的方式绑定
var view = {
    DoSomething :function(some){
       //...
    }
}
model.on('change:some',view.DoSomething,view);
model2.on('change:some',view.DoSomething,view);

//解绑,这个时候要做的事情比较多且乱
model.off('change:some',view.DoSomething,view);
model2.off('change:some',view.DoSomething,view);

//listenTo的方式绑定
view.listenTo(model,'change:some',view.DoSomething);
view.listenTo(model2,'change:some',view.DoSomething);

//解绑
view.stopListening();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>//on的方式绑定
<span class="hljs-built_in">var</span> <span class="hljs-built_in">view</span> = {
    DoSomething :function(<span class="hljs-built_in">some</span>){
       //...
    }
}
model.on('change:<span class="hljs-built_in">some</span>',<span class="hljs-built_in">view</span>.DoSomething,<span class="hljs-built_in">view</span>);
model2.on('change:<span class="hljs-built_in">some</span>',<span class="hljs-built_in">view</span>.DoSomething,<span class="hljs-built_in">view</span>);

//解绑,这个时候要做的事情比较多且乱
model.off('change:<span class="hljs-built_in">some</span>',<span class="hljs-built_in">view</span>.DoSomething,<span class="hljs-built_in">view</span>);
model2.off('change:<span class="hljs-built_in">some</span>',<span class="hljs-built_in">view</span>.DoSomething,<span class="hljs-built_in">view</span>);

//listenTo的方式绑定
<span class="hljs-built_in">view</span>.listenTo(model,'change:<span class="hljs-built_in">some</span>',<span class="hljs-built_in">view</span>.DoSomething);
<span class="hljs-built_in">view</span>.listenTo(model2,'change:<span class="hljs-built_in">some</span>',<span class="hljs-built_in">view</span>.DoSomething);

//解绑
<span class="hljs-built_in">view</span>.stopListening();</code></pre>
<p>另外，在实际使用中，listengTo的写法也的确更加符合用户的习惯.</p>
<p>以下是摘自backbone官方文档的一些解释，仅供参考:</p>
<blockquote><p>The advantage of using this form, instead of other.on(event, callback, object), is that listenTo allows the object to keep track of the events, and they can be removed all at once later on. The callback will always be called with object as context.</p></blockquote>
<h4>解除绑定事件off、stopListening</h4>
<p>与on不同，off的三个参数都是可选的</p>
<ul>
<li><p>如果没有任何参数，off相当于把对应的_events对象整体清空</p></li>
<li><p>如果有name参数但是没有具体指定哪个callback的时候，则把这个name(事件)对应的回调队列全部清空</p></li>
<li><p>如果还有进一步详细的callback和context，那么这个时候移除回调函数非常严格，必须要求上下文和原来函数完全一致</p></li>
</ul>
<p>off的最终实现函数是offApi,这个函数算上注释有大概50行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var offApi = function(events, name, callback, options) {
  //... 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> offApi = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(events, name, callback, options)</span> </span>{
  <span class="hljs-comment">//... </span>
}</code></pre>
<p>这里面需要单独提一下，前面有这样的几行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (!name &amp;&amp; !callback &amp;&amp; !context) {
      var ids = _.keys(listeners);//所有监听它的对应的属性
      for (; i < ids.length; i++) {
        listening = listeners[ids[i]];
        delete listeners[listening.id];
        delete listening.listeningTo[listening.objId];
      }
      return;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-keyword">if</span> (!name &amp;&amp; !callback &amp;&amp; !<span class="hljs-built_in">context</span>) {
      <span class="hljs-built_in">var</span> ids = <span class="hljs-symbol">_</span>.keys(listeners);//所有监听它的对应的属性
      <span class="hljs-keyword">for</span> (; i &lt; ids.<span class="hljs-built_in">length</span>; i++) {
        listening = listeners[ids[i]];
        <span class="hljs-built_in">delete</span> listeners[listening.id];
        <span class="hljs-built_in">delete</span> listening.listeningTo[listening.objId];
      }
      <span class="hljs-built_in">return</span>;
}</code></pre>
<p>这几行是做了一件什么事呢？  <br>删除了所有的多对象监听事件记录,之后删除自身的监听事件。我们假设A监听了B的一个事件，这个时候<code>A._listenTo</code>中就会多一个条目，存储这个监听事件的信息,而这个时候B的<code>B._listeners</code>也会多一个条目，存储监听事件的信息，<em>注意这两个条目都是按照id为键的键值对来存储，但是这个键是不一样的，值都指向同一个对象，这里删除对这个对象的引用，之后就可以被垃圾回收机制回收了</em>。如果这个时候调用<code>B.off()</code>，那么这个时候，以上的两个条目都被删除了。另外，注意最后的return,以及Events.off中的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this._events = eventsApi(offApi, this._events, name, callback, {
      context: context,
      listeners: this._listeners
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">this</span>._events = eventsApi(offApi, <span class="hljs-keyword">this</span>._events, name, callback, {
      context: context,
      listeners: <span class="hljs-keyword">this</span>._listeners
});</code></pre>
<p>所以如果<code>B.off()</code>这样调用然后直接把 B._events 在之后也清空了，<strong>太巧妙了</strong>。</p>
<p>之后有一个对names(事件名)的循环(如果没有指定,那么默认就是所有names),这个循环内容理解起来比较简单，里面也顺便照顾了_listeners_listenTo这些变量。这里不过多解释了。</p>
<p>另外，stopListening实际上也是调用offApi，先处理了一下交给off函数，这也是设计模式运用典范(适配器模式)。</p>
<h4>once和listenToOnce</h4>
<p>这两个函数顾名思义，和on以及listenTo的区别不大，唯一的区别就是回调函数只供调用一次，多触发调用也没有用(实际上不会被触发了)。</p>
<p>两者都用到了onceMap这个函数，我们分析一下这个函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var onceMap = function(map, name, callback, offer) {
    if (callback) {
      //_.once:创建一个只能调用一次的函数。重复调用改进的方法也没有效果，只会返回第一次执行时的结果。 作为初始化函数使用时非常有用, 不用再设一个boolean值来检查是否已经初始化完成.
      var once = map[name] = _.once(function() {
        offer(name, once);
        callback.apply(this, arguments);
      });
      //这个在解绑的时候有一个分辨效果
      once._callback = callback;
    }
    return map;
 };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code> <span class="hljs-keyword">var</span> onceMap = <span class="hljs-function"><span class="hljs-keyword">function</span></span>(map, name, <span class="hljs-keyword">callback</span>, offer) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">callback</span>) {
      <span class="hljs-comment">//_.once:创建一个只能调用一次的函数。重复调用改进的方法也没有效果，只会返回第一次执行时的结果。 作为初始化函数使用时非常有用, 不用再设一个boolean值来检查是否已经初始化完成.</span>
      <span class="hljs-keyword">var</span> once = map[name] = <span class="hljs-literal">_</span>.once(<span class="hljs-function"><span class="hljs-keyword">function</span></span>() {
        offer(name, once);
        <span class="hljs-keyword">callback</span>.apply(<span class="hljs-built_in">this</span>, arguments);
      });
      <span class="hljs-comment">//这个在解绑的时候有一个分辨效果</span>
      once._callback = <span class="hljs-keyword">callback</span>;
    }
    <span class="hljs-keyword">return</span> map;
 };</code></pre>
<p>backbone的设计思路是这样的:用<code>_.once()</code>创建一个只能被调用一次的函数，这个函数在第一次被触发调用的时候，进行解除绑定(offer实际上是一个已经绑定好this的解除绑定函数，这个可以参见once和listenToOnce的源代码)，然后再调用callback，这样既实现了调用一次的目的，也方便了垃圾回收。</p>
<p>其他和on以及listenTo的时候一样，这里就不过多介绍了。</p>
<h4>trigger</h4>
<p>trigger函数是用于触发事件，支持多个参数，除了第一个参数以外，其他的参数会依次放入触发事件的回调函数的参数中(backbone默认对3个参数及以下的情况下进行call调用,这种处理方式原因之一是call调用比apply调用的效率更高从而优先使用(关于call和apply的性能对比：<a href="https://jsperf.com/call-apply-segu" rel="nofollow noreferrer" target="_blank"></a><a href="https://jsperf.com/call-apply-segu" rel="nofollow noreferrer" target="_blank">https://jsperf.com/call-apply...</a>)，另外一方面源码中并没有超过三个参数的情况，所以用call支持到了三个参数，其余情况采用性能较差但是写起来方便的apply)。</p>
<p>另外值得一提的是，Events支持all事件，即如果你监听了all事件，那么任何事件的触发都会调用all事件的回调函数列。</p>
<p>关于trigger部分的源代码比较简单，并且我也增加了一些评注，这里就不贴代码了。</p>
<h4>context 和 ctx</h4>
<p>有心的朋友也许注意到，backbone在事件中用到了context和ctx这两个"貌似"表示当前上下文的对象，并且在如果有context的情况下，这两个几乎一样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" handlers.push({callback: callback, context: context, ctx: context || ctx, listening: listening});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"> <span class="hljs-selector-tag">handlers</span><span class="hljs-selector-class">.push</span>({<span class="hljs-attribute">callback</span>: callback, context: context, ctx: context || ctx, listening: listening});</code></pre>
<p>这里我根据自己的理解，尽量解释一下。</p>
<p>我们可以主要看off方法及trigger方法，我们发现上面两属性在这两个方法中分别被使用了。   </p>
<p>在<code>off</code>里需要对<code>context</code>进行比较决定是否要删除对应的事件，所以<code>model._events</code>中保存下来的<code>context</code>,必须是未做修改的。   </p>
<p>而trigger里在执行回调函数时，需要指定其作用域，当绑定事件时没有给定作用域，则会使用被监听的对象当回调函数的作用域。</p>
<p>实际上，我觉得这个<code>ctx</code>有点多余，我们完全可以在<code>trigger</code>中这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(ev = events[i]).callback.call(ev.context || ev.obj)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code style="word-break: break-word; white-space: initial;">(<span class="hljs-built_in">ev</span> = events[i]).callback.call(<span class="hljs-built_in">ev</span>.<span class="hljs-built_in">context</span> || <span class="hljs-built_in">ev</span>.obj)</code></pre>
<h3 id="articleHeader3">backbone Model</h3>
<p>backbone的Model实际上是一个可供构造调用的函数，backbone采用污染原型的方式把定义好的属性都定义在了prototype上，这可能并不是一个非常妥当的做法，但是在backbone中这样做却是没有什么不可以的，这个我们在之后讲extend方法的时候会进行补充。</p>
<p>我们先看看这个函数在实例化的时候会做点什么：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var Model = Backbone.Model = function(attributes, options) {
    var attrs = attributes || {};
    options || (options = {});
    //这个preinitialize函数实际上是为空的,可以给有兴趣的开发者重写这个函数，在初始化Model之前调用
    this.preinitialize.apply(this, arguments);
    //Model的唯一的id
    this.cid = _.uniqueId(this.cidPrefix);
    this.attributes = {};
    if (options.collection) this.collection = options.collection;
    //如果之后new的时候传入的是JSON,我们必须在options选项中声明parse为true
    if (options.parse) attrs = this.parse(attrs, options) || {};
    //_.result:如果指定的property的值是一个函数，那么将在object上下文内调用它;否则，返回它。如果提供默认值，并且属性不存在，那么默认值将被返回。如果设置defaultValue是一个函数，它的结果将被返回。
    //这里调用_.result相当于给出了余地，自己写defaults的时候可以直接写一个对象，也可以写一个函数，通过return一个对象的方式把属性包含进去
    var defaults = _.result(this, 'defaults');
    //defaults应该是在Backbone.Model.extends的时候由用户添加的，用defaults对象填充object 中的undefined属性。 并且返回这个object。一旦这个属性被填充，再使用defaults方法将不会有任何效果。
    attrs = _.defaults(_.extend({}, defaults, attrs), defaults);
    this.set(attrs, options);
    //存储历史变化记录
    this.changed = {};
    //这个initialize也是空的，给初始化之后调用
    this.initialize.apply(this, arguments);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code> <span class="hljs-keyword">var</span> Model = Backbone.Model = function(attributes, options) {
    <span class="hljs-keyword">var</span> attrs = attributes || {};
    options || (options = {});
    <span class="hljs-comment">//这个preinitialize函数实际上是为空的,可以给有兴趣的开发者重写这个函数，在初始化Model之前调用</span>
    <span class="hljs-keyword">this</span>.preinitialize.apply(<span class="hljs-keyword">this</span>, arguments);
    <span class="hljs-comment">//Model的唯一的id</span>
    <span class="hljs-keyword">this</span>.cid = _.uniqueId(<span class="hljs-keyword">this</span>.cidPrefix);
    <span class="hljs-keyword">this</span>.attributes = {};
    <span class="hljs-keyword">if</span> (options.collection) <span class="hljs-keyword">this</span>.collection = options.collection;
    <span class="hljs-comment">//如果之后new的时候传入的是JSON,我们必须在options选项中声明parse为true</span>
    <span class="hljs-keyword">if</span> (options.parse) attrs = <span class="hljs-keyword">this</span>.parse(attrs, options) || {};
    <span class="hljs-comment">//_.result:如果指定的property的值是一个函数，那么将在object上下文内调用它;否则，返回它。如果提供默认值，并且属性不存在，那么默认值将被返回。如果设置defaultValue是一个函数，它的结果将被返回。</span>
    <span class="hljs-comment">//这里调用_.result相当于给出了余地，自己写defaults的时候可以直接写一个对象，也可以写一个函数，通过return一个对象的方式把属性包含进去</span>
    <span class="hljs-keyword">var</span> defaults = _.result(<span class="hljs-keyword">this</span>, <span class="hljs-string">'defaults'</span>);
    <span class="hljs-comment">//defaults应该是在Backbone.Model.extends的时候由用户添加的，用defaults对象填充object 中的undefined属性。 并且返回这个object。一旦这个属性被填充，再使用defaults方法将不会有任何效果。</span>
    attrs = _.defaults(_.extend({}, defaults, attrs), defaults);
    <span class="hljs-keyword">this</span>.<span class="hljs-keyword">set</span>(attrs, options);
    <span class="hljs-comment">//存储历史变化记录</span>
    <span class="hljs-keyword">this</span>.changed = {};
    <span class="hljs-comment">//这个initialize也是空的，给初始化之后调用</span>
    <span class="hljs-keyword">this</span>.initialize.apply(<span class="hljs-keyword">this</span>, arguments);
};</code></pre>
<p>我们可以看出，this.attributes是存储实际内容的。</p>
<p>另外，preinitialize和initialize不仅在Model中有,在之后的Collection、View和Router中也都出现了，一个是在初始化前调用，另外一个是在初始化之后调用。</p>
<p>关于preinitialize的问题，我们后文还要继续讨论，它的出现和ES6有关。</p>
<h4>Model set</h4>
<p>Model的set方法是一个重点的方法，这个方法的功能比较多，本身甚至还可以删除属性，因为unset内部和clear的内部等也调用了set方法。在用户手动赋值的时候，支持下面两种赋值方式：<code>"key", value</code> 和<code>{key: value}</code>两种赋值方式。</p>
<p>我们分析这个函数总共做了哪些事情：</p>
<ul>
<li><p>对两种赋值方式的支持<code>"key", value</code>和<code>{key: value}</code>的预处理。</p></li>
<li><p>如果你写了validate验证函数没有通过验证，那么就不继续做了(需要显式声明使用validate)。</p></li>
<li><p>进行变量的更改或者删除，顺便把历史版本的问题解决掉。</p></li>
<li><p>如果不是静默set的，那么这个时候开始进行change事件的触发。</p></li>
</ul>
<p>具体这一块注释笔者写的非常详细，所以在这里也不再赘述。</p>
<h4>fetch、save、destroy</h4>
<p>这几个功能是需要跟服务端交互的，所以我们放在一起来分析一下。</p>
<p>backbone通过封装好模型和服务器交互的函数，大大方便了开发者和服务端数据同步的工作，当然，这需要一个对应的后端，不仅需要支持POST、PUT、PATCH、DELETE、GET多种请求，甚至连url的格式都给定义好了，url的格式为：yourUrl/id，这个id肯定是需要我们传入的，并且要求跟服务器上的id对应(毕竟服务器要识别处理)</p>
<p><em>注意：url并不一定非要按照backbone的来，我们完全可以调用这几个方法的时候再指定一个url<code>{url:myurl,success:successFunction}</code>,这个部分backbone 在sync函数中进行了一个判断处理，优先选择后指定的url,不过这样对我们来说是比较麻烦的，也并不符合backbone的设计初衷</em></p>
<p>这三个函数最后都用到了sync函数，所以我们要先分析sync函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Backbone.sync = function(method, model, options) {
  //...
};
  
Backbone.ajax = function() {
  return Backbone.$.ajax.apply(Backbone.$, arguments);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>Backbone.sync = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">method, model, options</span>) </span>{
  <span class="hljs-comment">//...</span>
};
  
Backbone.ajax = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> Backbone.$.ajax.apply(Backbone.$, <span class="hljs-built_in">arguments</span>);
};</code></pre>
<p>sync函数在其中调用了ajax函数，而ajax函数就是jQuery的ajax，这个我们非常熟悉，它可以插入非常多的参数，我们可以<a href="http://api.jquery.com/jquery.ajax/" rel="nofollow noreferrer" target="_blank">这里</a>查看文档。</p>
<p>另外，这个sync支持两个特殊情况：</p>
<ul>
<li><p>emulateHTTP:如果你想在不支持Backbone的默认REST/ HTTP方式的Web服务器上工作， 您可以选择开启Backbone.emulateHTTP。 设置该选项将通过 POST 方法伪造 PUT，PATCH 和 DELETE 请求 用真实的方法设定X-HTTP-Method-Override头信息。 如果支持emulateJSON，此时该请求会向服务器传入名为 _method 的参数。</p></li>
<li><p>emulateJSON:如果你想在不支持发送 application/json 编码请求的Web服务器上工作，设置Backbone.emulateJSON = true;将导致JSON根据模型参数进行序列化， 并通过application/x-www-form-urlencoded MIME类型来发送一个伪造HTML表单请求</p></li>
</ul>
<p>具体的这个sync方法，就是构造ajax参数的过程。</p>
<h5>fetch</h5>
<p>fetch可以传入一个回调函数，这个回调函数会在ajax的回调函数中被调用，另外ajax的回调函数是在fetch中定义的，这个回调函数做了这样几件事情：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" options.success = function(resp) {
        //处理返回数据
        var serverAttrs = options.parse ? model.parse(resp, options) : resp;
        //根据服务器返回数据设置模型属性
        if (!model.set(serverAttrs, options)) return false;
        //触发自定义回调函数
        if (success) success.call(options.context, model, resp, options);
        //触发事件
        model.trigger('sync', model, resp, options);
 };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code> <span class="hljs-keyword">options</span>.success = function(resp) {
        <span class="hljs-comment">//处理返回数据</span>
        var serverAttrs = <span class="hljs-keyword">options</span>.parse ? model.parse(resp, <span class="hljs-keyword">options</span>) : resp;
        <span class="hljs-comment">//根据服务器返回数据设置模型属性</span>
        <span class="hljs-keyword">if</span> (!model.set(serverAttrs, <span class="hljs-keyword">options</span>)) <span class="hljs-keyword">return</span> <span class="hljs-keyword">false</span>;
        <span class="hljs-comment">//触发自定义回调函数</span>
        <span class="hljs-keyword">if</span> (success) success.<span class="hljs-keyword">call</span>(<span class="hljs-keyword">options</span>.context, model, resp, <span class="hljs-keyword">options</span>);
        <span class="hljs-comment">//触发事件</span>
        model.trigger(<span class="hljs-string">'sync'</span>, model, resp, <span class="hljs-keyword">options</span>);
 };</code></pre>
<h5>save</h5>
<p>save方法为向服务器提交保存数据的请求，如果是第一次保存，那么就是POST请求，如果不是第一次保存数据，那么就是PUT请求。</p>
<p>其中，传递的options中可以使用的字段以及意义为：</p>
<ul>
<li><p>wait: 可以指定是否等待服务端的返回结果再更新model。默认情况下不等待</p></li>
<li><p>url: 可以覆盖掉backbone默认使用的url格式</p></li>
<li><p>attrs: 可以指定保存到服务端的字段有哪些，配合options.patch可以产生PATCH对模型进行部分更新</p></li>
<li><p>patch:boolean 指定使用部分更新的REST接口</p></li>
<li><p>success: 自己定义一个回调函数</p></li>
<li><p>data: 会被直接传递给jquery的ajax中的data，能够覆盖backbone所有的对上传的数据控制的行为</p></li>
<li><p>其他: options中的任何参数都将直接传递给jquery的ajax，作为其options</p></li>
</ul>
<p>关于save函数具体的处理逻辑，我在源代码中添加了非常详细的注释，这里就不展开了。</p>
<h5>destroy</h5>
<p>销毁这个模型，我们可以分析，销毁模型要做以下几件事情：</p>
<ul>
<li><p>停止对该对象所有的事件监听,本身都没有了,还监听什么事件</p></li>
<li><p>告知服务器自己要被销毁了(如果isNew()返回true,那么其实不用向服务器发送请求)</p></li>
<li><p>如果它属于某一个collection,那么要告知这个collection要把这个模型移除</p></li>
</ul>
<p>其中，传递的options中可以使用的字段以及意义为：</p>
<ul>
<li><p>wait: 可以指定是否等待服务端的返回结果再销毁。默认情况下不等待</p></li>
<li><p>success: 自己定义一个回调函数</p></li>
</ul>
<h4>Model的其他内容</h4>
<p>另外值得一提的是，Model是要求传入的id唯一的，但是对这个id如果重复的情况下的错误处理做的不是很到位，所以有的时候你看控制台报错并不能及时发现问题。</p>
<h3 id="articleHeader4">backbone Collection</h3>
<p>Collection也是一个可供构造调用的函数，我们还是先看看这个Collection做了些什么：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Collection = Backbone.Collection = function(models, options) {
    options || (options = {});
    this.preinitialize.apply(this, arguments);
    //实际上我们在创建集合类的时候大多数都会定义一个model, 而不是在初始化的时候从options中指定model
    if (options.model) this.model = options.model;
    //我们可以在options中指定一个comparator作为排序器
    if (options.comparator !== void 0) this.comparator = options.comparator;
    //_reset用于初始化
    this._reset();
    this.initialize.apply(this, arguments);
    //如果我们在new构造调用的时候声明了models,这个时候需要调用reset函数
    if (models) this.reset(models, _.extend({silent: true}, options));
  };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code>var Collection = Backbone.Collection = function(models, <span class="hljs-keyword">options</span>) {
    <span class="hljs-keyword">options</span> || (<span class="hljs-keyword">options</span> = {});
    <span class="hljs-keyword">this</span>.preinitialize.apply(<span class="hljs-keyword">this</span>, arguments);
    <span class="hljs-comment">//实际上我们在创建集合类的时候大多数都会定义一个model, 而不是在初始化的时候从options中指定model</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">options</span>.model) <span class="hljs-keyword">this</span>.model = <span class="hljs-keyword">options</span>.model;
    <span class="hljs-comment">//我们可以在options中指定一个comparator作为排序器</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">options</span>.comparator !== <span class="hljs-keyword">void</span> <span class="hljs-number">0</span>) <span class="hljs-keyword">this</span>.comparator = <span class="hljs-keyword">options</span>.comparator;
    <span class="hljs-comment">//_reset用于初始化</span>
    <span class="hljs-keyword">this</span>._reset();
    <span class="hljs-keyword">this</span>.initialize.apply(<span class="hljs-keyword">this</span>, arguments);
    <span class="hljs-comment">//如果我们在new构造调用的时候声明了models,这个时候需要调用reset函数</span>
    <span class="hljs-keyword">if</span> (models) <span class="hljs-keyword">this</span>.reset(models, _.extend({silent: <span class="hljs-keyword">true</span>}, <span class="hljs-keyword">options</span>));
  };</code></pre>
<p>实际上，我觉得backbone的Model、View、Collection里的逻辑还是比较清楚的，可读性也比较强，所以主要就是把注释写在代码里面。</p>
<h4>Collection set</h4>
<p>collection的一个核心方法,内容很长,我们可以把它理解为重置:给定一组新的模型,增加新的,去除不在这里面的(在添加模式下不去除),混合已经存在的。但是这个方法同时也很灵活,可以通过参数的设定来改变模式</p>
<p>set可能有如下几个调用场景：</p>
<ol>
<li><p>重置模式，这个时候不在models里的model都会被清除掉。对应上文的：var setOptions = {add: true, remove: true, merge: true};</p></li>
<li><p>添加模式，这个时候models里的内容会做添加用，如果有重复的(cid来判断)，会覆盖。对应上文的：var addOptions = {add: true, remove: false};</p></li>
</ol>
<p>我们还是理一理里面做了哪些事情：</p>
<ul>
<li><p>先规范化models和options两个参数</p></li>
<li>
<p>遍历models：</p>
<ul>
<li><p>如果是重置模式，那么遇到重复的就直接覆盖掉，并且也添加到set队列，遇到新的就先添加到set队列。之后还要删除掉models里没有而原来collection里面有的</p></li>
<li><p>如果是添加模式，那么遇到重复的，就先添加到set队列，遇到新的也是添加到set队列</p></li>
</ul>
</li>
<li><p>之后进行整理，整合到collection中(可能会触发排序操作)</p></li>
<li><p>如果不是静默处理，这个时候会触发各类事件</p></li>
</ul>
<p>当然，我们在进行调用的时候，是不需要考虑这么复杂的，这个函数之所以做的这么复杂，是因为它也供许多内置的其他函数调用了，这样可以减少重复代码的冗余，符合函数式编程的思想。另外set函数虽然繁杂却不赘余，里面定义的函数内变量逻辑都有自己的作用。</p>
<h4>sort</h4>
<p>上文中提到了sort函数,sort所依据的是用户传入的comparator参数，这个参数可以是一个字符串表示的单个属性也可以是一个函数，另外也可以是一个多个属性组成的数组，如果是单个属性或者函数，就调用underscore的排序方法，如果是一个多个属性组成的数组，就调用原生的数组排序方法(原生方法支持按照多个属性分优先级进行排序)</p>
<h4>fetch、create</h4>
<p>这是Collection中涉及到和服务端交互的方法，这两个方法非常有区别。</p>
<p>fetch是直接从服务器拉取数据，并没有调用model的fetch方法，返回的数据格式应当是直接可以调用上文的set函数的数据格式，另外值得注意的是，想要调用这个方法，<strong>一定要先指定url</strong></p>
<p>create是指将特定的model上传到服务器上去，并没有调用自己的方法而是最后调用了model自身的方法<code>model.save(null, options)</code>，这里第一个参数被赋值成null还是有意义的，我们通过分析save函数前几行代码就可以很明显地分析出原因。</p>
<h4>CollectionIterator</h4>
<p>这是一个基于ES6的新的内容，目的是创建一个遍历器，之后，我们可以在collection的一些方法中运用这个可遍历对象。</p>
<p>这个方面的知识可以看<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Iteration_protocols" rel="nofollow noreferrer" target="_blank">这里</a>补充，三言两语也无法说清，简单地讲，就是如果正确地定义了一个next属性方法，这个对象就可以按照自己定义的方式来遍历了。</p>
<p>而backbone这里定义的这个遍历器更加强大，可以分别按照key、value、key和value三种方式遍历</p>
<p>我这里给出一个使用方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.Test = Backbone.Model.extend({
    defaults: {content: ''
    }
});
// 创建集合模型类  
window.TestList = Backbone.Collection.extend({
    model: Test
});
// 向模型添加数据
var data = new TestList(
        [
            {
                id:100,
                content: 'hello,backbone!'
            },
            {
                id:101,
                content: 'hello,Xiaotao!'
            }
        ]
);
for(var ii of data.keys()){
    console.log(ii);
}
for( ii of data.values()){
    console.log(ii);
}
for( ii of data.entries()){
    console.log(ii);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-built_in">window</span>.Test = Backbone.Model.extend({
    <span class="hljs-attribute">defaults</span>: {<span class="hljs-attribute">content</span>: <span class="hljs-string">''</span>
    }
});
<span class="hljs-comment">// 创建集合模型类  </span>
<span class="hljs-built_in">window</span>.TestList = Backbone.Collection.extend({
    <span class="hljs-attribute">model</span>: Test
});
<span class="hljs-comment">// 向模型添加数据</span>
<span class="hljs-built_in">var</span> data = <span class="hljs-keyword">new</span> TestList(
        [
            {
                <span class="hljs-attribute">id:</span><span class="hljs-string">100,
                content</span>: <span class="hljs-string">'hello,backbone!'</span>
            },
            {
                <span class="hljs-attribute">id:</span><span class="hljs-string">101,
                content</span>: <span class="hljs-string">'hello,Xiaotao!'</span>
            }
        ]
);
<span class="hljs-keyword">for</span>(<span class="hljs-built_in">var</span> ii <span class="hljs-keyword">of</span> data.keys()){
    <span class="hljs-built_in">console</span>.log(ii);
}
<span class="hljs-keyword">for</span>( ii <span class="hljs-keyword">of</span> data.values()){
    <span class="hljs-built_in">console</span>.log(ii);
}
<span class="hljs-keyword">for</span>( ii <span class="hljs-keyword">of</span> data.entries()){
    <span class="hljs-built_in">console</span>.log(ii);
}</code></pre>
<p>具体这里是如何实现的，我相信大家看了上文链接给出的扩展知识之后，然后再结合我写了注释的源代码，应该都能看懂了。</p>
<h4>Collection其他内容</h4>
<p>另外，Collection还实现了非常多的小方法，也混入了很多underscore的方法，但核心都是操作<code>this.models</code>，<code>this.models</code>是一个正常的数组(所以，在js中本身实现了的方法也是可以在这里使用的)，可以直接访问。</p>
<p>另外值得一提的是，Collection中有一个_byId变量，这个变量通过cid和id来存取，起到一个方便直接存取的作用，在某些时候非常方便。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_addReference: function(model, options) {
      this._byId[model.cid] = model;
      var id = this.modelId(model.attributes);
      if (id != null) this._byId[id] = model;
      model.on('all', this._onModelEvent, this);
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>_addReference: function(model, options) {
      <span class="hljs-keyword">this</span>._byId[model.cid] = model;
      <span class="hljs-keyword">var</span> id = <span class="hljs-keyword">this</span>.modelId(model.attributes);
      <span class="hljs-keyword">if</span> (id != <span class="hljs-literal">null</span>) <span class="hljs-keyword">this</span>._byId[id] = model;
      model.on(<span class="hljs-string">'all'</span>, <span class="hljs-keyword">this</span>._onModelEvent, <span class="hljs-keyword">this</span>);
},</code></pre>
<p>另外实际上，model除了作为Collection里面的元素，并且通过一个collection属性指向对应的Collection，实际上联系也并不是非常多，这也比较符合低耦合高内聚的策略。</p>
<h3 id="articleHeader5">backbone View</h3>
<p>接下来我们进入backbone的View部分，也就是和用户打交道的部分，我一开始用backbone的时候就是被View层可以通过定义events对象数组来方便地进行事件管理所吸引(虽然现在看来还有更方便的方案)</p>
<p>我们先来看一下View函数在用户新建View的时候做了些什么：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var View = Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    this.preinitialize.apply(this, arguments);
    //_.pick(object, *keys):返回一个object副本，只过滤出keys(有效的键组成的数组)参数指定的属性值。或者接受一个判断函数，指定挑选哪个key。
    _.extend(this, _.pick(options, viewOptions));
    //初始化dom元素和jQuery元素工作
    this._ensureElement();
    //自定义初始化函数
    this.initialize.apply(this, arguments);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code> <span class="hljs-keyword">var</span> View = Backbone.View = function(options) {
    <span class="hljs-keyword">this</span>.cid = _.uniqueId(<span class="hljs-string">'view'</span>);
    <span class="hljs-keyword">this</span>.preinitialize.apply(<span class="hljs-keyword">this</span>, arguments);
    <span class="hljs-comment">//_.pick(object, *keys):返回一个object副本，只过滤出keys(有效的键组成的数组)参数指定的属性值。或者接受一个判断函数，指定挑选哪个key。</span>
    _.extend(<span class="hljs-keyword">this</span>, _.pick(options, viewOptions));
    <span class="hljs-comment">//初始化dom元素和jQuery元素工作</span>
    <span class="hljs-keyword">this</span>._ensureElement();
    <span class="hljs-comment">//自定义初始化函数</span>
    <span class="hljs-keyword">this</span>.initialize.apply(<span class="hljs-keyword">this</span>, arguments);
};</code></pre>
<p>这里面值得一提的是<code>this._ensureElement()</code>这个函数，这个函数内部调用了很多函数，做了很多工作，我们首先看这个函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_ensureElement: function() {
      if (!this.el) {
        var attrs = _.extend({}, _.result(this, 'attributes'));
        if (this.id) attrs.id = _.result(this, 'id');
        if (this.className) attrs['class'] = _.result(this, 'className');
        this.setElement(this._createElement(_.result(this, 'tagName')));
        this._setAttributes(attrs);
      } else {
        this.setElement(_.result(this, 'el'));
      }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>_ensureElement: function() {
      <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.el) {
        <span class="hljs-keyword">var</span> attrs = _.extend({}, _.result(<span class="hljs-keyword">this</span>, <span class="hljs-string">'attributes'</span>));
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.id) attrs.id = _.result(<span class="hljs-keyword">this</span>, <span class="hljs-string">'id'</span>);
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.className) attrs[<span class="hljs-string">'class'</span>] = _.result(<span class="hljs-keyword">this</span>, <span class="hljs-string">'className'</span>);
        <span class="hljs-keyword">this</span>.setElement(<span class="hljs-keyword">this</span>._createElement(_.result(<span class="hljs-keyword">this</span>, <span class="hljs-string">'tagName'</span>)));
        <span class="hljs-keyword">this</span>._setAttributes(attrs);
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">this</span>.setElement(_.result(<span class="hljs-keyword">this</span>, <span class="hljs-string">'el'</span>));
      }
},</code></pre>
<p>根据你是否传入一个dom元素(这个dom元素用来和View对应,也可以是jQuery元素)分成了两种情况执行,我们先看不传入的情况：</p>
<p>这个时候我们可以定义一些属性，这些属性都在接下来赋值到生成的dom对象上:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" _setAttributes: function(attributes) {
      this.$el.attr(attributes);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code> _setAttributes: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(attributes)</span> </span>{
      <span class="hljs-keyword">this</span>.$el.attr(attributes);
}</code></pre>
<p>接下来看假设传入了了的情况：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" setElement: function(element) {
      this.undelegateEvents();
      this._setElement(element);
      this.delegateEvents();
      return this;
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code> setElement: function(element) {
      <span class="hljs-keyword">this</span>.undelegateEvents();
      <span class="hljs-keyword">this</span>._setElement(element);
      <span class="hljs-keyword">this</span>.delegateEvents();
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
},</code></pre>
<p>这里面又调用了三个函数，我们看一下这三个函数:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="undelegateEvents: function() {
      if (this.$el) this.$el.off('.delegateEvents' + this.cid);
      return this;
},

_setElement: function(el) {
      this.$el = el instanceof Backbone.$ ? el : Backbone.$(el);
      this.el = this.$el[0];
},

delegateEvents: function(events) {
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
},

delegate: function(eventName, selector, listener) {
      this.$el.on(eventName + '.delegateEvents' + this.cid, selector, listener);
      return this;
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>undelegateEvents: function() {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.$el) <span class="hljs-keyword">this</span>.$el.off(<span class="hljs-string">'.delegateEvents'</span> + <span class="hljs-keyword">this</span>.cid);
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
},

_setElement: function(el) {
      <span class="hljs-keyword">this</span>.$el = el instanceof Backbone.$ ? el : Backbone.$(el);
      <span class="hljs-keyword">this</span>.el = <span class="hljs-keyword">this</span>.$el[<span class="hljs-number">0</span>];
},

delegateEvents: function(events) {
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
},

delegate: function(eventName, selector, listener) {
      <span class="hljs-keyword">this</span>.$el.on(eventName + <span class="hljs-string">'.delegateEvents'</span> + <span class="hljs-keyword">this</span>.cid, selector, listener);
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
},</code></pre>
<p>上面第四个函数为第三个函数所调用的，因此我们放在了一起。</p>
<p>第一个函数是解绑backbone所用的jQuery事件命名空间下的事件(.delegateEvents)，这个是方式这个事件被之前的其他View使用过，从而造成污染(实际上，这个一般情况下用的是不多的)。</p>
<p>第二个函数是初始化dom对象和jQuery对象，<code>$el</code>代表jQuery对象,el代表dom对象。</p>
<p>第三个函数是把我们写的监听事件进行重新绑定，我们写的事件满足下面的格式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" //举个例子： 
 {
     'mousedown .title':  'edit',
     'click .button':     'save',
     'click .open':       function(e) { ... }
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code> <span class="hljs-comment">//举个例子： </span>
 {
     <span class="hljs-string">'mousedown .title'</span>:  <span class="hljs-string">'edit'</span>,
     <span class="hljs-string">'click .button'</span>:     <span class="hljs-string">'save'</span>,
     <span class="hljs-string">'click .open'</span>:       <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(e)</span> </span>{ ... }
 }</code></pre>
<p>上面第三个函数就是一个解析函数，解析好后直接调用delegate函数进行事件的绑定，这里要注意你定义的事件的元素必须在提供的el内的，否则无法访问到。</p>
<h4>render</h4>
<p>另外，backbone中有一个render函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render: function() {
      return this;
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>render: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
},</code></pre>
<p>这个render函数实际上有比较深远的意义，render函数默认是没有操作的，我们可以自己定义操作，然后可以在事件中<code>'change' 'render'</code>这样对应，这样每次变化就会重新调用render重绘，我们也可以自定义好render函数并且在初始化函数initialize中调用。另外，render函数默认的<code>return this;</code>隐含了backbone的一种期望：返回this从而支持链式调用。</p>
<p>render可以使用underscore的模版，并且这也是推荐做法，以下是一个非常简单的demo:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Bookmark = Backbone.View.extend({
  template: _.template(...),
  render: function() {
    this.$el.html(this.template(this.model.attributes));
    return this;
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> Bookmark = Backbone.View.extend({
  template: _.template(...),
  render: function() {
    <span class="hljs-keyword">this</span>.$el.html(<span class="hljs-keyword">this</span>.template(<span class="hljs-keyword">this</span>.model.attributes));
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
  }
});</code></pre>
<h3 id="articleHeader6">backbone router、history</h3>
<h4>router</h4>
<p>backbone相比于一些流行框架的好处就是自己实现了router部分，不用再引入其他插件，这点十分方便。</p>
<p>我们在使用router的时候，通常会采用如下写法:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Workspace = Backbone.Router.extend({

  routes: {
    &quot;help&quot;:                 &quot;help&quot;,    // #help
    &quot;search/:query&quot;:        &quot;search&quot;,  // #search/kiwis
    &quot;search/:query/p:page&quot;: &quot;search&quot;   // #search/kiwis/p7
  },

  help: function() {
    ...
  },

  search: function(query, page) {
    ...
  }

});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> Workspace = Backbone.Router.extend({

  routes: {
    <span class="hljs-string">"help"</span>:                 <span class="hljs-string">"help"</span>,    <span class="hljs-comment">// #help</span>
    <span class="hljs-string">"search/:query"</span>:        <span class="hljs-string">"search"</span>,  <span class="hljs-comment">// #search/kiwis</span>
    <span class="hljs-string">"search/:query/p:page"</span>: <span class="hljs-string">"search"</span>   <span class="hljs-comment">// #search/kiwis/p7</span>
  },

  help: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    ...
  },

  search: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(query, page)</span> </span>{
    ...
  }

});</code></pre>
<p>router的供构造调用的函数的主体部分也相当简单，没有做多余的事情:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Router = Backbone.Router = function(options) {
    options || (options = {});
    this.preinitialize.apply(this, arguments);
    //注意这个地方,options的routes会直接this的routes,所以如果在建立类的时候指定routes,实例化的时候又扩展了routes,是会被覆盖的
    if (options.routes) this.routes = options.routes;
    //对自己定义的路由进行处理
    this._bindRoutes();
    //调用自定义初始化函数
    this.initialize.apply(this, arguments);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> Router = Backbone.Router = function(options) {
    options || (options = {});
    <span class="hljs-keyword">this</span>.preinitialize.apply(<span class="hljs-keyword">this</span>, arguments);
    <span class="hljs-comment">//注意这个地方,options的routes会直接this的routes,所以如果在建立类的时候指定routes,实例化的时候又扩展了routes,是会被覆盖的</span>
    <span class="hljs-keyword">if</span> (options.routes) <span class="hljs-keyword">this</span>.routes = options.routes;
    <span class="hljs-comment">//对自己定义的路由进行处理</span>
    <span class="hljs-keyword">this</span>._bindRoutes();
    <span class="hljs-comment">//调用自定义初始化函数</span>
    <span class="hljs-keyword">this</span>.initialize.apply(<span class="hljs-keyword">this</span>, arguments);
};</code></pre>
<p>这里我们展开_bindRoutes:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" _bindRoutes: function() {
      if (!this.routes) return;
      this.routes = _.result(this, 'routes');
      var route, routes = _.keys(this.routes);
      while ((route = routes.pop()) != null) {
        this.route(route, this.routes[route]);
      }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code> _bindRoutes: function() {
      <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.routes) <span class="hljs-keyword">return</span>;
      <span class="hljs-keyword">this</span>.routes = _.result(<span class="hljs-keyword">this</span>, <span class="hljs-string">'routes'</span>);
      <span class="hljs-keyword">var</span> route, routes = _.keys(<span class="hljs-keyword">this</span>.routes);
      <span class="hljs-keyword">while</span> ((route = routes.pop()) != <span class="hljs-literal">null</span>) {
        <span class="hljs-keyword">this</span>.route(route, <span class="hljs-keyword">this</span>.routes[route]);
      }
},</code></pre>
<p>route函数是把路由处理成正则表达式形式，然后调用history.route函数进行绑定，history.route函数在网址每次变化的时候都会检查匹配，如果有匹配就执行回调函数，也就是下文<code>Backbone.history.route</code>传入的第二个参数，这样路由部分和history部分就联系在一起了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="route: function(route, name, callback) {
      //如果不是正则表达式,转换之
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (_.isFunction(name)) {
        callback = name;
        name = '';
      }
      if (!callback) callback = this[name];
      var router = this;
      Backbone.history.route(route, function(fragment) {
        var args = router._extractParameters(route, fragment);
        if (router.execute(callback, args, name) !== false) {
          router.trigger.apply(router, ['route:' + name].concat(args));
          router.trigger('route', name, args);
          Backbone.history.trigger('route', router, name, args);
        }
      });
      return this;
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>route: <span class="hljs-type">function</span>(route, name, <span class="hljs-keyword">callback</span>) {
      <span class="hljs-comment">//如果不是正则表达式,转换之</span>
      <span class="hljs-keyword">if</span> (!<span class="hljs-literal">_</span>.isRegExp(route)) route = <span class="hljs-built_in">this</span>._routeToRegExp(route);
      <span class="hljs-keyword">if</span> (<span class="hljs-literal">_</span>.isFunction(name)) {
        <span class="hljs-keyword">callback</span> = name;
        name = <span class="hljs-string">''</span>;
      }
      <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">callback</span>) <span class="hljs-keyword">callback</span> = <span class="hljs-built_in">this</span>[name];
      <span class="hljs-keyword">var</span> router = <span class="hljs-built_in">this</span>;
      Backbone.history.route(route, <span class="hljs-function"><span class="hljs-keyword">function</span></span>(fragment) {
        <span class="hljs-keyword">var</span> args = router._extractParameters(route, fragment);
        <span class="hljs-keyword">if</span> (router.execute(<span class="hljs-keyword">callback</span>, args, name) !== <span class="hljs-literal">false</span>) {
          router.trigger.apply(router, [<span class="hljs-string">'route:'</span> + name].concat(args));
          router.trigger(<span class="hljs-string">'route'</span>, name, args);
          Backbone.history.trigger(<span class="hljs-string">'route'</span>, router, name, args);
        }
      });
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">this</span>;
},</code></pre>
<p>上面的这段代码首先可能会调用<code>_routeToRegExp</code>这个函数进行正则处理，这个函数可能是backbone中最难懂的函数，不过不懂也并不影响我们继续分析(实际上，笔者也并没有完全懂这个函数，所以希望经验人士可以在这里给予帮助)。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&amp;')//这个匹配的目的是将正则表达式字符进行转义
                   .replace(optionalParam, '(?:$1)?')
                   .replace(namedParam, function(match, optional) {
                     return optional ? match : '([^/?]+)';
                   })
                   .replace(splatParam, '([^?]*?)');
      return new RegExp('^' + route + '(?:\\?([\\s\\S]*))?$');
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> _routeToRegExp: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">route</span>) </span>{
      route = route.replace(escapeRegExp, <span class="hljs-string">'\\$&amp;'</span>)<span class="hljs-comment">//这个匹配的目的是将正则表达式字符进行转义</span>
                   .replace(optionalParam, <span class="hljs-string">'(?:$1)?'</span>)
                   .replace(namedParam, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">match, optional</span>) </span>{
                     <span class="hljs-keyword">return</span> optional ? match : <span class="hljs-string">'([^/?]+)'</span>;
                   })
                   .replace(splatParam, <span class="hljs-string">'([^?]*?)'</span>);
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">RegExp</span>(<span class="hljs-string">'^'</span> + route + <span class="hljs-string">'(?:\\?([\\s\\S]*))?$'</span>);
},</code></pre>
<p>另外调用了<code>_extractParameters</code>这个函数和<code>router.execute</code>这个函数，前者的作用就是将匹配成功的URL中蕴含的参数转化成一个数组返回，后者接受三个参数，分别是回调函数，参数列表和函数名(这里之前只有两个函数,后来backbone增加了第三个参数)。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" _extractParameters: function(route, fragment) {
      var params = route.exec(fragment).slice(1);
      return _.map(params, function(param, i) {
        // Don't decode the search params.
        if (i === params.length - 1) return param || null;
        return param ? decodeURIComponent(param) : null;
      });
}
execute: function(callback, args, name) {
      if (callback) callback.apply(this, args);
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> _extractParameters: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">route, fragment</span>) </span>{
      <span class="hljs-keyword">var</span> params = route.exec(fragment).slice(<span class="hljs-number">1</span>);
      <span class="hljs-keyword">return</span> _.map(params, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">param, i</span>) </span>{
        <span class="hljs-comment">// Don't decode the search params.</span>
        <span class="hljs-keyword">if</span> (i === params.length - <span class="hljs-number">1</span>) <span class="hljs-keyword">return</span> param || <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">return</span> param ? <span class="hljs-built_in">decodeURIComponent</span>(param) : <span class="hljs-literal">null</span>;
      });
}
execute: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">callback, args, name</span>) </span>{
      <span class="hljs-keyword">if</span> (callback) callback.apply(<span class="hljs-keyword">this</span>, args);
},</code></pre>
<p>router的内容也就这些了，实现的比较简单清爽，代码也不多，关于处理历史记录浏览器兼容性的问题都放在了history部分，所以接下来我们来分析难啃的history部分。</p>
<h4>history</h4>
<p>这一块的内容比较重要，并且相比于之前的内容有些复杂，我尽量把自己的理解全都讲解出来。</p>
<p>我们先说明一下这个历史记录的作用：   <br>当你在浏览器访问的时候，可以通过左上角的前进后退进行切换，这就是因为产生了历史记录。</p>
<p>那么什么方式可以产生历史记录呢？</p>
<ol>
<li><p>页面跳转(肯定的,但是并不适用于SPA)</p></li>
<li><p>hash变化:形如<code>&lt;a href="#123"&gt;&lt;/a&gt;</code>这种点击后会触发历史记录)，但是不幸的是在IE7下并不能被写入历史记录(虽然笔者是对IE9以下坚决说不的)</p></li>
<li><p>pushState，这种比较牛逼，可以默默的改变路由，比如把<code>article.html#article/54</code>改成<code>article.html#article/53</code>但是不触发页面的刷新，因为一般情况下这算是两个页面的，另外，这种情况需要服务端的支持，因此我在用backbone的时候较少采用这种做法(现在有一个概念叫做pjax，就是ajax+pushState，具体可以Google之)</p></li>
<li><p>iframe内url变化，变化iframe内的url也会触发历史记录，但是这个比较麻烦，另外，在IE中,无论iframe是一开始静态写在html中的还是后来用js动态创建的,都可以被写入浏览器的历史记录，其他浏览器一般只支持静态写在html中。所以，我们一般在2&amp;3都不可用的情况下，才选用这种情况(IE7以下)</p></li>
</ol>
<p>以上讲的基本就是backbone使用的方式，接下来我们再按照backbone使用逻辑和优先级进行一些讲解：</p>
<p>backbone默认是使用hash的，在不支持hash的浏览器中使用iframe，如果想要使用pushState，需要显式声明并且浏览器本身要支持(如果使用了pushState的话hash就不用了)。</p>
<p>所以backbone的history有一个非常大的start函数，这个函数从头到尾做了如下几件事情：</p>
<ul>
<li><p>将页面的根部分保存在root中，默认是<code>/</code></p></li>
<li><p>判断是否想用hashChange(默认为true)以及支持与否，判断是否想用pushState以及支持与否。</p></li>
<li><p>判断一下到底是用hash还是用push，并且做一些url处理</p></li>
<li><p>如果需要用到iframe，这个时候初始化一下iframe</p></li>
<li><p>初始化监听事件：用hash的话可以监听hashchange事件，用pushState的话可以监听popState事件，如果用了iframe，没办法，只能轮询了，这个主要是用来用户的前进后退。</p></li>
<li><p>最后最重要的：先处理以下当前页面的路由，也就是说，假设用户直接访问的并不是根页面，不能什么也不做呀，要调用相关路由对应的函数，所以这里要调用<code>loadUrl</code></p></li>
</ul>
<p>和start对应的stop函数，主要做了一些清理工作，如果能读懂start，那么stop函数应该是不难读懂的。</p>
<p>另外还有一个比较长的函数是navigate，这个函数的作用主要是存储/更新历史记录，主要和浏览器打交道，如果用hash的话，backbone自身是不会调用这个函数的(因为用不到)，但是可以供开发者调用：</p>
<p>开发者可以通过这个函数用js代码自动管理路由：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="openPage: function(pageNumber) {
  this.document.pages.at(pageNumber).open();
  this.navigate(&quot;page/&quot; + pageNumber);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>openPage: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(pageNumber)</span> </span>{
  <span class="hljs-keyword">this</span>.document.pages.at(pageNumber).open();
  <span class="hljs-keyword">this</span>.navigate(<span class="hljs-string">"page/"</span> + pageNumber);
}</code></pre>
<p>另外，backbone在这一部分定义了一系列工具函数，用于处理url。</p>
<p>backbone的history这一部分写的非常的优秀，兼容性也非常的高，并且充分满足了高聚合低耦合的特点，如果自己也要实现history管理这一部分，那么backbone的这个history绝对是一个优秀的范例。</p>
<h3 id="articleHeader7">extend</h3>
<p>最后，backbone还定义了一个extend函数，这个函数我们再熟悉不过了，不过它的写法并没有我们想象的那么简单，</p>
<p>这个函数并没有直接将属性assign到parent上面(this),是因为这样会产生一个显著的问题:污染原型     <br>所以实际上backbone的做法是新建了一个子类,这个子对象承担着所有内容.</p>
<p>另外，这个extend函数也借鉴了ES6的一些写法，内容不多，理解起来也是简单的。</p>
<h3 id="articleHeader8">ES6&amp;backbone</h3>
<p>backbone支持ES6的写法，关于这个写法问题，曾经GitHub上面有过激烈的争论，这里我稍作总结，先给出一个目前可行的写法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class DocumentRow extends Backbone.View {

    preinitialize() {
        _.extend(this, {
          tagName:  &quot;li&quot;,
          className: &quot;document-row&quot;,
          events: {
            &quot;click .icon&quot;:          &quot;open&quot;,
            &quot;click .button.edit&quot;:   &quot;openEditDialog&quot;,
            &quot;click .button.delete&quot;: &quot;destroy&quot;
          }
        });
    }

    initialize() {
        this.listenTo(this.model, &quot;change&quot;, this.render);
    }

    render() {
        //...
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">DocumentRow</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Backbone</span>.<span class="hljs-title">View</span> </span>{

    preinitialize() {
        _.extend(<span class="hljs-keyword">this</span>, {
          tagName:  <span class="hljs-string">"li"</span>,
          className: <span class="hljs-string">"document-row"</span>,
          events: {
            <span class="hljs-string">"click .icon"</span>:          <span class="hljs-string">"open"</span>,
            <span class="hljs-string">"click .button.edit"</span>:   <span class="hljs-string">"openEditDialog"</span>,
            <span class="hljs-string">"click .button.delete"</span>: <span class="hljs-string">"destroy"</span>
          }
        });
    }

    initialize() {
        <span class="hljs-keyword">this</span>.listenTo(<span class="hljs-keyword">this</span>.model, <span class="hljs-string">"change"</span>, <span class="hljs-keyword">this</span>.render);
    }

    render() {
        <span class="hljs-comment">//...</span>
    }
}</code></pre>
<p>实际上，这个问题出现之前backbone的源代码中是没有preinitialize函数的，关于为什么最终是这样，我总结以下几点：</p>
<ul>
<li><p>ES6的class不能直接写属性(直接报错)，都要写成函数，因为如果有属性的话会出现共享属性的问题。</p></li>
<li><p>ES6的class写法和ES5的不一样，也和backbone自己定义的extend是不一样的。是先要调用父类的构造方法，然后再有子类的this，在调用constructor之前是无法使用this的。所以下面这种写法就不行了：</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class DocumentRow extends Backbone.View {

    constructor() {
        this.tagName =  &quot;li&quot;;
        this.className = &quot;document-row&quot;;
        this.events = {
            &quot;click .icon&quot;:          &quot;open&quot;,
            &quot;click .button.edit&quot;:   &quot;openEditDialog&quot;,
            &quot;click .button.delete&quot;: &quot;destroy&quot;
        };
        super();
    }

    initialize() {
        this.listenTo(this.model, &quot;change&quot;, this.render);
    }

    render() {
        //...
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">DocumentRow</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Backbone</span>.<span class="hljs-title">View</span> </span>{

    constructor() {
        <span class="hljs-keyword">this</span>.tagName =  <span class="hljs-string">"li"</span>;
        <span class="hljs-keyword">this</span>.className = <span class="hljs-string">"document-row"</span>;
        <span class="hljs-keyword">this</span>.events = {
            <span class="hljs-string">"click .icon"</span>:          <span class="hljs-string">"open"</span>,
            <span class="hljs-string">"click .button.edit"</span>:   <span class="hljs-string">"openEditDialog"</span>,
            <span class="hljs-string">"click .button.delete"</span>: <span class="hljs-string">"destroy"</span>
        };
        <span class="hljs-keyword">super</span>();
    }

    initialize() {
        <span class="hljs-keyword">this</span>.listenTo(<span class="hljs-keyword">this</span>.model, <span class="hljs-string">"change"</span>, <span class="hljs-keyword">this</span>.render);
    }

    render() {
        <span class="hljs-comment">//...</span>
    }
}</code></pre>
<p>但是如果把super提前，那么这个时候tagName什么的还没有赋值呢，element就已经建立好了。</p>
<p>另外，把属性强制写成函数的做法是被backbone支持的，但是我相信没有多少人愿意这样做吧：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class DocumentRow extends Backbone.View {

    tagName() { return &quot;li&quot;; }

    className() { return &quot;document-row&quot;;}

    events() {
        return {
            &quot;click .icon&quot;:          &quot;open&quot;,
            &quot;click .button.edit&quot;:   &quot;openEditDialog&quot;,
            &quot;click .button.delete&quot;: &quot;destroy&quot;
        };
    }

    initialize() {
        this.listenTo(this.model, &quot;change&quot;, this.render);
    }

    render() {
        //...
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">DocumentRow</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Backbone</span>.<span class="hljs-title">View</span> </span>{

    tagName() { <span class="hljs-keyword">return</span> <span class="hljs-string">"li"</span>; }

    className() { <span class="hljs-keyword">return</span> <span class="hljs-string">"document-row"</span>;}

    events() {
        <span class="hljs-keyword">return</span> {
            <span class="hljs-string">"click .icon"</span>:          <span class="hljs-string">"open"</span>,
            <span class="hljs-string">"click .button.edit"</span>:   <span class="hljs-string">"openEditDialog"</span>,
            <span class="hljs-string">"click .button.delete"</span>: <span class="hljs-string">"destroy"</span>
        };
    }

    initialize() {
        <span class="hljs-keyword">this</span>.listenTo(<span class="hljs-keyword">this</span>.model, <span class="hljs-string">"change"</span>, <span class="hljs-keyword">this</span>.render);
    }

    render() {
        <span class="hljs-comment">//...</span>
    }
}</code></pre>
<p>所以我们需要：及早把一些属性赋给父类覆盖掉父类默认属性，然后调用父类构造函数，然后再调用子类构造函数。所以加入一个preinitialize方法是一个比较好的选择。</p>
<p>如果还没有理解，不妨看看下面这个本质等价的小例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class A{
    constructor(){
        this.s=1;
        this.preinit();
        this.dosomething();
        this.init();
    }
    preinit(){}
    init(){}
    dosomething(){console.log(&quot;dosomething:&quot;,this.s)}//dosomething 2
}
class B extends A{
    preinit(){this.s=2;}
    init(){}
}
var b1 = new B();
console.log(b1.s);//2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">A</span></span>{
    constructor(){
        <span class="hljs-keyword">this</span>.s=<span class="hljs-number">1</span>;
        <span class="hljs-keyword">this</span>.preinit();
        <span class="hljs-keyword">this</span>.dosomething();
        <span class="hljs-keyword">this</span>.init();
    }
    preinit(){}
    init(){}
    dosomething(){console.log(<span class="hljs-string">"dosomething:"</span>,<span class="hljs-keyword">this</span>.s)}<span class="hljs-comment">//dosomething 2</span>
}
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">B</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">A</span></span>{
    preinit(){<span class="hljs-keyword">this</span>.s=<span class="hljs-number">2</span>;}
    init(){}
}
<span class="hljs-keyword">var</span> b1 = <span class="hljs-keyword">new</span> <span class="hljs-type">B</span>();
console.log(b1.s);<span class="hljs-comment">//2</span></code></pre>
<h3 id="articleHeader9">总结</h3>
<p>经过以上漫长的对backbone源代码分析的过程，我们了解了一个优秀的框架的源代码，我总结了backbone源码的几个特点如下：</p>
<ul>
<li><p>充分发挥函数式编程的精神，符合函数式编程，之前有位前辈说对js的运用程度就取决于对js的函数式编程的认识程度，也是不无道理的。</p></li>
<li><p>高内聚低耦合可扩展，这一方面方便了我们使用backbone的一部分内容(比如只使用Events或者router)，另外一方面也方便了插件开发，以及能和其他的库比较好的兼容，我认为，这并不是一个强主张的库，你可以小规模地按照自己的方式使用，也可以大规模的完全按照backbone的期望使用。</p></li>
<li><p>在使用和兼容ES6的新特性上做了不少努力，在源代码中好几处都体现了ES6的内容，这让backbone作为一个老牌框架，在如今大规模使用做网页应用，依然十分可行。</p></li>
</ul>
<p>缺点：</p>
<ul><li><p>backbone严重依赖jQuery和underscore，这对backbone起到了牵制作用，假设jQuery或者underscore改变了一个方法或者一个接口，那么backbone也要跟着改，另外backbone依赖的jQuery和underscore也有一些限制，直接随便引入这三个文件很可能就会报错(一般情况下都引入最新的是没有问题的)，这是backbone比较不好的一个地方(要不然自身也不可能做到这么轻量级)</p></li></ul>
<p>--</p>
<p>参考资料   <br>backbone官方文档：<a href="http://backbonejs.org/" rel="nofollow noreferrer" target="_blank">http://backbonejs.org/</a>   <br>backbone中文文档：<a href="http://www.css88.com/doc/backbone/" rel="nofollow noreferrer" target="_blank">http://www.css88.com/doc/back...</a>   <br>Why Backbone.js and ES6 Classes Don't Mix：<a href="http://benmccormick.org/2015/04/07/es6-classes-and-backbone-js/" rel="nofollow noreferrer" target="_blank">http://benmccormick.org/2015/...</a>   </p>
<p>关于backbone&amp;ES6的讨论：  <br><a href="https://github.com/jashkenas/backbone/issues/3560" rel="nofollow noreferrer" target="_blank">https://github.com/jashkenas/...</a>  <br><a href="https://github.com/jashkenas/backbone/pull/3827" rel="nofollow noreferrer" target="_blank">https://github.com/jashkenas/...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
backbone源码解读

## 原文链接
[https://segmentfault.com/a/1190000008274936](https://segmentfault.com/a/1190000008274936)

