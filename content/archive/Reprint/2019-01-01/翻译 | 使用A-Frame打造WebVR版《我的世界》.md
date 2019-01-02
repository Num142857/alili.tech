---
title: '翻译 | 使用A-Frame打造WebVR版《我的世界》' 
date: 2019-01-01 2:30:07
hidden: true
slug: oi1m4iblxj
categories: [reprint]
---

{{< raw >}}

                    
<ul>
<li>原文地址：<a href="https://css-tricks.com/minecraft-webvr-html-using-frame/" rel="nofollow noreferrer" target="_blank">Minecraft in WebVR with HTML Using A-Frame</a>
</li>
<li>原文作者：<a href="http://ngokevin.com/" rel="nofollow noreferrer" target="_blank">Kevin Ngo</a>
</li>
<li>译者：<a href="https://github.com/LittlePineapple" rel="nofollow noreferrer" target="_blank">Felix</a>
</li>
<li>校对：<a href="https://github.com/aximario" rel="nofollow noreferrer" target="_blank">阿希</a>
</li>
</ul>
<p>我是 Kevin Ngo，一名就职于 <a href="https://mozvr.com/" rel="nofollow noreferrer" target="_blank">Mozilla VR 团队</a>的 web 虚拟现实开发者，也是 <a href="https://aframe.io/" rel="nofollow noreferrer" target="_blank">A-Frame</a> 的核心开发人员。今天，我们来看看如何使用 A-Frame 构建一个够在 HTC Vive、Oculus Rift、Samsung GearVR、Google Cardboard、桌面设备以及移动设备上运行的、支持空间追踪（room-scale）技术的 WebVR 版《我的世界》示例。该示例基于 A-Frame，且仅使用 11 个 HTML 元素！</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011081558" src="https://static.alili.tech/img/remote/1460000011081558" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">A-Frame</h2>
<p>几年前，Mozilla 发明并开发了 <a href="https://webvr.rocks/" rel="nofollow noreferrer" target="_blank">WebVR</a> —— 一套在浏览器中创造身临其境 VR 体验的 JavaScript API —— 并将其发布在一个实验版本的 Firefox 浏览器中。此后，WebVR 得到了 Google、Microsoft、Samsung 以及 Oculus 等其他公司的广泛支持。而现在，WebVR 更是在短短几个月内就被内嵌在发行版的 Firefox 浏览器中，并被设置为默认开启！</p>
<p>为什么会诞生 WebVR？Web 为 VR 带来了开放性；在 Web 上，内容并不由管理员所控制，用户也不被关在高高的围墙花园（walled garden）中。Web 也为 VR 带来了连通性；在 Web 上，我们能够在世界中穿梭 —— 就像我们点击超链接在页面见穿梭一样。随着 WebGL 的成熟以及诸如 Web Assembly 和 Service Workers 规范的提出，WebVR 已经准备好了。</p>
<p><a href="https://mozvr.com/" rel="nofollow noreferrer" target="_blank">Mozilla VR 团队</a>创造了 A-Frame 框架来为 WebVR 生态系统抛砖引玉，该框架给予开发者构建 3D 和 VR 世界的能力。</p>
<p></p>
<hr>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011081559" src="https://static.alili.tech/img/remote/1460000011081559" alt="" title="" style="cursor: pointer; display: inline;"></span><br>A-Frame 官方网站首页<br></p>
<hr>
<p><a href="https://aframe.io/" rel="nofollow noreferrer" target="_blank">A-Frame</a> 是一个构建虚拟现实体验设的 web 框架，它基于 HTML 和<a href="https://aframe.io/docs/0.5.0/introduction/#entity-component-system" rel="nofollow noreferrer" target="_blank">实体组件范式</a>（the Entity-Component pattern）。HTML 是所有计算机语言中最易理解的语言，这使得任何人都能<a href="https://aframe.io/docs/0.5.0/introduction/getting-started.html" rel="nofollow noreferrer" target="_blank">快速上手</a> A-Frame。下面是一个使用 HTML 搭建的完整的 3D 和 VR 场景，它能够在诸如桌面设备和移动设备等任何 VR 平台运行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;https://aframe.io/releases/0.5.0/aframe.min.js&quot;></script>

<a-scene>
  <a-sphere position=&quot;0 1.25 -5&quot; radius=&quot;1.25&quot; color=&quot;#EF2D5E&quot;></a-sphere>
  <a-box position=&quot;-1 0.5 -3&quot; rotation=&quot;0 45 0&quot; width=&quot;1&quot; height=&quot;1&quot; depth=&quot;1&quot; color=&quot;#4CC3D9&quot;></a-box>
  <a-cylinder position=&quot;1 0.75 -3&quot; radius=&quot;0.5&quot; height=&quot;1.5&quot; color=&quot;#FFC65D&quot;></a-cylinder>
  <a-plane position=&quot;0 0 -4&quot; rotation=&quot;-90 0 0&quot; width=&quot;4&quot; height=&quot;4&quot; color=&quot;#7BC8A4&quot;></a-plane>
  <a-sky color=&quot;#ECECEC&quot;></a-sky>
</a-scene>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://aframe.io/releases/0.5.0/aframe.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">a-scene</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a-sphere</span> <span class="hljs-attr">position</span>=<span class="hljs-string">"0 1.25 -5"</span> <span class="hljs-attr">radius</span>=<span class="hljs-string">"1.25"</span> <span class="hljs-attr">color</span>=<span class="hljs-string">"#EF2D5E"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-sphere</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a-box</span> <span class="hljs-attr">position</span>=<span class="hljs-string">"-1 0.5 -3"</span> <span class="hljs-attr">rotation</span>=<span class="hljs-string">"0 45 0"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"1"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"1"</span> <span class="hljs-attr">depth</span>=<span class="hljs-string">"1"</span> <span class="hljs-attr">color</span>=<span class="hljs-string">"#4CC3D9"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-box</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a-cylinder</span> <span class="hljs-attr">position</span>=<span class="hljs-string">"1 0.75 -3"</span> <span class="hljs-attr">radius</span>=<span class="hljs-string">"0.5"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"1.5"</span> <span class="hljs-attr">color</span>=<span class="hljs-string">"#FFC65D"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-cylinder</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a-plane</span> <span class="hljs-attr">position</span>=<span class="hljs-string">"0 0 -4"</span> <span class="hljs-attr">rotation</span>=<span class="hljs-string">"-90 0 0"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"4"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"4"</span> <span class="hljs-attr">color</span>=<span class="hljs-string">"#7BC8A4"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-plane</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a-sky</span> <span class="hljs-attr">color</span>=<span class="hljs-string">"#ECECEC"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-sky</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">a-scene</span>&gt;</span></code></pre>
<p><a href="https://codepen.io/mozvr/pen/BjygdO" rel="nofollow noreferrer" target="_blank">在 CodePen 中打开</a><button class="btn btn-xs btn-default ml10 preview" data-url="mozvr/pen/BjygdO" data-typeid="3">点击预览</button></p>
<p>就是这样！只用使用<strong>一行 HTML（&lt;a-scene&gt;）即可搞定 3D 和 VR 样板代码搭建</strong>，包括：canvas、场景、渲染器、渲染循环、摄像机以及 raycaster。然后，我们可以通过使用添加子元素的方式来为场景添加对象。<strong>无需构建</strong>，就只是一个简单的、可随意拷贝粘贴的 HTML 文件。</p>
<p></p>
<hr>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011081560" src="https://static.alili.tech/img/remote/1460000011081560" alt="" title="" style="cursor: pointer;"></span><br></p>
<hr>
<p>我们还可以动态查询和操作 A-Frame 的 HTML，就像使用<a href="https://aframe.io/docs/0.5.0/guides/using-javascript-and-dom-apis.html" rel="nofollow noreferrer" target="_blank">标准 JavaScript 和 DOM APIs</a> （例如 querySelector、getAttribute、addEventListener、setAttribute）那样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 使用 `querySelector` 查询场景图像。
var sceneEl = document.querySelector('a-scene');
var boxEl = sceneEl.querySelector('a-box');

