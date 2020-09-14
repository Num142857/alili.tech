---
title: 'hapi 起步' 
date: 2019-01-09 2:30:11
hidden: true
slug: 41gvf40bw3b
categories: [reprint]
---

{{< raw >}}

                    
<p>最近一直在学习hapiJs，有点koa2的基础以为会容易呢，但是全英文的API，不同于koa2的实现方式，看起来大写的懵啊，整理此文，希望能够帮助到一些想要入门hapi的新人。</p>
<h2 id="articleHeader0">1、搭建项目</h2>
<p>1.1 首先我们创建一个目录‘hapiDemo’作为项目目录，输入命令：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="makdir hapiDemo。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nginx"><code style="word-break: break-word; white-space: initial;"><span class="hljs-attribute">makdir</span> hapiDemo。</code></pre>
<p>1.2 打开项目目录，初始化,命令如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cd hapiDemo，
初始化：npm init，" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs bash"><code><span class="hljs-built_in">cd</span> hapiDemo，
初始化：npm init，</code></pre>
<p>1.3 项目基础配置：</p>
<p>安装hapi: npm install --save hapi；<br> 项目使用了ES6语法安装babel: npm intall --save hapi；<br> npm start默认是的启动文件是sever.js，本项目是index.js，修改启动命令，</p>
<p><span class="img-wrap"><img data-src="/img/bVQIOV?w=423&amp;h=65" src="https://static.alili.tech/img/bVQIOV?w=423&amp;h=65" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>下文中还是用了一些插件，请自行安装。</p>
<p>1.4 初始化并安装hapi是第一步，hapiDemo 项目的基础项目结构如下图：<br><span class="img-wrap"><img data-src="/img/bVQsvf?w=334&amp;h=510" src="https://static.alili.tech/img/bVQsvf?w=334&amp;h=510" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>这些文件的作用是：</p>
<ul>
<li><p>config：配置文件目录，db_config:数据库的配置信息，plugin_config：注册插件的相关信息</p></li>
<li><p>controllers：controllers下是业务逻辑</p></li>
<li><p>models：model 层</p></li>
<li><p>public：静态文件</p></li>
<li><p>routes：路由信息</p></li>
<li><p>log：日志信息</p></li>
<li><p>index.js：项目启动入口文件</p></li>
<li><p>server.js：服务配置信息</p></li>
</ul>
<h2 id="articleHeader1">2、hapi start</h2>
<p>2.1 创建启动服务配置文件server.js，输入一下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Hapi = require('hapi');


//Create a hapi server
var server = new Hapi.Server();

/**************server config********/
let connectionOptions={
    port: 3333,
    host: 'localhost'
};
server.connection(connectionOptions);

// Export the server to be required elsewhere.
module.exports = server;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-keyword">const</span> Hapi = require(<span class="hljs-string">'hapi'</span>);


<span class="hljs-comment">//Create a hapi server</span>
<span class="hljs-keyword">var</span> server = <span class="hljs-keyword">new</span> Hapi.Server();

<span class="hljs-comment"><span class="markdown">/<span class="hljs-strong">*****</span><span class="hljs-strong">*****</span><span class="hljs-strong">****server config**</span><span class="hljs-strong">*****</span>*/</span></span>
let connectionOptions={
    port: <span class="hljs-number">3333</span>,
    host: <span class="hljs-string">'localhost'</span>
};
server.connection(connectionOptions);

<span class="hljs-comment">// Export the server to be required elsewhere.</span>
module.exports = server;
</code></pre>
<p>2.2 配置完服务文件，现在我们来启动服务，先新建一个index.js文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const server=require('./server');

server.start(err=>{
    if(err) throw err;
   console.log( `Server running at: ${server.info.uri}`);
});

输入node启动命令：npm start
将会显示：Server running at: http://localhost:3333。OK，项目启动成功。
我们在浏览器中输入url:http://localhost:3333,
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> server=<span class="hljs-built_in">require</span>(<span class="hljs-string">'./server'</span>);

