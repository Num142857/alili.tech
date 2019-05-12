---
title: 'vue 将echarts封装为组件一键使用' 
date: 2018-12-29 2:30:10
hidden: true
slug: p9csvq2her
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">说明</h1>
<hr>
<p>做项目的时候为了让数据展示的更加直观，总会用到图表相关的控件，而说到图表控件第一时间当然想到<a href="http://echarts.baidu.com/examples.html" rel="nofollow noreferrer" target="_blank">ECharts</a>这个开源项目，而它不像iview、element-ui这些组件使用起来那么便捷，需要绕一个小弯，为了图方便于是对ECharts进行了一层封装</p>
<h2 id="articleHeader1">控件演示</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011429944?w=1513&amp;h=759" src="https://static.alili.tech/img/remote/1460000011429944?w=1513&amp;h=759" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader2">控件使用</h2>
<hr>
<h4>概要</h4>
<ul>
<li>基于echarts的二次封装</li>
<li>由数据驱动</li>
<li>控件源码见src/components/charts</li>
</ul>
<h4>文档</h4>
<ul><li>props</li></ul>
<table>
<thead><tr>
<th>属性</th>
<th>说明</th>
<th>类型</th>
</tr></thead>
<tbody>
<tr>
<td>_id</td>
<td>图表唯一标识，当id重复将会报错</td>
<td>String</td>
</tr>
<tr>
<td>_titleText</td>
<td>图表标题</td>
<td>String</td>
</tr>
<tr>
<td>_xText</td>
<td>x轴描述</td>
<td>String</td>
</tr>
<tr>
<td>_yText</td>
<td>y轴描述</td>
<td>String</td>
</tr>
<tr>
<td>_chartData</td>
<td>图表数据</td>
<td>Array</td>
</tr>
<tr>
<td>_type</td>
<td>图表类型，提供三种(LineAndBar/LineOrBar/Pie)</td>
<td>String</td>
</tr>
</tbody>
</table>
<ul><li>调用示例</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" <chart
  :_id=&quot;'testCharts'&quot;
  :_titleText=&quot;'访问量统计'&quot;
  :_xText=&quot;'类别'&quot;
  :_yText=&quot;'总访问量'&quot;
  :_chartData=&quot;chartData&quot;
  :_type=&quot;'Pie'&quot;></chart>
 //测试数据样例 [[&quot;类别1&quot;,10],[&quot;类别2&quot;,20]]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code> &lt;chart
  <span class="hljs-symbol">:_id=<span class="hljs-string">"'testCharts'"</span></span>
  <span class="hljs-symbol">:_titleText=<span class="hljs-string">"'访问量统计'"</span></span>
  <span class="hljs-symbol">:_xText=<span class="hljs-string">"'类别'"</span></span>
  <span class="hljs-symbol">:_yText=<span class="hljs-string">"'总访问量'"</span></span>
  <span class="hljs-symbol">:_chartData=<span class="hljs-string">"chartData"</span></span>
  <span class="hljs-symbol">:_type=<span class="hljs-string">"'Pie'"</span>&gt;&lt;/chart&gt;</span>
 /<span class="hljs-regexp">/测试数据样例 [["类别1",10],["类别2",20]]</span></code></pre>
<h2 id="articleHeader3">实现方式</h2>
<hr>
<ul><li>创建一个待渲染的dom</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
    <div :id=&quot;_id&quot; class=&quot;chart&quot;></div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code>&lt;template&gt;
    &lt;<span class="hljs-keyword">div</span> :<span class="hljs-built_in">id</span>=<span class="hljs-string">"_id"</span> <span class="hljs-built_in">class</span>=<span class="hljs-string">"chart"</span>&gt;&lt;/<span class="hljs-keyword">div</span>&gt;
