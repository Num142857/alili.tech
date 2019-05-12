---
title: 'JS中的观察者模式(发布订阅)' 
date: 2019-01-29 2:30:10
hidden: true
slug: 23ftsgrtzzc
categories: [reprint]
---

{{< raw >}}

                    
<h4>观察者模式</h4>
<blockquote><p>简介</p></blockquote>
<p>观察者模式又称发布订阅模式，是一种最常用的设计模式之一了。讲道理，如果我们写的不是稍微底层的代码，可能不会用到它。 但是有了它会让代码更灵活，更加规整，减少冗余代码，方便分模块，分功能开发。</p>
<blockquote><p>引入</p></blockquote>
<p>在前端业务中，可能用的比较多的地方可能就是自定义事件了。<br>其实浏览器的事件也是观察者模式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
div.onclick = function click() {
    console.log('click')
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
div.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">click</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'click'</span>)
}</code></pre>
<p>这里function click 订阅了 div 的click 事件，当我们的鼠标点击操作，事件发布，对应的function就会执行。这个function click 就是一个观察者。</p>
<blockquote><p>具象化理解</p></blockquote>
<p>其实单纯的看代码实现，也可以理解。但是万物都是有联系的，这些编程模式设计之初也是来源于生活经验吧，所以，具象的理解也是很重要的体验。</p>
<p>我们举一个结婚办酒席的例子。比如你的一个好朋友要结婚了，'结婚'这件事情不是天天发生，一辈子就那么一... 两次(maybe more)，所以我们的'去参加他的婚礼'肯定不是天天发生，只是在特定的时候。我肯定不能天天去问他，'今天你结婚吗，我来参加酒席啊'。一次两次还行，天天问，sb啊。假如是一个找不到对象的单身汪，被你天天这么问，还不得杀了你。。</p>
<p>那这里就需要有一个事件发布了，也就是'通知你'。 </p>
<p>我作为一个观察者，去订阅他'结婚' 的这个事件，就是我们是好朋友，他的婚礼我肯定去，我们已经说好了。那么我就是观察者，'我去参加婚礼'就是对应而来的动作。当我订阅了'结婚' 这个事件，我就不需要天天去问他了，我该干嘛干嘛，该去泡妞，约饭，看电影，约...  就干嘛。</p>
<p>当他发布'结婚' 这个事件，通知到我了，我就在特定的时候，去do'参加婚礼酒席'这个行为function ...</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//模拟代码

//我订阅了'marry' 事件
wo.on('marry',function(){
    //去参加婚礼酒席
})

//然后他发布。比如浏览器的点击
// 对应的我的 function就会执行" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">//模拟代码</span>

<span class="hljs-comment">//我订阅了'marry' 事件</span>
wo.on(<span class="hljs-string">'marry'</span>,<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    <span class="hljs-comment">//去参加婚礼酒席</span>
})

<span class="hljs-comment">//然后他发布。比如浏览器的点击</span>
<span class="hljs-comment">// 对应的我的 function就会执行</span></code></pre>
<blockquote><p>解耦/模块/功能</p></blockquote>
<p>其实在代码中是需要一个类似于中间服务的,管理发布订阅的中间者。<br>比如浏览器中的事件处理程序，他提供了订阅的接口，然后接收'事件' 信号 发布给你。让js代码跟浏览器之间有了联系，互动。而本来是两个不同的东西。</p>
<p>在我看来，观察者模式最大的好处就是在于解耦，会让我们一锅端的代码，分功能，分模块的抽离开，更加清晰，开发成本变低，也容易维护。<br>比如：</p>
<ul><li>
<p>我们项目里的view 展示层跟model(数据处理)逻辑层，最开始写页面，ajax，字符串拼接，请求回一个接口拼一下，然后给dom。可能我们一个js文件，一个function里面又请求了接口，又去负责 view 的展示。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var xhr = new XMLHttpRequest ()
 xhr.open('get',url)
 xhr.onreadystatechange = function () {
   if(this.readyState !== 4) return
   if(this.status === 200) {
     divs.innerHTML = '<p>' + this.response + '</p>'
     //
   }
 }
 xhr.responseType = 'json'
 xhr.send(null)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">var</span> xhr = new XMLHttpRequest ()
 xhr.<span class="hljs-keyword">open</span>(<span class="hljs-string">'get'</span>,url)
 xhr.onreadystatechange = function () {
   <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.readyState !== <span class="hljs-number">4</span>) <span class="hljs-keyword">return</span>
   <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.status === <span class="hljs-number">200</span>) {
     divs.innerHTML = <span class="hljs-string">'&lt;p&gt;'</span> + <span class="hljs-keyword">this</span>.response + <span class="hljs-string">'&lt;/p&gt;'</span>
     <span class="hljs-comment">//</span>
   }
 }
 xhr.responseType = <span class="hljs-string">'json'</span>
 xhr.send(<span class="hljs-literal">null</span>)</code></pre>
