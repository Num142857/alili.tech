---
title: 'Webpack 4x 之路 （ 一 ）' 
date: 2018-12-07 2:30:10
hidden: true
slug: 2gquwv8g3tg
categories: [reprint]
---

{{< raw >}}

                    
<h4>为什么需要<code>webpack</code>呢</h4>
<blockquote>现在的前端网页非常丰富，特别是SPA技术流行后，js的复杂度增加并且有时需要一大堆的依赖包，还需要解决<code>SCSS</code> <code>Less</code> 等<code>css</code>预处理等的编译工作。所以现在的前端已经相当依赖 <code>webpack</code> 来更好的管理项目了。</blockquote>
<p>现在所流行的<code>vue</code> <code>react</code> <code>angluar</code> 已经和webpack非常的密切了，官方都推出了和自身框架依赖的webpack构架工具。</p>
<h4>什么是webpack</h4>
<blockquote>webpack 可以看作是一个打包工具，它可以分析你的项目结构，然后找到js 模块以及一些浏览器不能直接执行的一些语言比如 Less 、TypeScript 等，并将其转换和打包为一个合法的格式以供浏览器使用。webpack从3.0之后还担负起了优化项目的功能.</blockquote>
<p><span class="img-wrap"><img data-src="/img/remote/1460000014142980?w=1240&amp;h=543" src="https://static.alili.tech/img/remote/1460000014142980?w=1240&amp;h=543" alt="" title="" style="cursor: pointer;"></span></p>
<blockquote>现在的webpack已经到了4.X版本了,我也是全程使用了 <code>webpack ^4.4.1</code>哦</blockquote>
<p><strong>webpack安装和使用</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="mkdir webpack_demo
cd webpack_demo" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dos"><code><span class="hljs-built_in">mkdir</span> webpack_demo
<span class="hljs-built_in">cd</span> webpack_demo</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// npm初始化
npm init
// 然后一直回车" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs swift"><code><span class="hljs-comment">// npm初始化</span>
npm <span class="hljs-keyword">init</span>
<span class="hljs-comment">// 然后一直回车</span></code></pre>
<p><strong>安装webpack</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 不建议全局安装
cnpm install webpack --save-dev

// --save是要保存到package.json中，dev是在开发时使用这个包，而生产环境中不使用。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs q"><code><span class="hljs-comment">// 不建议全局安装</span>
cnpm install webpack --<span class="hljs-built_in">save</span>-<span class="hljs-built_in">dev</span>

<span class="hljs-comment">// --save是要保存到package.json中，dev是在开发时使用这个包，而生产环境中不使用。</span></code></pre>
<hr>
<blockquote>首先来一个小demo吧</blockquote>
<p><strong>目录结构</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="| dist
    - index.html
| node_modules
| src
    - index.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-string">| dist</span>
    - index.html
<span class="hljs-string">| node_modules</span>
<span class="hljs-string">| src</span>
    - index.js</code></pre>
<p><strong>完善文件内容</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.js
import _ from 'lodash';
function component() {
  var element = document.createElement('div');

  // Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-comment">// index.js</span>
<span class="hljs-keyword">import</span> _ <span class="hljs-keyword">from</span> <span class="hljs-string">'lodash'</span>;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">component</span>(<span class="hljs-params"></span>) </span>{
  <span class="hljs-keyword">var</span> element = <span class="hljs-built_in">document</span>.createElement(<span class="hljs-string">'div'</span>);

  <span class="hljs-comment">// Lodash（目前通过一个 script 脚本引入）对于执行这一行是必需的</span>
  element.innerHTML = _.join([<span class="hljs-string">'Hello'</span>, <span class="hljs-string">'webpack'</span>], <span class="hljs-string">' '</span>);

  <span class="hljs-keyword">return</span> element;
}

<span class="hljs-built_in">document</span>.body.appendChild(component());</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.html
<!doctype html>
<html>
  <head>
    <title>Getting Started</title>
  </head>
  <body>
    <script src=&quot;./bundle.js&quot;></script>
  </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>// index.html
