---
title: '高仿腾讯QQ Xplan（X计划）的H5页面（1）：threejs创建地球' 
date: 2019-01-13 2:30:11
hidden: true
slug: r7bch07pkkf
categories: [reprint]
---

{{< raw >}}

                    
<p>上个月底，在朋友圈看到一个号称“<a href="https://wa.qq.com/xplan/earth/index.html?_wv=1" rel="nofollow noreferrer" target="_blank">这可能是地球上最美的h5</a>”的分享，点进入后发现这个h5还很别致，思考了一会，决定要不高仿一个?</p>
<p>到今天为止，高仿基本完成，</p>
<ul>
<li><p><a href="http://xplan.jackyang.me" rel="nofollow noreferrer" target="_blank">线上地址</a></p></li>
<li><p><a href="https://github.com/JackGit/xplan/" rel="nofollow noreferrer" target="_blank">github地址</a></p></li>
</ul>
<p>除了手机端的media控制没有去兼容，其他的基本都给仿了。 那为了让你觉得是高仿，最好使用chrome的手机调试模式进行访问。微信打开将听不见声音看不到视频... （后面再有时间看是不是仿的再进一步）</p>
<p>之所以要仿它，因为觉得这个h5还挺酷，想看看自己需要花多长时间找到并实现它的技术路径。</p>
<h2 id="articleHeader0">需求分析</h2>
<p>这个h5的主要玩法很简单：地球自转的时候会播放背景音乐（比如海浪声），为了找到这个声音是从哪个地球上哪个地方传来的，需要长按下方的按钮，这时地球会自动转动到目标地点，然后镜头拉近，穿过云层，最后你会看到和这段声音相关的视频内容；松开手之后，上面的过程会倒退回去，地球又开始自转，播放着下段神秘的背景音乐。</p>
<p>个人觉得这个设计还是很新颖的，不是说用了3D的效果，而是将一个看起来很复杂的动画（从宇宙拉近到地表的过程），使用最基础的3D效果和其他一些常规的动画手法去实现，并且能流畅的运行在手机浏览器上。另外还有声音和视频的完美搭配，用户体验不错。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009667323?w=1531&amp;h=568" src="https://static.alili.tech/img/remote/1460000009667323?w=1531&amp;h=568" alt="" title="" style="cursor: pointer;"></span></p>
<p>反复观察，理清页面功能：</p>
<ol>
<li><p>加载：加载进度百分比，饶椭圆轨道运行的小行星作为loading动画（这个动画我没有做）</p></li>
<li><p>地球：3D球体，旋转入场动画，自转，漂移的云层，城市的坐标点，镜头的旋转与拉近，穿越云层动画</p></li>
<li><p>星空背景：静态星空背景图，动态（闪烁的）星星，划过的流星</p></li>
<li><p>隐藏的音频和视频：按内容（地理位置）划分的音频和视频内容</p></li>
<li><p>其他：操作指引示意动画，地球上方会显示当前城市的经纬度，“了解更多”的结语页面等</p></li>
</ol>
<h2 id="articleHeader1">寻找技术路径</h2>
<p>打开chrome inspect一下。</p>
<p>首先是这个地球，得看看它是真3D还是假3D（因为很多3D效果是拿雪碧图做的，比如这里的<a href="http://pixijs.github.io/examples/#/basics/spritesheet.js" rel="nofollow noreferrer" target="_blank">旋转的3D飞机</a>），结果找到了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<div class=&quot;ns-webgl-page&quot;>
    <canvas width=&quot;750&quot; height=&quot;1200&quot; style=&quot;width: 375px; height: 600px;&quot;></canvas>
