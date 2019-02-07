---
title: 'webpack 单页面应用实战' 
date: 2019-02-08 2:30:40
hidden: true
slug: 3fg47n2phie
categories: [reprint]
---

{{< raw >}}

                    
<p>这篇文章将介绍如何利用 webpack 进行单页面应用的开发，算是我在实际开发中的一些心得和体会,在这里给大家做一个分享。webpack 的介绍这里就不多说了，可以直接去<a href="http://webpack.github.io/docs/" rel="nofollow noreferrer" target="_blank">官网</a>查看。 关于这个单页面应用大家可以直接去我的github上查看<a href="https://github.com/huangshuwei/webpackForSPA" rel="nofollow noreferrer" target="_blank">https://github.com/huangshuwei/webpackForSPA</a>，我将结合这个项目去介绍。如果大家觉得这篇文章有不妥的地方，还请指出。</p>
<blockquote><p>这篇文章的目的是解决我们在开发中会遇到的问题，不是一篇基础教程，还请谅解。</p></blockquote>
<h2 id="articleHeader0">项目目录</h2>
<p>我将根据这个目录结构进行讲解</p>
<p><span class="img-wrap"><img data-src="/img/bVyK8w" src="https://static.alili.tech/img/bVyK8w" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<ul>
<li><p><strong>dist</strong>：发布的文件目录，即webpack编译输出的目录</p></li>
<li><p><strong>libs</strong>：放置公共的文件，如js、css、img、font等</p></li>
<li><p><strong>mockServer</strong>：模拟后端服务，即用webpack开发时模拟调用的后端服务（用nodejs服务模拟）</p></li>
<li><p><strong>node_modules</strong>：项目依赖的包</p></li>
<li><p><strong>src</strong>：资源文件，里面包含css、font、html、img、js</p></li>
<li><p><strong>package.json</strong>：项目配置</p></li>
<li><p><strong>webpack.config.js</strong>：webpack的配置文件</p></li>
</ul>
<h2 id="articleHeader1">项目的使用</h2>
<p>建议先运行一下这个项目，有一个大致的了解，再往下阅读。使用说明：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="首先克隆一份到你的本地
$ git clone https://github.com/huangshuwei/webpackForSPA.git

然后 cd 到 ‘webpackForSPA’目录下
$ cd webpackForSPA

接着你可以运行不同的命令查看结果

发布模式：
$ npm run build

开发模式：
$ npm run dev

热更新模式
$ npm run dev-hrm

如果使用了热更新模式，并且想要结合后端服务形式运行，那么cd 到‘mockServer’目录下，并执行node 服务：
$ cd mockServer

$ node server.js

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>首先克隆一份到你的本地
$ git <span class="hljs-keyword">clone</span> <span class="hljs-title">https</span>://github.com/huangshuwei/webpackForSPA.git

然后 cd 到 ‘webpackForSPA’目录下
$ cd webpackForSPA

接着你可以运行不同的命令查看结果

发布模式：
$ npm run build

开发模式：
$ npm run dev

热更新模式
$ npm run dev-hrm

如果使用了热更新模式，并且想要结合后端服务形式运行，那么cd 到‘mockServer’目录下，并执行<span class="hljs-keyword">node</span> <span class="hljs-title">服务：
$</span> cd mockServer

$ <span class="hljs-keyword">node</span> <span class="hljs-title">server</span>.js

</code></pre>
<h2 id="articleHeader2">区分开发、热更新、发布模式</h2>
<blockquote><p>一般开发时和发布时是不同的，比如开发时文件的访问目录包含‘dist’目录，但是发布上线时，一般会把‘dist’文件夹去掉。<br>当然还有其他的一些细节不同。</p></blockquote>
<p>开发模式：</p>
<ul>
<li><p>能看到webpack编译输出的文件</p></li>
<li><p>js、css、html文件不需要压缩</p></li>
<li><p>可以正确的运行编译输出后的文件</p></li>
<li><p>这种模式一般只是用来看webpack编译输出后的文件是否正确</p></li>
</ul>
<p>热更新模式：</p>
<ul>
<li><p>看不到webpack编译输出的文件</p></li>
<li><p>js、css、html文件不需要压缩</p></li>
<li><p>更改完文件后无需重新编译并自动刷新浏览器</p></li>
<li><p>可以结合后端服务开发，避过浏览器同源策略，如结合java、.net服务等</p></li>
</ul>
<p>发布模式：</p>
<ul>
<li><p>能看到webpack编译输出的文件</p></li>
<li><p>js、css、html文件压缩</p></li>
<li><p>文件的层级目录不需要包含‘dist’目录</p></li>
</ul>
<p>我区分开发、热更新、发布模式是通过配置‘package.json’文件的运行命令，有些人是通过创建多个不同的webpack的配置文件来达到想要的效果。</p>
<p>像<a href="https://github.com/webpack/react-starter" rel="nofollow noreferrer" target="_blank">这个项目</a>就是使用了多个webpack的配置文件。</p>
<h3 id="articleHeader3">配置命令</h3>
<p>这是在 package.json 文件中配置的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// package.json 文件
...
&quot;scripts&quot;: {
    &quot;build&quot;: &quot;webpack  --profile --progress --colors --display-error-details&quot;,
    &quot;dev&quot;: &quot;webpack  --display-modules --profile --progress --colors --display-error-details&quot;,
    &quot;dev-hrm&quot;: &quot;webpack-dev-server --config&quot;
  },
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code><span class="hljs-comment">//</span> <span class="hljs-comment">package</span><span class="hljs-string">.</span><span class="hljs-comment">json</span> <span class="hljs-comment">文件</span>
<span class="hljs-string">.</span><span class="hljs-string">.</span><span class="hljs-string">.</span>
<span class="hljs-comment">"scripts":</span> <span class="hljs-comment">{</span>
    <span class="hljs-comment">"build":</span> <span class="hljs-comment">"webpack</span>  <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">profile</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">progress</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">colors</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">display</span><span class="hljs-literal">-</span><span class="hljs-comment">error</span><span class="hljs-literal">-</span><span class="hljs-comment">details"</span><span class="hljs-string">,</span>
    <span class="hljs-comment">"dev":</span> <span class="hljs-comment">"webpack</span>  <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">display</span><span class="hljs-literal">-</span><span class="hljs-comment">modules</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">profile</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">progress</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">colors</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">display</span><span class="hljs-literal">-</span><span class="hljs-comment">error</span><span class="hljs-literal">-</span><span class="hljs-comment">details"</span><span class="hljs-string">,</span>
    <span class="hljs-comment">"dev</span><span class="hljs-literal">-</span><span class="hljs-comment">hrm":</span> <span class="hljs-comment">"webpack</span><span class="hljs-literal">-</span><span class="hljs-comment">dev</span><span class="hljs-literal">-</span><span class="hljs-comment">server</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">config"</span>
  <span class="hljs-comment">}</span><span class="hljs-string">,</span>
