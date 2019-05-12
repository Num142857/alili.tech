---
title: '[译] React 组件中绑定回调' 
date: 2019-02-06 2:30:09
hidden: true
slug: ievxu5omngn
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://medium.com/@rjun07a/binding-callbacks-in-react-components-9133c0b396c6#.3urgr8cnw" rel="nofollow noreferrer" target="_blank">原文：Binding callbacks in React components</a></p>
<p>在组件中给事件绑定处理函数是很常见的，比如说每当用户点击一个button的时候使用<code>console.log</code>打印一些东西。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class DankButton extends React.Component {
  render() {
    return <button onClick={this.handleClick}>Click me!</button>
  }
  
  handleClick() {
    console.log(`such knowledge`)
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">DankButton</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> &lt;button onClick={<span class="hljs-keyword">this</span>.handleClick}&gt;<span class="hljs-type">Click</span> me!&lt;/button&gt;
  }
  
  handleClick() {
    console.log(`such knowledge`)
  }
}
</code></pre>
<p>很好，这段代码会满足你的需求，那现在如果我想在<code>handleClick()</code>内调用另外一个方法，比如<code>logPhrase()</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class DankButton extends React.Component {
  render() {
    return <button onClick={this.handleClick}>Click me!</button>
  }
  
  handleClick() {
    this.logPhrase()
  }
  
  logPhrase() {
    console.log('such gnawledge')
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">DankButton</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> &lt;button onClick={<span class="hljs-keyword">this</span>.handleClick}&gt;<span class="hljs-type">Click</span> me!&lt;/button&gt;
  }
  
  handleClick() {
    <span class="hljs-keyword">this</span>.logPhrase()
  }
  
  logPhrase() {
    console.log(<span class="hljs-symbol">'such</span> gnawledge')
  }
}
</code></pre>
<p>这样竟然不行，会得到如下的错误提醒</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="TypeError: this.logPhrase is not a function at handleClick (file.js:36:12)
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>TypeError: this<span class="hljs-selector-class">.logPhrase</span> is not <span class="hljs-selector-tag">a</span> function at handleClick (file<span class="hljs-selector-class">.js</span>:<span class="hljs-number">36</span>:<span class="hljs-number">12</span>)
</code></pre>
<p>当我们把<code>handleClick</code>绑定到 <code>onClick</code>的时候我们传递的是一个函数的引用，真正调用<code>handleClick</code>的是事件处理系统。因此<code>handleClick</code> 的<code>this</code>上下文和我门想象的<code>this.logPhrase()</code>是不一样的。</p>
<p>这里有一些方法可以让<code>this</code>指向DankButton组件。</p>
<h4>不好的方案 1：箭头函数</h4>
<p>箭头函数是在ES6中引入的，是一个写匿名函数比较简洁的方式，它不仅仅是包装匿名函数的语法糖，箭头函数没有自己的上下问，它会使用被定义的时候的<code>this</code>作为上下文，我们可以利用这个特性，给<code>onClick</code>绑定一个箭头函数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class DankButton extends React.Component {
  render() {
    // Bad Solution: An arrow function!
    return <button onClick={() => this.handleClick()}>Click me!</button>
  }
  
  handleClick() {
    this.logPhrase()
  }
  
  logPhrase() {
    console.log('such gnawledge')
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">DankButton</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-comment">// Bad Solution: An arrow function!</span>
    <span class="hljs-keyword">return</span> &lt;button onClick={() =&gt; <span class="hljs-keyword">this</span>.handleClick()}&gt;<span class="hljs-type">Click</span> me!&lt;/button&gt;
  }
  
  handleClick() {
    <span class="hljs-keyword">this</span>.logPhrase()
  }
  
  logPhrase() {
    console.log(<span class="hljs-symbol">'such</span> gnawledge')
  }
}
</code></pre>
<p>然而，我并不推荐这种解决方式，因为箭头函数定义在<code>render</code>内部，组件每次重新渲染都会创建一个新的箭头函数，在React中渲染是很快捷的，所以重新渲染会经常发生，这就意味着前面渲染中产生的函数会堆在内存中，强制垃圾回收机制清空它们，这是很花费性能的。</p>
<h4>不好的方案 2：<code>this.handleClick.bind(this)</code>
</h4>
<p>另外一个解决这个问题的方案是，把回调绑定到正确的上下问<code>this</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class DankButton extends React.Component {
  render() {
    // Bad Solution: Bind that callback!
    return <button onClick={this.handleClick.bind(this)}>Click me!</button>
  }
  
  handleClick() {
    this.logPhrase()
  }
  
  logPhrase() {
    console.log('such gnawledge')
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">DankButton</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-comment">// Bad Solution: Bind that callback!</span>
    <span class="hljs-keyword">return</span> &lt;button onClick={<span class="hljs-keyword">this</span>.handleClick.bind(<span class="hljs-keyword">this</span>)}&gt;<span class="hljs-type">Click</span> me!&lt;/button&gt;
  }
  
  handleClick() {
    <span class="hljs-keyword">this</span>.logPhrase()
  }
  
  logPhrase() {
    console.log(<span class="hljs-symbol">'such</span> gnawledge')
  }
}
</code></pre>
<p>这个方案和箭头函数有同样的问题，在每次<code>render</code>的时候都会创建一个新的函数，但是为什么没有使用匿名函数也会这样呢，下面就是答案。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function test() {}

