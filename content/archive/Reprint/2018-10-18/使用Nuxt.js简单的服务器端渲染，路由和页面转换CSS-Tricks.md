---
title: 使用Nuxt.js简单的服务器端渲染，路由和页面转换CSS-Tricks
reprint: true
categories: reprint
abbrlink: 28b3438b
date: 2018-10-18 00:00:00
---

{{% raw %}}

            <p>有点罗嗦的标题，是吧？什么是服务器端渲染？它与路由和页面转换有什么关系？什么是Nuxt.js？有趣的是，尽管听起来很复杂，但使用Nuxt.js并探索其好处并不困难。让我们开始吧！</p>
<h3>服务器端渲染</h3>
<p>最近你可能听说过人们在谈论服务器端渲染。我们研究了最近用<a href="https://css-tricks.com/server-side-react-rendering/">React做的一种方法</a> 。一个特别引人注目的方面是性能优势。当我们在服务器上呈现我们的HTML，CSS和JavaScript时，我们通常使用较少的JavaScript来解析最初和随后的更新。<a href="http://openmymind.net/2012/5/30/Client-Side-vs-Server-Side-Rendering/">本文</a> 很好地深入讨论了这个问题。我最喜欢的是：</p>
<blockquote>
<p>通过在服务器上渲染，您可以缓存数据的最终形状。</p>
</blockquote>
<p>不用从服务器获取JSON或其他信息，解析它，然后使用JavaScript创建这些信息的布局，我们在前期做了大量计算，只发送了我们需要的实际HTML，CSS和JavaScript 。这可以通过缓存，搜索引擎优化以及加速我们的应用程序和网站获得很多好处。</p>
<h3>什么是 Nuxt.js?</h3>
<p>服务器端渲染听起来很不错，但你可能想知道是否难以设置。我最近一直在为我的Vue应用程序使用<a href="https://nuxtjs.org/">Nuxt.js</a> ，并发现使用它非常简单。要清楚：你不需要特别使用Nuxt.js来做服务器端渲染。我只是这个工具的粉丝，原因很多。我上个月跑了一些测试，发现Nuxt.js比Vue的PWA模板有更高的灯塔分数，我认为这是令人印象深刻的。</p>
<p>Nuxt.js是一个更高级的框架，您可以使用CLI命令来创建通用的Vue应用程序。以下是它的一些好处：</p>
<ul>
<li>服务器端渲染</li>
<li>自动代码分割</li>
<li>强大的路由系统</li>
<li>Great lighthouse scores out of the gate 🐎</li>
<li>静态文件服务</li>
<li>ES6/ES7 支持</li>
<li>在开发中热重新加载</li>
<li>预处理: SASS, LESS, Stylus, etc</li>
<li>编写Vue文件来创建您的页面和布局！</li>
<li>我个人最喜欢的：轻松添加转换到您的网页</li>
</ul>
<p>让我们用一些路由设置一个基本的应用程序来看看我们自己的好处。</p>
<h3>设置</h3>
<p>我们需要做的第一件事情就是下载Vue的CLI。您可以使用以下命令全局执行此操作：</p>
<pre><code class="hljs x86asm">npm install -g vue-<span class="hljs-keyword">cli</span>

# ... <span class="hljs-keyword">or</span> ...

