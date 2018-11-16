---
title: 'Hello Vue: Vue快速入门教程 '
hidden: true
categories: [reprint]
slug: 6e67a2bf
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <p>Vue快速入门教程，此教程包括使用Kendo UI for Vue的组件。希望通过此教程能够成为你学习vue的一个很好的起点。这其中还包含一个可扩展的事例，如果你感兴趣可以深入学习下去。</p>
<p>本教程针对的是第一次使用Vue资源管理器。我将向您展示如何使用Vue创建一个简单的示例，然后我将添加一些交互性和UI组件，最后添加更多功能和<a href="https://www.telerik.com/ kendo-vue-ui">Kendo UI</a>组件。虽然本教程演示非常基础，但它概述了使用Vue添加特性和功能的所有关键元素。扩展演示代码并交换更复杂的组件非常容易。我的例子，如Vue本身，是可扩展的。</p>
<p>ps: 框架的名称在技术上是“Vue.js”，有些地方甚至会修改版本号以获得“Vue.js 2”，但大多数人只是在常用中使用“Vue”。本教程侧重于语言，并未涵盖更重要的Vue-cli等高级主题，但应该在以后会有介绍。</p>
<p>让我们开始吧!</p>
<h2>Hello, world!</h2>
<p>首先，让我们先来了解一下开始使用Vue是多么容易。我们将从流行的“<a href="https://en.wikipedia.org/wiki/%22Hello,_World！％22_program">hello，world</a>”应用程序的Vue实现开始。请注意，我在这里是一个纯粹主义者，我使用原始的Kernighan和Ritchie书中定义的原始拼写“<a href="https://en.wikipedia.org/wiki/The_C_Programming_Language">C编程语言</a>”。</p>
<p>话虽如此，我实际上不会使用“hello，world”这个文字。你以后会明白为什么。而不是一个“你好，世界”的例子，这是一个“你必须让我知道”的例子。我们走了 - 解释如下。</p>
<pre><code class="hljs django"><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Clash<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- the star of the show - the Vue library! --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/vue/dist/vue.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-comment">// when life is settled, load up the fun stuff</span>
    <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'DOMContentLoaded'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">'#sg1'</span>,
        <span class="hljs-comment">// define data - initial display text</span>
        data: {
          <span class="hljs-attr">m1</span>: <span class="hljs-string">"You got to let me know"</span>
        }
      })
    })
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- text --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"sg1"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{" m1 "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>

</span></code></pre><h2>我们做了什么</h2>
<p>首先，在文件中，我们给它标题。不是绝对必要的，但是写标题是一个不该被遗忘的好习惯。</p>
<p>接下来，我们从CDN加载Vue库。当你开始使用时，你可能会切换到npm（这是Vue的[推荐安装方法](<a href="https://vuejs.org/v2/guide/installation.html">https://vuejs.org/v2/guide/installation.html</a>(），但CDN是最简单和最便携方式。</p>
<p>首先，让我们跳到文档<code>&lt;body&gt;</code>。这里，我们有一个带有属性的</p>
<p>`元素，id =“sg1”。</p>
<pre><code class="hljs django"><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"sg1"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{" m1 "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

</span></code></pre><p>Vue的核心是能够使用简单的模板语法以声明方式将数据呈现给DOM。</p>
<p>跳回到文档<code>&amp;lt;head&amp;gt;</code>，我们看到一些代码在通过设置事件监听器加载DOM时触发。如果你来自jQuery世界，这就像$（document）.ready（）。</p>
<p>接下来，我们有我们的Vue代码，这里所做的就是设置“m1”的内容：</p>
<pre><code class="hljs less"><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">Vue</span>({
  <span class="hljs-attribute">el</span>: <span class="hljs-string">'#sg1'</span>,
  <span class="hljs-comment">// define data - initial display text</span>
  <span class="hljs-attribute">data</span>: {
    <span class="hljs-attribute">m1</span>: <span class="hljs-string">"You got to let me know"</span>
  }
})


</code></pre><p>我们从这里开始使用Vue（）函数创建一个新的Vue实例。有了这个，我们传递它配置。在这里，我们只在数据部分设置m1的初始值。（稍后会详细介绍。）我们还告诉它我们想要使用哪个元素，el：'＃sg1'类似于document.getElementById（'＃sg1'）。</p>
<p>当我们运行它时，我们得到：</p>
<p><img src="https://p0.ssl.qhimg.com/t010d6491a25713e4fd.png" alt="Vue example"></p>
<p>这很简单，但不是很有用。但是，它确实让我们了解如何设置Vue应用程序。到目前为止，它看起来并没有太大的不同。但是这里发生了一些有趣的事情，我们还没有看到。我们将探讨下一个例子中的内容。</p>
<h2>增加交互性</h2>
<p>接下来，我们将添加一个按钮：</p>
<pre><code class="hljs django"><span class="xml"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Clash<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- the star of the show - the Vue library! --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/vue/dist/vue.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
    <span class="hljs-comment">// some data we'll use</span>
    <span class="hljs-keyword">var</span> action = [ <span class="hljs-string">"Go"</span>, <span class="hljs-string">"Stay"</span>];
    <span class="hljs-keyword">var</span> result = [ <span class="hljs-string">"It will be double"</span>, <span class="hljs-string">"There will be trouble"</span> ];
    <span class="hljs-comment">// when life is settled, load up the fun stuff</span>
    <span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'DOMContentLoaded'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
      <span class="hljs-keyword">new</span> Vue({
        <span class="hljs-attr">el</span>: <span class="hljs-string">'#sg1'</span>,
        <span class="hljs-comment">// define data - initial display text and set the text on the button</span>
        data: {
          <span class="hljs-attr">m1</span>: <span class="hljs-string">"You got to let me know"</span>,
          <span class="hljs-attr">btext</span>: action[<span class="hljs-number">0</span>]
        },
        <span class="hljs-comment">// define the methods - alternate between the two values</span>
        methods: {
          <span class="hljs-attr">staygo</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">var</span> sel = ( <span class="hljs-keyword">this</span>.btext == action[<span class="hljs-number">0</span>] ) ? sel = <span class="hljs-number">1</span> : sel = <span class="hljs-number">0</span>;
            <span class="hljs-keyword">this</span>.m1 = result[sel];
            <span class="hljs-keyword">this</span>.btext = action[sel];
          }
        }
      })
    })
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- text and the button --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"sg1"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{" m1 "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">v-on:click</span>=<span class="hljs-string">"staygo"</span>&gt;</span></span><span class="hljs-template-variable">"{{" btext "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>

</span></code></pre><p>在标记中，我们添加了按钮。这是一个基本按钮，我们通过附加调用staygo（）的侦听器定义了一个单击事件的动作，并且我们为按钮文本设置了一个名为“btext”的占位符。</p>
<p>回到代码中，我们在配置中添加了一个方法属性。在其中，我们定义了staygo（）以匹配按钮中的那个。这是它变得有趣的地方。</p>
<pre><code class="hljs armasm"><span class="hljs-symbol">methods</span>: {
<span class="hljs-symbol">  staygo:</span> <span class="hljs-meta">function</span> () {
    var <span class="hljs-keyword">sel </span>= ( this.<span class="hljs-keyword">btext </span>== action[<span class="hljs-number">0</span>] ) ? <span class="hljs-keyword">sel </span>= <span class="hljs-number">1</span> : <span class="hljs-keyword">sel </span>= <span class="hljs-number">0</span><span class="hljs-comment">;</span>
    this.m1 = result[<span class="hljs-keyword">sel];
</span>    this.<span class="hljs-keyword">btext </span>= action[<span class="hljs-keyword">sel];
</span>  }
}

</code></pre><p>我们还在数据区域添加了文本，为按钮提供了初始标签。在该方法中，我们基本上看到按钮上的内容，然后在两行文本中的一行和两个按钮标签之一之间切换。</p>
<pre><code class="hljs dts"><span class="hljs-symbol">data:</span> {
<span class="hljs-symbol">  m1:</span> <span class="hljs-string">"You got to let me know"</span>,
<span class="hljs-symbol">  btext:</span> action[<span class="hljs-number">0</span>]
}

</code></pre><p>这里发生的有趣的事情是我们现在已经链接了数据和DOM，我们的应用程序是被动的。当我们改变m1的值时，显示的文本被改变，当我们改变btext的值时，按钮文本被改变。没有什么需要做的了。这也发生在我们的第一个例子中，但我们没有看到，因为我们只是将文本留下了初始值。</p>
<p>看起来像：</p>
<p><img src="https://p0.ssl.qhimg.com/t01a7e37729f3931c9c.png" alt="Vue example"></p>
<p>我们看到文字“你必须告诉我”，按钮标有“go”。正如任何经典朋克的粉丝都知道的那样，如果你去“会有麻烦”并且文字改为此。同时，决定留下来，我们唯一的选择是“停留”，我们将按钮上的标签更改为“停留”。</p>
<p><img src="https://p0.ssl.qhimg.com/t01c96d46974284a887.png" alt="Vue example"></p>
<p>如果您现在单击“停留”，则文本将更改为“它将是双倍”。</p>
<p><img src="https://p0.ssl.qhimg.com/t01efe70c40eaf4e544.png" alt="Vue example"></p>
<p>你可以在逗留和去之间来回点击，然后决定你是否要经常遇到麻烦或双重麻烦。</p>
<h2>添加Kendo UI组件</h2>
<p>为了简单起见，我在这里使用了一个基本的下拉组件，但如果你想添加一个网格或图表或其他更复杂的组件，那么这个过程就大致相同了。此外，它有点长，所以我将列出下面每个部分的添加内容并列出完整的代码<a href="https://github.com/JohnWilloughby/HelloVue">在GitHub上</a>。</p>
<p>首先，我们在标题中添加了一个部分，以引入Kendo UI样式，基本库和此组件的库：</p>
<pre><code class="hljs xml"><span class="hljs-comment">&lt;!-- load Kendo UI stylesheets --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://kendo.cdn.telerik.com/2017.3.913/styles/kendo.common.min.css"</span>/&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://kendo.cdn.telerik.com/2017.3.913/styles/kendo.default.min.css"</span>/&gt;</span>
<span class="hljs-comment">&lt;!-- load Kendo UI libraries --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://code.jquery.com/jquery-1.12.4.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://kendo.cdn.telerik.com/2017.3.913/js/kendo.all.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.15/browser-polyfill.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-comment">&lt;!-- load Kendo UI for Vue --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/@progress/kendo-dropdowns-vue-wrapper/dist/cdn/kendo-dropdowns-vue-wrapper.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

</code></pre><p>这包括组件的一些样式，我们依赖的一些库，以及我们将使用的实际组件的库。</p>
<p>我们还在<code>&amp;lt;body&amp;gt;</code>部分添加了一个<code>&lt;div&gt;</code>元素。在这里，您会看到一些新文本以及<code>&amp;lt;kendo-dropdownlist&amp;gt;</code>元素：</p>
<pre><code class="hljs django"><span class="xml"><span class="hljs-comment">&lt;!-- second text and the DropDownList component --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"sg2"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"vue-app"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span></span><span class="hljs-template-variable">"{{" m2 "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">h4</span>&gt;</span>Singer:<span class="hljs-tag">&lt;/<span class="hljs-name">h4</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">kendo-dropdownlist</span> <span class="hljs-attr">:data-source</span>=<span class="hljs-string">"singerOptions"</span>
                       <span class="hljs-attr">:data-text-field</span>=<span class="hljs-string">"'text'"</span>
                       <span class="hljs-attr">:data-value-field</span>=<span class="hljs-string">"'value'"</span>
                       @<span class="hljs-attr">change</span>=<span class="hljs-string">"onChange"</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">kendo-dropdownlist</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

</span></code></pre><p>在这里，您可以看到我们已经指定了实际标签的数据源（文本项数组），调用文本字段的内容，调用返回的值，最后我们告诉它如何处理具体行动。在这种情况下，它是@change，它在选择被更改时触发（不仅仅是选中，而是实际更改为其他选择）并且我们已经定义了onChange（）。您可以触发许多其他事件，还可以设置大量其他参数来控制DropDownList组件的行为。有关这方面的更多信息，请查看<a href="https://www.telerik.com/kendo-vue-ui/components/dropdowns/dropdownlist/">DropDownList组件</a>的文档 。</p>
<p>现在，回到脚本，我们为这个新部分添加了新代码：</p>
<pre><code class="hljs ceylon"><span class="hljs-keyword">new</span> Vue({
  el: <span class="hljs-string">"#sg2"</span>,
  <span class="hljs-comment">// data is the lyric line and the two options for the DropDownList component</span>
  data: {
    m<span class="hljs-number">2</span>: problem[<span class="hljs-number">0</span>],
    singerOptions: [
      { text: option[<span class="hljs-number">0</span>], <span class="hljs-keyword">value</span>: <span class="hljs-string">'0'</span> },
      { text: option[<span class="hljs-number">1</span>], <span class="hljs-keyword">value</span>: <span class="hljs-string">'1'</span> }
    ]
  },
  <span class="hljs-comment">// and the method here just updates the text based on the singer selection</span>
  methods: {
    onChange: <span class="hljs-keyword">function</span>(e) {
      <span class="hljs-keyword">this</span>.m<span class="hljs-number">2</span> = problem[e.sender.<span class="hljs-keyword">value</span>()];
    }
  }
})

</code></pre><p>我们添加了两（2）个数据项：一个用于文本，“m2”，第二个是实际由DropDownList组件使用的数组。最后，我们有一个方法，在DropDownList组件中更改选择时调用，该方法根据选择设置文本“m2”，该选择与e.sender.value（）一起传递。</p>
<p>我们的应用现在看起来像这样：</p>
<p><img src="https://p0.ssl.qhimg.com/t0165ab9244dc55f7e3.png" alt="Vue example" title="sg05"></p>
<p>我们仍然有原始的“hello，world”文本和按钮，但现在我们也看到了新的歌词和下拉列表。如果我们点击下拉菜单，我们会得到两个选择：“Mick”或“Joe and Joe”。</p>
<p><img src="https://p0.ssl.qhimg.com/t01b7d0d4adb3979ac9.png" alt="Vue example" title="sg06"></p>
<p>如果我们选择'Mick'，我们会看到Mick Jones演唱的英文歌词，这就是我们开始使用的歌曲。如果我们选择“Joe and Joe”，我们将获得Joe Strummer和Joe Ely演唱的西班牙语。</p>
<p><img src="https://p0.ssl.qhimg.com/t01751ab0f87090c042.png" alt="Vue example" title="sg07"></p>
<h2>下一步</h2>
<p>现在你已经看到了开始使用Vue是多么容易，下一步是什么？</p>
<p>在这个小例子之后你可以找到各种各样的方向。但是在这里你有一个实际的工作示例，交互性和所有连接的Kendo UI组件。如果您之前没有使用过Vue，那么这可以超越基本的“hello，world”示例，这些示例基于您具备所有设置和工作的基础知识。从一个复杂的例子开始，从来没有什么帮助，因为当它不起作用时你通常不知道为什么，这就是为什么“你好，世界”的例子如此受欢迎。</p>
<p>更进一步，这里有一些你可能会发现有用的链接：</p>
<h2>相关网站</h2>
<ul>
<li><p><a href="http://vuejs.org/guide/index.html">vuejs.org</a></p>
</li>
<li><p><a href="https://laracasts.com/series/learn-vue-2-step-by-step">Learn Vue 2: Step by Step</a> on Laracasts</p>
</li>
<li><p><a href="https://scrimba.com/g/glearnvue">9 Interactive Screencasts</a> to learn Vue from Scrimba</p>
</li>
<li><p><a href="https://www.telerik.com/campaigns/kendo-ui/using-kendo-ui-with-vue-video-tutorial">Getting Started with Kendo UI and Vue: Video Tutorial</a> - a more complex example using advanced Kendo UI components</p>
</li>
</ul>
<h2>相关博客文章</h2>
<ul>
<li><p><a href="https://www.telerik.com/blogs/4-awesome-things-you-can-do-with-the-vuejs-cli">4 Awesome Things You Can Do with the Vue.js CLI</a></p>
</li>
<li><p><a href="https://www.telerik.com/blogs/get-going-with-kendo-ui-vue-a-gif-guide">Get Going with Kendo UI &amp; Vue: a GIF Guide</a> - a little more NPM and Vue CLI, less basic Vue</p>
</li>
<li><p><a href="https://www.telerik.com/blogs/building-pwas-with-vuejs">Building PWAs with Vue.js</a></p>
</li>
</ul>
<p>Happy coding!</p>
<p>GitHub上提供了本文中的源代码: <a href="https://github.com/JohnWilloughby/HelloVue">HelloVue</a>.</p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/hello-vue-a-quick-tutorial-on-getting-started-with-vue](https://www.zcfy.cc/article/hello-vue-a-quick-tutorial-on-getting-started-with-vue)
原文标题: Hello Vue: Vue快速入门教程
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
