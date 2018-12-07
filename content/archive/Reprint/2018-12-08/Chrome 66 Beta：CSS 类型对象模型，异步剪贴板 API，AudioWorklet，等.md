---
title: 'Chrome 66 Beta：CSS 类型对象模型，异步剪贴板 API，AudioWorklet，等' 
date: 2018-12-08 2:30:30
hidden: true
slug: 7j3i22btokv
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>原文链接：<a href="https://blog.chromium.org/2018/03/chrome-66-beta-css-typed-object-model.html" rel="nofollow noreferrer" target="_blank">Chrome 66 Beta: CSS Typed Object Model, Async Clipboard API, AudioWorklet</a>
</blockquote>
<hr>
<p>除非另有说明，否则下文所述的更改适用于 Android，Chrome OS，Linux，macOS 和 Windows 的最新 Chrome Beta 版本。在 <a href="https://www.chromestatus.com/features#milestone%3D66" rel="nofollow noreferrer" target="_blank">ChromeStatus</a> 上查看 Chrome 66 中完整的特性列表。</p>
<h2 id="articleHeader0">
<code>&lt;canvas&gt;</code> 的 <code>ImageBitmap</code> 渲染上下文</h2>
<p>从历史上看，将图像渲染到画布上首先要创建一个 <code>&lt;img&gt;</code> 标签，然后将其内容呈现到画布上。这会导致图像的多个副本存储在内存中。新的渲染上下文可以流线化 <code>ImageBitmap</code> 对象的显示，因而可以避免内存重复，并且更高效。</p>
<p>这个例子展示了如何使用 <code>ImageBitmapRenderingContext</code>。例子主要演示了关于图像像素的转移。这个例子是把像素从 blob 转移到 <code>&lt;canvas&gt;</code>，但像素也可以在 <code>&lt;canvas&gt;</code> 元素之间移动。请注意，blob 是压缩的，因此它不是内存中的完整副本。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const image = await createImageBitmap(imageBlob);
const canvas = document.createElement('canvas');
const context = canvas.getContext('bitmaprenderer');
context.transferFromImageBitmap(image);

canvas.toBlob((outputJPEGBlob) => {
  // Do something with outputJPEGBlob.
}, 'image/jpeg');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> image = <span class="hljs-keyword">await</span> createImageBitmap(imageBlob);
<span class="hljs-keyword">const</span> canvas = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'canvas'</span>);
<span class="hljs-keyword">const</span> context = canvas.getContext(<span class="hljs-string">'bitmaprenderer'</span>);
context.transferFromImageBitmap(image);

