---
title: 'Flexbox和网格, 你的布局好助手' 
date: 2019-01-25 2:30:23
hidden: true
slug: t288gh3ax
categories: [reprint]
---

{{< raw >}}

            <p>让所有的浏览器都支持CSS网格布局大概花了六年多的时间。从CSS网格出现开始，其自身规范就充满了争议。在2011年，它依然遭遇了很多质疑，与此同时，微软的开发团队<a href="https://blogs.msdn.microsoft.com/ie/2011/04/14/ie10-platform-preview-and-css-features-for-adaptive-layouts/">宣布IE10支持带前缀的网格布局</a>。但由于缺少与W3C提案相关的信息，有一些开发者还是在怀疑是否有必要使用新的布局系统，因为彼时已经有了float，table和一些浏览器使用hack方法支持的Flexbox模型。 </p>
<p>不过，多亏了很多开发者和CSS工作组的一些成员(比如<a href="https://twitter.com/rachelandrew">Rachel Andrew</a> 和<a href="https://twitter.com/jensimmons">Jen Simmons</a>)的工作，随着网格布局的宣传逐渐增加，有很多实现也在一夜间浮现。</p>
<p>2017年3月，主流浏览器基本都支持网格布局了，但关于网格规范，仍然还有一些小小的谜团和流言尚未解决。<strong>本文的目的就是解决这些小问题，让大家享受网站开发的乐趣，也把我们在Aerolab新开发的布局技术（我们称作Frids布局）介绍给大家。</strong> </p>
<p>有句话说“网格时代到来了，Flexbox结束了”，或者是”网格已经上线，我们应该把Flexbox当作网格布局的降级版”，这样的观点很可能是有问题的。我希望大家能避免这种思维方式。</p>
<p>所以先让我们一起<strong>看看这些谜团，以便深入理解这两种同时使用的技术，而不是把它们独立区分开来进行比较</strong>。 我们也会看一个现在已经在生产环境里的真实用例，<strong>在本文最后，你会看到一个HTML和CSS的样板，这样你也可以开始使用Flexbox和网格了</strong>。 </p>
<h3>打破神话</h3>
<p>关于”网格 vs. Flexbox“的一系列流言，从2010年就开始萌发了，这其中只有我前面提到的两个才是真正值得辟谣的。 </p>
<ul>
<li><strong>Grids arrived to kill Flexbox.</strong><br>网格的到来结束了Flexbox的时代。 
”<em>不，今晚只有一个人会死，那就是你，<del>虫尾巴</del>表格布局！</em>“  人们历来倾向于把技术（或者人...）相互对立起来；尽管对比和竞争通常来说是对产业有利的，但这并不适用于我们讨论的这个情况。</li>
</ul>
<p>网格和Flexbox差不多是在同时开发出来的，但是它们解决问题的思路是不同的，后面我们会深入分析这一点。如果读完本篇你还是有一些疑惑，那你就记住网格（<a href="https://www.w3.org/TR/css-grid-1/#subtitle">1</a>）和Flexbox（<a href="https://www.w3.org/TR/css-flexbox-1/#subtitle">2</a>）在W3C起早时，是一样的编者起草的。<strong>它们是协同工作的，而不是用来相互竞争的。</strong> </p>
<ul>
<li><strong>Flexbox是网格的回退版。</strong><br><em>如果你看到了金色飞贼，就不要去管鬼飞球了。</em> 
我们看下前面提到的一点：Flexbox的目标和网格的是不一样的。因此，我们不应该降前者视为后者的降级版，再说了，IE浏览器对它的支持和对网格布局的支持一样差...</li>
</ul>
<h3>使用Frids布局</h3>
<p> 让我们看一下这两者不同的用例，以及它们是怎样相互补充的。 </p>
<ul>
<li><p><strong>一维布局</strong><br>如果你需要对你的内容进行一维布局，不管是水平的x轴还是垂直的y轴，而且你需要布局根据元素内容自适应，那么Flexbox就是你要找的工具。对于组件而言,它（但并不局限于此）就是合适的布局方案。 </p>
</li>
<li><p><strong>二维布局</strong><br>如果你需要根据x轴和y轴来展示你的内容，这就意味着，你需要的是，网格！这个属性是用于处理复杂、非线性组件的页面布局的理想工具。 </p>
</li>
</ul>
<p>当然，规则总有例外，但<strong>对于大多数复杂的视角布局使用网格，对一行（当然如果需要多列的话，就用flex-wrap属性）内容使用Flexbox，你的工作就会顺手的多</strong>。 </p>
<p>在2017年，开发者对Flexbox比对网格更熟悉，所以如果你还没有在生产环境中见过网格布局，我强烈推荐你看一下<a href="https://2017.fullstackfest.com/">Full Stack Fest Barcelona</a>这个网站。他们在<a href="https://2017.fullstackfest.com/speakers/">speakers section</a>的页面上用的网格布局非常棒。 
<img src="https://aerolab.co/blog/wp-content/uploads/2017/10/01_full-stack-fest.png" alt="Img"></p>
<p>尽管目标不同，它们仍共享很多属性，毕竟它们是两种不同的布局工具。它们公有的属性是<a href="https://www.w3.org/TR/css-align-3/">CSS Box Alignment Specification</a>的一部分，全世界的开发者都为此呼吁了很长一部分时间。你还记得垂直居中那地域般考验么？现在的开发者真是赶上好时代了。</p>
<h3>盒模型对齐规范</h3>
<p>新规范包含了内容分布以及自动对齐的功能，并且可以应用到任何网格或者Flexbox中的块元素上</p>
<h4><strong>在Flex容器内对齐元素.</strong></h4>
<p>  <img src="https://aerolab.co/blog/wp-content/uploads/2017/10/02_align-flex.gif" alt="flexbox-align-css"> </p>
<h4><strong>在Flex容器内排列元素.</strong></h4>
<p>  <img src="https://aerolab.co/blog/wp-content/uploads/2017/10/03_distribute-flex.gif" alt="flex-distribute-container-css"> </p>
<h4><strong>在网格容器内对齐元素 .</strong></h4>
<p>  <img src="https://aerolab.co/blog/wp-content/uploads/2017/10/04_align-grids.gif" alt="grid-container-align-css"> </p>
<p>我们先停下仔细看一下前面的例子。
首先，我们使用repeat()创建了一个三列的网格，每一个列是1fr宽；然后，我们使用align-items和justify-items 在X轴和Y轴对齐每个单元格，然后使用align-self和justify-self是元素伸展到合适的高度。</p>
<p>如果你也比较熟悉Flexbox，你会发现这些属性都是flexbox布局公有的属性。主要的差别其实就是我们没有用“flex-start”或者“flex-end”,而是与之对应用了start和end。</p>
<h4><strong>在网格容器中排列元素.</strong></h4>
<p><img src="https://aerolab.co/blog/wp-content/uploads/2017/10/05_distribute-grids.gif" alt="grid-distribute-container-css"> </p>
<p>Flexbox和网格很快要共享的一些属性里，有这样一个系列：<strong>grid-gap</strong>。这个功能是很多开发者一直想要的，它能帮我们轻松指定flex元素的间距。 grid-row-gap和grid-column-gap分别重命名成row-gap 和column-gap了。不过别担心！你现在的代码还是可以正常工作 ❤️ 。 
<img src="https://aerolab.co/blog/wp-content/uploads/2017/10/06_gap.png" alt="flexbox-grids-gap"> </p>
<h4><strong>同时使用Flexbox和网格</strong></h4>
<p>创建网格之后，你就需要往每个网格单元增加内容了。无论增加图片、文字或两者都有，把它们放在合适位置的最好的办法就是使用Flexbox。
 <img src="https://aerolab.co/blog/wp-content/uploads/2017/10/07_grid-and-flexbox.gif" alt="flexbox-grids-together"> </p>
