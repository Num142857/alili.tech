---
title: 'React中元素与组件的区别' 
date: 2019-01-19 2:30:10
hidden: true
slug: agx80jkcr9k
categories: [reprint]
---

{{< raw >}}

                    
<p>在初学 React 的时候，分不清 React 组件和 React 元素，着实踩了一些坑。搞清楚 React 中什么是组件，什么是元素，既可以理清楚概念，也可以让你避免一些不必要的错误。</p>
<h2 id="articleHeader0">React 元素</h2>
<p>React 元素（React element），它是 React 中最小基本单位，我们可以使用 JSX 语法轻松地创建一个 React 元素:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const element = <div className=&quot;element&quot;>I'm element</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">const</span> element = <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">className</span>=<span class="hljs-string">"element"</span>&gt;</span>I'm element<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span></code></pre>
<p>React 元素不是真实的 DOM 元素，它仅仅是 js 的普通对象（plain objects），所以也没办法直接调用 DOM 原生的 API。上面的 JSX 转译后的对象大概是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    _context: Object,
    _owner: null,
    key: null,
    props: {
    className: 'element'，
    children: 'I'm element'
  },
    ref: null,
    type: &quot;div&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">{</span>
<span class="hljs-attr">    _context:</span> <span class="hljs-string">Object,</span>
<span class="hljs-attr">    _owner:</span> <span class="hljs-literal">null</span><span class="hljs-string">,</span>
<span class="hljs-attr">    key:</span> <span class="hljs-literal">null</span><span class="hljs-string">,</span>
<span class="hljs-attr">    props:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    className:</span> <span class="hljs-string">'element'</span><span class="hljs-string">，</span>
<span class="hljs-attr">    children:</span> <span class="hljs-string">'I'</span><span class="hljs-string">m</span> <span class="hljs-string">element'</span>
  <span class="hljs-string">},</span>
