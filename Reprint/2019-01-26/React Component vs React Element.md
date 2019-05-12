---
title: 'React Component vs React Element' 
date: 2019-01-26 2:30:18
hidden: true
slug: 2ea4vucubu3
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">React Component vs React Element</h2>
<p>有这样的一个问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 方法定义
function add(x, y) {
    return x + y
}

// 方法调用
add(1, 2)

// 组件定义
class Icon extends Component {}

// 组件调用？？？？？？
<Icon />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 方法定义</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params">x, y</span>) </span>{
    <span class="hljs-keyword">return</span> x + y
}

<span class="hljs-comment">// 方法调用</span>
add(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>)

<span class="hljs-comment">// 组件定义</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Icon</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{}

<span class="hljs-comment">// 组件调用？？？？？？</span>
&lt;Icon /&gt;</code></pre>
<p>最后的一句<code>&lt;Icon /&gt;</code>用专业的词概括是什么操作，组件调用还是什么？</p>
<p>有答“组件声明”的，有答“组件调用的”，有“组件初始化”的，还有“使用一个组件”的。没有一个统一的称呼。造成这样局面的原因是很多时候我们都没有去详细的了解过JSX和React实际操作之间的抽象层。现在我们就深入研究一下这部分知识。</p>
<p>我们来看看最基础的问题，什么是React？React就是一个用来写界面的库。不管React和React的生态有多复杂，最核心的功能就是用来写界面的。那么我们来看看<code>Element</code>，很简单，但是一个<em>React element</em>描述的就是你想要在界面上看到的。再深入一点，一个<em>React element</em>就是一个代表了DOM节点的对象。注意，一个React element并不是在界面上实际绘制的东西，而是这些内容的代表。由于JavaScript对象是轻量级的，React可以任意的创建和销毁这些element对象，而且不用担心太大的消耗。另外，React可以分析这些对象，把当前的对象和之前的对象对比，找出发生的改变，然后根据实际发生的改变来更新实际的DOM。</p>
<p>为了创建一个DOM节点的代表对象（也就是React element），我们可以使用React的<code>createElement</code>方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const element = React.createElement(
    'div',
    {id: 'login-btn'},
    'Login'
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> element = React.createElement(
    <span class="hljs-string">'div'</span>,
    {<span class="hljs-attr">id</span>: <span class="hljs-string">'login-btn'</span>},
    <span class="hljs-string">'Login'</span>
)</code></pre>
<p><code>createElement</code>方法传入了三个参数。第一个是标签名称字符串（div、span等），第二个是给element设置的属性，第三个是内容或者是子的React element。本例中的“Login”就是element的内容。上面的<code>createElement</code>方法调用后会返回一个这样的对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    type: 'div’，
    props: {
        children: 'Login',
        id: 'login-btn'
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-attr">type</span>: <span class="hljs-string">'div’，
    props: {
        children: '</span>Login<span class="hljs-string">',
        id: '</span>login-btn<span class="hljs-string">'
    }
}</span></code></pre>
<p>当这个对象绘制为DOM（使用<code>ReactDOM.render</code>方法）的时候，我们就会有一个新的DOM节点：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div id='login-btn'>Login</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'login-btn'</span>&gt;</span>Login<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>有一个很有意思的地方，我们在学React的时候首先注意到的就是component（组件）。“Components（组件）是React的构建块”。注意，我们是以element开始本文的。而且你一旦理解了element，理解component也就是水到渠成的事了。一个component就是一个方法或者一个类，可以接受一定的输入，之后返回一个React element。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Button({onLogin}) {
    return React.createElement(
        'div',
        {id: 'login-btn', onClick: onLogin},
        'Login'
    )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Button</span>(<span class="hljs-params">{onLogin}</span>) </span>{
    <span class="hljs-keyword">return</span> React.createElement(
        <span class="hljs-string">'div'</span>,
        {<span class="hljs-attr">id</span>: <span class="hljs-string">'login-btn'</span>, <span class="hljs-attr">onClick</span>: onLogin},
        <span class="hljs-string">'Login'</span>
    )
}</code></pre>
<p>在上面的定义中，我们有一个<code>Button</code>组件（component）。接收一个<code>onLogin</code>输入并返回一个React element。注意，<code>Button</code>组件接收的<code>onLogin</code>方法是它的<code>prop</code>。然后把这个方法通过<code>createElement</code>方法的第二个参数传入到了实际的DOM里。</p>
<h3 id="articleHeader1">更深入一点</h3>
<p>目前，我们只接触到了使用HTML元素来创建React element，比如“div”、“span”等。其实，你也可以把其他的React component（组件）作为第一个参数传入<code>createElement</code>方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const element = React.createElement(
    User,
    {name: 'Uncle Charlie'},
    null
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> element = React.createElement(
    User,
    {<span class="hljs-attr">name</span>: <span class="hljs-string">'Uncle Charlie'</span>},
    <span class="hljs-literal">null</span>
)</code></pre>
<p>然而，不同于一般的HTML标签名称，React如果发现第一个参数是<em>class</em>或者<em>function</em>类型的话，它就会检查传入的参数要绘制的是一个什么element，传入必要的props。之后React会一直检查，直到没有方法或者类作为第一个参数传入<code>createElement</code>。我们来看看下面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Button({addFriend}) {
    return React.createElement(
        'button',
        {onClick: addFriend},
        'Add Friend'
    )
}

function User({name, addFriend}) {
    return React.createElement(
        'div',
        null,
        React.createElement(
            'p',
            null,
            name
        ),
        React.createElement(Button, {addFriend})
    )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Button</span>(<span class="hljs-params">{addFriend}</span>) </span>{
    <span class="hljs-keyword">return</span> React.createElement(
        <span class="hljs-string">'button'</span>,
        {<span class="hljs-attr">onClick</span>: addFriend},
        <span class="hljs-string">'Add Friend'</span>
    )
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">User</span>(<span class="hljs-params">{name, addFriend}</span>) </span>{
    <span class="hljs-keyword">return</span> React.createElement(
        <span class="hljs-string">'div'</span>,
        <span class="hljs-literal">null</span>,
        React.createElement(
            <span class="hljs-string">'p'</span>,
            <span class="hljs-literal">null</span>,
            name
        ),
        React.createElement(Button, {addFriend})
    )
}</code></pre>
<p>上面的例子里有两个component（组件）。一个Button，一个User。User“代表”了一个<em>div</em>，div里面有两个子节点：一个包含用户名的“p”和一个<em>Button</em>组件。现在我们看看上面的例子的具体的调用过程。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Button({addFriend}) {
    return {
        type: 'button',
        props: {
            onClick: addFriend,
            children: 'Add Friend'
        }
    }
}

function User({name, addFreind}) {
    return {
        type: 'div',
        props: {
            children: [
                {
                    type: 'p',
                    props: {
                        children: name
                    }
                },
                {
                    type: Button,
                    props: {
                        addFriend
                    }
                }
            ]
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Button</span>(<span class="hljs-params">{addFriend}</span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">type</span>: <span class="hljs-string">'button'</span>,
        <span class="hljs-attr">props</span>: {
            <span class="hljs-attr">onClick</span>: addFriend,
            <span class="hljs-attr">children</span>: <span class="hljs-string">'Add Friend'</span>
        }
    }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">User</span>(<span class="hljs-params">{name, addFreind}</span>) </span>{
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">type</span>: <span class="hljs-string">'div'</span>,
        <span class="hljs-attr">props</span>: {
            <span class="hljs-attr">children</span>: [
                {
                    <span class="hljs-attr">type</span>: <span class="hljs-string">'p'</span>,
                    <span class="hljs-attr">props</span>: {
                        <span class="hljs-attr">children</span>: name
                    }
                },
                {
                    <span class="hljs-attr">type</span>: Button,
                    <span class="hljs-attr">props</span>: {
                        addFriend
                    }
                }
            ]
        }
    }
}</code></pre>
<p>在上面的代码里你会看到四种不同的属性：“button”，“div”，“p”和<code>Button</code>。当React看到一个element是function和类类型的话，它就会检查element会返回什么element，并传入对应的props。在这个过程结束之后，React就拥有了一个代表DOM树的对象的数。上面的例子最后的结构是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  type: 'div',
  props: {
    children: [
      {
        type: 'p',
        props: {
          children: 'Tyler McGinnis'
        }
      },
      {
        type: 'button',
        props: {
          onClick: addFriend,
          children: 'Add Friend'
        }
      }
    ]
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-attr">type</span>: <span class="hljs-string">'div'</span>,
  <span class="hljs-attr">props</span>: {
    <span class="hljs-attr">children</span>: [
      {
        <span class="hljs-attr">type</span>: <span class="hljs-string">'p'</span>,
        <span class="hljs-attr">props</span>: {
          <span class="hljs-attr">children</span>: <span class="hljs-string">'Tyler McGinnis'</span>
        }
      },
      {
        <span class="hljs-attr">type</span>: <span class="hljs-string">'button'</span>,
        <span class="hljs-attr">props</span>: {
          <span class="hljs-attr">onClick</span>: addFriend,
          <span class="hljs-attr">children</span>: <span class="hljs-string">'Add Friend'</span>
        }
      }
    ]
  }
}</code></pre>
<p>上面叙述的整个过程叫做<strong>Reconciliation</strong>（这个不知道怎么翻译，应该叫和谐？）。在React里，每次调用<code>setState</code>方法或<code>ReactDOM.render</code>方法被调用的时候都会触发这个过程。</p>
<p>那么我们来看看最开始的问题：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 方法定义
function add(x, y) {
    return x + y
}

// 方法调用
add(1, 2)

// 组件定义
class Icon extends Component {}

// 组件调用？？？？？？
<Icon />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 方法定义</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">add</span>(<span class="hljs-params">x, y</span>) </span>{
    <span class="hljs-keyword">return</span> x + y
}

<span class="hljs-comment">// 方法调用</span>
add(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>)

<span class="hljs-comment">// 组件定义</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Icon</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{}

<span class="hljs-comment">// 组件调用？？？？？？</span>
&lt;Icon /&gt;</code></pre>
<p>现在我们已经有了回答这个问题的全部知识，除了一点点以外。有个地方，你可能觉得奇怪在使用React的时候，从来没有用过<code>createElement</code>方法来创建element。你是用了JSX。我（作者）最开始的时候说：“主要原因是从来没有去详细的了解过JSX和React实际操作之间的抽象层”。这个抽象层就是JSX会被Babel转码为<code>React.createElement</code>方法的调用。</p>
<p>看看我们前面的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Button({addFriend}) {
    return React.createElement(
        'button',
        {onClick: addFriend},
        'Add Friend'
    )
}

function User({ name, addFriend }) {
  return React.createElement(
    &quot;div&quot;,
    null,
    React.createElement(
      &quot;p&quot;,
      null,
      name
    ),
    React.createElement(Button, { addFriend })
  )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Button</span>(<span class="hljs-params">{addFriend}</span>) </span>{
    <span class="hljs-keyword">return</span> React.createElement(
        <span class="hljs-string">'button'</span>,
        {<span class="hljs-attr">onClick</span>: addFriend},
        <span class="hljs-string">'Add Friend'</span>
    )
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">User</span>(<span class="hljs-params">{ name, addFriend }</span>) </span>{
  <span class="hljs-keyword">return</span> React.createElement(
    <span class="hljs-string">"div"</span>,
    <span class="hljs-literal">null</span>,
    React.createElement(
      <span class="hljs-string">"p"</span>,
      <span class="hljs-literal">null</span>,
      name
    ),
    React.createElement(Button, { addFriend })
  )
}</code></pre>
<p>写成JSX的样子是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
function Button({addFriend}) {
    return (
        <button onClick={addFriend}>Add Friend</button>
    )
}

function User({name, addFriend}) {
    return (
        <div>
            <p>{name}</p>
            <Button addFriend={addFriend} />
        </div>
    )
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Button</span>(<span class="hljs-params">{addFriend}</span>) </span>{
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{addFriend}</span>&gt;</span>Add Friend<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
    )
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">User</span>(<span class="hljs-params">{name, addFriend}</span>) </span>{
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{name}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">addFriend</span>=<span class="hljs-string">{addFriend}</span> /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    )
}</span></code></pre>
<p>所以，最后我们应该怎么回答前面的问题呢？<code>&lt;Icon /&gt;</code>叫做什么？</p>
<p>应该叫做“创建element”，应为JSX最后会转码为<code>createElement</code>方法的调用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.createElement(Icon, null)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">React.createElement(Icon, <span class="hljs-literal">null</span>)</code></pre>
<p>前面的例子都是“创建一个React element”。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.createElement(
  'div',
  { className: 'container' },
  'Hello!'
)

<div className='container'>Hello!</div>

<Hello />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">React.createElement(
  <span class="hljs-string">'div'</span>,
  { <span class="hljs-attr">className</span>: <span class="hljs-string">'container'</span> },
  <span class="hljs-string">'Hello!'</span>
)

&lt;div className=<span class="hljs-string">'container'</span>&gt;Hello!<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

&lt;Hello /&gt;</code></pre>
<p>原文地址：<a href="https://tylermcginnis.com/react-elements-vs-react-components/" rel="nofollow noreferrer" target="_blank">https://tylermcginnis.com/rea...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React Component vs React Element

## 原文链接
[https://segmentfault.com/a/1190000008447693](https://segmentfault.com/a/1190000008447693)

