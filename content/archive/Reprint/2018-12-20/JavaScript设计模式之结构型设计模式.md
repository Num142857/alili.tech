---
title: 'JavaScript设计模式之结构型设计模式' 
date: 2018-12-20 2:30:10
hidden: true
slug: ykduof3gh7d
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>github 全文地址 ： <a href="https://github.com/Nealyang/YOU-SHOULD-KNOW-JS" rel="nofollow noreferrer" target="_blank">YOU-SHOULD-KNOW-JS</a>
</blockquote>
<h2 id="articleHeader0">JavaScript设计模式之外观模式</h2>
<h3 id="articleHeader1">概念</h3>
<p>外观模式：为一组复杂子系统接口提供一个更高级的统一接口，通过这个接口使得对子系统访问更加的容易。</p>
<h3 id="articleHeader2">代码演示</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 使用外观模式注册事件监听
function addEvent(dom,type,fn) {
  if(dom.addEventListener){
      dom.addEventListener(type,fn,false);
  }else if(dom.attachEvent){
      dom.attachEvent('on'+type,fn);
  }else{
      dom['on'+type] = fn;
  }
}
// 使用外观模式获取事件对象

var getEvent = function(event) {
  return event || window.event;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">// 使用外观模式注册事件监听</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addEvent</span>(<span class="hljs-params">dom,<span class="hljs-keyword">type</span>,fn</span>) </span>{
  <span class="hljs-keyword">if</span>(dom.addEventListener){
      dom.addEventListener(<span class="hljs-keyword">type</span>,fn,<span class="hljs-literal">false</span>);
  }<span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span>(dom.attachEvent){
      dom.attachEvent(<span class="hljs-string">'on'</span>+<span class="hljs-keyword">type</span>,fn);
  }<span class="hljs-keyword">else</span>{
      dom[<span class="hljs-string">'on'</span>+<span class="hljs-keyword">type</span>] = fn;
  }
}
<span class="hljs-comment">// 使用外观模式获取事件对象</span>

<span class="hljs-keyword">var</span> getEvent = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">event</span>) </span>{
  <span class="hljs-keyword">return</span> event || <span class="hljs-built_in">window</span>.event;
}</code></pre>
<p>通过对接口的二次封装，使其简单易用，隐藏起内部的复杂度，外观模式就是对接口的外层包装，以供上层代码调用。因此外观模式封装的接口方法不需要接口的具体实现，只需要按照接口的使用规则使用即可</p>
<h2 id="articleHeader3">JavaScript设计模式之适配器模式</h2>
<h3 id="articleHeader4">概念</h3>
<p>适配器模式：将一个类的接口转换为另外一个类的接口以满足用户的需求，使类之间的接口不兼容问题通过适配器得以解决。</p>
<h3 id="articleHeader5">代码演示</h3>
<p>书中这里说的比价没意思，这里我拿汤姆大叔的例子来说下</p>
<p>我们来举一个例子，鸭子（Dock）有飞（fly）和嘎嘎叫（quack）的行为，而火鸡虽然也有飞（fly）的行为，但是其叫声是咯咯的（gobble）。如果你非要火鸡也要实现嘎嘎叫（quack）这个动作，那我们可以复用鸭子的quack方法，但是具体的叫还应该是咯咯的，此时，我们就可以创建一个火鸡的适配器，以便让火鸡也支持quack方法，其内部还是要调用gobble。</p>
<p>首先要先定义鸭子和火鸡的抽象行为，也就是各自的方法函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//鸭子
var Duck = function(){

};
Duck.prototype.fly = function(){
throw new Error(&quot;该方法必须被重写!&quot;);
};
Duck.prototype.quack = function(){
throw new Error(&quot;该方法必须被重写!&quot;);
}

//火鸡
var Turkey = function(){

};
Turkey.prototype.fly = function(){
    throw new Error(&quot; 该方法必须被重写 !&quot;);
};
Turkey.prototype.gobble = function(){
    throw new Error(&quot; 该方法必须被重写 !&quot;);
};


//鸭子
var MallardDuck = function () {
    Duck.apply(this);
};
MallardDuck.prototype = new Duck(); //原型是Duck
MallardDuck.prototype.fly = function () {
    console.log(&quot;可以飞翔很长的距离!&quot;);
};
MallardDuck.prototype.quack = function () {
    console.log(&quot;嘎嘎！嘎嘎！&quot;);
};

