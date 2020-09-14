---
title: 'three.js入门——画一个3D正方体' 
date: 2018-12-25 2:30:11
hidden: true
slug: 3xebwu7uf
categories: [reprint]
---

{{< raw >}}

                    
<p>three.js 是一款WebGL框架，WebGL可以让我们在canvas上实现3D效果。<br>实现3D效果在国内来说还算是比较新的东西，可供查阅的资料也不多。<br>这篇文章仅是一个入门篇，介绍如何绘制一个3D正方体。<br><br><br>介绍完毕，首先奉上实现的效果图：<br><span class="img-wrap"><img data-src="/img/bVYHz7?w=401&amp;h=301" src="https://static.alili.tech/img/bVYHz7?w=401&amp;h=301" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这就是实现的效果图，还是挺有立体感的吧？</p>
<h2 id="articleHeader0">绘制前的准备</h2>
<p>写代码前，要先下载最新的three.js框架包，引入自己的页面。</p>
<h2 id="articleHeader1">具体实现过程</h2>
<h3 id="articleHeader2">准备一个canvas画布</h3>
<p>这个画布是我们展现整个3D正方形的画布，也就是上图那个黑色的方框。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
  <meta charset=&quot;UTF-8&quot;>
  <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
  <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
  <title>Camera 相机</title>
  <style>
    #canvas {
      width: 400px;
      height: 300px;
      border: 1px solid red;
      margin: 50px auto;
      display:block;
    }
  </style>
</head>
<body>
  <canvas id=&quot;canvas&quot;></canvas>
  <script src=&quot;./libs/three.min.js&quot;></script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Camera 相机<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-id">#canvas</span> {
      <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
      <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid red;
      <span class="hljs-attribute">margin</span>: <span class="hljs-number">50px</span> auto;
      <span class="hljs-attribute">display</span>:block;
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"canvas"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./libs/three.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h3 id="articleHeader3">明确绘制思路</h3>
<p>接下来的绘制过程会涉及到多个概念：canvas、scene、camera、renderer。<br>为了能更好理解绘制过程的代码和有助于记忆，我们先来理解这几个概念：<br><br><br><strong>假设我们现在正在旅游的途中，看到了一个很唯美的画面，想把这个3D世界记录下来</strong></p>
<ul>
<li><p>这个唯美的场景就是scene，我们用相机camera拍摄下来形成照片</p></li>
<li><p>为了能看清楚这个照片，我们把这个照片放置在一个画布canvas上</p></li>
<li><p>最后，我们再用renderer修饰渲染一下</p></li>
</ul>
<p>这样，我们就能成功展现这个3D世界了。<br>【程序还是很贴近生活哒?】<br>通过现实世界的理解，我们接下来开始代码啦o(<em>￣▽￣</em>)ブ</p>
<h3 id="articleHeader4">准备好canvas、scene、camera、renderer，给一个初始化的方法</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script>
var camera, scene, renderer, canvas;
init();
function init () {
  canvas = document.getElementById('canvas');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">var</span> camera, scene, renderer, canvas;
init();
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span> (<span class="hljs-params"></span>) </span>{
  canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'canvas'</span>);
}</span></code></pre>
<p>接下来我们要做的就是完善这个init()方法啦。<br><br><br><strong>创建一个3D场景scene</strong><br>场景最简单了，只需要用Scene声明一个scene对象。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="scene = new THREE.Scene();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs abnf"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">scene</span> = new THREE.Scene()<span class="hljs-comment">;</span></code></pre>
<p><strong>准备好camera</strong><br>我们这里设置的相机是一个透视的相机PerspectiveCamera<br>camera有四个参数</p>
<ul>
<li><p>第一个参数是视线辐射的角度，这个参数越大，我们能看到的视觉越广，这个物体看上去会更小。</p></li>
<li><p>第二个参数是图像内容展示的比例：width/height。我们一般把这个比例设置为和画布的比例一样，这样看到的图片才不会变形。</p></li>
<li><p>第三四个参数分别是相机离展示内容（正方体）最近的距离和最远的距离。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="camera = new THREE.PerspectiveCamera(45, 400/300, 1, 10);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code style="word-break: break-word; white-space: initial;">camera = new THREE.PerspectiveCamera(<span class="hljs-number">45</span>, <span class="hljs-number">400</span>/<span class="hljs-number">300</span>, <span class="hljs-number">1</span>, <span class="hljs-number">10</span>);</code></pre>
<p><strong>接下来给camera设置摆放的位置，并把camera放到场景scene中</strong><br>由于我们的世界是3D的，camera的摆放位置也是三维的，涉及三个参数：X轴、Y轴、Z轴。(0, 0, 0)是相机的原点，(1, 1, 5)就是把我们的相机往右和往上移动了1个单位，往后移动了5个单位。<br>ps: 这个时候画布canvas的大小正好是正方体的5倍。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="camera.position.set(1, 1, 5);
scene.add(camera);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">camera.position.set(<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">5</span>);
scene.add(camera);</code></pre>
<p><strong>在场景中添加一个立方体</strong><br>每个形状都是一个mesh，geometry可以理解为物体的骨骼， material可以理解为物体的皮囊<br>再创建一个可填充的形状cube<br>这样就构成了完整的实物<br>我们再将这个形状放入场景scene中<br>CubeGeometry参数设置为1：1：1表示这是一个正方体，当然可以自行修改比例，变成不一样的立方体</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var geometry = new THREE.CubeGeometry(1, 1, 1);
// 添加three自带的最简单的一种材质
var material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
});
var cube = new THREE.Mesh(geometry, material);    
var cube = new THREE.Mesh(geometry, material);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> geometry = <span class="hljs-keyword">new</span> THREE.CubeGeometry(<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>);
<span class="hljs-comment">// 添加three自带的最简单的一种材质</span>
<span class="hljs-keyword">var</span> material = <span class="hljs-keyword">new</span> THREE.MeshBasicMaterial({
  <span class="hljs-attr">color</span>: <span class="hljs-number">0xff0000</span>,
});
<span class="hljs-keyword">var</span> cube = <span class="hljs-keyword">new</span> THREE.Mesh(geometry, material);    
<span class="hljs-keyword">var</span> cube = <span class="hljs-keyword">new</span> THREE.Mesh(geometry, material);</code></pre>
<p><strong>最后，创建renderer对图像进行渲染</strong><br>将canvas交给renderer，也就是一个渲染的容器<br>antialias: true 平滑，抗锯齿，输出的画面会进行优化，不会带毛边</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="renderer =  new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true
});
// 设置renderer的样式
renderer.setSize(canvas.width, canvas.height);
renderer.render(scene, camera);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code><span class="hljs-keyword">renderer</span> =  new THREE.WebGLRenderer({
  <span class="hljs-keyword">canvas</span>: <span class="hljs-keyword">canvas</span>,
  antialias: true
});
<span class="hljs-comment">// 设置renderer的样式</span>
<span class="hljs-keyword">renderer</span>.setSize(<span class="hljs-keyword">canvas</span>.width, <span class="hljs-keyword">canvas</span>.height);
<span class="hljs-keyword">renderer</span>.<span class="hljs-keyword">render</span>(scene, <span class="hljs-keyword">camera</span>);</code></pre>
<p>经过以上步骤，我们的的正方体就成功创建好了。<br><span class="img-wrap"><img data-src="/img/bVYHz7?w=401&amp;h=301" src="https://static.alili.tech/img/bVYHz7?w=401&amp;h=301" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>以下是本例完整代码：</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
  <meta charset=&quot;UTF-8&quot;>
  <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
  <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
  <title>Camera 相机</title>
  <style>
    #canvas {
      width: 400px;
      height: 300px;
      border: 1px solid red;
      margin: 50px auto;
      display:block;
    }
  </style>
