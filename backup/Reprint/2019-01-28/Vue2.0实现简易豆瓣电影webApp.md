---
title: 'Vue2.0实现简易豆瓣电影webApp' 
date: 2019-01-28 2:30:09
hidden: true
slug: 7yxqvcahe65
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">Change Log</h1>
<ul>
<li><p>2017-3-15：新增 node 服务转发 api 请求</p></li>
<li><p>2017-3-17：增加在线<a href="http://www.iamsuperman.cn/vue2.x-douban/dist/#/" rel="nofollow noreferrer" target="_blank">访问地址</a>，node 服务转发 api 请求部署到 heroku</p></li>
</ul>
<h1 id="articleHeader1">运行项目</h1>
<p>clone项目到本地，进入项目文件夹，安装依赖</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone https://github.com/superman66/vue2.x-douban.git
cd vue2.x-douban
npm install" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">git clone https:<span class="hljs-comment">//github.com/superman66/vue2.x-douban.git</span>
cd vue2.x-douban
npm install</code></pre>
<p>然后运行项目</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">npm run dev</code></pre>
<p>接着运行 node,启动服务</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd node-proxy
node index.js

//启动成功后，将看到输出
// HTTP Server is running in http://127.0.0.1:8081" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">cd node-proxy
node index.js

<span class="hljs-comment">//启动成功后，将看到输出</span>
<span class="hljs-comment">// HTTP Server is running in http://127.0.0.1:8081</span></code></pre>
<p>最后打开浏览器，输入<code>localhost:8880</code>即可访问。效果图如下：</p>
<p><img alt="text" title="text" src="https://static.alili.techundefined" style="cursor: pointer;"></p>
<p><strong>戳我查看 <a href="http://www.iamsuperman.cn/vue2.x-douban/dist/#/" rel="nofollow noreferrer" target="_blank">demo</a></strong></p>
<p>注意：由于heroku在国外，而且我用的是免费版，当长时间没有连接的话，node服务会被休眠。如果处于休眠状态下，用户访问速度会比较慢，还有可能出现接口请求出现错误。遇到这种情况，刷新重试即可。</p>
<h1 id="articleHeader2">路由</h1>
<p>应用包括下面4个路由</p>
<ul>
<li><p><code>/movies</code> 首页，包含正在上映榜单和即将上映榜单的电影信息，首页只显示各个榜单的前8条数据；</p></li>
<li><p><code>/movie-list</code> 榜单列表页面，显示榜单列表信息;</p></li>
<li><p><code>/movie/subject/:id</code> 电影详情页面；</p></li>
<li><p><code>/movie/search</code> 电影搜索列表页面。</p></li>
</ul>
<h1 id="articleHeader3">项目结构</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".
├── README.md
├── build // vue-cli 自带的配置文件
│&nbsp;&nbsp; ├── build.js
│&nbsp;&nbsp; ├── check-versions.js
│&nbsp;&nbsp; ├── dev-client.js
│&nbsp;&nbsp; ├── dev-server.js
│&nbsp;&nbsp; ├── utils.js
│&nbsp;&nbsp; ├── webpack.base.conf.js
│&nbsp;&nbsp; ├── webpack.dev.conf.js
│&nbsp;&nbsp; └── webpack.prod.conf.js
├── config  // vue-cli 自带的配置文件
│&nbsp;&nbsp; ├── dev.env.js
│&nbsp;&nbsp; ├── index.js
│&nbsp;&nbsp; └── prod.env.js
├── git.sh
├── index.html
├── node-proxy  // node 转发API请求，解决跨域问题
│&nbsp;&nbsp; └── index.js
├── package.json
├── src
│&nbsp;&nbsp; ├── App.vue
│&nbsp;&nbsp; ├── assets
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── list.scss
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── logo.png
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── search-btn.png
│&nbsp;&nbsp; │&nbsp;&nbsp; └── style.scss
│&nbsp;&nbsp; ├── components
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── Hello.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── Spinner.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; └── header.vue
│&nbsp;&nbsp; ├── main.js // 入口文件
│&nbsp;&nbsp; ├── router.js // 路由
│&nbsp;&nbsp; ├── store
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── api.js  // 抽取访问api的方法
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── modules
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── movie.js
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── store.js
│&nbsp;&nbsp; │&nbsp;&nbsp; └── types.js
│&nbsp;&nbsp; └── views
│&nbsp;&nbsp;     ├── index.vue
│&nbsp;&nbsp;     ├── movie
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── movie-detail.vue
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── movie-list.vue
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── movies.vue
│&nbsp;&nbsp;     │&nbsp;&nbsp; └── search-list.vue
│&nbsp;&nbsp;     └── vuex-demo.vue
├── static
└── tree.md" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">.
├── README.md
├── build <span class="hljs-comment">// vue-cli 自带的配置文件</span>
│&nbsp;&nbsp; ├── build.js
│&nbsp;&nbsp; ├── check-versions.js
│&nbsp;&nbsp; ├── dev-client.js
│&nbsp;&nbsp; ├── dev-server.js
│&nbsp;&nbsp; ├── utils.js
│&nbsp;&nbsp; ├── webpack.base.conf.js
│&nbsp;&nbsp; ├── webpack.dev.conf.js
│&nbsp;&nbsp; └── webpack.prod.conf.js
├── config  <span class="hljs-comment">// vue-cli 自带的配置文件</span>
│&nbsp;&nbsp; ├── dev.env.js
│&nbsp;&nbsp; ├── index.js
│&nbsp;&nbsp; └── prod.env.js
├── git.sh
├── index.html
├── node-proxy  <span class="hljs-comment">// node 转发API请求，解决跨域问题</span>
│&nbsp;&nbsp; └── index.js
├── package.json
├── src
│&nbsp;&nbsp; ├── App.vue
│&nbsp;&nbsp; ├── assets
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── list.scss
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── logo.png
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── search-btn.png
│&nbsp;&nbsp; │&nbsp;&nbsp; └── style.scss
│&nbsp;&nbsp; ├── components
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── Hello.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── Spinner.vue
│&nbsp;&nbsp; │&nbsp;&nbsp; └── header.vue
│&nbsp;&nbsp; ├── main.js <span class="hljs-comment">// 入口文件</span>
│&nbsp;&nbsp; ├── router.js <span class="hljs-comment">// 路由</span>
│&nbsp;&nbsp; ├── store
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── api.js  <span class="hljs-comment">// 抽取访问api的方法</span>
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── modules
│&nbsp;&nbsp; │&nbsp;&nbsp; │&nbsp;&nbsp; └── movie.js
│&nbsp;&nbsp; │&nbsp;&nbsp; ├── store.js
│&nbsp;&nbsp; │&nbsp;&nbsp; └── types.js
│&nbsp;&nbsp; └── views
│&nbsp;&nbsp;     ├── index.vue
│&nbsp;&nbsp;     ├── movie
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── movie-detail.vue
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── movie-list.vue
│&nbsp;&nbsp;     │&nbsp;&nbsp; ├── movies.vue
│&nbsp;&nbsp;     │&nbsp;&nbsp; └── search-list.vue
│&nbsp;&nbsp;     └── vuex-demo.vue
├── <span class="hljs-keyword">static</span>
└── tree.md</code></pre>
<h1 id="articleHeader4">第三方库</h1>
<ul>
<li><p>HTTP库采用了<a href="https://github.com/mzabriskie/axios" rel="nofollow noreferrer" target="_blank">axios</a>。</p></li>
<li><p>列表下拉加载更多数据使用了<a href="https://github.com/ElemeFE/vue-infinite-scroll" rel="nofollow noreferrer" target="_blank">vue-infinite-scroll</a></p></li>
</ul>
<h1 id="articleHeader5">豆瓣API</h1>
<p>该应用使用了下面4个api：</p>
<ul>
<li><p><code>/v2/movie/search?q={text}</code> 电影搜索api；</p></li>
<li><p><code>/v2/movie/in_theaters</code> 正在上映的电影；</p></li>
<li><p><code>/v2/movie/coming_soon</code> 即将上映的电影；</p></li>
<li><p><code>/v2/movie/subject/:id</code> 单个电影条目信息。</p></li>
</ul>
<blockquote><p>更多关于豆瓣的api可以前往<a href="https://developers.douban.com/wiki/?title=guide" rel="nofollow noreferrer" target="_blank">豆瓣api官网</a>查看。</p></blockquote>
<p>需要注意的是，由于豆瓣api的跨域问题，并不能直接通过ajax请求访问。不过vue-cli提供了代理的配置。<br>我们需要在<code>/config/index.js</code>中配置代理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="dev: {
  env: require('./dev.env'),
  port: 8880,
  assetsSubDirectory: 'static',
  assetsPublicPath: '/',
  proxyTable: {
    '/api': {
      target: 'http://api.douban.com/v2',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  },
  cssSourceMap: false
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">dev: {
  <span class="hljs-attr">env</span>: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./dev.env'</span>),
  <span class="hljs-attr">port</span>: <span class="hljs-number">8880</span>,
  <span class="hljs-attr">assetsSubDirectory</span>: <span class="hljs-string">'static'</span>,
  <span class="hljs-attr">assetsPublicPath</span>: <span class="hljs-string">'/'</span>,
  <span class="hljs-attr">proxyTable</span>: {
    <span class="hljs-string">'/api'</span>: {
      <span class="hljs-attr">target</span>: <span class="hljs-string">'http://api.douban.com/v2'</span>,
      <span class="hljs-attr">changeOrigin</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">pathRewrite</span>: {
        <span class="hljs-string">'^/api'</span>: <span class="hljs-string">''</span>
      }
    }
  },
  <span class="hljs-attr">cssSourceMap</span>: <span class="hljs-literal">false</span>
}</code></pre>
<p>在<code>proxyTable</code>这个属性中，配置target属性为我们要代理的目标地址。这里我们写成<code>http://api.douban.com/v2</code>，这样我们就可以在应用中调用<code>/api/movie/in_theaters</code>来访问<code>http://api.douban.com/v2/movie/in_theaters</code>，从而解决跨域的问题。</p>
<blockquote><p>关于vue-cli更多关于跨域的设置可以看<a href="http://vuejs-templates.github.io/webpack/" rel="nofollow noreferrer" target="_blank">官网文档</a></p></blockquote>
<h2 id="articleHeader6">Node.js 转发API请求</h2>
<p>由于有同学在问，项目执行<code>npm run build</code>打包之后，豆瓣 API 代理配置不起作用，无法访问豆瓣API的问题。<br>所以新增了Node.js http服务，用于转发API请求，解决跨域问题。<br><strong>安装依赖</strong></p>
<p>Node.js转发用到了 <code>express</code>和<code>superagent</code>. <a href="https://github.com/visionmedia/superagent" rel="nofollow noreferrer" target="_blank">superanget</a>是一个 Node.js HTTP client。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i express superagent -S" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-selector-tag">i</span> express superagent -S</code></pre>
<p><strong>定义接口</strong><br>根据前端所需，定义了如下三个接口：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.get('/movie/:type', function (req, res) {
  var sreq = request.get(HOST + req.originalUrl)
  sreq.pipe(res);
  sreq.on('end', function (error, res) {
    console.log('end');
  });
})

