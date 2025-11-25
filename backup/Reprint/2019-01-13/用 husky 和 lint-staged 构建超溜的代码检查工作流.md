---
title: '用 husky 和 lint-staged 构建超溜的代码检查工作流' 
date: 2019-01-13 2:30:11
hidden: true
slug: ggmo08gcwxc
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000009546916?w=1195&amp;h=705" src="https://static.alili.tech/img/remote/1460000009546916?w=1195&amp;h=705" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>具备基本工程素养的同学都会注重编码规范，而代码风格检查（Code Linting，简称 Lint）是保障代码规范一致性的重要手段，你的工作流中有 Lint 环节么？有的话你用的爽么？你在团队中推广过 Lint，但是大家都不买账？究竟是为啥？</p></blockquote>
<h2 id="articleHeader0">Lint 是什么？</h2>
<p>探讨怎么做之前，我们很有必要给 Lint 来个清晰、准确的定义，<a href="https://en.wikipedia.org/wiki/Lint_%28software%29" rel="nofollow noreferrer" target="_blank">wikipedia 的定义</a>如下：</p>
<blockquote><p>In computer programming, lint is a Unix utility that flags some suspicious and non-portable constructs (likely to be bugs) in C language source code; generically, lint or a linter is any tool that flags suspicious usage in software written in any computer language. The term lint-like behavior is sometimes applied to the process of flagging suspicious language usage. Lint-like tools generally perform static analysis of source code.</p></blockquote>
<p>简单来说，Lint 就是对代码做静态分析，并试图找出潜在问题的工具，实战中我们也用 Lint 来指使用工具的过程。</p>
<h2 id="articleHeader1">为什么要 Lint？</h2>
<p>使用 Lint 会有什么好处呢？在我看来至少具有如下 3 点：</p>
<ul>
<li><p>更少的 Bug，剑桥大学的<a href="http://www.prweb.com/releases/2013/1/prweb10298185.htm" rel="nofollow noreferrer" target="_blank">研究</a>发现，全世界每年因为软 Bug 造成的经济损失约 3120 亿美金；</p></li>
<li><p>更高的开发效率，工程师平均会花掉 50% 的工作时间定位和解决各种 Bug，其中不乏那些显而易见的低级错误，而 Lint 很容易发现低级的、显而易见的错误；</p></li>
<li><p>更高的可读性，代码可读性的首要因子是“表面文章”，表面上看起来乱糟糟的代码通常更难读懂；</p></li>
</ul>
<p>可以毫不客气的说，如果你不做 Lint，就是在浪费自己的时间，浪费公司的资源。既然做 Lint 的预期效果很好？该怎么做呢？</p>
<h2 id="articleHeader2">提交后 Lint：反馈链条太长？</h2>
<p>说到怎么做，多数人会自然而然的想到各种 Lint 工具，目前社区中针对各种语言都开发了 Lint 工具，前端能用到的就有大把：<a href="http://eslint.org/" rel="nofollow noreferrer" target="_blank">ESLint</a>、<a href="https://standardjs.com/index.html" rel="nofollow noreferrer" target="_blank">Standard</a>、<a href="https://github.com/brigade/scss-lint" rel="nofollow noreferrer" target="_blank">SCSSLint</a>、<a href="https://github.com/zaach/jsonlint" rel="nofollow noreferrer" target="_blank">JSONLint</a>、<a href="https://github.com/yaniswang/HTMLHint" rel="nofollow noreferrer" target="_blank">HTMLHint</a> 等。GitHub 官方出品的 <a href="https://github.com/showcases/clean-code-linters" rel="nofollow noreferrer" target="_blank">Lint 工具列表</a> 也是个非常不错的参考。</p>
<p>很多同学选择在持续集成阶段（后文用 CI 代称）做 Lint，比如使用远程的 Git Hooks 来触发。但是从实际的经历来看，这种做法的反馈链条通常如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="代码提交 --> 发现问题(远程) --> 修复问题 --> 重新提交 --> 通过检查(远程)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code style="word-break: break-word; white-space: initial;">代码提交<span class="hljs-function"> --&gt;</span> 发现问题<span class="hljs-function"><span class="hljs-params">(远程)</span> --&gt;</span> 修复问题<span class="hljs-function"> --&gt;</span> 重新提交<span class="hljs-function"> --&gt;</span> 通过检查(远程)</code></pre>
<p>整个过程可能会浪费掉你不少时间，毕竟 CI 过程通常不仅是在做 Lint，如果你是那种不知道自己时间每天都去哪儿了的工程师，可以反思下自己或者团队的工作流是否是这样。并且，请相信我，你不是少数人。</p>
<p>你有没有这样的经历：吭哧吭哧写了几天代码，各种验收都通过了，最后被 CI 拒绝，竟是因为你的代码中少加了一个逗号，这时候心情简直崩溃到无法形容：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009546917?w=500&amp;h=357" src="https://static.alili.tech/img/remote/1460000009546917?w=500&amp;h=357" alt="" title="" style="cursor: pointer;"></span></p>
<p>从 GitHub 上各种修复 Lint 的提交数量不难发现工程师在修复 Lint 问题上浪费的时间，比如搜索 "fix lint"，多达 45W 次提交：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009546918?w=934&amp;h=424" src="https://static.alili.tech/img/remote/1460000009546918?w=934&amp;h=424" alt="" title="" style="cursor: pointer;"></span></p>
<p>再比如搜索 “fix indent”，多达 226W 次提交，是不是很触目惊心？</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009546919?w=942&amp;h=428" src="https://static.alili.tech/img/remote/1460000009546919?w=942&amp;h=428" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>只在 CI 流程做 Lint 的缺点也是显而易见的：</p>
<ul>
<li><p>Lint 在整个开发工作流中的反馈链条太长，浪费时间、注意力和资源，最致命的；</p></li>
<li><p>CI 流程搭建成本比较高，即使有各种 CI 服务，步骤也还是比较繁琐；</p></li>
</ul>
<p>我们该怎么改进？</p>
<h2 id="articleHeader3">提交前 Lint：错误信息不相关？</h2>
<p>为了缩短 Lint 的反馈链条，把 Lint 挪到本地是最有效的办法。常见做法是使用 <a href="https://github.com/typicode/husky" rel="nofollow noreferrer" target="_blank">husky</a> 或者 <a href="https://github.com/observing/pre-commit" rel="nofollow noreferrer" target="_blank">pre-commit</a> 在本地提交之前做 Lint。</p>
<p>使用 husky 的具体做法如下：</p>
<p>首先，安装依赖：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -D husky
yarn add --dev husky" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">npm install -D husky
yarn add --dev husky</code></pre>
<p>然后修改 package.json，增加配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;scripts&quot;: {
    &quot;precommit&quot;: &quot;eslint src/**/*.js&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"precommit"</span>: <span class="hljs-string">"eslint src/**/*.js"</span>
  }
}</code></pre>
<p>最后尝试 Git 提交，你就会很快收到反馈：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git commit -m &quot;Keep calm and commit&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">git</span> commit -m <span class="hljs-string">"Keep calm and commit"</span></code></pre>
<p>但是在遗留代码仓库上工作的同学很快会遇到新的问题，开启 Lint 初期，你可能会面临成千上万的 Lint Error 需要修复。部分同学对下面这个图可能并不陌生：只改了文件 A，但是文件 B、C、D 中也有大量错误。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009546920?w=1240&amp;h=447" src="https://static.alili.tech/img/remote/1460000009546920?w=1240&amp;h=447" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>把整个仓库都格式化不失为一种选择，但是实际上需要很大的勇气。多数人在项目中运用新工具都希望是渐进式的，而不是推到重来式的，因为相比而言，业务系统稳定是更重要的事情。简单的把 Lint 挪到本地，反馈链条是缩短了，但是面对每次改动，<strong>工具还是给出了太多不相关的信息</strong>，这无疑与小步快跑的互联网节奏是相违背的。</p>
<p>该怎么破？</p>
<h2 id="articleHeader4">只  Lint 改动的：66666</h2>
<p>如果把 Lint 挪到本地，并且每次提交只检查本次提交所修改的文件，上面的痛点就都解决了。Feedly 的工程师 <a href="https://www.npmjs.com/~okonet" rel="nofollow noreferrer" target="_blank">Andrey Okonetchnikov</a> 开发的 <a href="https://github.com/okonet/lint-staged" rel="nofollow noreferrer" target="_blank">lint-staged</a> 就是基于这个想法，其中 staged 是 Git 里面的概念，指待提交区，使用 <code>git commit -a</code>，或者先 <code>git add</code> 然后 <code>git commit</code> 的时候，你的修改代码都会经过待提交区。</p>
<p>lint-staged 用法如下：</p>
<p>首先，安装依赖：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -D lint-staged
yarn add --dev lint-staged" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">npm install -D lint-staged
yarn add --dev lint-staged</code></pre>
<p>然后，修改 package.json 配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;scripts&quot;: {
    &quot;precommit&quot;: &quot;lint-staged&quot;
  },
  &quot;lint-staged&quot;: {
    &quot;src/**/*.js&quot;: &quot;eslint&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"precommit"</span>: <span class="hljs-string">"lint-staged"</span>
  },
  <span class="hljs-string">"lint-staged"</span>: {
    <span class="hljs-string">"src/**/*.js"</span>: <span class="hljs-string">"eslint"</span>
  }
}</code></pre>
<p>最后，尝试提交的效果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009546921?w=828&amp;h=568" src="https://static.alili.tech/img/remote/1460000009546921?w=828&amp;h=568" alt="" title="" style="cursor: pointer;"></span></p>
<p>实际上，lint-staged 给了你提交前代码操作的更大自由度，比如使用下面的配置，自动修复错误：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;scripts&quot;: {
    &quot;precommit&quot;: &quot;lint-staged&quot;
  },
  &quot;lint-staged&quot;: {
    &quot;src/**/*.js&quot;: [&quot;eslint --fix&quot;, &quot;git add&quot;]
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"precommit"</span>: <span class="hljs-string">"lint-staged"</span>
  },
  <span class="hljs-string">"lint-staged"</span>: {
    <span class="hljs-string">"src/**/*.js"</span>: [<span class="hljs-string">"eslint --fix"</span>, <span class="hljs-string">"git add"</span>]
  }
}</code></pre>
<p>或者使用下面的配置，自动格式化代码（谨慎使用）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;scripts&quot;: {
    &quot;precommit&quot;: &quot;lint-staged&quot;
  },
  &quot;lint-staged&quot;: {
    &quot;src/**/*.js&quot;: [&quot;prettier --write&quot;, &quot;git add&quot;]
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"precommit"</span>: <span class="hljs-string">"lint-staged"</span>
  },
  <span class="hljs-string">"lint-staged"</span>: {
    <span class="hljs-string">"src/**/*.js"</span>: [<span class="hljs-string">"prettier --write"</span>, <span class="hljs-string">"git add"</span>]
  }
}</code></pre>
<p>此外，lint-staged 和 prettier <a href="https://github.com/facebookincubator/create-react-app/pull/1759" rel="nofollow noreferrer" target="_blank">已经集成到 create-react-app 中了</a>。你是不是也应该好好打磨下自己的 Lint 工作流了？</p>
<h2 id="articleHeader5">总结</h2>
<p>有人说前端攻城狮是世界上最奇怪的动物，提交代码时用 prettier 把代码排版的很美观，但部署上线时又使用 uglify 把代码压缩的连亲妈都不认了，事实是，如果我们写出来的代码本来就很丑陋，就根本不需要用 uglify。希望读到这里的你能把 Lint 工作流打磨到极致，把更多时间专注在解决真正的问题上，成为真正高效的工程师。</p>
<h2 id="articleHeader6">One More Thing</h2>
<p>本文作者王仕军，商业转载请联系作者获得授权，非商业转载请注明出处。如果你觉得本文对你有帮助，请点赞！如果对文中的内容有任何疑问，欢迎留言讨论。想知道我接下来会写些什么？欢迎订阅我的<a href="https://juejin.im/user/57a7f634d342d300576b738d" rel="nofollow noreferrer" target="_blank">掘金专栏</a>或<a href="https://zhuanlan.zhihu.com/feweekly" rel="nofollow noreferrer" target="_blank">知乎专栏</a>：《前端周刊：让你在前端领域跟上时代的脚步》。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用 husky 和 lint-staged 构建超溜的代码检查工作流

## 原文链接
[https://segmentfault.com/a/1190000009546913](https://segmentfault.com/a/1190000009546913)

