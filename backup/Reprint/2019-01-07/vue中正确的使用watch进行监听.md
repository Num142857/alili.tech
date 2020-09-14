---
title: 'vue中正确的使用watch进行监听' 
date: 2019-01-07 2:30:11
hidden: true
slug: fjyi00opro
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p><a href="https://segmentfault.com/a/1190000010245810">https://segmentfault.com/a/11...</a><br>在我的之前一篇文章中，我做了watch的测试，并简单做了总结：并不是所有的改变都会触发watch监听。</p></blockquote>
<p><strong>不能够触发监听的</strong></p>
<ol>
<li>
<p>数组</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="修改某个下标的某个属性的值
使用原生delete删除某个属性
对某个下标新增一个属性（不使用$set）
对某个下标重新赋值" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>修改某个下标的某个属性的值
使用原生<span class="hljs-keyword">delete</span>删除某个属性
对某个下标新增一个属性（不使用$<span class="hljs-keyword">set</span>）
对某个下标重新赋值</code></pre>
</li>
<li>
<p>对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="修改某个属性的值（但是会触发这个属性的监听）
新增一个属性（不使用$set）
原生delete删除某个属性
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code>修改某个属性的值（但是会触发这个属性的监听）
新增一个属性（不使用$<span class="hljs-keyword">set</span>）
原生<span class="hljs-keyword">delete</span>删除某个属性
</code></pre>
</li>
</ol>
<p>以上总结可能存在不足</p>
<p><strong>万金油实现watch监听</strong><br>在修改完数据后添加这样一段代码<br><em>array</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="arr = [...arr]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code><span class="hljs-attr">arr</span> = [...arr]
</code></pre>
<p><em>obj</em></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="obj = {...obj}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attr">obj</span> = {...obj}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue中正确的使用watch进行监听

## 原文链接
[https://segmentfault.com/a/1190000010280989](https://segmentfault.com/a/1190000010280989)

