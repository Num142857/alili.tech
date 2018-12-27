---
title: 'Luy 1.0 ：一个React-like轮子的诞生' 
date: 2018-12-28 2:30:11
hidden: true
slug: klc2gsfdey
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">前言</h1>
<p>在过去的一个多月中，为了能够更深入的学习，使用React，了解React内部算法，数据结构，我自己，从零开始写了一个玩具框架。</p>
<p>截止今日，终于可以发布第一个版本，因为就在昨天，我跑通了之前的一个小项目。</p>
<ul>
<li>预览地址：<a href="http://link.zhihu.com/?target=http%3A//htmlpreview.github.io/%3Fhttps%3A//github.com/215566435/React-awesome-resume/blob/master/build/index.html" rel="nofollow noreferrer" target="_blank">动态简历luy版本</a>
</li>
<li>仓库地址：<a href="http://link.zhihu.com/?target=https%3A//github.com/215566435/React-awesome-resume" rel="nofollow noreferrer" target="_blank">喜欢的给点星星哦～</a>
</li>
<li>框架地址：<a href="http://link.zhihu.com/?target=https%3A//github.com/215566435/Luy" rel="nofollow noreferrer" target="_blank">Luy</a>
</li>
</ul>
<h1 id="articleHeader1">真的从零开始吗？</h1>
<p>其实并不是，我并没有重新把jsx解析器进行造轮子，我用上了官方的解析器去帮助我解析jsx。</p>
<p>在正式开始写Luy的时候，还是比较盲目和恐惧的，原因如下</p>
<ul>
<li>虽然都知道React是基于虚拟DOM来渲染的，但是虚拟DOM到底是什么？怎么运作的<br>React的setState是异步的，这个我们都知道。但是他的异步和setTimeOut的异步是一样的吗？内部是不是用<code>setTimeOut</code>实现的？</li>
<li>react的事件合成系统。在react官方中，几万行代码，有差不多40%左右是用于模拟事件的。这部分内容是如何实现的？为什么这么做呢？</li>
<li>React列表中的key为什么那么重要？虚拟DOM的优化策略又是什么？</li>
</ul>
<p>带着这些疑问，我要么是去读源码，要么去找文章，但是真正弄懂这些知识，可能还得动手自己实践一次我才会感到安心。</p>
<h1 id="articleHeader2">制造这个玩具框架碰到了很多问题吗？</h1>
<p>虽然说现在React-like的框架一大堆，大家都想做出自己的mini 化方案，但是制造一个React-like框架还是超级困难的，可想而知，当初FB工程师们在没有React的情况下，是如何造出React的，天才。</p>
<p>源码解析不多，而且不完备：很多号称解析React源码的文章其实只是非常浅层次的读一读，基本上的套路就是，看到哪里的代码，网上一帖就成了一篇文章了，很多知识点还是得亲自去打断电调试React官方版本才能知道。</p>
<p>好的文章往往只专研了一两个点，知识点需要慢慢拼凑：网上不乏好文章的，但是好的文章不可能面面俱到。比如有些人研究<code>setState</code>，有些人研究生命周期函数，有些人还研究了ref，甚至有些人研究了Vdom。这些知识点很散乱，非常难以拼凑在一起，基本要花一两天才能搞懂一个知识点。</p>
<ul>
<li>
<code>虚拟dom算法</code>：我说实话，虚拟DOM的算法其实并不难，也就是树的递归遍历，在遍历的同时创建和比对。但是奇妙的就是，市面上有一堆虚拟DOM产品，虽然大致相同，但是在处理某些地方的时候不一样，后文会讲。</li>
<li>
<code>列表的key</code>：虚拟DOM算法最难的地方。对应的实际场景就是如下：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ReactComponent>
  <div key='1'></div>
  <div key='2'></div>
  <div key='3'></div>
  <div key='4'></div>
  <div key='5'></div>
  <div key='6'></div>
  ....
