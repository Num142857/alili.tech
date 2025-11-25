---
title: 'React Native 模仿网易云音乐手机客户端，兼容安卓和IOS两个平台' 
date: 2018-12-28 2:30:10
hidden: true
slug: tm4braffwy
categories: [reprint]
---

{{< raw >}}

                    
<h4>React Native 模仿网易云音乐手机客户端，兼容安卓和IOS两个平台。</h4>
<blockquote><p>GitHub 完整源码地址<a href="https://github.com/yezihaohao/NeteaseCloudMusic" rel="nofollow noreferrer" target="_blank">https://github.com/yezihaohao/NeteaseCloudMusic</a><br><a href="https://yezihaohao.github.io/2017/10/23/ReactNative%E6%A8%A1%E4%BB%BF%E7%BD%91%E6%98%93%E4%BA%91%E9%9F%B3%E4%B9%90%E6%89%8B%E6%9C%BA%E5%AE%A2%E6%88%B7%E7%AB%AF%EF%BC%8C%E5%85%BC%E5%AE%B9%E5%AE%89%E5%8D%93%E5%92%8CIOS%E4%B8%A4%E4%B8%AA%E5%B9%B3%E5%8F%B0/" rel="nofollow noreferrer" target="_blank">源博客地址</a><br><a href="https://juejin.im/post/59ee128a51882549fc513340" rel="nofollow noreferrer" target="_blank">掘金地址</a></p></blockquote>
<p>老规矩，先上图~?</p>
<h4>总览</h4>
<p><span class="img-wrap"><img data-src="https://raw.githubusercontent.com/yezihaohao/yezihaohao.github.io/master/imgs/total.gif" src="https://static.alili.techhttps://raw.githubusercontent.com/yezihaohao/yezihaohao.github.io/master/imgs/total.gif" alt="全图" title="全图" style="cursor: pointer;"></span></p>
<h4>音乐播放</h4>
<p><span class="img-wrap"><img data-src="https://raw.githubusercontent.com/yezihaohao/yezihaohao.github.io/master/imgs/player.gif" src="https://static.alili.techhttps://raw.githubusercontent.com/yezihaohao/yezihaohao.github.io/master/imgs/player.gif" alt="音乐播放" title="音乐播放" style="cursor: pointer;"></span></p>
<p>&lt;!--more--&gt;</p>
<h4>视频播放</h4>
<p><span class="img-wrap"><img data-src="https://raw.githubusercontent.com/yezihaohao/yezihaohao.github.io/master/imgs/video.gif" src="https://static.alili.techhttps://raw.githubusercontent.com/yezihaohao/yezihaohao.github.io/master/imgs/video.gif" alt="视频播放" title="视频播放" style="cursor: pointer;"></span></p>
<h4>歌曲列表</h4>
<p><span class="img-wrap"><img data-src="https://raw.githubusercontent.com/yezihaohao/yezihaohao.github.io/master/imgs/playlist.png" src="https://static.alili.techhttps://raw.githubusercontent.com/yezihaohao/yezihaohao.github.io/master/imgs/playlist.png" alt="歌曲列表" title="歌曲列表" style="cursor: pointer; display: inline;"></span></p>
<h4>用户界面</h4>
<p><span class="img-wrap"><img data-src="https://raw.githubusercontent.com/yezihaohao/yezihaohao.github.io/master/imgs/user.gif" src="https://static.alili.techhttps://raw.githubusercontent.com/yezihaohao/yezihaohao.github.io/master/imgs/user.gif" alt="用户界面" title="用户界面" style="cursor: pointer;"></span></p>
<h4>电台详情</h4>
<p><span class="img-wrap"><img data-src="https://raw.githubusercontent.com/yezihaohao/yezihaohao.github.io/master/imgs/radio.gif" src="https://static.alili.techhttps://raw.githubusercontent.com/yezihaohao/yezihaohao.github.io/master/imgs/radio.gif" alt="电台详情" title="电台详情" style="cursor: pointer;"></span></p>
<h4>主要的技术栈和依赖第三方库：</h4>
<p>点击名称可跳转相关项目网站??</p>
<ul>
<li><a href="https://facebook.github.io/react/" rel="nofollow noreferrer" target="_blank">react@16.0.0-alpha.12</a></li>
<li><a href="https://github.com/facebook/react-native" rel="nofollow noreferrer" target="_blank">react-native@0.48.2</a></li>
<li>
<a href="https://github.com/skv-headless/react-native-scrollable-tab-view" rel="nofollow noreferrer" target="_blank">react-native-scrollable-tab-view@0.7.4</a>(可滚动切换tab页面组件)</li>
<li><a href="https://github.com/leecade/react-native-swiper" rel="nofollow noreferrer" target="_blank">react-native-swiper@1.5.10</a></li>
<li>
<a href="https://github.com/oblador/react-native-vector-icons" rel="nofollow noreferrer" target="_blank">react-native-vector-icons@4.3.0</a>(包含很多icon图标)</li>
<li>
<a href="https://github.com/react-native-community/react-native-video" rel="nofollow noreferrer" target="_blank">react-native-video@2.0.0</a>(视频和音频播放器，经调研，最近版的安卓和IOS系统版本可正常使用)</li>
<li>
<a href="https://github.com/react-community/react-navigation" rel="nofollow noreferrer" target="_blank">react-navigation@1.0.0-beta.11</a>(推荐使用的路由库)</li>
<li>
<a href="https://github.com/reactjs/redux" rel="nofollow noreferrer" target="_blank">redux@3.7.2</a>(项目中重点用在播放器相关功能上)</li>
<li>其他细节库省略</li>
</ul>
<blockquote><p>ps: 个别插件会存在小bug或冲突。比如安卓平台swiper在scrollable-tab中不能触屏手动滚动。</p></blockquote>
<h4>主要的功能界面模块</h4>
<blockquote><p>大部分主要是展示的demo，网易云的页面和功能实在是太多了，由于时间关系，并没有把所有的功能都做完整，后续会陆续加上其他的功能。</p></blockquote>
<ul>
<li>各部分模块首页展示</li>
<li>音乐播放，包括CD动画，歌词同步等。</li>
<li>MV视频播放</li>
<li>个人详情页面</li>
<li>其他细节等等</li>
</ul>
<h4>安装运行</h4>
<blockquote>
<p>特别鸣谢：<a href="https://github.com/Binaryify/NeteaseCloudMusicApi" rel="nofollow noreferrer" target="_blank">NeteaseCloudMusicApi</a> 提供全套API。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="运行本项目前请先本地（或服务器）运行此API接口项目,替换/scr/api/index.js 下BASE_URL的ip地址
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>运行本项目前请先本地（或服务器）运行此API接口项目,替换/scr/api/index<span class="hljs-selector-class">.js</span> 下BASE_URL的ip地址
</code></pre>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="0. 开发环境平台版本：Android-6.0  ios-10.3

