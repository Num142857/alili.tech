---
title: '纯CSS画三角原理解析' 
date: 2018-12-12 2:30:10
hidden: true
slug: qpi0omumq49
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">纯CSS画三角原理解析</h1>
<p>因为之前做一个页面出现了很多三角，开始直接用图片感觉并不是很好用，看着总是怪怪的颜色还很难调整的跟背景一样，就搜了一波代码直接用上了，事后想了一下感觉不知道具体原理是什么，很奇怪为什么<strong>边框</strong>能设置成三角的样式。于是搜了一波原理整理如下</p>
<h1 id="articleHeader1">1.边框到底是什么样的？</h1>
<p>因为很少用到很粗的边框，而且90%的情况下我们用边框都是一个颜色的。所以我发现我并不知道边框到底是什么样子的，一直一来我都以为四条边都是一条线（不要告诉我就我一个人这样认为）。</p>
<p>实验了一下才发现边框越来越粗的时候，很明显每条边都是一个<strong>梯形</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013425517?w=1356&amp;h=361" src="https://static.alili.tech/img/remote/1460000013425517?w=1356&amp;h=361" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader2">2.如何做出三角？</h1>
<p>因为之前看的代码都会写上<code>width: 0; height: 0;</code>当时不理解为什么，现在很容易就能想到，用极限的思维，当内容大小<strong>趋近与零</strong>的时候,每个边就是一个三角了。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013425518?w=1581&amp;h=385" src="https://static.alili.tech/img/remote/1460000013425518?w=1581&amp;h=385" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>这个时候就可以看到三角已经出现，我们要做的就是把其他边设置为透明的就可以得到我们需要的三角了。</p>
<h1 id="articleHeader3">3.还有没有更多的情况？</h1>
<p>通过分别取消边框发现下面几种情况：</p>
<ul>
<li>取消一条边的时候，与这条边相邻的两条边的接触部分会变成直的</li>
<li>当仅有邻边时， 两个边会变成对分的三角</li>
<li>当保留边没有其他接触时，极限情况所有东西都会消失。</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013425519?w=1455&amp;h=325" src="https://static.alili.tech/img/remote/1460000013425519?w=1455&amp;h=325" alt="图像 022.png" title="图像 022.png" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000013425520?w=1455&amp;h=325" src="https://static.alili.tech/img/remote/1460000013425520?w=1455&amp;h=325" alt="图像 023.png" title="图像 023.png" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000013425521?w=1455&amp;h=325" src="https://static.alili.tech/img/remote/1460000013425521?w=1455&amp;h=325" alt="图像 024.png" title="图像 024.png" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000013425522?w=1455&amp;h=325" src="https://static.alili.tech/img/remote/1460000013425522?w=1455&amp;h=325" alt="图像 025.png" title="图像 025.png" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000013425523?w=1455&amp;h=325" src="https://static.alili.tech/img/remote/1460000013425523?w=1455&amp;h=325" alt="图像 026.png" title="图像 026.png" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000013425524?w=1455&amp;h=325" src="https://static.alili.tech/img/remote/1460000013425524?w=1455&amp;h=325" alt="图像 027.png" title="图像 027.png" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader4">4.拓展</h1>
<p>明白了这些之后，再看代码是不是感觉就很清晰了呢？然后我们就可以做出更多形状的三角。有了这些形状再加上旋转属性，基本所有的场景都能使用。</p>
<h2 id="articleHeader5">直角三角</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013425525?w=1455&amp;h=325" src="https://static.alili.tech/img/remote/1460000013425525?w=1455&amp;h=325" alt="图像 028.png" title="图像 028.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box {
    /* 内部大小 */
    width: 0px;
    height: 0px;
    /* 边框大小 只设置三条边*/
    border-top: #4285f4 solid;
    border-right: transparent solid;
    border-left: transparent solid;
    border-width: 85px; 
    /* 其他设置 可有可无*/
    margin: 50px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.box</span> {
    <span class="hljs-comment">/* 内部大小 */</span>
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0px</span>;
    <span class="hljs-comment">/* 边框大小 只设置三条边*/</span>
    <span class="hljs-attribute">border-top</span>: <span class="hljs-number">#4285f4</span> solid;
    <span class="hljs-attribute">border-right</span>: transparent solid;
    <span class="hljs-attribute">border-left</span>: transparent solid;
    <span class="hljs-attribute">border-width</span>: <span class="hljs-number">85px</span>; 
    <span class="hljs-comment">/* 其他设置 可有可无*/</span>
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">50px</span>;
}</code></pre>
<h2 id="articleHeader6">更小的直角三角形</h2>
<p>利用对边的情况，做出更小的直角三角形<br><span class="img-wrap"><img data-src="/img/remote/1460000013425526?w=1455&amp;h=325" src="https://static.alili.tech/img/remote/1460000013425526?w=1455&amp;h=325" alt="图像 029.png" title="图像 029.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box {
    /* 内部大小 */
    width: 0px;
    height: 0px;
    /* 边框大小 只设置两条边*/
    border-top: #4285f4 solid;
    border-right: transparent solid;
    border-width: 85px; 
    /* 其他设置 */
    margin: 50px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.box</span> {
    <span class="hljs-comment">/* 内部大小 */</span>
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0px</span>;
    <span class="hljs-comment">/* 边框大小 只设置两条边*/</span>
    <span class="hljs-attribute">border-top</span>: <span class="hljs-number">#4285f4</span> solid;
    <span class="hljs-attribute">border-right</span>: transparent solid;
    <span class="hljs-attribute">border-width</span>: <span class="hljs-number">85px</span>; 
    <span class="hljs-comment">/* 其他设置 */</span>
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">50px</span>;
}</code></pre>
<h2 id="articleHeader7">等腰锐角三角形</h2>
<p>通过更改底边的长度可以做出各种不同的三角形<br><span class="img-wrap"><img data-src="/img/remote/1460000013425527?w=1455&amp;h=325" src="https://static.alili.tech/img/remote/1460000013425527?w=1455&amp;h=325" alt="图像 030.png" title="图像 030.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box {
    /* 内部大小 */
    width: 0px;
    height: 0px;
    /* 边框大小 */
    border-top: #4285f4 170px solid;
    border-right: transparent 85px solid;
    border-left: transparent 85px solid;
     
    /* 其他设置 */
    margin: 50px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="CSS"><span class="hljs-selector-class">.box</span> {
    <span class="hljs-comment">/* 内部大小 */</span>
    <span class="hljs-attribute">width</span>: <span class="hljs-number">0px</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0px</span>;
    <span class="hljs-comment">/* 边框大小 */</span>
    <span class="hljs-attribute">border-top</span>: <span class="hljs-number">#4285f4</span> <span class="hljs-number">170px</span> solid;
    <span class="hljs-attribute">border-right</span>: transparent <span class="hljs-number">85px</span> solid;
    <span class="hljs-attribute">border-left</span>: transparent <span class="hljs-number">85px</span> solid;
     
    <span class="hljs-comment">/* 其他设置 */</span>
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">50px</span>;
}</code></pre>
<h2 id="articleHeader8">对话气泡</h2>
<p>把伪元素设置成三角，再通过定位确定位置，就可以制作出来经典的对话气泡了。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013425528" src="https://static.alili.tech/img/remote/1460000013425528" alt="气泡" title="气泡" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".bubbly {
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: #00ccbb;
    border-radius: 8px;
    width: 200px;
    padding: 40px 10px;
    text-align: center;
    color: white;
    font-size: 20px;

