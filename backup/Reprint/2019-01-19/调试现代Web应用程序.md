---
title: '调试现代Web应用程序' 
date: 2019-01-19 2:30:10
hidden: true
slug: mqjtx7xu2vi
categories: [reprint]
---

{{< raw >}}

            <p>（译者注：Jason Laster是Firefox的开发者，文章发表于<a href="https://hacks.mozilla.org，">https://hacks.mozilla.org，</a> 主要是讲述了在Firefox上的开发者工具的一个重大转变，更加有利于开发者的调试。文章地址：<a href="https://hacks.mozilla.org/2018/05/debugging-modern-web-applications/。">https://hacks.mozilla.org/2018/05/debugging-modern-web-applications/。</a> 之所以选择翻译这篇文章是因为我觉得这个调试工具在今后一定会被普及，因为现在在react、vue等框架和webpack、babel打包工具广泛运用的同时，调试代码却开始变得复杂起来。而这个工具对调试代码有了一个极大的改善，我会跟进这个工具的新闻。）</p>
<p>在Firefox中构建和调试现代JavaScript应用程序DevTools刚刚迈出了一大步。通过与<a href="https://babeljs.io/">Babel</a>技术主管<a href="https://github.com/loganfsmyth">Logan Smyth</a>的合作，我们调整了调试器的源映射支持，让您检查您实际编写的代码。结合我们在所有开发工具中提供一流的JS框架支持的举措，这将提高现代Web应用程序开发人员的生产力。</p>
<p>现代JS框架和构建工具如今扮演着至关重要的角色。像 <a href="https://reactjs.org/">React</a>，<a href="https://angular.io/">Angular</a>和<a href="https://www.emberjs.com/">Ember</a>这样的框架可以让开发人员用JSX，directives和templates构建声明式用户界面。像 <a href="https://webpack.js.org/">Webpack</a>，<a href="http://babeljs.io/">Babel</a>和 <a href="https://postcss.org/">PostCSS</a>这样的工具可以让开发人员在浏览器供应商支持之前使用新的JS和CSS功能。这些工具可帮助开发人员编写更简单的代码，却使得代码调试变得更为复杂。</p>
<p>在下面的例子中，我们使用Webpack和Babel将ES Modules和异步函数编译成可以在任何浏览器中运行的vanilla JS（即JavaScript）。左边的原始代码非常简单。右侧生成的与浏览器兼容的代码要复杂得多。</p>
<p><a href="https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2018/05/first.jpg"><img src="https://p0.ssl.qhimg.com/t01b276f403eed912bb.jpg" alt="In the example below, we use Webpack and Babel to compile ES Modules and async functions into vanilla JS. The original code on the left is pretty simple. The generated, browser-compatible code on the right is much more complicated."></a> <em>图1.左侧的原始文件，右侧生成的文件。</em></p>
<p>当调试器暂停时，它使用源映射从生成的代码中的第13行导航到原始代码中的第4行。不幸的是，因为暂停事实上发生在第13行，所以用户很难弄清当时 <em><strong>dancer</strong></em>的value。将鼠标移动到变量 <em><strong>dancer</strong></em> 上将返回未定义状态，唯一可以找到<strong><em>dancer</em></strong> 范围的方法是在“范围”窗格中打开全部六个可用范围，然后展开__emojis_对象！这个复杂而令人沮丧的过程是为什么许多人选择禁用源地图。</p>
<p><a href="https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2018/05/second.png"><img src="https://p0.ssl.qhimg.com/t015ee8581255264c5e.png" alt="A view of the disconnect between the original code file and the generated code, which opens multiple scopes"></a>_ 图2.<strong>dancer</strong>的价值是未定义的，在Scopes窗格中有六个独立的范围。_</p>
<p>为了解决这个问题，我们与Logan Smyth合作，看看是否有可能让交互感觉更自然，就好像你在调试你的原始代码一样。其结果是，一个新的引擎，它将源数据与Babel的语法树进行映射，以显示您希望看到的方式。</p>
<p><a href="https://2r4s9p1yi1fa2jd7j43zph8r-wpengine.netdna-ssl.com/files/2018/05/third.png"><img src="https://p0.ssl.qhimg.com/t0162a9041ce2d4f0ca.png" alt="Now the panel displays the correct value of dancer, and the Scopes pane shows one scope"></a><em>图3.显示<strong>dancer</strong>的正确值，Scopes窗格显示一个范围。</em></p>
<p>这些改进最初是针对Babel和Webpack实现的，目前我们正在增加对TypeScript，Angular，Vue，Ember等的支持。如果您的项目已经生成了源地图，那么这个功能在以后很有可能开箱即用。</p>
<p>要试用它，只需转入并下载<a href="https://www.mozilla.org/en-US/firefox/developer/">Firefox Developer Edition</a>。您可以通过对您自己的项目进行测试并<a href="https://github.com/devtools-html/debugger.html/issues/new">报告</a>任何问题来帮助我们。如果你想follow，打招呼或贡献，你也可以在devtools频道<a href="https://github.com/devtools-html/debugger.html/issues/5561">Github</a> 或<a href="https://discourse.mozilla.org/c/devtools">Mozilla Discourse</a>或<a href="https://devtools-html-slack.herokuapp.com/">devtools Slack</a>找到我们！</p>
<p>我们的2018年目标是改善使用最新框架构建现代应用程序的Web开发人员的生活，构建工具和最佳实践，未来是光明的！</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
调试现代Web应用程序

## 原文链接
[https://www.zcfy.cc/article/debugging-modern-web-applications](https://www.zcfy.cc/article/debugging-modern-web-applications)

