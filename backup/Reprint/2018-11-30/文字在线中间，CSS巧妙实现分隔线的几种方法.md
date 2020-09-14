---
title: '文字在线中间，CSS巧妙实现分隔线的几种方法' 
date: 2018-11-30 2:30:11
hidden: true
slug: qlio5sxxbja
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVbaGqW?w=766&amp;h=442" src="https://static.alili.tech/img/bVbaGqW?w=766&amp;h=442" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>单个标签实现分隔线：</p>
<p>.demo_line_01{</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="padding: 0 20px 0;
margin: 20px 0;
line-height: 1px;
border-left: 200px solid #ddd;
border-right: 200px solid #ddd;
text-align: center;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">20px</span> <span class="hljs-number">0</span>;
<span class="hljs-attribute">margin</span>: <span class="hljs-number">20px</span> <span class="hljs-number">0</span>;
<span class="hljs-attribute">line-height</span>: <span class="hljs-number">1px</span>;
<span class="hljs-attribute">border-left</span>: <span class="hljs-number">200px</span> solid <span class="hljs-number">#ddd</span>;
<span class="hljs-attribute">border-right</span>: <span class="hljs-number">200px</span> solid <span class="hljs-number">#ddd</span>;
<span class="hljs-attribute">text-align</span>: center;</code></pre>
<p>}<br>优点：代码简洁</p>
<p>巧用背景色实现分隔线：</p>
<p>.demo_line_02{</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="height: 1px;
border-top: 1px solid #ddd;
text-align: center;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">height</span>: <span class="hljs-number">1px</span>;
<span class="hljs-attribute">border-top</span>: <span class="hljs-number">1px</span> solid <span class="hljs-number">#ddd</span>;
<span class="hljs-attribute">text-align</span>: center;</code></pre>
<p>}<br>.demo_line_02 span{</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="position: relative;
top: -8px;
background: #fff;
padding: 0 20px;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">position</span>: relative;
<span class="hljs-attribute">top</span>: -<span class="hljs-number">8px</span>;
<span class="hljs-attribute">background</span>: <span class="hljs-number">#fff</span>;
<span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span> <span class="hljs-number">20px</span>;</code></pre>
<p>}<br>优点：代码简洁，可自适应宽度</p>
<p>inline-block实现分隔线：</p>
<p>点此查看实例展示</p>
<p>.demo_line_03{</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="width:600px;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">width</span>:<span class="hljs-number">600px</span>;</code></pre>
<p>}<br>.demo_line_03 b{</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="background: #ddd;
margin-top: 4px;
display: inline-block;
width: 180px;
height: 1px;
_overflow: hidden;
vertical-align: middle;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">background</span>: <span class="hljs-number">#ddd</span>;
<span class="hljs-attribute">margin-top</span>: <span class="hljs-number">4px</span>;
<span class="hljs-attribute">display</span>: inline-block;
<span class="hljs-attribute">width</span>: <span class="hljs-number">180px</span>;
<span class="hljs-attribute">height</span>: <span class="hljs-number">1px</span>;
_overflow: hidden;
<span class="hljs-attribute">vertical-align</span>: middle;</code></pre>
<p>}<br>.demo_line_03 span{</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="display: inline-block;
width: 220px;
vertical-align: middle;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">display</span>: inline-block;
<span class="hljs-attribute">width</span>: <span class="hljs-number">220px</span>;
<span class="hljs-attribute">vertical-align</span>: middle;</code></pre>
<p>}<br>优点：文字可多行</p>
<p>浮动实现分隔线：</p>
<p>.demo_line_04{</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="width:600px;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">width</span>:<span class="hljs-number">600px</span>;</code></pre>
<p>}<br>.demo_line_04{</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="overflow: hidden;
_zoom: 1;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">overflow</span>: hidden;
_zoom: <span class="hljs-number">1</span>;</code></pre>
<p>}<br>.demo_line_04 b{</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="background: #ddd;
margin-top: 8px;
float: left;
width: 26%;
height: 1px;
_overflow: hidden;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">background</span>: <span class="hljs-number">#ddd</span>;
<span class="hljs-attribute">margin-top</span>: <span class="hljs-number">8px</span>;
<span class="hljs-attribute">float</span>: left;
<span class="hljs-attribute">width</span>: <span class="hljs-number">26%</span>;
<span class="hljs-attribute">height</span>: <span class="hljs-number">1px</span>;
_overflow: hidden;</code></pre>
<p>}<br>优点：NUN</p>
<p>利用字符实现分隔线：</p>
<p>&lt;div class="demo_line_05"&gt;———————————&lt;span&gt;小小分隔线 字符来实现&lt;/span&gt;————————————&lt;/div&gt;<br>.demo_line_05{</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="letter-spacing: -1px;
color: #ddd;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">letter-spacing</span>: -<span class="hljs-number">1px</span>;
<span class="hljs-attribute">color</span>: <span class="hljs-number">#ddd</span>;</code></pre>
<p>}<br>.demo_line_05 span{</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="letter-spacing: 0;
color: #222;
margin:0 20px;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">letter-spacing</span>: <span class="hljs-number">0</span>;
<span class="hljs-attribute">color</span>: <span class="hljs-number">#222</span>;
<span class="hljs-attribute">margin</span>:<span class="hljs-number">0</span> <span class="hljs-number">20px</span>;</code></pre>
<p>}<br>优点：代码简洁 以上简单介绍了分隔线的写法，也许还有其它比较合适的写法，看环境各取所需吧！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
文字在线中间，CSS巧妙实现分隔线的几种方法

## 原文链接
[https://segmentfault.com/a/1190000014900385](https://segmentfault.com/a/1190000014900385)

