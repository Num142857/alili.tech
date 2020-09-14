---
title: '光照渲染——用canvas模拟光照效果' 
date: 2018-12-18 2:30:11
hidden: true
slug: jlhloj2tlvs
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">光照</h2>
<p>我们能看到物体，是因为光照射在物体上然后反射到我们的眼睛当中。其中的影响因素非常多：观察者的位置、光源的位置、光的颜色、物体表面的颜色、材质和粗糙程度等等。以后我们将会详细探究如何模拟物体的材质，在这篇文章中我们只讨论光源。</p>
<h2 id="articleHeader1">平行光源</h2>
<p>太阳的尺度相对地球来说非常大，所以可以认为从太阳照射来的光线都是平行的，即太阳是一个平行光源。</p>
<p>模拟平行光源的光照非常简单，当光垂直照射到平面上，即光线方向和平面呈90度角时，这时光照是最强的。如果照射的角度不断变大（或者说光线和平面的夹角不断变小），光照也会随之变弱，当光线方向完全和平面平行时，这时没有光能照射到平面上，光强变成了0。</p>
<p>可以总结出，平行光的光照情况和两个方向有关：光线的方向和受光照平面的朝向。</p>
<p>我们用一个垂直于平面的向量去描述平面的朝向，在图形学中，一般把这个向量称为“法向量”。</p>
<p>我们可以用向量的“点乘”运算来计算光强变化。</p>
<blockquote>点乘也叫数量积，是接受在实数R上的两个向量并返回一个实数值标量的二元运算。点乘运算规则非常简单，将两个向量对应坐标的乘积求和就行了。<br><span class="img-wrap"><img data-src="/img/remote/1460000012759735?w=128&amp;h=23" src="https://static.alili.tech/img/remote/1460000012759735?w=128&amp;h=23" alt="" title="" style="cursor: pointer; display: inline;"></span>
</blockquote>
<p>这里我们计算的是三维向量，我们用数组来表示向量，写一个简单的方法来计算点乘：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 点乘运算
 * @param {Array<number>} v1 向量v1
 * @param {Array<number>} v2 向量v2
 * @return {number} 点乘结果
 */
function dot( v1, v2 ) {
    return v1[ 0 ] * v2[ 0 ] + v1[ 1 ] * v2[ 1 ] + v1[ 2 ] * v2[ 2 ];
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smali"><code class="javcascript">/**
 * 点乘运算
 * @param {Array&lt;number&gt;} v1 向量v1
 * @param {Array&lt;number&gt;} v2 向量v2
 * @return {number} 点乘结果
 */
function dot( v1, v2 ) {
   <span class="hljs-built_in"> return </span>v1[ 0 ] * v2[ 0 ] + v1[ 1 ] * v2[ 1 ] + v1[ 2 ] * v2[ 2 ];
}</code></pre>
<p>还有几个重要的向量运算我们也会用到，在这里我们提前定义好，为减小篇幅，这里省略掉具体实现，代码可以看最后的实例源码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * 将向量转为单位向量
 * @param {Array<number>} v
 * @return {Array<number>} 单位向量
 */
function normalize( v ) { /* ... */ }


/**
 * 两向量相减
 * @param {Array<number>} v1
 * @param {Array<number>} v2
 * @return {Array<number>}
 */
function sub( v1, v2 ) { /* ... */ }


/**
 * 计算一个向量的反方向向量
 * @param {Array<number>} v
 * @return {Array<number>}
 */
function negate( v ) { /* ... */ }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">/**
 * 将向量转为单位向量
 * <span class="hljs-doctag">@param</span> {Array&lt;number&gt;} v
 * <span class="hljs-doctag">@return</span> {Array&lt;number&gt;} 单位向量
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">normalize</span><span class="hljs-params">( v )</span> </span>{ <span class="hljs-comment">/* ... */</span> }


<span class="hljs-comment">/**
 * 两向量相减
 * <span class="hljs-doctag">@param</span> {Array&lt;number&gt;} v1
 * <span class="hljs-doctag">@param</span> {Array&lt;number&gt;} v2
 * <span class="hljs-doctag">@return</span> {Array&lt;number&gt;}
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">sub</span><span class="hljs-params">( v1, v2 )</span> </span>{ <span class="hljs-comment">/* ... */</span> }


