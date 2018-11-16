---
title: 使用 OpenCV 进行高动态范围（HDR）成像
hidden: true
categories: [reprint]
slug: 855c5353
date: 2018-10-18 00:00:00
---

{{< raw >}}

            <h1><a href="#使用-opencv-进行高动态范围hdr成像"></a>使用 OpenCV 进行高动态范围（HDR）成像</h1>
<p>在本教程中，我们将学习如何使用由不同曝光设置拍摄的多张图像创建高动态范围High Dynamic Range（HDR）图像。 我们将以 C++ 和 Python 两种形式分享代码。</p>
<h3><a href="#什么是高动态范围成像"></a>什么是高动态范围成像？</h3>
<p>大多数数码相机和显示器都是按照 24 位矩阵捕获或者显示彩色图像。 每个颜色通道有 8 位，因此每个通道的像素值在 0-255 范围内。 换句话说，普通的相机或者显示器的动态范围是有限的。</p>
<p>但是，我们周围世界动态范围极大。 在车库内关灯就会变黑，直接看着太阳就会变得非常亮。 即使不考虑这些极端，在日常情况下，8 位的通道勉强可以捕捉到现场场景。 因此，相机会尝试去评估光照并且自动设置曝光，这样图像的最关注区域就会有良好的动态范围，并且太暗和太亮的部分会被相应截取为 0 和 255。</p>
<p>在下图中，左侧的图像是正常曝光的图像。 请注意，由于相机决定使用拍摄主体（我的儿子）的设置，所以背景中的天空已经完全流失了，但是明亮的天空也因此被刷掉了。 右侧的图像是由 iPhone 生成的HDR图像。</p>
<p><a href="http://www.learnopencv.com/wp-content/uploads/2017/09/high-dynamic-range-hdr.jpg"><img src="https://p0.ssl.qhimg.com/t01e438d59d57cea30e.jpg" alt="High Dynamic Range (HDR)"></a></p>
<p>iPhone 是如何拍摄 HDR 图像的呢？ 它实际上采用三种不同的曝光度拍摄了 3 张图像，3 张图像拍摄非常迅速，在 3 张图像之间几乎没有产生位移。然后组合三幅图像来产生 HDR 图像。 我们将在下一节看到一些细节。</p>
<blockquote>
<p>将在不同曝光设置下获取的相同场景的不同图像组合的过程称为高动态范围（HDR）成像。</p>
</blockquote>
<h3><a href="#高动态范围hdr成像是如何工作的"></a>高动态范围（HDR）成像是如何工作的？</h3>
<p>在本节中，我们来看下使用 OpenCV 创建 HDR 图像的步骤。</p>
<blockquote>
<p>要想轻松学习本教程，请点击<a href="http://www.learnopencv.com/wp-content/uploads/2017/10/hdr.zip">此处</a><a href="http://www.learnopencv.com/wp-content/uploads/2017/10/hdr.zip">下载</a> C++ 和 Python 代码还有图像。 如果您有兴趣了解更多关于人工智能，计算机视觉和机器学习的信息，请<a href="https://bigvisionllc.leadpages.net/leadbox/143948b73f72a2%3A173c9390c346dc/5649050225344512/">订阅</a>我们的电子杂志。</p>
</blockquote>
<h3><a href="#第-1-步捕获不同曝光度的多张图像"></a>第 1 步：捕获不同曝光度的多张图像</h3>
<p>当我们使用相机拍照时，每个通道只有 8 位来表示场景的动态范围（亮度范围）。 但是，通过改变快门速度，我们可以在不同的曝光条件下拍摄多个场景图像。 大多数单反相机（SLR）有一个功能称为自动包围式曝光Auto Exposure Bracketing（AEB），只需按一下按钮，我们就可以在不同的曝光下拍摄多张照片。 如果你正在使用 iPhone，你可以使用这个<a href="https://itunes.apple.com/us/app/autobracket-hdr/id923626339?mt=8&amp;ign-mpt=uo%3D8">自动包围式 HDR 应用程序</a>，如果你是一个 Android 用户，你可以尝试一个<a href="https://play.google.com/store/apps/details?id=com.almalence.opencam&amp;hl=en">更好的相机应用程序</a>。</p>
<p>场景没有变化时，在相机上使用自动包围式曝光或在手机上使用自动包围式应用程序，我们可以一张接一张地快速拍摄多张照片。 当我们在 iPhone 中使用 HDR 模式时，会拍摄三张照片。</p>
<ol>
<li>曝光不足的图像：该图像比正确曝光的图像更暗。 目标是捕捉非常明亮的图像部分。</li>
<li>正确曝光的图像：这是相机将根据其估计的照明拍摄的常规图像。</li>
<li>曝光过度的图像：该图像比正确曝光的图像更亮。 目标是拍摄非常黑暗的图像部分。</li>
</ol>
<p>但是，如果场景的动态范围很大，我们可以拍摄三张以上的图片来合成 HDR 图像。 在本教程中，我们将使用曝光时间为1/30 秒，0.25 秒，2.5 秒和 15 秒的 4 张图像。 缩略图如下所示。</p>
<p><a href="http://www.learnopencv.com/wp-content/uploads/2017/10/hdr-image-sequence.jpg"><img src="https://p0.ssl.qhimg.com/t01ec3a255b434c2109.jpg" alt="Auto Exposure Bracketed  HDR image sequence"></a></p>
<p>单反相机或手机的曝光时间和其他设置的信息通常存储在 JPEG 文件的 EXIF 元数据中。 查看此<a href="https://www.howtogeek.com/289712/how-to-see-an-images-exif-data-in-windows-and-macos">链接</a>可在 Windows 和 Mac 中查看存储在 JPEG 文件中的 EXIF 元数据。 或者，您可以使用我最喜欢的名为 <a href="https://www.sno.phy.queensu.ca/%7Ephil/exiftool">EXIFTOOL</a> 的查看 EXIF 的命令行工具。</p>
<p>我们先从读取分配到不同曝光时间的图像开始。</p>
<p><strong>C++</strong></p>
<pre><code class="hljs cpp"><span class="hljs-function"><span class="hljs-keyword">void</span> <span class="hljs-title">readImagesAndTimes</span><span class="hljs-params">(<span class="hljs-built_in">vector</span>&lt;Mat&gt; &amp;images, <span class="hljs-built_in">vector</span>&lt;<span class="hljs-keyword">float</span>&gt; &amp;times)</span>
</span>{

  <span class="hljs-keyword">int</span> numImages = <span class="hljs-number">4</span>;

  <span class="hljs-comment">// 曝光时间列表</span>
  <span class="hljs-keyword">static</span> <span class="hljs-keyword">const</span> <span class="hljs-keyword">float</span> timesArray[] = {<span class="hljs-number">1</span>/<span class="hljs-number">30.0f</span>,<span class="hljs-number">0.25</span>,<span class="hljs-number">2.5</span>,<span class="hljs-number">15.0</span>};
  times.assign(timesArray, timesArray + numImages);

  <span class="hljs-comment">// 图像文件名称列表</span>
  <span class="hljs-keyword">static</span> <span class="hljs-keyword">const</span> <span class="hljs-keyword">char</span>* filenames[] = {<span class="hljs-string">"img_0.033.jpg"</span>, <span class="hljs-string">"img_0.25.jpg"</span>, <span class="hljs-string">"img_2.5.jpg"</span>, <span class="hljs-string">"img_15.jpg"</span>};
  <span class="hljs-keyword">for</span>(<span class="hljs-keyword">int</span> i=<span class="hljs-number">0</span>; i &lt; numImages; i++)
  {
    Mat im = imread(filenames[i]);
    images.push_back(im);
  }

}

