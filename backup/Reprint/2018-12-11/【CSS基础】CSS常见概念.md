---
title: '【CSS基础】CSS常见概念' 
date: 2018-12-11 2:30:10
hidden: true
slug: bmmi3opopq
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">浏览器渲染过程</h2>
<p>不同的浏览器渲染过程实际上并不相同，但是依旧存在相一致的部分，大致过程如下所示：<br><span class="img-wrap"><img data-src="/img/bVHJfZ?w=624&amp;h=289" src="https://static.alili.tech/img/bVHJfZ?w=624&amp;h=289" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ol>
<li>浏览器解析HTML文档的源码，然后构造出一个DOM树，DOM树的构建过程是一个深度遍历的过程，当前节点的所有子节点都构建好以后才会去构建当前节点的下一个兄弟节点。</li>
<li>接下来，浏览器开始对CSS文件内容进行解析，一般来说，浏览器会先查找内联样式，然后是CSS文件中定义的样式，最后再是浏览器默认的样式，构建CSS Rule Tree。</li>
<li>接着根据CSS Rule Tree和DOM Tree构建出Render Tree，DOM树的节点并不是所有的都会放进Render Tree中，比如header标签、display:none的标签等。</li>
<li>构建出Render Tree后，浏览器已经能知道页面中有哪些节点、各节点的CSS样式以及它们的从属关系，从而去计算出每个节点在屏幕中的位置。最后按照计算出的位置，调用系统的API，把各节点绘制到屏幕上。</li>
</ol>
<p>上诉过程是逐步完成的，为了更好的用户体验，渲染引擎将会尽可能早的将内容呈现到屏幕上，并不会等到所有的html都解析完成之后再去构建和布局render树，而是解析完一部分就渲染一部分内容。</p>
<h3 id="articleHeader1">reflow和repaint</h3>
<p>回流(reflow)：如果改变了影响元素布局信息的CSS样式，比如width、height、left、top等，该元素的位置信息就会发生变化，也可能会导致整个页面其他元素的位置信息都发生变化，所以渲染引擎需要重新执行layout过程，重新计算每个元素的位置。reflow是在浏览器下一帧绘制的时候，进行重新布局，如果修改了元素的布局样式后，立马去获取offsetTop、scrollTop等属性，那么渲染引擎就会强制进行重新布局过程，以保证在JS中获取到正确的offsetTop、scrollTop等属性值。</p>
<p>重绘(repaint)：改变某个元素的背景色、文字颜色、边框颜色等等不影响它周围或内部布局的属性时，屏幕的一部分需要重绘，但是元素的几何尺寸不会变化。</p>
<p>display:none的标签不会被加入Render Tree，也不会触发reflow，visibility:hidden的标签会被加入到Render Tree，不会触发reflow，只会触发repaint。</p>
<h3 id="articleHeader2">减少reflow/repaint</h3>
<ol>
<li>如果需要频繁的修改DOM样式，尽量通过预先定义好的css的clsss，然后修改DOM的className。</li>
<li>不要把DOM节点的属性值放在一个循环里当成循环里的变量</li>
<li>为需要添加动画的HTML元素，添加上position:absolute/fixed属性值，这样修改该元素的css是不会引起reflow。</li>
<li>不要使用table布局，因为可能一个很小的改动就会引起整个table的重新布局。</li>
</ol>
<h2 id="articleHeader3">盒模型</h2>
<p>HTML文档中的每个元素在渲染的时候都会被描述成一个矩形盒子，而盒模型正是用来表示每个元素盒子所占用空间大小的模型，CSS盒模型分为W3C标准盒模型和IE盒模型，IE盒模型就是在IE6以下版本的怪异模式下的盒模型，IE6以及更高版本都遵循标准盒模型。在CSS中主要通过四个部分来描述，分别为margin、border、padding、content。一般来说，IE盒模型的宽高计算方式为：width/height = content + padding + border，W3C标准盒模型的宽高计算方式为：width/height = content。</p>
<p>W3C标准盒模型宽高的计算模式在对于非px为单位的宽高时，会带来非常大的计算困扰，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box {
    width:50%;
    border:1px solid #ccc;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.box</span> {
    <span class="hljs-attribute">width</span>:<span class="hljs-number">50%</span>;
    <span class="hljs-attribute">border</span>:<span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
}</code></pre>
<p>这个地方想要的肯定是50%，但是实际的大小趣事50% + 2px，这多出的2px就很让人无奈，于是为了不破坏这个50%的宽度，往往得再内嵌一层元素用来设置border，就成了下面这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box {
    width:50%;
}
.box .box-inner {
    border:1px solid #ccc;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.box</span> {
    <span class="hljs-attribute">width</span>:<span class="hljs-number">50%</span>;
}
<span class="hljs-selector-class">.box</span> <span class="hljs-selector-class">.box-inner</span> {
    <span class="hljs-attribute">border</span>:<span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
}</code></pre>
<p>这种解决方式显然不太科学，至少导致了HTML结构的臃肿，而box-sizing属性的出现就解决了这个问题，它就是用来改变元素宽高的计算方式。box-sizing属性有两个常用的取值content-box和border-box，如果值为content-box(默认)，则实际宽度为上面所说的计算方式：<code>实际宽高 = border + padding + width/height</code>。如为border-box则是另一种计算方式，其实际宽高就是设置的width/height。</p>
<p>浏览器选择哪个盒模型，主要是看浏览器处于标准模式还是怪异模式，在<code>&lt;DOCTYPE DTD=""&gt;</code>标签里有DTD声明，如果有DTD声明，浏览器处于标准模式，没有DTD声明，浏览器处于怪异模式，处于怪异模式的浏览器按照自身的解析方式去解析，IE6会选择IE盒模型，其他现代浏览器都会采用W3C标准盒模型。IE6以下版本的浏览器没有遵循W3C标准，无论页面有没有DTD声明，它都是按照IE盒模型解析代码。</p>
<h3 id="articleHeader4">margin属性</h3>
<p><code>margin:% | px</code>，margin的值如果为%，其是根据父元素的宽度来计算的，包括margin-top和margin-bottom，其值也是相对于父元素的宽度。并且内联元素的margin-top/bottom是不允许设置的。</p>
<h4>margin的合并</h4>
<ul>
<li>margin在水平方向上不会合并</li>
<li>margin在垂直方向会合并，其值为两者最大值</li>
<li>元素设置有margin-top、margin-bottom且为空内容，其margin上下也会重叠，其值为两者最大值</li>
<li>父元素如果没有padding、border等属性时，其子元素的margin上下方向会和父元素的margin进行重叠</li>
</ul>
<h4>margin设置负值</h4>
<ul>
<li>位于普通文档流中元素，负值相当于将元素向负值方向移动覆盖，但是只会覆盖颜色，不会覆盖文字。</li>
<li>对于position:relative元素，负值会完全覆盖前一个元素，会影响后面元素一起移动</li>
<li>对于position:absolute元素，元素脱离了普通文档流，对其他元素没有影响</li>
<li>对于float元素，可以通过负值进行覆盖，最常见的应用是三列布局。</li>
</ul>
<h3 id="articleHeader5">padding属性</h3>
<ul>
<li>值如果为%，也是根据父元素宽度来计算的</li>
<li>padding不存在合并的情况</li>
<li>padding也不存在负值情况</li>
</ul>
<h3 id="articleHeader6">Float属性</h3>
<ul>
<li>float元素会脱离正常文档流，然后向左或向右平移，一直平移到碰到容器边框或者另一个float元素</li>
<li>浮动元素会根据上一个元素的类型判断位置，如果上一个是float元素，则跟随他浮动，放置不下就挤到下一行展示</li>
<li>如果上一个是标准流元素，则浮动元素的相对垂直高度不变，顶部和上一个底部对齐</li>
</ul>
<h3 id="articleHeader7">清除浮动</h3>
<ul>
<li>父元素添加overflow:hidden，会隐藏子元素超出容器部分，且IE6不支持</li>
<li>浮动元素后面添加clear:both，会添加额外的无意义的标签</li>
<li>父元素变成float元素</li>
<li>使用伪类:after，代码如下：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wrap:after {
    content:' ',
    display:block;
    height:0;
    clear:both;
}
.wrap {
    zoom:1;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.wrap</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">content</span>:<span class="hljs-string">' '</span>,
    display:block;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">clear</span>:both;
}
<span class="hljs-selector-class">.wrap</span> {
    <span class="hljs-attribute">zoom</span>:<span class="hljs-number">1</span>;
}</code></pre>
<p>content是在父容器的后面添加一个空白字符，height:0是让这个空白字符不显示出来，display:block;clear:both是确保这个空白字符是非浮动的独立区块。zoom:1是IE6独有的属性，作用是激活父元素的hasLayout属性，让父元素拥有自己的布局，其他浏览器会直接忽略该属性。</p>
<h2 id="articleHeader8">BFC原理</h2>
<p>BFC即块级格式化上下文，它属于普通文档流，具有BFC特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且BFC具有普通容器所没有的一些特性。通俗来说，可以把BFC理解为一个封闭的大箱子，箱子内部的元素无论如何翻江倒海都不会影响到外部。</p>
<h3 id="articleHeader9">触发BFC的条件</h3>
<p>只要元素满足下面任一条件即可触发BFC特性：</p>
<ul>
<li>body根元素</li>
<li>浮动元素：float除none以外的值</li>
<li>绝对定位元素：position(absolute、fixed)</li>
<li>display为line-block、table-ceils、flex</li>
<li>overflow除了visible以外的值(hidden、scroll、auto)</li>
</ul>
<h3 id="articleHeader10">BFC特性以及应用</h3>
<ul>
<li>不同的BFC容器下边距不会发生重叠</li>
<li>BFC可以包含浮动元素(清除浮动)</li>
<li>BFC可以阻止元素被浮动元素覆盖，可以用来实现两列自适应布局。</li>
</ul>
<h2 id="articleHeader11">层叠水平</h2>
<p>一个DOM元素，在不考虑层叠上下文的情况下，会按照层叠水平决定元素在Z轴上的显示顺序，通俗来讲，不同的DOM元素组合在一起发生层叠的时候，它们的显示顺序会遵循层叠水平的规则，而z-index是用来调整某个元素显示顺序。</p>
<h3 id="articleHeader12">7阶层叠水平</h3>
<p><span class="img-wrap"><img data-src="/img/bV5gmX?w=720&amp;h=511" src="https://static.alili.tech/img/bV5gmX?w=720&amp;h=511" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>如果两个元素层叠水平相同的时候，这个时候就要遵循下面两个准则：<br> 1 后来居上原则<br> 2 谁z-index大，谁在上原则<br>一个页面中往往不止一个层叠上下文，在同一个层叠上下文中按照层叠水平的规则来堆叠元素，正常情况下，一共有三种大的类型创建层叠上下文：<br> 1 默认创建层叠上下文，HTML根元素属于根层叠上下文元素<br> 2 需要配合z-index触发创建层叠上下文<br> 3 不需要配合z-index触发创建层叠上下文</p>
<h3 id="articleHeader13">需要z-index创建层叠上下文</h3>
<p>1 含有position属性的元素<br> 2 flex项（父元素diaplay为flex|inline-flex）注意是子元素，不是父元素创建层叠上下文<br>这两种情况下，需要设置具体的z-index值，不能设置z-index为auto，这也就是z-index:auto和z-index:0的一点细微差别</p>
<h3 id="articleHeader14">不需要z-index创建层叠上下文</h3>
<p>这种情况下，基本上都是由CSS3中新增的属性来触发的，常见的有：</p>
<ul>
<li>元素的opacity &lt; 1</li>
<li>元素的以下属性不为none：transform，filter，mask等等</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【CSS基础】CSS常见概念

## 原文链接
[https://segmentfault.com/a/1190000013609470](https://segmentfault.com/a/1190000013609470)

