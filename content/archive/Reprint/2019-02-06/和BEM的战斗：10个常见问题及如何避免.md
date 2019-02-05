---
title: '和BEM的战斗：10个常见问题及如何避免' 
date: 2019-02-06 2:30:09
hidden: true
slug: tyt33co12ae
categories: [reprint]
---

{{< raw >}}

                    
<p>无论你是刚刚发现BEM或者已经是个中熟手（作为web术语来说），你可能已经意识到它是一种有用的方法。如果你还不知道BEM是什么，我建议你在继续阅读这篇文章之前去<a href="https://en.bem.info/" rel="nofollow noreferrer" target="_blank">BEM website</a>了解一下它，因为我会假设你对这种CSS的方法有一个基础的理解。</p>
<p>本文旨在对那些已经是BEM的爱好者或是想要去更有效率的使用它或是非常好奇并且想去学习它的人有所帮助。</p>
<p>现在，我对BEM是一个优雅的命名方式已经不报有任何幻想。它完全不是。我曾经很长一段时间放弃接受它的原因之一就是它的语法看起来非常丑陋。我心中的设计因子不希望我优雅的html结构被丑陋的双下划线和连字符弄得一团糟。</p>
<p>而我心中的开发者因子让我务实地看待它。最终，这种用来构建用户界面并且有逻辑性的、模块化的方式战胜了我右半边大脑的抱怨：“但是它不够漂亮！”我当然不会建议你在像起居室这样小的范围内使用这种方式，但是当你需要一件救生衣（就像你遨游在CSS的大海中），我会选择实用而不是形式。话题拓展的差不多了，以下是10种我已经遇到过的困境和一些如何解决它们的技巧。</p>
<h3 id="articleHeader0">1. 如何使用子代甚至更深层次的选择器？</h3>
<p>首先来解释这个问题，当你需要选择一个嵌套超过两层的元素，你就会需要用到子孙选择器。这些选择器简直就是我的梦魇，而且我很确定他们的滥用是人们对BEM产生厌恶的原因之一，看下面这个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;c-card&quot;>

    <div class=&quot;c-card__header&quot;>
        <!-- Here comes the grandchild… -->
        <h2 class=&quot;c-card__header__title&quot;>Title text here</h2>
    </div>

    <div class=&quot;c-card__body&quot;>

        <img class=&quot;c-card__body__img&quot; src=&quot;some-img.png&quot; alt=&quot;description&quot;>
        <p class=&quot;c-card__body__text&quot;>Lorem ipsum dolor sit amet, consectetur</p>
        <p class=&quot;c-card__body__text&quot;>Adipiscing elit.
            <a href=&quot;/somelink.html&quot; class=&quot;c-card__body__text__link&quot;>Pellentesque amet</a>
        </p>

    </div>
</div> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"c-card"</span>&gt;

    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-card__header"</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- Here comes the grandchild… --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-card__header__title"</span>&gt;</span>Title text here<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

    &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"c-card__body"</span>&gt;

        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-card__body__img"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"some-img.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"description"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-card__body__text"</span>&gt;</span>Lorem ipsum dolor sit amet, consectetur<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-card__body__text"</span>&gt;</span>Adipiscing elit.
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/somelink.html"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-card__body__text__link"</span>&gt;</span>Pellentesque amet<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt; </span></code></pre>
<p>就像你想的那样，以这种方式命名会很快就会脱离控制，并且一个组件嵌套的越深，越丑陋也越不可读的类名就会出现。我已经使用了一个短块名称<code>c-card</code>和短元素名，比如:<code>body</code>，<code>text</code>，<code>link</code>，但是你可以想象当块和元素的初始部分被命名为<code>c-drop-down-menu</code>会有多么失控。</p>
<p>我认为双下划线在选择器名称中只应该出现一次。BEM代表的是<code>Block__Element--Modifier</code>，而不是<code>Block__Element__Element--Modifier</code>。所以，避免多个元素级的命名。如果存在多级嵌套，你可能就需要重新审查一下你的组件结构。</p>
<p>BEM命名和DOM没有很严格的联系，所以无论子元素的嵌套程度有多深都没有关系。命名约定只是用来帮助你识别子元素和顶层组件块的关系，在这里就是<code>c-card</code>。</p>
<p>这是我对相同card组件的处理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;c-card&quot;>
    <div class=&quot;c-card__header&quot;>
        <h2 class=&quot;c-card__title&quot;>Title text here</h2>
    </div>

    <div class=&quot;c-card__body&quot;>

        <img class=&quot;c-card__img&quot; src=&quot;some-img.png&quot; alt=&quot;description&quot;>
        <p class=&quot;c-card__text&quot;>Lorem ipsum dolor sit amet, consectetur</p>
        <p class=&quot;c-card__text&quot;>Adipiscing elit.
            <a href=&quot;/somelink.html&quot; class=&quot;c-card__link&quot;>Pellentesque amet</a>
        </p>

    </div>
