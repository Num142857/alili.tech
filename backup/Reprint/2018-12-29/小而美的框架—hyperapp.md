---
title: '小而美的框架—hyperapp' 
date: 2018-12-29 2:30:10
hidden: true
slug: cd7uy702w69
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">写在前面</h2>
<p>没错，又是一个新的前端框架，<code>hyperapp</code>非常的小，仅仅<code>1kb</code>，当然学习起来也是非常的简单，可以说是1分钟入门。声明式：HyperApp 的设计基于<code>Elm Architecture</code>（这也意味着组件更多的是纯函数），支持自定义标签以及虚拟DOM。下面先来看下怎么使用：</p>
<h3 id="articleHeader1">hello world</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { h, app } from 'hyperapp';

app({
    state: {
        count: 0
    },
    view: (state, actions) => (
        <main>
            <h2>{state.count}</h2>
            <button onclick={actions.down}>-</button>
            <button onclick={actions.up}>+</button>
        </main>
    ),
    actions: {
        down: state => ({
            count: state.count - 1
        }),
        up: state => ({
            count: state.count + 1
        })
    }
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { h, app } <span class="hljs-keyword">from</span> <span class="hljs-string">'hyperapp'</span>;

app({
    <span class="hljs-attr">state</span>: {
        <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>
    },
    <span class="hljs-attr">view</span>: <span class="hljs-function">(<span class="hljs-params">state, actions</span>) =&gt;</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>{state.count}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">{actions.down}</span>&gt;</span>-<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">{actions.up}</span>&gt;</span>+<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span></span>
    ),
    <span class="hljs-attr">actions</span>: {
        <span class="hljs-attr">down</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> ({
            <span class="hljs-attr">count</span>: state.count - <span class="hljs-number">1</span>
        }),
        <span class="hljs-attr">up</span>: <span class="hljs-function"><span class="hljs-params">state</span> =&gt;</span> ({
            <span class="hljs-attr">count</span>: state.count + <span class="hljs-number">1</span>
        })
    }
});
</code></pre>
<p>（完整demo可以参见<a href="https://github.com/zp1996/hyperapp-example" rel="nofollow noreferrer" target="_blank">这里</a>）<br>这样就完成了一个<code>Counter</code>，基本由<code>state</code>，<code>view</code>，<code>actions</code>构成：</p>
<ul>
<li>
<code>state</code>: 与<code>react</code>中的如出一辙，<code>state</code>的改变会引起重新渲染</li>
<li>
<code>view</code>: 相当于<code>react</code>中的<code>render</code>
</li>
<li>
<code>actions</code>: 对<code>state</code>进行改变</li>
</ul>
<p><code>h</code>相当于<code>react</code>的<code>createElement</code>，来看下<code>h</code>接收的参数：</p>
<ul>
<li>
<code>tag</code>: 标签名，或者一个函数，传入函数也就意味着无状态组件</li>
<li>
<code>data</code>: 相当于<code>react</code>中的<code>props</code>
</li>
<li>
<code>children</code>: 子节点</li>
</ul>
<p>需要注意的一点是，<code>hyperapp</code>并不支持<code>boolean</code>类型，对于<code>boolean</code>类型会忽略，使用时注意将其转化为string类型，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<h3>Test {true}</h3>             // Test
<h3>Test {String(true)}</h3>     // Test true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-params">&lt;h3&gt;</span><span class="hljs-class">Test </span>{true}<span class="hljs-params">&lt;/h3&gt;</span>             <span class="hljs-comment">// Test</span>
<span class="hljs-params">&lt;h3&gt;</span><span class="hljs-class">Test </span>{String(true)}<span class="hljs-params">&lt;/h3&gt;</span>     <span class="hljs-comment">// Test true</span></code></pre>
<p>至于为什么？可以参见<a href="https://github.com/hyperapp/hyperapp/blob/master/src/h.js#L17" rel="nofollow noreferrer" target="_blank">源码</a></p>
<h3 id="articleHeader2">生命周期</h3>
<p>下面来看一下其生命周期，对于<code>hyperapp</code>的整个运行过程，可以参见下图：</p>
<p><span class="img-wrap"><img data-src="/img/bVVMEy?w=620&amp;h=295" src="https://static.alili.tech/img/bVVMEy?w=620&amp;h=295" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<ul>
<li>
<code>load</code>：相当于<code>react</code>的<code>componentWillMount</code>
</li>
<li>
<code>update</code>：相当于<code>react</code>的<code>componentWillUpdate</code>
</li>
<li>
<code>render</code>：调用<code>view</code>函数之前调用</li>
<li>
<code>action</code>：调用<code>actions</code>之前，一般用来进行<code>log</code>
</li>
<li>
<code>resolve</code>：调用<code>actions</code>之后，对于一个异步操作来说，<code>actions</code>返回一个<code>promise</code>，生命周期<code>resolve</code>来处理，返回一个函数<code>update =&gt; result.then(update)</code>，即框架内部调用<code>update</code>来更新<code>state</code>，重新渲染<br>具体代码可以参考：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 生命周期： action  ->  actions[key]  ->  resolve
// 异步请求需要利用resolve
emit('action', { name: name, data: data });

var result = emit('resolve', action(appState, appActions, data));

return typeof result === 'function' ? result(update) : update(result);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-comment">// 生命周期： action  -&gt;  actions[key]  -&gt;  resolve</span>
<span class="hljs-comment">// 异步请求需要利用resolve</span>
emit(<span class="hljs-string">'action'</span>, { name: name, <span class="hljs-keyword">data</span>: <span class="hljs-keyword">data</span> });

<span class="hljs-keyword">var</span> result = emit(<span class="hljs-string">'resolve'</span>, action(appState, appActions, <span class="hljs-keyword">data</span>));

<span class="hljs-keyword">return</span> typeof result === <span class="hljs-string">'function'</span> ? result(update) : update(result);</code></pre>
<p>对于每一个节点来说，有着三个特殊的属性：</p>
<ul>
<li>
<code>oncreate</code>：相当于<code>componentDidMount</code>
</li>
<li>
<code>onupdate</code>：相当于<code>componentDidUpdate</code>
</li>
<li>
<code>onremove</code>：与<code>componentWillUnMount</code>类似，需要注意的是，加入有了这个属性，那么当节点需要被移除时，也不会被移除，需要自己来从<code>dom</code>中移除，这样设计是为了便于做一些淡入淡出等效果，具体源码可以参见<a href="https://github.com/hyperapp/hyperapp/blob/master/src/app.js#L174" rel="nofollow noreferrer" target="_blank">这里</a>，更多的使用方式以及讨论可以参见<a href="https://github.com/hyperapp/hyperapp/issues/357" rel="nofollow noreferrer" target="_blank">这里</a>
</li>
</ul>
<p><strong>三个属性均为函数，接收一个参数，就是这个节点</strong></p>
<h3 id="articleHeader3">自定义组件</h3>
<p>通过上面，基本上可以了解<code>hyperapp</code>的基本写法，下面来看一下如何自定义组件：</p>
<h4>“木偶”组件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Header = ({ title, caption }) => (
    <header>
        <h1>
            {title}
            <small>{caption}</small>
        </h1>
    </header>
);
// 使用
<Header title=&quot;hyperapp-example&quot; caption=&quot;demo&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> Header = <span class="hljs-function">(<span class="hljs-params">{ title, caption }</span>) =&gt;</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>
            {title}
            <span class="hljs-tag">&lt;<span class="hljs-name">small</span>&gt;</span>{caption}<span class="hljs-tag">&lt;/<span class="hljs-name">small</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span></span>
);
<span class="hljs-comment">// 使用</span>
&lt;Header title=<span class="hljs-string">"hyperapp-example"</span> caption=<span class="hljs-string">"demo"</span> /&gt;</code></pre>
<p>无状态组件的写法与<code>react</code>基本一致，<code>hyperapp</code>官方给出的自定义组件的方式仅仅有这种，但是所有的组件都要是无状态的？？？答案当然是否定的，如何实现“智能组件”是一个问题：</p>
<h4>“智能”组件</h4>
<h5>利用app方法实现</h5>
<p>我们通常的期望业务组件具有一些基本的功能，比如数据获取展现这种：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Header = app({
    state: {
        caption: 'loading'
    },
    view(state, actions) {
        return (
            <header>{state.caption}</header>
        );
    },
    actions: {
        fetchData(state) {
            return new Promise((resolve) => {
                // 模拟fetch数据
                setTimeout(() => {
                    state.caption = 'ok';
                    resolve(state);
                }, 1000);
            });
        }
    },
    events: {
        load(state, actions) {
            actions.fetchData(state);
        },
        resolve(state, actions, result) {
            if (result &amp;&amp; typeof result.then === 'function') {
                return update => result.then(update);
            }
        }
    }
});

