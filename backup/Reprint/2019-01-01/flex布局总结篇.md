---
title: 'flex布局总结篇' 
date: 2019-01-01 2:30:07
hidden: true
slug: l2uiguqlpjj
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>最近难得有空，总结一下flex布局相关知识点，如有错漏，请大神指点纠正，谢谢~</blockquote>
<h1 id="articleHeader0">flex布局总结:</h1>
<h2 id="articleHeader1">快速记忆</h2>
<ul>
<li>主轴方向记住justify</li>
<li>
<p>交叉轴方向记住align</p>
<ul><li>
<p>关系就是：</p>
<ul>
<li>justify-content</li>
<li>align-items</li>
<li>align-self</li>
</ul>
</li></ul>
</li>
<li>设置主轴方向flex-direction</li>
<li>设置换行：flex-wrap</li>
<li>设置主轴和换行的复合属性：flex-flow</li>
<li>设置伸缩基准：felx-basis</li>
<li>设置拉伸：flex-grow</li>
<li>设置缩放：flex-strink</li>
<li>设置子元素顺序：order</li>
</ul>
<h3 id="articleHeader2">兼容性写法：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  display: -webkit-box;
  display:-moz-box;
  display:-ms-flexbox;
  display:-webkit-flex;
  display:flex;

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>  <span class="hljs-attribute">display</span>: -webkit-box;
  <span class="hljs-attribute">display</span>:-moz-box;
  <span class="hljs-attribute">display</span>:-ms-flexbox;
  <span class="hljs-attribute">display</span>:-webkit-flex;
  <span class="hljs-attribute">display</span>:flex;

</code></pre>
<h2 id="articleHeader3">四种布局方式：</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1.标准文档流
2.浮动布局
3.定位布局
4.flex布局
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-number">1.</span>标准文档流
<span class="hljs-number">2.</span>浮动布局
<span class="hljs-number">3.</span>定位布局
<span class="hljs-number">4.</span>flex布局
</code></pre>
<h2 id="articleHeader4">flex布局核心：</h2>
<blockquote>flex核心主要在轴和容器上做文章，下面主要以轴（主轴和交叉轴）和容器（父容器和子容器）来阐述。</blockquote>
<h3 id="articleHeader5">容器:父容器</h3>
<p>父容器属性可以设置子容器统一排列方式</p>
<h3 id="articleHeader6">主轴方向：</h3>
<h4>1.justify-content：</h4>
<p>父容器设置子容器在主轴的排列：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="对应属性值排列方式：

*位置排列：
flex-start
flex-end
center

*分布排列：
space-around
space-between
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>对应属性值排列方式：

*位置排列：
flex-start
flex-<span class="hljs-keyword">end</span>
center

*分布排列：
<span class="hljs-literal">space</span>-<span class="hljs-keyword">around</span>
<span class="hljs-literal">space</span>-<span class="hljs-keyword">between</span>
</code></pre>
<h3 id="articleHeader7">交叉轴方向：</h3>
<h4>2.align-items：</h4>
<p>父容器设置子容器在交叉轴的排列：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="对应属性值排列方式：

*位置排列：
flex-start
flex-end
center

*基线排列：
baseline

*拉伸排列：
stretch
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>对应属性值排列方式：

*位置排列：
<span class="hljs-attribute">flex</span>-start
<span class="hljs-attribute">flex</span>-end
center

*基线排列：
baseline

*拉伸排列：
stretch
</code></pre>
<h3 id="articleHeader8">进阶属性：</h3>
<h4>3.flex-wrap：设置换行方式</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="换行：wrap
不换行：nowrap
逆序换行：wrap-reverse
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livecodeserver"><code>换行：<span class="hljs-keyword">wrap</span>
不换行：nowrap
逆序换行：<span class="hljs-keyword">wrap</span>-reverse
</code></pre>
<blockquote>逆序换行是指沿着交叉轴的反方向换行</blockquote>
<h4>4.flex-flow:轴向和换行，是flex-direction和flex-wrap的组合属性</h4>
<p>flow 即流向，也就是子容器沿着哪个方向流动，流动到终点是否允许换行，比如 flex-flow: row wrap，flex-flow 是一个复合属性，相当于 flex-direction 与 flex-wrap 的组合，可选的取值如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
row nowrap、column wrap 等，也可两者同时设置
            " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs excel"><code>
