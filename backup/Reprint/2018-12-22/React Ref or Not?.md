---
title: 'React Ref or Not?' 
date: 2018-12-22 2:30:11
hidden: true
slug: lpsw6gozdjf
categories: [reprint]
---

{{< raw >}}

                    
<p>React的Ref特性是React声明式编程(Declarative Programming)设计哲学的一个重要补充。之前对它的认识只是停留在非受控组件这种特殊场景，直到最近为了实现项目中的一个特殊功能，才对它有了更深的理解。</p>
<h3 id="articleHeader0">什么是Ref</h3>
<p>React的官方解释是这样的：</p>
<blockquote>In the typical React dataflow, props are the only way that parent components interact with their children. To modify a child, you re-render it with new props. However, there are a few cases where you need to imperatively modify a child outside of the typical dataflow. The child to be modified could be an instance of a React component, or it could be a DOM element. For both of these cases, React provides an escape hatch.</blockquote>
<p>当中提到了几个关键的概念。</p>
<ul>
<li>在典型的React数据流理念中，父组件跟子组件的交互都是通过传递属性(properties)实现的。如果父组件需要修改子组件，只需要将新的属性传递给子组件，由子组件来实现具体的绘制逻辑。</li>
<li>在<strong>特殊</strong>的情况下，如果你需要<strong>命令式</strong>(imperatively)的修改子组件，React也提供了应急的处理办法--Ref</li>
<li>Ref既支持修改DOM元素，也支持修改自定义的组件。</li>
</ul>
<h3 id="articleHeader1">什么是声明式编程(Declarative Programming)</h3>
<p>值得一提的是当中声明式编程(Declarative Programming)和命令式编程(Imperative Programming)的区别。声明式编程的特点是只描述要实现的结果，而不关心如何一步一步实现的，而命令式编程则相反，必须每个步骤都写清楚。以数组为例，如果要打印出数组所有元素，声明式编程是这么写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [1,2,3];
const printElement = (element) => console.log(element);

arr.forEach( printElement );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];
<span class="hljs-keyword">const</span> printElement = <span class="hljs-function">(<span class="hljs-params">element</span>) =&gt;</span> <span class="hljs-built_in">console</span>.log(element);

arr.forEach( printElement );</code></pre>
<p>而用命令式编程，会这么写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let arr = [1,2,3];