</li></ul>
<p>其实应该是请求跟 展示渲染分开的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" //请求
 function getData () {
      var xhr = new XMLHttpRequest ()
    xhr.open('get',url)
    xhr.onreadystatechange = function () {
      if(this.readyState !== 4) return
      if(this.status === 200) {
        this.emit('渲染')
        // 发布
      }
    }
    xhr.responseType = 'json'
    xhr.send(null)
 }
 
    
 //渲染
 function view () {}
 
 xhr.on('渲染',view)
     " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code> <span class="hljs-comment">//请求</span>
 <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getData</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">var</span> xhr = <span class="hljs-keyword">new</span> XMLHttpRequest ()
    xhr.open(<span class="hljs-string">'get'</span>,<span class="hljs-built_in">url</span>)
    xhr.onreadystatechange = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.readyState !== <span class="hljs-number">4</span>) <span class="hljs-keyword">return</span>
      <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>.status === <span class="hljs-number">200</span>) {
        <span class="hljs-keyword">this</span>.emit(<span class="hljs-string">'渲染'</span>)
        <span class="hljs-comment">// 发布</span>
      }
    }
    xhr.responseType = <span class="hljs-string">'json'</span>
    xhr.send(<span class="hljs-literal">null</span>)
 }
 
    
 <span class="hljs-comment">//渲染</span>
 <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">view</span> (<span class="hljs-params"></span>) </span>{}
 
 xhr.on(<span class="hljs-string">'渲染'</span>,view)
     </code></pre>
<p>直接在状态码200那里放个callback，也能做到。但是，如果我有两个甚至渲染函数，处理不同的东西，我每次还要改成不同的函数吗。 这个相同请求的过程是不是还要写一遍。<br>用观察者的话</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function view1 () {}
function view2 () {}
function view3 () {}
function view4 () {}

