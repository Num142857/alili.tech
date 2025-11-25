---
title: 'css scrollbar样式设置' 
date: 2018-12-18 2:30:11
hidden: true
slug: rgh38yx42gg
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">一 前言</h1>
<p>在CSS 中，如果我们在块级容器上设置了属性:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="overflow:scroll/* x y 方向都会*/
或者
overscroll-x:scroll/*只是x方向*/
或者
overflow-y:scroll /*只是y方向*/

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">overflow</span><span class="hljs-selector-pseudo">:scroll</span><span class="hljs-comment">/* x y 方向都会*/</span>
或者
<span class="hljs-selector-tag">overscroll-x</span><span class="hljs-selector-pseudo">:scroll</span><span class="hljs-comment">/*只是x方向*/</span>
或者
<span class="hljs-selector-tag">overflow-y</span><span class="hljs-selector-pseudo">:scroll</span> <span class="hljs-comment">/*只是y方向*/</span>

</code></pre>
<p>当块级内容区域超出块级元素范围的时候，就会以滚动条的形式展示，你可以滚动里面的内容，里面的内容不会超出块级区域范围。<br>有时候我们需要自定义滚动条的样式，比如一开始就它显示，比如想改变滚动条的颜色，设置轨道的样式等，那么这篇文章就是为你准备的。</p>
<h1 id="articleHeader1">二 正文</h1>
<p>1.认识滚动条</p>
<p><span class="img-wrap"><img data-src="/img/bV1RSv?w=700&amp;h=443" src="https://static.alili.tech/img/bV1RSv?w=700&amp;h=443" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>设置scrollbar的为CSS伪元素，对应上图的数字：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="::-webkit-scrollbar              { /* 1 */ }
::-webkit-scrollbar-button       { /* 2 */ }
::-webkit-scrollbar-track        { /* 3 */ }
::-webkit-scrollbar-track-piece  { /* 4 */ }
::-webkit-scrollbar-thumb        { /* 5 */ }
::-webkit-scrollbar-corner       { /* 6 */ }
::-webkit-resizer                { /* 7 */ }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-symbol">:</span><span class="hljs-symbol">:-webkit-scrollbar</span>              { <span class="hljs-regexp">/* 1 */</span> }
<span class="hljs-symbol">:</span><span class="hljs-symbol">:-webkit-scrollbar-button</span>       { <span class="hljs-regexp">/* 2 */</span> }
<span class="hljs-symbol">:</span><span class="hljs-symbol">:-webkit-scrollbar-track</span>        { <span class="hljs-regexp">/* 3 */</span> }
<span class="hljs-symbol">:</span><span class="hljs-symbol">:-webkit-scrollbar-track-piece</span>  { <span class="hljs-regexp">/* 4 */</span> }
<span class="hljs-symbol">:</span><span class="hljs-symbol">:-webkit-scrollbar-thumb</span>        { <span class="hljs-regexp">/* 5 */</span> }
<span class="hljs-symbol">:</span><span class="hljs-symbol">:-webkit-scrollbar-corner</span>       { <span class="hljs-regexp">/* 6 */</span> }
<span class="hljs-symbol">:</span><span class="hljs-symbol">:-webkit-resizer</span>                { <span class="hljs-regexp">/* 7 */</span> }</code></pre>
<p>属性介绍：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="::-webkit-scrollbar    //滚动条整体部分
::-webkit-scrollbar-button   //滚动条两端的按钮
::-webkit-scrollbar-track   // 外层轨道
::-webkit-scrollbar-track-piece    //内层轨道，滚动条中间部分（除去）
::-webkit-scrollbar-thumb //滚动条里面可以拖动的那个
::-webkit-scrollbar-corner   //边角
::-webkit-resizer   ///定义右下角拖动块的样式" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>::-webkit-scrollbar    <span class="hljs-comment">//滚动条整体部分</span>
::-webkit-scrollbar-button   <span class="hljs-comment">//滚动条两端的按钮</span>
::-webkit-scrollbar-track   <span class="hljs-comment">// 外层轨道</span>
::-webkit-scrollbar-track-piece    <span class="hljs-comment">//内层轨道，滚动条中间部分（除去）</span>
::-webkit-scrollbar-thumb <span class="hljs-comment">//滚动条里面可以拖动的那个</span>
::-webkit-scrollbar-corner   <span class="hljs-comment">//边角</span>
::-webkit-resizer   <span class="hljs-comment">///定义右下角拖动块的样式</span></code></pre>
<p>2.设置样式</p>
<p><a href="http://www.xuanfengge.com/demo/201311/scroll/css3-scroll.html" rel="nofollow noreferrer" target="_blank">demo</a><br>进入页面，打开控制台工具，选中其中一个样式，就能看到该样式的CSS源码。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*定义滚动条高宽及背景
 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar
{
    width:16px;
    height:16px;
    background-color:#F5F5F5;
}
/*定义滚动条轨道
 内阴影+圆角*/