// 使用 `getAttribute` 获得实体的数据。
console.log(box.getAttribute('position'));
// >> {x: -1, y: 0.5, z: -3}

// 使用 `addEventListener` 监听事件。
box.addEventListener('click', function () {
  // 使用 `setAttribute` 修改属性。
  box.setAttribute('color', 'red');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// 使用 `querySelector` 查询场景图像。</span>
<span class="hljs-keyword">var</span> sceneEl = <span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'a-scene'</span>);
<span class="hljs-keyword">var</span> boxEl = sceneEl.querySelector(<span class="hljs-string">'a-box'</span>);

<span class="hljs-comment">// 使用 `getAttribute` 获得实体的数据。</span>
<span class="hljs-built_in">console</span>.log(box.getAttribute(<span class="hljs-string">'position'</span>));
<span class="hljs-comment">// &gt;&gt; {x: -1, y: 0.5, z: -3}</span>

<span class="hljs-comment">// 使用 `addEventListener` 监听事件。</span>
box.addEventListener(<span class="hljs-string">'click'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-comment">// 使用 `setAttribute` 修改属性。</span>
  box.setAttribute(<span class="hljs-string">'color'</span>, <span class="hljs-string">'red'</span>);
});</code></pre>
<p></p>
<hr>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011081561" src="https://static.alili.tech/img/remote/1460000011081561" alt="" title="" style="cursor: pointer;"></span><br></p>
<hr>
<p>而且，因为这些只是 HTML 和 JavaScript，因此 A-Frame 和许多现存的框架和库兼容良好：<br></p>
<hr>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011081562" src="https://static.alili.tech/img/remote/1460000011081562" alt="" title="" style="cursor: pointer;"></span><br>兼容 d3、Vue、React、Redux、jQuery、Angular<br></p>
<hr>
<p>尽管 A-Frame 的 HTML 看起来比较简单，但是 A-Frame 的 API 却远远比简单的 3D 声明强大。A-Frame 是一个<a href="https://aframe.io/docs/0.5.0/introduction/#entity-component-system" rel="nofollow noreferrer" target="_blank">实体组件系统（ECS）框架</a>，ECS 在游戏开发中是一种流行的模式，值得注意的是 ECS 也被 Unity 引擎所使用。其概念包括：</p>
<ul>
<li>在场景中，所有的对象都是<em>实体（entities）</em>，空对象本身什么也不能做，类似空 <code>&lt;div&gt;</code>。A-Frame 使用 HTML 元素在 DOM 中表示实体。</li>
<li>接下来，我们在实体中插入<em>组件（components）</em> 来提供外观、行为和功能。在 A-Frame 中，组件被注册在 JavaScript 中，并且可以被用来做任何事情。它们可使用完整的 <a href="http://threejs.org/" rel="nofollow noreferrer" target="_blank">three.js</a> 和 DOM APIs。组件注册后，可以附加在 HTML 实体上。</li>
</ul>
<p>ECS 的优势在于它的可组合性；我们可以混合和搭配这些可复用的组件来构建出更复杂的 3D 对象。A-Frame 更上一层楼，将这些组件声明化，并使其作为 DOM 的一部分，就像我们待会在《我的世界》示例中看到那样。</p>
<h2 id="articleHeader1">示例骨架</h2>
<p>现在来关注我们的示例。我们将搭建一个基本的 VR 立体像素制作器（voxel builder），它主要用于支持位置追踪（positional tracking）和追踪控制器（tracked controllers）的空间追踪 VR 设备（例如 HTC Vive 及 Oculus Rift + Touch）。</p>
<p>我们会从 HTML 骨架开始。如果你想要快速浏览（完整的 11 行 HTML），<a href="https://github.com/ngokevin/kframe/tree/csstricks/scenes/aincraft/" rel="nofollow noreferrer" target="_blank">点击这里到 GitHub 查看源代码</a>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;https://aframe.io/releases/0.5.0/aframe.min.js&quot;></script>

<body>
  <a-scene>
  </a-scene>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">&lt;script src=<span class="hljs-string">"https://aframe.io/releases/0.5.0/aframe.min.js"</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span>

&lt;body&gt;
  <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">a-scene</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">a-scene</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></span></code></pre>
<h2 id="articleHeader2">添加地面</h2>
<p><code>&lt;a-plane&gt;</code> 和 <code>&lt;a-circle&gt;</code> 都是常被用作添加地面的图元，不过我们会使用 <code>&lt;a-cylinder&gt;</code> 来更好地配合控制器完成灯光计算工作。圆柱（cylinder）的半径为 30 米，待会我们要添加的天空将会和这个半径值匹配起来。注意 A-Frame 中的单位是米，以匹配 WebVR API 返回的现实世界中的单位。</p>
<p>地面的纹理部署在 <code>https://cdn.aframe.io/a-painter/images/floor.jpg</code>。我们将纹理添加进项目中，并使用该纹理制作一个扁的圆柱实体。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;https://aframe.io/releases/0.5.0/aframe.min.js&quot;></script>

<a-scene>
  <a-cylinder id=&quot;ground&quot; src=&quot;https://cdn.aframe.io/a-painter/images/floor.jpg&quot; radius=&quot;32&quot; height=&quot;0.1&quot;></a-cylinder>
</a-scene>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://aframe.io/releases/0.5.0/aframe.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">a-scene</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a-cylinder</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"ground"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.aframe.io/a-painter/images/floor.jpg"</span> <span class="hljs-attr">radius</span>=<span class="hljs-string">"32"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"0.1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-cylinder</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">a-scene</span>&gt;</span></code></pre>
<p><a href="https://codepen.io/mozvr/pen/MpbXXe" rel="nofollow noreferrer" target="_blank">在 CodePen 中打开</a><button class="btn btn-xs btn-default ml10 preview" data-url="mozvr/pen/MpbXXe" data-typeid="3">点击预览</button></p>
<h2 id="articleHeader3">预加载资源</h2>
<p>通过 <code>src</code> 属性指定的 URL 资源将在运行时加载。</p>
<p>由于网络请求会对渲染的性能产生负面影响，所以我们可以<em>预加载</em>纹理以保证资源被下载完成前不进行渲染工作，预加载可以通过<a href="https://aframe.io/docs/0.5.0/core/asset-management-system.html" rel="nofollow noreferrer" target="_blank">资源管理系统（asset management system）</a>来完成。</p>
<p>我们将 <code>&lt;a-assets&gt;</code> 置入 <code>&lt;a-scene&gt;</code> 中，将资源（例如图片、视频、模型及声音等）置入 <code>&lt;a-assets&gt;</code> 中，并通过选择器（例如 #myTexture）将资源指向我们的实体。</p>
<p>让我们将地面纹理移动到 <code>&lt;a-assets&gt;</code> 中，使用 <code>&lt;img&gt;</code> 元素来预加载它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;https://aframe.io/releases/0.5.0/aframe.min.js&quot;></script>

