---
title: '在微信小程序中绘制图表（part3）' 
date: 2019-01-29 2:30:10
hidden: true
slug: uuv8oyd64b
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">本期大纲</h1>
<p>1、饼图绘制<br>2、如何添加动画效果<br>3、使用<code>rollup</code>构建项目</p>
<p>相关阅读：<br><a href="https://segmentfault.com/a/1190000007649376">在微信小程序中绘制图表（part1）</a><br><a href="https://segmentfault.com/a/1190000007696536" target="_blank">在微信小程序中绘制图表（part2）</a></p>
<blockquote><p><strong> 关注我的 <a href="https://github.com/xiaolin3303/wx-charts" rel="nofollow noreferrer" target="_blank">github</a> 项目 查看完整代码。 </strong></p></blockquote>
<p>很久没更新了，最近事情比较多，今天来把坑填上！</p>
<h1 id="articleHeader1">饼图绘制</h1>
<p>先看一下API</p>
<p><span class="img-wrap"><img data-src="/img/bVHfmz?w=1622&amp;h=842" src="https://static.alili.tech/img/bVHfmz?w=1622&amp;h=842" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>下面开始（使用ES6语法编写，后面我们可以使用<code>rollup</code>编译成ES5的语法）</p>
<p>假设我们有这样的数据</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const series = [
    {data: 15, color: '#7cb5ec'},
    {data: 35, color: '#f7a35c'},
    {data: 78, color: '#434348'},
    {data: 63, color: '#90ed7d'}
];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> series = [
    {<span class="hljs-attr">data</span>: <span class="hljs-number">15</span>, <span class="hljs-attr">color</span>: <span class="hljs-string">'#7cb5ec'</span>},
    {<span class="hljs-attr">data</span>: <span class="hljs-number">35</span>, <span class="hljs-attr">color</span>: <span class="hljs-string">'#f7a35c'</span>},
    {<span class="hljs-attr">data</span>: <span class="hljs-number">78</span>, <span class="hljs-attr">color</span>: <span class="hljs-string">'#434348'</span>},
    {<span class="hljs-attr">data</span>: <span class="hljs-number">63</span>, <span class="hljs-attr">color</span>: <span class="hljs-string">'#90ed7d'</span>}
];</code></pre>
<p>计算出各项所占的比例和开始的弧度</p>
<p>calPieData.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export function calPieAngle (series) {
    // 计算数据总和
    let count = 0;
    series.forEach((item) => {
        count += item.data;
    });

    // 计算出开始的弧度和所占比例
    let startAngle = 0;
    return series.map((item) => {
        item.proportion = item.data / count;
        item.startAngle = startAngle;
        startAngle += 2 * Math.PI * item.proportion;
        return item;
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">calPieAngle</span> (<span class="hljs-params">series</span>) </span>{
    <span class="hljs-comment">// 计算数据总和</span>
    <span class="hljs-keyword">let</span> count = <span class="hljs-number">0</span>;
    series.forEach(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> {
        count += item.data;
    });

    <span class="hljs-comment">// 计算出开始的弧度和所占比例</span>
    <span class="hljs-keyword">let</span> startAngle = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">return</span> series.map(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> {
        item.proportion = item.data / count;
        item.startAngle = startAngle;
        startAngle += <span class="hljs-number">2</span> * <span class="hljs-built_in">Math</span>.PI * item.proportion;
        <span class="hljs-keyword">return</span> item;
    });
}</code></pre>
<p>数据已经计算出来了，下面让我开始绘制吧</p>
<p>drawPieChart.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { calPieAngle } from 'calPieData'