</code></pre><p><strong>Python</strong></p>
<pre><code class="hljs ruby"><span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">readImagesAndTimes</span><span class="hljs-params">()</span></span>:
  <span class="hljs-comment"># 曝光时间列表</span>
  times = np.array([ <span class="hljs-number">1</span>/<span class="hljs-number">30.0</span>, <span class="hljs-number">0</span>.<span class="hljs-number">25</span>, <span class="hljs-number">2.5</span>, <span class="hljs-number">15.0</span> ], dtype=np.float32)

  <span class="hljs-comment"># 图像文件名称列表</span>
  filenames = [<span class="hljs-string">"img_0.033.jpg"</span>, <span class="hljs-string">"img_0.25.jpg"</span>, <span class="hljs-string">"img_2.5.jpg"</span>, <span class="hljs-string">"img_15.jpg"</span>]
  images = []
  <span class="hljs-keyword">for</span> filename <span class="hljs-keyword">in</span> <span class="hljs-symbol">filenames:</span>
    im = cv2.imread(filename)
    images.append(im)

  <span class="hljs-keyword">return</span> images, times

</code></pre><h3><a href="#第-2-步对齐图像"></a>第 2 步：对齐图像</h3>
<p>合成 HDR 图像时使用的图像如果未对齐可能会导致严重的伪影。 在下图中，左侧的图像是使用未对齐的图像组成的 HDR 图像，右侧的图像是使用对齐的图像的图像。 通过放大图像的一部分（使用红色圆圈显示的）我们会在左侧图像中看到严重的鬼影。</p>
<p><a href="http://www.learnopencv.com/wp-content/uploads/2017/10/aligned-unaligned-hdr-comparison.jpg"><img src="https://p0.ssl.qhimg.com/t016150a7632cecde54.jpg" alt="Misalignment problem in HDR"></a></p>
<p>在拍摄照片制作 HDR 图像时，专业摄影师自然是将相机安装在三脚架上。 他们还使用称为<a href="https://www.slrlounge.com/workshop/using-mirror-up-mode-mirror-lockup">镜像锁定</a>功能来减少额外的振动。 即使如此，图像可能仍然没有完美对齐，因为没有办法保证无振动的环境。 使用手持相机或手机拍摄图像时，对齐问题会变得更糟。</p>
<p>幸运的是，OpenCV 提供了一种简单的方法，使用 <code>AlignMTB</code> 对齐这些图像。 该算法将所有图像转换为中值阈值位图median threshold bitmaps（MTB）。 图像的 MTB 生成方式为将比中值亮度的更亮的分配为 1，其余为 0。 MTB 不随曝光时间的改变而改变。 因此不需要我们指定曝光时间就可以对齐 MTB。</p>
<p>基于 MTB 的对齐方式的代码如下。</p>
<p><strong>C++</strong></p>
<pre><code class="hljs xl"><span class="hljs-comment">// 对齐输入图像</span>
Ptr&lt;AlignMTB&gt; alignMTB = createAlignMTB();
<span class="hljs-function"><span class="hljs-title">alignMTB</span>-&gt;</span>process(images, images);

