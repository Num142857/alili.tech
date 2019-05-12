---
title: '如何在 React 中做到 jQuery-free' 
date: 2019-02-06 2:30:08
hidden: true
slug: rpclyi368zj
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>前些天在订阅的公众号中看到了以前阮一峰老师写过的一篇文章，<a href="http://www.ruanyifeng.com/blog/2013/05/jquery-free.html" rel="nofollow noreferrer" target="_blank">「如何做到 jQuery-free？」</a>。这篇文章讨论的问题，在今天来看仍不过时，其中的一些点的讨论主要是面向新内核现代浏览器的标准 DOM API，很可惜的是在目前的开发环境下，我们仍然无法完全抛弃 IE，大部分情况下我们至少还要兼容到 IE 8，这一点使我们无法充分践行文章中提到的一些点，而本文也正是首次启发，顺着阮老师文章的思路来讨论如何在 React 中实战 IE8-compatible 的 jQuery-free。</p>
<p>首先我们仍要说的是，jQuery 是现在最流行的 JavaScript 工具库。在 W3techs 的<a href="https://w3techs.com/technologies/overview/javascript_library/all" rel="nofollow noreferrer" target="_blank">统计</a>中，目前全世界 70.6% 的网站在使用他，而 React 甚至还不到 0.1%，但 React 一个值得注意的趋势是，他在目前顶级流量网站中的使用率是最高的，比例达到了 <a href="https://w3techs.com/technologies/topsite/javascript_library" rel="nofollow noreferrer" target="_blank">16%</a>。这一趋势也表明了目前整个前端界的技术趋势，但 70.6% 的数字也在告诉我们，jQuery 在 JS 库中的王者地位，即使使用了React，也可能因为各种各样的原因，还要和 jQuery 来配合使用。但 React 本身的体积已经让我们对任何一个重库产生了不适反应，为了兼容 IE8，我们仍然需要使用 1.x 的 jQuery 版本，但当时设计上的缺陷使得我们无法像 lodash 那样按需获取。而 React 和 jsx 的强大，又使得我们不需要了 jQuery 的大部分功能。从这个角度来看，他臃肿的体积让开发者更加难以忍受，jQuery-free 势在必行。</p>
<p>下面就顺着阮老师当年的思路，来讨论如何使用 React 自带的强大功能，和一些良心第三方库屏蔽兼容性，来取代 jQuery 的主要功能，做到 jQuery-free。</p>
<p>（注：React 15.x 版本已经不再兼容 IE8，因此本文讨论的 React 仍是 0.14.x 的版本，同时为了易于理解，本文也基本上以 ES6 class 的方式来声明组件，而不采用 pure function。）</p>
<h2 id="articleHeader1">一、选取 DOM 元素</h2>
<p>在 jQuery 中，我们已经熟悉了使用 sizzle 选择器来完成 DOM 元素的选取。而在 React 中，我们可以使用 <a href="https://facebook.github.io/react/docs/more-about-refs.html" rel="nofollow noreferrer" target="_blank">ref</a> 来更有针对性的获取元素。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
class Demo extends React.Compoent {

    getDomNode() {
        return this.refs.root; // 获取 Dom Node
    }
    render() {
        return (
            <div ref=&quot;root&quot;>just a demo</div>
        );
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Demo</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Compoent</span> </span>{

    getDomNode() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.refs.root; <span class="hljs-comment">// 获取 Dom Node</span>
    }
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"root"</span>&gt;</span>just a demo<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        );
    }
}</code></pre>
<p>这是最简单的获取 node 的方式，如果有多层结构嵌套呢？没有关系。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
class Demo extends React.Compoent {

