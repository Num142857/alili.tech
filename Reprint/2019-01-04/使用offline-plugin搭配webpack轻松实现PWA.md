---
title: '使用offline-plugin搭配webpack轻松实现PWA' 
date: 2019-01-04 2:30:10
hidden: true
slug: am646c158s
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVSVG1?w=1178&amp;h=484" src="https://static.alili.tech/img/bVSVG1?w=1178&amp;h=484" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>谈起PWA，许多人可能还只停留在“了解”的层面，比较少在实践中真正地尝试过，更多的仅仅是对着网上的教程和例子大概玩过。然而，网络上的例子多是简单的demo，鲜有与真正的开发相结合，例如和webpack的工程化结合。这篇文章将会从一个webpack plugin出发，谈一谈如何使用这个名为<code>offline-plugin</code>的webpack插件轻松实现PWA。</p>
<blockquote><p>由于PWA相关的文章太多，所以本文不再对“什么是PWA”，“PWA的生命周期”等基础内容再次赘述。</p></blockquote>
<p><code>offline-plugin</code>相关链接：</p>
<ul>
<li><a href="https://github.com/NekR/offline-plugin" rel="nofollow noreferrer" target="_blank">offline-plugin</a></li>
<li><a href="https://offline-plugin.now.sh/" rel="nofollow noreferrer" target="_blank">demo</a></li>
</ul>
<h1 id="articleHeader0">一、自动生成<code>service-worker.js</code>
</h1>
<p>PWA的核心可谓是<code>service-worker</code>（以后简称SW），任何一个PWA都有且只有一个<code>service-worker.js</code>文件，用于为SW添加资源列表，进行注册、激活等生命周期操作。但是在webpack构建的项目中，生成一个<code>service-worker.js</code>可能会面临两个较大的问题：</p>
<ul>
<li>1、webpack生成的资源多会生成一串hash，sw的资源列表里面需要同步更新这些带hash的资源；</li>
<li>2、每次更新代码，都需要通过更新sw文件版本号来通知客户端对所缓存的资源进行更新。（其实只要这一次的sw代码和上一次的sw代码不一样即可触发更新，但使用明确的版本号会更加合适）。</li>
</ul>
<p>看到这你可能已经想到，万能的webpack社区是否已经提供了相应的plugin来帮我们自动处理这些事情呢？答案是肯定的。除了官方推荐的<a href="https://github.com/goldhand/sw-precache-webpack-plugin" rel="nofollow noreferrer" target="_blank">sw-precache-webpack-plugin</a>之外，还有我们今天的主角<a href="https://github.com/NekR/offline-plugin" rel="nofollow noreferrer" target="_blank">offline-plugin</a>。</p>
<p>相比与<a href="https://github.com/goldhand/sw-precache-webpack-plugin" rel="nofollow noreferrer" target="_blank">sw-precache-webpack-plugin</a>，个人认为<a href="https://github.com/NekR/offline-plugin" rel="nofollow noreferrer" target="_blank">offline-plugin</a>具有如下优点：</p>
<ul>
<li>1、更多的可选配置项，满足更加细致的配置要求；</li>
<li>2、更为详细的文档和例子；</li>
<li>3、更新频率相对更高，star数更多；</li>
<li>4、自动处理生命周期，用户无需纠结生命周期的坑；</li>
<li>*5、支持AppCache；</li>
<li>6、自动生成<code>manifest</code>文件。</li>
<li>...</li>
</ul>
<h1 id="articleHeader1">二、基本使用</h1>
<h3 id="articleHeader2">安装</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install offline-plugin [--save-dev]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> <span class="hljs-keyword">offline</span>-<span class="hljs-keyword">plugin</span> [<span class="hljs-comment">--save-dev]</span></code></pre>
<h3 id="articleHeader3">初始化</h3>
<p>第一步，进入<code>webpack.config</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js example

var OfflinePlugin = require('offline-plugin');

