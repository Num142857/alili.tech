---
title: '构建离线web应用（一）' 
date: 2018-12-26 2:30:14
hidden: true
slug: nh8rh70wc1
categories: [reprint]
---

{{< raw >}}

                    
<p>我喜欢移动app，而且也是那些坚持使用Web技术构建移动应用程序的人之一。</p>
<p>经过技术的不断迭代（可能还有一些其它的东西），移动体验设计愈来愈平易近人，给予用户更好的体验。</p>
<p>而今天，我们就要介绍一个新技术--渐进式 web 应用程序。在理解这个概念并自己尝试了一下之后，我觉得没有必要再做 hybrid 应用了。</p>
<p>我们准备做这样的一个demo：<br><span class="img-wrap"><img data-src="/img/bVYcIn?w=3468&amp;h=1886" src="https://static.alili.tech/img/bVYcIn?w=3468&amp;h=1886" alt="demo预览" title="demo预览" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">Progressive Web Apps</h2>
<p>渐进式 Web 应用是典型的旨在提高用户离线体验的 Web 应用。它解决了这样的问题：怎么才能不显示类似下面的离线错误？<br><span class="img-wrap"><img data-src="/img/bVYcIr?w=2314&amp;h=1526" src="https://static.alili.tech/img/bVYcIr?w=2314&amp;h=1526" alt="离线error" title="离线error" style="cursor: pointer; display: inline;"></span></p>
<p>事实上，PWA 不仅解决了离线错误，还在恢复连接的时候将用户与内容连接起来。移动设备是渐进式 web 应用的主要使用场景。让我来告诉你为什么？</p>
<h3 id="articleHeader1">桌面浏览器</h3>
<ul>
<li><p>用户打开电脑（在家、学校或者办公室）</p></li>
<li><p>检查是否连上网络，没有则手动连接</p></li>
<li><p>打开 web 应用</p></li>
</ul>
<h3 id="articleHeader2">移动端浏览器</h3>
<ul>
<li><p>拿出手机</p></li>
<li><p>默认手机已经连接上网络</p></li>
<li><p>直接打开 app</p></li>
</ul>
<p>如上，用户对待两种场景的处理方式是不一样的。移动端用户不一定有很好的网络连接，有的甚至没有。在这样的场景下，开发商需要做的就是保持用户对产品的好感，在其网络恢复时与其互动。如果信号很差，开发商需要通过一些手段保持用户的耐心，不至于在请求过程中用户直接关闭 web 应用。</p>
<p>当我们开始构建 PWA 应用时，你就能理解上面的场景了。</p>
<h2 id="articleHeader3">Service Workers</h2>
<p>PWA 背后的原理是 service workers。如果想让用户在离线场景下依然保持打开 web 页面，你需要在用户打开 web 应用并且有网络连接时做一些“后台任务”，这个“后台任务”会搜集 web 页面最近一次运行需要的一些资源，以备离线时使用。</p>
<p>这就好像每年秋收储备粮食，以备冬天不时之需一样，不断循环。</p>
<p>PWA 中的 service worker，可以类比成春天的播种的农民。下面是 MDN 对 service workers 的描述：</p>
<blockquote><p>Service worker 是一个注册在指定源和路径下的事件驱动 worker。它采用 JavaScript 控制关联的页面或者网站，拦截并修改访问和资源请求，细粒度地缓存资源。你可以完全控制应用在特定情形（最常见的情形是网络不可用）下的表现。</p></blockquote>
<p>简而言之，service worker 就是一些在后台运行逻辑的 worker。它没有权限操作 DOM，但是可以调用其它的 API （例如 IndexDB 以及 Fetch API）。</p>
<p>开始之前请牢记：</p>
<ul>
<li><p>service workers 只能在 HTTPS 协议下生效（或者 Localhost）。</p></li>
<li><p>service workers 被设计成异步的，不能使用 XHR （但你可以使用 Fetch）或者 LocalStorage。</p></li>
<li><p>service workers 的作用范围是针对相对路径的。因此，<code>demo/sw.js</code> 只能相对于 <code>demo</code> 起作用，<code>demo/first/sw.js</code> 相对于 <code>first</code>。</p></li>
</ul>
<h2 id="articleHeader4">Mobile 还是 PWA</h2>
<p>如果你能利用 service workers 存储离线使用所需的文件，那你就没有必要开发移动 app 了。如果你的 web 应用对移动用户进行了优化，并且几乎不需要调用移动端的硬件功能，那么你应该尝试一下 PWA。</p>
<p>我花了一些时间看飞行模式下一些移动 app 的表现。我将它们分成三类：</p>
<h3 id="articleHeader5">离线情况下不做任何操作</h3>
<p>例子： Coinbase<br><span class="img-wrap"><img data-src="/img/bVYcIv?w=394&amp;h=700" src="https://static.alili.tech/img/bVYcIv?w=394&amp;h=700" alt="Coinbase" title="Coinbase" style="cursor: pointer;"></span></p>
<p>Coinbase 就是一直停留在 loading 的这个页面。它甚至让我怀疑这样的 app 为啥要存在，因为这个页面简直跟 web 展示一模一样。Coinbase 不是财经类 app，无需实时展示信息，因此，PWA 可能只适用应用于其 App Shell。</p>
<blockquote><p>App Shell 是指不包含动态内容的一部分应用程序。例如导航菜单、侧边栏、背景、logo 等等。</p></blockquote>
<h3 id="articleHeader6">离线情况下展示警告信息（未连接网络等等），展示 App Shell，但其它都不可用</h3>
<p>例子：Uber</p>
<p><span class="img-wrap"><img data-src="/img/bVYcIz?w=394&amp;h=700" src="https://static.alili.tech/img/bVYcIz?w=394&amp;h=700" alt="Uber" title="Uber" style="cursor: pointer;"></span></p>
<p>Uber 给用户展示了一些信息（通过 App Shell 以及地图），并且告知用户不能操作是由于他网络中断了。Uber是一个很高频的 app，这样的交互展示对于他们的应用场景很有意义。</p>
<h3 id="articleHeader7">离线情况下展示缓存的数据</h3>
<p>例子： Medium</p>
<p><span class="img-wrap"><img data-src="/img/bVYcIA?w=394&amp;h=700" src="https://static.alili.tech/img/bVYcIA?w=394&amp;h=700" alt="Medium" title="Medium" style="cursor: pointer;"></span></p>
<p>Medium在离线状态下展示缓存的数据，一些离线展示在这个分类里面的 app（例如，Instagram）还会提示用户离线了，所以，就不要对这个分类里面的 app 期望再搞了。</p>
<h2 id="articleHeader8">优化</h2>
<p>我的想法是，如果 PWA（或者 service workers）技术成熟并且被大规模应用的话，为什么不节省掉：</p>
<ol>
<li><p>前往应用商店</p></li>
<li><p>下载并不常用的 app</p></li>
</ol>
<p>呢？</p>
<p>当我们接下来谈到 Web Manifest 时，你就意识到只要给你的 web 应用新增一个桌面 icon，web 应用就可以通过点击这个 icon 实现启动了。</p>
<p>一些公司已经在 PWA 方面做的比较好了，你可以在这个网址上面找到这些公司：<a href="https://pwa.rocks/" rel="nofollow noreferrer" target="_blank">pwa.rocks</a></p>
<h2 id="articleHeader9">开发准备</h2>
<p>我们已经介绍了足够多的理论知识了。这是一个手把手的教程，来吧，让我们动起手来。首先，按照下面的结构来创建一个新的项目：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|--pwa-demo
|----css
|----fonts
|----images
|----js
|----index.html
|----service-worker.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-string">|--pwa-demo</span>
<span class="hljs-string">|----css</span>
<span class="hljs-string">|----fonts</span>
<span class="hljs-string">|----images</span>
<span class="hljs-string">|----js</span>
<span class="hljs-string">|----index.html</span>
<span class="hljs-string">|----service-worker.js</span></code></pre>
<p>下载 <a href="http://materializecss.com/" rel="nofollow noreferrer" target="_blank">Materialize</a> 这个 UI 库，用里面 <code>CSS</code>、<code>Fonts</code>、<code>js 文件</code>分别替换项目里面的文件夹。</p>
<p>打开 <code>index.html</code> 文件，引入一些资源：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!-- ./index.html -->
<!DOCTYPE html>
  <html>
    <head>
      <!--Import Google Icon Font-->
      <link href=&quot;https://fonts.googleapis.com/icon?family=Material+Icons&quot; rel=&quot;stylesheet&quot;>
      <!--Import materialize.css-->
      <link type=&quot;text/css&quot; rel=&quot;stylesheet&quot; href=&quot;css/materialize.min.css&quot; media=&quot;screen,projection&quot;/>
      <link type=&quot;text/css&quot; rel=&quot;stylesheet&quot; href=&quot;css/app.css&quot;>

      <!--Let browser know website is optimized for mobile-->
      <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;/>
    </head>

    <body>

      Body coming soon

      <!-- Scripts -->
      <script type=&quot;text/javascript&quot; src=&quot;js/jquery-2.1.1.min.js&quot;></script>
      <script type=&quot;text/javascript&quot; src=&quot;js/materialize.min.js&quot;></script>
      <script type=&quot;text/javascript&quot; src=&quot;js/app.js&quot;></script>
    </body>
  </html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="xml hljs"><code class="html"><span class="hljs-comment">&lt;!-- ./index.html --&gt;</span>
