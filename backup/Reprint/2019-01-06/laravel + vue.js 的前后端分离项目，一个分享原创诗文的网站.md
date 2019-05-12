---
title: 'laravel + vue.js 的前后端分离项目，一个分享原创诗文的网站' 
date: 2019-01-06 2:30:10
hidden: true
slug: 8plbygbrrxs
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">About</h2>
<p>一个前后端分离的 laravel5.4 + vue2 的项目，网站主旨是分享原创诗文--<a href="http://www.dragonflyxd.com" rel="nofollow noreferrer" target="_blank">诗词小筑</a>。<br>前台页面是由vue2编写的，后端提供api接口。而后台管理页面是由laravel的blade模板与vue2共同完成。<br>因此我将它们放在两个仓库里。<br>由于很多地方都是自己diy的，所以网站设计的有些粗糙。<br>如有疏漏不妥之处，还请不吝赐教。</p>
<blockquote><p><a href="https://github.com/DragonFlyXD/poetryclub-frontend" rel="nofollow noreferrer" target="_blank">诗词小筑的前台页面</a><br><a href="https://github.com/DragonFlyXD/poetryclub-backend" rel="nofollow noreferrer" target="_blank">诗词小筑的后台页面与后端代码</a></p></blockquote>
<hr>
<h1 id="articleHeader1">Frontend</h1>
<h2 id="articleHeader2">Intro</h2>
<p><a href="http://www.dragonflyxd.com" rel="nofollow noreferrer" target="_blank">诗词小筑</a>的前台页面，基于<strong>vue.js</strong>+<strong>element-ui</strong>。</p>
<blockquote><p><a href="https://github.com/DragonFlyXD/poetryclub-backend" rel="nofollow noreferrer" target="_blank">诗词小筑的后台页面与后端代码</a></p></blockquote>
<h2 id="articleHeader3">技术栈</h2>
<p>vue2 + element-ui + vuex + vue-router + axios + stylus + ES6</p>
<h2 id="articleHeader4">已实现功能</h2>
<ul>
<li>登录、注册、退出登录、修改密码、忘记密码、邮箱验证</li>
<li>邮件反馈</li>
<li>添加诗文、编辑诗文、搜索诗文</li>
<li>诗文点赞、收藏、评分、评论、写赏析</li>
<li>添加品鉴、编辑品鉴、搜索品鉴</li>
<li>品鉴点赞、收藏、评分、评论</li>
<li>修改个人信息</li>
<li>无限加载</li>
<li>关注用户</li>
<li>发送私信、删除私信、删除对话列表</li>
<li>微博登录、GitHub登录</li>
</ul>
<h2 id="articleHeader5">How To Use</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://github.com/DragonFlyXD/poetryclub-frontend

cd poetryclub-frontend

npm install

npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://github.com/DragonFlyXD/poetryclub-frontend

cd poetryclub-frontend

npm install

npm run dev</code></pre>
<h2 id="articleHeader6">Screenshot</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010429228" src="https://static.alili.tech/img/remote/1460000010429228" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010429229" src="https://static.alili.tech/img/remote/1460000010429229" alt="" title="" style="cursor: pointer;"></span></p>
<h1 id="articleHeader7">Backend</h1>
<h2 id="articleHeader8">Intro</h2>
<p><a href="http://www.dragonflyxd.com" rel="nofollow noreferrer" target="_blank">诗词小筑</a>的网站后台页面与后端代码，基于<strong>laravel</strong>+<strong>vue.js</strong>。</p>
<blockquote><p><a href="https://github.com/DragonFlyXD/poetryclub-frontend" rel="nofollow noreferrer" target="_blank">诗词小筑的前台页面</a></p></blockquote>
<h2 id="articleHeader9">技术栈</h2>
<p>laravel5.4 + passport + vue2 + element-ui + axios + stylus</p>
<h2 id="articleHeader10">How To Use</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://github.com/DragonFlyXD/poetryclub-backend

cd poetryclub-backend

composer install 

php artisan migration