//火鸡
var WildTurkey = function () {
    Turkey.apply(this);
};
WildTurkey.prototype = new Turkey(); //原型是Turkey
WildTurkey.prototype.fly = function () {
    console.log(&quot;飞翔的距离貌似有点短!&quot;);
};
WildTurkey.prototype.gobble = function () {
    console.log(&quot;咯咯！咯咯！&quot;);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//鸭子</span>
<span class="hljs-keyword">var</span> Duck = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{

};
Duck.prototype.fly = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
<span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">"该方法必须被重写!"</span>);
};
Duck.prototype.quack = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
<span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">"该方法必须被重写!"</span>);
}

<span class="hljs-comment">//火鸡</span>
<span class="hljs-keyword">var</span> Turkey = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{

};
Turkey.prototype.fly = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">" 该方法必须被重写 !"</span>);
};
Turkey.prototype.gobble = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">" 该方法必须被重写 !"</span>);
};


<span class="hljs-comment">//鸭子</span>
<span class="hljs-keyword">var</span> MallardDuck = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    Duck.apply(<span class="hljs-keyword">this</span>);
};
MallardDuck.prototype = <span class="hljs-keyword">new</span> Duck(); <span class="hljs-comment">//原型是Duck</span>
MallardDuck.prototype.fly = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"可以飞翔很长的距离!"</span>);
};
MallardDuck.prototype.quack = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"嘎嘎！嘎嘎！"</span>);
};

<span class="hljs-comment">//火鸡</span>
<span class="hljs-keyword">var</span> WildTurkey = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    Turkey.apply(<span class="hljs-keyword">this</span>);
};
WildTurkey.prototype = <span class="hljs-keyword">new</span> Turkey(); <span class="hljs-comment">//原型是Turkey</span>
WildTurkey.prototype.fly = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"飞翔的距离貌似有点短!"</span>);
};
WildTurkey.prototype.gobble = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"咯咯！咯咯！"</span>);
};</code></pre>
<p>为了让火鸡也支持quack方法，我们创建了一个新的火鸡适配器TurkeyAdapter：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var TurkeyAdapter = function(oTurkey){
    Duck.apply(this);
    this.oTurkey = oTurkey;
};
TurkeyAdapter.prototype = new Duck();
TurkeyAdapter.prototype.quack = function(){
    this.oTurkey.gobble();
};
TurkeyAdapter.prototype.fly = function(){
    var nFly = 0;
    var nLenFly = 5;
    for(; nFly < nLenFly;){
        this.oTurkey.fly();
        nFly = nFly + 1;
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> TurkeyAdapter = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(oTurkey)</span></span>{
    Duck.apply(<span class="hljs-keyword">this</span>);
    <span class="hljs-keyword">this</span>.oTurkey = oTurkey;
};
TurkeyAdapter.prototype = <span class="hljs-keyword">new</span> Duck();
TurkeyAdapter.prototype.quack = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">this</span>.oTurkey.gobble();
};
TurkeyAdapter.prototype.fly = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
    <span class="hljs-keyword">var</span> nFly = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">var</span> nLenFly = <span class="hljs-number">5</span>;
    <span class="hljs-keyword">for</span>(; nFly &lt; nLenFly;){
        <span class="hljs-keyword">this</span>.oTurkey.fly();
        nFly = nFly + <span class="hljs-number">1</span>;
    }
};</code></pre>
<p>该构造函数接受一个火鸡的实例对象，然后使用Duck进行apply，其适配器原型是Duck，然后要重新修改其原型的quack方法，以便内部调用oTurkey.gobble()方法。其fly方法也做了一些改变，让火鸡连续飞5次（内部也是调用自身的oTurkey.fly()方法）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var oMallardDuck = new MallardDuck();
    var oWildTurkey = new WildTurkey();
    var oTurkeyAdapter = new TurkeyAdapter(oWildTurkey);
    
    //原有的鸭子行为
    oMallardDuck.fly();
    oMallardDuck.quack();
    
    //原有的火鸡行为
    oWildTurkey.fly();
    oWildTurkey.gobble();
    
    //适配器火鸡的行为（火鸡调用鸭子的方法名称）
    oTurkeyAdapter.fly();
    oTurkeyAdapter.quack();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pony"><code>    <span class="hljs-keyword">var</span> oMallardDuck = <span class="hljs-function"><span class="hljs-keyword">new</span> <span class="hljs-title">MallardDuck</span>();
    <span class="hljs-title">var</span> <span class="hljs-title">oWildTurkey</span> = <span class="hljs-title">new</span> <span class="hljs-title">WildTurkey</span>();
    <span class="hljs-title">var</span> <span class="hljs-title">oTurkeyAdapter</span> = <span class="hljs-title">new</span> <span class="hljs-title">TurkeyAdapter</span>(oWildTurkey);
    
    <span class="hljs-comment">//原有的鸭子行为</span>
    <span class="hljs-title">oMallardDuck</span>.<span class="hljs-title">fly</span>();
    <span class="hljs-title">oMallardDuck</span>.<span class="hljs-title">quack</span>();
    
    <span class="hljs-comment">//原有的火鸡行为</span>
    <span class="hljs-title">oWildTurkey</span>.<span class="hljs-title">fly</span>();
    <span class="hljs-title">oWildTurkey</span>.<span class="hljs-title">gobble</span>();
    
    <span class="hljs-comment">//适配器火鸡的行为（火鸡调用鸭子的方法名称）</span>
    <span class="hljs-title">oTurkeyAdapter</span>.<span class="hljs-title">fly</span>();
    <span class="hljs-title">oTurkeyAdapter</span>.<span class="hljs-title">quack</span>();</span></code></pre>
