---
title: 'Vue.js+Node.js爬虫开发一个Github排行榜' 
date: 2018-12-29 2:30:10
hidden: true
slug: hd4tludgiat
categories: [reprint]
---

{{< raw >}}

                    
<h2>前言</h2>
<p>之前<a href="https://github.com/XNAL/node-MovieSpider" rel="nofollow noreferrer">使用Node.js开发一个小爬虫</a>，算是初步对爬虫有了一定的了解，但爬取的数据没什么意义。最近使用Github的频率比较高，所以准备爬取一些Github的数据玩下。目前爬取了中国区followers排名前100的大神，以及各个编程语言stars大于1000的开源项目。</p>
<h2>源码</h2>
<p><a href="https://github.com/XNAL/vue-github-rank" rel="nofollow noreferrer">Talk is cheap. Show me the code.</a></p>
<h2>访问地址</h2>
<ul>
<li>
<a href="http://www.qdnote.com/vue-github-rank/" rel="nofollow noreferrer">访问地址：http://www.qdnote.com/vue-github-rank/</a>（pc端开启手机模式浏览效果更佳）</li>
<li>扫描二维码</li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVWhQX?w=300&amp;h=300" src="https://static.alili.tech/img/bVWhQX?w=300&amp;h=300" alt="图片描述" title="图片描述"></span></p>
<h2>如何使用</h2>
<pre><code>git clone https://github.com/XNAL/vue-github-rank

// 需要先安装mysql，并创建数据库，可参考源码中的`github_rank.sql`

cd vue-github-rank
npm init

// 启动node服务
gulp nodemon 

// 本地运行需另开一个终端框口并执行以下命令，然后访问`http://localhost:8080/`
npm run dev
</code></pre>
<h2>技术栈</h2>
<ul>
<li>
<a href="https://cn.vuejs.org/" rel="nofollow noreferrer">vue.js</a>： 前端页面展示。</li>
<li>
<a href="https://github.com/axios/axios" rel="nofollow noreferrer">axios</a>: vue官方推荐HTTP库，请求后端数据。</li>
<li>
<a href="http://www.iconfont.cn/" rel="nofollow noreferrer">阿里巴巴的矢量图标库Iconfont</a>: 页面图标，个人项目中使用起来比较方便。</li>
<li>
<a href="https://nodejs.org/en/" rel="nofollow noreferrer">node.js</a> + <a href="http://koajs.com/" rel="nofollow noreferrer">Koa2</a>： 后台服务器搭架，（Koa2需要node v7.6以上）。</li>
<li>ES6/ES7： 后台开发以ES6语法为主，并使用了ES7中的<code>async/await</code>。</li>
<li>
<a href="https://gulpjs.com/" rel="nofollow noreferrer">gulp</a>： 后台服务器使用，自动化构建工具。</li>
<li>
<a href="https://webpack.js.org/" rel="nofollow noreferrer">webpack</a>： vue-cli自带的。需要配置本地代理<code>proxyTable</code>，以及配置<code>SCSS</code>的相关loader。</li>
<li>MySql: 数据保存。</li>
<li>
<a href="http://visionmedia.github.io/superagent/" rel="nofollow noreferrer">superagent</a>: 比node.js原生http模块更好用的客户端请求代理模块。</li>
<li>
<a href="https://github.com/cheeriojs/cheerio" rel="nofollow noreferrer">cheerio</a>：服务端jQuery，分析网页内容。</li>
<li>
<a href="https://github.com/node-schedule/node-schedule" rel="nofollow noreferrer">node-schedule</a>: node.js定时执行模块。</li>
</ul>
<h2>说明</h2>
<ol>
<li>关于爬虫爬取数据的说明：目前是每2个小时去Github官网爬取数据，取到的数据会存入数据库中。在爬取的过程中可能会出现单个页面一直无法取到数据的情况，为避免程序一直卡在此步骤，目前是单个页面数据循环请求50次，如果仍取不到数据则跳过此项数据的爬取，等待下一次再进行爬取。</li>
<li>数据库字符集需要设置为<code>utf8mb4</code>，因为需要存取emoji表情。</li>
</ol>
<h2>项目截图</h2>
<h3>关于（首页）</h3>
<p><span class="img-wrap"><img data-src="/img/bVWhQ2?w=461&amp;h=818" src="https://static.alili.tech/img/bVWhQ2?w=461&amp;h=818" alt="图片描述" title="图片描述"></span></p>
<h3>中国区前100大神</h3>
<p><span class="img-wrap"><img data-src="/img/bVWhQ4?w=459&amp;h=818" src="https://static.alili.tech/img/bVWhQ4?w=459&amp;h=818" alt="图片描述" title="图片描述"></span></p>
<h3>目录</h3>
<p><span class="img-wrap"><img data-src="/img/bVWhRb?w=461&amp;h=814" src="https://static.alili.tech/img/bVWhRb?w=461&amp;h=814" alt="图片描述" title="图片描述"></span></p>
<h3>项目</h3>
<p><span class="img-wrap"><img data-src="/img/bVWhRf?w=461&amp;h=821" src="https://static.alili.tech/img/bVWhRf?w=461&amp;h=821" alt="图片描述" title="图片描述"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js+Node.js爬虫开发一个Github排行榜

## 原文链接
[https://segmentfault.com/a/1190000011469332](https://segmentfault.com/a/1190000011469332)

