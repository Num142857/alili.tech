---
title: '【基础】这15种CSS居中的方式，你都用过哪几种？' 
date: 2018-12-09 2:30:08
hidden: true
slug: bj0a74inyou
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">简言</h2>
<p>CSS居中是前端工程师经常要面对的问题，也是基本技能之一。今天有时间把CSS居中的方案汇编整理了一下，目前包括水平居中，垂直居中及水平垂直居中方案共15种。如有漏掉的，还会陆续的补充进来，算做是一个备忘录吧。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013966655?w=690&amp;h=184" src="https://static.alili.tech/img/remote/1460000013966655?w=690&amp;h=184" alt="css居中" title="css居中" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader1">1 水平居中</h2>
<h3 id="articleHeader2">1.1 内联元素水平居中</h3>
<p>利用 <code> text-align: center</code> 可以实现在块级元素内部的内联元素水平居中。此方法对内联元素(<code>inline</code>), 内联块(<code>inline-block</code>), 内联表(<code>inline-table</code>), <code>inline-flex</code>元素水平居中都有效。</p>
<p><strong> 核心代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".center-text {
    text-align: center;
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.center-text</span> {
    <span class="hljs-attribute">text-align</span>: center;
 }</code></pre>
<p><strong>  演示程序：</strong></p>
<p><a href="http://www.42du.cn/run/57" rel="nofollow noreferrer" target="_blank">演示代码</a></p>
<h3 id="articleHeader3">1.2 块级元素水平居中</h3>
<p>通过把固定宽度块级元素的<code>margin-left</code>和<code>margin-right</code>设成auto，就可以使块级元素水平居中。</p>
<p><strong> 核心代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".center-block {
  margin: 0 auto;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.center-block</span> {
  <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
}</code></pre>
<p><strong>  演示程序：</strong></p>
<p><a href="http://www.42du.cn/run/58" rel="nofollow noreferrer" target="_blank">演示代码</a></p>
<h3 id="articleHeader4">1.3 多块级元素水平居中</h3>
<h4>1.3.1 利用<code>inline-block</code>
</h4>
<p>如果一行中有两个或两个以上的块级元素，通过设置块级元素的显示类型为<code>inline-block</code>和父容器的<code>text-align</code>属性从而使多块级元素水平居中。</p>
<p><strong> 核心代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {
    text-align: center;
}
.inline-block {
    display: inline-block;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {
    <span class="hljs-attribute">text-align</span>: center;
}
<span class="hljs-selector-class">.inline-block</span> {
    <span class="hljs-attribute">display</span>: inline-block;
}</code></pre>
<p><strong>  演示程序：</strong></p>
<p><a href="http://www.42du.cn/run/59" rel="nofollow noreferrer" target="_blank">演示代码</a></p>
<h4>1.3.2 利用<code>display: flex</code>
</h4>
<p>利用弹性布局(<code>flex</code>)，实现水平居中，其中<code>justify-content</code> 用于设置弹性盒子元素在主轴（横轴）方向上的对齐方式，本例中设置子元素水平居中显示。</p>
<p><strong> 核心代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".flex-center {
    display: flex;
    justify-content: center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.flex-center</span> {
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">justify-content</span>: center;
}</code></pre>
<p><strong>  演示程序：</strong></p>
<p><a href="http://www.42du.cn/run/60" rel="nofollow noreferrer" target="_blank">演示代码</a></p>
<h2 id="articleHeader5">2 垂直居中</h2>
<h3 id="articleHeader6">2.1 单行内联(<code>inline-</code>)元素垂直居中</h3>
<p>通过设置内联元素的高度(<code>height</code>)和行高(<code>line-height</code>)相等，从而使元素垂直居中。</p>
<p><strong> 核心代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#v-box {
    height: 120px;
    line-height: 120px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-id">#v-box</span> {
    <span class="hljs-attribute">height</span>: <span class="hljs-number">120px</span>;
    <span class="hljs-attribute">line-height</span>: <span class="hljs-number">120px</span>;
}</code></pre>
<p><strong>  演示程序：</strong></p>
<p><a href="http://www.42du.cn/run/61" rel="nofollow noreferrer" target="_blank">演示代码</a></p>
<h3 id="articleHeader7">2.2 多行元素垂直居中</h3>
<h4>2.2.1 利用表布局（<code>table</code>）</h4>
<p>利用表布局的<code>vertical-align: middle</code>可以实现子元素的垂直居中。</p>
<p><strong> 核心代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".center-table {
    display: table;
}
.v-cell {
    display: table-cell;
    vertical-align: middle;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.center-table</span> {
    <span class="hljs-attribute">display</span>: table;
}
<span class="hljs-selector-class">.v-cell</span> {
    <span class="hljs-attribute">display</span>: table-cell;
    <span class="hljs-attribute">vertical-align</span>: middle;
}</code></pre>
<p><strong>  演示程序：</strong></p>
<p><a href="http://www.42du.cn/run/62" rel="nofollow noreferrer" target="_blank">演示代码</a></p>
<h4>2.2.2 利用flex布局（<code>flex</code>）</h4>
<p>利用flex布局实现垂直居中，其中<code>flex-direction: column</code>定义主轴方向为纵向。因为flex布局是CSS3中定义，在较老的浏览器存在兼容性问题。</p>
<p><strong> 核心代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".center-flex {
    display: flex;
    flex-direction: column;
    justify-content: center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.center-flex</span> {
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">flex-direction</span>: column;
    <span class="hljs-attribute">justify-content</span>: center;
}</code></pre>
<p><strong>  演示程序：</strong></p>
<p><a href="http://www.42du.cn/run/63" rel="nofollow noreferrer" target="_blank">演示代码</a></p>
<h4>2.2.3 利用“精灵元素”</h4>
<p>利用“精灵元素”(ghost element)技术实现垂直居中，即在父容器内放一个100%高度的伪元素，让文本和伪元素垂直对齐，从而达到垂直居中的目的。</p>
<p><strong> 核心代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".ghost-center {
    position: relative;
}
.ghost-center::before {
    content: &quot; &quot;;
    display: inline-block;
    height: 100%;
    width: 1%;
    vertical-align: middle;
}
.ghost-center p {
    display: inline-block;
    vertical-align: middle;
    width: 20rem;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.ghost-center</span> {
    <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-class">.ghost-center</span><span class="hljs-selector-pseudo">::before</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">" "</span>;
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">1%</span>;
    <span class="hljs-attribute">vertical-align</span>: middle;
}
<span class="hljs-selector-class">.ghost-center</span> <span class="hljs-selector-tag">p</span> {
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">vertical-align</span>: middle;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">20rem</span>;
}</code></pre>
<p><strong>  演示程序：</strong></p>
<p><a href="http://www.42du.cn/run/64" rel="nofollow noreferrer" target="_blank">演示代码</a></p>
<h3 id="articleHeader8">2.3 块级元素垂直居中</h3>
<h4>2.3.1 固定高度的块级元素</h4>
<p>我们知道居中元素的高度和宽度，垂直居中问题就很简单。通过绝对定位元素距离顶部50%，并设置<code>margin-top</code>向上偏移元素高度的一半，就可以实现垂直居中了。</p>
<p><strong> 核心代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
  position: relative;
}
.child {
  position: absolute;
  top: 50%;
  height: 100px;
  margin-top: -50px; 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.parent</span> {
  <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-class">.child</span> {
  <span class="hljs-attribute">position</span>: absolute;
  <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
  <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
  <span class="hljs-attribute">margin-top</span>: -<span class="hljs-number">50px</span>; 
}</code></pre>
<p><strong>  演示程序：</strong></p>
<p><a href="http://www.42du.cn/run/65" rel="nofollow noreferrer" target="_blank">演示代码</a></p>
<h4>2.3.2 未知高度的块级元素</h4>
<p>当垂直居中的元素的高度和宽度未知时，我们可以借助CSS3中的<code>transform</code>属性向Y轴反向偏移50%的方法实现垂直居中。但是部分浏览器存在兼容性的问题。</p>
<p><strong> 核心代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
    position: relative;
}
.child {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-class">.child</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(-50%);
}</code></pre>
<p><strong>  演示程序：</strong></p>
<p><a href="http://www.42du.cn/run/66" rel="nofollow noreferrer" target="_blank">演示代码</a></p>
<h2 id="articleHeader9">3 水平垂直居中</h2>
<h3 id="articleHeader10">3.1 固定宽高元素水平垂直居中</h3>
<p>通过margin平移元素整体宽度的一半，使元素水平垂直居中。</p>
<p><strong> 核心代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
    position: relative;
}
.child {
    width: 300px;
    height: 100px;
    padding: 20px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -70px 0 0 -170px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-class">.child</span> {
    <span class="hljs-attribute">width</span>: <span class="hljs-number">300px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">margin</span>: -<span class="hljs-number">70px</span> <span class="hljs-number">0</span> <span class="hljs-number">0</span> -<span class="hljs-number">170px</span>;
}</code></pre>
<p><strong>  演示程序：</strong></p>
<p><a href="http://www.42du.cn/run/67" rel="nofollow noreferrer" target="_blank">演示代码</a></p>
<h3 id="articleHeader11">3.2 未知宽高元素水平垂直居中</h3>
<p>利用2D变换，在水平和垂直两个方向都向反向平移宽高的一半，从而使元素水平垂直居中。</p>
<p><strong> 核心代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
    position: relative;
}
.child {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-class">.child</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-50%, -50%);
}</code></pre>
<p><strong>  演示程序：</strong></p>
<p><a href="http://www.42du.cn/run/68" rel="nofollow noreferrer" target="_blank">演示代码</a></p>
<h3 id="articleHeader12">3.3 利用flex布局</h3>
<p>利用flex布局，其中<code>justify-content</code> 用于设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式；而<code>align-items</code>属性定义flex子项在flex容器的当前行的侧轴（纵轴）方向上的对齐方式。</p>
<p><strong> 核心代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
    display: flex;
    justify-content: center;
    align-items: center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.parent</span> {
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">align-items</span>: center;
}</code></pre>
<p><strong>  演示程序：</strong></p>
<p><a href="http://www.42du.cn/run/69" rel="nofollow noreferrer" target="_blank">演示代码</a></p>
<h3 id="articleHeader13">3.4 利用grid布局</h3>
<p>利用grid实现水平垂直居中，兼容性较差，不推荐。</p>
<p><strong> 核心代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent {
  height: 140px;
  display: grid;
}
.child { 
  margin: auto;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.parent</span> {
  <span class="hljs-attribute">height</span>: <span class="hljs-number">140px</span>;
  <span class="hljs-attribute">display</span>: grid;
}
<span class="hljs-selector-class">.child</span> { 
  <span class="hljs-attribute">margin</span>: auto;
}</code></pre>
<p><strong>  演示程序：</strong></p>
<p><a href="http://www.42du.cn/run/70" rel="nofollow noreferrer" target="_blank">演示代码</a></p>
<h3 id="articleHeader14">3.5 屏幕上水平垂直居中</h3>
<p>屏幕上水平垂直居中十分常用，常规的登录及注册页面都需要用到。要保证较好的兼容性，还需要用到表布局。</p>
<p><strong> 核心代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".outer {
    display: table;
    position: absolute;
    height: 100%;
    width: 100%;
}

