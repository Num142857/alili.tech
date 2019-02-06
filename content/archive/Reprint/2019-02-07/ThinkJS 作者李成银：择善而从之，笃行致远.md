---
title: 'ThinkJS 作者李成银：择善而从之，笃行致远' 
date: 2019-02-07 2:30:15
hidden: true
slug: 2ke6v03112w
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>非商业转载请注明作译者、出处，并保留本文的原始链接：<a href="http://www.ituring.com.cn/article/260246" rel="nofollow noreferrer" target="_blank">http://www.ituring.com.cn/article/260246</a></p></blockquote>
<p><strong>李成银</strong>，奇虎360前端技术专家，ThinkJS 框架作者，开发了Chrome扩展版的Fiddler，以支持模板语法处理的Fl，等等。目前参与开发的一个项目是燕尾服，借助多进程和 Ast/Token 大幅提高现在前端工作流的编译性能，项目地址为：<a href="https://github.com/stcjs/stc" rel="nofollow noreferrer" target="_blank">https://github.com/stcjs/stc</a>。</p>
<p><span class="img-wrap"><img data-src="/img/bVy75C" src="https://static.alili.tech/img/bVy75C" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>非常有幸邀请到李成银老师，进行一期图灵专访。</p>
<h3 id="articleHeader0">关于 ThinkJS</h3>
<p><strong>什么原因促使你开发了 ThinkJS 框架？</strong></p>
<p>提到 ThinkJS，可能有些人会想到，ThinkJS 是不是和国内的 PHP 框架 ThinkPHP 有一些关系呢。没错，刚开始 ThinkJS 就是借鉴 ThinkPHP 来开发的。到2013 年下半年的时候，Node.js 框架主要还是 Express，但用 Callback 处理异步的方式让人非常头疼。一种比较好的方案就是用 Promise，所以我慢慢就有了借鉴 ThinkPHP，使用 Promise 机制开发一个 Node.js 框架的想法。</p>
<p>随着项目复杂度的提升，ThinkJS、Promise 也暴露出一些弊端，例如不能很好的跳过一些中间环节和数据传递。我想到借助 Babel 编译提前使用 ES2015 规范和 React 的新特性。对于异步处理方式，我也有了更好的方式——Generator Function 或者 Async Function。</p>
<p>2015年3月，我们完成了 ThinkJS 全新版本的设计，目标定位为能够在项目里直接使用 Es2015+ 特性开发，框架自动编译及更新，大大方便 Node.js 项目的开发；同时优化 1.0 版本当中不合理的架构和设计，脱离对 ThinkPHP 的依赖。2015年10月30日我们终于成功发布了 2.0 版本，而这天也是 Babel 发布 6.0 的日子！</p>
<p><strong>据说 ThinkJS 不止局限于你们开发团队的内部，外部越来越多的人员也开始使用。当初开发 ThinkJS 框架的时候，有没有预想到它会如此成功？</strong></p>
<p>ThinkJS 其实还算不上成功，到目前为止 GitHub 上的 star 数也才 1700，社区也不是太活跃。不过，现在确实有越来越多的公司在使用 ThinkJS 开发项目，有 PV 超过千万的项目，也有一些秒杀的项目。</p>
<p><strong>最近上线的 ThinkJS 2.2 在功能和性能上有哪些改进？</strong></p>
<p>2.2 版本主要支持将错误定位到源文件和支持断点调试的功能。因为开发的时候使用了 ES6+ 的语法，然后使用 Babel 编译，如果程序报错，输出的错误信息会是编译后的代码，这给调试带来很大的麻烦，同时断点调试只能调试编译后的代码，这对开发又是非常不利的。所以 2.2 版本致力于将报错定位到源代码，并且基于源文件进行断点调试。</p>
<p>性能方面的改进是从 2.1 版本就开始的。虽然 ThinkJS 面向企业级应用，封装了很多基础的功能，但性能上却并不亚于 express/koa 这些轻便级的框架。而对于同样面向企业级的 Sails.js 框架，ThinkJS 的性能是它的 4 倍。所以说 ThinkJS 的性能是非常卓越的。具体的性能测试数据可以见<a href="https://thinkjs.org/zh-cn/doc/index.html#toc-9c0" rel="nofollow noreferrer" target="_blank">https://thinkjs.org/zh-cn/doc/index.html#toc-9c0</a></p>
<p>当然在真实的项目中，框架损耗的性能占比非常小，不用太过关注，只要框架本身没有内存泄露等问题都是可以接受的。</p>
<p><strong>我们知道 ThinkJS 相对于其他的 Node.js 框架来说，更适合企业级的大型项目。目前，360公司的哪些项目正在使用 ThinkJS 框架？</strong></p>
<p>目前，360内部的很多项目都是使用 ThinkJS 开发的，如线上项目“爆米兔” <a href="https://www.baomitu.com/" rel="nofollow noreferrer" target="_blank">https://www.baomitu.com/</a> 以及其他一些商业级的项目，如<a href="http://shangyi.360.cn/" rel="nofollow noreferrer" target="_blank">http://shangyi.360.cn/</a></p>
<p><strong>ThinkJS 的成功带给你怎样的体验？或者说，该框架的成功开发对你的生活带来哪些变化？</strong></p>
<p>虽然 ThinkJS 现在还不算太成功，未来的路也还很长，不过在开发 ThinkJS 过程中确实有很多的感受。</p>
<ol>
<li><p>作为开源项目，除了开发本身的框架代码外，还要写丰富的测试用例。ThinkJS 现在的测试用例有 1700 多个，单元测试的代码比框架本身的代码要多得多，每次改动都要确保测试无误。对于一些接口变动也不能随意，需要考虑向后兼容等各种情况。同时，还要写各种使用文档，项目示例，等等。</p></li>
<li><p>需要花很多的时间处理 QQ 群/社区里提的各种问题。经常有人问安装问题、环境问题、简单的使用问题，刚开始的时候，我要亲自逐一进行回答，不过现在社区慢慢成形了，简单的问题会有成员帮忙回答，节省了我很多时间。</p></li>
<li><p>相对于国内开发者索取为主，国外开发者更愿意积极贡献。awesome-* 项目发 pr，让其添加 ThinkJS，也会主动修改文档中的一些拼写错误，然后发 pr。更好玩的是，有个老外 EunseokEom 觉得 ThinkJS 的官网不太好看，就亲自设计了一个新的<a href="https://github.com/75team/www.thinkjs.org/pull/60" rel="nofollow noreferrer" target="_blank">https://github.com/75team/www.thinkjs.org/pull/60</a>。虽然我们最终没有采纳老外设计的这个网站，但他的贡献精神真的非常赞。这也让我们有了优化官网的想法。</p></li>
</ol>
<p><strong>ThinkJS 未来的规划是怎么样的？</strong></p>
<p>ThinkJS 内置了很多功能，这加大了框架本身的代码量，也增加了学习的成本。我们计划在未来的版本中精简核心，将一些功能剥离出来，以插件的方式存在。同时，加强框架周边的建设，为企业级项目开发更好地保驾护航。</p>
<h3 id="articleHeader1">关于团队</h3>
<p><strong>360前端团队“奇舞团”是怎样的一个工作团队？团队合作带给你怎样的生活体验和专业提升？</strong></p>
<p>“奇舞团”是 360 最大的前端团队，支持公司的很多业务。开放的团队鼓励每个人利用业余时间开发各种工具、平台，提高团队的开发效率。</p>
<p>团队非常注重技术培养，每周都有技术分享会，覆盖新技术学习和使用、项目经验和总结、算法优化等各个方面。不光奇舞团的同学可以参加，公司其他部门的前端同学也可以参加。我们还会邀请外面的一些团队来公司交流分享，让每一位同学都能快速成长。</p>
<p>对外方面，奇舞团每周都会发布《奇舞周刊》，方便团队以外的同学持续学习前端知识。</p>
<p><strong>“众成翻译”是360前端推出的一款在线翻译平台。该平台是否适用于出版行业的引进版图书翻译工作？如果适合，这对外版书的翻译工作会产生哪些积极作用？</strong></p>
<p>“众成翻译”1.0 是“奇舞团”在2016年5月10日发布的，这个项目由李松峰老师负责，使用最新的 ThinkJS 2.0 开发。发布两个月来，已经翻译文章200多篇，字数超过了50万字。“众成翻译”当前的主要功能是推荐和翻译技术文章，核心是为译者提供便捷的翻译辅助，提高翻译效率和质量。目前项目正在围绕译者翻译体验的提升和优质内容的展示做功能优化。比如正在开发的翻译问答功能，就是为译者在翻译过程中向翻译高手求助牵线搭桥的。从社区形态来看，这个功能上线后将可能成为国内第一个以技术翻译为主的问答社区，成为有助于广大翻译爱好者快速学习、锻炼和成长的一个翻译知识共享社区。由于“众成翻译”目前只支持文章的翻译，所以在上面翻译图书会有些局限，必须手工把内容拆分然后再合成。“众成翻译”未来有可能考虑协作翻译和引进版图书翻译的功能，为专业的翻译、出版机构和译者提供一个可选的第三方工作平台。希望到时候能够依托已有的译者队伍，为更专业的翻译工作提供有力的支持。</p>
<h3 id="articleHeader2">关于前端设计</h3>
<p><strong>一个好的前端工作者，应具备哪些特质。</strong></p>
<p>我认为一个好的前端工程师，最基本的就是要做事靠谱。而做事靠谱，不光需要技术能力，还需要沟通能力、责任心和执行力等各个方面的软素质。具体工作中，技术能力可能只占了 40%，软素质方面的能力却高达 60%。工作中，你很经常看到技术能力一般但能把事情做好的同学，也会见到技术能力很强，但把事情做砸的同学！</p>
<p><strong>你认为，未来新的ES标准将在哪些特征上做进一步的改进。</strong></p>
<p>JavaScript 这几年在语法糖和 API 上有了很大的改进，尤其是 ES2015 标准之后，每年都会发布一个新版本。这得意于前端行业的迅猛发展，前端技术已经不再局限于浏览器端，它发展到了 Wed 服务端、手机端，甚至用 JavaScript 做一些硬件接口的开发和游戏的开发。</p>
<p>至于未来如何改进不太好说，不过我比较看好下面几点：</p>
<ol>
<li><p>语法改进：借鉴其他语言当中一些比较好的特性，让开发大型项目更加便利，如class 相关。</p></li>
<li><p>异步处理：虽然 async/await 还没正式发布，不过状态已经是 stage-3，明年可以如期发布，这样 JavaScript 在异步处理上将有质的改变。另外 Asynchronous Iterators 提案，可以在 iterators 里直接处理异步的情况。</p></li>
<li><p>大数据处理：随着大数据处理越来越热门，很多项目都要在前端进行大数据处理和展现。SIMD.JS 提案可以大大提升 JavaScript 在大数据处理方面的性能。</p></li>
</ol>
<p><strong>再次感谢您参与本次的访谈！</strong></p>
<hr>
<p>更多精彩，加入图灵访谈微信！ </p>
<p><span class="img-wrap"><img data-src="/img/bVtg5t" src="https://static.alili.tech/img/bVtg5t" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
ThinkJS 作者李成银：择善而从之，笃行致远

## 原文链接
[https://segmentfault.com/a/1190000005950344](https://segmentfault.com/a/1190000005950344)

