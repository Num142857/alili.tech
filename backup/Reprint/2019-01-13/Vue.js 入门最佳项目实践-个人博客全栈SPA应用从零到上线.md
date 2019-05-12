---
title: 'Vue.js 入门最佳项目实践-个人博客全栈SPA应用从零到上线' 
date: 2019-01-13 2:30:11
hidden: true
slug: dku162y1zjt
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">项目简介 <a href="http://nickj.leanapp.cn/" rel="nofollow noreferrer" target="_blank">在线预览</a>
</h2>
<p><a href="https://github.com/Nicksapp/ohmo-vue/blob/master/%E5%BC%80%E5%8F%91%E6%8C%87%E5%8D%97.md" rel="nofollow noreferrer" target="_blank">开发指南-快速上手</a> </p>
<p>这是一个完全由 Vue 全家桶来实现的轻博客应用，充分应用了Vuex对所有状态数据进行管理并优化整体结构，后端应用Node.js开发的全栈应用，在业余时间持续在GitHub上迭代版本并不断完善功能，由LeanCloud提供数据存储服务(云服务)。</p>
<p><a href="https://github.com/Nicksapp/ohmo-vue" rel="nofollow noreferrer" target="_blank">项目源代码</a></p>
<h3 id="articleHeader1">Version 4.0</h3>
<blockquote>完整4.0版本，本次更新及优化点主要新增管理员权限，增加了登录功能，现在只有管理员才能发布文章了，为后期后台管理开发做铺垫.<br>增加了分页的功能，对 api 做了新改动，现在每页将显示10篇最新的文章.<br>markdown 采用 Github 样式渲染，再也不用担心页面样式被嫌弃了！<br>修复若干前期遗留问题。。</blockquote>
<h3 id="articleHeader2">Version 3.0</h3>
<blockquote>初步完整3.0版本，完善前端PC端与移动端样式，包括全站响应式设计，以及文章markdown文章渲染，代码HightLight等，增加评论与回复功能，完善自建api，文章发布于优雅的Markdown编辑器。</blockquote>
<h2 id="articleHeader3">技术栈</h2>
<p><strong>前端</strong></p>
<ul>
<li>Vue.js 2.0</li>
<li>Vuex 状态管理</li>
<li>Vue-router 前端路由</li>
<li>Axios 网络请求</li>
<li>fastclick 解决移动端延迟问题</li>
<li>Element-UI</li>
</ul>
<p><strong>后端</strong></p>
<ul>
<li>Node.js 服务端</li>
<li>Express 应用框架</li>
<li>LeanCloud 数据存储</li>
</ul>
<p><strong>组件</strong></p>
<ul>
<li>[x] Markdown渲染</li>
<li>[x] 响应式页面</li>
<li>[x] 文章评论/回复</li>
<li>[x] 标签分类</li>
<li>[x] 悬浮导航</li>
<li>[x] 文章发布</li>
<li>[x] RESTful API接口</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="文件整体结构
.
├── public          // LeanEngine Web 前端发布目录，HTML\CSS\JavaScript 构建后将放置于此
├── server-modules  // 服务器端代码模块目录
│    ├── modules    // 后台数据模块        
│    ├── app            // LeanEngine 服务端代码主入口
│    ├── api            // API 接口路由配置
│    └── tool            // 工具方法
├── front-end            // Web 前端项目目录
│    ├── build          // 前端开发环境
│    ├── config         // 配置文件
│    └── src            // 源码目录
└── server       // LeanEngine 的环境配置" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">文件整体结构
.
├── public          <span class="hljs-comment">// LeanEngine Web 前端发布目录，HTML\CSS\JavaScript 构建后将放置于此</span>
├── server-modules  <span class="hljs-comment">// 服务器端代码模块目录</span>
│    ├── modules    <span class="hljs-comment">// 后台数据模块        </span>
│    ├── app            <span class="hljs-comment">// LeanEngine 服务端代码主入口</span>
│    ├── api            <span class="hljs-comment">// API 接口路由配置</span>
│    └── tool            <span class="hljs-comment">// 工具方法</span>
├── front-end            <span class="hljs-comment">// Web 前端项目目录</span>
│    ├── build          <span class="hljs-comment">// 前端开发环境</span>
│    ├── config         <span class="hljs-comment">// 配置文件</span>
│    └── src            <span class="hljs-comment">// 源码目录</span>
└── server       <span class="hljs-comment">// LeanEngine 的环境配置</span></code></pre>
<h2 id="articleHeader4">版本迭代</h2>
<p><strong>Version 1.0</strong> - 初始化1.0版本，仅完成前后端api连接过程，发布和样式还未完成</p>
<p><strong>Version 2.0</strong> - 初步完整2.0版本，完善前端PC端与移动端样式，包括全站响应式设计，以及文章markdown文章渲染，代码HightLight等，增加评论与回复功能。</p>
<p><strong>Version 3.0</strong> - 增加Post发布文章功能，借用Vue数据双向绑定的特点实时显示Markdown编辑后的效果。下个版本将继续完善发布功能，并添加已有文章的管理功能。</p>
<p><strong>Version 4.0</strong> - 完整4.0版本，本次更新及优化点主要新增管理员权限,分页,Github 样式渲染,修复若干前期遗留问题。。</p>
<h2 id="articleHeader5">开发</h2>
<blockquote>项目中充分结合了LeanCloud的优势，可也让我们快速的利用JavaScript构建出可以在线应用的Web应用，主要内容可参考源代码，下面简单讲解一下每个开发中注意的点。</blockquote>
<h3 id="articleHeader6">LeanCloud 配置</h3>
<p>推荐用<code>Vue-Cli</code>初始化项目后，<code>npm i leanengine</code> 安装LeanCloud核心依赖，之后只要在项目根目录下<code>touch server.js</code>,主要操作详见[LeanCloud官方文档]()</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict';
var AV = require('leanengine');
AV.init({
  appId: process.env.LEANCLOUD_APP_ID,
  appKey: process.env.LEANCLOUD_APP_KEY,
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY
});
var app = require('./server-modules/app');
// 端口一定要从环境变量 `LEANCLOUD_APP_PORT` 中获取。
// LeanEngine 运行时会分配端口并赋值到该变量。
var PORT = parseInt(process.env.LEANCLOUD_APP_PORT || 3000);
app.listen(PORT, function () {
  console.log('Node app is running, port:', PORT);
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-meta">'use strict'</span>;
<span class="hljs-keyword">var</span> AV = <span class="hljs-built_in">require</span>(<span class="hljs-string">'leanengine'</span>);
AV.init({
  <span class="hljs-attr">appId</span>: process.env.LEANCLOUD_APP_ID,
  <span class="hljs-attr">appKey</span>: process.env.LEANCLOUD_APP_KEY,
  <span class="hljs-attr">masterKey</span>: process.env.LEANCLOUD_APP_MASTER_KEY
});
<span class="hljs-keyword">var</span> app = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./server-modules/app'</span>);
<span class="hljs-comment">// 端口一定要从环境变量 `LEANCLOUD_APP_PORT` 中获取。</span>
<span class="hljs-comment">// LeanEngine 运行时会分配端口并赋值到该变量。</span>
<span class="hljs-keyword">var</span> PORT = <span class="hljs-built_in">parseInt</span>(process.env.LEANCLOUD_APP_PORT || <span class="hljs-number">3000</span>);
app.listen(PORT, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Node app is running, port:'</span>, PORT);
  });
});</code></pre>
<h3 id="articleHeader7">部署上线</h3>
<p>安装leancloud部署工具<code>brew install lean-cli</code> ，具体见<a href="https://leancloud.cn/docs/leanengine_cli.html" rel="nofollow noreferrer" target="_blank">LeanCloud网站托管</a></p>
<h3 id="articleHeader8">后台Api搭建</h3>
<p>有了数据存储的支持，就可以直接发挥<code>Express</code>的作用，定义文章等模块的数据模型并定义数据接口。可以用<code>lean up </code>启动后端Node.js服务器，开启接口。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const router = require('express').Router();
// 添加路由模块
const content = require('./modules/content'); // 博客数据模型
// 路由设置
router.get('/content-list', content.contentList); // GET博客列表
router.get('/article/:id', content.article);// GET博客详情
router.post('/article/submitArticle', content.submitArticle);// POST发布博客" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> router = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>).Router();
<span class="hljs-comment">// 添加路由模块</span>
<span class="hljs-keyword">const</span> content = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./modules/content'</span>); <span class="hljs-comment">// 博客数据模型</span>
<span class="hljs-comment">// 路由设置</span>
router.get(<span class="hljs-string">'/content-list'</span>, content.contentList); <span class="hljs-comment">// GET博客列表</span>
router.get(<span class="hljs-string">'/article/:id'</span>, content.article);<span class="hljs-comment">// GET博客详情</span>
router.post(<span class="hljs-string">'/article/submitArticle'</span>, content.submitArticle);<span class="hljs-comment">// POST发布博客</span></code></pre>
<h3 id="articleHeader9">Vuex</h3>
<p>明确各个需管理的数据模块，定义各自的<code>state</code>与<code>mutations</code>，前端与后端的交互动作由<code>actions</code>处理，之后可在各个页面<code>dispatch</code>我们的数据。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// vuex/store.js
export default new Vuex.Store({
  strict: debug,
  actions,
  modules: {
    contentList,
    article,
    commentsList,
    tags,
    tagContentList
  }
})
// vuex/actions.js
getContentList ({ commit }) {
    commit(types.REQUEST_CONTENT_LIST)
    axios.get(API_ROOT + 'api/content-list')
      .then(response => {
        commit(types.GET_CONTENT_LIST, response.data)
        console.log('getContentList success');
      })
      .catch(error => {
        commit(types.GET_CONTENT_LIST_FAILURE, error)
      })
  }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// vuex/store.js</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Vuex.Store({
  <span class="hljs-attr">strict</span>: debug,
  actions,
  <span class="hljs-attr">modules</span>: {
    contentList,
    article,
    commentsList,
    tags,
    tagContentList
  }
})
<span class="hljs-comment">// vuex/actions.js</span>
getContentList ({ commit }) {
    commit(types.REQUEST_CONTENT_LIST)
    axios.get(API_ROOT + <span class="hljs-string">'api/content-list'</span>)
      .then(<span class="hljs-function"><span class="hljs-params">response</span> =&gt;</span> {
        commit(types.GET_CONTENT_LIST, response.data)
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'getContentList success'</span>);
      })
      .catch(<span class="hljs-function"><span class="hljs-params">error</span> =&gt;</span> {
        commit(types.GET_CONTENT_LIST_FAILURE, error)
      })
  }</code></pre>
