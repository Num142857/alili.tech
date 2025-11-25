---
title: '[面试专题]JS设计模式' 
date: 2019-01-02 2:30:09
hidden: true
slug: i5rocgeevoq
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">JS设计模式</h1>
<hr>
<h3 id="articleHeader1">发布订阅模式:</h3>
<p>这种设计模式可以大大降低程序模块之间的耦合度，便于更加灵活的扩展和维护。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 一个播放器类
class Player {

  constructor() {
    // 初始化观察者列表
    this.watchers = {}

    // 模拟2秒后发布一个'play'事件
    setTimeout(() => {
      this._publish('play', true)
    }, 2000)

    // 模拟4秒后发布一个'pause'事件
    setTimeout(() => {
      this._publish('pause', true)
    }, 4000)
  }

  // 发布事件
  _publish(event, data) {
    if (this.watchers[event] &amp;&amp; this.watchers[event].length) {
      this.watchers[event].forEach(callback => callback.bind(this)(data))
    }
  }

  // 订阅事件
  subscribe(event, callback) {
    this.watchers[event] = this.watchers[event] || []
    this.watchers[event].push(callback)
  }

  // 退订事件
  unsubscribe(event = null, callback = null) {
    // 如果传入指定事件函数，则仅退订此事件函数
    if (callback&amp;&amp;event) {
      if (this.watchers[event] &amp;&amp; this.watchers[event].length) {
        this.watchers[event].splice(this.watchers[event].findIndex(cb => Object.is(cb, callback)), 1)
      }

    // 如果仅传入事件名称，则退订此事件对应的所有的事件函数
    } else if (event) {
      this.watchers[event] = []

    // 如果未传入任何参数，则退订所有事件
    } else {
      this.watchers = {}
    }
  }
}

// 实例化播放器
const player = new Player()
console.log(player)

// 播放事件回调函数1
const onPlayerPlay1 = function(data) {
  console.log('1: Player is play, the `this` context is current player', this, data)
}

// 播放事件回调函数2
const onPlayerPlay2 = data => {
  console.log('2: Player is play', data)
}

// 暂停事件回调函数
const onPlayerPause = data => {
  console.log('Player is pause', data)
}

// 加载事件回调函数
const onPlayerLoaded = data => {
  console.log('Player is loaded', data)
}

// 可订阅多个不同事件
player.subscribe('play', onPlayerPlay1)
player.subscribe('play', onPlayerPlay2)
player.subscribe('pause', onPlayerPause)
player.subscribe('loaded', onPlayerLoaded)

// 可以退订指定订阅事件
player.unsubscribe('play', onPlayerPlay2)
// 退订指定事件名称下的所有订阅事件
player.unsubscribe('play')
// 退订所有订阅事件
player.unsubscribe()

