---
title: 'pure.css框架源码详细解析' 
date: 2019-01-14 2:30:07
hidden: true
slug: ex3sxwvot4n
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>一篇文章包你学会使用pure.css框架，理解其原理，并学会其包含css知识，学会自己写css组件</p></blockquote>
<h2 id="articleHeader0">前提知识</h2>
<h3 id="articleHeader1">选择器介绍</h3>
<hr>
<p>优先级就是分配给指定css声明的一个权重，它由匹配的选择器中的每一种选择器类型的数值决定。而当优先级与多个css声明中任何一个声明的优先级相等时，css中最后的那个声明将会被应用到元素上。</p>
<ul>
<li><p>选择器是用于定位文档中的元素以便设定相应的样式代码</p></li>
<li><p>选择器分类</p></li>
</ul>
<p>基础选择器</p>
<table>
<thead><tr>
<th>选择器</th>
<th>含义</th>
<th>实例</th>
</tr></thead>
<tbody>
<tr>
<td>*</td>
<td>通用选择器，匹配任何元素</td>
<td>*{font-size:16px}</td>
</tr>
<tr>
<td>E</td>
<td>标签选择器，匹配所有使用E标签的元素</td>
<td>a{font-size:16px}</td>
</tr>
<tr>
<td>.error</td>
<td>class选择器，匹配所有class属性中包含error的元素</td>
<td>.error{font-weight:bold;}</td>
</tr>
<tr>
<td>#correct</td>
<td>id选择器，匹配所有id属性值为correct的元素</td>
<td>#correct{font-style:italic;}</td>
</tr>
</tbody>
</table>
<p>​    组合选择器</p>
<table>
<thead><tr>
<th>选择器</th>
<th>含义</th>
<th>实例</th>
</tr></thead>
<tbody>
<tr>
<td>E,F</td>
<td>多元素选择器，同时匹配所有E元素或F元素</td>
<td>div,p{background-attachment:fixed;}</td>
</tr>
<tr>
<td>E F</td>
<td>后代元素选择器，匹配所有属于E元素的后代F元素</td>
<td>div a{background-color:blue;}</td>
</tr>
<tr>
<td>E&gt;F</td>
<td>子元素选择器，匹配所有E元素的子元素F</td>
<td> </td>
</tr>
<tr>
<td>E+F</td>
<td>毗邻元素选择器，匹配所有紧随E元素之后的同级元素F</td>
<td> </td>
</tr>
</tbody>
</table>
<p>属性选择器</p>
<table>
<thead><tr>
<th>选择器</th>
<th>含义</th>
<th>实例</th>
</tr></thead>
<tbody>
<tr>
<td>E[att]</td>
<td>匹配所有具有att属性的E元素</td>
<td>p[style]{background-repeat<img src="https://static.alili.techundefined" class="emoji" alt="repeat" title="repeat">repeat-y;}</td>
</tr>
<tr>
<td>E[att=val]</td>
<td>匹配所有att属性等于"val"的E元素</td>
<td>div[class="c1"]</td>
</tr>
<tr>
<td>E[att~=val]</td>
<td>匹配所有att属性具有多个空格分隔的值、其中一个值等于"val"的E元素</td>
<td>div[class~=c2]</td>
</tr>
<tr>
<td>E[att=val]</td>
<td>匹配所有att属性具有多个连字号分隔（hyphen-separated）的值、其中一个值以"val"开头的E元素</td>
<td>p[lang =en]</td>
</tr>
</tbody>
</table>
<p>​    伪类选择器</p>
<table>
<thead><tr>
<th>选择器</th>
<th>含义</th>
<th>实例</th>
</tr></thead>
<tbody>
<tr>
<td>E:first-child</td>
<td>匹配父元素E下的第一个子元素</td>
<td>div:first-child{text-align:center;}</td>
</tr>
<tr>
<td>E:link</td>
<td>匹配所有未被点击的链接</td>
<td> </td>
</tr>
<tr>
<td>E:visited</td>
<td>匹配所有已被点击的链接</td>
<td> </td>
</tr>
<tr>
<td>E:active</td>
<td>匹配鼠标悬停其上的E元素</td>
<td> </td>
</tr>
<tr>
<td>E:hover</td>
<td>匹配鼠标悬停其上的E元素</td>
<td> </td>
</tr>
<tr>
<td>E:focus</td>
<td>匹配获得焦点的E</td>
<td> </td>
</tr>
<tr>
<td>E:lang(c)</td>
<td>匹配lang属性等于c的E元素</td>
<td> </td>
</tr>
</tbody>
</table>
<p>​    伪元素</p>
<table>
<thead><tr>
<th>选择器</th>
<th>含义</th>
<th>实例</th>
</tr></thead>
<tbody>
<tr>
<td>E:first-line</td>
<td>匹配E元素的第一行</td>
<td>p:first-line{color:red;}</td>
</tr>
<tr>
<td>E:first-letter</td>
<td>匹配E元素的第一个字母</td>
<td>.c1:first-letter{color:blue;}</td>
</tr>
<tr>
<td>E:before</td>
<td>在E元素之前插入生成的内容</td>
<td>.ctn before{}</td>
</tr>
<tr>
<td>E:after</td>
<td>在E元素之后插入生成的内容</td>
<td>.ctn after{}</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader2">优先级的计算</h3>
<hr>
<p>（解释了众多css样式被覆盖的问题）</p>
<p>首先!important的css定义是拥有最高的优先级</p>
<p>优先级计算分为a,b,c,d四个位数，这四个位数的优先级依次递减。</p>
<p>内联样式：a=1；</p>
<p>ID选择器：b=1；</p>
<p>属性选择器和类选择器：c=1;</p>
<p>元素选择器和伪类选择器: d=1;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="li            {}  /* a=0 b=0 c=0 d=1 -> specificity = 0,0,0,1 */
li:first-line {}  /* a=0 b=0 c=0 d=2 -> specificity = 0,0,0,2 */
ul li         {}  /* a=0 b=0 c=0 d=2 -> specificity = 0,0,0,2 */
ul ol+li      {}  /* a=0 b=0 c=0 d=3 -> specificity = 0,0,0,3 */
h1 + *[rel=up]{}  /* a=0 b=0 c=1 d=1 -> specificity = 0,0,1,1 */
ul ol li.red  {}  /* a=0 b=0 c=1 d=3 -> specificity = 0,0,1,3 */
li.red.level  {}  /* a=0 b=0 c=2 d=1 -> specificity = 0,0,2,1 */
#x34y         {}  /* a=0 b=1 c=0 d=0 -> specificity = 0,1,0,0 */
style=&quot;&quot;          /* a=1 b=0 c=0 d=0 -> specificity = 1,0,0,0 */" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">li</span>            {}  <span class="hljs-comment">/* a=0 b=0 c=0 d=1 -&gt; specificity = 0,0,0,1 */</span>
<span class="hljs-selector-tag">li</span>:first-line {}  <span class="hljs-comment">/* a=0 b=0 c=0 d=2 -&gt; specificity = 0,0,0,2 */</span>
<span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">li</span>         {}  <span class="hljs-comment">/* a=0 b=0 c=0 d=2 -&gt; specificity = 0,0,0,2 */</span>
<span class="hljs-selector-tag">ul</span> ol+<span class="hljs-selector-tag">li</span>      {}  <span class="hljs-comment">/* a=0 b=0 c=0 d=3 -&gt; specificity = 0,0,0,3 */</span>
<span class="hljs-selector-tag">h1</span> + *[rel=up]{}  <span class="hljs-comment">/* a=0 b=0 c=1 d=1 -&gt; specificity = 0,0,1,1 */</span>
<span class="hljs-selector-tag">ul</span> <span class="hljs-selector-tag">ol</span> <span class="hljs-selector-tag">li</span><span class="hljs-selector-class">.red</span>  {}  <span class="hljs-comment">/* a=0 b=0 c=1 d=3 -&gt; specificity = 0,0,1,3 */</span>
<span class="hljs-selector-tag">li</span><span class="hljs-selector-class">.red</span><span class="hljs-selector-class">.level</span>  {}  <span class="hljs-comment">/* a=0 b=0 c=2 d=1 -&gt; specificity = 0,0,2,1 */</span>
<span class="hljs-selector-id">#x34y</span>         {}  <span class="hljs-comment">/* a=0 b=1 c=0 d=0 -&gt; specificity = 0,1,0,0 */</span>
style=<span class="hljs-string">""</span>          <span class="hljs-comment">/* a=1 b=0 c=0 d=0 -&gt; specificity = 1,0,0,0 */</span></code></pre>
<h3 id="articleHeader3">文档流</h3>
<hr>
<p>（主要应用于menu中，垂直和水平导航栏）</p>
<p>css文档流(document flow)和普通流(normal flow)实际上指的是同一个概念。</p>
<p><em>文档流</em> 指的是元素按照在HTML中为的位置顺序决定排布的过程，在排布过程中，将窗体自上而下分为一行行，并在每行中从左至右的顺序排放元素。</p>
<p>非浮动的块级元素(block)独占一行，行内元素(inline)不会独占一行。</p>
<h4>块级元素的效果</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div style=&quot; width:100px; height:100px; border: 1px solid&quot;>div1</div>
<div style=&quot; width:100px; height:100px; border: 1px solid&quot;>div2</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> style=<span class="hljs-string">" width:100px; height:100px; border: 1px solid"</span>&gt;div1&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">div</span> style=<span class="hljs-string">" width:100px; height:100px; border: 1px solid"</span>&gt;div2&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVNrlJ?w=116&amp;h=219" src="https://static.alili.tech/img/bVNrlJ?w=116&amp;h=219" alt="%E5%9D%97%E7%BA%A7%E5%85%83%E7%B4%A0_ogskld.png" title="%E5%9D%97%E7%BA%A7%E5%85%83%E7%B4%A0_ogskld.png" style="cursor: pointer;"></span></p>
<h4>内联元素的效果</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a href=&quot;http:&quot;>超链接1</a>
<a href=&quot;http:&quot;>超链接2</a>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"http:"</span>&gt;</span>超链接1<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"http:"</span>&gt;</span>超链接2<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVNrlV?w=130&amp;h=34" src="https://static.alili.tech/img/bVNrlV?w=130&amp;h=34" alt="%E5%86%85%E8%81%94_by35cr.png" title="%E5%86%85%E8%81%94_by35cr.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">绝对定位</h3>
<hr>
<p>（主要是用于含有重叠菜单的子菜单定位问题）</p>
<p>绝对定位其实是相对了某个东西的，而这个东西就是元素的第一个有position且position不能为static的祖先元素。就是这个东西必须是有一定地位的(position:absolute或position:relative),不能是一个穷鬼(position:static)或者没有地位的(position).这个时候，绝对定位，它才能以之为标杆。</p>
<p>给他爸爸加上相对定位，然后他是绝对定位</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  <div style=&quot; border:1px solid Red; padding:10px; width: 340px; height: 400px&quot;&quot;>
    红色：太公
        <div style=&quot;border:1px solid Green; padding:10px; width: 320px; height: 360px;&quot;>
        绿色：爷爷
            <div style=&quot;border:1px solid Yellow; padding:10px; width: 300px; height: 320px;position:relative; &quot;>
            黄色：老爸
                <div style=&quot;width: 100px; height: 100px;border:1px solid&quot;>
                    div1</div>
                <div style=&quot;width: 100px; height: 100px;border:1px solid;position:absolute;left:120px; top:100px;&quot;>
                    div2</div>
                <div style=&quot;width: 100px; height: 100px;border:1px solid&quot;>
                    div3</div>
            </div>
        </div>
    </div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">" border:1px solid Red; padding:10px; width: 340px; height: 400px"</span>"&gt;</span>
    红色：太公
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"border:1px solid Green; padding:10px; width: 320px; height: 360px;"</span>&gt;</span>
        绿色：爷爷
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"border:1px solid Yellow; padding:10px; width: 300px; height: 320px;position:relative; "</span>&gt;</span>
            黄色：老爸
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 100px; height: 100px;border:1px solid"</span>&gt;</span>
                    div1<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 100px; height: 100px;border:1px solid;position:absolute;left:120px; top:100px;"</span>&gt;</span>
                    div2<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
                <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 100px; height: 100px;border:1px solid"</span>&gt;</span>
                    div3<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
            <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVNrlX?w=374&amp;h=435" src="https://static.alili.tech/img/bVNrlX?w=374&amp;h=435" alt="%E7%9B%B8%E5%AF%B92_tsb9ms.png" title="%E7%9B%B8%E5%AF%B92_tsb9ms.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader5">基础</h2>
