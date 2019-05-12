---
title: '《GitHub 风格的 Markdown 正式规范》发布' 
date: 2019-01-23 2:30:08
hidden: true
slug: a6kj7huvmbw
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#github-风格的-markdown-正式规范发布"></a>《GitHub 风格的 Markdown 正式规范》发布</h1>
<p>很庆幸，我们当初选择 Markdown 作为用户在 GitHub 上托管内容的标记语言，它为用户提供了强大且直接的方式 (不管是技术的还是非技术的) 来编写可以很好的渲染成 HTML 的纯文本文档。</p>
<p>然而，其最主要的限制，就是缺乏在最模糊的语言细节上的标准。比如，使用多少个空格来进行行缩进、两个不同元素之间需要使用多少空行区分、大量繁琐细节往往造成不同的实现：相似的 Markdown 文档会因为选用的不同的语法解析器而渲染成相当不同的呈现效果。</p>
<p>五年前，我们在 <a href="https://github.com/vmg/sundown">Sundown</a> 的基础之上开始构建 GitHub 自定义版本的 Markdown —— GFM (GitHub 风格的 MarkdownGitHub Flavored Markdown)，这是我们特地为解决当时已有的 Markdown 解析器的不足而开发的一款解析器。</p>
<p>今天，我们希望通过发布 GitHub 风格的 Markdown 的正式语法规范及其相应的参考实现来改善现状。</p>
<p>该正式规范基于 <a href="http://commonmark.org/">CommonMark</a>，这是一个雄心勃勃的项目，旨在通过一个反映现实世界用法的方式来规范目前互联网上绝大多数网站使用的 Markdown 语法。CommonMark 允许人们以他们原有的习惯来使用 Markdown，同时为开发者提供一个综合规范和参考实例，从而实现跨平台的 Markdown 互操作和显示。</p>
<h3><a href="#规范"></a>规范</h3>
<p>使用 CommonMark 规范并围绕它来重新加工我们当前用户内容需要不少努力。我们纠结的主要问题是该规范 (及其参考实现) 过多关注由原生 Perl 实现支持的 Markdown 通用子集。这还不包括那些 GitHub 上已经在用的扩展特性。最明显的就是缺少 表格 (tables)、删除线 (strikethrough)、自动链接 (autolinks) 和 任务列表 (task lists) 的支持。</p>
<p>为完全描述 GitHub 的 Markdown 版本 (也称为 GFM)，我们必须要要正式定义这些特性的的语法和语意，这在以前从未做过。我们是在现存的 CommonMark 规范中来完成这一项工作的，同时还特意关注以确保我们的扩展是原有规范的一个严格且可选的超集。</p>
<p>当评估 <a href="https://github.github.com/gfm/">GFM 规范</a> 的时候，你可以清楚的知道哪些是 GFM 特定规范的补充内容，因为它们都高亮显示了。并且你也会看到原有规范的所有部分都保持原样，因此，GFM 规范能够与任何其他的实现保持兼容。</p>
<h3><a href="#实现"></a>实现</h3>
<p>为确保我们网站中的 Markdown 渲染能够完美兼容 CommonMark 规范，GitHub 的 GFM 解析器的后端实现基于 <code>cmark</code> 来开发，这是 CommonMark 规范的一个参考实现，由 <a href="https://github.com/jgm">John MacFarlane</a> 和许多其他的 <a href="https://github.com/jgm/cmark/#authors">出色的贡献者</a> 开发完成。</p>
<p>就像规范本身那样，<code>cmark</code> 是 Markdown 的严格子集解析器，所以我们还必须在现存解析器的基础上完成 GitHub 自定义扩展的解析功能。你可以通过 <a href="https://github.com/github/cmark"><code>cmark</code> 的分支</a> 来查看变更记录；为了跟踪不断改进的上游项目，我们持续将我们的补丁变基到上游主线上去。我们希望，这些扩展的正式规范一旦确定，这些补丁集同样可以应用到原始项目的上游变更中去。</p>
<p>除了在 <code>cmark</code> 分支中实现 GFM 规范特性，我们也同时将许多目标相似的变更贡献到上游。绝大多数的贡献都主要围绕性能和安全。我们的后端每天都需要渲染大量的 Markdown 文档，所以我们主要关注这些操作可以尽可能的高效率完成，同时还要确保那些滥用的恶意 Markdown 文档无法攻击到我们的服务器。</p>
<p>第一版使用 C 语言编写的解析器存在严重的安全隐患：通过足够深度的特殊 Markdown 元素的嵌套，它可能造成堆栈溢出 (甚至有时候可以运行任意代码)。而 <code>cmark</code> 实现，就像我们之前设计的解析器 Sundown，从一开始设计就考虑到要抵御这些攻击。其解析算法和基于 AST 的输出可以优雅的解决深层递归以及其他的恶意文档格式。</p>
<p><code>cmark</code> 在性能方面则是有点粗糙：基于实现 Sundown 时我们所学到的性能技巧，我们向上游贡献了许多优化方案，但除去所有这些变更之外，当前版本的 <code>cmark</code> 仍然无法与 Sundown 本身匹敌：我们的基准测试表明，<code>cmark</code> 在绝大多数文档渲染的性能上要比 Sundown 低 20% 到 30%。</p>
<p>那句古老的优化谚语 <em>最快的代码就是不需要运行的代码 (the fastest code is the code that doesn’t run)</em> 在此处同样适用：实际上，<code>cmark</code> 比 Sundown 要<em>多进行一些操作</em>。在其他的功能上，<code>cmark</code> 支持 UTF8 字符集，对参考的支持、扩展的接口清理的效果更佳。最重要的是它如同 Sundown 那样，并不会将 Markdown <em>翻译成</em> HTML。它实际上从 Markdown 源码中生成一个 AST (抽象语法树，Abstract Syntax Tree)，然后我们就看将之转换和逐渐渲染成 HTML。</p>
<p>如果考虑下我们在 Sundown 的最初实现 (特别是文档中关于查询用户的 mention 和 issue 引用、插入任务列表等) 时的 HTML 语法剖析工作量，你会发现 <code>cmark</code> 基于 AST 的方法可以节约大量时间 _和_ 降低我们用户内容堆栈的复杂度。Markdown AST 是一个非常强大的工具，并且值得 <code>cmark</code> 生成它所付出的性能成本。</p>
<h3><a href="#迁移"></a>迁移</h3>
<p>变更我们用户的内容堆栈以兼容 CommonMark 规范，并不同于转换我们用来解析 Markdown 的库那样容易：目前我们在遇到最根本的障碍就是由于一些不常用语法 (LCTT 译注：原文是 the Corner，作为名词的原意为角落、偏僻处、窘境，这应该是指那些不常用语法)，CommonMark 规范 (以及有歧义的 Markdown 原文) 可能会以一种意想不到的方式来渲染一些老旧的 Markdown 内容。</p>
<p>通过综合分析 GitHub 中大量的 Markdown 语料库，我们断定现存的用户内容只有不到 1% 会受到新版本实现的影响：我们是通过同时使用新 (<code>cmark</code>，兼容 CommonMark 规范) 旧 (Sundown) 版本的库来渲染大量的 Markdown 文档、标准化 HTML 结果、分析它们的不同点，最后才得到这一个数据的。</p>
<p>只有 1% 的文档存在少量的渲染问题，使得换用新实现并获取其更多出看起来是非常合理的权衡，但是是根据当前 GitHub 的规模，这个 1% 是非常多的内容以及很多的受影响用户。我们真的不想导致任何用户需要重新校对一个老旧的问题、看到先前可以渲染成 HTML 的内容又呈现为 ASCII 码 —— 尽管这明显不会导致任何原始内容的丢失，却是糟糕的用户体验。</p>
<p>因此，我们想出相应的方法来缓和迁移过程。首先，第一件我们做的事就是收集用户托管在我们网站上的两种不同类型 Markdown 的数据：用户的评论 (比如 Gist、issue、PR 等)以及在 git 仓库中的 Markdown 文档。</p>
<p>这两种内容有着本质上的区别：用户评论存储在我们的数据库中，这意味着他们的 Markdown 语法可以标准化 (比如添加或移除空格、修正缩进或则插入缺失的 Markdown 说明符，直到它们可正常渲染为止)。然而，那些存储在 Git 仓库中的 Markdown 文档则是 _根本_ 无法触及，因为这些内容已经散列成为 Git 存储模型的一部分。</p>
<p>幸运的是，我们发现绝大多数使用了复杂的 Markdown 特性的用户内容都是用户评论 (特别是 issue 主体和 PR 主体)，而存储于仓库中的文档则大多数情况下都可以使用新的和旧的渲染器正常进行渲染。</p>
<p>因此，我们加快了标准化现存用户内容的语法的进程，以便使它们在新旧实现下渲染效果一致。</p>
<p>我们用以文档转换的方法相当实用：我们那个旧的 Markdown 解析器， Sundown，更多的是扮演着翻译器而非解析器的角色。输入 Markdown 内容之后，一系列的语意回调就会把原始的 Markdown 内容转换为目标语言 (在我们的实际使用中是 HTML5) 的对应标记。基于这一设计方法，我们决定使用语意回调让 Sumdown 将原始 Markdown 转换为兼容 CommonMark 的 Markdown，而非 HTML。</p>
<p>除了转换之外，这还是一个高效的标准化过程，并且我们对此信心满满，毕竟完成这一任务的是我们在五年前就使用过的解析器。因此，所有的现存文档在保留其原始语意的情况下都能够进行明确的解析。</p>
<p>一旦升级 Sundown 来标准化输入文档并充分测试之后，我们就会做好开启转换进程的准备。最开始的一步，就是对所有新用户内容切换到新的 <code>cmark</code> 实现上，以便确保我们能有一个有限的分界点来进行过渡。实际上，几个月前我们就为网站上所有 <strong>新的</strong> 用户评论启用了 CommonMark，这一过程几乎没有引起任何人注意 —— 这是关于 CommonMark 团队出色工作的证明，通过一个最具现实世界用法的方式来正式规范 Markdown 语言。</p>
<p>在后端，我们开启 MySQL 转换来升级替代所有 Markdown 用户内容。在所有的评论进行标准化之后，在将其写回到数据库之前，我们将使用新实现来进行渲染并与旧实现的渲染结果进行对比，以确保 HTML 输出结果视觉上感觉相同，并且用户数据在任何情况下都不会被破坏。总而言之，只有不到 1% 的输入文档会受到标准进程的修改，这符合我们的的期望，同时再次证明 CommonMark 规范能够呈现语言的真实用法。</p>
<p>整个过程会持续好几天，最后的结果是网站上所有的 Markdown 用户内容会得到全面升级以符合新的 Markdown 标准，同时确保所有的最终渲染输出效果对用户视觉上感觉相同。</p>
<h3><a href="#结论"></a>结论</h3>
<p>从今天 (LCTT 译注：原文发布于 2017 年 3 月 14 日，这里的今天应该是这个日期) 开始， 我们同样为所有存储在 Git 仓库中的 Markdown 内容启动 CommonMark 渲染。正如上文所述，所有的现存文档都不会进行标准化，因为我们所期望中的多数渲染效果都刚刚好。</p>
<p>能够让在 GitHub 上的所有 Markdown 内容符合一个动态变化且使用的标准，同时还可以为我的用户提供一个关于 GFM 如何进行解析和渲染 <a href="https://github.github.com/gfm/">清晰且权威的参考说明</a>，我们是相当激动的。</p>
<p>我们还将致力于 CommonMark 规范，一直到在它正式发布之前消除最后一个 bug。我们也希望 GitHub.com 在其 1.0 规范发布之后可以进行完美兼容。</p>
<p>作为结束，以下为想要学习 CommonMark 规范或则自己来编写实现的朋友提供一些有用的链接。</p>
<ul>
<li><a href="http://commonmark.org/">CommonMark 主页</a>，可以了解本项目更多信息</li>
<li><a href="http://talk.commonmark.org/">CommonMark 论坛讨论区</a>，可以提出关于该规范的的问题和更改建议</li>
<li><a href="http://spec.commonmark.org/">CommonMark 规范</a></li>
<li><a href="https://github.com/jgm/cmark/">使用 C 语言编写的参考实现</a></li>
<li><a href="https://github.com/github/cmark/">Our fork with support for all GFM extensions</a></li>
<li><a href="https://github.github.com/gfm/">GFM 规范</a>，基于原始规范</li>
<li><a href="https://github.com/jgm/CommonMark/wiki/List-of-CommonMark-Implementations">使用其他编程语言编写的 CommonMark 实现列表</a></li>
</ul>
<hr>
<p>译者简介：</p>
<p><a href="http://GHLandy.com">GHLandy</a> —— 生活中所有欢乐与苦闷都应藏在心中，有些事儿注定无人知晓，自己也无从说起。</p>
<hr>
<p>via: <a href="https://githubengineering.com/a-formal-spec-for-github-markdown/">https://githubengineering.com/a-formal-spec-for-github-markdown/</a></p>
<p>作者：<a href="https://github.com/kivikakk">Yuki Izumi</a>， <a href="https://github.com/vmg">Vicent Martí</a> 译者：<a href="https://github.com/GHLandy">GHLandy</a> 校对：<a href="https://github.com/jasminepeng">jasminepeng</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
《GitHub 风格的 Markdown 正式规范》发布

## 原文链接
[https://www.zcfy.cc/article/a-formal-spec-for-github-flavored-markdown](https://www.zcfy.cc/article/a-formal-spec-for-github-flavored-markdown)