// 可以在外部手动发出事件（真实生产场景中，发布特性一般为类内部私有方法）
player._publish('loaded', true)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 一个播放器类</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Player</span> </span>{

  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-comment">// 初始化观察者列表</span>
    <span class="hljs-keyword">this</span>.watchers = {}

    <span class="hljs-comment">// 模拟2秒后发布一个'play'事件</span>
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-keyword">this</span>._publish(<span class="hljs-string">'play'</span>, <span class="hljs-literal">true</span>)
    }, <span class="hljs-number">2000</span>)

    <span class="hljs-comment">// 模拟4秒后发布一个'pause'事件</span>
    setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
      <span class="hljs-keyword">this</span>._publish(<span class="hljs-string">'pause'</span>, <span class="hljs-literal">true</span>)
    }, <span class="hljs-number">4000</span>)
  }

  <span class="hljs-comment">// 发布事件</span>
  _publish(event, data) {
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.watchers[event] &amp;&amp; <span class="hljs-keyword">this</span>.watchers[event].length) {
      <span class="hljs-keyword">this</span>.watchers[event].forEach(<span class="hljs-function"><span class="hljs-params">callback</span> =&gt;</span> callback.bind(<span class="hljs-keyword">this</span>)(data))
    }
  }

  <span class="hljs-comment">// 订阅事件</span>
  subscribe(event, callback) {
    <span class="hljs-keyword">this</span>.watchers[event] = <span class="hljs-keyword">this</span>.watchers[event] || []
    <span class="hljs-keyword">this</span>.watchers[event].push(callback)
  }

  <span class="hljs-comment">// 退订事件</span>
  unsubscribe(event = <span class="hljs-literal">null</span>, callback = <span class="hljs-literal">null</span>) {
    <span class="hljs-comment">// 如果传入指定事件函数，则仅退订此事件函数</span>
    <span class="hljs-keyword">if</span> (callback&amp;&amp;event) {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.watchers[event] &amp;&amp; <span class="hljs-keyword">this</span>.watchers[event].length) {
        <span class="hljs-keyword">this</span>.watchers[event].splice(<span class="hljs-keyword">this</span>.watchers[event].findIndex(<span class="hljs-function"><span class="hljs-params">cb</span> =&gt;</span> <span class="hljs-built_in">Object</span>.is(cb, callback)), <span class="hljs-number">1</span>)
      }

    <span class="hljs-comment">// 如果仅传入事件名称，则退订此事件对应的所有的事件函数</span>
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (event) {
      <span class="hljs-keyword">this</span>.watchers[event] = []

    <span class="hljs-comment">// 如果未传入任何参数，则退订所有事件</span>
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">this</span>.watchers = {}
    }
  }
}

<span class="hljs-comment">// 实例化播放器</span>
<span class="hljs-keyword">const</span> player = <span class="hljs-keyword">new</span> Player()
<span class="hljs-built_in">console</span>.log(player)

<span class="hljs-comment">// 播放事件回调函数1</span>
<span class="hljs-keyword">const</span> onPlayerPlay1 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">data</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'1: Player is play, the `this` context is current player'</span>, <span class="hljs-keyword">this</span>, data)
}

<span class="hljs-comment">// 播放事件回调函数2</span>
<span class="hljs-keyword">const</span> onPlayerPlay2 = <span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'2: Player is play'</span>, data)
}

<span class="hljs-comment">// 暂停事件回调函数</span>
<span class="hljs-keyword">const</span> onPlayerPause = <span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Player is pause'</span>, data)
}

<span class="hljs-comment">// 加载事件回调函数</span>
<span class="hljs-keyword">const</span> onPlayerLoaded = <span class="hljs-function"><span class="hljs-params">data</span> =&gt;</span> {
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Player is loaded'</span>, data)
}

<span class="hljs-comment">// 可订阅多个不同事件</span>
player.subscribe(<span class="hljs-string">'play'</span>, onPlayerPlay1)
player.subscribe(<span class="hljs-string">'play'</span>, onPlayerPlay2)
player.subscribe(<span class="hljs-string">'pause'</span>, onPlayerPause)
player.subscribe(<span class="hljs-string">'loaded'</span>, onPlayerLoaded)

<span class="hljs-comment">// 可以退订指定订阅事件</span>
player.unsubscribe(<span class="hljs-string">'play'</span>, onPlayerPlay2)
<span class="hljs-comment">// 退订指定事件名称下的所有订阅事件</span>
player.unsubscribe(<span class="hljs-string">'play'</span>)
<span class="hljs-comment">// 退订所有订阅事件</span>
player.unsubscribe()

<span class="hljs-comment">// 可以在外部手动发出事件（真实生产场景中，发布特性一般为类内部私有方法）</span>
player._publish(<span class="hljs-string">'loaded'</span>, <span class="hljs-literal">true</span>)</code></pre>
<h3 id="articleHeader2">中介者模式 Mediator Pattern:</h3>
<p>观察者模式通过维护一堆列表来管理对象间的多对多关系，中介者模式通过统一接口来维护一对多关系，且通信者之间不需要知道彼此之间的关系，只需要约定好API即可。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 汽车
class Bus {

