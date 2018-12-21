---
title: '了不起的Virtual DOM(一)：起源' 
date: 2018-12-21 2:30:11
hidden: true
slug: m2psgokgbx
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>　　首先欢迎大家关注我的<a href="https://juejin.im/user/576e377bd342d30057c2e265" rel="nofollow noreferrer" target="_blank">掘金账号</a>和Github<a href="https://github.com/MrErHu/blog" rel="nofollow noreferrer" target="_blank">博客</a>，也算是对我的一点鼓励，毕竟写东西没法获得变现，能坚持下去也是靠的是自己的热情和大家的鼓励。</p>
<p>　　之所以想写本系列文章的主要原因是将近一个月时间没有写点东西了，加上最近各种事情特别多使得我没有过多的时间研究自己喜欢的东西。前段时间看到大神<a href="https://github.com/MrErHu/blog" rel="nofollow noreferrer" target="_blank">livoras</a>的博客，关于Virtual DOM的讲解的非常透彻，由于自己从事React开发，也算是Virtual DOM的使用者，所以萌发了写关于Virtual DOM的系列文章，并且也想尝试自己实现一套Virtual DOM。因此本系列文章会围绕这Virtaul DOM这个话题做一系列的分析甚至也会尝试着和大家一起实现自己的Virtual DOM 框架，感兴趣的同学可以关注的我的<a href="https://juejin.im/user/576e377bd342d30057c2e265" rel="nofollow noreferrer" target="_blank">掘金账号</a>或者关注我的Github<a href="https://github.com/MrErHu/blog" rel="nofollow noreferrer" target="_blank">博客</a>。<br>　　</p>
<h2 id="articleHeader1">框架回顾</h2>
<p>　　首先听到Virtual DOM这个概念应该来自于React，并且在不了解时觉得这个概念是一个逼格特别高的词。其实任何技术的诞生都是有相应的历史的，没有任何事物是凭空出现的，就像我听到很多人诟病JavaScript语言的语法糟粕太多，但实质上你要了解到JavaScript出现的原因和它的作者Brendan Eich仅仅用了十几天就设计出一门广泛流行的高级语言，你一定不会这样想。同样的，Virtual DOM的出现也是有一定的历史原因的，这就不得不讲到前端框架的历史了。<br>　　<br>　　其实所有框架所能做到的事情我们手动都可以实现，对于我们在大学课堂(当然有的学习并没有开设相关的课程)的学习JavaScript时候，想用JavaScript创建一个表单验证的程序时，十几行代码就能搞定，这时候框架这种东西对你是臃肿的、没有必要的。甚至框架会极大的提高你的学习成本、降低你程序的运行速度(框架并不能保证效率一定高于你的手动操作)。但是当你的程序规模逐渐增大，你会发现你的代码数量会指数级膨胀，甚至一个js文件中会有上万行的代码(不要惊讶，我真的见过这场常见)，这时候维护这套代码将是一场灾难。<br>　　<br>　　这时候各种前端框架就应用而生了，框架出现的目的并不是为了提升性能，而是为了可维护性、为了便于团队开发。但是天下没有白吃的午餐，你为了程序的可维护性，出让了一部分性能作为妥协，毕竟什么框架都没有手动原生操作性能高，因为框架要具有适普性，要能处理各种各样的场景。<br>　　</p>
<h3 id="articleHeader2">MVC</h3>
<p>　　其实对于前端所需要的做的就是展示数据的界面(View)以及在界面的更改能触发相应的数据(Model)变化，并且数据(Model)发生改变时界面(View)也能及时响应并做相应的变化。说到底就是如何协调View与Modal的关系。<br>　　<span class="img-wrap"><img data-src="/img/remote/1460000012539663?w=694&amp;h=578" src="https://static.alili.tech/img/remote/1460000012539663?w=694&amp;h=578" alt="" title="" style="cursor: pointer; display: inline;"></span><br>　　<br>　　早期出现类似于Backbone的框架就是典型的MVC(其实我也并没有经历过这个年代)。通过在View与Model设置Controller层，这样用户交互触发的操作都会转交给Controller,由Controller层控制相应的改变Model的数据。在Model数据发生改变时，会通过观察者模式去通知对应的View，然后View重新请求Model数据做相应的界面改变。<br>　　<br>　　随着应用规模的增加你会发现MVC模式会存在几个显著的问题，Model与View的对应关系是多对多的，可能一个Model会对应多个View或者一个View对应多个Model，甚至更加复杂的场景，Model与View之间错综复杂的关系使得开发的难度增加。并且由于View是依赖于Model的，因此想要在这种模式下实现视图的组件化是相对比较难的。<br>　　</p>
<h3 id="articleHeader3">MVP　　</h3>
<p>　　我们并不希望View和Model之间依赖的这么紧，所以我们可以改进MVC模式，就出现了MVP模式。<br>　　<br>　　<span class="img-wrap"><img data-src="/img/remote/1460000012539664?w=753&amp;h=588" src="https://static.alili.tech/img/remote/1460000012539664?w=753&amp;h=588" alt="" title="" style="cursor: pointer;"></span><br>　　<br>　　MVP是MVC的改进版本，将MVC中的Controller改为Presenter，用户交互触发的操作会转交给Presenter处理。然后会由Presenter控制改变相应Model的改变。到此为止Presenter所承担的操作与Controller非常相近，但是为了让Model与View相互独立，Model改变后的通知是分发给Presenter，Presenter收到Model改变的通知就会调用View的接口来改变用户界面。<br>　　<br>　　这样我们通过Presenter就实现了Model和View的相互独立，只要View与Model之间预留好所需要的接口，二者互相是没有影响关系，互相是透明的，在这个基础上，我们要实现View的组件化是非常容易的。但是这种模式也并不是没有缺点，Presenter的逻辑不仅需要承担之前Controller的所有功能，而且还需要接受Model数据改变的通知并按照对应的功能改变用户界面，这就使得Presenter所要承担的功能过于多，使得Presenter太臃肿、难以维护。<br>　　</p>
<h3 id="articleHeader4">MVVM</h3>
<p>　　我们发现MVP也有相应的缺点，因此前人在MVP的基础上做了改良，出现了MVVM的结构。<br>　　<br>　　<span class="img-wrap"><img data-src="/img/remote/1460000012539665?w=655&amp;h=632" src="https://static.alili.tech/img/remote/1460000012539665?w=655&amp;h=632" alt="" title="" style="cursor: pointer; display: inline;"></span><br>　　<br>　　我们看到MVP的缺点主要是Presenter过于庞大，其实Model改变通知Presenter并且Presenter改变View这条逻辑并不是一定需要手动控制，其实对应的Model变化引起对应固定的View改变的规则一般来讲是不变的，那这一部分逻辑就可以释放出来由引擎自动处理。MVP按照这个思路进行改良，将原来的Presenter进化为View Of Model(VM:视图模型)，视图模型中包含Binder(或者说是Data-binding engine)，负责View与Model的双向绑定。在编写View时可以使用声明式的指令将View与对应的Model进行绑定。ViewModel在对应Model进行改变时可以自动更新View，同理View发生改变时，ViewModel也会对应Model的数据，这也就是我们通常所讲双向数据绑定(Two-way data-binding)。<br>　　<br>　　MVVM的优点非常显然，极大的提高了可维护性，View与Model之间的相互手动维护更新被释放，改为自动更新。但是由于ViewModel的构建和维护成本相对较高，对于一些简单的页面并不适用，对于复杂的视图却又带来了性能成本。<br>　　</p>
<h3 id="articleHeader5">换一种思路解决</h3>
<p>　　到此为止我们了解了MV*类型的框架是如何解决Model层与View层连接的，通过在Model与View之间构建各种中间层(Controller、Presenter、View of Model)来处理两者之间的同步关系。但是我们能不能换一种思路，View可以看成Model对应一定规则的视图表示，因此当<strong>Model发生改变时直接重新渲染View</strong>。<br>　　<br>　　我们不禁感到这种操作方式真是骚啊！<br>　　<br>　　<span class="img-wrap"><img data-src="/img/remote/1460000012539666?w=300&amp;h=300" src="https://static.alili.tech/img/remote/1460000012539666?w=300&amp;h=300" alt="" title="" style="cursor: pointer; display: inline;"></span><br>　　<br>　　这种方法行不行？当然！其实React的总体思路不就是这种吗？但是经验丰富的你一定会立刻质疑这东西性能靠谱吗？事实上，如果Model改变引起的View改变非常大(譬如所有的界面都改变了)，这种模式反而性能会很好，因为本身的界面改变就等同于重新渲染。但是如果当前的Model改变只会引起界面一个非常细微的变化(例如某个按钮的颜色发生改变)，我们就重新刷新整个界面，那实在是太恐怖了。<br>　　<br>　　搞过前端的同学一定都明白DOM的速度相比于JavaScript的简直就是龟速，因为DOM的属性、结构本身就设计的非常复杂。那这种方式是不是就完全可以废弃呢？<br>　　<br>　　不是！否则React就不会出现。<br>　　<br>　　大学学习过计算机组成原理的同学应该还记的，CPU的计算速度是非常快，但是相比于CPU，其他的IO部件，例如硬盘，速度是非常低的，差的都不是一个数量级的问题。这时候计算机就引入了RAM，RAM的速度低于CPU但是却高于硬盘，对于CPU所需的数据，可以先从硬盘放入RAM，然后CPU运算的结果也放入RAM中，如果需要数据的永久化存储时才会存入硬盘中。甚至CPU会觉得RAM速度还是慢，在CPU内部引进了各级Cache，来解决RAM与CPU之间的性能瓶颈。<br>　　<br>　　前端就可以借鉴这种思维方式，DOM是低速的，但JavaScript性能确实相当的不错，尤其在拥有V8引擎的今天。那么我们就可以用JavaScript来描述DOM结构，类似于下面的结构:<br>　　<br><span class="img-wrap"><img data-src="/img/remote/1460000012539667?w=1405&amp;h=504" src="https://static.alili.tech/img/remote/1460000012539667?w=1405&amp;h=504" alt="" title="" style="cursor: pointer;"></span></p>
<p>其实所描述的DOM结构就是下面的样子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>
    <button>按钮</button>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>按钮<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>　　当然这种表示方法并不唯一，只要能描述清对应的DOM结构，你可以随意发挥。<br>　　<br>　　这样在每次Model改变之后，我们首先可以拿到本次Model的对应的Virtual DOM结构，它代表的就是本次Model对应View的DOM结构。如果我们还在程序中缓存了上次Model对应的Virtual DOM结构，那么我们就可以去比较前后两个Virtual DOM结构，采用一定的算法，得出两个Virtual DOM的不一致的地方，这个算法就是我们通常所讲的Diff算法。然后用最优的方法将两个Virtual DOM的差异应用的真实DOM上。<br>　　<br>　　那这种方式一定是高于我们最开始所讲的重新渲染的思路吗？当然不是，如果界面变化非常大，那么我们之前所讲的Virtual DOM性能可能就低于重新渲染,因为Diff的过程也是有性能损耗了，即使在React采用了各种启发式算法将两个Virtual DOM树形结构由O(n ^ 3)降到了O(n)的情况下，在节点非常多的情况下，Diff的代价也是要被考虑的。<br>　　</p>
<h2 id="articleHeader6">总结</h2>
<p>　　本篇文章我们大致环顾了各种MV*框架的改进历史，从而讲述了React所提出的另一套新颖的解决思路，并且为什么React会引入Virtual DOM的原因。读到这里可能对你了解Virtual DOM有了些许帮助，欢迎大家关注我的博客，以后会继续更新Virtual DOM的系列文章以及其他我在前端学习中感悟。如有不正确的地方，欢迎各位赐教。<br>　　<br>　　<br>　　</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
了不起的Virtual DOM(一)：起源

## 原文链接
[https://segmentfault.com/a/1190000012539658](https://segmentfault.com/a/1190000012539658)

