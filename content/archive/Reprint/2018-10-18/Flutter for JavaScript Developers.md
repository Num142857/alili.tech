---
title: Flutter for JavaScript Developers
hidden: true
categories: [reprint]
slug: c72de942
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <p><a href="https://flutter.io/">Flutter</a> 是一个致力于“构建高性能和高精确性iOS与Android应用”的跨平台移动应用SDK。</p>
<p>来源于<a href="https://flutter.io/technical-overview/">文档</a>的解释:</p>
<blockquote>
<p>Flutter 包含一个现代的“React风格”框架、一个2D的渲染引擎、多个现成部件与开发工具。</p>
</blockquote>
<p><img src="https://p0.ssl.qhimg.com/t01c3f5bf72e7d1ac67.png" alt=""></p>
<p>我将尝试在JS-npm生态系统以及Flutter / Dart与<a href="https://pub.dartlang.org/">Pub</a> 包管理系统之间进行比对，希望这篇文章能够为JavaScript开发人员提供对Flutter快速而简便的介绍。</p>
<blockquote>
<p>如果您有兴趣了解社区里的Flutter教程，库，公告和更新，推荐您订阅bi-weekly 上的 <a href="http://flutternewsletter.com/">Flutter Newsletter</a>。</p>
</blockquote>
<hr>
<p>我在 <a href="https://react-native.eu/">React Native EU</a>上的演讲 <a href="https://www.youtube.com/watch?v=pFtvv0rJgPw">React Native — Cross Platform &amp; Beyond</a>中讨论并演示了一些在React生态系统里不同的技术，包含 <a href="https://github.com/necolas/react-native-web">React Native Web</a>, <a href="https://github.com/lelandrichardson/react-primitives">React Primitives</a>, 和 <a href="https://microsoft.github.io/reactxp/">ReactXP</a>，与此同时我也对<a href="https://weex.incubator.apache.org/">Weex</a> 和 <a href="https://flutter.io/">Flutter</a>进行了讨论。</p>
<p>在过去几年间我看到的所有前端技术中，Flutter是在亲自试验之后，最让我感到激动的。在这篇文章中，我会解释自己激动的原因，同时给出一个让你可以尽快开始使用的Flutter指南。</p>
<h4>如果你理解我，那么我就知道你在想什么…</h4>
<p><img src="https://p0.ssl.qhimg.com/t01144380b77e4c49e2.jpg" alt=""></p>
<p>我是一个有了2.5年经验的React和React Native开发者。我仍然非常看好React / React Native，同时我也知道目前许多大公司正在频繁使用它们，但我总是喜欢看到其他想法，并寻找其他方法来实现类似的目标，无论是向他们去学习还是改变现有的技术方案。</p>
<h3>Flutter</h3>
<blockquote>
<p>我的结论如下: 我认为Flutter是惊艳的，它在不久的将来就会是一个可行的选择。</p>
</blockquote>
<p>在过去几周使用Flutter SDK之后，我正在使用它构建我的第一个应用程序，并且到目前为止我真的很喜欢这个过程。</p>
<p>在我开始讨论如何开始使用Flutter之前，我将首先回顾一下我对Flutter SDK的优缺点的看法。</p>
<p><img src="https://p0.ssl.qhimg.com/t019397e98c0c9c64f8.png" alt=""></p>
<h3>优点：</h3>
<ul>
<li>通过那些有核心团队持续进行更新维护的的UI库（Material, Cupertino）进行构建。</li>
<li>为了Flutter的需求，Dart和Flutter的团队一起致力于优化移动端的Dart虚拟机。</li>
<li>文档非常赞 😍。</li>
<li>优秀的命令行工具。</li>
<li>启动和运行的过程对我来说顺利而轻松，不会遇到很多障碍和错误。</li>
<li>配合开箱即用的热重新加载进行调试体验很好。 <a href="https://flutter.io/debugging/">一系列优秀调试技术的文档</a>。</li>
<li>由核心团队构建和维护，保守而稳定的导航库</li>
<li>Dart语言已有6年历史并且非常成熟。虽然Dart是一种基于类的面向对象编程语言，但如果您正在进行函数式编程，Dart确实具有一流的函数并支持许多函数式编程结构。</li>
<li>Dart比我预想的更容易接受，我真的很喜欢它。</li>
<li>Dart是一种开箱即用的类型语言，没有任何其他配置，比如TypeScript / Flow。</li>
<li>如果你用过React，你会发现Flutter拥有相似的数据状态管理的方案（生命周期方法和setState）。</li>
</ul>
<h3>缺点</h3>
<ul>
<li>你需要去学习Dart（相信我这并不难）。</li>
<li>仍在测试阶段。</li>
<li>仅仅应用于iOS和Android这两个系统。</li>
<li>插件生态系统还不够成熟。截止到2017年9月，<a href="https://pub.dartlang.org/flutter">https://pub.dartlang.org/flutter</a> <a href="https://t.co/KMMwbnVM6M" title="http://pub.dartlang.org"></a> 上只有 70+ 的Flutter插件项目。</li>
<li>布局和样式是需要学习的全新范例/API。</li>
<li>需要学习不同的项目部署的配置文件 (<em>pubspec.yaml</em> vs <em>package.json</em>)。</li>
</ul>
<h3>开始入门/其他观察</h3>
<ul>
<li>我正在使用安装有<a href="https://marketplace.visualstudio.com/items?itemName=DanTup.dart-code">Dart扩展插件</a>的VS Code进行开发，这让我获得了非常好的开发体验。Flutter的文档强烈推荐我们使用<a href="https://www.jetbrains.com/idea/">IntelliJ IDE</a>进行开发，它拥有一些内置支持实时热加载的东西，而VSCode据我所知还没有。</li>
<li>模块系统/包管理系统<a href="https://pub.dartlang.org/">Pub Dart</a>与npm有很大不同。根据你对npm的看法，这可好可坏。</li>
<li>我开始时并不了解Dart，但是很快就学会它了。它让我想起了很多TypeScript，并且与JavaScript有一些相似之处。</li>
<li>文档中有一些非常棒的CodeLabs和教程对我有很大的帮助，我建议你查看它们: 1. <a href="https://codelabs.developers.google.com/codelabs/flutter/index.html#0">构建UIS</a> 2. <a href="https://codelabs.developers.google.com/codelabs/flutter-firebase/index.html#0">添加Firebase</a> 3. <a href="https://flutter.io/tutorials/layout/">构建布局</a> 4. <a href="https://flutter.io/tutorials/interactive/">添加交互</a></li>
</ul>
<h4><em>说的够多了，让我们开始创建一个新项目！</em></h4>
<h3>安装命令行工具 (macOS)</h3>
<p><em>想要在Windows上开始，请阅读</em>  <a href="https://flutter.io/setup/">这些</a>  <em>文章。</em></p>
<p><em>要查看完整的macOS设置说明, 请阅读</em> <a href="https://flutter.io/setup-macos/">这些</a> <em>文章。</em></p>
<p>首先，我们需要克隆包含Flutter命令行二进制文件的库，并将其添加到我们的路径中。我将这个项目克隆到一个文件夹中，并保存了那些二进制文件，然后在$HOME/.bashrc/和$HOME/.zshrc文件中添加了一个新的路径。</p>
<ol>
<li>克隆项目:</li>
</ol>
<pre><code class="hljs awk">https:<span class="hljs-regexp">//gi</span>thub.com<span class="hljs-regexp">/flutter/</span>flutter.git
</code></pre><p>2. 添加路径:</p>
<pre><code class="hljs routeros"><span class="hljs-builtin-name">export</span> <span class="hljs-attribute">PATH</span>=<span class="hljs-variable">$HOME</span>/bin/flutter/bin:$PATH (<span class="hljs-keyword">or</span> whatever the path is <span class="hljs-keyword">to</span> your installation)
</code></pre><p>3. 从命令行运行flutter doctor以确保识别出Flutter的路径，并查看是否需要安装任何依赖项才能完成设置：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">flutter doctor</span>
</code></pre><h3>安装其它依赖</h3>
<p>如果您要为iOS进行部署，则必须安装Xcode，而对于Android，您必须安装Android Studio。</p>
<p><em>要了解有关安装每个平台的更多信息，请参阅文档</em> <a href="https://flutter.io/setup-macos/#platform-setup">_这里_</a></p>
<h3>创建您的第一个Flutter应用程序</h3>
<p>现在我们已经安装了Flutter的命令行工具，我们可以创建我们的第一个应用程序。为此，我们需要运行flutter create命令：</p>
<pre><code class="hljs ebnf"><span class="hljs-attribute">flutter create myapp</span>
</code></pre><p>这将为您创建一个新的应用程序。现在，切换到新目录并打开iOS模拟器或Android模拟器，然后运行以下命令：</p>
<pre><code class="hljs dockerfile">flutter <span class="hljs-keyword">run</span><span class="bash">
</span></code></pre><p><img src="https://p0.ssl.qhimg.com/t01a7ccc53287eff11c.jpg" alt=""></p>
<p>这将在您打开的模拟器中启动应用程序。如果您同时打开iOS和Android模拟器，则可以传入要在其中运行应用程序的模拟器：</p>
<pre><code class="hljs routeros">flutter <span class="hljs-builtin-name">run</span> -d android / flutter <span class="hljs-builtin-name">run</span> -d iPhone
</code></pre><p>或者在两个中运行：</p>
<pre><code class="hljs dockerfile">flutter <span class="hljs-keyword">run</span><span class="bash"> -d all
</span></code></pre><p>您应该会在控制台得到一些有关重新加载的应用程序信息：</p>
<p><img src="https://p0.ssl.qhimg.com/t014aa13fd6695e74a9.png" alt=""></p>
<h3>项目结构</h3>
<p>你正在运行的代码在lib/main.dart文件里。</p>
<p>你还会注意到我们有一个android文件夹和一个iOS文件夹，我们的本机项目就在这里。</p>
<p>我们项目的配置在pubspec.yaml文件里，这和JavaScript项目中的package.json文件相似。</p>
<p>现在我们来看看lib/main.dart文件</p>
<p>在文件最上方，我们看到了import:</p>
<p>import 'package:flutter/material.dart';</p>
<p>这来自哪里？好吧，在pubspec.yaml文件中，你会注意到在依赖关系下我们有一个单独的flutter依赖，我们在这里引用它作为一个package：flutter/。如果我们想要添加和导入其他依赖项，我们需要使用新的依赖项更新pubspec.yaml，然后将它们作为导入使用。</p>
<p>在这个文件中，我们还看到顶部有一个名为main的函数。在Dart中，<a href="https://www.dartlang.org/guides/language/language-tour#the-main-function">main</a>是特殊的， 它是必需而且最高等级的函数，也是应用开始执行的地方。因为Flutter是使用Dart构建的，所以这也是我们项目的主要切入点。</p>
<pre><code class="hljs cpp"><span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">main</span><span class="hljs-params">()</span> </span>{  runApp(<span class="hljs-keyword">new</span> MyApp());}
</code></pre><p>runApp函数调用了new MyApp()，它本身对一个类进行调用，这点类似于React应用，我们有一个由其他组件组成的主要组件，然后在ReactDOM.render或AppRegistry.registerComponent中进行呈现。</p>
<h3>部件</h3>
<p>Flutter的<a href="https://flutter.io/technical-overview/">技术综述</a>中提到的一个核心准则就是“一切都是部件”。</p>
<blockquote>
<p>部件是每个Flutter应用程序的基本构建块。每个部件都是用户界面的一部分的不可变声明。与分离视图（views），控制器（controllers），布局（layouts）和其他属性的其他框架不同，Flutter具有一致的统一对象模型：部件。</p>
</blockquote>
<p>在JavaScript和Web术语的方面，您可以想到一个类似于您如何思考组件的方式来思考部件。部件通常由类内部组成，这些类可能也可能具有或者不具有一些本地状态和方法。</p>
<p>如果你去查看main.dart，你会看到对这些类的引用：<em>StatelessWidget, StatefulWidget, Center</em>,和<em>Text</em>——这些都被视为部件。想要看全部可用的部件，可以查阅<a href="https://docs.flutter.io/flutter/widgets/widgets-library.html">文档</a>。</p>
<h3>布局与样式</h3>
<p>虽然Dart和Flutter框架的大部分都非常简单，但使用布局和样式最初还是有点难以理解。</p>
<p>要记住的关键是，与Web样式与React Native的策略“视图层（Views）执行所有布局和一部分样式”不同的是，Layout是由<strong>你选择的Widget类型</strong>和<strong>它布局与样式的属性</strong>的组合所决定的，这通常是具体取决于您正在使用部件的类型而不同。</p>
<p>比如，<a href="https://docs.flutter.io/flutter/widgets/Column-class.html">Column</a>采用一系列子项而不是任何样式属性（只有布局属性，比如<a href="https://docs.flutter.io/flutter/widgets/Flex/crossAxisAlignment.html">CrossAxisAlignment</a>和<a href="https://docs.flutter.io/flutter/widgets/Flex/direction.html">direction</a>等等），而<a href="https://docs.flutter.io/flutter/widgets/Container-class.html">Container</a>采用布局和样式属性的组合。</p>
<p>甚至有一些布局组件，例如 <a href="https://docs.flutter.io/flutter/widgets/Padding-class.html">Padding</a> ，除了为子组件添加内边距之外，不做其它任何事情。</p>
<p>有一个完整的<a href="https://flutter.io/widgets/layout/">部件目录</a>可以帮助您实现您想要的布局类型，包括容器，Container，Row，Center，GridView等等，这些部件也都有自己的布局规范。</p>
<h3>SetState / 生命周期方法</h3>
<p>与React类似，Flutter也有有状态（Stateful）与无状态（Stateless）的部件或组件的概念。有状态部件可以创建状态，更新状态和销毁，有点类似于我们使用React时习惯的生命周期方法。</p>
<p>Flutter中同样还有一种名为setState的方法可以更新状态。您可以在我们刚生成的项目的 _incrementCounter 方法中看到这一点。</p>
<p>查看以了解 <a href="https://docs.flutter.io/flutter/widgets/StatefulWidget-class.html">有状态部件</a>, <a href="https://docs.flutter.io/flutter/widgets/State-class.html">状态</a>, 和 <a href="https://docs.flutter.io/flutter/widgets/StatelessWidget-class.html">无状态组件</a>.</p>
<h3>一致性</h3>
<p>作为一个专门从事开发跨平台应用程序的开发者，我一直在关注React Native的竞争对手，它们对于那些因为某种原因需求不同的客户来说是可行的选择。我认为Flutter解决了一些客户的问题，比如内置类型的系统、一流的UI库以及由核心团队维护、具有发展前景的导航库等。</p>
<p>我将Flutter添加到我的工具中，所以当我遇到React Native无法解决的问题或情况时，我会有其他的东西可以选择。一旦我将Flutter作为另一个选项供他们预先选择，我也会将它呈现给我的客户——只要我觉得它已经准备就绪。</p>
<blockquote>
<p><em>我的名字是</em> <a href="https://twitter.com/dabit3">_Nader Dabit _</a>。<em>我是一名工作于</em> <a href="https://aws.amazon.com/mobile/"><em>AWS Mobile</em></a> <em>的开发布道者</em>，<em>致力于</em> <a href="https://aws.amazon.com/appsync/"><em>AppSync</em></a><em>，以及</em><a href="https://github.com/aws/aws-amplify"><em>Amplify</em></a><em>项目的开发，同时是</em> <a href="http://reactnative.training/"><em>React Native Training</em></a><em>的成立者。</em></p>
</blockquote>
<blockquote>
<p>如果你喜欢React或React Native，可以关注我们的播客— <a href="https://devchat.tv/react-native-radio">React Native Radio</a> 在 <a href="http://devchat.tv/">Devchat.tv</a>.</p>
</blockquote>
<blockquote>
<p>同样, 我的书 <a href="https://www.manning.com/books/react-native-in-action">React Native in Action</a> 目前在Manning Publications上架有售。</p>
</blockquote>
<blockquote>
<p>如果你们喜欢这篇文章，请推荐并分享它！多谢你的阅读。</p>
</blockquote>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/flutter-for-javascript-developers](https://www.zcfy.cc/article/flutter-for-javascript-developers)
原文标题: Flutter for JavaScript Developers
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
