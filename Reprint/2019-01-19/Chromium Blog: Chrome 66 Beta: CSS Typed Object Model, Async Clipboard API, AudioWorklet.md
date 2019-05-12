---
title: 'Chromium Blog: Chrome 66 Beta: CSS Typed Object Model, Async Clipboard API, AudioWorklet' 
date: 2019-01-19 2:30:10
hidden: true
slug: 5wvfux6qfld
categories: [reprint]
---

{{< raw >}}

            <h1>Chrome 66 Beta: CSS Typed Object Model, Async Clipboard API, AudioWorklet</h1>
<p>除非额外注明，以下描述的更新皆适用于 Android, Chrome OS，Linux，macOS 和 Windows 平台 Chrome Beta 渠道的最新发布。Chrome 66 的全部功能列表在 <a href="https://www.chromestatus.com/features#milestone%3D66">ChromeStatus</a> 上可以查看到。</p>
<h3>ImageBitMap Rendering Context <code>&lt;canvas&gt;</code></h3>
<p>以前把一张图片渲染到 canvas 上要包含两个部分，首先创建一个<code>&lt;img&gt;</code> 标签，然后把其内容渲染到 canvas 上。这就导致内存中存在图片的多份拷贝。<a href="https://www.chromestatus.com/features/5709799995998208">一种新的 rendering context</a> 通过避免内存复制简化了 <code>ImageBitMap</code> 对象的显示步骤，提高了渲染效率。本例展示了如何使用 <code>ImageBitmapRenderingContext</code>. 本质上它只是转移图片像素的所有权。该例子把图片像素从一个 blob 转移到一个 <code>&lt;canvas&gt;</code>，其实像素也能在 <code>&lt;canvas&gt;</code> 元素之间转移。值得注意的是这个 blob 是被压缩过的所以它在内存中并不是一份全量的拷贝。</p>
<pre><code class="hljs javascript"><span class="hljs-keyword">const</span> image = <span class="hljs-keyword">await</span> createImageBitmap(imageBlob);
<span class="hljs-keyword">const</span> canvas = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'canvas'</span>);
<span class="hljs-keyword">const</span> context = canvas.getContext(<span class="hljs-string">'bitmaprenderer'</span>);
context.transferFromImageBitmap(image);
canvas.toBlob(<span class="hljs-function">(<span class="hljs-params">outputJPEGBlob</span>) =&gt;</span>
{ <span class="hljs-comment">// Do something with outputJPEGBlob. }, 'image/jpeg');</span>

</code></pre><p>如果这里不使用 <code>createImageBitmap()</code>，<code>imageBlob</code> 将会延迟解码，这将导致卡顿。另一方面，<code>createImageBitmap()</code>  是异步的，使用之前已经完全解码了，避免了卡顿。例如一个 WebGL 游戏可以使用这个功能在游戏进行中一边在后台加载新的贴图。</p>
<h3>CSS Typed Object Model</h3>
<p>以前开发者想要操作 CSS 属性不得不操作浏览器返回的字符串，然后浏览器再把字符串转化回类型化表示。让事情更糟的是，当开发者尝试用 JavaScript 读取 CSS 属性值时，这个类型化的值被转成了一个字符串。在 66 版中，<a href="https://www.chromestatus.com/features/5682491075592192">Chrome 实现</a> 了 <a href="https://www.chromestatus.com/features/5682491075592192">CSS Typed Object Model ( OM ) Level 1</a> ，<a href="https://developers.google.com/web/updates/2016/05/houdini">Houdini</a> 的一部分，<a href="https://chromium.googlesource.com/chromium/src/+/master/third\_party/WebKit/Source/core/css/cssom/README.md">CSS properties 的子集</a>。Typed OM 通过把 CSS 值暴露为类型化 JavaScript 对象而非字符串，减少了开发者和浏览器的负担。Typed OM 在允许高性能操作 CSS 属性值的同时，也使得开发者能写出维护性更高的更易于理解的代码。这个简短的例子阐释了这一点。之前如果我想设置一个元素的不透明度我会这样做：</p>
<pre><code class="hljs maxima">el.<span class="hljs-built_in">style</span>.<span class="hljs-built_in">opacity</span> = <span class="hljs-number">0.3</span>;
el.<span class="hljs-built_in">style</span>.<span class="hljs-built_in">opacity</span> === <span class="hljs-string">"0.3"</span>

</code></pre><p>有了 CSSOM:</p>
<pre><code class="hljs routeros">el.attributeStyleMap.<span class="hljs-builtin-name">set</span>(<span class="hljs-string">"opacity"</span>, CSS.number(<span class="hljs-string">"0.3"</span>));
el.attributeStyleMap.<span class="hljs-builtin-name">get</span>(<span class="hljs-string">"opacity"</span>).value === 0.3 
</code></pre><p>上面返回的值类型是 <code>CSSUnitValue</code>, 它比字符串更容易操作。</p>
<h3>Asynchronous Clipboard API</h3>
<p>新的<a href="https://developers.google.com/web/updates/2018/03/clipboardapi">异步剪贴板 API</a> 提供了一种基于 promise 的方式来读写剪贴板。它比<a href="https://www.chromestatus.com/feature/5223997243392000">在 Chrome 43 中发布的老的 <code>execCommand('copy')</code> API </a> 更加容易，同时还集成了 <a href="https://www.chromestatus.com/feature/6376494003650560">Permissions API</a>。在未来的 Chrome 发布中，富类型数据，包括图片，也将得到支持。让我们做一些简单的文本读写操作来品一品这个 API。</p>
<pre><code class="hljs coffeescript"><span class="hljs-keyword">try</span> { 
    <span class="hljs-keyword">await</span> navigator.clipboard.writeText(<span class="hljs-string">"Hello, clipboard."</span>);
} <span class="hljs-keyword">catch</span> { 
    <span class="hljs-built_in">console</span>.error(<span class="hljs-string">"Unable to write to clipboard."</span>);
} 
</code></pre><p>相似地，读取文本:</p>
<pre><code class="hljs haskell"><span class="hljs-title">const</span> <span class="hljs-class"><span class="hljs-keyword">data</span> = await navigator.clipboard.readText();</span>
<span class="hljs-title">console</span>.log(<span class="hljs-string">"From the clipboard:"</span>, <span class="hljs-class"><span class="hljs-keyword">data</span>);</span>
</code></pre><p>要获取更多信息，包括如何使用 API 的安全性和授权，阅读 <a href="https://developers.google.com/web/updates/2018/03/clipboardapi">Unblocking Clipboard Access</a> ，查看我们的<a href="https://github.com/GoogleChrome/samples/tree/gh-pages/async-clipboard">样例</a>.</p>
<h3>AudioWorklet</h3>
<p>老的 <code>ScriptProcessorNode</code>  是异步的，并且需要线程切换，这会导致音频输出不稳定。<code>AudioWorklet</code> 对象提供了一种新的同步 Javascript 执行上下文，允许开发者以编程方式无延迟地控制音频，使音频输出有更高的稳定性。在 <a href="https://googlechromelabs.github.io/web-audio-samples/audio-worklet/">Google Chrome Labs</a> 你可以看到代码示例。除 AudioWorklet 之外，还提供了其他的 worklet API。 Chrome 65/Opera 52 发布了 <code>PaintWorklet</code>，<code>AnimationWorklet</code> 也在计划中。在 <code>AudioWorklet</code> 发布后的某个时候，<code>ScriptProcessorNode</code> 将被废除。</p>
<h3>Other Features in this Release</h3>
<h4>Blink &gt; Animation</h4>
<p><code>add</code> 和 <code>accumulate</code> 组合操作旨在构建模块化动画。<code>add</code> 和 <code>accumulate</code> 关键字即将在 Chrome 中得到支持。那时它们不再会抛出错误。这是为了与 Firefox 和其他实现保持兼容性。</p>
<h4>Blink &gt; CSS</h4>
<p>CSS 有两个新特性。</p>
<ul>
<li><p>根据 <a href="https://drafts.csswg.org/css-values-4/#calc-notation">CSS Values and Units Module Level 4</a>标准，数学表达式 <code>calc(),</code> <code>min()</code>, 和 <code>max()</code> 现在在媒体查询中得到了支持。这个更新使函数表达式与其他类型的规则一致，在允许数字的地方，也允许使用这些函数。</p>
</li>
<li><p><code>rgb()</code> 和 <code>rgba()</code> 函数现在支持浮点数值。</p>
</li>
</ul>
<h4>Blink &gt; Feature Policy</h4>
<p>默认地，<code>deviceorientation</code>, <code>deviceorientationabsolute</code>, 和 <code>devicemotion</code> 事件现在限制在顶级文档或者同源的子 frame 中触发，效果和在 <a href="https://github.com/WICG/feature-policy/blob/gh-pages/features.md">feature policy</a> 中把这些特性设置为 <code>'self'</code> 一样。要修改这个行为表现，需要显式地<a href="https://github.com/WICG/feature-policy/blob/gh-pages/features.md#sensor-features">启用或禁用相关的特性</a>。</p>
<h4>Blink &gt; File API</h4>
<p>如果尝试从无效的或者不存在的 blob URL 读取内容，<a href="https://developer.mozilla.org/en-US/docs/Web/API/File">File API</a> 现在会得到网络错误而非404 错误。</p>
<h4>Blink &gt; Forms</h4>
<p>HTML forms 有两个特性。</p>
<ul>
<li>根据规范要求 <code>&lt;textarea&gt;</code> 元素和 <code>&lt;select&gt;</code> 元素现在支持 <code>autocomplete</code> 属性。</li>
<li><a href="https://html.spec.whatwg.org/#checkbox-state-(type=checkbox">根据 HTML 规范要求</a>), 可更改的 checkbox 现在会触发3次事件，一次 <code>click</code> 事件, 接着一次 <code>input</code> 事件，然后触发一次  <code>change</code> 事件。之前只会触发 <code>click</code> 和 <code>change</code> 事件。</li>
</ul>
<h4>Blink &gt; Fullscreen</h4>
<p>如果全屏模式下的页面打开了一个弹窗并调用 <code>window.focus()</code> 获得焦点，<a href="https://www.chromestatus.com/feature/5732193850621952">页面将退出全屏模式</a>。如果弹窗通过其他方式获得焦点则页面不会退出全屏。</p>
<h4>Blink &gt; GetUserMedia</h4>
<p><code>MediaStreamTrack</code> 接口上新增了名为 <code>getCapabilities()</code> 的方法，它会返回 <code>MediaTrackCapabilities</code> 对象，指明了每个可约束属性的值或者值的范围。结果因设备而异。</p>
<h4>Blink &gt; JavaScript</h4>
<p>Javascript 有数个改变。</p>
<ul>
<li><p><code>Function.prototype.toString()</code> 函数现在能精确地返回源码中的内容。它包含空格和其他可能未被使用的文本。例如，如果 function 关键字和函数名字之间有注释，注释同时也会被返回。</p>
</li>
<li><p><a href="https://github.com/tc39/proposal-json-superset">JSON 现在是 ECMAScript 的语法子集</a>，字符串中允许出现行分隔符 (U+2028)和段落分隔符 (U+2029)。</p>
</li>
<li><p><code>try</code> 语句的 <code>catch</code> 从句现在支持<a href="https://tc39.github.io/proposal-optional-catch-binding/">无参数形式</a>了。</p>
</li>
<li><p>除已经实现的 <code>String.prototype.trim()</code> 外，现在 <code>String.prototype.trimStart()</code> and <code>String.prototype.trimLeft()</code> 可以使用了，是修剪字符串前后空白的标准方法。为保持后向兼容，非标准的 <code>trimLeft()</code> 和 <code>trimRight()</code> 作为别名保留了下来。</p>
</li>
<li><code>Array.prototype.values()</code> 返回一个新的包含数组中的索引值的迭代对象。</li>
</ul>
<h4>Blink &gt; Layout</h4>
<p>Layout 有两个新特性。</p>
<ul>
<li>CSS gutter 属性移除了 grid 前缀：<ul>
<li><code>grid-gap</code> 变成 <code>gap</code></li>
<li><code>grid-row-gap</code> 变成 <code>row-gap</code></li>
<li><code>grid-column-gap</code> 变成 <code>column-gap</code></li>
</ul>
</li>
</ul>
<blockquote>
<p>这三个属性的默认值都是 <code>normal</code>，带前缀的属性变成新属性的别名。值得注意的是，<code>column-gap</code> 是一个已经存在的属性，在 <code>css-multicol</code> 中就已经使用了。</p>
</blockquote>
<ul>
<li>display 属性是 <code>table-row</code>, <code>table-row-group</code>, <code>table-header-group</code>, <code>table-footer-group</code>, <code>table-cell</code>, 和 <code>table-caption</code> 并且拥有 transform 属性的元素现在是固定定位元素的包含块了。Blink 目前还没有使<code>&lt;tr&gt;</code>, <code>&lt;tbody&gt;</code>, <code>&lt;tfoot&gt;</code>, and <code>&lt;thead&gt;</code> 成为固定定位元素的包含块。</li>
</ul>
<h4>Blink &gt; Media</h4>
<p>Media 有两个新特性。</p>
<ul>
<li>正如<a href="https://blog.chromium.org/2017/09/unified-autoplay.html">早先声明</a>的，<code>autoplay</code> <a href="https://developers.google.com/web/updates/2017/09/autoplay-policy-changes">目前只有在</a> 视频不会播放声音，在用户点击或者触摸之后，或者（对于桌面系统）当用户之前在此站点表露了播放媒体的兴趣的情况下有效。这将减少首次打开一个网页时意料之外地播放带声音的视频的情况。</li>
<li><a href="https://www.chromestatus.com/feature/5869632707624960">媒体性能和解码信息 API</a> 允许网站获取更多的关于客户端解码能力的信息。这使得网站可以给用户提供更有信息感知能力的媒体流，避免一些糟糕场景的发生，例如网站只根据带宽和屏幕尺寸而错误地选择了客户端无法流畅地高效能解码的分辨率。</li>
</ul>
<h4>Blink &gt; Network</h4>
<p>Fetch API 有两个新特性。</p>
<ul>
<li>Request 对象目前支持 <code>keepalive</code> 属性，允许在 tab 关闭后继续 fetch 请求。通过传递布尔值给构造器初始化对象，可以启用这个特性。其值可以通过 request 对象本身读取。该属性还可以和<code>sendBeacon()</code> 一起使用。</li>
<li>新的 <code>AbortSignal</code> 和 <code>AbortController</code> 接口允许取消 fetch 请求。要实现这个功能，你需要创建一个 <code>AbortController</code> 对象，把它的 signal 属性以 option 形式传递给 fetch ，通过调用 <code>abortController.abort()</code> 即可取消 fetch。在我们的这篇文章<a href="https://developers.google.com/web/updates/2017/09/abortable-fetch">可中止的 fetch </a>可以得到更多的信息。下方是一个小代码示例：</li>
</ul>
<pre><code class="hljs qml"><span class="hljs-keyword">const</span> controller = <span class="hljs-keyword">new</span> AbortController();
<span class="hljs-keyword">const</span> <span class="hljs-keyword">signal</span><span class="hljs-string"> </span>= controller.signal;
<span class="hljs-keyword">const</span> requestPromise = fetch(<span class="hljs-built_in">url</span>, { <span class="hljs-keyword">signal</span><span class="hljs-string"> })</span>;
<span class="hljs-comment">// Abort the fetch: controller.abort();</span>
</code></pre><h4>Blink &gt; ServiceWorker</h4>
<p>Service workers 有两个变化.</p>
<ul>
<li>如果 request 是 <code>same-origin</code> 模式，response 是 <code>CORS</code> 类型，Service worker 不再允许对这种请求进行响应。这是最近 Fetch 规范添加的安全措施。</li>
<li>当 <code>FetchEvent.clientId</code> 未设值，现在将返回空字符串而非 null. 例如浏览器导航请求，就会发生这种情况。</li>
</ul>
<h4>Blink &gt; WebRTC</h4>
<p>依照规范，Chrome 现在支持 <code>RTCRtpSender.dtmf</code> 属性，用来替代 还未废除的 <code>CreateDTMFSender()</code>。</p>
<h3>废弃和互用性提升</h3>
<h4>Blink &gt; CSS</h4>
<p><code>object-position</code> 和 <code>perspective-origin</code> 属性不再接受类似 <code>top right 20%</code> 的这种三参数值。这种改变同样适用于基础形状和渐变。有效的位置值必须是1个、2个或者4个参数的值。</p>
<h4>Blink &gt; HTML</h4>
<p>应规范改变，<code>ImageCapture</code> 被移除。</p>
<h4>Blink &gt; Input</h4>
<p>应规范改变，<code>document.createTouch()</code> 和 <code>document.createTouchList()</code> 被移除。</p>
<h4>Blink &gt; Web Audio</h4>
<p>  应规范改变，<code>AudioParam.prototype.value</code> 更改的自动解压缩从 Chrome 中被移除。如果你想对 <code>AudioParam</code> 的更改平滑处理，使用 <code>AudioParam.prorotype.setTargetAtTime()</code>。</p>

          
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Chromium Blog: Chrome 66 Beta: CSS Typed Object Model, Async Clipboard API, AudioWorklet

## 原文链接
[https://www.zcfy.cc/article/chromium-blog-chrome-66-beta-css-typed-object-model-async-clipboard-api-audioworklet](https://www.zcfy.cc/article/chromium-blog-chrome-66-beta-css-typed-object-model-async-clipboard-api-audioworklet)

