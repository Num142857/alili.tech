---
title: '【整理】CSS布局方案' 
date: 2019-01-02 2:30:08
hidden: true
slug: 5fc6vis50ef
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000010989115" src="https://static.alili.tech/img/remote/1460000010989115" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>我们在日常开发中经常遇到布局问题，下面罗列几种常用的css布局方案<br>话不多说，上代码！</p></blockquote>
<blockquote><p>以下所有demo的源码<br>github：<a href="https://github.com/zwwill/css-layout/tree/master/demo-1" rel="nofollow noreferrer" target="_blank">https://github.com/zwwill/css-layout/tree/master/demo-1</a><br>链接: <a href="http://pan.baidu.com/s/1cHBH3g" rel="nofollow noreferrer" target="_blank">http://pan.baidu.com/s/1cHBH3g  </a>  <br>密码:obkb</p></blockquote>
<h1 id="articleHeader0">居中布局</h1>
<blockquote><p>以下居中布局均以不定宽为前提，定宽情况包含其中</p></blockquote>
<h2 id="articleHeader1">1、水平居中</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010989116" src="https://static.alili.tech/img/remote/1460000010989116" alt="效果图" title="效果图" style="cursor: pointer;"></span></p>
<h3 id="articleHeader2">a) inline-block + text-align</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent{
    text-align: center;
}
.child{
    display: inline-block;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.parent</span>{
    <span class="hljs-attribute">text-align</span>: center;
}
<span class="hljs-selector-class">.child</span>{
    <span class="hljs-attribute">display</span>: inline-block;
}</code></pre>
<p>tips：此方案兼容性较好，可兼容至IE8，对于IE567并不支持inline-block，需要使用css hack进行兼容</p>
<h3 id="articleHeader3">b) table + margin</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".child{
    display: table;
    margin: 0 auto;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.child</span>{
    <span class="hljs-attribute">display</span>: table;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
}</code></pre>
<p>tips：此方案兼容至IE8，可以使用<code>&lt;table/&gt;</code>代替css写法，兼容性良好</p>
<h3 id="articleHeader4">c) absolute + transform</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent{
    position: relative;
    height:1.5em;
}
.child{
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.parent</span>{
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">1.5em</span>;
}
<span class="hljs-selector-class">.child</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateX</span>(-50%);
}</code></pre>
<p>tips：此方案兼容至IE9，因为transform兼容性限制，如果<code>.child</code>为定宽元素，可以使用以下写法，兼容性极佳</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
.parent{
    position: relative;
    height:1.5em;
}
.child{
    position: absolute;
    width:100px;
    left: 50%;
    margin-left:-50px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css">
<span class="hljs-selector-class">.parent</span>{
    <span class="hljs-attribute">position</span>: relative;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">1.5em</span>;
}
<span class="hljs-selector-class">.child</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">100px</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">margin-left</span>:-<span class="hljs-number">50px</span>;
}</code></pre>
<h3 id="articleHeader5">d) flex + justify-content</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent{
    display: flex;
    justify-content: center;
}
.child{
    margin: 0 auto;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.parent</span>{
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">justify-content</span>: center;
}
<span class="hljs-selector-class">.child</span>{
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> auto;
}</code></pre>
<p>tips：flex是一个强大的css，生而为布局，它可以轻松的满足各种居中、对其、平分的布局要求，但由于现浏览器兼容性问题，此方案很少被使用，但是值得期待浏览器兼容性良好但那一天！</p>
<h2 id="articleHeader6">2、垂直</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010989117" src="https://static.alili.tech/img/remote/1460000010989117" alt="效果图" title="效果图" style="cursor: pointer;"></span></p>
<h3 id="articleHeader7">a) table-cell + vertial-align</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent{
    display: table-cell;
    vertical-align: middle;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.parent</span>{
    <span class="hljs-attribute">display</span>: table-cell;
    <span class="hljs-attribute">vertical-align</span>: middle;
}</code></pre>
<p>tips：可替换成<code>&lt;table /&gt;</code>布局，兼容性良好</p>
<h3 id="articleHeader8">b) absolute + transform</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent{
    position: relative;
}
.child{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.parent</span>{
    <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-class">.child</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translateY</span>(-50%);
}</code></pre>
<p>tips：存在css3兼容问题，定宽兼容性良好</p>
<h3 id="articleHeader9">c) flex + align-items</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent{
    display: flex;
    align-items: center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.parent</span>{
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">align-items</span>: center;
}</code></pre>
<p>tips：高版本浏览器兼容，低版本不适用</p>
<h2 id="articleHeader10">3、水平垂直</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010989118" src="https://static.alili.tech/img/remote/1460000010989118" alt="效果图" title="效果图" style="cursor: pointer; display: inline;"></span></p>
<p>a) inline-block + table-cell + text-align + vertical-align</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent{
    text-align: center;
    display: table-cell;
    vertical-align: middle;
}
.child{
    display: inline-block;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.parent</span>{
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">display</span>: table-cell;
    <span class="hljs-attribute">vertical-align</span>: middle;
}
<span class="hljs-selector-class">.child</span>{
    <span class="hljs-attribute">display</span>: inline-block;
}</code></pre>
<p>tips：兼容至IE8<br>b) absolute + transform</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent{
    position: relative;
}
.child{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.parent</span>{
    <span class="hljs-attribute">position</span>: relative;
}
<span class="hljs-selector-class">.child</span>{
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-50%,-50%);
}</code></pre>
<p>tips：兼容性稍差，兼容IE10以上<br>c) flex</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent{
    display: flex;
    justify-content: center;
    align-items: center;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.parent</span>{
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">justify-content</span>: center;
    <span class="hljs-attribute">align-items</span>: center;
}</code></pre>
<p>tips：兼容差</p>
<h1 id="articleHeader11">多列布局</h1>
<h2 id="articleHeader12">1、一列定宽，一列自适应</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010989119" src="https://static.alili.tech/img/remote/1460000010989119" alt="效果图" title="效果图" style="cursor: pointer;"></span></p>
<p>a) float + margin</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".left{
    float: left;
    width: 100px;
}
.right{
    margin-left: 120px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.left</span>{
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
}
<span class="hljs-selector-class">.right</span>{
    <span class="hljs-attribute">margin-left</span>: <span class="hljs-number">120px</span>;
}</code></pre>
<p>tips：此方案对于定宽布局比较好，不定宽布局推荐方法b<br>b) float + overflow</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".left{
    float: left;
    width: 100px;
    margin-right: 20px;
}
.right{
    overflow: hidden;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.left</span>{
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">20px</span>;
}
<span class="hljs-selector-class">.right</span>{
    <span class="hljs-attribute">overflow</span>: hidden;
}</code></pre>
<p>tips：个人常用写法，此方案不管是多列定宽或是不定宽，都可以完美实现，同时可以实现登高布局<br>c) table</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent{
    display: table; width: 100%;
    table-layout: fixed;
}
.left,.right{
    display: table-cell;
}
.left{
    width: 100px;
    padding-right: 20px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.parent</span>{
    <span class="hljs-attribute">display</span>: table; <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">table-layout</span>: fixed;
}
<span class="hljs-selector-class">.left</span>,<span class="hljs-selector-class">.right</span>{
    <span class="hljs-attribute">display</span>: table-cell;
}
<span class="hljs-selector-class">.left</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">padding-right</span>: <span class="hljs-number">20px</span>;
}</code></pre>
<p>d) flex</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent{
    display: flex;
}
.left{
    width: 100px;
    padding-right: 20px;
}
.right{
    flex: 1;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.parent</span>{
    <span class="hljs-attribute">display</span>: flex;
}
<span class="hljs-selector-class">.left</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">padding-right</span>: <span class="hljs-number">20px</span>;
}
<span class="hljs-selector-class">.right</span>{
    <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>;
}</code></pre>
<h2 id="articleHeader13">2、多列定宽，一列自适应</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010989120" src="https://static.alili.tech/img/remote/1460000010989120" alt="效果图" title="效果图" style="cursor: pointer;"></span></p>
<p>a) float + overflow</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".left,.center{
    float: left;
    width: 100px;
    margin-right: 20px;
}
.right{
    overflow: hidden;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.left</span>,<span class="hljs-selector-class">.center</span>{
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">20px</span>;
}
<span class="hljs-selector-class">.right</span>{
    <span class="hljs-attribute">overflow</span>: hidden;
}</code></pre>
<p>b) table</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent{
    display: table; width: 100%;
    table-layout: fixed;
}
.left,.center,.right{
    display: table-cell;
}
.right{
    width: 100px;
    padding-right: 20px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.parent</span>{
    <span class="hljs-attribute">display</span>: table; <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">table-layout</span>: fixed;
}
<span class="hljs-selector-class">.left</span>,<span class="hljs-selector-class">.center</span>,<span class="hljs-selector-class">.right</span>{
    <span class="hljs-attribute">display</span>: table-cell;
}
<span class="hljs-selector-class">.right</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">padding-right</span>: <span class="hljs-number">20px</span>;
}</code></pre>
<p>c) flex</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent{
    display: flex;
}
.left,.center{
    width: 100px;
    padding-right: 20px;
}
.right{
    flex: 1;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.parent</span>{
    <span class="hljs-attribute">display</span>: flex;
}
<span class="hljs-selector-class">.left</span>,<span class="hljs-selector-class">.center</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">padding-right</span>: <span class="hljs-number">20px</span>;
}
<span class="hljs-selector-class">.right</span>{
    <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>;
}</code></pre>
<h2 id="articleHeader14">3、一列不定宽，一列自适应</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010989121" src="https://static.alili.tech/img/remote/1460000010989121" alt="效果图" title="效果图" style="cursor: pointer;"></span></p>
<p>a) float + overflow</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".left{
    float: left;
    margin-right: 20px;
}
.right{
    overflow: hidden;
}
.left p{width: 200px;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.left</span>{
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">20px</span>;
}
<span class="hljs-selector-class">.right</span>{
    <span class="hljs-attribute">overflow</span>: hidden;
}
<span class="hljs-selector-class">.left</span> <span class="hljs-selector-tag">p</span>{<span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;}</code></pre>
<p>b) table</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent{
    display: table; width: 100%;
}
.left,.right{
    display: table-cell;
}
.left{
    width: 0.1%;
    padding-right: 20px;
}
.left p{width:200px;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.parent</span>{
    <span class="hljs-attribute">display</span>: table; <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
}
<span class="hljs-selector-class">.left</span>,<span class="hljs-selector-class">.right</span>{
    <span class="hljs-attribute">display</span>: table-cell;
}
<span class="hljs-selector-class">.left</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0.1%</span>;
    <span class="hljs-attribute">padding-right</span>: <span class="hljs-number">20px</span>;
}
<span class="hljs-selector-class">.left</span> <span class="hljs-selector-tag">p</span>{<span class="hljs-attribute">width</span>:<span class="hljs-number">200px</span>;}</code></pre>
<p>c) flex</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent{
    display: flex;
}
.left{
    margin-right: 20px;
}
.right{
    flex: 1;
}
.left p{width: 200px;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.parent</span>{
    <span class="hljs-attribute">display</span>: flex;
}
<span class="hljs-selector-class">.left</span>{
    <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">20px</span>;
}
<span class="hljs-selector-class">.right</span>{
    <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>;
}
<span class="hljs-selector-class">.left</span> <span class="hljs-selector-tag">p</span>{<span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;}</code></pre>
<h2 id="articleHeader15">4、多列不定宽，一列自适应</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010989122" src="https://static.alili.tech/img/remote/1460000010989122" alt="效果图" title="效果图" style="cursor: pointer;"></span></p>
<p>a) float + overflow</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".left,.center{
    float: left;
    margin-right: 20px;
}
.right{
    overflow: hidden;
}
.left p,.center p{
    width: 100px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.left</span>,<span class="hljs-selector-class">.center</span>{
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">20px</span>;
}
<span class="hljs-selector-class">.right</span>{
    <span class="hljs-attribute">overflow</span>: hidden;
}
<span class="hljs-selector-class">.left</span> <span class="hljs-selector-tag">p</span>,<span class="hljs-selector-class">.center</span> <span class="hljs-selector-tag">p</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
}</code></pre>
<h2 id="articleHeader16">5、等分</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010989123" src="https://static.alili.tech/img/remote/1460000010989123" alt="效果图" title="效果图" style="cursor: pointer;"></span><br>a) float + margin</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent{
    margin-left: -20px;
}
.column{
    float: left;
    width: 25%;
    padding-left: 20px;
    box-sizing: border-box;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.parent</span>{
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">20px</span>;
}
<span class="hljs-selector-class">.column</span>{
    <span class="hljs-attribute">float</span>: left;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">25%</span>;
    <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">20px</span>;
    <span class="hljs-attribute">box-sizing</span>: border-box;
}</code></pre>
<p>b) table + margin</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent-fix{
    margin-left: -20px;
}
.parent{
    display: table;
    width:100%;
    table-layout: fixed;
}
.column{
    display: table-cell;
    padding-left: 20px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.parent-fix</span>{
    <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">20px</span>;
}
<span class="hljs-selector-class">.parent</span>{
    <span class="hljs-attribute">display</span>: table;
    <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
    <span class="hljs-attribute">table-layout</span>: fixed;
}
<span class="hljs-selector-class">.column</span>{
    <span class="hljs-attribute">display</span>: table-cell;
    <span class="hljs-attribute">padding-left</span>: <span class="hljs-number">20px</span>;
}</code></pre>
<p>c) flex</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent{
    display: flex;
}
.column{
    flex: 1;
}
.column+.column{
    margin-left:20px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.parent</span>{
    <span class="hljs-attribute">display</span>: flex;
}
<span class="hljs-selector-class">.column</span>{
    <span class="hljs-attribute">flex</span>: <span class="hljs-number">1</span>;
}
<span class="hljs-selector-class">.column</span>+<span class="hljs-selector-class">.column</span>{
    <span class="hljs-attribute">margin-left</span>:<span class="hljs-number">20px</span>;
}</code></pre>
<h2 id="articleHeader17">6、等高</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010989124" src="https://static.alili.tech/img/remote/1460000010989124" alt="效果图" title="效果图" style="cursor: pointer; display: inline;"></span><br>a) float + overflow</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent{
    overflow: hidden;
}
.left,.right{
    padding-bottom: 9999px;
    margin-bottom: -9999px;
}
.left{
    float: left; width: 100px;
}
.right{
    overflow: hidden;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.parent</span>{
    <span class="hljs-attribute">overflow</span>: hidden;
}
<span class="hljs-selector-class">.left</span>,<span class="hljs-selector-class">.right</span>{
    <span class="hljs-attribute">padding-bottom</span>: <span class="hljs-number">9999px</span>;
    <span class="hljs-attribute">margin-bottom</span>: -<span class="hljs-number">9999px</span>;
}
<span class="hljs-selector-class">.left</span>{
    <span class="hljs-attribute">float</span>: left; <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
}
<span class="hljs-selector-class">.right</span>{
    <span class="hljs-attribute">overflow</span>: hidden;
}</code></pre>
<p>b) table</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent{
    display: table; 
    width: 100%;
}
.left{
    display:table-cell; 
    width: 100px;
    margin-right: 20px;
}
.right{
    display:table-cell; 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.parent</span>{
    <span class="hljs-attribute">display</span>: table; 
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
}
<span class="hljs-selector-class">.left</span>{
    <span class="hljs-attribute">display</span>:table-cell; 
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
    <span class="hljs-attribute">margin-right</span>: <span class="hljs-number">20px</span>;
}
<span class="hljs-selector-class">.right</span>{
    <span class="hljs-attribute">display</span>:table-cell; 
}</code></pre>
<p>c) flex</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".parent{
    display:flex;
    width: 100%;
}
.left{
    width: 100px;
}
.right{
    flex:1;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.parent</span>{
    <span class="hljs-attribute">display</span>:flex;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
}
<span class="hljs-selector-class">.left</span>{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
}
<span class="hljs-selector-class">.right</span>{
    <span class="hljs-attribute">flex</span>:<span class="hljs-number">1</span>;
}</code></pre>
<h1 id="articleHeader18">并排等分，单排对齐靠左布局</h1>
<p>效果图<br><span class="img-wrap"><img data-src="/img/remote/1460000011002323" src="https://static.alili.tech/img/remote/1460000011002323" alt="效果图" title="效果图" style="cursor: pointer;"></span></p>
<h2 id="articleHeader19">flex</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".main {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
}
.item {
    display: inline-block;
}
.empty{
    height: 0;
    visibility: hidden;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.main</span> {
    <span class="hljs-attribute">display</span>: flex;
    <span class="hljs-attribute">flex-flow</span>: row wrap;
    <span class="hljs-attribute">justify-content</span>: space-between;
}
<span class="hljs-selector-class">.item</span> {
    <span class="hljs-attribute">display</span>: inline-block;
}
<span class="hljs-selector-class">.empty</span>{
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">visibility</span>: hidden;
}</code></pre>
<p>具体详解请见下文<br><a href="https://segmentfault.com/a/1190000011007357">https://segmentfault.com/a/1190000011007357</a></p>
<h1 id="articleHeader20">圣杯布局&amp;双飞翼布局</h1>
<blockquote><p>此处仅为代码展示，差别讲解请移驾下文<br><a href="https://segmentfault.com/a/1190000011149400" target="_blank">【方案】圣杯布局&amp;双飞翼布局</a></p></blockquote>
<h2 id="articleHeader21">圣杯布局</h2>
<p><span class="img-wrap"><img data-src="/img/bVUWBQ?w=1046&amp;h=632" src="https://static.alili.tech/img/bVUWBQ?w=1046&amp;h=632" alt="" title="" style="cursor: pointer;"></span></p>
<p>【JsFiddle】<br><a href="https://jsfiddle.net/zwwill/px57xzp4/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/zwwill/px57xzp4/</a><button class="btn btn-xs btn-default ml10 preview" data-url="zwwill/px57xzp4/" data-typeid="0">点击预览</button></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;container&quot;>
    <div class=&quot;header&quot;>header</div>
    <div class=&quot;wrapper clearfix&quot;>
        <div class=&quot;main col&quot;>main</div>
        <div class=&quot;left col&quot;>left</div>
        <div class=&quot;right col&quot;>right</div>
    </div>
    <div class=&quot;footer&quot;>footer</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"header"</span>&gt;</span>header<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrapper clearfix"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"main col"</span>&gt;</span>main<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left col"</span>&gt;</span>left<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right col"</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"footer"</span>&gt;</span>footer<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container {width: 500px; margin: 50px auto;}
.wrapper {padding: 0 100px 0 100px;}
.col {position: relative; float: left;}
.header,.footer {height: 50px;}
.main {width: 100%;height: 200px;}
.left {width: 100px; height: 200px; margin-left: -100%;left: -100px;}
.right {width: 100px; height: 200px; margin-left: -100px; right: -100px;}
.clearfix::after {content: &quot;&quot;; display: block; clear: both; visibility: hidden; height: 0; overflow: hidden;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.container</span> {<span class="hljs-attribute">width</span>: <span class="hljs-number">500px</span>; <span class="hljs-attribute">margin</span>: <span class="hljs-number">50px</span> auto;}
<span class="hljs-selector-class">.wrapper</span> {<span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">100px</span> <span class="hljs-number">0</span> <span class="hljs-number">100px</span>;}
<span class="hljs-selector-class">.col</span> {<span class="hljs-attribute">position</span>: relative; <span class="hljs-attribute">float</span>: left;}
<span class="hljs-selector-class">.header</span>,<span class="hljs-selector-class">.footer</span> {<span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;}
<span class="hljs-selector-class">.main</span> {<span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;<span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;}
<span class="hljs-selector-class">.left</span> {<span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>; <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>; <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">100%</span>;<span class="hljs-attribute">left</span>: -<span class="hljs-number">100px</span>;}
<span class="hljs-selector-class">.right</span> {<span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>; <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>; <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">100px</span>; <span class="hljs-attribute">right</span>: -<span class="hljs-number">100px</span>;}
<span class="hljs-selector-class">.clearfix</span><span class="hljs-selector-pseudo">::after</span> {<span class="hljs-attribute">content</span>: <span class="hljs-string">""</span>; <span class="hljs-attribute">display</span>: block; <span class="hljs-attribute">clear</span>: both; <span class="hljs-attribute">visibility</span>: hidden; <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">overflow</span>: hidden;}</code></pre>
<h2 id="articleHeader22">双飞翼布局</h2>
<p><span class="img-wrap"><img data-src="/img/bVUWBQ?w=1046&amp;h=632" src="https://static.alili.tech/img/bVUWBQ?w=1046&amp;h=632" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote><p>ps: <br>“这不是一样的图嘛？”<br>“对！就是一样的，因为是解决同一种问题的嘛。”</p></blockquote>
<p>【JsFiddle】<br><a href="https://jsfiddle.net/zwwill/5xjyeu9d/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/zwwill/5xjyeu9d/</a><button class="btn btn-xs btn-default ml10 preview" data-url="zwwill/5xjyeu9d/" data-typeid="0">点击预览</button></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;container&quot;>
    <div class=&quot;header&quot;>header</div>
    <div class=&quot;wrapper clearfix&quot;>
        <div class=&quot;main col&quot;>
            <div class=&quot;main-wrap&quot;>main</div>
        </div>
        <div class=&quot;left col&quot;>left</div>
        <div class=&quot;right col&quot;>right</div>
    </div>
    <div class=&quot;footer&quot;>footer</div>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"container"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"header"</span>&gt;</span>header<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"wrapper clearfix"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"main col"</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"main-wrap"</span>&gt;</span>main<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"left col"</span>&gt;</span>left<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"right col"</span>&gt;</span>right<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"footer"</span>&gt;</span>footer<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".col {float: left;}
.header {height: 50px;}
.main {width: 100%;}
.main-wrap {margin: 0 100px 0 100px;height: 200px;}
.left {width: 100px; height: 200px; margin-left: -100%;}
.right {width: 100px; height: 200px; margin-left: -100px;}
.footer {height: 50px;}
.clearfix::after {content: &quot;&quot;; display: block; clear: both; visibility: hidden; height: 0; overflow: hidden;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.col</span> {<span class="hljs-attribute">float</span>: left;}
<span class="hljs-selector-class">.header</span> {<span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;}
<span class="hljs-selector-class">.main</span> {<span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;}
<span class="hljs-selector-class">.main-wrap</span> {<span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">100px</span> <span class="hljs-number">0</span> <span class="hljs-number">100px</span>;<span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>;}
<span class="hljs-selector-class">.left</span> {<span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>; <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>; <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">100%</span>;}
<span class="hljs-selector-class">.right</span> {<span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>; <span class="hljs-attribute">height</span>: <span class="hljs-number">200px</span>; <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">100px</span>;}
<span class="hljs-selector-class">.footer</span> {<span class="hljs-attribute">height</span>: <span class="hljs-number">50px</span>;}
<span class="hljs-selector-class">.clearfix</span><span class="hljs-selector-pseudo">::after</span> {<span class="hljs-attribute">content</span>: <span class="hljs-string">""</span>; <span class="hljs-attribute">display</span>: block; <span class="hljs-attribute">clear</span>: both; <span class="hljs-attribute">visibility</span>: hidden; <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">overflow</span>: hidden;}</code></pre>
<h2 id="articleHeader23">无名布局</h2>
<p>自己瞎搞的，简单的绝对定位即可解决问题，为啥还要搞什么圣杯和双飞翼<br><a href="https://jsfiddle.net/zwwill/awwkpwbL/" rel="nofollow noreferrer" target="_blank">https://jsfiddle.net/zwwill/a...</a><button class="btn btn-xs btn-default ml10 preview" data-url="zwwill/awwkpwbL/" data-typeid="0">点击预览</button></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;header&quot;>header</div>
<div class=&quot;wrapper&quot;>
    <div class=&quot;main col&quot;>
        main
    </div>
    <div class=&quot;left col&quot;>
        left
    </div>
    <div class=&quot;right col&quot;>
        right
    </div>
</div>
<div class=&quot;footer&quot;>footer</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"header"</span>&gt;header&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"wrapper"</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"main col"</span>&gt;
        main
    &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"left col"</span>&gt;
        left
    &lt;/<span class="hljs-keyword">div</span>&gt;
    &lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"right col"</span>&gt;
        right
    &lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;<span class="hljs-keyword">div</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"footer"</span>&gt;footer&lt;/<span class="hljs-keyword">div</span>&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".wrapper { position: relative; }
.main { margin:0 100px;}
.left { position: absolute; left: 0; top: 0;}
.right { position: absolute; right: 0; top: 0;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.wrapper</span> { <span class="hljs-attribute">position</span>: relative; }
<span class="hljs-selector-class">.main</span> { <span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span> <span class="hljs-number">100px</span>;}
<span class="hljs-selector-class">.left</span> { <span class="hljs-attribute">position</span>: absolute; <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;}
<span class="hljs-selector-class">.right</span> { <span class="hljs-attribute">position</span>: absolute; <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>; <span class="hljs-attribute">top</span>: <span class="hljs-number">0</span>;}</code></pre>
<blockquote><p>如果你觉得此文对你有一定的帮助，可以点击下方的【喜欢】收藏备用</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【整理】CSS布局方案

## 原文链接
[https://segmentfault.com/a/1190000010989110](https://segmentfault.com/a/1190000010989110)