<h3>拥抱自适应性</h3>
<p><strong>与浮动或其他传统布局系统不同的是，Flexbox和网格是在多设备时代出现的</strong>。因此，它们建立在这些其他方法所缺乏的流动性和自适应性上。你会发现，有很多方法可以使这两种布局方式适应用户的屏幕。</p>
<h4><strong>流动Flexbox布局</strong></h4>
<p>Flexbox默认就是自适应的。一旦你对一个元素使用看   <code>display: flex</code>   ，你就已经有一个流式布局了，不过这也取决于你有多少内容，需要给元素加上一个最小宽度。如此以来，你就可以方便的利用flex-basis和flex-wrap这两个属性了。
<img src="https://aerolab.co/blog/wp-content/uploads/2017/10/08_wrap.gif" alt="flexbox-grids-wrap-css"> </p>
<h4><strong>流式网格布局</strong></h4>
<p>要确保你的网格布局总是自适应的以及它的元素都有一个最小宽度，我们可以使用minmax函数和新的fr单位。设计的这个单位就是为了帮助我们方便创建灵活的网格。1fr就等于网格系统里可用的一个单位空间。它会把单元之间的距离包含在网格内，因此它基本帮我们计算出每个元素自身合理的宽度。
<img src="https://aerolab.co/blog/wp-content/uploads/2017/10/09_grid.gif" alt="grids-full layout"> </p>
<p>如果你希望在小型的设备上改变布局，你依然可以使用media queries。</p>
<h3>准备部署</h3>
<p>由于在所有的主流浏览器上有了很好的支持，因此网格和Flexbox都已经适用于生产环境。微软的Edge 15还只支持旧语法的网格布局，Edge 16已经在10月17号<a href="https://blogs.windows.com/msedgedev/2017/10/17/edgehtml-16-fall-creators-update/">Windows 10 秋季创意者更新</a> 发布的新版中解决了这个问题。</p>
<p>如果你希望所有浏览器（为你点赞！）都支持，那么强烈建议你用feature queries，在不支持网格的浏览器上使用旧的布局系统。</p>
<pre><code class="hljs mel">  .<span class="hljs-keyword">grid</span>-<span class="hljs-keyword">parent</span>{ 
        / _Fallback layout_ /
  } 

  @supports (display: <span class="hljs-keyword">grid</span>) { 
    .<span class="hljs-keyword">grid</span>-<span class="hljs-keyword">parent</span>{ 
        / _Use grids_ / 
    }
  } 
