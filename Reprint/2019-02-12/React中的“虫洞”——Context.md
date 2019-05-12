---
title: 'React中的“虫洞”——Context' 
date: 2019-02-12 2:30:12
hidden: true
slug: hjrplsm778
categories: [reprint]
---

{{< raw >}}

                    
<p>当我们写React时，我们总是通过改变State和传递Prop对view进行控制，有时，也会遇到一点小麻烦。</p>
<h2 id="articleHeader0">背景</h2>
<p>但是随着我们的应用变的越来越复杂，组件嵌套也变的越来越深，有时甚至要从最外层将一个数据一直传递到最里层（比如当前user的信息）。</p>
<p>理论上，通过prop一层层传递下去当然是没问题的。不过这也太<strong>麻烦</strong>啦，要是能在最外层和最里层之间开一个穿越空间的<strong>虫洞</strong>就好了。</p>
<p>幸运的是，React的开发者也意识到这个问题，为我们开发出了这个空间穿越通道 —— Context。</p>
<h2 id="articleHeader1">使用</h2>
<p>看起来很高大上的Context使用起来却异常简单。</p>
<h3 id="articleHeader2">基本使用</h3>
<p>假设我们有下面这样的组件结构。</p>
<p><span class="img-wrap"><img data-src="/img/bVtB7Z?w=1141&amp;h=639" src="https://static.alili.tech/img/bVtB7Z?w=1141&amp;h=639" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>D组件需要获取在A组件中用户信息应该怎么办？有了Context，我们可以这么做。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Component A
class A extends React.Component {
// add the following method
  getChildContext() {
    return {
      user: this.props.user
    }
  }
  
  render() {
    return <div>{this.props.children}</div>
  }
}
// add the following property
A.childContextTypes = {
  user: React.PropTypes.object.isRequired
}


// Component D
class D extends React.Component {
  render() {
    return <div>{this.context.user.name}</div>
  }
}
// add the following property
D.contextTypes = {
  user: React.PropTypes.object.isRequired
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-comment">// Component A</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">A</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
<span class="hljs-comment">// add the following method</span>
  getChildContext() {
    <span class="hljs-keyword">return</span> {
      user: <span class="hljs-keyword">this</span>.props.user
    }
  }
  
  render() {
    <span class="hljs-keyword">return</span> &lt;div&gt;{<span class="hljs-keyword">this</span>.props.children}&lt;/div&gt;
  }
}
<span class="hljs-comment">// add the following property</span>
<span class="hljs-type">A</span>.childContextTypes = {
  user: <span class="hljs-type">React</span>.<span class="hljs-type">PropTypes</span>.<span class="hljs-keyword">object</span>.isRequired
}


<span class="hljs-comment">// Component D</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">D</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> &lt;div&gt;{<span class="hljs-keyword">this</span>.context.user.name}&lt;/div&gt;
  }
}
<span class="hljs-comment">// add the following property</span>
<span class="hljs-type">D</span>.contextTypes = {
  user: <span class="hljs-type">React</span>.<span class="hljs-type">PropTypes</span>.<span class="hljs-keyword">object</span>.isRequired
}</code></pre>
<p>很简单吧，只要在外层定义一个<code>getChildContext</code>方法，在父层和里层分别制定<code>contextTypes</code>就可以直接在里层用<code>this.context</code>访问了，是不是很厉害，XD</p>
<h3 id="articleHeader3">在lifecycle方法中使用</h3>
<p>根据官方的文档，Context在以下的lifecycle方法中也是可以使用的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="void componentWillReceiveProps(
  object nextProps, object nextContext
)

boolean shouldComponentUpdate(
  object nextProps, object nextState, object nextContext
)

void componentWillUpdate(
  object nextProps, object nextState, object nextContext
)

void componentDidUpdate(
  object prevProps, object prevState, object prevContext
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>void componentWillReceiveProps(
  <span class="hljs-selector-tag">object</span> nextProps, <span class="hljs-selector-tag">object</span> nextContext
)

boolean shouldComponentUpdate(
  <span class="hljs-selector-tag">object</span> nextProps, <span class="hljs-selector-tag">object</span> nextState, <span class="hljs-selector-tag">object</span> nextContext
)

void componentWillUpdate(
  <span class="hljs-selector-tag">object</span> nextProps, <span class="hljs-selector-tag">object</span> nextState, <span class="hljs-selector-tag">object</span> nextContext
)

void componentDidUpdate(
  <span class="hljs-selector-tag">object</span> prevProps, <span class="hljs-selector-tag">object</span> prevState, <span class="hljs-selector-tag">object</span> prevContext
)</code></pre>
<h3 id="articleHeader4">stateless组件中使用</h3>
<p>同时，在最新的stateless组件中，也是可以使用Context的，而且更加简单。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function D(props, context) {
  return (
    <div>{this.context.user.name}</div>
  );
}
D.contextTypes = {
  user: React.PropTypes.object.isRequired
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">D</span>(<span class="hljs-params">props, context</span>) </span>{
  <span class="hljs-keyword">return</span> (
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>{this.context.user.name}<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
D.contextTypes = {
  <span class="hljs-attr">user</span>: React.PropTypes.object.isRequired
}</code></pre>
<h2 id="articleHeader5">使用场景</h2>
<p>既然Context使用起来如此方便，是不是就应该多多用它呢？<br>显然，抛开Context还处于刚刚公开，API不稳定不说，即使对于组件化的开发，到处用也不是一个好主意。<br>Context就像javascript中的全局变量，只有真正全局的东西才适合放在context中。</p>
<p>比如：</p>
<ul>
<li>当前用户信息</li>
<li>flux、redux的store</li>
<li>session级别信息（语言，主题等）</li>
</ul>
<p>所以，当发现使用Context仅仅为了少打几个字而不考虑存放何种数据，那很可能用错Context了……</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React中的“虫洞”——Context

## 原文链接
[https://segmentfault.com/a/1190000004636213](https://segmentfault.com/a/1190000004636213)

