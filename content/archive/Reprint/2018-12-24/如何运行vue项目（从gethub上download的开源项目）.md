---
title: '如何运行vue项目（从gethub上download的开源项目）' 
date: 2018-12-24 2:30:06
hidden: true
slug: p4ccw38gk9n
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>前提：</strong>入坑vue.js，从GitHub上download一个vue.js的开源项目，发现不知如何在浏览器运行，通过查阅网上教程，发现网上的很多是教你怎么新建项目，并没有一个是教如何打开已有的项目。自已折腾了一下，成功搭建好项目环境，最终调试成功。现在将过程分享给大家。</p>
<p>首先，这个教程主要针对vue小白，并且不知道安装node.js环境的。言归正传，下面开始教程：</p>
<p><strong>首先下载安装node.js</strong><br>从node.js官网下载并安装node，安装过程很简单，一路“下一步”就可以了。<br><span class="img-wrap"><img data-src="/img/bVZvTf?w=1105&amp;h=940" src="https://static.alili.tech/img/bVZvTf?w=1105&amp;h=940" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>根据自己电脑选择32位/64位。安装好node，可以先进行下简单的测试安装是否成功了，后面还要进行环境配置<br>在键盘按下【win+R】键，输入cmd，然后回车，打开cmd窗口<br><span class="img-wrap"><img data-src="/img/bVZvVZ?w=677&amp;h=442" src="https://static.alili.tech/img/bVZvVZ?w=677&amp;h=442" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><strong>安装cnpm</strong><br>由于npm有些资源被屏蔽或者是国外资源的原因，经常会导致用npm安装依赖包的时候失败，所有我还需要npm的国内镜像---cnpm<br>在命令行中输入 npm install -g cnpm --registry=<a href="http://registry.npm.taobao.org" rel="nofollow noreferrer" target="_blank">http://registry.npm.taobao.org</a> </p>
<p><strong>安装webpack</strong><br>npm install webpack -g</p>
<p><strong>安装vue-cli</strong><br>cnpm install vue-cli -g<br>这个过程会耗时十几秒，等走完就好</p>
<p>好了，到此整个环境就搭建好了</p>
<p><strong>下面就是运行项目了</strong></p>
<p><em>cd desktop/项目名称</em><br><span class="img-wrap"><img data-src="/img/bVZwhS?w=677&amp;h=442" src="https://static.alili.tech/img/bVZwhS?w=677&amp;h=442" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>进入项目之后安装依赖<br><em>npm install</em> <br>安装成功后你会发现项目里多了个<br><span class="img-wrap"><img data-src="/img/bVZwii?w=502&amp;h=185" src="https://static.alili.tech/img/bVZwii?w=502&amp;h=185" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p>然后<br>npm run dev<br><span class="img-wrap"><img data-src="/img/bVZwiS?w=677&amp;h=442" src="https://static.alili.tech/img/bVZwiS?w=677&amp;h=442" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVZwiZ?w=677&amp;h=442" src="https://static.alili.tech/img/bVZwiZ?w=677&amp;h=442" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p>自动启动浏览器就会打开项目了<br><span class="img-wrap"><img data-src="/img/bVZwji?w=1900&amp;h=950" src="https://static.alili.tech/img/bVZwji?w=1900&amp;h=950" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
如何运行vue项目（从gethub上download的开源项目）

## 原文链接
[https://segmentfault.com/a/1190000012239934](https://segmentfault.com/a/1190000012239934)

