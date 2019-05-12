---
title: 'webpack坑系列--安装webpack-cli' 
date: 2018-12-10 2:30:07
hidden: true
slug: hppqggbzcr
categories: [reprint]
---

{{< raw >}}

                    
<p>最近在学习webpack过程中，根据官方文档推荐局部安装webpack，执行webpack -h命令出现以下提示</p>
<p><span class="img-wrap"><img data-src="/img/bV5Dtq?w=455&amp;h=77" src="https://static.alili.tech/img/bV5Dtq?w=455&amp;h=77" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>npm install webpack-cli -D提示在开发环境中局部安装webpack-cli<br>成功安装webpack-cli后，运行webpack -h还是提示<br><span class="img-wrap"><img data-src="/img/bV5Dtq?w=455&amp;h=77" src="https://static.alili.tech/img/bV5Dtq?w=455&amp;h=77" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>说明webpack命令还是没有成功执行<br>不知道什么情况在package.json文件中，显示webpack和webpack-cli已经成功引用</p>
<p><span class="img-wrap"><img data-src="/img/bV5Dyk?w=209&amp;h=105" src="https://static.alili.tech/img/bV5Dyk?w=209&amp;h=105" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>在node_modules中也包含了这两个包</p>
<p><span class="img-wrap"><img data-src="/img/bV5DEK?w=217&amp;h=71" src="https://static.alili.tech/img/bV5DEK?w=217&amp;h=71" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>在网上搜索答案中发现</p>
<p><span class="img-wrap"><img data-src="/img/bV5DFD?w=663&amp;h=53" src="https://static.alili.tech/img/bV5DFD?w=663&amp;h=53" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>在webpack 3中，webpack本身和它的CLI以前都是在同一个包中，但在第4版中，他们已经将两者分开来更好地管理它们。<br>尝试全局安装webpack-cli</p>
<p><span class="img-wrap"><img data-src="/img/bV5DHX?w=674&amp;h=229" src="https://static.alili.tech/img/bV5DHX?w=674&amp;h=229" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>执行webpack -h成功执行就不再提示安装webpack-cli</p>
<p><span class="img-wrap"><img data-src="/img/bV5DIt?w=510&amp;h=257" src="https://static.alili.tech/img/bV5DIt?w=510&amp;h=257" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>说明全局安装cli之前webpack寻找不到webpack命令，在以前的版本不会出现这种情况是为什么呢？在网上搜索参考问题中<br><a href="https://stackoverflow.com/questions/49092291/the-cli-moved-into-a-separate-package-webpack-cli" rel="nofollow noreferrer" target="_blank">https://stackoverflow.com/que...</a><br>有人提到，在webpack 3中，webpack本身和它的CLI以前都是在同一个包中，但在第4版中，他们已经将两者分开来更好地管理它们。<br>官方文档中推荐本地安装并且提示，当你在本地安装 webpack 后，你能够从 node_modules/.bin/webpack 访问它的 bin 版本。<br>我把webpack-cli全局安装卸载掉，然后进入路径node_modules/.bin/webpack就可以执行了，如下：</p>
<p><span class="img-wrap"><img data-src="/img/bV5DQt?w=499&amp;h=202" src="https://static.alili.tech/img/bV5DQt?w=499&amp;h=202" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这就意味着如果你webpack和webpack-cli是局部安装的，想要使用webpack命令必须进入node_modules/.bin/webpack才能执行webpack命令，.bin目录包含的是一系列可以执行的命令，但是如果你是全局安装的webpack-cli，就不需要进入bin目录，webpack就能够寻找到它的命令路径了，以上是我的个人总结，有什么错误的地方欢迎大家批评指出！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack坑系列--安装webpack-cli

## 原文链接
[https://segmentfault.com/a/1190000013699050](https://segmentfault.com/a/1190000013699050)

