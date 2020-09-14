---
title: '[译]何时使用Component还是PureComponent？' 
date: 2018-11-29 9:34:56
hidden: true
slug: sdqkzh1vdm9
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>原文：<a href="https://codeburst.io/when-to-use-component-or-purecomponent-a60cfad01a81" rel="nofollow noreferrer" target="_blank">When to use Component or PureComponent?</a>
</blockquote>
<h2 id="articleHeader0">何时使用Component还是PureComponent？</h2>
<p>我开始转向使用<code>PureCompoent</code>是因为它是一个更具性能的<code>Component</code>的版本。虽然事实证明这是正确的，但是这种性能的提高还伴随着一些附加的条件。让我们深挖一下<code>PureComponent</code>，并理解为什么我们应该使用它。</p>
<h3 id="articleHeader1">Component和PureComponent有一个不同点</h3>
<p>除了为你提供了一个具有浅比较的<code>shouldComponentUpdate</code>方法，<code>PureComponent</code>和<code>Component</code>基本上完全相同。当<code>props</code>或者<code>state</code>改变时，<code>PureComponent</code>将对<code>props</code>和<code>state</code>进行浅比较。另一方面，Component不会比较当前和下个状态的<code>props</code>和<code>state</code>。因此，每当<code>shouldComponentUpdate</code>被调用时，组件默认的会重新渲染。</p>
<h3 id="articleHeader2">浅比较101</h3>
<p>当把之前和下一个的<code>props</code>和<code>state</code>作比较，浅比较将检查原始值是否有相同的值（例如：<code>1 == 1</code>或者<code>ture==true</code>）,数组和对象引用是否相同。</p>
<h3 id="articleHeader3">从不改变</h3>
<p>您可能已经听说过，不要在<code>props</code>和<code>state</code>中改变对象和数组，如果你在你的父组件中改变对象，你的“pure”子组件不将更新。虽然值已经被改变，但是子组件比较的是之前<code>props</code>的引用是否相同，所以不会检测到不同。</p>
<p>因此，你可以通过使用es6的assign方法或者数组的扩展运算符或者使用第三方库，强制返回一个新的对象。</p>
<h3 id="articleHeader4">存在性能问题？</h3>
<p>比较原始值值和对象引用是低耗时操作。如果你有一列子对象并且其中一个子对象更新，对它们的<code>props</code>和<code>state</code>进行检查要比重新渲染每一个子节点要快的多。</p>
<h2 id="articleHeader5">其它解决办法</h2>
<h3 id="articleHeader6">不要在render的函数中绑定值</h3>
<p>假设你有一个项目列表，每个项目都传递一个唯一的参数到父方法。为了绑定参数，你可能会这么做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<CommentItem likeComment={() => this.likeComment(user.id)} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">&lt;CommentItem likeComment={() =&gt; <span class="hljs-keyword">this</span>.likeComment(user.id)} /&gt;</code></pre>
<p>这个问题会导致每次父组件render方法被调用时，一个新的函数被创建，已将其传入<code>likeComment</code>。这会有一个改变每个子组件<code>props</code>的副作用，它将会造成他们全部重新渲染，即使数据本身没有发生变化。</p>
<p>为了解决这个问题，只需要将父组件的原型方法的引用传递给子组件。子组件的<code>likeComment</code>属性将总是有相同的引用，这样就不会造成不必要的重新渲染。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<CommentItem likeComment={this.likeComment} userID={user.id} />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">&lt;CommentItem likeComment={<span class="hljs-keyword">this</span>.likeComment} userID={user.id} /&gt;</code></pre>
<p>然后再子组件中创建一个引用了传入属性的类方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class CommentItem extends PureComponent {
  ...
  handleLike() {
    this.props.likeComment(this.props.userID)
  }
  ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">CommentItem</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">PureComponent</span> </span>{
  ...
  handleLike() {
    <span class="hljs-keyword">this</span>.props.likeComment(<span class="hljs-keyword">this</span>.props.userID)
  }
  ...
}</code></pre>
<h3 id="articleHeader7">不要在render方法里派生数据</h3>
<p>考虑一下你的配置组件将从一系列文章中展示用户最喜欢的十篇文章。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="render() {
  const { posts } = this.props
  const topTen = posts.sort((a, b) => b.likes - a.likes).slice(0, 9)
  return //...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">render() {
  <span class="hljs-keyword">const</span> { posts } = <span class="hljs-keyword">this</span>.props
  <span class="hljs-keyword">const</span> topTen = posts.sort(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> b.likes - a.likes).slice(<span class="hljs-number">0</span>, <span class="hljs-number">9</span>)
  <span class="hljs-keyword">return</span> <span class="hljs-comment">//...</span>
}</code></pre>
<p>每次组件重新渲染时<code>topTen</code>都将有一个新的引用，即使<code>posts</code>没有改变并且派生数据也是相同的。这将造成列表不必要的重新渲染。</p>
<p>你可以通过缓存你的派生数据来解决这个问题。例如，设置派生数据在你的组件<code>state</code>中，仅当posts更新时它才更新。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="componentWillMount() {
  this.setTopTenPosts(this.props.posts)
}
componentWillReceiveProps(nextProps) {
  if (this.props.posts !== nextProps.posts) {
    this.setTopTenPosts(nextProps)
  }
}
setTopTenPosts(posts) {
  this.setState({
    topTen: posts.sort((a, b) => b.likes - a.likes).slice(0, 9)
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">componentWillMount() {
  <span class="hljs-keyword">this</span>.setTopTenPosts(<span class="hljs-keyword">this</span>.props.posts)
}
componentWillReceiveProps(nextProps) {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>.props.posts !== nextProps.posts) {
    <span class="hljs-keyword">this</span>.setTopTenPosts(nextProps)
  }
}
setTopTenPosts(posts) {
  <span class="hljs-keyword">this</span>.setState({
    <span class="hljs-attr">topTen</span>: posts.sort(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> b.likes - a.likes).slice(<span class="hljs-number">0</span>, <span class="hljs-number">9</span>)
  })
}</code></pre>
<p>如果你正在使用Redux，可以考虑使用<a href="https://github.com/reduxjs/reselect" rel="nofollow noreferrer" target="_blank">reselect</a>来创建"selectors"来组合和缓存派生数据。</p>
<h2 id="articleHeader8">结束语</h2>
<p>只要你遵循下列两个简单的规则就可以安全的使用<code>PureComponent</code>来代替<code>Component</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- 虽然通常情况下易变性就是不好的，但是当使用`PureComponent`时问题会变得复杂。
- 如果你在`render`方法中创建一个新的函数，对象或者是数组那么你的做法（可能）是错误的。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>-<span class="ruby"> 虽然通常情况下易变性就是不好的，但是当使用<span class="hljs-string">`PureComponent`</span>时问题会变得复杂。
</span>-<span class="ruby"> 如果你在<span class="hljs-string">`render`</span>方法中创建一个新的函数，对象或者是数组那么你的做法（可能）是错误的。
</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译]何时使用Component还是PureComponent？

## 原文链接
[https://segmentfault.com/a/1190000014979065](https://segmentfault.com/a/1190000014979065)

