---
title: 'javascript设计模式学习——观察者模式' 
date: 2019-01-18 2:30:35
hidden: true
slug: odg6qr2cvwk
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>Javascript活跃在事件驱动的环境中，比如鼠标的响应、事件的回调、网络的请求等，<code>观察者</code>模式又称<code>发布者-订阅者（publisher-subscriber）模式</code>,是处理对象及其行为和状态之间的关系，管理人与任务之间的关系。</p></blockquote>
<h4>1. 最常见的观察者模式</h4>
<h5>1.1 事件监听器</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.body.addEventListener('click', function () {
    console.log('you clicked me, poor guy!')
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">document</span>.body.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'you clicked me, poor guy!'</span>)
});</code></pre>
<p>这是最简单最普通的一种观察者模式，除此<code>click</code> 以外还有<code>load</code>、<code>blur</code>、<code>drag</code>、<code>focus</code>、<code>mouseover</code>、等。事件监听器（listener）有别于事件处理器（handler），在事件监听器中，一个事件可以关联多个监听器，每个监听器独立处理监听到的消息；事件处理器是执行处理事件发生后的关联函数，一种事件是能有一个处理函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var dom = $('.dom');
var listener1 = function(e){
    //do one thing
}
var listener2 = function(e){
    //do another thing
}
addEvent(dom,'click',listener1);
addEvent(dom,'click',listener2);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> dom = $(<span class="hljs-string">'.dom'</span>);
<span class="hljs-keyword">var</span> listener1 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
    <span class="hljs-comment">//do one thing</span>
}
<span class="hljs-keyword">var</span> listener2 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
    <span class="hljs-comment">//do another thing</span>
}
addEvent(dom,<span class="hljs-string">'click'</span>,listener1);
addEvent(dom,<span class="hljs-string">'click'</span>,listener2);</code></pre>
<p>在这个事件监听器的例子中，<code>listener1</code>和<code>listener2 </code>都是dom元素的监听器，当dom被点击时，都会执行各自的函数；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var dom = document.getElementById('dom');
var handler1 = function(e){
    //do one thing
}
var handler2 = function(e){
    //do another thing
}
dom.onclick = handler1;
dom.onclick = handler2;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> dom = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'dom'</span>);
<span class="hljs-keyword">var</span> handler1 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
    <span class="hljs-comment">//do one thing</span>
}
<span class="hljs-keyword">var</span> handler2 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
    <span class="hljs-comment">//do another thing</span>
}
dom.onclick = handler1;
dom.onclick = handler2;</code></pre>
<p>在这个事件处理器的例子中，<code>handler1</code>不会被执行，只执行<code>handler2</code>，是一次赋值的操作。</p>
<h4>1.2 动画</h4>
<p>在动画中广泛使用了观察者模式，动画的开始、完成、暂停等，都需要观察者来确定物体的行为和状态。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//定义动画
var Animation = function(){
    this.onStart = new Publisher;  //关于Publisher的设计将在1.3节介绍
    this.onComplete = new Publisher;
    this.onTween = new Publisher;
}
//定义一个原型方法
Animation.prototype.look = function(){
    this.onStart.deliver('animation started!');
    this.onTween.deliver('animation is going on!');
    this.onComplete.deliver('animation completed!');  
};

//实例一个box对象
var box = new Animation();

//定义三个函数作为subscribers
var openBox = function(msg){
    console.log(msg)
}
var checkBox = function(msg){
    console.log(msg)
}
var closeBox = function(msg){
    console.log(msg)
}

//订阅事件
openBox.subscribe(box.onStart);
checkBox.subscribe(box.onTween);
closeBox.subscribe(box.onComplete);

//调用方法
box.look()

//animation started!
//animation is going on!
//animation completed!
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//定义动画</span>
<span class="hljs-keyword">var</span> Animation = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.onStart = <span class="hljs-keyword">new</span> Publisher;  <span class="hljs-comment">//关于Publisher的设计将在1.3节介绍</span>
    <span class="hljs-keyword">this</span>.onComplete = <span class="hljs-keyword">new</span> Publisher;
    <span class="hljs-keyword">this</span>.onTween = <span class="hljs-keyword">new</span> Publisher;
}
<span class="hljs-comment">//定义一个原型方法</span>
Animation.prototype.look = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">this</span>.onStart.deliver(<span class="hljs-string">'animation started!'</span>);
    <span class="hljs-keyword">this</span>.onTween.deliver(<span class="hljs-string">'animation is going on!'</span>);
    <span class="hljs-keyword">this</span>.onComplete.deliver(<span class="hljs-string">'animation completed!'</span>);  
};

<span class="hljs-comment">//实例一个box对象</span>
<span class="hljs-keyword">var</span> box = <span class="hljs-keyword">new</span> Animation();