<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
      <span class="hljs-comment">&lt;!--Import Google Icon Font--&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"https://fonts.googleapis.com/icon?family=Material+Icons"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span>&gt;</span>
      <span class="hljs-comment">&lt;!--Import materialize.css--&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"css/materialize.min.css"</span> <span class="hljs-attr">media</span>=<span class="hljs-string">"screen,projection"</span>/&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/css"</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"stylesheet"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"css/app.css"</span>&gt;</span>

      <span class="hljs-comment">&lt;!--Let browser know website is optimized for mobile--&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>/&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>

    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>

      Body coming soon

      <span class="hljs-comment">&lt;!-- Scripts --&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/jquery-2.1.1.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/materialize.min.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"js/app.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>我们已经引入了下载好的文件，还需要自己在相应的目录创建一下 <code>app.css</code> 以及 <code>app.js</code> 这两个文件。</p>
<h2 id="articleHeader10">注册 Service Worker</h2>
<p>越早在浏览器注册，Service Worker 就能越早的开始工作。最佳的做法是在应用的入口。在这个项目中，我们可以在 <code>app.js</code> 注册一个新的 worker：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(function(){
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
     .register('/service-worker.js')
     .then(function() { 
        console.log('Service Worker Registered'); 
      });
  }    
})()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
  <span class="hljs-keyword">if</span> (<span class="hljs-string">'serviceWorker'</span> <span class="hljs-keyword">in</span> navigator) {
    navigator.serviceWorker
     .register(<span class="hljs-string">'/service-worker.js'</span>)
     .then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{ 
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Service Worker Registered'</span>); 
      });
  }    
})()</code></pre>
<p>在做其他操作之前，我们首先需要检测一下浏览器对于 Service Worker 的兼容性。如果支持，那我们就可以利用 <code>register</code> 这个方法来注册这个 worker，这个方法告知了 service worker 文件的路径。注册函数返回一个 promise ，你可以在这个 promise 里面判断注册是否成功。</p>
<h2 id="articleHeader11">Service Worker 周期</h2>
<p>在开始构建 PWA 之前，你需要理解 Service Worker 的生命周期：</p>
<h3 id="articleHeader12">Install</h3>
<p>这一阶段主要是让 worker 在浏览器给定的作用域挂载。由于这是生命周期的第一步，最好在这一步缓存各种资源：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./service-worker.js