server.start(<span class="hljs-function"><span class="hljs-params">err</span>=&gt;</span>{
    <span class="hljs-keyword">if</span>(err) <span class="hljs-keyword">throw</span> err;
   <span class="hljs-built_in">console</span>.log( <span class="hljs-string">`Server running at: <span class="hljs-subst">${server.info.uri}</span>`</span>);
});

输入node启动命令：npm start
将会显示：Server running at: http:<span class="hljs-comment">//localhost:3333。OK，项目启动成功。</span>
我们在浏览器中输入url:http:<span class="hljs-comment">//localhost:3333,</span>
</code></pre>
<p><span class="img-wrap"><img data-src="/img/bVQDgX?w=681&amp;h=188" src="https://static.alili.tech/img/bVQDgX?w=681&amp;h=188" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>找不到路由。</p>
<h2 id="articleHeader2">3 处理路由</h2>
<p>3.1  将路由文件放在routes文件夹里，我们将创建多个路由，分模块创建，首先修改server.js文件,新增如下代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const route=require('./routes');
    
// Add the server routes
route.forEach(function(api){
    server.route(api);
});

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-keyword">const</span> route=<span class="hljs-keyword">require</span>(<span class="hljs-string">'./routes'</span>);
    
<span class="hljs-comment">// Add the server routes</span>
route.<span class="hljs-keyword">forEach</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(api)</span></span>{
    server.route(api);
});

</code></pre>
<p>在routes新建index.js,每新增一个路由文件，在index.js文件中引入。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports=[
        require(__dirname+'/helloWorld.js'),
        require(__dirname+'/login.js'),
        require(__dirname+'/file.js'),
        require(__dirname+'/auth.js')
    ]
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">module</span>.exports=[
        <span class="hljs-built_in">require</span>(__dirname+<span class="hljs-string">'/helloWorld.js'</span>),
        <span class="hljs-built_in">require</span>(__dirname+<span class="hljs-string">'/login.js'</span>),
        <span class="hljs-built_in">require</span>(__dirname+<span class="hljs-string">'/file.js'</span>),
        <span class="hljs-built_in">require</span>(__dirname+<span class="hljs-string">'/auth.js'</span>)
    ]
