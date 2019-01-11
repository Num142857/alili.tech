---
title: 'React 状态管理库: Mobx' 
date: 2019-01-09 2:30:12
hidden: true
slug: yz5jpugvmg
categories: [reprint]
---

{{< raw >}}

                    
<p>React 是一个专注于视图层的库。React 维护了状态到视图的映射关系，开发者只需关心状态即可，由 React 来操控视图。</p>
<p>在小型应用中，单独使用 React 是没什么问题的。但在复杂应用中，容易碰到一些状态管理方面的问题，如：</p>
<ul>
<li><p>React 只提供了在内部组件修改状态的接口 <code>setState</code>。导致数据、业务逻辑和视图层耦合在组件内部，不利于扩展和维护。</p></li>
<li><p>React 应用即一颗组件树。兄弟节点，或者不在同一树杈的节点之间的状态同步是非常麻烦。</p></li>
<li><p>关心性能的情况下，需要手动设置 <code>shouldComponentUpdate</code></p></li>
</ul>
<p>这时就需要引入状态管理库。现在常用的状态管理库有 Mobx 和 Redux，本文会重点介绍 Mobx，然后会将 Mobx 和 Redux 进行对比，最后展望下未来的 React 状态管理方面趋势。</p>
<h2 id="articleHeader0">Mobx 简介</h2>
<p>Mobx 的理念非常简单，可以用一个 demo 就把其核心原理说清楚。Mobx/MobxReact 中有三个核心概念，<code>observable</code>、<code>observer</code>、<code>action</code>。为了简单起见，本文没有提及 <code>computed</code> 等概念。</p>
<ul>
<li><p><code>observable</code>: 通过 <code>observable(state)</code> 定义组件的状态，包装后的状态是一个可观察数据（Observable Data）。</p></li>
<li><p><code>observer</code>: 通过 <code>observer(ReactComponent)</code> 定义组件。</p></li>
<li><p><code>action</code>: 通过 <code>action</code> 来修改状态。</p></li>
</ul>
<p>简化图如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVQtuq?w=816&amp;h=940" src="https://static.alili.tech/img/bVQtuq?w=816&amp;h=940" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>只讲概念还比较模糊，下面给大家举个例子。</p>
<p><a href="https://jsfiddle.net/jhwleo/1L5jcykr/9/" rel="nofollow noreferrer" target="_blank">点击运行 https://jsfiddle.net/jhwleo/1L5jcykr/9/</a><button class="btn btn-xs btn-default ml10 preview" data-url="jhwleo/1L5jcykr/9/" data-typeid="0">点击预览</button></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 通过 observable 定义组件的状态
const user = mobx.observable({
    name: &quot;Jay&quot;,
     age: 22
})

// 通过 action 定义如何修改组件的状态
const changeName = mobx.action(name => user.name = name)
const changeAge = mobx.action(age => user.age = age)

// 通过 observer 定义 ReactComponent 组件。
const Hello = mobxReact.observer(class Hello extends React.Component {
        componentDidMount(){
            // 视图层通过事件触发 action
        changeName('Wang') // render Wang
    }

    render() {
                // 渲染
            console.log('render',user.name);
        return <div>Hello,{user.name}!</div>
    }
})

ReactDOM.render(<Hello />, document.getElementById('mount'));

// 非视图层事件触发，外部直接触发 action
changeName('Wang2')// render Wang2
// 重点：没有触发重新渲染
// 原因：Hello 组件并没有用到 `user.age` 这个可观察数据
changeAge('18')  // no console" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 通过 observable 定义组件的状态</span>
<span class="hljs-keyword">const</span> user = mobx.observable({
    <span class="hljs-attr">name</span>: <span class="hljs-string">"Jay"</span>,
     <span class="hljs-attr">age</span>: <span class="hljs-number">22</span>
})

<span class="hljs-comment">// 通过 action 定义如何修改组件的状态</span>
<span class="hljs-keyword">const</span> changeName = mobx.action(<span class="hljs-function"><span class="hljs-params">name</span> =&gt;</span> user.name = name)
<span class="hljs-keyword">const</span> changeAge = mobx.action(<span class="hljs-function"><span class="hljs-params">age</span> =&gt;</span> user.age = age)

