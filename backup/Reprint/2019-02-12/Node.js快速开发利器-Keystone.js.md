---
title: 'Node.js快速开发利器-Keystone.js' 
date: 2019-02-12 2:30:12
hidden: true
slug: jlycre09agi
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">介绍</h2>
<p><a href="http://keystonejs.com" rel="nofollow noreferrer" target="_blank">Keystone</a>是以Express和MongoDB为基础搭建的开源的Node.js CMS和web应用程序平台。</p>
<p>Keystone在官网上声称：在Node.js中，用Keystone搭建数据驱动的网站、应用程序和API是最容易的。</p>
<p>之所以出此狂言，背后还是有料的，Keystone自带以下功能：</p>
<ol>
<li><p>内置Express.js和MongoDB</p></li>
<li><p>动态路由</p></li>
<li><p>实用的数据库域类型</p></li>
<li><p>自动生成管理员界面</p></li>
<li><p>基于数据模型的表单处理</p></li>
<li><p>会话管理和认证功能</p></li>
</ol>
<p>我觉得keystone最牛逼的地方就是根据你定义的模型自动帮你实现后台管理界面，创建、管理、编辑和删除等，这得省掉很多功夫了。这样实现一个网站只要定义model和写前端代码就好了。</p>
<p>这应该是前端猴子接外包的一个利器吧。</p>
<h2 id="articleHeader1">安装准备</h2>
<ol>
<li><p>安装<a href="http://nodejs.org" rel="nofollow noreferrer" target="_blank">node.js</a> 0.10+</p></li>
<li><p>安装<a href="https://www.mongodb.org/" rel="nofollow noreferrer" target="_blank">mongodb</a> v2.4+</p></li>
<li><p>安装yeoman <code>npm install -g yo</code></p></li>
<li><p>安装keystone生成器 <code>npm install -g generator-keystone</code></p></li>
</ol>
<h2 id="articleHeader2">开始</h2>
<ol>
<li><p>创建项目目录<br><code>mkdir my-keystone</code></p></li>
<li><p>进入项目目录<br><code>cd my-keystone</code></p></li>
<li><p>生成代码<br><code>yo keystone</code></p></li>
</ol>
<p>代码生成器会问你几个问题，比如项目名称，是否内置博客、相册和联系表单，是否添加User模型，添加管理员账户密码</p>
<ol>
<li><p>安装依赖<br><code>npm install</code></p></li>
<li><p>运行项目<br><code>node keystone</code></p></li>
</ol>
<p>打开<a href="http://localhost:3000" rel="nofollow noreferrer" target="_blank">http://localhost:3000</a> 在浏览器查看<br>  通过<a href="http://localhost:3000/keystone" rel="nofollow noreferrer" target="_blank">http://localhost:3000/keystone</a> 打开后台管理</p>
<h2 id="articleHeader3">Model</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var keystone = require('keystone'),
    Types = keystone.Field.Types;
 
var Post = new keystone.List('Post', {
    autokey: { path: 'slug', from: 'title', unique: true },
    map: { name: 'title' },
    defaultSort: '-createdAt'
});
 