<span class="hljs-string">.</span><span class="hljs-string">.</span><span class="hljs-string">.</span></code></pre>
<ul>
<li><p>color 输出结果带彩色，比如：会用红色显示耗时较长的步骤</p></li>
<li><p>profile 输出性能数据，可以看到每一步的耗时</p></li>
<li><p>progress 输出当前编译的进度，以百分比的形式呈现</p></li>
<li><p>display-modules  默认情况下 node_modules 下的模块会被隐藏，加上这个参数可以显示这些被隐藏的模块</p></li>
<li><p>display-error-details 输出详细的错误信息</p></li>
<li><p>webpack-dev-server 将会开启热更新</p></li>
<li><p>更多请参考官网 <a href="https://webpack.github.io/docs/cli.html" rel="nofollow noreferrer" target="_blank">cli</a></p></li>
</ul>
<p>配置好了package.json文件,我们就可以这样运行</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 开发模式
npm run dev

// 热更新模式
npm run dev-hrm

// 发布模式
npm run build" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code>// 开发模式
npm <span class="hljs-keyword">run</span><span class="bash"> dev
</span>
// 热更新模式
npm <span class="hljs-keyword">run</span><span class="bash"> dev-hrm
</span>
// 发布模式
npm <span class="hljs-keyword">run</span><span class="bash"> build</span></code></pre>
<h3 id="articleHeader4">配置变量标识</h3>
<p>配置完了命令，当我们运行不同的命令时，我们可以通过‘process.env.npm_lifecycle_event’去获取当前运行的命令，根据不同的命令，我们可以按照自己的需要做相应的处理。比如开发模式时，允许开启调试，静态资源不要压缩；发布模式时，不允许调试，静态资源要压缩。具体如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js

// 获取当前运行的模式
var currentTarget = process.env.npm_lifecycle_event;

var debug,          // 是否是调试
    devServer,      // 是否是热更新模式
    minimize;       // 是否需要压缩

