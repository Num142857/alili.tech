---
title: '改造你的网站，变身 PWA' 
date: 2019-01-17 2:30:25
hidden: true
slug: cyzvez51uqg
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/remote/1460000008880640?w=900&amp;h=500" src="https://static.alili.tech/img/remote/1460000008880640?w=900&amp;h=500" alt="pwa" title="pwa" style="cursor: pointer; display: inline;"></span></p>
<blockquote><p>最近有很多关于 Progressive Web Apps（PWAs）的消息，很多人都在问这是不是（移动）web 的未来。我不想陷入native app 和 PWA 的纷争，但是有一件事是确定的 --- PWA极大的提升了移动端表现，改善了用户体验。</p></blockquote>
<p>好消息是开发一个 PWA 并不难。事实上，我们可以将现存的网站进行改进，使之成为PWA。这也是我这篇文章要讲的 -- 当你读完这篇文章，你可以将你的网站改进，让他看起来就像是一个 native web app。他可以离线工作并且拥有自己的主屏图标。</p>
<h2 id="articleHeader0">Progressive Web Apps 是什么？</h2>
<p>Progressive Web Apps (下文以“PWAs”代指) 是一个令人兴奋的前端技术的革新。PWAs综合了一系列技术使你的 web app表现得就像是 native mobile app。相比于纯 web 解决方案和纯 native 解决方案，PWAs对于开发者和用户有以下优点：</p>
<ol>
<li><p>你只需要基于开放的 W3C 标准的 web 开发技术来开发一个app。不需要多客户端开发。</p></li>
<li><p>用户可以在安装前就体验你的 app。</p></li>
<li><p>不需要通过 AppStore 下载 app。app 会自动升级不需要用户升级。</p></li>
<li><p>用户会受到‘安装’的提示，点击安装会增加一个图标到用户首屏。</p></li>
<li><p>被打开时，PWA 会展示一个有吸引力的闪屏。</p></li>
<li><p>chrome 提供了可选选项，可以使 PWA 得到全屏体验。</p></li>
<li><p>必要的文件会被本地缓存，因此会比标准的web app 响应更快（也许也会比native app响应快）</p></li>
<li><p>安装及其轻量 -- 或许会有几百 kb 的缓存数据。</p></li>
<li><p>网站的数据传输必须是 https 连接。</p></li>
<li><p>PWAs 可以离线工作，并且在网络恢复时可以同步最新数据。</p></li>
</ol>
<p>现在还处在 PWA 的早期，但已经有 <a href="https://developers.google.com/web/showcase/" rel="nofollow noreferrer" target="_blank">很多成功案例</a> 。</p>
<p>PWA 技术目前被 Firefox，Chrome 和其他基于Blink内核的浏览器支持。微软正在努力在Edge浏览器上实现。Apple没有动作 although there are <a href="https://trac.webkit.org/wiki/FiveYearPlanFall2015" rel="nofollow noreferrer" target="_blank">promising comments in the WebKit five-year plan</a>。幸运的是，浏览器支持对于 PWA 似乎不太重要...</p>
<h3 id="articleHeader1">PWAs 是渐进增强的</h3>
<p>你的app仍然可以运行在不支持 PWA 技术的浏览器里。用户不能离线访问，不过其他功能都像原来一样没有影响。综合利弊得失，没有理由不把你的 app 改进为 PWA。</p>
<h3 id="articleHeader2">不只是 Apps</h3>
<p>Google 引领了 <a href="https://developers.google.com/web/progressive-web-apps/" rel="nofollow noreferrer" target="_blank">PWA 的一系列动作</a>，所以大多数教程都在说如何从零开始构建一个基于 Chrome，native-looking mobile app。然而并不是只有特殊的单页应用可以PWA化，也不需要一定遵循 material interface design guidelines。大多数网站都可以在数小时内实现 PWA 化。这包括你的 WordPress站点或者静态站点。</p>
<h2 id="articleHeader3">示例代码</h2>
<p>示例代码可以在<a href="https://github.com/sitepoint-editors/pwa-retrofit" rel="nofollow noreferrer" target="_blank">https://github.com/sitepoint-editors/pwa-retrofit</a>找到。</p>
<p>代码提供了一个简单的四个页面的网站。其中包含一些图片，一个样式表和一个main javascript 文件。这个网站可以运行在所有现代浏览器上（IE10+）。如果浏览器支持 PWA 技术，当离线时用户可以浏览他们之前看过的页面。</p>
<p>运行代码前，确保 Node.js 已经安装，然后再命令行里启动服务：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="node ./server.js [port]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">node</span> <span class="hljs-title">./server</span>.js [port]</code></pre>
<p><code>[port]</code>是可配置的，默认为 8888。打开 Chrome 或者其他基于Blink内核的浏览器，比如 Opera 或者 Vivaldi，然后输入链接 <a href="http://localhost:8888/" rel="nofollow noreferrer" target="_blank">http://localhost:8888/</a>（或者你指定的某个端口）。你也可以打开开发者工具看一下各个console信息。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008880641?w=628&amp;h=641" src="https://static.alili.tech/img/remote/1460000008880641?w=628&amp;h=641" alt="" title="" style="cursor: pointer;"></span></p>
<p>浏览主页，或者其他页面，然后用以下任一方法使页面离线：</p>
<ol>
<li><p>按下 Cmd/Ctrl + C ，停止 node 服务器，或者</p></li>
<li><p>在开发者工具的 <em>Network</em> 或者 <em>Application - Service Workers</em> 栏里点击 <em>offline</em> 选项。</p></li>
</ol>
<p>重新浏览任意之前浏览过的页面，它们仍然可以浏览到。浏览一个之前没有看过的页面，你会看到一个专门的离线页面，标识“you’re offline”，还有一个你可以浏览的页面列表：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008880642?w=492&amp;h=431" src="https://static.alili.tech/img/remote/1460000008880642?w=492&amp;h=431" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">连接手机</h3>
<p>你也可以通过 USB 连接你的安卓手机来预览示例网页。在开发者工具中打开 <em>Remote devices</em> 菜单。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008880643?w=700&amp;h=533" src="https://static.alili.tech/img/remote/1460000008880643?w=700&amp;h=533" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>在左边选择 <em>Settings</em> ，点击 <em>Add Rule</em> 输入 8888 端口。你可以在你的手机上打开Chrome，打开 <a href="http://localhost:8888/" rel="nofollow noreferrer" target="_blank">http://localhost:8888/</a>。</p>
<p>你可以点击浏览器菜单里的 “Add to Home screen”。浏览几个页面，浏览器会提醒你去安装。这两种方式都可以创建一个新的图标在你的主屏上。浏览几个页面后关掉Chrome，断开设备连接。你依然可以打开 <em>PWA Website</em> app -- 你会看到一个启动页，并且可以离线访问之前你访问过的页面。</p>
<p>将你的网站改进为一个 Progressive Web App 总共有三个必要步骤：</p>
<h1 id="articleHeader5">第一步：开启 HTTPS</h1>
<p>由于一些显而易见的原因，PWAs 需要 HTTPS 连接。</p>
<p>HTTPS 在示例代码中并不是必须的，因为 Chrome 允许使用 localhost 或者任何 127.x.x.x 的地址来测试。你也可以在 HTTP 连接下测试你的 PWA，你需要使用 Chrome ，并且输入以下命令行参数：</p>
<ul>
<li><p><code>--user-data-dir</code></p></li>
<li><p><code>--unsafety-treat-insecure-origin-as-secure</code></p></li>
</ul>
<h1 id="articleHeader6">第二步：创建一个 Web App Manifest</h1>
<p>manifest 文件提供了一些我们网站的信息，例如 name，description 和需要在主屏使用的图标的图片，启动屏的图片等。</p>
<p>manifest文件是一个 JSON 格式的文件，位于你项目的根目录。它必须用<code>Content-Type: application/manifest+json</code> 或者 <code>Content-Type: application/json </code>这样的 HTTP 头来请求。这个文件可以被命名为任何名字，在示例代码中他被命名为 <code>/manifest.json</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;              : &quot;PWA Website&quot;,
  &quot;short_name&quot;        : &quot;PWA&quot;,
  &quot;description&quot;       : &quot;An example PWA website&quot;,
  &quot;start_url&quot;         : &quot;/&quot;,
  &quot;display&quot;           : &quot;standalone&quot;,
  &quot;orientation&quot;       : &quot;any&quot;,
  &quot;background_color&quot;  : &quot;#ACE&quot;,
  &quot;theme_color&quot;       : &quot;#ACE&quot;,
  &quot;icons&quot;: [
    {
      &quot;src&quot;           : &quot;/images/logo/logo072.png&quot;,
      &quot;sizes&quot;         : &quot;72x72&quot;,
      &quot;type&quot;          : &quot;image/png&quot;
    },
    {
      &quot;src&quot;           : &quot;/images/logo/logo152.png&quot;,
      &quot;sizes&quot;         : &quot;152x152&quot;,
      &quot;type&quot;          : &quot;image/png&quot;
    },
    {
      &quot;src&quot;           : &quot;/images/logo/logo192.png&quot;,
      &quot;sizes&quot;         : &quot;192x192&quot;,
      &quot;type&quot;          : &quot;image/png&quot;
    },
    {
      &quot;src&quot;           : &quot;/images/logo/logo256.png&quot;,
      &quot;sizes&quot;         : &quot;256x256&quot;,
      &quot;type&quot;          : &quot;image/png&quot;
    },
    {
      &quot;src&quot;           : &quot;/images/logo/logo512.png&quot;,
      &quot;sizes&quot;         : &quot;512x512&quot;,
      &quot;type&quot;          : &quot;image/png&quot;
    }
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-string">"name"</span>              : <span class="hljs-string">"PWA Website"</span>,
  <span class="hljs-string">"short_name"</span>        : <span class="hljs-string">"PWA"</span>,
  <span class="hljs-string">"description"</span>       : <span class="hljs-string">"An example PWA website"</span>,
  <span class="hljs-string">"start_url"</span>         : <span class="hljs-string">"/"</span>,
  <span class="hljs-string">"display"</span>           : <span class="hljs-string">"standalone"</span>,
  <span class="hljs-string">"orientation"</span>       : <span class="hljs-string">"any"</span>,
  <span class="hljs-string">"background_color"</span>  : <span class="hljs-string">"#ACE"</span>,
  <span class="hljs-string">"theme_color"</span>       : <span class="hljs-string">"#ACE"</span>,
  <span class="hljs-string">"icons"</span>: [
    {
      <span class="hljs-string">"src"</span>           : <span class="hljs-string">"/images/logo/logo072.png"</span>,
      <span class="hljs-string">"sizes"</span>         : <span class="hljs-string">"72x72"</span>,
      <span class="hljs-string">"type"</span>          : <span class="hljs-string">"image/png"</span>
    },
    {
      <span class="hljs-string">"src"</span>           : <span class="hljs-string">"/images/logo/logo152.png"</span>,
      <span class="hljs-string">"sizes"</span>         : <span class="hljs-string">"152x152"</span>,
      <span class="hljs-string">"type"</span>          : <span class="hljs-string">"image/png"</span>
    },
    {
      <span class="hljs-string">"src"</span>           : <span class="hljs-string">"/images/logo/logo192.png"</span>,
      <span class="hljs-string">"sizes"</span>         : <span class="hljs-string">"192x192"</span>,
      <span class="hljs-string">"type"</span>          : <span class="hljs-string">"image/png"</span>
    },
    {
      <span class="hljs-string">"src"</span>           : <span class="hljs-string">"/images/logo/logo256.png"</span>,
      <span class="hljs-string">"sizes"</span>         : <span class="hljs-string">"256x256"</span>,
      <span class="hljs-string">"type"</span>          : <span class="hljs-string">"image/png"</span>
    },
    {
      <span class="hljs-string">"src"</span>           : <span class="hljs-string">"/images/logo/logo512.png"</span>,
      <span class="hljs-string">"sizes"</span>         : <span class="hljs-string">"512x512"</span>,
      <span class="hljs-string">"type"</span>          : <span class="hljs-string">"image/png"</span>
    }
  ]
}</code></pre>
<p>在页面的<code>&lt;head&gt;</code>中引入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<link rel=&quot;manifest&quot; href=&quot;/manifest.json&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html" style="word-break: break-word; white-space: initial;"><span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"manifest"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/manifest.json"</span>&gt;</span></code></pre>
<p>manifest 中主要属性有：</p>
<ul>
<li><p><em>name</em> —— 网页显示给用户的完整名称</p></li>
<li><p><em>short_name</em> —— 当空间不足以显示全名时的网站缩写名称</p></li>
<li><p><em>description</em> —— 关于网站的详细描述</p></li>
<li><p><em>start_url</em> —— 网页的初始 相对 URL（比如 <code>/</code>）</p></li>
<li><p><em>scope</em> —— 导航范围。比如，<code>/app/</code>的scope就限制 app 在这个文件夹里。</p></li>
<li><p><em>background-color</em> —— 启动屏和浏览器的背景颜色</p></li>
<li><p><em>theme_color</em> —— 网站的主题颜色，一般都与背景颜色相同，它可以影响网站的显示</p></li>
<li><p><em>orientation</em> —— 首选的显示方向：<code>any</code>, <code>natural</code>, <code>landscape</code>, <code>landscape-primary</code>, <code>landscape-secondary</code>, <code>portrait</code>, <code>portrait-primary</code>, 和 <code>portrait-secondary</code>。</p></li>
<li><p><em>display</em> —— 首选的显示方式：<code>fullscreen</code>, <code>standalone</code>(看起来像是native app)，<code>minimal-ui</code>(有简化的浏览器控制选项) 和 <code>browser</code>(常规的浏览器 tab)</p></li>
<li><p><em>icons</em> —— 定义了 <code>src</code> URL, <code>sizes</code>和<code>type</code>的图片对象数组。</p></li>
</ul>
<p>MDN提供了完整的manifest属性列表:<a href="https://developer.mozilla.org/en-US/docs/Web/Manifest" rel="nofollow noreferrer" target="_blank">Web App Manifest properties</a></p>
<p>在开发者工具中的 <em>Application</em> tab 左边有 <em>Manifest</em> 选项，你可以验证你的 manifest JSON 文件，并提供了 “Add to homescreen”。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008880644?w=700&amp;h=533" src="https://static.alili.tech/img/remote/1460000008880644?w=700&amp;h=533" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader7">第三步：创建一个 Service Worker</h1>
<p>Service Worker 是拦截和响应你的网络请求的编程接口。这是一个位于你根目录的一个单独的 javascript 文件。</p>
<p>你的 js 文件（在示例代码中是 <code>/js/main.js</code>）可以检查是否支持 Service Worker，并且注册：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if ('serviceWorker' in navigator) {

  // register service worker
  navigator.serviceWorker.register('/service-worker.js');

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (<span class="hljs-string">'serviceWorker'</span> <span class="hljs-keyword">in</span> navigator) {

  <span class="hljs-comment">// register service worker</span>
  navigator.serviceWorker.register(<span class="hljs-string">'/service-worker.js'</span>);

}</code></pre>
<p>如果你不需要离线功能，可以简单的创建一个空的 <code>/service-worker.js</code>文件 —— 用户会被提示安装你的 app。</p>
<p>Service Worker 很复杂，你可以修改示例代码来达到自己的目的。这是一个标准的 web worker，浏览器用一个单独的线程来下载和执行它。它没有调用 DOM 和其他页面 api 的能力，但他可以拦截网络请求，包括页面切换，静态资源下载，ajax请求所引起的网络请求。</p>
<p>这就是需要 HTTPS 的最主要的原因。想象一下第三方代码可以拦截来自其他网站的 service worker， 将是一个灾难。</p>
<p>service worker 主要有三个事件： <strong>install</strong>，<strong>activate</strong> 和 <strong>fetch</strong>。</p>
<h2 id="articleHeader8">Install 事件</h2>
<p>这个事件在app被安装时触发。它经常用来缓存必要的文件。缓存通过 <a href="https://developer.mozilla.org/en-US/docs/Web/API/Cache" rel="nofollow noreferrer" target="_blank">Cache API</a>来实现。</p>
<p>首先，我们来构造几个变量：</p>
<ol>
<li><p>缓存名称（<code>CACHE</code>）和版本号（<code>version</code>）。你的应用可以有多个缓存但是只能引用一个。我们设置了版本号，这样当我们有重大更新时，我们可以更新缓存，而忽略旧的缓存。</p></li>
<li><p>一个离线页面的URL（<code>offlineURL</code>）。当离线时用户试图访问之前未缓存的页面时，这个页面会呈现给用户。</p></li>
<li><p>一个拥有离线功能的页面必要文件的数组（<code>installFilesEssential</code>）。这个数组应该包含静态资源，比如 CSS 和 JavaScript 文件，但我也把主页面（<code>/</code>）和图标文件写进去了。如果主页面可以多个URL访问，你应该把他们都写进去，比如<code>/</code>和<code>/index.html</code>。注意，<code>offlineURL</code>也要被写入这个数组。</p></li>
<li><p>可选的，描述文件数组（<code>installFilesDesirable</code>）。这些文件都很会被下载，但如果下载失败不会中止安装。</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// configuration
const
  version = '1.0.0',
  CACHE = version + '::PWAsite',
  offlineURL = '/offline/',
  installFilesEssential = [
    '/',
    '/manifest.json',
    '/css/styles.css',
    '/js/main.js',
    '/js/offlinepage.js',
    '/images/logo/logo152.png'
  ].concat(offlineURL),
  installFilesDesirable = [
    '/favicon.ico',
    '/images/logo/logo016.png',
    '/images/hero/power-pv.jpg',
    '/images/hero/power-lo.jpg',
    '/images/hero/power-hi.jpg'
  ];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="JavaScript"><span class="hljs-comment">// configuration</span>
<span class="hljs-keyword">const</span>
  version = <span class="hljs-string">'1.0.0'</span>,
  CACHE = version + <span class="hljs-string">'::PWAsite'</span>,
  offlineURL = <span class="hljs-string">'/offline/'</span>,
  installFilesEssential = [
    <span class="hljs-string">'/'</span>,
    <span class="hljs-string">'/manifest.json'</span>,
    <span class="hljs-string">'/css/styles.css'</span>,
    <span class="hljs-string">'/js/main.js'</span>,
    <span class="hljs-string">'/js/offlinepage.js'</span>,
    <span class="hljs-string">'/images/logo/logo152.png'</span>
  ].concat(offlineURL),
  installFilesDesirable = [
    <span class="hljs-string">'/favicon.ico'</span>,
    <span class="hljs-string">'/images/logo/logo016.png'</span>,
    <span class="hljs-string">'/images/hero/power-pv.jpg'</span>,
    <span class="hljs-string">'/images/hero/power-lo.jpg'</span>,
    <span class="hljs-string">'/images/hero/power-hi.jpg'</span>
  ];</code></pre>
<p><code>installStaticFiles()</code>方法添加文件到缓存，这个方法用到了基于 promise的 <a href="https://developer.mozilla.org/en-US/docs/Web/API/Cache" rel="nofollow noreferrer" target="_blank">Cache API</a>。当必要的文件都被缓存后才会生成返回值。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// install static assets
function installStaticFiles() {

  return caches.open(CACHE)
    .then(cache => {

      // cache desirable files
      cache.addAll(installFilesDesirable);

      // cache essential files
      return cache.addAll(installFilesEssential);

    });

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// install static assets</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">installStaticFiles</span>(<span class="hljs-params"></span>) </span>{

  <span class="hljs-keyword">return</span> caches.open(CACHE)
    .then(<span class="hljs-function"><span class="hljs-params">cache</span> =&gt;</span> {

      <span class="hljs-comment">// cache desirable files</span>
      cache.addAll(installFilesDesirable);

      <span class="hljs-comment">// cache essential files</span>
      <span class="hljs-keyword">return</span> cache.addAll(installFilesEssential);

    });

}</code></pre>
<p>最后，我们添加<code>install</code>的事件监听函数。 <code>waitUntil</code>方法确保所有代码执行完毕后，service worker 才会执行 install。执行 <code>installStaticFiles()</code>方法，然后执行 <code>self.skipWaiting()</code>方法使service worker进入 active状态。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// application installation
self.addEventListener('install', event => {

  console.log('service worker: install');

  // cache core files
  event.waitUntil(
    installStaticFiles()
    .then(() => self.skipWaiting())
  );

});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// application installation</span>
self.addEventListener(<span class="hljs-string">'install'</span>, event =&gt; {

  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'service worker: install'</span>);

  <span class="hljs-comment">// cache core files</span>
  event.waitUntil(
    installStaticFiles()
    .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> self.skipWaiting())
  );

});</code></pre>
<h2 id="articleHeader9">Activate 事件</h2>
<p>当 install完成后， service worker 进入active状态，这个事件立刻执行。你可能不需要实现这个事件监听，但是示例代码在这里删除老旧的无用缓存文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// clear old caches
function clearOldCaches() {

  return caches.keys()
    .then(keylist => {

      return Promise.all(
        keylist
          .filter(key => key !== CACHE)
          .map(key => caches.delete(key))
      );

    });

}