::-webkit-scrollbar-track
{
    -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,0.3);
    border-radius:10px;
    background-color:#F5F5F5;
}
/*定义滑块
 内阴影+圆角*/
::-webkit-scrollbar-thumb
{
    border-radius:10px;
    -webkit-box-shadow:inset 0 0 6px rgba(0,0,0,.3);
    background-color:#555;
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-comment">/*定义滚动条高宽及背景
 高宽分别对应横竖滚动条的尺寸*/</span>
<span class="hljs-selector-pseudo">::-webkit-scrollbar</span>
{
    <span class="hljs-attribute">width</span>:<span class="hljs-number">16px</span>;
    <span class="hljs-attribute">height</span>:<span class="hljs-number">16px</span>;
    <span class="hljs-attribute">background-color</span>:<span class="hljs-number">#F5F5F5</span>;
}
<span class="hljs-comment">/*定义滚动条轨道
 内阴影+圆角*/</span>
<span class="hljs-selector-pseudo">::-webkit-scrollbar-track</span>
{
    <span class="hljs-attribute">-webkit-box-shadow</span>:inset <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">6px</span> <span class="hljs-built_in">rgba</span>(0,0,0,0.3);
    <span class="hljs-attribute">border-radius</span>:<span class="hljs-number">10px</span>;
    <span class="hljs-attribute">background-color</span>:<span class="hljs-number">#F5F5F5</span>;
}
<span class="hljs-comment">/*定义滑块
 内阴影+圆角*/</span>
<span class="hljs-selector-pseudo">::-webkit-scrollbar-thumb</span>
{
    <span class="hljs-attribute">border-radius</span>:<span class="hljs-number">10px</span>;
    <span class="hljs-attribute">-webkit-box-shadow</span>:inset <span class="hljs-number">0</span> <span class="hljs-number">0</span> <span class="hljs-number">6px</span> <span class="hljs-built_in">rgba</span>(0,0,0,.3);
    <span class="hljs-attribute">background-color</span>:<span class="hljs-number">#555</span>;
}
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV1R2y?w=1888&amp;h=932" src="https://static.alili.tech/img/bV1R2y?w=1888&amp;h=932" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>任何对象都可以设置：边框、阴影、背景图片等等，创建的滚动条任然会按照操作系统本身的设置来完成其交互的行为。下面的伪类可以应用到上面的伪元素中。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=":horizontal//适用于任何水平方向上的滚动条
:vertical//适用于任何垂直方向的滚动条
:decrement//适用于按钮和轨道碎片。表示递减的按钮或轨道碎片，例如可以使区域向上或者向右移动的区域和按钮
:increment//适用于按钮和轨道碎片。表示递增的按钮或轨道碎片，例如可以使区域向下或者向左移动的区域和按钮
:start//适用于按钮和轨道碎片。表示对象（按钮轨道碎片）是否放在滑块的前面
:end //适用于按钮和轨道碎片。表示对象（按钮轨道碎片）是否放在滑块的后面
:double-button//适用于按钮和轨道碎片。判断轨道结束的位置是否是一对按钮。也就是轨道碎片紧挨着一对在一起的按钮。
:single-button//适用于按钮和轨道碎片。判断轨道结束的位置是否是一个按钮。也就是轨道碎片紧挨着一个单独的按钮。
:no-button//表示轨道结束的位置没有按钮。
:corner-present//表示滚动条的角落是否存在。
:window-inactive//适用于所有滚动条，表示包含滚动条的区域，焦点不在该窗口的时候。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-pseudo">:horizontal</span><span class="hljs-comment">//适用于任何水平方向上的滚动条</span>
<span class="hljs-selector-pseudo">:vertical</span><span class="hljs-comment">//适用于任何垂直方向的滚动条</span>
<span class="hljs-selector-pseudo">:decrement</span><span class="hljs-comment">//适用于按钮和轨道碎片。表示递减的按钮或轨道碎片，例如可以使区域向上或者向右移动的区域和按钮</span>
<span class="hljs-selector-pseudo">:increment</span><span class="hljs-comment">//适用于按钮和轨道碎片。表示递增的按钮或轨道碎片，例如可以使区域向下或者向左移动的区域和按钮</span>
<span class="hljs-selector-pseudo">:start</span><span class="hljs-comment">//适用于按钮和轨道碎片。表示对象（按钮轨道碎片）是否放在滑块的前面</span>
<span class="hljs-selector-pseudo">:end</span> <span class="hljs-comment">//适用于按钮和轨道碎片。表示对象（按钮轨道碎片）是否放在滑块的后面</span>
<span class="hljs-selector-pseudo">:double-button</span><span class="hljs-comment">//适用于按钮和轨道碎片。判断轨道结束的位置是否是一对按钮。也就是轨道碎片紧挨着一对在一起的按钮。</span>
<span class="hljs-selector-pseudo">:single-button</span><span class="hljs-comment">//适用于按钮和轨道碎片。判断轨道结束的位置是否是一个按钮。也就是轨道碎片紧挨着一个单独的按钮。</span>
<span class="hljs-selector-pseudo">:no-button</span><span class="hljs-comment">//表示轨道结束的位置没有按钮。</span>
<span class="hljs-selector-pseudo">:corner-present</span><span class="hljs-comment">//表示滚动条的角落是否存在。</span>
<span class="hljs-selector-pseudo">:window-inactive</span><span class="hljs-comment">//适用于所有滚动条，表示包含滚动条的区域，焦点不在该窗口的时候。</span></code></pre>
<p>用法举例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="::-webkit-scrollbar-track-piece:start {
   /* Select the top half (or left half) or scrollbar track individually */
}

