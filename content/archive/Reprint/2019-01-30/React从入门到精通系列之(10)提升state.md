---
title: 'React从入门到精通系列之(10)提升state' 
date: 2019-01-30 2:30:22
hidden: true
slug: i0bys9c8ziq
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">十、提升state</h2>
<p>通常，如果有几个组件需要反映相同的变化数据。 我们建议将共享state提升到层级最近的，并且是共同的父组件上。 让我们看看这是如何工作的。</p>
<p>在本节中，我们将创建一个温度计算器来计算水是否在给定温度下沸腾。</p>
<p>我们将从一个名为<code>BoilingVerdict</code>的组件开始。 它接受<code>celsius(摄氏温度)</code>作为props，并打印是否足以煮沸水：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>水沸腾了</p>
    }
    return <p>水没有沸腾</p>
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">BoilingVerdict</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">if</span> (props.celsius &gt;= <span class="hljs-number">100</span>) {
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>水沸腾了<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
    }
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>水没有沸腾<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
}</code></pre>
<p>接下来，我们创建一个名字叫<code>Calculator</code>的组件。它渲染一个<code>&lt;input&gt;</code>，让您输入温度，并将其值保存在<code>this.state.value</code>中。</p>
<p>此外，它还会根据当前输入值渲染<code>BoilingVerdict</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';