<h3 id="articleHeader10">Vue-Router</h3>
<p>定义前端路由，优化页面跳转速度。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'Index',
        component: function(resolve) {
            require(['@/views/Index'], resolve)
        }
    }, {
        path: '/article/:id',
        name: 'article',
        component: function(resolve) {
            require(['@/views/Article'], resolve)
        }
    }
    }],
    scrollBehavior(to, from, savedPosition) {
        // 路由切换时滚动到顶部
        if (savedPosition) {
            return savedPosition
        } else {
            return {  y: 0 }
        }
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-keyword">new</span> Router({
    <span class="hljs-attr">mode</span>: <span class="hljs-string">'history'</span>,
    <span class="hljs-attr">routes</span>: [{
        <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">'Index'</span>,
        <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{
            <span class="hljs-built_in">require</span>([<span class="hljs-string">'@/views/Index'</span>], resolve)
        }
    }, {
        <span class="hljs-attr">path</span>: <span class="hljs-string">'/article/:id'</span>,
        <span class="hljs-attr">name</span>: <span class="hljs-string">'article'</span>,
        <span class="hljs-attr">component</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">resolve</span>) </span>{
            <span class="hljs-built_in">require</span>([<span class="hljs-string">'@/views/Article'</span>], resolve)
        }
    }
    }],
    scrollBehavior(to, <span class="hljs-keyword">from</span>, savedPosition) {
        <span class="hljs-comment">// 路由切换时滚动到顶部</span>
        <span class="hljs-keyword">if</span> (savedPosition) {
            <span class="hljs-keyword">return</span> savedPosition
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">return</span> {  <span class="hljs-attr">y</span>: <span class="hljs-number">0</span> }
        }
    }
})</code></pre>
<h3 id="articleHeader11">FastClick</h3>
<p>消除移动端上的双击延时</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="fastClick.attach(document.body) // 消除移动端双击延时" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">fastClick.attach(<span class="hljs-built_in">document</span>.body) <span class="hljs-comment">// 消除移动端双击延时</span></code></pre>
<h2 id="articleHeader12">运行截图</h2>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012158321?w=2048&amp;h=1173" src="https://static.alili.tech/img/remote/1460000012158321?w=2048&amp;h=1173" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012158322?w=2048&amp;h=1175" src="https://static.alili.tech/img/remote/1460000012158322?w=2048&amp;h=1175" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012158323?w=2048&amp;h=1175" src="https://static.alili.tech/img/remote/1460000012158323?w=2048&amp;h=1175" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/remote/1460000012158324?w=2048&amp;h=1175" src="https://static.alili.tech/img/remote/1460000012158324?w=2048&amp;h=1175" alt="" title="" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader13">本地预览步骤</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// clone 项目源代码
$ git clone xxxxxxxxxxxxxxx