export default Header;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> Header = app({
    <span class="hljs-attr">state</span>: {
        <span class="hljs-attr">caption</span>: <span class="hljs-string">'loading'</span>
    },
    view(state, actions) {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>{state.caption}<span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span></span>
        );
    },
    <span class="hljs-attr">actions</span>: {
        fetchData(state) {
            <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> {
                <span class="hljs-comment">// 模拟fetch数据</span>
                setTimeout(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
                    state.caption = <span class="hljs-string">'ok'</span>;
                    resolve(state);
                }, <span class="hljs-number">1000</span>);
            });
        }
    },
    <span class="hljs-attr">events</span>: {
        load(state, actions) {
            actions.fetchData(state);
        },
        resolve(state, actions, result) {
            <span class="hljs-keyword">if</span> (result &amp;&amp; <span class="hljs-keyword">typeof</span> result.then === <span class="hljs-string">'function'</span>) {
                <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">update</span> =&gt;</span> result.then(update);
            }
        }
    }
});

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Header;</code></pre>
<p>按照如下方式使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Header from './Header';
...
state: {
    count: 0
},
view: (state, actions) => (
    <main>
        <Header />
        <h2>{state.count}</h2>
    </main>
),
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> Header <span class="hljs-keyword">from</span> <span class="hljs-string">'./Header'</span>;
...
state: {
    <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>
},
<span class="hljs-attr">view</span>: <span class="hljs-function">(<span class="hljs-params">state, actions</span>) =&gt;</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Header</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>{state.count}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span></span>
),
...</code></pre>
<p>打开页面，从ui来看已经实现组件封装，但是这种是一种”曲线“的实现方式，为什么说它是不正规，可以观察其<code>dom</code>层级，可能与我们理解和期望的并不相同。我们期望得到的层级是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body
    main
        header
        h2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">body</span>
    main
        <span class="hljs-selector-tag">header</span>
        h2</code></pre>
