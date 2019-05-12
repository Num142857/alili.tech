---
title: '[译]看漫画学Flux' 
date: 2018-12-07 2:30:09
hidden: true
slug: ohyaiu94hi8
categories: [reprint]
---

{{< raw >}}

                    
<p>原文地址：<a href="https://code-cartoons.com/a-cartoon-guide-to-flux-6157355ab207" rel="nofollow noreferrer" target="_blank">A cartoon guide to Flux - by Lin Clark</a></p>
<p><span class="img-wrap"><img data-src="/img/bV7OSN?w=2000&amp;h=900" src="https://static.alili.tech/img/bV7OSN?w=2000&amp;h=900" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>Flux在目前web开发中最受欢迎也较不被人理解，本文会以简单易懂的方式解释它。</p>
<h2 id="articleHeader0">出现问题</h2>
<p>首先，我要声明Flux所解决的基本问题。Flux是一种帮助你处理数据的模式。Flux和React都由Facebook开发。许多人把他们放在一起用，当然你也可以单独使用它们。它们的形成是为了解决Facebook所面临的一系列典型问题。<br>这些问题中一个广为人知的例子就是关于通知的错误(notification bug). 当你登录Facebook时，你会通过消息图标(message icon)看到一则通知(notification)。然而你点击消息图标后，可能根本没有新消息，通知消失了。接着，在与网站进行几次交互之后，通知又回来了。你再一次点击消息图标...依然没有新消息。这个情况会在循环中继续往复发生。</p>
<p><span class="img-wrap"><img data-src="/img/bV7OSR?w=800&amp;h=409" src="https://static.alili.tech/img/bV7OSR?w=800&amp;h=409" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>这不仅仅是发生在用户里的循环，对于Facebook团队里也会有这个循环。他们修复了错误，一切在一段时间里看似表现很好，接着错误又回来了。这一直处于解决问题和再次出现问题之间来回切换。</p>
<p><span class="img-wrap"><img data-src="/img/bV7OSU?w=800&amp;h=409" src="https://static.alili.tech/img/bV7OSU?w=800&amp;h=409" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>所以Facebook在寻找跳出死循环的方法。他们不想仅仅是修复一次bug，他们希望保证系统可预测，这样他们就能确保问题不会重新出现。</p>
<h2 id="articleHeader1">根本问题</h2>
<p>他们发现根本问题在于数据流经应用程序的方式。<br><em>住：这是我从他们的分享会上展示的简化版本中收集到的，我确定实际的架构看起来并不一样。</em><br>他们有保存数据的模型(Model)，并将数据传递到视图层(View Layer)渲染。</p>
<p><span class="img-wrap"><img data-src="/img/bV7OS6?w=700&amp;h=533" src="https://static.alili.tech/img/bV7OS6?w=700&amp;h=533" alt="Model层将数据传递给View层" title="Model层将数据传递给View层" style="cursor: pointer; display: inline;"></span></p>
<p>因为用户交互发生在视图层，视图有时候需要根据用户输入来更新模型。有时模型还需要去更新其他的模型。最重要的是，这些行为有时会引发其他一系列的变化。我认为这非常有趣，因为你无法知道接下来会发生什么！（作者此处用了比喻，I envision this as an edge-of-your-seat game of Pong — it’s hard to know where the ball is going to land (or fall off the screen)）</p>
<p><span class="img-wrap"><img data-src="/img/bV7OTe?w=700&amp;h=533" src="https://static.alili.tech/img/bV7OTe?w=700&amp;h=533" alt="视图更新模型，模型接着更新其他模型" title="视图更新模型，模型接着更新其他模型" style="cursor: pointer; display: inline;"></span></p>
<p>不考虑这些变化会引起异步发生的可能性。一个变化可能会一起多种其他变化。我想这就好像抛出一袋乒乓球到乒乓游戏中，随着他们飞过整个地方并穿过小径。<br>总而言之，它使得调试数据流变得很困难。</p>
<h2 id="articleHeader2">解决方案：单向数据流</h2>
<p>Facebook觉得尝试一种不同的架构，数据向一个方向流动——只有一个方向——当你插入新数据时，这个流程就从头重新开始。他们称这一架构为Flux。</p>
<p><span class="img-wrap"><img data-src="/img/bV7OTh?w=900&amp;h=192" src="https://static.alili.tech/img/bV7OTh?w=900&amp;h=192" alt="Facebook的Flux文档中也有这张图，而且比这里要酷的多" title="Facebook的Flux文档中也有这张图，而且比这里要酷的多" style="cursor: pointer;"></span></p>
<p>实际上这个技术非常棒...但你可能无法从上面这张图里看出来。<br>一旦你理解了Flux，这张图就显得非常清晰。问题是如果你要找到对Flux完全新的文档，我认为这张图不能帮助你理解它...这就是图应该做的事。在你开始深入了解如何做特定事情之前，图会让你对系统产生一个全面的了解。<br>帮助我更好理解Flux的不是这样的图，而是根据团队中不同角色要实现共同目标来考虑这个系统。所以我会想你介绍我脑子里的这些角色。</p>
<h2 id="articleHeader3">角色</h2>
<p>在我将这些角色联系起来之前，我先对各个角色做简单介绍。</p>
<h3 id="articleHeader4">行为创建者(Action)</h3>
<p>第一个角色是这个行为创建者。他负责创建行为，这是所有改变和交互必须经历的路径。无论你是否想改变程序的状态，或者让视图的渲染方式不同，你都需要创建行为。<br>我认为行为创建者就像电报员。他知道你想传递什么消息，接着再以其他系统可以理解的方式格式化信息。</p>
<p><span class="img-wrap"><img data-src="/img/bV7OTm?w=487&amp;h=353" src="https://static.alili.tech/img/bV7OTm?w=487&amp;h=353" alt="Action creator" title="Action creator" style="cursor: pointer; display: inline;"></span></p>
<p>行为创建者创建行为时，会伴随一个<code>type</code>和一个<code>payload</code>。<code>type</code>表示你在系统中定义为行为的类型之一（通常是常量列表），比如<code>MESSAGE_CREATE</code>或<code>MESSAGE_READ</code>。<br>让系统的一部分知道所有可能的行为有一个很好的作用，那就是，当新人参与到项目里时，打开行为创建者的文件就能看到整个API——系统提供的所有可能的状态改变。<br>一旦创建了行为消息，行为创建者就会将该行为传递给调度人员。</p>
<h3 id="articleHeader5">调度人员(Dispatcher)</h3>
<p>调度人员有一个大的回调(callbacks)注册表(registry)，在某种程度上像电话交换机上的接线员，保留数据层(store)中需要发送的行为列表。当行为被行为创建者创建后，调度人员会将行为发送给不同的数据层。<br>调度人员以同步方式完成工作，如果你需要在数据层之间设置依赖关系，以便在其他数据层更新前更新，你可以让调度人员使用<code>waitFor()</code>进行管理。</p>
<p><span class="img-wrap"><img data-src="/img/bV7OTy?w=573&amp;h=530" src="https://static.alili.tech/img/bV7OTy?w=573&amp;h=530" alt="调度人员像一个总机操作员，知道所有不同数据层的回调" title="调度人员像一个总机操作员，知道所有不同数据层的回调" style="cursor: pointer; display: inline;"></span></p>
<p>Flux的调度人员与其他很多架构中的不同。无论行为类型是什么，它都会被发送到所有的注册数据层里。这意味着数据层不仅仅收到一些行为消息，而是接收全部消息再就实际情况过滤。</p>
<h3 id="articleHeader6">数据人员(Store)</h3>
<p>接下来就是数据人员了。数据人员掌控这程序里所有的状态，以及状态的改变逻辑。<br>我把数据人员比喻成权力极大的爷，所有的状态改变必须由他亲自完成。你不能直接要求他改变状态，要请求更改状态，你必须遵循适当的步骤：通过行为创建者或调度人员提交行为。</p>
<p><span class="img-wrap"><img data-src="/img/bV7OTD?w=548&amp;h=437" src="https://static.alili.tech/img/bV7OTD?w=548&amp;h=437" alt="数据人员是个爷" title="数据人员是个爷" style="cursor: pointer; display: inline;"></span></p>
<p>正如我之前提到的，如果一个数据层被调度人员注册，所有的行为将会发送到那里。在数据层里，数据人员一般会用一个switch语句查看行为类型，以决定这个数据层是否关心此行为。如果数据层关心此行为，那么数据人员会根据这个行为找出需要做出哪些更改并更新状态。<br>一旦数据人员改变了状态，他就会提交一个改变事件，这会提示视图控制员知道状态变了。</p>
<h3 id="articleHeader7">视图与视图控制员(Controller view &amp; view)</h3>
<p>视图负责拿到状态并将其渲染出来给用户看，以及接收用户输入。<br>视图是一个展示者，他并不知道程序里发生任何事，只知道接收到的数据，以及如何将数据格式化成用户能理解的方式（通过HTML）。<br>视图控制员更像一个在数据人员和视图之间的中层经理，数据人员告诉他状态什么时候变了，他收集到新状态再将更新状态发送给他的子视图。</p>
<p><span class="img-wrap"><img data-src="/img/bV7OTE?w=421&amp;h=466" src="https://static.alili.tech/img/bV7OTE?w=421&amp;h=466" alt="视图与视图控制员" title="视图与视图控制员" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader8">他们怎么一起工作</h2>
<p>接下来看看这些角色怎么共同工作的。</p>
<h3 id="articleHeader9">初始化(setup)</h3>
<p>首先有个初始化：只发生一次的程序初始化。</p>
<ul><li>数据员(stores)使得调度员(dispatcher)知道，无论何时有行为(action)来了，数据员需要被通知。</li></ul>
<p><span class="img-wrap"><img data-src="/img/bV7OTH?w=800&amp;h=470" src="https://static.alili.tech/img/bV7OTH?w=800&amp;h=470" alt="1" title="1" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li>视图控制员(controller views)向数据员(stores)询问最新状态(state)。</li>
<li>当数据员向视图控制员说明了状态后，视图控制员把这个状态告诉其子视图去渲染。</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bV7OTU?w=800&amp;h=470" src="https://static.alili.tech/img/bV7OTU?w=800&amp;h=470" alt="2, 3" title="2, 3" style="cursor: pointer; display: inline;"></span></p>
<ul><li>视图控制员也告诉数据员当其状态改变时记得通知自己。</li></ul>
<p><span class="img-wrap"><img data-src="/img/bV7OTX?w=800&amp;h=470" src="https://static.alili.tech/img/bV7OTX?w=800&amp;h=470" alt="4" title="4" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader10">数据流(date flow)</h3>
<p>一旦初始化完成后，程序就准备好接收用户输入。现在，我们假设用户做改变引起了一个行为(action)。<br>我们通过用户交互来启动数据流。</p>
<p><span class="img-wrap"><img data-src="/img/bV7OT5?w=800&amp;h=470" src="https://static.alili.tech/img/bV7OT5?w=800&amp;h=470" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<ul><li>视图(view)告诉行为创建者(action creator)准备行为。</li></ul>
<p><span class="img-wrap"><img data-src="/img/bV7OT6?w=800&amp;h=470" src="https://static.alili.tech/img/bV7OT6?w=800&amp;h=470" alt="1" title="1" style="cursor: pointer;"></span></p>
<ul><li>行为创建者格式化行为并发送给调度员(dispatcher)。</li></ul>
<p><span class="img-wrap"><img data-src="/img/bV7OUg?w=800&amp;h=470" src="https://static.alili.tech/img/bV7OUg?w=800&amp;h=470" alt="2" title="2" style="cursor: pointer;"></span></p>
<ul><li>调度员按顺序将行为发送给数据人员(store)，每个数据员都收到了所有行为的提示，接着数据员筛选哪些是他关心的，再相应地改变数据层状态(state)。</li></ul>
<p><span class="img-wrap"><img data-src="/img/bV7OUi?w=800&amp;h=470" src="https://static.alili.tech/img/bV7OUi?w=800&amp;h=470" alt="3" title="3" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li>一旦状态改变，数据员就会让当时需要他通知的那些视图控制员知道其状态变化。</li>
<li>这些视图控制员会向数据员要他们更新后的状态。</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bV7OUl?w=800&amp;h=470" src="https://static.alili.tech/img/bV7OUl?w=800&amp;h=470" alt="4, 5" title="4, 5" style="cursor: pointer; display: inline;"></span></p>
<ul><li>在数据员给了自己更新后的状态，视图控制员就会告诉其子视图根据新状态重新渲染。</li></ul>
<p><span class="img-wrap"><img data-src="/img/bV7OUo?w=800&amp;h=470" src="https://static.alili.tech/img/bV7OUo?w=800&amp;h=470" alt="6" title="6" style="cursor: pointer; display: inline;"></span></p>
<p>这就是我认为的Flux，希望对你有用！</p>
<blockquote>译者：如有翻译错误，请指正哟，谢谢！(＾Ｕ＾)ノ~ＹＯ</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[译]看漫画学Flux

## 原文链接
[https://segmentfault.com/a/1190000014217844](https://segmentfault.com/a/1190000014217844)