</code></pre>
<p>3.2 定义路由需要三个基础元素：path,method,handler。Methods的选项可以是任何有效的HTTP方法，也可以是方法数组。path选项必须是字符串，尽管它可以包含命名参数。若要在路径中命名参数，只需用{ }将其包装。handler选项是一个函数，它接受两个参数：request和request。<br>在routes里新建一个helloWorld.js：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" let index={
    method: 'GET',
    path: '/',
    handler: function(request, reply){
        reply('hello,world');
    }
};
let hello={
    method: ['GET', 'POST'],
    path: '/hello/{user?}',
    handler: function (request, reply) {
        reply('Hello ' + encodeURIComponent(request.params.user) + '!');
    }
};
module.exports=[index,hello];
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code> <span class="hljs-keyword">let</span> index={
    <span class="hljs-attr">method</span>: <span class="hljs-string">'GET'</span>,
    <span class="hljs-attr">path</span>: <span class="hljs-string">'/'</span>,
    <span class="hljs-attr">handler</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">request, reply</span>)</span>{
        reply(<span class="hljs-string">'hello,world'</span>);
    }
};
<span class="hljs-keyword">let</span> hello={
    <span class="hljs-attr">method</span>: [<span class="hljs-string">'GET'</span>, <span class="hljs-string">'POST'</span>],
    <span class="hljs-attr">path</span>: <span class="hljs-string">'/hello/{user?}'</span>,
    <span class="hljs-attr">handler</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">request, reply</span>) </span>{
        reply(<span class="hljs-string">'Hello '</span> + <span class="hljs-built_in">encodeURIComponent</span>(request.params.user) + <span class="hljs-string">'!'</span>);
    }
};
<span class="hljs-built_in">module</span>.exports=[index,hello];
</code></pre>
<p>保存重启服务，在浏览器中访问,显示如下：</p>
<p><span class="img-wrap"><img data-src="/img/bVQDtj?w=460&amp;h=80" src="https://static.alili.tech/img/bVQDtj?w=460&amp;h=80" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVQD4H?w=467&amp;h=100" src="https://static.alili.tech/img/bVQD4H?w=467&amp;h=100" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span><br>更多用法请查看api：<a href="https://hapijs.com/api#route-configuration" rel="nofollow noreferrer" target="_blank">https://hapijs.com/api#route-...</a></p>
<h2 id="articleHeader3">4 加载插件</h2>
<p>一般在nodeJS中，我们加载一个插件，安装后使用require 插件名称就OK了，但是在hapiJS中，需要通过server.register()方法引入。<br>以下文中使用处理静态文件的插件 inert 举例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="server.register(require('inert'), (err) => {
    if (err) {
        console.error('Failed to load a plugin:', err);
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code>server.register(<span class="hljs-built_in">require</span>(<span class="hljs-string">'inert'</span>), <span class="hljs-function"><span class="hljs-params">(err)</span> =&gt;</span> {
    <span class="hljs-keyword">if</span> (err) {
        <span class="hljs-built_in">console</span>.error(<span class="hljs-string">'Failed to load a plugin:'</span>, err);
    }
});</code></pre>
<p>但不是所有的插件都需要使用server.register（）引入，直接使用require即可。<br>为什么使用server.register()引用，我至今不是很清楚。</p>
<p>在本项目中，我把所有的插架配置放在了config/plugin_config.js中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const SwaggerOptions = {
    info: {
        'title': 'hapiDemo API Documentation',
        'version': '0.0.1'
    }
};

const goodOptions = {
    ops: {
        interval: 1000
    },
    reporters: {
        myConsoleReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', response: '*' }]
        }, {
            module: 'good-console'
        }, 'stdout'],
        myFileReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ log: '*', response: '*' ,request:'*'}]
        }, {
            module: 'good-squeeze',
            name: 'SafeJson'
        }, {
            module: 'good-file',
            args: ['./log/fixtures/awesome_log']
        }],
        myHTTPReporter: [{
            module: 'good-squeeze',
            name: 'Squeeze',
            args: [{ error: '*' }]
        }, {
            module: 'good-http',
            args: ['http://prod.logs:3000', {
                wreck: {
                    headers: { 'x-api-key': 12345 }
                }
            }]
        }]
    }
};
module.exports = [
    {
        register:require('good'),
        goodOptions,
    },
    {
      register:require('hapi-auth-jwt2')
    },
    {
        register:require('inert')
    },
    {
        register:require('hapi-auth-basic')
    },
    {
        register:require('./../auth')
    },
    {
        'register': require('hapi-swagger'),
        'options': SwaggerOptions
    },
    {
        register:require('vision')
    }
];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>const SwaggerOptions = {
    info: {
        <span class="hljs-string">'title'</span>: <span class="hljs-string">'hapiDemo API Documentation'</span>,
        <span class="hljs-string">'version'</span>: <span class="hljs-string">'0.0.1'</span>
    }
};

