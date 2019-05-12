---
title: 'React系列---React（二）组件的prop和state' 
date: 2019-01-11 2:30:08
hidden: true
slug: izx6pg6x9lr
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://segmentfault.com/a/1190000009882841">React系列---React（一）初识React</a><br>React系列---React（二）组件的prop和state<br><a href="https://segmentfault.com/a/1190000009921634" target="_blank">React系列---React（三）组件的生命周期</a></p>
<hr>
<p>组件是React的基石，所有的React应用程序都是基于组件的。基于组件的应用开发是广泛使用的软件开发模式，用分而治之的方法，把一个大的应用分解成若干小的组件，每个组件只关注某个特定功能，但是把组件组合起来，就能构成一个功能庞大的应用。</p>
<p>React组件的数据分为两种，prop和state，无论prop或者state的改变，都可能引发组件的重新渲染。prop是组件对外接口，state是组件内部状态。</p>
<h1 id="articleHeader0">第一个组件</h1>
<p>用<a href="https://segmentfault.com/a/1190000009902402">create-react-app</a>工具，初始化一个React项目：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm create-react-app react-component-demo" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dsconfig"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">npm </span><span class="hljs-built_in">create-react-app</span> <span class="hljs-string">react-component-</span><span class="hljs-string">demo</span></code></pre>
<p>创建一个可以计算点击数的组件：<br>/src/ClickCounter.js：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';

class ClickCounter extends React.Component {
    constructor(props) {
        super(props);
        this.onClickButton = this.onClickButton.bind(this);
        this.state = {count: 0};
    }

    onClickButton() {
        this.setState({count: this.state.count + 1});
    }

    render() {
        return (
          <div>
            <button onClick={this.onClickButton}>Click Me</button>
            <div>
              Click Count: {this.state.count}
            </div>
          </div>
        );
    };
}

export default ClickCounter;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ClickCounter</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.onClickButton = <span class="hljs-keyword">this</span>.onClickButton.bind(<span class="hljs-keyword">this</span>);
        <span class="hljs-keyword">this</span>.state = {<span class="hljs-attr">count</span>: <span class="hljs-number">0</span>};
    }

    onClickButton() {
        <span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">count</span>: <span class="hljs-keyword">this</span>.state.count + <span class="hljs-number">1</span>});
    }

    render() {
        <span class="hljs-keyword">return</span> (
          <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.onClickButton}</span>&gt;</span>Click Me<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
              Click Count: {this.state.count}
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        );
    };
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> ClickCounter;</code></pre>
<p>修改/src/index.js：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';
import ClickCounter from './ClickCounter';