<h2 id="articleHeader6">JavaScript设计模式之代理模式</h2>
<h3 id="articleHeader7">概念</h3>
<p>代理模式：由于一个对象不能直接引用另一个对象，所以需要代理对象在这两个对象之间起到中介的作用</p>
<h3 id="articleHeader8">代码演示</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 先声明美女对象
var girl = function (name) {
    this.name = name;
};

// 这是dudu
var dudu = function (girl) {
    this.girl = girl;
    this.sendGift = function (gift) {
        alert(&quot;Hi &quot; + girl.name + &quot;, dudu送你一个礼物：&quot; + gift);
    }
};

// 大叔是代理
var proxyTom = function (girl) {
    this.girl = girl;
    this.sendGift = function (gift) {
        (new dudu(girl)).sendGift(gift); // 替dudu送花咯
    }
};

var proxy = new proxyTom(new girl(&quot;酸奶小妹&quot;));
proxy.sendGift(&quot;999朵玫瑰&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// 先声明美女对象</span>
<span class="hljs-keyword">var</span> girl = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(name)</span> </span>{
    <span class="hljs-keyword">this</span>.name = name;
};

<span class="hljs-comment">// 这是dudu</span>
<span class="hljs-keyword">var</span> dudu = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(girl)</span> </span>{
    <span class="hljs-keyword">this</span>.girl = girl;
    <span class="hljs-keyword">this</span>.sendGift = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(gift)</span> </span>{
        alert(<span class="hljs-string">"Hi "</span> + girl.name + <span class="hljs-string">", dudu送你一个礼物："</span> + gift);
    }
};

<span class="hljs-comment">// 大叔是代理</span>
<span class="hljs-keyword">var</span> proxyTom = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(girl)</span> </span>{
    <span class="hljs-keyword">this</span>.girl = girl;
    <span class="hljs-keyword">this</span>.sendGift = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(gift)</span> </span>{
        (<span class="hljs-keyword">new</span> dudu(girl)).sendGift(gift); <span class="hljs-comment">// 替dudu送花咯</span>
    }
};

<span class="hljs-keyword">var</span> proxy = <span class="hljs-keyword">new</span> proxyTom(<span class="hljs-keyword">new</span> girl(<span class="hljs-string">"酸奶小妹"</span>));
proxy.sendGift(<span class="hljs-string">"999朵玫瑰"</span>);</code></pre>
<p>假如dudu要送酸奶小妹玫瑰花，却不知道她的联系方式或者不好意思，想委托大叔去送这些玫瑰，那大叔就是个代理</p>
<p>其实在日常开发中，我们遇到很多这种情况，比如跨域，之前总结过跨域的所有东西，其中的jsonp，window.name还是location.hash都是通过代理模式来实现的。</p>
<p>代理模式具体的从我的另一篇文章，JavaScript中的跨域总结去体会哈</p>
<h2 id="articleHeader9">JavaScript设计模式之装饰着模式</h2>
<h3 id="articleHeader10">概念</h3>
<p>装饰着模式，在不改变源对象的基础上，通过对其进行包装拓展使原有对象可以满足用户的更复杂需求</p>
<h3 id="articleHeader11">代码演示</h3>
<p>这里我拿给输入框添加事件举例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var decorator = function(input ,fn) {
  //获取时间源
  var input = document.getElementById(input);
  if(typeof input.onclick === 'function'){
      //缓存事件源原有的回调函数
      var oldClickFn = input.onclick;
      input.onclick = function (ev) { 
          oldClickFn();
          fn();
       }
  }else{
      input.onclick = fn;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs verilog"><code><span class="hljs-keyword">var</span> decorator = <span class="hljs-keyword">function</span>(<span class="hljs-keyword">input</span> ,fn) {
  <span class="hljs-comment">//获取时间源</span>
  <span class="hljs-keyword">var</span> <span class="hljs-keyword">input</span> = document<span class="hljs-variable">.getElementById</span>(<span class="hljs-keyword">input</span>);
  <span class="hljs-keyword">if</span>(typeof <span class="hljs-keyword">input</span><span class="hljs-variable">.onclick</span> === '<span class="hljs-keyword">function</span>'){
      <span class="hljs-comment">//缓存事件源原有的回调函数</span>
      <span class="hljs-keyword">var</span> oldClickFn = <span class="hljs-keyword">input</span><span class="hljs-variable">.onclick</span>;
      <span class="hljs-keyword">input</span><span class="hljs-variable">.onclick</span> = <span class="hljs-keyword">function</span> (ev) { 
          oldClickFn();
          fn();
       }
  }<span class="hljs-keyword">else</span>{
      <span class="hljs-keyword">input</span><span class="hljs-variable">.onclick</span> = fn;
  }
}</code></pre>
<p>装饰着模式很简单，就是对原有对象的属性和方法的添加。相比于之前说的适配器模式是对原有对象的适配，添加的方法和原有的方法功能上大致相似。但是装饰着提供的方法和原有方法功能项则有一定的区别，且不需要去了解原有对象的功能。只要原封不动的去使用就行。不需要知道具体的实现细节。</p>
<h2 id="articleHeader12">JavaScript设计模式之桥接模式</h2>
<h3 id="articleHeader13">概念</h3>
<p>桥接模式：在系统沿着多个维度变化的时候，不增加起复杂度已达到解耦的目的</p>
<h3 id="articleHeader14">应用场景</h3>
<p>在我们日常开发中，需要对相同的逻辑做抽象的处理。桥接模式就是为了解决这类的需求。</p>
<p>桥接模式最主要的特点就是将实现层和抽象层解耦分离，是两部分可以独立变化</p>
<p>比如我们写一个跑步游戏，对于游戏中的人和精灵都是动作单元。而他们的动作也是非常的统一。比如人和精灵和球运动都是x，y坐标的改变，球的颜色和精灵的颜色绘制方式也非常的类似。<br>我们就可以将这些方法给抽象出来。</p>
<h3 id="articleHeader15">代码演示</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//运动单元
function Speed(x,y) {
  this.x = x;
  this.y = y;
}
Speed.prototype.run = function() {
  console.log('动起来');
}
// 着色单元
function Color(cl) {
  this.color = cl;
}
Color.prototype.draw = function() {
  console.log('绘制色彩')
}

// 变形单元
function Shape(ap) {
  this.shape = ap;
}
Shape.prototype.change = function() {
  console.log('改变形状');
}
//说话单元
function Speak(wd) {
  this.word = wd;
}
Speak.prototype.say = function() {
  console.log('请开始你的表演')
}


//创建球类，并且它可以运动可以着色
function Ball(x,y,c) {
  this.speed = new Speed(x,y);
  this.color = new Color(c);
}
Ball.prototype.init = function() {
  //实现运动和着色
  this.speed.run();
  this.color.draw();
}

function People(x,y,f) {
  this.speed = new Speed(x,y);
  this.speak = new Speak(f);
}

People.prototype.init = function() {
  this.speed.run();
  this.speak.say();
}
//...


//当我们实例化一个人物对象的时候，他就可以有对应的方法实现了

var p =new People(10,12,'我是一个人');
p.init();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//运动单元</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Speed</span>(<span class="hljs-params">x,y</span>) </span>{
  <span class="hljs-keyword">this</span>.x = x;
  <span class="hljs-keyword">this</span>.y = y;
}
Speed.prototype.run = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'动起来'</span>);
}
<span class="hljs-comment">// 着色单元</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Color</span>(<span class="hljs-params">cl</span>) </span>{
  <span class="hljs-keyword">this</span>.color = cl;
}
Color.prototype.draw = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'绘制色彩'</span>)
}

