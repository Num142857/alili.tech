---
title: 'three.js 入门详解(二)' 
date: 2018-12-24 2:30:06
hidden: true
slug: t8p8w683km
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">9. 动画</h2>
<blockquote><p>在本章之前，所有画面都是静止的，本章将介绍如果使用Three.js进行动态画面的渲染。此外，将会介绍一个Three.js作者写的另外一个库，用来观测每秒帧数(<code>FPS</code>)。</p></blockquote>
<h3 id="articleHeader1">9.1 实现动画效果</h3>
<h4>9.1.1 动画原理</h4>
<ul>
<li>在这里，我们将动态画面简称为动画(<code>animation</code>)。正如动画片的原理一样，动画的本质是利用了人眼的视觉暂留特性，快速地变换画面，从而产生物体在运动的假象。而对于Three.js程序而言，动画的实现也是通过在<code>每秒钟多次重绘</code>画面实现的。</li>
<li>为了衡量画面切换速度，引入了每秒帧数<code>FPS(Frames Per Second)</code>的概念，是指<code>每秒画面重绘的次数</code>。FPS越<code>大</code>，则动画效果越<code>平滑</code>，当FPS小于<code>20</code>时，一般就能明显感受到画面的<code>卡滞</code>现象。</li>
<li>那么FPS是不是越大越好呢？其实也未必。当FPS足够大(<code>比如达到60</code>)，再增加帧数人眼也不会感受到明显的变化，反而相应地就要消耗更多资源(比如电影的胶片就需要更长了，或是电脑刷新画面需要消耗计算资源等等)。因此，选择一个适中的FPS即可。</li>
<li>NTSC标准的电视FPS是30，PAL标准的电视FPS是25，电影的FPS标准为24。而对于Three.js动画而言，一般FPS在<code>30</code>到<code>60</code>之间都是可取的。</li>
</ul>
<h4>9.1.2 setInterval方法</h4>
<blockquote><p>如果要设置特定的FPS(虽然严格来说，即使使用这种方法，JavaScript也不能保证帧数精确性)，可以使用JavaScript DOM定义的方法：</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="setInterval(fn,mesc)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">setInterval(fn,mesc)</code></pre>
<ul>
<li>其中，<code>fn</code>是每过<code>msec</code>毫秒执行的<code>函数</code>，如果将<code>fn</code>定义为重绘画面的函数，就能实现动画效果。<code>setInterval</code>函数返回一个变量<code>timer</code>，如果需要停止重绘，需要使用<code>clearInterval</code>方法，并传入该变量<code>timer</code>，具体的做法为：</li>
<li>1、首先，在<code>init</code>函数中定义每<code>20毫秒</code>执行<code>draw</code>函数的<code>setInterval</code>，返回值记录在全局变量<code>timer</code>中：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="timer = setInterval(draw,20);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">timer = setInterval(draw,<span class="hljs-number">20</span>);</code></pre>
<ul><li>2、在<code>draw</code>函数中，我们首先设定在每帧中的变化(毕竟，如果每帧都是相同的，即使重绘再多次，还是不会有动画的效果)，这里我们让场景中的长方体绕<code>y</code>轴转动。然后，执行渲染：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function draw() {
    // 每过20ms 就会执行一次这个函数，rotation.y就会加0.01
    // 转完360度就会进行取余，所以就会一直转下去
    mesh.rotation.y = (mesh.rotation.y + 0.01) % (Math.PI * 2);
    renderer.render(scene, camera);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">draw</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 每过20ms 就会执行一次这个函数，rotation.y就会加0.01</span>
    <span class="hljs-comment">// 转完360度就会进行取余，所以就会一直转下去</span>
    mesh.rotation.y = (mesh.rotation.y + <span class="hljs-number">0.01</span>) % (<span class="hljs-built_in">Math</span>.PI * <span class="hljs-number">2</span>);
    renderer.render(scene, camera);
}</code></pre>
<ul>
<li>这样，每<code>20</code>毫秒就会调用一次<code>draw</code>函数，改变长方体的旋转值，然后进行重绘。最终得到的效果就是<code>FPS</code>为<code>50</code>的旋转长方体。</li>
<li>3、我们在HTML中添加两个按钮，一个是按下后停止动画，另一个是按下后继续动画：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<button id=&quot;stopBtn&quot; onclick=&quot;stop()&quot;>Stop</button> 
<button id=&quot;startBtn&quot; onclick=&quot;start()&quot;>Start</button>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"stopBtn"</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"stop()"</span>&gt;</span>Stop<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span> 
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"startBtn"</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"start()"</span>&gt;</span>Start<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span></code></pre>
<ul><li>4、对应的<code>stop</code>和<code>start</code>函数为：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function stop() {
    if (timer !== null) {
        clearInterval(timer);
        timer = null;
    }
}

function start() {
    if (timer == null) {
        clearInterval(timer);
        timer = setInterval(draw, 20);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">stop</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (timer !== <span class="hljs-literal">null</span>) {
        clearInterval(timer);
        timer = <span class="hljs-literal">null</span>;
    }
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">start</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (timer == <span class="hljs-literal">null</span>) {
        clearInterval(timer);
        timer = setInterval(draw, <span class="hljs-number">20</span>);
    }
}</code></pre>
<ul><li>完整代码：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>动画效果</title>
    <script type=&quot;text/javascript&quot; src=&quot;js/three.js&quot;></script>

    <script type=&quot;text/javascript&quot;>
        var scene = null;
        var camera = null;
        var renderer = null;

        var mesh = null;
        var timer = null;

        function init() {
            renderer = new THREE.WebGLRenderer({
                canvas: document.getElementById('mainCanvas')
            });
            renderer.setClearColor(0x000000);
            scene = new THREE.Scene();

            camera = new THREE.OrthographicCamera(-5, 5, 3.75, -3.75, 0.1, 100);
            camera.position.set(5, 5, 20);
            camera.lookAt(new THREE.Vector3(0, 0, 0));
            scene.add(camera);

            mesh = new THREE.Mesh(new THREE.CubeGeometry(1, 2, 3),
                new THREE.MeshLambertMaterial({
                    color: 0xffff00
                }));
            scene.add(mesh);

            var light = new THREE.DirectionalLight(0xffffff);
            light.position.set(20, 10, 5);
            scene.add(light);

            timer = setInterval(draw, 20);
        }

        function draw() {
            mesh.rotation.y = (mesh.rotation.y + 0.01) % (Math.PI * 2);
            renderer.render(scene, camera);
        }

        function stop() {
            if (timer !== null) {
                clearInterval(timer);
                timer = null;
            }
        }

        function start() {
            if (timer == null) {
                clearInterval(timer);
                timer = setInterval(draw, 20);

            }
        }
    </script>
</head>

<body onload=&quot;init()&quot;>
    <canvas id=&quot;mainCanvas&quot; width=&quot;800px&quot; height=&quot;600px&quot;></canvas>
    <button id=&quot;stopBtn&quot; onclick=&quot;stop()&quot;>Stop</button>
    <button id=&quot;startBtn&quot; onclick=&quot;start()&quot;>Start</button>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>动画效果<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/three.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> scene = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">var</span> camera = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">var</span> renderer = <span class="hljs-literal">null</span>;

        <span class="hljs-keyword">var</span> mesh = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">var</span> timer = <span class="hljs-literal">null</span>;

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span>(<span class="hljs-params"></span>) </span>{
            renderer = <span class="hljs-keyword">new</span> THREE.WebGLRenderer({
                <span class="hljs-attr">canvas</span>: <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'mainCanvas'</span>)
            });
            renderer.setClearColor(<span class="hljs-number">0x000000</span>);
            scene = <span class="hljs-keyword">new</span> THREE.Scene();

            camera = <span class="hljs-keyword">new</span> THREE.OrthographicCamera(<span class="hljs-number">-5</span>, <span class="hljs-number">5</span>, <span class="hljs-number">3.75</span>, <span class="hljs-number">-3.75</span>, <span class="hljs-number">0.1</span>, <span class="hljs-number">100</span>);
            camera.position.set(<span class="hljs-number">5</span>, <span class="hljs-number">5</span>, <span class="hljs-number">20</span>);
            camera.lookAt(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>));
            scene.add(camera);

            mesh = <span class="hljs-keyword">new</span> THREE.Mesh(<span class="hljs-keyword">new</span> THREE.CubeGeometry(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>),
                <span class="hljs-keyword">new</span> THREE.MeshLambertMaterial({
                    <span class="hljs-attr">color</span>: <span class="hljs-number">0xffff00</span>
                }));
            scene.add(mesh);

            <span class="hljs-keyword">var</span> light = <span class="hljs-keyword">new</span> THREE.DirectionalLight(<span class="hljs-number">0xffffff</span>);
            light.position.set(<span class="hljs-number">20</span>, <span class="hljs-number">10</span>, <span class="hljs-number">5</span>);
            scene.add(light);

            timer = setInterval(draw, <span class="hljs-number">20</span>);
        }

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">draw</span>(<span class="hljs-params"></span>) </span>{
            mesh.rotation.y = (mesh.rotation.y + <span class="hljs-number">0.01</span>) % (<span class="hljs-built_in">Math</span>.PI * <span class="hljs-number">2</span>);
            renderer.render(scene, camera);
        }

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">stop</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">if</span> (timer !== <span class="hljs-literal">null</span>) {
                clearInterval(timer);
                timer = <span class="hljs-literal">null</span>;
            }
        }

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">start</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">if</span> (timer == <span class="hljs-literal">null</span>) {
                clearInterval(timer);
                timer = setInterval(draw, <span class="hljs-number">20</span>);

            }
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span> <span class="hljs-attr">onload</span>=<span class="hljs-string">"init()"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"mainCanvas"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"800px"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"600px"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"stopBtn"</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"stop()"</span>&gt;</span>Stop<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"startBtn"</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"start()"</span>&gt;</span>Start<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238932?w=503&amp;h=399" src="https://static.alili.tech/img/remote/1460000012238932?w=503&amp;h=399" alt="image" title="image" style="cursor: pointer;"></span></p>
<h4>9.1.3 requestAnimationFrame方法</h4>
<blockquote><p>大多数时候，我们并不在意多久重绘一次，这时候就适合用<code>requestAnimationFrame</code>方法了。它告诉浏览器在合适的时候调用指定函数，通常可能达到<code>60FPS</code>。</p></blockquote>
<ul><li>
<code>requestAnimationFrame</code>同样有对应的<code>cancelAnimationFrame</code>取消动画：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function stop() {
    if (timer !== null) {
        cancelAnimationFrame(timer);
        timer = null;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">stop</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (timer !== <span class="hljs-literal">null</span>) {
        cancelAnimationFrame(timer);
        timer = <span class="hljs-literal">null</span>;
    }
}</code></pre>
<ul><li>和<code>setInterval</code>不同的是，由于<code>requestAnimationFrame</code>只请求一帧画面，因此，除了在<code>init</code>函数中需要调用，在被其调用的函数中需要再次调用<code>requestAnimationFrame</code>：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function draw() {
    mesh.rotation.y = (mesh.rotation.y + 0.01) % (Math.PI * 2);
    renderer.render(scene, camera);
    timer = requestAnimationFrame(draw);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">draw</span>(<span class="hljs-params"></span>) </span>{
    mesh.rotation.y = (mesh.rotation.y + <span class="hljs-number">0.01</span>) % (<span class="hljs-built_in">Math</span>.PI * <span class="hljs-number">2</span>);
    renderer.render(scene, camera);
    timer = requestAnimationFrame(draw);
}</code></pre>
<ul><li>因为<code>requestAnimationFrame</code>较为“年轻”，因而一些老的浏览器使用的是试验期的名字：<code>mozRequestAnimationFrame</code>、<code>webkitRequestAnimationFrame</code>、<code>msRequestAnimationFrame</code>，为了支持这些浏览器，我们最好在调用之前，先判断是否定义了<code>requestAnimationFrame</code>以及上述函数：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var requestAnimationFrame = window.requestAnimationFrame 
        || window.mozRequestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.msRequestAnimationFrame;
window.requestAnimationFrame = requestAnimationFrame;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> requestAnimationFrame = <span class="hljs-built_in">window</span>.requestAnimationFrame 
        || <span class="hljs-built_in">window</span>.mozRequestAnimationFrame
        || <span class="hljs-built_in">window</span>.webkitRequestAnimationFrame
        || <span class="hljs-built_in">window</span>.msRequestAnimationFrame;
