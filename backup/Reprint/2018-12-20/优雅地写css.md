---
title: '优雅地写css' 
date: 2018-12-20 2:30:10
hidden: true
slug: 4setxh7kllm
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>
<a href="https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/" rel="nofollow noreferrer" target="_blank">https://csswizardry.com/2013/...</a><br><a href="https://css-tricks.com/bem-101/" rel="nofollow noreferrer" target="_blank">https://css-tricks.com/bem-101/</a><br><a href="https://www.smashingmagazine.com/2011/12/an-introduction-to-object-oriented-css-oocss/" rel="nofollow noreferrer" target="_blank">https://www.smashingmagazine....</a><br><a href="https://hackhands.com/70-Expert-Ideas-For-Better-CSS-Coding/" rel="nofollow noreferrer" target="_blank">https://hackhands.com/70-Expe...</a>
</blockquote>
<h2 id="articleHeader0">重置你的CSS样式</h2>
<blockquote>normalize   <a href="http://necolas.github.io/normalize.css/" rel="nofollow noreferrer" target="_blank">http://necolas.github.io/norm...</a><br>reset          <a href="http://html5reset.org/" rel="nofollow noreferrer" target="_blank">http://html5reset.org/</a><br><a href="http://www.zhangxinxu.com/wordpress/2010/08/html5-css-reset/" rel="nofollow noreferrer" target="_blank">http://www.zhangxinxu.com/wor...</a>
</blockquote>
<h2 id="articleHeader1">使用CSS常量进行更快速的开发。</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
   # Dark grey (text): #333333
   # Dark Blue (headings, links) #000066
   # Mid Blue (header) #333399
   # Light blue (top navigation) #CCCCFF
   # Mid grey: #666666 
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>/*
   <span class="hljs-meta"># Dark grey (text): #333333</span>
   <span class="hljs-meta"># Dark Blue (headings, links) #000066</span>
   <span class="hljs-meta"># Mid Blue (header) #333399</span>
   <span class="hljs-meta"># Light blue (top navigation) #CCCCFF</span>
   <span class="hljs-meta"># Mid grey: #666666 </span>
*/</code></pre>
<h2 id="articleHeader2">工作流程：调试</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="* { border: 1px solid #f00; }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;">* { <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#f00</span>; }</code></pre>
<h2 id="articleHeader3">使用主样式表</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* master.css */
@import url(&quot;reset.css&quot;);
@import url(&quot;global.css&quot;);  
@import url(&quot;structure.css&quot;);
<style type=&quot;text/css&quot; media=&quot;Screen&quot;>
   @import url(&quot;css/master.css&quot;);
</style>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/* master.css */</span>
@<span class="hljs-keyword">import</span> url(<span class="hljs-string">"reset.css"</span>);
@<span class="hljs-keyword">import</span> url(<span class="hljs-string">"global.css"</span>);  
@<span class="hljs-keyword">import</span> url(<span class="hljs-string">"structure.css"</span>);
<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">style</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span> <span class="hljs-attr">media</span>=<span class="hljs-string">"Screen"</span>&gt;</span><span class="css">
   @<span class="hljs-keyword">import</span> url(<span class="hljs-string">"css/master.css"</span>);
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span></span></code></pre>
<h2 id="articleHeader4">格式</h2>
<p>1.类名建议使用破折号代替驼峰法。如果你使用 BEM，也可以使用下划线（参见下面的 OOCSS 和 BEM）。 <br>2.不要使用 ID 选择器。 <br>3.在一个规则声明中应用了多个选择器时，每个选择器独占一行。 <br>4.在规则声明的左大括号 { 前加上一个空格。 <br>5.在属性的冒号 : 后面加上一个空格，前面不加空格。 <br>6.规则声明的右大括号 } 独占一行。 <br>7.规则声明之间用空行分隔开。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".avatar {
  border-radius: 50%;
  border: 2px solid white;
}

.one,
.selector,
.per-line {
 // ... 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.avatar</span> {
  <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">border</span>: <span class="hljs-number">2px</span> solid white;
}

