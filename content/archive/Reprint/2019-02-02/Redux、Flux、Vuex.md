---
title: 'Redux、Flux、Vuex' 
date: 2019-02-02 2:30:11
hidden: true
slug: f8zzbybr4tl
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">前言</h3>
<p>这篇文章不会用具体的代码去阐述<code>redux</code>、<code>flux</code>或者<code>vuex</code>，因为我觉得它们所带来的更是一种编程思想。</p>
<h3 id="articleHeader1">前端进化和框架演变</h3>
<p>在很久以前，前端没有<code>MVVM</code>的概念，<code>MVVM</code>是对<code>MVC</code>细化的说法（个人觉得两者区别不大），<code>MVC</code>的模式一直在后台使用，效果和优点都很明显。</p>
<p>后来前端工程师仿照<code>MVC</code>模式开发了很多框架出来：<code>backbonejs</code>、<code>angularjs</code>、<code>emberjs</code>、<code>knockoutjs</code>等等。</p>
<p>再后来<code>nodejs</code>的崛起，出现了<code>reactjs</code>、<code>vuejs</code>、<code>avalonjs</code>,都是主打组件化，让数据来驱动视图，再配合像<code>grunt</code>和<code>webpack</code>前端工具更是让前端步入新的时代。</p>
<p>其实这里我想吐槽一下，前端从以前把注意力集中在布局和样式，转变成把精力投入到学习这些思想、工具、框架中，我做为一个前端工程师在这种过渡中觉得是一种力不从心（可能年龄大了，<code>es6</code>普及后不知道还要了解多少新东西），虽然是一个把注意力从视图转到数据上的转变，但这过程其实要付出的挺多。</p>
<p>好，废话到此为止。</p>
<h3 id="articleHeader2">Redux 思想</h3>
<p><code>Redux</code>让你以一种新的方式思考开发应用个，这个方式是：状态从一个初始状态开始，被一系列动作序列改变，这种新方式是通往复杂Web应用的捷径。</p>
<p>这么一说，很多人一头雾水，啥意思？下面来个简单代码</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var store = {
  state: {
    message: 'Hello!'
  },
  actionA: function () {
    this.state.message = 'action A triggered'
  },
  actionB: function () {
    this.state.message = 'action B triggered'
  }
}
//如果你想改变message的值，你可以调用actionA或者actionA去实现。
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>var store = {
  <span class="hljs-keyword">state</span>: {
    message: 'Hello!'
  },
  actionA: function () {
    this.<span class="hljs-keyword">state</span>.message = 'action A triggered'
  },
  actionB: function () {
    this.<span class="hljs-keyword">state</span>.message = 'action B triggered'
  }
}
//如果你想改变message的值，你可以调用actionA或者actionA去实现。
    </code></pre>
