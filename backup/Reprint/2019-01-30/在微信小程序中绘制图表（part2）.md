---
title: '在微信小程序中绘制图表（part2）' 
date: 2019-01-30 2:30:23
hidden: true
slug: n32g72cmwn
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">本期大纲</h1>
<p>1、确定纵坐标的范围并绘制</p>
<p>2、根据真实数据绘制折线</p>
<p>相关阅读：<br><a href="https://segmentfault.com/a/1190000007649376">在微信小程序中绘制图表（part1）</a><br><a href="https://segmentfault.com/a/1190000007876976" target="_blank">在微信小程序中绘制图表（part3）</a></p>
<blockquote><p><strong> 关注我的 <a href="https://github.com/xiaolin3303/wx-charts" rel="nofollow noreferrer" target="_blank">github</a> 项目 查看完整代码。 </strong></p></blockquote>
<h1 id="articleHeader1">确定纵坐标的范围并绘制</h1>
<p>为了避免纵坐标的刻度出现小数的情况，我们把纵坐标分为5个区块，我们取最小单位刻度为例如10（能够被5整除），当然真实情况会比这复杂，待会儿我们再讨论。</p>
<p>所以我们的处理输入输出应该是下面的结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(5, 34.1)  => (10, 40)
(10, 34)   => (10, 40)
(-5.1, 40) => (-10, 40)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>(<span class="hljs-number">5</span>, <span class="hljs-number">34.1</span>)  =&gt; (<span class="hljs-number">10</span>, <span class="hljs-number">40</span>)
(<span class="hljs-number">10</span>, <span class="hljs-number">34</span>)   =&gt; (<span class="hljs-number">10</span>, <span class="hljs-number">40</span>)
(<span class="hljs-number">-5.1</span>, <span class="hljs-number">40</span>) =&gt; (<span class="hljs-number">-10</span>, <span class="hljs-number">40</span>)</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 确定Y轴取值范围
function findRange (num, type, limit) {
    limit = limit || 10;
    
    // upper向上查找，lower向下查找
    type = type ? type : 'upper';

    // 进行取整操作，避免while时进入死循环
    if (type === 'upper') {
        num = Math.ceil(num);
    } else {
        num = Math.floor(num);
    }
    while (num % limit !== 0) {
        if (type === 'upper') {
            num++;
        } else {
            num--;
        }
    }

    return num;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 确定Y轴取值范围</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">findRange</span> (<span class="hljs-params">num, type, limit</span>) </span>{
    limit = limit || <span class="hljs-number">10</span>;
    
    <span class="hljs-comment">// upper向上查找，lower向下查找</span>
    type = type ? type : <span class="hljs-string">'upper'</span>;

    <span class="hljs-comment">// 进行取整操作，避免while时进入死循环</span>
    <span class="hljs-keyword">if</span> (type === <span class="hljs-string">'upper'</span>) {
        num = <span class="hljs-built_in">Math</span>.ceil(num);
    } <span class="hljs-keyword">else</span> {
        num = <span class="hljs-built_in">Math</span>.floor(num);
    }
    <span class="hljs-keyword">while</span> (num % limit !== <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">if</span> (type === <span class="hljs-string">'upper'</span>) {
            num++;
        } <span class="hljs-keyword">else</span> {
            num--;
        }
    }

    <span class="hljs-keyword">return</span> num;
}</code></pre>
<p>好了，初步的确定范围已经完成了，但是细想一下这个范围还是不是很理想，比如用户传入的数据都是小数级别的，比如 <code>(0.2, 0.8)</code>，我们输出的范围是<code>(0, 5)</code>这个范围偏大，图表展现的效果则会是上面有大部分的留白，同样用户输入的数据很大，比如<code>(10000, 18000)</code>，我们得到的范围是<code>(10000, 18010)</code>，这个范围则没什么意义，所以我们需要根据传入的数据的范围来分别确定我们的最小单位刻度。</p>
<p>规定我们的参数格式是这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="opts = {
    ...
    series: [{
            ...
            data: [15, 20, 45, 37, 4, 80]
        }, {
            ...
            data: [70, 40, 65, 100, 34, 18]
        }
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code><span class="hljs-title">opts</span> = {
    ...
    series: [{
            ...
            <span class="hljs-class"><span class="hljs-keyword">data</span>: [15, 20, 45, 37, 4, 80]</span>
        }, {
            ...
            <span class="hljs-class"><span class="hljs-keyword">data</span>: [70, 40, 65, 100, 34, 18]</span>
        }
    ]
}</code></pre>
<p>让我们继续进行优化</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 合并数据，将series中的每项data整合到一个数组当中
function dataCombine(series) {
    return series.reduce(function(a, b) {
        return (a.data ? a.data : a).concat(b.data);
    }, []);
}

// 根据数据范围确定最小单位刻度
function getLimit (maxData, minData)
    var limit = 0;
    var range = maxData - minData;
    if (range >= 10000) {
        limit = 1000;
    } else if (range >= 1000) {
        limit = 100;
    } else if (range >= 100) {
        limit = 10;
    } else if (range >= 10) {
        limit = 5;
    } else if (range >= 1) {
        limit = 1;
    } else if (range >= 0.1) {
        limit = 0.1;
    } else {
        limit = 0.01;
    }
}