yarn <span class="hljs-keyword">add</span> <span class="hljs-meta">global</span> vue-<span class="hljs-keyword">cli</span>
</code></pre><p>你只需要做一次，而不是每次使用它。</p>
<p>接下来，我们将使用CLI搭建一个新项目，但我们将使用Nuxt.js作为模板：</p>
<pre><code class="hljs applescript">vue init nuxt/starter <span class="hljs-keyword">my</span>-project
cd <span class="hljs-keyword">my</span>-project
yarn  <span class="hljs-comment"># or...  npm install</span>
npm <span class="hljs-built_in">run</span> dev
</code></pre><p>您将看到正在构建的应用程序的进度，它会为您提供专用的开发服务器以检查：<a href="http://127.0.0.1:3000/。这就是你马上会看到的（用一个非常酷的小动画）：">http://127.0.0.1:3000/。这就是你马上会看到的（用一个非常酷的小动画）：</a></p>
<p><img src="http://s2.qhres.com/static/e73ca37c26a07f5d.css" alt="Screenshot of Nuxt starting screen"></p>
<p>我们来看看这个时候创建​​应用程序的初始视图是什么。我们可以进入\ pages \目录，在里面看到我们有一个\ index.vue \页面。如果我们打开它，我们会看到创建该页面所需的所有标记。我们还会看到它是一个.vue文件，使用单个文件组件就像任何普通的\ vue \文件一样，具有HTML的模板标签，脚本的脚本标签，我们导入组件的位置以及一些样式标签中的样式。 （如果你不熟悉这些，那么这里有更多的信息。）整个事情最酷的部分是这个.vue文件不需要任何特殊的设置。它被放置在\ pages \目录下，Nuxt.js会自动生成这个服务器端的渲染页面！</p>
<p>我们创建一个新页面并在它们之间建立一些路由。在\ pages / index.vue \中，转储已存在的内容，并将其替换为：</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Welcome!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">nuxt-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/product"</span>&gt;</span>Product page<span class="hljs-tag">&lt;/<span class="hljs-name">nuxt-link</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">font-family</span>: <span class="hljs-string">"Quicksand"</span>, <span class="hljs-string">"Source Sans Pro"</span>, -apple-system, BlinkMacSystemFont, <span class="hljs-string">"Segoe UI"</span>, Roboto, <span class="hljs-string">"Helvetica Neue"</span>, Arial, sans-serif; <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">60px</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<p>然后让我们在pages目录中创建另一个页面，我们将其称为\ product.vue \并将其放入其中：</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>This is the product page<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">nuxt-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/"</span>&gt;</span>Home page<span class="hljs-tag">&lt;/<span class="hljs-name">nuxt-link</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
</code></pre>
<p>马上，你会看到这个：</p>
<p>当当！ 🏆立即，我们有服务器端渲染，页面之间的路由（如果您检查URL，您可以看到它在索引页面和产品页面之间进行），并且我们甚至有一个可爱的小绿色加载器，可以跨越顶部。为了实现这一目标，我们并不需要做太多的工作。</p>
<p>你可能在这里注意到，有一个特殊的小元素：<code>&lt;nuxt-link to="/"&gt;</code>这个可以像一个标签一样使用，在标签中包含一些内容，它将在我们的页面之间建立一个内部路由链接。我们将使用<code>to =“/ page-title-here”</code>而不是href。</p>
<p>现在，我们添加一些转换。我们将在几个阶段做到这一点：从简单到复杂。</p>
<h3>创建页面转换</h3>
<p>我们已经有了一个非常酷的进度条，当我们进行路由选择时，它将贯穿屏幕的顶部，并使整个事情变得非常快乐。 （这是一个技术术语）。尽管我非常喜欢它，但它并不能真正适合我们前进的方向，所以现在就让我们摆脱它。</p>
<p>我们将进入我们的\ nuxt.config.js \文件并更改行：</p>
<pre><code class="hljs maxima"><span class="hljs-comment">/*
** Customize the progress-bar color
*/</span>
loading: { <span class="hljs-built_in">color</span>: '#<span class="hljs-number">3B8070</span>' },
</code></pre>
<p>to</p>
<pre><code class="hljs yaml"><span class="hljs-attr">loading:</span> <span class="hljs-literal">false</span><span class="hljs-string">,</span>
</code></pre>
<p>您还会注意到nuxt.config.js文件中的其他一些内容。您会看到我们的meta和head标签以及将在其中呈现的内容。这是因为我们不会像我们在常规CLI构建中那样有一个传统的\ index.html \文件，Nuxt.js将解析并构建我们的\ index.vue \文件以及这些标记，然后将内容呈现给我们，在服务器上。如果您需要添加CSS文件，字体或类似内容，我们将使用此Nuxt.js配置文件来执行此操作。</p>
<p>现在我们已经完成了所有工作，让我们了解可用于创建页面转换的内容。为了解我们插入的页面上发生了什么，我们需要回顾Vue中的转换组件的工作原理。我在这里写了一篇关于这方面的<a href="https://css-tricks.com/intro-to-vue-5-animations/">文章</a>，所以如果你想深入了解这个主题，你可以检查一下。但是你真正需要知道的是：Nuxt.js将插入到Vue转换组件的功能中，并为我们提供一些默认值和钩子：</p>
<p><img src="http://s4.qhres.com/static/825f722393bbfd1e.css" alt="transition component hooks"></p>
<p>你可以在这里看到，我们在动画开始输入前，动画/转换输入活动期间以及结束时我们有一个钩子。我们对于什么时候离开时有这些相同的挂钩，而不是预留。我们可以在状态之间插入简单的转换，或者将完整的CSS或JavaScript动画插入到它们中。</p>
<p>通常在Vue应用程序中，我们会在<code>&lt;transition&gt;</code>中包装一个组件或元素，以便使用这种漂亮的小功能，但是Nuxt.js会在我们开始时为我们提供此功能。我们的页面钩子将开始，thankfully- page。我们在页面之间创建动画所需做的只是添加一些插入钩子的CSS：</p>
<pre><code class="hljs css"><span class="hljs-selector-class">.page-enter-active</span>, <span class="hljs-selector-class">.page-leave-active</span> {
  <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">25s</span> ease-out;
}
<span class="hljs-selector-class">.page-enter</span>, <span class="hljs-selector-class">.page-leave-active</span> {
  <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">transform-origin</span>: <span class="hljs-number">50%</span> <span class="hljs-number">50%</span>;
}
</code></pre>
<p>我也会在这里添加一些额外的样式，以便您可以更轻松地看到页面转换：</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">html</span>, <span class="hljs-selector-tag">body</span> {
  <span class="hljs-attribute">font-family</span>: <span class="hljs-string">"Quicksand"</span>, <span class="hljs-string">"Source Sans Pro"</span>, -apple-system, BlinkMacSystemFont, <span class="hljs-string">"Segoe UI"</span>, Roboto, <span class="hljs-string">"Helvetica Neue"</span>, Arial, sans-serif; <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#222</span>;
  <span class="hljs-attribute">color</span>: white;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100vw</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
}