app.get('/movie/subject/:id', function (req, res) {
  var sreq = request.get(HOST + req.originalUrl)
  sreq.pipe(res);
  sreq.on('end', function (error, res) {
    console.log('end');
  });
})

app.get('/movie/search', function (req, res) {
  var sreq = request.get(HOST + req.originalUrl)
  sreq.pipe(res);
  sreq.on('end', function (error, res) {
    console.log('end');
  });
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">app.get(<span class="hljs-string">'/movie/:type'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
  <span class="hljs-keyword">var</span> sreq = request.get(HOST + req.originalUrl)
  sreq.pipe(res);
  sreq.on(<span class="hljs-string">'end'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error, res</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'end'</span>);
  });
})

app.get(<span class="hljs-string">'/movie/subject/:id'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
  <span class="hljs-keyword">var</span> sreq = request.get(HOST + req.originalUrl)
  sreq.pipe(res);
  sreq.on(<span class="hljs-string">'end'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error, res</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'end'</span>);
  });
})

app.get(<span class="hljs-string">'/movie/search'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
  <span class="hljs-keyword">var</span> sreq = request.get(HOST + req.originalUrl)
  sreq.pipe(res);
  sreq.on(<span class="hljs-string">'end'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">error, res</span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'end'</span>);
  });
})</code></pre>
<p><strong>CORS设置</strong></p>
<blockquote><p>跨源资源共享 ( <a href="https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS" rel="nofollow noreferrer" target="_blank">CORS</a> )机制让Web应用服务器能支持跨站访问控制，从而使得安全地进行跨站数据传输成为可能。</p></blockquote>
<p>主要是通过设置<code>Access-Control-Allow-Origin: *</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.all('*', function (req, res, next) {
  if (!req.get('Origin')) return next();
  // use &quot;*&quot; here to accept any origin
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'GET');
  res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  // res.set('Access-Control-Allow-Max-Age', 3600);
  if ('OPTIONS' == req.method) return res.send(200);
  next();
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">app.all(<span class="hljs-string">'*'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res, next</span>) </span>{
  <span class="hljs-keyword">if</span> (!req.get(<span class="hljs-string">'Origin'</span>)) <span class="hljs-keyword">return</span> next();
  <span class="hljs-comment">// use "*" here to accept any origin</span>
  res.set(<span class="hljs-string">'Access-Control-Allow-Origin'</span>, <span class="hljs-string">'*'</span>);
  res.set(<span class="hljs-string">'Access-Control-Allow-Methods'</span>, <span class="hljs-string">'GET'</span>);
  res.set(<span class="hljs-string">'Access-Control-Allow-Headers'</span>, <span class="hljs-string">'X-Requested-With, Content-Type'</span>);
  <span class="hljs-comment">// res.set('Access-Control-Allow-Max-Age', 3600);</span>
  <span class="hljs-keyword">if</span> (<span class="hljs-string">'OPTIONS'</span> == req.method) <span class="hljs-keyword">return</span> res.send(<span class="hljs-number">200</span>);
  next();
});</code></pre>
<p><strong>端口监听</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.listen(8081, function () {
  console.log('HTTP Server is running in http://127.0.0.1:8081')
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">app.listen(<span class="hljs-number">8081</span>, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params"></span>) </span>{
  <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'HTTP Server is running in http://127.0.0.1:8081'</span>)
})</code></pre>
<p><strong>启动</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd node-proxy
node index.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>cd <span class="hljs-keyword">node</span><span class="hljs-title">-proxy</span>
<span class="hljs-keyword">node</span> <span class="hljs-title">index</span>.js</code></pre>
<p>具体见<code>node-proxy/index.js</code></p>
<p><strong>更多关于 Node.js 转发 api 请求，请戳完整项目：<a href="https://github.com/superman66/node-proxy-api" rel="nofollow noreferrer" target="_blank">node-proxy-api</a></strong></p>
<h1 id="articleHeader7">关于vuex</h1>
<p>如果你想了解vuex的用法，可以切换到<code>vuex</code>分支，在该分支下，所有的state都采用vuex来管理。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Vue2.0实现简易豆瓣电影webApp

## 原文链接
[https://segmentfault.com/a/1190000008115372](https://segmentfault.com/a/1190000008115372)

