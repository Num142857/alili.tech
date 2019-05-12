---
title: '精益 React 学习指南 （Lean React）- 1.4 React 组件生命周期和方法' 
date: 2019-02-10 2:30:42
hidden: true
slug: mp02bxg2l4
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="https://segmentfault.com/a/1190000005136764">书籍完整目录</a></p></blockquote>
<h1 id="articleHeader0">1.4 React 组件生命周期</h1>
<p><span class="img-wrap"><img data-src="/img/bVvOnw" src="https://static.alili.tech/img/bVvOnw" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p><a href="http://facebook.github.io/react/docs/component-specs.html" rel="nofollow noreferrer" target="_blank">官方文档</a></p></blockquote>
<h2 id="articleHeader1">1.4.1 组件</h2>
<p>React 中组件有自己的生命周期方法，简单理解可以为组件从 <strong>出生（实例化） -&gt;  激活 -&gt; 销毁</strong> 生命周期 hook。通过这些 hook 方法可以自定义组件的特性。 除此之外，还可以设置一些额外的规格配置。</p>
<p><span class="img-wrap"><img data-src="/img/bVvOd6" src="https://static.alili.tech/img/bVvOd6" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这些生命周期方法都可以在调用 <strong>React.createClass</strong> 的参数对象中传入， 我们已经使用过了一些方法：</p>
<ul>
<li><p>render</p></li>
<li><p>getInitialState</p></li>
<li><p>getDefaultProps</p></li>
<li><p>propTypes</p></li>
</ul>
<h2 id="articleHeader2">1.4.2 mixins</h2>
<p><strong>类型：</strong> <code>array mixins</code></p>
<p>mixins 可以理解为 React 的插件列表，通过这种模式在不同组件之间共享方法数据或者行为只需共享 mixin 就行，mixins 内定义的生命周期方法在组件的生命周期内都会被调用。</p>
<p>可能的一些疑问：</p>
<ul>
<li><p>Q1. 如果组件已经定义了某个生命周期方法， mixin 内也定义了该方法，那么 mixin 内会被调用还是 组件的会被调用？</p></li>
<li><p>Q2. 多个插件都定义了相同生命周期的方法呢？</p></li>
<li><p>Q3. 那如果多个插件定义了 getInitialState 这种配置方法呢，有何影响？</p></li>
</ul>
<p>插件模式并非继承的模式，对于问题 1、2 的答案是一样的，都会被调用，调用顺序为 mixins 数组中的顺序。</p>
<ul>
<li><p>A1: 都会被调用</p></li>
<li><p>A2: 都会被调用</p></li>
<li><p>A3: React 会对返回结果做智能的合并，所有插件的 getInitialState 都会生效，前提条件是它们返回的字段不冲突，如果发生字段冲突，React 会提示报错。 同理如果是非 组件的规格方法，出于共享目的的一些方法在多个 mixin 中也不能冲突。</p></li>
</ul>
<p>eg：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var MyMixin1 = {
    componentDidMount: function() {
        console.log('auto do something when component did mount');
    }
};

var MyMixin2 = {
    someMethod: function() {
        console.log('doSomething');
    }
};

var MyComponnet = React.createClass({
    mixins: [MyMixin1, MyMixin2],
    componentDidMount: function() {
        // 调用 mixin1 共享的方法
        this.someMethod();
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> MyMixin1 = {
    <span class="hljs-attr">componentDidMount</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'auto do something when component did mount'</span>);
    }
};

<span class="hljs-keyword">var</span> MyMixin2 = {
    <span class="hljs-attr">someMethod</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'doSomething'</span>);
    }
};

<span class="hljs-keyword">var</span> MyComponnet = React.createClass({
    <span class="hljs-attr">mixins</span>: [MyMixin1, MyMixin2],
    <span class="hljs-attr">componentDidMount</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 调用 mixin1 共享的方法</span>
        <span class="hljs-keyword">this</span>.someMethod();
    }
});</code></pre>
<p>更多 mixins 的使用会在第三章中讲解。</p>
<h2 id="articleHeader3">1.4.3 statics</h2>
<p><strong>类型：</strong> <code>object statics</code></p>
<p>statics 可以定义组件的类方法</p>
<p>eg:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var MyComponent = React.createClass({
  statics: {
    customMethod: function(foo) {
      return foo === 'bar';
    }
  }
});