</div> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"c-card"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-card__header"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-card__title"</span>&gt;</span>Title text here<span class="hljs-tag">&lt;/<span class="hljs-name">h2</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

    &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"c-card__body"</span>&gt;

        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-card__img"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"some-img.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"description"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-card__text"</span>&gt;</span>Lorem ipsum dolor sit amet, consectetur<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-card__text"</span>&gt;</span>Adipiscing elit.
            <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/somelink.html"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-card__link"</span>&gt;</span>Pellentesque amet<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt; </span></code></pre>
<p>这意味着所有的子元素都仅仅会被card块影响。所以，我们可以将文本和图片移动到<code>c-card__header</code>，甚至在不破坏语义结构的情况下添加一个<code>c-card__footer</code>元素。</p>
<h3 id="articleHeader1">2. 我应该使用命名空间吗？</h3>
<p>现在，你可能已经注意到我的代码示例中使用了<code>c-</code>。这代表“组件”和形成了我命名BEM类名的规范。这个想法来自于致力于提升代码可读性的Harry Robert's<a href="http://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/" rel="nofollow noreferrer" target="_blank">namespacing technique</a></p>
<p>这是我采用的规范，很多前缀会贯穿这篇文章的代码示例。</p>
<table>
<thead><tr>
<th>TYPE</th>
<th>PREFIX</th>
<th>EXAMPLES</th>
</tr></thead>
<tbody>
<tr>
<td>Component</td>
<td><code>c-</code></td>
<td>
<code>c-card</code> <code>c-checklist</code>
</td>
</tr>
<tr>
<td>Layout module</td>
<td><code>l-</code></td>
<td>
<code>l-grid</code> <code>l-container</code>
</td>
</tr>
<tr>
<td>Helpers</td>
<td><code>h-</code></td>
<td>
<code>h-show</code> <code>h-hide</code>
</td>
</tr>
<tr>
<td>States</td>
<td>
<code>is-</code> <code>has-</code>
</td>
<td>
<code>is-visible</code> <code>has-loaded</code>
</td>
</tr>
<tr>
<td>JavaScript hooks</td>
<td><code>js-</code></td>
<td><code>js-tab-switcher</code></td>
</tr>
</tbody>
</table>
<p>我发现使用这些命名空间会使我的代码非常具有可读性。即使我不能强求你使用BEM，这也绝对是一个值得你使用的关键点。</p>
<p>你可以采用很多其它的命名空间，像<code>qa-</code>可以用作质量保证测试，<code>ss-</code>用作服务器端的钩子，等等。但是上面的列表是一个好的开始，当你觉得这项技术还不错，你可以把它介绍给其他人。</p>
<p>在下个问题中，会有一个比较实用的关于样式命名空间的示例。</p>
<h3 id="articleHeader2">3. 我该如何命名包裹容器？</h3>
<p>一些组建需要一个掌控子元素布局的容器。在这种情况下，我通常会尝试把布局抽象到一个布局模块中，比如<code>l-grid</code>，并且将每一个组件作为<code>l-grid__item</code>的内容插入。<br>在我们card的示例中，如果我们想要去生成拥有四个<code>c-card</code>的列表，我会使用下面的html结构：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul class=&quot;l-grid&quot;>
    <li class=&quot;l-grid__item&quot;>
        <div class=&quot;c-card&quot;>
            <div class=&quot;c-card__header&quot;>
                […]
            </div>
            <div class=&quot;c-card__body&quot;>
                […]
            </div>
        </div>
    </li>
    <li class=&quot;l-grid__item&quot;>
        <div class=&quot;c-card&quot;>
            <div class=&quot;c-card__header&quot;>
                […]
            </div>
            <div class=&quot;c-card__body&quot;>
                […]
            </div>
        </div>
    </li>
    <li class=&quot;l-grid__item&quot;>
        <div class=&quot;c-card&quot;>
            <div class=&quot;c-card__header&quot;>
                […]
            </div>
            <div class=&quot;c-card__body&quot;>
                […]
            </div>
        </div>
    </li>
    <li class=&quot;l-grid__item&quot;>
        <div class=&quot;c-card&quot;>
            <div class=&quot;c-card__header&quot;>
                […]
            </div>
            <div class=&quot;c-card__body&quot;>
                […]
            </div>
        </div>
    </li>
