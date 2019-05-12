---
title: 'JavaScript 2018: 你需要和不需要深入的 - The New Stack' 
date: 2019-01-25 2:30:23
hidden: true
slug: x9z84gkk6z
categories: [reprint]
---

{{< raw >}}

            <p>JavaScript 现今已发展成熟 -- 我们也不再是在页面上做一些小小的互动元素了，而是使用 JavaScript 构建整个大型应用。 当然，这也使得其比过去更为复杂， 在这个变化万千的 JavaScript 生态系统中，我们也已难以知道整个系统到底有多大。</p>
<p>Ethan Brown，以软件工程师为职业的同时，还是 <a href="http://www.oreilly.com/pub/au/6091">两本 JavaScript 书籍</a> 的作者，均由 O'Reilly 出版。 <a href="https://www.linkedin.com/in/ethan-brown-5b74b13a/">Ethan Brown</a> 花了大量的时间剖析 JavaScript，尝试着弄清楚这里面都有什么，以及一个现代 JavaScript 开发者该如何去开始迎合这些东西。</p>
<p>在2018里，对于聪明的开发者们可以去熟悉的东西， Brown 给出了他对 JavaScript 生态系统中各个方面最前沿，至少也是很有用的预测。有两点需要说明的是： 首先，他基于所有 JavaScript于 标准的这些变化中，指出了一些好的可以去了解的，尽管里面所罗列的一些东西可能不是你所关注的。对这些有一些大体上的了解能够让你在遇到困难难以抉择时，产生联系，知道去找谁，知道该去了解什么样的技术。</p>
<p>他还强调到，他所做的这些选择完全根据他个人的想法以及经验，这当然可能和你的完全不一样。Brown 说到： “这些只是我的个人想法，我们都各有各的想法，而且这其中我也会有疏漏。”</p>
<p>先从需要关注的点开始</p>
<p><strong>WebAssembly</strong>: <a href="http://webassembly.org/">WebAssembly</a> 属于 JavaScript 的一个子集， 它提供了一个针对其他语言的编译器。 如果你想将你的 C++ 代码编译成 JavaScript， <a href="https://thenewstack.io/ready-web-assembly-revolution/">WebAssembly 就是你需要了解的</a> — 它允许几乎任何语言运行于浏览器或者 Node 之中，而且也有了一些比较有意思的应用了。 Brown 说到：“我感觉这个技术会火，会变得非常重要。我也肯定会细心留意，并且在 2018  花些时间去更好的学习它。 ”</p>
<p><strong>函数式编程</strong>: “并不是什么新的东西，也已经被 JavaScript 社区的大多数所应用， 但我觉的 2018 才是函数式编程真正达到具有质量和规模的一年”，Brown 说到。对其常见的批评都是更难去学习，更难去理解，Brown 继续说到，但这也是看待问题的角度不同：让所有人都开始使用函数式编程，在这种强制性的编程风格下所显现出的迷惑、副作用以及混乱，我们看来也是非常奇怪的。</p>
<p>Brown 的建议：“如果你想尝试真正严格的函数式编程，你可以看看 <a href="http://elm-lang.org/">Elm</a> 或者 <a href="https://clojure.org/about/functional_programming">ClojureScript</a>, 不过，你也可以一句话从今天开始 ‘好的，我所有的代码都要变成纯函数式的了’。”</p>
<p><strong>不可变性 （Immutability）</strong>: 可以和函数式编程搭配在一起。 Brown 说到，“然而大部分人，第一次尝试不可变数据结构时，都会想：‘Wow， 这不太高效啊，你对所有的东西都创建了副本，所占用的内存不是很必要啊’”。但需要记住的是，Brown 继续到，你只是复制了变化的那一部分 -- 其他的结构依然保持不变。 同时，在 JavaScript 中进行严格比较速度快而且开销低，大部分切换到不可变数据结构的人都表示性能提升了。</p>
<p>更好的是，不可变性为一些试验行为提供了天然的保护网 -- 你在知道你无法修改任何已有东西，仅是创建了修改部分的副本的情况下，你会更愿意去试验那些不熟悉的东西。这对入门开发者来说也非常好。</p>
<p><strong>单向数据绑定</strong>: 这是前端同学关心的东西，由 Elm 提出，被 <a href="https://www.facebook.com/Engineering/">Facebook</a> 应用于 <a href="https://facebook.github.io/flux/">Flux</a>, 进而还有 <a href="https://redux.js.org/">Redux</a>, 以及现在的 <a href="https://angular.io/">Angular</a> 和 <a href="http://vuejs.org">Vue</a>”， Brown 说到。大家都越来越发觉这是个好东西， 在 2018 年也是时候去了解它了。</p>
<p>单向数据绑定让你更方便地管理应用中的状态 。 当你第一次尝试的时候你会想，天啊，又要写那么多代码，有点大材小用的样子了。对于一些小型应用来说，确实是大材小用了，但一旦你的应用达到了一定的规模，将会影响你对整个应用的控制而不仅仅是你所负责的部分。因为当你在使用单向数据绑定时，你需要考虑到应用的每一层数据的流转。</p>
<p><a href="http://www.benmvp.com/learning-es6-enhanced-object-literals/"><strong>计算属性名/字面属性值简写</strong>:</a> “可以说这是 <a href="http://es6-features.org/#Constants">ECMAScript 6</a> (ES6) 的黑马级特性。但我目前并没有看到大家经常用到，我觉得会有很多地方可以用到。 他其实是一个小小的语法糖，能够让你动态的构建属性名称，对象初始化或简写对象属性值。”，Brown 说到。 “我感觉像是每周都用这个特性玩出了新花样。同时和函数式编程搭配在一起也是挺不错的， 如果你之前没见过一定要去了解一下 -- 我更希望看到社区中越来越多人去使用这个特性。”</p>
<p><img src="http://p0.qhimg.com/t016da311f4bcd8db7f.png" alt=""></p>
<h2>不需要担心的东西：</h2>
<p>如 Brown 所说，至少现在，某些领域的知识可以选择跳过。</p>
<p><strong>面向对象编程</strong>: “我本人并不太喜欢在 JavaScript 中使用经典的面向对象编程。我认为会有更好的模型，更好的方式去实现代码复用。所以在 JavaScript 领域中，你也会涉及到面向对象编程的知识但不必为此而感到烦恼。 ”</p>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator">Generators</a>: “这是 JavaScript 中一个比较酷的特性， 一些地方肯定会有它的使用案例，但我认为其主要的特性已经被 <a href="https://ponyfoo.com/articles/understanding-javascript-async-await">async/await</a> 所替代。 我们很兴奋的在 <a href="http://koajs.com/">Koa.js</a> 中使用 Generator ，这样我们就可以用着同步的语义进行异步编程， 但现在有了 async 和 await 而且更好用。 所以除非你觉得在一些奇怪的使用案例中使用生成器比较合理的话也不用在意太多”， Brown 说到。</p>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol">Symbol:</a> “另外一个好的特性，对 JavaScript 语言的一个补充，但首先：我并没有看到大家再用他；其次，每次我尝试去使用 Symbol，除了在框架使用和序列化上出现问题外无其他收获。”，Brown 说到。总的说来，对于 JavaScript 这门语言，他并不认为 Symbol 是个合适的设计。 他的建议：保持观望的态度。</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
JavaScript 2018: 你需要和不需要深入的 - The New Stack

## 原文链接
[https://www.zcfy.cc/article/javascript-2018-things-you-need-to-know-and-a-few-you-can-skip-the-new-stack](https://www.zcfy.cc/article/javascript-2018-things-you-need-to-know-and-a-few-you-can-skip-the-new-stack)

