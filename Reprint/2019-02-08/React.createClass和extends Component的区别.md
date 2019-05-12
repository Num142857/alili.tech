---
title: 'React.createClass和extends Component的区别' 
date: 2019-02-08 2:30:40
hidden: true
slug: 9orwc61u6d
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>createClass本质上是一个工厂函数，extends的方式更加接近最新的ES6规范的class写法。两种方式在语法上的差别主要体现在方法的定义和静态属性的声明上。createClass方式的方法定义使用逗号,隔开，因为creatClass本质上是一个函数，传递给它的是一个Object；而class的方式定义方法时务必谨记不要使用逗号隔开，这是ES6 class的语法规范。</blockquote>
<p>React.createClass和extends Component的区别主要在于：</p>
<ol>
<li>语法区别</li>
<li>propType 和 getDefaultProps</li>
<li>状态的区别</li>
<li>this区别</li>
<li>Mixins</li>
</ol>
<h2 id="articleHeader0">语法区别</h2>
<p><strong>React.createClass</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';

const Contacts = React.createClass({  
  render() {
    return (
      <div></div>
    );
  }
});

export default Contacts;  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-keyword">const</span> Contacts = React.createClass({  
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }
});

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Contacts;  </code></pre>
<p><strong>React.Component</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';

class Contacts extends React.Component {  
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div></div>
    );
  }
}

export default Contacts;  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Contacts</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{  
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
  }
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Contacts;  </code></pre>
<p>后一种方法使用ES6的语法，用<code>constructor</code>构造器来构造默认的属性和状态。</p>
<h2 id="articleHeader1">propType 和 getDefaultProps</h2>
<p><strong>React.createClass</strong>：通过<code>proTypes</code>对象和<code>getDefaultProps()</code>方法来设置和获取<code>props</code>.</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';

const Contacts = React.createClass({  
  propTypes: {
    name: React.PropTypes.string
  },
  getDefaultProps() {
    return {

    };
  },
  render() {
    return (
      <div></div>
    );
  }
});

export default Contacts;  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-keyword">const</span> Contacts = React.createClass({  
  <span class="hljs-attr">propTypes</span>: {
    <span class="hljs-attr">name</span>: React.PropTypes.string
  },
  getDefaultProps() {
    <span class="hljs-keyword">return</span> {

    };
  },
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }
});

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Contacts;  </code></pre>
<p><strong>React.Component</strong>：通过设置两个属性<code>propTypes</code>和<code>defaultProps</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React form 'react';
class TodoItem extends React.Component{
    static propTypes = { // as static property
        name: React.PropTypes.string
    };
    static defaultProps = { // as static property
        name: ''
    };
    constructor(props){
        super(props)
    }
    render(){
        return <div></div>
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React form <span class="hljs-string">'react'</span>;
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TodoItem</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
    <span class="hljs-keyword">static</span> propTypes = { <span class="hljs-comment">// as static property</span>
        name: React.PropTypes.string
    };
    <span class="hljs-keyword">static</span> defaultProps = { <span class="hljs-comment">// as static property</span>
        name: <span class="hljs-string">''</span>
    };
    <span class="hljs-keyword">constructor</span>(props){
        <span class="hljs-keyword">super</span>(props)
    }
    render(){
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    }
}</code></pre>
<h2 id="articleHeader2">状态的区别</h2>
<p><strong>React.createClass</strong>：通过<code>getInitialState()</code>方法返回一个包含初始值的对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
let TodoItem = React.createClass({
    // return an object
    getInitialState(){ 
        return {
            isEditing: false
        }
    }
    render(){
        return <div></div>
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">let</span> TodoItem = React.createClass({
    <span class="hljs-comment">// return an object</span>
    getInitialState(){ 
        <span class="hljs-keyword">return</span> {
            <span class="hljs-attr">isEditing</span>: <span class="hljs-literal">false</span>
        }
    }
    render(){
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    }
})</code></pre>
<p><strong>React.Component</strong>：通过<code>constructor</code>设置初始状态</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
class TodoItem extends React.Component{
    constructor(props){
        super(props);
        this.state = { // define this.state in constructor
            isEditing: false
        } 
    }
    render(){
        return <div></div>
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TodoItem</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
    <span class="hljs-keyword">constructor</span>(props){
        <span class="hljs-keyword">super</span>(props);
        <span class="hljs-keyword">this</span>.state = { <span class="hljs-comment">// define this.state in constructor</span>
            isEditing: <span class="hljs-literal">false</span>
        } 
    }
    render(){
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    }
}</code></pre>
<h2 id="articleHeader3">this区别</h2>
<p><strong>React.createClass</strong>：会正确绑定<code>this</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';

const Contacts = React.createClass({  
  handleClick() {
    console.log(this); // React Component instance
  },
  render() {
    return (
      <div onClick={this.handleClick}></div>//会切换到正确的this上下文
    );
  }
});

export default Contacts;  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-keyword">const</span> Contacts = React.createClass({  
  handleClick() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>); <span class="hljs-comment">// React Component instance</span>
  },
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.handleClick}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span><span class="hljs-comment">//会切换到正确的this上下文</span>
    );
  }
});

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Contacts;  </code></pre>
<p><strong>React.Component</strong>：由于使用了 ES6，这里会有些微不同，属性并不会自动绑定到 React 类的实例上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
class TodoItem extends React.Component{
    constructor(props){
        super(props);
    }
    handleClick(){
        console.log(this); // null
    }
    handleFocus(){  // manually bind this
        console.log(this); // React Component Instance
    }
    handleBlur: ()=>{  // use arrow function
        console.log(this); // React Component Instance
    }
    render(){
        return <input onClick={this.handleClick} 
                              onFocus={this.handleFocus.bind(this)}  
                              onBlur={this.handleBlur}/>
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">TodoItem</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
    <span class="hljs-keyword">constructor</span>(props){
        <span class="hljs-keyword">super</span>(props);
    }
    handleClick(){
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>); <span class="hljs-comment">// null</span>
    }
    handleFocus(){  <span class="hljs-comment">// manually bind this</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>); <span class="hljs-comment">// React Component Instance</span>
    }
    handleBlur: <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{  <span class="hljs-comment">// use arrow function</span>
        <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>); <span class="hljs-comment">// React Component Instance</span>
    }
    render(){
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.handleClick}</span> 
                              <span class="hljs-attr">onFocus</span>=<span class="hljs-string">{this.handleFocus.bind(this)}</span>  
                              <span class="hljs-attr">onBlur</span>=<span class="hljs-string">{this.handleBlur}/</span>&gt;</span>
    }
}</span></code></pre>
<p>我们还可以在 constructor 中来改变 this.handleClick 执行的上下文，这应该是相对上面一种来说更好的办法，万一我们需要改变语法结构，这种方式完全不需要去改动 JSX 的部分：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';

