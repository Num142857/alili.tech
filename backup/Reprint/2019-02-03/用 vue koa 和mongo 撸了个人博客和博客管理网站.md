---
title: '用 vue koa 和mongo 撸了个人博客和博客管理网站' 
date: 2019-02-03 2:30:39
hidden: true
slug: 6gz4mzqh6c4
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>作为一个前端菜鸡在校生，跟风玩了一波vue之后感觉很爽，又跟风玩了一波koa、co之后更是爽的不行不行的，于是决定搭一个个人博客，再跟风学了学mongo、mongoose之后就开始上手干了，搭好了之后又搭了个博客管理后台，昨天终于把博客上线了，今天搞了搞bug，觉得还可以看，就跟大家分享一下吧。</p></blockquote>
<p><strong>先上博客地址吧  <a href="http://chuckliu.me/" rel="nofollow noreferrer" target="_blank">我的博客</a></strong></p>
<h2 id="articleHeader0">说说技术架构吧</h2>
<p>整体来说分为三个部分，全都是前后端完全分离的</p>
<ul>
<li><p>server 后台 包含了所有的后台服务，为博客和博客管理提供后台接口</p></li>
<li><p>client 前端 博客的前端呈现，被<code>vue</code>洗脑严重，界面模仿了<a href="http://cn.vuejs.org/blog/" rel="nofollow noreferrer" target="_blank">vue博客</a>，评论系统用的是<a href="http://duoshuo.com/" rel="nofollow noreferrer" target="_blank">多说</a>(但是多说很不稳定...而且已经很久无人维护..)</p></li>
<li><p>admin  前端 博客管理平台的前端，功能上类似于带发布博客功能的印象笔记，markdown语法，预览和编写同步进行，带有自动保存功能，书写的文章只有在<code>发布</code>之后才会同步当前内容到博客client页面上，也完全可以当做一个笔记类应用去用,这样做的目的是出于有的时候在写文章a的时候,觉得某一部分的内容过于复杂,可以另外开一篇文章b来仔细讲解下,但是等我写完a就忘了.而且这样做了之后博客也好用多了,我经常在码代码的时候遇到一些问题,这样可以直接打开博客后台,开一篇文章记录一下遇到的问题,但是不发布出去,提醒自己需要整理一篇相关内容的文章.以后一登这个管理系统就可以看到了这篇没有没有发布过的文章,就可以整理这篇文章,等到写完之后发布出去就可以了。</p></li>
</ul>
<h2 id="articleHeader1">client，就是博客页面啦</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007004202?w=2426&amp;h=1274" src="https://static.alili.tech/img/remote/1460000007004202?w=2426&amp;h=1274" alt="博客页面" title="博客页面" style="cursor: pointer; display: inline;"></span></p>
<p>博客呈现页面，基于vue(1.0)，前后端通信用的<a href="https://www.npmjs.com/package/whatwg-fetch" rel="nofollow noreferrer" target="_blank">fetch</a>，评论系统用的是<a href="http://duoshuo.com/" rel="nofollow noreferrer" target="_blank">多说</a>，界面模仿了<a href="http://cn.vuejs.org/blog/" rel="nofollow noreferrer" target="_blank">vue博客</a>，大量使用了其<a href="https://github.com/vuejs/cn.vuejs.org" rel="nofollow noreferrer" target="_blank">样式效果</a>，还有很多要完善的地方。<br>由于[多说]()是基于dom的插件，使用的方式也是老掉牙的方式，大部分的使用者应该是wordpress、hexo之类搭建的同步网页而非单页应用，连源码也没有，想vue化一下都不行，所以，client端很多的坑基本都在[多说]()上了，所以，也遇到了以前很多没有遇到的情况，比如<code>$nextTick</code>也不能保证dom已经更新之类的，尝试了很多方案，但是结局都不是太好，甚至一度绝望的上了setTimeout(initDuoshuo,300)这种玄学代码去加载多说，不够好在今天差不多算终于解决掉多说的bug了。</p>
<h3 id="articleHeader2">技术栈</h3>
<ol>
<li><p><a href="http://vuejs.org.cn" rel="nofollow noreferrer" target="_blank">Vue</a> &amp;&amp; <a href="https://github.com/vuejs/vue-router" rel="nofollow noreferrer" target="_blank">vue-router</a></p></li>
<li><p><a href="https://www.npmjs.com/package/whatwg-fetch" rel="nofollow noreferrer" target="_blank">fetch</a></p></li>
<li><p><a href="http://stylus-lang.com/" rel="nofollow noreferrer" target="_blank">stylus</a></p></li>
<li><p><a href="https://github.com/chjj/marked" rel="nofollow noreferrer" target="_blank">marked</a> &amp;&amp; <a href="https://github.com/isagalaev/highlight.js" rel="nofollow noreferrer" target="_blank">highlight</a></p></li>
</ol>
<h2 id="articleHeader3">admin，也就是我写博客的页面了</h2>
<p><strong>列表页:</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007004203?w=2560&amp;h=1410" src="https://static.alili.tech/img/remote/1460000007004203?w=2560&amp;h=1410" alt="列表页" title="列表页" style="cursor: pointer;"></span></p>
<p><strong>边写边预览，实时保存：</strong></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000007004204?w=2560&amp;h=1255" src="https://static.alili.tech/img/remote/1460000007004204?w=2560&amp;h=1255" alt="预览页" title="预览页" style="cursor: pointer;"></span></p>
<p>博客管理系统，也是前后端完全分离的。功能上类似于印象笔记，可以实时保存文章，觉得写好了之后可以<code>发布</code>文章，每次<code>发布</code>都会把文章同步更新到博客上，这样在client端就能看到。采用markdown语法，编辑器采用的是<a href="https://github.com/NextStepWebs/simplemde-markdown-editor" rel="nofollow noreferrer" target="_blank">SimpleMDE</a>，支持大量快捷键。</p>
<h3 id="articleHeader4">技术栈</h3>
<ol>
<li><p><a href="http://vuejs.org.cn" rel="nofollow noreferrer" target="_blank">Vue</a> &amp;&amp; <a href="https://github.com/vuejs/vuex" rel="nofollow noreferrer" target="_blank">vuex</a> &amp;&amp; <a href="https://github.com/vuejs/vue-router" rel="nofollow noreferrer" target="_blank">vue-router</a></p></li>
<li><p><a href="https://www.npmjs.com/package/whatwg-fetch" rel="nofollow noreferrer" target="_blank">fetch</a></p></li>
<li><p><a href="http://stylus-lang.com/" rel="nofollow noreferrer" target="_blank">stylus</a></p></li>
<li><p><a href="https://github.com/NextStepWebs/simplemde-markdown-editor" rel="nofollow noreferrer" target="_blank">SimpleMDE</a> &amp;&amp; <a href="https://github.com/chjj/marked" rel="nofollow noreferrer" target="_blank">marked</a> &amp;&amp; <a href="https://github.com/isagalaev/highlight.js" rel="nofollow noreferrer" target="_blank">highlight</a></p></li>
</ol>
<h2 id="articleHeader5">server</h2>
<p>基于restful，nodejs的话采用<code>koa</code>(koa 1)，数据库用了<code>mongo</code>。登录这块的话用了<a href="https://jwt.io/introduction/" rel="nofollow noreferrer" target="_blank">jwt</a>.</p>
<p>其实以前从没用过mongo，但是觉得还是要来玩一玩，毕竟这么火对吧。<br>既然用了<code>koa</code>，还是说两句，虽然用的是koa1，主要还是觉得koa1比较geek（啥？这也能成为理由？黑人微笑），写起来感觉屌屌的，虽然代码易读性可能没有koa2那么好，但是写的过程中加深了对于<code>generator</code> <code>promise</code> 函数式等等的理解，中间也反复看了<code>koa</code>的源码，也还是学到了一些东西的。</p>
<h2 id="articleHeader6">还是有很多要改的地方</h2>
<p>这才只是刚刚完成，还要很多要改进的地方</p>
<p>项目地址<a href="https://github.com/Ma63d/kov-blog" rel="nofollow noreferrer" target="_blank">在这</a>，欢迎star，提issue，pr。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用 vue koa 和mongo 撸了个人博客和博客管理网站

## 原文链接
[https://segmentfault.com/a/1190000007004199](https://segmentfault.com/a/1190000007004199)

