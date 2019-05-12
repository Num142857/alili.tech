---
title: 'webpack实践笔记（二）---添加 loaders' 
date: 2019-02-03 2:30:40
hidden: true
slug: 1w32n6euk0o
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">webpack实践笔记（二）--- add loaders</h2>
<h3 id="articleHeader1">[源码地址]：( <a href="https://github.com/silence717/webpack-practice" rel="nofollow noreferrer" target="_blank">https://github.com/silence717...</a> )</h3>
<p>本篇文章基于分支step2,切换分支：git checkout step2</p>
<h3 id="articleHeader2">loader加载顺序</h3>
<p>分了三个级别，preloaders,loaders,postloaders，分别代表前中后，三个处理状态。</p>
<h3 id="articleHeader3">添加es6 loader</h3>
<h4>创建一个es6的文件login.es6</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// login.es6
let login = (username, password) => {
    if(username !== 'admin' || password !== '123') {
        console.log('incorrect login');
    } else {
        console.log('correct login');
    }
};

login('admin', '123');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// login.es6</span>
<span class="hljs-keyword">let</span> login = <span class="hljs-function">(<span class="hljs-params">username, password</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span>(username !== <span class="hljs-string">'admin'</span> || password !== <span class="hljs-string">'123'</span>) {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'incorrect login'</span>);
    } <span class="hljs-keyword">else</span> {
        <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'correct login'</span>);
    }
};

login(<span class="hljs-string">'admin'</span>, <span class="hljs-string">'123'</span>);</code></pre>
<p>需要使用es6，由于浏览器支持不够，我们必须使用babel转为es5的code。</p>
<h4>安装babel相关的包：</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install babel-core babel-loader babel-preset-es2015" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install babel-core babel-loader babel-preset-es2015</code></pre>
<h4>创建babelrc文件，配置为:</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;presets&quot;: [&quot;es2015&quot;]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
  <span class="hljs-string">"presets"</span>: [<span class="hljs-string">"es2015"</span>]
}</code></pre>
<h4>webpack-config.js中配置loader</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
    loaders: [
        {
            test: /\.es6$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }
    ]
},
resolve: {
    extensions: ['', '.js', '.es6']
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-built_in">module</span>: {
    <span class="hljs-attr">loaders</span>: [
        {
            <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.es6$/</span>,
            <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
            <span class="hljs-attr">loader</span>: <span class="hljs-string">'babel-loader'</span>
        }
    ]
},
<span class="hljs-attr">resolve</span>: {
    <span class="hljs-attr">extensions</span>: [<span class="hljs-string">''</span>, <span class="hljs-string">'.js'</span>, <span class="hljs-string">'.es6'</span>]
}</code></pre>
<p>运行dev-server，看到文件成功执行，这时我们看到bundle.js中编译后的code为：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var login = function login(username, password) {
  if (username !== 'admin' || password !== '123') {}
};

login('admin', '456');" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> login = <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">login</span>(<span class="hljs-params">username, password</span>) </span>{
  <span class="hljs-keyword">if</span> (username !== <span class="hljs-string">'admin'</span> || password !== <span class="hljs-string">'123'</span>) {}
};

