---
title: 'Web 前端中的增强现实（AR）开发技术' 
date: 2018-11-30 2:30:11
hidden: true
slug: j3952pb7bcp
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>本文作者 <a href="http://geekplux.com/" rel="nofollow noreferrer" target="_blank">GeekPlux</a>，博客地址：<a href="http://geekplux.com/2018/01/16/augmented-reality-development-tech-in-web-frontend.html" rel="nofollow noreferrer" target="_blank">http://geekplux.com/2018/01/18/augmented-reality-development-tech-in-web-frontend.html</a>。注明作者和地址即可转载。</blockquote>
<p>增强现实（以下简称 AR）浪潮正滚滚而来，Web 浏览器作为人们最唾手可得的人机交互终端，正在大力发展 AR 技术。很多 Web 前端工程师也在寻求职业转型，于是我把我近半年的相关调研结果在此汇结成文。本文力求把目前前端方向的 AR 技术都罗列一遍，细节不赘述（<em>保证文章篇幅不过长</em>），只做概括和科普（<em>因此文章中的链接很多</em>），零零散散写了一个多月（拖延症），欢迎已经在从事该领域或研究的道友前来纠正补充。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014891950?w=2048&amp;h=1536" src="https://static.alili.tech/img/remote/1460000014891950?w=2048&amp;h=1536" alt="Web AR 初音未来" title="Web AR 初音未来" style="cursor: pointer; display: inline;"></span></p>
<p>AR 可以简单的理解为一种实时将虚拟图像叠加在现实场景中的技术，且能交互[1]。我个人觉得 AR 比 VR 要有前景，主要因为：</p>
<blockquote>AR 的优势在于把目之所及的现实场景变成了背景，并将现实世界和数字世界无缝连接。</blockquote>
<p>当然这个“无缝”目前还谈不上，不过一直在进步。在谈 Web 前端如何做 AR 前，有必要先了解一下 AR 实现的 2 种主要方式和其关键技术：</p>
<h2 id="articleHeader0">AR 实现的方式和关键技术</h2>
<p>AR 的主要实现方式有 2 种[2][3]：光学透视式 (Optical see-through) 和视频透视式 (Video see-through)。目前，市面上的头戴式设备通常采用 2 种方式中的 1 种或 2 种都采用，而手持设备（手机、平板等）通常采用视频透视式。光学透视式是将电脑生成的数字图像显示在眼前的一层半透明镜片上，这样就可以使现实场景和虚拟信息同时出现在视网膜上。而视频透视式技术是将现实场景首先通过相机录入电脑，经过和虚拟对象整合、压缩，再统一呈现在用户眼前。两者各有优劣[4]：光学透视式中的现实场景因为没有经过电脑处理，因此显示得更自然、直接；虽然它实现简单，但是也存在定位精度不高、匹配不准确、显示有延迟等问题。而视频透视式因为经过整合，所以匹配准确，最终显示效果同步程度高，还能对生成的显示结果根据用户需求进行进一步处理；但是它实现难度较高，且丢失了一部分真实感。<strong>目前（2017 年底） Web 前端要想实现 AR，都是靠的视频透视式技术</strong>。</p>
<p>另外，计算机视觉技术在 AR 中起着至关重要的作用。因为<strong>实现 AR 最核心的是识别与追踪</strong>。首先，相机要先识别基准标志、关键点、光学图片等；然后再根据特征检测、边缘检测或其他图像处理方法来实时追踪；最后将虚拟图像叠加到真实场景中。根据 2008 年的统计结果显示，近十年著名的 AR 会议 ISMAR 中有关追踪技术的论文占到了 20%以上[3].</p>
<h2 id="articleHeader1">Web AR</h2>
<p>根据上一节的阐述，我们可以得出结论：要实现 AR 需要<strong>识别、追踪和渲染</strong>三步，在浏览器中也不外如是。另外，还可以结合传感器来提供更多的交互或让 AR 渲染得更准确、通过网络连接云端来加速计算或交换更多数据等。如下图所示，这是我自己整理出的一个 Web AR 流程图。Web AR 或者说移动 AR 在某些方面如便携性、传感器丰富、自带网络等还是有很大优势的，在此我就不多说了。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014891951?w=1951&amp;h=760" src="https://static.alili.tech/img/remote/1460000014891951?w=1951&amp;h=760" alt="Web AR 流程图" title="Web AR 流程图" style="cursor: pointer;"></span></p>
<h3 id="articleHeader2">WebVR 规范</h3>
<p>首先，Web AR 目前还是一项前沿技术，没有标准也没有成熟的库供使用，不过已经有大公司和一部分开发者正在积极推进。2017 年 10 月 2 日 W3C 的 <a href="https://www.w3.org/community/webvr/" rel="nofollow noreferrer" target="_blank">WebVR 组</a> 发布了 <a href="https://w3c.github.io/webvr/spec/1.1/" rel="nofollow noreferrer" target="_blank">WebVR 规范 1.1 版的初稿</a>，2.0 版还在热火朝天地修订当中。</p>
<blockquote>WebVR 是一个开放标准，使您可以在浏览器中体验 VR。我们的目标是让每个人都可以更轻松地体验 VR，无论您拥有什么设备。 -  <a href="https://webvr.info/" rel="nofollow noreferrer" target="_blank">webvr.info</a>
</blockquote>
<p>为什么本文的题目是 Web AR，这里却提到 WebVR 呢？因为 <strong>WebVR 规范中的部分 API 对 Web AR 也同样适用</strong>。比如 <a href="https://w3c.github.io/webvr/spec/latest/#pose" rel="nofollow noreferrer" target="_blank">VRDevicePose</a> 可以获取摄像头位置。这是目前唯一接近 Web AR 的标准，有了标准我们就可以只针对规范的接口做开发，从而适应绝大多数的设备。扩展阅读：<a href="https://medium.com/arjs/webvr-for-augmented-reality-f1e69a505902" rel="nofollow noreferrer" target="_blank">WebVR 于增强现实</a>，<a href="https://github.com/google-ar/three.ar.js/blob/master/webvr_ar_extension.md" rel="nofollow noreferrer" target="_blank">针对智能手机 AR 的 WebVR API 扩展</a>。</p>
<h3 id="articleHeader3">WebARonARKit, WebARonARCore</h3>
<p>ARKit 和 ARCore 分别是苹果和谷歌两大巨头出品的移动 AR SDK，提供的功能也类似：运动追踪、环境感知和光线感应，我相信很多对 AR 感兴趣的开发者对这两个 SDK 都不陌生。但这两个都是移动 AR 的 SDK，于是谷歌的 AR 团队提供了 <a href="https://github.com/google-ar/WebARonARKit" rel="nofollow noreferrer" target="_blank">WebARonARKit</a> 和 <a href="https://github.com/google-ar/WebARonARCore" rel="nofollow noreferrer" target="_blank">WebARonARCore</a> 两个库，以便开发者<strong>能用 Web 技术来基于 ARKit 和 ARCore 开发，从而实现 WebAR</strong>。目前这两个库都还在试验阶段，想吃螃蟹的人赶紧去试试。其实现原理都是结合特定系统（iOS 和 Android）扩展了 WebVR API。Google AR 团队封装了一个 <a href="https://github.com/google-ar/three.ar.js" rel="nofollow noreferrer" target="_blank">three.ar.js</a> 的库，提供了一些实用的 AR API，包括 ARView, ARReticle, ARPerspectiveCamera, ARDebug 和 ARUtils 等。</p>
<h3 id="articleHeader4">AR.js</h3>
<p>2017 年 SIGGRAPH（图形学顶级会议）上 <a href="https://github.com/jeromeetienne/AR.js" rel="nofollow noreferrer" target="_blank">AR.js</a> 可谓大放异彩，有人做了 Web AR <a href="https://twitter.com/Tojiro/status/892440983371042816" rel="nofollow noreferrer" target="_blank">相关的 session</a> 就是用了 AR.js 来讲解。AR.js 是 <a href="https://twitter.com/jerome_etienne" rel="nofollow noreferrer" target="_blank">Jerome Etienne</a> 开发的一款 Web AR 库，可以<a href="https://medium.com/arjs/augmented-reality-in-10-lines-of-html-4e193ea9fdbf" rel="nofollow noreferrer" target="_blank">用十行 HTML 就实现 AR</a>，并有 60 FPS 的帧率。但其实 AR.js 做的事很简单，它主要封装了以下几个库：</p>
<ul>
<li>WebRTC。下文会详细讲解，主要是获取视频流。</li>
<li>
<a href="https://github.com/artoolkit/jsartoolkit5" rel="nofollow noreferrer" target="_blank">JSARToolKit</a>。<a href="https://www.artoolkit.org/" rel="nofollow noreferrer" target="_blank">ARToolKit</a> 可以说是第一个开源的 AR 框架，在 1999 年发布，一直更新至今。虽然历史悠久但目前仍被广泛应用（<a href="https://www.artoolkit.org" rel="nofollow noreferrer" target="_blank">官方网站</a>的风格一点也没有历史感）。它主要提供了识别和追踪 marker 的功能，本文附录中还有补充。</li>
<li>Three.js, Babylon.js, A-Frame。这几个都是基于 WebGL 的渲染库，用于渲染要在 AR 环境中显示的东西，下文会扩充。</li>
</ul>
<p>由此观之，AR.js 像是一个把所有轮子都拼起来的瑞士军刀，简单易用。作者在 GitHub 和 Twitter 上都很活跃，有什么问题可以直接问他。</p>
<h3 id="articleHeader5">WebRTC 获取视频流</h3>
<p>前三节我们提到了一个正在成形的标准和两个框架，是目前 Web AR 的最新进展了。指望标准发布肯定黄花菜都凉了，但我们可以自己动手丰衣足食。</p>
<p>刚才我们说到 AR 首先要识别，那就要用到 WebRTC 技术。WebRTC（Web 实时通信，Web Real-Time Communication），顾名思义是一个支持网页浏览器进行实时语音对话或视频对话的技术。它其中有个很重要的 API：<strong>getUserMedia()</strong> 可以实时获取摄像头的视频流，这是视频透视式的 AR 实现的前提（目前 iOS 11 刚刚支持这个 API，Android 是很早就能用）。有了视频流我们就可以分析其中的特征点，运用计算机视觉的算法识别和追踪视频流中的事物。这里有 2 个要点也要提一下：一是 getUserMedia 默认获取的是前置摄像头，如果想获取后置摄像头的视频流，需要用 navigator.mediaDevices.enumerateDevices() 将设备的音频、视频设备遍历得到，具体参照 <a href="https://github.com/geekplux/AR-AI-VIS-demo/blob/master/src/index.js#L9-L32" rel="nofollow noreferrer" target="_blank">demo</a>；二是要用 https 打开网页才能访问摄像头。</p>
<h3 id="articleHeader6">Tracking.js, JSFeat, ConvNetJS, deeplearn.js, keras.js 识别与追踪</h3>
<p>获取到视频流之后的工作就是识别和追踪了。视频流你可以看作是一帧一帧的图像，所以处理视频流的过程可以理解为图像处理的过程。但这里其实还涉及到一个如何传输视频流的问题，一般有两种方式：</p>
<h4>1. 在前端直接处理视频流</h4>
<p>在前端直接进行图像处理，可以用 <a href="https://trackingjs.com/" rel="nofollow noreferrer" target="_blank">Tracking.js</a> 和 <a href="https://inspirit.github.io/jsfeat/" rel="nofollow noreferrer" target="_blank">JSFeat</a>。这两个库类似，都是在前端做计算机视觉的，包括提取特征点、人脸识别等。把 WebRTC 拿到的视频流直接传给它们并调用 API 就能得到自己想要的效果。对于一些成熟的算法，如人脸识别，可以直接拿到识别结果，如果自己要识别的物体比较复杂你也可以自己进行特征点的计算，但这可能在前端会算力不足，关于性能的问题下文再论述。</p>
<p>提到计算机视觉，不得不提深度学习，毕竟现在很多图像处理算法被深度学习吊打。<a href="https://cs.stanford.edu/people/karpathy/convnetjs/" rel="nofollow noreferrer" target="_blank">ConvNetJS</a>，是斯坦福大学开源的一个前端深度学习框架，可以让你在前端完成深度神经网络的训练。<a href="https://deeplearnjs.org/" rel="nofollow noreferrer" target="_blank">deeplearn.js</a> 则是 Google Brain 团队搞的，功能和 ConvNetJS 类似。现在 ConvNetJS 好像不怎么维护了，deeplearn.js 还在频繁更新中，感兴趣的同学可以试用一下。另外一个紧锣密鼓开发的深度学习库 <a href="https://github.com/transcranial/keras-js" rel="nofollow noreferrer" target="_blank">keras.js</a> 则是让你可以在浏览器中运行已经训练好的 Keras 模型（<a href="https://github.com/keras-team/keras" rel="nofollow noreferrer" target="_blank">Kears</a> 是著名的深度学习开发框架），并支持 WebGL 2。</p>
<p>这些框架都在主页上提供了丰富的 Demo，非常有趣，把玩一下说不定激发你的灵感。</p>
<h4>2. 前端传输视频流给后端，后端处理完毕返回结果到前端</h4>
<p>另一种处理视频流的方法就是传到后端去处理，后端处理方式的选择就数不胜数了，现在实现 AR 大多数用的都是 <a href="https://en.wikipedia.org/wiki/Simultaneous_localization_and_mapping" rel="nofollow noreferrer" target="_blank">SLAM</a> 算法，后端处理完返回前端结果即可。那么如何传输成了我们前端同学的难题，一般有这两种方法：</p>
<ul>
<li>传图片信息给后端。Canvas 提供了两个 API，一个是 toDataURL，它可以生成图片的 base64 字符串；另一个是 toBlob，这个方法是异步的，可以将图片转换成 Blob 文件对象，因为其是二进制的，所以更方便传给后端。具体使用来看，后者比前者的效率更高一点。</li>
<li>传像素信息给后端。WebGL 的 readPixels 方法，可以获取 framebuffer 中的像素值。</li>
</ul>
<p>除此之外应该还有其他方法，总之目标是将前端的图像信息传给后端，传输方式可以用 AJAX，也可以用 WebSocket，具体根据场景来定。</p>
<p>这一节主要讲了识别和追踪，其实除了单纯的对图像、视频流处理，我们还能通过移动端设备的各种传感器数据获取到更多的距离、深度、光照等信息，从而使识别追踪更准确。</p>
<h3 id="articleHeader7">A-Frame, Three.js, Babylon.js, Pixi.js, WebGL 渲染与交互</h3>
<p>讲完识别和追踪，终于该聊聊渲染了。<a href="https://aframe.io/" rel="nofollow noreferrer" target="_blank">A-Frame</a> 是 Mozilla 团队在 2015 年开源的一款做 WebVR 的框架，但日前 A-Frame 团队发布的 <a href="https://github.com/mozilla/aframe-xr" rel="nofollow noreferrer" target="_blank">aframe-xr</a> 其中包括了一些 Web AR 组件。一开始我们也说过 VR 和 AR 中有部分实现是重合的，所以用 A-Frame 的各种组件可以让你用很少的代码<a href="http://elevr.com/using-a-frame-for-webvr-and-ar/" rel="nofollow noreferrer" target="_blank">构建出 AR 所需要的 3D 立体世界</a>。提到 3D，不得不提 <a href="https://www.khronos.org/webgl/" rel="nofollow noreferrer" target="_blank">WebGL</a>。WebGL 是 OpenGL ES 在浏览器端的实现，你可以理解其为 OpenGL 的子集。用 WebGL 你可以操作前端的每一个像素点，懂一点图形学的同学一定知道它的强大，而且它能调用 GPU，所以前端涉及到 GPU 的地方也缺不了它。WebGL 虽然强大，但写起来异常复杂，学习成本也很高，而前端最著名的 3D 库 <a href="https://threejs.org/" rel="nofollow noreferrer" target="_blank">Three.js</a> 将繁琐的 WebGL API 进行了封装和优化，让你可以用可读性更好的代码在前端书写 WebGL。<a href="http://www.pixijs.com/" rel="nofollow noreferrer" target="_blank">Pixi.js</a> 和 Three.js 做了类似的事情，但它只支持 2D 渲染，不过它还是很好用的，如果你只是想用 WebGL 来做复杂的渲染但没涉及到 3D 场景，不妨试试它。<a href="https://www.babylonjs.com/" rel="nofollow noreferrer" target="_blank">Babylon.js</a> 就更牛了，它是一款游戏引擎，也是封装了 WebGL 在前端做高性能的渲染，但它和 Three.js 的关注点不一样，如果你对渲染的精细程度非常有要求，比如光线、阴影等，那么你可以考虑下 babylon.js，毕竟这是款由微软前员工开发的游戏引擎啊……</p>
<p>这些基于 WebGL 的渲染方法，有一个共性的难题是如何交互，比如 hover, click 效果如何实现。其实在 Web AR 中交互非常局限：如果是桌面设备即电脑，和浏览网页的交互差不多，有 hover, click, drag 拖拽等；如果用的是移动设备，即手机、平板，则可能有 zoom 的交互（这里多嘴一句，其实移动 AR 中，应该尽量避免手指去 zoom 的交互，而应该引导用户用移近或移远设备来进行放大缩小）。这些实现起来要依赖于 <a href="https://en.wikipedia.org/wiki/Ray_casting" rel="nofollow noreferrer" target="_blank">光线投射算法 Ray casting</a> 方法。Three.js 直接提供了 <a href="https://threejs.org/docs/#api/core/Raycaster" rel="nofollow noreferrer" target="_blank">Raycaster</a> 类供实现 ray casting 算法。其实原理很简单，就是摄像头（这里的摄像头不是指手机的摄像头，而是你渲染时的 Camera，可以参考 Three.js 中的 <a href="https://threejs.org/docs/#api/cameras/Camera" rel="nofollow noreferrer" target="_blank">Camera</a>）视作视点，与你在屏幕上触碰的点坐标连城一条射线，看这条射线与你视图中哪些物体相交。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014891952?w=700&amp;h=416" src="https://static.alili.tech/img/remote/1460000014891952?w=700&amp;h=416" alt="Ray casting 算法" title="Ray casting 算法" style="cursor: pointer;"></span></p>
<p>这一节主要讲了渲染与交互，事实上在实现 AR 的时候，识别追踪和渲染交互是同时进行的，如何给用户更好、更流畅的体验是现在 Web AR 的又一大难题。</p>
<h3 id="articleHeader8">性能</h3>
<p>性能是很多人关心的问题。目前浏览器的算力确实还不足以与客户端去媲美，但较之前也有了巨大的提升。识别和追踪本质上是像素级的计算，对算力的要求都很高，因此 maker-based 的 AR 定位效率通常比 makerless 的要高很多。此外，计算机视觉算法的效率对性能影响也很大，比如人脸识别目前较其他识别要成熟很多，所以人脸识别的算法在 Web 前端运行还算流畅。</p>
<p>提升性能的方法有很多种，大家一般会先想到用 WebGL 调用 GPU 加速，其次会想到用 Web Worker，WebAssembly。前两者我都试过，把纯计算的代码移到 WebGL 的 shader 或 Web Worker 里，这两者虽然都是加速计算，但适用场景不同。shader 可以用于加速<strong>只和渲染（重绘）有关的代码</strong>，无关渲染的代码放入 shader 中反而会造成重复计算。Web Worker 适用于事先计算或实时性要求不高的代码，如布局算法。WebAssembly 我还没在做 AR 的时候用过，还有一个库 <a href="https://github.com/gpujs/gpu.js" rel="nofollow noreferrer" target="_blank">gpu.js</a>也没试过，希望有大神试过之后告诉我有什么效果。</p>
<p>还有一种变相“提升”性能的方法是用滤波算法（比如<a href="https://zh.wikipedia.org/zh-hans/" rel="nofollow noreferrer" target="_blank">卡尔曼滤波</a>）将卡顿降到更小，让用户从视觉感受上似乎更流畅。</p>
<h3 id="articleHeader9">结尾</h3>
<p>现在 Web AR 大潮刚刚开始，有很多高地需要人去攻克，比如光照估计、性能优化等，希望有兴趣的同学可以积极参与进来。而且 Web 前端无论是技术还是人口都发展迅速，充满了无限可能，有限的只是你的想象力。我很久之前做了个<a href="https://github.com/geekplux/AR-AI-VIS-demo" rel="nofollow noreferrer" target="_blank">人脸识别 + AR 的小 demo</a>，在 GitHub 上 <a href="https://github.com/geekplux/AR-AI-VIS-demo" rel="nofollow noreferrer" target="_blank">https://github.com/geekplux/AR-AI-VIS-demo</a>，大家可以玩玩，其实就几行代码。下一篇可能会写写 Web 前端做人脸识别相关的文章，感觉又给自己挖了个大坑，希望我的拖延症早日治好。</p>
<h2 id="articleHeader10">附录：AR 开发技术</h2>
<p>参考文献 [2] 中曾总结了当时所有的 AR 开发技术，如下表:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014891953" src="https://static.alili.tech/img/remote/1460000014891953" alt="AR 开发技术" title="AR 开发技术" style="cursor: pointer; display: inline;"></span></p>
<p>这张表将 AR 开发工具分成了四类，分别罗列出来。其实目前大多的 AR 开发都是用 Unity 去做的，很多第三方 SDK 也都是先集成到 Unity 上，再由 Unity 输出到对应设备所需的格式。表中的 <a href="https://www.vuforia.com/" rel="nofollow noreferrer" target="_blank">Vuforia</a> 据我观察是目前用的最多的第三方 SDK。<strong><a href="https://www.artoolkit.org/" rel="nofollow noreferrer" target="_blank">ARToolKit</a> 则在 Web 前端和移动端用的很多</strong>，它的开源版是基于标记的 (Marker-based)，也提供机器学习的训练方法，让你可以将任意图片训练成 Marker。另外由于这张表是 2015 年的，当时苹果公司的 <a href="https://developer.apple.com/arkit/" rel="nofollow noreferrer" target="_blank">ARKit</a> 和谷歌的 <a href="https://developers.google.com/ar/" rel="nofollow noreferrer" target="_blank">ARCore</a> 这 2 个 SDK 还没有横空出世，可以将其归到表中的第三行。</p>
<h3 id="articleHeader11">参考文献</h3>
<ul>
<li>[1] Azuma R T. A survey of augmented reality[J]. Presence Teleoperators &amp; Virtual Environments, 1997, 6(4): 355-385</li>
<li>[2] Billinghurst M, Clark A, Lee G. A survey of augmented reality[J]. Foundations and Trends in Human-Computer Interaction, 2015, 8(2-3): 73-272</li>
<li>[3] Zhou F, Duh B L, Billinghurst M. Trends in augmented reality tracking, interaction and display: a review of ten years of ISMAR[C] //Proceedings of the 7th IEEE/ACM International Symposium on Mixed and Augmented Reality. Washington: IEEE Computer Society Press, 2008: 193-202</li>
<li>[4] Rolland J P, Fuchs H. Optical versus video see-through head-mounted displays in medical visualization[M]. Cambridge: MIT Press, 2000, 9: 287-309</li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Web 前端中的增强现实（AR）开发技术

## 原文链接
[https://segmentfault.com/a/1190000014891945](https://segmentfault.com/a/1190000014891945)