module.exports = {
  // ...

  plugins: [
    // ... other plugins
    // it's always better if OfflinePlugin is the last plugin added
    new OfflinePlugin()
  ]
  // ...
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// webpack.config.js example</span>

<span class="hljs-keyword">var</span> OfflinePlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'offline-plugin'</span>);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-comment">// ...</span>

  plugins: [
    <span class="hljs-comment">// ... other plugins</span>
    <span class="hljs-comment">// it's always better if OfflinePlugin is the last plugin added</span>
    <span class="hljs-keyword">new</span> OfflinePlugin()
  ]
  <span class="hljs-comment">// ...</span>
}</code></pre>
<p>第二步，把<code>runtime</code>添加到你的入口js文件当中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require('offline-plugin/runtime').install();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">require</span>(<span class="hljs-string">'offline-plugin/runtime'</span>)<span class="hljs-selector-class">.install</span>();</code></pre>
<p>ES6/Babel/TypeScript</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import * as OfflinePluginRuntime from 'offline-plugin/runtime';
OfflinePluginRuntime.install();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> OfflinePluginRuntime <span class="hljs-keyword">from</span> <span class="hljs-string">'offline-plugin/runtime'</span>;
OfflinePluginRuntime.install();</code></pre>
<p>经过上面的步骤，<code>offline-plugin</code>已经集成到项目之中，通过webpack构建即可。</p>
<h1 id="articleHeader4">三、配置</h1>
<p>前面说过，<code>offline-plugin</code>支持细致的配置，以满足不同的需求。下面将介绍几个比较常用的配置项，方便大家进一步使用。</p>
<ul>
<li>
<p><a href="https://github.com/NekR/offline-plugin/blob/master/docs/caches.md" rel="nofollow noreferrer" target="_blank">Caches: 'all' | Object</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="告诉插件应该缓存什么东西，并以何种方式进行缓存
`all`: 意味着所有webpack构建出来的资源，以及在`externals`选项中的资源都会被缓存。
`Object`: 包含三个数组或正则的配置对象（`main`, `additional`, `optional`），它们都是可选的，且默认为空。
默认：`all`。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code>告诉插件应该缓存什么东西，并以何种方式进行缓存
`all`: 意味着所有webpack构建出来的资源，以及在`externals`选项中的资源都会被缓存。
`Object`: 包含三个数组或正则的配置对象（`main`, `additional`, `optional`），它们都是可选的，且默认为空。
默认：`all`。
</code></pre>
</li>
<li>
<p><a href="https://github.com/NekR/offline-plugin/blob/master/docs/options.md#externals-arraystring" rel="nofollow noreferrer" target="_blank">externals: Array&lt;string&gt;</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="允许开发者指定一些外部资源（比如CDN引用，或者不是通过webpack生成的资源）。配合`Caches`的`additional`项，能够实现缓存外部资源的功能。

默认：`null`
举例：`['fonts/roboto.woff']`
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>允许开发者指定一些外部资源（比如CDN引用，或者不是通过webpack生成的资源）。配合`Caches`的`additional`项，能够实现缓存外部资源的功能。

默认：`null`
举例：`[<span class="hljs-string">'fonts/roboto.woff'</span>]`
</code></pre>
</li>
<li>
<p><a href="https://github.com/NekR/offline-plugin/blob/master/docs/options.md#serviceworker-object--null--false" rel="nofollow noreferrer" target="_blank">ServiceWorker: Object | null | false</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="该对象包含多个配置项，这里仅列举最常用的。

`events`：布尔值。允许runtime接受来自sw的消息，默认值为false。
`navigateFallbackURL`：当一个URL请求从缓存或网络都无法被获取时，将会重定向到该选项所指向的URL。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code>该对象包含多个配置项，这里仅列举最常用的。

