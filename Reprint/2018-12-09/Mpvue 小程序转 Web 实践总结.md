---
title: 'Mpvue 小程序转 Web 实践总结' 
date: 2018-12-09 2:30:08
hidden: true
slug: wnqa5bc4rhe
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">介绍</h2>
<p><a href="https://github.com/Meituan-Dianping/mpvue" rel="nofollow noreferrer" target="_blank">Mpvue</a> 是一个使用 Vue.js 开发小程序的前端框架。框架基于 Vue.js 核心，修改了 Vue.js 的 runtime 和 compiler 实现，使其可以运行在小程序环境中，从而为小程序开发引入了整套 Vue.js 开发体验，同样也使得一套代码同时复用在小程序和 Web 中成为可能。本文将以 <a href="https://github.com/F-loat/ithome-lite" rel="nofollow noreferrer" target="_blank">IT之家Lite</a> 小程序的 Web 转换经过为线索，大致介绍一下转换的基本步骤及需要注意的一些事项。</p>
<h2 id="articleHeader1">目录结构</h2>
<blockquote>省略了部分与转换无关的文件</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├─build
├─config
├─src
│ ├─components
│ ├─pages
│ ├─store
│ ├─styles
│ ├─utils
│ │  ├─api.js
│ │  ├─index.js
│ │  ├─request.js
│ │  └─wx.js
│ ├─App.vue
│ └─main.js
├─package-lock.json
└─package.json" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>├─build
├─config
├─src
│ ├─components
│ ├─pages
│ ├─store
│ ├─styles
│ ├─utils
│ │  ├─api<span class="hljs-selector-class">.js</span>
│ │  ├─index<span class="hljs-selector-class">.js</span>
│ │  ├─request<span class="hljs-selector-class">.js</span>
│ │  └─wx<span class="hljs-selector-class">.js</span>
│ ├─App<span class="hljs-selector-class">.vue</span>
│ └─main<span class="hljs-selector-class">.js</span>
├─package-lock<span class="hljs-selector-class">.json</span>
└─package.json</code></pre>
<h2 id="articleHeader2">转换步骤</h2>
<p>0.前期准备</p>
<ul>
<li>建议使用 git 进行分支管理</li>
<li>尽量避免使用不必要的小程序特有标签，如 text，image 等 <a href="https://github.com/F-loat/ithome-lite/commit/9137744e25000cbaa82529639976b3ddea3b5f1b" rel="nofollow noreferrer" target="_blank">#9137744</a>
</li>
<li>避免直接使用 wx 对象，使用 <code>import wx from 'wx'</code> 的方式引入，便于 web 中改写 <a href="https://github.com/F-loat/ithome-lite/commit/c3ef6e771dc6e767fed9316fd62bed53581763f2" rel="nofollow noreferrer" target="_blank">#c3ef6e7</a>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/utils/wx.js
export default wx" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/utils/wx.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> wx</code></pre>
<ul>
<li>使用 <a href="https://github.com/wendux/fly" rel="nofollow noreferrer" target="_blank">flyio</a> 作为请求库，配置 alias 将 flyio 指向 <code>flyio/dist/npm/wx</code>
</li>
<li>基于原分支新建 web-version 分支</li>
</ul>
<p>1.修改打包配置</p>
<ul>
<li>可以在原有配置基础上修改，主要涉及 entry、target 及 loader 相关的配置项，这里我直接通过 vue-cli 生成了一个新的项目，复制 build、config 文件夹及 eslint、babel 等的配置文件替换原有配置，使用新项目的 package.json 并做相应修改，新建项目时各选项尽量与原项目保持一致 <a href="https://github.com/F-loat/ithome-lite/commit/ece3a76590df79a3ee19e2fa0a4c7ce07cb77227" rel="nofollow noreferrer" target="_blank">#ece3a76</a>
</li>
<li>修改 main.js，指定挂载元素，顺利的话，这步之后执行 <code>npm run dev</code> 便已经可以跑起来了，有报错的话解决相应错误即可</li>
</ul>
<p>2.配置路由</p>
<ul>
<li>添加 vue-router，并进行相应配置，建议使用 history 模式 <a href="https://github.com/F-loat/ithome-lite/commit/ddf94bca7d432ee7ac436f74ed27b4d6bf482e6e" rel="nofollow noreferrer" target="_blank">#ddf94bc</a>
</li>
<li>修改路由参数获取相关的代码 <a href="https://github.com/F-loat/ithome-lite/commit/b9491979a07940cfb9dd690fb26833cc71d0184d" rel="nofollow noreferrer" target="_blank">#b949197</a>
</li>
<li>使用 router-link 替换 a 标签，避免页面重载 <a href="https://github.com/F-loat/ithome-lite/commit/eb092972647bb6d903f02bba3c6e38335d1b8b90" rel="nofollow noreferrer" target="_blank">#eb09297</a>
</li>
</ul>
<p>3.调整请求接口</p>
<ul>
<li>配置 alias 将 flyio 指向 <code>flyio/dist/npm/fly</code>
</li>
<li>小程序中不会有跨域的问题，但 web 中需配合后端进行请求转发或通过其他方式来解决这一问题 <a href="https://github.com/F-loat/ithome-lite/commit/f96397539da68b31d05bc7c84b9208b565d3fc55" rel="nofollow noreferrer" target="_blank">#f963975</a>
</li>
</ul>
<p>4.转换小程序组件及 API</p>
<ul><li>底部导航栏，自己布局实现 <a href="https://github.com/F-loat/ithome-lite/commit/8d6d98bb477cd001c1f0168b5b13e7a77bdf56cb" rel="nofollow noreferrer" target="_blank">#8d6d98b</a>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".nav(v-if=&quot;$route.meta.nav&quot;)
  a.nav-item(href=&quot;/pages/news/list&quot;)
    img.nav-icon(v-if=&quot;$route.name === 'NewsList'&quot;, src=&quot;/static/assets/news-active.png&quot;)
    img.nav-icon(v-else, src=&quot;/static/assets/news.png&quot;)
    .nav-title(:class=&quot;{ active: $route.name === 'NewsList' }&quot;) 资讯
  a.nav-item(href=&quot;/pages/quanzi/list&quot;)
    img.nav-icon(v-if=&quot;$route.name === 'QuanziList'&quot;, src=&quot;/static/assets/quanzi-active.png&quot;)
    img.nav-icon(v-else, src=&quot;/static/assets/quanzi.png&quot;)
    .nav-title(:class=&quot;{ active: $route.name === 'QuanziList' }&quot;) 圈子" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="pug">.nav(v-<span class="hljs-keyword">if</span>=<span class="hljs-string">"$route.meta.nav"</span>)
  <span class="hljs-selector-tag">a</span>.nav-item(href=<span class="hljs-string">"/pages/news/list"</span>)
    <span class="hljs-selector-tag">img</span>.nav-<span class="hljs-attribute">icon</span>(v-if=<span class="hljs-string">"$route.name === 'NewsList'"</span>, src=<span class="hljs-string">"/static/assets/news-active.png"</span>)
    <span class="hljs-selector-tag">img</span>.nav-<span class="hljs-attribute">icon</span>(v-else, src=<span class="hljs-string">"/static/assets/news.png"</span>)
    .nav-title(:class=<span class="hljs-string">"{ active: $route.name === 'NewsList' }"</span>) 资讯
  <span class="hljs-selector-tag">a</span>.nav-item(href=<span class="hljs-string">"/pages/quanzi/list"</span>)
    <span class="hljs-selector-tag">img</span>.nav-<span class="hljs-attribute">icon</span>(v-if=<span class="hljs-string">"$route.name === 'QuanziList'"</span>, src=<span class="hljs-string">"/static/assets/quanzi-active.png"</span>)
    <span class="hljs-selector-tag">img</span>.nav-<span class="hljs-attribute">icon</span>(v-else, src=<span class="hljs-string">"/static/assets/quanzi.png"</span>)
    .nav-title(:class=<span class="hljs-string">"{ active: $route.name === 'QuanziList' }"</span>) 圈子</code></pre>
