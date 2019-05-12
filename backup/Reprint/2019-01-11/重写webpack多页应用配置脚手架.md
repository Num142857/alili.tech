---
title: '重写webpack多页应用配置脚手架' 
date: 2019-01-11 2:30:08
hidden: true
slug: an72u4nj9ag
categories: [reprint]
---

{{< raw >}}

                    
<blockquote><p>之前写了一个webpack多页应用的配置，只有一个webpack.config.js文件，实现了多入口配置打包css,js,资源文件处理。因为入口entry配置需要自己添加，HtmlWebpackPlugin有多少个页面也要自己添加。这样看来虽然配置是成功的，但过于机械化，是不可取的</p></blockquote>
<h2 id="articleHeader0">为什么要进行多页应用配置？</h2>
<p>我们都知道开发vue,react这些应用时，一般都只有一个入口文件。而且官方都提供了自己的脚手架。可谓是很繁琐，偏离自己实际开发的环境时，这些脚手架就不能满足我们的要求了。虽然也有很多别人写的多页配置，但是感觉配置模块分离过于严重，而且满足不了自己的需求，不适合新手学习使用。</p>
<blockquote><p>很多传统网页的开发还是要写很多静态界面，比如我们公司，官网展示类的网站。如果要按照传统的开发模式，我们要为不同的页面添加css文件，js文件，这样大大的增加了工作量，而且很枯燥。而且不能使用es6,scss.<br>所以这个webpack多页配置就是为了解决这些问题，拥抱es6.</p></blockquote>
<p>完整配置：<a href="https://github.com/HelTi/webpack-M-pages" rel="nofollow noreferrer" target="_blank">webpack-M-pages</a></p>
<h3 id="articleHeader1">先看下脚手架的目录</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="│  .babelrc
│  .gitignore
│  a.txt
│  base.plugin.js //动态生成HtmlWebpackPlugin
│  entry.config.js//读取多页入口文件
│  package.json
│  pagesArray.js //获取多页文件，HtmlWebpackPlugin的参数
│  README.md
│  utils.js  //生产环境与开发环境
│  webpack.config.js
│  
└─src
    ├─common //公用样式
    │  ├─css
    │  │      reset.css
    │  │      
    │  └─js  //公用js
    │          common.js
    │          easyTable.js
    │          
    ├─css
    │  │  bootstrap.css
    │  │  index.css
    │  │  
    │  ├─pageA
    │  │      a.css
    │  │      as.scss
    │  │      
    │  ├─pageB
    │  │      b.css
    │  │      bb.scss
    │  │      
    │  └─pageC
    │          c.css
    │          
    ├─fonts
    │      glyphicons-halflings-regular.eot
    │      glyphicons-halflings-regular.svg
    │      glyphicons-halflings-regular.ttf
    │      glyphicons-halflings-regular.woff
    │      glyphicons-halflings-regular.woff2
    │      
    ├─img
    │      ph.jpg
    │      
    ├─js
        │      index.js
        │      mod.js
        │      pageA.js
        │      pageB.js
        │      pageC.js
        │      testm.js
        │      
        ├─lib
        │      easyTable.js
        │      mod.js
        │      
        └─pages
                index.html
                pageA.html
                pageB.html
                pageC.html" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>│  <span class="hljs-selector-class">.babelrc</span>
