---
title: '理解 React Hooks' 
date: 2019-03-02 2:30:07
hidden: true
slug: 61sjm32irkj
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>欢迎大家前往<a href="https://cloud.tencent.com/developer/?fromSource=waitui" rel="nofollow noreferrer" target="_blank">腾讯云+社区</a>，获取更多腾讯海量技术实践干货哦~</strong></p>
<blockquote>本文由<a href="https://cloud.tencent.com/developer/user/1192057" rel="nofollow noreferrer" target="_blank">志航</a>发表于<a href="https://cloud.tencent.com/developer/column/72988?fromSource=waitui" rel="nofollow noreferrer" target="_blank">云+社区专栏</a>
</blockquote>
<h2 id="articleHeader0">TL;DR</h2>
<p>一句话总结 React Hooks 就是在 react 函数组件中，也可以使用类组件（classes components）的 state 和 组件生命周期，而不需要在 mixin、 函数组件、HOC组件和 render props 之间来回切换，使得函数组件的功能更加实在，更加方便我们在业务中实现业务逻辑代码的分离和组件的复用。</p>
<p>本文将从以下几个方面介绍 hooks</p>
<blockquote>Hooks 在解决什么问题 Hooks 的 api 介绍 和如何使用 hooks Hooks 是怎么实现的</blockquote>
<h2 id="articleHeader1"><span style="font-weight:normal;">💡</span>Hooks 在解决什么问题</h2>
<p>React 一直在解决一个问题，如何实现分离业务逻辑代码，实现组件内部相关业务逻辑的复用。</p>
<p>一般情况下，我们都是通过组件和自上而下传递的数据流将我们页面上的大型UI组织成为独立的小型UI，实现组件的重用。但是我们经常遇到很难侵入一个复杂的组件中实现重用，因为组件的逻辑是有状态的，无法提取到函数组件当中。这在处理动画和表单的时候，尤其常见，当我们在组件中连接外部的数据源，然后希望在组件中执行更多其他的操作的时候，我们就会把组件搞得特别糟糕：</p>
<ul>
<li>难以重用和共享组件中的与状态相关的逻辑，造成产生很多巨大的组件</li>
<li>逻辑复杂的组件难以开发与维护，当我们的组件需要处理多个互不相关的 localstate 时，每个生命周期函数中可能会包含着各种互不相关的逻辑在里面。</li>
<li>复杂的模式，如渲染道具和高阶组件。</li>
<li>由于业务变动，函数组件不得不改为类组件。</li>
</ul>
<p>这时候，Hooks就派上用场了。 Hooks 允许我们将组件内部的逻辑，组织成为一个可复用的隔离模块。</p>
<p>借用 @Sunil Pai 的两张图来说明这个问题：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016953183" src="https://static.alili.tech/img/remote/1460000016953183" alt="img" title="img" style="cursor: pointer;"></span>image.png</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016953184" src="https://static.alili.tech/img/remote/1460000016953184" alt="img" title="img" style="cursor: pointer;"></span>image.png</p>
<p>从 React Hooks 中体验出来的是 React 的哲学在组件内部的实现，以前我们只在组件和组件直接体现 React 的哲学，就是清晰明确的数据流和组成形式。既可以复用组件内的逻辑，也不会出现 HOC 带来的层层嵌套，更加不会出现 <a href="https://reactjs.org/blog/2016/07/13/mixins-considered-harmful.html#why-mixins-are-broken" rel="nofollow noreferrer" target="_blank">Mixin 的弊端</a>。</p>
<h1 id="articleHeader2"><span style="font-weight:normal;">💡</span>Hooks 的 api 介绍 和如何使用 hooks</h1>
<p>@dan_abramov 在会议上给我们介绍了 hooks 的三个关键的api，分别是 <code>State Hooks</code> 、 <code>Effect Hooks</code> 、 <code>Custom Hooks(自定义hooks)</code></p>
<h4>📌state Hooks (useState)</h4>
<p>useState 这个方法可以为我们的函数组件带来 local state，它接收一个用于初始 state 的值，返回一对变量。 让函数组件拥有自己的组件。</p>
<p>首先如果我们需要用 classes component 实现一个点击按钮 +1 组件应该怎么写呢？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';

