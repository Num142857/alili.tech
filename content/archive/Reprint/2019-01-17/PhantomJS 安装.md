---
title: 'PhantomJS 安装' 
date: 2019-01-17 2:30:25
hidden: true
slug: btjef8xeot
categories: [reprint]
---

{{< raw >}}

                    
<h2 id="articleHeader0">PhantomJS 安装</h2>
<p><span class="img-wrap"><img data-src="/img/bVL0NY?w=408&amp;h=252" src="https://static.alili.tech/img/bVL0NY?w=408&amp;h=252" alt="图片描述" title="图片描述" style="cursor: pointer; display: inline;"></span></p>
<h3 id="articleHeader1">Mac OS X &amp;&amp; Windows</h3>
<p>1、<a href="http://phantomjs.org/download.html" rel="nofollow noreferrer" target="_blank">PhantomJS下载地址</a></p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="按照系统下载对应的版本，

macOS 下载： phantomjs-2.1.1-macosx.zip

Windows下载：phantomjs-2.1.1-windows.zip

并解压到用户目录下面，

macOS 解压路径：

/User/xxx/phantomjs-2.1.1-macosx

Windows 解压路径：

D:\phantomjs-2.1.1-windows ，并重命名为 D:\phantomjs
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="text">按照系统下载对应的版本，

macOS 下载： phantomjs-<span class="hljs-number">2.1</span>.<span class="hljs-number">1</span>-macosx<span class="hljs-selector-class">.zip</span>

Windows下载：phantomjs-<span class="hljs-number">2.1</span>.<span class="hljs-number">1</span>-windows<span class="hljs-selector-class">.zip</span>

并解压到用户目录下面，

macOS 解压路径：

/User/xxx/phantomjs-<span class="hljs-number">2.1</span>.<span class="hljs-number">1</span>-macosx

Windows 解压路径：

D:\phantomjs-<span class="hljs-number">2.1</span>.<span class="hljs-number">1</span>-windows ，并重命名为 D:\phantomjs
</code></pre>
<p>2、PhantomJS不需要安装，解压即可使用</p>
<h3 id="articleHeader2">Windows PATH变量</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="在“系统变量”选项区域中查看PATH变量，如果不存在，则新建变量 PATH，

否则选中该变量，单击“编辑”按钮，在“变量值”文本框的起始位置添加 

D:\phantomjs\bin，开始-运行-输入cmd，输入 phantomjs --version， 
 
如果可以看到版本号，则安装成功。" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs dockerfile"><code class="text">在“系统变量”选项区域中查看PATH变量，如果不存在，则新建变量 PATH，

否则选中该变量，单击“编辑”按钮，在“变量值”文本框的起始位置添加 

D:\phantomjs\bin，开始-运行-输入<span class="hljs-keyword">cmd</span><span class="bash">，输入 phantomjs --version， 
</span> 
如果可以看到版本号，则安装成功。</code></pre>
<h3 id="articleHeader3">macOS PATH变量</h3>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="
如果用户目录下存在 .bash_profile ，比如我的/User/xxx/.bash_profile，则添加一行 

export PATH=&quot;$PATH:/Users/xxx/phantomjs-2.1.1-macosx/bin&quot;

否则新建 .bash_profile,然后在添加上文

在terminal中输入

phantomjs --version

如果可以看到版本号，则安装成功。
" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs stylus"><code class="text">
如果用户目录下存在 <span class="hljs-selector-class">.bash_profile</span> ，比如我的/User/xxx/.bash_profile，则添加一行 

export PATH=<span class="hljs-string">"$PATH:/Users/xxx/phantomjs-2.1.1-macosx/bin"</span>

否则新建 <span class="hljs-selector-class">.bash_profile</span>,然后在添加上文

在terminal中输入

phantomjs --version

