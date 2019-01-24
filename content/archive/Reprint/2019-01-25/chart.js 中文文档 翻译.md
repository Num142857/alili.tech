---
title: 'chart.js 中文文档 翻译' 
date: 2019-01-25 2:30:24
hidden: true
slug: i1zivpsjdl
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">chart.js Configuration文档翻译</h1>
<p>tags: chart 文档 翻译</p>
<p>[TOC]</p>
<h2 id="articleHeader1"><strong>Getting start开始</strong></h2>
<h3 id="articleHeader2"><strong>下载</strong></h3>
<p>github上获得最新版本  <a href="https://github.com/chartjs/Chart.js/releases/tag/v2.1.6" rel="nofollow noreferrer" target="_blank">dowload</a></p>
<p>只是使用cdn <a href="https://cdnjs.com/libraries/Chart.js" rel="nofollow noreferrer" target="_blank">cdn</a></p>
<h4><strong>安装</strong></h4>
<h5><strong>npm</strong></h5>
<blockquote><p>npm install chart.js --save</p></blockquote>
<h3 id="articleHeader3"><strong>bower方法</strong></h3>
<p><a href="http://www.chartjs.org/docs/#chart-configuration-element-configuration" rel="nofollow noreferrer" target="_blank">click here to get info</a></p>
<h3 id="articleHeader4"><strong>选择正确的构建</strong></h3>
<p>Chart.js提供了两种不同的构建：Chart.js抑或Chart.min.js，都附带颜色解析库。如果使用了该版本，并且要使用时间轴，那么你需要先引入Moment.js</p>
<p>Chart.bundle.js 或者 Chart.bundle.min.js把Moment.js包含在了一个文件中。如果你需要时间轴并且希望二者在一个文件中，这是个好选择。</p>
<p>&lt;h3 style="color: red;"&gt;！如果你之前的版本中使用了Monment.js，那么就不要使用Chart.bundle.js版本了，因为可能造成未知问题&lt;h3&gt;</p>
<h3 id="articleHeader5"><strong>使用方法</strong></h3>
<p>使用老的样式引入Chart.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;Chart.js&quot;></script>
<script>
    var myChart = new Chart({...})
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dust"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"Chart.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-keyword">var</span> myChart = <span class="hljs-keyword">new</span> Chart(</span></span><span class="hljs-template-variable">{...}</span><span class="xml"><span class="undefined">)
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>使用牛X的方式引入模块</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Using CommonJS
var Chart = require('src/chart.js')
var myChart = new Chart({...})

// ES6
import Chart from 'src/chart.js'
let myChart = new Chart({...})