<span class="hljs-comment">// 变形单元</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Shape</span>(<span class="hljs-params">ap</span>) </span>{
  <span class="hljs-keyword">this</span>.shape = ap;
}
Shape.prototype.change = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'改变形状'</span>);
}
<span class="hljs-comment">//说话单元</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Speak</span>(<span class="hljs-params">wd</span>) </span>{
  <span class="hljs-keyword">this</span>.word = wd;
}
Speak.prototype.say = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'请开始你的表演'</span>)
}


<span class="hljs-comment">//创建球类，并且它可以运动可以着色</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Ball</span>(<span class="hljs-params">x,y,c</span>) </span>{
  <span class="hljs-keyword">this</span>.speed = <span class="hljs-keyword">new</span> Speed(x,y);
  <span class="hljs-keyword">this</span>.color = <span class="hljs-keyword">new</span> Color(c);
}
Ball.prototype.init = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">//实现运动和着色</span>
  <span class="hljs-keyword">this</span>.speed.run();
  <span class="hljs-keyword">this</span>.color.draw();
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">People</span>(<span class="hljs-params">x,y,f</span>) </span>{
  <span class="hljs-keyword">this</span>.speed = <span class="hljs-keyword">new</span> Speed(x,y);
  <span class="hljs-keyword">this</span>.speak = <span class="hljs-keyword">new</span> Speak(f);
}

