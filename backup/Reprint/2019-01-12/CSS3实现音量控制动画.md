---
title: 'CSS3实现音量控制动画' 
date: 2019-01-12 2:30:24
hidden: true
slug: 3oe6vhbehtq
categories: [reprint]
---

{{< raw >}}

                    
<p>先上效果图，由于时间关系，记录下实现过程。</p>
<p><span class="img-wrap"><img data-src="/img/bVPmO7?w=95&amp;h=55" src="https://static.alili.tech/img/bVPmO7?w=95&amp;h=55" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>仔细观看效果，实现思路及用到的css3如下：<br>采用svg绘制喇叭主体(假定喇叭由左右2个path组成)，动效实现：<br>1，插入声波弧线并将位置matrix到喇叭口的竖线上:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<g opacity=&quot;0&quot; transform=&quot;matrix(1,0,0,1,32,10.859)&quot; id='line1'>
<path  d='M-1.499,9.001 C0.39,6.494 1.5,3.377 1.5,0.001 C1.5,-3.38 0.39,-6.494 -1.5,-9.001'>
</g>
<g opacity=&quot;0&quot; transform=&quot;matrix(1,0,0,1,32,10.859)&quot; id='line2'>
<path d='M-1.499,9.001 C0.39,6.494 1.5,3.377 1.5,0.001 C1.5,-3.38 0.39,-6.494 -1.5,-9.001'>
</g>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">g</span> <span class="hljs-attr">opacity</span>=<span class="hljs-string">"0"</span> <span class="hljs-attr">transform</span>=<span class="hljs-string">"matrix(1,0,0,1,32,10.859)"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'line1'</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">path</span>  <span class="hljs-attr">d</span>=<span class="hljs-string">'M-1.499,9.001 C0.39,6.494 1.5,3.377 1.5,0.001 C1.5,-3.38 0.39,-6.494 -1.5,-9.001'</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">g</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">g</span> <span class="hljs-attr">opacity</span>=<span class="hljs-string">"0"</span> <span class="hljs-attr">transform</span>=<span class="hljs-string">"matrix(1,0,0,1,32,10.859)"</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'line2'</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">path</span> <span class="hljs-attr">d</span>=<span class="hljs-string">'M-1.499,9.001 C0.39,6.494 1.5,3.377 1.5,0.001 C1.5,-3.38 0.39,-6.494 -1.5,-9.001'</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">g</span>&gt;</span></code></pre>
<p>2,这样通过控制css animate控制opacity及matrix即可达到声波纹动画<br>3,为了使动画更精致,我们在喇叭口的竖线上再添加个竖线path,作为声波开始时的喇叭口鼓起效果<br>4,click后的的'x'动画则是最常见的关闭特效了,其实就是简单的matrix即可实现.</p>
<p>上点步骤图:</p>
<p>分析图:<br><span class="img-wrap"><img data-src="/img/bVPBye?w=381&amp;h=256" src="https://static.alili.tech/img/bVPBye?w=381&amp;h=256" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVPByf?w=64&amp;h=73" src="https://static.alili.tech/img/bVPByf?w=64&amp;h=73" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVPByt?w=80&amp;h=95" src="https://static.alili.tech/img/bVPByt?w=80&amp;h=95" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>效果A:<br><span class="img-wrap"><img data-src="/img/bVPmO7?w=95&amp;h=55" src="https://static.alili.tech/img/bVPmO7?w=95&amp;h=55" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>效果B:<br><span class="img-wrap"><img data-src="/img/bVPBzs?w=390&amp;h=163" src="https://static.alili.tech/img/bVPBzs?w=390&amp;h=163" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS3实现音量控制动画

## 原文链接
[https://segmentfault.com/a/1190000009820212](https://segmentfault.com/a/1190000009820212)