│  <span class="hljs-selector-class">.gitignore</span>
│  <span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.txt</span>
│  base<span class="hljs-selector-class">.plugin</span><span class="hljs-selector-class">.js</span> <span class="hljs-comment">//动态生成HtmlWebpackPlugin</span>
│  entry<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span><span class="hljs-comment">//读取多页入口文件</span>
│  package<span class="hljs-selector-class">.json</span>
│  pagesArray<span class="hljs-selector-class">.js</span> <span class="hljs-comment">//获取多页文件，HtmlWebpackPlugin的参数</span>
│  README<span class="hljs-selector-class">.md</span>
│  utils<span class="hljs-selector-class">.js</span>  <span class="hljs-comment">//生产环境与开发环境</span>
│  webpack<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span>
│  
└─src
    ├─common <span class="hljs-comment">//公用样式</span>
    │  ├─css
    │  │      reset<span class="hljs-selector-class">.css</span>
    │  │      
    │  └─js  <span class="hljs-comment">//公用js</span>
    │          common<span class="hljs-selector-class">.js</span>
    │          easyTable<span class="hljs-selector-class">.js</span>
    │          
    ├─css
    │  │  bootstrap<span class="hljs-selector-class">.css</span>
    │  │  index<span class="hljs-selector-class">.css</span>
    │  │  
    │  ├─pageA
    │  │      <span class="hljs-selector-tag">a</span><span class="hljs-selector-class">.css</span>
    │  │      as<span class="hljs-selector-class">.scss</span>
    │  │      
    │  ├─pageB
    │  │      <span class="hljs-selector-tag">b</span><span class="hljs-selector-class">.css</span>
    │  │      bb<span class="hljs-selector-class">.scss</span>
    │  │      
    │  └─pageC
    │          c<span class="hljs-selector-class">.css</span>
    │          
    ├─fonts
    │      glyphicons-halflings-regular<span class="hljs-selector-class">.eot</span>
    │      glyphicons-halflings-regular<span class="hljs-selector-class">.svg</span>
    │      glyphicons-halflings-regular<span class="hljs-selector-class">.ttf</span>
    │      glyphicons-halflings-regular<span class="hljs-selector-class">.woff</span>
    │      glyphicons-halflings-regular<span class="hljs-selector-class">.woff2</span>
    │      
    ├─<span class="hljs-selector-tag">img</span>
    │      ph<span class="hljs-selector-class">.jpg</span>
    │      
    ├─js
        │      index<span class="hljs-selector-class">.js</span>
        │      mod<span class="hljs-selector-class">.js</span>
        │      pageA<span class="hljs-selector-class">.js</span>
        │      pageB<span class="hljs-selector-class">.js</span>
        │      pageC<span class="hljs-selector-class">.js</span>
        │      testm<span class="hljs-selector-class">.js</span>
        │      
        ├─lib
        │      easyTable<span class="hljs-selector-class">.js</span>
        │      mod<span class="hljs-selector-class">.js</span>
        │      
        └─pages
                index<span class="hljs-selector-class">.html</span>
                pageA<span class="hljs-selector-class">.html</span>
                pageB<span class="hljs-selector-class">.html</span>
                pageC.html</code></pre>
<h3 id="articleHeader2">打包后的目录</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="│  index.html
│  pageA.html
│  pageB.html
│  pageC.html
│  
└─static
    ├─css
    │      index.css
    │      index.css.map
    │      pageA.css
    │      pageA.css.map
    │      
    ├─fonts
    │      glyphicons-halflings-regular.eot
    │      glyphicons-halflings-regular.ttf
    │      glyphicons-halflings-regular.woff
    │      glyphicons-halflings-regular.woff2
    │      
    ├─img
    │      glyphicons-halflings-regular.f721466.svg
    │      ph.50e1eb2.jpg
    │      
    └─js
            indexa94351a6f2b24f4c647a.js
            moda94351a6f2b24f4c647a.js
            pageAa94351a6f2b24f4c647a.js
            pageBa94351a6f2b24f4c647a.js
            pageCa94351a6f2b24f4c647a.js
            testma94351a6f2b24f4c647a.js
            vendorsa94351a6f2b24f4c647a.js
            " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>│  index<span class="hljs-selector-class">.html</span>
│  pageA<span class="hljs-selector-class">.html</span>
│  pageB<span class="hljs-selector-class">.html</span>
│  pageC<span class="hljs-selector-class">.html</span>
│  
└─static
    ├─css
    │      index<span class="hljs-selector-class">.css</span>
    │      index<span class="hljs-selector-class">.css</span><span class="hljs-selector-class">.map</span>
    │      pageA<span class="hljs-selector-class">.css</span>
    │      pageA<span class="hljs-selector-class">.css</span><span class="hljs-selector-class">.map</span>
    │      
    ├─fonts
    │      glyphicons-halflings-regular<span class="hljs-selector-class">.eot</span>
    │      glyphicons-halflings-regular<span class="hljs-selector-class">.ttf</span>
    │      glyphicons-halflings-regular<span class="hljs-selector-class">.woff</span>
    │      glyphicons-halflings-regular<span class="hljs-selector-class">.woff2</span>
    │      
    ├─<span class="hljs-selector-tag">img</span>
    │      glyphicons-halflings-regular<span class="hljs-selector-class">.f721466</span><span class="hljs-selector-class">.svg</span>
    │      ph.<span class="hljs-number">50</span>e1eb2<span class="hljs-selector-class">.jpg</span>
    │      
    └─js
            indexa94351a6f2b24f4c647a<span class="hljs-selector-class">.js</span>
            moda94351a6f2b24f4c647a<span class="hljs-selector-class">.js</span>
            pageAa94351a6f2b24f4c647a<span class="hljs-selector-class">.js</span>
            pageBa94351a6f2b24f4c647a<span class="hljs-selector-class">.js</span>
            pageCa94351a6f2b24f4c647a<span class="hljs-selector-class">.js</span>
            testma94351a6f2b24f4c647a<span class="hljs-selector-class">.js</span>
            vendorsa94351a6f2b24f4c647a<span class="hljs-selector-class">.js</span>
            </code></pre>
