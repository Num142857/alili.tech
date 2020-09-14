---
title: 'Weex 的 recycle-list 诞生记' 
date: 2018-12-10 2:30:07
hidden: true
slug: p4st69z8off
categories: [reprint]
---

{{< raw >}}

                    
<p>关注 Weex 开发进展的同学，可能会知道 Weex 前段时间发布了 v0.18.0 版本（<a href="http://weex-project.io/releasenote.html#v0-18-0" rel="nofollow noreferrer" target="_blank">release note</a>），其中包含了一个叫 <code>&lt;recycle-list&gt;</code> 的组件，它是一个带有回收复用功能的列表容器，据说是有史以来最特别的组件，性能也有大幅提升，开发过程也涉及到很多底层的改造，陆陆续续花了半年才实现了第一个正式的版本。<a href="http://weex-project.io/cn/references/components/recycle-list.html" rel="nofollow noreferrer" target="_blank"><code>&lt;recycle-list&gt;</code> 的文档</a>也在官网上线了，不过整体看下来好像和普通的 <code>&lt;list&gt;</code> 也差不多，反而多了一大堆莫名其妙的注意事项，一副很敏感又很脆弱的样子，真的有那么好用吗？这篇文章里就好好聊一聊它的特别之处。</p>
<h2 id="articleHeader0">为什么要搞个新的列表容器</h2>
<p>在如今 App 的开发中，有大部分的页面都是以可滚动列表的形式展现的，尤其是在货架式琳琅满目的活动页面中，更是长列表的主场，而且越来越长，带上“懒加载”和“自动加载更多”以后，其实就是一个可以无限滚动的列表。所以说，列表的性能和体验往往从很大程度上决定了页面的性能和体验，优化了列表的性能就会大幅提高页面的性能。</p>
<p>Weex 目前提供的列表组件 <a href="http://weex-project.io/cn/references/components/list.html" rel="nofollow noreferrer" target="_blank"><code>&lt;list&gt;</code></a> 其实已经是功能很强大的一个组件了，在 Android 上使用的是 <code>RecyclerView</code> 组件，在 iOS 上使用的是 <code>UITableView</code>，本身就具有了操作系统原生提供的回收功能，在节点离屏时可以回收掉部分原生组件持有的内存。和 Web 中的开发技术相比，在 webview 中实现的列表，无论是渲染性能、滚动体验还是内存占用方面，都难以和原生列表相媲美。即便如此，性能也永远是值得优化的，使用 Weex 的开发者对列表性能的追求也是永无止境的。</p>
<p><span class="img-wrap"><img data-src="/img/bV5Du6?w=2128&amp;h=1408" src="https://static.alili.tech/img/bV5Du6?w=2128&amp;h=1408" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>就像大家觉得前端框架引入 Virtual DOM 之后就一定比原生 DOM 慢一样，一些 Weex 的原生开发者也觉得 Weex 提供的列表毕竟多了一层封装，不能精细地操控列表的渲染行为，性能一定不如直接操作原生列表。这也是有一定道理的，如果再仔细分析一下这些需求，到底如何精细操控列表的渲染行为能提升性能呢？有没有办法抽象出通用的逻辑呢？假如说不考虑兼容现有的 list 组件，也允许对框架和现有渲染流程做重构级别的改动，能不能开个脑洞放个大招来提升列表的性能呢？这也是要开发新列表容器的出发点。</p>
<h2 id="articleHeader1">有啥不一样</h2>
<p>既然名字叫 recycle-list，它与普通 list 的最大差异就在于节点的回收复用能力。</p>
<p>在大部分使用列表的场景中，有很多行节点的结构都是大致相同的，一个列表可能有 500 行那么长，全部展开的话长度会超过 100 屏，但是很可能只用了 5 个不同的模板。如果在渲染这 500 行节点的时候，能不断复用这 5 个模板结构的话，只渲染可视区内的组件的话，肯定能大幅优化列表的渲染性能。</p>
<p>所以在渲染 recycle-list 的时候，会记录不同的模板结构，用数据驱动模板的渲染，首次渲染时只会先创建首屏以及有可能滚动到的安全区域内的节点；在滚动时，会将脱离安全区域内的节点回收，清空模板并灌注新数据追加到即将出现的区域内。这是 recycle-list 在渲染行为上最大的不同。基于这种行为，前端和客户端之间节点的通信数据量将会减少，列表的内存也可以得到大幅的优化，即使列表越来越长，内存的增量也不会很多。</p>
<h3 id="articleHeader2">常规列表的渲染过程</h3>
<p>首先分析一下目前在 Weex 里常规组件的渲染流程是怎样的。</p>
<blockquote>在 Weex 的架构中，可以简略的分成三层：【DSL】-&gt;【JS Framework】-&gt;【原生渲染引擎】。其中 DSL (Domain Specific Language) 指的是 Weex 里支持的上层前端框架，即 Vue 和 Rax。原生渲染引擎就是在 Weex 支持的平台上（Android 或 iOS）绘制原生 UI 的引擎。JS Framework 是桥接并适配 DSL 和原生渲染引擎的一层。参考 <a href="https://segmentfault.com/a/1190000013388649">《详细介绍 Weex 的 JS Framework》</a>。</blockquote>
<p>常规组件的渲染过程可以分为如下这几个步骤：</p>
<ol>
<li>创建前端组件</li>
<li>构建 Virtual DOM</li>
<li>生成“真实” DOM</li>
<li>发送渲染指令</li>
<li>绘制原生 UI</li>
</ol>
<p>以 Vue.js 为例，它在 Weex 里的渲染过程可以用下面这一张图来概括：</p>
<p><span class="img-wrap"><img data-src="/img/bV4k5L?w=2711&amp;h=1080" src="https://static.alili.tech/img/bV4k5L?w=2711&amp;h=1080" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>简而言之，模板是可以被复用的，传入多条数据可以展开成多个前端组件，这也是组件化的优势之一，组件进一步在前端框架中展开成 VNode 节点。JS Framework 里提供了很多类似 DOM API 的接口，在内部构建出适用于 Weex 平台的 <code>Element</code> 节点（和 DOM 很像，但并不是“真实”的 DOM），这些节点会以渲染指令的形式发给客户端。客户端根据渲染指令创建相应的原生组件，最终调用系统提供的接口绘制原生 UI。具体过程请参考：<a href="https://segmentfault.com/a/1190000013388649#articleHeader10" target="_blank"><em>Weex 页面的渲染</em></a>。</p>
<h3 id="articleHeader3">改造思路</h3>
<p>回顾上述过程可以看出，组件的模板结构是可复用的，这也是组件化的优势之一，但是组件的展开发生在前端框架内部，在传递到客户端的过程中，节点的结构保留了，但是组件的信息都被过滤掉了。即使同一个组件使用两份数据来渲染，生成了两份结构一致只有小部分内容有差异的节点，客户端也不会认为他们之间有联系，依然彼此独立的渲染。也就是说，在常规组件的渲染流程中，客户端感知不到前端组件的概念，渲染粒度太小，难以复用。</p>
<p>借鉴函数式编程里的惰性计算的思路，可以将渲染过程延后，交给客户端执行，这样客户端就能更好的施展复用逻辑。具体来讲就是不把节点在前端渲染好了再把结果发给客户端，而是把“渲染方法”和数据分别发给客户端，避免模板在前端框架中展开，客户端根据数据和用户的操作行为控制模板的渲染和复用。</p>
<h3 id="articleHeader4">可复用列表的渲染过程</h3>
<p><span class="img-wrap"><img data-src="/img/bV5DoH?w=1920&amp;h=1080" src="https://static.alili.tech/img/bV5DoH?w=1920&amp;h=1080" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>如上图所示，前端框架中的 <code>Template</code> 不再需要数据，而是直接展开成一种纯静态的模板结构，结构中包含了模板渲染逻辑，格式仍然是 <code>VNode</code>。然后经过 JS Framework 转换成 Weex 支持的 <code>Element</code>，其中也包含了模板的原生渲染指令。客户端解析出可复用的模板结构，由数据驱动模板渲染，这个模板结构和前端组件中的定义是一致的。</p>
<p>这个过程除了要把模板发给客户端，还得带上模板的渲染逻辑，告诉客户端如何根据数据来渲染模板。为了描述这些渲染逻辑，就得设计一套面向原生渲染引擎的模板渲染指令，用来声明节点的循环渲染、条件渲染、事件绑定等逻辑。下文有详解。</p>
<h2 id="articleHeader5">性能对比</h2>
<p>上述改造过程如果能实现的话，从理论上上讲，内存和渲染性能必然会有提升，而且列表越长性能优势越明显。下面也从实际的数据中看一下性能的对比结果到底是怎样的。</p>
<p>目前 Weex 提供了 <code>&lt;scroller&gt;</code> 、 <code>&lt;list&gt;</code> 、 和 <code>&lt;recycle-list&gt;</code> 这三种可滚动容器，功能看起来差不多，但是能力和特征都有差异。为了方便比较性能，我们对同样的一个页面，分别使用了不同的列表容器来实现，并记录了在 iOS 和 Android 下页面的加载时间、进入页面时的内存、滑动到页面底部时的内存、滑动时CPU的使用量等数据。</p>
<p>使用的测试用例如下：</p>
<ul>
<li>
<a href="http://dotwe.org/vue/9bce1225edd7c9d4d08a9c117e8d9b34" rel="nofollow noreferrer" target="_blank">使用 <code>&lt;scroller&gt;</code></a>。</li>
<li>
<a href="http://dotwe.org/vue/559d505aa40afcaa8544df275c2ae695" rel="nofollow noreferrer" target="_blank">使用 <code>&lt;list&gt;</code></a>。</li>
<li>
<a href="http://dotwe.org/vue/b1a139c6965f2ef5c06118e58203eb60" rel="nofollow noreferrer" target="_blank">使用 <code>&lt;recycle-list&gt;</code></a> （需要使用<a href="http://weex-project.io/tools/playground.html" rel="nofollow noreferrer" target="_blank">最新版 playground app</a> 扫码才能看到渲染效果）。</li>
</ul>
<p>在 iOS 设备（iPhone 6, iOS 11.0）中的测试结果如下所示：</p>
<p><span class="img-wrap"><img data-src="/img/bV5DoR?w=1920&amp;h=815" src="https://static.alili.tech/img/bV5DoR?w=1920&amp;h=815" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>在 Android 设备（Honor 6x, Android 7.0）中的测试结果如下所示：</p>
<p><span class="img-wrap"><img data-src="/img/bV5Do2?w=1920&amp;h=815" src="https://static.alili.tech/img/bV5Do2?w=1920&amp;h=815" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>从上面的数据可以看出，<code>&lt;list&gt;</code> 相比 <code>&lt;scroller&gt;</code> 已经有了较大的性能提升，<code>&lt;recycle-list&gt;</code> 比 <code>&lt;list&gt;</code> 的性能表现更加优秀。尤其在内存方面，<code>&lt;recycle-list&gt;</code> 在 iOS 下的内存占用量始终保持在个位数，在 Android 下除此加载时的内存和滑动到底部时的内存也分别优化了 42.7% 和 23.6%。</p>
<h2 id="articleHeader6">研发历程</h2>
<p>recycle-list 不仅特别，也是开发跨时最久的一个组件了，从最早明确提出 <a href="https://github.com/Hanks10100/incubator-weex/issues/1" rel="nofollow noreferrer" target="_blank">Proposal</a>（2017/08/04）到发布 <a href="http://weex-project.io/releasenote.html#v0-18-0" rel="nofollow noreferrer" target="_blank">v0.18.0</a>（2018/02/09）历时长达半年之久。因为它是一个重要但不紧急的功能，在研发期间不断被打断，本身的技术难度由很大，涉及的技术面比较多，整个研发过程也是陆陆续续、磕磕绊绊、边探索边验证。</p>
<p>recycle-list 虽说是一个组件，但是它开辟了一条新的渲染模式，无论是前端框架、JS Framework 还是原生渲染引擎都有重构级别的改造；开发者也是多样的，前端、iOS、Android 都全程参与了。由于这个组件涉及大量对前端框架内部的改造，Vue.js 的原作者<a href="https://github.com/yyx990803" rel="nofollow noreferrer" target="_blank">尤雨溪</a>（微博 <a href="https://weibo.com/p/1005051761511274" rel="nofollow noreferrer" target="_blank">@尤小右</a>） 也深度参与了开发和讨论，尤其在前期讨论实现方案的时候提供了大量思路。这个组件无论是技术方案还是开发协作方式都和以往不同，可以说是相当特别了。</p>
<h3 id="articleHeader7">先弄出来 MVP</h3>
<p>这个组件虽然开发历时很久，但是在讨论了大致思路以后，几乎在前几天内就做出了一个 MVP (Minimum Viable Product) 版本来验证想法，并且立即<a href="https://github.com/Hanks10100/incubator-weex/issues/1#issuecomment-320965370" rel="nofollow noreferrer" target="_blank">对比了渲染性能</a>。</p>
<p>为了快速验证想法，先随意约定了一套模板指令，绕过前端框架和 JS Framework 的渲染流程，直接<a href="https://github.com/Hanks10100/weex-native-directive/blob/91c5de9ba9ef04cc7d005a217e683734e234ca5f/vanilla.js" rel="nofollow noreferrer" target="_blank">手写 <code>callNative</code> 指令</a>将模板结构和数据发给客户端，客户端也不考虑兼容性和副作用，先实现了渲染和复用的基本逻辑。这个步骤只是用来验证设想的方案是否可行，如果行不通就没必要继续浪费时间。</p>
<p>虽然快速做出了 MVP 版本，看似已经成功一半，但是设计得太过粗糙，很多流程并未想清楚，原有列表的大部分功能都没有实现思路，真正的进度可能连 10% 都不到。</p>
<h3 id="articleHeader8">明确技术方案</h3>
<p>验证了可行性之后，下一步并没有立即继续写代码，而是静下心来认真再讨论一下详细的技术方案。这个过程邀请了尤雨溪一起参与，从编译工具、上层语法糖到组件生命周期和状态同步等功能，都做过细致的分析和讨论。</p>
<p>最初在讨论的时候，觉得生命周期和有状态的子组件这些功能都是无法实现的，因为组件的私有状态和生命周期是在前端框架里的，然而组件渲染过程又完全交给了客户端来控制，语言都不一样，甚至不在同一个线程里，简直无法再联系起来。不过最终还是设计出了一系列的通信和状态同步机制，将功能做得更完善，下文有详解。</p>
<p>在明确实现细节的过程中，由于没有兼容历史版本的包袱，开发期间可以冷静思考真正合理并且好用的技术方案，不惜多次推翻原有的设计，反复重构代码，最终才能实现“看起来和旧的 list 差不多嘛，无非是用了新的名字多了 <code>for/switch/case</code> 的语法而已”这种效果。</p>
<h3 id="articleHeader9">分期实现功能</h3>
<p>有了详细的设计以后，前端、iOS、Android 开发者分别独立开发，同时编译工具的用例也在不断的更新，三端都频繁的迭代，渐进式的完善功能。这个项目的前期工作做的比较足，先有的使用文档和实现方案，然后有的测试用例和各种 demo，最后才是写代码实现功能，开发流程还是比较工整的。</p>
<p>目前发布的第一个版本中，基础功能都完备了，但是存在较多<a href="http://weex-project.io/cn/references/components/recycle-list.html#zhu-yi-shi-xiang" rel="nofollow noreferrer" target="_blank">注意事项</a>，有些是组件固有的差异，还有些是正在讨论技术方案但还没来得及实现的功能，如<a href="https://github.com/Hanks10100/weex-native-directive/issues/14" rel="nofollow noreferrer" target="_blank">支持动态绑定样式类名</a>、双向绑定、<a href="https://github.com/Hanks10100/weex-native-directive/issues/13" rel="nofollow noreferrer" target="_blank">filter</a>、组件的自定义事件等。这些功能将在后续版本里逐步实现，虽然它们写出来只有短短几个字，看起来也都是现有组件理所当然就支持的功能，但是在 recycle-list 里可能对应了涉及多端的大范围改造。</p>
<h2 id="articleHeader10">实现原理</h2>
<p>在前面的章节里介绍了可复用列表的渲染过程，这只是开了个头，想要实现这个效果，至少要涉及编译工具、客户端渲染引擎以及前端框架里的改造。</p>
<h3 id="articleHeader11">自定义原生渲染指令</h3>
<p>把“渲染方法”发给客户端，说起来简单，这里边包含了循环、条件、使用自定义组件的逻辑，能把它们完备地发给客户端吗？<strong>绝大多数渲染逻辑都可以。</strong> 要实现这个功能，就得设计一套描述渲染逻辑的原生指令，保障自身的完备性，然后对接上层前端框架中的模板语法，这个对接过程可以交给工具在编译期实现。</p>
<p>以 Vue 为例，它提供了<a href="https://cn.vuejs.org/v2/guide/single-file-components.html" rel="nofollow noreferrer" target="_blank">单文件组件</a>的语法，其中 <code>v-bind</code> 、 <code>v-for</code> 、 <code>v-if</code> 之类的特殊属性（模板指令），以及 <code>"{{""}}"</code> 中的数据绑定都是描述渲染逻辑的，这些特殊语法如果用在 recycle-list 里，将会被编译工具编译成 Weex 支持的原生渲染指令。这层渲染指令是面向客户端的渲染行为设计的，是原生渲染器和 JS Framework 之间的约定，可以对接到 Vue 和 Rax 等多个上层框架，语法基本上都是一一对应的。具体的语法规则，可以参考 <a href="https://github.com/Hanks10100/weex-native-directive/blob/master/Implementation.md#%E6%A8%A1%E6%9D%BF%E8%AF%AD%E6%B3%95" rel="nofollow noreferrer" target="_blank">Implementation.md#模板语法</a>。</p>
<blockquote>Vue 里的渲染逻辑是声明式的写在模板里的，因此可以很容易的编译成 Weex 的原生渲染指令，整个转换过程可以融入到现有的编译工具中处理，对上层开发者透明，基本上对开发过程无影响，也不影响原有功能。在 Rax/React 的渲染函数中，标签语法可以使用 JSX 编写，但是模板的渲染规则（循环和条件）仍然由 JS 脚本来控制，是命令式的而不是声明式的，很难编译成静态的描述，要想使用长列表的复用功能，需要对开发时的写法做特殊约定，或者使用特殊的<em>渲染流程控制组件</em>。</blockquote>
<h3 id="articleHeader12">客户端根据数据渲染模板</h3>
<p>客户端拿到了数据和模板以后，在内部建立起 Watcher 和 Updater 的更新机制，由数据驱动模板的渲染。在最初渲染时只渲染屏幕内呈现出来的节点。</p>
<p><span class="img-wrap"><img data-src="/img/bV5Dpr?w=709&amp;h=337" src="https://static.alili.tech/img/bV5Dpr?w=709&amp;h=337" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>当列表向下滚动时，回收掉上方不在屏幕内的模板，并不销毁而是将其中的数据清空。当列表下方需要渲染新的数据时，会取出回收的空模板，注入数据渲染出真实节点，然后追加到列表下方。列表向上滚动时的原理是一样的，为了保障列表滚动的流畅，也会渲染屏幕上下方扩展区域内的节点。无论真实的数据有多少条，真实渲染的只有可滚动区域内的节点，这样不仅可以加快首屏的渲染速度，内存的占用量也不会随着列表长度大幅增长。</p>
<blockquote>由于我只是个前端开发，对于客户端里的底层细节就不在这里班门弄斧了，期待客户端开发者再详细介绍一下这一部分。</blockquote>
<h3 id="articleHeader13">使用 Virtual Component 管理组件状态</h3>
<p>想让客户端只根据模板和数据就能渲染出来节点，看起来只有函数式组件才可以做到，也就是要求组件必须是不含内部状态的，然而实际应用中绝大多数组件都含有内部状态的，只做到这一步是远远不够的。</p>
<p>对于包含了状态的组件，渲染过程就比较复杂了，因为组件内部状态的处理逻辑（<code>data</code>,<code>watch</code>, <code>computed</code>）都在前端中，然而模板和数据都已经发给客户端处理了，所以需要经过多个回合的通信来解决状态同步问题（详细处理过程可以参考 <a href="https://github.com/Hanks10100/weex-native-directive/blob/master/Implementation.md#%E6%B8%B2%E6%9F%93%E8%BF%87%E7%A8%8B" rel="nofollow noreferrer" target="_blank">Implementation.md#渲染过程</a>）。</p>
<p>为了实现可复用的原生组件，在前端框架中引入了 <strong>Virtual Component Template</strong> 和 <strong>Virtual Component</strong> 这两个概念：</p>
<p><span class="img-wrap"><img data-src="/img/bV5DpL?w=1648&amp;h=1080" src="https://static.alili.tech/img/bV5DpL?w=1648&amp;h=1080" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>在渲染的过程中，如果发现某个组件用在了 <code>&lt;recycle-list&gt;</code> 里，就不再走之前的处理逻辑，而是创建一个 Virtual Component Template，并且不初始化任何状态（<code>data</code>,<code>watch</code>, <code>computed</code>）、不绑定生命周期，但是会初始化自定义事件的功能。渲染组件时不执行 <code>render</code> 函数，而是执行定制的 <code>@render</code> 函数生成带有原生渲染指令的模板结构，这个结构将一次性发给客户端，后续不会再修改。</p>
<p>在创建 Virtual Component Template 时，会监听客户端原生组件的 <code>create</code> 生命周期钩子，当客户端派发了 <code>create</code> 的时候，才会真正的开始创建只含状态不含节点的 Virtual Component。虚拟组件模板只有一份，但是从同一份模板创建出的 Virtual Component 会有多个，与客户端发送的 <code>create</code> 钩子的次数有关，与数据有关。另外，由于事件是绑定在节点上的，原生 UI 捕获到的事件只会派发给 Virtual Component Template，然后再找到相应的 Virtual Component 并以其为作用域执行事件处理函数。</p>
<p>Virtual Component 内部只管理数据，即使数据有变动也不会触发渲染，而是调用特殊接口向客户端更新组件的内部状态，由客户端根据新数据更新组件的 UI。在创建 Virtual Component 时，会监听客户端原生组件的 <code>attach</code> 、<code>detach</code> 、 <code>update</code> 、 <code>syncState</code> 生命周期，生命周期的派发有客户端来控制，<a href="http://weex-project.io/cn/references/components/recycle-list.html#sheng-ming-zhou-qi-de-xing-wei-chai-yi" rel="nofollow noreferrer" target="_blank">语义和前端框架略有差异</a>。</p>
<h2 id="articleHeader14">题外话</h2>
<p>Weex 是个开源项目，是一个社区项目，分享经验、贡献代码、贡献想法、修订文档都算是为开源项目贡献力量，我相信有许多开发者都使用过 Weex，也踩过一些坑，积累了实践经验，也希望大家能多多分享，一起参与改善 Weex，让它变得更强大用起来更顺手。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Weex 的 recycle-list 诞生记

## 原文链接
[https://segmentfault.com/a/1190000013697211](https://segmentfault.com/a/1190000013697211)

