---
title: '腾讯AlloyTeam正式发布pasition - 制作酷炫Path过渡动画' 
date: 2019-01-11 2:30:08
hidden: true
slug: 2vv01ybi9o
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000009865685?w=164&amp;h=98" src="https://static.alili.tech/img/remote/1460000009865685?w=164&amp;h=98" alt="pv" title="pv" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000009865686?w=131&amp;h=107" src="https://static.alili.tech/img/remote/1460000009865686?w=131&amp;h=107" alt="pv" title="pv" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">pasition</h2>
<p>Pasition - Path Transition with little JS code, render to anywhere - 超小尺寸的Path过渡动画类库</p>
<ul>
<li><p><a href="https://github.com/AlloyTeam/pasition" rel="nofollow noreferrer" target="_blank">Github源代码</a></p></li>
<li><p><a href="https://alloyteam.github.io/pasition/" rel="nofollow noreferrer" target="_blank">在线演示</a></p></li>
</ul>
<p>最近和贝塞尔曲线杠上了，如<a href="https://github.com/AlloyTeam/curvejs" rel="nofollow noreferrer" target="_blank">curvejs</a> 和 <a href="https://github.com/AlloyTeam/pasition" rel="nofollow noreferrer" target="_blank">pasition</a> 都是贝塞尔曲线的应用案例，未来还有一款和贝塞尔曲线相关的开源的东西，暂时保密。</p>
<h2 id="articleHeader1">安装</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install pasition" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> pasition</code></pre>
<p>CDN地址下载下来使用:</p>
<p><a href="https://unpkg.com/pasition@1.0.0/dist/pasition.js" rel="nofollow noreferrer" target="_blank">https://unpkg.com/pasition@1.0.0/dist/pasition.js</a></p>
<h2 id="articleHeader2">使用指南</h2>
<h3 id="articleHeader3">pasition.lerp</h3>
<p>你可以通过 <code>pasition.lerp</code> 方法拿到插值中的shapes:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var shapes  = pasition.lerp(pathA, pathB, 0.5)
//拿到shapes之后你可以在任何你想要渲染的地方绘制，如canvas、svg、webgl等
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> shapes  = pasition.lerp(pathA, pathB, <span class="hljs-number">0.5</span>)
<span class="hljs-comment">//拿到shapes之后你可以在任何你想要渲染的地方绘制，如canvas、svg、webgl等</span>
...</code></pre>
<h3 id="articleHeader4">pasition.animate</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pasition.animate({
    from : fromPath,
    to : toPath,
    time : time,
    easing : function(){ },
    begin ：function(shapes){ },
    progress : function(shapes, percent){ },
    end : function(shapes){ }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">pasition.animate({
    <span class="hljs-attr">from</span> : fromPath,
    <span class="hljs-attr">to</span> : toPath,
    <span class="hljs-attr">time</span> : time,
    <span class="hljs-attr">easing</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ },
    begin ：<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">shapes</span>)</span>{ },
    <span class="hljs-attr">progress</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">shapes, percent</span>)</span>{ },
    <span class="hljs-attr">end</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">shapes</span>)</span>{ }
})</code></pre>
<p>path从哪里来？你可以从svg的path的d属性获取。</p>
<p>支持所有的SVG Path命令:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="M/m = moveto
L/l = lineto
H/h = horizontal lineto
V/v = vertical lineto
C/c = curveto
S/s = smooth curveto
A/a = elliptical Arc
Z/z = closepath
Q/q = quadratic Belzier curve
T/t = smooth quadratic Belzier curveto" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code>M/<span class="hljs-attr">m</span> = moveto
L/<span class="hljs-attr">l</span> = lineto
H/<span class="hljs-attr">h</span> = horizontal lineto
V/<span class="hljs-attr">v</span> = vertical lineto
C/<span class="hljs-attr">c</span> = curveto
S/<span class="hljs-attr">s</span> = smooth curveto
A/<span class="hljs-attr">a</span> = elliptical Arc
Z/<span class="hljs-attr">z</span> = closepath
Q/<span class="hljs-attr">q</span> = quadratic Belzier curve
T/<span class="hljs-attr">t</span> = smooth quadratic Belzier curveto</code></pre>
<p>举个例子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pasition.animate({
            from: 'M 40 40 Q 60 80 80 40T 120 40 T 160 40 z',
            to: 'M32,0C14.4,0,0,14.4,0,32s14.3,32,32,32 s32-14.3,32-32S49.7,0,32,0z',
            time: 1000,
            easing : function(){ },
            begin:function(shapes){ },
            progress : function(shapes, percent){
                //你可以在任何你想绘制的地方绘制,如canvas、svg、webgl
            },
            end : function(shapes){ }
        });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">pasition.animate({
            <span class="hljs-attr">from</span>: <span class="hljs-string">'M 40 40 Q 60 80 80 40T 120 40 T 160 40 z'</span>,
            <span class="hljs-attr">to</span>: <span class="hljs-string">'M32,0C14.4,0,0,14.4,0,32s14.3,32,32,32 s32-14.3,32-32S49.7,0,32,0z'</span>,
            <span class="hljs-attr">time</span>: <span class="hljs-number">1000</span>,
            <span class="hljs-attr">easing</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{ },
            <span class="hljs-attr">begin</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">shapes</span>)</span>{ },
            <span class="hljs-attr">progress</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">shapes, percent</span>)</span>{
                <span class="hljs-comment">//你可以在任何你想绘制的地方绘制,如canvas、svg、webgl</span>
            },
            <span class="hljs-attr">end</span> : <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">shapes</span>)</span>{ }
        });</code></pre>
