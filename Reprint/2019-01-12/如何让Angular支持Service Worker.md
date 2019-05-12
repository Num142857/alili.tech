---
title: '如何让Angular支持Service Worker' 
date: 2019-01-12 2:30:24
hidden: true
slug: zhuh59xrqfl
categories: [reprint]
---

{{< raw >}}

                    
<p>前两天 <a href="https://angular.io/" rel="nofollow noreferrer" target="_blank">angular.io</a> 发布新版本，一开始以为只是界面样式做了一些变动，后来为了查资料怎么发现打开的速度简直牛B了（要知道在天朝打开angular.io多么费劲啊）。然后我到twitter中了解angular进展，竟然这一次官网新版本是为了试验 Service Worker。</p>
<h1 id="articleHeader0">什么是Service Worker</h1>
<p>一直对 Service Worker 很关注，离线体验、定期同步、推送通知等这些光环多么久让向往呀。</p>
<blockquote><p>Service Worker 可以使你的应用先访问本地缓存资源，所以在离线状态时，在没有通过网络接收到更多的数据前，仍可以提供基本的功能（一般称之为 Offline First）。这是原生APP 本来就支持的功能，这也是相比于 web app，原生 app 更受青睐的主要原因。</p></blockquote>
<p>有关于更多关于Service Worker的定义请参与<a href="https://developer.mozilla.org/zh-CN/docs/Web/API/Service_Worker_API/Using_Service_Workers" rel="nofollow noreferrer" target="_blank">MDN</a>。</p>
<h1 id="articleHeader1">Angular Service Worker</h1>
<p>应该说Angular一开始就对Service Worker的支持，只不过受限于浏览器一些硬性，所以一直好像都没有什么人谈及。</p>
<p>直到这一次……</p>
<p>而本文会根据一个简单的示例，让我们一起了解Service Worker在Angular的运用。</p>
<h2 id="articleHeader2">1、前提条件</h2>
<p>Service Worker 需要一些前提条件，大概是：</p>
<ul>
<li>浏览器是否支持Service Worker。</li>
<li>Service Worker 请求协议必须是 <strong>ＨＴＴＰＳ</strong>。（但我实测使用http-server运行并无须https）</li>
</ul>
<h2 id="articleHeader3">2、安装与运行</h2>
<p>官网提供一个 <code>@angular/service-worker</code> 按官方大概会在 <strong>Angular4.3.0</strong> 时移入 <code>@angular/core</code> 中，可见这地位多少重要啊。</p>
<p>当然啦，目前是试验性，所以如果您体验它，需要以下设置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install @angular/service-worker --save
ng set apps.0.serviceWorker=true" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">npm install @angular/service-worker --save
ng <span class="hljs-built_in">set</span> apps.0.serviceWorker=<span class="hljs-literal">true</span></code></pre>
<p>现在我们<strong>必须</strong>运行 <code>ng build -prod</code> 构建生产版本，对于 <code>ng serve</code> 并不会启动Service Worker，这样 Service Worker 配置信息自动添加到我们的项目当中。</p>
<p>最后，利用静态服务器，运行 <code>./dist</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http-server ./dist" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">http-server ./dist</code></pre>
<p>当你首次打开 <strong><a href="http://127.0.0.1:8080//strong" rel="nofollow noreferrer" target="_blank">http://127.0.0.1:8080/</a></strong> 后会自动缓存我们angular生产文件包，这一点，可以通过Chrome &gt; dev tools &gt; Application &gt; Service Worker 加以验证。</p>
<p>那么，接下来当你断点 http-server 服务后，依然能访问 <strong><a href="http://127.0.0.1:8080//strong" rel="nofollow noreferrer" target="_blank">http://127.0.0.1:8080/</a></strong>。</p>
<h2 id="articleHeader4">3、我好像什么都没有做！</h2>
<p>是的，我们的确什么都没有做，这一切 angular cli 都帮忙了。我们可以通过 <strong>./dist</strong> 了解一些细节。</p>
<h3 id="articleHeader5">Service Worker配置</h3>
<p><strong>ngsw-manifest.json</strong> 是 Service Worker 配置文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;static&quot;: {
    &quot;urls&quot;: {
      &quot;/polyfills.a7151445bffeeb4c3ed1.bundle.js&quot;: &quot;8562b2db4e35a23f44238e4f047e511f1a68c84d&quot;,
////////////////////all static files////////////////////
      &quot;/index.html&quot;: &quot;0511d96f8521033a561c607afc9ec7f168e7d358&quot;
    },
    &quot;_generatedFromWebpack&quot;: true
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"static"</span>: {
    <span class="hljs-attr">"urls"</span>: {
      <span class="hljs-attr">"/polyfills.a7151445bffeeb4c3ed1.bundle.js"</span>: <span class="hljs-string">"8562b2db4e35a23f44238e4f047e511f1a68c84d"</span>,
////////////////////all static files////////////////////
      <span class="hljs-attr">"/index.html"</span>: <span class="hljs-string">"0511d96f8521033a561c607afc9ec7f168e7d358"</span>
    },
    <span class="hljs-attr">"_generatedFromWebpack"</span>: <span class="hljs-literal">true</span>
  }
}</code></pre>
<p>这是Angular Cli默认生成的配置信息，里面是将 <strong>./dist</strong> 文件夹的所有（包括assets）的路径写入 <strong>urls</strong> 节点中。</p>
<p>不过这个配置文件我们可以进行自定义，只需要创建 <strong>./src/ngsw-manifest.json</strong> 文件。当然这样我们可以配置更多细节的内容。</p>
<p><strong>当前的Angular Cli 1.1.1/1.2.0-beta.1无法自定义ngsw-manifest.json <a href="https://github.com/angular/angular-cli/issues/6654" rel="nofollow noreferrer" target="_blank">#6654</a>，所以只能期望工具的跟上，当然这一切只是时间的问题。</strong></p>
<p><strong>static.urls</strong>（支持正则）</p>
<p>需要缓存的文件清单。</p>
<p><strong>static.ignore</strong>（支持正则）</p>
<p>忽略缓存的文件清单。</p>
<p><strong>static.versioned</strong>（支持正则）</p>
<p>Service Worker 会根据此规则来判断文件是否需要同步，像Webpack构建的文件名中会有哈希值，这样 Service Worker 就不需要获取文件后才知道是不是最新版本了。</p>
<p><strong>externals</strong></p>
<p>需要缓存的外部文件，比如我们 iconfont.cn 的在线文件。</p>
<p><strong>routing</strong></p>
<p>缓存路由。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
  &quot;routing&quot;: {
    &quot;index&quot;: &quot;/index.html&quot;,
    &quot;routes&quot;: {
      &quot;/(?!e?plnkr)[^/.]*$&quot;: {
        &quot;match&quot;: &quot;regex&quot; // or &quot;exact&quot;
      }
    }
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">
  <span class="hljs-string">"routing"</span>: {
    <span class="hljs-attr">"index"</span>: <span class="hljs-string">"/index.html"</span>,
    <span class="hljs-attr">"routes"</span>: {
      <span class="hljs-attr">"/(?!e?plnkr)[^/.]*$"</span>: {
        <span class="hljs-attr">"match"</span>: <span class="hljs-string">"regex"</span> // or <span class="hljs-string">"exact"</span>
      }
    }
  }</code></pre>
<p><strong>dynamic</strong></p>
<p>缓存策略配置。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;dynamic&quot;: {
    &quot;group&quot;: {
      &quot;name&quot;: &quot;hi-service-worker&quot;,
      &quot;cache&quot;: {
        &quot;optimizeFor&quot;: &quot;freshness&quot;,
        &quot;maxAgeMs&quot;: &quot;3600000&quot;,
        &quot;maxEntries&quot;: &quot;20&quot;,
        &quot;strategy&quot;: &quot;lru&quot;
      }
    }
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json">{
  <span class="hljs-attr">"dynamic"</span>: {
    <span class="hljs-attr">"group"</span>: {
      <span class="hljs-attr">"name"</span>: <span class="hljs-string">"hi-service-worker"</span>,
      <span class="hljs-attr">"cache"</span>: {
        <span class="hljs-attr">"optimizeFor"</span>: <span class="hljs-string">"freshness"</span>,
        <span class="hljs-attr">"maxAgeMs"</span>: <span class="hljs-string">"3600000"</span>,
        <span class="hljs-attr">"maxEntries"</span>: <span class="hljs-string">"20"</span>,
        <span class="hljs-attr">"strategy"</span>: <span class="hljs-string">"lru"</span>
      }
    }
  }
}</code></pre>
<h1 id="articleHeader6">PWAs</h1>
<p>如果你是Google技术宅，那么这个名词应该不陌生。</p>
<blockquote><p>PWAs是指2017年2月4日，谷歌推出的“小程序”增强型网页应用（ Progressive Web Apps，简称 PWAs），它无需下载安装，却可以和本地APP一样，放置在桌面上。</p></blockquote>
<p>而愿景交由你自己想象吧！</p>
<h1 id="articleHeader7">结论</h1>
<p>在 Angular 世界里，我们只需要通过简单的配置就能让现有 Angular APP 快速、可靠的支持Service Worker，这是一件多么让愉快的事情呀！</p>
<p>happy coding!</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何让Angular支持Service Worker

## 原文链接
[https://segmentfault.com/a/1190000009782718](https://segmentfault.com/a/1190000009782718)