People.prototype.init = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.speed.run();
  <span class="hljs-keyword">this</span>.speak.say();
}
<span class="hljs-comment">//...</span>


<span class="hljs-comment">//当我们实例化一个人物对象的时候，他就可以有对应的方法实现了</span>

<span class="hljs-keyword">var</span> p =<span class="hljs-keyword">new</span> People(<span class="hljs-number">10</span>,<span class="hljs-number">12</span>,<span class="hljs-string">'我是一个人'</span>);
p.init();</code></pre>
<h2 id="articleHeader16">JavaScript设计模式之组合模式</h2>
<h3 id="articleHeader17">概念</h3>
<p>组合模式：又称部分-整体模式，将对象组合成树形结构以表示成“部分整体”的层次结构。组合模式使得用户对单个对象以及组合对象的使用具有一致性</p>
<h3 id="articleHeader18">使用场景</h3>
<p>我们平时开发过程中，一定会遇到这种情况：同时处理简单对象和由简单对象组成的复杂对象，这些简单对象和复杂对象会组合成树形结构，在客户端对其处理的时候要保持一致性。比如电商网站中的产品订单，每一张产品订单可能有多个子订单组合，比如操作系统的文件夹，每个文件夹有多个子文件夹或文件，我们作为用户对其进行复制，删除等操作时，不管是文件夹还是文件，对我们操作者来说是一样的。在这种场景下，就非常适合使用组合模式来实现。</p>
<p>组合模式主要有三个角色：</p>
<p>（1）抽象组件（Component）：抽象类，主要定义了参与组合的对象的公共接口</p>
<p>（2）子对象（Leaf）：组成组合对象的最基本对象</p>
<p>（3）组合对象（Composite）：由子对象组合起来的复杂对象</p>
<p>理解组合模式的关键是要理解组合模式对单个对象和组合对象使用的一致性，我们接下来说说组合模式的实现加深理解。</p>
<h3 id="articleHeader19">代码演示</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 抽象一个虚拟父类
var News = function() {
  this.children = [];
  this.element = null;
}

News.prototype = {
    init:function() {
      throw new Error('请重写你的方法');
    },
    add:function() {
              throw new Error('请重写你的方法');
            },
    getElement:function() {
                    throw new Error('请重写你的方法');
                  },
}

function iniheritObject(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

function inheritPrototype(subClass,superClass) {
  var p = iniheritObject(superClass.prototype);
  p.constructor = subClass;
  subClass.prototype = p;
}
//容器类
var Container = function(id,parent) {
  News.call(this);
  this.id = id;
  this.parent = parent;
  this.init();
}

//寄生式继承父类原型方法
inheritPrototype(Container,News);

Container.prototype.init = function() {
  this.element = document.createElement('ul');
  this.element.id = this.id;
  this.element.className = 'new-container';
}

Container.prototype.add = function(child) {
  this.children.push(child);
  this.element.appendChild(child.getElement());
  return this;
}

Container.prototype.getElement = function() {
  return this.element;
}

Container.prototype.show = function() {
  this.parent.appendChild(this.element)
}
//同样下一层极的行成员集合类以及后面新闻组合体类
var Item = function(classname) {
  News.call(this);
  this.classname = classname;
  this.init();
}
inheritPrototype(Item,News);
Item.prototype.init = function() {
  this.element = document.createElement('li');
  this.element.className = this.classname;
}
Item.prototype.add = function(child) {
  this.children.push(child);
  this.element.appendChild(child.getElement());
  return this;
}
Item.prototype.getElement = function() {
  return this.element;
}

var NewsGroup = function(className) {
  News.call(this);
  this.classname = classname|| '';
  this.init();
}
inheritPrototype(NewsGroup,News);
NewsGroup.prototype.init = function() {
  this.element = document.createElement('div');
  this.element.className = this.classname;
}
NewsGroup.prototype.add = function(child) {
  this.children.push(child);
  this.element.appendChild(child.getElement());
  return this;
}
NewsGroup.prototype.getElement = function() {
  return this.element;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 抽象一个虚拟父类</span>
<span class="hljs-keyword">var</span> News = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.children = [];
  <span class="hljs-keyword">this</span>.element = <span class="hljs-literal">null</span>;
}

News.prototype = {
    <span class="hljs-attr">init</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'请重写你的方法'</span>);
    },
    <span class="hljs-attr">add</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
              <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'请重写你的方法'</span>);
            },
    <span class="hljs-attr">getElement</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(<span class="hljs-string">'请重写你的方法'</span>);
                  },
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">iniheritObject</span>(<span class="hljs-params">o</span>) </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">F</span>(<span class="hljs-params"></span>) </span>{}
  F.prototype = o;
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> F();
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">inheritPrototype</span>(<span class="hljs-params">subClass,superClass</span>) </span>{
  <span class="hljs-keyword">var</span> p = iniheritObject(superClass.prototype);
  p.constructor = subClass;
  subClass.prototype = p;
}
<span class="hljs-comment">//容器类</span>
<span class="hljs-keyword">var</span> Container = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">id,parent</span>) </span>{
  News.call(<span class="hljs-keyword">this</span>);
  <span class="hljs-keyword">this</span>.id = id;
  <span class="hljs-keyword">this</span>.parent = parent;
  <span class="hljs-keyword">this</span>.init();
}