<span class="hljs-meta">&lt;!doctype html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Getting Started<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 执行命令
$ npx webpack src/index.js --output dist/bundle.js

npx: installed 1 in 7.613s
Path must be a string. Received undefined
D:\myweb\webpack\webpack_study_demo\webpack_demo01\node_modules\_webpack@4.4.1@webpack\bin\webpack.js
The CLI moved into a separate package: webpack-cli
Would you like to install webpack-cli? (That will run npm install -D webpack-cli) (yes/NO)NO
It needs to be installed alongside webpack to use the CLI


// 这里提示安装 webpack-cli
// 是因为到了webpack4,  webpack 已经将 webpack 命令行相关的内容都迁移到 webpack-cli，所以除了 webpack 外，我们还需要安装 webpack-cli：" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-comment">// 执行命令</span>
$ npx webpack src/index.js --output dist/bundle.js

npx: installed 1 <span class="hljs-keyword">in</span> 7.613s
Path must be a string. Received undefined
<span class="hljs-keyword">D</span>:\myweb\webpack\webpack_study_demo\webpack_demo01\node_modules\_webpack@4.4.1@webpack\bin\webpack.js
The <span class="hljs-keyword">CLI</span> moved into a <span class="hljs-keyword">separate</span> package: webpack-<span class="hljs-keyword">cli</span>
Would you like to install webpack-<span class="hljs-keyword">cli</span>? (That will <span class="hljs-keyword">run</span> npm install -<span class="hljs-keyword">D</span> webpack-<span class="hljs-keyword">cli</span>) (yes/<span class="hljs-keyword">NO</span>)<span class="hljs-keyword">NO</span>
It needs to be installed alongside webpack to <span class="hljs-keyword">use</span> the <span class="hljs-keyword">CLI</span>


<span class="hljs-comment">// 这里提示安装 webpack-cli</span>
<span class="hljs-comment">// 是因为到了webpack4,  webpack 已经将 webpack 命令行相关的内容都迁移到 webpack-cli，所以除了 webpack 外，我们还需要安装 webpack-cli：</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 安装webpack-cli
cnpm install webpack-cli --save" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-comment">// 安装webpack-cli</span>
cnpm install webpack-<span class="hljs-keyword">cli</span> --<span class="hljs-keyword">save</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 在次执行
npx webpack src/index.js --output dist/bundle.js
npx: installed 1 in 5.327s
Path must be a string. Received undefined
D:\myweb\webpack\webpack_study_demo\webpack_demo01\node_modules\_webpack@4.4.1@webpack\bin\webpack.js
Hash: c0cb86e7079d57cac106
Version: webpack 4.4.1
Time: 4707ms
Built at: 2018-4-2 21:18:48
    Asset      Size  Chunks             Chunk Names
bundle.js  69.9 KiB       0  [emitted]  main
Entrypoint main = bundle.js
   [1] (webpack)/buildin/module.js 519 bytes {0} [built]
   [2] (webpack)/buildin/global.js 509 bytes {0} [built]
   [3] ./src/index.js 266 bytes {0} [built]
    + 1 hidden module

WARNING in configuration
The 'mode' option has not been set, webpack will fallback to 'production' for this value. Set 'mode' option to 'development' or 'production' to enable defaults for each environment.
You can also set it to 'none' to disable any default behavior. Learn more: https://webpack.js.org/concepts/mode/

// 有一个警告
// 说'mode'没有定义，这是 webpack  4x 引入的，有两个值，development 和 production。默认是production.
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs oxygene"><code><span class="hljs-comment">// 在次执行</span>
npx webpack src/<span class="hljs-keyword">index</span>.js --output dist/bundle.js
npx: installed <span class="hljs-number">1</span> <span class="hljs-keyword">in</span> <span class="hljs-number">5.327</span>s
Path must be a string. Received undefined
D:\myweb\webpack\webpack_study_demo\webpack_demo01\node_modules\_webpack@<span class="hljs-number">4.4</span>.<span class="hljs-number">1</span>@webpack\bin\webpack.js
Hash: c0cb86e7079d57cac106
Version: webpack <span class="hljs-number">4.4</span>.<span class="hljs-number">1</span>
Time: <span class="hljs-number">4707</span>ms
Built at: <span class="hljs-number">2018</span>-<span class="hljs-number">4</span>-<span class="hljs-number">2</span> <span class="hljs-number">21</span>:<span class="hljs-number">18</span>:<span class="hljs-number">48</span>
    Asset      Size  Chunks             Chunk Names
