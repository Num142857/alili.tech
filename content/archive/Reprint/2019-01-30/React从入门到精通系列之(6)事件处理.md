---
title: 'React从入门到精通系列之(6)事件处理' 
date: 2019-01-30 2:30:22
hidden: true
slug: vnpwxlbpawk
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">五、事件处理</h2>
<p>使用React元素处理事件与处理DOM元素上的事件非常相似。不过有一些语法上的差异：</p>
<ul>
<li><p>React事件使用驼峰命名法，而不是全部小写命名。</p></li>
<li><p>使用JSX你传递一个函数作为事件处理程序，而不是一个字符串。</p></li>
</ul>
<p>例如，HTML：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<button onclick=&quot;activeLasers()&quot;>
    Active Lasers
</button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"activeLasers()"</span>&gt;</span>
    Active Lasers
<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></code></pre>
<p>在React中略有不同：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<button onClick={activateLasers}>
    Active Lasers
</button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{activateLasers}</span>&gt;</span>
    Active Lasers
<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></code></pre>
<p>另一个区别是，你不能返回<code>false</code>来防止React中的默认行为。 您必须显式调用<code>preventDefault</code>。 例如，使用纯HTML，为了防止打开新页面的默认链接行为，您可以写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a href=&quot;#&quot; onclick=&quot;console.log('The link was clicked'); return false;&quot;>
    Click me
</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"console.log('The link was clicked'); return false;"</span>&gt;</span>
    Click me
<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<p>在React中，这可以改为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function ActiveLink() {
    function handleClick(e) {
        e.preventDefault();
        console.log('The link was clicked');
    }

    return (
        <a href='#' onClick={handleClick}>
            click me
        </a>
    );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">ActiveLink</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">handleClick</span>(<span class="hljs-params">e</span>) </span>{
        e.preventDefault();
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'The link was clicked'</span>);
    }

    <span class="hljs-keyword">return</span> (
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">'#'</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{handleClick}</span>&gt;</span>
            click me
        <span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></span>
    );
}</code></pre>
<p>这里，e是合成过的event。 React根据W3C规范定义这些event，因此你不需要担心浏览器兼容性的问题。 </p>
<p>当使用React时，在创建后向DOM元素添加通常不需要调用<code>addEventListener</code>监听器。 相反，只是在最初渲染元素时提供事件监听器。</p>
<p>当您使用ES6类定义组件时，常见的模式是将事件处理程序作为类上的公共方法。 例如，此<code>Toggle</code>组件呈现一个按钮，让用户在<code>“ON”</code>和<code>“OFF”</code>状态之间切换：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {isToggleOn: true};

    // 这个绑定是必要的，要不然该事件中的this就会是当前实例
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      </button>
    );
  }
}

ReactDOM.render(
  <Toggle />,
  document.getElementById('root')
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Toggle</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>(props) {
    <span class="hljs-keyword">super</span>(props);
    <span class="hljs-keyword">this</span>.state = {<span class="hljs-attr">isToggleOn</span>: <span class="hljs-literal">true</span>};

    <span class="hljs-comment">// 这个绑定是必要的，要不然该事件中的this就会是当前实例</span>
    <span class="hljs-keyword">this</span>.handleClick = <span class="hljs-keyword">this</span>.handleClick.bind(<span class="hljs-keyword">this</span>);
  }

  handleClick() {
    <span class="hljs-keyword">this</span>.setState(<span class="hljs-function"><span class="hljs-params">prevState</span> =&gt;</span> ({
      <span class="hljs-attr">isToggleOn</span>: !prevState.isToggleOn
    }));
  }

  render() {
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{this.handleClick}</span>&gt;</span>
        {this.state.isToggleOn ? 'ON' : 'OFF'}
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
    );
  }
}

ReactDOM.render(
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Toggle</span> /&gt;</span>,
  document.getElementById('root')
);</span></code></pre>
<p>你必须十分注意JSX中事件函数的意义。 在JavaScript中，类中的方法默认不绑定this。 如果你忘记绑定<code>this.handleClick</code>中的this关键字并将它传递给了<code>onClick</code>事件，当函数实际被调用时，会报出<code>undefined</code>的错误。</p>
<p>这不是React中特定的行为; 它是JavaScript中函数正常工作的一部分。<br> 一般来说，如果你引用一个方法是后面没有<code>()</code>，如<code>onClick = {this.handleClick}</code>，就会绑定该方法。</p>
<p>如果调用<code>bind</code>会使你烦恼，有两种方法可以解决这个问题。 您可以使用属性初始值设定props来正确处理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class LoggingButton extends React.Component {
  // 使用剪头函数绑定this
  handleClick = () => {
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
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">LoggingButton</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-comment">// 使用剪头函数绑定this</span>
  handleClick = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
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
<p>默认情况下，在<code>Create React App</code>中启用此语法。</p>
<p>如果不使用属性初始化语法，可以在回调中使用箭头函数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class LoggingButton extends React.Component {
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    // 给事件传入一个剪头函数也可以绑定this
    return (
      <button onClick={(e) => this.handleClick(e)}>
        Click me
      </button>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">LoggingButton</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  handleClick() {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'this is:'</span>, <span class="hljs-keyword">this</span>);
  }

  render() {
    <span class="hljs-comment">// 给事件传入一个剪头函数也可以绑定this</span>
    <span class="hljs-keyword">return</span> (
      <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">onClick</span>=<span class="hljs-string">{(e)</span> =&gt;</span> this.handleClick(e)}&gt;
        Click me
      <span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span>
    );
  }
}</code></pre>
<p>此语法的问题是，每次<code>LoggingButton</code>渲染时都会创建不同的回调函数。 在大多数情况下，这是要被<code>罚款</code>的。 然而，如果这个回调作为一个prop传递给较低的组件，这些组件可能会做额外的重新渲染。 我们一般建议在构造函数中绑定以避免这种性能问题。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React从入门到精通系列之(6)事件处理

## 原文链接
[https://segmentfault.com/a/1190000007790660](https://segmentfault.com/a/1190000007790660)