</code></pre><p><strong>Python</strong></p>
<pre><code class="hljs makefile"><span class="hljs-comment"># 对齐输入图像</span>
alignMTB = cv2.createAlignMTB()
alignMTB.process(images, images)

</code></pre><h3><a href="#第-3-步提取相机响应函数"></a>第 3 步：提取相机响应函数</h3>
<p>典型相机的响应与场景亮度不成线性关系。 那是什么意思呢？ 假设有两个物体由同一个相机拍摄，在现实世界中其中一个物体是另一个物体亮度的两倍。 当您测量照片中两个物体的像素亮度时，较亮物体的像素值将不会是较暗物体的两倍。 在不估计相机响应函数Camera Response Function（CRF）的情况下，我们将无法将图像合并到一个HDR图像中。</p>
<p>将多个曝光图像合并为 HDR 图像意味着什么？</p>
<p>只考虑图像的某个位置 <code>(x,y)</code> 一个像素。 如果 CRF 是线性的，则像素值将直接与曝光时间成比例，除非像素在特定图像中太暗（即接近 0）或太亮（即接近 255）。 我们可以过滤出这些不好的像素（太暗或太亮），并且将像素值除以曝光时间来估计像素的亮度，然后在像素不差的（太暗或太亮）所有图像上对亮度值取平均。我们可以对所有像素进行这样的处理，并通过对“好”像素进行平均来获得所有像素的单张图像。</p>
<p>但是 CRF 不是线性的， 我们需要评估 CRF 把图像强度变成线性，然后才能合并或者平均它们。</p>
<p>好消息是，如果我们知道每个图像的曝光时间，则可以从图像估计 CRF。 与计算机视觉中的许多问题一样，找到 CRF 的问题本质是一个最优解问题，其目标是使由数据项和平滑项组成的目标函数最小化。 这些问题通常会降维到线性最小二乘问题，这些问题可以使用奇异值分解Singular Value Decomposition（SVD）来解决，奇异值分解是所有线性代数包的一部分。 CRF 提取算法的细节在<a href="http://www.pauldebevec.com/Research/HDR/debevec-siggraph97.pdf">从照片提取高动态范围辐射图</a>这篇论文中可以找到。</p>
<p>使用 OpenCV 的 <code>CalibrateDebevec</code> 或者 <code>CalibrateRobertson</code> 就可以用 2 行代码找到 CRF。本篇教程中我们使用 <code>CalibrateDebevec</code></p>
<p><strong>C++</strong></p>
<pre><code class="hljs shell">// 获取图像响应函数 (CRF)
Mat responseDebevec;
Ptr&lt;CalibrateDebevec&gt; calibrateDebevec = createCalibrateDebevec();
<span class="hljs-meta">calibrateDebevec-&gt;</span><span class="bash">process(images, responseDebevec, <span class="hljs-built_in">times</span>);</span>


