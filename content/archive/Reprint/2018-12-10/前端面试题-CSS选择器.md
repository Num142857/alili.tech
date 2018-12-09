---
title: '前端面试题-CSS选择器' 
date: 2018-12-10 2:30:07
hidden: true
slug: lms7acglvd
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一、CSS选择器作用</h2>
<blockquote>CSS 选择器用于定位我们想要给予样式的 HTML 元素，但不只是在 CSS 中，JavaScript 对 CSS 的选择器也是支持的，比如 document.document.querySelectorAll。</blockquote>
<h2 id="articleHeader1">二、选择器类型</h2>
<ol>
<li>基本选择器</li>
<li>组合选择器</li>
<li>属性选择器</li>
<li>伪类选择器</li>
<li>伪元素选择器</li>
</ol>
<h2 id="articleHeader2">三、基本选择器</h2>
<table>
<thead><tr>
<th>选择器</th>
<th>含义</th>
<th>作用</th>
<th>CSS</th>
</tr></thead>
<tbody>
<tr>
<td>.class</td>
<td>类选择器</td>
<td>匹配 class 包含(不是等于)特定类的元素</td>
<td>1</td>
</tr>
<tr>
<td>#id</td>
<td>id选择器</td>
<td>匹配特定 id 的元素</td>
<td>1</td>
</tr>
<tr>
<td>*</td>
<td>通用元素选择器</td>
<td>匹配页面任何元素（这也就决定了我们很少使用）</td>
<td>2</td>
</tr>
<tr>
<td>element</td>
<td>元素选择器</td>
<td>选择HTML元素</td>
<td>1</td>
</tr>
</tbody>
</table>
<h2 id="articleHeader3">四、组合选择器</h2>
<table>
<thead><tr>
<th>选择器</th>
<th>含义</th>
<th>作用</th>
<th>CSS</th>
</tr></thead>
<tbody>
<tr>
<td>E,F</td>
<td>多元素选择器</td>
<td>同时匹配元素E或元素F</td>
<td>1</td>
</tr>
<tr>
<td>E F</td>
<td>后代选择器</td>
<td>匹配E元素所有的后代（不只是子元素、子元素向下递归）元素F</td>
<td>1</td>
</tr>
<tr>
<td>E&gt;F</td>
<td>子元素选择器</td>
<td>匹配E元素的所有直接子元素</td>
<td>2</td>
</tr>
<tr>
<td>E+F</td>
<td>直接相邻选择器</td>
<td>匹配E元素之后的相邻的同级元素F</td>
<td>2</td>
</tr>
<tr>
<td>E~F</td>
<td>普通相邻选择器（弟弟选择器）</td>
<td>匹配E元素之后的同级元素F（无论直接相邻与否）</td>
<td>3</td>
</tr>
</tbody>
</table>
<h2 id="articleHeader4">五、属性选择器</h2>
<table>
<thead><tr>
<th>选择器</th>
<th>示例</th>
<th>示例说明</th>
<th>CSS</th>
</tr></thead>
<tbody>
<tr>
<td>[attribute]</td>
<td>[target]</td>
<td>选择所有带有target属性元素</td>
<td>2</td>
</tr>
<tr>
<td>[attribute=value]</td>
<td>[target=-blank]</td>
<td>选择所有使用target="-blank"的元素</td>
<td>2</td>
</tr>
<tr>
<td>[attribute~=value]</td>
<td>[title~=flower]</td>
<td>选择标题属性包含单词"flower"的所有元素</td>
<td>2</td>
</tr>
<tr>
<td>[attribute ^= language]</td>
<td>[lang ^= en]</td>
<td>选择一个lang属性的<strong>起始值</strong>="EN"的所有元素</td>
<td>2</td>
</tr>
<tr>
<td>[attribute $= language]</td>
<td>[lang $= en]</td>
<td>选择一个lang属性的<strong>结尾值</strong>="EN"的所有元素</td>
<td>2</td>
</tr>
<tr>
<td>[attribute *= language]</td>
<td>[lang *= en]</td>
<td>选择一个lang属性的<strong>包含</strong>"EN"的所有元素</td>
<td>2</td>
</tr>
</tbody>
</table>
<h2 id="articleHeader5">六、伪类选择器</h2>
<table>
<thead><tr>
<th>选择器</th>
<th>示例</th>
<th>示例说明</th>
<th>CSS</th>
</tr></thead>
<tbody>
<tr>
<td>:link</td>
<td>a:link</td>
<td>选择所有未访问链接</td>
<td>1</td>
</tr>
<tr>
<td>:visited</td>
<td>a:visited</td>
<td>选择所有访问过的链接</td>
<td>1</td>
</tr>
<tr>
<td>:hover</td>
<td>a:hover</td>
<td>把鼠标放在链接上的状态</td>
<td>1</td>
</tr>
<tr>
<td>:active</td>
<td>a:active</td>
<td>选择正在活动链接</td>
<td>1</td>
</tr>
<tr>
<td>:focus</td>
<td>input:focus</td>
<td>选择元素输入后具有焦点</td>
<td>2</td>
</tr>
</tbody>
</table>
<p>所有伪类选择器在<a href="https://segmentfault.com/a/1190000013737796">前端面试题-伪类和伪元素</a></p>
<h2 id="articleHeader6">七、伪元素选择器</h2>
<table>
<thead><tr>
<th>选择器</th>
<th>作用</th>
<th>说明</th>
<th>CSS</th>
</tr></thead>
<tbody>
<tr>
<td>::before/:before</td>
<td>在被选元素前插入内容。</td>
<td>需要使用 content 属性来指定要插入的内容。被插入的内容实际上不在文档树中。</td>
<td>2</td>
</tr>
<tr>
<td>::after/:after</td>
<td>在选被元素后插入内容</td>
<td>其用法和特性与:before相似。</td>
<td>2</td>
</tr>
<tr>
<td>::first-letter/:first-letter</td>
<td>匹配元素中文本的首字母。</td>
<td>被修饰的首字母不在文档树中。</td>
<td>1</td>
</tr>
<tr>
<td>::first-line/:first-line</td>
<td>匹配元素中第一行的文本。</td>
<td>这个伪元素只能用在块元素中，不能用在内联元素中。</td>
<td>1</td>
</tr>
</tbody>
</table>
<p>所有伪元素选择器在<a href="https://segmentfault.com/a/1190000013737796" target="_blank">前端面试题-伪类和伪元素</a></p>
<p>扩展阅读</p>
<ol>
<li><a href="https://segmentfault.com/a/1190000013664630">前端面试题-clearfix（清除浮动）</a></li>
<li><a href="https://segmentfault.com/a/1190000013647777" target="_blank">前端面试题-BFC(块格式化上下文)</a></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端面试题-CSS选择器

## 原文链接
[https://segmentfault.com/a/1190000013745407](https://segmentfault.com/a/1190000013745407)

