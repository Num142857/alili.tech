---
title: 'React 高阶组件(HOC)入门指南' 
date: 2019-01-14 2:30:07
hidden: true
slug: mrusl7jjjkq
categories: [reprint]
---

{{< raw >}}

                    
<p>　　之前的文章<a href="https://segmentfault.com/a/1190000008814336">React Mixins入门指南</a>介绍了React Mixin的使用。在实际使用中React Mixin的作用还是非常强大的，能够使得我们在多个组件中共用相同的方法。但是工程中大量使用Mixin也会带来非常多的问题。<a href="https://twitter.com/dan_abramov" rel="nofollow noreferrer" target="_blank">Dan Abramov</a>在文章[Mixins Considered Harmful<br>](<a href="https://facebook.github.io/react/blog/2016/07/13/mixins-considered-harmful.html)" rel="nofollow noreferrer" target="_blank">https://facebook.github.io/re...</a>介绍了Mixin带来的一些问题,总结下来主要是以下几点:</p>
<ul>
<li><p>破坏组件封装性: Mixin可能会引入不可见的属性。例如在渲染组件中使用Mixin方法，给组件带来了不可见的属性(props)和状态(state)。并且Mixin可能会相互依赖，相互耦合，不利于代码维护。</p></li>
<li><p>不同的Mixin中的方法可能会相互冲突</p></li>
</ul>
<p>　　为了处理上述的问题，React官方推荐使用高阶组件(High Order Component)</p>
<h2 id="articleHeader0">高阶组件(HOC)</h2>
<p>　　刚开始学习高阶组件时，这个概念就透漏着高级的气味，看上去就像是一种先进的编程技术的一个深奥术语，毕竟名字里就有"高阶"这种字眼，实质上并不是如此。高阶组件的概念应该是来源于JavaScript的高阶函数:</p>
<blockquote><p>高阶函数就是接受函数作为输入或者输出的函数</p></blockquote>
<p>　　这么看来<a href="https://segmentfault.com/a/1190000008193605">柯里化</a>也是高阶函数了。React官方定义高阶组件的概念是:</p>
<blockquote><p>A higher-order component is a function that takes a component and returns a new component.</p></blockquote>
<p>　　(本人也翻译了React官方文档的<a href="https://github.com/MrErHu/React-Advanced-Guides-CN" rel="nofollow noreferrer" target="_blank">Advanced Guides部分</a>，官方的高阶组件中文文档戳<a href="https://github.com/MrErHu/React-Advanced-Guides-CN/blob/master/doc/Higher%20Order%20Components.md" rel="nofollow noreferrer" target="_blank">这里</a>)</p>
<p>　　这么看来，高阶组件仅仅只是是一个接受组件组作输入并返回组件的函数。看上去并没有什么，那么高阶组件能为我们带来什么呢？首先看一下高阶组件是如何实现的，通常情况下，实现高阶组件的方式有以下两种:</p>
<ol>
<li><p>属性代理(Props Proxy)</p></li>
<li><p>反向继承(Inheritance Inversion)</p></li>
</ol>
<h3 id="articleHeader1">属性代理</h3>
<p>　　又是一个听起来很高大上的名词，实质上是通过包裹原来的组件来操作props，举个简单的例子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
import React, { Component } from 'React';
//高阶组件定义
const HOC = (WrappedComponent) =>
  class WrapperComponent extends Component {
    render() {
      return <WrappedComponent {...this.props} />;
    }
}
//普通的组件
class WrappedComponent extends Component{
    render(){
        //....
    }
}

//高阶组件使用
export default HOC(WrappedComponent)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'React'</span>;
<span class="hljs-comment">//高阶组件定义</span>
<span class="hljs-keyword">const</span> HOC = <span class="hljs-function">(<span class="hljs-params">WrappedComponent</span>) =&gt;</span>
  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">WrapperComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
      <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">WrappedComponent</span> {<span class="hljs-attr">...this.props</span>} /&gt;</span>;
    }
}
//普通的组件
class WrappedComponent extends Component{
    render(){
        //....
    }
}

