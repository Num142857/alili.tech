---
title: '还不打算去认识一下webpack? ' 
date: 2019-03-02 2:30:07
hidden: true
slug: gile08zdbpl
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">前言</h2>
<blockquote>随我来,去看看webpack!(<code>为时未晚</code>)<em>============》第一版(较浅显的知识,懂得可忽略本文)</em>
</blockquote>
<hr>
<h2 id="articleHeader1">方向</h2>
<ol>
<li>安装,起步搭建运行. <code>(粗略代过)</code>
</li>
<li>对于资源的管理,对于输出的管理. <code>(举例介绍)</code>
</li>
<li>本地开发 <code>(基础服务)</code>
</li>
<li>热更新=[模块热替换]  <code>(初步认识)</code>
</li>
</ol>
<hr>
<h3 id="articleHeader2">1.初步构建</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mkdir webpack_demo &amp;&amp; cd webpack_demo   // 新建一个文件 并进入更目录 `mkdir 是linux命令`
npm init -y   // 初始一个packjage.json文件  -y 表示跳过询问步骤...


//安装webpack
npm install webpack --save-dev  // 添加webpack-cli依赖到&quot;devDependencies&quot;
//webpack4.0+ 需要安装webpack-cli
 npm install webpack-cli --save-dev  // 添加webpack-cli依赖到&quot;devDependencies&quot;  
 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-keyword">mkdir</span> webpack_demo &amp;&amp; <span class="hljs-keyword">cd</span> webpack_demo   <span class="hljs-comment">// 新建一个文件 并进入更目录 `mkdir 是linux命令`</span>
npm init -y   <span class="hljs-comment">// 初始一个packjage.json文件  -y 表示跳过询问步骤...</span>


<span class="hljs-comment">//安装webpack</span>
npm install webpack --<span class="hljs-keyword">save</span>-dev  <span class="hljs-comment">// 添加webpack-cli依赖到"devDependencies"</span>
<span class="hljs-comment">//webpack4.0+ 需要安装webpack-cli</span>
 npm install webpack-<span class="hljs-keyword">cli</span> --<span class="hljs-keyword">save</span>-dev  <span class="hljs-comment">// 添加webpack-cli依赖到"devDependencies"  </span>
 
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//生成如下目录
├── package.json                                       
├── src                                       //源目录(输入目录)
│&nbsp;&nbsp; ├── index.js                                    
├── dist                                         // 输出目录
│&nbsp;&nbsp; ├── index.html                              

" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">//生成如下目录</span>
├── package<span class="hljs-selector-class">.json</span>                                       
├── src                                       <span class="hljs-comment">//源目录(输入目录)</span>
│&nbsp;&nbsp; ├── index<span class="hljs-selector-class">.js</span>                                    
├── dist                                         <span class="hljs-comment">// 输出目录</span>
│&nbsp;&nbsp; ├── index<span class="hljs-selector-class">.html</span>                              

</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 修改 `dist/index.html`
< !DOCTYPE html>
<html lang=&quot;en&quot;>
    <head>
        <meta charset=&quot;UTF-8&quot;>
        <title>webpack_demo</title>
    </head>
    <body>
            <script src=&quot;main.js&quot;></script>   //为什么是main.js下面会解释
    </body>
</html>

//修改`src/index.js    `
 function component() {
   var element = document.createElement('div');
     element.innerHTML = &quot;整一个盒子&quot;
     return element;
  }

  document.body.appendChild(component());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>// 修改 `dist/index.html`
<span class="hljs-tag">&lt; !<span class="hljs-attr">DOCTYPE</span> <span class="hljs-attr">html</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>webpack_demo<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
            <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"main.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>   //为什么是main.js下面会解释
    <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span>

//修改`src/index.js    `
 function component() {
   var element = document.createElement('div');
     element.innerHTML = "整一个盒子"
     return element;
  }

  document.body.appendChild(component());</code></pre>
