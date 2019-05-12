---
title: '关于CSS自文档的思考' 
date: 2019-01-25 2:30:23
hidden: true
slug: 3ssnbq6l688
categories: [reprint]
---

{{< raw >}}

            <p>作者：<a href="https://keithjgrant.com/">Keith J. Grant</a></p>
<p>==============================</p>
<p>2017.6.9</p>
<p>Robert C. Martin写的<a href="https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882/">《Clean Code》</a>是我读过的最好的编程书籍之一，若没有读过，推荐你将它加入书单。</p>
<blockquote>
<p>注释就意味着代码无法自说明 —— Robert C. Martin</p>
</blockquote>
<p>Martin在文中详细讨论了代码注释，我不会完全重复他的话。简而言之，他的意思就是，这些注释是注定会过时的。程序执行时会忽视注释，所以无法保证这些说明注释会准确的描述代码作用。所以最好的方式是让代码自说明，如此，按照代码逻辑，程序员和程序获取到的信息是一致的。</p>
<p>思考如下代码：</p>
<pre><code class="hljs stylus"><span class="hljs-comment">// Check to see if the employee is eligible for full benefits</span>
<span class="hljs-comment">// 检查员工是否有资格获取全部福利</span>
<span class="hljs-keyword">if</span> ((employee<span class="hljs-selector-class">.flags</span> &amp; HOURLY_FLAG) &amp;&amp; (employee<span class="hljs-selector-class">.age</span> &gt; <span class="hljs-number">65</span>)) {
  …
}
</code></pre><p>注释有用么？当然有用，但下面的方式可能更好：</p>
<pre><code class="hljs gcode"><span class="hljs-keyword">if</span> <span class="hljs-comment">(employee.isEligibleForFullBenefits()</span>) {
  …
}
</code></pre><p>代码需要“言行一致”，注释是能够被命名良好的函数或变量取代的。Martin的意思并不是说永不使用注释，而是应该尽量避免写注释，注释就意味着代码无法自说明。</p>
<h2>那么对CSS而言呢？</h2>
<p>我非常赞同Martin关于注释的看法。当涉及到声明式的语言如CSS时，就发现了一些有趣的地方。声明式语言式必须符合对应格式的，而CSS选择器基本是由HTML结构决定的。对这种代码结构，我们能做的不多，这是否意味着CSS代码必须注释满天飞？</p>
<p>额，也许吧。有很多的理由使用注释，且注释的写法也有很多。让我们来看一些注释，思考这些注释是否应该添加。先从答案显然的开始吧，然后一步步深入到不那么好判断的。</p>
<p>不好：多此一举的注释</p>
<hr>
<p>任何语言，多此一举的注释都是多余的，如下的示例出自Bootstrap3的早期版本：</p>
<pre><code class="hljs stylus"><span class="hljs-comment">// Addresses</span>
<span class="hljs-selector-tag">address</span> {…}
</code></pre><p>显然，address是关于地址的选择器</p>
<pre><code class="hljs stylus"><span class="hljs-comment">// Unordered and Ordered lists</span>
<span class="hljs-selector-tag">ul</span>,
<span class="hljs-selector-tag">ol</span> {…}
</code></pre><p>还有？</p>
<pre><code class="hljs stylus"><span class="hljs-comment">// Blockquotes</span>
<span class="hljs-selector-tag">blockquote</span> {…}
</code></pre><p>赶紧停！</p>
<p>千万不要写那种注释，赶紧删掉这些多余的东西，它仅仅是在重复代码而已。当然，新版本的Bootstrap已经删除掉大部分多此一举的无用注释了。</p>
<h2>不好： 块分隔注释</h2>
<p>对CSS而言，块分隔注释是非常特殊的，如下：</p>
<pre><code class="hljs ada">/* <span class="hljs-comment">-----------------</span>
 * TOOLTIPS
 * <span class="hljs-comment">----------------- */</span>