//高阶组件使用
export default HOC(WrappedComponent)
</span></code></pre>
<p>　　上面的例子非常简单，但足以说明问题。我们可以看见函数HOC返回了新的组件(WrapperComponent)，这个组件原封不动的返回作为参数的组件(也就是被包裹的组件:WrappedComponent)，并将传给它的参数(props)全部传递给被包裹的组件(WrappedComponent)。这么看起来好像并没有什么作用，其实属性代理的作用还是非常强大的。</p>
<h4>操作props</h4>
<p>　　我们看到之前要传递给被包裹组件WrappedComponent的属性首先传递给了高阶组件返回的组件(WrapperComponent)，这样我们就获得了props的控制权(这也就是为什么这种方法叫做属性代理)。我们可以按照需要对传入的props进行增加、删除、修改(当然修改带来的风险需要你自己来控制)，举个例子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const HOC = (WrappedComponent) =>
    class WrapperComponent extends Component {
        render() {
            const newProps = {
                name: 'HOC'
            }
            return <WrappedComponent
                {...this.props}
                {...newProps}
            />;
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> HOC = <span class="hljs-function">(<span class="hljs-params">WrappedComponent</span>) =&gt;</span>
    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">WrapperComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
        render() {
            <span class="hljs-keyword">const</span> newProps = {
                <span class="hljs-attr">name</span>: <span class="hljs-string">'HOC'</span>
            }
            <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">WrappedComponent</span>
                {<span class="hljs-attr">...this.props</span>}
                {<span class="hljs-attr">...newProps</span>}
            /&gt;</span>;
        }
    }</span></code></pre>
<p>　　在上面的例子中，我们为被包裹组件(WrappedComponent)新增加了固定的name属性，因此WrappedComponent组件中就会多一个name的属性。</p>
<h4>获得<code>refs</code>的引用</h4>
<p>　　我们在属性代理中，可以轻松的拿到被包裹的组件的实例引用(<code>ref</code>)，例如:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'React';
　
const HOC = (WrappedComponent) =>
    class wrapperComponent extends Component {
        storeRef(ref) {
            this.ref = ref;
        }
        render() {
            return <WrappedComponent
                {...this.props}
                ref = {::this.storeRef}
            />;
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'React'</span>;
　
<span class="hljs-keyword">const</span> HOC = <span class="hljs-function">(<span class="hljs-params">WrappedComponent</span>) =&gt;</span>
    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">wrapperComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
        storeRef(ref) {
            <span class="hljs-keyword">this</span>.ref = ref;
        }
        render() {
            <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">WrappedComponent</span>
                {<span class="hljs-attr">...this.props</span>}
                <span class="hljs-attr">ref</span> = <span class="hljs-string">{::this.storeRef}</span>
            /&gt;</span>;
        }
    }</span></code></pre>
<p>　　上面的例子中，wrapperComponent渲染接受后，我们就可以拿到WrappedComponent组件的实例，进而实现调用实例方法的操作(当然这样会在一定程度上是反模式的，不是非常的推荐)。</p>
<h4>抽象state</h4>
<p>　　属性代理的情况下，我们可以将被包裹组件(WrappedComponent)中的状态提到包裹组件中，一个常见的例子就是实现<strong>不受控组件</strong>到<strong>受控的组件</strong>的转变(关于不受控组件和受控组件戳<a href="https://github.com/MrErHu/React-Advanced-Guides-CN/blob/master/doc/Uncontrolled%20Components.md" rel="nofollow noreferrer" target="_blank">这里</a>)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class WrappedComponent extends Component {
    render() {
        return <input name=&quot;name&quot; {...this.props.name} />;
    }
}

const HOC = (WrappedComponent) =>
    class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                name: '',
            };

            this.onNameChange = this.onNameChange.bind(this);
        }

        onNameChange(event) {
            this.setState({
                name: event.target.value,
            })
        }

        render() {
            const newProps = {
                name: {
                    value: this.state.name,
                    onChange: this.onNameChange,
                },
            }
            return <WrappedComponent {...this.props} {...newProps} />;
        }
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">WrappedComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
        <span class="hljs-keyword">return</span> &lt;input name="name" {...this.props.name} /&gt;;
    }
}

