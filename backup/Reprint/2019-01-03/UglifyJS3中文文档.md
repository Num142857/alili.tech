---
title: 'UglifyJS3中文文档' 
date: 2019-01-03 2:30:10
hidden: true
slug: ukdcbcsjhmh
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">UglifyJS3中文文档</h2>
<p>译者：李平海</p>
<p>转载请注明原文链接(<a href="https://github.com/LiPinghai/UglifyJSDocCN/blob/master/README.md" rel="nofollow noreferrer" target="_blank">https://github.com/LiPinghai/...</a> )与作者信息。</p>
<h2 id="articleHeader1">译序</h2>
<p>此前翻译的<a href="https://github.com/LiPinghai/UglifyJSDocCN/tree/UglifyJs2" rel="nofollow noreferrer" target="_blank">UglifyJS2中文文档</a>发布没多久UglifyJS3就发布了，囧，现在把本文档也更新成UglifyJS3版本。</p>
<p>与UglifyJS2相比API变动较大，简化较多，文档也增加了不少示例。</p>
<p>由于webpack本身集成了UglifyJS插件（webpack.optimize.UglifyJsPlugin），其命令<code>webpack -p</code>即表示调用UglifyJS来压缩代码，还有不少webpack插件如<code>html-webpack-plugin</code>也会默认使用UglifyJS。因此我们其实经常要用到它，但UglifyJS本身配置较复杂/选项繁多，又没有中文文档，使用起来如坠云雾。鉴于此特翻译此文，谬误甚多，敬请斧正。</p>
<p>词典：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="parse       解释
compress    压缩
mangle      混淆
beautify    美化
minify      最小化
CLI         命令行工具
sourcemap   编译后代码对源码的映射，用于网页调试
AST         抽象语法树
name        名字，包括变量名、函数名、属性名
toplevel    顶层作用域
unreachable 不可达代码
option      选项/配置
STDIN       标准输入，指在命令行中直接输入
STDOUT      标准输出
STDERR      标准错误输出
side effects函数副作用，即函数除了返回外还产生别的作用，比如改了全局变量
shebang     释伴（#!）" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs julia"><code>parse       解释
compress    压缩
mangle      混淆
beautify    美化
minify      最小化
CLI         命令行工具
sourcemap   编译后代码对源码的映射，用于网页调试
AST         抽象语法树
name        名字，包括变量名、函数名、属性名
toplevel    顶层作用域
unreachable 不可达代码
option      选项/配置
<span class="hljs-literal">STDIN</span>       标准输入，指在命令行中直接输入
<span class="hljs-literal">STDOUT</span>      标准输出
<span class="hljs-literal">STDERR</span>      标准错误输出
side effects函数副作用，即函数除了返回外还产生别的作用，比如改了全局变量
shebang     释伴（<span class="hljs-comment">#!）</span></code></pre>
<p>以下为正文：</p>
<h1 id="articleHeader2">UglifyJS 3</h1>
<p>UglifyJS 是一个js 解释器、最小化器、压缩器、美化器工具集（parser, minifier, compressor or beautifier toolkit）。</p>
<h4>注意:</h4>
<ul>
<li><p><strong><code>uglify-js@3</code> 的<a>API</a> 和 <a>CLI</a>已简化，不再向后兼容 <a href="https://github.com/mishoo/UglifyJS2/tree/v2.x" rel="nofollow noreferrer" target="_blank"><code>uglify-js@2</code></a></strong>.</p></li>
<li><p><strong>UglifyJS <code>2.x</code> 文档在<a href="https://github.com/mishoo/UglifyJS2/tree/v2.x" rel="nofollow noreferrer" target="_blank">这里</a></strong>.</p></li>
<li><p><code>uglify-js</code> 只支持 ECMAScript 5 (ES5).</p></li>
<li><p>假如希望压缩 ES2015+ (ES6+)代码，应该使用 <a href="https://github.com/mishoo/UglifyJS2/tree/harmony" rel="nofollow noreferrer" target="_blank"><strong>uglify-es</strong></a>这个<code>npm</code> 包。</p></li>
</ul>
<h2 id="articleHeader3">安装</h2>
<p>首先确认一直你已经安装了最新的<a href="http://nodejs.org/" rel="nofollow noreferrer" target="_blank">node.js</a>(装完后或许需要重启一下电脑)</p>
<p>用NPM安装CLI：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install uglify-js -g" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install </span>uglify-<span class="hljs-keyword">js </span>-g</code></pre>
<p>用NPM下载给程序使用:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install uglify-js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs cmake"><code style="word-break: break-word; white-space: initial;">npm <span class="hljs-keyword">install</span> uglify-js</code></pre>
<h1 id="articleHeader4">CLI使用</h1>
<h1 id="articleHeader5">Command line usage</h1>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" uglifyjs [input files] [options]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code style="word-break: break-word; white-space: initial;"> uglifyjs [<span class="hljs-built_in">input</span> <span class="hljs-keyword">files</span>] [<span class="hljs-keyword">options</span>]</code></pre>
<p>UglifyJS可以输入多文件。建议你先写输入文件，再传选项。UglifyJS会根据压缩选项，把文件放在队列中依次解释。所有文件都会在同一个全局域中，假如一个文件中的变量、方法被另一文件引用，UglifyJS会合理地匹配。</p>
<p>假如没有指定文件，UglifyJS会读取输入字符串（STDIN）。</p>
<p>如果你想要把选项写在文件名的前面，那要在二者之前加上双横线，防止文件名被当成了选项：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" uglifyjs --compress --mangle -- input.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code style="word-break: break-word; white-space: initial;"> <span class="hljs-comment">uglifyjs</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">compress</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">mangle</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span> <span class="hljs-comment">input</span><span class="hljs-string">.</span><span class="hljs-comment">js</span></code></pre>
<h3 id="articleHeader6">CLI选项：</h3>
<h3 id="articleHeader7">Command line options</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  -h, --help                  列出使用指南。
                              `--help options` 获取可用选项的详情。
  -V, --version               打印版本号。
  -p, --parse <options>       指定解析器配置选项:
                              `acorn`  使用 Acorn 来解析。
                              `bare_returns`  允许在函数外return。
                                              在压缩CommonJS模块或`.user.js `引擎调用被同步执行函数包裹的用户脚本 时会用到。
                              `expression`  不是解析文件，二是解析一段表达式 (例如解析JSON).
                              `spidermonkey`  输入文件是 SpiderMonkey
                                              AST 格式 (JSON).
  -c, --compress [options]    启用压缩（true/false）/指定压缩配置:
                              `pure_funcs`  传一个函数名的列表，当这些函数返回值没被利用时，该函数会被安全移除。
  -m, --mangle [options]       启用混淆（true/false）/指定混淆配置:
                              `reserved`  不被混淆的名字列表。
  --mangle-props [options]    混淆属性/指定压缩配置:
                              `builtins`  混淆那些与标准JS全局变量重复的名字。
                              `debug`  添加debug前缀和后缀。
                              `domprops`  混淆那些鱼DOM属性名重复的名字。
                              `keep_quoted`  只混淆没括起来的属性名。
                              
                              `regex`  只混淆匹配（该正则）的名字。
                              `reserved`  不需要混淆的名字的列表（即保留）。
  -b, --beautify [options]    是否美化输出（true/false）/指定输出配置：
                              `beautify`  默认是启用.
                              `preamble`  预设的输出文件头部。你可以插入一段注释，比如版权信息。它不会被解析，但sourcemap会因此调整。
                              `quote_style`  括号类型:
                                              0 - auto自动
                                              1 - single单引号
                                              2 - double双引号
                                              3 - original跟随原码
                              `wrap_iife`  把立即执行函数括起来。注意：你或许应禁用压缩配置中的`negate_iife`选项。 

 -o, --output <file>         输出文件路径 (默认 STDOUT). 指定 `ast` 或
                                `spidermonkey`的话分别是输出UglifyJS或SpiderMonkey AST。
    --comments [filter]         保留版权注释。默认像Google Closure那样，保留包含&quot;@license&quot;或&quot;@preserve&quot;这样JSDoc风格的注释。你可以传以下的参数：
                                - &quot;all&quot; 保留全部注释
                                - 一个合适的正则，如 `/foo/` 或 `/^!/`，保留匹配到的注释。 
                                注意，在启用压缩时，因为死代码被移除或压缩声明为一行，并非*所有*的注释都会被保留。
    --config-file <file>        从此JSON文件读取 `minify()` 配置。
    -d, --define <expr>[=value] 定义全局变量。
    --ie8                       支持IE8。
                                等同于在`minify()`的`compress`、 `mangle` 和 `output`配置设置`ie8: true`。UglifyJS不会默认兼容IE8。
    --keep-fnames               不要混淆、干掉的函数的名字。当代码依赖Function.prototype.name时有用。
    --name-cache <file>         用来保存混淆map的文件。
    --self                      把UglifyJS本身也构建成一个依赖包
                                (等同于`--wrap UglifyJS`)
    --source-map [options]      启用 source map（true/false）/指定sourcemap配置:
                                `base` 根路径，用于计算输入文件的相对路径。
                                `content`  输入sourcemap。假如的你要编译的JS是另外的源码编译出来的。
                                假如该sourcemap包含在js内，请指定&quot;inline&quot;。 
                                `filename`  输出文件的名字或位置。
                                `includeSources`  如果你要在sourcemap中加上源文件的内容作sourcesContent属性，就传这个参数吧。
                                `root`  此路径中的源码编译后会产生sourcemap.
                                `url`   如果指定此值，会添加sourcemap相对路径在`//#sourceMappingURL`中。
    --timings                   在STDERR显示操作运行时间。
    --toplevel                  压缩/混淆在最高作用域中声明的变量名。
    --verbose                   打印诊断信息。
    --warn                      打印警告信息。
    --wrap <name>               把所有代码包裹在一个大函数中。让“exports”和“global”变量有效。
                                你需要传一个参数来指定此模块的名字，以便浏览器引用。         
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code>  -h, --help                  列出使用指南。
                              `--help options` 获取可用选项的详情。
  -V, --version               打印版本号。
  -p, --parse &lt;options&gt;       指定解析器配置选项:
                              `acorn`  使用 Acorn 来解析。
                              `bare_returns`  允许在函数外return。
                                              在压缩CommonJS模块或`.user.js `引擎调用被同步执行函数包裹的用户脚本 时会用到。
                              `expression`  不是解析文件，二是解析一段表达式 (例如解析JSON).
                              `spidermonkey`  输入文件是 SpiderMonkey
                                              AST 格式 (JSON).
  -c, --compress [options]    启用压缩（true/false）/指定压缩配置:
                              `pure_funcs`  传一个函数名的列表，当这些函数返回值没被利用时，该函数会被安全移除。
  -m, --mangle [options]       启用混淆（true/false）/指定混淆配置:
                              `reserved`  不被混淆的名字列表。
  --mangle-props [options]    混淆属性/指定压缩配置:
                              `builtins`  混淆那些与标准JS全局变量重复的名字。
                              `debug`  添加debug前缀和后缀。
                              `domprops`  混淆那些鱼DOM属性名重复的名字。
                              `keep_quoted`  只混淆没括起来的属性名。
                              
                              `regex`  只混淆匹配（该正则）的名字。
                              `reserved`  不需要混淆的名字的列表（即保留）。
  -b, --beautify [options]    是否美化输出（true/false）/指定输出配置：
                              `beautify`  默认是启用.
                              `preamble`  预设的输出文件头部。你可以插入一段注释，比如版权信息。它不会被解析，但sourcemap会因此调整。
                              `quote_style`  括号类型:
                                              <span class="hljs-number">0</span> - auto自动
                                              <span class="hljs-number">1</span> - single单引号
                                              <span class="hljs-number">2</span> - double双引号
                                              <span class="hljs-number">3</span> - original跟随原码
                              `wrap_iife`  把立即执行函数括起来。注意：你或许应禁用压缩配置中的`negate_iife`选项。 

 -o, --output &lt;file&gt;         输出文件路径 (默认 STDOUT). 指定 `ast` 或
                                `spidermonkey`的话分别是输出UglifyJS或SpiderMonkey AST。
    --comments [filter]         保留版权注释。默认像Google Closure那样，保留包含<span class="hljs-string">"@license"</span>或<span class="hljs-string">"@preserve"</span>这样JSDoc风格的注释。你可以传以下的参数：
                                - <span class="hljs-string">"all"</span> 保留全部注释
                                - 一个合适的正则，如 `/foo/` 或 `/^!/`，保留匹配到的注释。 
                                注意，在启用压缩时，因为死代码被移除或压缩声明为一行，并非*所有*的注释都会被保留。
    --config-file &lt;file&gt;        从此JSON文件读取 `minify()` 配置。
    -d, --define &lt;expr&gt;[=value] 定义全局变量。
    --ie8                       支持IE8。
                                等同于在`minify()`的`compress`、 `mangle` 和 `output`配置设置`ie8: true`。UglifyJS不会默认兼容IE8。
    --keep-fnames               不要混淆、干掉的函数的名字。当代码依赖Function.prototype.name时有用。
    --name-cache &lt;file&gt;         用来保存混淆map的文件。
    --self                      把UglifyJS本身也构建成一个依赖包
                                (等同于`--wrap UglifyJS`)
    --source-map [options]      启用 source map（true/false）/指定sourcemap配置:
                                `base` 根路径，用于计算输入文件的相对路径。
                                `content`  输入sourcemap。假如的你要编译的JS是另外的源码编译出来的。
                                假如该sourcemap包含在js内，请指定<span class="hljs-string">"inline"</span>。 
                                `filename`  输出文件的名字或位置。
                                `includeSources`  如果你要在sourcemap中加上源文件的内容作sourcesContent属性，就传这个参数吧。
                                `root`  此路径中的源码编译后会产生sourcemap.
                                `url`   如果指定此值，会添加sourcemap相对路径在`<span class="hljs-comment">//#sourceMappingURL`中。</span>
    --timings                   在STDERR显示操作运行时间。
    --toplevel                  压缩/混淆在最高作用域中声明的变量名。
    --verbose                   打印诊断信息。
    --warn                      打印警告信息。
    --wrap &lt;name&gt;               把所有代码包裹在一个大函数中。让“exports”和“global”变量有效。
                                你需要传一个参数来指定此模块的名字，以便浏览器引用。         
</code></pre>
<p>指定<code>--output</code> (<code>-o</code>)来明确输出文件，否则将在终端输出（STDOUT）</p>
<h2 id="articleHeader8">CLI sourcemap选项</h2>
<h2 id="articleHeader9">CLI source map options</h2>
<p>UglifyJS可以生成一份sourcemap文件，这非常有利于你调试压缩后的JS代码。传<code>--source-map --output output.js</code>来获取sorcemap文件（sorcemap会生成为<code>output.js.map</code>）。</p>
<p>额外选项：</p>
<ul>
<li><p><code>--source-map filename=&lt;NAME&gt;</code> 指定sourcemap名字。</p></li>
<li><p><code>--source-map root=&lt;URL&gt;</code> 传一个源文件的路径。否则UglifyJS将假定已经用了HTTP<code>X-SourceMap</code>，并将省略<code>//＃sourceMappingURL=</code>指示。</p></li>
<li><p><code>--source-map url=&lt;URL&gt;</code> 指定生成sourcemap的路径。</p></li>
</ul>
<p>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    uglifyjs js/file1.js js/file2.js \
             -o foo.min.js -c -m \
             --source-map root=&quot;http://foo.com/src&quot;,url=foo.min.js.map" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>    uglifyjs js/file1<span class="hljs-selector-class">.js</span> js/file2<span class="hljs-selector-class">.js</span> \
             -o foo<span class="hljs-selector-class">.min</span><span class="hljs-selector-class">.js</span> -c -m \
             --source-map root=<span class="hljs-string">"http://foo.com/src"</span>,url=foo<span class="hljs-selector-class">.min</span><span class="hljs-selector-class">.js</span><span class="hljs-selector-class">.map</span></code></pre>
<p>上述配置会压缩和混淆<code>file1.js</code>、<code>file2.js</code>，输出文件<code>foo.min.js</code> 和sourcemap<code>foo.min.js.map</code>，sourcemap会建立<code>http://foo.com/src/js/file1.js</code>、<br><code>http://foo.com/src/js/file2.js</code>的映射。（实际上，sourcemap根目录是<code>http://foo.com/src</code>，所以相当于源文件路径是<code>js/file1.js</code>、<code>js/file2.js</code>）</p>
<h3 id="articleHeader10">关联sourcemap</h3>
<h3 id="articleHeader11">Composed source map</h3>
<p>假如你的JS代码是用其他编译器（例如coffeescript）生成的，那么映射到JS代码就没什么用了，你肯定希望映射到CoffeeScript源码。UglifyJS有一个选项可以输入sourcemap，假如你有一个从CoffeeScript → 编译后JS的map的话，UglifyJS可以生成一个从CoffeeScript-&gt;压缩后JS的map映射到源码位置。</p>
<p>你可以传入 <code>--source-map content="/path/to/input/source.map"</code>或来尝试此特性，如果sourcemap包含在js内，则写 <code>--source-map content=inline</code>。</p>
<h2 id="articleHeader12">CLI混淆选项</h2>
<h2 id="articleHeader13">CLI mangle options</h2>
<p>你需要传入<code>--mangle</code> (<code>-m</code>)来使启用混淆功能。支持以下选项（用逗号隔开）：</p>
<ul>
<li><p><code>toplevel</code> — 混淆在最高作用域中声明的变量名（默认disabled）</p></li>
<li><p><code>eval</code> - 混淆在<code>eval</code> 或 <code>with</code>作用域出现的变量名（默认disabled）</p></li>
</ul>
<p>当启用混淆功能时，如果你希望保留一些名字不被混淆，你可以用<code>--mangle reserved</code> 声明一些名字（用逗号隔开）。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" uglifyjs ... -m reserved=[$,require,exports]'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs ruby"><code style="word-break: break-word; white-space: initial;"> uglifyjs ... -m reserved=[$,<span class="hljs-keyword">require</span>,exports]<span class="hljs-string">'</span></code></pre>
<p>这样能防止<code>require</code>, <code>exports</code>和 <code>$</code>被混淆改变。</p>
<h3 id="articleHeader14">CLI混淆属性名 (<code>--mangle-props</code>)</h3>
<h3 id="articleHeader15">CLI mangling property names (<code>--mangle-props</code>)</h3>
<p><strong>警告：</strong>这能会搞崩你的代码。混淆属性名跟混淆变量名不一样，是相互独立的。传入<code>--mangle-props</code>会混淆对象所有可见的属性名，除了DOM属性名和JS内置的类名。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// example.js
var x = {
    baz_: 0,
    foo_: 1,
    calc: function() {
        return this.foo_ + this.baz_;
    }
};
x.bar_ = 2;
x[&quot;baz_&quot;] = 3;
console.log(x.calc());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-comment">// example.js</span>
<span class="hljs-keyword">var</span> x = {
    <span class="hljs-attr">baz_</span>: <span class="hljs-number">0</span>,
    <span class="hljs-attr">foo_</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">calc</span>: <span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.foo_ + <span class="hljs-keyword">this</span>.baz_;
    }
};
x.bar_ = <span class="hljs-number">2</span>;
x[<span class="hljs-string">"baz_"</span>] = <span class="hljs-number">3</span>;
<span class="hljs-built_in">console</span>.log(x.calc());</code></pre>
<p>混淆所有属性（除了JS内置的）:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ uglifyjs example.js -c -m --mangle-props" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ uglifyjs example.js -c -m --mangle-props</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x={o:0,_:1,l:function(){return this._+this.o"}}";x.t=2,x.o=3,console.log(x.l());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> x={<span class="hljs-attr">o</span>:<span class="hljs-number">0</span>,<span class="hljs-attr">_</span>:<span class="hljs-number">1</span>,<span class="hljs-attr">l</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._+<span class="hljs-keyword">this</span>.o"}}";x.t=<span class="hljs-number">2</span>,x.o=<span class="hljs-number">3</span>,<span class="hljs-built_in">console</span>.log(x.l());</code></pre>
<p>混淆除了 <code>reserved</code> （保留）外的所有属性:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ uglifyjs example.js -c -m --mangle-props reserved=[foo_,bar_]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ uglifyjs example.js -c -m --mangle-props reserved=[foo_,bar_]</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x={o:0,foo_:1,_:function(){return this.foo_+this.o"}}";x.bar_=2,x.o=3,console.log(x._());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> x={<span class="hljs-attr">o</span>:<span class="hljs-number">0</span>,<span class="hljs-attr">foo_</span>:<span class="hljs-number">1</span>,<span class="hljs-attr">_</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>.foo_+<span class="hljs-keyword">this</span>.o"}}";x.bar_=<span class="hljs-number">2</span>,x.o=<span class="hljs-number">3</span>,<span class="hljs-built_in">console</span>.log(x._());</code></pre>
<p>混淆匹配<code>regex</code>（正则）的属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ uglifyjs example.js -c -m --mangle-props regex=/_$/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ uglifyjs example.js -c -m --mangle-props regex=/_$/</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x={o:0,_:1,calc:function(){return this._+this.o"}}";x.l=2,x.o=3,console.log(x.calc());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> x={<span class="hljs-attr">o</span>:<span class="hljs-number">0</span>,<span class="hljs-attr">_</span>:<span class="hljs-number">1</span>,<span class="hljs-attr">calc</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._+<span class="hljs-keyword">this</span>.o"}}";x.l=<span class="hljs-number">2</span>,x.o=<span class="hljs-number">3</span>,<span class="hljs-built_in">console</span>.log(x.calc());</code></pre>
<p>混用多个混淆属性选项：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ uglifyjs example.js -c -m --mangle-props regex=/_$/,reserved=[bar_]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ uglifyjs example.js -c -m --mangle-props regex=/_$/,reserved=[bar_]</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x={o:0,_:1,calc:function(){return this._+this.o"}}";x.bar_=2,x.o=3,console.log(x.calc());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> x={<span class="hljs-attr">o</span>:<span class="hljs-number">0</span>,<span class="hljs-attr">_</span>:<span class="hljs-number">1</span>,<span class="hljs-attr">calc</span>:<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params"></span>)</span>{<span class="hljs-keyword">return</span> <span class="hljs-keyword">this</span>._+<span class="hljs-keyword">this</span>.o"}}";x.bar_=<span class="hljs-number">2</span>,x.o=<span class="hljs-number">3</span>,<span class="hljs-built_in">console</span>.log(x.calc());</code></pre>
<p>为了混淆正常使用，我们默认避免混淆标准JS内置的名字（<code>--mangle-props builtins</code>可以强制混淆）。</p>
<p><code>tools/domprops.json</code> 里有一个默认的排除名单，包括绝大部分标准JS和多种浏览器中的DOM属性名。传入<code>--mangle-props domprops</code> 可以让此名单失效。</p>
<p>可以用正则表达式来定义该混淆的属性名。例如<code>--mangle-props regex=/^_/</code>，只混淆下划线开头的属性。</p>
<p>当你压缩多个文件时，为了保证让它们最终能同时工作，我们要让他们中同样的属性名混淆成相同的结果。传入`--name-cache<br>filename.json`，UglifyJS会维护一个共同的映射供他们复用。这个json一开始应该是空的，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ rm -f /tmp/cache.json  # start fresh
$ uglifyjs file1.js file2.js --mangle-props --name-cache /tmp/cache.json -o part1.js
$ uglifyjs file3.js file4.js --mangle-props --name-cache /tmp/cache.json -o part2.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash">$ rm <span class="hljs-_">-f</span> /tmp/cache.json  <span class="hljs-comment"># start fresh</span>
$ uglifyjs file1.js file2.js --mangle-props --name-cache /tmp/cache.json -o part1.js
$ uglifyjs file3.js file4.js --mangle-props --name-cache /tmp/cache.json -o part2.js</code></pre>
<p>这样<code>part1.js</code> 和 <code>part2.js</code>会知晓对方混淆的属性名。</p>
<p>假如你把所有文件压缩成同一个文件，那就不需要启用名字缓存了。</p>
<h4>混淆没括起来的名字(<code>--mangle-props keep_quoted</code>)</h4>
<h3 id="articleHeader16">Mangling unquoted names (<code>--mangle-props keep_quoted</code>)</h3>
<p>使用括号属性名 (<code>o["foo"]</code>)以保留属性名(<code>foo</code>)。这会让整个脚本中其余此属性的引用(<code>o.foo</code>)也不被混淆。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// stuff.js
var o = {
    &quot;foo&quot;: 1,
    bar: 3
};
o.foo += o.bar;
console.log(o.foo);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// stuff.js</span>
<span class="hljs-keyword">var</span> o = {
    <span class="hljs-string">"foo"</span>: <span class="hljs-number">1</span>,
    <span class="hljs-attr">bar</span>: <span class="hljs-number">3</span>
};
o.foo += o.bar;
<span class="hljs-built_in">console</span>.log(o.foo);</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ uglifyjs stuff.js --mangle-props keep_quoted -c -m" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ uglifyjs stuff.js --mangle-props keep_quoted -c -m</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var o={foo:1,o:3};o.foo+=o.o,console.log(o.foo);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> o={<span class="hljs-attr">foo</span>:<span class="hljs-number">1</span>,<span class="hljs-attr">o</span>:<span class="hljs-number">3</span>};o.foo+=o.o,<span class="hljs-built_in">console</span>.log(o.foo);</code></pre>
<h4>调试属性名混淆</h4>
<h3 id="articleHeader17">Debugging property name mangling</h3>
<p>为了混淆属性时不至于完全分不清，你可以传入<code>--mangle-props debug</code>来调试。例如<code>o.foo</code>会被混淆成<code>o._$foo$_</code>。这让源码量大、属性被混淆时也可以debug，可以看清混淆会把哪些属性搞乱。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ uglifyjs stuff.js --mangle-props debug -c -m" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="bash hljs"><code class="bash" style="word-break: break-word; white-space: initial;">$ uglifyjs stuff.js --mangle-props debug -c -m</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var o={_$foo$_:1,_$bar$_:3};o._$foo$_+=o._$bar$_,console.log(o._$foo$_);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> o={<span class="hljs-attr">_$foo$_</span>:<span class="hljs-number">1</span>,<span class="hljs-attr">_$bar$_</span>:<span class="hljs-number">3</span>};o._$foo$_+=o._$bar$_,<span class="hljs-built_in">console</span>.log(o._$foo$_);</code></pre>
<p>你可以用<code>--mangle-props-debug=XYZ</code>来传入自定义后缀。让<code>o.foo</code> 混淆成 <code>o._$foo$XYZ_</code>， 你可以在每次编译是都改变一下，来辨清属性名怎么被混淆的。一个小技巧，你可以每次编译时传随机数来模仿混淆操作（例如你更新了脚本，有了新的属性名），这有助于识别混淆时的出错。</p>
<h1 id="articleHeader18">API参考</h1>
<h1 id="articleHeader19">API Reference</h1>
<p>假如是通过NPM安装的，你可以在你的应用中这样加载UglifyJS：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var UglifyJS = require(&quot;uglify-js&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> UglifyJS = <span class="hljs-built_in">require</span>(<span class="hljs-string">"uglify-js"</span>);</code></pre>
<p>这输出一个高级函数<strong><code>minify(code, options)</code></strong>，它能根据配置，实现多种最小化（即压缩、混淆等）。 <code>minify()</code>默认启用压缩和混淆选项。例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var code = &quot;function add(first, second) { return first + second; }&quot;;
var result = UglifyJS.minify(code);
console.log(result.error); // runtime error, or `undefined` if no error
console.log(result.code);  // minified output: function add(n,d){return n+d}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> code = <span class="hljs-string">"function add(first, second) { return first + second; }"</span>;
<span class="hljs-keyword">var</span> result = UglifyJS.minify(code);
<span class="hljs-built_in">console</span>.log(result.error); <span class="hljs-comment">// runtime error, or `undefined` if no error</span>
<span class="hljs-built_in">console</span>.log(result.code);  <span class="hljs-comment">// minified output: function add(n,d){return n+d}</span></code></pre>
<p>你可以通过一个对象（key为文件名，value为代码）来同时<code>最小化</code>多个文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var code = {
    &quot;file1.js&quot;: &quot;function add(first, second) { return first + second; }&quot;,
    &quot;file2.js&quot;: &quot;console.log(add(1 + 2, 3 + 4));&quot;
};
var result = UglifyJS.minify(code);
console.log(result.code);
// function add(d,n){return d+n}console.log(add(3,7));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> code = {
    <span class="hljs-string">"file1.js"</span>: <span class="hljs-string">"function add(first, second) { return first + second; }"</span>,
    <span class="hljs-string">"file2.js"</span>: <span class="hljs-string">"console.log(add(1 + 2, 3 + 4));"</span>
};
<span class="hljs-keyword">var</span> result = UglifyJS.minify(code);
<span class="hljs-built_in">console</span>.log(result.code);
<span class="hljs-comment">// function add(d,n){return d+n}console.log(add(3,7));</span></code></pre>
<p><code>toplevel</code>选项例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var code = {
    &quot;file1.js&quot;: &quot;function add(first, second) { return first + second; }&quot;,
    &quot;file2.js&quot;: &quot;console.log(add(1 + 2, 3 + 4));&quot;
};
var options = { toplevel: true };
var result = UglifyJS.minify(code, options);
console.log(result.code);
// console.log(3+7);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> code = {
    <span class="hljs-string">"file1.js"</span>: <span class="hljs-string">"function add(first, second) { return first + second; }"</span>,
    <span class="hljs-string">"file2.js"</span>: <span class="hljs-string">"console.log(add(1 + 2, 3 + 4));"</span>
};
<span class="hljs-keyword">var</span> options = { <span class="hljs-attr">toplevel</span>: <span class="hljs-literal">true</span> };
<span class="hljs-keyword">var</span> result = UglifyJS.minify(code, options);
<span class="hljs-built_in">console</span>.log(result.code);
<span class="hljs-comment">// console.log(3+7);</span></code></pre>
<p><code>nameCache</code> 选项例子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var options = {
    mangle: {
        toplevel: true,
    },
    nameCache: {}
};
var result1 = UglifyJS.minify({
    &quot;file1.js&quot;: &quot;function add(first, second) { return first + second; }&quot;
}, options);
var result2 = UglifyJS.minify({
    &quot;file2.js&quot;: &quot;console.log(add(1 + 2, 3 + 4));&quot;
}, options);
console.log(result1.code);
// function n(n,r){return n+r}
console.log(result2.code);
// console.log(n(3,7));" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> options = {
    <span class="hljs-attr">mangle</span>: {
        <span class="hljs-attr">toplevel</span>: <span class="hljs-literal">true</span>,
    },
    <span class="hljs-attr">nameCache</span>: {}
};
<span class="hljs-keyword">var</span> result1 = UglifyJS.minify({
    <span class="hljs-string">"file1.js"</span>: <span class="hljs-string">"function add(first, second) { return first + second; }"</span>
}, options);
<span class="hljs-keyword">var</span> result2 = UglifyJS.minify({
    <span class="hljs-string">"file2.js"</span>: <span class="hljs-string">"console.log(add(1 + 2, 3 + 4));"</span>
}, options);
<span class="hljs-built_in">console</span>.log(result1.code);
<span class="hljs-comment">// function n(n,r){return n+r}</span>
<span class="hljs-built_in">console</span>.log(result2.code);
<span class="hljs-comment">// console.log(n(3,7));</span></code></pre>
<p>你可以像下面这样把名字缓存保存在文件中：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var cacheFileName = &quot;/tmp/cache.json&quot;;
var options = {
    mangle: {
        properties: true,
    },
    nameCache: JSON.parse(fs.readFileSync(cacheFileName, &quot;utf8&quot;))
};
fs.writeFileSync(&quot;part1.js&quot;, UglifyJS.minify({
    &quot;file1.js&quot;: fs.readFileSync(&quot;file1.js&quot;, &quot;utf8&quot;),
    &quot;file2.js&quot;: fs.readFileSync(&quot;file2.js&quot;, &quot;utf8&quot;)
}, options).code, &quot;utf8&quot;);
fs.writeFileSync(&quot;part2.js&quot;, UglifyJS.minify({
    &quot;file3.js&quot;: fs.readFileSync(&quot;file3.js&quot;, &quot;utf8&quot;),
    &quot;file4.js&quot;: fs.readFileSync(&quot;file4.js&quot;, &quot;utf8&quot;)
}, options).code, &quot;utf8&quot;);
fs.writeFileSync(cacheFileName, JSON.stringify(options.nameCache), &quot;utf8&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> cacheFileName = <span class="hljs-string">"/tmp/cache.json"</span>;
<span class="hljs-keyword">var</span> options = {
    <span class="hljs-attr">mangle</span>: {
        <span class="hljs-attr">properties</span>: <span class="hljs-literal">true</span>,
    },
    <span class="hljs-attr">nameCache</span>: <span class="hljs-built_in">JSON</span>.parse(fs.readFileSync(cacheFileName, <span class="hljs-string">"utf8"</span>))
};
fs.writeFileSync(<span class="hljs-string">"part1.js"</span>, UglifyJS.minify({
    <span class="hljs-string">"file1.js"</span>: fs.readFileSync(<span class="hljs-string">"file1.js"</span>, <span class="hljs-string">"utf8"</span>),
    <span class="hljs-string">"file2.js"</span>: fs.readFileSync(<span class="hljs-string">"file2.js"</span>, <span class="hljs-string">"utf8"</span>)
}, options).code, <span class="hljs-string">"utf8"</span>);
fs.writeFileSync(<span class="hljs-string">"part2.js"</span>, UglifyJS.minify({
    <span class="hljs-string">"file3.js"</span>: fs.readFileSync(<span class="hljs-string">"file3.js"</span>, <span class="hljs-string">"utf8"</span>),
    <span class="hljs-string">"file4.js"</span>: fs.readFileSync(<span class="hljs-string">"file4.js"</span>, <span class="hljs-string">"utf8"</span>)
}, options).code, <span class="hljs-string">"utf8"</span>);
fs.writeFileSync(cacheFileName, <span class="hljs-built_in">JSON</span>.stringify(options.nameCache), <span class="hljs-string">"utf8"</span>);</code></pre>
<p>综合使用多种<code>minify()</code>选项的例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var code = {
    &quot;file1.js&quot;: &quot;function add(first, second) { return first + second; }&quot;,
    &quot;file2.js&quot;: &quot;console.log(add(1 + 2, 3 + 4));&quot;
};
var options = {
    toplevel: true,
    compress: {
        global_defs: {
            &quot;@console.log&quot;: &quot;alert&quot;
        },
        passes: 2
    },
    output: {
        beautify: false,
        preamble: &quot;/* uglified */&quot;
    }
};
var result = UglifyJS.minify(code, options);
console.log(result.code);
// /* uglified */
// alert(10);&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> code = {
    <span class="hljs-string">"file1.js"</span>: <span class="hljs-string">"function add(first, second) { return first + second; }"</span>,
    <span class="hljs-string">"file2.js"</span>: <span class="hljs-string">"console.log(add(1 + 2, 3 + 4));"</span>
};
<span class="hljs-keyword">var</span> options = {
    <span class="hljs-attr">toplevel</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">compress</span>: {
        <span class="hljs-attr">global_defs</span>: {
            <span class="hljs-string">"@console.log"</span>: <span class="hljs-string">"alert"</span>
        },
        <span class="hljs-attr">passes</span>: <span class="hljs-number">2</span>
    },
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">beautify</span>: <span class="hljs-literal">false</span>,
        <span class="hljs-attr">preamble</span>: <span class="hljs-string">"/* uglified */"</span>
    }
};
<span class="hljs-keyword">var</span> result = UglifyJS.minify(code, options);
<span class="hljs-built_in">console</span>.log(result.code);
<span class="hljs-comment">// /* uglified */</span>
<span class="hljs-comment">// alert(10);"</span></code></pre>
<p>生成警告提示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var code = &quot;function f(){ var u; return 2 + 3; }&quot;;
var options = { warnings: true };
var result = UglifyJS.minify(code, options);
console.log(result.error);    // runtime error, `undefined` in this case
console.log(result.warnings); // [ 'Dropping unused variable u [0:1,18]' ]
console.log(result.code);     // function f(){return 5}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> code = <span class="hljs-string">"function f(){ var u; return 2 + 3; }"</span>;
<span class="hljs-keyword">var</span> options = { <span class="hljs-attr">warnings</span>: <span class="hljs-literal">true</span> };
<span class="hljs-keyword">var</span> result = UglifyJS.minify(code, options);
<span class="hljs-built_in">console</span>.log(result.error);    <span class="hljs-comment">// runtime error, `undefined` in this case</span>
<span class="hljs-built_in">console</span>.log(result.warnings); <span class="hljs-comment">// [ 'Dropping unused variable u [0:1,18]' ]</span>
<span class="hljs-built_in">console</span>.log(result.code);     <span class="hljs-comment">// function f(){return 5}</span></code></pre>
<p>生成错误提示：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var result = UglifyJS.minify({&quot;foo.js&quot; : &quot;if (0) else console.log(1);&quot;});
console.log(JSON.stringify(result.error));
// {&quot;message&quot;:&quot;Unexpected token: keyword (else)&quot;,&quot;filename&quot;:&quot;foo.js&quot;,&quot;line&quot;:1,&quot;col&quot;:7,&quot;pos&quot;:7}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> result = UglifyJS.minify({<span class="hljs-string">"foo.js"</span> : <span class="hljs-string">"if (0) else console.log(1);"</span>});
<span class="hljs-built_in">console</span>.log(<span class="hljs-built_in">JSON</span>.stringify(result.error));
<span class="hljs-comment">// {"message":"Unexpected token: keyword (else)","filename":"foo.js","line":1,"col":7,"pos":7}</span></code></pre>
<p>Note: unlike <code>uglify-js@2.x</code>, the <code>3.x</code> API does not throw errors. To<br>achieve a similar effect one could do the following:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var result = UglifyJS.minify(code, options);
if (result.error) throw result.error;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> result = UglifyJS.minify(code, options);
<span class="hljs-keyword">if</span> (result.error) <span class="hljs-keyword">throw</span> result.error;</code></pre>
<h2 id="articleHeader20">最小化选项</h2>
<h2 id="articleHeader21">Minify options</h2>
<ul>
<li><p><code>warnings</code> (default <code>false</code>) — 传 <code>true</code>的话，会在<code>result.warnings</code>中返回压缩过程的警告。传 <code>"verbose"</code>获得更详细的警告。</p></li>
<li><p><code>parse</code> (default <code>{}</code>) — 如果你要指定额外的<a>解析配置parse options</a>,传配置对象。</p></li>
<li><p><code>compress</code> (default <code>{}</code>) — 传<code>false</code>就完全跳过压缩。传一个对象来自定义 <a>压缩配置compress options</a>。</p></li>
<li>
<p><code>mangle</code> (default <code>true</code>) — 传 <code>false</code>就跳过混淆名字。传对象来指定<a>混淆配置mangle options</a> (详情如下).</p>
<ul><li><p><code>mangle.properties</code> (default <code>false</code>) — 传一个对象来自定义<a>混淆属性配置mangle property options</a>.</p></li></ul>
</li>
<li><p><code>output</code> (default <code>null</code>) — 要自定义就传个对象来指定额外的 <a>输出配置output options</a>.  默认是压缩到最优化。</p></li>
<li><p><code>sourceMap</code> (default <code>false</code>) - 传一个对象来自定义<br><a>sourcemap配置source map options</a>.</p></li>
<li><p><code>toplevel</code> (default <code>false</code>) - 如果你要混淆（和干掉没引用的）最高作用域中的变量和函数名，就传<code>true</code>。</p></li>
<li><p><code>nameCache</code> (default <code>null</code>) - 如果你要缓存 <code>minify()</code>多处调用的经混淆的变量名、属性名，就传一个空对象<code>{}</code>或先前用过的<code>nameCache</code>对象。<br>注意:这是个可读/可写属性。<code>minify()</code>会读取这个对象的nameCache状态，并在最小化过程中更新，以便保留和供用户在外部使用。</p></li>
<li><p><code>ie8</code> (default <code>false</code>) - 传 <code>true</code> 来支持 IE8.</p></li>
</ul>
<h2 id="articleHeader22">最小化配置的结构</h2>
<h2 id="articleHeader23">Minify options structure</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
    warnings: false,
    parse: {
        // parse options
    },
    compress: {
        // compress options
    },
    mangle: {
        // mangle options

        properties: {
            // mangle property options
        }
    },
    output: {
        // output options
    },
    sourceMap: {
        // source map options
    },
    nameCache: null, // or specify a name cache object
    toplevel: false,
    ie8: false,
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">{
    <span class="hljs-attr">warnings</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">parse</span>: {
        <span class="hljs-comment">// parse options</span>
    },
    <span class="hljs-attr">compress</span>: {
        <span class="hljs-comment">// compress options</span>
    },
    <span class="hljs-attr">mangle</span>: {
        <span class="hljs-comment">// mangle options</span>

        properties: {
            <span class="hljs-comment">// mangle property options</span>
        }
    },
    <span class="hljs-attr">output</span>: {
        <span class="hljs-comment">// output options</span>
    },
    <span class="hljs-attr">sourceMap</span>: {
        <span class="hljs-comment">// source map options</span>
    },
    <span class="hljs-attr">nameCache</span>: <span class="hljs-literal">null</span>, <span class="hljs-comment">// or specify a name cache object</span>
    toplevel: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">ie8</span>: <span class="hljs-literal">false</span>,
}</code></pre>
<h3 id="articleHeader24">sourcemap配置</h3>
<h3 id="articleHeader25">Source map options</h3>
<p>这样生成sourcemap：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var result = UglifyJS.minify({&quot;file1.js&quot;: &quot;var a = function() {};&quot;}, {
    sourceMap: {
        filename: &quot;out.js&quot;,
        url: &quot;out.js.map&quot;
    }
});
console.log(result.code); // minified output
console.log(result.map);  // source map" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> result = UglifyJS.minify({<span class="hljs-string">"file1.js"</span>: <span class="hljs-string">"var a = function() {};"</span>}, {
    <span class="hljs-attr">sourceMap</span>: {
        <span class="hljs-attr">filename</span>: <span class="hljs-string">"out.js"</span>,
        <span class="hljs-attr">url</span>: <span class="hljs-string">"out.js.map"</span>
    }
});
<span class="hljs-built_in">console</span>.log(result.code); <span class="hljs-comment">// minified output</span>
<span class="hljs-built_in">console</span>.log(result.map);  <span class="hljs-comment">// source map</span></code></pre>
<p>要注意，此时sourcemap并不会保存为一份文件，它只会返回在<code>result.map</code>中。<br><code>sourceMap.url</code> 传入的值只用来在<code>result.code</code>中设置<code>//# sourceMappingURL=out.js.map</code> ，<code>filename</code> 的值只用来在sourcemap文件中设置 <code>file</code>属性(详情看 <a href="https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k" rel="nofollow noreferrer" target="_blank">规范</a>)。</p>
<p>你可以把<code>sourceMap.url</code>设为<code>true</code> ，这样sourcemap会加在代码末尾。</p>
<p>你也可以指定sourcemap中的源文件根目录（sourceRoot）属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var result = UglifyJS.minify({&quot;file1.js&quot;: &quot;var a = function() {};&quot;}, {
    sourceMap: {
        root: &quot;http://example.com/src&quot;,
        url: &quot;out.js.map&quot;
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> result = UglifyJS.minify({<span class="hljs-string">"file1.js"</span>: <span class="hljs-string">"var a = function() {};"</span>}, {
    <span class="hljs-attr">sourceMap</span>: {
        <span class="hljs-attr">root</span>: <span class="hljs-string">"http://example.com/src"</span>,
        <span class="hljs-attr">url</span>: <span class="hljs-string">"out.js.map"</span>
    }
});</code></pre>
<p>如果你要压缩<em>从其他文件编译得来的</em>带一份sourcemap的JS文件，你可以用<code>sourceMap.content</code>参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var result = UglifyJS.minify({&quot;compiled.js&quot;: &quot;compiled code&quot;}, {
    sourceMap: {
        content: &quot;content from compiled.js.map&quot;,
        url: &quot;minified.js.map&quot;
    }
});
// same as before, it returns `code` and `map`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> result = UglifyJS.minify({<span class="hljs-string">"compiled.js"</span>: <span class="hljs-string">"compiled code"</span>}, {
    <span class="hljs-attr">sourceMap</span>: {
        <span class="hljs-attr">content</span>: <span class="hljs-string">"content from compiled.js.map"</span>,
        <span class="hljs-attr">url</span>: <span class="hljs-string">"minified.js.map"</span>
    }
});
<span class="hljs-comment">// same as before, it returns `code` and `map`</span></code></pre>
<p>如果你要用<code> X-SourceMap </code>请求头，你可以忽略 <code>sourceMap.url</code>。</p>
<h2 id="articleHeader26">解析配置</h2>
<h2 id="articleHeader27">Parse options</h2>
<ul>
<li><p><code>bare_returns</code> (default <code>false</code>) -- 支持在顶级作用域中 <code>return</code> 声明。</p></li>
<li><p><code>html5_comments</code> (default <code>true</code>)</p></li>
<li><p><code>shebang</code> (default <code>true</code>) -- 支持在第一行用 <code>#!command</code></p></li>
</ul>
<h2 id="articleHeader28">压缩配置</h2>
<h2 id="articleHeader29">Compress options</h2>
<ul>
<li><p><code>sequences</code>(default: true) -- 连续声明变量，用逗号隔开来。可以设置为正整数来指定连续声明的最大长度。如果设为<code>true</code> 表示默认<code>200</code>个，设为<code>false</code>或<code>0</code>则禁用。 <code>sequences</code>至少要是<code>2</code>,<code>1</code>的话等同于<code>true</code>（即<code>200</code>)。默认的sequences设置有极小几率会导致压缩很慢，所以推荐设置成<code>20</code>或以下。</p></li>
<li><p><code>properties</code> -- 用<code>.</code>来重写属性引用，例如<code>foo["bar"] → foo.bar</code></p></li>
<li><p><code>dead_code</code> -- 移除没被引用的代码</p></li>
<li><p><code>drop_debugger</code> -- 移除 <code>debugger;</code></p></li>
<li><p><code>unsafe</code> (default: false) -- 使用 "unsafe"转换 (下面详述)</p></li>
<li><p><code>unsafe_comps</code> (default: false) -- 保留<code>&lt;</code> 和 <code>&lt;=</code>不被换成 <code>&gt;</code> 和 <code>&gt;=</code>。假如某些运算对象是用<code>get</code>或 <code>valueOf</code>object得出的时候，转换可能会不安全，可能会引起运算对象的改变。此选项只有当 <code>comparisons</code>和<code>unsafe_comps</code> 都设为true时才会启用。</p></li>
<li><p><code>unsafe_Func</code> (default: false) -- 当 <code>Function(args, code)</code>的<code>args</code> 和 <code>code</code>都是字符串时，压缩并混淆。</p></li>
<li><p><code>unsafe_math</code> (default: false) -- 优化数字表达式，例如<code>2 * x * 3</code> 变成 <code>6 * x</code>, 可能会导致不精确的浮点数结果。</p></li>
<li><p><code>unsafe_proto</code> (default: false) -- 把<code>Array.prototype.slice.call(a)</code> 优化成 <code>[].slice.call(a)</code></p></li>
<li><p><code>unsafe_regexp</code> (default: false) -- 如果<code>RegExp</code> 的值是常量，替换成变量。</p></li>
<li><p><code>conditionals</code> -- 优化<code>if</code>等判断以及条件选择</p></li>
<li><p><code>comparisons</code> --  把结果必然的运算优化成二元运算，例如<code>!(a &lt;= b) → a &gt; b</code> (只有设置了 <code>unsafe_comps</code>时才生效)；尽量转成否运算。例如 <code>a = !b &amp;&amp; !c &amp;&amp; !d &amp;&amp; !e → a=!(b||c||d||e)</code></p></li>
<li><p><code>evaluate</code> -- 尝试计算常量表达式</p></li>
<li><p><code>booleans</code> -- 优化布尔运算，例如 <code>!!a? b : c → a ? b : c</code></p></li>
<li><p><code>typeofs</code> -- 默认 <code>true</code>.  转换 <code>typeof foo == "undefined"</code> 成 <code>foo === void 0</code>. 注意：如果要适配IE10或以下，由于已知的问题，推荐设成<code>false</code> 。</p></li>
<li><p><code>loops</code> -- 当<code>do</code>、<code>while</code> 、 <code>for</code>循环的判断条件可以确定是，对其进行优化。</p></li>
<li><p><code>unused</code> -- 干掉没有被引用的函数和变量。（除非设置<code>"keep_assign"</code>，否则变量的简单直接赋值也不算被引用。）</p></li>
<li><p><code>toplevel</code> -- 干掉顶层作用域中没有被引用的函数 (<code>"funcs"</code>)和/或变量(<code>"vars"</code>) (默认是<code>false</code> , <code>true</code> 的话即函数变量都干掉)</p></li>
<li><p><code>top_retain</code> -- 当设了<code>unused</code>时，保留顶层作用域中的某些函数变量。(可以写成数组，用逗号隔开，也可以用正则或函数. 参考<code>toplevel</code>)</p></li>
<li><p><code>hoist_funs</code> -- 提升函数声明</p></li>
<li><p><code>hoist_vars</code> (default: false) -- 提升 <code>var</code> 声明 (默认是<code>false</code>,因为那会加大文件的size)</p></li>
<li><p><code>if_return</code> -- 优化 if/return 和 if/continue</p></li>
<li><p><code>inline</code> -- 包裹简单函数。</p></li>
<li><p><code>join_vars</code> -- 合并连续 <code>var</code> 声明</p></li>
<li><p><code>cascade</code> -- 弱弱地优化一下连续声明, 将 <code>x, x</code> 转成 <code>x</code>，<code>x = something(), x</code> 转成 <code>x = something()</code></p></li>
<li><p><code>collapse_vars</code> -- 当 <code>var</code> 和 <code>const</code> 单独使用时尽量合并</p></li>
<li><p><code>reduce_vars</code> -- 优化某些变量实际上是按常量值来赋值、使用的情况。</p></li>
<li><p><code>warnings</code> -- 当删除没有用处的代码时，显示警告</p></li>
<li><p><code>negate_iife</code> -- 当立即执行函数（IIFE）的返回值没用时，取消之。避免代码生成器会插入括号。</p></li>
<li><p><code>pure_getters</code> -- 默认是 <code>false</code>. 如果你传入<code>true</code>，UglifyJS会假设对象属性的引用（例如<code>foo.bar</code> 或 <code>foo["bar"]</code>）没有函数副作用。</p></li>
<li><p><code>pure_funcs</code> -- 默认 <code>null</code>. 你可以传入一个名字的数组，UglifyJS会假设这些函数没有函数副作用。<strong>警告：</strong>假如名字在作用域中重新定义，不会再次检测。例如<code>var q = Math.floor(a/b)</code>，假如变量<code>q</code>没有被引用，UglifyJS会干掉它，但 <code>Math.floor(a/b)</code>会被保留，没有人知道它是干嘛的。你可以设置<code>pure_funcs: [ 'Math.floor' ]</code> ，这样该函数会被认为没有函数副作用，这样整个声明会被废弃。在目前的执行情况下，会增加开销（压缩会变慢）。</p></li>
<li><p><code>drop_console</code> -- 默认 <code>false</code>.  传<code>true</code>的话会干掉<code>console.*</code>函数。如果你要干掉特定的函数比如<code>console.info</code> ，又想删掉后保留其参数中的副作用，那用<code>pure_funcs</code>来处理吧。</p></li>
<li><p><code>expression</code> -- 默认 <code>false</code>。传<code>true</code>来保留终端语句中没有"return"的完成值。例如在bookmarklets。</p></li>
<li><p><code>keep_fargs</code> -- 默认<code>true</code>。阻止压缩器干掉那些没有用到的函数参数。你需要它来保护某些依赖<code>Function.length</code>的函数。</p></li>
<li><p><code>keep_fnames</code> -- 默认 <code>false</code>。传 <code>true</code>来防止压缩器干掉函数名。对那些依赖<code>Function.prototype.name</code>的函数很有用。延展阅读：<code>keep_fnames</code> <a>混淆选项</a>.</p></li>
<li><p><code>passes</code> -- 默认 <code>1</code>。运行压缩的次数。在某些情况下，用一个大于1的数字参数可以进一步压缩代码大小。注意：数字越大压缩耗时越长。</p></li>
<li><p><code>keep_infinity</code> -- 默认 <code>false</code>。传<code>true</code>以防止压缩时把<code>1/0</code>转成<code>Infinity</code>，那可能会在chrome上有性能问题。</p></li>
<li><p><code>side_effects</code> -- 默认 <code>true</code>. 传<code>false</code>禁用丢弃纯函数。如果一个函数被调用前有一段<code>/*@__PURE__*/</code> or <code>/*#__PURE__*/</code> 注释，该函数会被标注为纯函数。例如 <code>/*@__PURE__*/foo();</code></p></li>
</ul>
<h2 id="articleHeader30">混淆配置</h2>
<h2 id="articleHeader31">Mangle options</h2>
<ul><li>
<p><code>reserved</code> (default <code>[]</code>)。 传一个不需要混淆的名字的数组。 Example: <code>["foo", "bar"]</code>.</p>
<ul>
<li><p><code>toplevel</code> (default <code>false</code>)。混淆那些定义在顶层作用域的名字（默认禁用）。ß</p></li>
<li><p><code>keep_fnames</code>(default <code>false</code>)。传<code>true</code>的话就不混淆函数名。对那些依赖<code>Function.prototype.name</code>的代码有用。延展阅读：<code>keep_fnames</code> <a>压缩配置</a>.</p></li>
<li><p><code>eval</code> (default <code>false</code>)。混淆那些在with或eval中出现的名字。</p></li>
</ul>
</li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// test.js
var globalVar;
function funcName(firstLongName, anotherLongName) {
    var myVariable = firstLongName +  anotherLongName;
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// test.js</span>
<span class="hljs-keyword">var</span> globalVar;
<span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">funcName</span>(<span class="hljs-params">firstLongName, anotherLongName</span>) </span>{
    <span class="hljs-keyword">var</span> myVariable = firstLongName +  anotherLongName;
}</code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var code = fs.readFileSync(&quot;test.js&quot;, &quot;utf8&quot;);

