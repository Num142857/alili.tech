---
title: '写一个 Chrome 扩展之 Flat Weibo —— 简洁你的微博世界' 
date: 2019-02-12 2:30:12
hidden: true
slug: ck6mnll6p5j
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">0x00. 前言</h2>
<p>微博现在也是变得越来越臃肿，广告越来越多，早已不再是“微”博了，这让微博深度用户的我感到十分焦灼。由于之前就尝试写过 Chrome 插件，于是便想到了这样的解决方案。Flat Weibo，简洁你的微博！</p>
<h2 id="articleHeader1">0x01. 概览</h2>
<ul>
<li><p>去除两边的各种推荐</p></li>
<li><p>去除部分广告</p></li>
<li><p>重置顶部导航样式</p></li>
<li><p>修改背景</p></li>
<li><p>修改微博流样式</p></li>
<li><p>其他</p></li>
</ul>
<p><span class="img-wrap"><img data-src="/img/bVtUTu" src="https://static.alili.tech/img/bVtUTu" alt="flat-weibo.png" title="flat-weibo.png" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader2">0x02. 下载 &amp; 安装</h2>
<h3 id="articleHeader3">下载</h3>
<p><a href="https://chrome.google.com/webstore/detail/flat-weibo/plmimfmefmleomdhkjabaiphhfdnobop" rel="nofollow noreferrer" target="_blank">Chrome 应用商店</a><br><a href="http://pan.baidu.com/s/1miEOqJe" rel="nofollow noreferrer" target="_blank">百度云</a></p>
<h3 id="articleHeader4">安装</h3>
<p>由于 Chrome 目前禁止第三方插件的安装，所以需在 Chrome 里依次点击 <strong>菜单</strong> <strong>更多工具</strong> <strong>扩展程序</strong> 然后打开 <strong>开发者模式</strong>，将插件拖进来然后会自动安装。</p>
<p>安装成功后插件即生效，更多自定义功能稍后便来 ~</p>
<h2 id="articleHeader5">0x03. 写一个 Chrome 扩展</h2>
<h3 id="articleHeader6">源码</h3>
<p><a href="https://github.com/PuYart/flat-weibo" rel="nofollow noreferrer" target="_blank">GitHub - Flat Weibo</a></p>
<h3 id="articleHeader7">Chrome 扩展是什么？</h3>
<p>Chrome 扩展允许你在 Chrome 中使用 JavaScript 来对网页、浏览器、本地存储等内容进行访问和更改，对应的 Firefox 也有自己的扩展程序。本文章的扩展只针对 Chrome 而言。</p>
<p>Chrome 扩展是一系列文件的集合，这些文件包括 HTML 文件、CSS 样式文件、JavaScript 脚本文件、图片等静态文件以及 manifest.json（清单文件）。</p>
<p>扩展被安装后，Chrome 就会读取扩展中的 manifest.json 文件。这个文件的文件名固定为 manifest.json，内容是按照一定格式描述的扩展相关信息，如扩展名称、版本、更新地址、请求的权限、扩展的 UI 界面入口等等。这样 Chrome 就可以知道在浏览器中如何呈现这个扩展，以及这个扩展如何同用户进行交互。</p>
<p>一般而言，Chrome 扩展会对用户浏览的页面进行相应的 DOM 操作和一些数据传递，本案例 Flat Weibo 的本质是，当用户浏览网页版微博时，Chrome 扩展会向当前页面注入预先写好的 CSS，这样便对微博网页版进行了样式重构。</p>
<h3 id="articleHeader8">manifest.json（清单文件）</h3>
<p>每个 Chrome 扩展都包含一个 manifest 文件，Chrome 会从该文件中读取本扩展的相关信息，是扩展的入口。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;manifest_version&quot;: 2,                  // manifest 版本，当前只能为 2
  &quot;name&quot;: &quot;Flat Weibo&quot;,                   // 扩展名
  &quot;version&quot;: &quot;1.0.0&quot;,                     // 扩展版本号
  &quot;description&quot;: &quot;简洁你的微博，去除烦人的微博推荐和广告，让微博更加扁平，更加简单明了&quot;,  // 扩展描述
  &quot;icons&quot;: {                              // 扩展图标
    &quot;16&quot;: &quot;img/icon/icon_16.png&quot;,
    &quot;48&quot;: &quot;img/icon/icon_48.png&quot;,
    &quot;128&quot;: &quot;img/icon/icon_128.png&quot;
  },
  &quot;browser_action&quot;: {                     // 添加图标按钮至 Chrome 工具条
    &quot;default_icon&quot;: {                     // 图标
      &quot;19&quot;: &quot;img/icon/icon_19.png&quot;,
      &quot;38&quot;: &quot;img/icon/icon_38.png&quot;
    },
    &quot;default_title&quot;: &quot;开启简洁微博世界&quot;,     // 按钮标题，鼠标移动至按钮上会显示
    &quot;default_popup&quot;: &quot;popup.html&quot;         // 点击按钮呈现的页面
  },
  &quot;content_scripts&quot;: [                    // 被注入的脚本
    {
      &quot;matches&quot;: [                        // 匹配被注入的条件
        &quot;*://weibo.com/*&quot;,
        &quot;*://www.weibo.com/*&quot;
      ],
      &quot;css&quot;: [                            // 被注入的 css
        &quot;css/flat-weibo.css&quot;
      ]
    }
  ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-string">"manifest_version"</span>: <span class="hljs-number">2</span>,                  <span class="hljs-comment">// manifest 版本，当前只能为 2</span>
  <span class="hljs-string">"name"</span>: <span class="hljs-string">"Flat Weibo"</span>,                   <span class="hljs-comment">// 扩展名</span>
  <span class="hljs-string">"version"</span>: <span class="hljs-string">"1.0.0"</span>,                     <span class="hljs-comment">// 扩展版本号</span>
  <span class="hljs-string">"description"</span>: <span class="hljs-string">"简洁你的微博，去除烦人的微博推荐和广告，让微博更加扁平，更加简单明了"</span>,  <span class="hljs-comment">// 扩展描述</span>
  <span class="hljs-string">"icons"</span>: {                              <span class="hljs-comment">// 扩展图标</span>
    <span class="hljs-string">"16"</span>: <span class="hljs-string">"img/icon/icon_16.png"</span>,
    <span class="hljs-string">"48"</span>: <span class="hljs-string">"img/icon/icon_48.png"</span>,
    <span class="hljs-string">"128"</span>: <span class="hljs-string">"img/icon/icon_128.png"</span>
  },
  <span class="hljs-string">"browser_action"</span>: {                     <span class="hljs-comment">// 添加图标按钮至 Chrome 工具条</span>
    <span class="hljs-string">"default_icon"</span>: {                     <span class="hljs-comment">// 图标</span>
      <span class="hljs-string">"19"</span>: <span class="hljs-string">"img/icon/icon_19.png"</span>,
      <span class="hljs-string">"38"</span>: <span class="hljs-string">"img/icon/icon_38.png"</span>
    },
    <span class="hljs-string">"default_title"</span>: <span class="hljs-string">"开启简洁微博世界"</span>,     <span class="hljs-comment">// 按钮标题，鼠标移动至按钮上会显示</span>
    <span class="hljs-string">"default_popup"</span>: <span class="hljs-string">"popup.html"</span>         <span class="hljs-comment">// 点击按钮呈现的页面</span>
  },
  <span class="hljs-string">"content_scripts"</span>: [                    <span class="hljs-comment">// 被注入的脚本</span>
    {
      <span class="hljs-string">"matches"</span>: [                        <span class="hljs-comment">// 匹配被注入的条件</span>
        <span class="hljs-string">"*://weibo.com/*"</span>,
        <span class="hljs-string">"*://www.weibo.com/*"</span>
      ],
      <span class="hljs-string">"css"</span>: [                            <span class="hljs-comment">// 被注入的 css</span>
        <span class="hljs-string">"css/flat-weibo.css"</span>
      ]
    }
  ]
}</code></pre>
<blockquote>
<p>更多关于清单文件的介绍请访问</p>
<ul>
<li><p><a href="http://open.chrome.360.cn/extension_dev/manifest.html" rel="nofollow noreferrer" target="_blank">http://open.chrome.360.cn/extension_dev/...</a></p></li>
<li><p><a href="http://www.ituring.com.cn/article/60136" rel="nofollow noreferrer" target="_blank">http://www.ituring.com.cn/article/60136</a></p></li>
</ul>
</blockquote>
<h3 id="articleHeader9">css</h3>
<p>本扩展的核心部分便是被注入到页面中的 CSS，核心思想是分析页面 DOM 结构，编写新样式，进行注入。</p>
<p><span class="img-wrap"><img data-src="/img/bVtUR6" src="https://static.alili.tech/img/bVtUR6" alt="weibo-home.png" title="weibo-home.png" style="cursor: pointer;"></span></p>
<p>如上图所示，两个红框标出了一些我们不愿意看到的东西，我们先分析一下这两部分的 DOM 结构。</p>
<p><span class="img-wrap"><img data-src="/img/bVtUSj" src="https://static.alili.tech/img/bVtUSj" alt="weibo-home-input-ad.png" title="weibo-home-input-ad.png" style="cursor: pointer;"></span></p>
<p>我们可以看到这个烦人的推荐位所对应的节点为 <code>.send_weibo .key</code>，既然拿到了 DOM 节点，就可以这么写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".send_weibo .key {
  display: none;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-class">.send_weibo</span> <span class="hljs-selector-class">.key</span> {
  <span class="hljs-attribute">display</span>: none;
}</code></pre>
<p>是不是很简单，很机智呢，直接让我们不想看到的东西隐藏就好了！</p>
<p>同样的，我们审查一下右侧推荐位的 DOM 结构。</p>
<p><span class="img-wrap"><img data-src="/img/bVtUSI" src="https://static.alili.tech/img/bVtUSI" alt="weibo-home-rightmod-ad.png" title="weibo-home-rightmod-ad.png" style="cursor: pointer;"></span></p>
<p>于是</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="#v6_pl_rightmod_rank {
  display: none;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="css hljs"><code class="css"><span class="hljs-selector-id">#v6_pl_rightmod_rank</span> {
  <span class="hljs-attribute">display</span>: none;
}</code></pre>
<p>处理之后就是这个样子，我们看到 <code>#v6_pl_rightmod_rank</code> 的 <code>Styles</code> 中出现了一个标有 <em>injected stylesheet</em> 的样式（中间红框），这个便是我们在 Chrome 扩展中向页面注入的 CSS。同样的我们看到左边红框和 <code>#v6_pl_rightmod_rank</code> 同级有许多 <code>div</code> 标签，采用同样的方法就可以让右侧只剩下个人信息了。</p>
<p><span class="img-wrap"><img data-src="/img/bVtUSV" src="https://static.alili.tech/img/bVtUSV" alt="weibo-home-rightmod-after.png" title="weibo-home-rightmod-after.png" style="cursor: pointer; display: inline;"></span></p>
<p>采用这样的方法依次处理所有你不想看到的元素，你的微博便会简洁很多。由于需要更改的样式比较复杂，因此使用了 SASS 进行预处理 CSS，也因此使用了 gulp 来进行自动化构建。</p>
<p><a href="https://github.com/PuYart/flat-weibo/blob/master/src/scss/flat-weibo.scss" rel="nofollow noreferrer" target="_blank">本例中的 scss 在这里</a></p>
<blockquote><p>SASS 是一个 CSS 预处理器，它允许选择器嵌套、使用一些简单的逻辑运算进行编写 CSS，功能十分强大，但语法也很简单。<br>gulp 是一个前端自动化构建工具，有丰富的插件供你使用，本例中便使用 <code>gulp-sass</code> 来编译 scss，使用 <code>gulp-autoprefixer</code> 给 css 添加浏览器前缀<br><a href="http://www.w3cplus.com/sassguide/" rel="nofollow noreferrer" target="_blank">sass 入门</a>/<a href="http://www.w3cplus.com/sassguide/" rel="nofollow noreferrer" target="_blank">gulp.js 入门</a></p></blockquote>
<h3 id="articleHeader10">开发 &amp; 构建</h3>
<ul>
<li>
<p>安装依赖</p>
<ul><li><p><code>npm install</code></p></li></ul>
</li>
<li>
<p>开发</p>
<ul><li><p><code>npm run dev</code></p></li></ul>
</li>
<li>
<p>构建</p>
<ul><li><p><code>npm run build</code></p></li></ul>
</li>
</ul>
<h2 id="articleHeader11">0x04. TODO</h2>
<ul>
<li><p>添加自定义主题色</p></li>
<li><p>添加更改布局</p></li>
<li><p>添加模块显示/隐藏选择</p></li>
</ul>
<h2 id="articleHeader12">0x05. 学习参考资料</h2>
<p><a href="http://www.ituring.com.cn/minibook/950" rel="nofollow noreferrer" target="_blank">Chrome 扩展及应用开发</a><br><a href="http://open.chrome.360.cn/extension_dev/overview.html" rel="nofollow noreferrer" target="_blank">Chrome 开发文档中文版</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
写一个 Chrome 扩展之 Flat Weibo —— 简洁你的微博世界

## 原文链接
[https://segmentfault.com/a/1190000004707879](https://segmentfault.com/a/1190000004707879)