<a-scene>
  <a-assets>
    <img id=&quot;groundTexture&quot; src=&quot;https://cdn.aframe.io/a-painter/images/floor.jpg&quot;>
  </a-assets>

  <a-cylinder id=&quot;ground&quot; src=&quot;#groundTexture&quot; radius=&quot;32&quot; height=&quot;0.1&quot;></a-cylinder>
</a-scene>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://aframe.io/releases/0.5.0/aframe.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">a-scene</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a-assets</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"groundTexture"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.aframe.io/a-painter/images/floor.jpg"</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">a-assets</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">a-cylinder</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"ground"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"#groundTexture"</span> <span class="hljs-attr">radius</span>=<span class="hljs-string">"32"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"0.1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-cylinder</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">a-scene</span>&gt;</span></code></pre>
<p><a href="https://codepen.io/mozvr/pen/LWbrBQ" rel="nofollow noreferrer" target="_blank">在 CodePen 中打开</a><button class="btn btn-xs btn-default ml10 preview" data-url="mozvr/pen/LWbrBQ" data-typeid="3">点击预览</button></p>
<h2 id="articleHeader4">添加背景</h2>
<p>让我们使用 <a href="https://aframe.io/docs/0.5.0/primitives/a-sky.html" rel="nofollow noreferrer" target="_blank"><code>&lt;a-sky&gt;</code> 元素</a>为 <code>&lt;a-scene&gt;</code> 添加一个 360° 的背景。<code>&lt;a-sky&gt;</code> 是一个在内部粘贴材质的巨大 3D 球体。就像普通图片一样，<code>&lt;a-sky&gt;</code> 可以通过 <code>src</code> 属性接受图片地址。最终我们将可以使用一行 HTML 代码实现身临其境的 360° 图片。稍后你也可以在 <a href="https://www.flickr.com/groups/equirectangular/" rel="nofollow noreferrer" target="_blank">Flickr 球面投影图片池（需翻墙）</a>中选择一些 360° 图片来做练习。</p>
<p>我们可以添加普通的颜色背景（例如 <code>&lt;a-sky color="#333"&gt;&lt;/a-sky&gt;</code>）或<a href="https://github.com/zcanter/aframe-gradient-sky" rel="nofollow noreferrer" target="_blank">渐变</a>，不过这次让我们来添加一张背景纹理图片。该图片被部署在 <code>https://cdn.aframe.io/a-painter/images/sky.jpg</code>。我们所使用的图片是一张适用于半球体的图片，所以首先我们需要将刚刚的球体使用 <code>theta-length="90"</code> 水平截成半球体，另外我们将球的半径设置为 30 米以匹配地面。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;https://aframe.io/releases/0.5.0/aframe.min.js&quot;></script>

<a-scene>
  <a-assets>
    <img id=&quot;groundTexture&quot; src=&quot;https://cdn.aframe.io/a-painter/images/floor.jpg&quot;>
    <img id=&quot;skyTexture&quot; src=&quot;https://cdn.aframe.io/a-painter/images/sky.jpg&quot;>
  </a-assets>
  
  <a-cylinder id=&quot;ground&quot; src=&quot;#groundTexture&quot; radius=&quot;30&quot; height=&quot;0.1&quot;></a-cylinder>

  <a-sky id=&quot;background&quot; src=&quot;#skyTexture&quot; theta-length=&quot;90&quot; radius=&quot;30&quot;></a-sky>
</a-scene>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://aframe.io/releases/0.5.0/aframe.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">a-scene</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a-assets</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"groundTexture"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.aframe.io/a-painter/images/floor.jpg"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"skyTexture"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.aframe.io/a-painter/images/sky.jpg"</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">a-assets</span>&gt;</span>
  
  <span class="hljs-tag">&lt;<span class="hljs-name">a-cylinder</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"ground"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"#groundTexture"</span> <span class="hljs-attr">radius</span>=<span class="hljs-string">"30"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"0.1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-cylinder</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">a-sky</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"background"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"#skyTexture"</span> <span class="hljs-attr">theta-length</span>=<span class="hljs-string">"90"</span> <span class="hljs-attr">radius</span>=<span class="hljs-string">"30"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-sky</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">a-scene</span>&gt;</span></code></pre>
<p><a href="https://codepen.io/mozvr/pen/PpbaBL" rel="nofollow noreferrer" target="_blank">在 CodePen 中打开</a><button class="btn btn-xs btn-default ml10 preview" data-url="mozvr/pen/PpbaBL" data-typeid="3">点击预览</button></p>
<h2 id="articleHeader5">添加体素</h2>
<p>在我们的 VR 应用中，体素（voxels）的写法类似 <code>&lt;a-box&gt;</code>，但会添加一些自定义的 A-Frame 组件。不过让我们先大致了解实体-组件范式，来看看像 <code>&lt;a-box&gt;</code> 这样的图元是怎样合成的。</p>
<p>在这个部分，我们将会对若干 A-Frame 组件的实现做一些深入探讨。在实践中，我们经常会通过已由 A-Frame 社区开发人员编写好的 HTML 来使用组件，而不是从头构建它们。</p>
<h3 id="articleHeader6">实体-组件范式</h3>
<p>在 A-Frame 场景中的每一个对象都是 <code>&lt;a-entity&gt;</code>，其本身什么也不能做，就像一个空 <code>&lt;div&gt;</code> 一样。我们将组件（不要和 Web Components 或 React Components 混淆）插入实体来给予其外观、行为和逻辑。</p>
<p>对于一个盒子来说，我们会为其配置及添加 A-Frame 的基础<a href="https://aframe.io/docs/0.5.0/components/geometry.html" rel="nofollow noreferrer" target="_blank">几何组件</a>和<a href="https://aframe.io/docs/0.5.0/components/material.html" rel="nofollow noreferrer" target="_blank">材质组件</a>。组件使用 HTML 属性来表示，组件属性默认使用类似 CSS 样式的表示方法来表示。下面是一个 <code>&lt;a-box&gt;</code> 的基础组件拆解写法，可以看到 <code>&lt;a-box&gt;</code> 事实上包裹了若干组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a-box color=&quot;red&quot; depth=&quot;0.5&quot; height=&quot;0.5&quot; shader=&quot;flat&quot; width=&quot;0.5&quot;></a-box>

<a-entity geometry=&quot;primitive: box; depth: 0.5; height: 0.5; width 0.5&quot;
          material=&quot;color: red; shader: standard&quot;></a-entity>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">a-box</span> <span class="hljs-attr">color</span>=<span class="hljs-string">"red"</span> <span class="hljs-attr">depth</span>=<span class="hljs-string">"0.5"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"0.5"</span> <span class="hljs-attr">shader</span>=<span class="hljs-string">"flat"</span> <span class="hljs-attr">width</span>=<span class="hljs-string">"0.5"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-box</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">a-entity</span> <span class="hljs-attr">geometry</span>=<span class="hljs-string">"primitive: box; depth: 0.5; height: 0.5; width 0.5"</span>
          <span class="hljs-attr">material</span>=<span class="hljs-string">"color: red; shader: standard"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-entity</span>&gt;</span></code></pre>