const goodOptions = {
    ops: {
        interval: <span class="hljs-number">1000</span>
    },
    reporters: {
        myConsoleReporter: [{
            module: <span class="hljs-string">'good-squeeze'</span>,
            name: <span class="hljs-string">'Squeeze'</span>,
            args: [{ log: <span class="hljs-string">'*'</span>, response: <span class="hljs-string">'*'</span> }]
        }, {
            module: <span class="hljs-string">'good-console'</span>
        }, <span class="hljs-string">'stdout'</span>],
        myFileReporter: [{
            module: <span class="hljs-string">'good-squeeze'</span>,
            name: <span class="hljs-string">'Squeeze'</span>,
            args: [{ log: <span class="hljs-string">'*'</span>, response: <span class="hljs-string">'*'</span> ,request:<span class="hljs-string">'*'</span>}]
        }, {
            module: <span class="hljs-string">'good-squeeze'</span>,
            name: <span class="hljs-string">'SafeJson'</span>
        }, {
            module: <span class="hljs-string">'good-file'</span>,
            args: [<span class="hljs-string">'./log/fixtures/awesome_log'</span>]
        }],
        myHTTPReporter: [{
            module: <span class="hljs-string">'good-squeeze'</span>,
            name: <span class="hljs-string">'Squeeze'</span>,
            args: [{ error: <span class="hljs-string">'*'</span> }]
        }, {
            module: <span class="hljs-string">'good-http'</span>,
            args: [<span class="hljs-string">'http://prod.logs:3000'</span>, {
                wreck: {
                    headers: { <span class="hljs-string">'x-api-key'</span>: <span class="hljs-number">12345</span> }
                }
            }]
        }]
    }
};
module.exports = [
    {
        register:require(<span class="hljs-string">'good'</span>),
        goodOptions,
    },
    {
      register:require(<span class="hljs-string">'hapi-auth-jwt2'</span>)
    },
    {
        register:require(<span class="hljs-string">'inert'</span>)
    },
    {
        register:require(<span class="hljs-string">'hapi-auth-basic'</span>)
    },
    {
        register:require(<span class="hljs-string">'./../auth'</span>)
    },
    {
        <span class="hljs-string">'register'</span>: require(<span class="hljs-string">'hapi-swagger'</span>),
        <span class="hljs-string">'options'</span>: SwaggerOptions
    },
    {
        register:require(<span class="hljs-string">'vision'</span>)
    }
];</code></pre>
<p>在server.js中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const plugins=require('./config/plugin_config');

