---
title: '50道CSS基础面试题（附答案）' 
date: 2018-12-13 2:30:07
hidden: true
slug: xqju9u1ged
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>1 介绍一下标准的CSS的盒子模型？与低版本IE的盒子模型有什么不同的？</strong></p>
<p>标准盒子模型：宽度=内容的宽度（content）+ border + padding + margin<br>低版本IE盒子模型：宽度=内容宽度（content+border+padding）+ margin</p>
<p><strong>2 box-sizing属性？</strong></p>
<p>用来控制元素的盒子模型的解析模式，默认为content-box<br>context-box：W3C的标准盒子模型，设置元素的 height/width 属性指的是content部分的高/宽<br>border-box：IE传统盒子模型。设置元素的height/width属性指的是border + padding + content部分的高/宽</p>
<p><strong>3 CSS选择器有哪些？哪些属性可以继承？</strong></p>
<p>CSS选择符：id选择器(#myid)、类选择器(.myclassname)、标签选择器(div, h1, p)、相邻选择器(h1 + p)、子选择器（ul &gt; li）、后代选择器（li a）、通配符选择器（*）、属性选择器（a[rel="external"]）、伪类选择器（a:hover, li:nth-child）</p>
<p>可继承的属性：font-size, font-family, color</p>
<p>不可继承的样式：border, padding, margin, width, height</p>
<p>优先级（就近原则）：!important &gt; [ id &gt; class &gt; tag ] <br>!important 比内联优先级高</p>
<p><strong>4 CSS优先级算法如何计算？</strong></p>
<p>元素选择符： 1<br>class选择符： 10<br>id选择符：100<br>元素标签：1000</p>
<ol>
<li>!important声明的样式优先级最高，如果冲突再进行计算。</li>
<li>如果优先级相同，则选择最后出现的样式。</li>
<li>继承得到的样式的优先级最低。</li>
</ol>
<p><strong>5 CSS3新增伪类有那些?</strong></p>
<p>p:first-of-type 选择属于其父元素的首个元素<br>p:last-of-type 选择属于其父元素的最后元素<br>p:only-of-type 选择属于其父元素唯一的元素<br>p:only-child 选择属于其父元素的唯一子元素<br>p:nth-child(2) 选择属于其父元素的第二个子元素<br>:enabled :disabled 表单控件的禁用状态。<br>:checked 单选框或复选框被选中。</p>
<p><strong>6 如何居中div？如何居中一个浮动元素？如何让绝对定位的div居中？</strong></p>
<p>div：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="border: 1px solid red;
margin: 0 auto; 
height: 50px;
width: 80px;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid red;
<span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto; 
<span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;
<span class="hljs-attribute">width</span>: <span class="hljs-number">80px</span>;
</code></pre>
<p>浮动元素的上下左右居中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="border: 1px solid red;
float: left;
position: absolute;
width: 200px;
height: 100px;
left: 50%;
top: 50%;
margin: -50px 0 0 -100px; 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid red;
<span class="hljs-attribute">float</span>: left;
<span class="hljs-attribute">position</span>: absolute;
<span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
<span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
<span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
<span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
<span class="hljs-attribute">margin</span>: -<span class="hljs-number">50px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> -<span class="hljs-number">100px</span>; 
</code></pre>
<p>绝对定位的左右居中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="border: 1px solid black;
position: absolute;
width: 200px;
height: 100px;
margin: 0 auto;
left: 0;
right: 0; 

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid black;
<span class="hljs-attribute">position</span>: absolute;
<span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
<span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
<span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
<span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
<span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>; 

</code></pre>
<p>还有更加优雅的居中方式就是用flexbox，我以后会做整理。</p>
<p><strong>7 display有哪些值？说明他们的作用?</strong></p>
<p>inline（默认）--内联<br>none--隐藏<br>block--块显示<br>table--表格显示<br>list-item--项目列表<br>inline-block</p>
<p><strong>8 position的值？</strong></p>
<p>static（默认）：按照正常文档流进行排列；<br>relative（相对定位）：不脱离文档流，参考自身静态位置通过 top, bottom, left, right 定位；<br>absolute(绝对定位)：参考距其最近一个不为static的父级元素通过top, bottom, left, right 定位；<br>fixed(固定定位)：所固定的参照对像是可视窗口。</p>
<p><strong>9 CSS3有哪些新特性？</strong></p>
<ol>
<li>RGBA和透明度</li>
<li>background-image background-origin(content-box/padding-box/border-box) background-size background-repeat</li>
<li>word-wrap（对长的不可分割单词换行）word-wrap：break-word</li>
<li>文字阴影：text-shadow： 5px 5px 5px #FF0000;（水平阴影，垂直阴影，模糊距离，阴影颜色）</li>
<li>font-face属性：定义自己的字体</li>
<li>圆角（边框半径）：border-radius 属性用于创建圆角</li>
<li>边框图片：border-image: url(border.png) 30 30 round</li>
<li>盒阴影：box-shadow: 10px 10px 5px #888888</li>
<li>媒体查询：定义两套css，当浏览器的尺寸变化时会采用不同的属性</li>
</ol>
<p><strong>10 请解释一下CSS3的flexbox（弹性盒布局模型）,以及适用场景？</strong></p>
<p>该布局模型的目的是提供一种更加高效的方式来对容器中的条目进行布局、对齐和分配空间。在传统的布局方式中，block 布局是把块在垂直方向从上到下依次排列的；而 inline 布局则是在水平方向来排列。弹性盒布局并没有这样内在的方向限制，可以由开发人员自由操作。<br>试用场景：弹性布局适合于移动前端开发，在Android和ios上也完美支持。</p>
<p><strong>11 用纯CSS创建一个三角形的原理是什么？</strong></p>
<p>首先，需要把元素的宽度、高度设为0。然后设置边框样式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="width: 0;
height: 0;
border-top: 40px solid transparent;
border-left: 40px solid transparent;
border-right: 40px solid transparent;
border-bottom: 40px solid #ff0000;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">width</span>: <span class="hljs-number">0</span>;
<span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
<span class="hljs-attribute">border-top</span>: <span class="hljs-number">40px</span> solid transparent;
<span class="hljs-attribute">border-left</span>: <span class="hljs-number">40px</span> solid transparent;
<span class="hljs-attribute">border-right</span>: <span class="hljs-number">40px</span> solid transparent;
<span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">40px</span> solid <span class="hljs-number">#ff0000</span>;
</code></pre>
<p><strong>12 一个满屏品字布局如何设计?</strong></p>
<p>第一种真正的品字：</p>
<ol>
<li>三块高宽是确定的；</li>
<li>上面那块用margin: 0 auto;居中；</li>
<li>下面两块用float或者inline-block不换行；</li>
<li>用margin调整位置使他们居中。</li>
</ol>
<p>第二种全屏的品字布局:<br>上面的div设置成100%，下面的div分别宽50%，然后使用float或者inline使其不换行。</p>
<p><strong>13 常见的兼容性问题？</strong></p>
<ol>
<li>不同浏览器的标签默认的margin和padding不一样。<p>*{margin:0;padding:0;}</p>
</li>
<li>IE6双边距bug：块属性标签float后，又有横行的margin情况下，在IE6显示margin比设置的大。hack：display:inline;将其转化为行内属性。</li>
<li>
<p>渐进识别的方式，从总体中逐渐排除局部。首先，巧妙的使用“9”这一标记，将IE浏览器从所有情况中分离出来。接着，再次使用“+”将IE8和IE7、IE6分离开来，这样IE8已经独立识别。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
background-color:#f1ee18;/*所有识别*/
.background-color:#00deff\9; /*IE6、7、8识别*/
+background-color:#a200ff;/*IE6、7识别*/
_background-color:#1e0bd1;/*IE6识别*/
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>{
<span class="hljs-attribute">background-color</span>:<span class="hljs-number">#f1ee18</span>;<span class="hljs-comment">/*所有识别*/</span>
<span class="hljs-selector-class">.background-color</span>:<span class="hljs-number">#00deff</span>\<span class="hljs-number">9</span>; <span class="hljs-comment">/*IE6、7、8识别*/</span>
+<span class="hljs-attribute">background-color</span>:<span class="hljs-number">#a200ff</span>;<span class="hljs-comment">/*IE6、7识别*/</span>
_background-<span class="hljs-attribute">color</span>:<span class="hljs-number">#1e0bd1</span>;<span class="hljs-comment">/*IE6识别*/</span>
}
</code></pre>
</li>
<li>设置较小高度标签（一般小于10px），在IE6，IE7中高度超出自己设置高度。hack：给超出高度的标签设置overflow:hidden;或者设置行高line-height 小于你设置的高度。</li>
<li>IE下，可以使用获取常规属性的方法来获取自定义属性,也可以使用getAttribute()获取自定义属性；Firefox下，只能使用getAttribute()获取自定义属性。解决方法:统一通过getAttribute()获取自定义属性。</li>
<li>Chrome 中文界面下默认会将小于 12px 的文本强制按照 12px 显示,可通过加入 CSS 属性 -webkit-text-size-adjust: none; 解决。</li>
<li>超链接访问过后hover样式就不出现了，被点击访问过的超链接样式不再具有hover和active了。解决方法是改变CSS属性的排列顺序:L-V-H-A ( love hate ):  a:link {} a:visited {} a:hover {} a:active {}</li>
</ol>
<p><strong>14 为什么要初始化CSS样式</strong></p>
<p>因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对CSS初始化往往会出现浏览器之间的页面显示差异。 </p>
<p><strong>15 absolute的containing block计算方式跟正常流有什么不同？</strong></p>
<p>无论属于哪种，都要先找到其祖先元素中最近的 position 值不为 static 的元素，然后再判断：</p>
<ol>
<li>若此元素为 inline 元素，则 containing block 为能够包含这个元素生成的第一个和最后一个 inline box 的 padding box (除 margin, border 外的区域) 的最小矩形；</li>
<li>否则,则由这个祖先元素的 padding box 构成。</li>
</ol>
<p>如果都找不到，则为 initial containing block。</p>
<p>补充：</p>
<ol>
<li>static(默认的)/relative：简单说就是它的父元素的内容框（即去掉padding的部分）</li>
<li>absolute: 向上找最近的定位为absolute/relative的元素</li>
<li>fixed: 它的containing block一律为根元素(html/body)</li>
</ol>
<p><strong>16 CSS里的visibility属性有个collapse属性值？在不同浏览器下以后什么区别？</strong></p>
<p>当一个元素的visibility属性被设置成collapse值后，对于一般的元素，它的表现跟hidden是一样的。</p>
<ol>
<li>chrome中，使用collapse值和使用hidden没有区别。</li>
<li>firefox，opera和IE，使用collapse值和使用display：none没有什么区别。</li>
</ol>
<p><strong>17 display:none与visibility：hidden的区别？</strong></p>
<p>display：none 不显示对应的元素，在文档布局中不再分配空间（回流+重绘）<br>visibility：hidden 隐藏对应元素，在文档布局中仍保留原来的空间（重绘）</p>
<p><strong>18 position跟display、overflow、float这些特性相互叠加后会怎么样？</strong></p>
<p>display属性规定元素应该生成的框的类型；position属性规定元素的定位类型；float属性是一种布局方式，定义元素在哪个方向浮动。<br>类似于优先级机制：position：absolute/fixed优先级最高，有他们在时，float不起作用，display值需要调整。float 或者absolute定位的元素，只能是块元素或表格。</p>
<p><strong>19 对BFC规范(块级格式化上下文：block formatting context)的理解？</strong></p>
<p>BFC规定了内部的Block Box如何布局。<br>定位方案：</p>
<ol>
<li>内部的Box会在垂直方向上一个接一个放置。</li>
<li>Box垂直方向的距离由margin决定，属于同一个BFC的两个相邻Box的margin会发生重叠。</li>
<li>每个元素的margin box 的左边，与包含块border box的左边相接触。</li>
<li>BFC的区域不会与float box重叠。</li>
<li>BFC是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素。</li>
<li>计算BFC的高度时，浮动元素也会参与计算。</li>
</ol>
<p>满足下列条件之一就可触发BFC</p>
<ol>
<li>根元素，即html</li>
<li>float的值不为none（默认）</li>
<li>overflow的值不为visible（默认）</li>
<li>display的值为inline-block、table-cell、table-caption</li>
<li>position的值为absolute或fixed</li>
</ol>
<p><strong>20 为什么会出现浮动和什么时候需要清除浮动？清除浮动的方式？</strong></p>
<p>浮动元素碰到包含它的边框或者浮动元素的边框停留。由于浮动元素不在文档流中，所以文档流的块框表现得就像浮动框不存在一样。浮动元素会漂浮在文档流的块框上。<br>浮动带来的问题：</p>
<ol>
<li>父元素的高度无法被撑开，影响与父元素同级的元素</li>
<li>与浮动元素同级的非浮动元素（内联元素）会跟随其后</li>
<li>若非第一个元素浮动，则该元素之前的元素也需要浮动，否则会影响页面显示的结构。</li>
</ol>
<p>清除浮动的方式：</p>
<ol>
<li>父级div定义height</li>
<li>最后一个浮动元素后加空div标签 并添加样式clear:both。</li>
<li>包含浮动元素的父标签添加样式overflow为hidden或auto。</li>
<li>父级div定义zoom</li>
</ol>
<p><strong>21 上下margin重合的问题</strong></p>
<p>在重合元素外包裹一层容器，并触发该容器生成一个BFC。<br>例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;aside&quot;></div>
<div class=&quot;text&quot;>
    <div class=&quot;main&quot;></div>
</div>
<!--下面是css代码-->
 .aside {
            margin-bottom: 100px;  
            width: 100px;
            height: 150px;
            background: #f66;
        }
        .main {
            margin-top: 100px;
            height: 200px;
            background: #fcc;
        }
         .text{
            /*盒子main的外面包一个div，通过改变此div的属性使两个盒子分属于两个不同的BFC，以此来阻止margin重叠*/
            overflow: hidden;  //此时已经触发了BFC属性。
        }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"aside"</span>&gt;&lt;/div&gt;
&lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"text"</span>&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"main"</span>&gt;&lt;/div&gt;
&lt;/div&gt;
&lt;!--下面是css代码--&gt;
 <span class="hljs-selector-class">.aside</span> {
            <span class="hljs-attribute">margin-bottom</span>: <span class="hljs-number">100px</span>;  
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">150px</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#f66</span>;
        }
        <span class="hljs-selector-class">.main</span> {
            <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;
            <span class="hljs-attribute">background</span>: <span class="hljs-number">#fcc</span>;
        }
         .text{
            <span class="hljs-comment">/*盒子main的外面包一个div，通过改变此div的属性使两个盒子分属于两个不同的BFC，以此来阻止margin重叠*/</span>
            <span class="hljs-attribute">overflow</span>: hidden;  <span class="hljs-comment">//此时已经触发了BFC属性。</span>
        }
</code></pre>
<p><strong>22设置元素浮动后，该元素的display值是多少？</strong></p>
<p>自动变成display:block </p>
<p><strong>23 移动端的布局用过媒体查询吗？</strong></p>
<p>通过媒体查询可以为不同大小和尺寸的媒体定义不同的css，适应相应的设备的显示。</p>
<ol>
<li>&lt;head&gt;里边<p>&lt;link rel="stylesheet" type="text/css" href="xxx.css" media="only screen and (max-device-width:480px)"&gt;</p>
</li>
<li>CSS : @media only screen and (max-device-width:480px) {/<em>css样式</em>/}</li>
</ol>
<p><strong>24 使用 CSS 预处理器吗？</strong><br>Less sass</p>
<p><strong>25 CSS优化、提高性能的方法有哪些？</strong></p>
<ol>
<li>避免过度约束</li>
<li>避免后代选择符</li>
<li>避免链式选择符</li>
<li>使用紧凑的语法</li>
<li>避免不必要的命名空间</li>
<li>避免不必要的重复</li>
<li>最好使用表示语义的名字。一个好的类名应该是描述他是什么而不是像什么</li>
<li>避免！important，可以选择其他选择器</li>
<li>尽可能的精简规则，你可以合并不同类里的重复规则</li>
</ol>
<p><strong>26 浏览器是怎样解析CSS选择器的？</strong></p>
<p>CSS选择器的解析是从右向左解析的。若从左向右的匹配，发现不符合规则，需要进行回溯，会损失很多性能。若从右向左匹配，先找到所有的最右节点，对于每一个节点，向上寻找其父节点直到找到根元素或满足条件的匹配规则，则结束这个分支的遍历。两种匹配规则的性能差别很大，是因为从右向左的匹配在第一步就筛选掉了大量的不符合条件的最右节点（叶子节点），而从左向右的匹配规则的性能都浪费在了失败的查找上面。<br>而在 CSS 解析完毕后，需要将解析的结果与 DOM Tree 的内容一起进行分析建立一棵 Render Tree，最终用来进行绘图。在建立 Render Tree 时（WebKit 中的「Attachment」过程），浏览器就要为每个 DOM Tree 中的元素根据 CSS 的解析结果（Style Rules）来确定生成怎样的 Render Tree。</p>
<p><strong>27 在网页中的应该使用奇数还是偶数的字体？为什么呢？</strong></p>
<p>使用偶数字体。偶数字号相对更容易和 web 设计的其他部分构成比例关系。Windows 自带的点阵宋体（中易宋体）从 Vista 开始只提供 12、14、16 px 这三个大小的点阵，而 13、15、17 px时用的是小一号的点。（即每个字占的空间大了 1 px，但点阵没变），于是略显稀疏。</p>
<p><strong>28 margin和padding分别适合什么场景使用？</strong></p>
<p>何时使用margin：</p>
<ol>
<li>需要在border外侧添加空白</li>
<li>空白处不需要背景色</li>
<li>上下相连的两个盒子之间的空白，需要相互抵消时。</li>
</ol>
<p>何时使用padding：</p>
<ol>
<li>需要在border内侧添加空白</li>
<li>空白处需要背景颜色</li>
<li>上下相连的两个盒子的空白，希望为两者之和。</li>
</ol>
<p>兼容性的问题：在IE5 IE6中，为float的盒子指定margin时，左侧的margin可能会变成两倍的宽度。通过改变padding或者指定盒子的display：inline解决。</p>
<p><strong>29 元素竖向的百分比设定是相对于容器的高度吗？</strong></p>
<p>当按百分比设定一个元素的宽度时，它是相对于父容器的宽度计算的，但是，对于一些表示竖向距离的属性，例如 padding-top , padding-bottom , margin-top , margin-bottom 等，当按百分比设定它们时，依据的也是父容器的宽度，而不是高度。</p>
<p><strong>30 全屏滚动的原理是什么？用到了CSS的哪些属性？</strong></p>
<ol>
<li>原理：有点类似于轮播，整体的元素一直排列下去，假设有5个需要展示的全屏页面，那么高度是500%，只是展示100%，剩下的可以通过transform进行y轴定位，也可以通过margin-top实现</li>
<li>overflow：hidden；transition：all 1000ms ease；</li>
</ol>
<p><strong>31 什么是响应式设计？响应式设计的基本原理是什么？如何兼容低版本的IE？</strong></p>
<p>响应式网站设计(Responsive Web design)是一个网站能够兼容多个终端，而不是为每一个终端做一个特定的版本。<br>基本原理是通过媒体查询检测不同的设备屏幕尺寸做处理。<br>页面头部必须有meta声明的viewport。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta name=’viewport’ content=”width=device-width, initial-scale=1. maximum-scale=1,user-scalable=no”>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">’viewport’</span> <span class="hljs-attr">content</span>=<span class="hljs-string">”width</span>=<span class="hljs-string">device-width,</span> <span class="hljs-attr">initial-scale</span>=<span class="hljs-string">1.</span> <span class="hljs-attr">maximum-scale</span>=<span class="hljs-string">1,user-scalable</span>=<span class="hljs-string">no”</span>&gt;</span>
</code></pre>
<p><strong>32 视差滚动效果？</strong></p>
<p>视差滚动（Parallax Scrolling）通过在网页向下滚动的时候，控制背景的移动速度比前景的移动速度慢来创建出令人惊叹的3D效果。</p>
<ol>
<li>CSS3实现<br>优点：开发时间短、性能和开发效率比较好，缺点是不能兼容到低版本的浏览器</li>
<li>jQuery实现<br>通过控制不同层滚动速度，计算每一层的时间，控制滚动效果。<br>优点：能兼容到各个版本的，效果可控性好<br>缺点：开发起来对制作者要求高</li>
<li>插件实现方式<br>例如：parallax-scrolling，兼容性十分好</li>
</ol>
<p><strong>33 ::before 和 :after中双冒号和单冒号有什么区别？解释一下这2个伪元素的作用</strong></p>
<ol>
<li>单冒号(:)用于CSS3伪类，双冒号(::)用于CSS3伪元素。</li>
<li>::before就是以一个子元素的存在，定义在元素主体内容之前的一个伪元素。并不存在于dom之中，只存在在页面之中。</li>
</ol>
<p>:before 和 :after 这两个伪元素，是在CSS2.1里新出现的。起初，伪元素的前缀使用的是单冒号语法，但随着Web的进化，在CSS3的规范里，伪元素的语法被修改成使用双冒号，成为::before  ::after</p>
<p><strong>34 你对line-height是如何理解的？</strong></p>
<p>行高是指一行文字的高度，具体说是两行文字间基线的距离。CSS中起高度作用的是height和line-height，没有定义height属性，最终其表现作用一定是line-height。<br>单行文本垂直居中：把line-height值设置为height一样大小的值可以实现单行文字的垂直居中，其实也可以把height删除。<br>多行文本垂直居中：需要设置display属性为inline-block。</p>
<p><strong>35 怎么让Chrome支持小于12px 的文字？</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p{font-size:10px;-webkit-transform:scale(0.8);} //0.8是缩放比例
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-selector-tag">p</span>{<span class="hljs-attribute">font-size</span>:<span class="hljs-number">10px</span>;-webkit-<span class="hljs-attribute">transform</span>:scale(<span class="hljs-number">0.8</span>);} <span class="hljs-comment">//0.8是缩放比例</span>
</code></pre>
<p><strong>36 让页面里的字体变清晰，变细用CSS怎么做？</strong></p>
<p>-webkit-font-smoothing在window系统下没有起作用，但是在IOS设备上起作用-webkit-font-smoothing：antialiased是最佳的，灰度平滑。</p>
<p><strong>37 position:fixed;在android下无效怎么处理？</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no&quot;/>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code>&lt;meta <span class="hljs-attr">name="viewport"</span> <span class="hljs-attr">content="width=device-width,</span> <span class="hljs-attr">initial-scale=1.0,</span> <span class="hljs-attr">maximum-scale=1.0,</span> <span class="hljs-attr">minimum-scale=1.0,</span> <span class="hljs-attr">user-scalable=no"/&gt;</span>
</code></pre>
<p><strong>38 如果需要手动写动画，你认为最小时间间隔是多久，为什么？</strong><br>多数显示器默认频率是60Hz，即1秒刷新60次，所以理论上最小间隔为1/60＊1000ms ＝ 16.7ms。</p>
<p><strong>39 li与li之间有看不见的空白间隔是什么原因引起的？有什么解决办法？</strong></p>
<p>行框的排列会受到中间空白（回车空格）等的影响，因为空格也属于字符,这些空白也会被应用样式，占据空间，所以会有间隔，把字符大小设为0，就没有空格了。<br>解决方法：</p>
<ol>
<li>可以将&lt;li&gt;代码全部写在一排</li>
<li>浮动li中float：left</li>
<li>在ul中用font-size：0（谷歌不支持）；可以使用letter-space：-3px</li>
</ol>
<p><strong>40 display:inline-block 什么时候会显示间隙？</strong></p>
<ol>
<li>有空格时候会有间隙 解决：移除空格</li>
<li>margin正值的时候 解决：margin使用负值</li>
<li>使用font-size时候 解决：font-size:0、letter-spacing、word-spacing</li>
</ol>
<p><strong>41 有一个高度自适应的div，里面有两个div，一个高度100px，希望另一个填满剩下的高度</strong></p>
<p>外层div使用position：relative；高度要求自适应的div使用position: absolute; top: 100px; bottom: 0; left: 0</p>
<p><strong>42 png、jpg、gif 这些图片格式解释一下，分别什么时候用。有没有了解过webp？</strong></p>
<ol>
<li>png是便携式网络图片（Portable Network Graphics）是一种无损数据压缩位图文件格式.优点是：压缩比高，色彩好。 大多数地方都可以用。</li>
<li>jpg是一种针对相片使用的一种失真压缩方法，是一种破坏性的压缩，在色调及颜色平滑变化做的不错。在www上，被用来储存和传输照片的格式。</li>
<li>gif是一种位图文件格式，以8位色重现真色彩的图像。可以实现动画效果.</li>
<li>webp格式是谷歌在2010年推出的图片格式，压缩率只有jpg的2/3，大小比png小了45%。缺点是压缩的时间更久了，兼容性不好，目前谷歌和opera支持。</li>
</ol>
<p><strong>43 style标签写在body后与body前有什么区别？</strong></p>
<p>页面加载自上而下 当然是先加载样式。<br>写在body标签后由于浏览器以逐行方式对HTML文档进行解析，当解析到写在尾部的样式表（外联或写在style标签）会导致浏览器停止之前的渲染，等待加载且解析样式表完成之后重新渲染，在windows的IE下可能会出现FOUC现象（即样式失效导致的页面闪烁问题） </p>
<p><strong>44 CSS属性overflow属性定义溢出元素内容区的内容会如何处理?</strong></p>
<p>参数是scroll时候，必会出现滚动条。<br>参数是auto时候，子元素内容大于父元素时出现滚动条。<br>参数是visible时候，溢出的内容出现在父元素之外。<br>参数是hidden时候，溢出隐藏。</p>
<p><strong>45 阐述一下CSS Sprites</strong></p>
<p>将一个页面涉及到的所有图片都包含到一张大图中去，然后利用CSS的 background-image，background- repeat，background-position 的组合进行背景定位。利用CSS Sprites能很好地减少网页的http请求，从而大大的提高页面的性能；CSS Sprites能减少图片的字节。</p>
<p><strong>持续更新中...</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
50道CSS基础面试题（附答案）

## 原文链接
[https://segmentfault.com/a/1190000013325778](https://segmentfault.com/a/1190000013325778)

