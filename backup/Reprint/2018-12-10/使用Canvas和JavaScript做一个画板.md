---
title: '使用Canvas和JavaScript做一个画板' 
date: 2018-12-10 2:30:07
hidden: true
slug: dbkme8jhful
categories: [reprint]
---

{{< raw >}}

                    
<p><em>本文同步于个人博客：<a href="https://zhoushuo.me/blog/2018/03/11/drawing-borad/" rel="nofollow noreferrer" target="_blank">https://zhoushuo.me/blog/2018/03/11/drawing-borad/</a></em></p>
<p>前些天学习了<code>HTML5</code>的<code>&lt;canvas&gt;</code>元素，今天就来实践一下，用<code>canvas</code>做一个画板。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013747684?w=1913&amp;h=896" src="https://static.alili.tech/img/remote/1460000013747684?w=1913&amp;h=896" alt="alt" title="alt" style="cursor: pointer; display: inline;"></span></p>
<p>首先说一下要实现的功能：</p>
<ul>
<li>切换画笔颜色</li>
<li>调整笔刷粗细</li>
<li>清空画布</li>
<li>橡皮擦擦除</li>
<li>撤销操作</li>
<li>保存成图片</li>
<li>兼容移动端（支持触摸）</li>
</ul>
<p>好了，废话少说，先看最终效果：<a href="https://zhoushuozh.github.io/drawingborad" rel="nofollow noreferrer" target="_blank">https://zhoushuozh.github.io/drawingborad</a></p>
<h3 id="articleHeader0">准备工作</h3>
<p>首先，准备个容器,也就是画板了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<canvas id=&quot;drawing-board&quot;></canvas>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="HTML" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"drawing-board"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span></code></pre>
<p>然后初始化js：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let canvas = document.getElementById(&quot;drawing-board&quot;);
let ctx = canvas.getContext(&quot;2d&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"drawing-board"</span>);
<span class="hljs-keyword">let</span> ctx = canvas.getContext(<span class="hljs-string">"2d"</span>);</code></pre>
<p>我想把画板做成全屏的，所以接下来设置一下<code>canvas</code>的宽高。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let pageWidth = document.documentElement.clientWidth;
let pageHeight = document.documentElement.clientHeight;

canvas.width = pageWidth;
canvas.height = pageHeight;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> pageWidth = <span class="hljs-built_in">document</span>.documentElement.clientWidth;
<span class="hljs-keyword">let</span> pageHeight = <span class="hljs-built_in">document</span>.documentElement.clientHeight;

canvas.width = pageWidth;
canvas.height = pageHeight;</code></pre>
<p>由于部分IE不支持<code>canvas</code>，如果要兼容IE，我们可以创建一个<code>canvas</code>，然后使用<code>excanvas</code>初始化，针对IE加上<a href="http://code.google.com/p/explorercanvas/" rel="nofollow noreferrer" target="_blank">exCanvas.js</a>，这里我们暂时先不考虑IE。</p>
<h3 id="articleHeader1">实现一个简单的画板</h3>
<p>实现思路：监听鼠标事件，用<code>drawCircle()</code>方法把记录的数据画出来。</p>
<ol>
<li>设置初始化当前画布功能为画笔状态，<code>painting = false</code>，</li>
<li>当鼠标按下时（<code>mousedown</code>），把<code>painting</code>设为<code>true</code>，表示正在画，鼠标没松开。把鼠标点记录下来。</li>
<li>当按下鼠标的时候，鼠标移动（<code>mousemove</code>）就把点记录下来并画出来。</li>
<li>如果鼠标移动过快，浏览器跟不上绘画速度，点与点之间会产品间隙，所以我们需要将画出的点用线连起来（<code>lineTo()</code>）。</li>
<li>鼠标松开的时候（<code>mouseup</code>），把<code>painting</code>设为<code>false</code>。</li>
</ol>
<p>代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let painting = false;
let lastPoint = {x: undefined, y: undefined};

//鼠标按下事件
canvas.onmousedown = function (e) {
    painting = true;
    let x = e.clientX;
    let y = e.clientY;
    lastPoint = {&quot;x&quot;: x, &quot;y&quot;: y};
    drawCircle(x, y, 5);
};

