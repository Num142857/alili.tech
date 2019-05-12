---
title: 'React从入门到精通系列之(7)根据条件选择性渲染元素' 
date: 2019-01-30 2:30:22
hidden: true
slug: bat5xjedi96
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">根据条件选择性渲染元素</h2>
<p>在React中，您可以根据所需行为来创建并封装的不同组件。 然后，您可以根据某些条件来仅仅渲染其中的某一些。当然，这具体取决于当前应用程序的状态。</p>
<p>React中的分条件渲染与JavaScript中的分条件工作方式相同。 使用JavaScript运算符（如<code>if</code>或<code>条件运算符</code>）来创建一个表示当前状态的元素，让React匹配它们然后更新UI。</p>
<p>考虑这两个组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function UserGreeting(props) {
    return <h1>Welcome back!</h1>;
}

function GuestGreeting(props) {
    return <h1>Please sign up!</h1>;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">UserGreeting</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Welcome back!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">GuestGreeting</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Please sign up!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
}</code></pre>
<p>我们将创建一个<code>Greeting</code>组件，根据用户是否登录显示这些组件中的其中一个：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Greeting(props) {
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting />;
    }
    return <GuestGreeting />;
}

ReactDOM.render(
    // 可以尝试将isLoggedIn改为true
    <Greeting isLoggedIn={false} />,
    document.getElementById('root')
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Greeting</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">const</span> isLoggedIn = props.isLoggedIn;
    <span class="hljs-keyword">if</span> (isLoggedIn) {
        <span class="hljs-keyword">return</span> &lt;UserGreeting /&gt;;
    }
    return &lt;GuestGreeting /&gt;;
}

ReactDOM.render(
    // 可以尝试将isLoggedIn改为true
    &lt;Greeting isLoggedIn={false} /&gt;,
    document.getElementById('root')
)</code></pre>
<p>此示例根据<code>isLoggedIn prop</code>的值呈现不同的问候语。</p>
<p>当然还有另外一种情况，就是满足某个条件之后显示具体的内容，否则不显示，可以参考一下组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function DoSomething(props) {
    return <h1>hello everybody!</h1>;
}

function Amazing(props) {
    const isShow = props.isShow;
    if (isShow) {
        return <DoSomething />
    } else {
        // 返回null即可
        return null;
    }
}

ReactDOM.render(
    <Amazing isShow={true} />,
    document.getElementById('root')
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">DoSomething</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>hello everybody!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Amazing</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">const</span> isShow = props.isShow;
    <span class="hljs-keyword">if</span> (isShow) {
        <span class="hljs-keyword">return</span> &lt;DoSomething /&gt;
    } else {
        // 返回null即可
        return null;
    }
}

ReactDOM.render(
    &lt;Amazing isShow={true} /&gt;,
    document.getElementById('root')
)</code></pre>
<h3 id="articleHeader1">元素变量</h3>
<p>您可以使用变量来存储React元素。 这可以帮助您有条件地渲染组件的一部分，其余输出也不会更改。</p>
<p>考虑这两个代表注销和登录按钮的新组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function LoginButton(props) {
    return (
        <button onClick={props.onClick}>
            Login
        </button>
    );
}

function LogoutButton(props) {
    return (
        <button onClick={props.onClick}>
            Logout
        </button>
    );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">LoginButton</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{props.onClick}</span>&gt;</span>
            Login
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
    );
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">LogoutButton</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{props.onClick}</span>&gt;</span>
            Logout
        <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
    );
}</code></pre>
<p>在下面的示例中，我们将创建一个名为<code>LoginControl</code>的有状态组件。<br>它将根据其当前state呈现<code>&lt;LoginButton /&gt;</code>或<code>&lt;LogoutButton /&gt;</code>。 它还将呈现来自前面示例的<code>&lt;Greeting /&gt;</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isLogin: false};
        this.loginClick = this.loginClick.bind(this);
        this.logoutClick = this.logoutClick.bind(this);
    }
    
    loginClick() {
        this.setState({isLogin: true});
    }
    
    logoutClick() {
        this.setState({isLogin: false});
    }
    
    render() {
        const isLoggedIn = this.state.isLogin;
        let button = null;
        
        if (isLoggedIn) {
            button = <LogoutButton onClick={this.logoutClick} />;
        } else {
            button = <LoginButton onClick={this.loginClick} />;
        }
        
        return (
            <div>
                <Greeting isLoggedIn={isLoggedIn} />
                {button}
            </div>
        );
    }
}


