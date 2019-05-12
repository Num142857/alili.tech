---
title: '使用 Vue.js 和 Flask 来构建一个单页的App' 
date: 2018-12-09 2:30:09
hidden: true
slug: stytndigxun
categories: [reprint]
---

{{< raw >}}

                    
<p>在这个教程中，我们将讲解如何将vue.js单页应用与Flask后端进行连接。</p>
<p>一般来说，如果你只是想通过Flask模板使用vue.js库也是没有问题的。但是，实际上是一个很明显的问题那就是，Jinja（模板引擎）也和Vue.js一样采用双大括号用于渲染，但只是一个还算过的去的解决方案。</p>
<p>我想要一个不同的例子。如果我需要建立一个单页应用程序（应用程序使用单页组成，<strong>vue-router</strong>在HTML5的History-mode以及其他更多好用的功能）用vue.js，由Flask提供Web服务？简单地说应该这样，如下所示：</p>
<p>Flask为<strong>index.html</strong>服务，<strong>index.html</strong>包含我的vue.js App。</p>
<p>在前端开发中我使用Webpack，它提供了所有很酷的功能。</p>
<p>Flask有API端，我可以从我的SPA访问。</p>
<p>我可以访问API端，甚至当我为了前端开发而运行Node.js的时候。</p>
<p>听起来是不是很有趣？那让我们这样动手做做吧。</p>
<p>完整的源代码，你可以在这里找到：</p>
<p><a href="https://github.com/oleg-agapov/flask-vue-spa" rel="nofollow noreferrer" target="_blank">https://github.com/oleg-agapo...</a></p>
<h2 id="articleHeader0">客户端</h2>
<p>我将使用Vue CLI产生基本vue.js App。如果你还没有安装它，请运行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm install -g vue-cli" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs avrasm"><code style="word-break: break-word; white-space: initial;">$ npm install -g vue-<span class="hljs-keyword">cli</span></code></pre>
<p>客户端和后端代码将被拆分到不同的文件夹。初始化前端部分运行跟踪：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ mkdir flaskvue
$ cd flaskvue
$ vue init webpack frontend" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-variable">$ </span>mkdir flaskvue
<span class="hljs-variable">$ </span>cd flaskvue
<span class="hljs-variable">$ </span>vue init webpack frontend</code></pre>
<p>通过安装向导。我的设置是：</p>
<ol>
<li>Vue 只在运行时构建。 </li>
<li>安装Vue-router。</li>
<li>使用ESLint检查代码。</li>
<li>选择一个ESLint 标准预设 。</li>
<li>不试用Karma + Mocha进行单位测试。</li>
<li>不使用Nightwatch建立端到端的测试。</li>
</ol>
<p>ok，接着来：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ cd frontend
$ npm install
# after installation
$ npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-variable">$ </span>cd frontend
<span class="hljs-variable">$ </span>npm install
<span class="hljs-comment"># after installation</span>
<span class="hljs-variable">$ </span>npm run dev</code></pre>
<p>这就可以开始安装<strong>vue.js</strong>应用程序。让我们从添加一些页面开始吧。</p>
<p>添加<strong>home.vue</strong>和<strong>about.vue</strong>到<strong>frontend/src/components</strong>文件夹。它们非常简单，像这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// Home.vue

<template>
<div>
<p>Home page</p>
</div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-comment">// Home.vue</span>

<span class="hljs-params">&lt;template&gt;</span>
<span class="hljs-params">&lt;div&gt;</span>
<span class="hljs-params">&lt;p&gt;</span>Home page<span class="hljs-params">&lt;/p&gt;</span>
<span class="hljs-params">&lt;/div&gt;</span>
<span class="hljs-params">&lt;/template&gt;</span></code></pre>
<p>and</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// About.vue

<template>
<div>
<p>About</p>
</div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-comment">// About.vue</span>

<span class="hljs-params">&lt;template&gt;</span>
<span class="hljs-params">&lt;div&gt;</span>
<span class="hljs-params">&lt;p&gt;</span>About<span class="hljs-params">&lt;/p&gt;</span>
<span class="hljs-params">&lt;/div&gt;</span>
<span class="hljs-params">&lt;/template&gt;</span></code></pre>
<p>我们将使用它们正确地识别我们当前的位置（根据地址栏）。现在我们需要改变<strong>frontend/src/router/index.js</strong>文件以便使用我们的新组件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import Vue from 'vue'
import Router from 'vue-router'
const routerOptions = [
{ path: '/', component: 'Home' },
{ path: '/about', component: 'About' }
]

