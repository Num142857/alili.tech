---
title: 'CSS基础：block，inline和inline-block' 
date: 2019-02-14 2:30:37
hidden: true
slug: r874wv7tm7
categories: [reprint]
---

{{< raw >}}

                    
<p>css的display属性是前端开发中非常常见的属性，本文简单介绍下其中比较常用的属性值，即block、inline和inline-block。</p>
<p>HTML组件中呈现一片空白区域的组件都可当盒模型（box modal），而CSS则提供了display属性来控制盒模型的外观。</p>
<p><strong>1. block类型（块）</strong></p>
<p>这种盒模型的组件默认占据一行，允许通过CSS设置宽带、高度。</p>
<p>例如：<code>&lt;div .../&gt;</code>、<code>&lt;p ../.&gt;</code> 、<code>&lt;form../&gt;</code>、<code>&lt;table../</code>、<code>&lt;h1&gt;</code>到<code>&lt;h6&gt;</code>、<code>&lt;ul../&gt;</code>等。</p>
<p>display：block<br>block 元素会独占一行，多个block元素会各自新起一行。默认情况下，block元素宽度会自动填满其父元素的宽度。<br>block元素可以设置width,height属性。块级元素及时设置了宽度，仍然是独占一行。<br>block元素可以设置margin和padding属性。</p>
<p><strong>2. inline类型（内联）</strong></p>
<p>这种盒模型的组件不会占据一行，不可以调整宽度、高度。</p>
<p>例如：<code>&lt;span../&gt;</code>、<code>&lt;a../&gt; &lt;strong../&gt;</code>、<code>&lt;em../&gt;</code>、<code>&lt;label../&gt;</code>、<code>&lt;input../&gt;</code>、<code>&lt;select../&gt;</code>、<code>&lt;textarea../&gt;</code>、<code>&lt;img../&gt;</code>、<code>&lt;br../&gt;</code>。</p>
<p>CSS为display属性提供了block、inline两个属性值，可以改变HTML组件默认的盒模型。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="display：inline
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-built_in">display</span>：<span class="hljs-keyword">inline</span>
</code></pre>
<p>inline元素不会独占一行，多个相邻的行内元素会排列在同一行里，直到一行排列不下，才会新换一行，其宽度随元素的内容而变化。</p>
<p>inline元素设置width,height均无效。</p>
<p>inline元素的margin和padding属性，水平方向的padding-left、padding-right、margin-left、margin-right都产生边距效果，但竖直方向上的padding-top、padding-bottom、margin-top和margin-bottom不会产生边距效果。</p>
<p><strong>3. inline-block类型</strong></p>
<p>CSS还提供了一种inline-block盒模型，这种盒模型时inline模型和block模型的综合体：inline-block盒模型的元素不会占据一行，同时也支持width、height指定指定宽带及高度。并且允许它的左边和右边出现其他内容。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="display:inline-block
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-built_in">display</span>:<span class="hljs-keyword">inline</span>-block
</code></pre>
<p>简单来说就是将对象呈现为inline对象，但是对象的内容作为block对象呈现。之后的内联元素会被排列在同一行内。比如可以给一个link（<code>&lt;a&gt;</code>元素)inline-block属性，使其既有block的宽度高度特性、又具有inline的可同行性。</p>
<p><strong>应用场合</strong></p>
<p>很多时候我们必须让一些块元素并排显示，一般会想到浮动，但是块元素浮动设边距的时候在IE下会出现加倍的BUG，所以很多时候不得不把这个块元素套在一个内联元素里，然后给这个内敛元素浮动和边距。通过设置：display：inline-block，就将对象呈递为内联对象，但对象的内容作为块对象呈递。旁边的内联对象会被呈递在同一行内，允许空格。</p>
<p><strong>说明：</strong></p>
<p>block元素可以包含block元素和inline元素，但inline元素只能包含inline元素。要注意这个是一个大概的说法，每个特定的元素能包含的元素也是特定的，所以具体到个别元素上，这条规律是不适用的。比如p元素，只能包含inline元素，而不能包含block元素。</p>
<p>一般来说，可以通过display:inline和display：block的设置来改变元素的布局级别。</p>
<p>兼容性问题：IE6、IE7不支持inline-block，所以在IE中对内联元素使用display：inline-block理论上IE是不识别的，但会在IE下触发layout，从而使内联元素拥有了display：inline-block属性的表象。</p>
<p><strong>解决IE6、IE7兼容性的方法：</strong></p>
<p>首先设置inline-block触发块元素，具有了layout的特性，然后设置display:inline使块元素呈现内联元素，此时layout的特性不会消失。</p>
<p>直接设置display：inline，使用zoom:1触发layout。<br>兼容所有浏览器的方法是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  .selector {
        display : inline-block;
        *display : inine;
        *zoom:1;
        }
        " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code>  .selector {
        <span class="hljs-keyword">display </span>: inline-<span class="hljs-keyword">block;
</span>        *<span class="hljs-keyword">display </span>: inine<span class="hljs-comment">;</span>
        *zoom:<span class="hljs-number">1</span><span class="hljs-comment">;</span>
        }
        </code></pre>
<p>本文只列出了display常见的三个属性，除此之外，display的属性值还有：inline-table、和表格相关的盒模型、list-item、run-in等。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS基础：block，inline和inline-block

## 原文链接
[https://segmentfault.com/a/1190000016891690](https://segmentfault.com/a/1190000016891690)

