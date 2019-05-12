---
title: '我脑中飘来飘去的css魔幻属性' 
date: 2018-12-22 2:30:10
hidden: true
slug: 80944qygww
categories: [reprint]
---

{{< raw >}}

                    
<p>最近看到一篇20 个CSS高级技巧汇总的汇总，感触很深，不过我想，与技巧相比，有些常见css布局难题，有时候更加让我们的日常开发变得踌躇沮丧吧。<br>在写这一篇文章之前，自己还写过一篇：<a href="http://closertb.site/2017/06/%E6%88%91%E6%89%80%E4%B8%8D%E6%B3%A8%E6%84%8F%E7%9A%84%E9%82%A3%E4%BA%9BCSS%E5%86%B7%E7%9F%A5%E8%AF%86%EF%BC%8C%E5%8D%B4%E9%98%BB%E6%AD%A2%E4%BA%86%E6%88%91%E5%81%9A%E9%A1%B9%E7%9B%AE%E7%9A%84%E9%80%9F%E5%BA%A6/" rel="nofollow noreferrer" target="_blank">我所不注意的那些CSS冷知识，但却阻止了我做项目的速度</a>,如果你看了，我相信你也会受益的。</p>
<h3 id="articleHeader0">为什么此处li标签内的p元素看起来独自撑开了一行</h3>
<p>这是我在segmentfault上看到的一个问题，以前自己遇到过，所以就很热情洋溢的去回答了一下，难道遇到个自己会的，示例代码是这样的：    <br>CSS:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="li{
    display: inline-block;
    text-align: center;
}
.left,.center,.right{
    width:300px;
    height:300px;
}
.left{
    background-color: #999;
}
.center{
    background-color: #ccc;
}
.right{
    background-color: #eee;
}  
HTML:
<ul>
    <li class=&quot;left&quot;>
        <p style=&quot;display: inline-block;&quot;>1</p>  
    </li>
    <li class=&quot;center&quot;></li>
    <li class=&quot;right&quot;></li>
</ul>  
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>li{
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">text-align</span>: center;
}
<span class="hljs-selector-class">.left</span>,<span class="hljs-selector-class">.center</span>,.<span class="hljs-attribute">right</span>{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">300px</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">300px</span>;
}
.<span class="hljs-attribute">left</span>{
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#999</span>;
}
.center{
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#ccc</span>;
}
.<span class="hljs-attribute">right</span>{
    <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#eee</span>;
}  
HTML:
&lt;ul&gt;
    &lt;<span class="hljs-selector-tag">li</span> class=<span class="hljs-string">"left"</span>&gt;
        &lt;<span class="hljs-selector-tag">p</span> style=<span class="hljs-string">"display: inline-block;"</span>&gt;<span class="hljs-number">1</span>&lt;/p&gt;  
    &lt;/li&gt;
    &lt;<span class="hljs-selector-tag">li</span> class=<span class="hljs-string">"center"</span>&gt;&lt;/li&gt;
    &lt;<span class="hljs-selector-tag">li</span> class=<span class="hljs-string">"right"</span>&gt;&lt;/li&gt;
