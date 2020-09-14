---
title: 'WebGL入门demo' 
date: 2019-01-04 2:30:11
hidden: true
slug: t1iml4tjj7r
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">WebGL入门demo</h1>
<h3 id="articleHeader1">three.js入门</h3>
<h2 id="articleHeader2">开场白</h2>
<p>哇哦，绘制气球耶，在网页上？对啊！厉害了！3D效果图也能在网页上绘制出来啊，这么好玩的事情，赶紧来看看！</p>
<p>这里是属于WebGL的应用，webGL可以让我们在canvas上实现3D效果。而three.js是一款webGL框架，由于其易用性被广泛应用。如果要学习webGL，抛弃那些复杂的原生接口从这款框架入手是一个不错的选择。跟着我一起走！</p>
<p>?：<a href="https://threejs.org/examples/" rel="nofollow noreferrer" target="_blank">three.js参考文档 英文</a> <br><br>?：<a href="http://techbrood.com/threejs/docs/" rel="nofollow noreferrer" target="_blank">three.js参考文档 中文</a> <br></p>
<h3 id="articleHeader3">看地球咯！</h3>
<p>哈哈，别说了。先看地球：<br><span class="img-wrap"><img data-src="/img/bVSKjR?w=853&amp;h=532" src="https://static.alili.tech/img/bVSKjR?w=853&amp;h=532" alt="地球" title="地球" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader4">怎么画？</h2>
<p>首先要理清逻辑。three.js框架是个法宝，要画东西的工具，模块，材料等等里面都有，找到API去用。所以，我们只需要：<br></p>
<ul>
<li>一张图片，也就是包裹地球身体的那张图片，<br>
</li>
<li>一个球模型，<br>
</li>
<li>把图片贴到球模型上去，地球就出来了，<br>
</li>
<li>再给球加上一些动画效果，完工！<br>
</li>
</ul>
<h2 id="articleHeader5">开始画！</h2>
<p>上面讲完了画的大致流程，现在要开始画了。但是你还需要知道，不止这么简单！远不止这么简单！你需要：<br></p>
<p>1.设置three.js渲染器-renderer <br></p>
<p>2.设置摄像机camera <br></p>
<p>3.设置场景scene br&gt;</p>
<p>4.设置物体object-地球 <br></p>
<p>5.设置组织者 <br></p>
<h5>是不是一脸懵逼？别怕，来讲个故事?<br>
</h5>
<p>其实，就是拍电影啦。需要相机，演员（这里是地球），场景(scene)，导演（group）。导演组织这些活动，导演也要看场景的，他受场景的约束，演员也要听导演的。最后拍好了戏交给渲染器(renderer)来制片，发布。<br></p>
<p>好吧，这么形象估计懂了，来，我们具体来讲讲。<br></p>
<h2 id="articleHeader6">一步步画：</h2>
<p>每个元素都是再定义了之后，在初始化函数内部执行。<br></p>
<h3 id="articleHeader7">做准备：</h3>
<p>用到three.js框架，要先引入以下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;https://threejs.org/build/three.js&quot;></script>
<script src=&quot;https://threejs.org/examples/js/renderers/Projector.js&quot;></script>
<script src=&quot;https://threejs.org/examples/js/renderers/CanvasRenderer.js&quot;></script>
<script src=&quot;https://threejs.org/examples/js/libs/stats.min.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://threejs.org/build/three.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://threejs.org/examples/js/renderers/Projector.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://threejs.org/examples/js/renderers/CanvasRenderer.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://threejs.org/examples/js/libs/stats.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<h3 id="articleHeader8">画地球：</h3>
<p>看代码：<br></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 加载材质
var loader = new THREE.TextureLoader();
    loader.load('https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg',
     function(texture) {
        //画球体 形状
        var geometry = new THREE.SphereGeometry(200, 20, 20);
        // 贴图 材质纹理
        var material = new THREE.MeshBasicMaterial({
            map: texture,
            overdraw: 0.5
        })
        // 地球
        var mesh = new THREE.Mesh(geometry, material);
        group.add(mesh);
 &nbsp; &nbsp; &nbsp; &nbsp;}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-comment">// 加载材质</span>
<span class="hljs-keyword">var</span> loader = <span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.TextureLoader();
    loader.load(<span class="hljs-string">'https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg'</span>,
     <span class="hljs-function"><span class="hljs-keyword">function</span></span>(texture) {
        <span class="hljs-comment">//画球体 形状</span>
        <span class="hljs-keyword">var</span> geometry = <span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.SphereGeometry(<span class="hljs-number">200</span>, <span class="hljs-number">20</span>, <span class="hljs-number">20</span>);
        <span class="hljs-comment">// 贴图 材质纹理</span>
        <span class="hljs-keyword">var</span> material = <span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.MeshBasicMaterial({
            map: <span class="hljs-type">texture</span>,
            overdraw: <span class="hljs-type">0</span>.<span class="hljs-number">5</span>
        })
        <span class="hljs-comment">// 地球</span>
        <span class="hljs-keyword">var</span> mesh = <span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.Mesh(geometry, material);
        group.add(mesh);
 &nbsp; &nbsp; &nbsp; &nbsp;}</code></pre>
<p>画地球需要地球外面那张图片，还需要球模型geometry。图片需要裁剪之后变成material。再用这两个元素来new地球mesh,把地球交给group.</p>
<h3 id="articleHeader9">设置场景：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var scene;
scene = new THREE.Scene();
scene.add(group);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> <span class="hljs-built_in">scene</span>;
<span class="hljs-built_in">scene</span> = <span class="hljs-built_in">new</span> THREE.Scene();
<span class="hljs-built_in">scene</span>.add(group);</code></pre>
<h3 id="articleHeader10">设置分组（导演）：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var group;
group = new THREE.Group();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code><span class="hljs-built_in">var</span> <span class="hljs-keyword">group</span>;
<span class="hljs-keyword">group</span> = <span class="hljs-literal">new</span> THREE.<span class="hljs-keyword">Group</span>();</code></pre>
<h3 id="articleHeader11">设置相机：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var camera；
// 准备好镜头
    camera = new THREE.PerspectiveCamera(60, window.innerWidth/window.innerHeight,1,2000);//相机摆上 设置相机摆放位置 产生镜头
    camera.position.z = 500;//拍的景物离我500px" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code>var <span class="hljs-keyword">camera</span>；
<span class="hljs-comment">// 准备好镜头</span>
    <span class="hljs-keyword">camera</span> = new THREE.PerspectiveCamera(<span class="hljs-number">60</span>, <span class="hljs-keyword">window</span>.innerWidth/<span class="hljs-keyword">window</span>.innerHeight,<span class="hljs-number">1</span>,<span class="hljs-number">2000</span>);<span class="hljs-comment">//相机摆上 设置相机摆放位置 产生镜头</span>
    <span class="hljs-keyword">camera</span>.position.z = <span class="hljs-number">500</span>;<span class="hljs-comment">//拍的景物离我500px</span></code></pre>
<p>先设置一下相机，把他放到里面去。</p>
<h3 id="articleHeader12">设置渲染器：</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var renderer;
renderer = new THREE.CanvasRenderer();
        renderer.setClearColor(0xffffff);//设置canvas背景颜色
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);//container展示的大小
 &nbsp; &nbsp; &nbsp; &nbsp;container.appendChild(renderer.domElement)//追加 【canvas】 元素到 【container】 元素中
 &nbsp; &nbsp; &nbsp; &nbsp;stats = new Stats();
        container.appendChild(stats.dom);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code>var <span class="hljs-keyword">renderer</span>;
<span class="hljs-keyword">renderer</span> = new THREE.CanvasRenderer();
        <span class="hljs-keyword">renderer</span>.setClearColor(<span class="hljs-number">0xffffff</span>);<span class="hljs-comment">//设置canvas背景颜色</span>
        <span class="hljs-keyword">renderer</span>.setPixelRatio(<span class="hljs-keyword">window</span>.devicePixelRatio);
        <span class="hljs-keyword">renderer</span>.setSize(<span class="hljs-keyword">window</span>.innerWidth, <span class="hljs-keyword">window</span>.innerHeight);<span class="hljs-comment">//container展示的大小</span>
 &nbsp; &nbsp; &nbsp; &nbsp;<span class="hljs-keyword">container</span>.appendChild(<span class="hljs-keyword">renderer</span>.domElement)<span class="hljs-comment">//追加 【canvas】 元素到 【container】 元素中</span>
 &nbsp; &nbsp; &nbsp; &nbsp;stats = new Stats();
        <span class="hljs-keyword">container</span>.appendChild(stats.dom);</code></pre>
<p>先设置一下渲染器，设置在画布上面显示的属性，再把画布添加到浏览器页面上面去。还有在动画过程中的循环渲染在下面讲解。</p>
<h3 id="articleHeader13">加动画啦！</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var container,stas;
var mouseX=0,mouseY=0;
var windowHalfX=window.innerWidth/2;
var windowHalfY=window.innerHeight/2;
animate();
document.addEventListener('mousemove', onDocumentMouseMove, false);//用鼠标拖
window.addEventListener('resize',onWindowResize,false);

function onDocumentMouseMove (event) {
    mouseX = event.clientX - windowHalfX;//鼠标基于中心点的偏移量；
    mouseY = event.clientY - windowHalfY;//鼠标基于中心点的偏移量；
}

function onWindowResize (event) {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
}

function animate () {
// 每秒60针递归调用 使地球旋转
    requestAnimationFrame(animate);
    render();
    stats.update();
}
function render () {
    camera.position.x
     += (mouseX-camera.position.x)*0.05;//在x轴上，相机根据鼠标的位置移动来移动的距离
    camera.position.y 
    += (-mouseY - camera.position.y)*0.05;//在y轴上，相机根据鼠标的位置移动来移动的距离
    camera.lookAt(scene.position);//设置视野的中心坐标
    group.rotation.y -= 0.005;//让它饶着y轴旋转 （间接的得到旋转的速度）
    renderer.render(scene, camera);//将webgl视图往外输出
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> container,stas;
<span class="hljs-keyword">var</span> mouseX=<span class="hljs-number">0</span>,mouseY=<span class="hljs-number">0</span>;
<span class="hljs-keyword">var</span> windowHalfX=<span class="hljs-built_in">window</span>.innerWidth/<span class="hljs-number">2</span>;
<span class="hljs-keyword">var</span> windowHalfY=<span class="hljs-built_in">window</span>.innerHeight/<span class="hljs-number">2</span>;
animate();
<span class="hljs-built_in">document</span>.addEventListener(<span class="hljs-string">'mousemove'</span>, onDocumentMouseMove, <span class="hljs-literal">false</span>);<span class="hljs-comment">//用鼠标拖</span>
<span class="hljs-built_in">window</span>.addEventListener(<span class="hljs-string">'resize'</span>,onWindowResize,<span class="hljs-literal">false</span>);

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onDocumentMouseMove</span> (<span class="hljs-params">event</span>) </span>{
    mouseX = event.clientX - windowHalfX;<span class="hljs-comment">//鼠标基于中心点的偏移量；</span>
    mouseY = event.clientY - windowHalfY;<span class="hljs-comment">//鼠标基于中心点的偏移量；</span>
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">onWindowResize</span> (<span class="hljs-params">event</span>) </span>{
    windowHalfX = <span class="hljs-built_in">window</span>.innerWidth / <span class="hljs-number">2</span>;
    windowHalfY = <span class="hljs-built_in">window</span>.innerHeight / <span class="hljs-number">2</span>;
    camera.aspect = <span class="hljs-built_in">window</span>.innerWidth / <span class="hljs-built_in">window</span>.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(<span class="hljs-built_in">window</span>.innerWidth,<span class="hljs-built_in">window</span>.innerHeight);
}

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">animate</span> (<span class="hljs-params"></span>) </span>{
<span class="hljs-comment">// 每秒60针递归调用 使地球旋转</span>
    requestAnimationFrame(animate);
    render();
    stats.update();
}
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">render</span> (<span class="hljs-params"></span>) </span>{
    camera.position.x
     += (mouseX-camera.position.x)*<span class="hljs-number">0.05</span>;<span class="hljs-comment">//在x轴上，相机根据鼠标的位置移动来移动的距离</span>
    camera.position.y 
    += (-mouseY - camera.position.y)*<span class="hljs-number">0.05</span>;<span class="hljs-comment">//在y轴上，相机根据鼠标的位置移动来移动的距离</span>
    camera.lookAt(scene.position);<span class="hljs-comment">//设置视野的中心坐标</span>
    group.rotation.y -= <span class="hljs-number">0.005</span>;<span class="hljs-comment">//让它饶着y轴旋转 （间接的得到旋转的速度）</span>
    renderer.render(scene, camera);<span class="hljs-comment">//将webgl视图往外输出</span>
}</code></pre>
<p>设置在鼠标动的时候监听到，而且此时camera随即改变而改变。camera要改变根据鼠标的移动来移动它的距离在函数onDocumentMouseMove中得到，而且地球要有一种远小近大的感觉。随着鼠标移动，camera变化，地球的大小也在改变，也就是前面说的远小近大的感觉。在函数onWindowResize中实现。然后地球要动画起来要调用animate函数，每秒60针递归调用 使地球旋转，然后render函数就一直在不停的循环。状态也在不停的更新。</p>
<h2 id="articleHeader14">小结：</h2>
<p>WebGL是是一种3D绘图标准，这种绘图技术里面用了JavaScript，所以会JavaScript，走遍天下都不怕啊?<br></p>
<p>?：<a href="https://github.com/carolineLH/WebGL/blob/master/WebGL/earth-T.html" rel="nofollow noreferrer" target="_blank">源码</a> <br></p>
<p>思考好逻辑，就可以动手的!好玩就要去尝试，就在慢慢成长。大家共同进步吧！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
WebGL入门demo

## 原文链接
[https://segmentfault.com/a/1190000010625432](https://segmentfault.com/a/1190000010625432)