<p>所有pure模块都是基于normalize.css构建，对比base.css详细normalize.css内容请查看<a href="https://necolas.github.io/normalize.css/" rel="nofollow noreferrer" target="_blank">《Normalize.css》</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;stylesheet&quot; href=&quot;https://unpkg.com/purecss@0.6.1/build/base-min.css&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs perl"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-keyword">link</span> rel=<span class="hljs-string">"stylesheet"</span> href=<span class="hljs-string">"https://unpkg.com/purecss@0.6.1/build/base-min.css"</span>&gt;</code></pre>
<p>Normalize.css是一个小的CSS文件，为HTML元素样式提供跨浏览器的一致性。它是一个现代的、支持HTML5的、传统CSS重置的替代。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html {
  font-family: sans-serif; /* 1 */
  //无衬线体，字的比划开始及结束地方没有额外装饰
  -ms-text-size-adjust: 100%; /* 2 */
  -webkit-text-size-adjust: 100%; /* 2 */
  //iPhone 和 Android 的浏览器纵向 (Portrate mode) 和橫向 (Landscape mode) 模式皆有自动调整字体大小的功能。控制它的就是 CSS 中的 -webkit-text-size-adjust。text-size-adjust 设为 none 或者 100% 关闭字体大小自动调整功能.
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code>html {
  font-family: sans-serif; <span class="hljs-comment">/* 1 */</span>
  <span class="hljs-comment">//无衬线体，字的比划开始及结束地方没有额外装饰</span>
  -ms-<span class="hljs-keyword">text</span>-<span class="hljs-keyword">size</span>-adjust: <span class="hljs-number">100</span>%; <span class="hljs-comment">/* 2 */</span>
  -webkit-<span class="hljs-keyword">text</span>-<span class="hljs-keyword">size</span>-adjust: <span class="hljs-number">100</span>%; <span class="hljs-comment">/* 2 */</span>
  <span class="hljs-comment">//iPhone 和 Android 的浏览器纵向 (Portrate mode) 和橫向 (Landscape mode) 模式皆有自动调整字体大小的功能。控制它的就是 CSS 中的 -webkit-text-size-adjust。text-size-adjust 设为 none 或者 100% 关闭字体大小自动调整功能.</span>
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="abbr[title] {
  border-bottom: 1px dotted;
}
//缩略词显示详情，含有title属性的abbr标签缩略词的底部边线" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-selector-tag">abbr</span><span class="hljs-selector-attr">[title]</span> {
  <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">1px</span> dotted;
}
<span class="hljs-comment">//缩略词显示详情，含有title属性的abbr标签缩略词的底部边线</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVNrlY?w=236&amp;h=37" src="https://static.alili.tech/img/bVNrlY?w=236&amp;h=37" alt="abbr_wmhguu.png" title="abbr_wmhguu.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="svg:not(:root){
  overflow: hidden;
}
//svg(可缩放矢量图形)，是基于可扩展标记语言(XML)，用于描述二维矢量图形
:root,匹配文档的根元素，在HTML中，根元素永远是HTML
:not(selector)选择器匹配非指定元素
则以上是svg非根元素的元素" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>svg:not(:root){
  <span class="hljs-attribute">overflow</span>: hidden;
}
<span class="hljs-comment">//svg(可缩放矢量图形)，是基于可扩展标记语言(XML)，用于描述二维矢量图形</span>
:root,匹配文档的根元素，在<span class="hljs-selector-tag">HTML</span>中，根元素永远是<span class="hljs-selector-tag">HTML</span>
:not(selector)选择器匹配非指定元素
则以上是svg非根元素的元素</code></pre>
<h3 id="articleHeader6">隐藏元素</h3>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[hidden],
template {
//template模板标签
  display: none;
}
.hidden,
[hidden] {
//!important最高优先级
    display: none !important;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-selector-attr">[hidden]</span>,
template {
<span class="hljs-comment">//template模板标签</span>
  <span class="hljs-attribute">display</span>: none;
}
<span class="hljs-selector-class">.hidden</span>,
<span class="hljs-selector-attr">[hidden]</span> {
<span class="hljs-comment">//!important最高优先级</span>
    <span class="hljs-attribute">display</span>: none <span class="hljs-meta">!important</span>;
}</code></pre>
<p>html元素添加hidden属性，可以实现display:none !important;</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<input type=&quot;text&quot; name=&quot;_csrf&quot; hidden>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fsharp"><code style="word-break: break-word; white-space: initial;">&lt;input <span class="hljs-class"><span class="hljs-keyword">type</span></span>=<span class="hljs-string">"text"</span> name=<span class="hljs-string">"_csrf"</span> hidden&gt;</code></pre>
<h3 id="articleHeader7">响应式图片</h3>
<hr>
<p>&lt;img&gt;添加class .pure-img,配合viewport可以实现图片伸缩</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".pure-img {
//最小宽度(min-width)与最大宽度(max-width)用于设置图片最小最大宽度限制比较多。
比如一个图片为主列表，对象里图片大小不定时候，为了不想让他太小不统一这个时候我们可以使用css最小宽度样式。再如，一个盒子里有文章有图片混排的时候，有时图片宽度不能确定，这个时候如果html img图片宽度超出了盒子宽度，可能图片就会撑破div盒子造成图片混乱。
    max-width: 100%;
    height: auto;
    display: block;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>.pure-img {
//最小宽度(<span class="hljs-built_in">min</span>-<span class="hljs-built_in">width</span>)与最大宽度(<span class="hljs-built_in">max</span>-<span class="hljs-built_in">width</span>)用于设置图片最小最大宽度限制比较多。
比如一个图片为主列表，对象里图片大小不定时候，为了不想让他太小不统一这个时候我们可以使用css最小宽度样式。再如，一个盒子里有文章有图片混排的时候，有时图片宽度不能确定，这个时候如果html img图片宽度超出了盒子宽度，可能图片就会撑破div盒子造成图片混乱。
    <span class="hljs-built_in">max</span>-<span class="hljs-built_in">width</span>: <span class="hljs-number">100</span><span class="hljs-symbol">%</span>;
    <span class="hljs-built_in">height</span>: auto;
    <span class="hljs-built_in">display</span>: <span class="hljs-built_in">block</span>;
}</code></pre>
<p>max-width详细情况可以查看<a href="http://www.w3school.com.cn/cssref/pr_dim_max-width.asp" rel="nofollow noreferrer" target="_blank">《CSS max-width 属性》</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<img class=&quot;pure-img&quot; src=&quot;...&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cs"><code style="word-break: break-word; white-space: initial;">&lt;img <span class="hljs-keyword">class</span>=<span class="hljs-string">"pure-img"</span> src=<span class="hljs-string">"..."</span>&gt;</code></pre>
<h2 id="articleHeader8">栅格</h2>
<h3 id="articleHeader9">.pure-g的样式</h3>
<hr>
<blockquote><p>letter-spacing: -0.31em;</p></blockquote>
<p>1em == 16px,因为浏览器默认的字体大小是16px，em可以在浏览器改变字体大小时作出相应的放大和缩小，弹性布局</p>
<blockquote><p>*word-spacing: -0.43em</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="在样式属性名前加*,这样的样式可以被IE6和IE7所识别,而其它浏览器则会当做错误忽略,所以,这样的样式写法只对IE6/7生效.
而_开头的属性只有IE6才能识别." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erlang"><code>在样式属性名前加*,这样的样式可以被IE6和IE7所识别,而其它浏览器则会当做错误忽略,所以,这样的样式写法只对IE6/<span class="hljs-number">7</span>生效.
而_开头的属性只有IE6才能识别.</code></pre>
<p><strong>关于letter-spacing和word-spacing的区别</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVNrl5?w=450&amp;h=148" src="https://static.alili.tech/img/bVNrl5?w=450&amp;h=148" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>word-spacing属性增加或减少<strong>单词</strong>之间的空白</p>
<p>letter-spacing属性增加或减少<strong>字符</strong>之间的空白</p>
<blockquote><p>text-rendering: optimizespeed;</p></blockquote>
<p>text-rendering属性常被用在windows和linux系统中，用来给渲染引擎提供信息，让文本在速度和可读性方面得到优化，控制在线字体的微妙细节，目前只有firefos和google支持。</p>
<p>optimizespeed取值 Gecko内核的浏览器将强调可读性和几何精度，同时绘制文本渲染速度，禁用字距和连写</p>
<blockquote><p>font-family: FreeSans, Arimo, "Droid Sans", Helvetica, Arial, sans-serif;</p></blockquote>
<p>常用的字体</p>
<blockquote>
<p>display: -webkit-box;/<em> Chrome 4+, Safari 3.1, iOS Safari 3.2+ </em>/</p>
<p>display: -webkit-flex;/<em> Chrome 21+, Safari 6.1+, iOS Safari 7+, Opera 15/16 </em>/</p>
<p>display: -ms-flexbox;/<em> IE 10 </em>/</p>
<p>display: flex; /<em> Chrome 29+, Firefox 22+, IE 11+, Opera 12.1/17/18, Android 4.4+ </em>/</p>
</blockquote>
<p>webkit是一个开源的浏览器引擎，与之对应的有Gecko和Trident,加上之后表示私有属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="-moz代表firefox浏览器私有属性
-ms代表IE浏览器私有属性
-webkit代表chrome、safari私有属性" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>-<span class="ruby">moz代表firefox浏览器私有属性
</span>-<span class="ruby">ms代表IE浏览器私有属性
</span>-<span class="ruby">webkit代表chrome、safari私有属性</span></code></pre>
<p>关于display:box和display:flex的区别</p>
<p>flex是2012年以后的标准语法，大部分浏览器已经实现了无前缀版本，box是2009年语法，需要加上前缀</p>
<p>以上其实是该属性的兼容性代码</p>
<p>flex布局，弹性布局，用来为盒装模型提供最大的灵活性<br><span class="img-wrap"><img data-src="/img/bVNrmd?w=1920&amp;h=230" src="https://static.alili.tech/img/bVNrmd?w=1920&amp;h=230" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>通过添加.pure-g和未添加进行对比，可以发现，.pure-g的效果主要就是flex属性，而flex属性在此处的重要作用是给.pure-u元素添加float浮动属性</p>
<blockquote>
<p>-webkit-flex-flow: row wrap;    </p>
<p>-ms-flex-flow: row wrap;        </p>
<p>flex-flow: row wrap;</p>
</blockquote>
<p>flex-flow:&lt;flex-direction&gt;||&lt;flex-wrap&gt;</p>
<p>row表示行内方向，即弹性项目在弹性容器中的起始放置方向，flex-wrap表示需要拆行以使得弹性项目能被容器包含</p>
<blockquote>
<p>-webkit-align-content: flex-start;    </p>
<p>-ms-flex-line-pack: start;        </p>
<p>align-content: flex-start;</p>
</blockquote>
<p>多行项目时，让弹性元素始终排在头部，中间没有间距，详细flex教程请查看<a href="http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html?utm_source=tuicool" rel="nofollow noreferrer" target="_blank">《Flex布局教程：语法篇》</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@media all and (min-width:xxx) and (max-width:xxx){   
/*这段查询的all是针对所有设备(有些设备不一定是屏幕，也许是打字机，盲人阅读器)*/ 
        table .pure-g {
        display: block;
    }
}   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>@<span class="hljs-keyword">media</span> all and (min-width:xxx) and (max-width:xxx){   
<span class="hljs-comment">/*这段查询的all是针对所有设备(有些设备不一定是屏幕，也许是打字机，盲人阅读器)*/</span> 
        <span class="hljs-selector-tag">table</span> <span class="hljs-selector-class">.pure-g</span> {
        <span class="hljs-attribute">display</span>: block;
    }
}   </code></pre>
<p>写这一行是因为flex在ie10中的table时不起作用</p>
<blockquote><p>.pure-g [class *= "pure-u"] {font-family: sans-serif;}</p></blockquote>
<p>表示的是设置class属性值包含有pure-u 字符串的所有pure-g元素的样式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div[class^=&quot;something&quot;] { }表示以之开始
div[class$=&quot;something&quot;] { }表示以之结尾" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code><span class="hljs-keyword">div</span>[<span class="hljs-built_in">class</span>^=<span class="hljs-string">"something"</span>] { }表示以之开始
<span class="hljs-keyword">div</span>[<span class="hljs-built_in">class</span>$=<span class="hljs-string">"something"</span>] { }表示以之结尾</code></pre>
<h3 id="articleHeader10">.pure-u的样式</h3>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".pure-u {
display: inline-block;
*display: inline; /* IE < 8: fake inline-block */
zoom: 1;
letter-spacing: normal;
word-spacing: normal;
vertical-align: top;
text-rendering: auto;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-selector-class">.pure-u</span> {
<span class="hljs-attribute">display</span>: inline-block;
*<span class="hljs-attribute">display</span>: inline; <span class="hljs-comment">/* IE &lt; 8: fake inline-block */</span>
zoom: <span class="hljs-number">1</span>;
<span class="hljs-attribute">letter-spacing</span>: normal;
<span class="hljs-attribute">word-spacing</span>: normal;
<span class="hljs-attribute">vertical-align</span>: top;
<span class="hljs-attribute">text-rendering</span>: auto;
}</code></pre>
<p>zoom: normal | &lt;number&gt; | &lt;percentage&gt;</p>
<p>​    normal:使用对象的实际尺寸</p>
<p>​    &lt;number&gt;:用浮点数来定义缩放比例</p>
<p>​    &lt;percentage&gt;:用百分比来定义缩放比例</p>
<p>vertical-align垂直对齐属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".pure-u-x-y{
     display: inline-block;
    *display: inline;
    zoom: 1;
    letter-spacing: normal;
    word-spacing: normal;
    vertical-align: top;
    text-rendering: auto;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-selector-class">.pure-u-x-y</span>{
     <span class="hljs-attribute">display</span>: inline-block;
    *<span class="hljs-attribute">display</span>: inline;
    zoom: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">letter-spacing</span>: normal;
    <span class="hljs-attribute">word-spacing</span>: normal;
    <span class="hljs-attribute">vertical-align</span>: top;
    <span class="hljs-attribute">text-rendering</span>: auto;
}</code></pre>
<p>这个样式和.pure-u是相同的</p>
<p>pure栅格默认支持5列和24列</p>
<p>x/y表示的是列数所占的比重</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".pure-u-1-24 {
    width: 4.1667%;
    *width: 4.1357%;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-selector-class">.pure-u-1-24</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">4.1667%</span>;
    *<span class="hljs-attribute">width</span>: <span class="hljs-number">4.1357%</span>;
}</code></pre>
<p>可以发现IE67和其他浏览器之间的宽度存在细微差别,微调后可修复</p>
<p><span class="img-wrap"><img data-src="/img/bVNrmA?w=818&amp;h=141" src="https://static.alili.tech/img/bVNrmA?w=818&amp;h=141" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader11">表单</h2>
<h3 id="articleHeader12">.pure-form样式</h3>
<hr>
<blockquote><p>.pure-form input[type="text"]</p></blockquote>
<p>不同的表单类型</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    padding: 0.5em 0.6em;
    //设置表单内部填充
    display: inline-block;
    //显示为行内元素
    border: 1px solid #ccc;
    //边界线
    box-shadow: inset 0 1px 3px #ddd;
    //盒子阴影,inset设置在内边框
    border-radius: 4px;
    //圆框边角
    vertical-align: middle;
    //让行内元素居中显示，主要是表单
    box-sizing: border-box;
    //设置盒子尺寸" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0.5em</span> <span class="hljs-number">0.6em</span>;
    <span class="hljs-comment">//设置表单内部填充</span>
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-comment">//显示为行内元素</span>
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ccc</span>;
    <span class="hljs-comment">//边界线</span>
    <span class="hljs-attribute">box-shadow</span>: inset <span class="hljs-number">0</span> <span class="hljs-number">1px</span> <span class="hljs-number">3px</span> <span class="hljs-number">#ddd</span>;
    <span class="hljs-comment">//盒子阴影,inset设置在内边框</span>
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4px</span>;
    <span class="hljs-comment">//圆框边角</span>
    <span class="hljs-attribute">vertical-align</span>: middle;
    <span class="hljs-comment">//让行内元素居中显示，主要是表单</span>
    <span class="hljs-attribute">box-sizing</span>: border-box;
    <span class="hljs-comment">//设置盒子尺寸</span></code></pre>
