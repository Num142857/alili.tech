---
title: '玩转 React（四）- 创造一个新的 HTML 标签' 
date: 2018-12-29 2:30:10
hidden: true
slug: obeb5xgyybd
categories: [reprint]
---

{{< raw >}}

                    
<p>在第二篇文章 <a href="https://segmentfault.com/a/1190000011340537">《新型前端开发方式》</a> 中有说到 React 有很爽的一点就是给我们一种创造 HTML 标签的能力，那么今天这篇文章就详细讲解下 React 是如何提供这种能力的，作为前端开发者如何来运用这种能力。</p>
<p>在第三篇文章 <a href="https://segmentfault.com/a/1190000011403495" target="_blank">《JavaScript代码里写HTML一样可以很优雅》</a> 中介绍了 JavaScript 的扩展语法 JSX，相信大家已经知道了，<strong>所谓的创造新的 HTML 的能力，其实就是以极其类似 HTML 的 JSX 语法来使用基于 React 编写的视图层组件</strong>。所以说，要完成今天的任务，我们只需要搞清楚一个问题即可：如何基于 React 编写视图层组件。</p>
<h2 id="articleHeader0">内容摘要</h2>
<ul>
<li>定义组件两种方式：类继承组件、函数式组件。</li>
<li>类继承组件有更丰富的特性，函数式组件书写更简洁，执行效率更高。</li>
<li>组件名称首字母要大写。</li>
<li>属性是一个组件的外部输入。</li>
<li>属性值可以通过 <code>{}</code> 设置任意的 JS 表达式。</li>
<li>属性是只读的。</li>
<li>属性可以设置默认值。</li>
<li>属性可以设置类型，开发阶段 React 会对属性进行类型检查。</li>
<li>为组件所有属性设置类型检查是个好习惯，有助于协作开发。</li>
</ul>
<p>通过内容摘要可以让你快速了解本文内容是否对你有用，从而决定是否继续阅读，节省你的时间也是一件很有意义的事情。</p>
<h2 id="articleHeader1">定义组件的几种姿势</h2>
<p>下面介绍一下在 React 中定义组件的几种方式。</p>
<h3 id="articleHeader2">1. 类继承</h3>
<p>有过 Java 等面向对象开发经验的同学一定很容易接受这种方式。ES6 为 JavaScript 增加了类和类继承的特性。子类会继承父类的“基因”（成员方法、属性），如果父类是一个组件，那子类自然而然也是一个组件。</p>
<p>React 提供了 <code>Component</code> 和 <code>PureComponent</code> 两个父类，他们之间有一点点区别，我们在之后的文章中会详细介绍，现在你可以将他们同等看待，暂且无须理会。</p>
<p>通过继承自 React 提供的组件基类，我们可以这样来创建一个组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, {Component} from 'react';