// application activated
self.addEventListener('activate', event => {

  console.log('service worker: activate');

    // delete old caches
  event.waitUntil(
    clearOldCaches()
    .then(() => self.clients.claim())
    );

});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// clear old caches</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">clearOldCaches</span>(<span class="hljs-params"></span>) </span>{

  <span class="hljs-keyword">return</span> caches.keys()
    .then(<span class="hljs-function"><span class="hljs-params">keylist</span> =&gt;</span> {

      <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.all(
        keylist
          .filter(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> key !== CACHE)
          .map(<span class="hljs-function"><span class="hljs-params">key</span> =&gt;</span> caches.delete(key))
      );

    });

}

<span class="hljs-comment">// application activated</span>
self.addEventListener(<span class="hljs-string">'activate'</span>, event =&gt; {

  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'service worker: activate'</span>);

    <span class="hljs-comment">// delete old caches</span>
  event.waitUntil(
    clearOldCaches()
    .then(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> self.clients.claim())
    );

});</code></pre>
<p>注意，最后的<code>self.clients.claim()</code>方法设置本身为active的service worker。</p>
<h2 id="articleHeader10">Fetch 事件</h2>
<p>当有网络请求时这个事件被触发。它调用<code>respondWith()</code>方法来劫持 GET 请求并返回：</p>
<ol>
<li><p>缓存中的一个静态资源。</p></li>
<li><p>如果 #1 失败了，就用 <a href="https://developer.mozilla.org/en/docs/Web/API/Fetch_API" rel="nofollow noreferrer" target="_blank">Fetch API</a>（这与 service worker 的fetch 事件没关系）去网络请求这个资源。然后将这个资源加入缓存。</p></li>
<li><p>如果 #1 和 #2 都失败了，那就返回一个适当的值。</p></li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// application fetch network data
self.addEventListener('fetch', event => {

  // abandon non-GET requests
  if (event.request.method !== 'GET') return;

  let url = event.request.url;

  event.respondWith(

    caches.open(CACHE)
      .then(cache => {

        return cache.match(event.request)
          .then(response => {

            if (response) {
              // return cached file
              console.log('cache fetch: ' + url);
              return response;
            }

            // make network request
            return fetch(event.request)
              .then(newreq => {

                console.log('network fetch: ' + url);
                if (newreq.ok) cache.put(event.request, newreq.clone());
                return newreq;

              })
              // app is offline
              .catch(() => offlineAsset(url));

          });

      })

  );

});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// application fetch network data</span>
self.addEventListener(<span class="hljs-string">'fetch'</span>, event =&gt; {

  <span class="hljs-comment">// abandon non-GET requests</span>
  <span class="hljs-keyword">if</span> (event.request.method !== <span class="hljs-string">'GET'</span>) <span class="hljs-keyword">return</span>;

  <span class="hljs-keyword">let</span> url = event.request.url;

  event.respondWith(

    caches.open(CACHE)
      .then(<span class="hljs-function"><span class="hljs-params">cache</span> =&gt;</span> {

        <span class="hljs-keyword">return</span> cache.match(event.request)
          .then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {

            <span class="hljs-keyword">if</span> (response) {
              <span class="hljs-comment">// return cached file</span>
              <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'cache fetch: '</span> + url);
              <span class="hljs-keyword">return</span> response;
            }

            <span class="hljs-comment">// make network request</span>
            <span class="hljs-keyword">return</span> fetch(event.request)
              .then(<span class="hljs-function"><span class="hljs-params">newreq</span> =&gt;</span> {

                <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'network fetch: '</span> + url);
                <span class="hljs-keyword">if</span> (newreq.ok) cache.put(event.request, newreq.clone());
                <span class="hljs-keyword">return</span> newreq;

              })
              <span class="hljs-comment">// app is offline</span>
              .catch(<span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> offlineAsset(url));

          });

      })

  );

});</code></pre>
<p>最后这个<code>offlineAsset(url)</code>方法通过几个辅助函数返回一个适当的值：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// is image URL?
let iExt = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp'].map(f => '.' + f);
function isImage(url) {

  return iExt.reduce((ret, ext) => ret || url.endsWith(ext), false);

}