</code></pre><p>这种注释能把我逼疯。我能想到为什么会写下这种注释：有时候我们的CSS会写得非常长，当在超过千行的文件内查找时，就需要这种带特殊标志的注释来帮助快速搜索。</p>
<p>但事实上，很长很长的CSS文件已经不再流行了。若你的项目确实需要这种很大的CSS文件，它应该是由多个小的部分，通过CSS预处理工具组合而成的。</p>
<h2>不好：解释语法</h2>
<p>又要用Bootstrap举例了，以下代码出自 <a href="https://github.com/twbs/bootstrap/blob/v4-dev/scss/_tooltip.scss#L11">_tooltips.scss</a>:</p>
<pre><code class="hljs arduino"><span class="hljs-comment">// Allow breaking very long words so they don't overflow the tooltip's bounds</span>
<span class="hljs-comment">// 设置长单词换行</span>
<span class="hljs-keyword">word</span>-wrap: <span class="hljs-built_in">break</span>-<span class="hljs-keyword">word</span>;
</code></pre><p>这种方式和“多此一举的注释”类似，注释解释<code>word-wrap</code>属性的作用。这里有一篇文章讲到这种注释为什么不需要的原因，<a href="https://blog.codinghorror.com/code-tells-you-how-comments-tell-you-why/">注释应该解释“为什么”，而不是“是什么”，即说明原因而不是说明作用（Why, not what）</a>。</p>
<p>此处有一个例外，由于CSS有很多属性，也许有些属性是你完全不知道的，那么你用这种注释是正常的。</p>
<h2>不好：对库进行介绍</h2>
<p>如下是Bootstrap tooltips.scss文件的另一段注释：</p>
<pre><code class="hljs mel"><span class="hljs-comment">// Our parent element can be arbitrary since tooltips are by default inserted as a</span>
<span class="hljs-comment">// sibling of their target element. So reset our font and text properties to avoid</span>
<span class="hljs-comment">// inheriting weird values.</span>
<span class="hljs-comment">// 由于提示框会被默认插入到目标元素后作为一个兄弟元素，</span>
<span class="hljs-comment">// 所以需要重置提示框的字体属性避免从父元素继承样式影响。</span>
@include reset-<span class="hljs-keyword">text</span>();
font-<span class="hljs-keyword">size</span>: $font-<span class="hljs-keyword">size</span>-sm;
</code></pre><p>这条注释很有意思，看起来似乎并不违反“说明原因而不是说明作用？”规则，它表明由于可能会被一些意料之外的继承字体属性影响，所以用导入的方式来重置字体属性。</p>
<p>但进一步来看，显然在文件头导入重置样式的唯一的解释就是担心被继承样式影响。</p>
<p>所以，我认为这种注释也是不需要的，因为导入函数名字已经说明用途了，尽量让函数名切合作用，如<code>reset-inherited-font</code>或类似的名字，不仅清晰说明了用途还是说明了原因。这个是一个函数调用，函数名已经足够解释了。优先用这种方式来说明用途可以替代一些注释。</p>
<p>CSS预处理器让CSS更接近传统编程语言。尽可能使用命名良好且有意义的变量和函数，这样能让代码更清晰。</p>
<h2>不好: 过时的注释</h2>
<pre><code class="hljs stylus"><span class="hljs-selector-class">.dropdown-header</span> {
  …
  <span class="hljs-attribute">white-space</span>: nowrap; <span class="hljs-comment">// as with &gt; li &gt; a</span>
}
</code></pre><p><a href="https://github.com/twbs/bootstrap/blob/620257456ed0685cae6b6ff51d2ab1e37f02a4fa/scss/_dropdown.scss#L122">“as with &gt; li &gt; a”</a>是什么意思？我第一反应就是也许在文件中还有一个<code>&gt; li &gt; a</code>的选择器，而这行代码就是指那个选择器。也许文件中有一段注释会专门解释为何这样写，但我将文件重头到尾都看了一边，发现并没有这个选择器。文件只有一个<code>.dropdown-item</code>选择器下有一个<code>nowrap</code>属性，也许是就是指这个？或者也许这段注释是指某行已经被删除的代码或引入其他文件中的代码？若想要彻底弄清楚这个注释的作用，唯一的方法就是翻遍整个git记录了吧。</p>
<p>这是一个过时的注释，也许它以前是有用的，但却长时间没有用到，所以过时了。这也许就是为什么Robert Martin对注释的看法：若注释对应的代码更新了注释就没用了，甚至更糟糕，注释可能会将你引到错误的方向。若发现这样的注释，一定要删掉。它完全没用，而且会浪费时间去思考到底有啥用？</p>
<h2>有时有用的：有特殊意义的注释</h2>
<p>如下是一段带注释的代码：</p>
<pre><code class="hljs scss"><span class="hljs-selector-class">.dropdown-item</span> {
  <span class="hljs-attribute">display</span>: block;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>; <span class="hljs-comment">// For `&lt;button&gt;`s</span>
  <span class="hljs-attribute">padding</span>: <span class="hljs-variable">$dropdown-item-padding-y</span> <span class="hljs-variable">$dropdown-item-padding-x</span>;
  <span class="hljs-attribute">clear</span>: both;
  <span class="hljs-attribute">font-weight</span>: <span class="hljs-variable">$font-weight-normal</span>;
  <span class="hljs-attribute">color</span>: <span class="hljs-variable">$dropdown-link-color</span>;
  <span class="hljs-attribute">text-align</span>: inherit; <span class="hljs-comment">// For `&lt;button&gt;`s</span>
  <span class="hljs-attribute">white-space</span>: nowrap;
  <span class="hljs-attribute">background</span>: none; <span class="hljs-comment">// For `&lt;button&gt;`s</span>
  <span class="hljs-attribute">border</span>: <span class="hljs-number">0</span>; <span class="hljs-comment">// For `&lt;button&gt;`s</span>
}
</code></pre><p>这样的注释就是有用的，它们能告诉我们，这些特定的属性是为覆盖<code>&lt;button&gt;</code>样式而写的。这样的注释就是有用的，因为有时候代码的意图不是那么显而易见的。</p>
<p>但此时也需要问一个问题：有什么办法能让代码自说明呢？需要可以考虑将这些特定的属性移到第二个选择器中，专门为这些按钮设置的选择器。</p>
<pre><code class="hljs css"><span class="hljs-selector-class">.dropdown-item</span> {
  <span class="hljs-attribute">display</span>: block;
  <span class="hljs-attribute">padding</span>: $dropdown-item-padding-y $dropdown-item-padding-x;
  <span class="hljs-attribute">clear</span>: both;
  <span class="hljs-attribute">font-weight</span>: $font-weight-normal;
  <span class="hljs-attribute">color</span>: $dropdown-link-color;
  <span class="hljs-attribute">white-space</span>: nowrap;
}

