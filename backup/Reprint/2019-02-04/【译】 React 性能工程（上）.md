---
title: '【译】 React 性能工程（上）' 
date: 2019-02-04 2:30:58
hidden: true
slug: 6l2431x6arb
categories: [reprint]
---

{{< raw >}}

                    
<p>04 February 2016  on <a href="http://benchling.engineering/tag/react/" rel="nofollow noreferrer" target="_blank">React</a></p>
<p><em>本文是 React 性能工程系列文章的第一篇（共两篇） <a href="http://benchling.engineering/deep-dive-react-perf-debugging/" rel="nofollow noreferrer" target="_blank">第二篇 深入探讨React性能调试</a> <a href="https://segmentfault.com/a/1190000006911917">译文</a> 现在已经推出!</em></p>
<p>这篇文章适用于复杂的React应用。如果只是构建一些简单的、小型的应用，你还不用考虑性能问题。不必过早地优化，去构建吧！</p>
<p>然而，如果你是在构建一个DNA设计工具、一个胶体图片分析器、一个富文本编辑器，或者一个全能的电子数据表，你就会触碰到性能的瓶颈了。这时候，就有必要来解决这个问题了。在构建Benchling这个项目的过程中，我们遇到了很多问题。所以，本文的目的是给那些网络开发者和关注Benchling的粉丝分享我们学到的一些方法。（当然，如果你喜欢这类问题，我们正在<a href="http://grnh.se/wt7plq" rel="nofollow noreferrer" target="_blank">招聘</a>!）</p>
<p>在这篇文章中，我将会讲述使用React性能工具的一些基础知识、一些会导致React渲染瓶颈的常见问题，以及一些需要谨记的调试方法。</p>
<h2 id="articleHeader0">基准</h2>
<p>浏览器性能可以用三句话来概述：理想中你期望浏览器每秒渲染60帧，每帧16.7毫秒。当你的app运行缓慢的时候，经常需要很长时间才能响应用户事件、处理数据或者重新渲染新的数据。大多数情况下，你并没有时刻在处理复杂的数据，只是浪费时间在重绘而已。</p>
<p>使用React, 不需要做额外的工作，就可以取得性能上的优势：</p>
<p>因为React会处理所有的DOM操作，很大程度上免去了DOM解析和布局所带来的问题。在后台，React会在JavaScript中维持虚拟DOM, 这样便于快速地把文档更新到期望状态。</p>
<p>我们要避免直接操作DOM，因为React组件的状态是储存在JS中的。一个传统的性能问题就是在不恰当的时刻操作DOM，这样会导致像<a href="https://developers.google.com/web/tools/chrome-devtools/profile/rendering-tools/analyze-runtime#how-to-identify-layout-bottlenecks" rel="nofollow noreferrer" target="_blank">被迫同步布局</a>这样的问题（例如：为了获取某节点的样式 <code>someNode.style.left</code>， 使得浏览器被迫渲染画面）。为了不用以下这种做法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`someNode.style.left = parseInt(someNode.style.left) + 10 + &quot;px&quot;;` 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>`someNode.style.left = parseInt(someNode.style.left) + <span class="hljs-number">10</span> + <span class="hljs-string">"px"</span>;` 
</code></pre>
<p>我们可以声明式地调用 `` 来触发组件，不需要从DOM元素读取数据，就可以简单地更新状态了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`this.setState({left: this.state.left + 10}).` " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code style="word-break: break-word; white-space: initial;">`this.<span class="hljs-built_in">set</span>State({left: this.<span class="hljs-keyword">state</span>.left + <span class="hljs-number">10</span>}).` </code></pre>
<p>说明一点，这些优化不用React也是可以实现的，我只是简单地指出React趋向于提前解决这些问题。</p>
<p>对于简单的应用，React 所带来的这些性能优化就足够了。我认为这些是使框架变得可行的最小工作量了。然而，当你开发的页面越来越多、越复杂时，维护和对比虚拟DOM就会变成一项昂贵的操作了。幸运的是，React提供了一些工具，可以检测哪里有性能问题，便于你及时地避开这些问题。</p>
<h2 id="articleHeader1">调试带来的性能问题</h2>
<p>请注意 -- 调试本身也会带来一些问题，导致混淆调试部分，以为这部分不会留在生产中。</p>
<h3 id="articleHeader2">元素窗口</h3>
<p>元素窗口是观察DOM元素是否被重新渲染的一个简单好用的途径，当一个属性改变或者一个DOM节点更新、插入、替换时，它都会闪现一个颜色。然而，元素面板的闪现，或者说是重新渲染也将影响到性能！经常我会从元素窗口切换到控制台，来更准确地感知每秒的帧数。</p>
<h3 id="articleHeader3">PropTypes</h3>
<p>在用进行React开发时，当一个组件被渲染时，经常要进行<a href="https://facebook.github.io/react/docs/reusable-components.html#prop-validation" rel="nofollow noreferrer" target="_blank">PropType 校验</a>。组件所接收到的 <code>prop</code> 先被检测来帮助调试和开发。使用 Chrome 提供的 <code>JS Profiler</code> ，你可以发现React组件在这个校验的方法上花费了很长一段时间。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006846317?w=1526&amp;h=500" src="https://static.alili.tech/img/remote/1460000006846317?w=1526&amp;h=500" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>尽管开发环境的警告提示有助于调试，但它们是会有一些性能方面的代价的，这些代价则不会反映在生产环境。有时我会使用切换到生产构建环境来忽略这种迟缓的错觉。（只要把<code>NODE_ENV</code> 改为 <code>production</code>，就可以启动生产环境构建模式了：<a href="https://facebook.github.io/react/downloads.html#npm" rel="nofollow noreferrer" target="_blank">https://facebook.github.io/react/downloads.html#npm</a>.）</p>
<h2 id="articleHeader4">通过React.addons.Perf来识别性能问题</h2>
<p>在深入讲解常见问题的修复前，重点强调一下，你必须只花时间来修复你所能把控的那些问题。如果你毫无约束地乱优化是很容易走进死胡同的。啰嗦一下，应该专注于构建，并且只把时间花在修复主要的性能瓶颈上。</p>
<p>使用标准的调试工具来识别性能瓶颈仍然是可行的，但是经常很难来解释数据，因为实际应用的代码会比在React-land中的代码花费更多的时间（例如：你写的一个复杂的渲染方式运行得很快，但是其带来的虚拟DOM计算却是相当昂贵的）。这使我们很难在React-land中识别哪些应用代码导致了明显的瓶颈问题。</p>
<p>幸运的是，React自带一些性能检测工具，可以在React的非生产构建环境中使用(<a href="https://facebook.github.io/react/docs/perf.html" rel="nofollow noreferrer" target="_blank">文档</a>)。通过<code>react/addons</code>，你可以找到对应的<code>React.addons.Perf</code>。</p>
<p>我们可以这样写:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<IntermediateBinder
  deleteItem={this.deleteItem}
  boundArg={item.id}>
  {(boundProps) => <TodoItem deleteItem={boundProps.deleteItem} />}