</code></pre><p><strong>Python</strong></p>
<pre><code class="hljs ini"><span class="hljs-comment"># 获取图像响应函数 (CRF)</span>
<span class="hljs-attr">calibrateDebevec</span> = cv2.createCalibrateDebevec()
<span class="hljs-attr">responseDebevec</span> = calibrateDebevec.process(images, times)

</code></pre><p>下图显示了使用红绿蓝通道的图像提取的 CRF。</p>
<p><a href="http://www.learnopencv.com/wp-content/uploads/2017/10/camera-response-function.jpg"><img src="https://p0.ssl.qhimg.com/t01f7d0e42bf54d3d16.jpg" alt="Camera Response Function"></a></p>
<h3><a href="#第-4-步合并图像"></a>第 4 步：合并图像</h3>
<p>一旦 CRF 评估结束，我们可以使用 <code>MergeDebevec</code> 将曝光图像合并成一个HDR图像。 C++ 和 Python 代码如下所示。</p>
<p><strong>C++</strong></p>
<pre><code class="hljs gcode"><span class="hljs-comment">// 将图像合并为HDR线性图像</span>
Mat hdrDebevec;
Ptr&lt;MergeDebevec&gt; mergeDebevec = createMergeDebevec<span class="hljs-comment">()</span>;
mergeDebevec-&gt;process<span class="hljs-comment">(images, hdrDebevec, times, responseDebevec)</span>;
<span class="hljs-comment">// 保存图像</span>
imwrite<span class="hljs-comment">("hdrDebevec.hdr", hdrDebevec)</span>;

</code></pre><p><strong>Python</strong></p>
<pre><code class="hljs makefile"><span class="hljs-comment"># 将图像合并为HDR线性图像</span>
mergeDebevec = cv2.createMergeDebevec()
hdrDebevec = mergeDebevec.process(images, times, responseDebevec)
<span class="hljs-comment"># 保存图像</span>
cv2.imwrite(<span class="hljs-string">"hdrDebevec.hdr"</span>, hdrDebevec)

