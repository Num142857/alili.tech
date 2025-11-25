---
title: 'CSS 中重要的层叠概念' 
date: 2019-01-03 2:30:11
hidden: true
slug: pcj8mtnwf3k
categories: [reprint]
---

{{< raw >}}

                    
<p>最近在项目的过程中遇到了一个问题，menu-bar希望始终显示在最上面，而在之后的元素都显示在它之下，当时设置了 z-index 也没有效果，不知道什么原因，因此找了一下css有关层叠方面的资料，解决了这个问题，这里记录一下~</p>
<p>屏幕是一个二维平面，然而HTML元素却是排列在三维坐标系中，x为水平位置，y为垂直位置，z为屏幕由内向外方向的位置，我们在看屏幕的时候是沿着z轴方向从外向内的；由此，元素在用户视角就形成了层叠的关系，某个元素可能覆盖了其他元素也可能被其他元素覆盖；</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016489081?w=809&amp;h=517" src="https://static.alili.tech/img/remote/1460000016489081?w=809&amp;h=517" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>那么这里有几个重要的概念：<strong>层叠上下文</strong> (堆叠上下文, Stacking Context)、<strong>层叠等级</strong> (层叠水平, Stacking Level)、<strong>层叠顺序</strong> (层叠次序, 堆叠顺序, Stacking Order)、<strong>z-index</strong></p>
<p>声明：</p>
<ol>
<li>以下定位元素指的是<code>position: absolute|fixed|relative|sticky</code>
</li>
<li>以下非定位元素指的是<code>position: initial|static</code>
</li>
<li>关于层叠上下文还有一个类似的概念：<strong>块级格式化上下文</strong>(BFC, Block Formatting Context)，可以参考一下 <a href="https://segmentfault.com/a/1190000013023485">CSS 中重要的BFC</a>，其中还介绍了一些文档流的内容；</li>
<li>本文蛮长的，但是如果你有勇气看完，那应该对层叠有关概念就基本掌握了 (～o￣▽￣)～</li>
</ol>
<h2 id="articleHeader0">1. 层叠上下文 (Stacking Context)</h2>
<p><strong>层叠上下文</strong> (堆叠上下文, Stacking Context)，是HTML中一个三维的概念。在CSS2.1规范中，每个元素的位置是三维的，当元素发生层叠，这时它可能覆盖了其他元素或者被其他元素覆盖；排在z轴越靠上的位置，距离屏幕观察者越近</p>
<p>文章<a href="https://webdesign.tutsplus.com/zh-hans/articles/what-you-may-not-know-about-the-z-index-property--webdesign-16892" rel="nofollow noreferrer" target="_blank">&lt;关于z-index 那些你不知道的事&gt;</a>有一个很好的比喻，这里引用一下；</p>
<p>可以想象一张桌子，上面有一堆物品，这张桌子就代表着一个层叠上下文。 如果在第一张桌子旁还有第二张桌子，那第二张桌子就代表着另一个层叠上下文。</p>
<p>现在想象在第一张桌子上有四个小方块，他们都直接放在桌子上。 在这四个小方块之上有一片玻璃，而在玻璃片上有一盘水果。 这些方块、玻璃片、水果盘，各自都代表着层叠上下文中一个不同的层叠层，而这个层叠上下文就是桌子。</p>
<p>每一个网页都有一个默认的层叠上下文。 这个层叠上下文（桌子）的根源就是<code>&lt;html&gt;&lt;/html&gt;</code>。 html标签中的一切都被置于这个默认的层叠上下文的一个层叠层上（物品放在桌子上）。</p>
<p>当你给一个定位元素赋予了除 <code>auto</code> 外的 z-index 值时，你就创建了一个新的层叠上下文，其中有着独立于页面上其他层叠上下文和层叠层的层叠层， 这就相当于你把另一张桌子带到了房间里。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016489082?w=600&amp;h=296" src="https://static.alili.tech/img/remote/1460000016489082?w=600&amp;h=296" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>层叠上下文1 (Stacking Context 1)是由文档根元素形成的， 层叠上下文2和3 (Stacking Context 2, 3) 都是层叠上下文1 (Stacking Context 1) 上的层叠层。 他们各自也都形成了新的层叠上下文，其中包含着新的层叠层。</p>
<p>在层叠上下文中，其子元素按照上面解释的规则进行层叠。形成层叠上下文的<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context" rel="nofollow noreferrer" target="_blank">方法</a>有：</p>
<ul>
<li>根元素<code>&lt;html&gt;&lt;/html&gt;</code>
</li>
<li>
<code>position</code>值为<code>absolute | relative</code>，且<code>z-index</code>值不为 <code>auto</code>
</li>
<li>
<code>position</code> 值为 <code>fixed | sticky</code>
</li>
<li>
<code>z-index</code> 值不为 <code>auto</code> 的flex元素，即：父元素<code>display: flex | inline-flex</code>
</li>
<li>
<code>opacity</code> 属性值小于 <code>1</code> 的元素</li>
<li>
<code>transform</code> 属性值不为 <code>none</code>的元素</li>
<li>
<code>mix-blend-mode</code> 属性值不为 <code>normal</code> 的元素</li>
<li>
<code>filter</code>、<code>perspective</code>、<code>clip-path</code>、<code>mask</code>、<code>mask-image</code>、<code>mask-border</code>、<code>motion-path</code> 值不为 <code>none</code> 的元素</li>
<li>
<code>perspective</code> 值不为 <code>none</code> 的元素</li>
<li>
<code>isolation</code> 属性被设置为 <code>isolate</code> 的元素</li>
<li>
<code>will-change</code> 中指定了任意 CSS 属性，即便你没有直接指定这些属性的值</li>
<li>
<code>-webkit-overflow-scrolling</code> 属性被设置 <code>touch</code>的元素</li>
</ul>
<p>总结:</p>
<ol>
<li>层叠上下文可以包含在其他层叠上下文中，并且一起组建了一个有层级的层叠上下文</li>
<li>每个层叠上下文完全独立于它的兄弟元素，当处理层叠时只考虑子元素，这里类似于<a href="https://segmentfault.com/a/1190000013023485">BFC</a>
</li>
<li>每个层叠上下文是自包含的：当元素的内容发生层叠后，整个该元素将会<strong>在父级叠上下文</strong>中按顺序进行层叠</li>
</ol>
<h2 id="articleHeader1">2. 层叠等级 (Stacking Level)</h2>
<p><strong>层叠等级</strong> (层叠水平, Stacking Level) 决定了同一个层叠上下文中元素在z轴上的显示顺序的<strong>概念</strong>；</p>
<ul>
<li>普通元素的层叠等级优先由其所在的层叠上下文决定</li>
<li>层叠等级的比较只有在同一个层叠上下文元素中才有意义</li>
<li>在同一个层叠上下文中，层叠等级描述定义的是该层叠上下文中的元素在Z轴上的上下顺序</li>
</ul>
<p>注意，层叠等级并不一定由 z-index 决定，只有定位元素的层叠等级才由 z-index 决定，其他类型元素的层叠等级由层叠顺序、他们在HTML中出现的顺序、他们的父级以上元素的层叠等级一同决定，详细的规则见下面层叠顺序的介绍。</p>
<h2 id="articleHeader2">3. z-index</h2>
<blockquote>在 CSS 2.1 中, 所有的盒模型元素都处于三维坐标系中。 除了我们常用的横坐标和纵坐标， 盒模型元素还可以沿着"z 轴"层叠摆放， 当他们相互覆盖时， z 轴顺序就变得十分重要。<p>-- <a href="http://www.w3.org/TR/CSS21/visuren.html#z-index" rel="nofollow noreferrer" target="_blank">CSS 2.1 Section 9.9.1 - Layered presentation</a></p>
</blockquote>
<p>z-index 只适用于定位的元素，对非定位元素无效，它可以被设置为正整数、负整数、0、auto，如果一个定位元素没有设置 z-index，那么默认为auto；</p>
<p>元素的 z-index 值只在同一个层叠上下文中有意义。如果父级层叠上下文的层叠等级低于另一个层叠上下文的，那么它 z-index 设的再高也没用。所以如果你遇到 z-index 值设了很大，但是不起作用的话，就去看看它的父级层叠上下文是否被其他层叠上下文盖住了。</p>
<h2 id="articleHeader3">4. 层叠顺序 (Stacking Order)</h2>
<p><strong>层叠顺序</strong> (层叠次序, 堆叠顺序, Stacking Order) 描述的是元素在同一个层叠上下文中的顺序<strong>规则</strong>，从层叠的底部开始，共有七种层叠顺序：</p>
<ol>
<li>
<strong>背景和边框</strong>：形成层叠上下文的元素的背景和边框。</li>
<li>
<strong>负z-index值</strong>：层叠上下文内有着负z-index值的定位子元素，负的越大层叠等级越低；</li>
<li>
<strong>块级盒</strong>：文档流中块级、非定位子元素；</li>
<li>
<strong>浮动盒</strong>：非定位浮动元素；</li>
<li>
<strong>行内盒</strong>：文档流中行内、非定位子元素；</li>
<li>
<strong>z-index: 0</strong>：z-index为0或auto的定位元素， 这些元素形成了新的层叠上下文；</li>
<li>
<strong>正z-index值</strong>：z-index 为正的定位元素，正的越大层叠等级越高；</li>
</ol>
<p>同一个层叠顺序的元素按照在HTML里出现的顺序层叠；第7级顺序的元素会显示在之前顺序元素的上方，也就是看起来覆盖了更低级的元素：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016489083?w=630&amp;h=406" src="https://static.alili.tech/img/remote/1460000016489083?w=630&amp;h=406" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">5. 实战</h2>
<h3 id="articleHeader5">5.1 普通情况</h3>
<p>三个<code>relative</code>定位的<code>div</code>块中各有<code>absolute</code>的不同颜色的<code>span.red</code>、<code>span.green</code>、<code>span.blue</code>，它们都设置了<code>position: absolute</code>；</p>
<p><a href="https://codepen.io/SHERlocked93/pen/aaPord" rel="nofollow noreferrer" target="_blank">参见Codepen - 普通情况</a><button class="btn btn-xs btn-default ml10 preview" data-url="SHERlocked93/pen/aaPord" data-typeid="3">点击预览</button></p>
<p>那么当没有元素包含z-index属性时，这个例子中的元素按照如下顺序层叠（从底到顶顺序）：</p>
<ol>
<li>根元素的背景和边界</li>
<li>块级非定位元素按HTML中的出现顺序层叠</li>
<li>行内非定位元素按HTML中的出现顺序层叠</li>
<li>定位元素按HTML中的出现顺序层叠</li>
</ol>
<p>红绿蓝都属于 z-index 为auto的定位元素，因此按照7层层叠顺序规则来说同属于层叠顺序第6级，所以按HTML中的出现顺序层叠：<code>红-&gt;绿-&gt;蓝</code></p>
<h3 id="articleHeader6">5.2 在相同层叠上下文的父元素内的情况</h3>
<p>红绿位于一个<code>div.first-box</code>下，蓝位于<code>div.second-box</code>下，红绿蓝都设置了<code>position: absolute</code>，<code>first-box</code>与<code>second-box</code>都设置了<code>position: relative</code>；</p>
<p><a href="https://codepen.io/SHERlocked93/pen/RYENBw" rel="nofollow noreferrer" target="_blank">参见Codepen - 父元素不同但都位于根元素下</a><button class="btn btn-xs btn-default ml10 preview" data-url="SHERlocked93/pen/RYENBw" data-typeid="3">点击预览</button></p>
<p>这个例子中，红蓝绿元素的父元素<code>first-box</code>与<code>second-box</code>都没有生成新的层叠上下文，都属于根层叠上下文中的元素，且都是层叠顺序第6级，所以按HTML中的出现顺序层叠：<code>红-&gt;绿-&gt;蓝</code></p>
<h3 id="articleHeader7">5.3 给子元素增加 z-index</h3>
<p>红绿位于一个<code>div.first-box</code>下，蓝黄位于<code>div.second-box</code>下，红绿蓝都设置了<code>position: absolute</code>，如果这时给绿加一个属性<code>z-index: 1</code>，那么此时<code>.green</code>位于最上面；</p>
<p>如果再在<code>.second-box</code>下<code>.green</code>后加一个绝对定位的 <code>span.gold</code>，设置<code>z-index: -1</code>，那么它将位于红绿蓝的下面；</p>
<p><a href="https://codepen.io/SHERlocked93/pen/gdZOrK" rel="nofollow noreferrer" target="_blank">参见Codepen - 设置了z-index</a><button class="btn btn-xs btn-default ml10 preview" data-url="SHERlocked93/pen/gdZOrK" data-typeid="3">点击预览</button></p>
<p>这个例子中，红蓝绿黄元素的父元素中都没有生成新的层叠上下文，都属于根层叠上下文中的元素</p>
<ol>
<li>红蓝都没有设置 z-index，同属于层叠顺序中的第6级，按HTML中的出现顺序层叠；</li>
<li>绿设置了正的 z-index，属于第7级；</li>
<li>黄设置了负的 z-index，属于第2级；</li>
</ol>
<p>所以这个例子中的从底到高显示的顺序就是：<code>黄-&gt;红-&gt;蓝-&gt;绿</code></p>
<h3 id="articleHeader8">5.4 在不同层叠上下文的父元素内的情况</h3>
<p>红绿位于一个<code>div.first-box</code>下，蓝位于<code>div.second-box</code>下，红绿蓝都设置了<code>position: absolute</code>，如果<code>first-box</code>的z-index设置的比<code>second-box</code>的大，那么此时无论蓝的 z-index 设置的多大<code>z-index: 999</code>，蓝都位于红绿的下面；如果我们只更改红绿的z-index值，由于这两个元素都在父元素<code>first-box</code>产生的层叠上下文中，此时谁的z-index值大，谁在上面；</p>
<p><a href="https://codepen.io/SHERlocked93/pen/gdZbOJ" rel="nofollow noreferrer" target="_blank">参见Codepen - 不同层叠上下文的父元素</a><button class="btn btn-xs btn-default ml10 preview" data-url="SHERlocked93/pen/gdZbOJ" data-typeid="3">点击预览</button></p>
<p>这个例子中，红绿蓝都属于设置了z-index的定位元素，不过他们的父元素创建了新的层叠上下文；</p>
<ol>
<li>红绿的父元素<code>first-box</code>是设置了正z-index的定位元素，因此创建了一个层叠上下文，属于层叠顺序中的第7级；</li>
<li>蓝的父元素<code>second-box</code>也同样创建了一个层叠上下文，属于层叠顺序中的第6级；</li>
<li>按照层叠顺序，<code>first-box</code>中所有元素都排在<code>second-box</code>上；</li>
<li>红绿都属于层叠上下文<code>first-box</code>中且设置了不同的正 z-index，都属于层叠顺序中第7级；</li>
<li>蓝属于层叠上下文<code>second-box</code>，且设置了一个很大的正 z-index，属于层叠元素中第7级；</li>
<li>虽然蓝的 z-index 很大，但是因为<code>second-box</code>的层叠等级比<code>first-box</code>小，因此位于红绿之下；</li>
</ol>
<p>所以这个例子中从低到到显示的顺序：<code>蓝-&gt;红-&gt;绿</code></p>
<p>(我遇到的的情况就属于这个例子类似情形)</p>
<h3 id="articleHeader9">5.5 给子元素设置 opacity</h3>
<p>红绿位于<code>div.first-box</code>下，蓝位于<code>div.second-box</code>下，红绿蓝都设置了<code>position: absolute</code>，绿设置了<code>z-index: 1</code>，那么此时绿位于红蓝的最上面；</p>
<p>如果此时给<code>first-box</code>设置<code>opacity: .99</code>，这时无论红绿的 z-index 设置的多大<code>z-index: 999</code>，蓝都位于红绿的上面；</p>
<p>如果再在<code>.second-box</code>下<code>.green</code>后加一个<code>span.gold</code>，设置<code>z-index: -1</code>，那么它将位于红绿蓝的下面；</p>
<p><a href="https://codepen.io/SHERlocked93/pen/GXPRWB" rel="nofollow noreferrer" target="_blank">参见Codepen - opacity的影响</a><button class="btn btn-xs btn-default ml10 preview" data-url="SHERlocked93/pen/GXPRWB" data-typeid="3">点击预览</button></p>
<p>之前已经介绍了，设置<code>opacity</code>也可以形成层叠上下文，因此：</p>
<ol>
<li>
<code>first-box</code>设置了<code>opacity</code>，<code>first-box</code>成为了一个新的层叠上下文；</li>
<li>
<code>second-box</code>没有形成新的层叠上下文，因此其中的元素都属于根层叠上下文；</li>
<li>黄属于层叠顺序中第2级，红绿属于第7级，<code>first-box</code>属于第6级，蓝属于层叠顺序中第6级且按HTML出现顺序位于<code>first-box</code>之上；</li>
</ol>
<p>所以这个例子中从低到到显示的顺序：<code>黄-&gt;红-&gt;绿-&gt;蓝</code></p>
<hr>
<p>网上的帖子大多深浅不一，甚至有些前后矛盾，在下的文章都是学习过程中的总结，如果发现错误，欢迎留言指出~</p>
<blockquote>
<p>参考：</p>
<ol>
<li><a href="https://www.w3ctrain.com/2015/07/19/what-no-one-told-you-about-z-index/" rel="nofollow noreferrer" target="_blank">你不知道的Z-Index</a></li>
<li><a href="https://developer.mozilla.org/en-US/docs/Web/CSS/z-index" rel="nofollow noreferrer" target="_blank">MDN - z-index</a></li>
<li><a href="https://philipwalton.com/articles/what-no-one-told-you-about-z-index/" rel="nofollow noreferrer" target="_blank">What No One Told You About Z-Index</a></li>
<li><a href="https://segmentfault.com/a/1190000016207606">彻底搞懂CSS层叠上下文、层叠等级、层叠顺序、z-index</a></li>
<li><a href="https://www.w3ctrain.com/2015/12/15/smoother-animation/" rel="nofollow noreferrer" target="_blank">前端性能优化之更平滑的动画</a></li>
<li><a href="https://webdesign.tutsplus.com/zh-hans/articles/what-you-may-not-know-about-the-z-index-property--webdesign-16892" rel="nofollow noreferrer" target="_blank">关于z-index 那些你不知道的事</a></li>
<li><a href="https://www.w3cplus.com/css/understand-css-stacking-context-order-z-index.html" rel="nofollow noreferrer" target="_blank">聊聊CSS中的层叠相关概念</a></li>
</ol>
<p>推介阅读：</p>
<ol><li><a href="https://segmentfault.com/a/1190000013023485">CSS 中重要的BFC</a></li></ol>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS 中重要的层叠概念

## 原文链接
[https://segmentfault.com/a/1190000016489078](https://segmentfault.com/a/1190000016489078)