<span class="hljs-selector-tag">button</span><span class="hljs-selector-class">.dropdown-item</span> {
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">text-align</span>: inherit;
  <span class="hljs-attribute">background</span>: none;
  <span class="hljs-attribute">border</span>: <span class="hljs-number">0</span>;
}
</code></pre><p>这样就非常清晰且易于理解，但副作用就是：专门增加了一个特殊的选择器。</p>
<p>而相反，我认为这种方式非常利于使用mixin混入模式。重构为一个函数，该函数能在其他地方定义，并且让代码更清晰。考虑如下代码：</p>
<pre><code class="hljs scss"><span class="hljs-selector-class">.dropdown-item</span> {
  @<span class="hljs-keyword">include</span> remove-button-styles;

  <span class="hljs-attribute">display</span>: block;
  <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
  <span class="hljs-attribute">padding</span>: <span class="hljs-variable">$dropdown-item-padding-y</span> <span class="hljs-variable">$dropdown-item-padding-x</span>;
  <span class="hljs-attribute">clear</span>: both;
  <span class="hljs-attribute">font-weight</span>: <span class="hljs-variable">$font-weight-normal</span>;
  <span class="hljs-attribute">color</span>: <span class="hljs-variable">$dropdown-link-color</span>;
  <span class="hljs-attribute">white-space</span>: nowrap;
}
</code></pre><p>这段代码没有用任何注释，但其功用很清晰，因为它使用的公用函数在其他模块也能用到。我将<code>width:100%</code>保留下来而不是移到函数中，因为若将函数混和代码时，<code>width:100%</code>可能会引起一些其他问题。</p>
<p>在我开始发现<a href="https://en.wikipedia.org/wiki/Code_smell">“代码异味（Code Smell）”</a>之前，一开始<code>.dropdown-item</code>代码有十行，我非常喜欢用mixin，mixin是一个能极大减少代码行数的好东西，它能让我们快速的知道代码的大致用途。</p>
<p>虽然使用函数重构代码并不是都这样有效，但尽量多用。</p>
<h2>好：注解难懂的补丁性的代码</h2>
<p>我对注释也不是总那么苛刻的，比如我就很难找到下面的注释的问题，若你曾看过<a href="https://github.com/necolas/normalize.css/blob/master/normalize.css">normalize.css</a>的源码，你一定会注意到它满满的注释，不得不说，真是“极好的”注释。</p>
<p>欣赏一番：</p>
<pre><code class="hljs css"><span class="hljs-comment">/**
 * 1. Add the correct box sizing in Firefox.
 * FF下正常的盒子模型
 * 2. Show the overflow in Edge and IE.
 * 在Edge和IE下overflow为visble
 */</span>
