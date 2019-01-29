---
title: '从单页应用(SPA)到服务器渲染(SSR)' 
date: 2019-01-30 2:30:23
hidden: true
slug: opjd6p8tmhd
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>
<p>系列文章:</p>
<ol>
<li><p><a href="https://segmentfault.com/a/1190000006435886">Vue 2.0 升（cai）级（keng）之旅</a></p></li>
<li><p><a href="https://segmentfault.com/a/1190000006673171" target="_blank">Vuex — The core of Vue application</a></p></li>
<li><p>从单页应用(SPA)到服务器渲染(SSR)（本文）</p></li>
</ol>
</blockquote>
<p>个人博客之前已经将 vue-router 的模式改为了 <code>history</code>，即 url 中不包含 <code>hash</code>，再通过将所有的静态请求转发到 index.html，使它看上去似乎像一个静态多页的网站。</p>
<p>然而，它其实和其他的 SPA (Single Page Application 单页应用)来说没有任何的区别，最终是通过前端的路由去控制页面的显示。单页应用虽然在交互体验上比传统多页更友好，但它也有一个天生的缺陷，就是对搜索引擎不友好，不利于爬虫爬取数据。</p>
<p>正所谓成也萧何，败也萧何。</p>
<p>讲人话就是，搜索引擎搜不到我的博客啊~哭...</p>
<p>那什么对搜索引擎和爬虫友好的哪？答案就是静态页，而非浏览器渲染，这就需要服务器直接渲染，也就 SSR(Server Side Render)。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007753978" src="https://static.alili.tech/img/remote/1460000007753978" alt="当然不是这个 SSR" title="当然不是这个 SSR" style="cursor: pointer; display: inline;"></span></p>
<p>SSR，服务器渲染。简单来说就是，服务器将每个要展示的页面都运行完成后，将整个相应流传送给浏览器，所有的运算在服务器端都已经完成，浏览器只需要解析 HTML 就行。</p>
<p>说起来简单，那到底该如何着手将项目改造成 SSR，和曾经的多页又有什么区别哪？既然自己在 SSR 方面是个小白，自然要先从查资料看文档入手，Vue 2.0 的文档中有一章就是关于 <a href="https://vuejs.org/v2/guide/ssr.html" rel="nofollow noreferrer" target="_blank">SSR</a>。</p>
<p>看了文档之后，它给了我一个新思路，可以在无须大幅修改原先代码的情况下做到 SSR，又不失单页良好的体验。</p>
<p>听上去很酷是不是，具体怎么做继续看下去。</p>
<h2 id="articleHeader0">SSR Architecture</h2>
<p>一个普通的单页应用通常是通过 webpack 将源代码打包后插入到 html 中，当页面请求时，返回 html 再加载打包后的 js 文件，也就是下图中的 Application Code，Webpack build 和 browser 这三大块。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007753979" src="https://static.alili.tech/img/remote/1460000007753979" alt="SSR Architecture" title="SSR Architecture" style="cursor: pointer; display: inline;"></span></p>
<p>剩下的那几部分就是 SSR 需要额外新加的部分，一个个来看。</p>
<h3 id="articleHeader1">Server entry &amp; Client entry</h3>
<p>Server entry &amp; client entry 两者的有共同的词尾 entry，对应的是 webpack.config 中的 entry，即打包入口文件，也就是分别代表服务器端所运行代码的入口和浏览器端所运行代码的入口文件。</p>
<p>入口文件自然不用多复杂。</p>
<ul>
<li><p>server entry: 根据路由状态，返回渲染完成后相应的组件</p></li>
<li><p>clinet entry: 将应用直接挂载到 DOM 上</p></li>
</ul>
<p>OK。它俩的事就做完啦，是不是很简单。</p>
<h3 id="articleHeader2">Webpack build</h3>
<p>有了不同的 entry，打包的内容也有不同，自然就要两套配置。</p>
<p>配置 webpack 的配置文件的确很麻烦，但有个好消息就是原先的打包文件不需要修改，只需加一个 server 端的配置文件就可以了。server 端的配置文件也相当简单，基本可以沿用客户端的配置，改改 <code>entry</code> 和 <code>output</code> 基本就差不多了。</p>
<p>不过，有一点要注意，一定要将 <code>target</code> 属性设置成 <code>node</code>，不然打包完了也没法在 node 环境下跑。还可以将所有依赖都设置成 <code>externals</code>（跑在服务器本地嘛，依赖自然都拿得到），这只是个优化点，不加也没有任何问题。</p>
<p>有了配置文件，也就能生成 Server Bundle 了，只剩下最后一块 Bundle Renderer 了。</p>
<h3 id="articleHeader3">Bundle Renderer</h3>
<p>到这里才要用上 vue 为支持 ssr 所依赖的库 <code>vue-server-renderer</code>。</p>
<p>通过 <code>vue-server-renderer</code> 提供的 <a href="https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md" rel="nofollow noreferrer" target="_blank">API</a> 就能容易地根据 url 生成对应的组件树，然后将它返回给客户端。</p>
<p>这里要注意，因为用的是 webpack 打包后的文件，所以只能用 <code>createBundleRenderer</code> 而不能用 <code>createRenderer</code> 来创建 renderer。</p>
<p>创建 renderer 的时候还可以为它配置 cache，方法在 <a href="https://github.com/vuejs/vue/blob/dev/packages/vue-server-renderer/README.md" rel="nofollow noreferrer" target="_blank">README</a> 中也写得很清楚了，由于我个人博客的场景不适合添加 cache 就没有添加。</p>
<p>这样从 SPA 到 SSR 的变更就完成了，通过浏览器访问看看是不是已经将页面整个返回了。</p>
<h3 id="articleHeader4">Tips</h3>
<ul><li><p>遇到控制台 ⚠️</p></li></ul>
<blockquote><p>The client-side rendered virtual DOM tree is not matching server-rendered content.</p></blockquote>
<p>当然，可能是你的标签不对应，也有可能是 text node 中的空格字符长度不对应，我个人遇到的都是空格不对应造成的问题，很是尴尬（可能是使用 template 语法造成的）...</p>
<ul><li><p>Memory-fs</p></li></ul>
<p>在开发环境下，由于使用服务器渲染，自然不能使用 webpack-dev-server，而是要用 webpack-dev-middleware。然而，webpack-dev-middleware 所创建的文件都是在内存里的，server 就无法读到 server bundle 文件，这里就要用到 <a href="https://github.com/webpack/memory-fs" rel="nofollow noreferrer" target="_blank">memory-fs</a> 来从内存中读文件。</p>
<ul><li><p>KOA 2</p></li></ul>
<p>用 koa 2 作为服务器时，在 <code>renderToString</code> 或 <code>renderToStream</code> 时，记得外面要加 <code>await</code>，否则，程序就不等组件渲染好，就直接跑下个 middleware 去了。</p>
<p>(奉劝大家不要用 koa 作 SSR 服务器，koa 和 webpack-dev-middleware 天生水土不服，不要问我为什么~?)</p>
<ul><li><p>document</p></li></ul>
<p>在 Server 端渲染时，node 环境下是没有 document 对象的。当一个界面的显示依赖于 document 对象（比如，页面滚动监听事件），那么，在 node 端运行时就会报错。</p>
<p>这时，有两个解决的办法。</p>
<ol>
<li><p>根据运行时的环境变量，通过添加逻辑来判断是否依赖 document</p></li>
<li><p>使用 jsdom mock document 对象（个人偷懒的做法）</p></li>
</ol>
<p>当然，从设计的角度移除对 document 的依赖就最好啦。</p>
<ul><li><p>$root._isMounted：组件中可以用这个参数来判断应用是否为第一次挂载</p></li></ul>
<h3 id="articleHeader5">完成</h3>
<p>这样当浏览器请求时，返回的页面是服务器渲染之后的，浏览器解析后，页面仍就是一个单页应用。</p>
<p>最后，看效果的戳<a href="http://discipled.me/" rel="nofollow noreferrer" target="_blank">这里</a>，看代码的戳<a href="https://github.com/DiscipleD/blog" rel="nofollow noreferrer" target="_blank">这里</a>，原先 SPA 的代码依旧保留在了 <a href="https://github.com/DiscipleD/blog/tree/SPA" rel="nofollow noreferrer" target="_blank">SPA 分支</a>。</p>
<p>对 Vue SSR 有兴趣的童鞋，一定要看看 <a href="https://github.com/vuejs/vue-hackernews-2.0" rel="nofollow noreferrer" target="_blank">vue hackernews 2.0</a>，大神的水准比我可是高多了。</p>
<p>最后的最后，吐槽下 Daocloud，最近老挂我服务器，枉我一直为它说好话。</p>
<p>自己写完，看看感觉好简单，为什么还搞了那么久...</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007753980" src="https://static.alili.tech/img/remote/1460000007753980" alt="" title="" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从单页应用(SPA)到服务器渲染(SSR)

## 原文链接
[https://segmentfault.com/a/1190000007753975](https://segmentfault.com/a/1190000007753975)