::-webkit-scrollbar-thumb:window-inactive {
   /* Select the thumb when the browser window isn't in focus */
}

::-webkit-scrollbar-button:horizontal:decrement:hover {
   /* Select the down or left scroll button when it's being hovered by the mouse */
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs asciidoc"><code><span class="hljs-meta">::-webkit-scrollbar-track-piece:start</span> {
<span class="hljs-code">   /* Select the top half (or left half) or scrollbar track individually */</span>
}

<span class="hljs-meta">::-webkit-scrollbar-thumb:window-inactive</span> {
<span class="hljs-code">   /* Select the thumb when the browser window isn't in focus */</span>
}

<span class="hljs-meta">::-webkit-scrollbar-button:horizontal:decrement:hover</span> {
<span class="hljs-code">   /* Select the down or left scroll button when it's being hovered by the mouse */</span>
}</code></pre>
<p>3.IE浏览器<br>兼容IE的参考链接：<a href="https://www.cnblogs.com/koleyang/p/5484922.html" rel="nofollow noreferrer" target="_blank">https://www.cnblogs.com/koley...</a></p>
<p><span class="img-wrap"><img data-src="/img/bV1R7R?w=500&amp;h=475" src="https://static.alili.tech/img/bV1R7R?w=500&amp;h=475" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV1R8h?w=954&amp;h=289" src="https://static.alili.tech/img/bV1R8h?w=954&amp;h=289" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader2">三 后记</h1>
<p>Chrome能很好的支持自定义滚动条，其它的浏览器在不同程度上支持自定义滚动条样式。<br>参考文章：<a href="http://blog.csdn.net/cysear/article/details/70264148" rel="nofollow noreferrer" target="_blank">http://blog.csdn.net/cysear/a...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
css scrollbar样式设置

## 原文链接
[https://segmentfault.com/a/1190000012800450](https://segmentfault.com/a/1190000012800450)

