---
title: 'Vue-Donut——专用于构建Vue的UI组件库的开发框架' 
date: 2019-01-15 2:30:12
hidden: true
slug: qvew15zu7qj
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVNais?w=1226&amp;h=1159" src="https://static.alili.tech/img/bVNais?w=1226&amp;h=1159" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>相信不少使用Vue的开发者和公司都有定制一套属于自己的UI组件库的需求。但是要开发、测试、打包、发布这个组件库，却需要耗费较大的劳动力去搭建一整套的环境。针对这个问题，我搭建了一个专门用来构建Vue的UI组件库的开发框架，以节省搭建环境的劳动力，专心于组件库的开发。</p>
<h1 id="articleHeader0">一、介绍</h1>
<p>项目地址：<a href="https://github.com/jrainlau/vue-donut" rel="nofollow noreferrer" target="_blank">https://github.com/jrainlau/v...</a></p>
<p><code>Vue-Donut</code>是一个开发框架，配合<code>vue-cli</code>使用。所以首先保证全局安装有<code>vue-cli</code>。接下来就可以初始化我们的项目了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue init jrainlau/vue-donut <项目名>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;">vue init jrainlau/vue-donut <span class="hljs-tag">&lt;<span class="hljs-name">项目名</span>&gt;</span></code></pre>
<p>类似官方的<a href="https://github.com/vuejs-templates/webpack" rel="nofollow noreferrer" target="_blank">vuejs-templates/webpack</a>模板，<code>Vue-Donut</code>也允许用户进行一些配置。在配置完成后则会生成你的组件库目录。值得注意的是，这个组件库最终发布的名字也是你所自定义的项目名（当然这些都是可以修改的）。</p>
<p>接下来按照提示，进入项目目录后，通过<code>yarn</code>命令下载所需依赖包即可开始使用。</p>
<p>目录结构如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── index.html
├── package.json
├── src
│&nbsp;&nbsp; ├── app.vue
│&nbsp;&nbsp; ├── assets
│&nbsp;&nbsp; │&nbsp;&nbsp; └── donut.jpg
│&nbsp;&nbsp; ├── components
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── content.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── header.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── index.js
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── link.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; └── title.vue
│&nbsp;&nbsp; └── main.js
└── webapck
    ├── build.js
    ├── dev.js
    ├── doc.js
    ├── webpack.base.config.js
    ├── webpack.build.config.js
    ├── webpack.dev.config.js
    └── webpack.doc.config.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>.
├── <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.html</span>
├── <span class="hljs-selector-tag">package</span><span class="hljs-selector-class">.json</span>
├── <span class="hljs-selector-tag">src</span>
│&nbsp;&nbsp; ├── <span class="hljs-selector-tag">app</span><span class="hljs-selector-class">.vue</span>
│&nbsp;&nbsp; ├── <span class="hljs-selector-tag">assets</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; └── <span class="hljs-selector-tag">donut</span><span class="hljs-selector-class">.jpg</span>
│&nbsp;&nbsp; ├── <span class="hljs-selector-tag">components</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">content</span><span class="hljs-selector-class">.vue</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">header</span><span class="hljs-selector-class">.vue</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">index</span><span class="hljs-selector-class">.js</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── <span class="hljs-selector-tag">link</span><span class="hljs-selector-class">.vue</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; └── <span class="hljs-selector-tag">title</span><span class="hljs-selector-class">.vue</span>
│&nbsp;&nbsp; └── <span class="hljs-selector-tag">main</span><span class="hljs-selector-class">.js</span>
└── <span class="hljs-selector-tag">webapck</span>
    ├── <span class="hljs-selector-tag">build</span><span class="hljs-selector-class">.js</span>
    ├── <span class="hljs-selector-tag">dev</span><span class="hljs-selector-class">.js</span>
    ├── <span class="hljs-selector-tag">doc</span><span class="hljs-selector-class">.js</span>
    ├── <span class="hljs-selector-tag">webpack</span><span class="hljs-selector-class">.base</span><span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span>
    ├── <span class="hljs-selector-tag">webpack</span><span class="hljs-selector-class">.build</span><span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span>
    ├── <span class="hljs-selector-tag">webpack</span><span class="hljs-selector-class">.dev</span><span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span>
    └── <span class="hljs-selector-tag">webpack</span><span class="hljs-selector-class">.doc</span><span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span></code></pre>
