---
title: 'Redux story-1:who creates it?' 
date: 2019-01-27 2:31:00
hidden: true
slug: kn3l7fwd55
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p> 这是一个系列文章，旨在分享在react及相关技术栈实践过程中的个人感悟，心得。如果有不好的地方，欢迎各位批评指正。</p>
<p> 由于对react本身还未深入了解，今天我们先来谈一谈redux相关的问题。</p>
<h2 id="articleHeader1">Who creates it?</h2>
<p> <a href="https://github.com/gaearon" rel="nofollow noreferrer" target="_blank">Dan Abramov</a>是<code>redux</code>的作者，同时，他也是<code>Create React App</code>, <code>React Hot Loader</code>作者。当然1年前，他也由于<code>redux</code>及相关的开源贡献加入了<code>facebook</code>（他大二就辍学了，之前还当过.net工程师）。</p>
<p> 在我最初了解到他的时候，我觉得他非常有礼貌。同时，也为了更多的了解<code>redux</code>，我计划开始阅读他的每一条tweet，原先计划的是从15年7月开始，后来因为进展缓慢，而且<code>react</code>版本也已经发生很大变化了，于是便从16年1月1日开始阅读，目前记录到7月15日了。事实也证明，在这个过程中，的的确确学习到了很多东西。包括<code>redux</code>的文档及<code>redux-links</code>的作者<a href="https://github.com/markerikson" rel="nofollow noreferrer" target="_blank">Mark Erikson</a>，以及国外很多写过<code>redux</code>系列的朋友们。</p>
<p> 如果你有兴趣的话，可以看看我摘录的<a href="https://github.com/NE-SmallTown/react-heaven/blob/master/Something-Interestingly-About-Redux-Or-Its-Author.md" rel="nofollow noreferrer" target="_blank">一些片段</a>。其中除了知识性的内容外，还有一些关于它自己生活，经历，学习方法，如何面对JS疲劳等等的摘录。也让我渐渐的了解到了国外的程序员们的一些观点，兴趣，梗等等。</p>
<h2 id="articleHeader2">正文</h2>
<p> 好了，暂时先介绍到这里了。切回redux本身，下面是学习源码过程中自己的一些体会。</p>
<h2 id="articleHeader3">createStore</h2>
<p> <code>createStore</code>的第3个参数为<code>enhancer</code>，如果<code>enhancer</code>有多个，那么应该使用<code>compose</code>的方式组合多个<code>enhancer</code></p>
<p> 且每个<code>enhancer</code>的模板为<code>export default createStore =&gt; (reducer, preloadedState, enhancer) =&gt; {...}</code></p>
<p> 因为在<code>createStore</code>中执行了：<code>return enhancer(createStore)(reducer, preloadedState)</code></p>
<p> 另外，上面的提到的形如<code>(reducer, preloadedState, enhancer) =&gt; {...}</code> 这个样子的其实都可以叫做<code>createStore</code></p>
<p> 这也是社区有那么多<code>enhancer</code>的原因，他们可以形成一个<code>enhancer</code>链，我调用你的<code>createStore</code>，然后返回我的<code>createStore</code>供下一级调用</p>
<p> 所以在自己的<code>createStore</code>的函数体中经常能看到诸如<code>var store = createStore(reducer, preloadedState, enhancer);</code>这样的用法，目的就是让自己这一级之前的<code>enhancer</code>产生一个<code>store</code>出来,而之前的<code>enhancer</code>里的<code>createStore</code>又会调用之前的，到最尽头，就是<code>redux</code>本身的<code>createStore</code></p>
<h2 id="articleHeader4">applyMiddleware</h2>
<p> <code>applyMiddleware</code>的目的是返回一个<code>enhancer</code>，这个<code>enhancer</code>存储了1个或者多个中间件，中间件在上一级的<code>dispatch</code>方法的基础上增添自己的逻辑，然后返回自己的<code>dispatch</code>方法</p>
<p> 对于中间件而言，中间件的模板为：<code>export default store =&gt; next =&gt; action =&gt; {...}</code>。有的地方也写成<code>export default _ref =&gt; next =&gt; action =&gt; {...}</code>或者<code>export default ({getState, dispatch}) =&gt; next =&gt; action =&gt; {...}</code>，看自己喜好了</p>
<p> 实际的调用顺序如下(定义在<code>redux</code>的<code>applyMiddleware.js</code>中)：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. middleware(middlewareAPI);
/*
    var middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    };
    
    chain = middlewares.map(middleware => middleware(middlewareAPI));
    dispatch = compose(...chain)(store.dispatch);

    第1步即为第1次执行中间件，用redux自己的dipatch初始化各个中间件里的dispatch（也就是中间件的next参数）和getState。
    从而确保至少redux本身能够正常工作，中间件的store或者_ref即为这里的middlewareAPI
* */

