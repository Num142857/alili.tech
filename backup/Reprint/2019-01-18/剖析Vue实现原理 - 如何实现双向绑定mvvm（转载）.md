---
title: '剖析Vue实现原理 - 如何实现双向绑定mvvm（转载）' 
date: 2019-01-18 2:30:35
hidden: true
slug: s1u6fhn6wgf
categories: [reprint]
---

{{< raw >}}

                    
<p>本文能帮你做什么？<br>1、了解vue的双向数据绑定原理以及核心代码模块<br>2、缓解好奇心的同时了解如何实现双向绑定<br>为了便于说明原理与实现，本文相关代码主要摘自vue源码, 并进行了简化改造，相对较简陋，并未考虑到数组的处理、数据的循环依赖等，也难免存在一些问题，欢迎大家指正。不过这些并不会影响大家的阅读和理解，相信看完本文后对大家在阅读vue源码的时候会更有帮助</p>
<p>相信大家对mvvm双向绑定应该都不陌生了，一言不合上代码，下面先看一个本文最终实现的效果吧，和vue一样的语法，如果还不了解双向绑定，猛戳Google</p>
<p>&lt;div id="mvvm-app"&gt;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;text&quot; v-model=&quot;word&quot;>
<p>"{{"word"}}"</p>
<button v-on:click=&quot;sayHi&quot;>change model</button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">v-model</span>=<span class="hljs-string">"word"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{"word"}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"sayHi"</span>&gt;</span>change model<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span></code></pre>
<p>&lt;/div&gt;</p>
<p>&lt;script src="./js/observer.js"&gt;&lt;/script&gt;<br>&lt;script src="./js/watcher.js"&gt;&lt;/script&gt;<br>&lt;script src="./js/compile.js"&gt;&lt;/script&gt;<br>&lt;script src="./js/mvvm.js"&gt;&lt;/script&gt;<br>&lt;script&gt;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var vm = new MVVM({
    el: '#mvvm-app',
    data: {
        word: 'Hello World!'
    },
    methods: {
        sayHi: function() {
            this.word = 'Hi, everybody!';
        }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">var</span> vm = <span class="hljs-keyword">new</span> MVVM({
    el: <span class="hljs-string">'#mvvm-app'</span>,
    data: {
        word: <span class="hljs-string">'Hello World!'</span>
    },
    methods: {
        sayHi: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
            <span class="hljs-keyword">this</span>.word = <span class="hljs-string">'Hi, everybody!'</span>;
        }
    }
});</code></pre>
<p>&lt;/script&gt;<br>效果： </p>
<p>几种实现双向绑定的做法</p>
<p>目前几种主流的mvc(vm)框架都实现了单向数据绑定，而我所理解的双向数据绑定无非就是在单向绑定的基础上给可输入元素（input、textare等）添加了change(input)事件，来动态修改model和 view，并没有多高深。所以无需太过介怀是实现的单向或双向绑定。</p>
<p>实现数据绑定的做法有大致如下几种：</p>
<p>发布者-订阅者模式（backbone.js）</p>
<p>脏值检查（angular.js） </p>
<p>数据劫持（vue.js）</p>
<p>发布者-订阅者模式: 一般通过sub, pub的方式实现数据和视图的绑定监听，更新数据方式通常做法是 vm.set('property', value)，这里有篇文章讲的比较详细，有兴趣可点这里</p>
<p>这种方式现在毕竟太low了，我们更希望通过 vm.property = value这种方式更新数据，同时自动更新视图，于是有了下面两种方式</p>
<p>脏值检查: angular.js 是通过脏值检测的方式比对数据是否有变更，来决定是否更新视图，最简单的方式就是通过 setInterval() 定时轮询检测数据变动，当然Google不会这么low，angular只有在指定的事件触发时进入脏值检测，大致如下：</p>
<p>DOM事件，譬如用户输入文本，点击按钮等。( ng-click )<br>XHR响应事件 ( $http )<br>浏览器Location变更事件 ( $location )<br>Timer事件( $timeout , $interval )<br>执行 $digest() 或 $apply()<br>数据劫持: vue.js 则是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。</p>
<p>思路整理</p>
<p>已经了解到vue是通过数据劫持的方式来做数据绑定的，其中最核心的方法便是通过Object.defineProperty()来实现对属性的劫持，达到监听数据变动的目的，无疑这个方法是本文中最重要、最基础的内容之一，如果不熟悉defineProperty，猛戳这里整理了一下，要实现mvvm的双向绑定，就必须要实现以下几点： 1、实现一个数据监听器Observer，能够对数据对象的所有属性进行监听，如有变动可拿到最新值并通知订阅者 2、实现一个指令解析器Compile，对每个元素节点的指令进行扫描和解析，根据指令模板替换数据，以及绑定相应的更新函数 3、实现一个Watcher，作为连接Observer和Compile的桥梁，能够订阅并收到每个属性变动的通知，执行指令绑定的相应回调函数，从而更新视图 4、mvvm入口函数，整合以上三者</p>
<p>上述流程如图所示： </p>
<p>1、实现Observer</p>
<p>ok, 思路已经整理完毕，也已经比较明确相关逻辑和模块功能了，let's do it 我们知道可以利用Obeject.defineProperty()来监听属性变动 那么将需要observe的数据对象进行递归遍历，包括子属性对象的属性，都加上 setter和getter 这样的话，给这个对象的某个值赋值，就会触发setter，那么就能监听到了数据变化。。相关代码可以是这样：</p>
<p>var data = {name: 'kindeng'};<br>observe(data);<br>data.name = 'dmq'; // 哈哈哈，监听到值变化了 kindeng --&gt; dmq</p>
<p>function observe(data) {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (!data || typeof data !== 'object') {
    return;
}
// 取出所有属性遍历
Object.keys(data).forEach(function(key) {
    defineReactive(data, key, data[key]);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">if</span> (!<span class="hljs-keyword">data</span> || typeof <span class="hljs-keyword">data</span> !== <span class="hljs-string">'object'</span>) {
    <span class="hljs-keyword">return</span>;
}
<span class="hljs-comment">// 取出所有属性遍历</span>
Object.keys(<span class="hljs-keyword">data</span>).forEach(function(key) {
    defineReactive(<span class="hljs-keyword">data</span>, key, <span class="hljs-keyword">data</span>[key]);
});</code></pre>
<p>};</p>
<p>function defineReactive(data, key, val) {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="observe(val); // 监听子属性
Object.defineProperty(data, key, {
    enumerable: true, // 可枚举
    configurable: false, // 不能再define
    get: function() {
        return val;
    },
    set: function(newVal) {
        console.log('哈哈哈，监听到值变化了 ', val, ' --> ', newVal);
        val = newVal;
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>observe(val); <span class="hljs-comment">// 监听子属性</span>
Object.defineProperty(data, key, {
    enumerable: <span class="hljs-literal">true</span>, <span class="hljs-comment">// 可枚举</span>
    configurable: <span class="hljs-literal">false</span>, <span class="hljs-comment">// 不能再define</span>
    <span class="hljs-keyword">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
        <span class="hljs-keyword">return</span> val;
    },
    <span class="hljs-keyword">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(newVal)</span> </span>{
        console.log(<span class="hljs-string">'哈哈哈，监听到值变化了 '</span>, val, <span class="hljs-string">' --&gt; '</span>, newVal);
        val = newVal;
    }
});</code></pre>
<p>}</p>
<p>这样我们已经可以监听每个数据的变化了，那么监听到变化之后就是怎么通知订阅者了，所以接下来我们需要实现一个消息订阅器，很简单，维护一个数组，用来收集订阅者，数据变动触发notify，再调用订阅者的update方法，代码改善之后是这样：</p>
<p>// ... 省略<br>function defineReactive(data, key, val) {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var dep = new Dep();
observe(val); // 监听子属性

Object.defineProperty(data, key, {
    // ... 省略
    set: function(newVal) {
        if (val === newVal) return;
        console.log('哈哈哈，监听到值变化了 ', val, ' --> ', newVal);
        val = newVal;
        dep.notify(); // 通知所有订阅者
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> dep = <span class="hljs-keyword">new</span> <span class="hljs-type">Dep</span>();
observe(val); <span class="hljs-comment">// 监听子属性</span>

Object.defineProperty(data, key, {
    <span class="hljs-comment">// ... 省略</span>
    <span class="hljs-keyword">set</span>: <span class="hljs-type">function</span>(<span class="hljs-keyword">new</span><span class="hljs-type">Val</span>) {
        <span class="hljs-keyword">if</span> (val === <span class="hljs-keyword">new</span><span class="hljs-type">Val</span>) <span class="hljs-keyword">return</span>;
        console.log(<span class="hljs-string">'哈哈哈，监听到值变化了 '</span>, val, <span class="hljs-string">' --&gt; '</span>, <span class="hljs-keyword">new</span><span class="hljs-type">Val</span>);
        val = <span class="hljs-keyword">new</span><span class="hljs-type">Val</span>;
        dep.notify(); <span class="hljs-comment">// 通知所有订阅者</span>
    }
});</code></pre>
<p>}</p>
<p>function Dep() {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.subs = [];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.subs = [];</code></pre>
<p>}<br>Dep.prototype = {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="addSub: function(sub) {
    this.subs.push(sub);
},
notify: function() {
    this.subs.forEach(function(sub) {
        sub.update();
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs perl"><code>addSub: function(<span class="hljs-function"><span class="hljs-keyword">sub</span>) </span>{
    this.subs.push(<span class="hljs-function"><span class="hljs-keyword">sub</span>)</span>;
},
notify: function() {
    this.subs.forEach(function(<span class="hljs-function"><span class="hljs-keyword">sub</span>) </span>{
        <span class="hljs-function"><span class="hljs-keyword">sub</span>.<span class="hljs-title">update</span></span>();
    });
}</code></pre>
<p>};<br>那么问题来了，谁是订阅者？怎么往订阅器添加订阅者？ 没错，上面的思路整理中我们已经明确订阅者应该是Watcher, 而且var dep = new Dep();是在 defineReactive方法内部定义的，所以想通过dep添加订阅者，就必须要在闭包内操作，所以我们可以在 getter里面动手脚：</p>
<p>// Observer.js<br>// ...省略<br>Object.defineProperty(data, key, {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="get: function() {
    // 由于需要在闭包内添加watcher，所以通过Dep定义一个全局target属性，暂存watcher, 添加完移除
    Dep.target &amp;&amp; dep.addDep(Dep.target);
    return val;
}
// ... 省略" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-comment">// 由于需要在闭包内添加watcher，所以通过Dep定义一个全局target属性，暂存watcher, 添加完移除</span>
    Dep.target &amp;&amp; dep.addDep(Dep.target);
    <span class="hljs-keyword">return</span> val;
}
<span class="hljs-comment">// ... 省略</span></code></pre>
<p>});</p>
<p>// Watcher.js<br>Watcher.prototype = {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="get: function(key) {
    Dep.target = this;
    this.value = data[key]; // 这里会触发属性的getter，从而添加订阅者
    Dep.target = null;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(key)</span> </span>{
    Dep.target = <span class="hljs-keyword">this</span>;
    <span class="hljs-keyword">this</span>.value = data[key]; <span class="hljs-comment">// 这里会触发属性的getter，从而添加订阅者</span>
    Dep.target = <span class="hljs-literal">null</span>;
}</code></pre>
<p>}<br>这里已经实现了一个Observer了，已经具备了监听数据和数据变化通知订阅者的功能，完整代码。那么接下来就是实现Compile了</p>
<p>2、实现Compile</p>
<p>compile主要做的事情是解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图，如图所示： </p>
<p>因为遍历解析的过程有多次操作dom节点，为提高性能和效率，会先将跟节点el转换成文档碎片fragment进行解析编译操作，解析完成，再将fragment添加回原来的真实dom节点中</p>
<p>function Compile(el) {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$el = this.isElementNode(el) ? el : document.querySelector(el);
if (this.$el) {
    this.$fragment = this.node2Fragment(this.$el);
    this.init();
    this.$el.appendChild(this.$fragment);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">this</span>.$el = <span class="hljs-keyword">this</span>.isElementNode(el) ? el : document.querySelector(el);
<span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.$el) {
    <span class="hljs-keyword">this</span>.$fragment = <span class="hljs-keyword">this</span>.node2Fragment(<span class="hljs-keyword">this</span>.$el);
    <span class="hljs-keyword">this</span>.init();
    <span class="hljs-keyword">this</span>.$el.appendChild(<span class="hljs-keyword">this</span>.$fragment);
}</code></pre>
<p>}<br>Compile.prototype = {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="init: function() { this.compileElement(this.$fragment); },
node2Fragment: function(el) {
    var fragment = document.createDocumentFragment(), child;
    // 将原生节点拷贝到fragment
    while (child = el.firstChild) {
        fragment.appendChild(child);
    }
    return fragment;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>init: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ <span class="hljs-keyword">this</span>.compileElement(<span class="hljs-keyword">this</span>.$fragment); },
<span class="hljs-attr">node2Fragment</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">el</span>) </span>{
    <span class="hljs-keyword">var</span> fragment = <span class="hljs-built_in">document</span>.createDocumentFragment(), child;
    <span class="hljs-comment">// 将原生节点拷贝到fragment</span>
    <span class="hljs-keyword">while</span> (child = el.firstChild) {
        fragment.appendChild(child);
    }
    <span class="hljs-keyword">return</span> fragment;
}</code></pre>
<p>};<br>compileElement方法将遍历所有节点及其子节点，进行扫描解析编译，调用对应的指令渲染函数进行数据渲染，并调用对应的指令更新函数进行绑定，详看代码及注释说明：</p>
<p>Compile.prototype = {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ... 省略
compileElement: function(el) {
    var childNodes = el.childNodes, me = this;
    [].slice.call(childNodes).forEach(function(node) {
        var text = node.textContent;
        var reg = /\{\{(.*)\}\}/;   // 表达式文本
        // 按元素节点方式编译
        if (me.isElementNode(node)) {
            me.compile(node);
        } else if (me.isTextNode(node) &amp;&amp; reg.test(text)) {
            me.compileText(node, RegExp.$1);
        }
        // 遍历编译子节点
        if (node.childNodes &amp;&amp; node.childNodes.length) {
            me.compileElement(node);
        }
    });
},

compile: function(node) {
    var nodeAttrs = node.attributes, me = this;
    [].slice.call(nodeAttrs).forEach(function(attr) {
        // 规定：指令以 v-xxx 命名
        // 如 <span v-text=&quot;content&quot;></span> 中指令为 v-text
        var attrName = attr.name;   // v-text
        if (me.isDirective(attrName)) {
            var exp = attr.value; // content
            var dir = attrName.substring(2);    // text
            if (me.isEventDirective(dir)) {
                // 事件指令, 如 v-on:click
                compileUtil.eventHandler(node, me.$vm, exp, dir);
            } else {
                // 普通指令
                compileUtil[dir] &amp;&amp; compileUtil[dir](node, me.$vm, exp);
            }
        }
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>// ... 省略
compileElement: function(el) {
    var childNodes = el.childNodes, me = this;
    [].slice.call(childNodes).forEach(function(<span class="hljs-keyword">node</span><span class="hljs-title">) {
        var</span> text = <span class="hljs-keyword">node</span>.<span class="hljs-title">textContent</span>;
        var reg = /\{\{(.*)\}\}/;   // 表达式文本
        // 按元素节点方式编译
        if (me.isElementNode(<span class="hljs-keyword">node</span><span class="hljs-title">)) {
            me</span>.compile(<span class="hljs-keyword">node</span><span class="hljs-title">);
        } else</span> if (me.isTextNode(<span class="hljs-keyword">node</span><span class="hljs-title">) &amp;&amp; reg</span>.test(text)) {
            me.compileText(<span class="hljs-keyword">node</span><span class="hljs-title">, RegExp</span>.$<span class="hljs-number">1</span>);
        }
        // 遍历编译子节点
        if (<span class="hljs-keyword">node</span>.<span class="hljs-title">childNodes</span> &amp;&amp; <span class="hljs-keyword">node</span>.<span class="hljs-title">childNodes</span>.length) {
            me.compileElement(<span class="hljs-keyword">node</span><span class="hljs-title">);
        }
    });
},

compile</span>: function(<span class="hljs-keyword">node</span><span class="hljs-title">) {
    var</span> nodeAttrs = <span class="hljs-keyword">node</span>.<span class="hljs-title">attributes</span>, me = this;
    [].slice.call(nodeAttrs).forEach(function(attr) {
        // 规定：指令以 v-xxx 命名
        // 如 <span class="hljs-tag">&lt;span v-text="content"&gt;</span><span class="hljs-tag">&lt;/span&gt;</span> 中指令为 v-text
        var attrName = attr.name;   // v-text
        if (me.isDirective(attrName)) {
            var exp = attr.value; // content
            var dir = attrName.substring(<span class="hljs-number">2</span>);    // text
            if (me.isEventDirective(dir)) {
                // 事件指令, 如 v-on:click
                compileUtil.eventHandler(<span class="hljs-keyword">node</span><span class="hljs-title">, me</span>.$vm, exp, dir);
            } else {
                // 普通指令
                compileUtil[dir] &amp;&amp; compileUtil[dir](<span class="hljs-keyword">node</span><span class="hljs-title">, me</span>.$vm, exp);
            }
        }
    });
}</code></pre>
<p>};</p>
<p>// 指令处理集合<br>var compileUtil = {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="text: function(node, vm, exp) {
    this.bind(node, vm, exp, 'text');
},
// ...省略
bind: function(node, vm, exp, dir) {
    var updaterFn = updater[dir + 'Updater'];
    // 第一次初始化视图
    updaterFn &amp;&amp; updaterFn(node, vm[exp]);
    // 实例化订阅者，此操作会在对应的属性消息订阅器中添加了该订阅者watcher
    new Watcher(vm, exp, function(value, oldValue) {
        // 一旦属性值有变化，会收到通知执行此更新函数，更新视图
        updaterFn &amp;&amp; updaterFn(node, value, oldValue);
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>text: function(<span class="hljs-keyword">node</span><span class="hljs-title">, vm</span>, exp) {
    this.bind(<span class="hljs-keyword">node</span><span class="hljs-title">, vm</span>, exp, 'text');
},
// ...省略
bind: function(<span class="hljs-keyword">node</span><span class="hljs-title">, vm</span>, exp, dir) {
    var updaterFn = updater[dir + 'Updater'];
    // 第一次初始化视图
    updaterFn &amp;&amp; updaterFn(<span class="hljs-keyword">node</span><span class="hljs-title">, vm</span>[exp]);
    // 实例化订阅者，此操作会在对应的属性消息订阅器中添加了该订阅者watcher
    new Watcher(vm, exp, function(value, oldValue) {
        // 一旦属性值有变化，会收到通知执行此更新函数，更新视图
        updaterFn &amp;&amp; updaterFn(<span class="hljs-keyword">node</span><span class="hljs-title">, value</span>, oldValue);
    });
}</code></pre>
<p>};</p>
<p>// 更新函数<br>var updater = {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="textUpdater: function(node, value) {
    node.textContent = typeof value == 'undefined' ? '' : value;
}
// ...省略" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>textUpdater: function(<span class="hljs-keyword">node</span><span class="hljs-title">, value</span>) {
    <span class="hljs-keyword">node</span>.<span class="hljs-title">textContent</span> = typeof value == 'undefined' ? '' : value;
}
// ...省略</code></pre>
<p>};<br>这里通过递归遍历保证了每个节点及子节点都会解析编译到，包括了"{{""}}"表达式声明的文本节点。指令的声明规定是通过特定前缀的节点属性来标记，如&lt;span v-text="content" other-attr中v-text便是指令，而other-attr不是指令，只是普通的属性。 监听数据、绑定更新函数的处理是在compileUtil.bind()这个方法中，通过new Watcher()添加回调来接收数据变化的通知</p>
<p>至此，一个简单的Compile就完成了，完整代码。接下来要看看Watcher这个订阅者的具体实现了</p>
<p>3、实现Watcher</p>
<p>Watcher订阅者作为Observer和Compile之间通信的桥梁，主要做的事情是: 1、在自身实例化时往属性订阅器(dep)里面添加自己 2、自身必须有一个update()方法 3、待属性变动dep.notice()通知时，能调用自身的update()方法，并触发Compile中绑定的回调，则功成身退。 如果有点乱，可以回顾下前面的思路整理</p>
<p>function Watcher(vm, exp, cb) {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.cb = cb;
this.vm = vm;
this.exp = exp;
// 此处为了触发属性的getter，从而在dep添加自己，结合Observer更易理解
this.value = this.get(); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">this</span>.cb = cb;
<span class="hljs-keyword">this</span>.vm = vm;
<span class="hljs-keyword">this</span>.exp = exp;
<span class="hljs-comment">// 此处为了触发属性的getter，从而在dep添加自己，结合Observer更易理解</span>
<span class="hljs-keyword">this</span>.value = <span class="hljs-keyword">this</span>.<span class="hljs-keyword">get</span>(); </code></pre>
<p>}<br>Watcher.prototype = {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="update: function() {
    this.run(); // 属性值变化收到通知
},
run: function() {
    var value = this.get(); // 取到最新值
    var oldVal = this.value;
    if (value !== oldVal) {
        this.value = value;
        this.cb.call(this.vm, value, oldVal); // 执行Compile中绑定的回调，更新视图
    }
},
get: function() {
    Dep.target = this;  // 将当前订阅者指向自己
    var value = this.vm[exp];   // 触发getter，添加自己到属性订阅器中
    Dep.target = null;  // 添加完毕，重置
    return value;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>update: function() {
    <span class="hljs-keyword">this</span>.run(); <span class="hljs-comment">// 属性值变化收到通知</span>
},
run: function() {
    <span class="hljs-keyword">var</span> value = <span class="hljs-keyword">this</span>.<span class="hljs-keyword">get</span>(); <span class="hljs-comment">// 取到最新值</span>
    <span class="hljs-keyword">var</span> oldVal = <span class="hljs-keyword">this</span>.value;
    <span class="hljs-keyword">if</span> (value !== oldVal) {
        <span class="hljs-keyword">this</span>.value = value;
        <span class="hljs-keyword">this</span>.cb.call(<span class="hljs-keyword">this</span>.vm, value, oldVal); <span class="hljs-comment">// 执行Compile中绑定的回调，更新视图</span>
    }
},
<span class="hljs-keyword">get</span>: function() {
    Dep.target = <span class="hljs-keyword">this</span>;  <span class="hljs-comment">// 将当前订阅者指向自己</span>
    <span class="hljs-keyword">var</span> value = <span class="hljs-keyword">this</span>.vm[exp];   <span class="hljs-comment">// 触发getter，添加自己到属性订阅器中</span>
    Dep.target = <span class="hljs-literal">null</span>;  <span class="hljs-comment">// 添加完毕，重置</span>
    <span class="hljs-keyword">return</span> value;
}</code></pre>
<p>};<br>// 这里再次列出Observer和Dep，方便理解<br>Object.defineProperty(data, key, {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="get: function() {
    // 由于需要在闭包内添加watcher，所以可以在Dep定义一个全局target属性，暂存watcher, 添加完移除
    Dep.target &amp;&amp; dep.addDep(Dep.target);
    return val;
}
// ... 省略" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> </span>{
    <span class="hljs-comment">// 由于需要在闭包内添加watcher，所以可以在Dep定义一个全局target属性，暂存watcher, 添加完移除</span>
    Dep.target &amp;&amp; dep.addDep(Dep.target);
    <span class="hljs-keyword">return</span> val;
}
<span class="hljs-comment">// ... 省略</span></code></pre>
<p>});<br>Dep.prototype = {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="notify: function() {
    this.subs.forEach(function(sub) {
        sub.update(); // 调用订阅者的update方法，通知变化
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs perl"><code>notify: function() {
    this.subs.forEach(function(<span class="hljs-function"><span class="hljs-keyword">sub</span>) </span>{
        <span class="hljs-function"><span class="hljs-keyword">sub</span>.<span class="hljs-title">update</span></span>(); // 调用订阅者的update方法，通知变化
    });
}</code></pre>
<p>};<br>实例化Watcher的时候，调用get()方法，通过Dep.target = watcherInstance标记订阅者是当前watcher实例，强行触发属性定义的getter方法，getter方法执行的时候，就会在属性的订阅器dep添加当前watcher实例，从而在属性值有变化的时候，watcherInstance就能收到更新通知。</p>
<p>ok, Watcher也已经实现了，完整代码。 基本上vue中数据绑定相关比较核心的几个模块也是这几个，猛戳这里 , 在src 目录可找到vue源码。</p>
<p>最后来讲讲MVVM入口文件的相关逻辑和实现吧，相对就比较简单了~</p>
<p>4、实现MVVM</p>
<p>MVVM作为数据绑定的入口，整合Observer、Compile和Watcher三者，通过Observer来监听自己的model数据变化，通过Compile来解析编译模板指令，最终利用Watcher搭起Observer和Compile之间的通信桥梁，达到数据变化 -&gt; 视图更新；视图交互变化(input) -&gt; 数据model变更的双向绑定效果。</p>
<p>一个简单的MVVM构造器是这样子：</p>
<p>function MVVM(options) {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$options = options;
var data = this._data = this.$options.data;
observe(data, this);
this.$compile = new Compile(options.el || document.body, this)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">this</span>.$options = options;
<span class="hljs-keyword">var</span> <span class="hljs-keyword">data</span> = <span class="hljs-keyword">this</span>._data = <span class="hljs-keyword">this</span>.$options.<span class="hljs-keyword">data</span>;
observe(<span class="hljs-keyword">data</span>, <span class="hljs-keyword">this</span>);
<span class="hljs-keyword">this</span>.$compile = new Compile(options.el || document.body, <span class="hljs-keyword">this</span>)</code></pre>
<p>}<br>但是这里有个问题，从代码中可看出监听的数据对象是options.data，每次需要更新视图，则必须通过var vm = new MVVM({data:{name: 'kindeng'"}}"); vm._data.name = 'dmq';这样的方式来改变数据。</p>
<p>显然不符合我们一开始的期望，我们所期望的调用方式应该是这样的： var vm = new MVVM({data: {name: 'kindeng'"}}"); vm.name = 'dmq';</p>
<p>所以这里需要给MVVM实例添加一个属性代理的方法，使访问vm的属性代理为访问vm._data的属性，改造后的代码如下：</p>
<p>function MVVM(options) {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.$options = options;
var data = this._data = this.$options.data, me = this;
// 属性代理，实现 vm.xxx -> vm._data.xxx
Object.keys(data).forEach(function(key) {
    me._proxy(key);
});
observe(data, this);
this.$compile = new Compile(options.el || document.body, this)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">this</span>.$options = options;
<span class="hljs-keyword">var</span> <span class="hljs-keyword">data</span> = <span class="hljs-keyword">this</span>._data = <span class="hljs-keyword">this</span>.$options.<span class="hljs-keyword">data</span>, me = <span class="hljs-keyword">this</span>;
<span class="hljs-comment">// 属性代理，实现 vm.xxx -&gt; vm._data.xxx</span>
Object.keys(<span class="hljs-keyword">data</span>).forEach(function(key) {
    me._proxy(key);
});
observe(<span class="hljs-keyword">data</span>, <span class="hljs-keyword">this</span>);
<span class="hljs-keyword">this</span>.$compile = new Compile(options.el || document.body, <span class="hljs-keyword">this</span>)</code></pre>
<p>}</p>
<p>MVVM.prototype = {</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="_proxy: function(key) {
    var me = this;
    Object.defineProperty(me, key, {
        configurable: false,
        enumerable: true,
        get: function proxyGetter() {
            return me._data[key];
        },
        set: function proxySetter(newVal) {
            me._data[key] = newVal;
        }
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>_proxy: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(key)</span> </span>{
    <span class="hljs-keyword">var</span> me = <span class="hljs-keyword">this</span>;
    Object.defineProperty(me, key, {
        configurable: <span class="hljs-literal">false</span>,
        enumerable: <span class="hljs-literal">true</span>,
        <span class="hljs-keyword">get</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">proxyGetter</span><span class="hljs-params">()</span> </span>{
            <span class="hljs-keyword">return</span> me._data[key];
        },
        <span class="hljs-keyword">set</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">proxySetter</span><span class="hljs-params">(newVal)</span> </span>{
            me._data[key] = newVal;
        }
    });
}</code></pre>
<p>};</p>
<p>这里主要还是利用了Object.defineProperty()这个方法来劫持了vm实例对象的属性的读写权，使读写vm实例的属性转成读写了vm._data的属性值，达到鱼目混珠的效果，哈哈</p>
<p>至此，全部模块和功能已经完成了，如本文开头所承诺的两点。一个简单的MVVM模块已经实现，其思想和原理大部分来自经过简化改造的vue源码，猛戳这里可以看到本文的所有相关代码。 由于本文内容偏实践，所以代码量较多，且不宜列出大篇幅代码，所以建议想深入了解的童鞋可以再次结合本文源代码来进行阅读，这样会更加容易理解和掌握。</p>
<p>总结</p>
<p>本文主要围绕“几种实现双向绑定的做法”、“实现Observer”、“实现Compile”、“实现Watcher”、“实现MVVM”这几个模块来阐述了双向绑定的原理和实现。并根据思路流程渐进梳理讲解了一些细节思路和比较关键的内容点，以及通过展示部分关键代码讲述了怎样一步步实现一个双向绑定MVVM。文中肯定会有一些不够严谨的思考和错误，欢迎大家指正，有兴趣欢迎一起探讨和改进~</p>
<p>最后，感谢您的阅读！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
剖析Vue实现原理 - 如何实现双向绑定mvvm（转载）

## 原文链接
[https://segmentfault.com/a/1190000008685081](https://segmentfault.com/a/1190000008685081)

