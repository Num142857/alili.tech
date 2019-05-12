---
title: 'React16.3.0以后的生命周期(一) - 组件加载' 
date: 2019-02-15 2:30:44
hidden: true
slug: 7w1gem8hez3
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">组件加载</h1>
<p>当组件被实例化并且插入<code>Dom</code>时所执行的方法，也会按照下的顺序依次执行。</p>
<ul>
<li>
<p>constructor()</p>
<p>构造方法。</p>
<p>这个方法有两个目的：</p>
<ul>
<li>
<p>初始化一个本地<code>state</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.state = {color: 'red'};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code class="jsx" style="word-break: break-word; white-space: initial;">this.<span class="hljs-keyword">state</span> = {color: 'red'};</code></pre>
<blockquote>要避免将<code>props</code>参数直接赋值给<code>state</code>, <code>this.state = {color: props.color}</code>是不允许 的</blockquote>
</li>
<li>
<p>绑定方法。</p>
<p>我们知道React <code>Class</code>中是不会继承<code>this</code>的，如果在<code>class</code>的方法中使用<code>this</code>，那么我们需要将<code>this</code>绑定到方法中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="this.clickHandler = this.clickHandler.bind(this);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code class="jsx" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">this</span>.clickHandler = <span class="hljs-keyword">this</span>.clickHandler.bind(<span class="hljs-keyword">this</span>);</code></pre>
<blockquote>绑定<code>this</code>，将需要<code>super(props)</code>,否则会提示找不到<code>this</code>.</blockquote>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="constructor(props) {
  super(props);
  this.state = {color: 'red'};
  this.clickHandler = this.clickHandler.bind(this);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code class="jsx"><span class="hljs-function"><span class="hljs-keyword">constructor</span><span class="hljs-params">(props)</span> <span class="hljs-comment">{
  super(props);
  this.state = {color: 'red'}</span>;</span>
  this.clickHandler = this.clickHandler.bind(this);
}</code></pre>
</li>
</ul>
</li>
<li>
<p>static getDerivedStateFromProps()</p>
<p>当本地<code>state</code>需要根据<code>props</code>来改变的时候可调用此方法。</p>
<p>这个方法是在<code>render()</code>前会被执行，只要执行<code>render()</code>都会被在之前被触发。</p>
<p>该方法有两个参数<code>props</code>和<code>state</code>; 返回值为<code>state</code>对象, 不需要返回整体<code>state</code>，把需要改变的<code>state</code>返回即可。</p>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="static getDerivedStateFromProps(props, state) {
  if(props.color !== state.color) {
    return {color: props.color};
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code class="jsx">static getDerivedStateFromProps(props, <span class="hljs-keyword">state</span>) {
  if(props.color !== <span class="hljs-keyword">state</span>.color) {
    return {color: props.color};
  }
}</code></pre>
</li>
<li>
<p>render()</p>
<p>这个方法是React组件中必须要提供的方法。当<code>state</code>或者<code>props</code>任一数据有更新时都会执行。</p>
<blockquote>需要注意当继承<code>PureComponent</code>时，不会对对象进行深度比较，也就是，不会根据对象内的对象变化时执行<code>render()</code>.</blockquote>
<p><code>render()</code>是一个纯函数，也就是不能在这个方法中有类似<code>setState()</code>这样的行为。</p>
<p>返回的数据类型可以有：</p>
<ul>
<li>
<code>null</code>、<code>String</code>、<code>Number</code>、<code>Array</code>、<code>Boolean</code>。</li>
<li>React elements</li>
<li>Fragment</li>
<li>Portal</li>
</ul>
<blockquote>注意：不能返回<code>undefined</code>.</blockquote>
</li>
</ul>
<p>当<code>shouldComponentUpdate()</code>返回<code>false</code>时，无论<code>state</code>和<code>props</code>有没有变化，这个方法都不执行。</p>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render() {
  return (
    <div>{this.state.color}</div>
  );
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code class="jsx">render() {
  return (
    <span class="hljs-variable">&lt;div&gt;</span>{this.<span class="hljs-keyword">state</span>.color}&lt;/div&gt;
  );
}</code></pre>
<ul><li>
<p>componentDidMount()</p>
<p><code>componentDidMount()</code>方法是在组件加载完后立即执行，也就是当该组件相关的<code>dom</code>节点插入到<code>dom</code>树中时。该方法在组件生命中只执行一次。</p>
<p>一般情况，我们会在这里<code>setState()</code>根据<code>props</code>的值，也可以从这里调用接口，获取服务端的数据，也可以在这里监听<code>websocket、setInterval</code>等操作。</p>
<blockquote>注意：一些监听需要在组件卸载时清理掉，否则会引起异常。</blockquote>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentDidMount() {
  this.setState({color: this.props.color});
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code class="jsx">componentDidMount() {
  <span class="hljs-keyword">this</span>.setState({color: <span class="hljs-keyword">this</span>.props.color});
}</code></pre>
<p><a href="https://codesandbox.io/s/8lkpy76158" rel="nofollow noreferrer" target="_blank">在线示例</a></p>
</li></ul>
<p>推荐阅读<a href="https://kairi1227.github.io/" rel="nofollow noreferrer" target="_blank">《React 手稿》</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React16.3.0以后的生命周期(一) - 组件加载

## 原文链接
[https://segmentfault.com/a/1190000016935092](https://segmentfault.com/a/1190000016935092)

