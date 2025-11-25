---
title: '精益 React 学习指南 （Lean React）- 1.6 Flux' 
date: 2019-02-09 2:30:59
hidden: true
slug: ublky4ul8t
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="https://segmentfault.com/a/1190000005136764">书籍完整目录</a></p></blockquote>
<h1 id="articleHeader0">1.6 flux</h1>
<p><span class="img-wrap"><img data-src="/img/bVwBD2" src="https://static.alili.tech/img/bVwBD2" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这一节将介绍 React 的核心应用架构模式 Flux，包括内容：</p>
<ul>
<li><p>Flux 介绍</p></li>
<li><p>MVC 架构之痛</p></li>
<li><p>Flux 的理解</p></li>
<li><p>Flux 相关库和工具介绍</p></li>
<li><p>Flux 与 React 实例</p></li>
</ul>
<p>最后我们将会把之前的 TODOMVC 改为 Flux 的架构。</p>
<h2 id="articleHeader1">1.6.1 Flux 介绍</h2>
<p>简单来讲，Flux 是 Facebook 引入到 React 中的一种前端架构，通过定义其核心单向数据流的方式，让 React 应用更加健壮。同时，这种应用架构也具有普适性，可以应用到其他任意前端项目中，甚至可以应用到客户端应用开发中，也就是说 Flux 更应该叫做一种架构模式（Pattern）。</p>
<h2 id="articleHeader2">1.6.2 MVC 架构之痛</h2>
<p>在详细介绍 Flux 之前，我们先来看看传统的前端 MVC 架构以及其带来的问题。</p>
<blockquote><p>MVC 的实现可能有很多种方式，比较灵活，但基本本质不会改变，只是三者间的数据传递方向可能会改变，即便是 MVP 模式也只是 MVC 的变种，所以为了统一我们且以下图的 MVC 方式来讨论。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVwCjE" src="https://static.alili.tech/img/bVwCjE" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader3">概念</h3>
<ul>
<li><p><strong>Model：</strong> 负责保存应用数据，和后端交互同步应用数据</p></li>
<li><p><strong>View：</strong> 负责渲染页面 HTML DOM</p></li>
<li><p><strong>Controller：</strong> 负责连接 View 和 Model ， Model 的任何改变会应用到 View 中，View 的操作会通过 Controller 应用到 Model 中</p></li>
<li><p><strong>关系</strong>：Model, View, Controller 都是多对多关系。</p></li>
</ul>
<h3 id="articleHeader4">流程</h3>
<p>以 TODOMVC 为例子用户添加一个 todo 的交互流程：</p>
<p><code>View -&gt; Action -&gt; Controller -&gt; Model -&gt; View</code></p>
<ol>
<li><p><strong>View -&gt; Action:</strong> 添加按钮事件或者 input 输入的提交事件</p></li>
<li><p><strong>Action -&gt; Controller:</strong> 控制器响应 View 事件</p></li>
<li><p><strong>Controller -&gt; Model:</strong> 控制器依赖 Model, 调用 Model 添加 todo</p></li>
<li><p><strong>Model -&gt; View:</strong> View 监听 Model 的改变添加 todo 事件，在 HTML 中添加一个新的 Todo 视图</p></li>
</ol>
<h3 id="articleHeader5">问题</h3>
<p>对于新增一个 todo ，需要编写一个视图渲染处理函数，函数内添加新项目到列表中。同理对于删除一个 todo，也会有一个处理函数。当业务逻辑变多过后，可能有很多模型需要做增删改的功能，与之对应的就是我们需要精心构建这么多的渲染处理函数。 这种局部更新模式是高性能的关键所在，但问题是：</p>
<ol>
<li><p>更新逻辑复杂，需要编写大量的局部渲染函数</p></li>
<li><p>问题定位困难，页面的当前状态是有数据和这些局部更新函数确定的</p></li>
</ol>
<h3 id="articleHeader6">如何解决</h3>
<p>如果渲染函数只有一个，统一放在 App 控制器中，每次更新<strong>重渲染</strong>页面，这样的话：</p>
<ol>
<li><p>任何数据的更新都只用调用重渲染就行</p></li>
<li><p>数据和当前页面的状态是唯一确定的</p></li>
</ol>
<p>重渲染也有弊端，会带来严重的性能问题，重渲染和局部渲染各有好坏，对 MVC 来说这是一个两难的选择，无法做到鱼和熊掌兼得。</p>
<p>那如何才能兼顾两种模式的优点？</p>
<h2 id="articleHeader7">1.6.3 Flux 架构</h2>
<p>通过 <code>React + Flux</code> 就可以完美解决 MVC 的问题。</p>
<ol>
<li><p><strong>重渲染：</strong> 在 React 中每次渲染都是重渲染，且不影响页面性能，是因为重渲染的是 Virtual Dom。这就意味着完全不用去关系重渲染问题，增删改的渲染都和初始化渲染相同入口</p></li>
<li><p><strong>数据和状态一致性：</strong> Store 的数据确定应用唯一的状态</p></li>
</ol>
<p>简单来说在 Flux 架构中直接剥离了控制器层，<code>MVC</code> 架构变成了 <code>MV + Flux</code> 架构。</p>
<h3 id="articleHeader8">概念</h3>
<p><strong>单向数据流</strong> </p>
<p><span class="img-wrap"><img data-src="/img/bVwBoo" src="https://static.alili.tech/img/bVwBoo" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这是 Flux 架构的核心思想，重上面的图中可以看到，数据的流向从action 到 view 的一个单向流。</p>
<p><strong>Action</strong> </p>
<p><span class="img-wrap"><img data-src="/img/bVwBZs" src="https://static.alili.tech/img/bVwBZs" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>Action 可以理解为对应用数据修改的指令，任何修改应用数据的行为都必须需通过触发 action 来修改。Action 可以来自于 View，也可以来自服务端的数据更新。</p>
<p><strong>Action Creator</strong>：</p>
<p><span class="img-wrap"><img data-src="/img/bVwB0R" src="https://static.alili.tech/img/bVwB0R" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>为了抽象 Action ，提供一些辅助的语义化的方法来创建 Action，这些辅助方法叫做 Action Creator。 </p>
<p><strong>Stores</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVwB3b" src="https://static.alili.tech/img/bVwB3b" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>应用的数据中心，所有应用数据都存放在这里控制，同时包含数据的控制行为，可能包含多个 store</p>
<p><strong>Dispatcher</strong> </p>
<p><span class="img-wrap"><img data-src="/img/bVwB3B" src="https://static.alili.tech/img/bVwB3B" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>action 的控制者，所有 action 都会通过 dispatcher，由 dispatcher 控制 action 是否应该传入到 store 中，Dispatcher 是一个单例。</p>
<p><strong>View</strong> </p>
<p><span class="img-wrap"><img data-src="/img/bVwB3L" src="https://static.alili.tech/img/bVwB3L" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>页面的视图，对应 React 的 Component, 视图可以触发 action 到 dispatcher。</p>
<p>需要区别出一种叫控制器 View（Controller View）的类型，这种 View 可以知晓 store 数据，把 store 数据转化为自身的状态，在将数据传递给其他 view 。 并且可以监听 store 数据的改变，当 store 数据改变过后重新设置状态触发重渲染。 可以将控制器 View 对应 MVC 中的控制器，但是差别很大，控制器 View 唯一多做的事情就是监听 store 数据改变，没有其他任何业务处理逻辑。</p>
<h3 id="articleHeader9">流程</h3>
<p>同样以 TODOMVC 的添加 todo 为例，Flux 中的流程为：</p>
<p><code>View -&gt; Action(Action Creator -&gt; Action) -&gt; Dispatcher -&gt; Store -&gt; Controller View -&gt; View</code></p>
<ol>
<li><p><strong>View -&gt; Action</strong>: 添加按钮事件或者 input 输入的提交事件，View 中将事件转化为 action, action 由 Action Creator 创建。</p></li>
<li><p><strong>Action -&gt; Dispatcher</strong>: action 统一由 Dispatcher 分配</p></li>
<li><p><strong>Dispatcher -&gt; Store</strong>: Dispatcher 分配 action 到 Store</p></li>
<li><p><strong>Store -&gt; Controller View</strong>: 控制器 View 监听 store 的数据改变，将数据转化为自身属性</p></li>
<li><p><strong>Controller View -&gt; View</strong>: 数据改变自动重渲染所有视图</p></li>
</ol>
<h3 id="articleHeader10">对比</h3>
<ol>
<li><p><strong>渲染策略：</strong> 数据改变 Flux 自动渲染，MVC 手动编写更新函数</p></li>
<li><p><strong>事件触发策略：</strong> Flux 中所有 action 交给 dispather  分配，MVC 中交给对应的控制器分配</p></li>
</ol>
<p>Flux 在核心策略上的不同是解决 MVC 架构问题的关键</p>
<h2 id="articleHeader11">1.6.4 理解 Flux 架构</h2>
<p>Flux 架构是非常优雅简洁的，合理利用了一些优秀的架构思维</p>
<h3 id="articleHeader12">分而治之（Divide And Conquer）</h3>
<p>数据的处理过程是 <code>Store -&gt; Controller View -&gt; View</code>。 所有数据来自于 Store，页面的渲染层级为 Store 将数据传入 Controller View, 再由 Controller View 传入子 View , 一直到 View 的叶子节点。</p>
<p>这个是一个典型的分而治之策略，将大的页面拆分为小的模块，再由小的模块拆分为小的组件，具体组件负者组件自身的问题，所有子组件都是自私的，不用关心“大家”，只用关心“小家”。</p>
<h3 id="articleHeader13">合而治之 - 中心化控制</h3>
<p>Flux 把所有的 View 都视作愚民，Store 视作资源的拥有者为统治者，统治者需要提供资源（数据）给平民，但是如果平民企图对资源修改（Mutation），必须得先通知给统治者，让统治者决定是否做处理。 </p>
<p>我们为 Flux 中的概念分配角色</p>
<ul>
<li><p><strong>View: 平民</strong></p></li>
<li><p><strong>Action: 资源修改操作</strong></p></li>
<li><p><strong>Dispatcher: 审核官</strong></p></li>
<li><p><strong>Store: 统治者</strong></p></li>
</ul>
<p>一个企图修改资源的操作可以描述为： </p>
<p><code>View Require Mutation -&gt; Action -&gt; Dispatcher -&gt; Store -&gt; Mutate Handler</code></p>
<p>平民提交 Mutation 请求，由审核官控制，审核通过后递交给统治者，统治者再分配给亲信做资源 Mutation</p>
<p>合而治之的策略也等于中心化控制策略， 作为统治者既要懂得放权利（资源的分配），也要懂得控制权利（资源的修改），这种收缩自如的合理性是 Flux 简洁的根本。</p>
<p>同时这种思维带来的优点如下：</p>
<ol>
<li><p>View 的独立性和简单性：View 自身的逻辑简单，不需要知道太多事情，只关心上级传来的数据，这种模式使得 View 是低耦合的，简洁的。</p></li>
<li><p>高可维护性：中心化控制知道所有对资源的操作，如果发生 bug, 可以很快定位问题</p></li>
</ol>
<h3 id="articleHeader14">函数式编程思想</h3>
<p>在 Flux 中数据的单向流动依赖于 View 的确定性，相同的数据传入相同的组件，得到的结果必然要相同，这是函数式编程的思想。</p>
<p>函数式编程中的纯函数（Pure Function）定义如下：</p>
<blockquote><p>纯函数是这样一种函数，即相同的输入，永远会得到相同的输出，而且没有任何可观察的副作用</p></blockquote>
<p>如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// 纯函数，相同的输入必定有相同的输出
function pure(a, b, c) {
    return a + b + c;
}