class HelloMessage extends Component {
    render() {
        return <div>Hello world.</div>;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React, {Component} <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HelloMessage</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello world.<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
    }
}</code></pre>
<p>通过类继承的方式创建一个组件，就是这么简单，只要继承 <code>Component</code> 基类并实现 <code>render</code> 方法即可。然后就可以把 <code>HelloMessage</code> 当成一个新的“HTML 标签”来用了，如下你可以把它渲染到页面上：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ReactDOM.render(<HelloMessage />, document.querySelector('#root'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code style="word-break: break-word; white-space: initial;">ReactDOM.render(&lt;HelloMessage /&gt;, <span class="hljs-built_in">document</span>.<span class="hljs-built_in">querySelector</span>(<span class="hljs-string">'#root'</span>));</code></pre>
<p>你也可以用它来装配其它组件，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, {Component} from 'react';

class HelloMessageList extends React.Component {
    render() {
        return (
            <div>
                <HelloMessage />
                <HelloMessage />
                <HelloMessage />
            </div>
        )
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React, {Component} <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HelloMessageList</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">HelloMessage</span> /&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">HelloMessage</span> /&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">HelloMessage</span> /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }
}</code></pre>
<p>当然，例子没有任何实际意义，只是为了演示组件的定义及其用法。</p>
<p>演示代码：<a href="https://codepen.io/Sarike/pen/KXRZaO" rel="nofollow noreferrer" target="_blank">https://codepen.io/Sarike/pen...</a><button class="btn btn-xs btn-default ml10 preview" data-url="Sarike/pen/KXRZaO" data-typeid="3">点击预览</button></p>
<h3 id="articleHeader3">2. 函数式组件</h3>
<p>顾名思义，函数式组件，就是以函数的形式来定义一个组件，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';

function HelloMessage() {
    return <div>Hello world.</div>;
}

// 或者：

const HelloMessage = () => <div>Hello world.</div>;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">HelloMessage</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello world.<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">// 或者：</span>

<span class="hljs-keyword">const</span> HelloMessage = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> &lt;div&gt;Hello world.&lt;<span class="hljs-regexp">/div&gt;;</span></code></pre>
<p>实际上就是只实现了类继承方式中的 <code>render</code> 方法。</p>
<p>示例代码：<a href="https://codepen.io/Sarike/pen/VMxyzy" rel="nofollow noreferrer" target="_blank">https://codepen.io/Sarike/pen...</a><button class="btn btn-xs btn-default ml10 preview" data-url="Sarike/pen/VMxyzy" data-typeid="3">点击预览</button></p>
<h2 id="articleHeader4">类继承 vs 函数式组件</h2>
<p>这两种定义组件的方式，在实际的开发中都经常会被用到，对大部分人来说类继承的方式用得频率会更高一些。</p>
<p>类继承的方式，相较于函数式组件，虽然写起来略繁琐，但是它拥有更多的特性：</p>
<ul>
<li>内部状态：<code>state</code>
</li>
<li>生命周期函数</li>
</ul>
<p>函数式组件虽然没有 state 和生命周期函数等特性，但是它有更简洁的书写方式，另外还有更好的性能，不用处理一些复杂的特性，执行效率当然高了。</p>
<p>现在你可以无需关心 <code>state</code> 和生命周期函数的具体作用，下一篇文章我会详细讲解，等你看完下一篇文章之后，至于选择哪种方式的问题就很好解决了。在开发一个组件的时候，我是这样来做的：当我一开始就知道这个组件会用到 <code>state</code> 或者生命周期函数时，毫无疑问直接使用类继承的方式；如果一开始用不到这些特性也不确定未来会不会用到，那我就先用函数式组件，如果随着业务的演进，组件需要应用这些特性的时候，我会再把它重构成类继承的方式。这个重构非常简单，只需要将原来的函数变成组件类的 <code>render</code> 方法即可。</p>
<p>另外，还有一点需要注意，不管那种方式，<strong>组件的名称首字母必须为大写</strong>。严格来说，是 JSX 要求用户自定义的组件名首字母必须为大写，如果是小写字母开头，那么 React 会将其当成内置的组件直接将其渲染成一个 html 标签，从而不会正确渲染用户自定义的组件。</p>
<p>如果你非要将组件名称以小写字母开头，那你在以 JSX 语法使用之前也必须将其赋值为一个大写字母开头的变量，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function helloMessage() {
    return <div>Hello world.</div>
}

const HelloMessage = helloMessage;

ReactDOM.render(<HelloMessage />, mountNode);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">helloMessage</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello world.<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
}

<span class="hljs-keyword">const</span> HelloMessage = helloMessage;

ReactDOM.render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">HelloMessage</span> /&gt;</span>, mountNode);</span></code></pre>
<p>但这有事何必呢，纯粹是没事儿找事儿，大家在实际项目开发时，直接将组件名以大写字母开头即可。</p>
<h2 id="articleHeader5">属性</h2>
<p>上面说完了在 React 中两种定义组件的方式。在上面的例子中，我们定义的组件都是静态的，然而在实际的开发中，视图层组件往往会进行频繁更新，或者需要从后端 API 获取动态数据在组件中展示。这就需要组件拥有接收外部输入的能力。</p>
<h3 id="articleHeader6">属性是组件的输入</h3>
<p>在第二篇文章 <a href="https://segmentfault.com/a/1190000011340537">《新型前端开发方式》</a> 中有说到 “视图是数据的映射”，那么其中说的数据指的就是属性。</p>
<p>如果把组件理解为一个函数，那么属性就是这个函数的参数，函数的返回值就是呈现到页面上的视图。而且通过上面部分的学习，在 React 中组件确实可以以函数的形式来定义，而且函数的参数就是一个包含当前组件接收到的所有属性的对象。</p>
<p>如下所示带有属性 <code>name</code> 的组件定义：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, {Component} from 'react';

class HelloMessage extends Component {
    render() {
        return <div>Hello {this.props.name}.</div>;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React, {Component} <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HelloMessage</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello {this.props.name}.<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
    }
}</code></pre>
<p>函数式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';

function HelloMessage(props) {
    return <div>Hello {props.name}.</div>;
}

// 或者：

const HelloMessage = props => <div>Hello {props.name}.</div>;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">HelloMessage</span>(<span class="hljs-params">props</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello {props.name}.<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">// 或者：</span>

<span class="hljs-keyword">const</span> HelloMessage = <span class="hljs-function"><span class="hljs-params">props</span> =&gt;</span> &lt;div&gt;Hello {props.name}.&lt;<span class="hljs-regexp">/div&gt;;</span></code></pre>
<p>属性的传递也跟 HTML 一样（在本文的最后一部分会有各种类型属性的详细介绍），如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, {Component} from 'react';
import ReactDOM from 'react-dom';

class HelloMessageList extends Component {
    render() {
        return (
            <div>
                <HelloMessage name=&quot;Lucy&quot; />
                <HelloMessage name=&quot;Tom&quot; />
                <HelloMessage name=&quot;Jack&quot; />
            </div>
        )
    }
}

ReactDOM.render(<HelloMessageList />, document.querySelector('#root'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React, {Component} <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HelloMessageList</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> (
            &lt;div&gt;
                &lt;HelloMessage name="Lucy" /&gt;
                &lt;HelloMessage name="Tom" /&gt;
                &lt;HelloMessage name="Jack" /&gt;
            &lt;/div&gt;
        )
    }
}

ReactDOM.render(&lt;HelloMessageList /&gt;, document.querySelector('#root'));</code></pre>
<p>这样页面上会展示出：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Hello Lucy.
Hello Tom.
Hello Jack." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erlang"><code>Hello Lucy.
Hello Tom.
Hello Jack.</code></pre>
<p>示例代码：<a href="https://codepen.io/Sarike/pen/VMxyrQ" rel="nofollow noreferrer" target="_blank">https://codepen.io/Sarike/pen...</a><button class="btn btn-xs btn-default ml10 preview" data-url="Sarike/pen/VMxyrQ" data-typeid="3">点击预览</button></p>
<h3 id="articleHeader7">属性必须为只读的</h3>
<p><strong>属性必须为只读的</strong>，这一点非常重要，请严格遵守。对应到上面说到的，如果把组件理解为一个函数，那么这个函数必须为一个纯函数（Pure function），在纯函数中不能修改其参数，确定的输入必须有确定的输出。</p>
<p>虽然有些时候，你修改了组件的属性，貌似也能正常工作。没错，因为 JavaScript 语言特性的原因，没人能阻止你这么做。但是请先相信我，严格遵守这条规则不仅能让你少踩很多坑，而且能让你的应用稳定性更强、维护性更强。如果你直接修改组件的属性，React 并不会感知到此修改，从而不会重新渲染组件，就导致了当前组件的视图展示与数据不一致，但这个被修改的属性会随着下一次组件的渲染被生效到视图上，而且这次渲染的时机是不确定的，不难想象，如果一个规模较大的项目里充满了这种不确定性是多么痛苦的一件事情。总之，如果你随意修改组件的属性，会很容易让你的应用充满许多难以排查的 BUG。</p>
<h3 id="articleHeader8">默认属性</h3>
<p>通常情况下，我们需要为组件的属性设为默认值。就像 HTML 标签的属性也有默认值一样，例如 form 标签的 method 属性默认值是 GET，input 标签的 type 属性默认值是 text 一样。</p>
<p>还是上面 <code>HelloMessage</code> 组件，如果需求是当不传入 name 属性时，默认展示 <code>Hello World.</code>，也就是说 name 属性的默认值是 World。</p>
<p>一种很容易想到的做法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>Hello {this.props.name || 'World'}.</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">&lt;div&gt;Hello {<span class="hljs-keyword">this</span>.props.name || <span class="hljs-string">'World'</span>}.&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<p>这样确实可以解决当前这个需求，但是属性可能还会是个 Object，也可能是个函数，你当然可以先判断下这个属性是否为 <code>undefined</code> 然后决定是否使用默认值，但是这样会让代码显得很不优雅，而且也会增加很多繁琐的判断逻辑。</p>
<p>因此，React 提供了相应的机制可以设置组件属性的默认值，如下所示，你需要通过组件的静态字段 <code>defaultProps</code> 来设置组件属性的默认值。如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, {Component} from 'react';

class HelloMessage extends Component {
    render() {
        return <div>Hello {this.props.name}.</div>;
    }
}
HelloMessage.defaultProps = {
    name: 'World'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React, {Component} <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HelloMessage</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello {this.props.name}.<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
    }
}
HelloMessage.defaultProps = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'World'</span>
}</code></pre>
<p>这样就可以了，<code>&lt;HelloMessage /&gt;</code> 这样不为组件设置任何属性，那么它就会在页面上展示<code>Hello World.</code>。</p>
<p>示例代码：<a href="https://codepen.io/Sarike/pen/VMxyZb" rel="nofollow noreferrer" target="_blank">https://codepen.io/Sarike/pen...</a><button class="btn btn-xs btn-default ml10 preview" data-url="Sarike/pen/VMxyZb" data-typeid="3">点击预览</button></p>
<h3 id="articleHeader9">属性的类型及校验</h3>
<p>在开发较复杂的前端应用时，我们经常会遇到许多因为类型检查导致的问题，例如上面的 <code>HelloMessage</code> 组件，我期望其 <code>name</code> 属性只能是字符串类型的，你要是给我一个 Object，我是没法正确展示的。为了在开发过程中尽快的发现这类问题，React 为组件添加了类型检查的机制，你需要给组件设置静态字段 <code>propTypes</code> 来设置组件各个属性的类型检查器。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, {Component} from 'react';
import PropTypes from 'prop-types';