class Example extends React.Component {
    constructor(props) {
        super(props);
        this.state = {count: 0};
        this.clickBtn = this.clickBtn.bind(this);
    }
    clickBtn = () => {
        this.setState({
            count: this.state.count + 1;
        });
    }
    return (
        <div>
            <p>You clicked {this.state.count} times</p>
            <button onClick={this.clickBtn}>
                Click me
            </button>
        </div>
    );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Example</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {<span class="hljs-attr">count</span>: <span class="hljs-number">0</span>};
        <span class="hljs-keyword">this</span>.clickBtn = <span class="hljs-keyword">this</span>.clickBtn.bind(<span class="hljs-keyword">this</span>);
    }
    clickBtn = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">count</span>: <span class="hljs-keyword">this</span>.state.count + <span class="hljs-number">1</span>;
        });
    }
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>You clicked {this.state.count} times<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.clickBtn}</span>&gt;</span>
                Click me
            <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
}</code></pre>
<p>那使用 useState 是怎么样的呢？ 可以看见非常清晰明了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 一个简单的点击计数
import { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 一个简单的点击计数</span>
<span class="hljs-keyword">import</span> { useState } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Example</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> [count, setCount] = useState(<span class="hljs-number">0</span>);

  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>You clicked {count} times<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setCount(count + 1)}&gt;
        Click me
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}</code></pre>
<h4>📌Effect Hooks (useEffect)</h4>
<p>Effect Hooks 用于处理一些带有副作用的操作，下面通过监听窗口宽度的变化代码为例，说明 effect hooks 的使用fangfa</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { useState } from 'react';

function windowWidth() {
    const [width, setWithd] = useState(window.innerWidth);
    useEffect(() => {
        const handleResize = ()=>{
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
    });
    return (
        <p> window width is {width}</p>
    )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { useState } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">windowWidth</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> [width, setWithd] = useState(<span class="hljs-built_in">window</span>.innerWidth);
    useEffect(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">const</span> handleResize = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
            setWidth(<span class="hljs-built_in">window</span>.innerWidth);
        }
        <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'resize'</span>, handleResize);
    });
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span> window width is {width}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
    )
}</code></pre>
<p>useEffect 可以传入第二个操作来避免性能的损耗，如果第二个参数数组中的成员变量没有变化则会跳过此次改变。如何传入一个空数组  ，那么该 effect 只会在组件 mount 和 unmount 时期执行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { useState } from 'react';

function windowWidth() {
    const [width, setWithd] = useState(window.innerWidth);
    useEffect(() => {
    const handleResize = ()=>{
        setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    }, [width]); // width 没有变化则不处理
    return (
        <p> window width is {width}</p>
    )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { useState } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">windowWidth</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> [width, setWithd] = useState(<span class="hljs-built_in">window</span>.innerWidth);
    useEffect(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> handleResize = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        setWidth(<span class="hljs-built_in">window</span>.innerWidth);
    }
    <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'resize'</span>, handleResize);
    }, [width]); <span class="hljs-comment">// width 没有变化则不处理</span>
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span> window width is {width}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
    )
}</code></pre>
<p>useEffect 中还可以通过让函数返回一个函数来进行一些取消兼容之类的清理操作，比如取消订阅等</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { useState } from 'react';