<span class="hljs-selector-tag">a</span>, <span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">:visited</span> {
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#3edada</span>;
  <span class="hljs-attribute">text-decoration</span>: none;
}

<span class="hljs-selector-class">.container</span> {
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">60px</span>;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100vw</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100vh</span>;
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#444</span>;
}
</code></pre>
<p>现在我们正在使用CSS转换。这只能让我们有能力指定在两个州的中间做些什么。我们可以做一些更有趣的动画，调整动画的方式可以表明某些东西来自哪里以及哪些东西来自哪里。为了实现这一点，我们可以分离出页面输入和页面离开活动类的转换，但是使用CSS动画并指定事物来自哪里并将其插入到每个类中会更加干燥。页面输入活动和.page-leave-active：</p>
<pre><code class="hljs css"><span class="hljs-selector-class">.page-enter-active</span> {
  <span class="hljs-attribute">animation</span>: acrossIn .<span class="hljs-number">45s</span> ease-out both;
} 

<span class="hljs-selector-class">.page-leave-active</span> {
  <span class="hljs-attribute">animation</span>: acrossOut .<span class="hljs-number">65s</span> ease-in both;
} 

@<span class="hljs-keyword">keyframes</span> acrossIn {
  0% {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(-100%, 0, 0);
  }
  100% {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(0, 0, 0);
  }
}

@<span class="hljs-keyword">keyframes</span> acrossOut {
  0% {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(0, 0, 0);
  }
  100% {
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate3d</span>(100%, 0, 0);
  }
}
</code></pre>
<p>我们还在产品页面上添加一些特殊的样式，以便我们看到这两个页面之间的区别：</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">scoped</span>&gt;</span><span class="css">
  <span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#222</span>;
  }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<p>这个范围标记非常酷，因为它只会应用这个页面/ vue文件的样式。如果你听说过CSS模块，你会熟悉这个概念。</p>
<p>我们会看到这个（这个页面仅用于演示目的，这对于典型的页面转换来说可能太多了）：</p>
<p>现在，假设我们有一个完全不同的交互页面。对于这个页面，上下移动太多了，我们只是想要一个简单的淡入淡出。对于这种情况，我们需要重命名我们的转换钩以将其分开。</p>
<p>我们创建另一个页面，我们将其称为联系页面并在页面目录中创建它。</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>This is the contact page<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">nuxt-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/"</span>&gt;</span>Home page<span class="hljs-tag">&lt;/<span class="hljs-name">nuxt-link</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">transition</span>: <span class="hljs-string">'fadeOpacity'</span>
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
<span class="hljs-selector-class">.fadeOpacity-enter-active</span>, <span class="hljs-selector-class">.fadeOpacity-leave-active</span> {
  <span class="hljs-attribute">transition</span>: opacity .<span class="hljs-number">35s</span> ease-out;
}