//Register all plugins
server.register(plugins, function (err) {
    if (err) {
        throw err; // something bad happened loading a plugin
    }
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> plugins=<span class="hljs-built_in">require</span>(<span class="hljs-string">'./config/plugin_config'</span>);

<span class="hljs-comment">//Register all plugins</span>
server.register(plugins, <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">err</span>) </span>{
    <span class="hljs-keyword">if</span> (err) {
        <span class="hljs-keyword">throw</span> err; <span class="hljs-comment">// something bad happened loading a plugin</span>
    }
});
</code></pre>
<h2 id="articleHeader4">5 渲染静态文件和视图</h2>
<p>5.1 在Web应用程序中，不可避免地，需要提供一个简单的文件，图片或者静态html。在hapi 中使用 <a href="https://github.com/hapijs/inert" rel="nofollow noreferrer" target="_blank">inert</a> 插件来处理静态文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" npm install --save inert " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;"> npm <span class="hljs-keyword">install</span> <span class="hljs-comment">--save inert </span></code></pre>
<p>在routes文件夹中创建一个file.js：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let static={
    method: 'GET',
    path: '/staticFile',
    handler: function (request, reply) {
        reply.file('./public/static.html');
    }
};
module.exports=static;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> <span class="hljs-keyword">static</span>={
    <span class="hljs-attr">method</span>: <span class="hljs-string">'GET'</span>,
    <span class="hljs-attr">path</span>: <span class="hljs-string">'/staticFile'</span>,
    <span class="hljs-attr">handler</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">request, reply</span>) </span>{
        reply.file(<span class="hljs-string">'./public/static.html'</span>);
    }
};
<span class="hljs-built_in">module</span>.exports=<span class="hljs-keyword">static</span>;
</code></pre>
<p>在public文件夹下新增一个static.html的文件，内容随意。保存然后运行。</p>
<p><span class="img-wrap"><img data-src="/img/bVQEmp?w=414&amp;h=84" src="https://static.alili.tech/img/bVQEmp?w=414&amp;h=84" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>5.2 hapi 可以使用模板渲染，hapi默认使用的是handlebars，要开始视图，首先我们必须在服务器上配置至少一个模板引擎。这是通过使用server.views方法做的,修改server.js文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="server.register(plugins, function (err) {
    server.views({
        engines: {
            'html': {
                module: require('handlebars')
            }
        },
        relativeTo:__dirname,
        path:'public/templates'
    });


    if (err) {
        throw err; // something bad happened loading a plugin
    }
});
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">server</span><span class="hljs-selector-class">.register</span>(plugins, function (err) {
    <span class="hljs-selector-tag">server</span><span class="hljs-selector-class">.views</span>({
        <span class="hljs-attribute">engines</span>: {
            <span class="hljs-string">'html'</span>: {
                <span class="hljs-attribute">module</span>: require(<span class="hljs-string">'handlebars'</span>)
            }
        },
        <span class="hljs-attribute">relativeTo</span>:__dirname,
        <span class="hljs-attribute">path</span>:<span class="hljs-string">'public/templates'</span>
    });


    <span class="hljs-selector-tag">if</span> (err) {
        <span class="hljs-selector-tag">throw</span> <span class="hljs-selector-tag">err</span>; <span class="hljs-comment">// something bad happened loading a plugin</span>
    }
});
</code></pre>
<p>加载 <a href="https://github.com/hapijs/vision" rel="nofollow noreferrer" target="_blank">vision</a> 插件，它增加了模板渲染支持哈啤。<br>更多配置项：<a href="https://hapijs.com/tutorials/views?lang=en_US" rel="nofollow noreferrer" target="_blank">https://hapijs.com/tutorials/...</a><br>渲染势图，在file.js文件中新增路由：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let temp={
    method: 'GET',
    path: '/view',
    config: {
        auth: false,
        handler: function (request, reply) {
            reply.view('login');
        }
    }
};
module.exports=[static,temp];
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> temp={
    <span class="hljs-attr">method</span>: <span class="hljs-string">'GET'</span>,
    <span class="hljs-attr">path</span>: <span class="hljs-string">'/view'</span>,
    <span class="hljs-attr">config</span>: {
        <span class="hljs-attr">auth</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">handler</span>: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">request, reply</span>) </span>{
            reply.view(<span class="hljs-string">'login'</span>);
        }
    }
};
<span class="hljs-built_in">module</span>.exports=[<span class="hljs-keyword">static</span>,temp];
</code></pre>
<p>login的内容自行填充</p>
<h2 id="articleHeader5">6 访问数据库</h2>
<p>在web应用程序中，我们可能写特别多数据库访问层的代码，数据库保存，删除，读取，那hapi如何访问数据库呢？本demo以MySQL为例。<br>不懂数据库的程序员不是好程序员，但是我早早就把数据库的一点皮毛还给了老师，我选择Node的ORM框架Sequelize来操作数据库。<br>hapi-sequelize插件对sequelize做了很简单的封装,但是它对Hapi和sequelize的版本有要求，在本项目中没有使用，有兴趣的的可以研究 <a href="https://github.com/danecando/hapi-sequelize" rel="nofollow noreferrer" target="_blank">https://github.com/danecando/...</a><br>6.1  在server.js添加代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const models=require('./models');
//Connect database
var initDb = function(){
    var sequelize = models.sequelize;
    //Determine if the database connection is successful
     sequelize.sync({force: false}).then(function() {
        console.log(&quot;connection successed&quot;);
     }).catch(function(err){
        console.log(&quot;connection failed due to error: %s&quot;, err);
     });    
};
 initDb();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> models=<span class="hljs-built_in">require</span>(<span class="hljs-string">'./models'</span>);
<span class="hljs-comment">//Connect database</span>
<span class="hljs-keyword">var</span> initDb = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> sequelize = models.sequelize;
    <span class="hljs-comment">//Determine if the database connection is successful</span>
     sequelize.sync({<span class="hljs-attr">force</span>: <span class="hljs-literal">false</span>}).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"connection successed"</span>);
     }).catch(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">err</span>)</span>{
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"connection failed due to error: %s"</span>, err);
     });    
};
 initDb();</code></pre>