UglifyJS.minify(code).code;
// 'function funcName(a,n){}var globalVar;'

UglifyJS.minify(code, { mangle: { reserved: ['firstLongName'] } }).code;
// 'function funcName(firstLongName,a){}var globalVar;'

UglifyJS.minify(code, { mangle: { toplevel: true } }).code;
// 'function n(n,a){}var a;'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> code = fs.readFileSync(<span class="hljs-string">"test.js"</span>, <span class="hljs-string">"utf8"</span>);

UglifyJS.minify(code).code;
<span class="hljs-comment">// 'function funcName(a,n){}var globalVar;'</span>

UglifyJS.minify(code, { <span class="hljs-attr">mangle</span>: { <span class="hljs-attr">reserved</span>: [<span class="hljs-string">'firstLongName'</span>] } }).code;
<span class="hljs-comment">// 'function funcName(firstLongName,a){}var globalVar;'</span>

UglifyJS.minify(code, { <span class="hljs-attr">mangle</span>: { <span class="hljs-attr">toplevel</span>: <span class="hljs-literal">true</span> } }).code;
<span class="hljs-comment">// 'function n(n,a){}var a;'</span></code></pre>
<h3 id="articleHeader32">混淆属性的配置</h3>
<h3 id="articleHeader33">Mangle properties options</h3>
<ul>
<li><p><code>reserved</code> (default: <code>[]</code>) -- 不混淆在<code>reserved</code> 数组里的属性名.</p></li>
<li><p><code>regex</code> (default: <code>null</code>) -— 传一个正则，只混淆匹配该正则的属性名。</p></li>
<li><p><code>keep_quoted</code> (default: <code>false</code>) -— 只混淆不在括号内的属性名.</p></li>
<li><p><code>debug</code> (default: <code>false</code>) -— 用原名字来组成混淆后的名字.<br>  传空字符串<code>""</code> 来启用,或者非空字符串作为debu后缀。（例如<code>"abc"</code>, <code>foo.bar</code>=&gt;<code>foo.barabc</code>)</p></li>
<li><p><code>builtins</code> (default: <code>false</code>) -- 传 <code>true</code>的话，允许混淆内置的DOM属性名。不推荐使用。</p></li>
</ul>
<h2 id="articleHeader34">输出配置</h2>
<h2 id="articleHeader35">Output options</h2>
<p>代码生成器默认会尽量输出最简短的代码。假如你要美化一下输出代码，可以传<code>--beautify</code> (<code>-b</code>)。你也可以传更多的参数来控制输出代码：</p>
<ul>
<li><p><code>ascii_only</code> (default <code>false</code>) -- 忽略字符串和正则（导致非ascii字符失效）中的Unicode字符。</p></li>
<li><p><code>beautify</code> (default <code>true</code>) -- 是否美化输出代码。传<code>-b</code>的话就是设成true。假如你想生成最小化的代码同时又要用其他设置来美化代码，你可以设<code>-b beautify=false</code>。</p></li>
<li><p><code>bracketize</code> (default <code>false</code>) -- 永远在<code>if</code>, <code>for</code>,<code>do</code>, <code>while</code>, <code>with</code>后面加上大括号，即使循环体只有一句。</p></li>
<li><p><code>comments</code> (default <code>false</code>) -- 传 <code>true</code> 或 <code>"all"</code>保留全部注释,传 <code>"some"</code>保留部分，传正则 (例如 <code>/^!/</code>) 或者函数也行。</p></li>
<li><p><code>indent_level</code> (default 4) 缩进格数</p></li>
<li><p><code>indent_start</code> (default 0) -- 每行前面加几个空格</p></li>
<li><p><code>inline_script</code> (default <code>false</code>) -- 避免字符串中出现<code>&lt;/script</code>中的斜杠</p></li>
<li><p><code>keep_quoted_props</code> (default <code>false</code>) -- 如果启用，会保留对象属性名的引号。</p></li>
<li><p><code>max_line_len</code> (default 32000) -- 最大行宽（压缩后的代码）</p></li>
<li><p><code>space-colon</code> (default <code>true</code>) -- 在冒号后面加空格</p></li>
<li><p><code>preamble</code> (default <code>null</code>) -- 如果要传的话，必须是字符串。它会被加在输出文档的前面。sourcemap会随之调整。例如可以用来插入版权信息。</p></li>
<li><p><code>preserve_line</code> (default <code>false</code>) -- 传 <code>true</code> 就保留空行，但只在<code>beautify</code> 设为<code>false</code>时有效。ß</p></li>
<li><p><code>quote_keys</code> (default <code>false</code>) -- 传<code>true</code>的话会在对象所有的键加上括号</p></li>
<li><p><code>quote_style</code> (default <code>0</code>) -- 影响字符串的括号格式（也会影响属性名和指令）。</p></li>
<li><p><code>0</code> -- 倾向使用双引号，字符串里还有引号的话就是单引号。</p></li>
<li><p><code>1</code> -- 永远单引号</p></li>
<li><p><code>2</code> -- 永远双引号</p></li>
<li><p><code>3</code> -- 永远是本来的引号</p></li>
<li><p><code>semicolons</code> (default <code>true</code>) -- 用分号分开多个声明。如果你传<code>false</code>,则总会另起一行，增强输出文件的可读性。（gzip前体积更小，gzip后稍大一点点）</p></li>
<li><p><code>shebang</code> (default <code>true</code>) -- 保留开头的 shebang <code>#!</code> (bash 脚本)</p></li>
<li><p><code>width</code> (default 80) -- 仅在美化时生效，设定一个行宽让美化器尽量实现。这会影响行中文字的数量（不包括缩进）。当前本功能实现得不是非常好，但依然让美化后的代码可读性大大增强。</p></li>
<li><p><code>wrap_iife</code> (default <code>false</code>) --传<code>true</code>的话，把立即执行函数括起来。 更多详情看这里<br><a href="https://github.com/mishoo/UglifyJS2/issues/640" rel="nofollow noreferrer" target="_blank">#640</a></p></li>
</ul>
<h1 id="articleHeader36">综合应用</h1>
<h1 id="articleHeader37">Miscellaneous</h1>
<h3 id="articleHeader38">保留版权告示或其他注释</h3>
<p>你可以传入<code>--comments</code>让输出文件中保留某些注释。默认时会保留JSDoc-style的注释（包含"@preserve","@license" 或 "@cc_on"（为IE所编译））。你可以传入<code>--comments all</code>来保留全部注释，或者传一个合法的正则来保留那些匹配到的注释。例如<code>--comments /^!/</code>会保留<code>/*! Copyright Notice */</code>这样的注释。 </p>
<p>注意，无论如何，总会有些注释在某些情况下会丢失。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function f() {
    /** @preserve Foo Bar */
    function g() {
        // this function is never called
    }
    return something();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">f</span>(<span class="hljs-params"></span>) </span>{
    <span class="hljs-comment">/** @preserve Foo Bar */</span>
    <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">g</span>(<span class="hljs-params"></span>) </span>{
        <span class="hljs-comment">// this function is never called</span>
    }
    <span class="hljs-keyword">return</span> something();
}</code></pre>
<p>即使里面带有"@preserve"，注释依然会被丢弃。因为内部的函数<code>g</code>（注释所依附的抽象语法树节点）没有被引用、会被压缩器干掉。</p>
<p>书写版权信息（或其他需要在输出文件中保留的信息）的最安全位置是全局节点。</p>
<h3 id="articleHeader39">
<code>unsafe</code>`compress`配置</h3>
<h3 id="articleHeader40">The <code>unsafe</code> <code>compress</code> option</h3>
<p>在某些刻意营造的案例中，启用某些转换<strong>有可能</strong>会打断代码的逻辑，但绝大部分情况下是安全的。你可能会想尝试一下，因为这毕竟会减少文件体积。以下是某些例子：</p>
<ul>
<li><p><code>new Array(1, 2, 3)</code> 或 <code>Array(1, 2, 3)</code> → <code>[ 1, 2, 3 ]</code></p></li>
<li><p><code>new Object()</code> → <code>{}</code></p></li>
<li><p><code>String(exp)</code> 或 <code>exp.toString()</code> → <code>"" + exp</code></p></li>
<li><p><code>new Object/RegExp/Function/Error/Array (...)</code> → 我们干掉用<code>new</code>的</p></li>
<li><p><code>void 0</code> → <code>undefined</code> (假如作用域中有一个变量名叫"undefined";我们这么做是因为变量名会被混淆成单字符）</p></li>
</ul>
<h3 id="articleHeader41">编译条件语句</h3>
<h3 id="articleHeader42">Conditional compilation</h3>
<p>Uglify会假设全局变量都是常量(不管是否在局部域中定义了)，你可以用<code>--define</code> (<code>-d</code>)来实现定义全局变量。例如你传<code>--define DEBUG=false</code>，UglifyJS会在输出中干掉下面代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="if (DEBUG) {
    console.log(&quot;debug stuff&quot;);
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">if</span> (DEBUG) {
    <span class="hljs-built_in">console</span>.log(<span class="hljs-string">"debug stuff"</span>);
}</code></pre>
<p>你可以像<code>--define env.DEBUG=false</code>这样写嵌套的常量。</p>
<p>在干掉那些永否的条件语句以及不可达代码时，UglifyJS会给出警告。现在没有选项可以禁用此特性，但你可以设置 <code>warnings=false</code> 来禁掉<em>所有</em>警告。</p>
<p>另一个定义全局常量的方法是，在一个独立的文档中定义，再引入到构建中。例如你有一个这样的<code>build/defines.js</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="const DEBUG = false;
const PRODUCTION = true;
// 等等" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">const</span> DEBUG = <span class="hljs-literal">false</span>;
<span class="hljs-keyword">const</span> PRODUCTION = <span class="hljs-literal">true</span>;
<span class="hljs-comment">// 等等</span></code></pre>
<p>这样构建你的代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  uglifyjs build/defines.js js/foo.js js/bar.js... -c" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code style="word-break: break-word; white-space: initial;">  uglifyjs build/defines<span class="hljs-selector-class">.js</span> js/foo<span class="hljs-selector-class">.js</span> js/bar<span class="hljs-selector-class">.js</span>... -c</code></pre>
<p>UglifyJS会注意到这些常量。因为它们无法改变，所以它们会被认为是没被引用而被照样干掉。如果你用<code>const</code>声明，构建后还会被保留。如果你的运行环境低于ES6、不支持<code>const</code>，请用<code>var</code>声明加上<code>reduce_vars</code>设置（默认启用）来实现。</p>
<h4>编译条件语句API</h4>
<p>你也可以通过程序API来设置编译配置。其中有差别的是一个压缩器属性<code>global_defs</code>：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var result = UglifyJS.minify(fs.readFileSync(&quot;input.js&quot;, &quot;utf8&quot;), {
    compress: {
        dead_code: true,
        global_defs: {
            DEBUG: false
        }
    }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> result = UglifyJS.minify(fs.readFileSync(<span class="hljs-string">"input.js"</span>, <span class="hljs-string">"utf8"</span>), {
    <span class="hljs-attr">compress</span>: {
        <span class="hljs-attr">dead_code</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">global_defs</span>: {
            <span class="hljs-attr">DEBUG</span>: <span class="hljs-literal">false</span>
        }
    }
});</code></pre>
<p>在<code>global_defs</code>配<code>"@"</code>前缀的表达式，UglifyJS才会替换成语句表达式：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="UglifyJS.minify(&quot;alert('hello');&quot;, {
    compress: {
        global_defs: {
            &quot;@alert&quot;: &quot;console.log&quot;
        }
    }
}).code;
// returns: 'console.log(&quot;hello&quot;);'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">UglifyJS.minify(<span class="hljs-string">"alert('hello');"</span>, {
    <span class="hljs-attr">compress</span>: {
        <span class="hljs-attr">global_defs</span>: {
            <span class="hljs-string">"@alert"</span>: <span class="hljs-string">"console.log"</span>
        }
    }
}).code;
<span class="hljs-comment">// returns: 'console.log("hello");'</span></code></pre>
<p>否则会替换成字符串:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="UglifyJS.minify(&quot;alert('hello');&quot;, {
    compress: {
        global_defs: {
            &quot;alert&quot;: &quot;console.log&quot;
        }
    }
}).code;
// returns: '&quot;console.log&quot;(&quot;hello&quot;);'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">UglifyJS.minify(<span class="hljs-string">"alert('hello');"</span>, {
    <span class="hljs-attr">compress</span>: {
        <span class="hljs-attr">global_defs</span>: {
            <span class="hljs-string">"alert"</span>: <span class="hljs-string">"console.log"</span>
        }
    }
}).code;
<span class="hljs-comment">// returns: '"console.log"("hello");'</span></code></pre>
<h3 id="articleHeader43">使用<code>minify()</code>获得原生UglifyJS ast</h3>
<h3 id="articleHeader44">Using native Uglify AST with <code>minify()</code>
</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 例子: 只解析代码，获得原生Uglify AST