if (currentTarget == &quot;build&quot;) { // 发布模式

    debug = false, devServer = false, minimize = true;
    
} else if (currentTarget == &quot;dev&quot;) { // 开发模式

    debug = true, devServer = false, minimize = false;
    
} else if (currentTarget == &quot;dev-hrm&quot;) { // 热更新模式

    debug = true, devServer = true, minimize = false;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs nix"><code>// webpack.config.js

// 获取当前运行的模式
var <span class="hljs-attr">currentTarget</span> = process.env.npm_lifecycle_event;

var debug,          // 是否是调试
    devServer,      // 是否是热更新模式
    minimize;       // 是否需要压缩

<span class="hljs-keyword">if</span> (<span class="hljs-attr">currentTarget</span> == <span class="hljs-string">"build"</span>) { // 发布模式

    <span class="hljs-attr">debug</span> = <span class="hljs-literal">false</span>, <span class="hljs-attr">devServer</span> = <span class="hljs-literal">false</span>, <span class="hljs-attr">minimize</span> = <span class="hljs-literal">true</span>;
    
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-attr">currentTarget</span> == <span class="hljs-string">"dev"</span>) { // 开发模式

    <span class="hljs-attr">debug</span> = <span class="hljs-literal">true</span>, <span class="hljs-attr">devServer</span> = <span class="hljs-literal">false</span>, <span class="hljs-attr">minimize</span> = <span class="hljs-literal">false</span>;
    
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-attr">currentTarget</span> == <span class="hljs-string">"dev-hrm"</span>) { // 热更新模式

    <span class="hljs-attr">debug</span> = <span class="hljs-literal">true</span>, <span class="hljs-attr">devServer</span> = <span class="hljs-literal">true</span>, <span class="hljs-attr">minimize</span> = <span class="hljs-literal">false</span>;
}</code></pre>
<h2 id="articleHeader5">基础配置</h2>
<h3 id="articleHeader6">配置路径</h3>
<p>为了方便我们频繁使用路径，如下配置</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
var PATHS = {
    // 发布目录
    publicPath: debug ? '/webpackForSPA/dist/' : '/webpackForSPA/',

    // 公共资源目录
    libsPath: path.resolve(process.cwd(), './libs'),
    
    // src 资源目录
    srcPath: path.resolve(process.cwd(), 'src'),
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-comment">// webpack.config.js</span>
var PATHS = {
    <span class="hljs-comment">// 发布目录</span>
    publicPath: debug ? <span class="hljs-string">'/webpackForSPA/dist/'</span> : <span class="hljs-string">'/webpackForSPA/'</span>,

    <span class="hljs-comment">// 公共资源目录</span>
    libsPath: path.resolve(<span class="hljs-built_in">process</span>.cwd(), <span class="hljs-string">'./libs'</span>),
    
    <span class="hljs-comment">// src 资源目录</span>
    srcPath: path.resolve(<span class="hljs-built_in">process</span>.cwd(), <span class="hljs-string">'src'</span>),
}</code></pre>
<h3 id="articleHeader7">配置别名</h3>
<p>webpack的别名的目的就是简化我们的操作，引用资源时直接使用别名即可（和 <a href="http://seajs.org/docs/" rel="nofollow noreferrer" target="_blank">seajs</a> 里的别名用法一样）。配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
...
resolve:{
     alias: {
        // js
        jquery: path.join(PATHS.libsPath, &quot;js/jquery/jquery&quot;),
        underscore: path.join(PATHS.libsPath, &quot;js/underscore/underscore.js&quot;),

        // css
        bootstrapcss: path.join(PATHS.libsPath, &quot;css/bootstrap/bootstrap-3.3.5.css&quot;),
        indexcss: path.join(PATHS.srcPath, &quot;css/index.css&quot;),
    }
}
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// webpack.config.js</span>
...
resolve:{
     alias: {
        <span class="hljs-comment">// js</span>
        jquery: path.join(PATHS<span class="hljs-selector-class">.libsPath</span>, <span class="hljs-string">"js/jquery/jquery"</span>),
        underscore: path.join(PATHS<span class="hljs-selector-class">.libsPath</span>, <span class="hljs-string">"js/underscore/underscore.js"</span>),

        <span class="hljs-comment">// css</span>
        bootstrapcss: path.join(PATHS<span class="hljs-selector-class">.libsPath</span>, <span class="hljs-string">"css/bootstrap/bootstrap-3.3.5.css"</span>),
        indexcss: path.join(PATHS<span class="hljs-selector-class">.srcPath</span>, <span class="hljs-string">"css/index.css"</span>),
    }
}
...</code></pre>
<h3 id="articleHeader8">配置webpack编译入口</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
...
entry:{
    // 入口 js
    index: './src/js/index.js',
    // 公共js包含的文件
    common: [
        path.join(PATHS.libsPath, &quot;js/jquery/jquery.js&quot;),
        path.join(PATHS.libsPath, &quot;js/underscore/underscore.js&quot;)
    ],
}
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// webpack.config.js</span>
...
entry:{
    <span class="hljs-comment">// 入口 js</span>
    index: <span class="hljs-string">'./src/js/index.js'</span>,
    <span class="hljs-comment">// 公共js包含的文件</span>
    common: [
        path.join(PATHS<span class="hljs-selector-class">.libsPath</span>, <span class="hljs-string">"js/jquery/jquery.js"</span>),
        path.join(PATHS<span class="hljs-selector-class">.libsPath</span>, <span class="hljs-string">"js/underscore/underscore.js"</span>)
    ],
}
...</code></pre>
<h3 id="articleHeader9">配置webpack编译输出</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
...
output：{
    // 输出目录
    path: path.join(__dirname, 'dist'),

    // 发布后，资源的引用目录
    publicPath: PATHS.publicPath,

    // 文件名称
    filename: 'js/[name].js',

    // 按需加载模块时输出的文件名称
    chunkFilename: 'js/[name].js'
}
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// webpack.config.js</span>
...
<span class="hljs-selector-tag">output</span>：{
    <span class="hljs-comment">// 输出目录</span>
    <span class="hljs-attribute">path</span>: path.join(__dirname, <span class="hljs-string">'dist'</span>),

    <span class="hljs-comment">// 发布后，资源的引用目录</span>
    <span class="hljs-attribute">publicPath</span>: PATHS.publicPath,

    <span class="hljs-comment">// 文件名称</span>
    <span class="hljs-attribute">filename</span>: <span class="hljs-string">'js/[name].js'</span>,

    <span class="hljs-comment">// 按需加载模块时输出的文件名称</span>
    <span class="hljs-attribute">chunkFilename</span>: <span class="hljs-string">'js/[name].js'</span>
}
...</code></pre>
<h2 id="articleHeader10">提取css到单独的文件</h2>
<p>当我们在js文件中通过require('')引用js时，webpack 默认会将css文件与当前js文件打包一起，但是这种方式会阻塞页面的加载，因为css的执行要等待js文件加载进来。所以我们会把css从js文件中提取出来，放到一个单独的css文件中。这时我们要使用webpack的插件：<a href="https://github.com/webpack/extract-text-webpack-plugin" rel="nofollow noreferrer" target="_blank">extract-text-webpack-plugin</a>，配置如下：</p>
<p>引入插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
var ExtractTextPlugin = require(&quot;extract-text-webpack-plugin&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// webpack.config.js</span>
<span class="hljs-keyword">var</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"extract-text-webpack-plugin"</span>);</code></pre>
<p>配置 loader</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
...
loaders: [
    {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(&quot;style-loader&quot;, &quot;css-loader!postcss-loader&quot;)
    },
    ...
]
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-comment">// webpack.config.js</span>
...
loaders: [
    {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(<span class="hljs-string">"style-loader"</span>, <span class="hljs-string">"css-loader!postcss-loader"</span>)
    },
    ...
]
...</code></pre>
<p>配置 plugins</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
...
plugins:[
    new ExtractTextPlugin(&quot;css/[name].css&quot;, {allChunks: true}),
    ...
]
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">// webpack.config.js</span>
...
<span class="hljs-string">plugins:</span>[
    <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">"css/[name].css"</span>, {<span class="hljs-string">allChunks:</span> <span class="hljs-literal">true</span>}),
    ...
]
...</code></pre>
<h2 id="articleHeader11">公共js打包</h2>
<p>项目中，我们通常会有公共的js，比如 jquery、bootstrap、underscore 等，那么这时候我们需要将这些公共的js单独打包。这时我们需要用webpack自带的插件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
...
plugins:[
    // 会把 ‘entry’ 定义的 common 对应的两个js 打包为 ‘common.js’
    new webpack.optimize.CommonsChunkPlugin(&quot;common&quot;, 'js/[name].js', Infinity),
]
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// webpack.config.js</span>
...
plugins:[
    <span class="hljs-comment">// 会把 ‘entry’ 定义的 common 对应的两个js 打包为 ‘common.js’</span>
    new webpack<span class="hljs-selector-class">.optimize</span><span class="hljs-selector-class">.CommonsChunkPlugin</span>(<span class="hljs-string">"common"</span>, <span class="hljs-string">'js/[name].js'</span>, Infinity),
]
...</code></pre>
<h2 id="articleHeader12">资源添加版本号</h2>
<p>项目上线后，资源的版本号十分重要。资源没有版本号，即使重新发布，客户端浏览器可能会把老的资源缓存下来，导致无法下载最新的资源。webpack 支持给资源添加版本号，不仅仅是js、css,甚至font、img都可以添加版本号。我们可以通过webpack中的‘chunkhash’来解决。</p>
<p>首先要了解下webpack 中 [hash]、[chunkhash]、[chunkhash:8]的区别。</p>
<ul>
<li><p>[hash]：webpack编译会产生一个hash值</p></li>
<li><p>[chunkhash]：每个模块的hash值</p></li>
<li><p>[chunkhash:8]：取[chunkhash]的前8位</p></li>
</ul>
<blockquote><p>推荐发布模式使用版本号，其他模式无需使用，热更新模式不支持‘chunkhash’，但是支持‘hash’</p></blockquote>
<p>资源加版本号，那么我们的输出的部分都要做改动，并且要区分当前的命令模式，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
...
output：{
    // 输出目录
    path: path.join(__dirname, 'dist'),

    // 发布后，资源的引用目录
    publicPath: PATHS.publicPath,

    // 文件名称
    filename: devServer ? 'js/[name].js' : 'js/[name]-[chunkhash:8].js',

    // 按需加载模块时输出的文件名称
    chunkFilename: devServer ? 'js/[name].js' : 'js/[name]-[chunkhash:8].js'
}
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// webpack.config.js</span>
...
<span class="hljs-selector-tag">output</span>：{
    <span class="hljs-comment">// 输出目录</span>
    <span class="hljs-attribute">path</span>: path.join(__dirname, <span class="hljs-string">'dist'</span>),

    <span class="hljs-comment">// 发布后，资源的引用目录</span>
    <span class="hljs-attribute">publicPath</span>: PATHS.publicPath,

    <span class="hljs-comment">// 文件名称</span>
    <span class="hljs-attribute">filename</span>: devServer ? <span class="hljs-string">'js/[name].js'</span> : <span class="hljs-string">'js/[name]-[chunkhash:8].js'</span>,

    <span class="hljs-comment">// 按需加载模块时输出的文件名称</span>
    <span class="hljs-attribute">chunkFilename</span>: devServer ? <span class="hljs-string">'js/[name].js'</span> : <span class="hljs-string">'js/[name]-[chunkhash:8].js'</span>
}
...</code></pre>
<p>输出公共js的地方也要改动：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
...
plugins:[
    // 会把 ‘entry’ 定义的 common 对应的两个js 打包为 ‘common.js’
    new webpack.optimize.CommonsChunkPlugin(&quot;common&quot;, &quot;&quot; + (devServer ? 'js/[name].js' : &quot;js/[name]-[chunkhash:8].js&quot;), Infinity),
]
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-comment">// webpack.config.js</span>
...
plugins:[
    <span class="hljs-comment">// 会把 ‘entry’ 定义的 common 对应的两个js 打包为 ‘common.js’</span>
    new webpack.optimize.CommonsChunkPlugin(<span class="hljs-string">"common"</span>, <span class="hljs-string">""</span> + (devServer ? <span class="hljs-string">'js/[name].js'</span> : <span class="hljs-string">"js/[name]-[chunkhash:8].js"</span>), Infinity),
]
...</code></pre>
<h2 id="articleHeader13">页面自动引入含有版本号的文件</h2>
<p>有个版本号后，我们考虑如何通过html引用这些含有版本号的js、css、font、img。webpack每次编译后的资源 chunkhash 会随着内容的变化而变化，所以我们不可能每次都手动的更改html这些资源的引用路径。这时我们要用到webpack的插件：<a href="https://github.com/ampedandwired/html-webpack-plugin" rel="nofollow noreferrer" target="_blank">html-webpack-plugin</a>。这个插件的目的是生成html,也可以根据模板生成html，当然还有其他的功能，具体看插件介绍。下面是的配置：</p>
<p>引入插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
var HtmlWebpackPlugin = require('html-webpack-plugin');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// webpack.config.js</span>
<span class="hljs-keyword">var</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>);</code></pre>
<p>配置 plugins，生成需要的html</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
...
plugins:[
    new HtmlWebpackPlugin({
        filename: 'index.html',
        template: __dirname + '/src/index.html',
        inject: 'true'
    }),
    new HtmlWebpackPlugin({
        filename: 'html/hrm.html',
        template: __dirname + '/src/html/hrm.html',
        inject: false,
    }),
    new HtmlWebpackPlugin({
        filename: 'html/home.html',
        template: __dirname + '/src/html/home.html',
        inject: false,
    }),
]
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-comment">// webpack.config.js</span>
...
plugins:[
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
        filename: <span class="hljs-string">'index.html'</span>,
        template: __dirname + <span class="hljs-string">'/src/index.html'</span>,
        <span class="hljs-keyword">inject</span>: <span class="hljs-string">'true'</span>
    }),
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
        filename: <span class="hljs-string">'html/hrm.html'</span>,
        template: __dirname + <span class="hljs-string">'/src/html/hrm.html'</span>,
        <span class="hljs-keyword">inject</span>: <span class="hljs-keyword">false</span>,
    }),
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
        filename: <span class="hljs-string">'html/home.html'</span>,
        template: __dirname + <span class="hljs-string">'/src/html/home.html'</span>,
        <span class="hljs-keyword">inject</span>: <span class="hljs-keyword">false</span>,
    }),
]
...</code></pre>
<p>我们前面说过，webpack 默认只识别 js 文件，所以对于html也要使用对应的loader:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
...
loaders:[
     {test: /\.html$/,loader: &quot;html&quot;},
]
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">// webpack.config.js</span>
...
<span class="hljs-string">loaders:</span>[
     {<span class="hljs-string">test:</span> <span class="hljs-regexp">/\.html$/</span>,<span class="hljs-string">loader:</span> <span class="hljs-string">"html"</span>},
]
...</code></pre>
<h2 id="articleHeader14">引用图片和字体</h2>
<p>引用图片和字体，需要对应的loader,并且可以设置这些资源大小的临界值，当小于临界值的时候，字体或者图片文件会以base64的形式在html引用，否则则是以资源路径的形式引用。如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js