<p>上面这段代码可以说就是<code>Redux</code>思想最简单的体现。</p>
<h3 id="articleHeader3">Flux</h3>
<p><code>Flux</code>是Facebook用户建立客户端Web应用的前端架构， 它通过利用一个单向的数据流补充了<code>React</code>的组合视图组件，这更是一种模式而非正式框架，你能够无需许多新代码情况下立即开始使用<code>Flux</code></p>
<p><code>Flux</code>应用有三个主要部分：<strong>Dispatcher调度</strong> 、<strong>存储Store</strong>和<strong>视图View</strong>(React 组件)，这些不应该和MVC:Model-View-Controll(模型-视图-控制器)混淆，控制器在<code>Flux</code>应用中是存在的，但是他们是<code>controller-view(控制器-视图)</code>，视图通常在一个结构顶部，而这种结构是用来从<code>存储stroe</code>获得数据，然后将数据传递到自己的子结构们，此外，<code>Action</code>创建者-<code>Dispatcher</code>的帮助类的方法 -用于支持一个语义API，这个API是描述应用程序中所有变化的可能，通常可将它们看成是Flux更新循环的第四部分。</p>
<p><code>Flux</code>是以单向数据流方式支持<code>MVC</code>，当一个用户和<code>React</code>视图交互时，视图会将这个动作传播到一个中央<code>Dispatcher</code>，一直到各种存储，在那里保存着应用的数据和业务逻辑，这个使用<code>React</code>的声明式风格的过程是非常棒的，能够允许存储发送更新信息，而无需指定在状态之间如何切换视图。(传统方式更新状态后，会推出一个新的视图页面。)</p>
<p><code>Flux</code>最初是用于正确导出数据，比如如果我们要显示一系列消息的未读数字，而另外一个视图显示的是所有消息，其中未读的消息会高亮显示。这种情况使用<code>MVC</code>很难处理，将一个消息变为已读状态需要更新消息模型，然后再需要更新未读的计数模型(将未读模型数字减1，因为刚发生一个已读改变)，这种依赖和级联更新经常发生在大型<code>MVC</code>应用，导致一个混乱的数据流编织和不可预知的结果。</p>
<p>控制器被存储反转控制：存储接受更新，适当地调节这些更新，而不是一致地依赖外部更新其数据，存储之外根本不知道它是如何管理领域数据的，这有助于实现一种清晰的分离关注。存储并没有直接的类似<code>setAsRead()</code>之类的方法，而是只有一个单一方式获取数据到其自成一体的世界中，这个方式就是回调，注册在<code>dispatcher</code>中的<code>callback</code>。</p>
<p><strong>结构和数据流</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVD4Di?w=508&amp;h=68" src="https://static.alili.tech/img/bVD4Di?w=508&amp;h=68" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>一个单向数据流是<code>Flux</code>模式的核心，上面示图应该是Flux程序员心中主要的模型图。<code>dispatcher</code> 存储和视图是有着不同输入输出的独立节点，<code>Action</code>动作是一个简单对象，只是包含新的数据和一个标识符类型的属性。</p>
<p>视图也许引起新的动作<code>Action</code>，这个动作作为用户交互的响应将在整个系统传播：</p>
<p><span class="img-wrap"><img data-src="/img/bVD4GL?w=502&amp;h=159" src="https://static.alili.tech/img/bVD4GL?w=502&amp;h=159" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>所有通过<code>dispatcher</code>的数据流将作为一个集中式Hub，动作<code>Action</code>在一个action creator方法中被提供给<code>dispatcher</code>，这个动作通常来自于视图中用户的交互，<code>dispatcher</code>然后调用存储已经注册其中的回调函数，分发<code>Action</code>动作到所有的存储，在它们注册的回调函数中，存储会响应每个和它保存的状态有关的每个动作<code>Action</code>，存储然后发射一个 <code>change</code>改变的事件去提醒<code>controller-view</code>（控制器-视图），更新到刚刚改变的新数据。controller-view监听这些事件，然后在一个事件处理器中从存储中获取数据，controller-view调用它们自己的"setState()"方法，这会触发视图的重新渲染，包括<code>DOM</code>组件树中所有更新</p>
<p>通过应用的数据流是一个方向，没有两边绑定(two-way bingding：Angular.js有此方式)，应用状态在存储中维护，允许应用不同部分保持解耦，在存储之间发生依赖的地方，它们能够保持严格的层次关系（设计原则：尽量松耦合，无法回避的就变成树形层次结构），同步管理由dispatcher负责。</p>
<h3 id="articleHeader4">分享</h3>
<p>说了那么多，重点还是上面两张图，知道了这个流程，就掌握了它的大概思想，如果你还是不懂，这里分享个人认为比较好的文章：</p>
<ul>
<li><p><a href="https://www.zhihu.com/question/47686258/answer/107209140" rel="nofollow noreferrer" target="_blank">怎样理顺react，flux，redux这些概念的关系，开发中有必要使用它们吗?</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000003503338">Redux 介绍</a></p></li>
<li><p><a href="https://segmentfault.com/q/1010000007120402" target="_blank">关于Vuex的几个疑问</a></p></li>
<li><p><a href="https://github.com/vuejs/vuex/tree/1.0/docs/zh-cn" rel="nofollow noreferrer" target="_blank">vuex介绍</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000002777101">[译] Flux 入门</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Redux、Flux、Vuex

## 原文链接
[https://segmentfault.com/a/1190000007130506](https://segmentfault.com/a/1190000007130506)