</code></pre><p>上面保存的 HDR 图像可以在 Photoshop 中加载并进行色调映射。示例图像如下所示。</p>
<p><a href="http://www.learnopencv.com/wp-content/uploads/2017/10/hdr-Photoshop-Tonemapping.jpg"><img src="https://p0.ssl.qhimg.com/t0170ec4e9b42f495be.jpg" alt="HDR Photoshop tone mapping"></a></p>
<p><em>HDR Photoshop 色调映射</em></p>
<h3><a href="#第-5-步色调映射"></a>第 5 步：色调映射</h3>
<p>现在我们已经将我们的曝光图像合并到一个 HDR 图像中。 你能猜出这个图像的最小和最大像素值吗？ 对于黑色条件，最小值显然为 0。 理论最大值是什么？ 无限大！ 在实践中，不同情况下的最大值是不同的。 如果场景包含非常明亮的光源，那么最大值就会非常大。</p>
<p>尽管我们已经使用多个图像恢复了相对亮度信息，但是我们现在又面临了新的挑战：将这些信息保存为 24 位图像用于显示。</p>
<p>将高动态范围（HDR）图像转换为 8 位单通道图像的过程称为色调映射。这个过程的同时还需要保留尽可能多的细节。</p>
<p>有几种色调映射算法。 OpenCV 实现了其中的四个。 要记住的是没有一个绝对正确的方法来做色调映射。 通常，我们希望在色调映射图像中看到比任何一个曝光图像更多的细节。 有时色调映射的目标是产生逼真的图像，而且往往是产生超现实图像的目标。 在 OpenCV 中实现的算法倾向于产生现实的并不那么生动的结果。</p>
<p>我们来看看各种选项。 以下列出了不同色调映射算法的一些常见参数。</p>
<ol>
<li>伽马gamma：该参数通过应用伽马校正来压缩动态范围。 当伽马等于 1 时，不应用修正。 小于 1 的伽玛会使图像变暗，而大于 1 的伽马会使图像变亮。</li>
<li>饱和度saturation：该参数用于增加或减少饱和度。 饱和度高时，色彩更丰富，更浓。 饱和度值接近零，使颜色逐渐消失为灰度。</li>
<li>对比度contrast：控制输出图像的对比度（即 <code>log(maxPixelValue/minPixelValue)</code>）。</li>
</ol>
<p>让我们来探索 OpenCV 中可用的四种色调映射算法。</p>
<h4><a href="#drago-色调映射"></a>Drago 色调映射</h4>
<p>Drago 色调映射的参数如下所示：</p>
<pre><code class="hljs lsl">createTonemapDrago
(
<span class="hljs-type">float</span>   gamma = <span class="hljs-number">1.0</span>f,
<span class="hljs-type">float</span>   saturation = <span class="hljs-number">1.0</span>f,
<span class="hljs-type">float</span>   bias = <span class="hljs-number">0.85</span>f 
)   

</code></pre><p>这里，<code>bias</code> 是 <code>[0, 1]</code> 范围内偏差函数的值。 从 0.7 到 0.9 的值通常效果较好。 默认值是 0.85。 有关更多技术细节，请参阅这篇<a href="http://resources.mpi-inf.mpg.de/tmo/logmap/logmap.pdf">论文</a>。</p>
<p>C++ 和 Python 代码如下所示。 参数是通过反复试验获得的。 最后的结果乘以 3 只是因为它给出了最令人满意的结果。</p>
<p><strong>C++</strong></p>
<pre><code class="hljs armasm">// 使用Drago色调映射算法获得<span class="hljs-number">24</span>位彩色图像
<span class="hljs-symbol">Mat</span> <span class="hljs-keyword">ldrDrago;
</span><span class="hljs-symbol">Ptr</span>&lt;TonemapDrago&gt; tonemapDrago = createTonemapDrago(<span class="hljs-number">1</span>.<span class="hljs-number">0</span>, <span class="hljs-number">0</span>.<span class="hljs-number">7</span>)<span class="hljs-comment">;</span>
<span class="hljs-symbol">tonemapDrago</span>-&gt;process(hdrDebevec, <span class="hljs-keyword">ldrDrago);
</span><span class="hljs-keyword">ldrDrago </span>= <span class="hljs-number">3</span> * <span class="hljs-keyword">ldrDrago;
</span><span class="hljs-symbol">imwrite</span>(<span class="hljs-string">"ldr-Drago.jpg"</span>, <span class="hljs-keyword">ldrDrago </span>* <span class="hljs-number">255</span>)<span class="hljs-comment">;</span>