</ul> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;ul <span class="hljs-built_in">class</span>=<span class="hljs-string">"l-grid"</span>&gt;
    &lt;li <span class="hljs-built_in">class</span>=<span class="hljs-string">"l-grid__item"</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"c-card"</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"c-card__header"</span>&gt;
                […]
            &lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"c-card__body"</span>&gt;
                […]
            &lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/li&gt;
    &lt;li <span class="hljs-built_in">class</span>=<span class="hljs-string">"l-grid__item"</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"c-card"</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"c-card__header"</span>&gt;
                […]
            &lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"c-card__body"</span>&gt;
                […]
            &lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/li&gt;
    &lt;li <span class="hljs-built_in">class</span>=<span class="hljs-string">"l-grid__item"</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"c-card"</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"c-card__header"</span>&gt;
                […]
            &lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"c-card__body"</span>&gt;
                […]
            &lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/li&gt;
    &lt;li <span class="hljs-built_in">class</span>=<span class="hljs-string">"l-grid__item"</span>&gt;
        &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"c-card"</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"c-card__header"</span>&gt;
                […]
            &lt;/<span class="hljs-keyword">div</span>&gt;
            &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"c-card__body"</span>&gt;
                […]
            &lt;/<span class="hljs-keyword">div</span>&gt;
        &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;/li&gt;
&lt;/ul&gt; </code></pre>
<p>你现在应该理解布局模块和组件的命名空间是如何一起工作的。</p>
<p>不要害怕使用一些额外的标记会非常令人头痛。没有人会拍拍你的背然后告诉你去把<code>&lt;div&gt;</code>标签移除掉的。</p>
<p>在一些情景下，布局模块是不可能的完全满足要求的。比如说你的网格没有能给你想要的结果，或者你只是想要去语义化的命名一个父元素，你应该怎么做？在不同的场景我倾向去选择<code>contaniner</code>或者<code>list</code>。还是我们card的例子，我可能会用<code>&lt;div class="l-cards-container"&gt;[…]&lt;/div&gt;</code>&nbsp;or&nbsp;<code>&lt;ul class="l-cards-list"&gt;[…]&lt;/ul&gt;</code>或者是<code>&lt;ul class="l-cards-list"&gt;[…]&lt;/ul&gt;</code>，这取决于使用的条件。关键是要和你的命名约定保持一致。</p>
<h3 id="articleHeader3">4. 跨组件的组建？</h3>
<p>我们面临的另一个常见的问题是组件的样式和位置会受到父级容器的影响。就这个问题Simurai有很多<a href="http://simurai.com/blog/2015/05/11/nesting-components" rel="nofollow noreferrer" target="_blank">详细的解决办法</a>。我这里说一个拓展性最好的方式。</p>
<p>假设我们想要在之前的示例的<code>card__body</code>中加入一个<code>c-button</code>。这个按钮本身已经是一个组件并且结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`<button class=&quot;c-button c-button--primary&quot;>Click me!</button>` " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;">`<span class="javascript">&lt;button <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"c-button c-button--primary"</span>&gt;Click me!<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span></span>` </code></pre>
<p>如果和常规的按钮组件没有样式差别，那么就没有问题。我们只要像下面这样直接使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;c-card&quot;>
    <div class=&quot;c-card__header&quot;>
        <h2 class=&quot;c-card__title&quot;>Title text here</h3>
    </div>

    <div class=&quot;c-card__body&quot;>

        <img class=&quot;c-card__img&quot; src=&quot;some-img.png&quot;>
        <p class=&quot;c-card__text&quot;>Lorem ipsum dolor sit amet, consectetur</p>
        <p class=&quot;c-card__text&quot;>Adipiscing elit. Pellentesque.</p>

        <!-- Our nested button component -->
        <button class=&quot;c-button c-button--primary&quot;>Click me!</button>

    </div>