<blockquote>
<code> npx webpack</code> (Node 8.2+ 版本提供的 npx 命令) <br><code>node node_modules/.bin/webpack</code> (8.2-版本)</blockquote>
<h5>会将我们的脚本作为<code>入口起点</code>，然后 输出 为 <code>main.js</code>.</h5>
<blockquote>
<code>打开dist/index.html  你将会看到 </code>整一个盒子<code> 几个字样~</code>
</blockquote>
<h3 id="articleHeader3">2.资源管理,输出管理.基本开发起步</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//生成如下目录
  ├── package.json 
+ |── webpack.config.js                          //webpack配置文件                                     
  ├── src                                        //源目录(输入目录)
  │&nbsp;&nbsp; ├── index.js                                    
  ├── dist                                       // 输出目录
  │&nbsp;&nbsp; ├── index.html                              
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code><span class="hljs-comment">//生成如下目录</span>
  ├── package.json 
+ |── webpack.config.js                          <span class="hljs-comment">//webpack配置文件                                     </span>
  ├── src                                        <span class="hljs-comment">//源目录(输入目录)</span>
  │&nbsp;&nbsp; ├── <span class="hljs-keyword">index</span>.js                                    
  ├── dist                                       <span class="hljs-comment">// 输出目录</span>
  │&nbsp;&nbsp; ├── <span class="hljs-keyword">index</span>.html                              
</code></pre>
<blockquote>先介绍一个<code>Lodash</code>库  它是一个<code>一致性、模块化、高性能</code>的 JavaScript 实用工具库 模块化处理非常适合<code>值操作和检测</code>(<code>说白了就是webpack用了我也试试...</code>) <br><a href="https://www.lodashjs.com/docs/4.17.5.html" rel="nofollow noreferrer" target="_blank">lodash相关文档</a><p><code>npm install lodash --save  //非仅在开发的时候使用的依赖 就是需要打包到生产环境的包 不加-dev</code></p>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
// src/index.js
import _ from 'lodash';

function component() {
   var element = document.createElement('div');
     element.innerHTML = _.join(['lodash','webpack'],'');   //join将 array 中的所有元素转换为由''分隔的字符串 其它函数可以自己实践
     return element;
 }" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code>
<span class="hljs-comment">// src/index.js</span>
<span class="hljs-keyword">import</span> _ <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash'</span>;

<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">component</span>(<span class="hljs-params"></span>) </span>{
   <span class="hljs-keyword">var</span> element = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>);
     element.innerHTML = _.join([<span class="hljs-string">'lodash'</span>,<span class="hljs-string">'webpack'</span>],<span class="hljs-string">''</span>);   <span class="hljs-comment">//join将 array 中的所有元素转换为由''分隔的字符串 其它函数可以自己实践</span>
     <span class="hljs-keyword">return</span> element;
 }</code></pre>
<blockquote><code>打开index页面输出 loadshwebpack</code></blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//webpack.config.js
 const path = require('path');
 
 module.exports = {
      entry: './src/index.js',   //入口
      output: {  //出口
        filename: 'main.js', //打包之后脚本文件名称
        path: path.resolve(__dirname, 'dist')  //路径指向执行 js 文件的绝对路径 此处为/dist
      }
 };" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-comment">//webpack.config.js</span>
 <span class="hljs-keyword">const</span> path = require(<span class="hljs-string">'path'</span>);
 
 <span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
      entry: <span class="hljs-string">'./src/index.js'</span>,   <span class="hljs-comment">//入口</span>
      output: {  <span class="hljs-comment">//出口</span>
        filename: <span class="hljs-string">'main.js'</span>, <span class="hljs-comment">//打包之后脚本文件名称</span>
        path: path.resolve(__dirname, <span class="hljs-string">'dist'</span>)  <span class="hljs-comment">//路径指向执行 js 文件的绝对路径 此处为/dist</span>
      }
 };</code></pre>