const testCopy = test
const boundTest = test.bind(this)

console.log(testCopy === test) // true
console.log(boundTest === test) // false
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>function <span class="hljs-keyword">test</span>() {}

<span class="hljs-keyword">const</span> testCopy = <span class="hljs-keyword">test</span>
<span class="hljs-keyword">const</span> boundTest = <span class="hljs-keyword">test</span>.bind(this)

console.<span class="hljs-built_in">log</span>(testCopy === <span class="hljs-keyword">test</span>) <span class="hljs-comment">// true</span>
console.<span class="hljs-built_in">log</span>(boundTest === <span class="hljs-keyword">test</span>) <span class="hljs-comment">// false</span>
</code></pre>
<p><code>.bind</code>并不修改原有函数，它只会返回一个指定执行上下文的新函数（boundTest和test并不相等），因此垃圾回收系统仍然需要回收你之前绑定的回调。</p>
<h4>好的方案：在构造函数（constructor）中bind handleClick</h4>
<p>仍然使用 <code>.bind</code> ，现在我们只要绕过每次渲染都要生成新的函数的问题就可以了。我们可以通过只在构造函数中绑定回调的上下问来解决这个问题，因为构造函数只会调用一次，而不是每次渲染都调用。这意味着我们没有生成一堆函数然后让垃圾回收系统清除它们。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class DankButton extends React.Component {
  constructor() {
    super()
    // Good Solution: Bind it in here!
    this.handleClick = this.handleClick.bind(this)  
  }
  
  render() {
    return <button onClick={this.handleClick}>Click me!</button>
  }
  
  handleClick() {
    this.logPhrase()
  }
  
  logPhrase() {
    console.log('such gnawledge')
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">DankButton</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  constructor() {
    <span class="hljs-keyword">super</span>()
    <span class="hljs-comment">// Good Solution: Bind it in here!</span>
    <span class="hljs-keyword">this</span>.handleClick = <span class="hljs-keyword">this</span>.handleClick.bind(<span class="hljs-keyword">this</span>)  
  }
  
  render() {
    <span class="hljs-keyword">return</span> &lt;button onClick={<span class="hljs-keyword">this</span>.handleClick}&gt;<span class="hljs-type">Click</span> me!&lt;/button&gt;
  }
  
  handleClick() {
    <span class="hljs-keyword">this</span>.logPhrase()
  }
  
  logPhrase() {
    console.log(<span class="hljs-symbol">'such</span> gnawledge')
  }
}
</code></pre>
<p>很好，现在我们的函数被绑定到正确的上下文，而且不会在每次渲染的时候创建新的函数。</p>
<p>如果你使用的是<code>React.createClass</code>而不是ES6的classes，你就不会碰到这个问题，<code>createClass</code>生成的组件会把它们的方法自动绑定到组件的<code>this</code>，甚至是你传递给事件回调的函数。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译] React 组件中绑定回调

## 原文链接
[https://segmentfault.com/a/1190000006133727](https://segmentfault.com/a/1190000006133727)