function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>水沸腾了</p>
    }
    return <p>水没有沸腾</p>
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.change = this.change.bind(this);
    }

    change(e) {
        this.setState({value: e.target.value});
    }

    render() {
        const value = this.state.value;
        return (
            <fieldset>
                <legend>请输入温度</legend>
                <input
                    value={value}
                    onChange={this.change}/>
                <BoilingVerdict celsius={parseFloat(value)}/>
            </fieldset>
        );
    }
}
ReactDOM.render(
    <Calculator />,
    document.getElementById('root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">BoilingVerdict</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">if</span> (props.celsius &gt;= <span class="hljs-number">100</span>) {
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>水沸腾了<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
    }
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>水没有沸腾<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Calculator</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {<span class="hljs-attr">value</span>: <span class="hljs-string">''</span>};
        <span class="hljs-keyword">this</span>.change = <span class="hljs-keyword">this</span>.change.bind(<span class="hljs-keyword">this</span>);
    }

    change(e) {
        <span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">value</span>: e.target.value});
    }

    render() {
        <span class="hljs-keyword">const</span> value = <span class="hljs-keyword">this</span>.state.value;
        <span class="hljs-keyword">return</span> (
            &lt;fieldset&gt;
                &lt;legend&gt;请输入温度&lt;/legend&gt;
                &lt;input
                    value={value}
                    onChange={this.change}/&gt;
                &lt;BoilingVerdict celsius={parseFloat(value)}/&gt;
            &lt;/fieldset&gt;
        );
    }
}
ReactDOM.render(
    &lt;Calculator /&gt;,
    document.getElementById('root')
);</code></pre>
<h3 id="articleHeader1">添加第二个input</h3>
<p>我们的新需求是，除了输入<code>摄氏温度</code>，我们提供一个输入<code>华氏温度</code>，并保持同步。</p>
<p>我们可以从<code>Calculator</code>提取一个<code>TemperatureInput</code>组件。 我们将添加一个新的<code>scale</code> prop，可以是<code>“c”</code>或<code>“f”</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
}
class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.change = this.change.bind(this)
    }
    change(e) {
        this.setState({value: e.target.value});
    }
    render() {
        const value = this.state.value;
        const scale = this.props.scale;
        return (
            <fieldset>
                 <legend>输入{scaleName[scale]}温度</legend>
                 <input value={value} onChange={this.change} />
            </fieldset>
        );
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> scaleNames = {
    <span class="hljs-attr">c</span>: <span class="hljs-string">'Celsius'</span>,
    <span class="hljs-attr">f</span>: <span class="hljs-string">'Fahrenheit'</span>
}
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TemperatureInput</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {<span class="hljs-attr">value</span>: <span class="hljs-string">''</span>};
        <span class="hljs-keyword">this</span>.change = <span class="hljs-keyword">this</span>.change.bind(<span class="hljs-keyword">this</span>)
    }
    change(e) {
        <span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">value</span>: e.target.value});
    }
    render() {
        <span class="hljs-keyword">const</span> value = <span class="hljs-keyword">this</span>.state.value;
        <span class="hljs-keyword">const</span> scale = <span class="hljs-keyword">this</span>.props.scale;
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">fieldset</span>&gt;</span>
                 <span class="hljs-tag">&lt;<span class="hljs-name">legend</span>&gt;</span>输入{scaleName[scale]}温度<span class="hljs-tag">&lt;/<span class="hljs-name">legend</span>&gt;</span>
                 <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{value}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{this.change}</span> /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">fieldset</span>&gt;</span>
        );
    }
}
</span></code></pre>
<p>我们现在可以更改计算器来渲染两个单独的温度输入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Calculator extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <TemperatureInput scale='f' />
                <TemperatureInput scale='c' />
            </div>
        );
    }
}
ReactDOM.render(
    <Calculator />,
    document.getElementById('root')
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Calculator</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
    }
    render() {
        <span class="hljs-keyword">return</span> (
            &lt;div&gt;
                &lt;TemperatureInput scale='f' /&gt;
                &lt;TemperatureInput scale='c' /&gt;
            &lt;/div&gt;
        );
    }
}
ReactDOM.render(
    &lt;Calculator /&gt;,
    document.getElementById('root')
)</code></pre>
<p>我们现在有两个输入框，但是当您在其中一个输入温度时，另一个不更新。 这违反了我们的要求：我们希望保持它们同步。</p>
<p>我们也不能从<code>Calculator</code>显示<code>BoilingVerdict</code>。 计算器不知道当前温度，因为它隐藏在<code>TemperatureInput</code>中。</p>
<h3 id="articleHeader2">提升state</h3>
<p>首先，我们将写两个函数来将摄氏度转换为华氏度，然后返回：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 将华氏度转换为摄氏度
function toCelsius(f) {
    return (f - 32) * 5 / 9;
}
// 将摄氏度转换为华氏度
function toFahrenheit(c) {
    return (c * 9 / 5) + 32;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 将华氏度转换为摄氏度</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">toCelsius</span>(<span class="hljs-params">f</span>) </span>{
    <span class="hljs-keyword">return</span> (f - <span class="hljs-number">32</span>) * <span class="hljs-number">5</span> / <span class="hljs-number">9</span>;
}
<span class="hljs-comment">// 将摄氏度转换为华氏度</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">toFahrenheit</span>(<span class="hljs-params">c</span>) </span>{
    <span class="hljs-keyword">return</span> (c * <span class="hljs-number">9</span> / <span class="hljs-number">5</span>) + <span class="hljs-number">32</span>;
}</code></pre>
<p>这两个函数转换数字。 我们将写另一个函数，它接受一个字符串值和一个转换函数作为参数，并返回一个字符串。 我们将使用它来计算一个输入基于另一个输入的值。</p>
<p>如果传入一个无效的<code>value</code>，那么会返回一个空字符串，并且保持输出四舍五入到小数点后第三位：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function tryConvert(value, convert) {
    const input = parseFloat(value);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return String(rounded);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">tryConvert</span>(<span class="hljs-params">value, convert</span>) </span>{
    <span class="hljs-keyword">const</span> input = <span class="hljs-built_in">parseFloat</span>(value);
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Number</span>.isNaN(input)) {
        <span class="hljs-keyword">return</span> <span class="hljs-string">''</span>;
    }
    <span class="hljs-keyword">const</span> output = convert(input);
    <span class="hljs-keyword">const</span> rounded = <span class="hljs-built_in">Math</span>.round(output * <span class="hljs-number">1000</span>) / <span class="hljs-number">1000</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">String</span>(rounded);
}</code></pre>
<p>例如，<code>tryConvert('abc', toCelsius)</code>返回一个空字符串，<code>tryConvert('10.22', toFahrenheit)</code>返回<code>50.396</code>。<br>接下来，我们会从<code>TemperatureInput</code>中移除<code>state</code>。同时从props接收一个<code>value</code>和一个<code>onChange</code>事件来代替。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Temperature extends React.Component {
    constructor(props) {
        super(props);
        this.change = this.change.bind(this);
    }
    
    change(e) {
        this.props.onChange(e.target.value);
    }
    
    render() {
        const value = this.props.value;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>请输入{scaleName[scale]}温度</legend>
                <input value={value} onChange={this.change} />
            </fieldset>
        );
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Temperature</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.change = <span class="hljs-keyword">this</span>.change.bind(<span class="hljs-keyword">this</span>);
    }
    
    change(e) {
        <span class="hljs-keyword">this</span>.props.onChange(e.target.value);
    }
    
    render() {
        <span class="hljs-keyword">const</span> value = <span class="hljs-keyword">this</span>.props.value;
        <span class="hljs-keyword">const</span> scale = <span class="hljs-keyword">this</span>.props.scale;
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">fieldset</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">legend</span>&gt;</span>请输入{scaleName[scale]}温度<span class="hljs-tag">&lt;/<span class="hljs-name">legend</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{value}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{this.change}</span> /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">fieldset</span>&gt;</span>
        );
    }
}</span></code></pre>
<p>如果几个组件需要访问相同的state，这是一个state应该提升到层级最近的共同父级组件的标志。 在我们的例子中，这是那个<code>Calculator</code>组件。 我们将在其state中存储当前<code>value</code>和<code>scale</code>。</p>
<p>我们可以存储两个输入框的值，但事实证明这是没有必要的。 它足以存储最近更改的输入的<code>value</code>及其表示的<code>scale</code>。 然后，我们可以基于当前<code>value</code>和<code>scale</code>单独推断其他输入的值。</p>
<p>输入保持同步，因为它们的值是从相同的<code>state</code>计算的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: '', scale: 'c'};
        this.CelsiusChange = this.CelsiusChange.bind(this);
        this.FahrenheitChange = this.FahrenheitChange.bind(this);
    }

    CelsiusChange() {
        this.setState({scale: 'c', value});
    }

    FahrenheitChange() {
        this.setState({scale: 'f', value});
    }

    render() {
        const scale = this.state.scale;
        const value = this.state.value;
        const celsius = scale === 'f' ? tryConvert(value, toCelsius) : value;
        const fahrenheit = scale === 'c' ? tryConvert(value, toFahrenheit) : value;

        return (
            <div>
                <Temperature scale=&quot;c&quot; value={celsius} onChange={this.CelsiusChange} />
                <Temperature scale=&quot;f&quot; value={fahrenheit} onChange={this.FahrenheitChange} />
                <BoilingVerdict celsius={parseFloat(celsius)} />
            </div>
        );
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Calculator</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {<span class="hljs-attr">value</span>: <span class="hljs-string">''</span>, <span class="hljs-attr">scale</span>: <span class="hljs-string">'c'</span>};
        <span class="hljs-keyword">this</span>.CelsiusChange = <span class="hljs-keyword">this</span>.CelsiusChange.bind(<span class="hljs-keyword">this</span>);
        <span class="hljs-keyword">this</span>.FahrenheitChange = <span class="hljs-keyword">this</span>.FahrenheitChange.bind(<span class="hljs-keyword">this</span>);
    }

    CelsiusChange() {
        <span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">scale</span>: <span class="hljs-string">'c'</span>, value});
    }

    FahrenheitChange() {
        <span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">scale</span>: <span class="hljs-string">'f'</span>, value});
    }

    render() {
        <span class="hljs-keyword">const</span> scale = <span class="hljs-keyword">this</span>.state.scale;
        <span class="hljs-keyword">const</span> value = <span class="hljs-keyword">this</span>.state.value;
        <span class="hljs-keyword">const</span> celsius = scale === <span class="hljs-string">'f'</span> ? tryConvert(value, toCelsius) : value;
        <span class="hljs-keyword">const</span> fahrenheit = scale === <span class="hljs-string">'c'</span> ? tryConvert(value, toFahrenheit) : value;

        <span class="hljs-keyword">return</span> (
            &lt;div&gt;
                &lt;Temperature scale="c" value={celsius} onChange={this.CelsiusChange} /&gt;
                &lt;Temperature scale="f" value={fahrenheit} onChange={this.FahrenheitChange} /&gt;
                &lt;BoilingVerdict celsius={parseFloat(celsius)} /&gt;
            &lt;/div&gt;
        );
    }
}</code></pre>
<p>最终代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';

