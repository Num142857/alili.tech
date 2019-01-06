---
title: '深入浅出React高阶组件' 
date: 2019-01-06 2:30:10
hidden: true
slug: im7tmbaz62
categories: [reprint]
---

{{< raw >}}

                    
<p>博客地址：<a href="http://www.luckyjing.com/post/react-hoc.html" rel="nofollow noreferrer" target="_blank">http://www.luckyjing.com/post...</a></p>
<h1 id="articleHeader0">背景知识</h1>
<p>在开始讲述<strong>高阶组件</strong>前，我们先来回顾<strong>高阶函数</strong>的定义：接收函数作为输入，或者输出另一个函数的一类函数，被称作高阶函数。对于<strong>高阶组件</strong>，它描述的便是接受React组件作为输入，输出一个新的React组件的组件。</p>
<p>更通俗地描述为，<strong>高阶组件</strong>通过包裹（wrapped）被传入的React组件，经过一系列处理，最终返回一个相对增强（enhanced）的React组件，供其他组件调用。</p>
<h1 id="articleHeader1">实现一个高阶组件</h1>
<p>下面我们来实现一个最简单的高阶组件（函数），它接受一个React组件，包裹后然后返回。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function withHeader(WrappedComponent) {
  return class HOC extends Component {
    render() {
      return <div>
        <div className=&quot;demo-header&quot;>
          我是标题
        </div>
        <WrappedComponent {...this.props}/>
      </div>
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">withHeader</span>(<span class="hljs-params">WrappedComponent</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HOC</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
      <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"demo-header"</span>&gt;</span>
          我是标题
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">WrappedComponent</span> {<span class="hljs-attr">...this.props</span>}/&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    }
  }
}</span></code></pre>
<p>在其他组件里，我们引用这个高阶组件，用来强化它。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@withHeader
export default class Demo extends Component {
  render() {
    return (
      <div>
        我是一个普通组件
      </div>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">@withHeader
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Demo</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        我是一个普通组件
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    );
  }
}</code></pre>
<p>在这里使用了<code>ES7</code>里的<code>decorator</code>，来提升写法上的优雅，但是实际上它只是一个语法糖，下面这种写法也是可以的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const EnhanceDemo = withHeader(Demo);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> EnhanceDemo = withHeader(Demo);</code></pre>
<p>随后，观察React组件树发生了什么变化，如图所示，可以发现Demo组件被HOC组件包裹起来了，符合了高阶组件的预期，即组件是层层包裹起来的，如同洋葱一样。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010371757" src="https://static.alili.tech/img/remote/1460000010371757" alt="" title="" style="cursor: pointer;"></span></p>
<p>但是随之带来的问题是，如果这个高阶组件被使用了多次，那么在调试的时候，将会看到一大堆<code>HOC</code>，所以这个时候需要做一点小优化，就是在高阶组件包裹后，应当保留其原有名称。</p>
<p>我们改写一下上述的高阶组件代码，增加了<code>getDisplayName</code>函数以及静态属性<code>displayName</code>，此时再去观察<code>DOM Tree</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function getDisplayName(component) {
  return component.displayName || component.name || 'Component';
}
export default function (WrappedComponent) {
  return class HOC extends Component {
    static displayName = `HOC(${getDisplayName(WrappedComponent)})`
    render() {
      return <div>
        <div className=&quot;demo-header&quot;>
          我是标题
        </div>
        <WrappedComponent {...this.props}/>
      </div>
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getDisplayName</span>(<span class="hljs-params">component</span>) </span>{
  <span class="hljs-keyword">return</span> component.displayName || component.name || <span class="hljs-string">'Component'</span>;
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">WrappedComponent</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HOC</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    <span class="hljs-keyword">static</span> displayName = <span class="hljs-string">`HOC(<span class="hljs-subst">${getDisplayName(WrappedComponent)}</span>)`</span>
    render() {
      <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"demo-header"</span>&gt;</span>
          我是标题
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">WrappedComponent</span> {<span class="hljs-attr">...this.props</span>}/&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    }
  }
}</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010371758" src="https://static.alili.tech/img/remote/1460000010371758" alt="" title="" style="cursor: pointer;"></span><br>此时，原本组件的名称正确地显示在了<code>DOM Tree</code>上。</p>
<p>这个简单的例子里高阶组件只做了一件事，那便是<strong>为被包裹的组件添加一个标题样式</strong>。这个高阶组件可以用到任何一个需要添加此逻辑的组件上，只需要被此高阶组件修饰即可。<br></p>
<p>由此可以看出，高阶组件的主要功能是封装并抽离组件的通用逻辑，让此部分逻辑在组件间更好地被复用。</p>
<h2 id="articleHeader2">高阶组件的进阶用法</h2>
<h2 id="articleHeader3">组件参数</h2>
<p>还是以上述例子为例，此高阶组件仅仅只是展示了<strong>我是标题</strong>这个名称，但是为了更好的抽象，此标题应当可以被参数化，如下方式调用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 如果传入参数，则传入的参数将作为组件的标题呈现
@withHeader('Demo') 
export default class Demo extends Component {
  render() {
    return (
      //...
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 如果传入参数，则传入的参数将作为组件的标题呈现</span>
@withHeader(<span class="hljs-string">'Demo'</span>) 
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Demo</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="hljs-comment">//...</span>
    );
  }
}</code></pre>
<p><code>withHeader</code>需要被改写成如下形式，它接受一个参数，然后返回一个高阶组件（函数）。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function (title) {
  return function (WrappedComponent) {
    return class HOC extends Component {
      render() {
        return <div>
          <div className=&quot;demo-header&quot;>
            {title
              ? title
              : '我是标题'}
          </div>
          <WrappedComponent {...this.props}/>
        </div>
      }
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">title</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">WrappedComponent</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HOC</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
      render() {
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"demo-header"</span>&gt;</span>
            {title
              ? title
              : '我是标题'}
          <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">WrappedComponent</span> {<span class="hljs-attr">...this.props</span>}/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      }
    }
  }
}</span></code></pre>
<p>使用ES6写法可以更加简洁。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default(title) => (WrappedComponent) => class HOC extends Component {
  render() {
    return <div>
      <div className=&quot;demo-header&quot;>
        {title
          ? title
          : '我是标题'}
      </div>
      <WrappedComponent {...this.props}/>
    </div>
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span>(title) =&gt; <span class="hljs-function">(<span class="hljs-params">WrappedComponent</span>) =&gt;</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HOC</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"demo-header"</span>&gt;</span>
        {title
          ? title
          : '我是标题'}
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">WrappedComponent</span> {<span class="hljs-attr">...this.props</span>}/&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  }
}</span></code></pre>
<p>如图可以看到，传入的参数已经反映在<code>DOM Tree</code>里了。<br><span class="img-wrap"><img data-src="/img/remote/1460000010371759" src="https://static.alili.tech/img/remote/1460000010371759" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote>
<p>柯里化 Curry </p>
<p>概念：只传递函数的一部分参数来调用它，让它返回一个函数去处理剩下的参数。</p>
<p>函数签名：fun(params)(otherParams)</p>
<p>应用：在React里，通过柯里化，我们可以通过传入不同的参数来得到不同的高阶组件。</p>
</blockquote>
<h2 id="articleHeader4">基于属性代理的方式</h2>
<p>属性代理是最常见的高阶组件的使用方式，上述描述的高阶组件就是这种方式。它通过做一些操作，将被包裹组件的<code>props</code>和新生成的<code>props</code>一起传递给此组件，这称之为属性代理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function withHeader(WrappedComponent) {
  return class HOC extends Component {
    render() {
      const newProps = {
        test:'hoc'
      }
      // 透传props，并且传递新的newProps
      return <div>
        <WrappedComponent {...this.props} {...newProps}/>
      </div>
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">withHeader</span>(<span class="hljs-params">WrappedComponent</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">HOC</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    render() {
      <span class="hljs-keyword">const</span> newProps = {
        <span class="hljs-attr">test</span>:<span class="hljs-string">'hoc'</span>
      }
      <span class="hljs-comment">// 透传props，并且传递新的newProps</span>
      <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">WrappedComponent</span> {<span class="hljs-attr">...this.props</span>} {<span class="hljs-attr">...newProps</span>}/&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    }
  }
}</span></code></pre>
<h2 id="articleHeader5">基于反向继承的方式</h2>
<p>这种方式返回的React组件继承了被传入的组件，所以它能够访问到的区域、权限更多，相比属性代理方式，它更像打入组织内部，对其进行修改。具体的可以参考附录里提供的链接进行深入学习。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function (WrappedComponent) {
  return class Inheritance extends WrappedComponent {
    componentDidMount() {
      // 可以方便地得到state，做一些更深入的修改。
      console.log(this.state);
    }
    render() {
      return super.render();
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">WrappedComponent</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Inheritance</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">WrappedComponent</span> </span>{
    componentDidMount() {
      <span class="hljs-comment">// 可以方便地得到state，做一些更深入的修改。</span>
      <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.state);
    }
    render() {
      <span class="hljs-keyword">return</span> <span class="hljs-keyword">super</span>.render();
    }
  }
}</code></pre>
<h2 id="articleHeader6">组合多个高阶组件</h2>
<p>上述高阶组件为React组件增强了一个功能，如果需要同时增加多个功能需要怎么做？这种场景非常常见，例如我既需要增加一个组件标题，又需要在此组件未加载完成时显示Loading。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@withHeader
@withLoading
class Demo extends Component{

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">@withHeader
@withLoading
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Demo</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span></span>{

}</code></pre>
<p>使用<code>compose</code>可以简化上述过程，也能体现函数式编程的思想。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const enhance = compose(withHeader,withLoading);
@enhance
class Demo extends Component{

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>const enhance = compose(withHeader,withLoading);
<span class="hljs-meta">@enhance</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Demo</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span></span>{

}</code></pre>
<blockquote>
<p>组合 <code>Compose</code></p>
<p><code>compose</code>可以帮助我们组合任意个（包括0个）高阶函数，例如<code>compose(a,b,c)</code>返回一个新的函数<code>d</code>，函数<code>d</code>依然接受一个函数作为入参，只不过在内部会依次调用<code>c,b,a</code>，<strong>从表现层对使用者保持透明</strong>。</p>
<p>基于这个特性，我们便可以非常便捷地为某个组件<strong>增强或减弱</strong>其特征，只需要去变更compose函数里的参数个数便可。</p>
<p><code>compose</code>函数实现方式有很多种，这里推荐其中一个<code>recompact.compose</code>，详情见下方参考类库。</p>
</blockquote>
<h1 id="articleHeader7">高阶组件实战</h1>
<h2 id="articleHeader8">实现一个loading组件</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010371760" src="https://static.alili.tech/img/remote/1460000010371760" alt="" title="" style="cursor: pointer;"></span><br>实现Loading组件时，发现需要去拦截它的渲染过程，故使用了<strong>反向继承</strong>的方式来完成。</p>
<p>在通过装饰器调用时，需要传入一个函数作为入参，函数可以获取到<code>props</code>，随后返回一个<code>Boolean</code>对象，来决定组件是否需要显示<code>Loading</code>态</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import React, {Component} from 'react';
import {Spin} from 'antd';
export default function (loadingCheck) {
  return function (WrappedComponent) {
    return class extends WrappedComponent {
      componentWillUpdate(nextProps, nextState) {
        console.log('withLoading将会更新');
      }
      render() {
        if (loadingCheck(this.props)) {
          return <Spin tip=&quot;加载中&quot; size=&quot;large&quot;>
            {super.render()}
          </Spin>
        } else {
          return super.render();
        }
      }
    }
  }
}

// 使用
@withLoading(props => {
  return props.IndexStore.accountList.length == 0;
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> React, {Component} <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> {Spin} <span class="hljs-keyword">from</span> <span class="hljs-string">'antd'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">loadingCheck</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">WrappedComponent</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">WrappedComponent</span> </span>{
      componentWillUpdate(nextProps, nextState) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'withLoading将会更新'</span>);
      }
      render() {
        <span class="hljs-keyword">if</span> (loadingCheck(<span class="hljs-keyword">this</span>.props)) {
          <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Spin</span> <span class="hljs-attr">tip</span>=<span class="hljs-string">"加载中"</span> <span class="hljs-attr">size</span>=<span class="hljs-string">"large"</span>&gt;</span>
            {super.render()}
          <span class="hljs-tag">&lt;/<span class="hljs-name">Spin</span>&gt;</span></span>
        } <span class="hljs-keyword">else</span> {
          <span class="hljs-keyword">return</span> <span class="hljs-keyword">super</span>.render();
        }
      }
    }
  }
}

<span class="hljs-comment">// 使用</span>
@withLoading(<span class="hljs-function"><span class="hljs-params">props</span> =&gt;</span> {
  <span class="hljs-keyword">return</span> props.IndexStore.accountList.length == <span class="hljs-number">0</span>;
})</code></pre>
<h2 id="articleHeader9">实现一个copy组件</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010371761" src="https://static.alili.tech/img/remote/1460000010371761" alt="" title="" style="cursor: pointer;"></span><br>实现<code>copy</code>组件的时候，我们发现不需要去改变组件内部的展示方式，只是为其在外围增加一个功能，并不会侵入被传入的组件，故使用了<strong>属性代理</strong>的方式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import gotem from 'gotem';
import React, {Component} from 'react';
import ReactDom from 'react-dom';
import {message} from 'antd';
export default copy = (targetName) => {
  return (WrappedComponent) => {
    return class extends Component {
      componentDidMount() {
        const ctx = this;
        const dom = ReactDom.findDOMNode(ctx);
        const nodes = {
          trigger: dom,
          // targetName为DOM选择器，复制组件将会复制它的值
          target: dom.querySelector(targetName)
        };
        gotem(nodes.trigger, nodes.target, {
          success: function () {
            message.success('复制成功');
          },
          error: function () {
            message.error('复制失败，请手动输入');
          }
        });
      }
      render() {
        return <WrappedComponent {...this.props}/>;
      }
    };
  };
}
// 使用
// 传入 h3 ，让复制组件去获取它的值
@copy('h3')
class Info extends Component {
  render() {
    return (
      <div>
        <h3>
          阿里云,点击复制这段文字
        </h3>
      </div>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> gotem <span class="hljs-keyword">from</span> <span class="hljs-string">'gotem'</span>;
<span class="hljs-keyword">import</span> React, {Component} <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>;
<span class="hljs-keyword">import</span> ReactDom <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>;
<span class="hljs-keyword">import</span> {message} <span class="hljs-keyword">from</span> <span class="hljs-string">'antd'</span>;
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> copy = <span class="hljs-function">(<span class="hljs-params">targetName</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">WrappedComponent</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
      componentDidMount() {
        <span class="hljs-keyword">const</span> ctx = <span class="hljs-keyword">this</span>;
        <span class="hljs-keyword">const</span> dom = ReactDom.findDOMNode(ctx);
        <span class="hljs-keyword">const</span> nodes = {
          <span class="hljs-attr">trigger</span>: dom,
          <span class="hljs-comment">// targetName为DOM选择器，复制组件将会复制它的值</span>
          target: dom.querySelector(targetName)
        };
        gotem(nodes.trigger, nodes.target, {
          <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            message.success(<span class="hljs-string">'复制成功'</span>);
          },
          <span class="hljs-attr">error</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            message.error(<span class="hljs-string">'复制失败，请手动输入'</span>);
          }
        });
      }
      render() {
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">WrappedComponent</span> {<span class="hljs-attr">...this.props</span>}/&gt;</span>;
      }
    };
  };
}
// 使用
// 传入 h3 ，让复制组件去获取它的值
@copy('h3')
class Info extends Component {
  render() {
    return (
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>
          阿里云,点击复制这段文字
        <span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    );
  }
}</span></code></pre>
<h1 id="articleHeader10">与父组件区别</h1>
<p>高阶组件作为一个函数，它可以更加纯粹地关注业务逻辑层面的代码，比如数据处理，数据校验，发送请求等，可以改善目前代码里业务逻辑和UI逻辑混杂在一起的现状。父组件则是UI层的东西，我们先前经常把一些业务逻辑处理放在父组件里，这样会造成父组件混乱的情况。为了代码进一步解耦，可以考虑使用高阶组件这种模式。</p>
<h1 id="articleHeader11">开源的高阶组件使用赏析</h1>
<h2 id="articleHeader12">recompact</h2>
<p><code>recompact</code>提供了一系列使用的高阶组件，可以增强组件的行为，可以利用此库学习高阶组件的写法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import recompact from 'recompact'
import { pure, withProps } from 'recompact'

const enhance = recompact.compose(
  withProps({ className: 'beautiful' }),
  pure,
)
@enhance
class Demo extends Component{

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> recompact <span class="hljs-keyword">from</span> <span class="hljs-string">'recompact'</span>
<span class="hljs-keyword">import</span> { pure, withProps } <span class="hljs-keyword">from</span> <span class="hljs-string">'recompact'</span>

<span class="hljs-keyword">const</span> enhance = recompact.compose(
  withProps({ <span class="hljs-attr">className</span>: <span class="hljs-string">'beautiful'</span> }),
  pure,
)
@enhance
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Demo</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span></span>{

}</code></pre>
<h2 id="articleHeader13">React Sortable</h2>
<p>通过使用此库提供的高阶组件，可以方便地让列表元素可拖动。</p>
<h1 id="articleHeader14">总结</h1>
<p>高阶组件是<code>Decorator</code>模式在<code>React</code>的一种实现，它可以抽离公共逻辑，像洋葱一样层层叠加给组件，每一层职能分明，可以方便地抽离与增添。在优化代码或解耦组件时，可以考虑使用高阶组件模式。</p>
<h1 id="articleHeader15">参考</h1>
<ul>
<li>
<a href="https://github.com/neoziro/recompact" rel="nofollow noreferrer" target="_blank">recompact</a>：包含了一系列实用的高阶组件库</li>
<li>
<a href="https://github.com/clauderic/react-sortable-hoc" rel="nofollow noreferrer" target="_blank">React Sortable</a>：React拖动库</li>
<li>
<a href="http://www.jianshu.com/p/0aae7d4d9bc1" rel="nofollow noreferrer" target="_blank">深入理解 React 高阶组件</a>：其中详细介绍了属性代理和反向继承的区别。</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
深入浅出React高阶组件

## 原文链接
[https://segmentfault.com/a/1190000010371752](https://segmentfault.com/a/1190000010371752)

