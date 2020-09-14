---
title: 'webpack从零开始第1课:安装webpack和webpack-dev-server' 
date: 2018-12-21 2:30:11
hidden: true
slug: 4xlzsndsauo
categories: [reprint]
---

{{< raw >}}

                    
<p><strong>webpack目录</strong></p>
<ul>
<li><a href="https://segmentfault.com/a/1190000012536871"><strong>第1课:  安装webpack和webpack-dev-server</strong> </a></li>
<li><a href="https://segmentfault.com/a/1190000012536917" target="_blank">第2课:  配置文件 </a></li>
<li><a href="https://segmentfault.com/a/1190000012560205">第3课:  做为node的一个模块来使用</a></li>
<li><a href="https://segmentfault.com/a/1190000012541460" target="_blank">第4课:  插件篇</a></li>
<li><a href="https://segmentfault.com/a/1190000012552628">第5课:  模块篇</a></li>
<li><a href="https://segmentfault.com/a/1190000012560228" target="_blank">第6课:  在Vue开发中使用webpack</a></li>
</ul>
<hr>
<p><strong>本文参考文档</strong></p>
<ul>
<li>webpack官方安装文档 <a href="https://webpack.js.org/guides/installation/" rel="nofollow noreferrer" target="_blank">https://webpack.js.org/guides...</a> &nbsp;&nbsp;&nbsp; <a href="https://doc.webpack-china.org/guides/installation/" rel="nofollow noreferrer" target="_blank">中文翻译</a>
</li>
<li>webpack-dev-server官方安装文档: <a href="https://webpack.js.org/guides/development/#using-webpack-dev-server" rel="nofollow noreferrer" target="_blank">https://webpack.js.org/guides...</a>
</li>
<li>package.json官方详解: <a href="https://docs.npmjs.com/files/package.json" rel="nofollow noreferrer" target="_blank">https://docs.npmjs.com/files/...</a>
</li>
<li>webpack命令行各参数的用法: <a href="https://webpack.js.org/api/cli/" rel="nofollow noreferrer" target="_blank">https://webpack.js.org/api/cli/</a> &nbsp;&nbsp;&nbsp;<a href="https://doc.webpack-china.org/api/cli/" rel="nofollow noreferrer" target="_blank">中文翻译</a>
</li>
<li>webpack-dev-server的配置 <a href="https://webpack.js.org/configuration/dev-server/" rel="nofollow noreferrer" target="_blank">https://webpack.js.org/config...</a> &nbsp;&nbsp;&nbsp;<a href="https://doc.webpack-china.org/configuration/dev-server/" rel="nofollow noreferrer" target="_blank">中文翻译</a>
</li>
<li>
<a href="https://webpack.js.org/plugins/" rel="nofollow noreferrer" target="_blank">官方插件列表</a>  &nbsp;&nbsp;&nbsp;<a href="https://doc.webpack-china.org/plugins/" rel="nofollow noreferrer" target="_blank">插件中文翻译</a>&nbsp;&nbsp;&nbsp;<a href="https://github.com/jantimon/html-webpack-plugin" rel="nofollow noreferrer" target="_blank">html-webpack-plugin插件托管地址和用法</a>&nbsp;&nbsp;&nbsp;<a href="https://github.com/webpack-contrib/html-loader" rel="nofollow noreferrer" target="_blank">html-loader托管地址和用法</a>&nbsp;&nbsp;&nbsp;<a href="https://github.com/webpack-contrib/file-loader" rel="nofollow noreferrer" target="_blank">file-loader托管地址和用法</a>
</li>
<li>
<a href="http://webpack.github.io/" rel="nofollow noreferrer" target="_blank">官方网站1</a> &nbsp;&nbsp;&nbsp;&nbsp;<a href="https://webpack.js.org/" rel="nofollow noreferrer" target="_blank">官方网站2</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://webpack.js.org/concepts/" rel="nofollow noreferrer" target="_blank">官方文档</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://webpack.js.org/guides/getting-started/" rel="nofollow noreferrer" target="_blank">官方教程</a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://doc.webpack-china.org/concepts/" rel="nofollow noreferrer" target="_blank">中文版本文档</a>
</li>
</ul>
<hr>
<p><strong>前提条件</strong></p>
<ul>
<li>电脑装了一个全新的nodejs，最好是LTS版本,旧的nodejs版本可能没使用webpack的新功能，也可能会丢失一些依赖的包</li>
<li>先安装好淘宝的cnpm，淘宝镜像方便些</li>
<li>我的安装环境是win10</li>
</ul>
<h1 id="articleHeader0">一：安装webpack和webpack-dev-server</h1>
<h3 id="articleHeader1">1.准备工作</h3>
<ul>
<li>新建项目文件夹<code>D:\03www2018\study\webpack2017</code> 下面简写为 <code>根目录</code>
</li>
<li>新建npm配置文件package.josn,<code>根目录&gt;cnpm init</code>
</li>
</ul>
<h3 id="articleHeader2">2.项目局部安装webpack和webpack-dev-server</h3>
<ul>
<li>不建议全局安装webpack和webpack-dev-server</li>
<li>局部安装webpack <code>根目录&gt;cnpm i webpack -D</code>
</li>
<li>局部安装server <code>根目录&gt;cnpm i  webpack-dev-server -D</code>
</li>
<li>会自动生成node_modules文件夹,下有804个文件夹(485+319server)个文件夹，这些包都是webpack的依赖</li>
<li>package.json中增加了刚安装的包webpack的配置</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;devDependencies&quot;: {
  &quot;webpack&quot;: &quot;^3.10.0&quot;,
  &quot;webpack-dev-server&quot;: &quot;^2.9.7&quot;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xquery"><code><span class="hljs-string">"devDependencies"</span>: {
  <span class="hljs-string">"webpack"</span>: <span class="hljs-string">"^3.10.0"</span>,
  <span class="hljs-string">"webpack-dev-server"</span>: <span class="hljs-string">"^2.9.7"</span>
}</code></pre>
<blockquote>说明1: devDependencies是开发依赖，只会在打包过程中用到，不会包含到最后的代码中<br>说明2: 如果想安装指定版本的webpack，使用npm install --save-dev webpack@&lt;版本号&gt;格式</blockquote>
<h3 id="articleHeader3">3.熟悉webpack命令行各参数的意思</h3>
<ul>
<li>有关命令行各参数的用法，<code>根目录&gt;"node_modules/.bin/webpack" -h</code>
</li>
<li>上面这个执行webpack很不方便，修改<code>根目录&gt;package.json</code>，在script加上两条</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  &quot;scripts&quot;: {
    &quot;a&quot; :&quot;webpack --config ./build/webpack.dev.conf.js&quot;,
    &quot;b&quot; :&quot;webpack-dev-server --config ./build/webpack.dev.conf.js&quot;,
    &quot;test&quot;: &quot;echo \&quot;Error: no test specified\&quot; &amp;&amp; exit 1&quot;
  }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code>  <span class="hljs-string">"scripts"</span>: {
    <span class="hljs-string">"a"</span> :<span class="hljs-string">"webpack --config ./build/webpack.dev.conf.js"</span>,
    <span class="hljs-string">"b"</span> :<span class="hljs-string">"webpack-dev-server --config ./build/webpack.dev.conf.js"</span>,
    <span class="hljs-string">"test"</span>: <span class="hljs-string">"echo \"</span><span class="hljs-keyword">Error</span>: <span class="hljs-keyword">no</span> <span class="hljs-keyword">test</span> specified\<span class="hljs-string">" &amp;&amp; exit 1"</span>
  },</code></pre>