</div> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"c-card"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-card__header"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-card__title"</span>&gt;</span>Title text here<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

    &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"c-card__body"</span>&gt;

        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-card__img"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"some-img.png"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-card__text"</span>&gt;</span>Lorem ipsum dolor sit amet, consectetur<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-card__text"</span>&gt;</span>Adipiscing elit. Pellentesque.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

        <span class="hljs-comment">&lt;!-- Our nested button component --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-button c-button--primary"</span>&gt;</span>Click me!<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt; </span></code></pre>
<p>举个例子，如果我们想要让按钮变小一点并且完全是圆角，而这些样式只是<code>c-card</code>组件的一部分。也就是说，当它有一些微小的不同时我们应该怎么办？</p>
<p>之前我说过，我找到一个最好用的跨组件类名的解决方式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;c-card&quot;>
    <div class=&quot;c-card__header&quot;>
        <h2 class=&quot;c-card__title&quot;>Title text here</h3>
    </div>

    <div class=&quot;c-card__body&quot;>

        <img class=&quot;c-card__img&quot; src=&quot;some-img.png&quot;>
        <p class=&quot;c-card__text&quot;>Lorem ipsum dolor sit amet, consectetur</p>
        <p class=&quot;c-card__text&quot;>Adipiscing elit. Pellentesque.</p>

        <!-- My *old* cross-component approach -->
        <button class=&quot;c-button c-card__c-button&quot;>Click me!</button>

    </div>
</div> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"c-card"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-card__header"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-card__title"</span>&gt;</span>Title text here<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

    &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"c-card__body"</span>&gt;

        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-card__img"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"some-img.png"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-card__text"</span>&gt;</span>Lorem ipsum dolor sit amet, consectetur<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-card__text"</span>&gt;</span>Adipiscing elit. Pellentesque.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

        <span class="hljs-comment">&lt;!-- My *old* cross-component approach --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-button c-card__c-button"</span>&gt;</span>Click me!<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt; </span></code></pre>
<p>这就是<a href="https://en.bem.info/forum/4/" rel="nofollow noreferrer" target="_blank">BEM官网</a>上著名的“mix”。但是，参考了一些从Esteban Lussich的评价之后，我改变了对这种方式的看法。</p>
<p>在上面的例子中，<code>c-card__c-button</code>类尝试去改变一个或多个<code>c-button</code>中存在的属性，但是成功应用这些样式取决于他们的源顺序（或者特殊的指定）。<code>c-card__c-button</code>类只会当它在源代码里声明在<code>c-button</code>类之后才会生效。在你构建更多跨组件的组件时会很快失控。（当然，使用<code>!important</code>也是一种选择，但是我不建议你这样做）</p>
<p>一个真正模块化的UI元素的父元素应该是完全不可知的-无论你在何处使用它，效果都应该是一致的。像“mix”方式那样为另一个组件添加具有特定样式的类名，违反了组件驱动设计的<a href="https://en.wikipedia.org/wiki/Open/closed_principle" rel="nofollow noreferrer" target="_blank">开/关原则</a>，即样式在各模块之间不应该有依赖关系。</p>
<p>最好的办法就是在这些微小的样式差别中使用同一个类，因为你会发现随着项目的增长你会在别的地方对它进行复用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`<button class=&quot;c-button c-button--rounded c-button--small&quot;>Click me!</button>`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;">`<span class="javascript">&lt;button <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"c-button c-button--rounded c-button--small"</span>&gt;Click me!<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span></span>`</code></pre>
<p>即使你不会再使用这些类，为了应用这些修改，至少也不能把他们和父容器、特殊属性和源顺序耦合在一起。</p>
<p>当然，另一个选择就是回到你的设计师岗位，告诉他们这个按钮应该和网站上的其他按钮保持一致，这样就可以完全避免这个问题。但这是另一码事了。</p>
<h3 id="articleHeader4">5. 修饰器还是新组件？</h3>
<p>决定组件的起止是一个大问题。在<code>c-card</code>这个示例里，你可能之后会创建另一个叫<code>c-panel</code>的组件，他们两个样式相仿，只有一些细微的差别。</p>
<p>但是是什么决定他们应该是两个组件呢？<code>c-panel</code>和<code>c-card</code>这个块名，或者仅仅是因为一个修饰器在<code>c-card</code>里应用了特殊的样式。</p>
<p>这样很容易过度模块化并且让一切都变成一个组件。我建议从修饰器开始，但是如果你发现你特定组件的CSS文件正变得很难维护，这时候就可以停止使用修饰器。当你发现你为了适应你新的修饰器而不得不去重置这个“块”所有的CSS时，就是需要新组件的好时机-起码对我来说是这样的。</p>
<p>如果你和其它开发者或者设计师协作，最好的方式是去询问他们的意见并且花几分钟去讨论。我知道这样可能有点逃避责任，但是对于一个大型项目来说，理解哪些模块是可复用的并且在组件的构成上达成一致是至关重要的。</p>
<h3 id="articleHeader5">6. 如何处理状态？</h3>
<p>这是一个常见的问题，特别是当你给一个活跃状态的组件编写样式的时候。让我们假设cards有一个活跃状态，当我们点击它时，它们会被添加上一个好看的边框。你会怎么去命名这个类？</p>
<p>在我看来你有两种选择：独立的状态钩或者是一个在组件级类似BEM方式命名的修饰器。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 独立状态勾 -->
<div class=&quot;c-card is-active&quot;>
    […]