`events`：布尔值。允许runtime接受来自sw的消息，默认值为<span class="hljs-literal">false</span>。
`navigateFallbackURL`：当一个URL请求从缓存或网络都无法被获取时，将会重定向到该选项所指向的URL。
</code></pre>
</li>
<li>
<p><a href="https://github.com/NekR/offline-plugin/blob/master/docs/options.md#appcache-object--null--false" rel="nofollow noreferrer" target="_blank">AppCache: Object | null | false</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="`offline-plugin`默认支持`AppCache`，但是`AppCache`草案已经被web标准所废弃，不建议使用。
但是由于仍然有部分浏览器支持，所以插件默认提供这个功能。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code>`offline-plugin`默认支持`AppCache`，但是`AppCache`草案已经被web标准所废弃，不建议使用。
但是由于仍然有部分浏览器支持，所以插件默认提供这个功能。
</code></pre>
</li>
</ul>
<h1 id="articleHeader5">四、runtime</h1>
<p>上一节介绍了<code>offline-plugin</code>在webpack当中的配置，这一节将介绍runtime的一些用法。<br>若要使<code>offline-plugin</code>生效，用户必须在入口js文件中通过runtime进行初始化操作：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 通过AMD方式
require('offline-plugin/runtime').install();

// 或者通过ES6/Babel/TypeScript方式

import * as OfflinePluginRuntime from 'offline-plugin/runtime';
OfflinePluginRuntime.install();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// 通过AMD方式</span>
<span class="hljs-built_in">require</span>(<span class="hljs-string">'offline-plugin/runtime'</span>).install();

<span class="hljs-comment">// 或者通过ES6/Babel/TypeScript方式</span>

