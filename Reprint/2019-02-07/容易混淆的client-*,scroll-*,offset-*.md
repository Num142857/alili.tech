---
title: '容易混淆的client-*,scroll-*,offset-*' 
date: 2019-02-07 2:30:16
hidden: true
slug: c4j7xpt0p5
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">容易混淆client-*,scroll-*,offset-*</h1>
<p><code> Truth comes from practice </code></p>
<p>上来不说话，先抛出几个问题：</p>
<p>offsetWidth offsetHeight offsetLeft offsetTop<br>clientWidth clientHeight clientLeft clientTop<br>scrollWidth scrollHeight scrollLeft scrollTop</p>
<p>是时候谈谈它们之间的区别了，是不是已经混乱了？好吧，一步一步来搞清楚这些东西是啥。</p>
<p>终于下决心来补上这个坑，俗话说的话：纸上得来终觉浅，绝知此事要躬行。要搞清这几个容易混淆的概念，我的建议是运行文章中的例子。</p>
<h2 id="articleHeader1">offset</h2>
<h3 id="articleHeader2">offsetWidth &amp; offsetHeight</h3>
<p>任何HTML元素的只读属性offsetWidth和offsetHeight已CSS像素返回它的屏幕尺寸，返回的尺寸包干元素的边框和内边距（width/height + border + padding），和滚动条。</p>
<h3 id="articleHeader3">offsetLeft &amp; offsetTop</h3>
<p>所有HTML元素拥有offsetLeft和offsetTop属性来返回元素的X和Y坐标</p>
<ol>
<li><p>相对于已定位元素的后代元素和一些其他元素（表格单元），这些属性返回的坐标是相对于祖先元素</p></li>
<li><p>一般元素，则是相对于文档，返回的是文档坐标</p></li>
</ol>
<p>offsetParent属性指定这些属性所相对的父元素，如果offsetParent为null，则这些属性都是文档坐标</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//用offsetLeft和offsetTop来计算e的位置
function getElementPosition(e){
    var x = 0,y = 0;
    while(e != null) {
        x += e.offsetLeft;
        y += e.offsetTop;
        e = e.offsetParent;
    }
    return {
        x : x,
        y : y
    };
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//用offsetLeft和offsetTop来计算e的位置</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getElementPosition</span>(<span class="hljs-params">e</span>)</span>{
    <span class="hljs-keyword">var</span> x = <span class="hljs-number">0</span>,y = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">while</span>(e != <span class="hljs-literal">null</span>) {
        x += e.offsetLeft;
        y += e.offsetTop;
        e = e.offsetParent;
    }
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">x</span> : x,
        <span class="hljs-attr">y</span> : y
    };
}</code></pre>
<h2 id="articleHeader4">client</h2>
<p><code>client</code>是一种间接指代，它就是web浏览器客户端，专指它定义的窗口或视口。</p>
<h3 id="articleHeader5">clientWidth &amp; clientHeight</h3>
<p>clientWidth和clientHeight类似于offsetWidth和offsetHeight，不同的是不包含边框大小（width/height + padding）。同时在有滚动条的情况下，clientWidth和clientHeight在其返回值中也不包含滚动条。</p>
<p><em>对于类似&lt;i&amp;gt;、&lt;code&amp;gt;、&lt;span&amp;gt;等内联元素，总是返回0</em></p>
<h3 id="articleHeader6">clientLeft &amp; clientTop</h3>
<p>返回元素的内边距的外边缘和他的边框的外边缘的水平距离和垂直距离，通常这些值就等于左边和上边的边框宽度。</p>
<p>在有滚动条时，并且浏览器将这些滚动条放置在左侧或顶部（反正我是没见过），clientLEft和clientTop就包含这些滚动条的宽度。</p>
<h2 id="articleHeader7">scroll</h2>
<h3 id="articleHeader8">scrollWidth &amp; scrollHeight</h3>
<p>这两个属性是元素的内容区域加上内边距，在加上任何溢出内容的尺寸.</p>
<p>因此，如果没有溢出时，这些属性与clientWidth和clientHeight是相等的。</p>
<h3 id="articleHeader9">scrollLeft &amp; scrollTop</h3>
<p>指定的是元素的滚动条的位置</p>
<p>scrollLeft和scrollTop都是可写的属性，通过设置它们来让元素中的内容滚动。</p>
<h2 id="articleHeader10">width和height计算实例</h2>
<p>在这个实例中，我们观察#inner实例，看看该元素各个属性之间的关系</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Document</title>
    <style>
     #wrap {
        border : 3px solid red;
        width: 600px;
        height : 600px;
        margin : 50px auto;
    }
    #inner {
        padding : 100px;
        width: 300px;
        height:200px;
        margin:50px auto;
        border:20px solid blue;
        overflow: auto;
    }
    #content{
        width: 200px;
        height:800px;
        border:1px solid black;
      }
    </style>