<span class="hljs-built_in">window</span>.requestAnimationFrame = requestAnimationFrame;</code></pre>
<ul><li>完整代码：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>动画效果</title>
    <script type=&quot;text/javascript&quot; src=&quot;js/three.js&quot;></script>

    <script type=&quot;text/javascript&quot;>
        var requestAnimationFrame = window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame;
        window.requestAnimationFrame = requestAnimationFrame;

        var scene = null;
        var camera = null;
        var renderer = null;

        var mesh = null;
        var timer = null;

        function init() {
            renderer = new THREE.WebGLRenderer({
                canvas: document.getElementById('mainCanvas')
            });
            renderer.setClearColor(0x000000);
            scene = new THREE.Scene();

            camera = new THREE.OrthographicCamera(-5, 5, 3.75, -3.75, 0.1, 100);
            camera.position.set(5, 5, 20);
            camera.lookAt(new THREE.Vector3(0, 0, 0));
            scene.add(camera);

            mesh = new THREE.Mesh(new THREE.CubeGeometry(1, 2, 3),
                new THREE.MeshLambertMaterial({
                    color: 0xffff00
                }));
            scene.add(mesh);

            var light = new THREE.DirectionalLight(0xffffff);
            light.position.set(20, 10, 5);
            scene.add(light);

            id = requestAnimationFrame(draw);
        }

        function draw() {
            mesh.rotation.y = (mesh.rotation.y + 0.01) % (Math.PI * 2);
            renderer.render(scene, camera);
            timer = requestAnimationFrame(draw);
        }

        function stop() {
            if (timer !== null) {
                cancelAnimationFrame(timer);
                timer = null;
            }
        }

        function start() {
            if (timer == null) {
                timer = requestAnimationFrame(draw);
            }
        }
    </script>
</head>

<body onload=&quot;init()&quot;>
    <canvas id=&quot;mainCanvas&quot; width=&quot;800px&quot; height=&quot;600px&quot;></canvas>
    <button id=&quot;stopBtn&quot; onclick=&quot;stop()&quot;>Stop</button>
    <button id=&quot;startBtn&quot; onclick=&quot;start()&quot;>Start</button>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>动画效果<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/three.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> requestAnimationFrame = <span class="hljs-built_in">window</span>.requestAnimationFrame ||
            <span class="hljs-built_in">window</span>.mozRequestAnimationFrame ||
            <span class="hljs-built_in">window</span>.webkitRequestAnimationFrame ||
            <span class="hljs-built_in">window</span>.msRequestAnimationFrame;
        <span class="hljs-built_in">window</span>.requestAnimationFrame = requestAnimationFrame;

        <span class="hljs-keyword">var</span> scene = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">var</span> camera = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">var</span> renderer = <span class="hljs-literal">null</span>;

        <span class="hljs-keyword">var</span> mesh = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">var</span> timer = <span class="hljs-literal">null</span>;

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span>(<span class="hljs-params"></span>) </span>{
            renderer = <span class="hljs-keyword">new</span> THREE.WebGLRenderer({
                <span class="hljs-attr">canvas</span>: <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'mainCanvas'</span>)
            });
            renderer.setClearColor(<span class="hljs-number">0x000000</span>);
            scene = <span class="hljs-keyword">new</span> THREE.Scene();

            camera = <span class="hljs-keyword">new</span> THREE.OrthographicCamera(<span class="hljs-number">-5</span>, <span class="hljs-number">5</span>, <span class="hljs-number">3.75</span>, <span class="hljs-number">-3.75</span>, <span class="hljs-number">0.1</span>, <span class="hljs-number">100</span>);
            camera.position.set(<span class="hljs-number">5</span>, <span class="hljs-number">5</span>, <span class="hljs-number">20</span>);
            camera.lookAt(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>));
            scene.add(camera);

            mesh = <span class="hljs-keyword">new</span> THREE.Mesh(<span class="hljs-keyword">new</span> THREE.CubeGeometry(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>),
                <span class="hljs-keyword">new</span> THREE.MeshLambertMaterial({
                    <span class="hljs-attr">color</span>: <span class="hljs-number">0xffff00</span>
                }));
            scene.add(mesh);

            <span class="hljs-keyword">var</span> light = <span class="hljs-keyword">new</span> THREE.DirectionalLight(<span class="hljs-number">0xffffff</span>);
            light.position.set(<span class="hljs-number">20</span>, <span class="hljs-number">10</span>, <span class="hljs-number">5</span>);
            scene.add(light);

            id = requestAnimationFrame(draw);
        }

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">draw</span>(<span class="hljs-params"></span>) </span>{
            mesh.rotation.y = (mesh.rotation.y + <span class="hljs-number">0.01</span>) % (<span class="hljs-built_in">Math</span>.PI * <span class="hljs-number">2</span>);
            renderer.render(scene, camera);
            timer = requestAnimationFrame(draw);
        }

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">stop</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">if</span> (timer !== <span class="hljs-literal">null</span>) {
                cancelAnimationFrame(timer);
                timer = <span class="hljs-literal">null</span>;
            }
        }

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">start</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">if</span> (timer == <span class="hljs-literal">null</span>) {
                timer = requestAnimationFrame(draw);
            }
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span> <span class="hljs-attr">onload</span>=<span class="hljs-string">"init()"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"mainCanvas"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"800px"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"600px"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"stopBtn"</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"stop()"</span>&gt;</span>Stop<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"startBtn"</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"start()"</span>&gt;</span>Start<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><strong>setInterval和requestAnimationFrame的区别：</strong></p>
<ul>
<li>
<code>setInterval</code>方法与<code>requestAnimationFrame</code>方法的区别较为微妙。一方面，最明显的差别表现在<code>setInterval</code>可以手动设定<code>FPS</code>，而<code>requestAnimationFrame</code>则会自动设定<code>FPS</code>；但另一方面，即使是<code>setInterval</code>也不能保证按照给定的FPS执行，在浏览器处理繁忙时，很可能低于设定值。当浏览器达不到设定的调用周期时，<code>requestAnimationFrame</code>采用跳过某些帧的方式来表现动画，虽然会有卡滞的效果但是整体速度不会拖慢，而<code>setInterval</code>会因此使整个程序放慢运行，但是每一帧都会绘制出来；</li>
<li>总而言之，<code>requestAnimationFrame</code>适用于对于<code>时间较为敏感</code>的环境（但是动画逻辑更加复杂），而<code>setInterval</code>则可在保证程序的运算不至于导致延迟的情况下提供更加简洁的逻辑（无需自行处理时间）。</li>
</ul>
<h3 id="articleHeader2">9.2 使用stat.js记录FPS</h3>
<blockquote><p><code>stat.js</code>是Three.js的作者<code>Mr.Doob</code>的另一个有用的JavaScript库。很多情况下，我们希望知道<code>实时的FPS</code>信息，从而更好地监测动画效果。这时候，stat.js就能提供一个很好的帮助，它占据屏幕中的一小块位置(如左上角)，效果为：<span class="img-wrap"><img data-src="/img/remote/1460000012238933?w=80&amp;h=48" src="https://static.alili.tech/img/remote/1460000012238933?w=80&amp;h=48" alt="image" title="image" style="cursor: pointer; display: inline;"></span>，单击后显示每帧渲染时间：<span class="img-wrap"><img data-src="/img/remote/1460000012238934?w=80&amp;h=48" src="https://static.alili.tech/img/remote/1460000012238934?w=80&amp;h=48" alt="image" title="image" style="cursor: pointer;"></span>。</p></blockquote>
<ul><li>首先，我们需要下载<code>stat.js</code>文件，可以在<a href="https://github.com/mrdoob/stats.js/blob/master/build/stats.min.js" rel="nofollow noreferrer" target="_blank">https://github.com/mrdoob/stats.js/blob/master/build/stats.min.js</a>找到。下载后，将其放在项目文件夹下，然后在HTML中引用：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot; src=&quot;stat.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"stat.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<ul><li>在页面初始化的时候，对其初始化并将其添加至屏幕一角。这里，我们以左上角为例：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var stat = null;

function init() {
    stat = new Stats();
    stat.domElement.style.position = 'absolute';
    stat.domElement.style.left = '0px';
    stat.domElement.style.top = '0px';
    document.body.appendChild(stat.domElement);

    // Three.js init ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> stat = <span class="hljs-literal">null</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span>(<span class="hljs-params"></span>) </span>{
    stat = <span class="hljs-keyword">new</span> Stats();
    stat.domElement.style.position = <span class="hljs-string">'absolute'</span>;
    stat.domElement.style.left = <span class="hljs-string">'0px'</span>;
    stat.domElement.style.top = <span class="hljs-string">'0px'</span>;
    <span class="hljs-built_in">document</span>.body.appendChild(stat.domElement);

    <span class="hljs-comment">// Three.js init ...</span>
}</code></pre>
<ul><li>然后，在上一节介绍的动画重绘函数<code>draw</code>中调用<code>stat.begin();</code>与<code>stat.end();</code>分别表示一帧的开始与结束：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function draw() {
    stat.begin();

    mesh.rotation.y = (mesh.rotation.y + 0.01) % (Math.PI * 2);
    renderer.render(scene, camera);

    stat.end();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">draw</span>(<span class="hljs-params"></span>) </span>{
    stat.begin();

    mesh.rotation.y = (mesh.rotation.y + <span class="hljs-number">0.01</span>) % (<span class="hljs-built_in">Math</span>.PI * <span class="hljs-number">2</span>);
    renderer.render(scene, camera);

    stat.end();
}</code></pre>
<ul><li>完整代码：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>stats</title>
    <script type=&quot;text/javascript&quot; src=&quot;js/three.js&quot;></script>
    <script type=&quot;text/javascript&quot; src=&quot;Stats.js&quot;></script>

    <script type=&quot;text/javascript&quot;>
        var requestAnimationFrame = window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame;
        window.requestAnimationFrame = requestAnimationFrame;

        var scene = null;
        var camera = null;
        var renderer = null;

        var mesh = null;
        var id = null;

        var stat = null;

        function init() {
            stat = new Stats();
            stat.domElement.style.position = 'absolute';
            stat.domElement.style.left = '0px';
            stat.domElement.style.top = '0px';
            document.body.appendChild(stat.domElement);

            renderer = new THREE.WebGLRenderer({
                canvas: document.getElementById('mainCanvas')
            });
            renderer.setClearColor(0x000000);
            scene = new THREE.Scene();

            camera = new THREE.OrthographicCamera(-5, 5, 3.75, -3.75, 0.1, 100);
            camera.position.set(5, 5, 20);
            camera.lookAt(new THREE.Vector3(0, 0, 0));
            scene.add(camera);

            mesh = new THREE.Mesh(new THREE.CubeGeometry(1, 2, 3),
                new THREE.MeshLambertMaterial({
                    color: 0xffff00
                }));
            scene.add(mesh);

            var light = new THREE.DirectionalLight(0xffffff);
            light.position.set(20, 10, 5);
            scene.add(light);

            timer = requestAnimationFrame(draw);
        }

        function draw() {
            stat.begin();

            mesh.rotation.y = (mesh.rotation.y + 0.01) % (Math.PI * 2);
            renderer.render(scene, camera);
            timer = requestAnimationFrame(draw);

            stat.end();
        }

        function stop() {
            if (timer !== null) {
                cancelAnimationFrame(timer);
                timer = null;
            }
        }
    </script>
</head>

<body onload=&quot;init()&quot;>
    <canvas id=&quot;mainCanvas&quot; width=&quot;800px&quot; height=&quot;600px&quot;></canvas>
    <button id=&quot;stopBtn&quot; onclick=&quot;stop()&quot;>Stop</button>

</body>