<h3 id="articleHeader3">怎么自动注入entry配置？</h3>
<p>webpack的entry配置是这样的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    devtool: '#source-map',
    entry:{
        index:'',
        about:'',
        home:'',
        .....
       }
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code><span class="hljs-keyword">module</span>.exports = {
    devtool: <span class="hljs-string">'#source-map'</span>,
    entry:{
        index:<span class="hljs-string">''</span>,
        about:<span class="hljs-string">''</span>,
        home:<span class="hljs-string">''</span>,
        .....
       }
    }</code></pre>
<h4>1.问题来了，当入口文件很多的时候怎么办？ 一个个写？显然这是不可行的。怎么解决？</h4>
<blockquote><p>当然是读取文件夹下的文件了，然后写入配置呗。</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//entry.config.js
var path = require('path');
var fs = require('fs');
let entry_files = {};
function each_file(dir) {
    try {
        fs.readdirSync(dir).forEach(function (file) {
            var file_path = dir + '/' + file;
            var fname = path.basename(file, '.js');
            entry_files[fname]=file_path;
        })
    } catch (e) {

    }
}
each_file('./src/js');
//entry_files是一个object对象，也就是遍历js文件夹下的js文件，然后写成entry所需配置的格式。
module.exports=entry_files;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">//entry.config.js</span>
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);
<span class="hljs-keyword">let</span> entry_files = {};
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">each_file</span>(<span class="hljs-params">dir</span>) </span>{
    <span class="hljs-keyword">try</span> {
        fs.readdirSync(dir).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">file</span>) </span>{
            <span class="hljs-keyword">var</span> file_path = dir + <span class="hljs-string">'/'</span> + file;
            <span class="hljs-keyword">var</span> fname = path.basename(file, <span class="hljs-string">'.js'</span>);
            entry_files[fname]=file_path;
        })
    } <span class="hljs-keyword">catch</span> (e) {

    }
}
each_file(<span class="hljs-string">'./src/js'</span>);
<span class="hljs-comment">//entry_files是一个object对象，也就是遍历js文件夹下的js文件，然后写成entry所需配置的格式。</span>
<span class="hljs-built_in">module</span>.exports=entry_files;</code></pre>
<p>OK，这样我们的入口配置文件就可以这样简写了。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var entry_files=require('./entry.config');
module.exports = {
    devtool: '#source-map',
    entry: entry_files,
    
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">var</span> entry_files=<span class="hljs-built_in">require</span>(<span class="hljs-string">'./entry.config'</span>);
<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">devtool</span>: <span class="hljs-string">'#source-map'</span>,
    <span class="hljs-attr">entry</span>: entry_files,
    
    }</code></pre>
<h3 id="articleHeader4">怎么自动配置HtmlWebpackPlugin？</h3>
<blockquote><p>这个其实就和自动注入entry配置一样，所以我们先看下 HtmlWebpackPlugin的配置</p></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new HtmlWebpackPlugin({
        template: '',//你的html页面地址
        filename: '',//生成后html的名字
        chunks: ['vendors'],
        // hash:true,
        minify: {
            removeComments: true,
            collapseWhitespace: false //删除空白符与换行符
        }
    });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-selector-tag">new</span> <span class="hljs-selector-tag">HtmlWebpackPlugin</span>({
        <span class="hljs-attribute">template</span>: <span class="hljs-string">''</span>,<span class="hljs-comment">//你的html页面地址</span>
        <span class="hljs-attribute">filename</span>: <span class="hljs-string">''</span>,<span class="hljs-comment">//生成后html的名字</span>
        <span class="hljs-attribute">chunks</span>: [<span class="hljs-string">'vendors'</span>],
        <span class="hljs-comment">// hash:true,</span>
        <span class="hljs-attribute">minify</span>: {
            <span class="hljs-attribute">removeComments</span>: true,
            <span class="hljs-attribute">collapseWhitespace</span>: false <span class="hljs-comment">//删除空白符与换行符</span>
        }
    });</code></pre>
