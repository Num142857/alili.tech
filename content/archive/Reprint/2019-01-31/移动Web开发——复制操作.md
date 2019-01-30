---
title: '移动Web开发——复制操作' 
date: 2019-01-31 2:31:15
hidden: true
slug: n33gpn61clp
categories: [reprint]
---

{{< raw >}}

                    
<p>上周接到一个需求——点击按钮，复制指定的文字到粘贴板。我也是第一次做这种功能，最后通过查资料实现了这个功能。</p>
<h2 id="articleHeader0">正文</h2>
<p>其实这个功能实现起来也不难，主要用到了两个方法：<code>execCommand</code>和<code>select</code>。</p>
<ul>
<li><p><code>execCommand</code>：可以让我们执行如复制、剪切、粘贴等命令，还可以改变字体颜色、大小等。更多具体的用法可以<a href="http://www.haorooms.com/post/js_fwb_exec" rel="nofollow noreferrer" target="_blank">看这里</a>，在这就不说了。</p></li>
<li><p><code>select</code>：只有<code>input</code>和<code>textarea</code>可以执行该方法；用于选取文本框中的内容。</p></li>
</ul>
<p>有了这两个方法，前面的功能就有了大概的思路：首先动态创建input元素，然后动态制定input[value]；执行select()进行选中，然后通过execCommand方法执行复制即可。<br>接下来就是代码实现了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function copyContent(eleId){
    var temp = document.createElement(&quot;input&quot;)
    temp.setAttribute(&quot;value&quot;,document.getElementById(eleId).innerHTML)
    document.body.appendChild(temp)
    temp.select()
    document.execCommand(&quot;copy&quot;)
    document.body.removeChild(temp)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">copyContent</span>(<span class="hljs-params">eleId</span>)</span>{
    <span class="hljs-keyword">var</span> temp = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"input"</span>)
    temp.setAttribute(<span class="hljs-string">"value"</span>,<span class="hljs-built_in">document</span>.getElementById(eleId).innerHTML)
    <span class="hljs-built_in">document</span>.body.appendChild(temp)
    temp.select()
    <span class="hljs-built_in">document</span>.execCommand(<span class="hljs-string">"copy"</span>)
    <span class="hljs-built_in">document</span>.body.removeChild(temp)
}</code></pre>
<p><a href="https://jsfiddle.net/sunny_zhang/k61cwr35/5/" rel="nofollow noreferrer" target="_blank">Demo地址</a><button class="btn btn-xs btn-default ml10 preview" data-url="sunny_zhang/k61cwr35/5/" data-typeid="0">点击预览</button></p>
<h3 id="articleHeader1">另一种方法</h3>
<p>上面的方面虽然可以实现功能，但创建一个input元素然后再删掉感觉不太好，能不能直接copy指定DOM元素呢？其实是可以的，这里我们需要先介绍几个API：</p>
<ul>
<li><p><code>document.createRange()</code>：返回一个<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Range" rel="nofollow noreferrer" target="_blank">Range</a>对象，用来创建选中容器。</p></li>
<li><p><code>Range.selectNode(referenceNode)</code>：用来设定一个包含节点和节点内容的Range。</p></li>
<li><p><code>window.getSelection()</code>：返回一个 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Selection" rel="nofollow noreferrer" target="_blank">Selection</a> 对象，表示用户选择的文本。</p></li>
<li><p><code>Selection.addRange(range)</code>:将一个区域（Range）对象加入选区。</p></li>
<li><p><code>Selection.removeRange(range)/removeAllRanges()</code>:从选区中移除一个区域/将所有的区域都从选区中移除。</p></li>
</ul>
<p>要用到的API就上面这些，这里直接上<a href="https://jsfiddle.net/sunny_zhang/691bg3zv/" rel="nofollow noreferrer" target="_blank">Demo</a><button class="btn btn-xs btn-default ml10 preview" data-url="sunny_zhang/691bg3zv/" data-typeid="0">点击预览</button><br>下面是主要代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function copyToClipboard(eleId){
    var copyDOM = document.getElementById(eleId);
    var range = document.createRange();
    range.selectNode(copyDOM);
    window.getSelection().addRange(range);
    document.execCommand('copy');
    window.getSelection().removeAllRanges(); 
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">copyToClipboard</span>(<span class="hljs-params">eleId</span>)</span>{
    <span class="hljs-keyword">var</span> copyDOM = <span class="hljs-built_in">document</span>.getElementById(eleId);
    <span class="hljs-keyword">var</span> range = <span class="hljs-built_in">document</span>.createRange();
    range.selectNode(copyDOM);
    <span class="hljs-built_in">window</span>.getSelection().addRange(range);
    <span class="hljs-built_in">document</span>.execCommand(<span class="hljs-string">'copy'</span>);
    <span class="hljs-built_in">window</span>.getSelection().removeAllRanges(); 
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
移动Web开发——复制操作

## 原文链接
[https://segmentfault.com/a/1190000007633136](https://segmentfault.com/a/1190000007633136)

