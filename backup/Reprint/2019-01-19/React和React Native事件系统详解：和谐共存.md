---
title: 'React和React Native事件系统详解：和谐共存' 
date: 2019-01-19 2:30:10
hidden: true
slug: 4q3ewqvqbsy
categories: [reprint]
---

{{< raw >}}

            <h2><em>使用它，喜欢它，但是你真的了解它吗？知道React事件如何在底层处理实现吗？</em></h2>
<p>已经有很多帖子解释了如何使用React的事件处理系统，但是并没有多少帖子是在解释他们是“如何工作”的。最近我一直在研究React Native，我和“事件处理”的斗争过程提醒我了了解_巧合_是多么的重要。因此，我决心收集尽可能多的有关React事件处理的信息：以下是我在[源代码]（<a href="https://github.com/facebook/react）">https://github.com/facebook/react）</a>
中找到相关信息的总结报告。</p>
<p>让我们开始React事件之旅吧！</p>
<h3>关于React事件处理：概况</h3>
<p>从概念的角度说，React中的事件处理并不是什么技术革命，它的目标就是拦截各种事件(比如点击、触摸...)，然后触发程序员编辑的相关回调函数。这种<em>处理方式</em>使得React的事件处理方式脱颖而出。</p>
<p><img src="https://p0.ssl.qhimg.com/t016eab6eae216d3acb.jpg" alt="">
React事件处理流程图</p>
<p>React强调的一点是和谐统一：跨浏览器的React web，跨平台的React Native。但事件系统通过为<em>React web 和 React Native</em>创建（几乎）一样的事件处理系统，通过这种方式将这一概念向前推进了一步。
这种想法应该是正确的：同时使用DOM和Native事件——减去一点预处理 ——使用<em>完全相同的代码</em>。 React如何揭开这个魔术之谜的呢？这可能是一篇文章的主题（可能写成系列，也有可能这有这么一篇），所以先让我们试着简要的说说。</p>
<h3>欢迎来到Fiber的魔法世界</h3>
<p>当一个APP更新的时候会发生什么(就是点击更新按钮之后)？新的信息被传播，应用程序被重新渲染。当前，React（web或者native）的核心思想是将上述过程分为两个阶段：“调和”—— React将计算两次文件的不同并决定那一部分需要更新；“渲染”——确定需要更新的位置并更新。看问题的关键在哪？对<strong>调和的阶段不关心如何、在哪渲染，只是关注什么需要被渲染</strong>。因此，这一阶段可以看作是React Native和React web共同流程。剩下的唯一任务就是插入适当的渲染引擎了。
事件处理是“调和”阶段的一部分，因此发生在同一抽象世界中，在那里浏览器事件和DOM组件与Native事件和组件没有区别。那个世界应该是什么样子的呢？因为我们习惯用有形的可见的事物去类比思考，所以用图片描述它可能有些复杂，但是我们可以明确的是在那个平行宇宙，每一个组件都可以看作是<code>Fiber</code>。确实，React的调和算法不关心组件是如何被渲染的，仅仅关心两次渲染之间的差别，组件本身是不重要的。只有当组件先前的状态和新状态之间存在变化它才会起作用(如果没有变化，自然不起作用)。这就是<code>Fiber</code>：它不是物理实体只是个工作单位，是调和过程中的一小步。</p>
<p>对于那些被上文介绍的<code>Fiber</code>吸引的读者，我建议可以去深入的了解<code>Fiber</code>和React Fiber。这些<a href="https://www.youtube.com/watch?v=ZCuYPiUIONs&amp;t=1267s">视频</a>( <a href="https://medium.com/@linclark">作者：Lin Clark</a> )也许是个不错的开始。如果你不是很能理解<code>Fiber</code>的概念也不要担心，这并不是必须的，文章的剩余部分也没有以它为中心将讲开去，只需了解<code>Fiber</code>的交换是个新概念，事件管理系统并没有在此经历任何重大的变化。需要记住的是，<strong>React工作在“抽象的世界”，在那里更新独立于组件的物理表示形式而进行：复杂的现实世界中（浏览器，你的手机...），组件被渲染的位置仅是那个唯一的独立设备的宇宙的投影。事务处理没有什么特别的，几乎所有的事都发生在那“抽象的世界”，纠结于事件是来着DOM的还是Native的，似乎并不重要。</strong></p>
<p>在事件处理中，“监听、规范化和再发射”阶段的存在恰恰是为了将真实事件和组件转化为抽象对象。 它捕获来自组件的Native事件，并将它们转换为React中被称为<code>topLevelType</code>与<code>Fiber</code>相关联的东西。 因此，Native事件和组件本身对下游事件处理系统是不可见的，并且没有处理程序安装在“真实”环境中：所有事件都发生在虚拟DOM中。</p>
<h3>接收（监听）事件</h3>
<p>通过上图我们可以知道，任何情况下，事件的处理都是从监听阶段开始。这并不难理解，毕竟很多人在编程过程中都习惯自定义监听器，比如只对<code>click</code>而不是<code>mousescroll</code>作出反应。但为什么React本身需要监听所有事件呢？ 其实这是因为事件出现在他们的“自然”环境中：用于Web应用程序的DOM，以及移动设备上的Native应用程序。无论是网络还是Native，React都是在这些基本环境的基础上建立的工具。 因此，<strong>事件不会主动地返回给React，而是需要React主动监听</strong>。</p>
<h4>接收事件：React web</h4>
<p>对于React web而言，这个过程比较简单，即<strong>top-level delegation</strong>。 这意味着React监听<code>document</code>级别的每个事件，这还有一个有趣的事儿：到执行任何与React相关的代码时，这个事件已经经过了DOM树上的第一个捕获/冒泡循环。
当从浏览器接收到该事件后，React将执行另一个跨浏览器协调步骤。 
作为针对实际上是同一事件的不同名称的浏览器的解决方法，React定义了“topLevelTypes”，作为实际是同一事件但浏览器有给予不同命名的解决办法。它们是针对浏览器特定事件的包装，例如，<code>transitionEnd</code>，<code>webkitTransitionEnd</code>，<code>MozTransitionEnd</code>和<code>oTransitionEnd</code>全都成为<code>topAnimationEnd</code> ，这种方法有效缓解了设计跨浏览器应用程序的痛苦。</p>
<h4>接收事件: React Native</h4>
<p>对于React Native而言，事件通过<strong>Native代码和React相连接的网桥进行接收</strong>。 简单的说，无论何时创建View，React都会将其ID号传递给Native，以便能够接收与该元素相关的所有事件。 然后，在向下传递（touch）事件之前执行一些轻微修改，包括将“touches”和“changedTouches”添加到事件以使其符合<a href="https://www.w3.org/TR/touch-events/#idl-def-TouchEvent">W3标准 </a>。</p>
<p>从现在开始，为了与之后要介绍的<code>SyntheticEvents</code>相区分开，我们将上文提到的事件”（即来自Native或浏览器，被轻微修改的事件对象）称为 “Native事件”。</p>
<h3>React事件管理系统内部一览</h3>
<p>现在我们的Native活动，可以跨平台和浏览器进行协调。完美！接下来我们开始准备真正的工作：将这些事件传递给适当的回调函数。React事件系统的真正职责。让我们仔细看看：</p>
<p><img src="https://p0.ssl.qhimg.com/t01a24525617c078234.jpg" alt="">
React事件系统中的事件流</p>
<p>到处都是事件，尽管如此， <code>EventPluginHub</code>及其事件插件还是非常出色。 <code>EventPluginHub</code>实际上是整个系统的基石，因为它：</p>
<ul>
<li>为事件插件注入提供统一的接口。</li>
<li>每接收到一个新的Native事件时，都会通过注入的插件运行，在调度之前返回<code>SyntheticEvents</code> 。</li>
</ul>
<p>另一方面，事件插件都具有相似的结构，将Native事件作为输入，输出一个或多个<code>SyntheticEvents</code>，并在后面执行一系列调度（函数）。 <code>SyntheticEvent</code>是React对Native事件的特定包装，基本上和大家已经习惯的浏览器事件具有相同的接口，包括<code>stopPropagation（）</code>和<code>preventDefault（）</code>（官方文档事件有一个专门的页面可以提供更多的信息<a href="https://reactjs.org/docs/events.html">点击这儿</a>)</p>
<h4>事件插件</h4>
<p>尽管有各种不同的事件插件，如<code>SimpleEventPlugin</code>（<code>onClick</code>，<code>onTouch</code>等等）和非常有名的<code>ResponderEventPlugin</code>，它们都遵循相同的模式：</p>
<ol>
<li>根据Native事件创建一个或多个<code>SyntheticEvent</code>。.</li>
<li>收集与<code>SyntheticEvent</code>（例如<code>onTouchStart = {doStuff}</code>中的<code>doStuff</code>）相关的所有调度（即你提供的函数，编码器）。</li>
<li>将每个“SyntheticEvent”与其调度一起返回。</li>
</ol>
<p>值得注意的是<strong>实际上没有调度任何插件</strong>，因为它只收集自己的函数。（大多数时候，也就是说，一些插件在收集阶段执行一些特定的调度，但这是例外情况而并非常态）。<code>SyntheticEvent</code>可以简单地镜像Native事件（比如<code>click</code>或<code>drag</code>），或者更复杂一些（比如<code>touchTap</code>），但是在所有情况下它们都会返回调度数组，以便“准备处理“。</p>
<p>为了收集调度，React对组件进行双重遍历（无论是Native的还是DOM），具有从根到嵌套目标（捕获阶段）回到根（冒泡阶段）的捕获和冒泡阶段。</p>
<p><img src="https://p0.ssl.qhimg.com/t01f96d9beee3ac38cb.jpg" alt="">
双遍历</p>
<p>请注意，对于所有不同的调度（在插件本身之外执行的调度，即大部分调度），双遍历普遍会发生。诸如<code>stopPropagation（）</code>之类的中断将在调度中生效，从而有效地阻止了此<code>SyntheticEvent</code>的后续函数的执行（参见结论）。</p>
<h4>关于<code>EventPluginHub</code></h4>
<p>当应用程序启动时，所有事件插件都被注入到<code>EventPluginHub</code>中，并且按照配置文件对其排序。在运行工程中，每一次接收到Native事件时，<code>EventPluginHub</code>都将执行以下操作：</p>
<ol>
<li>对于每个插件（按顺序），收集所有<code>SyntheticEvents</code>及其调度配置并将它们存储在队列中。</li>
<li>对队列中的所有事件执行相应的调度，并将其从队列中清除。</li>
</ol>
<p>就是这样！ 你的回调函数就是通过这种方式进行工作的。:)</p>
<h3>总结 &amp; 结论</h3>
<p>An interesting consequence of this system is that <strong>a single native event can (and will, most of the time) generate multiple</strong> <code>**SyntheticEvent**</code><strong>s, each with a scope limited to the plugin that created it</strong>. This means that:
有趣的是在这个系统中<strong>一个native事件可以(大多数情况下)生成多个</strong> <code>**SyntheticEvent**</code><strong>每一个的工作范围在创建它的组件里</strong>。这意味着：</p>
<ul>
<li>只有<code>SyntheticEvent</code>中的<code>nativeEvent</code>部分将从插件传递给插件，所以对<code>nativeEvent</code>的修改可能会影响后续插件的执行，但对<code>SyntheticEvent</code>的修改则不能。</li>
<li>由于<code>SyntheticEvent</code>的范围有限，所以<code>stopPropagation（）</code>等调用方法仅适用于单一事件插件。</li>
</ul>
<p>为第二点举个例子，假设我们有两个插件<code>A</code>和<code>B</code>，分别定义了合成事件<code>eventA</code>和<code>eventB</code>。假设这些事件在冒泡阶段被称为<code>onEventA</code>和<code>onEventB</code>，在捕获阶段被称为<code>onEventACapture</code>和<code>onEventBCapture</code>。最后，两者都由相同的topLevelType（例如<code>topClick</code>）触发，命令为<code>[A, B]</code>。现在考虑React Native中的以下代码（只需将<code>View</code>替换为React web的<code>div</code>）：</p>
<pre><code class="hljs scala"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span>(
      &lt;<span class="hljs-type">View</span>
        onEventA={(evt) =&gt; console.log(<span class="hljs-symbol">'onEvent</span>A')}
        onEventB={(evt) =&gt; console.log(<span class="hljs-symbol">'onEvent</span>B')}&gt;
        &lt;<span class="hljs-type">View</span>
          onEventACapture={(evt) =&gt; evt.stopPropagation()}
        /&gt;
      &lt;/<span class="hljs-type">View</span>&gt;
    )
  }
}
</code></pre><p>任何点击事件都会先触发<code>eventA</code>的捕获阶段，在嵌套组件中调用<code>stopPropagation（）</code>将有效地防止后续冒泡阶段。因此，'onEventA'不会出现。 但是，由于<code>eventB</code>已经被定义在不同的插件中，因此依赖于不同的<code>SyntheticEvent</code>，所以<code>**'onEventB'**</code><strong>将会在控制台输出</strong>。 虽然这是一个相当极端的情况，但我们导致意外情况发生的时机。</p>
<hr>
<p>关于React的事件处理系统还有很多的话要说，比如<a href="https://reactjs.org/docs/events.html#event-pooling"><code>SyntheticEvents</code> </a>，为了避免矫枉过正我就不在这儿提及了。</p>
<p>通过阅读源码(可惜关于这个主题没有太多深入的文档)和观看<a href="https://www.youtube.com/watch?v=dRo_egw7tBc">视频</a>(<a href="https://medium.com/@kentcdodds">作者：Kent C. Dodds</a>, <a href="https://medium.com/@dan_abramov">Dan Abramov</a>)，希望你也可以和我一样有所收获！</p>
<p>接下来，我将继续深入地学习，看看引擎下的东西是如何运行的。</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React和React Native事件系统详解：和谐共存

## 原文链接
[https://www.zcfy.cc/article/the-react-and-react-native-event-system-explained-a-harmonious-coexistence](https://www.zcfy.cc/article/the-react-and-react-native-event-system-explained-a-harmonious-coexistence)

