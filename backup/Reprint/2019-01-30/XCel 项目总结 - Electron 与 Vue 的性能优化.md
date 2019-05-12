---
title: 'XCel 项目总结 - Electron 与 Vue 的性能优化' 
date: 2019-01-30 2:30:23
hidden: true
slug: a7slcgcyv4
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVGkdk?w=900&amp;h=500" src="https://static.alili.tech/img/bVGkdk?w=900&amp;h=500" alt="poster.jpg" title="poster.jpg" style="cursor: pointer; display: inline;"></span></p>
<p>XCEL 是一个 Excel 数据清洗工具，其通过可视化的方式让用户轻松地对 Excel 数据进行筛选。</p>
<p>XCEL 基于 Electron 和 Vue 2.0 进行开发，充分利用 Electron 多进程任务处理等功能，使其拥有高性能、跨平台（windows 7+、Mac 和 Linux）的特性。</p>
<p>落地页：<a href="https://xcel.aotu.io/" rel="nofollow noreferrer" target="_blank">https://xcel.aotu.io/</a>   ✨✨✨  <br>项目地址：<a href="https://github.com/o2team/xcel" rel="nofollow noreferrer" target="_blank">https://github.com/o2team/xcel</a>   ✨✨✨</p>
<h2 id="articleHeader0">项目背景</h2>
<p>用户研究的定量研究和轻量级数据处理中，均需对数据进行清洗处理，用以剔除异常数据，保证数据结果的信度和效度。目前因调研数据和轻量级数据的多变性，对轻量级数据清洗往往采取人工清洗，缺少统一、标准的清洗流程，但对于调研和轻量级的数据往往是需要保证数据稳定性的，因此，在对数据进行清洗的时候最好有可以标准化的清洗方式。</p>
<h2 id="articleHeader1">特性一览</h2>
<ul>
<li><p>基于 Electron 研发并打包成为原生应用，用户体验良好；</p></li>
<li><p>可视化操作 Excel 数据，支持文件的导入导出；</p></li>
<li><p>拥有单列运算逻辑、多列运算逻辑和双列范围逻辑三种筛选方式，并且可通过“且”、“或”和“编组”的方式任意组合。</p></li>
</ul>
<h2 id="articleHeader2">思路与实现</h2>
<p>结合用研组的需求，我们利用 Electron 和 Vue 的特性对该工具进行开发。</p>
<h3 id="articleHeader3">技术选型</h3>
<ul>
<li><p>Electron：桌面端跨平台框架，为 Web 提供了原生接口的权限。打包后的程序兼容 Windows 7 及以上、Mac、Linux 的 32 / 64 位系统。<a href="http://electron.atom.io/" rel="nofollow noreferrer" target="_blank">详情&gt;&gt;</a></p></li>
<li><p>Vue 全家桶：Vue 拥有数据驱动视图的特性，适合重数据交互的应用。<a href="http://vuejs.org/" rel="nofollow noreferrer" target="_blank">详情&gt;&gt;</a></p></li>
<li><p>js-xlsx：各种电子表格格式的解析器和生成器。纯 JavaScript 实现，适用于 Node.js 和 Web 前端。<a href="https://github.com/SheetJS/js-xlsx" rel="nofollow noreferrer" target="_blank">详情&gt;&gt;</a></p></li>
</ul>
<h3 id="articleHeader4">实现思路</h3>
<ol>
<li><p>通过 js-xlsx 解析 Excel 文件生成 JSON 格式</p></li>
<li><p>根据筛选条件对 JSON 数据进行筛选过滤</p></li>
<li><p>将过滤后的 JSON 数据生成 js-xlsx 指定的数据结构</p></li>
<li><p>利用 js-xlsx 对转换后的数据生成 Excel 文件</p></li>
</ol>
<hr>
<p><strong>纸上得来终觉浅，绝知此事要躬行</strong></p>
<h2 id="articleHeader5">相关技术</h2>
<p>如果对某项技术比较熟悉可略读/跳过。</p>
<h3 id="articleHeader6">Electron</h3>
<h4>Electron 是什么？</h4>
<p>Electron 是一个能让你通过 <strong>JavaScript、HTML 和 CSS</strong> 构建桌面应用的<strong>框架</strong>。这些应用能打包到 Mac、Windows 和 Linux 电脑上运行，当然它们也能上架到 Mac 和 Windows 的 app stores。</p>
<ul>
<li><p><strong>JavaScript、HTML 和 CSS</strong> 都是 Web 语言，这就意味着它们都是组成网站的一部分，浏览器（如 Chrome）能将这些代码转为可视化图像。</p></li>
<li><p><strong>Electron 是一个框架</strong>：Electron 对底层代码进行抽象和封装，让开发者能在此之上构建项目。</p></li>
</ul>
<h4>为什么它如此重要？</h4>
<p>通常来说，桌面应用都需要用每个操作系统对应的原生语言进行开发。这意味着需要拥有 3 个团队为这个应用编写 3 个相应的版本。Electron 则允许你通过 web 语言编写一次即可。</p>
<ul><li><p><strong>原生（操作系统）语言</strong>：用于开发主流操作系统的应用的原生语言如下（大多数情况下）：Mac 对应 Objective C、Linux 对应 C、Windows 对应 C++。</p></li></ul>
<h4>它由什么组成？</h4>
<p>Electron 结合了 <strong>Chromium</strong>、<strong>Node.js</strong> 和用于调用操作系统本地功能的 API（如打开文件窗口、通知、图标等）。</p>
<ul>
<li><p><strong>Chromium</strong>：Google 创造的一个开源库，并用于 Google 的浏览器 Chrome。</p></li>
<li><p><strong>Node.js（Node）</strong>：一个用于在服务器运行 JavaScript 的运行时（runtime），它拥有文件系统和网络的权限（你的电脑也可以是一台服务器！）。</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007665165?w=1000&amp;h=563" src="https://static.alili.tech/img/remote/1460000007665165?w=1000&amp;h=563" alt="Electron 的组成" title="Electron 的组成" style="cursor: pointer; display: inline;"></span></p>
<h4>开发体验如何？</h4>
<p>基于 Electron 的开发，就好像开发一个网页一样，而且能够无缝地 <strong>使用 Node</strong>。或者说：就好像构建一个 Node app，并通过 HTML 和 CSS 构建界面。另外，你只需为一个浏览器（<strong>最新的 Chrome</strong>）进行设计（即无需考虑兼容性）。</p>
<ul>
<li><p><strong>使用内置的 Node</strong>：这还不是全部！除了 Node API，你还可以使用托管在 npm 上，超过 350,000 个的模块。</p></li>
<li><p><strong>一个浏览器</strong>：并非所有浏览器都提供一致的样式，因此 web 设计师和开发者时常不得不花费更多的精力去让一个网站在不同的浏览器上看起来一致。</p></li>
<li><p><strong>最新的 Chrome</strong>：可使用超过 90% 的 ES2015 特性和其它很酷的特性（如 CSS 变量）。</p></li>
</ul>
<h4>两个进程（重点）</h4>
<p>Electron 有两个种进程：『主进程』和『渲染进程』。有些模块只能工作在其中一个进程上，而有些则能工作在两个进程上。主进程更多地充当幕后角色，而渲染进程则是应用的每个窗口。   <br>PS：可通过任务管理器（PC）/活动监视器（Mac）查看进程的相关信息。</p>
<ul><li><p><strong>模块</strong>：Electron 的 API 是根据它们的功能进行分组。例如：<code>dialog</code> 模块拥有所有原生 dialog 的 API，如打开文件、保存文件和弹窗。</p></li></ul>
<h4>主进程</h4>
<p>主进程，通常是一个命名为 <code>main.js</code> 的文件，该文件是每个 Electron 应用的入口。它控制了应用的生命周期（从打开到关闭）。它能<strong>调用原生元素</strong>和创建新的（多个）渲染进程，而且整个 Node API 是内置其中的。</p>
<ul><li><p><strong>调用原生元素</strong>：打开 diglog 和其它操作系统交互均是资源密集型操作（注：出于安全考虑，渲染进程是不能直接调用本地资源的），因此都需要在主进程完成。</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007665166?w=1000&amp;h=563" src="https://static.alili.tech/img/remote/1460000007665166?w=1000&amp;h=563" alt="主进程" title="主进程" style="cursor: pointer;"></span></p>
<h4>渲染进程</h4>
<p>渲染进程是应用的一个浏览器窗口。与主进程不同，它能存在多个（注：一个 Electron 应用只能有一个主进程）并且是<strong>相互独立的</strong>。它们也能是<strong>隐藏的</strong>。它通常被命名为 <code>index.html</code>。它们就像典型的 HTML 文件，但在 Electron 中，它们能获取完整的 Node API 特性。因此，这也是它与其它浏览器不同的地方。</p>
<ul>
<li><p><strong>相互独立</strong>：每个渲染进程都是独立的，这意味着就算它们某个崩溃了，也不会影响其余的渲染进程。</p></li>
<li><p><strong>隐藏的</strong>：你可以设置一个窗口是隐藏的，然后让它只在背后执行代码（?）。</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007665167?w=1000&amp;h=563" src="https://static.alili.tech/img/remote/1460000007665167?w=1000&amp;h=563" alt="渲染进程" title="渲染进程" style="cursor: pointer;"></span></p>
<h4>把它们想象成这样</h4>
<p>在 Chrome（或其它浏览器）中的每个标签页（tab） 和其内的页面，就好比 Electron 中的一个单独渲染进程。如果你关闭所有标签页，Chrome 依然存在，这好比 Electron 的主进程，而且你能打开一个新的窗口或关闭这个应用。</p>
<blockquote><p>注：一般情况下，在 Chrome 浏览器中，一个标签页（tab）中的页面（即除了浏览器本身部分，如搜索框、工具栏等）就是一个渲染进程。</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007665168?w=1000&amp;h=563" src="https://static.alili.tech/img/remote/1460000007665168?w=1000&amp;h=563" alt="把它们想象成这样" title="把它们想象成这样" style="cursor: pointer;"></span></p>
<h4>相互通讯</h4>
<p>尽管主进程和渲染进程都有各自的任务，但它们之间也有需要协同完成的任务。因此它们之间需要通讯。<strong>IPC</strong>就为此而生，它提供了进程间的通讯。但它只能在主进程与渲染进程之间传递信息。</p>
<ul><li><p><strong>IPC</strong>：主进程和渲染进程都有一个 IPC 模块。</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007665169?w=1000&amp;h=563" src="https://static.alili.tech/img/remote/1460000007665169?w=1000&amp;h=563" alt="此处输入图片的描述" title="此处输入图片的描述" style="cursor: pointer;"></span></p>
<h4>汇成一句话</h4>
<p>Electron 应用就像 Node 应用，它也依赖一个 <code>package.json</code>  文件。该文件定义了哪个文件作为主进程，并因此让 Electron  知道从何启动你的应用。然后主进程能创建渲染进程，并能使用 IPC 让两者间进行消息传递。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007665170?w=1000&amp;h=563" src="https://static.alili.tech/img/remote/1460000007665170?w=1000&amp;h=563" alt="汇成一句话" title="汇成一句话" style="cursor: pointer;"></span></p>
<p>至此，Electron 的基础部分介绍完毕。该部分是基于我之前翻译的一篇文章<a href="http://jlord.us/essential-electron/" rel="nofollow noreferrer" target="_blank">《Essential Electron》</a>，译文可点击 <a href="https://segmentfault.com/a/1190000007503495">这里</a>。</p>
<p>-----</p>
<h3 id="articleHeader7">Vue 全家桶</h3>
<p>目前，该工具应用了 Vue、Vuex、Vuex-router。在工具基本定型阶段，由 1.x 升级到了 2.0 （Vuex 暂未升级）。</p>
<h4>为什么选择 Vue</h4>
<p>对于我来说：</p>
<ul>
<li><p>简单易用，一般使用只需看官方文档。</p></li>
<li><p>数据驱动视图，所以基本不用操作 DOM 了。</p></li>
<li><p>框架的存在是为了帮助我们应对复杂度。</p></li>
<li><p>全家桶的好处是：对于一般场景，我就不需要考虑用哪些个库（插件）。</p></li>
</ul>
<p>Vue 1.x -&gt; Vue 2.0 的版本迁移用 <a href="https://github.com/vuejs/vue-migration-helper" rel="nofollow noreferrer" target="_blank">vue-migration-helper</a> 即可分析出大部分需要更改的地方。</p>
<p>网上已经有很多关于 Vue 的信息了。至此，Vue 部分介绍完毕。</p>
<hr>
<h3 id="articleHeader8">js-xlsx</h3>
<p>该库支持各种电子表格格式的解析和生成。它由纯 JavaScript 实现，适用于前端和 Node。<a href="https://github.com/SheetJS/js-xlsx" rel="nofollow noreferrer" target="_blank">详情&gt;&gt;</a></p>
<p>支持读入的格式有：</p>
<ul>
<li><p>Excel 2007+ XML Formats (XLSX/XLSM)</p></li>
<li><p>Excel 2007+ Binary Format (XLSB)</p></li>
<li><p>Excel 2003-2004 XML Format (XML "SpreadsheetML")</p></li>
<li><p>Excel 97-2004 (XLS BIFF8)</p></li>
<li><p>Excel 5.0/95 (XLS BIFF5)</p></li>
<li><p>OpenDocument Spreadsheet (ODS)</p></li>
</ul>
<p>支持写的格式有：</p>
<ul>
<li><p>XLSX</p></li>
<li><p>CSV (and general DSV)</p></li>
<li><p>JSON and JS objects (various styles)</p></li>
</ul>
<p>只要能提供读（解析）和写，剩下的就是靠 JavaScript 处理解析出来的数据（JSON）了。目前该库提供了 <code>sheet_to_json</code> 方法，该方法能将读入的 Excel 数据转为 JSON 格式。由于导出时需要提供特定的 JSON 格式，因此这部分需要我们自己实现。</p>
<p>更多关于 Excel 在 JavaScript 中处理的知识可关注：凹凸实验室的<a href="https://aotu.io/notes/2016/04/07/node-excel/" rel="nofollow noreferrer" target="_blank">《Node读写Excel文件探究实践》</a>。但该文章存在两处问题（均在 js-xlsx 实战的导出表格部分）：</p>
<ol>
<li><p>生成头部时，Excel 的列信息简单地通过 <code>String.fromCharCode(65+j)</code> 生成，但列大于 26 时就会出现问题。这个问题会在后面章节中给出解决方案；</p></li>
<li><p>转换成 worksheet 需要的结构处，出现逻辑性错误，并且会导致严重的性能问题。逻辑问题在此不讲述，我们讲下性能问题：<br> ECMAScript 的不断更新，让 JavaScript 更加强大和易用。尽管如此，我们还是要做到『物尽所用』，而不要『大材小用』，否则会得到反效果。这里导致性能问题的正是 <a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/assign" rel="nofollow noreferrer" target="_blank">Object.assign()</a> 方法，该方法可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象。由于该方法自身的实现机制，会在这里产生大量的冗余操作。而这里的单元格信息是唯一的，所以直接通过 forEach 为一个空对象赋值即可。提升 N 倍性能的同时，也把逻辑性错误解决了。</p></li>
</ol>
<p>原来的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var result = 某数组.reduce((prev, next) => Object.assign({}, prev, {[next.position]: {v: next.v"}}"), {});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs moonscript"><code style="word-break: break-word; white-space: initial;">var result = 某数组.reduce(<span class="hljs-function"><span class="hljs-params">(prev, <span class="hljs-built_in">next</span>)</span> =&gt;</span> Object.assign({}, prev, {[<span class="hljs-built_in">next</span>.position]: {<span class="hljs-name">v</span>: <span class="hljs-built_in">next</span>.v"}}"), {});</code></pre>
<p>改为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var result = 某数组.forEach((v, i) => data[v.position]= {v: v.v})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;">var result = 某数组.forEach(<span class="hljs-function"><span class="hljs-params">(v, i)</span> =&gt;</span> data[v.position]= {v: v.v})</code></pre>
<hr>
<p><strong>实践是检验真理的唯一标准</strong><br>在理解上述知识的前提下，下面就谈谈一些在实践中总结出来的<strong>技巧、难点和重点</strong>。</p>
<h2 id="articleHeader9">CSS、JavaScript 和 Electron 相关的知识和技巧</h2>
<h3 id="articleHeader10">高亮 table 的列</h3>
<p>Excel 单元格采用 <code>table</code> 展示。在 Excel 中，被选中的单元格会高亮相应的『行』和『列』，以提醒用户。在该应用中也有做相应处理，横向高亮采用 <code>tr:hover</code> 实现，而纵向呢？这里所采用的一个技巧是：</p>
<p>假设 HTML 结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="div.container
  table
    tr
      td" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-selector-tag">div</span><span class="hljs-selector-class">.container</span>
  <span class="hljs-selector-tag">table</span>
    <span class="hljs-selector-tag">tr</span>
      td</code></pre>
