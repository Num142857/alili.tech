---
title: '[使用 Weex 和 Vue 开发原生应用] 7 完整项目目录详解' 
date: 2019-01-16 2:30:08
hidden: true
slug: hsxwccdqkrd
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>系列文章的目录在 ? <a href="https://segmentfault.com/a/1190000008342533">这里</a></p></blockquote>
<p>weex-hackernews 是一个使用 Weex + Vue 开发的原生应用项目，可以实现同一份代码在三端中运行。不仅用到了 Weex 和 Vue.js 的各种特性，也用到了 Vuex 和 vue-router ，在 Web 、 Android 、 iOS 上都能正常工作，作为一个范例供大家参考。</p>
<ul>
<li><p>项目地址：<a href="https://github.com/weexteam/weex-hackernews" rel="nofollow noreferrer" target="_blank">weexteam/weex-hackernews</a></p></li>
<li><p>版本：<a href="https://github.com/weexteam/weex-hackernews/releases/tag/v1.0" rel="nofollow noreferrer" target="_blank">v1.0</a></p></li>
</ul>
<h2 id="articleHeader0">开发环境</h2>
<p>代码仓库中包含了三端的项目，源码都在 <a href="https://github.com/weexteam/weex-hackernews/tree/v1.0/src" rel="nofollow noreferrer" target="_blank">src</a> 目录中。</p>
<p>执行 <code>npm run build</code> 可以将源码打包成 js bundle 供三端使用。代码是使用 Webpack 2 打包的，配置文件是 <a href="https://github.com/weexteam/weex-hackernews/blob/v1.0/webpack.config.js" rel="nofollow noreferrer" target="_blank">webpack.config.js</a>，其中入口文件是 <a href="https://github.com/weexteam/weex-hackernews/blob/v1.0/src/entry.js" rel="nofollow noreferrer" target="_blank">src/entry.js</a> ，输出的文件有两个：一个是针对 web 平台生成的 <code>dist/index.web.js</code>，可以直接通过 <code>&lt;script&gt;</code> 标签引入；另外一个是针对 Android 和 iOS 平台生成的 js bundle 文件，生成在 <code>dist/index.weex.js</code>，可以通过执行 <code>npm run copy</code> 将打包生成后的文件拷贝到原生项目中。</p>
<p>项目还使用了 babel 用于转换 ES6 的代码。</p>
<h3 id="articleHeader1">Web 项目</h3>
<p>Web 平台的入口是 <a href="https://github.com/weexteam/weex-hackernews/blob/v1.0/index.html" rel="nofollow noreferrer" target="_blank">index.html</a>，在安装好依赖之后，可以通过 <code>npm run serve</code> 启动监听 1337 端口，访问 <a href="http://127.0.0.1:1337/index.html" rel="nofollow noreferrer" target="_blank">http://127.0.0.1:1337/index.html</a> 即可打开 Web 应用。</p>
<h3 id="articleHeader2">Android 项目</h3>
<p>Android 项目在 <a href="https://github.com/weexteam/weex-hackernews/tree/v1.0/android" rel="nofollow noreferrer" target="_blank">android</a> 目录中，包含了一个完整的 Android Studio 项目，可以直接用 Android Studio 打开。在打开前要确保开发环境配置正常。</p>
<h3 id="articleHeader3">iOS 项目</h3>
<p>iOS 项目在 <a href="https://github.com/weexteam/weex-hackernews/tree/v1.0/ios" rel="nofollow noreferrer" target="_blank">ios</a> 目录中，是一个标准的 Xcode 项目，使用 Xcode 打开即可。</p>
<p>项目使用了 <a href="https://cocoapods.org/" rel="nofollow noreferrer" target="_blank">CocoaPods</a> 管理依赖，在启动项目之前应该配置好 CocoaPods 命令，然后进入 <code>ios</code> 目录执行以下脚本安装依赖：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pod install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">pod <span class="hljs-keyword">install</span></code></pre>
<h2 id="articleHeader4">项目目录</h2>
<p>android 和 ios 目录中存放着各自平台的原生项目，页面源码都在 <a href="https://github.com/weexteam/weex-hackernews/tree/v1.0/src" rel="nofollow noreferrer" target="_blank">src</a> 目录中。目录说明如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/src
  ├── components/    # 组件
  ├── filters/       # 通用过滤器
  ├── mixins/        # 全局混合
  ├── store/         # 全局的 Store
  ├── views/         # 视图（页面）
  │
  ├── App.vue        # 根组件
  ├── entry.js       # 入口文件
  └── router.js      # 路由配置" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nsis"><code>/src
  ├── <span class="hljs-literal">components</span>/    <span class="hljs-comment"># 组件</span>
  ├── filters/       <span class="hljs-comment"># 通用过滤器</span>
  ├── mixins/        <span class="hljs-comment"># 全局混合</span>
  ├── store/         <span class="hljs-comment"># 全局的 Store</span>
  ├── views/         <span class="hljs-comment"># 视图（页面）</span>
  │
  ├── App.vue        <span class="hljs-comment"># 根组件</span>
  ├── entry.js       <span class="hljs-comment"># 入口文件</span>
  └── router.js      <span class="hljs-comment"># 路由配置</span></code></pre>
