---
title: '[vue全家桶]每个人都能做的网易云音乐' 
date: 2019-01-11 2:30:08
hidden: true
slug: ixgcezi4a9i
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">仿网易云音乐(webapp)</h1>
<h2 id="articleHeader1">项目地址 (project address)</h2>
<p><a href="https://binaryify.github.io/NeteaseCloudMusicApi/#/" rel="nofollow noreferrer" target="_blank">api来源</a>   感谢binaryify让我能用喜欢的东西做一个属于自己的播放器!  </p>
<p><a href="https://github.com/webfansplz/xcMusic" rel="nofollow noreferrer" target="_blank">源码地址</a>     不要脸的求star 哈哈哈!!!</p>
<p><a href="http://1mhere.cn" rel="nofollow noreferrer" target="_blank">项目预览</a>       1mhere.cn  (pc端按F12切换手机调试模式效果更佳!)</p>
<p><span class="img-wrap"><img data-src="/img/bVPzHO?w=280&amp;h=280" src="https://static.alili.tech/img/bVPzHO?w=280&amp;h=280" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span>   (移动端可直接扫码)</p>
<h2 id="articleHeader2">技术栈 (technology)</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="vue2.0 + vuex + vue-router2.0 + es6 + axios + vux + less + flex" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code style="word-break: break-word; white-space: initial;"><span class="hljs-selector-tag">vue2</span><span class="hljs-selector-class">.0</span> + <span class="hljs-selector-tag">vuex</span> + <span class="hljs-selector-tag">vue-router2</span><span class="hljs-selector-class">.0</span> + <span class="hljs-selector-tag">es6</span> + <span class="hljs-selector-tag">axios</span> + <span class="hljs-selector-tag">vux</span> + <span class="hljs-selector-tag">less</span> + <span class="hljs-selector-tag">flex</span></code></pre>
<h2 id="articleHeader3">文件结构 (File structure)</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── build                       构建服务和webpack配置
├── config                      项目不同环境的配置
├── dist                        项目build目录
├── index.html                  项目入口文件
├── package.json                项目配置文件
├── static                       静态资源
├── src                         生产目录
    |—— api                     api列表和数据处理
    |——|—— apiList.js           api列表
    |——|—— getData.js           数据处理(封装一个axios请求)    
    |—— assets                  静态资源(img,less)
    |——|—— img                  静态图片
    |——|—— style                样式文件  
    |—— components              公用组件
    |——|—— bottomSongList       播放器播放列表组件  
    |——|—— headerNav            头部导航组件
    |——|—— music                音乐组件
    |—— page                    页面组件
    |——|—— albumsListDetails    专辑内容组件 
    |——|—— recommend            个性推荐组件
    |——|—— searchList           搜索列表组件
    |——|—— singer               歌手组件
    |——|—— songDetails          歌曲详情组件
    |——|——|—— player            播放器组件
    |——|—— songList             歌单组件
    |——|—— songListDetails      歌单详情组件
    |——|—— topList              排行榜组件
    |—— router                  路由组件
    |—— store                   数据状态管理组件
    |—— util                    公用方法" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>├── build                       构建服务和webpack配置