<p>但是事实上得到的层级为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body
    header
    main
        h2" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">body</span>
    <span class="hljs-selector-tag">header</span>
    main
        h2</code></pre>
<p>至于为什么会产生这种情况，需要看一下源码：</p>
<h5>
<code>app</code>做了什么？</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// app接收一个对象
function app(props) {
    ...
    // appRoot 就是需要挂载到的根节点
    var appRoot = props.root || document.body
    ...
    // 注意此处，下文会用到
    return emit;

    ...
    // 利用raf调用render渲染ui
    function render(cb) {
         element = patch(
            appRoot,
            ...
        );
    }
    ...
    function patch(parent, ...) {
        if (oldNode == null) {
            // 第一次渲染,将节点插入到appRoot中
            // 只要是第一次挂载,element为null
            element = parent.insertBefore(createElement(node, isSVG), element);
        }
        ...
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs qml"><code><span class="hljs-comment">// app接收一个对象</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">app</span>(<span class="hljs-params">props</span>) </span>{
    ...
    <span class="hljs-comment">// appRoot 就是需要挂载到的根节点</span>
    <span class="hljs-built_in">var</span> appRoot = props.root || <span class="hljs-built_in">document</span>.body
    ...
    <span class="hljs-comment">// 注意此处，下文会用到</span>
    <span class="hljs-keyword">return</span> emit;

    ...
    <span class="hljs-comment">// 利用raf调用render渲染ui</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span>(<span class="hljs-params">cb</span>) </span>{
         element = patch(
            appRoot,
            ...
        );
    }
    ...
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">patch</span>(<span class="hljs-params">parent, ...</span>) </span>{
        <span class="hljs-keyword">if</span> (oldNode == <span class="hljs-literal">null</span>) {
            <span class="hljs-comment">// 第一次渲染,将节点插入到appRoot中</span>
            <span class="hljs-comment">// 只要是第一次挂载,element为null</span>
            element = <span class="hljs-built_in">parent</span>.insertBefore(createElement(node, isSVG), element);
        }
        ...
    }
}</code></pre>
<p>所以说将<code>Header</code>组件挂载的原因并不是我们通过<code>jsx</code>写出了这层结构，而是在<code>import</code>的时候，就已经将其挂载到了<code>document.body</code>下，<code>main</code>在挂载到<code>document.body</code>时，被插入到子节点的末尾。</p>
<h5>
<code>&lt;Header /&gt;</code>去哪儿了？</h5>
<p><code>&lt;Header /&gt;</code>就这样消失了，先来看下<code>h</code>，就像在<code>react</code>把<code>jsx</code>翻译为<code>createElement</code>，<code>hyperapp</code>的<code>jsx</code>会被翻译为如下形式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="h(tagName, props, children)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">h(tagName, props, children)</code></pre>
<p>来简单的看下<code>h</code>的实现：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function h(tag, data) {
    // 根据后续参数，生成children
    while (stack.length) {
        if (Array.isArray((node = stack.pop()))) {
            // 处理传入的child为数组    
            for (i = node.length; i--; ) {
                stack.push(node[i]);
            }
        }
        ...
    }
    ...
    return typeof tag === 'string' ? {
        tag: tag,
        data: data || {},
        children: children
    } : tag(data, children);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">h</span>(<span class="hljs-params">tag, data</span>) </span>{
    <span class="hljs-comment">// 根据后续参数，生成children</span>
    <span class="hljs-keyword">while</span> (stack.length) {
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Array</span>.isArray((node = stack.pop()))) {
            <span class="hljs-comment">// 处理传入的child为数组    </span>
            <span class="hljs-keyword">for</span> (i = node.length; i--; ) {
                stack.push(node[i]);
            }
        }
        ...
    }
    ...
    return <span class="hljs-keyword">typeof</span> tag === <span class="hljs-string">'string'</span> ? {
        <span class="hljs-attr">tag</span>: tag,
        <span class="hljs-attr">data</span>: data || {},
        <span class="hljs-attr">children</span>: children
    } : tag(data, children);
}</code></pre>
<p>可以得出的是，<code>tag</code>接收函数传入，比如木偶组件，<code>tag</code>就是一个函数，但是对于<code>&lt;Header /&gt;</code>来说，<code>tag</code>为<code>app</code>函数返回的<code>emit</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function emit(name, data) {
    // 一个不常见的写法,这个写法会返回data
    return (
        (appEvents[name] || []).map(function(cb) {
            var result = cb(appState, appActions, data);
            if (result != null) {
                data = result;
            }
        }),
        data
    );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">emit</span>(<span class="hljs-params">name, data</span>) </span>{
    <span class="hljs-comment">// 一个不常见的写法,这个写法会返回data</span>
    <span class="hljs-keyword">return</span> (
        (appEvents[name] || []).map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">cb</span>) </span>{
            <span class="hljs-keyword">var</span> result = cb(appState, appActions, data);
            <span class="hljs-keyword">if</span> (result != <span class="hljs-literal">null</span>) {
                data = result;
            }
        }),
        data
    );
}</code></pre>
<p>基于目前这两点，可以得出：</p>
<ul>
<li>
<code>&lt;Header /&gt;</code>被转为了，<code>h(emit, null)</code>
</li>
<li>
<code>h</code>返回的就是<code>children</code>，也就是一个<code>[]</code>
</li>
<li>由于<code>&lt;Header /&gt;</code>作为子节点，会再次被<code>h</code>整理一次，参照<code>h</code>对数组的处理，可以得出<code>[]</code>直接就被忽略掉了</li>
<li>需要<code>render</code>的节点的子节点中根本就没有<code>&lt;Header/&gt;</code>的出现</li>
</ul>
<p>这种实现方式可以说是非常的不好，局限性也很大，想想可不可以利用其他方法实现：</p>
<h5>利用<code>oncreate</code>实现</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 改进Header组件
const Header = (root) => app({
    root,
    ...同上
});