如果可以看到版本号，则安装成功。
</code></pre>
<p>3、使用npm安装的时候如何环境变量中没有phantomjs，就会从github下载安装phantomjs，但是你懂的?，大多数情况下会超时，即使把npm的镜像改成淘宝的还是一样的结果</p>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="PhantomJS not found on PATH
Downloading https://github.com/Medium/phantomjs/releases/download/v2.1.1/phantomjs-2.1.1-macosx.zip
Saving to /var/folders/hn/55rkvgy97797tgx6cld83zl80000gn/T/phantomjs/phantomjs-2.1.1-macosx.zip" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs awk"><code class="text">PhantomJS not found on PATH
Downloading https:<span class="hljs-regexp">//gi</span>thub.com<span class="hljs-regexp">/Medium/</span>phantomjs<span class="hljs-regexp">/releases/</span>download<span class="hljs-regexp">/v2.1.1/</span>phantomjs-<span class="hljs-number">2.1</span>.<span class="hljs-number">1</span>-macosx.zip
Saving to <span class="hljs-regexp">/var/</span>folders<span class="hljs-regexp">/hn/</span><span class="hljs-number">55</span>rkvgy97797tgx6cld83zl80000gn<span class="hljs-regexp">/T/</span>phantomjs<span class="hljs-regexp">/phantomjs-2.1.1-macosx.zip</span></code></pre>
<ul><li><p>然后聪明的你想到可以使用 npm install -g phantomjs , 可是现实告诉你</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="npm WARN deprecated phantomjs@2.1.7: Package renamed to phantomjs-prebuilt. Please update 'phantomjs' package references to 'phantomjs-prebuilt'
npm WARN deprecated tough-cookie@2.2.2: ReDoS vulnerability parsing Set-Cookie https://nodesecurity.io/advisories/130
npm WARN deprecated node-uuid@1.4.8: Use uuid module instead
/usr/local/bin/phantomjs -> /usr/local/lib/node_modules/phantomjs/bin/phantomjs

> phantomjs@2.1.7 install /usr/local/lib/node_modules/phantomjs
> node install.js

Considering PhantomJS found at /usr/local/bin/phantomjs
Looks like an `npm install -g`
Error checking path, continuing { Error: Cannot find module '/usr/local/lib/node_modules/phantomjs/lib/location'
    at Function.Module._resolveFilename (module.js:469:15)
    at Function.Module._load (module.js:417:25)
    at Module.require (module.js:497:17)
    at require (internal/module.js:20:19)
    at getLocationInLibModuleIfMatching (/usr/local/lib/node_modules/phantomjs/install.js:332:19)
    at Promise._successFn (/usr/local/lib/node_modules/phantomjs/install.js:389:28)
    at nextTickCallback (/usr/local/lib/node_modules/phantomjs/node_modules/kew/kew.js:47:28)
    at _combinedTickCallback (internal/process/next_tick.js:67:7)
    at process._tickCallback (internal/process/next_tick.js:98:9) code: 'MODULE_NOT_FOUND' }
Downloading https://github.com/Medium/phantomjs/releases/download/v2.1.1//phantomjs-2.1.1-macosx.zip
Saving to /usr/local/lib/node_modules/phantomjs/phantomjs/phantomjs-2.1.1-macosx.zip
Receiving..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs groovy"><code class="text">npm WARN deprecated phantomjs@<span class="hljs-number">2.1</span><span class="hljs-number">.7</span>: Package renamed to phantomjs-prebuilt. Please update <span class="hljs-string">'phantomjs'</span> <span class="hljs-keyword">package</span> references to <span class="hljs-string">'phantomjs-prebuilt'</span>
npm WARN deprecated tough-cookie@<span class="hljs-number">2.2</span><span class="hljs-number">.2</span>: ReDoS vulnerability parsing Set-Cookie <span class="hljs-string">https:</span><span class="hljs-comment">//nodesecurity.io/advisories/130</span>
npm WARN deprecated node-uuid@<span class="hljs-number">1.4</span><span class="hljs-number">.8</span>: Use uuid module instead
<span class="hljs-regexp">/usr/</span>local<span class="hljs-regexp">/bin/</span>phantomjs -&gt; <span class="hljs-regexp">/usr/</span>local<span class="hljs-regexp">/lib/</span>node_modules<span class="hljs-regexp">/phantomjs/</span>bin/phantomjs

&gt; phantomjs@<span class="hljs-number">2.1</span><span class="hljs-number">.7</span> install <span class="hljs-regexp">/usr/</span>local<span class="hljs-regexp">/lib/</span>node_modules/phantomjs
&gt; node install.js

