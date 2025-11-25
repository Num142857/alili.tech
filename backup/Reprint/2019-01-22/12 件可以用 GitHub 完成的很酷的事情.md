---
title: '12 件可以用 GitHub 完成的很酷的事情' 
date: 2019-01-22 2:30:07
hidden: true
slug: 9d1rsgj2dm
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#12-件可以用-github-完成的很酷的事情"></a>12 件可以用 GitHub 完成的很酷的事情</h1>
<p>我不能为我的人生想出一个引子来，所以……</p>
<h3><a href="#1-在-githubcom-上编辑代码"></a>#1 在 GitHub.com 上编辑代码</h3>
<p>我想我要开始介绍的第一件事是多数人都已经知道的（尽管我一周之前还不知道）。</p>
<p>当你登录到 GitHub ，查看一个文件时（任何文本文件，任何版本库），右上方会有一只小铅笔。点击它，你就可以编辑文件了。 当你编辑完成后，GitHub 会给出文件变更的建议，然后为你复刻fork该仓库并创建一个拉取请求pull request（PR）。</p>
<p>是不是很疯狂？它为你创建了一个复刻！</p>
<p>你不需要自己去复刻、拉取，然后本地修改，再推送，然后创建一个 PR。</p>
<p><a href="https://camo.githubusercontent.com/7538814458ad7446e9f6160470c36ac7d8dd2604/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f313630302f312a7733794b4f6e56776f6d764b2d676337686c514e6f772e706e67"><img src="https://p0.ssl.qhimg.com/t01a9ea3228c3b3d9e9.png" alt=""></a></p>
<p><em>不是一个真正的 PR</em></p>
<p>这对于修改错误拼写以及编辑代码时的一些糟糕的想法是很有用的。</p>
<h3><a href="#2-粘贴图像"></a>#2 粘贴图像</h3>
<p>在评论和工单issue的描述中并不仅限于使用文字。你知道你可以直接从剪切板粘贴图像吗？ 在你粘贴的时候，你会看到图片被上传 (到云端，这毫无疑问)，并转换成 markdown 显示的图片格式。</p>
<p>棒极了。</p>
<h3><a href="#3-格式化代码"></a>#3 格式化代码</h3>
<p>如果你想写一个代码块的话，你可以用三个反引号（<code>`</code>）作为开始 —— 就像你在浏览 <a href="https://guides.github.com/features/mastering-markdown/">精通 Markdown</a> 时所学到的一样 —— 而且 GitHub 会尝试去推测你所写下的编程语言。</p>
<p>但如果你粘贴的像是 Vue、Typescript 或 JSX 这样的代码，你就需要明确指出才能获得高亮显示。</p>
<p>在首行注明 ````jsx`：</p>
<p><a href="https://camo.githubusercontent.com/2e7d86f5191892221d5d20d01a46df652e64558b/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f313630302f312a786e7438336f47574c744a7a4e7a77702d59765375412e706e67"><img src="https://p0.ssl.qhimg.com/t01e2765f90c51b1d0d.png" alt=""></a></p>
<p>…这意味着代码段已经正确的呈现：</p>
<p><a href="https://camo.githubusercontent.com/405cd5c063aa3f3d7786b67fd4abb25fa0b126b3/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f313630302f312a466e4f637a2d625a69335339546e33644447694962512e706e67"><img src="https://p0.ssl.qhimg.com/t0114ebc4e30f0b566f.png" alt=""></a></p>
<p>（顺便说一下，这些用法也可以用到 gist。 如果你给一个 gist 用上 <code>.jsx</code> 扩展名，你的 JSX 语法就会高亮显示。）</p>
<p>这里是<a href="https://github.com/github/linguist/blob/fc1404985abb95d5bc33a0eba518724f1c3c252e/vendor/README.md">所有被支持的语法</a>的清单。</p>
<h3><a href="#4-用-pr-中的魔法词来关闭工单"></a>#4 用 PR 中的魔法词来关闭工单</h3>
<p>比方说你已经创建了一个用来修复 <code>#234</code> 工单的拉取请求。那么你就可以把 <code>fixes #234</code> 这段文字放在你的 PR 的描述中（或者是在 PR 的评论的任何位置）。</p>
<p>接下来，在合并 PR 时会自动关闭与之对应的工单。这是不是很酷？</p>
<p>这里是<a href="https://help.github.com/articles/closing-issues-using-keywords/">更详细的学习帮助</a>。</p>
<h3><a href="#5-链接到评论"></a>#5 链接到评论</h3>
<p>是否你曾经想要链接到一个特定的评论但却无从着手？这是因为你不知道如何去做到这些。不过那都过去了，我的朋友，我告诉你啊，点击紧挨着名字的日期或时间，这就是如何链接到一个评论的方法。</p>
<p><a href="https://camo.githubusercontent.com/6124dcf74511a9347263261bf5b72ffe869b728f/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f313630302f312a72537134572d75745147676135474f572d77325147672e706e67"><img src="https://p0.ssl.qhimg.com/t01584485419485970b.png" alt=""></a></p>
<p><em>嘿，这里有 gaearon 的照片！</em></p>
<h3><a href="#6-链接到代码"></a>#6 链接到代码</h3>
<p>那么你想要链接到代码的特定行么。我了解了。</p>
<p>试试这个：在查看文件的时候，点击挨着代码的行号。</p>
<p>哇哦，你看到了么？URL 更新了，加上了行号！如果你按下 <code>Shift</code> 键并点击其他的行号，格里格里巴巴变！URL 再一次更新并且现在出现了行范围的高亮。</p>
<p>分享这个 URL 将会链接到这个文件的那些行。但等一下，链接所指向的是当前分支。如果文件发生变更了怎么办？也许一个文件当前状态的永久链接permalink就是你以后需要的。</p>
<p>我比较懒，所以我已经在一张截图中做完了上面所有的步骤：</p>
<p><a href="https://camo.githubusercontent.com/61747e1bf95746755300dd234fc4442690cd2e86/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f313630302f312a355167324771546b544b75584c415261735a4e3537412e706e67"><img src="https://p0.ssl.qhimg.com/t01f7e5b98e5e5d031a.png" alt=""></a></p>
<p><em>说起 URL…</em></p>
<h3><a href="#7-像命令行一样使用-github-url"></a>#7 像命令行一样使用 GitHub URL</h3>
<p>使用 UI 来浏览 GitHub 有着很好的体验。但有些时候最快到达你想去的地方的方法就是在地址栏输入。举个例子，如果我想要跳转到一个我正在工作的分支，然后查看与 master 分支的差异，我就可以在我的仓库名称的后边输入 <code>/compare/branch-name</code> 。</p>
<p>这样就会访问到指定分支的 diff 页面。</p>
<p><a href="https://camo.githubusercontent.com/79e6df6c4a3c4660e88edf32281634e7bd09f2f0/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f323030302f312a447165784d31793339386753616f7a4c4e6c6c726f412e706e67"><img src="https://p0.ssl.qhimg.com/t01c1003eea8ea38b88.png" alt=""></a></p>
<p>然而这就是与 master 分支的 diff，如果我要与 develoment 分支比较，我可以输入 <code>/compare/development...my-branch</code>。</p>
<p><a href="https://camo.githubusercontent.com/50de3d2a4d9e8efc3cc79a649bf275dc95d6c624/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f323030302f312a726f4f5844756f5f2d39514b49354e4c4b6d766547512e706e67"><img src="https://p0.ssl.qhimg.com/t0194cbb8e8be832856.png" alt=""></a></p>
<p>对于你这种键盘快枪手来说，<code>ctrl</code>+<code>L</code> 或 <code>cmd</code>+<code>L</code> 将会向上跳转光标进入 URL 那里（至少在 Chrome 中是这样）。这（再加上你的浏览器会自动补全）能够成为一种在分支间跳转的便捷方式。</p>
<p>专家技巧：使用方向键在 Chrome 的自动完成建议中移动同时按 <code>shift</code>+<code>delete</code> 来删除历史条目（例如，一旦分支被合并后）。</p>
<p>（我真的好奇如果我把快捷键写成 <code>shift + delete</code> 这样的话，是不是读起来会更加容易。但严格来说 ‘+’ 并不是快捷键的一部分，所以我并不觉得这很舒服。这一点纠结让 _我_ 整晚难以入睡，Rhonda。）</p>
<h3><a href="#8-在工单中创建列表"></a>#8 在工单中创建列表</h3>
<p>你想要在你的工单issue中看到一个复选框列表吗？</p>
<p><a href="https://camo.githubusercontent.com/7316fdd14efa80666cb1f49742ea6120361f2f59/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f313630302f312a5149652d584f4b4f585442336858614c657372307a772e706e67"><img src="https://p0.ssl.qhimg.com/t01d575dad6bb4b040b.png" alt=""></a></p>
<p>你想要在工单列表中显示为一个漂亮的 “2 of 5” 进度条吗?</p>
<p><a href="https://camo.githubusercontent.com/ac193130d7bc2dabb2d2f820620ffad7da5bf97d/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f313630302f312a303657644570787561736461322d6c61766a6a764e772e706e67"><img src="https://p0.ssl.qhimg.com/t010314e7f9a8083e28.png" alt=""></a></p>
<p>很好！你可以使用这些的语法创建交互式的复选框：</p>
<pre><code class="hljs routeros"> - [ ]<span class="hljs-built_in"> Screen </span>width (integer)
 - [x]<span class="hljs-built_in"> Service </span>worker support
 - [x] Fetch support
 - [ ] CSS flexbox support
 - [ ] Custom elements