<span class="hljs-comment">//定义三个函数作为subscribers</span>
<span class="hljs-keyword">var</span> openBox = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg</span>)</span>{
    <span class="hljs-built_in">console</span>.log(msg)
}
<span class="hljs-keyword">var</span> checkBox = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg</span>)</span>{
    <span class="hljs-built_in">console</span>.log(msg)
}
<span class="hljs-keyword">var</span> closeBox = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg</span>)</span>{
    <span class="hljs-built_in">console</span>.log(msg)
}

<span class="hljs-comment">//订阅事件</span>
openBox.subscribe(box.onStart);
checkBox.subscribe(box.onTween);
closeBox.subscribe(box.onComplete);

<span class="hljs-comment">//调用方法</span>
box.look()

<span class="hljs-comment">//animation started!</span>
<span class="hljs-comment">//animation is going on!</span>
<span class="hljs-comment">//animation completed!</span>
</code></pre>
<h4>1.3 观察者的构建</h4>
<p>首先，需要一个发布者。先定义一个构造函数，为其定义一个数组，用以保存订阅者信息：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Publisher(){
    this.subscribes = [];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Publisher</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">this</span>.subscribes = [];
}</code></pre>
<p>发布者具有发布消息的功能，定义一个deliver的原型函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Publisher.prototype.deliver = function(data){
    this.subscribes.forEach(function(fn){
        fn(data);
    });
    return this;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>Publisher.prototype.deliver = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(data)</span></span>{
    <span class="hljs-keyword">this</span>.subscribes.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(fn)</span></span>{
        fn(data);
    });
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
}</code></pre>
<p>接下来构造订阅方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Function.prototype.subscribe = function(publisher){
    var that = this;
    var alreadyExists = publisher.subscribes.some(function(el){
        return el === that;
    });
    if(!alreadyExists){
        publisher.subscribes.push(this);
    }
    return this;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">Function</span>.prototype.subscribe = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">publisher</span>)</span>{
    <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">var</span> alreadyExists = publisher.subscribes.some(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">el</span>)</span>{
        <span class="hljs-keyword">return</span> el === that;
    });
    <span class="hljs-keyword">if</span>(!alreadyExists){
        publisher.subscribes.push(<span class="hljs-keyword">this</span>);
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
}</code></pre>
<p>直接在Function的prototype添加subscribe方法，这样所有函数都可以调用该方法。这样就构建完毕了，使用方法参看1.2动画的用例。<br><strong>比较直观的解释（以<code>onStart</code>为例）：</strong>当<code>box</code>对象执行<code>look</code>方法时，执行<code>onStart.deliver()</code>,将<code>onStart</code>事件发布出去，广播通知<code>'animation started!'</code>,这个时候，一直在监听<code>onStart</code>的<code>openBox</code>监听到该事件发布的信息，打印出来。</p>
<h4>1.4 另一种构建观察者的方式</h4>
<p>这种方式模仿了nodejs的事件处理机制，代码也比较简洁：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var scope = (function() {
    //消息列表
    var events = {};
    return {
        //订阅消息
        on:function(name,hander){
            var index = 0;  //记录消息时间的索引
            if(events[name]){  
                //消息名已存在，将处理函数放到该消息的事件队列中
                index = events[name].push(hander) - 1; 
            }else{
                events[name] = [hander];
            }
            //返回当前消息处理事件的移除函数
            return function(){
                events[name].splice(index,1);
            }
        },
        //关闭消息
        off:function(name){
            if(!events[name]) return;
            //消息存在，删除消息
            delete events[name];
        },
        //消息发布
        emit:function(name,msg){
            //消息不存在，不处理
            if(!events[name]) return;
            //消息存在，将该事件处理队列中每一个函数都执行一次
            events[name].forEach(function(v,i){
                v(msg);
            });
        }
    }
})();

var sayHello = scope.on('greeting',function(msg){
    console.log('订阅消息：' + msg);
});

var greeting = function(msg){
    console.log('发布消息：' + msg);
    scope.emit('greeting', msg);
}

