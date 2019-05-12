---
title: 'webpack4.0实战那些事儿' 
date: 2018-12-07 2:30:10
hidden: true
slug: ay6ld95qqxf
categories: [reprint]
---

{{< raw >}}

                    
<p>webpack4.0刚刚发布，官网自称4.0最大的特点就是零配置。本文就详细介绍一下webpack4.0实战那些事儿。</p>
<h2 id="articleHeader0">1 什么是WebPack</h2>
<blockquote>打包机</blockquote>
<p>WebPack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其打包为合适的格式以供浏览器使用。</p>
<blockquote>构建</blockquote>
<p>构建就是把源代码转换成发布到线上的可执行 JavaScrip、CSS、HTML 代码，包括如下内容。</p>
<ul>
<li>代码转换：TypeScript 编译成 JavaScript、SCSS 编译成 CSS 等。</li>
<li>文件优化：压缩 JavaScript、CSS、HTML 代码，压缩合并图片等。</li>
<li>代码分割：提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载。</li>
<li>模块合并：在采用模块化的项目里会有很多个模块和文件，需要构建功能把模块分类合并成一个文件。</li>
<li>自动刷新：监听本地源代码的变化，自动重新构建、刷新浏览器。</li>
<li>代码校验：在代码被提交到仓库前需要校验代码是否符合规范，以及单元测试是否通过。</li>
<li>自动发布：更新完代码后，自动构建出线上发布代码并传输给发布系统。</li>
</ul>
<p>构建其实是工程化、自动化思想在前端开发中的体现，把一系列流程用代码去实现，让代码自动化地执行这一系列复杂的流程。 构建给前端开发注入了更大的活力，解放了我们的生产力。</p>
<h2 id="articleHeader1">2 快速配置</h2>
<h3 id="articleHeader2">1 核心概念</h3>
<ul>
<li>Entry：入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。</li>
<li>Module：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。</li>
<li>Chunk：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。</li>
<li>Loader：模块转换器，用于把模块原内容按照需求转换成新内容。</li>
<li>Plugin：扩展插件，在 Webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情。</li>
<li>Output：输出结果，在 Webpack 经过一系列处理并得出最终想要的代码后输出结果。</li>
</ul>
<h3 id="articleHeader3">2 webpack的工作流程</h3>
<ul>
<li>1 Webpack 启动后会从Entry里配置的Module开始递归解析 Entry 依赖的所有 Module。</li>
<li>2 每找到一个 Module， 就会根据配置的Loader去找出对应的转换规则，对 Module 进行转换后，再解析出当前 Module 依赖的 Module。</li>
<li>3 这些模块会以 Entry 为单位进行分组，一个 Entry 和其所有依赖的 Module 被分到一个组也就是一个 Chunk。</li>
<li>4 最后 Webpack 会把所有 Chunk 转换成文件输出。 在整个流程中 Webpack 会在恰当的时机执行 Plugin 里定义的逻辑。</li>
</ul>
<h3 id="articleHeader4">3 配置webpack</h3>
<h4>1) 初始化npm</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm init -y" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">npm</span> init -y</code></pre>
<p>在要进行打包的目录下初始化npm, 在控制台执行以上命令后会生成一个<code>package.json</code>的文件。</p>
<h4>2) install</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install webpack webpack-cli -D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code style="word-break: break-word; white-space: initial;">npm install webpack webpack-<span class="hljs-keyword">cli</span> -<span class="hljs-built_in">D</span></code></pre>
<p>因为从4.0开始，webpack拆分开两个包分别是<code>webpack</code>和<code>webpack-cli</code></p>
<h4>3) 配置文件<code>webpack.config.js</code>
</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    entry：配置入口文件的地址
    output：配置出口文件的地址
    module：配置模块,主要用来配置不同文件的加载器
    plugins：配置插件
    devServer：配置开发服务器
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>.exports = {
    entry：配置入口文件的地址
    output：配置出口文件的地址
    <span class="hljs-built_in">module</span>：配置模块,主要用来配置不同文件的加载器
    plugins：配置插件
    devServer：配置开发服务器
}</code></pre>
<p>接下来我们就一一介绍一下它们的配置。</p>
<h2 id="articleHeader5">3 配置开发服务器</h2>
<h3 id="articleHeader6">1 install</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install webpack-dev-server -D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> webpack-dev-<span class="hljs-keyword">server</span> -D</code></pre>
<h3 id="articleHeader7">2 配置参数</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="devServer:{
    contentBase:path.resolve(__dirname,'dist'),// 配置开发服务运行时的文件根目录
    host:'localhost',// 开发服务器监听的主机地址
    compress:true,   // 开发服务器是否启动gzip等压缩
    port:8080        // 开发服务器监听的端口
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">devServer:{
    <span class="hljs-attr">contentBase</span>:path.resolve(__dirname,<span class="hljs-string">'dist'</span>),<span class="hljs-comment">// 配置开发服务运行时的文件根目录</span>
    host:<span class="hljs-string">'localhost'</span>,<span class="hljs-comment">// 开发服务器监听的主机地址</span>
    compress:<span class="hljs-literal">true</span>,   <span class="hljs-comment">// 开发服务器是否启动gzip等压缩</span>
    port:<span class="hljs-number">8080</span>        <span class="hljs-comment">// 开发服务器监听的端口</span>
}</code></pre>
<h3 id="articleHeader8">3 配置启动参数</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
    &quot;dev&quot;: &quot;webpack-dev-server --open --mode development &quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"dev"</span>: <span class="hljs-string">"webpack-dev-server --open --mode development "</span>
}</code></pre>
<blockquote>note</blockquote>
<p>从4.0开始，运行webpack时一定要加参数 <code>--mode development</code> 或者<code>--mode production</code>,分别对应开发环境和生产环境。</p>
<h2 id="articleHeader9">4 配置<code>module</code>
</h2>
<h3 id="articleHeader10">1 什么是<code>loader</code>
</h3>
<p><code>module</code>主要用来配置不同文件的加载器。谈到加载就离不开<code>loader</code>,那什么是<code>loader</code>呢？</p>
<blockquote>loader的概念</blockquote>
<p>通过使用不同的Loader，Webpack可以要把不同的文件都转成JS文件,比如CSS、ES6/7、JSX等。</p>
<ul>
<li>
<code>test</code>：匹配处理文件的扩展名的正则表达式</li>
<li>
<code>use</code>：loader名称，就是你要使用模块的名称</li>
<li>
<code>include/exclude</code>:手动指定必须处理的文件夹或屏蔽不需要处理的文件夹</li>
<li>
<code>query</code>：为loaders提供额外的设置选项</li>
</ul>
<blockquote>
<code>loader</code>的三种写法</blockquote>
<ul>
<li>use</li>
<li>loader</li>
<li>use+loader</li>
</ul>
<h3 id="articleHeader11">2 支持加载css文件</h3>
<blockquote>install</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install style-loader css-loader -D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> <span class="hljs-keyword">style</span>-loader css-loader -D</code></pre>
<blockquote>配置加载器</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
    rules:[
       {
            test:/\.css$/,
            use:['style-loader','css-loader'],
            include:path.join(__dirname,'./src'),
            exclude:/node_modules/
       }        
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>: {
    <span class="hljs-attr">rules</span>:[
       {
            <span class="hljs-attr">test</span>:<span class="hljs-regexp">/\.css$/</span>,
            <span class="hljs-attr">use</span>:[<span class="hljs-string">'style-loader'</span>,<span class="hljs-string">'css-loader'</span>],
            <span class="hljs-attr">include</span>:path.join(__dirname,<span class="hljs-string">'./src'</span>),
            <span class="hljs-attr">exclude</span>:<span class="hljs-regexp">/node_modules/</span>
       }        
    ]
}</code></pre>
<blockquote>note</blockquote>
<p><strong>注意：</strong>加载器的加载顺序为从右至左。即先用<code>css-loader</code>解析然后用<code>style-loader</code>将解析后的<code>css</code>文件添加到<code>Head</code>标签中。</p>
<h3 id="articleHeader12">3 支持图片</h3>
<blockquote>install</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install file-loader url-loader html-withimg-loader -D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> <span class="hljs-keyword">file</span>-loader <span class="hljs-keyword">url</span>-loader html-withimg-loader -D</code></pre>
<ul>
<li>
<code>file-loader</code> 解决CSS等文件中的引入图片路径问题</li>
<li>
<code>url-loader</code> 当图片较小的时候会把图片BASE64编码，大于limit参数的时候还是使用file-loader 进行拷贝</li>
</ul>
<blockquote>配置加载器</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    test: /\.(png|jpg|gif|svg|bmp|eot|woff|woff2|ttf)$/,
    loader: {
        loader: 'url-loader',
        options: {
            limit: 5 * 1024,// 图片大小 > limit 使用file-loader, 反之使用url-loader
            outputPath: 'images/'// 指定打包后的图片位置
        }
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(png|jpg|gif|svg|bmp|eot|woff|woff2|ttf)$/</span>,
    <span class="hljs-attr">loader</span>: {
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'url-loader'</span>,
        <span class="hljs-attr">options</span>: {
            <span class="hljs-attr">limit</span>: <span class="hljs-number">5</span> * <span class="hljs-number">1024</span>,<span class="hljs-comment">// 图片大小 &gt; limit 使用file-loader, 反之使用url-loader</span>
            outputPath: <span class="hljs-string">'images/'</span><span class="hljs-comment">// 指定打包后的图片位置</span>
        }
    }
}</code></pre>
<blockquote>usage - 手动添加图片</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="let logo = require('./images/logo.png');
let img = new Image();
img.src = logo;
document.body.appendChild(img);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">let</span> logo = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./images/logo.png'</span>);
<span class="hljs-keyword">let</span> img = <span class="hljs-keyword">new</span> Image();
img.src = logo;
<span class="hljs-built_in">document</span>.body.appendChild(img);</code></pre>
<blockquote>usage - 在CSS中引入图片</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=".img-bg{
    background: url(./images/logo.png);
    width:173px;
    height:66px;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">.img-bg{
    <span class="hljs-attr">background</span>: url(./images/logo.png);
    width:<span class="hljs-number">173</span>px;
    height:<span class="hljs-number">66</span>px;
}</code></pre>
<blockquote>usage - 在HTML中使用图片</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    test:/\.(html|html)$/,
    use:'html-withimg-loader',
    include:path.join(__dirname,'./src'),
    exclude:/node_modules/
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-attr">test</span>:<span class="hljs-regexp">/\.(html|html)$/</span>,
    <span class="hljs-attr">use</span>:<span class="hljs-string">'html-withimg-loader'</span>,
    <span class="hljs-attr">include</span>:path.join(__dirname,<span class="hljs-string">'./src'</span>),
    <span class="hljs-attr">exclude</span>:<span class="hljs-regexp">/node_modules/</span>
}</code></pre>
<h3 id="articleHeader13">4 编译less 和 sass</h3>
<h4>1) install</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install less less-loader node-sass sass-loader -D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;">npm install less less-loader <span class="hljs-keyword">node</span><span class="hljs-title">-sass</span> sass-loader -D</code></pre>
<h4>2) 配置加载器</h4>
<blockquote>把编译好的代码放到head里面</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    test: /\.css$/,
    loader: ['style-loader', 'css-loader']
}, {
    test: /\.less$/,
    loader: ['style-loader', 'css-loader']
}, {
    test: /\.scss$/,
    loader: ['style-loader', 'css-loader']
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
    <span class="hljs-attr">loader</span>: [<span class="hljs-string">'style-loader'</span>, <span class="hljs-string">'css-loader'</span>]
}, {
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.less$/</span>,
    <span class="hljs-attr">loader</span>: [<span class="hljs-string">'style-loader'</span>, <span class="hljs-string">'css-loader'</span>]
}, {
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.scss$/</span>,
    <span class="hljs-attr">loader</span>: [<span class="hljs-string">'style-loader'</span>, <span class="hljs-string">'css-loader'</span>]
}</code></pre>
<blockquote>把编译好的代码放到单独的文件里面</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
let cssExtract = new ExtractTextWebpackPlugin('css.css');
let lessExtract = new ExtractTextWebpackPlugin('less.css');
let sassExtract = new ExtractTextWebpackPlugin('sass.css');
...
{
    test: /\.css$/,
    loader: cssExtract.extract({
        use: ['css-loader?minimize']
    })
}, {
    test: /\.less$/,
    loader: lessExtract.extract({
        use: ['css-loader?minimize', 'less-loader']
    })
}, {
    test: /\.scss$/,
    loader: sassExtract.extract({
        use: ['css-loader?minimize', 'sass-loader']
    })
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> ExtractTextWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>);
<span class="hljs-keyword">let</span> cssExtract = <span class="hljs-keyword">new</span> ExtractTextWebpackPlugin(<span class="hljs-string">'css.css'</span>);
<span class="hljs-keyword">let</span> lessExtract = <span class="hljs-keyword">new</span> ExtractTextWebpackPlugin(<span class="hljs-string">'less.css'</span>);
<span class="hljs-keyword">let</span> sassExtract = <span class="hljs-keyword">new</span> ExtractTextWebpackPlugin(<span class="hljs-string">'sass.css'</span>);
...
{
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
    <span class="hljs-attr">loader</span>: cssExtract.extract({
        <span class="hljs-attr">use</span>: [<span class="hljs-string">'css-loader?minimize'</span>]
    })
}, {
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.less$/</span>,
    <span class="hljs-attr">loader</span>: lessExtract.extract({
        <span class="hljs-attr">use</span>: [<span class="hljs-string">'css-loader?minimize'</span>, <span class="hljs-string">'less-loader'</span>]
    })
}, {
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.scss$/</span>,
    <span class="hljs-attr">loader</span>: sassExtract.extract({
        <span class="hljs-attr">use</span>: [<span class="hljs-string">'css-loader?minimize'</span>, <span class="hljs-string">'sass-loader'</span>]
    })
}</code></pre>
<h3 id="articleHeader14">5 处理CSS3属性前缀</h3>
<p>为了浏览器的兼容性，有时候我们必须加入-webkit,-ms,-o,-moz这些前缀</p>
<ul>
<li>Trident内核：主要代表为IE浏览器, 前缀为-ms</li>
<li>Gecko内核：主要代表为Firefox, 前缀为-moz</li>
<li>Presto内核：主要代表为Opera, 前缀为-o</li>
<li>Webkit内核：产要代表为Chrome和Safari, 前缀为-webkit</li>
</ul>
<blockquote>install</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install postcss-loader autoprefixer -D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> postcss-loader autoprefixer -D</code></pre>
<blockquote>usage</blockquote>
<p><code>postcss-loader</code> 需要配置 <code>postcss.config.js</code>文件,postcss.config.js 内容如下：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" module.exports = {
    plugins: [
        require('autoprefixer')
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"> <span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-built_in">require</span>(<span class="hljs-string">'autoprefixer'</span>)
    ]
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 把 post-laoder push 到css的loader数组中
 {
    test: /\.css$/,
    loader: ['style-loader', 'css-loader', 'postcss-loader']
}, {
    test: /\.less$/,
    loader: ['style-loader', 'css-loader', 'less-loader']
}, {
    test: /\.scss$/,
    loader: ['style-loader', 'css-loader', 'sass-loader']
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 把 post-laoder push 到css的loader数组中</span>
 {
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
    <span class="hljs-attr">loader</span>: [<span class="hljs-string">'style-loader'</span>, <span class="hljs-string">'css-loader'</span>, <span class="hljs-string">'postcss-loader'</span>]
}, {
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.less$/</span>,
    <span class="hljs-attr">loader</span>: [<span class="hljs-string">'style-loader'</span>, <span class="hljs-string">'css-loader'</span>, <span class="hljs-string">'less-loader'</span>]
}, {
    <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.scss$/</span>,
    <span class="hljs-attr">loader</span>: [<span class="hljs-string">'style-loader'</span>, <span class="hljs-string">'css-loader'</span>, <span class="hljs-string">'sass-loader'</span>]
}</code></pre>
<h3 id="articleHeader15">6 转义ES6/ES7/JSX</h3>
<p>Babel其实是一个编译JavaScript的平台,可以把ES6/ES7,React的JSX转义为ES5。</p>
<blockquote>install</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i babel-core babel-loader babel-preset-env babel-preset-stage-0 babel-preset-react -D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs armasm"><code style="word-break: break-word; white-space: initial;"><span class="hljs-symbol">npm</span> i <span class="hljs-keyword">babel-core </span><span class="hljs-keyword">babel-loader </span><span class="hljs-keyword">babel-preset-env </span><span class="hljs-keyword">babel-preset-stage-0 </span><span class="hljs-keyword">babel-preset-react </span>-D</code></pre>
<blockquote>配置加载器</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    test:/\.jsx?$/,
    use: {
        loader: 'babel-loader',
        options: {
            presets: [&quot;env&quot;,&quot;stage-0&quot;,&quot;react&quot;]// env --> es6, stage-0 --> es7, react --> react
        }
    },
    include:path.join(__dirname,'./src'),
    exclude:/node_modules/
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs gradle"><code>{
    test:<span class="hljs-regexp">/\.jsx?$/</span>,
    use: {
        loader: <span class="hljs-string">'babel-loader'</span>,
        <span class="hljs-keyword">options</span>: {
            presets: [<span class="hljs-string">"env"</span>,<span class="hljs-string">"stage-0"</span>,<span class="hljs-string">"react"</span>]<span class="hljs-comment">// env --&gt; es6, stage-0 --&gt; es7, react --&gt; react</span>
        }
    },
    <span class="hljs-keyword">include</span>:path.<span class="hljs-keyword">join</span>(__dirname,<span class="hljs-string">'./src'</span>),
    <span class="hljs-keyword">exclude</span>:<span class="hljs-regexp">/node_modules/</span>
}</code></pre>
<h2 id="articleHeader16">5 配置<code>plugins</code>
</h2>
<p>配置插件</p>
<h3 id="articleHeader17">1 自动产出html</h3>
<p>我们希望自动能产出HTML文件，并在里面引入产出后的资源。</p>
<blockquote>install</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install html-webpack-plugin -D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> html-webpack-<span class="hljs-keyword">plugin</span> -D</code></pre>
<blockquote>usage</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const HtmlWebpackPlugin = require('html-webpack-plugin');
plugins: [
    new HtmlWebpackPlugin({
        template: './src/index.html',   // 指定产出的模板
        filename: 'base.html',          // 产出的文件名
        chunks: ['common', 'base'],     // 在产出的HTML文件里引入哪些代码块
        hash: true,                     // 名称是否哈希值
        title: 'base',                  // 可以给模板设置变量名，在html模板中调用 htmlWebpackPlugin.options.title 可以使用
        minify: {                       // 对html文件进行压缩
            removeAttributeQuotes: true // 移除双引号
        }
    })
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>);
plugins: [
    <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
        <span class="hljs-attr">template</span>: <span class="hljs-string">'./src/index.html'</span>,   <span class="hljs-comment">// 指定产出的模板</span>
        filename: <span class="hljs-string">'base.html'</span>,          <span class="hljs-comment">// 产出的文件名</span>
        chunks: [<span class="hljs-string">'common'</span>, <span class="hljs-string">'base'</span>],     <span class="hljs-comment">// 在产出的HTML文件里引入哪些代码块</span>
        hash: <span class="hljs-literal">true</span>,                     <span class="hljs-comment">// 名称是否哈希值</span>
        title: <span class="hljs-string">'base'</span>,                  <span class="hljs-comment">// 可以给模板设置变量名，在html模板中调用 htmlWebpackPlugin.options.title 可以使用</span>
        minify: {                       <span class="hljs-comment">// 对html文件进行压缩</span>
            removeAttributeQuotes: <span class="hljs-literal">true</span> <span class="hljs-comment">// 移除双引号</span>
        }
    })
]</code></pre>
<h3 id="articleHeader18">2 分离CSS</h3>
<p>因为CSS的下载和JS可以并行,当一个HTML文件很大的时候，我们可以把CSS单独提取出来加载</p>
<blockquote>install</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install extract-text-webpack-plugin@next -D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> <span class="hljs-keyword">extract</span>-<span class="hljs-built_in">text</span>-webpack-<span class="hljs-keyword">plugin</span>@<span class="hljs-keyword">next</span> -D</code></pre>
<blockquote>usage</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
let cssExtract = new ExtractTextWebpackPlugin('css.css');
let lessExtract = new ExtractTextWebpackPlugin('less.css');
let sassExtract = new ExtractTextWebpackPlugin('sass.css');