&lt;/ul&gt;  
</code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012417558?w=800&amp;h=466" src="https://static.alili.tech/img/remote/1460000012417558?w=800&amp;h=466" alt="测试图片" title="测试图片" style="cursor: pointer; display: inline;"></span><br> 大概就是这样子，其实文和图有点不对应，代码中第一个模块他只写了一个“1”,我为了现象更加明显，且好说明为什么，就打了一大段文字，现在我们来说说为什么。先来一张图，看懂vertical-align的几个属性,顺便带上<a href="https://www.cnblogs.com/QingFlye/p/3876191.html" rel="nofollow noreferrer" target="_blank">图片出处</a>，文章讲得还可以，理解这张图片，后面就好理解了。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012417559?w=725&amp;h=406" src="https://static.alili.tech/img/remote/1460000012417559?w=725&amp;h=406" alt="vertical-align属性" title="vertical-align属性" style="cursor: pointer;"></span></p>
<p>inline-block的vertical-align 属性默认是baseline对齐（深入理解的<a href="http://blog.csdn.net/q121516340/article/details/51483439" rel="nofollow noreferrer" target="_blank">送福利</a>），也就是英文文字小写字母a,b,c这类字母底部的那条线，因为这些是外国人发明的，所以以英文字母才有针对性。inline-block拥有vertical-align属性，其默认是基线对齐的，所以这三个inline-box需要基线对齐，而其基准线就是正常流中最后一个line box的基线,如果这个元素是空的，没有内容，那么这个基线就是最后这个元素的margin-bottom线；如果这个元素不为空，那么这个元素的基线就是元素里面内容最后一行文字的基线；所以我们一个一个来套，发现这三个li元素在一行，第一个有文字，其基线为文字底部；最后一个没有文字，<strong><em>其基线为margin-bottom线,考试要考，划重点，可以自己为元素设置margin-bottom试试</em></strong>,这就会造成第一个和二，三个错行的感觉，其实他两是为了基线对齐，所以多敲几十个文字就能明显看出其差别。所以最简单的解决方案就是为li添加vertical-align: 属性不为baseline，气不气，改变其纵向的对齐方式的默认属性;为啥非弄个折腾人勒。关于vertical-align,如果还想做这方面的深入了解，<a href="http://www.zhangxinxu.com/wordpress/2010/05/%E6%88%91%E5%AF%B9css-vertical-align%E7%9A%84%E4%B8%80%E4%BA%9B%E7%90%86%E8%A7%A3%E4%B8%8E%E8%AE%A4%E8%AF%86%EF%BC%88%E4%B8%80%EF%BC%89/" rel="nofollow noreferrer" target="_blank">可以看看张大侠的分析</a></p>
<h3 id="articleHeader1">img图片撑不满整个div，有空隙</h3>
<p>直接上图更直观(箭头所指)：<br><span class="img-wrap"><img data-src="/img/remote/1460000012417560?w=509&amp;h=301" src="https://static.alili.tech/img/remote/1460000012417560?w=509&amp;h=301" alt="撑不满的div" title="撑不满的div" style="cursor: pointer; display: inline;"></span><br>相关css和html:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<style>
    body,div{margin: 0;padding: 0;}
    .test{
        background-color: yellowgreen;
    }
    img{
        width:260px;
        height:260px;
    }
