---
title: 'antv g2的理解总结' 
date: 2018-12-12 2:30:10
hidden: true
slug: 8z0nruq1aml
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">G2</h1>
<p>G2本身是一门图形语法，G2和传统的图表系统（HighCharts，ACharts等）不同，G2是一个基于统计分析的语义化数据可视化系统。它真正做到了让数据驱动图形，让你在使用它时候不用关心绘图细节，只需要知道你想通过它怎么展示你关心的数据。echarts更多的是配置options来显示图片，出发点不同。（g2也同样支持配置项声明）</p>
<h2 id="articleHeader1">G2构成</h2>
<p>一个可视化框架需要四部分：</p>
<ul>
<li>数据处理模块，对数据进行加工的模块，包括一些数据处理方法。例如：合并、分组、排序、过滤、计算统计信息等</li>
<li>图形映射模块，将数据映射到图形视觉通道的过程。例如：将数据映射成颜色、位置、大小等</li>
<li>图形展示模块，决定使用何种图形来展示数据，点、线、面等图形标记</li>
<li>辅助信息模块，用于说明视觉通道跟数据的映射关系，例如：坐标轴、图例、辅助文本等</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bV4qNm?w=709&amp;h=549" src="https://static.alili.tech/img/bV4qNm?w=709&amp;h=549" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<ol>
<li>在数据处理模块上，dataSet主要通过state状态管理多个dataview视图，实现多图联动，或者关联视图。dataView则是对应的是每一个数据源，通过connector来接入不同类型的数据，通过tranform进行数据的转换或者过滤。最后输出我们理想的数据，dataSet是与g2分离的，需要用到的时候可以加载</li>
<li>在图形映射模块上，度量 Scale，是数据空间到图形空间的转换桥梁，负责原始数据到 [0, 1] 区间数值的相互转换工作，从原始数据到 [0, 1] 区间的转换我们称之为归一化操作。我们可以通过chart.source或者chart.scale('field', defs)来实现列定义，我们可以在这对数据进行起别名，更换显示类型（time，cat类型等）</li>
<li>辅助信息，就是标记数据，方便理解数据</li>
<li>图形展示 chart图表是一个大画布，可以有多个view视图，geom则是数据映射的图形标识，就是指的点，线，面，通过对其操作，从而展示图形，</li>
</ol>
<p>这是大体步骤： <br><span class="img-wrap"><img data-src="/img/bV4qWz?w=820&amp;h=560" src="https://static.alili.tech/img/bV4qWz?w=820&amp;h=560" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//代码实现
const data = [
        { genre: 'Sports', sold: 275 },
        { genre: 'Strategy', sold: 115 },
        { genre: 'Action', sold: 120 },
        { genre: 'Shooter', sold: 350 },
        { genre: 'Other', sold: 150 }
  ]; 
  // G2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。
  // Step 1: 创建 Chart 对象
  const chart = new G2.Chart({
    container: 'c1', // 指定图表容器 ID
    width : 600, // 指定图表宽度
    height : 300 // 指定图表高度
  });
  // Step 2: 载入数据源
  chart.source(data);
  // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
  chart.interval().position('genre*sold').color('genre')
  // Step 4: 渲染图表" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">//代码实现</span>
const data = [
        { <span class="hljs-string">genre:</span> <span class="hljs-string">'Sports'</span>, <span class="hljs-string">sold:</span> <span class="hljs-number">275</span> },
        { <span class="hljs-string">genre:</span> <span class="hljs-string">'Strategy'</span>, <span class="hljs-string">sold:</span> <span class="hljs-number">115</span> },
        { <span class="hljs-string">genre:</span> <span class="hljs-string">'Action'</span>, <span class="hljs-string">sold:</span> <span class="hljs-number">120</span> },
        { <span class="hljs-string">genre:</span> <span class="hljs-string">'Shooter'</span>, <span class="hljs-string">sold:</span> <span class="hljs-number">350</span> },
        { <span class="hljs-string">genre:</span> <span class="hljs-string">'Other'</span>, <span class="hljs-string">sold:</span> <span class="hljs-number">150</span> }
  ]; 
  <span class="hljs-comment">// G2 对数据源格式的要求，仅仅是 JSON 数组，数组的每个元素是一个标准 JSON 对象。</span>
  <span class="hljs-comment">// Step 1: 创建 Chart 对象</span>
  const chart = <span class="hljs-keyword">new</span> G2.Chart({
<span class="hljs-symbol">    container:</span> <span class="hljs-string">'c1'</span>, <span class="hljs-comment">// 指定图表容器 ID</span>
    <span class="hljs-string">width :</span> <span class="hljs-number">600</span>, <span class="hljs-comment">// 指定图表宽度</span>
    <span class="hljs-string">height :</span> <span class="hljs-number">300</span> <span class="hljs-comment">// 指定图表高度</span>
  });
  <span class="hljs-comment">// Step 2: 载入数据源</span>
  chart.source(data);
  <span class="hljs-comment">// Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴</span>
  chart.interval().position(<span class="hljs-string">'genre*sold'</span>).color(<span class="hljs-string">'genre'</span>)
  <span class="hljs-comment">// Step 4: 渲染图表</span></code></pre>
