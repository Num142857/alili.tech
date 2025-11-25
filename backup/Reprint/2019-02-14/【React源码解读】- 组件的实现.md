---
title: '【React源码解读】- 组件的实现' 
date: 2019-02-14 2:30:37
hidden: true
slug: 9aew60voxm6
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">前言</h3>
<p>react使用也有一段时间了，大家对这个框架褒奖有加，但是它究竟好在哪里呢？<br>让我们结合它的源码，探究一二！（当前源码为react16，读者要对react有一定的了解）</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016862184" src="https://static.alili.tech/img/remote/1460000016862184" alt="15397566862932" title="15397566862932" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">回到最初</h3>
<p>根据react官网上的例子，快速构建react项目</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npx create-react-app my-app

cd my-app

npm start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">npx create-react-app my-app

cd my-app

npm start</code></pre>
<p>打开项目并跑起来以后，暂不关心项目结构及语法糖，看到<code>App.js</code>里，这是一个基本的react组件&lt;App/&gt; 我们console一下，看看有什么结果。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className=&quot;App&quot;>
        <header className=&quot;App-header&quot;>
          <img src={logo} className=&quot;App-logo&quot; alt=&quot;logo&quot; />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
        </header>
      </div>
    );
  }
}

export default App;

console.log(<App/>)

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> logo <span class="hljs-keyword">from</span> <span class="hljs-string">'./logo.svg'</span>;
<span class="hljs-keyword">import</span> <span class="hljs-string">'./App.css'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{

  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"App"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">header</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"App-header"</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">{logo}</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"App-logo"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"logo"</span> /&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>
            Edit <span class="hljs-tag">&lt;<span class="hljs-name">code</span>&gt;</span>src/App.js<span class="hljs-tag">&lt;/<span class="hljs-name">code</span>&gt;</span> and save to reload.
          <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    );
  }
}

export default App;

console.log(<span class="hljs-tag">&lt;<span class="hljs-name">App</span>/&gt;</span>)