//鼠标移动事件
canvas.onmousemove = function (e) {
    if (painting) {
        let x = e.clientX;
        let y = e.clientY;
        let newPoint = {&quot;x&quot;: x, &quot;y&quot;: y};
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y,clear);
        lastPoint = newPoint;
    }
};

//鼠标松开事件
canvas.onmouseup = function () {
    painting = false;
}

// 画点函数
function drawCircle(x, y, radius) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
}

// 划线函数
function drawLine(x1, y1, x2, y2) {
    ctx.lineWidth = 3;
    ctx.lineCap = &quot;round&quot;;
    ctx.lineJoin = &quot;round&quot;;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> painting = <span class="hljs-literal">false</span>;
<span class="hljs-keyword">let</span> lastPoint = {<span class="hljs-attr">x</span>: <span class="hljs-literal">undefined</span>, <span class="hljs-attr">y</span>: <span class="hljs-literal">undefined</span>};

<span class="hljs-comment">//鼠标按下事件</span>
canvas.onmousedown = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
    painting = <span class="hljs-literal">true</span>;
    <span class="hljs-keyword">let</span> x = e.clientX;
    <span class="hljs-keyword">let</span> y = e.clientY;
    lastPoint = {<span class="hljs-string">"x"</span>: x, <span class="hljs-string">"y"</span>: y};
    drawCircle(x, y, <span class="hljs-number">5</span>);
};

<span class="hljs-comment">//鼠标移动事件</span>
canvas.onmousemove = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
    <span class="hljs-keyword">if</span> (painting) {
        <span class="hljs-keyword">let</span> x = e.clientX;
        <span class="hljs-keyword">let</span> y = e.clientY;
        <span class="hljs-keyword">let</span> newPoint = {<span class="hljs-string">"x"</span>: x, <span class="hljs-string">"y"</span>: y};
        drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y,clear);
        lastPoint = newPoint;
    }
};

<span class="hljs-comment">//鼠标松开事件</span>
canvas.onmouseup = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    painting = <span class="hljs-literal">false</span>;
}

<span class="hljs-comment">// 画点函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawCircle</span>(<span class="hljs-params">x, y, radius</span>) </span>{
    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, radius, <span class="hljs-number">0</span>, <span class="hljs-built_in">Math</span>.PI * <span class="hljs-number">2</span>);
    ctx.fill();
}

<span class="hljs-comment">// 划线函数</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawLine</span>(<span class="hljs-params">x1, y1, x2, y2</span>) </span>{
    ctx.lineWidth = <span class="hljs-number">3</span>;
    ctx.lineCap = <span class="hljs-string">"round"</span>;
    ctx.lineJoin = <span class="hljs-string">"round"</span>;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
    ctx.closePath();
}</code></pre>
<h3 id="articleHeader2">橡皮擦功能</h3>
<p>实现思路</p>
<ol>
<li>获取橡皮擦元素</li>
<li>设置橡皮擦初始状态，<code>clear = false</code>。</li>
<li>监听橡皮擦<code>click</code>事件，点击橡皮擦，改变橡皮擦状态，<code>clear = true</code>。</li>
<li>
<code>clear</code>为<code>true</code>时，移动鼠标使用<code>canvas</code>剪裁（<code>clip()</code>）擦除画布。</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let eraser = document.getElementById(&quot;eraser&quot;);
let clear = false;

eraser.onclick = function () {
    clear = true;
};

...
if (clear) {
    ctx.save();
    ctx.globalCompositeOperation = &quot;destination-out&quot;;
    ctx.stroke();
    ctx.closePath();
    ctx.clip();
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.restore();
}
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> eraser = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"eraser"</span>);
<span class="hljs-keyword">let</span> clear = <span class="hljs-literal">false</span>;

eraser.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    clear = <span class="hljs-literal">true</span>;
};