</head>
<body>
    <div id=&quot;wrap&quot;>
        <div id=&quot;inner&quot;>
            <div id=&quot;content&quot;></div>
        </div>
    </div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
     <span class="hljs-selector-id">#wrap</span> {
        <span class="hljs-attribute">border </span>: <span class="hljs-number">3px</span> solid red;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">600px</span>;
        <span class="hljs-attribute">height </span>: <span class="hljs-number">600px</span>;
        <span class="hljs-attribute">margin </span>: <span class="hljs-number">50px</span> auto;
    }
    <span class="hljs-selector-id">#inner</span> {
        <span class="hljs-attribute">padding </span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">200px</span>;
        <span class="hljs-attribute">margin</span>:<span class="hljs-number">50px</span> auto;
        <span class="hljs-attribute">border</span>:<span class="hljs-number">20px</span> solid blue;
        <span class="hljs-attribute">overflow</span>: auto;
    }
    <span class="hljs-selector-id">#content</span>{
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">800px</span>;
        <span class="hljs-attribute">border</span>:<span class="hljs-number">1px</span> solid black;
      }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"wrap"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"inner"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"content"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVyUd0" src="https://static.alili.tech/img/bVyUd0" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var inner = document.getElementById('inner');
var content = document.getElementById('content');
//辅助变量，获取元素的宽和高
var style = getComputedStyle(inner);

//width &amp; height
console.log('width= '+style.width);// ''
console.log('height= ' + style.height);// ''

//padding
console.log('paddingt-top='+style.paddingTop);
console.log('paddingt-bottom= '+style.paddingBottom);
console.log('paddingt-left= '+style.paddingLeft);
console.log('paddingt-right= '+style.paddingRight);

//border
console.log('border-top-width= '+style.borderTopWidth);
console.log('border-bottom-width= '+style.borderBottomWidth);
console.log('border-left-width= '+style.borderLeftWidth);
console.log('border-right-width= '+style.borderRightWidth);

//offsetWidth &amp; offsetWidth
console.log('offsetWidth= '+inner.offsetWidth);
console.log('offsetHeight= '+inner.offsetHeight);

//clientWidth &amp; clientHeight
console.log('clientWidth= '+inner.clientWidth);
console.log('clientHeight= '+inner.clientHeight);

// scrollWidth &amp; scrollHeight
console.log('scrollWidth= '+inner.scrollWidth);
console.log('scrollHeight= '+inner.scrollHeight);

// #content.offsetHeight
console.log('#content.offsetHeight= '+content.offsetHeight);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> inner = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'inner'</span>);
<span class="hljs-keyword">var</span> content = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'content'</span>);
<span class="hljs-comment">//辅助变量，获取元素的宽和高</span>
<span class="hljs-keyword">var</span> style = getComputedStyle(inner);

<span class="hljs-comment">//width &amp; height</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'width= '</span>+style.width);<span class="hljs-comment">// ''</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'height= '</span> + style.height);<span class="hljs-comment">// ''</span>

<span class="hljs-comment">//padding</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'paddingt-top='</span>+style.paddingTop);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'paddingt-bottom= '</span>+style.paddingBottom);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'paddingt-left= '</span>+style.paddingLeft);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'paddingt-right= '</span>+style.paddingRight);

<span class="hljs-comment">//border</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'border-top-width= '</span>+style.borderTopWidth);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'border-bottom-width= '</span>+style.borderBottomWidth);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'border-left-width= '</span>+style.borderLeftWidth);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'border-right-width= '</span>+style.borderRightWidth);

<span class="hljs-comment">//offsetWidth &amp; offsetWidth</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'offsetWidth= '</span>+inner.offsetWidth);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'offsetHeight= '</span>+inner.offsetHeight);

<span class="hljs-comment">//clientWidth &amp; clientHeight</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'clientWidth= '</span>+inner.clientWidth);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'clientHeight= '</span>+inner.clientHeight);

<span class="hljs-comment">// scrollWidth &amp; scrollHeight</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'scrollWidth= '</span>+inner.scrollWidth);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'scrollHeight= '</span>+inner.scrollHeight);

