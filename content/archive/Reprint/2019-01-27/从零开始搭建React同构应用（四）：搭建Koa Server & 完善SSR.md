---
title: '从零开始搭建React同构应用（四）：搭建Koa Server & 完善SSR' 
date: 2019-01-27 2:30:59
hidden: true
slug: c2y182aoru8
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">从零开始搭建React同构应用（四）：搭建Koa Server &amp; 完善SSR</h1>
<p>上一篇我们使用了CLI的方式测试了SSR，这篇文章来讲如何在前文的基础上搭建一个Koa Server，实现真正意义上的SSR。</p>
<p><a href="https://github.com/larry011/react-isomorph-demo" rel="nofollow noreferrer" target="_blank">demo在这</a></p>
<p>主要内容</p>
<ol>
<li><p>Koa搭建</p></li>
<li><p>完善SSR逻辑</p></li>
</ol>
<h2 id="articleHeader1">Koa搭建</h2>
<p>新建<a href="https://github.com/larry011/react-isomorph-demo/blob/master/server/index.js" rel="nofollow noreferrer" target="_blank">server/index.js</a>：</p>
<p>我们使用<a href="https://github.com/koajs/koa/tree/v2.x" rel="nofollow noreferrer" target="_blank">Koa v2.0</a>的版本；</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i koa@next -S;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code><span class="hljs-built_in">npm</span> i koa@next -S;
</code></pre>
<p>先搭建一个最简单的服务器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Koa = require(&quot;koa&quot;);
const app = new Koa();

app.use(ctx => {
  ctx.body = 'Hello Koa';
});