<span class="hljs-comment">// 通过 observer 定义 ReactComponent 组件。</span>
<span class="hljs-keyword">const</span> Hello = mobxReact.observer(<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Hello</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
        componentDidMount(){
            <span class="hljs-comment">// 视图层通过事件触发 action</span>
        changeName(<span class="hljs-string">'Wang'</span>) <span class="hljs-comment">// render Wang</span>
    }

    render() {
                <span class="hljs-comment">// 渲染</span>
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'render'</span>,user.name);
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello,{user.name}!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    }
})

ReactDOM.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Hello</span> /&gt;</span>, document.getElementById('mount'));

// 非视图层事件触发，外部直接触发 action
changeName('Wang2')// render Wang2
// 重点：没有触发重新渲染
// 原因：Hello 组件并没有用到 `user.age` 这个可观察数据
changeAge('18')  // no console</span></code></pre>
<p>例子看完了，是不是非常简单。</p>
<p>使用 Mobx，组件状态可以在外部定义（也可以在组件内部），因此，数据、业务逻辑可以轻易地和视图层分离，提高应用的可扩展性和可维护性。另外，由于组件状态可以在外部定义，兄弟节点之间的状态同步也非常容易。最后一点， Mobx 知道什么时候应该渲染页面，因此基本不需要手动设置 <code>shouldComponentUpdate</code> 来提高应用性能。</p>
<p>接下来给大家介绍下 Mobx 中 <code>observable</code> <code>observer</code> <code>action</code> 的用法，并会简单介绍一下其原理。</p>
<h3 id="articleHeader1">observable</h3>
<p>Mobx 如此简单的原因之一，就是使用了<strong>可观察数据</strong>(Observable Data)。简单说，可观察数据就是可以观察到数据的读取、写入，并进行拦截。</p>
<p>Mobx 提供了 <code>observable</code> 接口来定义可观察数据。定义的可观察数据，通常也是组件的状态。该方法接收一个参数，参数可以是原始数据类型、普通 Object、Array、或者 ES6 中的 Map 类型，返回一个 <code>observable</code> 类型的参数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Array.isArray(mobx.observable([1,2,3])) === false // true
mobx.isObservable(mobx.observable([1,2,3])) === true // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">Array</span>.isArray(mobx.observable([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>])) === <span class="hljs-literal">false</span> <span class="hljs-comment">// true</span>
mobx.isObservable(mobx.observable([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>])) === <span class="hljs-literal">true</span> <span class="hljs-comment">// true</span></code></pre>
<p>注意，数组经过 <code>observable</code> 包装后，就不是 Array 类型了，而是 Mobx 定义的一个特殊类型 ———— <code>observable</code> 类型。<code>observable</code> 类型，可以通过 <code>mobx.isObservable</code> 来检查。</p>
<p>虽然数据类型不一样，但是使用方式基本和原来一致(原始数据类型除外)。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const observableArr =  mobx.observable([1,2,3]);
const observableObj =  mobx.observable({name: 'Jay'});
const observableMap =  mobx.observable(new Map([['name','Wang']]));

console.log(observableArr[0])  // 1
console.log(observableObj.name)  // Jay
console.log(observableMap.get('name'))  // Wang" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> observableArr =  mobx.observable([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]);
<span class="hljs-keyword">const</span> observableObj =  mobx.observable({<span class="hljs-attr">name</span>: <span class="hljs-string">'Jay'</span>});
<span class="hljs-keyword">const</span> observableMap =  mobx.observable(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Map</span>([[<span class="hljs-string">'name'</span>,<span class="hljs-string">'Wang'</span>]]));

