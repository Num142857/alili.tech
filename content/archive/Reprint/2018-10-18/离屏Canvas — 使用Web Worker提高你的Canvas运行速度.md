---
title: 离屏Canvas — 使用Web Worker提高你的Canvas运行速度
reprint: true
categories: reprint
abbrlink: e116eb40
date: 2018-10-18 00:00:00
---

{{% raw %}}

            <p>现在因为有了离屏Canvas，你可以不用在你的主线程中绘制图像了！</p>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/canvas">Canvas</a> 是一个非常受欢迎的表现方式，同时也是WebGL的入口。它能绘制图形，图片，展示动画，甚至是处理视频内容。它经常被用来在富媒体web应用中创建炫酷的用户界面或者是制作在线（web）游戏。</p>
<p>它是非常灵活的，这意味着绘制在Canvas的内容可以被编程。举个🌰，JavaScript就提供了Canvas的系列API。这些给了Canvas非常好的灵活度。</p>
<p>但同时，在一些现代化的web站点，脚本解析运行是实现流畅用户反馈的最大的问题之一。因为Canvas计算和渲染和用户操作响应都发生在同一个线程中，在动画中（有时候很耗时）的计算操作将会导致App卡顿，降低用户体验。</p>
<p>幸运的是, <a href="https://developer.mozilla.org/en-US/docs/Web/API/OffscreenCanvas">OffscreenCanvas</a> 离屏Canvas可以非常棒的解决这个麻烦！</p>
<p>到目前为止，Canvas的绘制功能都与<code>&lt;canvas&gt;</code>标签绑定在一起，这意味着Canvas API和DOM是耦合的。而OffscreenCanvas，正如它的名字一样，通过将Canvas移出屏幕来解耦了DOM和Canvas API。</p>
<p>由于这种解耦，OffscreenCanvas的渲染与DOM完全分离了开来，并且比普通Canvas速度提升了一些，而这只是因为两者（Canvas和DOM）之间没有同步。但更重要的是，将两者分离后，Canvas将可以在Web Worker中使用，即使在Web Worker中没有DOM。这给Canvas提供了更多的可能性。</p>
<h2>在Worker中使用OffscreenCanvas</h2>
<p><a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers">Workers</a> 是一个Web版的线程——它允许你在幕后运行你的代码。将你的一部分代码放到Worker中可以给你的主线程更多的空闲时间，这可以提高你的用户体验度。就像其没有DOM一样，直到现在，在Worker中都没有Canvas API。</p>
<p>而OffscreenCanvas并不依赖DOM，所以在Worker中Canvas API可以被某种方法来代替。下面是我在Worker中用OffscreenCanvas来计算渐变颜色的🌰：</p>
<pre><code class="hljs lsl"><span class="hljs-comment">// file: worker.js</span>

