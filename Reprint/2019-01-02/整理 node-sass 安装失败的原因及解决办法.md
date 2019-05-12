---
title: '整理 node-sass 安装失败的原因及解决办法' 
date: 2019-01-02 2:30:09
hidden: true
slug: k4g4dgth3o
categories: [reprint]
---

{{< raw >}}

                    
<blockquote>声明：本文非原创，如有侵权请留言或发邮件告知，作者会立即停止侵权并删除本文。发布此文章主要是希望跟作者遇到同样问题的同学能解决node-sass 安装失败的问题。</blockquote>
<p><em>npm install 时偶尔遇到报错：没有安装python或node-sass 安装失败的问题，百度之后发现是被墙了，但根据百度的方法换了淘宝镜像和用了vpn都安装失败，最后发现原来是因为没有卸载之前安装失败的包导致的。作者本人最后的解决方案是npm uninstall node-sass，然后使用VPN重新安装了一遍就成功了。不能翻墙的同学请看下文</em></p>
<h2 id="articleHeader0"><strong> node-sass 安装失败的原因 </strong></h2>
<p>npm 安装 node-sass 依赖时，会从 github.com 上下载 .node 文件。由于国内网络环境的问题，这个下载时间可能会很长，甚至导致超时失败。<br>这是使用 sass 的同学可能都会遇到的郁闷的问题。</p>
<p>解决方案就是使用其他源，或者使用工具下载，然后将安装源指定到本地。</p>
<h2 id="articleHeader1"><strong>解决方法一：创建.npmrc文件</strong></h2>
<p>在项目根目录创建.npmrc文件，复制下面代码到该文件。</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="phantomjs_cdnurl=http://cnpmjs.org/downloads
sass_binary_site=https://npm.taobao.org/mirrors/node-sass/
registry=https://registry.npm.taobao.org" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code>phantomjs_cdnurl=<span class="hljs-string">http:</span><span class="hljs-comment">//cnpmjs.org/downloads</span>
sass_binary_site=<span class="hljs-string">https:</span><span class="hljs-comment">//npm.taobao.org/mirrors/node-sass/</span>
registry=<span class="hljs-string">https:</span><span class="hljs-comment">//registry.npm.taobao.org</span></code></pre>
<p>保存后 删除之前安装失败的包(第一次安装请跳过此步)</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm uninstall node-sass" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;">npm uninstall <span class="hljs-keyword">node</span><span class="hljs-title">-sass</span></code></pre>
<p>重新安装</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm install node-sass" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;">npm install <span class="hljs-keyword">node</span><span class="hljs-title">-sass</span></code></pre>
<p>作者后来另一个项目在没有使用VPN的情况下测试方法一，安装时报错 <em>ERR! node-sass@3.8.0 postinstall: `node scripts/build.js</em> 改用方法二成功。</p>
<h2 id="articleHeader2"><strong>解决方法二：使用淘宝镜像源（推荐）</strong></h2>
<p>设置变量 sass_binary_site，指向淘宝镜像地址。示例：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/

// 也可以设置系统环境变量的方式。示例
// linux、mac 下
SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/ npm install node-sass

// window 下
set SASS_BINARY_SITE=https://npm.taobao.org/mirrors/node-sass/ &amp;&amp; npm install node-sass" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>npm i <span class="hljs-keyword">node</span><span class="hljs-title">-sass</span> --<span class="hljs-attr">sass_binary_site=</span>https://npm.taobao.org/mirrors/<span class="hljs-keyword">node</span><span class="hljs-title">-sass</span>/

// 也可以设置系统环境变量的方式。示例
// linux、mac 下
<span class="hljs-attr">SASS_BINARY_SITE=</span>https://npm.taobao.org/mirrors/<span class="hljs-keyword">node</span><span class="hljs-title">-sass</span>/ npm install <span class="hljs-keyword">node</span><span class="hljs-title">-sass</span>

// window 下
set <span class="hljs-attr">SASS_BINARY_SITE=</span>https://npm.taobao.org/mirrors/<span class="hljs-keyword">node</span><span class="hljs-title">-sass</span>/ &amp;&amp; npm install <span class="hljs-keyword">node</span><span class="hljs-title">-sass</span></code></pre>
<p>或者设置全局镜像源：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm config set sass_binary_site https://npm.taobao.org/mirrors/node-sass/
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>npm config set sass_binary_site https://npm.taobao.org/mirrors/<span class="hljs-keyword">node</span><span class="hljs-title">-sass</span>/
</code></pre>
<p>之后再涉及到 node-sass 的安装时就会从淘宝镜像下载。</p>
<h2 id="articleHeader3"><strong>解决方法三：使用 cnpm</strong></h2>
<p>使用 cnpm 安装 node-sass 会默认从淘宝镜像源下载，也是一个办法：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="cnpm install node-sass" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;">cnpm install <span class="hljs-keyword">node</span><span class="hljs-title">-sass</span></code></pre>
<h2 id="articleHeader4"><strong>解决方法四：下载 .node 到本地</strong></h2>
<p>到<a href="https://github.com/sass/node-sass/releases" rel="nofollow noreferrer" target="_blank">这里</a>去根据版本号、系统环境，选择下载 .node 文件，然后安装时，指定变量 sass_binary_path，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm i node-sass --sass_binary_path=/Users/lzwme/Downloads/darwin-x64-48_binding.node" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code style="word-break: break-word; white-space: initial;">npm i <span class="hljs-keyword">node</span><span class="hljs-title">-sass</span> --<span class="hljs-attr">sass_binary_path=</span>/Users/lzwme/Downloads/darwin-x64-<span class="hljs-number">48</span>_binding.node</code></pre>
<h2 id="articleHeader5"><strong>安装失败后重新安装问题</strong></h2>
<p>之前安装失败，再安装就不去下载了，怎么办呢？那就先卸载再安装：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm uninstall node-sass
npm i node-sass --sass_binary_site=https://npm.taobao.org/mirrors/node-sass/" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crmsh"><code>npm uninstall <span class="hljs-keyword">node</span><span class="hljs-title">-sass</span>
npm i <span class="hljs-keyword">node</span><span class="hljs-title">-sass</span> --<span class="hljs-attr">sass_binary_site=</span>https://npm.taobao.org/mirrors/<span class="hljs-keyword">node</span><span class="hljs-title">-sass</span>/</code></pre>
<h2 id="articleHeader6"><strong>相关错误提示</strong></h2>
<p>提示没有安装python、build失败等，如：</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="gyp ERR! configure error
gyp ERR! stack Error: Can't find Python executable &quot;C:\Users\zhuon\AppData\Local\Programs\Python\Python36\python.EXE&quot;, you can set the PYTHON env variable.
gyp ERR! stack     at PythonFinder.failNoPython (G:\Workspace\ManYan\manyan-nav\node_modules\node-gyp\lib\configure.js:483:19)
gyp ERR! stack     at PythonFinder.<anonymous> (G:\Workspace\ManYan\manyan-nav\node_modules\node-gyp\lib\configure.js:508:16)
gyp ERR! stack     at G:\Workspace\ManYan\manyan-nav\node_modules\graceful-fs\polyfills.js:284:29
gyp ERR! stack     at FSReqWrap.oncomplete (fs.js:152:21)
gyp ERR! System Windows_NT 10.0.15063
gyp ERR! command &quot;C:\\dev\\nodejs\\node.exe&quot; &quot;G:\\Workspace\\ManYan\\manyan-nav\\node_modules\\node-gyp\\bin\\node-gyp.js&quot; &quot;rebuild&quot; &quot;--verbose&quot; &quot;--libsass_ext=&quot; &quot;--libsass_cflags=&quot; &quot;--libsass_ldflags=&quot;
&quot;--libsass_library=&quot;
gyp ERR! cwd G:\Workspace\ManYan\manyan-nav\node_modules\node-sass
gyp ERR! node -v v8.4.0
gyp ERR! node-gyp -v v3.6.2
gyp ERR! not ok
Build failed
npm WARN co-mocha@1.2.0 requires a peer of mocha@>=1.18 <4 but none was installed.
npm WARN egg-restapi-module-tool@1.0.0 No repository field.
npm WARN egg-restapi-module-tool@1.0.0 scripts['server'] should probably be scripts['start'].

npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! node-sass@3.8.0 postinstall: `node scripts/build.js`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the node-sass@3.8.0 postinstall script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     D:\nodejs\cache\_logs\2017-09-02T16_06_24_298Z-debug.log" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs taggerscript"><code>gyp ERR! configure error
gyp ERR! stack Error: Can't find Python executable "C:<span class="hljs-symbol">\U</span>sers<span class="hljs-symbol">\z</span>huon<span class="hljs-symbol">\A</span>ppData<span class="hljs-symbol">\L</span>ocal<span class="hljs-symbol">\P</span>rograms<span class="hljs-symbol">\P</span>ython<span class="hljs-symbol">\P</span>ython36<span class="hljs-symbol">\p</span>ython.EXE", you can set the PYTHON env variable.
gyp ERR! stack     at PythonFinder.failNoPython (G:<span class="hljs-symbol">\W</span>orkspace<span class="hljs-symbol">\M</span>anYan<span class="hljs-symbol">\m</span>anyan-nav<span class="hljs-symbol">\n</span>ode_modules<span class="hljs-symbol">\n</span>ode-gyp<span class="hljs-symbol">\l</span>ib<span class="hljs-symbol">\c</span>onfigure.js:483:19)
gyp ERR! stack     at PythonFinder.&lt;anonymous&gt; (G:<span class="hljs-symbol">\W</span>orkspace<span class="hljs-symbol">\M</span>anYan<span class="hljs-symbol">\m</span>anyan-nav<span class="hljs-symbol">\n</span>ode_modules<span class="hljs-symbol">\n</span>ode-gyp<span class="hljs-symbol">\l</span>ib<span class="hljs-symbol">\c</span>onfigure.js:508:16)
gyp ERR! stack     at G:<span class="hljs-symbol">\W</span>orkspace<span class="hljs-symbol">\M</span>anYan<span class="hljs-symbol">\m</span>anyan-nav<span class="hljs-symbol">\n</span>ode_modules<span class="hljs-symbol">\g</span>raceful-fs<span class="hljs-symbol">\p</span>olyfills.js:284:29
gyp ERR! stack     at FSReqWrap.oncomplete (fs.js:152:21)
gyp ERR! System Windows_NT 10.0.15063
gyp ERR! command "C:<span class="hljs-symbol">\\</span>dev<span class="hljs-symbol">\\</span>nodejs<span class="hljs-symbol">\\</span>node.exe" "G:<span class="hljs-symbol">\\</span>Workspace<span class="hljs-symbol">\\</span>ManYan<span class="hljs-symbol">\\</span>manyan-nav<span class="hljs-symbol">\\</span>node_modules<span class="hljs-symbol">\\</span>node-gyp<span class="hljs-symbol">\\</span>bin<span class="hljs-symbol">\\</span>node-gyp.js" "rebuild" "--verbose" "--libsass_ext=" "--libsass_cflags=" "--libsass_ldflags="
"--libsass_library="
gyp ERR! cwd G:<span class="hljs-symbol">\W</span>orkspace<span class="hljs-symbol">\M</span>anYan<span class="hljs-symbol">\m</span>anyan-nav<span class="hljs-symbol">\n</span>ode_modules<span class="hljs-symbol">\n</span>ode-sass
gyp ERR! node -v v8.4.0
gyp ERR! node-gyp -v v3.6.2
gyp ERR! not ok
Build failed
npm WARN co-mocha@1.2.0 requires a peer of mocha@&gt;=1.18 &lt;4 but none was installed.
npm WARN egg-restapi-module-tool@1.0.0 No repository field.
npm WARN egg-restapi-module-tool@1.0.0 scripts['server'] should probably be scripts['start'].

npm ERR! code ELIFECYCLE
npm ERR! errno 1
npm ERR! node-sass@3.8.0 postinstall: `node scripts/build.js`
npm ERR! Exit status 1
npm ERR!
npm ERR! Failed at the node-sass@3.8.0 postinstall script.
npm ERR! This is probably not a problem with npm. There is likely additional logging output above.

npm ERR! A complete log of this run can be found in:
npm ERR!     D:<span class="hljs-symbol">\n</span>odejs<span class="hljs-symbol">\c</span>ache<span class="hljs-symbol">\_</span>logs<span class="hljs-symbol">\2</span>017-09-02T16_06_24_298Z-debug.log</code></pre>
<blockquote>主要转自：<a href="https://lzw.me/a/node-sass-install-helper.html" rel="nofollow noreferrer" target="_blank">志文工作室</a><br>其它参考：<br><a href="https://github.com/lmk123/blog/issues/28" rel="nofollow noreferrer" target="_blank">https://github.com/lmk123/blo...</a><br><a href="https://segmentfault.com/q/1010000010069879">https://segmentfault.com/q/10...</a>
</blockquote>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
整理 node-sass 安装失败的原因及解决办法

## 原文链接
[https://segmentfault.com/a/1190000010984731](https://segmentfault.com/a/1190000010984731)

