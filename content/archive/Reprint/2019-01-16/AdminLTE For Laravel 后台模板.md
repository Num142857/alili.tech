---
title: 'AdminLTE For Laravel 后台模板' 
date: 2019-01-16 2:30:08
hidden: true
slug: sfq54vxwpi9
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">AdminLTE For Laravel</h1>
<h2 id="articleHeader1">介绍</h2>
<p>基于<a href="https://github.com/almasaeed2010/AdminLTE" rel="nofollow noreferrer" target="_blank">AdminLTE</a>的后台模板样式 集成基本的文章 用户模块 其余的功能模板可根据实际项目需求添加</p>
<blockquote><p><code>Github</code> 项目地址  <a href="https://github.com/GeekGhc/adminLTE-for-laravel" rel="nofollow noreferrer" target="_blank">AdminLTE-For-Laravel</a></p></blockquote>
<h2 id="articleHeader2">效果图</h2>
<h3 id="articleHeader3">后台首页</h3>
<p><span class="img-wrap"><img data-src="/img/bVMrW6?w=1901&amp;h=986" src="https://static.alili.tech/img/bVMrW6?w=1901&amp;h=986" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader4">文章列表</h3>
<p><span class="img-wrap"><img data-src="/img/bVMrW8?w=1901&amp;h=984" src="https://static.alili.tech/img/bVMrW8?w=1901&amp;h=984" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader5">创建文章</h3>
<p><span class="img-wrap"><img data-src="/img/bVMrXd?w=1904&amp;h=990" src="https://static.alili.tech/img/bVMrXd?w=1904&amp;h=990" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader6">安装</h2>
<h3 id="articleHeader7">1.clone到本地</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://github.com/GeekGhc/adminLTE-for-laravel.git" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code style="word-break: break-word; white-space: initial;">git clone https:<span class="hljs-regexp">//gi</span>thub.com<span class="hljs-regexp">/GeekGhc/</span>adminLTE-<span class="hljs-keyword">for</span>-laravel.git</code></pre>
<h3 id="articleHeader8">2.根目录下创建.env文件</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" php artisan key:generate" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs verilog"><code style="word-break: break-word; white-space: initial;"> php artisan key:<span class="hljs-keyword">generate</span></code></pre>
<p>后台开发过程时可借助<code>MustBeAnAdmin</code> middleware 完成逻辑判断</p>
<p>在管理用户权限的<code>Packages</code></p>
<ul>
<li><p><a href="https://github.com/spatie/laravel-permission" rel="nofollow noreferrer" target="_blank">Laravel Permission</a> 目前我的项目就是用的这个<code>Package</code></p></li>
<li><p><a href="https://github.com/romanbican/roles" rel="nofollow noreferrer" target="_blank">Laravel Roles</a></p></li>
<li><p><a href="https://github.com/ultraware/roles" rel="nofollow noreferrer" target="_blank">ultraware/roles</a></p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
AdminLTE For Laravel 后台模板

## 原文链接
[https://segmentfault.com/a/1190000009124854](https://segmentfault.com/a/1190000009124854)