if(我要渲染view1) {
    xhr.on('渲染',view1) //订阅
    xhr.on('渲染',view2)
}else{
    xhr.on('渲染',view3)
    xhr.on('渲染',view4)
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">view1</span> <span class="hljs-params">()</span> </span>{}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">view2</span> <span class="hljs-params">()</span> </span>{}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">view3</span> <span class="hljs-params">()</span> </span>{}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">view4</span> <span class="hljs-params">()</span> </span>{}

<span class="hljs-keyword">if</span>(我要渲染view1) {
    xhr.on(<span class="hljs-string">'渲染'</span>,view1) <span class="hljs-comment">//订阅</span>
    xhr.on(<span class="hljs-string">'渲染'</span>,view2)
}<span class="hljs-keyword">else</span>{
    xhr.on(<span class="hljs-string">'渲染'</span>,view3)
    xhr.on(<span class="hljs-string">'渲染'</span>,view4)
}

</code></pre>
<p>好处就在于我的getData这个功能，方法就只负责请求数据，然后他会暴露一个接口，供我去添加方法。这样我的getData 就相对来说是比较完整的功能模块，就算我有再多的情况，我的getData 里面的代码是不会改动的了。</p>
<p>有时候我们经常为了实现业务，添加一个新的功能，而去更改我们之前写好的代码，导致我们本来的功能模块被改的面目全非。<br>而且会有好多的重复代码。<br>过程？ or  模块？</p>
<p>当然封好一个 好的完整的功能模块是挺难的一件事情，但我们起码要有个开始。</p>
<p>订阅去添加方法，发布了事件池就执行。</p>
<ul><li>
<p>MV* 类框架</p>
<p>MVC也是一种设计模式，这里面也都应用了观察者。</p>
</li></ul>
<p>他内部也都是各种发布订阅，好像是一个观察者模型，从而实现了一个模拟的内存中的dom改变，计算出那个DOM节点应该改变。当然具体实现要做好多事情...就不...</p>
<ul><li><p>redux</p></li></ul>
<blockquote><p>简单实现一个createstore函数</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//这是一个工厂函数，可以创建store

const  createStore = (reducer) => {
   let state; // 定义存储的state
   let listeners = [];
   
  //  getState的作用很简单就是返回当前是state
  const  getState = ()=> state;
  
    //定义一个派发函数
    //当在外界调用此函数的时候，会修改状态
  const dispatch = (action)=>{
      //调用reducer函数修改状态，返回一新的状态并赋值给这个局部状态变量
      state = reducer(state,action);
      //依次调用监听函数，通知所有的监听函数
      listeners.forEach(listener => listener());
  }
   //订阅此状态的函数，当状态发生变化的时候记得调用此监听函数
  const subscribe = function(listener){
      //先把此监听 加到数组中
      listeners.push(listener);
      
      //返回一个函数，当调用它的时候将此监听函数从监听数组移除
      return function(){
          listeners = listeners.filter(l => l != listener);
      }
  }
    //默认调用一次dispatch给state赋一个初始值
   dispatch();
  return {
      getState,
      dispatch,
      subscribe
  }
}
let store = createStore(reducer);

//把数据渲染到界面上
const render = () => {
    document.body.innerText = store.getState();
}

// 订阅状态变化事件，当状态变化时用监听函数
store.subscribe(render);
render();
var INCREASE_ACTION = {type: 'INCREMENT'};
document.addEventListener('click', function (e) {
    //触发一个Action
    store.dispatch(INCREASE_ACTION);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//这是一个工厂函数，可以创建store</span>

<span class="hljs-keyword">const</span>  createStore = <span class="hljs-function">(<span class="hljs-params">reducer</span>) =&gt;</span> {
   <span class="hljs-keyword">let</span> state; <span class="hljs-comment">// 定义存储的state</span>
   <span class="hljs-keyword">let</span> listeners = [];
   
  <span class="hljs-comment">//  getState的作用很简单就是返回当前是state</span>
  <span class="hljs-keyword">const</span>  getState = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span> state;
  
    <span class="hljs-comment">//定义一个派发函数</span>
    <span class="hljs-comment">//当在外界调用此函数的时候，会修改状态</span>
  <span class="hljs-keyword">const</span> dispatch = <span class="hljs-function">(<span class="hljs-params">action</span>)=&gt;</span>{
      <span class="hljs-comment">//调用reducer函数修改状态，返回一新的状态并赋值给这个局部状态变量</span>
      state = reducer(state,action);
      <span class="hljs-comment">//依次调用监听函数，通知所有的监听函数</span>
      listeners.forEach(<span class="hljs-function"><span class="hljs-params">listener</span> =&gt;</span> listener());
  }
   <span class="hljs-comment">//订阅此状态的函数，当状态发生变化的时候记得调用此监听函数</span>
  <span class="hljs-keyword">const</span> subscribe = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">listener</span>)</span>{
      <span class="hljs-comment">//先把此监听 加到数组中</span>
      listeners.push(listener);
      
      <span class="hljs-comment">//返回一个函数，当调用它的时候将此监听函数从监听数组移除</span>
      <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
          listeners = listeners.filter(<span class="hljs-function"><span class="hljs-params">l</span> =&gt;</span> l != listener);
      }
  }
    <span class="hljs-comment">//默认调用一次dispatch给state赋一个初始值</span>
   dispatch();
  <span class="hljs-keyword">return</span> {
      getState,
      dispatch,
      subscribe
  }
}
<span class="hljs-keyword">let</span> store = createStore(reducer);

<span class="hljs-comment">//把数据渲染到界面上</span>
<span class="hljs-keyword">const</span> render = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">document</span>.body.innerText = store.getState();
}

<span class="hljs-comment">// 订阅状态变化事件，当状态变化时用监听函数</span>
store.subscribe(render);
render();
<span class="hljs-keyword">var</span> INCREASE_ACTION = {<span class="hljs-attr">type</span>: <span class="hljs-string">'INCREMENT'</span>};
<span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
    <span class="hljs-comment">//触发一个Action</span>
    store.dispatch(INCREASE_ACTION);
})</code></pre>
<ul><li><p>在node 中的作用 大多数时候我们不会直接使用 EventEmitter，而是在对象中继承它。包括fs、net、 http 在内的，只要是支持事件响应的核心模块都是 EventEmitter 的子类。</p></li></ul>
<blockquote><p>实现一个可以发布订阅的类</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict'
class EmitterEvent {
  constructor() {
  //构造器。实例上创建一个事件池
    this._event = {}
  }
  //on 订阅
  on (eventName, handler) {
  // 根据eventName，事件池有对应的事件数组，
  就push添加，没有就新建一个。
  // 严谨一点应该判断handler的类型，是不是function
    if(this._event[eventName]) {
      this._event[eventName].push(handler)
    } else {
      this._event[eventName] = [handler]
    }
  }
  emit (eventName) {
  // 根据eventName找到对应数组
    var events = this._event[eventName];
  //  取一下传进来的参数，方便给执行的函数
    var otherArgs = Array.prototype.slice.call(arguments,1)
    var that = this
    if(events) {
      events.forEach((event) => {
        event.apply(that, otherArgs)
      })
    }
  }
  // 解除订阅
  off (eventName, handler) {
    var events = this._event[eventName]
    if(events) {
      this._event[eventName] = events.filter((event) => {
        return event !== handler
      })
    }
  }
  // 订阅以后，emit 发布执行一次后自动解除订阅
  once (eventName, handler) {
    var that = this
    function func () {
      var args = Array.prototype.slice.call(arguments,0)
      handler.apply(that, args)
      this.off(eventName,func)
    }
    this.on(eventName, func)
  }
}