</div>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>&lt;div <span class="hljs-class"><span class="hljs-keyword">class</span></span>=<span class="hljs-string">"ns-webgl-page"</span>&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">canvas</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"750"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"1200"</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"width: 375px; height: 600px;"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">canvas</span>&gt;</span></span>
&lt;<span class="hljs-regexp">/div&gt;</span></code></pre>
<p>并且在网站source文件中搜到了<strong>THREE</strong>，那就是threejs没跑了。</p>
<p>然后是那个穿越云层的效果，猜测可能是GIF，可能是SpriteSheet Animation，也有可能是一段视频。但是考虑到这个穿越的动画可以正反双方播放，那么就很可能是是SpriteSheet Animation了，否则GIF或者视频文件需要两个动画方向各准备一份。这个从chrome debug工具的network下找到了证据—— 页面下载了一系列名为<code>kf_cloud_0000X.jpg</code>的图片文件。顺手就把它们down下来，备用。</p>
<p>再就是背景音乐和隐藏视频的问题，同样在network下，找到了两个文件，一个mp3一个mp4，每个文件都包含了所有片段，就像是media的雪碧图，只在需要的时候控制播放对应片段而已。</p>
<p>其他的内容都没什么问题，CSS动画或者CANVAS都好做。那么到此，技术路径都清楚了，准备开始写代码。</p>
<h2 id="articleHeader2">难点突破</h2>
<p>对于我而言，用threejs绘制地球可能会是难点，threejs没有用过，而且印象中对3D的东西，一直比较敬畏。如果3D的地球弄不出来，这个项目其他的都做完了，在浩瀚的宇宙中是怎么也找不到“声音来自何方”了。</p>
<p>OK，来看threejs怎么能弄出个地球来。（这个阶段并没有开始项目代码，而是尽量的在一个临时文件中进行涂鸦，快速随意的达到绘制出地球的目的就行了）</p>
<h3 id="articleHeader3">官网</h3>
<p>对于新的技术，首先得看<a href="https://threejs.org/" rel="nofollow noreferrer" target="_blank">官网</a>。这里并不是来全面学习threejs的，而是抱着很强的目的性去实现特定功能，因此直接去示例中找，是否有类似实现可以借鉴。在官网首页中，通过缩略图，找到了下面三个关于地球的例子。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009667324?w=545&amp;h=125" src="https://static.alili.tech/img/remote/1460000009667324?w=545&amp;h=125" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>可惜，貌似这里的例子都是一些产品应用，代码都是压缩过的。于是开始去寻找官方示例，最后在<a href="https://threejs.org/examples" rel="nofollow noreferrer" target="_blank">examples</a>里找到了<a href="https://threejs.org/examples/#canvas_geometry_earth" rel="nofollow noreferrer" target="_blank">canvas_geometry_earth</a>，最棒的是在github上有<a href="https://github.com/mrdoob/three.js/blob/master/examples/canvas_geometry_earth.html" rel="nofollow noreferrer" target="_blank">源码</a>。</p>
<h3 id="articleHeader4">示例代码</h3>
<p>clone下threejs的项目代码，找到上面的示例文件。示例代码不到200行，阅读之后发现其实threejs和之前接触过的一些2D的游戏引擎（createjs，pixijs）等比较类似，都需要有场景（scene），要有渲染循环（render loop），在scene上添加对象（Mesh）或者是group；而Mesh由形状（Geometry）和材质（Material）组成，Material则又是由图片创建的纹理（Texture）而来。不同的是，这里有相机（Camera），有光线（Light），还有一些一直都不明白的距离单位问题。</p>
<p>稍微改动一下示例代码，就能创建出来了earth。但是从使用的资源来看，只有一个地表纹理贴图（earth4.jpg），而xplan中还有3个关于earth的图片文件：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009667325?w=313&amp;h=83" src="https://static.alili.tech/img/remote/1460000009667325?w=313&amp;h=83" alt="" title="" style="cursor: pointer;"></span></p>
<p>不确定bump和spec是什么，我的思路是先在官方文档中找这些关键词，如果找不到，就加上threejs一起去做google。官网上找到了bump相关的东西，但帮助最大的是google出来的一篇详细的如何使用threejs创建earth的<a href="http://blog.mastermaps.com/2013/09/creating-webgl-earth-with-threejs.html" rel="nofollow noreferrer" target="_blank">教程</a>。（如果这个教程早点冒出来，也省了前面改示例代码的时间了。主要也源于对threejs不熟悉，没有想到哪些示例可能已经有很多教程了）</p>
<p>换上了earth4.jpg贴图之后：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009667326?w=600&amp;h=300" src="https://static.alili.tech/img/remote/1460000009667326?w=600&amp;h=300" alt="" title="" style="cursor: pointer;"></span></p>
<p>教程中的步骤不再这里重复，下面仅仅对一些关键东西作简单的解释。</p>
<h3 id="articleHeader5">earth_bump</h3>
<p>了解到bumpmap：</p>
<blockquote><p>Bump mapping is a technique to simulate bumps and wrinkles on the surface of an object. The result is an apparently bumpy surface rather than a smooth surface although the surface of the underlying object is not actually changed. I'm sorry, you can't tilt the camera to see 3D mountains with this technique. You can adjust the bump effect (how much the map affects lighting) with the bumpScaleparameter</p></blockquote>
<p>threejs中bumpmap是调节对光线的感知，来使人能明显感觉到不光滑的表面，而并没有在mesh中添加起伏，即没有真的改变形状。</p>
<p>官方bumpmap示例效果图如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009667327?w=577&amp;h=515" src="https://static.alili.tech/img/remote/1460000009667327?w=577&amp;h=515" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>其实这里的earth_bump.jpg就是一个<a href="https://en.wikipedia.org/wiki/Digital_elevation_model" rel="nofollow noreferrer" target="_blank">DEM</a>，在threejs中称作bumpmap，在其他一些地方也有被叫做heightmap。即用灰度图表达高程，越黑表示高程越低，越亮表示高程越高。GIS专业中常用，unity3D中创建地形也会用到这个。</p>
<p>添加了earth_bump之后：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009667328?w=600&amp;h=300" src="https://static.alili.tech/img/remote/1460000009667328?w=600&amp;h=300" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader6">earth_spec</h3>
<p>了解到了earth_spec.jpg是specular map，用来调节镜面反射的，这里主要是调节海洋对光线的反射，增加真实性。</p>
<p>添加了earth_spec之后：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009667329?w=600&amp;h=300" src="https://static.alili.tech/img/remote/1460000009667329?w=600&amp;h=300" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader7">漂移的云层</h3>
<p>云层的添加， 前面的教程里已经很详细了，其实就是一个同心，半径大一点的球体而已。</p>
<p>添加了云层之后：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009667330?w=600&amp;h=300" src="https://static.alili.tech/img/remote/1460000009667330?w=600&amp;h=300" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader8">浮动的标签</h3>
<p>xplan中地球表面有城市标签，会随着地球的自转而移动，同时又保持了水平的方向。google关键词：threejs floating label。于是找到：</p>
<ul>
<li><p><a href="http://threejs.org/examples/#webgl_sprites" rel="nofollow noreferrer" target="_blank">http://threejs.org/examples/#...</a></p></li>
<li><p><a href="http://stemkoski.github.io/Three.js/Labeled-Geometry.html" rel="nofollow noreferrer" target="_blank">http://stemkoski.github.io/Th...</a></p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009667331?w=397&amp;h=481" src="https://static.alili.tech/img/remote/1460000009667331?w=397&amp;h=481" alt="" title="" style="cursor: pointer;"></span></p>
<p>找到方向就好办，稍微参考一下官方API文档和找到的示例代码，能够很容易的在earth上添加上浮动标签。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009667332?w=299&amp;h=151" src="https://static.alili.tech/img/remote/1460000009667332?w=299&amp;h=151" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader9">小结</h2>
<p>到这里，3D地球的绘制基本差不多了。虽然threejs是新东西，但是绝大部分功能都容易找到方向，并且改动一下示例代码都够快速的实现我们想要的效果，所这个过程并不难。重点是如何在一个未知的领域内找到想要的东西，并且快速的为自己所用。</p>
<p>但过程中我碰到一个性能问题，耽误了很久。xplan的页面在chrome的PC和手机模式都有近60的FPS，但是我创建的earth在PC有60，但是在手机模式却不到30！最后逐一调试代码，修改参数，花了好久才找到原因：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="renderer.setPixelRatio(window.devicePixelRatio)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">renderer</span><span class="hljs-selector-class">.setPixelRatio</span>(<span class="hljs-selector-tag">window</span><span class="hljs-selector-class">.devicePixelRatio</span>)</code></pre>
<p>threejs的示例代码中都有这么一行，就是这一行导致了我的代码比xplan的代码在手机上绘制的像素点翻倍，从而导致了性能成倍的下降。</p>
<p>另外，前面也提到，我对于3D框架中的距离单位和坐标问题，很模糊。于是这里，关于earth的大小，camera朝向，每个城市标签的三维坐标和其他关与三维坐标的问题，我都硬抄了xplan的参数（幸好他们的代码没有压缩...）。还有一个要承认的，就是地球后面的淡蓝色光晕效果，貌似用了一些高级的渲染技术，我也就硬搬了xplan这部分代码。</p>
<p>下一篇将介绍如何制作<strong>多步骤</strong>、<strong>可进可退</strong>的动画，在我看来这个才是技术难点。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
高仿腾讯QQ Xplan（X计划）的H5页面（1）：threejs创建地球

## 原文链接
[https://segmentfault.com/a/1190000009667320](https://segmentfault.com/a/1190000009667320)