class HelloMessage extends Component {
    render() {
        return <div>Hello {this.props.name}.</div>;
    }
}
HelloMessage.defaultProps = {
    name: 'World'
}
HelloMessage.propTypes = {
    name: PropTypes.string
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React, {Component} <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> PropTypes <span class="hljs-keyword">from</span> <span class="hljs-string">'prop-types'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HelloMessage</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello {this.props.name}.<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
    }
}
HelloMessage.defaultProps = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">'World'</span>
}
HelloMessage.propTypes = {
    <span class="hljs-attr">name</span>: PropTypes.string
}</code></pre>
<p>这样在开发过程中 React 就能校验组件接收到的属性值是否符合指定的类型，如果校验不通过，将会抛出警告。React 只会在开发模式下进行属性类型检查，当代码进行生产发布后，为了减少额外的性能开销，类型检查将会被略过。</p>
<p>其实，为每一个组件编写完善的属性类型是一个非常好的习惯，这不仅能及时发现问题，更重要的是配合几句简单额注释，这将成为该组件一份非常好的文档，一个完善的组件应该具有良好的封装性和易复用性，在一个协作开发的项目中，其他开发者需要引用你开发的组件时，只需要看一下组件的属性列表，大致就可以了解如何来使用这个组件，省去了很多不必要的沟通。</p>
<p>下面是 React 提供的可用的数据类型检查器。</p>
<ul>
<li><code>PropTypes.array</code></li>
<li><code>PropTypes.bool</code></li>
<li><code>PropTypes.func</code></li>
<li><code>PropTypes.number</code></li>
<li><code>PropTypes.object</code></li>
<li><code>PropTypes.string</code></li>
<li><code>PropTypes.symbol</code></li>
<li>
<code>PropTypes.element</code> 元素，其实就是 JSX 表达式，上一篇文章有说过 JSX 是 <code>React.createElement</code> 的语法糖，一个 JSX 表达式实际上会生成一个 JS 对象，在 React 中称之为元素（Element）。</li>
<li>
<code>PropTypes.node</code> 所有可以被渲染的数据类型，包括：数值, 字符串, 元素或者这些类型的数组。</li>
<li>
<code>PropTypes.instanceOf(Message)</code> 某个类的实例</li>
<li>
<code>PropTypes.oneOf(['News', 'Photos'])</code> 枚举，属性值必须为其中的某一个值。</li>
<li>
<code>PropTypes.oneOfType([PropTypes.string, PropTypes.number])</code> 类型枚举，属性必须为其中某一个类型。</li>
<li>
<code>PropTypes.arrayOf(PropTypes.number)</code> 属性为一个数组，且数组中的元素必须符合指定类型。</li>
<li>
<code>PropTypes.objectOf(PropTypes.number)</code> 属性为一个对象，且对象中的各个字段的值必须符合指定类型。</li>
<li>
<code>PropTypes.any</code> 任何类型</li>
</ul>
<p>如果你想指定某些属性为<code>必需属性</code>，你可以链式调动其 <code>isRequired</code> 来标识某个属性对于当前组件来说是必需的。如果在使用组件时未指定则会抛出警告提醒。</p>
<p>另外你还可以通过一个函数自定义属性验证器，如果验证不通过你需要返回一个 Error 实例，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function(props, propName, componentName) {
  if (!/matchme/.test(props[propName])) {
    return new Error(
      'Invalid prop `' + propName + '` supplied to' +
      ' `' + componentName + '`. Validation failed.'
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">props, propName, componentName</span>) </span>{
  <span class="hljs-keyword">if</span> (!<span class="hljs-regexp">/matchme/</span>.test(props[propName])) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Error</span>(
      <span class="hljs-string">'Invalid prop `'</span> + propName + <span class="hljs-string">'` supplied to'</span> +
      <span class="hljs-string">' `'</span> + componentName + <span class="hljs-string">'`. Validation failed.'</span>
    );
  }
}</code></pre>
<h3 id="articleHeader10">设置组件的属性值</h3>
<p>上面咱们了解到组件的属性有很多种类型，下面说一下各种类型的属性是如何传递给组件的。其实很简单，属性的值可以用一对大括号 <code>{ }</code> 来包围，其中可以指定任意的 JavaScript 表达式。如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="return (
    <User
        name=&quot;Tom&quot;                            // 字符串
        age={18}                              // 数值
        isActivated={true}                    // 布尔值
        interests={['basketball', 'music']}   // 数组
        address="{{" city: 'Beijing', road: 'BeiWuHuan' "}}" // 对象
    />
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-keyword">return</span> (
    &lt;User
        name=<span class="hljs-string">"Tom"</span>                            <span class="hljs-comment">// 字符串</span>
        age={<span class="hljs-number">18</span>}                              <span class="hljs-comment">// 数值</span>
        isActivated={<span class="hljs-literal">true</span>}                    <span class="hljs-comment">// 布尔值</span>
        interests={[<span class="hljs-string">'basketball'</span>, <span class="hljs-string">'music'</span>]}   <span class="hljs-comment">// 数组</span>
        address="{{" <span class="hljs-string">city:</span> <span class="hljs-string">'Beijing'</span>, <span class="hljs-string">road:</span> <span class="hljs-string">'BeiWuHuan'</span> "}}" <span class="hljs-comment">// 对象</span>
    /&gt;
)</code></pre>
<h4>展开操作符</h4>
<p>你也可以用展开操作符 <code>...</code> 将一个对象的所有字段展开，依次作为属性传递给组件，上面的代码等价于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const userInfo = {
    name: 'Tom',
    age: 18,
    isActivated: true,
    interests: ['basketball', 'music'],
    address: { city: 'Beijing', road: 'BeiWuHuan' }
}
return <User {...userInfo} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>const userInfo = {
<span class="hljs-symbol">    name:</span> <span class="hljs-string">'Tom'</span>,
<span class="hljs-symbol">    age:</span> <span class="hljs-number">18</span>,
<span class="hljs-symbol">    isActivated:</span> <span class="hljs-literal">true</span>,
<span class="hljs-symbol">    interests:</span> [<span class="hljs-string">'basketball'</span>, <span class="hljs-string">'music'</span>],
<span class="hljs-symbol">    address:</span> { <span class="hljs-string">city:</span> <span class="hljs-string">'Beijing'</span>, <span class="hljs-string">road:</span> <span class="hljs-string">'BeiWuHuan'</span> }
}
<span class="hljs-keyword">return</span> &lt;User {...userInfo} /&gt;</code></pre>
<h4>值为 <code>true</code> 的属性的简写</h4>
<p>如果是属性类型为布尔值，且当前属性值为 <code>true</code> 可以只写属性名，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input
    disabled     // 禁用该输入框
    type=&quot;text&quot;
