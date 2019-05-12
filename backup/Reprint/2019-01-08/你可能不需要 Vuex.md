---
title: '你可能不需要 Vuex' 
date: 2019-01-08 2:30:11
hidden: true
slug: kf1clr62wpg
categories: [reprint]
---

{{< raw >}}

                    
<p>写这篇文章的主要目的是在现在的公司推荐使用 Vue，而在使用 Vue 的时候很多同事对为什么要使用 Vuex 不理解，我本身是没有使用过 Vue 或者 Vuex 写过实际项目；有过一年左右的 React 和 Redux  相关技术的项目实践，主要是根据对等的一点经验所写；不当之处，欢迎讨论。</p>
<p><strong><a href="https://github.com/chenbin92/blog/issues/1" rel="nofollow noreferrer" target="_blank">相关 Github 地址</a></strong></p>
<h2 id="articleHeader0">目录</h2>
<ul>
<li><p>组件化</p></li>
<li><p>组件通信</p></li>
<li><p>状态管理</p></li>
<li><p>Vuex 是什么</p></li>
<li><p>Vuex 有什么特点</p></li>
<li><p>Vuex 解决了什么问题</p></li>
<li><p>什么类型的数据适合放在 Vuex 管理</p></li>
<li><p>工具</p></li>
<li><p>总结</p></li>
<li><p>参考</p></li>
<li><p>扩展阅读</p></li>
</ul>
<hr>
<h2 id="articleHeader1">组件化</h2>
<blockquote><p>Web Components提供了一种组件化的推荐方式，具体来说，就是：</p></blockquote>
<ul>
<li><p>通过shadow DOM封装组件的内部结构</p></li>
<li><p>通过Custom Element对外提供组件的标签</p></li>
<li><p>通过Template Element定义组件的HTML模板</p></li>
<li><p>通过HTML imports控制组件的依赖加载</p></li>
</ul>
<blockquote><p>所谓组件化，核心意义莫过于提取真正有复用价值的东西。那怎样的东西有复用价值呢？</p></blockquote>
<ul>
<li><p>控件</p></li>
<li><p>基础逻辑功能</p></li>
<li><p>公共样式</p></li>
<li><p>稳定的业务逻辑</p></li>
</ul>
<blockquote><p>-- 摘自xufei的《2015前端组件化框架之路》</p></blockquote>
<p>对组件的粒度进行细分，可以分为：</p>
<ul>
<li><p>UI component: 纯 UI 组件，可以维护本地的 UI State，接收 props 作为数据渲染，保持纯函数形式，具有可复用性。</p></li>
<li><p>Logic component: 带有逻辑的 UI 组件，与数据打交道。</p></li>
</ul>
<p>组件化这个词，在 UI 这一层通常指“标签化”，也就是把大块的业务界面，拆分成若干小块，然后进行组装。狭义的组件化一般是指标签化，也就是以自定义标签（自定义属性）为核心的机制。广义的组件化包括对数据逻辑层业务梳理，形成不同层级的能力封装。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010213894" src="https://static.alili.tech/img/remote/1460000010213894" alt="components" title="components" style="cursor: pointer;"></span></p>
<hr>
<h2 id="articleHeader2">组件通信</h2>
<p>应用在组件化之后，组件之间必然存在某种联系；组件化意味着协同工作，通常存在着 <code>父子组件</code>、<code>兄弟组件</code>、<code>跨级组件</code> 等组件关系，那么组件之间如何进行协调工作，即组件通信；</p>
<p>在 Vue 中，父子组件的关系可以总结为 <strong><code>props down</code></strong>、<strong><code>events up</code></strong>。</p>
<ul>
<li><p><a href="https://cn.vuejs.org/v2/guide/components.html#" rel="nofollow noreferrer" target="_blank">父子组件通信</a>：父组件通过 <code>props</code> 向下传递数据给子组件</p></li>
<li>
<p><a href="https://cn.vuejs.org/v2/guide/components.html#" rel="nofollow noreferrer" target="_blank">子父组件通信</a>：子组件通过 <code>events</code> 给父组件发送消息</p>
<ul>
<li><p>使用 <code>$on(eventName)</code> 监听事件</p></li>
<li><p>使用 <code>$emit(eventName)</code> 触发事件</p></li>
</ul>
</li>
<li><p><a href="https://cn.vuejs.org/v2/guide/components.html#" rel="nofollow noreferrer" target="_blank">非父子组件通信</a>：使用一个空的 Vue 实例作为中央事件总线</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008926241?w=790&amp;h=646" src="https://static.alili.tech/img/remote/1460000008926241?w=790&amp;h=646" alt="component communication" title="component communication" style="cursor: pointer;"></span></p>
<p>可以想象到在简单的 <code>父子</code>，<code>子父</code> 组件之间的通信是很轻松的，通过 <code>props</code> 和 <code>events</code> 即可实现；但是往往我们的应用可能不只有这么简单的层级关系，在多层跨级组件如果通过 <code>props</code> 去传递，那意味着一层一层的往子组件传递，最终你可能不知道当前组件的数据最终来自哪个父组件(当然你可以逆着方向一层一层往上找)，通过 <code>events</code> 事件机制显然也存在着类似的问题。如果你觉得这样也可以接受，<strong>你可能不需要 Vuex</strong>；但如果你在想有没有什么好的模式优雅的去解决，你可以继续阅读下面的部分。</p>
<hr>
<h2 id="articleHeader3">状态管理</h2>
<blockquote>
<p>随着 JavaScript 单页应用开发日趋复杂，JavaScript 需要管理比任何时候都要多的 state （状态）。 这些 state 可能包括服务器响应、缓存数据、本地生成尚未持久化到服务器的数据，也包括 UI 状态，如激活的路由，被选中的标签，是否显示加载动效或者分页器等等。</p>
<p>管理不断变化的 state 非常困难。如果一个 model 的变化会引起另一个 model 变化，那么当 view 变化时，就可能引起对应 model 以及另一个 model 的变化，依次地，可能会引起另一个 view 的变化。直至你搞不清楚到底发生了什么。state 在什么时候，由于什么原因，如何变化已然不受控制。 当系统变得错综复杂的时候，想重现问题或者添加新功能就会变得举步维艰。</p>
</blockquote>
<p>-- 摘自《Redux 中文文档》</p>
<p>在应用中，组件之间的通信其实是归根于应用的状态管理；而应用的状态是来自多方面的，如何对状态进行管理，提高代码的可维护性，提升开发效率；大多数主流框架对数据状态管理也都有了对应的方案：</p>
<ul>
<li><p>React 专注于 UI 层，社区为其提供了 Redux、Mbox 等状态管理库</p></li>
<li><p>Vue 的团也提供了 Vuex 状态管理库</p></li>
<li><p>还有一些专门解决数据层的库，如 RxJS</p></li>
</ul>
<p>回到本文的讨论点，这里我们暂且只讨论 Vue；Vue 的核心库只关注视图层，单文件组件，其模板、逻辑和样式是内部耦合的，侧重数据和视图的同步；Vue 本身并没有对数据状态的管理进行处理，但其提供了另外一个类似 Redux 的解决方案 Vuex，一个集中式状态管理的库；也就是说，<strong>你可能不需要 Vuex</strong>，它只是对你应用状态进行管理的一个库。</p>
<hr>
<h2 id="articleHeader4">Vuex 是什么</h2>
<blockquote><p>Vuex 是一个专门为 Vue.js 应用所设计的<strong>集中式状态管理架构</strong>。</p></blockquote>
<p>-- from vuex docs (updated in 2016-05-27)</p>
<p>...</p>
<blockquote><p>Vuex 是一个专为 Vue.js 应用程序开发的<strong>状态管理模式</strong>。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种<strong>可预测</strong>的方式发生变化。</p></blockquote>
<p>-- from vuex docs (updated in 207-05-20)</p>
<p>上面的定义是摘自 <a href="https://github.com/vuejs/vuex" rel="nofollow noreferrer" target="_blank">Vuex</a> 在 GitHub 上的文档，分别于 2016/05/27 和 2017/05/20 的更新记录；从中我们可以梳理一下关键词：</p>
<ul>
<li><p><strong>集中式状态管理模式</strong>（注意是强调管理应用的所有组件的状态）</p></li>
<li><p><strong>可预测</strong>（前提是以相应的规则作为保证）</p></li>
</ul>
<p>先不着急看下面的内容，如果你看到以上两点特性，脑海已经有了答案，能很好的向你的同事解释清楚，前提是你的同事完全没有任何 Vuex 的经验，那下面的内容你可以直接忽略。你也应该知道你的应用<strong>是否需要 Vuex 了</strong>。</p>
<h2 id="articleHeader5">Vuex 有什么特点</h2>
<p>从上面的定义中可以知道 Vuex 的特点其实就是下面两点：</p>
<ul>
<li><p>集中式状态管理</p></li>
<li><p>可预测</p></li>
</ul>
<h3 id="articleHeader6">什么是集中式状态管理模式</h3>
<p>在说集中式管理模式之前，我们可以先来想想常见的处理方式是怎样的，即每个组件维护自身的数据和状态，自给自足，分而治之；其思路大致如下：</p>
<ul>
<li><p>定义组件自身的初始数据</p></li>
<li><p>在组件内获取异步数据</p></li>
<li><p>根据数据渲染更新视图</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 渲染视图
<template>
  <h2>single file component</h2>