<blockquote>执行<code>npx webpack --config webpack.config.js    (把之前dist目录下main.js删除) </code> 新的脚本生成(其实没多大变化..)</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//  配置一下package.json
  &quot;scripts&quot;: {
    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;,
    &quot;build&quot;: &quot;webpack&quot;     //添加此行命令 下次执行打包就是 npm  run  build 相当于上面的npx webpack --config webpack.config.js
  },

// 资源的配置 css 图片 js等等.. 举例 css 图片
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-comment">//  配置一下package.json</span>
  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"test"</span>: <span class="hljs-string">"echo \"</span><span class="hljs-keyword">Error</span>: <span class="hljs-keyword">no</span> <span class="hljs-keyword">test</span> specified\<span class="hljs-string">" &amp;&amp; exit 1"</span>,
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"webpack"</span>     <span class="hljs-comment">//添加此行命令 下次执行打包就是 npm  run  build 相当于上面的npx webpack --config webpack.config.js</span>
  },

<span class="hljs-comment">// 资源的配置 css 图片 js等等.. 举例 css 图片</span>
</code></pre>
<blockquote>
<code>npm install --save-dev style-loader css-loader</code>   css的loader<br><code>npm install --save-dev file-loader</code>  file(图片)对象的 loader</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" //生成如下目录
   ├── package.json 
 + |── webpack.config.js                          //webpack配置文件                                     
   ├── src                                        //源目录(输入目录)
   │&nbsp;&nbsp; ├── index.js   
 + │&nbsp;&nbsp; ├── index.css 
 + │&nbsp;&nbsp; ├── icon.jpg                                
   ├── dist                                       // 输出目录
   │&nbsp;&nbsp; ├── index.html                              
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs axapta"><code> <span class="hljs-comment">//生成如下目录</span>
   ├── package.json 
 + |── webpack.config.js                          <span class="hljs-comment">//webpack配置文件                                     </span>
   ├── src                                        <span class="hljs-comment">//源目录(输入目录)</span>
   │&nbsp;&nbsp; ├── <span class="hljs-keyword">index</span>.js   
 + │&nbsp;&nbsp; ├── <span class="hljs-keyword">index</span>.css 
 + │&nbsp;&nbsp; ├── icon.jpg                                
   ├── dist                                       <span class="hljs-comment">// 输出目录</span>
   │&nbsp;&nbsp; ├── <span class="hljs-keyword">index</span>.html                              
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//修改webpack.config.js
    const path = require('path');  //path路径模块
    module.exports = {
      entry: './src/index.js',   //入口
      output: {   //出口
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
      },
      module: {
         rules: [
           {
             test: /\.css$/,  //检测正则匹配.css结尾的文件
             use: [           //使用俩个loader
               'style-loader', 
               'css-loader'
             ]
           },
           {
             test: /\.(png|svg|jpg|gif)$/,  //正则匹配.png svg jpg gif结尾的文件
             use: [    //使用file-loader
               'file-loader'
             ]
           }
         ]
       }
    };
 //修改src/index.css
    div{
        color:red;
    }

 //修改src/index.js
     import _ from 'lodash';
     import &quot;./index.css&quot;;
     import Icon from './icon.jpg';
    
    
      function component() {
        var element = document.createElement('div');
    
        element.innerHTML = _.join(['loadsh', 'webpack'], ' ');
        var myIcon = new Image();
        myIcon.src = Icon;
    
        element.appendChild(myIcon);
        return element;
      }
    
      document.body.appendChild(component());
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">//修改webpack.config.js</span>
    <span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);  <span class="hljs-comment">//path路径模块</span>
    <span class="hljs-built_in">module</span>.exports = {
      entry: <span class="hljs-string">'./src/index.js'</span>,   <span class="hljs-comment">//入口</span>
      output: {   <span class="hljs-comment">//出口</span>
        filename: <span class="hljs-string">'main.js'</span>,
        path: path.resolve(__dirname, <span class="hljs-string">'dist'</span>)
      },
      <span class="hljs-keyword">module</span>: {
         rules: [
           {
             test: <span class="hljs-regexp">/\.css$/</span>,  <span class="hljs-comment">//检测正则匹配.css结尾的文件</span>
             use: [           <span class="hljs-comment">//使用俩个loader</span>
               <span class="hljs-string">'style-loader'</span>, 
               <span class="hljs-string">'css-loader'</span>
             ]
           },
           {
             test: <span class="hljs-regexp">/\.(png|svg|jpg|gif)$/</span>,  <span class="hljs-comment">//正则匹配.png svg jpg gif结尾的文件</span>
             use: [    <span class="hljs-comment">//使用file-loader</span>
               <span class="hljs-string">'file-loader'</span>
             ]
           }
         ]
       }
    };
 <span class="hljs-comment">//修改src/index.css</span>
    div{
        color:red;
    }

 <span class="hljs-comment">//修改src/index.js</span>
     <span class="hljs-keyword">import</span> _ <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash'</span>;
     <span class="hljs-keyword">import</span> <span class="hljs-string">"./index.css"</span>;
     <span class="hljs-keyword">import</span> Icon <span class="hljs-keyword">from</span> <span class="hljs-string">'./icon.jpg'</span>;
    
    
      <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">component</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">var</span> element = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>);
    
        element.innerHTML = _.join([<span class="hljs-string">'loadsh'</span>, <span class="hljs-string">'webpack'</span>], <span class="hljs-string">' '</span>);
        <span class="hljs-keyword">var</span> myIcon = <span class="hljs-keyword">new</span> Image();
        myIcon.src = Icon;
    
        element.appendChild(myIcon);
        <span class="hljs-keyword">return</span> element;
      }
    
      <span class="hljs-built_in">document</span>.body.appendChild(component());
