---
title: '为什么我选择使用 VS Code进行前端开发?' 
date: 2019-01-04 2:30:10
hidden: true
slug: 4c62am6qg8i
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000010750652" src="https://static.alili.tech/img/remote/1460000010750652" alt="VS Code" title="VS Code" style="cursor: pointer; display: inline;"></span></p>
<p>没错，我就是来给大家安利 VS Code 的。</p>
<p>对前端来说，这是一款性感无比的 IDE，哦不对应该是编辑器。我们团队有大部分人已经在用了，所以这周五在组内做了一个 VS Code 小分享，来发掘 VSC 一些提高开发效率的小技巧。我相信已经有不少前端在使用它了，所以大家更有必要一起分享下日常神操作了。</p>
<h2 id="articleHeader0">为什么选择 VS Code ？</h2>
<p>在 VSC 刚出来的时候，我就开始使用了（<a href="https://www.zhihu.com/question/29984607/answer/93300215" rel="nofollow noreferrer" target="_blank">如何评价 Visual Studio Code？</a>),理由很简单：</p>
<ul>
<li>开源，免费，颜值高；</li>
<li>微软出品，实力保证。</li>
</ul>
<p>然而用了一阵发现还是 Sublime 好用，一是刚出来功能不完善，Sublime 一些技巧无法迁移过来，另外就是插件太少，实际开发略显吃力。然随着后面 VSC 一次次更新，不少新 features 着实让人眼前一亮：微软这是在用心做产品呐！以至于现在已经没有什么可以抱怨的了(有趣的是当天尤大也发微博说转投 VSC 了，可以预见这款产品未来会越做越好，方向选对了，就不怕路走错)。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010750653" src="https://static.alili.tech/img/remote/1460000010750653" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>而作为前端，VSC 简直就是为我们量身定制：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010750654" src="https://static.alili.tech/img/remote/1460000010750654" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>VSC 本身是基于当前大火的 TS 来写的，所以对于 TS 的支持自然很好；又是基于 electron 开发，底层 Node.js 对前端来说再熟悉不过了。所以，如果你发现哪里不好用，你可以自己写插件呐！如果一个满足不了，那就写两个。</p>
<p>而对于 VSC 的扩展开发也是相当友好，你只需要5步：</p>
<ol>
<li>申请一个 <a href="https://www.visualstudio.com/zh-cn/docs/setup-admin/team-services/sign-up-for-visual-studio-team-services" rel="nofollow noreferrer" target="_blank">Visual Studio Team Services Account</a>；</li>
<li>添加一个 <a href="https://code.visualstudio.com/docs/extensions/publish-extension#_get-a-personal-access-token" rel="nofollow noreferrer" target="_blank">Personal access token</a>;</li>
<li>创建一个发布账号，用来发布你的扩展即可(以上操作完全免费)；</li>
<li>使用 VSC 的 Yeoman 脚手架初始化你的扩展项目，之后就是调用官方提供的 API 开发你的扩展即可，就跟开发 Chrome 插件一样；</li>
<li>使用官方发布工具vsce来发布你的扩展到扩展市场，之后别人就可以搜到你的扩展啦！</li>
</ol>
<p>所以对于前端来说，都是我们熟悉的技术栈，你可以作为一个使用者，也可以转身变成一个开发贡献者！</p>
<p>而对于 Sublime 和 WebStorm 来说就没有这么方便了，当然你也可以用 Python 或者 Java 来贡献插件，不过对于前端还是稍稍有些门槛。如果仅仅是使用的话，WebStrom 确实也很好用，毕竟人家收了钱，而且你最好买一个高配的电脑，否则代码撸多了，会卡到你怀疑人生。</p>
<h2 id="articleHeader1">一些实用扩展和技巧</h2>
<p>这才是重点。先贡献下自己的部分扩展列表：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010750655" src="https://static.alili.tech/img/remote/1460000010750655" alt="" title="" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010750656" src="https://static.alili.tech/img/remote/1460000010750656" alt="" title="" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010750657" src="https://static.alili.tech/img/remote/1460000010750657" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>各位要是有啥好用的扩展也分享一下呐，大家一起 get 新姿势！(有趣的是新版的 VSC在扩展栏增加了推荐栏，这样大家能更方便的发现一些精品）</p>
<p>强烈推荐的几个插件：</p>
<ul>
<li>Complete JSDoc Tags(好的注释不仅对项目有用，对 VSC 的代码智能感知也很有用)</li>
<li>Dash(如果你购买了 Dash App 的话）</li>
<li>EditorConfig for VS Code（统一的编辑配置对团队开发很有用）</li>
<li>ESLint（让 VSC 内置 ESLint）</li>
<li>Git History（装完输入 git log有惊喜)</li>
<li>Git Lens（让本就集成了 git 的 VSC 更加强大）</li>
<li>Path Intellisense(文件路径感知扩展）</li>
<li>Project Manager(多项目管理神器)</li>
<li>Settings Sync(将你所有的编辑器配置同步到 gist，省得在新设备上重新捣鼓)</li>
</ul>
<p>详细的介绍我就懒得写了，大家自己去探索发现吧，一些有用的资源：</p>
<ul>
<li>
<a href="https://code.visualstudio.com/docs" rel="nofollow noreferrer" target="_blank">官方文档</a> 永远是最有用的，或者你也可以选择<a href="https://jeasonstudio.gitbooks.io/vscode-cn-doc/content/" rel="nofollow noreferrer" target="_blank">中文翻译版</a>；</li>
<li>这里列出了更多好玩的插件<a href="https://github.com/viatsko/awesome-vscode" rel="nofollow noreferrer" target="_blank">awesome-vscode</a>;</li>
</ul>
<p>一些小技巧：</p>
<ul>
<li>每次更新 VSC 后，好好看下更新日志，有惊喜；</li>
<li>有事没事逛逛扩展市场，有惊喜；</li>
<li>有时间仔细看看官方文档，有惊喜；</li>
<li>好好研究下控制面板和快捷键，你会发现很多命令不用记；</li>
<li>VSC 本身是默认 git 工作流的，基于 git 项目进行开发体验更佳，不要让自己的工作区处于非 git repo 文件夹。</li>
</ul>
<h2 id="articleHeader2">总结</h2>
<p>不管你以前是用 Sublime 还是 WebStorm，又或者是 Atom 和 Eclipse，现在迁移到 VS Code 都是灰常方便的：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010750658" src="https://static.alili.tech/img/remote/1460000010750658" alt="" title="" style="cursor: pointer;"></span></p>
<p>最后，我为什么要安利 VS Code？</p>
<p>毕竟用的人越多，插件市场越丰富，解决问题更快捷，交流起来更愉快嘛！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
为什么我选择使用 VS Code进行前端开发?

## 原文链接
[https://segmentfault.com/a/1190000010750647](https://segmentfault.com/a/1190000010750647)

