---
title: 'JS事件模型' 
date: 2019-02-03 2:30:40
hidden: true
slug: alvlbas9oai
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">JS事件模型</h1>
<h2 id="articleHeader1">观察者模式</h2>
<p>观察者模式又叫做发布订阅者模式(Publish/Subscribe)，它可以让多个观察者对象同时监听某一个主题对象，这个主题对象的状态变化时会通知所有的订阅者，使得它们能够做出反应。<br>JS的事件模型就是一种观察者模式的体现，当对应的事件被触发时，监听该事件的所有监听函数都会被调用。</p>
<p>下面是用JS实现的一个观察者模式的代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var events = (function() {
  var topics = {};

  return {
    publish: function(topic, info) {
      console.log('publish a topic:' + topic);
      if (topics.hasOwnProperty(topic)) {
        topics[topic].forEach(function(handler) {
          handler(info ? info : {});
        })
      }
    },
    subscribe: function(topic, handler) {
      console.log('subscribe an topic:' + topic);
      if (!topics.hasOwnProperty(topic)) {
        topics[topic] = [];
      }

      topics[topic].push(handler);
    },
    remove: function(topic, handler) {
      if (!topics.hasOwnProperty(topic)) {
        return;
      }

      var handlerIndex = -1;
      topics[topic].forEach(function(element, index) {
        if (element === handler) {
          handlerIndex = index;
        }
      });

      if (handlerIndex >= 0) {
        topics[topic].splice(handlerIndex, 1);
      }
    },
    removeAll: function(topic) {
      console.log('remove all the handler on the topic:' + topic);
      if (topics.hasOwnProperty(topic)) {
        topics[topic].length = 0;
      }
    }
  }
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>var events = (<span class="hljs-name">function</span>() {
  var topics = {}<span class="hljs-comment">;</span>

  return {
    publish: function(<span class="hljs-name">topic</span>, info) {
      console.log('publish a topic:' + topic)<span class="hljs-comment">;</span>
      if (<span class="hljs-name">topics</span>.hasOwnProperty(<span class="hljs-name">topic</span>)) {
        topics[topic].forEach(<span class="hljs-name">function</span>(<span class="hljs-name">handler</span>) {
          handler(<span class="hljs-name">info</span> ? info : {})<span class="hljs-comment">;</span>
        })
      }
    },
    subscribe: function(<span class="hljs-name">topic</span>, handler) {
      console.log('subscribe an topic:' + topic)<span class="hljs-comment">;</span>
      if (!topics.hasOwnProperty(<span class="hljs-name">topic</span>)) {
        topics[topic] = []<span class="hljs-comment">;</span>
      }

      topics[topic].push(<span class="hljs-name">handler</span>)<span class="hljs-comment">;</span>
    },
    remove: function(<span class="hljs-name">topic</span>, handler) {
      if (!topics.hasOwnProperty(<span class="hljs-name">topic</span>)) {
        return<span class="hljs-comment">;</span>
      }

      var handlerIndex = <span class="hljs-number">-1</span><span class="hljs-comment">;</span>
      topics[topic].forEach(<span class="hljs-name">function</span>(<span class="hljs-name">element</span>, index) {
        if (<span class="hljs-name">element</span> === handler) {
          handlerIndex = index<span class="hljs-comment">;</span>
        }
      })<span class="hljs-comment">;</span>

      if (<span class="hljs-name">handlerIndex</span> &gt;= <span class="hljs-number">0</span>) {
        topics[topic].splice(<span class="hljs-name">handlerIndex</span>, <span class="hljs-number">1</span>)<span class="hljs-comment">;</span>
      }
    },
    removeAll: function(<span class="hljs-name">topic</span>) {
      console.log('remove all the handler on the topic:' + topic)<span class="hljs-comment">;</span>
      if (<span class="hljs-name">topics</span>.hasOwnProperty(<span class="hljs-name">topic</span>)) {
        topics[topic].length = <span class="hljs-number">0</span><span class="hljs-comment">;</span>
      }
    }
  }
})()<span class="hljs-comment">;</span></code></pre>
<p>使用事例:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//主题监听函数
var handler = function(info) {
    console.log(info);
}
//订阅hello主题
events.subscribe('hello', handler);

//发布hello主题
events.publish('hello', 'hello world');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-comment">//主题监听函数</span>
<span class="hljs-keyword">var</span> handler = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(info)</span> <span class="hljs-comment">{
    console.log(info);
}</span>
<span class="hljs-comment">//订阅hello主题</span>
<span class="hljs-title">events</span>.<span class="hljs-title">subscribe</span><span class="hljs-params">(<span class="hljs-string">'hello'</span>, handler)</span>;</span>

<span class="hljs-comment">//发布hello主题</span>
events.publish(<span class="hljs-string">'hello'</span>, <span class="hljs-string">'hello world'</span>);</code></pre>
<h2 id="articleHeader2">事件与事件流</h2>
<p>事件是与浏览器或文档交互的瞬间，如点击按钮，填写表格等，它是JS与HTML之间交互的桥梁。<br>DOM是树形结构，如果同时给父子节点都绑定事件时，当触发子节点的时候，这两个事件的发生顺序如何决定?这就涉及到事件流的概念，它描述的是页面中接受事件的顺序。</p>
<p>事件流有两种:</p>
<ul>
<li><p>事件冒泡(Event Capturing): 是一种从下往上的传播方式。事件最开始由最具体的元素(文档中嵌套层次最深的那个节点接受, 也就是DOM最低层的子节点), 然后逐渐向上传播到最不具体的那个节点，也就是DOM中最高层的父节点。</p></li>
<li><p>事件捕获(Event Bubbling): 与事件冒泡相反。事件最开始由不太具体的节点最早接受事件, 而最具体的节点最后接受事件。</p></li>
</ul>
<h2 id="articleHeader3">事件模型</h2>
<h3 id="articleHeader4">DOM0级模型</h3>
<p>又称为原始事件模型，在该模型中，事件不会传播，即没有事件流的概念。事件绑定监听函数比较简单, 有两种方式:</p>
<ul>
<li>
<p>HTML代码中直接绑定:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;button&quot; onclick=&quot;fun()&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"fun()"</span>&gt;</span></code></pre>
</li>
<li>
<p>通过JS代码指定属性值:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var btn = document.getElementById('.btn');
btn.onclick = fun;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> btn = document.getElementById(<span class="hljs-string">'.btn'</span>);
btn.onclick = <span class="hljs-function"><span class="hljs-keyword">fun</span>;</span></code></pre>
<p>移除监听函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  btn.onclick = null;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code style="word-break: break-word; white-space: initial;">  <span class="hljs-keyword">btn.onclick </span>= null<span class="hljs-comment">;</span></code></pre>
</li>
</ul>
<p>这种方式所有浏览器都兼容，但是逻辑与显示并没有分离。</p>
<h3 id="articleHeader5">IE事件模型</h3>
<p>IE事件模型共有两个过程:</p>
<ul>
<li><p>事件处理阶段(target phase)。事件到达目标元素, 触发目标元素的监听函数。</p></li>
<li><p>事件冒泡阶段(bubbling phase)。事件从目标元素冒泡到document, 依次检查经过的节点是否绑定了事件监听函数，如果有则执行。</p></li>
</ul>
<p>事件绑定监听函数的方式如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="attachEvent(eventType, handler)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-title">attachEvent</span><span class="hljs-params">(eventType, handler)</span></span></code></pre>
<p>事件移除监听函数的方式如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="detachEvent(eventType, handler)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-title">detachEvent</span><span class="hljs-params">(eventType, handler)</span></span></code></pre>
<p>参数说明:</p>
<ul>
<li><p>eventType指定事件类型(注意加on)</p></li>
<li><p>handler是事件处理函数</p></li>
</ul>
<p>Example:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var btn = document.getElementById('.btn');
btn.attachEvent(‘onclick’, showMessage);
btn.detachEvent(‘onclick’, showMessage);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>var <span class="hljs-keyword">btn </span>= document.getElementById(<span class="hljs-string">'.btn'</span>)<span class="hljs-comment">;</span>
<span class="hljs-keyword">btn.attachEvent(‘onclick’, </span><span class="hljs-keyword">showMessage);
</span><span class="hljs-keyword">btn.detachEvent(‘onclick’, </span><span class="hljs-keyword">showMessage);</span></code></pre>
<h3 id="articleHeader6">DOM2级模型</h3>
<p>属于W3C标准模型，现代浏览器(除IE6-8之外的浏览器)都支持该模型。在该事件模型中，一次事件共有三个过程:</p>
<ul>
<li><p>事件捕获阶段(capturing phase)。事件从document一直向下传播到目标元素, 依次检查经过的节点是否绑定了事件监听函数，如果有则执行。</p></li>
<li><p>事件处理阶段(target phase)。事件到达目标元素, 触发目标元素的监听函数。</p></li>
<li><p>事件冒泡阶段(bubbling phase)。事件从目标元素冒泡到document, 依次检查经过的节点是否绑定了事件监听函数，如果有则执行。</p></li>
</ul>
<p>事件绑定监听函数的方式如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="addEventListener(eventType, handler, useCapture)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;"><span class="hljs-function"><span class="hljs-title">addEventListener</span><span class="hljs-params">(eventType, handler, useCapture)</span></span></code></pre>
<p>事件移除监听函数的方式如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="removeEventListener(eventType, handler, useCapture)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs basic"><code style="word-break: break-word; white-space: initial;"><span class="hljs-comment">removeEventListener(eventType, handler, useCapture)</span></code></pre>
<p>Example:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var btn = document.getElementById('.btn');
btn.addEventListener(‘click’, showMessage, false);
btn.removeEventListener(‘click’, showMessage, false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>var <span class="hljs-keyword">btn </span>= document.getElementById(<span class="hljs-string">'.btn'</span>)<span class="hljs-comment">;</span>
<span class="hljs-keyword">btn.addEventListener(‘click’, </span><span class="hljs-keyword">showMessage, </span>false)<span class="hljs-comment">;</span>
<span class="hljs-keyword">btn.removeEventListener(‘click’, </span><span class="hljs-keyword">showMessage, </span>false)<span class="hljs-comment">;</span></code></pre>
<p>参数说明:</p>
<ul>
<li><p>eventType指定事件类型(不要加on)</p></li>
<li><p>handler是事件处理函数</p></li>
<li><p>useCapture是一个boolean用于指定是否在捕获阶段进行处理，一般设置为false与IE浏览器保持一致。</p></li>
</ul>
<h2 id="articleHeader7">事件对象</h2>
<p>当一个事件被触发时，会创建一个事件对象(Event Object), 这个对象里面包含了与该事件相关的属性或者方法。该对象会作为第一个参数传递给监听函数。</p>
<ul>
<li>
<p>DOM事件模型中的事件对象常用属性:</p>
<ul>
<li><p>type用于获取事件类型</p></li>
<li><p>target获取事件目标</p></li>
<li><p>stopPropagation()阻止事件冒泡</p></li>
<li><p>preventDefault()阻止事件默认行为</p></li>
</ul>
</li>
<li>
<p>IE事件模型中的事件对象常用属性:</p>
<ul>
<li><p>type用于获取事件类型</p></li>
<li><p>srcElement获取事件目标</p></li>
<li><p>cancelBubble阻止事件冒泡</p></li>
<li><p>returnValue阻止事件默认行为</p></li>
</ul>
</li>
</ul>
<h2 id="articleHeader8">Event Wrapper</h2>
<p>由于事件模型的差异以及Event对象的不同，为了达到兼容各个浏览器的目的，我们可以增加一个Event Wrapper, 它对各个浏览器应当提供一致的事件操作接口。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var eventUtils={
     // 添加句柄
     addHandler:function(element,type,handler){
       if(element.addEventListener){
         element.addEventListener(type,handler,false);
       }else if(element.attachEvent){
         element.attachEvent('on'+type,handler);
       }else{
         element['on'+type]=handler;
       }
     },
     // 删除句柄
     removeHandler:function(element,type,handler){
       if(element.removeEventListener){
         element.removeEventListener(type,handler,false);
       }else if(element.detachEvent){
         element.detachEvent('on'+type,handler);
       }else{
         element['on'+type]=null;
       }
     },
    //获取事件对象
    //IE模型中event是一个全局唯一的对象绑定在window对象上
    getEvent:function(event){
       return event?event:window.event;
    },
    //获取类型
    getType:function(event){
     return event.type;
    },
    getElement:function(event){
     return event.target || event.srcElement;
    },
    //阻止默认事件
    preventDefault:function(event){
     if(event.preventDefault){
      event.preventDefault();
     }else{
      event.returnValue=false;
     }
    },
    //阻止冒泡
   stopPropagation:function(event){
   if(event.stopPropagation){
     event.stopPropagation();
   }else{
     event.cancelBubble=true;
    }
   }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">var</span> eventUtils={
     <span class="hljs-comment">// 添加句柄</span>
     addHandler:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">element,<span class="hljs-keyword">type</span>,handler</span>)</span>{
       <span class="hljs-keyword">if</span>(element.addEventListener){
         element.addEventListener(<span class="hljs-keyword">type</span>,handler,<span class="hljs-literal">false</span>);
       }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(element.attachEvent){
         element.attachEvent(<span class="hljs-string">'on'</span>+<span class="hljs-keyword">type</span>,handler);
       }<span class="hljs-keyword">else</span>{
         element[<span class="hljs-string">'on'</span>+<span class="hljs-keyword">type</span>]=handler;
       }
     },
     <span class="hljs-comment">// 删除句柄</span>
     removeHandler:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">element,<span class="hljs-keyword">type</span>,handler</span>)</span>{
       <span class="hljs-keyword">if</span>(element.removeEventListener){
         element.removeEventListener(<span class="hljs-keyword">type</span>,handler,<span class="hljs-literal">false</span>);
       }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(element.detachEvent){
         element.detachEvent(<span class="hljs-string">'on'</span>+<span class="hljs-keyword">type</span>,handler);
       }<span class="hljs-keyword">else</span>{
         element[<span class="hljs-string">'on'</span>+<span class="hljs-keyword">type</span>]=<span class="hljs-literal">null</span>;
       }
     },
    <span class="hljs-comment">//获取事件对象</span>
    <span class="hljs-comment">//IE模型中event是一个全局唯一的对象绑定在window对象上</span>
    getEvent:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
       <span class="hljs-keyword">return</span> event?event:<span class="hljs-built_in">window</span>.event;
    },
    <span class="hljs-comment">//获取类型</span>
    getType:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
     <span class="hljs-keyword">return</span> event.type;
    },
    getElement:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
     <span class="hljs-keyword">return</span> event.target || event.srcElement;
    },
    <span class="hljs-comment">//阻止默认事件</span>
    preventDefault:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
     <span class="hljs-keyword">if</span>(event.preventDefault){
      event.preventDefault();
     }<span class="hljs-keyword">else</span>{
      event.returnValue=<span class="hljs-literal">false</span>;
     }
    },
    <span class="hljs-comment">//阻止冒泡</span>
   stopPropagation:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>)</span>{
   <span class="hljs-keyword">if</span>(event.stopPropagation){
     event.stopPropagation();
   }<span class="hljs-keyword">else</span>{
     event.cancelBubble=<span class="hljs-literal">true</span>;
    }
   }
  }</code></pre>