</html>
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>stats<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/three.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"Stats.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> requestAnimationFrame = <span class="hljs-built_in">window</span>.requestAnimationFrame ||
            <span class="hljs-built_in">window</span>.mozRequestAnimationFrame ||
            <span class="hljs-built_in">window</span>.webkitRequestAnimationFrame ||
            <span class="hljs-built_in">window</span>.msRequestAnimationFrame;
        <span class="hljs-built_in">window</span>.requestAnimationFrame = requestAnimationFrame;

        <span class="hljs-keyword">var</span> scene = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">var</span> camera = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">var</span> renderer = <span class="hljs-literal">null</span>;

        <span class="hljs-keyword">var</span> mesh = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">var</span> id = <span class="hljs-literal">null</span>;

        <span class="hljs-keyword">var</span> stat = <span class="hljs-literal">null</span>;

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span>(<span class="hljs-params"></span>) </span>{
            stat = <span class="hljs-keyword">new</span> Stats();
            stat.domElement.style.position = <span class="hljs-string">'absolute'</span>;
            stat.domElement.style.left = <span class="hljs-string">'0px'</span>;
            stat.domElement.style.top = <span class="hljs-string">'0px'</span>;
            <span class="hljs-built_in">document</span>.body.appendChild(stat.domElement);

            renderer = <span class="hljs-keyword">new</span> THREE.WebGLRenderer({
                <span class="hljs-attr">canvas</span>: <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'mainCanvas'</span>)
            });
            renderer.setClearColor(<span class="hljs-number">0x000000</span>);
            scene = <span class="hljs-keyword">new</span> THREE.Scene();

            camera = <span class="hljs-keyword">new</span> THREE.OrthographicCamera(<span class="hljs-number">-5</span>, <span class="hljs-number">5</span>, <span class="hljs-number">3.75</span>, <span class="hljs-number">-3.75</span>, <span class="hljs-number">0.1</span>, <span class="hljs-number">100</span>);
            camera.position.set(<span class="hljs-number">5</span>, <span class="hljs-number">5</span>, <span class="hljs-number">20</span>);
            camera.lookAt(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>));
            scene.add(camera);

            mesh = <span class="hljs-keyword">new</span> THREE.Mesh(<span class="hljs-keyword">new</span> THREE.CubeGeometry(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>),
                <span class="hljs-keyword">new</span> THREE.MeshLambertMaterial({
                    <span class="hljs-attr">color</span>: <span class="hljs-number">0xffff00</span>
                }));
            scene.add(mesh);

            <span class="hljs-keyword">var</span> light = <span class="hljs-keyword">new</span> THREE.DirectionalLight(<span class="hljs-number">0xffffff</span>);
            light.position.set(<span class="hljs-number">20</span>, <span class="hljs-number">10</span>, <span class="hljs-number">5</span>);
            scene.add(light);

            timer = requestAnimationFrame(draw);
        }

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">draw</span>(<span class="hljs-params"></span>) </span>{
            stat.begin();

            mesh.rotation.y = (mesh.rotation.y + <span class="hljs-number">0.01</span>) % (<span class="hljs-built_in">Math</span>.PI * <span class="hljs-number">2</span>);
            renderer.render(scene, camera);
            timer = requestAnimationFrame(draw);

            stat.end();
        }

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">stop</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-keyword">if</span> (timer !== <span class="hljs-literal">null</span>) {
                cancelAnimationFrame(timer);
                timer = <span class="hljs-literal">null</span>;
            }
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span> <span class="hljs-attr">onload</span>=<span class="hljs-string">"init()"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"mainCanvas"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"800px"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"600px"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"stopBtn"</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"stop()"</span>&gt;</span>Stop<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>
</code></pre>
<h3 id="articleHeader3">9.3 弹球案例</h3>
<blockquote><p>本节我们将使用一个弹球的例子来完整地学习使用动画效果。</p></blockquote>
<ul><li>1、首先，我们把通用的框架部分写好，按照之前的方法实现动画重绘函数，并加入stat.js库：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var requestAnimationFrame = window.requestAnimationFrame 
        || window.mozRequestAnimationFrame
        || window.webkitRequestAnimationFrame
        || window.msRequestAnimationFrame;
window.requestAnimationFrame = requestAnimationFrame;

var stat;
var renderer;
var scene;
var camera;
var light;

function init() {
    stat = new Stats();
    stat.domElement.style.position = 'absolute';
    stat.domElement.style.left= '0px';
    stat.domElement.style.top = '0px';
    document.body.appendChild(stat.domElement);

    renderer = new THREE.WebGLRenderer({
        canvas: document.getElementById('mainCanvas')
    });
    scene = new THREE.Scene();

    timer = requestAnimationFrame(draw);
}

function draw() {
    stat.begin();

    renderer.render(scene, camera);

    timer = requestAnimationFrame(draw);

    stat.end();
}

function stop() {
    if (timer !== null) {
        cancelAnimationFrame(timer);
        timer = null;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> requestAnimationFrame = <span class="hljs-built_in">window</span>.requestAnimationFrame 
        || <span class="hljs-built_in">window</span>.mozRequestAnimationFrame
        || <span class="hljs-built_in">window</span>.webkitRequestAnimationFrame
        || <span class="hljs-built_in">window</span>.msRequestAnimationFrame;
<span class="hljs-built_in">window</span>.requestAnimationFrame = requestAnimationFrame;

<span class="hljs-keyword">var</span> stat;
<span class="hljs-keyword">var</span> renderer;
<span class="hljs-keyword">var</span> scene;
<span class="hljs-keyword">var</span> camera;
<span class="hljs-keyword">var</span> light;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span>(<span class="hljs-params"></span>) </span>{
    stat = <span class="hljs-keyword">new</span> Stats();
    stat.domElement.style.position = <span class="hljs-string">'absolute'</span>;
    stat.domElement.style.left= <span class="hljs-string">'0px'</span>;
    stat.domElement.style.top = <span class="hljs-string">'0px'</span>;
    <span class="hljs-built_in">document</span>.body.appendChild(stat.domElement);

    renderer = <span class="hljs-keyword">new</span> THREE.WebGLRenderer({
        <span class="hljs-attr">canvas</span>: <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'mainCanvas'</span>)
    });
    scene = <span class="hljs-keyword">new</span> THREE.Scene();

    timer = requestAnimationFrame(draw);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">draw</span>(<span class="hljs-params"></span>) </span>{
    stat.begin();

    renderer.render(scene, camera);

    timer = requestAnimationFrame(draw);

    stat.end();
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">stop</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">if</span> (timer !== <span class="hljs-literal">null</span>) {
        cancelAnimationFrame(timer);
        timer = <span class="hljs-literal">null</span>;
    }
}</code></pre>
<ul><li>2、然后，为了实现弹球弹动的效果，我们创建一个<code>球体</code>作为弹球模型，创建一个<code>平面</code>作为弹球反弹的平面。为了在<code>draw</code>函数中改变弹球的位置，我们可以声明一个全局变量<code>ballMesh</code>，以及弹球半径<code>ballRadius</code>。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var ballMesh;
var ballRadius = 0.5;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> ballMesh;
<span class="hljs-keyword">var</span> ballRadius = <span class="hljs-number">0.5</span>;</code></pre>
<ul><li>3、在<code>init</code>函数中添加<code>球体</code>和<code>平面</code>，使弹球位于平面上，平面采用棋盘格图像作材质：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 加载贴图
texture = THREE.ImageUtils.loadTexture('images/chess.png', {}, function() {
    renderer.render(scene, camera);
});
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(4, 4);

// 平面模型
var plane = new THREE.Mesh(new THREE.PlaneGeometry(8, 8),
    new THREE.MeshLambertMaterial({
        map: texture
    }));
// 沿x轴旋转-90度
plane.rotation.x = Math.PI / -2;
scene.add(plane);

// 球模型
ballMesh = new THREE.Mesh(new THREE.SphereGeometry(ballRadius, 40, 16),
    new THREE.MeshLambertMaterial({
        color: 0xffff00
    }));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 加载贴图</span>
texture = THREE.ImageUtils.loadTexture(<span class="hljs-string">'images/chess.png'</span>, {}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    renderer.render(scene, camera);
});
texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(<span class="hljs-number">4</span>, <span class="hljs-number">4</span>);

<span class="hljs-comment">// 平面模型</span>
<span class="hljs-keyword">var</span> plane = <span class="hljs-keyword">new</span> THREE.Mesh(<span class="hljs-keyword">new</span> THREE.PlaneGeometry(<span class="hljs-number">8</span>, <span class="hljs-number">8</span>),
    <span class="hljs-keyword">new</span> THREE.MeshLambertMaterial({
        <span class="hljs-attr">map</span>: texture
    }));
<span class="hljs-comment">// 沿x轴旋转-90度</span>
plane.rotation.x = <span class="hljs-built_in">Math</span>.PI / <span class="hljs-number">-2</span>;
scene.add(plane);

<span class="hljs-comment">// 球模型</span>
ballMesh = <span class="hljs-keyword">new</span> THREE.Mesh(<span class="hljs-keyword">new</span> THREE.SphereGeometry(ballRadius, <span class="hljs-number">40</span>, <span class="hljs-number">16</span>),
    <span class="hljs-keyword">new</span> THREE.MeshLambertMaterial({
        <span class="hljs-attr">color</span>: <span class="hljs-number">0xffff00</span>
    }));</code></pre>
<ul><li>4、为了记录弹球的状态，我们至少需要<code>位置</code>、<code>速度</code>、<code>加速度</code>三个矢量，为了简单起见，这里弹球只做竖直方向上的自由落体运动，因此位置、速度、加速度只要各用一个变量表示。其中，位置就是<code>ballMesh.position.y</code>，不需要额外的变量，因此我们在全局声明<code>速度v</code>和<code>加速度a</code>：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var v = 0;
var a = -0.01;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> v = <span class="hljs-number">0</span>;
<span class="hljs-keyword">var</span> a = <span class="hljs-number">-0.01</span>;</code></pre>
<ul>
<li>这里，<code>a = -0.01</code>代表每帧小球向<code>y</code>方向<code>负方向</code>移动<code>0.01</code>个单位。</li>
<li>5、一开始，弹球从高度为<code>maxHeight</code>(自己定义的一个高度)处自由下落，掉落到平面上时会<code>反弹</code>，并且速度有<code>损耗</code>。当速度很小的时候，弹球会在平面上作振幅微小的抖动，所以，当速度足够小时，我们需要让弹球停止跳动。因此，定义一个全局变量表示是否在运动，初始值为<code>false</code>：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var isMoving = false;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> isMoving = <span class="hljs-literal">false</span>;</code></pre>
<ul><li>6、在HTML中定义一个按钮，点击按钮时，弹球从最高处下落：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<button id=&quot;dropBtn&quot; onclick=&quot;drop()&quot;>Drop</button>

<script>
    function drop() {
        isMoving = true;
        ballMesh.position.y = maxHeight;
        v = 0;
    }
</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"dropBtn"</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"drop()"</span>&gt;</span>Drop<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="actionscript">
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drop</span><span class="hljs-params">()</span> </span>{
        isMoving = <span class="hljs-literal">true</span>;
        ballMesh.position.y = maxHeight;
        v = <span class="hljs-number">0</span>;
    }