// 改进引入方式
view: (state, actions) => (
    <main>
        <div oncreate={(e) => Header(e)}></div>
        <h2>{state.count}</h2>
    </main>
)," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 改进Header组件</span>
<span class="hljs-keyword">const</span> Header = <span class="hljs-function">(<span class="hljs-params">root</span>) =&gt;</span> app({
    root,
    ...同上
});

<span class="hljs-comment">// 改进引入方式</span>
view: <span class="hljs-function">(<span class="hljs-params">state, actions</span>) =&gt;</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">oncreate</span>=<span class="hljs-string">{(e)</span> =&gt;</span> Header(e)}&gt;<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>{state.count}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span></span>
),</code></pre>
<p>这种方式，利用了<code>oncreate</code>方法，挂载后，载入组件（可以考虑通过代码分割将组件异步加载）</p>
<h5>“木偶”组件+<code>mixins</code>
</h5>
<p><code>hyperapp</code>支持传入<code>mixins</code>，既然天然的支持这个，那么将一个组件进行两方面分割：</p>
<ul>
<li>
<code>view</code>，利用“木偶组件”实现</li>
<li>
<code>feature</code>，利用<code>mixins</code>实现<br>组件定义：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export const HeaderView = ({ text }) => (
    <header>{text}</header>
);

