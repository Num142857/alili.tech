---
title: 'React 深入系列１：React 中的元素、组件、实例和节点' 
date: 2018-12-07 2:30:10
hidden: true
slug: vo4sg43ywhm
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>文：徐超，《React进阶之路》作者<p>授权发布，转载请注明作者及出处</p>
</blockquote>
<hr>
<blockquote>React 深入系列，深入讲解了React中的重点概念、特性和模式等，旨在帮助大家加深对React的理解，以及在项目中更加灵活地使用React。</blockquote>
<p>React 中的元素、组件、实例和节点，是React中关系密切的4个概念，也是很容易让React 初学者迷惑的4个概念。现在，老干部就来详细地介绍这4个概念，以及它们之间的联系和区别，满足喜欢咬文嚼字、刨根问底的同学（老干部就是其中一员）的好奇心。</p>
<h4>元素 (Element)</h4>
<p><strong>React 元素其实就是一个简单JavaScript对象，一个React 元素和界面上的一部分DOM对应，描述了这部分DOM的结构及渲染效果</strong>。一般我们通过JSX语法创建React 元素，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const element = <h1 className='greeting'>Hello, world</h1>;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> element = <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">className</span>=<span class="hljs-string">'greeting'</span>&gt;</span>Hello, world<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;</code></pre>
<p>element是一个React 元素。在编译环节，JSX 语法会被编译成对React.createElement()的调用，从这个函数名上也可以看出，JSX语法返回的是一个React 元素。上面的例子编译后的结果为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const element = React.createElement(
  'h1',
  {className: 'greeting'},
  'Hello, world!'
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">const element</span> = React.createElement(
  <span class="hljs-string">'h1'</span>,
  {className: <span class="hljs-string">'greeting'</span>},
  <span class="hljs-string">'Hello, world!'</span>
);</code></pre>
<p>最终，element的值是类似下面的一个简单JavaScript对象：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const element = {
  type: 'h1',
  props: {
    className: 'greeting',
    children: 'Hello, world'
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>const <span class="hljs-literal">element</span> = {
  type: <span class="hljs-string">'h1'</span>,
  props: {
    className: <span class="hljs-string">'greeting'</span>,
    children: <span class="hljs-string">'Hello, world'</span>
  }
}</code></pre>
<p>React 元素可以分为两类：DOM类型的元素和组件类型的元素。DOM类型的元素使用像h1、div、p等DOM节点创建React 元素，前面的例子就是一个DOM类型的元素；组件类型的元素使用React 组件创建React 元素，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const buttonElement = <Button color='red'>OK</Button>;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> buttonElement = <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Button</span> <span class="hljs-attr">color</span>=<span class="hljs-string">'red'</span>&gt;</span>OK<span class="hljs-tag">&lt;/<span class="hljs-name">Button</span>&gt;</span></span>;</code></pre>
<p>buttonElement就是一个组件类型的元素，它的值是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const buttonElement = {
  type: 'Button',
  props: {
    color: 'red',
    children: 'OK'
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs go"><code><span class="hljs-keyword">const</span> buttonElement = {
  <span class="hljs-keyword">type</span>: <span class="hljs-string">'Button'</span>,
  props: {
    color: <span class="hljs-string">'red'</span>,
    children: <span class="hljs-string">'OK'</span>
  }
}</code></pre>
<p>对于DOM类型的元素，因为和页面的DOM节点直接对应，所以React知道如何进行渲染。但是对于组件类型的元素，如buttonElement，React是无法直接知道应该把buttonElement渲染成哪种结构的页面DOM，这时就需要组件自身提供React能够识别的DOM节点信息，具体实现方式在介绍组件时会详细介绍。</p>
<p>有了React 元素，我们应该如何使用它呢？其实，绝大多数情况下，我们都不会直接使用React 元素，React 内部会自动根据React 元素，渲染出最终的页面DOM。更确切地说，React元素描述的是React虚拟DOM的结构，React会根据虚拟DOM渲染出页面的真实DOM。</p>
<h4>组件 (Component)</h4>
<p>React 组件，应该是大家最熟悉的React中的概念。React通过组件的思想，将界面拆分成一个个可以复用的模块，每一个模块就是一个React 组件。一个React 应用由若干组件组合而成，一个复杂组件也可以由若干简单组件组合而成。</p>
<p>React组件和React元素关系密切，<strong>React组件最核心的作用是返回React元素</strong>。这里你也许会有疑问：React元素不应该是由React.createElement() 返回的吗？但React.createElement()的调用本身也是需要有“人”负责的，React组件正是这个“责任人”。React组件负责调用React.createElement()，返回React元素，供React内部将其渲染成最终的页面DOM。</p>
<p>既然组件的核心作用是返回React元素，那么最简单的组件就是一个返回React元素的函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Welcome</span>(<span class="hljs-params">props</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello, {props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
}</code></pre>
<p>Welcome是一个用函数定义的组件。如果使用类（class）定义组件，返回React元素的工作具体就由组件的render方法承担，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Welcome</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> &lt;h1&gt;<span class="hljs-type">Hello</span>, {<span class="hljs-keyword">this</span>.props.name}&lt;/h1&gt;;
  }
}</code></pre>
<p>其实，使用类定义的组件，render方法是唯一必需的方法，其他组件的生命周期方法都只不过是为render服务而已，都不是必需的。</p>
<p>现在来考虑下面这个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Home extends React.Component {
  render() {
    return (
      <div>
        <Welcome name='老干部' />
        <p>Anything you like</p>
      </div>
    )
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Home</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;<span class="hljs-type">Welcome</span> name='老干部' /&gt;
        &lt;p&gt;<span class="hljs-type">Anything</span> you like&lt;/p&gt;
      &lt;/div&gt;
    )
  }
}</code></pre>
<p>Home 组件使用了Welcome组件，返回的React元素为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  type: 'div',
  props: {
    children: [
      {
        type: 'Welcome',
        props: {
          name: '老干部'
        }
      },
      {
        type: 'p',
        props: {
          children: 'Anything you like'
        }
      }，
    ]
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>{
  <span class="hljs-attribute">type</span>: <span class="hljs-string">'div'</span>,
  <span class="hljs-attribute">props</span>: {
    <span class="hljs-attribute">children</span>: [
      {
        <span class="hljs-attribute">type</span>: <span class="hljs-string">'Welcome'</span>,
        <span class="hljs-attribute">props</span>: {
          <span class="hljs-attribute">name</span>: <span class="hljs-string">'老干部'</span>
        }
      },
      {
        <span class="hljs-attribute">type</span>: <span class="hljs-string">'p'</span>,
        <span class="hljs-attribute">props</span>: {
          <span class="hljs-attribute">children</span>: <span class="hljs-string">'Anything you like'</span>
        }
      }，
    ]
  }
}</code></pre>
<p>对于这个结构，React 知道如何渲染type = 'div' 和 type = 'p' 的节点，但不知道如何渲染type='Welcome'的节点，当React 发现Welcome 是一个React 组件时（判断依据是Welcome首字母为大写），会根据Welcome组件返回的React 元素决定如何渲染Welcome节点。Welcome组件返回的React 元素为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  type: 'h1',
  props: {
      children: 'Hello, 老干部'
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
  <span class="hljs-attribute">type</span>: <span class="hljs-string">'h1'</span>,
  props: {
      children: <span class="hljs-string">'Hello, 老干部'</span>
  }
}</code></pre>
<p>这个结构中只包含DOM节点，React是知道如何渲染的。如果这个结构中还包含其他组件节点，React 会重复上面的过程，继续解析对应组件返回的React 元素，直到返回的React 元素中只包含DOM节点为止。这样的递归过程，让React 获取到页面的完整DOM结构信息，渲染的工作自然就水到渠成了。</p>
<p>另外，如果仔细思考的话，可以发现，<strong>React 组件的复用，本质上是为了复用这个组件返回的React 元素，React 元素是React 应用的最基础组成单位</strong>。</p>
<h4>实例 (Instance）</h4>
<p>这里的实例特指React组件的实例。React 组件是一个函数或类，实际工作时，发挥作用的是React 组件的实例对象。只有组件实例化后，每一个组件实例才有了自己的props和state，才持有对它的DOM节点和子组件实例的引用。在传统的面向对象的开发方式中，实例化的工作是由开发者自己手动完成的，但在React中，组件的实例化工作是由React自动完成的，组件实例也是直接由React管理的。换句话说，开发者完全不必关心组件实例的创建、更新和销毁。</p>
<h4>节点 (Node)</h4>
<p>在使用PropTypes校验组件属性时，有这样一种类型：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="MyComponent.propTypes = { 
  optionalNode: PropTypes.node,
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>MyComponent<span class="hljs-selector-class">.propTypes</span> = { 
  optionalNode: PropTypes<span class="hljs-selector-class">.node</span>,
}</code></pre>
<p>PropTypes.node又是什么类型呢？这表明optionalNode是一个React 节点。React 节点是指可以被React渲染的数据类型，包括数字、字符串、React 元素，或者是一个包含这些类型数据的数组。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 数字类型的节点
function MyComponent(props) {
  return 1;
}

// 字符串类型的节点
function MyComponent(props) {
  return 'MyComponent';
}

// React元素类型的节点
function MyComponent(props) {
  return <div>React Element</div>;
}

// 数组类型的节点，数组的元素只能是其他合法的React节点
function MyComponent(props) {
  const element = <div>React Element</div>;
  const arr = [1, 'MyComponent', element];
  return arr;
}

// 错误，不是合法的React节点
function MyComponent(props) {
  const obj = { a : 1}
  return obj;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 数字类型的节点</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">MyComponent</span>(<span class="hljs-params">props</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
}

<span class="hljs-comment">// 字符串类型的节点</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">MyComponent</span>(<span class="hljs-params">props</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-string">'MyComponent'</span>;
}

<span class="hljs-comment">// React元素类型的节点</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">MyComponent</span>(<span class="hljs-params">props</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>React Element<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
}

<span class="hljs-comment">// 数组类型的节点，数组的元素只能是其他合法的React节点</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">MyComponent</span>(<span class="hljs-params">props</span>) </span>{
  <span class="hljs-keyword">const</span> element = <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>React Element<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>;
  <span class="hljs-keyword">const</span> arr = [<span class="hljs-number">1</span>, <span class="hljs-string">'MyComponent'</span>, element];
  <span class="hljs-keyword">return</span> arr;
}

