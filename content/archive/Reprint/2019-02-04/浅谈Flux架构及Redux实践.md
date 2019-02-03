---
title: '浅谈Flux架构及Redux实践' 
date: 2019-02-04 2:30:58
hidden: true
slug: zfcaxswuv0l
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">Flux概述</h2>
<p>Flux是Facebook用来构建用户端的Web应用程序的体系架构，与其它形式化的框架相比，它更像是一个架构思想，用于管理和控制应用中数据的流向。这里应用中的数据指包括但不限于来自服务端的数据页面中view的一些状态(如一个面板是展开还是关闭)，临时存储在本地需要持久化到服务端的数据等。</p>
<p>好了，说了这么多好像还是一脸懵逼，不慌，接下来看看展开式。</p>
<p><span class="img-wrap"><img data-src="/img/bVCsa1" src="https://static.alili.tech/img/bVCsa1" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">MVC</h3>
<p>在讲述<a href="https://facebook.github.io/flux/docs/overview.html" rel="nofollow noreferrer" target="_blank">Flux</a>之前，我们看看之前传统的MVC架构以及在前端中的一些问题继而思考Flux带来的改变。<a href="https://zh.wikipedia.org/wiki/MVC" rel="nofollow noreferrer" target="_blank">MVC</a>(Model-View-Controller)最先兴起于后端，通过对应用程序复杂度的简化使程序更加直观和便于维护。后端程序MVC中View可以看为数据的呈现，Model为数据的模型，Controller作为程序的流程控制。现在假设有这样的场景，用户想查看自己的profile页面，可能会有这样的流程：在页面上点击profile按钮，接下来就是一个HTTP请求(/profile?username=jiavan) =&gt; Controller接收到这一请求并获得请求的内容username=jiavan然后告知Model需要jiavan的数据 =&gt; Model返回了jiavan的数据 =&gt; Controller得到数据返回新的视图，看下流程：</p>
<p><span class="img-wrap"><img data-src="/img/bVCsaZ" src="https://static.alili.tech/img/bVCsaZ" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>现在前端中又有这样的场景：切换Menu中的Item，当前选中的Item颜色不同于其它颜色并且底部显示对应Item的内容。一般情况下我们会定义一个css class来作为当前选中Item的样式。当用户点击Item_A为被点击的元素新增高亮的class，其它兄弟元素移除该样式，这里的事件响应函数就是Controller，我们会在这里处理样式修改逻辑，以及更新Model的数据，然后新的数据及样式重新渲染界面。这种<code>VC&lt;-&gt;M</code>的形式在关系比较简单的情况下是比较清晰容易控制的，但是复杂的页面上这样的模式可能会变得非常混乱：</p>
<p><span class="img-wrap"><img data-src="/img/bVCsa8" src="https://static.alili.tech/img/bVCsa8" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>之所以变得混乱了，因为很多view都具备修改多个model的能力，这里的单个修改行为可以称之为一个Action，一个Action的产生可能是用户行为，或者一个Ajax请求需要渲染新界面。对比上面后端传统MVC模式可以发现：</p>
<ul>
<li><p>后端中Action作为一个URL请求，前端中可能是一个事件；</p></li>
<li><p>后端中Action处理被集中在Controller中，而前端中是分散的。</p></li>
</ul>
<p>那么是不是可以把前端中修改状态即state的行为(事件回调/Ajax)全部抽象成一种Action描述，然后交付到一处即Reducers来进行原子化处理，然后Reducer修改整个应用中唯一的一棵state tree即Store，最后通过state-&gt;view的机制来重新渲染?</p>
<h3 id="articleHeader2">Flux数据流框架</h3>
<p>上面提到的几个概念已经对Flux有了初步的了解，下面进入正题。相信有了解Flux的都应该看过下面这张著名的数据流图：</p>
<p><span class="img-wrap"><img data-src="/img/bVCsba" src="https://static.alili.tech/img/bVCsba" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<ol>
<li><p>Action可以看成是修改Store的行为抽象；</p></li>
<li><p>Dispatcher管理着应用的数据流，可以看为Action到Store的分发器；</p></li>
<li><p>Store管理着整个应用的状态和逻辑，类似MVC中的Model。</p></li>
</ol>
<p>所以Flux可以被看作传统MVC的改进而非颠覆，当我第一次看到Flux的时候其实是比较懵逼，但看到并使用了Redux后确实有一种非常惊艳的感觉。</p>
<h2 id="articleHeader3">Redux</h2>
<p>按照Redux官方的描述<code>Redux is a predictable state container for JavaScript apps.</code>，其中<code>predictable</code>和<code>state container</code>体现了它的作用。那么如何来理解<code>可预测化</code>的呢？这里会有一些函数式编程方面的思想，在Redux中reducer函数是一个纯函数，相同输入一定会是一致的输出，所以确定输入的state那么reducer函数输出的state一定是可以被预测的，因为它只会进行单纯的计算，保证正确的输出。<code>状态容器</code>又是什么？说明Redux有一个专门管理state的地方，就是Store，并且一般情况下是唯一的，应用中所有state形成的一颗状态树就是Store。Redux由Flux演变而来，但受 <a href="http://elm-lang.org/" rel="nofollow noreferrer" target="_blank">Elm</a> 的启发，避开了 Flux 的复杂性，我们看看其数据流向：</p>
<p><span class="img-wrap"><img data-src="/img/bVCsbb" src="https://static.alili.tech/img/bVCsbb" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>不同于Flux架构，Redux中没有dispatcher这个概念，并且Redux设想你永远不会变动你的数据，你应该在reducer中返回新的对象来作为应用的新状态。但是它们都可以用<code>(state, action) =&gt; newState</code>来表述其核心思想，所以Redux可以被看成是Flux思想的一种实现，但是在细节上会有一些差异。</p>
<h3 id="articleHeader4">重要概念</h3>
<ol>
<li><p>应用中的所有state都以<code>一个object tree</code>的形式存储在一个单一的store中；</p></li>
<li><p>唯一能改store的方法是触发action，action是<code>动作行为的抽象</code>；</p></li>
<li><p>为了描述action如何改变state树，需要编写reducer函数。</p></li>
</ol>
<p>这里需要说明一点的是reducer函数，它应当是一个纯函数，不应该有副作用，不应有API调用，<code>Date.now()</code>或者随机获取等不稳定的操作，应当保证相同的输入reducer计算的结果应该是一致的输出，它只会进行单纯的计算。编写reducer函数也是Redux中比较重要的一块，它的形式如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function testReducer(state, action) {
  switch (action.type) {
    case ACTION_TYPE:
      // calc...
      return newState;
    default: return state;
  }
  return newState;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">testReducer</span>(<span class="hljs-params">state, action</span>) </span>{
  <span class="hljs-keyword">switch</span> (action.type) {
    <span class="hljs-keyword">case</span> ACTION_TYPE:
      <span class="hljs-comment">// calc...</span>
      <span class="hljs-keyword">return</span> newState;
    <span class="hljs-keyword">default</span>: <span class="hljs-keyword">return</span> state;
  }
  <span class="hljs-keyword">return</span> newState;
}</code></pre>
<p>state是不可修改的，所以返回的新state应该是基于输入state副本的修改，而不是直接修改state后的返回。</p>
<h3 id="articleHeader5">原则</h3>
<p><strong>1. 单一数据源，store</strong><br><br>整个应用的state被存放在一棵Object tree中，并且这个Object tree只存在唯一一个store中；</p>
<p><strong>2. state是只读的</strong><br><br>唯一能改变state的方法是触发action，action是对已经发生了的事情的抽象描述，简单的讲，它把行为抽象成了一个对象。</p>
<p>比如，删除一条记录的action可以抽象的理解为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  type: 'DELETE_ITEM',
  index: 1,
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-attr">type</span>: <span class="hljs-string">'DELETE_ITEM'</span>,
  <span class="hljs-attr">index</span>: <span class="hljs-number">1</span>,
}</code></pre>
<p><strong>3. 使用纯函数来实现state归并操作，reducer</strong><br><br>传入待修改的state和一个告知reducer如何修改state的action，reducer将返回action规则对应下操作后的新的state。</p>
<p>reducer(state, action) =&gt; new state</p>
<h3 id="articleHeader6">数据流</h3>
<p><code>严格的单向数据流是Redux设计的核心</code><br>Redux应用数据的生命周期遵循下面4个步骤：</p>
<ol>
<li><p>调用store.dispatch(action), 可以在任何地方进行;</p></li>
<li><p>Redux store调用传入的reducer函数，并且将当前的state树与action传入。reducer是纯函数，只用于计算下一个state，它应该是完全可被预测的，相同的输入必定会有相同的输出，不能有副作用的操作，如API的调用或者路由跳转，这些应该都是在dispatch前产生；</p></li>
<li><p>根reducer将多个子reducer输出合并成一个单一的state树；</p></li>
<li><p>Redux store保存了根reducer返回的完整的state树。<br><code>新的state树就是应用的下一个状态</code>，现在就可以根据新的state tree来渲染UI。</p></li>
</ol>
<h2 id="articleHeader7">Redux实践</h2>
<p>我们通过一个非常简单的计数器demo来梳理Redux的数据流。</p>
<p><strong>0x00. 创建action</strong><br><br>action其实就是一个普通的对象，只是对行为的抽象描述，这里我们可以把加上一个数描述为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  type: INCREMENT, //该动作的抽象描述
  number, // 该动作携带的数据
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-attr">type</span>: INCREMENT, <span class="hljs-comment">//该动作的抽象描述</span>
  number, <span class="hljs-comment">// 该动作携带的数据</span>
}</code></pre>
<p>更多的时候我们会通过一个action生成函数来得到一个action：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function incrementCreator(number) {
  return {
    type: INCREMENT,
    number,
  };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">incrementCreator</span>(<span class="hljs-params">number</span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">type</span>: INCREMENT,
    number,
  };
}</code></pre>
<p><strong>0x01. 创建reducer函数</strong><br><br>reducer作为整个Redux中action的处理中枢，接收state与action并对此修改数据，返回应用的下一个状态。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function countReducer(state, action) {
  switch (action.type) {
    case INCREMENT:
      return Object.assign({}, {
        counter: state.counter + action.number,
      });
    case DECREMENT:
      return Object.assign({}, {
        counter: state.counter - action.number,
      });
    default: return state;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">countReducer</span>(<span class="hljs-params">state, action</span>) </span>{
  <span class="hljs-keyword">switch</span> (action.type) {
    <span class="hljs-keyword">case</span> INCREMENT:
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.assign({}, {
        <span class="hljs-attr">counter</span>: state.counter + action.number,
      });
    <span class="hljs-keyword">case</span> DECREMENT:
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.assign({}, {
        <span class="hljs-attr">counter</span>: state.counter - action.number,
      });
    <span class="hljs-keyword">default</span>: <span class="hljs-keyword">return</span> state;
  }
}</code></pre>
<p>注意：上面我们已经提到多次，state是不可修改的，所以通过<code>assign</code>归并我们对数据的操作，返回的是state副本修改后的对象，并非直接修改了输入的state。</p>
<p><strong>0x02. 创建唯一store</strong><br><br>通过Redux中的createStore方法传入reducer函数来创建整个应用的store。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const store = createStore(countReducer);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> store = createStore(countReducer);</code></pre>
<p><strong>0x03. 修改state</strong><br><br>通过store的dispatch方法来发起一个action。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="store.dispatch(incrementCreator(5));
store.dispatch(decrementCreator(4));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">store.dispatch(incrementCreator(<span class="hljs-number">5</span>));
store.dispatch(decrementCreator(<span class="hljs-number">4</span>));</code></pre>
<h3 id="articleHeader8">完整demo</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createStore } from 'redux';

