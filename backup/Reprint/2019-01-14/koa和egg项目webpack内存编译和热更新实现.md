---
title: 'koa和egg项目webpack内存编译和热更新实现' 
date: 2019-01-14 2:30:07
hidden: true
slug: h3u84eshq1
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">背景</h2>
<p>在用Node.js+Webpack构建的方式进行开发时,  我们希望能实现修改代码能实时刷新页面UI的效果.<br>这个特性webpack本身是支持的, 而且基于koa也有现成的koa-webpack-hot-middleware 和 koa-webpack-dev-middleware 封装好的组件支持.<br>不过这里如果需要支持Node.js服务器端修改代码自动重启webpack自动编译功能就需要cluster来实现.</p>
<p>今天这里要讲的是如何在koa和egg应用实现Node.js应用重启中的webpack热更新功能. 要实现egg项目中webpack友好的开发体验, 需要解决如下三个问题.</p>
<h2 id="articleHeader1">问题</h2>
<ul>
<li><p>如何解决Node.js服务器端代码修改应用重启避免webpack重新编译.</p></li>
<li><p>如何访问js,css,image等静态资源.</p></li>
<li><p>如何处理本地开发webpack热更新内存存储读取和线上应用本机文件读取逻辑分离.</p></li>
</ul>
<h2 id="articleHeader2">基于koa的webpack编译和热更新实现</h2>
<p>在koa项目中, 通过koa-webpack-dev-middleware和koa-webpack-hot-middleware可以实现webpack编译内存存储和热更新功能, 代码如下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const compiler = webpack(webpackConfig);
const devMiddleware = require('koa-webpack-dev-middleware')(compiler, options);
const hotMiddleware = require('koa-webpack-hot-middleware')(compiler, options);
app.use(devMiddleware);
app.use(hotMiddleware);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> compiler = webpack(webpackConfig);
<span class="hljs-keyword">const</span> devMiddleware = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-webpack-dev-middleware'</span>)(compiler, options);
<span class="hljs-keyword">const</span> hotMiddleware = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-webpack-hot-middleware'</span>)(compiler, options);
app.use(devMiddleware);
app.use(hotMiddleware);</code></pre>
<p>如果按照上面实现, 可以满足修改修改客户端代码实现webpack自动变编译和UI界面热更新的功能, 但如果是修改Node.js服务器端代码重启后就会发现webpack会重新编译,<br>这不是我们要的效果.原因是因为middleware是依赖app的生命周期, 当app销毁时, 对应webpack compiler实例也就没有了, 重启时会重新执行middleware初始化工作.<br>针对这个我们可以通过Node.js cluster实现, 大概思路如下:</p>
<h4>通过cluster worker 启动App应用</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (cluster.isWorker) {
  const koa = require('koa');
    app.listen(8888, () =>{
        app.logger.info('The server is running on port: 9999');
    });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span> (cluster.isWorker) {
  <span class="hljs-keyword">const</span> koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa'</span>);
    app.listen(<span class="hljs-number">8888</span>, () =&gt;{
        app.logger.info(<span class="hljs-string">'The server is running on port: 9999'</span>);
    });
}</code></pre>
<h4>通过cluster master 启动一个新的koa应用, 并启动 webpack 编译.</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const cluster = require('cluster');
const chokidar = require('chokidar');

if (cluster.isMaster) {
  const koa = require('koa');
  const app = koa();
  const compiler = webpack([clientWebpackConfig,serverWebpackConfig]);
  const devMiddleware = require('koa-webpack-dev-middleware')(compiler);
  const hotMiddleware = require('koa-webpack-hot-middleware')(compiler);
  app.use(devMiddleware);
  app.use(hotMiddleware);

  let worker = cluster.fork();
  chokidar.watch(config.dir, config.options).on('change', path =>{
    console.log(`${path} changed`);
    worker.kill();
    worker = cluster.fork().on('listening', (address) =>{
      console.log(`[master] listening: worker ${worker.id}, pid:${worker.process.pid} ,Address:${address.address } :${address.port}`);
    });
  });
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> cluster = <span class="hljs-built_in">require</span>(<span class="hljs-string">'cluster'</span>);
<span class="hljs-keyword">const</span> chokidar = <span class="hljs-built_in">require</span>(<span class="hljs-string">'chokidar'</span>);

<span class="hljs-keyword">if</span> (cluster.isMaster) {
  <span class="hljs-keyword">const</span> koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa'</span>);
  <span class="hljs-keyword">const</span> app = koa();
  <span class="hljs-keyword">const</span> compiler = webpack([clientWebpackConfig,serverWebpackConfig]);
  <span class="hljs-keyword">const</span> devMiddleware = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-webpack-dev-middleware'</span>)(compiler);
  <span class="hljs-keyword">const</span> hotMiddleware = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-webpack-hot-middleware'</span>)(compiler);
  app.use(devMiddleware);
  app.use(hotMiddleware);

  <span class="hljs-keyword">let</span> worker = cluster.fork();
  chokidar.watch(config.dir, config.options).on(<span class="hljs-string">'change'</span>, path =&gt;{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${path}</span> changed`</span>);
    worker.kill();
    worker = cluster.fork().on(<span class="hljs-string">'listening'</span>, (address) =&gt;{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`[master] listening: worker <span class="hljs-subst">${worker.id}</span>, pid:<span class="hljs-subst">${worker.process.pid}</span> ,Address:<span class="hljs-subst">${address.address }</span> :<span class="hljs-subst">${address.port}</span>`</span>);
    });
  });
}</code></pre>
<h4>通过chokidar库监听文件夹的文件修改, 然后重启worker, 这样就能保证webpack compiler实例不被销毁.</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const watchConfig = {
        dir: [ 'controller', 'middleware', 'lib', 'model', 'app.js', 'index.js' ],
        options: {}
    };
    let worker = cluster.fork();
    chokidar.watch(watchConfig.dir, watchConfig.options).on('change', path =>{
        console.log(`${path} changed`);
        worker &amp;&amp; worker.kill();
        worker = cluster.fork().on('listening', (address) =>{
            console.log(`[master] listening: worker ${worker.id}, pid:${worker.process.pid} ,Address:${address.address } :${address.port}`);
        });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> watchConfig = {
        <span class="hljs-attr">dir</span>: [ <span class="hljs-string">'controller'</span>, <span class="hljs-string">'middleware'</span>, <span class="hljs-string">'lib'</span>, <span class="hljs-string">'model'</span>, <span class="hljs-string">'app.js'</span>, <span class="hljs-string">'index.js'</span> ],
        <span class="hljs-attr">options</span>: {}
    };
    <span class="hljs-keyword">let</span> worker = cluster.fork();
    chokidar.watch(watchConfig.dir, watchConfig.options).on(<span class="hljs-string">'change'</span>, path =&gt;{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`<span class="hljs-subst">${path}</span> changed`</span>);
        worker &amp;&amp; worker.kill();
        worker = cluster.fork().on(<span class="hljs-string">'listening'</span>, (address) =&gt;{
            <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`[master] listening: worker <span class="hljs-subst">${worker.id}</span>, pid:<span class="hljs-subst">${worker.process.pid}</span> ,Address:<span class="hljs-subst">${address.address }</span> :<span class="hljs-subst">${address.port}</span>`</span>);
        });
});</code></pre>
<h4>worker 通过<code>process.send</code> 向 master 发现消息, <code>process.on</code> 监听 master返回的消息</h4>
<ul><li><p>首先我们看看本地文件读取的实现, 在context上面挂载readFile方法, 进行view render时, 调用<code>app.context.readFile</code> 方法.</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.context.readFile = function(fileName){
  const filePath = path.join(config.baseDir, config.staticDir, fileName);
  return new Promise((resolve, reject) =>{
    fs.readFile(filePath, CHARSET, function(err, data){
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">app.context.readFile = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">fileName</span>)</span>{
  <span class="hljs-keyword">const</span> filePath = path.join(config.baseDir, config.staticDir, fileName);
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span>{
    fs.readFile(filePath, CHARSET, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err, data</span>)</span>{
      <span class="hljs-keyword">if</span> (err) {
        reject(err);
      } <span class="hljs-keyword">else</span> {
        resolve(data);
      }
    });
  });
};</code></pre>
<ul><li><p>通过覆写worker <code>app.context.readFile</code> 方法, 这样进行本地开发时,开启该插件就可以无缝的从webpack编译内存系统里面读取文件</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.context.readFile = (fileName) =>{
  return new Promise((resolve, reject) =>{
    process.send({ action: Constant.EVENT_FILE_READ, fileName });
    process.on(Constant.EVENT_MESSAGE, (msg) =>{
      resolve(msg.content);
    });
  });
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">app.context.readFile = <span class="hljs-function">(<span class="hljs-params">fileName</span>) =&gt;</span>{
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span>{
    process.send({ <span class="hljs-attr">action</span>: Constant.EVENT_FILE_READ, fileName });
    process.on(Constant.EVENT_MESSAGE, (msg) =&gt;{
      resolve(msg.content);
    });
  });
};</code></pre>
<h4>master 通过监听worker发过来的消息, 获取webpack编译进度和读取webpack compiler内存系统文件内容</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cluster.on(Constant.EVENT_MESSAGE, (worker, msg) =>{
        switch (msg.action) {
            case Constant.EVENT_WEBPACK_BUILD_STATE: {
                const data = {
                    action: Constant.EVENT_WEBPACK_BUILD_STATE,
                    state: app.webpack_client_build_success &amp;&amp; app.webpack_server_build_success
                };
                worker.send(data);
                break;
            }
            case Constant.EVENT_FILE_READ: {
                const fileName = msg.fileName;
                try {
                    const compiler = app.compiler;
                    const filePath = path.join(compiler.outputPath, fileName);
                    const content = app.compiler.outputFileSystem.readFileSync(filePath).toString(Constant.CHARSET);
                    worker.send({ fileName, content });
                } catch (e) {
                    console.log(`read file ${fileName} error`, e.toString());
                }
                break;
            }
            default:
                break;
        }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">cluster.on(Constant.EVENT_MESSAGE, (worker, msg) =&gt;{
        <span class="hljs-keyword">switch</span> (msg.action) {
            <span class="hljs-keyword">case</span> Constant.EVENT_WEBPACK_BUILD_STATE: {
                <span class="hljs-keyword">const</span> data = {
                    <span class="hljs-attr">action</span>: Constant.EVENT_WEBPACK_BUILD_STATE,
                    <span class="hljs-attr">state</span>: app.webpack_client_build_success &amp;&amp; app.webpack_server_build_success
                };
                worker.send(data);
                <span class="hljs-keyword">break</span>;
            }
            <span class="hljs-keyword">case</span> Constant.EVENT_FILE_READ: {
                <span class="hljs-keyword">const</span> fileName = msg.fileName;
                <span class="hljs-keyword">try</span> {
                    <span class="hljs-keyword">const</span> compiler = app.compiler;
                    <span class="hljs-keyword">const</span> filePath = path.join(compiler.outputPath, fileName);
                    <span class="hljs-keyword">const</span> content = app.compiler.outputFileSystem.readFileSync(filePath).toString(Constant.CHARSET);
                    worker.send({ fileName, content });
                } <span class="hljs-keyword">catch</span> (e) {
                    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">`read file <span class="hljs-subst">${fileName}</span> error`</span>, e.toString());
                }
                <span class="hljs-keyword">break</span>;
            }
            <span class="hljs-keyword">default</span>:
                <span class="hljs-keyword">break</span>;
        }
});</code></pre>
<h2 id="articleHeader3">基于egg的webpack编译和热更新实现</h2>
<p>通过上面koa的实现思路, egg实现就更简单了. 因为egg已经内置了worker和agent通信机制以及自动重启功能.</p>
<ul>
<li><p>worker和agent通信机制: <a href="https://eggjs.org/zh-cn/core/cluster-and-ipc.html" rel="nofollow noreferrer" target="_blank">https://eggjs.org/zh-cn/core/...</a></p></li>
<li><p>实现egg项目服务器代码修改项目自动重启的功能可以使用<a href="https://github.com/eggjs/egg-development" rel="nofollow noreferrer" target="_blank">egg-development</a>插件.</p></li>
</ul>
<h4>app.js (worker) 通过 检测webpack 编译进度</h4>
<ul>
<li><p>通过<code>app.messenger.sendToAgent</code> 向agent发送消息</p></li>
<li><p>通过<code>app.messenger.on</code> 监听agent发送过来的消息</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="app.use(function* (next) {
  if (app.webpack_server_build_success &amp;&amp; app.webpack_client_build_success) {
    yield* next;
  } else {
    const serverData = yield new Promise(resolve => {
      this.app.messenger.sendToAgent(Constant.EVENT_WEBPACK_SERVER_BUILD_STATE, {
        webpackBuildCheck: true,
      });
      this.app.messenger.on(Constant.EVENT_WEBPACK_SERVER_BUILD_STATE, data => {
        resolve(data);
      });
    });
    app.webpack_server_build_success = serverData.state;

    const clientData = yield new Promise(resolve => {
      this.app.messenger.sendToAgent(Constant.EVENT_WEBPACK_CLIENT_BUILD_STATE, {
        webpackBuildCheck: true,
      });
      this.app.messenger.on(Constant.EVENT_WEBPACK_CLIENT_BUILD_STATE, data => {
        resolve(data);
      });
    });

    app.webpack_client_build_success = clientData.state;

    if (!(app.webpack_server_build_success &amp;&amp; app.webpack_client_build_success)) {
      if (app.webpack_loading_text) {
        this.body = app.webpack_loading_text;
      } else {
        const filePath = path.resolve(__dirname, './lib/template/loading.html');
        this.body = app.webpack_loading_text = fs.readFileSync(filePath, 'utf8');
      }
    } else {
      yield* next;
    }
  }
});

app.messenger.on(Constant.EVENT_WEBPACK_SERVER_BUILD_STATE, data => {
  app.webpack_server_build_success = data.state;
});

app.messenger.on(Constant.EVENT_WEBPACK_CLIENT_BUILD_STATE, data => {
  app.webpack_client_build_success = data.state;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">app.use(<span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params">next</span>) </span>{
  <span class="hljs-keyword">if</span> (app.webpack_server_build_success &amp;&amp; app.webpack_client_build_success) {
    <span class="hljs-keyword">yield</span>* next;
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">const</span> serverData = <span class="hljs-keyword">yield</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
      <span class="hljs-keyword">this</span>.app.messenger.sendToAgent(Constant.EVENT_WEBPACK_SERVER_BUILD_STATE, {
        <span class="hljs-attr">webpackBuildCheck</span>: <span class="hljs-literal">true</span>,
      });
      <span class="hljs-keyword">this</span>.app.messenger.on(Constant.EVENT_WEBPACK_SERVER_BUILD_STATE, data =&gt; {
        resolve(data);
      });
    });
    app.webpack_server_build_success = serverData.state;

    <span class="hljs-keyword">const</span> clientData = <span class="hljs-keyword">yield</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
      <span class="hljs-keyword">this</span>.app.messenger.sendToAgent(Constant.EVENT_WEBPACK_CLIENT_BUILD_STATE, {
        <span class="hljs-attr">webpackBuildCheck</span>: <span class="hljs-literal">true</span>,
      });
      <span class="hljs-keyword">this</span>.app.messenger.on(Constant.EVENT_WEBPACK_CLIENT_BUILD_STATE, data =&gt; {
        resolve(data);
      });
    });

    app.webpack_client_build_success = clientData.state;

    <span class="hljs-keyword">if</span> (!(app.webpack_server_build_success &amp;&amp; app.webpack_client_build_success)) {
      <span class="hljs-keyword">if</span> (app.webpack_loading_text) {
        <span class="hljs-keyword">this</span>.body = app.webpack_loading_text;
      } <span class="hljs-keyword">else</span> {
        <span class="hljs-keyword">const</span> filePath = path.resolve(__dirname, <span class="hljs-string">'./lib/template/loading.html'</span>);
        <span class="hljs-keyword">this</span>.body = app.webpack_loading_text = fs.readFileSync(filePath, <span class="hljs-string">'utf8'</span>);
      }
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-keyword">yield</span>* next;
    }
  }
});

app.messenger.on(Constant.EVENT_WEBPACK_SERVER_BUILD_STATE, data =&gt; {
  app.webpack_server_build_success = data.state;
});

app.messenger.on(Constant.EVENT_WEBPACK_CLIENT_BUILD_STATE, data =&gt; {
  app.webpack_client_build_success = data.state;
});</code></pre>
<h4>agent.js 启动koa实例和webpack编译流程</h4>
<p>这里client和server编译单独启动koa实例, 而不是一个是因为在测试时发现编译会导致热更新冲突.</p>
<ul><li><p>启动webpack client 编译模式, 负责编译browser运行文件(js,css,image等静态资源)</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict';

const webpack = require('webpack');
const koa = require('koa');
const cors = require('kcors');
const app = koa();
app.use(cors());
const Constant = require('./constant');
const Utils = require('./utils');

module.exports = agent => {

  const config = agent.config.webpack;
  const webpackConfig = config.clientConfig;
  const compiler = webpack([webpackConfig]);

  compiler.plugin('done', compilation => {
    // Child extract-text-webpack-plugin:
    compilation.stats.forEach(stat => {
      stat.compilation.children = stat.compilation.children.filter(child => {
        return child.name !== 'extract-text-webpack-plugin';
      });
    });
    agent.messenger.sendToApp(Constant.EVENT_WEBPACK_CLIENT_BUILD_STATE, { state: true });
    agent.webpack_client_build_success = true;
  });

  const devMiddleware = require('koa-webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: {
      colors: true,
      children: true,
      modules: false,
      chunks: false,
      chunkModules: false,
    },
    watchOptions: {
      ignored: /node_modules/,
    },
  });

  const hotMiddleware = require('koa-webpack-hot-middleware')(compiler, {
    log: false,
    reload: true,
  });

  app.use(devMiddleware);
  app.use(hotMiddleware);

  app.listen(config.port, err => {
    if (!err) {
      agent.logger.info(`start webpack client build service: http://127.0.0.1:${config.port}`);
    }
  });

  agent.messenger.on(Constant.EVENT_WEBPACK_CLIENT_BUILD_STATE, () => {
    agent.messenger.sendToApp(Constant.EVENT_WEBPACK_CLIENT_BUILD_STATE, { state: agent.webpack_client_build_success });
  });

  agent.messenger.on(Constant.EVENT_WEBPACK_READ_CLIENT_FILE_MEMORY, data => {
    const fileContent = Utils.readWebpackMemoryFile(compiler, data.filePath);
    if (fileContent) {
      agent.messenger.sendToApp(Constant.EVENT_WEBPACK_READ_CLIENT_FILE_MEMORY_CONTENT, {
        fileContent,
      });
    } else {
      agent.logger.error(`webpack client memory file[${data.filePath}] not exist!`);
      agent.messenger.sendToApp(Constant.EVENT_WEBPACK_READ_CLIENT_FILE_MEMORY_CONTENT, {
        fileContent: '',
      });
    }
  });
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-meta">'use strict'</span>;

<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-keyword">const</span> koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa'</span>);
<span class="hljs-keyword">const</span> cors = <span class="hljs-built_in">require</span>(<span class="hljs-string">'kcors'</span>);
<span class="hljs-keyword">const</span> app = koa();
app.use(cors());
<span class="hljs-keyword">const</span> Constant = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./constant'</span>);
<span class="hljs-keyword">const</span> Utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./utils'</span>);

<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-params">agent</span> =&gt;</span> {

  <span class="hljs-keyword">const</span> config = agent.config.webpack;
  <span class="hljs-keyword">const</span> webpackConfig = config.clientConfig;
  <span class="hljs-keyword">const</span> compiler = webpack([webpackConfig]);

  compiler.plugin(<span class="hljs-string">'done'</span>, compilation =&gt; {
    <span class="hljs-comment">// Child extract-text-webpack-plugin:</span>
    compilation.stats.forEach(<span class="hljs-function"><span class="hljs-params">stat</span> =&gt;</span> {
      stat.compilation.children = stat.compilation.children.filter(<span class="hljs-function"><span class="hljs-params">child</span> =&gt;</span> {
        <span class="hljs-keyword">return</span> child.name !== <span class="hljs-string">'extract-text-webpack-plugin'</span>;
      });
    });
    agent.messenger.sendToApp(Constant.EVENT_WEBPACK_CLIENT_BUILD_STATE, { <span class="hljs-attr">state</span>: <span class="hljs-literal">true</span> });
    agent.webpack_client_build_success = <span class="hljs-literal">true</span>;
  });

  <span class="hljs-keyword">const</span> devMiddleware = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-webpack-dev-middleware'</span>)(compiler, {
    <span class="hljs-attr">publicPath</span>: webpackConfig.output.publicPath,
    <span class="hljs-attr">stats</span>: {
      <span class="hljs-attr">colors</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">children</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">modules</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">chunks</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">chunkModules</span>: <span class="hljs-literal">false</span>,
    },
    <span class="hljs-attr">watchOptions</span>: {
      <span class="hljs-attr">ignored</span>: <span class="hljs-regexp">/node_modules/</span>,
    },
  });

  <span class="hljs-keyword">const</span> hotMiddleware = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-webpack-hot-middleware'</span>)(compiler, {
    <span class="hljs-attr">log</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">reload</span>: <span class="hljs-literal">true</span>,
  });

  app.use(devMiddleware);
  app.use(hotMiddleware);

  app.listen(config.port, err =&gt; {
    <span class="hljs-keyword">if</span> (!err) {
      agent.logger.info(<span class="hljs-string">`start webpack client build service: http://127.0.0.1:<span class="hljs-subst">${config.port}</span>`</span>);
    }
  });

  agent.messenger.on(Constant.EVENT_WEBPACK_CLIENT_BUILD_STATE, () =&gt; {
    agent.messenger.sendToApp(Constant.EVENT_WEBPACK_CLIENT_BUILD_STATE, { <span class="hljs-attr">state</span>: agent.webpack_client_build_success });
  });

  agent.messenger.on(Constant.EVENT_WEBPACK_READ_CLIENT_FILE_MEMORY, data =&gt; {
    <span class="hljs-keyword">const</span> fileContent = Utils.readWebpackMemoryFile(compiler, data.filePath);
    <span class="hljs-keyword">if</span> (fileContent) {
      agent.messenger.sendToApp(Constant.EVENT_WEBPACK_READ_CLIENT_FILE_MEMORY_CONTENT, {
        fileContent,
      });
    } <span class="hljs-keyword">else</span> {
      agent.logger.error(<span class="hljs-string">`webpack client memory file[<span class="hljs-subst">${data.filePath}</span>] not exist!`</span>);
      agent.messenger.sendToApp(Constant.EVENT_WEBPACK_READ_CLIENT_FILE_MEMORY_CONTENT, {
        <span class="hljs-attr">fileContent</span>: <span class="hljs-string">''</span>,
      });
    }
  });
};
</code></pre>
<ul><li><p>启动webpack server 编译模式, 负责编译服务器端Node运行文件</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="'use strict';

