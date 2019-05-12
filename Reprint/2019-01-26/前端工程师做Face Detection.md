---
title: '前端工程师做Face Detection' 
date: 2019-01-26 2:30:18
hidden: true
slug: kwr9a8qmyj
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>因为项目原因，需要使用人脸检测（face detection）功能。身为一名前JAVA业务程序员和现前端程序员，这样的功能还是陌生的领域。那能不能通过搜索和学习能力，加上已有的编程思想，快速实现功能呢？这就是这篇文章的重点，凭借自己的技术与积累，走向自己不熟悉的领域。</p></blockquote>
<h2 id="articleHeader0">需求</h2>
<p>使用PC加摄像头，通过人脸检测，完成自动拍照功能。在PC的屏幕上，显示摄像头的实时画面，要是画面中检测出人脸，则触发拍照。</p>
<p>抽其关键点：摄像头，实时画面，人脸检测，和拍照</p>
<h2 id="articleHeader1">自己拥有的技能</h2>
<p>项目并没有要求开发应用的类型，那么我肯定是先从自身拥有的技能出发，看是否能寻求解决方案。身为前端，深知前端技术潜力无限，肯定有自己还不知道的技术。果不其然，找到了<a href="https://trackingjs.com/" rel="nofollow noreferrer" target="_blank">Tracking.js</a></p>
<p>Tracking.js是一个很有意思的库，体积小巧，在浏览器上，直接通过JS提供一些基本的Computer Vison相关的功能，如人脸检测（face detection），颜色识别(color detection)，特征识别(feature detection)。关键是，出了对静态图片能够进行识别和处理之外，还能够直接对视频（video）和摄像头（webcam）视屏流进行处理，这就基本给出了人脸识别的方案。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008474874?w=581&amp;h=336" src="https://static.alili.tech/img/remote/1460000008474874?w=581&amp;h=336" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>那如何拍照呢？我找到了<a href="https://pixlcore.com/read/WebcamJS" rel="nofollow noreferrer" target="_blank">WebcamJS</a>。能够在浏览器上读取摄像头视频流，调用函数截取某个时刻视频流帧为图片，即视为拍照。</p>
<h2 id="articleHeader2">解决方案一</h2>
<p>两个库一结合，就有了初步的解决方案，实现了功能，简单快速。</p>
<h3 id="articleHeader3">人脸检测能力不足</h3>
<p>在Tracking.js的官网上可以看到，demo的视频尺寸都是很小的，320 * 240，才能有30FPS的处理速度。尺寸如果大了，则识别速度慢，卡顿明显。项目中视频显示大小基本为1080P分辨率屏幕的三分之一，直接处理这个大小的视频，速度肯定不够。就算我不直接对大尺寸视频流进行处理，转而对一个隐藏的小尺寸视频流处理，将人脸位置映射到大视频流中，速度上没问题，但是可检测的人脸大小就有限了，即人必须离摄像头比较近才能被检测到。</p>
<h3 id="articleHeader4">视频流的清晰度不够</h3>
<p>使用的是罗技的1080P的网络摄像头，但是在浏览器上能够看到的，好像并没有以1080P的分辨率进行展示。尝试了一些参数的修改，但是结果都不尽人意。</p>
<h3 id="articleHeader5">人脸识别造成性能问题</h3>
<p>实时的视频流人脸识别，是很耗CPU的，下图中右边那个蓝色的陡坡就是在我关闭了Tracking.js的demo页面后CPU下降的曲线。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008474875?w=173&amp;h=84" src="https://static.alili.tech/img/remote/1460000008474875?w=173&amp;h=84" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>这种情况下，想添加一些传统的网页动效，简直卡出翔来。（关于这点，使用web worker进行人脸检测的工作，应该能有所帮助，但是自己并没有往这方面走）</p>
<h2 id="articleHeader6">继续寻找方案</h2>
<p>为了寻找上面的问题的解决办法，我了解到了Tracking.js和WebcamJS的运行原理。比如在浏览器上获取摄像头视频流，是通过<a href="https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia" rel="nofollow noreferrer" target="_blank">getUserMedia</a>，是基于<a href="https://webrtc.org/" rel="nofollow noreferrer" target="_blank">WebRTC</a>的支持。</p>
<p>WebcamJS就是通过<code>getuserMedia()</code>方法，获得摄像头的视频流信息，作为<code>&lt;video&gt;</code>标签的<code>src</code>属性，从来能够在网页上进行显示实时画面。通过<code>Canvas</code>的<code>drawImage()</code>方法，将video标签传入，即可绘制那个时刻视频帧的图像。（也是通过这次机会我才了解到<code>drawImage()</code>原来还可以接受<code>HTMLVideoElement</code>作为参数的）</p>
<p>之前就知道，一般做计算机视觉的，都会用<a href="http://opencv.org/" rel="nofollow noreferrer" target="_blank">opencv</a>库，这是个C++的库。同时又查到了，有人在node上做了opencv的扩展，并且看到了这个<a href="https://github.com/drejkim/face-detection-node-opencv" rel="nofollow noreferrer" target="_blank">Github项目</a>。于是为了检测效果，自己做了尝试。</p>
<h2 id="articleHeader7">解决方案二</h2>
<p>通过上面的学习，我已经能够在浏览器段获取摄像头的帧图像，并且知道opencv能做人脸检测。那么这次的方案思路就是：将视频流的帧图像，通过websocket发到后台服务器上，在服务器里使用opencv进行人脸分析，将人脸的坐标发送到前端。</p>
<p>这里后台我并没有使用<a href="https://github.com/peterbraden/node-opencv" rel="nofollow noreferrer" target="_blank">node-opencv</a>，而是使用<a href="https://www.qt.io/" rel="nofollow noreferrer" target="_blank">QT</a>直接做websocket服务器和调用opencv库（仗着自己曾也学过C++，就大胆的直接奔着C++去了）。</p>
<p>但是结果也不理想，原因如下。</p>
<h3 id="articleHeader8">发送图像给后台耗时大</h3>
<p>将图片发送给后台，首先想到的是使用Canvas的<code>toDataURL()</code>方法，将图片转成base64字符串，发给后台。但实测该方法很慢！640 * 480大小的图片，通过<code>toDataURL()</code>，大致需要50ms时间。</p>
<p>然后考虑使用<code>getImageData(0, 0, 640, 480)</code>方法，获取图片像素信息，然后转成字符串发到后台。经测，该方法比<code>toDataURL()</code>确实快不少，大致在5ms左右。但是将它转成JSON字符串，则很慢很慢。</p>
<p>最后查到，<code>toDataURL('image/jpeg')</code>会加快速度，因为这里不需要计算Alpha通道。实测，小于10ms。</p>
<p>之前有担心的网络传输耗时问题，倒是得到了证实，这个担心是没有必要的。因为是本地传输，通过websocket传输一张图片（小尺寸或者大尺寸）base64字符串大小的内容，耗时都很小，算下来FPS能够上50。</p>
<h3 id="articleHeader9">CPU消耗大</h3>
<table>
<thead><tr>
<th>Approach</th>
<th>CPU %</th>
</tr></thead>
<tbody>
<tr>
<td>QT Opencv Face Detection</td>
<td>30%</td>
</tr>
<tr>
<td>Tracking.js Face Detection</td>
<td>50%</td>
</tr>
<tr>
<td>Websocket + Opencv</td>
<td>90%</td>
</tr>
</tbody>
</table>
<p>不确定自己在实现上是否哪里出了问题，导致这么高的CPU使用率。但不管怎么，还是放弃了这个方案。</p>
<h2 id="articleHeader10">解决方案三</h2>
<p>竟然都使用上了QT，就大步向前走好了，毕竟这样的图像处理程序，还是做桌面应用是做合适的。况且QT体系中的<a href="https://en.wikipedia.org/wiki/QML" rel="nofollow noreferrer" target="_blank">QML</a>语言，能够使用JS，学起来有点像在学一个新的前端MVVM框架，好感度和信心瞬间提升不少。</p>
<p>使用QML做界面，使用<a href="http://doc.qt.io/qt-5/qml-qtmultimedia-camera.html" rel="nofollow noreferrer" target="_blank">Camera</a>和<a href="http://doc.qt.io/qt-5/qml-qtmultimedia-videooutput.html" rel="nofollow noreferrer" target="_blank">VideoOutput</a>组件进行摄像头视频的实时显示，这里能指定显示分辨率和FPS，很方便；配合使用<a href="http://doc.qt.io/qt-5/qvideofilterrunnable.html" rel="nofollow noreferrer" target="_blank">QVideoFilterRunnable</a>和<a href="http://doc.qt.io/qt-5/qabstractvideofilter.html" rel="nofollow noreferrer" target="_blank">QAbstractVideoFilter</a>类对帧进行处理，异步返回给主界面人脸检测的结果；opencv和另外一个能做人脸识别的C++库<a href="http://dlib.net/" rel="nofollow noreferrer" target="_blank">Dlib</a>结合使用，能够完成640 * 480尺寸的30FPS处理。</p>
<p>再优化！给每一帧图片进行人脸识别，速度和识别能力都可以提高，就是通过Dlib中提供的<a href="http://dlib.net/video_tracking_ex.cpp.html" rel="nofollow noreferrer" target="_blank">Video Object Tracking</a>来完成。一旦对某一帧能够检测到人脸之后，对之后的帧执行该人脸区域图像的tracking。这样做的效果能够获得更高的FPS，同时tracking还能完成更远距离脸部的捕获。</p>
<p>到这里，方案才觉得差不多了。</p>
<h2 id="articleHeader11">总结</h2>
<p>面对项目中自己的未知领域，如果不缺钱，那么直接买商业解决方案。<a href="http://visagetechnologies.com/" rel="nofollow noreferrer" target="_blank">Visage Tech</a>提供的HTML5的人脸识别解决方案（好像用了WebAssembly），简直变态：快速！准确！稳定！核心科技就是和我们这些小打小闹的不一样。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008474876?w=653&amp;h=494" src="https://static.alili.tech/img/remote/1460000008474876?w=653&amp;h=494" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>如果不购买商用解决方案，那么应该尽量找到能够帮助自己的朋友，指条正确的方向能够节省很多调查摸索的时间。比如，如果需求要求程序在拍照时还能控制外接的灯泡，完成闪光灯的效果。那么如何使用软件完成对外部硬件的控制呢？这样的功能对于我这个非计算机专业的而言，真是蒙圈了。最后还是经历的大半天的摸索，才找到GPIO的解决办法。</p>
<p>提高编程的素养，扩大自己的兴趣面，热爱技术，善于google，逻辑思路清晰，那么在面对不熟悉的领域，新的技术，也能够找到解决方案。并且这个过程能让自己获得不少知识，face detection， object tracking， tracking.js， webcamJS， getUserMedia()， toDataURL()的性能，opencv，dlib，QML，GPIO，树莓派，我还差点去现学了Python。这些东西没有必要都是深究，但是知道他们的存在，会给扩展自己的思路。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
前端工程师做Face Detection

## 原文链接
[https://segmentfault.com/a/1190000008474871](https://segmentfault.com/a/1190000008474871)

