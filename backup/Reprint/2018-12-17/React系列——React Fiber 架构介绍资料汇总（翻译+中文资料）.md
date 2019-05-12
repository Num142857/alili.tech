---
title: 'React系列——React Fiber 架构介绍资料汇总（翻译+中文资料）' 
date: 2018-12-17 2:30:07
hidden: true
slug: 1mlwtk0325a
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">原文</h3>
<p><a href="https://github.com/acdlite/react-fiber-architecture" rel="nofollow noreferrer" target="_blank">react-fiber-architecture</a></p>
<h3 id="articleHeader1">介绍</h3>
<p></p>
<hr>
<br>React Fibre是React核心算法正在进行的重新实现。它是React团队两年多的研究成果。 <p>React Fiber的目标是提高其对动画，布局和手势等领域的适用性。它的主体特征是增量渲染：能够将渲染工作分割成块，并将其分散到多个帧中。</p>
<p>其他主要功能包括在进行更新时暂停，中止或重新使用工作的能力;为不同类型的更新分配优先权的能力;和新的并发原语。</p>
<h3 id="articleHeader2">关于这个文档</h3>
<p>Fiber引入了几个新颖的概念，很难通过查看代码来完成。这个文档是我们在React项目中随着Fibre实现的一系列笔记开始的。随着它的发展，我意识到它也可能成为其他人的有用资源。</p>
<p>我会尝试尽可能使用最普通的语言，并通过明确定义关键术语来避免行话。在可能的情况下，我也会大量连接外部资源。 </p>
<p>请注意，我不在React团队，也不会从任何权威机构发言。这不是一个正式的文件。我已经要求React团队的成员对其进行检查以确保准确性。 </p>
<p>这也是一个正在进行的工作。Fiber是一个正在进行的项目，在完成之前可能会经历重大的重构。我也试图在这里记录它的设计。改进和建议是非常受欢迎的。 </p>
<p>我的目标是在阅读本文档之后，您将会理解<a href="https://github.com/facebook/react/commits/master/src/renderers/shared/fiber" rel="nofollow noreferrer" target="_blank">Fiber的实施情况</a>，并最终甚至能够回馈给React。</p>
<h3 id="articleHeader3">先决条件</h3>
<p>我强烈建议您在继续之前熟悉以下资源： </p>
<p><a href="https://github.com/hyy1115/Front-end-course/blob/master/React%E7%B3%BB%E5%88%97/React%E7%BB%84%E4%BB%B6%E3%80%81%E5%85%83%E7%B4%A0%E5%92%8C%E5%AE%9E%E4%BE%8B.md" rel="nofollow noreferrer" target="_blank">React Components, Elements, and Instances</a> - “ Component”通常是一个重载的术语。牢牢掌握这些术语至关重要。 </p>
<p><a href="https://github.com/hyy1115/Front-end-course/blob/master/React%E7%B3%BB%E5%88%97/React%20Reconciliation%EF%BC%88%E5%92%8C%E8%A7%A3%EF%BC%89.md" rel="nofollow noreferrer" target="_blank">Reconciliation</a> - 对React reconciliation算法的高级描述。 </p>
<p><a href="https://github.com/hyy1115/Front-end-course/blob/master/React%E7%B3%BB%E5%88%97/React%20%E5%9F%BA%E6%9C%AC%E7%90%86%E8%AE%BA%E6%A6%82%E5%BF%B5.md" rel="nofollow noreferrer" target="_blank">React基本理论概念</a> - 对React概念模型的描述。其中一些内容在第一次阅读时可能没有意义。没关系，随着时间的推移会更有意义。 </p>
<p><a href="https://github.com/hyy1115/Front-end-course/blob/master/React%E7%B3%BB%E5%88%97/React%20%E8%AE%BE%E8%AE%A1%E5%8E%9F%E5%88%99.md" rel="nofollow noreferrer" target="_blank">React设计原则</a> - 特别注意scheduling部分。它很好的解释了React Fiber的工作原理。</p>
<h3 id="articleHeader4">Review</h3>
<p>如果你还没有看先决条件，请先看完它。</p>
<p>在我们深入研究新的东西之前，让我们回顾一下几个概念。</p>
<h4>什么是reconciliation</h4>
<p><strong>reconciliation</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React算法，用来比较2颗树，以确定哪些部分需要改变。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>React算法，用来比较<span class="hljs-number">2</span>颗树，以确定哪些部分需要改变。
</code></pre>
<p><strong>更新</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="用于呈现React应用的数据更改。通常是`setState`的结果。最终导致重新渲染。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code>用于呈现React应用的数据更改。通常是`setState`的结果。最终导致重新渲染。
</code></pre>
<p>React的API的核心思想认为更新会导致整个应用程序重新渲染。这允许开发人员以声明的方式进行推理，而不用担心如何有效地将应用程序从任何特定状态转换到另一个状态（从A到B，从B到C，从C到A等等）。</p>
<p>实际上，在每次更改时重新渲染整个应用程序只适用于最琐碎的应用程序;在实际的应用程序中，性能方面的代价非常高昂。 React具有优化功能，可在保持良好性能的同时创建整个应用程序需要重新呈现的外观。这些优化的大部分内容是reconciliation的一部分。</p>
<p>Reconciliation是被普遍理解为“虚拟DOM”的算法。高级描述如下所示：当您渲染React应用程序时，会生成一个描述应用程序的节点树并保存在内存中。然后将该树刷新到渲染环境 - 例如，在浏览器中，将其转换为一组DOM操作。当应用程序更新（通常通过setState），生成一个新的树。新树与前一棵树有区别，以计算需要更新呈现的应用程序的操作。</p>
<p>尽管Fibre是对reconciler的彻头彻尾的重写，但React文档中描述的高级算法在很大程度上是相同的。关键是：</p>
<ul>
<li>假定不同的组件类型产生实质上不同的树。React不会试图区分它们，而是完全替换旧的树。</li>
<li>列表的区分使用keys来执行。关键应该是“稳定，可预测，独特”。</li>
</ul>
<h4>Reconciliation与渲染</h4>
<p>DOM只是React可以渲染的渲染环境之一，还可以通过React Native进行本地iOS和Android视图。 （这就是为什么“虚拟DOM”有点用词不当）。</p>
<p>它可以支持如此多目标是因为React的设计使reconciliation和渲染是分开的阶段。reconciler完成了计算树的哪些部分已经改变的工作;渲染器然后使用该信息实际更新呈现的应用程序。</p>
<p>这种分离意味着React DOM和React Native可以使用他们自己的渲染器，同时共享由React核心提供的相同的reconciler。</p>
<p>Fiber重新实现了reconciler。虽然渲染者需要改变以支持（并利用）新的架构，但它并不主要关心渲染。</p>
<h4>Scheduling</h4>
<p><strong>scheduling</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="确定何时应该进行工作的过程。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code style="word-break: break-word; white-space: initial;">确定何时应该进行工作的过程。</code></pre>
<p><strong>工作</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="任何必须执行的计算。工作通常是更新的结果（例如setState）。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code>任何必须执行的计算。工作通常是更新的结果（例如<span class="hljs-built_in">set</span>State）。
</code></pre>
<p>React的<a href="https://reactjs.org/docs/design-principles.html#scheduling" rel="nofollow noreferrer" target="_blank">设计原则文档</a>在这个主题上非常好，我只是在这里引用它：</p>
<blockquote>在当前实现中，React递归地遍历树，并在单个tick中调用整个更新树的render函数。但是，将来可能会延迟一些更新以避免丢帧。<p>这是React设计中的一个常见主题。当新数据可用时，一些流行的库实现了“push”方法，其中计算被执行。然而，React坚持“pull”的方法，计算可以延迟到必要的时候。</p>
<p>React不是一个通用的数据处理库。这是一个建立用户界面的库。我们认为它是唯一定位在一个应用程序来知道现在哪些计算是相关的，哪些不是。</p>
<p>如果有什么东西在屏幕外，我们可以推迟任何与之相关的逻辑。如果数据比帧速率更快到达，我们可以合并批量更新。我们可以优先考虑来自用户交互的工作（比如点击按钮造成的动画）而不是重要的后台工作（比如刚刚从网络加载的新内容），以避免丢失帧。</p>
</blockquote>
<p>关键是：</p>
<ul>
<li>在用户界面中，没有必要立即应用每个更新。实际上，这样做可能会造成浪费，导致帧丢失并降低用户体验。</li>
<li>不同类型的更新具有不同的优先级 - 动画更新需要比从数据存储更新更快地完成。</li>
<li>基于push的方法要求应用程序（您，程序员）决定如何安排工作。基于pull的方法可以使框架（React）更加智能，并为您做出决定。</li>
</ul>
<p>目前，React并没有以重要的方式利用scheduling;整个子树的更新结果立即被重新渲染。检修React的核心算法以利用scheduling是Fiber背后的驱动理念。</p>
<p></p>
<hr>
<p>现在我们已经准备好进入Fiber的实施。接下来的部分比我们迄今为止所讨论的更具技术性。在继续之前，请确保您对前面的内容感到满意。</p>
<h3 id="articleHeader5">什么是fiber？</h3>
<p>我们即将讨论React Fiber架构的核心。Fiber比应用程序开发人员通常所想的要底层抽象得多。如果你对自己的理解感到沮丧，不要感到气馁。继续尝试，最终会有意义的。 （当你最终得到它，请建议如何改善这一部分。） </p>
<p>开始了！</p>
<p></p>
<hr>
<p>我们已经确定，Fiber的主要目标是使React能够利用scheduling。具体来说，我们需要能够</p>
<ul>
<li>暂停工作，稍后再回来。</li>
<li>为不同类型的工作分配优先权。</li>
<li>重复以前完成的工作。</li>
<li>如果不再需要，请中止工作。</li>
</ul>
<p>为了做到这一点，我们首先需要一种把工作分解成单元的方法。从某种意义上说，这就是fiber。fiber代表一个工作单元。</p>
<p>为了更进一步，让我们回到<a href="https://github.com/reactjs/react-basic#transformation" rel="nofollow noreferrer" target="_blank">React组件作为数据函数的概念</a>，通常表达为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="v = f(d)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">v = f(d)</code></pre>
<p>因此渲染一个React应用程序类似于调用其主体包含对其他函数的调用的函数，等等。这个比喻在思考fiber时很有用。</p>
<p>计算机通常跟踪程序执行的方式是使用调用<a href="https://en.wikipedia.org/wiki/Call_stack" rel="nofollow noreferrer" target="_blank">堆栈</a>。当一个函数被执行时，一个新的堆栈框架被添加到堆栈中。该堆栈框表示由该函数执行的工作。</p>
<p>在处理UI时，问题是如果一次执行了太多的工作，它可能会导致动画丢帧，看起来不稳定。更重要的是，如果某些工作被更新的更新所取代，那么这些工作可能是不必要的。这是UI组件和函数之间的比较失败的地方，因为组件比一般的函数具有更多特定的问题。</p>
<p>较新的浏览器（和React Native）实现了API来帮助解决这个确切的问题：requestIdleCallback schedules在空闲期间被调用的低优先级函数，requestAnimationFrame schedules在下一个动画帧上被调用的高优先级函数。问题是，为了使用这些API，您需要一种方法来将渲染工作分解为增量单元。如果只依赖调用堆栈，它将继续工作，直到堆栈为空。</p>
<p>如果我们可以自定义调用堆栈的行为来优化呈现UI，这不是很好吗？如果我们可以随意中断调用堆栈并手动操作堆栈帧，这不是很好吗？</p>
<p>这就是React Fiber的目的。Fiber重新实现堆栈，专门用于React组件。您可以将单个fiber视为虚拟堆栈帧。</p>
<p>重新实现堆栈的好处是你可以将堆栈帧保存在内存中，然后执行它们（无论何时）。这对于完成我们安排的目标至关重要。</p>
<p>除了调度scheduling，还有手动处理堆栈帧解锁了诸如并发和错误边界之类的功能的潜力。我们将在以后的章节中介绍这些话题。</p>
<p>在下一节中，我们将更多地关注fiber的结构。</p>
<h3 id="articleHeader6">fiber的结构</h3>
<p>注意：随着我们对实现细节的更具体的了解，事情可能发生变化的可能性会增加。如果您发现任何错误或过时的信息，请提交PR。</p>
<p>具体而言，fiber是一个JavaScript对象，包含有关组件，其输入和输出的信息。</p>
<p>fiber对应于堆栈帧，但也对应于组件的一个实例。</p>
<p>这是一些属于fiber的重要领域。 （这个清单并不详尽。）</p>
<h4>type and key</h4>
<p>fiber的type和key与React元素的作用相同。 （实际上，当从一个元素创建一个fiber时，这两个字段直接被复制过来。）</p>
<p>fiber的type描述了它对应的组件。对于复合组件，类型是函数或类组件本身。对于host组件（div，span等），类型是一个字符串。</p>
<p>从概念上讲，type是函数（如在v = f（d）中），其执行被栈帧跟踪。 </p>
<p>随着type的不同，在reconciliation期间使用key来确定fiber是否可以重新使用。</p>
<h4>child and sibling</h4>
<p>这些字段指向其他fiber，描述fiber的递归树状结构。 </p>
<p>子fiber对应于组件渲染方法返回的值。所以在下面的例子中</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Parent() {
  return <Child />
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Child</span> /&gt;</span>
}</span></code></pre>
<p>Parent的child fiber对应于Child。 </p>
<p>兄弟领域说明了渲染返回多个children的情况（Fiber中的一个新特性）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function Parent() {
  return [<Child1 />, <Child2 />]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Parent</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">return</span> [<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Child1</span> /&gt;</span>, <span class="hljs-tag">&lt;<span class="hljs-name">Child2</span> /&gt;</span>]
}</span></code></pre>
<p>child的fiber形成一个单一的链表，head是第一个child。所以在这个例子中，Parent的child是Child1，而Child1的兄弟是Child2。 </p>
<p>回到我们的功能比喻，你可以把一个子fiber想象成一个<a href="https://en.wikipedia.org/wiki/Tail_call" rel="nofollow noreferrer" target="_blank">尾调用函数</a>。</p>
<h4>return</h4>
<p>return fiber是程序在处理完当前fiber后返回的fiber。它在概念上与堆栈帧的返回地址相同。它也可以被认为是parent fiber。 </p>
<p>如果fiber具有多个子fiber，则每个子fiber的return fiber是parent。所以在前面的例子中，Child1和Child2的return fiber是Parent。</p>
<h4>pendingProps 和 memoizedProps</h4>
<p>从概念上讲，props是一个函数的arguments。一个fiber的pendingProps在执行开始时被设置，memoizedProps被设置在最后。 </p>
<p>当传入的pendingProps等于memoizedProps时，它表明fiber的先前输出可以被重复使用，避免不必要的工作。</p>
<h4>pendingWorkPriority</h4>
<p>一个数字，表示fiber所代表的工作的优先级。 ReactPriorityLevel模块列出了不同的优先级以及它们代表的内容。 </p>
<p>除NoWork为0外，较大的数字表示较低的优先级。例如，您可以使用以下函数来检查fiber的优先级是否至少与给定级别一样高：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function matchesPriority(fiber, priority) {
  return fiber.pendingWorkPriority !== 0 &amp;&amp;
         fiber.pendingWorkPriority <= priority
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">matchesPriority</span>(<span class="hljs-params">fiber, priority</span>) </span>{
  <span class="hljs-keyword">return</span> fiber.pendingWorkPriority !== <span class="hljs-number">0</span> &amp;&amp;
         fiber.pendingWorkPriority &lt;= priority
}</code></pre>
<p>此函数仅用于说明;它实际上并不是React Fiber代码库的一部分。</p>
<p>scheduler使用优先级字段来搜索要执行的下一个工作单元。这个算法将在以后的章节中讨论。</p>
<h4>备用</h4>
<p><strong>flush</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="flush fiber是将其输出呈现在屏幕上。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-built_in">flush</span> fiber是将其输出呈现在屏幕上。
</code></pre>
<p><strong>work-in-progress</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="尚未完成的fiber;从概念上说，一个尚未返回的堆栈帧。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code>尚未完成的fiber<span class="hljs-comment">;从概念上说，一个尚未返回的堆栈帧。</span>
</code></pre>
<p>在任何时候，一个组件实例最多只有两条fiber对应：当前的，flushed fiber和work-in-progress fiber。 </p>
<p>当前fiber的交替是work-in-progress，work-in-progress的交替是当前的fiber。</p>
<p>使用名为cloneFiber的函数，可以创建一个fiber的替代品。 cloneFiber不会总是创建一个新的对象，而是尝试重用fiber的备用，如果它存在，最小化分配。 </p>
<p>您应该将备用字段视为实现细节，但是它在代码库中经常出现，因此在此讨论它非常有用。</p>
<h4>输出</h4>
<p><strong>host component</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="React应用程序的叶子节点。它们特定于渲染环境（例如，在浏览器应用程序中，它们是“div”，“span”等）。在JSX中，它们使用小写的标记名称来表示。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>React应用程序的叶子节点。它们特定于渲染环境（例如，在浏览器应用程序中，它们是“<span class="hljs-keyword">div</span>”，“span”等）。在JSX中，它们使用小写的标记名称来表示。
</code></pre>
<p>从概念上讲，fiber的输出是一个函数的返回值。</p>
<p>每个fiber最终都有输出，但输出仅由host组件在叶子节点创建。然后将输出传送到树上。</p>
<p>输出是最终呈现给渲染器，以便它可以刷新渲染环境的变化。渲染者有责任定义输出是如何创建和更新的。</p>
<h3 id="articleHeader7">未来部分</h3>
<p>现在就是这样，但是这个文件还远远没有完成。以后的部分将介绍在整个生命周期中使用的算法。要涵盖的主题包括：</p>
<ul>
<li>scheduler如何找到要执行的下一个工作单元。</li>
<li>如何通过fiber树跟踪和传播优先级。</li>
<li>scheduler如何知道何时暂停和恢复工作。</li>
<li>工作如何被刷新并标记为完整。</li>
<li>副作用（如生命周期方法）如何工作。</li>
<li>协程是什么以及如何用它来实现上下文和布局等功能。</li>
</ul>
<h3 id="articleHeader8">相关视频</h3>
<p><a href="https://youtu.be/aV1271hd9ew" rel="nofollow noreferrer" target="_blank">What's Next for React (ReactNext 2016)</a></p>
<h3 id="articleHeader9">相关资料</h3>
<p>1、<a href="http://www.ayqy.net/blog/dive-into-react-fiber/" rel="nofollow noreferrer" target="_blank">完全理解React Fiber</a></p>
<p>2、<a href="http://zxc0328.github.io/2017/09/28/react-16-source/" rel="nofollow noreferrer" target="_blank">React 16 Fiber源码速览</a></p>
<p>3、<a href="https://zhuanlan.zhihu.com/p/26027085" rel="nofollow noreferrer" target="_blank">React Fiber是什么</a></p>
<p>4、<a href="https://www.zhihu.com/question/49496872/answer/116346458" rel="nofollow noreferrer" target="_blank">如何理解 React Fiber 架构？</a></p>
<p>5、<a href="https://bogdan-lyashenko.github.io/Under-the-hood-ReactJS/" rel="nofollow noreferrer" target="_blank">Under-the-hood-ReactJS</a></p>
<h3 id="articleHeader10">tree相关论文</h3>
<p><a href="https://grfia.dlsi.ua.es/ml/algorithms/references/editsurvey_bille.pdf" rel="nofollow noreferrer" target="_blank">A Survey on Tree Edit Distance and Related Problems</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React系列——React Fiber 架构介绍资料汇总（翻译+中文资料）

## 原文链接
[https://segmentfault.com/a/1190000012834204](https://segmentfault.com/a/1190000012834204)

