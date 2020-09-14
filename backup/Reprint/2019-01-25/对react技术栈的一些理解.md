---
title: '对react技术栈的一些理解' 
date: 2019-01-25 2:30:24
hidden: true
slug: wauj2axq1i
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">目的</h2>
<p>本篇文章主要帮助大家了解下<code>react</code>技术栈相关的概念，以及为什么我们需要引入这些，他们能解决什么问题。</p>
<h2 id="articleHeader1">React</h2>
<h3 id="articleHeader2">为什么选择react，而不是vue2</h3>
<h4>vue2的优点</h4>
<p><code>vue1</code>没有加入虚拟<code>DOM</code>，做服务端渲染很难，所以<code>vue2</code>引入了虚拟<code>DOM</code>的机制，而且由于<code>vue2</code>的响应式原理，所以天然的就比<code>react</code>的性能好，<code>react</code>的更新是通过顶层组件的<code>state</code>变化触发整个组件的重新渲染，而<code>vue2</code>由于其是通过<code>getter/setter</code>来进行数据管理，所以可以准确的定位到需要重新渲染的节点，避免了无效的<code>re-render</code></p>
<h3 id="articleHeader3">vue2的缺点</h3>
<p><strong><code>native</code>端支持不好，<code>weex</code>很厉害但是目前只有阿里用于生产环境，而<code>react native</code>有着大量的成熟案例，如手机QQ</strong></p>
<h3 id="articleHeader4">为什么没有选择riot</h3>
<h4>riot的优点</h4>
<p>小，用在移动端很合适</p>
<h4>riot的缺点</h4>
<p>小的缺点很多，但是比较好克服，最大的缺点还是在于<code>native</code>端，如果想用<code>riot</code>实现<code>native</code>端的话，需要造轮子，写就是自己写一套<code> Native Bridge</code>，来进行<code>js</code>与<code>Objective C</code>通信，难度太大，需要引入<code>js引擎</code>等高大上的东西（<code>Native Bridge</code>基本上可以理解为一个浏览器内核，而且肯定是<code>C++</code>写）。</p>
<h3 id="articleHeader5">native的基本原理</h3>
<p>一个线程为<code>js</code>引擎，执行打包好的<code>js</code>，主线程负责<code>UI</code>绘制，<code>js</code>需要绘制<code>UI</code>时会向主线程发出一个命令，主线程接收到命令后执行相应的绘制逻辑，<code>Objective C</code>执行的结果会经过层层回调通过<code>js</code>引擎传回给<code>js</code>。</p>
<h2 id="articleHeader6">redux</h2>
<h3 id="articleHeader7">react + redux的缺点</h3>
<p>利用<code>redux</code>做数据管理的话，<code>redux</code>的<code>store</code>会被放置到最顶层组件的<code>state</code>中，也就是<code>react-redux</code>为我们提供的<code>Provider</code>组件。这样就是意味着每次<code>store</code>发生变化就会重新渲染整个应用，也就是触发所有组件的<code>render</code>方法，每次都会触发<code>diff</code>，但是这种大多是无意义的，这也是产生性能瓶颈的地方：</p>
<p><span class="img-wrap"><img data-src="/img/bVJMFq?w=928&amp;h=422" src="https://static.alili.tech/img/bVJMFq?w=928&amp;h=422" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>如下面代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render() {
    const { child1Data, child2Data } = this.props.store;
    return (
        <div>
            <Child1 data=&quot;child1Data&quot; />
            <Child2 data=&quot;child2Data&quot; />
        </div>
    );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">render() {
    <span class="hljs-keyword">const</span> { child1Data, child2Data } = <span class="hljs-keyword">this</span>.props.store;
    <span class="hljs-keyword">return</span> (
        &lt;div&gt;
            &lt;Child1 data="child1Data" /&gt;
            &lt;Child2 data="child2Data" /&gt;
        &lt;/div&gt;
    );
}</code></pre>
<p>假如只有<code>child1Data</code>发生变化，而<code>child2Data</code>并没有发生变化，理论上来说我们只想触发<code>Child1</code>的<code>render</code>，但事实上我们同时会触发<code>Child2</code>的<code>render</code>，这次显然是无意义的，所以需要来解决这个问题。</p>
<h3 id="articleHeader8">引入purerender</h3>
<p><code>react</code>的生命周期函数中有一个<code>shouldComponentUpdate</code>，根据其返回的值来决定是否需要来触发组件的<code>render</code>，<code>shouldComponentUpdate</code>默认返回的是<code>true</code>，也就是无论什么情况都会触发<code>render</code>，<code>purerender</code>改善的就是这个生命周期，根据传入的<code>state</code>和<code>props</code>来进行简单的判断，从而决定是否需要进行<code>render</code>，为什么说只是进行了简单的判断，来看其判断部分代码：<br>（注：<strong>利用connect将组件与<code>redux</code>关联起来的容器不需要加<code>purerender</code> ，因为这个工作<code>react-redux</code>已经替我们做好了</strong>）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// is可以理解为Object.is()
function shallowEqual(objA, objB) {
    if (is(objA, objB)) {
        return true;
    }
    // 非引用类型,且不相等直接返回
    if (typeof objA !== 'object' || objA === null ||
        typeof objB !== 'object' || objB === null) {
        return false;
    }
    const keysA = Object.keys(objA),
        keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
        return false;
    }
    // 问题所在,仅仅是比较了第一层,假设引用没变,不会触发更新
    for (let i = 0; i < keysA.length; i++) {
        if (
            !hasOwnProperty.call(objB, keysA[i]) ||
            !is(objA[keysA[i]], objB[keysB][i])
        ) {
            return false;
        }
    }
    return true;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// is可以理解为Object.is()</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">shallowEqual</span>(<span class="hljs-params">objA, objB</span>) </span>{
    <span class="hljs-keyword">if</span> (is(objA, objB)) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
    }
    <span class="hljs-comment">// 非引用类型,且不相等直接返回</span>
    <span class="hljs-keyword">if</span> (<span class="hljs-keyword">typeof</span> objA !== <span class="hljs-string">'object'</span> || objA === <span class="hljs-literal">null</span> ||
        <span class="hljs-keyword">typeof</span> objB !== <span class="hljs-string">'object'</span> || objB === <span class="hljs-literal">null</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
    <span class="hljs-keyword">const</span> keysA = <span class="hljs-built_in">Object</span>.keys(objA),
        keysB = <span class="hljs-built_in">Object</span>.keys(objB);

    <span class="hljs-keyword">if</span> (keysA.length !== keysB.length) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
    <span class="hljs-comment">// 问题所在,仅仅是比较了第一层,假设引用没变,不会触发更新</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; keysA.length; i++) {
        <span class="hljs-keyword">if</span> (
            !hasOwnProperty.call(objB, keysA[i]) ||
            !is(objA[keysA[i]], objB[keysB][i])
        ) {
            <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
        }
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>;
}</code></pre>
<p>注意：<strong>使用<code>react</code>时一定注意不要在<code>render</code>函数中进行函数的<code>bind</code>，因为这样每次<code>props</code>中会有属性的引用改变，一定会触发更新</strong></p>
<p>对于一般的情况来说<code>purerender</code>已经足够，可以减少一些<code>re-render</code>，但是不是很彻底，比如：</p>
<ul><li><p>情况一：</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 之前的数据：
let person = {
    name: 'zp1996',
    age: 21
};
// 改变引用
person = {
    name: 'zp1996',
    age: 21
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 之前的数据：</span>
<span class="hljs-keyword">let</span> person = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'zp1996'</span>,
    <span class="hljs-attr">age</span>: <span class="hljs-number">21</span>
};
<span class="hljs-comment">// 改变引用</span>
person = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'zp1996'</span>,
    <span class="hljs-attr">age</span>: <span class="hljs-number">21</span>
};</code></pre>
<p>（注：上面场景我做了下简化，真实中可能是从服务器端获得的数据，比如帖子列表这种）<br>明显的引用发生了改变，所以会触发<code>re-render</code>，但是明显的是我的数据完全没有变化，根本不用进行<code>diff</code>。</p>
<ul><li><p>情况二：</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const data = {
    person: {
        students: [{
            name: 'zp1996',
            age: 21
        }]
    }
};
// 加入一个新的学生，数据结构会变成这样
{
    person: {
        students: [{
            name: 'zp1996',
            age: 20
        }, {
            name: 'zpy',
            age: 21
        }]
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> data = {
    <span class="hljs-attr">person</span>: {
        <span class="hljs-attr">students</span>: [{
            <span class="hljs-attr">name</span>: <span class="hljs-string">'zp1996'</span>,
            <span class="hljs-attr">age</span>: <span class="hljs-number">21</span>
        }]
    }
};
<span class="hljs-comment">// 加入一个新的学生，数据结构会变成这样</span>
{
    <span class="hljs-attr">person</span>: {
        <span class="hljs-attr">students</span>: [{
            <span class="hljs-attr">name</span>: <span class="hljs-string">'zp1996'</span>,
            <span class="hljs-attr">age</span>: <span class="hljs-number">20</span>
        }, {
            <span class="hljs-attr">name</span>: <span class="hljs-string">'zpy'</span>,
            <span class="hljs-attr">age</span>: <span class="hljs-number">21</span>
        }]
    }
}</code></pre>
<p>假如是这种情况，引用根本没有发生变化，所以就不会触发<code>re-render</code>，每次改变一个小的地方，就需要将整个的数据重新生成一个，这样造成了内存的不必要的浪费。</p>
<h3 id="articleHeader9">利用immutable解决</h3>
<p>很容易想到的是在<code>shouldComponentUpdate</code>中进行深度比较，用递归的方式来进行比较，这样的代价同样很大，并不是一个有效的解决方案。为了解决这个问题，需要引入另一个库——<code>immutable</code>，其思想是强调不可变数据，一个<code>Immutable Data</code>的创建就是一个不可变的，需要变化时不是利用深拷贝，而是仅仅改变这个变化的节点和其父节点，其余节点仍是共享内存。同样的这样的一个强大的框架也是非常大，压缩过后仍然有<code>50k</code>。</p>
<h3 id="articleHeader10">还有问题吗？</h3>
<p>我们希望的是<code>reducer</code>中保持简单，从服务端请求回来的数据直接存在<code>store</code>中，看个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 从服务端拉回来的数据
{
    students: {
        'id_111': {
            name: 'zp1996',
            age: 21
        }
    }
}
// 最终组件希望我们传入这样的数据
{
    students: [{
        name: 'zp1996',
        age: 21,
        id: 'id_111'
    }]
}
// 一般会在connect中对数据进行整理
const mapStateToProp = state => {
    const { students } = state,
        res = [];
    for (let key in students) {
        if (students.hasOwnProperty(key)) {
            let obj = students[key];
            obj[id] = key;
            res.push(obj);
        }
    }  
    return res;  
};
@connect(
    mapStateToProp,   // 被叫做selector 
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 从服务端拉回来的数据</span>
{
    <span class="hljs-attr">students</span>: {
        <span class="hljs-string">'id_111'</span>: {
            <span class="hljs-attr">name</span>: <span class="hljs-string">'zp1996'</span>,
            <span class="hljs-attr">age</span>: <span class="hljs-number">21</span>
        }
    }
}
<span class="hljs-comment">// 最终组件希望我们传入这样的数据</span>
{
    <span class="hljs-attr">students</span>: [{
        <span class="hljs-attr">name</span>: <span class="hljs-string">'zp1996'</span>,
        <span class="hljs-attr">age</span>: <span class="hljs-number">21</span>,
        <span class="hljs-attr">id</span>: <span class="hljs-string">'id_111'</span>
    }]
}
<span class="hljs-comment">// 一般会在connect中对数据进行整理</span>
<span class="hljs-keyword">const</span> mapStateToProp = <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> { students } = state,
        res = [];
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> key <span class="hljs-keyword">in</span> students) {
        <span class="hljs-keyword">if</span> (students.hasOwnProperty(key)) {
            <span class="hljs-keyword">let</span> obj = students[key];
            obj[id] = key;
            res.push(obj);
        }
    }  
    <span class="hljs-keyword">return</span> res;  
};
@connect(
    mapStateToProp,   <span class="hljs-comment">// 被叫做selector </span>
);</code></pre>
<p>每次<code>store</code>变化后，也就是执行一次<code>dispatch</code>之后都会执行利用<code>subscribe</code>方法注册的回调（注册的回调就是<code>connect</code>的第一个参数，也就是<code>selector</code>），这样就意味着，尽管<code>students</code>并没有发生变化还是会触发一次数据结构的重整，这种显然是一种浪费，所以这个过程也需要优化：</p>
<p><span class="img-wrap"><img data-src="/img/bVJM4z?w=1127&amp;h=662" src="https://static.alili.tech/img/bVJM4z?w=1127&amp;h=662" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><code>redux</code>强调的是函数式编程，对于函数式编程来说有一个很明显的特点就是易于缓存，对于一个函数而言，给定相同的输入肯定会得到相同的输出，而<code>selector</code>也全部为纯函数，同时<code>connect</code>的<code>mapStateToProp</code>参数也支持返回一个函数。<code>reselect</code>库就是这个思想，先来看看基本用法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// createSelector的最后一个参数作为计算函数
const state = { num: 10 },
    selector = state => state.num,
    reSelector = createSelector(
        selector,
        a => {
            console.log('被调用了')
            return a * a;
        }
    );

console.log(reSelector(state));    // 第一次计算
console.log(reSelector(state));    // 拿缓存
console.log(reSelector(state));    // 拿缓存
state.num = 100;
console.log(reSelector(state));    // 值发生改变,计算
console.log(reSelector(state));    // 拿缓存   
console.log(reSelector(state));    // 拿缓存       " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>// createSelector的最后一个参数作为计算函数
const <span class="hljs-keyword">state</span> = { num: <span class="hljs-number">10</span> },
    selector = <span class="hljs-keyword">state</span> =&gt; <span class="hljs-keyword">state</span>.num,
    reSelector = createSelector(
        selector,
        a =&gt; {
            console.<span class="hljs-keyword">log</span>('被调用了')
            return a * a;
        }
    );

console.<span class="hljs-keyword">log</span>(reSelector(<span class="hljs-keyword">state</span>));    // 第一次计算
console.<span class="hljs-keyword">log</span>(reSelector(<span class="hljs-keyword">state</span>));    // 拿缓存
console.<span class="hljs-keyword">log</span>(reSelector(<span class="hljs-keyword">state</span>));    // 拿缓存
<span class="hljs-keyword">state</span>.num = <span class="hljs-number">100</span>;
console.<span class="hljs-keyword">log</span>(reSelector(<span class="hljs-keyword">state</span>));    // 值发生改变,计算
console.<span class="hljs-keyword">log</span>(reSelector(<span class="hljs-keyword">state</span>));    // 拿缓存   
console.<span class="hljs-keyword">log</span>(reSelector(<span class="hljs-keyword">state</span>));    // 拿缓存       </code></pre>
<p>实现也是非常简单，就是对传入的参数进行判断，如果与之前一样则直接返回结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function defaultMemoize(func, equalityCheck = defaultEqualityCheck) {
    let lastArgs = null,    
        lastResult = null;
    const isEqualToLastArg = (value, index) => equalityCheck(value, lastArgs[index]);
    return (...args) => {
        // 检测输入是否相等，不等或者第一次执行的话执行函数，反之拿之间的结果
        if (
            lastArgs === null ||
            lastArgs.length !== args.length ||
            !args.every(isEqualToLastArg)
        ) {
            lastResult = func(...args);
        }
        lastArgs = args;
        return lastResult;
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defaultMemoize</span>(<span class="hljs-params">func, equalityCheck = defaultEqualityCheck</span>) </span>{
    <span class="hljs-keyword">let</span> lastArgs = <span class="hljs-literal">null</span>,    
        lastResult = <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">const</span> isEqualToLastArg = <span class="hljs-function">(<span class="hljs-params">value, index</span>) =&gt;</span> equalityCheck(value, lastArgs[index]);
    <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">...args</span>) =&gt;</span> {
        <span class="hljs-comment">// 检测输入是否相等，不等或者第一次执行的话执行函数，反之拿之间的结果</span>
        <span class="hljs-keyword">if</span> (
            lastArgs === <span class="hljs-literal">null</span> ||
            lastArgs.length !== args.length ||
            !args.every(isEqualToLastArg)
        ) {
            lastResult = func(...args);
        }
        lastArgs = args;
        <span class="hljs-keyword">return</span> lastResult;
    };
}</code></pre>
<h2 id="articleHeader11">redux太复杂？尝试mobx</h2>
<p><code>redux</code>会引入很多的概念，同时代码量也会很多，而<code>mobx</code>要更为简单。<code>mobx</code>给我的感觉就像是把<code>vue</code>的响应式数据那一套给拿了出来，给了我们极大的自由度，可以利用<code>OOP</code>那一套来建立模型，而用<code>redux</code>必须利用<code>redux</code>的那些套路写代码；同时在性能上也会有一些提升。但是同时也会带来很大的问题：<code>state</code>满天飞是避免不了的，但是提供了一个<code>strict</code>模式，要求数据必须利用<code>action</code>来进行更改，<strong>但是我用了之后发现并没有什么作用，而且组件外是可以随意更改数据的。</strong> 还有一个小问题就是热更新，根本没有找到热更新的解决方案，每次还得手动刷新页面。</p>
<h2 id="articleHeader12">最后</h2>
<p><code>redux</code>还有一块很重要的部分，那就是异步处理，目前本人只用过<code>redux-thunk</code>，所以关于这个方面没（水）有（平）讲（不）到（够），同时哪里有错误也请大家指出。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
对react技术栈的一些理解

## 原文链接
[https://segmentfault.com/a/1190000008491558](https://segmentfault.com/a/1190000008491558)