</code></pre>
<blockquote>
<code>npm run build(删除之前的dist目录下main.js)  你会看红字和图片</code>  以上就是资源管理的简短介绍</blockquote>
<blockquote>
<code>npm install --save-dev html-webpack-plugin   安装html-webpack-plugin模块</code> 模块用到功能:<br>  1： 动态添加每次compile后 js css 的hash<br>  2:  可配置多页面 单页面 这些 <br>  3： 其它没涉及到<br><code>npm install clean-webpack-plugin --save-dev 清除dist文件夹(每次删除麻烦了..)</code>配置一下</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//修改目录
  ├── package.json 
  |── webpack.config.js                          //webpack配置文件                                     
  ├── src                                        //源目录(输入目录)
 +  │&nbsp;&nbsp; ├── app.js
 +  │&nbsp;&nbsp; ├── print.js
  │&nbsp;&nbsp; ├── index.css 
  │&nbsp;&nbsp; ├── icon.jpg                                   
  ├── dist                                       // 输出目录
  │&nbsp;&nbsp; ├── index.html                              
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs processing"><code><span class="hljs-comment">//修改目录</span>
  ├── <span class="hljs-keyword">package</span>.json 
  |── webpack.config.js                          <span class="hljs-comment">//webpack配置文件                                     </span>
  ├── src                                        <span class="hljs-comment">//源目录(输入目录)</span>
 +  │&nbsp;&nbsp; ├── app.js
 +  │&nbsp;&nbsp; ├── <span class="hljs-built_in">print</span>.js
  │&nbsp;&nbsp; ├── index.css 
  │&nbsp;&nbsp; ├── icon.jpg                                   
  ├── <span class="hljs-built_in">dist</span>                                       <span class="hljs-comment">// 输出目录</span>
  │&nbsp;&nbsp; ├── index.html                              