const webpack = require('webpack');
const koa = require('koa');
const cors = require('kcors');
const app = koa();
app.use(cors());
const Constant = require('./constant');
const Utils = require('./utils');

module.exports = agent => {
  const config = agent.config.webpack;
  const serverWebpackConfig = config.serverConfig;
  const compiler = webpack([serverWebpackConfig]);

  compiler.plugin('done', () => {
    agent.messenger.sendToApp(Constant.EVENT_WEBPACK_SERVER_BUILD_STATE, { state: true });
    agent.webpack_server_build_success = true;
  });

  const devMiddleware = require('koa-webpack-dev-middleware')(compiler, {
    publicPath: serverWebpackConfig.output.publicPath,
    stats: {
      colors: true,
      children: true,
      modules: false,
      chunks: false,
      chunkModules: false,
    },
    watchOptions: {
      ignored: /node_modules/,
    },
  });

  app.use(devMiddleware);

  app.listen(config.port + 1, err => {
    if (!err) {
      agent.logger.info(`start webpack server build service: http://127.0.0.1:${config.port + 1}`);
    }
  });

  agent.messenger.on(Constant.EVENT_WEBPACK_SERVER_BUILD_STATE, () => {
    agent.messenger.sendToApp(Constant.EVENT_WEBPACK_SERVER_BUILD_STATE, { state: agent.webpack_server_build_success });
  });

  agent.messenger.on(Constant.EVENT_WEBPACK_READ_SERVER_FILE_MEMORY, data => {
    const fileContent = Utils.readWebpackMemoryFile(compiler, data.filePath);
    if (fileContent) {
      agent.messenger.sendToApp(Constant.EVENT_WEBPACK_READ_SERVER_FILE_MEMORY_CONTENT, {
        fileContent,
      });
    } else {
      // agent.logger.error(`webpack server memory file[${data.filePath}] not exist!`);
      agent.messenger.sendToApp(Constant.EVENT_WEBPACK_READ_SERVER_FILE_MEMORY_CONTENT, {
        fileContent: '',
      });
    }
  });
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-meta">'use strict'</span>;

<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-keyword">const</span> koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa'</span>);
<span class="hljs-keyword">const</span> cors = <span class="hljs-built_in">require</span>(<span class="hljs-string">'kcors'</span>);
<span class="hljs-keyword">const</span> app = koa();
app.use(cors());
<span class="hljs-keyword">const</span> Constant = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./constant'</span>);
<span class="hljs-keyword">const</span> Utils = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./utils'</span>);

<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-params">agent</span> =&gt;</span> {
  <span class="hljs-keyword">const</span> config = agent.config.webpack;
  <span class="hljs-keyword">const</span> serverWebpackConfig = config.serverConfig;
  <span class="hljs-keyword">const</span> compiler = webpack([serverWebpackConfig]);

  compiler.plugin(<span class="hljs-string">'done'</span>, () =&gt; {
    agent.messenger.sendToApp(Constant.EVENT_WEBPACK_SERVER_BUILD_STATE, { <span class="hljs-attr">state</span>: <span class="hljs-literal">true</span> });
    agent.webpack_server_build_success = <span class="hljs-literal">true</span>;
  });

  <span class="hljs-keyword">const</span> devMiddleware = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-webpack-dev-middleware'</span>)(compiler, {
    <span class="hljs-attr">publicPath</span>: serverWebpackConfig.output.publicPath,
    <span class="hljs-attr">stats</span>: {
      <span class="hljs-attr">colors</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">children</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">modules</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">chunks</span>: <span class="hljs-literal">false</span>,
      <span class="hljs-attr">chunkModules</span>: <span class="hljs-literal">false</span>,
    },
    <span class="hljs-attr">watchOptions</span>: {
      <span class="hljs-attr">ignored</span>: <span class="hljs-regexp">/node_modules/</span>,
    },
  });

  app.use(devMiddleware);

  app.listen(config.port + <span class="hljs-number">1</span>, err =&gt; {
    <span class="hljs-keyword">if</span> (!err) {
      agent.logger.info(<span class="hljs-string">`start webpack server build service: http://127.0.0.1:<span class="hljs-subst">${config.port + <span class="hljs-number">1</span>}</span>`</span>);
    }
  });

  agent.messenger.on(Constant.EVENT_WEBPACK_SERVER_BUILD_STATE, () =&gt; {
    agent.messenger.sendToApp(Constant.EVENT_WEBPACK_SERVER_BUILD_STATE, { <span class="hljs-attr">state</span>: agent.webpack_server_build_success });
  });

  agent.messenger.on(Constant.EVENT_WEBPACK_READ_SERVER_FILE_MEMORY, data =&gt; {
    <span class="hljs-keyword">const</span> fileContent = Utils.readWebpackMemoryFile(compiler, data.filePath);
    <span class="hljs-keyword">if</span> (fileContent) {
      agent.messenger.sendToApp(Constant.EVENT_WEBPACK_READ_SERVER_FILE_MEMORY_CONTENT, {
        fileContent,
      });
    } <span class="hljs-keyword">else</span> {
      <span class="hljs-comment">// agent.logger.error(`webpack server memory file[${data.filePath}] not exist!`);</span>
      agent.messenger.sendToApp(Constant.EVENT_WEBPACK_READ_SERVER_FILE_MEMORY_CONTENT, {
        <span class="hljs-attr">fileContent</span>: <span class="hljs-string">''</span>,
      });
    }
  });
};</code></pre>
<ul><li><p>挂载 webpack 内存读取实例到<code>app</code>上面, 方便业务扩展实现, 代码如下:</p></li></ul>
<p>我们通过worker向agent发送消息, 就可以从webpack内存获取文件内容, 下面简单封装一下:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class FileSystem {

  constructor(app) {
    this.app = app;
  }

  readClientFile(filePath, fileName) {
    return new Promise(resolve => {
      this.app.messenger.sendToAgent(Constant.EVENT_WEBPACK_READ_CLIENT_FILE_MEMORY, {
        filePath,
        fileName,
      });
      this.app.messenger.on(Constant.EVENT_WEBPACK_READ_CLIENT_FILE_MEMORY_CONTENT, data => {
        resolve(data.fileContent);
      });
    });
  }

  readServerFile(filePath, fileName) {
    return new Promise(resolve => {
      this.app.messenger.sendToAgent(Constant.EVENT_WEBPACK_READ_SERVER_FILE_MEMORY, {
        filePath,
        fileName,
      });
      this.app.messenger.on(Constant.EVENT_WEBPACK_READ_SERVER_FILE_MEMORY_CONTENT, data => {
        resolve(data.fileContent);
      });
    });
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">FileSystem</span> </span>{

  <span class="hljs-keyword">constructor</span>(app) {
    <span class="hljs-keyword">this</span>.app = app;
  }

  readClientFile(filePath, fileName) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
      <span class="hljs-keyword">this</span>.app.messenger.sendToAgent(Constant.EVENT_WEBPACK_READ_CLIENT_FILE_MEMORY, {
        filePath,
        fileName,
      });
      <span class="hljs-keyword">this</span>.app.messenger.on(Constant.EVENT_WEBPACK_READ_CLIENT_FILE_MEMORY_CONTENT, data =&gt; {
        resolve(data.fileContent);
      });
    });
  }

  readServerFile(filePath, fileName) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function"><span class="hljs-params">resolve</span> =&gt;</span> {
      <span class="hljs-keyword">this</span>.app.messenger.sendToAgent(Constant.EVENT_WEBPACK_READ_SERVER_FILE_MEMORY, {
        filePath,
        fileName,
      });
      <span class="hljs-keyword">this</span>.app.messenger.on(Constant.EVENT_WEBPACK_READ_SERVER_FILE_MEMORY_CONTENT, data =&gt; {
        resolve(data.fileContent);
      });
    });
  }
}
</code></pre>
<p>在app/extend/application.js 挂载webpack实例</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const WEBPACK = Symbol('Application#webpack');
module.exports = {
  get webpack() {
    if (!this[WEBPACK]) {
      this[WEBPACK] = new FileSystem(this);
    }
    return this[WEBPACK];
  },
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> WEBPACK = <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">'Application#webpack'</span>);
<span class="hljs-built_in">module</span>.exports = {
  get webpack() {
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>[WEBPACK]) {
      <span class="hljs-keyword">this</span>[WEBPACK] = <span class="hljs-keyword">new</span> FileSystem(<span class="hljs-keyword">this</span>);
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>[WEBPACK];
  },
};</code></pre>
<h4>本地开发webpack热更新内存存储读取和线上应用文件读取逻辑分离</h4>
<p>基于上面编译流程实现和webpack实例, 我们很容易实现koa方式的本地开发和线上运行代码分离. 下面我们就以vue 服务器渲染render实现为例:</p>
<p>在egg-view插件开发规范中,我们会在ctx上面挂载render方法, render方法会根据文件名进行文件读取, 模板与数据编译, 从而实现模板的渲染.如下就是controller的调用方式:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="exports.index = function* (ctx) {
  yield ctx.render('index/index.js', Model.getPage(1, 10));
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">exports.index = <span class="hljs-function"><span class="hljs-keyword">function</span>* (<span class="hljs-params">ctx</span>) </span>{
  <span class="hljs-keyword">yield</span> ctx.render(<span class="hljs-string">'index/index.js'</span>, Model.getPage(<span class="hljs-number">1</span>, <span class="hljs-number">10</span>));
};</code></pre>
<p>其中最关键的一步是根据文件名进行文件读取, 只要view插件设计时, 把文件读取的方法暴露出来(例如上面的koa的readFile),就可以实现本地开发webpack热更新内存存储读取.</p>
<ul><li><p>vue view engine设计实现:</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Engine = require('../../lib/engine');
const VUE_ENGINE = Symbol('Application#vue');

