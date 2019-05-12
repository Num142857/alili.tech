---
title: 'HTML 邮件兼容问题与解决方案' 
date: 2019-01-17 2:30:25
hidden: true
slug: ak2t5cukca
categories: [reprint]
---

{{< raw >}}

                    
<p>HTML 邮件内容虽然也是 HTML，但是和我们在网页上使用的 HTML 不同，因为安全原因，各大邮箱服务商及邮件客户端都会对邮件内容进行一定程度上的处理，不会按照你写的原本 HTML 展示。</p>
<p><span class="img-wrap"><img data-src="/img/bVLlGM?w=1300&amp;h=450" src="https://static.alili.tech/img/bVLlGM?w=1300&amp;h=450" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>在桌面和移动端渲染电子邮件大约有上百万种不同的组合方式。</p>
<p>尤其是鼎鼎大名的 OutLook，从 OutLook2007 开始便使用 Word HTML 引擎进行渲染，为了它的安全性从而使得整个邮件倒退回了 2000 年前，为了邮件的兼容性你不得不使用很多废弃的标签、属性，并且这一状况将会维持无数个<br>年头，因为虽然万事终有尽头，但 OutLook 始终存在。</p>
<blockquote><p>“我们将继续使用 Word 创建电子邮件信息，因为我们认为它是制作电子邮件最好的。”——Outlook 团队如是说。</p></blockquote>
<p>因为微软一向地特立独行，使得 OutLook 成为了最难啃的骨头。因为 OutLook 支持的标签和属性少得可怜，所以只要兼容了 OutLook，其他邮箱客户端基本都不会有什么问题。如果你开始开发 HTML 邮件并打算为其在各个邮箱里的兼容性努力，下面的建议将非常有用。</p>
<h2 id="articleHeader0">基本规则</h2>
<h3 id="articleHeader1">布局使用 <code>table</code>
</h3>
<p>这几乎是 HTML 邮件与普通 HTML 页面最大的区别，因为各个邮箱对 <code>div + css</code> 这一套布局的解析问题很大（如 <code>float / position</code> 等 CSS 都会被过滤，甚至 <code>margin: 0 auto;</code> 都不起作用），基本各大邮箱都会解析混乱，所以老式的 <code>table</code> 布局是上乘之选。这就意味着 HTML 邮件中几乎只有这几个元素——<code>table / tr / td / span / img / a</code>，尽量避免使用 <code>div / p</code> 或是其他标签。</p>
<p>而且并不是所有邮箱都支持 <code>colspan / rowspan</code> 属性，所以所有布局都需要使用 <code>table</code> 嵌套解决。</p>
<p>使用表格布局导致的最直接的问题就是会产生多余的空白像素，所以要养成习惯给每个 <code>table</code> 都加上边框 <code>border</code>，单元格内边距 <code>cellpadding</code>，单元格间距 <code>cellspacing</code>，边框合并属性 <code>border-collapse</code> 这些属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<table border=&quot;0&quot; cellpadding=&quot;0&quot; cellspacing=&quot;0&quot; style=&quot;border-collapse: collapse;&quot;>
    <!-- ... -->
