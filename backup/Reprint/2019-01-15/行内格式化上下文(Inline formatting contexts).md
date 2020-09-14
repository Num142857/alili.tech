---
title: '行内格式化上下文(Inline formatting contexts)' 
date: 2019-01-15 2:30:12
hidden: true
slug: o0yy14ekalt
categories: [reprint]
---

{{< raw >}}

                    
<h4>IFC布局规则:</h4>
<ul>
<li><p>在一个行内格式化上下文中，盒是一个接一个<strong>水平</strong>放置的，从包含块的顶部开始</p></li>
<li><p>这些盒之间的<strong>水平</strong><code>margin</code>，<code>border</code>和<code>padding</code>都有效</p></li>
<li><p>盒可能以不同的方式竖直对齐：以它们的底部或者顶部对齐，或者以它们里面的文本的基线对齐</p></li>
</ul>
<h4>行盒(line box)</h4>
<ul>
<li><p>包含来自同一行的盒的矩形区域叫做<strong>行盒(line box)</strong></p></li>
<li><p><code>line box</code>的宽度由<strong>包含块</strong>和<code>float</code>情况决定,一般来说,<code>line box</code>的宽度等于包含块两边之间的宽度,然而<code>float</code>可以插入到包含块和行盒边之间,如果有<code>float</code>,那么<code>line box</code>的宽度会比没有<code>float</code>时小</p></li>
<li><p><code>line box</code>的高度由<code>line-height</code>决定,而<code>line box</code>之间的高度各不相同(比如只含文本的<code>line box</code>高度与包含图片的<code>line box</code>高度之间)</p></li>
<li><p><code>line box</code>的高度能够容纳它包含的所有盒,当盒的高度小于行盒的高度(例如,如果盒是<code>baseline</code>对齐)时,盒的竖直对齐方式由<code>vertical-align</code>属性决定</p></li>
<li><p>当一行的行内级盒的总宽度小于它们所在的<code>line box</code>的宽度时，它们在行盒里的水平分布由<code>text-align</code>属性决定。如果该属性值为<code>justify</code>，用户代理可能会拉伸行内盒（不包括<code>inline-table</code>和<code>inline-block</code>盒）里的空白和字（间距）</p></li>
</ul>
<p><a href="https://codepen.io/rcjydds/pen/mmWWXx" rel="nofollow noreferrer" target="_blank">line box与float，vertical-align，text-align</a><button class="btn btn-xs btn-default ml10 preview" data-url="rcjydds/pen/mmWWXx" data-typeid="3">点击预览</button></p>
<h4>行内盒(inline box)</h4>
<ul>
<li><p>一个<code>inline box</code>是一个（特殊的）行内级盒，其内容参与了它的包含行内格式化上下文</p></li>
<li><p>当一个<code>inline box</code>超出一个<code>line box</code>的宽度时，它会被分成几个盒，并且这些盒会跨多<code>line box</code>分布。如果一个<code>inline-block</code>无法分割（例如，如果该<code>inline box</code>含有一个单个字符，或者特定语言的单词分隔规则不允许在该<code>inline box</code>里分隔，或如果该<code>inline box</code>受到了一个值为<code>nowrap</code>或者<code>pre</code>的<code>white-space</code>的影响），那么该<code>inline box</code>会从<code>line box</code>溢出</p></li>
<li><p>当一个<code>inline box</code>被分割后，<code>margin</code>，<code>border</code>和<code>padding</code>在发生分割的地方（或者在任何分割处，如果有多处的话）不会有可视化效果</p></li>
<li><p>同一个<code>line box</code>里的<code>inline box</code>也可能因为双向（bidirectional）文本处理而被分割成几个盒</p></li>
</ul>
<p>需要盛放（hold）一个行内格式化上下文中的行内级内容时，创建一个<code>line box</code>。不含文本、保留空白符（preserved white space）、<code>margin</code>，<code>padding</code>或者<code>border</code>非0的行内元素、其它流内内容（例如，图片，<code>inline block</code>或者<code>inline table</code>），并且不以保留换行符（preserved newline）结束的<code>line box</code>必须被当作一个0高度的<code>line box</code>，为了确定它里面所有元素的位置，而其它时候（for any other purpose）必须当它不存在</p>
<p><a href="https://codepen.io/rcjydds/pen/dWvWMK" rel="nofollow noreferrer" target="_blank">inline box与断行，溢出</a><button class="btn btn-xs btn-default ml10 preview" data-url="rcjydds/pen/dWvWMK" data-typeid="3">点击预览</button></p>
<h3 id="articleHeader0">行高(line-height)</h3>
<p><span class="img-wrap"><img data-src="/img/bVM49H?w=600&amp;h=360" src="https://static.alili.tech/img/bVM49H?w=600&amp;h=360" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVM49X?w=600&amp;h=264" src="https://static.alili.tech/img/bVM49X?w=600&amp;h=264" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>如图,我们就知道了,在CSS中,<code>line-height</code>不是相邻文本行间上一个<code>baseline</code>与下一文本行<code>baseline</code>之间的距离,而是<code>line box</code>的高度,也就是相邻文本行间底线的距离</p>
<p><a href="http://iamvdo.me/en/blog/css-font-metrics-line-height-and-vertical-align" rel="nofollow noreferrer" target="_blank">原文链接:Deep dive CSS: font metrics, line-height and vertical-align</a></p>
<p><a href="https://codepen.io/rcjydds/pen/LyjMGa" rel="nofollow noreferrer" target="_blank">line-height与可替换元素,非替换元素以及vertical-align</a><button class="btn btn-xs btn-default ml10 preview" data-url="rcjydds/pen/LyjMGa" data-typeid="3">点击预览</button></p>
<p>在例1中,决定<code>line box</code>高度的是<code>line-height</code>值,但是实际上是<code>content area</code>以及<code>vertical spacing</code>决定的,<code>line-height</code>=<code>content area</code>+<code>vertical spacing</code></p>
<p>需要注意的是,<code>content area</code>不等于<code>font-size</code>,只有在<code>simsun(宋体)</code>下,两者相等</p>
<p>通过上面几个例子,可以得出以下结论:</p>
<ul>
<li><p>计算<code>line box</code>中每个行内级盒的高度时,对于可替换元素,<code>inline-block</code>元素和<code>inline-table</code>元素,这个值就是其<code>margin box</code>的高度;对于<code>inline box</code>,这个值是其<code>line-height</code></p></li>
<li><p>行内级盒是根据其<code>vertical-align</code>属性竖直对齐的.如果它们是<code>top</code>或者<code>bottom</code>对齐,它们必须对齐得让<code>line box</code>高度最小化.如果这样的盒足够高,存在多个解,而CSS 2.1没有定义<code>line box</code>基线的位置</p></li>
<li><p><code>line box</code>高度是最高的盒的<code>top</code>与最低的盒的<code>bottom</code>之间的距离</p></li>
</ul>
<blockquote><p>空行内元素生成空的<code>inline box</code>,这些盒仍然具有<code>margin</code>,<code>padding</code>,<code>border</code>和<code>line height</code>,并因此会影响这些计算,就像有内容的元素一样</p></blockquote>
<h4>行高的属性值</h4>
<table>
<thead><tr>
<th align="center">值</th>
<th align="center">描述</th>
</tr></thead>
<tbody>
<tr>
<td align="center">normal</td>
<td align="center">默认属性值.跟着用户的浏览器走,且与font-size关联,一般来说normal值接近于line-height:1.2</td>
</tr>
<tr>
<td align="center">number</td>
<td align="center">根据当前元素的font-size大小计算</td>
</tr>
<tr>
<td align="center">length</td>
<td align="center">使用具体长度值作为行高值</td>
</tr>
<tr>
<td align="center">%</td>
<td align="center">使用百分比值作为行高值,相对于设置了该line-height属性的元素的font-size大小计算</td>
</tr>
<tr>
<td align="center">inherit</td>
<td align="center">行高继承.IE8+</td>
</tr>
</tbody>
</table>
<p><a href="https://codepen.io/rcjydds/pen/wdrgdL" rel="nofollow noreferrer" target="_blank">line-height与百分比值</a><button class="btn btn-xs btn-default ml10 preview" data-url="rcjydds/pen/wdrgdL" data-typeid="3">点击预览</button></p>
<p>在百分比行高值中,继承的不是<code>line-height:150%</code>,而是<code>font-size:16px</code>与<code>line-height:150%</code>的行高值24px;</p>
<p><a href="https://codepen.io/rcjydds/pen/YVrNaJ" rel="nofollow noreferrer" target="_blank">line-height与number值</a><button class="btn btn-xs btn-default ml10 preview" data-url="rcjydds/pen/YVrNaJ" data-typeid="3">点击预览</button></p>
<p>在number行高值中,<code>line-height</code>会根据当前元素的<code>font-size</code>大小进行计算,可以实现相应的比例缩放,所以一般建议使用number值</p>
<p><a href="http://www.cnblogs.com/fengzheng126/archive/2012/05/18/2507632.html" rel="nofollow noreferrer" target="_blank">行高的属性值相关参考</a></p>
<h4>行高与图片</h4>
<p><a href="https://codepen.io/rcjydds/pen/VbMpwR" rel="nofollow noreferrer" target="_blank">行高与图片</a><button class="btn btn-xs btn-default ml10 preview" data-url="rcjydds/pen/VbMpwR" data-typeid="3">点击预览</button></p>
<p>在例1中,我们知道了图片是基于<code>baseline</code>对齐的,所以行高影响的是文本的高度,而不是图片的高度<br>在例2中,我们放置了单张图片,在父容器使用<code>text-align:center</code>,图片受到影响,原因是<code>strut</code></p>
<blockquote><p>对于一个内容由内联级元素组成的块容器元素，'line-height'指定了元素内行盒的最小高度。这个最小高度包含基线上方的最小高度和下方的最小深度，就像每个行盒以一个具有该元素的字体和行高属性的0宽内联盒开始。我们把这种假想盒叫做"strut"（这个名字是受TeX的启发）</p></blockquote>
<p>后面的几个例子是图片去除缝隙的解决方案,分别是:</p>
<ul>
<li><p>图片<code>display:block</code></p></li>
<li><p>图片<code>vertical-align:bottom</code></p></li>
<li><p>父元素设置<code>line-height:0</code> 原因是当<code>line-height:0</code>时,行盒的基线会上移</p></li>
</ul>
<h4>行高的实际应用</h4>
<p><a href="https://codepen.io/rcjydds/pen/vmexgB" rel="nofollow noreferrer" target="_blank">实现多行文本水平垂直居中</a><button class="btn btn-xs btn-default ml10 preview" data-url="rcjydds/pen/vmexgB" data-typeid="3">点击预览</button></p>
<h3 id="articleHeader1">vertical-align</h3>
<blockquote><p>该属性会影响由一个行内级元素生成的盒的行盒内部的竖直定位</p></blockquote>
<p>默认情况下,<code>inline</code>,<code>inline-block</code>以及<code>table-cell</code>可以应用<code>vertical-align</code></p>
<table>
<thead><tr>
<th align="center">值</th>
<th align="center">描述</th>
</tr></thead>
<tbody>
<tr>
<td align="center">length</td>
<td align="center">把该盒提升（正值）或者降低（负值）这个距离。值'0cm'表示与“基线”相同</td>
</tr>
<tr>
<td align="center">%</td>
<td align="center">把该盒提升（正值）或者降低（负值）这个距离（'line-height'值的百分比）。值'0%'表示与“基线”相同</td>
</tr>
<tr>
<td align="center">top</td>
<td align="center">
<code>inline/inline-block</code>元素:元素顶部和整行的顶部对齐,<code>table-cell</code>元素:单元格顶部<code>padding</code>边缘和表格行的顶部对齐</td>
</tr>
<tr>
<td align="center">bottom</td>
<td align="center">
<code>inline/inline-block</code>元素:元素底部和整行的底部对齐, <code>table-cell</code>元素:单元格底部<code>padding</code>边缘和表格行的底部对齐</td>
</tr>
<tr>
<td align="center">baseline</td>
<td align="center">把盒的基线与父级盒的基线对齐。如果该盒没有基线，就把bottom margin边和父级的基线对齐</td>
</tr>
<tr>
<td align="center">middle</td>
<td align="center">把该盒的竖直中点和父级盒的基线加上父级的1/2x-height对齐</td>
</tr>
<tr>
<td align="center">text-top</td>
<td align="center">把该盒的top和父级的内容区（content area）的top对齐</td>
</tr>
<tr>
<td align="center">text-bottom</td>
<td align="center">把该盒的bottom和父级的内容区（content area）的bottom对齐</td>
</tr>
<tr>
<td align="center">sub</td>
<td align="center">把该盒的基线降低到合适的位置作为父级盒的下标（该值不影响该元素文本的字体大小）</td>
</tr>
<tr>
<td align="center">super</td>
<td align="center">把该盒的基线提升到合适的位置作为父级盒的上标（该值不影响该元素文本的字体大小）</td>
</tr>
</tbody>
</table>
<p>在数值/百分比值中,<code>vertical-align</code>可以用负值,而且百分比值提升或降低对应的是<code>line-height</code>值</p>
<p>去除图片空隙的方法除了上面的几个之外,还包括:</p>
<ul>
<li><p>图片<code>vertical-align:top</code>,<code>vertical-align:middle</code></p></li>
<li><p><code>line-height</code>为number时,<code>font-size:0</code></p></li>
</ul>
<p>在<code>table-cell</code>中,高度不足会使用<code>padding</code>填充</p>
<p><a href="https://codepen.io/rcjydds/pen/gWGXqN" rel="nofollow noreferrer" target="_blank">vertical-align:middle与垂直居中</a><button class="btn btn-xs btn-default ml10 preview" data-url="rcjydds/pen/gWGXqN" data-typeid="3">点击预览</button></p>
<p>这个例子用到的也是父元素<code>font-size:0</code>,图片垂直中心点会上移,并与容器垂直中心点重合,但是这种方法有缺陷,因为如果后面需要插入问题的时候,不会显示出来</p>
<p><a href="https://codepen.io/rcjydds/pen/GmMQbd" rel="nofollow noreferrer" target="_blank">vertical-align:middle与垂直居中修改版</a><button class="btn btn-xs btn-default ml10 preview" data-url="rcjydds/pen/GmMQbd" data-typeid="3">点击预览</button></p>
<p>这里,我们在图片后面插入了一个空<code>span</code>并且设置为<code>vertical-align:middle</code>,两者都往下偏移,然后垂直中心点重合</p>
<p><a href="https://codepen.io/rcjydds/pen/xdXYpw" rel="nofollow noreferrer" target="_blank">vertical-align:text-bottom与表情图片文字对齐</a><button class="btn btn-xs btn-default ml10 preview" data-url="rcjydds/pen/xdXYpw" data-typeid="3">点击预览</button></p>
<p>例1中,<code>baseline</code>对齐表情会略微高过文字<br>例2中,<code>bottom</code>对齐容易受到其它行内元素影响,比方说插入一张<code>vertical-align:top</code>的图片<br>例3中,<code>middle</code>需要注意图片的大小,图片过大,图片会相对于文字下沉,而且在IE6/7中有兼容性问题<br>例4中,<code>text-bottom</code>是比较合适的用法,因为它不受行高和其它行内元素影响</p>
<p><a href="https://codepen.io/rcjydds/pen/BRwxOp" rel="nofollow noreferrer" target="_blank">vertical-align:text-bottom与baseline</a><button class="btn btn-xs btn-default ml10 preview" data-url="rcjydds/pen/BRwxOp" data-typeid="3">点击预览</button></p>
<p>在例1中,图片下面有个很大的空白区,它的原因是图片和X与父级的<code>content area</code>底部对齐,而<code>line-height:250px;</code>底部的空白区是X的下边距</p>
<p>在例2中,图片和X都<code>vertical-align:top</code>,也就是与父级的<code>content area</code>顶部对齐,这时,图片后面的普通文本是<code>line-height:250px</code>的文本,图片下方的空白相当于文本的下边距</p>
<h4>vertical-align与line-height</h4>
<p><a href="https://codepen.io/rcjydds/pen/MmEoJK" rel="nofollow noreferrer" target="_blank">任意数目图片两端对齐效果未完成</a><button class="btn btn-xs btn-default ml10 preview" data-url="rcjydds/pen/MmEoJK" data-typeid="3">点击预览</button></p>
<p>在上面的例子中,最后一行图片的的空隙明显要比图片默认情况下的空隙大,这是为什么呢,我们先看一个例子</p>
<p><a href="https://codepen.io/rcjydds/pen/BRwdZz" rel="nofollow noreferrer" target="_blank">解释空隙大的例子</a><button class="btn btn-xs btn-default ml10 preview" data-url="rcjydds/pen/BRwdZz" data-typeid="3">点击预览</button></p>
<p>在例1中,我们定义了一个空的<code>inline-block</code>盒以及一个带字符的<code>inline-block</code>盒,第一个盒子的底边缘和第二个盒子的<code>baseline</code>对齐,也就是说,空<code>inline-block</code>盒子的底边缘是它的基线</p>
<p>在例2中,我们设置了<code>line-height:0</code>,此时,一个0高度的<code>inline-block</code>有一个有高度的字符,所以它的半间距等于负的字符/2,也就是<code>inline-block</code>会下沉1/2个字符,盒子的上边缘在字符的中心点上</p>
<p>在CSS标准中是这样写的:</p>
<blockquote><p>'inline-block'（盒）的基线是它的最后一个常规流中的行盒的基线，除非它没有流内行盒或者它的'overflow'属性的计算值不为'visible'，此时基线是bottom margin边</p></blockquote>
<p>所以,空隙过大的原因是,图片是<code>baseline</code>对齐的,而<code>line-height:0</code>时,字符X会下沉1/2,这里多出来的空隙是1/2<code>baseline</code>的高度</p>
<p>修复的方法:</p>
<ul>
<li><p>父容器<code>line-height:0</code>,最后一个空<code>inline-block</code>插入一个字符,这时空隙就会消失</p></li>
<li><p>元素<code>vertical-top</code></p></li>
<li><p>元素<code>vertical-bottom</code></p></li>
</ul>
<p><a href="https://codepen.io/rcjydds/pen/MmEEWz" rel="nofollow noreferrer" target="_blank">任意数目图片两端对齐效果</a><button class="btn btn-xs btn-default ml10 preview" data-url="rcjydds/pen/MmEEWz" data-typeid="3">点击预览</button></p>
<p>需要注意的是,如果空<code>inline-block</code>元素使用<code>vertical-align:bottom</code>时,是元素底部与整个行盒底部对齐,也就是说要保证每个单独的元素都设置<code>vertical-align:bottom</code></p>
<h4>vertical-align与IE6/7</h4>
<p>在IE6/7下使用<code>vertical-align</code>图文一体化,图片上下留白相等,而现代浏览器则不一样</p>
<p>解决办法:在图片后面的文字<code>inline-block</code>化</p>
<h4>vertical-align实例</h4>
<p><a href="https://codepen.io/rcjydds/pen/KmXeeJ" rel="nofollow noreferrer" target="_blank">不固定尺寸图片或多行文字垂直居中</a><button class="btn btn-xs btn-default ml10 preview" data-url="rcjydds/pen/KmXeeJ" data-typeid="3">点击预览</button></p>
<ol>
<li><p>主体元素<code>inline-block</code>化</p></li>
<li><p>添加一个宽度0高度100%的辅助元素</p></li>
<li><p>给这两个元素<code>vertical-align:middle</code></p></li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
行内格式化上下文(Inline formatting contexts)

## 原文链接
[https://segmentfault.com/a/1190000009308818](https://segmentfault.com/a/1190000009308818)

