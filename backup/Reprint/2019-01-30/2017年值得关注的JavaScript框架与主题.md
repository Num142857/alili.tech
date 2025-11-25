---
title: '2017年值得关注的JavaScript框架与主题' 
date: 2019-01-30 2:30:22
hidden: true
slug: gk6wbw59v3q
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="https://zhuanlan.zhihu.com/p/24373050" rel="nofollow noreferrer" target="_blank">2017年值得关注的JavaScript框架与主题</a>翻译自<a href="https://medium.com/javascript-scene/top-javascript-frameworks-topics-to-learn-in-2017-700a397b711#.7cp7q9q0y" rel="nofollow noreferrer" target="_blank">Top JavaScript Frameworks &amp; Topics to Learn in 2017</a>，从属于笔者的<a href="https://github.com/wxyyxc1992/Web-Frontend-Introduction-And-Best-Practices" rel="nofollow noreferrer" target="_blank">Web 前端入门与最佳实践</a>。其他有关于2016年前端开发的总结包括<a href="https://segmentfault.com/a/1190000007666924">2016 年前端工具使用度调研报告</a>、<a href="https://segmentfault.com/a/1190000007083024" target="_blank">2016年里做前端是怎样一种体验</a>、<a href="https://segmentfault.com/a/1190000007730440">2016前端学习路线图</a>。另外推荐<a href="https://uxdesign.cc/ux-trends-2017-46a63399e3d2#.dtqo7m96b" rel="nofollow noreferrer" target="_blank">The State of UX in 2017</a>，作为开发者了解下设计的想法也是必需的。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007805676?w=1600&amp;h=1067" src="https://static.alili.tech/img/remote/1460000007805676?w=1600&amp;h=1067" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>JavaScript的繁荣促生了很多优秀的技术、框架与工具库，这空前的繁荣也给很多人造成了困惑，无所适从。到底何者是值得投入，代表了未来的方向，而何者又是真正适合于当前项目，当前团队的？而本文即时作者基于自身实践的一些思考，与诸君共享。</p>
<h1 id="articleHeader0">JavaScript &amp; DOM Fundamentals</h1>
<p>工欲善其事，必先知其器。在我们准备了解使用其他JavaScript框架的时候，我们首先需要去了解JavaScript的语法要点与一些工程实践：</p>
<ul>
<li><p><strong>内建方法:</strong> 我们需要了解标准数据类型 (特别是 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array" rel="nofollow noreferrer" target="_blank">arrays</a>, <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object" rel="nofollow noreferrer" target="_blank">objects</a>, <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String" rel="nofollow noreferrer" target="_blank">strings</a>, 以及 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Number" rel="nofollow noreferrer" target="_blank">numbers</a>).</p></li>
<li><p><strong>函数 &amp; </strong><a href="https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-pure-function-d1c076bec976" rel="nofollow noreferrer" target="_blank"><strong>纯函数</strong></a><strong>:</strong> 或许你觉得自己已经很了解函数了，但是总有些小技巧是你没有接触过的。另外不仅仅是对于基本的函数的用法，我们还要对函数式编程的思想，譬如纯函数高阶函数等有所掌握。</p></li>
<li><p><a href="https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-closure-b2f0d2152b36" rel="nofollow noreferrer" target="_blank"><strong>Closures</strong></a><strong>:</strong> 在学习闭包的过程中了解JavaScript传统的函数作用域。</p></li>
<li><p><strong>Callbacks:</strong> 回调是JavaScript异步编程的基本概念，某个回调函数会在某个异步操作结束后被调用，就好比领导对你说：好好干你的工作，做好了跟我汇报下。</p></li>
<li><p><a href="https://developers.google.com/web/fundamentals/getting-started/primers/promises" rel="nofollow noreferrer" target="_blank"><strong>Promises</strong></a><strong>: </strong>Promise是处理将来值的方法之一，当某个函数返回的是Promise对象时，你可以调用该对象的<code>then</code>函数来获取异步传入的值。而调用者是通过传入的<code>resolve</code>回调来传值，譬如<code>doSomething().then(value =&gt; console.log(value));</code></p></li>
<li><p><a href="https://github.com/mzabriskie/axios" rel="nofollow noreferrer" target="_blank"><strong>Ajax &amp; 服务端API调用</strong></a><strong>:</strong> 绝大部分有趣的应用都需要与服务端通过网络进行交互，你应该了解基本的HTTP Client知识。</p></li>
<li><p><a href="https://medium.com/javascript-scene/how-to-learn-es6-47d9a1ac2620" rel="nofollow noreferrer" target="_blank"><strong>ES6</strong></a><strong>: </strong>最新的JavaScript版本为ES7，或者叫ES2016，不过很多人ES6还没用熟练，正在过渡期吧。</p></li>
<li><p><a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Classes" rel="nofollow noreferrer" target="_blank"><strong>Classes</strong></a> (note: <a href="https://medium.com/javascript-scene/the-two-pillars-of-javascript-ee6f3281e7f3" rel="nofollow noreferrer" target="_blank"><strong>避免类继承</strong></a>. 参考 <a href="https://medium.com/@dan_abramov/how-to-use-classes-and-sleep-at-night-9af8de78ccb4" rel="nofollow noreferrer" target="_blank">How to Use Classes and Sleep at Night</a>.)</p></li>
<li><p><a href="https://ericelliottjs.com/premium-content/webcast-the-two-pillars-of-js-introduction-to-functional-programming/" rel="nofollow noreferrer" target="_blank"><strong>函数式编程基础</strong></a><strong>: </strong>函数式编程基于数据函数的组合来构建业务逻辑，避免了共享状态与可变数据，这一点会避免很多的问题。</p></li>
<li><p><a href="https://medium.com/javascript-scene/7-surprising-things-i-learned-writing-a-fibonacci-generator-4886a5c87710" rel="nofollow noreferrer" target="_blank"><strong>Generators</strong></a><strong> &amp; </strong><a href="https://medium.com/javascript-scene/the-hidden-power-of-es6-generators-observable-async-flow-control-cfa4c7f31435" rel="nofollow noreferrer" target="_blank"><strong>async/await</strong></a><strong>:</strong> 个人观点，最好的异步代码的写法就是用写同步代码的方式去写异步代码。不可否认这些都存在学习曲线，不过磨刀不误砍柴工。</p></li>
<li><p><strong>Performance: </strong><a href="https://developers.google.com/web/fundamentals/performance/rail" rel="nofollow noreferrer" target="_blank"><strong>RAIL</strong></a><strong> — </strong>参考 <a href="https://developers.google.com/speed/pagespeed/insights/" rel="nofollow noreferrer" target="_blank">“PageSpeed Insights”</a> &amp; <a href="https://www.webpagetest.org/" rel="nofollow noreferrer" target="_blank">“WebPageTest.org”</a></p></li>
<li><p><strong>Progressive Web Applications (PWAs):</strong> 参考 <a href="https://medium.com/javascript-scene/native-apps-are-doomed-ac397148a2c0" rel="nofollow noreferrer" target="_blank">“Native Apps are Doomed”</a>&amp; <a href="https://medium.com/javascript-scene/why-native-apps-really-are-doomed-native-apps-are-doomed-pt-2-e035b43170e9" rel="nofollow noreferrer" target="_blank">“Why Native Apps Really Are Doomed”</a></p></li>
<li><p><a href="https://medium.com/javascript-scene/introduction-to-node-express-90c431f9e6fd#.gl2r6gcnn" rel="nofollow noreferrer" target="_blank"><strong>Node &amp; Express</strong></a><strong>: </strong>Node允许你在服务端运行JavaScript程序，而Express则是目前最为流行的基于NodeJS的Web框架。</p></li>
<li><p><a href="https://lodash.com/" rel="nofollow noreferrer" target="_blank"><strong>Lodash</strong></a><strong>:</strong> 一个非常好用的、模块清晰的JavaScript辅助工具，其也遵循了很多函数式编程的理念，你可以通过 <code>lodash/fp</code>导入。</p></li>
</ul>
<h1 id="articleHeader1">Tooling</h1>
<ul>
<li><p><a href="https://developer.chrome.com/devtools" rel="nofollow noreferrer" target="_blank"><strong>Chrome Dev Tools</strong></a><strong>:</strong> <a href="https://developer.chrome.com/devtools#dom-and-styles" rel="nofollow noreferrer" target="_blank">DOM inspect</a> &amp; <a href="https://developer.chrome.com/devtools#debugging-javascript" rel="nofollow noreferrer" target="_blank">JS debugger</a>: Chrome Dev Tools算是最为优秀的调试工具了，Firefox也有很多不错的扩展。</p></li>
<li><p><a href="https://www.npmjs.com/" rel="nofollow noreferrer" target="_blank"><strong>npm</strong></a><strong>:</strong> 官方开源的JavaScript包管理工具。</p></li>
<li><p><a href="https://try.github.io/levels/1/challenges/1" rel="nofollow noreferrer" target="_blank"><strong>git</strong></a><strong> &amp; </strong><a href="http://github.com/" rel="nofollow noreferrer" target="_blank"><strong>GitHub</strong></a><strong>:</strong> 分布式版本管理系统，很适合团队协作。</p></li>
<li><p><a href="https://babeljs.io/" rel="nofollow noreferrer" target="_blank"><strong>Babel</strong></a><strong>:</strong> 能够将ES6代码编译到ES5使之能够兼容老版本浏览器。</p></li>
<li><p><a href="https://webpack.github.io/" rel="nofollow noreferrer" target="_blank"><strong>Webpack</strong></a><strong>:</strong> 最著名的模块打包工具之一，有不少优秀的模板配置奥，譬如<a href="https://github.com/wxyyxc1992/Webpack2-React-Redux-Boilerplate" rel="nofollow noreferrer" target="_blank">Webpack2-React-Redux-Boilerplate</a>。</p></li>
<li><p><a href="https://atom.io/" rel="nofollow noreferrer" target="_blank"><strong>Atom</strong></a><strong>, </strong><a href="https://code.visualstudio.com/d?utm_expid=101350005-35.Eg8306GUR6SersZwpBjURQ.3&amp;utm_referrer=https%3A%2F%2Fwww.google.com%2F" rel="nofollow noreferrer" target="_blank"><strong>VSCode</strong></a><strong>, or </strong><a href="https://www.jetbrains.com/webstorm/" rel="nofollow noreferrer" target="_blank"><strong>WebStorm</strong></a><strong> + </strong><a href="http://vim.rtorr.com/" rel="nofollow noreferrer" target="_blank"><strong>vim</strong></a><strong>:</strong> 你需要为自己选择合适的编辑器来辅助你快速开发。Atom与VSCode都是非常优秀的JavaScript编辑器，WebStorm也不错但是它是收费版本。如果你打算直接在服务端开发的话，Vim是个不错的选择。</p></li>
<li><p><a href="http://eslint.org/" rel="nofollow noreferrer" target="_blank"><strong>ESLint:</strong></a> ESLint能够帮助开发者更快地发现语法错误与样式问题，在Code Review与TDD之后这是个不错的减少Bug的方法。</p></li>
<li><p><a href="https://ternjs.net/" rel="nofollow noreferrer" target="_blank"><strong>Tern.js:</strong></a> 基于编辑器插件的标准JavaScript类型推导工具，不需要任何编译步骤或者注解支持。</p></li>
<li><p><a href="https://yarnpkg.com/" rel="nofollow noreferrer" target="_blank"><strong>Yarn</strong></a><strong>*:</strong> 类似于NPM的工具，不过安装起来更为可靠快速。</p></li>
<li><p><a href="https://www.typescriptlang.org/" rel="nofollow noreferrer" target="_blank"><strong>TypeScript*:</strong></a> JavaScript的静态类型支持，不过需要特别注意的是，除非你在学习Angular 2，不然我觉得你如果要选用Angular 2的话还是要慎重考虑。我个人很喜欢TypeScript，也很钦佩他们团队的优秀工作，不过任然有很多的权衡，可以参阅 <a href="https://medium.com/javascript-scene/the-shocking-secret-about-static-types-514d39bf30a3" rel="nofollow noreferrer" target="_blank">“The Shocking Secret About Static Types”</a> &amp; <a href="https://medium.com/javascript-scene/you-might-not-need-typescript-or-static-types-aa7cb670a77b" rel="nofollow noreferrer" target="_blank">“You Might Not Need TypeScript”</a>.</p></li>
<li><p><a href="https://flowtype.org/" rel="nofollow noreferrer" target="_blank"><strong>Flow*:</strong></a> JavaScript静态类型检测工具，可以阅读 <a href="http://djcordhose.github.io/flow-vs-typescript/flow-typescript-2.html#/" rel="nofollow noreferrer" target="_blank">“TypeScript vs Flow”</a> 来对于这二者有个大概的了解，如果你打算Flow的话也是推荐我的编辑器 <a href="https://nuclide.io/" rel="nofollow noreferrer" target="_blank">Nuclide</a>。</p></li>
</ul>
<h1 id="articleHeader2">React</h1>
<p><a href="https://facebook.github.io/react/" rel="nofollow noreferrer" target="_blank"><strong>React</strong></a> 是个专注于构建用户视图层的JavaScript库，其基于单向数据流的设计思想，也就意味着：</p>
<ul>
<li><p>React 以Props的形式将参数传入Components，并且在数据发生变化的时候选择性重渲染部分DOM。在重渲染阶段发生的数据变化并不会立刻触发重渲染，而是在下一个绘制阶段的时候才会进行重渲染。</p></li>
<li><p>渲染完毕之后，就进入了事件处理，React使用特殊的合成事件帮助开发者监听与响应事件，将所有的节点上的事件交托单一事件监听器处理以获得更好的性能体验。你可以在这些事件的监听函数中通过外部传入的回调重新设置Props或者直接修改内部State。</p></li>
<li><p>对于数据的任何变化都会重复步骤1。</p></li>
</ul>
<p>这种单向数据流与当时以Angular 1 / Knockout为代表的双向数据绑定形成对比，双向数据绑定中如果发现绑定的数据发生变化则会立刻触发重渲染，而无论当前是否处于渲染流程中，这一点也就导致了Reflows与Repaints的性能表现非常差。React并没有预置专门的数据管理系统，不过官方推荐基于Flux的解决方案。React 的单向数据流的概念借鉴了很多函数式编程的设计思想，并且对于不可变数据结构的应用也在很大程度上改变了我们对前端框架的认识。如果你希望了解更多关于React与Flux架构的知识，推荐阅读 <a href="https://medium.com/javascript-scene/the-best-way-to-learn-to-code-is-to-code-learn-app-architecture-by-building-apps-7ec029db6e00" rel="nofollow noreferrer" target="_blank">“The Best Way to Learn to Code is to Code: Learn App Architecture by Building Apps”</a>。</p>
<ul>
<li><p><a href="https://github.com/facebookincubator/create-react-app" rel="nofollow noreferrer" target="_blank"><strong>create-react-app*:</strong></a> 官方出品的快速脚手架搭建工具。</p></li>
<li><p><a href="https://github.com/ReactTraining/react-router" rel="nofollow noreferrer" target="_blank"><strong>react-router*:</strong></a> 方便的React路由解决方案。</p></li>
<li><p><a href="https://zeit.co/blog/next" rel="nofollow noreferrer" target="_blank"><strong>Next.js*:</strong></a> 非常简单的通用React应用开发框架。</p></li>
<li><p><a href="https://github.com/twitter-fabric/velocity-react" rel="nofollow noreferrer" target="_blank"><strong>velocity-react*:</strong></a> 非常不错的React动画辅助库。</p></li>
</ul>
<h1 id="articleHeader3">Redux</h1>
<p><a href="https://github.com/reactjs/redux" rel="nofollow noreferrer" target="_blank"><strong>Redux</strong></a> 为应用提供了事务式的，确定性的状态管理支持。在Redux中，我们仅可以通过Action来修改当前的应用状态。如果你希望深入了解为啥这么做，可以参阅 <a href="https://medium.com/javascript-scene/10-tips-for-better-redux-architecture-69250425af44" rel="nofollow noreferrer" target="_blank">“10 Tips for Better Redux Architecture.”</a> 或者跟着 <a href="https://medium.com/u/a3a8af6addc1" rel="nofollow noreferrer" target="_blank">Dan Abramov</a>的官方课程:</p>
<ul>
<li><p><a href="https://egghead.io/courses/getting-started-with-redux" rel="nofollow noreferrer" target="_blank"><strong>“Getting Started with Redux”</strong></a></p></li>
<li><p><a href="https://egghead.io/courses/building-react-applications-with-idiomatic-redux" rel="nofollow noreferrer" target="_blank"><strong>“Building React Applications with Idiomatic Redux”</strong></a></p></li>
</ul>
<p>实际上即使你不使用Redux，也很推荐学习Redux的设计思想，它可以给你很多关于状态管理的最佳实践，告诉你纯函数的价值所在，以及告诉你何谓Reducers，何谓General-Purpose函数。在Redux的工程实践中，对于异步Action的处理也是值得讨论的：</p>
<ul><li><p><a href="https://github.com/yelouafi/redux-saga" rel="nofollow noreferrer" target="_blank"><strong>redux-saga*:</strong></a> A synchronous-style side-effect library for Redux. Use this to manage I/O (such as handling network requests).</p></li></ul>
<h1 id="articleHeader4">Angular 2*</h1>
<p><a href="https://angular.io/" rel="nofollow noreferrer" target="_blank"><strong>Angular 2</strong></a> 脱胎于风靡一时的Angular 1，鉴于当年疯狂的流行度，学会这个会是你简历上浓墨重彩的一笔，不过我还是推荐先学习React。我个人也认为React是优于Angular 2的,<a href="https://medium.com/javascript-scene/angular-2-vs-react-the-ultimate-dance-off-60e7dfbc379c" rel="nofollow noreferrer" target="_blank">React over Angular 2</a> because:</p>
<ol>
<li><p>它更简单</p></li>
<li><p>社区很强大</p></li>
</ol>
<h1 id="articleHeader5">RxJS</h1>
<p><a href="https://github.com/Reactive-Extensions/RxJS" rel="nofollow noreferrer" target="_blank"><strong>RxJS</strong></a> 是JavaScript中一系列响应式编程工具的集合，就好比流处理领域的Lodash，它把响应式编程带入到了JavaScript的领域。ECMAScript Observables是stage-1阶段的草稿，RxJS 5+则是当前的标准实现。虽然我个人非常喜欢RxJS，但是如果你想在工程中使用RxJS的话还是需要考虑下，因为其内置了很多的Operators，其会增加你的包体尺寸。不过我们可以通过仅引入部分所需要的库来解决这个问题，最后大概只会使得包体增加200KB左右吧。</p>
<h1 id="articleHeader6">为什么没有提到其他框架？</h1>
<p>有不少人问我为啥没有把他们喜欢的框架也列举进来，对于我而言我会先考虑：这个在真实的工作中会所有帮助吗？当然，这一点见仁见智，我也是打算从一些所谓的人气投票中一窥变化。首先，我会去Google Trends中查看各个框架关联关键词的被搜索情况:<br><span class="img-wrap"><img data-src="/img/remote/1460000007805677?w=1376&amp;h=392" src="https://static.alili.tech/img/remote/1460000007805677?w=1376&amp;h=392" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>另一个很有帮助的网站就是Indeed.com，会聚合不同站点上对于不同职位的开发者的需求信息，可以看出目前招聘上对于前端开发者技能需求的情况为:<br><span class="img-wrap"><img data-src="/img/remote/1460000007805678?w=605&amp;h=352" src="https://static.alili.tech/img/remote/1460000007805678?w=605&amp;h=352" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>在上图中，Angular（Angular 1+Angular 2）还是高于React的，不过我个人还是会推荐React，有如下几个原因吧：</p>
<ul>
<li><p><a href="https://medium.com/@sachagreif/the-state-of-javascript-front-end-frameworks-1a2d8a61510" rel="nofollow noreferrer" target="_blank">More people are interested in learning React than Angular</a></p></li>
<li><p><a href="https://medium.com/@sachagreif/the-state-of-javascript-front-end-frameworks-1a2d8a61510" rel="nofollow noreferrer" target="_blank">React significantly leads Angular in user satisfaction</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
2017年值得关注的JavaScript框架与主题

## 原文链接
[https://segmentfault.com/a/1190000007805673](https://segmentfault.com/a/1190000007805673)

