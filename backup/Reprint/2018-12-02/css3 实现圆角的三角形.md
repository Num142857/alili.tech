---
title: 'css3 实现圆角的三角形' 
date: 2018-12-02 2:30:15
hidden: true
slug: 7t76maadgqy
categories: [reprint]
---

{{< raw >}}

                    
<p>达到的效果：</p>
<p><span class="img-wrap"><img data-src="/img/bV9Yey?w=595&amp;h=252" src="https://static.alili.tech/img/bV9Yey?w=595&amp;h=252" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>今天碰到这样一个需求，为带有圆角的框加一个角标。而且角标是圆角的。<br>我真的不想切图，怎么办。突然想到css3可以实现条纹背景，那这不就可以了么</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="background: linear-gradient(45deg, transparent 50%, #61C4CF 0%);
background-size: 16px 16px;
border-top-right-radius: 3px;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">background</span>: linear-gradient(<span class="hljs-number">45deg</span>, transparent <span class="hljs-number">50%</span>, <span class="hljs-number">#61C4CF</span> <span class="hljs-number">0%</span>);
<span class="hljs-attribute">background-size</span>: <span class="hljs-number">16px</span> <span class="hljs-number">16px</span>;
<span class="hljs-attribute">border-top-right-radius</span>: <span class="hljs-number">3px</span>;</code></pre>
<p>三行代码解决问题，继续愉快的coding</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
css3 实现圆角的三角形

## 原文链接
[https://segmentfault.com/a/1190000014730523](https://segmentfault.com/a/1190000014730523)

