---
title: '【chrome 插件一】开发一个简单chrome浏览器插件' 
date: 2019-02-11 2:30:49
hidden: true
slug: 8ll9dgju4e5
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>chrome 之所以越来越好用，很大一部分原因归功于功能丰富的插件；对于chrome忠实用户来说，了解和开发一款适合自己的chrome插件，确实是一件很cool的事情。</p></blockquote>
<h2 id="articleHeader0">了解chrome 插件</h2>
<p>chrome 插件个人理解：<code>就是一个html + js +css + image的一个web应用</code>；不同于普通的web应用，<code>chrome插件除了兼容普通的js，json，h5等api，还可以调用一些浏览器级别的api，例如收藏夹，历史记录等。</code></p>
<p>推荐两个网站了解和入门<br>谷歌官方API：<a href="https://developer.chrome.com/extensions/getstarted" rel="nofollow noreferrer" target="_blank">https://developer.chrome.com/extensions/getstarted</a><br>360的文档：<a href="http://open.chrome.360.cn/extension_dev/overview.html" rel="nofollow noreferrer" target="_blank">http://open.chrome.360.cn/extension_dev/overview.html</a></p>
<h2 id="articleHeader1">开始写第一个插件</h2>
<h3 id="articleHeader2">文件结构</h3>
<p>一个简单的demo，文件目录如下<br><a href="http://cuihuan.net/wp-content/uploads/2016/04/7A980C32-7D7B-44F6-AC5D-C0CC02F79ACA.png" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="http://cuihuan.net/wp-content/uploads/2016/04/7A980C32-7D7B-44F6-AC5D-C0CC02F79ACA.png" src="https://static.alili.techhttp://cuihuan.net/wp-content/uploads/2016/04/7A980C32-7D7B-44F6-AC5D-C0CC02F79ACA.png" alt="7A980C32-7D7B-44F6-AC5D-C0CC02F79ACA" title="7A980C32-7D7B-44F6-AC5D-C0CC02F79ACA" style="cursor: pointer; display: inline;"></span></a><br>和普通的web文件没有什么区别，简单介绍下</p>
<ul>
<li><p>html:存放html页面</p></li>
<li><p>js :存放js</p></li>
<li><p>locales ：存放了一个多语言的兼容【可无】</p></li>
<li><p>image ：放了两张图片【初期图标】</p></li>
<li><p>manifest ：核心入口文件</p></li>
</ul>
<h3 id="articleHeader3">写一个manifest</h3>
<p>api参考文档 :<a href="http://open.chrome.360.cn/extension_dev/manifest.html" rel="nofollow noreferrer" target="_blank">http://open.chrome.360.cn/extension_dev/manifest.html</a></p>
<p>直接上代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;name&quot;: &quot;hijack analyse plug&quot;,
  &quot;version&quot;: &quot;0.0.1&quot;,
  &quot;manifest_version&quot;: 2,

  // 简单描述
  &quot;description&quot;: &quot;chrome plug analyse and guard the http hijack&quot;,
  &quot;icons&quot;: {
    &quot;16&quot;: &quot;image/icon16.png&quot;,
    &quot;48&quot;: &quot;image/icon48.png&quot;
  },
  // 选择默认语言
  &quot;default_locale&quot;: &quot;en&quot;,

  // 浏览器小图表部分
  &quot;browser_action&quot;: {
    &quot;default_title&quot;: &quot;反劫持&quot;,
    &quot;default_icon&quot;: &quot;image/icon16.png&quot;,
    &quot;default_popup&quot;: &quot;html/test.html&quot;
  },

  // 引入一个脚本
  &quot;content_scripts&quot;: [
    {
      &quot;js&quot;: [&quot;script/test.js&quot;],
      // 在什么情况下使用该脚本
      &quot;matches&quot;: [
        &quot;http://*/*&quot;,
        &quot;https://*/*&quot;
      ],
      // 什么情况下运行【文档加载开始】
      &quot;run_at&quot;: &quot;document_start&quot;
    }
  ],
  // 应用协议页面
  &quot;permissions&quot;: [
    &quot;http://*/*&quot;,
    &quot;https://*/*&quot;
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clojure"><code>{
  <span class="hljs-string">"name"</span>: <span class="hljs-string">"hijack analyse plug"</span>,
  <span class="hljs-string">"version"</span>: <span class="hljs-string">"0.0.1"</span>,
  <span class="hljs-string">"manifest_version"</span>: <span class="hljs-number">2</span>,

  // 简单描述
  <span class="hljs-string">"description"</span>: <span class="hljs-string">"chrome plug analyse and guard the http hijack"</span>,
  <span class="hljs-string">"icons"</span>: {
    <span class="hljs-string">"16"</span>: <span class="hljs-string">"image/icon16.png"</span>,
    <span class="hljs-string">"48"</span>: <span class="hljs-string">"image/icon48.png"</span>
  },
  // 选择默认语言
  <span class="hljs-string">"default_locale"</span>: <span class="hljs-string">"en"</span>,

  // 浏览器小图表部分
  <span class="hljs-string">"browser_action"</span>: {
    <span class="hljs-string">"default_title"</span>: <span class="hljs-string">"反劫持"</span>,
    <span class="hljs-string">"default_icon"</span>: <span class="hljs-string">"image/icon16.png"</span>,
    <span class="hljs-string">"default_popup"</span>: <span class="hljs-string">"html/test.html"</span>
  },

  // 引入一个脚本
  <span class="hljs-string">"content_scripts"</span>: [
    {
      <span class="hljs-string">"js"</span>: [<span class="hljs-string">"script/test.js"</span>],
      // 在什么情况下使用该脚本
      <span class="hljs-string">"matches"</span>: [
        <span class="hljs-string">"http://*/*"</span>,
        <span class="hljs-string">"https://*/*"</span>
      ],
      // 什么情况下运行【文档加载开始】
      <span class="hljs-string">"run_at"</span>: <span class="hljs-string">"document_start"</span>
    }
  ],
  // 应用协议页面
  <span class="hljs-string">"permissions"</span>: [
    <span class="hljs-string">"http://*/*"</span>,
    <span class="hljs-string">"https://*/*"</span>
  ]
}</code></pre>
<p>test.js 文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/**
 * @author: cuixiaohuan
 * Date: 16/4/13
 * Time: 下午8:41
 */