Considering PhantomJS found at <span class="hljs-regexp">/usr/</span>local<span class="hljs-regexp">/bin/</span>phantomjs
Looks like an `npm install -g`
Error checking path, continuing { <span class="hljs-string">Error:</span> Cannot find module <span class="hljs-string">'/usr/local/lib/node_modules/phantomjs/lib/location'</span>
    at Function.Module._resolveFilename (module.<span class="hljs-string">js:</span><span class="hljs-number">469</span>:<span class="hljs-number">15</span>)
    at Function.Module._load (module.<span class="hljs-string">js:</span><span class="hljs-number">417</span>:<span class="hljs-number">25</span>)
    at Module.require (module.<span class="hljs-string">js:</span><span class="hljs-number">497</span>:<span class="hljs-number">17</span>)
    at require (internal/module.<span class="hljs-string">js:</span><span class="hljs-number">20</span>:<span class="hljs-number">19</span>)
    at getLocationInLibModuleIfMatching (<span class="hljs-regexp">/usr/</span>local<span class="hljs-regexp">/lib/</span>node_modules<span class="hljs-regexp">/phantomjs/</span>install.<span class="hljs-string">js:</span><span class="hljs-number">332</span>:<span class="hljs-number">19</span>)
    at Promise._successFn (<span class="hljs-regexp">/usr/</span>local<span class="hljs-regexp">/lib/</span>node_modules<span class="hljs-regexp">/phantomjs/</span>install.<span class="hljs-string">js:</span><span class="hljs-number">389</span>:<span class="hljs-number">28</span>)
    at nextTickCallback (<span class="hljs-regexp">/usr/</span>local<span class="hljs-regexp">/lib/</span>node_modules<span class="hljs-regexp">/phantomjs/</span>node_modules<span class="hljs-regexp">/kew/</span>kew.<span class="hljs-string">js:</span><span class="hljs-number">47</span>:<span class="hljs-number">28</span>)
    at _combinedTickCallback (internal<span class="hljs-regexp">/process/</span>next_tick.<span class="hljs-string">js:</span><span class="hljs-number">67</span>:<span class="hljs-number">7</span>)
    at process._tickCallback (internal<span class="hljs-regexp">/process/</span>next_tick.<span class="hljs-string">js:</span><span class="hljs-number">98</span>:<span class="hljs-number">9</span>) <span class="hljs-string">code:</span> <span class="hljs-string">'MODULE_NOT_FOUND'</span> }
Downloading <span class="hljs-string">https:</span><span class="hljs-comment">//github.com/Medium/phantomjs/releases/download/v2.1.1//phantomjs-2.1.1-macosx.zip</span>
Saving to <span class="hljs-regexp">/usr/</span>local<span class="hljs-regexp">/lib/</span>node_modules<span class="hljs-regexp">/phantomjs/</span>phantomjs/phantomjs<span class="hljs-number">-2.1</span><span class="hljs-number">.1</span>-macosx.zip
Receiving...</code></pre>
<ul>
<li><p>又回到了原点，是不是npm的问题？我用cnpm试一下看看</p></li>
<li><p>然后聪明的你想到可以使用 cnpm install -g phantomjs，现实是这样</p></li>
</ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Downloading phantomjs to /usr/local/lib/node_modules/phantomjs_tmp
Copying /usr/local/lib/node_modules/phantomjs_tmp/.2.1.7@phantomjs to /usr/local/lib/node_modules/phantomjs
Installing phantomjs's dependencies to /usr/local/lib/node_modules/phantomjs/node_modules
[1/8] progress@~1.1.8 installed at node_modules/.1.1.8@progress
...
[8/8] request@~2.67.0 installed at node_modules/.2.67.0@request
execute post install 1 scripts...
[1/1] scripts.install phantomjs@2.1.7+deprecated run &quot;node install.js&quot;
PhantomJS not found on PATH
Phantom installation failed TypeError: Path must be a string. Received undefined
    at assertPath (path.js:7:11)
    at Object.join (path.js:1211:7)
