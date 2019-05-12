---
title: '摘自Rego"s Everyday Life博客：CSS的"显示：内容(display: contents)"样式规则即将来临' 
date: 2019-01-25 2:30:23
hidden: true
slug: qzmzjpzjqo9
categories: [reprint]
---

{{< raw >}}

            <p>没错，<code>显示：内容(display: contents)</code>要在<a href="https://chromium.googlesource.com/chromium/src/+/27c0ee55811678e4896cf0a07f8c4728bd7a58f2">Blink引擎</a>和<a href="https://trac.webkit.org/changeset/224822/webkit">WebKit引擎</a>里成为默认样式了，可能会随着Chrome浏览器65版与Safari浏览器11.1版一起发布。<a href="https://developer.mozilla.org/en-US/火狐/Releases/37">火狐浏览器从37版开始就有了这一功能</a>，现在要轮到这两个浏览器了。这样，唯一没有这个功能的就剩下Edge浏览器了，<a href="https://wpdev.uservoice.com/forums/257854-microsoft-edge-developer/suggestions/10938981-implement-the-box-generation-keywords-from-css-dis">大家一起投票提要求吧！</a>。</p>
<p>关于这一点，我想着重说明一下，Chromium浏览器对这一功能的支持是由<a href="https://twitter.com/ecbos_">Emilio Cobos</a>开的头，他2016年秋天到2017年夏天参加<a href="https://www.igalia.com/about-us/coding-experience">Igalia公司代码之旅(Coding Experience)</a>实习项目时，开始着手进行这项工作。</p>
<p><a href="https://blogs.igalia.com/mrego/2016/02/25/igalia-coding-experience-on-web-engines/">2016年初的一篇博客贴子</a>里，我谈到了Igalia公司的代码之旅(Coding Experience)实习项目，还有我对其网站平台开发团队部分未完成工作的想法，有些人可能还记得，有些人可能已经忘了。其中一项任务就是<code>显示：内容(display: contents)</code>样式，现在终于快完成了。</p>
<h3><code>显示：内容(display: contents)</code>样式规则是什么？?</h3>
<p><code>显示(display)</code>这一规则属性有了这个新的值，就能把一个元素从<em>边界框树型结构(box tree)</em>中移去，但内容保留。<a href="https://drafts.csswg.org/css-display/#valdef-display-contents">详细要求</a>里有准确定义：</p>
<blockquote>
<p>元素本身不产生任何边界框，而元素的子元素与伪元素仍然生成边界框，元素文字照常显示。为了同时照顾边界框与布局，处理这个元素时，要想象这个元素不在元素树型结构里，而只有内容留下。这包括元素在元文档中的子元素与伪元素，比如<code>::before</code>和<code>::after</code>这两个伪元素，如平常一样，前者仍然在元素子元素之前生成，后者在之后生成。</p>
</blockquote>
<p>给一个简单的例子帮助正确理解：</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"display: contents;
background: magenta; border: solid thick black; ng: 20px;
color: cyan; font: 30px/1 Monospace;"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">span</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"background: black;"</span>&gt;</span>foobar<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
</code></pre><p><code>显示：内容(display: contents)</code>样式规则使<code>div</code>元素不产生任何边界框，因此元素的背景、边框和填充部分都不会渲染。然而，继承的属性如<code>颜色(color)</code>和<code>字体(font)</code>却能照常影响到<code>span</code>这个子元素。</p>
<p>就这个例子而言，最终结果应该看上去是这个样子的：</p>
<p><code>&lt;span style="background: black; color: cyan; font: 30px/1 Monospace;"&gt;foobar&lt;/span&gt;</code></p>
<div>

<div>

#### Unsupported

<div>foobar</div>

<p></p></div><p></p>
<div>

#### Actual

</div>

<div>

#### Supported

foobar</div>

<p></p></div><p></p>
<pre><code class="hljs http">

<span class="markdown">上一个例子在浏览器不支持时的效果，对比实际效果与支持时的效果。