  constructor() {

    // 初始化所有乘客
    this.passengers = {}
  }

  // 发布广播
  broadcast(passenger, message = passenger) {
    // 如果车上有乘客
    if (Object.keys(this.passengers).length) {

      // 如果是针对某个乘客发的，就单独给他听
      if (passenger.id &amp;&amp; passenger.listen) {

        // 乘客他爱听不听
        if (this.passengers[passenger.id]) {
          this.passengers[passenger.id].listen(message)
        }

      // 不然就广播给所有乘客
      } else {
        Object.keys(this.passengers).forEach(passenger => {
          if (this.passengers[passenger].listen) {
            this.passengers[passenger].listen(message)
          }
        })
      }
    }
  }

  // 乘客上车
  aboard(passenger) {
    this.passengers[passenger.id] = passenger
  }

  // 乘客下车
  debus(passenger) {
    this.passengers[passenger.id] = null
    delete this.passengers[passenger.id]
    console.log(`乘客${passenger.id}下车`)
  }

  // 开车
  start() {
    this.broadcast({ type: 1, content: '前方无障碍，开车！Over'})
  }

  // 停车
  end() {
    this.broadcast({ type: 2, content: '老司机翻车，停车！Over'})
  }
}

// 乘客
class Passenger {

  constructor(id) {
    this.id = id
  }

  // 听广播
  listen(message) {
    console.log(`乘客${this.id}收到消息`, message)
    // 乘客发现停车了，于是自己下车
    if (Object.is(message.type, 2)) {
      this.debus()
    }
  }

  // 下车
  debus() {
    console.log(`我是乘客${this.id}，我现在要下车`, bus)
    bus.debus(this)
  }
}

// 创建一辆汽车
const bus = new Bus()

// 创建两个乘客
const passenger1 = new Passenger(1)
const passenger2 = new Passenger(2)

// 俩乘客分别上车
bus.aboard(passenger1)
bus.aboard(passenger2)

// 2秒后开车
setTimeout(bus.start.bind(bus), 2000)

// 3秒时司机发现2号乘客没买票，2号乘客被驱逐下车
setTimeout(() => {
  bus.broadcast(passenger2, { type: 3, content: '同志你好，你没买票，请下车!' })
  bus.debus(passenger2)
}, 3000)

// 4秒后到站停车
setTimeout(bus.end.bind(bus), 3600)

// 6秒后再开车，车上已经没乘客了
setTimeout(bus.start.bind(bus), 6666)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// 汽车</span>
<span class="hljs-keyword">class</span> Bus {

  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"></span>) {

    <span class="hljs-comment">// 初始化所有乘客</span>
    <span class="hljs-keyword">this</span>.passengers = {}
  }

  <span class="hljs-comment">// 发布广播</span>
  broadcast(passenger, message = passenger) {
    <span class="hljs-comment">// 如果车上有乘客</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Object</span>.keys(<span class="hljs-keyword">this</span>.passengers).length) {

      <span class="hljs-comment">// 如果是针对某个乘客发的，就单独给他听</span>
      <span class="hljs-keyword">if</span> (passenger.id &amp;&amp; passenger.listen) {

        <span class="hljs-comment">// 乘客他爱听不听</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.passengers[passenger.id]) {
          <span class="hljs-keyword">this</span>.passengers[passenger.id].listen(message)
        }

      <span class="hljs-comment">// 不然就广播给所有乘客</span>
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-built_in">Object</span>.keys(<span class="hljs-keyword">this</span>.passengers).forEach(<span class="hljs-function"><span class="hljs-params">passenger</span> =&gt;</span> {
          <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.passengers[passenger].listen) {
            <span class="hljs-keyword">this</span>.passengers[passenger].listen(message)
          }
        })
      }
    }
  }

  <span class="hljs-comment">// 乘客上车</span>
  aboard(passenger) {
    <span class="hljs-keyword">this</span>.passengers[passenger.id] = passenger
  }

  <span class="hljs-comment">// 乘客下车</span>
  debus(passenger) {
    <span class="hljs-keyword">this</span>.passengers[passenger.id] = <span class="hljs-literal">null</span>
    <span class="hljs-keyword">delete</span> <span class="hljs-keyword">this</span>.passengers[passenger.id]
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`乘客<span class="hljs-subst">${passenger.id}</span>下车`</span>)
  }

  <span class="hljs-comment">// 开车</span>
  start() {
    <span class="hljs-keyword">this</span>.broadcast({ <span class="hljs-keyword">type</span>: <span class="hljs-number">1</span>, content: <span class="hljs-string">'前方无障碍，开车！Over'</span>})
  }

  <span class="hljs-comment">// 停车</span>
  end() {
    <span class="hljs-keyword">this</span>.broadcast({ <span class="hljs-keyword">type</span>: <span class="hljs-number">2</span>, content: <span class="hljs-string">'老司机翻车，停车！Over'</span>})
  }
}