1. git clone https://github.com/yezihaohao/NeteaseCloudMusic.git

2. yarn or npm install

3. react-native link 

3. react-native run-ios 或者 react-native run-android" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs markdown"><code><span class="hljs-bullet">0. </span>开发环境平台版本：Android-6.0  ios-10.3

<span class="hljs-bullet">1. </span>git clone https://github.com/yezihaohao/NeteaseCloudMusic.git

<span class="hljs-bullet">2. </span>yarn or npm install

<span class="hljs-bullet">3. </span>react-native link 

<span class="hljs-bullet">3. </span>react-native run-ios 或者 react-native run-android</code></pre>
<h4>总结</h4>
<p>react-native上手不难，熟悉react，看react-native文档，看下开源项目就可以开始开发，就是向下兼容比较差，可能这个版本用的别人的组件下个版本就会有bug。</p>
<p>一般展示性的界面比较容易，重点熟悉flex布局，注意默认纵向排列。</p>
<p>动画模块也需要着重了解下，可以提升用户体验。</p>
<p>多了解下其他的第三方组件，有很多别人都写好的，也要看react-native更新文档。</p>
<p>其他细节在开发过程中慢慢体会~~???</p>
<p>刚入门react-native，大佬轻喷~~</p>
<blockquote><p>该项目会持续更新~所有使用数据仅供学习交流，并无它意。若有疑问，可加前端QQ群与我交流：264591039</p></blockquote>
<h4>License</h4>
<p>MIT License.</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React Native 模仿网易云音乐手机客户端，兼容安卓和IOS两个平台

## 原文链接
[https://segmentfault.com/a/1190000011689307](https://segmentfault.com/a/1190000011689307)

