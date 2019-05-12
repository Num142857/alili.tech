---
title: '每个 JavaScript 工程师都应当知道的 10 个面试题' 
date: 2018-12-07 2:30:10
hidden: true
slug: b66jbjk37x
categories: [reprint]
---

{{< raw >}}

                    
<p>原文链接：<a href="https://medium.com/javascript-scene/10-interview-questions-every-javascript-developer-should-know-6fa6bdf5ad95" rel="nofollow noreferrer" target="_blank">10 Interview Questions Every JavaScript Developer Should Know</a></p>
<hr>
<p>对大部分公司来说，招聘技术人员这种事情，管理层就应该放手交给技术团队，只有他们才能够准确地判断应聘者的技术实力。如果你恰巧是应聘者，你也是迟早都要去面试的。不管你是哪边的，都让大哥来教你几招。</p>
<blockquote>大兄弟们，要收藏，也要点赞呐。</blockquote>
<h2 id="articleHeader0">以人为本</h2>
<p>在 <a href="https://medium.com/javascript-scene/how-to-build-a-high-velocity-development-team-4b2360d34021" rel="nofollow noreferrer" target="_blank">How to Build a High Velocity Development Team</a> 一文中，我提出了一些观点，我觉得这些观点很重要，所以在这里再重复一遍：</p>
<p>优秀的团队才是决定公司业绩的关键，一家公司要想于逆境之中仍能有所建树，最重要的就是得先培养出一只优秀的团队。</p>
<p>就像 Marcus Lemonis 说的，有三点（3 个 P）最重要：</p>
<blockquote>员工（People），流程（Process），产品（Product）。</blockquote>
<p>在创业初期，你招来的工程师必须是能够独当一面的大神队友。他最好能够帮着招聘工程师，能指导其它工程师，还能帮初级和中级工程师解决各种问题。这样优秀的队友，无论何时都多多益善。</p>
<p>要想知道面试应聘者时，有哪些常见的注意事项，可以读读 <a href="https://medium.com/javascript-scene/why-hiring-is-so-hard-in-tech-c462c3230017" rel="nofollow noreferrer" target="_blank">Why Hiring is So Hard in Tech</a> 这篇文章。</p>
<blockquote>要评估一个应聘者的真实水准，最佳方式就是结对编程（pair  programming）。</blockquote>
<p>和应聘者结对编程，一切都听应聘者的。多观察、多聆听，看看应聘者是个怎样的人。用微博的 API 抓取消息并显示在时间线上，就是个很好的考察应聘者的面试项目。</p>
<p>不过结对编程再好使，也没办法让你完全了解一个应聘者。这个时候，面试也能帮上很多忙——但是千万别浪费时间去问一些语法（syntax）或者语言上的细节（language quirks）——问些高端的问题吧，大兄弟。问问项目架构（architecture），编程范式（paradigms），这个层面上的判断（the big desicions）能够在很大程度上影响一个项目的成败。</p>
<p>语法和语言特性（features）这种小知识，Google 一搜一大把，谁都会。而工程师在工作中所积累的软件工程方面的经验，以及个人常用的编程范式及代码风格（idioms），这些可都是很难 Google 到的宝贵财富。</p>
<p>JavaScript 很独特，它在各种大型项目中都起着至关重要的作用。那是什么让 JavaScript 如此与众不同？</p>
<p>下面几个问题，也许能帮你一探究竟。</p>
<hr>
<h2 id="articleHeader1">1. 能说出来两种对于 JavaScript 工程师很重要的编程范式么？</h2>
<p>JavaScript 是一门多范式（multi-paradigm）的编程语言，它既支持命令式（imperative）/面向过程（procedural）编程，也支持面向对象编程（OOP，Object-Oriented Programming），还支持函数式编程（functional programming）。JavaScript 所支持的面向对象编程包括<strong>原型继承</strong>（prototypal inheritance）。</p>
<h3 id="articleHeader2">面试加分项</h3>
<ul>
<li>原型继承（即：原型，OLOO——链接到其它对象的对象）；</li>
<li>函数式编程（即：闭包（closure），一类函数（first class functions），lambda 函数：箭头函数）。</li>
</ul>
<h3 id="articleHeader3">面试减分项</h3>
<ul><li>连范式都不知道，更别提什么原型 OO（prototypal oo）或者函数式编程了。</li></ul>
<h3 id="articleHeader4">深入了解</h3>
<ul>
<li>
<a href="https://medium.com/javascript-scene/the-two-pillars-of-javascript-ee6f3281e7f3" rel="nofollow noreferrer" target="_blank">The Two Pillars of JavaScript Part 1</a>：JS 两大支柱之一：原型 OO</li>
<li>
<a href="https://medium.com/javascript-scene/the-two-pillars-of-javascript-pt-2-functional-programming-a63aa53a41a4" rel="nofollow noreferrer" target="_blank">The Two Pillars of JavaScript Part 2</a>：JS 两大支柱之二：函数式编程</li>
</ul>
<h2 id="articleHeader5">2. 什么是函数式编程？</h2>
<p>函数式编程，是将数学函数组合起来，并且避免了状态共享（shared state）及可变数据（mutable data），由此而产生的编程语言。发明于 1958 年的 Lisp 就是首批支持函数式编程的语言之一，而 λ 演算（lambda calculus）则可以说是孕育了这门语言。即使在今天，Lisp 这个家族的编程语言应用范围依然很广。</p>
<p>函数式编程可是 JavaScript 语言中非常重要的一个概念（它可是 JavaScript 的两大支柱之一）。ES5 规范中就增加了很多常用的函数式工具。</p>
<h3 id="articleHeader6">面试加分项</h3>
<ul>
<li>纯函数（pure functions）/函数的纯粹性（function purity）</li>
<li>知道如何避免副作用（side-effects）</li>
<li>简单函数的组合</li>
<li>函数式编程语言：Lisp，ML，Haskell，Erlang，Clojure，Elm，F#，OCaml，等等</li>
<li>提到了 JavaScript 语言中支持函数式编程（FP）的特性：一类函数，高阶函数（higher order functions），作为参数（arguments）/值（values）的函数</li>
</ul>
<h3 id="articleHeader7">面试减分项</h3>
<ul>
<li>没有提到纯函数，以及如何避免副作用</li>
<li>没有提供函数式编程语言的例子</li>
<li>没有说是 JavaScript 中的哪些特性使得函数式编程得以实现</li>
</ul>
<h3 id="articleHeader8">深入了解</h3>
<ul>
<li>
<a href="https://medium.com/javascript-scene/the-two-pillars-of-javascript-pt-2-functional-programming-a63aa53a41a4" rel="nofollow noreferrer" target="_blank">The Two Pillars of JavaScript Part 2</a>：JS 两大支柱之二：函数式编程</li>
<li><a href="https://medium.com/javascript-scene/the-dao-of-immutability-9f91a70c88cd" rel="nofollow noreferrer" target="_blank">The Dao of Immutability</a></li>
<li><a href="https://medium.com/javascript-scene/composing-software-an-introduction-27b72500d6ea" rel="nofollow noreferrer" target="_blank">Composing Software</a></li>
<li><a href="http://haskell.cs.yale.edu/wp-content/uploads/2015/03/HSoM.pdf" rel="nofollow noreferrer" target="_blank">The Haskell School of Music</a></li>
</ul>
<h2 id="articleHeader9">3. 类继承和原型继承有什么区别？</h2>
<p><strong>类继承</strong>（Class Inheritance）：实例（instances）由类继承而来（类和实例的关系，可以类比为建筑图纸和实际建筑 🏠 的关系），同时还会创建父类—子类这样一种关系，也叫做类的分层分类（hierarchical class taxonomies）。通常是用 <code>new</code> 关键字调用类的构造函数（constructor functions）来创建实例的。不过在 ES6 中，要继承一个类，不用 <code>class</code> 关键字也可以。</p>
<p><strong>原型继承</strong>（Prototypal Inheritance）：实例/对象直接从其它对象继承而来，创建实例的话，往往用工厂函数（factory functions）或者 <code>Object.create()</code> 方法。实例可以从多个不同的对象组合而来，这样就能选择性地继承了。</p>
<blockquote>在 JavaScript 中，原型继承比类继承更简单，也更灵活。</blockquote>
<h3 id="articleHeader10">面试加分项</h3>
<ul>
<li>类：会创建紧密的耦合，或者说层级结构（hierarchies）/分类（taxonomies）。</li>
<li>原型：提到了衔接继承（concatenative inheritance）、原型委托（ prototype delegation）、函数继承（functional inheritance），以及对象组合（object composition）。</li>
</ul>
<h3 id="articleHeader11">面试减分项</h3>
<ul><li>原型继承和组合，与类继承相比，不知道哪个更好。</li></ul>
<h3 id="articleHeader12">深入了解</h3>
<ul>
<li>
<a href="https://medium.com/javascript-scene/the-two-pillars-of-javascript-ee6f3281e7f3" rel="nofollow noreferrer" target="_blank">The Two Pillars of JavaScript Part 1</a>：JS 两大支柱之一：原型 OO</li>
<li>
<a href="https://medium.com/javascript-scene/common-misconceptions-about-inheritance-in-javascript-d5d9bab29b0a" rel="nofollow noreferrer" target="_blank">Common Misconceptions About Inheritance in JavaScript</a>：对于 JavaScript 中继承这个概念，所普遍存在的误解</li>
</ul>
<h2 id="articleHeader13">4. 函数式编程和面向对象编程，各有什么优点和不足呢？</h2>
<p><strong>面向对象编程的优点</strong>：关于“对象”的一些基础概念理解起来比较容易，方法调用的含义也好解释。面向对象编程通常使用命令式的编码风格，声明式（declarative style）的用得比较少。这样的代码读起来，像是一组直接的、计算机很容易就能遵循的指令。</p>
<p><strong>面向对象编程的不足</strong>：面向对象编程往往需要共享状态。对象及其行为常常会添加到同一个实体上，这样一来，如果一堆函数都要访问这个实体，而且这些函数的执行顺序不确定的话，很可能就会出乱子了，比如竞争条件（race conditions）这种现象（函数 A 依赖于实体的某个属性，但是在 A 访问属性之前，属性已经被函数 B 修改了，那么函数 A 在使用属性的时候，很可能就得不到预期的结果）。</p>
<p><strong>函数式编程的优点</strong>：用函数式范式来编程，就不需要担心共享状态或者副作用了。这样就避免了几个函数在调用同一批资源时可能产生的 bug 了。拥有了“无参风格”（point-free style，也叫隐式编程）之类的特性之后，函数式编程就大大简化了，我们也可以用函数式编程的方式来把代码组合成复用性更强的代码了，面向对象编程可做不到这一点。</p>
<p>函数式编程更偏爱声明式、符号式（denotational style）的编码风格，这样的代码，并不是那种为了实现某种目的而需要按部就班地执行的一大堆指令，而是关注宏观上要<strong>做什么</strong>。至于具体应该<strong>怎么做</strong>，就都隐藏在函数内部了。这样一来，要是想重构代码、优化性能，那就大有可为了。（译者注：以做一道菜为例，就是由 <code>买菜</code> -&gt; <code>洗菜</code> -&gt; <code>炒菜</code> 这三步组成，每一步都是函数式编程的一个函数，不管做什么菜，这个流程都是不会变的。而想要优化这个过程，自然就是要深入每一步之中了。这样不管内部如何重构、优化，整体的流程并不会变，这就是函数式编程的好处。）甚至可以把一种算法换成另一种更高效的算法，同时还基本不需要修改代码（比如把及早求值策略（eager evaluation）替换为惰性求值策略（lazy evaluation））。</p>
<p>利用纯函数进行的计算，可以很方便地扩展到多处理器环境下，或者应用到分布式计算集群上，同时还不用担心线程资源冲突、竞争条件之类的问题。</p>
<p><strong>函数式编程的不足</strong>：代码如果过度利用了函数式的编程特性（如无参风格、大量方法的组合），就会影响其可读性，从而简洁度有余、易读性不足。</p>
<p>大部分工程师还是更熟悉面向对象编程、命令式编程，对于刚接触函数式编程的人来说，即使只是这个领域的一些的简单术语，都可能让他怀疑人生。</p>
<p>函数式编程的学习曲线更陡峭，因为面向对象编程太普及了，学习资料太多了。相比而言，函数式编程在学术领域的应用更广泛一些，在工业界的应用稍逊一筹，自然也就不那么“平易近人”了。在探讨函数式编程时，人们往往用 λ 演算、代数、范畴学等学科的专业术语和专业符号来描述相关的概念，那么其他人想要入门函数式编程的话，就得先把这些领域的基础知识搞明白，能不让人头大么。</p>
<h3 id="articleHeader14">面试加分项</h3>
<ul>
<li>共享状态的缺点、资源竞争、等等（面向对象编程）</li>
<li>函数式编程能够极大地简化应用开发</li>
<li>面向对象编程和函数式编程学习曲线的不同</li>
<li>两种编程方式各自的不足之处，以及对代码后期维护带来的影响</li>
<li>函数式风格的代码库，学习曲线会很陡峭</li>
<li>面向对象编程风格的代码库，修改起来很难，很容易出问题（和水平相当的函数式风格的代码相比）</li>
<li>
<strong>不可变性</strong>（immutability），能够极大地提升程序历史状态（program state history）的可见性（accessible）和扩展性（malleable），这样一来，想要添加诸如无限撤销/重做、倒带/回放、可后退的调试之类的功能的话，就简单多了。不管是面向对象编程还是函数式编程，这两种范式都能实现<strong>不可变性</strong>，但是要用面向对象来实现的话，共享状态对象的数量就会剧增，代码也会变得复杂很多。</li>
</ul>
<h3 id="articleHeader15">面试减分项</h3>
<ul><li>没有讲这两种编程范式的缺点——如果熟悉至少其中一种范式的话，应该能够说出很多这种范式的缺点吧。</li></ul>
<h3 id="articleHeader16">深入了解</h3>
<p>总是你俩，看来你俩真是非常重要啊。</p>
<ul>
<li>
<a href="https://medium.com/javascript-scene/the-two-pillars-of-javascript-ee6f3281e7f3" rel="nofollow noreferrer" target="_blank">The Two Pillars of JavaScript Part 1</a>：JS 两大支柱之一：原型 OO</li>
<li>
<a href="https://medium.com/javascript-scene/the-two-pillars-of-javascript-pt-2-functional-programming-a63aa53a41a4" rel="nofollow noreferrer" target="_blank">The Two Pillars of JavaScript Part 2</a>：JS 两大支柱之二：函数式编程</li>
</ul>
<h2 id="articleHeader17">5. 什么时候该用类继承？</h2>
<p>千万别用类继承！或者说尽量别用。如果非要用，就只用它继承一级（one level）就好了，多级的类继承简直就是反模式的。这个话题（不太明白是关于什么的……）我也参与讨论过好些年了，仅有的一些回答最终也沦为 <a href="https://medium.com/javascript-scene/common-misconceptions-about-inheritance-in-javascript-d5d9bab29b0a" rel="nofollow noreferrer" target="_blank">常见的误解</a> 之一。更多的时候，这个话题讨论着讨论着就没动静了。</p>
<blockquote>如果一个特性有时候很有用<br>但有时候又很危险<br>并且还有另一种更好的特性可以用<br>那<strong>务必要用另一种更好的特性</strong><br>~ Douglas Crockford</blockquote>
<h3 id="articleHeader18">面试加分项</h3>
<ul>
<li>尽量别用，甚至是彻底不用类继承。</li>
<li>有时候只继承一级的话也还是 OK 的，比如从框架的基类继承，例如 <code>React.Component</code>。</li>
<li>相比类继承，对象组合（object composition）更好一些。</li>
</ul>
<h3 id="articleHeader19">深入了解</h3>
<ul>
<li>
<a href="https://medium.com/javascript-scene/the-two-pillars-of-javascript-ee6f3281e7f3" rel="nofollow noreferrer" target="_blank">The Two Pillars of JavaScript Part 1</a>：JS 两大支柱之一：原型 OO</li>
<li>
<a href="http://davidwalsh.name/javascript-objects" rel="nofollow noreferrer" target="_blank">JS Objects — Inherited a Mess</a>：JS 对象（继承）：只是继承了混乱（mess）而已</li>
</ul>
<h2 id="articleHeader20">6. 什么时候该用原型继承？</h2>
<p>原型继承可以分为下面几类：</p>
<ul>
<li>委托（delegation，也就是原型链）</li>
<li>组合（concatenative，比如混用（mixins）、<code>Object.assign()</code>）</li>
<li>函数式（functional，这个函数式原型继承不是函数式编程。这里的函数是用来创建一个闭包，以实现私有状态（private state）或者封装（encapsulation））</li>
</ul>
<p>上面这三种原型继承都有各自的适用场景，不过它们都很有用，因为都能实现<strong>组合继承</strong>（composition），也就是建立了 <strong>A 拥有特性 B</strong>（has-a）、<strong>A 用到了特性 B</strong>（uses-a） 或者 <strong>A 可以实现特性 B</strong>（can-do） 的这样一种关系。相比而言，类继承建立的是 <strong>A 就是 B</strong> 这样一种关系。</p>
<h3 id="articleHeader21">面试加分项</h3>
<ul>
<li>知道在什么情况下不适合用模块化（modules）或者函数式编程。</li>
<li>知道需要组合多个不同来源的对象时，应该怎么做。</li>
<li>知道什么时候该用继承。</li>
</ul>
<h3 id="articleHeader22">面试减分项</h3>
<ul>
<li>不知道什么时候应该用原型。</li>
<li>不知道混用和 <code>Object.assign()</code>。</li>
</ul>
<h3 id="articleHeader23">深入了解</h3>
<ul><li>
<a href="http://chimera.labs.oreilly.com/books/1234000000262/ch03.html#chcsrdou100015eilvj6l9inj" rel="nofollow noreferrer" target="_blank">Programming JavaScript Applications</a>：文章中的“原型”这一节</li></ul>
<h2 id="articleHeader24">7. 为什么说“对象组合比类继承更好”？</h2>
<p>这句话引用的是《设计花纹》（Design Patterns，设计模式）这本书的内容。意思是要想实现代码重用，就应该把一堆小的功能单元组合成满足需求的各种对象，而不是通过类继承弄出来一层一层的对象。</p>
<p>换句话说，就是尽量编程实现 <strong>can-do</strong>、<strong>has-a</strong> 或者 <strong>uses-a</strong> 这种关系，而不是 <strong>is-a</strong> 这种关系。</p>
<h3 id="articleHeader25">面试加分项</h3>
<ul>
<li>避免使用类继承。</li>
<li>避免使用问题多多的基类。</li>
<li>避免紧耦合。</li>
<li>避免极其不灵活的层次分类（taxonomy）（类继承所产生的 <strong>is-a</strong> 关系可能会导致很多误用的情况）</li>
<li>避免大猩猩香蕉问题（“你只是想要一根香蕉，结果最后却整出来一只拿着香蕉的大猩猩，还有整个丛林”）。</li>
<li>要让代码更具扩展性。</li>
</ul>
<h3 id="articleHeader26">面试减分项</h3>
<ul>
<li>没有提到上面任何一种问题。</li>
<li>没有表达清楚对象组合与类继承有什么区别，也没有提到对象组合的优点。</li>
</ul>
<h3 id="articleHeader27">深入了解</h3>
<ul>
<li><a href="https://youtu.be/wfMtDGfHWpA" rel="nofollow noreferrer" target="_blank">Composition over Inheritance</a></li>
<li><a href="https://medium.com/p/77f8911c2fee" rel="nofollow noreferrer" target="_blank">Introducing the Stamp Specification</a></li>
</ul>
<h2 id="articleHeader28">8. 双向数据绑定/单向数据流的含义和区别</h2>
<p>双向数据绑定（two-way data binding），意味着 UI 层所呈现的内容和 Model 层的数据动态地绑定在一起了，其中一个发生了变化，就会立刻反映在另一个上。比如用户在前端页面的表单控件中输入了一个值，Model 层对应该控件的变量就会立刻更新为用户所输入的值；反之亦然，如果 Modal 层的数据有变化，变化后的数据也会立刻反映至 UI 层。</p>
<p>单向数据流（one-way data flow）， 意味着只有 Model 层才是单一数据源（single source of truth）。UI 层的变化会触发对应的消息机制，告知 Model 层用户的目的（对应 React 的 <code>store</code>）。只有 Model 层才有更改应用状态的权限，这样一来，数据永远都是单向流动的，也就更容易了解应用的状态是如何变化的。</p>
<p>采用单向数据流的应用，其状态的变化是很容易跟踪的，采用双向数据绑定的应用，就很难跟踪并理解状态的变化了。</p>
<h3 id="articleHeader29">面试加分项</h3>
<ul>
<li>React 是单向数据流的典型，面试时提到这个框架的话会加分。Cycle.js 则是另一个很流行的单向数据流的库。</li>
<li>Angular 则是双向数据绑定的典型。</li>
</ul>
<h3 id="articleHeader30">面试减分项</h3>
<ul><li>不理解单向数据流/双向数据绑定的含义，也说不清楚两者之间的区别。</li></ul>
<h3 id="articleHeader31">深入了解</h3>
<ul><li><a href="https://youtu.be/XxVg_s8xAms" rel="nofollow noreferrer" target="_blank">Introduction to React.js</a></li></ul>
<h2 id="articleHeader32">9. 单体架构和微服务架构各有何优劣？</h2>
<p>采用单体架构（monolithic architecture）的应用，各组件的代码是作为一个整体存在的，组件之间互相合作，共享内存和资源。</p>
<p>而微服务架构（microservice architecture）则是由许许多多个互相独立的小应用组成，每个应用都有自己的内存空间，应用在扩容时也是独立于其它应用进行的。</p>
<p><strong>单体架构的优势</strong>：大部分应用都有相当数量的横切关注点（cross-cutting concerns），比如日志记录，流量限制，还有审计跟踪和 DOS 防护等安全方面的需求，单体架构在这方面就很有优势。</p>
<p>当所有功能都运行在一个应用里的时候，就可以很方便地将组件与横切关注点相关联。</p>
<p>单体架构也有性能上的优势，毕竟访问共享内存还是比进程间通信（inter-process communication，IPC）要快的。</p>
<p><strong>单体架构的劣势</strong>：随着单体架构应用功能的不断开发，各项服务之间的耦合程度也会不断增加，这样一来就很难把各项服务分离开来了，要做独立扩容或者代码维护也就更不方便了。</p>
<p><strong>微服务的优势</strong>：微服务架构一般都有更好的组织结构，因为每项服务都有自己特定的分工，而且也不会干涉其它组件所负责的部分。服务解耦之后，想要重新组合、配置来为各个不同的应用提供服务的话，也更方便了（比如同时为 Web 客户端和公共 API 提供服务）。</p>
<p>如果用合理的架构来部署微服务的话，它在性能上也是很有优势的，因为这样一来，就可以很轻松地分离热门服务，对其进行扩容，同时还不会影响到应用中的其它部分。</p>
<p><strong>微服务的劣势</strong>：在实际构建一个新的微服务架构的时候，会遇到很多在设计阶段没有预料到的横切关注点。如果是单体架构应用的话就很简单，新建一个中间件（shared magic helpers 不知道怎么翻译……）来解决这样的问题就行了，没什么麻烦的。</p>
<p>但是在微服务架构中就不一样了，要解决这个问题，要么为每个横切关注点都引入一个独立的模块，要么就把所有横切关注点的解决方案封装到一个服务层中，让所有流量都从这里走一遍就行了。</p>
<p>为了解决横切关注点的问题，虽然单体架构也趋向于把所有的路由流量都从一个外部服务层走一遍，但是在这种架构中，可以等到项目非常成熟之后再进行这种改造，这样就可以把还这笔技术债的时间尽量往后拖一拖。</p>
<p>微服务一般都是部署在虚拟机或容器上的，随着应用规模的不断增加，虚拟机抢工作（VM wrangling work）的情况也会迅速增加。任务的分配一般都是通过容器群（container fleet）管理工具来自动实现的。</p>
<h3 id="articleHeader33">面试加分项</h3>
<ul>
<li>对于微服务的积极态度，虽然初始成本会比单体架构要高一些。知道微服务的性能和扩容在长期看来表现更佳。</li>
<li>在微服务架构和单体架构应用上都有实战经验。能够使应用中的各项服务在代码层面互相独立，但是又可以在开发初期迅速地将各项服务打包成一整个的单体架构应用。微服务化的改造可以在应用相当成熟之后，改造成本在可承受范围内的时候再进行。</li>
</ul>
<h3 id="articleHeader34">面试减分项</h3>
<ul>
<li>不知道单体架构和微服务架构的区别。</li>
<li>不知道微服务架构额外的开销，或者没有实际经验。</li>
<li>不知道微服务架构中，IPC 和网络通信所导致的额外的性能开销。</li>
<li>过分贬低微服务。说不清楚什么时候应该把单体架构应用解耦成微服务。</li>
<li>低估了可独立扩容的微服务的优势。</li>
</ul>
<h2 id="articleHeader35">10. 异步编程是什么？又为什么在 JavaScript 中这么重要？</h2>
<p>在同步编程中，代码会按顺序自顶向下依次执行（条件语句和函数调用除外），如果遇到网络请求或者磁盘读/写（I/O）这类耗时的任务，就会堵塞在这样的地方。</p>
<p>在异步编程中，JS 运行在事件循环（event loop）中。当需要执行一个阻塞操作（blocking operation）时，主线程发起一个（异步）请求，（工作线程就会去执行这个异步操作，）同时主线程继续执行后面的代码。（工作线程执行完毕之后，）就会发起响应，触发中断（interrupt），执行事件处理程序（event handler），执行完后主线程继续往后走。这样一来，一个程序线程就可以处理大量的并发操作了。</p>
<p>用户界面（user interface，UI）天然就是异步的，大部分时间它都在等待用户输入，从而中断事件循环，触发事件处理程序。</p>
<p>Node.js 默认是异步的，采用它构建的服务端和用户界面的执行机制差不多，在事件循环中等待网络请求，然后一个接一个地处理这些请求。</p>
<p>异步在 JavaScript 中非常重要，因为它既适合编写 UI，在服务端也有上佳的性能表现。</p>
<h3 id="articleHeader36">面试加分项</h3>
<ul>
<li>理解阻塞的含义，以及对性能带来的影响。</li>
<li>理解事件处理程序，以及它为什么对 UI 部分的代码很重要。</li>
</ul>
<h3 id="articleHeader37">面试减分项</h3>
<ul>
<li>不熟悉同步、异步的概念。</li>
<li>讲不清楚异步代码和 UI 代码的性能影响，也说不明白它俩之间的关系。</li>
</ul>
<h2 id="articleHeader38">总结</h2>
<p>多问问应聘者高层次的知识点，如果能讲清楚这些概念，就说明即使应聘者没怎么接触过 JavaScript，也能够在短短几个星期之内就把语言细节和语法之类的东西弄清楚。</p>
<p>不要因为应聘者在一些简单的知识上表现不佳就把对方 pass 掉，比如经典的 CS-101 算法课，或者一些解谜类的题目。</p>
<p>面试官真正应该关注的，是应聘者是否知道如何把一堆功能组织在一起，形成一个完整的应用。</p>
<p>电话面试的注意点就这些了，在线下的面试中，我更加关注应聘者实际编写代码的能力，我会观察他如何写代码。在我的<a href="https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-closure-b2f0d2152b36" rel="nofollow noreferrer" target="_blank">《精通 JavaScript 面试》</a>这个系列文章中，会有更深入的描述。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
每个 JavaScript 工程师都应当知道的 10 个面试题

## 原文链接
[https://segmentfault.com/a/1190000014143796](https://segmentfault.com/a/1190000014143796)