</IntermediateBinder> 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">IntermediateBinder</span>
  <span class="hljs-attr">deleteItem</span>=<span class="hljs-string">{this.deleteItem}</span>
  <span class="hljs-attr">boundArg</span>=<span class="hljs-string">{item.id}</span>&gt;</span>
  {(boundProps) =&gt; <span class="hljs-tag">&lt;<span class="hljs-name">TodoItem</span> <span class="hljs-attr">deleteItem</span>=<span class="hljs-string">{boundProps.deleteItem}</span> /&gt;</span>}
<span class="hljs-tag">&lt;/<span class="hljs-name">IntermediateBinder</span>&gt;</span> 
</code></pre>
<p>（我们探索的另一个可能的做法是，使用一个自定义的绑定函数，这个函数本身储存了元数据, 它和一个更高端的检测函数结合使用，就可以检测到功能的结合实际上还没有改变。这似乎不能满足我们的需求。）</p>
<h3 id="articleHeader5">构造数组、对象字面量</h3>
<p>这很简单，只是经常被忽略了。数组字面量会破坏 <code>PureRenderMixin</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> ['important', 'starred'] === ['important', 'starred']
false " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs prolog"><code>&gt; [<span class="hljs-string">'important'</span>, <span class="hljs-string">'starred'</span>] === [<span class="hljs-string">'important'</span>, <span class="hljs-string">'starred'</span>]
false </code></pre>
<p>如果你不希望这个对象被改变，你就可以把它放到一个模块常量或者组件静态变量中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`const TAGS = ['important', 'starred'];` " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;">`const TAGS = [<span class="hljs-string">'important'</span>, <span class="hljs-string">'starred'</span>];` </code></pre>
<h3 id="articleHeader6">子组件</h3>
<p>在一个组件和它的子组件之间定义内容界限有利于性能优化----接口封装性良好的组件可以自然地促进性能更新。重构中间的组件可以帮助提高性能，你也可以使用 <code>PureRenderMixin </code> 来保存更新。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
  <ComplexForm props={this.props.complexFormProps} />
  <ul>
    <li prop={this.props.items[0]}>item A</li>
    ...1000 items...
  </ul>
</div> 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">ComplexForm</span> <span class="hljs-attr">props</span>=<span class="hljs-string">{this.props.complexFormProps}</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">prop</span>=<span class="hljs-string">{this.props.items[0]}</span>&gt;</span>item A<span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    ...1000 items...
  <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> 
</code></pre>
<p>在上面这个例子中，如果 <code>complexFormProps</code> 和 <code>items</code> 来自同一个 store 的话，那么在 <code>complexFormProps</code> 里面输入，就会引发 store 的更新，而每个 store 的更新又会导致上面这整个实例的重新渲染。虚拟 DOM 的差异是很棒的，但仍然需要每次都检测。 然而，重构它的子组件，采用 <code>this.props.items</code>，这样就只有当 <code>this.props.items</code> 变化时才会更新状态。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
  <CustomList items={this.props.items} />
  <ComplexForm props={this.props.complexFormProps} />
