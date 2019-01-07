---
title: '深入理解React 高阶组件' 
date: 2019-01-07 2:30:11
hidden: true
slug: cvayxl3wvpi
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">1. 基本概念</h3>
<p><strong>高阶组件</strong>是React 中一个很重要且较复杂的概念，高阶组件在很多第三方库（如Redux）中都被经常使用，即使你开发的是普通的业务项目，用好高阶组件也能显著提高你的代码质量。</p>
<p>高阶组件的定义是类比于高阶函数的定义。高阶函数接收函数作为参数，并且返回值也是一个函数。类似的，高阶组件接收React组件作为参数，并且返回一个新的React组件。<strong>高阶组件本质上也是一个函数，并不是一个组件，这一点一定要注意。</strong></p>
<h3 id="articleHeader1">2. 应用场景</h3>
<p>为什么React引入高阶组件的概念？它到底有何威力？让我们先通过一个简单的例子说明一下。</p>
<p>假设我有一个组件，需要从LocalStorage中获取数据，然后渲染出来。于是我们可以这样写组件代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react'

class MyComponent extends Component {

  componentWillMount() {
      let data = localStorage.getItem('data');
      this.setState({data});
  }
  
  render() {
    return <div>{this.state.data}</div>
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">'reac</span>t'

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyComponent</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{

  componentWillMount() {
      let data = localStorage.getItem(<span class="hljs-symbol">'dat</span>a');
      <span class="hljs-keyword">this</span>.setState({data});
  }
  
  render() {
    <span class="hljs-keyword">return</span> &lt;div&gt;{<span class="hljs-keyword">this</span>.state.data}&lt;/div&gt;
  }
}</code></pre>
<p>代码很简单，但当我有其他组件也需要从LocalStorage中获取同样的数据展示出来时，我需要在每个组件都重复<code>componentWillMount</code>中的代码，这显然是很冗余的。下面让我们来看看使用高阶组件可以怎么改写这部分代码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react'

function withPersistentData(WrappedComponent) {
  return class extends Component {
    componentWillMount() {
      let data = localStorage.getItem('data');
        this.setState({data});
    }
    
    render() {
      // 通过{...this.props} 把传递给当前组件的属性继续传递给被包装的组件WrappedComponent
      return <WrappedComponent data={this.state.data} {...this.props} />
    }
  }
}

class MyComponent2 extends Component {  
  render() {
    return <div>{this.props.data}</div>
  }
}

const MyComponentWithPersistentData = withPersistentData(MyComponent2)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">'reac</span>t'

function withPersistentData(<span class="hljs-type">WrappedComponent</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    componentWillMount() {
      let data = localStorage.getItem(<span class="hljs-symbol">'dat</span>a');
        <span class="hljs-keyword">this</span>.setState({data});
    }
    
    render() {
      <span class="hljs-comment">// 通过{...this.props} 把传递给当前组件的属性继续传递给被包装的组件WrappedComponent</span>
      <span class="hljs-keyword">return</span> &lt;<span class="hljs-type">WrappedComponent</span> data={<span class="hljs-keyword">this</span>.state.data} {...<span class="hljs-keyword">this</span>.props} /&gt;
    }
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyComponent2</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{  
  render() {
    <span class="hljs-keyword">return</span> &lt;div&gt;{<span class="hljs-keyword">this</span>.props.data}&lt;/div&gt;
  }
}

const <span class="hljs-type">MyComponentWithPersistentData</span> = withPersistentData(<span class="hljs-type">MyComponent2</span>)</code></pre>
<p><code>withPersistentData</code>就是一个高阶组件，它返回一个新的组件，在新组件的<code>componentWillMount</code>中统一处理从LocalStorage中获取数据的逻辑，然后将获取到的数据以属性的方式传递给被包装的组件<code>WrappedComponent</code>，这样在<code>WrappedComponent</code>中就可以直接使用<code>this.props.data</code>获取需要展示的数据了，如<code>MyComponent2</code>所示。当有其他的组件也需要这段逻辑时，继续使用<code>withPersistentData</code>这个高阶组件包装这些组件就可以了。</p>
<p>通过这个例子，可以看出<strong>高阶组件的主要功能是封装并分离组件的通用逻辑，让通用逻辑在组件间更好地被复用</strong>。高阶组件的这种实现方式，本质上是一个装饰者设计模式。</p>
<p>高阶组件的参数并非只能是一个组件，它还可以接收其他参数。例如，组件MyComponent3需要从LocalStorage中获取key为name的数据，而不是上面例子中写死的key为data的数据，<code>withPersistentData</code>这个高阶组件就不满足我们的需求了。我们可以让它接收额外的一个参数，来决定从LocalStorage中获取哪个数据：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react'

function withPersistentData(WrappedComponent, key) {
  return class extends Component {
    componentWillMount() {
      let data = localStorage.getItem(key);
        this.setState({data});
    }
    
    render() {
      // 通过{...this.props} 把传递给当前组件的属性继续传递给被包装的组件WrappedComponent
      return <WrappedComponent data={this.state.data} {...this.props} />
    }
  }
}

class MyComponent2 extends Component {  
  render() {
    return <div>{this.props.data}</div>
  }
  
  //省略其他逻辑...
}

class MyComponent3 extends Component {  
  render() {
    return <div>{this.props.data}</div>
  }
  
  //省略其他逻辑...
}

const MyComponent2WithPersistentData = withPersistentData(MyComponent2, 'data');
const MyComponent3WithPersistentData = withPersistentData(MyComponent3, 'name');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">'reac</span>t'

function withPersistentData(<span class="hljs-type">WrappedComponent</span>, key) {
  <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    componentWillMount() {
      let data = localStorage.getItem(key);
        <span class="hljs-keyword">this</span>.setState({data});
    }
    
    render() {
      <span class="hljs-comment">// 通过{...this.props} 把传递给当前组件的属性继续传递给被包装的组件WrappedComponent</span>
      <span class="hljs-keyword">return</span> &lt;<span class="hljs-type">WrappedComponent</span> data={<span class="hljs-keyword">this</span>.state.data} {...<span class="hljs-keyword">this</span>.props} /&gt;
    }
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyComponent2</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{  
  render() {
    <span class="hljs-keyword">return</span> &lt;div&gt;{<span class="hljs-keyword">this</span>.props.data}&lt;/div&gt;
  }
  
  <span class="hljs-comment">//省略其他逻辑...</span>
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyComponent3</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{  
  render() {
    <span class="hljs-keyword">return</span> &lt;div&gt;{<span class="hljs-keyword">this</span>.props.data}&lt;/div&gt;
  }
  
  <span class="hljs-comment">//省略其他逻辑...</span>
}

const <span class="hljs-type">MyComponent2WithPersistentData</span> = withPersistentData(<span class="hljs-type">MyComponent2</span>, <span class="hljs-symbol">'dat</span>a');
const <span class="hljs-type">MyComponent3WithPersistentData</span> = withPersistentData(<span class="hljs-type">MyComponent3</span>, <span class="hljs-symbol">'nam</span>e');</code></pre>
<p>新版本的<code>withPersistentData</code>就满足我们获取不同key值的需求了。高阶组件中的参数当然也可以有函数，我们将在下一节进一步说明。</p>
<h3 id="articleHeader2">3. 进阶用法</h3>
<p>高阶组件最常见的函数签名形式是这样的：</p>
<p><code>HOC([param])([WrappedComponent])</code></p>
<p>用这种形式改写<code>withPersistentData</code>，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, { Component } from 'react'

function withPersistentData = (key) => (WrappedComponent) => {
  return class extends Component {
    componentWillMount() {
      let data = localStorage.getItem(key);
        this.setState({data});
    }
    
    render() {
      // 通过{...this.props} 把传递给当前组件的属性继续传递给被包装的组件WrappedComponent
      return <WrappedComponent data={this.state.data} {...this.props} />
    }
  }
}

class MyComponent2 extends Component {  
  render() {
    return <div>{this.props.data}</div>
  }
  
  //省略其他逻辑...
}

class MyComponent3 extends Component {  
  render() {
    return <div>{this.props.data}</div>
  }
  
  //省略其他逻辑...
}

const MyComponent2WithPersistentData = withPersistentData('data')(MyComponent2);
const MyComponent3WithPersistentData = withPersistentData('name')(MyComponent3);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-keyword">import</span> <span class="hljs-type">React</span>, { <span class="hljs-type">Component</span> } from <span class="hljs-symbol">'reac</span>t'

function withPersistentData = (key) =&gt; (<span class="hljs-type">WrappedComponent</span>) =&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    componentWillMount() {
      let data = localStorage.getItem(key);
        <span class="hljs-keyword">this</span>.setState({data});
    }
    
    render() {
      <span class="hljs-comment">// 通过{...this.props} 把传递给当前组件的属性继续传递给被包装的组件WrappedComponent</span>
      <span class="hljs-keyword">return</span> &lt;<span class="hljs-type">WrappedComponent</span> data={<span class="hljs-keyword">this</span>.state.data} {...<span class="hljs-keyword">this</span>.props} /&gt;
    }
  }
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyComponent2</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{  
  render() {
    <span class="hljs-keyword">return</span> &lt;div&gt;{<span class="hljs-keyword">this</span>.props.data}&lt;/div&gt;
  }
  
  <span class="hljs-comment">//省略其他逻辑...</span>
}

<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">MyComponent3</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{  
  render() {
    <span class="hljs-keyword">return</span> &lt;div&gt;{<span class="hljs-keyword">this</span>.props.data}&lt;/div&gt;
  }
  
  <span class="hljs-comment">//省略其他逻辑...</span>
}

const <span class="hljs-type">MyComponent2WithPersistentData</span> = withPersistentData(<span class="hljs-symbol">'dat</span>a')(<span class="hljs-type">MyComponent2</span>);
const <span class="hljs-type">MyComponent3WithPersistentData</span> = withPersistentData(<span class="hljs-symbol">'nam</span>e')(<span class="hljs-type">MyComponent3</span>);</code></pre>
<p>实际上，此时的<code>withPersistentData</code>和我们最初对高阶组件的定义已经不同。它已经变成了一个高阶函数，但这个高阶函数的返回值是一个高阶组件。我们可以把它看成高阶组件的变种形式。这种形式的高阶组件大量出现在第三方库中。如<a href="https://github.com/reactjs/react-redux" rel="nofollow noreferrer" target="_blank">react-redux</a>中的connect就是一个典型。connect的定义如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code style="word-break: break-word; white-space: initial;">connect(<span class="hljs-string">[mapStateToProps]</span>, <span class="hljs-string">[mapDispatchToProps]</span>, <span class="hljs-string">[mergeProps]</span>, <span class="hljs-string">[options]</span>)</code></pre>
<p>这个函数会将一个React组件连接到Redux 的 store。在连接的过程中，connect通过函数参数<code>mapStateToProps</code>，从全局store中取出当前组件需要的state，并把state转化成当前组件的props；同时通过函数参数<code>mapDispatchToProps</code>，把当前组件用到的Redux的action creator，以props的方式传递给当前组件。<code>connect</code>并不会修改传递进去的组件的定义，而是它会返回一个新的组件。</p>
<p>例如，我们把组件ComponentA连接到Redux上的写法类似于：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ConnectedComponentA = connect(componentASelector, componentAActions)(ComponentA);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code style="word-break: break-word; white-space: initial;">const ConnectedComponentA = connect(<span class="hljs-name">componentASelector</span>, componentAActions)(<span class="hljs-name">ComponentA</span>)<span class="hljs-comment">;</span></code></pre>
<p>我们可以把它拆分来看：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// connect 是一个函数，返回值enhance也是一个函数
const enhance = connect(componentASelector, componentAActions);
// enhance是一个高阶组件
const ConnectedComponentA = enhance(ComponentA);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-comment">// connect 是一个函数，返回值enhance也是一个函数</span>
<span class="hljs-keyword">const</span> enhance = <span class="hljs-built_in">connect</span>(componentASelector, componentAActions);
<span class="hljs-comment">// enhance是一个高阶组件</span>
<span class="hljs-keyword">const</span> ConnectedComponentA = enhance(ComponentA);</code></pre>
<p>当多个函数的输出和它的输入类型相同时，这些函数是很容易组合到一起使用的。例如，有f，g，h三个高阶组件，都只接受一个组件作为参数，于是我们可以很方便的嵌套使用它们：<code>f( g( h(WrappedComponent) ) )</code>。这里可以有一个例外，即最内层的高阶组件h可以有多个参数，但其他高阶组件必须只能接收一个参数，只有这样才能保证内层的函数返回值和外层的函数参数数量一致(都只有1个)。</p>
<p>例如我们将connect和另一个打印日志的高阶组件<code>withLog</code>联合使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ConnectedComponentA = connect(componentASelector)(withLog(ComponentA));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code style="word-break: break-word; white-space: initial;">const ConnectedComponentA = connect(<span class="hljs-name">componentASelector</span>)(<span class="hljs-name">withLog</span>(<span class="hljs-name">ComponentA</span>))<span class="hljs-comment">;</span></code></pre>
<p>这里我们定义一个工具函数：<code>compose(...functions)</code>，调用<code>compose(f, g, h) </code>等价于 <code>(...args) =&gt; f(g(h(...args)))</code>。用<code>compose</code>函数我们可以把高阶组件嵌套的写法打平：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const enhance = compose(
  connect(componentASelector),
  withLog
);
const ConnectedComponentA = enhance(ComponentA);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>const enhance = compose(
  <span class="hljs-name">connect</span>(<span class="hljs-name">componentASelector</span>),
  withLog
)<span class="hljs-comment">;</span>
const ConnectedComponentA = enhance(<span class="hljs-name">ComponentA</span>)<span class="hljs-comment">;</span></code></pre>
<p>像Redux等很多第三方库都提供了<code>compose</code>的实现，<code>compose</code>结合高阶组件使用，可以显著提高代码的可读性和逻辑的清晰度。</p>
<h3 id="articleHeader3">4.与父组件区别</h3>
<p>有些同学可能会觉得高阶组件有些类似父组件的使用。例如，我们完全可以把高阶组件中的逻辑放到一个父组件中去执行，执行完成的结果再传递给子组件。从逻辑的执行流程上来看，高阶组件确实和父组件比较相像，但是高阶组件强调的是逻辑的抽象。高阶组件是一个函数，函数关注的是逻辑；父组件是一个组件，组件主要关注的是UI/DOM。如果逻辑是与DOM直接相关的，那么这部分逻辑适合放到父组件中实现；如果逻辑是与DOM不直接相关的，那么这部分逻辑适合使用高阶组件抽象，如数据校验、请求发送等。</p>
<h3 id="articleHeader4">5. 注意事项</h3>
<p>1）<strong>不要在组件的render方法中使用高阶组件，尽量也不要在组件的其他生命周期方法中使用高阶组件。</strong>因为高阶组件每次都会返回一个新的组件，在render中使用会导致每次渲染出来的组件都不相等（<code>===</code>），于是每次render，组件都会卸载（unmount），然后重新挂载（mount），既影响了效率，又丢失了组件及其子组件的状态。高阶组件最适合使用的地方是在组件定义的外部，这样就不会受到组件生命周期的影响了。</p>
<p>2）<strong>如果需要使用被包装组件的静态方法，那么必须手动拷贝这些静态方法。</strong>因为高阶组件返回的新组件，是不包含被包装组件的静态方法。<a href="https://github.com/mridgway/hoist-non-react-statics" rel="nofollow noreferrer" target="_blank">hoist-non-react-statics</a>可以帮助我们方便的拷贝组件所有的自定义静态方法。有兴趣的同学可以自行了解。</p>
<p>3）<strong>Refs不会被传递给被包装组件。</strong>尽管在定义高阶组件时，我们会把所有的属性都传递给被包装组件，但是<code>ref</code>并不会传递给被包装组件，因为<code>ref</code>根本不属于React组件的属性。如果你在高阶组件的返回组件中定义了<code>ref</code>，那么它指向的是这个返回的新组件，而不是内部被包装的组件。如果你希望获取被包装组件的引用，你可以把<code>ref</code>的回调函数定义成一个普通属性（给它一个ref以外的名字）。下面的例子就用inputRef这个属性名代替了常规的ref命名：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function FocusInput({ inputRef, ...rest }) {
  return <input ref={inputRef} {...rest} />;
}

//enhance 是一个高阶组件
const EnhanceInput = enhance(FocusInput);

// 在一个组件的render方法中...
return (<EnhanceInput 
  inputRef={(input) => {
    this.input = input
  }
}>)

// 让FocusInput自动获取焦点
this.input.focus();
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">FocusInput</span><span class="hljs-params">({ inputRef, <span class="hljs-rest_arg">...rest</span> })</span> </span>{
  <span class="hljs-keyword">return</span> &lt;input ref={inputRef} {...rest} /&gt;;
}

<span class="hljs-comment">//enhance 是一个高阶组件</span>
<span class="hljs-keyword">const</span> EnhanceInput = enhance(FocusInput);

<span class="hljs-comment">// 在一个组件的render方法中...</span>
<span class="hljs-keyword">return</span> (&lt;EnhanceInput 
  inputRef={(input) =&gt; {
    <span class="hljs-keyword">this</span>.input = input
  }
}&gt;)

<span class="hljs-comment">// 让FocusInput自动获取焦点</span>
<span class="hljs-keyword">this</span>.input.focus();
</code></pre>
<hr>
<p><strong>欢迎关注我的公众号：老干部的大前端，领取21本大前端精选书籍！</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV4lGT?w=540&amp;h=193" src="https://static.alili.tech/img/bV4lGT?w=540&amp;h=193" alt="3808299627-5a93ba468b59a" title="3808299627-5a93ba468b59a" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入理解React 高阶组件

## 原文链接
[https://segmentfault.com/a/1190000010307650](https://segmentfault.com/a/1190000010307650)

