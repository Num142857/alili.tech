---
title: '【译】渐进式 Web App 的离线存储' 
date: 2019-02-05 2:30:09
hidden: true
slug: jr43973oj4d
categories: [reprint]
---

{{< raw >}}

                    
<p>拖拖拉拉好久，终于把个人博客整出来了。鸣谢 @pinggod。</p>
<p>厚着脸安利一下，地址是 <a href="http://www.wemlion.com/" rel="nofollow noreferrer" target="_blank">http://www.wemlion.com/</a>。欢迎访问，欢迎收藏。</p>
<blockquote><p>本文转载自：<a href="http://www.zcfy.cc" rel="nofollow noreferrer" target="_blank">众成翻译</a><br>译者：<a href="http://www.zcfy.cc/@wemlin" rel="nofollow noreferrer" target="_blank">文蔺</a><br>链接：<a href="http://www.zcfy.cc/article/1067" rel="nofollow noreferrer" target="_blank">http://www.zcfy.cc/article/1067</a><br>原文：<a href="https://medium.com/@addyosmani/offline-storage-for-progressive-web-apps-70d52695513c" rel="nofollow noreferrer" target="_blank">https://medium.com/@addyosmani/offline-storage-for-progressive-web-apps-70d52695513c</a></p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006760620" src="https://static.alili.tech/img/remote/1460000006760620" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>2016 很可能成为<strong>网络弹性</strong>（network resilience）元年。</p>
<p>网络连接很可能<strong>不靠谱</strong>（flakey），或者根本就连不上，这也是为什么在 <a href="https://developers.google.com/web/progressive-web-apps/" rel="nofollow noreferrer" target="_blank">渐进式 Web App</a>（译者注：Progressive Web App，以下简称 <code>PWA</code>） 中，支持离线和性能可靠都很重要。本文总结了关于 PWA <strong>离线数据存储</strong>的一些创意。想想那些提供<em>有意义的</em>离线体验所需要的 JSON 数据、图片以及其他的静态数据。</p>
<p><strong>离线存储数据的建议：</strong></p>
<p>对 <strong>URL寻址资源</strong>(URL addressable resources)，使用 <a href="https://davidwalsh.name/cache" rel="nofollow noreferrer" target="_blank"><strong>Cache API</strong></a>（这是 <a href="https://developers.google.com/web/fundamentals/primers/service-worker/" rel="nofollow noreferrer" target="_blank">Service Worker</a> 的一部分）。对其他数据，使用 <strong>IndexedDB</strong>（给它包装上 <a href="http://www.html5rocks.com/en/tutorials/es6/promises/" rel="nofollow noreferrer" target="_blank">Promises</a>）。</p>
<p><strong>常见问题解答：</strong></p>
<ul>
<li><p>IDB 和 Cache API 两者的 API 都是异步的（IDB 基于事件，Cache API 基于 Promise）。它们都可以在 <a href="https://nolanlawson.github.io/html5workertest/" rel="nofollow noreferrer" target="_blank">Web Worker、Window 以及 Service Worker</a> 三种环境下工作。</p></li>
<li><p>IDB <a href="http://caniuse.com/#feat=indexeddb" rel="nofollow noreferrer" target="_blank">到处</a>都支持（译者注：原文如此，作者的意思请自行揣摩）。 Service Workers  和 Cache API 只在 Chrome、Firefox、Opera 中<a href="https://jakearchibald.github.io/isserviceworkerready/" rel="nofollow noreferrer" target="_blank">支持</a>， Edge 中尚在开发。</p></li>
<li><p>IDB 不支持 Promise，但有一些<em>强大的</em>库提供了 Promise 包装。<em>后面会给出建议。</em>这些库会尽可能抹平 API 之间的强制复杂性（事务处理，schema 版本控制）。</p></li>
<li><p>原生的 IDB Promise 以及 <a href="https://github.com/WICG/indexed-db-observers" rel="nofollow noreferrer" target="_blank">observer</a> 已得到<a href="https://github.com/inexorabletash/indexeddb-promises" rel="nofollow noreferrer" target="_blank">提议</a>。</p></li>
<li><p>有多大的存储量？Chrome 和 Opera 中，是按<strong>域</strong>计算存储的（而不是按 API 计算）。在到达<a href="http://www.html5rocks.com/en/tutorials/offline/quota-research/" rel="nofollow noreferrer" target="_blank">储量限制</a>之前，两种存储机制都会一直进行存储。通过 <a href="https://www.w3.org/TR/quota-api/" rel="nofollow noreferrer" target="_blank">Quota Management API</a> 可以检查用量（译者注：这个 API 还在提案阶段）。Firefox 则没有对存储量做出限制，只是在 50 MB 之后会弹出提醒。移动版 Safari 最多可以存 50 MB；桌面版 Safari没有限制（满5 MB 之后有提醒）；IE 10+ 最多能存 250 MB，超过 10 MB 之后弹出提醒。以上数据来源于 PouchDB 对 IDB 存储行为的<a href="https://pouchdb.com/faq.html#data_limits" rel="nofollow noreferrer" target="_blank">跟踪</a>。朝着未来的方向看，如果应用需要更多持久化存储，请看正在进行中的 <a href="https://storage.spec.whatwg.org/" rel="nofollow noreferrer" target="_blank">Durable Storage</a>。</p></li>
<li><p>Safari 在最新的 Tech Previews 中<a href="https://gist.github.com/nolanlawson/08eb857c6b17a30c1b26" rel="nofollow noreferrer" target="_blank">修复了许多长期存在的 IDB bug</a><button class="btn btn-xs btn-default ml10 preview" data-url="nolanlawson/08eb857c6b17a30c1b26" data-typeid="1">点击预览</button>。即便如此，Safari 10 的 IDB 并未完全通过 PouchDB 的测试套件，已经有人碰到了稳定性问题。在更多研究完成之前，可能会遇到各种不同的情况。请<em>务必</em>测试并提交 bug，让 webkit 的同学和相关支持库的作者们看看。</p></li>
<li><p>URL寻址资源通常是指可以那些通过 URL 访问的静态资源。对 PWA 而言，你可以通过 Cache API 缓存那些组成你的应用 shell 的静态文件（JS/CSS/HTML），并通过 IndexedDB 向离线页面填充数据。对此没有硬性规定，PWA 仅靠 Cache API 就能玩得转。</p></li>
<li><p><a href="https://developers.google.com/web/tools/chrome-devtools/iterate/manage-data/local-storage" rel="nofollow noreferrer" target="_blank">Chrome</a> (Application tab)、Opera、<a href="https://developer.mozilla.org/en-US/docs/Tools/Storage_Inspector" rel="nofollow noreferrer" target="_blank">Firefox</a> (Storage Inspector)、Safari (Storage tab) 都已经支持 IndexedDB 调试。</p></li>
</ul>
<p><strong>值得一看的 IndexedDB 库</strong></p>
<ul>
<li><p><a href="https://mozilla.github.io/localForage/" rel="nofollow noreferrer" target="_blank">localForage</a>： 约 8 KB，Promise，对传统浏览器支持良好</p></li>
<li><p><a href="https://www.npmjs.com/package/idb-keyval" rel="nofollow noreferrer" target="_blank">idb-keyval</a>：小于 500 字节，Promise，提供 key-value 支持</p></li>
<li><p><a href="https://www.npmjs.com/package/idb" rel="nofollow noreferrer" target="_blank">idb</a>：约 1.7 KB，Promise, 可迭代、索引</p></li>
<li><p><a href="http://dexie.org/" rel="nofollow noreferrer" target="_blank">Dexie</a>：约 16 KB, Promises，复杂查询、辅助索引</p></li>
<li><p><a href="https://pouchdb.com/" rel="nofollow noreferrer" target="_blank">PouchDB</a>：约 45 KB ，支持<a href="https://pouchdb.com/2016/06/06/introducing-pouchdb-custom-builds.html" rel="nofollow noreferrer" target="_blank">定制版本</a>，同步的（？）</p></li>
<li><p><a href="https://github.com/google/lovefield" rel="nofollow noreferrer" target="_blank">Lovefield</a>：相关的内容</p></li>
<li><p><a href="http://lokijs.org/#/" rel="nofollow noreferrer" target="_blank">LokiJS</a>：内存中的</p></li>
<li><p><a href="https://github.com/yathit/ydn-db" rel="nofollow noreferrer" target="_blank">ydn-db</a>：类似 dexie，可以使用 WebSQL</p></li>
</ul>
<p><strong>值得一看的 Service Worker 库</strong></p>
<ul>
<li><p><a href="https://github.com/GoogleChrome/sw-toolbox" rel="nofollow noreferrer" target="_blank">sw-toolbox</a>：动态或运行时请求的离线缓存</p></li>
<li><p><a href="https://github.com/GoogleChrome/sw-precache" rel="nofollow noreferrer" target="_blank">sw-precache</a>：静态资源或应用 shell 的离线预缓存</p></li>
<li><p>Webpack 用户可以直接使用上面的，或者可以看看 <a href="https://github.com/NekR/offline-plugin" rel="nofollow noreferrer" target="_blank">offline-plugin</a></p></li>
</ul>
<h3 id="articleHeader0">其他存储机制</h3>
<ul>
<li><p><strong>Web Storage</strong> (e.g LocalStorage) 是同步的，不支持 Web Worker，且有大小限制（只能存储字符串）。尽管之前异步 LocalStorage 的<a href="https://github.com/slightlyoff/async-local-storage" rel="nofollow noreferrer" target="_blank">想法</a>已有人提出来，但目前的焦点还是 <a href="https://w3c.github.io/IndexedDB/" rel="nofollow noreferrer" target="_blank">IndexedDB 2.0</a>。我个人就愿意使用 IDB 加上一个工具库。</p></li>
<li><p><strong>Cookies</strong> 自有其用途，但却是同步的，不支持 Web Worker，还有大小限制。在之前的项目中我使用了 <a href="https://github.com/js-cookie/js-cookie" rel="nofollow noreferrer" target="_blank">js-cookie</a>（gzip 后约 800 字节） 处理 cookie。目前已经有人勾勒出 <a href="https://github.com/WICG/async-cookies-api" rel="nofollow noreferrer" target="_blank">Async Cookies API</a> 的支持了，有一个可用的 polyfill。</p></li>
<li><p><strong>WebSQL</strong> 是异步的（基于回调函数），但它同样不支持 Web Worker。Firefox 和 Edge 也不支持它。如果某一天它完全消失，我不会觉得惊讶的。</p></li>
<li><p><strong>File System API</strong> 也是异步的（基于回调函数），在 Web Worker 和 window 中可以工作（虽然使用的是同步 API）。不幸的是，除 Chrome 之外它并无更多兴趣，而且是运行在沙盒中的（这意味着我们无法获取原生的文件访问权）。</p></li>
<li><p><strong>File API</strong> 正在由 <a href="https://wicg.github.io/entries-api/" rel="nofollow noreferrer" target="_blank">File and Directory Entries API</a> 和 <a href="https://w3c.github.io/FileAPI/" rel="nofollow noreferrer" target="_blank">File API</a> 规范完善。Github 上有一个 <a href="https://github.com/mailru/FileAPI" rel="nofollow noreferrer" target="_blank">File API 库</a>；关于保存文件，作为权宜之计，我一直在使用 <a href="https://github.com/eligrey/FileSaver.js" rel="nofollow noreferrer" target="_blank">FileSaver.js</a>。<a href="https://github.com/WICG/writable-files" rel="nofollow noreferrer" target="_blank">可写文件</a>的提案最终可能会为我们提供本地文件无缝交互的标准解决方案。</p></li>
</ul>
<h3 id="articleHeader1">离线存储的现在与将来</h3>
<p>如果对离线缓存感兴趣，下面这些成果值得关注。我个人对 IndexedDB 原生的 Promise 支持非常感兴趣。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000006640459" src="https://static.alili.tech/img/remote/1460000006640459" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li><p><a href="https://storage.spec.whatwg.org/" rel="nofollow noreferrer" target="_blank">Durable Storage</a>: 将存储与浏览器的清除策略隔开</p></li>
<li><p><a href="https://w3c.github.io/IndexedDB/" rel="nofollow noreferrer" target="_blank">Indexed Database API 2.0</a>: 先进的 key-value 数据管理</p></li>
<li><p><a href="https://github.com/inexorabletash/indexeddb-promises" rel="nofollow noreferrer" target="_blank">Promisified IndexedDB</a>: 原生支持 Promise 的 IndexedDB 版本</p></li>
<li><p><a href="https://github.com/WICG/indexed-db-observers" rel="nofollow noreferrer" target="_blank">IndexedDB Observers</a>: 原生的 IndexedDB observer 支持</p></li>
<li><p><a href="https://github.com/bsittler/async-cookies-api" rel="nofollow noreferrer" target="_blank">Async Cookies API</a>: 异步的 cookie API</p></li>
<li><p><a href="https://www.w3.org/TR/quota-api/" rel="nofollow noreferrer" target="_blank">Quota Management API</a>: 检查应用、域的存储占用量</p></li>
<li><p><a href="https://github.com/WICG/writable-files" rel="nofollow noreferrer" target="_blank">writable-files</a>: 允许网站与本地文件之间进一步的无缝交互</p></li>
<li><p><a href="https://github.com/drufball/directory-download" rel="nofollow noreferrer" target="_blank">Directory downloads</a>: 支持直接下载文件夹（非 .zip 文件）</p></li>
<li><p><a href="https://wicg.github.io/entries-api/" rel="nofollow noreferrer" target="_blank">File and Directory Entries API</a>: 支持文件和目录的拖拽上传</p></li>
</ul>
<h3 id="articleHeader2">资源</h3>
<ul>
<li><p><a href="http://nolanlawson.github.io/database-comparison/" rel="nofollow noreferrer" target="_blank">Browser Database Comparison</a></p></li>
<li><p><a href="https://docs.google.com/presentation/d/11CJnf77N45qPFAhASwnfRNeEMJfR-E_x05v1Z6Rh5HA/edit" rel="nofollow noreferrer" target="_blank">State of offline storage APIs</a></p></li>
<li><p><a href="https://nolanlawson.com/2015/09/29/indexeddb-websql-localstorage-what-blocks-the-dom/" rel="nofollow noreferrer" target="_blank">IndexedDB, WebSQL, LocalStorage — what blocks the DOM?</a></p></li>
<li><p><a href="https://nolanlawson.com/2016/02/08/how-to-think-about-databases/" rel="nofollow noreferrer" target="_blank">How to think about databases (Pokedex research)</a></p></li>
<li><p><a href="https://nolanlawson.github.io/html5workertest/" rel="nofollow noreferrer" target="_blank">Which APIs are supported in Web Workers and Service Workers?</a></p></li>
</ul>
<p>离线存储并没有那么神奇，对潜在 API 的理解有助于你最大程度地利用现有的资源。无论你想直接使用这些 API，还是使用对它们进行抽象库文件，花一些时间来熟悉你的选择。</p>
<p>希望本文对你的 PWA 离线体验有所帮助。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【译】渐进式 Web App 的离线存储

## 原文链接
[https://segmentfault.com/a/1190000006640450](https://segmentfault.com/a/1190000006640450)