chmod -R 777 storage

/**
 * 将生成的 ID 和 Secret 添加进 .env 文件中
 * 如:
 * PASSWORD_CLIENT_ID=3
 * PASSWORD_CLIENT_SECRET=OdIzVLnICs7dXYz3QEe9xeo1ITr2ugpdrwR1xvGb
 **/
php artisan passport:client --passport" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code>git clone https://github.com/DragonFlyXD/poetryclub-backend

cd poetryclub-backend

composer <span class="hljs-keyword">install</span> 

php artisan <span class="hljs-keyword">migration</span>

chmod -R <span class="hljs-number">777</span> <span class="hljs-keyword">storage</span>

<span class="hljs-comment">/**
 * 将生成的 ID 和 Secret 添加进 .env 文件中
 * 如:
 * PASSWORD_CLIENT_ID=3
 * PASSWORD_CLIENT_SECRET=OdIzVLnICs7dXYz3QEe9xeo1ITr2ugpdrwR1xvGb
 **/</span>
php artisan passport:<span class="hljs-keyword">client</span> <span class="hljs-comment">--passport</span></code></pre>
<ul>
<li>
<p>配置连接数据库信息，默认采用<strong>mysql</strong>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# .env

DB_DATABASE=your_database
DB_USERNAME=your_username
DB_PASSWORD=your_password" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code><span class="hljs-comment"># .env</span>

<span class="hljs-attr">DB_DATABASE</span>=your_database
<span class="hljs-attr">DB_USERNAME</span>=your_username
<span class="hljs-attr">DB_PASSWORD</span>=your_password</code></pre>
</li>
<li>
<p>配置邮件发送信息，采用<strong>sendclound</strong>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# .env

MAIL_FROM_ADDRESS=your_address // 如：dragonfly920130@outlook.com
MAIL_FROM_NAME=your_name // 如：诗词小筑
SEND_CLOUD_USER=your_user
SEND_CLOUD_KEY=your_key" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code><span class="hljs-comment"># .env</span>

<span class="hljs-attr">MAIL_FROM_ADDRESS</span>=your_address // 如：dragonfly920130@outlook.com
<span class="hljs-attr">MAIL_FROM_NAME</span>=your_name // 如：诗词小筑
<span class="hljs-attr">SEND_CLOUD_USER</span>=your_user
<span class="hljs-attr">SEND_CLOUD_KEY</span>=your_key</code></pre>
</li>
<li>
<p>配置搜索功能信息，采用<strong>algolia</strong>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# .env

ALGOLIA_APP_ID=your_id
ALGOLIA_SECRET=your_secret" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code><span class="hljs-comment"># .env</span>

<span class="hljs-attr">ALGOLIA_APP_ID</span>=your_id
<span class="hljs-attr">ALGOLIA_SECRET</span>=your_secret</code></pre>
</li>
<li>
<p>配置图片存储功能信息，采用<strong>七牛云</strong>。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="# .env

QINIU_ACCESS_KEY=your_access_key
QINIU_SECRET_KEY=your_secret_key
QINIU_BUCKET=your_bucket
QINIU_DOMAIN=your_domain" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ini"><code><span class="hljs-comment"># .env</span>

<span class="hljs-attr">QINIU_ACCESS_KEY</span>=your_access_key
<span class="hljs-attr">QINIU_SECRET_KEY</span>=your_secret_key
<span class="hljs-attr">QINIU_BUCKET</span>=your_bucket
<span class="hljs-attr">QINIU_DOMAIN</span>=your_domain</code></pre>
</li>
</ul>
<h2 id="articleHeader11">Screenshot</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010429230" src="https://static.alili.tech/img/remote/1460000010429230" alt="" title="" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010429231" src="https://static.alili.tech/img/remote/1460000010429231" alt="" title="" style="cursor: pointer;"></span></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
laravel + vue.js 的前后端分离项目，一个分享原创诗文的网站

## 原文链接
[https://segmentfault.com/a/1190000010428981](https://segmentfault.com/a/1190000010428981)

