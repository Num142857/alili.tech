---
title: 'Vue.js仿制的新浪微博网页版，欢迎一起交流！' 
date: 2019-01-10 2:30:08
hidden: true
slug: 78jbamcw392
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">vue-weibo</h1>
<h3 id="articleHeader1"><a href="https://github.com/JuniorTour/vue-weibo" rel="nofollow noreferrer" target="_blank">vue-weibo的GitHub仓库地址</a></h3>
<p>这是一个用Vue.js及相关插件模仿制作<a>新浪微博移动版(m.weibo.cn)</a>的单页应用（SPA）项目。</p>
<p>使用了<code>vue-cli</code>作为搭建工具，主要使用了<code>vue.js@2.3.3</code>,<code>vue-resource@1.3.4</code>,<code>vue-router@2.3.1</code>,<code>vuex@2.3.1</code>等工具。</p>
<p>欢迎Issue、PR、邮件、微博等等各种交流！更欢迎给我点个赞以示鼓励，谢谢你！</p>
<h1 id="articleHeader2">预览demo：</h1>
<h3 id="articleHeader3"><a href="http://juniortour.net:8080" rel="nofollow noreferrer" target="_blank">vue-weibo在线demo地址</a></h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010793716" src="https://static.alili.tech/img/remote/1460000010793716" alt="vue-weibo在线地址二维码" title="vue-weibo在线地址二维码" style="cursor: pointer;"></span></p>
<h2 id="articleHeader4">动图预览：</h2>
<h3 id="articleHeader5">基本功能：</h3>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010793717" src="https://static.alili.tech/img/remote/1460000010793717" alt="vue-weibo动图预览" title="vue-weibo动图预览" style="cursor: pointer;"></span></p>
<h2 id="articleHeader6">路由、点赞动画、涟漪效果等演示：</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010793718" src="https://static.alili.tech/img/remote/1460000010793718" alt="vue-weibo动图预览-2" title="vue-weibo动图预览-2" style="cursor: pointer;"></span></p>
<h1 id="articleHeader7">基本功能：</h1>
<p>刷新微博、加载旧微博、简单图片预览（准备实现缩放等手势功能）、Tab页面切换、后台模拟数据、生产环境服务器支持、登录页面、404页面等...</p>
<h1 id="articleHeader8">运行项目：</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://github.com/JuniorTour/vue-weibo.git

cd vue-weibo

npm install       //推荐使用 cnpm 淘宝NPM镜像安装更快！

npm run dev     //开发环境中运行，构建完成后，自动访问http://localhost:8080/，自带热更新，便于开发。

npm run prod  //或生产环境中运行，资源经过压缩，访问更快。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code class="nodejs">git clone https:<span class="hljs-comment">//github.com/JuniorTour/vue-weibo.git</span>

<span class="hljs-keyword">cd</span> vue-weibo

npm install       <span class="hljs-comment">//推荐使用 cnpm 淘宝NPM镜像安装更快！</span>

npm <span class="hljs-keyword">run</span> dev     <span class="hljs-comment">//开发环境中运行，构建完成后，自动访问http://localhost:8080/，自带热更新，便于开发。</span>

npm <span class="hljs-keyword">run</span> prod  <span class="hljs-comment">//或生产环境中运行，资源经过压缩，访问更快。</span></code></pre>
<h1 id="articleHeader9">配套教程</h1>
<p>目前代码关键部分中已经有相应的注释介绍，稍后，我会详细地写出从0构建这个项目的过程，敬请期待！</p>
<p>如果你对此有任何意见和想法，都欢迎通过各种方式和我交流！ヾ(✿ﾟ▽ﾟ)ノ</p>
<h1 id="articleHeader10">To-do List:</h1>
<ol>
<li>
<del>点赞动画特效！</del>  -2017/7/18</li>
<li>滑动删除消息</li>
<li>图片预览手势支持</li>
<li>配套教程文章</li>
<li>local storage/service worker</li>
<li>
<del>IOS手机添加至桌面功能</del> -2017/7/8</li>
<li>
<del>登录页面、404页面及相应的路由</del> -2017/7/6</li>
<li>
<del>ripple effect</del>  -2017/7/8~</li>
<li>......</li>
</ol>
<h1 id="articleHeader11">项目结构：</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── build/                      # webpack config files
│   └── ...
├── config/
│   ├── index.js                # main project config
│   └── ...
├── notes/
│   └── ...                       # 制作过程中的一些笔记。
├── src/
│   ├── assets/             # 字体、样式等module 资源 (会被webpack处理)
│   │   └── ...
│   ├── components/     # 局部组件
│   │   └── ...
│   ├── data/                 # 模拟数据
│   │   └── ...
│   ├── pages/               # 主要页面组件
│   │   └── ...
│   ├── main.js                # app 入口文件
│   ├── App.vue              # 主要app组件
├── static/                      # 图片等纯静态资源
├── test/
│   └── unit/                   # unit tests
│      ├── specs/              # test spec files
│      ├── index.js            # test build entry file
│      └── karma.conf.js       # test runner config file
├── .babelrc                    # babel config
├── .postcssrc.js               # postcss config
├── .eslintrc.js                # eslint config
├── .editorconfig               # editor config
├── index.html                  # index.html template
└── package.json                # build scripts and dependencies" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>.
├── build/                      # webpack config files
│   └── ...
├── config/
│   ├── index.js                # main project config
│   └── ...
├── notes/
│   └── ...                       # 制作过程中的一些笔记。
├── src/
│   ├── assets/             # 字体、样式等<span class="hljs-keyword">module</span> 资源 (会被webpack处理)
│   │   └── ...
│   ├── components/     # 局部组件
│   │   └── ...
│   ├── data/                 # 模拟数据
│   │   └── ...
│   ├── pages/               # 主要页面组件
│   │   └── ...
│   ├── main.js                # app 入口文件
│   ├── App.vue              # 主要app组件
├── static/                      # 图片等纯静态资源
├── test/
│   └── unit/                   # unit tests
│      ├── specs/              # test spec files
│      ├── index.js            # test build entry file
│      └── karma.conf.js       # test runner config file
├── .babelrc                    # babel config
├── .postcssrc.js               # postcss config
├── .eslintrc.js                # eslint config
├── .editorconfig               # editor config
├── index.html                  # index.html template
└── package.json                # build scripts and dependencies</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js仿制的新浪微博网页版，欢迎一起交流！

## 原文链接
[https://segmentfault.com/a/1190000010043484](https://segmentfault.com/a/1190000010043484)

