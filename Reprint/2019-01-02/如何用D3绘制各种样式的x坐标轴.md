---
title: '如何用D3绘制各种样式的x坐标轴' 
date: 2019-01-02 2:30:09
hidden: true
slug: kgz5kc3d15f
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>该文只使用<code>d3.js</code>V4版本进行绘制，不关注V3版本，我们要与时俱进。</p></blockquote>
<p>在绘制图表的过程中，直坐标系是绕不开的一个问题，直方图，折线图，散点图等等都需要使用到直坐标系。而其中最关键的是x轴的绘制，因为y轴基本上都是数值显示。如何用代码实现，x轴的表现形式是什么，这是本文主要讨论的问题。</p>
<h3 id="articleHeader0">1 连续性x坐标轴</h3>
<h4>1.1 从零开始的连续性x坐标轴</h4>
<p>什么是从零开始，就是从绘制的坐标轴的最左端开始显示第一个刻度。<strong>折线图</strong>，<strong>散点图</strong>经常采用这种样式的x坐标轴。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let height = 400
let width = 600
let x = d3.scaleLinear().range([0, width])
let xScale = x.domain([0, 10])

// x轴
let xAxis = svg.append('g')
               .attr('class', 'xAxis')
               .attr('transform', `translate(0, ${height})`)
               .call(d3.axisBottom(xScale))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> height = <span class="hljs-number">400</span>
<span class="hljs-keyword">let</span> width = <span class="hljs-number">600</span>
<span class="hljs-keyword">let</span> x = d3.scaleLinear().range([<span class="hljs-number">0</span>, width])
<span class="hljs-keyword">let</span> xScale = x.domain([<span class="hljs-number">0</span>, <span class="hljs-number">10</span>])

<span class="hljs-comment">// x轴</span>
<span class="hljs-keyword">let</span> xAxis = svg.append(<span class="hljs-string">'g'</span>)
               .attr(<span class="hljs-string">'class'</span>, <span class="hljs-string">'xAxis'</span>)
               .attr(<span class="hljs-string">'transform'</span>, <span class="hljs-string">`translate(0, <span class="hljs-subst">${height}</span>)`</span>)
               .call(d3.axisBottom(xScale))</code></pre>
<p>使用<code>d3.axisTop</code>和<code>d3.axisBottom()</code>来控制刻度显示在坐标轴的上方或者下方。</p>
<p>表现形式：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010910311" src="https://static.alili.tech/img/remote/1460000010910311" alt="" title="" style="cursor: pointer;"></span></p>
<h4>1.2 不从零开始的连续性x坐标轴</h4>
<p>情况比较少，基本不用，所以不作阐述。</p>
<h4>1.3 时间型x坐标轴</h4>
<p>时间轴也是线性的，所以将它归为此类。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let height = 400
let width = 600
let x = d3.scaleTime().range([0, width])
let xScale = x.domain([new Date(2017, 1), new Date(2017, 6)])

// x轴
let xAxis = svg.append('g')
               .attr('class', 'xAxis')
               .attr('transform', `translate(0, ${height})`)
               .call(d3.axisBottom(xScale))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> height = <span class="hljs-number">400</span>