<p>OK,一样的办法我们读取html模板文件，然后写成需要的格式呗</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//pagesArray.js
var path = require('path');
var fs = require('fs');
let pagesArray = [];
function each_file(dir) {
    try {
        fs.readdirSync(dir).forEach(function (file) {
            /*
            * {
            *   index:'./src/index.html',
            *   chunkname:'index'
            * }
            * */
            var file_obj={};
            var file_path = dir + '/' + file;
            var chunk_name = path.basename(file, '.html');
            file_obj['filename']=file;
            file_obj['template']=file_path;
            file_obj['chuckName']=chunk_name;
            pagesArray.push(file_obj)
        })
    } catch (e) {

    }
}
each_file('./src/pages');
//导出我们需要的html模板信息
module.exports=pagesArray;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//pagesArray.js</span>
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">var</span> fs = <span class="hljs-built_in">require</span>(<span class="hljs-string">'fs'</span>);
<span class="hljs-keyword">let</span> pagesArray = [];
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">each_file</span>(<span class="hljs-params">dir</span>) </span>{
    <span class="hljs-keyword">try</span> {
        fs.readdirSync(dir).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span> (<span class="hljs-params">file</span>) </span>{
            <span class="hljs-comment">/*
            * {
            *   index:'./src/index.html',
            *   chunkname:'index'
            * }
            * */</span>
            <span class="hljs-keyword">var</span> file_obj={};
            <span class="hljs-keyword">var</span> file_path = dir + <span class="hljs-string">'/'</span> + file;
            <span class="hljs-keyword">var</span> chunk_name = path.basename(file, <span class="hljs-string">'.html'</span>);
            file_obj[<span class="hljs-string">'filename'</span>]=file;
            file_obj[<span class="hljs-string">'template'</span>]=file_path;
            file_obj[<span class="hljs-string">'chuckName'</span>]=chunk_name;
            pagesArray.push(file_obj)
        })
    } <span class="hljs-keyword">catch</span> (e) {

    }
}
each_file(<span class="hljs-string">'./src/pages'</span>);
<span class="hljs-comment">//导出我们需要的html模板信息</span>
<span class="hljs-built_in">module</span>.exports=pagesArray;</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="/*遍历页面，添加配置*/
pagesArray.forEach((page)=>{
    const htmlPlugin = new HtmlWebpackPlugin({
        template: page.template,
        filename: page.filename,
        chunks: ['vendors', page.chuckName],
        // hash:true,
        minify: {
            removeComments: true,
            collapseWhitespace: false //删除空白符与换行符
        }
    });

    base_plugin.push(htmlPlugin)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">/*遍历页面，添加配置*/</span>
<span class="hljs-string">pagesArray.forEach((page)=&gt;{</span>
    <span class="hljs-string">const</span> <span class="hljs-string">htmlPlugin</span> <span class="hljs-string">=</span> <span class="hljs-string">new</span> <span class="hljs-string">HtmlWebpackPlugin({</span>
<span class="hljs-attr">        template:</span> <span class="hljs-string">page.template,</span>
<span class="hljs-attr">        filename:</span> <span class="hljs-string">page.filename,</span>
<span class="hljs-attr">        chunks:</span> <span class="hljs-string">['vendors',</span> <span class="hljs-string">page.chuckName],</span>
        <span class="hljs-string">//</span> <span class="hljs-attr">hash:true,</span>
<span class="hljs-attr">        minify:</span> <span class="hljs-string">{</span>
<span class="hljs-attr">            removeComments:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>
<span class="hljs-attr">            collapseWhitespace:</span> <span class="hljs-literal">false</span> <span class="hljs-string">//删除空白符与换行符</span>
        <span class="hljs-string">}</span>
    <span class="hljs-string">});</span>

    <span class="hljs-string">base_plugin.push(htmlPlugin)</span></code></pre>
<p>然后就可以这样配置webpack了</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  plugins: require('./base.plugin')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs coffeescript"><code style="word-break: break-word; white-space: initial;">  plugins: <span class="hljs-built_in">require</span>(<span class="hljs-string">'./base.plugin'</span>)</code></pre>
<p>这样就算我们完成了多页配置了，是不是很不错呢？</p>
<h3 id="articleHeader5">温馨提示</h3>
<p>如何在windows下使用cmd命令生成文件树？</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="tree /f > tree.txt" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dos"><code style="word-break: break-word; white-space: initial;"><span class="hljs-built_in">tree</span> /f &gt; <span class="hljs-built_in">tree</span>.txt</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
重写webpack多页应用配置脚手架

## 原文链接
[https://segmentfault.com/a/1190000009916612](https://segmentfault.com/a/1190000009916612)