// 图片 loader
{
    test: /\.(png|gif|jpe?g)$/,
    loader: 'url-loader',
    query: {
        /*
         *  limit=10000 ： 10kb
         *  图片大小小于10kb 采用内联的形式，否则输出图片
         * */
        limit: 10000,
        name: '/img/[name]-[hash:8].[ext]'
    }
},

// 字体loader
{
    test: /\.(eot|woff|woff2|ttf|svg)$/,
    loader: 'url-loader',
    query: {
        limit: 5000,
        name: '/font/[name]-[hash:8].[ext]'
    }
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code><span class="hljs-comment">// webpack.config.js</span>

<span class="hljs-comment">// 图片 loader</span>
{
    test: <span class="hljs-regexp">/\.(png|gif|jpe?g)$/</span>,
    loader: <span class="hljs-string">'url-loader'</span>,
    query: {
        <span class="hljs-comment">/*
         *  limit=10000 ： 10kb
         *  图片大小小于10kb 采用内联的形式，否则输出图片
         * */</span>
        limit: <span class="hljs-number">10000</span>,
        name: <span class="hljs-string">'/img/[name]-[hash:8].[ext]'</span>
    }
},

<span class="hljs-comment">// 字体loader</span>
{
    test: <span class="hljs-regexp">/\.(eot|woff|woff2|ttf|svg)$/</span>,
    loader: <span class="hljs-string">'url-loader'</span>,
    query: {
        limit: <span class="hljs-number">5000</span>,
        name: <span class="hljs-string">'/font/[name]-[hash:8].[ext]'</span>
    }
},</code></pre>
<h2 id="articleHeader15">资源文件的压缩</h2>
<p>js、css、html的压缩是少不了的，webpack 自带了压缩插件，如果某些对象名称不想被压缩，可以排除不想要压缩的对象名称。配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
...
plugins:[
    new webpack.optimize.UglifyJsPlugin({ 
            mangle: { // 排除不想要压缩的对象名称
                except: ['$super', '$', 'exports', 'require', 'module', '_']
            },
            compress: {
                warnings: false
            },
            output: {
                comments: false,
            }
        })
]
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>// webpack.config.js
...
plugin<span class="hljs-variable">s:</span>[
    <span class="hljs-keyword">new</span> webpack.optimize.UglifyJsPlugin({ 
            mangle: { // 排除不想要压缩的对象名称
                excep<span class="hljs-variable">t:</span> [<span class="hljs-string">'$super'</span>, <span class="hljs-string">'$'</span>, <span class="hljs-string">'exports'</span>, <span class="hljs-string">'require'</span>, <span class="hljs-string">'module'</span>, <span class="hljs-string">'_'</span>]
            },
            compres<span class="hljs-variable">s:</span> {
                warning<span class="hljs-variable">s:</span> false
            },
            outpu<span class="hljs-variable">t:</span> {
                comment<span class="hljs-variable">s:</span> false,
            }
        })
]
...</code></pre>
<h2 id="articleHeader16">使用jquery、underscore</h2>
<p>通过webpack编译输出后的项目中，虽然页面已经引用了jquery、underscore,但是还是无法直接使用‘$’、‘_’对象，我们可以这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var $ = require('jquery')；
var _ =  require('underscore')；" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> $ = <span class="hljs-built_in">require</span>(<span class="hljs-string">'jquery'</span>)；
<span class="hljs-keyword">var</span> _ =  <span class="hljs-built_in">require</span>(<span class="hljs-string">'underscore'</span>)；</code></pre>
<p>但是这样实在不方便，如果我们就是要使用‘$’、‘_’对象直接操作，webpack 内置的插件可以帮我们解决。具体如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
new webpack.ProvidePlugin({
        $: &quot;jquery&quot;,
        jQuery: &quot;jquery&quot;,
        &quot;window.jQuery&quot;: &quot;jquery&quot;,
        &quot;_&quot;: &quot;underscore&quot;,
    }),
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-comment">// webpack.config.js</span>
<span class="hljs-keyword">new</span> webpack.ProvidePlugin({
        $: <span class="hljs-string">"jquery"</span>,
        jQuery: <span class="hljs-string">"jquery"</span>,
        <span class="hljs-string">"window.jQuery"</span>: <span class="hljs-string">"jquery"</span>,
        <span class="hljs-string">"_"</span>: <span class="hljs-string">"underscore"</span>,
    }),
</code></pre>
<h2 id="articleHeader17">代码分割，按需加载</h2>
<p>在单页面应用中，当我们加载其他的模板文件时，想要引用这个模板文件对应的js。如果我们通过这种方式require(),那么webpack会将这个模板文件对应的js也会和当前js打包成一个js。如果项目比较大，那么js文件也将越来越大。我们希望的是加载模板文件的时候动态的引用这个模板文件对应的js。那么我们可以通过 require.ensure()的方式。</p>
<p>比如现在有两个导航菜单：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<ul>
<li><a href=&quot;#home&quot;>home</a></li>
<li><a href=&quot;#hrm&quot;>HRM</a></li>
</ul>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-tag">&lt;<span class="hljs-name">ul</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#home"</span>&gt;</span>home<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">li</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">"#hrm"</span>&gt;</span>HRM<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">li</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">ul</span>&gt;</span></code></pre>
<p>我们给这两个菜单绑定点击事件，当点击‘home’时引用对应的‘home.js’;当点击‘HRM’时引用对应的‘hrm.js’,那么大致可以这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function loadJs(jsPath) {
    var currentMod;
    if (jsPath === './home') {
        require.ensure([], function (require) {
            currentMod = require('./home');
        }, 'home');
    }
    else if (jsPath === './hrm') {
        require.ensure([], function (require) {
            currentMod = require('./hrm');
        }, 'hrm');
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">loadJs</span>(<span class="hljs-params">jsPath</span>) </span>{
    <span class="hljs-keyword">var</span> currentMod;
    <span class="hljs-keyword">if</span> (jsPath === <span class="hljs-string">'./home'</span>) {
        <span class="hljs-built_in">require</span>.ensure([], <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">require</span>) </span>{
            currentMod = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./home'</span>);
        }, <span class="hljs-string">'home'</span>);
    }
    <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (jsPath === <span class="hljs-string">'./hrm'</span>) {
        <span class="hljs-built_in">require</span>.ensure([], <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">require</span>) </span>{
            currentMod = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./hrm'</span>);
        }, <span class="hljs-string">'hrm'</span>);
    }
}</code></pre>
<h2 id="articleHeader18">全局环境变量</h2>
<p>有时我们只有在开发过程中，才想输出log日志。可以用以下webpack内置的插件解决：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
...
plugins:[
      new webpack.DefinePlugin({
        // 全局debug标识
        __DEV__: debug,
    }),

]
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-comment">// webpack.config.js</span>
...
plugins:[
      new webpack.DefinePlugin({
        <span class="hljs-comment">// 全局debug标识</span>
        __DEV__: debug,
    }),

]
...</code></pre>
<p>这时代码中就可以这么写了：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (__DEV__) {
    console.log('debug 模式');
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sqf"><code><span class="hljs-keyword">if</span> (<span class="hljs-variable">__DEV__</span>) {
    console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'debug 模式'</span>);
}</code></pre>
<h2 id="articleHeader19">清空发布目录</h2>
<p>发布前清空发布目录是有必要的，我们可以通过<a href="https://github.com/johnagan/clean-webpack-plugin" rel="nofollow noreferrer" target="_blank">‘clean-webpack-plugin’</a>插件解决：</p>
<p>引入插件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
var CleanWebpackPlugin = require('clean-webpack-plugin');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// webpack.config.js</span>
<span class="hljs-keyword">var</span> CleanWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'clean-webpack-plugin'</span>);</code></pre>
<p>配置plugins:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
...
plugins:[
    new CleanWebpackPlugin(['dist'], {
        root: '', // An absolute path for the root  of webpack.config.js
        verbose: true,// Write logs to console.
        dry: false // Do not delete anything, good for testing.
    }),
]
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">// webpack.config.js</span>
...
<span class="hljs-string">plugins:</span>[
    <span class="hljs-keyword">new</span> CleanWebpackPlugin([<span class="hljs-string">'dist'</span>], {
<span class="hljs-symbol">        root:</span> <span class="hljs-string">''</span>, <span class="hljs-comment">// An absolute path for the root  of webpack.config.js</span>
<span class="hljs-symbol">        verbose:</span> <span class="hljs-literal">true</span>,<span class="hljs-comment">// Write logs to console.</span>
<span class="hljs-symbol">        dry:</span> <span class="hljs-literal">false</span> <span class="hljs-comment">// Do not delete anything, good for testing.</span>
    }),
]
...</code></pre>
<h2 id="articleHeader20">热更新结合后端服务</h2>
<h3 id="articleHeader21">热更新</h3>
<p><a href="https://webpack.github.io/docs/hot-module-replacement-with-webpack.html" rel="nofollow noreferrer" target="_blank">热更新</a>可以在你代码改变的时候即时编译输出，不用每次都要从都重新编译一遍，并且除了第一次编译比较慢，后面的编译都是增量编译，速度很快。有了这个功能，我们就不需要，每次都从头编译一次了。配置如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
...
plugins: [
        // Enable multi-pass compilation for enhanced performance
        // in larger projects. Good default.
        new webpack.HotModuleReplacementPlugin({
            multiStep: true
        }),
],
devServer: {
        // Enable history API fallback so HTML5 History API based
        // routing works. This is a good default that will come
        // in handy in more complicated setups.
        historyApiFallback: true,

        // Unlike the cli flag, this doesn't set
        // HotModuleReplacementPlugin!
        hot: true,
        inline: true,

        // Display only errors to reduce the amount of output.
        stats: 'errors-only',

        host: &quot;localhost&quot;, // Defaults to `localhost`   process.env.HOST
        port: &quot;8080&quot;,  // Defaults to 8080   process.env.PORT
}
...
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">// webpack.config.js</span>
...
<span class="hljs-string">plugins:</span> [
        <span class="hljs-comment">// Enable multi-pass compilation for enhanced performance</span>
        <span class="hljs-comment">// in larger projects. Good default.</span>
        <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin({
<span class="hljs-symbol">            multiStep:</span> <span class="hljs-literal">true</span>
        }),
],
<span class="hljs-string">devServer:</span> {
        <span class="hljs-comment">// Enable history API fallback so HTML5 History API based</span>
        <span class="hljs-comment">// routing works. This is a good default that will come</span>
        <span class="hljs-comment">// in handy in more complicated setups.</span>
<span class="hljs-symbol">        historyApiFallback:</span> <span class="hljs-literal">true</span>,

        <span class="hljs-comment">// Unlike the cli flag, this doesn't set</span>
        <span class="hljs-comment">// HotModuleReplacementPlugin!</span>
<span class="hljs-symbol">        hot:</span> <span class="hljs-literal">true</span>,
<span class="hljs-symbol">        inline:</span> <span class="hljs-literal">true</span>,

        <span class="hljs-comment">// Display only errors to reduce the amount of output.</span>
<span class="hljs-symbol">        stats:</span> <span class="hljs-string">'errors-only'</span>,
<span class="hljs-symbol">
        host:</span> <span class="hljs-string">"localhost"</span>, <span class="hljs-comment">// Defaults to `localhost`   process.env.HOST</span>
<span class="hljs-symbol">        port:</span> <span class="hljs-string">"8080"</span>,  <span class="hljs-comment">// Defaults to 8080   process.env.PORT</span>
}
...
</code></pre>
<p>这时我们只要打开浏览器，输入：localhost:8080/ 就能看到结果，并且在你修改某些源文件后，浏览器会自动刷新，就能看到webpack 即时编译输出的结果，而不需要重新编译。</p>
<h3 id="articleHeader22">结合后端服务</h3>
<p>我们在使用webpack开发时难免要结合后端服务开发，比如我们用webstorm 编译器开发项目，需要调用java的服务，由于有同源策略问题，这时我们会收到相关报错信息。这时我们可以通过代理的方式绕过同源策略。<br>这里我用nodejs 模拟一个后端服务，如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// ~/mockServer/server.js