<span class="hljs-comment">// 乘客</span>
<span class="hljs-keyword">class</span> Passenger {

  <span class="hljs-keyword">constructor</span>(<span class="hljs-params">id</span>) {
    <span class="hljs-keyword">this</span>.id = id
  }

  <span class="hljs-comment">// 听广播</span>
  listen(message) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`乘客<span class="hljs-subst">${this.id}</span>收到消息`</span>, message)
    <span class="hljs-comment">// 乘客发现停车了，于是自己下车</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Object</span>.is(message.type, <span class="hljs-number">2</span>)) {
      <span class="hljs-keyword">this</span>.debus()
    }
  }

  <span class="hljs-comment">// 下车</span>
  debus() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`我是乘客<span class="hljs-subst">${this.id}</span>，我现在要下车`</span>, bus)
    bus.debus(<span class="hljs-keyword">this</span>)
  }
}

<span class="hljs-comment">// 创建一辆汽车</span>
<span class="hljs-keyword">const</span> bus = <span class="hljs-keyword">new</span> Bus()

<span class="hljs-comment">// 创建两个乘客</span>
<span class="hljs-keyword">const</span> passenger1 = <span class="hljs-keyword">new</span> Passenger(<span class="hljs-number">1</span>)
<span class="hljs-keyword">const</span> passenger2 = <span class="hljs-keyword">new</span> Passenger(<span class="hljs-number">2</span>)

<span class="hljs-comment">// 俩乘客分别上车</span>
bus.aboard(passenger1)
bus.aboard(passenger2)

<span class="hljs-comment">// 2秒后开车</span>
setTimeout(bus.start.bind(bus), <span class="hljs-number">2000</span>)

<span class="hljs-comment">// 3秒时司机发现2号乘客没买票，2号乘客被驱逐下车</span>
setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  bus.broadcast(passenger2, { <span class="hljs-keyword">type</span>: <span class="hljs-number">3</span>, content: <span class="hljs-string">'同志你好，你没买票，请下车!'</span> })
  bus.debus(passenger2)
}, <span class="hljs-number">3000</span>)

<span class="hljs-comment">// 4秒后到站停车</span>
setTimeout(bus.end.bind(bus), <span class="hljs-number">3600</span>)