...

module: {
    rules: [
         {
            test: /\.css$/,
            loader: cssExtract.extract({
                use: ['css-loader?minimize']
            })
        }, {
            test: /\.less$/,
            loader: lessExtract.extract({
                use: ['css-loader?minimize', 'less-loader']
            })
        }, {
            test: /\.scss$/,
            loader: sassExtract.extract({
                use: ['css-loader?minimize', 'sass-loader']
            })
        }
    ]
}

...

plugins: [
    cssExtract,
    lessExtract,
    sassExtract
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> ExtractTextWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'extract-text-webpack-plugin'</span>);
<span class="hljs-keyword">let</span> cssExtract = <span class="hljs-keyword">new</span> ExtractTextWebpackPlugin(<span class="hljs-string">'css.css'</span>);
<span class="hljs-keyword">let</span> lessExtract = <span class="hljs-keyword">new</span> ExtractTextWebpackPlugin(<span class="hljs-string">'less.css'</span>);
<span class="hljs-keyword">let</span> sassExtract = <span class="hljs-keyword">new</span> ExtractTextWebpackPlugin(<span class="hljs-string">'sass.css'</span>);

...

module: {
    <span class="hljs-attr">rules</span>: [
         {
            <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
            <span class="hljs-attr">loader</span>: cssExtract.extract({
                <span class="hljs-attr">use</span>: [<span class="hljs-string">'css-loader?minimize'</span>]
            })
        }, {
            <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.less$/</span>,
            <span class="hljs-attr">loader</span>: lessExtract.extract({
                <span class="hljs-attr">use</span>: [<span class="hljs-string">'css-loader?minimize'</span>, <span class="hljs-string">'less-loader'</span>]
            })
        }, {
            <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.scss$/</span>,
            <span class="hljs-attr">loader</span>: sassExtract.extract({
                <span class="hljs-attr">use</span>: [<span class="hljs-string">'css-loader?minimize'</span>, <span class="hljs-string">'sass-loader'</span>]
            })
        }
    ]
}