</div>

<!-- BEM修饰器 -->
<div class=&quot;c-card c-card--is-active&quot;>
    […]
</div> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-comment">&lt;!-- 独立状态勾 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-card is-active"</span>&gt;</span>
    […]
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-comment">&lt;!-- BEM修饰器 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-card c-card--is-active"</span>&gt;</span>
    […]
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> </code></pre>
<p>尽管我更倾向于保持一致性的类似BEM的命名方式，独立类名的好处是使用JavaScript来在任意一个组件中应用一般的状态钩更容易。当你不得不使用脚本去应用特定的基于修饰器的状态类时，类BEM的方式就很让人头疼了。这当然是完全可行的，但是意味着你需要为每种可能性去编写更多的JavaScript代码。</p>
<p>坚持使用一系列标准的状态钩是有意义的。Chris Pearece有一个<a href="https://github.com/chris-pearce/css-guidelines#state-hooks" rel="nofollow noreferrer" target="_blank">编译好的列表</a>，我推荐你去了解一下。</p>
<h3 id="articleHeader6">7. 什么时候可以不在元素上添加类？</h3>
<p>我可以理解很多人在需要构建一个复杂UI的时候面临的痛苦，特别是他们不习惯去在每个标签上添加一个类。</p>
<p>通常，我会在需要特殊样式的部分上下文添加类名。我会把<code>p</code>标签级的舍弃，除非在这个组件中有特殊的需求。</p>
<p>可以预见，这意味着你的html中会包括非常多类名。最终，你的组件可以独立运行并且在没有副作用的条件下在任何地方使用。</p>
<p>由于CSS的全局特性，在所有部分都添加类让我们可以完全控制我们组件的渲染。最初的心理不适在一整个模块化的系统完成后是完全值得的。</p>
<h3 id="articleHeader7">8. 如何嵌套组件？</h3>
<p>假设我们想要在<code>c-card</code>组件中展示一个选项列表，下面这是一个反面教材：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;c-card&quot;>
    <div class=&quot;c-card__header&quot;>
        <h2 class=&quot;c-card__title&quot;>Title text here</h3>
    </div>

    <div class=&quot;c-card__body&quot;>

        <p>I would like to buy:</p>

        <!-- Uh oh! A nested component -->
        <ul class=&quot;c-card__checklist&quot;>
            <li class=&quot;c-card__checklist__item&quot;>
                <input id=&quot;option_1&quot; type=&quot;checkbox&quot; name=&quot;checkbox&quot; class=&quot;c-card__checklist__input&quot;>
                <label for=&quot;option_1&quot; class=&quot;c-card__checklist__label&quot;>Apples</label>
            </li>
            <li class=&quot;c-card__checklist__item&quot;>
                <input id=&quot;option_2&quot; type=&quot;checkbox&quot; name=&quot;checkbox&quot; class=&quot;c-card__checklist__input&quot;>
                <label for=&quot;option_2&quot; class=&quot;c-card__checklist__label&quot;>Pears</label>
            </li>
        </ul>

    </div>
    <!-- .c-card__body -->
</div>
<!-- .c-card --> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-card"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-card__header"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-card__title"</span>&gt;</span>Title text here<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-card__body"</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>I would like to buy:<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

        <span class="hljs-comment">&lt;!-- Uh oh! A nested component --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-card__checklist"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-card__checklist__item"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"option_1"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-card__checklist__input"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"option_1"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-card__checklist__label"</span>&gt;</span>Apples<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-card__checklist__item"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"option_2"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-card__checklist__input"</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"option_2"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-card__checklist__label"</span>&gt;</span>Pears<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- .c-card__body --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-comment">&lt;!-- .c-card --&gt;</span> </code></pre>
