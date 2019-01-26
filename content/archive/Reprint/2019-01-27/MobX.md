---
title: 'MobX' 
date: 2019-01-27 2:30:59
hidden: true
slug: 6csblq7hn08
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1. 介绍</h2>
<h3 id="articleHeader1">1.1. 原理</h3>
<p>React的render是 <em>状态</em> 转化为树状结构的渲染组件的方法  <br>而MobX提供了一种存储，更新 <em>状态</em> 的方法  <br>React 和 MobX都在优化着软件开发中相同的问题。  <br>React 使用的方法是让<strong>虚拟DOM</strong>来减少繁琐而沉重的DOM变化。  <br>而MobX则通过一个虚拟的<strong>状态依赖图表</strong>来让react组件和应用状态同步化来减少不必要的状态导致组件更新</p>
<h3 id="articleHeader2">1.2. 安装</h3>
<p>MobX：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install mobx --save
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>npm <span class="hljs-keyword">install</span> mobx <span class="hljs-comment">--save</span>
</code></pre>
<p>React bindings：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install mobx-react --save
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>npm <span class="hljs-keyword">install</span> mobx-react <span class="hljs-comment">--save</span>
</code></pre>
<h3 id="articleHeader3">1.3. 要点</h3>
<p>MobX看起来很复杂的样子，其实是用它只需要三步</p>
<ol><li><p>定义你的状态，让它们成为观察者(observable)<br>存储状态(Store state)可以是任何的数据结构，随你定义为：对象，数组，类，循环结构，引用都没所谓。但需要记住一点，就是：随着时间的变化，用MobX 去把它们定义成观察者(observable)</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {observable} from 'mobx'
let appState = observable({
    timer: 0
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> {observable} <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx'</span>
<span class="hljs-keyword">let</span> appState = observable({
    <span class="hljs-attr">timer</span>: <span class="hljs-number">0</span>
})</code></pre>
<ol><li><p>我们不需要让appState去观察什么。你现在就能创建视图(view)，每当appState的相关数据发生变化的时候，就会自动更新。MobX会采用最优的方式去更新你的视图。以下有一个例子来说明如何使用，其中使用了ES6／ES7的语法（当然MobX也是支持ES5），<strong><a href="http://es6.ruanyifeng.com/#docs/decorator" rel="nofollow noreferrer" target="_blank">代码中@的意义</a></strong></p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {observer} from 'mobx-react';
@observer
class TimerView extends React.Component {
    render() {
        return (<button onClick={this.onReset.bind(this)}>
                Seconds passed: {this.props.appState.timer}
            </button>);
    }
    onReset () {
        //appState.resetTimer会在下一节完成
        this.props.appState.resetTimer();
    }
};
React.render(<TimerView appState={appState} />, document.body);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> {observer} <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx-react'</span>;
@observer
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TimerView</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> (<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.onReset.bind(this)}</span>&gt;</span>
                Seconds passed: {this.props.appState.timer}
            <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>);
    }
    onReset () {
        <span class="hljs-comment">//appState.resetTimer会在下一节完成</span>
        <span class="hljs-keyword">this</span>.props.appState.resetTimer();
    }
};
React.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">TimerView</span> <span class="hljs-attr">appState</span>=<span class="hljs-string">{appState}</span> /&gt;</span>, document.body);</span></code></pre>
<ol><li><p>修改状态<br>第三节要说的是修改状态。MobX和其他框架不同，它不会要求你去做什么事情，它只是帮助你去做简单的事情</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="appState.resetTimer = action(function reset() {
    appState.timer = 0;
});
setInterval(action(function tick() {
    appState.timer += 1;
}), 1000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">appState.resetTimer = action(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reset</span>(<span class="hljs-params"></span>) </span>{
    appState.timer = <span class="hljs-number">0</span>;
});
setInterval(action(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">tick</span>(<span class="hljs-params"></span>) </span>{
    appState.timer += <span class="hljs-number">1</span>;
}), <span class="hljs-number">1000</span>);</code></pre>
<p>其中action包装用法只能在strict模式下使用，请记得在你的javascript文件头写上：'use strict'。</p>
<h2 id="articleHeader4">2. API</h2>
<p>从上面的例子可以看到，MobX的API其实不多：observable, computed, reactions, actions</p>
<h3 id="articleHeader5">2.1. observable(value)</h3>
<p>其中的value可以是JS原定的数据结构，引用，对象，数组，ES6的<a href="http://es6.ruanyifeng.com/#docs/set-map" rel="nofollow noreferrer" target="_blank">map</a></p>
<ol>
<li><p>如果value是一个map的话，则需要使用一个调节器（modifier）<strong>asMap</strong>来使用。这时候会返回一个<strong>Observable Map</strong></p></li>
<li><p>如果是一个数组，返回<strong>Observable Array</strong></p></li>
<li><p>如果是一个没有属性的对象，则返回一个<strong>Observable Object</strong></p></li>
<li><p>如果是一个有属性的对象，JS原有的数据结构，函数等，返回一个<strong> Boxed Observable</strong>。MobX不会自动让一个有属性的对象成为观察者。这是这个有属性的对象的构造函数应该做的事情，你可以使用extendObservable在它的构造函数里面，或者在它的类使用@observable去定义。</p></li>
</ol>
<p>以下是一些例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const map = observable(asMap({ key: &quot;value&quot;}));
map.set(&quot;key&quot;, &quot;new value&quot;);