<span class="hljs-keyword">let</span> width = <span class="hljs-number">600</span>
<span class="hljs-keyword">let</span> x = d3.scaleTime().range([<span class="hljs-number">0</span>, width])
<span class="hljs-keyword">let</span> xScale = x.domain([<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-number">2017</span>, <span class="hljs-number">1</span>), <span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(<span class="hljs-number">2017</span>, <span class="hljs-number">6</span>)])

<span class="hljs-comment">// x轴</span>
<span class="hljs-keyword">let</span> xAxis = svg.append(<span class="hljs-string">'g'</span>)
               .attr(<span class="hljs-string">'class'</span>, <span class="hljs-string">'xAxis'</span>)
               .attr(<span class="hljs-string">'transform'</span>, <span class="hljs-string">`translate(0, <span class="hljs-subst">${height}</span>)`</span>)
               .call(d3.axisBottom(xScale))</code></pre>
<p>表现形式：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010910312" src="https://static.alili.tech/img/remote/1460000010910312" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">2 非连续性x坐标轴</h3>
<h4>2.1 不从零开始的非连续性x坐标轴</h4>
<p>先从不从零开始说起，因为这个用法比较正常。关键是使用<code>d3.scaleBand()</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let height = 400
let width = 600
let x = d3.scaleBand().range([0, width])
let xScale = x.domain(['北京', '上海', '广州', '深圳'])

// x轴
let xAxis = svg.append('g')
               .attr('class', 'xAxis')
               .attr('transform', `translate(0, ${height})`)
               .call(d3.axisBottom(xScale))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> height = <span class="hljs-number">400</span>
<span class="hljs-keyword">let</span> width = <span class="hljs-number">600</span>
<span class="hljs-keyword">let</span> x = d3.scaleBand().range([<span class="hljs-number">0</span>, width])
<span class="hljs-keyword">let</span> xScale = x.domain([<span class="hljs-string">'北京'</span>, <span class="hljs-string">'上海'</span>, <span class="hljs-string">'广州'</span>, <span class="hljs-string">'深圳'</span>])

<span class="hljs-comment">// x轴</span>
<span class="hljs-keyword">let</span> xAxis = svg.append(<span class="hljs-string">'g'</span>)
               .attr(<span class="hljs-string">'class'</span>, <span class="hljs-string">'xAxis'</span>)
               .attr(<span class="hljs-string">'transform'</span>, <span class="hljs-string">`translate(0, <span class="hljs-subst">${height}</span>)`</span>)
               .call(d3.axisBottom(xScale))</code></pre>
<p>表现形式：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010910313" src="https://static.alili.tech/img/remote/1460000010910313" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>基本上，柱状图都会采用这种x坐标轴。</p>
<h4>2.2 从零开始的非连续性x坐标轴</h4>
<p>使用<code>d3.scaleOrdinal()</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let height = 400
let width = 600
let x = d3.scaleOrdinal().range([150, 300, 450, 600])
let xScale = x.domain(['北京', '上海', '广州', '深圳'])

// x轴
let xAxis = svg.append('g')
               .attr('class', 'xAxisis')
               .attr('transform', `translate(0, ${height})`)
               .call(d3.axisBottom(xScale))" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">let</span> height = <span class="hljs-number">400</span>
<span class="hljs-keyword">let</span> width = <span class="hljs-number">600</span>
<span class="hljs-keyword">let</span> x = d3.scaleOrdinal().range([<span class="hljs-number">150</span>, <span class="hljs-number">300</span>, <span class="hljs-number">450</span>, <span class="hljs-number">600</span>])
<span class="hljs-keyword">let</span> xScale = x.domain([<span class="hljs-string">'北京'</span>, <span class="hljs-string">'上海'</span>, <span class="hljs-string">'广州'</span>, <span class="hljs-string">'深圳'</span>])

<span class="hljs-comment">// x轴</span>
<span class="hljs-keyword">let</span> xAxis = svg.append(<span class="hljs-string">'g'</span>)
               .attr(<span class="hljs-string">'class'</span>, <span class="hljs-string">'xAxisis'</span>)
               .attr(<span class="hljs-string">'transform'</span>, <span class="hljs-string">`translate(0, <span class="hljs-subst">${height}</span>)`</span>)
               .call(d3.axisBottom(xScale))</code></pre>
<p>表现形式：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010910314" src="https://static.alili.tech/img/remote/1460000010910314" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>在正常情况中，x轴的数据经常是非线性的。而绘制折线图，散点图等等又需要采用这种表现形式，所以这种方法是比较常用的。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何用D3绘制各种样式的x坐标轴

## 原文链接
[https://segmentfault.com/a/1190000010910308](https://segmentfault.com/a/1190000010910308)