<p>使用组件的好处是它们的具有可组合性。我们可以通过混合和搭配一堆已有的组件来构造出各种各样的对象。</p>
<p>在 3D 开发中，我们可能构建出的对象类型在数量和复杂性上是无限的，因此我们需要一个简便的、全新的、非传统继承式的对象定义方法。与 2D web 相比，我们不再拘泥于使用一小撮固定的 HTML 元素并将它们嵌套在很深的层次结构中。</p>
<h3 id="articleHeader7">随机颜色组件</h3>
<p>A-Frame 中的组件由 JavaScript 定义，它们可使用完整的 <a href="http://threejs.org/" rel="nofollow noreferrer" target="_blank">three.js</a> 和 DOM APIs，它们可以做任何事。所有的对象都由一捆组件来定义。</p>
<p>现在将刚刚所描述的模式付诸实践，通过书写一个 A-Frame 组件，为我们的盒子设置随机颜色。组件通过 AFRAME.registerComponent 注册，我们可以定义 schema（组件的数据）以及生命周期方法（组件的逻辑）。对于随机颜色组件，我们并不需要设置 schema，因为它不能被配置。但我们会定义一个 <code>init</code> 处理函数，该函数会在组件首次附加到它的实体时被调用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="AFRAME.registerComponent('random-color', {
  init: function () {
    // ...
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">AFRAME.registerComponent(<span class="hljs-string">'random-color'</span>, {
  <span class="hljs-attr">init</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// ...</span>
  }
});</code></pre>
<p>对于随机颜色组件，我们的意图是为其附加的实体设置随机颜色。在组件的方法中，可以使用 <code>this.el</code> 访问实体的引用。</p>
<p>为了使用 JavaScript 来改变颜色，我们使用 <code>.setAttribute()</code> 来设置材质组件的颜色属性。A-Frame 只引入了少数 API，大多数 API 和原生 web 开发 API 保持一致。<a href="https://aframe.io/docs/0.5.0/guides/using-javascript-and-dom-apis.html" rel="nofollow noreferrer" target="_blank">点此详细了解如何在 A-Frame 中使用 JavaScript 和 DOM API</a>。</p>
<p>我们还需要将 <code>material</code> 组件添加到预先初始化组件列表中，以保证材质不会被 <code>material</code> 组件覆盖掉。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="AFRAME.registerComponent('random-color', {
  dependencies: ['material'],

  init: function () {
    // 将材质组件的颜色属性设置为随机颜色
    this.el.setAttribute('material', 'color', getRandomColor());
  }
});

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++ ) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">AFRAME.registerComponent(<span class="hljs-string">'random-color'</span>, {
  <span class="hljs-attr">dependencies</span>: [<span class="hljs-string">'material'</span>],

  <span class="hljs-attr">init</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// 将材质组件的颜色属性设置为随机颜色</span>
    <span class="hljs-keyword">this</span>.el.setAttribute(<span class="hljs-string">'material'</span>, <span class="hljs-string">'color'</span>, getRandomColor());
  }
});

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getRandomColor</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">const</span> letters = <span class="hljs-string">'0123456789ABCDEF'</span>;
  <span class="hljs-keyword">var</span> color = <span class="hljs-string">'#'</span>;
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">var</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">6</span>; i++ ) {
    color += letters[<span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random() * <span class="hljs-number">16</span>)];
  }
  <span class="hljs-keyword">return</span> color;
}</code></pre>
<p>在组件被注册后，我们可以<strong>直接使用 HTML</strong> 来链接该组件。A-Frame 框架中的所有代码都是对 HTML 的扩展，而且这些扩展可以用于其他对象和其他场景。很棒的是，开发者可以写一个向对象添加物理元素的组件，使用这个组件的人甚至不会察觉到 JavaScript 在他的场景中加入了这个物理元素！</p>
<p>注意力回到刚刚的盒子实体，将 <code>random-color</code> 作为 HTML 属性插入到 <code>random-color</code> 组件中。我们将组件保存为一个 JS 文件，然后在场景代码之前引用它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;https://aframe.io/releases/0.5.0/aframe.min.js&quot;></script>
<script src=&quot;https://rawgit.com/ngokevin/kframe/csstricks/scenes/aincraft/components/random-color.js&quot;></script>

<a-scene>
  <a-assets>
    <img id=&quot;groundTexture&quot; src=&quot;https://cdn.aframe.io/a-painter/images/floor.jpg&quot;>
    <img id=&quot;skyTexture&quot; src=&quot;https://cdn.aframe.io/a-painter/images/sky.jpg&quot;>
  </a-assets>
  
  <a-sky id=&quot;background&quot; src=&quot;#skyTexture&quot; theta-length=&quot;90&quot; radius=&quot;30&quot;></a-sky>

  <a-cylinder id=&quot;ground&quot; src=&quot;#groundTexture&quot; radius=&quot;30&quot; height=&quot;0.1&quot;></a-cylinder>
  
  <!-- 随机颜色的盒子 -->
  <a-entity geometry=&quot;primitive: box; depth: 0.5; height: 0.5; width 0.5&quot;
            material=&quot;shader: standard&quot;
            position=&quot;0 0.5 -2&quot;
            random-color></a-entity>
</a-scene>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://aframe.io/releases/0.5.0/aframe.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://rawgit.com/ngokevin/kframe/csstricks/scenes/aincraft/components/random-color.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">a-scene</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a-assets</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"groundTexture"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.aframe.io/a-painter/images/floor.jpg"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"skyTexture"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.aframe.io/a-painter/images/sky.jpg"</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">a-assets</span>&gt;</span>
  
  <span class="hljs-tag">&lt;<span class="hljs-name">a-sky</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"background"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"#skyTexture"</span> <span class="hljs-attr">theta-length</span>=<span class="hljs-string">"90"</span> <span class="hljs-attr">radius</span>=<span class="hljs-string">"30"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-sky</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">a-cylinder</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"ground"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"#groundTexture"</span> <span class="hljs-attr">radius</span>=<span class="hljs-string">"30"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"0.1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-cylinder</span>&gt;</span>
  
  <span class="hljs-comment">&lt;!-- 随机颜色的盒子 --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a-entity</span> <span class="hljs-attr">geometry</span>=<span class="hljs-string">"primitive: box; depth: 0.5; height: 0.5; width 0.5"</span>
            <span class="hljs-attr">material</span>=<span class="hljs-string">"shader: standard"</span>
            <span class="hljs-attr">position</span>=<span class="hljs-string">"0 0.5 -2"</span>
            <span class="hljs-attr">random-color</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-entity</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">a-scene</span>&gt;</span></code></pre>