bundle.js  <span class="hljs-number">69.9</span> KiB       <span class="hljs-number">0</span>  [emitted]  main
Entrypoint main = bundle.js
   [<span class="hljs-number">1</span>] (webpack)/buildin/<span class="hljs-keyword">module</span>.js <span class="hljs-number">519</span> bytes <span class="hljs-comment">{0}</span> [built]
   [<span class="hljs-number">2</span>] (webpack)/buildin/<span class="hljs-keyword">global</span>.js <span class="hljs-number">509</span> bytes <span class="hljs-comment">{0}</span> [built]
   [<span class="hljs-number">3</span>] ./src/<span class="hljs-keyword">index</span>.js <span class="hljs-number">266</span> bytes <span class="hljs-comment">{0}</span> [built]
    + <span class="hljs-number">1</span> hidden <span class="hljs-keyword">module</span>

WARNING <span class="hljs-keyword">in</span> configuration
The <span class="hljs-string">'mode'</span> option <span class="hljs-keyword">has</span> <span class="hljs-keyword">not</span> been <span class="hljs-keyword">set</span>, webpack will fallback <span class="hljs-keyword">to</span> <span class="hljs-string">'production'</span> <span class="hljs-keyword">for</span> this value. <span class="hljs-keyword">Set</span> <span class="hljs-string">'mode'</span> option <span class="hljs-keyword">to</span> <span class="hljs-string">'development'</span> <span class="hljs-keyword">or</span> <span class="hljs-string">'production'</span> <span class="hljs-keyword">to</span> enable defaults <span class="hljs-keyword">for</span> <span class="hljs-keyword">each</span> environment.
You can also <span class="hljs-keyword">set</span> it <span class="hljs-keyword">to</span> <span class="hljs-string">'none'</span> <span class="hljs-keyword">to</span> disable any <span class="hljs-keyword">default</span> behavior. Learn more: https:<span class="hljs-comment">//webpack.js.org/concepts/mode/</span>

<span class="hljs-comment">// 有一个警告</span>
<span class="hljs-comment">// 说'mode'没有定义，这是 webpack  4x 引入的，有两个值，development 和 production。默认是production.</span>
</code></pre>
<p>由于webpack 默认的入口文件是从./src/index.js,输出是./dist/main.js 。因此可以直接 <code>npx webpack --mode development </code></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> npx webpack --mode development
npx: installed 1 in 5.759s
Path must be a string. Received undefined
D:\myweb\webpack\webpack_study_demo\webpack_demo01\node_modules\_webpack@4.4.1@webpack\bin\webpack.js
Hash: 36739af911cbe57bdd95
Version: webpack 4.4.1
Time: 1060ms
Built at: 2018-4-2 21:25:02
  Asset     Size  Chunks             Chunk Names
main.js  550 KiB    main  [emitted]  main
Entrypoint main = main.js
[./node_modules/_webpack@4.4.1@webpack/buildin/global.js] (webpack)/buildin/global.js 509 bytes {main} [built]
[./node_modules/_webpack@4.4.1@webpack/buildin/module.js] (webpack)/buildin/module.js 519 bytes {main} [built]
[./src/index.js] 266 bytes {main} [built]
    + 1 hidden module