function getGradientColor(percent) {
    const canvas = new OffscreenCanvas(<span class="hljs-number">100</span>, <span class="hljs-number">1</span>);
    const ctx = canvas.getContext('<span class="hljs-number">2</span>d');
    const gradient = ctx.createLinearGradient(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, canvas.width, <span class="hljs-number">0</span>);
    gradient.addColorStop(<span class="hljs-number">0</span>, 'red');
    gradient.addColorStop(<span class="hljs-number">1</span>, 'blue');
    ctx.fillStyle = gradient;
    ctx.fillRect(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, ctx.canvas.width, <span class="hljs-number">1</span>);
    const imgd = ctx.getImageData(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>, ctx.canvas.width, <span class="hljs-number">1</span>);
    const colors = imgd.data.slice(percent * <span class="hljs-number">4</span>, percent * <span class="hljs-number">4</span> + <span class="hljs-number">4</span>);
    return rgba(${colors[<span class="hljs-number">0</span>]}, ${colors[<span class="hljs-number">1</span>]}, ${colors[<span class="hljs-number">2</span>]}, ${colors[]);
}

getGradientColor(<span class="hljs-number">40</span>);  <span class="hljs-comment">// rgba(152, 0, 104, 255 )</span>


</code></pre><h2>不要阻塞主线程</h2>
<p>当我们将大量的计算移到Worker中运行时，可以释放主线程上的资源，这很有意思。我们可以使用transferControlToOffscreen 方法将常规的Canvas映射到OffscreenCanvas实例上。之后所有应用于OffscreenCanvas的操作将自动呈现在在源Canvas上。</p>
<pre><code class="hljs dart"><span class="hljs-keyword">const</span> offscreen = <span class="hljs-built_in">document</span>.<span class="hljs-built_in">querySelector</span>(<span class="hljs-string">'canvas'</span>).transferControlToOffscreen();
<span class="hljs-keyword">const</span> worker = <span class="hljs-keyword">new</span> Worker(<span class="hljs-string">'myworkerurl.js'</span>);
worker.postMessage({ canvas: offscreen }, [offscreen]);


</code></pre><p>OffscreenCanvas 是 [可转移的](<a href="https://developer.mozilla.org/en-US/docs/Web/API/Transferable">https://developer.mozilla.org/en-US/docs/Web/API/Transferable)</a>)。除了将其指定为传递信息中的字段之一以外，还需要将其作为postMessage（传递信息给Worker的方法）中的第二个参数传递出去，以便可以在Worker线程的context（上下文）中使用它。</p>
<p>在下面的🌰中，当颜色主题发生变化时会发生“复杂的计算”，这个计算即使在高性能的台式机上也要花费几毫秒。而你可以选择在主线程或Worker上运行这段动画。在主线程下，当复杂计算开始运行时，你将无法与按钮交互 - 线程被阻塞掉了。而在Worker下，UI的响应并没有被影响。</p>
<p><a href="https://devnook.github.io/OffscreenCanvasDemo/keep-ui-responsive.html">Demo</a></p>
<p>它也是另一种解释方式：任务繁忙的主线程也不会影响在Worker上运行的动画。所以即使主线程非常繁忙，你也可以通过此功能来避免掉帧并保证流畅的动画：</p>
<p><a href="https://devnook.github.io/OffscreenCanvasDemo/index.html">Demo</a></p>
<p>上例展示了在普通Canvas的下，当主线程被添加繁忙任务时动画被阻塞了，而基于Worker的OffscreenCanvas播放却很流利。</p>
<h2>与流行库一起使用</h2>
<p>得益于OffscreenCanvas API一般情况下与常规Canvas元素的相API兼容，你可以很轻松地渐进地使用它，也可以使用社区里的一些优秀的图形处理的库/框架。</p>
<p>举个🌰，你可以对其进行特征检测，如果可用的话，可通过在渲染的构造函数中指定canvas的配置项，然后实现与Three.js一起使用的功能：</p>
<pre><code class="hljs dart"><span class="hljs-keyword">const</span> canvasEl = <span class="hljs-built_in">document</span>.<span class="hljs-built_in">querySelector</span>(<span class="hljs-string">"canvas"</span>);
<span class="hljs-keyword">const</span> canvas = (<span class="hljs-string">'OffscreenCanvas'</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">window</span>) ? canvasEl.transferControlToOffscreen() : canvasEl;
canvas.style = { width: <span class="hljs-number">0</span>, height: <span class="hljs-number">0</span> }
<span class="hljs-keyword">const</span> renderer = <span class="hljs-keyword">new</span> THREE.WebGLRenderer({ canvas: canvas });


</code></pre><p>上例的问题是Three.js需要Canvas具有style.width和style.height属性。而OffscreenCanvas是与DOM完全分离的，没有这些属性。所以你需要自己提供这些属性，或者通过将其从three.js逻辑中删除或者自行编写这些值与初始Canvas尺寸相关联的逻辑。</p>
<p>下面是一个运行基本Three.js动画的demo：</p>
<p><a href="https://devnook.github.io/OffscreenCanvasDemo/use-with-lib.html">Demo</a></p>
<p>但是请记住，有一些与DOM相关的API在Worker中并不容易获得，因此如果你想使用更高级的Three.js功能（比如纹理）的话，可能需要更多变通的方法。有关这方面已经开始尝试的一些想法，请查看 <a href="https://www.youtube.com/watch?v=wkDd-x0EkFU">Google I/O 2017的视频</a>。</p>
<p>此视频的示例中出现的commit()方法我们并不推荐。请改用worker.requestAnimationFrame。</p>
<h2>结论</h2>
<p>如果你对图像绘画使用得非常多，OffscreenCanvas可以有效的提高你APP的性能。它使得Worker可以处理canvas的渲染绘制，让你的APP更好地利用了多核系统。</p>
<p>OffscreenCanvas在Chrome 69中已经不需要开启flag（实验性功能）就可以使用了。它也正在被 Firefox 实现。由于其API与普通canvas元素非常相似，所以你可以轻松地对其进行特征检测并循序渐进地使用它，而不会破坏现有的APP或库的运行逻辑。OffscreenCanvas在任何涉及到图形计算以及动画表现且与DOM关系并不密切（即依赖DOM API不多）的情况下，它都具有性能优势。</p>
<h2>其它资源</h2>
<ul>
<li><p><a href="https://html.spec.whatwg.org/#the-offscreencanvas-interface">W3c spec</a></p>
</li>
<li><p><a href="https://www.chromestatus.com/feature/4691191559880704">chromestatus.com entry</a></p>
</li>
</ul>

          
{{% /raw %}}

# 版权声明
原文链接: [https://www.zcfy.cc/article/offscreencanvas-speed-up-your-canvas-operations-with-a-web-worker](https://www.zcfy.cc/article/offscreencanvas-speed-up-your-canvas-operations-with-a-web-worker)
原文标题: 离屏Canvas — 使用Web Worker提高你的Canvas运行速度
本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，
原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！
