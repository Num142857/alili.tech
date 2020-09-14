---
title: 'threejs 绘制地球、飞机、轨迹' 
date: 2019-01-26 2:30:18
hidden: true
slug: 9aova4fq5hv
categories: [reprint]
---

{{< raw >}}

                    
<p>threejs官网：<a href="https://threejs.org/" rel="nofollow noreferrer" target="_blank"></a><a href="https://threejs.org/" rel="nofollow noreferrer" target="_blank">https://threejs.org/</a></p>
<p>首先我们来看下要实现的效果</p>
<p><span class="img-wrap"><img data-src="/img/bVJvcv?w=925&amp;h=683" src="https://static.alili.tech/img/bVJvcv?w=925&amp;h=683" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>这个缩小后的图片，下面我们来看下近距离的动态效果。。</p>
<p><span class="img-wrap"><img data-src="/img/bVJvdM?w=580&amp;h=492" src="https://static.alili.tech/img/bVJvdM?w=580&amp;h=492" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>效果比较简陋，需要后期再处理。。。</p>
<p>下面进入主题，代码篇。。</p>
<p>HTML部分：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
    <meta charset=&quot;UTF-8&quot;>
    <title>全球航班</title>
    
    <style>
        html{overflow: hidden;}
        body { margin: 0;}
    </style>

    <script src=&quot;js/jquery.min.js&quot;></script>