<span class="hljs-comment">// #content.offsetHeight</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">'#content.offsetHeight= '</span>+content.offsetHeight);</code></pre>
<p>由于元素是外链的样式，没有设置style，因此如果直接使用<code>inner.style.width</code>返回的是空。必须使用<code>getComputedStyle(el)</code>来获取元素的宽和高</p>
<p><span class="img-wrap"><img data-src="/img/bVyUej" src="https://static.alili.tech/img/bVyUej" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>说明：</p>
<p><strong>宽度</strong></p>
<ol>
<li>
<p>width：本来应该是300，但是由于存在滚动条（在水平方向占据了空间），因此</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`原本内容区宽度（width） - 滚动条宽度 = 300 - 17 = 283`
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>`原本内容区宽度（width） - 滚动条宽度 = <span class="hljs-number">300</span> - <span class="hljs-number">17</span> = <span class="hljs-number">283</span>`
</code></pre>
</li>
<li>
<p>offsetWidth：元素实际所占空间，滚动条也是元素占据的空间，因此</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`width + 滚动条 + padding + border = 300 + 100 + 100 + 20 + 20 = 540`
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>`width + 滚动条 + padding + border = <span class="hljs-number">300</span> + <span class="hljs-number">100</span> + <span class="hljs-number">100</span> + <span class="hljs-number">20</span> + <span class="hljs-number">20</span> = <span class="hljs-number">540</span>`
</code></pre>
</li>
<li>
<p>clientWidth：除去边框占据的空间，且不包含滚动条</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`width + padding = 283 + 100 + 100 = 483`
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>`width + padding = <span class="hljs-number">283</span> + <span class="hljs-number">100</span> + <span class="hljs-number">100</span> = <span class="hljs-number">483</span>`
</code></pre>
</li>
<li>
<p>scrollWidth：由于水平方向没有溢出，因此</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`clientWidth + 溢出部分 = 483 + 0 = 483`
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>`clientWidth + 溢出部分 = <span class="hljs-number">483</span> + <span class="hljs-number">0</span> = <span class="hljs-number">483</span>`
</code></pre>
</li>
</ol>
<p><strong>高度</strong></p>
<ol>
<li>
<p>height：由于垂直方向没有滚动条占据空间，因此</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`原本内容区高度（height）- 滚动条高度 = 200 - 0 = 200`
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>`原本内容区高度（height）- 滚动条高度 = <span class="hljs-number">200</span> - <span class="hljs-number">0</span> = <span class="hljs-number">200</span>`
</code></pre>
</li>
<li>
<p>offsetHeight：元素实际所占空间，由于采取了滚动的方式处理了溢出的部分，因此</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`height + padding + border = 200 + 100 + 100 + 20 + 20 = 440`
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>`height + padding + border = <span class="hljs-number">200</span> + <span class="hljs-number">100</span> + <span class="hljs-number">100</span> + <span class="hljs-number">20</span> + <span class="hljs-number">20</span> = <span class="hljs-number">440</span>`
</code></pre>
</li>
<li>
<p>clientHeight：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`height + padding = 200 + 100 + 100 = 400`
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>`height + padding = <span class="hljs-number">200</span> + <span class="hljs-number">100</span> + <span class="hljs-number">100</span> = <span class="hljs-number">400</span>`
</code></pre>
</li>
<li>
<p>scollHeight：客户区高度，加上溢出的部分，即包含元素真实高度-内容区的高度</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`height+padding+(#content.offsetHeight-height)=200+100+100+802-200=1002`
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>`height+padding+(#content.offsetHeight-height)=<span class="hljs-number">200</span>+<span class="hljs-number">100</span>+<span class="hljs-number">100</span>+<span class="hljs-number">802</span><span class="hljs-number">-200</span>=<span class="hljs-number">1002</span>`
</code></pre>
</li>
</ol>
<h2 id="articleHeader11">left和top实例</h2>
<p>html结构与上一个实例一直。这样可以</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Document</title>
    <style>
     #wrap {
        border : 3px solid red;
        width: 600px;
        height : 600px;
        margin : 50px auto;
        position:relative;
    }
    #inner {
        padding : 100px;
        width: 300px;
        height:200px;
        margin:50px auto;
        border:20px solid blue;
        overflow: auto;
    }
    #content{
        width: 200px;
        height:800px;
        border:1px solid black;
      }
    </style>