</style>
<body>
<div class=&quot;test&quot;>
    <img width=&quot;130&quot; height=&quot;130&quot; src=&quot;https://user-gold-cdn.xitu.io/2017/12/10/160409cc0f090c6f&quot;>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-tag">body</span>,<span class="hljs-selector-tag">div</span>{<span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;<span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;}
    <span class="hljs-selector-class">.test</span>{
        <span class="hljs-attribute">background-color</span>: yellowgreen;
    }
    <span class="hljs-selector-tag">img</span>{
        <span class="hljs-attribute">width</span>:<span class="hljs-number">260px</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">260px</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"test"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"130"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"130"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://user-gold-cdn.xitu.io/2017/12/10/160409cc0f090c6f"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>&lt;/body&gt;<br>其实这个问题，如果你单单这样看，和我一样涉世未深的话，是一眼看不出答案的，但是如果你在图片后面多敲两个文字，你就会发现，和上个问题，这又是一个有关于vertical-align属性相关的问题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;test&quot;>
    <img width=&quot;130&quot; height=&quot;130&quot; src=&quot;https://user-gold-cdn.xitu.io/2017/12/10/160409cc0f090c6f&quot;><span>abcd看文字</span>
</div>  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"test"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"130"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"130"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://user-gold-cdn.xitu.io/2017/12/10/160409cc0f090c6f"</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>abcd看文字<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>  </code></pre>
<p>让人恍然大悟的效果图：<br><span class="img-wrap"><img data-src="/img/remote/1460000012417561?w=399&amp;h=276" src="https://static.alili.tech/img/remote/1460000012417561?w=399&amp;h=276" alt="恍然大悟的效果图" title="恍然大悟的效果图" style="cursor: pointer;"></span><br>这下你应该就懂了，下面的空隙的距离实际上等与1个line-height的底边与baseline之间的间距。仔细观察，图片的底边是和a的下边缘是在一条水平线上的，而不是和‘看’字下边缘一条水平线上的。所以为什么上面说这又是一个和vertical-align属性相关的问题。先说解决方案<br><strong>针对于父元素div：</strong></p>
<ul>
<li>设置行高足够小,比如.test{line-height:0}，至于这么小吗，其实高度小于top线和baseline线之间的距离的距离就行了，至于到底多小，这和font-size是相关的，其目的就是没有多余的高度拿来给baseline下面的空间用(个人理解);</li>
<li>上面说了设置line-height最小和font-size相关，所以，还有的方法，就是直接设置字体大小为0，.test{font-size:0;}，道理你应该懂；</li>
</ul>
<p><strong>针对于图片div：</strong></p>
<ul>
<li>上面说了这是一个和vertical-align属性相关的问题，所以设置vertical-align属性不为baseline也可以解决，比如img{vertical-align:top;}，当然也可以是数字，比如img{vertical-align:-10px;}，这个数值绝对不是正值，其数值应该是大于bottom线和line-height的底边距离的；</li>
<li>最后一种，就是vertical-align是一个对块状元素无效的属性，仅针对于内联元素有效的，当然inline-block也有效.所以img{display:block;}也可以解决问题。</li>
</ul>
<p>也许到这里，你和我一样，有疑惑，为什么vertical-align是一个对块状元素无效的属性，设置img为块级元素，其和div就可以完美在一起，而一个内联元素放在块状元素里，就非得有隔阂。开始，我也是有这个疑问的，个人理解就是块状元素里面装了一个内联元素，如果块状没有显示的设置高度，其高度是由里面的最高的lineboxes组成的，这个div其实就是有两个lineboxes组成，图片linebox和&lt;span&gt;，其实还有一个linebox就是div自身的innerText('')，这不过这里内容为空，如果你把span去掉，你就更能理解这个隐身的linebox，所以就像是两个内联元素在一起，需要baseline对齐。所以网上有人说设置img{font-size:0;},是非常错误的,img元素很特殊，他不但是内联元素，他还是一个置换元素（下面会讲），它的高度不是文字内容撑开的，是其置换的图片高度撑开的，所以设置font-size是无效的。</p>
<h3 id="articleHeader2">浮动不按想要的方式浮</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012417562?w=1346&amp;h=72" src="https://static.alili.tech/img/remote/1460000012417562?w=1346&amp;h=72" alt="浮动常出现的形式" title="浮动常出现的形式" style="cursor: pointer;"></span><br>像上图那样的形式，盒子由导航栏和右侧一个搜索框或者登录名什么的一起组成，这也是我们常用浮动的方式来解决这样的布局。  <br>说浮动前，先说三点概念：  <br>1.浮动最初出现的意义是为了解决文字环绕图片这种在杂志报纸中常会出现的布局样式； （看下图）<br>2.浮动与绝对定位能实现相同的效果，但的区别是，浮动未脱离正常文档流，但绝对定位脱离了正常文档流；  <br>3.浮动能带来灵活的布局，但同时也带来了父元素高度塌陷的缺点（看下图），所以清除浮动是使用浮动前的必修课，后面会说到； <br><span class="img-wrap"><img data-src="/img/remote/1460000012417563?w=800&amp;h=214" src="https://static.alili.tech/img/remote/1460000012417563?w=800&amp;h=214" alt="文字环绕" title="文字环绕" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000012417564?w=800&amp;h=240" src="https://static.alili.tech/img/remote/1460000012417564?w=800&amp;h=240" alt="高度塌陷带来的布局混乱" title="高度塌陷带来的布局混乱" style="cursor: pointer; display: inline;"></span><br>现在看一下高度塌陷相关的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  
    <div class=&quot;test&quot;>
    <img width=&quot;130&quot; height=&quot;130&quot; src=&quot;https://user-gold-cdn.xitu.io/2017/12/10/160409cc0f090c6f&quot;>
    1.浮动最初出现的意义是为了解决文字环绕图片这种在杂志报纸中常会出现的布局样式；<br>
    2.浮动与绝对定位能实现相同的效果，但的区别是，浮动未脱离正常文档流，但绝对定位脱离了正常文档流；<br>
    3.浮动能带来灵活的布局，但同时也带来了父元素高度塌陷的缺点，所以清除浮动是使用浮动前的必修课，后面会说到；<br>
    <br>
    </div>
    <div class=&quot;blank&quot;></div>
    <div>
    <div class=&quot;box&quot;>
        <span class=&quot;dot&quot;></span>
        我是下面一个div的文字。
    </div>
        <div class=&quot;blank&quot;></div>
    <div class=&quot;box&quot;>
        <span class=&quot;dot&quot;></span>
        我是再下面一个div的文字。。
    </div>
        <input  width=&quot;260&quot; value=&quot;输入一段文字&quot;/>
    </div>
      
    .test {
    background-color: yellowgreen;
    font-size: 18px;
    vertical-align: top;
    }
    .test span {
        background-color: bisque;
    }
    .blank {
        line-height: 20px;
        height: 20px;
    }
    img {
        width: 260px;
        height: 260px;
        float: left;
    }
    input {
        border: 1px solid red;
        height: 24px;
        margin-left: 30px;
    }
    .box {
        background: black;
        color: white;
        padding-left: 20px;
        line-height: 10px;
    }
    .box .dot {
        display: inline-block;
        width: 4px;
        height: 4px;
        background: white;
        vertical-align: bottom;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>  
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"test"</span>&gt;
    &lt;<span class="hljs-selector-tag">img</span> <span class="hljs-attribute">width</span>=<span class="hljs-string">"130"</span> height=<span class="hljs-string">"130"</span> src=<span class="hljs-string">"https://user-gold-cdn.xitu.io/2017/12/10/160409cc0f090c6f"</span>&gt;
    <span class="hljs-number">1</span>.浮动最初出现的意义是为了解决文字环绕图片这种在杂志报纸中常会出现的布局样式；&lt;br&gt;
    <span class="hljs-number">2</span>.浮动与绝对定位能实现相同的效果，但的区别是，浮动未脱离正常文档流，但绝对定位脱离了正常文档流；&lt;br&gt;
    <span class="hljs-number">3</span>.浮动能带来灵活的布局，但同时也带来了父元素高度塌陷的缺点，所以清除浮动是使用浮动前的必修课，后面会说到；&lt;br&gt;
    &lt;br&gt;
    &lt;/div&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"blank"</span>&gt;&lt;/div&gt;
    &lt;div&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"box"</span>&gt;
        &lt;<span class="hljs-selector-tag">span</span> class=<span class="hljs-string">"dot"</span>&gt;&lt;/span&gt;
        我是下面一个div的文字。
    &lt;/div&gt;
        &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"blank"</span>&gt;&lt;/div&gt;
    &lt;<span class="hljs-selector-tag">div</span> class=<span class="hljs-string">"box"</span>&gt;
        &lt;<span class="hljs-selector-tag">span</span> class=<span class="hljs-string">"dot"</span>&gt;&lt;/span&gt;
        我是再下面一个div的文字。。
    &lt;/div&gt;
        &lt;<span class="hljs-selector-tag">input</span>  <span class="hljs-attribute">width</span>=<span class="hljs-string">"260"</span> value=<span class="hljs-string">"输入一段文字"</span>/&gt;
    &lt;/div&gt;
      
    <span class="hljs-selector-class">.test</span> {
    <span class="hljs-attribute">background-color</span>: yellowgreen;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">18px</span>;
    <span class="hljs-attribute">vertical-align</span>: top;
    }
    <span class="hljs-selector-class">.test</span> <span class="hljs-selector-tag">span</span> {
        <span class="hljs-attribute">background-color</span>: bisque;
    }
    <span class="hljs-selector-class">.blank</span> {
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">20px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">20px</span>;
    }
    <span class="hljs-selector-tag">img</span> {
        <span class="hljs-attribute">width</span>: <span class="hljs-number">260px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">260px</span>;
        <span class="hljs-attribute">float</span>: left;
    }
    <span class="hljs-selector-tag">input</span> {
        <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid red;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">24px</span>;
        <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">30px</span>;
    }
    <span class="hljs-selector-class">.box</span> {
        <span class="hljs-attribute">background</span>: black;
        <span class="hljs-attribute">color</span>: white;
        <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">20px</span>;
        <span class="hljs-attribute">line-height</span>: <span class="hljs-number">10px</span>;
    }
    <span class="hljs-selector-class">.box</span> <span class="hljs-selector-class">.dot</span> {
        <span class="hljs-attribute">display</span>: inline-block;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">4px</span>;
        <span class="hljs-attribute">height</span>: <span class="hljs-number">4px</span>;
        <span class="hljs-attribute">background</span>: white;
        <span class="hljs-attribute">vertical-align</span>: bottom;
    }</code></pre>
<p>图片一中，实现了文字环绕图片那种想要的效果，并且后面的元素没有上移错位,其原因是上面说过的，如果块状元素没有显示的设置高度，其高度由其元素内的最高的linebox决定,所以第一张图片div的高度是比img高度高的，因为我重要的事情说了三遍，文字够多。而第二张图片，div高度只有144px，因为img是浮动的，他的linebox被浮动属性破坏了,而文字又不够多，所以就造成了所谓的高度塌陷，致使最后两个div陷进了图片所在的div中，要知道，这种情况在正常块状元素布局中是根本不会出现的。至于解决浮动引起的高度塌陷，我总结了两条，分别是：</p>
<ol>
<li>使用clear:both，常见的什么clearfix；</li>
<li>触发浮动元素父元素的BFC（块状格式上下文，为解决盒子与盒子之间，内容不相符影响而生的概念）；</li>
</ol>
<p>清除浮动，相信大家都懂，而触发bfc。  </p>
<p>我说说我常用的几条，网上讲bfc的很多：</p>
<ul>
<li>float属性不为none的元素</li>
<li>position（absolute，fixed）</li>
<li>display (table-cell,inline-block，flex等)</li>
<li>overflow属性不为visible</li>
</ul>
<p>除了上面讲的这些，我还遇到过有人问，为什么我用了浮动，但元素没有浮在这一行，却换了行，像下图这样<br><span class="img-wrap"><img data-src="/img/remote/1460000012417565" src="https://static.alili.tech/img/remote/1460000012417565" alt="浮动不按想要的方式浮" title="浮动不按想要的方式浮" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   <div>
    <div class=&quot;gr&quot;>我是导航栏的一些文字</div>
    <div class=&quot;fr&quot;>我想浮在右边</div>
   </div>
   .gr{
      background-color: yellowgreen;
      margin:5px;
    }
    .fr{
      float:right;
      background-color: green;
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>   &lt;<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"gr"</span>&gt;我是导航栏的一些文字&lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"fr"</span>&gt;我想浮在右边&lt;/<span class="hljs-keyword">div</span>&gt;
   &lt;/<span class="hljs-keyword">div</span>&gt;
   .gr{
      background-color: yellowgreen;
      margin:<span class="hljs-number">5</span>px;
    }
    .fr{
      float:right;
      background-color: green;
    }</code></pre>
<p>上面这种没按想要的方式浮，是因为块状元素会不敢其内容长度有没有一行的长度，其都会占据一行的长度，后面的元素会自动换行。解决这个其最简单的方式就是将fr元素放在gr元素前，为什么这样就可以，因为float破坏了div元素的块状属性，但其未撑开父元素的高度，其浮动属性为right，默认从右侧开始布局，所以后面的div仍按正常的文档流从最左端开始布局。</p>
<h3 id="articleHeader3">有一种行内元素，又叫置换元素</h3>
<p>如果你看上面一题代码的时足够细心，你会发现我给img设置了width和height两个属性值为130，但由于又在css属性里定义了宽高260,但最终表现出的宽高为260。如果css不定义宽高呢?答案是多少,要不你试试，你慢慢试，我还是先公布答案：130.这里我们将会说一个css中的一个鲜为人知的术语:<strong>置换元素</strong>，那什么又是置换元素呢？  </p>
<p>置换元素是指：浏览器根据元素的标签和属性，来决定元素的具体显示内容。  </p>
<p>例如：浏览器根据&lt;img&gt;标签的src属性显示图片。input元素根据标签的type属性决定显示输入框还是按钮。还有，还有近来很火的canvas。  </p>
<p>置换元素有如下共同点：</p>
<ol>
<li>置换元素一般内置宽高属性，因此可以设置其宽高；</li>
<li>置换元素与一般的行内元素相比，其可以设置margin,padding，height,width等css属性；</li>
</ol>
<p>感觉要写的还有很多，事件根本不够用，先睡了，未完待续  <br>如果文中有任何不足和错误之处，还请及时指正。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
我脑中飘来飘去的css魔幻属性

## 原文链接
[https://segmentfault.com/a/1190000012417553](https://segmentfault.com/a/1190000012417553)

