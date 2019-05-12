---
title: 'vue网易云音乐v2.0(mv播放等你来看)' 
date: 2019-01-10 2:30:08
hidden: true
slug: axi45hyyedg
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">网易云音乐</h1>
<p>希望它在用vue高仿网易云音乐webapp的路上走的更远，我们的目标是更像，更快，更优雅</p>
<h3 id="articleHeader1">vue网易云音乐webapp版</h3>
<blockquote><p>Star，Star，Star，这是对我最大的鼓励，重要的话说三遍，广告就要放在最显眼的地方，哈哈。</p></blockquote>
<ul>
<li><p><a href="https://github.com/Binaryify/NeteaseCloudMusicApi" rel="nofollow noreferrer" target="_blank">api来源</a>(再次感谢Binaryify不断更新的网易云音乐接口，这也将是这个项目不断拓展下去的坚实依托，看着他的star蹭蹭蹭的往上涨，我必须厚着脸皮说有我一份功劳)</p></li>
<li><p><a href="https://github.com/ddqre12345/vue-music" rel="nofollow noreferrer" target="_blank">源码地址</a></p></li>
<li><p><a href="http://118.89.226.181:8080" rel="nofollow noreferrer" target="_blank">项目预览</a>（web端在chrome调试模式下效果更佳）</p></li>
<li><p>针对segmenfault类app暂时无法有效预览的问题，建议粘贴 <a href="http://118.89.226.181:8080" rel="nofollow noreferrer" target="_blank">http://118.89.226.181:8080</a> 到手机其他浏览器体验</p></li>
<li><p>项目所提供请求地址希望仅供预览使用，本地开发建议参考<a href="https://github.com/Binaryify/NeteaseCloudMusicApi" rel="nofollow noreferrer" target="_blank">api来源</a>，配置本地服务器代理</p></li>
<li><p>这是个连载的故事，预知前事如何，请跳转<a href="https://segmentfault.com/a/1190000009339117?_ea=2099626">网易云音乐v1.0</a>,现在我主要讲的是这个版本的更新内容</p></li>
</ul>
<h3 id="articleHeader2">技术栈</h3>
<ul>
<li><p>Vue2：基于vue2进行组件化，模块化开发</p></li>
<li><p>Vuex：管理公共组件状态量</p></li>
<li><p>vue-router：管理单页面应用路由</p></li>
<li><p>axios：发起http请求</p></li>
<li><p>stylus：css预处理语言</p></li>
<li><p>Express：vue-cli使用Express做服务器。</p></li>
<li><p>Webpack：自动化构建工具，主要配置vue-cli脚手架提供。</p></li>
<li><p>ES6：采用ES6语法。</p></li>
<li><p>CSS3：CSS3动画及样式。</p></li>
</ul>
<h3 id="articleHeader3">功能介绍</h3>
<blockquote><p>v2.0 | 2017.07.01</p></blockquote>
<ul>
<li>
<p>新增功能</p>
<ul>
<li><p>mv播放详情页，包括mv播放，mv介绍，相似mv，mv评论，相似mv播放切换</p></li>
<li><p>歌手详情页：歌手mv</p></li>
<li><p>专辑详情页：专辑评论，专辑介绍详情</p></li>
<li><p>歌单详情页：歌单评论，歌单介绍详情</p></li>
<li><p>个性推荐增加最新音乐，主播电台</p></li>
<li><p>排行榜增加全球榜</p></li>
<li><p>排行榜榜单详情页，包括歌曲排名，歌单评论</p></li>
<li><p>上滑歌单组件歌单循环，单曲，随机播放切换，歌曲播放效果增加</p></li>
</ul>
</li>
<li>
<p>功能优化</p>
<ul>
<li><p>转场效果优化</p></li>
<li><p>播放展示功能优化</p></li>
</ul>
</li>
<li><p>组件优化</p></li>
<li><p>UI框架统一为vux（历史遗留问题）</p></li>
</ul>
<blockquote><p>新增功能效果图</p></blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010049502" src="https://static.alili.tech/img/remote/1460000010049502" alt="mv播放机mv评论" title="mv播放机mv评论" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010049503?w=401&amp;h=739" src="https://static.alili.tech/img/remote/1460000010049503?w=401&amp;h=739" alt="歌单排行榜全球版及评论" title="歌单排行榜全球版及评论" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000010049504?w=401&amp;h=739" src="https://static.alili.tech/img/remote/1460000010049504?w=401&amp;h=739" alt="点击播放全部,歌曲循环，随机，单曲切换，专辑歌单详情，评论等" title="点击播放全部,歌曲循环，随机，单曲切换，专辑歌单详情，评论等" style="cursor: pointer;"></span></p>
<p>图片就到这里，<a href="http://118.89.226.181:8080" rel="nofollow noreferrer" target="_blank">more</a></p>
<h3 id="articleHeader4">最后！！！！！</h3>
<p>1.感谢<a href="https://github.com/" rel="nofollow noreferrer" target="_blank">github</a>,感Gay(git)hub同样在分享的你，让我能站在巨人的肩膀上</p>
<p>2.感谢<a href="https://github.com/Binaryify" rel="nofollow noreferrer" target="_blank">Binaryify</a>对接口文档的不断维护与更新。</p>
<p>3.在下个版本前我可能会和大家分享下定制mv视频播放器部分遇到的一些坑以及基于vue-cli的webpack打包优化,如何有兴趣可以watch me！！！</p>
<p>到这里，欢迎大家提issue，输出pr，点star，如果喜欢更可以watch，下阶段项目进展请关注<a href="https://github.com/ddqre12345/vue-music/projects/2" rel="nofollow noreferrer" target="_blank">v3.0小黑板</a>，如果你在关注这个项目，请把你的想法或者看到的项目中的那些不足告诉我，或者在<a href="https://github.com/ddqre12345/vue-music/projects?query=is%3Aopen" rel="nofollow noreferrer" target="_blank">小黑板板</a>上留言。本项目仅供学习交流使用，切勿用于商业用途，如有侵犯第三方版权问题及时联系我</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue网易云音乐v2.0(mv播放等你来看)

## 原文链接
[https://segmentfault.com/a/1190000010049495](https://segmentfault.com/a/1190000010049495)