    getRootNode() {
        return this.refs.root; // 获取根节点 Dom Node
    }
    getLeafNode() {
        return this.refs.leaf; // 获取叶节点 Dom Node
    }
    render() {
        return (
            <div ref=&quot;root&quot;>
                <div ref=&quot;leaf&quot;>just a demo</div>
            </div>
        );
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Demo</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Compoent</span> </span>{

    getRootNode() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.refs.root; <span class="hljs-comment">// 获取根节点 Dom Node</span>
    }
    getLeafNode() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.refs.leaf; <span class="hljs-comment">// 获取叶节点 Dom Node</span>
    }
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"root"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"leaf"</span>&gt;</span>just a demo<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        );
    }
}</code></pre>
<p>如果是组件和组件嵌套呢？也没关系，父组件仍然可以拿到子组件的根节点。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';
class Sub extends React.Compoent {
    render() {
        return (
            <div>a sub component</div>
        );
    }
}
class Demo extends React.Compoent {

    getDomNode() {
        return this.refs.root; // 获取 Dom Node
    }
    
    getSubNode() {
        return ReactDOM.findDOMNode(this.refs.sub); // 获取子组件根节点
    }
    render() {
        return (
            <div ref=&quot;root&quot;>
                <Sub ref=&quot;sub&quot; />
            </div>
        );
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Sub</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Compoent</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>a sub component<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        );
    }
}
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Demo</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Compoent</span> </span>{

    getDomNode() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.refs.root; <span class="hljs-comment">// 获取 Dom Node</span>
    }
    
    getSubNode() {
        <span class="hljs-keyword">return</span> ReactDOM.findDOMNode(<span class="hljs-keyword">this</span>.refs.sub); <span class="hljs-comment">// 获取子组件根节点</span>
    }
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"root"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">Sub</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">"sub"</span> /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        );
    }
}
</span></code></pre>
<p>上面使用了比较易懂的 API 来解释 Ref 的用法，但里面包含了一些现在 React 不太推荐和即将废弃的方法，如果用 React 推荐的写法，我们可以这样写。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import ReactDOM from 'react-dom';
class Sub extends React.Compoent {
    getDomNode() {
        return this.rootNode;
    }
    render() {
        return (
            <div ref={(c) => this.rootNode = c}>a sub component</div>
        );
    }
}
class Demo extends React.Compoent {

    getDomNode() {
        return this.rootNode; // 获取 Dom Node
    }
    