// Using requirejs
require(['path/to/Chartjs'], function(Chart){
 var myChart = new Chart({...})
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nimrod"><code>// <span class="hljs-type">Using</span> <span class="hljs-type">CommonJS</span>
<span class="hljs-keyword">var</span> <span class="hljs-type">Chart</span> = require('src/chart.js')
<span class="hljs-keyword">var</span> myChart = new <span class="hljs-type">Chart</span>(<span class="hljs-meta">{...}</span>)

// <span class="hljs-type">ES6</span>
<span class="hljs-keyword">import</span> <span class="hljs-type">Chart</span> <span class="hljs-keyword">from</span> 'src/chart.js'
<span class="hljs-keyword">let</span> myChart = new <span class="hljs-type">Chart</span>(<span class="hljs-meta">{...}</span>)

// <span class="hljs-type">Using</span> requirejs
require(['path/to/<span class="hljs-type">Chartjs</span>'], function(<span class="hljs-type">Chart</span>){
 <span class="hljs-keyword">var</span> myChart = new <span class="hljs-type">Chart</span>(<span class="hljs-meta">{...}</span>)
})</code></pre>
<h3 id="articleHeader6"><strong>创建一个图表</strong></h3>
<p>创建图表我们需要实现图表类Chart class，要做到这些，我们需要传进一个节点，jquery实例，或者canvas都可以让我们在想要的地方绘制。例子如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<canvas id=&quot;myChart&quot; width=&quot;400&quot; height=&quot;400&quot;></canvas>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">&lt;<span class="hljs-selector-tag">canvas</span> id=<span class="hljs-string">"myChart"</span> <span class="hljs-attribute">width</span>=<span class="hljs-string">"400"</span> height=<span class="hljs-string">"400"</span>&gt;&lt;/canvas&gt;</code></pre>
<p><br></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 以下任何形式之一
var ctx = document.getElementById(&quot;myChart&quot;);
var ctx = document.getElementById(&quot;myChart&quot;).getContext(&quot;2d&quot;);
var ctx = $(&quot;#myChart&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 以下任何形式之一</span>
<span class="hljs-keyword">var</span> ctx = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"myChart"</span>);
<span class="hljs-keyword">var</span> ctx = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"myChart"</span>).getContext(<span class="hljs-string">"2d"</span>);
<span class="hljs-keyword">var</span> ctx = $(<span class="hljs-string">"#myChart"</span>);</code></pre>
<p>一旦你创建了元素或者上下文context，你就可以去实现预定义的图标类型，或者自己定义。<br>下面是一个条状图标，显示的内容是对不同颜色的投票，y轴是从零开始。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<canvas id=&quot;myChart&quot; width=&quot;400&quot; height=&quot;400&quot;></canvas>
<script>
var ctx = document.getElementById(&quot;myChart&quot;);
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: [&quot;Red&quot;, &quot;Blue&quot;, &quot;Yellow&quot;, &quot;Green&quot;, &quot;Purple&quot;, &quot;Orange&quot;],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255,99,132,1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        }
    }
});
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"myChart"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"400"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"400"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">var</span> ctx = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"myChart"</span>);
<span class="hljs-keyword">var</span> myChart = <span class="hljs-keyword">new</span> Chart(ctx, {
    <span class="hljs-attr">type</span>: <span class="hljs-string">'bar'</span>,
    <span class="hljs-attr">data</span>: {
        <span class="hljs-attr">labels</span>: [<span class="hljs-string">"Red"</span>, <span class="hljs-string">"Blue"</span>, <span class="hljs-string">"Yellow"</span>, <span class="hljs-string">"Green"</span>, <span class="hljs-string">"Purple"</span>, <span class="hljs-string">"Orange"</span>],
        <span class="hljs-attr">datasets</span>: [{
            <span class="hljs-attr">label</span>: <span class="hljs-string">'# of Votes'</span>,
            <span class="hljs-attr">data</span>: [<span class="hljs-number">12</span>, <span class="hljs-number">19</span>, <span class="hljs-number">3</span>, <span class="hljs-number">5</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>],
            <span class="hljs-attr">backgroundColor</span>: [
                <span class="hljs-string">'rgba(255, 99, 132, 0.2)'</span>,
                <span class="hljs-string">'rgba(54, 162, 235, 0.2)'</span>,
                <span class="hljs-string">'rgba(255, 206, 86, 0.2)'</span>,
                <span class="hljs-string">'rgba(75, 192, 192, 0.2)'</span>,
                <span class="hljs-string">'rgba(153, 102, 255, 0.2)'</span>,
                <span class="hljs-string">'rgba(255, 159, 64, 0.2)'</span>
            ],
            <span class="hljs-attr">borderColor</span>: [
                <span class="hljs-string">'rgba(255,99,132,1)'</span>,
                <span class="hljs-string">'rgba(54, 162, 235, 1)'</span>,
                <span class="hljs-string">'rgba(255, 206, 86, 1)'</span>,
                <span class="hljs-string">'rgba(75, 192, 192, 1)'</span>,
                <span class="hljs-string">'rgba(153, 102, 255, 1)'</span>,
                <span class="hljs-string">'rgba(255, 159, 64, 1)'</span>
            ],
            <span class="hljs-attr">borderWidth</span>: <span class="hljs-number">1</span>
        }]
    },
    <span class="hljs-attr">options</span>: {
        <span class="hljs-attr">scales</span>: {
            <span class="hljs-attr">yAxes</span>: [{
                <span class="hljs-attr">ticks</span>: {
                    <span class="hljs-attr">beginAtZero</span>:<span class="hljs-literal">true</span>
                }
            }]
        }
    }
});
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>不难吧，至此，你可以开始编写自己的图表了，可以是自定义缩放、工具提示、标签、颜色、动作等。</p>
<h3 id="articleHeader7"><strong>Global Configuration全局设置</strong></h3>
<p>Chart.js 提供了一些选项来改变创建的图表的外表。这设置选项可以在创建图表时以设置对象的形式传入到工厂函数中。<br>此外，全局的设置能够影响到每一个新创建的图表。</p>
<h3 id="articleHeader8">Chart Data 图表数据。</h3>
<p>显示数据，必须传入一个所需要显示的信息的给图表(chart),这个信息是data object --data 对象，它包含以下信息。</p>
<table>
<thead><tr>
<th align="center">Name</th>
<th align="center">Type</th>
<th align="left">Description</th>
</tr></thead>
<tbody>
<tr>
<td align="center">datasets</td>
<td align="center">Array[object]</td>
<td align="left">包含每组的数据</td>
</tr>
<tr>
<td align="center">labels</td>
<td align="center">Array[string]</td>
<td align="left">可选的参数，用来显示每个轴的类别</td>
</tr>
<tr>
<td align="center">xLabels</td>
<td align="center">Array[string]</td>
<td align="left">可选参数，如果该轴是横轴适用于轴的种类</td>
</tr>
<tr>
<td align="center">yLavels</td>
<td align="center">Array[string]</td>
<td align="left">可选参数，如果该轴是纵轴，使用于轴的种类</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader9">创建一个带有选项的图表</h3>
<p>往Chartjs的构造函数中传入设置对象。<br>在下面的例子中，创建一个线性图表，并且自适应responsive为false。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var chartInstanc = new Chart(ctx, {
    type:'line',
    data:data,
    options:{
        responsive:false
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-built_in">var</span> chartInstanc = <span class="hljs-literal">new</span> Chart(ctx, {
    <span class="hljs-keyword">type</span>:<span class="hljs-string">'line'</span>,
    <span class="hljs-built_in">data</span>:<span class="hljs-built_in">data</span>,
    options:{
        responsive:<span class="hljs-literal">false</span>
    }
});</code></pre>
<h2 id="articleHeader10">全局设置 Global Configuration</h2>
<p>这个概念是在chart1.0版时引入，用来是保持DRY(不过多重复代码)，允许为不同类型图表设置全局选项，避免挨个设置每个图表，或者去更改默认设置。</p>
<p>chart.js可以在不改变图表类型和缩放适应性的情况下通过传递全局设置来统一改变他们的设置。因此，你既可以随意设置自定义的图表，又可以改变默认的设置。全局选项设置定义在Chart.defaults.global中，每个类型的图表的默认设置已经在文档中进行了论述。</p>
<p>下面的例子将设置hover mode为'sigle'，它作用于所有类型的图表。如果图表被默认的设置覆盖，或者在创建图表时自定义了这个属性，则不起作用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Chart.defaults.global.hover.mode = 'single';

// 这个图表将拥有上述的'single'设置，因为他没有自定义这个模式
var chartInstanceHoverModeSingle = new Chart(ctx, {
    type: 'line',
    data: data,
});

// 这个图表的hover mode会是自己定义的label，因为single被覆盖了
var chartInstanceDifferentHoverMode = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        hover: {
            // Overrides the global setting
            mode: 'label'
        }
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code>Chart.defaults.<span class="hljs-built_in">global</span>.hover.mode = <span class="hljs-string">'single'</span>;

<span class="hljs-comment">// 这个图表将拥有上述的'single'设置，因为他没有自定义这个模式</span>
<span class="hljs-built_in">var</span> chartInstanceHoverModeSingle = <span class="hljs-literal">new</span> Chart(ctx, {
    <span class="hljs-keyword">type</span>: <span class="hljs-string">'line'</span>,
    <span class="hljs-built_in">data</span>: <span class="hljs-built_in">data</span>,
});

<span class="hljs-comment">// 这个图表的hover mode会是自己定义的label，因为single被覆盖了</span>
<span class="hljs-built_in">var</span> chartInstanceDifferentHoverMode = <span class="hljs-literal">new</span> Chart(ctx, {
    <span class="hljs-keyword">type</span>: <span class="hljs-string">'line'</span>,
    <span class="hljs-built_in">data</span>: <span class="hljs-built_in">data</span>,
    options: {
        hover: {
            <span class="hljs-comment">// Overrides the global setting</span>
            mode: <span class="hljs-string">'label'</span>
        }
    }
})</code></pre>
<h3 id="articleHeader11"><strong>全局字体设置</strong></h3>
<p>有四个全局属性可被设置，他们定义在Chart.default.global中。</p>
<table>
<thead><tr>
<th align="center">Name</th>
<th align="center">Type</th>
<th align="center">Default</th>
<th align="center">Description</th>
</tr></thead>
<tbody>
<tr>
<td align="center">defaultFontColor</td>
<td align="center">Color</td>
<td align="center">'#666    '</td>
<td align="center">默认全局字体颜色</td>
</tr>
<tr>
<td align="center">defaultFontFamily</td>
<td align="center">String</td>
<td align="center">"Helvetica     Neue', 'Helvetica', 'Arial', sans-serif"</td>
<td align="center">默认所有字体</td>
</tr>
<tr>
<td align="center">defaultFontSize</td>
<td align="center">Number</td>
<td align="center">12</td>
<td align="center">默认字体大小（在现行缩放的labe两种无效    )</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader12">
<strong>Common Chart</strong> Configuration 通用图标设置</h3>
<p>下面的设置对所有的图表都是用，他们可以设置在 <a href="http://www.chartjs.org/docs/#chart-configuration-global-configuration" rel="nofollow noreferrer" target="_blank">global configuration</a>,或者在自己的图表中传递</p>
<table>
<thead><tr>
<th align="center">Name</th>
<th align="center">Type</th>
<th align="center">Default</th>
<th align="center">Description</th>
</tr></thead>
<tbody>
<tr>
<td align="center">responsive</td>
<td align="center">Boolen</td>
<td align="center">true</td>
<td align="center">当容易改变大小时，自适应图表大小</td>
</tr>
<tr>
<td align="center">responsiveAnimationDuration</td>
<td align="center">Number</td>
<td align="center">0</td>
<td align="center">当resize事件触发时，动画执行的时间，单位毫秒</td>
</tr>
<tr>
<td align="center">maintaionAspectRatio</td>
<td align="center">Boolean</td>
<td align="center">true</td>
<td align="center">改变大小时，图表是否保持比例</td>
</tr>
<tr>
<td align="center">events</td>
<td align="center">Array[String]</td>
<td align="center">["mouseover", "mouseout", "click", "touchstart", "touchemove", "touchend"]</td>
<td align="center">hovering 和 工具提示应监听的事件</td>
</tr>
<tr>
<td align="center">onClick</td>
<td align="center">Function</td>
<td align="center">null</td>
<td align="center">在图标中点击触发或激活一些元素，函数的参数是元素数组</td>
</tr>
<tr>
<td align="center">legendCallback</td>
<td align="center">Function</td>
<td align="center">function(char){}</td>
<td align="center">生成一个legend表单，参数是chart对象，默认返回html文本</td>
</tr>
<tr>
<td align="center">onResize</td>
<td align="center">Function</td>
<td align="center">null</td>
<td align="center">当resize触发时调用，得到两个参数，图表实例和大小</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader13">
<strong>Title Configuration</strong> 标题设置</h3>
<p>标题设置是在options.title中设置的，全局设置是在Chart.defaults.global.title中定义。</p>
<table>
<thead><tr>
<th align="center">Name</th>
<th align="center">Type</th>
<th align="left">Default</th>
<th align="left">Description</th>
</tr></thead>
<tbody>
<tr>
<td align="center">display</td>
<td align="center">Boolean</td>
<td align="left">false</td>
<td align="left">Display the titel block</td>
</tr>
<tr>
<td align="center">position</td>
<td align="center">String</td>
<td align="left">'top'</td>
<td align="left">设置位置，非全局只允许使用'top'/'bottom'</td>
</tr>
<tr>
<td align="center">fullWdith</td>
<td align="center">Boolean</td>
<td align="left">true</td>
<td align="left">设置宽度为canvas的宽度（其他盒子自动下沉不重叠）</td>
</tr>
<tr>
<td align="center">fontSize</td>
<td align="center">Number</td>
<td align="left">12</td>
<td align="left">继承全局字体大小</td>
</tr>
<tr>
<td align="center">fontFamily</td>
<td align="center">String</td>
<td align="left">"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"</td>
<td align="left">继承全局字体设置</td>
</tr>
<tr>
<td align="center">fontColor</td>
<td align="center">Color</td>
<td align="left">"#666"</td>
<td align="left">继承全局字体颜色</td>
</tr>
<tr>
<td align="center">fontStyle</td>
<td align="center">String</td>
<td align="left">'bold'</td>
<td align="left">设置标题样式</td>
</tr>
<tr>
<td align="center">padding</td>
<td align="center">Number</td>
<td align="left">10</td>
<td align="left">上下内边距</td>
</tr>
<tr>
<td align="center">text</td>
<td align="center">String</td>
<td align="left">''</td>
<td align="left">标题内容文本</td>
</tr>
</tbody>
</table>
<h4><strong>实例</strong></h4>
<p>下面例子创建了一个带有名为“Custom Chart Title”标题的图表。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var chartInstance = new Chart(ctx, {
    type: 'line',
    data: data,
    options: {
        title: {
            display: true,
            text: 'Custom Chart Title'
        }
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-built_in">var</span> chartInstance = <span class="hljs-literal">new</span> Chart(ctx, {
    <span class="hljs-keyword">type</span>: <span class="hljs-string">'line'</span>,
    <span class="hljs-built_in">data</span>: <span class="hljs-built_in">data</span>,
    options: {
        title: {
            display: <span class="hljs-literal">true</span>,
            text: <span class="hljs-string">'Custom Chart Title'</span>
        }
    }
})</code></pre>
<h3 id="articleHeader14">
<strong>Legend Configuration</strong> 说明设置</h3>
<p>在options.legend中设置legend，全局设置在Chart.defaults.global.legend定义</p>
<table>
<thead><tr>
<th align="center">Name</th>
<th align="center">Type</th>
<th align="left">Default</th>
<th align="left">Description</th>
</tr></thead>
<tbody>
<tr>
<td align="center">display</td>
<td align="center">Boolean</td>
<td align="left">true</td>
<td align="left">Is the legend displayed</td>
</tr>
<tr>
<td align="center">position</td>
<td align="center">String</td>
<td align="left">'top'</td>
<td align="left">设置位置，非全局只允许使用'top'/'bottom'</td>
</tr>
<tr>
<td align="center">fullWidth</td>
<td align="center">Boolean</td>
<td align="left">true</td>
<td align="left">设置宽度为canvas的宽度（其他盒子自动下沉不重叠）</td>
</tr>
<tr>
<td align="center">onClick</td>
<td align="center">Function</td>
<td align="left">function(event, legendItem){}</td>
<td align="left">回调函数，注册在顶部标签上</td>
</tr>
<tr>
<td align="center">labels</td>
<td align="center">Object</td>
<td align="left">-</td>
<td align="left">查看Legend Label Configuration 说明（下）</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader15">
<strong>Legend Label</strong> Configuration   Legend标签设置</h3>
<p>被设置在Legend的labels键中</p>
<table>
<thead><tr>
<th align="center">Name</th>
<th align="center">Type</th>
<th align="left">Default</th>
<th align="left">Description</th>
</tr></thead>
<tbody>
<tr>
<td align="center">boxWidth</td>
<td align="center">Number</td>
<td align="left">40</td>
<td align="left">着色盒子的宽度</td>
</tr>
<tr>
<td align="center">fontSize</td>
<td align="center">Number</td>
<td align="left">12</td>
<td align="left">继承全局字体大小</td>
</tr>
<tr>
<td align="center">fontFamily</td>
<td align="center">String</td>
<td align="left">"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"</td>
<td align="left">继承全局字体设置</td>
</tr>
<tr>
<td align="center">fontColor</td>
<td align="center">Color</td>
<td align="left">"#666"</td>
<td align="left">继承全局字体颜色</td>
</tr>
<tr>
<td align="center">fontStyle</td>
<td align="center">String</td>
<td align="left">'bold'</td>
<td align="left">设置标题样式</td>
</tr>
<tr>
<td align="center">padding</td>
<td align="center">Number</td>
<td align="left">10</td>
<td align="left">上下内边距</td>
</tr>
<tr>
<td align="center">generateLabels:</td>
<td align="center">Function</td>
<td align="left">function(chart){}</td>
<td align="left">生成legend的所有东西，默认执行返回文字加着色盒子，更多查看Legend Item</td>
</tr>
<tr>
<td align="center">usePointStyle</td>
<td align="center">Boolean</td>
<td align="left">false</td>
<td align="left">是否匹配相应的点样式</td>
</tr>
</tbody>
</table>
<h4>
<strong>Legend</strong> item Interface    Legend界面</h4>
<p>该项被传递到legend 的onClick的回调函数中，从labels.generateLabels中返回，这项中必须实现下面的接口</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    // Label that will be displayed
    text: String,

    // Fill style of the legend box
    fillStyle: Color,

    // If true, this item represents a hidden dataset. Label will be rendered with a strike-through effect
    hidden: Boolean,

    // For box border. See https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineCap
    lineCap: String,

    // For box border. See https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/setLineDash
    lineDash: Array[Number],

    // For box border. See https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineDashOffset
    lineDashOffset: Number,

    // For box border. See https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineJoin
    lineJoin: String,

    // Width of box border
    lineWidth: Number,

    // Stroke style of the legend box
    strokeStyle: Color

    // Point style of the legend box (only used if usePointStyle is true)
    pointStyle: String
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code>{
    <span class="hljs-regexp">//</span> Label that will be displayed
    text: String,

    <span class="hljs-regexp">//</span> Fill style of the legend box
    fillStyle: Color,

    <span class="hljs-regexp">//</span> If true, this item represents a hidden dataset. Label will be rendered with a strike-through effect
    hidden: Boolean,

    <span class="hljs-regexp">//</span> For box border. See https:<span class="hljs-regexp">//</span>developer.mozilla.org<span class="hljs-regexp">/en/</span>docs<span class="hljs-regexp">/Web/</span>API<span class="hljs-regexp">/CanvasRenderingContext2D/</span>lineCap
    lineCap: String,

    <span class="hljs-regexp">//</span> For box border. See https:<span class="hljs-regexp">//</span>developer.mozilla.org<span class="hljs-regexp">/en-US/</span>docs<span class="hljs-regexp">/Web/</span>API<span class="hljs-regexp">/CanvasRenderingContext2D/</span>setLineDash
    lineDash: Array[Number],

    <span class="hljs-regexp">//</span> For box border. See https:<span class="hljs-regexp">//</span>developer.mozilla.org<span class="hljs-regexp">/en-US/</span>docs<span class="hljs-regexp">/Web/</span>API<span class="hljs-regexp">/CanvasRenderingContext2D/</span>lineDashOffset
    lineDashOffset: Number,

    <span class="hljs-regexp">//</span> For box border. See https:<span class="hljs-regexp">//</span>developer.mozilla.org<span class="hljs-regexp">/en-US/</span>docs<span class="hljs-regexp">/Web/</span>API<span class="hljs-regexp">/CanvasRenderingContext2D/</span>lineJoin
    lineJoin: String,

    <span class="hljs-regexp">//</span> Width of box border
    lineWidth: Number,

    <span class="hljs-regexp">//</span> Stroke style of the legend box
    strokeStyle: Color

    <span class="hljs-regexp">//</span> Point style of the legend box (only used <span class="hljs-keyword">if</span> usePointStyle is true)
    pointStyle: String
}</code></pre>
<h4><strong>实例</strong></h4>
<p>下面例子将创建一个带有legend的图表，并且文字颜色为红色。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var chartInstance = new Chart(ctx, {
    type: 'bar',
    data: data,
    options: {
        legend: {
            display: true,
            labels: {
                fontColor: 'rgb(255, 99, 132)'
            }
        }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">var</span> <span class="hljs-string">chartInstance</span> <span class="hljs-string">=</span> <span class="hljs-string">new</span> <span class="hljs-string">Chart(ctx,</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    type:</span> <span class="hljs-string">'bar'</span><span class="hljs-string">,</span>
<span class="hljs-attr">    data:</span> <span class="hljs-string">data,</span>
<span class="hljs-attr">    options:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        legend:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">            display:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">            labels:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                fontColor:</span> <span class="hljs-string">'rgb(255, 99, 132)'</span>
            <span class="hljs-string">}</span>
        <span class="hljs-string">}</span>
    <span class="hljs-string">}</span>
<span class="hljs-string">});</span></code></pre>
<h3 id="articleHeader16">
<strong>Tooltips Configuration</strong> 提示工具设置</h3>
<p>提示工具在options.tooltips中设置，全局在Chart.defaults.global.tooptips中设置</p>
<table>
<thead><tr>
<th align="left">Name</th>
<th align="center">Type</th>
<th align="left">Default</th>
<th align="left">Description</th>
</tr></thead>
<tbody>
<tr>
<td align="left">enable</td>
<td align="center">Boolear</td>
<td align="left">true</td>
<td align="left">提示工具是否生效</td>
</tr>
<tr>
<td align="left">custom</td>
<td align="center">Function</td>
<td align="left">null</td>
<td align="left">查看section（下面）</td>
</tr>
<tr>
<td align="left">mode</td>
<td align="center">String</td>
<td align="left">'single'</td>
<td align="left">设置那种元素在tooltips，选择的设置有‘single’，‘label’，‘x-axis’。&lt;bar&gt;single：高亮最近的元素<br>label：高亮同样值的数据<br>x-axis：高亮所有的数据原色，当鼠标悬浮到块是x值被选中。</td>
</tr>
<tr>
<td align="left">itemSort</td>
<td align="center">Function</td>
<td align="left">undefined</td>
<td align="left">允许对tooltip项进行排序，但是执行传递到Array.prototype.sort中的函数</td>
</tr>
<tr>
<td align="left">backgroundColor</td>
<td align="center">Color</td>
<td align="left">'rgba(0,0,0,0.8)'</td>
<td align="left">背景颜色</td>
</tr>
<tr>
<td align="left">titleFontFamily</td>
<td align="center">String</td>
<td align="left">"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"</td>
<td align="left">继承全局字体</td>
</tr>
<tr>
<td align="left">titleFontSize</td>
<td align="center">Number</td>
<td align="left">12</td>
<td align="left">继承全局字体大小</td>
</tr>
<tr>
<td align="left">titleFontStyle</td>
<td align="center">String</td>
<td align="left">'bold'</td>
<td align="left"> </td>
</tr>
<tr>
<td align="left">titleFontColor</td>
<td align="center">Color</td>
<td align="left">'#fff'</td>
<td align="left">字体颜色</td>
</tr>
<tr>
<td align="left">titleSpacing</td>
<td align="center">Number</td>
<td align="left">2</td>
<td align="left">行间距</td>
</tr>
<tr>
<td align="left">titleMarginBottom</td>
<td align="center">Number</td>
<td align="left">6</td>
<td align="left">标题底边距</td>
</tr>
<tr>
<td align="left">bodyFontFamily</td>
<td align="center">String</td>
<td align="left">"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"</td>
<td align="left">继承全局字体</td>
</tr>
<tr>
<td align="left">bodyFontSize</td>
<td align="center">Number</td>
<td align="left">12</td>
<td align="left">字体大小</td>
</tr>
<tr>
<td align="left">bodyFontStyle</td>
<td align="center">String</td>
<td align="left">'bold'</td>
<td align="left"> </td>
</tr>
<tr>
<td align="left">bodyFontColor</td>
<td align="center">Color</td>
<td align="left">'#fff'</td>
<td align="left">字体颜色</td>
</tr>
<tr>
<td align="left">bodySpacing</td>
<td align="center">Number</td>
<td align="left">2</td>
<td align="left">行间距</td>
</tr>
<tr>
<td align="left">footerFontFamily</td>
<td align="center">String</td>
<td align="left">"'Helvetica Neue', 'Helvetica', 'Arial', sans-serif"</td>
<td align="left">字体</td>
</tr>
<tr>
<td align="left">footerFontSize</td>
<td align="center">Number</td>
<td align="left">12</td>
<td align="left">字体大小</td>
</tr>
<tr>
<td align="left">footerFontStyle</td>
<td align="center">String</td>
<td align="left">'bold'</td>
<td align="left"> </td>
</tr>
<tr>
<td align="left">footerFontColor</td>
<td align="center">Color</td>
<td align="left">'#fff'</td>
<td align="left">字体颜色</td>
</tr>
<tr>
<td align="left">footerSpacing</td>
<td align="center">Number</td>
<td align="left">2</td>
<td align="left">行间距</td>
</tr>
<tr>
<td align="left">footerMarginTop</td>
<td align="center">Number</td>
<td align="left">6</td>
<td align="left">footer之间的间距</td>
</tr>
<tr>
<td align="left">xPadding</td>
<td align="center">Number</td>
<td align="left">6</td>
<td align="left">tooltip左右边距</td>
</tr>
<tr>
<td align="left">yPadding</td>
<td align="center">Number</td>
<td align="left">6</td>
<td align="left">tooltip上下边距</td>
</tr>
<tr>
<td align="left">createSize</td>
<td align="center">Number</td>
<td align="left">5</td>
<td align="left">tooltip箭头大小，像素单位</td>
</tr>
<tr>
<td align="left">cornerRadius</td>
<td align="center">Number</td>
<td align="left">6</td>
<td align="left">拐角比率</td>
</tr>
<tr>
<td align="left">muliKeyBackground</td>
<td align="center">Color</td>
<td align="left">'#fff'</td>
<td align="left">Color to draw behind the colored boxes when multiple items are in the tooltip</td>
</tr>
<tr>
<td align="left">callbacks</td>
<td align="center">Object</td>
<td align="left">Name</td>
<td align="left">查看callback section部分</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader17">
<strong>Tooltip Callback</strong> 回调函数</h3>
<p>tooltip callback设置项，被嵌套在tooltip configuration设置相中，使用<code>callbacks</code>关键字。tooltip有一下callback来提供文字。‘this’关键字代表的是从Chart.Tooltip构造函数创建的对象。</p>
<p>所有的函数拥有共同的参数，tooltip项、data对象，所有的函数都必须返回文字string或者数组，数组代表的是多行文字。</p>
<table>
<thead><tr>
<th align="left">Callback</th>
<th align="left">Arguments</th>
<th align="left">Description</th>
</tr></thead>
<tbody>
<tr>
<td align="left">beforeTitle</td>
<td align="left">Array[tooltipItem], data</td>
<td align="left">渲染标题之前的文字</td>
</tr>
<tr>
<td align="left">title</td>
<td align="left">Array[tooltipItem], data</td>
<td align="left">渲染成标题的文字</td>
</tr>
<tr>
<td align="left">afterTitle</td>
<td align="left">Array[tooltipItem], data</td>
<td align="left">渲染标题之后的文字</td>
</tr>
<tr>
<td align="left">beforeBody</td>
<td align="left">Array[tooltipItem], data</td>
<td align="left">body块之前的文字</td>
</tr>
<tr>
<td align="left">beforeLabel</td>
<td align="left">tooltipItem, data</td>
<td align="left">个人标签之前的文字</td>
</tr>
<tr>
<td align="left">label</td>
<td align="left">tooltipItem, data</td>
<td align="left">个人定义的标签文字</td>
</tr>
<tr>
<td align="left">labelColor</td>
<td align="left">tooltipItem, chartInstace</td>
<td align="left">渲染颜色，有两个参数边框颜色borderColor和背景颜色backgroundColor</td>
</tr>
<tr>
<td align="left">afterLabel</td>
<td align="left">tooltipItem, data</td>
<td align="left">个人标签之后的文字</td>
</tr>
<tr>
<td align="left">afterBody</td>
<td align="left">Array[tooltipItem], data</td>
<td align="left">body之后的文字</td>
</tr>
<tr>
<td align="left">beforeFooter</td>
<td align="left">Array[tooltipItem], data</td>
<td align="left">footer之前的文字</td>
</tr>
<tr>
<td align="left">footer</td>
<td align="left">Array[tooltipItem], data</td>
<td align="left">footer文字</td>
</tr>
<tr>
<td align="left">afterFooter</td>
<td align="left">Array[tooltipItem], data</td>
<td align="left">footer之后的文字</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader18"><strong>Tooltip Item Interface tooltip项接口</strong></h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    // X Value of the tooltip as a string
    xLabel: String,

    // Y value of the tooltip as a string
    yLabel: String,

    // Index of the dataset the item comes from
    datasetIndex: Number,

    // Index of this data item in the dataset
    index: Number
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>{
    <span class="hljs-comment">// X Value of the tooltip as a string</span>
<span class="hljs-symbol">    xLabel:</span> String,

    <span class="hljs-comment">// Y value of the tooltip as a string</span>
<span class="hljs-symbol">    yLabel:</span> String,

    <span class="hljs-comment">// Index of the dataset the item comes from</span>
<span class="hljs-symbol">    datasetIndex:</span> Number,

    <span class="hljs-comment">// Index of this data item in the dataset</span>
<span class="hljs-symbol">    index:</span> Number
}</code></pre>
<h3 id="articleHeader19"><strong>Hover Configuration hover 设置</strong></h3>
<p>hover configuraton在options.hover中设置，全局设置是Chart.defaults.global.hover</p>
<table>
<thead><tr>
<th align="left">Name</th>
<th align="left">Type</th>
<th align="left">Default</th>
<th align="left">Description</th>
</tr></thead>
<tbody>
<tr>
<td align="left">mode</td>
<td align="left">String</td>
<td align="left">'single'</td>
<td align="left">设置那种元素在tooltips，选择的设置有‘single’，‘label’，‘x-axis’。&lt;bar&gt;single：高亮最近的元素<br>label：高亮同样值的数据<br>x-axis：高亮所有的数据原色，当鼠标悬浮到块是x值被选中。<br>高亮最近的数据</td>
</tr>
<tr>
<td align="left">animationDuration</td>
<td align="left">Number</td>
<td align="left">400</td>
<td align="left">悬浮时动画执行的时间，单位，毫秒</td>
</tr>
<tr>
<td align="left">onHover</td>
<td align="left">Function</td>
<td align="left">null</td>
<td align="left">调用被触发的任何事件</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader20"><strong>Animation Configuration动画设置</strong></h3>
<p>以下动画设置都可生效，全局设置在Chart.defaults.global.animation中定义。</p>
<table>
<thead><tr>
<th align="left">Name</th>
<th align="left">Type</th>
<th align="left">Default</th>
<th align="left">Description</th>
</tr></thead>
<tbody>
<tr>
<td align="left">duration</td>
<td align="left">Number</td>
<td align="left">1000</td>
<td align="left">动画执行时间，单位毫秒</td>
</tr>
<tr>
<td align="left">easing</td>
<td align="left">String</td>
<td align="left">"easeOutQuart"</td>
<td align="left">使用埃舍尔函数</td>
</tr>
<tr>
<td align="left">onProgress</td>
<td align="left">Function</td>
<td align="left">none</td>
<td align="left">动画的每一步执行的回调函数，传入一个对象参数，该对象包含一个图表实例，以及包含细节的动画对象</td>
</tr>
<tr>
<td align="left">onComplete</td>
<td align="left">Function</td>
<td align="left">none</td>
<td align="left">动画结束时调用的回调函数，参数与onProgress相同</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader21"><strong>Animation Callbacks 动画回调函数</strong></h3>
<p>图标动画的onProgress 和 onComplete回调函数在同步一个额外的绘制时是很有用的。他们的参数对象事先下面的接口。这些会掉函数的使用例子可以在<a href="https://github.com/chartjs/Chart.js/blob/master/samples/AnimationCallbacks/progress-bar.html" rel="nofollow noreferrer" target="_blank">这里</a>找到.这个例子显示一个程序条，显示动画执行时间。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    // Chart object
    chartInstance,

    // Contains details of the on-going animation
    animationObject,
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>{
    <span class="hljs-comment">// Chart object</span>
    chartInstance,

    <span class="hljs-comment">// Contains details of the on-going animation</span>
    animationObject,
}</code></pre>
<h3 id="articleHeader22"><strong>Animation Object动画对象</strong></h3>
<p>动画对象是Chart.Animation的一个类型实例，它包括下面的属性</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    // Current Animation frame number
    currentStep: Number,

    // Number of animation frames
    numSteps: Number,

    // Animation easing to use
    easing: String,

    // Function that renders the chart
    render: Function,

    // User callback
    onAnimationProgress: Function,

    // User callback
    onAnimationComplete: Function
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>{
    <span class="hljs-comment">// Current Animation frame number</span>
<span class="hljs-symbol">    currentStep:</span> Number,

    <span class="hljs-comment">// Number of animation frames</span>
<span class="hljs-symbol">    numSteps:</span> Number,

    <span class="hljs-comment">// Animation easing to use</span>
<span class="hljs-symbol">    easing:</span> String,

    <span class="hljs-comment">// Function that renders the chart</span>
<span class="hljs-symbol">    render:</span> Function,

    <span class="hljs-comment">// User callback</span>
<span class="hljs-symbol">    onAnimationProgress:</span> Function,

    <span class="hljs-comment">// User callback</span>
<span class="hljs-symbol">    onAnimationComplete:</span> Function
}</code></pre>
<h3 id="articleHeader23"><strong>Element Configuration 元素设置</strong></h3>
<p>它在Chart.defaults.global.elements中定义全局设置</p>
<p>Options可以设置四中不同的元素类型：arc弧,lines线性,points点,ande rectangles矩形.一旦设置，该类型中的对象都将执行，除非在dataset中设置覆盖。</p>
<h3 id="articleHeader24"><strong>Arc Configuration</strong></h3>
<p>Arcs 被用在极地、环、饼状图标中。下面是他们的设置。全局arc设置保存在Chart.default.global.elements.arc</p>
<table>
<thead><tr>
<th align="left">Name</th>
<th align="left">Type</th>
<th align="left">Default</th>
<th align="left">Description</th>
</tr></thead>
<tbody>
<tr>
<td align="left">backgroundColor</td>
<td align="left">Color</td>
<td align="left">'rgba(0,0,0,0.1)'</td>
<td align="left">默认的填充颜色</td>
</tr>
<tr>
<td align="left">borderColor</td>
<td align="left">Color</td>
<td align="left">'#fff'</td>
<td align="left">默认线条颜色</td>
</tr>
<tr>
<td align="left">borderWidth</td>
<td align="left">Number</td>
<td align="left">2</td>
<td align="left">默认线条宽度</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader25"><strong>Line Configuration 线性设置</strong></h3>
<p>线性元素用来描绘线性图表，其全局选项存储在Chart.defaults.global.elements.line中</p>
<table>
<thead><tr>
<th align="left">Name</th>
<th align="left">Type</th>
<th align="left">Default</th>
<th align="left">Description</th>
</tr></thead>
<tbody>
<tr>
<td align="left">tension</td>
<td align="left">Number</td>
<td align="left">0.4</td>
<td align="left">默认贝塞尔曲线张力设置，设置为0时，没有曲线张力</td>
</tr>
<tr>
<td align="left">backgroundColor</td>
<td align="left">Color</td>
<td align="left">'rgba(0,0,0,0.1)'</td>
<td align="left">默认填充颜色</td>
</tr>
<tr>
<td align="left">borderWidth</td>
<td align="left">Number</td>
<td align="left">3</td>
<td align="left">线的宽度</td>
</tr>
<tr>
<td align="left">borderColor</td>
<td align="left">Color</td>
<td align="left">'rgba(0,0,0,0.1)'</td>
<td align="left">默认线的颜色</td>
</tr>
<tr>
<td align="left">borderCapStyle</td>
<td align="left">String</td>
<td align="left">'butt'</td>
<td align="left">默认线的一端的样式</td>
</tr>
<tr>
<td align="left">borderDash</td>
<td align="left">Array</td>
<td align="left">[]</td>
<td align="left">默认线条波折线样式</td>
</tr>
<tr>
<td align="left">borderDashOffset</td>
<td align="left">Number</td>
<td align="left">0.0</td>
<td align="left">默认波折线间距</td>
</tr>
<tr>
<td align="left">borderJoinStyle</td>
<td align="left">String</td>
<td align="left">'miter'</td>
<td align="left">默认线波折连接样式</td>
</tr>
<tr>
<td align="left">capBezierPoints</td>
<td align="left">Boolean</td>
<td align="left">true</td>
<td align="left">如果值为<code>true</code>则控制图表内部点，为<code>false</code>则不控制</td>
</tr>
<tr>
<td align="left">fill</td>
<td align="left">Boolean</td>
<td align="left">true</td>
<td align="left">如果是true则为线填充颜色</td>
</tr>
<tr>
<td align="left">stepped</td>
<td align="left">Boolean</td>
<td align="left">false</td>
<td align="left">如果是true则线的样式是折线，张力会无效</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader26"><strong>Point Configuration点型设置</strong></h3>
<p>点型元素用来设置线性或者泡泡型图表，它的全局选项存储在Chart.default.global.elements.point中。</p>
<table>
<thead><tr>
<th align="left">Name</th>
<th align="left">Type</th>
<th align="left">Default</th>
<th align="left">Description</th>
</tr></thead>
<tbody>
<tr>
<td align="left">radius</td>
<td align="left">Number</td>
<td align="left">3</td>
<td align="left">默认半径</td>
</tr>
<tr>
<td align="left">pointStyle</td>
<td align="left">String</td>
<td align="left">'circle'</td>
<td align="left">默认样式</td>
</tr>
<tr>
<td align="left">backgroundColor</td>
<td align="left">Color</td>
<td align="left">'rgba(0,0,0,0.1)'</td>
<td align="left">默认填充颜色</td>
</tr>
<tr>
<td align="left">borderWidth</td>
<td align="left">Number</td>
<td align="left">1</td>
<td align="left">默认边的宽度</td>
</tr>
<tr>
<td align="left">borderColor</td>
<td align="left">Color</td>
<td align="left">'rgba(0,0,0,0.1)'</td>
<td align="left">默认边的颜色</td>
</tr>
<tr>
<td align="left">hitRadius</td>
<td align="left">Number</td>
<td align="left">1</td>
<td align="left">鼠标悬浮时额外增加的半径</td>
</tr>
<tr>
<td align="left">hoverRadius</td>
<td align="left">Number</td>
<td align="left">4</td>
<td align="left">鼠标放上去是的默认半径</td>
</tr>
<tr>
<td align="left">hoverBorderWidth</td>
<td align="left">Number</td>
<td align="left">1</td>
<td align="left">鼠标放上去时默认线宽</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader27"><strong>Rectangle Configuration矩形设置</strong></h3>
<p>矩形元素用来绘制条状图表，全局属性设置存储在Chart.defaults.global.element.rectangle中</p>
<table>
<thead><tr>
<th align="left">Name</th>
<th align="left">Type</th>
<th align="left">Default</th>
<th align="left">Description</th>
</tr></thead>
<tbody>
<tr>
<td align="left">backgroundColor</td>
<td align="left">Color</td>
<td align="left">'rgba(0,0,0,0.1)'</td>
<td align="left">默认条颜色</td>
</tr>
<tr>
<td align="left">borderWidth</td>
<td align="left">Number</td>
<td align="left">0</td>
<td align="left">默认条的线宽</td>
</tr>
<tr>
<td align="left">borderColor</td>
<td align="left">Color</td>
<td align="left">'rgba(0,0,0,0.1)'</td>
<td align="left">默认条的线的颜色</td>
</tr>
<tr>
<td align="left">borderSkipped</td>
<td align="left">String</td>
<td align="left">'bottom'</td>
<td align="left">默认的跳跃边界</td>
</tr>
</tbody>
</table>
<h3 id="articleHeader28"><strong>Color颜色</strong></h3>
<p>当给图表的选项设置颜色时，可以使用几种颜色格式。一、16进制文字; 二、RGB； 三、HSL符号。如果需要颜色但是又没有去自定义，图表就回去使用默认颜色。默认颜色存储在Chart.defaults.global.defaultColor.它的初始值是'rgb(0,0,0,0.1)'。</p>
<p>你也可以传递一个CanvasGradient对象，传递之前需先创建。</p>
<p>最后的设置项是传递一个CanvasPattern对象。例如，如果你想要填充数据到一个图片上，如下！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var img = new Image();
img.src = 'https://example.com/my_image.png';
img.onload = function() {
    var ctx = document.getElementById('canvas').getContext('2d');
    var fillPattern = ctx.createPattern(img, 'repeat');

    var chart = new Chart(ctx, {
        data: {
            labels: ['Item 1', 'Item 2', 'Item 3'],
            datasets: [{
                data: [10, 20, 30],
                backgroundColor: fillPattern
            }]
        }
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> img = <span class="hljs-keyword">new</span> <span class="hljs-type">Image</span>();
img.src = <span class="hljs-string">'https://example.com/my_image.png'</span>;
img.onload = <span class="hljs-function"><span class="hljs-keyword">function</span></span>() {
    <span class="hljs-keyword">var</span> ctx = document.getElementById(<span class="hljs-string">'canvas'</span>).getContext(<span class="hljs-string">'2d'</span>);
    <span class="hljs-keyword">var</span> fillPattern = ctx.createPattern(img, <span class="hljs-string">'repeat'</span>);

    <span class="hljs-keyword">var</span> chart = <span class="hljs-keyword">new</span> <span class="hljs-type">Chart</span>(ctx, {
        data: <span class="hljs-type"></span>{
            labels: <span class="hljs-type"></span>[<span class="hljs-string">'Item 1'</span>, <span class="hljs-string">'Item 2'</span>, <span class="hljs-string">'Item 3'</span>],
            datasets: <span class="hljs-type"></span>[{
                data: <span class="hljs-type"></span>[<span class="hljs-number">10</span>, <span class="hljs-number">20</span>, <span class="hljs-number">30</span>],
                backgroundColor: <span class="hljs-type">fillPattern</span>
            }]
        }
    })
}</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
chart.js 中文文档 翻译

## 原文链接
[https://segmentfault.com/a/1190000008498664](https://segmentfault.com/a/1190000008498664)