</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//webpack.config.js  ===============================================
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
       new CleanWebpackPlugin(['dist']),
     new HtmlWebpackPlugin({
       title: 'webpack_demo'
     })
  ],
  module: {
     rules: [
       {
         test: /\.css$/,
         use: [
           'style-loader',
           'css-loader'
         ]
       },
       {
         test: /\.(png|svg|jpg|gif)$/,
         use: [
           'file-loader'
         ]
       }
     ]
   }
};

//修改src/index.js ===================================================
 import _ from 'lodash';   //引入lodash模块
 import &quot;./index.css&quot;;     // index.css
 import Icon from './icon.jpg';   // 图片
 import printMe from &quot;./print.js&quot;    // printJS


  function component() {
    var element = document.createElement('div');  //创建一个元素

    element.innerHTML = _.join(['loadsh', 'webpack'], ' ');  // lodash中_.join方法
    var myIcon = new Image(); //创建一个图片
    myIcon.src = Icon;    //src赋值

    element.appendChild(myIcon);   //追加图片

    var btn = document.createElement('button');  //创建按钮
    btn.innerHTML = 'Click me and check the console!';   //内容赋值
    btn.onclick = printMe;   //添加事件
    element.appendChild(btn);   //追加元素

    return element;
  }

  document.body.appendChild(component());   //追加元素到body中
  
  //修改src/print.js  ==========================================
  export default function printMe() {
      console.log('from print.js');
  }
  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">//webpack.config.js  ===============================================</span>
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>);
<span class="hljs-keyword">const</span> CleanWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'clean-webpack-plugin'</span>);

<span class="hljs-built_in">module</span>.exports = {
  <span class="hljs-attr">entry</span>: {
    <span class="hljs-attr">app</span>: <span class="hljs-string">'./src/index.js'</span>,
    <span class="hljs-attr">print</span>: <span class="hljs-string">'./src/print.js'</span>
  },
  <span class="hljs-attr">output</span>: {
    <span class="hljs-attr">filename</span>: <span class="hljs-string">'[name].bundle.js'</span>,
    <span class="hljs-attr">path</span>: path.resolve(__dirname, <span class="hljs-string">'dist'</span>)
  },
  <span class="hljs-attr">plugins</span>: [
       <span class="hljs-keyword">new</span> CleanWebpackPlugin([<span class="hljs-string">'dist'</span>]),
     <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
       <span class="hljs-attr">title</span>: <span class="hljs-string">'webpack_demo'</span>
     })
  ],
  <span class="hljs-attr">module</span>: {
     <span class="hljs-attr">rules</span>: [
       {
         <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.css$/</span>,
         <span class="hljs-attr">use</span>: [
           <span class="hljs-string">'style-loader'</span>,
           <span class="hljs-string">'css-loader'</span>
         ]
       },
       {
         <span class="hljs-attr">test</span>: <span class="hljs-regexp">/\.(png|svg|jpg|gif)$/</span>,
         <span class="hljs-attr">use</span>: [
           <span class="hljs-string">'file-loader'</span>
         ]
       }
     ]
   }
};

