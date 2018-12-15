---
title: '前端系列——canvas实现按住鼠标移动绘制出轨迹' 
date: 2018-12-15 2:30:11
hidden: true
slug: okvqf48xoyc
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">概要</h3>
<p>工作以来，写过vue、react、正则、算法、小程序等知识，唯独没有写过canvas，因为实在不会啊！</p>
<p>2018年，给自己设定一个小目标：学会canvas，达到的效果是能用canvas实现一些css3不容易实现的动画。</p>
<p>本文作为学习canvas的第一篇收获，很多人初学canvas做的第一个demo是实现一个“钟”，当然，我也实现了一个，不过不讲这个，而是讲讲一个更有趣、也更简单的玩意。</p>
<h3 id="articleHeader1">鼠标按住绘制轨迹</h3>
<h4>需求</h4>
<p><strong>在一块canvas画布上，初始状态画布什么都没有，现在，我想给画布加一点鼠标事件，用鼠标在画布上写字。具体的效果是鼠标移动到画布上任意一点，然后按住鼠标，移动鼠标的位置，就可以开始写字啦！</strong></p>
<p><span class="img-wrap"><img data-src="/img/bV25SS?w=162&amp;h=85" src="https://static.alili.tech/img/bV25SS?w=162&amp;h=85" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h4>原理</h4>
<p><strong>先简单分析下思路，首先我们需要一个canvas画布，然后计算鼠标在画布上的位置，给鼠标绑定onmousedown事件和onmousemove事件，在移动过程中绘制出路径，松开鼠标的时候，绘制结束。</strong></p>
<p>这个思路虽然很简单，但是里面有些地方需要小技巧实现。</p>
<p><strong>1、需要一个html文件，包含canvas元素。</strong></p>
<p>这是一个宽度800，高度400的画布。为什么没有写px呢？哦，暂时没搞懂，canvas文档推荐的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!doctype html>
<html class=&quot;no-js&quot; lang=&quot;zh&quot;>
    <head>
        <meta charset=&quot;utf-8&quot;>
        <meta http-equiv=&quot;x-ua-compatible&quot; content=&quot;ie=edge&quot;>
        <title>canvas学习</title>
        <meta name=&quot;description&quot; content=&quot;&quot;>
        <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1&quot;>

        <link rel=&quot;manifest&quot; href=&quot;site.webmanifest&quot;>
        <link rel=&quot;apple-touch-icon&quot; href=&quot;icon.png&quot;>
        <link rel=&quot;stylesheet&quot; href=&quot;css/main.css&quot;>
    </head>
    <body>
        <canvas id=&quot;theCanvas&quot; width=&quot;800&quot; height=&quot;400&quot;></canvas>
        <script src=&quot;js/main.js&quot;></script>
    </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!doctype html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">class</span>=<span class="hljs-string">"no-js"</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"zh"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"x-ua-compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>canvas学习<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"description"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">""</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1"</span>&gt;</span>

        <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"manifest"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"site.webmanifest"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"apple-touch-icon"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"icon.png"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"css/main.css"</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"theCanvas"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"800"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"400"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/main.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><strong>2、判断当前环境是否支持canvas。</strong></p>
