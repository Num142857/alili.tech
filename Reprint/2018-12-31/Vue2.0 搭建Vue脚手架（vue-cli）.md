---
title: 'Vue2.0 搭建Vue脚手架（vue-cli）' 
date: 2018-12-31 2:30:29
hidden: true
slug: 7cljh7vm1s3
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">介绍</h2>
<p>Vue.js是一套构建用户界面的渐进式框架。<br>Vue 只关注视图层，采用自底向上增量开发的设计。<br>Vue 的目标是通过尽可能简单的 API 实现响应的数据绑定和组合的视图组件。</p>
<hr>
<h2 id="articleHeader1">阅读之前需要了解的知识</h2>
<ul>
<li>htnl</li>
<li>css</li>
<li>javascript</li>
<li>node.js环境(npm包管理工具）</li>
<li>webpack打包工具</li>
</ul>
<hr>
<h2 id="articleHeader2">安装node.js</h2>
<p>从<a href="https://nodejs.org/en/" rel="nofollow noreferrer" target="_blank">node官网</a>下载并安装node，安装步骤很简单，只要一路“next”就可以了。<br>安装完成后，打开命令行工具输入命令<strong><em>node -v</em></strong>，如下图，如果出现对应版本号，就说明安装成功了。 </p>
<p><span class="img-wrap"><img data-src="/img/bVVteQ?w=370&amp;h=82" src="https://static.alili.tech/img/bVVteQ?w=370&amp;h=82" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>我们所需要的npm包管理器，是集成在node中的，所以，直接输入<strong><em>npm -v</em></strong>就会如下图所示，显示出npm的版本信息。</p>
<p><span class="img-wrap"><img data-src="/img/bVVtfT?w=360&amp;h=85" src="https://static.alili.tech/img/bVVtfT?w=360&amp;h=85" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>到这里node的环境已经安装完了,npm包管理工具也有了，但是由于npm的有些资源被墙，为了更快更稳定,所以我们需要切换到淘宝的npm镜像——cnpm。</p>
<hr>
<h2 id="articleHeader3">安装cnpm</h2>
<p>点击进入淘宝的<a href="http://npm.taobao.org/" rel="nofollow noreferrer" target="_blank">cnpm</a>网站,里面有详细的配置方法。<br>或者直接在命令行输入：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install -g cnpm --registry=https://registry.npm.taobao.org" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;">$ <span class="hljs-built_in">npm</span> install -g cnpm --registry=https:<span class="hljs-regexp">//</span>registry.<span class="hljs-built_in">npm</span>.taobao.org</code></pre>
<p>然后等待，安装完成。</p>
<p>输入cnpm -v，可以查看当前cnpm版本，这个和npm的版本还是不一样的。</p>
<p><span class="img-wrap"><img data-src="/img/bVVtiR?w=939&amp;h=196" src="https://static.alili.tech/img/bVVtiR?w=939&amp;h=196" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>使用cnpm的方法就是，需要用到npm的地方直接使用cnpm替换就可以了</p>
<hr>
<h2 id="articleHeader4">vue安装</h2>
<p>在用 vue.js 构建大型应用时推荐使用 npm 安装，npm 能很好地和诸如 webpack 或 browserify 模块打包器配合使用。vue.js 也提供配套工具来开发单文件组件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ cnpm install vue

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code>$ cnpm <span class="hljs-keyword">install</span> vue

</code></pre>
<hr>
<h2 id="articleHeader5">安装vue-cli脚手架构建工具</h2>
<p>vue-cli 提供一个官方命令行工具，可用于快速搭建大型单页应用。该工具提供开箱即用的构建工具配置，带来现代化的前端开发流程。只需几分钟即可创建并启动一个带热重载、保存时静态检查以及可用于生产环境的构建配置的项目：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 全局安装 vue-cli
$ cnpm install --global vue-cli
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code># 全局安装 vue-<span class="hljs-keyword">cli</span>
$ cnpm install --<span class="hljs-keyword">global</span> vue-<span class="hljs-keyword">cli</span>
</code></pre>
<hr>
<h2 id="articleHeader6">创建一个基于 webpack 模板的新项目</h2>
<p>要创建项目，首先我们要选定目录，然后再命令行中把目录转到选定的目录。可以使用：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#my-project为自定义项目名
$ vue init webpack my-project" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code><span class="hljs-comment">#my-project为自定义项目名</span>
$ vue init webpack <span class="hljs-keyword">my</span>-project</code></pre>
<p>初始化一个项目，或使用</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" $ vue init webpack-simple my-project" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;"> $ vue init webpack-simple <span class="hljs-keyword">my</span>-project</code></pre>
<p>初始化一个简单的项目</p>
<p><span class="img-wrap"><img data-src="/img/bVVtwi?w=234&amp;h=451" src="https://static.alili.tech/img/bVVtwi?w=234&amp;h=451" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVVtv7?w=216&amp;h=228" src="https://static.alili.tech/img/bVVtv7?w=216&amp;h=228" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>运行初始化命令的时候回让用户输入几个基本的选项，如项目名称，描述，作者等信息，如果不想填直接回车默认就好。</p>
<p><span class="img-wrap"><img data-src="/img/bVVUo9?w=406&amp;h=187" src="https://static.alili.tech/img/bVVUo9?w=406&amp;h=187" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><strong>需要注意的是项目的名称不能大写，不然会报错。</strong></p>
<p>Project name (my-project) # 项目名称（我的项目）</p>
<p>Project description (A Vue.js project) # 项目描述一个Vue.js 项目</p>
<p>Author 作者（你的名字）</p>
<p>Install vue-router? (Y/n)      # 是否安装Vue路由，也就是以后是spa（但页面应用需要的模块）</p>
<p>Use ESLint to lint your code? (Y/n) # 使用 ESLint 到你的代码？ （Y [ yes ] / N [ no ]）</p>
<p>Pick an ESLint preset (Use arrow keys) # 选择一个预置ESLint（使用箭头键）</p>
<p>Setup unit tests with Karma + Mocha? (Y/n) # 设置单元测Karma + Mocha？ （Y/ N）</p>
<p>Setup e2e tests with Nightwatch? (Y/n) # 设置端到端测试，Nightwatch？ （Y/ N）</p>
<p>当然这些都看你自己个人的情况，我这里是全选了是。</p>
<hr>
<h2 id="articleHeader7">安装项目所需要的依赖</h2>
<p>刚初始化的项目是没有依赖的，如果运行会报类似这样的错误，</p>
<p><span class="img-wrap"><img data-src="/img/bVVvxN?w=854&amp;h=400" src="https://static.alili.tech/img/bVVvxN?w=854&amp;h=400" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>所以在这之前需要解决项目的依赖问题，使用下面的命令安装项目的依赖。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" $ cnpm install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;"> $ cnpm <span class="hljs-keyword">install</span></code></pre>
<p>如果出现如下图情况，说明依赖解决成功。</p>
<p><span class="img-wrap"><img data-src="/img/bVVvyz?w=1561&amp;h=375" src="https://static.alili.tech/img/bVVvyz?w=1561&amp;h=375" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<hr>
<h2 id="articleHeader8">运行项目</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ cnpm run dev
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>$ cnpm <span class="hljs-keyword">run</span><span class="bash"> dev
</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVVtyG?w=1386&amp;h=749" src="https://static.alili.tech/img/bVVtyG?w=1386&amp;h=749" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>如果看到这个界面，说明配置成功</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue2.0 搭建Vue脚手架（vue-cli）

## 原文链接
[https://segmentfault.com/a/1190000011275993](https://segmentfault.com/a/1190000011275993)

