---
title: '为什么说 Python 和 Pygame 最适合编程初学者' 
date: 2019-01-20 2:30:11
hidden: true
slug: chhqn9fu5l9
categories: [reprint]
---

{{< raw >}}

            <h1><a href="#为什么说-python-和-pygame-最适合编程初学者"></a>为什么说 Python 和 Pygame 最适合编程初学者</h1>
<blockquote>
<p>我们有三个理由来说明 Pygame 对初学编程者是最好的选择。</p>
</blockquote>
<p><a href="https://camo.githubusercontent.com/666fe8767e22990f92e48c108bd7dbdc3e365fde/68747470733a2f2f6f70656e736f757263652e636f6d2f73697465732f64656661756c742f66696c65732f7374796c65732f696d6167652d66756c6c2d73697a652f7075626c69632f6c6561642d696d616765732f636f64655f646576656c6f706d656e745f70726f6772616d6d696e672e706e673f69746f6b3d4d5f514463677a35"><img src="https://p0.ssl.qhimg.com/t01646ecf90b5378ebd.png" alt="What's the best game platform for beginning programmers?" title="What's the best game platform for beginning programmers?"></a></p>
<p>图片来源: <a href="https://opensource.com">opensource.com</a></p>
<p>上个月，<a href="https://opensource.com/users/scottnesbitt">Scott Nesbitt</a> 发表了一篇标题为 <a href="https://opensource.com/article/17/10/news-october-14">Mozilla 支出 50 万美元来支持开源项目</a>的文章。其中一个基于 HTML/JavaScript 的游戏平台项目 Phaser 获得了 50,000 美元的奖励。整整一年里，我都在使用 Phaser 平台来教我的小女儿，用来学习的话，它是最简单也是最好的 HTML 游戏开发平台。然而，对于初学者来说，使用 <a href="https://www.pygame.org/news">Pygame</a> 也许效果更好。原因如下：</p>
<h3><a href="#1-小段代码块"></a>1、 小段代码块</h3>
<p>Pygame，基于<a href="https://cacm.acm.org/blogs/blog-cacm/176450-python-is-now-the-most-popular-introductory-teaching-language-at-top-u-s-universities/fulltext">计算机课程中最流行的语言</a> Python。Python 非常适合用一小段代码来实现我们的想法，孩子们可以从单个文件和单个代码块起开始学习，在掌握函数（function）或类（class）对象之前，就可以写出意大利面条似的代码。 很像手指画，所想即所得。</p>
<p>以这样的方式来学习，当编写的代码越来越难于管理的时候，孩子们很自然的就会把代码分解成函数模块和类模块。在学习函数之前就学习了 Python 语言的语法，学生将掌握基本的编程知识，对了解全局作用域和局部作用域起到更好的作用。</p>
<p>大多数 HTML 游戏在一定程度上会将结构、样式和编程逻辑分为 HTML、CSS 和 JavaScript，并且需要 CSS 和 HTML 的知识。从长远来看，虽然拆分更好，但对初学者来说是个障碍。一旦孩子们发现他们可以用 HTML 和 CSS 快速构建网页，很有可能就会被颜色、字体和图形的视觉刺激分散注意力。即使仅仅只专注于 JavaScript 代码，也需要学习基本的文档结构模型（DOM），以使 JavaScript 代码能够嵌入进去。</p>
<h3><a href="#2-全局变量更清晰"></a>2、 全局变量更清晰</h3>
<p>Python 和 JavaScript 都使用动态类型变量，这意味着变量只有在赋值才能确定其类型是一个字符串、一个整数还是一个浮点数，然而在 JavaScript 更容易出错。类似于类型变量，JavaScript 和 Python 都有全局变量和局部变量之分。Python 中，如果在函数块内要使用全局变量，就会以 <code>global</code> 关键字区分出来。</p>
<p>要理解在 Phaser 上教授编程初学者所面临的挑战的话，让我们以基本的<a href="http://phaser.io/tutorials/making-your-first-phaser-game">制作您的第一个 Phaser 游戏教程</a>为例子，它是由 Alvin Ourrad 和 Richard Davey 开发制作的。在 JavaScript 中，程序中任何地方都可以访问的全局变量很难追踪调试，常常引起 Bug 且很难解决。因为 Richard 和 Alvin 是专业程序员，所以在这儿特意使用全局变量以使程序简洁。</p>
<pre><code class="hljs lua">var game = new Phaser.Game(<span class="hljs-number">800</span>, <span class="hljs-number">600</span>, Phaser.AUTO, <span class="hljs-string">''</span>, { <span class="hljs-built_in">preload</span>: <span class="hljs-built_in">preload</span>, <span class="hljs-built_in">create</span>: <span class="hljs-built_in">create</span>, update: update });

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">preload</span><span class="hljs-params">()</span></span> {

    game.<span class="hljs-built_in">load</span>.image(<span class="hljs-string">'sky'</span>, <span class="hljs-string">'assets/sky.png'</span>);

}

