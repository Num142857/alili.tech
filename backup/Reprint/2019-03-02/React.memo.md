---
title: 'React.memo' 
date: 2019-03-02 2:30:07
hidden: true
slug: 0h3zalrcolvo
categories: [reprint]
---

{{< raw >}}

                    
<p>介绍<code>React.memo</code>之前，先了解一下<code>React.Component</code>和<code>React.PureComponent</code>。</p>
<h2 id="articleHeader0">React.Component</h2>
<p><code>React.Component</code>是基于ES6 <code>class</code>的React组件。</p>
<p>React允许定义一个<code>class</code>或者<code>function</code>作为组件，那么定义一个组件类，就需要继承<code>React.Component</code>.</p>
<p>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="jsx"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Welcome</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> &lt;h1&gt;<span class="hljs-type">Hello</span>, {<span class="hljs-keyword">this</span>.props.name}&lt;/h1&gt;;
  }
}</code></pre>
<p>注意：继承<code>React.Component</code>的React组件类中，<code>render()</code>为必须方法，其他都为可选。</p>
<h2 id="articleHeader1">React.PureComponent</h2>
<p><code>React.PureComponent</code> 和 <code>React.Component</code>类似，都是定义一个组件类。不同是<code>React.Component</code>没有实现<code>shouldComponentUpdate()</code>，而 <code>React.PureComponent</code>通过<code>props</code>和<code>state</code>的浅比较实现了。</p>
<p>如果组件的<code>props</code>和<code>state</code>相同时，<code>render</code>的内容也一致，那么就可以使用<code>React.PureComponent</code>了,这样可以提高组件的性能。</p>
<p>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Welcome extends React.PureComponent {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code class="jsx"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Welcome</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">PureComponent</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> &lt;h1&gt;<span class="hljs-type">Hello</span>, {<span class="hljs-keyword">this</span>.props.name}&lt;/h1&gt;;
  }
}</code></pre>
<blockquote>当props和state中有复杂数据结果时，不好使用<code>PureComponent</code>。</blockquote>
<h2 id="articleHeader2">React.memo</h2>
<p><code>React.memo</code>是一个高阶组件，类似于<code>React.PureComponent</code>，不同于<code>React.memo</code>是<code>function</code>组件，<code>React.PureComponent</code>是<code>class</code>组件。</p>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const MyComponent = React.memo(props => {
  /* render using props */
  return (

  );
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="jsx"><span class="hljs-keyword">const</span> MyComponent = React.memo(<span class="hljs-function"><span class="hljs-params">props</span> =&gt;</span> {
  <span class="hljs-comment">/* render using props */</span>
  <span class="hljs-keyword">return</span> (

  );
});</code></pre>
<p>这种方式依然是一种对象的浅比较，有复杂对象时无法<code>render</code>。在<code>React.memo</code>中可以自定义其比较方法的实现。</p>
<p>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function MyComponent(props) {
  /* render using props */
}
function areEqual(prevProps, nextProps) {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
}
export default React.memo(MyComponent, areEqual);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code class="jsx"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">MyComponent</span><span class="hljs-params">(props)</span></span> {
  /* render using props */
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">areEqual</span><span class="hljs-params">(prevProps, nextProps)</span></span> {
  /*
  <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span> <span class="hljs-keyword">if</span> passing nextProps to render would <span class="hljs-keyword">return</span>
  the same result as passing prevProps to render,
  otherwise <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
  */
}
export default React.memo(MyComponent, areEqual);</code></pre>
<blockquote>该方法在V16.6.0才支持</blockquote>
<p>推荐阅读<a href="https://kairi1227.github.io/" rel="nofollow noreferrer" target="_blank">《React 手稿》</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React.memo

## 原文链接
[https://segmentfault.com/a/1190000016933809](https://segmentfault.com/a/1190000016933809)

