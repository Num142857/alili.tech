---
title: 'vue — 创建vue项目' 
date: 2018-12-07 2:30:09
hidden: true
slug: qh28bvrbogh
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">创建vue项目</h2>
<p>在程序开发中，有三种方式创建vue项目，本地引入vuejs、使用cdn引入vuejs、使用vue-cli创建vue项目。其中vue-cli可以结合webpack打包工具使用，大大方便了开发步骤，使用广泛。</p>
<h1 id="articleHeader1">vue本地引用</h1>
<p>在官网下载vue.js，通过script标签引入。<br>开发版本：<a href="https://vuejs.org/js/vue.js" rel="nofollow noreferrer" target="_blank">https://vuejs.org/js/vue.js</a> 包含完整的警告和调试模式<br>生产版本：<a href="https://vuejs.org/js/vue.min.js" rel="nofollow noreferrer" target="_blank">https://vuejs.org/js/vue.min.js</a> 删除了警告，30.90KB min+gzip<br>注意：在开发环境下不要使用压缩版本，不然你就失去了所有常见错误相关的警告！ vue.min.js，这是一个更小的构建，可以带来比开发环境下更快的速度体验。</p>
<h1 id="articleHeader2">通过cdn方法引用</h1>
<ul>
<li>jsdelivr，链接到一个你可以手动更新的指定版本号。可以在 cdn.jsdelivr.net/npm/vue 浏览 NPM 包的源代码。<br>   &lt;script src="<a href="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js&amp;quot" rel="nofollow noreferrer" target="_blank">https://cdn.jsdelivr.net/npm/...</a>;&gt;&lt;/script&gt;</li>
<li>unpkg <br>   unpkg：<a href="https://unpkg.com/vue/dist/vue.js," rel="nofollow noreferrer" target="_blank">https://unpkg.com/vue/dist/vu...</a> 会保持和 npm 发布的最新的版本一致。（推荐使用）</li>
<li>cdnjs 版本更新可能略滞后<br>   &lt;script src="<a href="https://cdnjs.cloudflare.com/ajax/libs/vue/2.1.8/vue.min.js&amp;quot" rel="nofollow noreferrer" target="_blank">https://cdnjs.cloudflare.com/...</a>;&gt;&lt;/script&gt;</li>
<li>BootCDN（国内）国内不稳定<br><a href="https://cdn.bootcss.com/vue/2.2.2/vue.min.js" rel="nofollow noreferrer" target="_blank">https://cdn.bootcss.com/vue/2...</a>
</li>
</ul>
<h1 id="articleHeader3">NPM</h1>
<p>在用 Vue 构建大型应用时推荐使用 NPM 安装[1]。NPM 能很好地和诸如 webpack 或 Browserify 模块打包器配合使用。同时 Vue 也提供配套工具来开发单文件组件。</p>
<ol>
<li>nodejs安装<br>   从node.js官网(<a href="https://nodejs.org/en/)" rel="nofollow noreferrer" target="_blank">https://nodejs.org/en/)</a> 下载并安装node，安装过程很简单，一直点下一步就ok了，安装完之后，我们通过打开命令行工具（win+R）,输入node -v 命令，查看node的版本，若出现相应的版本号，则说明你安装成功了。<br>   你可以根据不同平台系统选择你需要的Node.js安装包。<p><span class="img-wrap"><img data-src="/img/bV7OYT?w=1257&amp;h=599" src="https://static.alili.tech/img/bV7OYT?w=1257&amp;h=599" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>npm包管理器，是集成在node中的，所以安装了node也就有了npm,直接输入 npm -v 命令，显示npm的版本信息。</p>
</li>
<li>安装淘宝镜像库<br>   如果访问外网比较慢，可以使用淘宝的镜像 <a href="https://npm.taobao.org/" rel="nofollow noreferrer" target="_blank">https://npm.taobao.org/</a><br>   打开命令终端 npm install -g cnpm --registry=<a href="https://registry.npm.taobao.org" rel="nofollow noreferrer" target="_blank">https://registry.npm.taobao.org</a><br>   安装成功之后，就可以用 cnpm 替代 npm<p><span class="img-wrap"><img data-src="/img/bV7OZ0?w=675&amp;h=437" src="https://static.alili.tech/img/bV7OZ0?w=675&amp;h=437" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
</li>
<li>
<p>安装vue-cli</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install -g vue-cli / cnpm i -g vue-cli
安装结束之后，使用vue -v查看vue的版本。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code>npm install -g vue-<span class="hljs-keyword">cli</span> / cnpm i -g vue-<span class="hljs-keyword">cli</span>
安装结束之后，使用vue -v查看vue的版本。
</code></pre>
</li>
</ol>
<p>安装成功之后，vue环境就部署成功了，接下来就可以使用npm方式创建项目框架了。</p>
<h1 id="articleHeader4">使用vue-cli创建项目</h1>
<h2 id="articleHeader5">步骤：</h2>
<ul>
<li>选择项目所在的位置，通过命令行进入该目录（或者直接在该目录，右键，打开命令行）。</li>
<li>使用脚手架安装项目： vue init webpack demo 项目是基于webpack的<br>   Project name（工程名）:回车<br>   Project description（工程介绍）：回车<br>   Author：作者名<br>   Vue build（是否安装编译器）:回车<br>   Install vue-router（是否安装Vue路由）：回车<br>   Use ESLint to lint your code（是否使用ESLint检查js代码）：n<br>   Set up unit tests（安装单元测试工具）：n<br>   Setup e2e tests with Nightwatch（是否安装端到端测试工具）：n<br>   Should we run <code>npm install</code> for you after the project has been created? (recommended)：回车。</li>
</ul>
<h2 id="articleHeader6">启动项目</h2>
<ul>
<li>进入项目目录：cd demo</li>
<li>安装项目所需要的依赖：npm install</li>
<li>启动项目：npm run dev</li>
</ul>
<p>启动成功，浏览器打开：localhost:8080，即可看到vue项目。</p>
<h1 id="articleHeader7">vue目录结构</h1>
<p><span class="img-wrap"><img data-src="/img/bV7O8b?w=461&amp;h=620" src="https://static.alili.tech/img/bV7O8b?w=461&amp;h=620" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader8">package.json</h2>
<p><span class="img-wrap"><img data-src="/img/bV7O84?w=554&amp;h=378" src="https://static.alili.tech/img/bV7O84?w=554&amp;h=378" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue — 创建vue项目

## 原文链接
[https://segmentfault.com/a/1190000014218991](https://segmentfault.com/a/1190000014218991)