ReactDOM.render(
    <LoginControl />,
    document.getElementById('root')
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">LoginControl</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {<span class="hljs-attr">isLogin</span>: <span class="hljs-literal">false</span>};
        <span class="hljs-keyword">this</span>.loginClick = <span class="hljs-keyword">this</span>.loginClick.bind(<span class="hljs-keyword">this</span>);
        <span class="hljs-keyword">this</span>.logoutClick = <span class="hljs-keyword">this</span>.logoutClick.bind(<span class="hljs-keyword">this</span>);
    }
    
    loginClick() {
        <span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">isLogin</span>: <span class="hljs-literal">true</span>});
    }
    
    logoutClick() {
        <span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">isLogin</span>: <span class="hljs-literal">false</span>});
    }
    
    render() {
        <span class="hljs-keyword">const</span> isLoggedIn = <span class="hljs-keyword">this</span>.state.isLogin;
        <span class="hljs-keyword">let</span> button = <span class="hljs-literal">null</span>;
        
        <span class="hljs-keyword">if</span> (isLoggedIn) {
            button = &lt;LogoutButton onClick={this.logoutClick} /&gt;;
        } else {
            button = &lt;LoginButton onClick={this.loginClick} /&gt;;
        }
        
        return (
            &lt;div&gt;
                &lt;Greeting isLoggedIn={isLoggedIn} /&gt;
                {button}
            &lt;/div&gt;
        );
    }
}


ReactDOM.render(
    &lt;LoginControl /&gt;,
    document.getElementById('root')
)</code></pre>
<p>虽然<code>声明变量</code>并使用<code>if</code>语句是一个有条件地渲染组件的好方法，但有时您可能需要使用较短的语法。 有几种方法来内联JSX中的条件，如下所述。</p>
<h3 id="articleHeader2">通过逻辑运算符『 &amp;&amp;』内联if判断</h3>
<p>您可以在JSX中嵌入任何表达式，将它们括在大括号中。 这包括JavaScript逻辑&amp;&amp;运算符。 它可以方便地有条件地包括一个元素：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';

function Mailbox(props) {
    const unreadMessages = props.unreadMessages;
    return (
        <div>
            <h1>Hello!</h1>
            {unreadMessages.length > 0 &amp;&amp;
            <h2>
                You have {unreadMessages.length} unread messages.
            </h2>
            }
        </div>
    );
}

