---
title: 'css样式权重优先级，css样式优先级' 
date: 2019-02-12 2:30:12
hidden: true
slug: ypbgt0n59j
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>
<p>原文：<a href="http://www.bkjia.com/Javascript/955198.html" rel="nofollow noreferrer" target="_blank">http://www.bkjia.com/Javascri...</a></p>
<p>样式选择器权重优先级：</p>
<p>important &gt; 内嵌样式 &gt; ID &gt; 类 &gt; 标签 | 伪类 | 属性选择 &gt; 伪对象 &gt; 继承 &gt; 通配符</p>
<ul>
<li><p>important的权重为1,0,0,0</p></li>
<li><p>ID的权重为0,1,0,0</p></li>
<li><p>类的权重为0,0,1,0</p></li>
<li><p>标签的权重为0,0,0,1</p></li>
<li><p>伪类的权重为0,0,1,0</p></li>
<li><p>属性的权重为0,0,1,0</p></li>
<li><p>伪对象的权重为0,0,0,1</p></li>
<li><p>通配符的权重为0,0,0,0</p></li>
</ul>
</blockquote>
<p>忽然意识到上文的第二行 important &gt; 内嵌样式 &gt; ID &gt; 类 &gt; 标签 | 伪类 | 属性选择 &gt; 伪对象 &gt; 继承 &gt; 通配符  排序不对啊<br>于是，又搜了很多，资料如下：<br><a href="https://segmentfault.com/a/1190000003860309#articleHeader1">CSS 样式优先级</a><br><a href="http://blog.csdn.net/w617280955/article/details/7392348" rel="nofollow noreferrer" target="_blank">css优先级</a><br><a href="https://segmentfault.com/a/1190000005005091">css的样式优先级</a><br><a href="https://segmentfault.com/q/1010000007419861" target="_blank">css样式继承问题</a></p>
<p>其中一篇有说这句：</p>
<blockquote><p>任何显示申明的规则都可以覆盖其继承样式。</p></blockquote>
<p>还有一篇是这样排序的：</p>
<blockquote><p>多重样式间遵循：继承来的样式 &lt; 浏览器缺省设置 &lt; 外部样式表 = 内部样式表 &lt; 内联样式</p></blockquote>
<p>结合 <a href="https://segmentfault.com/q/1010000007419861">css样式继承问题</a> 这个问题及其答案来看，继承的优先级的确是最低的。</p>
<p>正确的优先级排序应该是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="important > 内联样式 > ID > 类 | 伪类 | 属性选择 > 标签 | 伪元素 > 继承 > 通配符
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>important &gt; 内联样式 &gt; ID &gt; 类 |<span class="hljs-string"> 伪类 </span>|<span class="hljs-string"> 属性选择 &gt; 标签 </span>|<span class="hljs-string"> 伪元素 &gt; 继承 &gt; 通配符
</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
css样式权重优先级，css样式优先级

## 原文链接
[https://segmentfault.com/a/1190000004838700](https://segmentfault.com/a/1190000004838700)