Post.add({
    title: { type: String, required: true },
    state: { type: Types.Select, options: 'draft, published, archived', default: 'draft' },
    author: { type: Types.Relationship, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    publishedAt: Date,
    image: { type: Types.CloudinaryImage },
    content: {
        brief: { type: Types.Html, wysiwyg: true, height: 150 },
        extended: { type: Types.Html, wysiwyg: true, height: 400 }
    }
});
 
Post.defaultColumns = 'title, state|20%, author, publishedAt|15%'
Post.register();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">var</span> <span class="hljs-string">keystone</span> <span class="hljs-string">=</span> <span class="hljs-string">require('keystone'),</span>
    <span class="hljs-string">Types</span> <span class="hljs-string">=</span> <span class="hljs-string">keystone.Field.Types;</span>
 
<span class="hljs-string">var</span> <span class="hljs-string">Post</span> <span class="hljs-string">=</span> <span class="hljs-string">new</span> <span class="hljs-string">keystone.List('Post',</span> <span class="hljs-string">{</span>
<span class="hljs-attr">    autokey:</span> <span class="hljs-string">{</span> <span class="hljs-attr">path:</span> <span class="hljs-string">'slug'</span><span class="hljs-string">,</span> <span class="hljs-attr">from:</span> <span class="hljs-string">'title'</span><span class="hljs-string">,</span> <span class="hljs-attr">unique:</span> <span class="hljs-literal">true</span> <span class="hljs-string">},</span>
<span class="hljs-attr">    map:</span> <span class="hljs-string">{</span> <span class="hljs-attr">name:</span> <span class="hljs-string">'title'</span> <span class="hljs-string">},</span>
<span class="hljs-attr">    defaultSort:</span> <span class="hljs-string">'-createdAt'</span>
<span class="hljs-string">});</span>
 
<span class="hljs-string">Post.add({</span>
<span class="hljs-attr">    title:</span> <span class="hljs-string">{</span> <span class="hljs-attr">type:</span> <span class="hljs-string">String,</span> <span class="hljs-attr">required:</span> <span class="hljs-literal">true</span> <span class="hljs-string">},</span>
<span class="hljs-attr">    state:</span> <span class="hljs-string">{</span> <span class="hljs-attr">type:</span> <span class="hljs-string">Types.Select,</span> <span class="hljs-attr">options:</span> <span class="hljs-string">'draft, published, archived'</span><span class="hljs-string">,</span> <span class="hljs-attr">default:</span> <span class="hljs-string">'draft'</span> <span class="hljs-string">},</span>
<span class="hljs-attr">    author:</span> <span class="hljs-string">{</span> <span class="hljs-attr">type:</span> <span class="hljs-string">Types.Relationship,</span> <span class="hljs-attr">ref:</span> <span class="hljs-string">'User'</span> <span class="hljs-string">},</span>
<span class="hljs-attr">    createdAt:</span> <span class="hljs-string">{</span> <span class="hljs-attr">type:</span> <span class="hljs-string">Date,</span> <span class="hljs-attr">default:</span> <span class="hljs-string">Date.now</span> <span class="hljs-string">},</span>
<span class="hljs-attr">    publishedAt:</span> <span class="hljs-string">Date,</span>
<span class="hljs-attr">    image:</span> <span class="hljs-string">{</span> <span class="hljs-attr">type:</span> <span class="hljs-string">Types.CloudinaryImage</span> <span class="hljs-string">},</span>
<span class="hljs-attr">    content:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        brief:</span> <span class="hljs-string">{</span> <span class="hljs-attr">type:</span> <span class="hljs-string">Types.Html,</span> <span class="hljs-attr">wysiwyg:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span> <span class="hljs-attr">height:</span> <span class="hljs-number">150</span> <span class="hljs-string">},</span>
<span class="hljs-attr">        extended:</span> <span class="hljs-string">{</span> <span class="hljs-attr">type:</span> <span class="hljs-string">Types.Html,</span> <span class="hljs-attr">wysiwyg:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span> <span class="hljs-attr">height:</span> <span class="hljs-number">400</span> <span class="hljs-string">}</span>
    <span class="hljs-string">}</span>
<span class="hljs-string">});</span>
 
<span class="hljs-string">Post.defaultColumns</span> <span class="hljs-string">=</span> <span class="hljs-string">'title, state|20%, author, publishedAt|15%'</span>
<span class="hljs-string">Post.register();</span></code></pre>
<p>这是官网中给出的例子，一个文章的model，<a href="http://keystonejs.com/zh/docs/database/" rel="nofollow noreferrer" target="_blank">详情</a></p>
<p>不得不提一下，<strong>keystone的图片类型</strong>是<code>Types.CloudinaryImage</code>,需要购买CloudinaryImage的服务，如果你不想用Cloudinary的服务的话，keystone还提供了<code>Types.LocalFile</code>,这样我们就可以把image改成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="image: { type: Types.LocalFile, dest: 'public/upload', 
        prefix: '/upload',
        format: function(item, file){
            return '<img src=&quot;'+file.href+'&quot; style=&quot;max-width: 120px&quot;>';
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs scilab"><code>image: { <span class="hljs-built_in">type</span>: Types.LocalFile, dest: <span class="hljs-string">'public/upload'</span>, 
        prefix: <span class="hljs-string">'/upload'</span>,
        format: <span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(item, file)</span>{</span>
            <span class="hljs-keyword">return</span> <span class="hljs-string">'&lt;img src="</span><span class="hljs-string">'+file.href+'</span><span class="hljs-string">" style="</span><span class="hljs-built_in">max</span>-width: <span class="hljs-number">120</span>px<span class="hljs-string">"&gt;'</span>;
        }
    }</code></pre>
<p>这里<code>format</code>是指针对后台管理用的<br>如果你想使用CDN服务的话，可以对图片文件夹进行了CDN同步，然后修改<code>prefix</code>为你的CDN提供商提供的前缀。</p>
<h2 id="articleHeader4">路由与视图</h2>
<p>路由配置文件：routes/index.js<br>中间件：routes/middleware.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var keystone = require('keystone'),
    middleware = require('./middleware'),
    importRoutes = keystone.importer(__dirname);
 
// 常用中间件
keystone.pre('routes', middleware.initErrorHandlers);
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);
 
// 处理404错误
keystone.set('404', function(req, res, next) {
    res.notfound();
});
 
// 处理其它错误
keystone.set('500', function(err, req, res, next) {
    var title, message;
    if (err instanceof Error) {
        message = err.message;
        err = err.stack;
    }
    res.err(err, title, message);
});
 
// 加载路由
var routes = {
    views: importRoutes('./views')
};
 
