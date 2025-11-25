---
title: 'mobx——rudex的简单替代品' 
date: 2019-01-29 2:30:10
hidden: true
slug: bcbr5lb7cj5
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">mobx 能干什么</h2>
<p>使用 react 写小型应用，数据、业务逻辑和视图的模块划分不是很细是没有问题的。在这个阶段，引入任何状态管理库，都算是奢侈的。但是随着页面逻辑的复杂度提升，在中大型应用中，数据、业务逻辑和视图，如果不能很好的划分，就很有可能出现维护难、性能低下的问题。</p>
<p>业内比较成熟的解决方案有 redux，但是 redux 使用过程中，给我的感觉是太复杂和繁琐。那么为什么不简单一点呢？mobx 的核心理念是 简单、可扩展的状态管理库。这可能正是你想要的。</p>
<p>react 关注的状态(state)到视图(view)的问题。而 mobx 关注的是状态仓库（store）到的状态(state)的问题。</p>
<h2 id="articleHeader1">核心的概念1</h2>
<p>mobx 最最核心的概念只有2个。 <code>@observable</code> 和 <code>@observer</code> ，它们分别对应的是被观察者和观察者。这是大家常见的观察者模式，不过这里使用了，ES7 中的 <a href="http://es6.ruanyifeng.com/#docs/decorator" rel="nofollow noreferrer" target="_blank">装饰器</a>。</p>
<p>使用 <code>@observable</code> 可以观察类的值。</p>
<p>这里使用 <code>@observable</code> 将 Store 的 <code>todos</code> 变为一个被观察的值。</p>
<h3 id="articleHeader2">observable</h3>
<p><strong>仓库</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 这里引入的是 mobx
import {observable} from 'mobx';

class Store {
  @observable todos = [{
    title: &quot;todo标题&quot;,
    done: false,
  }];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 这里引入的是 mobx</span>
<span class="hljs-keyword">import</span> {observable} <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Store</span> </span>{
  @observable todos = [{
    <span class="hljs-attr">title</span>: <span class="hljs-string">"todo标题"</span>,
    <span class="hljs-attr">done</span>: <span class="hljs-literal">false</span>,
  }];
}</code></pre>
<h3 id="articleHeader3">observer</h3>
<p><strong> mobx 组件</strong></p>
<p>然后再使用 <code>@observer</code> ，将组件变为观察者，响应 <code>todos</code> 状态变化。<br>当状态变化时，组件也会做相应的更新。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 这里引入的是 mobx-react
import {observer} from 'mobx-react';

@observer
class TodoBox extends Component  {
  render() {
    return (
      <ul>
        {this.props.store.todos.map(todo => <li>{todo.title}</li>)}
      </ul>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 这里引入的是 mobx-react</span>
<span class="hljs-keyword">import</span> {observer} <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx-react'</span>;

@observer
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TodoBox</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span>  </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        {this.props.store.todos.map(todo =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>{todo.title}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>)}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
    )
  }
}</code></pre>
<p>完整的 demo 如下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, {Component} from 'react';
import { render } from 'react-dom';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

// 最简单的 mobx 就是一个观察者模式

class Store {
  // 被观察者
  @observable todos = [{
    title: &quot;完成 Mobx 翻译&quot;,
    done: false,
  }];
}

// 观察者
@observer
class TodoBox extends Component  {
  render() {
    return (
      <ul>
        {this.props.store.todos.map(todo => <li>{todo.title}</li>)}
      </ul>
    )
  }
}


const store = new Store();

render(
  <TodoBox store={store} />,
  document.getElementById('root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React, {Component} <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { render } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;
<span class="hljs-keyword">import</span> {observable} <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx'</span>;
<span class="hljs-keyword">import</span> {observer} <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx-react'</span>;

<span class="hljs-comment">// 最简单的 mobx 就是一个观察者模式</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Store</span> </span>{
  <span class="hljs-comment">// 被观察者</span>
  @observable todos = [{
    <span class="hljs-attr">title</span>: <span class="hljs-string">"完成 Mobx 翻译"</span>,
    <span class="hljs-attr">done</span>: <span class="hljs-literal">false</span>,
  }];
}

<span class="hljs-comment">// 观察者</span>
@observer
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TodoBox</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span>  </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
        {this.props.store.todos.map(todo =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>{todo.title}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>)}
      <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>
    )
  }
}