function windowWidth() {
  const [width, setWithd] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = ()=>{
        setWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);

    return () => {
        // 取消监听窗口的宽度变化
        window.removeEventListener('resize');
    }
  });
  return (
      <p> window width is {width}</p>
  )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { useState } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">windowWidth</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> [width, setWithd] = useState(<span class="hljs-built_in">window</span>.innerWidth);

  useEffect(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> handleResize = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        setWidth(<span class="hljs-built_in">window</span>.innerWidth);
    }
    <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'resize'</span>, handleResize);

    <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-comment">// 取消监听窗口的宽度变化</span>
        <span class="hljs-built_in">window</span>.removeEventListener(<span class="hljs-string">'resize'</span>);
    }
  });
  <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span> window width is {width}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
  )
}</code></pre>
<p>如上所示，内置的 React Hooks 如 useState 和 useEffect 充当基本构建块。 我们可以直接在组件中使用它们，或者我们可以将它们组合到自定义Hook中，例如useWindowWidth。使用自定义Hooks感觉就像使用React的内置API一样。</p>
<h4>📌Custom Hooks 自定义组件</h4>
<p>接着上面的监听窗口大小的代码，我们接着讲自定义 hooks, <strong>证明 react hooks 是怎么使到组件内的逻辑可复用的。</strong></p>
<p>Talk is cheap, show me the code.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 一个显示目前窗口大小的组件
function responsiveComponent(){
   // custom hooks
   const width = useWindowWidth(); 
   return (
       <p>当前窗口的宽度是 {width}</p>
   )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 一个显示目前窗口大小的组件</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">responsiveComponent</span>(<span class="hljs-params"></span>)</span>{
   <span class="hljs-comment">// custom hooks</span>
   <span class="hljs-keyword">const</span> width = useWindowWidth(); 
   <span class="hljs-keyword">return</span> (
       <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>当前窗口的宽度是 {width}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
   )
}</code></pre>
<p>上面的代码只有几行，非常清晰明了说明了他的作用就是监听当前窗口的变化，这就是Hooks的目标 - 使组件真正具有声明性，即使它们包含状态和副作用。</p>
<p>我们来看看如何实现这个自定义Hook。我们使用React本地状态来保持当前窗口宽度，并在窗口调整大小时使用副作用来设置该状态</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { useState, useEffect} from 'react';
// custom hooks to listen window width change
function useWindowWidth(){
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = ()=>{
            setWidth(window.innerWidth);
        }
        window.addEventListener('resize', handleResize);
    }, [width]); // width 没有变化则不处理

    return width;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> { useState, useEffect} <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-comment">// custom hooks to listen window width change</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">useWindowWidth</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">const</span> [width, setWidth] = useState(<span class="hljs-built_in">window</span>.innerWidth);

    useEffect(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
        <span class="hljs-keyword">const</span> handleResize = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
            setWidth(<span class="hljs-built_in">window</span>.innerWidth);
        }
        <span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'resize'</span>, handleResize);
    }, [width]); <span class="hljs-comment">// width 没有变化则不处理</span>

    <span class="hljs-keyword">return</span> width;
}</code></pre>
<p><a href="https://codesandbox.io/s/2vx1j6qjjr" rel="nofollow noreferrer" target="_blank">[在线编辑例子]</a></p>
<h4>⚡ React Hooks 的规则</h4>
<p>Hooks 是JavaScript函数，但它们强加了两个额外的规则：</p>
<ul>
<li>只能在<strong>顶层</strong>调用Hooks。不要在循环，条件或嵌套函数中调用Hook。</li>
<li>仅从React功能组件调用Hooks。不要从常规JavaScript函数中调用Hook。 （还有另一个地方可以调用Hooks——你自己的定制Hooks。）</li>
</ul>
<h4>🔌 其他 Hooks</h4>
<p>这里有一些不常用的内置Hook。例如，useContext允许您订阅React上下文而不引入嵌套：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Example() {
  const locale = useContext(LocaleContext);
  const theme = useContext(ThemeContext);
  // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Example</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> locale = useContext(LocaleContext);
  <span class="hljs-keyword">const</span> theme = useContext(ThemeContext);
  <span class="hljs-comment">// ...</span>
}</code></pre>
<p>发现一个很有趣的仓库，<a href="https://github.com/streamich/react-use" rel="nofollow noreferrer" target="_blank">react-use</a>, 包含了很多很有趣的自定义hooks</p>
<h2 id="articleHeader3"><span style="font-weight:normal;">👀</span>hooks 是如何工作的</h2>
<p>以下内容翻译自 <a href="https://medium.com/@ryardley/react-hooks-not-magic-just-arrays-cd4f1857236e" rel="nofollow noreferrer" target="_blank">react-hooks-not-magic-just-arrays</a>.</p>
<p>react hooks 其实只是一个数组，并不是奇妙的魔法。</p>
<h4>如何实现 <code>useState()</code> 方法</h4>
<p>让我们在这里通过一个例子来演示状态 hooks 的实现如何工作。</p>
<p>首先让我们从一个组件开始：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function RenderFunctionComponent() {
  const [firstName, setFirstName] = useState(&quot;Rudi&quot;);
  const [lastName, setLastName] = useState(&quot;Yardley&quot;);

  return (
    <Button onClick={() => setFirstName(&quot;Fred&quot;)}>Fred</Button>
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">RenderFunctionComponent</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> [firstName, setFirstName] = useState(<span class="hljs-string">"Rudi"</span>);
  <span class="hljs-keyword">const</span> [lastName, setLastName] = useState(<span class="hljs-string">"Yardley"</span>);

  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setFirstName("Fred")}&gt;Fred<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span></span>
  );
}</code></pre>
<p>hooks API背后的想法是你可以使用一个setter函数作为hook函数中的第二个数组项返回，而setter将控制由hook管理的状态。</p>
<h3 id="articleHeader4">那么React与此有什么关系呢？</h3>
<p>让我们了解这在React内部如何工作。 以下内容可在执行上下文中用于呈现特定组件。 这意味着此处存储的数据位于正在渲染的组件之外。 此状态不与其他组件共享，但它保留在可以随后渲染特定组件的范围内。</p>
<h4>1)初始化</h4>
<p>创建两个空数组：<code>setters</code>和<code>state</code></p>
<p>将光标设置为 0 </p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016953185" src="https://static.alili.tech/img/remote/1460000016953185" alt="img" title="img" style="cursor: pointer;"></span>image.png</p>
<p>初始化：两个空数组，Cursor为0</p>
<h4>2) 首次渲染</h4>
<p>首次运行组件功能。</p>
<p>每次useState()调用，当在第一次运行时，将setter函数（绑定到光标位置）推送到setter数组，然后将某个状态推送到state数组。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016953186" src="https://static.alili.tech/img/remote/1460000016953186" alt="img" title="img" style="cursor: pointer;"></span>image.png</p>
<p>第一次渲染：作为光标增量写入数组的项目。</p>
<h4>3) 后续渲染</h4>
<p>每个后续渲染都会重置光标，并且只从每个数组中读取这些值。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016953187" src="https://static.alili.tech/img/remote/1460000016953187" alt="img" title="img" style="cursor: pointer; display: inline;"></span>image.png</p>
<p>后续渲染：从数组中读取的项目为光标增量</p>
<h4>4) 事件处理</h4>
<p>每个setter都有一个对它的光标位置的引用，因此通过触发对任何setter的调用，它将改变状态数组中该位置的状态值。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016953188" src="https://static.alili.tech/img/remote/1460000016953188" alt="img" title="img" style="cursor: pointer; display: inline;"></span>image.png</p>
<p>Setters“记住”他们的索引并根据它设置内存。</p>
<h4>通过伪代码实现 useState 功能</h4>
<p>这是一个演示实现的代码示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let state = [];
let setters = [];
let firstRun = true;
let cursor = 0;

