---
title: 'Node pm2如何做进程管理Nuxt项目' 
date: 2018-12-27 2:30:12
hidden: true
slug: qtxm5lq7vek
categories: [reprint]
---

{{< raw >}}

                    
<h3 id="articleHeader0">1、Node环境搭建</h3>
<p>关于node环境搭建请<a href="https://xiangzongliang.com/blogContent?b=77" rel="nofollow noreferrer" target="_blank">参考文章</a></p>
<p>安装之后通过命令<code>node -v</code>来检查node是否安装成功，通过命令<code>npm -v</code>来检查npm是否安装成功。</p>
<h3 id="articleHeader1">2、全局安装pm2</h3>
<p>执行命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i pm2 -g" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-selector-tag">i</span> pm2 -g</code></pre>
<h3 id="articleHeader2">3、初步了解pm2</h3>
<p>pm2是nodeJS 进程守护工具，相似的工具还有<code>forever</code>等，当我们在服务器上开启一个命令提示符窗口时候，我们可以去启动我们的vue项目，但是当我们关闭提示符窗口时，进程也就随之结束了。所以我们需要一个工具来进行进程守护，在这里简单的写到几个pm2的命令：</p>
<h4>pm2启动进程</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pm2 start app.js

pm2 start app.py

pm2 start npm -- start  

pm2 start [app-name]

pm2 start all
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>pm2 <span class="hljs-keyword">start</span> app.js

pm2 <span class="hljs-keyword">start</span> app.py

pm2 <span class="hljs-keyword">start</span> npm <span class="hljs-comment">-- start  </span>

pm2 <span class="hljs-keyword">start</span> [app-<span class="hljs-keyword">name</span>]

pm2 <span class="hljs-keyword">start</span> all
</code></pre>
<h4>pm2进程列表</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pm2 list" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">pm2 <span class="hljs-built_in">list</span></code></pre>
<h4>pm2重启进程</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pm2 restart [app-name]

pm2 restart all
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs apache"><code><span class="hljs-attribute">pm2</span> restart<span class="hljs-meta"> [app-name]</span>

<span class="hljs-attribute">pm2</span> restart <span class="hljs-literal">all</span>
</code></pre>
<h4>pm2停止进程</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pm2 stop [app-name]

pm2 stop all" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs fortran"><code>pm2 <span class="hljs-keyword">stop</span> [app-<span class="hljs-keyword">name</span>]

pm2 <span class="hljs-keyword">stop</span> <span class="hljs-built_in">all</span></code></pre>
<h4>pm2的进程日志</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pm2 logs

pm2 logs [app-name]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs accesslog"><code>pm2 logs

pm2 logs <span class="hljs-string">[app-name]</span></code></pre>
<p>关于pm2的命令详细文档请  <strong><a href="https://www.npmjs.com/package/pm2" rel="nofollow noreferrer" target="_blank">参考pm2官网</a></strong></p>
<h3 id="articleHeader3">pm2启动nuxt项目</h3>
<p>我们都知道，nuxt.js的项目启动命令，先执行<code>npm run build</code>,在执行<code>npm run start</code>,pm2也支持参数的传递，也有大神说pm2启动nuxt只需要执行<code>pm2 start npm -- run start</code>,到目前为止，表示项目没有这样启动成功过。</p>
<p>所以我们要知道<code>package.json</code>这个文件，当我们执行<code>npm run dev</code>的时候，其实使用npm去启动了<code>./node_modules/nuxt/bin/nuxt</code>这个文件。当我们cd到我们的项目目录之后，我们最终可以执行如下命令来启动：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="pm2 start ./node_modules/nuxt/bin/nuxt -- start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">pm2 <span class="hljs-keyword">start</span> ./node_modules/nuxt/<span class="hljs-keyword">bin</span>/nuxt <span class="hljs-comment">-- start</span></code></pre>
<blockquote>这里需要注意的是，后面的<code>start</code>参数是一定要传的，否则启动的是<code>dev</code>开发者模式。这样导致我们网站的加载速度非常慢，我们也可以修改<code>./node_modules/nuxt/bin/nuxt</code>文件（如下图），并通过<code>pm2 logs</code>来查看日志：<br><span class="img-wrap"><img data-src="/img/remote/1460000011805991?w=636&amp;h=712" src="https://static.alili.tech/img/remote/1460000011805991?w=636&amp;h=712" alt="" title="" style="cursor: pointer; display: inline;"></span>
</blockquote>
<p><strong><a href="http://xiangzongliang.com/blogContent?b=79" rel="nofollow noreferrer" target="_blank">原文链接</a></strong></p>
<p><strong><a href="http://xiangzongliang.com" rel="nofollow noreferrer" target="_blank">作者博客</a></strong></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Node pm2如何做进程管理Nuxt项目

## 原文链接
[https://segmentfault.com/a/1190000011805986](https://segmentfault.com/a/1190000011805986)