<span class="hljs-built_in">console</span>.log(observableArr[<span class="hljs-number">0</span>])  <span class="hljs-comment">// 1</span>
<span class="hljs-built_in">console</span>.log(observableObj.name)  <span class="hljs-comment">// Jay</span>
<span class="hljs-built_in">console</span>.log(observableMap.get(<span class="hljs-string">'name'</span>))  <span class="hljs-comment">// Wang</span></code></pre>
<p>可观察数据类型的原理是，在读取数据时，通过 <code>getter</code> 来拦截，在写入数据时，通过<code>setter</code> 来拦截。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Object.defineProperty(o, key, {
  get : function(){
        // 收集依赖的组件
    return value;
  },
  set : function(newValue){
        // 通知依赖的组件更新
        value = newValue
  },
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">Object</span>.defineProperty(o, key, {
  <span class="hljs-attr">get</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
        <span class="hljs-comment">// 收集依赖的组件</span>
    <span class="hljs-keyword">return</span> value;
  },
  <span class="hljs-attr">set</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">newValue</span>)</span>{
        <span class="hljs-comment">// 通知依赖的组件更新</span>
        value = newValue
  },
});</code></pre>
<p>在可观察数据被组件读取时，Mobx 会进行拦截，并记录该组件和可观察数据的依赖关系。在可观察数据被写入时，Mobx 也会进行拦截，并通知依赖它的组件重新渲染。</p>
<h3 id="articleHeader2">observer</h3>
<p><code>observer</code> 接收一个 React 组件作为参数，并将其转变成响应式（Reactive）组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 普通组件
const Hello = mobxReact.observer(class Hello extends React.Component {
    render() {
        return <div>Hello,{user.name}!</div>
    }
})

// 函数组件
const Hello = mobxReact.observer( () => (
    <div>Hello,{user.name}!</div>
))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 普通组件</span>
<span class="hljs-keyword">const</span> Hello = mobxReact.observer(<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Hello</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello,{user.name}!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    }
})