Install fail! Error: post install error, please remove node_modules before retry!
Run &quot;sh -c node install.js&quot; error, exit code 1
Error: post install error, please remove node_modules before retry!
Run &quot;sh -c node install.js&quot; error, exit code 1
    at ChildProcess.proc.on.code (/usr/local/lib/node_modules/cnpm/
    at Process.ChildProcess._handle.onexit (internal/child_process.js:226:5)
npminstall version: 2.26.2
npminstall args: /usr/local/bin/node /usr/local/lib/node_modules/cnpm/node_modules/npminstall/bin/install.js --china --userconfig=/Users/azmake/.cnpmrc --disturl=https://npm.taobao.org/mirrors/node --registry=https://registry.npm.taobao.org -g phantomjs" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs applescript"><code class="text">Downloading phantomjs <span class="hljs-keyword">to</span> /usr/<span class="hljs-keyword">local</span>/lib/node_modules/phantomjs_tmp
Copying /usr/<span class="hljs-keyword">local</span>/lib/node_modules/phantomjs_tmp/<span class="hljs-number">.2</span><span class="hljs-number">.1</span><span class="hljs-number">.7</span>@phantomjs <span class="hljs-keyword">to</span> /usr/<span class="hljs-keyword">local</span>/lib/node_modules/phantomjs
Installing phantomjs's dependencies <span class="hljs-keyword">to</span> /usr/<span class="hljs-keyword">local</span>/lib/node_modules/phantomjs/node_modules
[<span class="hljs-number">1</span>/<span class="hljs-number">8</span>] progress@~<span class="hljs-number">1.1</span><span class="hljs-number">.8</span> installed <span class="hljs-keyword">at</span> node_modules/<span class="hljs-number">.1</span><span class="hljs-number">.1</span><span class="hljs-number">.8</span>@progress
...
[<span class="hljs-number">8</span>/<span class="hljs-number">8</span>] request@~<span class="hljs-number">2.67</span><span class="hljs-number">.0</span> installed <span class="hljs-keyword">at</span> node_modules/<span class="hljs-number">.2</span><span class="hljs-number">.67</span><span class="hljs-number">.0</span>@request
execute post install <span class="hljs-number">1</span> scripts...
[<span class="hljs-number">1</span>/<span class="hljs-number">1</span>] scripts.install phantomjs@<span class="hljs-number">2.1</span><span class="hljs-number">.7</span>+deprecated <span class="hljs-built_in">run</span> <span class="hljs-string">"node install.js"</span>
PhantomJS <span class="hljs-keyword">not</span> found <span class="hljs-keyword">on</span> PATH
Phantom installation failed TypeError: Path must be a <span class="hljs-built_in">string</span>. Received undefined
    <span class="hljs-keyword">at</span> assertPath (path.js:<span class="hljs-number">7</span>:<span class="hljs-number">11</span>)
    <span class="hljs-keyword">at</span> Object.join (path.js:<span class="hljs-number">1211</span>:<span class="hljs-number">7</span>)
Install fail! Error: post install <span class="hljs-keyword">error</span>, please remove node_modules <span class="hljs-keyword">before</span> retry!
Run <span class="hljs-string">"sh -c node install.js"</span> <span class="hljs-keyword">error</span>, <span class="hljs-keyword">exit</span> code <span class="hljs-number">1</span>
Error: post install <span class="hljs-keyword">error</span>, please remove node_modules <span class="hljs-keyword">before</span> retry!
Run <span class="hljs-string">"sh -c node install.js"</span> <span class="hljs-keyword">error</span>, <span class="hljs-keyword">exit</span> code <span class="hljs-number">1</span>
    <span class="hljs-keyword">at</span> ChildProcess.proc.<span class="hljs-keyword">on</span>.code (/usr/<span class="hljs-keyword">local</span>/lib/node_modules/cnpm/
    <span class="hljs-keyword">at</span> Process.ChildProcess._handle.onexit (internal/child_process.js:<span class="hljs-number">226</span>:<span class="hljs-number">5</span>)
npminstall <span class="hljs-built_in">version</span>: <span class="hljs-number">2.26</span><span class="hljs-number">.2</span>
npminstall args: /usr/<span class="hljs-keyword">local</span>/bin/node /usr/<span class="hljs-keyword">local</span>/lib/node_modules/cnpm/node_modules/npminstall/bin/install.js <span class="hljs-comment">--china --userconfig=/Users/azmake/.cnpmrc --disturl=https://npm.taobao.org/mirrors/node --registry=https://registry.npm.taobao.org -g phantomjs</span></code></pre>
<ul><li><p>看到提示</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Install fail! Error: post install error, please remove node_modules before retry!" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs sql"><code class="text" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">Install</span> fail! <span class="hljs-keyword">Error</span>: post <span class="hljs-keyword">install</span> <span class="hljs-keyword">error</span>, please remove node_modules <span class="hljs-keyword">before</span> retry!</code></pre>
<ul><li><p>什么鬼？不陪你玩了</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="sudo npm uninstall -g phantomjs

sudo cnpm uninstall -g phantomjs

sudo rm -rf /usr/local/lib/node_modules/phantomjs" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code class="text">sudo npm uninstall -g phantomjs

sudo cnpm uninstall -g phantomjs

sudo rm -rf /usr/local/<span class="hljs-class"><span class="hljs-keyword">lib</span>/<span class="hljs-title">node_modules</span>/<span class="hljs-title">phantomjs</span></span></code></pre>
<ul><li><p>然后你又想到可以使用<code>HomeBrew</code>安装</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="brew install phantomjs" title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs mipsasm"><code class="text" style="word-break: break-word; white-space: initial;"><span class="hljs-keyword">brew </span><span class="hljs-keyword">install </span>phantomjs</code></pre>
<ul><li><p>ok,安装完成，打开terminal，输入 phantomjs --version，可以看到版本号，一起正常，可以愉快的玩耍了，然后你又愉快的开始 npm install 了，然后你又发现 使用phantomjs的项目里面 could not verify phantomjs,然后</p></li></ul>
<div class="widget-codetool" style="display:none;">
      <div class="widget-codetool--inner">
      <span class="selectCode code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="全选"></span>
      <span type="button" class="copyCode code-tool" data-toggle="tooltip" data-placement="top" data-clipboard-text="Downloading https://github.com/Medium/phantomjs/releases/download/v2.1.1//phantomjs-2.1.1-macosx.zip
Saving to /usr/local/lib/node_modules/phantomjs/phantomjs/phantomjs-2.1.1-macosx.zip
Receiving..." title="" data-original-title="复制"></span>
      <span type="button" class="saveToNote code-tool" data-toggle="tooltip" data-placement="top" title="" data-original-title="放进笔记"></span>
      </div>
      </div><pre class="hljs crystal"><code class="text">Downloading <span class="hljs-symbol">https:</span>/<span class="hljs-regexp">/github.com/</span>Medium/phantomjs/releases/download/v2.<span class="hljs-number">1.1</span>/<span class="hljs-regexp">/phantomjs-2.1.1-macosx.zip
Saving to /usr</span><span class="hljs-regexp">/local/lib</span><span class="hljs-regexp">/node_modules/phantomjs</span><span class="hljs-regexp">/phantomjs/phantomjs</span>-<span class="hljs-number">2.1</span>.<span class="hljs-number">1</span>-macosx.zip
Receiving...</code></pre>
<h2 id="articleHeader4">总结</h2>
<p>1、可以使用cnpm install 安装使用phantomjs的项目的node_modules，cnpm 会 使用phantomjs-prebuilt代替phantomjs，并且不中途翻车</p>
<p>2、下载安装phantomjs，并配置环境变量，这样不管是cnpm install还是npm install都可以使用phantomjs，而且在pycharm里面也不会报找不到phantomjs的错误</p>

                
{{< /raw >}}

# 版权声明
本文资源来源互联网，仅供学习研究使用，版权归该资源的合法拥有者所有，

本文仅用于学习、研究和交流目的。转载请注明出处、完整链接以及原作者。

原作者若认为本站侵犯了您的版权，请联系我们，我们会立即删除！

## 原文标题
PhantomJS 安装

## 原文链接
[https://segmentfault.com/a/1190000009020535](https://segmentfault.com/a/1190000009020535)