<h2 id="articleHeader2">dataSet</h2>
<p>负责数据处理，使得数据驱动视图, 可以包含多个dataView，每个view对应一套数据</p>
<p><span class="img-wrap"><img data-src="/img/bV4q1M?w=774&amp;h=324" src="https://static.alili.tech/img/bV4q1M?w=774&amp;h=324" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>通过connector接入数据（把各种数据类型转成一定的形式），再通过transform进行过滤聚合等操作</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 以下是通过state过滤数据
// step1 创建 dataset 指定状态量
const ds = new DataSet({
  state: {
    year: '2010'
  }
});
// step2 创建 DataView
const dv = ds.createView().source(data);
dv.transform({
  type: 'filter',
  callback(row) {
    return row.year === ds.state.year;
  }
});
// step3 引用 DataView
chart.source(dv);
// step4 更新状态量
ds.setState('year', '2012');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pf"><code>// 以下是通过<span class="hljs-keyword">state</span>过滤数据
// step1 创建 dataset 指定状态量
const ds = new DataSet({
  <span class="hljs-keyword">state</span>: {
    year: '<span class="hljs-number">2010</span>'
  }
});
// step2 创建 DataView
const dv = ds.createView().source(data);
dv.transform({
  type: 'filter',
  callback(row) {
    return row.year === ds.<span class="hljs-keyword">state</span>.year;
  }
});
// step3 引用 DataView
chart.source(dv);
// step4 更新状态量
ds.<span class="hljs-built_in">set</span>State('year', '<span class="hljs-number">2012</span>');</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// transform例子
const data = [
  { country: &quot;USA&quot;, gold: 10, silver: 20 },
  { country: &quot;Canada&quot;, gold: 7, silver: 26 }
];
const dv = ds.createView()
  .source(data)
  .transform({
    type: 'fold',
    fields: [ 'gold', 'silver' ], // 展开字段集
    key: 'key',                   // key字段
    value: 'value',               // value字段
    retains: [ 'country' ]        // 保留字段集，默认为除 fields 以外的所有字段
  });
/*
 dv.rows 变为
[
  { key: gold, value: 10, country: &quot;USA&quot; },
  { key: silver, value: 20, country: &quot;USA&quot; },
  { key: gold, value: 7, country: &quot;Canada&quot; },
  { key: silver, value: 26, country: &quot;Canada&quot; }
]
 */" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code><span class="hljs-comment">// transform例子</span>
const data = [
  { country: <span class="hljs-string">"USA"</span>, gold: <span class="hljs-number">10</span>, silver: <span class="hljs-number">20</span> },
  { country: <span class="hljs-string">"Canada"</span>, gold: <span class="hljs-number">7</span>, silver: <span class="hljs-number">26</span> }
];
const dv = ds.createView()
  .source(data)
  .transform({
    <span class="hljs-built_in">type</span>: 'fold',
    fields: [ 'gold', 'silver' ], <span class="hljs-comment">// 展开字段集</span>
    <span class="hljs-built_in">key</span>: '<span class="hljs-built_in">key</span>',                   <span class="hljs-comment">// key字段</span>
    <span class="hljs-built_in">value</span>: '<span class="hljs-built_in">value</span>',               <span class="hljs-comment">// value字段</span>
    retains: [ 'country' ]        <span class="hljs-comment">// 保留字段集，默认为除 fields 以外的所有字段</span>
  });