var result = UglifyJS.minify(code, {
    parse: {},
    compress: false,
    mangle: false,
    output: {
        ast: true,
        code: false  // optional - faster if false
    }
});

// result.ast 即是原生 Uglify AST" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 例子: 只解析代码，获得原生Uglify AST</span>

<span class="hljs-keyword">var</span> result = UglifyJS.minify(code, {
    <span class="hljs-attr">parse</span>: {},
    <span class="hljs-attr">compress</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">mangle</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">ast</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">code</span>: <span class="hljs-literal">false</span>  <span class="hljs-comment">// optional - faster if false</span>
    }
});

<span class="hljs-comment">// result.ast 即是原生 Uglify AST</span></code></pre>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="// 例子: 输入原生 Uglify AST，接着把它压缩并混淆，生成代码和原生ast

var result = UglifyJS.minify(ast, {
    compress: {},
    mangle: {},
    output: {
        ast: true,
        code: true  // 可选，false更快
    }
});

// result.ast 是原生 Uglify AST
// result.code 是字符串格式的最小化后的代码" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-comment">// 例子: 输入原生 Uglify AST，接着把它压缩并混淆，生成代码和原生ast</span>

<span class="hljs-keyword">var</span> result = UglifyJS.minify(ast, {
    <span class="hljs-attr">compress</span>: {},
    <span class="hljs-attr">mangle</span>: {},
    <span class="hljs-attr">output</span>: {
        <span class="hljs-attr">ast</span>: <span class="hljs-literal">true</span>,
        <span class="hljs-attr">code</span>: <span class="hljs-literal">true</span>  <span class="hljs-comment">// 可选，false更快</span>
    }
});