<span class="hljs-built_in">row</span> nowrap、<span class="hljs-built_in">column</span> wrap 等，也可两者同时设置
            </code></pre>
<h4>5.align-content:多行沿交叉轴对齐：</h4>
<p>当子容器多行排列时，设置行与行之间的对齐方式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="对应属性值排列方式：

*位置排列：
flex-start
flex-end
center

*分布排列：
space-around
space-between

*拉伸排列：
stretch
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>对应属性值排列方式：

*位置排列：
flex-start
flex-<span class="hljs-keyword">end</span>
center

*分布排列：
<span class="hljs-literal">space</span>-<span class="hljs-keyword">around</span>
<span class="hljs-literal">space</span>-<span class="hljs-keyword">between</span>

*拉伸排列：
stretch
</code></pre>
<p>#### 6.flex-direction：<br>不同主轴方向位置不同</p>
<p>主轴位置方向对应属性值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="向右：row
向左：row-reverse
向下：coloumn
向上：coloumn-reverse
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>向右：<span class="hljs-built_in">row</span>
向左：<span class="hljs-built_in">row</span>-<span class="hljs-built_in">reverse</span>
向下：coloumn
向上：coloumn-<span class="hljs-built_in">reverse</span>
</code></pre>
<h3 id="articleHeader9">容器:子容器</h3>
<p>子容器属性可以设置自身排列方式</p>
<p>1.flex：</p>
<blockquote>子容器设置自身容器的伸缩比例：<br>对应属性值单位方式：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="无单位数字：1,2,3
有单位数字：15px,50px,100px
none关键字：不伸缩
            " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>无单位数字：<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>
有单位数字：<span class="hljs-number">15</span>px,<span class="hljs-number">50</span>px,<span class="hljs-number">100</span>px
none关键字：不伸缩
            </code></pre>
<p>2.align-self：</p>
<blockquote>子容器设置自身的交叉轴排列<br>对应属性值排列方式：</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="*位置排列：
    flex-start
    flex-end
    center
    
*基线排列：
    baseline
    
*拉伸排列：
    stretch
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code>*位置排列：
    <span class="hljs-attribute">flex</span>-start
    <span class="hljs-attribute">flex</span>-end
    center
    
*基线排列：
    baseline
    
*拉伸排列：
    stretch
    </code></pre>
<h3 id="articleHeader10">子容器进阶属性</h3>
<h4>3.flex-basis:设置基准大小</h4>
<ul>
<li>flex-basis 表示在不伸缩的情况下子容器的原始尺寸。</li>
<li>主轴为横向时代表宽度</li>
<li>主轴为纵向时代表高度：</li>
</ul>
<h4>4.flex-grow：设置扩展比例</h4>
<ul><li>子容器弹性伸展的比例,剩余空间按比例 扩展拉伸 分配</li></ul>
<h4>5.flex-shrink：设置收缩比例，剩余空间按比例 扩展收缩 分配</h4>
<ul><li>子容器弹性收缩的比例。</li></ul>
<h4>6.order:设置主轴排列顺序</h4>
<ul><li>改变子容器的排列顺序，覆盖 HTML 代码中的顺序，默认值为 0，可以为负值，数值越小排列越靠前。</li></ul>
<h2 id="articleHeader11">轴</h2>
<h3 id="articleHeader12">主轴:</h3>
<ul>
<li>决定容器水平方向的排列</li>
<li>主轴的起始端由 flex-start 表示，末尾段由 flex-end 表示</li>
</ul>
<h3 id="articleHeader13">交叉轴</h3>
<ul>
<li>决定容器垂直方向的排列</li>
<li>交叉轴的起始端和末尾段也由 flex-start 和 flex-end 表示</li>
<li>主轴沿逆时针旋转90°得到交叉轴</li>
</ul>
<h2 id="articleHeader14">flex布局共有13个属性</h2>
<ul>
<li>一个声明：display：flex</li>
<li>6个主容器</li>
<li>6个子容器</li>
</ul>
<p>如下图：</p>
<p><span class="img-wrap"><img data-src="/img/bVUsoI?w=864&amp;h=1114" src="https://static.alili.tech/img/bVUsoI?w=864&amp;h=1114" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
flex布局总结篇

## 原文链接
[https://segmentfault.com/a/1190000011033230](https://segmentfault.com/a/1190000011033230)