const messages =['zhangyatao', 'Re: zhangyatao', 'Re:Re: zhangyatao'];
ReactDOM.render(
    <Mailbox unreadMessages={messages} />,
    document.getElementById('root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Mailbox</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">const</span> unreadMessages = props.unreadMessages;
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
            {unreadMessages.length &gt; 0 &amp;&amp;
            <span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>
                You have {unreadMessages.length} unread messages.
            <span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
            }
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
}

<span class="hljs-keyword">const</span> messages =[<span class="hljs-string">'zhangyatao'</span>, <span class="hljs-string">'Re: zhangyatao'</span>, <span class="hljs-string">'Re:Re: zhangyatao'</span>];
ReactDOM.render(
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Mailbox</span> <span class="hljs-attr">unreadMessages</span>=<span class="hljs-string">{messages}</span> /&gt;</span>,
    document.getElementById('root')
);</span></code></pre>
<p>它的工作原理如下：<br>因为在JavaScript中，<code>true &amp;&amp; expression</code>总是返回为<code>expression</code>，而<code>false &amp;&amp; expression</code>总是返回为<code>false</code>。</p>
<p>因此，如果条件为<code>true</code>，紧接在<code>&amp;&amp;</code>之后的元素将出现在输出中。 如果它为<code>false</code>，React将忽略并跳过它。</p>
<h3 id="articleHeader3">内联if-else进行条件判断操作</h3>
<p>根据条件进行内联元素判断的另一种方法是使用JavaScript三元运算符<code>判断 ? 真 : 假 </code>。<br>在下面的例子中，我们使用它来有条件地渲染一小块文本。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render() {
    const isLoggedIn = this.state.isLoggedIn;
    return (
        <div>
            The user is <b>{isLoggedIn ? '已登录' : '未登录'}</b>
        </div>
    );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">render() {
    <span class="hljs-keyword">const</span> isLoggedIn = <span class="hljs-keyword">this</span>.state.isLoggedIn;
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            The user is <span class="hljs-tag">&lt;<span class="hljs-name">b</span>&gt;</span>{isLoggedIn ? '已登录' : '未登录'}<span class="hljs-tag">&lt;/<span class="hljs-name">b</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
}</code></pre>
<p>它也可以用于较大的表达式，虽然不太明显发生了什么：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render() {
    const isLoggedIn = this.state.isLoggedIn;
    return (
        <div>
            {isLoggedIn ? (
                <LogoutButton onClick={this.logoutClick} />
            ) : (
                <LoginButton onClick={this.loginClick} />
            )}
        </div>
    );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">render() {
    <span class="hljs-keyword">const</span> isLoggedIn = <span class="hljs-keyword">this</span>.state.isLoggedIn;
    <span class="hljs-keyword">return</span> (
        &lt;div&gt;
            {isLoggedIn ? (
                &lt;LogoutButton onClick={this.logoutClick} /&gt;
            ) : (
                &lt;LoginButton onClick={this.loginClick} /&gt;
            )}
        &lt;/div&gt;
    );
}</code></pre>
<p>就像在JavaScript中一样，它取决于你和你的团队考虑更多的可读性，选择一个适当的风格。 还要记住，当条件变得太复杂时，可能是提取组件的好时机。</p>
<h3 id="articleHeader4">阻止组件渲染</h3>
<p>在极少数情况下，您可能希望由另一个组件呈现的情况下该组件仍然隐藏自身。 这样的话，返回null即可。<br>在下面的示例中，<code>&lt;WarningBanner /&gt;</code>根据称为<code>warn</code>的props的值来渲染。 如果prop的值为<code>false</code>，则组件不渲染到页面中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function WarningBanner(props) {
    if (!props.warn) {
        return null;
    }
    
    return (
        <div className=&quot;warning&quot;>
            warning!
        </div>
    );
}

class Page extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showWarning: true};
        this.toggleClick = this.toggleClick.bind(this);
    }
    
    toggleClick() {
        this.setState(prevState => ({
            showWarning: !prevState.showWarning
        }));
    }
    
    render() {
        return (
            <div>
                <WarningBanner warn={this.state.showWarning} />
                <button onClick={this.toggleClick}>
                   {this.state.showWarning ? 'Hide' : 'Show'}
                </button>
            </div>
        );
    }
}

ReactDOM.render(
    <Page />,
    document.getElementById('root')
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">WarningBanner</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">if</span> (!props.warn) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
    }
    
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"warning"</span>&gt;</span>
            warning!
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Page</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {<span class="hljs-attr">showWarning</span>: <span class="hljs-literal">true</span>};
        <span class="hljs-keyword">this</span>.toggleClick = <span class="hljs-keyword">this</span>.toggleClick.bind(<span class="hljs-keyword">this</span>);
    }
    
    toggleClick() {
        <span class="hljs-keyword">this</span>.setState(<span class="hljs-function"><span class="hljs-params">prevState</span> =&gt;</span> ({
            <span class="hljs-attr">showWarning</span>: !prevState.showWarning
        }));
    }
    
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">WarningBanner</span> <span class="hljs-attr">warn</span>=<span class="hljs-string">{this.state.showWarning}</span> /&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.toggleClick}</span>&gt;</span>
                   {this.state.showWarning ? 'Hide' : 'Show'}
                <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        );
    }
}

ReactDOM.render(
    <span class="hljs-tag">&lt;<span class="hljs-name">Page</span> /&gt;</span>,
    document.getElementById('root')
)</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React从入门到精通系列之(7)根据条件选择性渲染元素

## 原文链接
[https://segmentfault.com/a/1190000007797584](https://segmentfault.com/a/1190000007797584)

