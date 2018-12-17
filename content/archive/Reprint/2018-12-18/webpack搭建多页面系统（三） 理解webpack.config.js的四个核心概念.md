---
title: 'webpack搭建多页面系统（三） 理解webpack.config.js的四个核心概念' 
date: 2018-12-18 2:30:11
hidden: true
slug: dzhx5ay8kwi
categories: [reprint]
---

{{< raw >}}

                    
<p>webpack是需要自己编写自己需要的一个配置对象，取决你如何使用webpack,下面指定了所有的可用的配置选项。<br>参考文档：<a href="https://doc.webpack-china.org/configuration" rel="nofollow noreferrer" target="_blank">https://doc.webpack-china.org...</a></p>
<p>webapck.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path'); #使用Node内置的path模块，并在它前面加上__dirname这个全局变量。可以防止
不同操作系统之间的文件路径问题，并且可以使用相对路径按照预期工作。
var webpackConfig = {
    devtool:'inline-source-map', //开发错误提示，嵌入到源文件
    entry:{ },  //string | object | array ;这里应用程序开始执行；webpack开始打包
    output:{ },  //webpack 如何输出结果的相关选项
    devServer:{ },  //开发服务器配置，
    module:{         //关于模块配置
        rules:[]     //模块规则（配置loader、解析器等选项）
    },
    plugins:plugins, //附加插件列表
}
module.exports = webpackConfig;
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>); #使用Node内置的path模块，并在它前面加上__dirname这个全局变量。可以防止
不同操作系统之间的文件路径问题，并且可以使用相对路径按照预期工作。
<span class="hljs-keyword">var</span> webpackConfig = {
    devtool:<span class="hljs-string">'inline-source-map'</span>, <span class="hljs-comment">//开发错误提示，嵌入到源文件</span>
    entry:{ },  <span class="hljs-comment">//string | object | array ;这里应用程序开始执行；webpack开始打包</span>
    output:{ },  <span class="hljs-comment">//webpack 如何输出结果的相关选项</span>
    devServer:{ },  <span class="hljs-comment">//开发服务器配置，</span>
    <span class="hljs-keyword">module</span>:{         <span class="hljs-comment">//关于模块配置</span>
        rules:[]     <span class="hljs-comment">//模块规则（配置loader、解析器等选项）</span>
    },
    plugins:plugins, <span class="hljs-comment">//附加插件列表</span>
}
<span class="hljs-built_in">module</span>.exports = webpackConfig;
</code></pre>
<h2 id="articleHeader0">1、entry参数：入口文件配置</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="entry: //string | array | object。入口文件是应用程序的起点入口，从这里应用程序启动执行。如果传递的是一个数组，
        那么数组的每一项都会执行。
规则：每个HTML页面都有一个入口起点。单页应用（SPA）：一个入口起点；多页应用（MPA）：多个入口起点。
命名：如果传入一个字符串或字符串数组，chunk会被命名为main。如果传入一个对象，则每一个键（key）是chunk的名称，
        该值描述了chunk的入口起点。


在我的配置中，由于是对多页面的处理，所以采用entry:object;每一个键（key）是chunk的名称，同时又是chunk的入口起点。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs smali"><code>entry: //string |<span class="hljs-built_in"> array </span>| object。入口文件是应用程序的起点入口，从这里应用程序启动执行。如果传递的是一个数组，
        那么数组的每一项都会执行。
规则：每个HTML页面都有一个入口起点。单页应用（SPA）：一个入口起点；多页应用（MPA）：多个入口起点。
命名：如果传入一个字符串或字符串数组，chunk会被命名为main。如果传入一个对象，则每一个键（key）是chunk的名称，
        该值描述了chunk的入口起点。


