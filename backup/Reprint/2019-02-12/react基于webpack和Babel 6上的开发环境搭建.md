---
title: 'react基于webpack和Babel 6上的开发环境搭建' 
date: 2019-02-12 2:30:12
hidden: true
slug: d0q9sqp5gjg
categories: [reprint]
---

{{< raw >}}

                    
<h1 id="articleHeader0">react-js开发环境</h1>
<blockquote><p>时间：2016.3.19-12:29<br>作者：三月懒驴<br>基于：react版本：0.14<br>基于：babel版本：6<br>相关代码：<a href="https://github.com/sanyuelanv/project" rel="nofollow noreferrer" target="_blank">github</a></p></blockquote>
<h2 id="articleHeader1">开始一个项目</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm init" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">npm init</code></pre>
<h2 id="articleHeader2">安装webpack</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install webpack --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">npm install webpack --save-dev</code></pre>
<h2 id="articleHeader3">项目目录(demo架构)</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    - /app
        - main.js
        - component.js
    - /build
        - bundle.js （自动生成）
        - index.html
    - webpack.config.js
    - package.json" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>    -<span class="ruby"> /app
</span>        -<span class="ruby"> main.js
</span>        -<span class="ruby"> component.js
</span>    -<span class="ruby"> /build
</span>        -<span class="ruby"> bundle.js （自动生成）
</span>        -<span class="ruby"> index.html
</span>    -<span class="ruby"> webpack.config.js
</span>    -<span class="ruby"> package.json</span></code></pre>
<h2 id="articleHeader4">设置webpack.config.js</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path');
module.exports = {
    entry:path.resolve(__dirname,'app/main.js'),
    output:{
        path:path.resolve(__dirname,'build'),
        filename:'bundle.js'
    }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>:path.resolve(__dirname,<span class="hljs-string">'app/main.js'</span>),
    <span class="hljs-attr">output</span>:{
        <span class="hljs-attr">path</span>:path.resolve(__dirname,<span class="hljs-string">'build'</span>),
        <span class="hljs-attr">filename</span>:<span class="hljs-string">'bundle.js'</span>
    }
};</code></pre>
<p>在package.json里面预设这个命令去启动打包功能</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;build&quot;:&quot;webpack&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-string">"build"</span>:<span class="hljs-string">"webpack"</span></code></pre>
<h2 id="articleHeader5">课间练习</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//component.js
'use strict'
module.exports = function(){
    var a = 'hello word'
    return a;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//component.js</span>
<span class="hljs-meta">'use strict'</span>
<span class="hljs-built_in">module</span>.exports = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    <span class="hljs-keyword">var</span> a = <span class="hljs-string">'hello word'</span>
    <span class="hljs-keyword">return</span> a;
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//main.js
'use strict'
var component = require('./component.js');
document.body.innnerHTML = component();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//main.js</span>
<span class="hljs-meta">'use strict'</span>
<span class="hljs-keyword">var</span> component = <span class="hljs-built_in">require</span>(<span class="hljs-string">'./component.js'</span>);
<span class="hljs-built_in">document</span>.body.innnerHTML = component();</code></pre>
<h2 id="articleHeader6">使用webpack-dev-server：监听代码自动刷新！</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install webpack-dev-server --save-dev" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">npm install webpack-dev-server --save-dev</code></pre>
<p>在package.json里面配置webpack-dev-server</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;dev&quot;:&quot;webpack-dev-server --devtool eval --progress --colors --hot --content-base build&quot;
//webpack-dev-server 创建一个服务器8080端口的
//devtool eval --为你的代码创建源地址，可以代码快速定位
//progress --显示进度条
//colors --命令行带颜色
//content-base build --指向设置的输出目录
//一旦启动这个就会用服务器去监听代码文件的变化，从而每次变化都自动合并" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-string">"dev"</span>:<span class="hljs-string">"webpack-dev-server --devtool eval --progress --colors --hot --content-base build"</span>
<span class="hljs-comment">//webpack-dev-server 创建一个服务器8080端口的</span>
<span class="hljs-comment">//devtool eval --为你的代码创建源地址，可以代码快速定位</span>
<span class="hljs-comment">//progress --显示进度条</span>
<span class="hljs-comment">//colors --命令行带颜色</span>
<span class="hljs-comment">//content-base build --指向设置的输出目录</span>
<span class="hljs-comment">//一旦启动这个就会用服务器去监听代码文件的变化，从而每次变化都自动合并</span></code></pre>
<p>启动自动刷新功能</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//配置在webpack.config.js的入口
entry:[
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    path.resolve(__dirname,'app/main.js');
]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//配置在webpack.config.js的入口</span>
entry:[
    <span class="hljs-string">'webpack/hot/dev-server'</span>,
    <span class="hljs-string">'webpack-dev-server/client?http://localhost:8080'</span>,
    path.resolve(__dirname,<span class="hljs-string">'app/main.js'</span>);
]</code></pre>
<h2 id="articleHeader7">课堂练习</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="1. npm run dev 启动服务器
2. 打开浏览器－>http://localhost:8080
3. 修改一下前面的课堂练习时候写的代码中的compnent.js的return的东西
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-number">1.</span> npm <span class="hljs-built_in">run</span> dev 启动服务器
<span class="hljs-number">2.</span> 打开浏览器－&gt;http:<span class="hljs-comment">//localhost:8080</span>
<span class="hljs-number">3.</span> 修改一下前面的课堂练习时候写的代码中的compnent.js的<span class="hljs-built_in">return</span>的东西
</code></pre>
<h2 id="articleHeader8">配置react / babel</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//安装react
npm install react --save
npm install react-dom --save
//安装babel-loader
npm install babel-loader --save-dev
npm install babel-core --save-dev
npm install babel-preset-es2015 --save-dev  //支持ES2015
npm install babel-preset-react --save-dev //支持jsx
npm install babel-preset-stage-0 --save-dev //支持ES7
//但是还不够
npm install babel-polyfill --save
/*
Polyfilla是一个英国产品,在美国称之为Spackling Paste(译者注:刮墙的,在中国称为腻子).记住这一点就行:把旧的浏览器想象成为一面有了裂缝的墙.这些[polyfills]会帮助我们把这面墙的裂缝抹平,还我们一个更好的光滑的墙壁(浏览器)
*/
npm install babel-runtime  --save
npm install babel-plugin-transform-runtime --save-dev
/*减少打包的时候重复代码，以上要注意是放在dev还是非dev上！*/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//安装react</span>
npm install react --save
npm install react-dom --save
<span class="hljs-comment">//安装babel-loader</span>
npm install babel-loader --save-dev
npm install babel-core --save-dev
npm install babel-preset-es2015 --save-dev  <span class="hljs-comment">//支持ES2015</span>
npm install babel-preset-react --save-dev <span class="hljs-comment">//支持jsx</span>
npm install babel-preset-stage<span class="hljs-number">-0</span> --save-dev <span class="hljs-comment">//支持ES7</span>
<span class="hljs-comment">//但是还不够</span>
npm install babel-polyfill --save
<span class="hljs-comment">/*
Polyfilla是一个英国产品,在美国称之为Spackling Paste(译者注:刮墙的,在中国称为腻子).记住这一点就行:把旧的浏览器想象成为一面有了裂缝的墙.这些[polyfills]会帮助我们把这面墙的裂缝抹平,还我们一个更好的光滑的墙壁(浏览器)
*/</span>
npm install babel-runtime  --save
npm install babel-plugin-transform-runtime --save-dev
<span class="hljs-comment">/*减少打包的时候重复代码，以上要注意是放在dev还是非dev上！*/</span></code></pre>
<p><strong>配置babel</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//在入口添加polyfill
entry[
    'babel-polyfill',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    path.resolve(__dirname,'app/main.js')
]
//在webpack.config.js的module.exports = {}里面增加
module:{
    loaders:[{
        'loader':'babel-loader',
        exclude:[
            //在node_modules的文件不被babel理会
            path.resolve(__dirname,'node_modules'),
        ]，
        include:[
            //指定app这个文件里面的采用babel
            path.resolve(__dirname,'app'),
        ],
        test：/\.jsx?$/,
        query:{
            plugins:['transform-runtime'],
            presets:['es2015','stage-0','react']
        }
    }]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//在入口添加polyfill</span>
entry[
    <span class="hljs-string">'babel-polyfill'</span>,
    <span class="hljs-string">'webpack/hot/dev-server'</span>,
    <span class="hljs-string">'webpack-dev-server/client?http://localhost:8080'</span>,
    path.resolve(__dirname,<span class="hljs-string">'app/main.js'</span>)
]
<span class="hljs-comment">//在webpack.config.js的module.exports = {}里面增加</span>
<span class="hljs-built_in">module</span>:{
    <span class="hljs-attr">loaders</span>:[{
        <span class="hljs-string">'loader'</span>:<span class="hljs-string">'babel-loader'</span>,
        <span class="hljs-attr">exclude</span>:[
            <span class="hljs-comment">//在node_modules的文件不被babel理会</span>
            path.resolve(__dirname,<span class="hljs-string">'node_modules'</span>),
        ]，
        include:[
            <span class="hljs-comment">//指定app这个文件里面的采用babel</span>
            path.resolve(__dirname,<span class="hljs-string">'app'</span>),
        ],
        test：/\.jsx?$/,
        <span class="hljs-attr">query</span>:{
            <span class="hljs-attr">plugins</span>:[<span class="hljs-string">'transform-runtime'</span>],
            <span class="hljs-attr">presets</span>:[<span class="hljs-string">'es2015'</span>,<span class="hljs-string">'stage-0'</span>,<span class="hljs-string">'react'</span>]
        }
    }]
}</code></pre>
<h2 id="articleHeader9">课堂测试</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//component.js
'use strict'
import React from 'react'
class Component extends React.Component{
    render(){
        return <div>Helllo World</div>
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//component.js</span>
<span class="hljs-meta">'use strict'</span>
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-class"><span class="hljs-keyword">class</span> <span class="hljs-title">Component</span> <span class="hljs-keyword">extends</span> <span class="hljs-title">React</span>.<span class="hljs-title">Component</span></span>{
    render(){
        <span class="hljs-keyword">return</span> <span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>Helllo World<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
    }
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//main.js
'use strict'
//注意！这里引入了新的东西
import 'babel-polyfill'
import React from 'react'
import {render} from 'react-dom'
import Component from './component'
let main = function(){
    render(<Component />,document.getElementById('main'));
}
main();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//main.js</span>
<span class="hljs-meta">'use strict'</span>
<span class="hljs-comment">//注意！这里引入了新的东西</span>
<span class="hljs-keyword">import</span> <span class="hljs-string">'babel-polyfill'</span>
<span class="hljs-keyword">import</span> React <span class="hljs-keyword">from</span> <span class="hljs-string">'react'</span>
<span class="hljs-keyword">import</span> {render} <span class="hljs-keyword">from</span> <span class="hljs-string">'react-dom'</span>
<span class="hljs-keyword">import</span> Component <span class="hljs-keyword">from</span> <span class="hljs-string">'./component'</span>
<span class="hljs-keyword">let</span> main = <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{
    render(<span class="xml"><span class="hljs-tag">&lt;<span class="hljs-name">Component</span> /&gt;</span>,document.getElementById('main'));
}
main();</span></code></pre>
<h2 id="articleHeader10">加入CSS ／ iamge /  font</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 这里先留个坑！因为暂时来说还是认为外链出来适合现在这个时代。可能在项目正式上线的时候才需要" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-comment">// 这里先留个坑！因为暂时来说还是认为外链出来适合现在这个时代。可能在项目正式上线的时候才需要</span></code></pre>
<h2 id="articleHeader11">发布配置：单文件入口版本！</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//新建一个webpack.production.config.js
//in package.json
&quot;deploy&quot;: &quot;NODE_ENV=production webpack -p --config webpack.production.config.js&quot;
//in webpack.production.config.js
//和开发环境不同的是，入口和出口。相应的在HTML的JS源也要进行修改。
var path = require('path')
var node_module_dir = path.resolve(__dirname,'node_module');
module.exports = {
    entry:[
        'babel-polyfill',
        path.resolve(__dirname,'app/main.js'),
    ],
    output:{
        path:path.resolve(__dirname,'build'),
        filename:'app.js'
    },
    module:{
        loaders:[
            {
                loader:&quot;babel-loader&quot;,   //加载babel模块
                include:[
                    path.resolve(__dirname,'app'),
                ],
                exclude:[
                    node_module_dir
                ],
                test:/\.jsx?$/,
                query:{
                    plugins:['transform-runtime'],
                    presets:['es2015','stage-0','react']
                }
            },
        ]
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">//新建一个webpack.production.config.js</span>
<span class="hljs-comment">//in package.json</span>
<span class="hljs-string">"deploy"</span>: <span class="hljs-string">"NODE_ENV=production webpack -p --config webpack.production.config.js"</span>
<span class="hljs-comment">//in webpack.production.config.js</span>
<span class="hljs-comment">//和开发环境不同的是，入口和出口。相应的在HTML的JS源也要进行修改。</span>
<span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">var</span> node_module_dir = path.resolve(__dirname,<span class="hljs-string">'node_module'</span>);
<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>:[
        <span class="hljs-string">'babel-polyfill'</span>,
        path.resolve(__dirname,<span class="hljs-string">'app/main.js'</span>),
    ],
    <span class="hljs-attr">output</span>:{
        <span class="hljs-attr">path</span>:path.resolve(__dirname,<span class="hljs-string">'build'</span>),
        <span class="hljs-attr">filename</span>:<span class="hljs-string">'app.js'</span>
    },
    <span class="hljs-attr">module</span>:{
        <span class="hljs-attr">loaders</span>:[
            {
                <span class="hljs-attr">loader</span>:<span class="hljs-string">"babel-loader"</span>,   <span class="hljs-comment">//加载babel模块</span>
                include:[
                    path.resolve(__dirname,<span class="hljs-string">'app'</span>),
                ],
                <span class="hljs-attr">exclude</span>:[
                    node_module_dir
                ],
                <span class="hljs-attr">test</span>:<span class="hljs-regexp">/\.jsx?$/</span>,
                <span class="hljs-attr">query</span>:{
                    <span class="hljs-attr">plugins</span>:[<span class="hljs-string">'transform-runtime'</span>],
                    <span class="hljs-attr">presets</span>:[<span class="hljs-string">'es2015'</span>,<span class="hljs-string">'stage-0'</span>,<span class="hljs-string">'react'</span>]
                }
            },
        ]
    }
}</code></pre>
<h2 id="articleHeader12">发布配置（多文件模式）</h2>
<p>库最好就不要打包进来。因为一般库都是不会改动的。所有用户load一次就好了。所以这里就要进行库的分离。<br>依旧是：webpack.production.config.js</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var path = require('path');
var webpack = require('webpack');
var node_module_dir = path.resolve(__dirname,'node_module');

module.exports = {
    entry:{
        app:[path.resolve(__dirname,'app/main.js'),],
        react: ['babel-polyfill','react','react-dom']
    },
    output:{
        path:path.resolve(__dirname,'build'),
        filename:'app.js'
    },
    module:{
        loaders:[
            {
                loader:&quot;babel-loader&quot;,   //加载babel模块
                include:[
                    path.resolve(__dirname,'app'),
                ],
                exclude:[
                    node_module_dir
                ],
                test:/\.jsx?$/,
                query:{
                    plugins:['transform-runtime'],
                    presets:['es2015','stage-0','react']
                }
            },
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('react', 'react.js')
      ]
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">var</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);
<span class="hljs-keyword">var</span> node_module_dir = path.resolve(__dirname,<span class="hljs-string">'node_module'</span>);

<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>:{
        <span class="hljs-attr">app</span>:[path.resolve(__dirname,<span class="hljs-string">'app/main.js'</span>),],
        <span class="hljs-attr">react</span>: [<span class="hljs-string">'babel-polyfill'</span>,<span class="hljs-string">'react'</span>,<span class="hljs-string">'react-dom'</span>]
    },
    <span class="hljs-attr">output</span>:{
        <span class="hljs-attr">path</span>:path.resolve(__dirname,<span class="hljs-string">'build'</span>),
        <span class="hljs-attr">filename</span>:<span class="hljs-string">'app.js'</span>
    },
    <span class="hljs-attr">module</span>:{
        <span class="hljs-attr">loaders</span>:[
            {
                <span class="hljs-attr">loader</span>:<span class="hljs-string">"babel-loader"</span>,   <span class="hljs-comment">//加载babel模块</span>
                include:[
                    path.resolve(__dirname,<span class="hljs-string">'app'</span>),
                ],
                <span class="hljs-attr">exclude</span>:[
                    node_module_dir
                ],
                <span class="hljs-attr">test</span>:<span class="hljs-regexp">/\.jsx?$/</span>,
                <span class="hljs-attr">query</span>:{
                    <span class="hljs-attr">plugins</span>:[<span class="hljs-string">'transform-runtime'</span>],
                    <span class="hljs-attr">presets</span>:[<span class="hljs-string">'es2015'</span>,<span class="hljs-string">'stage-0'</span>,<span class="hljs-string">'react'</span>]
                }
            },
        ]
    },
    <span class="hljs-attr">plugins</span>: [
        <span class="hljs-keyword">new</span> webpack.optimize.CommonsChunkPlugin(<span class="hljs-string">'react'</span>, <span class="hljs-string">'react.js'</span>)
      ]
}
</code></pre>
<blockquote><p>预计学习搭建时间：1小时！<br>恭喜你！全部课程完成，接下来的话，我们就要开始react的课程了！本课程如果还有什么不懂的话，可以在评论中进行讨论。</p></blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
react基于webpack和Babel 6上的开发环境搭建

## 原文链接
[https://segmentfault.com/a/1190000004825205](https://segmentfault.com/a/1190000004825205)