// return offline asset
function offlineAsset(url) {

  if (isImage(url)) {

    // return image
    return new Response(
      '<svg role=&quot;img&quot; viewBox=&quot;0 0 400 300&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><title>offline</title><path d=&quot;M0 0h400v300H0z&quot; fill=&quot;#eee&quot; /><text x=&quot;200&quot; y=&quot;150&quot; text-anchor=&quot;middle&quot; dominant-baseline=&quot;middle&quot; font-family=&quot;sans-serif&quot; font-size=&quot;50&quot; fill=&quot;#ccc&quot;>offline</text></svg>',
      { headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'no-store'
      "}}"
    );

  }
  else {

    // return page
    return caches.match(offlineURL);

  }

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// is image URL?</span>
<span class="hljs-keyword">let</span> iExt = [<span class="hljs-string">'png'</span>, <span class="hljs-string">'jpg'</span>, <span class="hljs-string">'jpeg'</span>, <span class="hljs-string">'gif'</span>, <span class="hljs-string">'webp'</span>, <span class="hljs-string">'bmp'</span>].map(<span class="hljs-function"><span class="hljs-params">f</span> =&gt;</span> <span class="hljs-string">'.'</span> + f);
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">isImage</span>(<span class="hljs-params">url</span>) </span>{

  <span class="hljs-keyword">return</span> iExt.reduce(<span class="hljs-function">(<span class="hljs-params">ret, ext</span>) =&gt;</span> ret || url.endsWith(ext), <span class="hljs-literal">false</span>);

}


<span class="hljs-comment">// return offline asset</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">offlineAsset</span>(<span class="hljs-params">url</span>) </span>{

  <span class="hljs-keyword">if</span> (isImage(url)) {

    <span class="hljs-comment">// return image</span>
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> Response(
      <span class="hljs-string">'&lt;svg role="img" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg"&gt;&lt;title&gt;offline&lt;/title&gt;&lt;path d="M0 0h400v300H0z" fill="#eee" /&gt;&lt;text x="200" y="150" text-anchor="middle" dominant-baseline="middle" font-family="sans-serif" font-size="50" fill="#ccc"&gt;offline&lt;/text&gt;&lt;/svg&gt;'</span>,
      { <span class="hljs-attr">headers</span>: {
        <span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'image/svg+xml'</span>,
        <span class="hljs-string">'Cache-Control'</span>: <span class="hljs-string">'no-store'</span>
      "}}"
    );

  }
  <span class="hljs-keyword">else</span> {

    <span class="hljs-comment">// return page</span>
    <span class="hljs-keyword">return</span> caches.match(offlineURL);

  }

}</code></pre>
<p><code>offlineAsset()</code>方法检查是否是一个图片请求，如果是，那么返回一个带有 “offline” 字样的 SVG。如果不是，返回 <code>offlineURL</code> 页面。</p>
<p>开发者工具提供了查看 Service Worker 相关信息的选项：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008880645?w=700&amp;h=533" src="https://static.alili.tech/img/remote/1460000008880645?w=700&amp;h=533" alt="" title="" style="cursor: pointer;"></span></p>
<p>在开发者工具的 <em>Cache Storage</em> 选项列出了所有当前域内的缓存和所包含的静态文件。当缓存更新的时候，你可以点击左下角的刷新按钮来更新缓存：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008880646?w=700&amp;h=533" src="https://static.alili.tech/img/remote/1460000008880646?w=700&amp;h=533" alt="" title="" style="cursor: pointer;"></span></p>
<p>不出意料， <em>Clear storage</em> 选项可以删除你的 service worker 和缓存：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008880647?w=700&amp;h=533" src="https://static.alili.tech/img/remote/1460000008880647?w=700&amp;h=533" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader11">再来一步 - 第四步：创建一个可用的离线页面</h1>
<p>离线页面可以是一个静态页面，来说明当前用户请求不可用。然而，我们也可以在这个页面上列出可以访问的页面链接。</p>
<p>在<code>main.js</code>中我们可以使用 Cache API 。然而API 使用promises，在不支持的浏览器中会引起所有javascript运行阻塞。为了避免这种情况，我们在加载另一个 <code>/js/offlinepage.js</code> 文件之前必须检查离线文件列表和是否支持 Cache API 。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// load script to populate offline page list
if (document.getElementById('cachedpagelist') &amp;&amp; 'caches' in window) {
  var scr = document.createElement('script');
  scr.src = '/js/offlinepage.js';
  scr.async = 1;
  document.head.appendChild(scr);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// load script to populate offline page list</span>
<span class="hljs-keyword">if</span> (<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'cachedpagelist'</span>) &amp;&amp; <span class="hljs-string">'caches'</span> <span class="hljs-keyword">in</span> <span class="hljs-built_in">window</span>) {
  <span class="hljs-keyword">var</span> scr = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'script'</span>);
  scr.src = <span class="hljs-string">'/js/offlinepage.js'</span>;
  scr.async = <span class="hljs-number">1</span>;
  <span class="hljs-built_in">document</span>.head.appendChild(scr);
}</code></pre>
<p><code>/js/offlinepage.js</code>  locates the most recent cache by version name, 取到所有 URL的key的列表，移除所有无用 URL，排序所有的列表并且把他们加到 ID 为<code>cachedpagelist</code>的 DOM 节点中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// cache name
const
  CACHE = '::PWAsite',
  offlineURL = '/offline/',
  list = document.getElementById('cachedpagelist');

// fetch all caches
window.caches.keys()
  .then(cacheList => {

    // find caches by and order by most recent
    cacheList = cacheList
      .filter(cName => cName.includes(CACHE))
      .sort((a, b) => a - b);

    // open first cache
    caches.open(cacheList[0])
      .then(cache => {

        // fetch cached pages
        cache.keys()
          .then(reqList => {

            let frag = document.createDocumentFragment();

            reqList
              .map(req => req.url)
              .filter(req => (req.endsWith('/') || req.endsWith('.html')) &amp;&amp; !req.endsWith(offlineURL))
              .sort()
              .forEach(req => {
                let
                  li = document.createElement('li'),
                  a = li.appendChild(document.createElement('a'));
                  a.setAttribute('href', req);
                  a.textContent = a.pathname;
                  frag.appendChild(li);
              });

            if (list) list.appendChild(frag);

          });

      })

  });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// cache name</span>
<span class="hljs-keyword">const</span>
  CACHE = <span class="hljs-string">'::PWAsite'</span>,
  offlineURL = <span class="hljs-string">'/offline/'</span>,
  list = <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'cachedpagelist'</span>);