class Contacts extends React.Component {  
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    console.log(this); // React Component instance
  }
  render() {
    return (
      <div onClick={this.handleClick}></div>
    );
  }
}

export default Contacts;  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Contacts</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{  
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.handleClick = <span class="hljs-keyword">this</span>.handleClick.bind(<span class="hljs-keyword">this</span>);
  }
  handleClick() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>); <span class="hljs-comment">// React Component instance</span>
  }
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.handleClick}</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> Contacts;  </code></pre>
<h2 id="articleHeader4">Mixins</h2>
<p>如果我们使用 ES6 的方式来创建组件，那么 <code>React mixins</code> 的特性将不能被使用了。</p>
<p><strong>React.createClass</strong>：使用 React.createClass 的话，我们可以在创建组件时添加一个叫做 <code>mixins </code>的属性，并将可供混合的类的集合以数组的形式赋给<code> mixins</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React from 'react';
let MyMixin = {
    doSomething(){}
}
let TodoItem = React.createClass({
    mixins: [MyMixin], // add mixin
    render(){
        return <div></div>
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">let</span> MyMixin = {
    doSomething(){}
}
<span class="hljs-keyword">let</span> TodoItem = React.createClass({
    <span class="hljs-attr">mixins</span>: [MyMixin], <span class="hljs-comment">// add mixin</span>
    render(){
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    }
})</code></pre>
<p><a href="http://ihardcoder.github.io/react/js/2015/12/22/react%E5%88%9B%E5%BB%BA%E7%BB%84%E4%BB%B6createClass%E5%92%8Cextends%20Component%E7%9A%84%E5%8C%BA%E5%88%AB.html" rel="nofollow noreferrer" target="_blank">参考文章1</a><br><a href="http://www.peachis.me/react-createclass-versus-extends-react-component/" rel="nofollow noreferrer" target="_blank">参考文章2</a><br><a href="http://imweb.io/topic/56da7609ca5e865230c1d50e" rel="nofollow noreferrer" target="_blank">参考文章3</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React.createClass和extends Component的区别

## 原文链接
[https://segmentfault.com/a/1190000005863630](https://segmentfault.com/a/1190000005863630)