...

plugins: [
    cssExtract,
    lessExtract,
    sassExtract
]</code></pre>
<blockquote>处理图片路径问题</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const PUBLIC_PATH='/';

output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath:PUBLIC_PATH
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> PUBLIC_PATH=<span class="hljs-string">'/'</span>;

output: {
    <span class="hljs-attr">path</span>: path.resolve(__dirname, <span class="hljs-string">'dist'</span>),
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'bundle.js'</span>,
    <span class="hljs-attr">publicPath</span>:PUBLIC_PATH
}</code></pre>
<h3 id="articleHeader19">3 拷贝静态文件</h3>
<p>有时项目中没有引用的文件也需要打包到目标目录</p>
<blockquote>install</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install copy-webpack-plugin -D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code style="word-break: break-word; white-space: initial;">npm install <span class="hljs-keyword">copy</span>-webpack-<span class="hljs-keyword">plugin</span> -<span class="hljs-built_in">D</span></code></pre>
<blockquote>usage</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const CopyWebpackPlugin = require('copy-webpack-plugin');
    plugins: [
        new CopyWebpackPlugin([{
            from: path.join(__dirname, 'public'),       // 从哪里复制
            to: path.join(__dirname, 'dist', 'public')  // 复制到哪里
    }])
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> CopyWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'copy-webpack-plugin'</span>);
    plugins: [
        <span class="hljs-keyword">new</span> CopyWebpackPlugin([{
            <span class="hljs-attr">from</span>: path.join(__dirname, <span class="hljs-string">'public'</span>),       <span class="hljs-comment">// 从哪里复制</span>
            to: path.join(__dirname, <span class="hljs-string">'dist'</span>, <span class="hljs-string">'public'</span>)  <span class="hljs-comment">// 复制到哪里</span>
    }])
]</code></pre>
<h3 id="articleHeader20">4 打包前先清空输出目录</h3>
<blockquote>install</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install  clean-webpack-plugin -D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span>  clean-webpack-<span class="hljs-keyword">plugin</span> -D</code></pre>
<blockquote>usage</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const CleanWebpackPlugin = require('clean-webpack-plugin');
plugins: [
    new CleanWebpackPlugin([path.join(__dirname, 'dist')])
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> CleanWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'clean-webpack-plugin'</span>);
plugins: [
    <span class="hljs-keyword">new</span> CleanWebpackPlugin([path.join(__dirname, <span class="hljs-string">'dist'</span>)])
]</code></pre>
<h3 id="articleHeader21">5 压缩JS</h3>
<blockquote>install</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install uglifyjs-webpack-plugin -D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> uglifyjs-webpack-<span class="hljs-keyword">plugin</span> -D</code></pre>
<blockquote>usage</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="onst UglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');
plugins: [
    new UglifyjsWebpackPlugin()
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">onst UglifyjsWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'uglifyjs-webpack-plugin'</span>);
plugins: [
    <span class="hljs-keyword">new</span> UglifyjsWebpackPlugin()
]</code></pre>
<h2 id="articleHeader22">6 如何调试打包后的代码</h2>
<p>webapck通过配置可以自动给我们source maps文件，map文件是一种对应编译文件和源文件的方法</p>
<blockquote>usage</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="devtool:'eval-source-map'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">devtool:</span><span class="hljs-string">'eval-source-map'</span></code></pre>
<blockquote>devtool的参数详解</blockquote>
<ul>
<li>
<code>source-map</code> 把映射文件生成到单独的文件，最完整最慢</li>
<li>
<code>cheap-module-source-map</code> 在一个单独的文件中产生一个不带列映射的Map</li>
<li>
<code>eval-source-map</code> 使用eval打包源文件模块,在同一个文件中生成完整sourcemap</li>
<li>
<code>cheap-module-eval-source-map</code> sourcemap和打包后的JS同行显示，没有映射列</li>
</ul>
<h2 id="articleHeader23">7 打包第三方类库</h2>
<h3 id="articleHeader24">1 直接引入</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="import _ from 'lodash';
alert(_.join(['a','b','c'],'@'));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">import</span> _ <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash'</span>;
alert(_.join([<span class="hljs-string">'a'</span>,<span class="hljs-string">'b'</span>,<span class="hljs-string">'c'</span>],<span class="hljs-string">'@'</span>));</code></pre>
<h3 id="articleHeader25">2 插件引入</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.ProvidePlugin({
    _:'lodash'
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">new</span> webpack.ProvidePlugin({
    <span class="hljs-attr">_</span>:<span class="hljs-string">'lodash'</span>
})</code></pre>
<h2 id="articleHeader26">8 watch</h2>
<p>当代码发生修改后可以自动重新编译</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" watch: true,
    watchOptions: {
        ignored: /node_modules/, //忽略不用监听变更的目录
        aggregateTimeout: 500,  // 文件发生改变后多长时间后再重新编译（Add a delay before rebuilding once the first file changed ）
        poll:1000               //每秒询问的文件变更的次数
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"> watch: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">watchOptions</span>: {
        <span class="hljs-attr">ignored</span>: <span class="hljs-regexp">/node_modules/</span>, <span class="hljs-comment">//忽略不用监听变更的目录</span>
        aggregateTimeout: <span class="hljs-number">500</span>,  <span class="hljs-comment">// 文件发生改变后多长时间后再重新编译（Add a delay before rebuilding once the first file changed ）</span>
        poll:<span class="hljs-number">1000</span>               <span class="hljs-comment">//每秒询问的文件变更的次数</span>
    }</code></pre>
<h2 id="articleHeader27">9 服务器代理</h2>
<p>如果你有单独的后端开发服务器 API，并且希望在同域名下发送 API 请求 ，那么代理某些 URL 会很有用。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//请求到 /api/users 现在会被代理到请求 http://localhost:9000/api/users。
proxy: {
    &quot;/api&quot;: &quot;http://localhost:9000&quot;,
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//请求到 /api/users 现在会被代理到请求 http://localhost:9000/api/users。</span>
proxy: {
    <span class="hljs-string">"/api"</span>: <span class="hljs-string">"http://localhost:9000"</span>,
}</code></pre>
<h2 id="articleHeader28">10 resolve解析</h2>
<h3 id="articleHeader29">1 extensions</h3>
<p>指定extension之后可以不用在require或是import的时候加文件扩展名,会依次尝试添加扩展名进行匹配</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="resolve: {
    //自动补全后缀，注意第一个必须是空字符串,后缀一定以点开头
   extensions: [&quot;&quot;,&quot;.js&quot;,&quot;.css&quot;,&quot;.json&quot;],
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">resolve: {
    <span class="hljs-comment">//自动补全后缀，注意第一个必须是空字符串,后缀一定以点开头</span>
   extensions: [<span class="hljs-string">""</span>,<span class="hljs-string">".js"</span>,<span class="hljs-string">".css"</span>,<span class="hljs-string">".json"</span>],
},</code></pre>
<h3 id="articleHeader30">2 alias</h3>
<p>配置别名可以加快webpack查找模块的速度</p>
<ul>
<li>每当引入jquery模块的时候，它会直接引入jqueryPath,而不需要从node_modules文件夹中按模块的查找规则查找</li>
<li>不需要webpack去解析jquery.js文件</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const bootstrap = path.join(__dirname,'node_modules/bootstrap/dist/css/bootstrap.css');

resolve: {
    alias: {
        'bootstrap': bootstrap
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> bootstrap = path.join(__dirname,<span class="hljs-string">'node_modules/bootstrap/dist/css/bootstrap.css'</span>);

resolve: {
    <span class="hljs-attr">alias</span>: {
        <span class="hljs-string">'bootstrap'</span>: bootstrap
    }
}</code></pre>
<h2 id="articleHeader31">11 暴露全局对象</h2>
<blockquote>install</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install expose-loader -D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> expose-loader -D</code></pre>
<blockquote>action</blockquote>
<p>把模块的导出暴露给全局变量，</p>
<blockquote>usage-1</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="require(&quot;expose-loader?libraryName!./file.js&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">require</span>(<span class="hljs-string">"expose-loader?libraryName!./file.js"</span>);</code></pre>
<blockquote>usage-2</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="rules: [{
    test: require.resolve('jquery'),// 注意 这里是require的resolve 方法
    use: {
        loader: &quot;expose-loader&quot;,
        options: &quot;$&quot;
    }
}]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">rules: [{
    <span class="hljs-attr">test</span>: <span class="hljs-built_in">require</span>.resolve(<span class="hljs-string">'jquery'</span>),<span class="hljs-comment">// 注意 这里是require的resolve 方法</span>
    use: {
        <span class="hljs-attr">loader</span>: <span class="hljs-string">"expose-loader"</span>,
        <span class="hljs-attr">options</span>: <span class="hljs-string">"$"</span>
    }
}]</code></pre>
<h2 id="articleHeader32">13 多入口</h2>
<p>有时候我们的页面可以不止一个HTML页面，会有多个页面，所以就需要多入口</p>
<blockquote>usage</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 多个入口，可以给每个入口添加html模板
entry: {
    index: './src/index.js',
    main:'./src/main.js'
},
output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js',
    publicPath:PUBLIC_PATH
},

