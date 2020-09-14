---
title: 'SegmentFault 技术周刊 Vol.35 - WebGL：打开网页看大片' 
date: 2018-12-28 2:30:11
hidden: true
slug: wzfgkdp4qh
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVWYnb?w=900&amp;h=385" src="https://static.alili.tech/img/bVWYnb?w=900&amp;h=385" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>WebGL 可以说是 HTML5 技术生态链中最为令人振奋的标准之一，它把 Web 带入了 3D 的时代。</p>
<h2 id="articleHeader0">初识 WebGL</h2>
<p>先通过几个使用 WebGL 的网站来认识下 WebGL 的魅力吧~</p>
<blockquote><p>温馨提示：浏览以下网页需要浏览器支持 WebGL 功能。:)</p></blockquote>
<p><a href="https://segmentfault.com/p/1210000011630380">20 个让人惊艳的运用 WebGL 的例子</a></p>
<p><a href="http://stars.chromeexperiments.com" rel="nofollow noreferrer" target="_blank">http://stars.chromeexperiment...</a></p>
<p><a href="http://www.nowyouseeme.movie" rel="nofollow noreferrer" target="_blank">http://www.nowyouseeme.movie</a></p>
<p><a href="http://webglsamples.org/" rel="nofollow noreferrer" target="_blank">http://webglsamples.org/</a></p>
<h2 id="articleHeader1">WebGL 入门</h2>
<p><a href="https://segmentfault.com/p/1210000011630028/read">WebGL 技术储备指南</a></p>
<blockquote>
<p>本文的预期读者是：不熟悉图形学，熟悉前端，希望了解或系统学习 WebGL 的同学。</p>
<p>本文不是 WebGL 的概述性文章，也不是完整详细的 WebGL 教程。本文只希望成为一篇供 WebGL 初学者使用的提纲。</p>
</blockquote>
<p><a href="https://segmentfault.com/a/1190000007106469" target="_blank">WebGL 初探</a></p>
<blockquote><p>用更专业的描述讲，WebGL (Web Graphics Library) 是一个用以渲染交互式 3D 和 2D 图形的无需插件且兼容下一代浏览器的 JavaScript API，通过 HTML5 中 &lt;canvas&gt; 元素实现功能。WebGL 是由 Khronos Group 集团制定，而非 W3C 组织。目前，我们可以使用的是 WebGL 第一个版本，它继承自 OpenGL ES 2.0 。而 OpenGL ES (OpenGL for Embedded Systems) 是 OpenGL 三维图形 API 的子集，针对手机、PDA 和游戏主机等嵌入式设备而设计。</p></blockquote>
<p><a href="https://segmentfault.com/a/1190000007167115">WebGL 绘制三角形</a></p>
<blockquote><p>本篇章将讲解如何使用 WebGL 绘制三角形，因为很多 3D 图形都是使用三角形为基础进行渲染的，所以有些对 GPU 性能指标的评价就是渲染三角形的能力。</p></blockquote>
<p><a href="https://segmentfault.com/p/1210000011631096/read" target="_blank">WebGL 与 THREE 入门 Lesson1：计算图形成像原理简介</a></p>
<blockquote><p>这篇文章我们将简单讲一下成像原理，以及附上的GPU绘制流水线。这个成像原理到绘制流水线的中间过渡可能有点跳跃。我当初学习的时候就在这里卡住了。因为学习过程中没有理解记录下来这个过程，所以现在没有办法还原自己的想法和大家分享，也没法给大家一些启示。所以随时随地记录下自己的想法真的很重要啊！！虽然可能不准确但是很真实啊！</p></blockquote>
<p><a href="https://segmentfault.com/p/1210000011522002/read">webgl 开发第一道坎：矩阵与坐标变换</a></p>
<blockquote><ul>
<li>一、齐次坐标</li>
<li>二、矩阵迷宫</li>
<li>三、模型矩阵与模型视图矩阵</li>
<li>四、透视矩阵</li>
<li>五、屏幕坐标变换</li>
</ul></blockquote>
<p><a href="https://segmentfault.com/a/1190000004414388" target="_blank">JavaScript Canvas——“WebGL”的注意要点</a></p>
<h2 id="articleHeader2">Threejs</h2>
<p><a href="https://segmentfault.com/a/1190000004354129">Three.js中文文档</a></p>
<blockquote><p>Three.js是一个在浏览器中使用WebGL创建3D变得容易的库。当你想创建一个立方体的时候，使用原生WebGL来创建，需要写数百行JavaScript代码，如果使用Three.js只需要几行代码就可以完成。</p></blockquote>
<p><a href="https://segmentfault.com/a/1190000008369453" target="_blank">Three.js学习笔记</a></p>
<blockquote><p>一个典型的Three.js程序至少要包括渲染器（Renderer）、场景（Scene）、照相机（Camera），以及你在场景中创建的物体。</p></blockquote>
<p><a href="https://segmentfault.com/a/1190000008729798">我的世界：一个村落（其一）</a></p>
<blockquote><p>本文是一篇three.js的入门文章，将介绍three.js的一些基本概念，并一步步搭建一个简单的场景模型：</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVWYvj?w=400&amp;h=226" src="https://static.alili.tech/img/bVWYvj?w=400&amp;h=226" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><a href="https://segmentfault.com/a/1190000008818133" target="_blank">我的世界：一个村落（其二）</a></p>
<blockquote><p>现在我们对three.js的基本元素与如何用three.js搭建场景有了一定的了解后，本篇我们开始搭建村落中山坡，房屋等对象。</p></blockquote>
<p><a href="https://segmentfault.com/a/1190000003883472">threejs构建web三维视图入门教程</a></p>
<blockquote>
<p>本文是一篇简单的webGL+threejs构建web三维视图的入门教程，你可以了解到利用threejs创建简单的三维图形，并且控制图形运动。</p>
<ul>
<li>一、创建场景</li>
<li>二、绘制图形</li>
<li>
<p>三、创建3d对象</p>
<ul>
<li>创建一个自己的对象</li>
<li>外部导入.obj文件</li>
</ul>
</li>
<li>
<p>四、动画</p>
<ul>
<li>基本的动画</li>
<li>对动画进行控制</li>
</ul>
</li>
</ul>
</blockquote>
<p><a href="https://segmentfault.com/a/1190000008423707" target="_blank">threejs 绘制地球、飞机、轨迹</a></p>
<blockquote><p>首先我们来看下要实现的效果：</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVWYuu?w=800&amp;h=591" src="https://static.alili.tech/img/bVWYuu?w=800&amp;h=591" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVWYuX?w=580&amp;h=492" src="https://static.alili.tech/img/bVWYuX?w=580&amp;h=492" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><a href="https://segmentfault.com/a/1190000009206983">Three.js 入门：如何使用并绘制基础 3D 图形</a></p>
<blockquote><p>在以上内容中，只写到了 Three.js 中提供的基础功能，还有很多高级的功能需要大家去探索。希望大家看完这篇文章后能对 Three.js 有一个初步的了解，并能够使用 Three.js 绘制出基础的 3D 图形。</p></blockquote>
<p><a href="https://segmentfault.com/a/1190000008545795" target="_blank">H5实例教学--3D全景(ThreeJs全景Demo)</a></p>
<blockquote><p>在现在市面上很多全景H5的环境下，要实现全景的方式有很多，可以用css3直接构建也可以用基于threeJs的库来实现，还有很多别的制作全景的软件使用。本教学适用于未开发过3D全景的工程狮。</p></blockquote>
<p><a href="https://segmentfault.com/a/1190000010490845">ThreeJS中的点击与交互——Raycaster的用法</a></p>
<blockquote><p>我们的手机屏幕是二维的，但是我们展示物体的世界是三维的，当我们在构建一个物体的时候我们是以一个三维世界既是世界坐标来构建，而转化为屏幕坐标展示在我们眼前，则需要经历多道矩阵变化，中间webGL替我们操作了许多事情。</p></blockquote>
<p><a href="https://segmentfault.com/a/1190000009667320" target="_blank">高仿腾讯QQ Xplan（X计划）的H5页面（1）：threejs创建地球</a></p>
<blockquote><p>这个h5的主要玩法很简单：地球自转的时候会播放背景音乐（比如海浪声），为了找到这个声音是从哪个地球上哪个地方传来的，需要长按下方的按钮，这时地球会自动转动到目标地点，然后镜头拉近，穿过云层，最后你会看到和这段声音相关的视频内容；松开手之后，上面的过程会倒退回去，地球又开始自转，播放着下段神秘的背景音乐。</p></blockquote>
<p><a href="https://segmentfault.com/p/1210000011522054/read">Threejs 开发 3D 地图实践总结</a></p>
<blockquote>
<p>前段时间连续上了一个月班，加班加点完成了一个3D攻坚项目。也算是由传统web转型到webgl图形学开发中，坑不少，做了一下总结分享。</p>
<ul>
<li>1、法向量问题</li>
<li>2、光源与面块颜色</li>
<li>3、POI标注</li>
<li>4、点击拾取问题</li>
<li>5、性能优化</li>
<li>6、面点击移动到屏幕中央</li>
<li>7、2/3D切换</li>
<li>8、3D中地理级别</li>
<li>9、poi碰撞</li>
</ul>
</blockquote>
<p><a href="https://segmentfault.com/a/1190000009240281" target="_blank">A-Frame.js 学习&amp;文档翻译（一）实体</a></p>
<blockquote><p>A-Frame是Mozilla 开源 web 虚拟现实框架，他能够非常方便的创建VR视口，载入部分格式的模型，设置照相机等，这为对计算机图形学不是很了解的同学，减轻了好多负担。我分别用了threeJS和A-Frame.js做了两个小项目，全英文文档看的好累，就顺便翻译了部分文档，之后会分享threeJS与模型导出与加载的一些坑。</p></blockquote>
<p><a href="https://segmentfault.com/a/1190000008796468">简单一招搞定 three.js 屏幕适配</a></p>
<blockquote>
<p>做过手机 H5 的同学可能会觉得屏幕适配挺麻烦。原因是设计师提供的设计稿尺寸比固定，但是前端开发者却要适配不同大小、长宽比的目标设备。适配的终极目标无非是最大程度把主体内容优雅地呈现给用户。开发和设计如果没有协调好的话可能会妥协比较丑陋的方案，例如由于设计比例问题，为了照顾主体内容不被裁剪，只好设备两边，或者上下留黑边这种。</p>
<p>不过在 3D 的世界里，我们不用担心会有黑边的问题，因为 3D 场景是无限延伸的，总能填满任何比例的屏幕。</p>
</blockquote>
<h2 id="articleHeader3">应用</h2>
<p><a href="https://segmentfault.com/a/1190000005792628" target="_blank">利用threejs实现3D全景图</a></p>
<p><a href="https://segmentfault.com/a/1190000011585559">基于HTML5和WebGL的3D网络拓扑结构图</a></p>
<blockquote><p>利用HT For Web中的3D组件来实现了一个小例子，整体实现的效果图：</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVWYxX?w=800&amp;h=725" src="https://static.alili.tech/img/bVWYxX?w=800&amp;h=725" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><a href="https://segmentfault.com/a/1190000010111348" target="_blank">D3 力导向图和 WebGL 的整合使用</a></p>
<blockquote><p>D3 是目前最流行的数据可视化库，WebGL 是目前 Web 端最快的绘制技术。由于性能问题的局限，将两者结合的尝试越来越多（如），本文将尝试用 D3 的力导向图 和 Three.js 和 PixiJS 结合。全文阅读完大概 5 分钟，因为你重点应该看代码。</p></blockquote>
<p><a href="https://segmentfault.com/a/1190000009242021">从3dMax导出供threeJS使用的带动作模型与加载</a></p>
<blockquote><p>在自己做的一个小玩意中，发现要从3dMax中导出js文件供给threeJS使用，真是太多坑了！所以打算详细记录一下方法，好像开发会3dMax的比较少，但是至少可以帮助开发与美工更好的沟通与交流。在文末，我会附上一个可加载的js模型,方便学习~</p></blockquote>
<p><a href="https://segmentfault.com/a/1190000008882483" target="_blank">Canvas + WebGL中文艺术字渲染</a></p>
<blockquote>
<p>用canvas原生api可以很容易地绘制文字，但是原生api提供的文字效果美化功能十分有限。如果想要绘制除描边、渐变这些常用效果以外的艺术字，又不用耗时耗力专门制作字体库的话，利用WebGL进行渲染是一种不错的选择。</p>
<p>这篇文章主要讲述如何利用canvas原生api获取文字像素数据，并对其进行笔画分割、边缘查找、法线计算等处理，最后将这些信息传入着色器，实现基本的光照立体文字。</p>
<p>利用canvas原生api获取文字像素信息的好处是，可以绘制任何浏览器支持的字体，而无需制作额外的字体文件；而缺陷是对一些高级需求（如笔画分割）的数据处理，时间复杂度较高。但对于个人项目而言，这是做出自定义艺术字效果比较快捷的方法。</p>
</blockquote>
<p><a href="https://segmentfault.com/a/1190000006059493">基于 WebSocket 实现 WebGL 3D 拓扑图实时数据通讯同步（一）</a></p>
<blockquote><p>在这里我们用比较易上手的 Node.js 的 Socket.IO 做通讯框架，Socket.IO 让长连接通讯变得无比简单，服务器再也不用等待客户端的请求就可以直接给客户端发送消息，根据这样的特性就可以实现数据通讯同步的问题。</p></blockquote>
<p><a href="https://segmentfault.com/a/1190000006070440" target="_blank">基于 WebSocket 实现 WebGL 3D 拓扑图实时数据通讯同步（二）</a></p>
<blockquote><p>有了前面的知识储备，我们就可以来真正实现我们 3D 拓扑图组件上节点位置信息的实时数据同步了，毋庸置疑，节点的位置信息必须是在服务端统筹控制，才能达到实时数据同步，也就是说，我们必须在服务端创建 DataModel 来管理节点，创建 ForceLayout 弹力布局节点位置，并在节点位置改变的过程中，实时地将位置信息推送到客户端，让每个客户端都更新各自页面上面的节点位置。</p></blockquote>
<p><a href="https://segmentfault.com/a/1190000002866653">HTML5，不只是看上去很美（第二弹：打造最美3D机房）</a></p>
<blockquote><p>在html5里面使用3D已经不是什么高深技术，它的基础是WebGL，一个OpenGL的浏览器子集，支持大部分主要3D功能接口。目前最新的浏览器都有比较好的支持，IE需要到11（是的，你没有看错）。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVWYzw?w=800&amp;h=450" src="https://static.alili.tech/img/bVWYzw?w=800&amp;h=450" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><a href="https://segmentfault.com/a/1190000003863028" target="_blank">打造最美HTML5 3D机房（第三季新增资产管理、动环监控）</a></p>
<blockquote><p>，第一期重点放在三维呈现和静态的资产管理上，第二期着重动环监控，这样基本上一个比较完整的数据中心监控系统就出来了。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVWYzZ?w=800&amp;h=478" src="https://static.alili.tech/img/bVWYzZ?w=800&amp;h=478" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><a href="https://segmentfault.com/a/1190000005699001">打造最美HTML5 3D机房（MONO哥强势归来，第四季惊艳发布）</a></p>
<p><span class="img-wrap"><img data-src="/img/bVWYBc?w=1249&amp;h=756" src="https://static.alili.tech/img/bVWYBc?w=1249&amp;h=756" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><a href="https://segmentfault.com/a/1190000007971411" target="_blank">[2016年末巨献] — HTML5可交互地铁线路图（第二季：帝都进阶版）</a></p>
<p><span class="img-wrap"><img data-src="/img/bVWYA0?w=800&amp;h=533" src="https://static.alili.tech/img/bVWYA0?w=800&amp;h=533" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><a href="https://segmentfault.com/a/1190000011511528">基于HTML5和WebGL的三维可视立体动态流程图</a></p>
<p><span class="img-wrap"><img data-src="/img/bVWYBq?w=800&amp;h=323" src="https://static.alili.tech/img/bVWYBq?w=800&amp;h=323" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><a href="https://segmentfault.com/a/1190000004041015" target="_blank">WebGL实现HTML5贪吃蛇3D游戏</a></p>
<blockquote><p>90来行所有JS源代码如下，各位游戏高手不要喷我，肯定很多人可以写得更精炼，但我只想通过这个玩一玩3D，HTML5和WebGL，包括给整天搞企业应用的自己换换脑子思考些新元素。</p></blockquote>
<h2 id="articleHeader4">WebVR</h2>
<p><a href="https://segmentfault.com/a/1190000006881030">浅谈 WebVR</a></p>
<blockquote>
<p>WebVR 是早期和实验性的 JavaScript API，它提供了访问如 Oculus Rift 和 Google Cardboard 等 VR 设备功能的 API。<br>在 Web 上开发 VR 应用，有下面三种（潜在）方式：</p>
<ul>
<li>JavaScript, Three.js 与 监听设备方向（Device Orientation）</li>
<li>JavaScript, Three.js 与 WebVR</li>
<li>CSS 与 WebVR（仍处于非常早期阶段）</li>
</ul>
<p>由于 WebVR 仍处于草案阶段并可能会有所改变，所以建议你基于 webvr-boilerplate 进行 WebVR 开发。</p>
</blockquote>
<p><a href="https://segmentfault.com/a/1190000006799630" target="_blank">WebVR如此近-three.js的WebVR示例解析</a></p>
<blockquote><p>WebVR是一个实验性的Javascript API，允许HMD（head-mounted displays）连接到web apps，同时能够接受这些设备的位置和动作信息。这让使用Javascript开发VR应用成为可能（当然已经有很多接口API让Javascript作为开发语言了，不过这并不影响我们为WebVR感到兴奋）。而让我们能够立马进行预览与体验，移动设备上的chrome已经支持了WebVR并使手机作为一个简易的HMD。手机可以把屏幕分成左右眼视觉并应用手机中的加速度计、陀螺仪等感应器，你需要做的或许就只是买一个cardboard。</p></blockquote>
<p><a href="https://segmentfault.com/a/1190000009440784">VR进化论|教你搭建通用的WebVR工程</a></p>
<blockquote>
<p>本文旨在介绍如何搭建WebVR工程以支持多场景开发。<br>实现功能</p>
<ul>
<li>VR多场景模块化开发</li>
<li>支持VR场景创建、回收、切换</li>
<li>项目自动化构建与压缩打包</li>
<li>支持es7/6</li>
</ul>
</blockquote>
<p><a href="https://segmentfault.com/a/1190000011598455" target="_blank">【WebVR教程翻译】超简单！用A-frame快速打造你的VR网站</a></p>
<blockquote>
<p>A-frame是由three.js封装而来的一组库，使用它可以方便地构建跨平台Web VR应用。如果你对它毫无概念，还没有准备好继续往下读，可以先看看A-frame官方示例，了解了解这个它是工作的，以及它能用来做什么。</p>
<p>在这篇文章中，我将教会你如何创建一个VR网站，你可以体验到在两个360°全景之间切换。实现这一效果，我们将会用到一些A-frame的特定代码和一点点JavaScript的代码。</p>
</blockquote>
<p><a href="https://segmentfault.com/a/1190000008904023">VR大潮来袭 ---前端开发能做些什么</a></p>
<blockquote><p>去年谷歌和火狐针对WebVR提出了WebVR API的标准，顾名思义，WebVR即web + VR的体验方式，我们可以戴着头显享受沉浸式的网页，新的API标准让我们可以使用js语言来开发。今天，约克先森将介绍如何开发一个WebVR网页，在此之前，我们有必要了解WebVR的体验方式。</p></blockquote>
<p><a href="https://segmentfault.com/a/1190000010571489" target="_blank">WebVR开发教程——深度剖析</a></p>
<blockquote><p>最近WebVR API 1.1已经发布，2.0草案也在拟定中，在我看来，WebVR走向大众浏览器是早晚的事情了，今天本人将对WebVR开发环境和开发流程进行深入介绍。</p></blockquote>
<p>本期完<br>:）</p>
<hr>
<blockquote><p>欢迎关注 SegmentFault 微信公众号 :)</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVWYCI?w=800&amp;h=372" src="https://static.alili.tech/img/bVWYCI?w=800&amp;h=372" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
SegmentFault 技术周刊 Vol.35 - WebGL：打开网页看大片

## 原文链接
[https://segmentfault.com/a/1190000011633728](https://segmentfault.com/a/1190000011633728)