const routes = routerOptions.map(route => {
return {
...route,
component: () => import(`@/components/${route.component}.vue`)
}

})

Vue.use(Router)
export default new Router({
routes,
mode: 'history'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> Vue <span class="hljs-keyword">from</span> <span class="hljs-string">'vue'</span>
<span class="hljs-keyword">import</span> Router <span class="hljs-keyword">from</span> <span class="hljs-string">'vue-router'</span>
<span class="hljs-keyword">const</span> routerOptions = [
{ <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>, <span class="hljs-attr">component</span>: <span class="hljs-string">'Home'</span> },
{ <span class="hljs-attr">path</span>: <span class="hljs-string">'/about'</span>, <span class="hljs-attr">component</span>: <span class="hljs-string">'About'</span> }
]

<span class="hljs-keyword">const</span> routes = routerOptions.map(<span class="hljs-function"><span class="hljs-params">route</span> =&gt;</span> {
<span class="hljs-keyword">return</span> {
...route,
<span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-params">()</span> =&gt;</span> <span class="hljs-keyword">import</span>(<span class="hljs-string">`@/components/<span class="hljs-subst">${route.component}</span>.vue`</span>)
}

})

Vue.use(Router)
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({
routes,
<span class="hljs-attr">mode</span>: <span class="hljs-string">'history'</span>
})</code></pre>
<p>如果你试着输入<strong>localhost:8080</strong> 和 <strong>localhost:8080/about</strong>，你应该看到相应的页面。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013862871?w=1000&amp;h=624" src="https://static.alili.tech/img/remote/1460000013862871?w=1000&amp;h=624" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p>我们几乎已经准备好构建一个项目，并且能够创建一个静态资源文件包。在此之前，让我们为它们重新定义一下输出目录。在<strong>frontend/config/index.js</strong>找到下一个设置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="index: path.resolve(__dirname, '../dist/index.html'),
assetsRoot: path.resolve(__dirname, '../dist')," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code><span class="hljs-built_in">index</span>: path.<span class="hljs-built_in">resolve</span>(__dirname, <span class="hljs-string">'../dist/index.html'</span>),
assetsRoo<span class="hljs-variable">t:</span> path.<span class="hljs-built_in">resolve</span>(__dirname, <span class="hljs-string">'../dist'</span>),</code></pre>
<p>把它们改为</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="index: path.resolve(__dirname, '../../dist/index.html'),
assetsRoot: path.resolve(__dirname, '../../dist')," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code><span class="hljs-built_in">index</span>: path.<span class="hljs-built_in">resolve</span>(__dirname, <span class="hljs-string">'../../dist/index.html'</span>),
assetsRoo<span class="hljs-variable">t:</span> path.<span class="hljs-built_in">resolve</span>(__dirname, <span class="hljs-string">'../../dist'</span>),</code></pre>
<p>所以/dist文件夹的HTML、CSS、JS会在同一级目录/frontend 。现在你可以运行 <strong>$ npm run build</strong> 创建一个包。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013862872?w=1000&amp;h=647" src="https://static.alili.tech/img/remote/1460000013862872?w=1000&amp;h=647" alt="" title="" style="cursor: pointer;"></span></p>
<h2 id="articleHeader1">后端</h2>
<p>对于Flask服务器，我将使用Python版本3.6。在 <strong>/flaskvue</strong>创建新的子文件夹存放后端代码并初始化虚拟环境：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ mkdir backend
$ cd backend
$ virtualenv -p python3 venv" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code><span class="hljs-variable">$ </span>mkdir backend
<span class="hljs-variable">$ </span>cd backend
<span class="hljs-variable">$ </span>virtualenv -p python3 venv</code></pre>
<p>为了使虚拟环境中运行（MacOS）：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ source venv/bin/activate" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code style="word-break: break-word; white-space: initial;">$ <span class="hljs-keyword">source</span> venv<span class="hljs-regexp">/bin/</span>activate</code></pre>
<p>在Windows中需要激活此文档（<a href="http://pymote.readthedocs.io/en/latest/install/windows_virtualenv.html" rel="nofollow noreferrer" target="_blank">http://pymote.readthedocs.io/...</a>）。</p>
<p>在虚拟环境下安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(venv) pip install Flask" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code style="word-break: break-word; white-space: initial;">(<span class="hljs-name">venv</span>) pip install Flask</code></pre>
<p>现在让我们为Flask服务端编写代码。创建根目录文件run.py：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(venv) cd ..
(venv) touch run.py" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>(venv) cd ..
(venv) touch <span class="hljs-keyword">run</span>.<span class="bash">py</span></code></pre>
<p>向这个文件添加下一个代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="from flask import Flask, render_template
app = Flask(__name__,
static_folder = &quot;./dist/static&quot;,
template_folder = &quot;./dist&quot;)

@app.route('/')
def index():
return render_template(&quot;index.html&quot;)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs python"><code><span class="hljs-keyword">from</span> flask <span class="hljs-keyword">import</span> Flask, render_template
app = Flask(__name__,
static_folder = <span class="hljs-string">"./dist/static"</span>,
template_folder = <span class="hljs-string">"./dist"</span>)

<span class="hljs-meta">@app.route('/')</span>
<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">index</span><span class="hljs-params">()</span>:</span>
<span class="hljs-keyword">return</span> render_template(<span class="hljs-string">"index.html"</span>)</code></pre>
<p>这段代码与Flask的 <strong>“Hello World”</strong>代码略有不同。主要的区别是，我们指定存储静态文件和模板位置在文件夹 <strong>/dist</strong>，以便和我们的前端文件夹区别开。在根文件夹中运行Flask服务端：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(venv) FLASK_APP=run.py FLASK_DEBUG=1 flask run" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">(venv) FLASK_APP=<span class="hljs-built_in">run</span>.py FLASK_DEBUG=<span class="hljs-number">1</span> flask <span class="hljs-built_in">run</span></code></pre>
<p>这将启动本地主机上的Web服务器：<strong>localhost:5000</strong> 上的<strong>FLASK_APP</strong>服务器端的启动文件，<strong>flask_debug = 1</strong>将运行在调试模式。如果一切正确，你会看到熟悉的主页，你已经完成了对Vue的设置。</p>
<p>同时，如果您尝试输入/about页面，您将面临一个错误。Flask抛出一个错误，说找不到请求的URL。事实上，因为我们使用了HTML5的History-Mode在Vue-router需要配置Web服务器的重定向，将所有路径指向index.html。用Flask做起来很容易。将现有路由修改为以下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):
return render_template(&quot;index.html&quot;)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-variable">@app</span>.route(<span class="hljs-string">'/'</span>, defaults={<span class="hljs-string">'path'</span>: <span class="hljs-string">''</span>})
<span class="hljs-variable">@app</span>.route(<span class="hljs-string">'/&lt;path:path&gt;'</span>)
def catch_all(path):
return render_template(<span class="hljs-string">"index.html"</span>)</code></pre>
<p>现在输入网址localhost:5000/about 将重新定向到index.html和vue-router将处理路由。</p>
<h2 id="articleHeader2">添加404页</h2>
<p>因为我们有一个包罗万象的路径，我们的Web服务器在现在已经很难赶上404错误，Flask将所有请求指向index.html（甚至不存在的页面）。所以我们需要处理未知的路径在vue.js应用。当然，所有的工作都可以在我们的路由文件中完成。</p>
<p>在frontend/src/router/index.js添加下一行：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const routerOptions = [
{ path: '/', component: 'Home' },
{ path: '/about', component: 'About' },
{ path: '*', component: 'NotFound' }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>const routerOptions = [
{ <span class="hljs-string">path:</span> <span class="hljs-string">'/'</span>, <span class="hljs-string">component:</span> <span class="hljs-string">'Home'</span> },
{ <span class="hljs-string">path:</span> <span class="hljs-string">'/about'</span>, <span class="hljs-string">component:</span> <span class="hljs-string">'About'</span> },
{ <span class="hljs-string">path:</span> <span class="hljs-string">'*'</span>, <span class="hljs-string">component:</span> <span class="hljs-string">'NotFound'</span> }
]</code></pre>
<p>这里的路径'*'是一个通配符，<br><strong>Vue-router</strong>就知道除了我们上面定义的所有其他任何路径。现在我们需要更多的创造<strong>NotFound.vue</strong>文件在<strong>/components</strong>目录。试一下很简单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// NotFound.vue

<template>
<div>
<p>404 - Not Found</p>
</div>
</template>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-comment">// NotFound.vue</span>

<span class="hljs-params">&lt;template&gt;</span>
<span class="hljs-params">&lt;div&gt;</span>
<span class="hljs-params">&lt;p&gt;</span><span class="hljs-number">404</span> - Not Found<span class="hljs-params">&lt;/p&gt;</span>
<span class="hljs-params">&lt;/div&gt;</span>
<span class="hljs-params">&lt;/template&gt;</span></code></pre>
<p>现在运行的前端服务器再次<strong>npm run dev</strong>，尝试进入一些毫无意义的地址例如：<strong>localhost:8080/gljhewrgoh</strong>。您应该看到我们的“未找到”消息。</p>
<h2 id="articleHeader3">添加API端</h2>
<p>我们的<strong>vue.js/flask</strong>教程的最后一个例子将是服务器端API创建和调度客户端。我们将创建一个简单的Api，它将从1到100返回一个随机数。</p>
<p>打开run.py并添加：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="from flask import Flask, render_template, jsonify
from random import *

app = Flask(__name__,
static_folder = &quot;./dist/static&quot;,
template_folder = &quot;./dist&quot;)

@app.route('/api/random')

def random_number():
response = {
'randomNumber': randint(1, 100)
}
return jsonify(response)

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):

return render_template(&quot;index.html&quot;)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ruby"><code>from flask import Flask, render_template, jsonify
from random import *

app = Flask(__name_<span class="hljs-number">_</span>,
static_folder = <span class="hljs-string">"./dist/static"</span>,
template_folder = <span class="hljs-string">"./dist"</span>)

@app.route(<span class="hljs-string">'/api/random'</span>)

<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">random_number</span><span class="hljs-params">()</span></span>:
response = {
<span class="hljs-string">'randomNumber'</span>: randint(<span class="hljs-number">1</span>, <span class="hljs-number">100</span>)
}
<span class="hljs-keyword">return</span> jsonify(response)

@app.route(<span class="hljs-string">'/'</span>, defaults={<span class="hljs-string">'path'</span>: <span class="hljs-string">''</span>})
@app.route(<span class="hljs-string">'/&lt;path:path&gt;'</span>)
<span class="hljs-function"><span class="hljs-keyword">def</span> <span class="hljs-title">catch_all</span><span class="hljs-params">(path)</span></span>:

<span class="hljs-keyword">return</span> render_template(<span class="hljs-string">"index.html"</span>)</code></pre>
<p>首先我导入random库和jsonify函数从Flask库中。然后我添加了新的路由 <strong>/api/random</strong>来返回像这样的JSON：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
&quot;randomNumber&quot;: 36
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>{
<span class="hljs-attr">"randomNumber"</span>: <span class="hljs-number">36</span>
}</code></pre>
<p>你可以通过本地浏览测试这个路径：<strong>localhost:5000/api/random。</strong></p>
<p>此时服务器端工作已经完成。是时候在客户端显示了。我们来改变home.vue组件显示随机数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<template>
<div>
<p>Home page</p>
<p>Random number from backend: "{{" randomNumber "}}"</p>
<button @click=&quot;getRandom&quot;>New random number</button>
</div>

</template>
<script>
export default {
data () {
return {
randomNumber: 0
}
},

methods: {
getRandomInt (min, max) {
min = Math.ceil(min)
max = Math.floor(max)
return Math.floor(Math.random() * (max - min + 1)) + min
},

getRandom () {
this.randomNumber = this.getRandomInt(1, 100)
}
},

created () {
this.getRandom()
}

}

</script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs django"><code><span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Home page<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Random number from backend: </span><span class="hljs-template-variable">"{{" randomNumber "}}"</span><span class="xml"><span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">button</span> @<span class="hljs-attr">click</span>=<span class="hljs-string">"getRandom"</span>&gt;</span>New random number<span class="hljs-tag">&lt;/<span class="hljs-name">button</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>

<span class="hljs-tag">&lt;/<span class="hljs-name">template</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="javascript">
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
data () {
<span class="hljs-keyword">return</span> {
<span class="hljs-attr">randomNumber</span>: <span class="hljs-number">0</span>
}
},

<span class="hljs-attr">methods</span>: {
getRandomInt (min, max) {
min = <span class="hljs-built_in">Math</span>.ceil(min)
max = <span class="hljs-built_in">Math</span>.floor(max)
<span class="hljs-keyword">return</span> <span class="hljs-built_in">Math</span>.floor(<span class="hljs-built_in">Math</span>.random() * (max - min + <span class="hljs-number">1</span>)) + min
},

getRandom () {
<span class="hljs-keyword">this</span>.randomNumber = <span class="hljs-keyword">this</span>.getRandomInt(<span class="hljs-number">1</span>, <span class="hljs-number">100</span>)
}
},

created () {
<span class="hljs-keyword">this</span>.getRandom()
}

}

