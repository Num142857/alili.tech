---
title: 'mobx学习总结' 
date: 2018-12-10 2:30:07
hidden: true
slug: q9um4pcjud
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">Mobx解决的问题</h2>
<p>传统React使用的数据管理库为Redux。Redux要解决的问题是统一数据流，数据流完全可控并可追踪。要实现该目标，便需要进行相关的约束。Redux由此引出了dispatch action reducer等概念，对state的概念进行强约束。然而对于一些项目来说，太过强，便失去了灵活性。Mobx便是来填补此空缺的。</p>
<p>这里对Redux和Mobx进行简单的对比：</p>
<p>1. Redux的编程范式是函数式的而Mobx是面向对象的；</p>
<p>2. 因此数据上来说Redux理想的是immutable的，每次都返回一个新的数据，而Mobx从始至终都是一份引用。因此Redux是支持数据回溯的；</p>
<p>3. 然而和Redux相比，使用Mobx的组件可以做到精确更新，这一点得益于Mobx的observable；对应的，Redux是用dispath进行广播，通过Provider和connect来比对前后差别控制更新粒度，有时需要自己写SCU；Mobx更加精细一点。</p>
<h2 id="articleHeader1">&nbsp;Mobx核心概念</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013810517" src="https://static.alili.tech/img/remote/1460000013810517" alt="图片来自官方文档" title="图片来自官方文档" style="cursor: pointer; display: inline;"></span></p>
<p>Mobx的核心原理是通过action触发state的变化，进而触发state的衍生对象（computed value &amp; Reactions）。</p>
<h3 id="articleHeader2">State</h3>
<p>在Mobx中，State就对应业务的最原始状态，通过observable方法，可以使这些状态变得可观察。</p>
<p>通常支持被observable的类型有三个，分别是Object, Array, Map；对于原始类型，可以使用Obserable.box。</p>
<p>值得注意的一点是，当某一数据被observable包装后，他返回的其实是被observable包装后的类型。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const Mobx = require(&quot;mobx&quot;);
const { observable, autorun } = Mobx;
const obArray = observable([1, 2, 3]);
console.log(&quot;ob is Array:&quot;, Array.isArray(obArray));
console.log(&quot;ob:&quot;, obArray);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
<span class="hljs-keyword">const</span> Mobx = <span class="hljs-built_in">require</span>(<span class="hljs-string">"mobx"</span>);
<span class="hljs-keyword">const</span> { observable, autorun } = Mobx;
<span class="hljs-keyword">const</span> obArray = observable([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"ob is Array:"</span>, <span class="hljs-built_in">Array</span>.isArray(obArray));
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"ob:"</span>, obArray);
</code></pre>
<p>控制台输出为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
ob is Array: false
ob: ObservableArray {}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code>
<span class="hljs-string">ob</span> <span class="hljs-string">is</span> <span class="hljs-attr">Array:</span> <span class="hljs-literal">false</span>
<span class="hljs-attr">ob:</span> <span class="hljs-string">ObservableArray</span> <span class="hljs-string">{}</span>
</code></pre>
<p>对于该问题，解决方法也很简单，可以通过Mobx原始提供的<code>observable.toJS()</code>转换成JS再判断，或者直接使用Mobx原生提供的API<code>isObservableArray</code>进行判断。</p>
<h3 id="articleHeader3">computed</h3>
<p>Mobx中state的设计原则和redux有一点是相同的，那就是尽可能保证state足够小，足够原子。这样设计的原则不言而喻，无论是维护性还是性能。那么对于依赖state的数据而衍生出的数据，可以使用computed。</p>
<p>简而言之，你有一个值，该值的结果依赖于state，并且该值也需要被obserable，那么就使用computed。</p>
<p>通常应该尽可能的使用计算属性，并且由于其函数式的特点，可以最大化优化性能。如果计算属性依赖的state没改变，或者该计算值没有被其他计算值或响应（reaction）使用，computed便不会运行。在这种情况下，computed处于暂停状态，此时若该计算属性不再被observable。那么其便会被Mobx垃圾回收。</p>
<p>简单介绍computed的一个使用场景</p>
<p>假如你观察了一个数组，你想根据数组的长度变化作出反应，在不使用computed时代码是这样的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const Mobx = require(&quot;mobx&quot;);
const { observable, autorun, computed } = Mobx;
var numbers = observable([1, 2, 3]);
autorun(() => console.log(numbers.length));
// 输出 '3'
numbers.push(4);
// 输出 '4'
numbers[0] = 0;
// 输出 '4'
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
<span class="hljs-keyword">const</span> Mobx = <span class="hljs-built_in">require</span>(<span class="hljs-string">"mobx"</span>);
<span class="hljs-keyword">const</span> { observable, autorun, computed } = Mobx;
<span class="hljs-keyword">var</span> numbers = observable([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]);
autorun(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(numbers.length));
<span class="hljs-comment">// 输出 '3'</span>
numbers.push(<span class="hljs-number">4</span>);
<span class="hljs-comment">// 输出 '4'</span>
numbers[<span class="hljs-number">0</span>] = <span class="hljs-number">0</span>;
<span class="hljs-comment">// 输出 '4'</span>
</code></pre>
<p>最后一行其实只是改了数组中的一个值，但是也触发了autorun的执行。此时如果用computed便会解决该问题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const Mobx = require(&quot;mobx&quot;);
const { observable, autorun, computed } = Mobx;
var numbers = observable([1, 2, 3]);
var sum = computed(() => numbers.length);
autorun(() => console.log(sum.get()));
// 输出 '3'
numbers.push(4);
// 输出 '4'
numbers[0] = 1;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
<span class="hljs-keyword">const</span> Mobx = <span class="hljs-built_in">require</span>(<span class="hljs-string">"mobx"</span>);
<span class="hljs-keyword">const</span> { observable, autorun, computed } = Mobx;
<span class="hljs-keyword">var</span> numbers = observable([<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]);
<span class="hljs-keyword">var</span> sum = computed(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> numbers.length);
autorun(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(sum.get()));
<span class="hljs-comment">// 输出 '3'</span>
numbers.push(<span class="hljs-number">4</span>);
<span class="hljs-comment">// 输出 '4'</span>
numbers[<span class="hljs-number">0</span>] = <span class="hljs-number">1</span>;
</code></pre>
<h3 id="articleHeader4">autorun</h3>
<p>另一个响应state的api便是autorun。和computed类似，每当依赖的值改变时，其都会改变。不同的是，autorun没有了computed的优化（当然，依赖值未改变的情况下也不会重新运行，但不会被自动回收）。因此在使用场景来说，autorun通常用来执行一些有副作用的。例如打印日志，更新UI等等。</p>
<h3 id="articleHeader5">action</h3>
<p>在redux中，唯一可以更改state的途径便是dispatch一个action。这种约束性带来的一个好处是可维护性。整个state只要改变必定是通过action触发的，对此只要找到reducer中对应的action便能找到影响数据改变的原因。强约束性是好的，但是Redux要达到约束性的目的，似乎要写许多样板代码，虽说有许多库都在解决该问题，然而Mobx从根本上来说会更加优雅。</p>
<p>首先Mobx并不强制所有state的改变必须通过action来改变，这主要适用于一些较小的项目。对于较大型的，需要多人合作的项目来说，可以使用Mobx提供的api <code>configure</code>来强制。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
Mobx.configure({enforceActions: true})
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>
<span class="hljs-selector-tag">Mobx</span><span class="hljs-selector-class">.configure</span>({<span class="hljs-attribute">enforceActions</span>: true})
</code></pre>
<p>其原理也很简单</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
function&nbsp;configure(options){

&nbsp; &nbsp; if (options.enforceActions !== undefined) {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; globalState.enforceActions = !!options.enforceActions
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; globalState.allowStateChanges = !options.enforceActions
&nbsp;&nbsp;&nbsp; }

}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>
function&nbsp;configure(options){

&nbsp; &nbsp; <span class="hljs-keyword">if</span> (options<span class="hljs-selector-class">.enforceActions</span> !== undefined) {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; globalState<span class="hljs-selector-class">.enforceActions</span> = !!options<span class="hljs-selector-class">.enforceActions</span>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; globalState<span class="hljs-selector-class">.allowStateChanges</span> = !options<span class="hljs-selector-class">.enforceActions</span>
&nbsp;&nbsp;&nbsp; }

}
</code></pre>
<p>通过改变全局的strictMode以及allowStateChanges属性的方式来实现强制使用action。</p>
<h2 id="articleHeader6">Mobx异步处理</h2>
<p>和Redux不同的是，Mobx在异步处理上并不复杂，不需要引入额外的类似<code>redux-thunk</code>、<code>redux-saga</code>这样的库。</p>
<p>唯一需要注意的是，在严格模式下，对于异步action里的回调，若该回调也要修改observable的值，那么</p>
<p>该回调也需要绑定action。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const Mobx = require(&quot;mobx&quot;);
Mobx.configure({ enforceActions: true });
const { observable, autorun, computed, extendObservable, action } = Mobx;
class Store {
&nbsp; @observable a = 123;

&nbsp; @action
&nbsp; changeA() {
&nbsp;&nbsp;&nbsp; this.a = 0;
&nbsp;&nbsp;&nbsp; setTimeout(this.changeB, 1000);
&nbsp; }
&nbsp; @action.bound
&nbsp; changeB() {
&nbsp;&nbsp;&nbsp; this.a = 1000;
&nbsp; }
}
var s = new Store();
autorun(() => console.log(s.a));
s.changeA();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code>
<span class="hljs-keyword">const</span> Mobx = <span class="hljs-built_in">require</span>(<span class="hljs-string">"mobx"</span>);
Mobx.configure({ enforceActions: <span class="hljs-literal">true</span> });
<span class="hljs-keyword">const</span> { observable, autorun, computed, extendObservable, action } = Mobx;
<span class="hljs-keyword">class</span> Store {
&nbsp; <span class="hljs-meta">@observable</span> a = <span class="hljs-number">123</span>;

&nbsp; <span class="hljs-meta">@action</span>
&nbsp; changeA() {
&nbsp;&nbsp;&nbsp; <span class="hljs-keyword">this</span>.a = <span class="hljs-number">0</span>;
&nbsp;&nbsp;&nbsp; setTimeout(<span class="hljs-keyword">this</span>.changeB, <span class="hljs-number">1000</span>);
&nbsp; }
&nbsp; <span class="hljs-meta">@action</span>.bound
&nbsp; changeB() {
&nbsp;&nbsp;&nbsp; <span class="hljs-keyword">this</span>.a = <span class="hljs-number">1000</span>;
&nbsp; }
}
<span class="hljs-keyword">var</span> s = <span class="hljs-keyword">new</span> Store();
autorun(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(s.a));
s.changeA();
</code></pre>
<p>这里用了action.bound语法糖，目的是为了解决javascript作用域问题。</p>
<p>另外一种更简单的写法是直接包装action</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const Mobx = require(&quot;mobx&quot;);
Mobx.configure({ enforceActions: true });
const { observable, autorun, computed, extendObservable, action } = Mobx;
class Store {
&nbsp; @observable a = 123;
&nbsp; @action
&nbsp; changeA() {
&nbsp;&nbsp;&nbsp; this.a = 0;
&nbsp;&nbsp;&nbsp; setTimeout(action('changeB',()=>{
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this.a = 1000;
&nbsp;&nbsp;&nbsp; }), 1000);
&nbsp; }
}
var s = new Store();
autorun(() => console.log(s.a));
s.changeA();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>
const Mobx = <span class="hljs-built_in">require</span>(<span class="hljs-string">"mobx"</span>);
Mobx.configure({ enforceActions: <span class="hljs-literal">true</span> });
const { observable, autorun, computed, extendObservable, action } = Mobx;
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Store</span> {</span>
&nbsp; @observable a = <span class="hljs-number">123</span>;
&nbsp; @action
&nbsp; changeA() {
&nbsp;&nbsp;&nbsp; <span class="hljs-keyword">this</span>.a = <span class="hljs-number">0</span>;
&nbsp;&nbsp;&nbsp; setTimeout(action(<span class="hljs-string">'changeB'</span>,<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span class="hljs-keyword">this</span>.a = <span class="hljs-number">1000</span>;
&nbsp;&nbsp;&nbsp; }), <span class="hljs-number">1000</span>);
&nbsp; }
}
var s = <span class="hljs-keyword">new</span> Store();
autorun(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(s.a));
s.changeA();
</code></pre>
<p>如果不想到处写action，可以使用Mobx提供的工具函数runInAction来简化操作。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
...