<ul><li>命令行的选项其实都可以写在配置文件webpack.config.js中，写在配置文件中更方便更强大。webpack启动时要读取配置文件，参数--config指定读取哪个配置文件，如果没有使用--config指定，会默认在<code>根目录</code>中找<code>webpack.config.js</code>或<code>webpackfile.js</code>这个文件,有关配置文件的命名随意定，但最好带上环境，如<code>webpack.base|dev|prod.conf.js</code>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="01: 配置选项 Config options:
  --config       配置文件路径，字符串格式，默认是`根目录`下的 webpack.config.js 或 webpackfile.js，
  --config-name  使用配置的名字，字符串
  --env          当配置文件输出的是一个函数时，要指定，在下一节课中会介绍

02: 基本选项 Basic options:
  --context    入口文件根目录，默认为当前目录
  --entry      入口文件,这里只能是字符串，但在配置文件中还可以定义数组或对象
  --watch, -w  监视是否有文件有改动，会自动打包，默认为false
  --debug      Switch loaders to debug mode                            [boolean]
  --devtool    Enable devtool for better debugging experience (Example:
               --devtool eval-cheap-module-source-map)                  [string]
  -d           shortcut for --debug --devtool eval-cheap-module-source-map
               --output-pathinfo                                       [boolean]
  -p           shortcut for --optimize-minimize --define
               process.env.NODE_ENV=&quot;production&quot;                       [boolean]
  --progress   Print compilation progress in percentage                [boolean]

03: 模块选项 Module options:
  --module-bind       Bind an extension to a loader                     [string]
  --module-bind-post                                                    [string]
  --module-bind-pre                                                     [string]

04: 输出选项 Output options:
  --output-path                 The output path for compilation assets
                                       [string] [default: The current directory]
  --output-filename             The output filename of the bundle
                                                   [string] [default: [name].js]
  --output-chunk-filename       The output filename for additional chunks
       [string] [default: filename with [id] instead of [name] or [id] prefixed]
  --output-source-map-filename  The output filename for the SourceMap   [string]
  --output-public-path          The public path for the assets          [string]
  --output-jsonp-function       The name of the jsonp function used for chunk
                                loading                                 [string]
  --output-pathinfo             Include a comment with the request for every
                                dependency (require, import, etc.)     [boolean]
  --output-library              Expose the exports of the entry point as library
                                                                        [string]
  --output-library-target       The type for exposing the exports of the entry
                                point as library                        [string]

