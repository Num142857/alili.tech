---
title: '漫谈 React 组件库开发（一）：多层嵌套弹层组件' 
date: 2019-01-01 2:30:07
hidden: true
slug: kn9lo2v6ay
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">引言</h2>
<p>UI 组件中有很多弹出式组件，常见的如 <code>Dialog</code>，<code>Tooltip</code> 以及 <code>Select</code> 等。这些组件都有一个特点，它们的弹出层通常不是渲染在当前的 DOM 树中，而是直接插入在 <code>body</code> （或者其它类似的地方）上的。这么做的主要目的是方便控制这些弹出层的 <code>z-index</code> ，确保它们能够处于合适的层级上，不至于被遮挡。</p>
<p>我们都知道 React App 的顶层某个地方肯定有这么一行代码：<code>ReactDOM.render(&lt;App /&gt;, mountNode)</code>，这个 API 调用的作用是在 <code>mountNode</code> 的位置创建一棵 React 的渲染树，React 会接管 <code>mountNode</code> 开始的这棵 DOM 树。</p>
<p>在 React 的这种管理模式下，会发现使用弹层似乎不太方便，因为组件树是逐层往下生长的，但React 的 API 中并没有直接提供跳出这棵组件树的方法<em>[注1]</em>。</p>
<p>所以，为了实现弹层组件，我们需要先实现一个 <code>Portal</code> 组件（玩游戏的都知道，这是传送门的意思），这个组件只做一件事：将组件树中某些节点移出当前的DOM 树，并且渲染到指定的 DOM 节点中。</p>
<h2 id="articleHeader1">Portal 组件</h2>
<p><code>Portal</code> 组件的要做的事情很简单，<code>render</code> 函数因为不需要在当前位置输出任何东西，所以直接返回 <code>null</code> 就可以了，剩下的就是在组件的生命周期中去手动管理要渲染到指定位置的那些组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 简化的 Portal 实现
class Portal extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    container: PropTypes.object.isRequired
  };

  render() {
    return null;
  }

  componentDidMount() {
    const { children, container } = this.props;
    mountChildrenAtNode(children, container);
  }

  componentWillUnmount() {
    const { container } = this.props;
    unmountChildrenAtNode(container);
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code><span class="hljs-comment">// 简化的 Portal 实现</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Portal</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">Component</span> </span>{
  static propTypes = {
    children: <span class="hljs-type">PropTypes</span>.node.isRequired,
    container: <span class="hljs-type">PropTypes</span>.<span class="hljs-keyword">object</span>.isRequired
  };

  render() {
    <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
  }

  componentDidMount() {
    const { children, container } = <span class="hljs-keyword">this</span>.props;
    mountChildrenAtNode(children, container);
  }

  componentWillUnmount() {
    const { container } = <span class="hljs-keyword">this</span>.props;
    unmountChildrenAtNode(container);
  }
}</code></pre>
<p>剩下唯一的问题是  <code>mountChildrenAtNode</code> 这个函数怎么实现？仔细的同学应该已经发现了，这个函数和 <code>ReactDOM.render</code> 非常像，仔细一想，其实它们做的事情就是一样的。所以我们直接用 <code>ReactDOM.render</code> 去替换 <code>mountChildrenAtNode</code> 就可以了。</p>
<p>那么真的这么简单吗？</p>
<p>是，但也不是。</p>
<p>说是，是因为逻辑上这代码并没有什么问题，而且大部分场景下是确实可以完美工作。</p>
<p>说不是，是因为剩下的小部分场景下这段代码确实存在很严重的问题。</p>
<h3 id="articleHeader2">那么问题是什么呢？</h3>
<p>别急，我们先聊点别的。</p>
<p>相信大部分 React 开发者都用过 redux（至少听过吧），<code>react-redux</code> 这个 binding 库提供了连接 React 和 redux 的一个桥梁。<code>react-redux</code> 的实现依赖 React 很有用的一个功能<a href="https://facebook.github.io/react/docs/context.html" rel="nofollow noreferrer" target="_blank"><code>Context</code></a>，简单来说 <code>context</code> 就是提供了一个方便的跨越层级往下传递数据的方式。</p>
<p><code>ReactDOM.render</code> 的问题正是在于这个 <code>context</code> 的功能，它无法连接两棵 React 组件树的 <code>context</code>。</p>
<p><code>ReactDOM.render</code> 的函数原型中并没有当前组件树的信息，而 <code>context</code> 是跟组件树有关的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ReactDOM.render(
  element,
  container,
  [callback]
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">ReactDOM</span><span class="hljs-selector-class">.render</span>(
  <span class="hljs-selector-tag">element</span>,
  <span class="hljs-selector-tag">container</span>,
  <span class="hljs-selector-attr">[callback]</span>
)</code></pre>
<p>解决这个问题的方法也很简单，这里也不卖关子了，React 提供了另一个非公开 API：<code>ReactDOM.unstable_renderSubtreeIntoContainer</code>。这个 API 多了一个参数，这个参数就是用来指定新的 React 组件树根节点的父组件的，有了这个参数，两棵本来互不相干的 React 组件树就被联系起来了，同时它们的 <code>context</code> 也连接了起来。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ReactDOM.unstable_renderSubtreeIntoContainer(
  parentComponent,
  element,
  container,
  [callback]
)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">ReactDOM</span><span class="hljs-selector-class">.unstable_renderSubtreeIntoContainer</span>(
  <span class="hljs-selector-tag">parentComponent</span>,
  <span class="hljs-selector-tag">element</span>,
  <span class="hljs-selector-tag">container</span>,
  <span class="hljs-selector-attr">[callback]</span>
)</code></pre>
<p>想更好的了解  <code>Context</code>  的同学可以自己 Google，这不是本文重点，这里不做展开了。</p>
<h2 id="articleHeader3">Portal 组件的可扩展性</h2>
<p>不同的 UI 组件对弹层可能会有不同的功能需求，举个例子， <code>Dialog</code> 组件需要在弹出的时候禁止页面滚动，同时有些场景下需要支持点击背景部分关闭，或者按 ESC 键关闭。</p>
<p>这些很细节的功能点往往会出现需要不同组合的使用场景，例如只需要禁止滚动，或者同时需要禁止滚动和 ESC 键关闭。</p>
<p>一个很自然的想法是在 <code>Portal</code> 组件上加几个可配置的 props 来控制这些功能。这么做有个问题，不管用户需不需要，代码都在那里。</p>
<p>更好的方式是通过高阶组件(HOC)的方式让使用者自己去组合这些功能，这样子没有用到的功能并不会出现在最终的代码中。</p>
<p>说了这么多关于 <code>Portal</code> 组件的实现细节，有兴趣的同学可以去看看有赞的组件库 <a href="https://github.com/youzan/zent/tree/master/packages/zent/src/portal" rel="nofollow noreferrer" target="_blank">Zent</a> 里面的 <code>Portal</code> 是如何实现的，大体上就是按上面说的那些方案做的。</p>
<h2 id="articleHeader4">弹层组件</h2>
<p>有了 <code>Portal</code> 组件之后，基本上所有弹层组件都可以基于 <code>Portal</code> 去实现。例如 <code>Dialog</code> 无非就是在 <code>Portal</code> 组件的基础上加了一些 CSS 样式。复杂一点的组件例如 <code>Select</code>，需要实现一些触发逻辑来控制弹层的打开和关闭，比如 <code>click</code> 打开或者 <code>hover</code>  打开。我们接下来要讨论的弹层组件正是特指类似 <code>Select</code> 中的这些弹层。</p>
<p>在 <a href="https://github.com/youzan/zent" rel="nofollow noreferrer" target="_blank">Zent</a> 里面有一个叫 <code>Popover</code> 的组件来处理这些复杂的弹层场景，<code>Popover</code> 封装了常用的触发逻辑，例如 <code>click</code>, <code>hover</code>, <code>focus</code>，同时 <code>Popover</code> 的触发机制是可扩展的，使用者可以实现自己的触发逻辑。</p>
<p><code>Popover</code> 组件提供的另外一个重要功能是弹层的定位能力，也就是相对于 Trigger 的一个定位功能。除了内置的十几种定位算法，使用者可以实现自己的定位算法来实现特殊场景下的需求。</p>
<p>有了 <code>Popover</code> 组件提供的触发逻辑以及弹层定位这两个功能之后，类似 <code>Tooltip</code> , <code>Select</code> 这样的组件在实现时就完全不需要关心弹层的事了，只需要实现弹层内的组件逻辑就行了。</p>
<p>这里已经能够看出一个层次化的弹层组件设计了：<code>Portal</code> 负责脱离组件树，<code>Popover</code> 在 <code>Portal</code> 的基础上提供了更丰富的功能逻辑，其它组件又在 <code>Popover</code> 的基础上去做封装。这样一种层次结构在实践中大大降低了各类弹层组件的实现和维护成本。</p>
<p>在组件库的设计中，这种对能力的抽象封装是很重要的，在提高开发效率的同时也保证了各个组件行为的一致性。</p>
<h2 id="articleHeader5">干货：弹层组件的嵌套处理</h2>
<p>上面介绍的弹层组件实现细节上并没有特别之处，成熟的组件库基本都是用类似方式实现的。但是 <a href="https://github.com/youzan/zent" rel="nofollow noreferrer" target="_blank">Zent</a> 的 <code>Popover</code> 组件实现了一个大多数 React 组件库都没有实现的功能：弹层的嵌套处理。</p>
<p>如果你还没有明白这里的弹层嵌套是什么意思，没关系，给你举个例子就明白了。</p>
<p>如下图，点击按钮之后会弹出一个气泡，这个气泡中又有一个时间选择器，所谓的弹层嵌套指的就是这种弹层之中又嵌了弹层的场景。正常的操作逻辑是鼠标点击位置1的时候气泡和时间选择器同时关闭，但是点击位置2的时候应该只有时间选择器关闭。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011059709" src="https://static.alili.tech/img/remote/1460000011059709" alt="popover overlap" title="popover overlap" style="cursor: pointer; display: inline;"></span></p>
<p>上面提到的点击两个不同位置的不同行为其实就是弹层嵌套最主要的问题：上级的弹层组件应该知道哪个区域是属于下级弹层组件的。</p>
<p>由于弹层组件的特殊性，它们在 DOM 树中的位置跟它们实际的层次以及包含关系是没有必然联系的，上图中的两个弹层是<code>body</code> 下面的两个兄弟节点，但从弹层的角度看它们是有层次关系的，并不是并列的。</p>
<p>通常来说，弹层的层次结构也是一个树状结构，那么处理嵌套问题最直接的想法就是每个弹层组件都各自维护一个子弹层的列表。当需要判断点击是否在弹层外面时，不光要考虑当前弹层对应的 DOM 节点，还要考虑它的下级弹层对应的 DOM 节点。</p>
<p>这种方式处理的话需要手动维护这棵弹层的层级关系树，包括树中节点的插入／删除，这些操作都不是很难。这个方法最大的问题在于，在 React 的体系内一个弹层组件很难跟不是它直接孩子(direct child)的子弹层交互。</p>
<p><a href="https://github.com/youzan/zent" rel="nofollow noreferrer" target="_blank">Zent</a> 的 <code>Popover</code> 组件并没有直接去维护这棵层级关系树，而是利用了 React 中 <code>context</code> 的层级关系来避免自己去维护这棵树。使用 <code>context</code> 的另一个附带好处是，和非直接孩子的交互也不再是问题，因为 <code>context</code> 本身就是可以跨层级传递信息的。<code>Popover</code> 的层级管理结构示意图如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" *                context                       context
 *                ------>                       ------>
 * Popover Root               Popover child                    Popover grand-child     ......
 *                <------                       <------
 *             isOutsideQuery                isOutsideQuery" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code> *                context                       context
 *                ------&gt;                       ------&gt;
 * Popover Root               Popover child                    Popover grand-child     ......
 *                &lt;------                       &lt;------
 *             isOutsideQuery                isOutsideQuery</code></pre>