&nbsp;@action
&nbsp; changeA() {
&nbsp;&nbsp;&nbsp; this.a = 0;
&nbsp;&nbsp;&nbsp; setTimeout(
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; runInAction(() => {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; this.a = 1000;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }),
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 1000
&nbsp;&nbsp;&nbsp; );
&nbsp; }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>
...

&nbsp;@action
&nbsp; changeA() {
&nbsp;&nbsp;&nbsp; <span class="hljs-keyword">this</span>.a = <span class="hljs-number">0</span>;
&nbsp;&nbsp;&nbsp; setTimeout(
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; runInAction(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span class="hljs-keyword">this</span>.a = <span class="hljs-number">1000</span>;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; }),
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span class="hljs-number">1000</span>
&nbsp;&nbsp;&nbsp; );
&nbsp; }
</code></pre>
<p>通过该工具函数，可以将所有对observable值的操作放在一个回调里，而不是命名各种各样的action。</p>
<p>最后，Mobx提供的一个工具函数，其原理redux-saga，使用ES6的generator来实现异步操作，可以彻底摆脱action的干扰。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
@asyncAction
&nbsp; changeA() {
&nbsp;&nbsp;&nbsp; this.a = 0;
&nbsp;&nbsp;&nbsp; const data = yield Promise.resolve(1)
&nbsp;&nbsp;&nbsp; this.a = data;
&nbsp; }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>
<span class="hljs-meta">@asyncAction</span>
&nbsp; changeA() {
&nbsp;&nbsp;&nbsp; <span class="hljs-keyword">this</span>.a = <span class="hljs-number">0</span>;
&nbsp;&nbsp;&nbsp; const <span class="hljs-keyword">data</span> = yield Promise.resolve(<span class="hljs-number">1</span>)
&nbsp;&nbsp;&nbsp; <span class="hljs-keyword">this</span>.a = <span class="hljs-keyword">data</span>;
&nbsp; }
</code></pre>
<h2 id="articleHeader7">Mobx原理分析</h2>
<h3 id="articleHeader8">autorun</h3>
<p>Mobx的核心就是通过observable观察某一个变量，当该变量产生变化时，对应的autorun内的回调函数就会发生变化。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const Mobx = require(&quot;mobx&quot;);
const { observable, autorun } = Mobx;
const ob = observable({ a: 1, b: 1 });
autorun(() => {
&nbsp; console.log(&quot;ob.b:&quot;, ob.b);
});

