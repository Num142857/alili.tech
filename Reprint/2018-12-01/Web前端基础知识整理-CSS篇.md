---
title: 'Web前端基础知识整理-CSS篇' 
date: 2018-12-01 2:30:12
hidden: true
slug: fd65mb3tlm
categories: [reprint]
---

{{< raw >}}

                    
<p>CSS手册：<a href="http://t.mb5u.com/css3/" rel="nofollow noreferrer">http://t.mb5u.com/css3/</a><br><strong>选择器</strong><br>一、元素选择符</p>
<ol>
<li>通配选择符(*):选择所有元素</li>
<li>类型选择符(E)：以文档对象类型作为选择符</li>
<li>id选择符(E#id):以唯一标识符id属性等于id的E对象作为选择符</li>
<li>class选择符(E.class):以class属性包含class的E对象作为选择符</li>
</ol>
<p>二、关系选择符</p>
<ol>
<li>包含选择符(E F):选择所有被E元素包含的F元素</li>
<li>子选择符(E&gt;F):选择所有作为E元素的子元素F。</li>
<li>相邻选择符(E+F):选择紧贴再E元素之后F元素。</li>
<li>兄弟选择符(E~F):选择E元素后面的所有兄弟元素F。</li>
</ol>
<p>三、属性选择符</p>
<p><span class="img-wrap"><img data-src="/img/bVbaoYh?w=1298&amp;h=86" src="https://static.alili.tech/img/bVbaoYh?w=1298&amp;h=86" alt="clipboard.png" title="clipboard.png"></span></p>
<p>四、伪类选择符</p>
<p><span class="img-wrap"><img data-src="/img/bVbaoYl?w=1343&amp;h=156" src="https://static.alili.tech/img/bVbaoYl?w=1343&amp;h=156" alt="clipboard.png" title="clipboard.png"></span></p>
<p>五、伪对象选择符</p>
<p><span class="img-wrap"><img data-src="/img/bVbaoYo?w=1098&amp;h=66" src="https://static.alili.tech/img/bVbaoYo?w=1098&amp;h=66" alt="clipboard.png" title="clipboard.png"></span></p>
<p>优先级：<br>标签选择符、伪类与伪对象：权重为1。<br>类选择符、属性选择符：权重为10。<br>ID选择符：权重为100。<br>内联style属性：权重为1000。<br>!important：权重为无穷。</p>
<p>p&lt;class&lt;标签.class&lt;id&lt;标签.id&lt;自定义</p>
<hr>
<p><strong>盒模型</strong><br>一、基本概念：盒模型由里向外是由：content、padding、border、margin构成的。<br>二、类型：标准盒模型、IE模型</p>
<ol>
<li>
<p>标准盒模型：width=content</p>
<pre><code>          height=content</code></pre>
</li>
<li>
<p>IE盒模型：width=content+padding+border</p>
<pre><code>        height=content+padding+border
        </code></pre>
</li>
</ol>
<p>三、CSS设置两种模型</p>
<pre><code>/* 标准模型 */
box-sizing:content-box;

 /*IE模型*/
box-sizing:border-box;</code></pre>
<hr>
<p><strong>定位</strong><br>一、定位position分类</p>
<ol>
<li>static默认值，没有定位，元素出现在正常的流中。</li>
<li>absolute：生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位。</li>
<li>relative：生成相对定位的元素，相对于其正常位置进行定位。</li>
<li>fixed：生成绝对定位的元素，相对于浏览器窗口进行定位。</li>
<li>inherit：规定应该从父元素继承 position 属性的值。</li>
</ol>
<hr>
<p><strong>尺寸单位</strong><br>一、文本相对长度单位</p>
<ol>
<li>em（CSS1）：相对于当前对象内文本的字体尺寸<p>如果body的font-size：设置为14px，那么1em = 14px</p>
</li>
<li>ex（CSS1）：相对长度单位。相对与支付"x"的高度，通常为字体高度的一半。</li>
<li>ch（CSS3）：相对与数字“0”的宽度</li>
<li>rem（CSS3）：相对于根元素（html元素）font-size的计算倍数<br>   如果html的font-szie：设置为14px，那么1rem = 14px</li>
</ol>
<p>二、视口相对长度单位</p>
<ol>
<li>vw（CSS3）：相对于视口的宽度。视口被平均分为100单位的vw</li>
<li>vh（CSS3）: 相对于视口的高度。视口被平均分为100单位的vh</li>
<li>vm（CSS3）: 相对于视口的宽度或高度。对于视口的宽度或高度，总是相对于小的那个。视口的宽度或高度被均分为100单位的vm</li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Web前端基础知识整理-CSS篇

## 原文链接
[https://segmentfault.com/a/1190000014833437](https://segmentfault.com/a/1190000014833437)