<span class="hljs-comment">/**
 * 计算一个向量的反方向向量
 * <span class="hljs-doctag">@param</span> {Array&lt;number&gt;} v
 * <span class="hljs-doctag">@return</span> {Array&lt;number&gt;}
 */</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">negate</span><span class="hljs-params">( v )</span> </span>{ <span class="hljs-comment">/* ... */</span> }</code></pre>
<p>我们假设页面的左上角为原点O，右方向为x轴正方向，下方向为y轴正方向，垂直屏幕向外的方向为z轴正方向。我们可以这样定义一个宽高都为500的平面:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var plane = {
    center: [ 250, 250, 0 ],    // 平面中心点坐标
    width: 500,                 // 宽
    height: 500,                // 高
    normal: [ 0, 0, 1 ],        // 朝向，即法向量     
    color: { r: 255, g: 0, b: 0 }   // 颜色为红色
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> plane = {
    <span class="hljs-attr">center</span>: [ <span class="hljs-number">250</span>, <span class="hljs-number">250</span>, <span class="hljs-number">0</span> ],    <span class="hljs-comment">// 平面中心点坐标</span>
    width: <span class="hljs-number">500</span>,                 <span class="hljs-comment">// 宽</span>
    height: <span class="hljs-number">500</span>,                <span class="hljs-comment">// 高</span>
    normal: [ <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span> ],        <span class="hljs-comment">// 朝向，即法向量     </span>
    color: { <span class="hljs-attr">r</span>: <span class="hljs-number">255</span>, <span class="hljs-attr">g</span>: <span class="hljs-number">0</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">0</span> }   <span class="hljs-comment">// 颜色为红色</span>
}</code></pre>
<p>对于平行光，只需要关心它的方向和颜色，我们可以这样来定义一个平行光源：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var directionalLight = {
    direction: [ 0, 0, -1 ],        // 从屏幕外垂直照向屏幕
    color: { r: 255, g: 255, b: 255 }   // 颜色为纯白色
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> directionalLight = {
    <span class="hljs-attr">direction</span>: [ <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">-1</span> ],        <span class="hljs-comment">// 从屏幕外垂直照向屏幕</span>
    color: { <span class="hljs-attr">r</span>: <span class="hljs-number">255</span>, <span class="hljs-attr">g</span>: <span class="hljs-number">255</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">255</span> }   <span class="hljs-comment">// 颜色为纯白色</span>
}</code></pre>
<p>平行光的光线都是平行的，所以它照射到平面上各个位置的效果都是一样的，换言之，整个平面都应该是同一个颜色。<br>根据上面的规则(光强等于光线反方向向量<strong>点乘</strong>平面法向量)，我们可以计算出这个颜色：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ...
var reverseLightDirection = negate( directionalLight.direction );   // 计算平行光的反方向向量
var intensity = dot( reverseLightDirection, plane.normal );         // 计算两向量点乘

// 计算有光照时的颜色
var color = {
    r: intensity * plane.color.r + intensity * directionalLight.r,
    g: intensity * plane.color.g + intensity * directionalLight.g,
    b: intensity * plane.color.b + intensity * directionalLight.g,
}

var canvas = document.getElementById( 'canvas' );
var ctx = canvas.getElementById( '2d' );
ctx.rect( plane.center[ 0 ], plane.center[ 1 ], plane.width, plane.height );
ctx.fillStyle = 'rgb(' + color.r + ',' + color.g + ',' + color.b ')';
ctx.fill();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// ...</span>
<span class="hljs-keyword">var</span> reverseLightDirection = negate( directionalLight.direction );   <span class="hljs-comment">// 计算平行光的反方向向量</span>
<span class="hljs-keyword">var</span> intensity = dot( reverseLightDirection, plane.normal );         <span class="hljs-comment">// 计算两向量点乘</span>

<span class="hljs-comment">// 计算有光照时的颜色</span>
<span class="hljs-keyword">var</span> color = {
    <span class="hljs-attr">r</span>: intensity * plane.color.r + intensity * directionalLight.r,
    <span class="hljs-attr">g</span>: intensity * plane.color.g + intensity * directionalLight.g,
    <span class="hljs-attr">b</span>: intensity * plane.color.b + intensity * directionalLight.g,
}

<span class="hljs-keyword">var</span> canvas = <span class="hljs-built_in">document</span>.getElementById( <span class="hljs-string">'canvas'</span> );
<span class="hljs-keyword">var</span> ctx = canvas.getElementById( <span class="hljs-string">'2d'</span> );
ctx.rect( plane.center[ <span class="hljs-number">0</span> ], plane.center[ <span class="hljs-number">1</span> ], plane.width, plane.height );
ctx.fillStyle = <span class="hljs-string">'rgb('</span> + color.r + <span class="hljs-string">','</span> + color.g + <span class="hljs-string">','</span> + color.b <span class="hljs-string">')'</span>;
ctx.fill();</code></pre>
<p>我写了一个示例，可以调整光线方向来观察不同方向下的光照效果。<br><a href="https://hujiulong.github.io/blog/demo/light/directionalLight.html" rel="nofollow noreferrer" target="_blank">在线运行示例</a><br><span class="img-wrap"><img data-src="/img/remote/1460000012742074?w=855&amp;h=517" src="https://static.alili.tech/img/remote/1460000012742074?w=855&amp;h=517" alt="4" title="4" style="cursor: pointer;"></span></p>
<h2 id="articleHeader2">点光源</h2>
<p>在日常生活中，点光源更加常见，白炽灯、台灯等都可以认为是点光源。</p>
<p>首先，我们先定义一个点光源，对于一个点光源来说，我们只需要关心它的位置和颜色：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var pointLight = {
    position: [ 250, 250, 100 ],    // 光源位于平面中心上方100处
    color: { r: 255, g: 255, b: 255 }   // 颜色为纯白色
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> pointLight = {
    <span class="hljs-attr">position</span>: [ <span class="hljs-number">250</span>, <span class="hljs-number">250</span>, <span class="hljs-number">100</span> ],    <span class="hljs-comment">// 光源位于平面中心上方100处</span>
    color: { <span class="hljs-attr">r</span>: <span class="hljs-number">255</span>, <span class="hljs-attr">g</span>: <span class="hljs-number">255</span>, <span class="hljs-attr">b</span>: <span class="hljs-number">255</span> }   <span class="hljs-comment">// 颜色为纯白色</span>
}</code></pre>
<p>光强的计算规则仍然不变：光强等于光线反方向向量点乘平面法向量。但是点光源的光是从一个点发射出来，它们照射到平面上时，所有光线的方向都不一样。所以，我们必须挨个计算平面上所有像素的光强。</p>
<p>这里需要用到canvas提供的<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/putImageData" rel="nofollow noreferrer" target="_blank">putImageData</a>，这个方法可以直接填入一个区域的像素颜色值来绘图。代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ...
var imageData = ctx.createImageData( 500, 500 );    // 创建一个ImageData，用来保存像素数据

for ( var x = 0; x < imageData.width; x++ ) {
    for ( var y = 0; y < imageData.height; y++ ) {
        var index = y * imageData.width + x;        // 当前计算的像素点的索引

        var point = [ x, y, 0 ];
        var normal = [ 0, 0, 1 ];

        var reverseLightDirection = normalize( sub( pointLight.position, point ) );  // 光线方向的反方向向量

        var light = dot( reverseLightDirection, normal );

        imageData.data[ index * 4 ] = pointLight.color.r * intensity + plane.color.r * intensity;
        imageData.data[ index * 4 + 1 ] = pointLight.color.g * intensity + plane.color.g * intensity;
        imageData.data[ index * 4 + 2 ] = pointLight.color.b * intensity + plane.color.b * intensity;
        imageData.data[ index * 4 + 3 ] = 255;
    }
}

ctx.putImageData( imageData, 100, 100 );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// ...</span>
<span class="hljs-keyword">var</span> imageData = ctx.createImageData( <span class="hljs-number">500</span>, <span class="hljs-number">500</span> );    <span class="hljs-comment">// 创建一个ImageData，用来保存像素数据</span>

<span class="hljs-keyword">for</span> ( <span class="hljs-keyword">var</span> x = <span class="hljs-number">0</span>; x &lt; imageData.width; x++ ) {
    <span class="hljs-keyword">for</span> ( <span class="hljs-keyword">var</span> y = <span class="hljs-number">0</span>; y &lt; imageData.height; y++ ) {
        <span class="hljs-keyword">var</span> index = y * imageData.width + x;        <span class="hljs-comment">// 当前计算的像素点的索引</span>

        <span class="hljs-keyword">var</span> point = [ x, y, <span class="hljs-number">0</span> ];
        <span class="hljs-keyword">var</span> normal = [ <span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">1</span> ];

        <span class="hljs-keyword">var</span> reverseLightDirection = normalize( sub( pointLight.position, point ) );  <span class="hljs-comment">// 光线方向的反方向向量</span>

        <span class="hljs-keyword">var</span> light = dot( reverseLightDirection, normal );

        imageData.data[ index * <span class="hljs-number">4</span> ] = pointLight.color.r * intensity + plane.color.r * intensity;
        imageData.data[ index * <span class="hljs-number">4</span> + <span class="hljs-number">1</span> ] = pointLight.color.g * intensity + plane.color.g * intensity;
        imageData.data[ index * <span class="hljs-number">4</span> + <span class="hljs-number">2</span> ] = pointLight.color.b * intensity + plane.color.b * intensity;
        imageData.data[ index * <span class="hljs-number">4</span> + <span class="hljs-number">3</span> ] = <span class="hljs-number">255</span>;
    }
}

ctx.putImageData( imageData, <span class="hljs-number">100</span>, <span class="hljs-number">100</span> );</code></pre>
<p>这样就可以看到结果了：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012742075?w=300&amp;h=303" src="https://static.alili.tech/img/remote/1460000012742075?w=300&amp;h=303" alt="tim 20180107034502" title="tim 20180107034502" style="cursor: pointer;"></span></p>
<p>我写了一个更复杂一点的例子，可以通过鼠标去移动光源，滑动滚轮来改变光源高度:<br><a href="https://hujiulong.github.io/blog/demo/light/pointLight.html" rel="nofollow noreferrer" target="_blank">在线运行示例</a></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012742076?w=633&amp;h=558" src="https://static.alili.tech/img/remote/1460000012742076?w=633&amp;h=558" alt="5" title="5" style="cursor: pointer;"></span></p>
<p>动态图看起来有很多圈圈，实际上并没有，可以自己玩一下</p>
<h2 id="articleHeader3">WebGL的优势</h2>
<p>对于一个<code>500*500</code>的平面，我们去计算它在点光源光照下的颜色，需要挨个计算平面上所有点，需要循环<code>500*500=250000</code>次，这其实是非常低效的。并且在做复杂场景的渲染时，不会只有一个光源，而且还会有投影等计算，计算量将会非常大。</p>
<p>从更底层的角度来说，这是因为每次计算都是由<strong>CPU</strong>完成的，而CPU只能串行计算，它只能完成一个计算以后才能开始下一次计算，所以非常缓慢。</p>
<p>这种复杂的渲染其实更适合用WebGL来做，因为每一次计算其实前后无关，WebGL可以利用<strong>GPU</strong>的并行计算能力，<strong>同时</strong>去计算所有点的光照强度。一个<code>500*500</code>的平面，理论上只需要花一次计算的时间，这个提升是非常大的。</p>
<p>这篇文章也是想通过这个简单的光照计算来引出WebGL，后面的文章我会用WebGL来重新实现这个效果。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012742077?w=1226&amp;h=579" src="https://static.alili.tech/img/remote/1460000012742077?w=1226&amp;h=579" alt="tim 20180107040503" title="tim 20180107040503" style="cursor: pointer;"></span><br>WebGL渲染的光照效果</p>
<h2 id="articleHeader4">关于我的博客</h2>
<p>这篇文章到这里就结束了。</p>
<p>我计划写一系列关于前端图形渲染的文章，将会涵盖常用的前端图形绘制技术:canvas、svg和WebGL。希望通过这一系列文章能让读者对前端的各种图形绘制接口以及图像处理、图形学的基础知识有所了解。希望在分享的同时，也能巩固和复习自己所学知识，和大家共同进步。</p>
<blockquote>系列博客地址：<a href="https://github.com/hujiulong/blog" rel="nofollow noreferrer" target="_blank">https://github.com/hujiulong/...</a>
</blockquote>
<p>如果能帮助到你，欢迎star，这样也能及时追踪博客的更新。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
光照渲染——用canvas模拟光照效果

## 原文链接
[https://segmentfault.com/a/1190000012759729](https://segmentfault.com/a/1190000012759729)