ob.b = 2;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>
const Mobx = require(<span class="hljs-string">"mobx"</span>)<span class="hljs-comment">;</span>
const { observable, autorun } = Mobx<span class="hljs-comment">;</span>
const ob = observable({ a: <span class="hljs-number">1</span>, <span class="hljs-keyword">b: </span><span class="hljs-number">1</span> })<span class="hljs-comment">;</span>
autorun(() =&gt; {
&nbsp; console.log(<span class="hljs-string">"ob.b:"</span>, ob.<span class="hljs-keyword">b);
</span>})<span class="hljs-comment">;</span>

ob.<span class="hljs-keyword">b </span>= <span class="hljs-number">2</span><span class="hljs-comment">;</span>
</code></pre>
<p>执行该代码会发现，log了两遍ob.b的值。其实从这个就能猜到，<strong>Mobx是通过代理变量的getter和setter来实现的变量更新功能</strong>。首先先代理变量的getter函数，然后通过预执行一遍autorun中回调，从而触发getter函数，来实现观察值的收集，依次来代理setter。之后只要setter触发便执行收集好的回调就ok了。<br>具体源码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function autorun(view, opts){
    reaction = new Reaction(name, function () {
           this.track(reactionRunner);
    }, opts.onError);
   function reactionRunner() {
        view(reaction);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">autorun</span><span class="hljs-params">(view, opts)</span></span>{
    reaction = <span class="hljs-keyword">new</span> Reaction(name, <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
           <span class="hljs-keyword">this</span>.track(reactionRunner);
    }, opts.onError);
   <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">reactionRunner</span><span class="hljs-params">()</span> </span>{
        view(reaction);
    }
}</code></pre>
<p>autorun的核心就是这一段，这里view就是autorun里的回调函数。具体到track函数，比较关键到代码是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Reaction.prototype.track = function (fn) {
    var result = trackDerivedFunction(this, fn, undefined);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>Reaction.prototype.track = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(fn)</span> </span>{
    <span class="hljs-keyword">var</span> result = trackDerivedFunction(<span class="hljs-keyword">this</span>, fn, <span class="hljs-literal">undefined</span>);
}</code></pre>
<p>trackDerivedFunction函数中会执行autorun里的回调函数，紧接着会触发obserable中代理的函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function generateObservablePropConfig(propName) {
    return (observablePropertyConfigs[propName] ||
        (observablePropertyConfigs[propName] = {
            configurable: true,
            enumerable: true,
            get: function () {
                return this.$mobx.read(this, propName);
            },
            set: function (v) {
                this.$mobx.write(this, propName, v);
            }
        }));
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">generateObservablePropConfig</span><span class="hljs-params">(propName)</span> </span>{
    <span class="hljs-keyword">return</span> (observablePropertyConfigs[propName] ||
        (observablePropertyConfigs[propName] = {
            configurable: <span class="hljs-literal">true</span>,
            enumerable: <span class="hljs-literal">true</span>,
            <span class="hljs-keyword">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">()</span> </span>{
                <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.$mobx.read(<span class="hljs-keyword">this</span>, propName);
            },
            <span class="hljs-keyword">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(v)</span> </span>{
                <span class="hljs-keyword">this</span>.$mobx.write(<span class="hljs-keyword">this</span>, propName, v);
            }
        }));
}</code></pre>
<p>在get中会将回调与其绑定，之后更改了obserable中的值时，都会触发这里的set，然后随即触发绑定的函数。</p>
<h3 id="articleHeader9">Mobx的一些坑</h3>
<p>通过autorun的实现原理可以发现，会出现很多我们想象中应该触发，但是没有触发的场景，例如：</p>
<p>1. 无法收集新增的属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const Mobx = require(&quot;mobx&quot;);
const { observable, autorun } = Mobx;
let ob = observable({ a: 1, b: 1 });
autorun(() => {
&nbsp; if(ob.c){
&nbsp;&nbsp;&nbsp; console.log(&quot;ob.c:&quot;, ob.c);
&nbsp; }
});
ob.c = 1
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
<span class="hljs-keyword">const</span> Mobx = <span class="hljs-built_in">require</span>(<span class="hljs-string">"mobx"</span>);
<span class="hljs-keyword">const</span> { observable, autorun } = Mobx;
<span class="hljs-keyword">let</span> ob = observable({ <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">1</span> });
autorun(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
&nbsp; <span class="hljs-keyword">if</span>(ob.c){
&nbsp;&nbsp;&nbsp; <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"ob.c:"</span>, ob.c);
&nbsp; }
});
ob.c = <span class="hljs-number">1</span>
</code></pre>
<p>对于该问题，可以通过<code>extendObservable(target, props)</code>方法来实现。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const Mobx = require(&quot;mobx&quot;);
const { observable, autorun, computed, extendObservable } = Mobx;
var numbers = observable({ a: 1, b: 2 });
extendObservable(numbers, { c: 1 });
autorun(() => console.log(numbers.c));
numbers.c = 3;

