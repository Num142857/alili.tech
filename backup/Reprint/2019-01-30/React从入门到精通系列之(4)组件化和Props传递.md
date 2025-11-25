---
title: 'React从入门到精通系列之(4)组件化和Props传递' 
date: 2019-01-30 2:30:22
hidden: true
slug: 8sky6071g22
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">四、组件化和属性(props)</h2>
<p>组件允许您将UI拆分为独立的可重用的部分，并单独地考虑每个部分。<br>从概念上讲，组件就像JavaScript函数。 它们接受任意输入（称为“props”），并返回应该出现在屏幕上的React元素。</p>
<h3 id="articleHeader1">功能性组件(functional)和类组件(class component)</h3>
<p>定义组件的最简单的方法是编写JavaScript函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Welcome(props) {
    return <h1>hello, {props.name}</h1>
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Welcome</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>hello, {props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>
}</code></pre>
<p>此函数是个有效的React组件，因为它接收一个带有数据的“props”对象作为参数，并返回一个React元素。 我们把这样的组件称为“功能性组件(functional)”，因为它们是个JavaScript函数。</p>
<p>您还可以使用ES6类来定义组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Welcome extends React.Component {
    render() {
        return <h1>hello, {this.props.name}</h1>;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Welcome</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>hello, {this.props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
    }
}</code></pre>
<p>上述两个组件从React的角度来看是等效的。</p>
<p>类组件有一些额外的功能，我们将在下面的章节中讨论。 在那之前，我们将简单地使用功能组件。</p>
<h3 id="articleHeader2">渲染一个组件</h3>
<p>以前，我们只遇到使用DOM标签的React元素：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const element = <div />;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> element = <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> /&gt;</span>;</span></code></pre>
<p>但是，元素也可以表示用户自定义的组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const element = <Welcome name=&quot;zhangyatao&quot; />;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> element = <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Welcome</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"zhangyatao"</span> /&gt;</span>;</span></code></pre>
<p>当React看到表示用户定义组件的元素时，它将该JSX标签的所以属性放到一个对象中传递给组件。 我们称这个对象为“props”。</p>
<p>例如，此代码在页面上呈现“Hello，zhangyatao”：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Welcome(props) {
    return <h1>Hello, {props.name}</h1>;
}

const element = <Welcome name=&quot;zhangyatao&quot; />;
ReactDOM.render(
    element,
    document.getElementById('root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Welcome</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello, {props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
}

<span class="hljs-keyword">const</span> element = <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Welcome</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"zhangyatao"</span> /&gt;</span>;
ReactDOM.render(
    element,
    document.getElementById('root')
);</span></code></pre>
<p>让我们回顾一下在这个例子中发生了什么：</p>
<ol>
<li><p>首先调用<code>ReactDOM.render()</code>方法，并处理<code>&lt;Welcome name =“zhangyatao”/&gt;</code>组件。</p></li>
<li><p>React使用<code>{name：'zhangyatao'}</code>作为props调用<code>Welcome</code>组件。</p></li>
<li><p>我们的<code>Welcome</code>组件返回一个<code>&lt;h1&gt; Hello，zhangyatao &lt;/ h1&gt;</code>元素作为结果。</p></li>
<li><p>React DOM有效地根据<code>&lt;h1&gt; Hello，zhangyatao &lt;/ h1&gt;</code>来更新DOM。</p></li>
</ol>
<blockquote><p><strong>警告</strong><br>组件名称始终使用·首字母大写·。<br>例如，<code>&lt;div /&gt;</code>表示一个DOM标签，但<code>&lt;Welcome /&gt;</code>表示一个组件，并要求<code>Welcome</code>必须和ReactDOM在一个作用域内。</p></blockquote>
<h3 id="articleHeader3">编写组件</h3>
<p>组件可以在其返回值中引用去其他组件。 这允许我们对任何级别的细节使用相同的组件抽象。 一个按钮，一个表单，一个对话框，一个屏幕：在React应用程序中，所有这些通常表示为组件。<br>例如，我们可以创建一个App组件，让它渲染多个<code>Welcome</code>组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Welcome(props) {
   return <h1>Hello, {props.name}</h1>;
}

function App() {
   return (
       <div>
           <Welcome name=&quot;zhangyatao&quot; />
           <Welcome name=&quot;jiangyanyun&quot; />
           <Welcome name=&quot;pangyun&quot; />
       </div>
   );
}

ReactDOM.render(
   <App />,
   document.getElementById('root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Welcome</span>(<span class="hljs-params">props</span>) </span>{
   <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello, {props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">App</span>(<span class="hljs-params"></span>) </span>{
   <span class="hljs-keyword">return</span> (
       &lt;div&gt;
           &lt;Welcome name="zhangyatao" /&gt;
           &lt;Welcome name="jiangyanyun" /&gt;
           &lt;Welcome name="pangyun" /&gt;
       &lt;/div&gt;
   );
}

ReactDOM.render(
   &lt;App /&gt;,
   document.getElementById('root')
);</code></pre>
<p>这个新的React应用程序在顶部有一个单独的<code>App</code>组件。 <br>但是，如果您将React集成到现有应用程序中，则可以使用Button这样的小组件自下而上开始逐步向上到达视图层次结构的顶部。</p>
<blockquote><p><strong>警告</strong><br>引用多个组件时必须包裹在一个根元素中返回。 这就是为什么我们添加了一个<code>&lt;div&gt;</code>来包含所有<code>&lt;Welcome /&gt;</code>元素。</p></blockquote>
<h3 id="articleHeader4">抽离组件</h3>
<p>永远不要害怕将组件拆分成更小的组件。<br>例如，考虑这个<code>Comment</code>组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';

function formatDate(date) {
    return date.toISOString();
}

function Comment(props) {
    return (
        <div className=&quot;Comment&quot;>
            <div className=&quot;UserInfo&quot;>
                <img className=&quot;avatar&quot;
                     src={props.author.avatarUrl}
                     alt={props.author.name}
                />
                <div className=&quot;UserInfo-name&quot;>
                    {props.author.name}
                </div>
            </div>
            <div className=&quot;Comment-text&quot;>
                {props.text}
            </div>
            <div className=&quot;Comment-date&quot;>
                {formatDate(props.date)}
            </div>
        </div>
    );
}

ReactDOM.render(
    <Comment author="{{"
        avatarUrl: 'https://ss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/item/3ae1dc06.jpg',
        name: 'zhangyatao'
    "}}" text={'我的名字叫张亚涛'} date={new Date()}/>,
    document.getElementById('root')
);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">formatDate</span>(<span class="hljs-params">date</span>) </span>{
    <span class="hljs-keyword">return</span> date.toISOString();
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Comment</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">return</span> (
        &lt;div className="Comment"&gt;
            &lt;div className="UserInfo"&gt;
                &lt;img className="avatar"
                     src={props.author.avatarUrl}
                     alt={props.author.name}
                /&gt;
                &lt;div className="UserInfo-name"&gt;
                    {props.author.name}
                &lt;/div&gt;
            &lt;/div&gt;
            &lt;div className="Comment-text"&gt;
                {props.text}
            &lt;/div&gt;
            &lt;div className="Comment-date"&gt;
                {formatDate(props.date)}
            &lt;/div&gt;
        &lt;/div&gt;
    );
}

ReactDOM.render(
    &lt;Comment author="{{"
        avatarUrl: 'https://ss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/item/3ae1dc06.jpg',
        name: 'zhangyatao'
    "}}" text={'我的名字叫张亚涛'} date={new Date()}/&gt;,
    document.getElementById('root')
);
</code></pre>
<p>它接受<code>author</code>（作者），<code>text</code>（内容）和<code>date</code>（日期）作为props，用来描述社交媒体网站上的评论。<br>这个组件可能很难改变，因为所有的嵌套，它也很难重用其中的单个部分。 让我们从中提取几个组件。</p>
<p>首先，我们将提取<code>avatar</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Avatar(props) {
    return (
        <img className=&quot;Avatar&quot;
            src={props.user.avatarUrl}
            alt={props.user.name}
        />
    );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Avatar</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"Avatar"</span>
            <span class="hljs-attr">src</span>=<span class="hljs-string">{props.user.avatarUrl}</span>
            <span class="hljs-attr">alt</span>=<span class="hljs-string">{props.user.name}</span>
        /&gt;</span>
    );
}</span></code></pre>
<p><code>avatar</code>不需要知道它正在<code>Comment</code>中呈现。 这就是为什么我们给它的prop一个更通用的名称：<code>user</code>而不是<code>author</code>。<br>我们建议从组件自己的角度来命名props，而不是使用它的上下文。</p>
<p>我们现在可以对<code>Comment</code>组件做一点点简化：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Comment(props) {
    return (
        <div className=&quot;Comment&quot;>
            <div className=&quot;UserInfo&quot;>
                <Avatar user={props.author} />
                <div className=&quot;UserInfo-name&quot;>
                    {props.author.name}
                </div>
            </div>
            <div className=&quot;Comment-text&quot;>
                {props.text}
            </div>
            <div className=&quot;Comment-date&quot;>
                {formatDate(props.date)}
            </div>
        </div>
    );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Comment</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"Comment"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"UserInfo"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Avatar</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{props.author}</span> /&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"UserInfo-name"</span>&gt;</span>
                    {props.author.name}
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"Comment-text"</span>&gt;</span>
                {props.text}
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"Comment-date"</span>&gt;</span>
                {formatDate(props.date)}
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    );
}</span></code></pre>
<p>接下来，我们将提取一个<code>UserInfo</code>组件，该组件在用户名称旁边呈现一个<code>avatar</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function UserInfo(props) {
    return (
        <div className=&quot;UserInfo&quot;>
            <avatar uer={props.user} />
            <div className=&quot;UserInfo-name&quot;>
                {props.user.name}
            </div>
        </div>
    );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">UserInfo</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"UserInfo"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">avatar</span> <span class="hljs-attr">uer</span>=<span class="hljs-string">{props.user}</span> /&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"UserInfo-name"</span>&gt;</span>
                {props.user.name}
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    );
}</span></code></pre>
<p>这使我们可以进一步简化<code>Comment</code>组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Comment(props) {
    return (
       <div className=&quot;Comment&quot;>
           <UserInfo user={props.author} />
           <div className=&quot;Comment-text&quot;>
               {props.text}
           </div>
           <div className=&quot;Comment-date&quot;>
               {formatDate(props.date)}
           </div>
       </div>
    );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Comment</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">return</span> (
       <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"Comment"</span>&gt;</span>
           <span class="hljs-tag">&lt;<span class="hljs-name">UserInfo</span> <span class="hljs-attr">user</span>=<span class="hljs-string">{props.author}</span> /&gt;</span>
           <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"Comment-text"</span>&gt;</span>
               {props.text}
           <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
           <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"Comment-date"</span>&gt;</span>
               {formatDate(props.date)}
           <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
       <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    );
}</span></code></pre>
<p>最终的代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';

