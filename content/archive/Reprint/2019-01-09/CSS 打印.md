---
title: 'CSS 打印' 
date: 2019-01-09 2:30:11
hidden: true
slug: y5hc41vcwu
categories: [reprint]
---

{{< raw >}}

                    
<p>原文链接：<a href="https://lon.im/post/css-print.html" rel="nofollow noreferrer" target="_blank">https://lon.im/post/css-print...</a></p>
<h2 id="articleHeader0">简介</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012804099?w=1000&amp;h=660" src="https://static.alili.tech/img/remote/1460000012804099?w=1000&amp;h=660" alt="Chrome 浏览器打印预览" title="Chrome 浏览器打印预览" style="cursor: pointer; display: inline;"></span></p>
<p>本文主要讲解如何使用 CSS 控制打印样式。</p>
<h3 id="articleHeader1">基本概念</h3>
<p>使用 CSS 可以控制文档如何正确的显示在不同的媒介 (Media) 上。其中分页媒介 (Paged Media) ，不同于连续媒介 (Continuous Media)，它可以控制文档内容，将其分隔至一个或多个不相关联的页面 (如：书、幻灯片)。</p>
<p>页面 (Page Sheet) 是物理介质 (如：纸张) 的表面，它包含可打印区域 (Printable Areas) 和不可打印区域 (Non-printable Areas)。用户代理可以调整文档内容的格式，使其显示在可打印区域。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012804100?w=194&amp;h=148" src="https://static.alili.tech/img/remote/1460000012804100?w=194&amp;h=148" alt="页面打印区域和不可打印区域" title="页面打印区域和不可打印区域" style="cursor: pointer;"></span></p>
<p>页面盒子 (Page Box) 是一个由长边 (Long Edge) 和短边 (Short Edge) 组成的矩形。长边的方向决定了页面朝向 (Page Orientation)，长边是垂直方向，则页面朝向为纵向 (Portrait Orientation)，反之为横向 (Landscape Orientation)。</p>
<p>CSS 打印无法指定文档是否为双面打印 (Duplex Printing)，是否双面打印应该通过用户代理指定。不管是否双面打印，CSS 打印总是包含左页和右页 (分别通过 <code>:left</code>, <code>:right</code> 指定) 。（或者说 CSS 打印假定所有文档是双面打印）</p>
<h3 id="articleHeader2">页面模型 (Page Model)</h3>
<p>和 CSS 盒子模型一样，页面盒子模型由外边距 (margin)、边框 (border)、内边距 (padding) 和 内容区域 (content area) 构成。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012804101?w=267&amp;h=266" src="https://static.alili.tech/img/remote/1460000012804101?w=267&amp;h=266" alt="页面模型" title="页面模型" style="cursor: pointer; display: inline;"></span></p>
<p>其中内容区域和外边距有着特殊的功能：</p>
<ul>
<li>内容区域也叫页面区域 (Page Area)，第一页的页面区域边界构成了文档的初始的包含块 (Containing Block)</li>
<li>页面外边距区域是透明的，环绕在页面区域周围。在 CSS3 中，可以用于创建页眉和页脚，详见下文 <a href="#page-margin-boxes">页面外边距盒子</a>
</li>
</ul>
<p>页面进度 (Page Progression)方向 是文档被分隔后的页面的排列方向。比如：现代中文页面进度多是从左至右；而古代中文的页面进度则相反。可以通过设置根元素 (root element) 的 <code>direction</code> 和 <code>writing-mode</code> 属性来改变页面进度。</p>
<p>页面的“第一页”是左页还是右页，可以由页面进度的方向决定，当页面进度方向为从左至右时，第一页是右页；反之为左页。（事实上也可以通过设置根元素的 <code>break-before</code> 属性来强制改变第一页是左页还是右页）</p>
<h2 id="articleHeader3">引入打印样式的三种方式</h2>
<p>在 CSS 中使用 <code>@media print</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@media print {
    body {
        background-color: white;
    }
    img {
        visibility: hidden;
    }
    a::after {
        content: &quot;(&quot; attr(href) &quot;)&quot;; /* 所有链接后显示链接地址 */
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">media</span> print {
    <span class="hljs-selector-tag">body</span> {
        <span class="hljs-attribute">background-color</span>: white;
    }
    <span class="hljs-selector-tag">img</span> {
        <span class="hljs-attribute">visibility</span>: hidden;
    }
    <span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">::after</span> {
        <span class="hljs-attribute">content</span>: <span class="hljs-string">"("</span> <span class="hljs-built_in">attr</span>(href) <span class="hljs-string">")"</span>; <span class="hljs-comment">/* 所有链接后显示链接地址 */</span>
    }
}</code></pre>
<p>在 CSS 中使用 <code>@import</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@import url(&quot;my-print-style.css&quot;) print;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css" style="word-break: break-word; white-space: initial;">@<span class="hljs-keyword">import</span> url(<span class="hljs-string">"my-print-style.css"</span>) print;</code></pre>
<p>在 HTML 中使用 <code>&lt;link&gt;</code> 标签</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;stylesheet&quot; media=&quot;print&quot; href=&quot;my-print-style.css&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">media</span>=<span class="hljs-string">"print"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"my-print-style.css"</span>&gt;</span></code></pre>
<p>在 <code>@media print</code> 或 my-print-style.css 中，可以自由的修改大部分样式。</p>
<h2 id="articleHeader4">使用 @page</h2>
<p>使用打印媒介查询可以自定义很多样式，当希望改变页面大小、边距等，就需要用到 <code>@page</code> 了。页面上下文 (Page Context) 中仅支持部分 CSS 属性，支持的属性有：<code>margin</code>、<code>size</code>、<code>marks</code>、<code>bleed</code> 以及页面外边距盒子等，不支持的属性将会被忽略。</p>
<p>页面外边距盒子 (CSS3)</p>
<p>页面的外边距被分成了 16 个页面外边距盒子。每个外边距盒子都有自己的外边距、边框、内边距和内容区域。页面外边距盒子用于创建页眉和页脚，页眉和页脚是页面的一部分，用于补充信息，如页码或标题。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012804102?w=550&amp;h=389" src="https://static.alili.tech/img/remote/1460000012804102?w=550&amp;h=389" alt="page-margin-boxes" title="page-margin-boxes" style="cursor: pointer;"></span></p>
<p>页面外边距盒子需要在 <code>@page</code> 下使用，使用起来和伪类类似，也包含 <code>content</code> 属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@page {
    /* 页面内容区域底部添加一条 1px 的灰线 */
    @bottom-left, @bottom-center, @bottom-right {
        border-top: 1px solid gray;
    }

    /* 页脚中间显示格式如 &quot;第 3 页&quot; 的页码 */
    @bottom-center {
        content: &quot;第&quot; counter(page) &quot;页&quot;;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">page</span> {
    <span class="hljs-comment">/* 页面内容区域底部添加一条 1px 的灰线 */</span>
    @bottom-left, @bottom-center, @bottom-right {
        <span class="hljs-attribute">border-top</span>: <span class="hljs-number">1px</span> solid gray;
    }

    <span class="hljs-comment">/* 页脚中间显示格式如 "第 3 页" 的页码 */</span>
    @<span class="hljs-keyword">bottom</span>-<span class="hljs-keyword">center</span> {
        <span class="hljs-selector-tag">content</span>: "第" <span class="hljs-selector-tag">counter</span>(<span class="hljs-selector-tag">page</span>) "页";
    }
}</code></pre>
<p>注：常见浏览器都不支持该属性，推荐使用 <a href="https://www.princexml.com/" rel="nofollow noreferrer" target="_blank">Prince</a></p>
<h4>属性</h4>
<h5>
<code>margin</code> (CSS2.1)</h5>
<p><code>margin</code> 系列属性（<code>margin-top</code>、<code>margin-right</code>、<code>margin-bottom</code>、<code>margin-left</code> 和 <code>margin</code>）用于指定页面外边距大小。</p>
<p>在 CSS2.1 中，页面上下文中只支持 <code>margin</code> 系列属性。而且因为 CSS2.1 的页面上下文中没有字体的概念，<code>margin</code> 系列属性的值的单位不支持 <code>em</code> 和 <code>ex</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@page {
    size: A4 portrait;
    margin: 3.7cm 2.6cm 3.5cm; /* 国家标准公文页边距 GB/T 9704-2012 */
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">page</span> {
    <span class="hljs-attribute">size</span>: A4 portrait;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">3.7cm</span> <span class="hljs-number">2.6cm</span> <span class="hljs-number">3.5cm</span>; <span class="hljs-comment">/* 国家标准公文页边距 GB/T 9704-2012 */</span>
}</code></pre>
<h5>
<code>size</code> (CSS3)</h5>
<p><code>size</code> 属性支持 <code>auto</code>、<code>landscape</code>、<code>portrait</code>、<code>&lt;length&gt;{1,2}</code> 和 <code>&lt;page-size&gt;</code>。</p>
<ul>
<li>默认值为 <code>auto</code>，表示页面大小和方向由用户代理决定</li>
<li>
<code>landscape</code> 指定页面为横向，如果 <code>&lt;page-size&gt;</code> 没有指定，大小则由用户代理决定</li>
<li>
<code>portrait</code> 指定页面为纵向，如果 <code>&lt;page-size&gt;</code> 没有指定，大小则由用户代理决定</li>
<li>
<code>&lt;length&gt;{1,2}</code> 表示指定页面大小，填写两个值则分别指定页面盒子的宽度和高度，填写一个值则同时指定宽度和高度。在 CSS3 中，值的单位支持 <code>em</code> 和 <code>ex</code>，大小相对于页面上下文中字体的大小</li>
<li>
<code>&lt;page-size&gt;</code> 也用于指定页面大小，等价于使用 <code>&lt;length&gt;{1,2}</code>。常用的值有：<code>A3</code>、<code>A4</code>、<code>A5</code>、<code>B4</code> 和 <code>B5</code> 等，详细尺寸请参考 [ISO 216]。<code>&lt;page-size&gt;</code> 可以与 <code>landscape</code> 或 <code>portrait</code> 组合同时指定页面方向。</li>
</ul>
<h4>伪类</h4>
<p>页面上下文也支持使用伪类，其中支持的伪类有：<code>:left</code>、<code>:right</code>、<code>:first</code> 和 <code>:blank</code>。</p>
<h5>伪类 <code>:left</code> 和 <code>:right</code>
</h5>
<p>需要双面打印时，通常需要将左页和右页设置不同的样式（如页边距、页码位置）。这时左页和右页可以分别用 <code>:left</code> 和 <code>:right</code> 表示。再次强调，<strong>通过 <code>:left</code> 和 <code>:right</code> 设置左右页面不同样式，并不代表用户代理会将页面双面打印</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/* 通过分别设置左页和右页不同的左右页面距，为装订边留出更多的空间 */

@page :left {
    margin-left: 2.5cm;
    margin-right: 2.7cm;
}

@page :right {
    margin-left: 2.7cm;
    margin-right: 2.5cm;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-comment">/* 通过分别设置左页和右页不同的左右页面距，为装订边留出更多的空间 */</span>

@<span class="hljs-keyword">page</span> <span class="hljs-selector-pseudo">:left</span> {
    <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">2.5cm</span>;
    <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">2.7cm</span>;
}

@<span class="hljs-keyword">page</span> <span class="hljs-selector-pseudo">:right</span> {
    <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">2.7cm</span>;
    <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">2.5cm</span>;
}</code></pre>
<h5>伪类 <code>:first</code>
</h5>
<p>伪类 <code>:first</code> 用于匹配到文档的第一页。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@page :first {
    margin-top: 10cm; /* 首页上页边距设置为 10cm */
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">page</span> <span class="hljs-selector-pseudo">:first</span> {
    <span class="hljs-attribute">margin-top</span>: <span class="hljs-number">10cm</span>; <span class="hljs-comment">/* 首页上页边距设置为 10cm */</span>
}</code></pre>
<h5>伪类 <code>:blank</code>
</h5>
<p>伪类 <code>:blank</code> 用于匹配文档的空白页。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="h1 {
    page-break-before: left; /* 一级标题强制分配到右页 */
}

@page :blank {
    @top-center {
        content: &quot;这是空白页&quot;;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">h1</span> {
    <span class="hljs-attribute">page-break-before</span>: left; <span class="hljs-comment">/* 一级标题强制分配到右页 */</span>
}

@<span class="hljs-keyword">page</span> <span class="hljs-selector-pseudo">:blank</span> {
    @top-center {
        <span class="hljs-attribute">content</span>: <span class="hljs-string">"这是空白页"</span>;
    }
}</code></pre>
<p>注意，空白页既可能是左页，又可能是右页，设置左页或右页的样式也会显示在空白页上，如果不希望显示在空白页上，可以清除这些样式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="h1 {
    break-before: left;
}

@page :left {
    @left-center {
        content: &quot;这是左页&quot;;
    }
}

@page :right {
    @right-center {
        content: &quot;这是右页&quot;;
    }
}

@page :blank {
    @left-center, @right-center {
        content: none; /* 如果是空白页则不显示 */
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">h1</span> {
    <span class="hljs-attribute">break-before</span>: left;
}

@<span class="hljs-keyword">page</span> <span class="hljs-selector-pseudo">:left</span> {
    @left-center {
        <span class="hljs-attribute">content</span>: <span class="hljs-string">"这是左页"</span>;
    }
}

@<span class="hljs-keyword">page</span> <span class="hljs-selector-pseudo">:right</span> {
    @right-center {
        <span class="hljs-attribute">content</span>: <span class="hljs-string">"这是右页"</span>;
    }
}

@<span class="hljs-keyword">page</span> <span class="hljs-selector-pseudo">:blank</span> {
    @left-center, @right-center {
        <span class="hljs-attribute">content</span>: none; <span class="hljs-comment">/* 如果是空白页则不显示 */</span>
    }
}</code></pre>
<h2 id="articleHeader5">分页</h2>
<h5>
<code>page-break-before</code>，<code>page-break-after</code>，<code>page-break-inside</code> (CSS 2.1)</h5>
<p>用于控制元素之前、之后或之中是否分页，<strong>没有生成盒子的块元素不会生效</strong>。</p>
<p><code>page-break-before</code>、<code>page-break-after</code> 属性支持 <code>auto</code>、<code>always</code>、<code>avoid</code>、<code>left</code>、<code>right</code>、<code>recto</code> 和 <code>verso</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="h2 {
    page-break-before: always;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">h2</span> {
    <span class="hljs-attribute">page-break-before</span>: always;
}</code></pre>
<ul>
<li>
<code>auto</code> 默认值，表示既不强制分页也不禁止分页</li>
<li>
<code>always</code>、<code>avoid</code> 表示在该元素之前（或之后）强制或禁止分页</li>
<li>
<code>left</code>、<code>right</code> 表示在该元素之前（或之后）强制分页，使得下一页出现在左页或右页</li>
<li>
<code>recto</code>、<code>verso</code> 页面进度从左至右时，分别与 <code>right</code> 和 <code>left</code> 一致；反之与 <code>left</code> 和 <code>right</code> 一致</li>
</ul>
<p><code>page-break-inside</code> 属性仅支持 <code>auto</code> 和 <code>avoid</code>，表示在元素内允许或禁止分页。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="thead, tfoot {
    display: table-row-group;
}
thead, tfoot, tr, th, td {
    page-break-inside: avoid;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">thead</span>, <span class="hljs-selector-tag">tfoot</span> {
    <span class="hljs-attribute">display</span>: table-row-group;
}
<span class="hljs-selector-tag">thead</span>, <span class="hljs-selector-tag">tfoot</span>, <span class="hljs-selector-tag">tr</span>, <span class="hljs-selector-tag">th</span>, <span class="hljs-selector-tag">td</span> {
    <span class="hljs-attribute">page-break-inside</span>: avoid;
}</code></pre>
<h5>
<code>orphans</code>，<code>windows</code> (CSS 2.1)</h5>
<p><code>orphans</code> 和 <code>windows</code> 用于指定在页面的底部或顶部，元素中允许剩余的最少行数，默认为 2 行。</p>
<h2 id="articleHeader6">最佳实践</h2>
<ul>
<li>“白纸黑字”--避免不必要的背景颜色、加深文字颜色等</li>
<li>避免打印次要的内容，比如导航栏、侧边栏等</li>
<li>链接后显示链接地址</li>
<li>做好分页，避免标题、表格单元格等换行</li>
</ul>
<p>示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@media print {
    @page {
        size: A4 portrait;
        margin: 3.7cm 2.6cm 3.5cm;
    }

    h1 {
        page-break-before: always;
    }

    h1, h2, h3, h4, h5, h6,
    thead, tfoot, tr, th, td,
    li {
        page-break-inside: avoid;
    }

    body {
        background-color: white;
        color: black;
    }

    nav, aside {
        display: none;
    }

    a::after {
        content: &quot;(&quot; attr(href) &quot;)&quot;;
    }

    thead, tfoot {
        display: table-row-group;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">@<span class="hljs-keyword">media</span> print {
    @<span class="hljs-keyword">page</span> {
        <span class="hljs-attribute">size</span>: A4 portrait;
        <span class="hljs-attribute">margin</span>: <span class="hljs-number">3.7cm</span> <span class="hljs-number">2.6cm</span> <span class="hljs-number">3.5cm</span>;
    }

    <span class="hljs-selector-tag">h1</span> {
        <span class="hljs-attribute">page-break-before</span>: always;
    }

    <span class="hljs-selector-tag">h1</span>, <span class="hljs-selector-tag">h2</span>, <span class="hljs-selector-tag">h3</span>, <span class="hljs-selector-tag">h4</span>, <span class="hljs-selector-tag">h5</span>, <span class="hljs-selector-tag">h6</span>,
    <span class="hljs-selector-tag">thead</span>, <span class="hljs-selector-tag">tfoot</span>, <span class="hljs-selector-tag">tr</span>, <span class="hljs-selector-tag">th</span>, <span class="hljs-selector-tag">td</span>,
    <span class="hljs-selector-tag">li</span> {
        <span class="hljs-attribute">page-break-inside</span>: avoid;
    }

    <span class="hljs-selector-tag">body</span> {
        <span class="hljs-attribute">background-color</span>: white;
        <span class="hljs-attribute">color</span>: black;
    }

    <span class="hljs-selector-tag">nav</span>, <span class="hljs-selector-tag">aside</span> {
        <span class="hljs-attribute">display</span>: none;
    }

    <span class="hljs-selector-tag">a</span><span class="hljs-selector-pseudo">::after</span> {
        <span class="hljs-attribute">content</span>: <span class="hljs-string">"("</span> <span class="hljs-built_in">attr</span>(href) <span class="hljs-string">")"</span>;
    }

    <span class="hljs-selector-tag">thead</span>, <span class="hljs-selector-tag">tfoot</span> {
        <span class="hljs-attribute">display</span>: table-row-group;
    }
}</code></pre>
<hr>
<p>参考链接：</p>
<ul>
<li>
<a href="https://www.w3.org/TR/CSS21/page.html" rel="nofollow noreferrer" target="_blank"><em>Paged media (CSS 2.1)</em></a> W3C</li>
<li>
<a href="https://www.w3.org/TR/css3-page/" rel="nofollow noreferrer" target="_blank"><em>CSS Paged Media Module Level 3 (W3C Working Draft 14 March 2013)</em></a> W3C</li>
<li>
<a href="https://drafts.csswg.org/css-page-3/" rel="nofollow noreferrer" target="_blank"><em>CSS Paged Media Module Level 3 (Editor’s Draft, 22 June 2017)</em></a> W3C</li>
<li>
<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Pages" rel="nofollow noreferrer" target="_blank"><em>CSS Pages</em></a> MDN</li>
<li>
<a href="https://drafts.csswg.org/css-multicol-1/#break-after" rel="nofollow noreferrer" target="_blank"><em>CSS Multi-column Layout Module Level 1 (Editor’s Draft, 22 June 2017)</em></a> W3C</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS 打印

## 原文链接
[https://segmentfault.com/a/1190000010145260](https://segmentfault.com/a/1190000010145260)

