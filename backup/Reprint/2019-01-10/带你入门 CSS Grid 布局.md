---
title: '带你入门 CSS Grid 布局' 
date: 2019-01-10 2:30:08
hidden: true
slug: or55z6q6l
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000010000550" src="https://static.alili.tech/img/remote/1460000010000550" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">前言</h2>
<p>三月中旬的时候，有一个对于 CSS 开发者来说很重要的消息，最新版的 Firefox 和 Chrome 已经正式支 CSS Grid 这一新特性啦。没错：我们现在就可以在最流行的两大浏览器上玩转 CSS Grid 啦 ~(≧▽≦)/~</p>
<h2 id="articleHeader1">为什么 CSS Grid 很重要？</h2>
<p>因为 CSS Grid 布局是 Web 的第一个真正的布局系统。它的目的是将内容组织成行列的形式，最终使开发人员能高度控制我们眼前屏幕上页面的显示效果。这意味着我们终于可以摒弃多年的各种 hack 和 trick 了，CSS Grid 布局不仅仅可以使复杂的布局和精美的排版成为可能，而且还可以使其变的干净利落可维护。</p>
<p>通过使用 CSS Grid，Web开发变得更加简洁且对开发者更加友好了 :-D 。那么 Grid 是如何工作的咩？有些教程事无巨细，但是我认为我们应该从最基础的知识学起。下面我们将会实现一个比较简单的小例子，即在一个页面上放置一串字母。</p>
<p>在开始前，我们先添加几个标签：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;wrapper&quot;>
    <div class=&quot;letter&quot;>
        A
    </div>
    <div class=&quot;letter&quot;>
        B
    </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrapper"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"letter"</span>&gt;</span>
        A
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"letter"</span>&gt;</span>
        B
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>首先，我们使用 <code>font-size</code> 和 <code>color</code> 设置这些字母的字体和颜色，然后使用诸如 <code>align-items</code> 和 <code>justify-content</code> 之类的 <code>flexbox</code> 属性将其居中。CSS Grid 没有替换 <code>flexbox</code> 属性，尽可能保留了它们的功能。我们甚至可以将这些属性与 CSS Grid 结合。但是现在先让我们回到这个 demo：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010000551" src="https://static.alili.tech/img/remote/1460000010000551" alt="" title="" style="cursor: pointer;"></span></p>
<p>在上面这个例子中，一个大的 <code>div</code> 又包含着两个 <code>div</code> ，它们默认属性是 <code>display: block</code>。接下来我们用 Grid layout 设置父类元素：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wrapper {
  display: grid;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.wrapper</span> {
  <span class="hljs-attribute">display</span>: grid;
}</code></pre>
<p>在这我放一下完整的 HTML 和 CSS 代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;wrapper&quot;>
  <div class=&quot;letter&quot;>
    A
  </div>
  <div class=&quot;letter&quot;>
    B
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrapper"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"letter"</span>&gt;</span>
    A
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"letter"</span>&gt;</span>
    B
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="body,html {
  padding: 0;
  margin: 0;
}

.wrapper {
  display: grid;
}

.letter {
  background-color: #0069b3;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  font-size: 70px;
  color: white;
  line-height: 1;
  font-family: 'hobeaux-rococeaux-background', Helvetica;
  font-weight: 200;
  cursor: pointer;
  transition: all .3s ease;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">body</span>,<span class="hljs-selector-tag">html</span> {
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
}

<span class="hljs-selector-class">.wrapper</span> {
  <span class="hljs-attribute">display</span>: grid;
}