greeting('hello Panfen!') " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-keyword">var</span> scope = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">//消息列表</span>
    <span class="hljs-keyword">var</span> events = {};
    <span class="hljs-keyword">return</span> {
        <span class="hljs-comment">//订阅消息</span>
        on:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name,hander</span>)</span>{
            <span class="hljs-keyword">var</span> index = <span class="hljs-number">0</span>;  <span class="hljs-comment">//记录消息时间的索引</span>
            <span class="hljs-keyword">if</span>(events[name]){  
                <span class="hljs-comment">//消息名已存在，将处理函数放到该消息的事件队列中</span>
                index = events[name].push(hander) - <span class="hljs-number">1</span>; 
            }<span class="hljs-keyword">else</span>{
                events[name] = [hander];
            }
            <span class="hljs-comment">//返回当前消息处理事件的移除函数</span>
            <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
                events[name].splice(index,<span class="hljs-number">1</span>);
            }
        },
        <span class="hljs-comment">//关闭消息</span>
        off:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>)</span>{
            <span class="hljs-keyword">if</span>(!events[name]) <span class="hljs-keyword">return</span>;
            <span class="hljs-comment">//消息存在，删除消息</span>
            <span class="hljs-keyword">delete</span> events[name];
        },
        <span class="hljs-comment">//消息发布</span>
        emit:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name,msg</span>)</span>{
            <span class="hljs-comment">//消息不存在，不处理</span>
            <span class="hljs-keyword">if</span>(!events[name]) <span class="hljs-keyword">return</span>;
            <span class="hljs-comment">//消息存在，将该事件处理队列中每一个函数都执行一次</span>
            events[name].forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">v,i</span>)</span>{
                v(msg);
            });
        }
    }
})();

<span class="hljs-keyword">var</span> sayHello = scope.on(<span class="hljs-string">'greeting'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'订阅消息：'</span> + msg);
});

<span class="hljs-keyword">var</span> greeting = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">msg</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'发布消息：'</span> + msg);
    scope.emit(<span class="hljs-string">'greeting'</span>, msg);
}

greeting(<span class="hljs-string">'hello Panfen!'</span>) </code></pre>
<h4>1.5 nodejs中观察者模式的实现方案</h4>
<p>nodejs中有events模块来实现观察者模式,可参考<a href="https://cnodejs.org/topic/561b869eba66abef398b007d" rel="nofollow noreferrer" target="_blank">Nodejs API-Events 谈观察者模式</a>，大多数的模块都集成了events模块，所以可以直接使用emit发射事件和on监听事件，或者像下面这样先定义一下;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var EventEmitter = require('events').EventEmitter;
var life = new EventEmitter();
life.setMaxListeners(11);       //设置最大监听数，默认10

//发布和订阅sendName
life.on('sendName',function(name){
    console.log('say hello to '+name);
});
life.emit('sendName','jeff');

//发布和订阅sendName2
function sayBeautiful(name){
    console.log(name + ' is beautiful');
}
life.on('sendName2',sayBeautiful);
life.emit('sendName2','jeff');
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> EventEmitter = <span class="hljs-built_in">require</span>(<span class="hljs-string">'events'</span>).EventEmitter;
<span class="hljs-keyword">var</span> life = <span class="hljs-keyword">new</span> EventEmitter();
life.setMaxListeners(<span class="hljs-number">11</span>);       <span class="hljs-comment">//设置最大监听数，默认10</span>

<span class="hljs-comment">//发布和订阅sendName</span>
life.on(<span class="hljs-string">'sendName'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>)</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'say hello to '</span>+name);
});
life.emit(<span class="hljs-string">'sendName'</span>,<span class="hljs-string">'jeff'</span>);

<span class="hljs-comment">//发布和订阅sendName2</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sayBeautiful</span>(<span class="hljs-params">name</span>)</span>{
    <span class="hljs-built_in">console</span>.log(name + <span class="hljs-string">' is beautiful'</span>);
}
life.on(<span class="hljs-string">'sendName2'</span>,sayBeautiful);
life.emit(<span class="hljs-string">'sendName2'</span>,<span class="hljs-string">'jeff'</span>);
</code></pre>
<p>常用方法：</p>
<ul>
<li><p>hasConfortListener ：用于判断发射的事件是否有监听器</p></li>
<li><p>removeListener ：移除监听器</p></li>
<li><p>listenerCount ：该事件所有监听器的总数</p></li>
<li><p>removeAllListeners ：移除事件所有（或某个）的监听器</p></li>
</ul>
<h4>1.6 总结</h4>
<p>观察者模式建立了<code>推送</code>和<code>收听</code>的逻辑，适用于希望把人的行为和应用程序的行为分开的场合。举个例子来说：用户点击导航栏的一个tab时，会打开包含更多选项的子菜单，一般会选择在知道哪个元素的情况下直接监听这个click事件，这样做的弊端在于实现了与click事件直接绑在一起。更好的做法是：创建一个可观察的onTabChange对象，关联若干观察者实现。</p>
<h4>1.7 参考资料：</h4>
<ul>
<li><p><a href="https://book.douban.com/subject/3329540/" rel="nofollow noreferrer" target="_blank">《Javascript设计模式》</a></p></li>
<li><p><a href="https://juejin.im/entry/58c2c481570c35005827907d" rel="nofollow noreferrer" target="_blank">发布（Publish）/ 订阅（Subscribe）模式</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
javascript设计模式学习——观察者模式

## 原文链接
[https://segmentfault.com/a/1190000008746120](https://segmentfault.com/a/1190000008746120)