</code></pre><p>它的表示方法是空格、破折号、再空格、左括号、填入空格（或者一个 <code>x</code> ），然后封闭括号，接着空格，最后是一些话。</p>
<p>然后你可以实际选中或取消选中这些框！出于一些原因这些对我来说看上去就像是技术魔法。你可以_选中_这些框! 同时底层的文本会进行更新。</p>
<p>他们接下来会想到什么魔法？</p>
<p>噢，如果你在一个项目面板project board上有这些工单的话，它也会在这里显示进度：</p>
<p><a href="https://camo.githubusercontent.com/f8abebd70817ec7b40c646c8b7c2f61f6b1e395a/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f313630302f312a785f4d7a67434a5846702d79677371465142357148412e706e67"><img src="https://p0.ssl.qhimg.com/t012ab2a4b624698aa5.png" alt=""></a></p>
<p>如果在我提到“在一个项目面板上”时你不知道我在说些什么，那么你会在本页下面进一步了解。</p>
<p>比如，在本页面下 2 厘米的地方。</p>
<h3><a href="#9-github-上的项目面板"></a>#9 GitHub 上的项目面板</h3>
<p>我常常在大项目中使用 Jira 。而对于个人项目我总是会使用 Trello 。我很喜欢它们两个。</p>
<p>当我学会 GitHub 的几周后，它也有了自己的项目产品，就在我的仓库上的 Project 标签，我想我会照搬一套我已经在 Trello 上进行的任务。</p>
<p><a href="https://camo.githubusercontent.com/bc975c00c3b2e65f943dec9e5ba1fc335a355457/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f323030302f312a4e46375a6e486e645a51325346556335504b2d4371772e706e67"><img src="https://p0.ssl.qhimg.com/t010875452c55853012.png" alt=""></a></p>
<p><em>没有一个是有趣的任务</em></p>
<p>这里是在 GitHub 项目上相同的内容：</p>
<p><a href="https://camo.githubusercontent.com/4afa58f6dae6ff7d63591deceb832f37761dd15f/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f323030302f312a4348736f66617062344a7445446d76654f76545956512e706e67"><img src="https://p0.ssl.qhimg.com/t01af36b968872d95cb.png" alt=""></a></p>
<p><em>你的眼睛最终会适应这种没有对比的显示</em></p>
<p>出于速度的缘故，我把上面所有的都添加为 “备注note” —— 意思是它们不是真正的 GitHub 工单。</p>
<p>但在 GitHub 上，管理任务的能力被集成在版本库的其他地方 —— 所以你可能想要从仓库添加已有的工单到面板上。</p>
<p>你可以点击右上角的添加卡片Add Cards，然后找你想要添加的东西。在这里，特殊的<a href="https://help.github.com/articles/searching-issues-and-pull-requests/">搜索语法</a>就派上用场了，举个例子，输入 <code>is:pr is:open</code> 然后现在你可以拖动任何开启的 PR 到项目面板上，或者要是你想清理一些 bug 的话就输入 <code>label:bug</code>。</p>
<p><a href="https://camo.githubusercontent.com/f2f0d36ebbf877ddcda6453fec1331ed82e67c18/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f323030302f312a72545643523932486849506872566e4f6e58525a6b512e706e67"><img src="https://p0.ssl.qhimg.com/t0141e993bc413e3984.png" alt=""></a></p>
<p>亦或者你可以将现有的备注转换为工单。</p>
<p><a href="https://camo.githubusercontent.com/ad89106d5ca1e2420fc788bebf57d7bcc439ef1c/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f313630302f312a70546d3764796773794c78734f55446b4d37435463672e706e67"><img src="https://p0.ssl.qhimg.com/t01c447dcd9423848ee.png" alt=""></a></p>
<p>再或者，从一个现有工单的屏幕上，把它添加到右边面板的项目上。</p>
<p><a href="https://camo.githubusercontent.com/2266d965febf31e4a14859847f2e47f81c647575/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f313630302f312a437a73306353633931745876343131756e65454d39412e706e67"><img src="https://p0.ssl.qhimg.com/t011fe21113d5d36ca5.png" alt=""></a></p>
<p>它们将会进入那个项目面板的分类列表，这样你就能决定放到哪一类。</p>
<p>在实现那些任务的同一个仓库下放置任务的内容有一个巨大（超大）的好处。这意味着今后的几年你能够在一行代码上做一个 <code>git blame</code>，可以让你找出最初在这个任务背后写下那些代码的根据，而不需要在 Jira、Trello 或其它地方寻找蛛丝马迹。</p>
<h4><a href="#缺点"></a>缺点</h4>
<p>在过去的三周我已经对所有的任务使用 GitHub 取代 Jira 进行了测试（在有点看板风格的较小规模的项目上) ，到目前为止我都很喜欢。</p>
<p>但是我无法想象在 scrum（LCTT 译注：迭代式增量软件开发过程）项目上使用它，我想要在那里完成正确的工期估算、开发速度的测算以及所有的好东西怕是不行。</p>
<p>好消息是，GitHub 项目只有很少一些“功能”，并不会让你花很长时间去评估它是否值得让你去切换。因此要不要试试，你自己看着办。</p>
<p>无论如何，我<em>听说过</em> <a href="https://www.zenhub.com/">ZenHub</a> 并且在 10 分钟前第一次打开了它。它是对 GitHub 高效的延伸，可以让你估计你的工单并创建 epic 和 dependency。它也有 velocity 和燃尽图burndown chart功能；这看起来<em>可能是</em>世界上最棒的东西了。</p>
<p>延伸阅读： <a href="https://help.github.com/articles/tracking-the-progress-of-your-work-with-project-boards/">GitHub help on Projects</a>。</p>
<h3><a href="#10-github维基"></a>#10 GitHub 维基</h3>
<p>对于一堆非结构化页面（就像维基百科一样）， GitHub 维基wiki提供的（下文我会称之为 Gwiki）就很优秀。</p>
<p>结构化的页面集合并没那么多，比如说你的文档。这里没办法说“这个页面是那个页面的子页”，或者有像‘下一节’和‘上一节’这样的按钮。Hansel 和 Gretel 将会完蛋，因为这里没有面包屑导航（LCTT 译注：引自童话故事《糖果屋》）。</p>
<p>（边注，你有_读过<em>那个故事吗? 这是个残酷的故事。两个混蛋小子将饥肠辘辘的老巫婆烧死在</em>她自己的火炉_里。毫无疑问她是留下来收拾残局的。我想这就是为什么如今的年轻人是如此的敏感 —— 今天的睡前故事太不暴力了。)</p>
<p>继续 —— 把 Gwiki 拿出来接着讲，我输入一些 NodeJS 文档中的内容作为维基页面，然后创建一个侧边栏以模拟一些真实结构。这个侧边栏会一直存在，尽管它无法高亮显示你当前所在的页面。</p>
<p>其中的链接必须手动维护，但总的来说，我认为这已经很好了。如果你觉得有需要的话可以<a href="https://github.com/davidgilbertson/about-github/wiki">看一下</a>。 </p>
<p><a href="https://camo.githubusercontent.com/a2a05eb30c36711aff93b2abcbc4a0e35d5e5976/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f313630302f312a42534b51706b4c6d565170554d4c304a653957734c512e706e67"><img src="https://p0.ssl.qhimg.com/t0116962e6f515ec172.png" alt=""></a></p>
<p>它将不会与像 GitBook（它使用了 <a href="http://redux.js.org/">Redux 文档</a>）或定制的网站这样的东西相比较。但它八成够用了，而且它就在你的仓库里。</p>
<p>我是它的一个粉丝。</p>
<p>我的建议：如果你已经拥有不止一个 <code>README.md</code> 文件，并且想要一些不同的页面作为用户指南或是更详细的文档，那么下一步你就需要停止使用 Gwiki 了。</p>
<p>如果你开始觉得缺少的结构或导航非常有必要的话，去切换到其他的产品吧。</p>
<h3><a href="#11-github-页面带有jekyll"></a>#11 GitHub 页面（带有 Jekyll）</h3>
<p>你可能已经知道了可以使用 GitHub 页面Pages 来托管静态站点。如果你不知道的话现在就可以去试试。不过这一节确切的说是关于使用 Jekyll 来构建一个站点。</p>
<p>最简单的来说， GitHub 页面 + Jekyll 会将你的 <code>README.md</code> 呈现在一个漂亮的主题中。举个例子，看看我的 <a href="https://github.com/davidgilbertson/about-github">关于 github</a> 中的 readme 页面:</p>
<p><a href="https://camo.githubusercontent.com/fc42f7bffde8a2d70ccdf94c8fe899c3e2719be3/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f323030302f312a6e552d765a6643685a306d5a77397a4f2d36694a6f772e706e67"><img src="https://p0.ssl.qhimg.com/t01ce781965f584b5b7.png" alt=""></a></p>
<p>点击 GitHub 上我的站点的设置settings标签，开启 GitHub 页面功能，然后挑选一个 Jekyll 主题……</p>
<p><a href="https://camo.githubusercontent.com/43873a66cf6be9b89975589a263a6ffcfa4aa4df/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f313630302f312a745439415337744e66456a62416354336d6b7a6764772e706e67"><img src="https://p0.ssl.qhimg.com/t01d45a644cd8bf0a19.png" alt=""></a></p>
<p>我就会得到一个 <a href="https://davidgilbertson.github.io/about-github/">Jekyll 主题的页面</a>：</p>
<p><a href="https://camo.githubusercontent.com/0721c710adc88e484d674be2bfba78de2a2af9cf/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f323030302f312a70494532464d79576968376e464164502d79475874512e706e67"><img src="https://p0.ssl.qhimg.com/t01120a6504d06a790a.png" alt=""></a></p>
<p>由此我可以构建一个主要基于易于编辑的 markdown 文件的静态站点，其本质上是把 GitHub 变成一个 CMS（LCTT 译注：内容管理系统）。</p>
<p>我还没有真正的使用过它，但这就是 React 和 Bootstrap 网站构建的过程，所以并不可怕。</p>
<p>注意，在本地运行它需要 Ruby （Windows 用户会彼此交换一下眼神，然后转头看向其它的方向。macOS 用户会发出这样这样的声音 “出什么问题了，你要去哪里？Ruby 可是一个通用平台！GEMS 万岁！”）。</p>
<p>（这里也有必要加上，“暴力或威胁的内容或活动” 在 GitHub 页面上是不允许的，因此你不能去部署你的 Hansel 和 Gretel 重启之旅了。）</p>
<h4><a href="#我的意见"></a>我的意见</h4>
<p>为了这篇文章，我对 GitHub 页面 + Jekyll 研究越多，就越觉得这件事情有点奇怪。</p>
<p>“拥有你自己的网站，让所有的复杂性远离”这样的想法是很棒的。但是你仍然需要在本地生成配置。而且可怕的是需要为这样“简单”的东西使用很多 CLI（LCTT 译注：命令行界面）命令。</p>
<p>我只是略读了<a href="https://jekyllrb.com/docs/home/">入门部分</a>的七页，给我的感觉像是<em>我才是</em>那个小白。此前我甚至从来没有学习过所谓简单的 “Front Matter” 的语法或者所谓简单的 “Liquid 模板引擎” 的来龙去脉。</p>
<p>我宁愿去手工编写一个网站。</p>
<p>老实说我有点惊讶 Facebook 使用它来写 React 文档，因为他们能够用 React 来构建他们的帮助文档，并且在一天之内<a href="https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md#pre-rendering-into-static-html-files">预渲染到静态的 HTML 文件</a>。</p>
<p>他们所需要做的就是利用已有的 Markdown 文件，就像跟使用 CMS 一样。</p>
<p>我想是这样……</p>
<h3><a href="#12-使用-github-作为cms"></a>#12 使用 GitHub 作为 CMS</h3>
<p>比如说你有一个带有一些文本的网站，但是你并不想在 HTML 的标记中储存那些文本。</p>
<p>取而代之，你想要把这堆文本存放到某个地方，以便非开发者也可以很容易地编辑。也许要使用某种形式的版本控制。甚至还可能需要一个审查过程。</p>
<p>这里是我的建议：在你的版本库中使用 markdown 文件存储文本。然后在你的前端使用插件来获取这些文本块并在页面呈现。</p>
<p>我是 React 的支持者，因此这里有一个 <code>&lt;Markdown&gt;</code> 插件的示例，给出一些 markdown 的路径，它就会被获取、解析，并以 HTML 的形式呈现。</p>
<p>（我正在使用 <a href="https://www.npmjs.com/package/marked">marked</a> npm 包来将 markdown 解析为 HTML。）</p>
<p>这里是我的示例仓库 <a href="https://github.com/davidgilbertson/about-github/tree/master/text-snippets">/text-snippets</a>，里边有一些 markdown 文件 。</p>
<p>（你也可以使用 GitHub API 来<a href="https://developer.github.com/v3/repos/contents/#get-contents">获取内容</a> —— 但我不确定你是否能搞定。）</p>
<p>你可以像这样使用插件：</p>
<p>如此，GitHub 就是你的 CMS 了，可以说，不管有多少文本块都可以放进去。</p>
<p>上边的示例只是在浏览器上安装好插件后获取 markdown 。如果你想要一个静态站点那么你需要服务器端渲染。</p>
<p>有个好消息！没有什么能阻止你从服务器中获取所有的 markdown 文件 (并配上各种为你服务的缓存策略)。如果你沿着这条路继续走下去的话，你可能会想要去试试使用 GitHub API 去获取目录中的所有 markdown 文件的列表。</p>
<h3><a href="#奖励环节github工具"></a>奖励环节 —— GitHub 工具！</h3>
<p>我曾经使用过一段时间的 <a href="https://chrome.google.com/webstore/detail/octotree/bkhaagjahfmjljalopjnoealnfndnagc?hl=en-US">Chrome 的扩展 Octotree</a>，而且现在我推荐它。虽然不是吐血推荐，但不管怎样我还是推荐它。</p>
<p>它会在左侧提供一个带有树状视图的面板以显示当前你所查看的仓库。</p>
<p><a href="https://camo.githubusercontent.com/f0085758e9e905b21e17d26bd948ef656fd8c017/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f323030302f312a2d4d6746713354456a64797331636f6946352d6443772e706e67"><img src="https://p0.ssl.qhimg.com/t0150beafe2ef642545.png" alt=""></a></p>
<p>从<a href="https://www.youtube.com/watch?v=NhlzMcSyQek&amp;index=2&amp;list=PLNYkxOF6rcIB3ci6nwNyLYNU6RDOU3YyL">这个视频</a>中我了解到了 <a href="https://octobox.io/">octobox</a> ，到目前为止看起来还不错。它是一个 GitHub 工单的收件箱。这一句介绍就够了。</p>
<p>说到颜色，在上面所有的截图中我都使用了亮色主题，所以希望不要闪瞎你的双眼。不过说真的，我看到的其他东西都是黑色的主题，为什么我非要忍受 GitHub 这个苍白的主题呐？</p>
<p><a href="https://camo.githubusercontent.com/37ee161be7e0f325a96d5fe96549569aa14bf4c3/68747470733a2f2f63646e2d696d616765732d312e6d656469756d2e636f6d2f6d61782f323030302f312a5355644c656f6171384174565179452d6443772d54672e706e67"><img src="https://p0.ssl.qhimg.com/t01159b8d98083ce2bb.png" alt=""></a></p>
<p>这是由 Chrome 扩展 <a href="https://chrome.google.com/webstore/detail/stylish-custom-themes-for/fjnbnpbmkenffdnngjfgmeleoegfcffe/related?hl=en">Stylish</a>（它可以在任何网站使用主题）和 <a href="https://userstyles.org/styles/37035/github-dark">GitHub Dark</a> 风格的一个组合。要完全黑化，那黑色主题的 Chrome 开发者工具（这是内建的，在设置中打开） 以及 <a href="https://chrome.google.com/webstore/detail/atom-one-dark-theme/obfjhhknlilnfgfakanjeimidgocmkim?hl=en">Atom One Dark for Chrome 主题</a>你肯定也需要。</p>
<h3><a href="#bitbucket"></a>Bitbucket</h3>
<p>这些内容不适合放在这篇文章的任何地方，但是如果我不称赞 Bitbucket 的话，那就不对了。</p>
<p>两年前我开始了一个项目并花了大半天时间评估哪一个 git 托管服务更适合，最终 Bitbucket 赢得了相当不错的成绩。他们的代码审查流程遥遥领先（这甚至比 GitHub 拥有的指派审阅者的概念要早很长时间）。</p>
<p>GitHub 后来在这次审查竞赛中追了上来，干的不错。不幸的是在过去的一年里我没有机会再使用 Bitbucket —— 也许他们依然在某些方面领先。所以，我会力劝每一个选择 git 托管服务的人考虑一下 Bitbucket 。</p>
<h3><a href="#结尾"></a>结尾</h3>
<p>就是这样！我希望这里至少有三件事是你此前并不知道的，祝好。</p>
<p>修订：在评论中有更多的技巧；请尽管留下你自己喜欢的技巧。真的，真心祝好。</p>
<hr>
<p>via: <a href="https://hackernoon.com/12-cool-things-you-can-do-with-github-f3e0424cf2f0">https://hackernoon.com/12-cool-things-you-can-do-with-github-f3e0424cf2f0</a></p>
<p>作者：<a href="https://hackernoon.com/@david.gilbertson">David Gilbertson</a> 译者：<a href="https://github.com/softpaopao">softpaopao</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
12 件可以用 GitHub 完成的很酷的事情

## 原文链接
[https://www.zcfy.cc/article/12-cool-things-you-can-do-with-github](https://www.zcfy.cc/article/12-cool-things-you-can-do-with-github)