<p>就是这么一个很简单的设计解决了 <a href="https://github.com/youzan/zent" rel="nofollow noreferrer" target="_blank">Zent</a> 中弹层组件的层级嵌套问题，想了解实现细节的同学可以看 <a href="https://github.com/youzan/zent/blob/master/packages/zent/src/popover/Popover.js" rel="nofollow noreferrer" target="_blank"><code>Popover</code> 的源码</a>。</p>
<h2 id="articleHeader6">总结</h2>
<p>弹层组件是 UI 组件库中很重要的部分，一个逐层抽象的结构可以极大简化这些组件的开发和维护成本。</p>
<p>合理利用 React 的 <code>context</code> 功能可以很方便地解决一些像嵌套弹层一样看似很麻烦的问题。</p>
<p>如果觉得有所收获，请给  <a href="https://github.com/youzan/zent" rel="nofollow noreferrer" target="_blank">Zent</a> 点个 star 吧。</p>
<blockquote><p>*注1: React Fiber 中提供了一个新的 API：<code>ReactDOM. unstable_createPortal</code> ，这个 API 可以将一个组件渲染到指定的 DOM 节点内。</p></blockquote>
<p>本文由 李晨 首发于 <a href="http://tech.youzan.com/nested-popup-in-react/" rel="nofollow noreferrer" target="_blank">有赞技术博客</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
漫谈 React 组件库开发（一）：多层嵌套弹层组件

## 原文链接
[https://segmentfault.com/a/1190000011059704](https://segmentfault.com/a/1190000011059704)