...
if (clear) {
    ctx.save();
    ctx.globalCompositeOperation = <span class="hljs-string">"destination-out"</span>;
    ctx.stroke();
    ctx.closePath();
    ctx.clip();
    ctx.clearRect(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,canvas.width,canvas.height);
    ctx.restore();
}
...</code></pre>
<p>注意，在<code>canvas</code>中的裁剪和平时的裁剪功能不一样在这里，裁剪是指在裁剪区域去显示我们所画的图</p>
<h3 id="articleHeader3">兼容移动端</h3>
<p>实现思路：</p>
<ol>
<li>判断设备是否支持触摸</li>
<li>
<code>true</code>，则使用<code>touch</code>事件；<code>false</code>，则使用<code>mouse</code>事件</li>
</ol>
<p>代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="...
if (document.body.ontouchstart !== undefined) {
    // 使用touch事件
    anvas.ontouchstart = function (e) {
        // 开始触摸
    }
    canvas.ontouchmove = function (e) {
        // 开始滑动
    }
    canvas.ontouchend = function () {
        // 滑动结束
    }
}else{
    // 使用mouse事件
    ...
}
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">...
if (<span class="hljs-built_in">document</span>.body.ontouchstart !== <span class="hljs-literal">undefined</span>) {
    <span class="hljs-comment">// 使用touch事件</span>
    anvas.ontouchstart = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
        <span class="hljs-comment">// 开始触摸</span>
    }
    canvas.ontouchmove = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
        <span class="hljs-comment">// 开始滑动</span>
    }
    canvas.ontouchend = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// 滑动结束</span>
    }
}<span class="hljs-keyword">else</span>{
    <span class="hljs-comment">// 使用mouse事件</span>
    ...
}
...</code></pre>
<p>这里需要注意的一点是，在<code>touch</code>事件里，是通过<code>.touches[0].clientX</code>和<code>.touches[0].clientY</code>来获取坐标的，这点要和<code>mouse</code>事件区别开。</p>
<h3 id="articleHeader4">切换画笔颜色</h3>
<p>实现思路：</p>
<ol>
<li>获取颜色元素节点。</li>
<li>点击颜色返回其颜色值，并赋给画布的<code>ctx.strokeStyle</code>。</li>
</ol>
<p>代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let aColorBtn = document.getElementsByClassName(&quot;color-item&quot;);

for (let i = 0; i < aColorBtn.length; i++) {
    aColorBtn[i].onclick = function () {
    for (let i = 0; i < aColorBtn.length; i++) {
        activeColor = this.style.backgroundColor;
        ctx.strokeStyle = activeColor;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> aColorBtn = <span class="hljs-built_in">document</span>.getElementsByClassName(<span class="hljs-string">"color-item"</span>);

<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; aColorBtn.length; i++) {
    aColorBtn[i].onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; aColorBtn.length; i++) {
        activeColor = <span class="hljs-keyword">this</span>.style.backgroundColor;
        ctx.strokeStyle = activeColor;
    }
}</code></pre>
<h3 id="articleHeader5">清空画布</h3>
<p>实现思路：</p>
<ol>
<li>获取元素节点。</li>
<li>点击清空按钮清空canvas画布。</li>
</ol>
<p>代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let reSetCanvas = document.getElementById(&quot;clear&quot;);

reSetCanvas.onclick = function () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code class="JavsScript"><span class="hljs-keyword">let</span> reSetCanvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"clear"</span>);

reSetCanvas.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    ctx.clearRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, canvas.width, canvas.height);
};</code></pre>
<h3 id="articleHeader6">调整笔刷粗细</h3>
<p>实现思路：</p>
<ol>
<li>创建input[type=range]</li>
<li>滑动range获取其value值，并赋给<code>ctx.lineWidth</code>
</li>
</ol>
<p>代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let range = document.getElementById(&quot;range&quot;);

range.onchange = function(){
    lWidth = this.value;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> range = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"range"</span>);

range.onchange = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    lWidth = <span class="hljs-keyword">this</span>.value;
};</code></pre>
<h3 id="articleHeader7">保存成图片</h3>
<p>实现思路：</p>
<ol>
<li>获取canvas.toDateURL</li>
<li>在页面里创建并插入一个a标签</li>
<li>a标签href等于canvas.toDateURL，并添加download属性</li>
<li>点击保存按钮，a标签触发click事件</li>
</ol>
<p>代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let save = document.getElementById(&quot;save&quot;);