<p>CSS 代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".container { overflow:hidden; }
td { position: relative; }
td:hover::after { 
  position: absolute; 
  left: 0; 
  right: 0; 
  top: -1个亿px; // 小目标达成，不过是负的?
  bottom: -1个亿px; 
  z-index: -1; // 避免遮住自身和同列 td 的内容、border 等
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scss"><code><span class="hljs-selector-class">.container</span> { <span class="hljs-attribute">overflow</span>:hidden; }
<span class="hljs-selector-tag">td</span> { <span class="hljs-attribute">position</span>: relative; }
<span class="hljs-selector-tag">td</span>:hover::after { 
  <span class="hljs-attribute">position</span>: absolute; 
  <span class="hljs-attribute">left</span>: <span class="hljs-number">0</span>; 
  <span class="hljs-attribute">right</span>: <span class="hljs-number">0</span>; 
  <span class="hljs-attribute">top</span>: -<span class="hljs-number">1</span>个亿px; <span class="hljs-comment">// 小目标达成，不过是负的?</span>
  <span class="hljs-attribute">bottom</span>: -<span class="hljs-number">1</span>个亿px; 
  <span class="hljs-attribute">z-index</span>: -<span class="hljs-number">1</span>; <span class="hljs-comment">// 避免遮住自身和同列 td 的内容、border 等</span>
}</code></pre>
<h3 id="articleHeader11">斜分割线</h3>
<p>如图：<span class="img-wrap"><img data-src="/img/remote/1460000007665171?w=49&amp;h=45" src="https://static.alili.tech/img/remote/1460000007665171?w=49&amp;h=45" alt="斜分割线" title="斜分割线" style="cursor: pointer;"></span></p>
<p>分割线可以通过 <code>::after/::before</code> 伪类元素实现一条直线，然后通过 <code>transform:rotate();</code> 旋转特定角度实现。但这种实现的一个问题是：由于宽度是不定的，因此需要通过 JavaScript 运算才能得到准确的对角分割线。</p>
<p>因此，这里可以通过 CSS 线性渐变 <code>linear-gradient(to top right, transparent, transparent calc(50% - .5px), #d3d6db calc(50% - .5px), #d3d6db calc(50% + .5px), transparent calc(50% + .5px))</code> 实现。无论宽高如何变，依然妥妥地自适应。</p>
<h3 id="articleHeader12">Excel 的列转换</h3>
<ul><li><p>Excel 的列需要用『字母』表示，但不能简单地通过 <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode" rel="nofollow noreferrer" target="_blank">String.fromCharCode()</a> 实现，因为当超出 <code>26列</code> 时会产生问题（如：第 <code>27</code> 列，<code>String.fromCharCode(65+26)</code> 得到的是 <code>[</code>，而不是 <code>AA</code>）。因此，这需要通过『十进制和26进制转换』算法来实现。</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 将指定的自然数转换为26进制表示。映射关系：[0-25] -> [A-Z]。
function getCharCol(n) {
    let temCol = '',
        s = '',
        m = 0
    while (n >= 0) {
        m = n % 26 + 1
        s = String.fromCharCode(m + 64) + s
        n = (n - m) / 26
    }
    return s
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 将指定的自然数转换为26进制表示。映射关系：[0-25] -&gt; [A-Z]。</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getCharCol</span>(<span class="hljs-params">n</span>) </span>{
    <span class="hljs-keyword">let</span> temCol = <span class="hljs-string">''</span>,
        s = <span class="hljs-string">''</span>,
        m = <span class="hljs-number">0</span>
    <span class="hljs-keyword">while</span> (n &gt;= <span class="hljs-number">0</span>) {
        m = n % <span class="hljs-number">26</span> + <span class="hljs-number">1</span>
        s = <span class="hljs-built_in">String</span>.fromCharCode(m + <span class="hljs-number">64</span>) + s
        n = (n - m) / <span class="hljs-number">26</span>
    }
    <span class="hljs-keyword">return</span> s
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 将指定的26进制转换为自然数。映射关系：[A-Z] ->[0-25]。
function getNumCol(s) {
    if (!s) return 0
    let n = 0
    for (let i = s.length - 1, j = 1; i >= 0; i-- , j *= 26) {
        let c = s[i].toUpperCase()
        if (c < 'A' || c > 'Z') return 0
        n += (c.charCodeAt() - 64) * j
    }
    return n - 1
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 将指定的26进制转换为自然数。映射关系：[A-Z] -&gt;[0-25]。</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getNumCol</span>(<span class="hljs-params">s</span>) </span>{
    <span class="hljs-keyword">if</span> (!s) <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>
    <span class="hljs-keyword">let</span> n = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = s.length - <span class="hljs-number">1</span>, j = <span class="hljs-number">1</span>; i &gt;= <span class="hljs-number">0</span>; i-- , j *= <span class="hljs-number">26</span>) {
        <span class="hljs-keyword">let</span> c = s[i].toUpperCase()
        <span class="hljs-keyword">if</span> (c &lt; <span class="hljs-string">'A'</span> || c &gt; <span class="hljs-string">'Z'</span>) <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>
        n += (c.charCodeAt() - <span class="hljs-number">64</span>) * j
    }
    <span class="hljs-keyword">return</span> n - <span class="hljs-number">1</span>
}</code></pre>
<h3 id="articleHeader13">为 DOM 的 File 对象增加了 path 属性</h3>
<p>Electron 为 File 对象额外增了 path 属性，该属性可得到文件在文件系统上的真实路径。因此，你可以利用 Node 为所欲为?。应用场景有：拖拽文件后，通过 Node 提供的 File API 读取文件等。</p>
<h3 id="articleHeader14">支持常见的编辑功能，如粘贴和复制</h3>
<p>Electron 应用在 MacOS 中默认不支持『复制』『粘贴』等常见编辑功能，因此需要为 MacOS 显式地设置复制粘贴等编辑功能的菜单栏，并为此设置相应的快捷键。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// darwin 就是 MacOS
if (process.platform === 'darwin') {
    var template = [{
      label: 'FromScratch',
      submenu: [{
        label: 'Quit',
        accelerator: 'CmdOrCtrl+Q',
        click: function() { app.quit(); }
      }]
    }, {
      label: 'Edit',
      submenu: [{
        label: 'Undo',
        accelerator: 'CmdOrCtrl+Z',
        selector: 'undo:'
      }, {
        label: 'Redo',
        accelerator: 'Shift+CmdOrCtrl+Z',
        selector: 'redo:'
      }, {
        type: 'separator'
      }, {
        label: 'Cut',
        accelerator: 'CmdOrCtrl+X',
        selector: 'cut:'
      }, {
        label: 'Copy',
        accelerator: 'CmdOrCtrl+C',
        selector: 'copy:'
      }, {
        label: 'Paste',
        accelerator: 'CmdOrCtrl+V',
        selector: 'paste:'
      }, {
        label: 'Select All',
        accelerator: 'CmdOrCtrl+A',
        selector: 'selectAll:'
      }]
    }];
    var osxMenu = menu.buildFromTemplate(template);
    menu.setApplicationMenu(osxMenu);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>// darwin 就是 MacOS
if (process.platform === <span class="hljs-string">'darwin'</span>) {
    var template = [{
      <span class="hljs-keyword">label</span><span class="bash">: <span class="hljs-string">'FromScratch'</span>,
</span>      submenu: [{
        <span class="hljs-keyword">label</span><span class="bash">: <span class="hljs-string">'Quit'</span>,
</span>        accelerator: <span class="hljs-string">'CmdOrCtrl+Q'</span>,
        click: function() { app.quit(); }
      }]
    }, {
      <span class="hljs-keyword">label</span><span class="bash">: <span class="hljs-string">'Edit'</span>,
</span>      submenu: [{
        <span class="hljs-keyword">label</span><span class="bash">: <span class="hljs-string">'Undo'</span>,
</span>        accelerator: <span class="hljs-string">'CmdOrCtrl+Z'</span>,
        selector: <span class="hljs-string">'undo:'</span>
      }, {
        <span class="hljs-keyword">label</span><span class="bash">: <span class="hljs-string">'Redo'</span>,
</span>        accelerator: <span class="hljs-string">'Shift+CmdOrCtrl+Z'</span>,
        selector: <span class="hljs-string">'redo:'</span>
      }, {
        type: <span class="hljs-string">'separator'</span>
      }, {
        <span class="hljs-keyword">label</span><span class="bash">: <span class="hljs-string">'Cut'</span>,
</span>        accelerator: <span class="hljs-string">'CmdOrCtrl+X'</span>,
        selector: <span class="hljs-string">'cut:'</span>
      }, {
        <span class="hljs-keyword">label</span><span class="bash">: <span class="hljs-string">'Copy'</span>,
</span>        accelerator: <span class="hljs-string">'CmdOrCtrl+C'</span>,
        selector: <span class="hljs-string">'copy:'</span>
      }, {
        <span class="hljs-keyword">label</span><span class="bash">: <span class="hljs-string">'Paste'</span>,
</span>        accelerator: <span class="hljs-string">'CmdOrCtrl+V'</span>,
        selector: <span class="hljs-string">'paste:'</span>
      }, {
        <span class="hljs-keyword">label</span><span class="bash">: <span class="hljs-string">'Select All'</span>,
</span>        accelerator: <span class="hljs-string">'CmdOrCtrl+A'</span>,
        selector: <span class="hljs-string">'selectAll:'</span>
      }]
    }];
    var osxMenu = menu.buildFromTemplate(template);
    menu.setApplicationMenu(osxMenu);
}</code></pre>
<h3 id="articleHeader15">更贴近原生应用</h3>
<p>Electron 的一个缺点是：即使你的应用是一个简单的时钟，但它也不得不包含完整的基础设施（如 Chromium、Node 等）。因此，一般情况，打包后的程序至少会达到几十兆（根据系统类型进行浮动）。当你的应用越复杂，就越可以忽略这部分了。</p>
<p>众所周知，页面的渲染难免会导致『白屏』，而且这里采用了 Vue 框架，情况就更加糟糕了。另外，Electron 应用也避免不了『先打开浏览器，再渲染页面』的步骤。下面提供几种方法来减轻这种情况，以让程序更贴近原生应用。</p>
<ol>
<li><p>指定 BrowserWindow 的背景颜色；</p></li>
<li><p>先隐藏窗口，直到页面加载后再显示；</p></li>
<li><p>保存窗口的尺寸和位置，以让程序下次被打开时，依然保留的同样大小和出现在同样的位置上。</p></li>
</ol>
<p>对于第一点，若程序的背景不是纯白（#fff）的，那么可指定窗口的背景颜色与其一致，以避免突变。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mainWindow = new BrowserWindow({
    title: 'XCel',
    backgroundColor: '#f5f5f5',
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ebnf"><code><span class="hljs-attribute">mainWindow</span> = new BrowserWindow({
    title: <span class="hljs-string">'XCel'</span>,
    backgroundColor: <span class="hljs-string">'#f5f5f5'</span>,
};</code></pre>
<p>对于第二点，由于 Electron 本质是一个浏览器，需要加载非网页部分的资源。因此，我们可以先隐藏窗口。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var mainWindow = new BrowserWindow({
    title: 'ElectronApp',
    show: false,
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> mainWindow = <span class="hljs-built_in">new</span> BrowserWindow({
    <span class="hljs-built_in">title</span>: 'ElectronApp',
    <span class="hljs-built_in">show</span>: <span class="hljs-literal">false</span>,
};</code></pre>
<p>等到渲染进程开始渲染页面的那一刻，在 <code>ready-to-show</code> 的回调函数中显示窗口。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mainWindow.on('ready-to-show', function() {
    mainWindow.show();
    mainWindow.focus();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs delphi"><code>mainWindow.<span class="hljs-keyword">on</span>(<span class="hljs-string">'ready-to-show'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">()</span> <span class="hljs-comment">{
    mainWindow.show();
    mainWindow.focus();
}</span>);</span></code></pre>
<p>对于第三点，我并没有实现，原因如下：</p>
<ol>
<li><p>用户一般是根据当时的情况对程序的尺寸和位置进行调整，即视情况而定。</p></li>
<li><p>以上是我个人臆测，主要是我懒?。</p></li>
</ol>
<p>其实现方式，可参考<a href="https://blog.avocode.com/blog/4-must-know-tips-for-building-cross-platform-electron-apps" rel="nofollow noreferrer" target="_blank">《4 must-know tips for building cross platform Electron apps》</a>。</p>
<h3 id="articleHeader16">如何在渲染进程调用原生弹框？</h3>
<p>在渲染进程中调用原本专属于主进程中的 API （如弹框）的方式有两种：</p>
<ol>
<li><p>IPC 通讯模块：先在主进程通过 ipcMain 进行监听，然后在渲染进程通过 ipcRenderer 进行触发；</p></li>
<li><p>remote 模块：该模块提供了一种在渲染进程（网页）和主进程之间进行进程间通讯（IPC）的简便途径。</p></li>
</ol>
<ul>
<li><p>对于第一种，有需要就在评论区留言；</p></li>
<li>
<p>对于第二种， 在渲染进程中，运行以下代码即可：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const remote = require('electron').remote

remote.dialog.showMessageBox({
    type: 'question',
    buttons: ['不告诉你', '没有梦想'],
    defaultId: 0,
    title: 'XCel',
    message: '你的梦想是什么？'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>const remote = require(<span class="hljs-string">'electron'</span>)<span class="hljs-selector-class">.remote</span>

remote<span class="hljs-selector-class">.dialog</span><span class="hljs-selector-class">.showMessageBox</span>({
    type: <span class="hljs-string">'question'</span>,
    buttons: [<span class="hljs-string">'不告诉你'</span>, <span class="hljs-string">'没有梦想'</span>],
    defaultId: <span class="hljs-number">0</span>,
    title: <span class="hljs-string">'XCel'</span>,
    message: <span class="hljs-string">'你的梦想是什么？'</span>
}</code></pre>
</li>
</ul>
<h3 id="articleHeader17">自动更新</h3>
<p>如果 Electron 应用没有了自动更新的功能，那么意味着用户想体验你新开发的功能或用上修复 Bug 后的新版本，只能靠自己主动地去官网下载，这无疑是糟糕的体验。Electron 提供的 <a href="http://electron.atom.io/docs/api/auto-updater/" rel="nofollow noreferrer" target="_blank">autoUpdater</a> 模块可实现自动更新功能，该模块提供了第三方框架 <a href="https://github.com/Squirrel" rel="nofollow noreferrer" target="_blank">Squirrel</a> 的接口，但 Electron 目前只内置了 <a href="https://github.com/Squirrel/Squirrel.Mac" rel="nofollow noreferrer" target="_blank">Squirrel.Mac</a>，且它与 <a href="https://github.com/Squirrel/Squirrel.Windows" rel="nofollow noreferrer" target="_blank">Squirrel.Windows</a>（需要额外引入）的处理方式也不一致（在客户端与服务器端两方面），因此如果刚接触该模块，会发现处理起来相对比较繁琐。具体可以参考我的一篇译文<a href="https://segmentfault.com/a/1190000007616641">《Electron 自动更新的完整教程（Windows 和 OSX）》</a>。</p>
<blockquote><p>目前 Electron 的 autoUpdater 模块不支持 Linux 系统。</p></blockquote>
<p>另外，XCel 目前并没有采用 autoUpdater 模块实现自动更新功能，而是利用 Electron 的 <a href="http://electron.atom.io/docs/api/download-item/" rel="nofollow noreferrer" target="_blank">DownloadItem</a> 模块实现。而服务器端则采用 <a href="https://nuts.gitbook.com/" rel="nofollow noreferrer" target="_blank">Nuts</a>。</p>
<h3 id="articleHeader18">为 Electron 应用生成 Windows 安装包</h3>
<p>通过 electron-builder 即可直接生成常见的 MacOS 安装包，但它生成的 Windows 的安装包却略显简洁。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008010260?w=600&amp;h=473" src="https://static.alili.tech/img/remote/1460000008010260?w=600&amp;h=473" alt="常见的MacOS 安装包" title="常见的MacOS 安装包" style="cursor: pointer;"></span><br>Mac 常见的安装模式，将“左侧的应用图标”拖拽到“右侧的 Applications”即可</p>
<p>通过 electron-builder 生成的 Windows 安装包与我们在 Windows 上常见的软件安装界面不太一样，它没有安装向导和点击“下一步”的按钮，只有一个安装时的 gif 动画（默认的 gif 动画如下图，当然你也可以指定特定的 gif 动画），因此也就没有让用户选择安装路径等权利。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008010261?w=268&amp;h=167" src="https://static.alili.tech/img/remote/1460000008010261?w=268&amp;h=167" alt="Windows 安装时默认的动画" title="Windows 安装时默认的动画" style="cursor: pointer;"></span><br>Windows 安装时 <a href="https://github.com/electron/windows-installer/blob/master/resources/install-spinner.gif" rel="nofollow noreferrer" target="_blank">默认显示的 gif 动画</a></p>
<p>如果你想为打包后的 Electron 应用（即通过 electron-packager/electron-builder 生成的  、可直接运行的程序目录）生成需要点击“下一步”和可让用户指定安装路径的常见安装包，可以通过 NSIS 程序，具体可看这篇教程 <a href="http://seesawworld.blogspot.com/2016/02/1-nsis.html" rel="nofollow noreferrer" target="_blank">《[教學]只要10分鐘學會使用 NSIS 包裝您的桌面軟體–安裝程式打包。完全免費。》</a>。</p>
<blockquote><p>NSIS（Nullsoft Scriptable Install System）是一个开源的 Windows 系统下安装程序制作程序。它提供了安装、卸载、系统设置、文件解压缩等功能。这如其名字所指出的那样，NSIS 是通过它的脚本语言来描述安装程序的行为和逻辑的。NSIS 的脚本语言和通常的编程语言有类似的结构和语法，但它是为安装程序这类应用所设计的。</p></blockquote>
<p>至此，CSS、JavaScript 和 Electron 相关的知识和技巧 部分阐述完毕。</p>
<hr>
<h2 id="articleHeader19">性能优化</h2>
<p>下面谈谈『性能优化』，这部分涉及到<strong>运行效率</strong>和<strong>内存占用量</strong>。     <br>注：以下内容均基于 Excel 样例文件（数据量为：1913 行 x 180 列）得出的结论。</p>
<h3 id="articleHeader20">执行效率和渲染的优化</h3>
<h4>Vue 性能真的好？</h4>
<p>Vue 一直标榜着自己性能优异，但当数据量上升到一定量级时（如 1913 x 180 ≈ 34 万个数据单元），会出现严重的性能问题（不做相应优化的前提下）。</p>
<p>如直接通过列表渲染 <code>v-for</code> 渲染数据时，会导致程序卡死。   <br>答：通过查阅相关资料可得（猜测）， <code>v-for</code> 是通过一条条数据在构建后插入 DOM 的，这对于数据量较大时，无疑会造成严重的性能问题。   </p>
<p>当时，我想到了两种解决思路：</p>
<ol>
<li><p>Vue 是数据驱动视图的，对数据分段 push，即将一个庞大的任务分割为 N 份。</p></li>
<li><p>自己拼接 HTML 字符串，再通过 innerHTML 一次性插入。</p></li>
</ol>
<p>最终，我选择了第二条，理由是：</p>
<ol>
<li><p>性能最佳，因为每次执行数据过滤时，Vue 都要进行 diff，性能不佳。</p></li>
<li><p>更符合当前应用的需求：纯展示且无需动画过渡等。</p></li>
<li><p>实现更简单</p></li>
</ol>
<p>将原本繁重的 DOM 操作转移到了 JavaScript 的拼接字符串后，性能得到了很大提升（不会导致程序卡死而渲染不出视图）。这种实现原理难道不就是 Vue、React 等框架解决的问题之一吗？只不过框架考虑的场景更广，有些地方需要我们自己根据实际情况进行优化而已。</p>
<blockquote><p>在浏览器当中，JavaScript 的运算在现代的引擎中非常快，但 DOM 本身是非常缓慢的东西。当你调用原生 DOM API 的时候，浏览器需要在 JavaScript 引擎的语境下去接触原生的 DOM 的实现，这个过程有相当的性能损耗。所以，本质的考量是，要把耗费时间的操作尽量放在纯粹的计算中去做，保证最后计算出来的需要实际接触真实 DOM 的操作是最少的。 —— <a href="http://www.infoq.com/cn/articles/vue-2-progressive-front-end-solution" rel="nofollow noreferrer" target="_blank">《Vue 2.0——渐进式前端解决方案》</a></p></blockquote>
<p>当然，由于 JavaScript 天生单线程，即使执行数速度再快，也会导致页面有短暂的时间拒绝用户的输入。此处可通过 Web Worker 或其它方式解决，这也将是我们后续讲到的问题。</p>
<p>也有网友提供了优化大量列表的方法：<a href="https://clusterize.js.org/" rel="nofollow noreferrer" target="_blank">https://clusterize.js.org/</a>。 但在这里我并没有采用此方式。</p>
<h4>强大的 GPU 加速</h4>
<p>插入 DOM 后，又会出现了另外一个问题：滚动会很卡。猜想这是渲染问题，毕竟 34 万个单元格同时存在于界面中。</p>
<p>添加 <code>transform: translate3d(0, 0, 0) / translateZ(0)</code> 属性启动 GPU 渲染，即可解决这个渲染性能问题。再次感叹该属性的强大。?</p>
<p>后来，考虑到用户并不需要查看全部数据，只需展示部分数据让用户进行参考即可。我们对此只渲染前 30/50 行数据。这样即可提升用户体验，也能进一步优化性能（又是纯属臆测）。</p>
<h4>记得关闭 Vuex 的严格模式</h4>
<p>另外，由于自己学艺不精和粗心大意，忘记在生产环境关闭 Vuex 的『严格模式』。<br>Vuex 的严格模式要<strong>在生产中关闭</strong>，否则会对 state 树进行一个深观察 (deep watch)，产生不必要的性能损耗。也许在数据量少时，不会注意到这个问题。</p>
<p>我当时的情况是：导入 Excel 数据后，再进行交互（涉及 Vuex 的读写操作），则需要等几秒才会响应，而直接通过纯 DOM 监听的事件则无此问题。由此，判断出是 Vuex 问题。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const store = new Vuex.Store({
  // ...
  strict: process.env.NODE_ENV !== 'production'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">const</span> store = <span class="hljs-keyword">new</span> Vuex.Store({
  <span class="hljs-comment">// ...</span>
  strict: <span class="hljs-built_in">process</span>.env.NODE_ENV !== <span class="hljs-string">'production'</span>
})</code></pre>
<h2 id="articleHeader21">多进程！！！</h2>
<p>前面说道，JavaScript 天生单线程，即使再快，对于需要处理数据量较大的情况，也会出现拒绝响应的问题。因此需要 Web Worker 或类似的方案去解决。</p>
<p>在这里我不选择 Web worker 的原因有如下几点：</p>
<ol>
<li><p>有其它更好的替代方案：一个主进程能创建多个渲染进程，通过 IPC 即可进行数据交互；</p></li>
<li><p>Electron 不支持 Web Worker！</p></li>
</ol>
<p>Electron 作者在 2014.11.7 在《state of web worker support?》 issue 中回复了以下这一段：</p>
<blockquote><p>Node integration doesn't work in web workers, and there is no plan to do. Workers in Chromium are implemented by starting a new thread, and Node is not thread safe. Back in past we had tried to add node integration to web workers in Atom, but it crashed too easily so we gave up on it.</p></blockquote>
<p>因此，我们最终采用了创建一个新的渲染进程 <code>background process</code> 进行处理数据。由 Electron 章节可知，每个 Electron 渲染进程是独立的，因此它们不会互相影响。但这也带来了一个问题：它们不能相互通讯？</p>
<p>错！下面有 3 种方式进行通讯：</p>
<ol>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Web/API/Storage" rel="nofollow noreferrer" target="_blank">Storage API</a>：对某个标签页的 localStorage/sessionStorage 对象进行增删改时，其他标签页能通过 window.storage 事件监听到。</p></li>
<li><p><a href="https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API" rel="nofollow noreferrer" target="_blank">IndexedDB</a>：IndexedDB 是一个为了能够在客户端存储可观数量的结构化数据，并且在这些数据上使用索引进行高性能检索的 API。</p></li>
<li><p>通过主进程作为中转站：设主界面的渲染进程是 A，<code>background process</code> 是 B，那么 A 先将 Excel 数据传递到主进程，然后主进程再转发到 B。B 处理完后再原路返回，具体如下图。当然，也可以将数据存储在主进程中，然后在多个渲染进程中使用 remote 模块来访问它。</p></li>
</ol>
<p>该工具采用了第三种方式的第一种情况：   <br><span class="img-wrap"><img data-src="/img/remote/1460000007665172?w=1000&amp;h=563" src="https://static.alili.tech/img/remote/1460000007665172?w=1000&amp;h=563" alt="Multiprocessing" title="Multiprocessing" style="cursor: pointer;"></span></p>
<p>1、主页面渲染进程 A 的代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//①
ipcRenderer.send('filter-start', {
    filterTagList: this.filterTagList,
    filterWay: this.filterWay,
    curActiveSheetName: this.activeSheet.name
})

// ⑥ 在某处接收 filter-response 事件
ipcRenderer.on(&quot;filter-response&quot;, (arg) => {
    // 得到处理数据
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">//①</span>
ipcRenderer.send(<span class="hljs-string">'filter-start'</span>, {
    filterTagList: this<span class="hljs-selector-class">.filterTagList</span>,
    filterWay: this<span class="hljs-selector-class">.filterWay</span>,
    curActiveSheetName: this<span class="hljs-selector-class">.activeSheet</span><span class="hljs-selector-class">.name</span>
})

<span class="hljs-comment">// ⑥ 在某处接收 filter-response 事件</span>
ipcRenderer.on(<span class="hljs-string">"filter-response"</span>, (arg) =&gt; {
    <span class="hljs-comment">// 得到处理数据</span>
})</code></pre>
<p>2、作为中转站的主进程的代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//②
ipcMain.on(&quot;filter-start&quot;, (event, arg) => {
    // webContents 用于渲染和控制 web page
    backgroundWindow.webContents.send(&quot;filter-start&quot;, arg)
})

// ⑤ 用于接收返回事件
ipcMain.on(&quot;filter-response&quot;, (event, arg) => {
    mainWindow.webContents.send(&quot;filter-response&quot;, arg)
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">//②</span>
ipcMain.on(<span class="hljs-string">"filter-start"</span>, (event, arg) =&gt; {
    <span class="hljs-comment">// webContents 用于渲染和控制 web page</span>
    backgroundWindow<span class="hljs-selector-class">.webContents</span><span class="hljs-selector-class">.send</span>(<span class="hljs-string">"filter-start"</span>, arg)
})

<span class="hljs-comment">// ⑤ 用于接收返回事件</span>
ipcMain.on(<span class="hljs-string">"filter-response"</span>, (event, arg) =&gt; {
    mainWindow<span class="hljs-selector-class">.webContents</span><span class="hljs-selector-class">.send</span>(<span class="hljs-string">"filter-response"</span>, arg)
})</code></pre>
<p>3、处理繁重数据的 <code>background process</code> 渲染进程 B 的代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ③
ipcRenderer.on('filter-start', (event, arg) => {
    // 进行运算
    ... 
    
    // ④ 运算完毕后，再通过 IPC 原路返回。主进程和渲染进程 A 也要建立相应的监听事件
    ipcRenderer.send('filter-response', {
        filRow: tempFilRow
    })
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// ③</span>
<span class="hljs-selector-tag">ipcRenderer</span><span class="hljs-selector-class">.on</span>(<span class="hljs-string">'filter-start'</span>, (event, arg) =&gt; {
    <span class="hljs-comment">// 进行运算</span>
    ... 
    
    <span class="hljs-comment">// ④ 运算完毕后，再通过 IPC 原路返回。主进程和渲染进程 A 也要建立相应的监听事件</span>
    <span class="hljs-selector-tag">ipcRenderer</span><span class="hljs-selector-class">.send</span>(<span class="hljs-string">'filter-response'</span>, {
        <span class="hljs-attribute">filRow</span>: tempFilRow
    })
})</code></pre>
<p>至此，我们将『读取文件』、『过滤数据』和『导出文件』三大耗时的数据操作均转移到了 <code>background process</code> 中处理。</p>
<p>这里，我们只创建了一个 <code>background process</code>，如果想要做得更极致，我们可以新建『CPU 线程数- 1 』 个的 <code>background process</code> 同时对数据进行处理，然后在主进程对处理后数据进行拼接，最后再将拼接后的数据返回到主页面的渲染进程。这样就可以充分榨干 CPU 了。当然，在此我不会进行这个优化。</p>
<blockquote><p>不要为了优化而优化，否则得不偿失。 —— 某网友</p></blockquote>
<h3 id="articleHeader22">内存占有量过大</h3>
<p>解决了执行效率和渲染的问题，发现也存在内存占用量过大的问题。当时猜测是以下几个原因：</p>
<ol>
<li><p>三大耗时操作均放置在 <code>background process</code> 处理。在通讯传递数据的过程中，由于不是共享内存（因为 IPC 是基于 Socket 的），导致出现多份数据副本（在写该篇文章时才有了这相对确切的答案）。</p></li>
<li><p>Vuex 是以一个全局单例的模式进行管理，但它会是不是对数据做了某些封装，而导致性能的损耗呢？</p></li>
<li><p>由于 JavaScript 目前不具有主动回收资源的能力，所以只能主动对闲置对象设置为 <code>null</code>，然后等待 GC 回收。</p></li>
</ol>
<blockquote><p>由于 Chromium 采用多进程架构，因此会涉及到进程间通信问题。Browser 进程在启动 Render 进程的过程中会建立一个以 UNIX Socket 为基础的 IPC 通道。有了 IPC 通道之后，接下来 Browser 进程与 Render 进程就以消息的形式进行通信。我们将这种消息称为 IPC 消息，以区别于线程消息循环中的消息。</p></blockquote>
<p>——<a href="http://blog.csdn.net/luoshengyang/article/details/47822689" rel="nofollow noreferrer" target="_blank">《Chromium的IPC消息发送、接收和分发机制分析》</a></p>
<p>定义：为了易于理解，以下『Excel 数据』均指 Excel 的全部有效单元格转为 JSON 格式后的数据。</p>
<p>最容易处理的无疑是第三点，手动将不再需要的变量及时设置为 <code>null</code>。但这效果并不明显。</p>
<p>后来，通过系统的『活动监视器』对该工具的每阶段（打开时、导入文件时、筛选时和导出时）进行粗略的内存分析，得到以下报告（之前分析的、未作修改）： </p>
<p>---------------- S：报告分割线 ----------------<br>经观察，主要耗内存的是<strong>页面进程</strong>。下面通过截图说明：  <br><code>PID 15243</code> 是主进程  <br><code>PID 15246</code> 是页面渲染进程  <br><code>PID 15248</code> 是 background 渲染进程  </p>
<p>a、首次启动程序时（第 4 行是主进程；第 1 行是页面渲染进程；第 3 行是 background 渲染进程 ）</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007665173?w=815&amp;h=567" src="https://static.alili.tech/img/remote/1460000007665173?w=815&amp;h=567" alt="启动程序时" title="启动程序时" style="cursor: pointer;"></span></p>
<p>b、导入文件（第 5 行是主进程；第 2 行是页面渲染进程；第 4 行是 background 渲染进程 ）   <br><span class="img-wrap"><img data-src="/img/remote/1460000007665174?w=815&amp;h=567" src="https://static.alili.tech/img/remote/1460000007665174?w=815&amp;h=567" alt="导入文件时" title="导入文件时" style="cursor: pointer;"></span></p>
<p>c、筛选数据（第 4 行是主进程；第 1 行是页面渲染进程；第 3 行是 background 渲染进程 ）   <br><span class="img-wrap"><img data-src="/img/remote/1460000007665175?w=815&amp;h=567" src="https://static.alili.tech/img/remote/1460000007665175?w=815&amp;h=567" alt="筛选数据时" title="筛选数据时" style="cursor: pointer;"></span></p>
<p>由于 JS 目前不具有主动回收资源的功能，所以只能主动将对象设置为 <code>null</code>，然后等待 GC 回收。</p>
<p>因此，经过一段时间等待后，内存占用如下：   <br>d、一段时间后（第 4 行是主进程；第 1 行是页面渲染进程；第 3 行是 background 渲染进程 ）<br><span class="img-wrap"><img data-src="/img/remote/1460000007665176?w=815&amp;h=567" src="https://static.alili.tech/img/remote/1460000007665176?w=815&amp;h=567" alt="一段时间后" title="一段时间后" style="cursor: pointer;"></span></p>
<p>由上述可得，页面渲染进程由于页面元素和 Vue 等 UI 相关资源是固定的，占用内存较大且不能回收。主进程占用资源也不能得到很好释放，暂时不知道原因，而 background 渲染进程则较好地释放资源。</p>
<p>---------------- E：报告分割线 ----------------</p>
<p>根据报告，初步得出的结论是 Vue 和通讯时占用资源较大。</p>
<p>根据该工具的实际应用场景：由于 Excel 数据只在『导入』和『过滤后』两个阶段需要展示，而且展示的只是通过 JavaScript 拼接的 HTML 字符串构成的 DOM 而已。因此将表格数据放置在 Vuex 中，有点滥用资源的嫌疑。</p>
<p>另外，在 <code>background process</code> 中也有存有一份 Excel 数据副本。因此，索性只在 <code>background process</code> 存储一份 Excel 数据，然后每当数据变化时，通过 IPC 让 <code>background process</code> 返回拼接好的 HTML 字符串即可。这样一来，内存占有量立刻下降许多。而且这也是一个一举多得的优化：</p>
<ol>
<li><p>字符串拼接操作也转移到了 <code>background process</code>，页面的渲染进程进一步减少耗时的操作；</p></li>
<li><p>内存占有量大大减小，响应速度也得到了提升。</p></li>
</ol>
<p>其实，这也有点像 Vuex 的『全局单例模式管理』，一份数据就好。</p>
<p>当然，对于 Excel 的基本信息，如行列数、SheetName、标题组等均依然保存在 Vuex。</p>
<p>优化后的内存占有量如下图。与上述报告的第三张图相比（同一阶段），内存占有量下降了 44.419%：<br><span class="img-wrap"><img data-src="/img/remote/1460000007665177?w=815&amp;h=567" src="https://static.alili.tech/img/remote/1460000007665177?w=815&amp;h=567" alt="优化后内存占有量" title="优化后内存占有量" style="cursor: pointer; display: inline;"></span><br>另外，对于不需要响应的数据，可通过 <code>Object.freeze()</code> 冻结起来。这也是一种优化手段。但该工具目前并没有应用到。</p>
<p>至此，优化部分也阐述完毕了！</p>
<hr>
<p>该工具目前是开源的，欢迎大家使用或推荐给用研组等有需要的人。</p>
<p>你们的反馈（可提交 <a href="https://github.com/o2team/xcel/issues" rel="nofollow noreferrer" target="_blank">issues</a> / <a href="https://github.com/o2team/xcel/pulls" rel="nofollow noreferrer" target="_blank">pull request</a>）能让这个工具在使用和功能上不断完善。</p>
<p>最后，感谢 <a href="https://github.com/mamboer" rel="nofollow noreferrer" target="_blank">LV</a> 在产品规划、界面设计和优化上的强力支持。全文完！</p>
<p>感谢您的阅读，本文由 <a href="https://github.com/JChehe" rel="nofollow noreferrer" target="_blank">Jc</a> 原创提供。如若转载，请注明出处：凹凸实验室（<a href="https://aotu.io/notes/2016/11/15/xcel/" rel="nofollow noreferrer" target="_blank">https://aotu.io/notes/2016/11...</a>）</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
XCel 项目总结 - Electron 与 Vue 的性能优化

## 原文链接
[https://segmentfault.com/a/1190000007665162](https://segmentfault.com/a/1190000007665162)

