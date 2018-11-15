---
title: Vue.js是如何做到数据响应的？
hidden: true
categories: reprint
slug: a86700c5
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <p>许多前端JavaScript框架（例如Angular，React和Vue）都有自己的<em>数据相应</em>引擎。通过了解相应性及其工作原理，您可以提高开发技能并更有效地使用JavaScript框架。在视频和下面的文章中，我们构建了您在Vue源代码中看到的相同类型的Reactivity。</p>
<p>如果您观看此视频而不是阅读文章，请观看系列中的下一个<a href="https://www.vuemastery.com/courses/advanced-components/evan-you-on-proxies/">视频</a>，与Vue的创建者Evan You讨论反应性和代理。</p>
<h3>💡 The Reactivity System</h3>
<p>当你第一次看到它时，Vue的<em>响应系统</em>看起来很神奇。拿这个简单的Vue应用程序：</p>
<p><img src="https://p0.ssl.qhimg.com/t0154ae710098cb7bdd.png" alt=""></p>
<p><img src="https://p0.ssl.qhimg.com/t01a0f7e53bb61f144a.png" alt=""></p>
<p>不知何故，Vue只知道如果价格发生变化，它应该做三件事：</p>
<ul>
<li>更新我们网页上的价格值。</li>
<li>重新计算乘以price * quantity的表达式，并更新页面。</li>
<li>再次调用totalPriceWithTax函数并更新页面。</li>
</ul>
<p>但是等等，你应该会觉得奇怪，当价格变化时，Vue如何知道要更新什么，以及它如何跟踪所有内容？</p>
<p><img src="https://p0.ssl.qhimg.com/t01b7a3a19a1d421399.jpg" alt=""></p>
<p><strong>这不是JavaScript编程常规的工作方式。</strong></p>
<p>如果你不明白，那我们试着看看常规的JavaScript是怎么运行的。例如，如果我运行此代码：</p>
<p><img src="https://p0.ssl.qhimg.com/t01b7f2adf45312f1b5.png" alt=""></p>
<p>你觉得它打印什么？由于我们没有使用Vue，它将打印10。</p>
<p><img src="https://p0.ssl.qhimg.com/t012c51aae157ae058d.png" alt=""></p>
<p>在Vue，我们希望每当价格或数量更新时，总计都会得到更新。我们想要：</p>
<p><img src="https://p0.ssl.qhimg.com/t010f7bff590c7b776c.png" alt=""></p>
<p>不幸的是，JavaScript是程序性的，而不是被动的，所以这在现实生活中不起作用。为了使数据变化得到相应，我们必须使用JavaScript来使事情表现不同。</p>
<h3>⚠️ 问题</h3>
<p>我们需要保存计算总数的方式，以便在价格或数量变化时重新运行。</p>
<h3>✅ 解决方案</h3>
<p>首先，我们需要一些方法告诉我们的应用程序，“我即将运行的代码，存储它，我可能需要你在另一个时间运行它。”然后我们将要运行代码，如果价格或数量变量得到更新，再次运行存储的代码。</p>
<p><img src="https://p0.ssl.qhimg.com/t01234425aac94090ce.png" alt=""></p>
<p>请注意，我们在目标变量中存储了一个匿名函数，然后调用了一个记录函数。使用ES6箭头语法我也可以这样写：</p>
<p><img src="https://p0.ssl.qhimg.com/t01467b32ed0eb9f8e4.png" alt=""></p>
<p>请注意，我们在目标变量中存储了一个匿名函数，然后调用了一个记录函数。使用ES6箭头语法我也可以这样写：</p>
<p><img src="https://p0.ssl.qhimg.com/t0136f768c05057afcc.png" alt=""></p>
<p>记录的方法：</p>
<p><img src="https://p0.ssl.qhimg.com/t01b38e3b04970b2cb4.png" alt=""></p>
<p>我们正在存储目标（在我们的例子中是{total = price * quantity}），所以我们可以稍后运行它。</p>
<p><img src="https://p0.ssl.qhimg.com/t018285653e0944c07f.png" alt=""></p>
<p>这将遍历存储阵列中存储的所有匿名函数并执行它们中的每一个。</p>
<p>然后在我们的代码中，我们可以：</p>
<p><img src="https://p0.ssl.qhimg.com/t010117fe2d58bd5be3.png" alt=""></p>
<p>很简单吧？如果您需要阅读并尝试再次掌握它，这里的代码就完整了。仅供参考，如果您想知道原因，我会以特定的方式对此进行编码。</p>
<p><img src="https://p0.ssl.qhimg.com/t016ce42ad775bf85b1.png" alt=""></p>
<p><img src="https://p0.ssl.qhimg.com/t01fd3f40a4a6608203.png" alt=""></p>
<h3>⚠️ 问题</h3>
<p>我们可以根据需要继续记录目标，但是有一个更强大的解决方案可以扩展我们的应用程序。那就是一个负责维护目标列表的类，当我们需要它们重新运行时，这些目标列表会得到通知。</p>
<h3>✅ 解决方法: 使用Class</h3>
<p>我们可以开始解决这个问题的一种方法是将这种行为封装到它自己的<em>Class</em>中，这是一个实现标准编程观察者模式的依赖类。</p>
<p>因此，如果我们创建一个JavaScript类来管理我们的依赖项（它更接近Vue处理事物的方式），它可能看起来像这样：</p>
<p><img src="https://p0.ssl.qhimg.com/t01926a919e4d619416.png" alt=""></p>
<p>让它运行：</p>
<p><img src="https://p0.ssl.qhimg.com/t01665b8eb508e24364.png" alt=""></p>
<p>它仍然有效，现在我们的代码感觉更可靠了。只有仍然感觉有点奇怪的是target（）的设置和运行。</p>
<h3>⚠️ 问题</h3>
<p>我们将为每个变量设置一个Dep类，并且很好地封装了创建需要监视更新的匿名函数的行为。也许观察者功能可能是为了处理这种行为。</p>
<p><img src="https://p0.ssl.qhimg.com/t01796fad593d3cf4b2.png" alt=""></p>
<p>（这只是上面的代码）</p>
<p>我们可以改为：</p>
<p><img src="https://p0.ssl.qhimg.com/t0103232361ec720f29.png" alt=""></p>
<h3>✅ 解决方案：观察者功能</h3>
<p>在我们的Watcher功能中，我们可以做一些简单的事情：</p>
<p><img src="https://p0.ssl.qhimg.com/t017191eba0aae4e942.png" alt=""></p>
<p>如您所见，watcher函数接受myFunc参数，将其设置为我们的全局目标属性，调用dep.depend（）以将目标添加为订阅者，调用目标函数并重置目标。</p>
<p>现在，当我们运行以下内容时：</p>
<p><img src="https://p0.ssl.qhimg.com/t018fd299b9c9c45034.png" alt=""></p>
<p><img src="https://p0.ssl.qhimg.com/t01e18179b4b7cd4a61.png" alt=""></p>
<p>您可能想知道为什么我们将target实现为全局变量，而不是将其传递到我们需要的函数中。
这有一个很好的理由，这将在我们的文章结尾处揭晓。</p>
<h3>⚠️ 问题</h3>
<p>我们有一个Dep类，但我们真正想要的是每个变量都有自己的Dep。在我们继续之前，先存储一下数据。</p>
<p><img src="https://p0.ssl.qhimg.com/t014b2fe04a78121b7a.png" alt=""></p>
<p>让我们假设我们的每个属性（价格和数量）都有自己的内部Dep类。</p>
<p><img src="https://p0.ssl.qhimg.com/t011a4bd8710782f3d6.png" alt=""></p>
<p>当我们运行时：</p>
<p><img src="https://p0.ssl.qhimg.com/t01626855c7bf9a089b.png" alt=""></p>
<p>由于访问了data.price值，我希望price属性的Dep类将我们的匿名函数（存储在目标中）推送到其订阅者数组（通过调用dep.depend（））。由于访问了data.quantity，我还希望quantity属性Dep类将此匿名函数（存储在目标中）推送到其订阅者数组中。</p>
<p><img src="https://p0.ssl.qhimg.com/t0197075aab4f5ccc5f.png" alt=""></p>
<p>如果我有另一个匿名函数，只访问data.price，我希望只推送到价格属性Dep类。</p>
<p><img src="https://p0.ssl.qhimg.com/t011a470a0bb77d41a7.png" alt=""></p>
<p>我什么时候想要在价格订阅者上调用dep.notify（）？我希望在设定价格时调用它们。在文章的最后，我希望能够进入控制台并执行：</p>
<p><img src="https://p0.ssl.qhimg.com/t01916262fec7d889b7.png" alt=""></p>
<p>我们需要一些方法来挂钩数据属性（如价格或数量），所以当它被访问时我们可以将目标保存到我们的订阅者数组中，当它被更改时，运行存储在我们的订阅者数组中的函数。</p>
<h3>✅ 解决方案：Object.defineProperty（）</h3>
<p>我们需要了解<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty">Object.defineProperty()</a>函数，它是简单的ES5 JavaScript。它允许我们为属性定义getter和setter函数。在我向您展示如何在Dep类中使用它之前，先简单展示一下改函数的用法。</p>
<p><img src="https://p0.ssl.qhimg.com/t0119a7b374477461e6.png" alt=""></p>
<p><img src="https://p0.ssl.qhimg.com/t01eb792137128485a5.png" alt=""></p>
<p>如您所见，它只记录两行。但是，它实际上并没有获取或设置任何值，因为我们过度使用了该功能。我们现在加回来吧。 get（）期望返回一个值，而set（）仍然需要更新一个值，所以让我们添加一个internalValue变量来存储我们当前的价格值。</p>
<p><img src="https://p0.ssl.qhimg.com/t01ac5456941e9b0e15.png" alt=""></p>
<p>既然我们的get和set工作正常，您认为将打印到控制台的是什么？</p>
<p><img src="https://p0.ssl.qhimg.com/t01936ba1d723df3e73.png" alt=""></p>
<p>因此，当我们获取并设置值时，我们可以获得通知。通过一些递归，我们可以为数组中的所有项运行它</p>
<p>FYI，Object.keys（data）返回对象键的数组。</p>
<p><img src="https://p0.ssl.qhimg.com/t013b4f19fa64171c21.png" alt=""></p>
<p>现在一切都有getter和setter，我们在控制台上看到了这一点。</p>
<p><img src="https://p0.ssl.qhimg.com/t01b5714ad3658d2e28.png" alt=""></p>
<h3>🛠 Putting both ideas together</h3>
<p><img src="https://p0.ssl.qhimg.com/t01b1fea71275982b30.png" alt=""></p>
<p>当像这样的一段代码运行并获得价格的价值时，我们希望价格记住这个匿名函数（目标）。这样，如果价格变化，或者设置为新值，它将触发此函数以重新运行，因为它知道此行依赖于它。所以你可以这样想。</p>
<p>Get =&gt;记住这个匿名函数，当我们的值发生变化时，我们会再次运行它。</p>
<p>Set =&gt;运行保存的匿名函数，我们的值刚改变。</p>
<p>或者就我们的Dep Class而言</p>
<p><strong>Price accessed (get)</strong> =&gt; 调用dep.depend（）来保存当前目标</p>
<p><strong>Price set</strong> =&gt; 在价格上调用dep.notify（），重新运行所有目标</p>
<p>让我们结合这两个想法，并完成我们的最终代码。</p>
<p><img src="https://p0.ssl.qhimg.com/t015c75497a5add7934.png" alt=""></p>
<p>现在看看会发生什么。</p>
<p><img src="https://p0.ssl.qhimg.com/t01b06e078e952b85dc.png" alt=""></p>
<p>正是我们所希望的！价格和数量都确实是得到了实时的响应的！只要价格或数量的价值得到更新，我们的总代码就会重新运行。</p>
<p>Vue文档中的这个插图现在应该开始有意义了。</p>
<p><img src="https://p0.ssl.qhimg.com/t0166c573c58763fc45.png" alt=""></p>
<p>你看到那个漂亮的紫色数据圈了吗？看起来应该很眼熟！每个组件实例都有一个从getter(红线)收集依赖项的服务观察器实例(蓝色)。当稍后调用设置程序时，它会通知监视程序，它将导致组件重新呈现。下面是我自己的一些注释的图片。</p>
<p><img src="https://p0.ssl.qhimg.com/t01bc2b3e7c7af122fd.png" alt=""></p>
<p>是的，现在是不是觉得更有意义了。</p>
<p>显然，Vue做的可能更复杂更惊喜，但你现在知道了基础知识。</p>
<h3>⏪ 总结：所以我们学了什么？</h3>
<ul>
<li>如何创建一个Dep类来收集依赖项（依赖）并重新运行所有依赖项（notify）。</li>
<li>如何创建一个观察程序来管理我们正在运行的代码，这些代码可能需要作为依赖项添加（target）。</li>
<li>如何使用Object.defineProperty（）创建getter和setter。</li>
</ul>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/the-best-explanation-of-javascript-reactivity](https://www.zcfy.cc/article/the-best-explanation-of-javascript-reactivity)
原文标题: Vue.js是如何做到数据响应的？
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
