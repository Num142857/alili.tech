---
title: '在微信小程序中绘制图表（part1）' 
date: 2019-01-30 2:30:23
hidden: true
slug: 027no4mqznte
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">微信小程序中图表现状</h1>
<p>由于微信小程序本身框架的限制，很难集成目前已有的图表工具，显示图表目前有两种方案：<br>1、服务器端渲染图表，输出图片，微信小程序中直接显示渲染好的图片，比如highcharts提供了服务端渲染的能力<a href="http://www.highcharts.com/docs/export-module/render-charts-serverside" rel="nofollow noreferrer" target="_blank">hightcharts server render</a>，这种方式需要后台有一套渲染服务，并且有一定的网络开销。<br>2、微信小程序API中提供了canvas的支持，利用canvas自行绘制图表。</p>
<p>下面我们来看下怎么在微信小程序中绘制图表。</p>
<blockquote><p><strong>关注我的 <a href="https://github.com/xiaolin3303/wx-charts" rel="nofollow noreferrer" target="_blank">github项目</a> 查看完整代码。</strong></p></blockquote>
<h1 id="articleHeader1">API</h1>
<p>查看微信小程序详细 <a href="https://mp.weixin.qq.com/debug/wxadoc/dev/component/canvas.html" rel="nofollow noreferrer" target="_blank">Canvas API</a> 文档</p>
<p>在模板文件中使用<code>&lt;canvas&gt;&lt;/canvas&gt;</code>声明一个canvas组件</p>
<p>使用<code>wx.createContext</code>获取绘图上下文 context</p>
<p>调用wx.drawCanvas进行绘制</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="wx.drawCanvas({
    canvasId: 'firstCanvas',
    actions: context.getActions() // 获取绘图动作数组
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">wx.drawCanvas({
    <span class="hljs-attr">canvasId</span>: <span class="hljs-string">'firstCanvas'</span>,
    <span class="hljs-attr">actions</span>: context.getActions() <span class="hljs-comment">// 获取绘图动作数组</span>
});</code></pre>
<h1 id="articleHeader2">开始图表的绘制</h1>
<h3 id="articleHeader3">绘制折线图</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 获取绘图上下文 context
var context = wx.createContext();
// 设置描边颜色
context.setStrokeStyle(&quot;#7cb5ec&quot;);
// 设置线宽
context.setLineWidth(4);

context.moveTo(50, 70);
context.lineTo(150, 150);
context.lineTo(250, 30);
context.lineTo(350, 120);
context.lineTo(450, 150);
context.lineTo(550, 95);
// 对当前路径进行描边
context.stroke();
wx.drawCanvas({
    canvasId: 'testCanvas',
    actions: context.getActions()
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 获取绘图上下文 context</span>
<span class="hljs-keyword">var</span> context = wx.createContext();
<span class="hljs-comment">// 设置描边颜色</span>
context.setStrokeStyle(<span class="hljs-string">"#7cb5ec"</span>);
<span class="hljs-comment">// 设置线宽</span>
context.setLineWidth(<span class="hljs-number">4</span>);

context.moveTo(<span class="hljs-number">50</span>, <span class="hljs-number">70</span>);
context.lineTo(<span class="hljs-number">150</span>, <span class="hljs-number">150</span>);
context.lineTo(<span class="hljs-number">250</span>, <span class="hljs-number">30</span>);
context.lineTo(<span class="hljs-number">350</span>, <span class="hljs-number">120</span>);
context.lineTo(<span class="hljs-number">450</span>, <span class="hljs-number">150</span>);
context.lineTo(<span class="hljs-number">550</span>, <span class="hljs-number">95</span>);
<span class="hljs-comment">// 对当前路径进行描边</span>
context.stroke();
wx.drawCanvas({
    <span class="hljs-attr">canvasId</span>: <span class="hljs-string">'testCanvas'</span>,
    <span class="hljs-attr">actions</span>: context.getActions()
});</code></pre>
<p>说明：<code>moveTo</code>方法不记录到路径中</p>
<p>效果图：</p>
<p><span class="img-wrap"><img data-src="/img/bVGfDa?w=550&amp;h=194" src="https://static.alili.tech/img/bVGfDa?w=550&amp;h=194" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>好像没有想象中难，看上去效果还不错</p>
<h3 id="articleHeader4">绘制每个数据点的标识图案</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...

context.beginPath();
// 设置描边颜色
context.setStrokeStyle(&quot;#ffffff&quot;);
// 设置填充颜色
context.setFillStyle(&quot;#7cb5ec&quot;);
context.moveTo(50 + 7, 70);
// 绘制圆形区域
context.arc(50, 70, 8, 0, 2 * Math.PI, false);

context.moveTo(150 + 7, 150);
context.arc(150, 150, 8, 0, 2 * Math.PI, false);

...

context.closePath();
// 填充路径
context.fill();
context.stroke();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">...

context.beginPath();
<span class="hljs-comment">// 设置描边颜色</span>
context.setStrokeStyle(<span class="hljs-string">"#ffffff"</span>);
<span class="hljs-comment">// 设置填充颜色</span>
context.setFillStyle(<span class="hljs-string">"#7cb5ec"</span>);
context.moveTo(<span class="hljs-number">50</span> + <span class="hljs-number">7</span>, <span class="hljs-number">70</span>);
<span class="hljs-comment">// 绘制圆形区域</span>
context.arc(<span class="hljs-number">50</span>, <span class="hljs-number">70</span>, <span class="hljs-number">8</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2</span> * <span class="hljs-built_in">Math</span>.PI, <span class="hljs-literal">false</span>);

context.moveTo(<span class="hljs-number">150</span> + <span class="hljs-number">7</span>, <span class="hljs-number">150</span>);
context.arc(<span class="hljs-number">150</span>, <span class="hljs-number">150</span>, <span class="hljs-number">8</span>, <span class="hljs-number">0</span>, <span class="hljs-number">2</span> * <span class="hljs-built_in">Math</span>.PI, <span class="hljs-literal">false</span>);

...

context.closePath();
<span class="hljs-comment">// 填充路径</span>
context.fill();
context.stroke();</code></pre>
<p>效果图：</p>
<p><span class="img-wrap"><img data-src="/img/bVGfWf?w=522&amp;h=214" src="https://static.alili.tech/img/bVGfWf?w=522&amp;h=214" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>说明：避免之前绘制的折线路径影响到标识图案的路径，这里包裹在了<code>beginPath</code>和<code>closePath</code>中</p>
<h3 id="articleHeader5">绘制横坐标</h3>
<p>规定我们的参数格式是这样的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="opts = {
    width: 640,    // 画布区域宽度
    height: 400,   // 画布区域高度
    categories: ['2016-08', '2016-09', '2016-10', '2016-11', '2016-12', '2017']
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">opts = {
    <span class="hljs-attr">width</span>: <span class="hljs-number">640</span>,    <span class="hljs-comment">// 画布区域宽度</span>
    height: <span class="hljs-number">400</span>,   <span class="hljs-comment">// 画布区域高度</span>
    categories: [<span class="hljs-string">'2016-08'</span>, <span class="hljs-string">'2016-09'</span>, <span class="hljs-string">'2016-10'</span>, <span class="hljs-string">'2016-11'</span>, <span class="hljs-string">'2016-12'</span>, <span class="hljs-string">'2017'</span>]
}</code></pre>
<p>我们根据参数中的<code>categories</code>来绘制横坐标<br>稍微整理下思路：<br>1、根据<code>categories</code>数均分画布宽度<br>2、计算出横坐标中每个分类的起始点<br>3、绘制文案（这儿会多一些代码，后面会具体提到）</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var eachSpacing = Math.floor(opts.width / opts.categories.length);
var points = [];
// 起始点x坐标
var startX = 0;
// 起始点y坐标
var startY = opts.height - 30;
// 终点x坐标
var endX = opts.width;
// 终点y坐标
var endY = opts.height;

// 计算每个分类的起始点x坐标
opts.categories.forEach(function(item, index) {
    points.push(startX + index * eachSpacing);
});
points.push(endX);

// 绘制横坐标
context.beginPath();
context.setStrokeStyle(&quot;#cccccc&quot;);
context.setLineWidth(1);

// 绘制坐标轴横线
context.moveTo(startX, startY);
context.lineTo(endX, startY);
// 绘制坐标轴各区块竖线
points.forEach(function(item, index) {
    context.moveTo(item, startY);
    context.lineTo(item, endY);
});
context.closePath();
context.stroke();

context.beginPath();
// 设置字体大小
context.setFontSize(20);
// 设置字体填充颜色
context.setFillStyle('#666666');
opts.categories.forEach(function(item, index) {
    context.fillText(item, points[index], startY + 28);
});
context.closePath();
context.stroke();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> eachSpacing = <span class="hljs-built_in">Math</span>.floor(opts.width / opts.categories.length);
<span class="hljs-keyword">var</span> points = [];
<span class="hljs-comment">// 起始点x坐标</span>
<span class="hljs-keyword">var</span> startX = <span class="hljs-number">0</span>;
<span class="hljs-comment">// 起始点y坐标</span>
<span class="hljs-keyword">var</span> startY = opts.height - <span class="hljs-number">30</span>;
<span class="hljs-comment">// 终点x坐标</span>
<span class="hljs-keyword">var</span> endX = opts.width;
<span class="hljs-comment">// 终点y坐标</span>
<span class="hljs-keyword">var</span> endY = opts.height;

<span class="hljs-comment">// 计算每个分类的起始点x坐标</span>
opts.categories.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item, index</span>) </span>{
    points.push(startX + index * eachSpacing);
});
points.push(endX);

<span class="hljs-comment">// 绘制横坐标</span>
context.beginPath();
context.setStrokeStyle(<span class="hljs-string">"#cccccc"</span>);
context.setLineWidth(<span class="hljs-number">1</span>);

<span class="hljs-comment">// 绘制坐标轴横线</span>
context.moveTo(startX, startY);
context.lineTo(endX, startY);
<span class="hljs-comment">// 绘制坐标轴各区块竖线</span>
points.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item, index</span>) </span>{
    context.moveTo(item, startY);
    context.lineTo(item, endY);
});
context.closePath();
context.stroke();

context.beginPath();
<span class="hljs-comment">// 设置字体大小</span>
context.setFontSize(<span class="hljs-number">20</span>);
<span class="hljs-comment">// 设置字体填充颜色</span>
context.setFillStyle(<span class="hljs-string">'#666666'</span>);
opts.categories.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item, index</span>) </span>{
    context.fillText(item, points[index], startY + <span class="hljs-number">28</span>);
});
context.closePath();
context.stroke();</code></pre>
<p>效果图：</p>
<p><span class="img-wrap"><img data-src="/img/bVGfYR?w=590&amp;h=392" src="https://static.alili.tech/img/bVGfYR?w=590&amp;h=392" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>效果不错，除了文字没有居中.......</p>
<p>查看微信小程序官方提供的文档并没有提供<code>html5 canvas</code>中的<code>mesureText</code>(获取文案宽度)方法，下面我们自己简单的实现，并不是绝对精确，但是误差基本可以忽略</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function mesureText (text) {
    var text = text.split('');
    var width = 0;
    text.forEach(function(item) {
        if (/[a-zA-Z]/.test(item)) {
            width += 14;
        } else if (/[0-9]/.test(item)) {
            width += 11;
        } else if (/\./.test(item)) {
            width += 5.4;
        } else if (/-/.test(item)) {
            width += 6.5;
        } else if (/[\u4e00-\u9fa5]/.test(item)) {
            width += 20;
        }
    });
    return width;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">mesureText</span> (<span class="hljs-params">text</span>) </span>{
    <span class="hljs-keyword">var</span> text = text.split(<span class="hljs-string">''</span>);
    <span class="hljs-keyword">var</span> width = <span class="hljs-number">0</span>;
    text.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item</span>) </span>{
        <span class="hljs-keyword">if</span> (<span class="hljs-regexp">/[a-zA-Z]/</span>.test(item)) {
            width += <span class="hljs-number">14</span>;
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-regexp">/[0-9]/</span>.test(item)) {
            width += <span class="hljs-number">11</span>;
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-regexp">/\./</span>.test(item)) {
            width += <span class="hljs-number">5.4</span>;
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-regexp">/-/</span>.test(item)) {
            width += <span class="hljs-number">6.5</span>;
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-regexp">/[\u4e00-\u9fa5]/</span>.test(item)) {
            width += <span class="hljs-number">20</span>;
        }
    });
    <span class="hljs-keyword">return</span> width;
}</code></pre>
<p>这里分别处理了<code>字母</code>, <code>数字</code>, <code>.</code>, <code>-</code>, <code>汉字</code>这几个常用字符</p>
<p>上面的代码稍微修改下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="opts.categories.forEach(function(item, index) {
    var offset = eachSpacing / 2 - mesureText(item) / 2;
    context.fillText(item, points[index] + offset, startY + 28);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">opts.categories.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">item, index</span>) </span>{
    <span class="hljs-keyword">var</span> offset = eachSpacing / <span class="hljs-number">2</span> - mesureText(item) / <span class="hljs-number">2</span>;
    context.fillText(item, points[index] + offset, startY + <span class="hljs-number">28</span>);
});</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVGf0n?w=596&amp;h=370" src="https://static.alili.tech/img/bVGf0n?w=596&amp;h=370" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><strong> 大功告成！</strong></p>
<p>如何在折线上绘制出每个数据点的数值文案大家可以动手自己实现下</p>
<p>预告：下一部分我们一起讨论如何根据真实的数据绘制折线以及如果确定纵坐标的范围和纵坐标分区的问题。</p>
<h1 id="articleHeader6">相关阅读</h1>
<blockquote><p><a href="https://segmentfault.com/a/1190000007696536">在微信小程序中绘制图表（part2）</a><br><a href="https://segmentfault.com/a/1190000007876976" target="_blank">在微信小程序中绘制图表（part3）</a></p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在微信小程序中绘制图表（part1）

## 原文链接
[https://segmentfault.com/a/1190000007649376](https://segmentfault.com/a/1190000007649376)

