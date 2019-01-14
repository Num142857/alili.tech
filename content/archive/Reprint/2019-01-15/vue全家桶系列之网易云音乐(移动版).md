---
title: 'vue全家桶系列之网易云音乐(移动版)' 
date: 2019-01-15 2:30:12
hidden: true
slug: q4kur8uroto
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">网易云音乐（移动版）</h2>
<ul>
<li><p><a href="https://github.com/Binaryify/NeteaseCloudMusicApi" rel="nofollow noreferrer" target="_blank">api来源</a>(感谢Binaryify不断更新的网易云音乐接口，这也将是这个项目不断拓展下去的坚实依托)</p></li>
<li><p><a href="https://github.com/ddqre12345/vue-music" rel="nofollow noreferrer" target="_blank">源码地址</a></p></li>
<li><p><a href="http://118.89.226.181:8080" rel="nofollow noreferrer" target="_blank">项目预览</a>（web端在chrome调试模式下效果更佳）</p></li>
<li><p>针对segmenfault类app暂时无法有效预览的问题，建议粘贴<a href="http://118.89.226.181:8080" rel="nofollow noreferrer" target="_blank">http://118.89.226.181:8080</a>到手机其他浏览器体验</p></li>
<li><p>项目所提供请求地址希望仅供预览使用，如果在开发过程中调用，可能会引起服务崩溃，本地开发建议参考<a href="https://github.com/Binaryify/NeteaseCloudMusicApi" rel="nofollow noreferrer" target="_blank">api来源</a>，配置本地服务器代理，健康绿色环保(看样子，PM守护之光要提上日程了)</p></li>
</ul>
<h2 id="articleHeader1">项目描述</h2>
<blockquote><p>前端</p></blockquote>
<ul>
<li><p>选用Vux作为UI框架，诸如滑动，轮播等组件即在此基础上进行定制，交互效果也尽量依托于vux，减少重复开发</p></li>
<li><p>基于Vue2,Vue-Router实现单页面应用</p></li>
<li><p>利用Vuex进行组件间的状态管理，实现非父子组件之间的通信</p></li>
</ul>
<blockquote><p>后端</p></blockquote>
<ul>
<li><p>生产环境下，服务器端同源解决请求代理</p></li>
<li><p>开发环境下，通过代理服务器解决跨域问题</p></li>
</ul>
<blockquote><p>UI</p></blockquote>
<ul><li><p>刀耕火种，通过手机截图，像素眼比较，当然，最后还是跟着感觉走了</p></li></ul>
<blockquote><p>已完成</p></blockquote>
<ul>
<li><p>网易云（轮播，推荐歌单，独家放送，推荐MV，网友精选歌单（最新，最热），排行榜）</p></li>
<li><p>搜索（热门搜索，搜索结果包括单曲，歌手，专辑，歌单，用户及其滑动切换）</p></li>
<li><p>播放页面（歌词，碟片切换）</p></li>
<li><p>歌手，专辑，歌单，用户等详情展示</p></li>
<li><p>音乐播放功能（切歌，播放列表，播放进度显示）</p></li>
</ul>
<blockquote><p>放一波效果图</p></blockquote>
<p><span class="img-wrap"><img data-src="https://github.com/ddqre12345/vue-music/blob/master/static/vue-music-1.gif?raw=true" src="https://static.alili.techhttps://github.com/ddqre12345/vue-music/blob/master/static/vue-music-1.gif?raw=true" alt="发现" title="发现" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="https://github.com/ddqre12345/vue-music/blob/master/static/vue-music-2.gif?raw=true" src="https://static.alili.techhttps://github.com/ddqre12345/vue-music/blob/master/static/vue-music-2.gif?raw=true" alt="搜索" title="搜索" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="https://github.com/ddqre12345/vue-music/blob/master/static/vue-music-3.gif?raw=true" src="https://static.alili.techhttps://github.com/ddqre12345/vue-music/blob/master/static/vue-music-3.gif?raw=true" alt="详情" title="详情" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="https://github.com/ddqre12345/vue-music/blob/master/static/vue-music-4.gif?raw=true" src="https://static.alili.techhttps://github.com/ddqre12345/vue-music/blob/master/static/vue-music-4.gif?raw=true" alt="测试" title="测试" style="cursor: pointer;"></span><br>图片就到这里，<a href="http://118.89.226.181:8080" rel="nofollow noreferrer" target="_blank">more</a></p>
<h2 id="articleHeader2">计划(接下来)</h2>
<p>1.MV播放，希望这个功能能走下去<br>2.“我的”争取还是做出来吧，尽管可能没人敢用<br>3.完善各个页面的功能吧，持续优化<br>4.抛砖引玉，向社区的大伙学习ing</p>
<h2 id="articleHeader3">最后！！！！！</h2>
<p>1.感谢<a href="https://github.com/" rel="nofollow noreferrer" target="_blank">github</a>,感谢同样在分享的你，让我能站在巨人的肩膀上<br>2.感谢<a href="https://github.com/Binaryify" rel="nofollow noreferrer" target="_blank">Binaryify</a>对接口文档的不断维护与更新。<br>这个项目中遇到了不少莫名其妙的坑，后面再与大伙交流，要不忘了，又得重踩</p>
<p>到这里，欢迎大家提issue，pr，star，如果喜欢可以watch，每周应该都会有些小更新</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue全家桶系列之网易云音乐(移动版)

## 原文链接
[https://segmentfault.com/a/1190000009339117](https://segmentfault.com/a/1190000009339117)