<span class="hljs-comment">//修改src/index.js ===================================================</span>
 <span class="hljs-keyword">import</span> _ <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash'</span>;   <span class="hljs-comment">//引入lodash模块</span>
 <span class="hljs-keyword">import</span> <span class="hljs-string">"./index.css"</span>;     <span class="hljs-comment">// index.css</span>
 <span class="hljs-keyword">import</span> Icon <span class="hljs-keyword">from</span> <span class="hljs-string">'./icon.jpg'</span>;   <span class="hljs-comment">// 图片</span>
 <span class="hljs-keyword">import</span> printMe <span class="hljs-keyword">from</span> <span class="hljs-string">"./print.js"</span>    <span class="hljs-comment">// printJS</span>


  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">component</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-keyword">var</span> element = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>);  <span class="hljs-comment">//创建一个元素</span>

    element.innerHTML = _.join([<span class="hljs-string">'loadsh'</span>, <span class="hljs-string">'webpack'</span>], <span class="hljs-string">' '</span>);  <span class="hljs-comment">// lodash中_.join方法</span>
    <span class="hljs-keyword">var</span> myIcon = <span class="hljs-keyword">new</span> Image(); <span class="hljs-comment">//创建一个图片</span>
    myIcon.src = Icon;    <span class="hljs-comment">//src赋值</span>

    element.appendChild(myIcon);   <span class="hljs-comment">//追加图片</span>

    <span class="hljs-keyword">var</span> btn = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'button'</span>);  <span class="hljs-comment">//创建按钮</span>
    btn.innerHTML = <span class="hljs-string">'Click me and check the console!'</span>;   <span class="hljs-comment">//内容赋值</span>
    btn.onclick = printMe;   <span class="hljs-comment">//添加事件</span>
    element.appendChild(btn);   <span class="hljs-comment">//追加元素</span>

    <span class="hljs-keyword">return</span> element;
  }

  <span class="hljs-built_in">document</span>.body.appendChild(component());   <span class="hljs-comment">//追加元素到body中</span>
  
  <span class="hljs-comment">//修改src/print.js  ==========================================</span>
  <span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">printMe</span>(<span class="hljs-params"></span>) </span>{
      <span class="hljs-built_in">console</span>.log(<span class="hljs-string">'from print.js'</span>);
  }
  </code></pre>
<blockquote>
<code>npm run build 会发现基本webpack的配置之后 ,有点模样(意思)了</code>  打开页面index.html正常访问</blockquote>
<h3 id="articleHeader4">3.本地开发</h3>
<blockquote>
<code>npm install --save-dev webpack-dev-server </code>  <code>  "webpack-dev-server" 为你提供了一个简单的 web 服务器，并且能够实时重新加载</code>
</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" //修改webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
     contentBase: './dist'
  },
  plugins: [
       new CleanWebpackPlugin(['dist']),
     new HtmlWebpackPlugin({
       title: 'webpack_demo'
     })
  ],
  module: {
     rules: [
       {
         test: /\.css$/,
         use: [
           'style-loader',
           'css-loader'
         ]
       },
       {
         test: /\.(png|svg|jpg|gif)$/,
         use: [
           'file-loader'
         ]
       }
     ]
   }
};
//修改package.json
...
&quot;scripts&quot;: {
    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;,
    &quot;start&quot;: &quot;webpack-dev-server --open&quot;, //start命令
    &quot;build&quot;: &quot;webpack&quot;
 },
 ...
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code> <span class="hljs-comment">//修改webpack.config.js</span>
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>);
<span class="hljs-keyword">const</span> CleanWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'clean-webpack-plugin'</span>);
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);

<span class="hljs-built_in">module</span>.exports = {
  entry: {
    app: <span class="hljs-string">'./src/index.js'</span>
  },
  output: {
    filename: <span class="hljs-string">'[name].bundle.js'</span>,
    path: path.resolve(__dirname, <span class="hljs-string">'dist'</span>)
  },
  devServer: {
     contentBase: <span class="hljs-string">'./dist'</span>
  },
  plugins: [
       <span class="hljs-keyword">new</span> CleanWebpackPlugin([<span class="hljs-string">'dist'</span>]),
     <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
       title: <span class="hljs-string">'webpack_demo'</span>
     })
  ],
  <span class="hljs-keyword">module</span>: {
     rules: [
       {
         test: <span class="hljs-regexp">/\.css$/</span>,
         use: [
           <span class="hljs-string">'style-loader'</span>,
           <span class="hljs-string">'css-loader'</span>
         ]
       },
       {
         test: <span class="hljs-regexp">/\.(png|svg|jpg|gif)$/</span>,
         use: [
           <span class="hljs-string">'file-loader'</span>
         ]
       }
     ]
   }
};
<span class="hljs-comment">//修改package.json</span>
...
<span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"test"</span>: <span class="hljs-string">"echo \"Error: no test specified\" &amp;&amp; exit 1"</span>,
    <span class="hljs-string">"start"</span>: <span class="hljs-string">"webpack-dev-server --open"</span>, <span class="hljs-comment">//start命令</span>
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"webpack"</span>
 },
 ...
 </code></pre>