05: 高级选项 Advanced options:
  --records-input-path       Path to the records file (reading)         [string]
  --records-output-path      Path to the records file (writing)         [string]
  --records-path             Path to the records file                   [string]
  --define                   Define any free var in the bundle          [string]
  --target                   The targeted execution environment         [string]
  --cache                    Enable in memory caching
                      [boolean] [default: It's enabled by default when watching]
  --watch-stdin, --stdin     Exit the process when stdin is closed     [boolean]
  --watch-aggregate-timeout  Timeout for gathering changes while watching
  --watch-poll               The polling interval for watching (also enable
                             polling)                                   [string]
  --hot                      Enables Hot Module Replacement            [boolean]
  --prefetch                 Prefetch this request (Example: --prefetch
                             ./file.js)                                 [string]
  --provide                  Provide these modules as free vars in all modules
                             (Example: --provide jQuery=jquery)         [string]
  --labeled-modules          Enables labeled modules                   [boolean]
  --plugin                   Load this plugin                           [string]
  --bail                     Abort the compilation on first error
                                                       [boolean] [default: null]
  --profile                  Profile the compilation and include information in
                             stats                     [boolean] [default: null]

06: 解析选项 Resolving options:
  --resolve-alias         Setup a module alias for resolving (Example:
                          jquery-plugin=jquery.plugin)                  [string]
  --resolve-extensions    Setup extensions that should be used to resolve
                          modules (Example: --resolve-extensions .es6,.js)
                                                                         [array]
  --resolve-loader-alias  Setup a loader alias for resolving            [string]

07: 优化选项 Optimizing options:
  --optimize-max-chunks      Try to keep the chunk count below a limit
  --optimize-min-chunk-size  Try to keep the chunk size above a limit
  --optimize-minimize        Minimize javascript and switches loaders to
                             minimizing                                [boolean]

08: 统计选项 Stats options:
  --color, --colors               Enables/Disables colors on the console
                                           [boolean] [default: (supports-color)]
  --sort-modules-by               Sorts the modules list by property in module
                                                                        [string]
  --sort-chunks-by                Sorts the chunks list by property in chunk
                                                                        [string]
  --sort-assets-by                Sorts the assets list by property in asset
                                                                        [string]
  --hide-modules                  Hides info about modules             [boolean]
  --display-exclude               Exclude modules in the output         [string]
  --display-modules               Display even excluded modules in the output
                                                                       [boolean]
  --display-max-modules           Sets the maximum number of visible modules in
                                  output                                [number]
  --display-chunks                Display chunks in the output         [boolean]
  --display-entrypoints           Display entry points in the output   [boolean]
  --display-origins               Display origins of chunks in the output
                                                                       [boolean]
  --display-cached                Display also cached modules in the output
                                                                       [boolean]
  --display-cached-assets         Display also cached assets in the output
                                                                       [boolean]
  --display-reasons               Display reasons about module inclusion in the
                                  output                               [boolean]
  --display-depth                 Display distance from entry point for each
                                  module                               [boolean]
  --display-used-exports          Display information about used exports in
                                  modules (Tree Shaking)               [boolean]
  --display-provided-exports      Display information about exports provided
                                  from modules                         [boolean]
  --display-optimization-bailout  Display information about why optimization
                                  bailed out for modules               [boolean]
  --display-error-details         Display details about errors         [boolean]
  --display                       Select display preset (verbose, detailed,
                                  normal, minimal, errors-only, none)   [string]
  --verbose                       Show more details                    [boolean]

09: 选项 Options:
  --help, -h     显示帮助信息                                            
  --version, -v  版本号                                  
  --json, -j     将结果以JSON格式显示 " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>01: 配置选项 Config options:
  -<span class="ruby">-config       配置文件路径，字符串格式，默认是<span class="hljs-string">`根目录`</span>下的 webpack.config.js 或 webpackfile.js，
</span>  -<span class="ruby">-config-name  使用配置的名字，字符串
</span>  -<span class="ruby">-env          当配置文件输出的是一个函数时，要指定，在下一节课中会介绍
</span>
02: 基本选项 Basic options:
  -<span class="ruby">-context    入口文件根目录，默认为当前目录
</span>  -<span class="ruby">-entry      入口文件,这里只能是字符串，但在配置文件中还可以定义数组或对象
</span>  -<span class="ruby">-watch, -w  监视是否有文件有改动，会自动打包，默认为<span class="hljs-literal">false</span>
</span>  -<span class="ruby">-debug      Switch loaders to debug mode                            [boolean]
</span>  -<span class="ruby">-devtool    Enable devtool <span class="hljs-keyword">for</span> better debugging experience (<span class="hljs-symbol">Example:</span>
</span>               -<span class="ruby">-devtool eval-cheap-<span class="hljs-class"><span class="hljs-keyword">module</span>-<span class="hljs-title">source</span>-<span class="hljs-title">map</span>)                  [<span class="hljs-title">string</span>]</span>
</span>  -<span class="ruby">d           shortcut <span class="hljs-keyword">for</span> --debug --devtool eval-cheap-<span class="hljs-class"><span class="hljs-keyword">module</span>-<span class="hljs-title">source</span>-<span class="hljs-title">map</span></span>
</span>               -<span class="ruby">-output-pathinfo                                       [boolean]
</span>  -<span class="ruby">p           shortcut <span class="hljs-keyword">for</span> --optimize-minimize --define
</span>               process.env.NODE_ENV="production"                       [boolean]
  -<span class="ruby">-progress   Print compilation progress <span class="hljs-keyword">in</span> percentage                [boolean]
</span>
03: 模块选项 Module options:
  -<span class="ruby">-<span class="hljs-class"><span class="hljs-keyword">module</span>-<span class="hljs-title">bind</span>       <span class="hljs-title">Bind</span> <span class="hljs-title">an</span> <span class="hljs-title">extension</span> <span class="hljs-title">to</span> <span class="hljs-title">a</span> <span class="hljs-title">loader</span>                     [<span class="hljs-title">string</span>]</span>
</span>  -<span class="ruby">-<span class="hljs-class"><span class="hljs-keyword">module</span>-<span class="hljs-title">bind</span>-<span class="hljs-title">post</span>                                                    [<span class="hljs-title">string</span>]</span>
</span>  -<span class="ruby">-<span class="hljs-class"><span class="hljs-keyword">module</span>-<span class="hljs-title">bind</span>-<span class="hljs-title">pre</span>                                                     [<span class="hljs-title">string</span>]</span>
</span>
04: 输出选项 Output options:
  -<span class="ruby">-output-path                 The output path <span class="hljs-keyword">for</span> compilation assets
</span>                                       [string] [default: The current directory]
  -<span class="ruby">-output-filename             The output filename of the bundle
</span>                                                   [string] [default: [name].js]
  -<span class="ruby">-output-chunk-filename       The output filename <span class="hljs-keyword">for</span> additional chunks
</span>       [string] [default: filename with [id] instead of [name] or [id] prefixed]
  -<span class="ruby">-output-source-map-filename  The output filename <span class="hljs-keyword">for</span> the SourceMap   [string]
</span>  -<span class="ruby">-output-public-path          The public path <span class="hljs-keyword">for</span> the assets          [string]
</span>  -<span class="ruby">-output-jsonp-function       The name of the jsonp function used <span class="hljs-keyword">for</span> chunk
</span>                                loading                                 [string]
  -<span class="ruby">-output-pathinfo             Include a comment with the request <span class="hljs-keyword">for</span> every
</span>                                dependency (require, import, etc.)     [boolean]
  -<span class="ruby">-output-library              Expose the exports of the entry point as library
</span>                                                                        [string]
  -<span class="ruby">-output-library-target       The type <span class="hljs-keyword">for</span> exposing the exports of the entry
</span>                                point as library                        [string]

05: 高级选项 Advanced options:
  -<span class="ruby">-records-input-path       Path to the records file (reading)         [string]
</span>  -<span class="ruby">-records-output-path      Path to the records file (writing)         [string]
</span>  -<span class="ruby">-records-path             Path to the records file                   [string]
</span>  -<span class="ruby">-define                   Define any free var <span class="hljs-keyword">in</span> the bundle          [string]
</span>  -<span class="ruby">-target                   The targeted execution environment         [string]
</span>  -<span class="ruby">-cache                    Enable <span class="hljs-keyword">in</span> memory caching
</span>                      [boolean] [default: It's enabled by default when watching]
  -<span class="ruby">-watch-stdin, --stdin     Exit the process <span class="hljs-keyword">when</span> stdin is closed     [boolean]
</span>  -<span class="ruby">-watch-aggregate-timeout  Timeout <span class="hljs-keyword">for</span> gathering changes <span class="hljs-keyword">while</span> watching
</span>  -<span class="ruby">-watch-poll               The polling interval <span class="hljs-keyword">for</span> watching (also enable
</span>                             polling)                                   [string]
  -<span class="ruby">-hot                      Enables Hot Module Replacement            [boolean]
</span>  -<span class="ruby">-prefetch                 Prefetch this request (<span class="hljs-symbol">Example:</span> --prefetch
</span>                             ./file.js)                                 [string]
  -<span class="ruby">-provide                  Provide these modules as free vars <span class="hljs-keyword">in</span> all modules
</span>                             (Example: --provide jQuery=jquery)         [string]
  -<span class="ruby">-labeled-modules          Enables labeled modules                   [boolean]
</span>  -<span class="ruby">-plugin                   Load this plugin                           [string]
</span>  -<span class="ruby">-bail                     Abort the compilation on first error
</span>                                                       [boolean] [default: null]
  -<span class="ruby">-profile                  Profile the compilation <span class="hljs-keyword">and</span> <span class="hljs-keyword">include</span> information <span class="hljs-keyword">in</span>
</span>                             stats                     [boolean] [default: null]

06: 解析选项 Resolving options:
  -<span class="ruby">-resolve-<span class="hljs-keyword">alias</span>         Setup a <span class="hljs-class"><span class="hljs-keyword">module</span> <span class="hljs-title">alias</span> <span class="hljs-title">for</span> <span class="hljs-title">resolving</span> (<span class="hljs-title">Example</span>:</span>
</span>                          jquery-plugin=jquery.plugin)                  [string]
  -<span class="ruby">-resolve-extensions    Setup extensions that should be used to resolve
</span>                          modules (Example: --resolve-extensions .es6,.js)
                                                                         [array]
  -<span class="ruby">-resolve-loader-<span class="hljs-keyword">alias</span>  Setup a loader <span class="hljs-keyword">alias</span> <span class="hljs-keyword">for</span> resolving            [string]
</span>
07: 优化选项 Optimizing options:
  -<span class="ruby">-optimize-max-chunks      Try to keep the chunk count below a limit
</span>  -<span class="ruby">-optimize-min-chunk-size  Try to keep the chunk size above a limit
</span>  -<span class="ruby">-optimize-minimize        Minimize javascript <span class="hljs-keyword">and</span> switches loaders to
</span>                             minimizing                                [boolean]

08: 统计选项 Stats options:
  -<span class="ruby">-color, --colors               Enables/Disables colors on the console
</span>                                           [boolean] [default: (supports-color)]
  -<span class="ruby">-sort-modules-by               Sorts the modules list by property <span class="hljs-keyword">in</span> <span class="hljs-class"><span class="hljs-keyword">module</span></span>
</span>                                                                        [string]
  -<span class="ruby">-sort-chunks-by                Sorts the chunks list by property <span class="hljs-keyword">in</span> chunk
</span>                                                                        [string]
  -<span class="ruby">-sort-assets-by                Sorts the assets list by property <span class="hljs-keyword">in</span> asset
</span>                                                                        [string]
  -<span class="ruby">-hide-modules                  Hides info about modules             [boolean]
</span>  -<span class="ruby">-display-exclude               Exclude modules <span class="hljs-keyword">in</span> the output         [string]
</span>  -<span class="ruby">-display-modules               Display even excluded modules <span class="hljs-keyword">in</span> the output
</span>                                                                       [boolean]
  -<span class="ruby">-display-max-modules           Sets the maximum number of visible modules <span class="hljs-keyword">in</span>
</span>                                  output                                [number]
  -<span class="ruby">-display-chunks                Display chunks <span class="hljs-keyword">in</span> the output         [boolean]
</span>  -<span class="ruby">-display-entrypoints           Display entry points <span class="hljs-keyword">in</span> the output   [boolean]
</span>  -<span class="ruby">-display-origins               Display origins of chunks <span class="hljs-keyword">in</span> the output
</span>                                                                       [boolean]
  -<span class="ruby">-display-cached                Display also cached modules <span class="hljs-keyword">in</span> the output
</span>                                                                       [boolean]
  -<span class="ruby">-display-cached-assets         Display also cached assets <span class="hljs-keyword">in</span> the output
</span>                                                                       [boolean]
  -<span class="ruby">-display-reasons               Display reasons about <span class="hljs-class"><span class="hljs-keyword">module</span> <span class="hljs-title">inclusion</span> <span class="hljs-title">in</span> <span class="hljs-title">the</span></span>
</span>                                  output                               [boolean]
  -<span class="ruby">-display-depth                 Display distance from entry point <span class="hljs-keyword">for</span> each
</span>                                  module                               [boolean]
  -<span class="ruby">-display-used-exports          Display information about used exports <span class="hljs-keyword">in</span>
</span>                                  modules (Tree Shaking)               [boolean]
  -<span class="ruby">-display-provided-exports      Display information about exports provided
</span>                                  from modules                         [boolean]
  -<span class="ruby">-display-optimization-bailout  Display information about why optimization
</span>                                  bailed out for modules               [boolean]
  -<span class="ruby">-display-error-details         Display details about errors         [boolean]
</span>  -<span class="ruby">-display                       Select display preset (verbose, detailed,
</span>                                  normal, minimal, errors-only, none)   [string]
  -<span class="ruby">-verbose                       Show more details                    [boolean]
</span>
09: 选项 Options:
  -<span class="ruby">-help, -h     显示帮助信息                                            
</span>  -<span class="ruby">-version, -v  版本号                                  
</span>  -<span class="ruby">-json, -j     将结果以JSON格式显示 </span></code></pre>
<h3 id="articleHeader4">4.准备项目文件夹及文件</h3>
<p>为了更好地演示和学习webpack，请建好下列文件夹和文件</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="项目根目录
│   package.json
├───node_modules
│       └╌╌ 下面是npm包
├───dist
│     └╌╌╌╌╌logo.jpg 
├───build
│   ├╌╌╌╌╌ build.js
│   ├╌╌╌╌╌ webpack.base.conf.js
│   ├╌╌╌╌╌ webpack.dev.conf.js
│   └╌╌╌╌╌ webpack.prod.conf.js
├───src
│   ├╌╌╌╌╌ main.js
│   └╌╌╌╌╌tmp
│         ├╌╌╌╌╌home.js
│         ├╌╌╌╌╌about.js
│         └╌╌╌╌╌contact.js
│   └╌╌╌╌╌template
│         └╌╌╌╌╌daqi.html // 为hmtl插件的模板
│   └╌╌╌╌╌images
│         └╌╌╌╌╌logo.jpg  " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>项目根目录
│   package<span class="hljs-selector-class">.json</span>
├───node_modules
│       └╌╌ 下面是npm包
├───dist
│     └╌╌╌╌╌logo<span class="hljs-selector-class">.jpg</span> 
├───build
│   ├╌╌╌╌╌ build<span class="hljs-selector-class">.js</span>
│   ├╌╌╌╌╌ webpack<span class="hljs-selector-class">.base</span><span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span>
│   ├╌╌╌╌╌ webpack<span class="hljs-selector-class">.dev</span><span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span>
│   └╌╌╌╌╌ webpack<span class="hljs-selector-class">.prod</span><span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span>
├───src
│   ├╌╌╌╌╌ main<span class="hljs-selector-class">.js</span>
│   └╌╌╌╌╌tmp
│         ├╌╌╌╌╌home<span class="hljs-selector-class">.js</span>
│         ├╌╌╌╌╌about<span class="hljs-selector-class">.js</span>
│         └╌╌╌╌╌contact<span class="hljs-selector-class">.js</span>
│   └╌╌╌╌╌template
│         └╌╌╌╌╌daqi<span class="hljs-selector-class">.html</span> <span class="hljs-comment">// 为hmtl插件的模板</span>
│   └╌╌╌╌╌images
│         └╌╌╌╌╌logo<span class="hljs-selector-class">.jpg</span>  </code></pre>
<p>先只需写这几个文件，后面会陆续补充</p>
<h1 id="articleHeader5">二：打包</h1>
<h2 id="articleHeader6">准备配置文件</h2>
<ul><li>
<code>根目录/build/webpack.dev.conf.js</code>的内容如下，这是史上最简单的配置文件了</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module.exports = {
    entry: './src/main', //main.js中的.js可以省略，前面的./不能省
    output:{
        filename:'./dist/app.js' // dist文件夹不存在时，会自动创建
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs java"><code><span class="hljs-keyword">module</span>.<span class="hljs-keyword">exports</span> = {
    entry: <span class="hljs-string">'./src/main'</span>, <span class="hljs-comment">//main.js中的.js可以省略，前面的./不能省</span>
    output:{
        filename:<span class="hljs-string">'./dist/app.js'</span> <span class="hljs-comment">// dist文件夹不存在时，会自动创建</span>
    }
}</code></pre>
<ul><li>
<code>根目录/src/main.js</code>中随便写一句</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="console.log('hello,欢迎来到零和壹在线课堂')" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs autoit"><code style="word-break: break-word; white-space: initial;">console.<span class="hljs-built_in">log</span>(<span class="hljs-string">'hello,欢迎来到零和壹在线课堂'</span>)</code></pre>
<h2 id="articleHeader7">打包</h2>
<p><code>D:\03www2018\study\webpack2017&gt;npm run a</code>,显示如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="> webpack2017@1.0.0 a D:\03www2018\study\webpack2017
> webpack --config ./build/webpack.dev.conf.js

Hash: 94dc0f2301921649904c  // complication的hash值，它的长度和算法由output中相应的项决定
Version: webpack 3.10.0 // webpack的版本
Time: 55ms // 打包花费的时间
        Asset    Size  Chunks             Chunk Names
./dist/app.js  2.5 kB       0  [emitted]  main //单个文件和数组的chunk名字默认为main 
   [0] ./src/main.js 32 bytes {0} [built]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>&gt; webpack2017@<span class="hljs-number">1.0</span>.<span class="hljs-number">0</span> <span class="hljs-selector-tag">a</span> D:\<span class="hljs-number">03</span>www2018\study\webpack2017
&gt; webpack --config ./build/webpack<span class="hljs-selector-class">.dev</span><span class="hljs-selector-class">.conf</span><span class="hljs-selector-class">.js</span>

Hash: <span class="hljs-number">94</span>dc0f2301921649904c  <span class="hljs-comment">// complication的hash值，它的长度和算法由output中相应的项决定</span>
Version: webpack <span class="hljs-number">3.10</span>.<span class="hljs-number">0</span> <span class="hljs-comment">// webpack的版本</span>
Time: <span class="hljs-number">55ms</span> <span class="hljs-comment">// 打包花费的时间</span>
        Asset    Size  Chunks             Chunk Names
./dist/app<span class="hljs-selector-class">.js</span>  <span class="hljs-number">2.5</span> kB       <span class="hljs-number">0</span>  [emitted]  main <span class="hljs-comment">//单个文件和数组的chunk名字默认为main </span>
   [<span class="hljs-number">0</span>] ./src/main<span class="hljs-selector-class">.js</span> <span class="hljs-number">32</span> bytes {<span class="hljs-number">0</span>} [built]</code></pre>
<p>打开打包后的文件看下,整体是一个自执行文件，每个文件是一个模块做为自执行函数的参数</p>
<h1 id="articleHeader8">三：开启服务器</h1>
<p>先启动看下，<code>根目录&gt;npm run b</code><br>从启动的信息中可以看到，它包含了上面的打包，项目的网址是<code>http://localhost:8080/</code>，可以在浏览器中打开看下效果，但由于没有指定入口文件，所以会显示当前目录的内容,有一点必须明白，服务器打包的后的文件并没有物理存在电脑上，只是在<strong>内存</strong>中，为了方便教程的讲解，在这里先讲下服务器的配置，有关全部配置的讲解，请参考下<a href="https://segmentfault.com/a/1190000012536917">一篇文章:配置文件详解</a></p>
<h2 id="articleHeader9">3.1 使用HtmlWebpackPlugin插件生成首页</h2>
<p>首页一般为一个html文件，我们到现在还没有定义，为了方便，顺便提前了解一下webpack的插件功能，我这里使用HtmlWebpackPlugin来生成首页，插件的使用基本相同，分以下几步</p>
<ul>
<li>第一步安装 <code>根目录&gt;cnpm i -D html-webpack-plugin</code>
</li>
<li>修改配置文件 <code>根目录/build/webpack.dev.conf.js</code>
</li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin'); //第二步导入
module.exports = {
    entry: './src/main', //main.js中的js可以省略，前面的./不能省
    output:{
        filename:'./dist/[hash]app.js',
        hashDigestLength: 8 // 默认长度是20
    },
    plugins: [new HtmlWebpackPlugin], //第三步，实例化后放在plugins这个数组中就行
    devServer: {
      contentBase: path.join(__dirname, &quot;../dist&quot;), //网站的根目录为 根目录/dist，如果配置不对，会报Cannot GET /错误
      port: 9000, //端口改为9000
      open:true // 自动打开浏览器，适合懒人
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>); <span class="hljs-comment">//第二步导入</span>
<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>: <span class="hljs-string">'./src/main'</span>, <span class="hljs-comment">//main.js中的js可以省略，前面的./不能省</span>
    output:{
        <span class="hljs-attr">filename</span>:<span class="hljs-string">'./dist/[hash]app.js'</span>,
        <span class="hljs-attr">hashDigestLength</span>: <span class="hljs-number">8</span> <span class="hljs-comment">// 默认长度是20</span>
    },
    <span class="hljs-attr">plugins</span>: [<span class="hljs-keyword">new</span> HtmlWebpackPlugin], <span class="hljs-comment">//第三步，实例化后放在plugins这个数组中就行</span>
    devServer: {
      <span class="hljs-attr">contentBase</span>: path.join(__dirname, <span class="hljs-string">"../dist"</span>), <span class="hljs-comment">//网站的根目录为 根目录/dist，如果配置不对，会报Cannot GET /错误</span>
      port: <span class="hljs-number">9000</span>, <span class="hljs-comment">//端口改为9000</span>
      open:<span class="hljs-literal">true</span> <span class="hljs-comment">// 自动打开浏览器，适合懒人</span>
    }
}</code></pre>
<p>生成的html文件只在内存中，并没有存在物理磁盘上，来看一下生成的内容,留心下生成的js文件中的hash值，它的长度是8位，就是上面hashDigestLength: 8定义的</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="<!DOCTYPE html>
<html>
  <head>
    <meta charset=&quot;UTF-8&quot;>
    <title>Webpack App</title>
  </head>
  <body>
  <script type=&quot;text/javascript&quot; src=&quot;./dist/4e0c807aapp.js&quot;></script></body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code><span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Webpack App<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">"text/javascript"</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"./dist/4e0c807aapp.js"</span>&gt;</span><span class="undefined"></span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<p><strong>html-webpack-plugin的用途</strong></p>
<ul>
<li>对于打包的文件名中有hash的，这个插件是必选，因为每次源文件修改，打包后的名字就不一样</li>
<li>生成一个html5模板文件，可适用于lodash模板，也可以利用自己定义的加载器</li>
<li>
<strong>js注入</strong>，打包后的js文件会自动注入到html文件的body结尾部分(默认，也可以注入到head部分)</li>
<li>
<strong>css文件注入</strong>,假如你使用ExtractTextPlugin插件(这个插件也是必须要了解的)将css文件是单独剥离出来，不放在html中的style标签内，它会自动将css链接注入到link标签中</li>
</ul>
<p><strong>html-webpack-plugin插件完整配置</strong></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig={
    title: 'hello,零和壹在线课堂', // html5文件中<title>部分
    filename: 'front.html', // 默认是index.html，服务器中设置的首页是index.html，如果这里改成其它名字，那么devServer.index改为和它一样，最终完整文件路径是output.path+filename，如果filename中有子文件夹形式，如`./ab/cd/front.html`，只取`./front.html`
    template: './src/template/daqi.html', //如果觉得插件默认生成的hmtl5文件不合要求，可以指定一个模板，模板文件如果不存在，会报错，默认是在项目根目录下找模板文件，才模板为样板，将打包的js文件注入到body结尾处
    inject:head, // true|body|head|false，四种值，默认为true,true和body相同,是将js注入到body结束标签前,head将打包的js文件放在head结束前,false是不注入，这时得要手工在html中加js
}
module.exports = {
    entry: './src/main', //main.js中的js可以省略，前面的./不能省
    output:{
        filename:'./dist/[hash]app.js',
        hashDigestLength: 8
    },
    plugins: [new HtmlWebpackPlugin(HtmlWebpackPluginConfig)], //先不配置插件，看看效果
    devServer: {
      contentBase: path.join(__dirname, &quot;../dist&quot;), //网站的根目录为 根目录/dist
      port: 9000, //端口改为9000
      open:true, // 自动打开浏览器
      index:'front.html' // 与HtmlWebpackPlugin中配置filename一样
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>);
<span class="hljs-keyword">const</span> HtmlWebpackPluginConfig={
    <span class="hljs-attr">title</span>: <span class="hljs-string">'hello,零和壹在线课堂'</span>, <span class="hljs-comment">// html5文件中&lt;title&gt;部分</span>
    filename: <span class="hljs-string">'front.html'</span>, <span class="hljs-comment">// 默认是index.html，服务器中设置的首页是index.html，如果这里改成其它名字，那么devServer.index改为和它一样，最终完整文件路径是output.path+filename，如果filename中有子文件夹形式，如`./ab/cd/front.html`，只取`./front.html`</span>
    template: <span class="hljs-string">'./src/template/daqi.html'</span>, <span class="hljs-comment">//如果觉得插件默认生成的hmtl5文件不合要求，可以指定一个模板，模板文件如果不存在，会报错，默认是在项目根目录下找模板文件，才模板为样板，将打包的js文件注入到body结尾处</span>
    inject:head, <span class="hljs-comment">// true|body|head|false，四种值，默认为true,true和body相同,是将js注入到body结束标签前,head将打包的js文件放在head结束前,false是不注入，这时得要手工在html中加js</span>
}
<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>: <span class="hljs-string">'./src/main'</span>, <span class="hljs-comment">//main.js中的js可以省略，前面的./不能省</span>
    output:{
        <span class="hljs-attr">filename</span>:<span class="hljs-string">'./dist/[hash]app.js'</span>,
        <span class="hljs-attr">hashDigestLength</span>: <span class="hljs-number">8</span>
    },
    <span class="hljs-attr">plugins</span>: [<span class="hljs-keyword">new</span> HtmlWebpackPlugin(HtmlWebpackPluginConfig)], <span class="hljs-comment">//先不配置插件，看看效果</span>
    devServer: {
      <span class="hljs-attr">contentBase</span>: path.join(__dirname, <span class="hljs-string">"../dist"</span>), <span class="hljs-comment">//网站的根目录为 根目录/dist</span>
      port: <span class="hljs-number">9000</span>, <span class="hljs-comment">//端口改为9000</span>
      open:<span class="hljs-literal">true</span>, <span class="hljs-comment">// 自动打开浏览器</span>
      index:<span class="hljs-string">'front.html'</span> <span class="hljs-comment">// 与HtmlWebpackPlugin中配置filename一样</span>
    }
}</code></pre>
<h2 id="articleHeader10">3.2 devServer常用配置</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig={
    title: 'hello,零和壹在线课堂', // html5文件中<title>部分
    filename: 'front.html', // 默认是index.html，服务器中设置的首页是index.html，如果这里改成其它名字，那么devServer.index改为和它一样
    template: './src/template/daqi.html', // 如果觉得插件默认生成的hmtl5文件不合要求，可以指定一个模板，模板文件如果不存在，会报错，默认是在项目根目录下找模板文件，才模板为样板，将打包的js文件注入到body结尾处
    inject:'body', // true|body|head|false，四种值，默认为true,true和body相同,是将js注入到body结束标签前,head将打包的js文件放在head结束前,false是不注入，这时得要手工在html中加js
}
module.exports = {
    entry: './src/main', //main.js中的js可以省略，前面的./不能省
    output:{
        filename:'./dist/[hash]app.js',
        hashDigestLength: 8
    },
    plugins: [new HtmlWebpackPlugin(HtmlWebpackPluginConfig)], //先不配置插件，看看效果
    devServer: {
      contentBase: path.join(__dirname, &quot;../dist&quot;), //网站的根目录为 根目录/dist
      port: 9000, //端口改为9000
      host: '192.168.0.103', //如果指定的host，这样同局域网的电脑或手机可以访问该网站,host的值在dos下使用ipconfig获取 
      open:true, // 自动打开浏览器
      index:'front.html', // 与HtmlWebpackPlugin中配置filename一样
      inline:true, // 默认为true, 意思是，在打包时会注入一段代码到最后的js文件中，用来监视页面的改动而自动刷新页面,当为false时，网页自动刷新的模式是iframe，也就是将模板页放在一个frame中
      hot:false,
      compress:true //压缩
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs javascript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>);
<span class="hljs-keyword">const</span> HtmlWebpackPluginConfig={
    <span class="hljs-attr">title</span>: <span class="hljs-string">'hello,零和壹在线课堂'</span>, <span class="hljs-comment">// html5文件中&lt;title&gt;部分</span>
    filename: <span class="hljs-string">'front.html'</span>, <span class="hljs-comment">// 默认是index.html，服务器中设置的首页是index.html，如果这里改成其它名字，那么devServer.index改为和它一样</span>
    template: <span class="hljs-string">'./src/template/daqi.html'</span>, <span class="hljs-comment">// 如果觉得插件默认生成的hmtl5文件不合要求，可以指定一个模板，模板文件如果不存在，会报错，默认是在项目根目录下找模板文件，才模板为样板，将打包的js文件注入到body结尾处</span>
    inject:<span class="hljs-string">'body'</span>, <span class="hljs-comment">// true|body|head|false，四种值，默认为true,true和body相同,是将js注入到body结束标签前,head将打包的js文件放在head结束前,false是不注入，这时得要手工在html中加js</span>
}
<span class="hljs-built_in">module</span>.exports = {
    <span class="hljs-attr">entry</span>: <span class="hljs-string">'./src/main'</span>, <span class="hljs-comment">//main.js中的js可以省略，前面的./不能省</span>
    output:{
        <span class="hljs-attr">filename</span>:<span class="hljs-string">'./dist/[hash]app.js'</span>,
        <span class="hljs-attr">hashDigestLength</span>: <span class="hljs-number">8</span>
    },
    <span class="hljs-attr">plugins</span>: [<span class="hljs-keyword">new</span> HtmlWebpackPlugin(HtmlWebpackPluginConfig)], <span class="hljs-comment">//先不配置插件，看看效果</span>
    devServer: {
      <span class="hljs-attr">contentBase</span>: path.join(__dirname, <span class="hljs-string">"../dist"</span>), <span class="hljs-comment">//网站的根目录为 根目录/dist</span>
      port: <span class="hljs-number">9000</span>, <span class="hljs-comment">//端口改为9000</span>
      host: <span class="hljs-string">'192.168.0.103'</span>, <span class="hljs-comment">//如果指定的host，这样同局域网的电脑或手机可以访问该网站,host的值在dos下使用ipconfig获取 </span>
      open:<span class="hljs-literal">true</span>, <span class="hljs-comment">// 自动打开浏览器</span>
      index:<span class="hljs-string">'front.html'</span>, <span class="hljs-comment">// 与HtmlWebpackPlugin中配置filename一样</span>
      inline:<span class="hljs-literal">true</span>, <span class="hljs-comment">// 默认为true, 意思是，在打包时会注入一段代码到最后的js文件中，用来监视页面的改动而自动刷新页面,当为false时，网页自动刷新的模式是iframe，也就是将模板页放在一个frame中</span>
      hot:<span class="hljs-literal">false</span>,
      <span class="hljs-attr">compress</span>:<span class="hljs-literal">true</span> <span class="hljs-comment">//压缩</span>
    }
}</code></pre>
<p>结合服务器和html插件，最后生成的配置文件如下</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')
const HtmlWebpackPluginConfig={
    title: 'hello,零和壹在线课堂', // html5文件中<title>部分
    filename: 'front.html', // 默认是index.html，服务器中设置的首页是index.html，如果这里改成其它名字，那么devServer.index改为和它一样
    // 也是 context+template是最后模板的完整路径，./不能少
    template: './template/daqi.html', // 如果觉得插件默认生成的hmtl5文件不合要求，可以指定一个模板，模板文件如果不存在，会报错，默认是在项目根目录下找模板文件，才模板为样板，将打包的js文件注入到body结尾处
    inject:'body', // true|body|head|false，四种值，默认为true,true和body相同,是将js注入到body结束标签前,head将打包的js文件放在head结束前,false是不注入，这时得要手工在html中加js
}


module.exports = {
    context: path.resolve(__dirname,'../src'), //D:\03www2018\study\webpack2017\build\src
    entry: './main', //main.js中的js可以省略，前面的./不能省
    output:{
        path:path.resolve(__dirname,'../dist'),
        filename: './[hash]app.js',
        hashDigestLength: 8
    },
    module: {        
        rules: [       

            ]
      },
    plugins: [
        new HtmlWebpackPlugin(HtmlWebpackPluginConfig), // 生成首页html5文件，外部插件需要安装
        new webpack.DefinePlugin({BJ: JSON.stringify('北京'),}) // 内置插件，无须安装，可以理解为它是webpack实例的一个方法，该插件相当于apache等web服务器上定义一个常量
    ], 
    devServer: {
      contentBase: path.resolve(__dirname, &quot;../dist&quot;), //网站的根目录为 根目录/dist，这个路径一般与output.path一致，因为html插件生成的html5页是放在output.path这个目录下
      port: 9000, //端口改为9000
      open:true, // 自动打开浏览器，每次启动服务器会自动打开默认的浏览器
      index:'front.html', // 与HtmlWebpackPlugin中配置filename一样
      inline:true, // 默认为true, 意思是，在打包时会注入一段代码到最后的js文件中，用来监视页面的改动而自动刷新页面,当为false时，网页自动刷新的模式是iframe，也就是将模板页放在一个frame中
      hot:false,
      compress:true //压缩
    }
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs typescript"><code><span class="hljs-keyword">const</span> path = <span class="hljs-built_in">require</span>(<span class="hljs-string">'path'</span>)
<span class="hljs-keyword">const</span> HtmlWebpackPlugin = <span class="hljs-built_in">require</span>(<span class="hljs-string">'html-webpack-plugin'</span>);
<span class="hljs-keyword">const</span> webpack = <span class="hljs-built_in">require</span>(<span class="hljs-string">'webpack'</span>)
<span class="hljs-keyword">const</span> HtmlWebpackPluginConfig={
    title: <span class="hljs-string">'hello,零和壹在线课堂'</span>, <span class="hljs-comment">// html5文件中&lt;title&gt;部分</span>
    filename: <span class="hljs-string">'front.html'</span>, <span class="hljs-comment">// 默认是index.html，服务器中设置的首页是index.html，如果这里改成其它名字，那么devServer.index改为和它一样</span>
    <span class="hljs-comment">// 也是 context+template是最后模板的完整路径，./不能少</span>
    template: <span class="hljs-string">'./template/daqi.html'</span>, <span class="hljs-comment">// 如果觉得插件默认生成的hmtl5文件不合要求，可以指定一个模板，模板文件如果不存在，会报错，默认是在项目根目录下找模板文件，才模板为样板，将打包的js文件注入到body结尾处</span>
    inject:<span class="hljs-string">'body'</span>, <span class="hljs-comment">// true|body|head|false，四种值，默认为true,true和body相同,是将js注入到body结束标签前,head将打包的js文件放在head结束前,false是不注入，这时得要手工在html中加js</span>
}


<span class="hljs-built_in">module</span>.exports = {
    context: path.resolve(__dirname,<span class="hljs-string">'../src'</span>), <span class="hljs-comment">//D:\03www2018\study\webpack2017\build\src</span>
    entry: <span class="hljs-string">'./main'</span>, <span class="hljs-comment">//main.js中的js可以省略，前面的./不能省</span>
    output:{
        path:path.resolve(__dirname,<span class="hljs-string">'../dist'</span>),
        filename: <span class="hljs-string">'./[hash]app.js'</span>,
        hashDigestLength: <span class="hljs-number">8</span>
    },
    <span class="hljs-keyword">module</span>: {        
        rules: [       

            ]
      },
    plugins: [
        <span class="hljs-keyword">new</span> HtmlWebpackPlugin(HtmlWebpackPluginConfig), <span class="hljs-comment">// 生成首页html5文件，外部插件需要安装</span>
        <span class="hljs-keyword">new</span> webpack.DefinePlugin({BJ: <span class="hljs-built_in">JSON</span>.stringify(<span class="hljs-string">'北京'</span>),}) <span class="hljs-comment">// 内置插件，无须安装，可以理解为它是webpack实例的一个方法，该插件相当于apache等web服务器上定义一个常量</span>
    ], 
    devServer: {
      contentBase: path.resolve(__dirname, <span class="hljs-string">"../dist"</span>), <span class="hljs-comment">//网站的根目录为 根目录/dist，这个路径一般与output.path一致，因为html插件生成的html5页是放在output.path这个目录下</span>
      port: <span class="hljs-number">9000</span>, <span class="hljs-comment">//端口改为9000</span>
      open:<span class="hljs-literal">true</span>, <span class="hljs-comment">// 自动打开浏览器，每次启动服务器会自动打开默认的浏览器</span>
      index:<span class="hljs-string">'front.html'</span>, <span class="hljs-comment">// 与HtmlWebpackPlugin中配置filename一样</span>
      inline:<span class="hljs-literal">true</span>, <span class="hljs-comment">// 默认为true, 意思是，在打包时会注入一段代码到最后的js文件中，用来监视页面的改动而自动刷新页面,当为false时，网页自动刷新的模式是iframe，也就是将模板页放在一个frame中</span>
      hot:<span class="hljs-literal">false</span>,
      compress:<span class="hljs-literal">true</span> <span class="hljs-comment">//压缩</span>
    }
}</code></pre>
<h2 id="articleHeader11">3.3 给首页加一张图片</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// D:\03www2018\study\webpack2017\src\template\daqi.html
<!DOCTYPE html>
<html>
  <head>
    <meta charset=&quot;UTF-8&quot;>
    <title>大奇模板</title>
  </head>
  <body>
      <div style=&quot;background-color:#eee;font-size:16px;&quot;>欢迎来到零和壹在线课堂1234</div>
      <div id='hello'></div>
      <img src='/img/logo2.jpg' data-src='../images/logo.jpg' />  
  </body>
</html>" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs xml"><code>// D:\03www2018\study\webpack2017\src\template\daqi.html
<span class="hljs-meta">&lt;!DOCTYPE html&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">html</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">"UTF-8"</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>大奇模板<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">style</span>=<span class="hljs-string">"background-color:#eee;font-size:16px;"</span>&gt;</span>欢迎来到零和壹在线课堂1234<span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">'hello'</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">img</span> <span class="hljs-attr">src</span>=<span class="hljs-string">'/img/logo2.jpg'</span> <span class="hljs-attr">data-src</span>=<span class="hljs-string">'../images/logo.jpg'</span> /&gt;</span>  
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">html</span>&gt;</span></code></pre>
<ul>
<li>webpack，通过使用<code>file-loader</code>可以将图片当成一个模块，使用require来导入，进一步可以使用<code>url-loader</code>将图片转成base64-data</li>
<li>使用图片的场景大致分四种，html文件中使用src标签，样式的background中设定背景，js文件中元素.innerHTML='&lt;img src="logo.jpg" /&gt;'的方式，最后一种是在vue或react等框架中使用，今天要讲的是第一种，如何处理html文件src标签中的图片</li>
<li>html文件中图片的处理有两种，一种是象正常使用图片一样，不打包，但图片必须放在打包生成文件目录下，如<code>./dist/logo.jpg</code>，也就是最后的入口front.html文件可以读到的位置，在front.html中使用<code>&lt;img src='./logo.jpg'/&gt;</code>,表示logo.jpg与最后生成的front.html是同级目录。但实际工作中，往往图片放在与打包前的html模板文件一起的，需要将图片和html模板文件分别打包到./dist下，这使用<code>html-loader</code>是解决不了的，官网及网上大部分教程讲得不是特别清楚，在这里我详细讲下，这里就要用到file-loader，否则会报错<code>Error: Child compilation failed:  Module parse failed: Unexpected character '�' (1:0)You may need an appropriate loader to handle this file type.</code>
</li>
</ul>
<p>第1步：安装html-loader和file-loader,<code>根目录/cnpm i -D html-loader file-loader</code><br><strong>file-loader</strong>处理require('./logo.jpg')这种类型，将图片当成一个js模块<br><strong>html-loader</strong>是将html中src标签中配置有特定data属性的图片，转为由require的方式来导入。也就是说，它只是标识为哪些图片需要由require的方式导入，但具体require导入，得需要file-loader插件，<br>第2步：在webpack.conf.js中配置这两个加载器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="module: {
        rules: [
        {
            test: /\.html$/, 
            use: {
                loader: 'html-loader',
                options: {
                 attrs: [':data-src']
                }
            }
        },
     {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
                //name: '[path][name].[ext]',
                name: '[name]2.[ext]', //最后生成的文件名是 output.path+ outputPaht+ name，[name],[ext],[path]表示原来的文件名字，扩展名，路径
                //useRelativePath:true,
                outputPath: 'img/' // 后面的/不能少
            }  
          }
        ]
      },
        ]
      }," title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">module</span>: {
        <span class="hljs-attribute">rules</span>: [
        {
            test: /\.html$/, 
            use: {
                loader: <span class="hljs-string">'html-loader'</span>,
                options: {
                 attrs: [<span class="hljs-string">':data-src'</span>]
                }
            }
        },
     {
        <span class="hljs-attribute">test</span>: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: <span class="hljs-string">'file-loader'</span>,
            options: {
                //name: <span class="hljs-string">'[path][name].[ext]'</span>,
                name: <span class="hljs-string">'[name]2.[ext]'</span>, //最后生成的文件名是 output.path+ outputPaht+ name，[name],[ext],[path]表示原来的文件名字，扩展名，路径
                //useRelativePath:true,
                outputPath: <span class="hljs-string">'img/'</span> // 后面的/不能少
            }  
          }
        ]
      },
        ]
      },</code></pre>