</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<ul><li>7、下面就是最关键的函数了，在draw函数中，需要判断当前的isMoving值，并且更新小球的速度和位置：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function draw() {
    stat.begin();
    if (isMoving) {
        ballMesh.position.y += v;
        // a= -0.01
        v += a;
        // 当小球从定义的高度落到小球停在平面时的高度的时候
        if (ballMesh.position.y <= ballRadius) {
            // 让小球弹起来
            v = -v * 0.9;
        }
        // 当小球的速度小于设定值的时候
        if (Math.abs(v) < 0.001) {
            // 让它停下来
            isMoving = false;
            ballMesh.position.y = ballRadius;
        }
    }
    renderer.render(scene, camera);
    requestAnimationFrame(draw);
    stat.end();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">draw</span>(<span class="hljs-params"></span>) </span>{
    stat.begin();
    <span class="hljs-keyword">if</span> (isMoving) {
        ballMesh.position.y += v;
        <span class="hljs-comment">// a= -0.01</span>
        v += a;
        <span class="hljs-comment">// 当小球从定义的高度落到小球停在平面时的高度的时候</span>
        <span class="hljs-keyword">if</span> (ballMesh.position.y &lt;= ballRadius) {
            <span class="hljs-comment">// 让小球弹起来</span>
            v = -v * <span class="hljs-number">0.9</span>;
        }
        <span class="hljs-comment">// 当小球的速度小于设定值的时候</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Math</span>.abs(v) &lt; <span class="hljs-number">0.001</span>) {
            <span class="hljs-comment">// 让它停下来</span>
            isMoving = <span class="hljs-literal">false</span>;
            ballMesh.position.y = ballRadius;
        }
    }
    renderer.render(scene, camera);
    requestAnimationFrame(draw);
    stat.end();
}</code></pre>
<ul><li><strong>完整代码：</strong></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>弹弹弹</title>
    <script type=&quot;text/javascript&quot; src=&quot;js/three.js&quot;></script>
    <script type=&quot;text/javascript&quot; src=&quot;Stats.js&quot;></script>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        
        body {
            position: fixed;
        }
        
        button {
            position: fixed;
            left: 50%;
            margin-left: -50px;
            bottom: 20%;
            width: 100px;
            height: 30px;
            background-color: #d3d3d3;
            border: none;
            border-radius: 15px;
            outline: none;
            font-size: 18px;
            font-weight: 700;
            color: #333;
            box-shadow: -1px -1px 1px #fff, 1px 1px 1px #000;
        }
    </style>
    <script>
        var stat;
        var renderer;
        var scene;
        var camera;
        var light;
        var texture;
        var ballMesh;
        var ballRadius = 0.5;

        var isMoving = false;
        var maxHeight = 5;
        var v = 0;
        var a = -0.01;

        function init() {
            // 处理requireAnimationFrame兼容性
            var requestAnimationFrame = window.requestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.msRequestAnimationFrame;
            window.requestAnimationFrame = requestAnimationFrame;

            // FPS 插件
            stat = new Stats();
            stat.domElement.style.position = 'absolute';
            stat.domElement.style.left = '0px';
            stat.domElement.style.top = '0px';
            document.body.appendChild(stat.domElement);

            // 渲染器
            renderer = new THREE.WebGLRenderer({
                antialias: true
            });
            width = window.innerWidth;
            height = window.innerHeight;
            renderer.setSize(width, height);
            document.body.appendChild(renderer.domElement);
            renderer.setClearColor(0xd3d3d3);

            // 场景
            scene = new THREE.Scene();

            // 相机
            camera = new THREE.OrthographicCamera(width / -128, width / 128, height / 128, height / -128, 1, 1000);
            camera.position.set(10, 15, 25);
            camera.lookAt(new THREE.Vector3(0, 0, 0));
            scene.add(camera);

            // 添加光照
            light = new THREE.DirectionalLight(0xffffff);
            light.position.set(-10, 30, 25);
            scene.add(light);

            // 加载贴图
            texture = THREE.ImageUtils.loadTexture('images/chess.png', {}, function() {
                renderer.render(scene, camera);
            });
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(4, 4);

            // 平面模型
            var plane = new THREE.Mesh(new THREE.PlaneGeometry(8, 8),
                new THREE.MeshLambertMaterial({
                    map: texture
                }));
            // 沿x轴旋转-90度
            plane.rotation.x = Math.PI / -2;
            scene.add(plane);

            // 球模型
            ballMesh = new THREE.Mesh(new THREE.SphereGeometry(ballRadius, 40, 16),
                new THREE.MeshLambertMaterial({
                    color: 0xffff00
                }));
            // 设置球的位置
            ballMesh.position.y = ballRadius;
            scene.add(ballMesh);

            // 坐标轴
            /* drawAxes(scene);
            function drawAxes(scene) {
                // x-axis
                var xGeo = new THREE.Geometry();
                xGeo.vertices.push(new THREE.Vector3(0, 0, 0));
                xGeo.vertices.push(new THREE.Vector3(7, 0, 0));
                var xMat = new THREE.LineBasicMaterial({
                    color: 0xff0000
                });
                var xAxis = new THREE.Line(xGeo, xMat);
                scene.add(xAxis);

                // y-axis
                var yGeo = new THREE.Geometry();
                yGeo.vertices.push(new THREE.Vector3(0, 0, 0));
                yGeo.vertices.push(new THREE.Vector3(0, 7, 0));
                var yMat = new THREE.LineBasicMaterial({
                    color: 0x00ff00
                });
                var yAxis = new THREE.Line(yGeo, yMat);
                scene.add(yAxis);

                // z-axis
                var zGeo = new THREE.Geometry();
                zGeo.vertices.push(new THREE.Vector3(0, 0, 0));
                zGeo.vertices.push(new THREE.Vector3(0, 0, 7));
                var zMat = new THREE.LineBasicMaterial({
                    color: 0x00ccff
                });
                var zAxis = new THREE.Line(zGeo, zMat);
                scene.add(zAxis);

            } */
            requestAnimationFrame(draw);
        }

        // 计算球运动的速度和位置
        function draw() {
            stat.begin();
            if (isMoving) {
                ballMesh.position.y += v;
                // a= -0.01
                v += a;
                // 当小球从定义的高度落到小球停在平面时的高度的时候
                if (ballMesh.position.y <= ballRadius) {
                    // 让小球弹起来
                    v = -v * 0.9;
                }
                // 当小球的速度小于设定值的时候
                if (Math.abs(v) < 0.001) {
                    // 让它停下来
                    isMoving = false;
                    ballMesh.position.y = ballRadius;
                }
            }
            renderer.render(scene, camera);
            requestAnimationFrame(draw);
            stat.end();
        }
        // 触发函数
        function drop() {
            isMoving = true;
            // 小球起落位置
            ballMesh.position.y = maxHeight;
            // 加速度为0
            v = 0;
        }
    </script>
</head>

<body onload=&quot;init();&quot;>
    <button id=&quot;dropBtn&quot; onclick=&quot;drop();&quot;>Drop</button>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>弹弹弹<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/three.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"Stats.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        * {
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        }
        
        <span class="hljs-selector-tag">body</span> {
            <span class="hljs-attribute">position</span>: fixed;
        }
        
        <span class="hljs-selector-tag">button</span> {
            <span class="hljs-attribute">position</span>: fixed;
            <span class="hljs-attribute">left</span>: <span class="hljs-number">50%</span>;
            <span class="hljs-attribute">margin-left</span>: -<span class="hljs-number">50px</span>;
            <span class="hljs-attribute">bottom</span>: <span class="hljs-number">20%</span>;
            <span class="hljs-attribute">width</span>: <span class="hljs-number">100px</span>;
            <span class="hljs-attribute">height</span>: <span class="hljs-number">30px</span>;
            <span class="hljs-attribute">background-color</span>: <span class="hljs-number">#d3d3d3</span>;
            <span class="hljs-attribute">border</span>: none;
            <span class="hljs-attribute">border-radius</span>: <span class="hljs-number">15px</span>;
            <span class="hljs-attribute">outline</span>: none;
            <span class="hljs-attribute">font-size</span>: <span class="hljs-number">18px</span>;
            <span class="hljs-attribute">font-weight</span>: <span class="hljs-number">700</span>;
            <span class="hljs-attribute">color</span>: <span class="hljs-number">#333</span>;
            <span class="hljs-attribute">box-shadow</span>: -<span class="hljs-number">1px</span> -<span class="hljs-number">1px</span> <span class="hljs-number">1px</span> <span class="hljs-number">#fff</span>, <span class="hljs-number">1px</span> <span class="hljs-number">1px</span> <span class="hljs-number">1px</span> <span class="hljs-number">#000</span>;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> stat;
        <span class="hljs-keyword">var</span> renderer;
        <span class="hljs-keyword">var</span> scene;
        <span class="hljs-keyword">var</span> camera;
        <span class="hljs-keyword">var</span> light;
        <span class="hljs-keyword">var</span> texture;
        <span class="hljs-keyword">var</span> ballMesh;
        <span class="hljs-keyword">var</span> ballRadius = <span class="hljs-number">0.5</span>;

        <span class="hljs-keyword">var</span> isMoving = <span class="hljs-literal">false</span>;
        <span class="hljs-keyword">var</span> maxHeight = <span class="hljs-number">5</span>;
        <span class="hljs-keyword">var</span> v = <span class="hljs-number">0</span>;
        <span class="hljs-keyword">var</span> a = <span class="hljs-number">-0.01</span>;

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span>(<span class="hljs-params"></span>) </span>{
            <span class="hljs-comment">// 处理requireAnimationFrame兼容性</span>
            <span class="hljs-keyword">var</span> requestAnimationFrame = <span class="hljs-built_in">window</span>.requestAnimationFrame ||
                <span class="hljs-built_in">window</span>.mozRequestAnimationFrame ||
                <span class="hljs-built_in">window</span>.webkitRequestAnimationFrame ||
                <span class="hljs-built_in">window</span>.msRequestAnimationFrame;
            <span class="hljs-built_in">window</span>.requestAnimationFrame = requestAnimationFrame;

            <span class="hljs-comment">// FPS 插件</span>
            stat = <span class="hljs-keyword">new</span> Stats();
            stat.domElement.style.position = <span class="hljs-string">'absolute'</span>;
            stat.domElement.style.left = <span class="hljs-string">'0px'</span>;
            stat.domElement.style.top = <span class="hljs-string">'0px'</span>;
            <span class="hljs-built_in">document</span>.body.appendChild(stat.domElement);

            <span class="hljs-comment">// 渲染器</span>
            renderer = <span class="hljs-keyword">new</span> THREE.WebGLRenderer({
                <span class="hljs-attr">antialias</span>: <span class="hljs-literal">true</span>
            });
            width = <span class="hljs-built_in">window</span>.innerWidth;
            height = <span class="hljs-built_in">window</span>.innerHeight;
            renderer.setSize(width, height);
            <span class="hljs-built_in">document</span>.body.appendChild(renderer.domElement);
            renderer.setClearColor(<span class="hljs-number">0xd3d3d3</span>);

            <span class="hljs-comment">// 场景</span>
            scene = <span class="hljs-keyword">new</span> THREE.Scene();

            <span class="hljs-comment">// 相机</span>
            camera = <span class="hljs-keyword">new</span> THREE.OrthographicCamera(width / <span class="hljs-number">-128</span>, width / <span class="hljs-number">128</span>, height / <span class="hljs-number">128</span>, height / <span class="hljs-number">-128</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1000</span>);
            camera.position.set(<span class="hljs-number">10</span>, <span class="hljs-number">15</span>, <span class="hljs-number">25</span>);
            camera.lookAt(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>));
            scene.add(camera);

            <span class="hljs-comment">// 添加光照</span>
            light = <span class="hljs-keyword">new</span> THREE.DirectionalLight(<span class="hljs-number">0xffffff</span>);
            light.position.set(<span class="hljs-number">-10</span>, <span class="hljs-number">30</span>, <span class="hljs-number">25</span>);
            scene.add(light);

            <span class="hljs-comment">// 加载贴图</span>
            texture = THREE.ImageUtils.loadTexture(<span class="hljs-string">'images/chess.png'</span>, {}, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
                renderer.render(scene, camera);
            });
            texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(<span class="hljs-number">4</span>, <span class="hljs-number">4</span>);

            <span class="hljs-comment">// 平面模型</span>
            <span class="hljs-keyword">var</span> plane = <span class="hljs-keyword">new</span> THREE.Mesh(<span class="hljs-keyword">new</span> THREE.PlaneGeometry(<span class="hljs-number">8</span>, <span class="hljs-number">8</span>),
                <span class="hljs-keyword">new</span> THREE.MeshLambertMaterial({
                    <span class="hljs-attr">map</span>: texture
                }));
            <span class="hljs-comment">// 沿x轴旋转-90度</span>
            plane.rotation.x = <span class="hljs-built_in">Math</span>.PI / <span class="hljs-number">-2</span>;
            scene.add(plane);

            <span class="hljs-comment">// 球模型</span>
            ballMesh = <span class="hljs-keyword">new</span> THREE.Mesh(<span class="hljs-keyword">new</span> THREE.SphereGeometry(ballRadius, <span class="hljs-number">40</span>, <span class="hljs-number">16</span>),
                <span class="hljs-keyword">new</span> THREE.MeshLambertMaterial({
                    <span class="hljs-attr">color</span>: <span class="hljs-number">0xffff00</span>
                }));
            <span class="hljs-comment">// 设置球的位置</span>
            ballMesh.position.y = ballRadius;
            scene.add(ballMesh);

            <span class="hljs-comment">// 坐标轴</span>
            <span class="hljs-comment">/* drawAxes(scene);
            function drawAxes(scene) {
                // x-axis
                var xGeo = new THREE.Geometry();
                xGeo.vertices.push(new THREE.Vector3(0, 0, 0));
                xGeo.vertices.push(new THREE.Vector3(7, 0, 0));
                var xMat = new THREE.LineBasicMaterial({
                    color: 0xff0000
                });
                var xAxis = new THREE.Line(xGeo, xMat);
                scene.add(xAxis);

                // y-axis
                var yGeo = new THREE.Geometry();
                yGeo.vertices.push(new THREE.Vector3(0, 0, 0));
                yGeo.vertices.push(new THREE.Vector3(0, 7, 0));
                var yMat = new THREE.LineBasicMaterial({
                    color: 0x00ff00
                });
                var yAxis = new THREE.Line(yGeo, yMat);
                scene.add(yAxis);

                // z-axis
                var zGeo = new THREE.Geometry();
                zGeo.vertices.push(new THREE.Vector3(0, 0, 0));
                zGeo.vertices.push(new THREE.Vector3(0, 0, 7));
                var zMat = new THREE.LineBasicMaterial({
                    color: 0x00ccff
                });
                var zAxis = new THREE.Line(zGeo, zMat);
                scene.add(zAxis);

            } */</span>
            requestAnimationFrame(draw);
        }

        <span class="hljs-comment">// 计算球运动的速度和位置</span>
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">draw</span>(<span class="hljs-params"></span>) </span>{
            stat.begin();
            <span class="hljs-keyword">if</span> (isMoving) {
                ballMesh.position.y += v;
                <span class="hljs-comment">// a= -0.01</span>
                v += a;
                <span class="hljs-comment">// 当小球从定义的高度落到小球停在平面时的高度的时候</span>
                <span class="hljs-keyword">if</span> (ballMesh.position.y &lt;= ballRadius) {
                    <span class="hljs-comment">// 让小球弹起来</span>
                    v = -v * <span class="hljs-number">0.9</span>;
                }
                <span class="hljs-comment">// 当小球的速度小于设定值的时候</span>
                <span class="hljs-keyword">if</span> (<span class="hljs-built_in">Math</span>.abs(v) &lt; <span class="hljs-number">0.001</span>) {
                    <span class="hljs-comment">// 让它停下来</span>
                    isMoving = <span class="hljs-literal">false</span>;
                    ballMesh.position.y = ballRadius;
                }
            }
            renderer.render(scene, camera);
            requestAnimationFrame(draw);
            stat.end();
        }
        <span class="hljs-comment">// 触发函数</span>
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drop</span>(<span class="hljs-params"></span>) </span>{
            isMoving = <span class="hljs-literal">true</span>;
            <span class="hljs-comment">// 小球起落位置</span>
            ballMesh.position.y = maxHeight;
            <span class="hljs-comment">// 加速度为0</span>
            v = <span class="hljs-number">0</span>;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span> <span class="hljs-attr">onload</span>=<span class="hljs-string">"init();"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">button</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"dropBtn"</span> <span class="hljs-attr">onclick</span>=<span class="hljs-string">"drop();"</span>&gt;</span>Drop<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238935?w=503&amp;h=486" src="https://static.alili.tech/img/remote/1460000012238935?w=503&amp;h=486" alt="image" title="image" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">10. 外部模型</h2>
<blockquote><p>前面我们了解到，使用Three.js创建常见几何体是十分方便的，但是对于人或者动物这样非常复杂的模型使用几何体组合就非常麻烦了。因此，Three.js允许用户导入由3ds Max等工具制作的三维模型，并添加到场景中。</p></blockquote>
<ul><li>本章以3ds Max为例，介绍如何导入外部模型。</li></ul>
<h3 id="articleHeader5">10.1 支持格式</h3>
<blockquote><p>Three.js有一系列导入外部文件的辅助函数，是在<code>three.js</code>之外的，使用前需要额外下载，在<a href="https://github.com/mrdoob/three.js/tree/master/examples/js/loaders" rel="nofollow noreferrer" target="_blank">https://github.com/mrdoob/three.js/tree/master/examples/js/loaders</a>可以找到,选择对应的模型加载器，系在下来。</p></blockquote>
<ul>
<li>
<code>*.obj</code>是最常用的模型格式，导入<code>*.obj</code>文件需要<code>OBJLoader.js</code>；导入带<code>*.mtl</code>材质的<code>*.obj</code>文件需要<code>MTLLoader.js</code>以及<code>OBJMTLLoader.js</code>。另有<code>PLYLoader.js</code>、<code>STLLoader.js</code>等分别对应不同格式的加载器，可以根据模型格式自行选择。</li>
<li>
<p>目前，支持的模型格式有：</p>
<ul>
<li><code>*.obj</code></li>
<li><code>*.obj, *.mtl</code></li>
<li><code>*.dae</code></li>
<li><code>*.ctm</code></li>
<li><code>*.ply</code></li>
<li><code>*.stl</code></li>
<li><code>*.wrl</code></li>
<li><code>*.vtk</code></li>
</ul>
</li>
</ul>
<h3 id="articleHeader6">10.2 无材质的模型</h3>
<blockquote><p>本节中，我们将将导出的没有材质的模型使用Three.js导入场景中。</p></blockquote>
<ul><li>首先，下载<a href="https://raw.githubusercontent.com/mrdoob/three.js/master/examples/js/loaders/OBJLoader.js" rel="nofollow noreferrer" target="_blank">OBJLoader.js</a>并在HTML的&lt;head&gt;中使用：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot; src=&quot;OBJLoader.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"OBJLoader.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<ul><li>然后，我们需要准备一个<code>*.obj</code>模型，在<code>init</code>函数中，创建<code>loader</code>变量，用于导入模型：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var loader = new THREE.OBJLoader();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> loader = <span class="hljs-keyword">new</span> THREE.OBJLoader();</code></pre>
<ul><li>
<code>loader</code>导入模型的时候，接受两个参数，第一个表示<code>模型路径</code>，第二个表示<code>完成导入后的回调函数</code>，一般我们需要在这个回调函数中将导入的模型<code>添加</code>到场景中。</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="loader.load('../lib/port.obj', function(obj) {
    //储存到全局变量中
    mesh = obj; 
    scene.add(obj);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">loader.load(<span class="hljs-string">'../lib/port.obj'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
    <span class="hljs-comment">//储存到全局变量中</span>
    mesh = obj; 
    scene.add(obj);
});</code></pre>
<ul><li>可以看到一个没有材质的茶壶</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238936?w=503&amp;h=380" src="https://static.alili.tech/img/remote/1460000012238936?w=503&amp;h=380" alt="image" title="image" style="cursor: pointer;"></span></p>
<ul><li>我们在重绘函数中让茶壶旋转：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function draw() {
    renderer.render(scene, camera);

    mesh.rotation.y += 0.01;
    if (mesh.rotation.y > Math.PI * 2) {
        mesh.rotation.y -= Math.PI * 2;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">draw</span>(<span class="hljs-params"></span>) </span>{
    renderer.render(scene, camera);

    mesh.rotation.y += <span class="hljs-number">0.01</span>;
    <span class="hljs-keyword">if</span> (mesh.rotation.y &gt; <span class="hljs-built_in">Math</span>.PI * <span class="hljs-number">2</span>) {
        mesh.rotation.y -= <span class="hljs-built_in">Math</span>.PI * <span class="hljs-number">2</span>;
    }
}</code></pre>
<ul><li>可以看到在某些角度时，好像有些面片没有被绘制出来，因而后方的茶嘴似乎穿越到前方了：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238937?w=503&amp;h=380" src="https://static.alili.tech/img/remote/1460000012238937?w=503&amp;h=380" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<ul><li>这是由于默认的情况下，只有正面的面片被绘制，而如果需要<code>双面绘制</code>，需要这样设置：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var loader = new THREE.OBJLoader();
loader.load('port.obj', function(obj) {
    obj.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
            child.material.side = THREE.DoubleSide;
        }
    });

    mesh = obj;
    scene.add(obj);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> loader = <span class="hljs-keyword">new</span> THREE.OBJLoader();