<span class="hljs-comment">// fetch all caches</span>
<span class="hljs-built_in">window</span>.caches.keys()
  .then(<span class="hljs-function"><span class="hljs-params">cacheList</span> =&gt;</span> {

    <span class="hljs-comment">// find caches by and order by most recent</span>
    cacheList = cacheList
      .filter(<span class="hljs-function"><span class="hljs-params">cName</span> =&gt;</span> cName.includes(CACHE))
      .sort(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a - b);

    <span class="hljs-comment">// open first cache</span>
    caches.open(cacheList[<span class="hljs-number">0</span>])
      .then(<span class="hljs-function"><span class="hljs-params">cache</span> =&gt;</span> {

        <span class="hljs-comment">// fetch cached pages</span>
        cache.keys()
          .then(<span class="hljs-function"><span class="hljs-params">reqList</span> =&gt;</span> {

            <span class="hljs-keyword">let</span> frag = <span class="hljs-built_in">document</span>.createDocumentFragment();

            reqList
              .map(<span class="hljs-function"><span class="hljs-params">req</span> =&gt;</span> req.url)
              .filter(<span class="hljs-function"><span class="hljs-params">req</span> =&gt;</span> (req.endsWith(<span class="hljs-string">'/'</span>) || req.endsWith(<span class="hljs-string">'.html'</span>)) &amp;&amp; !req.endsWith(offlineURL))
              .sort()
              .forEach(<span class="hljs-function"><span class="hljs-params">req</span> =&gt;</span> {
                <span class="hljs-keyword">let</span>
                  li = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'li'</span>),
                  a = li.appendChild(<span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'a'</span>));
                  a.setAttribute(<span class="hljs-string">'href'</span>, req);
                  a.textContent = a.pathname;
                  frag.appendChild(li);
              });

            <span class="hljs-keyword">if</span> (list) list.appendChild(frag);

          });

      })

  });</code></pre>
