---
title: '学习Redux刷新了我的前端App状态管理观' 
date: 2019-02-01 2:30:10
hidden: true
slug: ugw4b8aq7ke
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">写在前面的话</h2>
<blockquote>
<p>听过Redux好久了，不过真的开始学大概在一个月前，学会Redux之后我用一周多的时间重构了之前纯React写的一个小项目。学习的过程中心态变化很大，但是最终真的感觉如果再写复杂一点的项目，我应该再也不会直接用state管理所有状态了。Redux真的刷新了我的状态管理观。</p>
<p>本文的写作目的在于让那些一直在使用React，但是还没有使用Redux管理复杂应用状态的同学了解Redux的核心思想并能够更加平滑的学习使用Redux。</p>
</blockquote>
<h2 id="articleHeader1">为什么要使用Redux</h2>
<p>快双十一了，突然想到一个比喻来解释为什么会有React这类框架的存在，为什么我们要使用Redux，话说以前使用jQuery不也挺快乐的嘛。</p>
<h3 id="articleHeader2">一个比喻</h3>
<p>想想现代物流系统发展的不同阶段，我们寄一件东西的过程，</p>
<ul>
<li>
<p>没有物流系统时：</p>
<ul>
<li><p>打包准备好要送出去的东西；</p></li>
<li><p>出门乘车到达朋友家，把东西送给朋友；</p></li>
<li><p>很直接很方便，很费时间，送东西的距离有限（同城？）；</p></li>
</ul>
</li>
<li>
<p>出现了各大物流公司时：</p>
<ul>
<li><p>打包准备好要送出去的东西；</p></li>
<li><p>出门到距离家最近的物流公司，填写物品，收件人等基本信息；</p></li>
<li><p>物流公司替你送物品到你的朋友处，自己可以回家做别的事情了；</p></li>
<li><p>多了一个中介，要付一定的运送成本，但是东西可以送到远在几千公里之外的其它人了，用一点点钱节约了自己宝贵的时间，完成了以前我们不可能做的事情；</p></li>
</ul>
</li>
</ul>
<p>没错，没有物流系统时对应的就是以前使用jQuery的前端阶段，做一件事情很直接，如果只是送快递给一个特别近的人，那当然是非常方便。就算你要从北京送一个东西到上海，在这个阶段你也可以实现，但是需要付出的代价就太大了。</p>
<p>而出现了各大物流公司对应的就是使用React等框架的阶段，学习React需要付出成本，如果你只需要做简单的事情（比如说你想把东西送给你的邻居），那使用此类框架其实显得特别累赘，把简单的事情复杂化了，但是如果你想做复杂一点的事情（同时寄礼物给三个不同城市的人），那么选择快递公司是不会错的。</p>
<p><strong>那么React和Redux的关系又该如何理解呢？</strong></p>
<p>我觉得我们可以把<code>React</code>比如为一家自建快递系统的公司（京东？），在一定范围内，它的快递系统已经足够好了（部分一二线城市一天内直达），但是要管理这个日益复杂的快递系统，需要公司付出巨大的成本。</p>
<p><code>Redux</code>可以看做业内最好的第三方快递系统（顺丰？），使用它比较贵（学习成本稍微有点高），但是他到达全国主要城市都会特别快，如果你是一个电商老板，采用这个第三方物流系统之后，你只需要关注于自己的货物，几乎不用再去关心物流怎么办了。</p>
<p>不同于顺丰每一次寄货都要那么高的价格，redux是一个学习一次，就可以免费寄货的优秀第三方快递系统，那我们当然要解散自己的物流公司来采用这个第三方的选择的。不过话说回来，学习是需要有成本的，所以是直接使用React还是学习Redux再使用，这是你一个你需要依据你自己项目的实际情况作出选择的事情。</p>
<p>不过这个例子可能并不足够合适，Redux做的不仅仅是管理原来React里state里面的状态。Redux其实可以接管我们的app里所有的数据。接下来我们具体看看Redux究竟做了什么。</p>
<h3 id="articleHeader3">Redux可以做什么</h3>
<p>我们常常听到一种说法，“Redux是一个非常好的状态管理器”，那究竟什么是状态呢。</p>
<h4>重新理解前端中的状态</h4>
<p>想想我们平时看的网页，app，或者任何其它和我们有交互的东西，我们感觉到交互的发生是因为界面依据我们的行为作出了反馈，界面所有的改变，其实都可以看作是状态的改变，或者说界面会改变是因为我们的某个行为（事件）（<code>click</code>,<code>drag</code>,<code>move</code>...）触发了某个函数，函数造成了状态的改变，进而改变了界面。</p>
<p>如此看来，无论是显示隐藏这种可见的状态，还是从服务器获取更多的数据，这些都可以看做是状态，而这些状态就是我们的Redux要管理的。</p>
<p>换一个可能比较专业一点的说法吧，状态包括</p>
<ul>
<li><p>API State;（数据）</p></li>
<li><p>UI State;(UI的表现形式)</p></li>
</ul>
<h4>前端状态管理史</h4>
<p>为了更好的展示Redux的好，我们回顾一下前端的状态管理史（称为史其实并不合适，以下三种模式现在都有大量人在使用）。</p>
<ul>
<li>
<p>中古</p>
<ul>
<li><p>jQuery 时期</p></li>
<li><p>我们使用诸如<code>$(element).addClass('active')</code>这样的语句来改变状态；</p></li>
<li><p>对简单的应用来说，这样写简单明了，但是状态一多一复杂就乱了，并不存在一个专门管理状态的地方；</p></li>
</ul>
</li>
<li>
<p>近代</p>
<ul>
<li><p>React内部管理状态时期</p></li>
<li><p>我们引入了<code>state</code>来管理组件状态，界面想显示不同的样子，我们通过各种函数来改变<code>state</code>来实现</p></li>
<li><p>已经存在一个专门管理状态的<code>state</code>（对象，数组）了，对大部分应用来说，用<code>state</code>来管理状态已经足够了,但是应用复杂了会使得状态</p></li>
</ul>
</li>
<li>
<p>现代</p>
<ul>
<li><p>引入Redux等状态管理机制时期；</p></li>
<li><p>redux使用一个<code>store</code>来全局管理各种状态，提供一些不算复杂的api来专门管理状态；</p></li>
<li><p>可以管理更加复杂的状态，通过redux的管理，状态的改变变得更加清晰，可预测,<code>redux</code>中的状态是一个只读属性，通过一定的方法，可以回到已经经历过的某个状态（时间旅行）;</p></li>
</ul>
</li>
</ul>
<p>（这里没有说到MVC等机制有兴趣的同学可以看<a href="http://www.youhavetolearncomputers.com/blog/2015/9/15/a-conceptual-overview-of-redux-or-how-i-fell-in-love-with-a-javascript-state-container" rel="nofollow noreferrer" target="_blank">这篇文章</a>做进一步对比了解，基本观点是MVC固然很好，但是配合React使用时，性价比不是那么高了。）</p>
<h3 id="articleHeader4">Redux是怎么管理状态的</h3>
<p>上面已经说了Redux管理状态特别好，那Redux究竟是如何管理状态的呢？状态分为UI State 和 API State，Redux针对这两部分也提供了两种方法</p>
<ul>
<li><p>为改变已有的状态提供了方案；</p></li>
<li><p>为异步获取新的数据提供了方案；</p></li>
</ul>
<h4>Redux的数据流</h4>
<p>还是用图片来说明更加清楚<br>下图说明了Redux和React的状态流分别是怎么样的；<br><span class="img-wrap"><img data-src="/img/remote/1460000007397554?w=800&amp;h=500" src="https://static.alili.tech/img/remote/1460000007397554?w=800&amp;h=500" alt="React和Redux分别是怎么管理状态的" title="React和Redux分别是怎么管理状态的" style="cursor: pointer; display: inline;"></span></p>
<p>下图说明了使用Redux管理状态为什么是可预测的<br><span class="img-wrap"><img data-src="/img/remote/1460000007397555?w=700&amp;h=300" src="https://static.alili.tech/img/remote/1460000007397555?w=700&amp;h=300" alt="可预测的Redux状态" title="可预测的Redux状态" style="cursor: pointer; display: inline;"></span></p>
<p>Redux的数据是如何流动的其实也是理解Redux的好处的关键部分之一，简单来说每个事件会发送一个action，action通过dispatch触发reduce，直接依据旧的state生成一个新state替代最顶层的store里面原有的state。</p>
<p>有一篇文章以漫画的形式把这个讲的特别透<a href="https://code-cartoons.com/a-cartoon-intro-to-redux-3afb775501a6#.alj778pma" rel="nofollow noreferrer" target="_blank">A Cartoon intro to redux</a></p>
<p>说了这么多使用redux管理状态的好处，但是你看到这里可能依旧不知道如何使用<code>redux</code>,不要着急，我和你分享我的Redux学习经验。</p>
<h2 id="articleHeader5">开始学习Redux</h2>
<h3 id="articleHeader6">学习Redux前需要了解的基础知识</h3>
<p>如果你已经能很熟练的使用React，我觉得学习Redux需要了解的基础知识，你应该都已经了解了。具体说来主要有以下内容；</p>
<ul>
<li><p>React（Redux是flux架构的实现，虽然其也可以配合其它框架使用，但是它和React可能还是更配一些吧）；</p></li>
<li><p>基础的ES6知识（Redux重视函数式编程，会使得编程的结构看起来更加简洁）；</p></li>
<li><p>用了ES6（甚至ES7）当然免不了要学习使用Webpack，Babel等；</p></li>
<li><p>还有一点，我觉得学习编程应该不怕折腾，使用Redux管理一个状态可能需要改好几个文件里的代码才能实现，编程不再显得那么直接（比如 通过<code>connect.js</code>调用<code>action.js</code>里的某个<code>action</code>,并依据这个<code>action</code>触发<code>reducer.js</code>里面的某个<code>reducer</code>函数依据现有的<code>state</code>,创建一个新的<code>state</code>）,redux把一些操作给抽象化了，如果思维没有跟着改变，会让人有一种redux文档里面的东西我都看懂了，但是我怎么就是编不出来呢？那种痛苦的感觉。</p></li>
</ul>
<h3 id="articleHeader7">学习使用Redux</h3>
<p>网上关于Redux的教程特别多了（<a href="http://redux.js.org/" rel="nofollow noreferrer" target="_blank">官方文档</a>写的特别好），学习新概念是比较恼人的一个过程，所以我还是会对Redux提供的api做一个简洁的描述，然后我会把我这段时间看过的我觉得比较好的文章的链接放在下面以供大家参考。</p>
<h4>Redux中的一些概念</h4>
<ul>
<li><p><code>state</code>:app中的状态存放的地方，并且state是只读的，不同于React，Redux中state的更改，其实是创建了一个全新的state；</p></li>
<li><p><code>action</code>:是一个对象，作用和他的名字一样，用来表明，你想要做的那件事情，该对象的属性type，用来标记，你要做的事情；</p></li>
<li><p><code>reducer</code>:是一个函数，接收当前state，和一个action作为参数，依据action基于当前的<code>state</code>生成新的<code>state</code>;</p></li>
<li><p><code>dispatch</code>:推送某个<code>action</code>给<code>reducer</code>;</p></li>
<li><p><code>action creater</code>:一个创建<code>action</code>的函数，返回一个<code>action</code>对象；</p></li>
<li><p><code>异步action</code>：返回一个函数，和中间件配合可以很容易的实现异步操作；</p></li>
<li>
<p><code>store</code>:可以理解为<code>state</code>的家，全局只有一个，有以下方法</p>
<ul>
<li><p><code>getState()</code>:获取当前的state树；</p></li>
<li><p><code>dispatch(action)</code>:触发一个action,创建state;</p></li>
<li><p><code>subscribe(listener)</code>:</p></li>
<li><p><code>replaceReducer(nextReducer)</code></p></li>
</ul>
</li>
<li><p><code>combineRedecers(reducers)</code>：当我们的应用比较复杂的时候，我们可能会分开写好几个<code>reducer</code>，这个函数的作用就是把这些单独的reduce合并为一个大的reduce，需要注意的是我们的state的结构和我们的各个<code>reducer</code>是一一对应的。</p></li>
<li><p><code>applyMiddleware(...middlewares)</code>:告诉redux我们会用到那些中间件，比如说要用到基础的异步，我们会用到thunk中间件；</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let store = createStore(
    comReducer,
    applyMiddleware(thunk)
);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> store = createStore(
    comReducer,
    applyMiddleware(thunk)
);</code></pre>
<ul><li><p><code>bindActionCreators(actionCreators, dispatch)</code>:绑定<code>actionCreator</code>和<code>dispatch</code>以供直接使用；</p></li></ul>
<h4>配合 React 使用Redux需要掌握的一些概念</h4>
<p>redux只是管理状态的一种方法，真的用在React里，使用作者提供的一个工具<code>react-redux</code>会更加方便，其api很简单，主要有以下几个；</p>
<ul>
<li><p><code>&lt;Provider store&gt;</code>,嵌套在React组件的最外层，因此可以把state传给所有的组件（利用了React的<code>context</code>）；</p></li>
<li><p>把React组件分为容器组件和UI组件两类，容器组件管理逻辑，UI组件管理显示效果二者通过<code>connect</code>方法连接，容器组件一般由UI组件依据<code>connect</code>生成；</p></li>
<li><p><code>mapStateToProps()</code>，存在于容器组件中，针对UI组件的各状态(依据<code>state</code>，或者父组件的<code>props</code>)生成；</p></li>
<li><p><code>mapDispatchToProps()</code>，存在于容器组件中，针对UI组件中的各可能改变state的事件定义的一系列的函数，依据<code>props</code>传给UI组件；</p></li>
</ul>
<h4>Redux参考文献</h4>
<p><a href="http://cn.redux.js.org/index.html" rel="nofollow noreferrer" target="_blank">官方文档(中文)</a></p>
<p><a href="https://blog.andyet.com/2015/08/06/what-the-flux-lets-redux/" rel="nofollow noreferrer" target="_blank">What the Flux?! Let’s Redux.</a></p>
<p><a href="https://code-cartoons.com/a-cartoon-intro-to-redux-3afb775501a6#.3qr8fvwlr" rel="nofollow noreferrer" target="_blank">a-cartoon-intro-to-redux</a></p>
<p><a href="http://cn.redux.js.org/docs/introduction/Ecosystem.html" rel="nofollow noreferrer" target="_blank">官网推荐的经典文章列表</a></p>
<p><a href="http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_one_basic_usages.html" rel="nofollow noreferrer" target="_blank">阮一峰的三篇教程</a></p>
<p>Redux还有一个非常酷的工具，让我们可以实时看到当前的state,使用redux不可不用啊。<br><a href="https://github.com/gaearon/redux-devtools" rel="nofollow noreferrer" target="_blank">酷酷的工具redux devtools</a></p>
<h4>学会使用还是得靠实践</h4>
<p>在弄懂了一些关键的核心概念以后，如果还是不知道怎么写，就模仿官方给的多个例子针对自己的需求敲写一次吧。模仿了两个例子就肯定明白了。</p>
<h2 id="articleHeader8">后言</h2>
<p>Redux也有自己的<a href="http://redux.js.org/docs/introduction/Ecosystem.html" rel="nofollow noreferrer" target="_blank">小生态</a>,理解的一些技术辅助Redux更加方便的实现状态管理，其中有一些是下一步我特别想了解的比如说<a href="https://facebook.github.io/immutable-js/" rel="nofollow noreferrer" target="_blank">immutable-js</a>，<a href="https://github.com/reactjs/reselect" rel="nofollow noreferrer" target="_blank">reselect</a>，<a href="https://github.com/paularmstrong/normalizr" rel="nofollow noreferrer" target="_blank">normalizr</a>，当然因为学习了Redux，所以我也想对函数式编程做进一步理解，之前找到了一本非常好的关于函数式编程的书<a href="https://drboolean.gitbooks.io/mostly-adequate-guide/content/" rel="nofollow noreferrer" target="_blank">mostly-adequate-guide</a>，分享给大家，大家一起学习。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
学习Redux刷新了我的前端App状态管理观

## 原文链接
[https://segmentfault.com/a/1190000007397551](https://segmentfault.com/a/1190000007397551)