canvas.toBlob(<span class="hljs-function">(<span class="hljs-params">outputJPEGBlob</span>) =&gt;</span> {
  <span class="hljs-comment">// Do something with outputJPEGBlob.</span>
}, <span class="hljs-string">'image/jpeg'</span>);</code></pre>
<p>如果不使用 <code>createImageBitmap()</code>，那么 <code>imageBlob</code> 的解码会被延后(lazily decoded)，这会导致问题。另一方面，<code>createImageBitmap()</code> 是异步的，它可以让你在使用之前对它进行完整解码。例如，在 WebGL 游戏运行过程种，可以使用它来随时加载新的纹理。</p>
<h2 id="articleHeader1">CSS 类型对象模型</h2>
<p>从历史上看，想要操纵 CSS 属性的开发人员必须只能操纵字符串，然后再将其转换为类型化表示。更糟的是，当开发人员试图读取 Javascrip 中 CSS 属性的值时，这种类型的值被转换为字符串。</p>
<p>在 Chrome 66 中，针对 <a href="https://chromium.googlesource.com/chromium/src/+/master/third_party/WebKit/Source/core/css/cssom/README.md" rel="nofollow noreferrer" target="_blank">CSS 属性的一个子集</a>实现了 <a href="https://drafts.css-houdini.org/css-typed-om/" rel="nofollow noreferrer" target="_blank">CSS 类型对象模型（OM）Level 1</a>，这些属于 <a href="https://developers.google.com/web/updates/2016/05/houdini" rel="nofollow noreferrer" target="_blank">Houdini</a> 的一部分。Type OM 通过将 CSS 值暴露为类型化的 JavaScript 对象而不是字符串来减轻开发人员和浏览器的负担。除了允许对赋值给 CSS 属性的值进行高效处理外，Typed OM 还允许开发人员编写更易于维护且易于理解的代码。</p>
<p>一个简单的例子说明了这一点。以前，如果我想设置元素的不透明度，我可以这样做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="el.style.opacity = 0.3;
el.style.opacity === &quot;0.3&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">el.style.opacity = <span class="hljs-number">0.3</span>;
el.style.opacity === <span class="hljs-string">"0.3"</span></code></pre>
<p>使用 CSSOM：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="el.attributeStyleMap.set(&quot;opacity&quot;, CSS.number(&quot;0.3&quot;));
el.attributeStyleMap.get(&quot;opacity&quot;).value === 0.3" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">el.attributeStyleMap.set(<span class="hljs-string">"opacity"</span>, CSS.number(<span class="hljs-string">"0.3"</span>));
el.attributeStyleMap.get(<span class="hljs-string">"opacity"</span>).value === <span class="hljs-number">0.3</span></code></pre>
<p>上面返回值的类型是 <code>CSSUnitValue</code>，比字符串更容易操作。</p>
<h2 id="articleHeader2">异步剪贴板 API</h2>
<p>（译者(justjavac)注：Google 开发者中心有一篇文章介绍异步剪贴板 API <a href="https://developers.google.com/web/updates/2018/03/clipboardapi" rel="nofollow noreferrer" target="_blank">Unblocking Clipboard Access</a>，我也已经翻译了中文版 <a href="https://github.com/justjavac/the-front-end-knowledge-you-may-dont-know/issues/23" rel="nofollow noreferrer" target="_blank">Async Clipboard API：异步剪贴板 API</a>）</p>
<h2 id="articleHeader3">AudioWorklet</h2>
<p>传统 <code>ScriptProcessorNode</code> 是异步的，而且需要线程跳跃(译者注：会在 UI 线程和用户线程之间跳跃)，这可能会产生不稳定的音频输出。<code>AudioWorklet</code> 对象提供了一个新的同步 JavaScript 执行上下文，它允许开发人员以编程方式控制音频，而不会在输出音频中产生额外延迟，更加稳定高效。</p>
<p>您可以在 <a href="https://googlechromelabs.github.io/web-audio-samples/audio-worklet/" rel="nofollow noreferrer" target="_blank">Google Chrome Labs</a> 查看示例代码以及其他示例代码。</p>
<p>除了 <code>AudioWorklet</code> 之外，其他 worklet API 正在构建中。<code>PaintWorklet</code> 在 Chrome 65 / Opera 52 中已经发布。<code>AnimationWorklet</code> 计划中。<code>ScriptProcessorNode</code> 会在 <code>AudioWorklet</code> 发布一段时间后会被弃用。</p>
<h2 id="articleHeader4">本发行版中的其他功能</h2>
<h3 id="articleHeader5">Blink &gt; Animation</h3>
<p>The add and accumulate compositing operations are intended for building modularized animations. The add and accumulate keywords will be supported in Chrome soon. Until then, they will no longer throw errors. This is to maintain compatibility with Firefox and other implementations.</p>
<h3 id="articleHeader6">Blink &gt; CSS</h3>
<p>CSS 有 2 个新功能。</p>
<ul>
<li>CSS Values and Units Module Level 4 支持了数学表达式 <code>calc()</code>, <code>min()</code>，<code>max()</code>。</li>
<li>
<code>rgb()</code> 和 <code>rgba()</code> 函数中现在允许浮点值。</li>
</ul>
<h3 id="articleHeader7">Blink &gt; Feature Policy</h3>
<p>默认情况下，<code>deviceorientation</code>，<code>deviceorientationabsolute</code>，和 <code>devicemotion</code> 事件仅限于顶级文档和相同来源的子框架，就如同 <a href="https://github.com/WICG/feature-policy/blob/gh-pages/features.md" rel="nofollow noreferrer" target="_blank">feature policy</a> 对这些特性设置为 <code>'self'</code> 一样。要修改此行为，请明确 <a href="https://github.com/WICG/feature-policy/blob/gh-pages/features.md#sensor-features" rel="nofollow noreferrer" target="_blank">enable or disable the specific feature</a>。</p>
<h3 id="articleHeader8">Blink &gt; File API</h3>
<p>尝试从无效或不存在的 BLOB URL 读取时 ，<a href="https://developer.mozilla.org/en-US/docs/Web/API/File" rel="nofollow noreferrer" target="_blank">File API</a> 会导致网络错误，而不是 404。</p>
<h3 id="articleHeader9">Blink &gt; Forms</h3>
<p>HTML 表单有 2 个新功能。</p>
<ul>
<li>按照规范，<a href="https://html.spec.whatwg.org/multipage/form-elements.html#the-textarea-element" rel="nofollow noreferrer" target="_blank"><code>&lt;textarea&gt;</code></a> 和 <a href="https://html.spec.whatwg.org/multipage/form-elements.html#the-select-element" rel="nofollow noreferrer" target="_blank"><code>&lt;select&gt;</code></a> 支持 <code>autocomplete</code> 属性。</li>
<li>按照 <a href="https://html.spec.whatwg.org/#checkbox-state-(type=checkbox" rel="nofollow noreferrer" target="_blank">HTML 规范的要求</a>)，一个可变的复选框现在触发 3 个事件：<code>click</code> 事件，然后是 <code>input</code> 事件，然后是 <code>change</code> 事件。以前只有 <code>click</code> 和 <code>change</code> 事件被触发。</li>
</ul>
<h3 id="articleHeader10">Blink &gt; Fullscreen</h3>
<p>如果全屏模式下的页面打开弹出窗口并调用 <code>window.focus()</code>, <a href="https://www.chromestatus.com/feature/5732193850621952" rel="nofollow noreferrer" target="_blank">该页面会退出全屏</a>。如果弹出窗口以其他方式接收焦点，则不会发生这种情况。</p>
<h3 id="articleHeader11">Blink &gt; GetUserMedia</h3>
<p><code>MediaStreamTrack</code> 接口有一个新方法 <a href="https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamTrack/getCapabilities" rel="nofollow noreferrer" target="_blank"><code>getCapabilities()</code></a>。</p>
<p>返回一个 <code>MediaTrackCapabilities</code> 对象，该对象指定每个受限制属性的值或值范围。该功能因设备而异。</p>
<h3 id="articleHeader12">Blink &gt; JavaScript</h3>
<p>几个 JavaScript 更改。</p>
<ul>
<li>
<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/toString" rel="nofollow noreferrer" target="_blank">Function.prototype.toString()</a> 函数现在返回源代码中写入的内容。这包括可能已经使用的空白和其他文本。例如，如果函数关键字和函数名称之间存在注释，则除了关键字和名称之外，现在还返回注释。</li>
<li>
<a href="https://github.com/tc39/proposal-json-superset" rel="nofollow noreferrer" target="_blank">JSON 现在是 ECMAScript 的一个语法子集</a>，它允许字符串文本中的行分隔符(U+2028)和段落分隔符(U+2029)符号。</li>
<li>
<code>try</code> 语句的 <code>catch</code> 子句现在可以在<a href="https://tc39.github.io/proposal-optional-catch-binding/" rel="nofollow noreferrer" target="_blank">没有参数的情况下使用</a>。</li>
<li>除了之前早已实现的 <code>String.prototype.trim()</code> 外，Chrome 66 实现了 <code>String.prototype.trimStart()</code> 和 <code>String.prototype.trimLeft()</code> 用来将字符串两侧的空白去除。而 <code>trimLeft()</code> 和 <code>trimRight()</code> 是为了保持为向后兼容性而提供的非标准的方法别名。</li>
<li>
<code>Array.prototype.values()</code> 方法返回一个新的数组迭代器对象，该对象包含数组中每个索引的值。</li>
</ul>
<h3 id="articleHeader13">Blink &gt; Layout</h3>
<p>布局有 2 个新功能。</p>
<ul>
<li>
<p>grid 前缀：</p>
<ul>
<li>
<code>grid-gap</code> 变 <code>gap</code>
</li>
<li>
<code>grid-row-gap</code> 变 <code>row-gap</code>
</li>
<li>
<code>grid-column-gap</code> 变 <code>column-gap</code>
</li>
</ul>
</li>
<li>所有三者的默认值是 <code>normal</code>，前缀属性是新名称的别名。请注意，<code>column-gap</code> 属性已经存在并被 <code>css-multicol</code> 使用。</li>
<li>当元素的 display 属性是 <code>table-row</code>，<code>table-row-group</code>， <code>table-header-group</code>，<code>table-footer-group</code>，<code>table-cell</code>，<code>table-caption</code>，并具有 transform 属性时，此元素可以作为 fixed-position 元素的包含块。Blink 目前不能把 <code>&lt;tr&gt;</code>，<code>&lt;tbody&gt;</code>，<code>&lt;tfoot&gt;</code>，<code>&lt;thead&gt;</code> 作为 fixed-position 元素的包含块。</li>
</ul>
<h3 id="articleHeader14">Blink &gt; Media</h3>
<p>媒体有 2 个新功能。</p>
<ul><li>正如<a href="https://blog.chromium.org/2017/09/unified-autoplay.html" rel="nofollow noreferrer" target="_blank">之前博客</a>所介绍的那样，<a href="https://www.chromium.org/audio-video/autoplay" rel="nofollow noreferrer" target="_blank">autoplay</a> 只有当媒体不会播放声音时，用户主动点击后，或者（桌面版）如果用户以前在该网站上表现出对媒体的兴趣时才允许播放。这样做会在第一次打开网页时减少意外的视频播放和声音。</li></ul>
<p>（译者(justjavac)注：目前运行被自动播放的内容包括：内容被静音、内容只包含视频（无音频）、用户在浏览会话期间点击网站上的某个地方、在移动设备上如果该网站已被用户添加到主屏幕、如果用户在桌面版浏览器上频繁播放该媒体）</p>
<ul><li>
<a href="https://www.chromestatus.com/feature/5869632707624960" rel="nofollow noreferrer" target="_blank">Media Capabilities</a>, <a href="https://www.chromestatus.com/feature/5869632707624960" rel="nofollow noreferrer" target="_blank">Decoding Info API</a> 允许网站获取有关客户端的解码能力的更多信息。这为用户提供了更多关于媒体流的选择权，可以使客户端更加平滑高效地解码，而非仅仅基于可用带宽和屏幕大小分辨率进行解码。</li></ul>
<h3 id="articleHeader15">Blink &gt; Network</h3>
<p>Fetch API 有 2 个新功能。</p>
<ul>
<li>
<code>Request</code> 对象现在支持 <a href="https://www.chromestatus.com/features/5760375567941632" rel="nofollow noreferrer" target="_blank">keepalive</a> 属性，该属性允许在关闭标签后继续 fetch。通过在构造函数的初始化对象中传递布尔值来调用此功能。它的值可以从对象本身读回。该属性也可以和 <code>sendBeacon()</code> 一起使用。</li>
<li>新的 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/AbortSignal" rel="nofollow noreferrer" target="_blank">AbortSignal</a> 和 <a href="https://developer.mozilla.org/zh-CN/docs/Web/API/FetchController" rel="nofollow noreferrer" target="_blank">AbortController</a> 接口允许取消 fetch 操作。创建一个 <code>AbortController</code> 对象并将其 signal 属性作为 option 传递给 <code>fetch</code>。调用 <code>abortController.abort()</code> 取消 fetch。 我们之前撰写的 <a href="https://developers.google.com/web/updates/2017/09/abortable-fetch" rel="nofollow noreferrer" target="_blank">abortable fetch article</a> 中有更多信息，下面是一个代码示例。</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const controller = new AbortController();
const signal = controller.signal;
const requestPromise = fetch(url, { signal });