// actions
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

// actionCreator，可以视为创建action的语法糖
function incrementCreator(number) {
  return {
    type: INCREMENT,
    number,
  };
}

function decrementCreator(number) {
  return {
    type: DECREMENT,
    number,
  };
}

// 初始化state
const initialState = {
  counter: 0,
};

// reducers函数，注意最后一定要return state防止不能匹配到action的时候state丢失
function countReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      return Object.assign({}, {
        counter: state.counter + action.number,
      });
    case DECREMENT:
      return Object.assign({}, {
        counter: state.counter - action.number,
      });
    default: return state;
  }
}

// 创建store
const store = createStore(countReducer);

// 订阅store的修改
const unsubscribe = store.subscribe(function log() {
  console.log(store.getState());
});

// 通过dispatch action来改变state
store.dispatch(incrementCreator(5)); //Object {counter: 5}
store.dispatch(decrementCreator(4)); //Object {counter: 1}

// 取消订阅
unsubscribe();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { createStore } <span class="hljs-keyword">from</span> <span class="hljs-string">'redux'</span>;

<span class="hljs-comment">// actions</span>
<span class="hljs-keyword">const</span> INCREMENT = <span class="hljs-string">'INCREMENT'</span>;
<span class="hljs-keyword">const</span> DECREMENT = <span class="hljs-string">'DECREMENT'</span>;