<span class="hljs-comment">// 错误，不是合法的React节点</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">MyComponent</span>(<span class="hljs-params">props</span>) </span>{
  <span class="hljs-keyword">const</span> obj = { <span class="hljs-attr">a</span> : <span class="hljs-number">1</span>}
  <span class="hljs-keyword">return</span> obj;
}</code></pre>
<p>最后总结一下，React 元素和组件的概念最重要，也最容易混淆；React 组件实例的概念大家了解即可，几乎使用不到；React 节点有一定使用场景，但看过本文后应该也就不存在理解问题了。</p>
<h4>下篇预告：</h4>
<p>React 深入系列2：组件分类</p>
<hr>
<p>新书推荐《React进阶之路》</p>
<p>作者：徐超</p>
<p>毕业于浙江大学，硕士，资深前端工程师，长期就职于能源物联网公司远景智能。8年软件开发经验，熟悉大前端技术，拥有丰富的Web前端和移动端开发经验，尤其对React技术栈和移动Hybrid开发技术有深入的理解和实践经验。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014177338?w=297&amp;h=387" src="https://static.alili.tech/img/remote/1460000014177338?w=297&amp;h=387" alt="" title="" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 深入系列１：React 中的元素、组件、实例和节点

## 原文链接
[https://segmentfault.com/a/1190000014177333](https://segmentfault.com/a/1190000014177333)