var http = require('http');

var content = '▍if you see that,It means you have get the correct data by backend server(mock data by nodejs server)!';

var srv = http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'application/text'});
    res.end(content);
});

srv.listen(8888, function() {
    console.log('listening on localhost:8888');
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// ~/mockServer/server.js</span>

<span class="hljs-keyword">var</span> http = <span class="hljs-built_in">require</span>(<span class="hljs-string">'http'</span>);

<span class="hljs-keyword">var</span> content = <span class="hljs-string">'▍if you see that,It means you have get the correct data by backend server(mock data by nodejs server)!'</span>;

<span class="hljs-keyword">var</span> srv = http.createServer(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req, res</span>) </span>{
    res.writeHead(<span class="hljs-number">200</span>, {<span class="hljs-string">'Content-Type'</span>: <span class="hljs-string">'application/text'</span>});
    res.end(content);
});

srv.listen(<span class="hljs-number">8888</span>, <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'listening on localhost:8888'</span>);
});</code></pre>
<p>接下来我们需要这样配置去调用这个nodejs 的服务。<br>首先将热更新配置的代码修改为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
...
plugins: [
        // Enable multi-pass compilation for enhanced performance
        // in larger projects. Good default.
        new webpack.HotModuleReplacementPlugin({
            multiStep: true
        }),
],
devServer: {
        // Enable history API fallback so HTML5 History API based
        // routing works. This is a good default that will come
        // in handy in more complicated setups.
        historyApiFallback: true,

        // Unlike the cli flag, this doesn't set
        // HotModuleReplacementPlugin!
        hot: true,
        inline: true,

        // Display only errors to reduce the amount of output.
        stats: 'errors-only',

        host: &quot;localhost&quot;, // Defaults to `localhost`   process.env.HOST
        port: &quot;8080&quot;,  // Defaults to 8080   process.env.PORT
        proxy: {
                '/devApi/*': {
                    target: 'http://localhost:8888/',
                    secure: true,
                    /*
                     * rewrite 的方式扩展性更强，不限制服务的名称
                     * */
                    rewrite: function (req) {
                        req.url = req.url.replace(/^\/devApi/, '');
                    }
                }
        }
}
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// webpack.config.js</span>
...
plugins: [
        <span class="hljs-comment">// Enable multi-pass compilation for enhanced performance</span>
        <span class="hljs-comment">// in larger projects. Good default.</span>
        <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin({
            <span class="hljs-attr">multiStep</span>: <span class="hljs-literal">true</span>
        }),
],
<span class="hljs-attr">devServer</span>: {
        <span class="hljs-comment">// Enable history API fallback so HTML5 History API based</span>
        <span class="hljs-comment">// routing works. This is a good default that will come</span>
        <span class="hljs-comment">// in handy in more complicated setups.</span>
        historyApiFallback: <span class="hljs-literal">true</span>,

        <span class="hljs-comment">// Unlike the cli flag, this doesn't set</span>
        <span class="hljs-comment">// HotModuleReplacementPlugin!</span>
        hot: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">inline</span>: <span class="hljs-literal">true</span>,

        <span class="hljs-comment">// Display only errors to reduce the amount of output.</span>
        stats: <span class="hljs-string">'errors-only'</span>,

        <span class="hljs-attr">host</span>: <span class="hljs-string">"localhost"</span>, <span class="hljs-comment">// Defaults to `localhost`   process.env.HOST</span>
        port: <span class="hljs-string">"8080"</span>,  <span class="hljs-comment">// Defaults to 8080   process.env.PORT</span>
        proxy: {
                <span class="hljs-string">'/devApi/*'</span>: {
                    <span class="hljs-attr">target</span>: <span class="hljs-string">'http://localhost:8888/'</span>,
                    <span class="hljs-attr">secure</span>: <span class="hljs-literal">true</span>,
                    <span class="hljs-comment">/*
                     * rewrite 的方式扩展性更强，不限制服务的名称
                     * */</span>
                    rewrite: <span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">req</span>) </span>{
                        req.url = req.url.replace(<span class="hljs-regexp">/^\/devApi/</span>, <span class="hljs-string">''</span>);
                    }
                }
        }
}
...</code></pre>
<p>然后配置一个全局的环境变量，通过<code>DefinePlugin</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
...
plugins: [
 new webpack.DefinePlugin({
        __DEVAPI__: devServer ? &quot;/devApi/&quot; : &quot;''&quot;,
    }),
]
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-comment">// webpack.config.js</span>
...
plugins: [
 new webpack.DefinePlugin({
        __DEVAPI__: devServer ? <span class="hljs-string">"/devApi/"</span> : <span class="hljs-string">"''"</span>,
    }),
]
...</code></pre>
<p>最后在调用服务的地方，只需要在调用地址前添加 <code>__DEVAPI__</code>全局环境变量即可，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$.ajax({
        url: __DEVAPI__ + 'http://localhost:8888/',
        data: {},
        type: 'get',
        dataType: 'text',
        success: function (text) {}
    })" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code>$.ajax({
        ur<span class="hljs-variable">l:</span> __DEVAPI__ + <span class="hljs-string">'http://localhost:8888/'</span>,
        dat<span class="hljs-variable">a:</span> {},
        <span class="hljs-built_in">type</span>: <span class="hljs-string">'get'</span>,
        dataType: <span class="hljs-string">'text'</span>,
        succes<span class="hljs-variable">s:</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-params">(text)</span> {}</span>
    })</code></pre>