<span class="hljs-comment">//寄生式继承父类原型方法</span>
inheritPrototype(Container,News);

Container.prototype.init = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.element = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'ul'</span>);
  <span class="hljs-keyword">this</span>.element.id = <span class="hljs-keyword">this</span>.id;
  <span class="hljs-keyword">this</span>.element.className = <span class="hljs-string">'new-container'</span>;
}

Container.prototype.add = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">child</span>) </span>{
  <span class="hljs-keyword">this</span>.children.push(child);
  <span class="hljs-keyword">this</span>.element.appendChild(child.getElement());
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
}

Container.prototype.getElement = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.element;
}

Container.prototype.show = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.parent.appendChild(<span class="hljs-keyword">this</span>.element)
}
<span class="hljs-comment">//同样下一层极的行成员集合类以及后面新闻组合体类</span>
<span class="hljs-keyword">var</span> Item = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">classname</span>) </span>{
  News.call(<span class="hljs-keyword">this</span>);
  <span class="hljs-keyword">this</span>.classname = classname;
  <span class="hljs-keyword">this</span>.init();
}
inheritPrototype(Item,News);
Item.prototype.init = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.element = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'li'</span>);
  <span class="hljs-keyword">this</span>.element.className = <span class="hljs-keyword">this</span>.classname;
}
Item.prototype.add = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">child</span>) </span>{
  <span class="hljs-keyword">this</span>.children.push(child);
  <span class="hljs-keyword">this</span>.element.appendChild(child.getElement());
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
}
Item.prototype.getElement = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.element;
}