    getSubNode() {
        return this.sub.getDomNode(); // 获取子组件根节点
    }
    render() {
        return (
            <div ref={(c) => this.rootNode = c}>
                <Sub ref={(c) => this.sub = c} />
            </div>
        );
    }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDOM <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Sub</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Compoent</span> </span>{
    getDomNode() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.rootNode;
    }
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{(c)</span> =&gt;</span> this.rootNode = c}&gt;a sub component<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        );
    }
}
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Demo</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Compoent</span> </span>{

    getDomNode() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.rootNode; <span class="hljs-comment">// 获取 Dom Node</span>
    }
    
    getSubNode() {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.sub.getDomNode(); <span class="hljs-comment">// 获取子组件根节点</span>
    }
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{(c)</span> =&gt;</span> this.rootNode = c}&gt;
                <span class="hljs-tag">&lt;<span class="hljs-name">Sub</span> <span class="hljs-attr">ref</span>=<span class="hljs-string">{(c)</span> =&gt;</span> this.sub = c} /&gt;
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        );
    }
}
</span></code></pre>
<p>有人可能会问，那子组件怎么拿父组件的 Dom Node 呢，从 React 的单向数据流角度出发，遇到这种情况我们应该通过回调通知给父组件，再由父组件自行判断如何修改 Node，其实父组件拿子组件的 Node 情况也很少，大多数情况下我们是通过 props 传递变化给子组件，获取子组件 Node，更多的情况下是为了避开大量重新渲染去修改一些Node的属性（比如 scrollLeft）。</p>
<h2 id="articleHeader2">二、DOM 操作</h2>
<p>jQuery 中提供了丰富的操作方法，但一个个操作 DOM 元素有的时候真的很烦人并且容易出错。React 通过数据驱动的思想，通过改变 view 对应的数据，轻松实现 DOM 的增删操作。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Demo extends React.Compoent {
    constructor(props) {
        super(props);
        this.state = {
            list: [1, 2, 3],
        }；
        this.addItemFromBottom = this.addItemFromBottom.bind(this);
        this.addItemFromTop = this.addItemFromTop.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }
    
    addItemFromBottom() {
        this.setState({
            list: this.state.list.concat([4]),
        });
    }
    
    addItemFromTop() {
        this.setState({
            list: [0].concat(this.state.list),
        });
    }
    
    deleteItem() {
        const newList = [...this.state.list];
        newList.pop();
        this.setState({
            list: newList,
        });
    }
    
    render() {
        return (
            <div>
                {this.state.list.map((item) => <div>{item}</div>)}
                <button onClick={this.addItemFromBottom}>尾部插入 Dom 元素</button>
                <button onClick={this.addItemFromTop}>头部插入 Dom 元素</button>
                <button onClick={this.deleteItem}>删除 Dom 元素</button>
            </div>
        );
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Demo</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Compoent</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {
            <span class="hljs-attr">list</span>: [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>],
        }；
        <span class="hljs-keyword">this</span>.addItemFromBottom = <span class="hljs-keyword">this</span>.addItemFromBottom.bind(<span class="hljs-keyword">this</span>);
        <span class="hljs-keyword">this</span>.addItemFromTop = <span class="hljs-keyword">this</span>.addItemFromTop.bind(<span class="hljs-keyword">this</span>);
        <span class="hljs-keyword">this</span>.deleteItem = <span class="hljs-keyword">this</span>.deleteItem.bind(<span class="hljs-keyword">this</span>);
    }
    
    addItemFromBottom() {
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">list</span>: <span class="hljs-keyword">this</span>.state.list.concat([<span class="hljs-number">4</span>]),
        });
    }
    
    addItemFromTop() {
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">list</span>: [<span class="hljs-number">0</span>].concat(<span class="hljs-keyword">this</span>.state.list),
        });
    }
    
    deleteItem() {
        <span class="hljs-keyword">const</span> newList = [...this.state.list];
        newList.pop();
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">list</span>: newList,
        });
    }
    
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                {this.state.list.map((item) =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{item}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>)}
                <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.addItemFromBottom}</span>&gt;</span>尾部插入 Dom 元素<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.addItemFromTop}</span>&gt;</span>头部插入 Dom 元素<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.deleteItem}</span>&gt;</span>删除 Dom 元素<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        );
    }
}</code></pre>
<h2 id="articleHeader3">三、事件的监听</h2>
<p>React 通过根节点代理的方式，实现了一套很优雅的事件监听方案，在组件 unmount 时也不需要自己去处理内存回收相关的问题，非常的方便。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        alert('我是弹窗')；
    }
    render() {
        return (
            <div onClick={this.handleClick}>点击我弹出弹框</div>
        );
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Demo</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.handleClick = <span class="hljs-keyword">this</span>.handleClick.bind(<span class="hljs-keyword">this</span>);
    }
    handleClick() {
        alert(<span class="hljs-string">'我是弹窗'</span>)；
    }
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.handleClick}</span>&gt;</span>点击我弹出弹框<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        );
    }
}</code></pre>
<p>这里有一个小细节就是 bind 的时机，bind 是为了保持相应函数的上下文，虽然也可以在 onClick 那里 bind，但这里选择在 constructor 里 bind 是因为前者会在每次 render 的时候都进行一次 bind，返回一个新函数，是比较消耗性能的做法。</p>
<p>但 React 的事件监听，毕竟只能监听至 root component，而我们在很多时候要去监听 window/document 上的事件，如果 resize、scroll，还有一些 React 处理不好的事件，比如 scroll，这些都需要我们自己来解决。事件监听为了屏蔽差异性需要做很多的工作，这里像大家推荐一个第三方库来完成这部分的工作，<a href="https://www.npmjs.com/package/add-dom-event-listener" rel="nofollow noreferrer" target="_blank">add-dom-event-listener</a>，用法和原生的稍有区别，是因为这个库并不旨在做 polyfill，但用法还是很简单。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var addEventListener = require('add-dom-event-listener');
var handler = addEventListener(document.body, 'click', function(e){
  console.log(e.target); // works for ie
  console.log(e.nativeEvent); // native dom event
});
handler.remove(); // detach event listener" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> addEventListener = <span class="hljs-built_in">require</span>(<span class="hljs-string">'add-dom-event-listener'</span>);
<span class="hljs-keyword">var</span> handler = addEventListener(<span class="hljs-built_in">document</span>.body, <span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>)</span>{
  <span class="hljs-built_in">console</span>.log(e.target); <span class="hljs-comment">// works for ie</span>
  <span class="hljs-built_in">console</span>.log(e.nativeEvent); <span class="hljs-comment">// native dom event</span>
});
handler.remove(); <span class="hljs-comment">// detach event listener</span></code></pre>
<p>另一个选择是 <a href="https://github.com/fat/bean" rel="nofollow noreferrer" target="_blank">bean</a>，达到了 IE6+ 级别的兼容性。</p>
<h2 id="articleHeader4">四、事件的触发</h2>
<p>和事件监听一样，无论是 Dom 事件还是自定义事件，都有很优秀的第三方库帮我们去处理，如果是 DOM 事件，推荐 <a href="https://github.com/fat/bean" rel="nofollow noreferrer" target="_blank">bean</a>，如果是自定义事件的话，推荐 <a href="https://github.com/mroderick/PubSubJS" rel="nofollow noreferrer" target="_blank">PubSubJS</a>。</p>
<h2 id="articleHeader5">五、document.ready</h2>
<p>React 作为一个 view 层框架，通常情况下页面只有一个用于渲染 React 页面组件的根节点 div，因此 document.ready，只需把脚本放在这个 div 后面执行即可。而对于渲染完成后的回调，我们可以使用 React 提供的 componentDidMount 生命周期。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
class Demo extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        doSomethingAfterRender(); // 在组件渲染完成后执行一些操作，如远程获取数据，检测 DOM 变化等。
    }
    render() {
        return (
            <div>just a demo</div>
        );
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Demo</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
    }
    
    componentDidMount() {
        doSomethingAfterRender(); <span class="hljs-comment">// 在组件渲染完成后执行一些操作，如远程获取数据，检测 DOM 变化等。</span>
    }
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>just a demo<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        );
    }
}</code></pre>
<h2 id="articleHeader6">六、attr 方法</h2>
<p>jQuery 使用 attr 方法，获取 Dom 元素的属性。在 React 中也可以配合 Ref 直接读取 DOM 元素的属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
class Demo extends React.Component {
    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        this.rootNode.scrollLeft = 10; // 渲染后将外层的滚动调至 10px
    }
    render() {
        return (
            <div 
                ref={(c) => this.rootNode = c} 
                style="{{" width: '100px', overflow: 'auto' "}}"
            > 
                <div style="{{" width: '1000px' "}}">just a demo</div>
            </div>
        );
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Demo</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
    }
    
    componentDidMount() {
        <span class="hljs-keyword">this</span>.rootNode.scrollLeft = <span class="hljs-number">10</span>; <span class="hljs-comment">// 渲染后将外层的滚动调至 10px</span>
    }
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> 
                <span class="hljs-attr">ref</span>=<span class="hljs-string">{(c)</span> =&gt;</span> this.rootNode = c} 
                style="{{" width: '100px', overflow: 'auto' "}}"
            &gt; 
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"</span> <span class="hljs-attr">width:</span> '<span class="hljs-attr">1000px</span>' "}}"&gt;</span>just a demo<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        );
    }
}</code></pre>
<p>但是，在大部分的情况下，我们完全不需要做，因为 React 的单向数据流和数据驱动渲染，我们可以不通过 DOM，轻松拿到和修改大部分我们需要的 DOM 属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            link: '//www.taobao.com',
        };
        this.getLink = this.getLink.bind(this);
        this.editLink = this.editLink.bind(this);
    }
    
    getLink() {
        alert(this.state.link);
    }
    
    editLink() {
        this.setState({
            link: '//www.tmall.com',
        });
    }
    
    render() {
        return (
            <div>
                <a href={this.state.link}>跳转链接</a>
                <button onClick={this.getLink}>获取链接</button>
                <button onClick={this.editLink}>修改链接</button>
            </div>
        );
    }
    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Demo</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {
            <span class="hljs-attr">link</span>: <span class="hljs-string">'//www.taobao.com'</span>,
        };
        <span class="hljs-keyword">this</span>.getLink = <span class="hljs-keyword">this</span>.getLink.bind(<span class="hljs-keyword">this</span>);
        <span class="hljs-keyword">this</span>.editLink = <span class="hljs-keyword">this</span>.editLink.bind(<span class="hljs-keyword">this</span>);
    }
    
    getLink() {
        alert(<span class="hljs-keyword">this</span>.state.link);
    }
    
    editLink() {
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">link</span>: <span class="hljs-string">'//www.tmall.com'</span>,
        });
    }
    
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">{this.state.link}</span>&gt;</span>跳转链接<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.getLink}</span>&gt;</span>获取链接<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.editLink}</span>&gt;</span>修改链接<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        );
    }
    
}</code></pre>
<h2 id="articleHeader7">七、addClass/removeClass/toggleClass</h2>
<p>在 jQuery 的时代，我们通常靠获取 Dom 元素后，再 <code>addClass/removeClass</code> 来改变外观。在 React 中通过数据驱动和第三库 <code>classnames</code> 修改样式从未如此轻松。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".fn-show {
    display: block;
}
.fn-hide {
    display: none;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.fn-show</span> {
    <span class="hljs-attribute">display</span>: block;
}
<span class="hljs-selector-class">.fn-hide</span> {
    <span class="hljs-attribute">display</span>: none;
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
import classnames from 'classnames';
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true,
        };
        this.changeShow = this.changeShow.bind(this);
    }
    
    changeShow() {
        this.setState({
            show: !this.state.show, 
        });
    }
    
    render() {
        return (
            <div>
                <a 
                    href=&quot;//www.taobao.com&quot; 
                    className={classnames({
                        'fn-show': this.state.show,
                        'fn-hide': !this.state.show,
                    })}
                >
                    跳转链接
                </a>
                <button onClick={this.changeShow}>改变现实状态</button>
            </div>
        );
    }
    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> classnames <span class="hljs-keyword">from</span> <span class="hljs-string">'classnames'</span>;
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Demo</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>(props) {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {
            <span class="hljs-attr">show</span>: <span class="hljs-literal">true</span>,
        };
        <span class="hljs-keyword">this</span>.changeShow = <span class="hljs-keyword">this</span>.changeShow.bind(<span class="hljs-keyword">this</span>);
    }
    
    changeShow() {
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">show</span>: !<span class="hljs-keyword">this</span>.state.show, 
        });
    }
    
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">a</span> 
                    <span class="hljs-attr">href</span>=<span class="hljs-string">"//www.taobao.com"</span> 
                    <span class="hljs-attr">className</span>=<span class="hljs-string">{classnames({</span>
                        '<span class="hljs-attr">fn-show</span>'<span class="hljs-attr">:</span> <span class="hljs-attr">this.state.show</span>,
                        '<span class="hljs-attr">fn-hide</span>'<span class="hljs-attr">:</span> !<span class="hljs-attr">this.state.show</span>,
                    })}
                &gt;</span>
                    跳转链接
                <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.changeShow}</span>&gt;</span>改变现实状态<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        );
    }
    
}</code></pre>
<h3 id="articleHeader8">八、css</h3>
<p>jQuery 的 css 方法用于设置 DOM 元素的 style 属性，在 React 中，我们可以直接设置 DOM 的 style 属性，如果想改变，和上面的 class 一样，用数据去驱动。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
class Demo extends React.Component {
    constructor() {
        super(props);
        this.state = {
            backgorund: 'white',
        };
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick() {
        this.setState({
            background: 'black',
        });
    }
    
    render() {
        return (
            <div 
                style="{{"
                    background: this.state.background,
                "}}"
            >
                just a demo
                <button>change Background Color</button>
            </div>
        );
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Demo</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">constructor</span>() {
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = {
            <span class="hljs-attr">backgorund</span>: <span class="hljs-string">'white'</span>,
        };
        <span class="hljs-keyword">this</span>.handleClick = <span class="hljs-keyword">this</span>.handleClick.bind(<span class="hljs-keyword">this</span>);
    }
    
    handleClick() {
        <span class="hljs-keyword">this</span>.setState({
            <span class="hljs-attr">background</span>: <span class="hljs-string">'black'</span>,
        });
    }
    
    render() {
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> 
                <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"</span>
                    <span class="hljs-attr">background:</span> <span class="hljs-attr">this.state.background</span>,
                "}}"
            &gt;</span>
                just a demo
                <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>change Background Color<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        );
    }
}</code></pre>
<h2 id="articleHeader9">九、数据存储</h2>
<p>比起 jQuery，React 反而是更擅长管理数据，我们没有必要像 jQuery 时那样将数据放进 Dom 元素的属性里，而是利用 state 或者 内部变量(this.xxx) 来保存，在整个生命周期，我们都可以拿到这些数据进行比较和修改。</p>
<h2 id="articleHeader10">十、Ajax</h2>
<p>Ajax 确实是在处理兼容性问题上一块令人比较头疼的地方，要兼容各种形式的 Xhr 不说，还有 jsonp 这个不属于 ajax 的功能也要同时考虑，好在已经有了很好的第三方库帮我们解决了这个问题，这里向大家推荐 <a href="https://www.npmjs.com/package/natty-fetch" rel="nofollow noreferrer" target="_blank">natty-fetch</a>，一个兼容 IE8 的fetch 库，在 API 设计上向 fetch 标准靠近，而又保留了和 jQuery 类似的接口，熟悉 $.ajax 应该可以很快的上手。</p>
<h2 id="articleHeader11">十一、动画</h2>
<p>React 在动画方面提供了一个插件 <a href="https://facebook.github.io/react/docs/animation.html#high-level-api-reactcsstransitiongroup" rel="nofollow noreferrer" target="_blank">ReactCSSTransitionGroup</a>，和它的低级版本 <a href="https://facebook.github.io/react/docs/animation.html#low-level-api-reacttransitiongroup" rel="nofollow noreferrer" target="_blank">ReactTransitionGroup</a>，注意这里的低级并不是退化版本，而是更加基础的暴露更多 API 的版本。<br>这个插件的灵感来自于 Angular 的 ng-animate，在设计思路上也基本保持一致。通过指定 Transition 的类名，比如 <code>example</code> ，在元素进场和退场的时候分别加上对应的类名，以实现 CSS3 动画。例如本例中，进场会添加 <code>example-enter</code> 和 <code>example-enter-active</code> 到对应的元素 ，而在退场 <code>example-leave</code> 和 <code>example-leave-active</code> 类名。当然你也可以指定不同的进场退场类名。而对应入场，React 也区分了两种类型，一种是 ReactCSSTransitionGroup 第一次渲染时(appear)，而另一种是 ReactCSSTransitionGroup 已经渲染完成后，有新的元素插入进来(enter)，这两种进场可以使用 prop 进行单独配置，禁止或者修改超时时长。具体的例子，在上面给出的链接中有详细的例子和说明，因此本文不再赘述。</p>
<p>但这个插件最多只提供了做动画的方案，如果我想在动画进行的过程中做一些其他事情呢？他就无能为力了，这时候就轮到 ReactTransitionGroup 出场了。ReactTransitionGroup 为他包裹的动画元素提供了六种新的生命周期：<code>componentWillAppear(callback)</code>, <code>componentDidAppear()</code>, <code>componentWillEnter(callback)</code>, <code>componentDidEnter()</code>, <code>componentWillLeave(callback)</code>, <code>componentDidLeave()</code>。这些 hook 可以帮助我们完成一些随着动画进行需要做的其他事。</p>
<p>但官方提供的插件有一个不足点，动画只是在进场和出场时进行的，如果我的组件不是 mount/unmount，而只是隐藏和显示怎么办？这里推荐一个第三方库：<a href="https://www.npmjs.com/package/rc-animate" rel="nofollow noreferrer" target="_blank">rc-animate</a>，从 API 设计上他基本上是延续了 ReactCSSTransitionGroup 的思路，但是通过引入 <code>showProp</code> 这一属性，使他可以 handle 组件显示隐藏这一情况下的出入场动画（只要将组件关于 show/hide 的属性传给 showProp 即可），同时这个库也提供自己的 hook，来实现 appear/enter/leave 时的回调。</p>
<p>如果你说我并不满足只是进场和出场动画，我要实现类似鼠标拖动时的实时动画，我需要的是一个 js 动画库，这里向大家推荐一个第三方库：<a href="https://www.npmjs.com/package/react-motion" rel="nofollow noreferrer" target="_blank">react-motion</a> , react-motion 一个很大的特点是，有别以往使用贝塞尔曲线来定义动画节奏，引入了刚度和阻尼这些弹簧系数来定义动画，按照作者的说法，与其纠结动画时长和很难掌握的贝塞尔表示法，通过不断调整刚度和阻尼来调试出最想要的弹性效果才是最合理的。Readme 里提供了一系列的很炫的动画效果，比如这个 <a href="http://chenglou.github.io/react-motion/demos/demo8-draggable-list/" rel="nofollow noreferrer" target="_blank">draggable list</a>。Motion 通过指定 defaultStyle、style，传回给子组件正在变化中的 style，从而实现 js 动画。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<Motion defaultStyle="{{"x: 0"}}" style="{{"x: spring(10)"}}">
  {interpolatingStyle => <div style={interpolatingStyle} />}
