---
title: 'Mvvm 前端数据流框架精讲' 
date: 2018-12-07 2:30:10
hidden: true
slug: nvpw88fgk5s
categories: [reprint]
---

{{< raw >}}

                    
<p><a href="http://www.codedata.cn/hacknews/152254690943728841" rel="nofollow noreferrer" target="_blank">原文链接</a>, 如果感兴趣可以加QQ群: 157937068, 一起交流。</p>
<p>本次分享是带大家了解什么是 mvvm，mvvm 的原理，以及近几年产生了哪些演变。</p>
<p>同时借 mvvm 这个话题拓展到对各类前端数据流方案的思考，形成对前端数据流整体认知，帮助大家在团队中更好的做技术选型。</p>
<h2 id="articleHeader0">Mvvm 的概念与发展</h2>
<h3 id="articleHeader1">Mvvm &amp; 单向数据流</h3>
<p>Mvvm 是指双向数据流，即 View-Model 之间的双向通信，由 ViewModel 作桥接。如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014122741" src="https://static.alili.tech/img/remote/1460000014122741" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p>而单向数据流则去除了 View -&gt; Model 这一步，需要由用户手动绑定。</p>
<h3 id="articleHeader2">生态 - 内置 &amp; 解耦</h3>
<p>许多前端框架都内置了 Mvvm 功能，比如 Knockout、Angular、Ember、Avalon、Vue、San 等等。</p>
<p>而就像 Redux 一样，Mvvm 框架中也出现了许多与框架解耦的库，比如 Mobx、Immer、Dob 等，这些库需要一个中间层与框架衔接，比如 mobx-react、redux-box、dob-react。解耦让框架更专注 View 层，实现了库与框架灵活搭配的能力。</p>
<p>解耦的数据流框架也诠释了更高抽象级别的 Mvvm 架构，即：View - 前端框架，Model - (mobx, dob)，ViewModel - (mobx-react, dob-react)。</p>
<p>同时也实现了数据与框架分离，便于测试与维护。比如下面的例子，左边是框架无关的纯数据/数据操作定义，右边是 View + ViewModel：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014122742" src="https://static.alili.tech/img/remote/1460000014122742" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader3">运行效率 - 脏检测 &amp; getter/setter 劫持</h3>
<p>Angluar 早期的脏检测机制虽然开创了 mvvm 先河，但监听效率比较低，需要 N + 1 次确认数据是否有联动变化，就像下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014122743" src="https://static.alili.tech/img/remote/1460000014122743" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>现在几乎所有框架都改为 getter/setter 劫持实现监听，任何数据的变化都可以在一个事件循环周期内完成：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014122744" src="https://static.alili.tech/img/remote/1460000014122744" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">语法 - 特殊语法 &amp; 原生语法</h3>
<p>早期一些 Mvvm 框架需要手动触发视图刷新，现在这种做法几乎都被原生赋值语句取代。</p>
<h3 id="articleHeader5">数据变更方式 - Mutable &amp; Immutable</h3>
<p>下图的代码语法虽为 mutable，但产生的结果可能是 mutable，也可能是 immutable，取决于 mvvm 框架内置实现机制：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014122745" src="https://static.alili.tech/img/remote/1460000014122745" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader6">Connect 的两种写法</h3>
<p>由于 mvvm 支持了 mutable 与 immutable 两种写法，所以对于 mutable 的底层，我们使用左图的 connect 语法，对于 immutable 的底层，需要使用右图的 conenct 语法：</p>
<p>[图片上传失败...(image-b7408b-1522595335875)]</p>
<p>对左图而言，由于 mutable 驱动，所有数据改动会自动调用视图刷新，因此不但更新可以一步到位，而且可以数据全量注入，因为没用到的变量不会导致额外渲染。</p>
<p>对右图，由于 immutable 驱动，本身并没有主动驱动视图刷新能力，所以当右下角节点变更时，会在整条链路产生新的对象，通过 view 更新机制一层层传导到要更新的视图。</p>
<h2 id="articleHeader7">从 TFRP 到 mvvm</h2>
<p>讲到 mvvm 的原理，先从 TFRP 说起，详细可以参考 <a href="https://zhuanlan.zhihu.com/p/31864323" rel="nofollow noreferrer" target="_blank">dob-框架实现</a> 这里以 dob 框架为例子，一步步介绍了如何实现 mvvm。本文简单做个介绍。</p>
<h3 id="articleHeader8">autorun &amp; reaction</h3>
<p>autorun 是 TFRP 的函数效果，即集成了依赖收集与监听，autorun 背后由 reaction 实现。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014122746" src="https://static.alili.tech/img/remote/1460000014122746" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader9">reaction 实现 autorun</h3>
<p>如下图所示，autorun 是 subscription 套上 track 的 reaction，并且初始化时主动 dispatch，从入口（subscription）处激活循环，完成 subscription -&gt; track -&gt; 监听修改 -&gt; subscription 完成闭环。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014122747" src="https://static.alili.tech/img/remote/1460000014122747" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader10">track 的实现</h3>
<p>每个 track 在其执行期间会监听 callback 的 getter 事件，并将 target 与 properityKey 存储在二维 Map 中，当任何 getter 触发后，从这个二维表中查询依赖关系，即可找到对应的 callback 并执行。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014122748" src="https://static.alili.tech/img/remote/1460000014122748" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader11">View-Model 的实现</h3>
<p>由于 autorun 与 view 的 render 函数很像，我们在 render 函数初始化执行时，使其包裹在 autorun 环境中，第 2 次 render 开始遍剥离外层的 autorun，保证只绑定一遍数据。</p>
<p>这样 view 层在原本 props 更新机制的基础上，增加了 autorun 的功能，实现修改任何数据自动更新对应 view 的效果。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014122749" src="https://static.alili.tech/img/remote/1460000014122749" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader12">Mvvm 的缺点与解法？</h2>
<p>Mvvm 所有已知缺点几乎都有了解决方案。</p>
<h3 id="articleHeader13">无法监听新增属性</h3>
<p>用过 Mobx 的同学都知道，给 store 添加一个不存在的属性，需要使用 <code>extendObservable</code> 这个方法。这个问题在 Dob 与 Mobx4.0 中都得到了解决，解决方法就是使用 <code>proxy</code> 替代 <code>Object.defineProperty</code>：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014122750" src="https://static.alili.tech/img/remote/1460000014122750" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader14">异步问题</h3>
<p>由于 getter/setter 无法获得当前执行函数，只能通过全局变量方式解决，因此 autorun 的 callback 函数不支持异步：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014122751" src="https://static.alili.tech/img/remote/1460000014122751" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader15">嵌套问题</h3>
<p>由于 reaction 特性，只支持同步 callback 函数，因此 autorun 发生嵌套时，很可能会打乱依赖绑定的顺序。解决方案是将嵌套的 autorun 放到执行队列尾部，如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014122752" src="https://static.alili.tech/img/remote/1460000014122752" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader16">无数据快照</h3>
<p>mutable 最被人诟病的一点就是无法做数据快照，不能像 redux 一样做时间回溯。有问题自然有人会解决，Mobx 作者的 Immer 库完美的解决了问题。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014122753" src="https://static.alili.tech/img/remote/1460000014122753" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>原理是通过 proxy 返回代理对象，在内部通过浅拷贝替代对对象的 mutable 更改。具体原理可以参考我的这篇文章：<a href="https://zhuanlan.zhihu.com/p/34691516" rel="nofollow noreferrer" target="_blank">精读 Immer.js 源码</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014122754" src="https://static.alili.tech/img/remote/1460000014122754" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader17">无副作用隔离</h3>
<p>mvvm 函数的 Action 由于支持异步，许多人会在 Action 中发请求，同时修改 store，这样就无法将请求副作用隔离到 store 之外。同时对 store 的 mutable 修改，本身也是一种副作用。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014122755" src="https://static.alili.tech/img/remote/1460000014122755" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p>虽然可以将请求函数拆分到另一个 Action 中，但人为因素无法完全避免。</p>
<p>自从有了 Immer.js 之后，至少从支持元编程的角度来看，mutable 并不一定会产生副作用，它可以是零副作用的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function inc(obj) {
  return produce(obj => obj.count++)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">function inc(obj) {
  <span class="hljs-keyword">return</span> produce(obj =&gt; obj.<span class="hljs-built_in">count</span>++)
}</code></pre>
<p>上面这种看似 mutable 的写法其实是零副作用的纯函数，和下面写法等价：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function inc(obj) {
  return {
    count: obj.count + 1,
    ...obj
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="swift hljs"><code class="swift">function inc(obj) {
  <span class="hljs-keyword">return</span> {
    <span class="hljs-built_in">count</span>: obj.<span class="hljs-built_in">count</span> + <span class="hljs-number">1</span>,
    ...obj
  }
}</code></pre>
<p>而对副作用的隔离，也可以做出类似 dva 的封装：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014122756" src="https://static.alili.tech/img/remote/1460000014122756" alt="image" title="image" style="cursor: pointer;"></span></p>
<h2 id="articleHeader18">Mvvm store 组织形式</h2>
<p>Mvvm 在项目中 stores 代码结构也千变万化，这里列出 4 种常见形式。</p>
<h3 id="articleHeader19">对象形式，代表框架 – mobx</h3>
<p>mobx 开创了最基本的 mvvm store 组织形式，基本也是各内置 mvvm 框架的 store 组织形式。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014122757" src="https://static.alili.tech/img/remote/1460000014122757" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader20">Class + 注入，代表框架 – dob</h3>
<p>dob 在 store 组织形式下了不少功夫，通过依赖注入增强了 store 之间的关联，实现 stores -&gt; action 多对一的网状结构。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014122758" src="https://static.alili.tech/img/remote/1460000014122758" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader21">数据结构化，代表框架 – mobx-state-tree</h3>
<p>mobx-state-tree 是典型结构化 store 组织的代表，这种组织形式适合一体化 app 开发，比如很多页面之间细粒度数据需要联动。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014122759" src="https://static.alili.tech/img/remote/1460000014122759" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader22">约定与集成，代表框架 – 类 dva</h3>
<p>类 dva 是一种集成模式，是针对 redux 复杂的样板代码，思考形成的简化方案，自然集成与约定是简化的方向。</p>
<p>另外这种方案更像一层数据 dsl，得益于此，同一套代码可以拥有不同的底层实现。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014122760" src="https://static.alili.tech/img/remote/1460000014122760" alt="image" title="image" style="cursor: pointer;"></span></p>
<h2 id="articleHeader23">Mvvm vs Reactive programming</h2>
<p>Mvvm 与 Reactive programming 都拥有 observable 特性，通过下面两张图可以轻松区分：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014122761" src="https://static.alili.tech/img/remote/1460000014122761" alt="image" title="image" style="cursor: pointer;"></span></p>
<p>上面红线是 mvvm 的 observable 部分，这里指的是数据变化的 autorun 动作。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014122762" src="https://static.alili.tech/img/remote/1460000014122762" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p>上面红线是 Reactive programming 的 observable 部分，指的是数据源派发流的过程。</p>
<h3 id="articleHeader24">Mvvm 与 Reactive programming 的结合</h3>
<p>既然 redux 可以与 rxjs 结合（redux-observable），那么 mvvm 应该也可以如此。</p>
<p>下面是这种方案的构想：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014122763" src="https://static.alili.tech/img/remote/1460000014122763" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<p>rxjs 仅用来隔离副作用与数据处理，mvvm 拥有修改 store 的能力，并且精准更新使用的 View。</p>
<h2 id="articleHeader25">总结</h2>
<p>根据业务场景指定数据流方案，数据流方案没有银弹，只有贴着场景走，才能找到最合适的方案。</p>
<p>了解到 mvvm 的发展与演进，让不同数据流方案组合，你会发现，数据流方案还有很多。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Mvvm 前端数据流框架精讲

## 原文链接
[https://segmentfault.com/a/1190000014122738](https://segmentfault.com/a/1190000014122738)

