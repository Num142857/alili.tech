---
title: '【译】关于转译器 JavaScript 程序员需要知道的' 
date: 2019-02-07 2:30:15
hidden: true
slug: 7ux0e5p0g5
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>本文转载自：<a href="http://www.zcfy.cc" rel="nofollow noreferrer" target="_blank">众成翻译</a><br>译者：<a href="http://www.zcfy.cc/@wemlin" rel="nofollow noreferrer" target="_blank">文蔺</a><br>链接：<a href="http://www.zcfy.cc/article/895" rel="nofollow noreferrer" target="_blank">http://www.zcfy.cc/article/895</a><br>原文：<a href="http://thenewstack.io/javascript-transpilers-need-know/" rel="nofollow noreferrer" target="_blank">http://thenewstack.io/javascript-transpilers-need-know/</a></p></blockquote>
<p>想要在与 ECMAScript 保持一致的同时也不抛弃那些没有最新 JavaScript 特性的浏览器吗？或者在成为标砖之前试验那些即将到来的特性，以告诉 ECMAScript 哪些对你有用，哪些没什么用？再或者就是想利用那些大型项目中提高 JavaScript 效率的工具？转译器（transpiler）可以帮你完成所有这些。</p>
<p>转译器是将一种语言的代码<a href="https://www.stevefenton.co.uk/2012/11/compiling-vs-transpiling/" rel="nofollow noreferrer" target="_blank">转换</a>为另一种语言代码的工具，它们过去曾被更多地用来转换替代性语言如 <a href="http://coffeescript.org/" rel="nofollow noreferrer" target="_blank">CoffeeScript</a>、<a href="https://github.com/clojure/clojurescript" rel="nofollow noreferrer" target="_blank">ClojureScript</a>、<a href="http://elm-lang.org/" rel="nofollow noreferrer" target="_blank">Elm</a>，甚至还使用像 C 和 C++、Emscripten（将 LLVM 二进制码转换为 asm.js 代码） 这样的语言。Mozilla 的政策与研究主任 <a href="https://twitter.com/littlecalculist" rel="nofollow noreferrer" target="_blank">Dave Herman</a> 指出，这并不是要替代 JavaScript，“多种 Web 编程模型可以愉快地共存，它们甚至还能健康地竞争、相互借鉴。”</p>
<h2 id="articleHeader0">扩展 JavaScript</h2>
<p>与此类似，他评论 <a href="https://www.typescriptlang.org/" rel="nofollow noreferrer" target="_blank">TypeScript</a>、<a href="http://www.purescript.org/" rel="nofollow noreferrer" target="_blank">PureScript</a>、<a href="http://flowtype.org/" rel="nofollow noreferrer" target="_blank">Flow</a> 以及 <a href="https://facebook.github.io/jsx/" rel="nofollow noreferrer" target="_blank">JSX</a> 这样一些给 JavaScript 增加自定义扩展的转译器“对 Web 来说是伟大的”。</p>
<p>TypeScript 是 JavaScript 的超集，支持可选的静态类型，还有一些工具，它们提高代码编写效率，支持重构，还可以侦测错误，从方法名的书写错误到因类型错误而无法执行的操作都能被检测到。你可以试验带有类型安全特性但同时保持可读性的 JavaScript，而不用深陷在其他语言如 Dart 或 CoffeeScript 之中。</p>
<p>当初，使用 TypeScript 来编写 Babylon.js 的时候，<a href="http://blogs.msdn.com/b/eternalcoding/archive/2014/04/28/why-we-decided-to-move-from-plain-javascript-to-typescript-for-babylon-js.aspx" rel="nofollow noreferrer" target="_blank">David Catuhe</a> 指出来，“使用 Babylon.js 的开发者不会察觉到 TypeScript 编写的新版本与 JavaScript 编写的老版本之间的差异。”他还提到，引入 TypeScript 帮助他找到了许多之前在代码中一直存在的小 bug。</p>
<blockquote><p>使用转译器，意味着开发者在编码的时候可以使用更新的特性和 API，总的说来，这同时也会帮助社区发展。 —— Henry Zhu</p></blockquote>
<p>对那些大量编码大团队来说，这些好处能带来巨大的效率提升。这正是 2011 年 TypeScript 启动时，微软所寻求的。Office Online 网页应用拥有超过 100 万行的代码，“那时候做这样的 app，可没那么多可以使用的工具”，TypeScript 前任项目经理 <a href="https://twitter.com/jntrnr" rel="nofollow noreferrer" target="_blank">Jonathan Turner</a> 告诉我们。他们的计划是，使用微软开发者们所习惯的其他语言的开发工具所支持的静态类型，得到更好的 JavaScript 代码。</p>
<p>VS Code 和 Visual Studio 很好地支持 TypeScript，也有 Sublime、Emacs 和 Vim 的 TypeScript 插件，还有其他一大堆工具正在支持。TypeScript 被许多项目选中，比如说，Angular，Asana，Dojo，Mozilla 的 Flash 替代产品，以及 Babylon.js WebGL 框架、JavaScript 远程调试工具 vorlon.js。</p>
<p>在微软内部，TypeScript 被 Bing、 Visual Studio 和  Visual Studio Online、Azure 以及 Xbox 团队所使用，而且它被 Adobe、Google、Palantir、Progress（NativeScript）、eBay 系的 SitePen 等公司使用。</p>
<p>除了扩展 JavaScript，TypeScript 还可以将代码转译为匹配多种 ECMAScript 标准的代码，这让你可以出更少的力气支持多种浏览器，还能提前使用 ECMAScript 标准的建议。</p>
<p>这个特点也被开源的 <a href="https://babeljs.io/" rel="nofollow noreferrer" target="_blank">Babel transpiler</a> 所支持，这是另一个 JavaScript 转译器。</p>
<p>“转译器允许开发者编写面向未来的代码，哪怕当前版本的语言不被任何环境支持，” Babel 核心团队的 <a href="https://github.com/hzoo" rel="nofollow noreferrer" target="_blank">Henry Zhu</a> 解释道。“比方说，如果你要支持不含任何 ES2015 特性的 IE 浏览器，那就必须要转译了，因为 IE 对新语法一无所知。Babel 就是中间的一层，让你无需考虑正在使用什么浏览器、指定哪些需要转译的特性。浏览器实现规范需要时间，他们在增量进行。如果没有自动更新特性，可能用户永远不会更新 JavaScript 版本，所以唯一的办法就是编写新版本的 JavaScript 然后再转译。”</p>
<p>和 TypeScript 一样，Babel 不仅仅是转译，Zhu 提到。“Babel 是 JavaScript 转换通用性工具。它并不只是将 ES6 转到 ES5。” Babel 拥有超过 1000 个的扩展插件；“人们为特定的库、工具（如代码检测）、浏览器优以及代码压缩等编写插件。”</p>
<h2 id="articleHeader1">Standards at Scale</h2>
<p>此外，Zhu 说，“使用转译器，意味着开发者在编码的时候可以使用更新的特性和 API，总的说来，这同时也会帮助社区发展。”</p>
<p>“规范的创造者们在 TC-39 处理的 stage-0 到 stage-4 过程中（<em>译者注</em>：原文 “TC-39 stage process from stage-0 to stage-4”，可以流程可以参考译文<a href="http://www.open-open.com/news/view/1769839" rel="nofollow noreferrer" target="_blank">《ES7新特性及ECMAScript标准的制定流程》</a>）可以接收到提案的反馈，如果有人为其编写了插件，” Zhu 说道。“因为有广泛的用户基础，Babel 允许许多用户尝试实验特性，相对于只是被没有‘真实世界’测试的语言作者所认可，这有助于塑造更好的特性。许多提议都在 Github 上，任何人都可以给未来的提案提供建议，只要它还在往前发展。”</p>
<p>Herman 对他所谓的 “标准转译技术的采用，特别是 Babel 的成功” 充满热情。“对开发者来说，最现实的诱惑就是利用 JavaScript 的改进之处，哪怕引擎（浏览器或 Node.js）尚未提供原生支持。不过因为这些特性是基于标准的，开发者们可以放心大胆地使用，而不必担心大的兼容性变化。在快速进化的 JavaScript 生态系统中，这对开发者的价值，怎么说都不为过。”</p>
<p>ECMAScript 标准的编辑，同时也是微软 Edge 项目高级经理的 <a href="https://github.com/bterlson" rel="nofollow noreferrer" target="_blank">Brian Terlson</a> 也同意。“转译器十分重要。JavaScript 程序员通常都想使用最新特性。迎合最小公分母是很悲催的，没人想做这事。转译器让我们得以直接使用新语法，这你所钟爱的、提高你效率的、让你的应用更具维护性的语法 —— 然后将其编译为可以在那些老顽固的浏览器上跑起来的东西，你希望市场上再也不要有这些老顽固了，可不幸的是它们还在。转译器在 JavaScript 社区如何书写代码这方面起到了变革性的作用。”</p>
<p>开发人员早期的使用和反馈，带来了良性循环，Herman 说。“转译器已经引发了新特性的超前使用与社区实验的浪潮。这让开发者们有能力在真实的生产环境中的应用里面使用新特性，并且对更新到最新版本特性的频度和时间有了控制。这也就意味着更多的开发者正在参与标准特性的早期审查，使他们在变化化的过程中有了更强的声音，最终带来更好的标准。”</p>
<p>“多亏有了转译器，未来版本的特性正在持续获得大量的早期试用。（比如）装饰器（Decorators）让类定义中抽象通用模式（pattern）成为可能，它在 Web 框架如 Angular、Ember 及 React 中大受欢迎，” Herman 说道。Ember.js 社区很早就采用了 Babel，Herman 说这让许关于模块系统（module system）的多可用性反馈进入到 ES 2015 中。</p>
<p>开发者的反馈也推动了装饰器的标准化，Terlson 说。“早期在转译器中实现的特性真的是很大的、引人注目的特性，像装饰器就是这样；这对那些特性设计的迭代非常有帮助。”</p>
<p>“如果你所知道的某个特性真的能改善你的代码和你所工作的应用，” 他建议，“赶紧在转译器中做起来或使用 polyfill，用起来，然后给我们反馈。”</p>
<h2 id="articleHeader2">新特性，更快</h2>
<p>转译器是解决新特性无法进入 ES 标准除非其已被实现的鸡生蛋还是蛋生鸡的问题的一种办法。不过浏览器厂商们不太愿意实现尚未标准化的特性，因为这可能导致开发者们无法与特性的标准保持一致，这些特性在标准化的过程中会有所变化。</p>
<p>ES 2015 不需要之前的实现；“结果就是，” Terlson 解释道，“在我们批准某些特性如 Proxy 之后，实现者们遇到了标准中没有体现的东西，所以在现实面前，我们不得不做修改。这体现出在批准那些标准之前确保特性将按照标准实现有多重要。”类似问题还有尾调用优化，这并非巧合，Zhu 提到了那些无法在转译器中尝试的特性。</p>
<p>在新版本语言出炉之前，语言的维护者需要程序员们提供反馈。Terlson 认为，转译器就是其中重要的一部分。“转译器帮助我们得到语法上的反馈。拥有 Babel 和 TypeScript 这些转译器，我们真的很幸运，这让我们在浏览器实现之前就能使用试验新语法。对某些特性来说，我们相当自信，如果有转译器 或 polyfill 外加浏览器，它们将会工作。”</p>
<p>转译器能比浏览器更快地开发新特性， Herman 指出，“Babel 由 JavaScript 实现，而浏览器们是用 C++ 实现的，所以功能更容易做出来。一些特性要同整个浏览器整合起来，可能是更棘手的挑战。JavaScript 引擎都有复杂的、多层 JIT 编译的构架，这常常意味着仅仅一个特性需要多次实现，每层实现一次。而且相比实现新的 JavaScript 特性，浏览器引擎开发团队的责任更多，所以他们要衡量优先级。”</p>
<p>转译器不可能给你提供所有新特性，Herman 指出，“某些特性，如 ES 2015 的 Proxy，或者当前的 SharedArrayBuffer 提议，基本上不可能通过转译器来实现。其他的，像 ES 2015 的 Symbol，可以部分实现，不过有一些已知的局限。这一类的问题，需要开发者们多注意，他们必须确保不会依赖那些转译器无法正确实现的行为。”</p>
<p>随着 ECMAScript 标准的发展，转译器也不会将你同 JavaScript 的变化隔离开来。“需要提出一点警告，” Terson 提到，“我们会听取使用转译器特性的开发者的反馈，有可能标准会因此变更。针对标准，在其完成之前，我们可能做出重大改变，所以当你使用超前于标准的特性时，我们会提出警告。”</p>
<p>即便如此，它们能帮助你过渡，Herman 说。“当升级转译器新版本的时机到来，让其因实验语言特性不兼容的改变而打破你的代码，这会很麻烦而且耗时不少。因此，像 Babel 这样的转译器允许你设置对不稳定性的容忍度，不过你还需要应对更多的流失。另外，你可以采取更加深思熟虑的设置，以降低不兼容的变化带来的风险，同时限制自己在更小的稳定的语言特性集中。”</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【译】关于转译器 JavaScript 程序员需要知道的

## 原文链接
[https://segmentfault.com/a/1190000006023824](https://segmentfault.com/a/1190000006023824)