</head>
<body>
  <canvas id=&quot;canvas&quot;></canvas>
  <script src=&quot;./libs/three.min.js&quot;></script>
  <script>
  var camera, scene, renderer, canvas;
  init();
  function init () {
    canvas = document.getElementById('canvas');
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(45, 400/300, 1, 10);
    camera.position.set(1, 1, 5);
    scene.add(camera);

    var geometry = new THREE.CubeGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
    });
    // cube 是一个可以填充的形状
    var cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    renderer =  new THREE.WebGLRenderer({
      // 将canvas交给renderer  一个渲染的容器
      canvas: canvas,
      // 平滑， 抗锯齿  输出的画面会进行优化，不会带毛边
      antialias: true
    });
    // 设置renderer的样子
    renderer.setSize(canvas.width, canvas.height);
    renderer.render(scene, camera);
  }
  </script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Camera 相机<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
    <span class="hljs-selector-id">#canvas</span> {
      <span class="hljs-attribute">width</span>: <span class="hljs-number">400px</span>;
      <span class="hljs-attribute">height</span>: <span class="hljs-number">300px</span>;
      <span class="hljs-attribute">border</span>: <span class="hljs-number">1px</span> solid red;
      <span class="hljs-attribute">margin</span>: <span class="hljs-number">50px</span> auto;
      <span class="hljs-attribute">display</span>:block;
    }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"canvas"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./libs/three.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
  <span class="hljs-keyword">var</span> camera, scene, renderer, canvas;
  init();
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">init</span> (<span class="hljs-params"></span>) </span>{
    canvas = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'canvas'</span>);
    scene = <span class="hljs-keyword">new</span> THREE.Scene();
    camera = <span class="hljs-keyword">new</span> THREE.PerspectiveCamera(<span class="hljs-number">45</span>, <span class="hljs-number">400</span>/<span class="hljs-number">300</span>, <span class="hljs-number">1</span>, <span class="hljs-number">10</span>);
    camera.position.set(<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">5</span>);
    scene.add(camera);

    <span class="hljs-keyword">var</span> geometry = <span class="hljs-keyword">new</span> THREE.CubeGeometry(<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>);
    <span class="hljs-keyword">var</span> material = <span class="hljs-keyword">new</span> THREE.MeshBasicMaterial({
      <span class="hljs-attr">color</span>: <span class="hljs-number">0xff0000</span>,
    });
    <span class="hljs-comment">// cube 是一个可以填充的形状</span>
    <span class="hljs-keyword">var</span> cube = <span class="hljs-keyword">new</span> THREE.Mesh(geometry, material);
    scene.add(cube);

    renderer =  <span class="hljs-keyword">new</span> THREE.WebGLRenderer({
      <span class="hljs-comment">// 将canvas交给renderer  一个渲染的容器</span>
      canvas: canvas,
      <span class="hljs-comment">// 平滑， 抗锯齿  输出的画面会进行优化，不会带毛边</span>
      antialias: <span class="hljs-literal">true</span>
    });
    <span class="hljs-comment">// 设置renderer的样子</span>
    renderer.setSize(canvas.width, canvas.height);
    renderer.render(scene, camera);
  }
  </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
three.js入门——画一个3D正方体

## 原文链接
[https://segmentfault.com/a/1190000012046676](https://segmentfault.com/a/1190000012046676)