// 绑定路由
exports = module.exports = function(app) {
    
    app.get('/', routes.views.index);
    
    // 在路由之前，通过中间件做任何事情
    app.get('/protected', middleware.requireUser, middleware.other, routes.views.protected);
    
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> keystone = <span class="hljs-built_in">require</span>(<span class="hljs-string">'keystone'</span>),
    middleware = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./middleware'</span>),
    importRoutes = keystone.importer(__dirname);
 
<span class="hljs-comment">// 常用中间件</span>
keystone.pre(<span class="hljs-string">'routes'</span>, middleware.initErrorHandlers);
keystone.pre(<span class="hljs-string">'routes'</span>, middleware.initLocals);
keystone.pre(<span class="hljs-string">'render'</span>, middleware.flashMessages);
 
<span class="hljs-comment">// 处理404错误</span>
keystone.set(<span class="hljs-string">'404'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res, next</span>) </span>{
    res.notfound();
});
 
<span class="hljs-comment">// 处理其它错误</span>
keystone.set(<span class="hljs-string">'500'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, req, res, next</span>) </span>{
    <span class="hljs-keyword">var</span> title, message;
    <span class="hljs-keyword">if</span> (err <span class="hljs-keyword">instanceof</span> <span class="hljs-built_in">Error</span>) {
        message = err.message;
        err = err.stack;
    }
    res.err(err, title, message);
});
 
<span class="hljs-comment">// 加载路由</span>
<span class="hljs-keyword">var</span> routes = {
    <span class="hljs-attr">views</span>: importRoutes(<span class="hljs-string">'./views'</span>)
};
 
<span class="hljs-comment">// 绑定路由</span>
exports = <span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">app</span>) </span>{
    
    app.get(<span class="hljs-string">'/'</span>, routes.views.index);
    
    <span class="hljs-comment">// 在路由之前，通过中间件做任何事情</span>
    app.get(<span class="hljs-string">'/protected'</span>, middleware.requireUser, middleware.other, routes.views.protected);
    
}</code></pre>
<h2 id="articleHeader5">配置</h2>
<p>keystone提供了很多可配置项，你可以随心所欲地根据自己的需求配置，要了解Keystone支持的更多选项，请参见<a href="http://keystonejs.com/zh/docs/configuration" rel="nofollow noreferrer" target="_blank">配置指南</a>。</p>
<p>配置需要修改的文件是<code>keystone.js</code></p>
<h2 id="articleHeader6">项目结构</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="|--lib
|  定制的库和代码
|--models
|  程序的数据库模型
|--public
|  公开的静态文件 (css、js、images等)
|--routes
|  |--api
|  |  程序的api控制器
|  |--views
|  |  程序的视图控制器
|  |--index.js
|  |  初始化程序的路由和视图
|  |--middleware.js
|  |  为路由定制的中间件
|--templates
|  |--includes
|  |  通用的 .jade 组件放这里
|  |--layouts
|  |  基础 .jade 布局放这里
|  |--mixins
|  |  通用的 .jade mixins放这里
|  |--views
|  |  程序的视图模板
|--updates
|  数据组装和迁移脚本
|--package.json
|  给npm的项目配置
|--keystone.js
|  启动程序的主脚本" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>|<span class="hljs-string">--lib
</span>|<span class="hljs-string">  定制的库和代码
</span>|<span class="hljs-string">--models
</span>|<span class="hljs-string">  程序的数据库模型
</span>|<span class="hljs-string">--public
</span>|<span class="hljs-string">  公开的静态文件 (css、js、images等)
</span>|<span class="hljs-string">--routes
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">--api
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">  程序的api控制器
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">--views
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">  程序的视图控制器
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">--index.js
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">  初始化程序的路由和视图
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">--middleware.js
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">  为路由定制的中间件
</span>|<span class="hljs-string">--templates
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">--includes
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">  通用的 .jade 组件放这里
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">--layouts
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">  基础 .jade 布局放这里
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">--mixins
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">  通用的 .jade mixins放这里
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">--views
</span>|<span class="hljs-string">  </span>|<span class="hljs-string">  程序的视图模板
</span>|<span class="hljs-string">--updates
</span>|<span class="hljs-string">  数据组装和迁移脚本
</span>|<span class="hljs-string">--package.json
</span>|<span class="hljs-string">  给npm的项目配置
</span>|<span class="hljs-string">--keystone.js
</span>|<span class="hljs-string">  启动程序的主脚本</span></code></pre>
<h2 id="articleHeader7">缺点</h2>
<p>keystone强大的自动生成的管理后台，也是给我使用限制的地方，支持增删改查、上传文件等基础功能，但是在一些业务定制下却有失灵活性，或许是我研究不透，目前官方也没有给出对后台管理定制的文档，后续我将研究下如何深度定制管理后台，如果可行的话再来分享。</p>
<h3 id="articleHeader8">参考</h3>
<p>中文文档：<a href="http://keystonejs.com/zh/docs/" rel="nofollow noreferrer" target="_blank">http://keystonejs.com/zh/docs/</a>  <br>项目地址：<a href="https://github.com/keystonejs/keystone" rel="nofollow noreferrer" target="_blank">https://github.com/keystonejs/keystone</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Node.js快速开发利器-Keystone.js

## 原文链接
[https://segmentfault.com/a/1190000004646121](https://segmentfault.com/a/1190000004646121)