</table>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">table</span> <span class="hljs-attr">border</span>=<span class="hljs-string">"0"</span> <span class="hljs-attr">cellpadding</span>=<span class="hljs-string">"0"</span> <span class="hljs-attr">cellspacing</span>=<span class="hljs-string">"0"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"border-collapse: collapse;"</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- ... --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">table</span>&gt;</span></code></pre>
<h2 id="articleHeader2">
<code>body</code> 外的内容几乎没用</h2>
<p>我们知道完整的 HTML 包括 <code>DOCTYPE</code> 声明、<code>html</code> 和 <code>head</code> 标签及其内容、<code>body</code> 标签，对于在一个 <code>iframe</code> 中显示邮件内容的邮箱还好，会保留上述结构，但是有些邮件（如 Gmail）都是在 <code>div</code> 中直接包含，这就对安全要求极为苛刻。安全原因邮箱会默认把上述结构做删除处理，所以写了几乎没有作用，在可能的情况下尽量把内容写到 <code>body</code> 内，甚至建议从 <code>table</code> 开写，直接放弃 <code>DOCTYPE / html / head / body</code> 标签。</p>
<h2 id="articleHeader3">使用内联样式</h2>
<p>与普通 HTML 页面开发一样，HTML 邮件依旧离不开 CSS，HTML 邮件并不支持外部的 style 文件，上面讲到 <code>head</code> 标签极有可能被删除，所以不要试图在 <code>head</code> 标签内写 <code>style</code> 标签。</p>
<p>那么在 <code>body</code> 内写 <code>style</code> 标签是不是就保险了呢？并不是！典型的就是 Gmail 邮箱，会把 HTML 邮件内所有 <code>style</code> 标签删除，这就意味着只有內联 <code>style</code> 属性内的 CSS 是唯一可靠的样式信息。</p>
<h2 id="articleHeader4">能用属性就不要用样式</h2>
<p>并不是使用 <code>style</code> 属性就保险了，很多邮箱会对特定标签的属性做强制改造。</p>
<p>比如在 OutLook 中，图片使用以下方式来设置宽高是无效的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img style=&quot;width: 10px; height: 10px;&quot; src=&quot;*.png&quot; />" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 10px; height: 10px;"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"*.png"</span> /&gt;</span></code></pre>
<p>正确的设置方法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img width=&quot;10&quot; height=&quot;10&quot; src=&quot;*.png&quot; /> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"10"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"10"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"*.png"</span> /&gt;</span> </code></pre>
<p>所以在有属性能够实现样式效果的时候尽量使用属性，常见的可用属性有：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="width
height
bgcolor
align
valign
……" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-built_in">width</span>
<span class="hljs-built_in">height</span>
bgcolor
align
valign
……</code></pre>
<h2 id="articleHeader5">所有样式单独指定</h2>
<p>在写页面的时候利用 CSS 的继承会为我们带来很多便利，但是到了 HTML 邮件，一切都要 say NO!</p>
<p>其实继承规则依旧有效，但是大部分邮件都无法完整继承样式，并且邮箱的默认样式也会对邮件产生一些头疼的干扰。比如 <code>font-family</code>，OutLook 中若想改变字体，至少每个 <code>table</code> 中都要指定 <code>font-family</code>，而在 QQ 邮箱甚至必须每个 <code>td</code> 都设置 <code>font-family</code> 才能全部生效。</p>
<p>因此每个标签单独指定样式是必须的，尽可能不要依赖继承，即使它十分地繁琐。</p>
<h2 id="articleHeader6">脚本？想都不要想！</h2>
<p>如题 (￣▽￣)"</p>
<h1 id="articleHeader7">图片相关</h1>
<h2 id="articleHeader8">背景图片</h2>
<p><code>style</code> 内容里面 <code>background</code> 可以设置 <code>color</code>，但是 <code>image</code> 会被过滤，就是说不能通过 CSS 来设置背景图片了。但是有一个很有意思的元素属性，也叫 <code>background</code>，里面可以定义一个图片路径，但是功能有限，比如无法定位背景图片等。</p>
<p>例如要给一个单元格加一个背景，必须这样写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<td background=&quot;*.png&quot;>
    <!-- ... -->