<p><a href="https://codepen.io/mozvr/pen/ryWKqy" rel="nofollow noreferrer" target="_blank">在 CodePen 中打开</a><button class="btn btn-xs btn-default ml10 preview" data-url="mozvr/pen/ryWKqy" data-typeid="3">点击预览</button></p>
<p>组件可以插入到任何实体中，但并不需要像在传统继承模式中那样创建或扩展类。如果我们想在类似 <code>&lt;a-shpere&gt;</code> 或 <code>&lt;a-obj-model&gt;</code> 中附加组件，直接加就是了！</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- 在其他实体上重用并附加随机颜色组件 -->
<a-sphere random-color></a-sphere>
<a-obj-model src=&quot;model.obj&quot; random-color></a-obj-model>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- 在其他实体上重用并附加随机颜色组件 --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a-sphere</span> <span class="hljs-attr">random-color</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-sphere</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a-obj-model</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"model.obj"</span> <span class="hljs-attr">random-color</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-obj-model</span>&gt;</span></code></pre>
<p>如果我们想要将这个组件分享给他人使用，也没问题。我们可以在 <a href="https://aframe.io/registry/" rel="nofollow noreferrer" target="_blank">A-Frame 仓库</a>中获取 A-Frame 生态系统中许多便利的组件，这类似 Unity 的 Asset Store。如果我们使用组件开发应用程序，那么就应当保证我们的代码在内部是模块化和可重用的！</p>
<h3 id="articleHeader8">对齐组件</h3>
<p>我们将使用 <code>snap</code> 组件来将盒子对齐到网格以避免它们重叠。我们不会深入到该组件的实现原理，不过你可以看看 <a href="https://rawgit.com/ngokevin/kframe/csstricks/scenes/aincraft/components/snap.js" rel="nofollow noreferrer" target="_blank">snap 组件的源代码</a>（20 行 JavaScript 代码）。</p>
<p>将 snap 组件附加到盒子实体上，让盒子每半米对齐，同时使用 offset 来使盒子居中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a-entity
   geometry=&quot;primitive: box; height: 0.5; width: 0.5; depth: 0.5&quot;
   material=&quot;shader: standard&quot;
   random-color
   snap=&quot;offset: 0.25 0.25 0.25; snap: 0.5 0.5 0.5&quot;></a-entity>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">a-entity</span>
   <span class="hljs-attr">geometry</span>=<span class="hljs-string">"primitive: box; height: 0.5; width: 0.5; depth: 0.5"</span>
   <span class="hljs-attr">material</span>=<span class="hljs-string">"shader: standard"</span>
   <span class="hljs-attr">random-color</span>
   <span class="hljs-attr">snap</span>=<span class="hljs-string">"offset: 0.25 0.25 0.25; snap: 0.5 0.5 0.5"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-entity</span>&gt;</span></code></pre>
<p>现在，我们有了一个由一捆组件构成的盒子实体，该实体可以用来描述我们场景中的所有体素（砖块）。</p>
<h2 id="articleHeader9">Mixins</h2>
<p>我们可以创建 <a href="https://aframe.io/docs/0.5.0/core/mixins.html" rel="nofollow noreferrer" target="_blank">mixin</a> 来定义可复用的组件集合。</p>
<p>与使用 <code>&lt;a-entity&gt;</code> 为场景添加一个对象不同，我们使用 <code>&lt;a-mixin&gt;</code> 来创建可复用的体素，使用它们就像使用预设实体一样。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;https://aframe.io/releases/0.5.0/aframe.min.js&quot;></script>
<script src=&quot;https://rawgit.com/ngokevin/kframe/csstricks/scenes/aincraft/components/random-color.js&quot;></script>
<script src=&quot;https://rawgit.com/ngokevin/kframe/csstricks/scenes/aincraft/components/snap.js&quot;></script>

<a-scene>
  <a-assets>
    <img id=&quot;groundTexture&quot; src=&quot;https://cdn.aframe.io/a-painter/images/floor.jpg&quot;>
    <img id=&quot;skyTexture&quot; src=&quot;https://cdn.aframe.io/a-painter/images/sky.jpg&quot;>
    <a-mixin id=&quot;voxel&quot;
       geometry=&quot;primitive: box; height: 0.5; width: 0.5; depth: 0.5&quot;
       material=&quot;shader: standard&quot;
       random-color
       snap=&quot;offset: 0.25 0.25 0.25; snap: 0.5 0.5 0.5&quot;></a-mixin>
  </a-assets>

  <a-sky id=&quot;background&quot; src=&quot;#skyTexture&quot; theta-length=&quot;90&quot; radius=&quot;30&quot;></a-sky>

  <a-cylinder id=&quot;ground&quot; src=&quot;#groundTexture&quot; radius=&quot;30&quot; height=&quot;0.1&quot;></a-cylinder>
  
  <a-entity mixin=&quot;voxel&quot; position=&quot;-1 0 -2&quot;></a-entity>
  <a-entity mixin=&quot;voxel&quot; position=&quot;0 0 -2&quot;></a-entity>
  <a-entity mixin=&quot;voxel&quot; position=&quot;0 1 -2&quot;>
    <a-animation attribute=&quot;rotation&quot; to=&quot;0 360 0&quot; repeat=&quot;indefinite&quot;></a-animation>
  </a-entity>
  <a-entity mixin=&quot;voxel&quot; position=&quot;1 0 -2&quot;></a-entity>
</a-scene>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://aframe.io/releases/0.5.0/aframe.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://rawgit.com/ngokevin/kframe/csstricks/scenes/aincraft/components/random-color.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://rawgit.com/ngokevin/kframe/csstricks/scenes/aincraft/components/snap.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">a-scene</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a-assets</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"groundTexture"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.aframe.io/a-painter/images/floor.jpg"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"skyTexture"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.aframe.io/a-painter/images/sky.jpg"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a-mixin</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"voxel"</span>
       <span class="hljs-attr">geometry</span>=<span class="hljs-string">"primitive: box; height: 0.5; width: 0.5; depth: 0.5"</span>
       <span class="hljs-attr">material</span>=<span class="hljs-string">"shader: standard"</span>
       <span class="hljs-attr">random-color</span>
       <span class="hljs-attr">snap</span>=<span class="hljs-string">"offset: 0.25 0.25 0.25; snap: 0.5 0.5 0.5"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-mixin</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">a-assets</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">a-sky</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"background"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"#skyTexture"</span> <span class="hljs-attr">theta-length</span>=<span class="hljs-string">"90"</span> <span class="hljs-attr">radius</span>=<span class="hljs-string">"30"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-sky</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">a-cylinder</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"ground"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"#groundTexture"</span> <span class="hljs-attr">radius</span>=<span class="hljs-string">"30"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"0.1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-cylinder</span>&gt;</span>
  
  <span class="hljs-tag">&lt;<span class="hljs-name">a-entity</span> <span class="hljs-attr">mixin</span>=<span class="hljs-string">"voxel"</span> <span class="hljs-attr">position</span>=<span class="hljs-string">"-1 0 -2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-entity</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a-entity</span> <span class="hljs-attr">mixin</span>=<span class="hljs-string">"voxel"</span> <span class="hljs-attr">position</span>=<span class="hljs-string">"0 0 -2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-entity</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a-entity</span> <span class="hljs-attr">mixin</span>=<span class="hljs-string">"voxel"</span> <span class="hljs-attr">position</span>=<span class="hljs-string">"0 1 -2"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a-animation</span> <span class="hljs-attr">attribute</span>=<span class="hljs-string">"rotation"</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"0 360 0"</span> <span class="hljs-attr">repeat</span>=<span class="hljs-string">"indefinite"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-animation</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">a-entity</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a-entity</span> <span class="hljs-attr">mixin</span>=<span class="hljs-string">"voxel"</span> <span class="hljs-attr">position</span>=<span class="hljs-string">"1 0 -2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-entity</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">a-scene</span>&gt;</span></code></pre>