/>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code>&lt;input
    disabled     <span class="hljs-comment">// 禁用该输入框</span>
    <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span>
/&gt;</code></pre>
<h3 id="articleHeader11">
<code>children</code> 属性</h3>
<p>用户自定义的组件内可以通过 <code>this.props.children</code> 来获取一个特殊的属性。该属性与其它属性的区别就是传递方式不同。</p>
<p><code>children</code> 属性的值是指一对闭合的 JSX 标签中间的内容，如下所示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<UserList>
    <User name=&quot;Tom&quot; />
    <User name=&quot;Lucy&quot; />
</UserList>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">UserList</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">User</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"Tom"</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">User</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"Lucy"</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">UserList</span>&gt;</span></code></pre>
<p>那么在 <code>UserList</code> 内部可以通过 <code>this.props.children</code> 来获取下面这个 JSX 片段：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<User name=&quot;Tom&quot; />
<User name=&quot;Lucy&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;User <span class="hljs-built_in">name</span>=<span class="hljs-string">"Tom"</span> /&gt;
&lt;User <span class="hljs-built_in">name</span>=<span class="hljs-string">"Lucy"</span> /&gt;</code></pre>
<p>该示例中，获取到的实际上是一个包含两个 <code>User</code> 元素对象的数组。</p>
<h2 id="articleHeader12">总结</h2>
<p>本文主要介绍了在 React 中组件的定义方式，以及几个关键的注意事项。另外介绍了组件属性的作用、属性默认值、属性类型校验以及如何为组件传递属性。</p>
<p>希望内容对大家有用，如有任何问题和建议可以给我留言，谢谢。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
玩转 React（四）- 创造一个新的 HTML 标签

## 原文链接
[https://segmentfault.com/a/1190000011502742](https://segmentfault.com/a/1190000011502742)