<blockquote><p>input:not([type]) //这个属性需要分离出来，因为ie8在一堆css2.1中包含一个css3属性的时候不会执行</p></blockquote>
<p>:not()否定选择器,可以让你定位不该匹配该选择器的元素，IE6-8浏览器不支持:not()选择器</p>
<blockquote>
<p>.pure-form input[type="color"]{</p>
<p>​    padding: 0.2em 0.5em;</p>
<p>} //chrome显示色彩选择器需要额外的空间</p>
<p>input[type="text"]:focus {</p>
<p>outline:0;</p>
<p>border-color:#129FEA;</p>
<p>}</p>
</blockquote>
<p>为聚焦的时候添加样式</p>
<p>outline和boder区别</p>
<p>outline是不占空间的，既不会增加额外的width或者height</p>
<p><span class="img-wrap"><img data-src="/img/bVNrmB?w=935&amp;h=91" src="https://static.alili.tech/img/bVNrmB?w=935&amp;h=91" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>border可应用于几乎所有有形的html元素，而outline是针对链接、表单控件和imageMap等元素,outline会随元素focus出现，随blur而消失</p>
<p><span class="img-wrap"><img data-src="/img/bVNrmN?w=260&amp;h=83" src="https://static.alili.tech/img/bVNrmN?w=260&amp;h=83" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>详细的情况可以查看<a href="http://www.jb51.net/css/474466.html" rel="nofollow noreferrer" target="_blank">《深入浅析border和outline区别》</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="input[type=&quot;text&quot;][disabled]
input[readonly]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code>input[<span class="hljs-string">type="text"</span>][<span class="hljs-symbol">disabled</span>]
input[readonly]</code></pre>
<p>这两种写法都会使显示出来的文本框不能输入文字</p>
<p>但disabled会使文本框变灰，而且通过request.getParameter("name")得不到文本框中的内容(如果有的话)</p>
<p>而readonly只是使文本框不能输入，外观没有变化，而且通过request.getParameter("name")可以得到内容，可以复制</p>
<blockquote><p>input:focus:invalid</p></blockquote>
<p>同类型的方法</p>
<p>:required必须，要求input不能为空</p>
<p>:valid有效，即当填写内容符合要求时触发</p>
<p>:invalid无效，即当填写内容不符合要求时触发</p>
<p><span class="img-wrap"><img data-src="/img/bVNrmS?w=444&amp;h=154" src="https://static.alili.tech/img/bVNrmS?w=444&amp;h=154" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>可以看到符合要求时，显示的边框颜色为蓝，右边的没有添加:focus选择器的表单在无效的时候一直都是红色</p>
<p>疑问：</p>
<p><strong>input:focus:invalid和input:focus:invalid:focus差别并没有试验出来</strong></p>
<blockquote>
<p>.pure-form fieldset</p>
<p>.pure-form legend</p>
</blockquote>
<p>fieldset和legend标签的组合使用</p>
<p><span class="img-wrap"><img data-src="/img/bVNrmW?w=786&amp;h=226" src="https://static.alili.tech/img/bVNrmW?w=786&amp;h=226" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>实现的手段是添加border:0和border-bottom</p>
<h3 id="articleHeader13">.pure-form-stacked样式</h3>
<hr>
<p>可以生成堆叠式表单，即为同一列</p>
<p><span class="img-wrap"><img data-src="/img/bVNrm4?w=825&amp;h=601" src="https://static.alili.tech/img/bVNrm4?w=825&amp;h=601" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>实现的手段是添加display:block将它变成块级元素，独占整行和margin: 0.25em 0;</p>
<h3 id="articleHeader14">.pure-form-aligned样式</h3>
<hr>
<p><span class="img-wrap"><img data-src="/img/bVNrGN?w=625&amp;h=396" src="https://static.alili.tech/img/bVNrGN?w=625&amp;h=396" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>可以生成对齐式表单，label显示在input左边末端对齐<br>nline-block显示成行内元素，然后设置width使之可以撑满，再设置text-align:right使之向右对齐，此时与表单过于靠近，添加margin属性，使和表单之间间距变大。考虑到字数过长产生换行，使用vertical-align让行内元素居中显示</p>
<h3 id="articleHeader15">.pure-group样式</h3>
<hr>
<p>可以为表单标签分组，使用方法是为fieldset添加该class</p>
<p><span class="img-wrap"><img data-src="/img/bVNrGk?w=497&amp;h=418" src="https://static.alili.tech/img/bVNrGk?w=497&amp;h=418" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>区别不大，主要是阴影部分，以及结束部分相连r-radius:0将圆角样式去除，然后使用:first-child和:last-child选择器，重新设置这两个元素的圆角等样式，达到此效果</p>
<blockquote><p>.pure-form .pure-group input:first-child:last-child</p></blockquote>
<p>通过伪类选择器设置第一个和最后一个同类标签的样式</p>
<blockquote><p>.pure-form .pure-input-2-3</p></blockquote>
<p>设置表单大小</p>
<h2 id="articleHeader16">按钮</h2>
<h3 id="articleHeader17">.pure-button样式</h3>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    //这个样式应该主要是运用在移动端
    display: inline-block;
    //行内元素
    zoom: 1;
    //缩放比例
    line-height: normal;
    //默认行高
    white-space: nowrap;
    //如何处理元素内的空白，normal空白会被浏览器忽略，nowrap文本不会换行
    vertical-align: middle;
    //实现行内元素的水平居中
    text-align: center;
    //使文本水平居中
    cursor: pointer;
    -webkit-user-drag: none;
    //user-drag：auto | element | none设置和检索一个元素能否被拖拽
    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
    //user-select：none | text | all | element设置和检索是否允许选中文本
    box-sizing: border-box;
    //设置的内边距和边框不会增加宽度" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>    <span class="hljs-comment">//这个样式应该主要是运用在移动端</span>
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-comment">//行内元素</span>
    zoom: <span class="hljs-number">1</span>;
    <span class="hljs-comment">//缩放比例</span>
    <span class="hljs-attribute">line-height</span>: normal;
    <span class="hljs-comment">//默认行高</span>
    <span class="hljs-attribute">white-space</span>: nowrap;
    <span class="hljs-comment">//如何处理元素内的空白，normal空白会被浏览器忽略，nowrap文本不会换行</span>
    <span class="hljs-attribute">vertical-align</span>: middle;
    <span class="hljs-comment">//实现行内元素的水平居中</span>
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-comment">//使文本水平居中</span>
    <span class="hljs-attribute">cursor</span>: pointer;
    -webkit-user-drag: none;
    <span class="hljs-comment">//user-drag：auto | element | none设置和检索一个元素能否被拖拽</span>
    -webkit-user-<span class="hljs-selector-tag">select</span>: none;
       -moz-user-<span class="hljs-selector-tag">select</span>: none;
        -ms-user-<span class="hljs-selector-tag">select</span>: none;
            user-<span class="hljs-selector-tag">select</span>: none;
    <span class="hljs-comment">//user-select：none | text | all | element设置和检索是否允许选中文本</span>
    <span class="hljs-attribute">box-sizing</span>: border-box;
    <span class="hljs-comment">//设置的内边距和边框不会增加宽度</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//网页端主要样式