// 非纯函数，我们永远无法确定 this.a 会变成什么
function notPure(b, c) {
    return this.a + b + c;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-comment">// 纯函数，相同的输入必定有相同的输出</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pure</span>(<span class="hljs-params">a, b, c</span>) </span>{
    <span class="hljs-keyword">return</span> a + b + c;
}

<span class="hljs-comment">// 非纯函数，我们永远无法确定 this.a 会变成什么</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">notPure</span>(<span class="hljs-params">b, c</span>) </span>{
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.a + b + c;
}
</code></pre>
<p>为了保证组件也能做到 “纯函数” 的特性，相同的属性会得到相同的渲染结果。 在写 React 组件的时候尽量准守一下约定：</p>
<ol>
<li><p>尽量使用无状态组件</p></li>
<li><p>除了控制类组件以外其他组件避免使用组件状态</p></li>
<li><p>可以通过属性计算出来的状态不要用状态来表示</p></li>
<li><p>组件的渲染避免外部依赖，按照纯函数的方式写</p></li>
</ol>
<p>函数式的优点也是无副作用组件的优点:</p>
<ol>
<li><p>无耦合，可移植性强: 组件可重用性高</p></li>
<li><p>可测试性高：组件无依赖，可以很容易的单独测试组件</p></li>
</ol>
<h2 id="articleHeader15">1.6.5 Flux 生态</h2>
<p>上面已经讲过 Flux 更应该算是 Facebook 提出的一种前端架构模式，而根据这种理念的 Flux 实现有很多，以下是 github star 数较高的一些实现：</p>
<ol>
<li><p><a href="https://github.com/facebook/flux" rel="nofollow noreferrer" target="_blank">Facebook 官方实现</a></p></li>
<li><p><a href="http://redux.js.org/" rel="nofollow noreferrer" target="_blank">Redux</a> 目前认可度最高的实现</p></li>
<li><p><a href="https://github.com/reflux/refluxjs" rel="nofollow noreferrer" target="_blank">refluxjs</a></p></li>
<li><p><a href="https://github.com/goatslacker/alt" rel="nofollow noreferrer" target="_blank">alt</a></p></li>
<li><p><a href="http://fluxxor.com/" rel="nofollow noreferrer" target="_blank">fluxxor</a></p></li>
</ol>
<p>后面我们会在第四章中专门讲解 Redux 与 React 的应用。</p>
<h2 id="articleHeader16">1.6.6 Flux 与 React 实例</h2>
<p>@todo</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
精益 React 学习指南 （Lean React）- 1.6 Flux

## 原文链接
[https://segmentfault.com/a/1190000005348206](https://segmentfault.com/a/1190000005348206)

