---
title: '小技巧|CSS如何实现文字两端对齐' 
date: 2018-12-30 2:30:10
hidden: true
slug: esihms0e2up
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000011336397" src="https://static.alili.tech/img/remote/1460000011336397" alt="小技巧|CSS文字两端对齐效果实现" title="小技巧|CSS文字两端对齐效果实现" style="cursor: pointer; display: inline;"></span></p>
<p>需求如下，红框所在的文字有四个字的、三个字的、两个字的，如果不两端对齐可以选择居中对齐，或者右对齐。但是如果要像下面这样两端对齐呢？ <br><span class="img-wrap"><img data-src="/img/remote/1460000011336398" src="https://static.alili.tech/img/remote/1460000011336398" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>我相信以前很多人都这么干过：两个字中间使用<code>&amp;nbsp;</code>来隔开达到四个字的宽度，三个字也可以，但是，像上图中“122账号”“122密码”这样的，就不好计算该用几个空格了。</p>
<p>假如我们有如下HTML：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>这世间唯有梦想和好姑娘不可辜负！</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>这世间唯有梦想和好姑娘不可辜负！<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>给它加点样式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div{
  width:500px;
  border:1px solid red;
  text-align: justify;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">div</span>{
  <span class="hljs-attribute">width</span>:<span class="hljs-number">500px</span>;
  <span class="hljs-attribute">border</span>:<span class="hljs-number">1px</span> solid red;
  <span class="hljs-attribute">text-align</span>: justify;
}</code></pre>
<p>初始效果是这样的 <br><span class="img-wrap"><img data-src="/img/remote/1460000011336399" src="https://static.alili.tech/img/remote/1460000011336399" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><code>text-align: justify</code>这是什么东西？CSS2中<code>text-align</code>有一个属性值为<code>justify</code>，为对齐之意。其实现的效果就是可以让一行文字两端对齐显示（文字内容要超过一行）。</p>
<p>但是光使用它依然没什么卵用…..</p>
<p>要使文字两端对齐，我们还得使用一个行内空标签来助阵，比如<code>&lt;span&gt;</code>、<code>&lt;i&gt;</code>等等，这里是我用<code>&lt;i&gt;</code>标签</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div>这世间唯有梦想和好姑娘不可辜负！<i></i></div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>这世间唯有梦想和好姑娘不可辜负！<span class="hljs-tag">&lt;<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">i</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></code></pre>
<p>给这个<code>i</code>标签设置如下样式</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div i{
  display:inline-block;
  /*padding-left: 100%;*/
  width:100%;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">div</span> <span class="hljs-selector-tag">i</span>{
  <span class="hljs-attribute">display</span>:inline-block;
  <span class="hljs-comment">/*padding-left: 100%;*/</span>
  <span class="hljs-attribute">width</span>:<span class="hljs-number">100%</span>;
}</code></pre>
<p><code>padding-left: 100%</code>和<code>width:100%</code>都可以达到效果，选用其一即可。效果如下 <br><span class="img-wrap"><img data-src="/img/remote/1460000011336400" src="https://static.alili.tech/img/remote/1460000011336400" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>但是加入HTML元素又违反了结构表现分离的原则，我们可以改用after、before伪元素：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div:after {
    content: &quot; &quot;;
    display: inline-block;
    width: 100%;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">div</span><span class="hljs-selector-pseudo">:after</span> {
    <span class="hljs-attribute">content</span>: <span class="hljs-string">" "</span>;
    <span class="hljs-attribute">display</span>: inline-block;
    <span class="hljs-attribute">width</span>: <span class="hljs-number">100%</span>;
}</code></pre>
<p>感谢 <a href="https://segmentfault.com/u/cdswyda">@依韵_宵音</a> 的提醒</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
小技巧|CSS如何实现文字两端对齐

## 原文链接
[https://segmentfault.com/a/1190000011336392](https://segmentfault.com/a/1190000011336392)