.bubbly:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    border: 34px solid transparent;
    border-top-color: #00ccbb;
    border-bottom: 0;
    border-left: 0;
    margin: 0 0 -34px -17px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.bubbly</span> {
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">top</span>: <span class="hljs-number">30%</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">transform</span>: <span class="hljs-built_in">translate</span>(-50%, -50%);
    <span class="hljs-attribute">background</span>: <span class="hljs-number">#00ccbb</span>;
    <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">8px</span>;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">200px</span>;
    <span class="hljs-attribute">padding</span>: <span class="hljs-number">40px</span> <span class="hljs-number">10px</span>;
    <span class="hljs-attribute">text-align</span>: center;
    <span class="hljs-attribute">color</span>: white;
    <span class="hljs-attribute">font-size</span>: <span class="hljs-number">20px</span>;

<span class="hljs-attribute">.bubbly</span>:after {
    content: <span class="hljs-string">''</span>;
    <span class="hljs-attribute">position</span>: absolute;
    <span class="hljs-attribute">bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
    <span class="hljs-attribute">border</span>: <span class="hljs-number">34px</span> solid transparent;
    <span class="hljs-attribute">border-top-color</span>: <span class="hljs-number">#00ccbb</span>;
    <span class="hljs-attribute">border-bottom</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">border-left</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span> <span class="hljs-number">0</span> -<span class="hljs-number">34px</span> -<span class="hljs-number">17px</span>;
}</code></pre>
<h1 id="articleHeader9">总结</h1>
<p>通过对四条边的长度的设置，还可以做出各种各样的三角形，几乎所有三角的形状都可以设置出来。<br>另外还可以通过设置<strong>宽高中的一项为0另一个不为0</strong>，来设置出体形的形状，大家可以自由实验</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
纯CSS画三角原理解析

## 原文链接
[https://segmentfault.com/a/1190000013425512](https://segmentfault.com/a/1190000013425512)