<span class="hljs-comment">// 6秒后再开车，车上已经没乘客了</span>
setTimeout(bus.start.bind(bus), <span class="hljs-number">6666</span>)</code></pre>
<h3 id="articleHeader3">代理模式 Proxy Pattern:</h3>
<blockquote><p>为其他对象提供一种代理以控制对这个对象的访问。<br>代理模式使得代理对象控制具体对象的引用。代理几乎可以是任何对象：文件，资源，内存中的对象，或者是一些难以复制的东西。</p></blockquote>
<p>ES6中的Proxy对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const target = {}
const handler = {
    get(target, property) {
        if (property in target) {
            return target[property]
        } else {
            throw new ReferenceError(&quot;Property \&quot;&quot; + property + &quot;\&quot; does not exist.&quot;)
        }
    }
}
const p = new Proxy(target, {})
p.a = 3  // 被转发到代理的操作
console.log(p.c) //" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-keyword">const</span> target = {}
<span class="hljs-keyword">const</span> handler = {
    get(target, <span class="hljs-keyword">property</span><span class="hljs-string">) {</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-keyword">property</span><span class="hljs-string"> in target) {</span>
            <span class="hljs-keyword">return</span> target[<span class="hljs-keyword">property</span><span class="hljs-string">]</span>
        } <span class="hljs-title">else</span> {
            <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">ReferenceError</span>(<span class="hljs-string">"Property \""</span> + <span class="hljs-keyword">property</span><span class="hljs-string"> + "\" does not exist.")</span>
        }
    }
}
<span class="hljs-keyword">const</span> p = <span class="hljs-keyword">new</span> <span class="hljs-built_in">Proxy</span>(target, {})
p.a = <span class="hljs-number">3</span>  <span class="hljs-comment">// 被转发到代理的操作</span>
<span class="hljs-built_in">console</span>.log(p.c) <span class="hljs-comment">//</span></code></pre>
<h3 id="articleHeader4">单例模式 Singleton Pattern:</h3>
<blockquote><p>保证一个类只有一个实例，并提供一个访问它的全局访问点（调用一个类，任何时候返回的都是同一个实例）。</p></blockquote>
<p>实现方法：使用一个变量来标志当前是否已经为某个类创建过对象，如果创建了，则在下一次获取该类的实例时，直接返回之前创建的对象，否则就创建一个对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 类数实例：
class Singleton {
  constructor(name) {
    this.name = name
    this.instance = null   // 
  }
  getName() {
    alert(this.name)
  }
  static getInstance(name) {
    if (!this.instance) {
      this.instance = new Singleton(name)
    }
    return this.instance
  }
}
const ins = new Singleton('hhhh')
const instanceA = Singleton.getInstance('seven1')
const instanceB = Singleton.getInstance('seven2')
//闭包包装实例：
const SingletonP = (function() {
  let instance
  return class Singleton {

    constructor(name) {
      if (instance) {
        return instance
      } else {
        this.init(name)
        instance = this
        return this
      }
    }

    init(name) {
      this.name = name
      console.log('已初始化')
    }
  }
})()

const instanceA = new SingletonP('seven1')
const instanceB = new SingletonP('seven2')
// ES5 iife
var SingletonTester = (function () {
    function Singleton(args) {
        var args = args || {};
        //设置name参数
        this.name = 'SingletonTester';
    }
    //实例容器
    var instance;
    return {
        name: 'SingletonTester',
        getInstance: function (args) {
            if (instance === undefined) {
                instance = new Singleton(args);
            }
            return instance;
        }
    };
})();

