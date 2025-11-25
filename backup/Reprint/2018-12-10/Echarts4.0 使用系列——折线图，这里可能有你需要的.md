---
title: 'Echarts4.0 使用系列——折线图，这里可能有你需要的' 
date: 2018-12-10 2:30:07
hidden: true
slug: nom9y2lx949
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>前言：</strong>项目中经常会使用到Echarts,有的需求差不多复用性高，由于之前没有好好总结，时间一长就容易忘，所以这里总结一下Echarts折线图使用，下面会列举官网一些Api。</p>
<h1 id="articleHeader0">一、效果图</h1>
<p><span class="img-wrap"><img data-src="/img/bV57pp?w=1030&amp;h=293" src="https://static.alili.tech/img/bV57pp?w=1030&amp;h=293" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader1">二、配置基础折线图</h1>
<p>第一步：先初始化</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let myChart = echarts.init(document.getElementById(&quot;echarts-line&quot;));
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">let myChart</span> = echarts.init(document.getElementById(<span class="hljs-string">"echarts-line"</span>));
</code></pre>
<p>第二部：定义配置项</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="option = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['01.23', '01.24', '01.25', '01.26', '01.27', '01.28', '01.29']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [15, 14, 10, 11, 14.58, 10, 11.5],
        type: 'line',
        areaStyle: {}
    }]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>option = {
    xAxis: {
        <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-symbol">'categor</span>y',
        boundaryGap: <span class="hljs-literal">false</span>,
        data: [<span class="hljs-symbol">'01</span><span class="hljs-number">.23</span>', <span class="hljs-symbol">'01</span><span class="hljs-number">.24</span>', <span class="hljs-symbol">'01</span><span class="hljs-number">.25</span>', <span class="hljs-symbol">'01</span><span class="hljs-number">.26</span>', <span class="hljs-symbol">'01</span><span class="hljs-number">.27</span>', <span class="hljs-symbol">'01</span><span class="hljs-number">.28</span>', <span class="hljs-symbol">'01</span><span class="hljs-number">.29</span>']
    },
    yAxis: {
        <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-symbol">'valu</span>e'
    },
    series: [{
        data: [<span class="hljs-number">15</span>, <span class="hljs-number">14</span>, <span class="hljs-number">10</span>, <span class="hljs-number">11</span>, <span class="hljs-number">14.58</span>, <span class="hljs-number">10</span>, <span class="hljs-number">11.5</span>],
        <span class="hljs-class"><span class="hljs-keyword">type</span></span>: <span class="hljs-symbol">'lin</span>e',
        areaStyle: {}
    }]
};</code></pre>
<p>最后：渲染</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="myChart.setOption(option);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code style="word-break: break-word; white-space: initial;">myChart.setOption(option)<span class="hljs-comment">;</span></code></pre>
<h1 id="articleHeader2">三、一步一步修改Option</h1>
<h2 id="articleHeader3"><a href="http://echarts.baidu.com/option.html#xAxis" rel="nofollow noreferrer" target="_blank">xAxis：X轴</a></h2>
<p><strong><em>type：x轴坐标轴类型</em></strong></p>
<ul>
<li>'value' 数值轴，适用于连续数据。</li>
<li>'category' 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。</li>
<li>'time' 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。</li>
<li>'log' 对数轴。适用于对数数据。</li>
</ul>
<p><strong>常用的类型为'category'，需要定义对呀的类目数据，这个例子中的类目数据为日期组成的数据。</strong></p>
<hr>
<p><strong><em>boundaryGap：坐标轴两边留白</em></strong></p>
<ul>
<li>可配置true或false或者为一个数组，默认为true</li>
<li>非类目轴，包括时间，数值，对数轴，boundaryGap是一个两个值的数组，分别表示数据最小值和最大值的延伸范围，可以直接设置数值或者相对的百分比。</li>
</ul>
<p><strong>在该例子中：坐标轴两边留白10%</strong></p>
<hr>
<p><strong><em><a href="http://echarts.baidu.com/option.html#xAxis.axisLine" rel="nofollow noreferrer" target="_blank">axisLine：坐标轴轴线相关设置</a></em></strong></p>
<ul>
<li>show：是否显示，坐标轴线包括x轴那根黑色（#333）的线和刻度名称</li>
<li>lineStyle：设置轴线样式，包括轴线颜色、宽度、透明度、线的类型、阴影等</li>
<li>更多...：更多可参看官网api，可以设置箭头方向、大小、刻度线是否在坐标0刻度上</li>
</ul>
<p><strong>在该例子中：通过设置轴线的透明度实现视觉上颜色为浅灰色</strong></p>
<hr>
<p><strong><em><a href="http://echarts.baidu.com/option.html#xAxis.axisTick" rel="nofollow noreferrer" target="_blank">axisTick：坐标轴刻度相关设置</a></em></strong></p>
<ul>
<li>show：是否显示</li>
<li>interval：显示间隔，默认为'auto'</li>
<li>inside：刻度是否朝外，默认false</li>
<li>length：刻度的长度，数值</li>
<li>lineStyle：设置刻度线样式，包括轴线颜色、宽度、透明度、线的类型、阴影等</li>
</ul>
<p><strong>在该例子中：设置刻度线为不显示</strong></p>
<hr>
<p><strong><em><a href="http://echarts.baidu.com/option.html#xAxis.splitLine" rel="nofollow noreferrer" target="_blank">splitLine：坐标轴在 grid 区域中的分隔线（在网格中竖立的线）</a></em></strong></p>
<ul>
<li>show：是否显示</li>
<li>interval：显示间隔，默认为'auto'</li>
<li>lineStyle：设置网格线样式，包括轴线颜色、宽度、透明度、线的类型、阴影等</li>
</ul>
<hr>
<p><strong>X轴的代码</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="xAxis: {
    type: 'category',
    data: ['01.23', '01.24', '01.25', '01.26', '01.27', '01.28', '01.29'],
    boundaryGap: ['10%', '10%',],//坐标轴两边留白
    axisLine: {//坐标轴
        lineStyle:{
            opacity: 0.01,//设置透明度就可以控制显示不显示
        },
    },
    splitLine: {//网格线
        show: false,//网格线
        lineStyle:{
            color: '#eeeeee',
        },
    },
    axisTick: {//刻度线
        show: false,//去掉刻度线
    },
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">xAxis</span>: {
    <span class="hljs-attribute">type</span>: <span class="hljs-string">'category'</span>,
    <span class="hljs-attribute">data</span>: [<span class="hljs-string">'01.23'</span>, <span class="hljs-string">'01.24'</span>, <span class="hljs-string">'01.25'</span>, <span class="hljs-string">'01.26'</span>, <span class="hljs-string">'01.27'</span>, <span class="hljs-string">'01.28'</span>, <span class="hljs-string">'01.29'</span>],
    <span class="hljs-attribute">boundaryGap</span>: [<span class="hljs-string">'10%'</span>, <span class="hljs-string">'10%'</span>,],<span class="hljs-comment">//坐标轴两边留白</span>
    <span class="hljs-attribute">axisLine</span>: {<span class="hljs-comment">//坐标轴</span>
        <span class="hljs-attribute">lineStyle</span>:{
            <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0.01</span>,<span class="hljs-comment">//设置透明度就可以控制显示不显示</span>
        },
    },
    <span class="hljs-attribute">splitLine</span>: {<span class="hljs-comment">//网格线</span>
        <span class="hljs-attribute">show</span>: false,<span class="hljs-comment">//网格线</span>
        <span class="hljs-attribute">lineStyle</span>:{
            <span class="hljs-attribute">color</span>: <span class="hljs-string">'#eeeeee'</span>,
        },
    },
    <span class="hljs-attribute">axisTick</span>: {<span class="hljs-comment">//刻度线</span>
        <span class="hljs-attribute">show</span>: false,<span class="hljs-comment">//去掉刻度线</span>
    },
},</code></pre>
<h2 id="articleHeader4"><a href="http://echarts.baidu.com/option.html#yAxis" rel="nofollow noreferrer" target="_blank">yAxis：Y轴</a></h2>
<p><strong><em>X轴与Y轴的文档大致是一样的，所以就列举例子中的设置</em></strong></p>
<ul>
<li>Y轴的刻度线我设置透明度为0,</li>
<li>设置了坐标轴名称</li>
<li>设置了网格线颜色</li>
</ul>
<hr>
<p><strong>Y轴的代码</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="yAxis: {
    min:0,//最小刻度
    max:25,//最大刻度
    type: 'value',
    name:'℃         ',//是基于Y轴线对齐，用空格站位让坐标轴名称与刻度名称对齐
    nameTextStyle: {
        color:'#444e65',
        align:'left',//文字水平对齐方式
        verticalAlign:'middle',//文字垂直对齐方式
    },
    axisTick: {//刻度线
        show: false,//去掉刻度线
    },
    axisLine: {//坐标轴线
        lineStyle:{
            opacity: 0,//透明度为0 
        },
    },
    splitLine: {//网格线
        // show: false,//网格线
        lineStyle:{
            color: '#eeeeee',
        },
    },
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">yAxis</span>: {
    <span class="hljs-attribute">min</span>:<span class="hljs-number">0</span>,<span class="hljs-comment">//最小刻度</span>
    <span class="hljs-attribute">max</span>:<span class="hljs-number">25</span>,<span class="hljs-comment">//最大刻度</span>
    <span class="hljs-attribute">type</span>: <span class="hljs-string">'value'</span>,
    <span class="hljs-attribute">name</span>:<span class="hljs-string">'℃         '</span>,<span class="hljs-comment">//是基于Y轴线对齐，用空格站位让坐标轴名称与刻度名称对齐</span>
    <span class="hljs-attribute">nameTextStyle</span>: {
        <span class="hljs-attribute">color</span>:<span class="hljs-string">'#444e65'</span>,
        <span class="hljs-attribute">align</span>:<span class="hljs-string">'left'</span>,<span class="hljs-comment">//文字水平对齐方式</span>
        <span class="hljs-attribute">verticalAlign</span>:<span class="hljs-string">'middle'</span>,<span class="hljs-comment">//文字垂直对齐方式</span>
    },
    <span class="hljs-attribute">axisTick</span>: {<span class="hljs-comment">//刻度线</span>
        <span class="hljs-attribute">show</span>: false,<span class="hljs-comment">//去掉刻度线</span>
    },
    <span class="hljs-attribute">axisLine</span>: {<span class="hljs-comment">//坐标轴线</span>
        <span class="hljs-attribute">lineStyle</span>:{
            <span class="hljs-attribute">opacity</span>: <span class="hljs-number">0</span>,<span class="hljs-comment">//透明度为0 </span>
        },
    },
    <span class="hljs-attribute">splitLine</span>: {<span class="hljs-comment">//网格线</span>
        <span class="hljs-comment">// show: false,//网格线</span>
        <span class="hljs-attribute">lineStyle</span>:{
            <span class="hljs-attribute">color</span>: <span class="hljs-string">'#eeeeee'</span>,
        },
    },
},</code></pre>
<h2 id="articleHeader5"><a href="http://echarts.baidu.com/option.html#series-line" rel="nofollow noreferrer" target="_blank">series：系列列表</a></h2>
<p><strong><em><a href="http://echarts.baidu.com/option.html#series-line.label" rel="nofollow noreferrer" target="_blank">label：图形上的文本标签，可用于说明图形的一些数据信息</a></em></strong></p>
<ul>
<li>show：是否显示</li>
<li>position：标签的位置。默认为top，可选值有14种</li>
<li>rich：在 rich 里面，可以自定义富文本样式。</li>
<li>更多...：更多可参看官网api，例如颜色、字体、背景等相关设置</li>
</ul>
<hr>
<p><strong><em><a href="http://echarts.baidu.com/option.html#series-line.itemStyle" rel="nofollow noreferrer" target="_blank">itemStyle：折线拐点标志的样式</a></em></strong></p>
<ul>
<li>color：颜色值</li>
<li>描边设置：borderColor（颜色）、borderWidth（宽度）、borderType（类型）</li>
<li>更多...：更多可参看官网api，例如阴影、透明度</li>
</ul>
<hr>
<p><strong><em><a href="http://echarts.baidu.com/option.html#series-line.areaStyle" rel="nofollow noreferrer" target="_blank">areaStyle：区域填充样式</a></em></strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="- color：颜色值
- 描边设置：borderColor（颜色）、borderWidth（宽度）、borderType（类型）
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>-<span class="ruby"> color：颜色值
</span>-<span class="ruby"> 描边设置：borderColor（颜色）、borderWidth（宽度）、borderType（类型）
</span></code></pre>
<p><strong>在该例子中：设置区域填充样式为线性渐变</strong></p>
<hr>
<p><strong>数据画折线</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="series: [{
    data: [15, 14, 10, 11, 14.58, 10, 11.5,],//数据
    type: 'line',//图表类型，折线图还是柱状图还是饼图
    label: {//图形上的文本标签
        normal:{
            formatter: '{@data}℃',
            show: true,//显示数据
            color: '#00af58',
            position: 'top',
            fontSize:'14',
        },
    },
    itemStyle: {//折线拐点标志的样式。
        normal: {
            color: '#00af58',
        },
    },
    areaStyle: {//区域填充样式
        normal:{
            color: {
                type:'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                    {
                        offset: 0,
                        color: 'rgba(0, 175, 88, 0.4)',
                    },
                    {
                        offset: 1,
                        color: 'rgba(0, 175, 88, 0.01)',
                    },
                ],
                globaCoord: false,
            },
        },
    },
},]," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-attribute">series</span>: [{
    <span class="hljs-attribute">data</span>: [<span class="hljs-number">15</span>, <span class="hljs-number">14</span>, <span class="hljs-number">10</span>, <span class="hljs-number">11</span>, <span class="hljs-number">14.58</span>, <span class="hljs-number">10</span>, <span class="hljs-number">11.5</span>,],<span class="hljs-comment">//数据</span>
    <span class="hljs-attribute">type</span>: <span class="hljs-string">'line'</span>,<span class="hljs-comment">//图表类型，折线图还是柱状图还是饼图</span>
    <span class="hljs-attribute">label</span>: {<span class="hljs-comment">//图形上的文本标签</span>
        <span class="hljs-attribute">normal</span>:{
            <span class="hljs-attribute">formatter</span>: <span class="hljs-string">'{@data}℃'</span>,
            <span class="hljs-attribute">show</span>: true,<span class="hljs-comment">//显示数据</span>
            <span class="hljs-attribute">color</span>: <span class="hljs-string">'#00af58'</span>,
            <span class="hljs-attribute">position</span>: <span class="hljs-string">'top'</span>,
            <span class="hljs-attribute">fontSize</span>:<span class="hljs-string">'14'</span>,
        },
    },
    <span class="hljs-attribute">itemStyle</span>: {<span class="hljs-comment">//折线拐点标志的样式。</span>
        <span class="hljs-attribute">normal</span>: {
            <span class="hljs-attribute">color</span>: <span class="hljs-string">'#00af58'</span>,
        },
    },
    <span class="hljs-attribute">areaStyle</span>: {<span class="hljs-comment">//区域填充样式</span>
        <span class="hljs-attribute">normal</span>:{
            <span class="hljs-attribute">color</span>: {
                <span class="hljs-attribute">type</span>:<span class="hljs-string">'linear'</span>,
                <span class="hljs-attribute">x</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attribute">y</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attribute">x2</span>: <span class="hljs-number">0</span>,
                <span class="hljs-attribute">y2</span>: <span class="hljs-number">1</span>,
                <span class="hljs-attribute">colorStops</span>: [
                    {
                        <span class="hljs-attribute">offset</span>: <span class="hljs-number">0</span>,
                        <span class="hljs-attribute">color</span>: <span class="hljs-string">'rgba(0, 175, 88, 0.4)'</span>,
                    },
                    {
                        <span class="hljs-attribute">offset</span>: <span class="hljs-number">1</span>,
                        <span class="hljs-attribute">color</span>: <span class="hljs-string">'rgba(0, 175, 88, 0.01)'</span>,
                    },
                ],
                <span class="hljs-attribute">globaCoord</span>: false,
            },
        },
    },
},],</code></pre>
<h1 id="articleHeader6">四、其他</h1>
<h2 id="articleHeader7">echarts颜色设置</h2>
<p><strong>Echarts颜色可以使用 RGB 表示，比如 'rgb(128, 128, 128)'，如果想要加上 alpha 通道表示不透明度，可以使用 RGBA，比如 'rgba(128, 128, 128, 0.5)'，也可以使用十六进制格式，比如 '#ccc'。除了纯色之外颜色也支持渐变色和纹理填充</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置
color: {
    type: 'linear',
    x: 0,
    y: 0,
    x2: 0,
    y2: 1,
    colorStops: [{
        offset: 0, color: 'red' // 0% 处的颜色
    }, {
        offset: 1, color: 'blue' // 100% 处的颜色
    }],
    globalCoord: false // 缺省为 false
}
// 径向渐变，前三个参数分别是圆心 x, y 和半径，取值同线性渐变
color: {
    type: 'radial',
    x: 0.5,
    y: 0.5,
    r: 0.5,
    colorStops: [{
        offset: 0, color: 'red' // 0% 处的颜色
    }, {
        offset: 1, color: 'blue' // 100% 处的颜色
    }],
    globalCoord: false // 缺省为 false
}
// 纹理填充
color: {
    image: imageDom, // 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串
    repeat: 'repeat' // 是否平铺, 可以是 'repeat-x', 'repeat-y', 'no-repeat'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// 线性渐变，前四个参数分别是 x0, y0, x2, y2, 范围从 0 - 1，相当于在图形包围盒中的百分比，如果 globalCoord 为 `true`，则该四个值是绝对的像素位置</span>
<span class="hljs-attribute">color</span>: {
    <span class="hljs-attribute">type</span>: <span class="hljs-string">'linear'</span>,
    <span class="hljs-attribute">x</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attribute">y</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attribute">x2</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attribute">y2</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attribute">colorStops</span>: [{
        <span class="hljs-attribute">offset</span>: <span class="hljs-number">0</span>, <span class="hljs-attribute">color</span>: <span class="hljs-string">'red'</span> <span class="hljs-comment">// 0% 处的颜色</span>
    }, {
        <span class="hljs-attribute">offset</span>: <span class="hljs-number">1</span>, <span class="hljs-attribute">color</span>: <span class="hljs-string">'blue'</span> <span class="hljs-comment">// 100% 处的颜色</span>
    }],
    <span class="hljs-attribute">globalCoord</span>: false <span class="hljs-comment">// 缺省为 false</span>
}
<span class="hljs-comment">// 径向渐变，前三个参数分别是圆心 x, y 和半径，取值同线性渐变</span>
<span class="hljs-attribute">color</span>: {
    <span class="hljs-attribute">type</span>: <span class="hljs-string">'radial'</span>,
    <span class="hljs-attribute">x</span>: <span class="hljs-number">0.5</span>,
    <span class="hljs-attribute">y</span>: <span class="hljs-number">0.5</span>,
    <span class="hljs-attribute">r</span>: <span class="hljs-number">0.5</span>,
    <span class="hljs-attribute">colorStops</span>: [{
        <span class="hljs-attribute">offset</span>: <span class="hljs-number">0</span>, <span class="hljs-attribute">color</span>: <span class="hljs-string">'red'</span> <span class="hljs-comment">// 0% 处的颜色</span>
    }, {
        <span class="hljs-attribute">offset</span>: <span class="hljs-number">1</span>, <span class="hljs-attribute">color</span>: <span class="hljs-string">'blue'</span> <span class="hljs-comment">// 100% 处的颜色</span>
    }],
    <span class="hljs-attribute">globalCoord</span>: false <span class="hljs-comment">// 缺省为 false</span>
}
<span class="hljs-comment">// 纹理填充</span>
<span class="hljs-attribute">color</span>: {
    <span class="hljs-attribute">image</span>: imageDom, <span class="hljs-comment">// 支持为 HTMLImageElement, HTMLCanvasElement，不支持路径字符串</span>
    <span class="hljs-attribute">repeat</span>: <span class="hljs-string">'repeat'</span> <span class="hljs-comment">// 是否平铺, 可以是 'repeat-x', 'repeat-y', 'no-repeat'</span>
}</code></pre>
<h2 id="articleHeader8">代码</h2>
<p><strong><a href="https://github.com/myNameTao/echartsSummary" rel="nofollow noreferrer" target="_blank">GitHub:</a><a href="https://github.com/myNameTao/echartsSummary" rel="nofollow noreferrer" target="_blank">https://github.com/myNameTao/...</a></strong></p>
<h2 id="articleHeader9">总结</h2>
<p><strong>因为不熟悉Echarts还是需要花时间慢慢看文档，所以整理这个例子是便于遇到类似的需求就可以拿过直接用。在使用Echarts之前觉得这个插件Api内容很多，但是去看了一遍折线图的Api后发现有很多都是类似的，例如X轴与Y轴的设置。</strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Echarts4.0 使用系列——折线图，这里可能有你需要的

## 原文链接
[https://segmentfault.com/a/1190000013812453](https://segmentfault.com/a/1190000013812453)

