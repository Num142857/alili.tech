---
title: 'React从入门到精通系列之(11)组合VS继承' 
date: 2019-01-30 2:30:22
hidden: true
slug: d24lhpxw676
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">十一、组合 VS 继承</h2>
<p>React具有强大的组合模式，我们建议使用组合而不是继承来重用组件之间的代码。</p>
<p>在本节中，我们将考虑一些新的React常常遇到的开发继承的问题，并展示如何使用组合来解决它们。</p>
<h3 id="articleHeader1">有容乃大</h3>
<p>一些组件提前不知道它们的子组件是什么的。 这对于像<code>Sidebar</code>或<code>Dialog</code>这样的代表通用<code>“框”</code>的组件是特别常见的。<br>我们建议这些组件使用特殊的<code>children属性</code>将子组件元素直接传递到他们中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function FancyBorder(props) {
    return (
        <div className={'FancyBorder FancyBorder-' + props.color}>
            {props.children}
        </div>
    );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">FancyBorder</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>'<span class="hljs-attr">FancyBorder</span> <span class="hljs-attr">FancyBorder-</span>' + <span class="hljs-attr">props.color</span>}&gt;</span>
            {props.children}
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
}</code></pre>
<p>这让其他组件通过嵌套JSX传递任意到他们的<code>children</code>中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function WelcomeDialog(props) {
    return (
        <FancyBorder color=&quot;blue&quot;>
            <h1 className=&quot;Dialog-title&quot;>
                Welcome
            </h1>
            <p className=&quot;Dialog-message&quot;>
                感谢参观鹏寰国际大厦
            </p>
        </FancyBorder>
    );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">WelcomeDialog</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">FancyBorder</span> <span class="hljs-attr">color</span>=<span class="hljs-string">"blue"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"Dialog-title"</span>&gt;</span>
                Welcome
            <span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"Dialog-message"</span>&gt;</span>
                感谢参观鹏寰国际大厦
            <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">FancyBorder</span>&gt;</span></span>
    );
}</code></pre>
<p>最终的html结构为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id=&quot;root&quot;>
    <div data-reactroot=&quot;&quot; class=&quot;FancyBorder FancyBorder-blue&quot;>
        <h1 class=&quot;Dialog-title&quot;>Welcome</h1>
        <p class=&quot;Dialog-message&quot;>感谢参观鹏寰国际大厦</p>
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"root"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">data-reactroot</span>=<span class="hljs-string">""</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"FancyBorder FancyBorder-blue"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"Dialog-title"</span>&gt;</span>Welcome<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"Dialog-message"</span>&gt;</span>感谢参观鹏寰国际大厦<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>任何在<code>&lt;FancyBorder&gt;</code>JSX标签内部的东西都会作为<code>children props</code>被传递到<code>FancyBorder</code>组件中。 由于<code>FancyBorder</code>在<code>&lt;div&gt;</code>中渲染<code>{props.children}</code>，所以所传递的元素将显示在这个<code>div</code>当中。</p>
<p>虽然这不常见，有时你可能需要在组件中有多个<code>“窟窿”</code>。 在这种情况下，你可以提出自己的规范，而不是使用<code>children</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';

function Contacts() {
    return <h1>tel:182012322**</h1>
}
function Chat() {
    return <span>chat content</span>
}

function SplitPanel(props) {
    return (
        <div className=&quot;SplitPane&quot;>
            <div className=&quot;SplitPane-left&quot;>
                {props.left}
            </div>
            <div className=&quot;SplitPane-right&quot;>
                {props.right}
            </div>
        </div>
    )
}

function App() {
    return (
        <SplitPanel left={<Contacts />} right={<Chat />}/>
    );
}
ReactDOM.render(
    <App />,
    document.getElementById('root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Contacts</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>tel:182012322**<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Chat</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>chat content<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span></span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">SplitPanel</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"SplitPane"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"SplitPane-left"</span>&gt;</span>
                {props.left}
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"SplitPane-right"</span>&gt;</span>
                {props.right}
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    )
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">App</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">SplitPanel</span> <span class="hljs-attr">left</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">Contacts</span> /&gt;</span>} right={<span class="hljs-tag">&lt;<span class="hljs-name">Chat</span> /&gt;</span>}/&gt;
    );
}
ReactDOM.render(
    <span class="hljs-tag">&lt;<span class="hljs-name">App</span> /&gt;</span>,
    document.getElementById('root')
);</span></code></pre>
<p>像<code>&lt;Contacts /&gt;</code>和<code>&lt;Chat /&gt;</code>等React元素只是一个对象，所以你可以像任何其他数据一样把它们当做props去传递。</p>
<h3 id="articleHeader2">用的专业一点</h3>
<p>有时我们认为某个组件是其他组件的<code>“special cases”</code>。 例如，我们可能会说<code>WelcomeDialog</code>是<code>Dialog</code>的一个<code>“special cases”</code>。</p>
<p>在React中，这也通过组合实现，其中更<code>“特殊”</code>的组件渲染更<code>“通用”</code>的组件并用props配置它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Dialog(props) {
    return (
        <FancyBorder color=&quot;blue&quot;>
            <h1 className=&quot;Dialog-title&quot;>
                {props.title}
            </h1>
            <p className=&quot;Dialog-message&quot;>
                {props.message}
            </p>
        </FancyBorder>
    );
}

