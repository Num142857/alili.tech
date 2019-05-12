---
title: 'html5实现在线响应式音乐播放器' 
date: 2019-02-02 2:30:10
hidden: true
slug: hexw6rkxow9
categories: [reprint]
---

{{< raw >}}

                    
<p>大概很早的时候就有想法做一个音乐播放器玩玩，以前可能还考虑过做APP，大一的时候第一个html的静态页面也是做的音乐网站，想想，大概小时候比较喜欢音乐吧。然而，现在入了前端大坑，就用h5做一个耍耍好了。功能不多，UI不美，But，练习了html5中audio及其API的使用。欢迎吐槽~</p>
<h1 id="articleHeader0">功能思路分析</h1>
<p>用了这么多年的音乐播放软件，目前已是网易云音乐的重度用户。<br>一个基本的音乐播放器基础功能有：播放、暂停、歌曲切换。<br>用户体验基础功能：歌曲跳跃播放、音量调整、歌曲单曲或列表循环。<br>当了解这些之后，再瞅一眼audio的api，简直了，基本上都能实现，开做。</p>
<h1 id="articleHeader1">页面实现</h1>
<p>采用了比较喜欢的深蓝渐变背景加活力黄搭配，界面没啥好说的，萝卜白菜，各有所爱。<br>用css3媒体查询实现响应式，删除不必要的区域。</p>
<h1 id="articleHeader2">js实现</h1>
<p>1.设置默认属性</p>
<blockquote>
<p>默认不自动播放<code>audio.autoplay = false;</code><br>  默认不单曲循环<code>audio.loop = false;</code><br>初始化音量<code>audio.volume = 0.5;</code><br>默认不自动缓冲加载<code>audio.autobuffer = false;</code></p>
<p>2.基本功能实现</p>
</blockquote>
<p>这里不提了，有想了解的可以去github(地址)看源码。<br>3.细节实现</p>
<blockquote><p>①利用定时器实时显示歌曲播放时间，利用百分比来动态改变进度条的长度。</p></blockquote>
<p>②利用<code>audio.readyState</code>来设置缓冲进度，用css3来实现平滑改变</p>
<blockquote><p>③可点击歌曲进度条任意位置实现跳转播放，音量同理<br>④实现静音，单曲循环和列表循环</p></blockquote>
<h1 id="articleHeader3">在线音乐实现</h1>
<p>这次采用的是网易云音乐的API来进行在线音乐的实现。此处参考了<a href="http://zhaomenghuan.github.io/#" rel="nofollow noreferrer" target="_blank">小青年</a>的文章<a href="http://zhaomenghuan.github.io/#" rel="nofollow noreferrer" target="_blank">html5+ XMLHttpRequest 与mui ajax用法详解</a>。<br>利用事件委托，为动态加载的结果绑定监听事件。将搜到的资源数据加载到audio中去，然后播放在线资源。<br>本来想加入<code>localStorage</code>存储播放列表的，对于体验还有所考虑，毕竟只是个玩儿的东西，所以保留想法了，没有加入。</p>
<h1 id="articleHeader4">上结果</h1>
<p><span class="img-wrap"><img data-src="/img/bVEy6i?w=1072&amp;h=585" src="https://static.alili.tech/img/bVEy6i?w=1072&amp;h=585" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVEy6k?w=326&amp;h=579" src="https://static.alili.tech/img/bVEy6k?w=326&amp;h=579" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>不得不承认，总结能力真的有够差，直接上结果吧：(<a href="http://fehey.com/hey-Audio/)" rel="nofollow noreferrer" target="_blank">http://fehey.com/hey-Audio/)</a><br>  喜欢的可以去github看<a href="https://github.com/EryouHao/hey-Audio" rel="nofollow noreferrer" target="_blank">源码</a>，有什么改进，欢迎留言（star也不介意哦?）~</p>
<p>个人博客：(<a href="http://fehey.com/)" rel="nofollow noreferrer" target="_blank">http://fehey.com/)</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
html5实现在线响应式音乐播放器

## 原文链接
[https://segmentfault.com/a/1190000007245705](https://segmentfault.com/a/1190000007245705)

