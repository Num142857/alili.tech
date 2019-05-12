---
title: 'UglifyJS中文文档' 
date: 2019-01-17 2:30:25
hidden: true
slug: q522jummsvs
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">UglifyJS中文文档</h2>
<p>译者：李平海</p>
<p>转载请注明原文链接(<a href="https://github.com/LiPinghai/UglifyJSDocCN/blob/master/README.md" rel="nofollow noreferrer" target="_blank">https://github.com/LiPinghai/...</a> )与作者信息。</p>
<h2 id="articleHeader1">译序</h2>
<p>由于webpack本身集成了UglifyJS插件（webpack.optimize.UglifyJsPlugin），其命令<code>webpack -p</code>即表示调用UglifyJS来压缩代码，还有不少webpack插件如<code>html-webpack-plugin</code>也会默认使用UglifyJS。因此我们其实经常要用到它，但UglifyJS2本身配置较复杂/选项繁多，又没有中文文档，使用起来如坠云雾。鉴于此特翻译此文，谬误甚多，敬请斧正。</p>
<p>本文档译自<a href="https://github.com/mishoo/UglifyJS2" rel="nofollow noreferrer" target="_blank">UglifyJS2文档</a>。</p>
<p>另有<a href="https://segmentfault.com/a/1190000010874406">UglifyJS3中文文档在此</a></p>
<p><strong>喜欢的话请收藏、给个赞/star吧！谢谢！</strong></p>
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
option      选项
STDIN       标准输入，指在命令行中直接输入
STDOUT      标准输出
STDERR      标准错误输出
side effects函数副作用，即函数除了返回外还产生别的作用，比如改了全局变量" title="" data-original-title="复制"></span>
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
option      选项
<span class="hljs-literal">STDIN</span>       标准输入，指在命令行中直接输入
<span class="hljs-literal">STDOUT</span>      标准输出
<span class="hljs-literal">STDERR</span>      标准错误输出
side effects函数副作用，即函数除了返回外还产生别的作用，比如改了全局变量</code></pre>
<p>以下为正文：</p>
<h1 id="articleHeader2">UglifyJS 2</h1>
<p>UglifyJs 是一个js 解释器、最小化器、压缩器、美化器工具集（parser, minifier, compressor or beautifier toolkit）。</p>
<p>这个网页是命令行使用的文档，要看API和内部文档请到<a href="http://lisperator.net/uglifyjs/" rel="nofollow noreferrer" target="_blank">UglifyJS作者的网站</a>。<br>另外还有个<a href="http://lisperator.net/uglifyjs/#demo" rel="nofollow noreferrer" target="_blank">在线demo</a>(FF、chrome，safari可能也行)</p>
<h4>注意:</h4>
<ul>
<li>
<code>uglify-js</code>的发行版本只支持ES5，如果你要压缩ES6+代码请使用<a href="#harmony">兼容</a>开发分支</li>
<li>Node7有个已知的性能倒退问题——运行<code>uglify-js</code>两次导致很慢</li>
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
<p>用Git下载：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="git clone git://github.com/mishoo/UglifyJS2.git
cd UglifyJS2
npm link " title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>git <span class="hljs-keyword">clone</span> <span class="hljs-title">git</span>://github.com/mishoo/UglifyJS2.git
cd UglifyJS2
npm link </code></pre>
<h2 id="articleHeader4">使用</h2>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" uglifyjs [input files] [options]" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs vim"><code style="word-break: break-word; white-space: initial;"> uglifyjs [<span class="hljs-built_in">input</span> <span class="hljs-keyword">files</span>] [<span class="hljs-keyword">options</span>]</code></pre>
<p>UglifyJS2可以输入多文件。建议你先写输入文件，再传选项。UglifyJS会根据压缩选项，把文件放在队列中依次解释。所有文件都会在同一个全局域中，假如一个文件中的变量、方法被另一文件引用，UglifyJS会合理地匹配。</p>
<p>假如你不要输入文件，而是要输入字符串（STDIN），那就把文件名换成一个横线（-）</p>
<p>如果你想要把选项写在文件名的前面，那要在二者之前加上双横线，防止文件名被当成了选项：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" uglifyjs --compress --mangle -- input.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs brainfuck"><code style="word-break: break-word; white-space: initial;"> <span class="hljs-comment">uglifyjs</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">compress</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span><span class="hljs-comment">mangle</span> <span class="hljs-literal">-</span><span class="hljs-literal">-</span> <span class="hljs-comment">input</span><span class="hljs-string">.</span><span class="hljs-comment">js</span></code></pre>
<p>以下是可用的选项：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  --source-map                  指定输出的文件产生一份sourcemap 
  --source-map-root             此路径中的源码编译后会产生sourcemap
  --source-map-url              放在//#sourceMappingURL的sourcemap路径.  默认是 
                                --source-map传入的值.
  --source-map-include-sources  如果你要在sourcemap中加上源文件的内容作为sourcesContent属性，
                                就传这个参数吧。
  --source-map-inline           把sourcemap以base64格式附在输出文件结尾
  --in-source-map               输入sourcemap。假如的你要编译的JS是另外的源码编译出来的。
                                假如该sourcemap包含在js内，请指定&quot;inline&quot;。
  --screw-ie8                   是否要支持IE6/7/8。UglifyJS默认不兼容IE。
  --support-ie8                 是否要支持IE6/7/8，等同于在`compress`, `mangle` 和
                                 `output`选项中都设置`screw_ie8: false`
  --expr                        编译一个表达式，而不是编译一段代码（编译JSON时用）
  -p, --prefix                  忽略sourcemap中源码的前缀。例如`-p 3`会干掉文件名前面3层目录
                                以及保证路径是相对路径。你也可以指定`-p relative`,让UglifyJS
                                自己计算输出文件、sourcemap与源码之间的相对路径。
  -o, --output                  输出文件，默认标准输出(STDOUT)
  -b, --beautify                美化输出/指定输出 选项
  -m, --mangle                  Mangle的名字，或传入一个mangler选项.
  -r, --reserved                mangle的例外，不包含在mangling的名字
  -c, --compress                是否启用压缩功能（true/fasle），或者传一个压缩选项对象, 例如 
                                `-c 'if_return=false,pure_funcs=[&quot;Math.pow&quot;,&quot;console.log&quot;]'`，
                                `-c`不带参数的话就是用默认的压缩设置。
  -d, --define                  全局定义
  -e, --enclose                 所有代码嵌入到一个大方法中，传入参数为配置项
  --comments                    保留版权注释。默认保留Google Closure那样的，保留JSDoc-style、
                                包含&quot;@license&quot; 或&quot;@preserve&quot;字样的注释。你也可以传下面的参数:
                                - &quot;all&quot; 保留所有注释
                                - 正则（如`/foo/`、`/^!/`）保留匹配到的。要注意，如果启用了压
                                缩，因为会移除不可达代码以及压缩连续声明，因此不是*所有*注释都能
                                保留下来。
  --preamble                    在输出文件开头插入的前言。你可以插入一段注释，例如版权信息。
                                这些不会被编译，但sourcemap会改成当前的样子。
  --stats                       在STDERR中显示操作运行时间。
  --acorn                       用 Acorn解析。
  --spidermonkey                假如输入文件是 SpiderMonkey AST 格式(像JSON).
  --self                        把UglifyJS2本身也构建成一个依赖包
                                (等同于`--wrap=UglifyJS --export-all`)
  --wrap                        所有代码嵌入到一个大函数中,让&quot;exports&quot;和&quot;global&quot;变量有效，
                                你需要传入一个参数指定模块被浏览器引入时的名字。
  --export-all                  只当`--wrap`时有效,告诉UglifyJS自动把代码暴露到全局。
  --lint                        显示一些可视警告
  -v, --verbose                 Verbose
  -V, --version                 打印版本号.
  --noerr                       不要为-c,-b 或 -m选项中出现未知选项而抛出错误。
  --bare-returns                允许返回函数的外部。当最小化CommonJs模块和Userscripts时，
                                可能匿名函数会被.user.js引擎调用立即执行（IIFE）
  --keep-fnames                 不要混淆、干掉的函数的名字。当代码依赖Function.prototype.name时有用。
  --reserved-file               要保留的文件的名字
  --reserve-domprops            保留（绝大部分？）DOM的属性，当--mangle-props
  --mangle-props                混淆属性，默认是`0`.设置为`true`或`1`则会混淆所有属性名。
                                设为`unquoted`或 `2`则只混淆不在引号内的属性。`2`时也会让
                                `keep_quoted_props` 美化选项生效，保留括号内的属性；让压缩选项
                                的`properties`失效，阻止覆写带点号（.）的属性。你可以通过在命令
                                中明确设置来覆写它们。
  --mangle-regex                混淆正则，只混淆匹配到的属性名。
  --name-cache                  用来保存混淆map的文件
  --pure-funcs                  假如返回值没被调用则可以安全移除的函数。 
                                例如`--pure-funcs Math.floor console.info`(需要设置 `--compress`)" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs haml"><code>  -<span class="ruby">-source-map                  指定输出的文件产生一份sourcemap 
</span>  -<span class="ruby">-source-map-root             此路径中的源码编译后会产生sourcemap
</span>  -<span class="ruby">-source-map-url              放在/<span class="hljs-regexp">/#sourceMappingURL的sourcemap路径.  默认是 
</span></span>                                -<span class="ruby"><span class="hljs-regexp">-source-map传入的值.
</span></span>  -<span class="ruby"><span class="hljs-regexp">-source-map-include-sources  如果你要在sourcemap中加上源文件的内容作为sourcesContent属性，
</span></span>                                就传这个参数吧。
  -<span class="ruby"><span class="hljs-regexp">-source-map-inline           把sourcemap以base64格式附在输出文件结尾
</span></span>  -<span class="ruby"><span class="hljs-regexp">-in-source-map               输入sourcemap。假如的你要编译的JS是另外的源码编译出来的。
</span></span>                                假如该sourcemap包含在js内，请指定"inline"。
  -<span class="ruby"><span class="hljs-regexp">-screw-ie8                   是否要支持IE6/</span><span class="hljs-number">7</span>/<span class="hljs-number">8</span>。UglifyJS默认不兼容IE。
</span>  -<span class="ruby">-support-ie8                 是否要支持IE6/<span class="hljs-number">7</span>/<span class="hljs-number">8</span>，等同于在<span class="hljs-string">`compress`</span>, <span class="hljs-string">`mangle`</span> 和
</span>                                 `output`选项中都设置`screw_ie8: false`
  -<span class="ruby">-expr                        编译一个表达式，而不是编译一段代码（编译JSON时用）
</span>  -<span class="ruby">p, --prefix                  忽略sourcemap中源码的前缀。例如<span class="hljs-string">`-p 3`</span>会干掉文件名前面<span class="hljs-number">3</span>层目录
</span>                                以及保证路径是相对路径。你也可以指定`-p relative`,让UglifyJS
                                自己计算输出文件、sourcemap与源码之间的相对路径。
  -<span class="ruby">o, --output                  输出文件，默认标准输出(STDOUT)
</span>  -<span class="ruby">b, --beautify                美化输出/指定输出 选项
</span>  -<span class="ruby">m, --mangle                  Mangle的名字，或传入一个mangler选项.
</span>  -<span class="ruby">r, --reserved                mangle的例外，不包含在mangling的名字
</span>  -<span class="ruby">c, --compress                是否启用压缩功能（<span class="hljs-literal">true</span>/fasle），或者传一个压缩选项对象, 例如 
</span>                                `-c 'if_return=false,pure_funcs=["Math.pow","console.log"]'`，
                                `-c`不带参数的话就是用默认的压缩设置。
  -<span class="ruby">d, --define                  全局定义
</span>  -<span class="ruby">e, --enclose                 所有代码嵌入到一个大方法中，传入参数为配置项
</span>  -<span class="ruby">-comments                    保留版权注释。默认保留Google Closure那样的，保留JSDoc-style、
</span>                                包含"@license" 或"@preserve"字样的注释。你也可以传下面的参数:
                                -<span class="ruby"> <span class="hljs-string">"all"</span> 保留所有注释
</span>                                -<span class="ruby"> 正则（如<span class="hljs-string">`/foo/`</span>、<span class="hljs-string">`/^!/`</span>）保留匹配到的。要注意，如果启用了压
</span>                                缩，因为会移除不可达代码以及压缩连续声明，因此不是*所有*注释都能
                                保留下来。
  -<span class="ruby">-preamble                    在输出文件开头插入的前言。你可以插入一段注释，例如版权信息。
</span>                                这些不会被编译，但sourcemap会改成当前的样子。
  -<span class="ruby">-stats                       在STDERR中显示操作运行时间。
</span>  -<span class="ruby">-acorn                       用 Acorn解析。
</span>  -<span class="ruby">-spidermonkey                假如输入文件是 SpiderMonkey AST 格式(像JSON).
</span>  -<span class="ruby">-<span class="hljs-keyword">self</span>                        把UglifyJS2本身也构建成一个依赖包
</span>                                (等同于`--wrap=UglifyJS --export-all`)
  -<span class="ruby">-wrap                        所有代码嵌入到一个大函数中,让<span class="hljs-string">"exports"</span>和<span class="hljs-string">"global"</span>变量有效，
</span>                                你需要传入一个参数指定模块被浏览器引入时的名字。
  -<span class="ruby">-export-all                  只当<span class="hljs-string">`--wrap`</span>时有效,告诉UglifyJS自动把代码暴露到全局。
</span>  -<span class="ruby">-lint                        显示一些可视警告
</span>  -<span class="ruby">v, --verbose                 Verbose
</span>  -<span class="ruby">V, --version                 打印版本号.
</span>  -<span class="ruby">-noerr                       不要为-c,-b 或 -m选项中出现未知选项而抛出错误。
</span>  -<span class="ruby">-bare-returns                允许返回函数的外部。当最小化CommonJs模块和Userscripts时，
</span>                                可能匿名函数会被.user.js引擎调用立即执行（IIFE）
  -<span class="ruby">-keep-fnames                 不要混淆、干掉的函数的名字。当代码依赖Function.prototype.name时有用。
</span>  -<span class="ruby">-reserved-file               要保留的文件的名字
</span>  -<span class="ruby">-reserve-domprops            保留（绝大部分？）DOM的属性，当--mangle-props
</span>  -<span class="ruby">-mangle-props                混淆属性，默认是<span class="hljs-string">`0`</span>.设置为<span class="hljs-string">`true`</span>或<span class="hljs-string">`1`</span>则会混淆所有属性名。
</span>                                设为`unquoted`或 `2`则只混淆不在引号内的属性。`2`时也会让
                                `keep_quoted_props` 美化选项生效，保留括号内的属性；让压缩选项
                                的`properties`失效，阻止覆写带点号（.）的属性。你可以通过在命令
                                中明确设置来覆写它们。
  -<span class="ruby">-mangle-regex                混淆正则，只混淆匹配到的属性名。
</span>  -<span class="ruby">-name-cache                  用来保存混淆map的文件
</span>  -<span class="ruby">-pure-funcs                  假如返回值没被调用则可以安全移除的函数。 
</span>                                例如`--pure-funcs Math.floor console.info`(需要设置 `--compress`)</code></pre>
<p>指定<code>--output</code> (<code>-o</code>)来明确输出文件，否则将在终端输出（STDOUT）</p>
<h2 id="articleHeader5">sourcemap选项</h2>
<h2 id="articleHeader6">Source map options</h2>
<p>UglifyJS2可以生成一份sourcemap文件，这对调试你压缩后的JS代码非常有用。传<code>--source-map output.js.map</code>（完整路径）来获取sorcemap文件。</p>
<p>另外，你可能要设置<code>--source-map-root</code>传入源码所在的根目录。为了防止出现整个路径，你可以用<code>--prefix</code> (<code>-p</code>)指定干掉几层soucemap中路径的前缀。</p>
<p>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="uglifyjs /home/doe/work/foo/src/js/file1.js \
          /home/doe/work/foo/src/js/file2.js \
          -o foo.min.js \
          --source-map foo.min.js.map \
          --source-map-root http://foo.com/src \
          -p 5 -c -m" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code>uglifyjs /home/doe/work/foo/src/js/file1<span class="hljs-selector-class">.js</span> \
          /home/doe/work/foo/src/js/file2<span class="hljs-selector-class">.js</span> \
          -o foo<span class="hljs-selector-class">.min</span><span class="hljs-selector-class">.js</span> \
          --source-map foo<span class="hljs-selector-class">.min</span><span class="hljs-selector-class">.js</span><span class="hljs-selector-class">.map</span> \
          --source-map-root http:<span class="hljs-comment">//foo.com/src \</span>
          -<span class="hljs-selector-tag">p</span> <span class="hljs-number">5</span> -c -m</code></pre>
<p>上述配置会压缩和混淆<code>file1.js</code>、<code>file2.js</code>，输出文件<code>foo.min.js</code> 和sourcemap<code>foo.min.js.map</code>，sourcemap会建立<code>http://foo.com/src/js/file1.js</code>、<br><code>http://foo.com/src/js/file2.js</code>的映射。（实际上，sourcemap根目录是<code>http://foo.com/src</code>，所以相当于源文件路径是<code>js/file1.js</code>、<code>js/file2.js</code>）</p>
<h3 id="articleHeader7">关联sourcemap</h3>
<p>假如你的JS代码是用其他编译器（例如coffeescript）生成的，那么映射到JS代码就没什么用了，你肯定希望映射到CoffeeScript源码。UglifyJS有一个选项可以输入sourcemap，假如你有一个从CoffeeScript → 编译后JS的map的话，UglifyJS可以生成一个从CoffeeScript-&gt;压缩后JS的map映射到源码位置。</p>
<p>你可以传入 <code>--in-source-map /path/to/input/source.map</code>来尝试此特性，如果sourcemap包含在js内，则写<code>--in-source-map inline</code> 。通常输入的sourcemap会指向源代码生成的JS，所以你可以忽略不写输入文件。</p>
<h2 id="articleHeader8">混淆选项</h2>
<h2 id="articleHeader9">Mangler options</h2>
<p>你需要传入<code>--mangle</code> (<code>-m</code>)来使启用混淆功能。支持用逗号隔开选项：</p>
<ul>
<li>
<code>toplevel</code> — 混淆在最高作用域中声明的变量名（默认disabled）</li>
<li>
<code>eval</code> - 混淆在<code>eval</code> 或 <code>with</code>作用域出现的变量名（默认disabled）</li>
</ul>
<p>当启用混淆功能时，如果你希望保留一些名字不被混淆，你可以用<code>--reserved</code> (<code>-r</code>) 声明一些名字，用逗号隔开。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text=" uglifyjs ... -m -r '$,require,exports'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs clean"><code style="word-break: break-word; white-space: initial;"> uglifyjs ... -m -r <span class="hljs-string">'$,require,exports'</span></code></pre>
<p>防止<code>require</code>, <code>exports</code>和 <code>$</code>被混淆改变。</p>
<h3 id="articleHeader10">混淆属性名 (<code>--mangle-props</code>)</h3>
<p><strong>警告：</strong>这能会搞崩你的代码。混淆属性名跟混淆变量名不一样，是相互独立的。传入<code>--mangle-props</code>会混淆对象所有可见的属性名。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var x = {
  foo: 1
};

x.bar = 2;
x[&quot;baz&quot;] = 3;
x[condition ? &quot;moo&quot; : &quot;boo&quot;] = 4;
console.log(x.something());" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js"><span class="hljs-keyword">var</span> x = {
  <span class="hljs-attr">foo</span>: <span class="hljs-number">1</span>
};

x.bar = <span class="hljs-number">2</span>;
x[<span class="hljs-string">"baz"</span>] = <span class="hljs-number">3</span>;
x[condition ? <span class="hljs-string">"moo"</span> : <span class="hljs-string">"boo"</span>] = <span class="hljs-number">4</span>;
<span class="hljs-built_in">console</span>.log(x.something());</code></pre>
<p>上面代码中，<code>foo</code>, <code>bar</code>, <code>baz</code>, <code>moo</code> 、 <code>boo</code>会被替换成单字符名字，<code>something()</code>则不变。</p>
<p>为了合理地使用，我们应该避免混淆一些JS标准的名字。比如，如果你代码中有<code>x.length = 10</code>，那<code>length</code>就将被混淆，不管这是在对象中还是访问数组的长度，它都被干掉。为了避免这种情况，你可以用 <code>--reserved-file</code>来输入一个文件，里面包含不参与混淆的名字，变量名或属性名都行。就像下面这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="{
  &quot;vars&quot;: [ &quot;define&quot;, &quot;require&quot;, ... ],
  &quot;props&quot;: [ &quot;length&quot;, &quot;prototype&quot;, ... ]
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">{
  <span class="hljs-string">"vars"</span>: [ <span class="hljs-string">"define"</span>, <span class="hljs-string">"require"</span>, ... ],
  <span class="hljs-string">"props"</span>: [ <span class="hljs-string">"length"</span>, <span class="hljs-string">"prototype"</span>, ... ]
}</code></pre>
<p><code>--reserved-file</code> 可以是文件名数组（用逗号隔开，你也可以传多个<code>--reserved-file</code>），在上面例子中的名字将被排除在混淆中。<br><code>tools/domprops.json</code> 里有一个默认的排除名单，包括绝大部分标准JS和多种浏览器中的DOM属性名。传入<code>--reserve-domprops</code> 可以读取此名单生效。</p>
<p>你也可以用正则表达式来定义一些应该被混淆的属性名。例如<code>--mangle-regex="/^_/"</code>，会只混淆以下划线开始的属性名。</p>
<p>当你压缩多个文件时，为了保证让它们最终能同时工作，我们要让他们中同样的属性名混淆成相同的结果。传入`--name-cache<br>filename.json`，UglifyJS会维护一个共同的映射供他们复用。这个json一开始应该是空的，例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="rm -f /tmp/cache.json  # start fresh
uglifyjs file1.js file2.js --mangle-props --name-cache /tmp/cache.json -o part1.js
uglifyjs file3.js file4.js --mangle-props --name-cache /tmp/cache.json -o part2.js" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dsconfig"><code><span class="hljs-string">rm </span>-f /<span class="hljs-string">tmp/</span><span class="hljs-string">cache.</span><span class="hljs-string">json </span> <span class="hljs-comment"># start fresh</span>
<span class="hljs-string">uglifyjs </span><span class="hljs-string">file1.</span><span class="hljs-string">js </span><span class="hljs-string">file2.</span><span class="hljs-string">js </span><span class="hljs-built_in">--mangle-props</span> <span class="hljs-built_in">--name-cache</span> /<span class="hljs-string">tmp/</span><span class="hljs-string">cache.</span><span class="hljs-string">json </span>-o <span class="hljs-string">part1.</span><span class="hljs-string">js
</span><span class="hljs-string">uglifyjs </span><span class="hljs-string">file3.</span><span class="hljs-string">js </span><span class="hljs-string">file4.</span><span class="hljs-string">js </span><span class="hljs-built_in">--mangle-props</span> <span class="hljs-built_in">--name-cache</span> /<span class="hljs-string">tmp/</span><span class="hljs-string">cache.</span><span class="hljs-string">json </span>-o <span class="hljs-string">part2.</span><span class="hljs-string">js</span></code></pre>
<p>现在，<code>part1.js</code> 和 <code>part2.js</code>会知晓对方混淆的属性名。</p>
<p>假如你把所有文件压缩成同一个文件，那就不需要启用名字缓存了。</p>
<h4>混淆括号中的名字(<code>--mangle-props=unquoted</code>或 <code>--mangle-props=2</code>)</h4>
<p>使用括号属性名 (<code>o["foo"]</code>)以保留属性名(<code>foo</code>)。这会让整个脚本中其余此属性的引用(<code>o.foo</code>)也不被混淆。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="$ echo 'var o={&quot;foo&quot;:1, bar:3}; o.foo += o.bar; console.log(o.foo);' | uglifyjs --mangle-props=2 -mc
var o={&quot;foo&quot;:1,a:3};o.foo+=o.a,console.log(o.foo);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs maxima"><code>$ echo '<span class="hljs-built_in">var</span> o={<span class="hljs-string">"foo"</span>:<span class="hljs-number">1</span>, bar:<span class="hljs-number">3</span>}; o.foo += o.bar; console.<span class="hljs-built_in">log</span>(o.foo);' | uglifyjs --mangle-<span class="hljs-built_in">props</span>=<span class="hljs-number">2</span> -mc
<span class="hljs-built_in">var</span> o={<span class="hljs-string">"foo"</span>:<span class="hljs-number">1</span>,a:<span class="hljs-number">3</span>};o.foo+=o.a,console.<span class="hljs-built_in">log</span>(o.foo);</code></pre>
<h4>调试属性名混淆</h4>
<p>为了混淆属性时不至于完全糊涂，你可以传入<code>--mangle-props-debug</code>来调试。例如<code>o.foo</code>会被混淆成<code>o._$foo$_</code>。这让源码大量、属性被混淆时也可以debug，可以看清混淆会把哪些属性搞乱。</p>
<p>你可以用<code>--mangle-props-debug=XYZ</code>来传入自定义后缀。让<code>o.foo</code> 混淆成 <code>o._$foo$XYZ_</code>， 你可以在每次编译是都改变一下，来辨清属性名怎么被混淆的。一个小技巧，你可以每次编译时传随机数来模仿混淆操作（例如你更新了脚本，有了新的属性名），这有助于识别混淆时的出错。</p>
<h2 id="articleHeader11">压缩器选项</h2>
<h2 id="articleHeader12">Compressor options</h2>
<p>你要传入 <code>--compress</code> (<code>-c</code>)来启用压缩功能。你可以用逗号隔开选项。选项的形式为<code>foo=bar</code>,或者就<code>foo</code>（后者等同于你要设为<code>true</code>，相当于<code>foo=true</code>的缩写）。</p>
<ul>
<li>
<code>sequences</code>(默认true) -- 连续声明变量，用逗号隔开来。可以设置为正整数来指定连续声明的最大长度。如果设为<code>true</code> 表示默认<code>200</code>个，设为<code>false</code>或<code>0</code>则禁用。 <code>sequences</code>至少要是<code>2</code>,<code>1</code>的话等同于<code>true</code>（即<code>200</code>)。默认的sequences设置有极小几率会导致压缩很慢，所以推荐设置成<code>20</code>或以下。</li>
<li>
<code>properties</code> -- 用<code>.</code>来重写属性引用，例如<code>foo["bar"] → foo.bar</code>
</li>
<li>
<code>dead_code</code> -- 移除没被引用的代码</li>
<li>
<code>drop_debugger</code> -- 移除 <code>debugger;</code>
</li>
<li>
<code>unsafe</code> (默认 false) -- 使用 "unsafe"转换 (下面详述)</li>
<li>
<code>unsafe_comps</code> (默认 false) -- 保留<code>&lt;</code> 和 <code>&lt;=</code>不被换成 <code>&gt;</code> 和 <code>&gt;=</code>。假如某些运算对象是用<code>get</code>或 <code>valueOf</code>object得出的时候，转换可能会不安全，可能会引起运算对象的改变。此选项只有当 <code>comparisons</code>和<code>unsafe_comps</code> 都设为true时才会启用。</li>
<li>
<code>unsafe_math</code> (默认 false) -- 优化数字表达式，例如<code>2 * x * 3</code> 变成 <code>6 * x</code>, 可能会导致不精确的浮点数结果。</li>
<li>
<code>unsafe_proto</code> (默认 false) -- 把<code>Array.prototype.slice.call(a)</code> 优化成 <code>[].slice.call(a)</code>
</li>
<li>
<code>conditionals</code> -- 优化<code>if</code>等判断以及条件选择</li>
<li>
<code>comparisons</code> --  把结果必然的运算优化成二元运算，例如<code>!(a &lt;= b) → a &gt; b</code> (只有设置了 <code>unsafe_comps</code>时才生效)；尽量转成否运算。例如 <code>a = !b &amp;&amp; !c &amp;&amp; !d &amp;&amp; !e → a=!(b||c||d||e)</code>
</li>
<li>
<code>evaluate</code> -- 尝试计算常量表达式</li>
<li>
<code>booleans</code> -- 优化布尔运算，例如 <code>!!a? b : c → a ? b : c</code>
</li>
<li>
<code>loops</code> -- 当<code>do</code>、<code>while</code> 、 <code>for</code>循环的判断条件可以确定是，对其进行优化。</li>
<li>
<code>unused</code> -- 干掉没有被引用的函数和变量。（除非设置<code>"keep_assign"</code>，否则变量的简单直接赋值也不算被引用。）</li>
<li>
<code>toplevel</code> -- 干掉顶层作用域中没有被引用的函数 (<code>"funcs"</code>)和/或变量(<code>"vars"</code>) (默认是<code>false</code> , <code>true</code> 的话即函数变量都干掉)</li>
<li>
<code>top_retain</code> -- 当设了<code>unused</code>时，保留顶层作用域中的某些函数变量。(可以写成数组，用逗号隔开，也可以用正则或函数. 参考<code>toplevel</code>)</li>
<li>
<code>hoist_funs</code> -- 提升函数声明</li>
<li>
<code>hoist_vars</code> (默认 false) -- 提升 <code>var</code> 声明 (默认是<code>false</code>,因为那会加大文件的size)</li>
<li>
<code>if_return</code> -- 优化 if/return 和 if/continue</li>
<li>
<code>join_vars</code> -- 合并连续 <code>var</code> 声明</li>
<li>
<code>cascade</code> -- 弱弱地优化一下连续声明, 将 <code>x, x</code> 转成 <code>x</code>，<code>x = something(), x</code> 转成 <code>x = something()</code>
</li>
<li>
<code>collapse_vars</code> -- 当 <code>var</code> 和 <code>const</code> 单独使用时尽量合并</li>
<li>
<code>reduce_vars</code> -- 优化某些变量实际上是按常量值来赋值、使用的情况。</li>
<li>
<code>warnings</code> -- 当删除没有用处的代码时，显示警告</li>
<li>
<code>negate_iife</code> -- 当立即执行函数（IIFE）的返回值没用时，取消之。避免代码生成器会插入括号。</li>
<li>
<code>pure_getters</code> -- 默认是 <code>false</code>. 如果你传入<code>true</code>，UglifyJS会假设对象属性的引用（例如<code>foo.bar</code> 或 <code>foo["bar"]</code>）没有函数副作用。</li>
<li>
<code>pure_funcs</code> -- 默认 <code>null</code>. 你可以传入一个名字的数组，UglifyJS会假设这些函数没有函数副作用。<strong>警告：</strong>假如名字在作用域中重新定义，不会再次检测。例如<code>var q = Math.floor(a/b)</code>，假如变量<code>q</code>没有被引用，UglifyJS会干掉它，但 <code>Math.floor(a/b)</code>会被保留，没有人知道它是干嘛的。你可以设置<code>pure_funcs: [ 'Math.floor' ]</code> ，这样该函数会被认为没有函数副作用，这样整个声明会被废弃。在目前的执行情况下，会增加开销（压缩会变慢）。</li>
<li>
<code>drop_console</code> -- 默认 <code>false</code>.  传<code>true</code>的话会干掉<code>console.*</code>函数。如果你要干掉特定的函数比如<code>console.info</code> ，又想删掉后保留其参数中的副作用，那用<code>pure_funcs</code>来处理吧。</li>
<li>
<code>expression</code> -- 默认 <code>false</code>。传<code>true</code>来保留终端语句中没有"return"的完成值。例如在bookmarklets。</li>
<li>
<code>keep_fargs</code> -- 默认<code>true</code>。阻止压缩器干掉那些没有用到的函数参数。你需要它来保护某些依赖<code>Function.length</code>的函数。</li>
<li>
<code>keep_fnames</code> -- 默认 <code>false</code>。传 <code>true</code>来防止压缩器干掉函数名。对那些依赖<code>Function.prototype.name</code>的函数很有用。延展阅读：<code>keep_fnames</code> <a href="#mangle">混淆选项</a>.</li>
<li>
<code>passes</code> -- 默认 <code>1</code>。运行压缩的次数。在某些情况下，用一个大于1的数字参数可以进一步压缩代码大小。注意：数字越大压缩耗时越长。</li>
<li>
<code>keep_infinity</code> -- 默认 <code>false</code>。传<code>true</code>以防止压缩时把<code>1/0</code>转成<code>Infinity</code>，那可能会在chrome上有性能问题。</li>
</ul>
<h3 id="articleHeader13">
<code>unsafe</code>选项</h3>
<p>在某些刻意营造的案例中，启用某些转换<strong>有可能</strong>会打断代码的逻辑，但绝大部分情况下是安全的。你可能会想尝试一下，因为这毕竟会减少文件体积。以下是某些例子：</p>
<ul>
<li>
<code>new Array(1, 2, 3)</code> 或 <code>Array(1, 2, 3)</code> → <code>[ 1, 2, 3 ]</code>
</li>
<li>
<code>new Object()</code> → <code>{}</code>
</li>
<li>
<code>String(exp)</code> 或 <code>exp.toString()</code> → <code>"" + exp</code>
</li>
<li>
<code>new Object/RegExp/Function/Error/Array (...)</code> → 我们干掉用<code>new</code>的</li>
<li>
<code>typeof foo == "undefined"</code> → <code>foo === void 0</code>
</li>
<li>
<code>void 0</code> → <code>undefined</code> (假如作用域中有一个变量名叫"undefined";我们这么做是因为变量名会被混淆成单字符）</li>
</ul>
<h3 id="articleHeader14">编译条件语句</h3>
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
<p>构建使用这样写：</p>
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
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="uglifyJS.minify([ &quot;input.js&quot;], {
  compress: {
      dead_code: true,
      global_defs: {
          DEBUG: false
      }
  }
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="js">uglifyJS.minify([ <span class="hljs-string">"input.js"</span>], {
  <span class="hljs-attr">compress</span>: {
      <span class="hljs-attr">dead_code</span>: <span class="hljs-literal">true</span>,
      <span class="hljs-attr">global_defs</span>: {
          <span class="hljs-attr">DEBUG</span>: <span class="hljs-literal">false</span>
      }
  }
});</code></pre>
<h2 id="articleHeader15">美化器选项</h2>
<h2 id="articleHeader16">Beautifier options</h2>
<p>代码生成器默认会输出尽量简短的代码。假如你想美化一下输出代码，请设置<code>--beautify</code> (<code>-b</code>)。你可以传入更多可选的选项参数来控制代码生成：</p>
<ul>
<li>
<code>beautify</code> (默认 <code>true</code>) -- 是否美化输出代码。传<code>-b</code>的话就是设成true。假如你想生成最小化的代码同时又要用其他设置来美化代码，你可以设<code>-b beautify=false</code>。</li>
<li>
<code>indent-level</code> (默认 4) 缩进格数</li>
<li>
<code>indent-start</code> (默认 0) -- 每行前面加几个空格</li>
<li>
<code>quote-keys</code> (默认 <code>false</code>) -- 传<code>true</code>的话会在对象所有的键加上括号</li>
<li>
<code>space-colon</code> (默认 <code>true</code>) -- 在冒号后面加空格</li>
<li>
<code>ascii-only</code> (默认 <code>false</code>) -- 避免Unicode字符在字符串/正则中出现（非ascii字符会变不合法）。</li>
<li>
<code>inline-script</code> (默认 <code>false</code>) -- 避免字符串中出现<code>&lt;/script</code>中的斜杠</li>
<li>
<code>width</code> (默认 80) -- 仅在美化时生效，设定一个行宽让美化器尽量实现。这会影响行中文字的数量（不包括缩进）。当前本功能实现得不是非常好，但依然让美化后的代码可读性大大增强。</li>
<li>
<code>max-line-len</code> (默认 32000) -- 最大行宽（压缩后的代码）</li>
<li>
<code>bracketize</code> (默认 <code>false</code>) -- 永远在<code>if</code>, <code>for</code>,<code>do</code>, <code>while</code>, <code>with</code>后面加上大括号，即使循环体只有一句。</li>
<li>
<code>semicolons</code> (默认 <code>true</code>) -- 用分号分开多个声明。如果你传<code>false</code>,则总会另起一行，增强输出文件的可读性。（gzip前体积更小，gzip后稍大一点点）</li>
<li>
<code>preamble</code> (默认 <code>null</code>) -- 如果要传的话，必须是字符串。它会被加在输出文档的前面。sourcemap会随之调整。例如可以用来插入版权信息。</li>
<li>
<code>quote_style</code> (默认 <code>0</code>) -- 影响字符串的括号格式（也会影响属性名和指令）。</li>
<li>
<code>0</code> -- 倾向使用双引号，字符串里还有引号的话就是单引号。</li>
<li>
<code>1</code> -- 永远单引号</li>
<li>
<code>2</code> -- 永远双引号</li>
<li>
<code>3</code> -- 永远是本来的引号</li>
<li>
<code>keep_quoted_props</code> (默认 <code>false</code>) -- 如果启用，会保留属性名的引号。</li>
</ul>
<h3 id="articleHeader17">保留版权告示和其他注释</h3>
<p>你可以传入<code>--comments</code>让输出文件中保留某些注释。默认时会保留JSDoc-style的注释（包含"@preserve","@license" 或 "@cc_on"（为IE所编译））。你可以传入<code>--comments all</code>来保留全部注释，或者传一个合法的正则来保留那些匹配到的注释。例如<code>--comments '/foo|bar/'</code>会保留那些包含"foo" 或 "bar"的注释。 </p>
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
<h2 id="articleHeader18">对SpiderMonkey的支持</h2>
<p>UglifyJS2有自己的抽象语法树格式；为了某些<a href="http://lisperator.net/blog/uglifyjs-why-not-switching-to-spidermonkey-ast/" rel="nofollow noreferrer" target="_blank">现实的原因</a><br>我们无法在内部轻易地改成使用SpiderMonkey抽象语法树(AST)。但UglifyJS现在有了一个可以输入SpiderMonkeyAST的转换器。<br>例如<a href="https://github.com/ternjs/acorn" rel="nofollow noreferrer" target="_blank">Acorn</a> ，这是一个超级快的生成SpiderMonkey AST的解释器。它带有一个实用的迷你CLI，能解释一个文件、把AST转存为JSON并标准输出。可以这样用UglifyJS来压缩混淆：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="    acorn file.js | uglifyjs --spidermonkey -m -c" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code style="word-break: break-word; white-space: initial;">    acorn <span class="hljs-built_in">file</span>.js | uglifyjs <span class="hljs-comment">--spidermonkey -m -c</span></code></pre>
<p><code>--spidermonkey</code>选项能让UglifyJS知道输入文件并非JavaScript，而是SpiderMonkey AST生成的JSON代码。这事我们不用自己的解释器，只把AST转成我们内部AST。</p>
<h3 id="articleHeader19">使用 Acorn 来解释代码</h3>
<p>更有趣的是，我们加了 <code>--acorn</code>选项来使用Acorn解释所有代码。如果你传入这个选项，UglifyJS会<code>require("acorn")</code></p>
<p>Acorn确实非常快（650k代码原来要380ms，现在只需250ms），但转换Acorn产生的SpiderMonkey树会额外花费150ms。所以总共比UglifyJS自己的解释器还要多花一点时间。</p>
<h3 id="articleHeader20">使用 UglifyJS 转换 SpiderMonkey AST</h3>
<p>现在你可以像使用其他中间工具一样使用UglifyJS将JS抽象语法树转换为SpiderMonkey格式。</p>
<p>例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="function uglify(ast, options, mangle) {
  // 把SpiderMonkey AST 转成中间格式
  var uAST = UglifyJS.AST_Node.from_mozilla_ast(ast);

  // 压缩
  uAST.figure_out_scope();
  uAST = UglifyJS.Compressor(options).compress(uAST);

  // 混淆 (可选)
  if (mangle) {
    uAST.figure_out_scope();
    uAST.compute_char_frequency();
    uAST.mangle_names();
  }

  // 转回 SpiderMonkey AST
  return uAST.to_mozilla_ast();
}" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">uglify</span>(<span class="hljs-params">ast, options, mangle</span>) </span>{
  <span class="hljs-comment">// 把SpiderMonkey AST 转成中间格式</span>
  <span class="hljs-keyword">var</span> uAST = UglifyJS.AST_Node.from_mozilla_ast(ast);

  <span class="hljs-comment">// 压缩</span>
  uAST.figure_out_scope();
  uAST = UglifyJS.Compressor(options).compress(uAST);

  <span class="hljs-comment">// 混淆 (可选)</span>
  <span class="hljs-keyword">if</span> (mangle) {
    uAST.figure_out_scope();
    uAST.compute_char_frequency();
    uAST.mangle_names();
  }

  <span class="hljs-comment">// 转回 SpiderMonkey AST</span>
  <span class="hljs-keyword">return</span> uAST.to_mozilla_ast();
}</code></pre>
<p><a href="http://rreverser.com/using-mozilla-ast-with-uglifyjs/" rel="nofollow noreferrer" target="_blank">原博文</a>有更多细节。</p>
<h2 id="articleHeader21">API参考</h2>
<p>假如是通过NPM安装的，你可以这样在你的应用中加载UglifyJS：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var UglifyJS = require(&quot;uglify-js&quot;);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> UglifyJS = <span class="hljs-built_in">require</span>(<span class="hljs-string">"uglify-js"</span>);</code></pre>
<p>它会输出很多模块，但我在此只介绍一下涉及解释、混淆和压缩的基础代码。按(1)<br>解释, (2) 压缩, (3) 混淆, (4) 生成输出代码的顺序。</p>
<h3 id="articleHeader22">简易使用模式</h3>
<p><code>minify</code>是一个顶级的、单独、包含所有步骤的方法。如果你不需要进一步自定义的话，你应该会喜欢使用它。</p>
<p>例子:</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var result = UglifyJS.minify(&quot;/path/to/file.js&quot;);
console.log(result.code); // 最小化输出
// 假如你不想传一个文件名，而是要传入一段代码
var result = UglifyJS.minify(&quot;var b = function () {};&quot;, {fromString: true});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> result = UglifyJS.minify(<span class="hljs-string">"/path/to/file.js"</span>);
<span class="hljs-built_in">console</span>.log(result.code); <span class="hljs-comment">// 最小化输出</span>
<span class="hljs-comment">// 假如你不想传一个文件名，而是要传入一段代码</span>
<span class="hljs-keyword">var</span> result = UglifyJS.minify(<span class="hljs-string">"var b = function () {};"</span>, {<span class="hljs-attr">fromString</span>: <span class="hljs-literal">true</span>});</code></pre>
<p>你也可以压缩多个文件：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var result = UglifyJS.minify([ &quot;file1.js&quot;, &quot;file2.js&quot;, &quot;file3.js&quot; ]);
console.log(result.code);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> result = UglifyJS.minify([ <span class="hljs-string">"file1.js"</span>, <span class="hljs-string">"file2.js"</span>, <span class="hljs-string">"file3.js"</span> ]);
<span class="hljs-built_in">console</span>.log(result.code);</code></pre>
<p>这样生成一份sourcemap：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var result = UglifyJS.minify([ &quot;file1.js&quot;, &quot;file2.js&quot;, &quot;file3.js&quot; ], {
    outSourceMap: &quot;out.js.map&quot;
});
console.log(result.code); // 最小化输出
console.log(result.map);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> result = UglifyJS.minify([ <span class="hljs-string">"file1.js"</span>, <span class="hljs-string">"file2.js"</span>, <span class="hljs-string">"file3.js"</span> ], {
    <span class="hljs-attr">outSourceMap</span>: <span class="hljs-string">"out.js.map"</span>
});
<span class="hljs-built_in">console</span>.log(result.code); <span class="hljs-comment">// 最小化输出</span>
<span class="hljs-built_in">console</span>.log(result.map);</code></pre>
<p>你也可以用一个带fromString选项的对象来要生成sourcemap：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var result = UglifyJS.minify({&quot;file1.js&quot;: &quot;var a = function () {};&quot;}, {
  outSourceMap: &quot;out.js.map&quot;,
  outFileName: &quot;out.js&quot;,
  fromString: true
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> result = UglifyJS.minify({<span class="hljs-string">"file1.js"</span>: <span class="hljs-string">"var a = function () {};"</span>}, {
  <span class="hljs-attr">outSourceMap</span>: <span class="hljs-string">"out.js.map"</span>,
  <span class="hljs-attr">outFileName</span>: <span class="hljs-string">"out.js"</span>,
  <span class="hljs-attr">fromString</span>: <span class="hljs-literal">true</span>
});</code></pre>
<p>要注意，此时sourcemap并不会保存为一份文件，它只会返回在<code>result.map</code>中。<code>outSourceMap</code> 的值只用来在<code>result.code</code>中设置<code>//# sourceMappingURL=out.js.map</code> ，<code>outFileName</code> 的值只用来在sourcemap文件中设置 <code>file</code>属性。</p>
<p>sourcemap（查阅<a href="https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit" rel="nofollow noreferrer" target="_blank">规格</a>）中的<code>file</code>属性会优先使用 <code>outFileName</code> ，假如没有，会从<code>outSourceMap</code>中推导（就是去掉<code>'.map'</code>）。</p>
<p>你可以把<code>sourceMapInline</code>设为<code>true</code> ，这样sourcemap会加在代码末尾。</p>
<p>你也可以指定sourcemap中的源文件根目录（sourceRoot）属性：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var result = UglifyJS.minify([ &quot;file1.js&quot;, &quot;file2.js&quot;, &quot;file3.js&quot; ], {
    outSourceMap: &quot;out.js.map&quot;,
    sourceRoot: &quot;http://example.com/src&quot;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> result = UglifyJS.minify([ <span class="hljs-string">"file1.js"</span>, <span class="hljs-string">"file2.js"</span>, <span class="hljs-string">"file3.js"</span> ], {
    <span class="hljs-attr">outSourceMap</span>: <span class="hljs-string">"out.js.map"</span>,
    <span class="hljs-attr">sourceRoot</span>: <span class="hljs-string">"http://example.com/src"</span>
});</code></pre>
<p>如果你要压缩<em>从其他文件编译得来的</em>带一份sourcemap的JS文件，你可以用<code>inSourceMap</code>参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var result = UglifyJS.minify(&quot;compiled.js&quot;, {
    inSourceMap: &quot;compiled.js.map&quot;,
    outSourceMap: &quot;minified.js.map&quot;
});
// 跟之前一样，返回 `code`和 `map`" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> result = UglifyJS.minify(<span class="hljs-string">"compiled.js"</span>, {
    <span class="hljs-attr">inSourceMap</span>: <span class="hljs-string">"compiled.js.map"</span>,
    <span class="hljs-attr">outSourceMap</span>: <span class="hljs-string">"minified.js.map"</span>
});
<span class="hljs-comment">// 跟之前一样，返回 `code`和 `map`</span></code></pre>
<p>如果你要输入的sourcemap并非一份单独文件，你可以在对象参数中设置<code>inSourceMap</code>参数：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var result = UglifyJS.minify(&quot;compiled.js&quot;, {
    inSourceMap: JSON.parse(my_source_map_string),
    outSourceMap: &quot;minified.js.map&quot;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> result = UglifyJS.minify(<span class="hljs-string">"compiled.js"</span>, {
    <span class="hljs-attr">inSourceMap</span>: <span class="hljs-built_in">JSON</span>.parse(my_source_map_string),
    <span class="hljs-attr">outSourceMap</span>: <span class="hljs-string">"minified.js.map"</span>
});</code></pre>
<p>只有在需要<code>outSourceMap</code>时， <code>inSourceMap</code> 才会被用到（否则就没用咯）。</p>
<p>要设置sourcemap的url的话，请用 <code>sourceMapUrl</code>选项。</p>
<p>如果你要用<code> X-SourceMap </code>请求头，你可以把<code>sourceMapUrl</code>选项设为false。<br><code>outSourceMap</code>的默认设置：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var result = UglifyJS.minify([ &quot;file1.js&quot; ], {
  outSourceMap: &quot;out.js.map&quot;,
  sourceMapUrl: &quot;localhost/out.js.map&quot;
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> result = UglifyJS.minify([ <span class="hljs-string">"file1.js"</span> ], {
  <span class="hljs-attr">outSourceMap</span>: <span class="hljs-string">"out.js.map"</span>,
  <span class="hljs-attr">sourceMapUrl</span>: <span class="hljs-string">"localhost/out.js.map"</span>
});</code></pre>
<p>其他选项：</p>
<ul>
<li>
<code>warnings</code> (默认 <code>false</code>) — 传<code>true</code>来现实压缩器的警告</li>
<li>
<code>fromString</code> (默认 <code>false</code>) — 传<code>true</code>的话，你可以输入JS源码，而不是文件名。</li>
<li>
<code>mangle</code> (默认 <code>true</code>) — 传<code>false</code>来跳过混淆步骤，或者传一个对象来特定指明混淆选项（下面详述）。</li>
<li>
<code>mangleProperties</code> (默认 <code>false</code>) — 传一个对象来自定义指明混淆对象属性的选项。</li>
<li>
<code>output</code> (默认 <code>null</code>) — 如果你要进一步指定<a href="http://lisperator.net/uglifyjs/codegen" rel="nofollow noreferrer" target="_blank">输出选项</a>,请传一个对象。默认是压缩到最优化。</li>
<li>
<code>compress</code> (默认 <code>{}</code>) — 传<code>false</code>的话就跳过整个压缩步骤。自定义的话请传一个<a href="http://lisperator.net/uglifyjs/compress" rel="nofollow noreferrer" target="_blank">压缩选项</a>对象。</li>
<li>
<code>parse</code> (默认 {}) — 如果你要进一步自定义解释步骤请传一个<a href="http://lisperator.net/uglifyjs/parser" rel="nofollow noreferrer" target="_blank">解释选项</a>对象（不是所有选项都有效....下面再说）。</li>
</ul>
<h4>混淆</h4>
<ul><li>
<p><code>except</code> - 传一个应该排除在混淆之外的标识的数组。</p>
<ul>
<li>
<code>toplevel</code> — 混淆那些定义在顶层作用域的名字（默认禁用）。</li>
<li>
<code>eval</code> — 混淆那些在with或eval中出现的名字（默认禁用）。</li>
<li>
<code>keep_fnames</code> -- 默认<code>false</code>。传<code>true</code>的话就不混淆函数名。对那些依赖<code>Function.prototype.name</code>的代码有用。延展阅读：<code>keep_fnames</code> <a href="#compressor-options">压缩选项</a>.</li>
</ul>
</li></ul>
<p>例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="  //tst.js
  var globalVar;
  function funcName(firstLongName, anotherLongName)
  {
    var myVariable = firstLongName +  anotherLongName;
  }

  UglifyJS.minify(&quot;tst.js&quot;).code;
  // 'function funcName(a,n){}var globalVar;'

  UglifyJS.minify(&quot;tst.js&quot;, { mangle: { except: ['firstLongName'] } }).code;
  // 'function funcName(firstLongName,a){}var globalVar;'

  UglifyJS.minify(&quot;tst.js&quot;, { mangle: { toplevel: true } }).code;
  // 'function n(n,a){}var a;'" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">  <span class="hljs-comment">//tst.js</span>
  <span class="hljs-keyword">var</span> globalVar;
  <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">funcName</span>(<span class="hljs-params">firstLongName, anotherLongName</span>)
  </span>{
    <span class="hljs-keyword">var</span> myVariable = firstLongName +  anotherLongName;
  }

  UglifyJS.minify(<span class="hljs-string">"tst.js"</span>).code;
  <span class="hljs-comment">// 'function funcName(a,n){}var globalVar;'</span>

  UglifyJS.minify(<span class="hljs-string">"tst.js"</span>, { <span class="hljs-attr">mangle</span>: { <span class="hljs-attr">except</span>: [<span class="hljs-string">'firstLongName'</span>] } }).code;
  <span class="hljs-comment">// 'function funcName(firstLongName,a){}var globalVar;'</span>

  UglifyJS.minify(<span class="hljs-string">"tst.js"</span>, { <span class="hljs-attr">mangle</span>: { <span class="hljs-attr">toplevel</span>: <span class="hljs-literal">true</span> } }).code;
  <span class="hljs-comment">// 'function n(n,a){}var a;'</span></code></pre>
<h4>混淆属性名选项</h4>
<ul>
<li>
<code>regex</code> — 传一个正则，<em>仅混淆</em>匹配到的名字。（与<code>--mangle-regex</code> CLI参数选项关联）</li>
<li>
<code>ignore_quoted</code> – 只混淆<em>非括号中</em>的属性名（与<code>--mangle-props 2</code> CLI 参数选项关联）</li>
<li>
<code>debug</code> – 让混淆后的名字与原名字有关。与<code>--mangle-props-debug</code> CLI 参数选项关联）。默认是<code>false</code>。传一个空字符串来启用，或者传一个非空字符串来添加后缀。</li>
</ul>
<h3 id="articleHeader23">高级使用模式</h3>
<p>如果<code>minify</code>函数太简单不能满足你的需求，下面这些API信息有更多的细节详情：</p>
<h4>解释器</h4>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var toplevel_ast = UglifyJS.parse(code, options);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> toplevel_ast = UglifyJS.parse(code, options);</code></pre>
<p><code>options</code> 是可选的，要传的话就必须传个对象。下面这些是有效的属性：</p>
<ul>
<li>
<code>strict</code> — 禁用自动添加分号，禁止数组、对象末尾还有逗号。</li>
<li>
<code>bare_returns</code> — 允许函数返回外部。（与 <code>--bare-returns</code> CLI参数选项关联，对<code>minify</code> <code>parse</code>选项对象也有效。）</li>
<li>
<code>filename</code> — 输入的文件名。</li>
<li>
<code>toplevel</code> — 一个 <code>toplevel</code> 节点。 (就是之前调用<code>parse</code>返回的)</li>
</ul>
<p>后面两个选项是当你要最小化多个文件成一个文件（以及正确的sourcemap）时有用。我们的CLI会像这样处理：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var toplevel = null;
files.forEach(function(file){
    var code = fs.readFileSync(file, &quot;utf8&quot;);
    toplevel = UglifyJS.parse(code, {
        filename: file,
        toplevel: toplevel
    });
});" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> toplevel = <span class="hljs-literal">null</span>;
files.forEach(<span class="hljs-function"><span class="hljs-keyword">function</span>(<span class="hljs-params">file</span>)</span>{
    <span class="hljs-keyword">var</span> code = fs.readFileSync(file, <span class="hljs-string">"utf8"</span>);
    toplevel = UglifyJS.parse(code, {
        <span class="hljs-attr">filename</span>: file,
        <span class="hljs-attr">toplevel</span>: toplevel
    });
});</code></pre>
<p>完成后，我们就在<code>toplevel</code>这个大AST里包含了我们的所有文件，每一份都带着正确的来源信息。</p>
<h4>作用域信息</h4>
<p>UglifyJS包含一个作用域分析器，你可以在压缩、混淆前手动调用。基本上，它添加了AST中的节点在哪里被命名、被引用了多少次、是否全局的、是否在<code>eval</code> 或<code>with</code>中声明等等。我们将讨论除此之外的，那些在你对AST进行任何操作前必须知道的重要事项：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="toplevel.figure_out_scope()" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;">toplevel.figure_out_scope()</code></pre>
<h4>压缩</h4>
<p>就如这样：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var compressor = UglifyJS.Compressor(options);
var compressed_ast = compressor.compress(toplevel);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> compressor = UglifyJS.Compressor(options);
<span class="hljs-keyword">var</span> compressed_ast = compressor.compress(toplevel);</code></pre>
<p><code>options</code>可以不要。之前的“压缩器选项“中已经讲过可以填什么。默认选项对大多数脚本来说应该都是最佳的。</p>
<p>压缩器是破坏性的，所以不要依赖那些源树<code>toplevel</code>。</p>
<h4>混淆</h4>
<p>压缩之后再调用一次<code>figure_out_scope</code>是个好做法（因为压缩过程可能会干掉一些没用的、不可达的代码，改变标识的数量和位置），你也可以选择在Gzip（统计不可混淆的词中字符的使用频率）后调用。例如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="compressed_ast.figure_out_scope();
compressed_ast.compute_char_frequency();
compressed_ast.mangle_names();" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript">compressed_ast.figure_out_scope();
compressed_ast.compute_char_frequency();
compressed_ast.mangle_names();</code></pre>
<h4>生成输出代码</h4>
<p>AST节点带一个<code>print</code>方法，用来生成输出流。基本上，要生成代码你只要这么做：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var stream = UglifyJS.OutputStream(options);
compressed_ast.print(stream);
var code = stream.toString(); // 这就是你最小化后的代码" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> stream = UglifyJS.OutputStream(options);
compressed_ast.print(stream);
<span class="hljs-keyword">var</span> code = stream.toString(); <span class="hljs-comment">// 这就是你最小化后的代码</span></code></pre>
<p>又或者这样缩写：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var code = compressed_ast.print_to_string(options);" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">var</span> code = compressed_ast.print_to_string(options);</code></pre>
<p>通常情况下<code>options</code>是可选的。输出流可以接收一堆选项参数，绝大多数在”美化选项“中有阐述。我们所关心的是<code>source_map</code> 和 <code>comments</code>选项。</p>
<h4>在输出代码中保留注释</h4>
<p>你需要传入<code>comments</code>选项来保留某些注释。你可以传正则表达式（以<code>/</code>包裹或正则对象）、布尔值或函数。也可以传字符串<code>all</code> 或 <code>some</code>，<code>some</code>等同于CLI中<code>--comments</code>不带任何参数。如果你传正则，只有匹配到的注释会被保留。注意，匹配的主体不包括 <code>//</code> 或 <code>/*</code>。如果你传函数，每遇到树中的注释都会调用一下，传入两个参数，一是注释所依附的节点，二是注释标识本身。</p>
<p>注释标识有如下属性：</p>
<ul>
<li>
<code>type</code>: 单行注释是"comment1"，多行注释 "comment2"。</li>
<li>
<code>value</code>: 注释体本身。</li>
<li>
<code>pos</code> 和 <code>endpos</code>: 注释在源码中出现的起始位置/结束位置（从0开始索引）。</li>
<li>
<code>line</code> 和 <code>col</code>: 注释在源码中出现的行和列。</li>
<li>
<code>file</code> — 源码的文件名</li>
<li>
<code>nlb</code> — 在源码中，如果注释前有一空行或注释另起新一行的话是<code>true</code>
</li>
</ul>
<p>你的函数返回<code>true</code>的话就保留注释，其他返回值都代表false。</p>
<h4>生成sourcemap</h4>
<p>你需要在调用<code>print</code>时传<code>source_map</code>参数。<code>source_map</code>参数需要是<code>SourceMap</code>对象（在<a href="https://github.com/mozilla/source-map" rel="nofollow noreferrer" target="_blank">source-map</a>库顶部有个小框框里说了）。</p>
<p>例子：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="var source_map = UglifyJS.SourceMap(source_map_options);
var stream = UglifyJS.OutputStream({
    ...
    source_map: source_map
});
compressed_ast.print(stream);

var code = stream.toString();
var map = source_map.toString(); // 输出json格式sourcemap" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="javascript hljs"><code class="javascript"><span class="hljs-keyword">var</span> source_map = UglifyJS.SourceMap(source_map_options);
<span class="hljs-keyword">var</span> stream = UglifyJS.OutputStream({
    ...
    source_map: source_map
});
compressed_ast.print(stream);

<span class="hljs-keyword">var</span> code = stream.toString();
<span class="hljs-keyword">var</span> map = source_map.toString(); <span class="hljs-comment">// 输出json格式sourcemap</span></code></pre>
<p><code>source_map_options</code>（可选）包含以下属性:</p>
<ul>
<li>
<code>file</code>: 被输出的、sourcemap所映射的JS的文件名</li>
<li>
<code>root</code>:  <code>sourceRoot</code> 属性 (详看 <a href="https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit" rel="nofollow noreferrer" target="_blank">规格</a>)</li>
<li>
<code>orig</code>:  "original source map"，方便你想让sourcemap映射到生成JS的源码上。此参数可以只是字符串或json，也可以是包含源码sourcemap的json对象。</li>
</ul>
<h4>兼容版</h4>
<h4>Harmony</h4>
<p>如果你想使用能最小化ES6+的实验性质的<a href="https://github.com/mishoo/UglifyJS2/commits/harmony" rel="nofollow noreferrer" target="_blank">兼容</a>分支，请在你的<code>package.json</code> 文件中加上下面代码：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="&quot;uglify-js&quot;: &quot;git+https://github.com/mishoo/UglifyJS2.git#harmony&quot;" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs livescript"><code style="word-break: break-word; white-space: initial;"><span class="hljs-string">"uglify-js"</span>: <span class="hljs-string">"git+https://github.com/mishoo/UglifyJS2.git<span class="hljs-subst">#harmony</span>"</span></code></pre>
<p>或者直接安装兼容实验版UglifyJS：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install --save-dev uglify-js@github:mishoo/UglifyJS2#harmony" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs elixir"><code style="word-break: break-word; white-space: initial;">npm install --save-dev uglify-js<span class="hljs-variable">@github</span><span class="hljs-symbol">:mishoo/UglifyJS2</span><span class="hljs-comment">#harmony</span></code></pre>
<p>更多细节请看 <a href="https://github.com/mishoo/UglifyJS2/issues/448" rel="nofollow noreferrer" target="_blank">#448</a></p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
UglifyJS中文文档

## 原文链接
[https://segmentfault.com/a/1190000008995453](https://segmentfault.com/a/1190000008995453)