module.exports = {

  get vue() {
    if (!this[VUE_ENGINE]) {
      this[VUE_ENGINE] = new Engine(this);
    }
    return this[VUE_ENGINE];
  },
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> Engine = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../../lib/engine'</span>);
<span class="hljs-keyword">const</span> VUE_ENGINE = <span class="hljs-built_in">Symbol</span>(<span class="hljs-string">'Application#vue'</span>);

<span class="hljs-built_in">module</span>.exports = {

  get vue() {
    <span class="hljs-keyword">if</span> (!<span class="hljs-keyword">this</span>[VUE_ENGINE]) {
      <span class="hljs-keyword">this</span>[VUE_ENGINE] = <span class="hljs-keyword">new</span> Engine(<span class="hljs-keyword">this</span>);
    }
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>[VUE_ENGINE];
  },
};</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class Engine {
  constructor(app) {
    this.app = app;
    this.config = app.config.vue;
    this.cache = LRU(this.config.cache);
    this.fileLoader = new FileLoader(app, this.cache);
    this.renderer = vueServerRenderer.createRenderer();
    this.renderOptions = Object.assign({
      cache: this.cache,
    }, this.config.renderOptions);
  }

  createBundleRenderer(code, renderOptions) {
    return vueServerRenderer.createBundleRenderer(code, Object.assign({}, this.renderOptions, renderOptions));
  }

  * readFile(name) {
    return yield this.fileLoader.load(name);
  }

  render(code, data = {}, options = {}) {
    return new Promise((resolve, reject) => {
      this.createBundleRenderer(code, options.renderOptions).renderToString(data, (err, html) => {
        if (err) {
          reject(err);
        } else {
          resolve(html);
        }
      });
    });
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Engine</span> </span>{
  <span class="hljs-keyword">constructor</span>(app) {
    <span class="hljs-keyword">this</span>.app = app;
    <span class="hljs-keyword">this</span>.config = app.config.vue;
    <span class="hljs-keyword">this</span>.cache = LRU(<span class="hljs-keyword">this</span>.config.cache);
    <span class="hljs-keyword">this</span>.fileLoader = <span class="hljs-keyword">new</span> FileLoader(app, <span class="hljs-keyword">this</span>.cache);
    <span class="hljs-keyword">this</span>.renderer = vueServerRenderer.createRenderer();
    <span class="hljs-keyword">this</span>.renderOptions = <span class="hljs-built_in">Object</span>.assign({
      <span class="hljs-attr">cache</span>: <span class="hljs-keyword">this</span>.cache,
    }, <span class="hljs-keyword">this</span>.config.renderOptions);
  }

  createBundleRenderer(code, renderOptions) {
    <span class="hljs-keyword">return</span> vueServerRenderer.createBundleRenderer(code, <span class="hljs-built_in">Object</span>.assign({}, <span class="hljs-keyword">this</span>.renderOptions, renderOptions));
  }

  * readFile(name) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">yield</span> <span class="hljs-keyword">this</span>.fileLoader.load(name);
  }

  render(code, data = {}, options = {}) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-built_in">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve, reject</span>) =&gt;</span> {
      <span class="hljs-keyword">this</span>.createBundleRenderer(code, options.renderOptions).renderToString(data, (err, html) =&gt; {
        <span class="hljs-keyword">if</span> (err) {
          reject(err);
        } <span class="hljs-keyword">else</span> {
          resolve(html);
        }
      });
    });
  }
}</code></pre>
<ul><li><p>ctx.render 方法</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="class View {
  constructor(ctx) {
    this.app = ctx.app;
  }

  * render(name, locals, options = {}) {
    // 我们通过覆写app.vue.readFile即可改变文件读取逻辑
    const code = yield this.app.vue.readFile(name);
    return this.app.vue.render(code, { state: locals }, options);
  }

  renderString(tpl, locals) {
    return this.app.vue.renderString(tpl, locals);
  }
}