var player;
var platforms;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">create</span><span class="hljs-params">()</span></span> {
    game.physics.startSystem(Phaser.Physics.ARCADE);
...

</code></pre><p>在他们的 Phaser 编程手册 <a href="https://phaser.io/interphase">《Interphase》</a> 中，Richard Davey 和 Ilija Melentijevic 解释说：在很多 Phaser 项目中通常都会使用全局变量，原因是使用它们完成任务更容易、更快捷。</p>
<blockquote>
<p>“如果您开发过游戏，只要代码量到一定规模，那么（使用全局变量）这种做法会使您陷入困境的，可是我们为什么还要这样做？原因很简单，仅仅只是要使我们的 Phaser 项目容易完成，更简单而已。”</p>
</blockquote>
<p>针对一个 Phaser 应用程序，虽然可以使用局部变量和拆分代码块来达到关注点隔离这些手段来重构代码，但要使第一次学习编程的小孩能理解，显然很有难度的。</p>
<p>如果您想教你的孩子学习 JavaScript，或者如果他们已经知道怎样使用像 Python 来编程的话，有个好的 Phaser 课程推荐： [完整的手机游戏开发课程] <a href="https://academy.zenva.com/product/the-complete-mobile-game-development-course-platinum-edition/">17</a>，是由 [Pablo Farias Navarro] <a href="https://gamedevacademy.org/author/fariazz/">18</a> 开发制作的。虽然标题看着是移动游戏，但实际是关于 JavaScript 和 Phaser 的。JavaScript 和 Phaser 移动应用开发已经转移到 <a href="https://phonegap.com/">PhoneGap</a> 话题去了。</p>
<h3><a href="#3-pygame-无依赖要求"></a>3、 Pygame 无依赖要求</h3>
<p>由于 <a href="https://pythonwheels.com/">Python Wheels</a> 的出现，Pygame 超级<a href="https://pypi.python.org/pypi/Pygame">容易安装</a>。在 Fedora/Red Hat 系统下也可使用 <code>yum</code> 包管理器来安装：</p>
<pre><code class="hljs cmake">sudo yum <span class="hljs-keyword">install</span> python3-pygame