var dataList = dataCombine(opts.series);
// 获取传入数据的最小值
var minData = Math.min.apply(this, dataList);
// 获取传入数据的最大值
var maxData = Math.max.apply(this, dataList);

var limit = getLimit(maxData, minData);

var minRange = findRange(minData, 'lower', limit);
var maxRange = findRange(maxData, 'upper', limit);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 合并数据，将series中的每项data整合到一个数组当中</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">dataCombine</span>(<span class="hljs-params">series</span>) </span>{
    <span class="hljs-keyword">return</span> series.reduce(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">a, b</span>) </span>{
        <span class="hljs-keyword">return</span> (a.data ? a.data : a).concat(b.data);
    }, []);
}

<span class="hljs-comment">// 根据数据范围确定最小单位刻度</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getLimit</span> (<span class="hljs-params">maxData, minData</span>)
    <span class="hljs-title">var</span> <span class="hljs-title">limit</span> = 0;
    <span class="hljs-title">var</span> <span class="hljs-title">range</span> = <span class="hljs-title">maxData</span> - <span class="hljs-title">minData</span>;
    <span class="hljs-title">if</span> (<span class="hljs-params">range &gt;= <span class="hljs-number">10000</span></span>) </span>{
        limit = <span class="hljs-number">1000</span>;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (range &gt;= <span class="hljs-number">1000</span>) {
        limit = <span class="hljs-number">100</span>;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (range &gt;= <span class="hljs-number">100</span>) {
        limit = <span class="hljs-number">10</span>;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (range &gt;= <span class="hljs-number">10</span>) {
        limit = <span class="hljs-number">5</span>;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (range &gt;= <span class="hljs-number">1</span>) {
        limit = <span class="hljs-number">1</span>;
    } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (range &gt;= <span class="hljs-number">0.1</span>) {
        limit = <span class="hljs-number">0.1</span>;
    } <span class="hljs-keyword">else</span> {
        limit = <span class="hljs-number">0.01</span>;
    }
}

<span class="hljs-keyword">var</span> dataList = dataCombine(opts.series);
<span class="hljs-comment">// 获取传入数据的最小值</span>
<span class="hljs-keyword">var</span> minData = <span class="hljs-built_in">Math</span>.min.apply(<span class="hljs-keyword">this</span>, dataList);
<span class="hljs-comment">// 获取传入数据的最大值</span>
<span class="hljs-keyword">var</span> maxData = <span class="hljs-built_in">Math</span>.max.apply(<span class="hljs-keyword">this</span>, dataList);

<span class="hljs-keyword">var</span> limit = getLimit(maxData, minData);

<span class="hljs-keyword">var</span> minRange = findRange(minData, <span class="hljs-string">'lower'</span>, limit);
<span class="hljs-keyword">var</span> maxRange = findRange(maxData, <span class="hljs-string">'upper'</span>, limit);</code></pre>
<p>现在我们动态的确定除了合适的最小刻度范围，接下来我们接着优化一下上面的<code>findRange</code>方法，主要是增加对小数的支持</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function findRange (num, type, limit) {
    limit = limit || 10;
    type = type ? type : 'upper';
    var multiple = 1;
    while (limit < 1) {
        limit *= 10;
        multiple *= 10;
    }
    if (type === 'upper') {
        num = Math.ceil(num * multiple);
    } else {
        num = Math.floor(num * multiple);
    }
    while (num % limit !== 0) {
        if (type === 'upper') {
            num++;
        } else {
            num--;
        }
    }

    return num / multiple;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">findRange</span> (<span class="hljs-params">num, type, limit</span>) </span>{
    limit = limit || <span class="hljs-number">10</span>;
    type = type ? type : <span class="hljs-string">'upper'</span>;
    <span class="hljs-keyword">var</span> multiple = <span class="hljs-number">1</span>;
    <span class="hljs-keyword">while</span> (limit &lt; <span class="hljs-number">1</span>) {
        limit *= <span class="hljs-number">10</span>;
        multiple *= <span class="hljs-number">10</span>;
    }
    <span class="hljs-keyword">if</span> (type === <span class="hljs-string">'upper'</span>) {
        num = <span class="hljs-built_in">Math</span>.ceil(num * multiple);
    } <span class="hljs-keyword">else</span> {
        num = <span class="hljs-built_in">Math</span>.floor(num * multiple);
    }
    <span class="hljs-keyword">while</span> (num % limit !== <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">if</span> (type === <span class="hljs-string">'upper'</span>) {
            num++;
        } <span class="hljs-keyword">else</span> {
            num--;
        }
    }

    <span class="hljs-keyword">return</span> num / multiple;
}</code></pre>
<p>现在我们已经确定好了Y轴的取值范围，关于如何画出Y轴可以参看 <a href="https://segmentfault.com/a/1190000007649376">part1</a> 中X轴的绘制方法，此处不再累赘。</p>
<p>Y轴效果图：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="opts = {
    ...
    series: [{
            ...
            data: [15, 20, 45, 37, 4, 80]
        }, {
            ...
            data: [70, 40, 65, 100, 34, 18]
        }
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code><span class="hljs-title">opts</span> = {
    ...
    series: [{
            ...
            <span class="hljs-class"><span class="hljs-keyword">data</span>: [15, 20, 45, 37, 4, 80]</span>
        }, {
            ...
            <span class="hljs-class"><span class="hljs-keyword">data</span>: [70, 40, 65, 100, 34, 18]</span>
        }
    ]
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVGslg?w=570&amp;h=346" src="https://static.alili.tech/img/bVGslg?w=570&amp;h=346" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="opts = {
    ...
    series: [{
            ...
            data: [0.15, 0.2, 0.45, 0.37, 0.4, 0.8]
        }, {
            ...
            data: [0.30, 0.37, 0.65, 0.78, 0.69, 0.94]
        }
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haskell"><code><span class="hljs-title">opts</span> = {
    ...
    series: [{
            ...
            <span class="hljs-class"><span class="hljs-keyword">data</span>: [0.15, 0.2, 0.45, 0.37, 0.4, 0.8]</span>
        }, {
            ...
            <span class="hljs-class"><span class="hljs-keyword">data</span>: [0.30, 0.37, 0.65, 0.78, 0.69, 0.94]</span>
        }
    ]
}</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVGsla?w=570&amp;h=346" src="https://static.alili.tech/img/bVGsla?w=570&amp;h=346" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>效果还不错，我们接着往下</p>
<h1 id="articleHeader2">根据真实数据绘制折线</h1>
<p>问题的关键在于确定每个数据点的<code>(x, y)</code>坐标，<code>x</code>坐标比较好确定，我们根据画布的宽度以及<code>opts.categories</code>即可确定。</p>
<p>规定我们的配置为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="config = {
    xAxisHeight: 30, // X轴高度
    yAxisWdith: 30   // Y轴宽度
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>config = {
<span class="hljs-symbol">    xAxisHeight:</span> <span class="hljs-number">30</span>, <span class="hljs-comment">// X轴高度</span>
<span class="hljs-symbol">    yAxisWdith:</span> <span class="hljs-number">30</span>   <span class="hljs-comment">// Y轴宽度</span>
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data = [15, 20, 45, 37, 4, 80];
var xPoints = [];
var validWidth = opts.width - config.yAxisWidth;
var eachSpace = validWidth / opts.categories.length;
var start = config.yAxisWidth;

data.forEach(function (item, index) {
    xPoints.push(start + (index + 0.5) * eachSpace);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> data = [<span class="hljs-number">15</span>, <span class="hljs-number">20</span>, <span class="hljs-number">45</span>, <span class="hljs-number">37</span>, <span class="hljs-number">4</span>, <span class="hljs-number">80</span>];
<span class="hljs-keyword">var</span> xPoints = [];
<span class="hljs-keyword">var</span> validWidth = opts.width - config.yAxisWidth;
<span class="hljs-keyword">var</span> eachSpace = validWidth / opts.categories.length;
<span class="hljs-keyword">var</span> start = config.yAxisWidth;

data.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">item, index</span>) </span>{
    xPoints.push(start + (index + <span class="hljs-number">0.5</span>) * eachSpace);
});</code></pre>
<p><code>y</code>坐标稍微会复杂一点，需要根据Y轴的范围已经本身的数值进行计算得出。</p>
<p><span class="img-wrap"><img data-src="/img/bVGshi?w=782&amp;h=512" src="https://static.alili.tech/img/bVGshi?w=782&amp;h=512" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>所以我们计算出的<code>y</code>应该为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="y = validHeight * (data - min) / (max - min);
// 由于canvas画布是左上角为原点坐标，故我们变化一下
// 得到最终的y绘制点
y = valideHeight - y;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code>y = validHeight * (<span class="hljs-built_in">data</span> - <span class="hljs-keyword">min</span>) / (<span class="hljs-keyword">max</span> - <span class="hljs-keyword">min</span>);
<span class="hljs-comment">// 由于canvas画布是左上角为原点坐标，故我们变化一下</span>
<span class="hljs-comment">// 得到最终的y绘制点</span>
y = valideHeight - y;</code></pre>
<p>代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var data = [15, 20, 45, 37, 4, 80];
var yPoints = [];
var validHeight = opts.height - config.xAxisHeight;
data.forEach(function(item) {
    var y = validHeight * (item - min) / (max - min);
    y = validHeight - y;

    yPoints.push(y);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> data = [<span class="hljs-number">15</span>, <span class="hljs-number">20</span>, <span class="hljs-number">45</span>, <span class="hljs-number">37</span>, <span class="hljs-number">4</span>, <span class="hljs-number">80</span>];
<span class="hljs-keyword">var</span> yPoints = [];
<span class="hljs-keyword">var</span> validHeight = opts.height - config.xAxisHeight;
data.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>) </span>{
    <span class="hljs-keyword">var</span> y = validHeight * (item - min) / (max - min);
    y = validHeight - y;

    yPoints.push(y);
}</code></pre>
<p>现在我们已经确定了数据点在画布上的绘制坐标，关于如何绘制折现请查看 <a href="https://segmentfault.com/a/1190000007649376" target="_blank">part1</a> 中相关内容，此处不再累赘。</p>
<p>最终效果图如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVGr5J?w=570&amp;h=346" src="https://static.alili.tech/img/bVGr5J?w=570&amp;h=346" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>预告：下一部分我们一起讨论绘制过程中的一些技巧、动画效果和如何工程化我们的项目。</p>
<h1 id="articleHeader3">相关阅读</h1>
<blockquote><p><a href="https://segmentfault.com/a/1190000007649376">在微信小程序中绘制图表（part1）</a><br><a href="https://segmentfault.com/a/1190000007876976" target="_blank">在微信小程序中绘制图表（part3）</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在微信小程序中绘制图表（part2）

## 原文链接
[https://segmentfault.com/a/1190000007696536](https://segmentfault.com/a/1190000007696536)

