---
title: 'Webpack 源码（二）—— 如何阅读源码' 
date: 2019-01-28 2:30:09
hidden: true
slug: 7v0gtpe75yk
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">1、如何调试阅读源码</h2>
<p>如果想要了解 Webpack 的流程，只要阅读 @七珏 <a href="http://taobaofed.org/blog/2016/09/09/webpack-flow/" rel="nofollow noreferrer" target="_blank">细说 webpack 之流程篇</a> 所述的内容就够了，讲解地比较全面了；本文就不对 Webpack 流程再做重复的描述，而是从另外一个角度补充分析 Webpack 源码；</p>
<p>Webpack 中最为重要的无非是  Compiler 、Compilation 、Module等对象，阅读源码的过程其实可以认为是  <strong>了解对象的方法和属性的过程</strong>；通读 Webpack 这个大工程的源码，以一个公司（Company）来类比，你会发现这几个对象的关系大致如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008060487?w=1024&amp;h=768" src="https://static.alili.tech/img/remote/1460000008060487?w=1024&amp;h=768" alt="类比" title="类比" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li><p><strong>Webpack</strong> 就是一个大公司</p></li>
<li><p><strong>Compiler</strong> 就像公司的董事会，只把握公司大方向的走向，不关心细节实现</p></li>
<li><p><strong>Compilation</strong> 就像是 CEO，由董事会任命，主要操心整个公司运行，调度各个部门运作</p></li>
<li><p><strong>ModuleFactory</strong> 就像各个部门了，从事打造各种产品细节</p></li>
<li><p>最终输出的 bundle 就像是具体的产品</p></li>
</ul>
<p>这个类比或许有些欠妥，但也大致能展现出这个核心功能模块的位置，有个大概了解即可；</p>
<h2 id="articleHeader1">2、分析对象属性和方法</h2>
<p>在源码分析中，最基本的有两点：</p>
<ol>
<li><p>需要分析对象本身的属性和方法</p></li>
<li><p>分析对象之间的关系（继承、实现）等</p></li>
</ol>
<p>和人的社交类似，前者回到某个人本身的属性（性别、年龄等）和功能（琴棋书画等技能），后者回答某人人的社会关系（兄弟、父子等关系）；</p>
<p>以 Compiler 实例为例，在 Webstorm 中我们打一个断点，右键使用 <strong>Evalute Expression...</strong> 功能：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008060488?w=517&amp;h=324" src="https://static.alili.tech/img/remote/1460000008060488?w=517&amp;h=324" alt="使用表达式功能" title="使用表达式功能" style="cursor: pointer; display: inline;"></span></p>
<p>获取该实例对象的属性，直接使用 <code>Object.getOwnPropertyNames(obj)</code> 获取：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008060489?w=525&amp;h=549" src="https://static.alili.tech/img/remote/1460000008060489?w=525&amp;h=549" alt="获取属性" title="获取属性" style="cursor: pointer; display: inline;"></span></p>
<p>使用<code>Object.getPrototypeOf(compiler)</code> 就能根据当前实例获取其原型对象，主要是关注上面定义的方法：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008060490?w=525&amp;h=549" src="https://static.alili.tech/img/remote/1460000008060490?w=525&amp;h=549" alt="获取Compiler原型的方法" title="获取Compiler原型的方法" style="cursor: pointer; display: inline;"></span></p>
<p>同时进一步分析其继承的对象，就能获知 Compiler 对象的继承关系：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008060491?w=424&amp;h=801" src="https://static.alili.tech/img/remote/1460000008060491?w=424&amp;h=801" alt="继承关系" title="继承关系" style="cursor: pointer; display: inline;"></span></p>
<p>到这里为止我们已经比较全面地掌握了  Compiler 对象，对源码的进一步分析打下了基础；比如在此基础上，我们可以分析上一节所述的 <strong>make事件阶段</strong> 过程：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008060492?w=1024&amp;h=768" src="https://static.alili.tech/img/remote/1460000008060492?w=1024&amp;h=768" alt="make事件阶段" title="make事件阶段" style="cursor: pointer; display: inline;"></span></p>
<p>以及 <strong>loader</strong> 加载过程：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008060493?w=2048&amp;h=921" src="https://static.alili.tech/img/remote/1460000008060493?w=2048&amp;h=921" alt="loader" title="loader" style="cursor: pointer; display: inline;"></span></p>
<p>等等其他你想了解的内容，都可以基于上面的功能分析出来，这里就不一一列举了。</p>
<p>正所谓四两拨千斤，找对要分析的 <strong>对象</strong> 以及 <strong>它的关系网</strong> ，就找到了正确的分析源码的方法；</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Webpack 源码（二）—— 如何阅读源码

## 原文链接
[https://segmentfault.com/a/1190000008060484](https://segmentfault.com/a/1190000008060484)