const HOC = (WrappedComponent) =&gt;
    class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                name: '',
            };

            this.onNameChange = this.onNameChange.bind(this);
        }

        onNameChange(event) {
            this.setState({
                name: event.target.value,
            })
        }

        render() {
            const newProps = {
                name: {
                    value: this.state.name,
                    onChange: this.onNameChange,
                },
            }
            return &lt;WrappedComponent {...this.props} {...newProps} /&gt;;
        }
    }
</code></pre>
<p>　　上面的例子中通过高阶组件，我们将不受控组件(WrappedComponent)成功的转变为受控组件.</p>
<h4>用其他元素包裹组件</h4>
<p>　　我们可以通过类似:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    render(){
        <div>
            <WrappedComponent {...this.props} />
        </div>
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    render(){
        &lt;div&gt;
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">WrappedComponent</span> {<span class="hljs-attr">...this.props</span>} /&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    }</code></pre>
<p>　　这种方式将被包裹组件包裹起来，来实现布局或者是样式的目的。</p>
<p>　　在属性代理这种方式实现的高阶组件，以上述为例，组件的渲染顺序是: 先WrappedComponent再WrapperComponent(执行ComponentDidMount的时间)。而卸载的顺序是先WrapperComponent再WrappedComponent(执行ComponentWillUnmount的时间)。</p>
<h3 id="articleHeader2">反向继承</h3>
<p>　　反向继承是指返回的组件去继承之前的组件(这里都用WrappedComponent代指)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const HOC = (WrappedComponent) =>
  class extends WrappedComponent {
    render() {
      return super.render();
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> HOC = <span class="hljs-function">(<span class="hljs-params">WrappedComponent</span>) =&gt;</span>
  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">WrappedComponent</span> </span>{
    render() {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">super</span>.render();
    }
  }</code></pre>
<p>　　 我们可以看见返回的组件确实都继承自WrappedComponent,那么所有的调用将是反向调用的(例如:<code>super.render()</code>)，这也就是为什么叫做反向继承。</p>
<h4>渲染劫持</h4>
<p>　　渲染劫持是指我们可以有意识地控制WrappedComponent的渲染过程，从而控制渲染控制的结果。例如我们可以根据部分参数去决定是否渲染组件:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const HOC = (WrappedComponent) =>
  class extends WrappedComponent {
    render() {
      if (this.props.isRender) {
        return super.render();
      } else {
        return null;
      }
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="javascrit">const <span class="hljs-type">HOC</span> = (<span class="hljs-type">WrappedComponent</span>) =&gt;
  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">WrappedComponent</span> </span>{
    render() {
      <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.props.isRender) {
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">super</span>.render();
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
      }
    }
  }</code></pre>
<p>　　甚至我们可以修改修改render的结果:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//例子来源于《深入React技术栈》

const HOC = (WrappedComponent) =>
    class extends WrappedComponent {
        render() {
            const elementsTree = super.render();
            let newProps = {};
            if (elementsTree &amp;&amp; elementsTree.type === 'input') {
                newProps = {value: 'may the force be with you'};
            }
            const props = Object.assign({}, elementsTree.props, newProps);
            const newElementsTree = React.cloneElement(elementsTree, props, elementsTree.props.children);
            return newElementsTree;
    }
}
class WrappedComponent extends Component{
    render(){
        return(
            <input value={'Hello World'} />
        )
    }
}
export default HOC(WrappedComponent)
//实际显示的效果是input的值为&quot;may the force be with you&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-comment">//例子来源于《深入React技术栈》</span>

const <span class="hljs-type">HOC</span> = (<span class="hljs-type">WrappedComponent</span>) =&gt;
    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">WrappedComponent</span> </span>{
        render() {
            const elementsTree = <span class="hljs-keyword">super</span>.render();
            let newProps = {};
            <span class="hljs-keyword">if</span> (elementsTree &amp;&amp; elementsTree.<span class="hljs-keyword">type</span> === <span class="hljs-symbol">'inpu</span>t') {
                newProps = {value: <span class="hljs-symbol">'may</span> the force be <span class="hljs-keyword">with</span> you'};
            }
            const props = <span class="hljs-type">Object</span>.assign({}, elementsTree.props, newProps);
            const newElementsTree = <span class="hljs-type">React</span>.cloneElement(elementsTree, props, elementsTree.props.children);
            <span class="hljs-keyword">return</span> newElementsTree;
    }
}
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">WrappedComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span></span>{
    render(){
        <span class="hljs-keyword">return</span>(
            &lt;input value={<span class="hljs-symbol">'Hello</span> <span class="hljs-type">World</span>'} /&gt;
        )
    }
}
export <span class="hljs-keyword">default</span> <span class="hljs-type">HOC</span>(<span class="hljs-type">WrappedComponent</span>)
<span class="hljs-comment">//实际显示的效果是input的值为"may the force be with you"</span></code></pre>
<p>　　上面的例子中我们将WrappedComponent中的input元素value值修改为:<code>may the force be with you</code>。我们可以看到前后elementTree的区别:<br>elementsTree:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009386665?w=660&amp;h=536" src="https://static.alili.tech/img/remote/1460000009386665?w=660&amp;h=536" alt="elementsTree" title="elementsTree" style="cursor: pointer;"></span><br>newElementsTree:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009386666?w=664&amp;h=530" src="https://static.alili.tech/img/remote/1460000009386666?w=664&amp;h=530" alt="newElementsTree" title="newElementsTree" style="cursor: pointer;"></span></p>
<p>　　在反向继承中，我们可以做非常多的操作，修改state、props甚至是翻转Element Tree。反向继承有一个重要的点: <strong>反向继承不能保证完整的子组件树被解析</strong>，开始我对这个概念也不理解，后来在看了<a href="https://facebook.github.io/react/blog/2015/12/18/react-components-elements-and-instances.html" rel="nofollow noreferrer" target="_blank">React Components, Elements, and Instances</a>这篇文章之后对这个概念有了自己的一点体会。<br>React Components, Elements, and Instances这篇文章主要明确了一下几个点:</p>
<ul>
<li><p>元素(element)是一个是用DOM节点或者组件来描述屏幕显示的纯对象，元素可以在属性(props.children)中包含其他的元素，一旦创建就不会改变。我们通过<code>JSX</code>和<code>React.createClass</code>创建的都是元素。</p></li>
<li><p>组件(component)可以接受属性(props)作为输入，然后返回一个元素树(element tree)作为输出。有多种实现方式:Class或者函数(Function)。</p></li>
</ul>
<p>　　所以， <strong>反向继承不能保证完整的子组件树被解析</strong>的意思的解析的元素树中包含了组件(函数类型或者Class类型)，就不能再操作组件的子组件了，这就是所谓的<strong>不能完全解析</strong>。举个例子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react';

const MyFuncComponent = (props)=>{
    return (
        <div>Hello World</div>
    );
}

class MyClassComponent extends Component{

    render(){
        return (
            <div>Hello World</div>
        )
    }

}

class WrappedComponent extends Component{
    render(){
        return(
            <div>
                <div>
                    <span>Hello World</span>
                </div>
                <MyFuncComponent />
                <MyClassComponent />
            </div>

        )
    }
}

const HOC = (WrappedComponent) =>
    class extends WrappedComponent {
        render() {
            const elementsTree = super.render();
            return elementsTree;
        }
    }

export default HOC(WrappedComponent);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;

<span class="hljs-keyword">const</span> MyFuncComponent = <span class="hljs-function">(<span class="hljs-params">props</span>)=&gt;</span>{
    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello World<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyClassComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span></span>{

    render(){
        <span class="hljs-keyword">return</span> (
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Hello World<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
        )
    }

}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">WrappedComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span></span>{
    render(){
        <span class="hljs-keyword">return</span>(
            <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>Hello World<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">MyFuncComponent</span> /&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">MyClassComponent</span> /&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

        )
    }
}

<span class="hljs-keyword">const</span> HOC = <span class="hljs-function">(<span class="hljs-params">WrappedComponent</span>) =&gt;</span>
    <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">WrappedComponent</span> </span>{
        render() {
            <span class="hljs-keyword">const</span> elementsTree = <span class="hljs-keyword">super</span>.render();
            <span class="hljs-keyword">return</span> elementsTree;
        }
    }

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> HOC(WrappedComponent);
</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009386667?w=1382&amp;h=1028" src="https://static.alili.tech/img/remote/1460000009386667?w=1382&amp;h=1028" alt="element tree1" title="element tree1" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000009386668?w=930&amp;h=956" src="https://static.alili.tech/img/remote/1460000009386668?w=930&amp;h=956" alt="element tree2" title="element tree2" style="cursor: pointer;"></span></p>
<p>　　我们可以查看解析的元素树(element tree)，<code>div</code>下的<code>span</code>是可以被完全被解析的，但是<code>MyFuncComponent</code>和<code>MyClassComponent</code>都是组件类型的，其子组件就不能被完全解析了。</p>
<h4>操作props和state</h4>
<p>　　在上面的图中我们可以看到，解析的元素树(element tree)中含有<code>props</code>和<code>state</code>(例子的组件中没有state),以及<code>ref</code>和<code>key</code>等值。因此，如果需要的话，我们不仅可以读取<code>props</code>和<code>state</code>,甚至可以修改增加、修改和删除。</p>
<p>　　在某些情况下，我们可能需要为高阶属性传入一些参数，那我们就可以通过柯里化的形式传入参数，例如:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'React';

