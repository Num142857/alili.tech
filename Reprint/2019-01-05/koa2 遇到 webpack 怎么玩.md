---
title: 'koa2 遇到 webpack 怎么玩' 
date: 2019-01-05 2:30:11
hidden: true
slug: qvekbopwsi
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0"><a href="https://github.com/chenbin92/koa2-webpack-boilerplate" rel="nofollow noreferrer" target="_blank">『源代码』</a></h2>
<p>注释：以下内容只是<a href="https://github.com/chenbin92/koa2-webpack-boilerplate" rel="nofollow noreferrer" target="_blank">『koa2-webpack-boilerplate』</a>的说明文档，算不得一篇文章，纯粹个人的随笔记录。</p>
<h2 id="articleHeader1">Table of Contents</h2>
<ol>
<li><a>Features</a></li>
<li><a>Requirements</a></li>
<li><a>Installation</a></li>
<li><a>Running the Project</a></li>
<li><a>Project Structure</a></li>
<li>
<p><a>Live Development</a></p>
<ul>
<li><a>HTML</a></li>
<li><a>Images</a></li>
<li><a>StyleSheets</a></li>
<li><a>JavaScript</a></li>
</ul>
</li>
<li><a>Routing</a></li>
<li><a>Webpack</a></li>
<li><a>Eslint</a></li>
<li><a>Pre-commit</a></li>
<li><a>Base Configuration</a></li>
<li><a>In development Mode</a></li>
<li><a>In production Mode</a></li>
<li><a>Mount</a></li>
<li><a>TODO</a></li>
</ol>
<hr>
<h2 id="articleHeader2">Features</h2>
<p>This is a starter koa boilerplate app I've put together using the following technologies:</p>
<p>✓ <a href="https://github.com/koajs/koa" rel="nofollow noreferrer" target="_blank">koa v2</a><br>✓ <a href="https://github.com/webpack/webpack" rel="nofollow noreferrer" target="_blank">webpack v3</a><br>✓ <a href="http://babeljs.io/docs/learn-es2015/" rel="nofollow noreferrer" target="_blank">ES2015+</a><br>✓ <a href="http://babeljs.io/" rel="nofollow noreferrer" target="_blank">Babel</a><br>✓ <a href="http://sass-lang.com/" rel="nofollow noreferrer" target="_blank">SCSS</a><br>✓ <a href="https://github.com/leecade/koa-webpack-middleware" rel="nofollow noreferrer" target="_blank">Hot reload</a><br>✓ <a href="https://github.com/eslint/eslint" rel="nofollow noreferrer" target="_blank">Eslint</a><br>✓ <a href="https://github.com/observing/pre-commit" rel="nofollow noreferrer" target="_blank">pre-commit</a><br>✓ ...</p>
<hr>
<h2 id="articleHeader3">Requirements</h2>
<ul>
<li>node <code>^6.0.0</code>
</li>
<li>npm <code>^5.0.0</code>
</li>
</ul>
<h2 id="articleHeader4">Installation</h2>
<p>基于 <code>koa-boilerpate</code> 开始一个新的项目</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ git clone git@github.com:chenbin92/koa2-webpack-boilerplate.git MyApp
$ cd MyApp
$ npm install        # Install project dependencies listed in package.json
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code class="shell"><span class="hljs-variable">$ </span>git clone git<span class="hljs-variable">@github</span>.<span class="hljs-symbol">com:</span>chenbin92/koa2-webpack-boilerplate.git MyApp
<span class="hljs-variable">$ </span>cd MyApp
<span class="hljs-variable">$ </span>npm install        <span class="hljs-comment"># Install project dependencies listed in package.json</span>
</code></pre>
<hr>
<h2 id="articleHeader5">Running the Project</h2>
<p>安装项目依赖成功后，启动开发环境命令如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// run the dev server http://localhost:3000
$ npm run dev:start" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>// <span class="hljs-keyword">run</span><span class="bash"> the dev server http://localhost:3000
</span>$ npm <span class="hljs-keyword">run</span><span class="bash"> dev:start</span></code></pre>
<p>其他任务脚本</p>
<table>
<thead><tr>
<th><code>npm &lt;script&gt;</code></th>
<th>Description</th>
</tr></thead>
<tbody>
<tr>
<td><code>star:dev</code></td>
<td>Serves your app in development mode</td>
</tr>
<tr>
<td><code>star:prod</code></td>
<td>Serves your app in production mode</td>
</tr>
<tr>
<td><code>build</code></td>
<td>Builds the application</td>
</tr>
<tr>
<td><code>lint</code></td>
<td>
<a href="http://stackoverflow.com/questions/8503559/what-is-linting" rel="nofollow noreferrer" target="_blank">Lints</a> the project for potential errors</td>
</tr>
</tbody>
</table>
<hr>
<h2 id="articleHeader6">Project Structure</h2>
<p>一般项目结构可以按照<code>文件类型</code>、<code>功能类型</code>或其他类型设计，每个团队每个项目都可能会有自己的项目结构。 koa2-webpack-boilerplate 奉行『约定优于配置』，按照一套统一的约定进行应用开发。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="koa2-webpack-boilerpate
├── index.js                        # 用于自定义启动时的初始化工作(如配置babel-register)
├── src                             # 应用源代码
|   ├── assets                      # 静态资源
|   |   ├── images
|   |   ├── javascripts
|   |   └── stylesheets
|   ├── config                      # 用于编写配置文件
|   |   └── dictionary.js
|   | 
│   ├── controller                  # 用于解析用户的输入，处理后返回相应的结果
│   |   └── home.js
│   ├── service                     # 用于编写业务逻辑层
│   |   └── user.js
│   ├── middleware                  # 用于编写中间件
│   |   └── response_time.js
│   ├── public                      # 唯一对外开放的文件夹，存放静态文件和编译后的资源文件
│   |   └── favicon.ico
│   ├── view                        # 用于放置模板文件
│   |   └── home.html
│   └── router                     # 用于配置 URL 路由规则
│   |   └── index.js
├── build                           # 用于编写构建文件
|   ├── chalk.config.js
|   ├── project.config.js
|   └── webpack.prod.js
└── test                            # 用于单元测试" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>koa2-webpack-boilerpate
├── index.js                        <span class="hljs-meta"># 用于自定义启动时的初始化工作(如配置babel-register)</span>
├── src                             <span class="hljs-meta"># 应用源代码</span>
<span class="hljs-string">|   ├── assets                      # 静态资源</span>
<span class="hljs-string">|   |   ├── images</span>
<span class="hljs-string">|   |   ├── javascripts</span>
<span class="hljs-string">|   |   └── stylesheets</span>
<span class="hljs-string">|   ├── config                      # 用于编写配置文件</span>
<span class="hljs-string">|   |   └── dictionary.js</span>
<span class="hljs-string">|   | </span>
│   ├── controller                  <span class="hljs-meta"># 用于解析用户的输入，处理后返回相应的结果</span>
│   <span class="hljs-string">|   └── home.js</span>
│   ├── service                     <span class="hljs-meta"># 用于编写业务逻辑层</span>
│   <span class="hljs-string">|   └── user.js</span>
│   ├── middleware                  <span class="hljs-meta"># 用于编写中间件</span>
│   <span class="hljs-string">|   └── response_time.js</span>
│   ├── public                      <span class="hljs-meta"># 唯一对外开放的文件夹，存放静态文件和编译后的资源文件</span>
│   <span class="hljs-string">|   └── favicon.ico</span>
│   ├── view                        <span class="hljs-meta"># 用于放置模板文件</span>
│   <span class="hljs-string">|   └── home.html</span>
│   └── router                     <span class="hljs-meta"># 用于配置 URL 路由规则</span>
│   <span class="hljs-string">|   └── index.js</span>
├── build                           <span class="hljs-meta"># 用于编写构建文件</span>
<span class="hljs-string">|   ├── chalk.config.js</span>
<span class="hljs-string">|   ├── project.config.js</span>
<span class="hljs-string">|   └── webpack.prod.js</span>
└── test                            <span class="hljs-meta"># 用于单元测试</span></code></pre>
<hr>
<h2 id="articleHeader7">Live Development</h2>
<h3 id="articleHeader8">HTML</h3>
<p>我们使用 webpack 对 <code>app/assets/*</code> 目录下的文件进行动态编译打包至 <code>app/public/*</code> 目录下，通过 <a href="https://github.com/chenbin92/koa2-webpack-boilerplate/blob/master/src/middleware/assetsMiddleware.js" rel="nofollow noreferrer" target="_blank">assetsMiddleware</a> 中间件根据自动注入 bundle 文件。</p>
<p>大致思路是：</p>
<ul>
<li>在开发环境，直接使用webpack编译在内存的文件系统作为资源来源；</li>
<li>在生产环境，先使用 <code>assets-webpack-plugin</code> 生成 <code>assetsMap.json</code> 文件，然后根据 <code>assetName </code>映射；</li>
<li>在 <code>ctx.state</code> 上挂载 <code>link</code> 和 <code>script</code> 属性，用于在 <code>index.html</code> 引用文件</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="ctx.state.script = (assetName) => {
     return `<script src='${getUrlByEnv(assetName)}'></script>`;
 };

 ctx.state.link = (assetName) => {
      return `<link rel='stylesheet' href='${getUrlByEnv(assetName)}'>`;
    };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>ctx.state.script = <span class="hljs-function"><span class="hljs-params">(assetName)</span> =&gt;</span> {
     <span class="hljs-keyword">return</span> `<span class="javascript">&lt;script src=<span class="hljs-string">'${getUrlByEnv(assetName)}'</span>&gt;<span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></span>`;
 };

 ctx.state.link = <span class="hljs-function"><span class="hljs-params">(assetName)</span> =&gt;</span> {
      <span class="hljs-keyword">return</span> `<span class="javascript">&lt;link rel=<span class="hljs-string">'stylesheet'</span> href=<span class="hljs-string">'${getUrlByEnv(assetName)}'</span>&gt;</span>`;
    };</code></pre>
<p><a href="https://github.com/chenbin92/koa2-webpack-boilerplate/blob/master/src/middleware/assetsMiddleware.js" rel="nofollow noreferrer" target="_blank">完整代码</a></p>
<h3 id="articleHeader9">Images</h3>
<p>应用图片默认的位置是 app/assets 文件夹中的 images，通过相关配置会监听并自动将图片自动映射到 app/public 目录下；</p>
<p>你可以这样引用图片:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// in HTML
<img src=&quot;images/egg_logo.svg&quot; alt=&quot;logo&quot;>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// in HTML</span>
&lt;<span class="hljs-selector-tag">img</span> src=<span class="hljs-string">"images/egg_logo.svg"</span> alt=<span class="hljs-string">"logo"</span>&gt;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// in SCSS
background-image: url(&quot;images/egg_logo.svg&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-comment">// in SCSS</span>
<span class="hljs-built_in">background</span>-<span class="hljs-built_in">image</span>: url(<span class="hljs-string">"images/egg_logo.svg"</span>);</code></pre>
<h3 id="articleHeader10">StyleSheets</h3>
<p>推荐使用 SASS 进行样式编写；CSS 组织按照页面(page)和框架(framework)进行区分自定义的和第三方库的样式，通过 <code>@import</code> 导入到 <code>application.css</code>，目录结构形如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="├── stylesheets
|   ├── page
|   |    ├── homepage.csss
|   |    └── help.scss
|   ├── framework
|   |    ├── bootstrap.csss
|   |    └── button.scss
|   ├── application.scss" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>├── stylesheets
|<span class="hljs-string">   ├── page
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">    ├── homepage.csss
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">    └── help.scss
</span>|<span class="hljs-string">   ├── framework
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">    ├── bootstrap.csss
</span>|<span class="hljs-string">   </span>|<span class="hljs-string">    └── button.scss
</span>|<span class="hljs-string">   ├── application.scss</span></code></pre>
<h3 id="articleHeader11">JavaScript</h3>
<ul>
<li>
<p><strong>应用按照功能模块化进行开发，主要有以下两种约定：</strong></p>
<ul>
<li>Global Module: 挂载在 window 对象</li>
<li>Namespace: 挂载在 app 对象上</li>
</ul>
</li>
<li>
<p><strong>模块化的几种写法：</strong></p>
<ul>
<li>
<p>方式一：挂载到 window 对象</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.ModuleName = (function() {
  function Fn() {
    this.fn1();
  }

  Fn.prototype.fn1 = function() {}

  return Fn
})();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">window</span>.ModuleName = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">Fn</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">this</span>.fn1();
  }

  Fn.prototype.fn1 = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{}

  <span class="hljs-keyword">return</span> Fn
})();</code></pre>
</li>
<li>
<p>方式二：IIFE</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="window.app = window.app || {};
(function(app) {
  app.ModuleName = (function() {
    // your code...
  })();
}).call(window, app);

// or
(function(global) {
  class ModuleName {
    // your code...
  }

  global.ModuleName = ModuleName
})(window.appp || (window.app = {}));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-built_in">window</span>.app = <span class="hljs-built_in">window</span>.app || {};
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">app</span>) </span>{
  app.ModuleName = (<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">// your code...</span>
  })();
}).call(<span class="hljs-built_in">window</span>, app);

<span class="hljs-comment">// or</span>
(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">global</span>) </span>{
  <span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ModuleName</span> </span>{
    <span class="hljs-comment">// your code...</span>
  }

  global.ModuleName = ModuleName
})(<span class="hljs-built_in">window</span>.appp || (<span class="hljs-built_in">window</span>.app = {}));</code></pre>
</li>
<li>
<p>方式三：挂载到 app 对象上</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class ModuleName {
  // your code...
}
window.app = window.app || {};
app.ModuleName = ModuleName;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">class</span> ModuleName {
  <span class="hljs-comment">// your code...</span>
}
<span class="hljs-keyword">window</span>.<span class="hljs-keyword">app</span> = <span class="hljs-keyword">window</span>.<span class="hljs-keyword">app</span> || {};
<span class="hljs-keyword">app</span>.ModuleName = ModuleName;</code></pre>
</li>
<li>
<p>方式四： ES6 Class</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class ModuleName {
  constructor() {}

  fn() {}
}
export default ModuleName" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">ModuleName</span> </span>{
  <span class="hljs-keyword">constructor</span>() {}

  fn() {}
}
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> ModuleName</code></pre>
</li>
<li>方式五： ...</li>
</ul>
</li>
<li><strong>引用方式</strong></li>
</ul>
<p>在应用的 app/assets/javascripts/application.js 文件包含下面几行代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// import stylesheets
import '../stylesheets/application.scss';

// import page scripts
import './home';
import './about';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// import stylesheets</span>
<span class="hljs-meta"><span class="hljs-meta-keyword">import</span> '../stylesheets/application.scss';</span>

<span class="hljs-comment">// import page scripts</span>
<span class="hljs-meta"><span class="hljs-meta-keyword">import</span> './home';</span>
<span class="hljs-meta"><span class="hljs-meta-keyword">import</span> './about';</span></code></pre>
<p>在应用的 app/assets/javascripts/vendors.js 文件包含下面几行代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// import Third-party libraries
import $ from 'jquery';
import _ from 'lodash';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-comment">// import Third-party libraries</span>
<span class="hljs-keyword">import</span> $ <span class="hljs-keyword">from</span> <span class="hljs-string">'jquery'</span>;
<span class="hljs-keyword">import</span> _ <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash'</span>;</code></pre>
<p>在 JavaScript 文件中，主要分为以下几个部分按照从上到下的顺序处理的：</p>
<ul>
<li>引入应用的样式</li>
<li>引入第三方库</li>
<li>引入业务模块</li>
</ul>
<hr>
<h2 id="articleHeader12">Routing</h2>
<p>简单演示约定</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Router from 'koa-router';
import home from '../controller/home';
import about from '../controller/about';

const appRoutes = () => {
  // TODO: 添加前缀会导致静态资源无法加载
  const router = new Router({
    prefix: '/test',
  });

  router
    .get('/', home)
    .get('/about', about);

  return router;
};

export default appRoutes;

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">'koa-router'</span>;
<span class="hljs-keyword">import</span> home <span class="hljs-keyword">from</span> <span class="hljs-string">'../controller/home'</span>;
<span class="hljs-keyword">import</span> about <span class="hljs-keyword">from</span> <span class="hljs-string">'../controller/about'</span>;

<span class="hljs-keyword">const</span> appRoutes = <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> {
  <span class="hljs-comment">// <span class="hljs-doctag">TODO:</span> 添加前缀会导致静态资源无法加载</span>
  <span class="hljs-keyword">const</span> router = <span class="hljs-keyword">new</span> Router({
    <span class="hljs-attr">prefix</span>: <span class="hljs-string">'/test'</span>,
  });

  router
    .get(<span class="hljs-string">'/'</span>, home)
    .get(<span class="hljs-string">'/about'</span>, about);

  <span class="hljs-keyword">return</span> router;
};

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> appRoutes;

</code></pre>
<hr>
<h2 id="articleHeader13">Eslint</h2>
<p>项目遵循 <code>eslint-egg</code> 规则；在开发模式下进行 eslint watching，它可以有效的提示你对应的代码是否符合约定规则。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010503932" src="https://static.alili.tech/img/remote/1460000010503932" alt="eslint watching" title="eslint watching" style="cursor: pointer;"></span></p>
<hr>
<h2 id="articleHeader14">pre-commit</h2>
<p><code>pre-commit</code> 是一个 <code>git</code> 的勾子，它可以确保你在提交代码前需要通过你预设的相关约定；在脚手架中主要用来确保在你提交代码之前必须先通过所有的 <code>Eslint</code> 检查，否则不能提交。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000010503933" src="https://static.alili.tech/img/remote/1460000010503933" alt="pre-commit" title="pre-commit" style="cursor: pointer;"></span></p>
<hr>
<h2 id="articleHeader15">Base configuration</h2>
<ul>
<li>Copy images</li>
<li>Sass compile</li>
<li>Generate html</li>
<li>Expose global</li>
<li>Define plugin</li>
<li>Assets webpack plugin</li>
</ul>
<hr>
<h2 id="articleHeader16">In Development mode</h2>
<ul>
<li>HOT</li>
<li>File watching</li>
<li>Eslint watching</li>
<li>Pre commit</li>
</ul>
<hr>
<h2 id="articleHeader17">In Production mode</h2>
<ul>
<li>Uglify javascript</li>
<li>Extract stylesheets</li>
<li>Extract the common file</li>
<li>Eslint watch</li>
<li>Bundle file analyzer</li>
<li>Static file md5</li>
</ul>
<hr>
<h2 id="articleHeader18">Mount</h2>
<p>需求：如何在一个域名下根据项目名称作为前缀，同时挂载多个 web 应用。</p>
<p>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="根域名：http://www.upchina.com/

A 应用：http://www.upchina.com/A

B 应用：http://www.upchina.com/B

C 应用：http://www.upchina.com/C" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>根域名：<span class="hljs-string">http:</span><span class="hljs-comment">//www.upchina.com/</span>

A 应用：<span class="hljs-string">http:</span><span class="hljs-comment">//www.upchina.com/A</span>

B 应用：<span class="hljs-string">http:</span><span class="hljs-comment">//www.upchina.com/B</span>

C 应用：<span class="hljs-string">http:</span><span class="hljs-comment">//www.upchina.com/C</span></code></pre>
<p>解决方案：通过 Mount 解决，其思想是把整个应用当作一个中间件，在 <code>mount</code> 内修改应用的 <code>path</code>，然后再次创建一个新的应用，将 mount 中间件传递</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Koa from 'koa'
import mount from 'mount'
import router from 'router'

// 传递给 mount 
const a = new Koa()
a.use(router().routes())

// app
const app = new Koa()
app.use(mount('/m', a))

app.listen(3001)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Koa <span class="hljs-keyword">from</span> <span class="hljs-string">'koa'</span>
<span class="hljs-keyword">import</span> mount <span class="hljs-keyword">from</span> <span class="hljs-string">'mount'</span>
<span class="hljs-keyword">import</span> router <span class="hljs-keyword">from</span> <span class="hljs-string">'router'</span>

<span class="hljs-comment">// 传递给 mount </span>
<span class="hljs-keyword">const</span> a = <span class="hljs-keyword">new</span> Koa()
a.use(router().routes())

<span class="hljs-comment">// app</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa()
app.use(mount(<span class="hljs-string">'/m'</span>, a))

app.listen(<span class="hljs-number">3001</span>)</code></pre>
<p><strong>注意</strong></p>
<ul>
<li>使用 Mount 只能用相对路径</li>
<li>可以代理整个应用，也可以只代理某个路由</li>
</ul>
<hr>
<h2 id="articleHeader19">推荐阅读</h2>
<ul>
<li><a href="https://segmentfault.com/a/1190000004883199">为 Koa 框架封装 webpack-dev-middleware 中间件</a></li>
<li><a href="https://segmentfault.com/a/1190000005614604" target="_blank">深入理解 webpack dev middleware 原理與相關 plugins</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
koa2 遇到 webpack 怎么玩

## 原文链接
[https://segmentfault.com/a/1190000010503927](https://segmentfault.com/a/1190000010503927)

