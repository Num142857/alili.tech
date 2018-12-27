---
title: 'React系列——采用NextJs实现react的服务端渲染（附源码）' 
date: 2018-12-28 2:30:11
hidden: true
slug: 6wsuvyo9yt8
categories: [reprint]
---

{{< raw >}}

                    
<p>最近心血来潮，想尝试一下react的服务端渲染，说一下我一开始的思路到最后的实现。</p>
<h3 id="articleHeader0">思路分析</h3>
<p>刚开始没有具体的思路，看了react官网的服务端渲染API，看了react-router4官网的服务端渲染DEMO，接着在网上搜索了一些别人写的博客，这方面博客挺少，而且介绍不全面。</p>
<p>我的想法是在现有客户端源码的基础上（<a href="https://github.com/hyy1115/react-redux-webpack3" rel="nofollow noreferrer" target="_blank">https://github.com/hyy1115/re...</a>），加上服务端渲染的代码。</p>
<p>恩，这看起来似乎很简单，接着我就开始研究，我先是构建了一个server.js和client.js来区分不同的环境，并且在server.js中调用了react/server的API渲染了一个静态页面，这一步很正常，没有任何问题。</p>
<p>接着，在我以为很快就能实现的时候，我把渲染的入口改成了react-router4推荐的静态路由模式，啪啪啪，超多的error扑面而来，染红了terminal。我想了想，伤心了一下。</p>
<p>都是些什么错误呢？</p>
<p>1、css报错，不管是less、css、scss，始终无法解析，原因在于服务端不支持解析。</p>
<p>2、图片报错，图片也无法解析。</p>
<p>3、window对象下的变量报错，服务端是global环境。</p>
<p>4、js的各种报错。</p>
<p>5、路径报错。</p>
<p>7、未知的报错。</p>
<p>一整天我都在修复这些bug，最后太多太多，让我心累，就去咨询了一个大佬，大佬告诉我，使用nextjs，真是一语惊醒梦中人，我还自己配置这些环境太傻了吧。</p>
<h3 id="articleHeader1">NextJS框架</h3>
<p>Next地址：<a href="https://github.com/zeit/next.js" rel="nofollow noreferrer" target="_blank">https://github.com/zeit/next.js</a></p>
<h4>next是什么</h4>
<p>react服务端渲染框架</p>
<h4>next简介</h4>
<p>推荐你点击上面的网址看看readme的介绍，非常详细。</p>
<h2 id="articleHeader2">react-next服务端渲染项目搭建</h2>
<p><strong>项目地址：<a href="https://github.com/hyy1115/react-next" rel="nofollow noreferrer" target="_blank"></a><a href="https://github.com/hyy1115/react-next" rel="nofollow noreferrer" target="_blank">https://github.com/hyy1115/re...</a></strong></p>
<h4>实现的功能</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1、服务端渲染，支持react16
2、webpack，包括开发环境下的热更新等功能，以及部署环境下的打包功能
3、babelrc配置
4、支持scss、css、css-jsx
5、支持next-router
6、支持redux
7、支持图片格式文件
8、支持axios" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lsl"><code class="text"><span class="hljs-number">1</span>、服务端渲染，支持react16
<span class="hljs-number">2</span>、webpack，包括开发环境下的热更新等功能，以及部署环境下的打包功能
<span class="hljs-number">3</span>、babelrc配置
<span class="hljs-number">4</span>、支持scss、css、css-jsx
<span class="hljs-number">5</span>、支持next-router
<span class="hljs-number">6</span>、支持redux
<span class="hljs-number">7</span>、支持图片格式文件
<span class="hljs-number">8</span>、支持axios</code></pre>
<h3 id="articleHeader3">注意事项</h3>
<p>使用next框架，你仍旧可以采用客户端react组件的写法，只是在redux和router的选择上，使用next集成的redux和router功能，项目结构上面，和客户端渲染的写法有些许不同。</p>
<p><strong>详细教程晚些时候会在项目中更新。</strong></p>
<p><span class="img-wrap"><img data-src="/img/bVWJ5y?w=1203&amp;h=610" src="https://static.alili.tech/img/bVWJ5y?w=1203&amp;h=610" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
React系列——采用NextJs实现react的服务端渲染（附源码）

## 原文链接
[https://segmentfault.com/a/1190000011577883](https://segmentfault.com/a/1190000011577883)

