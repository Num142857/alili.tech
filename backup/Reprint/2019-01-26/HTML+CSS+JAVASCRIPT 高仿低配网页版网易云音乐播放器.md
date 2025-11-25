---
title: 'HTML+CSS+JAVASCRIPT 高仿低配网页版网易云音乐播放器' 
date: 2019-01-26 2:30:18
hidden: true
slug: 0hqst6af5tx
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">HTML+CSS+JAVASCRIPT 高仿低配网页版网易云音乐播放器</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016411790?w=1359&amp;h=657" src="https://static.alili.tech/img/remote/1460000016411790?w=1359&amp;h=657" alt="app-poster" title="app-poster" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">前言</h3>
<p>没有使用任何框架，只是想用最简单纯js的代码实现下</p>
<ul>
<li>前台: Javascript+jQuery</li>
<li>后台: php/nodejs（php是参考网上的例子写的，nodejs代码是在php的基础上重新写的）</li>
<li>还有她的姊妹篇（网易云音乐移动端），请查看这里  <a href="https://github.com/Yangfan2016/cloud-music-mobile#cloud-music-mobile" rel="nofollow noreferrer" target="_blank">https://github.com/Yangfan2016/cloud-music-mobile#cloud-music-mobile</a>
</li>
</ul>
<h3 id="articleHeader2">写在前头的话</h3>
<p>鄙人野生前端一只，gis专业，自学前端已经一年多了，为什么要写个音乐播放器呢？原因有两个：</p>
<ol>
<li>本人是网易云音乐的重度用户，近乎疯狂</li>
<li>自学了前端这么久了，也是想检验下自己的成果吧</li>
</ol>
<h3 id="articleHeader3">本播放器要干什么呢</h3>
<ol>
<li>简单的 <strong>播放</strong> <strong>暂停</strong> 那当然不能少</li>
<li>切换歌曲，<strong>上一首</strong> 、 <strong>下一首</strong> 也得有</li>
<li>
<strong>进度条</strong> ，这个有点复杂，本来想用 input[range] 写，但是样式不好改，自己用多个div代替吧</li>
<li>进度条都有了，<strong>音量调节</strong> 不能少吧，毕竟他俩UI样式差不多，照猫画虎呗</li>
<li>再加一个 <strong>静音功能</strong> ，省的音乐太大声，邻居找茬哦(⊙o⊙)</li>
</ol>
<h3 id="articleHeader4">本播放器还能干什么呢</h3>
<ol>
<li>
<strong>歌词滚动</strong> 有木有</li>
<li><strong>搜索单曲</strong></li>
<li>
<strong>指定歌单播放</strong>  这个需要知道歌单的 id 不是很好找，（得上<a href="http://music.163.com" rel="nofollow noreferrer" target="_blank">网易云音乐官网</a>登录自己的账号，找到歌单，点进去，抬头看URL 里最后的 id 参数）暂时用的是“我喜欢的音乐”（歌单）的id</li>
</ol>
<p><span class="img-wrap"><img data-src="/img/remote/1460000016411791?w=1366&amp;h=363" src="https://static.alili.tech/img/remote/1460000016411791?w=1366&amp;h=363" alt="music-like" title="music-like" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader5">那闲话不多说，开整吧（原谅一个理科生的表达能力）</h3>
<p>我模仿的是网易云音乐的PC端，所用到的技术都是前端的基本技术 HTML、CSS、JAVASCRIPT  <br>由于我是自学的，没有那么多规矩，我这个人看到是我感兴趣的，我立马就会去做，这个播放器也不例外。</p>
<blockquote>首先先的将它“画”出来（HTML+CSS）</blockquote>
<p>我仔细看了下网易云音乐PC端的布局，大致分为四部分，四个模块</p>
<ol>
<li>顶部菜单（顶部导航，叫什么名无所谓了）</li>
<li>底部播放条 这是播放器的核心</li>
<li>主体内容在右边 歌单的详细信息和歌曲列表</li>
<li>左侧是导航和歌单组</li>
<li>左下角还有一个小窗，显示正在播放歌曲的简要信息，点击小窗 展开一个歌曲详情页</li>
</ol>
<p>无图不真相<br><span class="img-wrap"><img data-src="/img/remote/1460000016411792?w=1366&amp;h=728" src="https://static.alili.tech/img/remote/1460000016411792?w=1366&amp;h=728" alt="pc-music" title="pc-music" style="cursor: pointer;"></span><br><span class="img-wrap"><img data-src="/img/remote/1460000016411793?w=1366&amp;h=731" src="https://static.alili.tech/img/remote/1460000016411793?w=1366&amp;h=731" alt="pc-music" title="pc-music" style="cursor: pointer;"></span></p>
<blockquote>然后呢，写页面逻辑JavaScript</blockquote>
<h3 id="articleHeader6">播放器</h3>
<ol><li>播放器的控制按钮</li></ol>
<p>播放(暂停)按钮，这个可以通过<code> play() </code>和<code> pause()</code>方法实现</p>
<ol><li>进度条</li></ol>
<p>这个通过监听<code>timeupdate</code>事件，实施更新当前播放位置，<br>通过监听鼠标移动事件，改变进度条的长度</p>
<ol><li>静音按钮，可以通过<code>audio.muted=true</code>实现</li></ol>
<h3 id="articleHeader7">初始化歌单列表</h3>
<p>网易云音乐获取歌单的API <br><a href="http://music.163.com/api/playlist/detail?id=" rel="nofollow noreferrer" target="_blank">http://music.163.com/api/play...</a>[id]</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="id 歌单id
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code><span class="hljs-built_in">id</span> 歌单<span class="hljs-built_in">id</span>
</code></pre>
<p>因为涉及到跨域问题。暂时我前台这边又没有办法跨域，所以参考了网上的代码，<del>写个PHP做代理</del> （2018-09-14更新：现在代码已改为Nodejs做代理服务），这样就不存在跨域问题了。<br>获取到歌单数据后，重新渲染下DOM</p>
<h3 id="articleHeader8">搜索歌曲</h3>
<p>网易云音乐获取歌曲的API  <br><a href="http://s.music.163.com/search/get?s=" rel="nofollow noreferrer" target="_blank">http://s.music.163.com/search...</a>[songname]&amp;type=1&amp;limit=10</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="s           搜索内容
type        搜索类型
limit       搜索返回结果数

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>s           搜索内容
<span class="hljs-keyword">type</span>        <span class="hljs-type">搜索类型
</span>limit       搜索返回结果数

