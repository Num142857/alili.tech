---
title: '简单一招搞定 three.js 屏幕适配' 
date: 2019-01-18 2:30:34
hidden: true
slug: ltq6f1okq5
categories: [reprint]
---

{{< raw >}}

                    
<p>这篇文章只讨论 <code>PerspectiveCamera</code> 的适配方法</p>
<p>做过手机 H5 的同学可能会觉得屏幕适配挺麻烦。原因是设计师提供的设计稿尺寸比固定，但是前端开发者却要适配不同大小、长宽比的目标设备。适配的终极目标无非是最大程度把主体内容优雅地呈现给用户。开发和设计如果没有协调好的话可能会妥协比较丑陋的方案，例如由于设计比例问题，为了照顾主体内容不被裁剪，只好设备两边，或者上下留黑边这种。</p>
<p>不过在 3D 的世界里，我们不用担心会有黑边的问题，因为 3D 场景是无限延伸的，总能填满任何比例的屏幕。</p>
<p>先看看 PerspectiveCamera 官方 API 说明如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="PerspectiveCamera( fov, aspect, near, far )

fov — Camera frustum vertical field of view.
aspect — Camera frustum aspect ratio.
near — Camera frustum near plane.
far — Camera frustum far plane." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code>PerspectiveCamera( fov, aspect, <span class="hljs-keyword">near</span>, <span class="hljs-keyword">far</span> )

fov — Camera frustum vertical field <span class="hljs-keyword">of</span> view.
aspect — Camera frustum aspect ratio.
<span class="hljs-keyword">near</span> — Camera frustum <span class="hljs-keyword">near</span> plane.
<span class="hljs-keyword">far</span> — Camera frustum <span class="hljs-keyword">far</span> plane.</code></pre>
<p>上面四个参数都会影响成像结果，<code>fov</code> 和 <code>aspect</code> 设置 XY 平面的范围，也就是广度。 <code>near</code> 和 <code>far</code> 影响的是纵深 Z 轴的范围，也就是深度。纵深只要保证物体离相机距离在这个范围就可以了，这是为了性能而设置的参数，由用户设置，只渲染必要的东西。实际上真实的相机这两个值对应的是 0 到 无限远。</p>
<p>这些参数设置好之后，成像就相应确定了。最后 three.js 把相机拍摄到的矩形区域对应好四个顶点渲染到屏幕上。<code>同样比例的屏幕看到的图像是一致的，与屏幕大小无关</code>&lt;/span&gt;。</p>
<p><span class="img-wrap"><img data-src="/img/bVK4wg?w=973&amp;h=300" src="https://static.alili.tech/img/bVK4wg?w=973&amp;h=300" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>下面我用一个简单的场景来看一下这些参数对成像的影响。</p>
<h2 id="articleHeader0">场景元素</h2>
<ul>
<li><p>相机 （PerspectiveCamera）</p></li>
<li><p>一个边长为 100 的平面（主体内容范围），放在世界坐标中心。</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var camera = new THREE.PerspectiveCamera(53, 500 / 500, 0.1, 1000);

var planeGemo = new THREE.PlaneGeometry( 100, 100, 10, 10 )
var meshMaterial = new THREE.MeshLambertMaterial();
meshMaterial.color = new THREE.Color(0x2dcaf1);
meshMaterial.side = THREE.DoubleSide;

var wireFrameMat = new THREE.MeshBasicMaterial();
wireFrameMat.color = new THREE.Color(0xdddddd);
wireFrameMat.wireframe = true;

var plane = THREE.SceneUtils.createMultiMaterialObject(planeGemo, [meshMaterial, wireFrameMat]);

scene.add(plane);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> camera = <span class="hljs-keyword">new</span> THREE.PerspectiveCamera(<span class="hljs-number">53</span>, <span class="hljs-number">500</span> / <span class="hljs-number">500</span>, <span class="hljs-number">0.1</span>, <span class="hljs-number">1000</span>);

<span class="hljs-keyword">var</span> planeGemo = <span class="hljs-keyword">new</span> THREE.PlaneGeometry( <span class="hljs-number">100</span>, <span class="hljs-number">100</span>, <span class="hljs-number">10</span>, <span class="hljs-number">10</span> )
<span class="hljs-keyword">var</span> meshMaterial = <span class="hljs-keyword">new</span> THREE.MeshLambertMaterial();
meshMaterial.color = <span class="hljs-keyword">new</span> THREE.Color(<span class="hljs-number">0x2dcaf1</span>);
meshMaterial.side = THREE.DoubleSide;

