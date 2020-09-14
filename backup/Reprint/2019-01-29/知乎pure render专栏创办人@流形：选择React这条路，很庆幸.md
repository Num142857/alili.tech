---
title: '知乎pure render专栏创办人@流形：选择React这条路，很庆幸' 
date: 2019-01-29 2:30:10
hidden: true
slug: ol0iq6xh65c
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文仅用于学习和交流目的，不得用于商业目的。非商业转载请注明作译者、出处，并保留本文的原始链接：<a href="http://www.ituring.com.cn/Article/273818" rel="nofollow noreferrer" target="_blank">http://www.ituring.com.cn/Art...</a></p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVHnKI?w=640&amp;h=75" src="https://static.alili.tech/img/bVHnKI?w=640&amp;h=75" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>陈屹（流形）</strong>  </p>
<p>前端架构师，就职于阿里巴巴。热衷开源事业，长年专注于前端架构、数据可视化、Node.js等领域，知乎专栏pure render的创办人。</p>
<p>segmentfault社区活跃地址：<a href="https://segmentfault.com/u/arcthur">https://segmentfault.com/u/ar...</a></p>
<p><span class="img-wrap"><img data-src="/img/bVHnLO?w=338&amp;h=375" src="https://static.alili.tech/img/bVHnLO?w=338&amp;h=375" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>专栏写作近一载，积累了 24 篇经典沉淀，大都关于 React 相关的原理与实践分享展开。<a href="http://www.ituring.com.cn/book/1898" rel="nofollow noreferrer" target="_blank">《深入 React 技术栈》</a>的部分内容就基于专栏文章，通过整理提炼、纠错与升级，内容更加科学、系统。为了照顾到深度，还有很多内容完全重新编写，系统讲述了 React 与其技术栈的使用方法及工作原理。</p>
<h3 id="articleHeader0">访谈内容</h3>
<p><strong>前端技术那么多，为什么选择了React？</strong></p>
<blockquote>
<p>当初选择 React 的理由很简单，只是为了解决业务上的痛点。前年，产品架构还是 jQuery 和 Backbone。但随着产品的业务复杂度不断增加，数据层的逻辑基本上还是链路很短的数据请求，而 View 层的交互逻辑却变得越来越复杂，难以维护。</p>
<p>选型时，Angular 和 React 是重点考虑的两个对象。其中，Angular 比较成熟，也积累了很多粉丝，虽然尝试过，但不符合我们的场景，需要对现有构架作出较大的调整。我们需要的是，更轻量级、不绑定某种架构的技术，而且最重要的是，方便组件化的选择。实践后，决定下注 React。用 React 封装了一套组件与Backbone model 配合。</p>
<p>选择核心技术或库时，需要对业务担责。高成本的重构会给业务带来不必要的影响。发展、可持续、承前启后的考虑是首要的。</p>
<p>随着业务的发展，团队也在不断成长，不断探索着最佳实践方案。现在重新回顾一路的发展，非常庆幸选择 了 React。</p>
</blockquote>
<p><strong>如何看待同样以“轻便、易上手”著称的Vue？跟Vue相比，React有哪些优势？</strong></p>
<blockquote>
<p>Vue 使用的是 web 开发者更熟悉的模板与特性，React 的特色在于函数式编程的理念和丰富的技术选型。Vue 比起 React 更容易被前端工程师接受，这是一个直观的感受；React 则更容易吸引在 FP 上持续走下去的开发者。我想更多还是口味的不同。</p>
<p>如果一定要说 React 的优势，就是它活跃的生态圈。在 npm 社区搜索 React 关键词，会出现 21k+ 的库，而开源时间更久的 Angular 却只有 9k+，足可见开发者对其追捧的程度。另外，React 还是 FB 技术布局上重要的一部分，包括已开源的 React Native，未来的 React VR。当然，Vue 也有 Weex。</p>
<p>React 和 Vue 两者发展速度都很快，对于产品技术选型来说，活跃程度与生态发展可能比库本身带来的优势更为重要。现在的框架之争太多，我的建议是，当你选定之后，没必要急着切换，因为它们都可以完成中大规模的应用。从学习的角度，两者都值得学习。</p>
</blockquote>
<p><strong>编写<a href="http://www.ituring.com.cn/book/1898" rel="nofollow noreferrer" target="_blank">《深入React技术栈》</a>的原因有哪些？它的独特之处在哪里？</strong></p>
<blockquote>
<p>写这本书的时候，国内只有一本 React 相关的的入门书籍，并没有深入细节与实践方面的内容。而在这方面，pure render 专栏沉淀了很多经验。同时，踩过很多坑的经验，让我相信自己有能力写一本书更好地回馈社区。在此，感谢编辑老师的信任，战友们、朋友们给予的支持和鼓励。</p>
<p>要说本书的独特之处，一定在于<strong>每一部分都会去分析源码</strong>。尽管源码并不是开发者所要关注的，我想传达的是，<strong>读源码是学习技术最方便的途径，尤其对于非常活跃的前端开源社区来说</strong>。</p>
</blockquote>
<p><strong>在<a href="http://www.ituring.com.cn/book/1898" rel="nofollow noreferrer" target="_blank">《深入React技术栈》</a>一书中，为什么会选择“组件化、Flux和Redux、server、可视化”四个维度来讲解React？</strong></p>
<blockquote>
<p>全书从 React 组件化的思想和用法讲起，再讲到其背后的原理。组件化是前端工程中非常重要的部分，自前端开发的早期，工程师就一直在尝试用面向对象的理念来封装组件，直到今天也没有停下来。</p>
<p>到富客户端应用的年代，只有组件化已经不够了，先驱们借来了分层思想，先是 Backbone 站在了高点，到后来的百花齐放。说到 React 技术栈，Flux 应用架构起了个头儿，到 Redux 的诞生，算是完成了工程化的最后一块拼图，这是一个渐进的发展过程。结合 server render 完整打通了今天前端架构 SPA 的所有部件。</p>
<p>可视化在前端圈的地位很独特，已经有越来越多的前端转向专职的可视化工程师。可视化在这个领域有着不同于传统前端的开发方式，书中的内容也只是结合 React 开发的实践而已。</p>
</blockquote>
<p><strong>说到能够写作的程序员或是能够编程的作家，这两种人都是相当稀少。写完<a href="http://www.ituring.com.cn/book/1898" rel="nofollow noreferrer" target="_blank">《深入React技术栈》</a>一书，可以给我们分享下你的切身感受吗？</strong></p>
<blockquote>
<p>其实在互联技术上并不少吧。在国内知乎，SegmentFault，还有各种社区博客上可以看到不少善于分享的大咖。</p>
<p>说说写书过程中的感受。其实，从一开始的思路到最后成型的布局，之间产生了不小的改变，即使到最后时刻目录都在变动，真是不断挑战着自己。况且，React 技术栈在半年里的变化也不小，我会担心内容过时，承受很快被淘汰的命运，也许每一位技术书的作者都会经历这种痛苦。</p>
<p>当然，看到很多读者给我发来私信，表达学习到很多知识的时候，我想付出的一切都是值得的吧。</p>
</blockquote>
<p><strong>在知乎上创办专栏pure render，在SegmentFault等技术社区分享知识，不会分散精力影响技术研究吗？</strong></p>
<blockquote>
<p>分享并不是任务，是技术研究的一部分，并不会分散太多精力。我曾经说过，写文章并不单是为了别人，它可以把自己的想法或成果记录下来，是一件比较纯粹的事。</p>
<p>写文章也是为了交流。交流，更确切地说是，思想上的碰撞，碰撞那些还不坚定的想法，在说服与被说服的过程中共同进步。你理解了他人的经验，也完善自己的经验世界。</p>
<p>创办pure render专栏也有带领前端团队在技术道路上作沉淀的考虑。每一篇文章我或团队都会作审核，期望量少而精。现在，我也会试着邀请一些优秀人士给更多关注的朋友分享技术。</p>
</blockquote>
<p><strong>我了解到，你热衷开源事业。有哪些React开源项目推荐给大家学习？</strong></p>
<blockquote>
<p>如之前所说，React 社区在前端社区是非常活跃的，这一点非常像过去的 jQuery 开源社区。有非常多的轮子可以选择，却也带来选择上的困扰。</p>
<p>我在书中基本上把应用所需要的库都有说到。组件库方面，antd 已经被大家熟悉，如果想要定制组件，在 antd 背后的 react-component 做得也是非常优秀。另外，material-ui 也是一个很好的选择，尤其对于喜欢这套 UI 的开发者。</p>
<p>早期， Flux 衍生框架非常多，直到社区出现了 Redux、React Router、Redux Saga，Immutablejs 等最佳实践后才算消停。当然，如果你还是一个新手，还是建议你坚持使用 Redux，理解 Redux。</p>
<p>可视化方面，还是要推荐一下 Recharts。这个可视化库，是基于 React 和 D3，非常符合 React 构建组件的思想。</p>
<p>React 优秀的开源项目每周每月都会有，关注社区的动态也是我们前端工程师必备的技能。</p>
</blockquote>
<p><strong>读者希望陈老师能分享下你自己“从刚接触前端到现在拥有如此的技术沉淀”一路上的经验。如果真要踏上React学习之路，有哪些“坑洼”是值得注意，哪些“美景”是不容错过的？</strong></p>
<blockquote>
<p>我了解到，很多刚开始学习前端的学生就想一头扎到 React 或其它体系中去，这是非常危险的想法。比如我在专栏中提过，去 jQuery 的决定是和应用本身的特质相关的。如果说只是很简单的页面，并没有太多和服务端交互的内容，我还是首推 jQuery。因此，在你踏上 React 学习之路前，还请打好基础尤其是 DOM。</p>
<p>对于“坑洼”或是“美景”，我就说两点。第一，关注组件的复用粒度，尽可能保持组件的可扩展性，支持可控与不可控。第二是数据层的抽象，不同的业务需要有不同级别的数据抽象，有些越简单越好，有些封装得越厚越好。最重要的是根据业务的需要，保持界面与数据抽象的平衡。</p>
</blockquote>
<p><strong>在研究React的道路上，未来你会专注哪些方向？</strong></p>
<blockquote>
<p>走在 React 这条路上，很容易思考函数式编程的各种特性对复杂应用带来的好处。但函数式编程在生产环境中会对业务抽象带来更高的难度。很多人都在尝试用 React 的理念创造小而美的轮子，如 inferno，也可能会自己实现一套去匹配业务的需要。</p>
<p>说到未来，我可能会关注 FRP，它简化了现有架构的概念，更适合于用户界面的开发。Mobx 就作出了很多努力，同样，我也会关注更纯粹的 elm、cyclejs 这些 FRP 框架。</p>
</blockquote>
<hr>
<p><a href="http://www.ituring.com.cn/minibook/12" rel="nofollow noreferrer" target="_blank"><strong>——更多访谈</strong></a></p>
<hr>
<h3 id="articleHeader1">更多精彩，加入图灵访谈微信！</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006762906" src="https://static.alili.tech/img/remote/1460000006762906" alt="" title="" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
知乎pure render专栏创办人@流形：选择React这条路，很庆幸

## 原文链接
[https://segmentfault.com/a/1190000007917014](https://segmentfault.com/a/1190000007917014)

