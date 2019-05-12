---
title: 'HEXO - Minimal 一款为开源作者而生的主题' 
date: 2019-01-03 2:30:10
hidden: true
slug: 38fioi1591s
categories: [reprint]
---

{{< raw >}}

                    
<p><span class="img-wrap"><img data-src="/img/bVTNMi?w=1200&amp;h=1000" src="https://static.alili.tech/img/bVTNMi?w=1200&amp;h=1000" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader0">关于 Minimal</h2>
<blockquote><p><code>Minimal</code> 简介、优雅、尊贵。一款能展示项目的主题； <code>Minimal</code> 是一款专为开源贡献者而生的 <code>hexo</code> 博客主题。<code>Minimal</code> 在原始文章结构的基础上，实现了新的 项目结构； 使得通过同一 <code>hexo</code> 博客下共同实现 文章与目录的 区别展示与分页效果。 博主只需要引入 <code>Minimal</code> 主题，并在自己原有的博客网站中添加新的项目内容，或对原有的文章内容进行细微调整即可丰富自己博客网站的展示效果。向无私的开源贡献者们 【致敬】！。</p></blockquote>
<p><a href="http://blog.ckryo.com/" rel="nofollow noreferrer" target="_blank">效果演示地址</a></p>
<p><a href="https://github.com/ckryo/hexo-theme-minimal" rel="nofollow noreferrer" target="_blank">github地址</a></p>
<h2 id="articleHeader1">安装</h2>
<p>在终端窗口下，定位到 Hexo 站点目录下。使用 Git checkout 代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ cd your-hexo-site
$ git clone https://github.com/ckryo/hexo-theme-minimal themes/minimal" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-variable">$ </span>cd your-hexo-site
<span class="hljs-variable">$ </span>git clone <span class="hljs-symbol">https:</span>/<span class="hljs-regexp">/github.com/ckryo</span><span class="hljs-regexp">/hexo-theme-minimal themes/minimal</span></code></pre>
<h3 id="articleHeader2">启用主题</h3>
<p>与所有 Hexo 主题启用的模式一样。 当 <code>git clone</code> 完成后，打开 站点 <strong>配置文件</strong> ， 找到 theme 字段，并将其值更改为 <code>minimal</code>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="theme: minimal" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">theme:</span> minimal</code></pre>
<p>如果您的电脑中尚未安装所需要的程序，请根据以下安装指示完成安装。</p>
<h2 id="articleHeader3">主题设定</h2>
<p>以下是主题配置文件项目说明：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="site:
  logo: 网站logo - 文字logo
  title: 网站标题
  keywords: 网站关键字
  description: 网站描述

banner: 网站上部 - 导航下面banner 区域样式
  title: 自定义显示标题
  description: 副标题
  background_image: 背景图片

author: 网站侧边栏的作者信息
  avatar: 头像图片地址
  nick: 昵称
  description: 个人简介

menu: 导航菜单
  首页: /
  项目: /project/index.html
  文章: /post/index.html
  关于我: /about.html
  Minimal: /project/2016/04/28/hexo-minimal.html

menu_icons: 导航菜单图标
  Minimal: tachometer

# 集成第三方服务
vendors:
  # 社会化评论， 畅言
  changyan:
    app_id: cysYE5nWR
    conf: prod_ea59e8a942c2c4c0e72b24ed00ecddc9
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code class="ymal"><span class="hljs-symbol">site:</span>
<span class="hljs-symbol">  logo:</span> 网站logo - 文字logo
<span class="hljs-symbol">  title:</span> 网站标题
<span class="hljs-symbol">  keywords:</span> 网站关键字
<span class="hljs-symbol">  description:</span> 网站描述
<span class="hljs-symbol">
banner:</span> 网站上部 - 导航下面banner 区域样式
<span class="hljs-symbol">  title:</span> 自定义显示标题
<span class="hljs-symbol">  description:</span> 副标题
<span class="hljs-symbol">  background_image:</span> 背景图片
<span class="hljs-symbol">
author:</span> 网站侧边栏的作者信息
<span class="hljs-symbol">  avatar:</span> 头像图片地址
<span class="hljs-symbol">  nick:</span> 昵称
<span class="hljs-symbol">  description:</span> 个人简介
<span class="hljs-symbol">
menu:</span> 导航菜单
  首页: /
  项目: <span class="hljs-meta-keyword">/project/</span>index.html
  文章: <span class="hljs-meta-keyword">/post/</span>index.html
  关于我: /about.html
<span class="hljs-symbol">  Minimal:</span> <span class="hljs-meta-keyword">/project/</span><span class="hljs-number">2016</span>/<span class="hljs-number">04</span>/<span class="hljs-number">28</span>/hexo-minimal.html
<span class="hljs-symbol">
menu_icons:</span> 导航菜单图标
<span class="hljs-symbol">  Minimal:</span> tachometer

<span class="hljs-meta"># 集成第三方服务</span>
<span class="hljs-symbol">vendors:</span>
  <span class="hljs-meta"># 社会化评论， 畅言</span>
<span class="hljs-symbol">  changyan:</span>
<span class="hljs-symbol">    app_id:</span> cysYE5nWR
<span class="hljs-symbol">    conf:</span> prod_ea59e8a942c2c4c0e72b24ed00ecddc9
</code></pre>
<p>其它配置项说明：</p>
<ol>
<li>
<p>项目目录</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
定位到 `your-hexo-site-path/source` 目录下, 新增 `_projects` 文件目录； 将项目文章放置到该文件目录下即可。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autohotkey"><code>
定位到 `your-hexo-site-path/source` 目录下, 新增 `_projects` 文件目录； 将项目文章放置到该文件目录下即可。
</code></pre>
</li>
<li>
<p>Front-matter</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# 公共属性
preview: 类缩图
comments: 是否添加评论

# project属性
date: 项目创建时间
description: 项目描述
home_url: 项目主页
demo_url: 演示地址 or 下载链接" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code><span class="hljs-meta"># 公共属性</span>
<span class="hljs-symbol">preview:</span> 类缩图
<span class="hljs-symbol">comments:</span> 是否添加评论

<span class="hljs-meta"># project属性</span>
<span class="hljs-symbol">date:</span> 项目创建时间
<span class="hljs-symbol">description:</span> 项目描述
<span class="hljs-symbol">home_url:</span> 项目主页
<span class="hljs-symbol">demo_url:</span> 演示地址 <span class="hljs-keyword">or</span> 下载链接</code></pre>
</li>
</ol>
<h2 id="articleHeader4">致歉</h2>
<p>由于目前精力有限，该项目还有诸多不足之处，包括<code>分类页</code>,<code>标签云</code>等，还请各位海涵，在以后的时间里，将会不断更新完善。<br>同时也接受各种形式的贡献，包括不限于提交问题与需求，修复代码。等待您的Pull Request。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
HEXO - Minimal 一款为开源作者而生的主题

## 原文链接
[https://segmentfault.com/a/1190000010877056](https://segmentfault.com/a/1190000010877056)