const HOCFactoryFactory = (...params) => {
    // 可以做一些改变 params 的事
    return (WrappedComponent) => {
        return class HOC extends Component {
            render() {
                return <WrappedComponent {...this.props} />;
            }
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React, { Component } <span class="hljs-keyword">from</span> <span class="hljs-string">'React'</span>;

<span class="hljs-keyword">const</span> HOCFactoryFactory = <span class="hljs-function">(<span class="hljs-params">...params</span>) =&gt;</span> {
    <span class="hljs-comment">// 可以做一些改变 params 的事</span>
    <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">WrappedComponent</span>) =&gt;</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HOC</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
            render() {
                <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">WrappedComponent</span> {<span class="hljs-attr">...this.props</span>} /&gt;</span>;
            }
        }
    }
}</span></code></pre>
<p>可以通过下面方式使用:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="HOCFactoryFactory(params)(WrappedComponent)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">HOCFactoryFactory(params)(WrappedComponent)</code></pre>
<p>　　这种方式是不是非常类似于<code>React-Redux</code>库中的<code>connect</code>函数，因为<code>connect</code>也是类似的一种高阶函数。反向继承不同于属性代理的调用顺序，组件的渲染顺序是: 先WrappedComponent再WrapperComponent(执行ComponentDidMount的时间)。而卸载的顺序也是先WrappedComponent再WrapperComponent(执行ComponentWillUnmount的时间)。</p>
<h3 id="articleHeader3">HOC和Mixin的比较</h3>
<p>　　借用《深入React技术栈》一书中的图:<br><span class="img-wrap"><img data-src="/img/remote/1460000009386669?w=1690&amp;h=932" src="https://static.alili.tech/img/remote/1460000009386669?w=1690&amp;h=932" alt="HOCandMixin" title="HOCandMixin" style="cursor: pointer;"></span></p>
<p>　　高阶组件属于函数式编程(functional programming)思想，对于被包裹的组件时不会感知到高阶组件的存在，而高阶组件返回的组件会在原来的组件之上具有功能增强的效果。而Mixin这种混入的模式，会给组件不断增加新的方法和属性，组件本身不仅可以感知，甚至需要做相关的处理(例如命名冲突、状态维护)，一旦混入的模块变多时，整个组件就变的难以维护，也就是为什么如此多的React库都采用高阶组件的方式进行开发。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 高阶组件(HOC)入门指南

## 原文链接
[https://segmentfault.com/a/1190000009386662](https://segmentfault.com/a/1190000009386662)