save.onclick = function () {
    let imgUrl = canvas.toDataURL(&quot;image/png&quot;);
    let saveA = document.createElement(&quot;a&quot;);
    document.body.appendChild(saveA);
    saveA.href = imgUrl;
    saveA.download = &quot;zspic&quot; + (new Date).getTime();
    saveA.target = &quot;_blank&quot;;
    saveA.click();
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">let</span> save = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"save"</span>);

save.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> imgUrl = canvas.toDataURL(<span class="hljs-string">"image/png"</span>);
    <span class="hljs-keyword">let</span> saveA = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">"a"</span>);
    <span class="hljs-built_in">document</span>.body.appendChild(saveA);
    saveA.href = imgUrl;
    saveA.download = <span class="hljs-string">"zspic"</span> + (<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>).getTime();
    saveA.target = <span class="hljs-string">"_blank"</span>;
    saveA.click();
};</code></pre>
<h3 id="articleHeader8">撤销</h3>
<p>实现思路：</p>
<ol>
<li>准备一个数组记录历史操作</li>
<li>每次使用画笔前将当前绘图表面储存进数组</li>
<li>点击撤销时，恢复到上一步的绘图表面</li>
</ol>
<p>代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="canvas.ontouchstart = function (e) {
     // 在这里储存绘图表面
    this.firstDot = ctx.getImageData(0, 0, canvas.width, canvas.height);
    saveData(this.firstDot);
    ...
}

let undo = document.getElementById(&quot;undo&quot;);
let historyDeta = [];

function saveData (data) {
    (historyDeta.length === 10) &amp;&amp; (historyDeta.shift()); // 上限为储存10步，太多了怕挂掉
    historyDeta.push(data);
}
undo.onclick = function(){
    if(historyDeta.length < 1) return false;
    ctx.putImageData(historyDeta[historyDeta.length - 1], 0, 0);
    historyDeta.pop()
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>canvas.ontouchstart = <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">e</span>) </span>{
     <span class="hljs-comment">// 在这里储存绘图表面</span>
    <span class="hljs-keyword">this</span>.firstDot = ctx.getImageData(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, canvas.width, canvas.height);
    saveData(<span class="hljs-keyword">this</span>.firstDot);
    ...
}

<span class="hljs-keyword">let</span> undo = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">"undo"</span>);
<span class="hljs-keyword">let</span> historyDeta = [];

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">saveData</span> (<span class="hljs-params">data</span>) </span>{
    (historyDeta.length === <span class="hljs-number">10</span>) &amp;&amp; (historyDeta.shift()); <span class="hljs-comment">// 上限为储存10步，太多了怕挂掉</span>
    historyDeta.push(data);
}
undo.onclick = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">if</span>(historyDeta.length &lt; <span class="hljs-number">1</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    ctx.putImageData(historyDeta[historyDeta.length - <span class="hljs-number">1</span>], <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
    historyDeta.pop()
};</code></pre>
<p>因为每次储存都是将一张图片存入内存，对性能影响较大，所以在这里设置了储存上限。</p>
<h3 id="articleHeader9">总结</h3>
<p>这里用的知识点主要有：监听<code>mouse</code>、<code>touch</code>事件，以及<code>canvas</code>的<code>moveTo()</code>、<code>lineTo()</code>、<code>stroke()</code>、<code>clip()</code>、<code>clearRect()</code>等方法。其实还有很多效果可以实现，比如说喷雾效果，蜡笔效果，艺术画效果等等。日后有时间我会继续对这个画板进行优化，增加一些新的功能，同时欢迎大家留言提问或者提出批评建议。</p>
<p>最终代码：<a href="https://github.com/zhoushuozh/drawingborad" rel="nofollow noreferrer" target="_blank">https://github.com/zhoushuozh/drawingborad</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用Canvas和JavaScript做一个画板

## 原文链接
[https://segmentfault.com/a/1190000013747671](https://segmentfault.com/a/1190000013747671)