</ReactComponent>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code class="javasscript"><span class="hljs-tag">&lt;<span class="hljs-name">ReactComponent</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">'1'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">'2'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">'3'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">'4'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">'5'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">key</span>=<span class="hljs-string">'6'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  ....
<span class="hljs-tag">&lt;/<span class="hljs-name">ReactComponent</span>&gt;</span></code></pre>
<p>这一个部分难就难在「更新」上，这也是每一款虚拟DOM最不一样的地方。</p>
<p>为什么inferno.js这么快？<a href="https://www.zhihu.com/question/65824137" rel="nofollow noreferrer" target="_blank">这个回答里，其实给出了答案</a>。</p>
<p>而<code>Luy</code>使用的算法是：<a href="http://link.zhihu.com/?target=https%3A//segmentfault.com/a/1190000009017349%23articleHeader4" rel="nofollow noreferrer">vue2源码学习开胃菜</a>，速度上来说非常不错。</p>
<p>当然我不是吹嘘自己的框架有多牛逼，只是实现了这个算法还是非常开心的。</p>
<h1 id="articleHeader3">这部分内容给想学习React源码的朋友们</h1>
<p>首先，阅读React代码是最直接的方案，但是因为react源码实在太多了，我们必须另寻出路。有两个办法</p>
<ul>
<li>阅读react代码最初版本（非常的老了...</li>
<li>阅读市面上比较成熟的react-mini框架的代码</li>
</ul>
<p>我选择了第二种方式，可能会有人说哎呀，你水平不够。我承认，我水平确实不行，读react源码头有点痛。</p>
<p>我的方法就是先把东西做出来，然后有了基本思路，再看React源码你就知道它在干什么了。一定要注意的是：<strong>框架里任何一行代码都是为了解决某一个或者多个问题而存在的，当你脑海中不能将这些问题和代码联系在一起的时候，你他吗根本就是在读天书。所以，选择一个代码较少的先读着，理解react的套路</strong>。</p>
<ul>
<li>@司徒正美 的anujs：一款了不起的mini 化react方案，支持到IE6。代码及其好懂和老练，框架如其签名：javascript魔法师。如果阅读过anujs的朋友，一定也会发现Luy部分代码很像anujs，没错，有很多代码我都直接抄的，因为 @司徒正美 的代码写的真的很好。<a href="http://link.zhihu.com/?target=https%3A//github.com/RubyLouvre/anu" rel="nofollow noreferrer" target="_blank">RubyLouvre/anu</a>，是世界上最接近react官方的产品了。</li>
<li>
<a href="http://link.zhihu.com/?target=https%3A//github.com/infernojs/inferno" rel="nofollow noreferrer" target="_blank">Inferno.js</a>：另外一款出名的react lite框架，Vdom的速度是最高的，一系列的优化方案非常值得学习</li>
<li>
<a href="http://link.zhihu.com/?target=https%3A//github.com/developit/preact" rel="nofollow noreferrer" target="_blank">developit/preact</a>：大名鼎鼎的preact，速度快，体积小而著称。gzip完只有3k，不过对react官方的支持其实非常的差。比较搞笑的是，当你支持react的轮子的时候，使用compact功能时，其性能大大下降！（哈哈哈哈哈哈哈哈哈笑死我了）</li>
<li>@胡子大哈 ：他写的<a href="http://link.zhihu.com/?target=http%3A//huziketang.com/books/react/" rel="nofollow noreferrer" target="_blank">React.js 小书</a>，非常的棒，给予了我造react的最基本知识。</li>
<li>
<a href="https://zhuanlan.zhihu.com/p/25398176" rel="nofollow noreferrer" target="_blank">40 行代码内实现一个 React.js</a>： @胡子大哈 实现的作品</li>
<li>
<a href="http://link.zhihu.com/?target=https%3A//github.com/snabbdom/snabbdom" rel="nofollow noreferrer" target="_blank">snabbdom/snabbdom</a>：其实就是vue的vdom了</li>
<li><a href="http://link.zhihu.com/?target=https%3A//segmentfault.com/a/1190000010336457" rel="nofollow noreferrer">preact源码学习（1） - 个人文章 - SegmentFault</a></li>
<li><a href="http://link.zhihu.com/?target=https%3A//segmentfault.com/a/1190000010340534" rel="nofollow noreferrer" target="_blank">preact源码学习（2） - 个人文章 - SegmentFault</a></li>
<li><a href="http://link.zhihu.com/?target=https%3A//segmentfault.com/a/1190000010349289" rel="nofollow noreferrer">preact源码学习（3） - 个人文章 - SegmentFault</a></li>
<li>
<a href="http://link.zhihu.com/?target=https%3A//segmentfault.com/a/1190000010362600" rel="nofollow noreferrer" target="_blank">preact源码学习（4）</a> - 个人文章 - SegmentFault：这几片文章的作者都是 @司徒正美 ，全面的解析和官方的对比。牛x到了极点。</li>
<li>
<a href="http://link.zhihu.com/?target=https%3A//www.gitbook.com/book/swennemans/building-your-own-react-js/details" rel="nofollow noreferrer" target="_blank">Build your own React.js · GitBook</a>：一篇外国的文章，看完你基本可以造出一个可以setState的react了</li>
<li>
<a href="https://zhuanlan.zhihu.com/p/28257907" rel="nofollow noreferrer" target="_blank">Build Your Own React：第一次渲染</a>：本文也很重要，介绍了react component的几种模式</li>
<li>@程墨Morgan ：《深入浅出react和redux》一书非常的实在，我也推荐过很多次了，对我理解react和redux很有帮助.</li>
</ul>
<p>当然，还有很多知识点是通过google得到的，一切来之不易。在读源码的过程中，痛苦但是快乐。</p>
<h1 id="articleHeader4">这个框架会有未来吗？</h1>
<p>这个项目其实最初的想法只是学习react的内部原理，但是一路走来我的想法也改变了，会尽自己最大的所能，维护下去，并且跟进react官方的变化（说实话createPortal Luy也是支持的！）</p>
<p>毕竟，学习其实就是模仿，创造永远在模仿的前提下。最近公司准备上一个新的小项目，也是我第一个全权负责的项目，所以我决定上一把我的Luy进行试点（好就好在，Luy更换react其实是无痛的，实在有什么问题，直接换react上，哈哈哈</p>
<h1 id="articleHeader5">最后</h1>
<p>代码在这里，框架地址：<a href="http://link.zhihu.com/?target=https%3A//github.com/215566435/Luy" rel="nofollow noreferrer" target="_blank">Luy</a>，总共加起来目前只有1100+行，不多，可以作为「react套路学习版本」</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Luy 1.0 ：一个React-like轮子的诞生

## 原文链接
[https://segmentfault.com/a/1190000011594858](https://segmentfault.com/a/1190000011594858)