<span class="hljs-keyword">const</span> store = <span class="hljs-keyword">new</span> Store();

render(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">TodoBox</span> <span class="hljs-attr">store</span>=<span class="hljs-string">{store}</span> /&gt;</span>,
  document.getElementById('root')
);</span></code></pre>
<p>通过以上的简单的例子，展现了 mobx 分离数据、视图的能力。</p>
<h2 id="articleHeader4">核心概念2</h2>
<p>这一小节要介绍的两个概念虽然也是核心概念，但是是可选的。</p>
<p>前面例子，只讲了状态的读取，那么状态应该如何写入呢？</p>
<p>答案是直接写入！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@observer
class TodoBox extends Component  {
  render() {
    return (
      <div>
        <ul>
          {this.props.store.todos.map(
            (todo,index) => <li key={index}>{todo.title}</li>
          )}
        </ul>
        <div>
          <input type=&quot;button&quot; onClick={() => {
            // 直接修改仓库中的状态值
            this.props.store.todos[0].title = &quot;修改后的todo标题&quot;
          "}}" value=&quot;点我&quot;/>
        </div>
      </div>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">@observer
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TodoBox</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span>  </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
          {this.props.store.todos.map(
            (todo,index) =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{index}</span>&gt;</span>{todo.title}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
          )}
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"button"</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> {
            // 直接修改仓库中的状态值
            this.props.store.todos[0].title = "修改后的todo标题"
          "}}" value="点我"/&gt;
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    )
  }
}</span></code></pre>
<p>细心的朋友一定发现了奇怪的地方，react 官方说过 <code>props</code> 值不能直接修改，但是引入 mobx 后 <code>props</code> 可以直接修改了，这太奇怪了！</p>
<p>解决办法就是 mobx 的下一个概念 <code>action</code>。</p>
<h3 id="articleHeader5">actions</h3>
<p>首先在 Store 中，定义一个 action。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Store {
  @observable todos = [{
    title: &quot;todo标题&quot;,
    done: false,
  }];
  @action changeTodoTitle({index,title}){
    this.todos[index].title = title
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Store</span> </span>{
  @observable todos = [{
    <span class="hljs-attr">title</span>: <span class="hljs-string">"todo标题"</span>,
    <span class="hljs-attr">done</span>: <span class="hljs-literal">false</span>,
  }];
  @action changeTodoTitle({index,title}){
    <span class="hljs-keyword">this</span>.todos[index].title = title
  }
}</code></pre>
<p>在 Component 中调用，这样通过 action 的方法，就避免了直接修改 <code>props</code> 的问题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;button&quot; onClick={() => {
  this.props.store.changeTodoTitle({index:0,title:&quot;修改后的todo标题&quot;});
"}}" value=&quot;点我&quot;/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;input type=<span class="hljs-string">"button"</span> onClick={() =&gt; {
  <span class="hljs-keyword">this</span>.props.store.changeTodoTitle({<span class="hljs-attr">index</span>:<span class="hljs-number">0</span>,<span class="hljs-attr">title</span>:<span class="hljs-string">"修改后的todo标题"</span>});
"}}" value=<span class="hljs-string">"点我"</span>/&gt;</code></pre>
<p>可以通过引入 mobx 定义的严格模式，强制使用 action 来修改状态。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import {useStrict} from 'mobx';

useStrict(true);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> {useStrict} <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx'</span>;

useStrict(<span class="hljs-literal">true</span>);</code></pre>
<h3 id="articleHeader6">computed values</h3>
<p>在有些时候，state 并不一定是我们需要的最终数据。例如，所有的 todo 都放在 store.todos 中，而已经完成的 todos 的值(store.unfinishedTodos)，可以由 store.todos 衍生而来。</p>
<p>对此，mobx 提供了 <code>computed</code> 装饰器，用于获取由基础 state 衍生出来的值。如果基础值没有变，获取衍生值时就会走缓存，这样就不会引起虚拟 DOM 的重新渲染。</p>
<p>通过 <code>@computed</code> + <code>getter</code> 函数来定义衍生值（computed values）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { computed } from 'mobx';

class Store {
  @observable todos = [{
    title: &quot;todo标题&quot;,
    done: false,
  },{
    title: &quot;已经完成 todo 的标题&quot;,
    done: true,
  }];

  @action changeTodoTitle({index,title}){
    this.todos[index].title = title
  }

  @computed get finishedTodos () {
    return  this.todos.filter((todo) => todo.done)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { computed } <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Store</span> </span>{
  @observable todos = [{
    <span class="hljs-attr">title</span>: <span class="hljs-string">"todo标题"</span>,
    <span class="hljs-attr">done</span>: <span class="hljs-literal">false</span>,
  },{
    <span class="hljs-attr">title</span>: <span class="hljs-string">"已经完成 todo 的标题"</span>,
    <span class="hljs-attr">done</span>: <span class="hljs-literal">true</span>,
  }];

  @action changeTodoTitle({index,title}){
    <span class="hljs-keyword">this</span>.todos[index].title = title
  }

  @computed get finishedTodos () {
    <span class="hljs-keyword">return</span>  <span class="hljs-keyword">this</span>.todos.filter(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span> todo.done)
  }
}</code></pre>
<p>mobx 有一套机制，如果衍生值（computed values）所依赖的基础状态（state）没有发生改变，获取衍生值时，不会重新计算，而是走的缓存。因此 mobx 不会引起过度渲染，从而保障了性能。</p>
<p>当渲染的值为 finishedTodos ，点击修改标题，不会在控制台打印 "render";<br>换成 todos，就会打印 "render".<br>这是由于已完成的 todos 值没有改变，所以不会重新计算，而是走的缓存。因此不会调用 render 方法。</p>
<p>完整 demo 如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, {Component} from 'react';
import { render } from 'react-dom';
import {observable, action, computed,useStrict} from 'mobx';
import {observer} from 'mobx-react';

useStrict(true);


class Store {
  @observable todos = [{
    title: &quot;todo标题&quot;,
    done: false,
  },{
    title: &quot;已经完成 todo 的标题&quot;,
    done: true,
  }];

  @action changeTodoTitle({index,title}){
    this.todos[index].title = title
  }

  @computed get unfinishedTodos () {
    return  this.todos.filter((todo) => todo.done)
  }
}


@observer
class TodoBox extends Component  {

  render() {
    console.log('render');
    return (
      <div>
        <ul>
          { /* 把 unfinishedTodos 换成 todos，点击修改标题就会在控制台打印 &quot;render&quot;.*/ }
          {this.props.store.unfinishedTodos.map(
            (todo,index) => <li key={index}>{todo.title}</li>
          )}
        </ul>
        <div>
          <input type=&quot;button&quot; onClick={() => {
            this.props.store.changeTodoTitle({index:0,title:&quot;修改后的todo标题&quot;});
          "}}" value=&quot;修改标题&quot;/>
        </div>
      </div>
    )
  }
}

const store = new Store();

render(
  <TodoBox store={store} />,
  document.getElementById('root')
);




" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React, {Component} <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> { render } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;
<span class="hljs-keyword">import</span> {observable, action, computed,useStrict} <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx'</span>;
<span class="hljs-keyword">import</span> {observer} <span class="hljs-keyword">from</span> <span class="hljs-string">'mobx-react'</span>;

useStrict(<span class="hljs-literal">true</span>);


<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Store</span> </span>{
  @observable todos = [{
    <span class="hljs-attr">title</span>: <span class="hljs-string">"todo标题"</span>,
    <span class="hljs-attr">done</span>: <span class="hljs-literal">false</span>,
  },{
    <span class="hljs-attr">title</span>: <span class="hljs-string">"已经完成 todo 的标题"</span>,
    <span class="hljs-attr">done</span>: <span class="hljs-literal">true</span>,
  }];

  @action changeTodoTitle({index,title}){
    <span class="hljs-keyword">this</span>.todos[index].title = title
  }

  @computed get unfinishedTodos () {
    <span class="hljs-keyword">return</span>  <span class="hljs-keyword">this</span>.todos.filter(<span class="hljs-function">(<span class="hljs-params">todo</span>) =&gt;</span> todo.done)
  }
}


@observer
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TodoBox</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span>  </span>{

  render() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'render'</span>);
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;ul&gt;
          { /* 把 unfinishedTodos 换成 todos，点击修改标题就会在控制台打印 "render".*/ }
          {this.props.store.unfinishedTodos.map(
            (todo,index) =&gt; &lt;li key={index}&gt;{todo.title}&lt;/li&gt;
          )}
        &lt;/ul&gt;
        &lt;div&gt;
          &lt;input type="button" onClick={() =&gt; {
            this.props.store.changeTodoTitle({index:0,title:"修改后的todo标题"});
          "}}" value="修改标题"/&gt;
        &lt;/div&gt;
      &lt;/div&gt;
    )
  }
}

const store = new Store();

render(
  &lt;TodoBox store={store} /&gt;,
  document.getElementById('root')
);




</code></pre>
<h2 id="articleHeader7">小结</h2>
<p>翻译了官网的一段文章，就拿过来做小结了。</p>
<p>mobx 是一个的简单、可扩展的状态管理库。它背后的哲学非常简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="应用程序 state 是最基础的数据。任何可以从 state 中衍生出来的数据，都应该自动的被衍生出。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code style="word-break: break-word; white-space: initial;">应用程序 <span class="hljs-keyword">state</span> 是最基础的数据。任何可以从 <span class="hljs-keyword">state</span> 中衍生出来的数据，都应该自动的被衍生出。</code></pre>
<p><span class="img-wrap"><img data-src="http://oi9t94i28.bkt.clouddn.com/mobx.png" src="https://static.alili.techhttp://oi9t94i28.bkt.clouddn.com/mobx.png" alt="img" title="img" style="cursor: pointer; display: inline;"></span></p>
<p><strong>actions</strong> 是唯一能够改变 state 的方法。</p>
<p><strong>state</strong> 是最基础的数据，它不应该包含冗余的和派生的数据。</p>
<p><strong>computed values</strong> 派生值是通过纯函数从 state 中派生而来的。当派生值依赖的状态发生变化了，Mobx 将会自动更新派生值。如果依赖的状态没有改变，mobx 会做优化处理。</p>
<p><strong>reactions</strong> 也是派生数据，是从 state 中派生而来的。它的副作用是自动更新 UI。（注：mobx 有一个 reaction 接口，当 state 改变时，就会调用它的回调。UI 是通过 reaction 更新的。）</p>
<p>React 和 MobX 是非常强大的组合。React 提供了将应用状态映射为可渲染的组件树的机制。MobX 提供存储和更新应用状态的机制，供 React 使用。</p>
<p>React 和 MobX 提供了开发过程中常见问题的解决方案。 React 通过使用虚拟 DOM，减少了对浏览器 DOM 的操作。MobX 通过使用了响应式虚拟依赖状态图(reactive virtual dependency state graph) ，提供了应用程序状态与 React 组件同步的机制，这样 state 只会在需要时更新才会更新。（译者注：这段有点难理解，大概的意思是 Mobx 关注的是 store 到 state 的过程，React 关注的是 state 到 view 的过程）。</p>
<h2 id="articleHeader8">辅助函数</h2>
<p>在实际开发中，需要用到不少 mobx 的辅助函数，这些辅助函数一共 14 个，挑了一些列举如下。</p>
<p><strong>autorun</strong><br>observable 的值初始化或改变时，自动运行。</p>
<p><strong>trasaction</strong><br>批量改变时，通过 trasaction 包装，只会触发一次 autorun。</p>
<p><strong>extendsObservable</strong><br>对类的属性或实例，进行监听。</p>
<p><strong>observable</strong><br>对普通对象进行监听。</p>
<p><strong>map</strong><br>使用 asMap 将对象转化为 map。</p>
<p><strong>action-strict</strong><br>在 mobx.usrStrict(true)时，只能通过 action 触发值的改变。</p>
<p><strong>when</strong><br>类似 autorun.</p>
<p>mobx.when 第一个参数是一个函数，初始化时也会自动执行。该函数返回一个 boolean 值，当返回值为 true 的时候，才会继续触发第一个函数。当返回值为 flase 时，不再继续监听。这时会执行 mobx.when 的第二个参数，这个参数也是一个函数。</p>
<p><strong>reaction</strong><br>类似 autorun.</p>
<p>reaction 不会在初始化时执行，只会在值改变的时候执行。</p>
<p>该函数有 2 个值，第一个参数是一个函数，返回监听的值.<br>第二个参数，也是一个函数，会在值改变的时候执行。</p>
<p><strong>spy</strong><br>类似 aoturun.</p>
<p>监听所有 mobx 的事件。</p>
<p>包含一个 type ，该值用来区分执行事件的类型。</p>
<p><strong>whyRun</strong><br>用于调试，打印 autorun 为什么会触发。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
mobx——rudex的简单替代品

## 原文链接
[https://segmentfault.com/a/1190000007938992](https://segmentfault.com/a/1190000007938992)

