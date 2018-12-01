---
title: '四个最诡异的 CSS 特性' 
date: 2018-12-02 2:30:15
hidden: true
slug: i0zyrepjxq
categories: [reprint]
---

{{< raw >}}

                    
<p>JavaScript 作为一个创始人拍脑袋 10 天搞出的语言，JS 中包含了很多在今天看来很多不应该出现在现代语言中的诡异特性。其实，作为 Web 中必不可少的 CSS 语言也不逞多让。今天我就来聊聊我认为的那些最诡异的 CSS 特性。</p>
<h2 id="articleHeader0">
<code>overflow-x: scroll</code> 和 <code>overflow-y: visible</code>
</h2>
<p><code>overflow</code> 有个很诡异的特性。<a href="https://drafts.csswg.org/css-overflow-3/#overflow-properties" rel="nofollow noreferrer" target="_blank">标准</a> 规定：当 <code>overflow-x</code> <code>overflow-y</code> 其中有一项不为 <code>visible</code>，另一项中的 <code>visible</code> 值被计算为 <code>auto</code></p>
<p><a href="http://jsfiddle.net/yrvk6104/" rel="nofollow noreferrer" target="_blank">http://jsfiddle.net/yrvk6104/</a><button class="btn btn-xs btn-default ml10 preview" data-url="yrvk6104/" data-typeid="0">点击预览</button></p>
<p>这个诡异的设定经常会导致设计一些包含子菜单的侧边栏时出问题。侧边栏的 <code>overflow-y: scroll</code> 会强制将 <code>overflow-x</code> 设置为 <code>auto</code>，导致绝对定位的二级菜单显示不出来。解决方案只能是把一级菜单的 <code>position: relative</code> 去除（或直接改用固定定位），然后使用 JS 计算二级菜单应该摆放的位置。</p>
<p>值得一提的是：最近刚通过了一项 CSS 规范允许 <code>overflow</code> 一次指定两个值：<a href="https://github.com/w3c/csswg-drafts/issues/2484" rel="nofollow noreferrer" target="_blank">https://github.com/w3c/csswg-...</a>，它只是 <code>overflow-x</code> <code>overflow-y</code> 两属性连用的简写而已，对现有行为没有影响。</p>
<h2 id="articleHeader1">外边距折叠（<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing" rel="nofollow noreferrer" target="_blank">margin collapsing</a>，或简称边距折叠）</h2>
<p>据说这个诡异的特性最初设计是为简化文章排版的。</p>
<p><a href="https://jsfiddle.net/u3roktvg/1/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/u3roktvg/1/</a><button class="btn btn-xs btn-default ml10 preview" data-url="u3roktvg/1/" data-typeid="0">点击预览</button></p>
<p>如示例：p 标签上下都有 1em 的边距，由于边距折叠的特性，上下相邻的 p 标签只相距 1em。第一个 p 标签和外层的 h1 也发生的边距折叠。如果打开 p 标签外层 div 的边框，可以看到 p 标签距离 h1 还应该更远。</p>
<p>边距折叠有几个基本的要求：</p>
<ol>
<li>只有上下边距会发生折叠</li>
<li>发生边距折叠元素的 <strong>边距</strong> 必须位置上相邻（注意这里是边距占用的空间相邻，包括相邻同级元素的边距重合，和父子级元素边距重合）。边距之间不能有非外边距占用空间（例如 <code>border</code>、<code>padding</code> 等）阻隔</li>
</ol>
<p>还有一种空元素的情况，我认为可以算是第二种情况的极端例子：<a href="https://jsfiddle.net/u3roktvg/2/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/u3roktvg/2/</a><button class="btn btn-xs btn-default ml10 preview" data-url="u3roktvg/2/" data-typeid="0">点击预览</button></p>
<p>还有两个不发生边距折叠的情形：</p>
<ol>
<li>拥有新的<a href="https://developer.mozilla.org/en-US/docs/Web/Guide/CSS/Block_formatting_context" rel="nofollow noreferrer" target="_blank">块级格式上下文</a>的元素（<code>display: flow-root</code>、<code>overflow: hidden</code>、<code>position: absolute</code> 等）其子元素不会和其外部其他元素发生边距折叠</li>
<li>弹性布局元素的子元素之间不发生边距折叠</li>
</ol>
<p>这两种情形通常可以用于规避边距折叠，给父元素设置 <code>display: flex; flex-direction: column</code> 可以解决一半以上边距折叠的情况了。</p>
<p>另外，css-tricks 上有一篇很好的文章：<a href="https://css-tricks.com/what-you-should-know-about-collapsing-margins/" rel="nofollow noreferrer" target="_blank">What You Should Know About Collapsing Margins</a></p>
<h2 id="articleHeader2">margin、padding 的百分比取值</h2>
<p><a href="https://www.w3.org/TR/CSS2/box.html#propdef-margin" rel="nofollow noreferrer" target="_blank">标</a><a href="https://www.w3.org/TR/CSS2/box.html#propdef-padding" rel="nofollow noreferrer" target="_blank">准</a>规定：当元素的 margin、padding 取值为百分比时，其值始终按父元素的 <strong>宽度</strong> 计算，包括上下内外边距。</p>
<p>当然了，如果按照正常思维上下边距百分比取值基于父元素的高度计算，反而不如现在这样基于宽度计算有用：因为竟然有人想出了用这种特性实现保持元素的高宽比。</p>
<p>一个保持高宽比的例子：</p>
<p><a href="https://jsfiddle.net/t75gnqwq/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/t75gnqwq/</a><button class="btn btn-xs btn-default ml10 preview" data-url="t75gnqwq/" data-typeid="0">点击预览</button></p>
<p>不知道伟大的 CSS 之父设计这两个属性时是不是考虑到了这一层😂有人提出过一个名词叫“<a href="https://www.web-tinker.com/article/20940.html" rel="nofollow noreferrer" target="_blank">基于巧合的编程</a>”，那么这种规范叫做“基于巧合的设计”再好不过了</p>
<h2 id="articleHeader3">transform 中的 <code>position: fixed</code> 元素</h2>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/position#Fixed_positioning" rel="nofollow noreferrer" target="_blank">固定定位</a>（<code>position: fixed</code>）简而言之（不太规范的描述）就是 <strong>固定</strong> 基于视口绝对 <strong>定位</strong>。</p>
<p>但是！！！<a href="https://www.w3.org/TR/css-transforms-1/#transform-rendering" rel="nofollow noreferrer" target="_blank">标准</a>又规定：当一个固定定位的元素的直接或间接父级有包含 <code>transform</code> 不为 <code>none</code> 的元素时，这个元素会改为基于该父级元素元素绝对定位。</p>
<p>我估计不少移动端开发者都多遇到这样的问题：某一天他终于受不了原生滚动的卡顿，痛定思痛上了 iscroll，然后发现其中所有的固定定位元素位置都跑掉了。WTF？</p>
<p>然而这个规范定义的却不太寻常：<code>position: fixed</code> 定义在 <code>css-position</code> 规范里。而后面的那个补充说明却写在 <code>css-transforms</code> 规范里，后面还附带了一个 <a href="https://www.w3.org/TR/css-transforms-1/#issue-fc114988" rel="nofollow noreferrer" target="_blank">ISSUE</a>，好像标准的制定者似乎不太情愿指定这样的规范。我简单考据了一下，这个规范应该是浏览器先实现成了这样，然后倒逼标准制定者加了这一条规范，可以算是一个浏览器逆袭标准的例子。然而有人给 Chrome 开的 <a href="https://bugs.chromium.org/p/chromium/issues/detail?id=20574&amp;desc=2#c63" rel="nofollow noreferrer" target="_blank">bug</a> 已经被标记为 <code>won't fix</code>，情况不大可能（至少在短期内）有什么转变。</p>
<p>逆来顺受终归是程序员的命。</p>
<p>不过话说回来，就像 <code>padding-top: 50%</code> 一样，这个诡异的特性说不定也有用处：它提供了一种将绝对定位的参考元素跳过最近非 <code>position: static</code> 元素的一种方式。</p>
<p><a href="http://jsfiddle.net/xnw59zcr/3/" rel="nofollow noreferrer" target="_blank">http://jsfiddle.net/xnw59zcr/3/</a><button class="btn btn-xs btn-default ml10 preview" data-url="xnw59zcr/3/" data-typeid="0">点击预览</button></p>
<p>示例中 <code>当前显示第n个菜单项</code> 这个 <code>li</code> 自身是放在二级菜单里的，直接使用 <code>position: absolute</code> 会跟随二级菜单的位置变化不符合需求，而如果使用 <code>position: fixed</code> 元素相对视口的未知又不固定。这时，<code>position: fixed</code> 和 <code>transform: scale(1)</code> 连用这个 <code>trick</code> 就派上了用场。</p>
<h2 id="articleHeader4">完</h2>
<p>你还见过哪些诡异的 CSS 特性呢？</p>
<p><a href="https://jsfiddle.net/1b4swamw/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/1b4swamw/</a><button class="btn btn-xs btn-default ml10 preview" data-url="1b4swamw/" data-typeid="0">点击预览</button></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
四个最诡异的 CSS 特性

## 原文链接
[https://segmentfault.com/a/1190000014742410](https://segmentfault.com/a/1190000014742410)