<p>第3步：在html文件src标签中引用图片<br><code>&lt;img src='/img/logo2.jpg' data-src='../images/logo.jpg' /&gt; </code><br>这里注意，data-src是打包前图片位置，src是打包后图片的url</p>
<h1 id="articleHeader12">四: 手机或其它电脑访问该服务器</h1>
<p>实际开发中，需要手机或其它设备如ipad即时访问该服务器<br><strong>服务器</strong>: 就是开启webpack-dev-server这台电脑<br><strong>其它设备</strong>：下面以同一网络下的手机为例(同一wifi就行)<br>第一步：配置服务器</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="devServer: {
    contentBase: path.join(__dirname, &quot;../dist&quot;), //网站的根目录为 根目录/dist，如果配置不对，会报Cannot GET /错误
    port: 9000, 
    open: true,
    host: '192.168.0.103' //请在dos下，输入ipconfig可以找到当前电脑的ip
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs css"><code><span class="hljs-selector-tag">devServer</span>: {
    <span class="hljs-attribute">contentBase</span>: path.<span class="hljs-built_in">join</span>(__dirname, <span class="hljs-string">"../dist"</span>), //网站的根目录为 根目录/dist，如果配置不对，会报Cannot GET /错误
    port: <span class="hljs-number">9000</span>, 
    open: true,
    host: <span class="hljs-string">'192.168.0.103'</span> //请在dos下，输入ipconfig可以找到当前电脑的ip
}</code></pre>
<p>第二步：在手机上找一个合适的浏览器，输入 <code>192.168.0.103:9000</code>就可以访问<br>说明：有少数浏览器打开是空白网页，我使用uc浏览器ok，ip地址和端口与你自己的设置有关，我上面只是我的设置</p>
<hr>
<p>下一课: <a href="https://segmentfault.com/a/1190000012536917" target="_blank">webpack从零开始第2课: 配置文件</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
webpack从零开始第1课:安装webpack和webpack-dev-server

## 原文链接
[https://segmentfault.com/a/1190000012536871](https://segmentfault.com/a/1190000012536871)