var singletonTest = SingletonTester.getInstance({ pointX: 5 });
console.log(singletonTest.pointX); // 输出 5 
// 构造函数的属性
function Universe() {
    if (typeof Universe.instance === 'object') {
        return Universe.instance;
    }
    this.start_time = 0;
    this.bang = &quot;Big&quot;;
    Universe.instance = this;
}
// 测试
var uni = new Universe();
var uni2 = new Universe();
console.log(uni === uni2); // true
// 重写构造函数
function Universe() {
    var instance = this;
    // 其它内容
    this.start_time = 0;
    this.bang = &quot;Big&quot;;
    // 重写构造函数
    Universe = function () {
        return instance;
    };
}
// 测试
var uni = new Universe();
var uni2 = new Universe();
uni.bang = &quot;123&quot;;
console.log(uni === uni2); // true
console.log(uni2.bang); // 123" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 类数实例：</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Singleton</span> </span>{
  <span class="hljs-keyword">constructor</span>(name) {
    <span class="hljs-keyword">this</span>.name = name
    <span class="hljs-keyword">this</span>.instance = <span class="hljs-literal">null</span>   <span class="hljs-comment">// </span>
  }
  getName() {
    alert(<span class="hljs-keyword">this</span>.name)
  }
  <span class="hljs-keyword">static</span> getInstance(name) {
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>.instance) {
      <span class="hljs-keyword">this</span>.instance = <span class="hljs-keyword">new</span> Singleton(name)
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.instance
  }
}
<span class="hljs-keyword">const</span> ins = <span class="hljs-keyword">new</span> Singleton(<span class="hljs-string">'hhhh'</span>)
<span class="hljs-keyword">const</span> instanceA = Singleton.getInstance(<span class="hljs-string">'seven1'</span>)
<span class="hljs-keyword">const</span> instanceB = Singleton.getInstance(<span class="hljs-string">'seven2'</span>)
<span class="hljs-comment">//闭包包装实例：</span>
<span class="hljs-keyword">const</span> SingletonP = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">let</span> instance
  <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Singleton</span> </span>{

    <span class="hljs-keyword">constructor</span>(name) {
      <span class="hljs-keyword">if</span> (instance) {
        <span class="hljs-keyword">return</span> instance
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">this</span>.init(name)
        instance = <span class="hljs-keyword">this</span>
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>
      }
    }

    init(name) {
      <span class="hljs-keyword">this</span>.name = name
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'已初始化'</span>)
    }
  }
})()

<span class="hljs-keyword">const</span> instanceA = <span class="hljs-keyword">new</span> SingletonP(<span class="hljs-string">'seven1'</span>)
<span class="hljs-keyword">const</span> instanceB = <span class="hljs-keyword">new</span> SingletonP(<span class="hljs-string">'seven2'</span>)
<span class="hljs-comment">// ES5 iife</span>
<span class="hljs-keyword">var</span> SingletonTester = (<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Singleton</span>(<span class="hljs-params">args</span>) </span>{
        <span class="hljs-keyword">var</span> args = args || {};
        <span class="hljs-comment">//设置name参数</span>
        <span class="hljs-keyword">this</span>.name = <span class="hljs-string">'SingletonTester'</span>;
    }
    <span class="hljs-comment">//实例容器</span>
    <span class="hljs-keyword">var</span> instance;
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">name</span>: <span class="hljs-string">'SingletonTester'</span>,
        <span class="hljs-attr">getInstance</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">args</span>) </span>{
            <span class="hljs-keyword">if</span> (instance === <span class="hljs-literal">undefined</span>) {
                instance = <span class="hljs-keyword">new</span> Singleton(args);
            }
            <span class="hljs-keyword">return</span> instance;
        }
    };
})();