</code></pre><p><strong>Python</strong></p>
<pre><code class="hljs makefile"><span class="hljs-comment"># 使用Drago色调映射算法获得24位彩色图像</span>
tonemapDrago = cv2.createTonemapDrago(1.0, 0.7)
ldrDrago = tonemapDrago.process(hdrDebevec)
ldrDrago = 3 * ldrDrago
cv2.imwrite(<span class="hljs-string">"ldr-Drago.jpg"</span>, ldrDrago * 255)

</code></pre><p>结果如下：</p>
<p><a href="http://www.learnopencv.com/wp-content/uploads/2017/10/hdr-Drago.jpg"><img src="https://p0.ssl.qhimg.com/t018b62eb20529d62f8.jpg" alt="HDR tone mapping using Drago's algorithm"></a></p>
<p><em>使用Drago算法的HDR色调映射</em></p>
<h4><a href="#durand-色调映射"></a>Durand 色调映射</h4>
<p>Durand 色调映射的参数如下所示：</p>
<pre><code class="hljs lsl">createTonemapDurand 
(   
  <span class="hljs-type">float</span>     gamma = <span class="hljs-number">1.0</span>f, 
  <span class="hljs-type">float</span>     contrast = <span class="hljs-number">4.0</span>f,
  <span class="hljs-type">float</span>     saturation = <span class="hljs-number">1.0</span>f,
  <span class="hljs-type">float</span>     sigma_space = <span class="hljs-number">2.0</span>f,
  <span class="hljs-type">float</span>     sigma_color = <span class="hljs-number">2.0</span>f 
); 

</code></pre><p>该算法基于将图像分解为基础层和细节层。 使用称为双边滤波器的边缘保留滤波器来获得基本层。 <code>sigma_space</code> 和<code>sigma_color</code> 是双边滤波器的参数，分别控制空间域和彩色域中的平滑量。</p>
<p>有关更多详细信息，请查看这篇<a href="https://people.csail.mit.edu/fredo/PUBLI/Siggraph2002/DurandBilateral.pdf">论文</a>。</p>
<p><strong>C++</strong></p>
<pre><code class="hljs lsl"><span class="hljs-comment">// 使用Durand色调映射算法获得24位彩色图像</span>
Mat ldrDurand;
Ptr&lt;TonemapDurand&gt; tonemapDurand = createTonemapDurand(<span class="hljs-number">1.5</span>,<span class="hljs-number">4</span>,<span class="hljs-number">1.0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>);
tonemapDurand-&gt;process(hdrDebevec, ldrDurand);
ldrDurand = <span class="hljs-number">3</span> * ldrDurand;
imwrite(<span class="hljs-string">"ldr-Durand.jpg"</span>, ldrDurand * <span class="hljs-number">255</span>);

</code></pre><p><strong>Python</strong></p>
<pre><code class="hljs lsl"># 使用Durand色调映射算法获得<span class="hljs-number">24</span>位彩色图像
 tonemapDurand = cv2.createTonemapDurand(<span class="hljs-number">1.5</span>,<span class="hljs-number">4</span>,<span class="hljs-number">1.0</span>,<span class="hljs-number">1</span>,<span class="hljs-number">1</span>)
 ldrDurand = tonemapDurand.process(hdrDebevec)
 ldrDurand = <span class="hljs-number">3</span> * ldrDurand
 cv2.imwrite(<span class="hljs-string">"ldr-Durand.jpg"</span>, ldrDurand * <span class="hljs-number">255</span>)

