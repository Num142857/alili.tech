---
title: '正则表达j基础' 
date: 2019-01-03 2:30:10
hidden: true
slug: ffe74j0e8m
categories: [reprint]
---

{{< raw >}}

                    
<p>正则表达式(Regular Expression)主要用在检索 、提取、替换和搜索上</p>
<p><strong>正则表达式的引用方式</strong></p>
<ul><li>
<p>/正则表达式/</p>
<ul><li><p>var RegEsp= new RegExp("");</p></li></ul>
</li></ul>
<h3 id="articleHeader0">修饰符</h3>
<ul>
<li><p>i 忽略大小写</p></li>
<li><p>g 全局搜索</p></li>
</ul>
<p>正则表达式的元符号</p>
<table>
<thead><tr>
<th>符号</th>
<th>含义</th>
</tr></thead>
<tbody>
<tr>
<td>.</td>
<td>代表所有符号</td>
</tr>
<tr>
<td>d</td>
<td>表示数z字</td>
</tr>
<tr>
<td>b</td>
<td>匹配单词边界</td>
</tr>
<tr>
<td>w</td>
<td>查找单词字符</td>
</tr>
<tr>
<td>n</td>
<td>换行</td>
</tr>
<tr>
<td>f</td>
<td>换页</td>
</tr>
<tr>
<td>以上</td>
<td>大写则表示！</td>
</tr>
<tr>
<td>（）</td>
<td>分组</td>
</tr>
<tr>
<td>[]</td>
<td>方括号用于查找某个范围内的字符</td>
</tr>
<tr>
<td>^</td>
<td>开头</td>
</tr>
<tr>
<td>$</td>
<td>结尾</td>
</tr>
<tr>
<td>/</td>
<td>用/转意特殊字符</td>
</tr>
</tbody>
</table>
<h2 id="articleHeader1">正则表达式的引用函数</h2>
<h4>对象为正则表达式</h4>
<blockquote>
<p>RegExp.test("")  //输出结果为布尔值（true/flase）</p>
<p>RegExp.esec("")//检索字符串中指定的值。返回找到的值，并确定其位置</p>
</blockquote>
<h4>对象为自符串</h4>
<blockquote><p>.match(RegExp)//找到一个或多个正则表达式的匹配。  <br>replace//替换字符串  <br>split //把字符串转换数组<br>search//检索字符串(返回位置)</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
正则表达j基础

## 原文链接
[https://segmentfault.com/a/1190000010839514](https://segmentfault.com/a/1190000010839514)

