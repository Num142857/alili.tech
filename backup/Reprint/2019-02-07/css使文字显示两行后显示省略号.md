---
title: 'css使文字显示两行后显示省略号' 
date: 2019-02-07 2:30:15
hidden: true
slug: pggev9nm19
categories: [reprint]
---

{{< raw >}}

                    
<p>本人喜欢把一些实用的东东拿过来，写成文章或者收藏起来。于是乎...</p>
<p><strong>直接上代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".article {
    color: #000000;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-all;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-class">.article</span> {
    <span class="hljs-attribute">color</span>: <span class="hljs-number">#000000</span>;
    <span class="hljs-attribute">overflow</span>: hidden;
    <span class="hljs-attribute">display</span>: -webkit-box;
    <span class="hljs-attribute">-webkit-line-clamp</span>: <span class="hljs-number">2</span>;
    <span class="hljs-attribute">-webkit-box-orient</span>: vertical;
    <span class="hljs-attribute">word-break</span>: break-all;
}
</code></pre>
<p><a href="https://jsfiddle.net/utqjdd3v/2/" rel="nofollow noreferrer" target="_blank">狠狠的点击，查看效果吧</a><button class="btn btn-xs btn-default ml10 preview" data-url="utqjdd3v/2/" data-typeid="0">点击预览</button></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
css使文字显示两行后显示省略号

## 原文链接
[https://segmentfault.com/a/1190000005963818](https://segmentfault.com/a/1190000005963818)