const scaleNames = {
    c: 'Celsius',
    f: 'Fahrenheit'
};

function BoilingVerdict(props) {
    if (props.celsius >= 100) {
        return <p>水沸腾了</p>
    }
    return <p>水没有沸腾</p>
}

function toCelsius(f) {
    return (f - 32) * 5 / 9;
}

function toFahrenheit(c) {
    return (c * 9 / 5) + 32;
}

function tryConvert(value, convert) {
    const input = parseFloat(value);
    if (Number.isNaN(input)) {
        return '';
    }
    const output = convert(input);
    const rounded = Math.round(output * 1000) / 1000;
    return String(rounded);
}
class TemperatureInput extends React.Component {
    constructor(props) {
        super(props);
        this.change = this.change.bind(this);
    }

    change(e) {
        this.props.onChange(e.target.value);
    }

    render() {
        const value = this.props.value;
        const scale = this.props.scale;
        return (
            <fieldset>
                <legend>请输入{scaleNames[scale]}温度</legend>
                <input value={value} onChange={this.change}/>
            </fieldset>
        );
    }
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: '', scale: 'c'};
        this.CelsiusChange = this.CelsiusChange.bind(this);
        this.FahrenheitChange = this.FahrenheitChange.bind(this);
    }

    CelsiusChange(value) {
        this.setState({scale: 'c', value});
    }

    FahrenheitChange(value) {
        this.setState({scale: 'f', value});
    }

    render() {
        const scale = this.state.scale;
        const value = this.state.value;
        const celsius = scale === 'f' ? tryConvert(value, toCelsius) : value;
        const fahrenheit = scale === 'c' ? tryConvert(value, toFahrenheit) : value;

        return (
            <div>
                <TemperatureInput scale=&quot;c&quot; value={celsius} onChange={this.CelsiusChange}/>
                <TemperatureInput scale=&quot;f&quot; value={fahrenheit} onChange={this.FahrenheitChange}/>
                <BoilingVerdict celsius={parseFloat(celsius)}/>
            </div>
        );
    }
}
ReactDOM.render(
    <Calculator />,
    document.getElementById('root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;

<span class="hljs-keyword">const</span> scaleNames = {
    <span class="hljs-attr">c</span>: <span class="hljs-string">'Celsius'</span>,
    <span class="hljs-attr">f</span>: <span class="hljs-string">'Fahrenheit'</span>
};

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">BoilingVerdict</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">if</span> (props.celsius &gt;= <span class="hljs-number">100</span>) {
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>水沸腾了<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
    }
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>水没有沸腾<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">toCelsius</span>(<span class="hljs-params">f</span>) </span>{
    <span class="hljs-keyword">return</span> (f - <span class="hljs-number">32</span>) * <span class="hljs-number">5</span> / <span class="hljs-number">9</span>;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">toFahrenheit</span>(<span class="hljs-params">c</span>) </span>{
    <span class="hljs-keyword">return</span> (c * <span class="hljs-number">9</span> / <span class="hljs-number">5</span>) + <span class="hljs-number">32</span>;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">tryConvert</span>(<span class="hljs-params">value, convert</span>) </span>{
    <span class="hljs-keyword">const</span> input = <span class="hljs-built_in">parseFloat</span>(value);
    <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Number</span>.isNaN(input)) {
        <span class="hljs-keyword">return</span> <span class="hljs-string">''</span>;
    }
    <span class="hljs-keyword">const</span> output = convert(input);
    <span class="hljs-keyword">const</span> rounded = <span class="hljs-built_in">Math</span>.round(output * <span class="hljs-number">1000</span>) / <span class="hljs-number">1000</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">String</span>(rounded);
}
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TemperatureInput</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.change = <span class="hljs-keyword">this</span>.change.bind(<span class="hljs-keyword">this</span>);
    }

    change(e) {
        <span class="hljs-keyword">this</span>.props.onChange(e.target.value);
    }

    render() {
        <span class="hljs-keyword">const</span> value = <span class="hljs-keyword">this</span>.props.value;
        <span class="hljs-keyword">const</span> scale = <span class="hljs-keyword">this</span>.props.scale;
        <span class="hljs-keyword">return</span> (
            &lt;fieldset&gt;
                &lt;legend&gt;请输入{scaleNames[scale]}温度&lt;/legend&gt;
                &lt;input value={value} onChange={this.change}/&gt;
            &lt;/fieldset&gt;
        );
    }
}