// 打包完毕了
// 我们可以打开 `dist/index.html` 查看一下.
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>&gt; npx webpack --mode development
<span class="hljs-string">npx:</span> installed <span class="hljs-number">1</span> <span class="hljs-keyword">in</span> <span class="hljs-number">5.759</span>s
Path must be a string. Received undefined
<span class="hljs-string">D:</span>\myweb\webpack\webpack_study_demo\webpack_demo01\node_modules\_webpack@<span class="hljs-number">4.4</span><span class="hljs-number">.1</span><span class="hljs-meta">@webpack</span>\bin\webpack.js
<span class="hljs-string">Hash:</span> <span class="hljs-number">36739</span>af911cbe57bdd95
<span class="hljs-string">Version:</span> webpack <span class="hljs-number">4.4</span><span class="hljs-number">.1</span>
<span class="hljs-string">Time:</span> <span class="hljs-number">1060</span>ms
Built <span class="hljs-string">at:</span> <span class="hljs-number">2018</span><span class="hljs-number">-4</span><span class="hljs-number">-2</span> <span class="hljs-number">21</span>:<span class="hljs-number">25</span>:<span class="hljs-number">02</span>
  Asset     Size  Chunks             Chunk Names
main.js  <span class="hljs-number">550</span> KiB    main  [emitted]  main
Entrypoint main = main.js
[.<span class="hljs-regexp">/node_modules/</span>_webpack@<span class="hljs-number">4.4</span><span class="hljs-number">.1</span><span class="hljs-meta">@webpack</span><span class="hljs-regexp">/buildin/</span>global.js] (webpack)<span class="hljs-regexp">/buildin/</span>global.js <span class="hljs-number">509</span> bytes {main} [built]
[.<span class="hljs-regexp">/node_modules/</span>_webpack@<span class="hljs-number">4.4</span><span class="hljs-number">.1</span><span class="hljs-meta">@webpack</span><span class="hljs-regexp">/buildin/</span>module.js] (webpack)<span class="hljs-regexp">/buildin/</span>module.js <span class="hljs-number">519</span> bytes {main} [built]
[.<span class="hljs-regexp">/src/</span>index.js] <span class="hljs-number">266</span> bytes {main} [built]
    + <span class="hljs-number">1</span> hidden module

<span class="hljs-comment">// 打包完毕了</span>
<span class="hljs-comment">// 我们可以打开 `dist/index.html` 查看一下.</span>
</code></pre>
<hr>
<p><strong>配置文件</strong></p>
<p>上面的<code> demo </code>并没有使用配置文件，而是使用 <code>CLI</code> 来实现打包的，那么我们现在来学习一下配置文件吧。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
module.exports = {
    //入口文件的配置项
    entry:{},
    //出口文件的配置项
    output:{},
    //模块：例如解读CSS,图片如何转换，压缩
    module:{},
    //插件，用于生产模版和各项功能
    plugins:[],
    //配置webpack开发服务功能
    devServer:{}
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dts"><code><span class="hljs-comment">// webpack.config.js</span>
module.exports = {
    <span class="hljs-comment">//入口文件的配置项</span>
<span class="hljs-symbol">    entry:</span>{},
    <span class="hljs-comment">//出口文件的配置项</span>
<span class="hljs-symbol">    output:</span>{},
    <span class="hljs-comment">//模块：例如解读CSS,图片如何转换，压缩</span>
<span class="hljs-symbol">    module:</span>{},
    <span class="hljs-comment">//插件，用于生产模版和各项功能</span>
<span class="hljs-symbol">    plugins:</span>[],
    <span class="hljs-comment">//配置webpack开发服务功能</span>
<span class="hljs-symbol">    devServer:</span>{}
}</code></pre>
<blockquote>入口起点</blockquote>
<p><strong>单文件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    entry: &quot;./src/index.js&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
    entry: <span class="hljs-string">"./src/index.js"</span>
}</code></pre>
<p><strong>多文件</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 对象语法
module.exports = {
    entry: {
        app: &quot;./sec/app.js&quot;,
        vendors: &quot;./src/vendors.js&quot; 
    }
}

// 应用场景： 分离应用程序、和第三方库入口、多页面应用程序