<template>

<script>
  export default {
    // 初始数据
    data() {
    
    },
    
    // 获取异步数据
    created() {
      this.fetchData()
    },
    
    methods {
      fetchData() {
        // do something
      }
    }
  }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 渲染视图</span>
&lt;template&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">h2</span>&gt;</span>single file component<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span></span>
&lt;template&gt;

<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
    <span class="hljs-comment">// 初始数据</span>
    data() {
    
    },
    
    <span class="hljs-comment">// 获取异步数据</span>
    created() {
      <span class="hljs-keyword">this</span>.fetchData()
    },
    
    methods {
      fetchData() {
        <span class="hljs-comment">// do something</span>
      }
    }
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>可简单对比 React 的思路：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// https://github.com/xufei/blog/issues/19#issuecomment-85989838

var render = function(Model) {
  return View;
}
event_loop(function(){
  var currentView = render(currentModel);
  map_view_into_user_interface(currentView);
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// https://github.com/xufei/blog/issues/19#issuecomment-85989838</span>

<span class="hljs-keyword">var</span> render = <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(Model)</span> </span>{
  <span class="hljs-keyword">return</span> View;
}
event_loop(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span></span>{
  <span class="hljs-keyword">var</span> currentView = render(currentModel);
  map_view_into_user_interface(currentView);
})</code></pre>
<p>分治带来的是可管理性，把组件设想成一个单一的东西，一个组件包含了自身需要的数据和视图，把查询逻辑封装在内部，外部只需要实现一个响应事件获取事件的东西基于可以了。即 <code>Single File Component</code> 概念，组件化后，整个应用的树结构可以一目了然，可以随意添加或者移除一个组件，而不会影响其他的组件，听起来很美好；但事情并非那么完美，由于这种方式封装的组件的内部实现聚合了异步请求的数据和自身的状态，真正组装复用起来是存在一定问题的。比如：</p>
<ul>
<li><p>在同一可视区域的冗余请求数</p></li>
<li><p>不同层级组件的数据共享问题</p></li>
<li><p>...</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010213895" src="https://static.alili.tech/img/remote/1460000010213895" alt="vue data flow" title="vue data flow" style="cursor: pointer;"></span></p>
<p>集中式状态管理模式则以一个全局单例模式管理应用的状态，类似于全局对象，但不完全一样。</p>
<ul>
<li><p>Vuex 的状态管理存储是响应式的：就是当你的组件使用到了 Vuex 的某个状态，一旦它发生改变了，所有关联的组件都会自动更新相对应的数据。<br><span class="img-wrap"><img data-src="/img/remote/1460000010213896" src="https://static.alili.tech/img/remote/1460000010213896" alt="store" title="store" style="cursor: pointer;"></span></p></li>
<li><p>不能直接修改 Vuex 的状态：修改 Vuex 的状态唯一途径是<strong>提交(commit) mutations 来实现修改</strong></p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008520681?w=701&amp;h=551" src="https://static.alili.tech/img/remote/1460000008520681?w=701&amp;h=551" alt="vuex flow" title="vuex flow" style="cursor: pointer; display: inline;"></span></p>
<p>如上图，Vuex为Vue Components建立起了一个完整的生态圈，包括开发中的API调用一环。围绕这个生态圈，简要介绍一下各模块在核心流程中的主要功能：</p>
<ul>
<li><p>Vue Components：Vue组件。HTML页面上，负责接收用户操作等交互行为，执行dispatch方法触发对应action进行回应。</p></li>
<li><p>dispatch：操作行为触发方法，是唯一能执行action的方法。</p></li>
<li><p>actions：操作行为处理模块。负责处理Vue Components接收到的所有交互行为。包含同步/异步操作，支持多个同名方法，按照注册的顺序依次触发。向后台API请求的操作就在这个模块中进行，包括触发其他action以及提交mutation的操作。该模块提供了Promise的封装，以支持action的链式触发。</p></li>
<li><p>commit：状态改变提交操作方法。对mutation进行提交，是唯一能执行mutation的方法。</p></li>
<li><p>mutations：状态改变操作方法。是Vuex修改state的唯一推荐方法，其他修改方式在严格模式下将会报错。该方法只能进行同步操作，且方法名只能全局唯一。操作之中会有一些hook暴露出来，以进行state的监控等。</p></li>
<li><p>state：页面状态管理容器对象。集中存储Vue components中data对象的零散数据，全局唯一，以进行统一的状态管理。页面显示所需的数据从该对象中进行读取，利用Vue的细粒度数据响应机制来进行高效的状态更新。</p></li>
<li><p>getters：state对象读取方法。图中没有单独列出该模块，应该被包含在了render中，Vue Components通过该方法读取全局state对象。</p></li>
</ul>
<blockquote><p>Vue组件接收交互行为，调用dispatch方法触发action相关处理，若页面状态需要改变，则调用commit方法提交mutation修改state，通过getters获取到state新值，重新渲染Vue Components，界面随之更新</p></blockquote>
<p>建议类比 Redux 的流程，大体上是相同的：</p>
<ul>
<li><p><a href="https://div.io/topic/1309" rel="nofollow noreferrer" target="_blank">深入到源码：解读 redux 的设计思路与用法</a></p></li>
<li><p><a href="https://github.com/reactjs/redux" rel="nofollow noreferrer" target="_blank">Redux</a></p></li>
</ul>
<h3 id="articleHeader7">集中式状态管理的好处</h3>
<p>相对于分治(碎片化)的状态管理，多个状态分散的跨越在不同组件交互在各个角落，每个 View 会有相对应的 Model 维护状态；而集中式管理模式则用于将分散于组件的状进行集中化管理，提供一个全局的 store 存储管理应用的状态。集中式的状态管理可以让整体的状态变化更加明晰，尤其是配合各自的 devtools。它具备以下特点：</p>
<ul>
<li><p>components share state(组件之间共享状态)</p></li>
<li><p>state should be accessible from everywhere(所有状态可以方便获取)</p></li>
<li><p>components need to mutate the state(组件可以修改状态)</p></li>
<li><p>components need to mutate the state of another component(组件可以修改其他组件的状态)</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010213897" src="https://static.alili.tech/img/remote/1460000010213897" alt="vuex-store-gif" title="vuex-store-gif" style="cursor: pointer;"></span></p>
<h4>集中式状态管理的弊端</h4>
<p>上面提到<strong>集中式存储管理应用的所有组件的状态</strong>，而应用的状态上文已经有提到，这里大致可以分为:</p>
<ul>
<li><p>UI 状态：用户输入的状态</p></li>
<li><p>数据状态：服务端传过来的数据状态</p></li>
<li><p>客户端信息：设备信息的状态</p></li>
<li><p>其他...</p></li>
</ul>
<p>这里是有歧义的，<strong>集中式存储管理应用的所有状态</strong>，按照字面意思是将所有的状态都集中式管理，也就是存到 Vuex 的全局单一 store 中，显然我们是不能这样去理解的，应该视应用场景而定的，大致也可以分为以下几种：</p>
<ul>
<li><p>对于用户输入的状态，比如控制模态框的显示隐藏，我们一般在组件内处理消化；对于需要需要跨组件通信的，则可以存储在全局的 store 中，我们可以将这一类状态称之为本地状态（local state）。</p></li>
<li><p>对于服务端传过来的数据状态，按照大多数的实践是存储在全局的 store 中，这样可以在任意的组件中都可以使用；当然，也可以只将多组件的共享的数据存储在全局的 store 中，单个组件需要的数据内部处理消化，组件销毁时对应的数据状态也会销毁。</p></li>
</ul>
<p>对于客户端的信息或者一些其他的数据状态与上面两种方式在一定程度上也是相似的。这一切看起来并没什么问题，然而细细想想，当一个应用的足够复杂时，我们该如何去设计我们的数据模型，本地共享的状态是存在 store 还是通过事件机制去处理，服务端的数据是一股脑都塞给全局的 store 存在内存里还是视应用场景而定，在 Vuex 的文档或者是 Redux 文档这都没有唯一的答案。假设服务端传过来的数据都存在 store， 那最终的 store 会有多大，这是一个值得探索的问题。那究竟什么样的数据适合存储在全局的 store 中？</p>
<p>另外，使用 Vuex 必须按照上述 Vuex 的工作流程去进行，定义对应的 <code>actions</code>， <code>mutations</code>等等，这显然是在强制约定你以相应的规则去编写你的应用，对大多数新人来说，这是繁琐的。就相当于你得到了一定的好处，那你也得相应的有所付出。</p>
<h2 id="articleHeader8">什么类型的数据适合放在 Vuex 管理</h2>
<p>至此，我们大概讨论了由于组件化，会产生组件间相互通信数据管理的问题，对此也有相应了的解决办法；然而，并没有一种很好的方式告诉我们到底什么类型的数据适合放在单一的 store 进行管理；回到 Vuex 的定义，将数据使用 Vuex 管理的主要原因之一是解决<strong>组件间的数据共享</strong>。</p>
<p>所谓共享指的是，同一份数据被多处组件使用，并且要保持一定程度的同步：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010213898" src="https://static.alili.tech/img/remote/1460000010213898" alt="store-flow" title="store-flow" style="cursor: pointer;"></span></p>
<p>故而，在开发应用时，如何设计抽象数据层，这个是没有唯一答案的。但如果明白了其间的利弊，比如独立了数据层，视图的职责就非常单一，无非就是根据订阅的数据渲染页面，视图组件间的通信就会很少，大家都会去跟数据层交互，维护一份统一的数据结构。</p>
<hr>
<h2 id="articleHeader9">工具</h2>
<p>到这里，你应该可以确定你的应用是否应该使用 Vuex 了，如果你使用了 Vuex，那么它还有一些其他的附属产品；如下面的 <a href="https://github.com/vuejs/vue-devtools" rel="nofollow noreferrer" target="_blank">vue-tool</a> 调试工具，它可以让你对你的应用状态了如指掌，保存状态快照，历史回滚/时光旅行等等特性。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010213899" src="https://static.alili.tech/img/remote/1460000010213899" alt="vue-devtool-demo" title="vue-devtool-demo" style="cursor: pointer;"></span></p>
<h2 id="articleHeader10">总结</h2>
<p>合久必分，分久必合；Vue 提倡 <code>Single File Component</code> 概念将单一功能进行组件化封装，而 Vuex 的设计则是将分散在各处的状态进行合并集中管理的抽象模式。利弊在上面的文章也已说明，它是一种可选的方案，你用或者不用，取决于你的应用。</p>
<h2 id="articleHeader11">参考</h2>
<p>注：对组件化和状态管理方面主要参考徐飞的系列文章，严重推荐深度阅读徐飞关于 <a href="https://github.com/xufei/blog#web" rel="nofollow noreferrer" target="_blank">《web 应用》</a> 和 <a href="https://github.com/xufei/blog#" rel="nofollow noreferrer" target="_blank">《随笔系列》</a> 文章</p>
<ul>
<li><p><a href="https://github.com/xufei/blog#web" rel="nofollow noreferrer" target="_blank">徐飞的《web 应用》系列文章</a></p></li>
<li><p><a href="https://github.com/xufei/blog#" rel="nofollow noreferrer" target="_blank">徐飞的《随笔系列》系列文章</a></p></li>
<li><p><a href="https://tech.meituan.com/vuex-code-analysis.html" rel="nofollow noreferrer" target="_blank">Vuex框架原理与源码分析</a></p></li>
</ul>
<h2 id="articleHeader12">扩展阅读</h2>
<ul>
<li><p><a href="https://github.com/lifesinger/blog/issues/184" rel="nofollow noreferrer" target="_blank">Web 研发模式演变</a></p></li>
<li><p><a href="https://leeluolee.github.io/fequan-netease/#/" rel="nofollow noreferrer" target="_blank">漫谈Web前端的『组件化』</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006016817">GUI应用程序架构的十年变迁</a></p></li>
<li><p><a href="http://www.jianshu.com/p/a971cc324cd7" rel="nofollow noreferrer" target="_blank">复杂单页面应用的状态管理思考</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
你可能不需要 Vuex

## 原文链接
[https://segmentfault.com/a/1190000010213889](https://segmentfault.com/a/1190000010213889)