loader.load(<span class="hljs-string">'port.obj'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
    obj.traverse(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">child</span>) </span>{
        <span class="hljs-keyword">if</span> (child <span class="hljs-keyword">instanceof</span> THREE.Mesh) {
            child.material.side = THREE.DoubleSide;
        }
    });

    mesh = obj;
    scene.add(obj);
});</code></pre>
<ul><li>完整代码：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <script type=&quot;text/javascript&quot; src=&quot;js/three.js&quot;></script>
    <script type=&quot;text/javascript&quot; src=&quot;OBJLoader.js&quot;></script>
    <style>
        * {
            margin: 0;
            padding: 0;
        }
        
        body {
            position: fixed;
        }
    </style>
    <script type=&quot;text/javascript&quot;>
        var scene = null;
        var camera = null;
        var renderer = null;

        var mesh = null;
        var id = null;

        function init() {
            renderer = new THREE.WebGLRenderer();
            renderer.setSize(800, 600);
            document.body.appendChild(renderer.domElement);
            renderer.setClearColor(0x000000);
            scene = new THREE.Scene();

            camera = new THREE.OrthographicCamera(-8, 8, 6, -6, 0.1, 100);
            camera.position.set(15, 25, 25);
            camera.lookAt(new THREE.Vector3(0, 2, 0));
            scene.add(camera);

            var loader = new THREE.OBJLoader();
            loader.load('port.obj', function(obj) {
                obj.traverse(function(child) {
                    if (child instanceof THREE.Mesh) {
                        child.material.side = THREE.DoubleSide;
                    }
                });

                mesh = obj;
                scene.add(obj);
            });

            var light = new THREE.DirectionalLight(0xffffff);
            light.position.set(20, 10, 5);
            scene.add(light);

            id = setInterval(draw, 20);
        }

        function draw() {
            renderer.render(scene, camera);

            mesh.rotation.y += 0.01;
            if (mesh.rotation.y > Math.PI * 2) {
                mesh.rotation.y -= Math.PI * 2;
            }
        }
    </script>
</head>

<body onload=&quot;init()&quot;>

</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/three.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"OBJLoader.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        * {
            <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;
            <span class="hljs-attribute">padding</span>: <span class="hljs-number">0</span>;
        }
        
        <span class="hljs-selector-tag">body</span> {
            <span class="hljs-attribute">position</span>: fixed;
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> scene = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">var</span> camera = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">var</span> renderer = <span class="hljs-literal">null</span>;

        <span class="hljs-keyword">var</span> mesh = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">var</span> id = <span class="hljs-literal">null</span>;

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span>(<span class="hljs-params"></span>) </span>{
            renderer = <span class="hljs-keyword">new</span> THREE.WebGLRenderer();
            renderer.setSize(<span class="hljs-number">800</span>, <span class="hljs-number">600</span>);
            <span class="hljs-built_in">document</span>.body.appendChild(renderer.domElement);
            renderer.setClearColor(<span class="hljs-number">0x000000</span>);
            scene = <span class="hljs-keyword">new</span> THREE.Scene();

            camera = <span class="hljs-keyword">new</span> THREE.OrthographicCamera(<span class="hljs-number">-8</span>, <span class="hljs-number">8</span>, <span class="hljs-number">6</span>, <span class="hljs-number">-6</span>, <span class="hljs-number">0.1</span>, <span class="hljs-number">100</span>);
            camera.position.set(<span class="hljs-number">15</span>, <span class="hljs-number">25</span>, <span class="hljs-number">25</span>);
            camera.lookAt(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">0</span>, <span class="hljs-number">2</span>, <span class="hljs-number">0</span>));
            scene.add(camera);

            <span class="hljs-keyword">var</span> loader = <span class="hljs-keyword">new</span> THREE.OBJLoader();
            loader.load(<span class="hljs-string">'port.obj'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
                obj.traverse(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">child</span>) </span>{
                    <span class="hljs-keyword">if</span> (child <span class="hljs-keyword">instanceof</span> THREE.Mesh) {
                        child.material.side = THREE.DoubleSide;
                    }
                });

                mesh = obj;
                scene.add(obj);
            });

            <span class="hljs-keyword">var</span> light = <span class="hljs-keyword">new</span> THREE.DirectionalLight(<span class="hljs-number">0xffffff</span>);
            light.position.set(<span class="hljs-number">20</span>, <span class="hljs-number">10</span>, <span class="hljs-number">5</span>);
            scene.add(light);

            id = setInterval(draw, <span class="hljs-number">20</span>);
        }

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">draw</span>(<span class="hljs-params"></span>) </span>{
            renderer.render(scene, camera);

            mesh.rotation.y += <span class="hljs-number">0.01</span>;
            <span class="hljs-keyword">if</span> (mesh.rotation.y &gt; <span class="hljs-built_in">Math</span>.PI * <span class="hljs-number">2</span>) {
                mesh.rotation.y -= <span class="hljs-built_in">Math</span>.PI * <span class="hljs-number">2</span>;
            }
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span> <span class="hljs-attr">onload</span>=<span class="hljs-string">"init()"</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238938?w=503&amp;h=402" src="https://static.alili.tech/img/remote/1460000012238938?w=503&amp;h=402" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader7">10.3 有材质的模型</h3>
<blockquote><p>模型的材质可以有两种定义方式，一种是在<code>代码中</code>导入模型后设置材质，另一种是在建模软件中<code>导出材质</code>信息。下面，我们将分别介绍这两种方法。</p></blockquote>
<h4>10.3.1 代码中设置材质</h4>
<blockquote><p>这种方法与上一节类似，不同之处在于回调函数中设置模型的材质：</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var loader = new THREE.OBJLoader();
loader.load('port.obj', function(obj) {
    obj.traverse(function(child) {
        if (child instanceof THREE.Mesh) {
            /* 修改这里以下的代码 */
            child.material = new THREE.MeshLambertMaterial({
                color: 0xffff00,
                side: THREE.DoubleSide
            });
            /* 修改这里以上的代码 */
        }
    });

    mesh = obj;
    scene.add(obj);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> loader = <span class="hljs-keyword">new</span> THREE.OBJLoader();
loader.load(<span class="hljs-string">'port.obj'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">obj</span>) </span>{
    obj.traverse(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">child</span>) </span>{
        <span class="hljs-keyword">if</span> (child <span class="hljs-keyword">instanceof</span> THREE.Mesh) {
            <span class="hljs-comment">/* 修改这里以下的代码 */</span>
            child.material = <span class="hljs-keyword">new</span> THREE.MeshLambertMaterial({
                <span class="hljs-attr">color</span>: <span class="hljs-number">0xffff00</span>,
                <span class="hljs-attr">side</span>: THREE.DoubleSide
            });
            <span class="hljs-comment">/* 修改这里以上的代码 */</span>
        }
    });

    mesh = obj;
    scene.add(obj);
});</code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238939?w=503&amp;h=380" src="https://static.alili.tech/img/remote/1460000012238939?w=503&amp;h=380" alt="image" title="image" style="cursor: pointer;"></span></p>
<h4>10.3.2 建模软件中设置材质</h4>
<blockquote><p>导出3D模型的时候，选择导出<code>port.obj</code>模型文件以及<code>port.mtl</code>材质文件。</p></blockquote>
<ul><li>现在，我们不再使用<code>OBJLoader.js</code>，而是使用<code>MTLLoader.js</code>与<code>OBJMTLLoader.js</code>，并且要按该<code>顺序</code>引用：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script type=&quot;text/javascript&quot; src=&quot;MTLLoader.js&quot;></script>
<script type=&quot;text/javascript&quot; src=&quot;OBJMTLLoader.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"MTLLoader.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"OBJMTLLoader.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<ul><li>调用的方法也略有不同：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var mtlLoader = new THREE.MTLLoader();
mtlLoader.setPath('');
mtlLoader.load('port.mtl', function(materials) {
    materials.preload();
    // model loader
    var objLoader = new THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath('');
    objLoader.load('port.obj', function(object) {
        object.position.y = -95;
        // if has object, add to scene
        if (object.children.length > 0) {
            scene.add(object.children[0]);
        }
    });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> mtlLoader = <span class="hljs-keyword">new</span> THREE.MTLLoader();
mtlLoader.setPath(<span class="hljs-string">''</span>);
mtlLoader.load(<span class="hljs-string">'port.mtl'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">materials</span>) </span>{
    materials.preload();
    <span class="hljs-comment">// model loader</span>
    <span class="hljs-keyword">var</span> objLoader = <span class="hljs-keyword">new</span> THREE.OBJLoader();
    objLoader.setMaterials(materials);
    objLoader.setPath(<span class="hljs-string">''</span>);
    objLoader.load(<span class="hljs-string">'port.obj'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">object</span>) </span>{
        object.position.y = <span class="hljs-number">-95</span>;
        <span class="hljs-comment">// if has object, add to scene</span>
        <span class="hljs-keyword">if</span> (object.children.length &gt; <span class="hljs-number">0</span>) {
            scene.add(object.children[<span class="hljs-number">0</span>]);
        }
    });
});</code></pre>
<ul><li>完整代码：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
<html>