// Abort the fetch:
controller.abort();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> controller = <span class="hljs-keyword">new</span> AbortController();
<span class="hljs-keyword">const</span> signal = controller.signal;
<span class="hljs-keyword">const</span> requestPromise = fetch(url, { signal });

<span class="hljs-comment">// Abort the fetch:</span>
controller.abort();</code></pre>
<p>（题外话：<a href="https://github.com/tc39/proposal-cancelable-promises" rel="nofollow noreferrer" target="_blank">cancelable-promises</a> 提案在进入 stage 1 的时候被取消掉了）</p>
<h3 id="articleHeader16">Blink &gt; ServiceWorker</h3>
<p>ServiceWorker 有两个变化。</p>
<ul>
<li>如果 request 的模式是 <code>same-origin</code>，而 response 的模式是 <code>CORS</code>，ServiceWorker 不能再响应。这是最近添加到 Fetch 规范的安全措施。</li>
<li>
<code>FetchEvent.clientId</code> 现在返回一个空字符串，而不是 <code>null</code>。例如，这会在导航请求期间发生。</li>
</ul>
<h3 id="articleHeader17">Blink &gt; WebRTC</h3>
<p>Chrome 现在支持 <a href="https://bugs.chromium.org/p/chromium/issues/detail?id=812587" rel="nofollow noreferrer" target="_blank">RTCRtpSender.dtmf</a> 属性。这取代了 <code>CreateDTMFSender()</code> 尚未弃用的功能。</p>
<h2 id="articleHeader18">弃用和互操作性改进</h2>
<h3 id="articleHeader19">Blink &gt; CSS</h3>
<p><code>object-position</code> 和 <code>perspective-origin</code> 属性不再接受 3 个部分组成的值，例如 <code>top right 20%</code>。此更改也适用于基本形状和渐变。有效位置值必须始终有 1, 2 或 4 个部分。</p>
<h3 id="articleHeader20">Blink &gt; HTML</h3>
<p>按照规范，<code>ImageCapture.prototype.setOptions()</code> 已被删除。</p>
<h3 id="articleHeader21">Blink &gt; Input</h3>
<p>按照规范，<code>document.createTouch()</code> 和 <code>document.createTouchList()</code> 已被删除。</p>
<h3 id="articleHeader22">Blink &gt; Web Audio</h3>
<p>在规范更改之后，<code>AudioParam.prototype.value</code> 的自动解压缩功能从 Chrome 中移除。如果您需要平滑处理 <code>AudioParam</code> 的更改，请使用 <code>AudioParam.prorotype.setTargetAtTime()</code>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Chrome 66 Beta：CSS 类型对象模型，异步剪贴板 API，AudioWorklet，等

## 原文链接
[https://segmentfault.com/a/1190000014035019](https://segmentfault.com/a/1190000014035019)