// 多页面应用程序
const config = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js',
    pageThree: './src/pageThree/index.js'
  }
};" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-comment">// 对象语法</span>
<span class="hljs-keyword">module</span>.exports = {
    entry: {
        app: <span class="hljs-string">"./sec/app.js"</span>,
        vendors: <span class="hljs-string">"./src/vendors.js"</span> 
    }
}

<span class="hljs-comment">// 应用场景： 分离应用程序、和第三方库入口、多页面应用程序</span>

<span class="hljs-comment">// 多页面应用程序</span>
<span class="hljs-keyword">const</span> <span class="hljs-built_in">config</span> = {
  entry: {
    pageOne: <span class="hljs-string">'./src/pageOne/index.js'</span>,
    pageTwo: <span class="hljs-string">'./src/pageTwo/index.js'</span>,
    pageThree: <span class="hljs-string">'./src/pageThree/index.js'</span>
  }
};</code></pre>
<blockquote>出口</blockquote>
<p><strong>基本用法</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
const path = require('path');
const config = {
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};

module.exports = config;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs arduino"><code><span class="hljs-comment">// webpack.config.js</span>
<span class="hljs-keyword">const</span> path = require(<span class="hljs-string">'path'</span>);
<span class="hljs-keyword">const</span> <span class="hljs-built_in">config</span> = {
  output: {
    filename: <span class="hljs-string">'bundle.js'</span>,
    path: path.resolve(__dirname, <span class="hljs-string">'dist'</span>)
  }
};

<span class="hljs-keyword">module</span>.exports = <span class="hljs-built_in">config</span>;</code></pre>
<p><strong>多入口起点</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="//
{
    entry: {
        app: './src/app.js',
        search: './src/search.js'
    },
    output: {
        filename: '[name].js',
        path: __dirname + '/dist'
    }
}
// 这里的[name]是占位符,之后会替换为 app、search
// 写入到硬盘：./dist/app.js, ./dist/search.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs less"><code><span class="hljs-comment">//</span>
{
    <span class="hljs-attribute">entry</span>: {
        <span class="hljs-attribute">app</span>: <span class="hljs-string">'./src/app.js'</span>,
        <span class="hljs-attribute">search</span>: <span class="hljs-string">'./src/search.js'</span>
    },
    <span class="hljs-attribute">output</span>: {
        <span class="hljs-attribute">filename</span>: <span class="hljs-string">'[name].js'</span>,
        <span class="hljs-attribute">path</span>: __dirname + <span class="hljs-string">'/dist'</span>
    }
}
<span class="hljs-comment">// 这里的[name]是占位符,之后会替换为 app、search</span>
<span class="hljs-comment">// 写入到硬盘：./dist/app.js, ./dist/search.js</span></code></pre>
<p><strong>继续上面的小demo</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
var path = require('path')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// webpack.config.js</span>
<span class="hljs-selector-tag">var</span> path = require(<span class="hljs-string">'path'</span>)
module<span class="hljs-selector-class">.exports</span> = {
  entry: <span class="hljs-string">'./src/index.js'</span>,
  output: {
    path: path.resolve(__dirname, <span class="hljs-string">'dist'</span>),
    filename: <span class="hljs-string">'bundle.js'</span>
  }
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 执行
$ npx webpack --config webpack.config.js
// 同样能打包OK
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// 执行</span>
$ npx webpack --config webpack<span class="hljs-selector-class">.config</span><span class="hljs-selector-class">.js</span>
<span class="hljs-comment">// 同样能打包OK</span>
</code></pre>
<hr>
<p><strong>上面讲的比较零碎呢，看着不爽，那我们再来一个比较实用一点的demo吧</strong></p>
<blockquote>目录结构</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="| dist
    - index.html
| src
    - index.js
| package.json
| webpack.config.js
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs 1c"><code><span class="hljs-string">| dist</span>
    - index.html
<span class="hljs-string">| src</span>
    - index.js
<span class="hljs-string">| package.json</span>
<span class="hljs-string">| webpack.config.js</span>
</code></pre>
<blockquote>具体代码实现</blockquote>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// webpack.config.js
var path = require('path')
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js'
  }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code><span class="hljs-comment">// webpack.config.js</span>