</head>
<body>
    <!-- 地国 -->
    <div id=&quot;zh_globe_container&quot;></div> <!-- 容器 -->
    
    <script src=&quot;js/threejs/Detector.js&quot;></script> <!-- webGL浏览器支持检测 -->
    <script src=&quot;js/threejs/three.min.js&quot;></script> <!-- 核心js -->
    <script src=&quot;js/threejs/stats.min.js&quot;></script> <!-- 性能测试 -->
    <script src=&quot;js/threejs/OrbitControls.js&quot;></script> <!-- 地球控制 -->
    <script src=&quot;js/socketio-1.4.5.js&quot;></script> <!-- socket -->

    <script src=&quot;js/globe.js&quot;></script> <!--  -->
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>全球航班<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    
    <span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">
        <span class="hljs-selector-tag">html</span>{<span class="hljs-attribute">overflow</span>: hidden;}
        <span class="hljs-selector-tag">body</span> { <span class="hljs-attribute">margin</span>: <span class="hljs-number">0</span>;}
    </span><span class="hljs-tag">&lt;/<span class="hljs-name">style</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/jquery.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-comment">&lt;!-- 地国 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"zh_globe_container"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span> <span class="hljs-comment">&lt;!-- 容器 --&gt;</span>
    
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/threejs/Detector.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span> <span class="hljs-comment">&lt;!-- webGL浏览器支持检测 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/threejs/three.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span> <span class="hljs-comment">&lt;!-- 核心js --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/threejs/stats.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span> <span class="hljs-comment">&lt;!-- 性能测试 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/threejs/OrbitControls.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span> <span class="hljs-comment">&lt;!-- 地球控制 --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/socketio-1.4.5.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span> <span class="hljs-comment">&lt;!-- socket --&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/globe.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span> <span class="hljs-comment">&lt;!--  --&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>JS部分(globe.js)</p>
<p>1、实现地球<br>地球贴图(可以在网上下载)<br><span class="img-wrap"><img data-src="/img/bVJvfe?w=2048&amp;h=1024" src="https://static.alili.tech/img/bVJvfe?w=2048&amp;h=1024" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 地球
function globe() {
    var globeTextureLoader = new THREE.TextureLoader();
    globeTextureLoader.load('images/textures/earth.jpg', function (texture) {
        var globeGgeometry = new THREE.SphereGeometry(200, 100, 100);
        var globeMaterial = new THREE.MeshStandardMaterial({map: texture});
        var globeMesh = new THREE.Mesh(globeGgeometry, globeMaterial);
        group.add(globeMesh);
        group.rotation.x = THREE.Math.degToRad(35);
        group.rotation.y = THREE.Math.degToRad(170);
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-comment">// 地球</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">globe</span></span>() {
    <span class="hljs-keyword">var</span> globeTextureLoader = <span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.TextureLoader();
    globeTextureLoader.load(<span class="hljs-string">'images/textures/earth.jpg'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> </span>(texture) {
        <span class="hljs-keyword">var</span> globeGgeometry = <span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.SphereGeometry(<span class="hljs-number">200</span>, <span class="hljs-number">100</span>, <span class="hljs-number">100</span>);
        <span class="hljs-keyword">var</span> globeMaterial = <span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.MeshStandardMaterial({map: <span class="hljs-type">texture</span>});
        <span class="hljs-keyword">var</span> globeMesh = <span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.Mesh(globeGgeometry, globeMaterial);
        group.add(globeMesh);
        group.rotation.x = THREE.Math.degToRad(<span class="hljs-number">35</span>);
        group.rotation.y = THREE.Math.degToRad(<span class="hljs-number">170</span>);
    });
}</code></pre>
<p>2、添加球面光源(这里使用的是半球光)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 光
function lights() {
    var hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x333333, 2);
    hemisphereLight.position.x = 0;
    hemisphereLight.position.y = 0;
    hemisphereLight.position.z = -200;
    group.add(hemisphereLight);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code><span class="hljs-comment">// 光</span>
function lights() {
    var hemisphereLight = new THREE.HemisphereLight(<span class="hljs-number">0xffffff</span>, <span class="hljs-number">0x333333</span>, <span class="hljs-number">2</span>);
    hemisphereLight.position.x = <span class="hljs-number">0</span>;
    hemisphereLight.position.y = <span class="hljs-number">0</span>;
    hemisphereLight.position.z = <span class="hljs-number">-200</span>;
    group.add(hemisphereLight);
}</code></pre>
<p>3、添加星点</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 星点
function stars() {
    var starsGeometry = new THREE.Geometry();
    for (var i = 0; i < 2000; i ++) {
        var starVector = new THREE.Vector3(
            THREE.Math.randFloatSpread(2000),
            THREE.Math.randFloatSpread(2000),
            THREE.Math.randFloatSpread(2000)
        );
        starsGeometry.vertices.push(starVector);
    }
    var starsMaterial = new THREE.PointsMaterial({color: 0x888888})
    var starsPoint = new THREE.Points(starsGeometry, starsMaterial);
    group.add(starsPoint);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-comment">// 星点</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">stars</span></span>() {
    <span class="hljs-keyword">var</span> starsGeometry = <span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.Geometry();
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">2000</span>; i ++) {
        <span class="hljs-keyword">var</span> starVector = <span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.Vector3(
            THREE.Math.randFloatSpread(<span class="hljs-number">2000</span>),
            THREE.Math.randFloatSpread(<span class="hljs-number">2000</span>),
            THREE.Math.randFloatSpread(<span class="hljs-number">2000</span>)
        );
        starsGeometry.vertices.push(starVector);
    }
    <span class="hljs-keyword">var</span> starsMaterial = <span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.PointsMaterial({color: <span class="hljs-type">0x888888</span>})
    <span class="hljs-keyword">var</span> starsPoint = <span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.Points(starsGeometry, starsMaterial);
    group.add(starsPoint);
}</code></pre>
<p>4、添加飞机</p>
<p>这里需要我们把 经纬度坐标 转成 xyz 坐标</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 获取position
function getPosition(lng, lat, alt) {
    var phi = (90-lat)*(Math.PI/180),
        theta = (lng+180)*(Math.PI/180),
        radius = alt+200,
        x = -(radius * Math.sin(phi) * Math.cos(theta)),
        z = (radius * Math.sin(phi) * Math.sin(theta)),
        y = (radius * Math.cos(phi));
    return {x: x, y: y, z: z};
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 获取position</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getPosition</span>(<span class="hljs-params">lng, lat, alt</span>) </span>{
    <span class="hljs-keyword">var</span> phi = (<span class="hljs-number">90</span>-lat)*(<span class="hljs-built_in">Math</span>.PI/<span class="hljs-number">180</span>),
        theta = (lng+<span class="hljs-number">180</span>)*(<span class="hljs-built_in">Math</span>.PI/<span class="hljs-number">180</span>),
        radius = alt+<span class="hljs-number">200</span>,
        x = -(radius * <span class="hljs-built_in">Math</span>.sin(phi) * <span class="hljs-built_in">Math</span>.cos(theta)),
        z = (radius * <span class="hljs-built_in">Math</span>.sin(phi) * <span class="hljs-built_in">Math</span>.sin(theta)),
        y = (radius * <span class="hljs-built_in">Math</span>.cos(phi));
    <span class="hljs-keyword">return</span> {<span class="hljs-attr">x</span>: x, <span class="hljs-attr">y</span>: y, <span class="hljs-attr">z</span>: z};
}</code></pre>
<p>画飞机</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 飞机形状(不想画的，可以下载个 飞机模型 使用加载器加载进来)
var planeShape = new THREE.Shape();
planeShape.moveTo( 0, 0);
planeShape.lineTo(0.2, -0.2);
planeShape.lineTo(0.2, -1.3);
planeShape.lineTo(1.6,-2.7);
planeShape.lineTo(1.6,-3);
planeShape.lineTo(0.2, -2.1);
planeShape.lineTo(0.2, -3);
planeShape.lineTo(0.5, -3.4);
planeShape.lineTo(0.5, -3.7);
planeShape.lineTo(0, -3.3);
planeShape.lineTo(-0.5, -3.7);
planeShape.lineTo(-0.5, -3.4);
planeShape.lineTo(-0.2, -3);
planeShape.lineTo(-0.2, -2.1);
planeShape.lineTo(-1.6,-3);
planeShape.lineTo(-1.6,-2.7);
planeShape.lineTo(-0.2, -1.3);
planeShape.lineTo(-0.2, -0.2);
var planeGeometry = new THREE.ShapeGeometry(planeShape);
// 飞机材质
var planeMaterial = new THREE.MeshPhongMaterial({color: 0x0FB4DD, side: THREE.DoubleSide, depthTest: true});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pony"><code><span class="hljs-comment">// 飞机形状(不想画的，可以下载个 飞机模型 使用加载器加载进来)</span>
<span class="hljs-keyword">var</span> planeShape = <span class="hljs-function"><span class="hljs-keyword">new</span> <span class="hljs-title">THREE</span>.<span class="hljs-title">Shape</span>();
<span class="hljs-title">planeShape</span>.<span class="hljs-title">moveTo</span>( <span class="hljs-number">0</span>, <span class="hljs-number">0</span>);
<span class="hljs-title">planeShape</span>.<span class="hljs-title">lineTo</span>(<span class="hljs-number">0.2</span>, <span class="hljs-number">-0.2</span>);
<span class="hljs-title">planeShape</span>.<span class="hljs-title">lineTo</span>(<span class="hljs-number">0.2</span>, <span class="hljs-number">-1.3</span>);
<span class="hljs-title">planeShape</span>.<span class="hljs-title">lineTo</span>(<span class="hljs-number">1.6</span>,<span class="hljs-number">-2.7</span>);
<span class="hljs-title">planeShape</span>.<span class="hljs-title">lineTo</span>(<span class="hljs-number">1.6</span>,<span class="hljs-number">-3</span>);
<span class="hljs-title">planeShape</span>.<span class="hljs-title">lineTo</span>(<span class="hljs-number">0.2</span>, <span class="hljs-number">-2.1</span>);
<span class="hljs-title">planeShape</span>.<span class="hljs-title">lineTo</span>(<span class="hljs-number">0.2</span>, <span class="hljs-number">-3</span>);
<span class="hljs-title">planeShape</span>.<span class="hljs-title">lineTo</span>(<span class="hljs-number">0.5</span>, <span class="hljs-number">-3.4</span>);
<span class="hljs-title">planeShape</span>.<span class="hljs-title">lineTo</span>(<span class="hljs-number">0.5</span>, <span class="hljs-number">-3.7</span>);
<span class="hljs-title">planeShape</span>.<span class="hljs-title">lineTo</span>(<span class="hljs-number">0</span>, <span class="hljs-number">-3.3</span>);
<span class="hljs-title">planeShape</span>.<span class="hljs-title">lineTo</span>(<span class="hljs-number">-0.5</span>, <span class="hljs-number">-3.7</span>);
<span class="hljs-title">planeShape</span>.<span class="hljs-title">lineTo</span>(<span class="hljs-number">-0.5</span>, <span class="hljs-number">-3.4</span>);
<span class="hljs-title">planeShape</span>.<span class="hljs-title">lineTo</span>(<span class="hljs-number">-0.2</span>, <span class="hljs-number">-3</span>);
<span class="hljs-title">planeShape</span>.<span class="hljs-title">lineTo</span>(<span class="hljs-number">-0.2</span>, <span class="hljs-number">-2.1</span>);
<span class="hljs-title">planeShape</span>.<span class="hljs-title">lineTo</span>(<span class="hljs-number">-1.6</span>,<span class="hljs-number">-3</span>);
<span class="hljs-title">planeShape</span>.<span class="hljs-title">lineTo</span>(<span class="hljs-number">-1.6</span>,<span class="hljs-number">-2.7</span>);
<span class="hljs-title">planeShape</span>.<span class="hljs-title">lineTo</span>(<span class="hljs-number">-0.2</span>, <span class="hljs-number">-1.3</span>);
<span class="hljs-title">planeShape</span>.<span class="hljs-title">lineTo</span>(<span class="hljs-number">-0.2</span>, <span class="hljs-number">-0.2</span>);
<span class="hljs-title">var</span> <span class="hljs-title">planeGeometry</span> = <span class="hljs-title">new</span> <span class="hljs-title">THREE</span>.<span class="hljs-title">ShapeGeometry</span>(planeShape);
<span class="hljs-comment">// 飞机材质</span>
<span class="hljs-title">var</span> <span class="hljs-title">planeMaterial</span> = <span class="hljs-title">new</span> <span class="hljs-title">THREE</span>.<span class="hljs-title">MeshPhongMaterial</span>({color: <span class="hljs-number">0x0FB4DD</span>, side: <span class="hljs-type">THREE</span>.<span class="hljs-type">DoubleSide</span>, depthTest: true});</span></code></pre>
<p>depthTest作用是能否透过球体看到飞机，如果是false则旋转到球体另一面也能看到飞机</p>
<p>添加飞机</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 添加飞机
function addPlane(item) {
    if(item.anum &amp;&amp; item.lng &amp;&amp; item.lat) {
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        // 旋转
        plane.rotation.z = THREE.Math.degToRad(item.ang);
        // 定位
        var position = getPosition(item.lng, item.lat, 5);
        plane.position.set(position.x, position.y, position.z);
        // 显示/隐藏
        // plane.visible = false;
        // 保存
        planeMarkers[item.anum] = plane;
        // 添加到场景
        group.add(plane);
        // 绘制历史轨迹
        drawHistoryTrack(item.anum);
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs pony"><code><span class="hljs-comment">// 添加飞机</span>
function addPlane(item) {
    <span class="hljs-keyword">if</span>(item.anum &amp;&amp; item.lng &amp;&amp; item.lat) {
        <span class="hljs-keyword">var</span> plane = <span class="hljs-function"><span class="hljs-keyword">new</span> <span class="hljs-title">THREE</span>.<span class="hljs-title">Mesh</span>(planeGeometry, planeMaterial);
        <span class="hljs-comment">// 旋转</span>
        <span class="hljs-title">plane</span>.<span class="hljs-title">rotation</span>.<span class="hljs-title">z</span> = <span class="hljs-title">THREE</span>.<span class="hljs-title">Math</span>.<span class="hljs-title">degToRad</span>(item.ang);
        <span class="hljs-comment">// 定位</span>
        <span class="hljs-title">var</span> <span class="hljs-title">position</span> = <span class="hljs-title">getPosition</span>(item.lng, item.lat, <span class="hljs-number">5</span>);
        <span class="hljs-title">plane</span>.<span class="hljs-title">position</span>.<span class="hljs-title">set</span>(position.x, position.y, position.z);
        <span class="hljs-comment">// 显示/隐藏</span>
        <span class="hljs-comment">// plane.visible = false;</span>
        <span class="hljs-comment">// 保存</span>
        <span class="hljs-title">planeMarkers</span>[<span class="hljs-title">item</span>.<span class="hljs-title">anum</span>] = <span class="hljs-title">plane</span>;
        <span class="hljs-comment">// 添加到场景</span>
        <span class="hljs-title">group</span>.<span class="hljs-title">add</span>(plane);
        <span class="hljs-comment">// 绘制历史轨迹</span>
        <span class="hljs-title">drawHistoryTrack</span>(item.anum);
    }
}</span></code></pre>
<p>绘制轨迹(使用socket来获取的飞行轨迹经纬度坐标点)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 时间段
var curTime = Date.parse(new Date())/1000;
var depTime = curTime - 30*60;
// 轨迹线质
var trackMaterial = new THREE.LineBasicMaterial({color : 0x1B94B1});
// 绘制历史轨迹
function drawHistoryTrack(anum) {
    socket.emit(&quot;fullPath&quot;, anum, depTime, curTime, function(status, data){
        if(status) {
            var dLength = data.length;
            if(dLength>=2) {
                var trackCoordArr = [];
                for(var i=0; i<dLength; i++) {
                    if(data[i].lng &amp;&amp; data[i].alt) {
                        trackCoordArr.push({lng: data[i].lng, lat: data[i].lat});
                    }
                }

                var tcaLength = trackCoordArr.length;
                if(tcaLength>=2) {
                    var tcaHalfLength = Math.ceil(tcaLength/2),
                        vertexArr = [];

                    // 这里只取了三个点(起点、中点、终点)
                    var p1 = getPosition(trackCoordArr[0].lng, trackCoordArr[0].lat, 0),
                        p2 = getPosition(trackCoordArr[tcaHalfLength].lng, trackCoordArr[tcaHalfLength].lat, tcaLength*0.01),
                        p3 = getPosition(trackCoordArr[tcaLength-1].lng, trackCoordArr[tcaLength-1].lat, 0);

                    var trackCurve = new THREE.CatmullRomCurve3([
                        new THREE.Vector3(p1.x, p1.y, p1.z),
                        new THREE.Vector3(p2.x, p2.y, p2.z),
                        new THREE.Vector3(p3.x, p3.y, p3.z)
                    ]);

                    var trackGeometry = new THREE.Geometry(),
                        verticesArr = trackCurve.getPoints(tcaLength);

                    trackGeometry.vertices = verticesArr;
                    
                    var trackLine = new THREE.Line(trackGeometry, trackMaterial);
                    group.add(trackLine);

                    // 动画点
                    addLightPoint(p1, tcaLength, verticesArr);
                }
            }
        }
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-comment">// 时间段</span>
<span class="hljs-keyword">var</span> curTime = Date.parse(<span class="hljs-keyword">new</span> <span class="hljs-type">Date</span>())/<span class="hljs-number">1000</span>;
<span class="hljs-keyword">var</span> depTime = curTime - <span class="hljs-number">30</span>*<span class="hljs-number">60</span>;
<span class="hljs-comment">// 轨迹线质</span>
<span class="hljs-keyword">var</span> trackMaterial = <span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.LineBasicMaterial({color : <span class="hljs-type">0x1B94B1</span>});
<span class="hljs-comment">// 绘制历史轨迹</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">drawHistoryTrack</span></span>(anum) {
    socket.emit(<span class="hljs-string">"fullPath"</span>, anum, depTime, curTime, <span class="hljs-function"><span class="hljs-keyword">function</span></span>(status, data){
        <span class="hljs-keyword">if</span>(status) {
            <span class="hljs-keyword">var</span> dLength = data.length;
            <span class="hljs-keyword">if</span>(dLength&gt;=<span class="hljs-number">2</span>) {
                <span class="hljs-keyword">var</span> trackCoordArr = [];
                <span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> i=<span class="hljs-number">0</span>; i&lt;dLength; i++) {
                    <span class="hljs-keyword">if</span>(data[i].lng &amp;&amp; data[i].alt) {
                        trackCoordArr.push({lng: <span class="hljs-type">data</span>[i].lng, lat: <span class="hljs-type">data</span>[i].lat});
                    }
                }

                <span class="hljs-keyword">var</span> tcaLength = trackCoordArr.length;
                <span class="hljs-keyword">if</span>(tcaLength&gt;=<span class="hljs-number">2</span>) {
                    <span class="hljs-keyword">var</span> tcaHalfLength = Math.ceil(tcaLength/<span class="hljs-number">2</span>),
                        vertexArr = [];

                    <span class="hljs-comment">// 这里只取了三个点(起点、中点、终点)</span>
                    <span class="hljs-keyword">var</span> p1 = getPosition(trackCoordArr[<span class="hljs-number">0</span>].lng, trackCoordArr[<span class="hljs-number">0</span>].lat, <span class="hljs-number">0</span>),
                        p2 = getPosition(trackCoordArr[tcaHalfLength].lng, trackCoordArr[tcaHalfLength].lat, tcaLength*<span class="hljs-number">0.01</span>),
                        p3 = getPosition(trackCoordArr[tcaLength<span class="hljs-number">-1</span>].lng, trackCoordArr[tcaLength<span class="hljs-number">-1</span>].lat, <span class="hljs-number">0</span>);

                    <span class="hljs-keyword">var</span> trackCurve = <span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.CatmullRomCurve3([
                        <span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.Vector3(p1.x, p1.y, p1.z),
                        <span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.Vector3(p2.x, p2.y, p2.z),
                        <span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.Vector3(p3.x, p3.y, p3.z)
                    ]);

                    <span class="hljs-keyword">var</span> trackGeometry = <span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.Geometry(),
                        verticesArr = trackCurve.getPoints(tcaLength);

                    trackGeometry.vertices = verticesArr;
                    
                    <span class="hljs-keyword">var</span> trackLine = <span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.Line(trackGeometry, trackMaterial);
                    group.add(trackLine);

                    <span class="hljs-comment">// 动画点</span>
                    addLightPoint(p1, tcaLength, verticesArr);
                }
            }
        }
    });
}</code></pre>
<p>如果要绘制所有点，且头尾是在球面上的曲线，则需要两次循环</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var tcaRemainLength = tcaLength-tcaHalfLength
for(var j=0; j<tcaHalfLength; j++) { // 前一半
    var p1 = getPosition(trackCoordArr[j].lng, trackCoordArr[j].lat, j*0.05);
    vertexArr.push(new THREE.Vector3(p1.x, p1.y, p1.z));    
}
for(var k=tcaRemainLength; k>0; k--) { // 后一半
    var p2 = getPosition(trackCoordArr[tcaLength-k].lng, trackCoordArr[tcaLength-k].lat, k*0.05);
    vertexArr.push(new THREE.Vector3(p2.x, p2.y, p2.z));    
}

var trackCurve = new THREE.CatmullRomCurve3(vertexArr);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> tcaRemainLength = tcaLength-tcaHalfLength
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> j=<span class="hljs-number">0</span>; j&lt;tcaHalfLength; j++) { <span class="hljs-comment">// 前一半</span>
    <span class="hljs-keyword">var</span> p1 = getPosition(trackCoordArr[j].lng, trackCoordArr[j].lat, j*<span class="hljs-number">0.05</span>);
    vertexArr.push(<span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.Vector3(p1.x, p1.y, p1.z));    
}
<span class="hljs-keyword">for</span>(<span class="hljs-keyword">var</span> k=tcaRemainLength; k&gt;<span class="hljs-number">0</span>; k--) { <span class="hljs-comment">// 后一半</span>
    <span class="hljs-keyword">var</span> p2 = getPosition(trackCoordArr[tcaLength-k].lng, trackCoordArr[tcaLength-k].lat, k*<span class="hljs-number">0.05</span>);
    vertexArr.push(<span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.Vector3(p2.x, p2.y, p2.z));    
}

<span class="hljs-keyword">var</span> trackCurve = <span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.CatmullRomCurve3(vertexArr);</code></pre>
<p>这个部分看看就行了。。</p>
<p>光点动画</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 点动画
var pointGeometry = new THREE.SphereGeometry(0.2, 20, 20);
var pointMaterial = new THREE.MeshBasicMaterial({color: 0x40E0D0});
function addLightPoint(pos, coordsNum ,verArr) {    
    var pointMesh = new THREE.Mesh(pointGeometry, pointMaterial);
    pointMesh.position.set(pos.x, pos.y, pos.z);
    group.add(pointMesh);

    var index = 0;
    function pointAnimate() {
        index++;
        if(index>coordsNum) {
            index = 0;
        }
        pointMesh.position.set(verArr[index].x, verArr[index].y, verArr[index].z);
        requestAnimationFrame(pointAnimate);
    }
    pointAnimate();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-comment">// 点动画</span>
<span class="hljs-keyword">var</span> pointGeometry = <span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.SphereGeometry(<span class="hljs-number">0.2</span>, <span class="hljs-number">20</span>, <span class="hljs-number">20</span>);
<span class="hljs-keyword">var</span> pointMaterial = <span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.MeshBasicMaterial({color: <span class="hljs-type">0x40E0D0</span>});
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">addLightPoint</span></span>(pos, coordsNum ,verArr) {    
    <span class="hljs-keyword">var</span> pointMesh = <span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.Mesh(pointGeometry, pointMaterial);
    pointMesh.position.<span class="hljs-keyword">set</span>(pos.x, pos.y, pos.z);
    group.add(pointMesh);

    <span class="hljs-keyword">var</span> index = <span class="hljs-number">0</span>;
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">pointAnimate</span></span>() {
        index++;
        <span class="hljs-keyword">if</span>(index&gt;coordsNum) {
            index = <span class="hljs-number">0</span>;
        }
        pointMesh.position.<span class="hljs-keyword">set</span>(verArr[index].x, verArr[index].y, verArr[index].z);
        requestAnimationFrame(pointAnimate);
    }
    pointAnimate();
}</code></pre>
<p>这个点使用的是sphere，，当然也可以用顶点来实现，如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var geometry = new THREE.Geometry();
geometry.vertices.push(new THREE.Vector3(0, 0, 0))
geometry.colors.push(new THREE.Color(0xffffff));

var material = new THREE.PointsMaterial({size: 1, vertexColors: THREE.VertexColors, opacity: 0.75, sizeAttenuation: true, transparent: true});
var point = new THREE.Points(geometry, material);
point.position.set(x, y, z);
group.add(point);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> geometry = <span class="hljs-built_in">new</span> THREE.Geometry();
geometry.<span class="hljs-built_in">vertices</span>.<span class="hljs-built_in">push</span>(<span class="hljs-built_in">new</span> THREE.Vector3(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>))
geometry.colors.<span class="hljs-built_in">push</span>(<span class="hljs-built_in">new</span> THREE.Color(<span class="hljs-number">0xffffff</span>));

<span class="hljs-built_in">var</span> material = <span class="hljs-built_in">new</span> THREE.PointsMaterial({size: <span class="hljs-number">1</span>, vertexColors: THREE.VertexColors, <span class="hljs-built_in">opacity</span>: <span class="hljs-number">0.75</span>, sizeAttenuation: <span class="hljs-literal">true</span>, <span class="hljs-built_in">transparent</span>: <span class="hljs-literal">true</span>});
<span class="hljs-built_in">var</span> point = <span class="hljs-built_in">new</span> THREE.Points(geometry, material);
point.<span class="hljs-built_in">position</span>.set(x, y, z);
group.add(point);</code></pre>
<p>另外不想用光点动画的话，也可以用线动画，实现原理是不断更新顶点坐标，如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var curveGeometry = new THREE.Geometry(); 
var curveData = new THREE.CatmullRomCurve3(verArr.slice(0, 10));  
curveGeometry.vertices = curveData.getPoints(10);

var curveMaterial = new THREE.LineBasicMaterial({color: 0x40E0D0});
var curveLine = new THREE.Line(curveGeometry, curveMaterial);
group.add(curveLine);

var index = 0;
function lineAnimate() {
    index++;
    if(index>coordsNum-10) {
        index = 0;
    }
    var offsetData = verArr.slice(index, 10+index);
    if(offsetData.length > 0) {
        curveData = new THREE.CatmullRomCurve3(offsetData);  
           curveLine.geometry.vertices = curveData.getPoints(10);
        curveLine.geometry.verticesNeedUpdate = true;
    }
    requestAnimationFrame(lineAnimate);
}
lineAnimate();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code><span class="hljs-keyword">var</span> curveGeometry = <span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.Geometry(); 
<span class="hljs-keyword">var</span> curveData = <span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.CatmullRomCurve3(verArr.slice(<span class="hljs-number">0</span>, <span class="hljs-number">10</span>));  
curveGeometry.vertices = curveData.getPoints(<span class="hljs-number">10</span>);

<span class="hljs-keyword">var</span> curveMaterial = <span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.LineBasicMaterial({color: <span class="hljs-type">0x40E0D0</span>});
<span class="hljs-keyword">var</span> curveLine = <span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.Line(curveGeometry, curveMaterial);
group.add(curveLine);

<span class="hljs-keyword">var</span> index = <span class="hljs-number">0</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">lineAnimate</span></span>() {
    index++;
    <span class="hljs-keyword">if</span>(index&gt;coordsNum<span class="hljs-number">-10</span>) {
        index = <span class="hljs-number">0</span>;
    }
    <span class="hljs-keyword">var</span> offsetData = verArr.slice(index, <span class="hljs-number">10</span>+index);
    <span class="hljs-keyword">if</span>(offsetData.length &gt; <span class="hljs-number">0</span>) {
        curveData = <span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.CatmullRomCurve3(offsetData);  
           curveLine.geometry.vertices = curveData.getPoints(<span class="hljs-number">10</span>);
        curveLine.geometry.verticesNeedUpdate = <span class="hljs-literal">true</span>;
    }
    requestAnimationFrame(lineAnimate);
}
lineAnimate();</code></pre>
<p>最后就是布置场景和事件了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 初始化
function init() {
    container = document.getElementById('zh_globe_container');

    scene = new THREE.Scene();
    var bgTexture = new THREE.TextureLoader().load(&quot;images/textures/starfield.jpg&quot;);
    scene.background = bgTexture;

    camera = new THREE.PerspectiveCamera(50, winWth/winHgt, 1, 2000);
    camera.up.x = 0;
    camera.up.y = 1;
    camera.up.z = 0;
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 400;
    camera.lookAt(0,0,0);

    group = new THREE.Group();
    scene.add(group);

    // 地球    
    globe();

    // 飞机
    plane();

    // 星点
    stars();

    // 半球光
    lights();

    // 渲染器
    renderer = new THREE.WebGLRenderer({antialias: true, preserveDrawingBuffer: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(winWth, winHgt);
    container.appendChild(renderer.domElement);

    // 盘旋控制
    var orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
    orbitControl.minDistrance = 20;
    orbitControl.maxDistrance = 50;
    orbitControl.maxPolarAngle = Math.PI/2;

    // 性能测试
    stats = new Stats();
    container.appendChild(stats.dom);

    // resize事件
    window.addEventListener('resize', onWindowResize, false);
}

// 窗口大小改变
function onWindowResize() {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// 渲染
function render() {
    group.rotation.y -= 0.0005;
    renderer.render(scene, camera);
}

// 动画
function animate() {
    requestAnimationFrame(animate);
    render();
    stats.update();
}

init();
animate();    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mel"><code><span class="hljs-comment">// 初始化</span>
function init() {
    <span class="hljs-keyword">container</span> = document.getElementById(<span class="hljs-string">'zh_globe_container'</span>);

    scene = new THREE.Scene();
    var bgTexture = new THREE.TextureLoader().load(<span class="hljs-string">"images/textures/starfield.jpg"</span>);
    scene.background = bgTexture;

    <span class="hljs-keyword">camera</span> = new THREE.PerspectiveCamera(<span class="hljs-number">50</span>, winWth/winHgt, <span class="hljs-number">1</span>, <span class="hljs-number">2000</span>);
    <span class="hljs-keyword">camera</span>.up.x = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">camera</span>.up.y = <span class="hljs-number">1</span>;
    <span class="hljs-keyword">camera</span>.up.z = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">camera</span>.position.x = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">camera</span>.position.y = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">camera</span>.position.z = <span class="hljs-number">400</span>;
    <span class="hljs-keyword">camera</span>.lookAt(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>);

    <span class="hljs-keyword">group</span> = new THREE.Group();
    scene.add(<span class="hljs-keyword">group</span>);

    <span class="hljs-comment">// 地球    </span>
    globe();

    <span class="hljs-comment">// 飞机</span>
    <span class="hljs-keyword">plane</span>();

    <span class="hljs-comment">// 星点</span>
    stars();

    <span class="hljs-comment">// 半球光</span>
    lights();

    <span class="hljs-comment">// 渲染器</span>
    <span class="hljs-keyword">renderer</span> = new THREE.WebGLRenderer({antialias: true, preserveDrawingBuffer: true});
    <span class="hljs-keyword">renderer</span>.setPixelRatio(<span class="hljs-keyword">window</span>.devicePixelRatio);
    <span class="hljs-keyword">renderer</span>.setSize(winWth, winHgt);
    <span class="hljs-keyword">container</span>.appendChild(<span class="hljs-keyword">renderer</span>.domElement);

    <span class="hljs-comment">// 盘旋控制</span>
    var orbitControl = new THREE.OrbitControls(<span class="hljs-keyword">camera</span>, <span class="hljs-keyword">renderer</span>.domElement);
    orbitControl.minDistrance = <span class="hljs-number">20</span>;
    orbitControl.maxDistrance = <span class="hljs-number">50</span>;
    orbitControl.maxPolarAngle = Math.PI/<span class="hljs-number">2</span>;

    <span class="hljs-comment">// 性能测试</span>
    stats = new Stats();
    <span class="hljs-keyword">container</span>.appendChild(stats.dom);

    <span class="hljs-comment">// resize事件</span>
    <span class="hljs-keyword">window</span>.addEventListener(<span class="hljs-string">'resize'</span>, onWindowResize, false);
}

<span class="hljs-comment">// 窗口大小改变</span>
function onWindowResize() {
    <span class="hljs-keyword">camera</span>.aspect = <span class="hljs-keyword">window</span>.innerWidth/<span class="hljs-keyword">window</span>.innerHeight;
    <span class="hljs-keyword">camera</span>.updateProjectionMatrix();
    <span class="hljs-keyword">renderer</span>.setSize(<span class="hljs-keyword">window</span>.innerWidth, <span class="hljs-keyword">window</span>.innerHeight);
}

<span class="hljs-comment">// 渲染</span>
function <span class="hljs-keyword">render</span>() {
    <span class="hljs-keyword">group</span>.rotation.y -= <span class="hljs-number">0.0005</span>;
    <span class="hljs-keyword">renderer</span>.<span class="hljs-keyword">render</span>(scene, <span class="hljs-keyword">camera</span>);
}

<span class="hljs-comment">// 动画</span>
function animate() {
    requestAnimationFrame(animate);
    <span class="hljs-keyword">render</span>();
    stats.update();
}

init();
animate();    </code></pre>
<p>完整代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var log = console.log.bind(console);

var globeObj = (function() {
    'use strict';

    // 判断浏览器是否支持webgl
    if(!Detector.webgl) Detector.addGetWebGLMessage();

    var container, stats;
    var camera, scene, renderer;
    var group;
    var mouseX = 0, mouseY = 0;
    var winWth = window.innerWidth, winHgt = window.innerHeight;

    // 获取position
    function getPosition(lng, lat, alt) {
        var phi = (90-lat)*(Math.PI/180),
            theta = (lng+180)*(Math.PI/180),
            radius = alt+200,
            x = -(radius * Math.sin(phi) * Math.cos(theta)),
            z = (radius * Math.sin(phi) * Math.sin(theta)),
            y = (radius * Math.cos(phi));
        return {x: x, y: y, z: z};
    }

    // 飞机
    function plane() {
        var socket = io('https://loc.variflight.com/*****此处接口地址不能给了', {transports: ['websocket']});

        var clientBounds = [52.793056,72.427908,2.970897,135.181814];

        // 连接
        socket.on('connect', function() {
            socket.emit(&quot;sub&quot;, clientBounds, -1, '', function(){});
        });

        // 飞机标记
        var planeMarkers = {};

        // 飞机形状
        var planeShape = new THREE.Shape();
        planeShape.moveTo( 0, 0);
        planeShape.lineTo(0.2, -0.2);
        planeShape.lineTo(0.2, -1.3);
        planeShape.lineTo(1.6,-2.7);
        planeShape.lineTo(1.6,-3);
        planeShape.lineTo(0.2, -2.1);
        planeShape.lineTo(0.2, -3);
        planeShape.lineTo(0.5, -3.4);
        planeShape.lineTo(0.5, -3.7);
        planeShape.lineTo(0, -3.3);
        planeShape.lineTo(-0.5, -3.7);
        planeShape.lineTo(-0.5, -3.4);
        planeShape.lineTo(-0.2, -3);
        planeShape.lineTo(-0.2, -2.1);
        planeShape.lineTo(-1.6,-3);
        planeShape.lineTo(-1.6,-2.7);
        planeShape.lineTo(-0.2, -1.3);
        planeShape.lineTo(-0.2, -0.2);
        var planeGeometry = new THREE.ShapeGeometry(planeShape);
        // 飞机材质
        var planeMaterial = new THREE.MeshPhongMaterial({color: 0x0FB4DD, side: THREE.DoubleSide, depthTest: true});
        // 添加飞机
        function addPlane(item) {
            if(item.anum &amp;&amp; item.lng &amp;&amp; item.lat) {
                var plane = new THREE.Mesh(planeGeometry, planeMaterial);
                // 旋转
                plane.rotation.z = THREE.Math.degToRad(item.ang);
                // 定位
                var position = getPosition(item.lng, item.lat, 5);
                plane.position.set(position.x, position.y, position.z);
                // 显示/隐藏
                // plane.visible = false;
                // 保存
                planeMarkers[item.anum] = plane;
                // 添加到场景
                group.add(plane);
                // 绘制历史轨迹
                drawHistoryTrack(item.anum);
            }
        }

        // 时间段
        var curTime = Date.parse(new Date())/1000;
        var depTime = curTime - 30*60;
        // 轨迹线质
        var trackMaterial = new THREE.LineBasicMaterial({color : 0x1B94B1});
        // 绘制历史轨迹
        function drawHistoryTrack(anum) {
            socket.emit(&quot;fullPath&quot;, anum, depTime, curTime, function(status, data){
                if(status) {
                    var dLength = data.length;
                    if(dLength>=2) {
                        var trackCoordArr = [];
                        for(var i=0; i<dLength; i++) {
                            if(data[i].lng &amp;&amp; data[i].alt) {
                                trackCoordArr.push({lng: data[i].lng, lat: data[i].lat});
                            }
                        }

                        var tcaLength = trackCoordArr.length;
                        if(tcaLength>=2) {
                            var tcaHalfLength = Math.ceil(tcaLength/2),
                                tcaRemainLength = tcaLength-tcaHalfLength,
                                vertexArr = [];

                            /* 所有点
                            for(var j=0; j<tcaHalfLength; j++) {
                                var p1 = getPosition(trackCoordArr[j].lng, trackCoordArr[j].lat, j*0.05);
                                vertexArr.push(new THREE.Vector3(p1.x, p1.y, p1.z));    
                            }
                            for(var k=tcaRemainLength; k>0; k--) {
                                var p2 = getPosition(trackCoordArr[tcaLength-k].lng, trackCoordArr[tcaLength-k].lat, k*0.05);
                                vertexArr.push(new THREE.Vector3(p2.x, p2.y, p2.z));    
                            }
                            
                            var trackCurve = new THREE.CatmullRomCurve3(vertexArr);
                            */

                            // 三个点
                            var p1 = getPosition(trackCoordArr[0].lng, trackCoordArr[0].lat, 0),
                                p2 = getPosition(trackCoordArr[tcaHalfLength].lng, trackCoordArr[tcaHalfLength].lat, tcaLength*0.01),
                                p3 = getPosition(trackCoordArr[tcaLength-1].lng, trackCoordArr[tcaLength-1].lat, 0);

                            var trackCurve = new THREE.CatmullRomCurve3([
                                new THREE.Vector3(p1.x, p1.y, p1.z),
                                new THREE.Vector3(p2.x, p2.y, p2.z),
                                new THREE.Vector3(p3.x, p3.y, p3.z)
                            ]);

                            var trackGeometry = new THREE.Geometry(),
                                verticesArr = trackCurve.getPoints(tcaLength);

                            trackGeometry.vertices = verticesArr;
                            
                            var trackLine = new THREE.Line(trackGeometry, trackMaterial);
                            group.add(trackLine);

                            // 动画点
                            addLightPoint(p1, tcaLength, verticesArr);
                        }
                    }
                }
            });
        }

        // 点动画
        var pointGeometry = new THREE.SphereGeometry(0.2, 20, 20);
        var pointMaterial = new THREE.MeshBasicMaterial({color: 0x40E0D0});
        function addLightPoint(pos, coordsNum ,verArr) {
            var pointMesh = new THREE.Mesh(pointGeometry, pointMaterial);
            pointMesh.position.set(pos.x, pos.y, pos.z);
            group.add(pointMesh);

            var index = 0;
            function pointAnimate() {
                index++;
                if(index>coordsNum) {
                    index = 0;
                }
                pointMesh.position.set(verArr[index].x, verArr[index].y, verArr[index].z);
                requestAnimationFrame(pointAnimate);
            }
            pointAnimate();

            /*var curveGeometry = new THREE.Geometry(); 
            var curveData = new THREE.CatmullRomCurve3(verArr.slice(0, 10));  
            curveGeometry.vertices = curveData.getPoints(10);

            var curveMaterial = new THREE.LineBasicMaterial({color: 0x40E0D0});
            var curveLine = new THREE.Line(curveGeometry, curveMaterial);
            group.add(curveLine);

            var index = 0;
            function lineAnimate() {
                index++;
                if(index>coordsNum-10) {
                    index = 0;
                }
                var offsetData = verArr.slice(index, 10+index);
                if(offsetData.length > 0) {
                    curveData = new THREE.CatmullRomCurve3(offsetData);  
                       curveLine.geometry.vertices = curveData.getPoints(10);
                    curveLine.geometry.verticesNeedUpdate = true;
                }
                requestAnimationFrame(lineAnimate);
            }
            lineAnimate();*/
        }

        // 监听数据(添加并更新)
        socket.on('~', function(res) {
            if($.isEmptyObject(planeMarkers)) {
                $.each(res, function(i, item) {
                    addPlane(item);
                });
            } else {
                $.each(res, function(i, item) {
                    if(planeMarkers[item.anum]) {
                        if(item.lng &amp;&amp; item.lat) {
                            var pos = getPosition(item.lng, item.lat, 5);
                            planeMarkers[item.anum].position.set(pos.x, pos.y, pos.z);
                        }
                    } else {
                        addPlane(item);
                    }
                });
            }
        });
    }

    // 地球
    function globe() {
        var globeTextureLoader = new THREE.TextureLoader();
        globeTextureLoader.load('images/textures/earth.jpg', function (texture) {
            var globeGgeometry = new THREE.SphereGeometry(200, 100, 100);
            var globeMaterial = new THREE.MeshStandardMaterial({map: texture});
            var globeMesh = new THREE.Mesh(globeGgeometry, globeMaterial);
            group.add(globeMesh);
            group.rotation.x = THREE.Math.degToRad(35);
            group.rotation.y = THREE.Math.degToRad(170);
        });
    }

    // 星点
    function stars() {
        var starsGeometry = new THREE.Geometry();
        for (var i = 0; i < 2000; i ++) {
            var starVector = new THREE.Vector3(
                THREE.Math.randFloatSpread(2000),
                THREE.Math.randFloatSpread(2000),
                THREE.Math.randFloatSpread(2000)
            );
            starsGeometry.vertices.push(starVector);
        }
        var starsMaterial = new THREE.PointsMaterial({color: 0x888888})
        var starsPoint = new THREE.Points(starsGeometry, starsMaterial);
        group.add(starsPoint);
    }

    // 光
    function lights() {
        var hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x333333, 2);
        hemisphereLight.position.x = 0;
        hemisphereLight.position.y = 0;
        hemisphereLight.position.z = -200;
        group.add(hemisphereLight);
    }

    // 初始化
    function init() {
        container = document.getElementById('zh_globe_container');

        scene = new THREE.Scene();
        var bgTexture = new THREE.TextureLoader().load(&quot;images/textures/starfield.jpg&quot;);
        scene.background = bgTexture;

        camera = new THREE.PerspectiveCamera(50, winWth/winHgt, 1, 2000);
        camera.up.x = 0;
        camera.up.y = 1;
        camera.up.z = 0;
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 400;
        camera.lookAt(0,0,0);

        group = new THREE.Group();
        scene.add(group);

        // 地球    
        globe();

        // 飞机
        plane();

        // 星点
        stars();
    
        // 半球光
        lights();

        // 渲染器
        renderer = new THREE.WebGLRenderer({antialias: true, preserveDrawingBuffer: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(winWth, winHgt);
        container.appendChild(renderer.domElement);

        // 盘旋控制
        var orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
        orbitControl.minDistrance = 20;
        orbitControl.maxDistrance = 50;
        orbitControl.maxPolarAngle = Math.PI/2;

        // 性能测试
        stats = new Stats();
        container.appendChild(stats.dom);

        // resize事件
        window.addEventListener('resize', onWindowResize, false);
    }

    // 窗口大小改变
    function onWindowResize() {
        camera.aspect = window.innerWidth/window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    // 渲染
    function render() {
        group.rotation.y -= 0.0005;
        renderer.render(scene, camera);
    }

    // 动画
    function animate() {
        requestAnimationFrame(animate);
        render();
        stats.update();
    }

    init();
    animate();    
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre><code>var log = console.log.bind(console);

var globeObj = (function() {
    'use strict';

    // 判断浏览器是否支持webgl
    if(!Detector.webgl) Detector.addGetWebGLMessage();

    var container, stats;
    var camera, scene, renderer;
    var group;
    var mouseX = 0, mouseY = 0;
    var winWth = window.innerWidth, winHgt = window.innerHeight;

    // 获取position
    function getPosition(lng, lat, alt) {
        var phi = (90-lat)*(Math.PI/180),
            theta = (lng+180)*(Math.PI/180),
            radius = alt+200,
            x = -(radius * Math.sin(phi) * Math.cos(theta)),
            z = (radius * Math.sin(phi) * Math.sin(theta)),
            y = (radius * Math.cos(phi));
        return {x: x, y: y, z: z};
    }

    // 飞机
    function plane() {
        var socket = io('https://loc.variflight.com/*****此处接口地址不能给了', {transports: ['websocket']});

        var clientBounds = [52.793056,72.427908,2.970897,135.181814];

        // 连接
        socket.on('connect', function() {
            socket.emit("sub", clientBounds, -1, '', function(){});
        });

        // 飞机标记
        var planeMarkers = {};

        // 飞机形状
        var planeShape = new THREE.Shape();
        planeShape.moveTo( 0, 0);
        planeShape.lineTo(0.2, -0.2);
        planeShape.lineTo(0.2, -1.3);
        planeShape.lineTo(1.6,-2.7);
        planeShape.lineTo(1.6,-3);
        planeShape.lineTo(0.2, -2.1);
        planeShape.lineTo(0.2, -3);
        planeShape.lineTo(0.5, -3.4);
        planeShape.lineTo(0.5, -3.7);
        planeShape.lineTo(0, -3.3);
        planeShape.lineTo(-0.5, -3.7);
        planeShape.lineTo(-0.5, -3.4);
        planeShape.lineTo(-0.2, -3);
        planeShape.lineTo(-0.2, -2.1);
        planeShape.lineTo(-1.6,-3);
        planeShape.lineTo(-1.6,-2.7);
        planeShape.lineTo(-0.2, -1.3);
        planeShape.lineTo(-0.2, -0.2);
        var planeGeometry = new THREE.ShapeGeometry(planeShape);
        // 飞机材质
        var planeMaterial = new THREE.MeshPhongMaterial({color: 0x0FB4DD, side: THREE.DoubleSide, depthTest: true});
        // 添加飞机
        function addPlane(item) {
            if(item.anum &amp;&amp; item.lng &amp;&amp; item.lat) {
                var plane = new THREE.Mesh(planeGeometry, planeMaterial);
                // 旋转
                plane.rotation.z = THREE.Math.degToRad(item.ang);
                // 定位
                var position = getPosition(item.lng, item.lat, 5);
                plane.position.set(position.x, position.y, position.z);
                // 显示/隐藏
                // plane.visible = false;
                // 保存
                planeMarkers[item.anum] = plane;
                // 添加到场景
                group.add(plane);
                // 绘制历史轨迹
                drawHistoryTrack(item.anum);
            }
        }

        // 时间段
        var curTime = Date.parse(new Date())/1000;
        var depTime = curTime - 30*60;
        // 轨迹线质
        var trackMaterial = new THREE.LineBasicMaterial({color : 0x1B94B1});
        // 绘制历史轨迹
        function drawHistoryTrack(anum) {
            socket.emit("fullPath", anum, depTime, curTime, function(status, data){
                if(status) {
                    var dLength = data.length;
                    if(dLength&gt;=2) {
                        var trackCoordArr = [];
                        for(var i=0; i&lt;dLength; i++) {
                            if(data[i].lng &amp;&amp; data[i].alt) {
                                trackCoordArr.push({lng: data[i].lng, lat: data[i].lat});
                            }
                        }

                        var tcaLength = trackCoordArr.length;
                        if(tcaLength&gt;=2) {
                            var tcaHalfLength = Math.ceil(tcaLength/2),
                                tcaRemainLength = tcaLength-tcaHalfLength,
                                vertexArr = [];

                            /* 所有点
                            for(var j=0; j&lt;tcaHalfLength; j++) {
                                var p1 = getPosition(trackCoordArr[j].lng, trackCoordArr[j].lat, j*0.05);
                                vertexArr.push(new THREE.Vector3(p1.x, p1.y, p1.z));    
                            }
                            for(var k=tcaRemainLength; k&gt;0; k--) {
                                var p2 = getPosition(trackCoordArr[tcaLength-k].lng, trackCoordArr[tcaLength-k].lat, k*0.05);
                                vertexArr.push(new THREE.Vector3(p2.x, p2.y, p2.z));    
                            }
                            
                            var trackCurve = new THREE.CatmullRomCurve3(vertexArr);
                            */

                            // 三个点
                            var p1 = getPosition(trackCoordArr[0].lng, trackCoordArr[0].lat, 0),
                                p2 = getPosition(trackCoordArr[tcaHalfLength].lng, trackCoordArr[tcaHalfLength].lat, tcaLength*0.01),
                                p3 = getPosition(trackCoordArr[tcaLength-1].lng, trackCoordArr[tcaLength-1].lat, 0);

                            var trackCurve = new THREE.CatmullRomCurve3([
                                new THREE.Vector3(p1.x, p1.y, p1.z),
                                new THREE.Vector3(p2.x, p2.y, p2.z),
                                new THREE.Vector3(p3.x, p3.y, p3.z)
                            ]);

                            var trackGeometry = new THREE.Geometry(),
                                verticesArr = trackCurve.getPoints(tcaLength);

                            trackGeometry.vertices = verticesArr;
                            
                            var trackLine = new THREE.Line(trackGeometry, trackMaterial);
                            group.add(trackLine);

                            // 动画点
                            addLightPoint(p1, tcaLength, verticesArr);
                        }
                    }
                }
            });
        }

        // 点动画
        var pointGeometry = new THREE.SphereGeometry(0.2, 20, 20);
        var pointMaterial = new THREE.MeshBasicMaterial({color: 0x40E0D0});
        function addLightPoint(pos, coordsNum ,verArr) {
            var pointMesh = new THREE.Mesh(pointGeometry, pointMaterial);
            pointMesh.position.set(pos.x, pos.y, pos.z);
            group.add(pointMesh);

            var index = 0;
            function pointAnimate() {
                index++;
                if(index&gt;coordsNum) {
                    index = 0;
                }
                pointMesh.position.set(verArr[index].x, verArr[index].y, verArr[index].z);
                requestAnimationFrame(pointAnimate);
            }
            pointAnimate();

            /*var curveGeometry = new THREE.Geometry(); 
            var curveData = new THREE.CatmullRomCurve3(verArr.slice(0, 10));  
            curveGeometry.vertices = curveData.getPoints(10);

            var curveMaterial = new THREE.LineBasicMaterial({color: 0x40E0D0});
            var curveLine = new THREE.Line(curveGeometry, curveMaterial);
            group.add(curveLine);

            var index = 0;
            function lineAnimate() {
                index++;
                if(index&gt;coordsNum-10) {
                    index = 0;
                }
                var offsetData = verArr.slice(index, 10+index);
                if(offsetData.length &gt; 0) {
                    curveData = new THREE.CatmullRomCurve3(offsetData);  
                       curveLine.geometry.vertices = curveData.getPoints(10);
                    curveLine.geometry.verticesNeedUpdate = true;
                }
                requestAnimationFrame(lineAnimate);
            }
            lineAnimate();*/
        }

        // 监听数据(添加并更新)
        socket.on('~', function(res) {
            if($.isEmptyObject(planeMarkers)) {
                $.each(res, function(i, item) {
                    addPlane(item);
                });
            } else {
                $.each(res, function(i, item) {
                    if(planeMarkers[item.anum]) {
                        if(item.lng &amp;&amp; item.lat) {
                            var pos = getPosition(item.lng, item.lat, 5);
                            planeMarkers[item.anum].position.set(pos.x, pos.y, pos.z);
                        }
                    } else {
                        addPlane(item);
                    }
                });
            }
        });
    }

    // 地球
    function globe() {
        var globeTextureLoader = new THREE.TextureLoader();
        globeTextureLoader.load('images/textures/earth.jpg', function (texture) {
            var globeGgeometry = new THREE.SphereGeometry(200, 100, 100);
            var globeMaterial = new THREE.MeshStandardMaterial({map: texture});
            var globeMesh = new THREE.Mesh(globeGgeometry, globeMaterial);
            group.add(globeMesh);
            group.rotation.x = THREE.Math.degToRad(35);
            group.rotation.y = THREE.Math.degToRad(170);
        });
    }

    // 星点
    function stars() {
        var starsGeometry = new THREE.Geometry();
        for (var i = 0; i &lt; 2000; i ++) {
            var starVector = new THREE.Vector3(
                THREE.Math.randFloatSpread(2000),
                THREE.Math.randFloatSpread(2000),
                THREE.Math.randFloatSpread(2000)
            );
            starsGeometry.vertices.push(starVector);
        }
        var starsMaterial = new THREE.PointsMaterial({color: 0x888888})
        var starsPoint = new THREE.Points(starsGeometry, starsMaterial);
        group.add(starsPoint);
    }

    // 光
    function lights() {
        var hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x333333, 2);
        hemisphereLight.position.x = 0;
        hemisphereLight.position.y = 0;
        hemisphereLight.position.z = -200;
        group.add(hemisphereLight);
    }

    // 初始化
    function init() {
        container = document.getElementById('zh_globe_container');

        scene = new THREE.Scene();
        var bgTexture = new THREE.TextureLoader().load("images/textures/starfield.jpg");
        scene.background = bgTexture;

        camera = new THREE.PerspectiveCamera(50, winWth/winHgt, 1, 2000);
        camera.up.x = 0;
        camera.up.y = 1;
        camera.up.z = 0;
        camera.position.x = 0;
        camera.position.y = 0;
        camera.position.z = 400;
        camera.lookAt(0,0,0);

        group = new THREE.Group();
        scene.add(group);

        // 地球    
        globe();

        // 飞机
        plane();

        // 星点
        stars();
    
        // 半球光
        lights();

        // 渲染器
        renderer = new THREE.WebGLRenderer({antialias: true, preserveDrawingBuffer: true});
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(winWth, winHgt);
        container.appendChild(renderer.domElement);

        // 盘旋控制
        var orbitControl = new THREE.OrbitControls(camera, renderer.domElement);
        orbitControl.minDistrance = 20;
        orbitControl.maxDistrance = 50;
        orbitControl.maxPolarAngle = Math.PI/2;

        // 性能测试
        stats = new Stats();
        container.appendChild(stats.dom);

        // resize事件
        window.addEventListener('resize', onWindowResize, false);
    }

    // 窗口大小改变
    function onWindowResize() {
        camera.aspect = window.innerWidth/window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    // 渲染
    function render() {
        group.rotation.y -= 0.0005;
        renderer.render(scene, camera);
    }

    // 动画
    function animate() {
        requestAnimationFrame(animate);
        render();
        stats.update();
    }

    init();
    animate();    
})();</code></pre>
<p>场景背景图<br><span class="img-wrap"><img data-src="/img/bVJyOd?w=2048&amp;h=1024" src="https://static.alili.tech/img/bVJyOd?w=2048&amp;h=1024" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>谢谢关注，如有帮助请推荐一下！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
threejs 绘制地球、飞机、轨迹

## 原文链接
[https://segmentfault.com/a/1190000008423707](https://segmentfault.com/a/1190000008423707)