├── config                      项目不同环境的配置
├── dist                        项目build目录
├── index.html                  项目入口文件
├── package.json                项目配置文件
├── static                       静态资源
├── src                         生产目录
    |<span class="hljs-string">—— api                     api列表和数据处理
    </span>|<span class="hljs-string">——</span>|<span class="hljs-string">—— apiList.js           api列表
    </span>|<span class="hljs-string">——</span>|<span class="hljs-string">—— getData.js           数据处理(封装一个axios请求)    
    </span>|<span class="hljs-string">—— assets                  静态资源(img,less)
    </span>|<span class="hljs-string">——</span>|<span class="hljs-string">—— img                  静态图片
    </span>|<span class="hljs-string">——</span>|<span class="hljs-string">—— style                样式文件  
    </span>|<span class="hljs-string">—— components              公用组件
    </span>|<span class="hljs-string">——</span>|<span class="hljs-string">—— bottomSongList       播放器播放列表组件  
    </span>|<span class="hljs-string">——</span>|<span class="hljs-string">—— headerNav            头部导航组件
    </span>|<span class="hljs-string">——</span>|<span class="hljs-string">—— music                音乐组件
    </span>|<span class="hljs-string">—— page                    页面组件
    </span>|<span class="hljs-string">——</span>|<span class="hljs-string">—— albumsListDetails    专辑内容组件 
    </span>|<span class="hljs-string">——</span>|<span class="hljs-string">—— recommend            个性推荐组件
    </span>|<span class="hljs-string">——</span>|<span class="hljs-string">—— searchList           搜索列表组件
    </span>|<span class="hljs-string">——</span>|<span class="hljs-string">—— singer               歌手组件
    </span>|<span class="hljs-string">——</span>|<span class="hljs-string">—— songDetails          歌曲详情组件
    </span>|<span class="hljs-string">——</span>|<span class="hljs-string">——</span>|<span class="hljs-string">—— player            播放器组件
    </span>|<span class="hljs-string">——</span>|<span class="hljs-string">—— songList             歌单组件
    </span>|<span class="hljs-string">——</span>|<span class="hljs-string">—— songListDetails      歌单详情组件
    </span>|<span class="hljs-string">——</span>|<span class="hljs-string">—— topList              排行榜组件
    </span>|<span class="hljs-string">—— router                  路由组件
    </span>|<span class="hljs-string">—— store                   数据状态管理组件
    </span>|<span class="hljs-string">—— util                    公用方法</span></code></pre>
<h2 id="articleHeader4">项目功能 (Project Function)</h2>
<h3 id="articleHeader5">完成功能(finish function)</h3>
<ul>
<li><p>个性推荐,歌单,排行榜页面</p></li>
<li><p>滑动功能(左右滑动切换菜单)</p></li>
<li><p>播放功能(快进,快退,上一曲,下一曲,歌词同步等)</p></li>
<li><p>搜索功能(热门搜索,单曲,歌手,专辑,歌单,用户)</p></li>
<li><p>歌单功能(最新,最热,精品歌单及详情展示)</p></li>
<li><p>歌手专辑功能(介绍及详情展示)</p></li>
<li><p>排行榜功能(云音乐官方版)</p></li>
</ul>
<h3 id="articleHeader6">效果图 (effect picture)</h3>
<p><span class="img-wrap"><img data-src="/img/bVPzH7?w=373&amp;h=669" src="https://static.alili.tech/img/bVPzH7?w=373&amp;h=669" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVPzIO?w=374&amp;h=667" src="https://static.alili.tech/img/bVPzIO?w=374&amp;h=667" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVPzJc?w=373&amp;h=667" src="https://static.alili.tech/img/bVPzJc?w=373&amp;h=667" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVPzJe?w=375&amp;h=665" src="https://static.alili.tech/img/bVPzJe?w=375&amp;h=665" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader7">项目运行(Probject running)</h2>
<p>1.克隆项目到本地 : git clone <a href="https://github.com/webfansplz/xcMusic.git" rel="nofollow noreferrer" target="_blank">https://github.com/webfansplz...</a>  </p>
<p>2.安装依赖环境 : npm install      </p>
<p>3.启动项目 : npm run dev        </p>
<p>4.打包项目 : npm run build</p>
<h2 id="articleHeader8">总结(summary)</h2>
<p>本项目始于本人兴趣,还有许多不足大家轻喷,欢迎大家一起交流讨论学习,喜欢的点个star呗,哈哈哈！！！</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
[vue全家桶]每个人都能做的网易云音乐

## 原文链接
[https://segmentfault.com/a/1190000009869562](https://segmentfault.com/a/1190000009869562)