(function(){
    /**
     * just test for run by self
     */
    console.log('begin');
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">/**
 * @author: cuixiaohuan
 * Date: 16/4/13
 * Time: 下午8:41
 */</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-comment">/**
     * just test for run by self
     */</span>
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'begin'</span>);
})();</code></pre>
<p>test.html 文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
<head lang=&quot;en&quot;>
    <meta charset=&quot;UTF-8&quot;>
    <title>just for test</title>
</head>
<body>
<h3>test</h3>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>just for test<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">h3</span>&gt;</span>test<span class="hljs-tag">&lt;/<span class="hljs-name">h3</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<h3 id="articleHeader4">运行插件</h3>
<p>chrome 中输入：chrome://extensions<br>选择加载已解压的插件-》选择文件根目录即可。<br>效果如下：</p>
<p><a href="http://cuihuan.net/wp-content/uploads/2016/04/475BA7E7-29F3-48AF-9990-2B73FF1B4B56.png" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="http://cuihuan.net/wp-content/uploads/2016/04/475BA7E7-29F3-48AF-9990-2B73FF1B4B56.png" src="https://static.alili.techhttp://cuihuan.net/wp-content/uploads/2016/04/475BA7E7-29F3-48AF-9990-2B73FF1B4B56.png" alt="生效插件" title="生效插件" style="cursor: pointer; display: inline;"></span></a><br>一个基本的插件变完成了，勾选已启用，随便打开一个网页，会看到log中输出如下</p>
<p><a href="http://cuihuan.net/wp-content/uploads/2016/04/50F1039A-71C0-463F-A60D-C95527985C7E.png" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="http://cuihuan.net/wp-content/uploads/2016/04/50F1039A-71C0-463F-A60D-C95527985C7E.png" src="https://static.alili.techhttp://cuihuan.net/wp-content/uploads/2016/04/50F1039A-71C0-463F-A60D-C95527985C7E.png" alt="运行效果" title="运行效果" style="cursor: pointer; display: inline;"></span></a></p>
<p>点击页面上面的小图标如下图：<br><a href="http://cuihuan.net/wp-content/uploads/2016/04/25CF59DD-0666-4A6F-ACA3-683D1FEEA346.png" rel="nofollow noreferrer" target="_blank"><span class="img-wrap"><img data-src="http://cuihuan.net/wp-content/uploads/2016/04/25CF59DD-0666-4A6F-ACA3-683D1FEEA346.png" src="https://static.alili.techhttp://cuihuan.net/wp-content/uploads/2016/04/25CF59DD-0666-4A6F-ACA3-683D1FEEA346.png" alt="右侧展示" title="右侧展示" style="cursor: pointer;"></span></a></p>
<h2 id="articleHeader5">优化建议</h2>
<p>一个小的插件已经完成，但是还有更多的api和有趣的事情可以去做。下面是360文档中给出一些优化建议，共勉。</p>
<ul>
<li><p>确认 Browser actions 只使用在大多数网站都有功能需求的场景下。确认 Browser actions 没有使用在少数网页才有功能的场景， 此场景请使用page actions。</p></li>
<li><p>确认你的图标尺寸尽量占满19x19的像素空间。 Browser action 的图标应该看起来比page action的图标更大更重。</p></li>
<li><p>尽量使用alpha通道并且柔滑你的图标边缘，因为很多用户使用themes，你的图标应该在在各种背景下都表现不错。不要不停的闪动你的图标，这很惹人反感。</p></li>
</ul>
<p>【转载请注明：<a href="http://cuihuan.net/article/postmessage%E5%A4%84%E7%90%86iframe-%E8%B7%A8%E5%9F%9F%E9%97%AE%E9%A2%98.html" rel="nofollow noreferrer" target="_blank">【chrome 插件一】开发一个简单chrome浏览器插件</a> | <a href="http://cuihuan.net" rel="nofollow noreferrer" target="_blank">靠谱崔小拽</a> 】</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
【chrome 插件一】开发一个简单chrome浏览器插件

## 原文链接
[https://segmentfault.com/a/1190000004933553](https://segmentfault.com/a/1190000004933553)