module.exports = View;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">View</span> </span>{
  <span class="hljs-keyword">constructor</span>(ctx) {
    <span class="hljs-keyword">this</span>.app = ctx.app;
  }

  * render(name, locals, options = {}) {
    <span class="hljs-comment">// 我们通过覆写app.vue.readFile即可改变文件读取逻辑</span>
    <span class="hljs-keyword">const</span> code = <span class="hljs-keyword">yield</span> <span class="hljs-keyword">this</span>.app.vue.readFile(name);
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.app.vue.render(code, { <span class="hljs-attr">state</span>: locals }, options);
  }

  renderString(tpl, locals) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.app.vue.renderString(tpl, locals);
  }
}

<span class="hljs-built_in">module</span>.exports = View;</code></pre>
<p>服务器view渲染插件实现 <a href="https://github.com/hubcarl/egg-view-vue" rel="nofollow noreferrer" target="_blank">egg-view-vue</a></p>
<ul><li><p>通过webpack实例覆写app.vue.readFile 改变从webpack内存读取文件内容.</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (app.vue) {
  app.vue.readFile = fileName => {
    const filePath = path.isAbsolute(fileName) ? fileName : path.join(app.config.view.root[0], fileName);
    if (/\.js$/.test(fileName)) {
      return app.webpack.fileSystem.readServerFile(filePath, fileName);
    }
    return app.webpack.fileSystem.readClientFile(filePath, fileName);
  };
}