<p>6.2 使用Sequelize操作MySQL需要先做两件准备工作，<br>（1）创建一个sequelize对象实例,连接数据库，在models新增index.js,代码如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const fs        = require(&quot;fs&quot;);
const path      = require(&quot;path&quot;);
const Sequelize = require(&quot;sequelize&quot;);
const config = require('../config/db_config');
let db        = {};
//创建一个sequelize对象实例,连接数据库
let sequelize = new Sequelize(config.database, config.username, config.password,{
    host: config.host,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 30000
    }
});


fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(&quot;.&quot;) !== 0) &amp;&amp; (file !== &quot;index.js&quot;);
    })
    .forEach(function(file) {
        var model = sequelize[&quot;import&quot;](path.join(__dirname, file));
        db[model.name] = model;
    });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;   
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> fs        = <span class="hljs-built_in">require</span>(<span class="hljs-string">"fs"</span>);
<span class="hljs-keyword">const</span> path      = <span class="hljs-built_in">require</span>(<span class="hljs-string">"path"</span>);
<span class="hljs-keyword">const</span> Sequelize = <span class="hljs-built_in">require</span>(<span class="hljs-string">"sequelize"</span>);
<span class="hljs-keyword">const</span> config = <span class="hljs-built_in">require</span>(<span class="hljs-string">'../config/db_config'</span>);
<span class="hljs-keyword">let</span> db        = {};
<span class="hljs-comment">//创建一个sequelize对象实例,连接数据库</span>
<span class="hljs-keyword">let</span> sequelize = <span class="hljs-keyword">new</span> Sequelize(config.database, config.username, config.password,{
    <span class="hljs-attr">host</span>: config.host,
    <span class="hljs-attr">dialect</span>: <span class="hljs-string">'mysql'</span>,
    <span class="hljs-attr">pool</span>: {
        <span class="hljs-attr">max</span>: <span class="hljs-number">5</span>,
        <span class="hljs-attr">min</span>: <span class="hljs-number">0</span>,
        <span class="hljs-attr">idle</span>: <span class="hljs-number">30000</span>
    }
});


fs
    .readdirSync(__dirname)
    .filter(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">file</span>) </span>{
        <span class="hljs-keyword">return</span> (file.indexOf(<span class="hljs-string">"."</span>) !== <span class="hljs-number">0</span>) &amp;&amp; (file !== <span class="hljs-string">"index.js"</span>);
    })
    .forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">file</span>) </span>{
        <span class="hljs-keyword">var</span> model = sequelize[<span class="hljs-string">"import"</span>](path.join(__dirname, file));
        db[model.name] = model;
    });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

<span class="hljs-built_in">module</span>.exports = db;   
</code></pre>
<p>db_config文件是数据库的配置信息。<br>（2）定义模型文件user(在本项目中主要是实现登陆)，告诉Sequelize如何映射数据库表。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define(&quot;User&quot;, {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true

        },
        user_no:DataTypes.STRING,
        old_kn_userid:DataTypes.STRING,
        nickname:DataTypes.STRING,
        password:DataTypes.STRING,
    }, {
        freezeTableName: true, // Model 对应的表名将与model名相同
        timestamps: false
    });

    return User;
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs lasso"><code>module.exports = function(sequelize, DataTypes) {
    <span class="hljs-built_in">var</span> User = sequelize.<span class="hljs-class"><span class="hljs-keyword">define</span></span>(<span class="hljs-string">"User"</span>, {
        id:{
            <span class="hljs-keyword">type</span>: DataTypes.<span class="hljs-built_in">INTEGER</span>,
            primaryKey: <span class="hljs-literal">true</span>

        },
        user_no:DataTypes.<span class="hljs-built_in">STRING</span>,
        old_kn_userid:DataTypes.<span class="hljs-built_in">STRING</span>,
        nickname:DataTypes.<span class="hljs-built_in">STRING</span>,
        password:DataTypes.<span class="hljs-built_in">STRING</span>,
    }, {
        freezeTableName: <span class="hljs-literal">true</span>, <span class="hljs-comment">// Model 对应的表名将与model名相同</span>
        timestamps: <span class="hljs-literal">false</span>
    });

    <span class="hljs-keyword">return</span> User;
};</code></pre>
<p>更多Sequelize的学习可以参考：<a href="https://itbilu.com/nodejs/npm/VkYIaRPz-.html" rel="nofollow noreferrer" target="_blank">https://itbilu.com/nodejs/npm...</a><br>6.3 经过配置后，接下来我们可以在路由handler中使用这个实例啦。<br>新建一个login.js:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Joi=require('joi');
const controllers=require('../controllers');