<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> OfflinePluginRuntime <span class="hljs-keyword">from</span> <span class="hljs-string">'offline-plugin/runtime'</span>;
OfflinePluginRuntime.install();</code></pre>
<p><code>OfflinePluginRuntime</code>对象提供了下列三个方法：</p>
<ul>
<li>
<a href="https://github.com/NekR/offline-plugin/blob/master/docs/runtime.md#installoptions-object" rel="nofollow noreferrer" target="_blank">install(options: Object)</a><br>  开启ServiceWorker/AppCache的安装流程。这个方法是安全的，并且必须在页面初始化的时候就被调用。另外请勿把它放在任何的条件语句之内。（这句话不全对，在后面的降级方案里面会详细介绍）</li>
<li>
<a href="https://github.com/NekR/offline-plugin/blob/master/docs/runtime.md#applyupdate" rel="nofollow noreferrer" target="_blank">applyUpdate()</a><br>  接受当前所安装的sw的更新信息。</li>
<li>
<a href="https://github.com/NekR/offline-plugin/blob/master/docs/runtime.md#update" rel="nofollow noreferrer" target="_blank">update()</a><br>  检查新版本的ServiceWorker/AppCache的更新信息。</li>
</ul>
<hr>
<p><code>runtime.install()</code>方法接受一个配置对象参数，用于处理sw各个生命周期里面的事件：</p>
<ul>
<li>
<p><a href="https://github.com/NekR/offline-plugin/blob/master/docs/runtime.md#oninstalled" rel="nofollow noreferrer" target="_blank">onInstalled</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="当ServiceWorker/AppCache被install时执行，可用于展示“APP已经支持离线访问”。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code>当ServiceWorker/AppCache被<span class="hljs-keyword">install</span>时执行，可用于展示“APP已经支持离线访问”。
</code></pre>
</li>
<li>
<p><a href="https://github.com/NekR/offline-plugin/blob/master/docs/runtime.md#onupdating" rel="nofollow noreferrer" target="_blank">onUpdating</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="AppCache不支持该方法
当更新信息被获取且浏览器正在进行资源更新时触发。在这个时刻，一些资源正在被下载。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>AppCache不支持该方法
当更新信息被获取且浏览器正在进行资源更新时触发。在这个时刻，一些资源正在被下载。
</code></pre>
</li>
<li>
<p><a href="https://github.com/NekR/offline-plugin/blob/master/docs/runtime.md#onupdateready" rel="nofollow noreferrer" target="_blank">onUpdateReady</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="当`onUpdating`事件完成时触发。这时，所有资源都已经下载完毕。
通过调用`runtime.applyUpdate()`方法来触发更新。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code>当`onUpdating`事件完成时触发。这时，所有资源都已经下载完毕。
通过调用`runtime.applyUpdate()`方法来触发更新。
</code></pre>
</li>
<li>
<p><a href="https://github.com/NekR/offline-plugin/blob/master/docs/runtime.md#onupdatefailed" rel="nofollow noreferrer" target="_blank">onUpdateFailed</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="当`onUpdating`事件因为某些原因失败时触发。
这时没有任何资源被下载，同时所有的资源更新进程都应该被取消或跳过。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code>当`onUpdating`事件因为某些原因失败时触发。
这时没有任何资源被下载，同时所有的资源更新进程都应该被取消或跳过。
</code></pre>
</li>
<li>
<p><a href="https://github.com/NekR/offline-plugin/blob/master/docs/runtime.md#onupdated" rel="nofollow noreferrer" target="_blank">onUpdated</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="当更新被接受时触发。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>当更新被接受时触发。
</code></pre>
</li>
</ul>
<h1 id="articleHeader6">五、降级方案</h1>
<p>当某些时候我们需要撤掉sw进行降级的时候，我们需要主动注销sw。然而<code>offline-plugin</code>默认没有提供注销sw的<code>unregister()</code>方法，所以我们需要自己实现。</p>
<p>其实要主动注销sw非常简单，我们可以直接调用<code>ServiceWorkerContainer.getRegistrations()</code>方法来拿到<code>registration</code>实例，然后调用<code>registration.unregister()</code>方法即可，具体代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistration().then((registration) => {
    registration &amp;&amp; registration.unregister().then((boolean) => {
      boolean ? alert('注销成功') : alert('注销失败')
    });
  })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">if</span> (<span class="hljs-string">'serviceWorker'</span> <span class="hljs-keyword">in</span> navigator) {
  navigator.serviceWorker.getRegistration().<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(registration)</span> =&gt;</span> {
    registration &amp;&amp; registration.unregister().<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(boolean)</span> =&gt;</span> {
      boolean ? alert(<span class="hljs-string">'注销成功'</span>) : alert(<span class="hljs-string">'注销失败'</span>)
    });
  })
}</code></pre>
<p>在调用该方法后，sw已经被注销，刷新一下页面就能看到资源是重新从网络获取的了。</p>
<p>在真实的生产环境中，我们可以通过调用接口，来决定是否使用降级方案：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fetch(URL).then((switch) => {
  if (switch) {
    OfflinePluginRuntime.install()
  } else {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        registration &amp;&amp; registration.unregister().then((boolean) => {
          boolean ? alert('注销成功') : alert('注销失败')
        })
      })
    }
  }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>fetch(URL).<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(<span class="hljs-keyword">switch</span>)</span> =&gt;</span> {
  <span class="hljs-keyword">if</span> (<span class="hljs-keyword">switch</span>) {
    OfflinePluginRuntime.install()
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">if</span> (<span class="hljs-string">'serviceWorker'</span> <span class="hljs-keyword">in</span> navigator) {
      navigator.serviceWorker.getRegistration().<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(registration)</span> =&gt;</span> {
        registration &amp;&amp; registration.unregister().<span class="hljs-keyword">then</span>(<span class="hljs-function"><span class="hljs-params">(boolean)</span> =&gt;</span> {
          boolean ? alert(<span class="hljs-string">'注销成功'</span>) : alert(<span class="hljs-string">'注销失败'</span>)
        })
      })
    }
  }
})</code></pre>
<h1 id="articleHeader7">六、遇到的坑</h1>
<p>在具体实践中，遇到一个比较大的坑，就是<code>sw.js</code>文件的更新。</p>
<p>在service worker的设计中，浏览器每一次加载站点的URL，都会重新请求一遍<code>sw.js</code>。若发现这一次的<code>sw.js</code>内容和上一次的不一样，就会判定为资源更新，重新触发sw的生命周期。然而，<code>sw.js</code>也是一个普通的js资源文件，会默认使用服务器设置的expired时间，也就是它的<code>max-age</code>。在理解了service worker的设计后，我们不难发现，<code>sw.js</code>的<code>max-age</code>应该尽可能短，以便浏览器能够及时更新资源列表。</p>
<p>这也是我在研究阶段直接使用<code>http-server</code>时所发现的问题。后来在官方的例子中，我发现<code>npm script</code>里面是这么写的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;start&quot;: &quot;http-server ./dist -p 7474 -c no-cache&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">"<span class="hljs-keyword">start</span><span class="hljs-string">": "</span><span class="hljs-keyword">http</span>-<span class="hljs-keyword">server</span> ./dist -p <span class="hljs-number">7474</span> -c <span class="hljs-keyword">no</span>-<span class="hljs-keyword">cache</span><span class="hljs-string">"</span></code></pre>
<p>直接指定了所有资源都不使用缓存，这一点值得我们注意。</p>
<p>另外，<code>webpack-dev-server</code>里无法正常使用<code>offline-plugin</code>，因为它需要具体的文件去生成<code>sw.js</code>，但是通过<code>webpack-dev-server</code>构建的项目，其文件是存放在内存中的，所以无法和<code>offline-plugin</code>正常搭配使用。建议仅在<strong>生产模式</strong>内使用<code>offline-plugin</code>。</p>
<h1 id="articleHeader8">七、添加到主屏</h1>
<p>手机浏览器都提供了“添加到主屏”的功能，但普通的网站添加到主屏，仅仅是把网站的书签放到桌面。如果要想把网站以PWA的形式添加到主屏，我们需要一个<a href="https://developer.mozilla.org/en-US/docs/Web/Manifest" rel="nofollow noreferrer" target="_blank">manifest.json文件</a>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;offline-plugin&quot;,
  &quot;icons&quot;: [
    {
      &quot;src&quot;: &quot;/android-chrome-192x192.png&quot;,
      &quot;sizes&quot;: &quot;192x192&quot;,
      &quot;type&quot;: &quot;image/png&quot;
    },
    {
      &quot;src&quot;: &quot;/android-chrome-512x512.png&quot;,
      &quot;sizes&quot;: &quot;512x512&quot;,
      &quot;type&quot;: &quot;image/png&quot;
    }
  ],
  &quot;theme_color&quot;: &quot;#181743&quot;,
  &quot;background_color&quot;: &quot;#181743&quot;,
  &quot;start_url&quot;: &quot;/&quot;,
  &quot;display&quot;: &quot;standalone&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"offline-plugin"</span>,
  <span class="hljs-attr">"icons"</span>: [
    {
      <span class="hljs-attr">"src"</span>: <span class="hljs-string">"/android-chrome-192x192.png"</span>,
      <span class="hljs-attr">"sizes"</span>: <span class="hljs-string">"192x192"</span>,
      <span class="hljs-attr">"type"</span>: <span class="hljs-string">"image/png"</span>
    },
    {
      <span class="hljs-attr">"src"</span>: <span class="hljs-string">"/android-chrome-512x512.png"</span>,
      <span class="hljs-attr">"sizes"</span>: <span class="hljs-string">"512x512"</span>,
      <span class="hljs-attr">"type"</span>: <span class="hljs-string">"image/png"</span>
    }
  ],
  <span class="hljs-attr">"theme_color"</span>: <span class="hljs-string">"#181743"</span>,
  <span class="hljs-attr">"background_color"</span>: <span class="hljs-string">"#181743"</span>,
  <span class="hljs-attr">"start_url"</span>: <span class="hljs-string">"/"</span>,
  <span class="hljs-attr">"display"</span>: <span class="hljs-string">"standalone"</span>
}</code></pre>
<p>然后，把这个<code>manifest.json</code>和其他<strong>静态资源</strong>一并打包到网站根目录即可：</p>
<p><span class="img-wrap"><img data-src="/img/bVSWEV?w=307&amp;h=394" src="https://static.alili.tech/img/bVSWEV?w=307&amp;h=394" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>示例地址：</p>
<p><span class="img-wrap"><img data-src="/img/bVSWNw?w=185&amp;h=183" src="https://static.alili.tech/img/bVSWNw?w=185&amp;h=183" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>打开chrome开发者工具，进入到<code>Application</code>一列，选择<code>Manifest</code>，就可以看到效果了：</p>
<p><span class="img-wrap"><img data-src="/img/bVSWIf?w=1154&amp;h=870" src="https://static.alili.tech/img/bVSWIf?w=1154&amp;h=870" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><del>截止到<strong>目前（2017年8月15日）</strong>，我所使用的<strong>iOS10.3.2</strong>版本的iPhone7手机，已经支持PWA了，效果如下：</del><br>经过查阅大量的资料，到目前为止，iOS并不支持PWA，但是可以通过在html里面添加几个标签，实现web页面和原生APP相似的体验效果：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="应用图标：
<link rel=&quot;apple-touch-icon&quot; href=“/custom_icon.png&quot;>