2. dispatch = compose(...chain)(store.dispatch);
/*
    第2步即为第2次执行中间件
    即用compose的形式链式调用第1步返回的中间件集合，如果中间件是定义在applyMiddleware的最后一个
    那么中间件里的next为store.dispatch，否则next为上一个中间件返回的结果，可以理解为上一个中间件
    返回的是封装了dispatch的自己的dispatch，这里的原理其实和enhancer一模一样

    enhancer的目的是封装多次createStore并用compose的方式进行调用
    middleware的目的是封装多次dispatch并用compose的方式进行调用
* */

总结：
/*
    所以最后在redux的createStore.js中return的enhancer(createStore)(reducer, preloadedState)的结果就是一个增强
    版的store，而这个增强版的store中存放的是增强版的dispatch
* */

/* ××××××××××××××××关于combineReducers×××××××××××××××
*   从执行上来说，combineReducers实际上最后就是变成对reducers进行深度优先遍历并执行的过程
*   从结构上来说，combineReducers决定了我们的state状态树的最终结构或者说形状，他是呈一个树型结构的
*   combineReducers(reducerA, reducerB),reducerA里面嵌套combineReducers(reducerA-child1, reducerA-child2)
*   实际上对应状态树而已就是第一层有两个节点A，B，而A节点下面有两个子节点A-child1，A-child2
*
*   所以在最初设计的时候，我们要设想我们最终的状态树的样子，然后合理划分reducer，就像设计数据库的表结构一样。
    当然这是比较概括的说法，事实上reducer的设计或者说state的划分有太多太多值得研究的东西，这个我们以后再谈了。
* */
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs asciidoc"><code>1. middleware(middlewareAPI);
/*
<span class="hljs-code">    var middlewareAPI = {</span>
<span class="hljs-code">      getState: store.getState,</span>
<span class="hljs-code">      dispatch: (action) =&gt; dispatch(action)</span>
<span class="hljs-code">    };</span>
<span class="hljs-code">    </span>
<span class="hljs-code">    chain = middlewares.map(middleware =&gt; middleware(middlewareAPI));</span>
<span class="hljs-code">    dispatch = compose(...chain)(store.dispatch);</span>

<span class="hljs-code">    第1步即为第1次执行中间件，用redux自己的dipatch初始化各个中间件里的dispatch（也就是中间件的next参数）和getState。</span>
<span class="hljs-code">    从而确保至少redux本身能够正常工作，中间件的store或者_ref即为这里的middlewareAPI</span>
<span class="hljs-bullet">* </span><span class="hljs-strong">*/

</span>2. dispatch = compose(...chain)(store.dispatch);
/*
<span class="hljs-code">    第2步即为第2次执行中间件</span>
<span class="hljs-code">    即用compose的形式链式调用第1步返回的中间件集合，如果中间件是定义在applyMiddleware的最后一个</span>
<span class="hljs-code">    那么中间件里的next为store.dispatch，否则next为上一个中间件返回的结果，可以理解为上一个中间件</span>
<span class="hljs-code">    返回的是封装了dispatch的自己的dispatch，这里的原理其实和enhancer一模一样</span>

<span class="hljs-code">    enhancer的目的是封装多次createStore并用compose的方式进行调用</span>
<span class="hljs-code">    middleware的目的是封装多次dispatch并用compose的方式进行调用</span>
<span class="hljs-bullet">* </span><span class="hljs-strong">*/

</span>总结：
/*
<span class="hljs-code">    所以最后在redux的createStore.js中return的enhancer(createStore)(reducer, preloadedState)的结果就是一个增强</span>
<span class="hljs-code">    版的store，而这个增强版的store中存放的是增强版的dispatch</span>
<span class="hljs-bullet">* </span><span class="hljs-strong">*/