</code></pre><p>结果如下：</p>
<p><a href="http://www.learnopencv.com/wp-content/uploads/2017/10/hdr-Durand.jpg"><img src="https://p0.ssl.qhimg.com/t012d6724a7d21f3d43.jpg" alt="HDR tone mapping using Durand's algorithm"></a></p>
<p><em>使用Durand算法的HDR色调映射</em></p>
<h4><a href="#reinhard-色调映射"></a>Reinhard 色调映射</h4>
<pre><code class="hljs lsl">
createTonemapReinhard
(
<span class="hljs-type">float</span>   gamma = <span class="hljs-number">1.0</span>f,
<span class="hljs-type">float</span>   intensity = <span class="hljs-number">0.0</span>f,
<span class="hljs-type">float</span>   light_adapt = <span class="hljs-number">1.0</span>f,
<span class="hljs-type">float</span>   color_adapt = <span class="hljs-number">0.0</span>f 
)   

</code></pre><p><code>intensity</code> 参数应在 <code>[-8, 8]</code> 范围内。 更高的亮度值会产生更明亮的结果。 <code>light_adapt</code> 控制灯光，范围为 <code>[0, 1]</code>。 值 1 表示仅基于像素值的自适应，而值 0 表示全局自适应。 中间值可以用于两者的加权组合。 参数 <code>color_adapt</code> 控制色彩，范围为 <code>[0, 1]</code>。 如果值被设置为 1，则通道被独立处理，如果该值被设置为 0，则每个通道的适应级别相同。中间值可以用于两者的加权组合。</p>
<p>有关更多详细信息，请查看这篇<a href="http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.106.8100&amp;rep=rep1&amp;type=pdf">论文</a>。</p>
<p><strong>C++</strong></p>
<pre><code class="hljs lsl"><span class="hljs-comment">// 使用Reinhard色调映射算法获得24位彩色图像</span>
Mat ldrReinhard;
Ptr&lt;TonemapReinhard&gt; tonemapReinhard = createTonemapReinhard(<span class="hljs-number">1.5</span>, <span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>);
tonemapReinhard-&gt;process(hdrDebevec, ldrReinhard);
imwrite(<span class="hljs-string">"ldr-Reinhard.jpg"</span>, ldrReinhard * <span class="hljs-number">255</span>);

</code></pre><p><strong>Python</strong></p>
<pre><code class="hljs lsl"># 使用Reinhard色调映射算法获得<span class="hljs-number">24</span>位彩色图像
tonemapReinhard = cv2.createTonemapReinhard(<span class="hljs-number">1.5</span>, <span class="hljs-number">0</span>,<span class="hljs-number">0</span>,<span class="hljs-number">0</span>)
ldrReinhard = tonemapReinhard.process(hdrDebevec)
cv2.imwrite(<span class="hljs-string">"ldr-Reinhard.jpg"</span>, ldrReinhard * <span class="hljs-number">255</span>)

</code></pre><p>结果如下：</p>
<p><a href="http://www.learnopencv.com/wp-content/uploads/2017/10/hdr-Reinhard.jpg"><img src="https://p0.ssl.qhimg.com/t014ee95e5ad48e96b1.jpg" alt="HDR tone mapping using Reinhard's algorithm"></a></p>
<p><em>使用Reinhard算法的HDR色调映射</em></p>
<h4><a href="#mantiuk-色调映射"></a>Mantiuk 色调映射</h4>
<pre><code class="hljs lsl">createTonemapMantiuk
(   
<span class="hljs-type">float</span>   gamma = <span class="hljs-number">1.0</span>f,
<span class="hljs-type">float</span>   scale = <span class="hljs-number">0.7</span>f,
<span class="hljs-type">float</span>   saturation = <span class="hljs-number">1.0</span>f 
)   

</code></pre><p>参数 <code>scale</code> 是对比度比例因子。 从 0.7 到 0.9 的值通常效果较好</p>
<p>有关更多详细信息，请查看这篇<a href="http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.60.4077&amp;rep=rep1&amp;type=pdf">论文</a>。</p>
<p><strong>C++</strong></p>
<pre><code class="hljs lsl"><span class="hljs-comment">// 使用Mantiuk色调映射算法获得24位彩色图像</span>
Mat ldrMantiuk;
Ptr&lt;TonemapMantiuk&gt; tonemapMantiuk = createTonemapMantiuk(<span class="hljs-number">2.2</span>,<span class="hljs-number">0.85</span>, <span class="hljs-number">1.2</span>);
tonemapMantiuk-&gt;process(hdrDebevec, ldrMantiuk);
ldrMantiuk = <span class="hljs-number">3</span> * ldrMantiuk;
imwrite(<span class="hljs-string">"ldr-Mantiuk.jpg"</span>, ldrMantiuk * <span class="hljs-number">255</span>);