<span class="hljs-keyword">var</span> singletonTest = SingletonTester.getInstance({ <span class="hljs-attr">pointX</span>: <span class="hljs-number">5</span> });
<span class="hljs-built_in">console</span>.log(singletonTest.pointX); <span class="hljs-comment">// 输出 5 </span>
<span class="hljs-comment">// 构造函数的属性</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Universe</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> Universe.instance === <span class="hljs-string">'object'</span>) {
        <span class="hljs-keyword">return</span> Universe.instance;
    }
    <span class="hljs-keyword">this</span>.start_time = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">this</span>.bang = <span class="hljs-string">"Big"</span>;
    Universe.instance = <span class="hljs-keyword">this</span>;
}
<span class="hljs-comment">// 测试</span>
<span class="hljs-keyword">var</span> uni = <span class="hljs-keyword">new</span> Universe();
<span class="hljs-keyword">var</span> uni2 = <span class="hljs-keyword">new</span> Universe();
<span class="hljs-built_in">console</span>.log(uni === uni2); <span class="hljs-comment">// true</span>
<span class="hljs-comment">// 重写构造函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Universe</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> instance = <span class="hljs-keyword">this</span>;
    <span class="hljs-comment">// 其它内容</span>
    <span class="hljs-keyword">this</span>.start_time = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">this</span>.bang = <span class="hljs-string">"Big"</span>;
    <span class="hljs-comment">// 重写构造函数</span>
    Universe = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> instance;
    };
}
<span class="hljs-comment">// 测试</span>
<span class="hljs-keyword">var</span> uni = <span class="hljs-keyword">new</span> Universe();
<span class="hljs-keyword">var</span> uni2 = <span class="hljs-keyword">new</span> Universe();
uni.bang = <span class="hljs-string">"123"</span>;
<span class="hljs-built_in">console</span>.log(uni === uni2); <span class="hljs-comment">// true</span>
<span class="hljs-built_in">console</span>.log(uni2.bang); <span class="hljs-comment">// 123</span></code></pre>
<h3 id="articleHeader5">工厂模式 Factory Pattern:</h3>
<blockquote><p>工厂模式定义一个用于创建对象的接口，这个接口由子类决定实例化哪一个类。该模式使一个类的实例化延迟到了子类。而子类可以重写接口方法以便创建的时候指定自己的对象类型。</p></blockquote>
<p>简单说：假如我们想在网页面里插入一些元素，而这些元素类型不固定，可能是图片、链接、文本，根据工厂模式的定义，在工厂模式下，工厂函数只需接受我们要创建的元素的类型，其他的工厂函数帮我们处理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 文本工厂
class Text {
    constructor(text) {
        this.text = text
    }
    insert(where) {
        const txt = document.createTextNode(this.text)
        where.appendChild(txt)
    }
}

// 链接工厂
class Link {
    constructor(url) {
        this.url = url
    }
    insert(where) {
        const link = document.createElement('a')
        link.href = this.url
        link.appendChild(document.createTextNode(this.url))
        where.appendChild(link)
    }
}

// 图片工厂
class Image {
    constructor(url) {
        this.url = url
    }
    insert(where) {
        const img = document.createElement('img')
        img.src = this.url
        where.appendChild(img)
    }
}

// DOM工厂
class DomFactory {

  constructor(type) {
    return new (this[type]())
  }

  // 各流水线
  link() { return Link }
  text() { return Text }
  image() { return Image }
}

// 创建工厂
const linkFactory = new DomFactory('link')
const textFactory = new DomFactory('text')

linkFactory.url = 'https://surmon.me'
linkFactory.insert(document.body)

textFactory.text = 'HI! I am surmon.'
textFactory.insert(document.body)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// 文本工厂</span>
<span class="hljs-keyword">class</span> Text {
    <span class="hljs-keyword">constructor</span>(<span class="hljs-params">text</span>) {
        <span class="hljs-keyword">this</span>.text = text
    }
    insert(where) {
        <span class="hljs-keyword">const</span> txt = <span class="hljs-built_in">document</span>.createTextNode(<span class="hljs-keyword">this</span>.text)
        where.appendChild(txt)
    }
}

<span class="hljs-comment">// 链接工厂</span>
<span class="hljs-keyword">class</span> Link {
    <span class="hljs-keyword">constructor</span>(<span class="hljs-params">url</span>) {
        <span class="hljs-keyword">this</span>.url = url
    }
    insert(where) {
        <span class="hljs-keyword">const</span> link = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'a'</span>)
        link.href = <span class="hljs-keyword">this</span>.url
        link.appendChild(<span class="hljs-built_in">document</span>.createTextNode(<span class="hljs-keyword">this</span>.url))
        where.appendChild(link)
    }
}

<span class="hljs-comment">// 图片工厂</span>
<span class="hljs-keyword">class</span> Image {
    <span class="hljs-keyword">constructor</span>(<span class="hljs-params">url</span>) {
        <span class="hljs-keyword">this</span>.url = url
    }
    insert(where) {
        <span class="hljs-keyword">const</span> img = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'img'</span>)
        img.src = <span class="hljs-keyword">this</span>.url
        where.appendChild(img)
    }
}