<span class="hljs-keyword">var</span> NewsGroup = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">className</span>) </span>{
  News.call(<span class="hljs-keyword">this</span>);
  <span class="hljs-keyword">this</span>.classname = classname|| <span class="hljs-string">''</span>;
  <span class="hljs-keyword">this</span>.init();
}
inheritPrototype(NewsGroup,News);
NewsGroup.prototype.init = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">this</span>.element = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>);
  <span class="hljs-keyword">this</span>.element.className = <span class="hljs-keyword">this</span>.classname;
}
NewsGroup.prototype.add = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">child</span>) </span>{
  <span class="hljs-keyword">this</span>.children.push(child);
  <span class="hljs-keyword">this</span>.element.appendChild(child.getElement());
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>;
}
NewsGroup.prototype.getElement = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.element;
}
</code></pre>
<p>所以后面我们在使用的时候，创建新闻类，利用之前定义的组合元素去组合就可以了。</p>
<h2 id="articleHeader20">JavaScript设计模式之享元模式</h2>
<h3 id="articleHeader21">概念</h3>
<p>享元模式：运用共享技术有效的支持大量细粒度对象，避免对象之间拥有相同内容造成的不必要开销</p>
<p>主要用来优化程序的性能，适合解决大量类似的对象产生的性能问题。享元模式通过分析应用程序的对象，将其解析为内在数据和外在数据，减少对象数量，从而提高程序的性能。</p>
<h3 id="articleHeader22">基础知识</h3>
<p>享元模式通过共享大量的细粒度的对象，减少对象的数量，从而减少对象的内存，提高应用程序的性能。其基本思想就是分解现有类似对象的组成，将其展开为可以共享的内在数据和不可共享的外在数据，我们称内在数据的对象为享元对象。通常还需要一个工厂类来维护内在数据。</p>
<p>在JS中，享元模式主要有下面几个角色组成：</p>
<ul>
<li>客户端：用来调用享元工厂来获取内在数据的类，通常是应用程序所需的对象</li>
<li>享元工厂：用来维护享元数据的类</li>
<li>享元类：保持内在数据的类</li>
</ul>
<h3 id="articleHeader23">基本实现</h3>
<p>我们举个例子进行说明：苹果公司批量生产iphone，iphone的大部分数据比如型号，屏幕都是一样，少数部分数据比如内存有分16G,32G等。未使用享元模式前，我们写代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Iphone(model, screen, memory, SN) {
    this. model  = model;
    this.screen = screen;
    this.memory = memory;
    this.SN = SN;
}
var phones = [];
for (var i = 0; i < 1000000; i++) {
    var memory = i % 2 == 0 ? 16 : 32;
    phones.push(new Iphone(&quot;iphone6s&quot;, 5.0, memory, i));
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Iphone</span><span class="hljs-params">(model, screen, memory, SN)</span> </span>{
    <span class="hljs-keyword">this</span>. model  = model;
    <span class="hljs-keyword">this</span>.screen = screen;
    <span class="hljs-keyword">this</span>.memory = memory;
    <span class="hljs-keyword">this</span>.SN = SN;
}
<span class="hljs-keyword">var</span> phones = [];
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">1000000</span>; i++) {
    <span class="hljs-keyword">var</span> memory = i % <span class="hljs-number">2</span> == <span class="hljs-number">0</span> ? <span class="hljs-number">16</span> : <span class="hljs-number">32</span>;
    phones.push(<span class="hljs-keyword">new</span> Iphone(<span class="hljs-string">"iphone6s"</span>, <span class="hljs-number">5.0</span>, memory, i));
}
</code></pre>
<p>这段代码中，创建了一百万个iphone，每个iphone都独立申请一个内存。但是我们仔细观察可以看到，大部分iphone都是类似的，只是内存和序列号不一样，如果是一个对性能要求比较高的程序，我们就要考虑去优化它。<br> 大量相似对象的程序，我们就可以考虑用享元模式去优化它，我们分析出大部分的iphone的型号，屏幕，内存都是一样的，那这部分数据就可以公用，就是享元模式中的内在数据，定义享元类如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" function IphoneFlyweight(model, screen, memory) {
      this.model = model;
      this.screen = screen;
      this.memory = memory;
  }
  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">IphoneFlyweight</span><span class="hljs-params">(model, screen, memory)</span> </span>{
      <span class="hljs-keyword">this</span>.model = model;
      <span class="hljs-keyword">this</span>.screen = screen;
      <span class="hljs-keyword">this</span>.memory = memory;
  }
  </code></pre>
<p>我们定义了iphone的享元类，其中包含型号，屏幕和内存三个数据。我们还需要一个享元工厂来维护这些数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" var flyweightFactory = (function () {
     var iphones = {};
     return {
         get: function (model, screen, memory) {
             var key = model + screen + memory;
             if (!iphones[key]) {
                 iphones[key] = new IphoneFlyweight(model, screen, memory);
             }
             return iphones[key];
         }
     };
 })();
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code> <span class="hljs-keyword">var</span> flyweightFactory = (<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
     <span class="hljs-keyword">var</span> iphones = {};
     <span class="hljs-keyword">return</span> {
         <span class="hljs-keyword">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(model, screen, memory)</span> </span>{
             <span class="hljs-keyword">var</span> key = model + screen + memory;
             <span class="hljs-keyword">if</span> (!iphones[key]) {
                 iphones[key] = <span class="hljs-keyword">new</span> IphoneFlyweight(model, screen, memory);
             }
             <span class="hljs-keyword">return</span> iphones[key];
         }
     };
 })();
 </code></pre>
<p>在这个工厂中，我们定义了一个字典来保存享元对象，提供一个方法根据参数来获取享元对象，如果字典中有则直接返回，没有则创建一个返回。<br>接着我们创建一个客户端类，这个客户端类就是修改自iphone类：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" function Iphone(model, screen, memory, SN) {
     this.flyweight = flyweightFactory.get(model, screen, memory);
     this.SN = SN;
 }
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Iphone</span><span class="hljs-params">(model, screen, memory, SN)</span> </span>{
     <span class="hljs-keyword">this</span>.flyweight = flyweightFactory.get(model, screen, memory);
     <span class="hljs-keyword">this</span>.SN = SN;
 }
 </code></pre>
