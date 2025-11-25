---
title: '现在做 Web 全景合适吗？' 
date: 2018-12-19 2:30:07
hidden: true
slug: ool0xz9pwq
categories: [reprint]
---

{{< raw >}}

                    
<p>Web 全景在以前带宽有限的条件下常常用来作为街景和 360° 全景图片的查看。它可以给用户一种 self-immersive 的体验，通过简单的操作，自由的查看周围的物体。随着一些运营商推出大王卡等免流服务，以及 4G 环境的普及，大流量的应用也逐渐得到推广。比如，我们是否可以将静态低流量的全景图片，变为动态直播的全景视频呢？在一定网速带宽下，是可以实现的。后面，我们来了解一下，如何在 Web 端实现全景视频。先看一下实例 gif：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012687398?w=273&amp;h=370" src="https://static.alili.tech/img/remote/1460000012687398?w=273&amp;h=370" alt="gif" title="gif" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">tl;dr;</h2>
<ul>
<li>使用 three.js 实现全景技术</li>
<li>UV 映射原理简介</li>
<li>3D 坐标原理和移动控制</li>
<li>Web 陀螺仪简介</li>
<li>iv-panorama 简单库介绍</li>
</ul>
<h2 id="articleHeader1">基于 Three.js</h2>
<p>全景视频是基于 3D 空间，而在 Web 中，能够非常方便触摸到 3D 空间的技术，就是 WebGL。为了简化，这里就直接采用 Three.js 库。具体的工作原理就是将正在播放的 video 元素，映射到纹理(texture) 空间中，通过 UV 映射，直接贴到一个球面上。精简代码为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100); 
// 添加相机


camera.target = new THREE.Vector3(0, 0, 0); 
// 设置相机的观察位置，通常在球心

scene = new THREE.Scene();
let  geometry = new THREE.SphereBufferGeometry(400, 60, 60);
// 在贴图的时候，让像素点朝内（非常重要）
geometry.scale(-1, 1, 1);

// 传入视频 VideoEle 进行绘制
var texture = new THREE.VideoTexture(videoElement);

var material = new THREE.MeshBasicMaterial({ map: texture });
mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);


renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio); // canvas 的比例
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>let camera = <span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.PerspectiveCamera(<span class="hljs-number">75</span>, window.innerWidth / window.innerHeight, <span class="hljs-number">1</span>, <span class="hljs-number">1100</span>); 
<span class="hljs-comment">// 添加相机</span>


camera.target = <span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.Vector3(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, <span class="hljs-number">0</span>); 
<span class="hljs-comment">// 设置相机的观察位置，通常在球心</span>

scene = <span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.Scene();
let  geometry = <span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.SphereBufferGeometry(<span class="hljs-number">400</span>, <span class="hljs-number">60</span>, <span class="hljs-number">60</span>);
<span class="hljs-comment">// 在贴图的时候，让像素点朝内（非常重要）</span>
geometry.scale(<span class="hljs-number">-1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>);

<span class="hljs-comment">// 传入视频 VideoEle 进行绘制</span>
<span class="hljs-keyword">var</span> texture = <span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.VideoTexture(videoElement);

<span class="hljs-keyword">var</span> material = <span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.MeshBasicMaterial({ map: <span class="hljs-type">texture </span>});
mesh = <span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.Mesh(geometry, material);
scene.add(mesh);