<span class="hljs-selector-tag">hr</span> {
  <span class="hljs-attribute">box-sizing</span>: content-box; <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>; <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-attribute">overflow</span>: visible; <span class="hljs-comment">/* 2 */</span>
}
</code></pre><p>若没有这些注释，你永远不知道为何这样写。修复特定浏览器bug的代码往往是晦涩难懂的，常常会被当做无用代码删掉。</p>
<p>由于Normalize库的目标是提供一个完全一致样式环境，所以需要很多这样的注释。选择器都是类型和属性选择器，没有任何class名，同时由于不是可命名的class名，所以自文档非常困难。</p>
<p>如下为另一段Bootstrap的注释：</p>
<pre><code class="hljs css"><span class="hljs-comment">/* Chrome (OSX) fix for https://github.com/twbs/bootstrap/issues/11245 */</span>
<span class="hljs-selector-tag">select</span> {
  <span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span> <span class="hljs-meta">!important</span>;
}
</code></pre><p>一个Github链接，非常有用。即使不打开连接也能知道这儿是一个bug，而且有可能是一个非常难定位的bug。若有需要，可以通过链接获取更多信息。最棒的是，因为没有大段大段的文本去解释bug，所以它并不会打乱代码逻辑，同时也告诉我们哪里可以获取更多信息。若使用项目与事务跟踪工具如JIRA，那么可以直接在注释中与编号关联起来。</p>
<p>当然，不是每个打补丁的代码都要这样注释，但若bug不是那么容易发现，而且与浏览器怪癖有关，那么还是这样注释吧。</p>
<h2>好：指令式注释</h2>
<p>一些工具如<a href="https://github.com/kss-node/kss-node">KSS</a> , 会在CSS文件中创建一些样式规范。如下：</p>
<pre><code class="hljs applescript">/*
Alerts
An alert box requires a contextual <span class="hljs-built_in">class</span> <span class="hljs-keyword">to</span> specify <span class="hljs-keyword">its</span> importance.
一个警告信息框需要与语境有关的的类来指定其重要性

Markup:
&lt;<span class="hljs-keyword">div</span>&gt;
  Take note <span class="hljs-keyword">of</span> this important alert message.
&lt;/<span class="hljs-keyword">div</span>&gt;

alert-success   - Something good <span class="hljs-keyword">or</span> successful 好的或成功的
alert-info      - Something worth noting, <span class="hljs-keyword">but</span> <span class="hljs-keyword">not</span> super important 不那么重要的
alert-warning   - Something <span class="hljs-keyword">to</span> note, may require attention 需要被提示并记录，需要引起注意的
alert-danger    - Something important. Usually signifies an <span class="hljs-keyword">error</span>. 非常重要的，常用于错误

Styleguide Alerts
*/
</code></pre><p>这不仅仅是注释，这是规范，它能被KSS解析并用于生成HTML。这已经算是项目文档的一部分了，而且不得不说，这比手动创建一个分离的HTML文件要好很多，因为其在同一个文件内且始终与代码相匹配。</p>
<p>另外一种指令式注释为许可信息，当使用第三方库并在注释中注明许可信息时，一般都需要包含。</p>
<p>而我贴出Robert Martin关于注释的话时 <a href="https://twitter.com/keithjgrant/status/867803638026035200">Robert Martin 的话</a> ，似乎应该解释一下，但没有那么做。因为我认为这是一句容易理解的话，若你还在代码中到处写注释，那么请先思考是否合理。</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于CSS自文档的思考

## 原文链接
[https://www.zcfy.cc/article/thoughts-on-self-documenting-css](https://www.zcfy.cc/article/thoughts-on-self-documenting-css)