<span class="hljs-comment">// actionCreator，可以视为创建action的语法糖</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">incrementCreator</span>(<span class="hljs-params">number</span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">type</span>: INCREMENT,
    number,
  };
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">decrementCreator</span>(<span class="hljs-params">number</span>) </span>{
  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">type</span>: DECREMENT,
    number,
  };
}

<span class="hljs-comment">// 初始化state</span>
<span class="hljs-keyword">const</span> initialState = {
  <span class="hljs-attr">counter</span>: <span class="hljs-number">0</span>,
};

<span class="hljs-comment">// reducers函数，注意最后一定要return state防止不能匹配到action的时候state丢失</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">countReducer</span>(<span class="hljs-params">state = initialState, action</span>) </span>{
  <span class="hljs-keyword">switch</span> (action.type) {
    <span class="hljs-keyword">case</span> INCREMENT:
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.assign({}, {
        <span class="hljs-attr">counter</span>: state.counter + action.number,
      });
    <span class="hljs-keyword">case</span> DECREMENT:
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">Object</span>.assign({}, {
        <span class="hljs-attr">counter</span>: state.counter - action.number,
      });
    <span class="hljs-keyword">default</span>: <span class="hljs-keyword">return</span> state;
  }
}

<span class="hljs-comment">// 创建store</span>
<span class="hljs-keyword">const</span> store = createStore(countReducer);