</td>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">background</span>=<span class="hljs-string">"*.png"</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- ... --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span></code></pre>
<p>当然，不使用背景图片是最好的选择 ╮(╯-╰)╭</p>
<h2 id="articleHeader9">指定 <code>width</code> 和 <code>height</code> 属性</h2>
<p>因为在有些邮箱里，图片不是默认加载的，往往加载前需要用户的许可。那么高宽的指定可以使邮件在没有图片撑出样子前也能保持良好的大小结构，加上 <code>alt</code> 属性更可以明确告知图片的内容让用户选择是否下载它们。</p>
<p>如果因为项目需要（比如需要适配 Retina 高分屏），<code>width</code> 和 <code>height</code> 属性更是必不可少的，并且由于一些 outlook 版本的奇葩表现，<code>width</code> 和 <code>height</code> 属性一定不要加上单位！一定不要加上单位！一定不要加上单位！重要的事情说三遍。</p>
<p>否则你希望的是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img width=&quot;10&quot; height=&quot;10&quot; src=&quot;*.png&quot; /> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"10"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"10"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"*.png"</span> /&gt;</span> </code></pre>
<p><span class="img-wrap"><img data-src="/img/bVLlO6?w=479&amp;h=163" src="https://static.alili.tech/img/bVLlO6?w=479&amp;h=163" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>而实际上它确是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img width=&quot;10px&quot; height=&quot;10px&quot; src=&quot;*.png&quot; /> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"10px"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"10px"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"*.png"</span> /&gt;</span> </code></pre>
<p><span class="img-wrap"><img data-src="/img/bVLlPO?w=463&amp;h=165" src="https://static.alili.tech/img/bVLlPO?w=463&amp;h=165" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>因为加上单位会使一些版本的 OutLook 无法正确识别，导致图片显示使用实际的宽高而非我们设置的。</p>
<p>当然，常规项目中应尽可能保持设置的 <code>width</code> 和 <code>height</code> 的值与实际的宽高一致。</p>
<h2 id="articleHeader10">
<code>margin</code> 与 <code>padding</code>
</h2>
<p>Outlook 2007-2013 不支持图片的 <code>margin</code> 与 <code>padding</code> 样式，必要的时候可以尝试 <code>hspace</code> 和 <code>vspace</code> 属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img vspace=&quot;10&quot; hspace=&quot;10&quot; src=&quot;*.png&quot; /> " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">vspace</span>=<span class="hljs-string">"10"</span> <span class="hljs-attr">hspace</span>=<span class="hljs-string">"10"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"*.png"</span> /&gt;</span> </code></pre>
<p>或者为图片本身添加额外的空间（这个实在太LOW了，不推荐）</p>
<h1 id="articleHeader11">文字相关</h1>
<h2 id="articleHeader12">字体</h2>
<p>在 HTML 邮件中，<code>font-family</code> 只支持系统字体，不支持自定义字体，也不支持 <code>font</code> 简写，<code>color</code> 尽可能也不要使用简写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="font: 12px / 14px Arial, sans-serif; 
color: #999;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">font</span>: 12<span class="hljs-selector-tag">px</span> / 14<span class="hljs-selector-tag">px</span> <span class="hljs-selector-tag">Arial</span>, <span class="hljs-selector-tag">sans-serif</span>; 
<span class="hljs-selector-tag">color</span>: <span class="hljs-selector-id">#999</span>;</code></pre>
<p>需要写成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="line-height: 14px; 
font-size: 12px; 
font-family: &quot;微软雅黑&quot;, Arial, sans-serif; 
color: #999999;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">line-height</span>: 14<span class="hljs-selector-tag">px</span>; 
<span class="hljs-selector-tag">font-size</span>: 12<span class="hljs-selector-tag">px</span>; 
<span class="hljs-selector-tag">font-family</span>: "微软雅黑", <span class="hljs-selector-tag">Arial</span>, <span class="hljs-selector-tag">sans-serif</span>; 
<span class="hljs-selector-tag">color</span>: <span class="hljs-selector-id">#999999</span>;</code></pre>
<p>对于加粗字体，我们可以使用 <code>b</code> 标签而不是 CSS 的 <code>font-weight</code>，前文说过，HTML 标签和属性能解决的样式决不使用 CSS 样式。</p>
<h2 id="articleHeader13">行高</h2>
<p>在 OutLook 中会有个默认的行高最小值，特别是当设置 <code>font-family</code> 为微软雅黑时，默认的行高差不多为 Word 中的两倍行距，如果 <code>line-height</code> 设置的值小于默认的行高，无论你设置的是多少，则始终使用默认值，在很多情况下这是不能忍的，好在有个神奇的 <code>mso-line-height-rule</code>，使用行高时添加 <code>mso-line-height-rule:exactly;</code> 就能使行高始终等于我们所设置的值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<td style=&quot;mso-line-height-rule: exactly; line-height: 36px;&quot;>
    <!-- ... -->
</td>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">td</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"mso-line-height-rule: exactly; line-height: 36px;"</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- ... --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">td</span>&gt;</span></code></pre>
<p>这只是微软的 CSS 属性，对其他客户端没影响。并且该属性只在块元素上有效，所以想在 <code>font</code> 和 <code>span</code> 中用就洗洗睡了吧。</p>
<p>使用前：</p>
<p><span class="img-wrap"><img data-src="/img/bVLl2O?w=86&amp;h=108" src="https://static.alili.tech/img/bVLl2O?w=86&amp;h=108" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>使用后：</p>
<p><span class="img-wrap"><img data-src="/img/bVLl23?w=79&amp;h=79" src="https://static.alili.tech/img/bVLl23?w=79&amp;h=79" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>不过这种实现方式有点瑕疵，就是会导致大号字体无法垂直居中，大家自行取舍吧 (lll￢ω￢)</p>
<h1 id="articleHeader14">参考文献</h1>
<p><a href="https://msdn.microsoft.com/en-us/library/aa338201(v=office.12).aspx" rel="nofollow noreferrer" target="_blank">Word 2007 HTML and CSS Rendering Capabilities in Outlook 2007</a></p>
<p><a href="https://webdesign.tutsplus.com/tutorials/what-you-should-know-about-html-email--webdesign-12908" rel="nofollow noreferrer" target="_blank">What You Should Know About HTML Email</a></p>
<p><a href="http://www.cnblogs.com/dolphinX/p/4082747.html" rel="nofollow noreferrer" target="_blank">EDM制作要点</a></p>
<p><a href="http://www.cnblogs.com/dolphinX/p/4081828.html" rel="nofollow noreferrer" target="_blank">Outlook HTML 渲染引擎</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
HTML 邮件兼容问题与解决方案

## 原文链接
[https://segmentfault.com/a/1190000008864116](https://segmentfault.com/a/1190000008864116)