<head>
    <script type=&quot;text/javascript&quot; src=&quot;js/three.js&quot;></script>
    <script type=&quot;text/javascript&quot; src=&quot;MTLLoader.js&quot;></script>
    <script type=&quot;text/javascript&quot; src=&quot;OBJLoader.js&quot;></script>

    <script type=&quot;text/javascript&quot;>
        var scene = null;
        var camera = null;
        var renderer = null;

        var mesh = null;
        var id = null;

        function init() {
            renderer = new THREE.WebGLRenderer();
            renderer.setSize(800, 600);
            document.body.appendChild(renderer.domElement);
            renderer.setClearColor(0x000000);
            scene = new THREE.Scene();

            camera = new THREE.OrthographicCamera(-8, 8, 6, -6, 0.1, 100);
            camera.position.set(15, 25, 25);
            camera.lookAt(new THREE.Vector3(0, 2, 0));
            scene.add(camera);

            // material loader
            var mtlLoader = new THREE.MTLLoader();
            mtlLoader.setPath('');
            mtlLoader.load('port.mtl', function(materials) {
                materials.preload();
                // model loader
                var objLoader = new THREE.OBJLoader();
                objLoader.setMaterials(materials);
                objLoader.setPath('');
                objLoader.load('port.obj', function(object) {
                    object.position.y = -95;
                    // if has object, add to scene
                    if (object.children.length > 0) {
                        scene.add(object.children[0]);
                    }

                });
                mesh = materials;
                console.log(mesh);
            });
            var light = new THREE.DirectionalLight(0xffffff);
            light.position.set(20, 10, 5);
            scene.add(light);

            id = setInterval(draw, 20);
        }

        function draw() {
            renderer.render(scene, camera);
        }
    </script>
</head>

<body onload=&quot;init()&quot;>
</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html">
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/three.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"MTLLoader.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"OBJLoader.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> scene = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">var</span> camera = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">var</span> renderer = <span class="hljs-literal">null</span>;

        <span class="hljs-keyword">var</span> mesh = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">var</span> id = <span class="hljs-literal">null</span>;

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span>(<span class="hljs-params"></span>) </span>{
            renderer = <span class="hljs-keyword">new</span> THREE.WebGLRenderer();
            renderer.setSize(<span class="hljs-number">800</span>, <span class="hljs-number">600</span>);
            <span class="hljs-built_in">document</span>.body.appendChild(renderer.domElement);
            renderer.setClearColor(<span class="hljs-number">0x000000</span>);
            scene = <span class="hljs-keyword">new</span> THREE.Scene();

            camera = <span class="hljs-keyword">new</span> THREE.OrthographicCamera(<span class="hljs-number">-8</span>, <span class="hljs-number">8</span>, <span class="hljs-number">6</span>, <span class="hljs-number">-6</span>, <span class="hljs-number">0.1</span>, <span class="hljs-number">100</span>);
            camera.position.set(<span class="hljs-number">15</span>, <span class="hljs-number">25</span>, <span class="hljs-number">25</span>);
            camera.lookAt(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">0</span>, <span class="hljs-number">2</span>, <span class="hljs-number">0</span>));
            scene.add(camera);

            <span class="hljs-comment">// material loader</span>
            <span class="hljs-keyword">var</span> mtlLoader = <span class="hljs-keyword">new</span> THREE.MTLLoader();
            mtlLoader.setPath(<span class="hljs-string">''</span>);
            mtlLoader.load(<span class="hljs-string">'port.mtl'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">materials</span>) </span>{
                materials.preload();
                <span class="hljs-comment">// model loader</span>
                <span class="hljs-keyword">var</span> objLoader = <span class="hljs-keyword">new</span> THREE.OBJLoader();
                objLoader.setMaterials(materials);
                objLoader.setPath(<span class="hljs-string">''</span>);
                objLoader.load(<span class="hljs-string">'port.obj'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">object</span>) </span>{
                    object.position.y = <span class="hljs-number">-95</span>;
                    <span class="hljs-comment">// if has object, add to scene</span>
                    <span class="hljs-keyword">if</span> (object.children.length &gt; <span class="hljs-number">0</span>) {
                        scene.add(object.children[<span class="hljs-number">0</span>]);
                    }

                });
                mesh = materials;
                <span class="hljs-built_in">console</span>.log(mesh);
            });
            <span class="hljs-keyword">var</span> light = <span class="hljs-keyword">new</span> THREE.DirectionalLight(<span class="hljs-number">0xffffff</span>);
            light.position.set(<span class="hljs-number">20</span>, <span class="hljs-number">10</span>, <span class="hljs-number">5</span>);
            scene.add(light);

            id = setInterval(draw, <span class="hljs-number">20</span>);
        }

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">draw</span>(<span class="hljs-params"></span>) </span>{
            renderer.render(scene, camera);
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span> <span class="hljs-attr">onload</span>=<span class="hljs-string">"init()"</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<ul><li>导出时自带的效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238940?w=503&amp;h=380" src="https://static.alili.tech/img/remote/1460000012238940?w=503&amp;h=380" alt="image" title="image" style="cursor: pointer;"></span></p>
<h2 id="articleHeader8">11. 光与影</h2>
<blockquote><p>图像渲染的丰富效果很大程度上也要归功于光与影的利用。真实世界中的光影效果非常复杂，但是其本质—光的传播原理却又是非常单一的，这便是自然界繁简相成的又一例证。为了使计算机模拟丰富的光照效果，人们提出了几种不同的光源模型（<code>环境光</code>、<code>平行光</code>、<code>点光源</code>、<code>聚光灯</code>等），在不同场合下组合利用，将能达到很好的光照效果。</p></blockquote>
<ul><li>在Three.js中，光源与阴影的创建和使用是十分方便的。在学会了如何控制光影的基本方法之后，如果能将其灵活应用，将能使场景的渲染效果更加丰富逼真。在本章中，我们将探讨四种常用的光源（环境光、点光源、平行光、聚光灯）和阴影带来的效果，以及如何去创建使用光影。</li></ul>
<h3 id="articleHeader9">11.1 环境光(AmbientLight)</h3>
<blockquote><p>环境光是指<code>场景整体</code>的光照效果，是由于场景内若干光源的多次反射形成的亮度一致的效果，通常用来为整个场景指定一个基础亮度。因此，环境光没有明确的光源位置，在各处形成的亮度也是一致的。</p></blockquote>
<ul><li>在设置环境光时，只需指定光的颜色：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var light = new THREE.AmbientLight(hex);
scene.add(light);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> light = <span class="hljs-keyword">new</span> THREE.AmbientLight(hex);
scene.add(light);</code></pre>
<ul>
<li>其中<code>hex</code>是十六进制的RGB颜色信息，如红色表示为<code>0xff0000</code>
</li>
<li>但是，如果此时场景中没有物体，只添加了这个环境光，那么渲染的结果仍然是一片黑。所以，我们添加两个长方体看下效果：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 创建一个绿色的正方体
var greenCube = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2),
        new THREE.MeshLambertMaterial({color: 0x00ff00}));
greenCube.position.x = 3;
scene.add(greenCube);

// 创建一个白色的正方体
var whiteCube = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2),
        new THREE.MeshLambertMaterial({color: 0xffffff}));
whiteCube.position.x = -3;
scene.add(whiteCube);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 创建一个绿色的正方体</span>
<span class="hljs-keyword">var</span> greenCube = <span class="hljs-keyword">new</span> THREE.Mesh(<span class="hljs-keyword">new</span> THREE.CubeGeometry(<span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>),
        <span class="hljs-keyword">new</span> THREE.MeshLambertMaterial({<span class="hljs-attr">color</span>: <span class="hljs-number">0x00ff00</span>}));
greenCube.position.x = <span class="hljs-number">3</span>;
scene.add(greenCube);

<span class="hljs-comment">// 创建一个白色的正方体</span>
<span class="hljs-keyword">var</span> whiteCube = <span class="hljs-keyword">new</span> THREE.Mesh(<span class="hljs-keyword">new</span> THREE.CubeGeometry(<span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">2</span>),
        <span class="hljs-keyword">new</span> THREE.MeshLambertMaterial({<span class="hljs-attr">color</span>: <span class="hljs-number">0xffffff</span>}));
whiteCube.position.x = <span class="hljs-number">-3</span>;
scene.add(whiteCube);</code></pre>
<ul><li>效果如图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238941?w=503&amp;h=340" src="https://static.alili.tech/img/remote/1460000012238941?w=503&amp;h=340" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<ul><li>如果想让环境光暗些，可以将其设置为<code>new THREE.AmbientLight(0xcccccc)</code>等，效果为：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238942?w=503&amp;h=340" src="https://static.alili.tech/img/remote/1460000012238942?w=503&amp;h=340" alt="image" title="image" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader10">11.2 点光源(PointLight)</h3>
<blockquote><p>点光源是不计光源大小，可以看作一个点发出的光源。点光源照到不同物体表面的亮度是线性递减的，因此，离点光源距离越<code>远</code>的物体会显得越<code>暗</code>。</p></blockquote>
<ul><li>点光源的构造函数是：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="THREE.PointLight(hex, intensity, distance);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">THREE.PointLight(hex, intensity, distance);</code></pre>
<ul>
<li>其中，<code>hex</code>是光源十六进制的颜色值；<code>intensity</code>是亮度，缺省值为<code>1</code>，表示<code>100%</code>亮度；<code>distance</code>是光源最远照射到的距离，缺省值为<code>0</code>。</li>
<li>创建点光源并将其添加到场景中的完整做法是：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var light = new THREE.PointLight(0xffffff, 2, 100);
light.position.set(0, 1.5, 2);
scene.add(light);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> light = <span class="hljs-keyword">new</span> THREE.PointLight(<span class="hljs-number">0xffffff</span>, <span class="hljs-number">2</span>, <span class="hljs-number">100</span>);
light.position.set(<span class="hljs-number">0</span>, <span class="hljs-number">1.5</span>, <span class="hljs-number">2</span>);
scene.add(light);</code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238943?w=503&amp;h=340" src="https://static.alili.tech/img/remote/1460000012238943?w=503&amp;h=340" alt="image" title="image" style="cursor: pointer;"></span></p>
<ul><li>注意，这里光在每个面上的亮度是不同的，对于每个三角面片，将根据三个顶点的亮度进行插值。</li></ul>
<h3 id="articleHeader11">11.3 平行光(DirectionalLight)</h3>
<blockquote><p>我们都知道，太阳光常常被看作平行光，这是因为相对地球上物体的尺度而言，太阳离我们的距离足够远。对于任意平行的平面，平行光照射的亮度都是相同的，而与平面所在位置无关。</p></blockquote>
<ul><li>平行光的构造函数是：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="THREE.DirectionalLight(hex, intensity)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">THREE.DirectionalLight(hex, intensity)</code></pre>
<ul>
<li>其中，<code>hex</code>是光源十六进制的颜色值；<code>intensity</code>是亮度，缺省值为<code>1</code>，表示<code>100%</code>亮度。</li>
<li>此外，对于平行光而言，设置光源<code>位置</code>尤为重要。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var light = new THREE.DirectionalLight();
light.position.set(2, 5, 3);
scene.add(light);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> light = <span class="hljs-keyword">new</span> THREE.DirectionalLight();
light.position.set(<span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">3</span>);
scene.add(light);</code></pre>
<ul>
<li>注意，这里设置光源位置并不意味着所有光从<code>(2, 5, 3)</code>点射出（如果是的话，就成了点光源），而是意味着，平行光将以<code>矢量(-2, -5, -3)</code>的方向照射到所有平面。因此，平面亮度与平面的位置无关，而只与平面的<code>法向量</code>相关。只要平面是平行的，那么得到的光照也一定是相同的。</li>
<li>示例代码：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <script type=&quot;text/javascript&quot; src=&quot;js/three.js&quot;></script>
    <script>
        var stat;
        var renderer;
        var scene;
        var camera;

        function init() {

            // 渲染器
            renderer = new THREE.WebGLRenderer({
                antialias: true
            });
            renderer.setSize(800, 600);
            document.body.appendChild(renderer.domElement);
            renderer.setClearColor(0x000000);

            // 场景
            scene = new THREE.Scene();

            // 相机
            var camera = new THREE.OrthographicCamera(-5, 5, 3.75, -3.75, 0.1, 100);
            camera.position.set(5, 15, 25);
            camera.lookAt(new THREE.Vector3(0, 0, 0));
            scene.add(camera);

            // 平行光
            var light = new THREE.DirectionalLight();
            light.position.set(2, 5, 3);
            scene.add(light);
            
            // 右侧正方体
            var rightCube = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1),
                new THREE.MeshLambertMaterial({
                    color: 0x00ff00
                }));
            rightCube.position.x = 1;
            rightCube.position.y = -1;
            scene.add(rightCube);
            
            // 左侧正方体
            var leftCube = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1),
                new THREE.MeshLambertMaterial({
                    color: 0x00ff00
                }));
            leftCube.position.x = -1;
            scene.add(leftCube);

            // 渲染
            renderer.render(scene, camera);
        }
    </script>