<span class="hljs-selector-class">.letter</span> {
  <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#0069b3</span>;
  <span class="hljs-attribute">display</span>: flex;
  <span class="hljs-attribute">justify-content</span>: center;
  <span class="hljs-attribute">align-items</span>: center;
  <span class="hljs-attribute">padding</span>: <span class="hljs-number">20px</span>;
  <span class="hljs-attribute">font-size</span>: <span class="hljs-number">70px</span>;
  <span class="hljs-attribute">color</span>: white;
  <span class="hljs-attribute">line-height</span>: <span class="hljs-number">1</span>;
  <span class="hljs-attribute">font-family</span>: <span class="hljs-string">'hobeaux-rococeaux-background'</span>, Helvetica;
  <span class="hljs-attribute">font-weight</span>: <span class="hljs-number">200</span>;
  <span class="hljs-attribute">cursor</span>: pointer;
  <span class="hljs-attribute">transition</span>: all .<span class="hljs-number">3s</span> ease;
}</code></pre>
<p>则显示结果如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010000552" src="https://static.alili.tech/img/remote/1460000010000552" alt="" title="" style="cursor: pointer;"></span></p>
<p>现在你可能看到似乎没什么变化。为什么这样呢？这不像设置 <code>display: inline-block;</code> 或者 <code>display: inline;</code> ，当我们把布局设为网格布局是不会发生很明显的变化。事实上，想让我们的 <code>grid</code> 起作用，首先需要给它设置一个确切的行数和列数。在这个例子中，我们可以让两个字母并排排列：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 1px;
  background-color: black;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.wrapper</span> {
  <span class="hljs-attribute">display</span>: grid;
  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">1</span>fr <span class="hljs-number">1</span>fr;
  <span class="hljs-attribute">grid-column-gap</span>: <span class="hljs-number">1px</span>;
  <span class="hljs-attribute">background-color</span>: black;
}</code></pre>
<p>让我们拆解一下上面的代码。首先我们用 <code>grid-template-columns</code> 创建了一个两列的网格，如果你以前没见过这样的，那 <code>1fr</code> 可能看起来比较奇怪 ，但它是有效的 CSS 单元，可以将每一列列为我们网格的一小部分。在这个例子中，意味着让两列等宽。</p>
<p>效果如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010000553" src="https://static.alili.tech/img/remote/1460000010000553" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>看见效果了就开心了吧，哈哈。但是看到两列之间的黑线了吗？这是 <code>wrapper</code> 勾勒的每个字母 <code>div</code> 的背景，因为我们将 <code>grid-column-gap</code> 设置为了 <code>1px</code>。通常，我们会设置更大的距离，尤其是对于两个相邻的文本框来说。但在本例中，<code>1px</code> 就足够了。</p>
<p>如果我们再添加两个新字母会怎样呢？我们应该怎么改变布局？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class='wrapper'>
  <div class='letter'>
    A
  </div>
  <div class='letter'>
    B
  </div>
  <div class='letter'>
    C
  </div>
  <div class='letter'>
    D
  </div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'wrapper'</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'letter'</span>&gt;</span>
    A
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'letter'</span>&gt;</span>
    B
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'letter'</span>&gt;</span>
    C
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">'letter'</span>&gt;</span>
    D
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>看吧，加两个字母之后也没啥神奇的效果。加两个字母对网格没什么影响，为什么呢？因为我们已经将其设置成了两列，所以这两个字母的 <code>div</code> 直接被放在了它们下面，并且正好是 <code>1fr</code>宽：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010000554" src="https://static.alili.tech/img/remote/1460000010000554" alt="" title="" style="cursor: pointer;"></span></p>
<p>但是现在我有一个疑问啊，为啥字母 A、C 之间以及 B、D 之间没有 <code>1px</code> 的距离╭(╯^╰)╮<br>因为 <code>grid-column-gap</code> 只用于列，我们刚才做的是在网格布局中增加了一行。那就必须使用 <code>grid-row-gap</code> 才能看到想要的效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wrapper {
  grid-column-gap: 1px;
  grid-row-gap: 1px;
  /* other styles go here */
  /* we could have also used the shorthand `grid-gap` */
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.wrapper</span> {
  <span class="hljs-attribute">grid-column-gap</span>: <span class="hljs-number">1px</span>;
  <span class="hljs-attribute">grid-row-gap</span>: <span class="hljs-number">1px</span>;
  <span class="hljs-comment">/* other styles go here */</span>
  <span class="hljs-comment">/* we could have also used the shorthand `grid-gap` */</span>
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010000555" src="https://static.alili.tech/img/remote/1460000010000555" alt="" title="" style="cursor: pointer;"></span></p>
<p>现在我们已经创建好了一个一行一列的网格布局，所以接下来我们就得改变标记了。但是咱现在再挖掘下列的好玩的地方。如果给 <code>grid-template-columns</code> 属性添加另一个值会有啥变化？像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wrapper {
 grid-template-columns: 1fr 1fr 1fr;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.wrapper</span> {
 <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">1</span>fr <span class="hljs-number">1</span>fr <span class="hljs-number">1</span>fr;
}</code></pre>
<p>啊哈，这就添加了一个新的列啊。我们现在也可以清晰地看见 <code>wrapper</code> 的背景，因为现在那没东西显示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010000556" src="https://static.alili.tech/img/remote/1460000010000556" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>如果我们改变 <code>fr</code>，那一个非对称的网格布局就搞出来了。假如我们想让网格的第一列是其他两列的三倍：</p>
<p>这会使A和D两列的宽度大于其他两列：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010000557" src="https://static.alili.tech/img/remote/1460000010000557" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>好玩吧？我们没必要在担心负边距或者网格列的完美百分比。我们可以轻松地做很复杂的网格布局，而不用像以前那样用数学来算...<br>现在我们只需要给 <code>grid-template-columns</code> 属性添加一个新的值，一个网格列就奇迹般地出现了。</p>
<p>你可能会问，那=响应式网格怎么实现？那其实也很简单。比如我们默认想要显示为 2 列，如果屏幕为 500px 的时候我们想让其显示为 3 列，如果屏幕再大点，我们要4列。只需要这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  
  @media screen and (min-width: 500px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
  
  @media screen and (min-width: 800px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.wrapper</span> {
  <span class="hljs-attribute">display</span>: grid;
  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">1</span>fr <span class="hljs-number">1</span>fr;
  
  @media screen and (<span class="hljs-attribute">min-width</span>: <span class="hljs-number">500px</span>) {
    grid-template-columns: <span class="hljs-number">1</span>fr <span class="hljs-number">1</span>fr <span class="hljs-number">1</span>fr;
  }
  
  @<span class="hljs-keyword">media</span> screen and (min-width: <span class="hljs-number">800px</span>) {
    <span class="hljs-selector-tag">grid-template-columns</span>: 1<span class="hljs-selector-tag">fr</span> 1<span class="hljs-selector-tag">fr</span> 1<span class="hljs-selector-tag">fr</span> 1<span class="hljs-selector-tag">fr</span>;
  }
}</code></pre>
<p>确保在你能用电脑在新窗口打开下面这个 Demo 链接-<a href="http://codepen.io/robinrendle/pen/Npjzyz?editors=1100" rel="nofollow noreferrer" target="_blank">Demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="robinrendle/pen/Npjzyz" data-typeid="3">点击预览</button>，来试试改变浏览器窗口大小，看看响应式效果。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010000558" src="https://static.alili.tech/img/remote/1460000010000558" alt="" title="" style="cursor: pointer;"></span></p>
<p><code>grid-template-columns</code> 属性比本文展示的要更复杂，但是本文是很好的一个起点。接下来我们会学习 CSS Grid 中真正的革命性意义的属性： <code>grid-template-rows</code></p>
<p>看下面的一小段代码，结合我们已经学的知识，搞明白这个新属性能干啥：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wrapper {
  display: grid;
  grid-template-columns: 3fr 1fr 1fr;
  grid-template-rows: 1fr 3fr;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.wrapper</span> {
  <span class="hljs-attribute">display</span>: grid;
  <span class="hljs-attribute">grid-template-columns</span>: <span class="hljs-number">3</span>fr <span class="hljs-number">1</span>fr <span class="hljs-number">1</span>fr;
  <span class="hljs-attribute">grid-template-rows</span>: <span class="hljs-number">1</span>fr <span class="hljs-number">3</span>fr;
}</code></pre>
<p>我们现在可以设置行高之间的关系。如果我们把前面的行高设成 <code>1fr</code> ，最后一个则设置为 <code>3fr</code>，这意味着第二行的行高是第一行的3倍：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010000559" src="https://static.alili.tech/img/remote/1460000010000559" alt="" title="" style="cursor: pointer;"></span></p>
<p>这可能看起来很简单，以前我们从没真正做到过这一点。我们总是不得不在一个特定元素上设置最小高度或者改变类名。我们以前从没以现在这样的方式创建过行之间的关系，这就是 CSS Grid 强大之处。</p>
<p>有了这些小知识和一些新属性，我们可以创建非常复杂的布局，不对称网格和响应式网格只是冰山一角。目前为止，只是对 CSS Grid 的初探，还有很多没有谈到的。但是我觉得 Jen Simmons 在写 Grid 的时候描述的最好：</p>
<blockquote><p>我们要一直探索 CSS Grid，直到搞清楚它想做的是什么，它能勉强做什么和它做不了什么。设计师可能永远不会学 CSS 的代码，但是要足够了解 CSS 才能更好地理解我们的艺术媒介（artistic medium）。</p></blockquote>
<p>当然，上面的代码起初看起来会有些奇怪。但是我想表达的意思是：我们不再需要使用臃肿的 CSS 框架，也不用管一大堆繁琐的布局。这就是 CSS Grid 真正让我兴奋的地方，它让我们以一种全新的方式看界面的显示。</p>
<p>我们不仅需要学习一大堆新属性，还要重新思考我们以前所学的东西。所以 CSS Grid 不仅仅是一个规范，它本身就是一个奇怪的哲学。</p>
<p>让我们一起来探索吧！</p>
<h2 id="articleHeader2">浏览器支持情况</h2>
<p>绿色表示在列出的版本（及以上）的完全支持。黄色表示部分支持。红色表示不支持。有关完整的浏览器支持详情，请参阅 <a href="http://caniuse.com/#feat=css-grid" rel="nofollow noreferrer" target="_blank">Caniuse</a>.</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010000560" src="https://static.alili.tech/img/remote/1460000010000560" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader3">相关学习资源链接</h2>
<ul>
<li><p><a href="http://jensimmons.com/" rel="nofollow noreferrer" target="_blank">Jen Simmons</a></p></li>
<li><p><a href="https://rachelandrew.co.uk/" rel="nofollow noreferrer" target="_blank">Rachel Andrew</a></p></li>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Tools/Page_Inspector/How_to/Examine_grid_layouts" rel="nofollow noreferrer" target="_blank">Grid Inspector Tools in Firefox is super handy</a></p></li>
<li><p><a href="https://css-tricks.com/snippets/css/complete-guide-grid/" rel="nofollow noreferrer" target="_blank"> Complete Guide to Grid</a></p></li>
</ul>
<p>&nbsp;</p>
<blockquote><p>原文：<a href="https://css-tricks.com/getting-started-css-grid/" rel="nofollow noreferrer" target="_blank">Getting Started with CSS Grid</a><br>作者：<a href="https://css-tricks.com/author/robinrendle/" rel="nofollow noreferrer" target="_blank">ROBIN RENDLE</a></p></blockquote>
<p>欢迎大家在评论区留下你的想法和感受！</p>
<hr>
<p>欢迎大家关注知乎专栏：<a href="https://zhuanlan.zhihu.com/dingxuewen" rel="nofollow noreferrer" target="_blank">全栈成长之路</a></p>
<p>文章保质保量 (づ￣3￣)づ╭?～</p>
<p>也欢迎大家加入学习交流QQ群：637481811</p>
<p><br></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009218712" src="https://static.alili.tech/img/remote/1460000009218712" alt="" title="" style="cursor: pointer;"></span></p>
<p>本文首发于我的 <strong><a href="http://www.dingxuewen.com" rel="nofollow noreferrer" target="_blank">个人网站 LeviDing</a></strong> ，更多内容欢迎关注我的个人网站。<br>欢迎扫描上方二维码关注 <strong>公众号: LeviDing</strong> 订阅实时动态。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
带你入门 CSS Grid 布局

## 原文链接
[https://segmentfault.com/a/1190000010000545](https://segmentfault.com/a/1190000010000545)