<p>这样在热更新的模式下，当有<code>__DEVAPI__ </code>的地方就会自动识别为<code>/devApi/</code>，而这里会通过代理处理帮你重写掉，绕过同源策略。</p>
<h2 id="articleHeader23">自动打开浏览器</h2>
<p>虽然以上的工作几乎已经满足我们对webpack的要求了，但是我们还想懒一点，想在热更新模式下，编译完成后自动打开浏览器。那么我们可以通过这个插件<a>open-browser-webpack-plugin</a>解决：</p>
<p>引用插件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
var OpenBrowserPlugin = require('open-browser-webpack-plugin');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// webpack.config.js</span>
<span class="hljs-keyword">var</span> OpenBrowserPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'open-browser-webpack-plugin'</span>);</code></pre>
<p>配置插件，这个配置要根据项目的具体情况去配置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
...
plugins: [
 new OpenBrowserPlugin({url: 'http://localhost:8080' + PATHS.publicPath + 'index.html'})
]
..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">// webpack.config.js</span>
...
<span class="hljs-string">plugins:</span> [
 <span class="hljs-keyword">new</span> OpenBrowserPlugin({<span class="hljs-string">url:</span> <span class="hljs-string">'http://localhost:8080'</span> + PATHS.publicPath + <span class="hljs-string">'index.html'</span>})
]
...</code></pre>
<h2 id="articleHeader24">总结</h2>
<p>以上就是这篇文章的主要内容，希望通过这篇文章能够给大家带来一些启发。如果有觉得哪里不对，或者不合理的地方，欢迎指出。其实webpack还有一个关于版本号的<a href="https://github.com/webpack/webpack/issues/672" rel="nofollow noreferrer" target="_blank">bug</a>，不知道是不是有人解决了，如果有人已经解决了，还请分享。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack 单页面应用实战

## 原文链接
[https://segmentfault.com/a/1190000005866410](https://segmentfault.com/a/1190000005866410)

