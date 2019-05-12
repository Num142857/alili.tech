---
title: 'Vue全家桶高仿网易云音乐-还有小程序版' 
date: 2019-01-08 2:30:11
hidden: true
slug: qahiokel33a
categories: [reprint]
---

{{< raw >}}

                    
<p>功能最多，按照ios客户端高仿，还有小程序版嘞</p>
<blockquote><p>网易忠粉，去年小程序刚出来时候开始用小程序写过一版高仿ios版网易云音乐。一直在踩坑，基本完成后开始考虑用vue实现(其实是懒，想脱坑)。vue之前仅限于活动页使用，全家桶没用过，所以这次也是边学边做，很多东西来回重写了好多次。</p></blockquote>
<h2 id="articleHeader0">遇到的问题</h2>
<ol>
<li>第一次用全家桶，不过vuex确实是神器，写过小程序，数据同步状态管理简直了。。。</li>
<li>数据接口格式不同，fm,单曲，节目三种格式，用一个audio。写的头大</li>
</ol>
<h2 id="articleHeader1">技术栈</h2>
<ol>
<li>Vue全家桶(vue,vue-router,vuex)</li>
<li>axios(http)</li>
<li>mint-ui+移植原来小程序版的css</li>
<li>node(接口服务)，<a href="https://github.com/sqaiyan/netmusic-node" rel="nofollow noreferrer" target="_blank">地址在这里</a>
</li>
<li>图片资源来自ios端解压缩文件</li>
</ol>
<h2 id="articleHeader2">项目地址, 欢迎 star，issue</h2>
<p>vps ip已经被封 无法在线预览</p>
<ol>
<li>
<a href="https://github.com/sqaiyan/neteasemusic" rel="nofollow noreferrer" target="_blank">Vue版</a> ：<a href="https://github.com/sqaiyan/neteasemusic" rel="nofollow noreferrer" target="_blank">https://github.com/sqaiyan/ne...</a>
</li>
<li>
<a href="https://github.com/sqaiyan/netmusic-app" rel="nofollow noreferrer" target="_blank">小程序版</a> ：<a href="https://github.com/sqaiyan/netmusic-app" rel="nofollow noreferrer" target="_blank">https://github.com/sqaiyan/ne...</a>
</li>
<li>
<a href="https://github.com/sqaiyan/netmusic-node" rel="nofollow noreferrer" target="_blank">node后端</a> ：<a href="https://github.com/sqaiyan/netmusic-node" rel="nofollow noreferrer" target="_blank">https://github.com/sqaiyan/ne...</a>
</li>
</ol>
<h2 id="articleHeader3">部署</h2>
<h3 id="articleHeader4">后端项目</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 克隆node后端代码到本地
git clone git@github.com:sqaiyan/netmusic-node.git

cd netmusic-node 

# install dependencies
npm install 

# serve at localhost:3000
node app.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># 克隆node后端代码到本地</span>
git <span class="hljs-built_in">clone</span> git@github.com:sqaiyan/netmusic-node.git

<span class="hljs-built_in">cd</span> netmusic-node 

<span class="hljs-comment"># install dependencies</span>
npm install 

<span class="hljs-comment"># serve at localhost:3000</span>
node app.js</code></pre>
<h3 id="articleHeader5">前台项目</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash"><span class="hljs-comment"># install dependencies</span>
npm install

<span class="hljs-comment"># serve with hot reload at localhost:8080</span>
npm run dev

<span class="hljs-comment"># build for production with minification</span>
npm run build

<span class="hljs-comment"># build for production and view the bundle analyzer report</span>
npm run build --report</code></pre>
<h2 id="articleHeader6">预览图<a href="http://7vik7b.com1.z0.glb.clouddn.com/20170612_164110.gif" rel="nofollow noreferrer" target="_blank">gif版比较大</a>、</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010191561" src="https://static.alili.tech/img/remote/1460000010191561" alt="2" title="2" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010191562" src="https://static.alili.tech/img/remote/1460000010191562" alt="2" title="2" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010191563" src="https://static.alili.tech/img/remote/1460000010191563" alt="2" title="2" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010191564" src="https://static.alili.tech/img/remote/1460000010191564" alt="2" title="2" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010191565" src="https://static.alili.tech/img/remote/1460000010191565" alt="2" title="2" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010191566" src="https://static.alili.tech/img/remote/1460000010191566" alt="2" title="2" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010191567" src="https://static.alili.tech/img/remote/1460000010191567" alt="2" title="2" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010191568" src="https://static.alili.tech/img/remote/1460000010191568" alt="2" title="2" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010191569" src="https://static.alili.tech/img/remote/1460000010191569" alt="2" title="2" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010191570" src="https://static.alili.tech/img/remote/1460000010191570" alt="2" title="2" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010191571" src="https://static.alili.tech/img/remote/1460000010191571" alt="2" title="2" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010191572" src="https://static.alili.tech/img/remote/1460000010191572" alt="2" title="2" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010191573" src="https://static.alili.tech/img/remote/1460000010191573" alt="2" title="2" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010191574" src="https://static.alili.tech/img/remote/1460000010191574" alt="2" title="2" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010191575" src="https://static.alili.tech/img/remote/1460000010191575" alt="2" title="2" style="cursor: pointer;"></span></p>
<p><a href="http://7vik7b.com1.z0.glb.clouddn.com/20170308_112339.gif" rel="nofollow noreferrer" target="_blank">小程序版预览图gif</a></p>
<h2 id="articleHeader7">已完成功能</h2>
<ol>
<li>首页（个性推荐，分类歌单，电台推荐，热门排行</li>
<li>搜索（hot ,history ,suggest ,multimatch; 单曲，歌单，歌手，mv等。。。</li>
<li>详情单页类（歌单，歌手，电台，专辑，评论，用户，相似推荐，每日推荐</li>
<li>播放页（单曲，FM，节目：上下一曲，播放模式[单曲，随机，顺序]，单曲喜欢，单曲收藏到歌单，fm trash，快进快退，歌词，播放列表</li>
<li>我的（登录，云盘，收藏</li>
</ol>
<h2 id="articleHeader8">待完成功能（根据api破解情况</h2>
<ol>
<li>评论（操作类</li>
<li>动态</li>
<li>音质切换</li>
<li>歌词翻译<br>....</li>
</ol>
<h2 id="articleHeader9">存在的问题或bug</h2>
<ol>
<li>单曲播放进入评论等前进页面，单曲播放完自动播放下一曲后页面回退回播放页面 路由自动切换不了，会播放上一曲，逻辑这块没理顺</li>
<li>目前的api基本都是根据官网版扒下来的，git上发布的一些也基本都是这样，客户端接口用的是最新版的 没有能力扒出来。存在问题是banner接口请求到的是老接口数据，已经不维护了的数据</li>
<li>mint-ui库就用到几个功能，准备单独扣出来或自己写，去掉对这个库的引用。</li>
<li>手机真机性能不咋地吧，可能功能多js太大了，有的页面逻辑不好影响的吧。整体keepalive了，这。。。有时间研究下怎么搞</li>
</ol>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue全家桶高仿网易云音乐-还有小程序版

## 原文链接
[https://segmentfault.com/a/1190000010191556](https://segmentfault.com/a/1190000010191556)

