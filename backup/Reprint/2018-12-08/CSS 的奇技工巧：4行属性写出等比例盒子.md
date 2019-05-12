---
title: 'CSS 的奇技工巧：4行属性写出等比例盒子' 
date: 2018-12-08 2:30:30
hidden: true
slug: yqqcoi4rkxe
categories: [reprint]
---

{{< raw >}}

                    
<p>一个项目中需要用到一个广告位的轮播图效果，而这个轮播图位置需要根据不同设备的尺寸进行缩放从而保持相同的比例。</p>
<p>最开始使劲琢磨发现用 <code>width</code> + <code>height</code> 属性是实现不了这种效果的，非得用 <code>JS</code> 才能达到这种效果吗？终于发现有前人早已解决过这个问题，这里权当自己吸收学习，因此记录下来。</p>
<p>HTML</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;box&quot;>
    <img src=&quot;...&quot;>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"box"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"..."</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>CSS</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".box
{
    width: 100%;
    height: 0;
    padding-bottom: 50%;
}

img
{
    width: 100%;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.box</span>
{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
    <span class="hljs-attribute">height</span>: <span class="hljs-number">0</span>;
    <span class="hljs-attribute">padding-bottom</span>: <span class="hljs-number">50%</span>;
}

<span class="hljs-selector-tag">img</span>
{
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
}</code></pre>
<h2 id="articleHeader0">演示效果</h2>
<p><span class="img-wrap"><img data-src="/img/bV6XkH?w=432&amp;h=216" src="https://static.alili.tech/img/bV6XkH?w=432&amp;h=216" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<hr>
<p>仔细想一想这不过是 CSS 中最基础的内容，没有什么新颖华丽的内容。但是其中值得思考的东西颇多，不妨读者也想一想：</p>
<ul>
<li>为什么父元素 <code>.box</code> 的 <code>height</code> 属性要设置为 0</li>
<li>子元素 <code>img</code> 为什么不设置 <code>height</code> 属性</li>
</ul>
<p><strong>注意</strong></p>
<blockquote>
<code>padding</code> 属性的继承关系</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS 的奇技工巧：4行属性写出等比例盒子

## 原文链接
[https://segmentfault.com/a/1190000014012034](https://segmentfault.com/a/1190000014012034)