plugins: [
    new HtmlWebpackPlugin({
        minify: {
            removeAttributeQuotes:true
        },
        hash: true,
        template: './src/index.html',
        chunks:['index'],
        filename:'index.html'
    }),
    new HtmlWebpackPlugin({
        minify: {
            removeAttributeQuotes:true
        },
        hash: true,
        chunks:['login'],
        template: './src/login.html',
        filename:'login.html'
    })]
]
   " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">// 多个入口，可以给每个入口添加html模板</span>
<span class="hljs-attribute">entry</span>: {
    <span class="hljs-attribute">index</span>: <span class="hljs-string">'./src/index.js'</span>,
    <span class="hljs-attribute">main</span>:<span class="hljs-string">'./src/main.js'</span>
},
<span class="hljs-attribute">output</span>: {
    <span class="hljs-attribute">path</span>: path.resolve(__dirname, <span class="hljs-string">'dist'</span>),
    <span class="hljs-attribute">filename</span>: <span class="hljs-string">'[name].[hash].js'</span>,
    <span class="hljs-attribute">publicPath</span>:PUBLIC_PATH
},

<span class="hljs-attribute">plugins</span>: [
    new HtmlWebpackPlugin({
        <span class="hljs-attribute">minify</span>: {
            <span class="hljs-attribute">removeAttributeQuotes</span>:true
        },
        <span class="hljs-attribute">hash</span>: true,
        <span class="hljs-attribute">template</span>: <span class="hljs-string">'./src/index.html'</span>,
        <span class="hljs-attribute">chunks</span>:[<span class="hljs-string">'index'</span>],
        <span class="hljs-attribute">filename</span>:<span class="hljs-string">'index.html'</span>
    }),
    new HtmlWebpackPlugin({
        <span class="hljs-attribute">minify</span>: {
            <span class="hljs-attribute">removeAttributeQuotes</span>:true
        },
        <span class="hljs-attribute">hash</span>: true,
        <span class="hljs-attribute">chunks</span>:[<span class="hljs-string">'login'</span>],
        <span class="hljs-attribute">template</span>: <span class="hljs-string">'./src/login.html'</span>,
        <span class="hljs-attribute">filename</span>:<span class="hljs-string">'login.html'</span>
    })]
]
   </code></pre>
