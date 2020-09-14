---
title: 'Vue.js全家桶低仿网易云音乐(MacOS版) 已新增electron打包pc平台app' 
date: 2019-01-13 2:30:11
hidden: true
slug: u8i41y1hy4k
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">项目地址</h2>
<ul>
<li><p>暂时只实现了基本功能 加了一点微?小的效果</p></li>
<li><p>主要适配pc浏览器 对android 和ios 做了一点微?小的适配</p></li>
<li><p>现在已经包括了electron 打包 pc平台app的功能了</p></li>
<li><p><a href="https://github.com/lichddd/ntrmusic" rel="nofollow noreferrer" target="_blank">源码地址</a></p></li>
<li><p><a href="http://ntrmusic.duapp.com/" rel="nofollow noreferrer" target="_blank">项目预览</a></p></li>
</ul>
<h2 id="articleHeader1">项目描述</h2>
<blockquote><p>前端部分</p></blockquote>
<ul>
<li><p>整体app加载进度</p></li>
<li><p>懒加载模块的加载中提示</p></li>
<li><p>实现了滑块、tooltip、增量分页、3d新曲 等</p></li>
<li><p>使用了Vue.js做单页应用</p></li>
<li><p>使用了Vue Router处理路由</p></li>
<li><p>使用了Vuex管理组件间的状态，实现非父子组件之间的通信（并没有怎么用到，因为没用到全局状态 每个页面的播放歌曲是通过注入的方法触发的）</p></li>
<li><p>使用了electron 打包成pc平台app</p></li>
</ul>
<blockquote><p>后端部分</p></blockquote>
<ul>
<li><p>直接用了一个请求转发使用网易的api</p></li>
<li><p>使用了一个2毛一天的云服务器</p></li>
</ul>
<blockquote><p>完成情况</p></blockquote>
<ul><li><p>网易云音乐首页（热门歌单、排行榜、最新音乐）</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVOK6v?w=2558&amp;h=1194" src="https://static.alili.tech/img/bVOK6v?w=2558&amp;h=1194" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVOK7f?w=2556&amp;h=1190" src="https://static.alili.tech/img/bVOK7f?w=2556&amp;h=1190" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVOK7g?w=2558&amp;h=1180" src="https://static.alili.tech/img/bVOK7g?w=2558&amp;h=1180" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ul><li><p>搜索（歌曲搜索、歌手搜索、歌单搜索、专辑搜索）</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVOK7s?w=2550&amp;h=1180" src="https://static.alili.tech/img/bVOK7s?w=2550&amp;h=1180" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li><p>播放音乐（暂只支持单曲）</p></li>
<li><p>歌单、专辑、歌手信息等展示页</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVOK7y?w=2554&amp;h=1182" src="https://static.alili.tech/img/bVOK7y?w=2554&amp;h=1182" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVOK8r?w=502&amp;h=886" src="https://static.alili.tech/img/bVOK8r?w=502&amp;h=886" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ul><li><p>pc平台app 实测 MacOS和Win linux未测</p></li></ul>
<p><span class="img-wrap"><img data-src="/img/bVPPS0?w=1760&amp;h=1156" src="https://static.alili.tech/img/bVPPS0?w=1760&amp;h=1156" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span><br><span class="img-wrap"><img data-src="/img/bVPPS8?w=1680&amp;h=960" src="https://static.alili.tech/img/bVPPS8?w=1680&amp;h=960" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js全家桶低仿网易云音乐(MacOS版) 已新增electron打包pc平台app

## 原文链接
[https://segmentfault.com/a/1190000009675246](https://segmentfault.com/a/1190000009675246)