</code></pre>
<h3 id="articleHeader9">歌曲详情页</h3>
<p>主要是歌词和歌词滚动</p>
<p>网易云音乐获取歌词API  <br><a href="http://music.163.com/api/song/lyric?os=pc&amp;id=" rel="nofollow noreferrer" target="_blank">http://music.163.com/api/song...</a>[id]</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="id 歌曲id
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code><span class="hljs-built_in">id</span> 歌曲<span class="hljs-built_in">id</span>
</code></pre>
<p>歌词滚动，先把获取到的歌词数据分割成时间点和歌词两部分，将这两部分存入dataset中，<br>通过监听timeupdate事件，判断和当前播放时间相近的歌词，记录它的getBoundingClient()的top值，将滚动条设置到指定位置 例如：<code>ele.srcollTop=100;</code></p>
<h3 id="articleHeader10">先写到这里吧</h3>
<p>总结能力太差了，原谅理科生的无奈</p>
<h3 id="articleHeader11">附录</h3>
<p><a href="https://github.com/Yangfan2016/cloud-music-web" rel="nofollow noreferrer" target="_blank">完整源码，点击查看</a>  <br><a href="https://github.com/Yangfan2016/cloud-music-web/tree/master/server" rel="nofollow noreferrer" target="_blank">后台代码，点击查看</a></p>
<p>此文源自我的<a href="https://yangfan2016.github.io/2017/02/18/%E7%BD%91%E6%98%93%E4%BA%91%E9%9F%B3%E4%B9%90%E6%92%AD%E6%94%BE%E5%99%A8/" rel="nofollow noreferrer" target="_blank">博客</a></p>
<h4>大佬，给个<a href="https://github.com/Yangfan2016/cloud-music-web" rel="nofollow noreferrer" target="_blank">start</a>呗^_^</h4>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
HTML+CSS+JAVASCRIPT 高仿低配网页版网易云音乐播放器

## 原文链接
[https://segmentfault.com/a/1190000008424481](https://segmentfault.com/a/1190000008424481)