// 1

// 3
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
<span class="hljs-keyword">const</span> Mobx = <span class="hljs-built_in">require</span>(<span class="hljs-string">"mobx"</span>);
<span class="hljs-keyword">const</span> { observable, autorun, computed, extendObservable } = Mobx;
<span class="hljs-keyword">var</span> numbers = observable({ <span class="hljs-attr">a</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">2</span> });
extendObservable(numbers, { <span class="hljs-attr">c</span>: <span class="hljs-number">1</span> });
autorun(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log(numbers.c));
numbers.c = <span class="hljs-number">3</span>;

<span class="hljs-comment">// 1</span>

<span class="hljs-comment">// 3</span>
</code></pre>
<p><code>extendObservable</code>该API会可以为对象新增加observal属性。</p>
<p><strong>当然，如果你对变量的entry增删非常关心，应该使用Map数据结构而不是Object。</strong></p>
<p>2. 回调函数若依赖外部环境，则无法进行收集</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const Mobx = require(&quot;mobx&quot;);
const { observable, autorun } = Mobx;
let ob = observable({ a: 1, b: 1 });
let x = 0;
autorun(() => {
&nbsp; if(x == 1){
&nbsp;&nbsp;&nbsp; console.log(&quot;ob.c:&quot;, ob.b);
&nbsp; }
});
x = 1;
ob.b = 2;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>
const Mobx = require(<span class="hljs-string">"mobx"</span>)<span class="hljs-comment">;</span>
const { observable, autorun } = Mobx<span class="hljs-comment">;</span>
let ob = observable({ a: <span class="hljs-number">1</span>, <span class="hljs-keyword">b: </span><span class="hljs-number">1</span> })<span class="hljs-comment">;</span>
let x = <span class="hljs-number">0</span><span class="hljs-comment">;</span>
autorun(() =&gt; {
&nbsp; if(x == <span class="hljs-number">1</span>){
&nbsp;&nbsp;&nbsp; console.log(<span class="hljs-string">"ob.c:"</span>, ob.<span class="hljs-keyword">b);
</span>&nbsp; }
})<span class="hljs-comment">;</span>
x = <span class="hljs-number">1</span><span class="hljs-comment">;</span>
ob.<span class="hljs-keyword">b </span>= <span class="hljs-number">2</span><span class="hljs-comment">;</span>
</code></pre>
<p>很好理解，autorun的回调函数在预执行的时候无法到达ob.b那一行代码，所以收集不到。</p>
<p>参考链接：</p>
<p>1.&nbsp;<a href="https://www.zhihu.com/question/52219898" rel="nofollow noreferrer" target="_blank">https://www.zhihu.com/question/52219898</a><br>2.&nbsp;<a href="http://taobaofed.org/blog/2016/08/18/react-redux-connect" rel="nofollow noreferrer" target="_blank">http://taobaofed.org/blog/2016/08/18/react-redux-connect</a><br>3.&nbsp;<a href="https://Mobx.js.org/index.html" rel="nofollow noreferrer" target="_blank">https://Mobx.js.org/index.html</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
mobx学习总结

## 原文链接
[https://segmentfault.com/a/1190000013810512](https://segmentfault.com/a/1190000013810512)