<p><a href="https://codepen.io/mozvr/pen/OpbEaY" rel="nofollow noreferrer" target="_blank">在 CodePen 中打开</a><button class="btn btn-xs btn-default ml10 preview" data-url="mozvr/pen/OpbEaY" data-typeid="3">点击预览</button></p>
<p>随后我们使用 mixin 添加了若干体素：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a-entity mixin=&quot;voxel&quot; position=&quot;-1 0 -2&quot;></a-entity>
<a-entity mixin=&quot;voxel&quot; position=&quot;0 0 -2&quot;></a-entity>
<a-entity mixin=&quot;voxel&quot; position=&quot;0 1 -2&quot;>
  <a-animation attribute=&quot;rotation&quot; to=&quot;0 360 0&quot; repeat=&quot;indefinite&quot;></a-animation>
</a-entity>
<a-entity mixin=&quot;voxel&quot; position=&quot;1 0 -2&quot;></a-entity>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">a-entity</span> <span class="hljs-attr">mixin</span>=<span class="hljs-string">"voxel"</span> <span class="hljs-attr">position</span>=<span class="hljs-string">"-1 0 -2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-entity</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a-entity</span> <span class="hljs-attr">mixin</span>=<span class="hljs-string">"voxel"</span> <span class="hljs-attr">position</span>=<span class="hljs-string">"0 0 -2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-entity</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a-entity</span> <span class="hljs-attr">mixin</span>=<span class="hljs-string">"voxel"</span> <span class="hljs-attr">position</span>=<span class="hljs-string">"0 1 -2"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a-animation</span> <span class="hljs-attr">attribute</span>=<span class="hljs-string">"rotation"</span> <span class="hljs-attr">to</span>=<span class="hljs-string">"0 360 0"</span> <span class="hljs-attr">repeat</span>=<span class="hljs-string">"indefinite"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-animation</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">a-entity</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a-entity</span> <span class="hljs-attr">mixin</span>=<span class="hljs-string">"voxel"</span> <span class="hljs-attr">position</span>=<span class="hljs-string">"1 0 -2"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-entity</span>&gt;</span></code></pre>
<p>接下来，我们将通过使用追踪控制器根据用户交互来动态创建体素。让我们开始向程序中添加一双手吧。</p>
<h1 id="articleHeader10">添加手部控制器</h1>
<p>添加 HTC Vive 或 Oculus Touch 追踪控制器非常简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- Vive -->
<a-entity vive-controls=&quot;hand: left&quot;></a-entity>
<a-entity vive-controls=&quot;hand: right&quot;></a-entity>

<!-- Rift -->
<a-entity oculus-touch-controls=&quot;hand: left&quot;></a-entity>
<a-entity oculus-touch-controls=&quot;hand: right&quot;></a-entity>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- Vive --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a-entity</span> <span class="hljs-attr">vive-controls</span>=<span class="hljs-string">"hand: left"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-entity</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a-entity</span> <span class="hljs-attr">vive-controls</span>=<span class="hljs-string">"hand: right"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-entity</span>&gt;</span>

<span class="hljs-comment">&lt;!-- Rift --&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a-entity</span> <span class="hljs-attr">oculus-touch-controls</span>=<span class="hljs-string">"hand: left"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-entity</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a-entity</span> <span class="hljs-attr">oculus-touch-controls</span>=<span class="hljs-string">"hand: right"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-entity</span>&gt;</span></code></pre>
<p>我们将使用抽象的 <code>hand-controls</code> 组件来同时兼容 Vive 和 Rift 的控制，它提供基本的手模型。左手负责移动位置，右手负责放置砖块。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a-entity id=&quot;teleHand&quot; hand-controls=&quot;left&quot;></a-entity>
<a-entity id=&quot;blockHand&quot; hand-controls=&quot;right&quot;></a-entity>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">a-entity</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"teleHand"</span> <span class="hljs-attr">hand-controls</span>=<span class="hljs-string">"left"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-entity</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a-entity</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"blockHand"</span> <span class="hljs-attr">hand-controls</span>=<span class="hljs-string">"right"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-entity</span>&gt;</span></code></pre>
<h3 id="articleHeader11">为左手添加瞬移功能</h3>
<p>我们将为左手增加瞬移的能力，当按住左手控制器按钮时，从控制器显示一条弧线，松开手时，瞬移到弧线末端的位置。在此之前，我们已经自己写了一个实现随机颜色的 A-Frame 组件。</p>
<p>但也可以使用社区中已有的开源组件，然后直接通过 HTML 使用它们！</p>
<p>对于瞬移来说，有一个来自于 @fernandojsg 的<a href="https://github.com/fernandojsg/aframe-teleport-controls/" rel="nofollow noreferrer" target="_blank">瞬移控制组件</a>。遵循 README，我们使用 <code>&lt;script&gt;</code> 标签引入 <code>teleport-controls</code> 组件，并将其附加到控制器实体上。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;https://aframe.io/releases/0.5.0/aframe.min.js&quot;></script>
<script src=&quot;https://unpkg.com/aframe-teleport-controls@0.2.x/dist/aframe-teleport-controls.min.js&quot;></script>

<!-- ... -->

<a-entity id=&quot;teleHand&quot; hand-controls=&quot;left&quot; teleport-controls></a-entity>
<a-entity id=&quot;blockHand&quot; hand-controls=&quot;right&quot;></a-entity>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://aframe.io/releases/0.5.0/aframe.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/aframe-teleport-controls@0.2.x/dist/aframe-teleport-controls.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-comment">&lt;!-- ... --&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">a-entity</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"teleHand"</span> <span class="hljs-attr">hand-controls</span>=<span class="hljs-string">"left"</span> <span class="hljs-attr">teleport-controls</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-entity</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a-entity</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"blockHand"</span> <span class="hljs-attr">hand-controls</span>=<span class="hljs-string">"right"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-entity</span>&gt;</span></code></pre>
<p>随后我们来配置 <code>teleport-controls</code> 组件，将瞬移的 <code>type</code> 设置为弧线。默认来说，<code>teleport-controls</code> 的瞬移只会发生在地面上，但我们也可以指定 <code>collisionEntities</code> 通过选择器来允许瞬移到砖块<em>和</em>地面上。这些属性是 <code>teleport-controls</code> 组件创建的 API 的一部分。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a-entity id=&quot;teleHand&quot; hand-controls=&quot;left&quot; teleport-controls=&quot;type: parabolic; collisionEntities: [mixin='voxel'], #ground&quot;></a-entity>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">a-entity</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"teleHand"</span> <span class="hljs-attr">hand-controls</span>=<span class="hljs-string">"left"</span> <span class="hljs-attr">teleport-controls</span>=<span class="hljs-string">"type: parabolic; collisionEntities: [mixin='voxel'], #ground"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-entity</span>&gt;</span></code></pre>
<p>就是这样！<strong>只要一个 script 标签和一个 HTML 属性，我们就能瞬移了。</strong>在 <a href="https://aframe.io/registry/" rel="nofollow noreferrer" target="_blank">A-Frame 仓库</a>中可以找到更多很酷的组件。</p>
<h3 id="articleHeader12">为右手添加体素生成器功能</h3>
<p>在 2D 应用程序中，对象内置了处理点击的能力，而在 WebVR 中对象并没有这样的能力，需要我们自己来提供。幸运的是，A-Frame 拥有许多处理交互的组件。VR 中用于类似光标点击的场景方法是使用 raycaster，它射出一道激光并返回激光命中的物体。然后我们通过监听交互事件及查看 raycaster 来获得命中点信息。</p>
<p>A-Frame 提供基于注视点的光标（注：就像 FPS 游戏的准心那样），可以利用此光标点击正在注视的物体，但也有可用的<a href="https://github.com/bryik/aframe-controller-cursor-component/" rel="nofollow noreferrer" target="_blank">控制器光标组件</a>来根据 VR 追踪控制器的位置发射激光，就像刚刚使用 <code>teleport-controls</code> 组件那样，我们通过 script 标签将 <code>controller-cursor</code> 组件引入，然后附加到实体上。这次轮到右手了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;https://aframe.io/releases/0.5.0/aframe.min.js&quot;></script>
<script src=&quot;https://unpkg.com/aframe-teleport-controls@0.2.x/dist/aframe-teleport-controls.min.js&quot;></script>
<script src=&quot;https://unpkg.com/aframe-controller-cursor-component@0.2.x/dist/aframe-controller-cursor-component.min.js&quot;></script>