</head>
<body>
    <div id=&quot;wrap&quot;>
        <div id=&quot;inner&quot;>
            <div id=&quot;content&quot;></div>
        </div>
    </div>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
     <span class="hljs-selector-id">#wrap</span> {
        <span class="hljs-attribute">border </span>: <span class="hljs-number">3px</span> solid red;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">600px</span>;
        <span class="hljs-attribute">height </span>: <span class="hljs-number">600px</span>;
        <span class="hljs-attribute">margin </span>: <span class="hljs-number">50px</span> auto;
        <span class="hljs-attribute">position</span>:relative;
    }
    <span class="hljs-selector-id">#inner</span> {
        <span class="hljs-attribute">padding </span>: <span class="hljs-number">100px</span>;
        <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">200px</span>;
        <span class="hljs-attribute">margin</span>:<span class="hljs-number">50px</span> auto;
        <span class="hljs-attribute">border</span>:<span class="hljs-number">20px</span> solid blue;
        <span class="hljs-attribute">overflow</span>: auto;
    }
    <span class="hljs-selector-id">#content</span>{
        <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
        <span class="hljs-attribute">height</span>:<span class="hljs-number">800px</span>;
        <span class="hljs-attribute">border</span>:<span class="hljs-number">1px</span> solid black;
      }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"wrap"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"inner"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"content"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>分别获取属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var inner = document.getElementById('inner');

//offsetLeft &amp; offsetTop
console.log(&quot;offsetLeft= &quot;+inner.offsetLeft);
console.log(&quot;offsetTop= &quot;+inner.offsetTop);

//clientLeft &amp;  clientTop
console.log(&quot;clientLeft= &quot;+inner.clientLeft);
console.log(&quot;clientTop= &quot;+inner.clientTop);

// scrollLeft &amp; scrollTop
console.log(&quot;scrollLeft= &quot;+inner.scrollLeft);
console.log(&quot;scrollTop= &quot;+inner.scrollTop);

//让文档滚动
inner.scrollTop = 30;

//为了计算的方便
var style = getComputedStyle(inner);
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> inner = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'inner'</span>);

<span class="hljs-comment">//offsetLeft &amp; offsetTop</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"offsetLeft= "</span>+inner.offsetLeft);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"offsetTop= "</span>+inner.offsetTop);

<span class="hljs-comment">//clientLeft &amp;  clientTop</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"clientLeft= "</span>+inner.clientLeft);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"clientTop= "</span>+inner.clientTop);

<span class="hljs-comment">// scrollLeft &amp; scrollTop</span>
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"scrollLeft= "</span>+inner.scrollLeft);
<span class="hljs-built_in">console</span>.log(<span class="hljs-string">"scrollTop= "</span>+inner.scrollTop);

<span class="hljs-comment">//让文档滚动</span>
inner.scrollTop = <span class="hljs-number">30</span>;

<span class="hljs-comment">//为了计算的方便</span>
<span class="hljs-keyword">var</span> style = getComputedStyle(inner);
</code></pre>
<p>结果如图</p>
<p><span class="img-wrap"><img data-src="/img/bVyUeG" src="https://static.alili.tech/img/bVyUeG" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>分析：</p>
<p>(#wrap为参照原点，设置了<code>position:relative</code>)</p>
<ol>
<li>
<p>offsetLeft：即元素的x坐标，(#inner设置了自动居中)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`offsetLeft = (#wrap.width - #inner.offsetWidth)/2 =30`
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>`offsetLeft = (<span class="hljs-selector-id">#wrap</span><span class="hljs-selector-class">.width</span> - <span class="hljs-selector-id">#inner</span>.offsetWidth)/<span class="hljs-number">2</span> =<span class="hljs-number">30</span>`
</code></pre>
</li>
<li>
<p>offsetTop：即元素的y坐标，（style是#inner元素的计算后的样式）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`offsetTop = style.marginTop = 50`
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code>`offsetTop = style.marginTop = <span class="hljs-number">50</span>`
</code></pre>
</li>
<li>
<p>clientLeft 即 border-left-width</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`clientLeft = style.borderLeftWidth = 20`
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code>`clientLeft = style.borderLeftWidth = <span class="hljs-number">20</span>`
</code></pre>
</li>
<li>
<p>clientTop 即 border-top-width</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`clientTop = style.borderTopWidth = 20`
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code>`clientTop = style.borderTopWidth = <span class="hljs-number">20</span>`
</code></pre>
</li>
<li><p>scrollLeft 由于水平方向没有滚动条，因此为0</p></li>
<li><p>scrollTop 即滚动条离#inner border-top内侧的位置，一开始为0</p></li>
</ol>
<h2 id="articleHeader12">总结</h2>
<p>大部分人看完的当时是知道的，过些日子可能又忘。我觉得是这几个概念的名字取得不好，不太容易让人望文生义。说了那么多，不点个收藏以往日后回忆吗？（世上竟有如此厚颜无耻之人，哈哈^_^#）</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
容易混淆的client-*,scroll-*,offset-*

## 原文链接
[https://segmentfault.com/a/1190000005897042](https://segmentfault.com/a/1190000005897042)