.pure-button {
    font-family: inherit;
    font-size: 100%;
    padding: 0.5em 1em;
    color: #444; /* rgba not supported (IE 8) */
    color: rgba(0, 0, 0, 0.80); /* rgba supported */
    border: 1px solid #999;  /*IE 6/7/8*/ 
    border: none rgba(0, 0, 0, 0); /*IE9 + everything else*/
    background-color: #E6E6E6;
    text-decoration: none;
    border-radius: 2px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-comment">//网页端主要样式</span>
<span class="hljs-selector-class">.pure-button</span> {
    <span class="hljs-attribute">font-family</span>: inherit;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0.5em</span> <span class="hljs-number">1em</span>;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#444</span>; <span class="hljs-comment">/* rgba not supported (IE 8) */</span>
    <span class="hljs-attribute">color</span>: rgba(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0.80</span>); <span class="hljs-comment">/* rgba supported */</span>
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#999</span>;  <span class="hljs-comment">/*IE 6/7/8*/</span> 
    <span class="hljs-attribute">border</span>: none rgba(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>); <span class="hljs-comment">/*IE9 + everything else*/</span>
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#E6E6E6</span>;
    <span class="hljs-attribute">text-decoration</span>: none;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">2px</span>;
}</code></pre>
<h3 id="articleHeader18">伪类选择器样式</h3>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//设置鼠标在上和焦点在上时的样式
.pure-button-hover,
.pure-button:hover,
.pure-button:focus {
    /* csslint ignore:start */
    filter: alpha(opacity=90);
    //透明度使用
    /* csslint ignore:end */
    background-image: -webkit-linear-gradient(transparent, rgba(0,0,0, 0.05) 40%, rgba(0,0,0, 0.10));
    background-image: linear-gradient(transparent, rgba(0,0,0, 0.05) 40%, rgba(0,0,0, 0.10));
}
//用线性渐变创建图像 rgba(0,0,0, 0.05) 40%和rgba(0,0,0, 0.10));分别为起始颜色和终止颜色，第一个参数一般是渐变方向，top 是从上到下、left 是从左到右，如果定义成 left top，那就是从左上角到右下角" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">//设置鼠标在上和焦点在上时的样式</span>
<span class="hljs-selector-class">.pure-button-hover</span>,
<span class="hljs-selector-class">.pure-button</span>:hover,
<span class="hljs-selector-class">.pure-button</span>:focus {
    <span class="hljs-comment">/* csslint ignore:start */</span>
    <span class="hljs-attribute">filter</span>: alpha(opacity=<span class="hljs-number">90</span>);
    <span class="hljs-comment">//透明度使用</span>
    <span class="hljs-comment">/* csslint ignore:end */</span>
    <span class="hljs-attribute">background-image</span>: -webkit-linear-gradient(transparent, rgba(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>, <span class="hljs-number">0.05</span>) <span class="hljs-number">40%</span>, rgba(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>, <span class="hljs-number">0.10</span>));
    <span class="hljs-attribute">background-image</span>: linear-gradient(transparent, rgba(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>, <span class="hljs-number">0.05</span>) <span class="hljs-number">40%</span>, rgba(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>, <span class="hljs-number">0.10</span>));
}
<span class="hljs-comment">//用线性渐变创建图像 rgba(0,0,0, 0.05) 40%和rgba(0,0,0, 0.10));分别为起始颜色和终止颜色，第一个参数一般是渐变方向，top 是从上到下、left 是从左到右，如果定义成 left top，那就是从左上角到右下角</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVNrCe?w=394&amp;h=77" src="https://static.alili.tech/img/bVNrCe?w=394&amp;h=77" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>线性渐变</p>
<p>linear-gradient([ [&lt;angle&gt;|to&lt;side-or-cornor&gt;],]?&lt;color-stop&gt;[,&lt;color-stop&gt;]+)</p>
<p>&lt;color-stop&gt; 用于指定渐变的起止颜色</p>
<p>详细情况可以查看<a href="http://www.css88.com/book/css/values/image/linear-gradient(" rel="nofollow noreferrer" target="_blank">《css参考手册》</a>.htm)</p>
<p>疑问：</p>
<p>background-image: linear-gradient(transparent, rgba(0,0,0, 0.05) 40%, rgba(0,0,0, 0.10));</p>
<p>transparent这个参数的作用和效果</p>
<h2 id="articleHeader19">表格</h2>
<h3 id="articleHeader20">.pure-table的样式</h3>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".pure-table {
    /* Remove spacing between table cells (from Normalize.css) */
    border-collapse: collapse;
    //为表格设置合并边框模型
    //collapse边框会合并成一个单一边框，忽略border-spacing和empty-cells属性，而separate会使边框分开，inherit规定应该从父元素继承border-collapse属性
    border-spacing: 0;
    //设置相邻单元格边框间的距离，不过仅用于边框分离模式
    empty-cells: show;
    //设置是否显示表格中的空单元格，仅适用于边框分离模式
    border: 1px solid #cbcbcb;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-selector-class">.pure-table</span> {
    <span class="hljs-comment">/* Remove spacing between table cells (from Normalize.css) */</span>
    <span class="hljs-attribute">border-collapse</span>: collapse;
    <span class="hljs-comment">//为表格设置合并边框模型</span>
    <span class="hljs-comment">//collapse边框会合并成一个单一边框，忽略border-spacing和empty-cells属性，而separate会使边框分开，inherit规定应该从父元素继承border-collapse属性</span>
    <span class="hljs-attribute">border-spacing</span>: <span class="hljs-number">0</span>;
    <span class="hljs-comment">//设置相邻单元格边框间的距离，不过仅用于边框分离模式</span>
    <span class="hljs-attribute">empty-cells</span>: show;
    <span class="hljs-comment">//设置是否显示表格中的空单元格，仅适用于边框分离模式</span>
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#cbcbcb</span>;
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVNrCE?w=227&amp;h=227" src="https://static.alili.tech/img/bVNrCE?w=227&amp;h=227" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>.pure-table caption表格标题</p>
<p>.pure-table td,.pure-table th,.pure-table thead</p>
<p>th：表头单元格-包含表头信息</p>
<p>td: 标准单元格-包含数据</p>
<p>thead:结合tbody和tfoot元素结合使用</p>
<blockquote>
<p>.pure-table-odd td{</p>
<p>​    background-color: #f2f2f2;</p>
<p>}</p>
</blockquote>
<p>隔行添加可以实现斑马纹的效果或者直接加上pure-table-striped</p>
<p><span class="img-wrap"><img data-src="/img/bVNrC5?w=423&amp;h=495" src="https://static.alili.tech/img/bVNrC5?w=423&amp;h=495" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<blockquote>
<p>.pure-table-striped tr:nth-child(2n-1) td{</p>
<p>​    background-color: #f2f2f2;</p>
<p>}</p>
</blockquote>
<p>:nth-child(n)选择器 规定属于其父元素的第n格子元素，不论元素类型</p>
<p>:nth-of-type() 选择器的意思是“规定属于其父元素的第二个 p 元素”，这个需要从同类元素开始机选</p>
<blockquote><p>.pure-table-bordered tbody &gt; tr:last-child &gt; td</p></blockquote>
<p>有边框的表格，&gt;选择器，可以缩小范围，只选择某个元素的子元素</p>
<h2 id="articleHeader21">菜单</h2>
<h3 id="articleHeader22">.pure-menu的样式</h3>
<hr>
<h4>纵向菜单的实现</h4>
<p><span class="img-wrap"><img data-src="/img/bVNrDo?w=215&amp;h=687" src="https://static.alili.tech/img/bVNrDo?w=215&amp;h=687" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//设置盒子大小不因为boder变化
.pure-menu {
    box-sizing: border-box;
}
//清除列表原有样式
.pure-menu-list{
    list-style: none;
    margin: 0;
    padding: 0;    
} 
//清除a标签原有样式，填充a标签，并变为块级元素
.pure-menu-link{
    display: block;
    text-decoration: none;
    white-space: nowrap;
    color: #777;
    padding: .5em 1em;    
}
//在父级元素使用inline-block将之变为行级元素并同一高度
.custom-restricted-width {
    /* To limit the menu width to the content of the menu: */
    display: inline-block;
    /* Or set the width explicitly: */
    /* width: 10em; */
}
//添加:hover,:link等样式
.pure-menu-link:hover,
.pure-menu-link:focus {
    background-color: #eee;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-comment">//设置盒子大小不因为boder变化</span>
<span class="hljs-selector-class">.pure-menu</span> {
    <span class="hljs-attribute">box-sizing</span>: border-box;
}
<span class="hljs-comment">//清除列表原有样式</span>
<span class="hljs-selector-class">.pure-menu-list</span>{
    <span class="hljs-attribute">list-style</span>: none;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;    
} 
<span class="hljs-comment">//清除a标签原有样式，填充a标签，并变为块级元素</span>
<span class="hljs-selector-class">.pure-menu-link</span>{
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">text-decoration</span>: none;
    <span class="hljs-attribute">white-space</span>: nowrap;
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#777</span>;
    <span class="hljs-attribute">padding</span>: .<span class="hljs-number">5em</span> <span class="hljs-number">1em</span>;    
}
<span class="hljs-comment">//在父级元素使用inline-block将之变为行级元素并同一高度</span>
<span class="hljs-selector-class">.custom-restricted-width</span> {
    <span class="hljs-comment">/* To limit the menu width to the content of the menu: */</span>
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-comment">/* Or set the width explicitly: */</span>
    <span class="hljs-comment">/* width: 10em; */</span>
}
<span class="hljs-comment">//添加:hover,:link等样式</span>
<span class="hljs-selector-class">.pure-menu-link</span>:hover,
<span class="hljs-selector-class">.pure-menu-link</span>:focus {
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#eee</span>;
}</code></pre>
<p>疑问之处：</p>
<p>inline-block怎样自动确定并统一行级元素的宽度</p>
<h4>横向菜单的实现</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="![clipboard.png](/img/bVNrDC)

.pure-menu-heading{
  padding: .5em 1em;
  display: block;
  text-decoration: none;
  white-space: nowrap;
  text-transform: uppercase;
  color: #565d64;
}
//给a标签的父级标签li标签添加display:inline-block，使三个a标签同行
.pure-menu-horizontal .pure-menu-item,
.pure-menu-horizontal .pure-menu-heading,
.pure-menu-horizontal .pure-menu-separator {
    display: inline-block;
    *display: inline;
    zoom: 1;
    vertical-align: middle;
}
//为li的父级ul标签添加display:inline-block，使所有标签同行
.pure-menu-horizontal .pure-menu-list {
    display: inline-block;
}
//清除列表原有样式,统一间距
.pure-menu-list{
    list-style: none;
    margin: 0;
    padding: 0;    
} " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>!<span class="hljs-selector-attr">[clipboard.png]</span>(/img/bVNrDC)

<span class="hljs-selector-class">.pure-menu-heading</span>{
  <span class="hljs-attribute">padding</span>: .<span class="hljs-number">5em</span> <span class="hljs-number">1em</span>;
  <span class="hljs-attribute">display</span>: block;
  <span class="hljs-attribute">text-decoration</span>: none;
  <span class="hljs-attribute">white-space</span>: nowrap;
  <span class="hljs-attribute">text-transform</span>: uppercase;
  <span class="hljs-attribute">color</span>: <span class="hljs-number">#565d64</span>;
}
<span class="hljs-comment">//给a标签的父级标签li标签添加display:inline-block，使三个a标签同行</span>
<span class="hljs-selector-class">.pure-menu-horizontal</span> <span class="hljs-selector-class">.pure-menu-item</span>,
<span class="hljs-selector-class">.pure-menu-horizontal</span> <span class="hljs-selector-class">.pure-menu-heading</span>,
<span class="hljs-selector-class">.pure-menu-horizontal</span> <span class="hljs-selector-class">.pure-menu-separator</span> {
    <span class="hljs-attribute">display</span>: inline-block;
    *<span class="hljs-attribute">display</span>: inline;
    <span class="hljs-attribute">zoom</span>: <span class="hljs-number">1</span>;
    <span class="hljs-attribute">vertical-align</span>: middle;
}
<span class="hljs-comment">//为li的父级ul标签添加display:inline-block，使所有标签同行</span>
<span class="hljs-selector-class">.pure-menu-horizontal</span> <span class="hljs-selector-class">.pure-menu-list</span> {
    <span class="hljs-attribute">display</span>: inline-block;
}
<span class="hljs-comment">//清除列表原有样式,统一间距</span>
<span class="hljs-selector-class">.pure-menu-list</span>{
    <span class="hljs-attribute">list-style</span>: none;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;    
} </code></pre>
<p>关键样式</p>
<ul>
<li><p>清除列表原有样式</p></li>
<li><p>使用padding: .5em 1em填充a标签</p></li>
<li><p>清除a标签原有样式</p></li>
<li><p>为a标签的父级标签li标签添加display:inline-block，使三个a标签同行</p></li>
<li><p>为标题的a标签和li的父级ul标签添加display:inline-block，使所有标签同行</p></li>
<li><p>为ul标签添加margin:0和padding:0清除ul原有样式</p></li>
</ul>
<h3 id="articleHeader23">含有子菜单的横向菜单的实现</h3>
<hr>
<p><span class="img-wrap"><img data-src="/img/bVNrCv?w=467&amp;h=298" src="https://static.alili.tech/img/bVNrCv?w=467&amp;h=298" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//样式整合
.pure-menu-link{
    display: block;
    text-decoration: none;
    white-space: nowrap;
    //可自定义部分
    color: #777;
    padding: .5em 1em;    
}
.pure-menu-list{
    list-style: none;
    margin: 0;
    padding: 0;    
}     
//实现横向菜单
.pure-menu-horizontal .pure-menu-list{
    display: inline-block;
}    
//实现下拉菜单符号
.pure-menu-horizontal .pure-menu-has-child > .pure-menu-lin:after{
    content: &quot;\25BE&quot;;
}
//子菜单的样式
.pure-menu-children{
    display: none;
    position: absolute;
    left: 100%;
    top:0;
    margin: 0;
    padding: 0;
    z-index: 3;
    background-color: #fff;
}
//鼠标移动显示下拉菜单
.pure-menu-allow-hover:hover > .pure-menu-child{
    display: block;
    position: absolute;
}
//子菜单移动至下方
.pure-menu-horizontal .pure-menu-children {
    left: 0;
    top: auto;
    width: inherit;
}    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">//样式整合
<span class="hljs-selector-class">.pure-menu-link</span>{
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">text-decoration</span>: none;
    <span class="hljs-attribute">white-space</span>: nowrap;
    //可自定义部分
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#777</span>;
    <span class="hljs-attribute">padding</span>: .<span class="hljs-number">5em</span> <span class="hljs-number">1em</span>;    
}
<span class="hljs-selector-class">.pure-menu-list</span>{
    <span class="hljs-attribute">list-style</span>: none;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;    
}     
//实现横向菜单
<span class="hljs-selector-class">.pure-menu-horizontal</span> <span class="hljs-selector-class">.pure-menu-list</span>{
    <span class="hljs-attribute">display</span>: inline-block;
}    
//实现下拉菜单符号
<span class="hljs-selector-class">.pure-menu-horizontal</span> <span class="hljs-selector-class">.pure-menu-has-child</span> &gt; <span class="hljs-selector-class">.pure-menu-lin</span><span class="hljs-selector-pseudo">:after</span>{
    <span class="hljs-attribute">content</span>: <span class="hljs-string">"\25BE"</span>;
}
//子菜单的样式
<span class="hljs-selector-class">.pure-menu-children</span>{
    <span class="hljs-attribute">display</span>: none;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">top</span>:<span class="hljs-number">0</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">z-index</span>: <span class="hljs-number">3</span>;
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#fff</span>;
}
//鼠标移动显示下拉菜单
<span class="hljs-selector-class">.pure-menu-allow-hover</span><span class="hljs-selector-pseudo">:hover</span> &gt; <span class="hljs-selector-class">.pure-menu-child</span>{
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">position</span>: absolute;
}
//子菜单移动至下方
<span class="hljs-selector-class">.pure-menu-horizontal</span> <span class="hljs-selector-class">.pure-menu-children</span> {
    <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">top</span>: auto;
    <span class="hljs-attribute">width</span>: inherit;
}    </code></pre>
<p>content属性与:before和:after伪元素配合使用，来插入生成内容</p>
<table>
<thead><tr>
<th>特殊字符</th>
<th>对应号码</th>
</tr></thead>
<tbody>
<tr>
<td>►</td>
<td>9658 25BA</td>
</tr>
<tr>
<td>▲</td>
<td>9650 25B2</td>
</tr>
<tr>
<td>▼</td>
<td>9660 25BC</td>
</tr>
<tr>
<td>◄</td>
<td>9668 25C4</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader24">含有子菜单的纵向菜单的实现</h3>
<hr>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="menu-has-children > .pure-menu-link:after {
    padding-left: 0.5em;
    content: &quot;\25B8&quot;;
    font-size: small;
}
//显示隐藏的子元素
.pure-menu-allow-hover:hover > .pure-menu-children{
    display: block;
    position: absolute;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>menu-has-children &gt; <span class="hljs-selector-class">.pure-menu-link</span>:after {
    <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">0.5em</span>;
    <span class="hljs-attribute">content</span>: <span class="hljs-string">"\25B8"</span>;
    <span class="hljs-attribute">font-size</span>: small;
}
<span class="hljs-comment">//显示隐藏的子元素</span>
<span class="hljs-selector-class">.pure-menu-allow-hover</span>:hover &gt; <span class="hljs-selector-class">.pure-menu-children</span>{
    <span class="hljs-attribute">display</span>: block;
    <span class="hljs-attribute">position</span>: absolute;
}
</code></pre>
<h3 id="articleHeader25">滚动菜单的实现</h3>
<p><span class="img-wrap"><img data-src="/img/bVNrEB?w=881&amp;h=391" src="https://static.alili.tech/img/bVNrEB?w=881&amp;h=391" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//限制了边框才显示滚动条
.custom-restricted {
    height: 160px;
    width: 150px;
    border: 1px solid gray;
    border-radius: 4px;
}
//y轴可滚动，x轴溢出隐藏
.pure-menu-scrollable {
    overflow-y: scroll;
    overflow-x: hidden;
}
//将li标签设为块级元素
.pure-menu-scrollable .pure-menu-list {
    display: block;
}
//水平菜单时，显示为行级元素
.pure-menu-horizontal.pure-menu-scrollable .pure-menu-list {
    display: inline-block;
}
//水平菜单针对的只是移动端，触摸横向滚动
.pure-menu-horizontal.pure-menu-scrollable {
    white-space: nowrap;
    overflow-y: hidden;
    overflow-x: auto;
  
   //指示元素不显示滚动条或者筛选指标，即使内容溢出
    -ms-overflow-style: none;
  
   //可以让页面在native端滚动时模拟原生的弹性滚动
    -webkit-overflow-scrolling: touch;
    /* a little extra padding for this style to allow for scrollbars */
    padding: .5em 0;
}
//存在疑问
.pure-menu-horizontal .pure-menu-scrollable::-webkit-scrollbar {
    display: none;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">//限制了边框才显示滚动条
<span class="hljs-selector-class">.custom-restricted</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">160px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">150px</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid gray;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">4px</span>;
}
//<span class="hljs-selector-tag">y</span>轴可滚动，<span class="hljs-selector-tag">x</span>轴溢出隐藏
<span class="hljs-selector-class">.pure-menu-scrollable</span> {
    <span class="hljs-attribute">overflow-y</span>: scroll;
    <span class="hljs-attribute">overflow-x</span>: hidden;
}
//将<span class="hljs-selector-tag">li</span>标签设为块级元素
<span class="hljs-selector-class">.pure-menu-scrollable</span> <span class="hljs-selector-class">.pure-menu-list</span> {
    <span class="hljs-attribute">display</span>: block;
}
//水平菜单时，显示为行级元素
<span class="hljs-selector-class">.pure-menu-horizontal</span><span class="hljs-selector-class">.pure-menu-scrollable</span> <span class="hljs-selector-class">.pure-menu-list</span> {
    <span class="hljs-attribute">display</span>: inline-block;
}
//水平菜单针对的只是移动端，触摸横向滚动
<span class="hljs-selector-class">.pure-menu-horizontal</span><span class="hljs-selector-class">.pure-menu-scrollable</span> {
    <span class="hljs-attribute">white-space</span>: nowrap;
    <span class="hljs-attribute">overflow-y</span>: hidden;
    <span class="hljs-attribute">overflow-x</span>: auto;
  
   //指示元素不显示滚动条或者筛选指标，即使内容溢出
    <span class="hljs-attribute">-ms-overflow-style</span>: none;
  
   //可以让页面在native端滚动时模拟原生的弹性滚动
    <span class="hljs-attribute">-webkit-overflow-scrolling</span>: touch;
    <span class="hljs-comment">/* a little extra padding for this style to allow for scrollbars */</span>
    <span class="hljs-attribute">padding</span>: .<span class="hljs-number">5em</span> <span class="hljs-number">0</span>;
}
//存在疑问
<span class="hljs-selector-class">.pure-menu-horizontal</span> <span class="hljs-selector-class">.pure-menu-scrollable</span><span class="hljs-selector-pseudo">::-webkit-scrollbar</span> {
    <span class="hljs-attribute">display</span>: none;
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
pure.css框架源码详细解析

## 原文链接
[https://segmentfault.com/a/1190000009362363](https://segmentfault.com/a/1190000009362363)