<ul>
<li>rich-text 组件，使用 v-html 实现 <a href="https://github.com/F-loat/ithome-lite/commit/1945f3f7bbe62b9a6913701910775739ac433909" rel="nofollow noreferrer" target="_blank">#1945f3f</a>
</li>
<li>swiper 组件，使用 <a href="https://github.com/zwhGithub/vue-swiper" rel="nofollow noreferrer" target="_blank">vue-swiper-component</a> 实现 <a href="https://github.com/F-loat/ithome-lite/commit/f4a4e1a094d08a274782ef19e0e5361f5d546557" rel="nofollow noreferrer" target="_blank">#f4a4e1a</a>
</li>
<li>toast 及 loading 接口，使用 <a href="https://github.com/lin-xin/vue-toast" rel="nofollow noreferrer" target="_blank">vue2-toast</a> 实现 <a href="https://github.com/F-loat/ithome-lite/commit/cb1d9d3f75e9fbf42d2b98f80a51e124de52a38c" rel="nofollow noreferrer" target="_blank">#cb1d9d3</a>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// src/utils/wx.js
import Vue from 'vue'

export default {
  showNavigationBarLoading () {
    Vue.prototype.$loading('加载中')
  },
  hideNavigationBarLoading () {
    Vue.prototype.$loading.close()
  },
  showToast ({ title }) {
    Vue.prototype.$toast.center(title)
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// src/utils/wx.js</span>
<span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  showNavigationBarLoading () {
    Vue.prototype.$loading(<span class="hljs-string">'加载中'</span>)
  },
  hideNavigationBarLoading () {
    Vue.prototype.$loading.close()
  },
  showToast ({ title }) {
    Vue.prototype.$toast.center(title)
  }
}</code></pre>
<ul><li>下拉刷新及上拉加载，使用 <a href="https://github.com/stackjie/vue-pull-to" rel="nofollow noreferrer" target="_blank">vue-pull-to</a> 实现 <a href="https://github.com/F-loat/ithome-lite/commit/38647dba1f4552cb1fb316ba00e33170b4330102" rel="nofollow noreferrer" target="_blank">#38647db</a>
</li></ul>
<p>5.Web 优化</p>
<ul>
<li>使用 <a href="https://github.com/jgthms/minireset.css" rel="nofollow noreferrer" target="_blank">minireset</a> 重置浏览器默认样式，部分标签在小程序中的默认样式与浏览器不同，也需进行处理 <a href="https://github.com/F-loat/ithome-lite/commit/e98f5ba8cdced6cbe0c9a14beb22ecd457884123" rel="nofollow noreferrer" target="_blank">#e98f5ba</a>
</li>
<li>引入 <a href="https://github.com/babel/babel/tree/master/packages/babel-polyfill" rel="nofollow noreferrer" target="_blank">babel-polyfill</a>，提高兼容性 <a href="https://github.com/F-loat/ithome-lite/commit/c1841663bf56c308229380f4400bd68b4c54b2b3" rel="nofollow noreferrer" target="_blank">#c184166</a>
</li>
</ul>
<h2 id="articleHeader3">维护</h2>
<p>在初步完成 Web 版的转换之后，便可以再次切换回主分支，后续的 feature 及 bugfix 均在主分支进行，待主分支发版后切换到 web 分支进行一次合并操作，可能会产生少量冲突，但也都会比较容易解决，最后处理下新引入的小程序特性即可，整体而言可维护性还是比较好的</p>
<h2 id="articleHeader4">总结</h2>
<p>整个转换过程还是比较顺利的，主体部分约 1 个多小时完成，相对于小程序 web 的环境更为开放，所以大部分小程序的 api 可以通过各种方式模拟，由于是在两个不同的分支进行，也可以放心地使用各种浏览器端地特性，下面是几点开发及转换中的建议：</p>
<ul><li>下拉刷新及上拉加载尽量以 method 的形式实现，便于 web 中复用</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="onPullDownRefresh () {
  this.refresh()
},
onReachBottom () {
  this.loadmore()
},
methods: {
  ...mapActions([
    'getSlides',
    'getNews'
  ]),
  async refresh () {
    await Promise.all([
      this.getNews({ r: 2, init: true }),
      this.getSlides()
    ])
    wx.stopPullDownRefresh()
  },
  loadmore () {
    const { news } = this
    const lastnews = news[news.length - 1]
    this.getNews({ r: Date.parse(new Date(lastnews.postdate)) })
  },
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">onPullDownRefresh () {
  <span class="hljs-keyword">this</span>.refresh()
},
onReachBottom () {
  <span class="hljs-keyword">this</span>.loadmore()
},
<span class="hljs-attr">methods</span>: {
  ...mapActions([
    <span class="hljs-string">'getSlides'</span>,
    <span class="hljs-string">'getNews'</span>
  ]),
  <span class="hljs-keyword">async</span> refresh () {
    <span class="hljs-keyword">await</span> <span class="hljs-built_in">Promise</span>.all([
      <span class="hljs-keyword">this</span>.getNews({ <span class="hljs-attr">r</span>: <span class="hljs-number">2</span>, <span class="hljs-attr">init</span>: <span class="hljs-literal">true</span> }),
      <span class="hljs-keyword">this</span>.getSlides()
    ])
    wx.stopPullDownRefresh()
  },
  loadmore () {
    <span class="hljs-keyword">const</span> { news } = <span class="hljs-keyword">this</span>
    <span class="hljs-keyword">const</span> lastnews = news[news.length - <span class="hljs-number">1</span>]
    <span class="hljs-keyword">this</span>.getNews({ <span class="hljs-attr">r</span>: <span class="hljs-built_in">Date</span>.parse(<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>(lastnews.postdate)) })
  },
}</code></pre>
<ul><li>样式及脚本尽量不要直接修改原有代码，可通过 mixin、新建 style 标签等方式实现，避免造成冲突</li></ul>
<h2 id="articleHeader5">展望</h2>
<ul>
<li>双端统一的 UI 库，目前来看只能使用一些简单的 css 类库</li>
<li>更好的路由支持，理想状态下，可以通过 vue-router 的配置文件自动生成各页面的 main.js 文件，并配置 entry，开发 .vue 文件时，可以直接使用 <code>this.$route</code> <code>this.$router</code> 及 <code>router-link</code> 完成相关操作，避免每次手动修改</li>
</ul>
<h2 id="articleHeader6">附</h2>
<ol><li>Git 仓库</li></ol>
<ul>
<li>Mpvue：<a href="https://github.com/Meituan-Dianping/mpvue" rel="nofollow noreferrer" target="_blank">https://github.com/Meituan-Dianping/mpvue</a>
</li>
<li>IT之家Lite：<a href="https://github.com/F-loat/ithome-lite" rel="nofollow noreferrer" target="_blank">https://github.com/F-loat/ithome-lite</a>
</li>
</ul>
<ol><li>Demo</li></ol>
<ul><li>IT之家Lite Web 版: <a href="http://ithome.f-loat.xyz" rel="nofollow noreferrer" target="_blank">http://ithome.f-loat.xyz</a>
</li></ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Mpvue 小程序转 Web 实践总结

## 原文链接
[https://segmentfault.com/a/1190000013977813](https://segmentfault.com/a/1190000013977813)

