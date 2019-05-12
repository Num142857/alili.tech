---
title: 'React 之容器组件和展示组件相分离解密' 
date: 2019-02-04 2:30:58
hidden: true
slug: hwwqrkrspyq
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><strong>Redux 的 React 绑定库包含了 容器组件和展示组件相分离 的开发思想。明智的做法是只在最顶层组件（如路由操作）里使用 Redux。其余内部组件仅仅是展示性的，所有数据都通过 props 传入。</strong></p></blockquote>
<p><strong>那么为什么需要容器组件和展示组件相分离呢？</strong></p>
<p>这里有个基本原则：容器组件仅仅做数据提取，然后渲染对应的子组件，记住这个点，Trust me！</p>
<p>看下面这个展示列表的例子，不区分容器和展示组件的情况</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// CommentList.js
class CommentList extends React.Component {
  constructor() {
    super();
    this.state = { comments: [] }
  }
  componentDidMount() {
    $.ajax({
      url: &quot;/my-comments.json&quot;,
      dataType: 'json',
      success: function(comments) {
        this.setState({comments: comments});
      }.bind(this)
    });
  }
  render() {
    return <ul> {this.state.comments.map(renderComment)} </ul>;
  }
  renderComment({body, author}) {
    return <li>{body}—{author}</li>;
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// CommentList.js</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CommentList</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  <span class="hljs-keyword">constructor</span>() {
    <span class="hljs-keyword">super</span>();
    <span class="hljs-keyword">this</span>.state = { <span class="hljs-attr">comments</span>: [] }
  }
  componentDidMount() {
    $.ajax({
      <span class="hljs-attr">url</span>: <span class="hljs-string">"/my-comments.json"</span>,
      <span class="hljs-attr">dataType</span>: <span class="hljs-string">'json'</span>,
      <span class="hljs-attr">success</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">comments</span>) </span>{
        <span class="hljs-keyword">this</span>.setState({<span class="hljs-attr">comments</span>: comments});
      }.bind(<span class="hljs-keyword">this</span>)
    });
  }
  render() {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span> {this.state.comments.map(renderComment)} <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></span>;
  }
  renderComment({body, author}) {
    <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span>{body}—{author}<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span></span>;
  }
}
</code></pre>
<ul>
<li><p><strong>可用性：</strong>CommentList不可以复用</p></li>
<li><p><strong>数据结构：</strong>组件应该对所需要的数据有所预期，但这里其实没有，PropTypes可以很好的做到这一点</p></li>
</ul>
<p>那么来看下分离的情况：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// CommentListContainer.js
class CommentListContainer extends React.Component {
  constructor() {
    super();
    this.state = { comments: [] }
  }
  componentDidMount() {
    $.ajax({
      url: &quot;/my-comments.json&quot;,
      dataType: 'json',
      success: function(comments) {
        this.setState({comments: comments});
      }.bind(this)
    });
  }
  render() {
    return <CommentList comments={this.state.comments} />;
  }
}


// CommentList.js
class CommentList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() { 
    return <ul> {this.props.comments.map(renderComment)} </ul>;
  }
  renderComment({body, author}) {
    return <li>{body}—{author}</li>;
  }
}

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-comment">// CommentListContainer.js</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CommentListContainer</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  constructor() {
    <span class="hljs-keyword">super</span>();
    <span class="hljs-keyword">this</span>.state = { comments: [] }
  }
  componentDidMount() {
    $.ajax({
      url: <span class="hljs-string">"/my-comments.json"</span>,
      dataType: <span class="hljs-symbol">'jso</span>n',
      success: function(comments) {
        <span class="hljs-keyword">this</span>.setState({comments: comments});
      }.bind(<span class="hljs-keyword">this</span>)
    });
  }
  render() {
    <span class="hljs-keyword">return</span> &lt;<span class="hljs-type">CommentList</span> comments={<span class="hljs-keyword">this</span>.state.comments} /&gt;;
  }
}


<span class="hljs-comment">// CommentList.js</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CommentList</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  constructor(props) {
    <span class="hljs-keyword">super</span>(props);
  }
  render() { 
    <span class="hljs-keyword">return</span> &lt;ul&gt; {<span class="hljs-keyword">this</span>.props.comments.map(renderComment)} &lt;/ul&gt;;
  }
  renderComment({body, author}) {
    <span class="hljs-keyword">return</span> &lt;li&gt;{body}—{author}&lt;/li&gt;;
  }
}

</code></pre>
<p>这样就做到了数据提取和渲染分离，CommentList可以复用，CommentList可以设置PropTypes判断数据的可用性</p>
<p>来看下容器组件和展示组件的区别:</p>
<table>
<thead><tr>
<th>展示组件</th>
<th>容器组件</th>
</tr></thead>
<tbody>
<tr>
<td>关注事物的展示</td>
<td>关注事物如何工作</td>
</tr>
<tr>
<td>可能包含展示和容器组件，并且一般会有DOM标签和css样式</td>
<td>可能包含展示和容器组件，并且不会有DOM标签和css样式</td>
</tr>
<tr>
<td>常常允许通过this.props.children传递</td>
<td>提供数据和行为给容器组件或者展示组件</td>
</tr>
<tr>
<td>对第三方没有任何依赖，比如store 或者 flux action</td>
<td>调用flux action 并且提供他们的回调给展示组件</td>
</tr>
<tr>
<td>不要指定数据如何加载和变化</td>
<td>作为数据源，通常采用较高阶的组件，而不是自己写，比如React Redux的connect(), Relay的createContainer(),  Flux Utils的Container.create()</td>
</tr>
<tr>
<td>仅通过属性获取数据和回调</td>
<td> </td>
</tr>
<tr>
<td>很少有自己的状态，即使有，也是自己的UI状态</td>
<td> </td>
</tr>
<tr>
<td>除非他们需要的自己的状态，生命周期，或性能优化才会被写为功能组件</td>
<td> </td>
</tr>
</tbody>
</table>
<p><strong>优势：</strong></p>
<ul>
<li><p>展示和容器更好的分离，更好的理解应用程序和UI</p></li>
<li><p>重用性高，展示组件可以用于多个不同的state数据源</p></li>
<li><p>展示组件就是你的调色板，可以把他们放到单独的页面，在不影响应用程序的情况下，让设计师调整UI</p></li>
<li><p>迫使你分离标签，达到更高的可用性</p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React 之容器组件和展示组件相分离解密

## 原文链接
[https://segmentfault.com/a/1190000006845396](https://segmentfault.com/a/1190000006845396)

