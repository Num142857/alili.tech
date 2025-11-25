---
title: '如何大幅度提升React应用性能' 
date: 2019-01-25 2:30:23
hidden: true
slug: ecs5d93zvxb
categories: [reprint]
---

{{< raw >}}

            <p><a href="https://medium.com/">Homepage</a></p>
<p><a href="https://medium.com/myheritage-engineering?source=logo-lo_lCkNlND9QOZ2---c98dcd6fa33c"><img src="http://p0.qhimg.com/t01075bffd23267fb57.jpg" alt="MyHeritage Engineering"></a></p>
<p>Follow<a href="https://twitter.com/MyHeritage" title="Visit “MyHeritage Engineering” on Twitter"></a><a href="//facebook.com/myheritage" title="Visit “MyHeritage Engineering” on Facebook"></a><a href="https://medium.com/m/signin?redirect=https%3A%2F%2Fmedium.com%2Fmyheritage-engineering%2Fhow-to-greatly-improve-your-react-app-performance-e70f7cbbb5f6&amp;source=--------------------------nav_reg&amp;operation=login">Sign in</a><a href="https://medium.com/m/signin?redirect=https%3A%2F%2Fmedium.com%2Fmyheritage-engineering%2Fhow-to-greatly-improve-your-react-app-performance-e70f7cbbb5f6&amp;source=--------------------------nav_reg&amp;operation=register">Get started</a><a href="https://medium.com/">Homepage</a></p>
<p><a href="https://medium.com/@noamel?source=post_header_lockup"><img src="http://p0.qhimg.com/t0122dc47179dc62665.png" alt="Go to the profile of Noam Elboim"></a></p>
<p><a href="https://medium.com/@noamel?source=post_header_lockup">Noam Elboim</a>BlockedUnblockFollowFollowingTech Lead &amp; Web Developer @MyHeritageNov 21</p>
<hr>
<h1>How to greatly improve your React app performance</h1>
<p>如何大幅度提升React应用性能</p>
<h2><strong>A review of common React performance pitfalls and how to avoid them</strong></h2>
<p>回顾常见的React性能误区以及如何避免它们</p>
<p>Performance problems in web apps are not new.
web应用中的性能问题并不罕见。
Everyone knows that moment when you take a new component, add it to your app — and suddenly every single user interaction you attempt has a noticeable performance lag! Sometimes, you can even use the same component multiple times and get an embarrassing animation.
众所周知，当你在应用中使用一个新的组件时，你会发现简单的用户交互会有明显的性能问题，甚至多次使用同一个组件会得到令人尴尬的动画效果。</p>
<p><img src="http://p0.qhimg.com/t01dc0cf73b3ec0a152.gif" alt=""></p>
<p>You might think up a few choice nicknames for whoever wrote that component, but here’s a better idea: Do something about it — really, you can!
你也许想到了几个编写组件的合适人选，这里有一个更好的想法：做点什么— 相信自己，你可以的！
We will tackle the following common React pitfalls:
我们将解决以下常见的React性能问题：</p>
<ol>
<li><p>Bad <strong>shouldComponentUpdate</strong> implementations and why <strong>PureComponent</strong> won’t save you.
糟糕的 shouldComponentUpdate 实现和使用 PureComponent 的原因。</p>
</li>
<li><p>Changing the <strong>DOM</strong> too fast.
快速改变 DOM。</p>
</li>
<li><p>Using <strong>events</strong> and <strong>callbacks</strong> without limitations.
无限制的使用 events 和 callbacks。</p>
</li>
</ol>
<p>In each, we first explain the root of the problem, and then we present some simple ways to avoid it.
针对以上，首先解释一下问题的根源，并且找出一些简单的方法来避免它。</p>
<h3>Own your shouldComponentUpdate</h3>
<p>shouldComponentUpdate 你值得拥有</p>
<p>The component lifecycle hook <a href="https://reactjs.org/docs/react-component.html#shouldcomponentupdate"><strong>shouldComponentUpdate</strong></a>is meant to prevent unnecessary renders. <strong>shouldComponentUpdate</strong> gets the next props and state as arguments, and if it returns <strong>true,</strong> the render function will be executed. Otherwise, it won’t.</p>
<p>shouldComponentUpdate 生命周期钩子函数用来防止不必要的渲染。shouldComponentUpdate 接受两个参数 nextProps 和 nextState（下一个props和下一个state的值）,如果返回为true,render函数将被渲染,否则,不渲染。
The default implementation for <strong>React.Component</strong> is <code>**return true**</code>.
在React.Component中默认返回true。</p>
<p>More renders means updates take more time, so we prevent unneeded updates to reduce that extra time. To do so, you’d think we’d want to implement strict shouldComponentUpdate functions to the extent we can, right?
多次渲染意味着更新需要更多的时间，所以我们应该避免不必要的更新来减少额外的时间。要做到这些，我们希望尽可能地实现严格的shouldComponentUpdate函数，对吧？</p>
<h4>The Problem</h4>
<p>问题</p>
<p>Let’s try using a very simple shouldComponentUpdate implementation:
我们来尝试使用一个非常简单的shouldComponentUpdate：</p>
<p><img src="http://p0.qhimg.com/t01b4c0905831181f24.jpg" alt=""></p>
<p><img src="http://p0.qhimg.com/t01fdb795f357627827.png" alt=""><code>Simple shallow implementation: 'this.props.children !== nextProps.children', but it's always returning true</code>
简单而浅的实现："this.props.children !== nextProps.children"，但它总是返回true。
Wait, why it doesn’t work?
等等，为什么它不起作用？
It doesn’t work because React is creating a new instance of <strong>ReactElement</strong> on each render!
他不起作用是因为 React在每个render上都创建了一个新的ReactElement实例！
This means shallow comparison like <code>**return this.props.children !== nextProps.children;**</code> in a shouldComponentUpdate function, is almost as good as writing <code>**return true;**</code>
这意味着在shouldComponentUpdate函数中浅度的比较 <strong>return this.props.children !== nextProps.children;</strong> 相当于直接写 <strong>return true;</strong>
In my experience, most components usually support <strong>ReactElement</strong> props (PropTypes.node or PropTypes.element) in some way or another, like <code>**children**</code>so this is a common case.
根据我的经验，大多数的组件通常以某种方式支持<strong>ReactElement</strong> props（PropTypes.node or PropTypes.element），就像<strong>children</strong>一样，这是常见的情况。</p>
<p>And what about PureComponent?
那么 PureComponent 呢？</p>
<p><a href="https://reactjs.org/docs/react-api.html#reactpurecomponent"><strong>React.PureComponent</strong></a>is an alternative to React.Component. Instead of always returning true in its shouldComponentUpdate implementation, it returns the outcome of shallow props and state comparison.</p>
<p>React.PureComponent是可以替代React.Component的一种方案，它不总是在shouldComponentUpdate中返回true,它返回props和state浅比较的结果。</p>
<p>Using PureComponent will result in the same outcome:
使用PureComponent会得到相同的结果：</p>
<p><img src="http://p0.qhimg.com/t01b4c0905831181f24.jpg" alt=""></p>
<p><img src="http://p0.qhimg.com/t01fdb795f357627827.png" alt="">PureComponent component is still <code>always returning true</code>
PureComponent组件仍然 “always returning true”</p>
<p>Is this is a bug or a feature of PureComponent? I can’t be sure. What we do know is that <strong>PureComponent is not useful in most real cases</strong>, and will not prevent updates.
这是PureComponent的一个bug还是一个特性？ 我不能确定。 我们所知道的是,<strong> PureComponent在大多数实际情况下是无用的</strong>,并且不会阻止更新。</p>
<h4>Possible Solutions</h4>
<p>合理的解决方案
The first thing that may come to mind is — let’s make a deep comparison! This actually works, but it has 2 major cons:</p>
<p>首先可以想到的是，让我们做一个深度的比较！ 这确实是有效的，但它有两个缺点：</p>
<ol>
<li><p>Running a deep comparison can be a long, heavy, slow process by itself, and the render function will not execute until the shouldComponentUpdate function finishes running.
Performance may therefore deteriorate even further.
1、运行一个深度比较本身就是一个漫长而沉重的过程，直到shouldComponentUpdate函数完成运行，渲染函数才会执行。
因此性能可能会进一步恶化。</p>
</li>
<li><p>It depends on the <em>current</em> implementation of React Elements, and may break in future versions.
这取决于React Elements的<em>current</em>实现，并可能在后续的版本中改进。
Therefore, in my opinion, using a deep comparison is not a very good solution.
因此，在我看来，使用深度比较不是一个很好的解决方案。</p>
</li>
</ol>
<p>In searching for a better solution, I looked at how other libraries with Virtual DOM have already been handling this problem.
为了寻找更好的解决方案，我研究了其他使用虚拟DOM已经处理了这个问题的库。
I found a very interesting comment by <a href="https://github.com/yyx990803">Evan You</a> (Vue.js creator) in a <a href="https://github.com/vuejs/vue/issues/4255#issuecomment-274143903">feature request to add a React-like shouldComponentUpdate to Vue.js</a>; He explained that this can’t be solved by “diffing” Virtual Elements, as it is likely to have many edge cases. Relying on React Elements to detect state change in your component is therefore not a viable solution.
我发现<a href="">Evan You</a>在[feature request to add a React-like shouldComponentUpdate to Vue.js]（https：//github.com/vuejs/vue/issues/4255#issuecomment-274143903） 中一个有趣的评论;他解释说，这个不能通过“分化”虚拟元素来解决，因为它可能有很多边缘情况。 依靠React Elements来检测组件中的状态变化并不是一个可行的解决方案。
Taking that into a practical use — React Elements should be skipped in shouldComponentUpdate implementations. Instead, use some sort of a state change to indicate that the component should be updated.
将其运用于实际中--React Elements应该在shouldComponentUpdate实现中跳过。 相反,使用某种状态的更改来表示组件应该被更新。
Instead of checking the comparison <code>**this.props.children !== nextProps.children**</code>, we will depend on a different prop to indicate a state change, preferably a string/numeric one, in order to make the comparison a very fast one.
我们将不依赖于比较<strong> this.props.children！== nextProps.children </strong>,而是依赖于不同的prop来表示一个状态变化，最好是一个字符串/数字，以便迅速的进行比较。
We may even use a new prop, specially designated to indicate that the component should be updated.
我们甚至可以使用一个新的属性，专门用来表示组件应该被更新。
Taking this even further, my colleague (<a href="https://medium.com/@tzook">Tzook Shaked</a>) and I created a <a href="https://facebook.github.io/react/docs/higher-order-components.html">HOC</a> that uses <a href="https://medium.com/@franleplant/react-higher-order-components-in-depth-cf9032ee6c3e#5247">Inheritance Inversion</a> to extend components with a generic shouldComponentUpdate implementation, a PureComponent alternative that actually works.
更甚者，我同事和我创建了一个通用的shouldComponentUpdate扩展组件，一个实用的替代PureComponent方案。
You can check the code here: <a href="https://github.com/NoamELB/shouldComponentUpdate-Children"><strong>https://github.com/NoamELB/shouldComponentUpdate-Children</strong></a>
你可以在这里查看代码：
I should note that it’s a generic implementation, and therefore it may not fit for all situations. Read more about <a href="https://github.com/NoamELB/shouldComponentUpdate-Children#usage">it in the repository’s readme</a>.
我应该注意到这是一个通用的实现，因此可能不适合所有情况。 更多请参照这个库的readme。</p>
<p>You can also see in the live example below that the only one <strong>using a custom shouldComponentUpdate implementation</strong>, as proposed here, doesn’t render unnecessarily:</p>
<p><img src="http://p0.qhimg.com/t01fdb795f357627827.png" alt=""></p>
<p><a href="https://github.com/NoamELB/shouldComponentUpdate-Children">shouldComponentUpdate-Children</a> live example
你也可以在下面的实例中看到，这里提出了一个仅有的使用自定义的shouldComponentUpdate，不会产生不必要地渲染</p>
<h3>Allow your components to scale up</h3>
<p>允许您的组件扩展
Are you using the same component multiple times in your app and it is that making the app very laggy? Do animations look crappy? Sometimes, it only takes one use to result in a performance toll on the whole app?
你在你的应用程序中多次使用相同的组件，会使得应用程序非常卡顿吗？ 动画看起来很糟糕吗？ 有时候，只有一个点会导致整个应用程序的性能损失吗？</p>
<h4>The Problem</h4>
<p>问题
When creating complex components, you may need to do some custom DOM manipulations. In creating those, you may encounter the following two problems:
在创建复杂的组件时，您或许会执行一些自定义的DOM操作。 在创建这些时，您可能会遇到以下两个问题：</p>
<ol>
<li><a href="https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing">Triggering “Layout”</a> too much — when you can trigger Composite or Paint instead.
1、Triggering“Layout”--您可能会触发 Composite 和 Paint来替代。</li>
<li><a href="https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing#avoid_layout_thrashing">Layout Thrashing</a> — where you trigger unnecessary DOM recalculations by reading from the DOM right after you have written to it multiple times.
2、Layout Thrashing--在您多次操作DOM之后，通过从DOM中读取不必要的DOM重新计算。
Let’s look at a naive Collapse component, changing the height between 0 and the content height:
让我们来看看一个Collapse组件，改变0和内容高度之间的高度：
<img src="http://p0.qhimg.com/t01fdb795f357627827.png" alt=""></li>
</ol>
<p>Naive Collapse component
Naive Collapse component
This component works great when it is used alone, but when you decide to use it a few more times…
这个组件在单独使用时效果很好，但是当您决定多次使用它时...
<img src="http://p0.qhimg.com/t01fdb795f357627827.png" alt=""></p>
<p><em>Multiple Collapse starting to take a toll on the app</em>
<em>Multiple Collapse开始对app</em>收费
If you are not on mobile right now, try changing your performance to “6x slowdown” to mimic most people’s experience.
如果您现在不在移动设备上，请尝试将您的性能改为“6倍速度减慢”，以满足大多数人的体验。
<img src="http://p0.qhimg.com/t0145286417c7a5ead8.png" alt=""></p>
<p>Change performance to 6x slowdown on Chrome
在Chrome上将性能改为6倍速度</p>
<h4>Possible Solutions</h4>
<p>合理的解决方案
Let’s analyze what is happening in the Collapse — this is the part where we change the height:
让我们来分析改变高度时, Collapse 做了那些事：
<img src="http://p0.qhimg.com/t01b4c0905831181f24.jpg" alt=""></p>
<p>There are 2 things we should notice:
有两件事我们应该注意：</p>
<ol>
<li>We are changing <em>height</em>, which according to <a href="https://csstriggers.com/">csstriggers.com</a> is triggering a Layout recalculation. If we managed to change something like <em>transform</em> instead, that would only trigger Composite and should be much smoother, right?
Indeed, that would perform better, but it would also leave a blank space under the Collapse, since we would then never be changing its height.
1、我们改变<em>height</em>时,会根据触发的布局重新计算。 如果我们设法改变类似<em>transform</em>的东西，那只会触发Composite，应该更平滑，对吗？
事实上，这样做表现会更好，但它也会在Collapse之下留下一片空白，因为我们永远不会改变它的高度。</li>
<li>Line 3 is a classic example of Layout Thrashing: We do a read from the DOM by <code>this.contentEl.scrollHeight</code>, and then a write to the DOM by setting <code>this.containerEl.style.height</code>. Multiply it by the number of Collapse components.
Wouldn’t it be nice if we could group all the reads, perform them together, and after that do all the writes?
第3行是Layout Thrashing的典型示例：我们通过<code>this.contentEl.scrollHeight</code>从DOM读取数据，然后通过设置this.containerEl.style.height将其乘以Collapse组件的数量写入DOM。
如果我们可以把所有的读取结合在一起，读之后再统一写入，那不是很好吗？</li>
</ol>
<p>Batching together DOM readings and writings is a good trick to deal with Layout Thrashing, and we can use <a href="https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame">requestAnimationFrame</a> to do the batching in the following manner:
将DOM读和写放在一起是处理Layout Thrashing的一个很好的技巧，我们可以用 requestAnimation 来进行批处理：
<img src="http://p0.qhimg.com/t01b4c0905831181f24.jpg" alt=""></p>
<p><img src="http://p0.qhimg.com/t01fdb795f357627827.png" alt="">Grouping reading &amp; writing on Collapse opening</p>
<p>This can be very cumbersome. Instead, use inside components, or check <a href="https://github.com/wilsonpage/fastdom">Fastdom</a> library and use it instead.
（<a href="https://github.com/wilsonpage/fastdom）">https://github.com/wilsonpage/fastdom）</a>
在 Collapse 时将读和写进行分组可能非常麻烦。 相反，使用已有的组件或者[Fastdom]来替代。
It is worth mentioning that you may not always get a good enough performance, as you are limited by the browser and device capabilities. In those cases, your solution may be a product change.
值得一提的是，由于浏览器和设备功能的限制，您可能无法得到足够好的性能。 在这些情况下，您的解决方案可能是产品的变更。
For example: Yes, browsers find it hard to open a thousand Collapse components at once, but do you really need to open all 1,000 on the screen at once?
例如：浏览器很难一次打开一千个Collapse组件，但是您是否真的需要一次打开全部的1000个屏幕？
One last thing: You may hear about something called <a href="https://css-tricks.com/almanac/properties/w/will-change/">will-change</a>. It may help you in specific cases, but you also risk lesser performance. Take care not to overuse it.
最后一件事：你可能会听到一些叫做[will-change]的东西（<a href="https://css-tricks.com/almanac/properties/w/will-change/）。">https://css-tricks.com/almanac/properties/w/will-change/）。</a> 它可以帮助你在特定的情况下，有一个低的成本。 注意不要过度使用它。</p>
<h3>Put your callbacks on a leash</h3>
<p>控制你的callbacks
Having a debounced or throttled version of our functions is useful when we attach any DOM event. It lets us reduce the number of calls to this function to the bare minimum we wanted and thereby improve the performance.
当我们触发DOM事件时，函数有一个控制条件是有必要的。 它可以使得这个函数的调用次数减少到我们想要的最低限度，从而提高性能。
Write something like this:
<code>window.addEventListener(‘resize’, _.throttle(callback))</code> is very common. But why don’t we use it in components callbacks as well?
像这样：
<code>window.addEventListener（'resize'，_.throttle（callback））</code>是很常见的。 但为什么我们不使用在组件的回调里？</p>
<h4>The Problem</h4>
<p>问题
Let’s look at the following component:
我们来看下面的组件：
<img src="http://p0.qhimg.com/t01b4c0905831181f24.jpg" alt=""></p>
<p>Have you noticed that we call <code>**this.props.onChange**</code> on every change? This is called a lot of times, where most of the calls are unnecessary. If the parent is making DOM changes, or any other heavy operations, according to the <code>**onChange**</code> callback, we may start seeing a lag in user interactions on the app.
你有没有注意到我们每次改变都调用<strong> this.props.onChange </strong>？ 这被调用很多次，大多数的调用是没有必要的。 如果父组件正根据<strong> onChange </strong>回调进行DOM更改或任何其他繁重的操作，则应用程序会出现卡顿。</p>
<h4>Possible Solution</h4>
<p>合理的解决方案
Instead, we can implement something like this:
相反，我们可以实现这样的事情：
<img src="http://p0.qhimg.com/t01b4c0905831181f24.jpg" alt=""></p>
<p>Debounce the event
延迟这个事件
Now it calls the <code>**props.onChange**</code> callback only after the user has finished typing, and prevents a lot of unnecessary events along the way.
(You can read about the differences between <code>[_.throttle](https://lodash.com/docs/4.17.4#throttle)</code> and <code>[_.debounce](https://lodash.com/docs/4.17.4#debounce)</code> <a href="https://css-tricks.com/debouncing-throttling-explained-examples/">here</a>)
现在只有在用户输入完成后才调用<code>** props.onChange **</code>回调函数，并且避免了很多不必要的调用。
（你可以阅读<code>[_.throttle]（https://lodash.com/docs/4.17.4#throttle）</code>和<code>[_.debounce]（https://lodash.com/docs/） 4.17.4＃debounce）</code>[here]（<a href="https://css-tricks.com/debouncing-throttling-explained-examples/））">https://css-tricks.com/debouncing-throttling-explained-examples/））</a></p>
<h3>In Conclusion</h3>
<p>结论
These tools should help you handle the performance pitfalls we can encounter in a React app. By using shouldComponentUpdate wisely, controlling the changes you do to the DOM, and putting your callbacks on delay with debounce/throttle, you can improve your app’s performance greatly.
这些工具应该可以帮助您处理在React应用程序中遇到的性能问题。 通过严格地使用shouldComponentUpdate，控制你对DOM所作的改变，并通过debounce / throttle来延迟你的回调，可以大大提高你的应用程序的性能。
If you want to test all of those in real life situations, check out <a href="https://github.com/myheritage/UiZoo.js">UiZoo</a>. It’s a dynamic component library for React components, and it parses your components and showcases them for you to either develop, test, or share with others.
详情请看[UiZoo]（<a href="https://github.com/myheritage/UiZoo.js）。">https://github.com/myheritage/UiZoo.js）。</a> 它是React的一个动态组件库，可以分析你的组件并且可以开发，测试或与他人共享。.
Thank you for reading. Drop me a line and let me know if this helped you ?
感谢您的阅读。 给我一个赞，让我知道这篇文章对你有用。
Thanks to <a href="https://medium.com/@mayan.cohen?source=post_page">Maayan Cohen</a>. </p>
<ul>
<li><p><a href="https://medium.com/tag/javascript?source=post">JavaScript</a></p>
</li>
<li><p><a href="https://medium.com/tag/react?source=post">React</a></p>
</li>
<li><p><a href="https://medium.com/tag/shouldcomponentupdate?source=post">Shouldcomponentupdate</a></p>
</li>
<li><p><a href="https://medium.com/tag/dom?source=post">Dom</a></p>
</li>
<li><p><a href="https://medium.com/tag/components?source=post">Components</a></p>
</li>
</ul>
<p>2.4K7*   BlockedUnblockFollowFollowing</p>
<p><a href="https://medium.com/@noamel?source=footer_card" title="Go to the profile of Noam Elboim"><img src="http://p0.qhimg.com/t0122dc47179dc62665.png" alt="Go to the profile of Noam Elboim"></a>
[！[转到Noam Elboim的个人资料]（<a href="http://p0.qhimg.com/t0122dc47179dc62665.png）]（https://medium.com/@noamel?source=footer_card“转到Noam">http://p0.qhimg.com/t0122dc47179dc62665.png）]（https://medium.com/@noamel?source=footer_card“转到Noam</a> Elboim的个人资料“）</p>
<h3><a href="https://medium.com/@noamel" title="Go to the profile of Noam Elboim">Noam Elboim</a></h3>
<p>Tech Lead &amp; Web Developer <a href="http://twitter.com/MyHeritage" title="Twitter profile for @MyHeritage">@MyHeritage</a>
技术主管和网页开发人员[@MyHeritage]（<a href="http://twitter.com/MyHeritage“@MyHeritage的Twitter个人资料”）">http://twitter.com/MyHeritage“@MyHeritage的Twitter个人资料”）</a></p>
<pre><code class="hljs asciidoc"><span class="hljs-bullet">*   </span>Follow

</code></pre><p><a href="https://medium.com/myheritage-engineering?source=footer_card" title="Go to MyHeritage Engineering"><img src="http://p0.qhimg.com/t01fdc0b2884f8cf048.jpg" alt="MyHeritage Engineering"></a></p>
<h3><a href="https://medium.com/myheritage-engineering?source=footer_card">MyHeritage Engineering</a></h3>
<p>MyHeritage is the world’s fastest-growing destination for discovering and preserving your family history. Trusted by millions of families, we provide an easy way to share family stories, past and present, and treasure them for generations to come. <a href="https://careers.myheritage.com/">https://careers.myheritage.com/</a>
MyHeritage是发现和保存家族历史的世界上增长最快的目的地。 受到数百万家庭的信赖，我们提供了一种简单的方式来分享过去和现在的家庭故事，并珍惜他们的代代相传。[<a href="https://careers.myheritage.com/]">https://careers.myheritage.com/]</a>(<a href="https://careers.myheritage.com/）">https://careers.myheritage.com/）</a></p>
<ul>
<li>2.4K</li>
</ul>
<p><a href="https://medium.com/myheritage-engineering" title="Go to MyHeritage Engineering"><img src="http://p0.qhimg.com/t01f4de5b40a52e4fb3.jpg" alt="MyHeritage Engineering"></a></p>
<p>Never miss a story from <strong>MyHeritage Engineering</strong>, when you sign up for Medium. <a href="https://medium.com/@Medium/personalize-your-medium-experience-with-users-publications-tags-26a41ab1ee0c#.hx4zuv3mg">Learn more</a>Never miss a story from <strong>MyHeritage Engineering</strong>Get updatesGet updates
不要错过<strong> MyHeritage Engineering </strong>的故事，当您注册Medium时。 [了解更多]（<a href="https://medium.com/@Medium/personalize-your-medium-experience-with-users-publications-tags-26a41ab1ee0c#.hx4zuv3mg）不要错过*">https://medium.com/@Medium/personalize-your-medium-experience-with-users-publications-tags-26a41ab1ee0c#.hx4zuv3mg）不要错过*</a>* MyHeritage Engineering的故事**获取updatesGet 更新</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何大幅度提升React应用性能

## 原文链接
[https://www.zcfy.cc/article/how-to-greatly-improve-your-react-app-performance-myheritage-engineering-medium](https://www.zcfy.cc/article/how-to-greatly-improve-your-react-app-performance-myheritage-engineering-medium)

