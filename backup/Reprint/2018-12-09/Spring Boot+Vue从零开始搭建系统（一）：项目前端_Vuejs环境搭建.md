---
title: 'Spring Boot+Vue从零开始搭建系统（一）：项目前端_Vuejs环境搭建' 
date: 2018-12-09 2:30:08
hidden: true
slug: 6kn3e7jn7ao
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0"><strong>前言</strong></h2>
<p>博主本身是一直从事Java后端开发，一直想独立开发一套完整前端和后端技术结合的项目来提升自己的技术水平，经过对业界的一些热点技术的了解并对技术栈选型考虑后，博主打算利用<code>Vue.js</code>和<code>Spring Boot</code>技术栈来开发一个属于自己的博客系统，等开发完成把自己平时遇到的技术分享出来。由于对前端技术不是太了解，所以想从零开始把开发的整个过程记录下来，第一篇文章就先把前端环境搭建起来再弄后面的。<br><span class="img-wrap"><img data-src="/img/bV6G7L?w=50&amp;h=50" src="https://static.alili.tech/img/bV6G7L?w=50&amp;h=50" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<hr>
<h2 id="articleHeader1"><strong>安装node.js</strong></h2>
<ol><li>进入Node.js官网：<a href="https://nodejs.org/en/" rel="nofollow noreferrer" target="_blank">https://nodejs.org/en/</a>，选择下载并安装Node.js。</li></ol>
<p><span class="img-wrap"><img data-src="/img/bV6G8G?w=1267&amp;h=669" src="https://static.alili.tech/img/bV6G8G?w=1267&amp;h=669" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bV6HcL?w=612&amp;h=436" src="https://static.alili.tech/img/bV6HcL?w=612&amp;h=436" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bV6HcY?w=499&amp;h=389" src="https://static.alili.tech/img/bV6HcY?w=499&amp;h=389" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bV6Hc0?w=499&amp;h=389" src="https://static.alili.tech/img/bV6Hc0?w=499&amp;h=389" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>2.验证Node.js是否安装好，在windows下，win+r召唤出运行窗口，输入cmd打开命令行窗口。输入<code>node -v</code>即可得到对应的Node.js版本。<br><span class="img-wrap"><img data-src="/img/bV6Hdh?w=996&amp;h=583" src="https://static.alili.tech/img/bV6Hdh?w=996&amp;h=583" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>npm包管理器是集成在Node.js中了，所以在安装Node.js的时候就已经自带了npm，输入<code>npm -v</code>可得到npm的版本。<br><span class="img-wrap"><img data-src="/img/bV6Hdt?w=997&amp;h=583" src="https://static.alili.tech/img/bV6Hdt?w=997&amp;h=583" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>输入以下命令<code>npm -g install npm</code>，更新npm至最新版本。<br><span class="img-wrap"><img data-src="/img/bV6Hdz?w=997&amp;h=583" src="https://static.alili.tech/img/bV6Hdz?w=997&amp;h=583" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<hr>
<h2 id="articleHeader2"><strong>安装cnpm</strong></h2>
<p>执行命令 <code>npm install -g cnpm --registry=https://registry.npm.taobao.org</code> ,使用npm的国内镜像（npm 国内镜像 <a href="https://npm.taobao.org/" rel="nofollow noreferrer" target="_blank">https://npm.taobao.org/</a>）cnpm 命令代替默认的npm命令，增加依赖包加载速度且避免资源限制。 <br><span class="img-wrap"><img data-src="/img/bV6Heq?w=906&amp;h=648" src="https://static.alili.tech/img/bV6Heq?w=906&amp;h=648" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<hr>
<h2 id="articleHeader3"><strong>cnpm安装脚手架vue-cli</strong></h2>
<p>在命令行中运行命令 <code>cnpm install -g vue-cli</code> 安装脚手架。<br><span class="img-wrap"><img data-src="/img/bV6He0?w=927&amp;h=992" src="https://static.alili.tech/img/bV6He0?w=927&amp;h=992" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<hr>
<h2 id="articleHeader4"><strong>构建项目</strong></h2>
<p>将vue项目建在F盘的vue-workspace文件夹下，利用命令进入此目录。<br>在cmd中输入盘符F:回车即可进入F盘，<br>然后执行命令进入F:workspacesvue-workspace路径目录下，<br>再输入新建项目命令 <code>vue init webpack javalsj-vue</code>，执行后会自动生成vue项目。<br><span class="img-wrap"><img data-src="/img/bV6HfR?w=1134&amp;h=885" src="https://static.alili.tech/img/bV6HfR?w=1134&amp;h=885" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<hr>
<h2 id="articleHeader5"><strong>安装项目依赖</strong></h2>
<p>上面脚手架自动生成的vue项目不能直接运行，需要加载上项目需要的依赖包才能运行。通过在cmd中使用命令<strong>先定位到项目所在路径目录下F:workspacesvue-workspacejavalsj-vue</strong>，然后输入命令 <code>cnpm install</code> 安装项目所需的依赖包资源。<br>（博主在下载第三方开源项目运行的时候，有时会遇到奇怪的报错，然后通过先执行cnpm rebuild node-sass，后执行cnpm install解决，此步骤不是必须的。）<br><span class="img-wrap"><img data-src="/img/bV6HgU?w=820&amp;h=617" src="https://static.alili.tech/img/bV6HgU?w=820&amp;h=617" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<hr>
<h2 id="articleHeader6"><strong>运行项目</strong></h2>
<p>项目准备完毕后，现在可以运行vue初始项目看效果了。<br>在cmd中，注意需要使用命令<strong>先定位到F:workspacesvue-workspacejavalsj-vue目录下</strong>，然后再输入命令<code>npm run dev</code> 来运行项目。<br><span class="img-wrap"><img data-src="/img/bV6Hhb?w=883&amp;h=722" src="https://static.alili.tech/img/bV6Hhb?w=883&amp;h=722" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<hr>
<h2 id="articleHeader7"><strong>浏览器访问项目</strong></h2>
<p>项目运行成功后浏览器访问地址 <a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:8080 就可以查看效果啦。<br><span class="img-wrap"><img data-src="/img/bV6Hhw?w=1267&amp;h=692" src="https://static.alili.tech/img/bV6Hhw?w=1267&amp;h=692" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<hr>
<h2 id="articleHeader8"><strong>备注</strong></h2>
<p>经过以上步骤完成了搭建vue的脚手架项目，可以简单看下项目目录，后续我们开发项目的时候只需在src目录下进行。<br><span class="img-wrap"><img data-src="/img/bV6Hic?w=1267&amp;h=692" src="https://static.alili.tech/img/bV6Hic?w=1267&amp;h=692" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br>工欲善其事必先利其器，博主在开发Vue项目时，选择前端开发工具时试了<code>Sublime Text</code>、<code>Webstom</code>工具感觉不好用。然后问了一些朋友，经过尝试对比后最后还是选择了<code>Visual Studio Code</code>工具作为前端开发工具，真心好用，开发工具下载官网地址：<a href="https://code.visualstudio.com/" rel="nofollow noreferrer" target="_blank">https://code.visualstudio.com/</a>。<br><span class="img-wrap"><img data-src="/img/bV6Hjx?w=240&amp;h=240" src="https://static.alili.tech/img/bV6Hjx?w=240&amp;h=240" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Spring Boot+Vue从零开始搭建系统（一）：项目前端_Vuejs环境搭建

## 原文链接
[https://segmentfault.com/a/1190000013950461](https://segmentfault.com/a/1190000013950461)