MyComponent.customMethod('bar');  // true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">var MyComponent = React.createClass({
  statics: {
    customMethod: function(foo) {
      return foo === 'bar';
    }
  }
});

MyComponent.customMethod('bar');  // true</code></pre>
<p>React 的组件是 OOP 的思维，MyComponent 是一个 class，class  分为类方法和实例方法，实例方法可以访问 this, 然而类方法不能，所以我们不能在 Class 中返回状态或者属性。</p>
<h2 id="articleHeader4">1.4.4 displayName</h2>
<p><strong>类型：</strong> <code>string displayName</code></p>
<p>为了显示调试信息，每个组件都会有一个名称，JSX 在转为 JS 的时候自动的设置 displayName, 如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Input (JSX):
var MyComponent = React.createClass({ });

// Output (JS):
var MyComponent = React.createClass({displayName: &quot;MyComponent&quot;, });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// Input (JSX):</span>
<span class="hljs-keyword">var</span> MyComponent = React.createClass({ });

<span class="hljs-comment">// Output (JS):</span>
<span class="hljs-keyword">var</span> MyComponent = React.createClass({<span class="hljs-attr">displayName</span>: <span class="hljs-string">"MyComponent"</span>, });</code></pre>
<p>当然我们也可以自定义 displayName</p>
<h2 id="articleHeader5">1.4.5 生命周期方法</h2>
<p>下图描述了整个组件的生命周期，包含的主要几种情况：</p>
<ol>
<li><p>组件被实例化的时候</p></li>
<li><p>组件属性改变的时候</p></li>
<li><p>组件状态被改变的时候</p></li>
<li><p>组件被销毁的时候</p></li>
</ol>
<p><span class="img-wrap"><img data-src="/img/bVwhwG" src="https://static.alili.tech/img/bVwhwG" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader6">1.4.6 componentWillMount</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="void componentWillMount()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">void</span> componentWillMount()</code></pre>
<p><strong>条件</strong>：第一次渲染阶段在调用 render 方法前会被调用<br><strong>作用</strong>：该方法在整个组件生命周期只会被调用一次，所以可以利用该方法做一些组件内部的初始化工作</p>
<h2 id="articleHeader7">1.4.7 componentDidMount</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="void componentDidMount()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">void</span> componentDidMount()</code></pre>
<p><strong>条件</strong>：第一次渲染成功过后，组件对应的 DOM 已经添加到页面后调用<br><strong>作用</strong>：这个阶段表示组件对应的 DOM 已经存在，我们可以在这个时候做一些依赖 DOM 的操作或者其他的一些如请求数据，和第三方库整合的操作。如果嵌套了子组件，子组件会比父组件优先渲染，所以这个时候可以获取子组件对应的 DOM。</p>
<h3 id="articleHeader8">1.4.8 componentWillReceiveProps(newProps)</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="void componentWillReceiveProps(
  object nextProps
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">void</span> componentWillReceiveProps(
  object nextProps
)</code></pre>
<p><strong>条件：</strong> 当组件获取新属性的时候，第一次渲染不会调用<br><strong>用处：</strong> 这个时候可以根据新的属性来修改组件状态 <br>eg:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    componentWillReceiveProps: function(nextProps) {
      this.setState({
        likesIncreasing: nextProps.likeCount > this.props.likeCount
      });
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    componentWillReceiveProps: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">nextProps</span>) </span>{
      <span class="hljs-keyword">this</span>.setState({
        <span class="hljs-attr">likesIncreasing</span>: nextProps.likeCount &gt; <span class="hljs-keyword">this</span>.props.likeCount
      });
    }</code></pre>