.middle {
    display: table-cell;
    vertical-align: middle;
}

.inner {
    margin-left: auto;
    margin-right: auto; 
    width: 400px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.outer</span> {
    <span class="hljs-attribute">display</span>: table;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
}

<span class="hljs-selector-class">.middle</span> {
    <span class="hljs-attribute">display</span>: table-cell;
    <span class="hljs-attribute">vertical-align</span>: middle;
}

<span class="hljs-selector-class">.inner</span> {
    <span class="hljs-attribute">margin-left</span>: auto;
    <span class="hljs-attribute">margin-right</span>: auto; 
    <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>;
}</code></pre>
<p><strong>  演示程序：</strong></p>
<p><a href="http://www.42du.cn/run/10" rel="nofollow noreferrer" target="_blank">演示代码</a></p>
<h2 id="articleHeader15">4 说明</h2>
<p>文中所述文字及代码部分汇编于网络。因时间不足，能力有限等原因，存在文字阐述不准及代码测试不足等诸多问题。因此只限于学习范围，不适用于实际应用。</p>
<p>文中所述方案只是居中方案其中的一部分，并不是全部。另代码中涉及CSS3的flex，transform，grid等内容都存在兼容性问题。</p>
<h2 id="articleHeader16">5 引用参考</h2>
<p><a href="https://css-tricks.com/centering-css-complete-guide/" rel="nofollow noreferrer" target="_blank">Centering in CSS: A Complete Guide </a></p>
<p><a href="https://www.w3.org/Style/Examples/007/center.en.html" rel="nofollow noreferrer" target="_blank">w3.org centering things</a></p>
<p><a href="https://mayvendev.com/blog/how-to-center-anything-with-css" rel="nofollow noreferrer" target="_blank">How To Center Anything With CSS</a></p>
<p><a href="http://www.42du.cn/paper/10" rel="nofollow noreferrer" target="_blank">如何使DIV在屏幕上水平垂直居中显示？</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【基础】这15种CSS居中的方式，你都用过哪几种？

## 原文链接
[https://segmentfault.com/a/1190000013966650](https://segmentfault.com/a/1190000013966650)