for (let i = 0; i < arr.length; i++) {
    console.log(arr[i]);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> arr = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>];

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; arr.length; i++) {
    <span class="hljs-built_in">console</span>.log(arr[i]);
}</code></pre>
<p>通过对比，我们可以很直观的感受到声明式编程的好处。代码的核心功能就是这句：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arr.forEach( printElement )；" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">arr.forEach( printElement )；</code></pre>
<p>我们可以根据语义直观的理解代码的功能是：针对数组的每一个元素，将它的值打印出来。不必关心实现其的细节。而命令式编程必须将每行代码读懂，然后再整合起来理解总体实现的功能。</p>
<p>React有2个基石设计理念：一个是声明式编程，一个是函数式编程。函数式编程以后有机会再展开讲。声明式编程的特点体现在2方面：</p>
<ul>
<li>组件定义的时候，所有的实现逻辑都封装在组件的内部，通过state管理，对外只暴露属性。</li>
<li>组件使用的时候，组件调用者通过传入不同属性的值来达到展现不同内容的效果。一切效果都是事先定义好的，至于效果是怎么实现的，组件调用者不需要关心。</li>
</ul>
<p>因此，在使用React的时候，一般很少需要用到Ref。那么，Ref的使用场景又是什么？</p>
<h3 id="articleHeader2">Ref使用场景</h3>
<p>React官方文档是这么说的：</p>
<blockquote>
<p>There are a few good use cases for refs:</p>
<ul>
<li>Managing focus, text selection, or media playback.</li>
<li>Triggering imperative animations.</li>
<li>Integrating with third-party DOM libraries.</li>
</ul>
<p>Avoid using refs for anything that can be done declaratively.</p>
</blockquote>
<p>简单理解就是，控制一些DOM原生的效果，如输入框的聚焦效果和选中效果等；触发一些命令式的动画；集成第三方的DOM库。最后还补了一句：如果要实现的功能可以通过声明式的方式实现，就不要借助Ref。如果你就是那么任性，要使用Ref，具体该怎么做？</p>
<h3 id="articleHeader3">Ref用法</h3>
<ul><li>如果作用在原生的DOM元素上，通过Ref获取的是DOM元素，可以直接操作DOM的API：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput() {
    // 获取DOM元素后可以直接操作DOM API
    this.textInput.focus();
  }

  render() {
    // 通过Ref获取DOM元素，再保存在实例变量focusTextInput中
    return (
      <div>
        <input
          type=&quot;text&quot;
          ref={(input) => { this.textInput = input; "}}" />
        <input
          type=&quot;button&quot;
          value=&quot;Focus the text input&quot;
          onClick={this.focusTextInput}
        />
      </div>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CustomTextInput</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.focusTextInput = <span class="hljs-keyword">this</span>.focusTextInput.bind(<span class="hljs-keyword">this</span>);
  }

  focusTextInput() {
    <span class="hljs-comment">// 获取DOM元素后可以直接操作DOM API</span>
    <span class="hljs-keyword">this</span>.textInput.focus();
  }

  render() {
    <span class="hljs-comment">// 通过Ref获取DOM元素，再保存在实例变量focusTextInput中</span>
    <span class="hljs-keyword">return</span> (
      &lt;div&gt;
        &lt;input
          type="text"
          ref={(input) =&gt; { this.textInput = input; "}}" /&gt;
        &lt;input
          type="button"
          value="Focus the text input"
          onClick={this.focusTextInput}
        /&gt;
      &lt;/div&gt;
    );
  }
}</code></pre>
<ul><li>如果作用在自定义组件，Ref获取的是组件的实例，可以直接操作组件内的任意方法：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// CustomTextInput组件的定义跟上面完全相同
class AutoFocusTextInput extends React.Component {
  componentDidMount() {
    // 这里直接调用CustomTextInput实例的focusTextInput方法
    this.textInput.focusTextInput();
  }

  render() {
    return (
      // 通过Ref获取CustomTextInput实例，再保存在实例变量textInput中
      <CustomTextInput
        ref={(input) => { this.textInput = input; "}}" />
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// CustomTextInput组件的定义跟上面完全相同</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">AutoFocusTextInput</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  componentDidMount() {
    <span class="hljs-comment">// 这里直接调用CustomTextInput实例的focusTextInput方法</span>
    <span class="hljs-keyword">this</span>.textInput.focusTextInput();
  }

  render() {
    <span class="hljs-keyword">return</span> (
      <span class="hljs-comment">// 通过Ref获取CustomTextInput实例，再保存在实例变量textInput中</span>
      &lt;CustomTextInput
        ref={(input) =&gt; { <span class="hljs-keyword">this</span>.textInput = input; "}}" /&gt;
    );
  }
}</code></pre>
<p>理解了基本使用后，再回到我遇到的真实场景。</p>
<h3 id="articleHeader4">Ref应用</h3>
<p>先简单描述下项目要实现的效果：在一个页面中分左右两部分，左边显示商品的列表，右边显示选中商品的购物车。一次可以将左边的多个商品，添加到右边的购物车中。由于具体的实现细节比较复杂，当时的分工是一个人实现左侧的商品列表，另一人负责右边的购物车。如果用传统的React设计理念来实现，必须要借助左边列表组件和右边购物车组件的共同父组件，也就是页面的根组件，来维护选中的商品数组。然后再将商品数组传入购物车展示。这样做的话实现起来非常不方便，要把购物车中的很多逻辑都放在父组件中，而实际上这些逻辑是购物车自己独立使用的，跟其它组件并没有交互。左侧的列表组件只需要将选中的商品告知购物车即可，后续的逻辑由购物车自己实现。</p>
<p>考虑再三后，我们决定通过Ref的方式将其内部的addProduct的方法暴露出来给父组件，当选中一个商品后，列表组件将商品信息传递给父组件，父组件再通过addProduct方法将商品信息传入购物车。由购物车组件自己来维护客户购买的所有商品数据。整体逻辑就是这样，具体代码此处略过，主要描述的是思路。也许你会问为啥不将商品信息通过props传入购物车组件？实现上是没问题的，都能达到效果。但我们认为显式的调用addProduct方法会更加直观的表达语义，同时对addProduct方法也做了限制，只负责添加商品信息，不做更多的逻辑判断。</p>
<p>如果说还有没更好的实现方式，其实是有的，可以通过Redux来管理整个页面的状态。但引入Redux后，代码的维护成本会随之上升，目前暂时不作考虑。</p>
<h3 id="articleHeader5">总结</h3>
<p>本文以项目中遇到的设计问题为起点，介绍了React Ref特性的使用场景和具体的使用方法，顺便还对比了声明式编程和命令式编程2种编程风格，对React的设计理念作了简要的解读。希望对你有所帮助，以上</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React Ref or Not?

## 原文链接
[https://segmentfault.com/a/1190000012370373](https://segmentfault.com/a/1190000012370373)