</div> 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">CustomList</span> <span class="hljs-attr">items</span>=<span class="hljs-string">{this.props.items}</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">ComplexForm</span> <span class="hljs-attr">props</span>=<span class="hljs-string">{this.props.complexFormProps}</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> 
</code></pre>
<h3 id="articleHeader7">缓存昂贵的计算</h3>
<p>这个跟 <code>状态来源单一性</code> 原则有些相悖，但是如果 <code>prop</code> 中的计算是昂贵的，你就可以把它缓存在组件中。我们不必在渲染的方法中，直接地调用 <code>doExpensiveComputation(this.prop.someProp)</code> ，可以把这个函数进行封装，在prop 状态没改变的时候，把它缓存起来。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="getCachedExpensiveComputation() {
  if (this._cachedSomeProp !== this.prop.someProp) {
    this._cachedSomeProp = this.prop.someProp;
    this._cachedComputation = doExpensiveComputation(this.prop.someProp);
  }
  return this._cachedComputation;
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>getCachedExpensiveComputation() {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">this</span>._cachedSomeProp !== <span class="hljs-keyword">this</span>.prop.someProp) {
    <span class="hljs-keyword">this</span>._cachedSomeProp = <span class="hljs-keyword">this</span>.prop.someProp;
    <span class="hljs-keyword">this</span>._cachedComputation = doExpensiveComputation(<span class="hljs-keyword">this</span>.prop.someProp);
  }
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._cachedComputation;
} </code></pre>
<p>后续的优化人员使用JS分析器，将可以很好地发现这个问题。</p>
<h3 id="articleHeader8">状态链接</h3>
<p>React 的双向数据绑定对于简单的控制反转(IoC)非常有用，它允许子组件向父组件传递新的状态。如果对React表单组件只是使用 <code>valueLink</code> 的话是没那么糟糕的，因为 React 的表单输入是很简单的。但如果你像我们一样，在多个组件之间串联，那就会遇到问题了。状态链接实施如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="linkState(key) {
  return new ReactLink(
    this.state[key],
    ReactStateSetters.createStateKeySetter(this, key)
  );
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>linkState(<span class="hljs-built_in">key</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> ReactLink(
    <span class="hljs-keyword">this</span>.state[<span class="hljs-built_in">key</span>],
    ReactStateSetters.createStateKeySetter(<span class="hljs-keyword">this</span>, <span class="hljs-built_in">key</span>)
  );
} </code></pre>
<p>尽管状态没有改变，每调用一次 <code>linkState</code> 都会返回一个新的对象！这意味着 <code>shallowCompare</code> 永远不会起作用。不幸的是，我们的变通方案就是干脆不使用 <code>linkState</code>。 如果不是要把一个 <code>linkState</code> 变成一个 <code>getter prop</code> 和一个 <code>setter prop</code> 的话，我们要避免创建一个新的对象。例如：<code>nameLink={this.linkState(‘name')}</code> 可以被替换成 <code>name={this.state.name} setName={this.setName}</code>。（我们已经考虑写一个可以对自身进行缓存的 <code>linkState</code>了）</p>
<h2 id="articleHeader9">编译程序的优化</h2>
<p>新版的 Bebel 和 React 支持<a href="https://facebook.github.io/react/blog/2015/10/07/react-v0.14.html#compiler-optimizations" rel="nofollow noreferrer" target="_blank">内联React元素并且自动提升常量</a>。不幸的是，我们还没有用过这方面的技术，但它们将有助于减少 <code>React.createElement</code> 的调用, 以及加速DOM的更新和解。</p>
<h2 id="articleHeader10">总结</h2>
<p>刚刚我们看了很多 (你应该看过原列表的!)， 但是关键的两点就是你要习惯 <code>profiling</code> 和 <code>shouldComponentUpdate</code>。 我希望这些都能够帮到你！</p>
<p>任何建议、评论等，如果我们错过了，欢迎通过 benchling.com 让我们知悉。</p>
<p>请继续关注本系列文章的第二篇，我们将讨论 React 的调试工作流，深入存在性能问题的代码实例，进而示范如何修复。</p>
<p><a href="https://news.ycombinator.com/item?id=11036007" rel="nofollow noreferrer" target="_blank">Hacker News的讨论</a></p>
<p><em>更新: 第二篇已经出来啦! <a href="http://benchling.engineering/deep-dive-react-perf-debugging/" rel="nofollow noreferrer" target="_blank">Check it out - A Deep Dive into React Perf Debugging.</a></em></p>
<p>我们一如既往地欢迎喜欢我们产品的朋友来加入<a href="http://grnh.se/wt7plq" rel="nofollow noreferrer" target="_blank">这个团队</a>. :)</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【译】 React 性能工程（上）

## 原文链接
[https://segmentfault.com/a/1190000006846314](https://segmentfault.com/a/1190000006846314)