<span class="hljs-comment">// 函数组件</span>
<span class="hljs-keyword">const</span> Hello = mobxReact.observer( <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello,{user.name}!<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
))</code></pre>
<p>响应式组件，即当且仅当组件依赖的可观察数据发生改变时，组件才会自动响应，并重新渲染。</p>
<p>在本文最开始的例子中，响应式组件依赖了 <code>user.name</code>，但是没有依赖 <code>user.age</code>。所以当<code>user.name</code> 发现变化时，组件更新。而 <code>user.age</code> 发生变化时，组件没有更新。</p>
<p>这里再详细分析本文中的第一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="user.name = 'Wang2'// render Wang2
// 重点：没有触发重新渲染
// 原因：Hello 组件并没有用到 `user.age` 这个可观察数据
user.age = '18'  // no console" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">user.name = <span class="hljs-string">'Wang2'</span><span class="hljs-comment">// render Wang2</span>
<span class="hljs-comment">// 重点：没有触发重新渲染</span>
<span class="hljs-comment">// 原因：Hello 组件并没有用到 `user.age` 这个可观察数据</span>
user.age = <span class="hljs-string">'18'</span>  <span class="hljs-comment">// no console</span></code></pre>
<p>当可观察数据变化时，Mobx 会调用 <code>forceUpdate</code> 直接更新组件。</p>
<p><a href="https://github.com/mobxjs/mobx-react/blob/4177daa6685dc6c40a232aeb297f93ee27675bde/src/observer.js#L182" rel="nofollow noreferrer" target="_blank">源码地址</a></p>
<p>而在传统 React 应用中，当状态、属性变化后会先调用 <code>shouldComponentUpdate</code>，该方法会深层对比前后状态和属性是否发生改变，再确定是否更新组件。</p>
<p><code>shouldComponentUpdate</code> 是很消耗性能的。Mobx 通过可观察数据，精确地知道组件是否需要更新，减少了调用 <code>shouldComponentUpdate</code> 这一步。这是 Mobx 性能好的原因之一。</p>
<p>另外需要注意的是 <code>observer</code> 并不是 <code>mobx</code> 的方法，而是 <code>mobx-react</code> 的方法。<code>mobx</code> 和 <code>mobx-react</code> 关系如同 <code>react</code> 与 <code>react-dom</code>。</p>
<h3 id="articleHeader3">action</h3>
<p>在 Mobx 中是可以直接修改可观察数据，来进行更新组件的，但不建议这样做。如果在任何地方都修改可观察数据，将导致页面状态难以管理。</p>
<p>所有对可观察数据地修改，都应该在 <code>action</code> 中进行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const changeName = mobx.action(name => user.name = name)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> changeName = mobx.action(<span class="hljs-function"><span class="hljs-params">name</span> =&gt;</span> user.name = name)</code></pre>
<p>使用 Mobx 可以将组件状态定义在组件外部，这样，组件逻辑和组件视图便很容易分离，兄弟组件之间的状态也很容易同步。另外，也不再需要手动使用 <code>shouldComponentUpdate</code> 进行性能优化了。</p>
<h2 id="articleHeader4">Mobx 与 Redux 对比</h2>
<p>Mobx 的优势来源于<strong>可变数据</strong>（Mutable Data）和<strong>可观察数据</strong> (Observable Data) 。</p>
<p>Redux 的优势来源于<strong>不可变数据</strong>（Immutable data）。</p>
<p>可观察数据的优势，在前文已经介绍过了。现在再来聊聊可变数据和不可变数据。</p>
<p>顾名思义，可变数据和不可变数据的区别在于，可变数据创建后可以修改，不可变数据创建后不可以修改。</p>
<p>可变数据，可以直接修改，所以操作起来非常简单。这使得使用 mobx 改变状态，变得十分简单。</p>
<p>不可变数据并不一定要用到 Immutable 库。它完全可以是一种约定，只要创建后不修改即可。比如说，Redux 中的 <code>state</code>。每次修改都会重新生成一个 <code>newState</code> ，而不会对原来的值进行改变。所以说 Redux 中的 <code>state</code> 就是不可变数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="reducer(state, action) => newState.  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">reducer(state, action) =&gt; newState.  </code></pre>
<p>不可变数据的优势在于，它可预测，可回溯。示例代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function foo(bar) {
  let data = { key: 'value' };
  bar(data);
  console.log(data.key); // 猜猜会打印什么？
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span>(<span class="hljs-params">bar</span>) </span>{
  <span class="hljs-keyword">let</span> data = { <span class="hljs-attr">key</span>: <span class="hljs-string">'value'</span> };
  bar(data);
  <span class="hljs-built_in">console</span>.log(data.key); <span class="hljs-comment">// 猜猜会打印什么？</span>
}</code></pre>
<p>如果是可变数据，<code>data.key</code> 的值可能会在 <code>bar</code> 函数中被改变，所以不能确定会打印什么值。但是如果是不可变数据，那么就可以肯定打印值是什么。这就是不可变数据的优势 ———— 可预测。不可变数据不会随着时间的变化（程序的运行）而发生改变。在需要回溯的时候，直接获取保存的值即可。</p>
<p>Mobx 与 Redux 技术选型的本质，是在可变数据与不可变数据之间选择。具体业务场景的技术选型，还需要根据实际情况进行分析，脱离业务场景讨论技术选型是没有意义的。但我个人在状态管理的技术选型上，还是倾向于 Mobx 的。原因是前端与副作用打交道非常频繁，有 Http 请求的副作用，Dom 操作的副作用等等。使用不可变数据，还必须得使用中间件对副作用封装；在 Redux 中修改一次状态，需要经过 Action、Dispatch、Reducer 三个步骤，代码写起来太啰嗦；而前端的程序以中小型程序为主，纯函数带来的可预测性的收益，远不及其带的代码复杂度所需要付出的成本。而 Mobx 使用起来更加简单，更适合现在以业务驱动、快速迭代的开发节奏。</p>
<h2 id="articleHeader5">展望：Mobx 与不可变数据的融合</h2>
<p>不可变数据和可变数据，都是对状态的一种描述。那么有没有一种方案，能将一种状态，同时用可变数据和不可变数据来描述呢？这样就可以同时享有二者的优势了。(注意：当我们说可变数据时，通常它还是可观察数据，后文统一只说可变数据。)</p>
<p>答案是肯定的，它就是 MST(mobx-state-tree) <a href="https://github.com/mobxjs/mobx-state-tree" rel="nofollow noreferrer" target="_blank">https://github.com/mobxjs/mob...</a>。</p>
<p>MST 是一个状态容器：一种状态，同时包含了可变数据、不可变数据两种不同的形式。</p>
<p>为了让状态可以在可变数据和不可变数据两种形式之间能够高效地相互转化，必须遵循 MST 定义状态的方法。</p>
<p>在 MST 中，定义状态必须先定义它的结构。状态的结构是一颗树(tree)，树是由多层模型(model)组成，model 是由多个节点组成。</p>
<p>在下面的代码中，树只有一层 model，该 model 也只有一个节点：title。title 的类型是事先定好的，在这里是 <code>types.string</code>。树的结构定义好后，通过 <code>create</code> 方法传入数据，就生成树。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {types} from &quot;mobx-state-tree&quot;

// declaring the shape of a node with the type `Todo`
const Todo = types.model({
    title: types.string
})

// creating a tree based on the &quot;Todo&quot; type, with initial data:
const coffeeTodo = Todo.create({
    title: &quot;Get coffee&quot;
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> {types} <span class="hljs-keyword">from</span> <span class="hljs-string">"mobx-state-tree"</span>

<span class="hljs-comment">// declaring the shape of a node with the type `Todo`</span>
<span class="hljs-keyword">const</span> Todo = types.model({
    <span class="hljs-attr">title</span>: types.string
})

<span class="hljs-comment">// creating a tree based on the "Todo" type, with initial data:</span>
<span class="hljs-keyword">const</span> coffeeTodo = Todo.create({
    <span class="hljs-attr">title</span>: <span class="hljs-string">"Get coffee"</span>
})</code></pre>
<p>在一些稍微复杂的例子中，树的 model 可以有多层，每层可以有多个节点，有些节点定义的是数据类型（<code>types.xxx</code>），有些节点直接定义的是数据。下面的示例中，就是定义了一个多层多节点的树。除此之外，注意 <code>types.model</code> 函数的第一个参数定义的是 model 的名字，第二参数定义的是 model 的所有属性，第三个参数定义的是 action。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { types, onSnapshot } from &quot;mobx-state-tree&quot;

const Todo = types.model(&quot;Todo&quot;, {
    title: types.string,
    done: false
}, {
    toggle() {
        this.done = !this.done
    }
})

const Store = types.model(&quot;Store&quot;, {
    todos: types.array(Todo)
})

// create an instance from a snapshot
const store = Store.create({ todos: [{
    title: &quot;Get coffee&quot;
}]})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { types, onSnapshot } <span class="hljs-keyword">from</span> <span class="hljs-string">"mobx-state-tree"</span>

<span class="hljs-keyword">const</span> Todo = types.model(<span class="hljs-string">"Todo"</span>, {
    <span class="hljs-attr">title</span>: types.string,
    <span class="hljs-attr">done</span>: <span class="hljs-literal">false</span>
}, {
    toggle() {
        <span class="hljs-keyword">this</span>.done = !<span class="hljs-keyword">this</span>.done
    }
})

<span class="hljs-keyword">const</span> Store = types.model(<span class="hljs-string">"Store"</span>, {
    <span class="hljs-attr">todos</span>: types.array(Todo)
})

<span class="hljs-comment">// create an instance from a snapshot</span>
<span class="hljs-keyword">const</span> store = Store.create({ <span class="hljs-attr">todos</span>: [{
    <span class="hljs-attr">title</span>: <span class="hljs-string">"Get coffee"</span>
}]})</code></pre>
<p>最关键的来了，请看下面的代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// listen to new snapshots
onSnapshot(store, (snapshot) => {
    console.dir(snapshot)
})

// invoke action that modifies the tree
store.todos[0].toggle()
// prints: `{ todos: [{ title: &quot;Get coffee&quot;, done: true }]}`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// listen to new snapshots</span>
onSnapshot(store, (snapshot) =&gt; {
    <span class="hljs-built_in">console</span>.dir(snapshot)
})

<span class="hljs-comment">// invoke action that modifies the tree</span>
store.todos[<span class="hljs-number">0</span>].toggle()
<span class="hljs-comment">// prints: `{ todos: [{ title: "Get coffee", done: true }]}`</span></code></pre>
<p>在上述代码的第一部分，使用 <code>onSnapshot</code> 监听状态的改变。第二部分，调用 <code>store.todos[0].toggle()</code> ，在这个 <code>action</code> 中通过使用<strong>可变数据</strong>的方式，直接修改了当前的状态。同时在 <code>onSnapshot</code> 生成了一个状态快照。这个状态快照就是状态的<strong>不可变数据</strong>的表现形式。</p>
<p>MST 这么神奇，那么具体怎么用呢？MST 只是一个状态容器，同时包含了可变数据和不可变数据。你可以用 MST 直接搭配 React 使用。可以 MST + Mobx + React 配合着用，还可以 MST + Redux + React 混搭着用。</p>
<p>MST 比较新，业内的实践非常少，如果不是急需，现在还可以先观望一下。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 状态管理库: Mobx

## 原文链接
[https://segmentfault.com/a/1190000010084073](https://segmentfault.com/a/1190000010084073)

