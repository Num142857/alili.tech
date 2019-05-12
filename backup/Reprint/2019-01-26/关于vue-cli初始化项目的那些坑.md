---
title: '关于vue-cli初始化项目的那些坑' 
date: 2019-01-26 2:30:18
hidden: true
slug: 2wjktemtxbg
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">关于vue-cli初始化项目的那些坑</h2>
<blockquote><p>Vue.js是最近非常火爆的一个前端js框架，后面使用vue-cli建设自己的项目遇到了比较多的坑</p></blockquote>
<ul><li>
<p>开发项目的必要环境</p>
<ul>
<li><p>node.js环境</p></li>
<li><p>npm镜像</p></li>
</ul>
</li></ul>
<blockquote><ul><li><p>安装node.js</p></li></ul></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    使用node -v出现版本号即安装成功
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>    使用<span class="hljs-keyword">node</span> <span class="hljs-title">-v</span>出现版本号即安装成功
</code></pre>
<blockquote>
<p>-安装vue-cli脚手架构建工具</p>
<p>在命令行中运行 <strong>npm install -g vue-cli</strong> ,等待其安装完成</p>
</blockquote>
<blockquote><p>-在自己的项目目录下，使用命令行运行命令 <strong>vue init webpack vueProject</strong>,此时，我们可能会遇到这种问题：</p></blockquote>
<p><strong>"Failed to download repo   vuejs-templates/webpack-simple"</strong></p>
<blockquote><h3 id="articleHeader1">解决方案如下</h3></blockquote>
<p>1.打开终端（cmd），输入命令：ping 192.30.253.112 发现连接超时；输入命令：ping github.com 显示超时。</p>
<blockquote><p>2.打开 hosts文件，地址：C:WindowsSystem32driversetc  看是否是默认配置。<br>3.在本地hosts文件中加入:</p></blockquote>
<ul>
<li><p>192.30.253.112 github.com</p></li>
<li><p>151.101.88.249 github.global.ssl.fastly.net&gt;</p></li>
</ul>
<p>### 如果本地已经做了代理</p>
<p>1、关闭npm的https</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm config set strict-ssl false
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code>npm config <span class="hljs-keyword">set</span> <span class="hljs-keyword">strict</span>-ssl <span class="hljs-keyword">false</span>
</code></pre>
<p>2、设置npm的获取地址</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm config set registry &quot;http://registry.npmjs.org/&quot;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs tcl"><code>npm config <span class="hljs-keyword">set</span> <span class="hljs-keyword">registry</span> <span class="hljs-string">"http://registry.npmjs.org/"</span>
</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
关于vue-cli初始化项目的那些坑

## 原文链接
[https://segmentfault.com/a/1190000008347498](https://segmentfault.com/a/1190000008347498)