var cacheName = 'PWADemo-v1';
var filesToCache = [
  '/index.html',
  '/css/app.css',
  '/js/app.js',
  /* ...and other assets (jQuery, Materialize, fonts, etc) */
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// ./service-worker.js</span>

<span class="hljs-keyword">var</span> cacheName = <span class="hljs-string">'PWADemo-v1'</span>;
<span class="hljs-keyword">var</span> filesToCache = [
  <span class="hljs-string">'/index.html'</span>,
  <span class="hljs-string">'/css/app.css'</span>,
  <span class="hljs-string">'/js/app.js'</span>,
  <span class="hljs-comment">/* ...and other assets (jQuery, Materialize, fonts, etc) */</span>
];

self.addEventListener(<span class="hljs-string">'install'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'[ServiceWorker] Install'</span>);
  e.waitUntil(
    caches.open(cacheName).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">cache</span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'[ServiceWorker] Caching app shell'</span>);
      <span class="hljs-keyword">return</span> cache.addAll(filesToCache);
    })
  );
});</code></pre>
<ul>
<li><p><code>caches.open</code> 和 <code>cache.addAll</code> 都是异步操作.service worker 在这些操作完成之前可能会中断,<code>e.waitUntil</code>用来等待 promise 的状态变成 resolved 或者 rejected。</p></li>
<li><p>当缓存开关被打开时，我们尝试利用 <code>addAll</code> 来新增缓存。</p></li>
<li><p>请记住，只要有一个文件缓存失败，service worker 就无法被正确挂载。</p></li>
</ul>
<h3 id="articleHeader13">Activate</h3>
<p>当 worker 挂载完成，其效果并不会立即展示出来，除非前一个 service worker 销毁并且该 web 应用被重新访问。假设我们挂载了另一个不同 cacheName 的 service worker:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./service-worker.js