const list = observable([1, 2, 4]);
list[2] = 3;

const person = observable({
    firstName: &quot;Clive Staples&quot;,
    lastName: &quot;Lewis&quot;
});
person.firstName = &quot;C.S.&quot;;

const temperature = observable(20);
temperature.set(25);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> map = observable(asMap({ <span class="hljs-attr">key</span>: <span class="hljs-string">"value"</span>}));
map.set(<span class="hljs-string">"key"</span>, <span class="hljs-string">"new value"</span>);

<span class="hljs-keyword">const</span> list = observable([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">4</span>]);
list[<span class="hljs-number">2</span>] = <span class="hljs-number">3</span>;

<span class="hljs-keyword">const</span> person = observable({
    <span class="hljs-attr">firstName</span>: <span class="hljs-string">"Clive Staples"</span>,
    <span class="hljs-attr">lastName</span>: <span class="hljs-string">"Lewis"</span>
});
person.firstName = <span class="hljs-string">"C.S."</span>;

<span class="hljs-keyword">const</span> temperature = observable(<span class="hljs-number">20</span>);
temperature.set(<span class="hljs-number">25</span>);</code></pre>
<h3 id="articleHeader6">2.2. @observable</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {observable} from &quot;mobx&quot;;
class OrderLine {
    @observable price:number = 0;
    @observable amount:number = 1;
    constructor(price) {
        this.price = price;
    }
    //这里在下一节会说到
    @computed get total() {
        return this.price * this.amount;
    }
}
const line = new OrderLine();
console.log(&quot;price&quot; in line); // true
//hasOwnProperty：判断一个对象是否有你给出名称的属性或对象。需要注意，此方法无法检查该对象的原型链中是否具有该属性
console.log(line.hasOwnProperty(&quot;price&quot;)); //false" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> {observable} <span class="hljs-keyword">from</span> <span class="hljs-string">"mobx"</span>;
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">OrderLine</span> </span>{
    @observable price:number = <span class="hljs-number">0</span>;
    @observable amount:number = <span class="hljs-number">1</span>;
    <span class="hljs-keyword">constructor</span>(price) {
        <span class="hljs-keyword">this</span>.price = price;
    }
    <span class="hljs-comment">//这里在下一节会说到</span>
    @computed get total() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.price * <span class="hljs-keyword">this</span>.amount;
    }
}
<span class="hljs-keyword">const</span> line = <span class="hljs-keyword">new</span> OrderLine();
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"price"</span> <span class="hljs-keyword">in</span> line); <span class="hljs-comment">// true</span>
<span class="hljs-comment">//hasOwnProperty：判断一个对象是否有你给出名称的属性或对象。需要注意，此方法无法检查该对象的原型链中是否具有该属性</span>
<span class="hljs-built_in">console</span>.log(line.hasOwnProperty(<span class="hljs-string">"price"</span>)); <span class="hljs-comment">//false</span></code></pre>
<p>如果你的环境不支持ES6/7的语法的话，其实@observable key = value;  只是extendObservable(this, { key: value })的语法糖。因此在ES5环境下你也能使用</p>
<h3 id="articleHeader7">2.3. (@)computed</h3>
<p>Computed values 就像一个算术公式一样去从现有的状态或其他值去计算出需要的值。计算的耗费是不可低估的。Computed尽可能帮你减少其中的耗费。它们是高度优化的，请把它用在可能用到的地方。</p>
<p>不要混淆下一节说到的autorun。虽然他们都是被动调用的表达式。但是……  <br>Computed使用情况：如果你需要产生一个有观察者(observers)参数计算的新的值的时候  <br>autorun使用情况：你不想产生一个新的值就想达到一个新的效果/功能。就像是打log或者进行网络请求  <br>Computed values是自动帮你从你的状态(state)值和其他计算辅助值来计算的。MobX做了很多的优化。当参与计算的值没有发生改变，Computed是不会重新运行。如果参与计算的值没有被使用，Computed values是暂停的。</p>
<p>如果Computed values不再是观察者(observed)，那么在UI上也会把它除掉，MobX能自动做垃圾回收。autorun则需要你自己手动去处理。如果参与计算的值不再被使用，是不会缓存Computed的，所以重新计算是需要的。这个是最理想的默认情况。如果你想保留，可以了解一下keepalive和observe。</p>
<p>例子1:    在2.2的例子。@computed get</p>
<p>例子2: @computed set</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Foo {
    @observable length: 2,
    @computed get squared() {
        return this.length * this.length;
    }
    set squared(value) { //this is automatically an action, no annotation necessary
        this.length = Math.sqrt(value);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Foo</span> </span>{
    @observable length: <span class="hljs-number">2</span>,
    @computed get squared() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.length * <span class="hljs-keyword">this</span>.length;
    }
    set squared(value) { <span class="hljs-comment">//this is automatically an action, no annotation necessary</span>
        <span class="hljs-keyword">this</span>.length = <span class="hljs-built_in">Math</span>.sqrt(value);
    }
}</code></pre>
<p><strong>需要注意的是：setter并非用于直接改变参数计算的值,如例子中的length。而是作为一个逆推导。</strong></p>
<h3 id="articleHeader8">2.4. Autorun</h3>
<p>Autorun是用在一些你想要产生一个不用观察者参与的被动调用函数里面。当autorun被使用的时候，一旦依赖项发生变化，autorun提供的函数就会被执行。与之相反的是，computed提供的函数只会在他有自己的观察员(observers)的时候才会评估是否重新执行，否则它的值被认为是无用的。  </p>
<p>根据这些经验：如果你需要一个自动运行但却不会产生任何新的值的结果的函数，那么请使用Autorun。其他情况请使用computed。Autorun只是作用于如果达到某个效果或者功能，而不是计算某些值。如果有一个字符串作为第一个参数存入Autorun，那么它将成为一个调试名称。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var numbers = observable([1,2,3]);
var sum = computed(() => numbers.reduce((a, b) => a + b, 0));

var disposer = autorun(() => console.log(sum.get()));
// prints '6'
numbers.push(4);
// prints '10'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> numbers = observable([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]);
<span class="hljs-keyword">var</span> sum = computed(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> numbers.reduce(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a + b, <span class="hljs-number">0</span>));

<span class="hljs-keyword">var</span> disposer = autorun(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(sum.get()));
<span class="hljs-comment">// prints '6'</span>
numbers.push(<span class="hljs-number">4</span>);
<span class="hljs-comment">// prints '10'</span></code></pre>
<h3 id="articleHeader9">2.5. @observer</h3>
<ol><li><p>observer 函数/修饰器用于react组件。通过<em>mobx-react</em>依赖包来提供。它通过mobx.autorun来包装了组件的render函数，以确保组件的render函数在任何数据的更改是强制重新渲染</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {observer} from &quot;mobx-react&quot;;
var timerData = observable({
    secondsPassed: 0
});
setInterval(() => {
    timerData.secondsPassed++;
}, 1000);
@observer class Timer extends React.Component {
    render() {
        return (<span>Seconds passed: { this.props.timerData.secondsPassed } </span> )
    }
});
React.render(<Timer timerData={timerData} />, document.body);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> {observer} <span class="hljs-keyword">from</span> <span class="hljs-string">"mobx-react"</span>;
<span class="hljs-keyword">var</span> timerData = observable({
    <span class="hljs-attr">secondsPassed</span>: <span class="hljs-number">0</span>
});
setInterval(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    timerData.secondsPassed++;
}, <span class="hljs-number">1000</span>);
@observer <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Timer</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> (<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Seconds passed: { this.props.timerData.secondsPassed } <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span> )
    }
});
React.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Timer</span> <span class="hljs-attr">timerData</span>=<span class="hljs-string">{timerData}</span> /&gt;</span>, document.body);</span></code></pre>
<p>tips: 如果还有其他的decorators一起或者高阶组件的存在，请确保observer为最内层（优先应用）的修饰器。否则它可能无法工作。如果你只在ES5的环境下工作：其实observer不过是<strong>observer(class Timer ... { })</strong> 的语法糖。</p>
<ol><li><p>难点—组件中相关值的引用：<br>MobX能做的事情很多，但是它却不能把原始的值变成观察者（尽管可以通过包裹这个值来返回一个boxed observables的对象）。所以观察者不是这个原始的值，而是返回后的对象的属性值。修改一个刚才的例子：</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.render(<Timer timerData={timerData.secondsPassed} />, document.body)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">React.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Timer</span> <span class="hljs-attr">timerData</span>=<span class="hljs-string">{timerData.secondsPassed}</span> /&gt;</span>, document.body)</span></code></pre>
<p>这时候程序并不会工作了。传入组件的只是timerData里面secondsPassed的当前值。在组件里面，它是不可变的。</p>
<ol><li><p>把你的组件内部状态变成可观察的<br>和普通的类一样，你可以在你的组件使用@observable修饰器。这意味着你的组件拥有了一个内部state，而且它不需要使用react内部提供的繁琐的setState机制。这个内部state能调起render函数，但是却不能准确调起React的生命周期函数，例如：componentShouldUpdate / componentWillUpdate。如果你想要这些，最好使用react提供的API来创建state。当然也可以这样写</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {observer} from &quot;mobx-react&quot;
import {observable} from &quot;mobx&quot;
@observer class Timer extends React.Component {
    @observable secondsPassed = 0
    componentWillMount() {
        setInterval(() => {
            this.secondsPassed++
        }, 1000)
    }
    render() {
        return (<span>Seconds passed: { this.secondsPassed } </span> )
    }
})
React.render(<Timer />, document.body)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> {observer} <span class="hljs-keyword">from</span> <span class="hljs-string">"mobx-react"</span>
<span class="hljs-keyword">import</span> {observable} <span class="hljs-keyword">from</span> <span class="hljs-string">"mobx"</span>
@observer <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Timer</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    @observable secondsPassed = <span class="hljs-number">0</span>
    componentWillMount() {
        setInterval(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
            <span class="hljs-keyword">this</span>.secondsPassed++
        }, <span class="hljs-number">1000</span>)
    }
    render() {
        <span class="hljs-keyword">return</span> (<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Seconds passed: { this.secondsPassed } <span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span> )
    }
})
React.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Timer</span> /&gt;</span>, document.body)</span></code></pre>
<ol><li><p>连接observer和stores<br>mobx-react提供了<strong>Provider</strong>组件让你可以把传递下来的stores作用在react提供的上下文机制。通过连接这些stores和observer，这些observer会成为组件的属性来使用。</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const colors = observable({
   foreground: '#000',
   background: '#fff'
});
const App = () =>
  <Provider colors={colors}>
     <app stuff... />
  </Provider>;
