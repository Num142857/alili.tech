---
title: '【前端工程师手册】BFC笔记' 
date: 2018-12-05 2:30:09
hidden: true
slug: apg7y5ocl1i
categories: [reprint]
---

{{< raw >}}

                    
<h2>什么是BFC</h2>
<p>首先呢，BFC的全称是Block Formatting Context，BFC其实就是页面上的一块区域，有它自己的渲染规则，决定了其内部子元素的定位等等。而且BFC内部的box的布局，与这个容器外的毫不相关。</p>
<h2>BFC有哪些特性</h2>
<ol>
<li>在同一个BFC元素中，其子元素按照文档流一个接一个的排列，而且垂直相邻的两个块级元素在上下边距可能会发生外边距（margin）合并，为什么说是可能呢，因为即使在同一个BFC中发生了外边距合并也有其他的解决办法（<a href="https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing" rel="nofollow noreferrer">MDN-外边距合并</a>）</li>
<li>创建了BFC的元素不会与浮动元素重叠，并且会出现在浮动元素所在行的剩余空间（如果放的下的话）</li>
<li>创建了BFC的元素计算高度时会算上浮动元素，也就是说在创建了BFC的元素内部，浮动元素不会造成父元素塌陷</li>
</ol>
<h2>BFC如何创建</h2>
<ol>
<li>根元素。我自己测试的是&lt;HTML&gt;元素会自己创建一个BFC</li>
<li>浮动元素，即float取值不是none的元素</li>
<li>overflow不是visible的元素，这个经常用来清除浮动</li>
<li>display为tabel-cell、table-caption或inline-block</li>
</ol>
<h2>BFC有哪些用途</h2>
<ol>
<li>
<p>防止被浮动元素遮盖，比如实现两栏布局</p>
<pre><code>   .aside {
     background: red;
     width: 170px;
     height: 600px;
     float: left;
   }
   .main {
     background: green;
     height: 700px;
   }
   &lt;div class="aside"&gt;&lt;/div&gt;
   &lt;div class="main"&gt;&lt;/div&gt;
   </code></pre>
<p><span class="img-wrap"><img data-src="/img/bV8Lhn?w=2080&amp;h=1404" src="https://static.alili.tech/img/bV8Lhn?w=2080&amp;h=1404" alt="图片描述" title="图片描述"></span><br>   侧栏aside把主栏main遮住了一部分，根据上面说的<strong>BFC特性</strong>第二点：创建了BFC的元素不会与浮动元素重叠，并且会出现在浮动元素所在行的剩余空间，设置main的overflow: hidden<br><span class="img-wrap"><img data-src="/img/bV8LjC?w=2086&amp;h=1404" src="https://static.alili.tech/img/bV8LjC?w=2086&amp;h=1404" alt="图片描述" title="图片描述"></span></p>
</li>
<li>
<p>解决上下相邻的两个块级外边距合并</p>
<pre><code>   .up {
     height: 100px;
     background: red;
     margin-bottom: 20px;
   }
   .down {
     height: 100px;
     background: green;
     margin-top: 10px;
   }
   &lt;div class="up"&gt;&lt;/div&gt;
   &lt;div class="down"&gt;&lt;/div&gt;
   ![图片描述][4]</code></pre>
<p>本来上下两个元素间距应该是30px但是现在却是20px，现在分别把这两个元素放入不同的BFC</p>
<pre><code>   &lt;div class="wrapper"&gt;
       &lt;div class="up"&gt;&lt;/div&gt;
   &lt;/div&gt;
   &lt;div class="wrapper"&gt;
       &lt;div class="down"&gt;&lt;/div&gt;
   &lt;/div&gt;
   .wrapper {
     overflow: hidden;
   }</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV8Lp1?w=2082&amp;h=466" src="https://static.alili.tech/img/bV8Lp1?w=2082&amp;h=466" alt="图片描述" title="图片描述"></span></p>
</li>
<li>
<p>清除浮动<br>   浮动元素会带来父元素高度塌陷</p>
<pre><code>   &lt;div class="out"&gt;
       &lt;div class="in"&gt;&lt;/div&gt;
   &lt;/div&gt;
   .out {
     border: 1px solid;
     padding: 10px;
     /* overflow: hidden; */
   }
   .in {
     width: 100px;
     height: 100px;
     background: red;
     float: left;
   }</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV8Lqr?w=2084&amp;h=276" src="https://static.alili.tech/img/bV8Lqr?w=2084&amp;h=276" alt="图片描述" title="图片描述"></span><br>   根据上面说的<strong>BFC特性</strong>第三点，设置out元素为overflow: hidden<br><span class="img-wrap"><img data-src="/img/bV8LqK?w=2082&amp;h=262" src="https://static.alili.tech/img/bV8LqK?w=2082&amp;h=262" alt="图片描述" title="图片描述"></span></p>
</li>
</ol>
<p>参考资料：<br><a href="http://www.cnblogs.com/pigtail/archive/2013/01/23/2871627.html" rel="nofollow noreferrer">BFC-博客园</a><br><a href="https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context" rel="nofollow noreferrer">BFC-MDN</a><br><a href="https://www.w3cplus.com/css/understanding-bfc-and-margin-collapse.html" rel="nofollow noreferrer">深入理解BFC和Margin Collapse</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【前端工程师手册】BFC笔记

## 原文链接
[https://segmentfault.com/a/1190000014442979](https://segmentfault.com/a/1190000014442979)

