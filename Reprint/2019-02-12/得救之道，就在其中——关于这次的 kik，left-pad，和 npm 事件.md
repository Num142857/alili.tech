---
title: '得救之道，就在其中——关于这次的 kik，left-pad，和 npm 事件' 
date: 2019-02-12 2:30:12
hidden: true
slug: f1wcmblw7ch
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前情提要</h2>
<p>今天 npm 圈子鸡犬不宁，原因是一个不过 <a href="https://github.com/azer/left-pad/blob/master/index.js" rel="nofollow noreferrer" target="_blank">11 行</a>的工具函数 left-pad 被作者从 npm 上撤下，所有直接和间接依赖它的包就这么齐刷刷挂了，包括 babel 和 react-native 这样每天安装数万的热门项目。</p>
<p>而 Azer 删除他所有的 npm 包又是另一个故事：Azer 写了一个工具叫 kik 发布在 npm 上，这天有个同名的公司律师找上门要求他删掉，Azer 不从，这律师就找上 npm，npm 把包的管理权限转给了这家公司——当然，Azer 就怒了，从 npm 上<a href="https://medium.com/@azerbike/i-ve-just-liberated-my-modules-9045c06be67c" rel="nofollow noreferrer" target="_blank">解放</a>了所有自己发布的包。</p>
<p>是的，就是这样 <code>╮(╯_╰)╭</code></p>
<h2 id="articleHeader1">small module 的错？</h2>
<p>babel 很快就发布了修正。然而抛开这两个故事不去讨论，鉴于现在各种组件的依赖树之深，这件事暴露出的问题（一直都在，只是没有这么痛地领悟过）已经让人无法安心地 <code>npm install</code> 了——更多的项目都不可能像 babel 这样活跃，第一时间发布修正。</p>
<p>各种担忧、质疑指向 npm 社区一直提倡和推动的 small module 和 semver 理念。这个方向错了么？也有人怪罪 <code>npm unpublish</code> 是万恶之源，这么想就有点表面了。</p>
<h2 id="articleHeader2">得救之道，就在其中</h2>
<p>Isaacs 在 left-pad 的 Issue 里<a href="https://github.com/azer/left-pad/issues/4#issuecomment-200060983" rel="nofollow noreferrer" target="_blank">回复</a>说“不要依赖于其他人”，附了<a href="https://docs.npmjs.com/files/package.json#bundleddependencies" rel="nofollow noreferrer" target="_blank">关于 bundledDependencies 的链接</a>，并且最后再次强调 small module 依然是合理的哲学。</p>
<p>这篇回复其实比较含糊，甚至看上去有点矛盾。Rollup 作者<a href="https://medium.com/@Rich_Harris/how-to-not-break-the-internet-with-this-one-weird-trick-e3e2d57fee28" rel="nofollow noreferrer" target="_blank">讲得更明白些</a>，解决之道就一句话：</p>
<blockquote><p>无论你是否面向浏览器，<strong>将所有依赖都打包进最终的发布代码。</strong></p></blockquote>
<p>这么做将使你的项目仅仅在打包的时候依赖那些 dependencies，一旦发布完成，就不再需要依赖树上的所有作者们保持他们的任何承诺。这就是 Isaacs 所说：不要依赖于其他 <strong>人</strong>。</p>
<p>事实上 Atom 也在受影响之列，但除了 Atom 的开发者之外，用户是没有感觉的——就这么简单。</p>
<p>此原则除了可以解决这次的 left-pad 灾难之外，还有成堆的好处，哪怕每一项都不是杀手级的，这么堆起来也还是很可观的：</p>
<ul>
<li><p><strong>节省</strong> <code>npm install</code> <strong>的时间。</strong>依次去下载整个依赖树是很耗时间的，而且还附带下载了更多的 README、package.json 之类。这些磁盘空间也可以省下来了。</p></li>
<li><p><strong>启动更快。</strong>你知道 Nodejs 的 <code>require()</code> 执行<a href="https://kev.inburke.com/kevin/node-require-is-dog-slow/" rel="nofollow noreferrer" target="_blank">慢成狗</a>么？</p></li>
<li><p><strong>你的包更加可靠。</strong>依赖树中的 bug 不能靠用户自行 <code>npm update</code> 来修复了，你得自己重新打包发版本，但是再也不用担心出 left-pad 这种幺蛾子，哪个更重要？</p></li>
<li><p><strong>也更加安全。</strong>理论上，npm 托管的那些代码随时可能被注入恶意代码，比如现在 Azer 撤下来的包，不少已经被其他人重新发布上去，可是天知道都是谁放了些什么代码……用户只不过 <code>npm install</code> 了一下。</p></li>
<li><p><strong>解除了用户为你的代码打包的负担。</strong> 负担其实并不是我们担心的，只是如果用户喜欢用 webpack 打包而我们的代码是 browserify 圈的呢？PouchDB 就<a href="https://pouchdb.com/2016/01/13/pouchdb-5.2.0-a-better-build-system-with-rollup.html" rel="nofollow noreferrer" target="_blank">碰上了这种情况</a>。</p></li>
</ul>
<h2 id="articleHeader3">新的习惯</h2>
<p>养成新的习惯，开始为你发布的代码做预打包吧。<a href="https://docs.npmjs.com/files/package.json#bundleddependencies" rel="nofollow noreferrer" target="_blank">bundledDependencies</a> 已经等候多时了。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
得救之道，就在其中——关于这次的 kik，left-pad，和 npm 事件

## 原文链接
[https://segmentfault.com/a/1190000004672227](https://segmentfault.com/a/1190000004672227)

