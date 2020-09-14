---
title: 'webpack-dev-server使用方法，看完还不会的来找我~' 
date: 2019-02-05 2:30:09
hidden: true
slug: 94iy70l24n8
categories: [reprint]
---

{{< raw >}}

                    
<p>记录下<code>webpack-dev-server</code>的用法.</p>
<p>首先，我们来看看基本的<code>webpack.config.js</code>的写法</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    module.exports = {
        entry: './src/js/index.js',
        output: {
            path: './dist/js',
            filename: 'bundle.js'
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-built_in">module</span>.exports = {
        <span class="hljs-attr">entry</span>: <span class="hljs-string">'./src/js/index.js'</span>,
        <span class="hljs-attr">output</span>: {
            <span class="hljs-attr">path</span>: <span class="hljs-string">'./dist/js'</span>,
            <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle.js'</span>
        }
    }</code></pre>
<p>配置文件提供一个入口和一个出口，<code>webpack</code>根据这个来进行<code>js的打包和编译</code>工作。虽然<code>webpack</code>提供了<code>webpack --watch</code>的命令来动态监听文件的改变并实时打包，输出新<code>bundle.js</code>文件，这样文件多了之后打包速度会很慢，此外这样的打包的方式不能做到<code>hot replace</code>，即每次<code>webpack</code>编译之后，你还需要手动刷新浏览器。</p>
<p><code>webpack-dev-server</code>其中部分功能就能克服上面的2个问题。<code>webpack-dev-server</code>主要是启动了一个使用<code>express</code>的<code>Http服务器</code>。它的作用<strong>主要是用来伺服资源文件</strong>。此外这个<code>Http服务器</code>和<code>client</code>使用了<code>websocket</code>通讯协议，原始文件作出改动后，<code>webpack-dev-server</code>会实时的编译，但是最后的编译的文件并没有输出到目标文件夹，即上面配置的:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    output: {
        path: './dist/js',
        filename: 'bundle.js'
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    output: {
        <span class="hljs-attr">path</span>: <span class="hljs-string">'./dist/js'</span>,
        <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle.js'</span>
    }</code></pre>
<p><strong>注意：你启动webpack-dev-server后，你在目标文件夹中是看不到编译后的文件的,实时编译后的文件都保存到了内存当中。因此很多同学使用webpack-dev-server进行开发的时候都看不到编译后的文件</strong></p>
<p>下面来结合<code>webpack</code>的文档和<code>webpack-dev-server</code>里部分源码来说明下如何使用：</p>
<h2 id="articleHeader0">启动</h2>
<p>启动<code>webpack-dev-server</code>有2种方式：</p>
<ol>
<li><p>通过<code>cmd line</code></p></li>
<li><p>通过<code>Node.js API</code></p></li>
</ol>
<h2 id="articleHeader1">配置</h2>
<p>我主要讲解下<code>cmd line</code>的形式,<code>Node.js API</code>形式大家去看下官方文档。可通过<code>npm script</code>进行启动。我的目录结构是:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    app
    |__dist
    |   |__styles
    |   |__js
    |       |__bundle.js
    |   |__index.html
    |__src
    |   |__styles
    |   |__js
    |       |__index.js
    |__node_modules
    |__package.json
    |__webpack.config.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gherkin"><code>    app
    |<span class="hljs-string">__dist
    </span>|<span class="hljs-string">   </span>|__styles
    |<span class="hljs-string">   </span>|__js
    |<span class="hljs-string">       </span>|<span class="hljs-string">__bundle.js
    </span>|<span class="hljs-string">   </span>|<span class="hljs-string">__index.html
    </span>|__src
    |<span class="hljs-string">   </span>|__styles
    |<span class="hljs-string">   </span>|__js
    |<span class="hljs-string">       </span>|<span class="hljs-string">__index.js
    </span>|__node_modules
    |<span class="hljs-string">__package.json
    </span>|<span class="hljs-string">__webpack.config.js</span></code></pre>
<h3 id="articleHeader2">content-base</h3>
<p>设定<code>webpack-dev-server</code>伺服的<code>directory</code>。如果不进行设定的话，默认是在当前目录下。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack-dev-server --content-base ./dist
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ada"><code>webpack-dev-server <span class="hljs-comment">--content-base ./dist</span>
</code></pre>
<p>这个时候还要注意的一点就是在<code>webpack.config.js</code>文件里面，如果配置了<code>output</code>的<code>publicPath</code>这个字段的值的话，在<code>index.html</code>文件里面也应该做出调整。<strong>因为<code>webpack-dev-server</code>伺服的文件是相对<code>publicPath</code>这个路径的</strong>。因此，如果你的<code>webpack.config.js</code>配置成这样的：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    module.exports = {
        entry: './src/js/index.js',
        output: {
            path: './dist/js',
            filename: 'bundle.js'，
            publicPath: '/assets/'
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-built_in">module</span>.exports = {
        <span class="hljs-attr">entry</span>: <span class="hljs-string">'./src/js/index.js'</span>,
        <span class="hljs-attr">output</span>: {
            <span class="hljs-attr">path</span>: <span class="hljs-string">'./dist/js'</span>,
            <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle.js'</span>，
            publicPath: <span class="hljs-string">'/assets/'</span>
        }
    }</code></pre>
<p>那么，在<code>index.html</code>文件当中引入的路径也发生相应的变化:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <!DOCTYPE html>
    <html lang=&quot;en&quot;>
    <head>
        <meta charset=&quot;UTF-8&quot;>
        <title>Demo</title>
    </head>
    <body>
        <script src=&quot;assets/bundle.js&quot;></script>
    </body>
    </html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    &lt;!DOCTYPE html&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Demo<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"assets/bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>
<p>如果在<code>webpack.config.js</code>里面没有配置<code>output</code>的<code>publicPath</code>的话，那么<code>index.html</code>最后引入的文件<code>js文件</code>路径应该是下面这样的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <!DOCTYPE html>
    <html lang=&quot;en&quot;>
    <head>
        <meta charset=&quot;UTF-8&quot;>
        <title>Demo</title>
    </head>
    <body>
        <script src=&quot;bundle.js&quot;></script>
    </body>
    </html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    &lt;!DOCTYPE html&gt;
    <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Demo<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></span></code></pre>
<h2 id="articleHeader3">Automatic Refresh</h2>
<p><code>webpack-dev-server</code>支持2种自动刷新的方式：</p>
<ul>
<li><p>Iframe mode</p></li>
<li><p>inline mode</p></li>
</ul>
<p>这2种模式配置的方式和访问的路径稍微有点区别，最主要的区别还是<code>Iframe mode</code>是在网页中嵌入了一个<code>iframe</code>，将我们自己的应用注入到这个<code>iframe</code>当中去，因此每次你修改的文件后，都是这个<code>iframe</code>进行了<code>reload</code>。</p>
<p>通过查看<code>webpack-dev-server</code>的源码，<code>lib</code>路径下的<code>Server.js</code>文件，第38-48行，分别新建几个流，这几个流保存了<code>client</code>文件夹下的相关文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // Prepare live html page
    var livePage = this.livePage = new StreamCache();
    fs.createReadStream(path.join(__dirname, &quot;..&quot;, &quot;client&quot;, &quot;live.html&quot;)).pipe(livePage);

    // Prepare the live js file
    var liveJs = new StreamCache();
    fs.createReadStream(path.join(__dirname, &quot;..&quot;, &quot;client&quot;, &quot;live.bundle.js&quot;)).pipe(liveJs);

    // Prepare the inlined js file
    var inlinedJs = new StreamCache();
    fs.createReadStream(path.join(__dirname, &quot;..&quot;, &quot;client&quot;, &quot;index.bundle.js&quot;)).pipe(inlinedJs);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">    <span class="hljs-comment">// Prepare live html page</span>
    <span class="hljs-keyword">var</span> livePage = <span class="hljs-keyword">this</span>.livePage = <span class="hljs-keyword">new</span> StreamCache();
    fs.createReadStream(path.join(__dirname, <span class="hljs-string">".."</span>, <span class="hljs-string">"client"</span>, <span class="hljs-string">"live.html"</span>)).pipe(livePage);

    <span class="hljs-comment">// Prepare the live js file</span>
    <span class="hljs-keyword">var</span> liveJs = <span class="hljs-keyword">new</span> StreamCache();
    fs.createReadStream(path.join(__dirname, <span class="hljs-string">".."</span>, <span class="hljs-string">"client"</span>, <span class="hljs-string">"live.bundle.js"</span>)).pipe(liveJs);

    <span class="hljs-comment">// Prepare the inlined js file</span>
    <span class="hljs-keyword">var</span> inlinedJs = <span class="hljs-keyword">new</span> StreamCache();
    fs.createReadStream(path.join(__dirname, <span class="hljs-string">".."</span>, <span class="hljs-string">"client"</span>, <span class="hljs-string">"index.bundle.js"</span>)).pipe(inlinedJs);</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    // Init express server
    var app = this.app = new express();

    // middleware for serving webpack bundle
    this.middleware = webpackDevMiddleware(compiler, options);

    app.get(&quot;/__webpack_dev_server__/live.bundle.js&quot;, function(req, res) {
        res.setHeader(&quot;Content-Type&quot;, &quot;application/javascript&quot;);
        liveJs.pipe(res);
    });

    app.get(&quot;/webpack-dev-server.js&quot;, function(req, res) {
        res.setHeader(&quot;Content-Type&quot;, &quot;application/javascript&quot;);
        inlinedJs.pipe(res);
    });

    app.get(&quot;/webpack-dev-server/*&quot;, function(req, res) {
        res.setHeader(&quot;Content-Type&quot;, &quot;text/html&quot;);
        this.livePage.pipe(res);
    }.bind(this));
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haxe"><code>    <span class="hljs-comment">// Init express server</span>
    <span class="hljs-keyword">var</span> app = <span class="hljs-built_in">this</span>.app = <span class="hljs-keyword">new</span> <span class="hljs-type">express</span>();

    <span class="hljs-comment">// middleware for serving webpack bundle</span>
    <span class="hljs-built_in">this</span>.middleware = webpackDevMiddleware(compiler, options);

    app.<span class="hljs-keyword">get</span>(<span class="hljs-string">"/__webpack_dev_server__/live.bundle.js"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span></span>(req, res) {
        res.setHeader(<span class="hljs-string">"Content-Type"</span>, <span class="hljs-string">"application/javascript"</span>);
        liveJs.pipe(res);
    });

    app.<span class="hljs-keyword">get</span>(<span class="hljs-string">"/webpack-dev-server.js"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span></span>(req, res) {
        res.setHeader(<span class="hljs-string">"Content-Type"</span>, <span class="hljs-string">"application/javascript"</span>);
        inlinedJs.pipe(res);
    });

    app.<span class="hljs-keyword">get</span>(<span class="hljs-string">"/webpack-dev-server/*"</span>, <span class="hljs-function"><span class="hljs-keyword">function</span></span>(req, res) {
        res.setHeader(<span class="hljs-string">"Content-Type"</span>, <span class="hljs-string">"text/html"</span>);
        <span class="hljs-built_in">this</span>.livePage.pipe(res);
    }.bind(<span class="hljs-built_in">this</span>));
</code></pre>
<p>当使用<code>Iframe mode</code>时，请求<code>/webpack-dev-server/index.html</code>路径时，会返回<code>client/index.html</code>文件，这个文件的内容就是：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html><html><head><meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge&quot;/><meta charset=&quot;utf-8&quot;/><meta name=&quot;viewport&quot; content=&quot;width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0&quot;/><script type=&quot;text/javascript&quot; charset=&quot;utf-8&quot; src=&quot;/__webpack_dev_server__/live.bundle.js&quot;></script></head><body></body></html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;"><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"IE=edge"</span>/&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span>/&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, minimum-scale=1.0, maximum-scale=1.0"</span>/&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"utf-8"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"/__webpack_dev_server__/live.bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p>这个页面会请求<code>live.bundle.js</code>,其中里面会新建一个<code>Iframe</code>，你的应用就被注入到了这个<code>Iframe</code>当中。同时<code>live.bundle.js</code>中含有<code>socket.io</code>的<code>client</code>代码，这样它就能和<code>webpack-dev-server</code>建立的<code>http server</code>进行<code>websocket</code>通讯了。并根据返回的信息完成相应的动作。</p>
<p>而<code>Inline-mode</code>，是<code>webpack-dev-server</code>会在你的<code>webpack.config.js</code>的入口配置文件中再添加一个入口,</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    module.exports = {
        entry: {
            app: [
                'webpack-dev-server/client?http://localhost:8080/',
                './src/js/index.js'
            ]
        },
        output: {
            path: './dist/js',
            filename: 'bundle.js'
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code>    module.exports = {
        entry: {
            app: [
                <span class="hljs-string">'webpack-dev-server/client?http://localhost:8080/'</span>,
                <span class="hljs-string">'./src/js/index.js'</span>
            ]
        },
        output: {
            path: <span class="hljs-string">'./dist/js'</span>,
            filename: <span class="hljs-string">'bundle.js'</span>
        }
    }</code></pre>
<p>这样就完成了将<code>inlinedJS</code>打包进<code>bundle.js</code>里的功能，同时<code>inlinedJS</code>里面也包含了<code>socket.io</code>的<code>client</code>代码，可以和<code>webpack-dev-server</code>进行<code>websocket</code>通讯。</p>
<p>当然你也可以直接在你<code>index.html</code>引入这部分代码:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<script src=&quot;http://localhost:8080/webpack-dev-server.js&quot;></script>

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"http://localhost:8080/webpack-dev-server.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>

</code></pre>
<p>不过<code>Iframe mode</code>和<code>Inline mode</code>最后达到的效果都是一样的，都是监听文件的变化，然后再将编译后的文件推送到前端，完成页面的<code>reload</code>的。</p>
<h3 id="articleHeader4">Iframe mode</h3>
<p><code>Iframe mode</code>下<code>cmd line</code>不需要添加其他的内容，浏览器访问的路径是:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
localhost:8080/webpack-dev-server/index.html。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code>
localhost:<span class="hljs-number">8080</span>/webpack-dev-<span class="hljs-keyword">server</span>/<span class="hljs-keyword">index</span>.html。
</code></pre>
<p>这个时候这个页面的<code>header部分</code>会出现整个<code>reload消息</code>的状态。当时改变源文件的时候，即可以完成自动编译打包，页面自动刷新的功能。</p>
<p><span class="img-wrap"><img data-src="/img/bVB9lm?w=2550&amp;h=748" src="https://static.alili.tech/img/bVB9lm?w=2550&amp;h=748" alt="图片描述" title="图片描述" style="cursor: pointer;"></span></p>
<h3 id="articleHeader5">Inline mode</h3>
<p>使用<code>inline mode</code>的时候，<code>cmd line</code>需要写成：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack-dev-server --inline --content-base ./dist
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code><span class="hljs-comment">webpack</span><span class="hljs-literal">-</span><span class="hljs-comment">dev</span><span class="hljs-literal">-</span><span class="hljs-comment">server</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">inline</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">content</span><span class="hljs-literal">-</span><span class="hljs-comment">base</span> <span class="hljs-string">.</span><span class="hljs-comment">/dist</span>
</code></pre>
<p>这个时候访问的路径是:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="localhost:8080/index.html
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>localhost:<span class="hljs-number">8080</span>/index<span class="hljs-selector-class">.html</span>
</code></pre>
<p>也能完成自动编译打包，页面自动刷新的功能。但是没有的<code>header</code>部分的<code>reload</code>消息的显示，不过在控制台中会显示<code>reload</code>的状态。</p>
<p><span class="img-wrap"><img data-src="/img/bVB9ln?w=2548&amp;h=1444" src="https://static.alili.tech/img/bVB9ln?w=2548&amp;h=1444" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h2 id="articleHeader6">Hot Module Replacement</h2>
<p>开启<code>Hot Module Replacemen</code>t功能，在<code>cmd line</code>里面添加<code>--hot</code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack-dev-server --hot --inline --content-base ./dist
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code><span class="hljs-comment">webpack</span><span class="hljs-literal">-</span><span class="hljs-comment">dev</span><span class="hljs-literal">-</span><span class="hljs-comment">server</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">hot</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">inline</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">content</span><span class="hljs-literal">-</span><span class="hljs-comment">base</span> <span class="hljs-string">.</span><span class="hljs-comment">/dist</span>
</code></pre>
<h2 id="articleHeader7">其他配置选项</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="--quiet 控制台中不输出打包的信息
--compress 开启gzip压缩
--progress 显示打包的进度
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>-<span class="ruby">-quiet 控制台中不输出打包的信息
</span>-<span class="ruby">-compress 开启gzip压缩
</span>-<span class="ruby">-progress 显示打包的进度
</span></code></pre>
<p>还有一切其他的配置信息可以查阅官方文档:</p>
<p><a href="http://webpack.github.io/docs/webpack-dev-server.html#webpack-dev-server-cli" rel="nofollow noreferrer" target="_blank">webpack-dev-server-cli</a></p>
<p>这是我的<code>package.json</code>的文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    {
  &quot;name&quot;: &quot;reptile&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;description&quot;: &quot;&quot;,
  &quot;main&quot;: &quot;index.js&quot;,
  &quot;scripts&quot;: {
    &quot;dev&quot;: &quot;webpack-dev-server --devtool eval-source-map --progress --colors --hot --inline --content-base ./dist&quot;,
    &quot;build&quot;: &quot;webpack --progress --colors&quot;
  },
  &quot;author&quot;: &quot;&quot;,
  &quot;license&quot;: &quot;ISC&quot;,
  &quot;devDependencies&quot;: {
    &quot;babel-core&quot;: &quot;^6.13.2&quot;,
    &quot;babel-loader&quot;: &quot;^6.2.5&quot;,
    &quot;babel-preset-es2015&quot;: &quot;^6.13.2&quot;,
    &quot;babel-preset-react&quot;: &quot;^6.11.1&quot;,
    &quot;css-loader&quot;: &quot;^0.23.1&quot;,
    &quot;react&quot;: &quot;^15.3.1&quot;,
    &quot;react-dom&quot;: &quot;^15.3.1&quot;,
    &quot;style-loader&quot;: &quot;^0.13.1&quot;,
    &quot;webpack&quot;: &quot;^1.13.2&quot;,
    &quot;webpack-dev-server&quot;: &quot;^1.14.1&quot;
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs json"><code>    {
  <span class="hljs-attr">"name"</span>: <span class="hljs-string">"reptile"</span>,
  <span class="hljs-attr">"version"</span>: <span class="hljs-string">"1.0.0"</span>,
  <span class="hljs-attr">"description"</span>: <span class="hljs-string">""</span>,
  <span class="hljs-attr">"main"</span>: <span class="hljs-string">"index.js"</span>,
  <span class="hljs-attr">"scripts"</span>: {
    <span class="hljs-attr">"dev"</span>: <span class="hljs-string">"webpack-dev-server --devtool eval-source-map --progress --colors --hot --inline --content-base ./dist"</span>,
    <span class="hljs-attr">"build"</span>: <span class="hljs-string">"webpack --progress --colors"</span>
  },
  <span class="hljs-attr">"author"</span>: <span class="hljs-string">""</span>,
  <span class="hljs-attr">"license"</span>: <span class="hljs-string">"ISC"</span>,
  <span class="hljs-attr">"devDependencies"</span>: {
    <span class="hljs-attr">"babel-core"</span>: <span class="hljs-string">"^6.13.2"</span>,
    <span class="hljs-attr">"babel-loader"</span>: <span class="hljs-string">"^6.2.5"</span>,
    <span class="hljs-attr">"babel-preset-es2015"</span>: <span class="hljs-string">"^6.13.2"</span>,
    <span class="hljs-attr">"babel-preset-react"</span>: <span class="hljs-string">"^6.11.1"</span>,
    <span class="hljs-attr">"css-loader"</span>: <span class="hljs-string">"^0.23.1"</span>,
    <span class="hljs-attr">"react"</span>: <span class="hljs-string">"^15.3.1"</span>,
    <span class="hljs-attr">"react-dom"</span>: <span class="hljs-string">"^15.3.1"</span>,
    <span class="hljs-attr">"style-loader"</span>: <span class="hljs-string">"^0.13.1"</span>,
    <span class="hljs-attr">"webpack"</span>: <span class="hljs-string">"^1.13.2"</span>,
    <span class="hljs-attr">"webpack-dev-server"</span>: <span class="hljs-string">"^1.14.1"</span>
  }
}</code></pre>
<p>首先命令行：输入 <code>npm install</code> 所有依赖。然后输入<code>npm run dev</code>。在浏览器中打开localhost:8080/index.html，然后就可以愉快的开发咯。</p>
<h2 id="articleHeader8">本地搭建API Server</h2>
<p>如果你在本地还启动了一个<code>api server</code>,<code>port</code>为3000,这个<code>server</code>主要和你的前端应用进行数据交互。这个时候很显然会出现跨域的问题，那么这个时候，你前端应用的入口文件应当是用你自己启动的<code>api server</code>提供的。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var express = require('express');
    var app = express();
    
    app.get('/', function(req, res) {
        res.send('xxx/xxx/index.html'); //这个地方填写dist/index.html的路径
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>    <span class="hljs-keyword">var</span> express = <span class="hljs-built_in">require</span>(<span class="hljs-string">'express'</span>);
    <span class="hljs-keyword">var</span> app = express();
    
    app.get(<span class="hljs-string">'/'</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">req, res</span>) </span>{
        res.send(<span class="hljs-string">'xxx/xxx/index.html'</span>); <span class="hljs-comment">//这个地方填写dist/index.html的路径</span>
    })</code></pre>
<p>此外<code>webpack.config.js</code>:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    module.exports = {
        entry: './src/js/index.js',
        output: {
            path: './dist/js',
            filename: 'bundle.js',
            publicPath: 'localhost:8080/dist'
        },
        devServer: {
            '/get': {
                targer: 'localhost:3000',
                secure: false
            }
        }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code>    <span class="hljs-string">module.exports</span> <span class="hljs-string">=</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        entry:</span> <span class="hljs-string">'./src/js/index.js'</span><span class="hljs-string">,</span>
<span class="hljs-attr">        output:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">            path:</span> <span class="hljs-string">'./dist/js'</span><span class="hljs-string">,</span>
<span class="hljs-attr">            filename:</span> <span class="hljs-string">'bundle.js'</span><span class="hljs-string">,</span>
<span class="hljs-attr">            publicPath:</span> <span class="hljs-string">'localhost:8080/dist'</span>
        <span class="hljs-string">},</span>
<span class="hljs-attr">        devServer:</span> <span class="hljs-string">{</span>
            <span class="hljs-string">'/get'</span><span class="hljs-string">:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">                targer:</span> <span class="hljs-string">'localhost:3000'</span><span class="hljs-string">,</span>
<span class="hljs-attr">                secure:</span> <span class="hljs-literal">false</span>
            <span class="hljs-string">}</span>
        <span class="hljs-string">}</span>
    <span class="hljs-string">}</span></code></pre>
<p>将<code>publicPath</code>字段的内容配置为绝对路径。同时<code>index.html</code>文件中对<code>js</code>引用的路径也改为绝对路径</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    <script src=&quot;localhost:8080/dist/bundle.js&quot;></script>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code style="word-break: break-word; white-space: initial;">    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"localhost:8080/dist/bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span></code></pre>
<p>如果对<code>web-dev-server</code>还有其他问题的话，请留言告知。</p>
<p>另外2篇关于<code>webpack</code>的文章:</p>
<p><a href="https://segmentfault.com/a/1190000007962830">webpack1.x分包及异步加载套路</a><br><a href="https://segmentfault.com/a/1190000008279471" target="_blank">webpack2分包及异步加载套路</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack-dev-server使用方法，看完还不会的来找我~

## 原文链接
[https://segmentfault.com/a/1190000006670084](https://segmentfault.com/a/1190000006670084)

