---
title: 'CSS3 flex 布局 （转：阮一峰）' 
date: 2018-12-28 2:30:11
hidden: true
slug: 752xbh0ibyi
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">新版本</h1>
<p>新版本的 Flexbox 模型于 2012 年 9 月提出。</p>
<p>新版本弹性伸缩盒的<code>display</code>属性值：</p>
<table>
<thead><tr>
<th>属性值</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td><code>flex</code></td>
<td>将容器盒模型作为<strong>块级弹性伸缩盒</strong>显示</td>
</tr>
<tr>
<td><code>inline-flex</code></td>
<td>将容器盒模型作为<strong>内联级弹性伸缩盒</strong>显示</td>
</tr>
</tbody>
</table>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div {
    display: flex;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-tag">div</span> {
    <span class="hljs-attribute">display</span>: flex;
}</code></pre>
<p><strong>注意</strong>：设为 Flex 布局以后，<code>flex</code>容器子元素的<code>float</code>、<code>clear</code>和<code>vertical-align</code>属性将失效。</p>
<h2 id="articleHeader1">浏览器兼容性</h2>
<table>
<thead><tr>
<th>IE</th>
<th>Firefox</th>
<th>Chrome</th>
<th>Opera</th>
<th>Safari</th>
</tr></thead>
<tbody><tr>
<td>10+</td>
<td>22+</td>
<td>21+</td>
<td>12.1+</td>
<td>6.1+</td>
</tr></tbody>
</table>
<h1 id="articleHeader2">基本概念</h1>
<p>采用 Flex 布局的元素，称为 Flex 容器（flex container），简称：<strong>容器</strong></p>
<p>容器的所有子元素自动成为容器成员，称为 Flex 项目（flex item），简称：<strong>项目</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011650904" src="https://static.alili.tech/img/remote/1460000011650904" alt="flex_001" title="flex_001" style="cursor: pointer; display: inline;"></span></p>
<p>容器默认存在两根轴：水平的<strong>主轴</strong>（main axis）和垂直的<strong>交叉轴</strong>（cross axis）。</p>
<ul>
<li>主轴的开始位置（与边框的交叉点）叫做<code>main start</code>
</li>
<li>主轴结束位置（与边框的交叉点）叫做<code>main end</code>
</li>
<li>交叉轴的开始位置叫做<code>cross start</code>
</li>
<li>交叉轴的结束位置叫做<code>cross end</code>
</li>
</ul>
<p>项目默认沿主轴排列。</p>
<ul>
<li>单个项目占据的主轴空间叫做<code>main size</code>
</li>
<li>单个项目占据的交叉轴空间叫做<code>cross size</code>
</li>
</ul>
<h1 id="articleHeader3">属性详解</h1>
<h2 id="articleHeader4">容器属性</h2>
<h3 id="articleHeader5"><code>flex-direction</code></h3>
<p><code>flex-direction</code>属性用于设置项目排列的依据（主轴或交叉轴）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="flex-direction: row | column | row-reverse | column-reverse;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs excel"><code style="word-break: break-word; white-space: initial;">flex-directi<span class="hljs-symbol">on:</span> <span class="hljs-built_in">row</span> | <span class="hljs-built_in">column</span> | <span class="hljs-built_in">row</span>-reverse | <span class="hljs-built_in">column</span>-reverse;</code></pre>
<ul><li>默认值：<strong><code>row</code></strong>
</li></ul>
<table>
<thead><tr>
<th>属性值</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td><code>row</code></td>
<td>依据主轴排列，起点在左端</td>
</tr>
<tr>
<td><code>column</code></td>
<td>依据交叉轴排列，起点在右端</td>
</tr>
<tr>
<td><code>row-reverse</code></td>
<td>依据交叉轴排列，起点在上沿</td>
</tr>
<tr>
<td><code>column-reverse</code></td>
<td>依据交叉轴排列，起点在下沿</td>
</tr>
</tbody>
</table>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011650905?w=796&amp;h=203" src="https://static.alili.tech/img/remote/1460000011650905?w=796&amp;h=203" alt="flex_002" title="flex_002" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader6"><code>flex-wrap</code></h3>
<p><code>flex-wrap</code>属性定义，如果<strong>项目</strong>在一条轴线排不下，如何换行。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="flex-wrap: nowrap | wrap | wrap-reverse;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lua"><code style="word-break: break-word; white-space: initial;">flex-<span class="hljs-built_in">wrap</span>: nowrap | <span class="hljs-built_in">wrap</span> | <span class="hljs-built_in">wrap</span>-reverse;</code></pre>
<ul><li>默认值：<strong><code>nowrap</code></strong>
</li></ul>
<table>
<thead><tr>
<th>属性值</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td><code>nowrap</code></td>
<td>不换行，都在一行显示</td>
</tr>
<tr>
<td><code>wrap</code></td>
<td>自动换行，第一行在上方</td>
</tr>
<tr>
<td><code>wrap-reverse</code></td>
<td>自动换行，第一行在下方</td>
</tr>
</tbody>
</table>
<ul><li>
<strong><code>nowrap</code></strong> ：不换行</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011650906?w=700&amp;h=145" src="https://static.alili.tech/img/remote/1460000011650906?w=700&amp;h=145" alt="flex_004" title="flex_004" style="cursor: pointer;"></span></p>
<ul><li>
<strong><code>wrap</code></strong> ：换行，第一行在上方</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011650907?w=700&amp;h=177" src="https://static.alili.tech/img/remote/1460000011650907?w=700&amp;h=177" alt="flex_005" title="flex_005" style="cursor: pointer;"></span></p>
<ul><li>
<strong><code>wrap-reverse</code></strong> ：换行，第一行在下方</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011650908?w=700&amp;h=177" src="https://static.alili.tech/img/remote/1460000011650908?w=700&amp;h=177" alt="flex_006" title="flex_006" style="cursor: pointer;"></span></p>
<h3 id="articleHeader7"><code>flex-flow</code></h3>
<p><code>flex-flow</code>属性是<code>flex-direction</code>（排列方向）和<code>flex-wrap</code>（控制换行）的简写形式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="flex-flow: <flex-direction> || <flex-wrap>;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;">flex-flow: <span class="hljs-tag">&lt;<span class="hljs-name">flex-direction</span>&gt;</span> || <span class="hljs-tag">&lt;<span class="hljs-name">flex-wrap</span>&gt;</span>;</code></pre>
<ul><li>默认值：<strong><code>row nowrap</code></strong>
</li></ul>
<h3 id="articleHeader8"><code>justify-content</code></h3>
<p><code>justify-content</code>属性用于设置项目在主轴的对齐方式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="justify-content: flex-start | flex-end | center | space-between | space-around;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">justify-content: flex-<span class="hljs-keyword">start</span> | flex-<span class="hljs-keyword">end</span> | center | <span class="hljs-keyword">space</span>-<span class="hljs-keyword">between</span> | <span class="hljs-keyword">space</span>-around;</code></pre>
<ul><li>默认值：<strong><code>flex-start</code></strong>
</li></ul>
<table>
<thead><tr>
<th>属性值</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td><code>flex-start</code></td>
<td>项目以主轴左侧对齐</td>
</tr>
<tr>
<td><code>flex-end</code></td>
<td>项目以主轴右侧对齐</td>
</tr>
<tr>
<td><code>center</code></td>
<td>项目以主轴中心居中对齐</td>
</tr>
<tr>
<td><code>space-between</code></td>
<td>项目两端对齐，项目之间的间隔都相等</td>
</tr>
<tr>
<td><code>space-around</code></td>
<td>项目两端对齐，每个项目两侧的间隔相等</td>
</tr>
</tbody>
</table>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011650909?w=637&amp;h=763" src="https://static.alili.tech/img/remote/1460000011650909?w=637&amp;h=763" alt="flex_007" title="flex_007" style="cursor: pointer;"></span></p>
<h3 id="articleHeader9"><code>align-items</code></h3>
<p><code>align-items</code>属性用于设置项目在交叉轴的对齐方式。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="align-items: stretch | flex-start | flex-end | center | baseline;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code style="word-break: break-word; white-space: initial;">align-items: stretch | <span class="hljs-type">flex</span>-start | <span class="hljs-type">flex</span>-<span class="hljs-keyword">end</span> | <span class="hljs-type">center</span> | <span class="hljs-type">baseline</span>;</code></pre>
<ul><li>默认值：<strong><code>stretch</code></strong>
</li></ul>
<table>
<thead><tr>
<th>属性值</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td><code>stretch</code></td>
<td>如果项目未设置高度或设为<code>auto</code>，将占满整个容器的高度</td>
</tr>
<tr>
<td><code>flex-start</code></td>
<td>项目以交叉轴起点对齐</td>
</tr>
<tr>
<td><code>flex-end</code></td>
<td>项目以交叉轴终点对齐</td>
</tr>
<tr>
<td><code>center</code></td>
<td>项目以交叉轴的中点对齐</td>
</tr>
<tr>
<td><code>baseline</code></td>
<td>项目以第一行文字的基线对齐</td>
</tr>
</tbody>
</table>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011650910" src="https://static.alili.tech/img/remote/1460000011650910" alt="flex_008" title="flex_008" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader10"><code>align-content</code></h2>
<p><code>align-content</code>属性用于设置多根轴线的对齐方式。</p>
<blockquote><p><strong>注意</strong>：如果项目只有一根轴线，该属性不起作用。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="align-content: stretch | flex-start | flex-end | center | space-between | space-around;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code>align-content: stretch | <span class="hljs-type">flex</span>-start | <span class="hljs-type">flex</span>-<span class="hljs-keyword">end</span> | <span class="hljs-type">center</span> | <span class="hljs-type">space</span>-between | <span class="hljs-type">space</span>-around;
</code></pre>
<ul><li>默认值：<strong><code>stretch</code></strong>
</li></ul>
<table>
<thead><tr>
<th>属性值</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td><code>stretch</code></td>
<td>轴线占满整个交叉轴</td>
</tr>
<tr>
<td><code>flex-start</code></td>
<td>以交叉轴起点对齐</td>
</tr>
<tr>
<td><code>flex-end</code></td>
<td>以交叉轴的终点对齐</td>
</tr>
<tr>
<td><code>center</code></td>
<td>以交叉轴的中点对齐</td>
</tr>
<tr>
<td><code>space-between</code></td>
<td>以交叉轴两端对齐，轴线之间的间隔平均分布</td>
</tr>
<tr>
<td><code>space-around</code></td>
<td>以交叉轴两端对齐，每根轴线两侧的间隔都相等</td>
</tr>
</tbody>
</table>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011650911?w=620&amp;h=786" src="https://static.alili.tech/img/remote/1460000011650911?w=620&amp;h=786" alt="flex_009" title="flex_009" style="cursor: pointer;"></span></p>
<h2 id="articleHeader11">项目属性</h2>
<h3 id="articleHeader12"><code>order</code></h3>
<p><code>order</code>属性设置项目出现的顺序。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="order: <integer>;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">order:</span> <span class="hljs-params">&lt;integer&gt;</span>;</code></pre>
<ul><li>默认值：<strong><code>0</code></strong>
</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011650912" src="https://static.alili.tech/img/remote/1460000011650912" alt="flex_010" title="flex_010" style="cursor: pointer;"></span></p>
<h3 id="articleHeader13"><code>flex-grow</code></h3>
<p><code>flex-grow</code>属性用于设置项目的放大比例（分配剩余空间）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="flex-grow: <number>;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">flex-grow</span>: &lt;number&gt;;</code></pre>
<ul>
<li>默认值：<strong><code>0</code></strong>
</li>
<li>如果所有项目的<code>flex-grow</code>属性都为<code>1</code>，则它们将等分剩余空间</li>
<li>如果一个项目的<code>flex-grow</code>属性为<code>2</code>，其他项目都为<code>1</code>，则前者占据的剩余空间将比其他项多一倍。</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011650913" src="https://static.alili.tech/img/remote/1460000011650913" alt="flex_011" title="flex_011" style="cursor: pointer;"></span></p>
<h3 id="articleHeader14"><code>flex-shrink</code></h3>
<p><code>flex-shrink</code>属性用于设置项目的缩小比例（处理溢出空间）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="flex-shrink: <number>;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code style="word-break: break-word; white-space: initial;">flex-<span class="hljs-keyword">shrink: </span>&lt;number&gt;<span class="hljs-comment">;</span></code></pre>
<ul>
<li>默认值：<strong><code>1</code></strong>
</li>
<li>如果所有项目的<code>flex-shrink</code>属性都为<code>1</code>，则当空间不足时，都将等比例缩小。</li>
<li>如果一个项目的<code>flex-shrink</code>属性为<code>0</code>，则空间不足时，该项目不缩小。</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011650914?w=700&amp;h=145" src="https://static.alili.tech/img/remote/1460000011650914?w=700&amp;h=145" alt="flex_012" title="flex_012" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader15"><code>flex-basis</code></h3>
<p><code>flex-basis</code>属性定义了分配多余空间之前，项目占据的主轴空间</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="flex-basis: auto | <length>;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code style="word-break: break-word; white-space: initial;">flex-basis: <span class="hljs-built_in">auto</span> | <span class="hljs-type">&lt;length</span>&gt;;</code></pre>
<ul>
<li>默认值：<strong><code>auto</code></strong>
</li>
<li>浏览器根据这个属性，计算主轴是否有多余空间。</li>
<li>
<code>flex-basis</code>属性设置固定值（例如：<code>350px</code>），则项目将占据固定空间。</li>
</ul>
<h3 id="articleHeader16"><code>flex</code></h3>
<p><code>flex</code> 属性是<code>flex-grow</code>, <code>flex-shrink</code> 和 <code>flex-basis</code>的简写</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="flex: none | [ <flex-grow> <flex-shrink> || <flex-basis> ]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-symbol">flex:</span> none | [ <span class="hljs-params">&lt;flex-grow&gt;</span> <span class="hljs-params">&lt;flex-shrink&gt;</span> || <span class="hljs-params">&lt;flex-basis&gt;</span> ]
</code></pre>
<ul><li>默认值：<strong><code>0 1 auto</code></strong>
</li></ul>
<table>
<thead><tr>
<th>属性值</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td><code>auto</code></td>
<td>(1 1 auto)</td>
</tr>
<tr>
<td><code>none</code></td>
<td>(0 0 auto)</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader17"><code>align-self</code></h3>
<p><code>align-self</code>用于单独设置某个项目在<strong>交叉轴</strong>的对齐方式，可覆盖<code>align-items</code>属性。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="align-self: auto | stretch | flex-start | flex-end | center | baseline;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coq"><code style="word-break: break-word; white-space: initial;">align-self: <span class="hljs-built_in">auto</span> | <span class="hljs-type">stretch</span> | <span class="hljs-type">flex</span>-start | <span class="hljs-type">flex</span>-<span class="hljs-keyword">end</span> | <span class="hljs-type">center</span> | <span class="hljs-type">baseline</span>;</code></pre>
<ul><li>默认值：<strong><code>auto</code></strong>
</li></ul>
<table>
<thead><tr>
<th>属性值</th>
<th>说明</th>
</tr></thead>
<tbody>
<tr>
<td><code>auto</code></td>
<td>表示继承父元素的<code>align-items</code>属性</td>
</tr>
<tr>
<td><code>stretch</code></td>
<td>如果项目未设置高度或设为<code>auto</code>，将占满整个容器的高度</td>
</tr>
<tr>
<td><code>flex-start</code></td>
<td>项目以交叉轴起点对齐</td>
</tr>
<tr>
<td><code>flex-end</code></td>
<td>项目以交叉轴终点对齐</td>
</tr>
<tr>
<td><code>center</code></td>
<td>项目以交叉轴的中点对齐</td>
</tr>
<tr>
<td><code>baseline</code></td>
<td>项目以第一行文字的基线对齐</td>
</tr>
</tbody>
</table>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011650915?w=743&amp;h=390" src="https://static.alili.tech/img/remote/1460000011650915?w=743&amp;h=390" alt="flex_013" title="flex_013" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader18">参考资源</h1>
<p><a href="http://www.ruanyifeng.com/blog/2015/07/flex-grammar.html" rel="nofollow noreferrer" target="_blank">阮一峰：Flex 布局教程：语法篇</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
CSS3 flex 布局 （转：阮一峰）

## 原文链接
[https://segmentfault.com/a/1190000011650901](https://segmentfault.com/a/1190000011650901)