<p><strong>注意：</strong> 这个时候虽说是获取新属性，但并不能确定属性一定改变了，例如一个组件被多次渲染到 DOM 中，如下面：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var Component = React.createClass({
        componentWillReceiveProps: function(nextProps) {
            console.log('componentWillReceiveProps', nextProps.data.bar);
        },
        rener: function() {
            return <div> {this.props.data.bar} </div>
        }
    });

    var container = document.getElementById('container');
    var mydata = {bar: 'drinks'};
    ReactDOM.render(<Component data={mydata} />, container);
    ReactDOM.render(<Component data={mydata} />, container);
    ReactDOM.render(<Component data={mydata} />, container);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">    var Component = React.createClass({
        componentWillReceiveProps: function(nextProps) {
            console.log('componentWillReceiveProps', nextProps.data.bar);
        },
        rener: function() {
            return <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span> {this.props.data.bar} <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        }
    });

    var container = document.getElementById('container');
    var mydata = {bar: 'drinks'};
    ReactDOM.render(<span class="hljs-tag">&lt;<span class="hljs-name">Component</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{mydata}</span> /&gt;</span>, container);
    ReactDOM.render(<span class="hljs-tag">&lt;<span class="hljs-name">Component</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{mydata}</span> /&gt;</span>, container);
    ReactDOM.render(<span class="hljs-tag">&lt;<span class="hljs-name">Component</span> <span class="hljs-attr">data</span>=<span class="hljs-string">{mydata}</span> /&gt;</span>, container);</code></pre>
<p>结果会输出两次 componentWillReceiveProps，虽然属性数据没有改变，但是仍然会调用  componentWillReceiveProps 方法。</p>
<blockquote><p>参考 Facebook <a href="http://facebook.github.io/react/blog/2016/01/08/A-implies-B-does-not-imply-B-implies-A.html" rel="nofollow noreferrer" target="_blank">(A=&gt;B) =&gt; (B =&gt; A)</a></p></blockquote>
<h2 id="articleHeader9">1.4.9 shouldComponentUpdate(nextProps, nextState)</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="boolean shouldComponentUpdate(
  object nextProps, object nextState
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">boolean shouldComponentUpdate(
  object nextProps, object nextState
)</code></pre>
<p><strong>条件：</strong> 接收到新属性或者新状态的时候在 render 前会被调用（除了调用 forceUpdate 和初始化渲染以外）<br><strong>用处：</strong> 该方法让我们有机会决定是否重渲染组件，如果返回 false，那么不会重渲染组件，借此可以优化应用性能（在组件很多的情况）。</p>
<h2 id="articleHeader10">1.4.10 componentWillUpdate</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="void componentWillUpdate(
  object nextProps, object nextState
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">void</span> componentWillUpdate(
  object nextProps, object nextState
)</code></pre>
<p><strong>条件</strong>：当组件确定要更新，在 render 之前调用<br><strong>用处</strong>：这个时候可以确定一定会更新组件，可以执行更新前的操作<br><strong>注意</strong>：方法中不能使用 setState ，setState 的操作应该在 componentWillReceiveProps 方法中调用</p>
<h2 id="articleHeader11">1.4.11 componentDidUpdate</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="void componentDidUpdate(
  object prevProps, object prevState
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">void</span> componentDidUpdate(
  object prevProps, object prevState
)</code></pre>
<p><strong>条件</strong>：更新被应用到 DOM 之后<br><strong>用处</strong>：可以执行组件更新过后的操作</p>
<h2 id="articleHeader12">1.4.12 生命周期与单向数据流</h2>
<p>我们知道 React 的核心模式是单向数据流，这不仅仅是对于组件级别的模式，在组件内部 的生命周期中也是应该符合单向数据的模式。数据从组件的属性流入，再结合组件的状态，流入生命周期方法，直到渲染结束这都应该是一个单向的过程，其间不能随意改变组件的状态。 </p>
<p><span class="img-wrap"><img data-src="/img/bVvOSu" src="https://static.alili.tech/img/bVvOSu" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader13">1.4.13 实例练习：通过 mixin 打印出组件生命周期的执行顺序</h2>
<p>@todo</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
精益 React 学习指南 （Lean React）- 1.4 React 组件生命周期和方法

## 原文链接
[https://segmentfault.com/a/1190000005161417](https://segmentfault.com/a/1190000005161417)