<span class="hljs-attr">    ref:</span> <span class="hljs-literal">null</span><span class="hljs-string">,</span>
<span class="hljs-attr">    type:</span> <span class="hljs-string">"div"</span>
<span class="hljs-string">}</span></code></pre>
<p>只有在这个元素渲染被完成后，才能通过选择器的方式获取它对应的 DOM 元素。不过，按照 React 有限状态机的设计思想，应该使用状态和属性来表述组件，要尽量避免 DOM 操作，即便要进行 DOM 操作，也应该使用 React 提供的接口<code>ref</code>和<code>getDOMNode()</code>。一般使用 React 提供的接口就足以应付需要 DOM 操作的场景了，因此像 jQuery 强大的选择器在 React 中几乎没有用武之地了。 </p>
<p>除了使用 JSX 语法，我们还可以使用 <code>React.createElement()</code> 和 <code>React.cloneElement()</code> 来构建 React 元素。</p>
<h3 id="articleHeader1">React.createElement()</h3>
<p>JSX 语法就是用<code>React.createElement()</code>来构建 React 元素的。它接受三个参数，第一个参数可以是一个标签名。如<code>div</code>、<code>span</code>，或者 React 组件。第二个参数为传入的属性。第三个以及之后的参数，皆作为组件的子组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.createElement(
    type,
    [props],
    [...children]
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">React</span><span class="hljs-selector-class">.createElement</span>(
    <span class="hljs-selector-tag">type</span>,
    <span class="hljs-selector-attr">[props]</span>,
    <span class="hljs-selector-attr">[...children]</span>
)</code></pre>
<h3 id="articleHeader2">React.cloneElement()</h3>
<p><code>React.cloneElement()</code>与<code>React.createElement()</code>相似，不同的是它传入的第一个参数是一个 React 元素，而不是标签名或组件。新添加的属性会并入原有的属性，传入到返回的新元素中，而就的子元素奖杯替换。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React.cloneElement(
  element,
  [props],
  [...children]
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">React</span><span class="hljs-selector-class">.cloneElement</span>(
  <span class="hljs-selector-tag">element</span>,
  <span class="hljs-selector-attr">[props]</span>,
  <span class="hljs-selector-attr">[...children]</span>
)</code></pre>
<h2 id="articleHeader3">React 组件</h2>
<p>React 中有三种构建组件的方式。<code>React.createClass()</code>、<code>ES6 class</code>和无状态函数。</p>
<h3 id="articleHeader4">React.createClass()</h3>
<p><code>React.createClass()</code>是三种方式中最早，兼容性最好的方法。在0.14版本前官方指定的组件写法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var Greeting = React.createClass({
  render: function() {
    return <h1>Hello, {this.props.name}</h1>;
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> Greeting = React.createClass({
  <span class="hljs-attr">render</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello, {this.props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
  }
});</code></pre>
<h3 id="articleHeader5">ES6 class</h3>
<p><code>ES6 class</code>是目前官方推荐的使用方式，它使用了ES6标准语法来构建，但它的实现仍是调用<code>React.createClass()</code>来实现了，<code>ES6 class</code>的生命周期和自动绑定方式与<code>React.createClass()</code>略有不同。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Greeting extemds React.Component{
  render: function() {
    return <h1>Hello, {this.props.name}</h1>;
  }
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Greeting</span> <span class="hljs-title">extemds</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
  render: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello, {this.props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
  }
};
</code></pre>
<h3 id="articleHeader6">无状态函数</h3>
<p>无状态函数是使用函数构建的无状态组件，无状态组件传入<code>props</code>和<code>context</code>两个参数，它没有<code>state</code>，除了<code>render()</code>，没有其它生命周期方法。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Greeting (props) {
  return <h1>Hello, {props.name}</h1>;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Greeting</span> (<span class="hljs-params">props</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello, {props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>;
}</code></pre>
<p><code>React.createClass()</code>和<code>ES6 class</code>构建的组件的数据结构是类，无状态组件数据结构是函数，它们在 React 被视为是一样的。</p>
<h2 id="articleHeader7">元素与组件的区别</h2>
<p>组件是由元素构成的。元素数据结构是普通对象，而组件数据结构是类或纯函数。除此之外，还有几点区别要注意：</p>
<h3 id="articleHeader8">this.props.children</h3>
<p>在 JSX 中，被元素嵌套的元素会以属性 children 的方式传入该元素的组件。当仅嵌套一个元素时，children 是一个 React 元素，当嵌套多个元素时，children 是一个 React 元素的数组。可以直接把 children 写入 JSX 的中，但如果要给它们传入新属性，就要用到<code>React.cloneElement()</code>来构建新的元素。我曾放过以下错误:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render () {
  var Child = this.props.children
  return <div><Child tip={'error!'}/><div>
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>render () {
  <span class="hljs-keyword">var</span> Child = <span class="hljs-keyword">this</span>.props.children
  <span class="hljs-keyword">return</span> &lt;div&gt;&lt;Child tip={<span class="hljs-string">'error!'</span>}/&gt;&lt;div&gt;
}</code></pre>
<p>因为 Child 是一个 React 元素，而不是组件，这样的写法是完全错误的，正确的方式应该是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render () {
  var child = this.props.children
  return <div>{ React.cloneElement(child, {tip: 'right way!'}) }<div>
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>render () {
  <span class="hljs-keyword">var</span> child = <span class="hljs-keyword">this</span>.props.children
  <span class="hljs-keyword">return</span> &lt;div&gt;{ React.cloneElement(child, {tip: <span class="hljs-string">'right way!'</span>}) }&lt;div&gt;
}</code></pre>
<p>就这样，原有属性和新添加的属性被一并传入了子元素。使用<code>React.cloneElement()</code>才是操作元素的正确姿势。</p>
<h3 id="articleHeader9">用户组件</h3>
<p>有的时候，组件可以让用户以属性的方式传入自定义的组件，来提升组件的灵活性。这个属性传入的就应该是 React 元素，而非 React 组件。使用 React 元素可以让用户传入自定义组件的同时，为组件添加属性。同样，可以使用<code>React.cloneElement()</code>为自定义组件添加更多属性，或替换子元素。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 推荐
<MyComponent tick={
  <UserComponent tip=&quot;Yes&quot;/>
} />

// 不推荐
<MyComponent tick={ UserComponent } />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml">// 推荐
<span class="hljs-tag">&lt;<span class="hljs-name">MyComponent</span> <span class="hljs-attr">tick</span>=<span class="hljs-string">{</span>
  &lt;<span class="hljs-attr">UserComponent</span> <span class="hljs-attr">tip</span>=<span class="hljs-string">"Yes"</span>/&gt;</span>
} /&gt;

// 不推荐
<span class="hljs-tag">&lt;<span class="hljs-name">MyComponent</span> <span class="hljs-attr">tick</span>=<span class="hljs-string">{</span> <span class="hljs-attr">UserComponent</span> } /&gt;</span></span></code></pre>
<h2 id="articleHeader10">最后</h2>
<p>最后，打个不恰当的比喻，React 组件是<code>MyComponent</code>，React 元素就是<code>&lt;MyComponent /&gt;</code>。</p>
<h2 id="articleHeader11">AD</h2>
<p><a href="http://4bin.cn/blog" rel="nofollow noreferrer" target="_blank">新开博客，更多文章，陆续更新中...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React中元素与组件的区别

## 原文链接
[https://segmentfault.com/a/1190000008587988](https://segmentfault.com/a/1190000008587988)