renderer = <span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio); <span class="hljs-comment">// canvas 的比例</span>
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);</code></pre>
<p>具体的过程差不多就是上面的代码。上面代码中有两块需要注意一下，一个是 相机的视野范围值，一个是几何球体的相关参数设置。</p>
<p><strong>相机视野范围</strong></p>
<p>具体代码为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100); " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gauss"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">let</span> camera = <span class="hljs-keyword">new</span> THREE.PerspectiveCamera(<span class="hljs-number">75</span>, <span class="hljs-built_in">window</span>.innerWidth / <span class="hljs-built_in">window</span>.innerHeight, <span class="hljs-number">1</span>, <span class="hljs-number">1100</span>); </code></pre>
<p>这里主要利用透视类型的相机，模拟人眼的效果。设置合适的视野效果，这里的范围还需要根据球体的直径来决定，通常为 2*radius + 100，反正只要比球体直径大就行。</p>
<p><strong>几何球体的参数设置</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let  geometry = new THREE.SphereBufferGeometry(400, 60, 60);
// 在贴图的时候，让像素点朝内（非常重要）
geometry.scale(-1, 1, 1);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>let  geometry = new THREE.SphereBufferGeometry(<span class="hljs-number">400</span>, <span class="hljs-number">60</span>, <span class="hljs-number">60</span>);
<span class="hljs-comment">// 在贴图的时候，让像素点朝内（非常重要）</span>
geometry.scale(<span class="hljs-number">-1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>);</code></pre>
<p>上面其实有两个部分需要讲解一下</p>
<ul>
<li>
<p>球体参数设置里面有三个属性值比较重要，该 API 格式为：<code>SphereBufferGeometry(radius, widthSegments, heightSegments,...)</code>。</p>
<ul>
<li>raidus： 设置球体的半径，半径越大，视频在 canvas 上绘制的内容也会被放大，该设置值合适就行。</li>
<li>width/height Segments: 切片数，主要用来控制球体在宽高两个维度上最多细分为多少个三角切片数量，越高纹理拼接的边角越清晰。不过，并不是无限制高的，高的同时性能损耗也是有的。</li>
</ul>
</li>
<li>在几何绘制时，通过坐标变换使 X 轴的像素点朝内，让用户看起来不会存在 凸出放大的效果。具体代码为：<code>geometry.scale(-1, 1, 1)</code>。</li>
</ul>
<h2 id="articleHeader2">UV 映射</h2>
<p>上面只是简单介绍了一下代码，如果仅仅只是为了应用，那么这也就足够了。但是，如果后面遇到优化的问题，不知道更底层的或者更细节内容的话，就感觉很尴尬。在全景视频中，有两个非常重要的点：</p>
<ul>
<li>UV 映射</li>
<li>3D 移动</li>
</ul>
<p>这里，我们主要探索一下 UV 映射的细节。UV 映射主要目的就是将 2D 图片映射到三维物体上，最经典的解释就是：</p>
<blockquote>盒子是一个三维物体,正如同加到场景中的一个曲面网络("mesh")方块.<br>如果沿着边缝或折痕剪开盒子,可以把盒子摊开在一个桌面上.当我们从上往下俯视桌子时,我们可以认为U是左右方向,V是上下方向.盒子上的图片就在一个二维坐标中.我们使用U V代表"纹理坐标系"来代替通常在三维空间使用的 X Y.<br>在盒子重新被组装时,纸板上的特定的UV坐标被对应到盒子的一个空间(X Y Z)位置.这就是将2D图像包裹在3D物体上时计算机所做的.</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012687399?w=1342&amp;h=586" src="https://static.alili.tech/img/remote/1460000012687399?w=1342&amp;h=586" alt="image.png-544.6kB" title="image.png-544.6kB" style="cursor: pointer; display: inline;"></span> from <a href="http://xbbj.zust.edu.cn/upload/html/201706009.htmluo.com/jimmythr/jqh2gxnjt0iu9thu4w1xoocg/image.png" rel="nofollow noreferrer" target="_blank">浙江研报</a></p>
<p>这里，我们通过代码来细致讲解一下。我们需要完成一个贴图，将如下的 sprite，贴到一个正方体上。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012687400?w=288&amp;h=432" src="https://static.alili.tech/img/remote/1460000012687400?w=288&amp;h=432" alt="sprite" title="sprite" style="cursor: pointer; display: inline;"></span></p>
<p>from iefreer</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012687401?w=564&amp;h=610" src="https://static.alili.tech/img/remote/1460000012687401?w=564&amp;h=610" alt="cube" title="cube" style="cursor: pointer; display: inline;"></span></p>
<p>这里，我们先将图片加载到纹理空间：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var material = new THREE.MeshPhongMaterial( { map: THREE.ImageUtils.loadTexture('images/texture-atlas.jpg') } );" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs go"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> material = <span class="hljs-built_in">new</span> THREE.MeshPhongMaterial( { <span class="hljs-keyword">map</span>: THREE.ImageUtils.loadTexture(<span class="hljs-string">'images/texture-atlas.jpg'</span>) } );</code></pre>
<p>那么，现在我们有一个如下的纹理空间区域：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012687402?w=333&amp;h=333" src="https://static.alili.tech/img/remote/1460000012687402?w=333&amp;h=333" alt="此处输入图片的描述" title="此处输入图片的描述" style="cursor: pointer;"></span></p>
<p>这块内容，就实际涉及到 WebGL 的知识，纹理空间和物理空间并不是在一块，WebGL 中的 GLSL 语法，就是将纹理内容通过相关规则，映射到指定的三角形区域的表面。</p>
<p>这里需要注意的是，纹理空间并不存在所谓的最小三角区域，这里适应的只是在物理空间中划分的三角区域。为了简单起见，我们设置的 boxGeometry 只使用单位为 1 的 Segments，减少需要划分的三角形数量。</p>
<p>这样，就存在 12 块需要贴的三角区域。这里，我们就需要利用 <code>Vector2</code> 来手动划分一下纹理空间的区域，实际在映射的时候，就是按顺序，将物理空间的定点 和 纹理空间的定点一一映射，这样就实现了将纹理和物理空间联系到一起的步骤。</p>
<p>因为，Three.js 中 <code>geometry.faceVertexUvs</code> 在划分物理空间时，定义的面分解三角形的顺序 是 根据逆时针方向，按序号划分，如下图所示：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012687403?w=172&amp;h=197" src="https://static.alili.tech/img/remote/1460000012687403?w=172&amp;h=197" alt="此处输入图片的描述" title="此处输入图片的描述" style="cursor: pointer;"></span></p>
<p>根据上图的定义，我们可以得到每个几何物体的面映射到纹理空间的坐标值可以分为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="left-bottom = [0,1,3]
right-top = [1,2,3]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code>left-bottom = [<span class="hljs-number">0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">3</span>]
right-top = [<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>]</code></pre>
<p>所以，我们需要定义一下纹理坐标值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="face1_left = [new THREE.Vector2(0, 0),new THREE.Vector2(.5, 0),new THREE.Vector2(0, .333)]
face1_right = [new THREE.Vector2(.5, 0),new THREE.Vector2(.5, .333),new THREE.Vector2(0, .333)]

//... 剩下 10 个面" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>face1_left = [<span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.Vector2(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>),<span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.Vector2(<span class="hljs-number">.5</span>, <span class="hljs-number">0</span>),<span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.Vector2(<span class="hljs-number">0</span>, <span class="hljs-number">.333</span>)]
face1_right = [<span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.Vector2(<span class="hljs-number">.5</span>, <span class="hljs-number">0</span>),<span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.Vector2(<span class="hljs-number">.5</span>, <span class="hljs-number">.333</span>),<span class="hljs-keyword">new</span> <span class="hljs-type">THREE</span>.Vector2(<span class="hljs-number">0</span>, <span class="hljs-number">.333</span>)]

<span class="hljs-comment">//... 剩下 10 个面</span></code></pre>
<p>定点 UV 映射 API 具体格式为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="geometry.faceVertexUvs[ 0 ][ faceIndex ][ vertexIndex ]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code style="word-break: break-word; white-space: initial;">geometry.faceVertexUvs[<span class="hljs-string"> 0 </span>][<span class="hljs-symbol"> faceIndex </span>][<span class="hljs-string"> vertexIndex </span>]</code></pre>
<p>则定义具体面的映射为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="geometry.faceVertexUvs[0][0] = face1_left;
geometry.faceVertexUvs[0][0] = face1_right;
//...剩下 10 个面" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code>geometry.faceVertexUvs[<span class="hljs-string">0</span>][<span class="hljs-symbol">0</span>] = face1_left;
geometry.faceVertexUvs[<span class="hljs-string">0</span>][<span class="hljs-symbol">0</span>] = face1_right;
//...剩下 10 个面</code></pre>
<p>如果，你写过原生的 WebGL 代码，对于理解 UV 映射原理应该很容易了。</p>
<h2 id="articleHeader3">3D 移动原理</h2>
<p>这里需要注意的是 Web 全景不是 WebVR。全景没有 VR 那种沉浸式体验，单单只涉及三个维度上的旋转而没有移动距离这个说法。</p>
<p>上面的描述中，提到了三维，旋转角度 这两个概念，很容易让我们想到《高中数学》学到的一个坐标系--球坐标系（这里默认都是右手坐标系）。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012687404?w=573&amp;h=339" src="https://static.alili.tech/img/remote/1460000012687404?w=573&amp;h=339" alt="球坐标" title="球坐标" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li>φ 是和 z 轴正方向 &lt;=180°的夹角</li>
<li>∂ 是和 x 轴正方向 &lt;=180°的夹角</li>
<li>p 是空间点距离原点的直线距离</li>
</ul>
<p>计算公式为：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012687405?w=442&amp;h=32" src="https://static.alili.tech/img/remote/1460000012687405?w=442&amp;h=32" alt="formula" title="formula" style="cursor: pointer;"></span></p>
<p>现在，如果应用到 Web 全景，我们可以知道几个已知条件:</p>
<ul>
<li>p：定义的球体（SphereBufferGeometry）的半径大小</li>
<li>∆φ：用户在 y 轴上移动的距离</li>
<li>∆∂：用户在 x 轴上移动的距离</li>
</ul>
<p>p 这个是不变的，而 ∆φ 和 ∆∂ 则是根据用户输入来决定的大小值。这里，就需要一个算法来统一协定。该算法控制的主要内容就是:</p>
<blockquote>用户的手指在 x/y 平面轴上的 ∆x/∆y 通过一定的比例换算成为 ∆φ/∆∂</blockquote>
<p>如果考虑到陀螺仪就是：</p>
<blockquote>用户的手指在 x/y 平面轴上的 ∆x/∆y 通过一定的比例换算成为 ∆φ/∆∂，用户在 x/y 轴上旋转的角度值 ∆φ'/∆∂'，分别和视角角度进行合并，算出结果。</blockquote>
<p>为了更宽泛的兼容性，我们这里根据第二种算法的描述来进行讲解。上面 ∆φ/∆∂ 的变动主要映射的是我们视野范围的变化。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012687398?w=273&amp;h=370" src="https://static.alili.tech/img/remote/1460000012687398?w=273&amp;h=370" alt="gif" title="gif" style="cursor: pointer; display: inline;"></span></p>
<p>在 Threejs 中，就是用来控制相机的视野范围。那我们如何在 ThreeJS 控制视野范围呢？下面是最简代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="phi = THREE.Math.degToRad(90 - lat);
theta = THREE.Math.degToRad(-lon);
camera.position.x = distance * Math.sin(phi) * Math.cos(theta);
camera.position.y = distance * Math.cos(phi);
camera.position.z = distance * Math.sin(phi) * Math.sin(theta);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code>phi = THREE.Math.degToRad(<span class="hljs-number">90</span> - lat);
theta = THREE.Math.degToRad(-lon);
camera.<span class="hljs-built_in">position</span>.x = <span class="hljs-built_in">distance</span> * Math.<span class="hljs-built_in">sin</span>(phi) * Math.<span class="hljs-built_in">cos</span>(theta);
camera.<span class="hljs-built_in">position</span>.y = <span class="hljs-built_in">distance</span> * Math.<span class="hljs-built_in">cos</span>(phi);
camera.<span class="hljs-built_in">position</span>.z = <span class="hljs-built_in">distance</span> * Math.<span class="hljs-built_in">sin</span>(phi) * Math.<span class="hljs-built_in">sin</span>(theta);</code></pre>
<p>这里主要模拟地球坐标：</p>
<ul>
<li>lat 代表维度（latitude）: 用户上下滑动改变的值，或者手机上下旋转</li>
<li>lon 代表经度（lontitude）: 用户左右滑动改变的值，或者手机左右旋转</li>
</ul>
<p>具体内容为：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012687406" src="https://static.alili.tech/img/remote/1460000012687406" alt="image.png-17.9kB" title="image.png-17.9kB" style="cursor: pointer; display: inline;"></span></p>
<p>在通常实践当中，改变全景视角的维度有两种，一种直接通过手滑，一种则根据陀螺仪旋转。</p>
<p>简单来说，就是监听 <code>touch</code> 和 <code>orientation</code> 事件，根据触发信息来手动改变 lat/lon 的值。不过，这里有一个注意事项：</p>
<blockquote>latitude 方向上最多只能达到 (-90,90)，否则会造成屏幕翻转的效果，这种体验非常不好。</blockquote>
<p>我们分别通过代码来实践一下。</p>
<h3 id="articleHeader4">添加 touch 控制</h3>
<p>Touch 相关的事件在 Web 中，其实可以讲到你崩溃为止，比如，用户用几个手指触摸屏幕？用户具体在屏幕上的手势是什么(<code>swipe</code>，<code>zoom</code>)？</p>
<p>这里，我们简单起见，只针对一个手指滑动的距离来作为 相机 视角移动的数据。具体代码为：</p>
<p>// 为了给自己博客拉量，完整版可以去我的博客查看：<br><a href="https://www.villainhr.com" rel="nofollow noreferrer" target="_blank">https://www.villainhr.com</a></p>
<h2 id="articleHeader5">iv-panorama 简介</h2>
<p>iv-panorama 是 IVWEB 团队，针对于全景直播这个热点专门开发的一个播放器。现在 Web 对 VR 支持度也不是特别友好，但是，对于全景视频来说，在机器换代更新的前提下，全景在性能方面的瓶颈慢慢消失了。其主要特性为：</p>
<ul>
<li>依赖于 Three.js，需要预先挂载到 window 对象上</li>
<li>灵活配置，内置支持陀螺仪和 touch 控制。</li>
<li>支持灵敏度参数的动态调整</li>
<li>使用 ES6 语法</li>
<li>兼容 React，jQuery（简单凑数的）</li>
</ul>
<p>项目地址为：<a href="https://github.com/JimmyVV/iv-panorama" rel="nofollow noreferrer" target="_blank">iv-panorama</a>。该项目使用非常简单，有两种全景模式，一个是 图片，一个是视频：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import VRPlayer from 'iv-panorama';

new VRPlayer({
        player: {
            url: '/test/003.mp4'
        },
        container:document.getElementById('container')
    });
    
// image

let panorama = new VRPlayer({
    image: {
            url: './banner.png'
        },
        container:document.getElementById('container')
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> VRPlayer <span class="hljs-keyword">from</span> <span class="hljs-string">'iv-panorama'</span>;

<span class="hljs-keyword">new</span> VRPlayer({
        <span class="hljs-attr">player</span>: {
            <span class="hljs-attr">url</span>: <span class="hljs-string">'/test/003.mp4'</span>
        },
        <span class="hljs-attr">container</span>:<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'container'</span>)
    });
    
<span class="hljs-comment">// image</span>

<span class="hljs-keyword">let</span> panorama = <span class="hljs-keyword">new</span> VRPlayer({
    <span class="hljs-attr">image</span>: {
            <span class="hljs-attr">url</span>: <span class="hljs-string">'./banner.png'</span>
        },
        <span class="hljs-attr">container</span>:<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'container'</span>)
    });</code></pre>
<p>全景资源都已经放在 github 仓库了，有兴趣的可以实践观察一下。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
现在做 Web 全景合适吗？

## 原文链接
[https://segmentfault.com/a/1190000012687395](https://segmentfault.com/a/1190000012687395)