<!-- ... -->

<a-entity id=&quot;teleHand&quot; hand-controls=&quot;left&quot; teleport-controls=&quot;type: parabolic; collisionEntities: [mixin='voxel'], #ground&quot;></a-entity>
<a-entity id=&quot;blockHand&quot; hand-controls=&quot;right&quot; controller-cursor></a-entity>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://aframe.io/releases/0.5.0/aframe.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/aframe-teleport-controls@0.2.x/dist/aframe-teleport-controls.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/aframe-controller-cursor-component@0.2.x/dist/aframe-controller-cursor-component.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-comment">&lt;!-- ... --&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">a-entity</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"teleHand"</span> <span class="hljs-attr">hand-controls</span>=<span class="hljs-string">"left"</span> <span class="hljs-attr">teleport-controls</span>=<span class="hljs-string">"type: parabolic; collisionEntities: [mixin='voxel'], #ground"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-entity</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">a-entity</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"blockHand"</span> <span class="hljs-attr">hand-controls</span>=<span class="hljs-string">"right"</span> <span class="hljs-attr">controller-cursor</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-entity</span>&gt;</span></code></pre>
<p>现在当我们按下追踪控制器上的按钮时，<code>controller-cursor</code> 组件将同时触发控制器和交互实体的 <code>click</code> 事件。A-Frame 也提供了诸如 <code>mouseenter</code> 及 <code>mouseleave</code> 这样的事件。事件包含了用户交互的详细信息。</p>
<p>这赋予了我们点击的能力，但我们还得写一些响应点击事件处理生成砖块的逻辑。可以使用事件监听器及 <code>document.createElement</code> 来完成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="document.querySelector('#blockHand').addEventListener(`click`, function (evt) {
  // 创建一个砖块实体
  var newVoxelEl = document.createElement('a-entity');

  // 使用 mixin 来将其变为体素
  newVoxelEl.setAttribute('mixin', 'voxel');

  // 使用命中点的数据来设置砖块位置。
  // 上文所述的 `snap` 组件是 mixin 的一部分，它将会把砖块对齐到最近的半米
  newVoxelEl.setAttribute('position', evt.detail.intersection.point);

  // 使用 `appendChild` 添加到场景中
  this.appendChild(newVoxelEl);
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">document</span>.querySelector(<span class="hljs-string">'#blockHand'</span>).addEventListener(<span class="hljs-string">`click`</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">evt</span>) </span>{
  <span class="hljs-comment">// 创建一个砖块实体</span>
  <span class="hljs-keyword">var</span> newVoxelEl = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'a-entity'</span>);

  <span class="hljs-comment">// 使用 mixin 来将其变为体素</span>
  newVoxelEl.setAttribute(<span class="hljs-string">'mixin'</span>, <span class="hljs-string">'voxel'</span>);

  <span class="hljs-comment">// 使用命中点的数据来设置砖块位置。</span>
  <span class="hljs-comment">// 上文所述的 `snap` 组件是 mixin 的一部分，它将会把砖块对齐到最近的半米</span>
  newVoxelEl.setAttribute(<span class="hljs-string">'position'</span>, evt.detail.intersection.point);

  <span class="hljs-comment">// 使用 `appendChild` 添加到场景中</span>
  <span class="hljs-keyword">this</span>.appendChild(newVoxelEl);
});</code></pre>
<p>为了概括性地处理在命中点创建实体这样的需求，我们创建了 <code>intersection-spawn</code> 组件，该组件接受任何事件和属性列表的配置。我们不会详细讨论其实现，但你可以<a href="https://github.com/ngokevin/kframe/blob/csstricks/scenes/aincraft/components/intersection-spawn.js" rel="nofollow noreferrer" target="_blank">在 GitHub 上查看这个简单的 <strong>intersection-spawn</strong> 组件的源码</a>。我们将 <code>intersection-spawn</code> 的能力附加到右手上：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a-entity id=&quot;blockHand&quot; hand-controls=&quot;right&quot; controller-cursor intersection-spawn=&quot;event: click; mixin: voxel&quot;></a-entity>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">a-entity</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"blockHand"</span> <span class="hljs-attr">hand-controls</span>=<span class="hljs-string">"right"</span> <span class="hljs-attr">controller-cursor</span> <span class="hljs-attr">intersection-spawn</span>=<span class="hljs-string">"event: click; mixin: voxel"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-entity</span>&gt;</span></code></pre>
<p>现在当我们点击时，就可以生成体素了！</p>
<h3 id="articleHeader13">添加移动设备和桌面设备支持</h3>
<p>我们通过组合组件了解到了如何构建一个自定义类型的对象（例如，一个具有点击功能和点击时生成砖块的手部控制器）。组件的好处之一是它们可以在不同的上下文中被重用。我们将 <code>intersection-spawn</code> 组件和基于注视点的 <code>cursor</code> 组件结合起来，便可以在一点都不改变组件的情况下，实现在移动设备和桌面设备中生成砖块的功能了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<a-entity id=&quot;blockHand&quot; hand-controls=&quot;right&quot; controller-cursor intersection-spawn=&quot;event: click; mixin: voxel&quot;></a-entity>

<a-camera>
  <a-cursor intersection-spawn=&quot;event: click; mixin: voxel&quot;></a-cursor>