<p>参考:</p>
<ul><li><p><a href="http://www.imooc.com/learn/138" rel="nofollow noreferrer" target="_blank">DOM事件揭秘</a></p></li></ul>
<h2 id="articleHeader9">事件代理</h2>
<p>事件在冒泡过程中会上传到父节点，因此可以把子节点的监听函数定义在父节点上，由父节点的监听函数统一处理多个子元素的事件，这种方式称为事件代理(Event delegation)。</p>
<p>我们有一个div元素，它包含三个按钮:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;box&quot;>
    <input type=&quot;button&quot; value=&quot;按钮&quot; id=&quot;btn&quot;>
    <input type=&quot;button&quot; value=&quot;按钮2&quot; id=&quot;btn2&quot;>
    <input type=&quot;button&quot; value=&quot;按钮3&quot; id=&quot;btn3&quot;>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">div</span> id=<span class="hljs-string">"box"</span>&gt;
    &lt;<span class="hljs-selector-tag">input</span> type=<span class="hljs-string">"button"</span> value=<span class="hljs-string">"按钮"</span> id=<span class="hljs-string">"btn"</span>&gt;
    &lt;<span class="hljs-selector-tag">input</span> type=<span class="hljs-string">"button"</span> value=<span class="hljs-string">"按钮2"</span> id=<span class="hljs-string">"btn2"</span>&gt;
    &lt;<span class="hljs-selector-tag">input</span> type=<span class="hljs-string">"button"</span> value=<span class="hljs-string">"按钮3"</span> id=<span class="hljs-string">"btn3"</span>&gt;