<span class="hljs-selector-class">.fadeOpacity-enter</span>, <span class="hljs-selector-class">.fadeOpacity-leave-active</span> {
  <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>;
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
</code></pre>
<p>现在我们可以开始进行两个页面的切换了。</p>
<p>您可以看到我们如何在这些基础上进一步构建，并为每个页面创建更多更精简的CSS动画。但是从这里开始，我们将深入我最喜爱的JavaScript动画，并创建更多马力的页面转换。</p>
<h3>Javascript Hooks</h3>
<p>Vue的<code>&lt;transition&gt;</code>组件提供了一些使用JavaScript动画代替CSS的钩子。他们如下，每个钩子是可选的。
css =“false”绑定让Vue知道我们要为这个动画使用JS：</p>
<pre><code class="hljs aspectj">&lt;transition 
  <span class="hljs-meta">@before</span>-enter=<span class="hljs-string">"beforeEnter"</span>
  <span class="hljs-meta">@enter</span>=<span class="hljs-string">"enter"</span>
  <span class="hljs-meta">@after</span>-enter=<span class="hljs-string">"afterEnter"</span>
  <span class="hljs-meta">@enter</span>-cancelled=<span class="hljs-string">"enterCancelled"</span>

  <span class="hljs-meta">@before</span>-Leave=<span class="hljs-string">"beforeLeave"</span>
  <span class="hljs-meta">@leave</span>=<span class="hljs-string">"leave"</span>
  <span class="hljs-meta">@after</span>-leave=<span class="hljs-string">"afterLeave"</span>
  <span class="hljs-meta">@leave</span>-cancelled=<span class="hljs-string">"leaveCancelled"</span>
  :css=<span class="hljs-string">"false"</span>&gt;

 &lt;/transition&gt;
</code></pre>
<p>我们可以获得的另一件事是转换模式。我非常喜欢这些，因为您可以声明一个动画会等待另一个动画在转换之前完成转换。我们将使用的转换模式将被称为out-in。</p>
<p>我们可以用JavaScript和过渡模式做一些非常狂野的事情，再次，我们为了演示的目的而在这里稍微坚持一点，我们通常会做一些更加微妙的事情：</p>
<p>为了做这样的事情，我已经运行了纱线添加gsap，因为我正在使用GreenSock进行这个动画。在我的\ index.vue \页面中，我可以删除现有的CSS动画并将其添加到<code>&lt;script&gt;</code>标记中：</p>
<pre><code class="hljs vim">import { TweenMax, Back } from <span class="hljs-string">'gsap'</span>

export default {
  transition: {
    <span class="hljs-keyword">mode</span>: <span class="hljs-string">'out-in'</span>,
    <span class="hljs-keyword">cs</span><span class="hljs-variable">s:</span> false,
    beforeEnter (<span class="hljs-keyword">el</span>) {
      TweenMax.<span class="hljs-keyword">set</span>(<span class="hljs-keyword">el</span>, {
        transformPerspective: <span class="hljs-number">600</span>,
        perspective: <span class="hljs-number">300</span>,
        transformStyle: <span class="hljs-string">'preserve-3d'</span>
      })
    },
    enter (<span class="hljs-keyword">el</span>, done) {
      TweenMax.<span class="hljs-keyword">to</span>(<span class="hljs-keyword">el</span>, <span class="hljs-number">1</span>, {
        rotationY: <span class="hljs-number">360</span>,
        transformOrigin: <span class="hljs-string">'50% 50%'</span>,
        ease: Back.easeOut
      })
      done()
    },
    leave (<span class="hljs-keyword">el</span>, done) {
      TweenMax.<span class="hljs-keyword">to</span>(<span class="hljs-keyword">el</span>, <span class="hljs-number">1</span>, {
        rotationY: <span class="hljs-number">0</span>,
        transformOrigin: <span class="hljs-string">'50% 50%'</span>,
        ease: Back.easeIn
      })
      done()
    }
  }
}
</code></pre>
<p>所有这些演示代码都存在于我的<a href="https://github.com/sdras/intro-to-vue">Intro to Vue repo</a>初学者材料中，如果你正在学习Vue的话。</p>
<p>我想在这里调出的一件事是，目前Nuxt.js中的转换模式存在一个错误。这个bug已经修复，但是这个版本还没有出来。它应该在即将到来的1.0版本中都是固定的和最新的，但同时，这里是一个<a href="https://glitch.com/edit/#!/cooing-car">工作简单示例演示</a>，以及<a href="https://github.com/nuxt/nuxt.js/issues/566">追踪问题</a>。</p>
<p>通过这个工作代码和JavaScript钩子，我们可以开始变得更加奇特并创建独特的效果，并在每个页面上进行不同的转换：</p>
<p>以下是演示部署到的网站，如果您希望看到它：<a href="https://nuxt-type.now.sh/">https://nuxt-type.now.sh/</a> 以及回收代码： <a href="https://github.com/sdras/nuxt-type">https://github.com/sdras/nuxt-type</a></p>
<h3>导航</h3>
<p>在最后一个演示中，您可能已经注意到我们在所有页面中都有一个通用导航，我们路由了该页面。为了创建它，我们可以进入\ layouts \目录，我们将看到一个名为\ default.vue的文件。这个目录将包含我们所有页面的基本布局。</p>
<p>Right away you'll see this:</p>
<pre><code class="hljs apache"><span class="hljs-section">&lt;template&gt;</span>
  <span class="hljs-section">&lt;div&gt;</span>
    <span class="hljs-section">&lt;nuxt/&gt;</span>
  <span class="hljs-section">&lt;/div&gt;</span>
<span class="hljs-section">&lt;/template&gt;</span>
</code></pre>
<p>这个特殊<code>&lt;nuxt/&gt;</code>将会放在我们的.vue页面文件将被插入的地方，所以为了创建一个导航，我们可以像这样插入一个导航组件：</p>
<pre><code class="hljs dust"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">Navigation</span> /&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">nuxt</span>/&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">import</span> Navigation <span class="hljs-keyword">from</span> <span class="hljs-string">'~components/Navigation.vue'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> </span></span><span class="hljs-template-variable">{
  components: {
    Navigation
  }</span><span class="xml"><span class="undefined">
}
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
</span></code></pre>
<p>我喜欢这一点，因为一切都保持良好，并在我们的全球和当地需求之间组织。</p>
<p>然后我在名为\ components \的目录中有一个名为Navigation的组件（这是Vue应用程序的标准票价）。在这个文件中，你会看到一堆指向不同页面的链接：</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">nav</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">nuxt-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/rufina"</span>&gt;</span>Rufina<span class="hljs-tag">&lt;/<span class="hljs-name">nuxt-link</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">nuxt-link</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/prata"</span>&gt;</span>Prata<span class="hljs-tag">&lt;/<span class="hljs-name">nuxt-link</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">nuxt-link</span> <span class="hljs-attr">exact</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"/"</span>&gt;</span>Playfair<span class="hljs-tag">&lt;/<span class="hljs-name">nuxt-link</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">nav</span>&gt;</span>
</code></pre>
<p>你会注意到我再次使用<code>&lt;nuxt-link&gt;</code>标签，即使它在另一个目录中，路由仍然可以工作。但最后一页有一个额外的属性，确切的属性：<code>&lt;nuxt-link exact to="/"&gt;</code>Playfair<code>&lt;/nuxt-link&gt;</code>这是因为有许多路由只匹配/目录，实际上它们都是。所以如果我们指定确切的话，Nuxt会知道我们只是特别指的是索引页。</p>
<h3>更多资源</h3>
<p>如果您想了解更多关于Nuxt的信息，<a href="https://nuxtjs.org/">Nuxt的文档</a>非常甜蜜，并且有很多示例可供您使用。如果您想了解更多关于Vue的信息，我刚刚在<a href="https://frontendmasters.com/courses/">Frontend Masters</a>上发了一个课程，<a href="">所有材料都是开源的</a>，或者你可以查看我们的<a href="https://css-tricks.com/guides/vue/">Guide for Vue</a>，或者你可以去<a href="https://vuejs.org/">docs</a>，写得非常好。快乐的编码！</p>

          
{{% /raw %}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/simple-server-side-rendering-routing-and-page-transitions-with-nuxt-js-css-tricks](https://www.zcfy.cc/article/simple-server-side-rendering-routing-and-page-transitions-with-nuxt-js-css-tricks)
原文标题: 使用Nuxt.js简单的服务器端渲染，路由和页面转换CSS-Tricks
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