let login2={
    method: 'get',
    path: '/tologin2',
    config: {
        validate:{
            query: {
                nickname:Joi.min(6).max(30)required(),//校验
            }
        },
        id: 'login2'
    },
    handler: controllers.user.login2,
};
module.exports=login2;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-keyword">const</span> Joi=require(<span class="hljs-string">'joi'</span>);
<span class="hljs-keyword">const</span> controllers=require(<span class="hljs-string">'../controllers'</span>);

let login2={
    method: <span class="hljs-string">'get'</span>,
    path: <span class="hljs-string">'/tologin2'</span>,
    <span class="hljs-built_in">config</span>: {
        validate:{
            query: {
                nickname:Joi.<span class="hljs-built_in">min</span>(<span class="hljs-number">6</span>).<span class="hljs-built_in">max</span>(<span class="hljs-number">30</span>)required(),<span class="hljs-comment">//校验</span>
            }
        },
        id: <span class="hljs-string">'login2'</span>
    },
    handler: controllers.user.login2,
};
<span class="hljs-keyword">module</span>.exports=login2;
</code></pre>
<p><a href="https://github.com/hapijs/joi" rel="nofollow noreferrer" target="_blank">joi</a> 是 hapijs 自带的数据校验模块，他已经高度封装常用的校验功能,更多用法：<a href="https://github.com/hapijs/joi/blob/v8.0.5/API.md" rel="nofollow noreferrer" target="_blank">https://github.com/hapijs/joi...</a>。<br>6.4 接下来我们就要访问数据库啦。</p>
<p>（1）新建index.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const requireDirectory = require('require-directory');
module.exports = requireDirectory(module);
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">const</span> requireDirectory = require(<span class="hljs-string">'require-directory'</span>);
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = requireDirectory(<span class="hljs-keyword">module</span>);
    </code></pre>