export const HeaderMixins = () => ({
    state:   // 同上
    actions: // 同上
    events:  // 同上
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> HeaderView = <span class="hljs-function">(<span class="hljs-params">{ text }</span>) =&gt;</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>{text}<span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span></span>
);

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> HeaderMixins = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> ({
    <span class="hljs-attr">state</span>:   <span class="hljs-comment">// 同上</span>
    actions: <span class="hljs-comment">// 同上</span>
    events:  <span class="hljs-comment">// 同上</span>
});</code></pre>
<p>使用方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { HeaderView, HeaderMixins } from './HeaderView';
...
state: {
    count: 0
},
view: (state, actions) => (
    <main>
        <HeaderView text={state.caption} />
        <h2>{state.count}</h2>
    </main>
),
mixins: [
    HeaderMixins()
]
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { HeaderView, HeaderMixins } <span class="hljs-keyword">from</span> <span class="hljs-string">'./HeaderView'</span>;
...
state: {
    <span class="hljs-attr">count</span>: <span class="hljs-number">0</span>
},
<span class="hljs-attr">view</span>: <span class="hljs-function">(<span class="hljs-params">state, actions</span>) =&gt;</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">main</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">HeaderView</span> <span class="hljs-attr">text</span>=<span class="hljs-string">{state.caption}</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>{state.count}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">main</span>&gt;</span>
),
mixins: [
    HeaderMixins()
]
...</span></code></pre>
<p><code>mixins</code>会将其属性与本身进行一个并操作，可以理解为<code>Object.assign(key, mixins[key])</code>，对于<code>events</code>来说，为一个典型的发布/订阅模式，<code>events</code>的某一种类型对应一个数组，<code>emit</code>时会将其全部执行。本人认为利用这种方式可以实现出一个比较符合框架本意的”智能“组件，但是仍然有些问题，就是<code>state</code>，在使用这个组件时不得不去看一下组件内部的<code>state</code>叫什么名字，而且容易造成同名<code>state</code>冲突的情况。</p>
<h2 id="articleHeader4">写在最后</h2>
<p>总体来说，<code>hyperapp</code>是一个小而美的框架，值得我们来折腾一下，以上均为本人理解，如有错误还请指出，不胜感激~</p>
<h3 id="articleHeader5">一个硬广</h3>
<p><strong>我所在团队（工作地点在北京）求大量前端（社招 or 实习），有意者可发简历至：zp139505@alibaba-inc.com</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
小而美的框架—hyperapp

## 原文链接
[https://segmentfault.com/a/1190000011427356](https://segmentfault.com/a/1190000011427356)