想了解更多细节，[<span class="hljs-string">Rachel Andrew写了一篇关于这个话题的博客贴子，很不错</span>](<span class="hljs-link">https://rachelandrew.co.uk/archives/2016/01/29/vanishing-boxes-with-display-contents/</span>)。

<span class="hljs-section">### CSS网格布局(Grid Layout)与`显示：内容(display: contents)`样式规则</span>

从我自己写的贴子里大家可能已经能猜到，这个规则多少与CSS网格布局(Grid Layout)有关。这个<span class="hljs-code">`显示：内容(display: contents)`</span>样式能取代[<span class="hljs-string">_次网格(subgrids)_</span>](<span class="hljs-link">https://drafts.csswg.org/css-grid-2/#valdef-display-subgrid</span>)功能，目前还没有任何浏览器支持次网格。不过，[<span class="hljs-string">_次网格(subgrids)_有些情况还是需要用到的</span>](<span class="hljs-link">https://blogs.igalia.com/mrego/2016/02/12/subgrids-thinking-out-loud/#use-cases</span>)。

典型的例子是[<span class="hljs-string">网格布局(Grid Layout)的自动就位(auto-placement)效果</span>](<span class="hljs-link">https://blogs.igalia.com/mrego/2015/02/25/grid-auto-placement-is-ready/</span>)，下面是一个简单的表格元素，看起来是这样的：

<span class="hljs-code">```html
&lt;style&gt;
  form   { display:     grid;   }
  label  { grid-column: 1;      }
  input  { grid-column: 2;      }
  button { grid-column: span 2; }
&lt;/style&gt;
&lt;form&gt;
  &lt;label&gt;Name&lt;/label&gt;&lt;input /&gt;
  &lt;label&gt;Mail&lt;/label&gt;&lt;input /&gt;
  &lt;button&gt;Send&lt;/button&gt;
&lt;/form&gt;
</span></span></code></pre><p><img src="http://s3.qhres.com/static/9d299d988b482fa7.svg" alt="用CSS网格布局(Grid Layout)格式化的简单表格元素">用CSS网格布局(Grid Layout)格式化的简单表格元素</p>
<p>然而这不是一个典型的HTML网页表格，因为通常我们会在表格内部使用列表，这样使用读屏软件的用户就能预先知道有多少空要填。所以HTML网页看起来更可能会是这样的：</p>
<pre><code class="hljs xml"><span class="hljs-tag">&lt;<span class="hljs-name">form</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>Name<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> /&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">label</span>&gt;</span>Mail<span class="hljs-tag">&lt;/<span class="hljs-name">label</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">input</span> /&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">button</span>&gt;</span>Send<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
</code></pre>
<p>有了<code>显示：内容(display: contents)</code>样式，就可以做出和第一个例子相同的布局，用的CSS也差不多：</p>
<pre><code class="hljs css"><span class="hljs-selector-tag">ul</span>     { <span class="hljs-attribute">display</span>: grid;       }
<span class="hljs-selector-tag">li</span>     { <span class="hljs-attribute">display</span>: contents;   }
<span class="hljs-selector-tag">label</span>  { <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">1</span>;      }
<span class="hljs-selector-tag">input</span>  { <span class="hljs-attribute">grid-column</span>: <span class="hljs-number">2</span>;      }
<span class="hljs-selector-tag">button</span> { <span class="hljs-attribute">grid-column</span>: span <span class="hljs-number">2</span>; }
</code></pre><p>现在这样，网站转用CSS网格布局(Grid Layout)时，HTML代码不用大改，也不需要舍去一些确实有用的HTML元素，如上面例子里的列表元素，真的很不错。</p>
<h3>在Chromium浏览器上实这个功能</h3>
<p>之前介绍部分说过，<a href="https://bugzilla.mozilla.org/show_bug.cgi?id=1105369">火狐三年前就已经支持<code>显示：内容(display: contents)</code>功能了</a>，但Chromium浏览器对此却没有任何实现。CSS网格布局(Grid Layout)是由Igalia公司实现的，所以公司非常希望这个功能得到支持，因为在好几个网格布局(Grid Layout)用例中，这个功能都可以方便解决问题。</p>
<p>Igalia公司代码之旅(Coding Experience)提出的计划是<a href="https://groups.google.com/a/chromium.org/d/msg/blink-dev/nAUxrvJeNLQ/-e1zF6YkBAAJ">在Blink引擎上实现<code>显示：内容(display: contents)</code>样式规则</a>，并将其作为主要任务。Emilio做得很棒，大部分工作都成功完成了，发现的问题应需报告给了CSS工作组和其它浏览器团队，并为<code>网站平台测试(web-platform-tests)</code>仓库编写了测试，以保证不同实现方法之间的互用性。</p>
<p>还有一些工作要在代码之旅(Coding Experience)结束后做好，然后才能默认开启<code>显示：内容(display: contents)</code>规则。前Opera公司、现Google公司的<a href="https://twitter.com/runeLi">Rune Lillesveen</a>在整个开发过程中都给予了帮助，并将剩下的工作做完，一星期前发布。</p>
<h3>在WebKit引擎上实现这个功能</h3>
<p>WebKit引擎已经对<a href="https://bugs.webkit.org/show_bug.cgi?id=157477"><code>显示：内容(display: contents)</code>规则有了初步支持</a> ，但只是在实现Shadow DOM技术时内部应用，终端用户无法接触，代码其它部分也不支持。</p>
<p>我们把那部分也重新激活了，虽然没时间做完，但之后苹果公司的<a href="https://twitter.com/anttikoivisto">Antti Koivisto</a>完成了。到2017年11月，这个功能已在主干开发版本上设为默认启动。</p>
<h3>总结</h3>
<p><a href="https://www.igalia.com/">Igalia公司</a>作为外部力量，致力于开放式网站平台项目，是这一领域顶尖的公司之一，所以我们有机会能在不同的开源项目中实现新的功能。这要感谢我们成员的集体参与，以及在此领域内通过几年经验积累起来的外部知识。关于<code>显示：内容(display: contents)</code>的实现，如果没有Igalia公司的支持，特别是代码之旅(Coding Experience)的经历，这个功能是不可能在今天的Chromium浏览器和WebKit引擎上实现的。</p>
<p>代码之旅(Coding Experience)取得了好的结果，我们非常高兴，我们也期望在将来能再次大获成功。</p>
<p>当然，所有的功劳都应该归Emilio，他是一个了不起的工程师，在代码之旅(Coding Experience)期间做得非常出色。在这一过程中，他拥有了在Chromium项目和WebKit项目里提交的特权。赞！</p>
<p>最后，感谢Antti和Rune把剩下的任务完成了，才让WebKit和Chromium用户能用到<code>显示：内容(display: contents)</code>样式规则。</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
摘自Rego's Everyday Life博客：CSS的"显示：内容(display: contents)"样式规则即将来临

## 原文链接
[https://www.zcfy.cc/article/quote-display-contents-quote-is-coming-regos-everyday-life](https://www.zcfy.cc/article/quote-display-contents-quote-is-coming-regos-everyday-life)