/*
 dv.rows 变为
[
  { <span class="hljs-built_in">key</span>: gold, <span class="hljs-built_in">value</span>: <span class="hljs-number">10</span>, country: <span class="hljs-string">"USA"</span> },
  { <span class="hljs-built_in">key</span>: silver, <span class="hljs-built_in">value</span>: <span class="hljs-number">20</span>, country: <span class="hljs-string">"USA"</span> },
  { <span class="hljs-built_in">key</span>: gold, <span class="hljs-built_in">value</span>: <span class="hljs-number">7</span>, country: <span class="hljs-string">"Canada"</span> },
  { <span class="hljs-built_in">key</span>: silver, <span class="hljs-built_in">value</span>: <span class="hljs-number">26</span>, country: <span class="hljs-string">"Canada"</span> }
]
 */</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// connector例子
const testCSV = `Expt,Run,Speed
 1,1,850
 1,2,740
 1,3,900
 1,4,1070`;

const dv = new DataSet.View().source(testCSV, {
  type: 'csv'
});

console.log(dv.rows);
/*
 * dv.rows:
 * [
 *   {Expt: &quot; 1&quot;, Run: &quot;1&quot;, Speed: &quot;850&quot;}
 *   {Expt: &quot; 1&quot;, Run: &quot;2&quot;, Speed: &quot;740&quot;}
 *   {Expt: &quot; 1&quot;, Run: &quot;3&quot;, Speed: &quot;900&quot;}
 *   {Expt: &quot; 1&quot;, Run: &quot;4&quot;, Speed: &quot;1070&quot;}
 * ]
 */" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>// connector例子
const testCSV = `Expt,<span class="hljs-keyword">Run</span><span class="bash">,Speed
</span> <span class="hljs-number">1</span>,<span class="hljs-number">1</span>,<span class="hljs-number">850</span>
 <span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">740</span>
 <span class="hljs-number">1</span>,<span class="hljs-number">3</span>,<span class="hljs-number">900</span>
 <span class="hljs-number">1</span>,<span class="hljs-number">4</span>,<span class="hljs-number">1070</span>`;

const dv = new DataSet.View().source(testCSV, {
  type: <span class="hljs-string">'csv'</span>
});

console.log(dv.rows);
/*
 * dv.rows:
 * [
 *   {Expt: <span class="hljs-string">" 1"</span>, <span class="hljs-keyword">Run</span><span class="bash">: <span class="hljs-string">"1"</span>, Speed: <span class="hljs-string">"850"</span>}
</span> *   {Expt: <span class="hljs-string">" 1"</span>, <span class="hljs-keyword">Run</span><span class="bash">: <span class="hljs-string">"2"</span>, Speed: <span class="hljs-string">"740"</span>}
</span> *   {Expt: <span class="hljs-string">" 1"</span>, <span class="hljs-keyword">Run</span><span class="bash">: <span class="hljs-string">"3"</span>, Speed: <span class="hljs-string">"900"</span>}
</span> *   {Expt: <span class="hljs-string">" 1"</span>, <span class="hljs-keyword">Run</span><span class="bash">: <span class="hljs-string">"4"</span>, Speed: <span class="hljs-string">"1070"</span>}
</span> * ]
 */</code></pre>