<p>这里有很多问题。第一个是我们在第一点里提到的子孙选择器。第二点是所有应用<code>c-card__checklist__item</code>样式都被限定使用，不能复用。</p>
<p>我更倾向于这里需要打破在这个布局模块中的列表本身，而是应该把选项列表单独抽象成一个组件，这样就可以在其它地方独立使用它们。这里我们使用<code>l-</code>命名空间。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;c-card&quot;>
    <div class=&quot;c-card__header&quot;>
        <h2 class=&quot;c-card__title&quot;>Title text here</h3>
    </div>

    <div class=&quot;c-card__body&quot;><div class=&quot;c-card__body&quot;>

        <p>I would like to buy:</p>

        <!-- Much nicer - a layout module -->
        <ul class=&quot;l-list&quot;>
            <li class=&quot;l-list__item&quot;>

                <!-- A reusable nested component -->
                <div class=&quot;c-checkbox&quot;>
                    <input id=&quot;option_1&quot; type=&quot;checkbox&quot; name=&quot;checkbox&quot; class=&quot;c-checkbox__input&quot;>
                    <label for=&quot;option_1&quot; class=&quot;c-checkbox__label&quot;>Apples</label>
                </div>

            </li>
            <li class=&quot;l-list__item&quot;>

                <div class=&quot;c-checkbox&quot;>
                    <input id=&quot;option_2&quot; type=&quot;checkbox&quot; name=&quot;checkbox&quot; class=&quot;c-checkbox__input&quot;>
                    <label for=&quot;option_2&quot; class=&quot;c-checkbox__label&quot;>Pears</label>
                </div>

            </li>
        </ul>
        <!-- .l-list -->

    </div>
    <!-- .c-card__body -->
</div>
<!-- .c-card --> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"c-card"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-card__header"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h2</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-card__title"</span>&gt;</span>Title text here<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>

    &lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"c-card__body"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-card__body"</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>I would like to buy:<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>

        <span class="hljs-comment">&lt;!-- Much nicer - a layout module --&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"l-list"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"l-list__item"</span>&gt;</span>

                <span class="hljs-comment">&lt;!-- A reusable nested component --&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-checkbox"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"option_1"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-checkbox__input"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"option_1"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-checkbox__label"</span>&gt;</span>Apples<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"l-list__item"</span>&gt;</span>

                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-checkbox"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"option_2"</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"checkbox"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-checkbox__input"</span>&gt;</span>
                    <span class="hljs-tag">&lt;<span class="hljs-name">label</span> <span class="hljs-attr">for</span>=<span class="hljs-string">"option_2"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"c-checkbox__label"</span>&gt;</span>Pears<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span>
                <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

            <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
        <span class="hljs-comment">&lt;!-- .l-list --&gt;</span>

    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- .c-card__body --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-comment">&lt;!-- .c-card --&gt;</span> </span></code></pre>
