---
title: 'F++：别忽略前端工程化的部署与测试' 
date: 2019-01-16 2:30:07
hidden: true
slug: zlr8juv4ln
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVNg3U?w=900&amp;h=500" src="https://static.alili.tech/img/bVNg3U?w=900&amp;h=500" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h4>写在前面</h4>
<p>不知不觉时间已来到2017年的4月，不知道2016年的前端技术概念爆炸，是吓走了技术小白，还是让技术大牛多加几天班呢。However，Web前端这个领域并未热度退减，从学校毕业走进这个行业的人不计其数，后端终于不鄙视切图仔，当然切图仔也不再只是个切图仔，甚至有从非互联网转过来学前端的。</p>
<p>在面试前端工程师的时候，相信各位面试官都或多或少的会提及一个前端领域非常热的话题——前端工程化。我面试的时候都会问应聘者：“说说你对前端工程化的理解？”大家第一反应都是想到自动化构建相关的内容，grunt、gulp、webpack等等，编译ES6啊，编译Sass啊，分割代码啊，合成雪碧图啊……然后就是前端以往刀耕火种，现在有了更多的规范和流程等等。</p>
<p>面试总是有点紧张我能理解，但面试了几十个人，还没有人提及前端工程化中很重要的两个方面：<strong>部署和测试</strong>。</p>
<p>在这里我非常感激我是软件工程专业毕业的，我很自然就会发现前端开发流程中有哪些地方还很“原始”。确实，现在前端构建工具广泛应用于执行一些自动化的构建任务，但实际上，它们能做更多，nodejs的发展也支持我们能做更多，例如自动化部署和自动化测试。</p>
<p>因此，我想说的是：<strong>别忽略前端工程化的部署和测试</strong>。</p>
<hr>
<h4>什么是软件工程</h4>
<blockquote><p><a href="https://zh.wikipedia.org/wiki/%E8%BD%AF%E4%BB%B6%E5%B7%A5%E7%A8%8B" rel="nofollow noreferrer" target="_blank">维基百科 - 软件工程</a><br>研究和应用如何以系统性的、规范化的、可定量的过程化方法去开发和维护软件，以及如何把经过时间考验而证明正确的管理技术和当前能够得到的最好的技术方法结合起来的学科。</p></blockquote>
<p>实际上软件工程和其他的工程有很多类似的地方，只是因为目前大家都还聚焦于核心技术和功能的实现上，所以才会相对地忽略工程的其他部分。毫不夸张的说，做一个Web App，流程上应该和建一座桥梁是基本一致的：从前期的设计、逻辑的验证、需求的制定，到实现方案的落地执行、执行过程中的修正（debug）、部件的构建，到最后的整体测试、验收等等。好吧，面对现实，大多数的软件都是在缺少充分的需求、过程中系统的迭代管理以及后期的测试的环境下诞生的。</p>
<blockquote>
<p>“上线是第一任务，有bug的话在后面的版本更新中解决吧！”</p>
<p>“所以说土木工程的PR和软件工程的PR，是不能互换的，呵呵。”</p>
</blockquote>
<p>我只是想对这个浮躁的IT界发表我的一点小意见：<strong>软件也是工程，就因为桥梁塌了会危及生命，而软件崩了大不了debug重启，大家就不重视软件的工程化问题了吗？</strong></p>
<hr>
<h4>什么是前端工程化</h4>
<p>“什么是前端工程化”，“为什么要有前端工程化”，“前端工程化的好处”。这些问题已经有大把的好文章可供阅读。在这里简单讲述一下前端工程化的内容。</p>
<p>前端工程可以说是软件工程的一个细分领域，流程相似，但特点鲜明。先来说说前端，当然我指的是Web前端，相比其他方向的技术有什么特点：</p>
<ul>
<li><p>说起前端，至少涉及3种语言。（html，css，javascript）</p></li>
<li><p>前端代码在用户端运行时增量安装。（摘自张云龙的文章，资源和代码都是增量下载的）</p></li>
<li><p>最基本的状况下，前端代码不需要编译（即改即生效）。</p></li>
<li><p>浏览器即运行环境，非常易于调试和开发（不需要simulator）。</p></li>
</ul>
<p>基于上面的状况，最原始的项目只需要一个index.html，只要你的电脑有一个正常的浏览器，就能开工了。上面说的是原始的情况，现在，我们的前端项目NB起来了，引入了大量的新技术。我们需要编译了，ES6我们用Babel；我们开始写单元测试了，需要跑测试的脚本了；我们前端团队人员增多了，需要更好的协作和维护；我们的资源需要处理成多个不同的版本去适应不同的终端，我们的资源需要被打成不同的包……这时候，就可以开始讨论前端工程化的内容了。</p>
<p>前端工程化需要解决以下问题：</p>
<ul>
<li><p>规范性，文本编辑器很方便，但语法提示，风格检查会迫使你去将自己的IDE打造起来的。</p></li>
<li><p>资源管理，前端最头疼的事情，所幸我们有Webpack！</p></li>
<li><p>自动化任务，debug、build、deploy、test、documentation等。</p></li>
<li><p>模块化开发，划分好模块总是便于团队协作，使软件逻辑清晰。</p></li>
<li><p>组件化开发，也许你想说这是框架负责的，实际上前端工程化的支持才是最重要的。</p></li>
</ul>
<p>到这里，你可能会发现，你最近在捣鼓的一些事情，有不少是在解决前端工程化的问题的。</p>
<p>你给你的编辑器例如SublimeText配置了linter，装了一堆辅助开发的插件，语法补全、路径提示，甚至取色器等等，于是你的编辑器更像一个IDE了；你的团队都使用Airbnb的标准，代码风格总算是得到了统一了；你开始使用grunt、gulp、webpack等等来完成一些自动化构建的任务，压缩、编译、混淆代码的工作都交给它们好了；为了首屏你们也许会选择使用code spliting达到按需加载……</p>
<p>废话太多了，下面有一大波技术文章供大家学习。总而言之，<strong>前端工程化不是简单的指自动化构建</strong>，要是你面试的时候这么回答我会很失望的。</p>
<p>推荐文章：<br><a href="https://juejin.im/post/58ac334e8d6d810058c103e0" rel="nofollow noreferrer" target="_blank">我对前端工程化的理解 - WU_CHONG/掘金</a><br><a href="https://segmentfault.com/a/1190000007414499">我为什么这么强调前端工程化 - 流星狂飙/SegmentFault</a><br><a href="http://www.infoq.com/cn/articles/frontend-engineering-webpack" rel="nofollow noreferrer" target="_blank">基于webpack搭建前端工程解决方案探索 - 杨德模/InfoQ</a><br><a href="https://segmentfault.com/a/1190000002501148">前端的工程化 - binnng/SegmentFault(2015.01.21发表的，可以对比现在)</a><br><a href="https://www.zhihu.com/question/24558375" rel="nofollow noreferrer" target="_blank">谁能介绍下web前端工程化？ - 知乎问答</a></p>
<p>其他公司的前端工程化总结：<br><a href="http://taobaofed.org/blog/2016/01/28/fe-engineering-width-cloud-build/" rel="nofollow noreferrer" target="_blank">前端工程化：云构建 - 淘宝前端团队FED</a><br><a href="https://aotu.io/notes/2016/07/19/A-little-exploration-of-front-end-engineering/" rel="nofollow noreferrer" target="_blank">我们是如何做好前端工程化和静态资源管理 - 京东凹凸实验室</a><br><a href="http://tech.meituan.com/tech-salon-13-app-proto.html" rel="nofollow noreferrer" target="_blank">前端工程化开发方案app-proto - 美团点评技术团队</a></p>
<hr>
<h4>部署和测试也很重要</h4>
<h5>先说说部署</h5>
<p>介绍完前端工程化后，大家想必对前端工程化有一个相对完整的概念了，而在文章的开头我说了，希望大家不要忽略部署和测试的环节。会使用构建工具完成一些自动化任务不等于实现了前端工程化，你还需要考虑代码部署和测试的部分。下面链接中张云龙的回答让我受益很大，是这个回答启发我迫使自己要更加重视前端工程化的：</p>
<p><a href="https://www.zhihu.com/question/20790576" rel="nofollow noreferrer" target="_blank">大公司里怎样开发和部署前端代码？ - 张云龙/知乎</a></p>
<p>结合我自身经历来说说，我们处理前端资源的更新部署的问题的演变过程（只是个示例）：</p>
<blockquote><p>版本1.0 资源放服务器上</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;/js/main.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/js/main.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<blockquote><p>版本2.0 资源放CDN上</p></blockquote>
<p>放服务上太慢了，全部资源都得转到CDN上！当时觉得刷新CDN真的麻烦啊，于是自作聪明，加个版本号的GET参数不就好了？每次update的时候更新版本号就好了~</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;//xxx.cdn.com/js/main.js?v=<?php echo $version; ?>&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//xxx.cdn.com/js/main.js?v=&lt;?php echo $version; ?&gt;"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<blockquote><p>版本3.0 使用gulp、webpack等加文件摘要</p></blockquote>
<p>对比2.0更精确控制缓存了，回头一看以前有没有像傻一样，更新一个小版本全部资源都刷新缓存了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;//xxx.cdn.com/js/main.js?v=f33103ed68b9b31df7b5&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//xxx.cdn.com/js/main.js?v=f33103ed68b9b31df7b5"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<blockquote><p>版本4.0 看似一小步，实际一大步</p></blockquote>
<p>我就不解释这和3.0的最重要的区别在哪儿了，一个是覆盖式发布而另一个是非覆盖式发布。大家可以看看上面我推荐的张云龙的回答，更好的理解这个问题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;//xxx.cdn.com/js/main.f33103ed68b9b31df7b5.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"//xxx.cdn.com/js/main.f33103ed68b9b31df7b5.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>列举上面这个例子，我想说明的是这些事情就是该前端来想的呀，而前端工程化中部署这一环节是不容忽视的。这个环节中包含的内容不只是上面的缓存控制，例如更新前确保资源自动部署到OSS、CDN等。代码部署除了效率以外更重要的是准确性和稳定性，而在前端工程化中重视部署环节可以增强部署的准确性和稳定性。写好你的部署脚本吧，一键更新，用户只多花了0.2秒下载新资源就能体验新版本，将让你感觉非常酷。</p>
<hr>
<h5>再来说说测试</h5>
<blockquote><p>“测试？打开浏览器点一下按钮看看有没有报错不就好了?”</p></blockquote>
<p>就算不提及回归测试会让你崩溃的问题，上面的这种方法也太原始了，前端代码的质量也是因此而久久提不到一个比较高的水平。其他的领域早就提出了各种测试方法，设有专门的岗位来测试项目，列出了一大堆的测试用例，甚至使用大牛向的TDD（Test-Driven Development）。做那么多事情，还不是为了提高代码质量，提高软件的稳定性！</p>
<p>于是前端也开始做单元测试，e2e测试方面的工作了。建议使用vue-cli的webpack template来试着创建一下项目，可以选择使用Karma+Mocha做单元测试，使用Nightwatch做e2e测试。</p>
<p><span class="img-wrap"><img data-src="/img/bVMCBO?w=1196&amp;h=1104" src="https://static.alili.tech/img/bVMCBO?w=1196&amp;h=1104" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>当然测试深度视项目而定，但对于前端工程化，一个完整的前端工程化来说，测试是必不可少的，也许你现在没有这个时间去完成100%的单元测试覆盖率，但一定要有这个认识，要明白这部分的重要性。</p>
<p>附上一些链接：<br><a href="https://cn.vuejs.org/v2/guide/unit-testing.html" rel="nofollow noreferrer" target="_blank">Vue单元测试</a><br><a href="https://github.com/karma-runner/karma" rel="nofollow noreferrer" target="_blank">karma - github</a><br><a href="https://github.com/mochajs/mocha" rel="nofollow noreferrer" target="_blank">mocha - github</a><br><a href="http://nightwatchjs.org/" rel="nofollow noreferrer" target="_blank">Nightwatch官网</a></p>
<hr>
<h4>写在后面</h4>
<p>文章写得比较凌乱，大家凑合着看吧，也算是最近面试过程中感悟出来的关于前端工程化的一些意见。本文主要内容并未详细剖析前端工程化的方方面面，这也不是一篇文章能讲完的事情，写这篇文章，只是作为大家知识的一点补充，毕竟前方已有大牛们开路。顺带一说，这也是我打算写的F++系列的主要目的。</p>
<p>如今想想写这篇文章的初衷，更加坚定了我要在日后的开发中贯彻前端工程化。所以说下雨的周末并未坏得那么彻底，写写文章还是挺有意思的。</p>
<h4>完</h4>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
F++：别忽略前端工程化的部署与测试

## 原文链接
[https://segmentfault.com/a/1190000009165899](https://segmentfault.com/a/1190000009165899)