<span class="hljs-comment">// DOM工厂</span>
<span class="hljs-keyword">class</span> DomFactory {

  <span class="hljs-keyword">constructor</span>(<span class="hljs-params"><span class="hljs-keyword">type</span></span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> (<span class="hljs-keyword">this</span>[<span class="hljs-keyword">type</span>]())
  }

  <span class="hljs-comment">// 各流水线</span>
  link() { <span class="hljs-keyword">return</span> Link }
  text() { <span class="hljs-keyword">return</span> Text }
  image() { <span class="hljs-keyword">return</span> Image }
}

<span class="hljs-comment">// 创建工厂</span>
<span class="hljs-keyword">const</span> linkFactory = <span class="hljs-keyword">new</span> DomFactory(<span class="hljs-string">'link'</span>)
<span class="hljs-keyword">const</span> textFactory = <span class="hljs-keyword">new</span> DomFactory(<span class="hljs-string">'text'</span>)

linkFactory.url = <span class="hljs-string">'https://surmon.me'</span>
linkFactory.insert(<span class="hljs-built_in">document</span>.body)

textFactory.text = <span class="hljs-string">'HI! I am surmon.'</span>
textFactory.insert(<span class="hljs-built_in">document</span>.body)</code></pre>
<h3 id="articleHeader6">装饰者模式 Decorative Pattern:</h3>
<blockquote><p>装饰者(decorator)模式能够在不改变对象自身的基础上，在程序运行期间给对像动态的添加职责（方法或属性）。与继承相比，装饰者是一种更轻便灵活的做法。</p></blockquote>
<p>简单说：可以动态的给某个对象添加额外的职责，而不会影响从这个类中派生的其它对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ES7装饰器
function isAnimal(target) {
    target.isAnimal = true
    return target
}

// 装饰器
@isAnimal
class Cat {
    // ...
}
console.log(Cat.isAnimal)    // true



作用于类属性的装饰器：

function readonly(target, name, descriptor) {
    discriptor.writable = false
    return discriptor
}

class Cat {
    @readonly
    say() {
        console.log(&quot;meow ~&quot;)
    }
}

var kitty = new Cat()
kitty.say = function() {
    console.log(&quot;woof !&quot;)
}
kitty.say()    // meow ~" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>ES7装饰器
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isAnimal</span>(<span class="hljs-params">target</span>) </span>{
    target.isAnimal = <span class="hljs-literal">true</span>
    <span class="hljs-keyword">return</span> target
}

<span class="hljs-comment">// 装饰器</span>
@isAnimal
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Cat</span> </span>{
    <span class="hljs-comment">// ...</span>
}
<span class="hljs-built_in">console</span>.log(Cat.isAnimal)    <span class="hljs-comment">// true</span>



作用于类属性的装饰器：

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">readonly</span>(<span class="hljs-params">target, name, descriptor</span>) </span>{
    discriptor.writable = <span class="hljs-literal">false</span>
    <span class="hljs-keyword">return</span> discriptor
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Cat</span> </span>{
    @readonly
    say() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"meow ~"</span>)
    }
}

<span class="hljs-keyword">var</span> kitty = <span class="hljs-keyword">new</span> Cat()
kitty.say = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"woof !"</span>)
}
kitty.say()    <span class="hljs-comment">// meow ~</span></code></pre>
<p>参考:<br><a href="http://www.cnblogs.com/TomXu/archive/2011/12/15/2288411.html" rel="nofollow noreferrer" target="_blank">输入理解js系列</a><br><a href="https://surmon.me/article/55" rel="nofollow noreferrer" target="_blank">来自ES6入门实践</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[面试专题]JS设计模式

## 原文链接
[https://segmentfault.com/a/1190000010914032](https://segmentfault.com/a/1190000010914032)