</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016862185" src="https://static.alili.tech/img/remote/1460000016862185" alt="15397572879758" title="15397572879758" style="cursor: pointer;"></span></p>
<p>可以看到，<code>&lt;App/&gt;</code>组件其实是一个JS对象，并不是一个真实的dom。</p>
<blockquote>ES6 引入了一种新的原始数据类型Symbol，表示独一无二的值。有兴趣的同学可以去阮一峰老师的ES6入门详细了解一下</blockquote>
<p>上面有我们很熟悉的<code>props</code>,<code>ref</code>,<code>key</code>,我们稍微修改一下console，看看有什么变化。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log(<App key={1} abc={2}><div>你好，这里是App组件</div></App>)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">console</span>.log(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">App</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{1}</span> <span class="hljs-attr">abc</span>=<span class="hljs-string">{2}</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>你好，这里是App组件<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">App</span>&gt;</span></span>)</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016862186?w=799&amp;h=305" src="https://static.alili.tech/img/remote/1460000016862186?w=799&amp;h=305" alt="15397577334580" title="15397577334580" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到，<code>props</code>,<code>key</code>都发生了变化，值就是我们赋予的值，<code>props</code>中嵌套了children属性。可是为什么我们嵌入的是div，实际上却是一个对象呢？</p>
<h3 id="articleHeader2">打开源码</h3>
<blockquote>/node_modules/react</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016862187?w=322&amp;h=230" src="https://static.alili.tech/img/remote/1460000016862187?w=322&amp;h=230" alt="15397580720896" title="15397580720896" style="cursor: pointer; display: inline;"></span></p>
<p>首先打开<code>index.js</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict';

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./cjs/react.production.min.js');
} else {
  module.exports = require('./cjs/react.development.js');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-meta">'use strict'</span>;

<span class="hljs-keyword">if</span> (process.env.NODE_ENV === <span class="hljs-string">'production'</span>) {
  <span class="hljs-built_in">module</span>.exports = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./cjs/react.production.min.js'</span>);
} <span class="hljs-keyword">else</span> {
  <span class="hljs-built_in">module</span>.exports = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./cjs/react.development.js'</span>);
}</code></pre>
<p>可以知道目前用上的是<code>./cjs/react.development.js</code>,直接打开文件。<br>根据最初的代码，我们组件<code>&lt;App/&gt;</code>用到了<strong>React.Component</strong>。找到React暴露的接口:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016862188?w=842&amp;h=650" src="https://static.alili.tech/img/remote/1460000016862188?w=842&amp;h=650" alt="15397617558881" title="15397617558881" style="cursor: pointer;"></span></p>
<p>接着找到<code>Component: Component</code>方法，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Component(props, context, updater) {
  this.props = props;
  this.context = context;
  // If a component has string refs, we will assign a different object later.
  this.refs = emptyObject;
  // We initialize the default updater but the real one gets injected by the
  // renderer.
  this.updater = updater || ReactNoopUpdateQueue;
}

Component.prototype.isReactComponent = {};

Component.prototype.setState = function (partialState, callback) {
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ? invariant(false, 'setState(...): takes an object of state variables to update or a function which returns an object of state variables.') : void 0;
  this.updater.enqueueSetState(this, partialState, callback, 'setState');
};

Component.prototype.forceUpdate = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdate');
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Component</span>(<span class="hljs-params">props, context, updater</span>) </span>{
  <span class="hljs-keyword">this</span>.props = props;
  <span class="hljs-keyword">this</span>.context = context;
  <span class="hljs-comment">// If a component has string refs, we will assign a different object later.</span>
  <span class="hljs-keyword">this</span>.refs = emptyObject;
  <span class="hljs-comment">// We initialize the default updater but the real one gets injected by the</span>
  <span class="hljs-comment">// renderer.</span>
  <span class="hljs-keyword">this</span>.updater = updater || ReactNoopUpdateQueue;
}

Component.prototype.isReactComponent = {};

Component.prototype.setState = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">partialState, callback</span>) </span>{
  !(<span class="hljs-keyword">typeof</span> partialState === <span class="hljs-string">'object'</span> || <span class="hljs-keyword">typeof</span> partialState === <span class="hljs-string">'function'</span> || partialState == <span class="hljs-literal">null</span>) ? invariant(<span class="hljs-literal">false</span>, <span class="hljs-string">'setState(...): takes an object of state variables to update or a function which returns an object of state variables.'</span>) : <span class="hljs-keyword">void</span> <span class="hljs-number">0</span>;
  <span class="hljs-keyword">this</span>.updater.enqueueSetState(<span class="hljs-keyword">this</span>, partialState, callback, <span class="hljs-string">'setState'</span>);
};