</head>

<body onload=&quot;init();&quot;>

</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/three.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> stat;
        <span class="hljs-keyword">var</span> renderer;
        <span class="hljs-keyword">var</span> scene;
        <span class="hljs-keyword">var</span> camera;

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span>(<span class="hljs-params"></span>) </span>{

            <span class="hljs-comment">// 渲染器</span>
            renderer = <span class="hljs-keyword">new</span> THREE.WebGLRenderer({
                <span class="hljs-attr">antialias</span>: <span class="hljs-literal">true</span>
            });
            renderer.setSize(<span class="hljs-number">800</span>, <span class="hljs-number">600</span>);
            <span class="hljs-built_in">document</span>.body.appendChild(renderer.domElement);
            renderer.setClearColor(<span class="hljs-number">0x000000</span>);

            <span class="hljs-comment">// 场景</span>
            scene = <span class="hljs-keyword">new</span> THREE.Scene();

            <span class="hljs-comment">// 相机</span>
            <span class="hljs-keyword">var</span> camera = <span class="hljs-keyword">new</span> THREE.OrthographicCamera(<span class="hljs-number">-5</span>, <span class="hljs-number">5</span>, <span class="hljs-number">3.75</span>, <span class="hljs-number">-3.75</span>, <span class="hljs-number">0.1</span>, <span class="hljs-number">100</span>);
            camera.position.set(<span class="hljs-number">5</span>, <span class="hljs-number">15</span>, <span class="hljs-number">25</span>);
            camera.lookAt(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>));
            scene.add(camera);

            <span class="hljs-comment">// 平行光</span>
            <span class="hljs-keyword">var</span> light = <span class="hljs-keyword">new</span> THREE.DirectionalLight();
            light.position.set(<span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">3</span>);
            scene.add(light);
            
            <span class="hljs-comment">// 右侧正方体</span>
            <span class="hljs-keyword">var</span> rightCube = <span class="hljs-keyword">new</span> THREE.Mesh(<span class="hljs-keyword">new</span> THREE.CubeGeometry(<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>),
                <span class="hljs-keyword">new</span> THREE.MeshLambertMaterial({
                    <span class="hljs-attr">color</span>: <span class="hljs-number">0x00ff00</span>
                }));
            rightCube.position.x = <span class="hljs-number">1</span>;
            rightCube.position.y = <span class="hljs-number">-1</span>;
            scene.add(rightCube);
            
            <span class="hljs-comment">// 左侧正方体</span>
            <span class="hljs-keyword">var</span> leftCube = <span class="hljs-keyword">new</span> THREE.Mesh(<span class="hljs-keyword">new</span> THREE.CubeGeometry(<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>),
                <span class="hljs-keyword">new</span> THREE.MeshLambertMaterial({
                    <span class="hljs-attr">color</span>: <span class="hljs-number">0x00ff00</span>
                }));
            leftCube.position.x = <span class="hljs-number">-1</span>;
            scene.add(leftCube);

            <span class="hljs-comment">// 渲染</span>
            renderer.render(scene, camera);
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span> <span class="hljs-attr">onload</span>=<span class="hljs-string">"init();"</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238944?w=503&amp;h=340" src="https://static.alili.tech/img/remote/1460000012238944?w=503&amp;h=340" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader12">11.4 聚光灯(SpotLight)</h3>
<blockquote><p>可以看出，聚光灯是一种特殊的点光源，它能够朝着一个方向投射光线。聚光灯投射出的是类似<code>圆锥形</code>的光线，这与我们现实中看到的聚光灯是一致的。</p></blockquote>
<ul><li>其构造函数为：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="THREE.SpotLight(hex, intensity, distance, angle, exponent)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">THREE.SpotLight(hex, intensity, distance, angle, exponent)</code></pre>
<ul>
<li>相比点光源，多了<code>angle</code>和<code>exponent</code>两个参数。<code>angle</code>是聚光灯的张角，缺省值是<code>Math.PI / 3</code>，最大值是<code>Math.PI / 2</code>；<code>exponent</code>是光强在偏离<code>target</code>的衰减指数（target需要在之后定义，缺省值为<code>(0, 0, 0)</code>），缺省值是<code>10</code>。</li>
<li>在调用构造函数之后，除了设置光源本身的位置，一般还需要设置<code>target</code>：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="light.position.set(x1, y1, z1);
light.target.position.set(x2, y2, z2);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">light.position.set(x1, y1, z1);
light.target.position.set(x2, y2, z2);</code></pre>
<ul><li>除了设置<code>light.target.position</code>的方法外，如果想让聚光灯跟着某一物体移动（就像真的聚光灯！），可以<code>target</code>指定为<code>该物体</code>：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1),
                    new THREE.MeshLambertMaterial({color: 0x00ff00}));

var light = new THREE.SpotLight(0xffff00, 1, 100, Math.PI / 6, 25);
light.target = cube;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> cube = <span class="hljs-keyword">new</span> THREE.Mesh(<span class="hljs-keyword">new</span> THREE.CubeGeometry(<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>),
                    <span class="hljs-keyword">new</span> THREE.MeshLambertMaterial({<span class="hljs-attr">color</span>: <span class="hljs-number">0x00ff00</span>}));

<span class="hljs-keyword">var</span> light = <span class="hljs-keyword">new</span> THREE.SpotLight(<span class="hljs-number">0xffff00</span>, <span class="hljs-number">1</span>, <span class="hljs-number">100</span>, <span class="hljs-built_in">Math</span>.PI / <span class="hljs-number">6</span>, <span class="hljs-number">25</span>);
light.target = cube;</code></pre>
<ul><li>示例代码：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <script type=&quot;text/javascript&quot; src=&quot;js/three.js&quot;></script>
    <script type=&quot;text/javascript&quot;>
        var scene = null;
        var camera = null;
        var renderer = null;

        var cube = null;
        var alpha = 0;

        function init() {
            renderer = new THREE.WebGLRenderer();
            renderer.setSize(800, 600);

            document.body.appendChild(renderer.domElement);

            scene = new THREE.Scene();

            camera = new THREE.OrthographicCamera(-5, 5, 3.75, -3.75, 0.1, 100);
            camera.position.set(5, 15, 25);
            camera.lookAt(new THREE.Vector3(0, 0, 0));
            scene.add(camera);

            // 平面
            var plane = new THREE.Mesh(new THREE.PlaneGeometry(8, 8, 16, 16),
                new THREE.MeshLambertMaterial({
                    color: 0xcccccc
                }));
            plane.rotation.x = -Math.PI / 2;
            plane.position.y = -1;
            plane.receiveShadow = true;
            scene.add(plane);

            // 立方体
            cube = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1),
                new THREE.MeshLambertMaterial({
                    color: 0x00ff00,
                }));
            cube.position.x = 2;
            scene.add(cube);

            // 聚光灯
            var light = new THREE.SpotLight(0xffff00, 1, 100, Math.PI / 6, 25);
            light.position.set(2, 5, 3);
            light.target = cube;
            scene.add(light);

            // 环境光
            var ambient = new THREE.AmbientLight(0x666666);
            scene.add(ambient);

            requestAnimationFrame(draw);
        }

        function draw() {
            alpha += 0.01;
            if (alpha > Math.PI * 2) {
                alpha -= Math.PI * 2;
            }

            cube.position.set(2 * Math.cos(alpha), 0, 2 * Math.sin(alpha));

            renderer.render(scene, camera);

            requestAnimationFrame(draw);
        }
    </script>
</head>

<body onload=&quot;init();&quot;>