</code></pre><p>更多信息请参考官网 <a href="http://www.pygame.org/wiki/GettingStarted#Pygame%20Installation">Pygame 安装说明文档</a>。</p>
<p>相比来说，虽然 Phaser 本身更容易安装，但需要掌握更多的知识。前面提到的，学生需要在 HTML 文档中组装他们的 JavaScript 代码，同时还需要些 CSS。除了这三种语言（HTML、CSS、JavaScript），还需要使用火狐或谷歌开发工具和编辑器。JavaScript 最常用的编辑器有 Sublime、Atom、VS Code（按使用多少排序）等。</p>
<p>由于<a href="https://blog.chromium.org/2008/12/security-in-depth-local-web-pages.html">浏览器同源策略</a>的原因，如果您直接在浏览器中打开 HTML 文件的话，Phaser 应用是不会运行的。您必须运行 Web 服务，并通过服务访问这些文件。还好，对于大多数工程项目，可以不用在本地运行 Apache 服务，只需要运行一些轻量级的服务就可以，比如 <a href="https://simbco.github.io/httpster/">httpster</a>。</p>
<h3><a href="#phaser-和-javascript-的优势"></a>Phaser 和 JavaScript 的优势</h3>
<p>JavaScript 和 Phaser 有着种种的不好，为什么我还继续教授他们？老实说，我考虑了很长一段时间，我在担心着学生学习变量申明提升variable hoisting和变量作用域的揪心。我开发出基于 Pygame 和 Python 的课程，随后也开发出一涛基于 Phaser 的。最终，我决定使用 Pablo 预先制定的课程作为起点。</p>
<p>我转用 JavaScript 有两个原因。首先，JavaScript 已经成为正式应用的正式语言。除了 Web 应用外，也可使用于移动和服务应用方面。JavaScript 无处不在，其广泛应用于孩子们每天都能看到的应用中。如果他们的朋友使用 Javascript 来编程，他们很可能也会受影响而使用之。正如我看到了 JavaScript 背后的动力，所以深入研究了可编译成 JavaScript 的替代语言，主要是 Dart 和 TypeScript 两种。虽然我不介意额外的转换步骤，但还是最喜欢 JavaScript。</p>
<p>最后，我选择使用 Phaser 和 JavaScript 的组合，是因为我意识到上面那些问题在 JavaScript 可以被解决，仅仅只是一些工作量而已。高质量的调试工具和一些大牛们的工作使得 JavaScript 成为教育孩子编码的可用和有用的语言。</p>
<h3><a href="#最后话题-python-对垒-javascript"></a>最后话题: Python 对垒 JavaScript</h3>
<p>当家长问我使用的什么语言作为孩子的入门语言时，我会立即推荐 Python 和 Pygame。因为有成千上万的课程可选，而且大多数都是免费的。我为我的儿子选择了 Al Sweigart 的 <a href="https://inventwithpython.com/makinggames.pdf">使用 Python 和 Pygame 开发游戏</a> 课程，同时也在使用 Allen B. Downey 的 <a href="http://greenteapress.com/thinkpython/html/index.html">Python 编程思想：如何像计算机科学家一样思考</a>。在 Android 手机上可以使用 <a href="https://github.com/renpytom">Tom Rothame</a> 的 <a href="https://github.com/renpytom/rapt-pygame-example">PAPT Pyame</a> 来安装 Pygame 游戏。</p>
<p>尽管有我的建议, 我总是怀疑孩子们很快就会搬到 JavaScript。这没关系 —— JavaScript 是一门成熟的编程语言，有很多很多辅助工具。但有多年的帮助大儿子使用 Python 创建炫酷游戏经历的我，依然钟情于 Python 和 Pygame。</p>
<h3><a href="#关于作者"></a>关于作者</h3>
<p>Craig Oda —— 东京 Linux 用户组的首位总裁和共同创始人，奥莱理日本出版的《Linux 日文环境》的共同作者。在亚洲建立了第一个 ISP 的核心团队成员之一。一个大型 Linux 公司的产品管理及市场的前任副总裁。硅谷开发者关系咨询公司 Oppkey 的合作方。<a href="https://opensource.com/users/codetricity">更多</a></p>
<hr>
<p>via: <a href="https://opensource.com/article/17/11/pygame">https://opensource.com/article/17/11/pygame</a></p>
<p>作者：<a href="https://opensource.com/users/codetricity">Craig Oda</a> 译者：<a href="https://github.com/runningwater">runningwater</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
为什么说 Python 和 Pygame 最适合编程初学者

## 原文链接
[https://www.zcfy.cc/article/why-python-and-pygame-are-a-great-pair-for-beginning-programmers](https://www.zcfy.cc/article/why-python-and-pygame-are-a-great-pair-for-beginning-programmers)

