---
title: '为什么我们需要reselect' 
date: 2018-12-26 2:30:14
hidden: true
slug: wzmzay034f
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">为什么我们需要reselect</h1>
<h3 id="articleHeader1">遇到的问题</h3>
<p>先看下下面的一个组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react'
import { connect } from 'react-redux'

class UnusedComp extends Component {
    render() {
        const { a, b, c, fab, hbc, gac, uabc } = this.props
        return (
            <div>
                <h6>{a}</h6>
                <h6>{b}</h6>
                <h6>{c}</h6>
                <h6>{fab}</h6>
                <h6>{hbc}</h6>
                <h6>{gac}</h6>
                <h6>{uabc}</h6>
            </div>
        )
    }
}

function f(x, y) {
    return a + b
}

function h(x, y) {
    return x + 2 * y
}

function g(x, y) {
    return 2 * x + y
}

function u(x, y, z) {
    return x + y + z
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> { connect } <span class="hljs-keyword">from</span> <span class="hljs-string">'react-redux'</span>

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">UnusedComp</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">const</span> { a, b, c, fab, hbc, gac, uabc } = <span class="hljs-keyword">this</span>.props
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h6</span>&gt;</span>{a}<span class="hljs-tag">&lt;/<span class="hljs-name">h6</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h6</span>&gt;</span>{b}<span class="hljs-tag">&lt;/<span class="hljs-name">h6</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h6</span>&gt;</span>{c}<span class="hljs-tag">&lt;/<span class="hljs-name">h6</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h6</span>&gt;</span>{fab}<span class="hljs-tag">&lt;/<span class="hljs-name">h6</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h6</span>&gt;</span>{hbc}<span class="hljs-tag">&lt;/<span class="hljs-name">h6</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h6</span>&gt;</span>{gac}<span class="hljs-tag">&lt;/<span class="hljs-name">h6</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h6</span>&gt;</span>{uabc}<span class="hljs-tag">&lt;/<span class="hljs-name">h6</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params">x, y</span>) </span>{
    <span class="hljs-keyword">return</span> a + b
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">h</span>(<span class="hljs-params">x, y</span>) </span>{
    <span class="hljs-keyword">return</span> x + <span class="hljs-number">2</span> * y
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">g</span>(<span class="hljs-params">x, y</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-number">2</span> * x + y
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">u</span>(<span class="hljs-params">x, y, z</span>) </span>{
    <span class="hljs-keyword">return</span> x + y + z
}</code></pre>
<p>这个UnusedComp 组件关心这样的几个props： a, b, c, f(a,b), h(b, c), g(a, c), u(a, b, c),  其中f, h, g, u分别是一个函数。 关于这几个计算的值， 我们应该怎么处理呢？</p>
<h3 id="articleHeader2">把数据直接计算在redux</h3>
<p>第一种， 我们把所有值存在redux， 所有store的结构大概是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="store = {
    a:1,
    b:1,
    c:1,
    fab: 2, // a + b
    hbc: 3, // b + 2c
    gac: 3, // 2a + c
    uabc: 3 // a + b + c
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">store = {
    <span class="hljs-attr">a</span>:<span class="hljs-number">1</span>,
    <span class="hljs-attr">b</span>:<span class="hljs-number">1</span>,
    <span class="hljs-attr">c</span>:<span class="hljs-number">1</span>,
    <span class="hljs-attr">fab</span>: <span class="hljs-number">2</span>, <span class="hljs-comment">// a + b</span>
    hbc: <span class="hljs-number">3</span>, <span class="hljs-comment">// b + 2c</span>
    gac: <span class="hljs-number">3</span>, <span class="hljs-comment">// 2a + c</span>
    uabc: <span class="hljs-number">3</span> <span class="hljs-comment">// a + b + c</span>
}</code></pre>
<p>这样我们的组件简单了， 只需要直接取值渲染就好 <code>const { a, b, c, fab, hbc, gac, uabc } = this.props</code> 。 那么问题来了， reducer的函数应该怎么处理呢？ 对应的如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="switch(action.type) {
    case 'changeA': {
        return {
            ...state,
            a: action.a,
            fab: f(action.a, state.b),
            gac: g(action.a, state.c)
            uabc: u(action.a, state.b, state.c)
        }
    }
    case 'changeB': {
        ...
    }
    case 'changeC': {
        ...
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">switch</span>(action.type) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">'changeA'</span>: {
        <span class="hljs-keyword">return</span> {
            ...state,
            <span class="hljs-attr">a</span>: action.a,
            <span class="hljs-attr">fab</span>: f(action.a, state.b),
            <span class="hljs-attr">gac</span>: g(action.a, state.c)
            uabc: u(action.a, state.b, state.c)
        }
    }
    <span class="hljs-keyword">case</span> <span class="hljs-string">'changeB'</span>: {
        ...
    }
    <span class="hljs-keyword">case</span> <span class="hljs-string">'changeC'</span>: {
        ...
    }
}</code></pre>
<p>我们的reducer 函数非常复杂了， 我们每更新一个状态值。 都得维护与这个值相关的值， 不然就会有数据不一致。</p>
<h3 id="articleHeader3">reducer 只存最基本状态</h3>
<p>为了保证数据流的清晰， 更新的简单。 我们只把最基本的状态存储在redux。store的结构和redcuer函数如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="store = {
    a:1,
    b:1,
    c:1,
}
...
switch(action.type) {
    case 'changeA': {
        return {
            ...state,
            a: action.a
        }
    }
    ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">store = {
    <span class="hljs-attr">a</span>:<span class="hljs-number">1</span>,
    <span class="hljs-attr">b</span>:<span class="hljs-number">1</span>,
    <span class="hljs-attr">c</span>:<span class="hljs-number">1</span>,
}
...
switch(action.type) {
    <span class="hljs-keyword">case</span> <span class="hljs-string">'changeA'</span>: {
        <span class="hljs-keyword">return</span> {
            ...state,
            <span class="hljs-attr">a</span>: action.a
        }
    }
    ...
}</code></pre>
<p>此刻组件可能是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class UnusedComp extends Component {
    render() {
        const { a, b, c } = this.props
        const fab = f(a, b)
        const hbc = h(b, c)
        const gac = g(a, c)
        const uabc = u(a, b, c)
        return (
            <div>
                <h6>{a}</h6>
                <h6>{b}</h6>
                <h6>{c}</h6>
                <h6>{fab}</h6>
                <h6>{hbc}</h6>
                <h6>{gac}</h6>
                <h6>{uabc}</h6>
            </div>
        )
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">UnusedComp</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">const</span> { a, b, c } = <span class="hljs-keyword">this</span>.props
        <span class="hljs-keyword">const</span> fab = f(a, b)
        <span class="hljs-keyword">const</span> hbc = h(b, c)
        <span class="hljs-keyword">const</span> gac = g(a, c)
        <span class="hljs-keyword">const</span> uabc = u(a, b, c)
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h6</span>&gt;</span>{a}<span class="hljs-tag">&lt;/<span class="hljs-name">h6</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h6</span>&gt;</span>{b}<span class="hljs-tag">&lt;/<span class="hljs-name">h6</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h6</span>&gt;</span>{c}<span class="hljs-tag">&lt;/<span class="hljs-name">h6</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h6</span>&gt;</span>{fab}<span class="hljs-tag">&lt;/<span class="hljs-name">h6</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h6</span>&gt;</span>{hbc}<span class="hljs-tag">&lt;/<span class="hljs-name">h6</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h6</span>&gt;</span>{gac}<span class="hljs-tag">&lt;/<span class="hljs-name">h6</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h6</span>&gt;</span>{uabc}<span class="hljs-tag">&lt;/<span class="hljs-name">h6</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}</code></pre>
<p>或者这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class UnusedComp extends Component {
    componentWillReciveProps(nextProps) {
        const { a, b, c } = this.props
        this.fab = f(a, b)
        this.hbc = h(b, c)
        this.gac = g(a, c)
        this.uabc = u(a, b, c)
    }
    

    render() {
        const { a, b, c } = this.props
        return (
            <div>
                <h6>{a}</h6>
                <h6>{b}</h6>
                <h6>{c}</h6>
                <h6>{this.fab}</h6>
                <h6>{this.hbc}</h6>
                <h6>{this.gac}</h6>
                <h6>{this.uabc}</h6>
            </div>
        )
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">UnusedComp</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    componentWillReciveProps(nextProps) {
        <span class="hljs-keyword">const</span> { a, b, c } = <span class="hljs-keyword">this</span>.props
        <span class="hljs-keyword">this</span>.fab = f(a, b)
        <span class="hljs-keyword">this</span>.hbc = h(b, c)
        <span class="hljs-keyword">this</span>.gac = g(a, c)
        <span class="hljs-keyword">this</span>.uabc = u(a, b, c)
    }
    

    render() {
        <span class="hljs-keyword">const</span> { a, b, c } = <span class="hljs-keyword">this</span>.props
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h6</span>&gt;</span>{a}<span class="hljs-tag">&lt;/<span class="hljs-name">h6</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h6</span>&gt;</span>{b}<span class="hljs-tag">&lt;/<span class="hljs-name">h6</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h6</span>&gt;</span>{c}<span class="hljs-tag">&lt;/<span class="hljs-name">h6</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h6</span>&gt;</span>{this.fab}<span class="hljs-tag">&lt;/<span class="hljs-name">h6</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h6</span>&gt;</span>{this.hbc}<span class="hljs-tag">&lt;/<span class="hljs-name">h6</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h6</span>&gt;</span>{this.gac}<span class="hljs-tag">&lt;/<span class="hljs-name">h6</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h6</span>&gt;</span>{this.uabc}<span class="hljs-tag">&lt;/<span class="hljs-name">h6</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}</code></pre>
<p>对于第一种情况， 当组件ownProps（组件自身属性， 非redux传递）, 或者setState 的时候 都会执行计算。 <br>对于第二钟情况， 当组件ownProps 变化的时候， 会执行计算。 <br>而且这两种都违背了 我们的基本原则： <strong>保持组件逻辑简单</strong></p>
<p>让数据逻辑离开组件！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 可以写成函数式组件
class UnusedComp extends Component {
    render() {
        const { a, b, c, fab, hbc, gac, uabc } = this.props
        return (
            <div>
                <h6>{a}</h6>
                <h6>{b}</h6>
                <h6>{c}</h6>
                <h6>{fab}</h6>
                <h6>{hbc}</h6>
                <h6>{gac}</h6>
                <h6>{uabc}</h6>
            </div>
        )
    }
}
function mapStateToProps(state) {
    const {a, b, c} = state
    return {
        a,
        b,
        c,
        fab: f(a,b),
        hbc: h(b,c),
        gac: g(a,c),
        uabc: u(a, b, c)
    }
}
UnusedComp = connect(mapStateToProps)(UnusedComp)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 可以写成函数式组件</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">UnusedComp</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">const</span> { a, b, c, fab, hbc, gac, uabc } = <span class="hljs-keyword">this</span>.props
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h6</span>&gt;</span>{a}<span class="hljs-tag">&lt;/<span class="hljs-name">h6</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h6</span>&gt;</span>{b}<span class="hljs-tag">&lt;/<span class="hljs-name">h6</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h6</span>&gt;</span>{c}<span class="hljs-tag">&lt;/<span class="hljs-name">h6</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h6</span>&gt;</span>{fab}<span class="hljs-tag">&lt;/<span class="hljs-name">h6</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h6</span>&gt;</span>{hbc}<span class="hljs-tag">&lt;/<span class="hljs-name">h6</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h6</span>&gt;</span>{gac}<span class="hljs-tag">&lt;/<span class="hljs-name">h6</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h6</span>&gt;</span>{uabc}<span class="hljs-tag">&lt;/<span class="hljs-name">h6</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mapStateToProps</span>(<span class="hljs-params">state</span>) </span>{
    <span class="hljs-keyword">const</span> {a, b, c} = state
    <span class="hljs-keyword">return</span> {
        a,
        b,
        c,
        <span class="hljs-attr">fab</span>: f(a,b),
        <span class="hljs-attr">hbc</span>: h(b,c),
        <span class="hljs-attr">gac</span>: g(a,c),
        <span class="hljs-attr">uabc</span>: u(a, b, c)
    }
}
UnusedComp = connect(mapStateToProps)(UnusedComp)</code></pre>
<p>组件很简单， 接收数据展示就可以了。 看似很美好！ 我们知道当store数据被改变的时候， 会通知所有connect的组件（前提是没被销毁）。 <br>所有假设页面上还有 A， B， C三个组件， 这三个组件任意状态（存在redux的状态）的改变， 都会出发这里的 f, h, g, u的执行。。。听起来很扯！！！的确很扯！（在redner里面， willReciveProps里面计算是这里是不会引起函数执行的）。 但是这通常不是问题， 因为我们一般每个页面只有一个 容器组件 和redux交互， 其他子组件通过props的方式获取数据和action。 而且react-router在切换路由的时候， 是会销毁掉前一个路由的组件。 这样同一个时间只会有 一个 容器组件。 </p>
<p>在考虑一种情况， 假设UnusedComp还有 x, y, z 状态属性， 存在redux。 这3个属性就是简单的3个值， 只用来展示。 可是当x， y， z改变的时候，也会触发计算。 这里发生的计算不管是在render里面计算， 还是willReciveProps, 还是mapStateToProps里 都无法避免。</p>
<h3 id="articleHeader4">精确控制计算</h3>
<p>仿佛我们依据找到了 方法：</p>
<ol>
<li><p>redux只存基本状态</p></li>
<li><p>react-router + 单 容器组件 组件</p></li>
</ol>
<p>现实很残酷！ 实际上x, y, z这种属性， 一定大量存在。 光是这一点就会导致大量的无效计算。 之前讨论的3种方式 （render， willRecive，mapStateToProps）无法避免这种计算。 </p>
<p>另外mapStateToProps 还会被其他store的值改变影响 ，毕竟react-router + 单 容器组件 组件 这种组织方式只是最美好的情况。 我们有些业务就是处于性能的考虑，没有销毁之前路由的组件， 用我们自己的路由。有些页面也不是 单容器组件，尴尬！！</p>
<p>明显的， 我们是知道 x， y， z的变化是不需要计算的， 而a，b， c变化是需要计算的。 如何描述给程序呢？另外 mapStateToProps 这种方式还带来了好处， 我们在描述的时候，不会侵入组件！！。</p>
<p>最原始的描述：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let memoizeState = null
function mapStateToProps(state) {
    const {a, b, c} = state
    if (!memoizeState) { 
       memoizeState =  {
            a,
            b,
            c,
            fab: f(a,b),
            hbc: h(b,c),
            gac: g(a,c),
            uabc: u(a, b, c)
        }
    } else {
        if (!(a === memoizeState.a &amp;&amp; b === memoizeState.b) ) {
            // f should invoke
            memoizeState.fab = f(a, b)
        }
        if (!(b === memoizeState.b &amp;&amp; c === memoizeState.c) ) {
            // h should invoke
            memoizeState.hbc = h(b, c)
        }
        if (!(a === memoizeState.a &amp;&amp; c === memoizeState.c) ) {
            // g should invoke
            memoizeState.gac = g(a, c)
        }
        if (!(a === memoizeState.a &amp;&amp; b === memoizeState.b &amp;&amp; c === memoizeState.c) ) {
            // u should invoke
            memoizeState.uabc = u(a, b, c)
        }
        memoizeState.a = a
        memoizeState.b = b
        memoizeState.c = c
    }
    
    return memoizeState
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> memoizeState = <span class="hljs-literal">null</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mapStateToProps</span>(<span class="hljs-params">state</span>) </span>{
    <span class="hljs-keyword">const</span> {a, b, c} = state
    <span class="hljs-keyword">if</span> (!memoizeState) { 
       memoizeState =  {
            a,
            b,
            c,
            <span class="hljs-attr">fab</span>: f(a,b),
            <span class="hljs-attr">hbc</span>: h(b,c),
            <span class="hljs-attr">gac</span>: g(a,c),
            <span class="hljs-attr">uabc</span>: u(a, b, c)
        }
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">if</span> (!(a === memoizeState.a &amp;&amp; b === memoizeState.b) ) {
            <span class="hljs-comment">// f should invoke</span>
            memoizeState.fab = f(a, b)
        }
        <span class="hljs-keyword">if</span> (!(b === memoizeState.b &amp;&amp; c === memoizeState.c) ) {
            <span class="hljs-comment">// h should invoke</span>
            memoizeState.hbc = h(b, c)
        }
        <span class="hljs-keyword">if</span> (!(a === memoizeState.a &amp;&amp; c === memoizeState.c) ) {
            <span class="hljs-comment">// g should invoke</span>
            memoizeState.gac = g(a, c)
        }
        <span class="hljs-keyword">if</span> (!(a === memoizeState.a &amp;&amp; b === memoizeState.b &amp;&amp; c === memoizeState.c) ) {
            <span class="hljs-comment">// u should invoke</span>
            memoizeState.uabc = u(a, b, c)
        }
        memoizeState.a = a
        memoizeState.b = b
        memoizeState.c = c
    }
    
    <span class="hljs-keyword">return</span> memoizeState
}</code></pre>
<p>首选， 我们知道fab的值与a,b 有关， 所以当a, b 有变化的时候，f需要重新执行。 其他同理， 这样的话函数一定是只在必要的时候执行。</p>
<h3 id="articleHeader5">使用reselect</h3>
<p>reselect 解决了我们上面的那个问题， 我们也不必每次用这个最原始的描述了， 对应的reselect描述是这样的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { createSelector } from 'reselect'

fSelector = createSelector(
    a => state.a,
    b => state.b,
    (a, b) => f(a, b)
)
hSelector = createSelector(
    b => state.b,
    c => state.c,
    (b, c) => h(b, c)
)
gSelector =  createSelector(
    a => state.a,
    c => state.c,
    (a, c) => g(a, c)
)
uSelector = createSelector(
    a => state.a,
    b => state.b,
    c => state.c,
    (a, b, c) => u(a, b, c)
)

...
function mapStateToProps(state) {
    const { a, b, c } = state
    return {
        a,
        b,
        c,
        fab: fSelector(state),
        hbc: hSelector(state),
        gac: gSelector(state),
        uabc: uSelector(state)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { createSelector } <span class="hljs-keyword">from</span> <span class="hljs-string">'reselect'</span>

fSelector = createSelector(
    <span class="hljs-function"><span class="hljs-params">a</span> =&gt;</span> state.a,
    b =&gt; state.b,
    (a, b) =&gt; f(a, b)
)
hSelector = createSelector(
    <span class="hljs-function"><span class="hljs-params">b</span> =&gt;</span> state.b,
    c =&gt; state.c,
    (b, c) =&gt; h(b, c)
)
gSelector =  createSelector(
    <span class="hljs-function"><span class="hljs-params">a</span> =&gt;</span> state.a,
    c =&gt; state.c,
    (a, c) =&gt; g(a, c)
)
uSelector = createSelector(
    <span class="hljs-function"><span class="hljs-params">a</span> =&gt;</span> state.a,
    b =&gt; state.b,
    c =&gt; state.c,
    (a, b, c) =&gt; u(a, b, c)
)

...
function mapStateToProps(state) {
    <span class="hljs-keyword">const</span> { a, b, c } = state
    <span class="hljs-keyword">return</span> {
        a,
        b,
        c,
        <span class="hljs-attr">fab</span>: fSelector(state),
        <span class="hljs-attr">hbc</span>: hSelector(state),
        <span class="hljs-attr">gac</span>: gSelector(state),
        <span class="hljs-attr">uabc</span>: uSelector(state)
    }
}</code></pre>
<p>在 createSelector 里面我们先定义了 input-selector 函数， 最后定义了 值是如何计算出来的。 selector保证了，当input-selector 返回结果相等的时候，不会计算。</p>
<h3 id="articleHeader6">最后</h3>
<p>如果 你是react-router 并且是 单 容器组件。 那么可能在 mapStateToProps里面计算，性能问题并不大。 而且性能不应该是我们第一要考虑的东西， 我们首先要考虑的是简单性，尤其是组件的简单性。 当我们的业务复杂到需要考虑性能的时候， reselect是我们不错的选择！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
为什么我们需要reselect

## 原文链接
[https://segmentfault.com/a/1190000011936772](https://segmentfault.com/a/1190000011936772)