<h2 id="articleHeader3">度量scale</h2>
<p>就是从数据到图形的转化，使得数据在展示的时候可以自定义<br>所谓的列定义，即是对度量 scale 的操作</p>
<blockquote>列定义上的操作可以理解为直接修改数据源中的数据属性，因此它会影响坐标轴、tooltip 提示信息、图例、辅助元素 guide 以及几何标记的标签文本 label 的数据内容显示。</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//以下是关于数据映射scale的demo
const data = [
  { month: 0, value: 1 },
  { month: 1, value: 2 },
  { month: 2, value: 3 }
];
chart.scale('month', {
  type: 'cat', // 声明 type 字段为分类类型
  values: [ '一月', '二月', '三月' ], // 重新显示的值
  alias: '月份' // 设置属性的别名
});
// 这时候映射的month就变成了 月份：一月
// 这时坐标轴，tooltip等关于month的数据显示都改变了" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">//以下是关于数据映射scale的demo</span>
const data = [
  { <span class="hljs-string">month:</span> <span class="hljs-number">0</span>, <span class="hljs-string">value:</span> <span class="hljs-number">1</span> },
  { <span class="hljs-string">month:</span> <span class="hljs-number">1</span>, <span class="hljs-string">value:</span> <span class="hljs-number">2</span> },
  { <span class="hljs-string">month:</span> <span class="hljs-number">2</span>, <span class="hljs-string">value:</span> <span class="hljs-number">3</span> }
];
chart.scale(<span class="hljs-string">'month'</span>, {
<span class="hljs-symbol">  type:</span> <span class="hljs-string">'cat'</span>, <span class="hljs-comment">// 声明 type 字段为分类类型</span>
<span class="hljs-symbol">  values:</span> [ <span class="hljs-string">'一月'</span>, <span class="hljs-string">'二月'</span>, <span class="hljs-string">'三月'</span> ], <span class="hljs-comment">// 重新显示的值</span>
<span class="hljs-symbol">  alias:</span> <span class="hljs-string">'月份'</span> <span class="hljs-comment">// 设置属性的别名</span>
});
<span class="hljs-comment">// 这时候映射的month就变成了 月份：一月</span>
<span class="hljs-comment">// 这时坐标轴，tooltip等关于month的数据显示都改变了</span></code></pre>
<h2 id="articleHeader4">view</h2>
<blockquote>视图，由 Chart 生成和管理，拥有自己独立的数据源、坐标系和图层，用于异构数据的可视化以及图表组合，一个 Chart 由一个或者多个视图 View 组成。</blockquote>
<p>因此 view 上的 api 同 chart 基本相同。<br>view绘制的图形是在chart上的，Tooltip（提示信息）和 Legend（图例）仅在 Chart 上支持，所以view共用一套tooltip和legentd, 可以进行图形的叠加展示，如果需要不同图形完全隔离开的联动展示，可以再new一个chart，然后通过state联动起来</p>
<h2 id="articleHeader5">geom</h2>
<p>g2对图形进行了抽象，我们通过对点，线，面操作使得可以我们可以画出各种图形</p>
<p><span class="img-wrap"><img data-src="/img/bV4q9Q?w=822&amp;h=562" src="https://static.alili.tech/img/bV4q9Q?w=822&amp;h=562" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bV4rm7?w=796&amp;h=203" src="https://static.alili.tech/img/bV4rm7?w=796&amp;h=203" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>也可以自定义shape来实现图形</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// line画出折线图，position分别从x轴和Y轴取数据，通过city的不同画出不同的折线
chart.line().position('month*temperature').color('city');  
//size表示的是点的大小，shape为点的类型
chart.point().position('month*temperature').color('city').size(4).shape('circle').style({
    stroke: '#fff',
    lineWidth: 1
  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// line画出折线图，position分别从x轴和Y轴取数据，通过city的不同画出不同的折线</span>
<span class="hljs-selector-tag">chart</span><span class="hljs-selector-class">.line</span>()<span class="hljs-selector-class">.position</span>(<span class="hljs-string">'month*temperature'</span>)<span class="hljs-selector-class">.color</span>(<span class="hljs-string">'city'</span>);  
<span class="hljs-comment">//size表示的是点的大小，shape为点的类型</span>
<span class="hljs-selector-tag">chart</span><span class="hljs-selector-class">.point</span>()<span class="hljs-selector-class">.position</span>(<span class="hljs-string">'month*temperature'</span>)<span class="hljs-selector-class">.color</span>(<span class="hljs-string">'city'</span>)<span class="hljs-selector-class">.size</span>(<span class="hljs-number">4</span>)<span class="hljs-selector-class">.shape</span>(<span class="hljs-string">'circle'</span>)<span class="hljs-selector-class">.style</span>({
    <span class="hljs-attribute">stroke</span>: <span class="hljs-string">'#fff'</span>,
    <span class="hljs-attribute">lineWidth</span>: <span class="hljs-number">1</span>
  });</code></pre>
<p><span class="img-wrap"><img data-src="/img/bV4reu?w=664&amp;h=556" src="https://static.alili.tech/img/bV4reu?w=664&amp;h=556" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader6">shape</h2>
<p>而shape正是自定义形状，通过在Shape 上注册图形，实现自定义 Shape 的功能。<br>通过对点，线，面的描绘实现自定义图形</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Shape = G2.Shape;
const shapeObj = Shape.registerShape('geomType', 'shapeName', { 
  getPoints(pointInfo) {
    // 获取每种 shape 绘制的关键点
  },
  draw(cfg, container) {
    // 自定义最终绘制的逻辑
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code><span class="hljs-keyword">const</span> Shape = G2.Shape;
<span class="hljs-keyword">const</span> shapeObj = Shape.registerShape(<span class="hljs-string">'geomType'</span>, <span class="hljs-string">'shapeName'</span>, { 
  getPoints(pointInfo) {
    <span class="hljs-comment">// 获取每种 shape 绘制的关键点</span>
  },
  <span class="hljs-title">draw</span>(cfg, container) {
    <span class="hljs-comment">// 自定义最终绘制的逻辑</span>
  }
});</code></pre>
<h2 id="articleHeader7">coord坐标系</h2>
<p>chart.coord('coordTpye'[, cfg]);主要就是更改坐标系，笛卡尔坐标系（直角坐标系）和 极坐标系，例如通过改成极坐标系来画饼图</p>
<p><span class="img-wrap"><img data-src="/img/bV4riW?w=398&amp;h=263" src="https://static.alili.tech/img/bV4riW?w=398&amp;h=263" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader8">辅助信息</h2>
<h3 id="articleHeader9">axis坐标轴</h3>
<p><span class="img-wrap"><img data-src="/img/bV4rrj?w=874&amp;h=352" src="https://static.alili.tech/img/bV4rrj?w=874&amp;h=352" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>在这里，你可以进行一些针对坐标轴的操作，例如x轴显示的点的个数，坐标轴点的间距</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chart.axis('xField', {
  line: {
    lineWidth: 2, // 设置线的宽度
    stroke: 'red', // 设置线的颜色
    lineDash: [ 3, 3 ] // 设置虚线样式
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">chart</span><span class="hljs-selector-class">.axis</span>(<span class="hljs-string">'xField'</span>, {
  <span class="hljs-attribute">line</span>: {
    <span class="hljs-attribute">lineWidth</span>: <span class="hljs-number">2</span>, <span class="hljs-comment">// 设置线的宽度</span>
    <span class="hljs-attribute">stroke</span>: <span class="hljs-string">'red'</span>, <span class="hljs-comment">// 设置线的颜色</span>
    <span class="hljs-attribute">lineDash</span>: [ <span class="hljs-number">3</span>, <span class="hljs-number">3</span> ] <span class="hljs-comment">// 设置虚线样式</span>
  }
});</code></pre>
<p>实现多Y轴的绘制非常简单，用户完全不需要做任何配置。只要做到各个 geom 的 X 轴属性相同，Y 轴属性不同，G2 就会为您自动生成。</p>
<h3 id="articleHeader10">legend图例</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chart.legend({ 
  position: 'bottom', // 设置图例的显示位置
  itemGap: 20 // 图例项之间的间距
});

chart.legend('cut', false); // 不显示 cut 字段对应的图例

chart.legend('price', {
  title: null // 不展示图例 title
});

chart.legend(false); //所有的图例都不显示" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">chart</span><span class="hljs-selector-class">.legend</span>({ 
  <span class="hljs-attribute">position</span>: <span class="hljs-string">'bottom'</span>, <span class="hljs-comment">// 设置图例的显示位置</span>
  <span class="hljs-attribute">itemGap</span>: <span class="hljs-number">20</span> <span class="hljs-comment">// 图例项之间的间距</span>
});

<span class="hljs-selector-tag">chart</span><span class="hljs-selector-class">.legend</span>(<span class="hljs-string">'cut'</span>, false); <span class="hljs-comment">// 不显示 cut 字段对应的图例</span>

<span class="hljs-selector-tag">chart</span><span class="hljs-selector-class">.legend</span>(<span class="hljs-string">'price'</span>, {
  <span class="hljs-attribute">title</span>: null <span class="hljs-comment">// 不展示图例 title</span>
});

<span class="hljs-selector-tag">chart</span><span class="hljs-selector-class">.legend</span>(false); <span class="hljs-comment">//所有的图例都不显示</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bV4rxy?w=402&amp;h=200" src="https://static.alili.tech/img/bV4rxy?w=402&amp;h=200" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>当然，也可以使用html渲染图例，只需要useHtml:true就可以了</p>
<h3 id="articleHeader11">tooltip提示信息</h3>
<p><span class="img-wrap"><img data-src="/img/bV4rx4?w=735&amp;h=375" src="https://static.alili.tech/img/bV4rx4?w=735&amp;h=375" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span><br>分为两种配置</p>
<ul><li>在chart上配置</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chart.tooltip(true, cfg); // 开启 tooltip，并设置 tooltip 配置信息
chart.tooltip(cfg); // 省略 true, 直接设置 tooltip 配置信息
chart.tooltip(false); // 关闭 tooltip" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code>chart.tooltip(<span class="hljs-keyword">true</span>, cfg); <span class="hljs-regexp">//</span> 开启 tooltip，并设置 tooltip 配置信息
chart.tooltip(cfg); <span class="hljs-regexp">//</span> 省略 <span class="hljs-keyword">true</span>, 直接设置 tooltip 配置信息
chart.tooltip(<span class="hljs-keyword">false</span>); <span class="hljs-regexp">//</span> 关闭 tooltip</code></pre>
<ul><li>在geom对象上配置，粒度更小</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chart.<geom>.tooltip('field1*field2...*fieldN');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code style="word-break: break-word; white-space: initial;">chart.&lt;geom&gt;.<span class="hljs-built_in">tooltip</span>(<span class="hljs-string">'field1*field2...*fieldN'</span>)<span class="hljs-comment">;</span></code></pre>
<p>支持各种自定义操作，对于复杂的场景，可以监听 chart 对象上的 tooltip:change 事件，或者通过回调进行自定义操作</p>
<h3 id="articleHeader12">guide辅助元素</h3>
<p>chart.guide()<br>可以画辅助线或者辅助图案<br>支持line线，image图片,html,text等内容<br>通过chart.guide().line({...})来使用<br><span class="img-wrap"><img data-src="/img/bV4ryy?w=430&amp;h=201" src="https://static.alili.tech/img/bV4ryy?w=430&amp;h=201" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader13">label图形文本</h3>
<p>label在geom上调用<br>chart.point().position(x*y).label('x', {})<br><span class="img-wrap"><img data-src="/img/bV4rAM?w=839&amp;h=255" src="https://static.alili.tech/img/bV4rAM?w=839&amp;h=255" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader14">slider</h2>
<p><strong>需要额外引入</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV4szK?w=423&amp;h=278" src="https://static.alili.tech/img/bV4szK?w=423&amp;h=278" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<blockquote>Slider 组件是完全基于数据的交互组件，同 chart 并无任何关联，无论是你的滑动条想要操纵多少个 chart 或者 view 都没有关系。其滑动时与图表的联动行为，需要同 DataSet 中的状态量相结合，通过定义每个 Slider 对象的 onChange 回调函数，在其中动态更新 DataSet 的状态量来实现数据过滤</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" // !!! 创建 slider 对象
const slider = new Slider({
  container: 'slider', 
  start: '2004-01-01',
  end: '2007-09-24',
  data, // !!! 注意是原始数据，不要传入 dv
  xAxis: 'date',
  yAxis: 'aqi',
  onChange: ({ startText, endText }) => {
    // !!! 更新状态量
    ds.setState('start', startText);
    ds.setState('end', endText);
  }
});
slider.render(); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs erlang-repl"><code> // !!! 创建 slider 对象
const slider = new Slider({
  container: <span class="hljs-string">'slider'</span>, 
  start: <span class="hljs-string">'2004-01-01'</span>,
  end: <span class="hljs-string">'2007-09-24'</span>,
  data, // !!! 注意是原始数据，不要传入 dv
  xAxis: <span class="hljs-string">'date'</span>,
  yAxis: <span class="hljs-string">'aqi'</span>,
  onChange: ({ startText, endText }) =&gt; {
    // !!! 更新状态量
    ds.setState(<span class="hljs-string">'start'</span>, startText);
    ds.setState(<span class="hljs-string">'end'</span>, endText);
  }
});
slider.render(); </code></pre>
<h2 id="articleHeader15">facet分面</h2>
<blockquote>分面，将一份数据按照某个维度分隔成若干子集，然后创建一个图表的矩阵，将每一个数据子集绘制到图形矩阵的窗格中。</blockquote>
<p>总结起来，分面其实提供了两个功能：<br>1.按照指定的维度划分数据集；<br>2.对图表进行排版。<br>主要就是降低维度，把数据拆分开，帮助分析<br><span class="img-wrap"><img data-src="/img/bV4rEh?w=825&amp;h=563" src="https://static.alili.tech/img/bV4rEh?w=825&amp;h=563" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="chart.facet('list', {
  fileds: [ 'cut', 'carat' ],
  padding: 20 // 各个分面之间的间距，也可以是数组 [top, right, bottom, left]
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nsis"><code>chart.facet(<span class="hljs-string">'list'</span>, {
  fileds: [ <span class="hljs-string">'cut'</span>, <span class="hljs-string">'carat'</span> ],
  padding: <span class="hljs-number">20</span> // 各个分面之间的间距，也可以是数组 [<span class="hljs-literal">top</span>, <span class="hljs-literal">right</span>, <span class="hljs-literal">bottom</span>, <span class="hljs-literal">left</span>]
})<span class="hljs-comment">;</span></code></pre>
<h2 id="articleHeader16">animate</h2>
<p>可以自定义animate动画</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const { Animate } = G2;
/**
 * @param  {String} animationType      动画场景类型 appear enter leave update
 * @param  {String} 动画名称，用户自定义即可
 * @param  {Function} 动画执行函数
 **/
Animate.registerAnimation(animationType, animationName, animationFun);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs julia"><code><span class="hljs-keyword">const</span> { Animate } = G2;
/**
 * <span class="hljs-meta">@param</span>  {<span class="hljs-built_in">String</span>} animationType      动画场景类型 appear enter leave update
 * <span class="hljs-meta">@param</span>  {<span class="hljs-built_in">String</span>} 动画名称，用户自定义即可
 * <span class="hljs-meta">@param</span>  {<span class="hljs-built_in">Function</span>} 动画执行函数
 **/
Animate.registerAnimation(animationType, animationName, animationFun);</code></pre>
<h1 id="articleHeader17">其他封装</h1>
<p>antv g2也提供了高层封装，BizCharts和Viser<br>BizCharts 地址：<a href="https://alibaba.github.io/BizCharts/" rel="nofollow noreferrer" target="_blank">https://alibaba.github.io/Biz...</a> <br>Viser 地址：<a href="https://viserjs.github.io/" rel="nofollow noreferrer" target="_blank">https://viserjs.github.io/</a></p>
<blockquote>Viser 并不是针对 React 做的适配，它是对 G2 3.0 通用的抽象。通过基于 Viser 封装，现在已经支持对 React、 Angular 和 Vue 三个常用框架的深度整合，对应的是 viser-react、viser-ng 和 viser-vue。</blockquote>
<p>viser在react的使用，类似于新版的react-router，一切皆是组件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default class App extends React.Component {
  render() {
    return (
      <Chart forceFit height={400} data={data} scale={scale}>
        <Tooltip />
        <Axis />
        <Line position=&quot;year*value&quot; />
        <Point position=&quot;year*value&quot; shape=&quot;circle&quot;/>
      </Chart>
    );
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scala"><code>export <span class="hljs-keyword">default</span> <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">App</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span> </span>{
  render() {
    <span class="hljs-keyword">return</span> (
      &lt;<span class="hljs-type">Chart</span> forceFit height={<span class="hljs-number">400</span>} data={data} scale={scale}&gt;
        &lt;<span class="hljs-type">Tooltip</span> /&gt;
        &lt;<span class="hljs-type">Axis</span> /&gt;
        &lt;<span class="hljs-type">Line</span> position=<span class="hljs-string">"year*value"</span> /&gt;
        &lt;<span class="hljs-type">Point</span> position=<span class="hljs-string">"year*value"</span> shape=<span class="hljs-string">"circle"</span>/&gt;
      &lt;/<span class="hljs-type">Chart</span>&gt;
    );
  }
}</code></pre>
<p>在vue中也类似</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
  <div>
    <v-chart :forceFit=&quot;true&quot; :height=&quot;height&quot; :data=&quot;data&quot; :scale=&quot;scale&quot;>
      <v-tooltip />
      <v-axis />
      <v-line position=&quot;year*value&quot; />
      <v-point position=&quot;year*value&quot; shape=&quot;circle&quot; />
    </v-chart>
  </div>
</template>

<script>
const data = [
  { year: '1991', value: 3 },
  { year: '1992', value: 4 },
  { year: '1993', value: 3.5 },
  { year: '1994', value: 5 },
  { year: '1995', value: 4.9 },
  { year: '1996', value: 6 },
  { year: '1997', value: 7 },
  { year: '1998', value: 9 },
  { year: '1999', value: 13 },
];

const scale = [{
  dataKey: 'value',
  min: 0,
},{
  dataKey: 'year',
  min: 0,
  max: 1,
}];

export default {
  data() {
    return {
      data,
      scale,
      height: 400,
    };
  }
};
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code>&lt;template&gt;
  &lt;div&gt;
    &lt;v-chart :forceFit=<span class="hljs-string">"true"</span> :<span class="hljs-built_in">height</span>=<span class="hljs-string">"height"</span> :data=<span class="hljs-string">"data"</span> :<span class="hljs-built_in">scale</span>=<span class="hljs-string">"scale"</span>&gt;
      &lt;v-tooltip /&gt;
      &lt;v-axis /&gt;
      &lt;v-<span class="hljs-built_in">line</span> position=<span class="hljs-string">"year*value"</span> /&gt;
      &lt;v-<span class="hljs-built_in">point</span> position=<span class="hljs-string">"year*value"</span> <span class="hljs-built_in">shape</span>=<span class="hljs-string">"circle"</span> /&gt;
    &lt;/v-chart&gt;
  &lt;/div&gt;
&lt;/template&gt;

&lt;script&gt;
<span class="hljs-keyword">const</span> data = [
  { <span class="hljs-built_in">year</span>: <span class="hljs-string">'1991'</span>, value: <span class="hljs-number">3</span> },
  { <span class="hljs-built_in">year</span>: <span class="hljs-string">'1992'</span>, value: <span class="hljs-number">4</span> },
  { <span class="hljs-built_in">year</span>: <span class="hljs-string">'1993'</span>, value: <span class="hljs-number">3.5</span> },
  { <span class="hljs-built_in">year</span>: <span class="hljs-string">'1994'</span>, value: <span class="hljs-number">5</span> },
  { <span class="hljs-built_in">year</span>: <span class="hljs-string">'1995'</span>, value: <span class="hljs-number">4.9</span> },
  { <span class="hljs-built_in">year</span>: <span class="hljs-string">'1996'</span>, value: <span class="hljs-number">6</span> },
  { <span class="hljs-built_in">year</span>: <span class="hljs-string">'1997'</span>, value: <span class="hljs-number">7</span> },
  { <span class="hljs-built_in">year</span>: <span class="hljs-string">'1998'</span>, value: <span class="hljs-number">9</span> },
  { <span class="hljs-built_in">year</span>: <span class="hljs-string">'1999'</span>, value: <span class="hljs-number">13</span> },
];

<span class="hljs-keyword">const</span> <span class="hljs-built_in">scale</span> = [{
  dataKey: <span class="hljs-string">'value'</span>,
  <span class="hljs-built_in">min</span>: <span class="hljs-number">0</span>,
},{
  dataKey: <span class="hljs-string">'year'</span>,
  <span class="hljs-built_in">min</span>: <span class="hljs-number">0</span>,
  <span class="hljs-built_in">max</span>: <span class="hljs-number">1</span>,
}];

export <span class="hljs-keyword">default</span> {
  data() {
    <span class="hljs-keyword">return</span> {
      data,
      <span class="hljs-built_in">scale</span>,
      <span class="hljs-built_in">height</span>: <span class="hljs-number">400</span>,
    };
  }
};
&lt;/script&gt;</code></pre>
<p>另外，g2同样支持配置项声明的方式编写，通过编写options来</p>
<p>如果有错误的地方，欢迎指出~~~<br>感谢收看~~</p>
<p>参考文献：<br><a href="https://antv.alipay.com/zh-cn/vis/blog/g2-archi-introduce.html" rel="nofollow noreferrer" target="_blank">https://antv.alipay.com/zh-cn...</a><br><a href="https://antv.alipay.com/zh-cn/g2/3.x/api/index.html" rel="nofollow noreferrer" target="_blank">https://antv.alipay.com/zh-cn...</a><br><a href="https://segmentfault.com/a/1190000009411358">https://segmentfault.com/a/11...</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
antv g2的理解总结

## 原文链接
[https://segmentfault.com/a/1190000013413771](https://segmentfault.com/a/1190000013413771)