</Motion>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">Motion</span> <span class="hljs-attr">defaultStyle</span>=<span class="hljs-string">"{{"x:</span> <span class="hljs-attr">0</span>"}}" <span class="hljs-attr">style</span>=<span class="hljs-string">"{{"x:</span> <span class="hljs-attr">spring</span>(<span class="hljs-attr">10</span>)"}}"&gt;</span>
  {interpolatingStyle =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">{interpolatingStyle}</span> /&gt;</span>}
<span class="hljs-tag">&lt;/<span class="hljs-name">Motion</span>&gt;</span></code></pre>
<h2 id="articleHeader12">总结</h2>
<p>本文的灵感来源于阮老师两年前的文章，这篇的实战意义更大于对未来技术的展望，希望能够给各位正在使用 React 开发系统的同学们一点启发。</p>
<h2 id="articleHeader13">参考链接</h2>
<ul>
<li><p>阮一峰，<a href="http://www.ruanyifeng.com/blog/2013/05/jquery-free.html" rel="nofollow noreferrer" target="_blank">如何做到 jQuery-free？</a></p></li>
<li><p><a href="http://blog.garstasio.com/you-dont-need-jquery/events/#sending-native-(dom" rel="nofollow noreferrer" target="_blank">You Don't Need jQuery!</a>-events)</p></li>
</ul>
<h2 id="articleHeader14">最后</h2>
<p>惯例地来宣传一下团队开源的 React PC 组件库 <a href="https://github.com/uxcore/uxcore" rel="nofollow noreferrer" target="_blank">UXCore</a> ，上面提到的点，在我们的组件优化过程中(如 <a href="https://github.com/uxcore/uxcore-table" rel="nofollow noreferrer" target="_blank">table</a>)都有体现，欢迎大家一起讨论，也欢迎在我们的 <a href="https://segmentfault.com/t/uxcore">SegmentFault 专题</a>下进行提问讨论。</p>
<p><span class="img-wrap"><img data-src="https://gw.alicdn.com/tps/TB1TVapKFXXXXbbXpXXXXXXXXXX-1000-500.png" src="https://static.alili.techhttps://gw.alicdn.com/tps/TB1TVapKFXXXXbbXpXXXXXXXXXX-1000-500.png" alt="uxcore" title="uxcore" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在 React 中做到 jQuery-free

## 原文链接
[https://segmentfault.com/a/1190000006201488](https://segmentfault.com/a/1190000006201488)

