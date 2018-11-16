---
title: 现代 js 框架存在的根本原因
hidden: true
categories: [reprint]
slug: 52a4b9a5
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <p>我曾见过很多很多人盲目地使用（前端）框架，如 React，Angular 或 Vue等等。这些框架提供了许多有意思的东西，然而通常人们（自以为）使用框架是因为：</p>
<ul>
<li>它们支持组件化；</li>
<li>它们有强大的社区支持；</li>
<li>它们有很多（基于框架的）第三方库来解决问题；</li>
<li>它们有很多（很好的）第三方组件;</li>
<li>它们有浏览器扩展工具来帮助调试；</li>
<li>它们适合做单页应用。</li>
</ul>
<p><img src="https://p0.ssl.qhimg.com/t01520df2f766db5bb7.gif" alt=""></p>
<p>但这些都<strong>不是</strong>使用框架的根本原因。</p>
<p>最最本质的原因是：</p>
<p><img src="https://p0.ssl.qhimg.com/t01b014122d190a5557.png" alt=""></p>
<p>（UI 与状态同步非常困难）</p>
<h3>是的，就是这原因，让我们来看看为什么</h3>
<p>假设你正在设计这样一个 Web 应用：用户可以通过群发电子邮件来邀请其他人（参加某活动）。UX/UI 设计师设计如下：（在用户填写任何邮箱地址之前，）有一个空白状态，并为此添加一些帮助信息；（当用户填写邮箱之后，）展示邮箱的地址，每个地址的右侧均有一个按钮用于删除对应的地址。</p>
<p><img src="https://p0.ssl.qhimg.com/t01a93a13bd1853564f.png" alt=""></p>
<p>这个表单的状态，可以被设计为一个数组，里面包含若干对象，对象由邮箱地址和唯一标识组成。开始的时候，数组为空。当（用户）输入邮箱地址并按下回车键之后，往数组中添加一项并<em>更新 UI</em>。当用户点击删除按钮时，删除（数组中对应的）邮箱地址并<em>更新 UI</em>。你感觉到了吗？<strong>每当你改变状态时，你都需要更新 UI</strong>。</p>
<p>（你可能会说：）那又怎样？好吧，让我们看看如何在不用框架的情况下实现它：</p>
<h3>用原生（JS）实现相对复杂的 UI</h3>
<p>以下代码很好地说明了使用原生 JavaScript 实现一个相对复杂的 UI 所需的工作量，使用像  jQuery 这样<em>经典的</em>库也需要差不多的工作量。</p>
<p>在这个例子中，HTML 负责创建静态页面，JavaScript 通过 <code>document.createElement</code> 动态改变（DOM 结构）。这引来了第一个问题：构建 UI 相关的 JavaScript 代码并不直观易读，我们将 UI 构建分为了两部分（译者注：应该是指 HTML与 JavaScript 两部分）。尽管我们使用了 <code>innerHTML</code>，可读性是增强了，但降低了（页面的）性能，同时可能存在 CSRF 漏洞。我们也可以使用模板引擎，但如果是大面积地修改 DOM，会面临两个问题：效率不高与需要重新绑定事件处理器。</p>
<p>但这也不是（不使用框架的）最大问题。最大的问题是<strong>每当状态发生改变时都要（手动）更新 UI</strong>。每次状态更新时，都需要很多代码来改变 UI。当添加电子邮件地址时，只需要两行代码来更新状态，但要十三行代码更新 UI。（此例中）我们已经让 UI （界面与逻辑）尽可能简单了！！</p>
<p><img src="https://p0.ssl.qhimg.com/t01db0c98185d3d42ce.png" alt=""></p>
<p>代码既难写又难理解，更麻烦的是<strong>它非常脆弱</strong>。假设我们需要（添加）同步服务器数据到邮件地址列表的功能，我们需要对比服务器返回结果与数组中数据的差异。这涉及对比所有数据的标识与内容，（当用户修改后，）可能需要在内存中保留一份标识相同但内容不同的数据。</p>
<p>为了高效地改变 DOM，我们需要编写大量点对点（译者注：指状态到 UI）的代码。但<strong>只要你犯下了很小的错误，UI 与状态将不再保持同步</strong>：（可能会出现）丢失或呈现错误的信息、不再响应用户的操作，更糟糕的是触发了错误的动作（如点了删除按钮后删除了非对应的一项）。</p>
<p>因此，保持 UI 与状态同步，需要编写大量乏味且非常脆弱的代码。</p>
<h3>响应式 UI 拯救一切</h3>
<p><img src="https://p0.ssl.qhimg.com/t01e4816a9ccd93464b.jpg" alt=""></p>
<p>所以，（之所以使用框架，）不是因为社区，不是因为工具，不是因为生态，不是因为第三方库......</p>
<blockquote>
<p>目前为止，框架最大的改进是（为我们）提供了应用内部状态与 UI 同步的可靠保证。</p>
</blockquote>
<p>只要你清楚特定框架的某些（特定）规则（如不可变状态），就差不多（可以正常使用）了。</p>
<p><strong>我们只需要定义一次 UI 界面，不再需要为每个操作编写特定的 UI 代码，同时，每个相同的状态均有相同的输出（译者注：指 UI 一致）</strong>：当状态改变后，框架自动更新（对应的）视图。</p>
<h3>框架是如何工作的呢?</h3>
<p>基于两个基本的策略：</p>
<ul>
<li><p>重新渲染整个组件，如React。当组件中的状态发生改变时，在内存中计算出（新的）DOM 结构后与已有的 DOM 结构进行对比。实际上，这是非常昂贵的。因而采取（将真实 DOM）映射为虚拟 DOM ，通过对比状态变化前后虚拟 DOM 的不同，计算出变化后再改变真实 DOM 结构。这个过程称为调和（reconciliation）。</p>
</li>
<li><p>通过（添加）观察者监测变化，如 Angular 和 Vue.js。应用中状态的属性会被监测，当它们发生变化时，只有依赖了（发生变化）属性的 DOM 元素会被重新渲染。</p>
</li>
</ul>
<h3>那 Web components 呢?</h3>
<p>很多时候，人们会把 React、 Angular 和 Vue.js （等框架）与 <a href="https://www.webcomponents.org/">Web components</a> 进行对比。这显然体现了人们并不理解这些框架所提供的最大好处：保持 UI 与状态同步。Web components 并不提供这种同步机制。它<em>仅仅</em>提供了一个<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template">\&lt;template&gt;</a>标签，但它不提供任何（状态与 UI 之间的）协调机制。<strong>如果你在应用中使用 Web components 时，想保持 UI 与内部状态同步，则需要（开发者）手工完成，或者使用如</strong> <a href="https://stenciljs.com/"><strong>Stencil.js</strong></a> (内部和 React一样，使用虚拟 DOM)之类的库。</p>
<p>让我们明确一点：框架表现出的巨大潜力并不体现在组件化上，保持 UI 与状态同步才是具体的体现。Web components 并未提供相关的功能，你必须手工或使用第三方库去解决（同步的）问题。使用原生 JavaScript 去编写复杂、高效且易于维护的 UI 界面基本上是不可能的。<strong>这就是你需要使用现代 JavaScript 框架的根本原因。</strong></p>
<h3>自己动手，丰衣足食</h3>
<p>如果热衷于了解底层原理，想知道<a href="https://github.com/Matt-Esch/virtual-dom">虚拟 DOM 的具体实现</a>。那，为何不试着在不使用框架的情况下，仅使用虚拟 DOM 来重写<a href="https://codepen.io/gimenete/pen/vRZLrq">原生 UI</a>呢？</p>
<p>这里是框架的<em>核心</em>，所有组件的基础类。</p>
<p><img src="https://cdn-images-1.medium.com/max/1600/1*wqe8mY3MVDYL-oPEcB7b5Q.png" alt=""></p>
<p>这里是重写后的 AddressList 组件（借助 babel 来支持 JSX 的转换）。</p>
<p><img src="https://cdn-images-1.medium.com/max/1600/1*r6_pPT8W5216ptmhUjoPJQ.png" alt=""></p>
<p><strong>现在 UI 是声明式的</strong>，我们并未使用任何框架。我们能任意添加新逻辑来改变状态的同时，不需要编写额外的代码来保持 UI 同步。问题解决了！</p>
<p>现在，除了事件处理之外，这看起来就像个 React 应用对吧？我们有<code>haverender()</code> 、<code>componentDidMount()</code> 、<code>setState()</code> 等等。一旦解决了保持应用内 UI 与状态的同步问题，所有东西就会很自然地叠加起来（形成组件）。</p>
<p>可以在这个 <a href="https://github.com/gimenete/ui-state-sync">Github 仓库</a>中找到完整的源代码。</p>
<p><img src="https://cdn-images-1.medium.com/max/1600/1*4877k4Hq9dPdtmvg9hnGFA.jpeg" alt=""></p>
<h3>结论</h3>
<ul>
<li>现代 js 框架解决的主要问题是保持 UI 与状态同步。</li>
<li>使用原生 JavaScript 编写复杂、高效而又易于维护的 UI 界面几乎是不可能的。</li>
<li>Web components 并未提供解决同步问题的方案。</li>
<li>使用现有的虚拟 DOM 库去搭建自己的框架并不困难。但并不建议这么做！</li>
</ul>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/the-deepest-reason-why-modern-javascript-frameworks-exist](https://www.zcfy.cc/article/the-deepest-reason-why-modern-javascript-frameworks-exist)
原文标题: 现代 js 框架存在的根本原因
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