<span class="hljs-selector-class">.one</span>,
<span class="hljs-selector-class">.selector</span>,
<span class="hljs-selector-class">.per-line</span> {
 // ... 
}</code></pre>
<h2 id="articleHeader5">注释</h2>
<p>1.建议使用行注释 (在 Sass 中是 //) 代替块注释。<br>2.建议注释独占一行。避免行末注释。<br>3.给没有自注释的代码写上详细说明，比如：为什么用到了 z-index 兼容性处理<br>4.使用标志。“将样式表分成特定的部分：全局样式 - （正文，段落，列表等），页眉，页面结构，标题，文本样式，导航，表单，注释，附件。</p>
<h2 id="articleHeader6">OOCSS 和 BEM</h2>
<p>出于以下原因，我们鼓励使用 OOCSS 和 BEM 的某种组合：</p>
<ul>
<li>可以帮助我们理清 CSS 和 HTML 之间清晰且严谨的关系。</li>
<li>可以帮助我们创建出可重用、易装配的组件。</li>
<li>可以减少嵌套，降低特定性。</li>
<li>可以帮助我们创建出可扩展的样式表。</li>
</ul>
<p>OOCSS，也就是 “Object Oriented CSS（面向对象的CSS）”，是一种写 CSS 的方法，其思想就是鼓励你把样式表看作“对象”的集合：创建可重用性、可重复性的代码段让你可以在整个网站中多次使用。</p>
<p>BEM，也就是 “Block-Element-Modifier”，是一种用于 HTML 和 CSS 类名的命名约定。BEM 最初是由 Yandex 提出的，要知道他们拥有巨大的代码库和可伸缩性，BEM 就是为此而生的，并且可以作为一套遵循 OOCSS 的参考指导规范。</p>
<h2 id="articleHeader7">尽量不要使用ID 选择器！！！</h2>
<p>在 CSS 中，虽然可以通过 ID 选择元素，但大家通常都会把这种方式列为反面教材。ID 选择器给你的规则声明带来了不必要的高优先级，而且 ID 选择器是不可重用的。</p>
<h2 id="articleHeader8">JavaScript 钩子</h2>
<p>避免在 CSS 和 JavaScript 中绑定相同的类。否则开发者在重构时通常会出现以下情况：轻则浪费时间在对照查找每个要改变的类，重则因为害怕破坏功能而不敢作出更改。<br>我们推荐在创建用于特定 JavaScript 的类名时，添加 .js- 前缀：<br>&lt;button class="btn btn-primary js-request-to-book"&gt;Request to Book&lt;/button&gt;</p>
<h2 id="articleHeader9">Sass</h2>
<p>属性声明的排序<br>首先列出除去 @include 和嵌套选择器之外的所有属性声明。紧随后面的是 @include，这样可以使得整个选择器的可读性更高</p>
<h2 id="articleHeader10">嵌套选择器</h2>
<p><strong>不要让嵌套选择器的深度超过 3 层！</strong></p>
<p>如果有必要_用到嵌套选择器，把它们放到最后，在规则声明和嵌套选择器之间要加上空白，相邻嵌套选择器之间也要加上空白。嵌套选择器中的内容也要遵循上述指引。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".btn {
  background: green;
  font-weight: bold;
  @include transition(background 0.5s ease);

  .icon {
    margin-right: 10px;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-class">.btn</span> {
  <span class="hljs-attribute">background</span>: green;
  <span class="hljs-attribute">font-weight</span>: bold;
  @include <span class="hljs-attribute">transition</span>(background <span class="hljs-number">0.5s</span> ease);

  <span class="hljs-selector-class">.icon</span> {
    <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">10px</span>;
  }
}</code></pre>
<h2 id="articleHeader11">变量</h2>
<p>变量名应使用破折号（例如 $my-variable）代替 camelCased 和 snake_cased 风格。对于仅用在当前文件的变量，可以在变量名之前添加下划线前缀（例如 $_my-variable）</p>
<h2 id="articleHeader12">css分类</h2>
<p>按照css的性质和用途，我们可以将<strong>css文件分成“公共型样式”、“特殊型样式”、“皮肤型样式”</strong>，并以此为顺序引用。那么他们分别是什么呢？</p>
<ul>
<li>
<strong>公共型样式</strong>是最为重要的部分，对于比较小的项目，我们只引入一个css，这个css的样式即公共型样式，一般包括：“标签的重置和设置默认值”（以消除不同浏览器之间的差异）、“统一调用背景图和清除浮动或其他需统一处理的长样式（这样就无需对每个进行分别的处理）”、“网站通用布局”、“通用模块和其扩展”、“元件和其扩展”、“功能类样式”、“皮肤类样式”。后面会具体介绍。</li>
<li>
<strong>特殊型样式</strong>即对某个维护率较高的栏目或者某个与网站整体差异较大的页面独立引入这样一个特殊型样式，方便我们维护。</li>
<li>
<strong>皮肤型样式</strong>即产品需要换肤功能，那么我们就需要将颜色、背景等抽离出来放在这里，方便管理。</li>
</ul>
<p>css文件我们分为了公共型样式、特殊型样式、皮肤型样式，那么在css文件的内部我们又是怎么分类的呢？（<strong>此部分为重点</strong>）&nbsp;</p>
<ul>
<li>
<strong>重置和默认的css代码</strong>。<br>这是为了消除默认样式和浏览器的差异，并设置部分标签的初始样式，<strong>以减少后面的重复劳动。&nbsp;</strong>你可以根据自己的网站需求设置，这一部分代码放在css内部的最上面。</li>
<li>
<strong>统一处理的css代码。&nbsp;</strong>这里可以统一调用背景图和清除浮动（指通用性较高的布局、模块、原件内的清楚）</li>
<li>布局（grid）: 我们将页面分割为几个大块，通常有头部、主体、主栏、侧栏、尾部等。常用！</li>
<li>模块（module）：即语义化的可以重复使用的较大的整体。如导航、登陆、注册、列表、评论、搜索等。常用！</li>
<li>元件（unit）：通常是一个<strong>不可再分</strong>的较为小巧的个体，被重复用于各种模块中，比如按钮、输入框、loading、图表等。常用！</li>
<li>功能（function）：为方便一些常用样式的使用，我们将这些使用率较高的样式剥离出来，按需使用，通常这些选择器具有固定样式表现，比如清除浮动。不常用，不可滥用！</li>
<li>皮肤（skin）：对于换肤型网站需要使用，将皮肤型的样式抽离出来，非换肤型网站不可滥用，不常用。</li>
<li>状态(state):即一些状态类样式。不常用。</li>
</ul>
<h2 id="articleHeader13">css代码格式</h2>
<p>1.选择器、属性和值都是用小写。</p>
<p>这一点非常关键：根据<a href="http://baike.baidu.com/view/15906.htm" rel="nofollow noreferrer" target="_blank">xhtml规范</a>，所有的标签属性和值都要使用小写形式，而我们知道xhtml更为标准，所以最好遵循之，这样，选择器必须小写就是十分必要的了。既然这样我们就不能使用驼峰式写法来写类名了，如class="u-leftArrow"实际上就是不规范的了，最好写成class="u-left_arrow"，也可以表达相同的意思。</p>
<p>2.单行写完一个选择器定义。</p>
<p>优点：<strong>便于选择器的寻找和阅读，</strong>也便于插入新的选择器和编辑，便于模块等的识别。<strong>更重要的是可以去除多余空格，使代码紧凑减少换行。</strong>试想，如果每一行只有一个属性名和属性值，那么对于一个大项目而言，就很难做到选择器的寻找和阅读了，而使用一行写完一个选择器，那么就有可能缩短为1/6到1/10，这还是非常客观的。</p>
<p>3.<strong>最后一个值也要一分号结尾。</strong></p>
<p>实际上，在大括号结束前的值可以省略分号，但是这样做会对修改、添加和维护工作带来不必要的失误和麻烦。比如，在最后添加一个属性，如果之前没有在末尾添加分号，那么你就要在新添加的属性前添加分号，否则就会出错</p>
<p>4.省略值为0的单位</p>
<p>优点：可以节省不必要的字节同时也为了方便阅读，我们将0px、0em、0%等都缩写为0</p>
<p>5.使用16进制表示颜色值，其中的字母使用大写形式，并尽量缩写。</p>
<p>除非在你需要透明度而使用rgba，否则都是用#FFFFFF这样的写法，并尽量缩写，如#FFF。使用大写形式，是因为这样更加具有易读性，且有利于压缩，而缩写为了减少不必要的字节。</p>
<p>6.根据属性的重要性顺序书写。</p>
<p>　只遵循横向顺序即可，即<strong>先书写定位布局类属性，在书写盒模型等自身属性，最后书写文本类及修饰类属性。&nbsp;</strong>另外，如果属性间存在关联性，则不要隔开写<br>  height和line-height具有关联性，我们尽量不要分开写。</p>
<p>7.私有在前，标准在后。</p>
<p>　先写带有浏览器私有标志的属性，后写W3C标准的属性。因为私有的属性，说明浏览器自身还没有规范化，标准属性是用不了的。若某一天该浏览器的属性规范化了，那么说明标准属性可以使用了，而如果我们先写W3C标准属性，最后写私有属性，就有可能导致私有属性覆盖标准属性。因此私有在前，标准在后的写法是考虑到了以后可能会出现的问题。</p>
<p>8.选择器等级</p>
<p>!important&gt;行内样式style&gt;id选择器&gt;类、伪类和属性选择器&gt;标签选择器和伪元素选择器</p>
<p>9.css内部的顺序</p>
<p><strong>　我认为，对于一个网页而言，我们在写css时，可以分为几个部分来写，比如header部分的css代码，main部分的css代码，部分之间通过空格隔开并给以响应的注释，这样更有利于我们的阅读和后期的维护</strong></p>
<p>10.优化方案：对于可以缩写的值我们尽量采用缩写形式，这样有利于减小css文件大小，并增加可读性和可维护性。且最好尽量减少没有实际作用的冗余的属性。有时我们会将定义相同的或者有大部分属性值相同的一系列的选择器组合到一起（采用逗号的方法）来统一定义，这样可以为你节省很多字节和宝贵时间。</p>
<p>10.类选择器的命名建议<br>　在前面说到，命名className时，应当以其作用、功能来命名，而不要使用没有语义化或者以颜色、左右空间位置的文字来命名。</p>
<h2 id="articleHeader14">常用命名</h2>
<p>　1.　对于布局，即用.g-作为前缀，通常有以下推荐的写法。<br>　　头部： header或head<br>　　主体： body<br>　　尾部：footer或foot<br>　　主栏： main<br>　　侧栏：side<br>　　盒容器： wrap或box<br>　　主栏子容器：mainc<br> 　侧栏子容器：sidec<br>　2.对于模块，即.m-作为前缀。元件，.u-作为前缀，通常有下面推荐的写法。<br>　　导航： nav<br>　　子导航：subnav<br>　　菜单：menu<br>　　选项卡：tab<br>　　标题区：head或title<br>　　内容区：body或content<br>　　列表：list<br>　　表格：table<br>　　表单：form<br>　　排行：top<br>　　热点：hot<br>　　登录：login<br>　　标志：logo<br>　　广告：adervertise<br>　　搜索：search<br>　　幻灯：slide<br>　　帮助：help<br>　　新闻：news<br>　　下载：download<br>　　注册：register或regist<br>　　投票：vote<br>　　版权:copyright<br>　　结果：result<br>　　按钮：button<br>　　输入：input<br>　3.对于功能，即以.f-为前缀，通常推荐如下：<br>　　清除浮动：clearboth<br>　　向左浮动：floatleft<br>　　向右浮动: floatright<br>　　溢出隐藏：overflowhidden<br>　4.对于颜色，即以.s-为前缀，通常推荐如下：<br>　　字体颜色：fontcolor<br>　　背景：background<br>　　背景颜色：backgroundcolor<br>　　背景图片：backgroundimage<br>　　背景定位：backgroundposition<br>　　边框颜色：bordercolor<br>　5.对于状态，即以.z-为前缀，通常推荐如下：<br>　　选中:selected<br>　　当前：current<br>　　显示：show<br>　　隐藏：hide<br>　　打开：open<br>　　关闭:close<br>　　出错：error<br>　　不可用:disabled</p>
<p>参考文章<br><a href="https://www.cnblogs.com/zhuzhenwei918/p/6104065.html" rel="nofollow noreferrer" target="_blank">https://www.cnblogs.com/zhuzh...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
优雅地写css

## 原文链接
[https://segmentfault.com/a/1190000012566882](https://segmentfault.com/a/1190000012566882)

