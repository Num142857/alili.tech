---
title: '前端面试题-HTML语义化标签' 
date: 2018-12-09 2:30:08
hidden: true
slug: 1pjtgwtx48x
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一、HTML5语义化标签</h2>
<table>
<thead><tr>
<th>标签</th>
<th>描述</th>
</tr></thead>
<tbody>
<tr>
<td>&lt;article&gt;</td>
<td>页面独立的内容区域。</td>
</tr>
<tr>
<td>&lt;aside&gt;</td>
<td>页面的侧边栏内容。</td>
</tr>
<tr>
<td>&lt;bdi&gt;</td>
<td>允许您设置一段文本，使其脱离其父元素的文本方向设置。</td>
</tr>
<tr>
<td>&lt;command&gt;</td>
<td>命令按钮，比如单选按钮、复选框或按钮</td>
</tr>
<tr>
<td>&lt;details&gt;</td>
<td>用于描述文档或文档某个部分的细节</td>
</tr>
<tr>
<td>&lt;dialog&gt;</td>
<td>对话框，比如提示框</td>
</tr>
<tr>
<td>&lt;summary&gt;</td>
<td>标签包含 details 元素的标题</td>
</tr>
<tr>
<td>&lt;figure&gt;</td>
<td>规定独立的流内容（图像、图表、照片、代码等等）。</td>
</tr>
<tr>
<td>&lt;figcaption&gt;</td>
<td>&lt;figure&gt; 元素的标题</td>
</tr>
<tr>
<td>&lt;footer&gt;</td>
<td>section 或 document 的页脚。</td>
</tr>
<tr>
<td>&lt;header&gt;</td>
<td>文档的头部区域</td>
</tr>
<tr>
<td>&lt;mark&gt;</td>
<td>带有记号的文本。</td>
</tr>
<tr>
<td>&lt;meter&gt;</td>
<td>度量衡。仅用于已知最大和最小值的度量。</td>
</tr>
<tr>
<td>&lt;nav&gt;</td>
<td>导航链接的部分。</td>
</tr>
<tr>
<td>&lt;progress&gt;</td>
<td>任何类型的任务的进度。</td>
</tr>
<tr>
<td>&lt;ruby&gt;</td>
<td>ruby 注释（中文注音或字符）。</td>
</tr>
<tr>
<td>&lt;rt&gt;</td>
<td>字符（中文注音或字符）的解释或发音。</td>
</tr>
<tr>
<td>&lt;rp&gt;</td>
<td>在 ruby 注释中使用，不支持 ruby 元素的浏览器所显示的内容。</td>
</tr>
<tr>
<td>&lt;section&gt;</td>
<td>文档中的节（section、区段）。</td>
</tr>
<tr>
<td>&lt;time&gt;</td>
<td>日期或时间。</td>
</tr>
<tr>
<td>&lt;wbr&gt;</td>
<td>规定在文本中的何处适合添加换行符。</td>
</tr>
</tbody>
</table>
<h2 id="articleHeader1">二、语义化标签的使用</h2>
<h3 id="articleHeader2">2.1 &lt;title&gt;&lt;/title&gt; 页面主要内容</h3>
<p>（1）&lt;title&gt; 标签的特点是简短、描述性、唯一，用于提升搜索引擎排名。</p>
<p>（2）搜索引擎会把 title 作为判断页面<strong>主要内容</strong>的指标，有效的 title 应该包含几个与页面<strong>内容密切相关</strong>的关键字，建议将 title 的核心内容写在前 <strong>60</strong> 个字符。</p>
<h3 id="articleHeader3">2.2 &lt;header&gt;&lt;/header&gt; 页眉</h3>
<p>（1）HTML5 规范描述为“<strong>一组解释性或导航型性的条目</strong>”，通常有网站标志、主导航、全站链接以及搜索框。</p>
<h3 id="articleHeader4">2.3 &lt;nav&gt;&lt;/nav&gt; 导航</h3>
<p>（1）页面的导航链接区域，用于定义页面的主要<strong>导航</strong>部分。</p>
<p>（2）导航通常使用 <strong>&lt;ul&gt;</strong> 无序列表。若是面包屑链接，则使用 <strong>&lt;ol&gt;</strong> 有序列表。</p>
<p>（3）HTML5 规范不推荐对辅助页脚链接使用 nav，除非页脚再次显示顶级全局导航、或者是招聘信息等重要链接。</p>
<h3 id="articleHeader5">2.4 &lt;main&gt;&lt;/main&gt; 主要内容</h3>
<p>（1）网站页面的<strong>主要内容</strong>，并且一个页面只能使用<strong>一次</strong> &lt;main&gt; 标签。</p>
<p>（2）若是 web 应用，则包含其主要功能。</p>
<h3 id="articleHeader6">2.5 &lt;article&gt;&lt;/article&gt; 文章标记</h3>
<p>（1）表示的是一个文档、页面、应用或是网站中的一个<strong>独立</strong>的容器。</p>
<p>（2）HTML5 规范声明 &lt;article&gt; 标签适用于自包含的窗口小部件:股票行情，计算器，钟表，天气窗口小部件等。</p>
<p>（3）&lt;article&gt;这个标签可以<strong>嵌套</strong>使用，但是他们必须是<strong>部分与整体的关系</strong>。</p>
<h3 id="articleHeader7">2.6 &lt;section&gt;&lt;/section&gt; 区块</h3>
<p>（1）一组<strong>相似主题</strong>的内容，一般会有一个标题。</p>
<p>（2）实现比如文章的章节，标签式对话框中的各种标签页等功能。</p>
<h3 id="articleHeader8">2.7 &lt;aside&gt;&lt;/aside&gt; 侧边栏</h3>
<p>（1）表示一部分内容与页面的主体并没有较大的关系，并且可以<strong>独立存在</strong>。</p>
<p>（2）实现比如升式引用、侧边栏、相关文章的链接、广告、友情链接等功能。</p>
<h3 id="articleHeader9">2.8 &lt;footer&gt;&lt;/footer&gt; 页脚</h3>
<p>（1）和 &lt;header&gt; 标签对应，可以实现比如附录、索引、版权页、许可协议等功能。</p>
<h3 id="articleHeader10">2.9 &lt;cite&gt;&lt;/cite&gt; 引用</h3>
<p>（1）表示它所包含的文本对某个参考文献的<strong>引用</strong>，比如书籍或者杂志的标题。</p>
<p>（2）按照惯例，引用的文本将以<strong>斜体</strong>显示。</p>
<p>（3）用 &lt;cite&gt; 标签把指向其他文档的引用<strong>分离</strong>出来，尤其是分离那些传统媒体中的文档，如书籍、杂志、期刊，等等。</p>
<h3 id="articleHeader11">2.10 &lt;blockquote&gt;&lt;/blockquote&gt; 块引用</h3>
<p>（1）&lt;blockquote&gt; 与 &lt;/blockquote&gt; 之间的所有文本都会从常规文本中分离出来，经常会在左、右两边进行缩进<strong>（增加外边距）</strong>，而且有时会使用斜体。也就是说，块引用拥有它们自己的空间。</p>
<h3 id="articleHeader12">2.11 &lt;q&gt;&lt;/q&gt; 短的引用</h3>
<p>（1）浏览器经常在引用的内容周围添加引号。</p>
<p>（2）根据 HTML 4.01 规范，q 元素应当使用分界引号来呈现，就是说，q 元素包含的文本必须以<strong>引号</strong>来开始和结束。</p>
<h3 id="articleHeader13">2.12 &lt;time&gt;&lt;/time&gt; 日期或时间</h3>
<p>（1）如果<strong>未定义</strong> datetime 属性，则必须在元素的内容中规定日期或时间。</p>
<h3 id="articleHeader14">2.13 &lt;abbr&gt;&lt;/abbr&gt; 简称或缩写</h3>
<p>（1）通过对缩写进行标记，您能够为浏览器、拼写检查和搜索引擎提供有用的信息。</p>
<p>（2）可以在 &lt;abbr&gt; 标签中使用全局的 <strong>title</strong> 属性，这样就能够在鼠标指针移动到 &lt;abbr&gt; 元素上时显示出简称/缩写的<strong>完整版本</strong>。</p>
<h3 id="articleHeader15">2.14 &lt;dfn&gt;&lt;/dfn&gt; 特殊术语或短语的定义</h3>
<p>（1）现在流行的浏览器通常用<strong>斜体</strong>来显示 &lt;dfn&gt; 中的文本。</p>
<p>（2）与其他许多基于内容的样式和物理样式标签一样，&lt;dfn&gt; 标签尽量<strong>少用</strong>为妙。</p>
<h3 id="articleHeader16">2.15 <code>&lt;del&gt;&lt;/del&gt;</code> 删除的文本</h3>
<p>（1）和 &lt;ins&gt; 标签配合使用，来描述文档中的<strong>更新</strong>和<strong>修正</strong>。</p>
<h3 id="articleHeader17">2.16 &lt;ins&gt;&lt;/ins&gt; 插入文本</h3>
<h3 id="articleHeader18">2.17 <code>&lt;code&gt;&lt;/code&gt;</code> 源代码</h3>
<p>（1）用于表示计算机<strong>源代码</strong>或者其他机器可以阅读的文本内容。</p>
<h3 id="articleHeader19">2.18 &lt;pre&gt;&lt;/pre&gt; 预格式化的文本</h3>
<p>（1）被包围在 pre 元素中的文本通常会<strong>保留空格和换行符</strong>。而文本也会呈现为等宽字体。</p>
<p>（2）若使用 &lt;pre&gt; 标签来定义计算机源代码，比如 HTML 源代码，则使用<strong>符号实体</strong>来表示特殊字符，比如 "&lt;" 代表 "&lt;"，"&gt;" 代表 "&gt;"，"&amp;" 代表 "&amp;"。</p>
<p>（3）可以导致<strong>段落断开</strong>的标签（例如标题、&lt;p&gt; 和 &lt;address&gt; 标签）绝不能包含在 &lt;pre&gt; 所定义的块里。尽管有些浏览器会把段落结束标签解释为简单地换行，但是这种行为在所有浏览器上并不都是一样的。</p>
<p>（4）pre 元素中允许的文本可以包括物理样式和基于内容的样式变化，还有链接、图像和水平分隔线。</p>
<p><a href="https://segmentfault.com/u/webing123">阅读更多</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端面试题-HTML语义化标签

## 原文链接
[https://segmentfault.com/a/1190000013901244](https://segmentfault.com/a/1190000013901244)