<h1 id="articleHeader12">开发工具</h1>
<p>如果你觉得 javascript 调试困难，那么 service worker 也不会很好。Chrome的开发者工具的 <em>Application</em> 提供了一系列调试工具。</p>
<p>你应该打开 <em>隐身窗口</em> 来测试你的 app，这样在你关闭这个窗口之后缓存文件就不会保存下来。</p>
<p>最后，<a href="https://chrome.google.com/webstore/detail/lighthouse/blipmdconlkpinefehnmjammfjpmpbjk" rel="nofollow noreferrer" target="_blank">Lighthouse extension for Chrome</a> 提供了很多改进 PWA 的有用信息。</p>
<h1 id="articleHeader13">PWA 陷阱</h1>
<p>有几点需要注意：</p>
<h2 id="articleHeader14">URL 隐藏</h2>
<p>我们的示例代码隐藏了 URL 栏，我不推荐这种做法，除非你有一个单 url 应用，比如一个游戏。对于多数网站，manifest 选项 <code>display: minimal-ui</code> 或者 <code>display: browser</code>是最好的选择。</p>
<h2 id="articleHeader15">缓存太多</h2>
<p>你可以缓存你网站的所有页面和所有静态文件。这对于一个小网站是可行的，但这对于上千个页面的大型网站实际吗？没有人会对你网站的所有内容都感兴趣，而设备的内存容量将是一个限制。即使你像示例代码一样只缓存访问过的页面和文件，缓存大小也会增长的很快。</p>
<p>也许你需要注意：</p>
<ul>
<li><p>只缓存重要的页面，类似主页，和最近的文章。</p></li>
<li><p>不要缓存图片，视频和其他大型文件</p></li>
<li><p>经常删除旧的缓存文件</p></li>
<li><p>提供一个缓存按钮给用户，让用户决定是否缓存</p></li>
</ul>
<h2 id="articleHeader16">缓存刷新</h2>
<p>在示例代码中，用户在请求网络前先检查该文件是否缓存。如果缓存，就使用缓存文件。这在离线情况下很棒，但也意味着在联网情况下，用户得到的可能不是最新数据。</p>
<p>静态文件，类似于图片和视频等，不会经常改变的资源，做长时间缓存没有很大的问题。你可以在HTTP 头里设置 <code>Cache-Control</code> 来缓存文件使其缓存时间为一年（31,536,000 seconds）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Cache-Control: max-age=31536000" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">Cache</span><span class="hljs-params">-Control</span>: <span class="hljs-keyword">max</span><span class="hljs-params">-age</span>=<span class="hljs-number">31536000</span></code></pre>
<p>页面，CSS和 script 文件会经常变化，所以你应该改设置一个很短的缓存时间比如 24 小时，并在联网时与服务端文件进行验证：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Cache-Control: must-revalidate, max-age=86400" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">Cache</span><span class="hljs-params">-Control</span>: must<span class="hljs-params">-revalidate</span>, <span class="hljs-keyword">max</span><span class="hljs-params">-age</span>=<span class="hljs-number">86400</span></code></pre>
<p>译自 <a href="https://www.sitepoint.com/retrofit-your-website-as-a-progressive-web-app/" rel="nofollow noreferrer" target="_blank">Retrofit Your Website as a Progressive Web App</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
改造你的网站，变身 PWA

## 原文链接
[https://segmentfault.com/a/1190000008880637](https://segmentfault.com/a/1190000008880637)