<p>对上面传入的配置项目一一解释下:</p>
<ul>
<li><p>from 起始的路径</p></li>
<li><p>to 终点的路径</p></li>
<li><p>time 从from到to所需要的时间</p></li>
<li><p>easing 缓动函数(不填默认是匀速运动)</p></li>
<li><p>begin 开始运动的回调函数</p></li>
<li><p>progress 运动过程中的回调函数</p></li>
<li><p>end 运动结束的回调函数</p></li>
</ul>
<p>在progress里可以拿到path转变过程中的shapes和运动进度percent（范围是0-1）。下面来看看shapes的结构:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="[
    [
       [],    //curve
       [],    //curve
       []    //curve   
    ],      //shape      
    [[],[],[],[],[]],     //shape      
    [[],[],[],[],[]]     //shape    
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">[
    [
       [],    <span class="hljs-comment">//curve</span>
       [],    <span class="hljs-comment">//curve</span>
       []    <span class="hljs-comment">//curve   </span>
    ],      <span class="hljs-comment">//shape      </span>
    [[],[],[],[],[]],     <span class="hljs-comment">//shape      </span>
    [[],[],[],[],[]]     <span class="hljs-comment">//shape    </span>
]</code></pre>
<p>在开发者工具里截图:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009865687?w=411&amp;h=303" src="https://static.alili.tech/img/remote/1460000009865687?w=411&amp;h=303" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>每条curve都包含8个数字，分别代表三次贝塞尔曲线的 起点 控制点 控制点 终点。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009170891?w=330&amp;h=226" src="https://static.alili.tech/img/remote/1460000009170891?w=330&amp;h=226" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>每个shape都是闭合的，所以shape的基本规则是:</p>
<ul>
<li><p>每条curve的终点就是下一条curve的起点</p></li>
<li><p>最后一条curve的终点就是第一条curve的起点</p></li>
</ul>
<p>知道基本规则之后,我们可以进行渲染，这里拿canvas里渲染为例子:</p>
<p>Fill模式:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function renderShapes(context, curves, color){
    context.beginPath();
    context.fillStyle = color||'black';
    context.moveTo(curves[0][0], curves[0][1]);
    curves.forEach(function(points){
        context.bezierCurveTo(points[2], points[3], points[4], points[5], points[6], points[7]);
    })
    context.closePath();
    context.fill();
}

shapes.forEach(function(curves){
    renderShapes(context,curves,&quot;#006DF0&quot;)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">renderShapes</span>(<span class="hljs-params">context, curves, color</span>)</span>{
    context.beginPath();
    context.fillStyle = color||<span class="hljs-string">'black'</span>;
    context.moveTo(curves[<span class="hljs-number">0</span>][<span class="hljs-number">0</span>], curves[<span class="hljs-number">0</span>][<span class="hljs-number">1</span>]);
    curves.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">points</span>)</span>{
        context.bezierCurveTo(points[<span class="hljs-number">2</span>], points[<span class="hljs-number">3</span>], points[<span class="hljs-number">4</span>], points[<span class="hljs-number">5</span>], points[<span class="hljs-number">6</span>], points[<span class="hljs-number">7</span>]);
    })
    context.closePath();
    context.fill();
}

shapes.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">curves</span>)</span>{
    renderShapes(context,curves,<span class="hljs-string">"#006DF0"</span>)
})</code></pre>
<p>Stroke模式:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function renderCurve(context, points, color){
    context.beginPath();
    context.strokeStyle = color||'black';
    context.moveTo(points[0], points[1]);
    context.bezierCurveTo(points[2], points[3], points[4], points[5], points[6], points[7]);
    context.stroke();
}

shapes.forEach(function(curves){
    curves.forEach(function (curve) {
        renderCurve(context, curve, &quot;#006DF0&quot;)
    })    
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">renderCurve</span>(<span class="hljs-params">context, points, color</span>)</span>{
    context.beginPath();
    context.strokeStyle = color||<span class="hljs-string">'black'</span>;
    context.moveTo(points[<span class="hljs-number">0</span>], points[<span class="hljs-number">1</span>]);
    context.bezierCurveTo(points[<span class="hljs-number">2</span>], points[<span class="hljs-number">3</span>], points[<span class="hljs-number">4</span>], points[<span class="hljs-number">5</span>], points[<span class="hljs-number">6</span>], points[<span class="hljs-number">7</span>]);
    context.stroke();
}

shapes.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">curves</span>)</span>{
    curves.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">curve</span>) </span>{
        renderCurve(context, curve, <span class="hljs-string">"#006DF0"</span>)
    })    
})</code></pre>
<p>当然你也可以把shapes转成SVG的命令在SVG渲染，这应该不是什么困难的事情:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    function toSVGPath(shapes){
        //把 shapes数组转成 M....C........C........Z M....C.....C....C...Z 的字符串。
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">toSVGPath</span>(<span class="hljs-params">shapes</span>)</span>{
        <span class="hljs-comment">//把 shapes数组转成 M....C........C........Z M....C.....C....C...Z 的字符串。</span>
    }</code></pre>
<p>这个函数可以自行尝试一下，生成出的字符串赋值给SVG的Path的d就可以了。</p>
<h2 id="articleHeader5">Github</h2>
<p><a href="https://github.com/AlloyTeam/pasition" rel="nofollow noreferrer" target="_blank">https://github.com/AlloyTeam/pasition</a></p>
<h2 id="articleHeader6">License</h2>
<p>This content is released under the <a href="http://opensource.org/licenses/MIT" rel="nofollow noreferrer" target="_blank">MIT</a> License.</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
腾讯AlloyTeam正式发布pasition - 制作酷炫Path过渡动画

## 原文链接
[https://segmentfault.com/a/1190000009865680](https://segmentfault.com/a/1190000009865680)