</a-camera>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">a-entity</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"blockHand"</span> <span class="hljs-attr">hand-controls</span>=<span class="hljs-string">"right"</span> <span class="hljs-attr">controller-cursor</span> <span class="hljs-attr">intersection-spawn</span>=<span class="hljs-string">"event: click; mixin: voxel"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-entity</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">a-camera</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a-cursor</span> <span class="hljs-attr">intersection-spawn</span>=<span class="hljs-string">"event: click; mixin: voxel"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-cursor</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">a-camera</span>&gt;</span></code></pre>
<h2 id="articleHeader14">试试看</h2>
<p><a href="https://github.com/ngokevin/kframe/tree/csstricks/scenes/aincraft/" rel="nofollow noreferrer" target="_blank">在 GitHub 上查看源码</a></p>
<p>我们的 VR 体素构建器最终使用 11 个 HTML 元素实现。我们可以在桌面或移动设备上预览它。在桌面设备上，我们可以通过拖动和点击来生成砖块；在移动设备上，我们可以平移设备和点击屏幕来生成砖块。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;https://aframe.io/releases/0.5.0/aframe.min.js&quot;></script>
<script src=&quot;https://unpkg.com/aframe-teleport-controls@0.2.x/dist/aframe-teleport-controls.min.js&quot;></script>
<script src=&quot;https://unpkg.com/aframe-controller-cursor-component@0.2.x/dist/aframe-controller-cursor-component.min.js&quot;></script>
<script src=&quot;https://rawgit.com/ngokevin/kframe/csstricks/scenes/aincraft/components/random-color.js&quot;></script>
<script src=&quot;https://rawgit.com/ngokevin/kframe/csstricks/scenes/aincraft/components/snap.js&quot;></script>
<script src=&quot;https://rawgit.com/ngokevin/kframe/csstricks/scenes/aincraft/components/intersection-spawn.js&quot;></script>

<body>
  <a-scene>
    <a-assets>
      <img id=&quot;groundTexture&quot; src=&quot;https://cdn.aframe.io/a-painter/images/floor.jpg&quot;>
      <img id=&quot;skyTexture&quot; src=&quot;https://cdn.aframe.io/a-painter/images/sky.jpg&quot;>
      <a-mixin id=&quot;voxel&quot;
         geometry=&quot;primitive: box; height: 0.5; width: 0.5; depth: 0.5&quot;
         material=&quot;shader: standard&quot;
         random-color
         snap=&quot;offset: 0.25 0.25 0.25; snap: 0.5 0.5 0.5&quot;
      ></a-mixin>
    </a-assets>

    <a-cylinder id=&quot;ground&quot; src=&quot;#groundTexture&quot; radius=&quot;30&quot; height=&quot;0.1&quot;></a-cylinder>

    <a-sky id=&quot;background&quot; src=&quot;#skyTexture&quot; theta-length=&quot;90&quot; radius=&quot;30&quot;></a-sky>

    <!-- Hands. -->
    <a-entity id=&quot;teleHand&quot; hand-controls=&quot;left&quot; teleport-controls=&quot;type: parabolic; collisionEntities: [mixin='voxel'], #ground&quot;></a-entity>
    <a-entity id=&quot;blockHand&quot; hand-controls=&quot;right&quot; controller-cursor intersection-spawn=&quot;event: click; mixin: voxel&quot;></a-entity>

    <!-- Camera. -->
    <a-camera>
      <a-cursor intersection-spawn=&quot;event: click; mixin: voxel&quot;></a-cursor>
    </a-camera>
  </a-scene>
</body>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://aframe.io/releases/0.5.0/aframe.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/aframe-teleport-controls@0.2.x/dist/aframe-teleport-controls.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/aframe-controller-cursor-component@0.2.x/dist/aframe-controller-cursor-component.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://rawgit.com/ngokevin/kframe/csstricks/scenes/aincraft/components/random-color.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://rawgit.com/ngokevin/kframe/csstricks/scenes/aincraft/components/snap.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://rawgit.com/ngokevin/kframe/csstricks/scenes/aincraft/components/intersection-spawn.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">a-scene</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a-assets</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"groundTexture"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.aframe.io/a-painter/images/floor.jpg"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"skyTexture"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://cdn.aframe.io/a-painter/images/sky.jpg"</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">a-mixin</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"voxel"</span>
         <span class="hljs-attr">geometry</span>=<span class="hljs-string">"primitive: box; height: 0.5; width: 0.5; depth: 0.5"</span>
         <span class="hljs-attr">material</span>=<span class="hljs-string">"shader: standard"</span>
         <span class="hljs-attr">random-color</span>
         <span class="hljs-attr">snap</span>=<span class="hljs-string">"offset: 0.25 0.25 0.25; snap: 0.5 0.5 0.5"</span>
      &gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-mixin</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">a-assets</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">a-cylinder</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"ground"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"#groundTexture"</span> <span class="hljs-attr">radius</span>=<span class="hljs-string">"30"</span> <span class="hljs-attr">height</span>=<span class="hljs-string">"0.1"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-cylinder</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">a-sky</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"background"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"#skyTexture"</span> <span class="hljs-attr">theta-length</span>=<span class="hljs-string">"90"</span> <span class="hljs-attr">radius</span>=<span class="hljs-string">"30"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-sky</span>&gt;</span>

    <span class="hljs-comment">&lt;!-- Hands. --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a-entity</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"teleHand"</span> <span class="hljs-attr">hand-controls</span>=<span class="hljs-string">"left"</span> <span class="hljs-attr">teleport-controls</span>=<span class="hljs-string">"type: parabolic; collisionEntities: [mixin='voxel'], #ground"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-entity</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a-entity</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"blockHand"</span> <span class="hljs-attr">hand-controls</span>=<span class="hljs-string">"right"</span> <span class="hljs-attr">controller-cursor</span> <span class="hljs-attr">intersection-spawn</span>=<span class="hljs-string">"event: click; mixin: voxel"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-entity</span>&gt;</span>

    <span class="hljs-comment">&lt;!-- Camera. --&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a-camera</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">a-cursor</span> <span class="hljs-attr">intersection-spawn</span>=<span class="hljs-string">"event: click; mixin: voxel"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">a-cursor</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">a-camera</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">a-scene</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></code></pre>
<p><a href="https://codepen.io/mozvr/pen/OpbwMJ" rel="nofollow noreferrer" target="_blank">在 CodePen 中打开</a><button class="btn btn-xs btn-default ml10 preview" data-url="mozvr/pen/OpbwMJ" data-typeid="3">点击预览</button></p>
<p>如果你有 VR 头盔（例如 HTC Vive、Oculus Rift + Touch），那么可以找一个<a href="https://webvr.rocks/" rel="nofollow noreferrer" target="_blank">支持 WebVR 的浏览器</a>并打开示例。</p>
<p>如果你想使用桌面或移动设备观看 VR 是什么样的，<a href="https://ngokevin.github.io/kframe/scenes/aincraft/?avatar-recording=recording.json" rel="nofollow noreferrer" target="_blank">可以查看录制好的 VR 动作捕捉和手势演示</a>。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010887896" src="https://static.alili.tech/img/remote/1460000010887896" alt="" title="" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000011081563" src="https://static.alili.tech/img/remote/1460000011081563" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote>
<p>iKcamp原创新书《移动Web前端高效开发实战》已在亚马逊、京东、当当开售。</p>
<p><a href="https://m.bosszhipin.com/weijd/v2/job/7bbfc95b9f1e9c4a1nRy2926FVA~?date8=20170905&amp;sid=self_jd" rel="nofollow noreferrer" target="_blank">沪江Web前端上海团队招聘【Web前端架构师】，有意者简历至：zhouyao@hujiang.com</a></p>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
翻译 | 使用A-Frame打造WebVR版《我的世界》

## 原文链接
[https://segmentfault.com/a/1190000011081553](https://segmentfault.com/a/1190000011081553)