</code></pre><p><strong>Python</strong></p>
<pre><code class="hljs makefile"><span class="hljs-comment"># 使用Mantiuk色调映射算法获得24位彩色图像</span>
tonemapMantiuk = cv2.createTonemapMantiuk(2.2,0.85, 1.2)
ldrMantiuk = tonemapMantiuk.process(hdrDebevec)
ldrMantiuk = 3 * ldrMantiuk
cv2.imwrite(<span class="hljs-string">"ldr-Mantiuk.jpg"</span>, ldrMantiuk * 255)

</code></pre><p>结果如下：</p>
<p><a href="http://www.learnopencv.com/wp-content/uploads/2017/10/hdr-Mantiuk.jpg"><img src="https://p0.ssl.qhimg.com/t0109e4bcad7ac27665.jpg" alt="HDR tone mapping using Mantiuk's algorithm"></a></p>
<p><em>使用Mantiuk算法的HDR色调映射</em></p>
<h3><a href="#订阅然后下载代码"></a>订阅然后下载代码</h3>
<p>如果你喜欢这篇文章，并希望下载本文中使用的代码（C++ 和 Python）和示例图片，请<a href="https://bigvisionllc.leadpages.net/leadbox/143948b73f72a2%3A173c9390c346dc/5649050225344512/">订阅</a>我们的电子杂志。 您还将获得免费的<a href="https://bigvisionllc.leadpages.net/leadbox/143948b73f72a2%3A173c9390c346dc/5649050225344512/">计算机视觉资源</a>指南。 在我们的电子杂志中，我们分享了用 C++ 还有 Python 编写的 OpenCV 教程和例子，以及计算机视觉和机器学习的算法和新闻。</p>
<p><a href="https://bigvisionllc.leadpages.net/leadbox/143948b73f72a2%3A173c9390c346dc/5649050225344512/">点此订阅</a></p>
<p>图片致谢</p>
<p>本文中使用的四个曝光图像获得 <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a> 许可，并从<a href="https://en.wikipedia.org/wiki/High-dynamic-range_imaging">维基百科的 HDR 页面</a>下载。 图像由 Kevin McCoy拍摄。</p>
<hr>
<p>作者简介：</p>
<p>我是一位热爱计算机视觉和机器学习的企业家，拥有十多年的实践经验（还有博士学位）。</p>
<p>2007 年，在完成博士学位之后，我和我的顾问 David Kriegman 博士还有 Kevin Barnes 共同创办了 TAAZ 公司。 我们的计算机视觉和机器学习算法的可扩展性和鲁棒性已经经过了试用了我们产品的超过 1 亿的用户的严格测试。</p>
<hr>
<p>via: <a href="http://www.learnopencv.com/high-dynamic-range-hdr-imaging-using-opencv-cpp-python/">http://www.learnopencv.com/high-dynamic-range-hdr-imaging-using-opencv-cpp-python/</a></p>
<p>作者：<a href="http://www.learnopencv.com/about/">SATYA MALLICK</a> 译者：<a href="https://github.com/Flowsnow">Flowsnow</a> 校对：<a href="https://github.com/wxy">wxy</a></p>
<p>本文由 <a href="https://github.com/LCTT/TranslateProject">LCTT</a> 原创编译，<a href="https://linux.cn/">Linux中国</a> 荣誉推出</p>

          
{{< /raw >}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/high-dynamic-range-imaging-using-opencv-cpp-python](https://www.zcfy.cc/article/high-dynamic-range-imaging-using-opencv-cpp-python)
原文标题: 使用 OpenCV 进行高动态范围（HDR）成像
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
