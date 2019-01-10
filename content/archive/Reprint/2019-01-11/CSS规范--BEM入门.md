---
title: 'CSS规范--BEM入门' 
date: 2019-01-11 2:30:07
hidden: true
slug: ypxnxtgysi
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>这段时间在整理前端部分的代码规范，前面提到的CSS规范里面会涉及到选择器的命名，就参考BEM的命名规范，内容整理如下，供大家参考，请斧正！如大家有兴趣，可移步至<a href="https://segmentfault.com/a/1190000009951469?_ea=2108730">CSS编码规范</a></p></blockquote>
<p>BEM是由Yandex公司推出的一套CSS命名规范，官方是这么描述它的：</p>
<blockquote><p>BEM是一种让你可以快速开发网站并对此进行多年维护的技术。</p></blockquote>
<p>一开始，Yandex公司推出的BEM，包括了规范以及其配套构建工具。如今提到的BEM主要是指其中的规范，在<a href="http://getbem.com/" rel="nofollow noreferrer" target="_blank">BEM最新的推广页</a>中，对其的描述为：</p>
<blockquote><p>BEM是一种命名方法，能够帮助你在前端开发中实现可复用的组件和代码共享。</p></blockquote>
<h2 id="articleHeader0">BEM解决的问题</h2>
<h3 id="articleHeader1">css的样式应用是全局性的，没有作用域可言。</h3>
<p>考虑以下场景：<br>场景一：开发一个弹窗组件，在现有页面中测试都没问题，一段时间后，新需求新页面，该页面一打开这个弹窗组件，页面中样式都变样了，一查问题，原来是弹窗组件和该页面的样式相互覆盖了，接下来就是修改覆盖样式的选择器...又一段时间，又开发新页面，每次为元素命名都心惊胆战，求神拜佛，没写一条样式，F5都按多几次，每个组件都测试一遍...</p>
<p>场景二：承接上文，由于页面和弹窗样式冲突了，所以把页面的冲突样式的选择器加上一些结构逻辑，比如子选择器、标签选择器，借此让选择器独一无二。一段时间后，新同事接手跟进需求，对样式进行修改，由于选择器是一连串的结构逻辑，看不过来，嫌麻烦，就干脆在样式文件最后用另一套选择器，加上了覆盖样式...接下来又有新的需求...最后的结果，一个元素对应多套样式，遍布整个样式文件...</p>
<p>以往开发组件，我们都用“重名概率小”或者干脆起个“当时认为是独一无二的名字”来保证样式不冲突，这是不可靠的。<br>理想的状态下，我们开发一套组件的过程中，我们应该可以随意的为其中元素进行命名，而不必担心它是否与组件以外的样式发生冲突。</p>
<p>BEM解决这一问题的思路在于，由于项目开发中，每个组件都是唯一无二的，其名字也是独一无二的，组件内部元素的名字都加上组件名，并用元素的名字作为选择器，自然组件内的样式就不会与组件外的样式冲突了。</p>
<p><strong>这是通过组件名的唯一性来保证选择器的唯一性，从而保证样式不会污染到组件外。</strong></p>
<p>BEM的意思就是块（block）、元素（element）、修饰符（modifier）,是由Yandex团队提出的一种前端命名方法论。这种巧妙的命名方法让你的CSS类对其他开发者来说更加透明而且更有意义。BEM命名约定更加严格，而且包含更多的信息，它们用于一个团队开发一个耗时的大项目。</p>
<p>命名约定的模式如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".block {}
.block__element{}
.block--modifier {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">.block {}
.block__element{}
.block--modifier {}</code></pre>
<ul>
<li><p><code>.block</code> 代表了更高级别的抽象或组件。</p></li>
<li><p><code>.block__element</code> 代表.block的后代，用于形成一个完整的.block的整体。</p></li>
<li><p><code>.block--modifier</code> 代表.block的不同状态或不同版本。</p></li>
</ul>
<p><strong>BEM的关键是光凭名字就可以告诉其他开发者某个标记是用来干什么的。</strong> 通过浏览HTML代码中的class属性，你就能够明白模块之间是如何关联的：有一些仅仅是组件，有一些则是这些组件的子孙或者是元素,还有一些是组件的其他形态或者是修饰符。</p>
<p>我们用一个类比/模型来思考一下下面的这些元素是怎么关联的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".person {}
.person__hand {}
.person--female {}
.person--female__hand {}
.person__hand--left {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">.person {}
.person__hand {}
.person--female {}
.person--female__hand {}
.person__hand--left {}</code></pre>
<p>顶级块是‘person’，它拥有一些元素，如‘hand’。一个人也会有其他形态，比如女性，这种形态进而也会拥有它自己的元素。下面我们把他们写成‘常规’CSS:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".person {}
.hand {}
.female {}
.female-hand {}
.left-hand {}  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.person</span> {}
<span class="hljs-selector-class">.hand</span> {}
<span class="hljs-selector-class">.female</span> {}
<span class="hljs-selector-class">.female-hand</span> {}
<span class="hljs-selector-class">.left-hand</span> {}  </code></pre>
<p>这些‘常规’CSS都是有意义的，但是它们之间却有些脱节。就拿.female来说，是指女性人类还是某种雌性的动物？还有.hand，是在说一只钟表的指针（译注：英文中hand有指针的意思）？还是一只正在玩纸牌的手？使用BEM我们可以获得更多的描述和更加清晰的结构，单单通过我们代码中的命名就能知道元素之间的关联。BEM真是强大。</p>
<p>再来看一个之前用‘常规’方式命名的.site-search的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<form class=&quot;site-search  full&quot;>
    <input type=&quot;text&quot; class=&quot;field&quot;>
    <input type=&quot;Submit&quot; value =&quot;Search&quot; class=&quot;button&quot;>
</form>  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"site-search  full"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"field"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"Submit"</span> <span class="hljs-attr">value</span> =<span class="hljs-string">"Search"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"button"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>  </code></pre>
<p>这些CSS类名真是太不精确了，并不能告诉我们足够的信息。尽管我们可以用它们来完成工作，但它们确实非常含糊不清。用BEM记号法就会是下面这个样子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<form class=&quot;site-search  site-search--full&quot;>
    <input type=&quot;text&quot; class=&quot;site-search__field&quot;>
    <input type=&quot;Submit&quot; value =&quot;Search&quot; class=&quot;site-search__button&quot;>
</form> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"site-search  site-search--full"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"site-search__field"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"Submit"</span> <span class="hljs-attr">value</span> =<span class="hljs-string">"Search"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"site-search__button"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span> </code></pre>
<p>从这种CSS的写法上我们就已经知道<code>.media__img</code> 和<code>.media__body</code>一定是位于<code>.media</code>内部的，而且<code>.media__img--rev</code>是<code>.media__img</code>的另一种形态。仅仅通过CSS选择器的名字我们就能获取到以上全部信息。</p>
<p>BEM的另外一个好处是针对下面这种情况：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;media&quot;>
    <img src=&quot;logo.png&quot; alt=&quot;Foo Corp logo&quot; class=&quot;img-rev&quot;>
    <div class=&quot;body&quot;>
        <h3 class=&quot;alpha&quot;>Welcome to Foo Corp</h3>
        <p class=&quot;lede&quot;>Foo Corp is the best, seriously!</p>
    </div>
</div> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"media"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"logo.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"Foo Corp logo"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"img-rev"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"body"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"alpha"</span>&gt;</span>Welcome to Foo Corp<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"lede"</span>&gt;</span>Foo Corp is the best, seriously!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> </code></pre>
<p>光从上面的代码来看，我们根本不明白.media和.alpha两个class彼此之间是如何相互关联的？同样我们也无从知晓.body和.lede之间，或者.img-rev 和.media之间各是什么关系？从这段HTML（除非你对那个media对象非常了解）中我们也不知道这个组件是由什么组成的和它还有什么其他的形态。如果我们用BEM方式重写这段代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;media&quot;>
    <img src=&quot;logo.png&quot; alt=&quot;Foo Corp logo&quot; class=&quot;media__img--rev&quot;>
    <div class=&quot;media__body&quot;>
        <h3 class=&quot;alpha&quot;>Welcome to Foo Corp</h3>
        <p class=&quot;lede&quot;>Foo Corp is the best, seriously!</p>
    </div>
</div>   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"media"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"logo.png"</span> <span class="hljs-attr">alt</span>=<span class="hljs-string">"Foo Corp logo"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"media__img--rev"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"media__body"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h3</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"alpha"</span>&gt;</span>Welcome to Foo Corp<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">p</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"lede"</span>&gt;</span>Foo Corp is the best, seriously!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>   </code></pre>
<p>我们立马就能明白.media是一个块，<code>.media__img--rev</code>是一个加了修饰符的<code>.media__img</code>的变体，它是属于<code>.media</code>的元素。而<code>.media__body</code>是一个尚未被改变过的也是属于<code>.media</code>的元素。所有以上这些信息都通过它们的class名称就能明白，由此看来BEM确实非常实用。</p>
<h2 id="articleHeader2">使用BEM常见问题</h2>
<h3 id="articleHeader3">1 丑极了！</h3>
<p>通常人们会认为BEM这种写法难看。我敢说，如果你仅仅是因为这种代码看上去不怎么好看而羞于使用它.</p>
<p>那么你将错失最重要的东西。<strong>除非使用BEM让代码增加了不必要的维护困难，或者这么做确实让代码更难读了，那么你在使用它之前就要三思而行了</strong>。但是，如果只是“看起来有点怪”而事实上是一种有效的手段，那么我们在开发之前当然应该充分考虑它。是，BEM看上去确实怪怪的，但是它的好处远远超过它外观上的那点瑕疵。</p>
<p>BEM可能看上去有点滑稽，而且有可能导致我们输入更长的文本（大部分编辑器都有自动补全功能，而且gzip压缩将会让我们消除对文件体积的担忧），但是它依旧强大。</p>
<h3 id="articleHeader4">2. 命名好长？</h3>
<p>BEM的命名中包含了模块名，长长的命名会让HTML标签会显得臃肿。</p>
<p><strong>其实每个使用BEM的开发团队多多少少会改变其命名规范</strong>，比如Instagram团队使用的驼峰式:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".blockName-elementName--modifierName { /* ... */ }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-class">.blockName-elementName--modifierName</span> { <span class="hljs-comment">/* ... */</span> }</code></pre>
<p>还有单下划线：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".block-name_element-name--modifierName { /* ... */ }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-class">.block-name_element-name--modifierName</span> { <span class="hljs-comment">/* ... */</span> }</code></pre>
<p>还有修饰器名用单横线连接：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".blockName__elementName-modifierName { /* ... */ }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-class">.blockName__elementName-modifierName</span> { <span class="hljs-comment">/* ... */</span> }</code></pre>
<p>其实这些对缩短命名没有多大的帮助，但我们也无需担心文件体积的问题，<strong>由于服务端有gzip压缩，BEM命名相同的部分多，压缩下来的体积不会太大。另外现在都用IDE来编写代码了，有自动提示功能，也无须担心重复的输入过长的名字</strong>。因为命名长，我们是不是可以用子代选择器来代替BEM命名？这样至少在HTML编写时，让HTML标签看起来美观一点。</p>
<h3 id="articleHeader5">3. 什么时候用BEM？</h3>
<p>当你真正使用BEM的时候，重要的是，请记住你没必要真的在每个地方都用上它。比如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".caps { 
    text-transform: uppercase; 
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.caps</span> { 
    <span class="hljs-attribute">text-transform</span>: uppercase; 
} </code></pre>
<p>这条CSS不属于任何一个BEM范畴，它仅仅只是一条单独的样式。</p>
<p>另一个没有使用BEM的例子是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".site-logo {}    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-class">.site-logo</span> {}    </code></pre>
<p>这是一个logo，我们可以把它写成BEM格式，像下面这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".header {}
.header__logo {} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.header</span> {}
<span class="hljs-selector-class">.header__logo</span> {} </code></pre>
<p>但我们没必要这么做。<strong>使用BEM的诀窍是，你要知道什么时候哪些东西是应该写成BEM格式的。因为某些东西确实是位于一个块的内部，但这并不意味它就是BEM中所说的元素。</strong>这个例子中，网站logo完全是恰巧在.header的内部，它也有可能在侧边栏或是页脚里面。一个元素的范围可能开始于任何上下文，因此你要确定只在你需要用到BEM的地方你才使用它。<br>再看一个例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;content&quot;>
    <h1 class=&quot;content__headline&quot;>Lorem ipsum dolor...</h1>
</div>  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"content__headline"</span>&gt;</span>Lorem ipsum dolor...<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>  </code></pre>
<p>在这个例子里，我们也许仅仅只需要另一个class，可以叫它.headline；<strong>它的样式取决于它是如何被层叠的，因为它在.content的内部；或者它只是恰巧在.content的内部。如果它是后者（即恰巧在.content的内部，而不总是在）我们就不需要使用BEM</strong>。</p>
<p>然而，一切都有可能潜在地用到BEM。我们再来看一下.site-logo的例子，想象一下我们想要给网站增加一点圣诞节的气氛，所以我们想有一个圣诞版的logo。于是我们有了下面的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".site-logo {}
.site-logo--xmas {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">.site-logo {}
.site-logo--xmas {}</code></pre>
<p>我们可以通过使用--修饰符来快速地为我们的代码构建另一个版本。<br><strong>BEM最难的部分之一是明确作用域是从哪开始和到哪结束的，以及什么时候使用（不使用）它</strong>。随着接触的多了，有了经验积累，你慢慢就会知道怎么用，这些问题也不再是问题。</p>
<h3 id="articleHeader6">4 你是不是用错BEM了？</h3>
<p>一开始了解BEM的时候，可能会产生误解，出现以下不正确的命名方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;page-btn&quot;>
    <!-- ... -->
   <ul class=&quot;page-btn__list&quot;>
       <li class=&quot;page-btn__list__item&quot;>
           <a href=&quot;#&quot; class=&quot;page-btn__list__item__link&quot;>第一页</a>
       </li>
   </ul>
   <!-- ... -->
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"page-btn"</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- ... --&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"page-btn__list"</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"page-btn__list__item"</span>&gt;</span>
           <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"page-btn__list__item__link"</span>&gt;</span>第一页<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
       <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
   <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
   <span class="hljs-comment">&lt;!-- ... --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>分页组件有个ul列表名为：<code>page-btn__list</code>，列表里面存放每一页的按钮，名为：<code>page-btn__list__item__link</code>，这是不对的。</p>
<p>首先，有悖BEM命名规范，BEM的命名中只包含三个部分，元素名只占其中一部分，所以不能出现多个元素名的情况，所以上述每一页的按钮名可以改成：page-btn__btn。</p>
<p>而应该如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;page-btn&quot;>
    <!-- ... -->
   <ul class=&quot;page-btn__list&quot;>
       <li class=&quot;page-btn__item&quot;>
           <a href=&quot;#&quot; class=&quot;page-btn__btn&quot;>第一页</a>
       </li>
   </ul>
   <!-- ... -->
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"page-btn"</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- ... --&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"page-btn__list"</span>&gt;</span>
       <span class="hljs-tag">&lt;<span class="hljs-name">li</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"page-btn__item"</span>&gt;</span>
           <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#"</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"page-btn__btn"</span>&gt;</span>第一页<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
       <span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
   <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
   <span class="hljs-comment">&lt;!-- ... --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>其次，有悖BEM思想，<strong>BEM是不考虑结构的</strong>，比如上面的分页按钮，即使它是在ul列表里面，它的命名也不应该考虑其父级元素。当我们遵循了这个规定，无论父元素名发生改变，或是模块构造发生的改变，还是元素之间层级关系互相变动，这些都不会影响元素的名字。</p>
<p>所以即使需求变动了，分页组件该有按钮还是要有按钮的，DOM构造发生变动，至多也就不同元素的增删减，模块内名称也随之增删减，而不会出现修改名字的情况，也就不会因为名字变动，牵涉到JS文件的修改，或样式文件的修改。</p>
<h3 id="articleHeader7">5. 关于BEM修饰器</h3>
<p>BEM修饰器代表着元素的状态，但有时候元素的状态需要js来控制，此时遵循规范没有任何好处，比如激活状态，BEM推荐的写法是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".block__element {
    display: none;
}
.block__element--active {
    display: block;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.block__element</span> {
    <span class="hljs-attribute">display</span>: none;
}
<span class="hljs-selector-class">.block__element--active</span> {
    <span class="hljs-attribute">display</span>: block;
</code></pre>
<p>当用js为该元素添加状态时，我们需要知道该元素的名字<code>block__element</code>，这样我们才能推导出它的激活状态为<code>block__element--active</code>，这是不合理的，因为很多时候我们无法得知元素的名称，所以这时候，我们应该统一js控制状态的类名格式，比如<code>is-active</code>、<code>js-active</code>等等，这些类名只用作标识，不予许有默认的公共样式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".block__element {
    display: none;
}
.block__element.is-active {
    display: block;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.block__element</span> {
    <span class="hljs-attribute">display</span>: none;
}
<span class="hljs-selector-class">.block__element</span><span class="hljs-selector-class">.is-active</span> {
    <span class="hljs-attribute">display</span>: block;
}</code></pre>
<h3 id="articleHeader8">6. 关于原子类(短类)与BEM</h3>
<p>BEM可以不需要用到原子类，但是如果已经引入了类似Bootstrap的框架，也没必要强制避免使用原子类，比如<code>pull-right</code>、<code>ellipsis</code>、<code>clearfix</code>等等类，这些类非常实用，和BEM是可以互补的。</p>
<p>在组件开发中其实不推荐使用原子类，因为这会降低组件的可复用性。可复用性的最理想状态就是组件不仅仅在不同的页面中表现一致，在跨项目的情况下，也能够运行良好。如果组件的样式因为依赖于某几个原子类就要依赖整个Bootstrap库，那么组件d 迁移负担就重很多了。</p>
<p>原子类更适合应用在实际页面中，这是因为页面变动大而且不可复用，假设在header中，我们用到了两个组件logo和user-panel（用户操作面板），两个组件分别置于header的左侧和右侧，我们可以这么写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;header clearfix&quot;>
    <div class=&quot;logo pull-left&quot;><!-- ... --></div>
    <div class=&quot;user-panel pull-left&quot;><!-- ... --></div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"header clearfix"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"logo pull-left"</span>&gt;</span><span class="hljs-comment">&lt;!-- ... --&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"user-panel pull-left"</span>&gt;</span><span class="hljs-comment">&lt;!-- ... --&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>header可以封装成一个模块，但它复用程度不高，不能算是组件，所以即使使用原子类也没有关系。<strong>在项目中，使用原子类之前应该考虑一下，这个场景是否变动大而且不可复用，如果是的话，我们可以放心的使用原子类</strong>。</p>
<p>组件应该是“自洽的”，其本身就应该构成了一个“生态圈”，也就是说，他几乎不需要外部供给，自给自足就能够运转下去。</p>
<h3 id="articleHeader9">7. 关于子选择器</h3>
<p>子代选择器的方式是，通过组件的根节点的名称来选取子代元素。按照这个思路，分页按钮样式可以这么写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;page-btn&quot;>
   <!-- ... -->
   <ul class=&quot;list&quot;></ul>
   <!-- ... -->
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"page-btn"</span>&gt;</span>
   <span class="hljs-comment">&lt;!-- ... --&gt;</span>
   <span class="hljs-tag">&lt;<span class="hljs-name">ul</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"list"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
   <span class="hljs-comment">&lt;!-- ... --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".page-btn { /* ... */ }
.page-btn .list { /* ... */ }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.page-btn</span> { <span class="hljs-comment">/* ... */</span> }
<span class="hljs-selector-class">.page-btn</span> <span class="hljs-selector-class">.list</span> { <span class="hljs-comment">/* ... */</span> }</code></pre>
<p>HTML看起来美观多了，但这解决了样式冲突问题么？试想下，如果让你来接手这个项目，要增加一个需求，新增一个组件，你命名放心么？</p>
<p>你面临的问题是：你打开组件目录，里面有个分页组件，叫做page-btn，可是你完全不知道要怎么给新组件命名，因为即使新组件模块名与page-btn不一样，也不能保证新组件与分页组件不冲突。</p>
<p>比如新的需求是“新增一个列表组件”，如果该组件的名字叫做list，其根节点的名字叫list，那么这个组件下面写的样式，就很可能和.page-btn .list的样式冲突:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".list { /* ... */ }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;"><span class="hljs-selector-class">.list</span> { <span class="hljs-comment">/* ... */</span> }</code></pre>
<p>这还仅仅只有两个组件而已，实际项目中，十几个或几十个组件，难道我们要每个组件都检查一下来“新组件名是否和以往组件的子元素命名冲突了”么？这不现实。</p>
<p><strong>BEM禁止使用子代选择器，以上是原因之一。子代选择器不好的地方还在于，如果层次关系过长，逻辑不清晰，非常不利于维护</strong>。为了懒得命名或者追求所谓的“精简代码”，写出下面这种选择器：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".page-btn button:first-child {}
.page-btn ul li a {}
/* ... */
/* 维护代码，新增需求 */
.page-btn .prev {}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.page-btn</span> <span class="hljs-selector-tag">button</span><span class="hljs-selector-pseudo">:first-child</span> {}
<span class="hljs-selector-class">.page-btn</span> <span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span> <span class="hljs-selector-tag">a</span> {}
<span class="hljs-comment">/* ... */</span>
<span class="hljs-comment">/* 维护代码，新增需求 */</span>
<span class="hljs-selector-class">.page-btn</span> <span class="hljs-selector-class">.prev</span> {}</code></pre>
<p><strong>用DOM结构层次关系结构来定位元素，可能会因为需求改变而大面积的重写样式文件</strong>。试想一下维护这类代码有多么痛苦，我们要一边检查该元素的上下文DOM结构，一边对照着css文件，一一对比，找到该元素对应的样式，也就是说我为了改一个元素的代码，需要不断翻阅HTML文件和CSS文件，可维护性非常之差。更有甚者，来维护这块代码的同事，直接在样式文件最后添加覆盖样式，这会造成一个非常严重的问题了：<strong>同一个元素样式零散的分布在文件的不同地方，而且定位该元素的选择器也可能各不相同</strong>。</p>
<p>这样的样式文件只会越写越糟糕，可以说，当我们用子代选择器来定位元素时，这个样式文件就已经注定是要被翻来覆去的重构的了，甚至，每个来维护这个文件的人都会将其重构一遍。</p>
<p><strong>子代选择器还会造成权重过大的问题</strong>，当我们要做响应式的时候，某个带样式的元素需要适配不同的屏幕，此时，我们还要不断的确认该元素之前的选择器写法！<strong>为了覆盖前面权重过大的样式，甚至通过添加额外的类名或标签名来增加权重。可想而知，此后这个样式文件的维护难度就像雪球一样，越滚越大</strong>。</p>
<p>如果我们用的是BEM，要覆盖样式很简单：找到要覆盖样式的元素，得知它的类名，在媒体查询中，用它的类名作为选择器，写下覆盖样式，样式就覆盖成功了，不需要担心前面样式的权重过大。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS规范--BEM入门

## 原文链接
[https://segmentfault.com/a/1190000009953887](https://segmentfault.com/a/1190000009953887)

