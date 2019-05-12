---
title: '前端周刊第53期：React 社区的撕逼' 
date: 2019-01-15 2:30:12
hidden: true
slug: p84r8lse0m
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000009236452" src="https://static.alili.tech/img/remote/1460000009236452" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>共 1947 字，读完需 4 分钟。本期有篇深度文章介绍 MobX，MobX 的原作者在 Medium 上有<a href="https://medium.com/@mweststrate" rel="nofollow noreferrer" target="_blank">个人频道</a>，写了至少 5 篇长文介绍自己的 React + MobX 心路。此外，<a href="https://react.amsterdam/#talks" rel="nofollow noreferrer" target="_blank">React Amsterdam 技术大会</a>已经闭幕，干货非常多，但需要你花较多时间去消化它的<a href="https://www.youtube.com/watch?v=m_vUUgI0bo8" rel="nofollow noreferrer" target="_blank">视频</a>。以下是本周精选内容，请享用。React 社区的撕逼接下来就是。</p></blockquote>
<h3 id="articleHeader0">技术动态</h3>
<h4><a href="https://medium.com/@dan_abramov/hey-thanks-for-feedback-bf9502689ca4" rel="nofollow noreferrer" target="_blank">Facebook 官方回应社区对 React 的质疑</a></h4>
<p>撕逼的事情在国内外都时有发生，本周 Medium 上有篇题为<a href="https://medium.com/@gianluca.guarini/things-nobody-will-tell-you-about-react-js-3a373c1b03b4" rel="nofollow noreferrer" target="_blank">《Things nobody will tell you about React.js》</a>的文章痛批 React，大意为：React 上手太困难，React Native 的 Issue 太多且没人处理，React 及周边工具版本迭代不向前兼容等问题。随后 React 官方维护者 Dan Abramov <a href="https://medium.com/@dan_abramov/hey-thanks-for-feedback-bf9502689ca4" rel="nofollow noreferrer" target="_blank">发表长文回应</a>，澄清了很多外界对 React 的误解。真理越辩越明，仔细看看两篇文章，相信你能收获不少。</p>
<h3 id="articleHeader1">文章教程</h3>
<h4><a href="https://github.com/jarsbe/react-vue-comparison" rel="nofollow noreferrer" target="_blank">React+MobX 组合与 Vue.js 的详细对比</a></h4>
<p>React + Mobx 的组合和 Vue.js 在架构上基本是相同的，这篇文章对这两种技术做了比较细节的对比，还有具体的代码，后来附加上了 Preact 这个轻量级的替代。到底哪个好？没有最好的，只有合适的，只有知道各种技术的优缺点你才会做出更合理的选择。</p>
<h4><a href="https://juejin.im/post/5902126aa0bb9f0065e80ea9" rel="nofollow noreferrer" target="_blank">代码中添加注释之好坏丑</a></h4>
<p>有句经典：好的代码自身就是文档。在代码中添加注释有哪些禁忌，有哪些建议，掘金翻译计划已经为你准备好了。当然，如果想写出一手漂亮的代码，还是建议去阅读更有体系的<a href="http://dl.finebook.ir/book/5f/14474.pdf" rel="nofollow noreferrer" target="_blank">《The Art of Readable Code》</a>[彩蛋]，这本书也有中译本，但我强烈建议看英文。</p>
<h4><a href="http://divideandconquer.surge.sh/#1" rel="nofollow noreferrer" target="_blank">MobX 内部分治策略详解</a></h4>
<p>大多数同学认为 MobX 是为 React 定制的状态管理工具，这点不可否认，实际上它出现的比 Redux 晚，看到了 Redux 用在实际项目中会带来的问题，对现代前端应用中的 State、View 采用分治策略来击破，让开发者充分体会到响应式编程的好处。这个讲稿是 MobX 作者在 <a href="https://react.amsterdam/#talks" rel="nofollow noreferrer" target="_blank">React Amsterdam</a> 大会上的分享底稿，里面有 4 页能让你掌握 MobX 的思维模型。</p>
<h3 id="articleHeader2">开发工具</h3>
<h4><a href="https://github.com/styled-components/styled-components" rel="nofollow noreferrer" target="_blank">styled-components：把 JS 中的 CSS 进行到底</a></h4>
<p>写 React 的同学肯定纠结过 CSS 该怎么组织的问题。传统 WEB 开发里面推崇的 CSS、JS、HTML 关注点分离不建议把 CSS 写到 JS 里面，随着开发方式的演化，这种写法总会让人觉得很别扭，因为从概念上来讲组件要具有封装、自治的特点，那么把 CSS 写到组件里面会更容易维护，也能把 JS 的功能发挥到极致，styled-components 就是这样一个库，让你很容的用 CSS 创建比较纯粹的样式组件，一旦你用上它，肯定会爱不释手，我就是这种感觉。</p>
<h4><a href="https://github.com/okonet/lint-staged" rel="nofollow noreferrer" target="_blank">lint-staged：只检查即将要提交的代码</a></h4>
<p>很多同学可能用过 npm 里面的 pre-commit 或者类似 husky 的工具来实现代码提交之前的编码风格检查，可有没有这样的痛点：你改了文件 A，但是代码检查工具提示你文件 B、C、D 里面都有不合规的地方，甚至问题还非常多，真是让人沮丧。lint-staged 能帮你只检查要提交的代码，而不是全量检查。</p>
<h4><a href="https://github.com/ospatil/generator-node-typescript#readme" rel="nofollow noreferrer" target="_blank">TypeScript + Node.js 的 Yeoman 生成器</a></h4>
<p>想使用 TypeScript 但是嫌工作流工具的拼凑过程太麻烦？可以试试这个 Yeoman Generator，能够让你快速开始使用 TypeScript 编写 Node.js 的包，实际上给浏览器编写也是可以的，生成的代码就包含了各种构建、测试的脚本，甚至还提供了 Visual Studio Code 的任务配置。</p>
<h4><a href="http://www.timqian.com/star-history/" rel="nofollow noreferrer" target="_blank">Star History：GitHub 仓库发展史透视工具</a></h4>
<p>基于 Star History 你可以查询任何仓库 Star 数量的变化趋势，有点类似于 Google Trends，但是基于 GitHub 官方 API 提供的精准数据。在你做技术选型、调研的时候可能会比较有用。</p>
<h4><a href="http://leebyron.com/testcheck-js/" rel="nofollow noreferrer" target="_blank">TestCheck.js：让你的测试更健壮</a></h4>
<p>请仔细思考这句话：测试只能让你发现 Bug 确实存在，但是不能帮你证明没有 Bug。通常来说，我们的测试只会测试最常见的情形，这样的话覆盖度自然就不是最高，而 TestCheck 能够帮你在测试的时候生成一些随机的输入，助你更早的发现潜在的问题。</p>
<h3 id="articleHeader3">找找灵感</h3>
<h4><a href="https://twitter.com/Real_CSS_Tricks/status/857383799822229504" rel="nofollow noreferrer" target="_blank">PWA 应用实例搜罗站点</a></h4>
<p>这篇推文列出了三个搜罗 PWA 应用实例的站点，如果你在学习、研发 PWA，没有什么比生产环境的项目更具有研究价值了，可能都需要翻墙，自备梯子。</p>
<h4><a href="https://mp.weixin.qq.com/s?__biz=MzI3MzQ0NjY4Mg==&amp;mid=2247483740&amp;idx=1&amp;sn=f905f1d4a3457da99bf375d208dcd758&amp;chksm=eb226329dc55ea3f508cdb333fab2e224261d9c3641d091c5637fe78477effc54be3aa0951f8&amp;mpshare=1&amp;scene=2&amp;srcid=0423Mob2KnHfmHW7RXfxz2Ec&amp;key=c78ef623e277" rel="nofollow noreferrer" target="_blank">Live：前端工程师的入门与进阶</a></h4>
<p>justjavac 的知乎 Live：前端工程师入门和进阶，有知友整理出来了学习笔记，里面干货非常多，推荐给在前端路上狂奔的所有同学。</p>
<h3 id="articleHeader4">视频教程</h3>
<h4><a href="https://react.amsterdam/#talks" rel="nofollow noreferrer" target="_blank">React Amsterdam 大会学习资料</a></h4>
<p>React Amsterdam 也是质量非常不错的 React 技术交流会，整体内容分为 React 和 React Native 两条主线，少数几个分享者还就相同主题在 React Conf 2017 上做了分享，大会在 Youtube 上有直播，自己去搜索就好，建议先仔细看看分享日程，然后在视频中选择性观看。</p>
<h4><a href="http://slides.com/windy/react-native-advanced-experience-by-80percent#/" rel="nofollow noreferrer" target="_blank">React Native 经验分享</a></h4>
<p>应该是不多的中文的 React Native 实战经验分享，介绍使用 React Native 的好处，使用的现状，踩到了什么坑，最后这部分是参考价值最大的，并且也是篇幅最大的，在使用或者学习 React Native 的同学建议看看。</p>
<h3 id="articleHeader5">精彩问答</h3>
<h4><a href="http://moduscreate.com/using-es2016-decorators-in-react-native/" rel="nofollow noreferrer" target="_blank">如何在 React Native 启用 ES7 Decorator 特性？</a></h4>
<p>ES7 中的 Decorator 特性能让你少些很多重复的代码，写 React 的同学可能经常会碰到需要 bind 上下文的情形，这是用 Decorator 的绝佳场景，关于 Decorator，Google 的工程师 Andy Osmani 有篇经典文章<a href="https://medium.com/google-developers/exploring-es7-decorators-76ecb65fb841" rel="nofollow noreferrer" target="_blank">《Exploring EcmaScript Decorators》</a>。这篇文章给出了在 React Native 项目中启用 Decorator 的方法。</p>
<h4><a href="https://www.zhihu.com/question/24611701" rel="nofollow noreferrer" target="_blank">Node.js 中的哪些库让你相见恨晚？</a></h4>
<p>知乎上的一个问题，列举了不少使用比较多的库，不过个人觉得，最应该参考的是 npmjs.com 上被依赖最多的 package 列表，这个列表是全自动动态更新的，去哪里看？<a href="https://www.npmjs.com/browse/depended" rel="nofollow noreferrer" target="_blank">猛击这里</a>。</p>
<h2 id="articleHeader6">One More Thing</h2>
<p>本文作者王仕军，商业转载请联系作者获得授权，非商业转载请注明出处。如果你觉得本文对你有帮助，请点赞！如果对文中的内容有任何疑问，欢迎留言讨论。想知道我接下来会写些什么？欢迎订阅我的<a href="https://juejin.im/user/57a7f634d342d300576b738d" rel="nofollow noreferrer" target="_blank">掘金专栏</a>或<a href="https://zhuanlan.zhihu.com/feweekly" rel="nofollow noreferrer" target="_blank">知乎专栏</a>：《前端周刊：让你在前端领域跟上时代的脚步》。</p>
<p>Happy Hacking</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端周刊第53期：React 社区的撕逼

## 原文链接
[https://segmentfault.com/a/1190000009236449](https://segmentfault.com/a/1190000009236449)

