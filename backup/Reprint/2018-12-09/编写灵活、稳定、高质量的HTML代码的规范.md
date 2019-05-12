---
title: '编写灵活、稳定、高质量的HTML代码的规范' 
date: 2018-12-09 2:30:08
hidden: true
slug: jd7wtuih68j
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一、唯一定律</h2>
<blockquote>无论有多少人共同参与同一项目，一定要确保每一行代码都像是唯一个人编写的。</blockquote>
<h2 id="articleHeader1">二、HTML</h2>
<h3 id="articleHeader2">2.1 语法</h3>
<p>（1）用<strong>两个空格</strong>来代替制表符（tab） -- 这是唯一能保证在所有环境下获得一致展现的方法。</p>
<p>（2）嵌套元素应当缩进一次（即<strong>两个空格</strong>）。</p>
<p>（3）对于属性的定义，确保全部使用<strong>双引号</strong>，绝不要使用单引号。</p>
<p>（4）不要在<strong>自闭合</strong>（self-closing）元素的尾部添加斜线 -- HTML5 规范中明确说明这是可选的。</p>
<p>（5）<strong>不要省略</strong>可选的结束标签（closing tag）（例如，&lt;/li&gt; 或 &lt;/body&gt;）。</p>
<h3 id="articleHeader3">2.2 Example</h3>
<p><span class="img-wrap"><img data-src="/img/bV6NAX?w=588&amp;h=253" src="https://static.alili.tech/img/bV6NAX?w=588&amp;h=253" alt="HTML语法" title="HTML语法" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader4">三、HTML5 doctype</h2>
<p>为每个 HTML 页面的第一行添加<strong>标准模式</strong>（standard mode）的声明，这样能够确保在每个浏览器中拥有一致的展现。</p>
<p><span class="img-wrap"><img data-src="/img/bV6NBH?w=169&amp;h=128" src="https://static.alili.tech/img/bV6NBH?w=169&amp;h=128" alt="HTML5 doctype" title="HTML5 doctype" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader5">四、语言属性</h2>
<p>根据 HTML5 规范：</p>
<p>强烈建议为 html 根元素指定 <strong>lang</strong> 属性，从而为文档设置正确的语言。这将有助于语音合成工具确定其所应该采用的发音，有助于翻译工具确定其翻译时所应遵守的规则等等。</p>
<p><span class="img-wrap"><img data-src="/img/bV6NDW?w=214&amp;h=77" src="https://static.alili.tech/img/bV6NDW?w=214&amp;h=77" alt="语言属性" title="语言属性" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader6">五、IE 兼容模式</h2>
<p>IE 支持通过特定的 <strong>&lt;meta&gt;</strong> 标签来确定绘制当前页面所应该采用的 IE 版本。除非有强烈的特殊需求，否则最好是设置为 <strong>edge mode</strong>，从而通知 IE 采用其所支持的最新的模式。</p>
<p><span class="img-wrap"><img data-src="/img/bV6ND9?w=589&amp;h=28" src="https://static.alili.tech/img/bV6ND9?w=589&amp;h=28" alt="IE 兼容模式" title="IE 兼容模式" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader7">六、字符编码</h2>
<p>通过明确声明字符编码，能够确保浏览器快速并容易的判断页面内容的<strong>渲染方式</strong>。这样做的好处是，可以避免在 HTML 中使用字符实体标记（character entity），从而全部与文档编码一致（一般采用 <strong>UTF-8</strong> 编码）。</p>
<p><span class="img-wrap"><img data-src="/img/bV6NEQ?w=271&amp;h=75" src="https://static.alili.tech/img/bV6NEQ?w=271&amp;h=75" alt="字符编码" title="字符编码" style="cursor: pointer;"></span></p>
<h2 id="articleHeader8">七、引入 CSS 和 JavaScript 文件</h2>
<p>根据 HTML5 规范，在引入 CSS 和 JavaScript 文件时一般<strong>不需要指定 type 属性</strong>，因为 text/css 和 text/javascript 分别是它们的<strong>默认值</strong>。</p>
<p><span class="img-wrap"><img data-src="/img/bV6NGn?w=501&amp;h=255" src="https://static.alili.tech/img/bV6NGn?w=501&amp;h=255" alt="引入文件" title="引入文件" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader9">八、实用为王</h2>
<p><strong>尽量遵循 HTML 标准和语义</strong>，但是不要以牺牲实用性为代价。任何时候都要尽量使用最少的标签并保持最小的复杂度。</p>
<h2 id="articleHeader10">九、属性顺序</h2>
<h3 id="articleHeader11">9.1 从大到小</h3>
<p>HTML 属性应当按照以下给出的顺序依次排列，确保代码的<strong>易读性</strong>。</p>
<p>（1）class</p>
<p>（2）id, name</p>
<p>（3）data-*</p>
<p>（4）src, for, type, href, value</p>
<p>（5）title, alt</p>
<p>（6）role, aria-*</p>
<h3 id="articleHeader12">9.2 Example</h3>
<p><span class="img-wrap"><img data-src="/img/bV6NHB?w=589&amp;h=178" src="https://static.alili.tech/img/bV6NHB?w=589&amp;h=178" alt="Example" title="Example" style="cursor: pointer;"></span></p>
<h3 id="articleHeader13">9.3 说明</h3>
<p><strong>class 用于标识高度可复用组件</strong>，因此应该排在首位。id 用于标识<strong>具体组件</strong>，应当谨慎使用（例如，页面内的书签），因此排在第二位。</p>
<h2 id="articleHeader14">十、布尔（boolean）型属性</h2>
<h3 id="articleHeader15">10.1 注意</h3>
<p>（1）布尔型属性可以在<strong>声明时不赋值</strong>。XHTML 规范要求为其赋值，但是 <strong>HTML5 规范不需要</strong>。</p>
<p>（2）元素的布尔型属性如果<strong>有值</strong>，就是 <strong>true</strong>，如果<strong>没有值</strong>，就是 <strong>false</strong>。</p>
<p>（3）如果属性存在，其值必须是空字符串或 [...] 属性的规范名称，并且不要在首尾添加空白符。<br>简单来说，就是<strong>不用赋值</strong>。</p>
<h3 id="articleHeader16">10.2 Example</h3>
<p><span class="img-wrap"><img data-src="/img/bV6NIG?w=457&amp;h=176" src="https://static.alili.tech/img/bV6NIG?w=457&amp;h=176" alt="Example" title="Example" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader17">十一、减少标签的数量</h2>
<p>编写 HTML 代码时，尽量<strong>避免多余的父元素</strong>。很多时候，这需要迭代和重构来实现。</p>
<p><span class="img-wrap"><img data-src="/img/bV6NJh?w=338&amp;h=179" src="https://static.alili.tech/img/bV6NJh?w=338&amp;h=179" alt="Example" title="Example" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader18">十二、减少 JavaScript 生成的标签</h2>
<p>通过 JavaScript 生成的标签让内容变得<strong>不易查找、编辑</strong>，并且降低性能。能避免时尽量避免。</p>
<p>未完待续 <a href="https://segmentfault.com/a/1190000014003555">编写灵活、稳定、高质量的CSS代码的规范</a><br><a href="https://segmentfault.com/u/webing123" target="_blank">阅读更多</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
编写灵活、稳定、高质量的HTML代码的规范

## 原文链接
[https://segmentfault.com/a/1190000013977578](https://segmentfault.com/a/1190000013977578)