login(<span class="hljs-string">'admin'</span>, <span class="hljs-string">'456'</span>);</code></pre>
<h3 id="articleHeader4">添加preloader,对js文件进行校验</h3>
<p>我们习惯在项目中使用的是eslint,或者jslint也可以，看个人爱好。</p>
<h4>安装eslint相关包</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install eslint eslint-loader eslint-plugin-promise eslint-plugin-standard babel-eslint -D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install eslint eslint-loader eslint-plugin-promise eslint-plugin-standard babel-eslint -D</code></pre>
<h4>创建.eslintrc文件，每个公司采用适合自己的规则。配置文件较大，可查看项目源码。</h4>
<h4>webpack-config.js中添加配置,在此我们采用preloader</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="preLoaders: [
    {
        test: /\.js$/,
        exclude: 'node_modules',
        loader: 'eslint-loader'
    }
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">preLoaders: [
    {
        <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.js$/</span>,
        <span class="hljs-attr">exclude</span>: <span class="hljs-string">'node_modules'</span>,
        <span class="hljs-attr">loader</span>: <span class="hljs-string">'eslint-loader'</span>
    }
]</code></pre>
<p>重新启动，如果code中存在不符合规范的，webpack在编译时候就会出错，根据提示更改对应文件。</p>
<h3 id="articleHeader5">package.json中的scripts</h3>
<p>我不能一直使用这么复杂的命令去启动，so 我们可以在package.json中配置一下scripts：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;scripts&quot;: {
    &quot;start&quot;: &quot;webpack-dev-server&quot;,
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"start"</span>: <span class="hljs-string">"webpack-dev-server"</span>,
}</code></pre>
<p>这样我们每次启动只需要执行 npm start 即可。</p>
<p>在此说明两点：</p>
<ul>
<li><p>1、 npm的start是一个特殊的脚本名称，在命令行中使用npm start就可以执行相关命令，如果对应的此脚本名称不是start，想要在命令行中运行时，需要这样用npm run {script name}，如npm run dev.</p></li>
<li><p>2、 window环境下不支持&amp;连接命令执行，如：gulp &amp; nodemon mock-server.js。</p></li>
</ul>
<h3 id="articleHeader6">production vs dev</h3>
<p>生产环境我们需要对js进行打包压缩，而dev环境我们希望使用源码便于调试。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 生产环境 
webpack -d
// 开发环境
webpack -p" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-comment">// 生产环境 </span>
webpack -<span class="hljs-built_in">d</span>
<span class="hljs-comment">// 开发环境</span>
webpack -p</code></pre>
<p>分别执行这两个命令，你可以看到bundle.js内容是不相同的，一个压缩一个未经压缩。</p>
<h3 id="articleHeader7">为了便于管理，我们创建一个webpack-bulid.config.js文件</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var devConfig = require('./webpack.config');
module.exports = devConfig;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> devConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.config'</span>);
<span class="hljs-built_in">module</span>.exports = devConfig;</code></pre>
<p>通常在开发环境我们会经常使用console.log,debug来进行代码调试，这些其实是不允许带入生产环境的。<br>尽管采用一系列限制，但是为了防患于未然，我们引入strip-loader包：</p>
<h4>安装依赖包</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install strip-loader -D" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install strip-loader -D</code></pre>
<h4>webpack-build.config.js配置strip-loader</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var WebpackStrip = require('strip-loader');
var devConfig = require('./webpack.config');
var stripLoader = {
    test: [/\.js$/, /\.es6$/],
    exclude: /node_modules/,
    loader: WebpackStrip.loader('console.log', 'debug')
};
devConfig.module.loaders.push(stripLoader);
module.exports = devConfig;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> WebpackStrip = <span class="hljs-built_in">require</span>(<span class="hljs-string">'strip-loader'</span>);
<span class="hljs-keyword">var</span> devConfig = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./webpack.config'</span>);
<span class="hljs-keyword">var</span> stripLoader = {
    <span class="hljs-attr">test</span>: [<span class="hljs-regexp">/\.js$/</span>, /\.es6$/],
    <span class="hljs-attr">exclude</span>: <span class="hljs-regexp">/node_modules/</span>,
    <span class="hljs-attr">loader</span>: WebpackStrip.loader(<span class="hljs-string">'console.log'</span>, <span class="hljs-string">'debug'</span>)
};
devConfig.module.loaders.push(stripLoader);
<span class="hljs-built_in">module</span>.exports = devConfig;</code></pre>
<h4>设置webpack执行的配置文件</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="webpack --config webpack-build.config.js  -p" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">webpack --config webpack-build.config.js  -p</code></pre>
<p>这个命令执行完之后，bundle.js就按照build中的的配置对代码进行了一系列合作。</p>
<p>说明: webpack --config 用于设置使用哪个配置文件做操作。</p>
<h3 id="articleHeader8">为了便于调试，我们全局安装一个http-server,用于启动我们的项目。</h3>
<h4>安装http-server</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install http-server -g" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">npm install http-server -g</code></pre>
<h4>运行</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="http-server" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code style="word-break: break-word; white-space: initial;">http-<span class="hljs-keyword">server</span></code></pre>
<p>打开浏览器访问<a href="http://127.0.0.1:8080/," rel="nofollow noreferrer" target="_blank">http://127.0.0.1:8080/,</a><br>此时打开 console，发现并没有任何东西输出，这就是strip-loader的作用。<br>再查看sources中的bundle.js为压缩后的文件。</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack实践笔记（二）---添加 loaders

## 原文链接
[https://segmentfault.com/a/1190000006932131](https://segmentfault.com/a/1190000006932131)