</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/three.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> scene = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">var</span> camera = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">var</span> renderer = <span class="hljs-literal">null</span>;

        <span class="hljs-keyword">var</span> cube = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">var</span> alpha = <span class="hljs-number">0</span>;

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span>(<span class="hljs-params"></span>) </span>{
            renderer = <span class="hljs-keyword">new</span> THREE.WebGLRenderer();
            renderer.setSize(<span class="hljs-number">800</span>, <span class="hljs-number">600</span>);

            <span class="hljs-built_in">document</span>.body.appendChild(renderer.domElement);

            scene = <span class="hljs-keyword">new</span> THREE.Scene();

            camera = <span class="hljs-keyword">new</span> THREE.OrthographicCamera(<span class="hljs-number">-5</span>, <span class="hljs-number">5</span>, <span class="hljs-number">3.75</span>, <span class="hljs-number">-3.75</span>, <span class="hljs-number">0.1</span>, <span class="hljs-number">100</span>);
            camera.position.set(<span class="hljs-number">5</span>, <span class="hljs-number">15</span>, <span class="hljs-number">25</span>);
            camera.lookAt(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>));
            scene.add(camera);

            <span class="hljs-comment">// 平面</span>
            <span class="hljs-keyword">var</span> plane = <span class="hljs-keyword">new</span> THREE.Mesh(<span class="hljs-keyword">new</span> THREE.PlaneGeometry(<span class="hljs-number">8</span>, <span class="hljs-number">8</span>, <span class="hljs-number">16</span>, <span class="hljs-number">16</span>),
                <span class="hljs-keyword">new</span> THREE.MeshLambertMaterial({
                    <span class="hljs-attr">color</span>: <span class="hljs-number">0xcccccc</span>
                }));
            plane.rotation.x = -<span class="hljs-built_in">Math</span>.PI / <span class="hljs-number">2</span>;
            plane.position.y = <span class="hljs-number">-1</span>;
            plane.receiveShadow = <span class="hljs-literal">true</span>;
            scene.add(plane);

            <span class="hljs-comment">// 立方体</span>
            cube = <span class="hljs-keyword">new</span> THREE.Mesh(<span class="hljs-keyword">new</span> THREE.CubeGeometry(<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>),
                <span class="hljs-keyword">new</span> THREE.MeshLambertMaterial({
                    <span class="hljs-attr">color</span>: <span class="hljs-number">0x00ff00</span>,
                }));
            cube.position.x = <span class="hljs-number">2</span>;
            scene.add(cube);

            <span class="hljs-comment">// 聚光灯</span>
            <span class="hljs-keyword">var</span> light = <span class="hljs-keyword">new</span> THREE.SpotLight(<span class="hljs-number">0xffff00</span>, <span class="hljs-number">1</span>, <span class="hljs-number">100</span>, <span class="hljs-built_in">Math</span>.PI / <span class="hljs-number">6</span>, <span class="hljs-number">25</span>);
            light.position.set(<span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">3</span>);
            light.target = cube;
            scene.add(light);

            <span class="hljs-comment">// 环境光</span>
            <span class="hljs-keyword">var</span> ambient = <span class="hljs-keyword">new</span> THREE.AmbientLight(<span class="hljs-number">0x666666</span>);
            scene.add(ambient);

            requestAnimationFrame(draw);
        }

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">draw</span>(<span class="hljs-params"></span>) </span>{
            alpha += <span class="hljs-number">0.01</span>;
            <span class="hljs-keyword">if</span> (alpha &gt; <span class="hljs-built_in">Math</span>.PI * <span class="hljs-number">2</span>) {
                alpha -= <span class="hljs-built_in">Math</span>.PI * <span class="hljs-number">2</span>;
            }

            cube.position.set(<span class="hljs-number">2</span> * <span class="hljs-built_in">Math</span>.cos(alpha), <span class="hljs-number">0</span>, <span class="hljs-number">2</span> * <span class="hljs-built_in">Math</span>.sin(alpha));

            renderer.render(scene, camera);

            requestAnimationFrame(draw);
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span> <span class="hljs-attr">onload</span>=<span class="hljs-string">"init();"</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238945?w=503&amp;h=383" src="https://static.alili.tech/img/remote/1460000012238945?w=503&amp;h=383" alt="image" title="image" style="cursor: pointer;"></span></p>
<h3 id="articleHeader13">11.5 阴影</h3>
<blockquote><p>明暗是相对的，阴影的形成也就是因为比周围获得的光照更少。因此，要形成阴影，光源必不可少。</p></blockquote>
<ul>
<li>在Three.js中，能形成阴影的光源只有<code>THREE.DirectionalLight</code>与<code>THREE.SpotLight</code>；而相对地，能表现阴影效果的材质只有<code>THREE.LambertMaterial</code>与<code>THREE.PhongMaterial</code>。因而在设置光源和材质的时候，一定要注意这一点。</li>
<li><strong>下面，我们以聚光灯为例，在之前的基础上增加阴影效果。</strong></li>
<li>首先，我们需要在初始化时，告诉渲染器渲染阴影：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="renderer.shadowMapEnabled = true;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">renderer.shadowMapEnabled = <span class="hljs-literal">true</span>;</code></pre>
<ul><li>然后，对于光源以及所有要产生阴影的物体调用：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 上面的案例，产生阴影的物体是正方体
cube.castShadow = true;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 上面的案例，产生阴影的物体是正方体</span>
cube.castShadow = <span class="hljs-literal">true</span>;</code></pre>
<ul><li>对于接收阴影的物体调用：</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 接收阴影的物体是平面
plan.receiveShadow = true;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 接收阴影的物体是平面</span>
plan.receiveShadow = <span class="hljs-literal">true</span>;</code></pre>
<ul>
<li>比如场景中一个<code>平面</code>上有一个<code>正方体</code>，想要让聚光灯照射在正方体上，产生的阴影投射在平面上，那么就需要对聚光灯和正方体调用<code>castShadow = true</code>，对于平面调用<code>receiveShadow = true</code>。</li>
<li>以上就是产生阴影效果的必要步骤了，不过通常还需要设置光源的阴影相关属性，才能正确显示出阴影效果。</li>
<li>对于<code>聚光灯</code>，需要设置<code>shadowCameraNear</code>、<code>shadowCameraFar</code>、<code>shadowCameraFov</code>三个值，类比我们在第二章学到的透视投影照相机，只有介于<code>shadowCameraNear</code>与<code>shadowCameraFar</code>之间的物体将产生阴影，<code>shadowCameraFov</code>表示张角。</li>
<li>对于<code>平行光</code>，需要设置<code>shadowCameraNear</code>、<code>shadowCameraFar</code>、<code>shadowCameraLeft</code>、<code>shadowCameraRight</code>、<code>shadowCameraTop</code>以及<code>shadowCameraBottom</code>六个值，相当于正交投影照相机的六个面。同样，只有在这六个面围成的长方体内的物体才会产生阴影效果。</li>
<li>为了看到阴影照相机的位置，通常可以在调试时开启<code>light.shadowCameraVisible = true</code>。</li>
<li>如果想要修改阴影的深浅，可以通过设置<code>shadowDarkness</code>，该值的范围是<code>0</code>到<code>1</code>，越小越浅。</li>
<li>另外，这里实现阴影效果的方法是<code>Shadow Mapping</code>，即阴影是作为渲染前计算好的贴图贴上去的，因而会受到贴图<code>像素大小</code>的限制。所以可以通过设置<code>shadowMapWidth</code>与<code>shadowMapHeight</code>值控制贴图的大小，来改变阴影的精确度。</li>
<li>而如果想实现<code>软阴影</code>的效果，可以通过<code>renderer.shadowMapSoft = true;</code>方便地实现。</li>
<li>完整代码：</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>

<head>
    <meta charset=&quot;UTF-8&quot;>
    <script type=&quot;text/javascript&quot; src=&quot;js/three.js&quot;></script>
    <script type=&quot;text/javascript&quot;>
        var scene = null;
        var camera = null;
        var renderer = null;

        var cube = null;
        var alpha = 0;

        function init() {
            renderer = new THREE.WebGLRenderer();
            renderer.setSize(800, 600);

            document.body.appendChild(renderer.domElement);
            renderer.shadowMapEnabled = true;


            scene = new THREE.Scene();

            camera = new THREE.OrthographicCamera(-5, 5, 3.75, -3.75, 0.1, 100);
            camera.position.set(5, 15, 25);
            camera.lookAt(new THREE.Vector3(0, 0, 0));
            scene.add(camera);

            var plane = new THREE.Mesh(new THREE.PlaneGeometry(8, 8, 16, 16),
                new THREE.MeshLambertMaterial({
                    color: 0xcccccc
                }));
            plane.rotation.x = -Math.PI / 2;
            plane.position.y = -1;
            plane.receiveShadow = true;
            scene.add(plane);

            cube = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1),
                new THREE.MeshLambertMaterial({
                    color: 0x00ff00
                }));
            cube.position.x = 2;
            cube.castShadow = true;
            scene.add(cube);

            var light = new THREE.SpotLight(0xffff00, 1, 100, Math.PI / 6, 25);
            light.position.set(2, 5, 3);
            light.target = cube;
            light.castShadow = true;

            light.shadowCameraNear = 2;
            light.shadowCameraFar = 10;
            light.shadowCameraFov = 30;

            light.shadowMapWidth = 1024;
            light.shadowMapHeight = 1024;
            light.shadowDarkness = 0.3;

            scene.add(light);

            // ambient light
            var ambient = new THREE.AmbientLight(0x666666);
            scene.add(ambient);

            requestAnimationFrame(draw);
        }

        function draw() {
            alpha += 0.01;
            if (alpha > Math.PI * 2) {
                alpha -= Math.PI * 2;
            }

            cube.position.set(2 * Math.cos(alpha), 0, 2 * Math.sin(alpha));

            renderer.render(scene, camera);

            requestAnimationFrame(draw);
        }
    </script>
</head>

<body onload=&quot;init();&quot;>

</body>

</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/three.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span>&gt;</span><span class="javascript">
        <span class="hljs-keyword">var</span> scene = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">var</span> camera = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">var</span> renderer = <span class="hljs-literal">null</span>;

        <span class="hljs-keyword">var</span> cube = <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">var</span> alpha = <span class="hljs-number">0</span>;

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span>(<span class="hljs-params"></span>) </span>{
            renderer = <span class="hljs-keyword">new</span> THREE.WebGLRenderer();
            renderer.setSize(<span class="hljs-number">800</span>, <span class="hljs-number">600</span>);

            <span class="hljs-built_in">document</span>.body.appendChild(renderer.domElement);
            renderer.shadowMapEnabled = <span class="hljs-literal">true</span>;


            scene = <span class="hljs-keyword">new</span> THREE.Scene();

            camera = <span class="hljs-keyword">new</span> THREE.OrthographicCamera(<span class="hljs-number">-5</span>, <span class="hljs-number">5</span>, <span class="hljs-number">3.75</span>, <span class="hljs-number">-3.75</span>, <span class="hljs-number">0.1</span>, <span class="hljs-number">100</span>);
            camera.position.set(<span class="hljs-number">5</span>, <span class="hljs-number">15</span>, <span class="hljs-number">25</span>);
            camera.lookAt(<span class="hljs-keyword">new</span> THREE.Vector3(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>));
            scene.add(camera);

            <span class="hljs-keyword">var</span> plane = <span class="hljs-keyword">new</span> THREE.Mesh(<span class="hljs-keyword">new</span> THREE.PlaneGeometry(<span class="hljs-number">8</span>, <span class="hljs-number">8</span>, <span class="hljs-number">16</span>, <span class="hljs-number">16</span>),
                <span class="hljs-keyword">new</span> THREE.MeshLambertMaterial({
                    <span class="hljs-attr">color</span>: <span class="hljs-number">0xcccccc</span>
                }));
            plane.rotation.x = -<span class="hljs-built_in">Math</span>.PI / <span class="hljs-number">2</span>;
            plane.position.y = <span class="hljs-number">-1</span>;
            plane.receiveShadow = <span class="hljs-literal">true</span>;
            scene.add(plane);

            cube = <span class="hljs-keyword">new</span> THREE.Mesh(<span class="hljs-keyword">new</span> THREE.CubeGeometry(<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>),
                <span class="hljs-keyword">new</span> THREE.MeshLambertMaterial({
                    <span class="hljs-attr">color</span>: <span class="hljs-number">0x00ff00</span>
                }));
            cube.position.x = <span class="hljs-number">2</span>;
            cube.castShadow = <span class="hljs-literal">true</span>;
            scene.add(cube);

            <span class="hljs-keyword">var</span> light = <span class="hljs-keyword">new</span> THREE.SpotLight(<span class="hljs-number">0xffff00</span>, <span class="hljs-number">1</span>, <span class="hljs-number">100</span>, <span class="hljs-built_in">Math</span>.PI / <span class="hljs-number">6</span>, <span class="hljs-number">25</span>);
            light.position.set(<span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">3</span>);
            light.target = cube;
            light.castShadow = <span class="hljs-literal">true</span>;

            light.shadowCameraNear = <span class="hljs-number">2</span>;
            light.shadowCameraFar = <span class="hljs-number">10</span>;
            light.shadowCameraFov = <span class="hljs-number">30</span>;

            light.shadowMapWidth = <span class="hljs-number">1024</span>;
            light.shadowMapHeight = <span class="hljs-number">1024</span>;
            light.shadowDarkness = <span class="hljs-number">0.3</span>;

            scene.add(light);

            <span class="hljs-comment">// ambient light</span>
            <span class="hljs-keyword">var</span> ambient = <span class="hljs-keyword">new</span> THREE.AmbientLight(<span class="hljs-number">0x666666</span>);
            scene.add(ambient);

            requestAnimationFrame(draw);
        }

        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">draw</span>(<span class="hljs-params"></span>) </span>{
            alpha += <span class="hljs-number">0.01</span>;
            <span class="hljs-keyword">if</span> (alpha &gt; <span class="hljs-built_in">Math</span>.PI * <span class="hljs-number">2</span>) {
                alpha -= <span class="hljs-built_in">Math</span>.PI * <span class="hljs-number">2</span>;
            }

            cube.position.set(<span class="hljs-number">2</span> * <span class="hljs-built_in">Math</span>.cos(alpha), <span class="hljs-number">0</span>, <span class="hljs-number">2</span> * <span class="hljs-built_in">Math</span>.sin(alpha));

            renderer.render(scene, camera);

            requestAnimationFrame(draw);
        }
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span> <span class="hljs-attr">onload</span>=<span class="hljs-string">"init();"</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<ul><li>效果图：</li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012238946?w=503&amp;h=383" src="https://static.alili.tech/img/remote/1460000012238946?w=503&amp;h=383" alt="image" title="image" style="cursor: pointer;"></span></p>
<h2 id="articleHeader14">补充问题</h2>
<p>&lt;span id = "jump"&gt;&lt;/span&gt;</p>
<h3 id="articleHeader15">本地服务器</h3>
<ul>
<li>1、<a href="https://nodejs.org/en/" rel="nofollow noreferrer" target="_blank">下载安装</a>node.js，因为node.js自带npm</li>
<li>2、打开电脑命令行工具，输入<code>npm install -g live-server</code> 全局安装</li>
<li>3、在需要运行文件的文件夹下，按住shift键，点击鼠标右键<code>在此处打开命令窗口</code>
</li>
<li>4、输入<code>live-server</code>回车</li>
</ul>
<p><a href="https://www.npmjs.com/package/live-server" rel="nofollow noreferrer" target="_blank">nmp官方说明</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
three.js 入门详解(二)

## 原文链接
[https://segmentfault.com/a/1190000012238927](https://segmentfault.com/a/1190000012238927)

