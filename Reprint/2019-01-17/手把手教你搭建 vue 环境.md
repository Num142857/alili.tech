---
title: '手把手教你搭建 vue 环境' 
date: 2019-01-17 2:30:25
hidden: true
slug: mnymnd4bj0c
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">第一步 node环境安装</h2>
<p>1.1 如果本机没有安装node运行环境，请下载node 安装包进行安装<br>1.2 如果本机已经安装node的运行换，请更新至最新的node 版本<br>下载地址：<a href="https://nodejs.org/en/" rel="nofollow noreferrer" target="_blank">https://nodejs.org/en/</a> 或者 <a href="http://nodejs.cn/" rel="nofollow noreferrer" target="_blank">http://nodejs.cn/</a></p>
<h2 id="articleHeader1">第二步 node环境检测</h2>
<p>为了快乐的使用命令行，我们推荐使用 gitbas<br>1.1 下载git 并安装<br>下载地址 <a href="https://git-for-windows.github.io/" rel="nofollow noreferrer" target="_blank">https://git-for-windows.githu...</a><br>安装成功后 右键菜单</p>
<p><span class="img-wrap"><img data-src="/img/bVLBfp?w=286&amp;h=86" src="https://static.alili.tech/img/bVLBfp?w=286&amp;h=86" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>我们可以看到 Gti Bash Here 。说明我们已经安装成功git<br>1.2  检测node 是否安装成功<br>右键空白，选择 Gti Bash Here  弹出 </p>
<p><span class="img-wrap"><img data-src="/img/bVLBfG?w=287&amp;h=244" src="https://static.alili.tech/img/bVLBfG?w=287&amp;h=244" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>1.2.1 在终端输入 node -v  </p>
<p><span class="img-wrap"><img data-src="/img/bVLBfN?w=287&amp;h=244" src="https://static.alili.tech/img/bVLBfN?w=287&amp;h=244" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>如果输出版本号，说明我们安装node 环境成功<br>随便我们可以查看 npm 的 版本号<br>可以使用 npm -v</p>
<p><span class="img-wrap"><img data-src="/img/bVLBfP?w=287&amp;h=244" src="https://static.alili.tech/img/bVLBfP?w=287&amp;h=244" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader2">第三步 vue-cli脚手架安装</h2>
<p>2.1 如果访问外网比较慢，可以使用淘宝的镜像 <a href="https://npm.taobao.org/" rel="nofollow noreferrer" target="_blank">https://npm.taobao.org/</a><br>打开命令终端 npm install -g cnpm --registry=<a href="https://registry.npm.taobao.org" rel="nofollow noreferrer" target="_blank">https://registry.npm.taobao.org</a><br>回车之后，我就可以可以快乐的用 cnpm 替代 npm</p>
<p><span class="img-wrap"><img data-src="/img/bVLBfT?w=504&amp;h=208" src="https://static.alili.tech/img/bVLBfT?w=504&amp;h=208" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>看到这样</p>
<p><span class="img-wrap"><img data-src="/img/bVLBfU?w=504&amp;h=184" src="https://static.alili.tech/img/bVLBfU?w=504&amp;h=184" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>恭喜你，你已经成功安装了 cnpm<br>但是此后，我们还是使用 npm 来运行命令</p>
<p>2.2 接下来就是重点了 安装vue-cli<br>npm install vue-cli -g</p>
<p><span class="img-wrap"><img data-src="/img/bVLBfY?w=280&amp;h=124" src="https://static.alili.tech/img/bVLBfY?w=280&amp;h=124" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>如果你很幸运，那么接下来就是这样的</p>
<p><span class="img-wrap"><img data-src="/img/bVLBfZ?w=554&amp;h=293" src="https://static.alili.tech/img/bVLBfZ?w=554&amp;h=293" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>我们成功了</p>
<p>2.3 进入我们的项目目录，右键 Gti Bash Here<br>2.4 初始化项目 vue init webpack vue-demo</p>
<p><span class="img-wrap"><img data-src="/img/bVLBf7?w=329&amp;h=160" src="https://static.alili.tech/img/bVLBf7?w=329&amp;h=160" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>一直回车直到</p>
<p><span class="img-wrap"><img data-src="/img/bVLBge?w=455&amp;h=340" src="https://static.alili.tech/img/bVLBge?w=455&amp;h=340" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>是否要安装 vue-router 项目中肯定要使用到 所以 y 回车</p>
<p><span class="img-wrap"><img data-src="/img/bVLBgA?w=455&amp;h=340" src="https://static.alili.tech/img/bVLBgA?w=455&amp;h=340" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>是否需要 js 语法检测 目前我们不需要 所以 n 回车</p>
<p><span class="img-wrap"><img data-src="/img/bVLBgM?w=455&amp;h=292" src="https://static.alili.tech/img/bVLBgM?w=455&amp;h=292" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>是否安装 单元测试工具 目前我们不需要 所以 n 回车</p>
<p><span class="img-wrap"><img data-src="/img/bVLBgP?w=455&amp;h=316" src="https://static.alili.tech/img/bVLBgP?w=455&amp;h=316" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>是否需要 端到端测试工具 目前我们不需要 所以 n 回车</p>
<p><span class="img-wrap"><img data-src="/img/bVLBgU?w=455&amp;h=316" src="https://static.alili.tech/img/bVLBgU?w=455&amp;h=316" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>接下来 ctr+c 结束</p>
<p>2.5 进入 cd vue-demo</p>
<p><span class="img-wrap"><img data-src="/img/bVLBg2?w=497&amp;h=196" src="https://static.alili.tech/img/bVLBg2?w=497&amp;h=196" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>2.6 执行 npm install </p>
<p><span class="img-wrap"><img data-src="/img/bVLBg4?w=497&amp;h=196" src="https://static.alili.tech/img/bVLBg4?w=497&amp;h=196" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>如果出现下图，说明安装成功</p>
<p><span class="img-wrap"><img data-src="/img/bVLBg5?w=497&amp;h=340" src="https://static.alili.tech/img/bVLBg5?w=497&amp;h=340" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>2.7 接下来执行 npm run dev</p>
<p><span class="img-wrap"><img data-src="/img/bVLBha?w=497&amp;h=340" src="https://static.alili.tech/img/bVLBha?w=497&amp;h=340" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>默认浏览器会自动打开</p>
<blockquote><p><code>注意：如果您的浏览器是ie9以下的版本，请升级浏览器到最新版本或者下载谷歌浏览器或者火狐浏览器进行预览。在地址栏输入 http://localhost:8080/#/进行访问</code></p></blockquote>
<p><span class="img-wrap"><img data-src="/img/bVLBht?w=554&amp;h=466" src="https://static.alili.tech/img/bVLBht?w=554&amp;h=466" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>恭喜，你已经成功安装，并运行起来vue基础项目，踏入了vue的大门。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
手把手教你搭建 vue 环境

## 原文链接
[https://segmentfault.com/a/1190000008922234](https://segmentfault.com/a/1190000008922234)

