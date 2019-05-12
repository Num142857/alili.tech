---
title: 'React从入门到精通系列之(5)state管理和生命周期钩子' 
date: 2019-01-30 2:30:22
hidden: true
slug: 4ptqo5zk6yt
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">State和生命周期</h2>
<p>考虑前面部分中的滴答时钟示例（第三章）。<br>到目前为止，我们只学习了一种更新UI的方法。<br>我们调用<code>ReactDOM.render()</code>来改变渲染输出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';

function tick() {
    const element = (
        <div>
            <h1>Hell world</h1>
            <h2>It is {new Date().toLocaleTimeString()}</h2>
        </div>
    );
    ReactDOM.render(
        element,
        document.getElementById('root')
    );
}

setInterval(tick, 1000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">tick</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">const</span> element = (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hell world<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>It is {new Date().toLocaleTimeString()}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
    ReactDOM.render(
        element,
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'root'</span>)
    );
}

setInterval(tick, <span class="hljs-number">1000</span>);</code></pre>
<p>在本节中，我们将学习如何使<code>Clock</code>组件真正可重用和封装。 它将设置自己的计时器并每秒更新一次。<br>我们可以从封装时钟的外观开始：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';

function Clock(props) {
    return (
        <div>
            <h1>hello world</h1>
            <h2>It is {props.date.toLocaleTimeString()}</h2>
        </div>
    );
}

function tick() {
   ReactDOM.render(
       <Clock date={new Date()} />,
       document.getElementById('root')
   );
}

setInterval(tick, 1000);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Clock</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>hello world<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>It is {props.date.toLocaleTimeString()}<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">tick</span>(<span class="hljs-params"></span>) </span>{
   ReactDOM.render(
       <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Clock</span> <span class="hljs-attr">date</span>=<span class="hljs-string">{new</span> <span class="hljs-attr">Date</span>()} /&gt;</span>,
       document.getElementById('root')
   );
}

setInterval(tick, 1000);</span></code></pre>
<p>然而，它缺少了一个关键要求：时钟设置一个定时器和每秒更新UI的事实应该是时钟的实现细节。<br>理想情况下，我们要写这一次，并由时钟本身来更新时间：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ReactDOM.render(
    <Clock />,
    document.getElementById('root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">ReactDOM.render(
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Clock</span> /&gt;</span>,
    document.getElementById('root')
);</span></code></pre>
<p>要实现这一点，我们需要添加“state”到时钟组件。</p>
<p><strong>state类似于props，但它是私有的，完全由组件控制。</strong></p>
<p>我们之前提到，定义为类组件具有一些附加功能。 内部state就是：一个只有类组件可用的功能。</p>
<h3 id="articleHeader1">将函数形式组件改为类形式组件</h3>
<p>您可以通过五个步骤将功能组件（如Clock）转换为类组件 ：</p>
<ol>
<li><p>创建一个与扩展<code>React.Component</code>相同名称的ES6类。</p></li>
<li><p>为它添加一个单一的空方法<code>render()</code>。</p></li>
<li><p>将函数的主体移动到<code>render()</code>方法中。</p></li>
<li><p>在<code>render()</code>主体中用<code>this.props</code>替换<code>props</code>。</p></li>
<li><p>删除剩余的空函数声明。</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Clock extends React.Component {
   render() {
       return (
           <div>
               <h1>hello world</h1>
               <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
           </div>
       )
   };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Clock</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
   render() {
       <span class="hljs-keyword">return</span> (
           <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
               <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>hello world<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
               <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>It is {this.props.date.toLocaleTimeString()}.<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
           <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
       )
   };
}</code></pre>
<p><code>Clock</code>现在已经重新定义为类组件而不是之前的功能组件了。<br>这使我们可以使用额外的功能，如内部state和生命周期钩子。</p>
<h3 id="articleHeader2">向类组件中添加state</h3>
<p>我们将分为三个步骤把<code>date</code>从<code>props</code>移动到<code>state</code>：</p>
<h5>1）在<code>render()</code>方法中将<code>this.props.date</code>替换为<code>this.state.date</code>：</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Clock extends React.Component {
    render() {
        return (
            <div>
                <h1>hello world</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
            </div>
        );
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Clock</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>hello world<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>It is {this.state.date.toLocaleTimeString()}.<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        );
    }
}</code></pre>
<h5>2）添加一个赋值初始<code>this.state</code>的类构造函数：</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }
    
    render() {
        return (
            <div>
                <h1>hello world</h1>
                <h2>It is {this.state.date.toLocalTimeString()}.</h2>
            </div>
        );
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Clock</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {<span class="hljs-attr">date</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()};
    }
    
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>hello world<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>It is {this.state.date.toLocalTimeString()}.<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        );
    }
}</code></pre>
<p>注意我们如何将props传递给基类的构造函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor(props) {
    super(props);
    this.state = {date: new Date()};
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {<span class="hljs-attr">date</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()};
}</code></pre>
<p>类组件应该总是用props调用基类构造函数。</p>
<h5>3）从<code>&lt;Clock /&gt;</code>元素中删除<code>date</code> prop：</h5>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ReactDOM.render(
    <Clock />,
    document.getElementById('root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">ReactDOM.render(
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Clock</span> /&gt;</span>,
    document.getElementById('root')
);</span></code></pre>
<p>我们稍后将定时器代码添加回组件本身。<br>结果如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';

class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }
    
    render() {
       return (
           <div>
               <h1>hello world</h1>
               <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
           </div>
       );
    }
}