export default function drawPieChart (series) {
    ...

    let pieSeries = calPieAngle(series);
    pieSeries.forEach((item) => {
        context.beginPath();
        // 设置填充颜色
        context.setFillStyle(item.color);
        // 移动到原点
        context.moveTo(100, 100);    
        // 绘制弧度
        context.arc(100, 100, 80, item.startAngle, item.startAngle + 2 * Math.PI * item.proportion);
        context.closePath();
        context.fill();
    });

    ...

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> { calPieAngle } <span class="hljs-keyword">from</span> <span class="hljs-string">'calPieData'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawPieChart</span> (<span class="hljs-params">series</span>) </span>{
    ...

    let pieSeries = calPieAngle(series);
    pieSeries.forEach(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> {
        context.beginPath();
        <span class="hljs-comment">// 设置填充颜色</span>
        context.setFillStyle(item.color);
        <span class="hljs-comment">// 移动到原点</span>
        context.moveTo(<span class="hljs-number">100</span>, <span class="hljs-number">100</span>);    
        <span class="hljs-comment">// 绘制弧度</span>
        context.arc(<span class="hljs-number">100</span>, <span class="hljs-number">100</span>, <span class="hljs-number">80</span>, item.startAngle, item.startAngle + <span class="hljs-number">2</span> * <span class="hljs-built_in">Math</span>.PI * item.proportion);
        context.closePath();
        context.fill();
    });

    ...

}</code></pre>
<p>调用<code>drawPieChart(series)</code>就可以得到下面的结果：</p>
<p><span class="img-wrap"><img data-src="/img/bVHdbw?w=362&amp;h=342" src="https://static.alili.tech/img/bVHdbw?w=362&amp;h=342" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>很简单是不是，下面我们给各区块加上一个白色的分割线<br>因为<code>arc</code>实际上是绘制了一条路径，所以我们简单的<code>stroke</code>描边一下就可以了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
...

context.setLineWidth(2);
context.setStrokeStyle('#ffffff');
pieSeries.forEach((item) => {
    context.beginPath();
    context.setFillStyle(item.color);
    context.moveTo(100, 100);    
    context.arc(100, 100, 80, item.startAngle, item.startAngle + 2 * Math.PI * item.proportion);
    context.closePath();
    context.fill();
    context.stroke();
})

...
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
...

context.setLineWidth(<span class="hljs-number">2</span>);
context.setStrokeStyle(<span class="hljs-string">'#ffffff'</span>);
pieSeries.forEach(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> {
    context.beginPath();
    context.setFillStyle(item.color);
    context.moveTo(<span class="hljs-number">100</span>, <span class="hljs-number">100</span>);    
    context.arc(<span class="hljs-number">100</span>, <span class="hljs-number">100</span>, <span class="hljs-number">80</span>, item.startAngle, item.startAngle + <span class="hljs-number">2</span> * <span class="hljs-built_in">Math</span>.PI * item.proportion);
    context.closePath();
    context.fill();
    context.stroke();
})

...
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVHdbf?w=370&amp;h=356" src="https://static.alili.tech/img/bVHdbf?w=370&amp;h=356" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader2">添加动画效果</h1>
<p>首先让我们创建一个动画工具，这个动画工具能够传入一些自定义的参数，比如动画时间，能够有动画每一步的回调以及动画结束的回调</p>
<p>animation.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default function Animation (opts) {
    // 处理用户传入的动画时间，默认为1000ms
    // 因为用户有可能传入duration为0，所以不能用opts.duration = opts.duration || 1000 来做默认值处理
    // 否则用户传入0也会处理成默认值1000
    opts.duration = typeof opts.duration === 'undefined' ? 1000 : opts.duration;
    
    let startTimeStamp = null;

    function step (timestamp) {
        if (startTimeStamp === null) {
            startTimeStamp = timestamp;
        } 
        if (timestamp - startTimeStamp < opts.duration) {
            // 计算出动画的进度
            let process = (timestamp - startTimeStamp) / opts.duration;
            // 触发动画每一步的回调，传入进度process
            opts.onProcess &amp;&amp; opts.onProcess(process);
            // 动画进行中，执行下一次动画
            requestAnimationFrame(step);
        } else {
            // 动画结束
            opts.onProcess &amp;&amp; opts.onProcess(1);
            // 触发动画结束回调
            opts.onAnimationFinish &amp;&amp; opts.onAnimationFinish();
        }
    }

    requestAnimationFrame(step);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Animation</span> (<span class="hljs-params">opts</span>) </span>{
    <span class="hljs-comment">// 处理用户传入的动画时间，默认为1000ms</span>
    <span class="hljs-comment">// 因为用户有可能传入duration为0，所以不能用opts.duration = opts.duration || 1000 来做默认值处理</span>
    <span class="hljs-comment">// 否则用户传入0也会处理成默认值1000</span>
    opts.duration = <span class="hljs-keyword">typeof</span> opts.duration === <span class="hljs-string">'undefined'</span> ? <span class="hljs-number">1000</span> : opts.duration;
    
    <span class="hljs-keyword">let</span> startTimeStamp = <span class="hljs-literal">null</span>;

    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">step</span> (<span class="hljs-params">timestamp</span>) </span>{
        <span class="hljs-keyword">if</span> (startTimeStamp === <span class="hljs-literal">null</span>) {
            startTimeStamp = timestamp;
        } 
        <span class="hljs-keyword">if</span> (timestamp - startTimeStamp &lt; opts.duration) {
            <span class="hljs-comment">// 计算出动画的进度</span>
            <span class="hljs-keyword">let</span> process = (timestamp - startTimeStamp) / opts.duration;
            <span class="hljs-comment">// 触发动画每一步的回调，传入进度process</span>
            opts.onProcess &amp;&amp; opts.onProcess(process);
            <span class="hljs-comment">// 动画进行中，执行下一次动画</span>
            requestAnimationFrame(step);
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">// 动画结束</span>
            opts.onProcess &amp;&amp; opts.onProcess(<span class="hljs-number">1</span>);
            <span class="hljs-comment">// 触发动画结束回调</span>
            opts.onAnimationFinish &amp;&amp; opts.onAnimationFinish();
        }
    }

    requestAnimationFrame(step);
}</code></pre>
<p>动画使用了<code>requestAnimationFrame</code>，并且已经满足了我们上面定义的需求<br>在实战中，此处的动画都是<code>线性</code>的，一般我们还会加入<code>缓动</code>选项，比如<code>缓入</code>，<code>缓出</code>，还有一点，在微信小程序真机中IOS设备是不支持<code>requestAnimationFrame</code>的，所以要做降级处理，使用<code>setTimeout</code>，<a href="https://github.com/xiaolin3303/wx-charts/blob/master/src/components/animation.js" rel="nofollow noreferrer" target="_blank">查看完整的代码</a></p>
<p>下面我们调用animation来完成动画效果</p>
<p>app.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Animation from 'animation'
import drawPieChart from 'drawPieChart'

Animation({
    duration: 1000,
    onProcess: (process) => {
        drawPieDataChart(series, process);
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> Animation <span class="hljs-keyword">from</span> <span class="hljs-string">'animation'</span>
<span class="hljs-keyword">import</span> drawPieChart <span class="hljs-keyword">from</span> <span class="hljs-string">'drawPieChart'</span>

Animation({
    <span class="hljs-attr">duration</span>: <span class="hljs-number">1000</span>,
    <span class="hljs-attr">onProcess</span>: <span class="hljs-function">(<span class="hljs-params">process</span>) =&gt;</span> {
        drawPieDataChart(series, process);
    }
});</code></pre>
<p>修改一下<code>drawPieDataChart</code> function，能够接受<code>process</code>参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
...

export default function drawPieChart (series, process = 1) {
    ...
    // 将process传入给calPieAngle，计算出对应进度下的图表角度数据
    let pieSeries = calPieAngle(series, process);

...
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
...

export <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawPieChart</span> (<span class="hljs-params">series, process = <span class="hljs-number">1</span></span>) </span>{
    ...
    <span class="hljs-comment">// 将process传入给calPieAngle，计算出对应进度下的图表角度数据</span>
    <span class="hljs-keyword">let</span> pieSeries = calPieAngle(series, process);

...
</code></pre>
<p>同样，修改一下<code>calPieAngle</code> function，能够接受<code>process</code>参数</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
export function calPieAngle (series, process = 1) {
    ...

    // 计算出开始的弧度和所占比例
    let startAngle = 0;
    return series.map((item) => {
        // 计算出当前动画进度的比例
        item.proportion = item.data / count * process;
        item.startAngle = startAngle;
        startAngle += 2 * Math.PI * item.proportion;
        return item;
    });
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">calPieAngle</span> (<span class="hljs-params">series, process = <span class="hljs-number">1</span></span>) </span>{
    ...

    <span class="hljs-comment">// 计算出开始的弧度和所占比例</span>
    <span class="hljs-keyword">let</span> startAngle = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">return</span> series.map(<span class="hljs-function">(<span class="hljs-params">item</span>) =&gt;</span> {
        <span class="hljs-comment">// 计算出当前动画进度的比例</span>
        item.proportion = item.data / count * process;
        item.startAngle = startAngle;
        startAngle += <span class="hljs-number">2</span> * <span class="hljs-built_in">Math</span>.PI * item.proportion;
        <span class="hljs-keyword">return</span> item;
    });
}
</code></pre>
<p>好了，现在我们的动画就可以动起来了，类似这样</p>
<p><span class="img-wrap"><img data-src="/img/bVHdbN?w=286&amp;h=218" src="https://static.alili.tech/img/bVHdbN?w=286&amp;h=218" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h1 id="articleHeader3">使用<code>rollup</code>构建项目</h1>
<blockquote><p>Rollup is a next-generation JavaScript module bundler. Author your app or library using ES2015 modules, then efficiently bundle them up into a single file for use in browsers and Node.js.</p></blockquote>
<p>也就是说<a href="http://rollupjs.org" rel="nofollow noreferrer" target="_blank">rollup</a>是一个前端构建工具，能够将我们的整个项目合并输出成一个最终的编译结果，上面我们编写代码的时候都是按照不同的功能放到不同的文件中，这样有利于后期的可持续性开发和维护，rollup正好能帮助我们构建出最后的编译结果</p>
<p>先安装<code>rollup</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g rollup" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> -g <span class="hljs-keyword">rollup</span></code></pre>
<p>添加对ES6的支持</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev rollup-plugin-babel
npm install --save-dev babel-preset-es2015-rollup" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code>npm install --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> rollup-plugin-babel
npm install --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span> babel-preset-es2015-rollup</code></pre>
<p>创建<code>.babelrc</code>文件在项目根目录，告诉<code>babel</code>转义时使用哪个<code>presets</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [&quot;es2015-rollup&quot;],
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"presets"</span>: [<span class="hljs-string">"es2015-rollup"</span>],
}</code></pre>
<p>好了剩下最后一步，定义我们的<code>rollup.config.js</code>配置文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import babel from 'rollup-plugin-babel';

export default {
  // 入口文件
  entry: 'app.js',
  // 输出格式，这里使用commonJS
  format: 'cjs',
  // 输出文件
  dest: 'dist/charts.js',
  // 使用babel进行ES6转ES5
  plugins: [
      babel({
          exclude: 'node_modules/**',
      })
  ]
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-keyword">import</span> babel <span class="hljs-keyword">from</span> <span class="hljs-string">'rollup-plugin-babel'</span>;

export <span class="hljs-keyword">default</span> {
  <span class="hljs-comment">// 入口文件</span>
  entry: <span class="hljs-string">'app.js'</span>,
  <span class="hljs-comment">// 输出格式，这里使用commonJS</span>
  format: <span class="hljs-string">'cjs'</span>,
  <span class="hljs-comment">// 输出文件</span>
  dest: <span class="hljs-string">'dist/charts.js'</span>,
  <span class="hljs-comment">// 使用babel进行ES6转ES5</span>
  plugins: [
      babel({
          <span class="hljs-keyword">exclude</span>: <span class="hljs-string">'node_modules/**'</span>,
      })
  ]
};</code></pre>
<p>rollup会从入口文件开始，查找我们的依赖（<code>import</code>），逐级往下深入，把依赖的文件全部收集起来并合并到一起，最后输出到我们定义的<code>dest</code>文件中</p>
<p>执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="rollup -c" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">rollup -c</span></code></pre>
<p>好了，我们就得到了我们最后的项目编译文件<code>charts.js</code></p>
<h1 id="articleHeader4">下期预告</h1>
<p>下一期中我一起讨论下有技术含量的内容，关于图表中文案显示的<code>检测碰撞</code>问题，大概效果会是这样的，红框部分文案发生了碰撞，这里完成了避让，能够正常显示</p>
<p><span class="img-wrap"><img data-src="/img/bVHdiu?w=500&amp;h=441" src="https://static.alili.tech/img/bVHdiu?w=500&amp;h=441" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
在微信小程序中绘制图表（part3）

## 原文链接
[https://segmentfault.com/a/1190000007876976](https://segmentfault.com/a/1190000007876976)