app.listen(8088, _ => {
    console.log('server started')
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> Koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">"koa"</span>);
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa();

app.use(<span class="hljs-function"><span class="hljs-params">ctx</span> =&gt;</span> {
  ctx.body = <span class="hljs-string">'Hello Koa'</span>;
});

app.listen(<span class="hljs-number">8088</span>, _ =&gt; {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'server started'</span>)
});</code></pre>
<p>添加一个<a href="https://github.com/larry011/react-isomorph-demo/blob/master/package.json#L6" rel="nofollow noreferrer" target="_blank">npm script</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;scripts&quot;: {
    &quot;start&quot;: &quot;node --harmony server/index&quot;, //启动HTTP服务器
    &quot;watch&quot;: &quot;webpack -d -w --progress --colors --bs&quot;,
    &quot;test-server&quot;: &quot;anywhere -p 18341 -d ./build&quot;,
    &quot;dist&quot;: &quot;cross-env NODE_ENV='production' webpack -p&quot;,
    &quot;test-ssr&quot;: &quot;node --harmony test/cli.js&quot;
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code>  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"start"</span>: <span class="hljs-string">"node --harmony server/index"</span>, <span class="hljs-comment">//启动HTTP服务器</span>
    <span class="hljs-string">"watch"</span>: <span class="hljs-string">"webpack -d -w --progress --colors --bs"</span>,
    <span class="hljs-string">"test-server"</span>: <span class="hljs-string">"anywhere -p 18341 -d ./build"</span>,
    <span class="hljs-string">"dist"</span>: <span class="hljs-string">"cross-env NODE_ENV='production' webpack -p"</span>,
    <span class="hljs-string">"test-ssr"</span>: <span class="hljs-string">"node --harmony test/cli.js"</span>
  },</code></pre>
<p>执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run start
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>npm <span class="hljs-keyword">run</span><span class="bash"> start
</span></code></pre>
<p>这样一个最简单的Koa框架就搭建起来，下面就可以往里面填充东西了。</p>
<h3 id="articleHeader2">配置router</h3>
<p>在添加router之前，我们需要加载webpack编译生成的HTML模板，这里我们没有使用<code>EJS</code>,<code>HBS</code>等Nodejs渲染引擎，我们而是使用<a href="https://www.npmjs.com/package/cheerio" rel="nofollow noreferrer" target="_blank">cheerio</a>来帮助我们操作HTML,<code>cheerio</code>可以让我们在Node环境下像使用<code>jQuery</code>一样来操作HTML，非常容易上手，<a href="https://www.npmjs.com/package/cheerio#api" rel="nofollow noreferrer" target="_blank">这里是它的API</a>，基本和jQuery无差别。</p>
<p>在<a href="https://github.com/larry011/react-isomorph-demo/blob/master/server/index.js" rel="nofollow noreferrer" target="_blank">server/index.js</a>增加：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const cheerio = require(&quot;cheerio&quot;);
const fs = require(&quot;fs&quot;);
const path = require(&quot;path&quot;);
const Promise = require(&quot;bluebird&quot;);
const serve = require('koa-static-server');
const readFileAsync = Promise.promisify(fs.readFile);

/**
 * 读取HTML模版，返回cheerio实例
 * @param path
 * @return {Promise.<*>}
 */
async function loadHTMLTemplate(path) {
    try {
        let content = await readFileAsync(path);
        return cheerio.load(content);

    } catch (e) {
        console.error(e);
        return false;
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> cheerio = <span class="hljs-built_in">require</span>(<span class="hljs-string">"cheerio"</span>);
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">"fs"</span>);
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">"path"</span>);
<span class="hljs-keyword">const</span> <span class="hljs-built_in">Promise</span> = <span class="hljs-built_in">require</span>(<span class="hljs-string">"bluebird"</span>);
<span class="hljs-keyword">const</span> serve = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-static-server'</span>);
<span class="hljs-keyword">const</span> readFileAsync = <span class="hljs-built_in">Promise</span>.promisify(fs.readFile);

<span class="hljs-comment">/**
 * 读取HTML模版，返回cheerio实例
 * @param path
 * @return {Promise.&lt;*&gt;}
 */</span>
<span class="hljs-keyword">async</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loadHTMLTemplate</span>(<span class="hljs-params">path</span>) </span>{
    <span class="hljs-keyword">try</span> {
        <span class="hljs-keyword">let</span> content = <span class="hljs-keyword">await</span> readFileAsync(path);
        <span class="hljs-keyword">return</span> cheerio.load(content);

    } <span class="hljs-keyword">catch</span> (e) {
        <span class="hljs-built_in">console</span>.error(e);
        <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>;
    }
}</code></pre>
<p>我们使用<a href="https://github.com/tunnckoCore/koa-better-router" rel="nofollow noreferrer" target="_blank">koa-better-router</a>中间件作为路由模块。我们添加一个router，在<a href="https://github.com/larry011/react-isomorph-demo/blob/master/server/index.js" rel="nofollow noreferrer" target="_blank">server/index.js</a>增加：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
const router = require('koa-better-router')().loadMethods();

router.get('/', async(ctx, next) => {

    let $ = await loadHTMLTemplate(path.resolve(__dirname, '../build/index.html'));

    if (!$) {
        return ctx.body = null;
    }

    return ctx.body = $.html();


});

app.use(router.middleware());
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
<span class="hljs-keyword">const</span> router = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-better-router'</span>)().loadMethods();

router.get(<span class="hljs-string">'/'</span>, <span class="hljs-keyword">async</span>(ctx, next) =&gt; {

    <span class="hljs-keyword">let</span> $ = <span class="hljs-keyword">await</span> loadHTMLTemplate(path.resolve(__dirname, <span class="hljs-string">'../build/index.html'</span>));

    <span class="hljs-keyword">if</span> (!$) {
        <span class="hljs-keyword">return</span> ctx.body = <span class="hljs-literal">null</span>;
    }

    <span class="hljs-keyword">return</span> ctx.body = $.html();


});

app.use(router.middleware());
</code></pre>
<p>执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run start
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>npm <span class="hljs-keyword">run</span><span class="bash"> start
</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVINHm?w=693&amp;h=86" src="https://static.alili.tech/img/bVINHm?w=693&amp;h=86" alt="clipboard.png" title="clipboard.png" style="cursor: pointer;"></span></p>
<p>我们会发现CSS,JS等文件没有被加载进来，因为没有对应的路由，下面我们配置静态文件服务。</p>
<h3 id="articleHeader3">配置静态文件服务</h3>
<p>我们不可能为所有的资源都写router，因此我们需要配置一个静态文件服务。这里我使用了<a href="https://github.com/pkoretic/koa-static-server" rel="nofollow noreferrer" target="_blank">koa-static-server</a>中间件。</p>
<p>我们以<code>build</code>目录作为资源文件根目录，在<a href="https://github.com/larry011/react-isomorph-demo/blob/master/server/index.js" rel="nofollow noreferrer" target="_blank">server/index.js</a>增加：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const serve = require('koa-static-server');
const readFileAsync = Promise.promisify(fs.readFile);
const RES_PATH = path.resolve(__dirname, '../build/');

//hfs
app.use(serve({rootDir: RES_PATH}));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">const</span> serve = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-static-server'</span>);
<span class="hljs-keyword">const</span> readFileAsync = <span class="hljs-built_in">Promise</span>.promisify(fs.readFile);
<span class="hljs-keyword">const</span> RES_PATH = path.resolve(__dirname, <span class="hljs-string">'../build/'</span>);

<span class="hljs-comment">//hfs</span>
app.use(serve({<span class="hljs-attr">rootDir</span>: RES_PATH}));</code></pre>
<p>执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run start
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>npm <span class="hljs-keyword">run</span><span class="bash"> start
</span></code></pre>
<p><span class="img-wrap"><img data-src="/img/bVINHz?w=698&amp;h=251" src="https://static.alili.tech/img/bVINHz?w=698&amp;h=251" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>资源可以被正确载入了。</p>
<h2 id="articleHeader4">完善SSR逻辑</h2>
<p>我们先添加一个API接口，方便模拟Node端的接口调用，在<a href="https://github.com/larry011/react-isomorph-demo/blob/master/server/index.js" rel="nofollow noreferrer" target="_blank">server/index.js</a>增加：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//API接口
router.get('/api/todo_list', async(ctx, next) => {

    return ctx.body = ['11', '222'];

});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//API接口</span>
router.get(<span class="hljs-string">'/api/todo_list'</span>, <span class="hljs-keyword">async</span>(ctx, next) =&gt; {

    <span class="hljs-keyword">return</span> ctx.body = [<span class="hljs-string">'11'</span>, <span class="hljs-string">'222'</span>];

});</code></pre>
<p>我们还是以<code>Index.jsx</code>为例：</p>
<p>将<code>test/cli.js</code>中的代码copy过来。修改<code>/</code>路由</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const Koa = require(&quot;koa&quot;);
const app = new Koa();
const router = require('koa-better-router')().loadMethods();
const cheerio = require(&quot;cheerio&quot;);
const fs = require(&quot;fs&quot;);
const path = require(&quot;path&quot;);
const Promise = require(&quot;bluebird&quot;);
const serve = require('koa-static-server');
const readFileAsync = Promise.promisify(fs.readFile);
const RES_PATH = path.resolve(__dirname, '../build/');
const fetch = require(&quot;isomorphic-fetch&quot;);

router.get('/', async(ctx, next) => {

    let $ = await loadHTMLTemplate(path.resolve(__dirname, '../build/index.html'));

    if (!$) {
        return ctx.body = null;
    }

    let IndexBundle = require(&quot;../build_server/index.bundle.js&quot;);

    //fetch接口数据
    let todoList = await(await fetch('http://localhost:8088/api/todo_list')).json();

    let initialData = {todoList};

    let instance = React.createElement(IndexBundle.default, initialData);

    let str = renderToString(instance);


    $('#wrap').html(str);

    //前后端数据要同步
    let syncScript = `<script id=&quot;server-data&quot;>window._SERVER_DATA=${JSON.stringify(initialData)}</script>`;

    $('head').append(syncScript);

    return ctx.body = $.html();


});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> Koa = <span class="hljs-built_in">require</span>(<span class="hljs-string">"koa"</span>);
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> Koa();
<span class="hljs-keyword">const</span> router = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-better-router'</span>)().loadMethods();
<span class="hljs-keyword">const</span> cheerio = <span class="hljs-built_in">require</span>(<span class="hljs-string">"cheerio"</span>);
<span class="hljs-keyword">const</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">"fs"</span>);
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">"path"</span>);
<span class="hljs-keyword">const</span> <span class="hljs-built_in">Promise</span> = <span class="hljs-built_in">require</span>(<span class="hljs-string">"bluebird"</span>);
<span class="hljs-keyword">const</span> serve = <span class="hljs-built_in">require</span>(<span class="hljs-string">'koa-static-server'</span>);
<span class="hljs-keyword">const</span> readFileAsync = <span class="hljs-built_in">Promise</span>.promisify(fs.readFile);
<span class="hljs-keyword">const</span> RES_PATH = path.resolve(__dirname, <span class="hljs-string">'../build/'</span>);
<span class="hljs-keyword">const</span> fetch = <span class="hljs-built_in">require</span>(<span class="hljs-string">"isomorphic-fetch"</span>);

router.get(<span class="hljs-string">'/'</span>, <span class="hljs-keyword">async</span>(ctx, next) =&gt; {

    <span class="hljs-keyword">let</span> $ = <span class="hljs-keyword">await</span> loadHTMLTemplate(path.resolve(__dirname, <span class="hljs-string">'../build/index.html'</span>));

    <span class="hljs-keyword">if</span> (!$) {
        <span class="hljs-keyword">return</span> ctx.body = <span class="hljs-literal">null</span>;
    }

    <span class="hljs-keyword">let</span> IndexBundle = <span class="hljs-built_in">require</span>(<span class="hljs-string">"../build_server/index.bundle.js"</span>);

    <span class="hljs-comment">//fetch接口数据</span>
    <span class="hljs-keyword">let</span> todoList = <span class="hljs-keyword">await</span>(<span class="hljs-keyword">await</span> fetch(<span class="hljs-string">'http://localhost:8088/api/todo_list'</span>)).json();

    <span class="hljs-keyword">let</span> initialData = {todoList};

    <span class="hljs-keyword">let</span> instance = React.createElement(IndexBundle.default, initialData);

    <span class="hljs-keyword">let</span> str = renderToString(instance);


    $(<span class="hljs-string">'#wrap'</span>).html(str);

    <span class="hljs-comment">//前后端数据要同步</span>
    <span class="hljs-keyword">let</span> syncScript = <span class="hljs-string">`&lt;script id="server-data"&gt;window._SERVER_DATA=<span class="hljs-subst">${<span class="hljs-built_in">JSON</span>.stringify(initialData)}</span>&lt;/script&gt;`</span>;

    $(<span class="hljs-string">'head'</span>).append(syncScript);

    <span class="hljs-keyword">return</span> ctx.body = $.html();


});</code></pre>
<p>这里要注意前后端数据要同步，我把Node端获取的数据放在<code>window._SERVER_DATA</code>中了，前端渲染的时候会优先使用<code>window._SERVER_DATA</code>来渲染。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (process.browser) {

    //初始数据，用于和server render数据同步
    let initialData = window._SERVER_DATA || {};

    let store = createStore(reducers, initialData, window.__REDUX_DEVTOOLS_EXTENSION__ &amp;&amp; window.__REDUX_DEVTOOLS_EXTENSION__());

    let App = connect(_ => _)(Layout);//用connect包装一下，这里只用到mapStateToProps，而且不对state加以过滤

    ReactDOM.render(
        <Provider store={store}>
            <App/>
        </Provider>,
        document.getElementById('wrap'));
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">if</span> (process.browser) {

    <span class="hljs-comment">//初始数据，用于和server render数据同步</span>
    <span class="hljs-keyword">let</span> initialData = <span class="hljs-built_in">window</span>._SERVER_DATA || {};

    <span class="hljs-keyword">let</span> store = createStore(reducers, initialData, <span class="hljs-built_in">window</span>.__REDUX_DEVTOOLS_EXTENSION__ &amp;&amp; <span class="hljs-built_in">window</span>.__REDUX_DEVTOOLS_EXTENSION__());

    <span class="hljs-keyword">let</span> App = connect(<span class="hljs-function"><span class="hljs-params">_</span> =&gt;</span> _)(Layout);<span class="hljs-comment">//用connect包装一下，这里只用到mapStateToProps，而且不对state加以过滤</span>

    ReactDOM.render(
        <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Provider</span> <span class="hljs-attr">store</span>=<span class="hljs-string">{store}</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">App</span>/&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">Provider</span>&gt;</span></span>,
        <span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'wrap'</span>));
}
</code></pre>
<p>执行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm run start
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>npm <span class="hljs-keyword">run</span><span class="bash"> start
</span></code></pre>
<p>访问<code>http://127.0.0.1:8088/</code></p>
<p><span class="img-wrap"><img data-src="/img/bVINIs?w=976&amp;h=286" src="https://static.alili.tech/img/bVINIs?w=976&amp;h=286" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p><span class="img-wrap"><img data-src="/img/bVINIu?w=417&amp;h=130" src="https://static.alili.tech/img/bVINIu?w=417&amp;h=130" alt="clipboard.png" title="clipboard.png" style="cursor: pointer; display: inline;"></span></p>
<p>可以看到<code>#wrap</code>中已经被填充渲染好的HTML文本了，Node端和前端的数据也同步了。 ^_^</p>
<p>至此，一个简单的SSR框架已经搭建完成，剩下的工作就是结合工作需要，在里面添砖加瓦啦。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
从零开始搭建React同构应用（四）：搭建Koa Server & 完善SSR

## 原文链接
[https://segmentfault.com/a/1190000008255221](https://segmentfault.com/a/1190000008255221)