<p>然后我们依旧像之间那样生成多个iphone</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var phones = [];
for (var i = 0; i < 1000000; i++) {
    var memory = i % 2 == 0 ? 16 : 32;
    phones.push(new Iphone(&quot;iphone6s&quot;, 5.0, memory, i));
}
console.log(phones);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> phones = [];
<span class="hljs-keyword">for</span> (<span class="hljs-built_in">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">1000000</span>; i++) {
    <span class="hljs-built_in">var</span> memory = i <span class="hljs-symbol">%</span> <span class="hljs-number">2</span> == <span class="hljs-number">0</span> ? <span class="hljs-number">16</span> : <span class="hljs-number">32</span>;
    phones.<span class="hljs-built_in">push</span>(<span class="hljs-built_in">new</span> Iphone(<span class="hljs-string">"iphone6s"</span>, <span class="hljs-number">5.0</span>, memory, i));
}
console.<span class="hljs-built_in">log</span>(phones);
</code></pre>
<p>这里的关键就在于Iphone构造函数里面的this.flyweight = flyweightFactory.get(model, screen, memory)。这句代码通过享元工厂去获取享元数据，而在享元工厂里面，如果已经存在相同数据的对象则会直接返回对象，多个iphone对象共享这部分相同的数据，所以原本类似的数据已经大大减少，减少的内存的占用。</p>
<h3 id="articleHeader24">在DOM中的使用</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul class=&quot;menu&quot;>
    <li class=&quot;item&quot;>选项1</li>
    <li class=&quot;item&quot;>选项2</li>
    <li class=&quot;item&quot;>选项3</li>
    <li class=&quot;item&quot;>选项4</li>
    <li class=&quot;item&quot;>选项5</li>
    <li class=&quot;item&quot;>选项6</li>
</ul>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>&lt;ul <span class="hljs-keyword">class</span>=<span class="hljs-string">"menu"</span>&gt;
    &lt;<span class="hljs-keyword">li</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">"item"</span>&gt;选项1&lt;/<span class="hljs-keyword">li</span>&gt;
    &lt;<span class="hljs-keyword">li</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">"item"</span>&gt;选项2&lt;/<span class="hljs-keyword">li</span>&gt;
    &lt;<span class="hljs-keyword">li</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">"item"</span>&gt;选项3&lt;/<span class="hljs-keyword">li</span>&gt;
    &lt;<span class="hljs-keyword">li</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">"item"</span>&gt;选项4&lt;/<span class="hljs-keyword">li</span>&gt;
    &lt;<span class="hljs-keyword">li</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">"item"</span>&gt;选项5&lt;/<span class="hljs-keyword">li</span>&gt;
    &lt;<span class="hljs-keyword">li</span> <span class="hljs-keyword">class</span>=<span class="hljs-string">"item"</span>&gt;选项6&lt;/<span class="hljs-keyword">li</span>&gt;
&lt;/ul&gt;
</code></pre>
<p>点击菜单项，进行相应的操作，我们通过jQuery来绑定事件，一般会这么做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" $(&quot;.item&quot;).on(&quot;click&quot;, function () {
     console.log($(this).text());
 })
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> $(<span class="hljs-string">".item"</span>).on(<span class="hljs-string">"click"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
     <span class="hljs-built_in">console</span>.log($(<span class="hljs-keyword">this</span>).text());
 })
 </code></pre>
<p>给每个列表项绑定事件，点击输出相应的文本。这样看暂时没有什么问题，但是如果是一个很长的列表，尤其是在移动端特别长的列表时，就会有性能问题，因为每个项都绑定了事件，都占用了内存。但是这些事件处理程序其实都是很类似的，我们就要对其优化。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
 $(&quot;.menu&quot;).on(&quot;click&quot;, &quot;.item&quot;, function () {
     console.log($(this).text());
 })
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
 $(<span class="hljs-string">".menu"</span>).on(<span class="hljs-string">"click"</span>, <span class="hljs-string">".item"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
     <span class="hljs-built_in">console</span>.log($(<span class="hljs-keyword">this</span>).text());
 })
 </code></pre>
<p>通过这种方式进行事件绑定，可以减少事件处理程序的数量，这种方式叫做事件委托，也是运用了享元模式的原理。事件处理程序是公用的内在部分，每个菜单项各自的文本就是外在部分。我们简单说下事件委托的原理：点击菜单项，事件会从li元素冒泡到ul元素，我们绑定事件到ul上，实际上就绑定了一个事件，然后通过事件参数event里面的target来判断点击的具体是哪一个元素，比如低级第一个li元素，event.target就是li，这样就能拿到具体的点击元素了，就可以根据不同元素进行不同的处理。</p>
<blockquote>参考地址：<a href="http://luopq.com/2015/11/20/design-pattern-flyweight/" rel="nofollow noreferrer" target="_blank">http://luopq.com/2015/11/20/d...</a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript设计模式之结构型设计模式

## 原文链接
[https://segmentfault.com/a/1190000012585364](https://segmentfault.com/a/1190000012585364)