// 安装服务端相关依赖
$ cd ohmo
$ npm install

// 启动服务端,默认地址 http://localhost:3000(需要提前注册一个leancloud账号)
$ lean up

// 安装前端相关依赖
$ cd front-end
$ npm install

// 启动前端项目,默认地址 http://localhost:8080
$ npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// clone 项目源代码</span>
$ git clone xxxxxxxxxxxxxxx

<span class="hljs-comment">// 安装服务端相关依赖</span>
$ cd ohmo
$ npm install

<span class="hljs-comment">// 启动服务端,默认地址 http://localhost:3000(需要提前注册一个leancloud账号)</span>
$ lean up

<span class="hljs-comment">// 安装前端相关依赖</span>
$ cd front-end
$ npm install

<span class="hljs-comment">// 启动前端项目,默认地址 http://localhost:8080</span>
$ npm run dev</code></pre>
<h2 id="articleHeader14">构建部署</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 在front-end目录下  构建前端文件至 /public 文件夹
$ npm run build

// 根目录下 leancloud 命令行部署 / 通过 github 部署
$ lean deploy / lean deploy -g" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 在front-end目录下  构建前端文件至 /public 文件夹</span>
$ npm run build

<span class="hljs-comment">// 根目录下 leancloud 命令行部署 / 通过 github 部署</span>
$ lean deploy / lean deploy -g</code></pre>
<h2 id="articleHeader15">服务上线指南</h2>
<p>首先先提下提交我们的代码上线的过程，线上服务器只需要我们最后的 server 文件以及构建后的前端文件，即根目录下的 public 文件夹下的东东。即在完成每次的开发内容后，记得在 <code>frond-end</code> 前端项目中，执行 <code>npm run build</code> 代码构建。</p>
<p>可以注意到根目录下的 <code>server.js</code> 文件，将代码 push 上去后，会自动执行 <code>node server.js</code> 启动 <code>node</code> 服务器，配置的地方见 <code>package.json</code> 里面的 scripts 部分，当然你也可以根据自己喜欢的方式进行定义。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;,
    &quot;start&quot;: &quot;node server.js&quot;
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="json hljs"><code class="json"><span class="hljs-string">"scripts"</span>: {
    <span class="hljs-attr">"test"</span>: <span class="hljs-string">"echo \"Error: no test specified\" &amp;&amp; exit 1"</span>,
    <span class="hljs-attr">"start"</span>: <span class="hljs-string">"node server.js"</span>
  },</code></pre>
