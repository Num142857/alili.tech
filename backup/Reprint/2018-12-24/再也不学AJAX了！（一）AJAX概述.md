---
title: '再也不学AJAX了！（一）AJAX概述' 
date: 2018-12-24 2:30:07
hidden: true
slug: 6d463s516uj
categories: [reprint]
---

{{< raw >}}

                    
<p>“再也不学AJAX了”是一个与AJAX主题相关的文章系列，包含以下三个部分的内容：</p>
<ol>
<li>
<strong>AJAX概述</strong>：主要回答“AJAX是什么”这个问题；</li>
<li>
<strong>使用AJAX</strong>：介绍如何通过JavaScript发送AJAX请求；</li>
<li>
<strong>跨域获取数据</strong>：介绍了与“跨域发送AJAX请求”相关的一些内容：比如“浏览器同源策略”与四种跨域请求资源的方式：JSONP，CORS，postMessage和webSocket；</li>
</ol>
<p>希望通过阅读该系列三个部分的内容，你能够彻底理解并掌握AJAX技术，从此再也不用专门学习AJAX。</p>
<p>让我们开始吧 ?。</p>
<h2 id="articleHeader0">一、什么是AJAX？</h2>
<p>AJAX是“Asynchronous JavaScript And <strong>XML</strong>”的缩写(即：异步的JavaScript和XML)，是一种实现<strong>无页面刷新</strong>获取服务器数据的<strong>混合技术</strong>。</p>
<p>让我们停下来好好思考一下这个定义，注意那些醒目的蓝色文字，它们出现在那里不是没有理由的。</p>
<p>好的，相信你已经对这个定义有些印象，现在让我对那些蓝色的文字做些说明：</p>
<h3 id="articleHeader1">（一）XML是什么？</h3>
<p>XML是“Extensible Markup Language”的缩写（即：可拓展标记语言），是一种特征类似HTML，用来描述数据是什么，并承载数据的标记语言，你可以在中文的<a href="https://zh.wikipedia.org/wiki/XML" rel="nofollow noreferrer" target="_blank">维基百科</a>中看到更完整的解释，但我们现在只要知道它是一种用来承载数据的语言就足够了。</p>
<p>而JSON仅仅是一种数据格式，在JSON发明之前，人们大量使用XML作为数据传输的载体，也正因如此，AJAX技术的最后一个字母为“X”。而如今情况则发生了些变化，JSON这种类似于字符串对象的轻量级的数据格式越来越受到开发者青睐，几乎变成了AJAX技术的标准数据格式，因此好像AJAX技术如今应该换个名字，叫做“AJAJ”，呃，还是算了吧。</p>
<p>需要注意的是，JSON并不是XML的替代品，两者各自有其适应的场景。如果你对这两种数据格式的差异感兴趣，可以查看以下链接：</p>
<ul>
<li><a href="https://www.zhihu.com/question/20738607" rel="nofollow noreferrer" target="_blank">为什么XML这么笨重的数据结构仍在广泛应用？</a></li>
<li><a href="https://www.zhihu.com/question/25636060" rel="nofollow noreferrer" target="_blank">为什么都反对XML而支持使用JSON</a></li>
<li><a href="http://www.yegor256.com/2015/11/16/json-vs-xml.html" rel="nofollow noreferrer" target="_blank">Stop Comparing JSON and XML</a></li>
<li><a href="https://stackoverflow.com/questions/4862310/json-and-xml-comparison" rel="nofollow noreferrer" target="_blank">JSON and XML comparison</a></li>
</ul>
<h3 id="articleHeader2">（二）无页面刷新？</h3>
<p>我们知道，互联网最主要的功能在于“资源交换”，当初发明互联网的科学家们也是基于这个动机。虽然在互联网中“资源交换”的主体都是计算机。但为了方便交流，我们通常将获取资源的一方称为客户端（主要的工具是浏览器），而将派发资源的一方称为服务端（又称为“服务器”）。</p>
<p>在AJAX技术出现之前，如果浏览器需要从服务器请求资源，其交互模式为“客户端发出请求 -&gt; 服务端接收请求并返回相应HTML文档 -&gt; 页面刷新，客户端加载新的HTML文档”。确实，这种交互模式十分简洁明了，而且非常符合人的直觉，对于那时游走于互联网中的极客而言，也确实够用了。但是随着时代的进步，互联网渐渐不只是极客们的娱乐场，越来越多商业化网站的出现，使互联网不再局限于满足人们“资源交换”的需求，人们开始期待能够在互联网中获得更好的“<strong>使用体验</strong>”，而随着用户点击不断刷新页面的交互方式显然很难讨人喜欢。</p>
<p>再试想这样一种情景，当用户点击页面中的某个按钮向服务器发送请求时，页面本质上只是一些数据发生了变化，而此时服务器却要将重绘的整个页面再返回给浏览器加载，这显然有悖于程序员的“DRY”原则，而且明明只是一些数据的变化却迫使服务器要返回整个HTML文档，这本身也会给网络带宽带来不必要的开销。</p>
<p>有没有办法在页面数据变动时，只向服务器请求新的数据，并且在阻止页面刷新的情况下，动态的替换页面中展示的数据呢？ -- 答案正是“AJAX”。</p>
<p>AJAX技术的问世，不仅通过阻止浏览器接受响应时刷新页面提升了互联网用户的使用体验，还使开发者能够以更加微观的视角重新思考互联网应用的构建，从此，开发者将在“数据”层面而不是“资源”层面以更高的自由度构建网站和Web应用。</p>
<h3 id="articleHeader3">（三）混合技术？</h3>
<p>是的，AJAX技术并不只是操作<code>XMLHttpRequest</code>对象发起异步请求，而是为了实现“无页面刷新的资源获取”的一些列技术的统称，这些技术包括了：</p>
<ul>
<li>JavaScript：用来在获取数据后，通过操作DOM或其他方式达成目标；</li>
<li>客户端（即浏览器）提供的实现异步服务器通信的<code>XMLHttpRequest</code>对象；</li>
<li>服务器端允许浏览器向其发起AJAX请求的相关设置；</li>
</ul>
<p>明白AJAX并不只是操作<code>XMLHttpRequest</code>对象，对于初学者而言是十分必要的。</p>
<hr>
<h2 id="articleHeader4">二、AJAX的意义</h2>
<p>相信你已经明白了，AJAX技术的意义在于：它能够使浏览器在不刷新页面的情况下获取服务器响应，这将大大提升互联网用户的使用体验，同时，由于AJAX请求获取的是数据而不是HTML文档，因此它也节省了网络带宽，让互联网用户的网络冲浪体验变得更加顺畅。</p>
<p>同时，我们也应该注意到，由于AJAX技术可以令开发者只向服务器获取数据（而不是图片，HTML文档等资源），互联网资源的传输变得前所未有的轻量级和纯粹，这激发了广大开发者的创造力，使各式各样功能强大的网络站点，和互联网应用如雨后春笋一般冒出，不断带给人惊喜。</p>
<hr>
<h2 id="articleHeader5">三、小结</h2>
<p>本文我们讲解了“什么是AJAX”以及“AJAX的意义”，你可能会觉得一篇技术文章没有代码实在很古怪，但我觉得在一开始就对某个概念建立起正确的心智模型很重要。它可以帮助我们为之后概念细节的学习打下良好基础。别着急，在下一篇文章中，我们会花费大量篇幅去讨论如何使用AJAX技术，希望你保持耐心，Keep Learning，加油！?</p>
<p><br><br><br><br><br><br>?  Hey！喜欢这篇文章吗？别忘了在下方? 点赞让我知道。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
再也不学AJAX了！（一）AJAX概述

## 原文链接
[https://segmentfault.com/a/1190000012207226](https://segmentfault.com/a/1190000012207226)

