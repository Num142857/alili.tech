---
title: 'React之setState的正确打开方式' 
date: 2019-01-10 2:30:08
hidden: true
slug: rfzai1rn21
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="https://facebook.github.io/react/docs/react-component.html" rel="nofollow noreferrer" target="_blank">React官方文档</a>中提到：</p>
<blockquote>
<p>NEVER mutate this.state directly, as calling setState() afterwards may replace the mutation you made. Treat this.state as if it were immutable.</p>
<p>setState() does not immediately mutate this.state but creates a pending state transition. Accessing this.state after calling this method can potentially return the existing value.</p>
<p>There is no guarantee of synchronous operation of calls to setState and calls may be batched for performance gains.  setState() will always trigger a re-render unless conditional rendering logic is implemented in shouldComponentUpdate().</p>
<p>If mutable objects are being used and the logic cannot be implemented in shouldComponentUpdate(), calling setState() only when the new state differs from the previous state will avoid unnecessary re-renders.</p>
</blockquote>
<p>下面的代码分别是官方推荐和不推荐的两种改变state的方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Dog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            color: 'white',
            age: 7,
            son: {
              color: 'gray',
              age: 1
            }
        }
    }
    
    brushHair() {
      //right
      setState({color: 'white'})
      
      //wrong
      this.state.color = 'black';
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Dog</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
    constructor(props) {
        <span class="hljs-keyword">super</span>(props)
        <span class="hljs-keyword">this</span>.state = {
            color: <span class="hljs-symbol">'whit</span>e',
            age: <span class="hljs-number">7</span>,
            son: {
              color: <span class="hljs-symbol">'gra</span>y',
              age: <span class="hljs-number">1</span>
            }
        }
    }
    
    brushHair() {
      <span class="hljs-comment">//right</span>
      setState({color: <span class="hljs-symbol">'whit</span>e'})
      
      <span class="hljs-comment">//wrong</span>
      <span class="hljs-keyword">this</span>.state.color = <span class="hljs-symbol">'blac</span>k';
    }
}</code></pre>
<p>但你会发现在实践中即便使用第二种写法也不会报任何错误，甚至还能得到预期结果，那么为什么这种方式会被诟病呢？下面我谈谈自己的理解：</p>
<ol>
<li><p>React中state发生变化，组件就会更新。setState()被设计为异步的，其目的在于在某些情况下(如一次onClick中)延缓并将多次更新合并为一次从而优化组件性能，如果像第二种写法那样直接改变state的值，这种优化也就不存在了；</p></li>
<li><p>执行setState会按照React设计的执行顺序，调用其内部的各种函数，如果直接改变state，这些本应被调用的函数没有执行，可能会导致奇奇怪怪的错误;</p></li>
<li><p>因为setState()是异步的，所以上面的代码最终color的值可能是white，显然不符合正常的思维逻辑；</p></li>
</ol>
<p>有时候我们希望在setState之后立即使用state的值，有两种方法可以实现这个需求：<br>方法一：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setState({ color: 'red' }, () => console.log(this.state.color));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">set</span>State({ color: 'red' }, () =&gt; console.<span class="hljs-keyword">log</span>(this.<span class="hljs-keyword">state</span>.color));</code></pre>
<p>即向setState传入一个回调函数，这个函数会在state发生变化之后被调用。</p>
<p>方法二：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setState({ age: 18 });
setState((prevState, props) => ({
  age: ++prevState.age
}))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>setState({ age: <span class="hljs-number">18</span> })<span class="hljs-comment">;</span>
setState((<span class="hljs-name">prevState</span>, props) =&gt; ({
  age: ++prevState.age
}))</code></pre>
<p>setState的第一个参数还可以是一个函数，这个函数的返回值就是要merge的state，区别在于这个setState会在之前的setState执行完毕后再执行，所以prevState是最新的state。    </p>
<p>另外，当更新state的部分属性时，其他属性是不会受影响的，本质上是Object.assign({}, state, partialState)，但仅限于第一层结构,如果像下面这样</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="brushSonHair() {
    setState({
        son: {
            color: 'black'
        }
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">brushSonHair</span>() {
    <span class="hljs-selector-tag">setState</span>({
        <span class="hljs-attribute">son</span>: {
            <span class="hljs-attribute">color</span>: <span class="hljs-string">'black'</span>
        }
    })
}</code></pre>
<blockquote><p>上面的方法中setState改变的时第二层的属性值(son中的color)，第一层的属性值(color age)不会受到影响，但son中的age属性就会丢失(可以理解为改变了son)。</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React之setState的正确打开方式

## 原文链接
[https://segmentfault.com/a/1190000010063220](https://segmentfault.com/a/1190000010063220)