<p>更详细的说明如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/src
  ├── components/
  │&nbsp;&nbsp; ├── app-header.vue       # 页面头部导航条
  │&nbsp;&nbsp; ├── comment.vue          # 评论框
  │&nbsp;&nbsp; ├── external-link.vue    # 外部链接
  │&nbsp;&nbsp; └── story.vue            # 单条新闻项
  ├── filters/
  │&nbsp;&nbsp; └── index.js             # 通用过滤器
  ├── mixins/
  │&nbsp;&nbsp; └── index.js             # 全局混合
  ├── store/
  │&nbsp;&nbsp; ├── actions.js           # 操作数据的 Actions
  │&nbsp;&nbsp; ├── fetch.js             # 封装的网络请求接口
  │&nbsp;&nbsp; ├── index.js             # Store 实例
  │&nbsp;&nbsp; └── mutations.js         # 数据的 Mutations
  ├── views/
  │   ├── ArticleView.vue      # 文章页
  │   ├── CommentView.vue      # 评论页
  │   ├── StoriesView.vue      # 新闻列表页
  │   └── UserView.vue         # 用户信息页
  │
  ├── App.vue
  ├── entry.js
  └── router.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>/src
  ├── components/
  │&nbsp;&nbsp; ├── app-header.vue       <span class="hljs-meta"># 页面头部导航条</span>
  │&nbsp;&nbsp; ├── comment.vue          <span class="hljs-meta"># 评论框</span>
  │&nbsp;&nbsp; ├── external-link.vue    <span class="hljs-meta"># 外部链接</span>
  │&nbsp;&nbsp; └── story.vue            <span class="hljs-meta"># 单条新闻项</span>
  ├── filters/
  │&nbsp;&nbsp; └── <span class="hljs-keyword">index</span>.js             <span class="hljs-meta"># 通用过滤器</span>
  ├── mixins/
  │&nbsp;&nbsp; └── <span class="hljs-keyword">index</span>.js             <span class="hljs-meta"># 全局混合</span>
  ├── store/
  │&nbsp;&nbsp; ├── actions.js           <span class="hljs-meta"># 操作数据的 Actions</span>
  │&nbsp;&nbsp; ├── fetch.js             <span class="hljs-meta"># 封装的网络请求接口</span>
  │&nbsp;&nbsp; ├── <span class="hljs-keyword">index</span>.js             <span class="hljs-meta"># Store 实例</span>
  │&nbsp;&nbsp; └── mutations.js         <span class="hljs-meta"># 数据的 Mutations</span>
  ├── views/
  │   ├── ArticleView.vue      <span class="hljs-meta"># 文章页</span>
  │   ├── CommentView.vue      <span class="hljs-meta"># 评论页</span>
  │   ├── StoriesView.vue      <span class="hljs-meta"># 新闻列表页</span>
  │   └── UserView.vue         <span class="hljs-meta"># 用户信息页</span>
  │
  ├── App.vue
  ├── entry.js
  └── router.js</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[使用 Weex 和 Vue 开发原生应用] 7 完整项目目录详解

## 原文链接
[https://segmentfault.com/a/1190000009101907](https://segmentfault.com/a/1190000009101907)