&lt;/div&gt;</code></pre>
<p>我们可以在父节点上一次性的为所有子节点注册监听函数:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var box = document.getElementById('box');

box.addEventListener('click', function(event) {
  if (event.target.tagName.toLowerCase() === 'input') {
    // some code
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> box = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'box'</span>);

box.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
  <span class="hljs-keyword">if</span> (event.target.tagName.toLowerCase() === <span class="hljs-string">'input'</span>) {
    <span class="hljs-comment">// some code</span>
  }
});</code></pre>
<h2 id="articleHeader10">自定义事件</h2>
<p>JS中已经内置了很多事件，如click, mouseover等等，但是内置事件毕竟有限，有时候我们想自己定义一些事件，例如三连击，threeclick。如何实现自定义事件呢？</p>
<ul><li><p>首先要创建一个事件。可以使用以下方式:</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var event = new Event('threeclick', {&quot;bubbles&quot;:true, &quot;cancelable&quot;:false});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> <span class="hljs-keyword">event</span> = <span class="hljs-keyword">new</span> Event(<span class="hljs-string">'threeclick'</span>, {<span class="hljs-string">"bubbles"</span>:<span class="hljs-literal">true</span>, <span class="hljs-string">"cancelable"</span>:<span class="hljs-literal">false</span>});</code></pre>
<ul><li><p>然后我们需要为事件注册监听函数:</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="target.addEventListener('threeclick', hello, false);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs aspectj"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">target</span>.addEventListener(<span class="hljs-string">'threeclick'</span>, hello, <span class="hljs-keyword">false</span>);</code></pre>
<ul><li><p>最后我们要在合适的时机触发该事件，我们可以使用dispatchEvent函数。该方法在当前节点触发指定事件，从而触发监听函数执行。该方法返回一个布尔值，只要有一个监听函数调用了Event.preventDefault(), 则返回false, 否则返回true。</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="target.dispatchEvent(event);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code style="word-break: break-word; white-space: initial;">target.dispatchEvent(event)<span class="hljs-comment">;</span></code></pre>
<h2 id="articleHeader11">JQuery Event模型</h2>
<p>JQuery解决的一个主要问题就是浏览器的兼容问题，它有自己的事件模型实现方式。它主要有以下特性:</p>
<ul>
<li><p>重定义了JQuery.Event对象, 统一了事件属性和方法, 统一了事件模型</p></li>
<li><p>可以在一个事件类型上添加多个事件处理函数, 可以一次添加多个事件类型的事件处理函数</p></li>
<li><p>支持自定义事件(事件命名空间)</p></li>
<li><p>提供了toggle, hover组合事件</p></li>
<li><p>提供了one, live-die, delegate-undelegate</p></li>
<li><p>提供了统一的事件封装, 绑定, 执行, 销毁机制</p></li>
<li><p>$(document).ready();</p></li>
<li><p>....</p></li>
</ul>
<p>JQuery事件具体代码请参考: <a href="https://github.com/jquery/jquery/tree/master/src/event" rel="nofollow noreferrer" target="_blank">https://github.com/jquery/jqu...</a><br>JQuery事件具体使用方式请自行查找</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS事件模型

## 原文链接
[https://segmentfault.com/a/1190000006934031](https://segmentfault.com/a/1190000006934031)