<p><a href="https://github.com/troygoode/node-require-directory" rel="nofollow noreferrer" target="_blank">require-directory</a>的作用是递归遍历指定目录，require()每个文件，并返回一个包含这些模块嵌套的hash结构。<br>(2)user.js:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let models=require('../models')
module.exports={
    login2:function(request,reply){

        let userInfo=models.User.findOne({
            where:{
                nickname: request.query.nickname
            }
        }).then(function(result){
            let reponseMess={};
            if(result!==null){
                reponseMess={
                    code:1,
                    message:'已经在数据库中查询到'
                }
            }else{
                reponseMess={
                    code:-1,
                    message:'未已经在数据库中查询到'
                }
            }
            reply(reponseMess);

        });
    }
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">let</span> models=<span class="hljs-built_in">require</span>(<span class="hljs-string">'../models'</span>)
<span class="hljs-built_in">module</span>.exports={
    <span class="hljs-attr">login2</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">request,reply</span>)</span>{

        <span class="hljs-keyword">let</span> userInfo=models.User.findOne({
            <span class="hljs-attr">where</span>:{
                <span class="hljs-attr">nickname</span>: request.query.nickname
            }
        }).then(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">result</span>)</span>{
            <span class="hljs-keyword">let</span> reponseMess={};
            <span class="hljs-keyword">if</span>(result!==<span class="hljs-literal">null</span>){
                reponseMess={
                    <span class="hljs-attr">code</span>:<span class="hljs-number">1</span>,
                    <span class="hljs-attr">message</span>:<span class="hljs-string">'已经在数据库中查询到'</span>
                }
            }<span class="hljs-keyword">else</span>{
                reponseMess={
                    <span class="hljs-attr">code</span>:<span class="hljs-number">-1</span>,
                    <span class="hljs-attr">message</span>:<span class="hljs-string">'未已经在数据库中查询到'</span>
                }
            }
            reply(reponseMess);

        });
    }
};
</code></pre>
<p>简单的demo查询,用户是否已存在</p>
<p><span class="img-wrap"><img data-src="/img/bVQHUM?w=370&amp;h=186" src="https://static.alili.tech/img/bVQHUM?w=370&amp;h=186" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader6">7 自动生成swagger文档</h2>
<p>使用hapi写api时，有种代码既文档的感觉，而且这些代码也真的可以自动生成swagger文档。<br>使用hapi插件<a href="https://github.com/glennjones/hapi-swagger" rel="nofollow noreferrer" target="_blank">hapi-swagger</a>,简单配置下插件，先修改下plugin_config.js文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const SwaggerOptions = {
    info: {
        'title': 'hapiDemo API Documentation',
        'version': '0.0.1'
    }
};
module.exports = [
{
    'register': require('hapi-swagger'),
    'options': SwaggerOptions
},
];
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">const</span> SwaggerOptions = {
    info: {
        <span class="hljs-string">'title'</span>: <span class="hljs-string">'hapiDemo API Documentation'</span>,
        <span class="hljs-string">'version'</span>: <span class="hljs-string">'0.0.1'</span>
    }
};
<span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = [
{
    <span class="hljs-string">'register'</span>: require(<span class="hljs-string">'hapi-swagger'</span>),
    <span class="hljs-string">'options'</span>: SwaggerOptions
},
];
</code></pre>
<p>然后修改/tologin2:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" let login2={
    method: 'get',
    path: '/tologin2',
    config: {
        auth:false,
        description: 'Routing with parameters',
        notes: 'login api',
        tags: ['api'],//写上这句,开启生成swagger功能
        validate:{
            query: {
                nickname:Joi.required(),
            }
        },
        id: 'login2'
    },
    handler: controllers.user.login2,
};
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code> <span class="hljs-string">let</span> <span class="hljs-string">login2={</span>
<span class="hljs-attr">    method:</span> <span class="hljs-string">'get'</span><span class="hljs-string">,</span>
<span class="hljs-attr">    path:</span> <span class="hljs-string">'/tologin2'</span><span class="hljs-string">,</span>
<span class="hljs-attr">    config:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        auth:</span><span class="hljs-literal">false</span><span class="hljs-string">,</span>
<span class="hljs-attr">        description:</span> <span class="hljs-string">'Routing with parameters'</span><span class="hljs-string">,</span>
<span class="hljs-attr">        notes:</span> <span class="hljs-string">'login api'</span><span class="hljs-string">,</span>
<span class="hljs-attr">        tags:</span> <span class="hljs-string">['api'],//写上这句,开启生成swagger功能</span>
<span class="hljs-attr">        validate:</span><span class="hljs-string">{</span>
<span class="hljs-attr">            query:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                nickname:</span><span class="hljs-string">Joi.required(),</span>
            <span class="hljs-string">}</span>
        <span class="hljs-string">},</span>
<span class="hljs-attr">        id:</span> <span class="hljs-string">'login2'</span>
    <span class="hljs-string">},</span>
<span class="hljs-attr">    handler:</span> <span class="hljs-string">controllers.user.login2,</span>
<span class="hljs-string">};</span>
</code></pre>
<p>运行,打开 <a href="http://localhost:3333/documentation" rel="nofollow noreferrer" target="_blank">http://localhost:3333/documen...</a></p>
<p><span class="img-wrap"><img data-src="/img/bVQIxJ?w=1049&amp;h=343" src="https://static.alili.tech/img/bVQIxJ?w=1049&amp;h=343" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<h2 id="articleHeader7">8 测试</h2>
<p>未完待续……</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
hapi 起步

## 原文链接
[https://segmentfault.com/a/1190000010143528](https://segmentfault.com/a/1190000010143528)