function WelcomeDialog(props) {
    return (
        <Dialog title=&quot;Welcome&quot; message=&quot;欢迎参观鹏寰国际大厦&quot; />
    );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Dialog</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">FancyBorder</span> <span class="hljs-attr">color</span>=<span class="hljs-string">"blue"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"Dialog-title"</span>&gt;</span>
                {props.title}
            <span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"Dialog-message"</span>&gt;</span>
                {props.message}
            <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">FancyBorder</span>&gt;</span></span>
    );
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">WelcomeDialog</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Dialog</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"Welcome"</span> <span class="hljs-attr">message</span>=<span class="hljs-string">"欢迎参观鹏寰国际大厦"</span> /&gt;</span>
    );
}</span></code></pre>
<p>组合对于定义为类的组件同样有效：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';

function FancyBorder(props) {
    return (
        <div className={'FancyBorder FancyBorder-' + props.color}>
            {props.children}
        </div>
    );
}

function Dialog(props) {
    return (
        <FancyBorder color=&quot;blue&quot;>
            <h1 className=&quot;Dialog-title&quot;>
                {props.title}
            </h1>
            <p className=&quot;Dialog-message&quot;>
                {props.message}
            </p>
            {props.children}
        </FancyBorder>
    );
}

class SignUpDialog extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);
        this.state = {login: ''};
    }

    render() {
        return (
            <Dialog title=&quot;Mars Exploration Program&quot;
                    message=&quot;How should we refer to you?&quot;>
                <input value={this.state.login}
                       onChange={this.handleChange}/>
                <button onClick={this.handleSignUp}>
                    Sign Me Up!
                </button>
            </Dialog>
        );
    }

    handleChange(e) {
        this.setState({login: e.target.value});
    }

    handleSignUp() {
        alert(`Welcome aboard, ${this.state.login}!`);
    }
}

ReactDOM.render(
    <SignUpDialog />,
    document.getElementById('root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">FancyBorder</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">{</span>'<span class="hljs-attr">FancyBorder</span> <span class="hljs-attr">FancyBorder-</span>' + <span class="hljs-attr">props.color</span>}&gt;</span>
            {props.children}
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Dialog</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">FancyBorder</span> <span class="hljs-attr">color</span>=<span class="hljs-string">"blue"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"Dialog-title"</span>&gt;</span>
                {props.title}
            <span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"Dialog-message"</span>&gt;</span>
                {props.message}
            <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            {props.children}
        <span class="hljs-tag">&lt;/<span class="hljs-name">FancyBorder</span>&gt;</span></span>
    );
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SignUpDialog</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.handleChange = <span class="hljs-keyword">this</span>.handleChange.bind(<span class="hljs-keyword">this</span>);
        <span class="hljs-keyword">this</span>.handleSignUp = <span class="hljs-keyword">this</span>.handleSignUp.bind(<span class="hljs-keyword">this</span>);
        <span class="hljs-keyword">this</span>.state = {<span class="hljs-attr">login</span>: <span class="hljs-string">''</span>};
    }

    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Dialog</span> <span class="hljs-attr">title</span>=<span class="hljs-string">"Mars Exploration Program"</span>
                    <span class="hljs-attr">message</span>=<span class="hljs-string">"How should we refer to you?"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{this.state.login}</span>
                       <span class="hljs-attr">onChange</span>=<span class="hljs-string">{this.handleChange}/</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.handleSignUp}</span>&gt;</span>
                    Sign Me Up!
                <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">Dialog</span>&gt;</span>
        );
    }

    handleChange(e) {
        this.setState({login: e.target.value});
    }

    handleSignUp() {
        alert(`Welcome aboard, ${this.state.login}!`);
    }
}

ReactDOM.render(
    <span class="hljs-tag">&lt;<span class="hljs-name">SignUpDialog</span> /&gt;</span>,
    document.getElementById('root')
);</span></code></pre>
<h3 id="articleHeader3">关于继承</h3>
<p>在Facebook，使用了React在数千个组件，他们没有发现一个必须实现组件继承层次结构的用例。</p>
<p>props和组合给你所有的灵活性，你需要以一个明确和安全的方式自定义组件的外观和行为。 请记住，组件可以接受任意props，包括原始值，React元素或函数。</p>
<p>如果要在组件之间重用非UI功能，建议您将其提取到单独的JavaScript模块中。 组件可以导入它并使用该函数，对象或类，而不扩展它。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React从入门到精通系列之(11)组合VS继承

## 原文链接
[https://segmentfault.com/a/1190000007802061](https://segmentfault.com/a/1190000007802061)

