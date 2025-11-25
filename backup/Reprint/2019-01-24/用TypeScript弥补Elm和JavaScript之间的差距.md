---
title: '用TypeScript弥补Elm和JavaScript之间的差距' 
date: 2019-01-24 2:30:11
hidden: true
slug: hvks3gpluns
categories: [reprint]
---

{{< raw >}}

            <p><img src="http://p0.qhimg.com/t019d2845bd7ca5f720.png" alt=""></p>
<p>近些日子，我使用了新语言编程，从JavaScript，切确地说是Elm，转成TypeScript。<a href="https://medium.com/front-end-hacking/es2015-vs-elm-vs-typescript-a88dbc5d14d9">我写过一篇文章</a>解释了我为什么选择TypeScript作为我的前端语言。在本文中，我将继续深挖一些我非常喜欢的TypeScript特性。</p>
<h3>联合类型--更好地表达数据</h3>
<p>在我短暂使用Elm编程的过程中，越来越喜欢<a href="https://guide.elm-lang.org/types/union_types.html">联合类型</a>这个特性。让我们探究这个特性，看它是怎么让Elm和TypeScript变得更加好用。</p>
<p>联合类型，又被称为标记联合和代数数据类型（ADTs）。相对于仅仅只是用Javascript内置的数据类型，它能让编程者更加精确地表达数据。</p>
<p>很多编程语言难以表达好结构奇怪的数据。这些语言只提供一小组内置类型，而你所有数据都得使用这些类型去表达。所以你经常使用"null"，或者布尔值或者字符串去表达奇怪的细节，这是很容易出错。</p>
<p>Elm的联合类型让复杂数据更加自然地表达--<a href="http://evan.czaplicki.us/">Evan Czaplicki</a>(Elm作者)。</p>
<p>Redux是受Elm启发而来。在Redux和Elm中，应用数据的流动和变化通过接口的形式体现。这个过程非常类似Elm中的联合类型。让我们看些代码来证明这一点。</p>
<p>Redux Reducer 例子</p>
<p>Redux中的核心抽象就是reducer函数。store是应用中储存数据的地方，reducer函数作用于store之前，它让开发者能精确控制着应用数据的变化。在用redux构建的应用中，数据被认为是不可变化的，改变数据的唯一方法是行动触发了reducer函数，reducer函数根据行动的类型返回下一个数据状态。配合Immutable JS，JavaScript基本拥有了Elm 架构的所有功能。唯一缺失的是静态数据，尤其是联合类型。接下来，我重写了一些reducer函数的例子来证明Elm和Redux的相似。</p>
<p>当我开始学习Elm时，我发现了Redux和Elm架构之间的相似性，我就像</p>
<p><img src="http://p0.qhimg.com/t01007d2cad4aac68cb.png" alt=""></p>
<p>我在哪里？耶，是的，联合类型。就如你上面所看的，我使用了一个联合类型：'Msg'类型。这个关键词现在变成了一种类型。当你使用Javascript和Redux时，你需要确保reducer函数是正确的。所以你必须将动作类型定义为不变类型并且确保它们没写错，还要确定在reducer函数中没有改变了数据状态。</p>
<p>你写了大量的单元测试，确保每种情况都覆盖到，并且每种场景都能返你想要的结果，这些结果是由动作触发或reducer函数决定的。随着项目的发展，事情开始偏离正轨。当你重构你的代码时，保持测试与代码同步是非常烦人的事情。Redux需要数据的正确，但是由于Javascript自身没有静态类型，我们编写或者重构代码时，不能在编译器时就帮我们检查出来。</p>
<p>然而在Elm中就完全不一样了。编译器，依靠其本身优秀的特性，会全程帮助我们。事实上，如果写错了类型或者常数，就不能编译成功。这就是联合类型的力量所在。</p>
<p>当调用update函数时，按字面意思，必须传递一个"Msg"类型给函数；如果传递了其它内容，Elm将不会编译通过。如果忘记处理其中某个情况，Elm编译器会给你一个友好提示，告诉你现在不能处理所有情况，因为你没有将默认的情况考虑进去。</p>
<p>这意味着在编译的时候，你就能查找出所有bug而不用等到代码运行才发现。这样，由于运行时出的错误和写测试用例所花费的一大串时间都能省下来。除此之外，联合类型让我们可以用声明式和描述式的方式去定义数据类型和使用方式。</p>
<p>正如我 <a href="https://medium.com/front-end-hacking/es2015-vs-elm-vs-typescript-a88dbc5d14d9#.5tjzeoike">上一篇文章</a>所讨论的，不管我多喜欢Elm，我还是时不时要写JavaScript。TypeScript帮我解决了这个难题，主要是因为它支持联合类型。让我们看看在Redux中怎样使用TypeScript的联合类型。</p>
<p><img src="http://p0.qhimg.com/t015c3af62e64cf3f5a.png" alt="">有人记得是哪部电影吗?</p>
<h3>用静态数据构建UI组件框架编写组件框架文档</h3>
<p>React首先提出了构建独立可重复使用的UI组件框架这个概念。经过几年的发展，我们真的看到一些令人惊叹的框架，比如<a href="https://grommet.github.io/">Grommet UX</a>, <a href="http://www.material-ui.com/">Material UI</a>, <a href="http://blueprintjs.com/">Blueprint</a> 和 <a href="https://ant.design/">Ant.Design</a>。我一直有个目标，想为这些框架做出贡献，现在我已成为Grommet的贡献者。看着这些优秀框架的建立过程，让我更加明白哪些功能是框架能做，哪些不能做。</p>
<p>创建可复用UI组件是我的日常工作，在构建React/TypeScript开源项目的过程中，我发现这种能力得到了提升。不仅如此，我花在写文档和测试用例的时间比以前少。这要归功于TypeScript编译器，跟Elm编译器很类似，它们可以给你很有用的建议，让你能嵌入元数据，这些元数据在代码中描述了你的目的，让编译器去使用。它允许您在编写代码时对其进行文档化，使用智能工具甚至可以为您生成文档。</p>
<p>如果我将要构建一个全新的UI套件，基于上面提到几点原因，我百分百会使用TypeScript。</p>
<h3>总结</h3>
<p>静态类型是一个被JavaScript丢失的特性。我们非常幸运看到，当我们写JavaScript时，我们能选择去使用静态类型。不管你是不是有函数编程的背景，类型都能帮你写出自文档的代码，这些能帮你规范好数据。在没有静态类型下，是很难做到的。</p>
<p>我写这边文章，目的就是想分享一些特性，这些特性使用享受使用类型化的JavaScript。如果你喜欢这篇文章，关注我并且把他分享给朋友。下期见。</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用TypeScript弥补Elm和JavaScript之间的差距

## 原文链接
[https://www.zcfy.cc/article/bridging-the-gap-between-elm-and-javascript-with-typescript](https://www.zcfy.cc/article/bridging-the-gap-between-elm-and-javascript-with-typescript)