function formatDate(date) {
    return date.toISOString();
}
function Avatar(props) {
    return (
        <img className=&quot;Avatar&quot;
             src={props.user.avatarUrl}
             alt={props.user.name}
        />
    );
}
function UserInfo(props) {
    return (
        <div className=&quot;UserInfo&quot;>
            <Avatar user={props.user}/>
            <div className=&quot;UserInfo-name&quot;>
                {props.user.name}
            </div>
        </div>
    );
}
function Comment(props) {
    return (
        <div className=&quot;Comment&quot;>
            <UserInfo user={props.author}/>
            <div className=&quot;Comment-text&quot;>
                {props.text}
            </div>
            <div className=&quot;Comment-date&quot;>
                {formatDate(props.date)}
            </div>
        </div>
    );
}
ReactDOM.render(
    <Comment author="{{"
        avatarUrl: 'https://ss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/item/3ae1dc06.jpg',
        name: 'zhangyatao'
    "}}" text={'我的名字叫张亚涛'} date={new Date()}/>,
    document.getElementById('root')
);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">formatDate</span>(<span class="hljs-params">date</span>) </span>{
    <span class="hljs-keyword">return</span> date.toISOString();
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Avatar</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">return</span> (
        &lt;img className="Avatar"
             src={props.user.avatarUrl}
             alt={props.user.name}
        /&gt;
    );
}
function UserInfo(props) {
    return (
        &lt;div className="UserInfo"&gt;
            &lt;Avatar user={props.user}/&gt;
            &lt;div className="UserInfo-name"&gt;
                {props.user.name}
            &lt;/div&gt;
        &lt;/div&gt;
    );
}
function Comment(props) {
    return (
        &lt;div className="Comment"&gt;
            &lt;UserInfo user={props.author}/&gt;
            &lt;div className="Comment-text"&gt;
                {props.text}
            &lt;/div&gt;
            &lt;div className="Comment-date"&gt;
                {formatDate(props.date)}
            &lt;/div&gt;
        &lt;/div&gt;
    );
}
ReactDOM.render(
    &lt;Comment author="{{"
        avatarUrl: 'https://ss0.bdstatic.com/7Ls0a8Sm1A5BphGlnYG/sys/portrait/item/3ae1dc06.jpg',
        name: 'zhangyatao'
    "}}" text={'我的名字叫张亚涛'} date={new Date()}/&gt;,
    document.getElementById('root')
);
</code></pre>
<p>让一个个可重用组件在大型应用程序中交付使用的过程中，抽离组件起初可能看起来像又脏又累的活儿。 所以有一个好的经验法则：如果UI的一部分被使用了好几次（按钮，面板，头像），或者内部比较复杂的东西（App，FeedStory，评论），一个可重用的组件对它来说可以达到最大的发挥空间。</p>
<h3 id="articleHeader5">Props是只读的</h3>
<p>无论是将组件声明为功能组件还是类组件，它都不能修改自己的props。 考虑这个计算参数总和的函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function sum(a, b) {
    return a + b;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sum</span>(<span class="hljs-params">a, b</span>) </span>{
    <span class="hljs-keyword">return</span> a + b;
}</code></pre>
<p>这样的函数被称为<code>“纯函数”</code>，因为它们不会改变它们的参数值，并且对于相同的输入总是返回相同的结果。<br>相反，这个函数是不纯的，因为它改变自己的参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function withdraw(account, amount) {
    account.total -= amount;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">withdraw</span>(<span class="hljs-params">account, amount</span>) </span>{
    account.total -= amount;
}</code></pre>
<p>React非常灵活，但它有一个严格的规则：<br><strong>所有React组件必须像它们的porps的纯函数那样运行。</strong></p>
<p>当然，应用中的UI大部分是动态的，随时间变化。 在下一节中，我们将介绍一个“state”的新概念。 状态允许React组件响应用户操作，网络响应和其他任何内容，随时间更改其输出，而不违反此规则。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React从入门到精通系列之(4)组件化和Props传递

## 原文链接
[https://segmentfault.com/a/1190000007790620](https://segmentfault.com/a/1190000007790620)

