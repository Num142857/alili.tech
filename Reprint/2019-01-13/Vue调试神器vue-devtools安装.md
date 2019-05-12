---
title: 'Vue调试神器vue-devtools安装' 
date: 2019-01-13 2:30:11
hidden: true
slug: 7wj0eagfacb
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<p>vue-devtools是一款基于chrome游览器的插件，用于调试vue应用，这可以极大地提高我们的调试效率。接下来我们就介绍一下vue-devtools的安装。</p>
<h2 id="articleHeader1">chrome商店直接安装</h2>
<p>vue-devtools可以从chrome商店直接下载安装，非常简单，这里就不过多介绍了。不过要注意的一点就是，需要翻墙才能下载。</p>
<h2 id="articleHeader2">手动安装</h2>
<h3 id="articleHeader3">第一步：找到vue-devtools的github项目，并将其clone到本地. <a href="https://github.com/vuejs/vue-devtools" rel="nofollow noreferrer" target="_blank">vue-devtools</a>
</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://github.com/vuejs/vue-devtools.git" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;">git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://github.com/vuejs/vue-devtools.git</code></pre>
<h3 id="articleHeader4">第二步：安装项目所需要的npm包</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install   //如果太慢的话，可以安装一个cnpm, 然后命令换成 cnpm install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span>   //如果太慢的话，可以安装一个cnpm, 然后命令换成 cnpm <span class="hljs-keyword">install</span></code></pre>
<h3 id="articleHeader5">第三步：编译项目文件</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">run</span><span class="bash"> build</span></code></pre>
<h3 id="articleHeader6">第四步：添加至chrome游览器</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="游览器输入地址“chrome://extensions/”进入扩展程序页面，点击“加载已解压的扩展程序...”按钮，选择vue-devtools>shells下的chrome文件夹。

/**
*如果看不见“加载已解压的扩展程序...”按钮，则需要勾选“开发者模式”。
*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>游览器输入地址“<span class="hljs-attribute">chrome</span>:<span class="hljs-comment">//extensions/”进入扩展程序页面，点击“加载已解压的扩展程序...”按钮，选择vue-devtools&gt;shells下的chrome文件夹。</span>

<span class="hljs-comment">/**
*如果看不见“加载已解压的扩展程序...”按钮，则需要勾选“开发者模式”。
*/</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009682738?w=969&amp;h=345" src="https://static.alili.tech/img/remote/1460000009682738?w=969&amp;h=345" alt="第一张图" title="第一张图" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009682739?w=738&amp;h=412" src="https://static.alili.tech/img/remote/1460000009682739?w=738&amp;h=412" alt="第二张图" title="第二张图" style="cursor: pointer;"></span></p>
<p>到此添加完成，效果图如下：</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009682740?w=958&amp;h=293" src="https://static.alili.tech/img/remote/1460000009682740?w=958&amp;h=293" alt="这里写图片描述" title="这里写图片描述" style="cursor: pointer;"></span></p>
<p>鉴于评论中很多小伙伴们有很多同学编译不成功，我这里把编译过的文件上传了百度云，后续步骤依旧，并且还附上了一个<strong>.crx</strong>文件，在chrome拓展程序页面上把文件拖进去即可安装。若百度云失效可文章下留言，我看到后会重新生成链接。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 链接:https://pan.baidu.com/s/139hspAnspD7bJbo81xigmg  密码:1hsv" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;"> 链接<span class="hljs-symbol">:https</span><span class="hljs-symbol">://pan</span>.baidu.com/s/<span class="hljs-number">139</span>hspAnspD7bJbo81xigmg  密码<span class="hljs-symbol">:</span><span class="hljs-number">1</span>hsv</code></pre>
<h2 id="articleHeader7">谷歌访问助手</h2>
<p>下载地址：<a href="http://www.ggfwzs.com/" rel="nofollow noreferrer" target="_blank">http://www.ggfwzs.com/</a></p>
<p>下载的压缩包解压之后有一个<strong>.crx</strong>文件以及一个使用教程，小伙们可以按照这个教程进行安装。安装之后，你的浏览器会多一个谷歌访问助手的插件。点击插件会弹出一个面板，上面有一个调整拓展程序商店的链接，点击调整之后你会打开一个和chrome商店一样的页面，在这上面你可以随心所欲安装你的插件。<br><span class="img-wrap"><img data-src="/img/bVbg1ky?w=662&amp;h=540" src="https://static.alili.tech/img/bVbg1ky?w=662&amp;h=540" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVbg1kt?w=2874&amp;h=1718" src="https://static.alili.tech/img/bVbg1kt?w=2874&amp;h=1718" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h2 id="articleHeader8">结语：vue-devtools如何使用</h2>
<p>当我们添加完vue-devtools扩展程序之后，我们在调试vue应用的时候，chrome开发者工具中会看一个vue的一栏，点击之后就可以看见当前页面vue对象的一些信息。vue-devtools使用起来还是比较简单的，上手非常的容易，这里就细讲其使用说明了。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000009682741?w=997&amp;h=547" src="https://static.alili.tech/img/remote/1460000009682741?w=997&amp;h=547" alt="vue调试工具" title="vue调试工具" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue调试神器vue-devtools安装

## 原文链接
[https://segmentfault.com/a/1190000009682735](https://segmentfault.com/a/1190000009682735)

