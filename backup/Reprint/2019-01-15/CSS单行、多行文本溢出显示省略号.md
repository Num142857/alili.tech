---
title: 'CSS单行、多行文本溢出显示省略号' 
date: 2019-01-15 2:30:12
hidden: true
slug: qovmemzww5h
categories: [reprint]
---

{{< raw >}}

                    
<ul><li><p>单行文本溢出显示省略号</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="overflow:hidden;
text-overflow:ellipsis;
white-space:nowrap;
（需要对容器设置单行高度）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">overflow</span>:hidden;
<span class="hljs-attribute">text-overflow</span>:ellipsis;
<span class="hljs-attribute">white-space</span>:nowrap;
（需要对容器设置单行高度）</code></pre>
<ul><li>
<p>多行文本溢出显示省略号</p>
<p><strong>webkit浏览器或移动端的页面</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   在webkit浏览器或移动端（绝大部分是webkit内核的浏览器）可以直接使用webkit的css扩展属性（webkit是私有属性）-webkit-line-clamp；
   注意：这是一个不规范的属性，它没有在CSS的规范草案中
   -webkit-line-clamp用来限制在一个块元素显示的文本行数，为了实现效果，他要与一下webkit属性结合使用：
       display:-webkit-box;（必须结合的属性，将对象作为弹性伸缩盒子模型展示）
       -webkit-box-orient（必须结合的属性，设置或检索伸缩盒对象的子元素的排列方式）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code>   在webkit浏览器或移动端（绝大部分是webkit内核的浏览器）可以直接使用webkit的css扩展属性（webkit是私有属性）-webkit-<span class="hljs-keyword">line</span>-clamp；
   注意：这是一个不规范的属性，它没有在CSS的规范草案中
   -webkit-<span class="hljs-keyword">line</span>-clamp用来限制在一个块元素显示的文本行数，为了实现效果，他要与一下webkit属性结合使用：
       display:-webkit-<span class="hljs-built_in">box</span>;（必须结合的属性，将对象作为弹性伸缩盒子模型展示）
       -webkit-<span class="hljs-built_in">box</span>-orient（必须结合的属性，设置或检索伸缩盒对象的子元素的排列方式）</code></pre>
<p>完整版写法如下：</p>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="overflow:hidden;
text-overflow:ellipsis;
display:-webkit-box;
-webkit-line-clamp:2; (两行文字)
-webkit-box-orient:vertical;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-attribute">overflow</span>:hidden;
<span class="hljs-attribute">text-overflow</span>:ellipsis;
<span class="hljs-attribute">display</span>:-webkit-box;
-webkit-line-clamp:<span class="hljs-number">2</span>; (两行文字)
-webkit-box-orient:vertical;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="**跨浏览器兼容的方案**
比较靠谱简单的做法就是设置相对定位的容器高度，用包含省略号（...）的元素模拟实现" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs asciidoc"><code>*<span class="hljs-strong">*跨浏览器兼容的方案*</span>*
比较靠谱简单的做法就是设置相对定位的容器高度，用包含省略号（...）的元素模拟实现</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="p{
position:relative;
line-height:1.4em;
/*设置容器高度为3倍行高就是显示3行*/
height:4.2em;
overflow:hidden;
}
p::after{
content:'...';
font-weight:bold;
position:absolute;
bottom:0;
right:0;
padding:0 20px 1px 45px;
background:#fff;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">p</span>{
<span class="hljs-attribute">position</span>:relative;
<span class="hljs-attribute">line-height</span>:<span class="hljs-number">1.4em</span>;
<span class="hljs-comment">/*设置容器高度为3倍行高就是显示3行*/</span>
<span class="hljs-attribute">height</span>:<span class="hljs-number">4.2em</span>;
<span class="hljs-attribute">overflow</span>:hidden;
}
<span class="hljs-selector-tag">p</span><span class="hljs-selector-pseudo">::after</span>{
<span class="hljs-attribute">content</span>:<span class="hljs-string">'...'</span>;
<span class="hljs-attribute">font-weight</span>:bold;
<span class="hljs-attribute">position</span>:absolute;
<span class="hljs-attribute">bottom</span>:<span class="hljs-number">0</span>;
<span class="hljs-attribute">right</span>:<span class="hljs-number">0</span>;
<span class="hljs-attribute">padding</span>:<span class="hljs-number">0</span> <span class="hljs-number">20px</span> <span class="hljs-number">1px</span> <span class="hljs-number">45px</span>;
<span class="hljs-attribute">background</span>:<span class="hljs-number">#fff</span>;
}</code></pre>
<p>注意：IE6-7不显示content内容，所以要兼容IE6-7可以是在内容中加入一个标签，比如&lt;span&gt;...&lt;/span&gt;去模拟；要支持IE8，需要将::after替换为:after</p>
<p><strong>JavaScript解决方案</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="使用js也可以根据上面的思路去模拟，实现也很简单，推荐两个做类似工作的成熟小工具：
1、clamp.js
2、jQuery插件  jquery.dotdotdot
使用简单，实现方法自行百度
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>使用<span class="hljs-keyword">js也可以根据上面的思路去模拟，实现也很简单，推荐两个做类似工作的成熟小工具：
</span><span class="hljs-number">1</span>、clamp.<span class="hljs-keyword">js
</span><span class="hljs-number">2</span>、<span class="hljs-keyword">jQuery插件 </span> <span class="hljs-keyword">jquery.dotdotdot
</span>使用简单，实现方法自行百度
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS单行、多行文本溢出显示省略号

## 原文链接
[https://segmentfault.com/a/1190000009262433](https://segmentfault.com/a/1190000009262433)