&lt;/template&gt;</code></pre>
<ul><li>绘制函数</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function drawPie(chartData,id,titleText,xText,yText) {
    var chart = echarts.init(document.getElementById(id))
    var xAxisData = chartData.map(function (item) {return item[0]})
    var pieData = []
    chartData.forEach((v,i)=>{
      pieData.push({
        name:v[0],
        value:v[1]
      })
    })
    chart.setOption({
      title : {
        text: titleText,
        subtext: '',
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: &quot;{a} <br/>{b} : {c} ({d}%)&quot;
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: xAxisData
      },
      series : [
        {
          name: xText,
          type: 'pie',
          radius : '55%',
          center: ['50%', '60%'],
          data:pieData,
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    })
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawPie</span><span class="hljs-params">(chartData,id,titleText,xText,yText)</span> {</span>
    var chart = echarts.init(document.getElementById(id))
    var xAxisData = chartData.<span class="hljs-keyword">map</span>(<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(item)</span> {<span class="hljs-title">return</span> <span class="hljs-title">item</span>[0]})</span>
    var pieData = []
    chartData.forEach((v,i)=&gt;{
      pieData.push({
        name:v[<span class="hljs-number">0</span>],
        value:v[<span class="hljs-number">1</span>]
      })
    })
    chart.setOption({
      title : {
        tex<span class="hljs-variable">t:</span> titleText,
        subtex<span class="hljs-variable">t:</span> <span class="hljs-string">''</span>,
        <span class="hljs-keyword">x</span>:<span class="hljs-string">'center'</span>
      },
      tooltip : {
        trigger: <span class="hljs-string">'item'</span>,
        formatter: <span class="hljs-string">"{a} &lt;br/&gt;{b} : {c} ({d}%)"</span>
      },
      legend: {
        orien<span class="hljs-variable">t:</span> <span class="hljs-string">'vertical'</span>,
        lef<span class="hljs-variable">t:</span> <span class="hljs-string">'left'</span>,
        dat<span class="hljs-variable">a:</span> xAxisData
      },
      series : [
        {
          name: xText,
          <span class="hljs-built_in">type</span>: <span class="hljs-string">'pie'</span>,
          radius : <span class="hljs-string">'55%'</span>,
          <span class="hljs-keyword">center</span>: [<span class="hljs-string">'50%'</span>, <span class="hljs-string">'60%'</span>],
          dat<span class="hljs-variable">a:pieData</span>,
          itemStyle: {
            emphasi<span class="hljs-variable">s:</span> {
              shadowBlur: <span class="hljs-number">10</span>,
              shadowOffsetX: <span class="hljs-number">0</span>,
              shadowColor: <span class="hljs-string">'rgba(0, 0, 0, 0.5)'</span>
            }
          }
        }
      ]
    })
  }</code></pre>
<ul><li>挂载结束、数据源改变时重绘</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    watch:{
      _chartData(val){
        switch (this._type){
          case &quot;LineAndBar&quot;:
            drawLineAndBar(val,this._id,this._titleText,this._xText,this._yText);
            break
          case &quot;LineOrBar&quot;:
            drawLineOrBar(val,this._id,this._titleText,this._xText,this._yText);
            break
          case &quot;Pie&quot;:
            drawPie(val,this._id,this._titleText,this._xText,this._yText);
            break
          default:
            drawLineAndBar(val,this._id,this._titleText,this._xText,this._yText);
            break
        }
      }
    },
    mounted() {
      switch (this._type){
        case &quot;LineAndBar&quot;:
          drawLineAndBar(this._chartData,this._id,this._titleText,this._xText,this._yText);
          break
        case &quot;LineOrBar&quot;:
          drawLineOrBar(this._chartData,this._id,this._titleText,this._xText,this._yText);
          break
        case &quot;Pie&quot;:
          drawPie(this._chartData,this._id,this._titleText,this._xText,this._yText);
          break
        default:
          drawLineAndBar(this._chartData,this._id,this._titleText,this._xText,this._yText);
          break
      }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code>    watch:{
      _chartData(<span class="hljs-keyword">val</span>){
        switch (<span class="hljs-keyword">this</span>._type){
          case <span class="hljs-string">"LineAndBar"</span>:
            drawLineAndBar(<span class="hljs-keyword">val</span>,<span class="hljs-keyword">this</span>._id,<span class="hljs-keyword">this</span>._titleText,<span class="hljs-keyword">this</span>._xText,<span class="hljs-keyword">this</span>._yText);
            <span class="hljs-keyword">break</span>
          case <span class="hljs-string">"LineOrBar"</span>:
            drawLineOrBar(<span class="hljs-keyword">val</span>,<span class="hljs-keyword">this</span>._id,<span class="hljs-keyword">this</span>._titleText,<span class="hljs-keyword">this</span>._xText,<span class="hljs-keyword">this</span>._yText);
            <span class="hljs-keyword">break</span>
          case <span class="hljs-string">"Pie"</span>:
            drawPie(<span class="hljs-keyword">val</span>,<span class="hljs-keyword">this</span>._id,<span class="hljs-keyword">this</span>._titleText,<span class="hljs-keyword">this</span>._xText,<span class="hljs-keyword">this</span>._yText);
            <span class="hljs-keyword">break</span>
          <span class="hljs-keyword">default</span>:
            drawLineAndBar(<span class="hljs-keyword">val</span>,<span class="hljs-keyword">this</span>._id,<span class="hljs-keyword">this</span>._titleText,<span class="hljs-keyword">this</span>._xText,<span class="hljs-keyword">this</span>._yText);
            <span class="hljs-keyword">break</span>
        }
      }
    },
    mounted() {
      switch (<span class="hljs-keyword">this</span>._type){
        case <span class="hljs-string">"LineAndBar"</span>:
          drawLineAndBar(<span class="hljs-keyword">this</span>._chartData,<span class="hljs-keyword">this</span>._id,<span class="hljs-keyword">this</span>._titleText,<span class="hljs-keyword">this</span>._xText,<span class="hljs-keyword">this</span>._yText);
          <span class="hljs-keyword">break</span>
        case <span class="hljs-string">"LineOrBar"</span>:
          drawLineOrBar(<span class="hljs-keyword">this</span>._chartData,<span class="hljs-keyword">this</span>._id,<span class="hljs-keyword">this</span>._titleText,<span class="hljs-keyword">this</span>._xText,<span class="hljs-keyword">this</span>._yText);
          <span class="hljs-keyword">break</span>
        case <span class="hljs-string">"Pie"</span>:
          drawPie(<span class="hljs-keyword">this</span>._chartData,<span class="hljs-keyword">this</span>._id,<span class="hljs-keyword">this</span>._titleText,<span class="hljs-keyword">this</span>._xText,<span class="hljs-keyword">this</span>._yText);
          <span class="hljs-keyword">break</span>
        <span class="hljs-keyword">default</span>:
          drawLineAndBar(<span class="hljs-keyword">this</span>._chartData,<span class="hljs-keyword">this</span>._id,<span class="hljs-keyword">this</span>._titleText,<span class="hljs-keyword">this</span>._xText,<span class="hljs-keyword">this</span>._yText);
          <span class="hljs-keyword">break</span>
      }
    }</code></pre>
<p>如果觉得有用，欢迎star <a href="https://github.com/calebman/vue-DBM" rel="nofollow noreferrer" target="_blank">calebman/vue-DBM</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue 将echarts封装为组件一键使用

## 原文链接
[https://segmentfault.com/a/1190000011429939](https://segmentfault.com/a/1190000011429939)