启动画面：
<link rel=&quot;apple-touch-startup-image&quot; href=&quot;/launch.png&quot;>

应用名称：
<meta name=&quot;apple-mobile-web-app-title&quot; content=&quot;AppTitle&quot;>

全屏效果：
<meta name=&quot;apple-mobile-web-app-capable&quot; content=&quot;yes&quot;>

设置状态栏颜色：
<meta name=&quot;apple-mobile-web-app-status-bar-style&quot; content=&quot;black&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>应用图标：
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"apple-touch-icon"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">“/custom_icon.png</span>"&gt;</span>

启动画面：
<span class="hljs-tag">&lt;<span class="hljs-name">link</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">"apple-touch-startup-image"</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"/launch.png"</span>&gt;</span>

应用名称：
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"apple-mobile-web-app-title"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"AppTitle"</span>&gt;</span>

全屏效果：
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"apple-mobile-web-app-capable"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"yes"</span>&gt;</span>

设置状态栏颜色：
<span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"apple-mobile-web-app-status-bar-style"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"black"</span>&gt;</span></code></pre>
<p><em>使用safari打开</em><br><span class="img-wrap"><img data-src="/img/bVSWL8?w=308&amp;h=566" src="https://static.alili.tech/img/bVSWL8?w=308&amp;h=566" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><em>添加到主屏后打开</em><br><span class="img-wrap"><img data-src="/img/bVSWML?w=312&amp;h=570" src="https://static.alili.tech/img/bVSWML?w=312&amp;h=570" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><em>离线后从主屏打开</em></p>
<p><span class="img-wrap"><img data-src="/img/bVSWNc?w=308&amp;h=566" src="https://static.alili.tech/img/bVSWNc?w=308&amp;h=566" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><em>打开任务管理器</em></p>
<p><span class="img-wrap"><img data-src="/img/bVSWOf?w=304&amp;h=542" src="https://static.alili.tech/img/bVSWOf?w=304&amp;h=542" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到，PWA无论从表现还是功能，都像一个独立的APP那样存在。</p>
<h1 id="articleHeader9">八、尾声</h1>
<p><del>原来一直以为苹果对PWA支持不好，但通过这次实践，可以知道其实PWA也取得了极大的推进，开发者们可以开心地搭建自己的PWA啦！</del><br>结论不能下太早。。。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用offline-plugin搭配webpack轻松实现PWA

## 原文链接
[https://segmentfault.com/a/1190000010669126](https://segmentfault.com/a/1190000010669126)

