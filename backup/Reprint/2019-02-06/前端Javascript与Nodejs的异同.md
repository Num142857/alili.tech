---
title: '前端Javascript与Nodejs的异同' 
date: 2019-02-06 2:30:08
hidden: true
slug: n0pj8bojzt
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><strong>前言</strong></p></blockquote>
<p>很多小伙伴学Node的时候，都没有好好认识她就开始疯狂追求，想一举拿下，直接在网上搜索Node实战，想知道她活好不好，想先用她建个简单博客练练手。</p>
<blockquote><p><strong>JavaScript和Nodejs</strong></p></blockquote>
<p>我相信很多入坑Nodejs的人都是前端转过来的，但是局限于公司项目用不到Nodejs，只能自学，有些重要且基础的东西就忽略了。<br>下面我们说一下前端的Javascript和Nodejs。每个前端大虾都很了解JavaScript，我们用它操作dom，用它写数据交互和页面效果，but....<br>请问你真的知道JavaScript吗？<br>我保证还有很多不知道<code>JavaScript</code>=<code>ECMAScript</code>+<code>DOM</code>+<code>BOM</code>。<br>现在就可以知道了，前端的JavaScript其实是由<code>ECMAScript</code>、<code>DOM</code>、<code>BOM</code>组合而成。</p>
<p><strong>JavaScript</strong>：</p>
<ul>
<li><p><code>ECMAScript</code>(语言基础，如：语法、数据类型结构以及一些内置对象)</p></li>
<li><p><code>DOM</code>（一些操作页面元素的方法）</p></li>
<li><p><code>BOM</code>（一些操作浏览器的方法）</p></li>
</ul>
<p>上面是<code>JavaScript</code>的组成部分，那么<code>Nodejs</code>呢？</p>
<p><strong>Nodejs</strong>：</p>
<ul>
<li><p><code>ECMAScript</code>(语言基础，如：语法、数据类型结构以及一些内置对象)</p></li>
<li><p><code>os</code>(操作系统)</p></li>
<li><p><code>file</code>(文件系统)</p></li>
<li><p><code>net</code>(网络系统)</p></li>
<li><p><code>database</code>(数据库)</p></li>
</ul>
<p>分析：很容易看出，前端和后端的<code>js</code>相同点就是，他们的语言基础都是<code>ECMAScript</code>，只是他们所扩展的东西不同，前端需要操作页面元素，于是扩展了<code>DOM</code>，也需要操作浏览器，于是就扩展了<code>BOM</code>。而服务端的<code>js</code>则也是基于<code>ECMAScript</code>扩展出了服务端所需要的一些<code>API</code>，稍微了解后台的童鞋肯定知道，后台语音有操作系统的能力，于是扩展<code>os</code>，需要有操作文件的能力，于是扩展出<code>file</code>文件系统、需要操作网络，于是扩展出<code>net</code>网络系统，需要操作数据，于是要扩展出<code>database</code>的能力。</p>
<p>这么一对比，相信很多小伙伴对<code>nodejs</code>更加了解了，原来前端和服务端的<code>js</code>如此相似，他们的基础是相同的，只是环境不同，导致他们扩展出来的东西不同而已。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端Javascript与Nodejs的异同

## 原文链接
[https://segmentfault.com/a/1190000006154835](https://segmentfault.com/a/1190000006154835)