var cacheName = 'PWADemo-v2';
var filesToCache = [
  //...
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  //...
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// ./service-worker.js</span>

<span class="hljs-keyword">var</span> cacheName = <span class="hljs-string">'PWADemo-v2'</span>;
<span class="hljs-keyword">var</span> filesToCache = [
  <span class="hljs-comment">//...</span>
];

self.addEventListener(<span class="hljs-string">'install'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'[ServiceWorker] Install'</span>);
  <span class="hljs-comment">//...</span>
});</code></pre>
<p>当这个新的 service worker 创建之后，新的缓存 <code>PWADemo-v2</code> 也被创建，这时候 <code>PWADemo-v1</code> 仍然存在。当触发 Activate 时，我们可以删除 <code>PWADemo-v1</code>，使其“让位”于 <code>PWADemo-v2</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./service-worker.js

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// ./service-worker.js</span>

self.addEventListener(<span class="hljs-string">'activate'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'[ServiceWorker] Activate'</span>);
  e.waitUntil(
    caches.keys().then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">keyList</span>) </span>{
      <span class="hljs-keyword">return</span> <span class="hljs-built_in">Promise</span>.all(keyList.map(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">key</span>) </span>{
        <span class="hljs-keyword">if</span> (key !== cacheName) {
          <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'[ServiceWorker] Removing old cache'</span>, key);
          <span class="hljs-keyword">return</span> caches.delete(key);
        }
      }));
    })
  );
});</code></pre>
<p>我们检查所有的 cache 名称，如果发现不是正在使用的 cache，那么将其直接删除。</p>
<h3 id="articleHeader14">Fetch</h3>
<p>Fetch 不是一个必需的生命周期，但它提供了拦截请求资源的方法。当发送请求时，首先会触发这样的事件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ./service-worker.js

self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// ./service-worker.js</span>

self.addEventListener(<span class="hljs-string">'fetch'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">e</span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'[ServiceWorker] Fetch'</span>, e.request.url);
  e.respondWith(
    caches.match(e.request).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">response</span>) </span>{
      <span class="hljs-keyword">return</span> response || fetch(e.request);
    })
  );
});</code></pre>
<p>如果资源已经被缓存了，我们返回浏览器缓存的版本。如果没有，那么我们调用 fetch api 去发送 HTTP 请求该资源。</p>
<h2 id="articleHeader15">Debuggering Service Workers</h2>
<p>由于 service workers 的工作方式，特别是进行缓存时，不是很容易进行 debugger 调试。幸运的是，chrome 的 dev tools 提供了助力。跟着下面的步骤，调试我们刚注册的 service worker：</p>
<ul>
<li><p>打开 chrome dev tools</p></li>
<li><p>点击 Application 这一选项，打开 service worker 分区：</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVYcIN?w=1316&amp;h=780" src="https://static.alili.tech/img/bVYcIN?w=1316&amp;h=780" alt="Chrome dev tools" title="Chrome dev tools" style="cursor: pointer; display: inline;"></span></p>
<ul><li><p>你可以查看到 status 是绿色的，这就表明你的 service worker 成功了：</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVYcIY?w=746&amp;h=728" src="https://static.alili.tech/img/bVYcIY?w=746&amp;h=728" alt="status" title="status" style="cursor: pointer; display: inline;"></span></p>
<ul><li><p>你可以打开 "Update on reload" 去强制更新 service worker，不用关闭所有已存在的 session：</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVYcIZ?w=746&amp;h=728" src="https://static.alili.tech/img/bVYcIZ?w=746&amp;h=728" alt="update on reload" title="update on reload" style="cursor: pointer;"></span></p>
<ul><li><p>右击 "Cache Storage"，然后点击刷新去查看缓存。根据名称点击你所设置的cache，然后你就会看到缓存里面的各个项：</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVYcI0?w=740&amp;h=612" src="https://static.alili.tech/img/bVYcI0?w=740&amp;h=612" alt="Cache storage" title="Cache storage" style="cursor: pointer;"></span></p>
<h2 id="articleHeader16">接下来</h2>
<p>你已经了解了必备的知识点，PWA 的概念对你来说已经不陌生了。接下来，我们将要讨论 PWA 的缓存策略。我们将了解如何使用 IndexDB 来保存数据而不是 localStorage。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
构建离线web应用（一）

## 原文链接
[https://segmentfault.com/a/1190000011926250](https://segmentfault.com/a/1190000011926250)