<p>这样你就不用重复哪些样式，同时也意味着我们可以在项目中的其它地方使用<code>l-list</code>和<code>c-checkbox</code>。可能这意味着更多的标记，但是对于可读性，封装性和可复用性来说代价可以忽略。你可能已经注意到这些是共同的主题！</p>
<h3 id="articleHeader8">9. 组件会不会最终有无数个类名？</h3>
<p>有些人认为每个元素有大量类名是不好的，<code>--modifiers</code>会越积越多。就我个人而言，我不认为这是个问题，因为这意味着代码更具有可读性，我也能更清楚的知道它是用来实现什么的。</p>
<p>举个例子，这是一个具有四个类的按钮：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`<button class=&quot;c-button c-button--primary c-button--huge  is-active&quot;>Click me!</button>` " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;">`<span class="javascript">&lt;button <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"c-button c-button--primary c-button--huge  is-active"</span>&gt;Click me!<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span></span>` </code></pre>
<p>我第一眼看到的时候觉得语法不是最简洁的，但是非常清晰。</p>
<p>如果这让你非常头痛，你可以查看Sergey Zarouski提出的<a href="http://webuniverse.io/css-organization-naming-conventions-and-safe-extend-without-preprocessors/#To_extend_or_not_to_extend?" rel="nofollow noreferrer" target="_blank">拓展技术</a>，我们可以在样式表中使用<code>.className [class^="className"]</code>和<code>[class*=" className"]</code>来效仿vanilla CSS的拓展功能。如果语法看起来很眼熟，可能是因为和<a href="https://icomoon.io/" rel="nofollow noreferrer" target="_blank">Icomoon</a>处理它的icon选择器的方式非常类似。</p>
<p>使用这种技术，你的代码可能会看起来像下面这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`<button class=&quot;c-button--primary-huge  is-active&quot;>Click me!</button>` " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;">`<span class="javascript">&lt;button <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"c-button--primary-huge  is-active"</span>&gt;Click me!<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></span></span>` </code></pre>
<p>我不知道使用<code>class^=</code>和<code>class*=</code>选择器是否比独立的类名表现更好，但是理论上来说这是一个不错的选择。我喜欢使用复合类名，但我觉得这值得那些倾向于寻找替代品的人注意一下。</p>
<h3 id="articleHeader9">10. 我们可以响应式的改变组件的样式吗？</h3>
<p>这是Arie Thulank给我提出的问题，我花费了很多心思去想出一个100%具体具体的解决办法。</p>
<p>一个例子就是下拉菜单在给定断点处转换为选项卡或者是隐式导航在给定断点处转换为菜单栏。本质上是一个组件在媒体查询的控制下有两种不同的样式表现。</p>
<p>我倾向于给这两个例子去构建一个<code>c-navigation</code>组件，因为他们在两个断点处的行为本质是相同的。但这让我陷入沉思，如果是图片列表在大屏幕上转化为轮播图呢？这对我来说是一个边缘情况，只要它有可行的文档及评论，我认为这是合理的。可是使用明确的命名（像<code>c-image-list-to-carousel</code>）来为这种类型的UI构造一次性的独立组件。</p>
<p>Harry Roberts写过一篇<a href="http://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/" rel="nofollow noreferrer" target="_blank">响应式后缀</a>来解决这个问题。他的做法是为了适应更多布局和样式的变化，而不是整个组件的变化。但我不明白为什么这项技术不能被应用在这里。所以，你会发现作者写的样式像下面这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`<ul class=&quot;c-image-list@small-screen c-carousel@large-screen&quot;>` " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;">`&lt;ul <span class="hljs-keyword">class</span>=<span class="hljs-string">"c-image-list@small-screen c-carousel@large-screen"</span>&gt;` </code></pre>
<p>对于不同的屏幕尺寸，这些类就会保留各自的媒体查询。提示：在CSS中你需要在<code>@</code>前加上<code>\</code>来进行转义，像下面这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".c-image-list\@small-screen {
    /* styles here */
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.c-image-list</span>\@<span class="hljs-keyword">small</span>-<span class="hljs-keyword">screen</span> {
    <span class="hljs-comment">/* styles here */</span>
} </code></pre>
<p>我没有太多构造这种组件的示例，但是如果你需要构造这种组件，这将是一个对开发者非常友好的方式。下一个加入的人应该可以轻松理解你的想法。我不提倡你使用像<code>small-screen</code>和<code>large-screen</code>这样的命名，他们只是单纯为了可读性。</p>
<h3 id="articleHeader10">总结</h3>
<p>BEM在我创建一个模块化和组件驱动的应用时帮了大忙。我已经使用它大概有三年了，上面的这些问题是我在探索时遇到的阻碍。我希望你认为这篇文章是有用的。如果你还没有想要体验BEM，我非常鼓励你去尝试一下。</p>
<blockquote><p>本文根据<a href="/u/david">@David</a> Berner的<a href="https://www.smashingmagazine.com/2016/06/battling-bem-extended-edition-common-problems-and-how-to-avoid-them/" rel="nofollow noreferrer" target="_blank">《Battling BEM (Extended Edition): 10 Common Problems And How To Avoid Them》</a>所译，整个译文带有我自己的理解与思想，如果译得不好或有不对之处还请多多指点。如需转载此译文，需注明英文出处:<a href="https://www.smashingmagazine.com/2016/06/battling-bem-extended-edition-common-problems-and-how-to-avoid-them/" rel="nofollow noreferrer" target="_blank">https://www.smashingmagazine....</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
和BEM的战斗：10个常见问题及如何避免

## 原文链接
[https://segmentfault.com/a/1190000006135647](https://segmentfault.com/a/1190000006135647)

