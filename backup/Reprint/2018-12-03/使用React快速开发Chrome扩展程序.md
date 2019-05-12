---
title: '使用React快速开发Chrome扩展程序' 
date: 2018-12-03 2:30:08
hidden: true
slug: vr9jhmkmnt8
categories: [reprint]
---

{{< raw >}}

                    
<p>首先要说明的是这个文章其实属于翻译或者说转述，我是从google上搜索到了这篇原文，并且用它的构建流程成功开发了一个扩展，很爽，速度很快，五分钟直接进入扩展开发，不需要花费太多的精力在构建开发环境上，不过可能还会有一些不太方便的方，下面会讲到。 我们开始吧！</p>
<h2>全局安装 create-react-app</h2>
<blockquote>npm install –g create-react-app</blockquote>
<h2>构建你的应用程序</h2>
<p>请随意命名</p>
<blockquote>create-react-app reactextension</blockquote>
<h2>修改mainfest文件</h2>
<p>进入你的开发目录，public/mainfest.json是你扩展的主要入口，删除他的所有内容，写入如下内容</p>
<p>chrome扩展将会依赖这个文件加载页面</p>
<pre><code class="json">{
  "short_name": "React App",
  "name": "React Extension",
  "manifest_version": 2,
  "browser_action": {
    "default_popup": "index.html",
    "default_title": "React Ext"
  },
  "version": "1.0"
}</code></pre>
<p>接下来你需要运行一次 <code> yarn build </code> 来初次打包，你的程序将会输出到<strong>dist</strong>文件内</p>
<h2>加载你的扩展程序</h2>
<p>打开你的Chrome扩展中心<code>  chrome://extensions  </code>，请确保<strong>勾选开发者模式</strong>，<strong>拖入</strong>你的<strong>dist</strong>文件夹</p>
<p>OK! 恭喜你，你的应用程序应该已经成功的加载到了chrome扩展列表中，快去尝试打开它吧！如果你想要进一步的修改图标名称等，请修改mainfest文件，图标图片放置在public目录中，这里要谈到一点可惜之处，就是<code> yarn dev </code>模式下并不能加载这个扩展，我个人推荐你在dev模式下以一个普通网页的方式去dubug一部分，待到累积一定功能的时候，再去build一下看看效果。</p>
<p>最后 来推荐一下我开发的扩展（已经是第三次重写了，前两次都没用框架，复用性确实比较差）</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014662430?w=856&amp;h=1228" src="https://static.alili.tech/img/remote/1460000014662430?w=856&amp;h=1228" alt="" title=""></span><br><span class="img-wrap"><img data-src="/img/remote/1460000014662431?w=856&amp;h=1228" src="https://static.alili.tech/img/remote/1460000014662431?w=856&amp;h=1228" alt="" title=""></span></p>
<p>完全开源，你完全可以clone下来自行编译改进，从功能上讲，他的主要目的就是帮我排雷，评分特别低的片就不需要去看了，同时爬了某电影资源网站的信息，可以进行快速的下载，你完全可以通过他来快速的查看最近有没有值得看的爽片!</p>
<p><a href="https://github.com/zhangzhengyi12/quick-movie" rel="nofollow noreferrer">DaDa Movie for github</a><br><a href="https://engineering.musefind.com/how-to-build-a-chrome-extension-with-react-js-e2bae31747fc" rel="nofollow noreferrer">@Mackenzie Higa</a></p>
<p>最后，感谢你们的阅读! 有兴趣可以来我的博客看看<a>blog</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用React快速开发Chrome扩展程序

## 原文链接
[https://segmentfault.com/a/1190000014662427](https://segmentfault.com/a/1190000014662427)