</span>/* ××××××××××××××××关于combineReducers×××××××××××××××
<span class="hljs-bullet">*   </span>从执行上来说，combineReducers实际上最后就是变成对reducers进行深度优先遍历并执行的过程
<span class="hljs-bullet">*   </span>从结构上来说，combineReducers决定了我们的state状态树的最终结构或者说形状，他是呈一个树型结构的
<span class="hljs-bullet">*   </span>combineReducers(reducerA, reducerB),reducerA里面嵌套combineReducers(reducerA-child1, reducerA-child2)
<span class="hljs-bullet">*   </span>实际上对应状态树而已就是第一层有两个节点A，B，而A节点下面有两个子节点A-child1，A-child2
<span class="hljs-bullet">*
</span><span class="hljs-bullet">*   </span>所以在最初设计的时候，我们要设想我们最终的状态树的样子，然后合理划分reducer，就像设计数据库的表结构一样。
<span class="hljs-code">    当然这是比较概括的说法，事实上reducer的设计或者说state的划分有太多太多值得研究的东西，这个我们以后再谈了。</span>
<span class="hljs-bullet">* </span><span class="hljs-strong">*/
</span></code></pre>
<h2 id="articleHeader5">bindActionCreator</h2>
<p><code>bindActionCreator</code>实际就是给<code>actionCreator</code>外层再添加了一层函数，而这层函数存放了对<code>dispatch</code>的引用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function bindActionCreator(actionCreator, dispatch) {
  return (...args) => dispatch(actionCreator(...args))
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">bindActionCreator</span>(<span class="hljs-params">actionCreator, dispatch</span>) </span>{
  <span class="hljs-keyword">return</span> <span class="hljs-function">(<span class="hljs-params">...args</span>) =&gt;</span> dispatch(actionCreator(...args))
}</code></pre>
<p>所以我们可以一般在组件里直接调用<code>bindActionCreator</code>返回的<code>actionCreator</code>，即<code>this.props.loadSomething(...)</code>。而不用写成<code>dispatch(actionCreator(...args))</code>，实际上他们是等价的</p>
<h2 id="articleHeader6">connect</h2>
<p> 既然提到了<code>redux</code>，由于目前我是采用<code>react</code>进行开发，所以不得不提到相关的<code>react-redux</code>。其中最重要的莫属于<code>connect</code>这个函数了。</p>
<p> 传入<code>connect</code>的组件在挂载到页面上后会调用<code>store.subscribe</code>进行订阅，订阅的目的是我们调用<code>dispatch</code>的时候，表明我们的状态树即将发生变化，这个时候我们希望我们的组件对应发生变化，而组件变化的唯一方式就是<code>setState</code>。</p>
<p> 订阅就是告诉<code>redux</code>，这个组件是依赖于状态树的某部分工作的，所以当你变化的时候，记得获取最新的<code>state</code>，然后通知我，至于我如何响应，那就是我自己的事了，你只管通知我状态树发生了变化并把它传给我就行了。值得一提的是，<code>connect</code>内部进行了大量的性能优化，避免不必要的渲染，关于此以及<code>mapStateToProps</code>和<code>mapDispathToProps</code>，我们放到以后再谈。</p>
<h2 id="articleHeader7">结语</h2>
<p> 篇幅有限，这一篇文章暂时就先这样啦，更多的内容，我想放在下一篇来分享，同时自己也在不断学习，希望能理解得更好。</p>
<p> 值得一提的是，我们也许会认为我们了解到的redux，mobx，rxjs等等完全不同理念的库，他们的作者也许也是"极端"的，是排斥他人及理念的。实际上，这是不正确的，早在16年5月，Dan就和mobx的作者在twitter上有过互动，他们达成了共识，那就是和对方一起合作，一起推动自身以及react的发展。</p>
<p> 对于redux-thunk，文档中也许会首先建议使用这个简单的库来处理异步相关的问题。对于复杂的应用，他们也推荐使用redux-saga这样的库去重构自己的代码。在twitter上，Dan也多次提到过库的应用场景的问题，建议大家用之前先了解自己为什么要使用，它解决了哪些痛点，然后再去使用。甚至特意提过<a href="https://github.com/reactjs/react-router-redux/issues/257" rel="nofollow noreferrer" target="_blank">issue</a>，来了解react-router-redux的作用。</p>
<p> 除此之外，也提到在时间充裕的情况下，学习react，应该先从本身入手，ES6，webpack，jsx，redux等等和react本身都是没有直接联系的，在学习完react之后，我们知道了他本身的哪些不足，哪些地方需要加强，哪些地方需要引入第三方库去解决，解决的是哪些痛点，我们再去了解这些工具，才能真正体会到他们的威力。</p>
<p> 说到这里，稍微有一点远了，不过我觉得还是有必要提及一下。那就是，我们身处一个浮躁的社会，无论是在现实中对待朋友，亲人，陌生人，由于学习，工作，生活的压力，周遭的浮躁氛围的影响，多多少少也会让自己带着些许暴戾之气。在网络上，由于约束的放宽，我们也许更会将压抑的情感释放给广袤的网络世界，在微博，贴吧，知乎上，我们或多或少书写着，察觉着这样的行为。</p>
<p> 但是，作为一名程序猿，我还是期待能够看到我们这个圈子更多的将时间，精力，努力花费在对现有技术的改进，对未知世界的探索，追寻程序，库，框架，思想的本质，结交志同道合的朋友，一起交流，分享，思考对技术的看法。而不是卷入无休止的撕逼，用了某某而产生的优越，甚至借贬低他人来抬高自己。</p>
<p> 我们可以理解一时的愤懑之情，因为我们大多，真是只是普普通通的社会人，喜怒哀乐再平常不过。但若我们一直保持这种状态，永远在上面这些场景都留下对人不对事的话语，讥讽，甚至谩骂。希望大家能为我们的后代想想。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Redux story-1:who creates it?

## 原文链接
[https://segmentfault.com/a/1190000008171909](https://segmentfault.com/a/1190000008171909)