<blockquote><code>npm run start 本地起了8080端口的服务,你也可以看到自己的页面</code></blockquote>
<h3 id="articleHeader5">4.热更新</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//修改webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: {
    app: './src/index.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
     contentBase: './dist',
     hot: true
  },
  plugins: [
       new CleanWebpackPlugin(['dist']),
     new HtmlWebpackPlugin({
       title: 'webpack_demo'
     }),
     new webpack.NamedModulesPlugin(),
     new webpack.HotModuleReplacementPlugin()
  ],
  module: {
     rules: [
       {
         test: /\.css$/,
         use: [
           'style-loader',
           'css-loader'
         ]
       },
       {
         test: /\.(png|svg|jpg|gif)$/,
         use: [
           'file-loader'
         ]
       }
     ]
   }
};
 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-comment">//修改webpack.config.js</span>
<span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>);
<span class="hljs-keyword">const</span> CleanWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'clean-webpack-plugin'</span>);
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>);

<span class="hljs-built_in">module</span>.exports = {
  entry: {
    app: <span class="hljs-string">'./src/index.js'</span>
  },
  output: {
    filename: <span class="hljs-string">'[name].bundle.js'</span>,
    path: path.resolve(__dirname, <span class="hljs-string">'dist'</span>)
  },
  devServer: {
     contentBase: <span class="hljs-string">'./dist'</span>,
     hot: <span class="hljs-literal">true</span>
  },
  plugins: [
       <span class="hljs-keyword">new</span> CleanWebpackPlugin([<span class="hljs-string">'dist'</span>]),
     <span class="hljs-keyword">new</span> HtmlWebpackPlugin({
       title: <span class="hljs-string">'webpack_demo'</span>
     }),
     <span class="hljs-keyword">new</span> webpack.NamedModulesPlugin(),
     <span class="hljs-keyword">new</span> webpack.HotModuleReplacementPlugin()
  ],
  <span class="hljs-keyword">module</span>: {
     rules: [
       {
         test: <span class="hljs-regexp">/\.css$/</span>,
         use: [
           <span class="hljs-string">'style-loader'</span>,
           <span class="hljs-string">'css-loader'</span>
         ]
       },
       {
         test: <span class="hljs-regexp">/\.(png|svg|jpg|gif)$/</span>,
         use: [
           <span class="hljs-string">'file-loader'</span>
         ]
       }
     ]
   }
};
 </code></pre>
<blockquote>
<code>npm run start 运行http://localhost:8080/  然后你去修改print js的console(或者添加其他代码) 会发现命令行输出updated. Recompiling... 字样</code> 这就是简单的实现了热更新</blockquote>
<h2 id="articleHeader6">最后</h2>
<p>本文只是大概从几个demo来对于webpack的基础概念 <code>入口entry 出口 output</code> <code>loader</code> <code>plugins mode(没有直面涉及)</code>几大模块的梳理于实践,让大家对于webpack不在那么陌生!</p>
<blockquote>
<p>后续文章会从更深入的角度去学习webpack! 暂定下周1 发表文章(内容 详细介绍<code>hot</code> 实现一个<code>简易的vue-cli</code>等等)</p>
<blockquote>demo的代码我会同步<a href="https://github.com/Xieguoiang/Full-Stack-Programming/tree/master/webpack" rel="nofollow noreferrer" target="_blank">github</a>
</blockquote>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
还不打算去认识一下webpack? 

## 原文链接
[https://segmentfault.com/a/1190000016927436](https://segmentfault.com/a/1190000016927436)