<h2 id="articleHeader33">14  externals</h2>
<p>如果我们想引用一个库，但是又不想让webpack打包，并且又不影响我们在程序中以CMD、AMD或者window/global全局等方式进行使用，那就可以通过配置externals。</p>
<blockquote>webpack.config.js</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="externals: {
    jquery: &quot;jQuery&quot;
    //如果要在浏览器中运行，那么不用添加什么前缀，默认设置就是global
}," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">externals: {
    <span class="hljs-attr">jquery</span>: <span class="hljs-string">"jQuery"</span>
    <span class="hljs-comment">//如果要在浏览器中运行，那么不用添加什么前缀，默认设置就是global</span>
},</code></pre>
<blockquote>index.js</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const $ = require(&quot;jquery&quot;);
const $ = window.jQuery;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> $ = <span class="hljs-built_in">require</span>(<span class="hljs-string">"jquery"</span>);
<span class="hljs-keyword">const</span> $ = <span class="hljs-built_in">window</span>.jQuery;</code></pre>
<h2 id="articleHeader34">15 参考文章</h2>
<ul>
<li><a href="https://webpack.js.org/concepts/" rel="nofollow noreferrer" target="_blank">webpack官方文档</a></li>
<li><a href="https://doc.webpack-china.org/concepts/" rel="nofollow noreferrer" target="_blank">webpack官方文档中文版</a></li>
<li><a href="https://github.com/webpack/webpack" rel="nofollow noreferrer" target="_blank">webpackGitHub</a></li>
</ul>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack4.0实战那些事儿

## 原文链接
[https://segmentfault.com/a/1190000014112145](https://segmentfault.com/a/1190000014112145)