</code></pre><p>最后提一下，记得看一下已经报出的bug，<a href="https://github.com/rachelandrew/gridbugs">这里是网格的</a>，<a href="https://github.com/philipwalton/flexbugs">这是Flexbox的</a>。</p>
<h3>MagicCube的经验</h3>
<p>MagicCube联系我们<a href="https://aerolab.co/">Aerolab</a>，要帮他们设计新形象，并开发新网站。</p>
<p>新版的UX和UI的提议确定后，我们就能看到一个亟待使用CSS网格系统实现的好产品。因为它已经有一个复杂的布局，我们决定使用这些新技术和feature queries来实现，在不支持的浏览器上使用旧的布局，在新的浏览器上使用Flexbox组织元素。网格使我们更快更好的定制页面内容，给我们提供了足够的灵活性来应对各种不同多变的需求。
<img src="https://aerolab.co/blog/wp-content/uploads/2017/10/10_magiccube-grids.png" alt="grids-magic cube"> </p>
<p>我们想确保为每个人都提供良好的浏览体验。因此，对于Opera，三星和UC浏览器，我们用了一种优雅的CSS支持的降级技术来显示一个替代方案的简单布局。</p>
<p>最终的结果，就是一个完全自适应符合无障碍浏览的新网站。用户浏览时，支持的浏览器会显示复杂的布局，不支持的会使用降级后的简单布局。CSS网格使我们能够用一种快速、高效的方案来改变不同的设计模式。</p>
<h3>使用网格和Flexbox</h3>
<p>别让麻瓜都能打败你--从今天起就开始使用CSS网格吧。那些关于Flexbox vs. 网格的杞人忧天的言论，不应该成为你的绊脚石。你应该从今天就使用新的方法来建立自己的网站。便利的定制化和足够多的浏览器支持已经足以让你在每天的工作中使用它们了。</p>
<p>如果你还在犹豫从哪开始，那就往下滑，我们提供了一些可以下载的模板供你使用。</p>
<h3>资源</h3>
<p>刚开始学习和使用CSS网格技术起初会比较枯燥。不过下面有很多资源可以帮我们渡过难关：  </p>
<ul>
<li><p><strong>纸</strong><br>我们忠实的老朋友。开始思考网格结构的最好方法就是在纸上画出来。你就能看到那些你即将开始做的列、行和间距。在纸上涂鸦并不会花你很长时间，但它能帮你更好的理解整个网格的布局。</p>
</li>
<li><p><strong>开发者工具</strong><br>Firefox开发者工具有一个很好的内置CSS网格调试工具，它能帮你清晰的看到行、列和网格间距。
<img src="https://aerolab.co/blog/wp-content/uploads/2017/10/11_dev-tools_firefox.gif" alt="firefox-dev tools"> </p>
<p>Chrome released a similar tool, check it out 
Chrome也发布了一个类似的工具，<a href="https://developers.google.com/web/updates/2017/08/devtools-release-notes#css-grid-highlighting">点这里</a>. </p>
</li>
<li><p><strong>阅读、学习，练习！</strong><br>假如你还没有机会尝试CSS网格，那么你可以看看下面这些有趣的链接：</p>
<ul>
<li><a href="http://cssgridgarden.com/">Grid Garden</a>： 你听说过 <a href="http://flexboxfroggy.com/">FlexboxFroggy</a> 吗？嗯，Grid Garden是另一个帮你学习CSS布局的有趣的游戏网站。</li>
<li><a href="https://gridbyexample.com/">Grid By Example</a>: <a href="https://twitter.com/rachelandrew">Rachel Andrew</a> 的一个项目，教你从头开始。这里还有很多有用的CSS设计模式，可能对你的日常工作有帮助。</li>
<li><a href="https://css-tricks.com/snippets/css/complete-guide-grid/">A Complete Guide to Grid</a>： CSS-Trick的文章，适合马克下来。</li>
</ul>
</li>
</ul>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Flexbox和网格, 你的布局好助手

## 原文链接
[https://www.zcfy.cc/article/flexbox-and-grids-your-layout-s-best-friends](https://www.zcfy.cc/article/flexbox-and-grids-your-layout-s-best-friends)