const Button = observer([&quot;colors&quot;], ({ colors, label, onClick }) =>
  <button style="{{"
      color: colors.foreground,
      backgroundColor: colors.background
    "}}"
    onClick={onClick}
  >{label}<button>
);
// later..
colors.foreground = 'blue';
// all buttons updated" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> colors = observable({
   <span class="hljs-attr">foreground</span>: <span class="hljs-string">'#000'</span>,
   <span class="hljs-attr">background</span>: <span class="hljs-string">'#fff'</span>
});
<span class="hljs-keyword">const</span> App = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span>
  &lt;Provider colors={colors}&gt;
     <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">app</span> <span class="hljs-attr">stuff...</span> /&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Provider</span>&gt;</span></span>;
<span class="hljs-keyword">const</span> Button = observer([<span class="hljs-string">"colors"</span>], ({ colors, label, onClick }) =&gt;
  &lt;button style="{{"
      color: colors.foreground,
      backgroundColor: colors.background
    "}}"
    onClick={onClick}
  &gt;{label}&lt;button&gt;
);
// later..
colors.foreground = 'blue';
// all buttons updated</code></pre>
<ol><li><p>componentWillReact<br>React 的组件总是从新的堆栈去渲染。因此让它它很难判断一个组件是否需要重新渲染。在mobx-react里面，你可以使用重新定义的生命周期componentWillReact。它只会在观察者发生变化的时候才重新渲染。</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {observer} from &quot;mobx-react&quot;;
@observer class TodoView extends React.Component {
    componentWillReact() {
        console.log(&quot;I will re-render, since the todo has changed!&quot;);
    }
    render() {
        return <div>this.props.todo.title</div>;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> {observer} <span class="hljs-keyword">from</span> <span class="hljs-string">"mobx-react"</span>;
@observer <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TodoView</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    componentWillReact() {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"I will re-render, since the todo has changed!"</span>);
    }
    render() {
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>this.props.todo.title<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
    }
}</code></pre>
<p>componentWillReact没有任何参数，而且不会在render初始化之前执行（componentWillMount的区别)。而当接收新的属性或者setState之后，它会被调用。</p>
<h3 id="articleHeader10">2.6. action</h3>
<ol><li><p>任何应用程序都有操作（action）。action是任何改变状态的事物。使用MobX，您可以通过标记它们在您的代码中显式地显示您的操作（action）。它会更好的帮助你组织你的代码。建议将它们用于修改可观察量或具有副作用的任何函数中。  <br>需要注意的是：action是用在<em>strict mode</em> 中的</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="action(fn)
action(name, fn)
@action classMethod() {}
@action(name) classMethod () {}
@action boundClassMethod = (args) => { body }
@action(name) boundClassMethod = (args) => { body }
@action.bound classMethod() {}
@action.bound(function() {})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">action(fn)
action(name, fn)
@action classMethod() {}
@action(name) classMethod () {}
@action boundClassMethod = <span class="hljs-function">(<span class="hljs-params">args</span>) =&gt;</span> { body }
@action(name) boundClassMethod = <span class="hljs-function">(<span class="hljs-params">args</span>) =&gt;</span> { body }
@action.bound classMethod() {}
@action.bound(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{})</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@action createRandomContact() {
    this.pendingRequestCount++;
    superagent
         .get('https://randomuser.me/api/')
         .set('Accept', 'application/json')
         .end(action(&quot;createRandomContact-callback&quot;, (error, results) => {
                 if (error) console.error(error)
                 else {
                     const data = JSON.parse(results.text).results[0];
                     const contact = new Contact(this, data.dob, data.name, data.login.username, data.picture)
                     contact.addTag('random-user');
                     this.contacts.push(contact);
                     this.pendingRequestCount--;
                 }
        }
))}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">@action createRandomContact() {
    <span class="hljs-keyword">this</span>.pendingRequestCount++;
    superagent
         .get(<span class="hljs-string">'https://randomuser.me/api/'</span>)
         .set(<span class="hljs-string">'Accept'</span>, <span class="hljs-string">'application/json'</span>)
         .end(action(<span class="hljs-string">"createRandomContact-callback"</span>, (error, results) =&gt; {
                 <span class="hljs-keyword">if</span> (error) <span class="hljs-built_in">console</span>.error(error)
                 <span class="hljs-keyword">else</span> {
                     <span class="hljs-keyword">const</span> data = <span class="hljs-built_in">JSON</span>.parse(results.text).results[<span class="hljs-number">0</span>];
                     <span class="hljs-keyword">const</span> contact = <span class="hljs-keyword">new</span> Contact(<span class="hljs-keyword">this</span>, data.dob, data.name, data.login.username, data.picture)
                     contact.addTag(<span class="hljs-string">'random-user'</span>);
                     <span class="hljs-keyword">this</span>.contacts.push(contact);
                     <span class="hljs-keyword">this</span>.pendingRequestCount--;
                 }
        }
))}</code></pre>
<ol><li><p>action 仅仅作用于当前运行的函数，而不能作用于当前函数调用的函数。这意味着在一些定时器或者网络请求，异步处理的情况下，它们的回调函数无法对状态做成改变。这些回调函数都应该有action包裹，如果例子里面的 <em>createRandomContact-callback</em> 一样。但是，如果你使用了async / await的话，最好的方式应该是使用 <strong>runInAction</strong> 来让它变得更加简单</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@action /*optional*/ updateDocument = async () => {
    const data = await fetchDataFromUrl();
    /* required in strict mode to be allowed to update state: */
    runInAction(&quot;update state after fetching data&quot;, () => {
        this.data.replace(data);
        this.isSaving = true;
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">@action <span class="hljs-comment">/*optional*/</span> updateDocument = <span class="hljs-keyword">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> data = <span class="hljs-keyword">await</span> fetchDataFromUrl();
    <span class="hljs-comment">/* required in strict mode to be allowed to update state: */</span>
    runInAction(<span class="hljs-string">"update state after fetching data"</span>, () =&gt; {
        <span class="hljs-keyword">this</span>.data.replace(data);
        <span class="hljs-keyword">this</span>.isSaving = <span class="hljs-literal">true</span>;
    })
}</code></pre>
<ol><li><p>Bound actions  <br>目前看到的actions都是遵循在javascript中绑定的正常规则，但是在MobX 3引入了action.bound来自动绑定actions到目标对象上。和action的使用不一样，不需要一个名字参数。它的名称始终基于绑定到属性的操作上。需要注意的是，在箭头函数上不要这样使用，因为箭头函数已经绑定了上下文，不能在重新更改上下文</p></li></ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Ticker {
    @observable this.tick = 0

    @action.bound
    increment() {
        this.tick++ // 'this' will always be correct
    }
}
const ticker = new Ticker()
setInterval(ticker.increment, 1000)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Ticker</span> </span>{
    @observable <span class="hljs-keyword">this</span>.tick = <span class="hljs-number">0</span>

    @action.bound
    increment() {
        <span class="hljs-keyword">this</span>.tick++ <span class="hljs-comment">// 'this' will always be correct</span>
    }
}
<span class="hljs-keyword">const</span> ticker = <span class="hljs-keyword">new</span> Ticker()
setInterval(ticker.increment, <span class="hljs-number">1000</span>)</code></pre>
<h2 id="articleHeader11">后记</h2>
<p>启动例子项目：<a href="https://github.com/sanyuelanv/learn_mobx" rel="nofollow noreferrer" target="_blank">进入</a></p>
<ol>
<li><p>前端项目：npm install 或者 yarn install 打开本地的8080端口</p></li>
<li><p>后端部分：进入 back文件夹，执行npm start 打开本地的3000端口</p></li>
<li><p>作为对比：使用redux的例子：<a href="https://github.com/sanyuelanv/project" rel="nofollow noreferrer" target="_blank">进入</a></p></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
MobX

## 原文链接
[https://segmentfault.com/a/1190000008267003](https://segmentfault.com/a/1190000008267003)