class Calculator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: '', scale: 'c'};
        this.CelsiusChange = this.CelsiusChange.bind(this);
        this.FahrenheitChange = this.FahrenheitChange.bind(this);
    }

    CelsiusChange(value) {
        this.setState({scale: 'c', value});
    }

    FahrenheitChange(value) {
        this.setState({scale: 'f', value});
    }

    render() {
        const scale = this.state.scale;
        const value = this.state.value;
        const celsius = scale === 'f' ? tryConvert(value, toCelsius) : value;
        const fahrenheit = scale === 'c' ? tryConvert(value, toFahrenheit) : value;

        return (
            &lt;div&gt;
                &lt;TemperatureInput scale="c" value={celsius} onChange={this.CelsiusChange}/&gt;
                &lt;TemperatureInput scale="f" value={fahrenheit} onChange={this.FahrenheitChange}/&gt;
                &lt;BoilingVerdict celsius={parseFloat(celsius)}/&gt;
            &lt;/div&gt;
        );
    }
}
ReactDOM.render(
    &lt;Calculator /&gt;,
    document.getElementById('root')
);</code></pre>
<p>现在，无论您编辑哪个输入框，<code>Calculator</code>中的<code>this.state.value</code>和<code>this.state.scale</code>都会更新。 其中一个输入框获取value为原样，所以任何用户输入都被保留，另一个输入值总是基于它重新计算。</p>
<h3 id="articleHeader3">经验教训</h3>
<p>对于在React应用程序中更改的任何数据，都应该有一个唯一的<code>“数据来源”</code>，也就是<code>state</code>。通常，首先将state添加到需要渲染的组件。如果其他组件也需要它，你可以将其提升到它们层级最近的共同父级组件中。而不是尝试在不同组件之间去同步状态，总归就一句话：<strong>你应该依赖于自上而下的数据流</strong>。</p>
<p>提升state会涉及编写比双向绑定方法更多的“样板”代码。但这样做有一个好处，就是开发者可以很快就找到错误。由于所有的state都<code>“保存”</code>在这些组件中并且只有该组件可以改变它，所以大大减少了错误的出现概率。此外，你可以实现任何自定义逻辑来拒绝或转换用户输入。</p>
<p>如果某些东西可以从prps或state派生，它都不应该再继续呆在state里。<br>例如，不是同时存储<code>celsiusValue</code>和<code>fahrenheitValue</code>，而是只存储最后一次编辑的<code>value</code>和<code>scale</code>。另一个输入的值总是可以从<code>render()</code>方法中计算出来。这允许我们清除或应用四舍五入到其他字段，而不会丢失用户输入。</p>
<p>当您在UI中看到错误时，可以使用<code>React Developer Tools</code>检查props，并向上逐个排查DOM树，直到找到负责更新<code>state</code>的组件。这使你可以轻松地跟踪错误来源。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React从入门到精通系列之(10)提升state

## 原文链接
[https://segmentfault.com/a/1190000007801439](https://segmentfault.com/a/1190000007801439)

