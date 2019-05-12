---
title: 'React事件绑定的几种方式对比' 
date: 2018-12-30 2:30:10
hidden: true
slug: 7fiyed342g9
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">React事件绑定</h2>
<p>由于类的方法默认不会绑定this，因此在调用的时候如果忘记绑定，this的值将会是undefined。<br>通常如果不是直接调用，应该为方法绑定this。绑定方式有以下几种：</p>
<h3 id="articleHeader1">1. 在构造函数中使用bind绑定this</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Button extends React.Component {
constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(){
    console.log('this is:', this);
  }
  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Button</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
<span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.handleClick = <span class="hljs-keyword">this</span>.handleClick.bind(<span class="hljs-keyword">this</span>);
  }
  handleClick(){
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'this is:'</span>, <span class="hljs-keyword">this</span>);
  }
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.handleClick}</span>&gt;</span>
        Click me
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
    );
  }
}</code></pre>
<h3 id="articleHeader2">2. 在调用的时候使用bind绑定this</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Button extends React.Component {
  handleClick(){
    console.log('this is:', this);
  }
  render() {
    return (
      <button onClick={this.handleClick.bind(this)}>
        Click me
      </button>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Button</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  handleClick(){
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'this is:'</span>, <span class="hljs-keyword">this</span>);
  }
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.handleClick.bind(this)}</span>&gt;</span>
        Click me
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
    );
  }
}</code></pre>
<h3 id="articleHeader3">3. 在调用的时候使用箭头函数绑定this</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Button extends React.Component {
  handleClick(){
    console.log('this is:', this);
  }
  render() {
    return (
      <button onClick={()=>this.handleClick()}>
        Click me
      </button>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Button</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  handleClick(){
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'this is:'</span>, <span class="hljs-keyword">this</span>);
  }
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{()</span>=&gt;</span>this.handleClick()}&gt;
        Click me
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
    );
  }
}</code></pre>
<h3 id="articleHeader4">4. 使用属性初始化器语法绑定this(实验性)</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Button extends React.Component {
  handleClick=()=>{
    console.log('this is:', this);
  }
  render() {
    return (
      <button onClick={this.handleClick}>
        Click me
      </button>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Button</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  handleClick=<span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'this is:'</span>, <span class="hljs-keyword">this</span>);
  }
  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.handleClick}</span>&gt;</span>
        Click me
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
    );
  }
}</code></pre>
<h3 id="articleHeader5">比较</h3>
<p><strong>方式2</strong>和<strong>方式3</strong>都是在调用的时候再绑定this。</p>
<ul>
<li>
<strong>优点：</strong>写法比较简单，当组件中没有state的时候就不需要添加类构造函数来绑定this</li>
<li>
<strong>缺点：</strong>每一次调用的时候都会生成一个新的方法实例，因此对性能有影响，并且当这个函数作为属性值传入低阶组件的时候，这些组件可能会进行额外的重新渲染，因为每一次都是新的方法实例作为的新的属性传递。</li>
</ul>
<p><strong>方式1</strong>在类构造函数中绑定this，调用的时候不需要再绑定</p>
<ul>
<li>
<strong>优点：</strong>只会生成一个方法实例，并且绑定一次之后如果多次用到这个方法也不需要再绑定。</li>
<li>
<strong>缺点：</strong>即使不用到state，也需要添加类构造函数来绑定this，代码量多一点。。。</li>
</ul>
<p><strong>方式4：</strong>利用属性初始化语法，将方法初始化为箭头函数，因此在创建函数的时候就绑定了this。<br><strong>优点：</strong>创建方法就绑定this，不需要在类构造函数中绑定，调用的时候不需要再作绑定。结合了<strong>方式1</strong>、<strong>方式2</strong>、<strong>方式3</strong>的优点<br><strong>缺点：</strong>目前仍然是实验性语法，需要用babel转译</p>
<h3 id="articleHeader6">总结</h3>
<p>方式1是官方推荐的绑定方式，也是性能最好的方式。方式2和方式3会有性能影响并且当方法作为属性传递给子组件的时候会引起重渲问题。方式4目前属于实验性语法，但是是最好的绑定方式，需要结合bable转译</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React事件绑定的几种方式对比

## 原文链接
[https://segmentfault.com/a/1190000011317515](https://segmentfault.com/a/1190000011317515)

