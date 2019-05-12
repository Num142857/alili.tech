---
title: 'Node.js 新计划：使用 V8 snapshot 将启动速度提升 8 倍' 
date: 2018-12-25 2:30:11
hidden: true
slug: w7csk179mtj
categories: [reprint]
---

{{< raw >}}

                    
<p>昨天 @hashseed 为 Node.js 提交了一个 issue：<a href="https://github.com/nodejs/node/issues/17058" rel="nofollow noreferrer" target="_blank">RFC: speeding up Node.js startup using V8 snapshot#17058</a></p>
<p>hashseed 是一名 Google 工程师，是 V8 开发者，同时也为 Node.js 贡献代码。在 issue 中 hashseed 写道：</p>
<blockquote><p>我最近研究了 Node.js 的启动代码，我认为我们可以通过使用 V8 snapshot 让它启动的更快。我写了一个设计文档来解释几个要点。</p></blockquote>
<p>设计文档：<a href="https://docs.google.com/document/d/1YEIBdH7ocJfm6PWISKw03szNAgnstA2B3e8PZr_-Gp4/edit#heading=h.1v0pvnoifuah" rel="nofollow noreferrer" target="_blank">Speeding up Node.js startup using V8 snapshot</a>（Google Doc 需科学上网）</p>
<hr>
<p>Node.js 核心的大多数代码都是使用 JavaScript 实现的。当应用启动时，Node.js 首先创建 V8::Isolate，其次是 V8::Context，接着才是 node::Environment。然后准备创建 process 对象，以及其它对象，然后运行 bootstrap_node.js 设置运行环境。只有执行完上述所有的任务后，Node.js 才开始运行用户脚本。</p>
<p>所有这一切都会造成启动性能的损失。有一个不严谨的比较：执行 d8 -e "" 代码，D8（V8 的开发版 shell）需要大约 50 毫秒， 而高端工作站的 Node.js，执行 node -e "" 却需要 400 毫秒。</p>
<p>V8 的启动快照（startup snapshot）是可以提升创建 V8 isolate 和 V8 contexts 的效率。它由两个部分组成：isolate 快照和 context 快照。</p>
<p>而 V8 启动快照 也不是什么新鲜玩意，早在 2015 年就已经被 V8 采用。相关博文：<a href="https://v8project.blogspot.de/2015/09/custom-startup-snapshots.html" rel="nofollow noreferrer" target="_blank">Custom startup snapshots</a>（需科学上网）。</p>
<p>简而言之，使用快照就不需要再从头开始建立 isolate，V8 可以简单地把之前序列化的 isolate 对象图进行反序列化就可以了。这同样适用于 context 快照。这样一来，V8 能够显著加快启动。</p>
<p>Node.js 也得益于创建一个新的 isolate 和新的 context。然而，启动过程中的后续步骤并不是快照的一部分，因此导致明显的开销。如果我们能创建 Node.js 已全面启动的快照，但此时还没有开始执行任何用户脚本，那么我们就可以减少启动时间。简单做一下评估，大概可以高达 8 倍。</p>
<hr>
<p>hashseed 在 <a href="https://docs.google.com/document/d/1YEIBdH7ocJfm6PWISKw03szNAgnstA2B3e8PZr_-Gp4/edit" rel="nofollow noreferrer" target="_blank">《Speeding up Node.js startup using V8 snapshot》</a>简单描述了大概的实施细节，包括启动和执行相分离、原生绑定、创建快照的时机、等等…… hashseed 表示这是一个 side project，他将花费很长时间才能取得进展。</p>
<p>今年 4 月份，GitHub 已经使用了 V8 startup snapshot 技术来提升 Atom 的启动速度，<a href="http://blog.atom.io/2017/04/18/improving-startup-time.html" rel="nofollow noreferrer" target="_blank">Improving Startup Time</a></p>
<p><span class="img-wrap"><img data-src="/img/bVYIZS?w=720&amp;h=492" src="https://static.alili.tech/img/bVYIZS?w=720&amp;h=492" alt="Bootstrap Node" title="Bootstrap Node" style="cursor: pointer;"></span></p>
<p>V8 还可以更快，Node.js 还可以更快，JavaScript 还可以更快，…… 拭目以待吧</p>
<hr>
<p>欢迎关注我的公众号，回复 <code>V8</code> 可查看我的 V8 专题：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000004841853" src="https://static.alili.tech/img/remote/1460000004841853" alt="justjavac微信公众号" title="justjavac微信公众号" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Node.js 新计划：使用 V8 snapshot 将启动速度提升 8 倍

## 原文链接
[https://segmentfault.com/a/1190000012051041](https://segmentfault.com/a/1190000012051041)