<p>在main.js中，我们写一个自执行函数，下面是兼容性判断的代码片段，“代码主体”中将会是实现需求的核心。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function() {
    let theCanvas = document.querySelector('#theCanvas')
    if (!theCanvas || !theCanvas.getContext) {
        //不兼容canvas
        return false
    } else {
        //代码主体
    }
})()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> theCanvas = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#theCanvas'</span>)
    <span class="hljs-keyword">if</span> (!theCanvas || !theCanvas.getContext) {
        <span class="hljs-comment">//不兼容canvas</span>
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-comment">//代码主体</span>
    }
})()</code></pre>
<p><strong>3、获取2d对象。</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="   let context = theCanvas.getContext('2d')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript" style="word-break: break-word; white-space: initial;">   <span class="hljs-keyword">let</span> context = theCanvas.getContext(<span class="hljs-string">'2d'</span>)</code></pre>
<p><strong>4、获取当前鼠标相对于canvas的坐标。</strong></p>
<p>为什么要获取这个坐标呢？因为鼠标默认是获取当前窗口的相对坐标，而canvas可以位于页面上的任何位置，所以需要通过计算才能得到真实的鼠标坐标。</p>
<p>将获取鼠标相对于canvas的真实坐标封装成了一个函数，如果你觉得抽象，可以在草稿纸上画图来理解为什么要这么运算。</p>
<p>通常情况下，可以是x - rect.left和y - rect.top。但为什么实际上却是x - rect.left * (canvas.width/rect.width)呢？</p>
<p>canvas.width/rect.width表示判断canvas中存在的缩放行为，求出缩放的倍数。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const windowToCanvas = (canvas, x, y) => {
    //获取canvas元素距离窗口的一些属性，MDN上有解释
    let rect = canvas.getBoundingClientRect()
    //x和y参数分别传入的是鼠标距离窗口的坐标，然后减去canvas距离窗口左边和顶部的距离。
    return {
        x: x - rect.left * (canvas.width/rect.width),
        y: y - rect.top * (canvas.height/rect.height)
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">const</span> windowToCanvas = <span class="hljs-function">(<span class="hljs-params">canvas, x, y</span>) =&gt;</span> {
    <span class="hljs-comment">//获取canvas元素距离窗口的一些属性，MDN上有解释</span>
    <span class="hljs-keyword">let</span> rect = canvas.getBoundingClientRect()
    <span class="hljs-comment">//x和y参数分别传入的是鼠标距离窗口的坐标，然后减去canvas距离窗口左边和顶部的距离。</span>
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">x</span>: x - rect.left * (canvas.width/rect.width),
        <span class="hljs-attr">y</span>: y - rect.top * (canvas.height/rect.height)
    }
}</code></pre>
<p><strong>5、有了第4步的利器函数，我们可以给canvas加上鼠标事件了！</strong></p>
<p>先给鼠标绑定按下onmousedown事件，用moveTo绘制坐标起点。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="theCanvas.onmousedown = function(e) {
    //获得鼠标按下的点相对canvas的坐标。
    let ele = windowToCanvas(theCanvas, e.clientX, e.clientY)
    //es6的解构赋值
    let { x, y } = ele
    //绘制起点。
    context.moveTo(x, y)
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">theCanvas.onmousedown = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
    <span class="hljs-comment">//获得鼠标按下的点相对canvas的坐标。</span>
    <span class="hljs-keyword">let</span> ele = windowToCanvas(theCanvas, e.clientX, e.clientY)
    <span class="hljs-comment">//es6的解构赋值</span>
    <span class="hljs-keyword">let</span> { x, y } = ele
    <span class="hljs-comment">//绘制起点。</span>
    context.moveTo(x, y)
}</code></pre>
<p><strong>6、移动鼠标的时候，没有鼠标长按事件，又该怎么监听呢？</strong></p>
<p>这里用到的小技巧是在onmousedown内部再执行一个onmousemove（鼠标移动）事件，这样就能监听按住鼠标并且移动了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="theCanvas.onmousedown = function(e) {
    //获得鼠标按下的点相对canvas的坐标。
    let ele = windowToCanvas(theCanvas, e.clientX, e.clientY)
    //es6的解构赋值
    let { x, y } = ele
    //绘制起点。
    context.moveTo(x, y)
    //鼠标移动事件
    theCanvas.onmousemove = (e) => {
        //移动时获取新的坐标位置，用lineTo记录当前的坐标，然后stroke绘制上一个点到当前点的路径
        let ele = windowToCanvas(theCanvas, e.clientX, e.clientY)
        let { x, y } = ele
        context.lineTo(x, y)
        context.stroke()
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript">theCanvas.onmousedown = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
    <span class="hljs-comment">//获得鼠标按下的点相对canvas的坐标。</span>
    <span class="hljs-keyword">let</span> ele = windowToCanvas(theCanvas, e.clientX, e.clientY)
    <span class="hljs-comment">//es6的解构赋值</span>
    <span class="hljs-keyword">let</span> { x, y } = ele
    <span class="hljs-comment">//绘制起点。</span>
    context.moveTo(x, y)
    <span class="hljs-comment">//鼠标移动事件</span>
    theCanvas.onmousemove = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
        <span class="hljs-comment">//移动时获取新的坐标位置，用lineTo记录当前的坐标，然后stroke绘制上一个点到当前点的路径</span>
        <span class="hljs-keyword">let</span> ele = windowToCanvas(theCanvas, e.clientX, e.clientY)
        <span class="hljs-keyword">let</span> { x, y } = ele
        context.lineTo(x, y)
        context.stroke()
    }
}</code></pre>
<p><strong>7、鼠标松开的时候，不再绘制路径。</strong></p>
<p>有什么办法可以让onmouseup事件中阻止掉上面监听的2种事件呢？方法挺多的，设置onmousedown和onmousemove为null算是一种，我这里用到了“开关”。isAllowDrawLine设置为bool值，来控制函数是否执行，具体代码可以看下面完整的源码。</p>
<h3 id="articleHeader2">源码</h3>
<p>分为3个文件，index.html、main.js、utils.js，这里用到了es6的语法，我是使用parcle配置好了开发环境，所以不会有报错，如果你直接复制代码，运行的时候出现错误，在无法升级浏览器的情况下，可以将es6语法改成es5.</p>
<p><strong>1、index.html</strong><br>上面已经展示了，不再复述。</p>
<p><strong>2、main.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import { windowToCanvas } from './utils'
(function() {
    let theCanvas = document.querySelector('#theCanvas')
    if (!theCanvas || !theCanvas.getContext) {
        return false
    } else {
        let context = theCanvas.getContext('2d')
        let isAllowDrawLine = false
        theCanvas.onmousedown = function(e) {
            isAllowDrawLine = true
            let ele = windowToCanvas(theCanvas, e.clientX, e.clientY)
            let { x, y } = ele
            context.moveTo(x, y)
            theCanvas.onmousemove = (e) => {
                if (isAllowDrawLine) {
                    let ele = windowToCanvas(theCanvas, e.clientX, e.clientY)
                    let { x, y } = ele
                    context.lineTo(x, y)
                    context.stroke()
                }
            }
        }
        theCanvas.onmouseup = function() {
            isAllowDrawLine = false
        }
    }
})()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-keyword">import</span> { windowToCanvas } <span class="hljs-keyword">from</span> <span class="hljs-string">'./utils'</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">let</span> theCanvas = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#theCanvas'</span>)
    <span class="hljs-keyword">if</span> (!theCanvas || !theCanvas.getContext) {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">let</span> context = theCanvas.getContext(<span class="hljs-string">'2d'</span>)
        <span class="hljs-keyword">let</span> isAllowDrawLine = <span class="hljs-literal">false</span>
        theCanvas.onmousedown = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
            isAllowDrawLine = <span class="hljs-literal">true</span>
            <span class="hljs-keyword">let</span> ele = windowToCanvas(theCanvas, e.clientX, e.clientY)
            <span class="hljs-keyword">let</span> { x, y } = ele
            context.moveTo(x, y)
            theCanvas.onmousemove = <span class="hljs-function">(<span class="hljs-params">e</span>) =&gt;</span> {
                <span class="hljs-keyword">if</span> (isAllowDrawLine) {
                    <span class="hljs-keyword">let</span> ele = windowToCanvas(theCanvas, e.clientX, e.clientY)
                    <span class="hljs-keyword">let</span> { x, y } = ele
                    context.lineTo(x, y)
                    context.stroke()
                }
            }
        }
        theCanvas.onmouseup = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
            isAllowDrawLine = <span class="hljs-literal">false</span>
        }
    }
})()</code></pre>
<p><strong>3、utils.js</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*
* 获取鼠标在canvas上的坐标
* */
const windowToCanvas = (canvas, x, y) => {
    let rect = canvas.getBoundingClientRect()
    return {
        x: x - rect.left * (canvas.width/rect.width),
        y: y - rect.top * (canvas.height/rect.height)
    }
}

export {
    windowToCanvas
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javaScript"><span class="hljs-comment">/*
* 获取鼠标在canvas上的坐标
* */</span>
<span class="hljs-keyword">const</span> windowToCanvas = <span class="hljs-function">(<span class="hljs-params">canvas, x, y</span>) =&gt;</span> {
    <span class="hljs-keyword">let</span> rect = canvas.getBoundingClientRect()
    <span class="hljs-keyword">return</span> {
        <span class="hljs-attr">x</span>: x - rect.left * (canvas.width/rect.width),
        <span class="hljs-attr">y</span>: y - rect.top * (canvas.height/rect.height)
    }
}

<span class="hljs-keyword">export</span> {
    windowToCanvas
}</code></pre>
<h3 id="articleHeader3">总结</h3>
<p>这里有个误区，我用的是canvas对象绑定事件 theCanvas.onmouseup，其实canvas不能绑定事件，真正绑定的是document和window。但是由于浏览器会自动帮你判断并且移交事件处理，所以完全不用担心。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端系列——canvas实现按住鼠标移动绘制出轨迹

## 原文链接
[https://segmentfault.com/a/1190000013091631](https://segmentfault.com/a/1190000013091631)