<span class="hljs-selector-tag">var</span> path = require(<span class="hljs-string">'path'</span>)
module<span class="hljs-selector-class">.exports</span> = {
  entry: <span class="hljs-string">'./src/index.js'</span>,
  output: {
    path: path.resolve(__dirname, <span class="hljs-string">'dist'</span>),
    filename: <span class="hljs-string">'js/bundle.js'</span>
  }
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.html
<!DOCTYPE html>
<html lang=&quot;en&quot;>
<head>
  <meta charset=&quot;UTF-8&quot;>
  <meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;>
  <meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;ie=edge&quot;>
  <title>Document</title>
</head>
<body>
  <div id=&quot;title&quot;></div>
  <script src=&quot;./js/bundle.js&quot;></script>
</body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>// index.html
<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span> <span class="hljs-attr">lang</span>=<span class="hljs-string">"en"</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">"viewport"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"width=device-width, initial-scale=1.0"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">http-equiv</span>=<span class="hljs-string">"X-UA-Compatible"</span> <span class="hljs-attr">content</span>=<span class="hljs-string">"ie=edge"</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Document<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">"title"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./js/bundle.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// index.js
document.getElementById('title').innerHTML = 'hello webpack';" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dart"><code><span class="hljs-comment">// index.js</span>
<span class="hljs-built_in">document</span>.getElementById(<span class="hljs-string">'title'</span>).innerHTML = <span class="hljs-string">'hello webpack'</span>;</code></pre>
<p><strong>到了重点所在了哦</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// package.json
{
  &quot;name&quot;: &quot;webpack_new_test&quot;,
  &quot;version&quot;: &quot;1.0.0&quot;,
  &quot;description&quot;: &quot;&quot;,
  &quot;main&quot;: &quot;index.js&quot;,
  &quot;scripts&quot;: {
    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;,
    &quot;build&quot;: &quot;webpack --mode development&quot;
    // &quot;build&quot;: &quot;webpack --config webpack.config.js --mode development&quot;
    // 上面两种配置等价，--config webpack.config.js可以不写，默认是它。
    // webpack 4.0之后多了mode的配置，因此我们需要配置一下，不然会出现警告哦
  },
  &quot;author&quot;: &quot;&quot;,
  &quot;license&quot;: &quot;ISC&quot;,
  &quot;devDependencies&quot;: {
    &quot;webpack&quot;: &quot;^4.4.1&quot;,
    &quot;webpack-cli&quot;: &quot;^2.0.13&quot;
  }
}
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code><span class="hljs-comment">// package.json</span>
{
  <span class="hljs-string">"name"</span>: <span class="hljs-string">"webpack_new_test"</span>,
  <span class="hljs-string">"version"</span>: <span class="hljs-string">"1.0.0"</span>,
  <span class="hljs-string">"description"</span>: <span class="hljs-string">""</span>,
  <span class="hljs-string">"main"</span>: <span class="hljs-string">"index.js"</span>,
  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"test"</span>: <span class="hljs-string">"echo \"</span><span class="hljs-keyword">Error</span>: <span class="hljs-keyword">no</span> <span class="hljs-keyword">test</span> specified\<span class="hljs-string">" &amp;&amp; exit 1"</span>,
    <span class="hljs-string">"build"</span>: <span class="hljs-string">"webpack --mode development"</span>
    <span class="hljs-comment">// "build": "webpack --config webpack.config.js --mode development"</span>
    <span class="hljs-comment">// 上面两种配置等价，--config webpack.config.js可以不写，默认是它。</span>
    <span class="hljs-comment">// webpack 4.0之后多了mode的配置，因此我们需要配置一下，不然会出现警告哦</span>
  },
  <span class="hljs-string">"author"</span>: <span class="hljs-string">""</span>,
  <span class="hljs-string">"license"</span>: <span class="hljs-string">"ISC"</span>,
  <span class="hljs-string">"devDependencies"</span>: {
    <span class="hljs-string">"webpack"</span>: <span class="hljs-string">"^4.4.1"</span>,
    <span class="hljs-string">"webpack-cli"</span>: <span class="hljs-string">"^2.0.13"</span>
  }
}
</code></pre>
<p><strong>运行一下</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ npm run build

