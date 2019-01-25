---
title: '如何在github上创建个人项目的在线演示demo' 
date: 2019-01-26 2:30:18
hidden: true
slug: hglmjglqbqt
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">前言</h3>
<p>Github作为目前优秀的同性交友平台，其上维护了众多优秀的开源项目。目前Github上关于前端的项目也是数不胜数，Vue、React、Angular等等。自己也是通过官方文档+github的方式来学习一些新的技术和框架。在github上搜索相关项目时会发现，有的项目不光写了一手好文档并且还给出了项目的在线运行Demo。事实胜于雄辩，一个在线演示可能给项目带来更好的印象分。如何在github上维护自己个人项目源代码的同时并生成项目主页呢？</p>
<h3 id="articleHeader1">Github项目主页</h3>
<p>Github给用户提供了运行静态页面的地址，如何展示个人项目的静态页面？以下是创建项目主页的关键：</p>
<ul>
<li>gh-pages分支</li>
<li>访问地址：[github用户名].github.io/[项目仓库名]，如：<a href="https://monster1935.github.io/vue-example" rel="nofollow noreferrer" target="_blank">monster1935.github.io/vue-example</a>
</li>
</ul>
<p>生成项目主页首先是将欲展示的静态页面推送的Github个人项目仓库的gh-pages分支下，然后通过上述的访问形式访问。</p>
<h3 id="articleHeader2">如何在维护源代码的同时并同时生成项目主页</h3>
<p>以下以Vue的单页应用为例，给出完整的项目维护以及生成项目主页的步骤。</p>
<p><strong>一、Github上创建远程仓库</strong></p>
<p>在github上为个人项目创建远程仓库，如下所示:</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000008425995?w=847&amp;h=601" src="https://static.alili.tech/img/remote/1460000008425995?w=847&amp;h=601" alt="" title="" style="cursor: pointer;"></span></p>
<p><strong>二、clone远程仓库到本地</strong></p>
<p>创建好远程仓库后，使用git工具将远程仓库clone到本地，如下所示:<br><span class="img-wrap"><img data-src="/img/remote/1460000008425996?w=1029&amp;h=501" src="https://static.alili.tech/img/remote/1460000008425996?w=1029&amp;h=501" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><strong>三、使用vue-cli生成vue单页应用项目</strong></p>
<p>进入项目根目录，使用vue-cli生成vue的项目的初始结构。步骤如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 以webpack模板生成项目原型
vue init webpack vue-example" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># 以webpack模板生成项目原型</span>
vue init webpack vue-example</code></pre>
<p>在使用vue-cli脚手架工具生成vue项目过程中会提示是否安装一些辅助工具库，可根据自己项目要求酌情安装，或者生成项目后安装。</p>
<p>项目生成完毕后，进入package.json所在目录执行npm install命令，安装项目运行需要的依赖。</p>
<p>依赖安装完成后，即可执行npm run dev命令启动本地的webpack-dev-server进行开发调试。<br>如下图所示，出现如下画面代表vue项目初始化完毕。后期可在该基础上进行自己项目的开发。<br><span class="img-wrap"><img data-src="/img/remote/1460000008425997?w=1906&amp;h=1002" src="https://static.alili.tech/img/remote/1460000008425997?w=1906&amp;h=1002" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><strong>四、将项目推送到远程仓库</strong></p>
<p>项目开发过程中，可以将项目源码推送至github远程仓库中管理。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git add --all

git commit -m 'Initial the vue project'

git push " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>git <span class="hljs-keyword">add</span><span class="bash"> --all
</span>
git commit -m <span class="hljs-string">'Initial the vue project'</span>

git push </code></pre>
<p><strong>五、执行项目构建命令，并将构建后的静态页面推送至gh-pages分支</strong></p>
<p>项目开发完毕可以执行<code> npm run build </code> 打包文件，进行文件的打包发布流程。</p>
<ol>
<li>切换到gh-pages分支 <code> git checkout -b gh-pages </code>
</li>
<li>执行<code> npm run build </code>命令，构建代码</li>
<li>将dist目录下的所有文件夹推送至远程仓库的gh-pages分支，执行以下命令：</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 强制添加dist文件夹，因为.gitignore文件中定义了忽略该文件
git add -f dist

# 提交到本地暂存区
git commit -m 'Initial the page of project'

# 部署dist目录下的代码
git subtree push --prefix dist origin gh-pages" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># 强制添加dist文件夹，因为.gitignore文件中定义了忽略该文件</span>
git add <span class="hljs-_">-f</span> dist

<span class="hljs-comment"># 提交到本地暂存区</span>
git commit -m <span class="hljs-string">'Initial the page of project'</span>

<span class="hljs-comment"># 部署dist目录下的代码</span>
git subtree push --prefix dist origin gh-pages</code></pre>
<p><strong>注：使用git subtree命令可以在同一分支上维护源代码以及构建代码，在部署时仅仅推送dist目录下的内容。</strong></p>
<h3 id="articleHeader3">小结</h3>
<p>以上所述的在github上gh-pages分支上生成项目主页主要是利用了github提供的静态页解析功能，因此本文中所属的范围仅使用于静态页面的部署。在将Vue应用部署到gh-pages分支后，可能会出现部分资源无法加载的问题，原因就在于vue中的webpack配置在打包时其publicPath为根路径，如果该静态页在服务器中被访问则不会出现以上问题。在github解析时如果按照根路径解析会出错，因此在github上部署静态页时可以考虑将publicPath设置为当前目录，即<code> publicPath: './' </code>。</p>
<p>使用Vue-cli webpack模板生成的vue项目，出现上述问题应设置config/index.js中build对象下的<code>assetsPublicPath</code>字段为<code>assetsPublicPath: './'</code>,原理都是设置publicPath字段。</p>
<hr>
<h3 id="articleHeader4">更新</h3>
<p>目前发现了一种更为简便的部署到github gh-pages的方式，<a href="https://github.com/tschaub/gh-pages" rel="nofollow noreferrer" target="_blank">gh-pages</a> 提供了更为简便的管理本地项目到github的提交流程。详情见<a href="https://github.com/monster1935/vue-ghpages-test" rel="nofollow noreferrer" target="_blank">vue-ghpages-test</a>。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何在github上创建个人项目的在线演示demo

## 原文链接
[https://segmentfault.com/a/1190000008425992](https://segmentfault.com/a/1190000008425992)