<span class="hljs-comment">// result.ast 是原生 Uglify AST</span>
<span class="hljs-comment">// result.code 是字符串格式的最小化后的代码</span></code></pre>
<h3 id="articleHeader45">使用 Uglify AST</h3>
<h3 id="articleHeader46">Working with Uglify AST</h3>
<p>可以通过<a href="http://lisperator.net/uglifyjs/walk" rel="nofollow noreferrer" target="_blank"><code>TreeWalker</code></a>和<a href="http://lisperator.net/uglifyjs/transform" rel="nofollow noreferrer" target="_blank"><code>TreeTransformer</code></a>分别横截（？transversal）和转换原生AST。</p>
<h3 id="articleHeader47">ESTree/SpiderMonkey AST</h3>
<p>UglifyJS有自己的抽象语法树格式；为了某些<a href="http://lisperator.net/blog/uglifyjs-why-not-switching-to-spidermonkey-ast/" rel="nofollow noreferrer" target="_blank">现实的原因</a><br>我们无法在内部轻易地改成使用SpiderMonkey AST。但UglifyJS现在有了一个可以输入SpiderMonkeyAST的转换器。<br>例如<a href="https://github.com/ternjs/acorn" rel="nofollow noreferrer" target="_blank">Acorn</a> ，这是一个超级快的生成SpiderMonkey AST的解释器。它带有一个实用的迷你CLI，能解释一个文件、把AST转存为JSON并标准输出。可以这样用UglifyJS来压缩混淆：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    acorn file.js | uglifyjs --spidermonkey -m -c" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">    acorn <span class="hljs-built_in">file</span>.js | uglifyjs <span class="hljs-comment">--spidermonkey -m -c</span></code></pre>
<p><code>-p --spidermonkey</code>选项能让UglifyJS知道输入文件并非JavaScript，而是SpiderMonkey AST生成的JSON代码。这事我们不用自己的解释器，只把AST转成我们内部AST。</p>
<h3 id="articleHeader48">使用 Acorn 来解释代码</h3>
<h3 id="articleHeader49">Use Acorn for parsing</h3>
<p>更有趣的是，我们加了 <code>-p --acorn</code>选项来使用Acorn解释所有代码。如果你传入这个选项，UglifyJS会<code>require("acorn")</code></p>
<p>Acorn确实非常快（650k代码原来要380ms，现在只需250ms），但转换Acorn产生的SpiderMonkey树会额外花费150ms。所以总共比UglifyJS自己的解释器还要多花一点时间。</p>
<h3 id="articleHeader50">Uglify Fast Minify Mode</h3>
<p>很少人知道，对大多数js代码而言，其实移除空格和混淆符号已经占了减少代码体积之中到的95%--不必细致地转换。简单地禁用<code>压缩compress</code>能加快UglifyJS的构建速度三四倍。我们可以比较一下<br><a href="https://www.npmjs.com/package/butternut" rel="nofollow noreferrer" target="_blank"><code>butternut</code></a>和只使用<code>混淆mangle</code>的模式的Uglify的压缩速度与gzip大小：<br><a href="https://www.npmjs.com/package/butternut" rel="nofollow noreferrer" target="_blank"><code>butternut</code></a>:</p>
<table>
<thead><tr>
<th>d3.js</th>
<th align="right">minify size</th>
<th align="right">gzip size</th>
<th align="right">minify time (seconds)</th>
</tr></thead>
<tbody>
<tr>
<td>original</td>
<td align="right">451,131</td>
<td align="right">108,733</td>
<td align="right">-</td>
</tr>
<tr>
<td>uglify-js@3.0.24 mangle=false, compress=false</td>
<td align="right">316,600</td>
<td align="right">85,245</td>
<td align="right">0.70</td>
</tr>
<tr>
<td>uglify-js@3.0.24 mangle=true, compress=false</td>
<td align="right">220,216</td>
<td align="right">72,730</td>
<td align="right">1.13</td>
</tr>
<tr>
<td>butternut@0.4.6</td>
<td align="right">217,568</td>
<td align="right">72,738</td>
<td align="right">1.41</td>
</tr>
<tr>
<td>uglify-js@3.0.24 mangle=true, compress=true</td>
<td align="right">212,511</td>
<td align="right">71,560</td>
<td align="right">3.36</td>
</tr>
<tr>
<td>babili@0.1.4</td>
<td align="right">210,713</td>
<td align="right">72,140</td>
<td align="right">12.64</td>
</tr>
</tbody>
</table>
<p>在CLI中，这样启用快速最小化模式:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="uglifyjs file.js -m" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stata"><code style="word-break: break-word; white-space: initial;">uglifyjs <span class="hljs-keyword">file</span>.js -<span class="hljs-built_in">m</span></code></pre>
<p>API这样用:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="UglifyJS.minify(code, { compress: false, mangle: true });" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js" style="word-break: break-word; white-space: initial;">UglifyJS.minify(code, { <span class="hljs-attr">compress</span>: <span class="hljs-literal">false</span>, <span class="hljs-attr">mangle</span>: <span class="hljs-literal">true</span> });</code></pre>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
UglifyJS3中文文档

## 原文链接
[https://segmentfault.com/a/1190000010874406](https://segmentfault.com/a/1190000010874406)

