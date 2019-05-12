---
title: '前端面试题-CSS选择器性能优化' 
date: 2018-12-10 2:30:07
hidden: true
slug: 39qzhmbp9py
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">一、CSS选择符</h2>
<blockquote>CSS选择符由一些初始化参数组成，这些参数指明了要应用这个CSS规则的页面元素。</blockquote>
<p>作为一个网站的前端开发工程师，应该<strong>避免</strong>编写一些常见的开销很大的CSS选择符模式，尽量编写高效的CSS选择符，从而加快页面的渲染速度，缩短页面呈现时间。</p>
<h2 id="articleHeader1">二、浏览器读取选择器</h2>
<blockquote>浏览器读取选择器，遵循的原则是从选择器的<strong>右边到左边</strong>读取。换句话说，浏览器读取选择器的顺序是由右到左进行的。</blockquote>
<h3 id="articleHeader2">2.1 举例</h3>
<p><span class="img-wrap"><img data-src="/img/bV5VxO?w=428&amp;h=131" src="https://static.alili.tech/img/bV5VxO?w=428&amp;h=131" alt="选择器" title="选择器" style="cursor: pointer; display: inline;"></span></p>
<p>浏览器读取选择器的顺序如下:</p>
<ol>
<li>查找页面中所有 class=red 的 span 元素</li>
<li>查找 1. 结果的父元素中是否有 p 元素</li>
<li>查找 2. 结果的父元素中是否有 id=box 的 div 元素</li>
</ol>
<h3 id="articleHeader3">2.2 从右到左的用处</h3>
<ul>
<li>尽早的过滤掉无关的样式规则</li>
<li>尽快的匹配到目标元素</li>
</ul>
<h3 id="articleHeader4">2.3 关键选择器</h3>
<p>选择器的最后一部分，也就是选择器的最右边部分被称为 <strong>关键选择器</strong> （keyselector），它将决定 CSS 选择器的效率。</p>
<h2 id="articleHeader5">三、选择器的效率</h2>
<h3 id="articleHeader6">3.1 从高到低</h3>
<p>内联样式 &gt; ID 选择器 &gt; 类选择器 = 属性选择器 = 伪类选择器 &gt; 元素（类型）选择器 = 伪元素选择器</p>
<h3 id="articleHeader7">3.2 总结</h3>
<p>ID和类名用于关键选择器上效率是<strong>最高的</strong>，而CSS3的仿伪类和属性选择器，虽然使用方便，但其效率却是<strong>最低的</strong>。</p>
<h2 id="articleHeader8">四、选择器性能优化</h2>
<p>根据以上「浏览器读取选择器」与「选择器的效率」原则，我们可以通过避免不恰当的使用，提升 CSS 选择器的性能。</p>
<h3 id="articleHeader9">4.1 避免使用通用选择器</h3>
<p><span class="img-wrap"><img data-src="/img/bV5VI0?w=469&amp;h=128" src="https://static.alili.tech/img/bV5VI0?w=469&amp;h=128" alt="选择器性能优化" title="选择器性能优化" style="cursor: pointer; display: inline;"></span></p>
<p>浏览器匹配文档中所有的元素后分别向上逐级匹配 class 为 content 的元素，直到文档的根节点。因此其匹配开销是非常大的，所以应避免使用关键选择器是通配选择器的情况。</p>
<h3 id="articleHeader10">4.2 不要在编写id规则时用标签名或类名</h3>
<p><span class="img-wrap"><img data-src="/img/bV5VLI?w=412&amp;h=257" src="https://static.alili.tech/img/bV5VLI?w=412&amp;h=257" alt="选择器性能优化" title="选择器性能优化" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader11">4.3 不要在编写class规则时用标签名</h3>
<p><span class="img-wrap"><img data-src="/img/bV5VLv?w=786&amp;h=205" src="https://static.alili.tech/img/bV5VLv?w=786&amp;h=205" alt="选择器性能优化" title="选择器性能优化" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader12">4.4 把多层标签选择规则用class规则替换，减少css查找</h3>
<p><span class="img-wrap"><img data-src="/img/bV5VMa?w=699&amp;h=153" src="https://static.alili.tech/img/bV5VMa?w=699&amp;h=153" alt="选择器性能优化" title="选择器性能优化" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader13">4.5 避免使用子选择器</h3>
<p><strong>后代选择器在CSS中是最昂贵的选择器。贵得要命——尤其是把它和标签或通配符放在一起！</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV5VMW?w=593&amp;h=158" src="https://static.alili.tech/img/bV5VMW?w=593&amp;h=158" alt="选择器性能优化" title="选择器性能优化" style="cursor: pointer;"></span></p>
<p><strong>标签后面最好永远不要再增加子选择器</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV5VNd?w=868&amp;h=255" src="https://static.alili.tech/img/bV5VNd?w=868&amp;h=255" alt="选择器性能优化" title="选择器性能优化" style="cursor: pointer;"></span></p>
<h3 id="articleHeader14">4.6 依靠继承</h3>
<p><span class="img-wrap"><img data-src="/img/bV5VNA?w=812&amp;h=154" src="https://static.alili.tech/img/bV5VNA?w=812&amp;h=154" alt="选择器性能优化" title="选择器性能优化" style="cursor: pointer;"></span></p>
<h3 id="articleHeader15">4.7 避免单规则的属性选择器</h3>
<p>属性选择器根据元素的属性是否存在或其属性值进行匹配，如下例规则会把herf属性值等于 ”#index” 的链接元素设置为红色：</p>
<p><span class="img-wrap"><img data-src="/img/bV5VRi?w=427&amp;h=131" src="https://static.alili.tech/img/bV5VRi?w=427&amp;h=131" alt="选择器性能优化" title="选择器性能优化" style="cursor: pointer; display: inline;"></span></p>
<p>但其匹配开销是非常大的，浏览器先匹配所有的元素，检查其是否有href属性并且herf属性值等于”#index”， 然后分别向上逐级匹配class为selected的元素，直到文档的根节点。所以应避免使用关键选择器是单规则属性选择器的规则。</p>
<h3 id="articleHeader16">4.8 避免类正则的属性选择器</h3>
<p>CSS3添加了复杂的属性选择器，可以通过类正则表达式的方式对元素的属性值进行匹配。当然这些类型的选择器定是会影响性能的，正则表达式匹配会比基于类别的匹配会慢很多。大部分情况下我们应尽量避免使用 *=， |=， ^=， $=， 和 ~=语法的属性选择器。</p>
<h3 id="articleHeader17">4.9 移除无匹配的样式</h3>
<p>移除无匹配的样式，有两个好处：</p>
<ul>
<li>第一，删除无用的样式后可以缩减样式文件的体积，加快资源下载速度；</li>
<li>第二，对于浏览器而言，所有的样式规则的都会被解析后索引起来，即使是当前页面无匹配的规则。移除无匹配的规则，减少索引项，加快浏览器查找速度；</li>
</ul>
<h2 id="articleHeader18">五、总结</h2>
<ol>
<li>网站编写CSS时，应该<strong>优先考虑使用class选择器</strong>，避免使用通配符选择器（*）和属性选择器（a[rel=”external”]），后代选择器与标签选择器结合使用也应避免。</li>
<li>使用id选择器的性能最好，但是编写时要<strong>注意其唯一性</strong>，谨慎使用。</li>
<li>CSS3选择器（例如：:nth-child(n)第n个孩子）在帮助我们锁定我们想要的元素的同时保持标记的干净和语义化，但事实是，这些花哨的选择器让更多的<strong>浏览器资源被密集使用</strong>。如果你关心页面性能的话，他们真不该被使用！</li>
</ol>
<p>扩展阅读 <br><a href="https://segmentfault.com/a/1190000013745407">前端面试题-CSS选择器</a><br><a href="https://segmentfault.com/a/1190000013755953" target="_blank">前端面试题-CSS优先级</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端面试题-CSS选择器性能优化

## 原文链接
[https://segmentfault.com/a/1190000013768970](https://segmentfault.com/a/1190000013768970)

