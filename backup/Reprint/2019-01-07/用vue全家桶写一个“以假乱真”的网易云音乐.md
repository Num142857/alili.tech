---
title: '用vue全家桶写一个“以假乱真”的网易云音乐' 
date: 2019-01-07 2:30:10
hidden: true
slug: enbpqbypxum
categories: [reprint]
---

{{< raw >}}

                    
<p>标题略夸张了，但是这个从ui还原上已经很接近官方版本了。虽然目前这个是很多人造过的轮子，但是可能每个人的实现方式都不一样，自己写一遍也会有许多收获。</p>
<blockquote>
<p><a href="https://github.com/tgxhx/vue-music" rel="nofollow noreferrer" target="_blank">项目地址</a></p>
<p><a href="http://39.108.14.248/music" rel="nofollow noreferrer" target="_blank">预览地址</a></p>
<p>api：ap使用的是一个开源的nodejs封装的网易云音乐api，<a href="https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e5%ae%89%e8%a3%85" rel="nofollow noreferrer" target="_blank">地址</a></p>
</blockquote>
<h2 id="articleHeader0">技术栈</h2>
<ul>
<li>vue2：基础框架</li>
<li>vue-router2：路由跳转</li>
<li>vuex：全局数据管理</li>
<li>es6：采用部分es6特性，大大简化了写法</li>
<li>webpack：vue-cli基于webpack，修改了部分配置</li>
<li>axios：基于Promise的http库，用来请求数据</li>
<li>scss：写起css来十分方便，需要安装sass-loader，另外使用自定义其中的自定义函数配合rem来适配移动端设备简直不要太方便</li>
<li>flex：弹性布局，在移动端兼容性较好，写各种布局非常方便</li>
<li>
<a href="https://github.com/vuematerial/vue-material" rel="nofollow noreferrer" target="_blank">vue-material</a>：一个Android上material design风格的组件库</li>
</ul>
<h2 id="articleHeader1">说明</h2>
<ol>
<li>这个项目大小组件大概二十几个，目前还未完工，以后还会继续更新，目标是还原整个网易云音乐（虽然不知道什么时候能填完坑o(╯□╰)o）。</li>
<li>关于路由，刚开始设计路由的时候想了很多，由于一开始的目标就是网易云音乐的所有内容，所以设计了三级路由，/root/index/recommed，大概这样，<a href="https://github.com/tgxhx/vue-music/blob/e43c4975e42b93b6ccf5d8609687879a589d4d8f/src/router/index.js" rel="nofollow noreferrer" target="_blank">点击查看</a>。</li>
<li>关于体会，写到这个项目也算是对vue全家桶比较熟了，体会就是，不论是简单的复杂的项目，只要分割成一个个组件再拼起来，也没什么难的，组件之间通信又有vuex，也是非常简单的，总之就是熟能生巧。</li>
<li>关于难点，对于自己来说，audio标签以前没有接触过，有点麻烦，不过还算有<a href="http://caibaojian.com/html5-audio.html" rel="nofollow noreferrer" target="_blank">相关文档</a>；歌词滚动，参考<a href="http://www.brafox.com/post/2015/HTML5/js%E8%A7%A3%E6%9E%90lrc%E6%AD%8C%E8%AF%8D-%E5%88%B6%E4%BD%9C%E6%BB%9A%E5%8A%A8%E6%AD%8C%E8%AF%8D.html" rel="nofollow noreferrer" target="_blank">这里</a>，部分歌曲还是有点问题，待解决;播放器背景图，这个当时考虑了很久，因为网易云音乐的播放器背景图就是当前歌曲的专辑图，还是模糊效果，最后实现方式是在当前组件的二级div设置当前歌曲的背景图，大小覆盖父元素，为防止第一次播放或者切歌的时候没有图，在组件的根元素也设置一张背景默认图，具体可以<a href="https://github.com/tgxhx/vue-music/blob/771218f2929de6b64a34c62597777a4fc0b6ed6e/src/components/Player.vue" rel="nofollow noreferrer" target="_blank">点击查看</a>；当前歌曲在播放列表中的索引获取，通过es5中数组的findIndex方法，找到当前歌曲的id在数组中的位置，具体可以<a href="https://github.com/tgxhx/vue-music/blob/e43c4975e42b93b6ccf5d8609687879a589d4d8f/src/components/PlayList.vue" rel="nofollow noreferrer" target="_blank">点击查看</a>。</li>
<li>关于打包后的资源路径，比如要放在二级目录www.xxx.com/music，那么修改config/index.js中的assetsPublicPath: '/music/'即可。</li>
<li>关于移动设备适配，我使用的是js动态设置html元素font-size的方式，页面元素使用rem，这样可达到在不同设备下显示内容基本一样的效果，具体可以<a href="https://segmentfault.com/a/1190000008721148">点击</a>，使用方式比如width:100px;可以写成width:pr(100)。</li>
<li>关于图标，使用的是淘宝的iconfont字体图标方案，相比于使用图片图标有许多优势，比如任意缩放、改变颜色、响应式适配设备等等，具体可以参考<a href="https://www.w3cplus.com/css3/icon-fonts.html" rel="nofollow noreferrer" target="_blank">这篇文章</a>。</li>
</ol>
<h2 id="articleHeader2">功能</h2>
<ul>
<li>[x] 首页歌单推荐</li>
<li>[x] 歌单详情</li>
<li>[x] 播放器</li>
<li>[x] 播放暂停</li>
<li>[x] 播放模式切歌（顺序和随机）</li>
<li>[ ] 歌词滚动（待修改）</li>
<li>[x] 歌曲拖动</li>
<li>[x] 播放器底部背景</li>
<li>[x] 播放底栏</li>
<li>[x] 底栏歌词同步</li>
<li>[x] 播放列表</li>
<li>[x] 歌曲评论</li>
<li>[x] 搜索推荐</li>
<li>[x] 搜索分类</li>
</ul>
<h2 id="articleHeader3">部分截图</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010357911" src="https://static.alili.tech/img/remote/1460000010357911" alt="" title="" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/remote/1460000010357912" src="https://static.alili.tech/img/remote/1460000010357912" alt="" title="" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010357913" src="https://static.alili.tech/img/remote/1460000010357913" alt="" title="" style="cursor: pointer; display: inline;"></span><span class="img-wrap"><img data-src="/img/remote/1460000010357914" src="https://static.alili.tech/img/remote/1460000010357914" alt="" title="" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010357915" src="https://static.alili.tech/img/remote/1460000010357915" alt="" title="" style="cursor: pointer;"></span><span class="img-wrap"><img data-src="/img/remote/1460000010357916" src="https://static.alili.tech/img/remote/1460000010357916" alt="" title="" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010357917" src="https://static.alili.tech/img/remote/1460000010357917" alt="" title="" style="cursor: pointer;"></span><span class="img-wrap"><img data-src="/img/remote/1460000010357918" src="https://static.alili.tech/img/remote/1460000010357918" alt="" title="" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
用vue全家桶写一个“以假乱真”的网易云音乐

## 原文链接
[https://segmentfault.com/a/1190000010357908](https://segmentfault.com/a/1190000010357908)

