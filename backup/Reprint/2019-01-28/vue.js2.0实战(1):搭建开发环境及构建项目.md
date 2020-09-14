---
title: 'vue.js2.0实战(1):搭建开发环境及构建项目' 
date: 2019-01-28 2:30:09
hidden: true
slug: 8vufma5zi9x
categories: [reprint]
---

{{< raw >}}

                    
<p>Vue.js是一套构建用户界面的渐进式框架。它既集众多优秀前端框架之大成，又保持了其简单易用的特点。对vue.js感兴趣并且已经通读官方基础教程的初学者来说，开始一个实战项目是进一步深入学习vue.js最好的方式了。在此之前，需要学会如何搭建开发环境。</p>
<h2 id="articleHeader0">开发环境的搭建</h2>
<h3 id="articleHeader1">安装node.js</h3>
<blockquote><p>Node.js官网：<a href="https://nodejs.org/en/" rel="nofollow noreferrer" target="_blank"></a><a href="https://nodejs.org/en/" rel="nofollow noreferrer" target="_blank">https://nodejs.org/en/</a></p></blockquote>
<p>进入Node.js官网，选择下载并安装Node.js。安装过程只需要点击“下一步”即可，如下图，非常简单。</p>
<p><span class="img-wrap"><img data-src="/img/bVHWan?w=545&amp;h=423" src="https://static.alili.tech/img/bVHWan?w=545&amp;h=423" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVHWav?w=531&amp;h=420" src="https://static.alili.tech/img/bVHWav?w=531&amp;h=420" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVHWax?w=533&amp;h=424" src="https://static.alili.tech/img/bVHWax?w=533&amp;h=424" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVHWaz?w=528&amp;h=417" src="https://static.alili.tech/img/bVHWaz?w=528&amp;h=417" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVHWaB?w=526&amp;h=415" src="https://static.alili.tech/img/bVHWaB?w=526&amp;h=415" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>验证Node.js是否安装好，在windows下，win+r召唤出运行窗口，输入cmd打开命令行窗口。输入node -v即可得到对应的Node.js版本。</p>
<p><span class="img-wrap"><img data-src="/img/bVHWbl?w=691&amp;h=534" src="https://static.alili.tech/img/bVHWbl?w=691&amp;h=534" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>npm包管理器是集成在Node.js中了，所以在安装Node.js的时候就已经自带了npm。<br>输入npm -v可得到npm的版本。</p>
<p><span class="img-wrap"><img data-src="/img/bVHWbU?w=669&amp;h=71" src="https://static.alili.tech/img/bVHWbU?w=669&amp;h=71" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>注意npm的版本需要在3.0.0以上版本，所以，如果npm的版本小于3.0.0,输入以下命令更新npm至最新版本。</p>
<blockquote><p>npm -g install npm</p></blockquote>
<h3 id="articleHeader2">安装cnpm</h3>
<p>由于资源的限制，安装npm依赖包的时候经常失败，建议使用npm的国内镜像cnpm 命令行工具代替默认的npm。</p>
<blockquote><p>npm 国内镜像 <a href="https://npm.taobao.org/" rel="nofollow noreferrer" target="_blank"></a><a href="https://npm.taobao.org/" rel="nofollow noreferrer" target="_blank">https://npm.taobao.org/</a></p></blockquote>
<p>在命令行中输入以下内容等待安装</p>
<blockquote><p>npm install -g cnpm --registry=<a href="https://registry.npm.taobao.org" rel="nofollow noreferrer" target="_blank">https://registry.npm.taobao.org</a></p></blockquote>
<h3 id="articleHeader3">cpnm全局安装vue-cli</h3>
<p>在命令行中运行以下命令然后等待安装</p>
<blockquote><p>cnpm install -g vue-cli</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVHWeg?w=662&amp;h=560" src="https://static.alili.tech/img/bVHWeg?w=662&amp;h=560" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader4">构建项目</h2>
<h3 id="articleHeader5">新建项目</h3>
<p>在这里我将vue项目建在f盘的vueProjiects文件夹下，利用命令进入此目录。在cmd中输入盘符f:回车即可进入F盘：</p>
<p><span class="img-wrap"><img data-src="/img/bVHWe6?w=666&amp;h=128" src="https://static.alili.tech/img/bVHWe6?w=666&amp;h=128" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>输入命令 cd vueProjects跳到此目录下：</p>
<p><span class="img-wrap"><img data-src="/img/bVHWe8?w=649&amp;h=115" src="https://static.alili.tech/img/bVHWe8?w=649&amp;h=115" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>在此目录下创建一个基于 webpack 模板的新项目,即在cmd中输入以下命令：</p>
<blockquote><p>vue init webpack my-vue-project</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVHWfD?w=628&amp;h=459" src="https://static.alili.tech/img/bVHWfD?w=628&amp;h=459" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>vue init webpack my-vue-project意思是初始化一个项目，利用的是webpack打包和压缩，此项目命名为my-vue-project。这样，my-vue-project文件夹就自动生成刚刚在指定的目录中，在此过程中，需要输入项目名、描述、作者等。</p>
<p>打开my-vue-project文件夹，项目文件如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVHWfL?w=664&amp;h=351" src="https://static.alili.tech/img/bVHWfL?w=664&amp;h=351" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader6">安装项目依赖</h3>
<p>在cmd中，注意需要使用命令先定位到my-vue-project目录下，然后输入命令cnpm install安装项目所需的依赖包资源</p>
<blockquote><p>cnpm install</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVHWgP?w=664&amp;h=281" src="https://static.alili.tech/img/bVHWgP?w=664&amp;h=281" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到my-vue-project文件夹下多了一个node_modules文件</p>
<p><span class="img-wrap"><img data-src="/img/bVHWgS?w=628&amp;h=369" src="https://static.alili.tech/img/bVHWgS?w=628&amp;h=369" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h3 id="articleHeader7">运行项目</h3>
<p>使用命令npm run dev 运行项目</p>
<blockquote><p>npm run dev</p></blockquote>
<p>项目运行成功后浏览器会自动打开localhost:8080呈现以下页面：</p>
<p><span class="img-wrap"><img data-src="/img/bVHWhl?w=597&amp;h=663" src="https://static.alili.tech/img/bVHWhl?w=597&amp;h=663" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>至此，vue的脚手架工具已经搭建完成，接下来具体项目的开发只需在src目录下进行。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue.js2.0实战(1):搭建开发环境及构建项目

## 原文链接
[https://segmentfault.com/a/1190000008049815](https://segmentfault.com/a/1190000008049815)