Component.prototype.forceUpdate = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">callback</span>) </span>{
  <span class="hljs-keyword">this</span>.updater.enqueueForceUpdate(<span class="hljs-keyword">this</span>, callback, <span class="hljs-string">'forceUpdate'</span>);
};
</code></pre>
<p>上面就是一些简单的构造函数，也可以看到，我们常用的setState是定义在原型上的2个方法。</p>
<p>至此，一个<code>&lt;App/&gt;</code>组件已经有一个大概的雏形：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016862189" src="https://static.alili.tech/img/remote/1460000016862189" alt="15397595217487" title="15397595217487" style="cursor: pointer; display: inline;"></span></p>
<p>到此为止了吗？这看了等于没看啊，究竟组件是怎么变成div的？render吗？<br>可是全局搜索，也没有一个function是render啊。</p>
<p>原来，我们的jsx语法会被<code>babel</code>编译的。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016862190" src="https://static.alili.tech/img/remote/1460000016862190" alt="15397600724075" title="15397600724075" style="cursor: pointer; display: inline;"></span></p>
<p>这下清楚了，还用到了<code>React.createElement</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="createElement: createElementWithValidation," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">createElement: createElementWithValidation,</code></pre>
<p>通过<code>createElementWithValidation</code>,</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createElementWithValidation(type, props, children) {
······

  var element = createElement.apply(this, arguments);


  return element;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createElementWithValidation</span>(<span class="hljs-params">type, props, children</span>) </span>{
······

  <span class="hljs-keyword">var</span> element = createElement.apply(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">arguments</span>);


  <span class="hljs-keyword">return</span> element;
}</code></pre>
<p>可以看到，return了一个element，这个element又是继承自<code>createElement</code>，接着往下找：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function createElement(type, config, children) {
  var propName = void 0;

  // Reserved names are extracted
  var props = {};

  var key = null;
  var ref = null;
  var self = null;
  var source = null;
······
  return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createElement</span>(<span class="hljs-params">type, config, children</span>) </span>{
  <span class="hljs-keyword">var</span> propName = <span class="hljs-keyword">void</span> <span class="hljs-number">0</span>;

  <span class="hljs-comment">// Reserved names are extracted</span>
  <span class="hljs-keyword">var</span> props = {};

  <span class="hljs-keyword">var</span> key = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">var</span> ref = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">var</span> self = <span class="hljs-literal">null</span>;
  <span class="hljs-keyword">var</span> source = <span class="hljs-literal">null</span>;
······
  <span class="hljs-keyword">return</span> ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
}</code></pre>
<p>这里又返回了一个<code>ReactElement</code>方法，再顺着往下找：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,

    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,

    // Record the component responsible for creating this element.
    _owner: owner
  };

······
  return element;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> ReactElement = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">type, key, ref, self, source, owner, props</span>) </span>{
  <span class="hljs-keyword">var</span> element = {
    <span class="hljs-comment">// This tag allows us to uniquely identify this as a React Element</span>
    $$<span class="hljs-keyword">typeof</span>: REACT_ELEMENT_TYPE,

    <span class="hljs-comment">// Built-in properties that belong on the element</span>
    type: type,
    <span class="hljs-attr">key</span>: key,
    <span class="hljs-attr">ref</span>: ref,
    <span class="hljs-attr">props</span>: props,

    <span class="hljs-comment">// Record the component responsible for creating this element.</span>
    _owner: owner
  };

······
  <span class="hljs-keyword">return</span> element;
};</code></pre>
<p>诶，这里好像返回的就是<code>element</code>对象，再看我们最初的<code>&lt;App/&gt;</code>的结构，是不是很像</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016862191" src="https://static.alili.tech/img/remote/1460000016862191" alt="15397606651880" title="15397606651880" style="cursor: pointer;"></span>验证一下我们的探索究竟对不对，再每一个方法上我们都打上console,(注意，将App里的子元素全部删空，利于我们观察)</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016862192" src="https://static.alili.tech/img/remote/1460000016862192" alt="15397611759810" title="15397611759810" style="cursor: pointer;"></span></p>
<p>React.createElement 、 createElementWithValidation 、 createElement 、 ReactElement，通过这些方法，我们用class声明的React组件在变成真实dom之前都是<code>ReactElement</code>类型的js对象</p>
<p><code>createElementWithValidation</code>:</p>
<ul><li>首先校验type是否是合法的</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016862193" src="https://static.alili.tech/img/remote/1460000016862193" alt="15397657382603" title="15397657382603" style="cursor: pointer; display: inline;"></span></p>
<ul><li>校验了props是否符合设置的proptypes</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016862194" src="https://static.alili.tech/img/remote/1460000016862194" alt="15397667118968" title="15397667118968" style="cursor: pointer; display: inline;"></span></p>
<ul><li>校验了子节点的key，确保每个数组中的元素都有唯一的key</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016862195" src="https://static.alili.tech/img/remote/1460000016862195" alt="15397667422295" title="15397667422295" style="cursor: pointer; display: inline;"></span></p>
<p><code>createElement</code>：</p>
<ul>
<li>type是你要创建的元素的类型，可以是html的div或者span，也可以是其他的react组件，注意大小写</li>
<li>config中包含了props、key、ref、self、source等</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016862196" src="https://static.alili.tech/img/remote/1460000016862196" alt="15397667913454" title="15397667913454" style="cursor: pointer; display: inline;"></span></p>
<ul><li>向props加入children，如果是一个就放一个对象，如果是多个就放入一个数组。</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016862197?w=645&amp;h=413" src="https://static.alili.tech/img/remote/1460000016862197?w=645&amp;h=413" alt="15397668352993" title="15397668352993" style="cursor: pointer; display: inline;"></span></p>
<ul><li>那如果type.defaultProps有默认的props时，并且对应的props里面的值是undefined，把默认值赋值到props中</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016862198" src="https://static.alili.tech/img/remote/1460000016862198" alt="15397668766904" title="15397668766904" style="cursor: pointer;"></span></p>
<ul><li>也会对key和ref进行校验</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016862199" src="https://static.alili.tech/img/remote/1460000016862199" alt="15397669476655" title="15397669476655" style="cursor: pointer;"></span></p>
<p><code>ReactElement</code>：</p>
<p>ReactElement就比较简单了，创建一个element对象，参数里的type、key、ref、props、等放进去，然后return了。最后调用Object.freeze使对象不可再改变。</p>
<h3 id="articleHeader3">组件的挂载</h3>
<p>我们上面只是简单的探究了<code>&lt;App/&gt;</code>的结构和原理，那它究竟是怎么变成真实dom的呢</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016862200" src="https://static.alili.tech/img/remote/1460000016862200" alt="15397616989193" title="15397616989193" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ReactDOM.render(<App />, document.getElementById('root'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">ReactDOM.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>, document.getElementById('root'));</span></code></pre>
<p>我们接着用babel编译一下:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016862201" src="https://static.alili.tech/img/remote/1460000016862201" alt="15397619877496" title="15397619877496" style="cursor: pointer; display: inline;"></span></p>
<p>原来<code>ReactDOM.render</code>调用的是render方法，一样，找暴露出来的接口。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
var ReactDOM = {
······
  render: function (element, container, callback) {
    return legacyRenderSubtreeIntoContainer(null, element, container, false, callback);
  },
······
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">
<span class="hljs-keyword">var</span> ReactDOM = {
······
  render: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">element, container, callback</span>) </span>{
    <span class="hljs-keyword">return</span> legacyRenderSubtreeIntoContainer(<span class="hljs-literal">null</span>, element, container, <span class="hljs-literal">false</span>, callback);
  },
······
};
</code></pre>
<p>它返回的是一个<code>legacyRenderSubtreeIntoContainer</code>方法，这次我们直接打上console.log </p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016862202" src="https://static.alili.tech/img/remote/1460000016862202" alt="15397629379495" title="15397629379495" style="cursor: pointer; display: inline;"></span></p>
<p>这是打印出来的结果,</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016862203" src="https://static.alili.tech/img/remote/1460000016862203" alt="15397633591876" title="15397633591876" style="cursor: pointer; display: inline;"></span></p>
<p>legacyRenderSubtreeIntoContainer<br>这个方法除主要做了两件事：</p>
<ul><li>清除dom容器元素的子元素</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="while (rootSibling = container.lastChild) {
      {
        if (!warned &amp;&amp; rootSibling.nodeType === ELEMENT_NODE &amp;&amp; rootSibling.hasAttribute(ROOT_ATTRIBUTE_NAME)) {
          warned = true;
        }
      }
      container.removeChild(rootSibling);
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">while</span> (rootSibling = container.lastChild) {
      {
        <span class="hljs-keyword">if</span> (!warned &amp;&amp; rootSibling.nodeType === ELEMENT_NODE &amp;&amp; rootSibling.hasAttribute(ROOT_ATTRIBUTE_NAME)) {
          warned = <span class="hljs-literal">true</span>;
        }
      }
      container.removeChild(rootSibling);
    }</code></pre>
<ul><li>创建ReactRoot对象</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016862204" src="https://static.alili.tech/img/remote/1460000016862204" alt="15397648731115" title="15397648731115" style="cursor: pointer; display: inline;"></span></p>
<p>源码暂时只读到了这里，关于React16.1~3的新功能，以及新的生命周期的使用和原理、<code>Fiber</code>究竟是什么，我们将在后续文章接着介绍。</p>
<h2 id="articleHeader4">广而告之</h2>
<p>本文发布于<a href="https://github.com/BooheeFE/weekly" rel="nofollow noreferrer" target="_blank">薄荷前端周刊</a>，欢迎Watch &amp; Star ★，转载请注明出处。</p>
<h3 id="articleHeader5">欢迎讨论，点个赞再走吧  ｡◕‿◕｡ ～</h3>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【React源码解读】- 组件的实现

## 原文链接
[https://segmentfault.com/a/1190000016862181](https://segmentfault.com/a/1190000016862181)