var event = new EmitterEvent()
function a (something) {
  console.log(something,'aa-aa')
}
function b (something) {
  console.log(something)
}
 event.once('dosomething',a)
 event.emit('dosomething', 'chifan')
 
 //event.emit('dosomething')

// event.on('dosomething',a)
// event.on('dosomething',b)
// event.emit('dosomething','chifan')
// event.off('dosomething',a)
// setTimeout(() => {
//   event.emit('dosomething','hejiu')
// },2000)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-meta">'use strict'</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">EmitterEvent</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
  <span class="hljs-comment">//构造器。实例上创建一个事件池</span>
    <span class="hljs-keyword">this</span>._event = {}
  }
  <span class="hljs-comment">//on 订阅</span>
  on (eventName, handler) {
  <span class="hljs-comment">// 根据eventName，事件池有对应的事件数组，</span>
  就push添加，没有就新建一个。
  <span class="hljs-comment">// 严谨一点应该判断handler的类型，是不是function</span>
    <span class="hljs-keyword">if</span>(<span class="hljs-keyword">this</span>._event[eventName]) {
      <span class="hljs-keyword">this</span>._event[eventName].push(handler)
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">this</span>._event[eventName] = [handler]
    }
  }
  emit (eventName) {
  <span class="hljs-comment">// 根据eventName找到对应数组</span>
    <span class="hljs-keyword">var</span> events = <span class="hljs-keyword">this</span>._event[eventName];
  <span class="hljs-comment">//  取一下传进来的参数，方便给执行的函数</span>
    <span class="hljs-keyword">var</span> otherArgs = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>,<span class="hljs-number">1</span>)
    <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>
    <span class="hljs-keyword">if</span>(events) {
      events.forEach(<span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
        event.apply(that, otherArgs)
      })
    }
  }
  <span class="hljs-comment">// 解除订阅</span>
  off (eventName, handler) {
    <span class="hljs-keyword">var</span> events = <span class="hljs-keyword">this</span>._event[eventName]
    <span class="hljs-keyword">if</span>(events) {
      <span class="hljs-keyword">this</span>._event[eventName] = events.filter(<span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
        <span class="hljs-keyword">return</span> event !== handler
      })
    }
  }
  <span class="hljs-comment">// 订阅以后，emit 发布执行一次后自动解除订阅</span>
  once (eventName, handler) {
    <span class="hljs-keyword">var</span> that = <span class="hljs-keyword">this</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">func</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">var</span> args = <span class="hljs-built_in">Array</span>.prototype.slice.call(<span class="hljs-built_in">arguments</span>,<span class="hljs-number">0</span>)
      handler.apply(that, args)
      <span class="hljs-keyword">this</span>.off(eventName,func)
    }
    <span class="hljs-keyword">this</span>.on(eventName, func)
  }
}

<span class="hljs-keyword">var</span> event = <span class="hljs-keyword">new</span> EmitterEvent()
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">a</span> (<span class="hljs-params">something</span>) </span>{
  <span class="hljs-built_in">console</span>.log(something,<span class="hljs-string">'aa-aa'</span>)
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">b</span> (<span class="hljs-params">something</span>) </span>{
  <span class="hljs-built_in">console</span>.log(something)
}
 event.once(<span class="hljs-string">'dosomething'</span>,a)
 event.emit(<span class="hljs-string">'dosomething'</span>, <span class="hljs-string">'chifan'</span>)
 
 <span class="hljs-comment">//event.emit('dosomething')</span>

<span class="hljs-comment">// event.on('dosomething',a)</span>
<span class="hljs-comment">// event.on('dosomething',b)</span>
<span class="hljs-comment">// event.emit('dosomething','chifan')</span>
<span class="hljs-comment">// event.off('dosomething',a)</span>
<span class="hljs-comment">// setTimeout(() =&gt; {</span>
<span class="hljs-comment">//   event.emit('dosomething','hejiu')</span>
<span class="hljs-comment">// },2000)</span>
</code></pre>
<p>当我们需要用的时候，只需要继承一下这个EmitterEvent类。要操作的实例就可以用on,emit方法，也就是可以用发布订阅。比如XHR，组件...</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JS中的观察者模式(发布订阅)

## 原文链接
[https://segmentfault.com/a/1190000007921198](https://segmentfault.com/a/1190000007921198)

