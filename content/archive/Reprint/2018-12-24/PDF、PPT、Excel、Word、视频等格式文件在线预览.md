---
title: 'PDF、PPT、Excel、Word、视频等格式文件在线预览' 
date: 2018-12-24 2:30:07
hidden: true
slug: 81nyove1ci7
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>最近项目中用到了文件在线预览功能，文件类型大概有图片、视频、PDF、PPT、Excel、Word 等等，总结梳理了一下，分享给大家。</p></blockquote>
<h3 id="articleHeader0">PDF 文件类型</h3>
<ol><li><a href="https://github.com/malsup/media" rel="nofollow noreferrer" target="_blank">jquery.media.js</a></li></ol>
<p>在线文档：<a href="http://jquery.malsup.com/media/" rel="nofollow noreferrer" target="_blank">http://jquery.malsup.com/media/</a></p>
<ol><li><a href="https://github.com/mozilla/pdf.js" rel="nofollow noreferrer" target="_blank">pdf.js</a></li></ol>
<p>推荐使用 <code>jquery.media.js</code>，简单易用。</p>
<h3 id="articleHeader1">PPT、Excel、Word文件类型</h3>
<p>不需要使用任何第三家扩展，使用 Office 官方提供的 Office Web Viewer 即可. </p>
<p><code>https://view.officeapps.live.com/op/view.aspx?src={yourFileOnlinePath}</code></p>
<h3 id="articleHeader2">视频</h3>
<p>常见的视频格式有：mp4、flv、avi、mpge、3gp、h264 等等，这些格式的区别就不再赘述了。</p>
<p>而 H5 原生的的 <code>video</code> 元素支持三种视频格式 <code>Ogg</code>、<code>MPEG 4</code>、<code>WebM</code>，所以我们需要更强大、支持更多视频在线播放，第三方扩展库。</p>
<p>在这里推荐使用 B 站开源的视频播放插件 <a href="https://github.com/Bilibili/flv.js" rel="nofollow noreferrer" target="_blank">flv</a>，一个轻量级、纯 <code>JavaScript</code> 的视频播放插件。</p>
<blockquote><p>flv.js  An HTML5 Flash Video (FLV) Player written in pure JavaScript without Flash. LONG LIVE FLV!</p></blockquote>
<p>支持的浏览器: Chrome, FireFox, Safari 10, IE11 and Edge.</p>
<h3 id="articleHeader3">图片</h3>
<p>H5 的 <code>img</code> 标签足以支持 png、jpeg、jpg、gif 格式的图片，但是关于图片，我们都可以经常看到这样的功能，点击图片，弹出图片放大的模态窗口。</p>
<p>给大家推荐一个非常好用的插件，<a href="http://ashleydw.github.io/lightbox/" rel="nofollow noreferrer" target="_blank">Bootstrap Lightbox</a></p>
<blockquote>
<ol><li>lightbox module for Bootstrap that supports images, YouTube videos, and galleries - built around Bootstrap's Modal plugin.</li></ol>
<p>lightbox 组件是构建于 Bootstrap's Modal 组件之上，支持图片、YouTube 视频以及画廊（幻灯片效果）。</p>
</blockquote>
<p>如果你也有什么文件预览的奇淫巧技，来一起分享 <img src="https://static.alili.techundefined" class="emoji" alt="smiley" title="smiley"></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
PDF、PPT、Excel、Word、视频等格式文件在线预览

## 原文链接
[https://segmentfault.com/a/1190000012164793](https://segmentfault.com/a/1190000012164793)

