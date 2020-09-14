---
title: 'vue+node支持服务端渲染的博客系统' 
date: 2019-01-08 2:30:11
hidden: true
slug: b557c6r3eo4
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">感悟</h3>
<p>历时两个多月，终于利用工作之余完成了这个项目的1.0版本，为什么要写这个项目？其实基于vuejs+nodejs构建的开源博客系统有很多，但是大多数不支持服务端渲染，也不支持动态标题，只是做到了前后端分离，对于博客类系统seo肯定很重要，索性就自己动手写了这个项目，其中也遇到了不少问题， 因为基于服务端渲染的项目不多，自己能力也有限，所以用了好长时间。这里特别感谢<a href="https://github.com/lincenying" rel="nofollow noreferrer" target="_blank">@lincenying</a>，提供了登录功能的解决思路，也是我在开发过程中遇到最难解决的问题，本项目基于<a href="https://github.com/vuejs/vue-hackernews-2.0" rel="nofollow noreferrer" target="_blank">vue-hackernews-2.0</a>开发，支持PWA(需升级为https)，演示地址：<a href="https://www.86886.wang" rel="nofollow noreferrer" target="_blank">https://www.86886.wang</a>，项目地址：<a href="https://github.com/wmui/vueblog" rel="nofollow noreferrer" target="_blank">https://github.com/wmui/vueblog</a></p>
<h3 id="articleHeader1">开发环境和技术栈</h3>
<p>操作系统：windows 10 64位<br>开发工具 ：webstrom sublime<br>前端：vue.js + vue-router + vuex<br>后端：node.js + mongodb (采用express框架)</p>
<h3 id="articleHeader2">特色功能</h3>
<p>支持服务端渲染<br>支持标题动态切换<br>支持PWA<br>支持markdown语法，样式采用github风格，代码高亮<br>支持文章保存为草稿<br>支持标签和归档功能</p>
<h3 id="articleHeader3">pc端效果图</h3>
<h4>首页效果图</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010203178" src="https://static.alili.tech/img/remote/1460000010203178" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h4>代码高亮效果图</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010203179" src="https://static.alili.tech/img/remote/1460000010203179" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h4>后台发布页面</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010203180" src="https://static.alili.tech/img/remote/1460000010203180" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h4>后台文章列表</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010203181" src="https://static.alili.tech/img/remote/1460000010203181" alt="" title="" style="cursor: pointer;"></span></p>
<h4>修改个人信息</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010203182" src="https://static.alili.tech/img/remote/1460000010203182" alt="" title="" style="cursor: pointer;"></span></p>
<h3 id="articleHeader4">手机端效果图，以chrome浏览器演示</h3>
<h4>添加到主屏</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010203183" src="https://static.alili.tech/img/remote/1460000010203183" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h4>启动效果</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010203184" src="https://static.alili.tech/img/remote/1460000010203184" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h4>首页效果</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010203185" src="https://static.alili.tech/img/remote/1460000010203185" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h4>文章页效果</h4>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010205154" src="https://static.alili.tech/img/remote/1460000010205154" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>更多效果大家可通过线上演示地址查看</p>
<h3 id="articleHeader5">本地运行项目</h3>
<ol>
<li>安装mongodb并启动</li>
<li>安装git工具</li>
<li>克隆项目到你的本地</li>
<li>修改配置项信息，/server/settings.js，你也可以默认不修改，默认用户名:q，默认密码：q</li>
</ol>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let user = 'q';
let pass = md5('q');
let avatar = 'avatar.jpg';//头像
let intro ='Never too old to learn';
let nickname = 'VueBlog';
module.exports = {
    dbUrl:'mongodb://localhost:27017/vueblog',
    user:user,
    pass:pass,
    avatar:avatar,
    intro:intro,
    nickname:nickname
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ceylon"><code><span class="hljs-keyword">let</span> user = <span class="hljs-string">'q'</span>;
<span class="hljs-keyword">let</span> pass = md<span class="hljs-number">5</span>(<span class="hljs-string">'q'</span>);
<span class="hljs-keyword">let</span> avatar = <span class="hljs-string">'avatar.jpg'</span>;<span class="hljs-comment">//头像</span>
<span class="hljs-keyword">let</span> intro =<span class="hljs-string">'Never too old to learn'</span>;
<span class="hljs-keyword">let</span> nickname = <span class="hljs-string">'VueBlog'</span>;
<span class="hljs-keyword">module</span>.exports = {
    dbUrl:<span class="hljs-string">'mongodb://localhost:27017/vueblog'</span>,
    user:user,
    pass:pass,
    avatar:avatar,
    intro:intro,
    nickname:nickname
}</code></pre>
<ol><li>打开本地终端，执行<code>npm run dev </code>,访问<a href="http://localhost" rel="nofollow noreferrer" target="_blank">http://localhost</a>:8080</li></ol>
<h4>结语</h4>
<p>关于如何部署到线上和部署https，后面会更新相关教程。此项目我会长期更新，希望能和大家一起学习，共同进步</p>
<p><strong> 更新：</strong>  本项目的2.0版本基于Nuxt.js开发，后端用Koa + Mongoose进行了重写。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
vue+node支持服务端渲染的博客系统

## 原文链接
[https://segmentfault.com/a/1190000010202941](https://segmentfault.com/a/1190000010202941)