ReactDOM.render(<ClickCounter />, document.getElementById('root'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;
<span class="hljs-keyword">import</span> ClickCounter <span class="hljs-keyword">from</span> <span class="hljs-string">'./ClickCounter'</span>;

ReactDOM.render(&lt;ClickCounter /&gt;, <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'root'</span>));</code></pre>
<p>运行React项目</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> start</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVPM3t?w=560&amp;h=168" src="https://static.alili.tech/img/bVPM3t?w=560&amp;h=168" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>点击按钮，数字会随之增加。恭喜你，已经构建了一个有交互的组件！</p>
<p>我们还可以在React组件中定义样式。修改ClickCounter组件的render函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render() {
    const counterStyle = {
        margin: '16px'
    };
    return (
      <div style={counterStyle}>
        <button onClick={this.onClickButton}>Click Me</button>
        <div>
          Click Count: <span id=&quot;clickCount&quot;>{this.state.count}</span>
        </div>
      </div>
    );
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>render() {
    <span class="hljs-keyword">const</span> counterStyle = {
        <span class="hljs-attr">margin</span>: <span class="hljs-string">'16px'</span>
    };
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{counterStyle}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.onClickButton}</span>&gt;</span>Click Me<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
          Click Count: <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"clickCount"</span>&gt;</span>{this.state.count}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
};</code></pre>
<h1 id="articleHeader1">组件的prop</h1>
<p>React组件通过定义自己能够接受的prop就定义了自己对外公共接口。外部世界通过prop和组件对话。</p>
<h2 id="articleHeader2">给prop赋值</h2>
<p>从外部世界看prop的使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<SampleButton id=&quot;sample&quot; borderWidth={2} onClick={onButtonClick} style="{{"color: &quot;red&quot;"}}" />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs htmlbars"><code style="word-break: break-word; white-space: initial;"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">SampleButton</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"sample"</span> <span class="hljs-attr">borderWidth</span>=<span class="hljs-string">{2}</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{onButtonClick}</span> <span class="hljs-attr">style</span>=</span></span><span class="hljs-template-variable">"{{"color: <span class="hljs-string">"red"</span>"}}"</span><span class="xml"><span class="hljs-tag"> /&gt;</span></span></code></pre>
<p>上面的例子使用了名为SampleButton的组件实例。React组件的prop所能支持的类型除了字符串，还可以是任何一种JavaScript语言支持的数据类型。当prop的类型不是字符串时，再JSX中必须用花括号{}把值包裹，所以style的值有两层花括号，外层代表是JSX的语法，内层代表这是个对象常量。</p>
<p>React组件要反馈数据给外部世界，也是用prop，因为prop类型也可以是函数，函数类型的prop等于让父组件交给子组件一个回调函数，子组件在恰当的时机调用函数的prop，就可以把信息传递给外部世界。</p>
<p>为了演示，我们构造一个应用包含两种组件，ControlPanel父组件，然后若干个Counter子组件。对于Counter组件，父组件ControlPanel就是外部世界：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class ControlPanel extends React.Component {
    render() {
        return (
          <div>
            <Counter caption=&quot;First&quot; initValue={0} />
            <Counter caption=&quot;Second&quot; initValue={10} />
            <Counter caption=&quot;Third&quot; initValue={20} />
          </div>
        );
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ControlPanel</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> (
          &lt;div&gt;
            &lt;<span class="hljs-type">Counter</span> caption=<span class="hljs-string">"First"</span> initValue={<span class="hljs-number">0</span>} /&gt;
            &lt;<span class="hljs-type">Counter</span> caption=<span class="hljs-string">"Second"</span> initValue={<span class="hljs-number">10</span>} /&gt;
            &lt;<span class="hljs-type">Counter</span> caption=<span class="hljs-string">"Third"</span> initValue={<span class="hljs-number">20</span>} /&gt;
          &lt;/div&gt;
        );
    }
}</code></pre>
<blockquote><p>React要求render只能返回一个元素，所以我们用div包裹了3个子组件。</p></blockquote>
<p>每个Counter组件使用了caption和initValue两个prop。ControlPanel通过caption的prop传递给Counter组件实例说明文字，通过initValue的prop传递给Count组件一个初始的计数值。</p>
<h2 id="articleHeader3">读取prop值</h2>
<p>看下Counter组件内部是如何接收prop的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Counter extends React.Component {
    constructor(props) {
        super(props);

        this.onClickIncrementButton = this.onClickIncrementButton.bind(this);
        this.onClickDecrementButton = this.onClickDecrementButton.bind(this);

        this.state = {
            count: props.initValue || 0
        };
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Counter</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    constructor(props) {
        <span class="hljs-keyword">super</span>(props);

        <span class="hljs-keyword">this</span>.onClickIncrementButton = <span class="hljs-keyword">this</span>.onClickIncrementButton.bind(<span class="hljs-keyword">this</span>);
        <span class="hljs-keyword">this</span>.onClickDecrementButton = <span class="hljs-keyword">this</span>.onClickDecrementButton.bind(<span class="hljs-keyword">this</span>);

        <span class="hljs-keyword">this</span>.state = {
            count: props.initValue || <span class="hljs-number">0</span>
        };
    }
}</code></pre>
<p>如果组件需要定义自己的构造函数，构造函数第一行一定要通过super调用父类React.Component的构造函数。给this.props赋值也是React.Component构造函数的工作之一。<br>在Counter的构造函数中，还给两个成员函数绑定了当前this的执行环境，因为ES6方式创建的组件并不自动给我们绑定this到当前实例对象。</p>
<p>在其他函数中则可以通过this.props访问传入的值，看一下render函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render() {
    const {caption} = this.props; // ES6的解构赋值
    return (
      <div>
        <button style={buttonStyle} onClick={this.onClickIncrementButton}>+</button>
        <button style={buttonStyle} onClick={this.onClickDecrementButton}>-</button>
        <span>{caption} count: {this.state.count}</span>
      </div>
    );
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>render() {
    <span class="hljs-keyword">const</span> {caption} = <span class="hljs-keyword">this</span>.props; <span class="hljs-comment">// ES6的解构赋值</span>
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{buttonStyle}</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.onClickIncrementButton}</span>&gt;</span>+<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{buttonStyle}</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.onClickDecrementButton}</span>&gt;</span>-<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>{caption} count: {this.state.count}<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
};</code></pre>
<h2 id="articleHeader4">propTypes检查</h2>
<p>在ES6方法定义的组件中，可以通过增加类的propTypes属性来定义prop规格。在运行和静态代码检查时，都可以根据propTypes判断外部世界是否正确地使用了组件的属性。</p>
<p>增加Counter组件的propTypes定义：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Counter.propTypes = {
  caption: PropTypes.string.isRequired,
  initValue: PropTypes.number
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs roboconf"><code>Counter.propTypes = {
  <span class="hljs-attribute">caption</span>: PropTypes<span class="hljs-variable">.string</span><span class="hljs-variable">.isRequired</span>,
  initValue: PropTypes<span class="hljs-variable">.number</span>
};</code></pre>
<p>开发过程中，定义propTypes代码可以避免犯错，但是在发布产品时，可以用babel-react-optimize工具自动去除propTypes，这样部署到产品环境的代码就会更优。</p>
<h1 id="articleHeader5">组件的state</h1>
<p>驱动组件渲染的除了prop，还有state，state代表组件内部状态。由于React组件禁止修改传入的prop，所以当组件需要记录自身的数据变化时，就要使用state。<br>在Counter组件中，初始计数可以通过initValue这个prop指定。当用户点击“+”和“-”改变计数时，就要Counter组件自己通过state来存储了。</p>
<h2 id="articleHeader6">初始化state</h2>
<p>通常在构造函数的结尾处初始化state，就如上面的Counter：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor(props) {
    ...
    this.state = {
        count: props.initValue || 0
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-function"><span class="hljs-keyword">constructor</span><span class="hljs-params">(props)</span> <span class="hljs-comment">{
    ...
    this.state = {
        count: props.initValue || 0
    }</span>;</span>
}</code></pre>
<p>由于在PropType声明中没有用isRequired，我们需要在代码中判断给定的prop值是否存在，不存在则给一个默认值。我们可以利用React的defaultProps功能，避免判断逻辑这种充斥在构造函数之中，让代码更优。</p>
<p>给Counter组件添加defaultProps代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Counter.defaultProps = {
    initValue: 0
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>Counter.defaultProps = {
<span class="hljs-symbol">    initValue:</span> <span class="hljs-number">0</span>
};</code></pre>
<p>构造函数就可以简化了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor(props) {
    ...
    this.state = {
        count: props.initValue
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code><span class="hljs-function"><span class="hljs-keyword">constructor</span><span class="hljs-params">(props)</span> <span class="hljs-comment">{
    ...
    this.state = {
        count: props.initValue
    }</span>;</span>
}</code></pre>
<h2 id="articleHeader7">读取和更新state</h2>
<p>通过给button的onClick属性挂载点击事件处理函数，我们可以改变组件的state，以点击“+”按钮的响应函数为例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="onClickIncrementButton() {
    this.setState({count: this.state.count + 1});
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code><span class="hljs-keyword">on</span>ClickIncrementButton() {
    this.<span class="hljs-built_in">set</span>State({count: this.<span class="hljs-keyword">state</span>.count + <span class="hljs-number">1</span>});
}</code></pre>
<p>通过this.state可以读取到组件的当前state。注意的是，改变state必须使用this.setState函数，而不能直接修改this.state。如果你违反这个操作，浏览器Console会告警。</p>
<p>直接修改this.state的值，只是野蛮的修改了state，却没有驱动组件重新渲染，新的值当然也不会反应在界面上。而this.setState()函数所做的事情，就是改变this.state的值后再驱动组件重新渲染。</p>
<h2 id="articleHeader8">无状态函数式组件</h2>
<p>没有内部state，不需要组件生命周期函数。可以用纯函数的形式来表达。它做的事情只是根据输入来展示组件，没有其他副作用。可以把这种组件称为无状态函数式组件（stateless functional component）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';

// 用一个纯函数表示
const Hobby = (props) => <li>{props.hobby}</li>;

export default Hobby;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-regexp">//</span> 用一个纯函数表示
const Hobby = <span class="hljs-function"><span class="hljs-params">(props)</span> =&gt;</span> &lt;li&gt;{props.hobby}&lt;/li&gt;;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Hobby;</code></pre>
<h2 id="articleHeader9">state设计原则</h2>
<p>创建尽量多的无状态组件，这些组件唯一关心的就是渲染数据。而在最外层，应该有一个包含state的父级别组件，用于处理各种事件、交流逻辑、修改state。对应的子组件要关心的只是传入的属性而已。</p>
<p>state应该包含组件的事件回调函数可能引发UI更新的这类数据。在实际的项目中，应该是轻量化的JSON数据，尽量把数据的表现设计到最小，更多的数据可以在render中通过各种计算得到。</p>
<h2 id="articleHeader10">prop和state对比</h2>
<ul>
<li>prop用于定义外部接口，state用于记录内部状态；</li>
<li>prop的赋值在外部世界使用组件时，state的赋值在组件内部；</li>
<li>组件不应该改变prop的值，而state的存在的目的就是让组件来改变的。</li>
</ul>
<h1 id="articleHeader11">DOM操作</h1>
<p>大多数情况下，不需要操作DOM去更新UI，应使用setState。但是有些情况确实需要访问一些DOM（如表单的值），那么可采用refs方式来获得DOM节点。只需要加个ref属性，然后通过this.refs.name来获得对应的DOM结构。</p>
<p>示例Profile组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render() {
  return (
    <div>
      ...
      <input type=&quot;text&quot; ref=&quot;hobby&quot; />
      <button onClick={this.addHobbyCallback}>添加爱好</button>
    </div>
  )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>render() {
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      ...
      <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"hobby"</span> /&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.addHobbyCallback}</span>&gt;</span>添加爱好<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  )
}</span></code></pre>
<p>在button上添加事件，取得input的值，添加到state的值里面:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="addHobbyCallback() {
  // 用this.refs.name来取得DOM节点
  let hobbyInput = this.refs.hobby;
  let val = hobbyInput.value;
  if (val) {
    let hobbies = this.state.hobbies;
    // 添加值到数组
    hobbies = [...hobbies, val];
    // 更新state, 刷新UI
    this.setState({
      hobbies
    }, () => {
      hobbyInput.value = '';
    });
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>addHobbyCallback() {
  <span class="hljs-comment">// 用this.refs.name来取得DOM节点</span>
  let hobbyInput = <span class="hljs-keyword">this</span>.refs.hobby;
  let <span class="hljs-keyword">val</span> = hobbyInput.value;
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">val</span>) {
    let hobbies = <span class="hljs-keyword">this</span>.state.hobbies;
    <span class="hljs-comment">// 添加值到数组</span>
    hobbies = [...hobbies, <span class="hljs-keyword">val</span>];
    <span class="hljs-comment">// 更新state, 刷新UI</span>
    <span class="hljs-keyword">this</span>.setState({
      hobbies
    }, () =&gt; {
      hobbyInput.value = <span class="hljs-string">''</span>;
    });
  }
}</code></pre>
<hr>
<p><a href="https://segmentfault.com/a/1190000009882841" target="_blank">React系列---React（一）初识React</a><br>React系列---React（二）组件的prop和state<br><a href="https://segmentfault.com/a/1190000009921634">React系列---React（三）组件的生命周期</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React系列---React（二）组件的prop和state

## 原文链接
[https://segmentfault.com/a/1190000009921542](https://segmentfault.com/a/1190000009921542)