<p>再看看<code> server.js</code> 需要做些什么，</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict';
var AV = require('leanengine');

AV.init({
  appId: process.env.LEANCLOUD_APP_ID,
  appKey: process.env.LEANCLOUD_APP_KEY,
  masterKey: process.env.LEANCLOUD_APP_MASTER_KEY
});

// 如果不希望使用 masterKey 权限，可以将下面一行删除
AV.Cloud.useMasterKey();

var app = require('./server-modules/app');

// 端口一定要从环境变量 `LEANCLOUD_APP_PORT` 中获取。
// LeanEngine 运行时会分配端口并赋值到该变量。
var PORT = parseInt(process.env.LEANCLOUD_APP_PORT || 3000);
app.listen(PORT, function () {
  console.log('Node app is running, port:', PORT);

  // 注册全局未捕获异常处理器
  process.on('uncaughtException', function(err) {
    console.error(&quot;Caught exception:&quot;, err.stack);
  });
  process.on('unhandledRejection', function(reason, p) {
    console.error(&quot;Unhandled Rejection at: Promise &quot;, p, &quot; reason: &quot;, reason.stack);
  });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-meta">'use strict'</span>;
<span class="hljs-keyword">var</span> AV = <span class="hljs-built_in">require</span>(<span class="hljs-string">'leanengine'</span>);

AV.init({
  <span class="hljs-attr">appId</span>: process.env.LEANCLOUD_APP_ID,
  <span class="hljs-attr">appKey</span>: process.env.LEANCLOUD_APP_KEY,
  <span class="hljs-attr">masterKey</span>: process.env.LEANCLOUD_APP_MASTER_KEY
});

<span class="hljs-comment">// 如果不希望使用 masterKey 权限，可以将下面一行删除</span>
AV.Cloud.useMasterKey();

<span class="hljs-keyword">var</span> app = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./server-modules/app'</span>);

<span class="hljs-comment">// 端口一定要从环境变量 `LEANCLOUD_APP_PORT` 中获取。</span>
<span class="hljs-comment">// LeanEngine 运行时会分配端口并赋值到该变量。</span>
<span class="hljs-keyword">var</span> PORT = <span class="hljs-built_in">parseInt</span>(process.env.LEANCLOUD_APP_PORT || <span class="hljs-number">3000</span>);
app.listen(PORT, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'Node app is running, port:'</span>, PORT);

  <span class="hljs-comment">// 注册全局未捕获异常处理器</span>
  process.on(<span class="hljs-string">'uncaughtException'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>) </span>{
    <span class="hljs-built_in">console</span>.error(<span class="hljs-string">"Caught exception:"</span>, err.stack);
  });
  process.on(<span class="hljs-string">'unhandledRejection'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">reason, p</span>) </span>{
    <span class="hljs-built_in">console</span>.error(<span class="hljs-string">"Unhandled Rejection at: Promise "</span>, p, <span class="hljs-string">" reason: "</span>, reason.stack);
  });
});</code></pre>
<p>其实就是一些启动 node 服务器以及连接 leancloud 的一些验证信息等各种配置，如果出现异常将错误信息打印等工作。</p>
<p>最后说的就是部署的工作，由于是用的免费测试应用，所以只有一个生产环境，不用管环境的问题。我们使用的部署方式使用官方提供的一套命令行工具即可完成，安装方式：(执行下面的命令即可，需要提前装好 brew)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="brew install lean-cli" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">brew install lean-cli</code></pre>
<p>装好后，如果在命令行执行 <code>lean</code>，后可以看到使用说明，说明已经安装成功了，接着进行下一步。在项目根目录下，登录自己的 leancloud 账号，并完成当前项目与线上创建应用的绑定。如果项目是第一次绑定，请先执行 <code>lean init</code> 初始化。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="lean login
// 输入邮箱 &amp; 密码
// 登录成功后
lean init
// 可以看到已经创建的应用，选择即可完成绑定,已绑定可键入 lean switch 切换应用" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">lean login
<span class="hljs-comment">// 输入邮箱 &amp; 密码</span>
<span class="hljs-comment">// 登录成功后</span>
lean init
<span class="hljs-comment">// 可以看到已经创建的应用，选择即可完成绑定,已绑定可键入 lean switch 切换应用</span></code></pre>
<p>绑定好我们的应用后,为了防止部署后出现问题，可以先执行 <code>lean up</code> 尝试在本地启动服务，检查应用是否启动正常。如果有报错，请先检查是否本地端口被占用，换一个即可。</p>
<p>如果前面一切顺利，在根目录下执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="lean deploy" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">lean deploy</code></pre>
<p>即完成可对代码进行线上部署。由于是免费的测试服务器，所以会出现时不时的服务无法访问的情况，且一段时间不访问，也会自动进入休眠状态，即再次启动时需要等待服务被唤醒，时间较长。</p>
<p>部署完成后，访问我们线上填写的 url 即可在线看到我们的应用。有了我们可以玩弄的云服务器后，就可以做一些其他有意思的事情了，比如爬虫等等，就看你们的想法了。hehe</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue.js 入门最佳项目实践-个人博客全栈SPA应用从零到上线

## 原文链接
[https://segmentfault.com/a/1190000009570077](https://segmentfault.com/a/1190000009570077)