ReactDOM.render(
    <Clock />,
    document.getElementById('root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Clock</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {<span class="hljs-attr">date</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()};
    }
    
    render() {
       <span class="hljs-keyword">return</span> (
           <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
               <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>hello world<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
               <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>It is {this.state.date.toLocaleTimeString()}.<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
           <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
       );
    }
}

ReactDOM.render(
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Clock</span> /&gt;</span>,
    document.getElementById('root')
);</span></code></pre>
<p>接下来，我们将使时钟设置自己的定时器，并每秒更新一次。</p>
<h3 id="articleHeader3">向类中添加声明周期方法</h3>
<p>在具有许多组件的应用程序中，释放组件在销毁时占用的资源非常重要。<br>我们想要在第一次将时钟渲染到DOM时设置一个计时器。 这在React中称为<code>“安装（mounting）”</code>。<br>我们还想清除定时器，当时钟产生的DOM被删除。 这在React中称为<code>“卸载（unmounting）"</code>。<br>我们可以在组件类上声明特殊方法，以便在组件装入和卸载时运行一些代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }
    
    componentDidMount() {
        // 组件已经安装完毕
    }
    
    componentWillUnmount() {
        // 组件将要被卸载
    }
    
    render() {
       return (
           <div>
               <h1>hello world</h1>
               <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
           </div>
       );
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Clock</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {<span class="hljs-attr">date</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()};
    }
    
    componentDidMount() {
        <span class="hljs-comment">// 组件已经安装完毕</span>
    }
    
    componentWillUnmount() {
        <span class="hljs-comment">// 组件将要被卸载</span>
    }
    
    render() {
       <span class="hljs-keyword">return</span> (
           <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
               <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>hello world<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
               <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>It is {this.state.date.toLocaleTimeString()}.<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
           <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
       );
    }
}</code></pre>
<p>这些方法称为<code>“生命周期钩子”</code>。<br><code>componentDidMount()</code>子在组件输出呈现到DOM之后运行。 这是设置计时器的好地方：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentDidMount() {
    this.timerID = setInterval(
        () => this.tick(),
        1000
    )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">componentDidMount() {
    <span class="hljs-keyword">this</span>.timerID = setInterval(
        <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">this</span>.tick(),
        <span class="hljs-number">1000</span>
    )
}</code></pre>
<p>注意我们如何保存计时器ID就在这。<br>虽然<code>this.props</code>是由React本身设置的，并且<code>this.state</code>有一个特殊的含义，如果你需要存储不用于视觉输出的东西，你可以手动地添加额外的字段到类中。<br>如果你不使用<code>render()</code>中的东西，它不应该放置在<code>state</code>中。<br>我们将拆除<code>componentWillUnmount()</code>生命周期钩子中的计时器：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentWillUnmount() {
    clearInterval(this.timerID);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">componentWillUnmount() {
    clearInterval(<span class="hljs-keyword">this</span>.timerID);
}</code></pre>
<p>最后，我们将实现每秒运行的<code>tick()</code>方法。<br>它将使用<code>this.setState()</code>来调度组件本地state的更新：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Clock extends React.Component {
    constructor(props) {
        super(props);
        this.state = {date: new Date()};
    }
    
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        )
    }
    
    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }
    
    render() {
       return (
           <div>
               <h1>hello world</h1>
               <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
           </div>
       );
    }
}
ReactDOM.render(
    <Clock />,
    document.getElementById('root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Clock</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {<span class="hljs-attr">date</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()};
    }
    
    componentDidMount() {
        <span class="hljs-keyword">this</span>.timerID = setInterval(
            <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">this</span>.tick(),
            <span class="hljs-number">1000</span>
        )
    }
    
    componentWillUnmount() {
        clearInterval(<span class="hljs-keyword">this</span>.timerID);
    }

    tick() {
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">date</span>: <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>()
        });
    }
    
    render() {
       <span class="hljs-keyword">return</span> (
           <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
               <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>hello world<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
               <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>It is {this.state.date.toLocaleTimeString()}.<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
           <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
       );
    }
}
ReactDOM.render(
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Clock</span> /&gt;</span>,
    document.getElementById('root')
);</span></code></pre>
<p>现在时钟每秒钟都在滴答地走，棒不棒。。。。</p>
<p>让我们快速回顾一下发生了什么以及调用方法的顺序：</p>
<ul>
<li><p>1）当将<code>&lt;Clock /&gt;</code>传递给ReactDOM.render()时，React调用Clock组件的构造函数。由于Clock需要显示当前时间，它使用包括当前时间的对象初始化<code>this.state</code>。我们稍后将更新此state。</p></li>
<li><p>2）React然后调用Clock组件的<code>render()</code>方法。这是React如何学习应该在屏幕上显示什么。 React然后更新DOM以匹配时钟的渲染输出。</p></li>
<li><p>3）当时钟输出插入到DOM中时，React调用<code>componentDidMount()</code>生命周期钩子。在其中，时钟组件要求浏览器设置一个定时器，每秒调用<code>tick()</code>一次。</p></li>
<li><p>4）每秒钟浏览器调用<code>tick()</code>方法。在其中，Clock组件通过调用<code>setState()</code>和包含当前时间的对象来调度UI更新。由于<code>setState()</code>调用，React知道state已更改，并再次调用<code>render()</code>方法来了解屏幕上应该显示的内容。这个时候，<code>render()</code>方法中的<code>this.state.date</code>将会不同，因此渲染输出将包括更新的时间。 React相应地更新DOM。</p></li>
<li><p>5）如果时钟组件从DOM中被移除，React将调用<code>componentWillUnmount()</code>生命周期钩子，因此定时器停止。</p></li>
</ul>
<h3 id="articleHeader4">正确使用state</h3>
<p>关于<code>setState()</code>你应该了解三件事情:</p>
<h4>不要直接修改state</h4>
<p>例如，这将不会重新渲染组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 这是错误的
this.state.comment = 'hello';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 这是错误的</span>
<span class="hljs-keyword">this</span>.state.comment = <span class="hljs-string">'hello'</span>;</code></pre>
<p>应该使用<code>setState()</code>代替：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 这是正确的
this.setState({comment: 'hello'});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 这是正确的</span>
<span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">comment</span>: <span class="hljs-string">'hello'</span>});</code></pre>
<p>唯一可以分配<code>this.state</code>的地方是构造函数。</p>
<h4>state更新可能是异步的</h4>
<p>React可以将多个<code>setState()</code>用批处理为单个更新以实现较高的性能。<br>因为<code>this.props</code>和<code>this.state</code>可能是异步更新的，你不应该依赖它们的值来计算下一个state。<br>例如，此代码可能无法更新计数器：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 这是错误的
this.setState({
    counter: this.state.counter + this.props.increment,
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 这是错误的</span>
<span class="hljs-keyword">this</span>.setState({
    <span class="hljs-attr">counter</span>: <span class="hljs-keyword">this</span>.state.counter + <span class="hljs-keyword">this</span>.props.increment,
});</code></pre>
<p>要解决它，应该使用回调函数而不是对象来调用<code>setState()</code>。 回调函数将接收先前的state作为第一个参数，并将应用更新时的<code>props</code>作为第二个参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 这是正确的
this.setState((prevState, props) => ({
    counter: prevState.counter + props.increment
}));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 这是正确的</span>
<span class="hljs-keyword">this</span>.setState(<span class="hljs-function">(<span class="hljs-params">prevState, props</span>) =&gt;</span> ({
    <span class="hljs-attr">counter</span>: prevState.counter + props.increment
}));</code></pre>
<p>我们使用上面的箭头函数，但它也可以与常规函数一起使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 这同样也是正确的，将剪头函数改为普通函数
this.setState(function(prevState, props) {
   return {
       counter: prevState.counter + prps.increment
   }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 这同样也是正确的，将剪头函数改为普通函数</span>
<span class="hljs-keyword">this</span>.setState(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">prevState, props</span>) </span>{
   <span class="hljs-keyword">return</span> {
       <span class="hljs-attr">counter</span>: prevState.counter + prps.increment
   }
});</code></pre>
<h5>state更新是经过合并的</h5>
<p>当调用<code>setState()</code>时，React会将您提供的对象合并到当前state。<br>例如，您的state可能包含几个独立变量：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor(props) {
    super(props);
    this.state = {
        posts: [],
        comments: []
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {
        <span class="hljs-attr">posts</span>: [],
        <span class="hljs-attr">comments</span>: []
    }
}</code></pre>
<p>然后，您可以使用单独的<code>setState()</code>来独立地更新它们：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentDidMount() {
    fetchPosts().then(response => {
        this.setState({
            posts: response.posts
        });
    });
    
    fetchComments().then(response => {
        this.setState({
            comments: response.comments
        "}}");
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">componentDidMount() {
    fetchPosts().then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">posts</span>: response.posts
        });
    });
    
    fetchComments().then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">comments</span>: response.comments
        "}}");
    });
}</code></pre>
<p>合并很浅，所以<code>this.setState({comments})</code>不会波及<code>this.state.posts</code>。仅仅只是完全替换了<code>this.state.comments</code>而已。</p>
<h3 id="articleHeader5">数据是向下流动的</h3>
<p>父组件和子组件都不能知道某个组件是有State的还是无State的，并且它们不应该关心它是否为功能组件或类组件。</p>
<p>这就是为什么State通常被设置为局部变量或封装到组件内部。 除了拥有和设置它的组件之外的其他任何组件都不能访问它。</p>
<p>组件可以选择将其state作为props传递给其子组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<h2>Is is {this.state.date.toLocaleTimeString()}.</h2>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">&lt;h2&gt;Is is {<span class="hljs-keyword">this</span>.state.date.toLocaleTimeString()}.&lt;<span class="hljs-regexp">/h2&gt;</span></code></pre>
<p>这也适用于用户定义的组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<formattedDate date={this.state.data} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">&lt;formattedDate date={<span class="hljs-keyword">this</span>.state.data} /&gt;</code></pre>
<p><code>FormattedDate</code>组件将在其<code>props</code>中接收<code>date</code>，并且不知道它是来自时钟的<code>state</code>，<code>props</code>还是<code>手动输入</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function FormattedData(props) {
    return <h2>Is is {props.date.toLocaleTimeString()}.</h2>;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">FormattedData</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>Is is {props.date.toLocaleTimeString()}.<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span></span>;
}</code></pre>
<p>这通常被称为<code>“自顶向下”</code>或<code>“单向”</code>数据流。 任何state总是由一些特定组件拥有，并且从该state派生的任何数据或UI只能影响树中的“下面”组件。</p>
<p>如果你想象一个组件树作为props的瀑布流，每个组件的state就像一个额外的水源，它可以在任意点连接它，但也向下流。</p>
<p>为了显示所有组件都是真正隔离的，我们可以创建一个App组件来渲染三个<code>&lt;Clock&gt;</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function App() {
    return (
        <div>
            <Clock />
            <Clock />
            <Clock />
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">App</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">Clock</span> /&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">Clock</span> /&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">Clock</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
}

ReactDOM.render(
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>,
    document.getElementById('root')
);</span></code></pre>
<p>每个时钟设置自己的定时器并独立更新。<br>在React应用程序中，组件是有状态还是无状态被视为可能随时间更改的组件的实现细节。 您可以在有状态组件内使用无状态组件，反之亦然。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React从入门到精通系列之(5)state管理和生命周期钩子

## 原文链接
[https://segmentfault.com/a/1190000007790642](https://segmentfault.com/a/1190000007790642)