</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></span></code></pre>
<p>在这个阶段，我们只是模仿客户端的随机数生成过程。所以，这个组件就是这样工作的：</p>
<ol>
<li>在初始化变量 <strong>randomNumber</strong>等于0。</li>
<li>在methods部分我们通过<strong>getRandomInt(min, max)</strong>功能来从指定的范围内返回一个随机数，<strong>getrandom</strong>函数将生成随机数并将赋值给<strong>randomNumber</strong>
</li>
<li>组件方法<strong>getrandom</strong>创建后将会被调用来初始化随机数</li>
<li>在按钮的单击事件我们将用<strong>getrandom</strong>方法得到新的随机数</li>
</ol>
<p>现在在主页上，你应该看到前端显示我们产生的随机数。让我们把它连接到后端。</p>
<p>为此目的，我将用<strong>axios</strong>库。它允许我们用响应HTTP请求并用<strong>Json</strong>返回<strong>JavaScript Promise</strong>。我们安装下它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(venv) cd frontend
(venv) npm install --save axios" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code>(<span class="hljs-name">venv</span>) cd frontend
(<span class="hljs-name">venv</span>) npm install --save axios</code></pre>
<p>打开 <strong>home.vue</strong> 再在 <strong>&lt;script&gt;</strong> 部分添加一些变化：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import axios from 'axios'
methods: {
getRandom () {
// this.randomNumber = this.getRandomInt(1, 100)
this.randomNumber = this.getRandomFromBackend()
},

getRandomFromBackend () {
const path = `http://localhost:5000/api/random`
axios.get(path)
.then(response => {
this.randomNumber = response.data.randomNumber
})
.catch(error => {
console.log(error)
})

}

}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">import</span> axios <span class="hljs-keyword">from</span> <span class="hljs-string">'axios'</span>
methods: {
getRandom () {
<span class="hljs-comment">// this.randomNumber = this.getRandomInt(1, 100)</span>
<span class="hljs-keyword">this</span>.randomNumber = <span class="hljs-keyword">this</span>.getRandomFromBackend()
},

getRandomFromBackend () {
<span class="hljs-keyword">const</span> path = <span class="hljs-string">`http://localhost:5000/api/random`</span>
axios.get(path)
.then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
<span class="hljs-keyword">this</span>.randomNumber = response.data.randomNumber
})
.catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
<span class="hljs-built_in">console</span>.log(error)
})

}

}</code></pre>
<p>在顶部，我们需要引用Axios库。然后有一个新的方法<strong>getrandomfrombackend</strong>将使用Axios异步调用API和检索结果。最后，<strong>getrandom</strong>方法现在应该使用<strong>getrandomfrombackend</strong>函数得到一个随机值。</p>
<p>保存文件，到浏览器，运行一个开发服务器再次刷新 <strong>localhost:8080</strong>。你应该看到控制台错误没有随机值。但别担心，一切都正常。我们得到了<strong>CORS</strong>的错误意味着Flask服务器API默认会关闭其他Web服务器（在我们这里，vue.js App是在 Node.js服务器上运行的应用程序）。如果你<strong>npm run build</strong> 项目，那在<strong>localhost:5000</strong>（如Flask服务器）你会看到App在工作的。但是，每次对客户端应用程序进行一些更改时，都创建一个包并不十分方便。</p>
<p>让我们用打包了CORS插件的Flask，将使我们能够创建一个API访问规则。插件叫做FlaskCORS，让我们安装它：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="(venv) pip install -U flask-cors" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lisp"><code style="word-break: break-word; white-space: initial;">(<span class="hljs-name">venv</span>) pip install -U flask-cors</code></pre>
<p>你可以阅读文档，更好的解释你要使你的服务器怎么样使用CORS。我将使用特定的方法，并将<strong>{“origins”: “<em>”}</em></strong>应用于所有/api/路由（这样每个人都可以使用我的API端）。在run.py加上：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="from flask_cors import CORS
app = Flask(__name__,
static_folder = &quot;./dist/static&quot;,
template_folder = &quot;./dist&quot;)
cors = CORS(app, resources={r&quot;/api/*&quot;: {&quot;origins&quot;: &quot;*&quot;"}}")" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs python"><code><span class="hljs-keyword">from</span> flask_cors <span class="hljs-keyword">import</span> CORS
app = Flask(__name__,
static_folder = <span class="hljs-string">"./dist/static"</span>,
template_folder = <span class="hljs-string">"./dist"</span>)
cors = CORS(app, resources={<span class="hljs-string">r"/api/*"</span>: {<span class="hljs-string">"origins"</span>: <span class="hljs-string">"*"</span>"}}")</code></pre>
<p>有了这种改变，您就可以从前端调用服务端。</p>
<p>更新:</p>
<p>事实上，如果你想通过Flask提供静态文件不需要CORS。感谢Carson Gee的下面的这一招。</p>
<p>这个主意是这样的。如果应用程序在调试模式下，它只会代理我们的前端服务器。否则（在生产中）只为静态文件服务。所以我们这样做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import requests
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def catch_all(path):

if app.debug:

return requests.get('http://localhost:8080/{}'.format(path)).text

return render_template(&quot;index.html&quot;)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs kotlin"><code><span class="hljs-keyword">import</span> requests
<span class="hljs-meta">@app</span>.route(<span class="hljs-string">'/'</span>, defaults={<span class="hljs-string">'path'</span>: <span class="hljs-string">''</span>})
<span class="hljs-meta">@app</span>.route(<span class="hljs-string">'/&lt;path:path&gt;'</span>)
def catch_all(path):

<span class="hljs-keyword">if</span> app.debug:

<span class="hljs-keyword">return</span> requests.<span class="hljs-keyword">get</span>(<span class="hljs-string">'http://localhost:8080/{}'</span>.format(path)).text

<span class="hljs-keyword">return</span> render_template(<span class="hljs-string">"index.html"</span>)</code></pre>
<p>很优雅的魔法✨！</p>
<p>现在有了一个完整的全栈<strong>（full-stack）</strong>应用程序，用您最喜爱<strong>Vue.js</strong>和<strong>Flask</strong>技术构建。</p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013862873?w=1000&amp;h=1086" src="https://static.alili.tech/img/remote/1460000013862873?w=1000&amp;h=1086" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000013862874?w=1000&amp;h=1086" src="https://static.alili.tech/img/remote/1460000013862874?w=1000&amp;h=1086" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader4">后记</h2>
<p>最后，我想就如何改进这个解决方案谈几句话。</p>
<p>首先利用CORS，如果你想让你的API端访问外部的服务器。否则的话只需要使用代理服务器与前端开发技巧。</p>
<p>另一个改进是避免客户端硬编码API路由。也许你需要考虑一些API端点的字典。因此，当您更改API路由时，只需刷新一个字典即可。前端仍然有一个有效的端点。</p>
<p>通常在开发过程中，你将至少有2个终端窗口：一个是Flask和另一个是vue.js。在生产中可以摆脱Vue而只单独运行Node.js服务器。</p>
<p>源代码：<a href="https://github.com/oleg-agapov/flask-vue-spa" rel="nofollow noreferrer" target="_blank">https://github.com/oleg-agapo...</a></p>
<p>谢谢你的阅读！</p>
<p>分享一个Vue.js 2 的入门级全家桶系列教程：</p>
<ol>
<li>vue.js 2 入门与提高: <a href="http://xc.hubwiz.com/course/592ee9b2b343f27b0ae1ba99?affid=20180320sf" rel="nofollow noreferrer" target="_blank">http://xc.hubwiz.com/course/vue.js</a>
</li>
<li>vuex 2 入门与提高: <a href="http://xc.hubwiz.com/course/597d463fff52d0da7e3e397a?affid=20180320sf" rel="nofollow noreferrer" target="_blank">http://xc.hubwiz.com/course/vuex</a>
</li>
<li>vue-router 2 入门与提高: <a href="http://xc.hubwiz.com/course/5983d3aeff52d0da7e3e3d50?affid=20180320sf" rel="nofollow noreferrer" target="_blank">http://xc.hubwiz.com/course/vuerouter</a>
</li>
<li>vue.js 2 工程化实践: <a href="http://xc.hubwiz.com/course/598bad66c7fd1d49453979c9?affid=20180320sf" rel="nofollow noreferrer" target="_blank">http://xc.hubwiz.com/course/vuegch</a>
</li>
</ol>
<p>另外推荐一个flask的入门教程：</p>
<p><a href="http://xc.hubwiz.com/course/562427361bc20c980538e26f?affid=20180316sf" rel="nofollow noreferrer" target="_blank">深入浅出 flask  http://xc.hubwiz.com/course/562427361bc20c980538e26f</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
使用 Vue.js 和 Flask 来构建一个单页的App

## 原文链接
[https://segmentfault.com/a/1190000013862866](https://segmentfault.com/a/1190000013862866)