function createSetter(cursor) {
  return function setterWithCursor(newVal) {
    state[cursor] = newVal;
  };
}

// useState的伪代码实现
export function useState(initVal) {
  if (firstRun) {
    state.push(initVal);
    setters.push(createSetter(cursor));
    firstRun = false;
  }

  const setter = setters[cursor];
  const value = state[cursor];

  cursor++;
  return [value, setter];
}

// 模拟使用useState
function RenderFunctionComponent() {
  const [firstName, setFirstName] = useState(&quot;Rudi&quot;); // cursor: 0
  const [lastName, setLastName] = useState(&quot;Yardley&quot;); // cursor: 1

  return (
    <div>
      <Button onClick={() => setFirstName(&quot;Richard&quot;)}>Richard</Button>
      <Button onClick={() => setFirstName(&quot;Fred&quot;)}>Fred</Button>
    </div>
  );
}

// 模拟Reacts渲染周期
function MyComponent() {
  cursor = 0; //  重置光标的位置
  return <RenderFunctionComponent />; // render
}

console.log(state); // Pre-render: []
MyComponent();
console.log(state); // 首次渲染: ['Rudi', 'Yardley']
MyComponent();
console.log(state); // 后续渲染: ['Rudi', 'Yardley']

// 点击'Fred' 按钮 

