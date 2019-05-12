---
title: '从零开始实现一个React（四）：异步的setState' 
date: 2018-12-05 2:30:09
hidden: true
slug: ity57357r7c
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>在<a href="https://github.com/hujiulong/blog/issues/6" rel="nofollow noreferrer" target="_blank">上一篇文章</a>中，我们实现了diff算法，性能有非常大的改进。但是文章末尾也指出了一个问题：按照目前的实现，每次调用setState都会触发更新，如果组件内执行这样一段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="for ( let i = 0; i < 100; i++ ) {
    this.setState( { num: this.state.num + 1 } );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">for</span> ( <span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">100</span>; i++ ) {
    <span class="hljs-keyword">this</span>.setState( { <span class="hljs-attr">num</span>: <span class="hljs-keyword">this</span>.state.num + <span class="hljs-number">1</span> } );
}</code></pre>
<p>那么执行这段代码会导致这个组件被重新渲染100次，这对性能是一个非常大的负担。</p>
<h1 id="articleHeader1">真正的React是怎么做的</h1>
<p>React显然也遇到了这样的问题，所以针对setState做了一些特别的优化：React会将多个setState的调用合并成一个来执行，这意味着当调用setState时，state并不会立即更新，举个栗子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class App extends Component {
    constructor() {
        super();
        this.state = {
            num: 0
        }
    }
    componentDidMount() {
        for ( let i = 0; i < 100; i++ ) {
            this.setState( { num: this.state.num + 1 } );
            console.log( this.state.num );    // 会输出什么？
        }
    }
    render() {
        return (
            <div className=&quot;App&quot;>
                <h1>{ this.state.num }</h1>
            </div>
        );
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>() {
        <span class="hljs-keyword">super</span>();
        <span class="hljs-keyword">this</span>.state = {
            <span class="hljs-attr">num</span>: <span class="hljs-number">0</span>
        }
    }
    componentDidMount() {
        <span class="hljs-keyword">for</span> ( <span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">100</span>; i++ ) {
            <span class="hljs-keyword">this</span>.setState( { <span class="hljs-attr">num</span>: <span class="hljs-keyword">this</span>.state.num + <span class="hljs-number">1</span> } );
            <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span>.state.num );    <span class="hljs-comment">// 会输出什么？</span>
        }
    }
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"App"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{ this.state.num }<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        );
    }
}</code></pre>
<p>我们定义了一个<code>App</code>组件，在组件挂载后，会循环100次，每次让<code>this.state.num</code>增加1，我们用真正的React来渲染这个组件，看看结果：</p>
<p><span class="img-wrap"><img data-src="/img/bV8A33?w=403&amp;h=148" src="https://static.alili.tech/img/bV8A33?w=403&amp;h=148" alt="38770037-3587b81c-403f-11e8-8f99-4f8a4427e205.png" title="38770037-3587b81c-403f-11e8-8f99-4f8a4427e205.png" style="cursor: pointer; display: inline;"></span></p>
<p>组件渲染的结果是1，并且在控制台中输出了100次0，说明每个循环中，拿到的state仍然是更新之前的。</p>
<p>这是React的优化手段，但是显然它也会在导致一些不符合直觉的问题（就如上面这个例子），所以针对这种情况，React给出了一种解决方案：setState接收的参数还可以是一个函数，在这个函数中可以拿先前的状态，并通过这个函数的返回值得到下一个状态。</p>
<p>我们可以通过这种方式来修正App组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentDidMount() {
    for ( let i = 0; i < 100; i++ ) {
        this.setState( prevState => {
            console.log( prevState.num );
            return {
                num: prevState.num + 1
            }
        } );
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">componentDidMount() {
    <span class="hljs-keyword">for</span> ( <span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">100</span>; i++ ) {
        <span class="hljs-keyword">this</span>.setState( <span class="hljs-function"><span class="hljs-params">prevState</span> =&gt;</span> {
            <span class="hljs-built_in">console</span>.log( prevState.num );
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">num</span>: prevState.num + <span class="hljs-number">1</span>
            }
        } );
    }
}</code></pre>
<blockquote>这种用法是不是很像数组的<code>reduce</code>方法？</blockquote>
<p>现在来看看App组件的渲染结果：<br><span class="img-wrap"><img data-src="/img/bV8A34?w=334&amp;h=290" src="https://static.alili.tech/img/bV8A34?w=334&amp;h=290" alt="38770164-fbeef622-4040-11e8-9680-958394f9bb9e.png" title="38770164-fbeef622-4040-11e8-9680-958394f9bb9e.png" style="cursor: pointer; display: inline;"></span><br>现在终于能得到我们想要的结果了。</p>
<p>所以，这篇文章的目标也明确了，<strong>我们要实现以下两个功能</strong>：</p>
<ol>
<li>异步更新state，将短时间内的多个setState合并成一个</li>
<li>为了解决异步更新导致的问题，增加另一种形式的setState：接受一个函数作为参数，在函数中可以得到前一个状态并返回下一个状态</li>
</ol>
<h1 id="articleHeader2">合并setState</h1>
<p>回顾一下<a href="https://github.com/hujiulong/blog/issues/5" rel="nofollow noreferrer" target="_blank">第二篇文章</a>中对setState的实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setState( stateChange ) {
    Object.assign( this.state, stateChange );
    renderComponent( this );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">setState( stateChange ) {
    <span class="hljs-built_in">Object</span>.assign( <span class="hljs-keyword">this</span>.state, stateChange );
    renderComponent( <span class="hljs-keyword">this</span> );
}</code></pre>
<p>这种实现，每次调用setState都会更新state并马上渲染一次。</p>
<h2 id="articleHeader3">setState队列</h2>
<p>为了合并setState，我们需要一个队列来保存每次setState的数据，然后在一段时间后，清空这个队列并渲染组件。</p>
<blockquote>队列是一种数据结构，它的特点是“先进先出”，可以通过js数组的push和shift方法模拟</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const queue = [];
function enqueueSetState( stateChange, component ) {
    queue.push( {
        stateChange,
        component
    } );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> queue = [];
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">enqueueSetState</span>(<span class="hljs-params"> stateChange, component </span>) </span>{
    queue.push( {
        stateChange,
        component
    } );
}</code></pre>
<p>然后修改组件的setState方法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setState( stateChange ) {
    enqueueSetState( stateChange, this );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">setState( stateChange ) {
    enqueueSetState( stateChange, <span class="hljs-keyword">this</span> );
}</code></pre>
<p>现在队列是有了，怎么清空队列并渲染组件呢？</p>
<h2 id="articleHeader4">清空队列</h2>
<p>我们定义一个flush方法，它的作用就是清空队列</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function flush() {
    let item;
    // 遍历
    while( item = setStateQueue.shift() ) {

        const { stateChange, component } = item;

        // 如果没有prevState，则将当前的state作为初始的prevState
        if ( !component.prevState ) {
            component.prevState = Object.assign( {}, component.state );
        }

        // 如果stateChange是一个方法，也就是setState的第二种形式
        if ( typeof stateChange === 'function' ) {
            Object.assign( component.state, stateChange( component.prevState, component.props ) );
        } else {
            // 如果stateChange是一个对象，则直接合并到setState中
            Object.assign( component.state, stateChange );
        }

        component.prevState = component.state;

    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">flush</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> item;
    <span class="hljs-comment">// 遍历</span>
    <span class="hljs-keyword">while</span>( item = setStateQueue.shift() ) {

        <span class="hljs-keyword">const</span> { stateChange, component } = item;

        <span class="hljs-comment">// 如果没有prevState，则将当前的state作为初始的prevState</span>
        <span class="hljs-keyword">if</span> ( !component.prevState ) {
            component.prevState = <span class="hljs-built_in">Object</span>.assign( {}, component.state );
        }

        <span class="hljs-comment">// 如果stateChange是一个方法，也就是setState的第二种形式</span>
        <span class="hljs-keyword">if</span> ( <span class="hljs-keyword">typeof</span> stateChange === <span class="hljs-string">'function'</span> ) {
            <span class="hljs-built_in">Object</span>.assign( component.state, stateChange( component.prevState, component.props ) );
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">// 如果stateChange是一个对象，则直接合并到setState中</span>
            <span class="hljs-built_in">Object</span>.assign( component.state, stateChange );
        }

        component.prevState = component.state;

    }
}</code></pre>
<p>这只是实现了state的更新，我们还没有渲染组件。渲染组件不能在遍历队列时进行，因为同一个组件可能会多次添加到队列中，我们需要另一个队列保存所有组件，不同之处是，这个队列内不会有重复的组件。</p>
<p>我们在enqueueSetState时，就可以做这件事</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const queue = [];
const renderQueue = [];
function enqueueSetState( stateChange, component ) {
    queue.push( {
        stateChange,
        component
    } );
    // 如果renderQueue里没有当前组件，则添加到队列中
    if ( !renderQueue.some( item => item === component ) ) {
        renderQueue.push( component );
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> queue = [];
<span class="hljs-keyword">const</span> renderQueue = [];
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">enqueueSetState</span>(<span class="hljs-params"> stateChange, component </span>) </span>{
    queue.push( {
        stateChange,
        component
    } );
    <span class="hljs-comment">// 如果renderQueue里没有当前组件，则添加到队列中</span>
    <span class="hljs-keyword">if</span> ( !renderQueue.some( <span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> item === component ) ) {
        renderQueue.push( component );
    }
}</code></pre>
<p>在flush方法中，我们还需要遍历renderQueue，来渲染每一个组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function flush() {
    let item, component;
    while( item = queue.shift() ) {
        // ...
    }
    // 渲染每一个组件
    while( component = renderQueue.shift() ) {
        renderComponent( component );
    }

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">flush</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> item, component;
    <span class="hljs-keyword">while</span>( item = queue.shift() ) {
        <span class="hljs-comment">// ...</span>
    }
    <span class="hljs-comment">// 渲染每一个组件</span>
    <span class="hljs-keyword">while</span>( component = renderQueue.shift() ) {
        renderComponent( component );
    }

}</code></pre>
<h2 id="articleHeader5">延迟执行</h2>
<p>现在还有一件最重要的事情：什么时候执行flush方法。<br>我们需要合并一段时间内所有的setState，也就是在一段时间后才执行flush方法来清空队列，关键是这个“一段时间“怎么决定。</p>
<p>一个比较好的做法是利用js的事件队列机制。</p>
<p>先来看这样一段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setTimeout( () => {
    console.log( 2 );
}, 0 );
Promise.resolve().then( () => console.log( 1 ) );
console.log( 3 );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">setTimeout( <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-built_in">console</span>.log( <span class="hljs-number">2</span> );
}, <span class="hljs-number">0</span> );
<span class="hljs-built_in">Promise</span>.resolve().then( <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-built_in">console</span>.log( <span class="hljs-number">1</span> ) );
<span class="hljs-built_in">console</span>.log( <span class="hljs-number">3</span> );</code></pre>
<p>你可以打开浏览器的调试工具运行一下，它们打印的结果是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="3
1
2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">3</span>
<span class="hljs-number">1</span>
<span class="hljs-number">2</span></code></pre>
<p>具体的原理可以看<a href="http://www.ruanyifeng.com/blog/2014/10/event-loop.html" rel="nofollow noreferrer" target="_blank">阮一峰的这篇文章</a>，这里就不再赘述了。</p>
<p>我们可以利用事件队列，让flush在所有同步任务后执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function enqueueSetState( stateChange, component ) {
    // 如果queue的长度是0，也就是在上次flush执行之后第一次往队列里添加
    if ( queue.length === 0 ) {
        defer( flush );
    }
    queue.push( {
        stateChange,
        component
    } );
    if ( !renderQueue.some( item => item === component ) ) {
        renderQueue.push( component );
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">enqueueSetState</span>(<span class="hljs-params"> stateChange, component </span>) </span>{
    <span class="hljs-comment">// 如果queue的长度是0，也就是在上次flush执行之后第一次往队列里添加</span>
    <span class="hljs-keyword">if</span> ( queue.length === <span class="hljs-number">0</span> ) {
        defer( flush );
    }
    queue.push( {
        stateChange,
        component
    } );
    <span class="hljs-keyword">if</span> ( !renderQueue.some( <span class="hljs-function"><span class="hljs-params">item</span> =&gt;</span> item === component ) ) {
        renderQueue.push( component );
    }
}</code></pre>
<p>定义defer方法，利用刚才题目中出现的Promise.resolve</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function defer( fn ) {
    return Promise.resolve().then( fn );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defer</span>(<span class="hljs-params"> fn </span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.resolve().then( fn );
}</code></pre>
<p>这样在一次“事件循环“中，最多只会执行一次flush了，在这个“事件循环”中，所有的setState都会被合并，并只渲染一次组件。</p>
<h3 id="articleHeader6">别的延迟执行方法</h3>
<p>除了用<code>Promise.resolve().then( fn )</code>，我们也可以用上文中提到的<code>setTimeout( fn, 0 )</code>，setTimeout的时间也可以是别的值，例如16毫秒。</p>
<blockquote>16毫秒的间隔在一秒内大概可以执行60次，也就是60帧，人眼每秒只能捕获60幅画面</blockquote>
<p>另外也可以用<code>requestAnimationFrame</code>或者<code>requestIdleCallback</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function defer( fn ) {
    return requestAnimationFrame( fn );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">defer</span>(<span class="hljs-params"> fn </span>) </span>{
    <span class="hljs-keyword">return</span> requestAnimationFrame( fn );
}</code></pre>
<h1 id="articleHeader7">试试效果</h1>
<p>就试试渲染上文中用React渲染的那两个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class App extends Component {
    constructor() {
        super();
        this.state = {
            num: 0
        }
    }
    componentDidMount() {
        for ( let i = 0; i < 100; i++ ) {
            this.setState( { num: this.state.num + 1 } );
            console.log( this.state.num ); 
        }
    }
    render() {
        return (
            <div className=&quot;App&quot;>
                <h1>{ this.state.num }</h1>
            </div>
        );
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>() {
        <span class="hljs-keyword">super</span>();
        <span class="hljs-keyword">this</span>.state = {
            <span class="hljs-attr">num</span>: <span class="hljs-number">0</span>
        }
    }
    componentDidMount() {
        <span class="hljs-keyword">for</span> ( <span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">100</span>; i++ ) {
            <span class="hljs-keyword">this</span>.setState( { <span class="hljs-attr">num</span>: <span class="hljs-keyword">this</span>.state.num + <span class="hljs-number">1</span> } );
            <span class="hljs-built_in">console</span>.log( <span class="hljs-keyword">this</span>.state.num ); 
        }
    }
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"App"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{ this.state.num }<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        );
    }
}</code></pre>
<p>效果和React完全一样<br><span class="img-wrap"><img data-src="/img/bV8A33?w=403&amp;h=148" src="https://static.alili.tech/img/bV8A33?w=403&amp;h=148" alt="38770037-3587b81c-403f-11e8-8f99-4f8a4427e205.png" title="38770037-3587b81c-403f-11e8-8f99-4f8a4427e205.png" style="cursor: pointer;"></span><br>同样，用第二种方式调用setState：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentDidMount() {
    for ( let i = 0; i < 100; i++ ) {
        this.setState( prevState => {
            console.log( prevState.num );
            return {
                num: prevState.num + 1
            }
        } );
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">componentDidMount() {
    <span class="hljs-keyword">for</span> ( <span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">100</span>; i++ ) {
        <span class="hljs-keyword">this</span>.setState( <span class="hljs-function"><span class="hljs-params">prevState</span> =&gt;</span> {
            <span class="hljs-built_in">console</span>.log( prevState.num );
            <span class="hljs-keyword">return</span> {
                <span class="hljs-attr">num</span>: prevState.num + <span class="hljs-number">1</span>
            }
        } );
    }
}</code></pre>
<p>结果也完全一样：<br><span class="img-wrap"><img data-src="/img/bV8A34?w=334&amp;h=290" src="https://static.alili.tech/img/bV8A34?w=334&amp;h=290" alt="38770164-fbeef622-4040-11e8-9680-958394f9bb9e.png" title="38770164-fbeef622-4040-11e8-9680-958394f9bb9e.png" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader8">后话</h1>
<p>在这篇文章中，我们又实现了一个很重要的优化：合并短时间内的多次setState，异步更新state。<br>到这里我们已经实现了React的大部分核心功能和优化手段了，所以这篇文章也是这个系列的最后一篇了。</p>
<p>这篇文章的所有代码都在这里：<a href="https://github.com/hujiulong/simple-react/tree/chapter-4" rel="nofollow noreferrer" target="_blank">https://github.com/hujiulong/...</a></p>
<h1 id="articleHeader9">从零开始实现React系列</h1>
<p>React是前端最受欢迎的框架之一，解读其源码的文章非常多，但是我想从另一个角度去解读React：从零开始实现一个React，从API层面实现React的大部分功能，在这个过程中去探索为什么有虚拟DOM、diff、为什么setState这样设计等问题。</p>
<p>整个系列大概会有四篇左右，我每周会更新一到两篇，我会第一时间在github上更新，有问题需要探讨也请在github上回复我~</p>
<blockquote>博客地址: <a href="https://github.com/hujiulong/blog" rel="nofollow noreferrer" target="_blank">https://github.com/hujiulong/...</a><br>关注点star，订阅点watch</blockquote>
<h2 id="articleHeader10">上一篇文章</h2>
<p><a href="https://github.com/hujiulong/blog/issues/6" rel="nofollow noreferrer" target="_blank">从零开始实现一个React（三）：diff算法 </a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从零开始实现一个React（四）：异步的setState

## 原文链接
[https://segmentfault.com/a/1190000014428142](https://segmentfault.com/a/1190000014428142)