app.messenger.on(app.webpack.Constant.EVENT_WEBPACK_CLIENT_BUILD_STATE, data => {
  if (data.state) {
    const filepath = app.config.webpackvue.build.manifest;
    const promise = app.webpack.fileSystem.readClientFile(filepath);
    promise.then(content => {
      fs.writeFileSync(filepath, content, 'utf8');
    });
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span> (app.vue) {
  app.vue.readFile = <span class="hljs-function"><span class="hljs-params">fileName</span> =&gt;</span> {
    <span class="hljs-keyword">const</span> filePath = path.isAbsolute(fileName) ? fileName : path.join(app.config.view.root[<span class="hljs-number">0</span>], fileName);
    <span class="hljs-keyword">if</span> (<span class="hljs-regexp">/\.js$/</span>.test(fileName)) {
      <span class="hljs-keyword">return</span> app.webpack.fileSystem.readServerFile(filePath, fileName);
    }
    <span class="hljs-keyword">return</span> app.webpack.fileSystem.readClientFile(filePath, fileName);
  };
}

app.messenger.on(app.webpack.Constant.EVENT_WEBPACK_CLIENT_BUILD_STATE, data =&gt; {
  <span class="hljs-keyword">if</span> (data.state) {
    <span class="hljs-keyword">const</span> filepath = app.config.webpackvue.build.manifest;
    <span class="hljs-keyword">const</span> promise = app.webpack.fileSystem.readClientFile(filepath);
    promise.then(<span class="hljs-function"><span class="hljs-params">content</span> =&gt;</span> {
      fs.writeFileSync(filepath, content, <span class="hljs-string">'utf8'</span>);
    });
  }
});</code></pre>
<p>webpack + vue 编译插件实现 <a href="https://github.com/hubcarl/egg-webpack-vue" rel="nofollow noreferrer" target="_blank">egg-webpack-vue</a></p>
<h2 id="articleHeader4">egg+webpack+vue工程解决方案</h2>
<ul>
<li><p><a href="https://github.com/hubcarl/egg-vue-webpack-boilerplate" rel="nofollow noreferrer" target="_blank">egg-vue-webpack-boilerplate</a>基于Vue多页面和单页面服务器渲染同构工程骨架项目</p></li>
<li><p><a href="https://github.com/hubcarl/egg-view-vue" rel="nofollow noreferrer" target="_blank">egg-view-vue</a> egg view plugin for vue</p></li>
<li><p><a href="https://github.com/hubcarl/egg-view-vue-ssr" rel="nofollow noreferrer" target="_blank">egg-view-vue-ssr</a> vue server side render solution for egg-view-vue</p></li>
<li><p><a href="https://github.com/hubcarl/egg-webpack" rel="nofollow noreferrer" target="_blank">egg-webpack</a> webpack dev server plugin for egg, support read file in memory and hot reload</p></li>
<li><p><a href="https://github.com/hubcarl/egg-webpack-vue" rel="nofollow noreferrer" target="_blank">egg-webpack-vue</a> egg webpack building solution for vue</p></li>
<li><p><a href="https://github.com/hubcarl/easywebpack" rel="nofollow noreferrer" target="_blank">easywebpack</a> programming instead of configuration, webpack is no longer complex</p></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
koa和egg项目webpack内存编译和热更新实现

## 原文链接
[https://segmentfault.com/a/1190000009377030](https://segmentfault.com/a/1190000009377030)