console.log(state); // 点击后: ['Fred', 'Yardley']" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> state = [];
<span class="hljs-keyword">let</span> setters = [];
<span class="hljs-keyword">let</span> firstRun = <span class="hljs-literal">true</span>;
<span class="hljs-keyword">let</span> cursor = <span class="hljs-number">0</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">createSetter</span>(<span class="hljs-params">cursor</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">setterWithCursor</span>(<span class="hljs-params">newVal</span>) </span>{
    state[cursor] = newVal;
  };
}

<span class="hljs-comment">// useState的伪代码实现</span>
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">useState</span>(<span class="hljs-params">initVal</span>) </span>{
  <span class="hljs-keyword">if</span> (firstRun) {
    state.push(initVal);
    setters.push(createSetter(cursor));
    firstRun = <span class="hljs-literal">false</span>;
  }

  <span class="hljs-keyword">const</span> setter = setters[cursor];
  <span class="hljs-keyword">const</span> value = state[cursor];

  cursor++;
  <span class="hljs-keyword">return</span> [value, setter];
}

<span class="hljs-comment">// 模拟使用useState</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">RenderFunctionComponent</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> [firstName, setFirstName] = useState(<span class="hljs-string">"Rudi"</span>); <span class="hljs-comment">// cursor: 0</span>
  <span class="hljs-keyword">const</span> [lastName, setLastName] = useState(<span class="hljs-string">"Yardley"</span>); <span class="hljs-comment">// cursor: 1</span>

  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setFirstName("Richard")}&gt;Richard<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span> =&gt;</span> setFirstName("Fred")}&gt;Fred<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}

<span class="hljs-comment">// 模拟Reacts渲染周期</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">MyComponent</span>(<span class="hljs-params"></span>) </span>{
  cursor = <span class="hljs-number">0</span>; <span class="hljs-comment">//  重置光标的位置</span>
  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">RenderFunctionComponent</span> /&gt;</span>; // render
}

console.log(state); // Pre-render: []
MyComponent();
console.log(state); // 首次渲染: ['Rudi', 'Yardley']
MyComponent();
console.log(state); // 后续渲染: ['Rudi', 'Yardley']

// 点击'Fred' 按钮 

console.log(state); // 点击后: ['Fred', 'Yardley']</span></code></pre>
<h4>总结</h4>
<p>Hooks 还处于早期阶段，但是给我们复用组件的逻辑提供了一个很好的思路，大家可以在 react-16.7.0-alpha.0 中体验。</p>
<blockquote>
<strong>相关阅读</strong><br><a href="https://cloud.tencent.com/developer/edu/course-1128?fromSource=waitui" rel="nofollow noreferrer" target="_blank">【每日课程推荐】机器学习实战！快速入门在线广告业务及CTR相应知识</a>
</blockquote>
<p><strong>此文已由作者授权腾讯云+社区发布，更多原文请<a href="https://cloud.tencent.com/developer/article/1360473?fromSource=waitui" rel="nofollow noreferrer" target="_blank">点击</a></strong></p>
<p><strong>搜索关注公众号「云加社区」，第一时间获取技术干货，关注后回复1024 送你一份技术课程大礼包！</strong></p>
<p>海量技术实践经验，尽在<a href="https://cloud.tencent.com/developer?fromSource=waitui" rel="nofollow noreferrer" target="_blank">云加社区</a>！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
理解 React Hooks

## 原文链接
[https://segmentfault.com/a/1190000016953180](https://segmentfault.com/a/1190000016953180)

