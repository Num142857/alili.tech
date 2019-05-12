---
title: '为何说setState方法是异步的？' 
date: 2019-02-01 2:30:10
hidden: true
slug: 9w2e3vnka5
categories: [reprint]
---

{{< raw >}}

                    
<p>在学习或使用过一阵子React后，你可能会发现一个在<code>setState</code>方法的特性，以下面这个简单例子来说明:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default class SelectBox extends React.Component {
  constructor(props) {
    super(props)
    this.state={value: ''}
  }

  handleChange = (e) => {
    this.setState({value: e.target.value})
    console.log(this.state.value)
  }

  render() {
      return(
         <div>
             <select onChange={this.handleChange} value={this.state.value}>
                <option value=&quot;JavaScript&quot; key={1}>JavaScript</option>
                <option value=&quot;Angular2&quot; key={2}>Angular2</option>
                <option value=&quot;React&quot; key={3}>React</option>
             </select>
             <h1>{this.state.value}</h1>
         </div>
      )
   }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">SelectBox</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props)
    <span class="hljs-keyword">this</span>.state={<span class="hljs-attr">value</span>: <span class="hljs-string">''</span>}
  }

  handleChange = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
    <span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">value</span>: e.target.value})
    <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.state.value)
  }

  render() {
      <span class="hljs-keyword">return</span>(
         <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
             <span class="hljs-tag">&lt;<span class="hljs-name">select</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{this.handleChange}</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{this.state.value}</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"JavaScript"</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{1}</span>&gt;</span>JavaScript<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"Angular2"</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{2}</span>&gt;</span>Angular2<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">option</span> <span class="hljs-attr">value</span>=<span class="hljs-string">"React"</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{3}</span>&gt;</span>React<span class="hljs-tag">&lt;/<span class="hljs-name">option</span>&gt;</span>
             <span class="hljs-tag">&lt;/<span class="hljs-name">select</span>&gt;</span>
             <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>{this.state.value}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
         <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
      )
   }
}</code></pre>
<p>我们在<code>handleChange</code>方法中，呼叫<code>setState</code>来更新选项的值，然后在控制台中输出这个值。看起来一切都是很符合逻辑，但你如果一执行就会发现，在控制台中输出的<code>this.state.value</code>，并不会在呼叫<code>setState</code>方法后立即就变动。像下面的执行的结果图一样:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007454083?w=464&amp;h=630" src="https://static.alili.tech/img/remote/1460000007454083?w=464&amp;h=630" alt="执行结果" title="执行结果" style="cursor: pointer; display: inline;"></span></p>
<p>当然，如果你直接输出的是<code>e.target.value</code>，一定是正确的值，但在某些情况下，我们要取用的并不是这个事件的值，而是要更动过后的state(状态)值。</p>
<p>如果要在<code>setState</code>方法后，直接取用更动后的<code>state</code>值，正确的使用方式，在官方文件中的说明，需要利用<code>setState</code>的第二传参，传入一个回调(callback)函式，改为像下面这样的代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.setState({value: e.target.value}, function(){ console.log(this.state.value) })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">value</span>: e.target.value}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.state.value) })</code></pre>
<p>另一个方式则是用<code>componentDidUpdate()</code>这个生命周期方法，把确定<code>state</code>更新后要执行的代码放在里面，如下面的代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentDidUpdate(){
  console.log(this.state.value)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">componentDidUpdate(){
  <span class="hljs-built_in">console</span>.log(<span class="hljs-keyword">this</span>.state.value)
}</code></pre>
<p>为什么一定要这样作的主要原因是:</p>
<blockquote><p><code>setState</code>这个方法，它在React中的执行行为可以认为"异步的"</p></blockquote>
<p>虽然<code>setState</code>并非使用了<code>setTimeout</code>或promise的那种进入到事件回圈(Event loop)的异步执行，但它的执行行为在React库中时，的确是异步的，也就是有延时执行的行为。以官方文件中较精确的说法 - "<strong>它不是保证同步的</strong>"。</p>
<p><code>setState</code>方法与包含在其中的执行是一个很复杂的过程，这段程式码从React最初的版本到现在，也有无数次的修改。它的工作除了要更动<code>this.state</code>之外，还要负责触发重新渲染(render)，这里面要经过React核心中diff演算法，最终才能决定是否要进行重渲染，以及如何渲染。而且为了批次与效能的理由，多个<code>setState</code>呼叫有可能在执行过程中还需要被合并，所以它被设计以异步的或延时的来进行执行是相当合理的。</p>
<p>那么<code>setState</code>会在何时以同步的方式来执行，也就是立即更动<code>this.state</code>？答案是在React库控制之外时，它就会以同步的方式来执行，在下面两篇文章中，都有类似的例子:</p>
<ul>
<li><p><a href="http://thereignn.ghost.io/on-the-async-nature-of-setstate-in-react/" rel="nofollow noreferrer" target="_blank">http://thereignn.ghost.io/on-...</a></p></li>
<li><p><a href="https://www.bennadel.com/blog/2893-setstate-state-mutation-operation-may-be-synchronous-in-reactjs.htm" rel="nofollow noreferrer" target="_blank">https://www.bennadel.com/blog...</a></p></li>
</ul>
<p>但大部份的使用情况下，我们都是使用了React库中的表单组件，例如select、input、button等等，它们都是React库中人造的组件与事件，是处于React库的控制之下，在这个情况下，<code>setState</code>就会以异步的方式执行。所以一般来说，我们会认为<code>setState</code>就是异步执行，并不是用原始码来看它是不是有使用像<code>setTimeout</code>或<code>Promise</code>之类的方式转为JavaScript的异步执行方式，而是以它在React库的控制之下，以执行行为与顺序来认定。</p>
<p>以下是翻自官方setState原代码的注解，官网的说明也是类似:</p>
<blockquote>
<p>不保证<code>this.state</code>会立即更新，所以在调用这个方法后存取<code>this.state</code>可能会回传旧的值。</p>
<p>不保证呼叫<code>setState</code>就会同步地执行，而它们也可能最终被被批量调用(多次呼叫的情况下)。你可以提供额外的回调(callback)，回调(callback)将会在<code>setState</code>实际被完成时被执行。</p>
</blockquote>
<p>因此，很早就有开发者提出来关于<code>setState</code>常令初学者感到怪异的执行情况，在某些情况下会造成执行后会看到不连续的结果。除了<code>setState</code>方法有异步执行的行为外，它还有几个被提出来的特殊行为:</p>
<h3 id="articleHeader0">1. <code>setState</code>可能会引发不必要的渲染(renders)</h3>
<p><code>state</code>本身的设计是无法直接更改，<code>setState</code>的设计是用来更动<code>state</code>值，也会触发重新渲染(re-render)，按照逻辑就是反正不管如何，只要开发者呼叫<code>setState</code>，React就去作整个视图的重新渲染就是。所以<code>setState</code>必定会作重新渲染的执行，只是要如何渲染是由React来决定。</p>
<p>重新渲染(re-render)指的主要是页面上视图(View)的重新再呈现，这是React原本的核心设计，但这个设计是有一些问题的。最主要的是state(状态)并不一定单纯只用来记录与视图(View)有关的状态，也有可能是某个内部控制用的属性值，或是只套用在内部使用的资料。当你改变了这些与视图无关的state(状态)值，以现在的React设计来说，照样要触发重新渲染的执行过程，这在某些复杂的应用时，由于造成不必要的渲染，也有可能造成效能上的问题。</p>
<p>当然，React提供了<code>shouldComponentUpdate</code>方法让开发者可以自行判断，自行提供对应的解决方式。也有<a href="https://facebook.github.io/react/docs/perf.html" rel="nofollow noreferrer" target="_blank">Performance Tools</a>可以进行剖析检测。算得上是一些补强的作法。</p>
<h3 id="articleHeader1">2. <code>setState</code>无法完全掌控应用中所有组件的状态</h3>
<p><code>state</code>(状态)是独立于每个组件内部的，而且它是个不能直接更动的对象，这个设计当然是为了要保持组件的封装与独立性，但所以如果当要开发一个复杂的应用时，必定需要使用那些能掌控所有组件资料，以及能提供各组件间资料互动的函式库，例如Flux, Redux或MobX等等。</p>
<p>React组件目前只能透过各种生命周期的方法，与外部资源、计时器或DOM事件来进行挂勾(Hook)，这些都无法直接使用<code>setState</code>方法来进行管理，因此<code>setState</code>并没有办法完全掌控一个应用中所有组件的状态，它比较像是每个组件中的都有的一种接口方法，单纯要依靠<code>setState</code>方法来管控整个React应用，完全是不足够的。</p>
<p>以上说明参考自这篇文章: <a href="https://medium.com/@mweststrate/3-reasons-why-i-stopped-using-react-setstate-ab73fc67a42e#.hfcnguohj" rel="nofollow noreferrer" target="_blank">3 Reasons why I stopped using React.setState</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
为何说setState方法是异步的？

## 原文链接
[https://segmentfault.com/a/1190000007454080](https://segmentfault.com/a/1190000007454080)

