---
title: '7 天 600 stars， Mobi.css 是如何诞生的' 
date: 2019-02-04 2:30:58
hidden: true
slug: j9sk2dzxy4
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>受邀写一篇 Mobi.css 的诞生历程，请原谅我吸引眼球的标题，我会努力把这篇文章写得有一些干货的。</p></blockquote>
<p><a href="http://github.com/xcatliu/mobi.css" rel="nofollow noreferrer" target="_blank">GitHub Repo</a> | <a href="http://getmobicss.com" rel="nofollow noreferrer" target="_blank">Homepage</a></p>
<p>提要：</p>
<blockquote>
<p>Mobi.css 是一个轻量、灵活的移动端 CSS 框架。发布一周以来，获得了 600+ stars，登上了 GitHub Trending Top1（CSS），在 Hacker News 上进入了前三。</p>
<p>这篇文章会先介绍一下创造 Mobi.css 的思路，再介绍一下我在推广 Mobi.css 中的心得。</p>
</blockquote>
<h2 id="articleHeader0">为什么要创造 Mobi.css</h2>
<p>当我在设计一个新的 Focus on 移动端用户的网站（比如面向微信用户的网站）的时候，调研了一些现有的 CSS 框架，应用比较广泛的有 Bootstrap, Foundation, Pure.css, Framework7, Skeleton 等。</p>
<p>他们都很优秀，但是都有一些缺点。</p>
<ul>
<li><p>Bootstrap: 太大太笨重了，对于桌面端用户我希望展示与手机端一样的页面，可能再加上一个二维码，将用户导向微信（类似于微信公众号的文章在网页中的样式）</p></li>
<li><p>Foundation: 没有实践过，看上去也很大，大部分都是我不需要的功能</p></li>
<li><p>Skeleton: 在移动端有一些 bug，<code>overflow:auto;</code> 的滑动不平滑，<code>&lt;select&gt;</code> 样式太丑，官网的 <code>&lt;pre&gt;&lt;code&gt;</code> 在 iPhone 里根本不 work，说明他们没有在手机上测试过</p></li>
<li><p>Framework7: 适合做 WebApp，而我不太喜欢那种仿原生 App 的设计</p></li>
<li><p>Pure.css: 很优秀，足够小巧，没什么特别的缺点，如果定制一下应该也可以满足需求。不过我还希望框架层面能够有一些针对移动端的设计</p></li>
</ul>
<p>于是我决定自己造一个轮子。</p>
<p>造新轮子之前一定要做好调研，否则可能白费了功夫。</p>
<h2 id="articleHeader1">开发过程中的心得</h2>
<h3 id="articleHeader2">善用工具</h3>
<p>CSS 框架相比于 JavaScript, React 等简单得多，但是也不能忽视了工具的使用。我选择了以下工具：</p>
<ul>
<li><p>Sass (scss)/Autoprefixer: CSS 预处理器都大同小异，Sass 功能比较全，所以选择了它。移动端也需要兼容不同设备，Autoprefixer 可以自动加上 <code>-webkit-</code> 等前缀</p></li>
<li><p>Ejs/Marked/Highlight.js: 构建 website 的工具，一开始是手写 HTML，发现根本 hold 不住。这些工具后期可以用静态网站生成器替换</p></li>
<li><p>Gulp: 构建工具，串起其他工具</p></li>
<li><p>Travis CI/GitHub Pages/Coding Pages: 静态页面服务，一开始手动部署网站，后来发现太麻烦了，就用 Travis 自动部署了</p></li>
</ul>
<p>磨刀不误砍柴工，善用工具可以大大提高开发效率。</p>
<h3 id="articleHeader3">站在巨人的肩膀上</h3>
<p>开源社区上的代码都是别人的积累，如果离开了它们，Mobi.css 很难在短时间内完成开发，我借鉴了以下开源项目：</p>
<ul>
<li><p>Normalize.css: 大部分 <code>_reset.scss</code> 部分是借鉴它的。没有直接引入它的原因是有少部分它的代码是不需要的</p></li>
<li><p>Bootstrap v4: 使用最广泛的 CSS 框架，可借鉴的太多了</p></li>
<li><p>Pure.css/Skeleton: 借鉴了手机上的样式</p></li>
<li><p>微信公众号的 desktop 版: 借鉴了在 desktop 上的样式，以及中文字体</p></li>
<li><p>以及很多其他框架</p></li>
</ul>
<h3 id="articleHeader4">重视写文档</h3>
<p>开源项目要受欢迎，文档是非常重要的。<code>README.md</code> 要让大家能在短时间内了解项目的特点。网站要能够尽可能输出自己的理念。</p>
<p>如果可以的话，最好用英文（或者双语）写。否则只能有中国人来关注你的项目了。要知道，外国开发者比中国开发者多很多倍的。</p>
<p>不要担心自己英语不好，只要表达的内容能让外国人看得懂即可。等项目成熟了，自然会有人帮你修改文档。</p>
<h3 id="articleHeader5">注意社区的一些规则</h3>
<ul>
<li><p>标明 License</p></li>
<li><p>遵守版本号规则，不要乱做 Breaking changes</p></li>
</ul>
<h2 id="articleHeader6">如何推广</h2>
<p>不要觉得不好意思推广，我们推广不是功利性的求赞求关注（逃。</p>
<p>而是因为没有人关注的项目，是不可能向好的方向发展的。而如果自己不做主动的推广，项目也很难被关注。</p>
<p>推广这部分其实我并不是很擅长，这里只写出一些我自己的心得吧。</p>
<h3 id="articleHeader7">在对的时间发对的帖</h3>
<p>一般在下班的时间，大家都会拿出手机刷一刷。这时你的贴最容易被曝光。等到人气上去了，晚上睡觉之前大家再刷一波手机，就有更多人看到了。</p>
<p>发帖的时候只需要简要的说重点，引导用户到 GitHub 或你的网站。但是慎用「求 star」等字眼，功利性太强。</p>
<h3 id="articleHeader8">推广渠道</h3>
<p>我用了以下推广渠道（按推广效果排序）：</p>
<ul>
<li><p>Hacker News</p></li>
<li><p>V2EX</p></li>
<li><p>开发者头条</p></li>
<li><p>SegmentFault</p></li>
<li><p>Hacpai</p></li>
<li><p>Startup News</p></li>
<li><p>光谷社区</p></li>
<li><p>Reddit</p></li>
</ul>
<h3 id="articleHeader9">聆听意见，及时反馈</h3>
<p>自己的想法总归是一个人的，吸取了别人的建议才能让项目更好的发展。Mobi.css 就有一部分 API 是听取了别人的建议之后修改的。</p>
<p>当然，自己需要有自己的判断。Mobi.css 的准则很简单：这个设计是不是 focus on mobile 的。</p>
<h3 id="articleHeader10">最重要的是，项目要有价值</h3>
<p>没有价值的项目即使推广再多，也没有人会关注的，只会招来一顿猛喷。</p>
<h2 id="articleHeader11">总结</h2>
<p>Mobi.css 在短时间内获得了很多关注，离不开大家的支持，离不开开源社区的帮助。</p>
<p>我知道这只是 Mobi.css 项目的开始，后面有更长的路要走，感兴趣的可以一起来建设。</p>
<p><a href="http://github.com/xcatliu/mobi.css" rel="nofollow noreferrer" target="_blank">GitHub Repo</a> | <a href="http://getmobicss.com" rel="nofollow noreferrer" target="_blank">Homepage</a></p>
<p><a href="https://news.ycombinator.com/item?id=12421804" rel="nofollow noreferrer" target="_blank">Hacker News 上的讨论</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
7 天 600 stars， Mobi.css 是如何诞生的

## 原文链接
[https://segmentfault.com/a/1190000006823504](https://segmentfault.com/a/1190000006823504)