<h1 id="articleHeader1">二、命令</h1>
<ul>
<li>
<p><code>yarn run dev</code>：开发模式</p>
<ul><li><p>通过<code>webpack-dev-server</code>开启一个测试服务器，就和官方的<a href="https://github.com/vuejs-templates/webpack" rel="nofollow noreferrer" target="_blank">vuejs-templates/webpack</a>模板里面的一样。</p></li></ul>
</li>
<li>
<p><code>yarn run build</code>：打包及发布模式</p>
<ul>
<li><p>这个命令会以<code>src/components/index.js</code>为入口文件，通过<code>webpack</code>构建后产出到<code>dist</code>目录。</p></li>
<li><p><code>dist/index.js</code>就是你接下来将会发布到<code>npm</code>上面的包。</p></li>
<li><p>你应该熟练掌握<a href="https://vuejs.org/v2/guide/plugins.html#Writing-a-Plugin" rel="nofollow noreferrer" target="_blank">如何编写vue的插件</a></p></li>
<li>
<p><code>src/components/index.js</code>入口文件应该长成下面这个样子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import myComponent from './my-component.vue'

const install = (Vue) => {
  Vue.component('my-componen', myComponent)
}

export default install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-keyword">import</span> myComponent <span class="hljs-keyword">from</span> <span class="hljs-string">'./my-component.vue'</span>

const install = <span class="hljs-function"><span class="hljs-params">(Vue)</span> =&gt;</span> {
  Vue.component(<span class="hljs-string">'my-componen'</span>, myComponent)
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> install</code></pre>
</li>
</ul>
</li>
<li>
<p><code>yarn run build</code>：文档模式</p>
<ul>
<li><p>通过运行<code>yarn run dev</code>，你所开发的就像是一个普通的单页应用，这也类似于组件库的官方文档页面。当开发完成后，你可以通过这条命令打包你的应用。<code>app.[hash].js</code>, <code>vendor.[hash].js</code>和<code>manifest.[hash].js</code>，以及独立的<code>css</code>文件都会被打包到<code>docs</code>文件夹。</p></li>
<li><p>source map <code>*.[hash].map</code>会被自动生成。</p></li>
<li><p>可以方便地直接使用<code>docs</code>目录作为<code>github pages</code>的资源目录。</p></li>
</ul>
</li>
</ul>
<h1 id="articleHeader2">三、注意事项</h1>
<p><code>Vue-Donut</code>默认使用<code>less</code>作为预处理器，如果需要用其他预处理器，可以自定义配置。</p>
<p>测试同理。</p>
<h1 id="articleHeader3">四、证书</h1>
<p>MIT</p>
<h1 id="articleHeader4">一些碎碎念</h1>
<p>在工作的过程中，遇到了搭建UI组件库的需求。开发不难，麻烦的是如何在项目中引入使用。首先我们尝试了使用git的<code>submodule</code>方案，就是把UI组件库直接作为项目的子模块使用。另外一种方式，是把整个组件库发布到npm，然后在<code>webpack.module.rules</code>的<code>exclude</code>里面通过正则或者函数的方式，使用项目的webpack配置去跑组件库的代码。这两种方式都不那么优雅，思考再三，最后决定搭个更加方便优雅的开发框架来。</p>
<p>在此之前，对于webpack的使用及配置仅处于“看得懂”的程度，但从未真正从头开始搭过。在搭建的过程中也遇到了不少坑，但通过查阅官方文档大都能获得解决办法，实在不行还有万能的google和stackoverflow。搭的过程中也参考了很多优秀的实践，比如公司前辈的搭建方式，以及vue-cli官方出品的搭建方式等，搭完后对webpack的掌握也得到了极大的提升。</p>
<p>希望这个作品能够发挥能效，也欢迎提出问题和建议和我交流~</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue-Donut——专用于构建Vue的UI组件库的开发框架

## 原文链接
[https://segmentfault.com/a/1190000009295452](https://segmentfault.com/a/1190000009295452)