<span class="hljs-keyword">var</span> wireFrameMat = <span class="hljs-keyword">new</span> THREE.MeshBasicMaterial();
wireFrameMat.color = <span class="hljs-keyword">new</span> THREE.Color(<span class="hljs-number">0xdddddd</span>);
wireFrameMat.wireframe = <span class="hljs-literal">true</span>;

<span class="hljs-keyword">var</span> plane = THREE.SceneUtils.createMultiMaterialObject(planeGemo, [meshMaterial, wireFrameMat]);

scene.add(plane);</code></pre>
<h2 id="articleHeader1">目标</h2>
<p>在任何屏幕下，都能最大程度地显示完整的立方体。最大程度，就是最少多余空间的意思。下面是要达到效果</p>
<p><span class="img-wrap"><img data-src="/img/bVK4wi?w=964&amp;h=344" src="https://static.alili.tech/img/bVK4wi?w=964&amp;h=344" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">设置 fov 参数</h2>
<p>可以直接想到的一种适配方法是——改变 camera 到目标物体的距离以控制成像的内容，但是这样做计算成本比较高，而且还有可能影响其他一些数值，然后需要相应一起计算修改。<br>我想到改变视角也可以达到控制成像内容多少的目的，于是我想可不可以只通过改变 fov 一个数值，达到我要的效果。</p>
<p>fov 官网的定义翻译过来是垂直方向的视角大小。我们先规定好相机到平面的距离为 100，然后试试看能不能通过计算设置 fov 值，刚好让平面填满一个宽高比为 1:1 的屏幕。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="plane.position.set(0,0,0);
camera.position.set(0,0,100);
camera.lookAt(new THREE.Vector3);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">plane.position.set(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>);
camera.position.set(<span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">100</span>);
camera.lookAt(<span class="hljs-keyword">new</span> THREE.Vector3);</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVK4wj?w=621&amp;h=366" src="https://static.alili.tech/img/bVK4wj?w=621&amp;h=366" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>观察上面的图，可以很容易求出 fov 的值， fov = arctan((100/2)/100) * 2; fov 为 0.9272952180016122，约等于 53 度。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="camera.fov = Math.atan((100/2)/100) * 2 * (180 / Math.PI);
camera.updateProjectionMatrix();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">camera.fov = <span class="hljs-built_in">Math</span>.atan((<span class="hljs-number">100</span>/<span class="hljs-number">2</span>)/<span class="hljs-number">100</span>) * <span class="hljs-number">2</span> * (<span class="hljs-number">180</span> / <span class="hljs-built_in">Math</span>.PI);
camera.updateProjectionMatrix();</code></pre>
<p>设置完刚刚求出的 fov 值，将场景渲染到 宽高比为 1:1 的画布上。</p>
<p><span class="img-wrap"><img data-src="/img/bVK4wu?w=732&amp;h=212" src="https://static.alili.tech/img/bVK4wu?w=732&amp;h=212" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>渲染结果和预想的一样，平面刚好填满了 1:1 的画布。</p>
<h2 id="articleHeader3">fov 和宽高比例的关系</h2>
<p>下面在固定的 fov 下，使用 dat.gui 工具调整宽高比，观察渲染区域的变化。</p>
<p><span class="img-wrap"><img data-src="/img/bVK4wy?w=965&amp;h=985" src="https://static.alili.tech/img/bVK4wy?w=965&amp;h=985" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>因为fov设置的是垂直方向的视角范围，可以看到无论我们怎么改变宽高比例，垂直方向的渲染范围，都是一致的。水平方向则是以裁剪的方式显示。也就是说当我们设置好视角让垂直方向范围刚好等于主体内容的范围，只要宽高比大于1，我们得到的渲染结果，已经是最佳的了。问题就只剩下当宽高比小于1的情况了。</p>
<p>宽高比小于1的时候，垂直方向显示的高度刚好是等于主体内容的高度。为了能让水平方向完整显示主体内容，我们只有将垂直方向范围增大，也就是将 fov 设置一个更大的值，此时水平方向的范围也会随之增大。当将 fov调整到 水平方向刚好能显示主体内容时，垂直方向此时显示的范围是超过主体内容垂直方向的范围的。其中的关系，其实可以用很简单的函数求出来。</p>
<p>已知 照相机到主题内容的距离为 d<br>正方形主体内容的边长为 w</p>
<p>设宽高比为 r，求照相机垂直方向的视角 f</p>
<p>当 r &gt;= 1 时，照相机拍摄到的垂直方向范围等于 w</p>
<p>当 r &gt; 1<br><code>d * tan(f/2) * 2 = w</code></p>
<p>当 r &lt; 1 时，照相机拍摄到的水平方向范围等于 w，垂直方向范围应该是 w/r<br><code>d * tan(f/2) * 2 = w/r</code></p>
<p>这样，任意宽高比例的屏幕应该对应多大的垂直视角就确定了。</p>
<h2 id="articleHeader4">最终代码与效果</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var controls = new function () {

    camera.position.z = CAMERA_TO_MAIN_DIS;

    this.width = 500;
    this.height = 500;
    this.planeRY = 0;

    /**
    * 计算相机 fov 的函数
    * @param d : 在相机前方 d 距离
    * @param w : 想要看到最大正方形区域边长为 w
    * @param r : 屏幕宽高比
    */
    function calcFov(d, w, r) {
        var f;
        var vertical = w;
        if (r < 1) {
            vertical = vertical/r;
        }
        f = Math.atan(vertical/d/2)*2 * (180 / Math.PI);
        return f;
    }

    this.redraw = ()=>{
        webGLRenderer.setSize(this.width, this.height);
        plane.rotation.y = this.planeRY;
        camera.fov = calcFov(CAMERA_TO_MAIN_DIS, MAIN_CONTENT_WIDTH, this.width / this.height);
        camera.aspect = this.width / this.height;
        camera.updateProjectionMatrix();
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> controls = <span class="hljs-keyword">new</span> <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{

    camera.position.z = CAMERA_TO_MAIN_DIS;

    <span class="hljs-keyword">this</span>.width = <span class="hljs-number">500</span>;
    <span class="hljs-keyword">this</span>.height = <span class="hljs-number">500</span>;
    <span class="hljs-keyword">this</span>.planeRY = <span class="hljs-number">0</span>;

    <span class="hljs-comment">/**
    * 计算相机 fov 的函数
    * @param d : 在相机前方 d 距离
    * @param w : 想要看到最大正方形区域边长为 w
    * @param r : 屏幕宽高比
    */</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">calcFov</span>(<span class="hljs-params">d, w, r</span>) </span>{
        <span class="hljs-keyword">var</span> f;
        <span class="hljs-keyword">var</span> vertical = w;
        <span class="hljs-keyword">if</span> (r &lt; <span class="hljs-number">1</span>) {
            vertical = vertical/r;
        }
        f = <span class="hljs-built_in">Math</span>.atan(vertical/d/<span class="hljs-number">2</span>)*<span class="hljs-number">2</span> * (<span class="hljs-number">180</span> / <span class="hljs-built_in">Math</span>.PI);
        <span class="hljs-keyword">return</span> f;
    }

    <span class="hljs-keyword">this</span>.redraw = <span class="hljs-function"><span class="hljs-params">()</span>=&gt;</span>{
        webGLRenderer.setSize(<span class="hljs-keyword">this</span>.width, <span class="hljs-keyword">this</span>.height);
        plane.rotation.y = <span class="hljs-keyword">this</span>.planeRY;
        camera.fov = calcFov(CAMERA_TO_MAIN_DIS, MAIN_CONTENT_WIDTH, <span class="hljs-keyword">this</span>.width / <span class="hljs-keyword">this</span>.height);
        camera.aspect = <span class="hljs-keyword">this</span>.width / <span class="hljs-keyword">this</span>.height;
        camera.updateProjectionMatrix();
    }
}</code></pre>
<p>效果：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008796502?w=965&amp;h=985" src="https://static.alili.tech/img/remote/1460000008796502?w=965&amp;h=985" alt="" title="" style="cursor: pointer; display: inline;"></span></p>

<p>demo 的完整代码：<a href="http://codepen.io/JasonTurbo/pen/ZLwJMo" rel="nofollow noreferrer" target="_blank">http://codepen.io/JasonTurbo/pen/ZLwJMo</a><button class="btn btn-xs btn-default ml10 preview" data-url="JasonTurbo/pen/ZLwJMo" data-typeid="3">点击预览</button><br>原文链接：<a href="http://gnauhca.com/blog/2016/11/24/threejs/THREEJS%E5%B1%8F%E5%B9%95%E9%80%82%E9%85%8D/" rel="nofollow noreferrer" target="_blank">http://gnauhca.com/blog/2016/11/24/threejs/THREEJS%E5%B1%8F%E5%B9%95%E9%80%82%E9%85%8D/</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
简单一招搞定 three.js 屏幕适配

## 原文链接
[https://segmentfault.com/a/1190000008796468](https://segmentfault.com/a/1190000008796468)