<span class="hljs-comment">// 订阅store的修改</span>
<span class="hljs-keyword">const</span> unsubscribe = store.subscribe(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">log</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(store.getState());
});

<span class="hljs-comment">// 通过dispatch action来改变state</span>
store.dispatch(incrementCreator(<span class="hljs-number">5</span>)); <span class="hljs-comment">//Object {counter: 5}</span>
store.dispatch(decrementCreator(<span class="hljs-number">4</span>)); <span class="hljs-comment">//Object {counter: 1}</span>

<span class="hljs-comment">// 取消订阅</span>
unsubscribe();</code></pre>
<h2 id="articleHeader9">参考并推荐阅读</h2>
<ul>
<li><p><a href="https://facebook.github.io/flux/docs/overview.html" rel="nofollow noreferrer" target="_blank">https://facebook.github.io/fl...</a></p></li>
<li><p><a href="http://cn.redux.js.org/index.html" rel="nofollow noreferrer" target="_blank">http://cn.redux.js.org/index....</a></p></li>
<li><p><a href="https://www.zhihu.com/question/47686258" rel="nofollow noreferrer" target="_blank">https://www.zhihu.com/questio...</a></p></li>
<li><p><a href="https://github.com/react-guide/redux-tutorial-cn" rel="nofollow noreferrer" target="_blank">https://github.com/react-guid...</a></p></li>
<li><p><a href="http://www.ruanyifeng.com/blog/2016/01/flux.html" rel="nofollow noreferrer" target="_blank">http://www.ruanyifeng.com/blo...</a></p></li>
</ul>
<p>原文链接 <a href="http://jiavan.com/flux-and-redux/" rel="nofollow noreferrer" target="_blank">http://jiavan.com/flux-and-re...</a> 转载请注明出处。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
浅谈Flux架构及Redux实践

## 原文链接
[https://segmentfault.com/a/1190000006742449](https://segmentfault.com/a/1190000006742449)