> webpack_new_test@1.0.0 build D:\myweb\webpack\webpack_study_demo\webpack_new_test
> webpack --mode development

Hash: 8603f6b2e76022d881d9
Version: webpack 4.4.1
Time: 106ms
Built at: 2018-4-3 16:32:55
       Asset      Size  Chunks             Chunk Names
js/bundle.js  2.87 KiB    main  [emitted]  main
Entrypoint main = js/bundle.js
[./src/index.js] 61 bytes {main} [built]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs subunit"><code>$ npm run build

&gt; webpack_new_test@1.0.0 build D:\myweb\webpack\webpack_study_demo\webpack_new_test
&gt; webpack --mode development

Hash: 8603f6b2e76022d881d9
Version: webpack 4.4.1
<span class="hljs-keyword">Time:</span> 106ms
Built at: 2018<span class="hljs-string">-4</span><span class="hljs-string">-3</span> 16:32:55
       Asset      Size  Chunks             Chunk Names
js/bundle.js  2.87 KiB    main  [emitted]  main
Entrypoint main = js/bundle.js
[./src/index.js] 61 bytes {main} [built]</code></pre>
<ul><li>补充</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 按道理我们在本地安装了webpack，这部就是应该直接运行webpack 就可以打包了嘛

>$  webpack
webpack : 无法将“webpack”项识别为 cmdlet、函数、脚本文件或可运行程序的名称。请检查名称的拼写，如果包括路径，请确保路
径正确，然后再试一次。
所在位置 行:1 字符: 1
+ webpack
+ ~~~~~~~
    + CategoryInfo          : ObjectNotFound: (webpack:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

// 恰恰报错了呢


// 解决办法一
全局安装 webpack 和 webpack-cli

// 解决办法二
就是上诉我们在package.json中进行配置
&quot;build&quot;: &quot;webpack --mode development&quot; 
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code><span class="hljs-comment">// 按道理我们在本地安装了webpack，这部就是应该直接运行webpack 就可以打包了嘛</span>

&gt;$  webpack
<span class="hljs-string">webpack :</span> 无法将“webpack”项识别为 cmdlet、函数、脚本文件或可运行程序的名称。请检查名称的拼写，如果包括路径，请确保路
径正确，然后再试一次。
所在位置 行:<span class="hljs-number">1</span> 字符: <span class="hljs-number">1</span>
+ webpack
+ ~~~~~~~
    + <span class="hljs-string">CategoryInfo          :</span> <span class="hljs-string">ObjectNotFound:</span> (<span class="hljs-string">webpack:</span>String) [], CommandNotFoundException
    + <span class="hljs-string">FullyQualifiedErrorId :</span> CommandNotFoundException

<span class="hljs-comment">// 恰恰报错了呢</span>


<span class="hljs-comment">// 解决办法一</span>
全局安装 webpack 和 webpack-cli

<span class="hljs-comment">// 解决办法二</span>
就是上诉我们在<span class="hljs-keyword">package</span>.json中进行配置
<span class="hljs-string">"build"</span>: <span class="hljs-string">"webpack --mode development"</span> 
</code></pre>
<blockquote>未完待续,小编会继续往下写哦~~</blockquote>
<blockquote>参考文献</blockquote>
<p><a href="https://www.webpackjs.com/" rel="nofollow noreferrer" target="_blank">官方文档</a><br><a href="http://jspang.com/2017/09/16/webpack3-2/" rel="nofollow noreferrer" target="_blank">技术胖</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
Webpack 4x 之路 （ 一 ）

## 原文链接
[https://segmentfault.com/a/1190000014142975](https://segmentfault.com/a/1190000014142975)