在我的配置中，由于是对多页面的处理，所以采用entry:object;每一个键（key）是chunk的名称，同时又是chunk的入口起点。
</code></pre>
<p>webpack.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//glob在webpack中对文件的路径处理
var glob = require('glob');
const HtmlWebpackPlugin = require(&quot;html-webpack-plugin&quot;)
var webpackConfig = {
    /*webpack基础配置*/
};    
//封装方法，获取指定路径下的入口文件
//返回的结构 [ 'src/pages/contact/contact/index.js',
//            'src/pages/index/index/index.js',
//            'src/pages/join/join/index.js',
//            'src/pages/pagea/index/index.js' ]
function getEntries(globPath){
    //方法： glob.sync(pattern,[options])；该方法成功后，返回匹配搜索之后的数组，
    //没有匹配返回一个空数组;pattern:'src/pages/**/index.js';这里‘**’匹配模式表示的是
    位于src/pages/和/index.js的这两层文件名
    var files = glob.sync(globPath),
    entries = {};
    files.forEach(function(filepath){
        //取倒数第二层（pages下面的文件夹）做包名
        var split = filepath.split('/');
        var name = split[split.length - 2];
        
        entries[name] = './' + filepath;
    });
    return entries;
};
//
var entries = getEntries('src/pages/**/index.js');
Object.keys(entries).forEach(function(name){
    //这里循环输出每一个页面的entry,
    webpackConfig.entry[name] = entries[name];
    //判断是否是登陆页面;因为登陆页面和其他页面是两个不同的模板
    //HtmlWebpackPlugin插件的详细用法参考：https://segmentfault.com/a/1190000007294861
    if(name == 'login/login'){
        var plugin = new HtmlWebpackPlugin({
            //有模板生成的html文件名
            filename:'login.html',
            //登陆页面的html模板
            template:'./src/login.html',
            inject:'body',
            chunks:['commons',name]
        });
    }else{
        var plugin = new HtmlWebpackPlugin({
            //有模板生成出来的html文件名
            filename:name + '.html',
            //除登陆页面外，多个页面使用同一个模板
            template:'./src/index.tmpl.html',
            inject:'body',
            chunks:['commons',name]
        })
    }
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs php"><code><span class="hljs-comment">//glob在webpack中对文件的路径处理</span>
<span class="hljs-keyword">var</span> glob = <span class="hljs-keyword">require</span>(<span class="hljs-string">'glob'</span>);
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-keyword">require</span>(<span class="hljs-string">"html-webpack-plugin"</span>)
<span class="hljs-keyword">var</span> webpackConfig = {
    <span class="hljs-comment">/*webpack基础配置*/</span>
};    
<span class="hljs-comment">//封装方法，获取指定路径下的入口文件</span>
<span class="hljs-comment">//返回的结构 [ 'src/pages/contact/contact/index.js',</span>
<span class="hljs-comment">//            'src/pages/index/index/index.js',</span>
<span class="hljs-comment">//            'src/pages/join/join/index.js',</span>
<span class="hljs-comment">//            'src/pages/pagea/index/index.js' ]</span>
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">getEntries</span><span class="hljs-params">(globPath)</span></span>{
    <span class="hljs-comment">//方法： glob.sync(pattern,[options])；该方法成功后，返回匹配搜索之后的数组，</span>
    <span class="hljs-comment">//没有匹配返回一个空数组;pattern:'src/pages/**/index.js';这里‘**’匹配模式表示的是</span>
    位于src/pages/和/index.js的这两层文件名
    <span class="hljs-keyword">var</span> files = glob.sync(globPath),
    entries = {};
    files.<span class="hljs-keyword">forEach</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(filepath)</span></span>{
        <span class="hljs-comment">//取倒数第二层（pages下面的文件夹）做包名</span>
        <span class="hljs-keyword">var</span> split = filepath.split(<span class="hljs-string">'/'</span>);
        <span class="hljs-keyword">var</span> name = split[split.length - <span class="hljs-number">2</span>];
        
        entries[name] = <span class="hljs-string">'./'</span> + filepath;
    });
    <span class="hljs-keyword">return</span> entries;
};
<span class="hljs-comment">//</span>
<span class="hljs-keyword">var</span> entries = getEntries(<span class="hljs-string">'src/pages/**/index.js'</span>);
Object.keys(entries).<span class="hljs-keyword">forEach</span>(<span class="hljs-function"><span class="hljs-keyword">function</span><span class="hljs-params">(name)</span></span>{
    <span class="hljs-comment">//这里循环输出每一个页面的entry,</span>
    webpackConfig.entry[name] = entries[name];
    <span class="hljs-comment">//判断是否是登陆页面;因为登陆页面和其他页面是两个不同的模板</span>
    <span class="hljs-comment">//HtmlWebpackPlugin插件的详细用法参考：https://segmentfault.com/a/1190000007294861</span>
    <span class="hljs-keyword">if</span>(name == <span class="hljs-string">'login/login'</span>){
        <span class="hljs-keyword">var</span> plugin = <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
            <span class="hljs-comment">//有模板生成的html文件名</span>
            filename:<span class="hljs-string">'login.html'</span>,
            <span class="hljs-comment">//登陆页面的html模板</span>
            template:<span class="hljs-string">'./src/login.html'</span>,
            inject:<span class="hljs-string">'body'</span>,
            chunks:[<span class="hljs-string">'commons'</span>,name]
        });
    }<span class="hljs-keyword">else</span>{
        <span class="hljs-keyword">var</span> plugin = <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
            <span class="hljs-comment">//有模板生成出来的html文件名</span>
            filename:name + <span class="hljs-string">'.html'</span>,
            <span class="hljs-comment">//除登陆页面外，多个页面使用同一个模板</span>
            template:<span class="hljs-string">'./src/index.tmpl.html'</span>,
            inject:<span class="hljs-string">'body'</span>,
            chunks:[<span class="hljs-string">'commons'</span>,name]
        })
    }
})</code></pre>
<h2 id="articleHeader1">2、output参数：输出文件配置</h2>
<p>output包括一组选项，指示webpack如何去输出、以及在哪里输出你的(bundle、asset和其他你所打包或使用webpack载入的任何内容)。<br>常用的参数path、publicPath、filename、chunkFilename.<br>在我的webpack.config.js的配置中：<br>webpack.config.js:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    var webpackConfig = {
        devtool:'inline-source-map',
        entry:{ },
        output:{
            path:__dirname + 'build',
            filename: &quot;js/[name].bundle-[chunkhash:8].js&quot;
        },
        devServer:{ },
        module:{
            rules:rules
        },
        plugins:plugins
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code>    <span class="hljs-string">var</span> <span class="hljs-string">webpackConfig</span> <span class="hljs-string">=</span> <span class="hljs-string">{</span>
<span class="hljs-attr">        devtool:</span><span class="hljs-string">'inline-source-map'</span><span class="hljs-string">,</span>
<span class="hljs-attr">        entry:</span><span class="hljs-string">{</span> <span class="hljs-string">},</span>
<span class="hljs-attr">        output:</span><span class="hljs-string">{</span>
<span class="hljs-attr">            path:</span><span class="hljs-string">__dirname</span> <span class="hljs-string">+</span> <span class="hljs-string">'build'</span><span class="hljs-string">,</span>
<span class="hljs-attr">            filename:</span> <span class="hljs-string">"js/[name].bundle-[chunkhash:8].js"</span>
        <span class="hljs-string">},</span>
<span class="hljs-attr">        devServer:</span><span class="hljs-string">{</span> <span class="hljs-string">},</span>
<span class="hljs-attr">        module:</span><span class="hljs-string">{</span>
<span class="hljs-attr">            rules:</span><span class="hljs-string">rules</span>
        <span class="hljs-string">},</span>
<span class="hljs-attr">        plugins:</span><span class="hljs-string">plugins</span>
    <span class="hljs-string">}</span></code></pre>
<p>output.path:string;output目录对应一个绝对路径 #path:path.resolve(__dirname,'bulid')<br>output.filename:string;此选项决定了每一个输出bundle的名称。这些bundle将写入到output.path选项指定的目录下。<br>两种情况：<br> 1、对于单入口起点，filename会是一个静态名称。filename:"bundle.js"。<br> 2、对于多入口起点、代码拆分或各种插件创建多个bundle，应该使用以下四种方式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" (a)使用入口名称：  filename:&quot;[name].bundle.js&quot;;
 (b)使用内部chunk id : filename:&quot;[id].bundle.js&quot;;
 (c)使用每次构建过程中，唯一的hash生成：filename:&quot;[name].[hash].bundle.js&quot;;
 (d)使用基于每个chunk内容的hash: filename:&quot;[chunkhash].bundle.js&quot;;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code> (<span class="hljs-selector-tag">a</span>)使用入口名称：  <span class="hljs-selector-tag">filename</span><span class="hljs-selector-pseudo">:"</span><span class="hljs-selector-attr">[name]</span><span class="hljs-selector-class">.bundle</span><span class="hljs-selector-class">.js</span>";
 (<span class="hljs-selector-tag">b</span>)使用内部<span class="hljs-selector-tag">chunk</span> <span class="hljs-selector-tag">id</span> : <span class="hljs-selector-tag">filename</span><span class="hljs-selector-pseudo">:"</span><span class="hljs-selector-attr">[id]</span><span class="hljs-selector-class">.bundle</span><span class="hljs-selector-class">.js</span>";
 (<span class="hljs-selector-tag">c</span>)使用每次构建过程中，唯一的<span class="hljs-selector-tag">hash</span>生成：<span class="hljs-selector-tag">filename</span><span class="hljs-selector-pseudo">:"</span><span class="hljs-selector-attr">[name]</span>.<span class="hljs-selector-attr">[hash]</span><span class="hljs-selector-class">.bundle</span><span class="hljs-selector-class">.js</span>";
 (<span class="hljs-selector-tag">d</span>)使用基于每个<span class="hljs-selector-tag">chunk</span>内容的<span class="hljs-selector-tag">hash</span>: <span class="hljs-selector-tag">filename</span><span class="hljs-selector-pseudo">:"</span><span class="hljs-selector-attr">[chunkhash]</span><span class="hljs-selector-class">.bundle</span><span class="hljs-selector-class">.js</span>";</code></pre>
<p>这里涉及到缓存的知识：参考文档：<a href="https://doc.webpack-china.org/guides/caching" rel="nofollow noreferrer" target="_blank">https://doc.webpack-china.org...</a><br>可以通过命中缓存的技术，以降低网络流量，使网站加载速度更快，如果我们在部署新版本时不更改资源的文件名，浏览器就可能认为它没有更新，就会使用它的缓存版本，通过必要的配置，以确保webpack编译生成的文件能够被客户端缓存，而在文件内容变化后，能够请求到新的文件。<br>输出文件的文件名(output.filename):<br>通过使用output.filename的不同的方式，可以确保浏览器获取修改后的文件。文档中建议使用[chunkhash]替换，在文件名中包含一个chunk相关的哈希。</p>
<h2 id="articleHeader2">3、常用loader(加载器)配置:module参数</h2>
<p>Loaders的常用的加载器，参考文档：<a href="https://doc.webpack-china.org/loaders" rel="nofollow noreferrer" target="_blank">https://doc.webpack-china.org...</a><br>安装相对应的loader：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev css-loader;作用是指示webpack对每个.css使用css-loader" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install </span>--save-dev css-loader<span class="hljs-comment">;作用是指示webpack对每个.css使用css-loader</span></code></pre>
<p>使用Loader的方法:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="在应用程序中，有三种使用loader的方式：
1、配置（推荐）：在webpaack.config.js文件中指定loader。
2、内联：在每个import 语句中显示指定loader。
3、CLI: 在shell命令中指定它们。
配置[Configuration]：
    module.rules允许你在webpack配置中指定多个loader。这是展示loader的一种简明方式，有助于使代码变得简洁。
    这是我经常用的书写方式。
    module:{
        rules:[
            {
              test:/\.css$/,
              use:[
                  { loader: 'style-loader' },
                  {
                    loader:'css-loader',
                    options{
                        modules:true
                    }
                  }
              ]
            }
        ]
    }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>在应用程序中，有三种使用<span class="hljs-selector-tag">loader</span>的方式：
1、配置（推荐）：在<span class="hljs-selector-tag">webpaack</span><span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span>文件中指定<span class="hljs-selector-tag">loader</span>。
2、内联：在每个<span class="hljs-selector-tag">import</span> 语句中显示指定<span class="hljs-selector-tag">loader</span>。
3、<span class="hljs-selector-tag">CLI</span>: 在<span class="hljs-selector-tag">shell</span>命令中指定它们。
配置<span class="hljs-selector-attr">[Configuration]</span>：
    <span class="hljs-selector-tag">module</span><span class="hljs-selector-class">.rules</span>允许你在<span class="hljs-selector-tag">webpack</span>配置中指定多个<span class="hljs-selector-tag">loader</span>。这是展示<span class="hljs-selector-tag">loader</span>的一种简明方式，有助于使代码变得简洁。
    这是我经常用的书写方式。
    <span class="hljs-selector-tag">module</span>:{
        <span class="hljs-attribute">rules</span>:[
            {
              test:/\.css$/,
              use:[
                  { loader: <span class="hljs-string">'style-loader'</span> },
                  {
                    <span class="hljs-attribute">loader</span>:<span class="hljs-string">'css-loader'</span>,
                    options{
                        modules:true
                    }
                  }
              ]
            }
        ]
    }
</code></pre>
<p>下面介绍一些常用的loader的用法：</p>
<h4>1、html-loader</h4>
<p>html-loader 导出HTML为字符串，需要引用静态资源。<br>关于模板(templating)的有好几种：html-loader、pug-loader、jade-loader、markdown-loader、posthtml-loader、react-markdown-loader、handlebars-loader、markup-inline-loader。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="只介绍html-loader的使用：
参考文档：https://doc.webpack-china.org/loaders/html-loader
安装：
    npm install --save-dev html-loader
用法：
    默认情况下，每个本地的<img src=&quot;image.png&quot;>都需要require(require(./image.png))来进行加载。
    不过这需要file-loader或url-loader(这个后面有介绍)。
示例：
    module:{
        rules:[{
            test:/\.html$/,        #匹配以‘.html’结尾的模块；
            loader:'html-loader',  #html-loader加载器
            options:{              #可选项(一般用于上线的webpack.build.config中)
                minimize: true,            #Boolean: 是否压缩html
                removeComments: true,      #Boolean: 是否删除注释  
                collapseWhitespace: true， #Boolean: 是否删除空格  
            }
        }]
    }
    " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">只介绍html-loader的使用：</span>
<span class="hljs-string">参考文档：https://doc.webpack-china.org/loaders/html-loader</span>
<span class="hljs-string">安装：</span>
    <span class="hljs-string">npm</span> <span class="hljs-string">install</span> <span class="hljs-bullet">--save-dev</span> <span class="hljs-string">html-loader</span>
<span class="hljs-string">用法：</span>
    <span class="hljs-string">默认情况下，每个本地的&lt;img</span> <span class="hljs-string">src="image.png"&gt;都需要require(require(./image.png))来进行加载。</span>
    <span class="hljs-string">不过这需要file-loader或url-loader(这个后面有介绍)。</span>
<span class="hljs-string">示例：</span>
<span class="hljs-attr">    module:</span><span class="hljs-string">{</span>
<span class="hljs-attr">        rules:</span><span class="hljs-string">[{</span>
<span class="hljs-attr">            test:</span><span class="hljs-string">/\.html$/,</span>        <span class="hljs-comment">#匹配以‘.html’结尾的模块；</span>
<span class="hljs-attr">            loader:</span><span class="hljs-string">'html-loader'</span><span class="hljs-string">,</span>  <span class="hljs-comment">#html-loader加载器</span>
<span class="hljs-attr">            options:</span><span class="hljs-string">{</span>              <span class="hljs-comment">#可选项(一般用于上线的webpack.build.config中)</span>
<span class="hljs-attr">                minimize:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>            <span class="hljs-comment">#Boolean: 是否压缩html</span>
<span class="hljs-attr">                removeComments:</span> <span class="hljs-literal">true</span><span class="hljs-string">,</span>      <span class="hljs-comment">#Boolean: 是否删除注释  </span>
<span class="hljs-attr">                collapseWhitespace:</span> <span class="hljs-literal">true</span><span class="hljs-string">，</span> <span class="hljs-comment">#Boolean: 是否删除空格  </span>
            <span class="hljs-string">}</span>
        <span class="hljs-string">}]</span>
    <span class="hljs-string">}</span>
    </code></pre>
<h4>2、babel-loader</h4>
<p>babel-loader 加载es2015代码，并且将代码转译为ES5<br>参考文档：<a href="https://doc.webpack-china.org/loaders/babel-loader" rel="nofollow noreferrer" target="_blank">https://doc.webpack-china.org...</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="安装：
npm install --save-dev babel-loader babel-core babel-preset-env
用法：
在webpack配置对象中，需要添加babel-loader到module的loader列表中，像下面这样：
module:{
    rules:[
        {
            test:/\.js$/,          #匹配以‘.js’结尾的文件
            loader:'babel-loader', #babel-loader加载器
            include:path.resolve(__dirname,'src'),   #只包括src 
            exclude:path.resolve(__dirname,'node_modules'), #排除node_module
            query:{
                presets:['preset-env']
            }
        }
    ]
}
babel-loader编译很慢的，为了确保转译尽可能少的文件，可能使用/\.js$/来匹配，排除node_modules,配置exclude选项，
提高编译速度。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ruby"><code>安装：
npm install --save-dev babel-loader babel-core babel-preset-env
用法：
在webpack配置对象中，需要添加babel-loader到<span class="hljs-class"><span class="hljs-keyword">module</span>的<span class="hljs-title">loader</span>列表中，像下面这样：</span>
<span class="hljs-class"><span class="hljs-keyword">module</span>:{</span>
    <span class="hljs-symbol">rules:</span>[
        {
            <span class="hljs-symbol">test:</span>/\.js$/,          <span class="hljs-comment">#匹配以‘.js’结尾的文件</span>
            <span class="hljs-symbol">loader:</span><span class="hljs-string">'babel-loader'</span>, <span class="hljs-comment">#babel-loader加载器</span>
            <span class="hljs-symbol">include:</span>path.resolve(__dirname,<span class="hljs-string">'src'</span>),   <span class="hljs-comment">#只包括src </span>
            <span class="hljs-symbol">exclude:</span>path.resolve(__dirname,<span class="hljs-string">'node_modules'</span>), <span class="hljs-comment">#排除node_module</span>
            <span class="hljs-symbol">query:</span>{
                <span class="hljs-symbol">presets:</span>[<span class="hljs-string">'preset-env'</span>]
            }
        }
    ]
}
babel-loader编译很慢的，为了确保转译尽可能少的文件，可能使用/\.js$/来匹配，排除node_modules,配置exclude选项，
提高编译速度。</code></pre>
<h4>3、less/css-loader</h4>
<p>less/css-loader是对css的处理，下面分别介绍处理css时，用到的css-loader、less-loader、style-loader、postcss-loader。这几种loader配合使用。<br>一次安装所有的loader：<br>npm install --save-dev autoprefixer css-loader less-loader style-loader postcss-loader<br>less-loader:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="大家可以了解一些less的用法：http://less.bootcss.com/
less-loader: 把less编译成css。使用css-loader或者raw-loader把它变成一个JS模块，
并使用ExtractTextPlugin把它解压到一个单独的文件中,
这样你的样式不依赖于JavaScript。另外，less-loader并不会针对url()语法做特别的转换，
如果想把url()语句里涉及的文件(比如图片、字体文件)也一并用webpack打包的话，就必须利用css-loader进一步处理。
参考文档：https://doc.webpack-china.org/loaders/less-loader/
用法：
将css-loader、style-loader、less-loader链式调用，使用ExtractTextPlugin把它解压到单独的文件
webpack.config.js:
    const ExtractTextPlugin = require(&quot;extract-text-webpack-plugin&quot;);
    plugin = [...
     new ExtractTextPlugin(&quot;css/[name]-[chunkhash:8].css&quot;,{allChunks:false}), //css分离和压缩
     ...
    ];
    module:{
        rules:[
            {
                text:/\.less$/,
                use:ExtractTextPlugin.extract({
                    fallback:&quot;style-loader&quot;,
                    use:[
                        {
                            loader:'css-loader',
                            options:{
                                minimize:false;    #是否对css进行压缩
                            }
                        },
                        {
                            loader:'postcss-loader', #自动添加浏览器前缀
                        },
                        {
                            loader:'less-loader'
                        }
                    ]
                })
            }
        ]
    }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ruby"><code>大家可以了解一些less的用法：<span class="hljs-symbol">http:</span>/<span class="hljs-regexp">/less.bootcss.com/</span>
less-<span class="hljs-symbol">loader:</span> 把less编译成css。使用css-loader或者raw-loader把它变成一个JS模块，
并使用ExtractTextPlugin把它解压到一个单独的文件中,
这样你的样式不依赖于JavaScript。另外，less-loader并不会针对url()语法做特别的转换，
如果想把url()语句里涉及的文件(比如图片、字体文件)也一并用webpack打包的话，就必须利用css-loader进一步处理。
参考文档：<span class="hljs-symbol">https:</span>/<span class="hljs-regexp">/doc.webpack-china.org/loaders</span><span class="hljs-regexp">/less-loader/</span>
用法：
将css-loader、style-loader、less-loader链式调用，使用ExtractTextPlugin把它解压到单独的文件
webpack.config.<span class="hljs-symbol">js:</span>
    const ExtractTextPlugin = <span class="hljs-keyword">require</span>(<span class="hljs-string">"extract-text-webpack-plugin"</span>);
    plugin = [...
     new ExtractTextPlugin(<span class="hljs-string">"css/[name]-[chunkhash:8].css"</span>,{<span class="hljs-symbol">allChunks:</span><span class="hljs-literal">false</span>}), <span class="hljs-regexp">//css</span>分离和压缩
     ...
    ];
    <span class="hljs-class"><span class="hljs-keyword">module</span>:{</span>
        <span class="hljs-symbol">rules:</span>[
            {
                <span class="hljs-symbol">text:</span>/\.less$/,
                <span class="hljs-symbol">use:</span>ExtractTextPlugin.extract({
                    <span class="hljs-symbol">fallback:</span><span class="hljs-string">"style-loader"</span>,
                    <span class="hljs-symbol">use:</span>[
                        {
                            <span class="hljs-symbol">loader:</span><span class="hljs-string">'css-loader'</span>,
                            <span class="hljs-symbol">options:</span>{
                                <span class="hljs-symbol">minimize:</span><span class="hljs-literal">false</span>;    <span class="hljs-comment">#是否对css进行压缩</span>
                            }
                        },
                        {
                            <span class="hljs-symbol">loader:</span><span class="hljs-string">'postcss-loader'</span>, <span class="hljs-comment">#自动添加浏览器前缀</span>
                        },
                        {
                            <span class="hljs-symbol">loader:</span><span class="hljs-string">'less-loader'</span>
                        }
                    ]
                })
            }
        ]
    }</code></pre>
<p>css-loader:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="用法：
css-loader解释@import 和 url(),在import/require()后再解析它们。
选项：
    参考文档：https://doc.webpack-china.org/loaders/css-loader/
    常用的就是是否对css进行代码压缩(Minification)：minimize:Boolean;还有就是对url()语句的处理。
    在less/css里url()语句，一般使用相对路径的方式来指定文件路径；请不要使用‘/’开头
    (即相对于网站的根目录，因为对于文件系统来说，这令人混淆)。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code>用法：
<span class="hljs-selector-tag">css-loader</span>解释@<span class="hljs-selector-tag">import</span> 和 <span class="hljs-selector-tag">url</span>(),在<span class="hljs-selector-tag">import</span>/<span class="hljs-selector-tag">require</span>()后再解析它们。
选项：
    参考文档：<span class="hljs-selector-tag">https</span>:<span class="hljs-comment">//doc.webpack-china.org/loaders/css-loader/</span>
    常用的就是是否对<span class="hljs-selector-tag">css</span>进行代码压缩(Minification)：<span class="hljs-selector-tag">minimize</span><span class="hljs-selector-pseudo">:Boolean</span>;还有就是对<span class="hljs-selector-tag">url</span>()语句的处理。
    在<span class="hljs-selector-tag">less</span>/<span class="hljs-selector-tag">css</span>里<span class="hljs-selector-tag">url</span>()语句，一般使用相对路径的方式来指定文件路径；请不要使用‘/’开头
    (即相对于网站的根目录，因为对于文件系统来说，这令人混淆)。</code></pre>
<p>style-loader:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" 用法：
 通过注入<style>标签将CSS添加到DOM,一般将style-loader与css-loader结合使用。
 webpack.config.js
     {
         module:{
             rules:[
                 test:/\.css$/,
                 use:[
                     { loader:&quot;style-loader&quot; },
                     { loader:&quot;css-loader&quot; }
                 ]
             ]
         }
     }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code> 用法：
 通过注入<span class="hljs-tag">&lt;<span class="hljs-name">style</span>&gt;</span><span class="css">标签将<span class="hljs-selector-tag">CSS</span>添加到<span class="hljs-selector-tag">DOM</span>,一般将<span class="hljs-selector-tag">style-loader</span>与<span class="hljs-selector-tag">css-loader</span>结合使用。
 <span class="hljs-selector-tag">webpack</span><span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span>
     {
         <span class="hljs-attribute">module</span>:{
             rules:[
                 test:/\.css$/,
                 use:[
                     { loader:<span class="hljs-string">"style-loader"</span> },
                     { <span class="hljs-attribute">loader</span>:<span class="hljs-string">"css-loader"</span> }
                 ]
             ]
         }
     }</span></code></pre>
<p>postcss-loader:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="参考文档：https://doc.webpack-china.org/loaders/postcss-loader/
用法：用于处理浏览器前缀,这里使用postcss-loader需要在写一个关于postcss.config.js的文件。
postcss.config.js:
    module.exports = {
        plugins:[
            require('autoprefixer')
        ]
    }
autoprefixer:将使用基于当前浏览器流行度和属性支持的数据为您应用前缀。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>参考文档：https:<span class="hljs-comment">//doc.webpack-china.org/loaders/postcss-loader/</span>
用法：用于处理浏览器前缀,这里使用postcss-loader需要在写一个关于postcss<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span>的文件。
postcss<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span>:
    module<span class="hljs-selector-class">.exports</span> = {
        plugins:[
            require(<span class="hljs-string">'autoprefixer'</span>)
        ]
    }
autoprefixer:将使用基于当前浏览器流行度和属性支持的数据为您应用前缀。
</code></pre>
<h4>4、url/file-loader</h4>
<p>用于打包处理图片和字体。<br>安装：<br>npm install --save-dev file-loader url-loader<br>file-loader:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="参考文档：https://doc.webpack-china.org/loaders/file-loader/
功能：将源文件迁移到指定的目录，返回新的文件路径。
用法：传入name参数，该参数接受以下变量：
    以我的src/images/banner.jpg为例；
    [ext]:文件的后缀名，‘jpg’。
    [name]:文件名本身，‘banner’。
    [path]:相对于当前执行webpack命令的目录的相对路径（不含文件名本身），在我的项目中源文件中的图片是在‘src/images/**’中，在根目录内执行webpack命令，也就是当前的上下文环境与src目录同级
    [hash]:源文件内容的hash,用于缓存解决方案
    
webpack.config.js
     {
         module:{
             rules:[
                 test:/\.(png|jpg|gif)$/,      #匹配图片资源
                 loader:'file-loader',
                 options:{
                     name:'images/[name].[ext]' #新文件的路径
                 }
             ]
         }
     }
     当npm run build 后，我的图片资源路径是要拼上webpack配置中的output.publicPath参数；所以最终的图片路径是‘build/iamges/banner.jpg’," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ruby"><code>参考文档：<span class="hljs-symbol">https:</span>/<span class="hljs-regexp">/doc.webpack-china.org/loaders</span><span class="hljs-regexp">/file-loader/</span>
功能：将源文件迁移到指定的目录，返回新的文件路径。
用法：传入name参数，该参数接受以下变量：
    以我的src/images/banner.jpg为例；
    [ext]<span class="hljs-symbol">:</span>文件的后缀名，‘jpg’。
    [name]<span class="hljs-symbol">:</span>文件名本身，‘banner’。
    [path]<span class="hljs-symbol">:</span>相对于当前执行webpack命令的目录的相对路径（不含文件名本身），在我的项目中源文件中的图片是在‘src/images/**’中，在根目录内执行webpack命令，也就是当前的上下文环境与src目录同级
    [hash]<span class="hljs-symbol">:</span>源文件内容的hash,用于缓存解决方案
    
webpack.config.js
     {
         <span class="hljs-class"><span class="hljs-keyword">module</span>:{</span>
             <span class="hljs-symbol">rules:</span>[
                 <span class="hljs-symbol">test:</span>/\.(png<span class="hljs-params">|jpg|</span>gif)$/,      <span class="hljs-comment">#匹配图片资源</span>
                 <span class="hljs-symbol">loader:</span><span class="hljs-string">'file-loader'</span>,
                 <span class="hljs-symbol">options:</span>{
                     <span class="hljs-symbol">name:</span><span class="hljs-string">'images/[name].[ext]'</span> <span class="hljs-comment">#新文件的路径</span>
                 }
             ]
         }
     }
     当npm run build 后，我的图片资源路径是要拼上webpack配置中的output.publicPath参数；所以最终的图片路径是‘build/iamges/banner.jpg’,</code></pre>
<p>url-loader:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="参考文档：https://doc.webpack-china.org/loaders/url-loader/
功能：在文件大小(单位byte)低于指定的限制时，将源文件转换成DataUrl(声明文件base64编码)。图片和字体文件的DataUrl都是可以被浏览器所识别的，减少HTTP连接数。
参数：
    limit：Number;     #表示目标文件的体积小于限定的字节就用url-loader;大于限制字节时，就用file-loader来处理
    mimetype:String;   #指定文件的类型（否则从文件的扩展名）
    fallback:String;   #当文件大于限制时（以字节为单位）为文件指定加载程序
webpack.config.js
     {
         module:{
             rules:[
                 test:/\.(png|jpg|gif)$/,      #匹配图片资源
                 loader:'url-loader',
                 options:{
                     limit:8192,
                 }
             ]
         }
     }
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs yaml"><code><span class="hljs-string">参考文档：https://doc.webpack-china.org/loaders/url-loader/</span>
<span class="hljs-string">功能：在文件大小(单位byte)低于指定的限制时，将源文件转换成DataUrl(声明文件base64编码)。图片和字体文件的DataUrl都是可以被浏览器所识别的，减少HTTP连接数。</span>
<span class="hljs-string">参数：</span>
    <span class="hljs-string">limit：Number;</span>     <span class="hljs-comment">#表示目标文件的体积小于限定的字节就用url-loader;大于限制字节时，就用file-loader来处理</span>
<span class="hljs-attr">    mimetype:</span><span class="hljs-string">String;</span>   <span class="hljs-comment">#指定文件的类型（否则从文件的扩展名）</span>
<span class="hljs-attr">    fallback:</span><span class="hljs-string">String;</span>   <span class="hljs-comment">#当文件大于限制时（以字节为单位）为文件指定加载程序</span>
<span class="hljs-string">webpack.config.js</span>
     <span class="hljs-string">{</span>
<span class="hljs-attr">         module:</span><span class="hljs-string">{</span>
<span class="hljs-attr">             rules:</span><span class="hljs-string">[</span>
<span class="hljs-attr">                 test:</span><span class="hljs-string">/\.(png|jpg|gif)$/,</span>      <span class="hljs-comment">#匹配图片资源</span>
<span class="hljs-attr">                 loader:</span><span class="hljs-string">'url-loader'</span><span class="hljs-string">,</span>
<span class="hljs-attr">                 options:</span><span class="hljs-string">{</span>
<span class="hljs-attr">                     limit:</span><span class="hljs-number">8192</span><span class="hljs-string">,</span>
                 <span class="hljs-string">}</span>
             <span class="hljs-string">]</span>
         <span class="hljs-string">}</span>
     <span class="hljs-string">}</span>
</code></pre>
<p>字体文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    test:/\.(eot|woff|woff2|ttf|svg)$/,
    loader:'url-loader'
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code>{
    <span class="hljs-attribute">test</span>:/\.(eot|woff|woff2|ttf|svg)$/,
    loader:<span class="hljs-string">'url-loader'</span>
}</code></pre>
<h2 id="articleHeader3">4、plugins插件的介绍</h2>
<p>有时候搞不明白 plugins 和 loaders的区别：<br>插件（plugins）是用来拓展webpack功能的，它们会在整个构建过程中生效，执行相关的任务。<br>loaders是在打包构建过程中用来处理源文件的（.js、.less、.html、img、字体）,一次处理一个；<br>插件并不直接操作单个文件，它直接对整个构建过程作用。<br>webpack.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var plugins = [
    new webpack.ProvidePlugin({
        $:&quot;jquery&quot;,
        jQuery:&quot;jquery&quot;,
        &quot;window.jQuery&quot;:&quot;jquery&quot;
    }),
    new ExtractTextPlugin(&quot;css/[name]-[chunkshash:8].css&quot;,{allChunks:false}),
    new webpack.optimize.CommonsChunkPlugin({
        name:&quot;commons&quot;,
        minChunks:2
    })
];" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code><span class="hljs-built_in">var</span> plugins = [
    <span class="hljs-built_in">new</span> webpack.ProvidePlugin({
        $:<span class="hljs-string">"jquery"</span>,
        jQuery:<span class="hljs-string">"jquery"</span>,
        <span class="hljs-string">"window.jQuery"</span>:<span class="hljs-string">"jquery"</span>
    }),
    <span class="hljs-built_in">new</span> ExtractTextPlugin(<span class="hljs-string">"css/[name]-[chunkshash:8].css"</span>,{allChunks:<span class="hljs-literal">false</span>}),
    <span class="hljs-built_in">new</span> webpack.<span class="hljs-built_in">optimize</span>.CommonsChunkPlugin({
        name:<span class="hljs-string">"commons"</span>,
        minChunks:<span class="hljs-number">2</span>
    })
];</code></pre>
<p>plugins：Array(数组)，直接把要用的插件实例化之后丢进去就好了。</p>
<h4>1、插件ProvidePlugin</h4>
<p>关于插件ProvidePlugin自动加载模块，而不必到处 import 或 require 。为什么要对jQuery进行全局定义？(个人水平有限。)<br>参考：<a href="https://segmentfault.com/a/1190000006887523">https://segmentfault.com/a/11...</a><br>使用：jQuery<br>要自动加载jquery , 我们可以将三个变量都指向对应的node模块：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.ProvidePlugin({
        $:&quot;jquery&quot;,
        jQuery:&quot;jquery&quot;,
        &quot;window.jQuery&quot;:&quot;jquery&quot;
    })," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs actionscript"><code><span class="hljs-keyword">new</span> webpack.ProvidePlugin({
        $:<span class="hljs-string">"jquery"</span>,
        jQuery:<span class="hljs-string">"jquery"</span>,
        <span class="hljs-string">"window.jQuery"</span>:<span class="hljs-string">"jquery"</span>
    }),</code></pre>
<p>然后在我们任意源码中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//in a module
$('#item');  //起作用
jQuery('#item'); //起作用
window.jQuery('#item'); //起作用
//$ 自动被设置为“jquery”输出的内容。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//in a module</span>
$(<span class="hljs-string">'#item'</span>);  <span class="hljs-comment">//起作用</span>
jQuery(<span class="hljs-string">'#item'</span>); <span class="hljs-comment">//起作用</span>
<span class="hljs-built_in">window</span>.jQuery(<span class="hljs-string">'#item'</span>); <span class="hljs-comment">//起作用</span>
<span class="hljs-comment">//$ 自动被设置为“jquery”输出的内容。</span>
</code></pre>
<h4>2、插件ExtractTextPlugin</h4>
<p>作用：从bundle中提取文本（css）到单独的文件。<br>安装：npm install --save-dev extract-text-webpack-plugin<br>用法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const ExtractTextPlugin = require(&quot;extract-text-webpack-plugin&quot;);
module.exports = {
    module:{
        rules:[
            {
                test:/\.css$/,
                use:ExtractTextPlugin.extract({
                    fallback:&quot;style-loader&quot;,
                    use:&quot;css-loader&quot;
                })
            }
        ]
    },
    plugins:[
        new ExtractTextPlugin(&quot;css/[name]-[chunkhash:8].css&quot;,{allChunks:false}),
    ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> ExtractTextPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">"extract-text-webpack-plugin"</span>);
<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-keyword">module</span>:{
        rules:[
            {
                test:<span class="hljs-regexp">/\.css$/</span>,
                use:ExtractTextPlugin.extract({
                    fallback:<span class="hljs-string">"style-loader"</span>,
                    use:<span class="hljs-string">"css-loader"</span>
                })
            }
        ]
    },
    plugins:[
        <span class="hljs-keyword">new</span> ExtractTextPlugin(<span class="hljs-string">"css/[name]-[chunkhash:8].css"</span>,{allChunks:<span class="hljs-literal">false</span>}),
    ]
}</code></pre>
<p>它会将所有的入口chunk(entry chunks)中引用的*.css,移动到和html页面name对应的独立分离的css文件。样式不在内嵌到JS bundle中。如果你的样式文件大小较大，就会做更快提前加载，因为css bundle 会跟js bundle 并行加载<br>参考文档：<a href="https://doc.webpack-china.org/plugins/extract-text-webpack-plugin" rel="nofollow noreferrer" target="_blank">https://doc.webpack-china.org...</a></p>
<h4>2、插件CommonsChunkPlugin</h4>
<p>CommonsChunkPlugin 插件，是一个可选的用于建立一个独立文件的功能，这个文件包括多个入口chunk的公共模块。通过将公共模板拆出来，最终合成的文件能够在最开始的时候加载一次，便缓存供后续使用，这个带来速度上的提升，因为浏览器会迅速将公共的代码从缓存中取出来，而不是每次访问一个新页面时，再去加载一个更大的文件。<br>例子：<br>公共chunk用于入口chunk:生成一个额外的chunk包含入口chunk 的公共模块。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="new webpack.optimize.CommonsChunkPlugin({
    name:&quot;commons&quot;,          //公共chunk的名称
    filename:&quot;commons.js&quot;,    //公共chunk的文件名
    minChunks:3 ,             //模块必须被三个 入口共享  
    chunks:[&quot;pageA&quot;,&quot;pageB&quot;], //只使用这些入口chunks
})" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code>new webpack.optimize.CommonsChunkPlugin({
<span class="hljs-symbol">    name:</span><span class="hljs-string">"commons"</span>,          <span class="hljs-comment">//公共chunk的名称</span>
<span class="hljs-symbol">    filename:</span><span class="hljs-string">"commons.js"</span>,    <span class="hljs-comment">//公共chunk的文件名</span>
<span class="hljs-symbol">    minChunks:</span><span class="hljs-number">3</span> ,             <span class="hljs-comment">//模块必须被三个 入口共享  </span>
<span class="hljs-symbol">    chunks:</span>[<span class="hljs-string">"pageA"</span>,<span class="hljs-string">"pageB"</span>], <span class="hljs-comment">//只使用这些入口chunks</span>
})</code></pre>
<h4>3、插件HtmlWebpackPlugin</h4>
<p>HtmlWebpackPlugin简化了HTML文件的创建，加载自己的模板。<br>安装：npm install --save-dev html-webpack-plugin<br>使用webpack生成HTML页面的好处：<br>   对于页面相同或相似的部分，尤其导航栏、侧边栏、还有页尾，基本是一致的，如果需要修改页面，传统的都是每个页面都要修改，可维护性很差。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="而“用webpack生成html页面”，实际是依赖前端的模板引擎将页面的各个部分拼接在一起，达到公共模块的复用。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs"><code>而“用webpack生成html页面”，实际是依赖前端的模板引擎将页面的各个部分拼接在一起，达到公共模块的复用。
</code></pre>
<p>利用html-webpack-plugin生成html页面：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="html-webpack-plugin的配置项：
    每一个html-webpack-plugin的只对象实例化一个页面，因此多页面时，就要配置多个html-webpack-plugin的对象实例。
     Object.keys(entries).forEach(function(name){
         //每一个页面生成一个entry
         webpackConfig.entry[name] = entries[name];
         var plugin = new HtmlWebpackPlugin({
             //生成出来的html文件名
             filename: name + '.html',
             //这里多个页面使用一个公共模板
             template:'./src/index.tmpl.html',
             inject:'body',
             chunks:['commons', name]
         })
         plugins.push(plugin)
     }) 
entries是所有的入口*.js
    多页应用常用的配置：
        filename：生成的网页html文件的文件名，可以利用‘/’来控制文件目录结构，其最终生成的路径，
        是基于webpack配置中的output.path的。
        template: 指定一个基于模板引擎语法的模板文件，如果想使用其他格式的模板文件，
        需要在webpack配置里设置好相应的loader,比如html-loader。如果是单页应用，那么这个参数
        不指定也可以，但对于多页应用来说，我们依赖模板引擎给我们拼装页面，这个参数非常重要。
        inject: 将加载的js文件插入到哪里，默认是插入到<body>的末端，如果设置'head',
        则把<script>插入到<head>里。
        minify: 生成压缩后的html代码。
        chunks:以数组的形式指定由html-webpack-plugin负责加载的chunk文件



" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>html-webpack-plugin的配置项：
    每一个html-webpack-plugin的只对象实例化一个页面，因此多页面时，就要配置多个html-webpack-plugin的对象实例。
     <span class="hljs-built_in">Object</span>.keys(entries).forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">name</span>)</span>{
         <span class="hljs-comment">//每一个页面生成一个entry</span>
         webpackConfig.entry[name] = entries[name];
         <span class="hljs-keyword">var</span> plugin = <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
             <span class="hljs-comment">//生成出来的html文件名</span>
             filename: name + <span class="hljs-string">'.html'</span>,
             <span class="hljs-comment">//这里多个页面使用一个公共模板</span>
             template:<span class="hljs-string">'./src/index.tmpl.html'</span>,
             <span class="hljs-attr">inject</span>:<span class="hljs-string">'body'</span>,
             <span class="hljs-attr">chunks</span>:[<span class="hljs-string">'commons'</span>, name]
         })
         plugins.push(plugin)
     }) 
entries是所有的入口*.js
    多页应用常用的配置：
        filename：生成的网页html文件的文件名，可以利用‘/’来控制文件目录结构，其最终生成的路径，
        是基于webpack配置中的output.path的。
        template: 指定一个基于模板引擎语法的模板文件，如果想使用其他格式的模板文件，
        需要在webpack配置里设置好相应的loader,比如html-loader。如果是单页应用，那么这个参数
        不指定也可以，但对于多页应用来说，我们依赖模板引擎给我们拼装页面，这个参数非常重要。
        inject: 将加载的js文件插入到哪里，默认是插入到&lt;body&gt;的末端，如果设置<span class="hljs-string">'head'</span>,
        则把&lt;script&gt;插入到&lt;head&gt;里。
        minify: 生成压缩后的html代码。
        chunks:以数组的形式指定由html-webpack-plugin负责加载的chunk文件



</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack搭建多页面系统（三） 理解webpack.config.js的四个核心概念

## 原文链接
[https://segmentfault.com/a/1190000012744818](https://segmentfault.com/a/1190000012744818)

